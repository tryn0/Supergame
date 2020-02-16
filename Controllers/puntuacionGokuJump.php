<?php
	session_start();
	$goku = $_POST['puntosGoku'];
	//$memory = $_POST['puntosMemory'];
	//$carrera = $_POST['puntosCarrera'];
	//$sonic = $_POST['puntosSonic'];

	//Gestion de puntos para Goku Jump
	if (empty($_SESSION['gokuJump'])) {
		$_SESSION['gokuJump'] = $goku;
		$_SESSION['mensaje'] = "¡Enhorabuena! Has conseguido " . $_SESSION['gokuJump'] . " puntos.";
	} elseif ($_SESSION['gokuJump'] < $goku) {
		$_SESSION['mensaje'] = "Has superado tu anterior record de " . $_SESSION['gokuJump'] . " puntos. ¡Enhorabuena! " . " Ahora tienes " . $goku . " puntos.";
		$_SESSION['gokuJump'] = $goku;
	} elseif ($_SESSION['gokuJump'] > $goku) {
		$_SESSION['mensaje'] = "Has conseguido " . $goku . " puntos. No has superado tu anterior record de " . $_SESSION['gokuJump'] . " puntos.";
	} else {
		$goku = 0;
	}
?>