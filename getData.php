<?php
$_POST = json_decode(file_get_contents('php://input'));
if($_POST)
{
	header('Content-Type: application/json');
	echo file_get_contents('results.json');
}
else {
	header('Content-Type: application/json');
	echo file_get_contents('results.json');
}
die();
?>
