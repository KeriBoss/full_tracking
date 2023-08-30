<?php 
session_start();
require_once "../../../model/config.php";
require_once "../../../model/database.php";
require_once "../../../model/travel_history.php";

if(isset($_GET['id'])){
    $id = $_GET['id'];

    $travel = new TravelHistory();

    try{
        $detele = $travel->delete($id);

        $_SESSION['success'] = "Xóa lịch sử di chuyển thành công cho đơn hàng";
    }catch(Throwable $err){
        $_SESSION['error'] = "Đã xảy ra lỗi trong lúc xóa lịch sử di chuyển. Vui lòng kiểm tra lại!";
    }
    header("location: ../../list_travel_history.php");
}