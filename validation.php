<?php
// definování hashovací funkce pomocí SHA256
function generateHash($input) {
    return hash('sha256', $input);
}

// Inicializace proměnné pro chybovou hlášku
$errorMessage = '';

// Odeslání formuláře metodou POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Získání a ošetření vstupních údajů z formuláře
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    //údaje
    $validUsername = 'estetikaffjuceku';
    $validPassword = 'Apatosaurus16-';

    // Porovnání hash hodnot zadaných údajů a přednastavených údajů
    if (generateHash($username) === generateHash($validUsername) &&
        generateHash($password) === generateHash($validPassword)) {
        // Údaje jsou správné -> přesměrování na soubor admin.html
        header("Location: admin.html");
        exit;
    } else {
        // Údaje nesouhlasí, výpis chybové hlášky předán zpět do html
        $errorMessage = "Nesprávné uživatelské jméno nebo heslo.";
        header("Location: index.php?error=" . urlencode($errorMessage));
        exit;
    }
}
?>