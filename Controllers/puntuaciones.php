<?php
	session_start();
	$sushi = $_POST['puntitos'];
	if (empty($_SESSION['sushiGame'])) {
		$_SESSION['sushiGame'] = $sushi;
		$_SESSION['mensaje'] = "¡Enhorabuena! Has conseguido " . $_SESSION['sushiGame'] . " puntos.";
	} elseif ($_SESSION['sushiGame'] < $sushi) {
		$_SESSION['mensaje'] = "Has superado tu anterior record de " . $_SESSION['sushiGame'] . " puntos. ¡Enhorabuena! " . " Ahora tienes " . $sushi . " puntos.";
		$_SESSION['sushiGame'] = $sushi;
	} else {
		$_SESSION['mensaje'] = "Has conseguido menos puntos de tu record. Tu record es: " . $_SESSION['sushiGame'] . " puntos.";
	}
?>