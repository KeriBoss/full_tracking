<?php
require_once "database.php";

class Country extends Database
{  
    /**
     * Chi nhánh
     * function get all data of table keri001
     */
    function getAllCountry(){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri004 order by id asc");
        return parent::select($sql);
    }
    //Get service by id
    function getCountryById($id){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri004 where id = ?");
        $sql->bind_param('i',$id);
        return parent::select($sql);
    }
}