<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Ranking</title>
    <link rel="stylesheet" type="text/css" href="../Views/styles/ranking.css">
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
    <link rel="stylesheet" href="../Views/styles/botones.css">

</head>
<body>
    <h1 id="titulo">Ranking TOP 10</h1>
    <table id="ranking">
        <tr id="columnath">
            <th class="celdath">Posición</th>
            <th class="celdath">Usuario</th>
            <th class="celdath">Curso</th>
            <th class="celdath">Puntuación</th>
        </tr>
        <?php
            $contador = 0;
            foreach ($data['usuarios'] as $indice) {
            $contador += 1;
        ?>
        <tr id="columna">
            <td class="celda"><span><?php echo $contador . "º"; ?></span></td>
            <td class="celda"><span><?php echo $indice->getName(); ?></span></td>
            <td class="celda"><span><?php echo $indice->getCurso(); ?></span></td>
            <td class="celda"><span><?php echo $indice->getPoints(); ?></span></td>
        </tr>
        <?php           
            } 
        ?>
    </table>
    <div class="tumarcador">
        <span><?php echo $posicion ?>
    </div>
    <div class='wrapper' id="volver">
        <div role='button' class='retro-boton primary'>
            <a class='boton' href="index.php"> 
            <span class='boton-inner'>
                <span class='content-wrapper'>
                  <span class='boton-content'>
                    <span class='boton-content-inner' label='Volver al inicio'>
                    </span>
                  </span>
                </span>
              </span>
            </a>
        </div>
    </div>
    <script  src="../Views/scripts/botones.js"></script>
</body>
</html>