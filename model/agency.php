<?php
require_once "database.php";

class Agency extends Database
{  
    /**
     * Chi nhánh
     * function get all data of table keri001
     */
    function getAllAgency(){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri001 order by id asc");
        return parent::select($sql);
    }
    /**
     * Chi nhánh
     * function get all data of table keri001
     */
    function getAgencyById($id){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri001 where id = ?");
        $sql->bind_param('i',$id);
        return parent::select($sql);
    }
}