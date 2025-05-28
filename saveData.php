<?php
// získání dat 
$input = file_get_contents("php://input");


$file = 'database.json';
if (file_exists($file)) {
    $existingData = json_decode(file_get_contents($file), true);
} else {
    $existingData = [];
}

$newData = json_decode($input, true);

if (json_last_error() === JSON_ERROR_NONE) {
    // Uložení dat do nového souboru, 
    file_put_contents($file, json_encode($newData, JSON_PRETTY_PRINT));
    echo json_encode(["status" => "success", "message" => "Data byla úspěšně uložena"]);
} else {
    echo json_encode(["status" => "error", "message" => "Chyba při čtení JSON dat"]);
}
?>
