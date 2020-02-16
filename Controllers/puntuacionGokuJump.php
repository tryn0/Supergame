<?php
	session_start();
	$sushi = $_POST['puntosSushi'];
	//$memory = $_POST['puntosMemory'];
	//$carrera = $_POST['puntosCarrera'];
	//$sonic = $_POST['puntosSonic'];

	//Gestion de puntos para SushiGame
	if (empty($_SESSION['sushiGame'])) {
		$_SESSION['sushiGame'] = $sushi;
		$_SESSION['mensaje'] = "¡Enhorabuena! Has conseguido " . $_SESSION['sushiGame'] . " puntos.";
	} elseif ($_SESSION['sushiGame'] < $sushi) {
		$_SESSION['mensaje'] = "Has superado tu anterior record de " . $_SESSION['sushiGame'] . " puntos. ¡Enhorabuena! " . " Ahora tienes " . $sushi . " puntos.";
		$_SESSION['sushiGame'] = $sushi;
	} elseif ($_SESSION['sushiGame'] > $sushi) {
		$_SESSION['mensaje'] = "Has conseguido " . $sushi . " puntos. No has superado tu anterior record de " . $_SESSION['sushiGame'] . " puntos.";
	} else {
		$sushi = 0;
	}

	//Gestión de puntos de Memory
	if (empty($_SESSION['memory'])) {
		$_SESSION['memory'] = $memory;
		$_SESSION['mensaje'] = "¡Enhorabuena! Has conseguido " . $_SESSION['memory'] . " puntos.";
	} elseif ($_SESSION['memory'] < $memory) {
		$_SESSION['mensaje'] = "Has superado tu anterior record de " . $_SESSION['memory'] . " puntos. ¡Enhorabuena! " . " Ahora tienes " . $memory . " puntos.";
		$_SESSION['memory'] = $memory;
	} elseif ($_SESSION['memory'] > $memory) {
		$_SESSION['mensaje'] = "Has conseguido " . $memory . " puntos. No has superado tu anterior record de " . $_SESSION['memory'] . " puntos.";
	} else {
		$memory = 0;
	}
?>