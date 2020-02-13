<?php
	session_start();
	require_once '../Models/Usuario.php';
	require_once '../Models/Curso.php';
	if(!empty($_POST['jugador'])){
		$usuario = Usuario::comprobarUser($_POST['jugador']);
		if(!$usuario) {
			$_SESSION['user'] = $usuario;
			$_SESSION['curso'] = $_POST['curso'];
			header("location: ../Views/content/mapa.html");
		} else {
			$error = "El usuario ya existe";
		}
	}
	$data['cursos'] = Curso::getCursos();
	include '../Views/startGame.php';
?>