<?php
  function loadJSON() {
    $file = file_get_contents("./data.json");
    $file = json_decode($file, TRUE);
    foreach (array_keys($file) as $key) {
      $age = date('Y') - date("Y", strtotime($file[$key]["nasc"]));
      $file[$key]["idade"] = $age;
    }
    return $file;
  }
  
  function getJsonByIdade($json, $min = 0, $max = 30) {
    $result = array();
    foreach($json as $value) {
      if($value["idade"] >= $min && 
         $value["idade"] <= $max) {
        array_push($result, $value);
      }
    }
    return $result;
  }

  function drawTable($arr1, $arr2) {
    $string = "<table>";
    for ($y = -1; $y < count($arr2); $y++) {
      $string .= "<tr>"; 
      foreach ($arr1 as $obj1) {
        if($y == -1) {
          $string .= "<td>$obj1</td>"; 
        } else {
          $string .= "<td>".$arr2[$y][strtolower($obj1)]."</td>"; 
        }
      }
      $string .= "</tr>"; 
    }
    $string .= "</table>"; 
    return $string;
  }
?>