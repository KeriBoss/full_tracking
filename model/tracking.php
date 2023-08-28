<?php
require_once "database.php";

class Tracking extends Database
{  
    /**
     * Vận đơn
     * function get all data of table keri009
     */
    function getAllTracking(){
        $sql = parent::$connection->prepare("SELECT * FROM tracking order by id asc");
        return parent::select($sql);
    }
    //Insert new bill lading
    function insert($tracking_number,$date_send,$date_ksg,$date_origin,$date_transit,$transport_tracking,$standard_ship,$policy,$paper_package){
        $sql = parent::$connection->prepare("INSERT INTO `tracking`(`tracking_number`, `date_send`, `date_ksg`, `date_origin`, `date_transit`, `transport_tracking`, `standard_ship`, `policy`, `paper_package`) VALUES (?,?,?,?,?,?,?,?,?)");
        $sql->bind_param('issssssss', $tracking_number,$date_send,$date_ksg,$date_origin,$date_transit,$transport_tracking,$standard_ship,$policy,$paper_package);
        return $sql->execute();
    }
    /**
     * Function get all data of table order shipment
     */
    function getTrackingByNumber($tracking){
        $sql = parent::$connection->prepare("SELECT * FROM tracking WHERE tracking_number = ?");
        $sql->bind_param('i', $tracking);
        return parent::select($sql);
    }
    /**
     * Function get all data of table order shipment
     */
    function getLadingByKGBill($kg_bill){
        $sql = parent::$connection->prepare("SELECT * FROM tracking WHERE keri028 = ?");
        $sql->bind_param('i', $kg_bill);
        return parent::select($sql);
    }
    /**
     * Function get all data of table order shipment
     */
    function getShipmentKGBill($kg_bill){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri31 WHERE kg_bill = ?");
        $sql->bind_param('i', $kg_bill);
        return parent::select($sql);
    }
}