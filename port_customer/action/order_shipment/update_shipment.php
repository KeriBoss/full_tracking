<?php 
session_start();
require_once "../../../model/config.php";
require_once "../../../model/database.php";
require_once "../../../model/order_shipment.php";

if(isset($_GET['id'])){
    $id_shipment = $_GET['id'];

    //Create value before
    $value1 = '';
    $value2 = '';
    $value3 = '';
    $value4 = '';
    $value5 = '';
    $value6 = '';
    $value7 = '';
    $value8 = '';
    $value9 = '';
    $value10 = '';
    $value11 = '';
    $value12 = '';
    $value13 = '';
    $value14 = '';
    $value15 = '';
    $value16 = '';
    $value17 = '';
    $value18 = '';
    $value19 = '';
    $value20 = '';
    $value21 = '';

    
    if(isset($_POST['value-agency'])){
        $value2 = $_POST['value-agency'];
    }

    if(isset($_POST['referance_code'])){
        $value3 = $_POST['referance_code'];
    }

    if(isset($_POST['email'])){
        $value11 = $_POST['email'];
    }

    if(isset($_POST['receiver-province'])){
        $value18 = $_POST['receiver-province'];
    }

    if(isset($_POST['receiver-address3'])){
        $value21 = $_POST['receiver-address3'];
    }


    //Check data required
    if(isset($_POST['value-service']) && isset($_POST['type']) && isset($_POST['number_package']) && isset($_POST['gross-weight']) && isset($_POST['sender_company_name']) && isset($_POST['sender_contact_name']) && isset($_POST['sender_contact_address']) && isset($_POST['phone']) && isset($_POST['receiver_company_name']) && isset($_POST['receiver-contact']) && isset($_POST['receiver-phone']) && isset($_POST['value-country']) && isset($_POST['postal_code']) && isset($_POST['receiver-city']) && isset($_POST['receiver-address1']) && isset($_POST['receiver-address2'])){

        $value1 = $_POST['value-service'];
        $value4 = $_POST['type'];
        $value5 = $_POST['number_package'];
        $value6 = $_POST['gross-weight'];
        $value7 = $_POST['sender_company_name'];
        $value8 = $_POST['sender_contact_name'];
        $value9 = $_POST['sender_contact_address'];
        $value10 = $_POST['phone'];
        $value12 = $_POST['receiver_company_name'];
        $value13 = $_POST['receiver-contact'];
        $value14 = $_POST['receiver-phone'];
        $value15 = $_POST['value-country'];
        $value16 = $_POST['postal_code'];
        $value17 = $_POST['receiver-city'];
        $value19 = $_POST['receiver-address1'];
        $value20 = $_POST['receiver-address2'];

        $orders = new OrderShipment();

        $update = $orders->update($id_shipment,$value1,$value2,$value3,$value4,$value5,$value6,$value7,$value8,$value9,$value10,$value11,$value12,$value13,$value14,$value15,$value16,$value17,$value18,$value19,$value20,$value21);

        if($update){
            $_SESSION['success'] = "Cập nhật đơn hàng thành công!";
            header("location: ../../update_shipment.php?id=$id_shipment");
        }else{
            $_SESSION['error'] = "Cập nhật đơn hàng thất bại. Vui lòng nhập đầy đủ thông tin!";
            header("location: ../../update_shipment.php?id=$id_shipment");
        }
    }else{
        $_SESSION['error'] = "Cập nhật đơn hàng thất bại. Vui lòng nhập đầy đủ thông tin!";
        header("location: ../../update_shipment.php?id=$id_shipment");
    }
}