<?php 
session_start();
require_once "../../../model/config.php";
require_once "../../../model/database.php";
require_once "../../../model/order_shipment.php";

if(isset($_GET['id']) && isset($_GET['id_package'])){
    $id_shipment = $_GET['id'];
    $id_package = $_GET['id_package'];

    try{
        $order_shipment = new OrderShipment();
        $deletePackage = $order_shipment->deletePackage($id_package);

        $_SESSION['success'] = "Bạn đã xóa thành công kiện hàng cho đơn hàng này!";
        header("location: ../../edit_package.php?id=$id_shipment");

    }catch(Throwable $err){
        $_SESSION['error'] = "Không xóa được kiện hàng của cho đơn hàng này. Vui lòng kiểm tra lại thông tin!";
        header("location: ../../edit_package.php?id=$id_shipment");
    }

    
}