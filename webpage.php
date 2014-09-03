<?php

	header("Access-Control-Allow-Origin: " . "*");

	$domain = 'http://bisite.usal.es';

	if (isset($_GET["url"]))
	{
		$domain = $_GET["url"];
	}
	
	$input = file_get_contents($domain);

	$rep['/href="(?!https?:\/\/)(?!data:)(?!#)/'] = 'href="'.$domain."/";
	$rep['/src="(?!https?:\/\/)(?!data:)(?!#)/'] = 'src="'.$domain."/";
	$rep['/@import[\n+\s+]"\//'] = '@import "'.$domain."/";
	$rep['/@import[\n+\s+]"\./'] = '@import "'.$domain."/";

	$output = preg_replace(
	    array_keys($rep),
	    array_values($rep),
	    $input
	);

	//$output = str_replace ($domain."///", "///", $output);

	
	echo $output;

	
?>



<style>

*:hover
{
	background: rgba(255,0,0,0.1);
}

</style>