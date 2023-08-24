<?php
require_once "database.php";

class BillLading extends Database
{  
    /**
     * Vận đơn
     * function get all data of table keri009
     */
    function getBillLading(){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri009 order by id asc");
        return parent::select($sql);
    }
    //Insert new bill lading
    function insert($v1,$v2,$v3,$v4,$v5,$v6,$v7,$v8,$v9,$v10,$v11,$v12,$v13,$v14,$v15,$v16,$v17,$v18,$v19,$v20,$v21,$v22,$v23,$v24,$v25,$v26,$v27,$v28,$v29,$v30,$v31,$v32,$v33,$v34,$v35,$v36,$v37,$v38,$v39,$v40,$v41,$v42,$v43,$v44,$v45,$v46,$v47,$v48,$v49,$v50){
        $sql = parent::$connection->prepare("INSERT INTO `tbl_keri009`(`keri001`, `keri002`, `keri003`, `keri004`, `keri005`, `keri006`, `keri007`, `keri008`, `keri009`, `keri010`, `keri011`, `keri012`, `keri013`, `keri014`, `keri015`, `keri016`, `keri017`, `keri018`, `keri019`, `keri020`, `keri021`, `keri022`, `keri023`, `keri024`, `keri025`, `keri026`, `keri027`, `keri028`, `keri029`, `keri030`, `keri031`, `keri032`, `keri033`, `keri034`, `keri035`, `keri036`, `keri037`, `keri038`, `keri039`, `keri040`, `keri041`, `keri042`, `keri043`, `keri044`, `keri045`, `keri046`, `keri047`, `keri048`, `keri049`, `keri050`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $sql->bind_param('ssssssssssssssssssssssssssssssssssssssssssssssssss', $v1,$v2,$v3,$v4,$v5,$v6,$v7,$v8,$v9,$v10,$v11,$v12,$v13,$v14,$v15,$v16,$v17,$v18,$v19,$v20,$v21,$v22,$v23,$v24,$v25,$v26,$v27,$v28,$v29,$v30,$v31,$v32,$v33,$v34,$v35,$v36,$v37,$v38,$v39,$v40,$v41,$v42,$v43,$v44,$v45,$v46,$v47,$v48,$v49,$v50);
        return $sql->execute();
    }
    /**
     * Function get all data of table order shipment
     */
    function getIdTracking($tracking){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri009 WHERE keri047 = ?");
        $sql->bind_param('i', $tracking);
        return parent::select($sql);
    }
    /**
     * Function get all data of table order shipment
     */
    function getLadingByKGBill($kg_bill){
        $sql = parent::$connection->prepare("SELECT * FROM tbl_keri009 WHERE keri028 = ?");
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