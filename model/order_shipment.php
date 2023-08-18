<?php
require_once "database.php";

class OrderShipment extends Database
{
    /**
     * Function get all data of table order shipment
     */
    function getAllOrderShipment(){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri31 order by id desc");
        return parent::select($sql);
    }
    /**
     * Function get all data of table order shipment
     */
    function getKGBill($bg_bill){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri31 WHERE kg_bill = ?");
        $sql->bind_param('i', $bg_bill);
        return parent::select($sql);
    }
    /**
     * Function insert data of table order shipment
     * Fields: 21
     */
    function insert($id_service,$agency,$code_referance,$type,$number_package,$weight,$sender_company,$sender_contact_name,$sender_contact_address,$sender_contact_phone,$sender_contact_email,$receiver_company_name,$receiver_contact_name,$receiver_contact_phone,$receiver_country,$postal_code,$receiver_city,$receiver_province,$receiver_address1,$receiver_address2,$receiver_address3,$kg_bill){
        $sql = parent::$connection->prepare("INSERT INTO `tbl_keri31`(`keri001`,`keri002`,`keri003`,`keri004`,`keri005`,`keri006`,`keri007`,`keri008`,`keri009`,`keri010`,`keri011`,`keri012`,`keri013`,`keri014`,`keri015`,`keri016`,`keri017`,`keri018`,`keri019`,`keri020`,`keri021`,`kg_bill`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $sql->bind_param('sssssssssssssssssssssi',$id_service,$agency,$code_referance,$type,$number_package,$weight,$sender_company,$sender_contact_name,$sender_contact_address,$sender_contact_phone,$sender_contact_email,$receiver_company_name,$receiver_contact_name,$receiver_contact_phone,$receiver_country,$postal_code,$receiver_city,$receiver_province,$receiver_address1,$receiver_address2,$receiver_address3,$kg_bill);
        return $sql->execute();
    }
}