<?php 
session_start();
require_once "../../../model/config.php";
require_once "../../../model/database.php";
require_once "../../../model/travel_history.php";

if(isset($_SESSION['travel'])){
    $travel = new TravelHistory();

    try{
        foreach($_SESSION['travel'] as $item){
            $insertTravel = $travel->insert($item['kg_bill'],$item['id_service'],$item['date_travel'],$item['name_action'],$item['address_travel']);
        }

        $_SESSION['success'] = "Thêm lịch sử di chuyển thành công cho đơn hàng";
    }catch(Throwable $err){
        $_SESSION['error'] = "Đã xảy ra lỗi trong lúc thêm lịch sử di chuyển. Vui lòng kiểm tra lại!";
    }
    header("location: ../../list_travel_history.php");

}