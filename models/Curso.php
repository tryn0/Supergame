<?php

require_once 'JuegoDB.php';

class Curso {

  private $curso;

  function __construct($curso) {
    $this->curso = $curso;
  }

  public function getCurso() {
    return $this->curso;
  }
  public static function getCursos() {
    $conexion = JuegoDB::connectDB();
    $seleccion = "SELECT curso FROM cursos";
    $consulta = $conexion->query($seleccion);
    $cursos = [];
    while ($registro = $consulta->fetchObject()) {
      $cursos[] = new Curso($registro->curso);
    }
    return $cursos;    
  }
}