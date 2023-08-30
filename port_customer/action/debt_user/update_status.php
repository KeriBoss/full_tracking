<?php 
session_start();
require_once "../../../model/config.php";
require_once "../../../model/database.php";
require_once "../../../model/debt_user.php";

if(isset($_GET['kg_bill'])){
    $kg_bill = $_GET['kg_bill'];

    $debtUser = new DebtUser();

    try{
        //Create status
        $status = "Đã thanh toán";
        $updateStatus = $debtUser->updateStatus($kg_bill,$status);

        $_SESSION['success'] = "Bạn đã cập nhật trạng thái cho đơn hàng thành công!";
    }catch(Throwable $err){
        $_SESSION['error'] = "Đã xảy ra lỗi khi cập nhật trạng thái cho đơn hàng. Vui lòng kiểm tra lại!";
    }
    
    header("location: ../../debt_user.php");
}