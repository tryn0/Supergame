<!DOCTYPE html>
<html lang="es" class="h-100">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <!--Bootstrap-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="../Views/styles/sushigame.css">

        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script type="text/javascript" src="../Views/scripts/pantallaInicioFin.js"></script>
        <link rel="stylesheet" type="text/css" href="../Views/styles/botones.css">
        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">

        <!--Queda poner fuente y mejorar lo que no guste al equipo-->
        <title>Game Over - SushiGame</title>
    </head>
    <body class="h-100">
        <img src="../Views/images/fondo1.png" id="fondo">
        <div class="container h-100" >
            <div class="row justify-content-center h-100 align-items-center">
                <div class="col-5 col-md-5 col-lg-8 col-xl-6 pb-4 pt-4" id="opciones">
                    <form method="POST" class="justify-content-center">
                        <label class="w-100 text-center text-black" style="font-size: 1.5em;"><?=$_SESSION['mensaje']?></label>
                        <div class='wrapper' id="reset" style="display: inline-block;"> 
                            <div role='button' class='retro-boton primary'>
                                <a class='boton' href="../Views/sushigame.html"> 
                                <span class='boton-inner'>
                                    <span class='content-wrapper'>
                                      <span class='boton-content'>
                                        <span class='boton-content-inner' label='VOLVER A JUGAR'>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </a>
                            </div>
                        </div>
                        <div class='wrapper ml-5' id="reset" style="display: inline-block;">
                            <div role='button' class='retro-boton primary'>
                                <a class='boton' href="../Views/content/mapa.html"> 
                                <span class='boton-inner'>
                                    <span class='content-wrapper'>
                                      <span class='boton-content'>
                                        <span class='boton-content-inner' label='Volver al menú'>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script  src='../Views/scripts/botones.js'></script>
    </body>
</html>