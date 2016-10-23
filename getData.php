<?php



	$_POST = json_decode(file_get_contents('php://input'));

if($_POST)
{
	$url = 'http://api.bls.gov/publicAPI/v2/timeseries/data/';
	$method = 'POST';
	$query = array(
	'seriesid'  => $_POST->seriesid,
	'startyear' =>  $_POST->startyear,
	'endyear'   =>  $_POST->endyear,
	'registrationKey' => '065ac7c1983e4b529488bb3750a2a616'
	);
	$pd = json_encode($query);
	$contentType = 'Content-Type: application/json';
	$contentLength = 'Content-Length: ' . strlen($pd);

	$result = file_get_contents(
	$url, null, stream_context_create(
		array(
			'http' => array(
				'method' => $method,
				'header' => $contentType . "\r\n" . $contentLength . "\r\n",
				'content' => $pd
			),
		)
	)
	);

	header('Content-Type: application/json');

	file_put_contents('results.json', $result);

	echo file_get_contents('results.json');

}
else {
	header('Content-Type: application/json');
	echo file_get_contents('results.json');
}
die();





?>
