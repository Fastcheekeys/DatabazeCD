document.addEventListener('DOMContentLoaded', function () {
  // Pole pro uložení CDček a proměnná pro další ID
  let cdData = [];
  let nextId = 1;

  // HTML prvky
  const tableBody = document.querySelector('#cdTable tbody');
  const nazevInput = document.getElementById('titelInput');
  const interpretInput = document.getElementById('interpretInput');
  const rokInput = document.getElementById('yearInput');
  const addBtn = document.getElementById('addBtn');
  const loadJsonBtn = document.getElementById('loadJsonBtn');

  // Načte data z localStorage, pokud existují
  function loadData() {
    const storedData = localStorage.getItem('cdDatabase');
    const storedNextId = localStorage.getItem('cdNextId');
    if (storedData) {
      cdData = JSON.parse(storedData);
    }
    if (storedNextId) {
      nextId = parseInt(storedNextId, 10);
    }
  }

  // Uloží data do localStorage ve formátu JSON
  function saveData() {
    localStorage.setItem('cdDatabase', JSON.stringify(cdData));
    localStorage.setItem('cdNextId', nextId);
  }

  // Odeslání dat do JSON souboru na serveru
  function saveDataToServer() {
    fetch('/saveData.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cdData: cdData, nextId: nextId })
    })
      .then(response => response.json())
      .then(data => console.log('Data uložena na serveru:', data))
      .catch(error => console.error('Chyba při ukládání dat na server:', error));
  }

  // Funkce pro načtení dat z externího JSON souboru
  function loadDataFromJson() {
    fetch('/database.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Chyba při načítání souboru');
        }
        return response.json();
      })
      .then(data => {
        // čtení JSON databáze
        if (data.cdData && Array.isArray(data.cdData)) {
          cdData = data.cdData;
          nextId = data.nextId || nextId;
          saveData();
          renderTable();
          console.log('Data úspěšně načtena z externího JSON souboru:', data);
        } else {
          throw new Error('Nesprávná struktura dat v JSON souboru');
        }
      })
      .catch(error => {
        console.error('Chyba při načítání dat z JSON:', error);
        alert('Chyba při načítání dat z JSON: ' + error.message);
      });
  }

  // Vykreslí obsah tabulky podle dat v JSON databázi
  function renderTable() {
    tableBody.innerHTML = '';
    cdData.forEach(cd => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="d-none">${cd.id}</td>
        <td>${cd.nazev}</td>
        <td>${cd.interpret}</td>
        <td>${cd.rok}</td>
        <td>
          <button class="edit-btn btn btn-outline-light" data-id="${cd.id}">
            <i class="bi bi-pencil"></i> Upravit
          </button>
          <button class="delete-btn btn btn-outline-light" data-id="${cd.id}">
            <i class="bi bi-database-dash"></i> Smazat
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Přidání nového CDčka do databáze
  addBtn.addEventListener('click', function (event) {
    event.preventDefault(); // prevence odeslání formuláře
    const nazev = nazevInput.value.trim();
    const interpret = interpretInput.value.trim();
    const rok = rokInput.value.trim();

    if (nazev === '' || interpret === '' || rok === '') {
      alert("Vyplňte prosím všechny údaje!");
      return;
    }

    const newCd = {
      id: nextId++,
      nazev: nazev,
      interpret: interpret,
      rok: rok
    };

    cdData.push(newCd);
    saveData();
    saveDataToServer(); // Uloží data do externí databáze
    renderTable();

    // Vyčištění vstupních polí
    nazevInput.value = '';
    interpretInput.value = '';
    rokInput.value = '';
  });

  // Event listener pro tlačítko načtení dat z JSON
  loadJsonBtn.addEventListener('click', function () {
    loadDataFromJson();
  });

  // Event delegation – zpracování kliknutí pro úpravu a smazání záznamu
  tableBody.addEventListener('click', function (event) {
    // Upravit záznam
    const editBtn = event.target.closest('.edit-btn');
    if (editBtn) {
      const cdId = parseInt(editBtn.dataset.id, 10);
      const cd = cdData.find(item => item.id === cdId);
      if (cd) {
        const newNazev = prompt("Nový název:", cd.nazev);
        const newInterpret = prompt("Nový interpret:", cd.interpret);
        const newRok = prompt("Nový rok vydání:", cd.rok);
        if (newNazev && newInterpret && newRok) {
          cd.nazev = newNazev;
          cd.interpret = newInterpret;
          cd.rok = newRok;
          saveData();
          saveDataToServer();
          renderTable();
        }
      }
    }
  }
  
)
});
// odstranění záznamu z databáze
tableBody.addEventListener('click', function (event) {
  const deleteBtn = event.target.closest('.delete-btn');
  if (deleteBtn) {
    const cdId = parseInt(deleteBtn.dataset.id, 10);
    cdData = cdData.filter(item => item.id !== cdId);

    // Pokud je pole prázdné, resetovat ID
    if (cdData.length === 0) {
      nextId = 1;
    } else {
      // Přiřadit ID sekvenčně
      cdData.forEach((cd, index) => {
        cd.id = index + 1;
      });
    }

    saveData();
    saveDataToServer();
    renderTable();
  }
});

loadData(); 
renderTable(); 

