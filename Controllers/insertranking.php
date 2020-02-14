<?php
  require '../Models/Usuario.php';
  $data['usuarios']=Usuario::getUsers();
  include '../Views/ranking.php';
?>