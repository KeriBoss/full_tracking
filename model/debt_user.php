<?php
require_once "database.php";

class DebtUser extends Database
{  
    /**
     * Chi nhánh
     * function get all data of table keri001
     */
    function getAllDebtOfUser(){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri31");
        return parent::select($sql);
    }
    /**
     * Chi nhánh
     * function get all data of table keri001
     */
    function getAgencyById($id){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri31 where id = ?");
        $sql->bind_param('i',$id);
        return parent::select($sql);
    }
    /**
     * Update status shipment
     */
    function updateStatus($kg_bill,$status){
        $sql = parent::$connection->prepare("UPDATE tbl_keri31 SET status_payment = ? where kg_bill = ?");
        $sql->bind_param('si',$status,$kg_bill);
        return $sql->execute();
    }
    /**
     * 
     */
    function sortDebt($status,$dateStart,$dateEnd){
        $str = '';
        if($status != ''){
            if($status == 1){
                if($str == ''){
                    $str = " where status_payment = 'Đã thanh toán'";
                }else {
                    $str .= " and status_payment = 'Đã thanh toán'";
                }
            }else if($status == 2){
                if($str == ''){
                    $str = " where status_payment <> 'Đã thanh toán'";
                }else {
                    $str .= " and status_payment <> 'Đã thanh toán'";
                }
            }
        }
        if($dateStart != ''){
            if($str == ''){
                $str = " where created_at >= '$dateStart'";
            }else {
                $str .= " and created_at >= '$dateStart'";
            }
        }
        if($dateEnd != ''){
            if($str == ''){
                $str = " where created_at <= '$dateEnd'";
            }else {
                $str .= " and created_at <= '$dateEnd'";
            }
        }
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri31 $str");
        return parent::select($sql);
    }
    /**
     * Get total debt of user
     */
    function getTotalPriceDebt(){
        $sql = parent::$connection->prepare("SELECT sum(tbl_keri009.keri046 - tbl_keri014.keri006) as total_price FROM tbl_keri009 inner join tbl_keri014 on tbl_keri009.id = tbl_keri014.keri050");
        return parent::select($sql);
    }
}