<?php 
session_start();
require_once "../../../model/config.php";
require_once "../../../model/database.php";
require_once "../../../model/services.php";
require_once "../../../model/country.php";
require_once "../../../model/order_shipment.php";
require_once "../../../model/bill_lading.php";
require_once "../../../model/tracking.php";

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

    // var_dump($value1,$value2,$value3,$value4,$value5,$value6,$value7,$value8,$value9,$value10,$value11,$value12,$value13,$value14,$value15,$value16,$value17,$value18,$value19,$value20,$value21);
    try{

        $kg_bill = rand(1111111111,9999999999);

        
        $orders = new OrderShipment();
        
        while(count($orders->getKGBill($kg_bill)) > 0){
            $kg_bill = rand(1111111111,9999999999);
        }

        //Status shipment
        $status = 'Đang chờ';

        $insert = $orders->insert($value1,$value2,$value3,$value4,$value5,$value6,$value7,$value8,$value9,$value10,$value11,$value12,$value13,$value14,$value15,$value16,$value17,$value18,$value19,$value20,$value21,$kg_bill,$status);

        if($insert > 0){
            $service = new Services();
            $name_service = $service->getServiceById($_POST['value-service'])[0]['keri002'];

            //Get name country
            $country = new Country();
            $name_country = $country->getCountryById($_POST['value-country'])[0]['keri001'];

            //Create new bill of lading
            $billLading = new BillLading();
            $v_bill_1 = '';//Date
            $v_bill_2 = '';//
            $v_bill_3 = '';//SGB
            $v_bill_4 = $_POST['receiver-contact'];//user
            $v_bill_5 = $_POST['sender_contact_name'];//Name staff
            $v_bill_6 = '';//Shipper
            $v_bill_7 = $_POST['sender_contact_address'];
            $v_bill_8 = $_POST['receiver-address1'];
            $v_bill_9 = '';
            $v_bill_10 = '';//VND -> USD
            $v_bill_11 = $name_service;//Service
            $v_bill_12 = $value2;//Agency
            $v_bill_13 = '';//
            $v_bill_14 = $_POST['type'];
            $v_bill_15 = $name_country;//Country
            $v_bill_16 = '';//zone
            $v_bill_17 = '';//type price
            $v_bill_18 = '';//given weight
            $v_bill_19 = '';//quotation
            $v_bill_20 = '';//detail product
            $v_bill_21 = '';//currency
            $v_bill_22 = $_POST['gross-weight'];
            $v_bill_23 = '';//price sell
            $v_bill_24 = '';
            $v_bill_25 = '';
            $v_bill_26 = '';//tax
            $v_bill_27 = '';
            $v_bill_28 = $kg_bill;//kb bill
            $v_bill_29 = '';//note sell
            $v_bill_30 = '';//note buy
            $v_bill_31 = '';//weight ncc
            $v_bill_32 = '';//
            $v_bill_33 = '';//
            $v_bill_34 = '';//
            $v_bill_35 = '';//
            $v_bill_36 = '';//
            $v_bill_37 = '';//
            $v_bill_38 = '';
            $v_bill_39 = '';//
            $v_bill_40 = '';//tax
            $v_bill_41 = '';
            $v_bill_42 = '';
            $v_bill_43 = '';
            $v_bill_44 = '';
            $v_bill_45 = '';

            $v_bill_46 = '';//end
            $id_tracking = rand(1111111111,9999999999);

            while(count($billLading->getIdTracking($id_tracking)) > 0){
                $id_tracking = rand(1111111111,9999999999);
            }

            $v_bill_47 = $id_tracking;
            $v_bill_48 = '';
            $v_bill_49 = '';
            $v_bill_50 = '';
            try{
                $insertBill = $billLading->insert($v_bill_1,$v_bill_2,$v_bill_3,$v_bill_4,$v_bill_5,$v_bill_6,$v_bill_7,$v_bill_8,$v_bill_9,$v_bill_10,$v_bill_11,$v_bill_12,$v_bill_13,$v_bill_14,$v_bill_15,$v_bill_16,$v_bill_17,$v_bill_18,$v_bill_19,$v_bill_20,$v_bill_21,$v_bill_22,$v_bill_23,$v_bill_24,$v_bill_25,$v_bill_26,$v_bill_27,$v_bill_28,$v_bill_29,$v_bill_30,$v_bill_31,$v_bill_32,$v_bill_33,$v_bill_34,$v_bill_35,$v_bill_36,$v_bill_37,$v_bill_38,$v_bill_39,$v_bill_40,$v_bill_41,$v_bill_42,$v_bill_43,$v_bill_44,$v_bill_45,$v_bill_46,$v_bill_47,$v_bill_48,$v_bill_49,$v_bill_50);

                //Insert tracking for order
                $tracking = new Tracking();

                //Date send package
                $date_send = '';//dd/mm/yyyy
                $date_ksg = '';//dd/mm/yyyy
                $date_origin = '';//dd/mm/yyyy
                $date_transit = '';//dd/mm/yyyy
                $transport_tracking = '';//dd/mm/yyyy
                $standard_ship = '';//Y-m-d H:i:s
                $policy = 'Sender';//Policy: sender
                $paper_package = 'Package';

                try{
                    $insertTracking = $tracking->insert($id_tracking,$date_send,$date_ksg,$date_origin,$date_transit,$transport_tracking,$standard_ship,$policy,$paper_package);
                }catch(Throwable $err){
                    echo $err;
                }

            }catch(Throwable $err){
                $deleteShipment = $orders->deleteShipment($insert);
                $_SESSION['error'] = $err;
                header("location: ../../create_shipment.php");exit;
            }


            //Insert data if type of product is PACK
            if($value4 == "pack"){
                if(isset($_SESSION['detail'])){
                    foreach($_SESSION['detail'] as $item){
                        $insertPack = $orders->insertPackDetail($insert,$item['quantity'],$item['type'],$item['width'],$item['height'],$item['length'],$item['weight'],$id_tracking);
                    }
                }

                if(isset($_SESSION['invoice'])){
                    foreach($_SESSION['invoice'] as $item){
                        $insertInvoice = $orders->insertPackInvoice($insert,$item['export'],$item['description'],$item['quantity'],$item['unit'],$item['price']);
                    }
                }
                $_SESSION['success'] = "Bạn đã tạo thành công vận đơn!";
                header("location: ../../export_invoice.php?id=$insert");exit;

            }else{
                $_SESSION['success'] = "Bạn đã tạo thành công vận đơn!";
                header("location: ../../create_shipment.php");exit;
            }

        }else{
            $_SESSION['error'] = "Đã xảy ra lỗi khi thêm đối tượng. Vui lòng kiểm tra lại thông tin!";
            header("location: ../../create_shipment.php");exit;
        }
    }catch(Throwable $err){
        $_SESSION['error'] = $err;
        header("location: ../../create_shipment.php");exit;
    }
}