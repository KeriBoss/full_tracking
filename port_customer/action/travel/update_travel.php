<?php 
session_start();
require_once "../../../model/config.php";
require_once "../../../model/database.php";
require_once "../../../model/travel_history.php";

if(isset($_GET['id']) && isset($_POST['kg_bill']) && isset($_POST['id_agency']) && isset($_POST['label_date']) && isset($_POST['label_text']) && isset($_POST['label_address'])){
    $id = $_GET['id'];
    $kg_bill = $_POST['kg_bill'];
    $id_agency = $_POST['id_agency'];
    $label_date = $_POST['label_date'];
    $label_text = $_POST['label_text'];
    $label_address = $_POST['label_address'];


    $travel = new TravelHistory();

    try{
        $updateTravel = $travel->update($id, $kg_bill, $id_agency, $label_date, $label_text, $label_address);

        $_SESSION['success'] = "Cập nhật lịch sử di chuyển thành công cho đơn hàng";
    }catch(Throwable $err){
        $_SESSION['error'] = "Đã xảy ra lỗi trong lúc cập nhật lịch sử di chuyển. Vui lòng kiểm tra lại!";
    }
    header("location: ../../list_travel_history.php");

}