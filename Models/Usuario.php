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
    $insercion = "INSERT INTO usuarios (nombre, puntuacion, curso) VALUES ('$this->nombre', $this->puntuacion, $this->curso)";
    $conexion->exec($insercion);
  }

  public function update() {
    $conexion = JuegoDB::connectDB();
    $actualizar = "UPDATE usuarios SET puntuacion = $this->puntuacion WHERE nombre= '$this->nombre' AND puntuacion < $this->puntuacion AND curso = $this->curso";
    $conexion->exec($actualizar);
  }

  public static function comprobarUser($nombre) {
    $conexion = JuegoDB::connectDB();
    $sql = "SELECT nombre FROM usuarios WHERE nombre = '$nombre'";
    $result=$conexion->query($sql);
    $rows = $result->rowCount();
    if($rows > 0) {
      $row = $result->fetch((PDO::FETCH_ASSOC));
      return $row['nombre'];
      } 
    return false;
  }

  public static function getUsers() {
    $conexion = JuegoDB::connectDB();
    $seleccion = "SELECT nombre, puntuacion, curso FROM usuarios";
    $consulta = $conexion->query($seleccion);
    $usuarios = [];
    while ($registro = $consulta->fetchObject()) {
      $usuarios[] = new Usuario($registro->nombre, $registro->puntuacion, $registro->curso);
    }
    return $usuarios;    
  }
}
