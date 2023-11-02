<?php
session_start();
class Conexion
{
    public $connection;
    public function __construct()
    {
        $this->connection = new mysqli('localhost', 'root', '', 'empleado');
    }
}
