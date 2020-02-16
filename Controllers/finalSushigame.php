<?php
	session_start();
	require_once '../Models/Usuario.php';
	$mensaje = $_SESSION['mensaje'];
	var_dump($_SESSION);
	include '../Views/gameOverSushigame.php';
?>
