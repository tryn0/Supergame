<?php
	session_start();
	require_once '../Models/Usuario.php';
	$mensaje = $_SESSION['mensaje'];
	include '../Views/gameOverSushigame.php';
?>
