<?php 
session_start();
require_once "../../../model/config.php";
require_once "../../../model/database.php";
require_once "../../../model/order_shipment.php";

//Check id of order shipment
if(isset($_GET['id'])){
    $id_shipment = $_GET['id'];

    $orderShipment = new OrderShipment();

    $deleteShipment = $orderShipment->deleteShipment($id_shipment);

    if($deleteShipment){
        $_SESSION['success'] = "Bạn đã xóa thành công đơn hàng đã chọn!";
    }else{
        $_SESSION['error'] = "Đã xảy ra lỗi khi xóa đơn hàng. Vui lòng kiểm tra lại các thông tin liên quan!";    
    }
    header("location: ../../orders.php");exit;
}else{
    $_SESSION['error'] = "Vui lòng chọn một đơn hàng trước khi xóa!";
    header("location: ../../orders.php");exit;
}