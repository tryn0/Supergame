<?php
	session_start();
	
	require_once '../Models/Usuario.php';
	require_once '../Models/Curso.php';

	if(!empty($_POST['jugador'])){
		$usuario = Usuario::comprobarUser($_POST['jugador'], $_POST['curso']);
		if(!$usuario && !empty($_POST['curso'])) {
			$_SESSION['user'] = $_POST['jugador'];
			$_SESSION['curso'] = $_POST['curso'];
			header("location: ../Views/content/mapa.html");
		} else {
			if(empty($_POST['curso'])){
				$error = 'Selecciona un curso';
			}else{
				$error = 'El usuario ya existe';
			}
		}
	}
	$data['cursos'] = Curso::getCursos();
	include '../Views/startGame.php';
?>