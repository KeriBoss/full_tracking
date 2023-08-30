<?php
require_once "database.php";

class TravelHistory extends Database
{  
    /**
     * Chi nhánh
     * function get all data of table keri001
     */
    function getAllHistory(){
        $sql = parent::$connection->prepare("SELECT * FROM travel_history order by kg_bill asc");
        return parent::select($sql);
    }
    //Get service by id
    function getHistoryById($id){
        $sql = parent::$connection->prepare("SELECT * FROM travel_history where id = ?");
        $sql->bind_param('i',$id);
        return parent::select($sql);
    }
    //Get service by id
    function getHistoryByKgBill($kg_bill){
        $sql = parent::$connection->prepare("SELECT * FROM travel_history where kg_bill = ?");
        $sql->bind_param('s',$kg_bill);
        return parent::select($sql);
    }
    /**
     * insert
     */
    function insert($kg_bill,$id_agency,$label_date,$label_text,$label_address){
        $sql = parent::$connection->prepare("INSERT INTO `travel_history`(`kg_bill`, `id_agency`, `label_date`, `label_text`, `label_address`) VALUES (?,?,?,?,?)");
        $sql->bind_param('sisss', $kg_bill,$id_agency,$label_date,$label_text,$label_address);
        return $sql->execute();
    }
    /**
     * update
     */
    function update($id, $kg_bill, $id_agency, $label_date, $label_text, $label_address){
        $sql = parent::$connection->prepare("UPDATE `travel_history` SET `kg_bill` = ?, `id_agency` = ?, `label_date` = ?, `label_text` = ?, `label_address` = ? where id = ?");
        $sql->bind_param('sisssi', $kg_bill,$id_agency,$label_date,$label_text,$label_address, $id);
        return $sql->execute();
    }
    /**
     * delete
     */
    function delete($id){
        $sql = parent::$connection->prepare("DELETE FROM `travel_history` WHERE id = ?");
        $sql->bind_param('i', $id);
        return $sql->execute();
    }
}