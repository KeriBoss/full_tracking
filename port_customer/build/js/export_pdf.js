
const tableShipment1 = document.querySelector('.list-shipment');
if(tableShipment1){
    const itemRow = tableShipment1.querySelectorAll('tbody tr');
    if(itemRow){
        activePrint(itemRow);
    }
}

function activePrint(itemRow){
    itemRow.forEach(itemTr => {
        const btnInvoice = itemTr.querySelector('.btn-print-invoice');

        if(btnInvoice){
            btnInvoice.addEventListener('click', function(event){
                event.preventDefault();

                let idShipment = event.target.dataset.id;
                let arrPackage = '';
                let arrInvoice = '';
                let totalPrice = 0;

                $.ajax({
                    url: 'ajax/get_shipment.php',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id_shipment: idShipment
                    }
                }).done(function(reponse){
                    //Create array package and invoice
                    
                    //Get data package of shipment if this type is PACK
                    $.ajax({
                        url: 'ajax/get_package.php',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            id_shipment: idShipment
                        }
                    }).done(function(package){
                        if(package.length > 0){
                            
                            package.forEach((element, index) => {
                                arrPackage += `
                                <tr>
                                    <td>Dimensions ${index+1} (cm)</td>
                                    <td>${element['quantity']}</td>
                                    <td>${element['weight']}</td>
                                    <td>${element['length']}</td>
                                    <td>${element['width']}</td>
                                    <td>${element['height']}</td>
                                    <td>${(element['width'] * element['length'] * element['height'])/5000}</td>
                                </tr>
                                `;
                            })
                        }
                        //Get data invoice of shipment if this type is PACK
                        $.ajax({
                            url: 'ajax/get_packinvoice.php',
                            type: 'get',
                            dataType: 'json',
                            data: {
                                id_shipment: idShipment
                            }
                        }).done(function(invoice){
                            if(invoice.length > 0){
                                invoice.forEach((element, index) => {
                                    totalPrice = totalPrice + (element['quantity']*1) * (element['price']*1);
                                    arrInvoice += `
                                    <tr>
                                        <td>${element['description']}</td>
                                        <td>${element['quantity']}</td>
                                        <td>${element['unit']}</td>
                                        <td>${element['price']}</td>
                                        <td>${element['quantity'] * element['price']}</td>
                                    </tr>
                                    `;
                                })
                            }

                            const contentFile = document.getElementById('content_word');
                            if(contentFile){
    
                                const dateString = reponse['created_at'];
    
                                let formattedDate = formatDate(dateString);
    
                                contentFile.innerHTML = ``;
                                contentFile.innerHTML = `
                                <div class="container-fluid">
                                    <div class="car" style="padding: 10px 15px;font-size: 14px;border: 2px solid #000;">
                                        <div class="heading" style="font-size: 28px;font-weight: bold;text-transform: uppercase;text-align: center;">Invoice</div>
                                        <div class="row mt-3">
                                            <div class="col-8">
                                                <div class="left" style="margin-top: 70px;">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <div class="title" style="font-size: 1.2em;text-transform: uppercase;font-weight: bold;text-decoration: underline;">Shipper</div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">Company Name:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri007']}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">City:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri009']}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">Country:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">VIETNAM</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">Email:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri011']}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">Contact Name:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri008']}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">Phone/Fax No:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri010']}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-4">
                                                        <div class="col-12">
                                                            <div class="title" style="font-size: 1.2em;text-transform: uppercase;font-weight: bold;text-decoration: underline;">Consignee</div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">Company Name:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri012']}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">Address:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri019']}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">City:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri017']}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">Country:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri015']}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">Contact Name:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri013']}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="row">
                                                                <div class="col-4">Phone/Fax No:</div>
                                                                <div class="strong col-8" style="font-weight: bold;">${reponse['keri014']}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="right">
                                                    <div class="row mb-3">
                                                        <div class="col-6">
                                                            <b style="font-size: 12px;"><i>Date</i></b>
                                                        </div>
                                                        <div class="col-6">
                                                            <i>${formattedDate}</i>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-6">
                                                            <b style="font-size: 12px;"><i>Air waybill No.</i></b>
                                                        </div>
                                                        <div class="col-6">
                                                            <i>${reponse['kg_bill']}</i>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-6">
                                                            <b style="font-size: 12px;"><i>No. of pkgs:</i></b>
                                                        </div>
                                                        <div class="col-6">
                                                            <p>1</p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <b style="font-size: 12px;"><i>Net Weight</i></b>
                                                        </div>
                                                        <div class="col-6">
                                                            <p>16 KG</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="table-invoice" class="row mt-5">
                                            <table class="table" style="border-collapse: collapse;border: 1px solid #000;">
                                                <thead>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">Full Description of Goods <br> (Name of goods, composition of material, marks, etc.)</th>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">Quantity</th>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">Unit</th>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">Unit Price <br> (In USD)</th>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">Subtotal <br> (In USD)</th>
                                                </thead>
                                                <tbody>${arrInvoice}</tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colspan="4" style="border: 1px solid #000;vertical-align: middle;text-align: center;">Total Value (In USD)</td>
                                                        <td style="border: 1px solid #000;vertical-align: middle;text-align: center;"> ${totalPrice}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div class="row">
                                            <table class="table" style="border-collapse: collapse;border: 1px solid #000;">
                                                <thead>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;"></th>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">Q'ty</th>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">G.W</th>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">L</th>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">W</th>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">H</th>
                                                    <th style="border-bottom: 1px solid #000; border-top: 1px solid #000;border: 1px solid #000;vertical-align: middle;text-align: center;">D.W</th>
                                                </thead>
                                                <tbody>${arrPackage}</tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td class="text-left" colspan="7" style="border: 1px solid #000;vertical-align: middle;text-align: center;text-align: left;">Reason for Export: GIFT (NO COMMERCIAL VALUE)</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div class="declare row" style="padding: 10px 20px;">
                                            <p class="">
                                                I declare that the information is true and correct to the best of my knowledge, certify that the particulars and
                                            </p>
                                            <p>I (Name) <b><?=$ojb['keri013']?></b> certify that the particulars and quantity of goods specified in this document are goods which are submitted for export out of Vietnam.</p>
                                        </div>
                                        <div class="row">
                                            <div class="col-7"></div>
                                            <div class="col-5">
                                                <div class="row justify-content-center">
                                                    <p>Signature/Title/Stamp</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;

                                if(contentFile.innerHTML != ''){
                                    // more custom setting
                                    var opt = {
                                        margin: 0.3,
                                        filename: 'invoice.pdf',
                                        html2canvas:  { scale: 2 },
                                        jsPDF: { 
                                            unit: 'in',
                                            format: 'a4',
                                            orientation: 'portrait'
                                        },
                                    };
                                    html2pdf().set(opt).from(contentFile).output().save();
                                }
                            }
                        })

                    })


                })

            })
        }

        const btnExportLabel = itemTr.querySelector('.btn-print-label');
        if(btnExportLabel){
            btnExportLabel.addEventListener('click', function(event){
                event.preventDefault();

                let id_shipment = event.target.dataset.id;

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
                            
                            const contentFile = document.querySelector('.modal-export-label');
                            if(contentFile){
                                const dateString = reponse['created_at'];
        
                                let formattedDate = formatDate(dateString);
                                
                                eTable.innerHTML = `
                                <table id="datatable-checkbox" class="table bulk_action table-label" style="width:100%;font-weight: 500;font-size: 16px;">
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
                                contentFile.innerHTML = ``;
                                contentFile.appendChild(eTable);
                                if(contentFile.innerHTML != ''){
                                    // var opt = {
                                    //     filename: 'bill-label.pdf',
                                    //     html2canvas:  { scale: 2 },
                                    //     jsPDF: { 
                                    //         unit: 'in',
                                    //         format: 'a4'
                                    //     },
                                    // };
                                    // html2pdf().set(opt).from(contentFile).toPdf().output().save();
    
                                    var divContents = $(".modal-export-label").html();
                                    var printWindow = window.open('', '', 'height=400,width=800');
                                    console.log(printWindow);
                                    printWindow.document.write('<html><head><title>DIV Contents</title><style>@page{size: A5;}table, td {border: 1px solid;}table {width: 100%;border-collapse: collapse;}</style>');
                                    printWindow.document.write('</head><body >');
                                    printWindow.document.write(divContents);
                                    printWindow.document.write('</body></html>');
                                    printWindow.document.close();
                                    printWindow.print();
                                    
                                    //Update status label
                                    $.ajax({
                                        url: 'ajax/update_status_label.php',
                                        type: 'get',
                                        dataType: 'json',
                                        data: {
                                            id: id_shipment
                                        }
                                    }).done(function(status){
                                        console.log(status);
                                    })
                                }
        
                            }
                        })

                    })
                })

            })
        }

        const btnExportBill = itemTr.querySelector('.btn-print-bill');
        if(btnExportBill){
            btnExportBill.addEventListener('click', function(event){
                event.preventDefault();

                let id_shipment = event.target.dataset.id;

                $.ajax({
                    url: 'ajax/get_shipment.php',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id_shipment: id_shipment
                    }
                }).done(function(reponse){
                    console.log(reponse);
                    $.ajax({
                        url: 'ajax/get_service_byid.php',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            id_service: reponse['keri001']
                        }
                    }).done(function(service){
                        let nameService = service['keri002'];

                        //Get all package shipment
                        $.ajax({
                            url: 'ajax/get_package.php',
                            type: 'get',
                            dataType: 'json',
                            data: {
                                id_shipment: id_shipment
                            }
                        }).done(function(package){
                            let totalPackage = 0;
                            let totalWeight = 0;

                            let arrPackage = new Array();
                            if(package.length > 0){
                                totalPackage = package.length;
                            
                                package.forEach((element,index) => {
                                    let changeWeight = (element['width'] * element['length'] * element['height'])/5000;
                                    totalWeight = changeWeight > element['weight'] ? changeWeight : element['weight'] ;
                                    totalWeight += totalWeight;

                                    //Push in arrray
                                    let arr = [index+1,element['width'],element['height'],element['length']];
                                    console.log(arr);
                                    arrPackage[index] = (arr);
                                })
                            }

                            //Get data invoice of shipment if this type is PACK
                            $.ajax({
                                url: 'ajax/get_packinvoice.php',
                                type: 'get',
                                dataType: 'json',
                                data: {
                                    id_shipment: id_shipment
                                }
                            }).done(function(invoice){
                                let arrInvoice = '';

                                if(invoice.length > 0){
                                    invoice.forEach(itemInvoice => {
                                        arrInvoice += `
                                        <tr>
                                            <td colspan="2">${itemInvoice['description']}</td>
                                            <td colspan="2">${itemInvoice['quantity']}</td>
                                            <td colspan="2">${itemInvoice['price']}</td>
                                        </tr>
                                        `;
                                    })
                                }

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

                                    const eTable = document.createElement('div');
                                    
                                    const contentFile = document.querySelector('.modal-export-bill');
                                    if(contentFile){
                                        
                                        eTable.innerHTML = `
                                        <table id="datatable-checkbox" class="table bulk_action table-label" style="width:100%;font-weight: 500;font-size: 16px;">
                                            <thead style="visibility: hidden;">
                                                <tr>
                                                <th></th>
                                                <th width="24%"></th>
                                                <th width="13%"></th>
                                                <th width="13%"></th>
                                                <th width="13%"></th>
                                                <th width="13%"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style="text-align: center;">
                                                <td rowspan="2" style="vertical-align: middle;">
                                                    <img src="https://bizweb.dktcdn.net/thumb/small/100/250/982/themes/582340/assets/brand1.png?1657869251930" width="100%" height="100%" style="object-fit: cover;" alt="Logo">
                                                </td>
                                                <td rowspan="2" style="color: red;font-size: 1.4em;font-weight: bold;">Sai Gon Bay Express</td>
                                                <td colspan="4">
                                                    <img src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt="QR code" width="auto" height="100px">
                                                </td>
                                                </tr>
            
                                                <tr style="text-align: center;">
                                                <td colspan="4" style="font-size: .8em;">Air waybill <br> <span style="font-size: 1.4em;">${reponse['kg_bill']}</span></td>
                                                </tr>
                                                <tr style="font-size: .8em;text-align: center;">
                                                <td>Tổng đài: 1900638045</td>
                                                <td>Website: <a href="#">http://saigonbay.vn</a></td>
                                                <td colspan="4">Service: ${nameService}</td>
                                                </tr>
            
                                                <tr style="background-color: #4285f4;">
                                                <td colspan="3" style="font-weight: bold;font-style: italic;">From(Shipper): </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                </tr>
            
                                                <tr>
                                                <td>Company Name:</td>
                                                <td colspan="2"></td>
                                                <td rowspan="2" style="font-weight: bold;text-align: center;vertical-align: middle;">Total number of package</td>
                                                <td rowspan="2" style="font-weight: bold;text-align: center;vertical-align: middle;">Gross Weight</td>
                                                <td rowspan="2" style="font-weight: bold;text-align: center;vertical-align: middle;">Chargeable</td>
                                                </tr>
            
                                                <tr>
                                                <td>Address:</td>
                                                <td colspan="2" style="border-right: none!important;"></td>
                                                </tr>
            
                                                <tr>
                                                <td>City: </td>
                                                <td colspan="2"></td>
                                                <td rowspan="5" style="text-align:center;vertical-align:middle;">${totalPackage}</td>
                                                <td rowspan="5" style="text-align:center;vertical-align:middle;">${totalWeight}</td>
                                                <td rowspan="5" style="text-align:center;vertical-align:middle;"></td>
                                                </tr>
            
                                                <tr>
                                                <td>Country: </td>
                                                <td colspan="2" style="border-right: none!important;"></td>
                                                </tr>
            
                                                <tr>
                                                <td>Phone/Fax No: </td>
                                                <td colspan="2" style="border-right: none!important;"></td>
                                                </tr>
            
                                                <tr>
                                                <td>Email: </td>
                                                <td colspan="2" style="border-right: none!important;"></td>
                                                </tr>
            
                                                <tr>
                                                <td>Contact Name: </td>
                                                <td colspan="2" style="border-right: none!important;"></td>
                                                </tr>
            
                                                <tr style="background-color: #4285f4;">
                                                <td colspan="3" style="font-weight: bold;font-style: italic;">To (Receiver):</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                </tr>
            
                                                <tr>
                                                <td>Company Name:</td>
                                                <td>${reponse['keri012']}</td>
                                                <td rowspan="2">
                                                    <div style="position: relative;font-weight: bold;">
                                                    <p class="m-0">Dimensions</p>
                                                    <hr>
                                                    <!-- <div class="line" style="position: absolute;top: 50%;left: -20%;transform: translateY(-50%);width: 100%;height: 2px;border-bottom: 2px dashed #000;"></div> -->
                                                    <p class="m-0">Pieces</p>
                                                    </div>
                                                </td>
                                                <td rowspan="2" style="text-align: center;vertical-align: middle;font-weight: bold;">L (cm)</td>
                                                <td rowspan="2" style="text-align: center;vertical-align: middle;font-weight: bold;">W (cm)</td>
                                                <td rowspan="2" style="text-align: center;vertical-align: middle;font-weight: bold;">H (cm)</td>
                                                </tr>
            
                                                <tr>
                                                <td>Address:</td>
                                                <td style="border-right: none!important;">${reponse['keri019']}</td>
                                                </tr>
            
                                                <tr>
                                                    <td>City:</td>
                                                    <td>${reponse['keri017']}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[0] ? arrPackage[0][0] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[0] ? arrPackage[0][3] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[0] ? arrPackage[0][1] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[0] ? arrPackage[0][2] : ''}</td>
                                                </tr>
            
                                                <tr>
                                                    <td>Postal Code:</td>
                                                    <td>${reponse['keri016']}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[1] ? arrPackage[1][0] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[1] ? arrPackage[1][3] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[1] ? arrPackage[1][1] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[1] ? arrPackage[1][2] : ''}</td>
                                                </tr>
            
                                                <tr>
                                                    <td>Country:</td>
                                                    <td>${nameCountry}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[2] ? arrPackage[2][0] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[2] ? arrPackage[2][3] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[2] ? arrPackage[2][1] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[2] ? arrPackage[2][2] : ''}</td>
                                                </tr>
            
                                                <tr>
                                                    <td>Phone/Fax No:</td>
                                                    <td>${reponse['keri014']}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[3] ? arrPackage[3][0] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[3] ? arrPackage[3][3] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[3] ? arrPackage[3][1] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[3] ? arrPackage[3][2] : ''}</td>
                                                </tr>
            
                                                <tr>
                                                    <td>Email:</td>
                                                    <td></td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[4] ? arrPackage[4][0] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[4] ? arrPackage[4][3] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[4] ? arrPackage[4][1] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[4] ? arrPackage[4][2] : ''}</td>
                                                </tr>
            
                                                <tr>
                                                    <td>Contact Name:</td>
                                                    <td>${reponse['keri013']}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[5] ? arrPackage[5][0] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[5] ? arrPackage[5][3] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[5] ? arrPackage[5][1] : ''}</td>
                                                    <td style="text-align:center;vertical-align:middle;">${arrPackage[5] ? arrPackage[5][2] : ''}</td>
                                                </tr>
            
                                                <tr>
                                                <td colspan="2" style="font-style: italic;font-weight: bold;">Mô tả hàng hóa (Full descriptions of goods):</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                </tr>
            
                                                <tr>
                                                <td colspan="2">Tên hàng (Name of goods)</td>
                                                <td colspan="2">Số lượng (Quantity)</td>
                                                <td colspan="2">Giá trị (values) USD</td>
                                                </tr>
            
                                                ${arrInvoice}
            
                                                <tr>
                                                <td style="font-weight: bold;">Người nhận (Picked up by):</td>
                                                <td></td>
                                                <td colspan="2" style="font-weight: bold;">Người gửi (Shipper Signature):</td>
                                                <td colspan="2"></td>
                                                </tr>
            
                                                <tr>
                                                <td style="font-weight: bold;">Ngày, giờ (Date/time):</td>
                                                <td></td>
                                                <td colspan="2" style="font-weight: bold;">Ngày, giờ (Date/time):</td>
                                                <td colspan="2"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        `;
                                        contentFile.innerHTML = ``;
                                        contentFile.appendChild(eTable);
                                        if(contentFile.innerHTML != ''){
            
                                            var divContents = $(".modal-export-bill").html();
                                            var printWindow = window.open('', '', 'height=800,width=800');
                                            printWindow.document.write('<html><head><title>DIV Contents</title><style>@page{size: A5;}table, td {border: 1px solid;}table {width: 100%;border-collapse: collapse;}</style>');
                                            printWindow.document.write('</head><body >');
                                            printWindow.document.write(divContents);
                                            printWindow.document.write('</body></html>');
                                            printWindow.document.close();
                                            printWindow.print();
                                        }
            
                                    }

                                })
                                

                            })
                        })
                    })

                })

            })
        }

    })
}

function formatDate (input) {
    const today = new Date(input);
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}