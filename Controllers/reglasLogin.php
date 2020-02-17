<?php
	session_start();
	//Validación de nombre de jugador mayor de 4 caracteres si JavaScript deshabilitado
	if(isset($_POST['jugador'])){
		$_SESSION['valido']=true;
		if(strlen($_POST['jugador']) < 4){
			$error = "El nombre del jugador debe tener al menos 4 caracteres";
			$_SESSION['valido']=false;
		}

	}
?>