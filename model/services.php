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
}