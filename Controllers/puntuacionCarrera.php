<?php
	session_start();
	$carrera = $_POST['puntosCarrera'];

	//Gestion de puntos para Carrera
	if (empty($_SESSION['carrera'])) {
		$_SESSION['carrera'] = $carrera;
		$_SESSION['mensaje'] = "¡Enhorabuena! Has conseguido " . $_SESSION['carrera'] . " puntos.";
	} elseif ($_SESSION['carrera'] < $carrera) {
		$_SESSION['mensaje'] = "Has superado tu anterior record de " . $_SESSION['carrera'] . " puntos. ¡Enhorabuena! " . " Ahora tienes " . $carrera . " puntos.";
		$_SESSION['carrera'] = $carrera;
	} elseif ($_SESSION['carrera'] > $carrera) {
		$_SESSION['mensaje'] = "Has conseguido " . $carrera . " puntos. No has superado tu anterior record de " . $_SESSION['carrera'] . " puntos.";
	} else {
		$carrera = 0;
	}

?>