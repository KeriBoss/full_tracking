<?php
include_once "./header.php";
require_once "../model/services.php";
require_once "../model/agency.php";
require_once "../model/country.php";
require_once "../model/type_product.php";

$service = new Services();//Tạo đối tượng cho nhà cung cấp
$getAllOrderShipment = $service->getAllOrderShipment();

//Create object agency
$agency = new Agency();
$getAllAgency = $agency->getAllAgency();

//Create object country
$country = new Country();
$getAllCountry = $country->getAllCountry();

//Get all type product
$typeProduct = new TypeProduct();
$getAllTypeProduct = $typeProduct->getAllTypeProduct();

//Notification if seat booking have full
if(isset($_SESSION['success'])){
    $str = $_SESSION['success'];
    $message = "
    <div class='alert alert-success alert-dismissible alert-alt solid fade show'>
        <button type='button' class='close h-100' data-dismiss='alert' aria-label='Close'><span><i class='mdi mdi-close'></i></span>
        </button>
        <strong>Chúc mừng!</strong> $str.
    </div>
    ";
    unset($_SESSION['success']);
}

//Notification if seat booking have full
if(isset($_SESSION['error'])){
    $str = $_SESSION['error'];
    $message = "
    <div class='alert alert-danger alert-dismissible alert-alt solid fade show'>
        <button type='button' class='close h-100' data-dismiss='alert' aria-label='Close'><span><i class='mdi mdi-close'></i></span>
        </button>
        <strong>Rất tiếc!</strong> $str.
    </div>
    ";
    unset($_SESSION['error']);
}

if(isset($_SESSION['detail'])){
    unset($_SESSION['detail']);
}

if(isset($_SESSION['invoice'])){
    unset($_SESSION['invoice']);
}
?>

<!-- page content -->
<div class="right_col" role="main">

<div class="row" style="display: block;">
    <div class="col-md-12 col-sm-12 ">
        <div class="dashboard_graph">

            <div class="row x_title">
                <div class="col-md-6">
                    <h3>Tạo vận đơn của bạn tại đây!</h3>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row" style="display: block;">
    <div class="col-md-12 col-sm-12 ">
        <?php if(isset($message)){ echo $message;} ?>
    </div>
</div>

<form action="./action/order_shipment/insert_shipment.php" method="post" class="form-horizontal form-label-left">
    <div class="row">
        <div class="col-md-12 col-sm-12 ">
            <div class="x_panel">
                <div class="x_content">
                    <h2></h2>
                    <!-- Tabs -->
                        <div class="row">
                            <div class="col-lg-3 col-md-6 col-12">
                                <div class="heading">
                                    <h4>Thông tin Đơn hàng (Shipment Info)</h4>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Dịch vụ vận chuyển (Services) <span class="require">*</span></label>
                                            <select name="value-service" class="form-control" required>
                                                <?php foreach($getAllOrderShipment as $item){ ?>
                                                    <option value="<?=$item['id']?>"><?=$item['keri002']?></option>
                                                <?php } ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Chọn chi nhánh</label>
                                            <select name="value-agency" class="form-control">
                                                <?php foreach($getAllAgency as $item){ ?>
                                                    <option value="<?=$item['id']?>"><?=$item['keri001']?></option>
                                                <?php } ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Referance Code</label>
                                            <input type="number" name="referance_code" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <div class="group-type shipment">
                                                <label for="">Loại (Type): </label>
                                                <div class="option">
                                                    <div class="item">
                                                        <input type="radio" name="type" id="type-doc" value="doc" checked>
                                                        <label for="type-doc">DOC</label>
                                                    </div>
                                                    <div class="item">
                                                        <input type="radio" name="type" id="type-pack" value="pack">
                                                        <label for="type-pack">PACK</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Số kiện (Number of Packages)</label>
                                            <input type="number" name="number_package" class="form-control" value="0" required>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group row">
                                            <label >Cân nặng (Gross Weight)<span class="required">*</span>
                                            </label>
                                            <div class="col-12 p-0">
                                                <input type="text" class="form-control" name="gross-weight" id="inputSuccess3" placeholder="0" required>
                                                <span class="form-control-feedback right" aria-hidden="true"><b>Kg</b></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-12">
                                <div class="heading">
                                    <h4>Thông tin Người gửi (Sender)</h4>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Công ty (Company Name) <span class="require">*</span></label>
                                            <input type="text" name="sender_company_name" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Người liên hệ (Contact Name) <span class="require">*</span></label>
                                            <input type="text" name="sender_contact_name" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Địa chỉ liên hệ (Contact Address) <span class="require">*</span></label>
                                            <input type="text" name="sender_contact_address" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Số điện thoại (Telephone) <span class="require">*</span></label>
                                            <input type="number" name="phone" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Email</label>
                                            <input type="email" name="email" class="form-control">
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 col-12">
                                <div class="heading">
                                    <h4>Thông tin Người nhận (Receiver)</h4>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6 col-12">
                                        <div class="form-group">
                                            <label for="">Công ty (Company Name) <span class="require">*</span></label>
                                            <input type="text" name="receiver_company_name" class="form-control" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="">Người liên hệ (Contact Name) <span class="require">*</span></label>
                                            <input type="text" name="receiver-contact" class="form-control" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="">Số điện thoại (Telephone) <span class="require">*</span></label>
                                            <input type="number" name="receiver-phone" class="form-control" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="">Quốc gia</label>
                                            <select name="value-country" class="form-control" required>
                                                <?php foreach($getAllCountry as $item){ ?>
                                                    <option value="<?=$item['id']?>"><?=$item['keri001']?></option>
                                                <?php } ?>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="">Mã bưu chính (Postal Code) <span class="require">*</span></label>
                                            <input type="number" name="postal_code" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-12">
                                        <div class="form-group">
                                            <label for="">Thành phố (City) <span class="require">*</span></label>
                                            <input type="text" name="receiver-city" class="form-control" placeholder="Nhập thành phố (City)" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="">Tỉnh (States/Province)</label>
                                            <input type="text" name="receiver-province" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for="">Địa chỉ (Address) 1 <span class="require">*</span></label>
                                            <input type="text" name="receiver-address1" class="form-control" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="">Địa chỉ (Address) 2 <span class="require">*</span></label>
                                            <input type="text" name="receiver-address2" class="form-control" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="">Địa chỉ (Address) 3</label>
                                            <input type="text" name="receiver-address3" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="pack-details" class="row mt-4">
                            <div class="col-12">
                                <div class="heading">
                                    <h4>PACK DETAILS</h4>
                                    <p><span class="note-danger">*Chú ý cân nặng phải được làm tròn</span></p>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="pack-detail row">
                                    <div class="col-3">
                                        <div class="form-group">
                                            <label for="pack-detail-quantity">Số lượng (Quantity)</label>
                                            <input type="number" class="form-control" id="pack-detail-quantity">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="form-group">
                                            <label for="pack-detail-type">Loại (Type)</label>
                                            <select name="" id="pack-detail-type" class="form-control">
                                                <?php foreach($getAllTypeProduct as $item){ ?>
                                                    <option value="<?=$item['id']?>"><?=$item['keri002']?></option>
                                                <?php } ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="form-group">
                                            <label for="pack-detail-width">Chiều rộng (cm)</label>
                                            <input type="number" class="form-control" id="pack-detail-width">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="form-group">
                                            <label for="pack-detail-height">Chiều dài (cm)</label>
                                            <input type="number" class="form-control" id="pack-detail-height">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="form-group">
                                            <label for="pack-detail-length">Chiều cao (cm)</label>
                                            <input type="number" class="form-control" id="pack-detail-length">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="form-group">
                                            <label for="pack-detail-weight">Cân nặng (kg)</label>
                                            <input type="number" class="form-control" id="pack-detail-weight">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-flex justify-content-center">
                                            <button id="add-detail" type="button" class="btn btn-primary">+ Thêm</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <table id="table-pack-detail" class="table table-striped table-bordered bulk_action" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Số lượng</th>
                                                <th>Loại</th>
                                                <th>Chiều rộng</th>
                                                <th>Chiều dài</th>
                                                <th>Chiều cao</th>
                                                <th>Cân nặng</th>
                                                <th>Converted weight</th>
                                                <th>Charge weight</th>
                                                <th>Xóa</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div id="pack-invoice" class="row mt-4">
                            <div class="col-12">
                                <div class="heading">
                                    <h4>INVOICE</h4>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-invoice row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-2">
                                                <div class="form-group">
                                                    <label for="">Chọn loại file xuất: </label>
                                                    <select name="" id="invoice-export" class="form-control">
                                                        <option value="pdf">PDF</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label for="invoice-description">Chi tiết sản phẩm  (tên, thành phần, ...)</label>
                                            <textarea id="invoice-description" class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="form-group">
                                            <label for="invoice-quantity">Số lượng (Quantity)</label>
                                            <input type="number" class="form-control" id="invoice-quantity">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="form-group">
                                            <label for="invoice-unit">Chủ đề (Unit)</label>
                                            <input type="text" class="form-control" id="invoice-unit">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="form-group">
                                            <label for="invoice-price">Giá (Price)</label>
                                            <input type="number" class="form-control" id="invoice-price">
                                        </div>
                                    </div>
                                    
                                    <div class="col-12">
                                        <div class="d-flex justify-content-center">
                                            <button id="add-invoice" type="button" class="btn btn-primary">+ Thêm</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <table id="table-invoice" class="table table-striped table-bordered bulk_action" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Thông tin sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Chủ đề</th>
                                                <th>Giá</th>
                                                <th>Tổng tiền</th>
                                                <th>Xóa</th>
                                            </tr>
                                        </thead>

                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-end mt-5">
                            <button type="submit" class="btn btn-primary">Xác nhận</button>
                        </div>
                        <!-- End SmartWizard Content -->
                </div>
            </div>
        </div>
        
    </div>
</form>
</div>
<!-- /page content -->


<?php
include_once "./footer.php";
?>