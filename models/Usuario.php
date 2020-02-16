<?php

require_once 'JuegoDB.php';

class Usuario {

  private $nombre;
  private $puntuación;
  private $curso;

  function __construct($nombre, $puntuacion, $curso) {
    $this->nombre = $nombre;
    $this->puntuacion = $puntuacion;
    $this->curso = $curso;
  }

  public function getName() {
    return $this->nombre;
  }

  public function getPoints() {
    return $this->puntuacion;
  }

  public function getCurso() {
    return $this->curso;
  }

  public function insert() {
    $conexion = JuegoDB::connectDB();
    $insercion = "INSERT INTO usuarios (nombre, puntuacion, curso) VALUES ('$this->nombre', $this->puntuacion, '$this->curso')";
    $conexion->exec($insercion);
  }

  public function update() {
    $conexion = JuegoDB::connectDB();
    $actualizar = "UPDATE usuarios SET puntuacion = $this->puntuacion WHERE nombre= '$this->nombre' AND puntuacion < $this->puntuacion AND curso = '$this->curso'";
    $conexion->exec($actualizar);
  }
  
  //Comprobación si el usuario existe en la bd
  public static function comprobarUser($nombre, $curso) {
    $conexion = JuegoDB::connectDB();
    $sql = "SELECT nombre FROM usuarios WHERE nombre = '$nombre' AND curso = '$curso'";
    $result=$conexion->query($sql);
    $rows = $result->rowCount();
    if($rows > 0) {
      $row = $result->fetch((PDO::FETCH_ASSOC));
      return $row['nombre'];
      } 
    return false;
  }
  
  //Obtiene los 10 primeros usuarios de mayor a menos.
  public static function getUsers() {
    $conexion = JuegoDB::connectDB();
    $seleccion = "SELECT nombre, puntuacion, curso FROM usuarios ORDER BY puntuacion DESC LIMIT 10";
    $consulta = $conexion->query($seleccion);
    $usuarios = [];
    while ($registro = $consulta->fetchObject()) {
      $usuarios[] = new Usuario($registro->nombre, $registro->puntuacion, $registro->curso);
    }
    return $usuarios;    
  }
  //Obtiene tu posición con respecto a todos los jugadores
  public static function getPosicion($nombre, $curso) {
    $conexion = JuegoDB::connectDB();
    $seleccion = "SELECT nombre, curso, ROW_NUMBER() OVER(PARTITION by nombre AND curso ORDER BY puntuacion DESC) AS posicion FROM usuarios ";
    $consulta = $conexion->query($seleccion);
    //$usuarios = [];
    while ($registro = $consulta->fetchObject()) {
      if($registro->nombre == $nombre and $registro->curso == $curso) {
        $posicion = $registro->posicion;
      }
    }
    $mensaje = "Has quedado en " . $posicion . "º posición. ¡Felicidades!";
    return $mensaje;    
  }
}
