<?php

// sensor.php:  Fetch a single value from a sensor

// Parameters:
//   id:  Sensor id

// Returns:
//   Floating point value

$id = $_REQUEST["id"];

if ($id == "temp1")
  echo 42+(rand()%1000)/1000;
else
  die("No such sensor");

?>
