<?php
require_once "database.php";

class Users extends Database
{  
    /**
     * Chi nhánh
     * function get all data of table keri001
     */
    function login($email,$password){
        $sql = parent::$connection->prepare("SELECT * FROM users where email = ? and password = ?");
        $sql->bind_param('ss', $email,$password);
        return parent::select($sql);
    }
}