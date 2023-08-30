/**
 * Show dialog import file
 */

// DropzoneJS Demo Code Start
Dropzone.autoDiscover = false

// Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
var previewNode = document.querySelector("#template")
if(previewNode){

    previewNode.id = ""
    var previewTemplate = previewNode.parentNode.innerHTML
    previewNode.parentNode.removeChild(previewNode)
    
    var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
        url: "/target-url", // Set the url
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        parallelUploads: 20,
        previewTemplate: previewTemplate,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: "#previews", // Define the container to display the previews
        clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
    })
    
    myDropzone.on("addedfile", function(file) {
      // Hookup the start button
        file.previewElement.querySelector(".start").onclick = function() { myDropzone.enqueueFile(file) }
    })
    
    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function(progress) {
        document.querySelector("#total-progress .progress-bar").style.width = progress + "%"
    })
    
    myDropzone.on("sending", function(file) {
      // Show the total progress bar when upload starts
        document.querySelector("#total-progress").style.opacity = "1"
      // And disable the start button
        file.previewElement.querySelector(".start").setAttribute("disabled", "disabled")
    })
    
    // Hide the total progress bar when nothing's uploading anymore
    myDropzone.on("queuecomplete", function(progress) {
        document.querySelector("#total-progress").style.opacity = "0"
    })
}

/**
 * Show table for pack detail and invoice
 */
const groupTypeShipment = document.querySelector('.group-type.shipment');

if(groupTypeShipment){
    const inputElement = groupTypeShipment.querySelectorAll('input[type=radio]');

    if(inputElement){
        inputElement.forEach(itemInput => {
            const wrapperPackDetail = document.getElementById('pack-details'); 
            const wrapperPackInvoice = document.getElementById('pack-invoice');

            if(itemInput.checked == true){
                if(itemInput.value == 'pack'){
                    if(wrapperPackDetail && wrapperPackInvoice){
                        wrapperPackDetail.style.display = 'block';
                        wrapperPackInvoice.style.display = 'block';
                    }
                }
                else{
                    if(wrapperPackDetail && wrapperPackInvoice){
                        wrapperPackDetail.style.display = 'none';
                        wrapperPackInvoice.style.display = 'none';
                    }
                }
            }

            itemInput.addEventListener('click', function(event){
                const wrapperPackDetail = document.getElementById('pack-details'); 
                const wrapperPackInvoice = document.getElementById('pack-invoice');

                if(itemInput.checked == true){
                    if(itemInput.value == 'pack'){
                        if(wrapperPackDetail && wrapperPackInvoice){
                            wrapperPackDetail.style.display = 'block';
                            wrapperPackInvoice.style.display = 'block';
                        }
                    }
                    else{
                        if(wrapperPackDetail && wrapperPackInvoice){
                            wrapperPackDetail.style.display = 'none';
                            wrapperPackInvoice.style.display = 'none';
                        }
                    }
                }
            })
        })
    }

}


//Page create shipmemt
//Option pack
const wrapperPackDetail = document.getElementById('pack-details');

if(wrapperPackDetail){
    const formDeatil = wrapperPackDetail.querySelector('.pack-detail');
    if(formDeatil){
        const inputQuantity = formDeatil.querySelector('input#pack-detail-quantity');
        const inputType = formDeatil.querySelector('select#pack-detail-type');
        const inputWidht = formDeatil.querySelector('input#pack-detail-width');
        const inputHeight = formDeatil.querySelector('input#pack-detail-height');
        const inputLength = formDeatil.querySelector('input#pack-detail-length');
        const inputWeight = formDeatil.querySelector('input#pack-detail-weight');

        const btnAddDetail = formDeatil.querySelector('button#add-detail');

        if(inputQuantity && inputType && inputWidht && inputHeight && inputLength && inputWeight && btnAddDetail){
            //Get value converted weight

            //Add data in table
            btnAddDetail.addEventListener('click', function(event){
                event.preventDefault();

                let quantity = inputQuantity.value;
                let type = inputType.value;
                let width = inputWidht.value;
                let height = inputHeight.value;
                let length = inputLength.value;
                let weight = inputWeight.value;
                let converted = convertedWeight(length,width,height);
                let chargeWeight = converted > weight ? converted : weight;

                //Check value input
                if(quantity == ''){
                    inputQuantity.focus();
                }
                else if(width == ''){
                    inputWidht.focus();
                }
                else if(height == ''){
                    inputHeight.focus();
                }
                else if(length == ''){
                    inputLength.focus();
                }
                else if(weight == ''){
                    inputWeight.focus();
                }
                else{
                    $.ajax({
                        url: 'ajax/insert_pack_detail.php',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            quantity: quantity,
                            type: type,
                            width: width,
                            height: height,
                            length: length,
                            weight: weight,
                            converted: converted,
                            charge_weight: chargeWeight
                        }
                    }).done(function(reponse){
                        setContentTableDetail(reponse);
    
                        inputQuantity.value = '';
                        inputWidht.value = '';
                        inputHeight.value = '';
                        inputLength.value = '';
                        inputWeight.value = '';
    
                        const btnDelete = document.querySelectorAll('.btn-remove-detail');
                        if(btnDelete){
                            deleteTr(btnDelete);
                        }
                    })

                }
            })
        }
    }
}

function convertedWeight(length,width,height){
    let converted = (length*width*height)/5000;
    return converted;
}

function deleteTr(divAll){
    divAll.forEach(item => {
        item.addEventListener('click', function(event){
            event.preventDefault();

            let idTr = item.dataset.id;
            
            $.ajax({
                url: 'ajax/delete_item_session.php',
                type: 'get',
                dataType: 'json',
                data: {
                    id: idTr
                }
            }).done(function(reponse){
                setContentTableDetail(reponse);
            })
        })
    })
}

function setContentTableDetail(reponse){
    const tableDetaile = document.getElementById('table-pack-detail');

    if(tableDetaile){
        const tbody = tableDetaile.querySelector('tbody');
        tbody.innerHTML = ``;

        reponse.forEach((element, index) => {
            tbody.innerHTML += `
            <td>${index+1}</td>
            <td>${element['quantity']}</td>
            <td>${element['type']}</td>
            <td>${element['width']}</td>
            <td>${element['height']}</td>
            <td>${element['length']}</td>
            <td>${element['weight']}</td>
            <td>${element['converted']}</td>
            <td>${element['charge_weight']}</td>
            <td>
                <button data-id="${element['id']}" type="button" class="btn btn-danger btn-remove-detail"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
            </td>
            `;
        });

        const btnDelete = document.querySelectorAll('.btn-remove-detail');
        if(btnDelete){
            deleteTr(btnDelete);
        }
    }
}

/**
 * Page create shipment
 * Option pack
 * Invoice
 */
const wrapperPackInvoice = document.getElementById('pack-invoice');

if(wrapperPackInvoice){
    const formInvoice = wrapperPackInvoice.querySelector('.form-invoice');
    if(formInvoice){
        const inputExport = formInvoice.querySelector('#invoice-export');
        const inputDesc = formInvoice.querySelector('textarea#invoice-description');
        const inputQuantity = formInvoice.querySelector('input#invoice-quantity');
        const inputUnit = formInvoice.querySelector('input#invoice-unit');
        const inputPrice = formInvoice.querySelector('input#invoice-price');

        const btnAddInvoice = formInvoice.querySelector('button#add-invoice');

        if(inputExport && inputDesc && inputQuantity && inputUnit && inputPrice && btnAddInvoice){
            btnAddInvoice.addEventListener('click', function(event){
                event.preventDefault();

                let export1 = inputExport.value;
                let desc = inputDesc.value;
                let quantity = inputQuantity.value;
                let unit = inputUnit.value;
                let price = inputPrice.value;

                //Check value input
                if(desc == ''){
                    inputDesc.focus();
                }
                else if(quantity == ''){
                    inputQuantity.focus();
                }
                else if(unit == ''){
                    inputUnit.focus();
                }
                else if(price == ''){
                    inputPrice.focus();
                }
                else {
                    $.ajax({
                        url: 'ajax/insert_pack_invoice.php',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            export: export1,
                            description: desc,
                            quantity: quantity,
                            unit: unit,
                            price: price
                        }
                    }).done(function(reponse){
                        setContentTableInvoice(reponse);
    
                        inputDesc.value = '';
                        inputQuantity.value = '';
                        inputPrice.value = '';
    
                        const btnDelete = document.querySelectorAll('.btn-remove-invoice');
                        if(btnDelete){
                            deleteTrInvoice(btnDelete);
                        }
                    })
                    
                }

            })
        }
    }
}

function setContentTableInvoice(reponse){
    const tableInvoice = document.getElementById('table-invoice');

    if(tableInvoice){
        const tbody = tableInvoice.querySelector('tbody');
        tbody.innerHTML = ``;

        reponse.forEach((element, index) => {
            tbody.innerHTML += `
            <td>${index+1}</td>
            <td>${element['description']}</td>
            <td>${element['quantity']}</td>
            <td>${element['unit']}</td>
            <td>${element['price']}</td>
            <td>${element['price'] * element['quantity']}</td>
            <td>
                <button data-id="${element['id']}" type="button" class="btn btn-danger btn-remove-invoice"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
            </td>
            `;
        });

        const btnDelete = document.querySelectorAll('.btn-remove-invoice');
        if(btnDelete){
            deleteTrInvoice(btnDelete);
        }
    }
}


function deleteTrInvoice(divAll){
    divAll.forEach(item => {
        item.addEventListener('click', function(event){
            event.preventDefault();

            let idTr = item.dataset.id;
            
            $.ajax({
                url: 'ajax/delete_item_invoice.php',
                type: 'get',
                dataType: 'json',
                data: {
                    id: idTr
                }
            }).done(function(reponse){
                setContentTableInvoice(reponse);
            })
        })
    })
}

/**
 * List shipment
 * Get info tracking of the order shipment
 */
const listShipment = document.querySelector('.list-shipment');
if(listShipment){
    const btnTracking = listShipment.querySelectorAll('.btn-tracking');

    if(btnTracking){
        btnTracking.forEach(button => {
            //Button show modal infomation tracking
            button.addEventListener('click', function(event){
                let num_tracking = event.target.dataset.id;//get data of bill lading
                // console.log(num_tracking);
                $.ajax({
                    url: 'ajax/show_shipment.php',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        tracking: num_tracking
                    }
                }).done(function(reponse){
                    console.log(reponse);
                    setModalTracking(reponse);
                })
            })
        })
    }
}

function setModalTracking(reponse){
    let id_service = reponse['keri001'];
    let id_agency = reponse['keri002'];
    let id_country = reponse['keri015'];

    //Data
    let nameService = '';
    let nameAgency = '';
    let nameCountry = '';

    if(id_service == ''){
        const modalShipment = document.getElementById('info-shipment');
        if(modalShipment){
            modalShipment.innerHTM = ``;
            modalShipment.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel"><b>Thông tin đơn hàng (Order Shipment)</b></h4>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <h2>Đơn hàng này hiện đang thiếu dữ liệu. Vui lòng bổ sung thêm!</h2>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
            `;
        }
    }else{
        $.ajax({
            url: 'ajax/get_service_byid.php',
            type: 'get',
            dataType: 'json',
            data: {
                id_service: id_service
            }
        }).done(function(service){
            nameService = service['keri002'];
    
            $.ajax({
                url: 'ajax/get_country_byid.php',
                type: 'get',
                dataType: 'json',
                data: {
                    id_country: id_country
                }
            }).done(function(country){
                nameCountry = country['keri001'];
    
                $.ajax({
                    url: 'ajax/get_agency_byid.php',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id_agency: id_agency
                    }
                }).done(function(agency){
                    nameAgency = agency['keri001'];
    
                    const modalShipment = document.getElementById('info-shipment');
    
                    if(modalShipment){
                        modalShipment.innerHTML = ``;
                        modalShipment.innerHTML = `
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
    
                                <div class="modal-header">
                                    <h4 class="modal-title" id="myModalLabel"><b>Thông tin đơn hàng (Order Shipment)</b></h4>
                                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6 col-12">
                                            <h5>Thông tin đơn hàng (Shipment Info)</h5>
                                            <p>Dịch vụ vận chuyển (Services): ${nameService}</p>
                                            <p>Chi nhánh: ${nameAgency}</p>
                                            <p>Reference Code: ${reponse['keri003']}</p>
                                            <p>Loại (Type): ${reponse['keri004']}</p>
                                            <p>Số kiện (Number of Packages): ${reponse['keri005']}</p>
                                            <p>Cân nặng (Gross Weight): ${reponse['keri006']} Kg</p>
                                        </div>
                                        <div class="col-lg-6 col-12">
                                            <h5>Thông tin người gửi (Sender)</h5>
                                            <p>Công ty (Company Name): ${reponse['keri007']}</p>
                                            <p>Người liên hệ (Contact Name): ${reponse['keri008']}</p>
                                            <p>Địa chỉ liên hệ (Contact address): ${reponse['keri009']}</p>
                                            <p>Số điện thoại (Telephone): ${reponse['keri010']}</p>
                                            <p>Email: ${reponse['keri011']}</p>
                                        </div>
                                        <div class="col-lg-6 col-12">
                                            <h5>Thông tin người nhận (Receiver)</h5>
                                            <p>Công ty (Company Name): ${reponse['keri012']}</p>
                                            <p>Người liên hệ (Contact Name): ${reponse['keri013']}</p>
                                            <p>Số điện thoại (Telephone): ${reponse['keri014']}</p>
                                            <p>Quốc gia (Country): ${nameCountry}</p>
                                            <p>Mã bưu chính (Postal code): ${reponse['keri016']}</p>
                                            <p>Địa chỉ liên hệ (Contact address):${reponse['keri020']}.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                                </div>
    
                            </div>
                        </div>
                        `;
                    }
                })
            })
    
        })
    }

}


//Function get name service
function getNameService(idService){
    $.ajax({
        url: 'ajax/get_service_byid.php',
        type: 'get',
        dataType: 'json',
        data: {
            id_service: idService
        }
    }).done(function(reponse){
        return reponse;
    })
}


//Function get name agency
function getNameAgency(idAgency){
    $.ajax({
        url: 'ajax/get_agency_byid.php',
        type: 'get',
        dataType: 'json',
        data: {
            id_agency: idAgency
        }
    }).done(function(reponse){
        console.log(reponse);
    })
}


/**
 * List shipment page
 * Sort by date
 */
const beginDate = document.getElementById('begin-date');
const endDate = document.getElementById('end-date');
const btnSortDate = document.getElementById('btn-sort-date');

if(beginDate && endDate && btnSortDate){
    btnSortDate.addEventListener('click', function(event){
        event.preventDefault();

        let valueDateBegin = beginDate.value;
        let valueDateEnd = endDate.value;

        console.log(valueDateBegin);
        $.ajax({
            url: 'ajax/sort_shipment_date.php',
            type: 'get',
            dataType: 'json',
            data: {
                date_start: valueDateBegin,
                date_end: valueDateEnd
            }
        }).done(function(reponse){

            //Get tracking
            $.ajax({
                url: 'ajax/get_all_lading.php',
                type: 'get',
                dataType: 'json',
                data: {}
            }).done(function(tracking){

                //Get tracking
                $.ajax({
                    url: 'ajax/getall_agency.php',
                    type: 'get',
                    dataType: 'json',
                    data: {
                    }
                }).done(function(agency){
                    
                    const table = document.querySelector('.list-shipment .table-responsive');
                    if(table){
                        // const tbody = table.querySelector('tbody');
                        table.innerHTML = ``;
                        let trTable = ``;
                        reponse.forEach((item, index) => {
                            const today = new Date(item['created_at']);
                            const year = today.getFullYear();
                            const month = (today.getMonth() + 1).toString().padStart(2, '0');
                            const day = today.getDate().toString().padStart(2, '0');
                            const formattedDate = `${day}/${month}/${year}`;
    
                            let valueTracking = '';
                            tracking.forEach(bill => {
                                if(bill['keri028'] == item['kg_bill']){
                                    valueTracking = bill['keri047'];
                                }
                            })
                            let nameAgency = '';
                            agency.forEach(itemAgency => {
                                if(itemAgency['id'] == item['keri002']){
                                    nameAgency = itemAgency['keri002'];
                                }
                            })

                            trTable += `
                            <tr>
                                <td></td>
                                <td>${index+1}</td>
                                <td>${item['kg_bill']}</td>
                                <td>${item['keri003']}</td>
                                <td> ${item['keri008']} <br> ${item['keri010']} <br> ${item['keri011']}</td>
                                <td> ${item['keri009']}</td>
                                <td>${formattedDate}</td>
                                <td>
                                    <a data-id="${valueTracking}" class="text-primary btn-tracking" data-toggle="modal"
                                    data-target=".bs-example-modal-lg">${valueTracking}</a>
                                </td>
                                <td>
                                    
                                ${nameAgency}
                                </td>
                                <td>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        Tác vụ
                                        </button>
                                        <div class="dropdown-menu">
                                            <a data-id="${item['id']}" class="dropdown-item btn-print-bill" ><i class="fa fa-print"></i> Print Bill</a>
                                            <a data-id="${item['id']}" class="dropdown-item btn-print-invoice"><i class="fa fa-print"></i> Print Invoice</a>
                                            <a data-id="${item['id']}" class="dropdown-item btn-print-label" ><i class="fa fa-print"></i> Print Label</a>
                                            <a class="dropdown-item" href="./edit_package.php?id=${item['id']}"><i class="fa fa-edit"></i> Edit Package</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            `;

                            table.innerHTML = `
                            <table id="datatable-checkbox"
                                class="table table-striped table-bordered bulk_action nowrap text-center"
                                style="width:100%">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>#</th>
                                        <th>KG Bill</th>
                                        <th>Reference Code</th>
                                        <th>Người Liên Hệ</th>
                                        <th>Địa Chỉ</th>
                                        <th>Ngày Gửi</th>
                                        <th>Tracking</th>
                                        <th>Chi Nhánh</th>
                                        <th>Bill/Invoice</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    ${trTable}
                                </tbody>
                            </table>
                            `;

                            $('#datatable-checkbox').DataTable();

                            const tableShipment1 = document.querySelector('.list-shipment');
                            if(tableShipment1){
                                const itemRow = tableShipment1.querySelectorAll('tbody tr');
                                if(itemRow){
                                    activePrint(itemRow);
                                }
                            }
                        })
                        const listShipment = document.querySelector('.list-shipment');
    
                        if(listShipment){
                            const btnTracking = listShipment.querySelectorAll('.btn-tracking');
    
                            if(btnTracking){
                                btnTracking.forEach(button => {
                                    //Button show modal infomation tracking
                                    button.addEventListener('click', function(event){
                                        let num_tracking = event.target.dataset.id;//get data of bill lading
                                        // console.log(num_tracking);
                                        $.ajax({
                                            url: 'ajax/show_shipment.php',
                                            type: 'get',
                                            dataType: 'json',
                                            data: {
                                                tracking: num_tracking
                                            }
                                        }).done(function(reponse1){
                                            setModalTracking(reponse1);
                                        })
                                    })
                                })
                            }
                        }
    
                    }
                })

            })

        })
    })
}

/**
 * Page orders
 * Show list shipment for order
 */
const btnShowShipment = document.querySelectorAll('.btn-show-shipment');
if(btnShowShipment){
    showInfoOrder(btnShowShipment);
}

function showInfoOrder(btnShowShipment){
    btnShowShipment.forEach(button => {
        //Button show modal infomation tracking
        button.addEventListener('click', function(event){
            let kg_bill = event.target.dataset.id;//get data of bill lading
            $.ajax({
                url: 'ajax/get_tracking_kgbill.php',
                type: 'get',
                dataType: 'json',
                data: {
                    kg_bill: kg_bill
                }
            }).done(function(reponse){
                setModalTracking(reponse);
            })
        })
    })
}

//Get all div button print QR code in orders page
const btnPrintQr = document.querySelectorAll('.btn-print-qr');
if(btnPrintQr){
    printQRCodeForAOrder(btnPrintQr)
}

function printQRCodeForAOrder(btnPrintQr){
    btnPrintQr.forEach(btnItem => {
        btnItem.addEventListener('click', function(event){
            event.preventDefault();
    
            let id_shipment = btnItem.dataset.id;
            
            if(document.getElementById("qrcode")){
                document.getElementById("qrcode").innerHTML= ``;
            }
            //
            //Get shipment by id
            $.ajax({
                url: 'ajax/get_shipment.php',
                type: 'get',
                dataType: 'json',
                data: {
                    id_shipment: id_shipment
                }
            }).done(function(reponse){
                let idService = reponse['keri001'];
    
                //Get service by id
                $.ajax({
                    url: 'ajax/get_service_byid.php',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id_service: idService
                    }
                }).done(function(service){
    
                    //get value url qr code 
                    const inputQR = document.getElementById('url-qrcode');
                    if(inputQR){
                        let urlHost = inputQR.value;
                        inputQR.value = `${inputQR.value}${id_shipment}`;
                        
                        var qrcode = new QRCode(document.getElementById("qrcode"), {
                            width : 250,
                            height : 250
                        });
                        qrcode.makeCode(inputQR.value);
    
                        //Return value url current host
                        inputQR.value = urlHost;
    
                        if(document.querySelector('#qrcode img')){
    
                            const divPrintOp = document.getElementById('order-print-qr');
                            if(divPrintOp){
                                const info1 = divPrintOp.querySelector('.info-1');
                                const info2 = divPrintOp.querySelector('.info-2');
    
                                info1.innerHTML = `${service['keri002']} - ${reponse['keri004']}`;
                                info2.innerHTML = `${reponse['keri013']}`;
                            }
    
                            let printIntal = setInterval(function() {
                                if(document.querySelector('#qrcode img').getAttribute('src') != null){
                                    var divContents = $("#order-print-qr").html();
                                    var printWindow = window.open('', '', 'height=800,width=800');
                                    printWindow.document.write('<html><head><title>DIV Contents</title>');
                                    printWindow.document.write('</head><body >');
                                    printWindow.document.write(divContents);
                                    printWindow.document.write('</body></html>');
                                    printWindow.document.close();
                                    printWindow.print();
    
                                    //Stop print QR
                                    clearInterval(printIntal);
                                }
    
                            }, 1000);
                        }
                    }
                })
            })
    
        })
    })
    
}

/**
 * Print excel list orders
 * @returns 
 */
const btnExportExcel = document.getElementById('button-export-excel');
if(btnExportExcel){
    btnExportExcel.addEventListener('click', function(event){
        event.preventDefault();

        if(alertNotification("Bạn có muốn xuất file excel với thông tin bảng hiển thị bên dưới?") == true){
            let data = document.getElementById('datatable-checkbox');
            
            let excelFile = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
            XLSX.write(excelFile, { bookType: "xls", bookSST: true, type: 'base64' });
            XLSX.writeFile(excelFile, 'orders.' + "xls");
        }

    })
}

/**
 * Print list qr code
 * @returns 
 */
const btnPrintListQR = document.getElementById('print-list-qrcode');
if(btnPrintListQR){
    btnPrintListQR.addEventListener('click', function(event){
        //Check item in list print QR
        const inputItem = document.getElementById('item-print-qr');
        if(inputItem){
            if(inputItem.value != ''){
                //Notification
                if(alertNotification("Bạn có muốn xuất mã QR mới các đơn hàng đã chọn?") == true){
                    let arrOrder = JSON.parse(inputItem.value);
    
                    const divPrintOp = document.getElementById('order-print-qr');
                    if(divPrintOp){
                        divPrintOp.innerHTML = ``;
                    }

                    let listShipment;
                    let listService;

                    //Get all shipment
                    $.ajax({
                        url: 'ajax/get_all_shipment.php',
                        type: 'get',
                        dataType: 'json',
                        async: false,
                        data: {}
                    }).done(function(shipment){
                        listShipment = shipment;
                    })

                    //Get all services
                    $.ajax({
                        url: 'ajax/get_all_service.php',
                        type: 'get',
                        dataType: 'json',
                        async: false,
                        data: {}
                    }).done(function(services){
                        listService = services;
                    });

                    arrOrder.forEach((order, indexOrder) => {
                        let id_shipment = order;

                        if(document.getElementById("qrcode")){
                            document.getElementById("qrcode").innerHTML= ``;
                        }

                        //Foreach listShipment
                        listShipment.forEach( (itemShipment) => {
                            printQRContent(itemShipment, id_shipment,listService,divPrintOp,indexOrder);
                        })
                    })
    
                    // arrOrder.forEach((order, indexOrder) => {
                    //     let id_shipment = order;
                        
                    //     if(document.getElementById("qrcode")){
                    //         document.getElementById("qrcode").innerHTML= ``;
                    //     }
                    //     //
                    //     //Get shipment by id
                    //     $.ajax({
                    //         url: 'ajax/get_shipment.php',
                    //         type: 'get',
                    //         dataType: 'json',
                    //         async: false,
                    //         data: {
                    //             id_shipment: id_shipment
                    //         }
                    //     }).done(function(reponse){
                    //         let idService = reponse['keri001'];
                    //         if(idService == ''){
                    //             alert("Đơn hàng này còn thiếu thông tin. Vui lòng bổ sung đầy đủ thông tin!");
                    //             return false;
                    //         }
                    //         //Get service by id
                    //         $.ajax({
                    //             url: 'ajax/get_service_byid.php',
                    //             type: 'get',
                    //             dataType: 'json',
                    //             async: false,
                    //             data: {
                    //                 id_service: idService
                    //             }
                    //         }).done(function(service){
                                    
                    //             if(divPrintOp){
                    //                 // divPrintOp.innerHTML = ``;
                    //                 divPrintOp.innerHTML +=`
                    //                 <div class="item-${indexOrder+1}">
                    //                     <div style="height: 100vh;flex-direction: column;gap:10px 0;font-size:28px;font-weight:bold;">
                    //                         <div style="width:250px; height:250px;margin: 0 auto;">
                    //                             <div id="qrcode-${indexOrder+1}" style="width:100%; height:100%;"></div>
                    //                         </div>
                    //                         <div class="info-1" style="text-align: center;"></div>
                    //                         <div class="info-2" style="text-align: center;"></div>
                    //                     </div>
                    //                     <input id="url-qrcode-${indexOrder+1}" type="text" value="" hidden/>
                    //                 </div>
                    //                 `;
                    //                 const inputQR = document.querySelector(`#url-qrcode-${indexOrder+1}`);
                    //                 const urlGeneral = document.getElementById('url-qrcode-general');
    
                    //                 let urlHost = urlGeneral.value;
                    //                 inputQR.value = `${urlHost}${id_shipment}`;
                                    
                    //                 let qrcode = new QRCode(document.querySelector(`#qrcode-${indexOrder+1}`), {
                    //                     width : 250,
                    //                     height : 250
                    //                 });
    
                    //                 qrcode.makeCode(inputQR.value);
    
                    //                 const itemOrder = divPrintOp.querySelector(`.item-${indexOrder+1}`)
                    //                 const info1 = itemOrder.querySelector('.info-1');
                    //                 const info2 = itemOrder.querySelector('.info-2');
    
                    //                 info1.innerHTML = `${service['keri002']} - ${reponse['keri004']}`;
                    //                 info2.innerHTML = `${reponse['keri013']}`;
                                    
                                
                    //             }
                            
                                
                    //         })
                    //     })
                    // });
    
    
    
                    let printIntal = setInterval(function() {
                        const itemLast = document.querySelector(`#qrcode-${arrOrder.length} img`);
    
                        if(itemLast){
                            if(itemLast.getAttribute('src') != null){
                                var divContents = $("#order-print-qr").html();
                                var printWindow = window.open('', '', 'height=800,width=800');
                                printWindow.document.write('<html><head><title>DIV Contents</title>');
                                printWindow.document.write('</head><body >');
                                printWindow.document.write(divContents);
                                printWindow.document.write('</body></html>');
                                printWindow.document.close();
                                printWindow.print();
                                //Stop print QR
                                clearInterval(printIntal);
                            }
    
                        }
    
                    }, 2500);
                }
            }else{
                alert("Vui lòng chọn ít nhất một đơn hàng để in QR code!");
                return;
            }
        }
    
        
    })
}

async function printQRContent(itemShipment, id_shipment,listService,divPrintOp,indexOrder){
    if(itemShipment['id'] == id_shipment){
        let serviceName = '';
        //Foreach listService
        listService.forEach(itemService => {
            if(itemService['id'] == itemShipment['keri001']){
                serviceName = itemService['keri002'];
            }
        });

        if(divPrintOp){
            // divPrintOp.innerHTML = ``;
            divPrintOp.innerHTML +=`
            <div class="item-${indexOrder+1}">
                <div style="height: 100vh;flex-direction: column;gap:10px 0;font-size:28px;font-weight:bold;">
                    <div style="width:250px; height:250px;margin: 0 auto;">
                        <div id="qrcode-${indexOrder+1}" style="width:100%; height:100%;"></div>
                    </div>
                    <div id="text-infor-${indexOrder+1}" class="info-1" style="text-align: center;"></div>
                    <div id="text-infor-${indexOrder+2}" class="info-2" style="text-align: center;"></div>
                </div>
                <input id="url-qrcode-${indexOrder+1}" type="text" value="" hidden/>
            </div>
            `;
            
            const inputQR = await document.querySelector(`#url-qrcode-${indexOrder+1}`);
            const urlGeneral = await document.getElementById('url-qrcode-general');
            const itemOrder = await divPrintOp.querySelector(`.item-${indexOrder+1}`)
            const info1 = await itemOrder.querySelector('.info-1');
            const info2 = await itemOrder.querySelector('.info-2');

            let urlHost = urlGeneral.value;
            inputQR.value = `${urlHost}${id_shipment}`;

            info1.textContent = `${serviceName} - ${itemShipment['keri004']}`;
            info2.textContent = `${itemShipment['keri013']}`;

            let qrcode = await new QRCode(document.querySelector(`#qrcode-${indexOrder+1}`), {
                width : 250,
                height : 250
            });

            await qrcode.makeCode(inputQR.value);
        

        }
    }
}

/**
 * Print label in list order
 */
const btnPrintListLabel = document.getElementById('print-list-label');
if(btnPrintListLabel){
    btnPrintListLabel.addEventListener('click', function(event){
        event.preventDefault();

        //Check item in list print QR
        const inputItem = document.getElementById('item-print-qr');
        if(inputItem && inputItem.value != ''){
            //Notification
            if(alertNotification("Bạn có muốn print label mới các đơn hàng đã chọn?") == true){
                let arrOrder = JSON.parse(inputItem.value);

                const contentFile = document.querySelector('.modal-export-label');
                if(contentFile){
                    contentFile.innerHTML = ``;

                    let checkRunning = false;
                
                    //Add output label each object
                    arrOrder.forEach((item, index) => {
                        let id_shipment = item;

                        $.ajax({
                            url: 'ajax/get_shipment.php',
                            type: 'get',
                            dataType: 'json',
                            data: {
                                id_shipment: id_shipment
                            }
                        }).done(function(reponse){
                            //Get country for receiver
                            $.ajax({
                                url: 'ajax/get_country_byid.php',
                                type: 'get',
                                dataType: 'json',
                                data: {
                                    id_country: reponse['keri015']
                                }
                            }).done(function(country){
                                let nameCountry = country['keri001'];
        
                                //Get bill lading of the shipment id
                                $.ajax({
                                    url: 'ajax/get_bill_lading.php',
                                    type: 'get',
                                    dataType: 'json',
                                    data: {
                                        kg_bill: reponse['kg_bill']
                                    }
                                }).done(function(lading){
                                    let valueLaind = '';
        
                                    lading.forEach(itemBill => {
                                        valueLaind += `
                                        ${itemBill['keri047']} <br>
                                        `;
                                    })
        
                                    const eTable = document.createElement('div');
                                    
                                    if(contentFile){
                                        const dateString = reponse['created_at'];
                
                                        let formattedDate = formatDate(dateString);
                                        
                                        eTable.innerHTML = `
                                        <table id="datatable-checkbox" class="table bulk_action table-label pagebreak" style="width:100%;font-weight: 500;font-size: 18px;">
                                            <thead style="visibility: hidden;">
                                                <tr>
                                                <th></th>
                                                <th width="20%"></th>
                                                <th width="20%"></th>
                                                <th width="30%"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td style="text-align: center;font-size: 1.4em;font-weight: bold;">
                                                    SGB-US
                                                </td>
                                                <td colspan="2" rowspan="3" style="vertical-align: middle;text-align: center;">
                                                    <img src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt="QR code" width="auto" height="100px">
                                                </td>
                                                <td rowspan="3" style="vertical-align: middle;text-align: center;font-size: 2.2em;color: red;font-weight: 700;"><i>SGB POST</i></td>
                                                </tr>
                                    
                                                <tr>
                                                    <td style="border-right: none!important;">Date: ${formattedDate}</td>
                                                </tr>
                                                <tr>
                                                    <td style="border-right: none!important;">Tracking: ${valueLaind}</td>
                                                </tr>
                                                
                                                <tr style="text-transform: uppercase;font-size:1.4em;background: #4285f4;text-align:center;vertical-align: middle;font-weight:bold;">
                                                    <td colspan="2">
                                                        Origin
                                                    </td>
                                                    <td colspan="2">
                                                        Destination
                                                    </td>
                                                </tr>
                                                
                                                <tr style="text-transform: uppercase;font-size:1em;text-align:center;vertical-align: middle;">
                                                    <td colspan="2">
                                                        VIET NAM
                                                    </td>
                                                    <td colspan="2">
                                                        ${nameCountry}
                                                    </td>
                                                </tr>
                                                
                                                <tr style="font-weight: bold;font-style:italic;">
                                                    <td colspan="2">
                                                        From (Shipper):
                                                    </td>
                                                    <td colspan="2">
                                                        To (Receiver)
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td colspan="2">
                                                        Company Name:
                                                    </td>
                                                    <td>
                                                        Company Name:
                                                    </td>
                                                    <td>
                                                        ${reponse['keri012']}
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td colspan="2">
                                                        Contact Name:
                                                    </td>
                                                    <td>
                                                        Address:
                                                    </td>
                                                    <td>
                                                        ${reponse['keri019']}
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td colspan="2">
                                                        Phone/Fax No:
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td colspan="2" rowspan="2">
                                                        
                                                    </td>
                                                    <td>
                                                        Contact Name:
                                                    </td>
                                                    <td>
                                                        ${reponse['keri013']}
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>
                                                        Phone/Fax No:
                                                    </td>
                                                    <td>
                                                        ${reponse['keri014']}
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                <td rowspan="2">
                                                    Total PCS:
                                                </td>
                                                <td rowspan="2">
                                                    
                                                </td>
                                                <td colspan="2" class="text-center">
                                                    
                                                </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        `;
                                        contentFile.appendChild(eTable);
                                        
                                    }
                                })
                                

                                if(index == arrOrder.length - 1){
                                    checkRunning = true;
                                }
                            })
                        })

                    })

                    //Print
                    let printIntal = setInterval(function() {
                        if(checkRunning == true){
                            var divContents = $(".modal-export-label").html();
                            var printWindow = window.open('', '', 'height=400,width=800');
                            printWindow.document.write('<html><head><title>DIV Contents</title><style>@page{size: A5;}table, td {border: 1px solid;}table {width: 100%;border-collapse: collapse;}@media print {.pagebreak { page-break-before: always; }}</style>');
                            printWindow.document.write('</head><body >');
                            printWindow.document.write(divContents);
                            printWindow.document.write('</body></html>');
                            printWindow.document.close();
                            printWindow.print();
                            //Stop print QR
                            clearInterval(printIntal);
                        }
                    }, 1000);
                    
                }
            }
        }else{
            alert("Vui lòng chọn ít nhất một đơn hàng để in label!");
            return;
        }
    })
}

let arrOrder = [];

//Get event click and add array list when click checkbox in table
// const listInputOrder = document.querySelectorAll('input.item-order');
function addListPrintOrder(listInputOrder){
    if(listInputOrder){
        listInputOrder.forEach(item => {
            //Event click of input
            item.addEventListener('click', function(event){
                //Check input checked => add array list
                let idOrder = item.value;
                if(item.checked == true){
                    arrOrder.push(idOrder);
                }else{
                    //Remove item in list
                    removeItemOnce(arrOrder,idOrder);
                }
                
                const inputItem = document.getElementById('item-print-qr');
    
                if(inputItem){
                    inputItem.value = JSON.stringify(arrOrder);
                }
            })
        })
    }

}

//Add item in list print QR code
const listInputOrder = document.querySelectorAll('input.item-order');
addListPrintOrder(listInputOrder);


//Notification when click, change of button, select
function sendDestroy() {
    r = confirm("Do you want to print label?");
    if (r == false) return false;
    else return true;
}

//Notification when click, change of button, select
function alertNotification(str) {
    r = confirm(str);
    if (r == false) return false;
    else return true;
}

//remove item in array
function removeItemOnce(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (String(arr[i]) == String(value)) {
            arr.splice(i, 1);
        }
    }
    return arr;
}

/**
 * Sort orders
 */
const groupSortOrder = document.querySelector('.group-sort-order');
if(groupSortOrder){
    const valueOrderId = groupSortOrder.querySelector('#order-id');
    const numberSGB = groupSortOrder.querySelector('#number-sgb');
    const telephone = groupSortOrder.querySelector('#telephone');
    const address = groupSortOrder.querySelector('#address');
    const beginDate = groupSortOrder.querySelector('#begin-date');
    //Button sort
    const btnSort = groupSortOrder.querySelector('#btn-sort');

    if(valueOrderId && numberSGB && telephone && address && beginDate && btnSort){
        btnSort.addEventListener('click',function(event){
            event.preventDefault();

            let orderId = valueOrderId.value;
            let numSGB = numberSGB.value;
            let phone = telephone.value;
            let addUser = address.value;
            let dateBook = beginDate.value;

            console.log('click');
            $.ajax({
                url: 'ajax/sort_list_order.php',
                type: 'get',
                dataType: 'json',
                data: {
                    order_id: orderId,
                    number_sgb: numSGB,
                    phone_receiver: phone,
                    address_receiver: addUser,
                    date_book: dateBook
                }
            }).done(function(reponse){
                console.log(reponse);
                //Get div table
                const tableReponse = document.querySelector('.table-responsive');
                if(tableReponse){

                    let contentTB = ``;

                    reponse.forEach((item,index) => {
                        const date = new Date(item['created_at']); // date in d-m-Y format
                        const formattedDate = date.toISOString().slice(0, 10); // convert to dd/mm/yyyy format

                        let strStatus = '';

                        if(item['status'] == "Đã duyệt"){
                            strStatus = `<a type="button" class="btn btn-primary btn-xs">Đã duyệt</a>`;
                        }else{
                            strStatus = `<a type="button" class="btn btn-outline-danger btn-xs">Đang chờ</a>`;
                        }

                        contentTB += `
                        <tr>
                            <td><th><input type="checkbox" id="check-all" class="item-order" value="${item['id']}"></th></td>
                            <td>${index+1}</td>
                            <td>
                                <div class="d-grid">
                                    <div class="date">${formattedDate}</div>
                                    <div class="date"><button class="btn btn-sm btn-primary">US</button></div>
                                    <div class="date"><a class="text-primary">${item['print_label'] == '' ? "Chưa tạo label" : "Đã tạo label"}</a></div>
                                </div>
                            </td>
                            <td>
                                <a class="text-primary">${item['number_sgb']}</a>
                            </td>
                            <td>
                                <a class="text-primary">OD ${item['id']}</a>
                            </td>
                            <td>${item['keri004']}</td>
                            <td>${item['keri013']}</td>
                            <td>${item['keri019']}</td>
                            <td>${item['tracking_number']}</td>
                            <td>${item['weightKH']}</td>
                            <td>${item['priceKH']}</td>
                            <td>${strStatus}</td>
                            <td>Admin System</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    Tác vụ
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item btn-show-shipment" href="#" data-id="${item['kg_bill']}" data-toggle="modal"
                                        data-target=".bs-example-modal-lg"><i class="fa fa-file-zip-o"></i> Xem đơn đặt hàng</a>
                                        <a class="dropdown-item" href="./update_shipment.php?id=${item['id']}"><i class="fa fa-edit"></i> Sửa đơn hàng</a>
                                        <a data-id="${item['id']}" class="dropdown-item btn-print-qr" href="#"><i class="fa fa-print"></i> Print QR</a>
                                        <a onclick="return alertNotification('Bạn chắc chắn muốn xóa đơn hàng này?');" class="dropdown-item" href="./action/order_shipment/delete_shipment.php?id=${item['id']}"><i class="fa fa-remove"></i> Xóa đơn hàng</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        `;
                    })

                    //Reset content table
                    tableReponse.innerHTML = ``;

                    //Set content for table
                    tableReponse.innerHTML = `
                    <table id="datatable-checkbox"
                        class="table table-striped table-bordered nowrap text-center"
                        style="width:100%">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>#</th>
                                <th>Ngày</th>
                                <th>Số tham chiếu SGB</th>
                                <th>Order ID</th>
                                <th>Mặt hàng</th>
                                <th>Buyer fullname</th>
                                <th>Buyer address</th>
                                <th>Tracking</th>
                                <th>Căn nặng tính cước</th>
                                <th>Cước phí(VNĐ)</th>
                                <th>Trạng thái</th>
                                <th>Người tạo</th>
                                <th>Tác vụ</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${contentTB}
                        </tbody>
                    </table>
                    `;

                    //Paging table
                    $('#datatable-checkbox').DataTable();

                    //Print multible Qr code
                    const listInputOrder = document.querySelectorAll('input.item-order');
                    if(listInputOrder){
                        addListPrintOrder(listInputOrder);
                    }

                    //Get all div button print QR code in orders page
                    const btnPrintQr = document.querySelectorAll('.btn-print-qr');
                    if(btnPrintQr){
                        printQRCodeForAOrder(btnPrintQr)
                    }

                    /**
                     * Page orders
                     * Show list shipment for order
                     */
                    const btnShowShipment = document.querySelectorAll('.btn-show-shipment');
                    if(btnShowShipment){
                        showInfoOrder(btnShowShipment);
                    }
                }
            })
        })
    }
}

/**
 * Tracking bill
 * page shipment.php
 */
const trackingModal = document.getElementById('tracking-pack');
//All button popup tracking modal
const btnModalTracking = document.querySelectorAll('.btn-tracking-modal');

if(btnModalTracking){
    btnModalTracking.forEach(itemBtn => {
        //Add event click for each button
        itemBtn.addEventListener('click', function(event){
            let id_tracking = event.target.dataset.id;

            //Get shipment by tracking id
            $.ajax({
                url: 'ajax/show_shipment.php',
                type: 'get',
                dataType: 'json',
                data: {
                    tracking: id_tracking
                }
            }).done(function(reponse){
                setContentModalTracking(reponse,id_tracking);

            })
        })
    })
}

function setContentModalTracking(reponse,id_tracking){

    //Get tracking by id
    $.ajax({
        url: 'ajax/get_tracking_byid.php',
        type: 'get',
        dataType: 'json',
        data: {
            tracking: id_tracking
        }
    }).done(function(tracking){
        //Get name service by id
        if(reponse['keri001'] == ''){
            //Get modal tracking
            const modalTracking = document.getElementById('tracking-pack');
                            
            if(modalTracking){
                //Get body modal
                const modalBody = modalTracking.querySelector('.modal-body');

                modalBody.innerHTML = ``;
                //Set content modal
                modalBody.innerHTML = `<h2>Đơn hàng hiện đang thiếu thông tin. Vui lòng cập nhật thêm thông tin cho đơn hàng!</h2>`;
            }
        }else{
            $.ajax({
                url: 'ajax/get_service_byid.php',
                type: 'get',
                dataType: 'json',
                data: {
                    id_service: reponse['keri001']
                }
            }).done(function(service){
                let nameService = service['keri002'];
                
                //Get all package of tracking
                $.ajax({
                    url: 'ajax/get_package.php',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id_shipment: reponse['id']
                    }
                }).done(function(package){
                    let totalPackage = package.length;//Total package
                    let packageSize = 0;//Total quantity all package
                    let trackingPack = '';
    
                    package.forEach(itemPack => {
                        packageSize += itemPack['quantity'];
                        trackingPack += `
                        <a href="#">${itemPack['tracking_pack']}</a><br>
                        `;
                    });

                    //Ajax get travel history
                    $.ajax({
                        url: 'ajax/get_travel_kgbill.php',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            kg_bill: reponse['kg_bill']
                        }
                    }).done(function(travel){
                        console.log(travel);
                        let arrTravel = '';

                        //Set each item in travel
                        travel.forEach(itemTravel => {
                            let dateFormat = new Date(itemTravel['label_date']).toLocaleString('en-GB', {
                                hour12: false,
                            })
                            arrTravel += `
                            <div class="col-12">
                                <div class="l-item">
                                    <b class="upper">${itemTravel['label_text']}</b>
                                    <p>${itemTravel['label_address']}</p>
                                    <p>${dateFormat}</p>
                                </div>
                            </div>
                            `;
                        })

                        //Get modal tracking
                        const modalTracking = document.getElementById('tracking-pack');
                    
                        if(modalTracking){
                            //Get body modal
                            const modalBody = modalTracking.querySelector('.modal-body');
                            if(modalBody){
                                const date = new Date();
                    
                                //Set value of tracking
                                let dateTracking = tracking['standard_ship'] == '0000-00-00 00:00:00' ? new Date(reponse['created_at']).toLocaleString('en-GB', {
                                    hour12: false,
                                }) : new Date(tracking['standard_ship']).toLocaleString('en-GB', {
                                    hour12: false,
                                });
        
                                let idTracking = id_tracking;
                                let locationFrom = reponse['keri009'];
                                let locationTo = reponse['keri017'];
                                let dateSend = tracking['date_send'] == '0000-00-00' ? "" : new Date(tracking['date_send']).toISOString().slice(0, 10); // convert to dd/mm/yyyy format;
                                let dateKSG = tracking['date_ksg'] == '' ? "null" : new Date(tracking['date_ksg']).toISOString().slice(0, 10); // convert to dd/mm/yyyy format;
                                let dateOrigin = tracking['date_origin'] == '' ? "null" : new Date(tracking['date_origin']).toISOString().slice(0, 10); // convert to dd/mm/yyyy format;
                                let dateTransit = tracking['date_transit'] == '' ? "null" : new Date(tracking['date_transit']).toISOString().slice(0, 10); // convert to dd/mm/yyyy format;
                                let transportTracking = tracking['transport_tracking']
                                let standard_ship = dateTracking;
                                let policy = tracking['policy'];
                                let paperPackage = tracking['paper_package'];
        
                                //value of shipment
                                let fromShipment = reponse['keri009'];
                                let toShipment = reponse['keri017'];
                    
                                modalBody.innerHTML = ``;
                                //Set content modal
                                modalBody.innerHTML = `
                                <div class="tracking-header row">
                                    <div class="col-lg-4 col-12">
                                        <h6><b>Trạng thái giao hàng</b></h6>
                                        <div class="content">
                                            <div class="large"></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-12">
                                        <h6><b>Thời gian</b></h6>
                                        <div class="content">
                                            <div class="large">${dateTracking}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-12">
                                        <h6><b>ID theo dõi</b></h6>
                                        <div class="content">
                                            <div class="large">${idTracking}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tracking-body row">
                                    <div class="col-12">
                                        <div class="heading">
                                            Thông tin lô hàng
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                        <div class="tracking">
                                            <div class="items">
                                                <div class="row">
                                                    <div class="title">
                                                        <i class="fa fa-location-arrow"></i> Tổng quan về lô hàng
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">ID Tracking</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${idTracking}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">From</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${locationFrom}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">To</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${locationTo}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">Ngày gửi hàng</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${dateSend}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">Vận chuyển tiêu chuẩn</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${standard_ship}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="items">
                                                <div class="row">
                                                    <div class="title">
                                                        <i class="fa fa-location-arrow"></i> Dịch vụ
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">Dịch vụ</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${nameService}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">Điều khoản</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${policy}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="items">
                                                <div class="row">
                                                    <div class="title">
                                                        <i class="fa fa-location-arrow"></i> Chi tiết giỏ hàng
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">Bao bì</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${paperPackage}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">Kích thước</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${packageSize}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">Tổng số kiện hàng</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${totalPackage}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5 col-md-4 col-12">
                                                        <b class="upper">Tracking Packs</b>
                                                    </div>
                                                    <div class="col-lg-7 col-md-8 col-12">
                                                        ${trackingPack}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="col-lg-4 col-md-12">
                                        <div class="tracking-location">
                                            <div class="row">
                                                ${arrTravel}
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                                `;
                            }
                        }
                    });
                
                });
            });
        };
    });
};

/**
 * Sort debt of user
 * 
 */
const groupSortDevt = document.getElementById('group-sort-debt');
if(groupSortDevt){
    const selectStatus = groupSortDevt.querySelector('#select-status');
    const dateStart = groupSortDevt.querySelector('#start-date');
    const dateEnd = groupSortDevt.querySelector('#end-date');
    const btnSortDevt = groupSortDevt.querySelector('#btn-sort');
    
    if(selectStatus && dateStart && dateEnd && btnSortDevt){
        btnSortDevt.addEventListener('click',function(event){
            event.preventDefault();

            $.ajax({
                url: 'ajax/sort_list_debt.php',
                type: 'get',
                dataType: 'json',
                data: {
                    status: selectStatus.value,
                    date_start: dateStart.value,
                    date_end: dateEnd.value
                }
            }).done(function(reponse){
                console.log(reponse);
                const tableReponse = document.querySelector('.table-responsive');
                if(tableReponse){

                    $.ajax({
                        url: 'ajax/get_all_lading.php',
                        type: 'get',
                        dataType: 'json',
                        data: {}
                    }).done(function(billLading){
                        let tracking_number = 0;
                        let kg_postage = 0;
                        let postaged = 0;
                        let reduce = 0;
                        let payment_fee = 0;
                        
                        

                        let strTbody = ``;

                        let totalKGPostage = 0;
                        let totalPostaged = 0;
                        let totalReduce = 0;
                        let totalPaymentFee = 0;
    
                        reponse.forEach((item, index) => {
                            const date = new Date(item['created_at']); // date in d-m-Y format
                            const formattedDate = date.toISOString().slice(0, 10); // convert to dd/mm/yyyy format

                            totalKGPostage = kg_postage*1 + totalKGPostage;
                            totalPostaged = postaged*1 + totalPostaged;
                            totalReduce = reduce*1 + totalReduce;
                            totalPaymentFee = payment_fee*1 + totalPaymentFee;

                            //Set value of lading
                            billLading.forEach(bill => {
                                if(item['kg_bill'] == bill['keri028']){
                                    tracking_number = bill['keri047'];
                                    kg_postage = bill['kg_postage'];
                                    postaged = bill['postaged'];
                                    reduce = bill['reduce'];
                                    payment_fee = bill['payment_fee'];
                                }
                            })

                            let status = item['status_payment'] == 'Đã thanh toán' ? 'Đã thanh toán' : 'Chưa thanh toán';
                            let strStatus = '';

                            if(status == 'Chưa thanh toán'){
                                strStatus = `<a onclick="return alertNotification('Bạn có muốn cập nhật trạng thái thanh toán cho đơn hàng này không?');" href="./action/debt_user/update_status.php?kg_bill=${item['kg_bill']}" class="btn btn-danger btn-xs">${status}</a>`;
                            }else{
                                strStatus = `<button type="button" class="btn btn-success btn-xs">${status}</button>`
                            }

                            strTbody += `
                            <tr>
                                <td>${index+1}</td>
                                <td>${formattedDate}</td>
                                <td>
                                    <a class="text-primary">OD ${item['id']}</a>
                                </td>
                                <td>${item['keri004']}</td>
                                <td>${tracking_number}</td>
                                <td>${item['keri013']}</td>
                                <td>${kg_postage}</td>
                                <td>${postaged}</td>
                                <td>${reduce}</td>
                                <td>${payment_fee}</td>
                                <td>
                                    ${strStatus}
                                </td>
                            </tr>
                            `;
                        })

                        //Set content 
                        tableReponse.innerHTML = ``;
                        tableReponse.innerHTML = `
                        <p class="text-muted font-13 m-b-30">
                                Tổng hợp toàn bộ công nợ của khách hàng</code>
                            </p>
                            <table id="example1"
                                class="table table-striped table-bordered nowrap bulk_action"
                                style="width:100%">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ngày</th>
                                        <th>Order ID</th>
                                        <th>Mặt hàng</th>
                                        <th>Tracking</th>
                                        <th>Buyer</th>
                                        <th>Kg tính cước</th>
                                        <th>Cước phí</th>
                                        <th>Giảm trừ %</th>
                                        <th>Cước phí thanh toán</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>


                                <tbody>
                                    ${strTbody}
                                <tfoot>
                                    <tr>
                                        <th colspan="6">Subtotal</th>
                                        <th>${totalKGPostage}</th>
                                        <th>${totalPostaged}</th>
                                        <th>${totalReduce}</th>
                                        <th>${totalPaymentFee}</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                            </table>
                        `; 
                        //Active library datatable
                        $(function () {
                            $("#example1").DataTable({
                                "responsive": true, "lengthChange": false, "autoWidth": false,
                                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                                }).buttons().container().appendTo('#example1_wrapper .col-sm-6:eq(0)');
                            });
                    })

                }
            })

        })
    }
}


/**
 * Add travel history
 */
const modalAddTravel = document.getElementById('modal-travel');
if(modalAddTravel){
    const selectShipment = modalAddTravel.querySelector('#select-shipment');
    const selectService = modalAddTravel.querySelector('#select-service');
    const dateTravel = modalAddTravel.querySelector('#date-travel');
    const nameAction = modalAddTravel.querySelector('#name-action');
    const addressTravel = modalAddTravel.querySelector('#address-travel');
    const btnAddTravel = modalAddTravel.querySelector('#add-travel-history');

    if(selectShipment && selectService && dateTravel && nameAction && addressTravel && btnAddTravel){
        btnAddTravel.addEventListener('click', function(event){
            event.preventDefault();

            if(dateTravel.value == ''){
                dateTravel.focus();
            }else if(nameAction.value == ''){
                nameAction.focus();
            }else if(addressTravel.value == ''){
                addressTravel.focus();
            }
            else{
                //Get all service
                let listService;
                $.ajax({
                    url: 'ajax/get_all_service.php',
                    type: 'get',
                    dataType: 'json',
                    async: false,
                    data: {}
                }).done(function(services){
                    listService = services;
                })
                
                //Add in table list travel
                $.ajax({
                    url: 'ajax/add_session_travel.php',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        kg_bill: selectShipment.value,
                        id_service: selectService.value,
                        date_travel: dateTravel.value,
                        name_action: nameAction.value,
                        address_travel: addressTravel.value
                    }
                }).done(function(reponse){
    
                    const contentTable = document.getElementById('content-table-travel');
                    if(contentTable){
                        const tbody = contentTable.querySelector('table tbody');
                        tbody.innerHTML = ``;

                        let nameService = '';
    
                        reponse.forEach((item, index) => {
                            listService.forEach(itemService => {
                                if(itemService['id'] == item['id_service']){
                                    nameService = itemService['keri002'];
                                }
                            }); 

                            tbody.innerHTML += `
                            <tr>
                                <td>${index+1}</td>
                                <td>${item['kg_bill']}</td>
                                <td>${nameService}</td>
                                <td>${item['date_travel']}</td>
                                <td>${item['name_action']}</td>
                                <td>${item['address_travel']}</td>
                            </tr>
                            `;
                        })
                    }
                })

            }
        })
    }
}

const formTravel = document.getElementById('form-add-travel');
if(formTravel){
    formTravel.addEventListener('submit', function(event){
        event.preventDefault();

        $.ajax({
            url: 'ajax/check_exis_travel.php',
            type: 'get',
            dataType: 'json',
            data: {
            }
        }).done(function(reponse){
            console.log(reponse);
            if(reponse == true){
                //Submit form if exis travel
                formTravel.submit();
            }
        })
    })
}


/**
 * Edit travel
 */
const btnEditTravel = document.querySelectorAll('.btnEditTravel');
if(btnEditTravel){
    btnEditTravel.forEach(button => {
        button.addEventListener('click', function(event){
            let id_travel = event.target.dataset.bill;

            $.ajax({
                url: 'ajax/get_travel_byid.php',
                type: 'get',
                dataType: 'json',
                data: {
                    id_travel: id_travel
                }
            }).done(function(reponse){
                console.log(reponse);
                let kg_bill = reponse['kg_bill'];
                let id_service = reponse['id_agency'];

                $.ajax({
                    url: 'ajax/get_all_shipment.php',
                    type: 'get',
                    dataType: 'json',
                    data: {}
                }).done(function(orders){
                    let strOrder = '';
                    orders.forEach(itemOrder => {
                        strOrder += `<option class="optionBill" value="${itemOrder['kg_bill']}">KG Bill: ${itemOrder['kg_bill']} - Buyer: ${itemOrder['keri013']} - Phone: ${itemOrder['keri014']} - City: ${itemOrder['keri017']}</option>`
                    });

                    //Get all service
                    $.ajax({
                        url: 'ajax/get_all_service.php',
                        type: 'get',
                        dataType: 'json',
                        data: {}
                    }).done(function(service){
                        let strService = '';
                        let optionLast = `<option class="optionService" value="0">Không chọn</option>`;
                        service.forEach(itemService => {
                            strService += `<option class="optionService" value="${itemService['id']}">${itemService['keri002']}</option>`
                        });
                        optionLast += strService;
                        console.log(id_service);
                        //Set content modal
                        const modalEditTravel = document.getElementById('modal-edit-travel');
                        if(modalEditTravel){
                            const selectShipment = modalEditTravel.querySelector('#select-shipment');
                            selectShipment.innerHTML = ``;
                            selectShipment.innerHTML = strOrder;

                            const optionBill = selectShipment.querySelectorAll('.optionBill');
                            checkValueDiv(optionBill,kg_bill);

                            //Select service
                            const selectService = modalEditTravel.querySelector('#select-service');
                            selectService.innerHTML = ``;
                            selectService.innerHTML = optionLast;
                            //Selected
                            const optionService = selectService.querySelectorAll('.optionService');
                            checkValueDiv(optionService,id_service);


                            //Set value of date travel
                            const dateTravel = modalEditTravel.querySelector('#date-travel');
                            dateTravel.value = reponse['label_date'];

                            //Set value of text travel
                            const textTravel = modalEditTravel.querySelector('#name-action');
                            textTravel.value = reponse['label_text'];

                            //Set value of address travel
                            const addressTravel = modalEditTravel.querySelector('#address-travel');
                            addressTravel.value = reponse['label_address'];

                            //Set url update
                            let urlUpdate = './action/travel/update_travel.php?id=' + reponse['id'];
                            const formEdit = modalEditTravel.querySelector('#form-edit-travel');

                            formEdit.setAttribute('action',urlUpdate);
                        }
                    })

                })
            })
        })
    })
}


//================================================================
function checkValueDiv(divElementAll, value){
    for (var i = 0; i < divElementAll.length; i++) {
        if (divElementAll[i].value == value) {
            divElementAll[i].selected = true;
            break;
        }
    }
}

/**
 * import file excel for table orders
 */
const inputImportExcel = document.getElementById('import-excel-order');
const btnImportExcel = document.getElementById('btn-import-excel');

if(btnImportExcel && inputImportExcel){
    btnImportExcel.addEventListener('click', function(event){

        if(!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(inputImportExcel.files[0].type))
        {
            //check type file only xlsx and xls
            document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';

            inputImportExcel.value = '';

            return false;
        }

        let reader = new FileReader();

        reader.readAsArrayBuffer(inputImportExcel.files[0]);

        reader.onload = function(eventRead){
            let data = new Uint8Array(reader.result);

            let work_book = XLSX.read(data, {type:'array'});

            let sheet_name = work_book.SheetNames;

            let sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {header:1});

            let arrDataFileRow = [];
            let arrDataFileCol = [];

            if(sheet_data.length > 0){
                let table_output = `<table class="table table-striped table-bordered">`;

                for(var row = 0; row < sheet_data.length; row++)
                {
                    table_output += '<tr>';

                    for(var cell = 0; cell < sheet_data[row].length; cell++)
                    {

                        if(row == 0)
                        {
                            table_output += '<th>'+sheet_data[row][cell]+'</th>';
                        }
                        else
                        {
                            sheet_data[row][cell] = sheet_data[row][cell] == undefined ? '' : sheet_data[row][cell]
                            table_output += '<td>'+sheet_data[row][cell]+'</td>';
                            arrDataFileCol.push(sheet_data[row][cell]);
                        }
                    }

                    if(arrDataFileCol != ''){
                        arrDataFileRow.push(arrDataFileCol)
                        arrDataFileCol = [];
                    }

                    table_output += '</tr>';
                }

                table_output += '</table>';

                document.getElementById('excel_data').innerHTML = table_output;
            }

            if(arrDataFileRow != ''){
                $.ajax({
                    url: 'ajax/insert_form_file.php',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        data: arrDataFileRow
                    }
                }).done(function(reponse){
                    if(reponse == 'OK'){
                        alert("Lưu dữ liệu từ file thành công!");
                    }
                })
            }
        }
    })
}