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
     * Function get all data of table order shipment
     */
    function getShipmentById($id){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri31 WHERE tbl_keri31.id = ?");
        $sql->bind_param('i', $id);
        return parent::select($sql);
    }
    /**
     * Function insert data of table order shipment
     * Fields: 21
     */
    function insert($id_service,$agency,$code_referance,$type,$number_package,$weight,$sender_company,$sender_contact_name,$sender_contact_address,$sender_contact_phone,$sender_contact_email,$receiver_company_name,$receiver_contact_name,$receiver_contact_phone,$receiver_country,$postal_code,$receiver_city,$receiver_province,$receiver_address1,$receiver_address2,$receiver_address3,$kg_bill,$status){
        $sql = parent::$connection->prepare("INSERT INTO `tbl_keri31`(`keri001`,`keri002`,`keri003`,`keri004`,`keri005`,`keri006`,`keri007`,`keri008`,`keri009`,`keri010`,`keri011`,`keri012`,`keri013`,`keri014`,`keri015`,`keri016`,`keri017`,`keri018`,`keri019`,`keri020`,`keri021`,`kg_bill`,`status`,`print_label`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'')");
        $sql->bind_param('sssssssssssssssssssssis',$id_service,$agency,$code_referance,$type,$number_package,$weight,$sender_company,$sender_contact_name,$sender_contact_address,$sender_contact_phone,$sender_contact_email,$receiver_company_name,$receiver_contact_name,$receiver_contact_phone,$receiver_country,$postal_code,$receiver_city,$receiver_province,$receiver_address1,$receiver_address2,$receiver_address3,$kg_bill,$status);
        if($sql->execute() === true){
            return self::$connection->insert_id;
        }
    }
    /**
     * Function insert data of table order shipment
     * Fields: 21
     */
    function update($id_shipment,$id_service,$agency,$code_referance,$type,$number_package,$weight,$sender_company,$sender_contact_name,$sender_contact_address,$sender_contact_phone,$sender_contact_email,$receiver_company_name,$receiver_contact_name,$receiver_contact_phone,$receiver_country,$postal_code,$receiver_city,$receiver_province,$receiver_address1,$receiver_address2,$receiver_address3){
        $sql = parent::$connection->prepare("UPDATE `tbl_keri31` SET `keri001`= ?,`keri002`= ?,`keri003`= ?,`keri004`= ?,`keri005`= ?,`keri006`= ?,`keri007`= ?,`keri008`= ?,`keri009`= ?,`keri010`= ?,`keri011`= ?,`keri012`= ?,`keri013`= ?,`keri014`= ?,`keri015`= ?,`keri016`= ?,`keri017`= ?,`keri018`= ?,`keri019`= ?,`keri020`= ?,`keri021`= ? WHERE id = ?");
        $sql->bind_param('sssssssssssssssssssssi',$id_service,$agency,$code_referance,$type,$number_package,$weight,$sender_company,$sender_contact_name,$sender_contact_address,$sender_contact_phone,$sender_contact_email,$receiver_company_name,$receiver_contact_name,$receiver_contact_phone,$receiver_country,$postal_code,$receiver_city,$receiver_province,$receiver_address1,$receiver_address2,$receiver_address3,$id_shipment);
        return $sql->execute();
    }
    /**
     * 
     */
    function insertPackDetail($id_shipment,$quantity,$id_type,$width,$height,$length,$weight){
        $sql = parent::$connection->prepare("INSERT INTO `merchandise`(`id_shipment`, `quantity`, `id_type`, `width`, `height`, `length`, `weight`) VALUES (?,?,?,?,?,?,?)");
        $sql->bind_param('iiiiiii', $id_shipment,$quantity,$id_type,$width,$height,$length,$weight);
        return $sql->execute();
    }
    /**
     * 
     */
    function insertPackInvoice($id_shipment,$type_export,$desc,$quantity,$unit,$price){
        $sql = parent::$connection->prepare("INSERT INTO `pack_invoice`(`id_shipment`, `type_export`, `description`, `quantity`, `unit`, `price`) VALUES (?,?,?,?,?,?)");
        $sql->bind_param('issisi', $id_shipment,$type_export,$desc,$quantity,$unit,$price);
        return $sql->execute();
    }

    /**
     * Function get all data of table order shipment
     */
    function getPackDetailById($id){
        $sql = parent::$connection->prepare("SELECT * FROM merchandise WHERE merchandise.id_shipment = ?");
        $sql->bind_param('i', $id);
        return parent::select($sql);
    }

    /**
     * Function get all data of table order shipment
     */
    function getPackInvoiceById($id){
        $sql = parent::$connection->prepare("SELECT * FROM pack_invoice WHERE pack_invoice.id_shipment = ?");
        $sql->bind_param('i', $id);
        return parent::select($sql);
    }
    //Delete order shipment
    function deleteShipment($id){
        $sql = parent::$connection->prepare("DELETE from `tbl_keri31` WHERE id = ?");
        $sql->bind_param('i', $id);
        return $sql->execute();
    }
    //Delete order shipment
    function deletePackage($id){
        $sql = parent::$connection->prepare("DELETE from `merchandise` WHERE id = ?");
        $sql->bind_param('i', $id);
        return $sql->execute();
    }
    /**
     * Function get all data of table order shipment
     */
    function sortShipmentByDate($date_start,$date_end){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri31 WHERE tbl_keri31.created_at between ? and ?");
        $sql->bind_param('ss',$date_start,$date_end);
        return parent::select($sql);
    }
    //update status print label
    function updateStatusLabel($id, $status){
        $sql = parent::$connection->prepare("UPDATE tbl_keri31 SET `print_label` = ? WHERE tbl_keri31.id = ?");
        $sql->bind_param('si',$status,$id);
        return $sql->execute();
    }

    /**
     * Function get all data of table order shipment
     */
    function sortOrderMultibleOption($order_id,$number_sgb,$phone_receiver,$address_receiver,$date_book){
        $str = "";

            if($order_id != '' ){
                $str .= " AND tbl_keri31.id = $order_id";
            }
            if($number_sgb  != '' ){
                $str .= " AND tbl_keri009.keri003 = $number_sgb";
            }
            if($phone_receiver != '' ){
                $str .= " AND tbl_keri31.keri014 = $phone_receiver";
            }
            if($address_receiver != '' ){
                $str .= " AND tbl_keri31.keri019 = $address_receiver";
            }
            if($date_book != '' ){
                $str .= " AND tbl_keri31.created_at >= $date_book";
            }
        
        $sql = parent::$connection->prepare("SELECT tbl_keri31 FROM tbl_keri31,tbl_keri009 WHERE tbl_keri31 $str");
        $sql->bind_param('ss',$date_start,$date_end);
        return parent::select($sql);
    }
}