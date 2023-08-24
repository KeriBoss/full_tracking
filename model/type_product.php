<?php
require_once "database.php";

class TypeProduct extends Database
{  
    /**
     * Chi nhánh
     * function get all data of table keri001
     */
    function getAllTypeProduct(){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri003 order by id asc");
        return parent::select($sql);
    }
}