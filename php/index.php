<?php
  require_once("functions.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    table { float: left; }
    table { border: 2px solid black;, padding: 2px; margin: 2px; }
    table tr td { border: 1px solid black; }
  </style>
</head>
<body>
  <?php
    $json = loadJSON();
    $columns = array("Nome", "Email", "Cidade", "Idade");
    $left = getJsonByIdade($json, 0, 29);
    $right = getJsonByIdade($json, 30, INF);

    echo drawTable($columns, $left);
    echo drawTable($columns, $right);
  ?>
</body>
</html>