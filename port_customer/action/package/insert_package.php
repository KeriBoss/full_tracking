<?php 
session_start();
require_once "../../../model/config.php";
require_once "../../../model/database.php";
require_once "../../../model/order_shipment.php";

if(isset($_POST['quantity']) && isset($_POST['value-type']) && isset($_POST['width']) && isset($_POST['height']) && isset($_POST['length']) && isset($_POST['weight']) && isset($_GET['id'])){
    $quantity = $_POST['quantity'];
    $idType = $_POST['value-type'];
    $width = $_POST['width'];
    $height = $_POST['height'];
    $length = $_POST['length'];
    $weight = $_POST['weight'];
    $id_shipment = $_GET['id'];

    try{
        $tracking_pack = '';
        $order_shipment = new OrderShipment();
        $insertPackDetail = $order_shipment->insertPackDetail($id_shipment,$quantity,$idType,$width,$height,$length,$weight,$tracking_pack);
        $_SESSION['success'] = "Bạn đã thêm thành công kiện hàng cho đơn hàng này!";
        header("location: ../../edit_package.php?id=$id_shipment");

    }catch(Throwable $err){
        $_SESSION['error'] = "Không thêm được kiện hàng mới cho đơn hàng này. Vui lòng kiểm tra lại thông tin!";
        header("location: ../../edit_package.php?id=$id_shipment");
    }

    
}