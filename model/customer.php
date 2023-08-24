<?php
require_once "database.php";

class Customer extends Database
{  
    /**
     * Vận đơn
     * function get all data of table keri009
     */
    function getAllCustomer(){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri010 order by id asc");
        return parent::select($sql);
    }

    /**
     * Function get all data of table order shipment
     */
    function getCustomerById($id){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri010 WHERE id = ?");
        $sql->bind_param('i', $id);
        return parent::select($sql);
    }
}