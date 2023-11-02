<?php

use LDAP\Result;

require('../config/conexion.php');
class Usuarios
{
    private $cedula;
    private $nombre;
    private $apellido;
    private $correo;
    private $telefono;

    public function __construct()
    {
    }
    public function selectAll()
    {
        $con = new Conexion();
        $query = "SELECT * FROM `empleados`";
        $result = $con->connection->query($query);
        return $result;
    }

    public function insert($nombre, $apellido, $cedula, $correo, $telefono)
    {
        $con = new Conexion();
        $query = "INSERT into `empleados` (nombre,apellido,cedula,correo,telefono) values ('$nombre','$apellido','$cedula','$correo','$telefono')";
        $result = $con->connection->query($query);
        return $result;
    }

    public function delete($id)
    {
        $con = new Conexion();
        $query = "DELETE from `empleados`where id='$id'";
        $result = $con->connection->query($query);
        return $result;
    }
    public function upDate($nombreP, $apellido, $cedula, $correo, $telefono, $idP)
    {
        $con = new Conexion();
        $query = "UPDATE `empleados` set nombre='$nombreP', 
        apellido='$apellido', 
        cedula='$cedula', 
        correo='$correo', 
        telefono='$telefono' where id='$idP' ";
        $result = $con->connection->query($query);
        return $result;
    }
}
