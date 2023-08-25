<?php
require_once "database.php";

class Services extends Database
{  
    /**
     * Nhà cung cấp
     * function get all data of table keri012
     */
    function getAllOrderShipment(){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri012 order by id asc");
        return parent::select($sql);
    }
    /**
     * Nhà cung cấp
     * function get all data of table keri012
     */
    function getAllService(){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri012 order by id asc");
        return parent::select($sql);
    }
    //Get service by id
    function getServiceById($id){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri012 where id = ?");
        $sql->bind_param('i',$id);
        return parent::select($sql);
    }
}