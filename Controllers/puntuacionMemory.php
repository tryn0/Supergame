<?php
	session_start();
	$memory = $_POST['puntosMemory'];

	//Gestión de puntos de Memory
	if (empty($_SESSION['memory'])) {
		$_SESSION['memory'] = $memory;
		$_SESSION['mensaje'] = "¡Enhorabuena! Has conseguido " . $_SESSION['memory'] . " puntos.";
	} elseif ($_SESSION['memory'] < $memory) {
		$_SESSION['mensaje'] = "Has superado tu anterior record de " . $_SESSION['memory'] . " puntos. ¡Enhorabuena! " . " Ahora tienes " . $memory . " puntos.";
		$_SESSION['memory'] = $memory;
	} else {
		$_SESSION['mensaje'] = "Has conseguido " . $memory . " puntos. No has superado tu anterior record de " . $_SESSION['memory'] . " puntos.";
	} 
?>