<?php
	session_start();

	$sushi = $_POST['puntosSushi'];
	$carrera = $_POST['puntosCarrera'];
	$memory = $_POST['puntosMemory'];
	$sonic = $_POST['puntosSonic'];

	$niveles = [];

	if(!empty($sushi)){
		$niveles[] = $sushi;
	}
	if(!empty($carrera)){
		$niveles[] = $carrera;
	}
	if(!empty($memory)){
		$niveles[] = $memory;
	}
	if(!empty($sonic)){
		$niveles[] = $sonic;
	}

	var_dump($niveles);
	var_dump($sushi);
	//$_SESSION['puntuacionTotal'] = ;
	
	/*if (empty($_SESSION['sushiGame'])) {
		$_SESSION['sushiGame'] = $sushi;
		$_SESSION['mensaje'] = "¡Enhorabuena! Has conseguido " . $_SESSION['sushiGame'] . " puntos.";
	} elseif ($_SESSION['sushiGame'] < $sushi) {
		$_SESSION['mensaje'] = "Has superado tu anterior record de " . $_SESSION['sushiGame'] . " puntos. ¡Enhorabuena! " . " Ahora tienes " . $sushi . " puntos.";
		$_SESSION['sushiGame'] = $sushi;
	} else {
		$_SESSION['mensaje'] = "Has conseguido " . $sushi . " puntos. No has superado tu anterior record de " . $_SESSION['sushiGame'] . " puntos.";
	}*/
	$puntoTotal = 0;
	for ($i=0; $i < count($niveles) ; $i++) { 
		$puntoTotal += $niveles[$i];
	}
	var_dump($_POST);
	$_SESSION['puntuacionTotal'] = $puntoTotal;
?>