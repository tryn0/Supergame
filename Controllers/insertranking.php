<?php
	session_start();
	require_once '../Models/Usuario.php';
  	if (empty($_SESSION['sushiGame'])) {
  		$_SESSION['sushiGame'] = 0;
 	}
  	if (empty($_SESSION['puntosGoku'])) {
  		$_SESSION['puntosGoku'] = 0;
  	}
  	if (empty($_SESSION['memory'])) {
  		$_SESSION['memory'] = 0;
  	}
  	if (empty($_SESSION['carrera'])) {
  		$_SESSION['carrera'] = 0;
  	}
  	$puntosTotal = $_SESSION['sushiGame'] + $_SESSION['puntosGoku'] + $_SESSION['memory'] + $_SESSION['carrera'];
  	$jugador = new Usuario($_SESSION['user'], $puntosTotal, $_SESSION['curso']);
  	$jugador->insert();
  	$posicion = Usuario::getPosicion($_SESSION['user'],$_SESSION['curso']);
  	session_destroy();
  	$data['usuarios']=Usuario::getUsers();
  	include '../Views/ranking.php';
?>