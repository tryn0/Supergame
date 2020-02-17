<!DOCTYPE html>
<html lang="es" class="h-100">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <!--Bootstrap-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="../Views/styles/startGame.css">

        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="../Views/scripts/pantallaInicioFin.js"></script>

        <!--Login-->
        <title>Login</title>
    </head>
    <body class="h-100" id="pantallaInicio" background="../Views/images/principal.jpg" style="background-size: 100% 100%;">
        <!-- Si java script no está habilitado, validación por php -->
        <noscript><?php $jsSupport='false'; ?></noscript>
        <?php 
        if ($jsSupport == 'false') {
            include '../Controllers/reglasLogin.php';
        }
        ?>
        <div class="container h-100">
            <div class="row justify-content-center h-100 align-items-center" >
                <div class="col-4 col-md-4 col-lg-6 col-xl-5 pt-1 pb-1" id="sombreado">
                    <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="POST" class="justify-content-center">
                        <div class="form-group" id="texto">
                            <label for="jugador">Jugador o grupo:</label>
                            <input class="form-control" type="text" name="jugador" id="jugador" placeholder="Nombre del jugador">
                            <small class="form-text text-white">Distinto para cada persona.</small>
                        </div>
                        <div class="form-group">
                            <label for="curso">Curso:</label>
                            <select class="form-control" name="curso">
                                <option value="" disabled selected>Selecciona tu curso...</option>
                                <?php
                                    foreach($data['cursos'] as $curso)  {
                                ?>
                                    <option value="<?=$curso->getCurso()?>"><?=$curso->getCurso()?></option>
                                <?php
                                    }
                                ?>
                            </select>
                        </div>
                        <div><?php echo $mensaje; ?></div>
                        <button type="submit" name="enviarJugador" class="btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Empezar a jugar">Empezar</button>
                    </form>
                    <?php if(!empty($error)){echo $error;} ?>
                </div>
            </div>
        </div>        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </body>
</html>