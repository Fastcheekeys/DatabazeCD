<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Přihlášení</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="styles.css" type="text/css"/>
  <style>
  </style>
</head>
<body>
  <div class="container mt-5 col-4">
    <form id="loginForm" class="card bg-light" action="validation.php" method="POST">
        <div class="card-header">
            <h2 class="card-title">Přihlášení</h2>            
        </div>
        <div class="card-body">
            <input type="text" class="form-control mt-2 mb-2" placeholder="Uživatelské jméno" id="username" name="username" required>
            <input type="password" class="form-control mt-2 mb-2" placeholder="Heslo" id="password" name="password" required>
            <button type="submit" class="btn btn-outline-primary mt-2 mb-2">Přihlásit se</button>
            <p class="text-danger" id="error" name="error">
              <?php 
        
                if (isset($_GET['error'])) {
                  echo htmlspecialchars($_GET['error']);
                }
              ?>
            </p>            
        </div>
    </form>

  </div>
  <footer>
      <div class="row">
          <div class="d-flex justify-content-center hstack gap-3 position-absolute bottom-0 end-0 bg-light p-3">
              <p>Design: Matěj Rešl</p>
              <p>Developed: Matěj Rešl</p>
              <a href="https://admin.endora.cz/" target="_blank" class="link-dark text-decoration-none">Powered: Endora</a>
          </div>
      </div>
  </footer>
  <script></script>
</body>
</html>
