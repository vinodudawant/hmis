/*var tempforLab = "<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Purchase Request No</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Raised By</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Status</div></th>"
		+ "	</tr></thead><tbody div  >";

var InventoryMaterialTemp = "<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Enquiry No</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Sent To vendors</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Purchase Order</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>View</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Print</div></th>"
		+ "	</tr>{#foreach $T.enquiry as pl}<tr><td>{count++}</td><td>{$T.pl.id}</td><td>{$T.pl.date}</td><td>{$T.pl.vendors}</td>" +
				"<td><button id='btnEdit2' class='btn btn-xs btn-success' onclick='editEnquiry({$T.pl.id})' value='EDIT'><i class='fa fa-edit'></i></button></td>" +
				"<td><button id='btnEdit2' class='btn btn-xs btn-success' onclick='createPO({$T.pl.id})' value='EDIT'><i class='fa fa-edit'></i></button></td>" +
				"<td><button id='btnEdit2' class='btn btn-xs btn-success' onclick='printEnquiry({$T.pl.id})' value='EDIT'><i class='fa fa-edit'></i></button></td>" +
				"</tr>{#/for}</thead><tbody></table>";*/

var rowCount = 1;
var rowCountPO = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;
var minLen;
var maxLen;

/*var inventoryMRNTemp = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
	+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
	+ "<th ' class='col-md-2 center'><div> Purchase Request Number </div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Qty</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Subinventory Name</div></th>  "
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Purchase Quatation </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div> Purchase Order</div></th> </tr> </thead>"
	+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}<tr class='center'>{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_remark == 'Y'} <td>{srNumber++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.idinv_purchase_request_number}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td> <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td>"
	+ " <td ><button id='btnPurchaseQuataion'  value='Delete' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#Purchase_Quotation_Form'  onclick=\"createpurchaseQuatation({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}), getSeries(($('#pqId').val()))\"><i class='fa fa-edit'></i></button></td> <td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#Purchase_Order_Form' onclick=\"createPurchaseOrder({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}),getSeriesPO(($('#prId').val()))\" value='EDIT'><i class='fa fa-edit'></i></button></td> </tr>{#/if}{#/for}</table>"
*/
/*old temp with Quotaion*/
	/*var inventoryMRNTemp = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
		+ "<th ' class='col-md-2 center'><div> Purchase Request Number </div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Qty</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Subinventory Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Ip Address</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Center Name</div></th>  "
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Purchase Quatation </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div> Purchase Order</div></th>  </tr> </thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}<tr class='center'>{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == 3 && $T.inventoryMaterialRequestNoteMasterDTO.mrn_status != 'complete' && $T.inventoryMaterialRequestNoteMasterDTO.mrn_status != 'dispatch' } <td>{srNumber++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.idinv_purchase_request_number}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td> <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.ipAddress}</td> <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterName}</td> "
		+ " <td ><button id='btnPurchaseQuataion'  value='Delete' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#Purchase_Quotation_Form'  onclick=\"createpurchaseQuatation({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}), getSeries(($('#pqId').val()))\"><i class='fa fa-edit'></i></button></td> <td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#Purchase_Order_Form' onclick='createPurchaseOrder(\"{$T.inventoryMaterialRequestNoteMasterDTO.showIncloud}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.ipAddress}\",{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id},{$T.inventoryMaterialRequestNoteMasterDTO.center_id},\"{$T.inventoryMaterialRequestNoteMasterDTO.mrnFromClient}\"),getSeriesPO($(\"#prId\").val());' value='EDIT'><i class='fa fa-edit'></i></button></td> </tr>{#/if}{#/for}</table>";
*/
//remove Purchase Quoataion 
/*var inventoryMRNTemp = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
	+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
	+ "<th ' class='col-md-2 center'><div> Purchase Request Number </div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Qty</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Subinventory Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Ip Address</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Center Name</div></th>  "
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div> Purchase Order</div></th>  </tr> </thead>"
	+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}<tr class='center'>{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == 3 && $T.inventoryMaterialRequestNoteMasterDTO.mrn_status != 'complete' && $T.inventoryMaterialRequestNoteMasterDTO.mrn_status != 'dispatch' } <td>{srNumber++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.idinv_purchase_request_number}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td> <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.ipAddress}</td> <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterName}</td> "
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#Purchase_Order_Form' onclick='createPurchaseOrder(\"{$T.inventoryMaterialRequestNoteMasterDTO.showIncloud}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.ipAddress}\",{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id},{$T.inventoryMaterialRequestNoteMasterDTO.center_id},\"{$T.inventoryMaterialRequestNoteMasterDTO.mrnFromClient}\"),getSeriesPO($(\"#prId\").val());getSeriesSN(($(\"#sancnId\").val()));getNextSanctId();' value='EDIT'><i class='fa fa-edit'></i></button></td> </tr>{#/if}{#/for}</table>";
*/
//this for Adding Review(Indend) Button Note for (Indent) and Indedent Rejection options are added 23june2017  
/*var inventoryMRNTemp = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
	+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
	+ "<th ' class='col-md-2 center' style='display: none;'><div> Purchase Request Number </div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Qty</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Center Name</div></th> <th style='height: 21.5px; display: none;' class='col-md-1 center'><div>Ip Address</div></th> <th style='height: 21.5px;display:none;' class='col-md-1 center'><div>Center Name</div></th>  "
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div> Review </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div> Mrn Rejection </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div> PO Processing</div></th> </tr> </thead>"
	+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}<tr class='center'>{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == 1 && $T.inventoryMaterialRequestNoteMasterDTO.mrn_status != 'complete' && $T.inventoryMaterialRequestNoteMasterDTO.mrn_status != 'dispatch' && $T.inventoryMaterialRequestNoteMasterDTO.rejectFlag != 'Y'} <td>{srNumber++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td style='display: none;' id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.idinv_purchase_request_number}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td> <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> <td style='text-align=left; display: none;' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.ipAddress}</td> <td style='text-align=left;display:none;' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterName}</td> "
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#indend_form'  onclick='editMrnforReview({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id},\"{$T.inventoryMaterialRequestNoteMasterDTO.clubMrn}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.mrnReview}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.idinv_purchase_request_number}\")'  value='EDIT'><i class='fa fa-edit'></i></button></td> <td><button id='btnEdit2' class='btn btn-xs btn-success'  onclick='rejectMrn({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})' value='EDIT'><i class='fa fa-edit'></i></button></td> <td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#MulPOForm' onclick='createMulPOProces({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id},\"{$T.inventoryMaterialRequestNoteMasterDTO.mrnReview}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.clubMrn}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.idinv_purchase_request_number}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.ipAddress}\",{$T.inventoryMaterialRequestNoteMasterDTO.center_id},\"{$T.inventoryMaterialRequestNoteMasterDTO.mrnFromClient}\",{$T.inventoryMaterialRequestNoteMasterDTO.inv_subinventory_id},\"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}\")' value='EDIT'><i class='fa fa-edit'></i></button></td> </tr>{#/if}{#/for}</table>";

*/

//this temple used changed the Mrn to Pr In @Date 21/08/2018 @Author Sudhir jadhav
var inventoryMRNTemp = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
	+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Pr Id</div></th>"
	+ "<th ' class='col-md-2 center' style='display: none;'><div> Purchase Request Number </div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Pr Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Pr Remark</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Pr Qty</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Center Name</div></th> <th style='height: 21.5px; display: none;' class='col-md-1 center'><div>Ip Address</div></th> <th style='height: 21.5px;display:none;' class='col-md-1 center'><div>Center Name</div></th>  "
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div> Review </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div> Pr Rejection </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div> PO Processing</div></th> </tr> </thead>"
	+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}<tr class='center'>{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_pr_flag == 1 && $T.inventoryMaterialRequestNoteMasterDTO.mrn_status != 'complete' && $T.inventoryMaterialRequestNoteMasterDTO.mrn_status != 'dispatch' && $T.inventoryMaterialRequestNoteMasterDTO.rejectFlag != 'Y'} <td>{srNumber++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td style='display: none;' id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.idinv_purchase_request_number}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td> <td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> <td style='text-align=left; display: none;' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.ipAddress}</td> <td style='text-align=left;display:none;' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterName}</td> "
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#indend_form'  onclick='editMrnforReview({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id},\"{$T.inventoryMaterialRequestNoteMasterDTO.clubMrn}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.mrnReview}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.idinv_purchase_request_number}\")'  value='EDIT'><i class='fa fa-edit'></i></button></td> <td><button id='btnEdit2' class='btn btn-xs btn-success'  onclick='rejectMrn({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})' value='EDIT'><i class='fa fa-edit'></i></button></td> <td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#MulPOForm' onclick='createMulPOProces({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id},\"{$T.inventoryMaterialRequestNoteMasterDTO.mrnReview}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.clubMrn}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.idinv_purchase_request_number}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.ipAddress}\",{$T.inventoryMaterialRequestNoteMasterDTO.center_id},\"{$T.inventoryMaterialRequestNoteMasterDTO.mrnFromClient}\",{$T.inventoryMaterialRequestNoteMasterDTO.inv_subinventory_id},\"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}\")' value='EDIT'><i class='fa fa-edit'></i></button></td> </tr>{#/if}{#/for}</table>";


function setclearPOPONAddPO() {
	$('#Purchase_Order_Form').find('input:text').val('');
	$('#Purchase_Order_Form').find('input:hidden').val('');

	$('#Purchase_Order_Form').find('input:text').val('');
	$('#ItemInfoTablePO').find('input:text').val('');
	$('#Purchase_Order_Form').find('textarea').val('');
	$("#ItemInfoTablePO > tbody").html('');

	isNew = 0;
	rowCountPO = 1;
	//getNextQuotationId();
	getNextOrderId();
	$("#txtPurchaseOrderTotalDocQty").val(0);
	$("#txtPurchaseOrderRequestNo").val(0);
	$("#divtxtPurchaseOrderRequestNo").hide();
	$("#txtPurchaseFormName").val("PURCHASE ORDER");
	$("#txtPurchaseOrderQuatationNo").val(0);
	$("#divtxtPurchaseOrderQuatationNo").hide();
	//window.location.reload("inventory_Materail_Request_Note.jsp");
	
	$("#txtPurchaseOrderTotalDocDiscount").val(0);
	$("#txtSplDisc").val(0);
	$("#txtdebitAmt1").val(0);
	$("#txtCD1").val(0);
	$("#txtCDAmt").val(0);

	$("#txtOctroi").val(0);
	$("#txtSurcharge").val(0);
	$("#txtCreditAmt").val(0);
	$("#txtFreight").val(0);

	$("#txtVat").val(0);
	$("#txtlbt").val(0);
	$("#txtcst").val(0);
	$("#txtExVat").val(0);
	$("#txtTotalVat").val(0);

	$("#txtGross").val(0);
	$("#txtLess").val(0);
	$("#txtAdd").val(0);
	$("#textVat").val(0);

	$("#txtNetAmt").val(0);
	$("#sumofCharges").val(0);
	
	var today = new Date();
	 
	var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    
    var today1 = dd+'/'+mm+'/'+yyyy;
    $("#txtPurchaseOrderDatePRL").val(today1);
    $("#txtPurchaseOrderDeliveryDate").val(today1);
    getNextSanctId();
}

/****modified @Date 17june2016 @Author Sudhir  make item qty === Actual qty****/ 
function createpurchaseQuatation(MrnId) {

///	refreshonviewPurchaseRequest(); 	
	$('#iToHidePurchaseSaveBtn').css('display','block');
	$("#txtPurchaseQuotationRequestNo").val(MrnId);
	$("#txtPurchaseFormName").val("PURCHASE QUOTATION");

	
	

	var today = new Date();
	 
	var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    
    var today1 = dd+'/'+mm+'/'+yyyy;
    $("#txtPurchaseQuotationDate1").val(today1);
	
	
	
	
	
	var inputs = [];
	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	inputs.push('isEdit=no');
	/*var txtmaterialReqaestNoteDocId = $("#txtmaterialReqaestNoteDocId").val();*/
	inputs.push('txtmaterialReqaestNoteDocId=' + MrnId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					//alert("error");
				},
				success : function(r) {
					//alert(r);
					pobj1 = eval('(' + r + ')');
					// alert(r);
					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
					// alert(lenghtofpobj);
					var rowCount = 1;
					for ( var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {

						$("#ItemInfoTable > tbody")
								.append(
										"<tr id='deleterow"
												+ rowCount
												+ "'> <td> <input type='checkbox'  name='checkbox"
												+ rowCount
												+ "' id='checkbox"
												+ rowCount
												+ "'/></td><td>"
												+ rowCount
												+ "  <input type='hidden' id='rowcountid"
												+ rowCount
												+ "' value ="
												+ rowCount
												+ "> </td>"
												+ " <td><div id ='divtxtPurchaseQuotationItemName_'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
												+ rowCount
												+ "' onkeyup='auto(this.id"
												+ rowCount
												+ ",onchange)' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
												+ "' />"
												+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
												+ rowCount
												+ "' value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code
												+ " /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
												+ rowCount
												+ "' value='0'/></div></td> "
												+ "<td><input type='text'  style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
												+ rowCount
												+ "' onkeyup='totalAmount(this.id,"+ rowCount+ ")' onclick = 'fetchItemFactors(this.id,"+ rowCount+ ")' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty
												+ "'  onkeypress='return validateNumbers(event);'><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
												+ "<td><input type='text'   style='width:60px;' onkeyup='getTaxcodeandRatePQ(this.name,"
												+ rowCount
												+ ")' name='txtpurchaseQuatationtaxandrate_"
												+ rowCount
												+ "' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
												+ rowCount
												+ "' onkeypress='return validateNumbers(event);'></td>"
												+ ""
												+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
												+ rowCount
												+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
												+ rowCount
												+ "' onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
												+ rowCount
												+ "'   ></td>"
												+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
												+ rowCount
												+ "' onkeypress='return validateNumbers(event);'></td>"
												+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
												+ rowCount
												+ "' onkeypress='return validateNumbers(event);'></td><td><select     style='width:160px;' class='form-control input-SmallText'  multiple='multiple' onclick='multipletaxCalculationPQ(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCode_"+ rowCount
												+ "'></select></td> " +
														""
												+ " <td><input type='text'  style='width:80px;' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
												+ rowCount
												+ ")' id='txtPurchaseQuotationTaxAmount"
												+ rowCount
												+ "' onkeypress='return validateNumbers(event);' readonly='' ></td> "
												+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmtinRs"
							  					+ rowCount
												+ "' readonly=''></td> "
												+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText'readonly='' id='txtPurchaseQuotationRowAmount"
												+ rowCount
												+ "' onkeypress='return validateNumbers(event);' ></td>"
												+ "<td><input type='text'   style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
												+ rowCount
												+ "'   onkeypress='return validateNumbers(event);' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty+ "'><lable id ='txtPurchaseQuotationFactor1UOM"+rowCount+"'  > </label></td> "
												+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
												+ rowCount
												+ "'  onkeypress='return validateNumbers(event);'><lable id ='txtPurchaseQuotationFactor2UOM"+rowCount+"'  ></label></td> "
												+ "<td><input type='text'   style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
												+ rowCount
												+ "'  onkeypress='return validateNumbers(event);'><lable id ='txtPurchaseQuotationFactor3UOM"+rowCount+"' > </label></td> "
												+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
												+ rowCount
												+ "' onkeypress='return validateNumbers(event);'><lable id ='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td> "

												+ " <td><input type='text'  style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
												+ rowCount
												+ "'  onkeypress='return validateNumbers(event);' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty
												+ "' ></td> "
												+ "<td><input type='text'  style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantity"
												+ rowCount
												+ "' onkeypress='return validateNumbers(event);' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty
												+ "'></td> "
												+ "<td><input type='text'  style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
												+ rowCount + "' ></td>"
												+ " </tr>");

						$("#RowCount").val(rowCount);
						//autotaxCodeQouetaion("txtPurchaseQuotationTaxCode_" + rowCount, "onload");
						rowCount++;
						test++;

					}

					
					//autoSuggestionForLocation("txtPurchaseQuotationItemName_","onchange");
					isNew = 1;
					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
					
					totalDocQtyPQ();
					toCreateDiv();

				}

			});

}
/**@author husenbadashah***for incoming MRN request*dynamic factoring***/
function fetchItemFactors(qty,count)
{
	var quantity = $("#txtPurchaseQuotationDocQuantity"+count).val();
	var itemCode = $("#txtPurchaseQuotationItemNumber"+count).val();
	//alert(quantity+"------"+itemCode);
	
	var inputs = [];
	inputs.push('action=fetchItemPurchaseandItemMasterDetails');
	inputs.push('itemId=' + itemCode);
	inputs.push('isId=yes');
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					//alert("error");
				},
				success : function(r) {
					//alert(r);
					$('#PQItemPurchaseInfoDIV').html(r);
					//var PQ ="PurchaseQuotation";
					calculateFactoring(quantity,count);
				}
			});

}
/*****************************Refresh on view ********************************/
function refreshonviewPurchaseRequest() {
	$('#Purchase_Quotation_Form').find('input:text').val('');
	$('#Purchase_Quotation_Form').find('input:hidden').val('');

	$('#Purchase_Quotation_Form').find('input:text').val('');
	$('#ItemInfoTable').find('input:text').val('');
	$('#Purchase_Quotation_Form').find('textarea').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#ItemInfoTable > tbody").html('');
	window.location.reload("inventory_Purchase_Request_List.jsp");
	isNew = 1;
}

/********************************create new  purchase order modified @Date 17june2016 make item qty === Actual Qty* ********* */

/***************************adding width to textbox fileds @Date:10oct2016 @author:paras suryawanshi    *****************************************************************/
function createPurchaseOrder(incloud,ip,MrnId,centerId,formClient) {
	//$("#txtPurchaseQuotationRequestNo").val(MrnId);
    /*this cloud flag is used for showing saveing button to cloud and hideing to client*/
	if(incloud == "Y")
	{
		$("#savePoBtn").hide();
	}
	$('#iToHideOrderSaveBtn').css('display','block');
	$("#closeonclick").hide();
	$("#txtPurchaseOrderRequestNo").val(MrnId);
	
	$("#txtHiddenClientIp").val(ip);
			
	//this used for Checked Wethere request coming from client or not if Yes then Flag Is Y else Flag is N  
	if(formClient == 'Y'){
    	$("#txtSendtoClient").val('Y');
	   	$("#txtHiddenCenterId").val(centerId);
	   	$("#txtHiddenClientIp").val(ip);
	  	
	}
	else
		{	
		$("#txtSendtoClient").val('N');
		}
	$("#txtPurchaseFormName").val("PURCHASE ORDER");

	$("#txtPurchaseOrderQuatationNo").val(0);
	
	
	var today = new Date();
	 
	var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    
    var today1 = dd+'/'+mm+'/'+yyyy;
    $("#txtPurchaseOrderDatePRL").val(today1);
	$("#txtPurchaseOrderDeliveryDate").val(today1);
	var inputs = [];
	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	inputs.push('isEdit=no');
	/*var txtmaterialReqaestNoteDocId = $("#txtmaterialReqaestNoteDocId").val();*/
	inputs.push('txtmaterialReqaestNoteDocId=' + MrnId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					//alert("error");
				},
				success : function(r) {
					//alert(r);
					pobj1 = eval('(' + r + ')');
					// alert(r);
					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
					// alert(lenghtofpobj);
					var rowCountPO = 1;
					for ( var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {

						$("#ItemInfoTablePO > tbody")
								.append(
										"<tr id='deleterow"
												+ rowCountPO
												+ "'> <td> <input type='checkbox'  name='checkbox"
												+ rowCountPO
												+ "' id='checkbox"
												+ rowCountPO
												+ "'/></td><td>"
												+ rowCountPO
												+ "  <input type='hidden' id='rowCountPOid"
												+ rowCountPO
												+ "' value ="
												+ rowCountPO
												+ "> </td>"
												+ " <td><div id ='divtxtPurchaseQuotationItemNamePO_'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemNamePO_"
												+ rowCountPO
												+ "' onkeyup='autoPO(this.id"
												+ rowCountPO
												+ ",onchange)' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
												+ "' />"
												+ "<input type='hidden'  id='txtPurchaseQuotationItemNumberPO"
												+ rowCountPO
												+ "' value="
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code
												+ "  onkeypress='return validateNumbers(event);' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterIdPO"
												+ rowCountPO
												+ "' value='0'/></div></td> "
												+ "<td><input type='text' style=' width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantityPO"
												+ rowCountPO
												+ "' onkeyup='totalAmountPO(this.id,"+ rowCountPO + ")' onclick = 'fetchItemFactorsPO(this.id,"+ rowCountPO+ ")' value='"
												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty
												+ "' onkeypress='return validateNumbers(event)' > <label id='txtPurchaseQuotationLastFactorUOMPO"+rowCountPO+"' ></label></td> "
												+ "<td><input type ='hidden' id ='txtPurchaseQuotationTaxCodeandRate_"+rowCountPO+"' onkeyup=getTaxcodeandRate(this.id,"+rowCountPO+ ")' /> <input type='text' style='width:60px;'    class='form-control input-SmallText' id='txtPurchaseQuotationUnitPricePO"
												+ rowCountPO
												+ "' onkeypress='return validateNumbers(event);' name='txtPurchaseQuotationTaxCodeandRate_"+rowCountPO+"' onkeyup='getTaxcodeandRate(this.name,"+rowCountPO+")'></td>"
												+ ""
												+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDisPO(this.id,"
												+ rowCountPO
												+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentagePO"
												+ rowCountPO
												+ "'  onkeyup='chkTradAmtorPercentagePO(this.id,"+rowCountPO+")' onkeypress='return validateNumbers(event);'></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmtPO(this.id,"+rowCountPO+")' id='txtPurchaseQuotationTrdeDiscountInRupessPO"
												+ rowCountPO
												+ "' ></td>"
												+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmtPO"
												+ rowCountPO
												+ "' onkeypress='return validateNumbers(event);'readonly='' ></td>"
												+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmountPO"
												+ rowCountPO
												+ "' onkeypress='return validateNumbers(event);' readonly=''></td>" +
												" <td><select class='form-control input-SmallText'  style='width:160px;'  multiple='multiple'  onclick='multipletaxCalculationPO(this.id," + rowCountPO +")' id='txtPurchaseQuotationTaxCodePO_"
												+ rowCountPO
												+ "'></select></td>"
												+ " <td><input type='text' class='form-control input-SmallText'  style='width:80px;'  onkeyup='rowAmtCalPO(this.id,"
												+ rowCountPO
												+ ")' id='txtPurchaseQuotationTaxAmountPO"
												+ rowCountPO
												+ "' onkeypress='return validateNumbers(event);' ></td><td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseQuotationTaxAmtinRsPO"
												+ rowCountPO
												+ "'   readonly='' onkeypress='return validateNumbers(event);' ></td> "
												+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmountPO"
												+ rowCountPO
												+ "' onkeypress='return validateNumbers(event);' readonly=''></td>"
												+ "<td><input type='text'  style='width:60px;'   class='form-control input-SmallText' id='txtPurchaseQuotationFactor1PO"
												+ rowCountPO
												+ "'  onkeypress='return validateNumbers(event);' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "' ><lable id='txtPurchaseQuotationFactor1UOMPO"+rowCountPO+"'></lable></td> "
												+ "<td><input type='text'  style='width:60px;'   class='form-control input-SmallText' id='txtPurchaseQuotationFactor2PO"
												+ rowCountPO
												+ "'  onkeypress='return validateNumbers(event);' ><lable id='txtPurchaseQuotationFactor2UOMPO"+rowCountPO+"'></lable></td> "
												+ "<td><input type='text'  style='width:60px;'   class='form-control input-SmallText' id='txtPurchaseQuotationFactor3PO"
												+ rowCountPO
												+ "' onkeypress='return validateNumbers(event);' ><lable id='txtPurchaseQuotationFactor3UOMPO"+rowCountPO+"'></lable></td> "
												+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationFactor4PO"
												+ rowCountPO
												+ "' onkeypress='return validateNumbers(event);' ><lable id='txtPurchaseQuotationFactor4UOMPO"+rowCountPO+"'></lable></td> "

												+ " <td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantityPO"
												+ rowCountPO
												+ "' onblur='pendingAmountPO(this.id,"
												+ rowCountPO
												+ ")' onkeypress='return validateNumbers(event);' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "' ></td> "
												+ "<td><input type='text'  style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantityPO"
												+ rowCountPO
												+ "' onkeypress='return validateNumbers(event);' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "' ></td> "
												+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
												+ rowCountPO + "' ></td>"
												+ "</tr>");

						$("#RowCountPO").val(rowCountPO);
					//	autotaxCode("txtPurchaseQuotationTaxCodePO_" + rowCountPO, "onload");
						rowCountPO++;
						test++;
						

					}

					
					//autoSuggestionForLocation("txtPurchaseQuotationItemName_","onchange");
					isNew = 1;
					var totaltblsize = $("#RowCountPO").val();
					$("#totaltblsize").val(totaltblsize);
					totalDocQtyPO();
					toCreateDivPO();

				}

			});

}
/***************************end adding width to textbox fileds @Date:10oct2016 @author:paras suryawanshi    *****************************************************************/
/**@author husenbadashah***for incoming MRN request*dynamic factoring***/
function fetchItemFactorsPO(qty,count)
{
	var quantity = $("#txtPurchaseQuotationDocQuantityPO"+count).val();
	var itemCode = $("#txtPurchaseQuotationItemNumberPO"+count).val();
	//alert(quantity+"----ORDER--"+itemCode);
	
	var inputs = [];
	inputs.push('action=fetchItemPurchaseandItemMasterDetails');
	inputs.push('itemId=' + itemCode);
	inputs.push('isId=yes');
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					//alert("error");
				},
				success : function(r) {
					//alert(r);
					$('#POItemPurchaseInfoDIV').html(r);
					var PO ="PurchaseOrder";
					calculateFactoring(quantity,count,PO);
				}
			});

}
/**************************************purchase Quatation next id**********************************/

function getNextQuotationId() {
	var inputs = [];
	inputs.push('action=getQuotationNextId');
	inputs.push('tableName=inv_purchase_common_master');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtPurchaseQuotationDocNo").val(r);

			//$("#txtPurchaseOrderDocNoPRl").val(r);
		}
	});
}

/***************************get next autogenrated id  for purchase order *******************************************/
function getNextOrderId() {
	var inputs = [];
	inputs.push('action=getQuotationNextId');
	inputs.push('tableName=inv_new_purchase_order_master');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			$("#txtPurchaseOrderDocNoPRl").val(r);
		}
	});
}

function fetchMaterialRequestNoteDetailsinPurReqList() {

	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailinPurReqList');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//alert(r);
			srNumber=1;
			$("#MRNcontent").setTemplate(inventoryMRNTemp);
			$("#MRNcontent").processTemplate(pobj1);

			$("#MRNAjaxResp").html(r);
		}
	});
}

/***************create Dynamic rows in table for PQ Author:sudhir Modified Date: 27:11:2015************************************/

function toCreateDiv() {

	if (test > 0 && isNew > 0) {
		if (rowCount == 1) {

			rowCount = test;

		}

		$('#iToHidePurchaseSaveBtn').css('display','block');
		rowCount++;

		$("#ItemInfoTable > tbody")
				.append(
						"<tr id='deleterow"
								+ rowCount
								+ "'> <td> <input type='checkbox' checked='checked'   name='checkbox"
								+ rowCount
								+ "' id='checkbox"
								+ rowCount
								+ "'/></td><td>"
								+ rowCount
								+ "  <input type='hidden' id='rowcountid"
								+ rowCount
								+ "' value ="
								+ rowCount
								+ "> </td>"
								+ " <td><div id ='divtxtPurchaseQuotationItemName_'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'    id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id"
								+ rowCount
								+ ",onchange)' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' style='width:60px;'  id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' style='width:60px;' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText'  onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "'   ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' readonly=''  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' readonly=''   style='width:100px;'  id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td> <td><select class='form-control input-SmallText'  multiple='multiple' onclick='multipletaxCalculationPQ(this.id," + rowCount + ")' style='width:160px;'  id='txtPurchaseQuotationTaxCode_"
								+ rowCount
								+ "'></select></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  style='width:80px;' readonly='' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmtinRs"
  					            + rowCount
								+ "' readonly=''></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' readonly=''  id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' style='width:60px;' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'><lable id ='txtPurchaseQuotationFactor1UOM"+rowCount+"'  > </label></td> "
								+ "<td><input type='text' class='form-control input-SmallText'maxlength='5' style='width:60px;' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'><lable id ='txtPurchaseQuotationFactor2UOM"+rowCount+"'  > </label></td> "
								+ "<td><input type='text' class='form-control input-SmallText'maxlength='5' style='width:60px;' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'><lable id ='txtPurchaseQuotationFactor3UOM"+rowCount+"'  > </label></td> "
								+ "<td><input type='text' class='form-control input-SmallText'maxlength='5' style='width:60px;' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'><lable id ='txtPurchaseQuotationFactor4UOM"+rowCount+"'  > </label></td> "
								+ " <td><input type='text' class='form-control input-SmallText' style='width:60px;' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' style='width:60px;' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' style='width:60px;' id='txtPurchaseQuotationBatchNo"
								+ rowCount + "' ></td>" + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
		//autotaxCodeQouetaion("txtPurchaseQuotationTaxCode_" + rowCount, "onload");

	} else {
		$("#ItemInfoTable > tbody")
				.append(
						"<tr id='deleterow"
								+ rowCount
								+ "'> <td> <input type='checkbox'  checked='checked'  name='checkbox"
								+ rowCount
								+ "' id='checkbox"
								+ rowCount
								+ "'/></td><td>"
								+ rowCount
								+ "  <input type='hidden' id='rowcountid"
								+ rowCount
								+ "' value ="
								+ rowCount
								+ "> </td>"
								+ " <td><div id ='divtxtPurchaseQuotationItemName_'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id"
								+ rowCount
								+ ",onchange)'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:60px;'  id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' style='width:60px;' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onkeypress='return validateNumbers(event);' ></td><td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "'   ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' readonly=''  style='width:100px;' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td> <td><select class='form-control input-SmallText'  multiple='multiple' onclick='multipletaxCalculationPQ(this.id," + rowCount + ")' style='width:160px;'  id='txtPurchaseQuotationTaxCode_"
								+ rowCount
								+ "'></select></td> "
								+ " <td><input type='text' class='form-control input-SmallText'  style='width:80px;' readonly=''  onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmtinRs"
			  					+ rowCount
								+ "' readonly=''></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' readonly=''  id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' maxlength='5'  style='width:60px;' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' style='width:60px;'  id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text' class='form-control input-SmallText'maxlength='5' style='width:60px;' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text' class='form-control input-SmallText'maxlength='5'  style='width:60px;' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ " <td><input type='text' class='form-control input-SmallText'  style='width:60px;' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")'  onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:60px;' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text' class='form-control input-SmallText'   style='width:60px;'   id='txtPurchaseQuotationBatchNo"
								+ rowCount + "'></td>" + "    </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
		rowCount++;
	}

}

/***************create Dynamic rows in table for purchase order ************************************/

function toCreateDivPO() {
	$('#iToHideOrderSaveBtn').css('display','block');
	$("#closeonclick").hide();
	if (test > 0 && isNew > 0) {
		if (rowCountPO == 1) {

			rowCountPO = test;

		}

		rowCountPO++;
		$('#Purchase_Order_Form').modal('show');
		$("#ItemInfoTablePO > tbody")
				.append(
						"<tr id='deleterow"
								+ rowCountPO
								+ "'> <td> <input type='checkbox'  checked='checked'  name='checkbox"
								+ rowCountPO
								+ "' id='checkbox"
								+ rowCountPO
								+ "'/></td><td>"
								+ rowCountPO
								+ "  <input type='hidden' id='rowCountPOid"
								+ rowCountPO
								+ "' value ="
								+ rowCountPO
								+ "> </td>"
								+ " <td><div id ='divtxtPurchaseQuotationItemNamePO_'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemNamePO_"
								+ rowCountPO 
								+ "' onkeyup='autoPO(this.id"+rowCountPO+ ",onchange)'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumberPO"
								+ rowCountPO
								+ "' value='0'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterIdPO"
								+ rowCountPO
								+ "' value='0'/></div></td> "
								+ "<td><input type='text'   style='width:60px;'   class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantityPO"
								+ rowCountPO
								+ "' onkeyup='totalAmountPO(this.id,"
								+ rowCountPO
								+ ")' onkeypress='return validateNumbers(event);'> <label id='txtPurchaseQuotationLastFactorUOMPO"+rowCount+"' ></label></td> "
								+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationUnitPricePO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDisPO(this.id,"
								+ rowCountPO
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentagePO"
								+ rowCountPO
								+ "'  onkeyup='chkTradAmtorPercentagePO(this.id,"+rowCountPO+")' onkeypress='return validateNumbers(event);'></td><td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmtPO(this.id,"+rowCountPO+")' id='txtPurchaseQuotationTrdeDiscountInRupessPO"
												+ rowCountPO
												+ "' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmtPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'readonly=''></td>"
								+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmountPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'readonly=''></td> "
								+ "<td><select  style='width:160px;' class='form-control input-SmallText'  multiple='multiple' onclick='multipletaxCalculationPO(this.id," + rowCountPO +")' id='txtPurchaseQuotationTaxCodePO_" +rowCountPO + "'></select></td>" +
								" <td><input type='text'   style='width:80px;' class='form-control input-SmallText' onkeyup='rowAmtCalPO(this.id,"
								+ rowCountPO
								+ ")' id='txtPurchaseQuotationTaxAmountPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmtinRsPO"
  					            + rowCountPO
								+ "' readonly=''></td> "
								+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationRowAmountPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);' readonly=''></td>"
								
								+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationFactor1PO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'> <lable  style='width:60px;'  id='txtPurchaseQuotationFactor1UOMPO"+rowCountPO+"'></lable></td> "
								+ "<td><input  style='width:60px;'  type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2PO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'> <lable  style='width:60px;'  id='txtPurchaseQuotationFactor2UOMPO"+rowCountPO+"'> </lable></td> "
								+ "<td><input type='text'   style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationFactor3PO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'></td><lable   style='width:60px;'  id='txtPurchaseQuotationFactor3UOMPO"+rowCountPO+"'>  </lable> "
								+ "<td><input type='text'   style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationFactor4PO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'><lable  style='width:60px;'   id='txtPurchaseQuotationFactor4UOMPO"+rowCountPO+"'> </lable></td> "
								+ " <td><input type='text'  style='width:60px;'   class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantityPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantityPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text'   style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
								+ rowCountPO + "'></td>" + "</tr>");

		$("#RowCountPO").val(rowCountPO);
		var totaltblsize = $("#RowCountPO").val();
		$("#totaltblsize").val(totaltblsize);
		autoPO("txtPurchaseQuotationItemNamePO_" + rowCountPO, "onload");
		//autotaxCode("txtPurchaseQuotationTaxCodePO_" + rowCountPO, "onload");

	} else {
		$("#ItemInfoTablePO > tbody")
				.append(
						"<tr id='deleterow"
								+ rowCountPO
								+ "'> <td> <input type='checkbox' checked='checked'  name='checkbox"
								+ rowCountPO
								+ "' id='checkbox"
								+ rowCountPO
								+ "'/></td><td>"
								+ rowCountPO
								+ "  <input type='hidden' id='rowCountPOid"
								+ rowCountPO
								+ "' value ="
								+ rowCountPO
								+ "> </td>"
								+ " <td><div id ='divtxtPurchaseQuotationItemNamePO_'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemNamePO_"
								+ rowCountPO
								+ "' onkeyup='autoPO(this.id"
								+ rowCountPO
								+ ",onchange)'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumberPO"
								+ rowCountPO
								+ "' value='0'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterIdPO"
								+ rowCountPO
								+ "' value='0'/></div></td> "
								+ "<td><input   style='width:60px;'  type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantityPO"
								+ rowCountPO
								+ "' onkeyup='totalAmountPO(this.id,"
								+ rowCountPO
								+ ")' onkeypress='return validateNumbers(event);'><label id='txtPurchaseQuotationLastFactorUOMPO"+rowCount+"' ></label></td> "
								+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationUnitPricePO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDisPO(this.id,"
								+ rowCountPO
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentagePO"
								+ rowCountPO
								+ "' onkeyup='chkTradAmtorPercentagePO(this.id,"+rowCountPO+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmtPO(this.id,"+rowCountPO+")' id='txtPurchaseQuotationTrdeDiscountInRupessPO"
								+ rowCountPO
								+ "' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmtPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'readonly=''></td>"
								+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmountPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'readonly=''></td>"
								+ "<td><select   style='width:160px;' class='form-control input-SmallText'  multiple='multiple' onclick='multipletaxCalculationPO(this.id," + rowCountPO +")' id='txtPurchaseQuotationTaxCodePO_" +rowCountPO+ "'></select></td>" +
								"<td><input type='text'  style='width:80px;'  class='form-control input-SmallText' onkeyup='rowAmtCalPO(this.id,"
								+ rowCountPO
								+ ")' id='txtPurchaseQuotationTaxAmountPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmtinRsPO"
  					            + rowCountPO
								+ "' readonly=''></td> "
								+ "<td><input type='text'   style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationRowAmountPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'readonly=''></td>"
								+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationFactor1PO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'> <label   style='width:60px;'  id='txtPurchaseQuotationFactor1UOMPO"+rowCountPO+"' class='form-control input-SmallText' ></label></td> "
								+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationFactor2PO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'><label  style='width:60px;'  id='txtPurchaseQuotationFactor2UOMPO"+rowCountPO+"' class='form-control input-SmallText' ></label></td> "
								+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationFactor3PO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'><label    style='width:60px;'  id='txtPurchaseQuotationFactor3UOMPO"+rowCountPO+"' class='form-control input-SmallText' ></label></td> "
								+ "<td><input type='text'  style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationFactor4PO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'><label   style='width:60px;'  id='txtPurchaseQuotationFactor4UOMPO"+rowCountPO+"' class='form-control input-SmallText' ></label></td> "
								+ " <td><input type='text'   style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantityPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text'   style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantityPO"
								+ rowCountPO
								+ "' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text'    style='width:60px;'  class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
								+ rowCountPO + "' ></td>" + " </tr>");

		$("#RowCountPO").val(rowCountPO);
		var totaltblsize = $("#RowCountPO").val();
		$("#totaltblsize").val(totaltblsize);
		autoPO("txtPurchaseQuotationItemNamePO_" + rowCountPO, "onload");
		//autotaxCode("txtPurchaseQuotationTaxCodePO_" + rowCountPO, "onload");
		rowCountPO++;
	}

}

/*****************remove dynamic rows in table ********************* */
function toRemoveDivStock(RowCount) {
	var hiddenRowCount = document.getElementById(RowCount).value;
	// alert(hiddenRowCount);
	// var rowCount = hiddenRowCount.value;
	var temp = hiddenRowCount;

	var totaltblsize = $("#totaltblsize").val();

	var p = 1;
	for ( var i = 0; i < totaltblsize; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#deleterow" + p + "").remove();
			temp = temp - 1;
		//	$("#RowCountPO").val(temp);
			$("#RowCount").val(temp);
		}
		p++;
	}
	isNew = 1;
	totalDocDiscountPQ();
	totalDocQtyPQ(); 
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	/*totalDocDiscountPO();
	totalDocQtyPO();*/
}




/*****************remove dynamic rows in table ********************* */
function toRemoveDivStockOrder(RowCount) {
	var hiddenRowCount = document.getElementById(RowCount).value;
	// alert(hiddenRowCount);
	// var rowCount = hiddenRowCount.value;
	var temp = hiddenRowCount;

	var totaltblsize = $("#totaltblsize").val();

	var p = 1;
	for ( var i = 0; i < totaltblsize; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#deleterow" + p + "").remove();
			temp = temp - 1;
			$("#RowCountPO").val(temp);
			//$("#RowCount").val(temp);
		}
		p++;
	}
	isNew = 1;
	/*totalDocDiscountPQ();
	totalDocQtyPQ();*/
	
	totalDocQtyPO();
	totalDocDiscountPO();
	totalGrossAmtPO(1,rowCount);
	totalVatAmtPO(1,rowCount);
}

/** ******* AutoSuggestion Code for item  author:sudhir modified Date :15:12:2015 modified Date 17june2016 make item item qty and Actual qty equal********** */

function auto(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	// var txtVal = $('#'+ inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchItemName');

		inputs.push('txtVal=' + txtVal1);
		inputs.push('isId=no');
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						//alert('error');
					},
					success : function(r) {
						// alert(r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(r);

							// alert(ajaxResponse.ltinvetorypurchasecommonmaster.length);
							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								// alert(ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_Supplier_Name+"_"+ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_doc_no);
								availableTags
										.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
												+ "_"
												+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value= "'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);
							// $(".divtxtPurchaseQuotationItemName").html(template);
							if (typeauto != 'onload') {
								$("#div" + inputID + " .typeahead").show();
								// $(".divtxtPurchaseQuotationItemName").show();
							}

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult(item) {

			// alert((item.text).trim() + " : " + (item.value).trim());



			$("#ItemInfoTable input[type=checkbox]").each(function(){

				  $(this).prop("checked",false);
				});
			toCreateDiv();
			
			
			
			
			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var currentcode = item.value;

			$('#txtPurchaseQuotationItemNumber' + idValue).val(currentcode);

			var inputs = [];
			inputs.push('action=fetchItemPurchaseandItemMasterDetails');
			inputs.push('itemId=' + currentcode);
			inputs.push('isId=yes');
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "InventoryServlet",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							//alert("error");
						},
						success : function(r) {
							//alert(r);
							$('#PQItemPurchaseInfoDIV').html(r);
							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.inventoryitempurchaseandItemMasterDTOs.length; i++) {
								// alert(ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_Supplier_Name+"_"+ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_doc_no);
								$('#txtPurchaseQuotationUnitPrice' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorPrice);
								$('#txtPurchaseQuotationFactor1' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor1);
								$('#txtPurchaseQuotationFactor2' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor2);
								$('#txtPurchaseQuotationFactor3' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor3);
								$('#txtPurchaseQuotationFactor4' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor4);
								/*$('#txtPurchaseQuotationDocQuantity' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);*/
								
								
								//for UOM of factors 
								$('#txtPurchaseQuotationFactor1UOM' + idValue)
								.text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_1);
								
						$('#txtPurchaseQuotationFactor2UOM' + idValue)
								.text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_2);
						$('#txtPurchaseQuotationFactor3UOM' + idValue)
								.text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_3);
						$('#txtPurchaseQuotationFactor4UOM' + idValue).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_4);
								

								$('#txtPurchaseQuotationDocQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								$('#txtPurchaseQuotationActualQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								$('#txtPurchaseQuotationPendingQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								
								var txtPurchaseQuotationTaxCode = ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].inv_item_taxcode_and_rate;
								var Finalrateandtax = txtPurchaseQuotationTaxCode.split(",");
								var finalrat;
								var finalRateamt;
								var sumofRate = 0;
								for(i=0;i<Finalrateandtax.length;i++)
									{ 
									finalrat = Finalrateandtax[i];
									
									var taxRate =  finalrat.split("_");
									finalRateamt = taxRate[1];
									
									sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
									
									var option = "";
									option = option
										+ "<option value="
										+ finalrat
										+ ">"
										+ finalrat
										+ "</option>";
								$("#txtPurchaseQuotationTaxCode_"+idValue).append(option);
									}
								
								totalAmount();
								$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
								break;
								
								
								
								
								/*totalAmount();
								break;*/
							}
						}
					});

		}
	}
}

/** ******* AutoSuggestion Code for item ********** */

function autoPO(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	// var txtVal = $('#'+ inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchItemName');

		inputs.push('txtVal=' + txtVal1);
		inputs.push('isId=no');
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						//alert('error');
					},
					success : function(r) {
						// alert(r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(r);

							// alert(ajaxResponse.ltinvetorypurchasecommonmaster.length);
							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								// alert(ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_Supplier_Name+"_"+ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_doc_no);
								availableTags
										.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
												+ "_"
												+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value= "'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);
							// $(".divtxtPurchaseQuotationItemName").html(template);
							if (typeauto != 'onload') {
								$("#div" + inputID + " .typeahead").show();
								// $(".divtxtPurchaseQuotationItemName").show();
							}

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult(item) {

			// alert((item.text).trim() + " : " + (item.value).trim());
			$("#ItemInfoTablePO input[type=checkbox]").each(function(){

				  $(this).prop("checked",false);
				});
			toCreateDivPO();

			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var currentcode = item.value;
			
			
			
			
			/*	this function is used for fetch party Contract Rate @Date : 17may2017 @Author :sudhir jadhav*/

			var itemId =  currentcode;//itemMasterId; 
			var partyConId = $('#txtVendorCodePO').val(); //PcontrctId;
			var inputs = [];
			inputs.push('action=fetchPatyConDetails');
			inputs.push('itemId=' + itemId);
			inputs.push('partyConId=' + partyConId);
			inputs.push('isEdit=PartyRate');

			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					 
					ajaxResponse = eval('(' + r + ')');
					if(ajaxResponse.ltContDTOs.length > 0)//if rate found the show party rate or set default Zero set 
						{
						$('#txtPurchaseQuotationUnitPricePO' + idValue).val(ajaxResponse.ltContDTOs[0].partyRate);
						}
					else
						{
						$('#txtPurchaseQuotationUnitPricePO' + idValue).val('0');
						}
					 
				}
			});
			
			/*	End this function is used for fetch party Contract Rate @Date : 17may2017 @Author :sudhir jadhav*/
			

			//alert(item.value);
			$("#ItemID").val(currentcode);
			$('#txtPurchaseQuotationItemNumberPO' + idValue).val(currentcode);

			var inputs = [];
			inputs.push('action=fetchItemPurchaseandItemMasterDetails');
			inputs.push('itemId=' + item.value);
			inputs.push('isId=yes');
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : false,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "InventoryServlet",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							//alert("error");
						},
						success : function(r) {
							//alert(r);
							$('#POItemPurchaseInfoDIV').html(r);
							ajaxResponse = eval('(' + r + ')');
							for ( var i = 0; i < ajaxResponse.inventoryitempurchaseandItemMasterDTOs.length; i++) {

								/*$('#txtPurchaseQuotationUnitPricePO' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorPrice);*/
								$('#txtPurchaseQuotationFactor1PO' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor1);
								$('#txtPurchaseQuotationFactor2PO' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor2);
								$('#txtPurchaseQuotationFactor3PO' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor3);
								$('#txtPurchaseQuotationFactor4PO' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor4);

																
								// for UOM of factors

								$('#txtPurchaseQuotationFactor1UOMPO' + idValue)
										.text(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_1);
								$('#txtPurchaseQuotationFactor2UOMPO' + idValue)
										.text(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_2);
								$('#txtPurchaseQuotationFactor3UOMPO' + idValue)
										.text(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_3);
								$('#txtPurchaseQuotationFactor4UOMPO' + idValue)
										.text(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_4);
								//old last UOm Qty
								/*$('#txtPurchaseQuotationLastFactorUOMPO' + idValue).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenLastUOM);*/
								$('#txtPurchaseQuotationLastFactorUOMPO' + idValue).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_1);
								
								
									//$('#txtPurchaseQuotationDocQuantityPO'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);
								//alert(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								/***hidden values**/
								/*$("#item_purchase_uom_factor1" + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor1);
								$("#item_purchase_uom_factor2" + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor2);
								$("#item_purchase_uom_factor3" + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor3);
								$("#item_purchase_uom_factor4" + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor4);
								$("#hiddenfactorQTY" + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);*/
								
								//new qty with factor Qty 
								$('#txtPurchaseQuotationDocQuantityPO'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor1);
								$('#txtPurchaseQuotationActualQuantityPO'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor1);
								$('#txtPurchaseQuotationPendingQuantityPO'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor1);
								
								
								//old this hiden qty and 
								/*$('#txtPurchaseQuotationDocQuantityPO'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								$('#txtPurchaseQuotationActualQuantityPO'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								$('#txtPurchaseQuotationPendingQuantityPO'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);*/
								
								var txtPurchaseQuotationTaxCode = ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].inv_item_taxcode_and_rate;
								var Finalrateandtax = txtPurchaseQuotationTaxCode.split(",");
								var finalrat;
								var finalRateamt;
								var sumofRate = 0;
								for(i=0;i<Finalrateandtax.length;i++)
									{ 
									finalrat = Finalrateandtax[i];
									
									var taxRate =  finalrat.split("_");
									finalRateamt = taxRate[1];
									
									sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
									
									var option = "";
									option = option
										+ "<option value="
										+ finalrat
										+ ">"
										+ finalrat
										+ "</option>";
								$("#txtPurchaseQuotationTaxCodePO_"+idValue).append(option);
									}
								totalAmountPO();
								$("#txtPurchaseQuotationTaxAmountPO"+idValue).val(sumofRate);
								break;
							}

						}
					});

		}
	}
}

/***************************Autosuggetion for supplyer Name*******************/
function setValuesToAutocompleteForSupplierName(inputID, type) {

	var resultData = [];

	var txtVal = $('#' + inputID).val();
	if ((type == "onload") || (txtVal != null && txtVal != "")) {

		// alert(inputID + " " + type);

		var inputs = [];

		inputs.push('action=fetchVendorName');

		inputs.push('txtVal=' + txtVal);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
					//	alert('error');
					},
					success : function(r) {
						// alert("r.length>>" + r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");
                              
							$("#txtPurchaseQuotationSupplierName").val('');
							
							
						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(ajaxResponse);

							// alert(ajaxResponse.ltinvetorypurchasecommonmaster.length);
							for ( var i = 0; i < ajaxResponse.ltpartyMaster.length; i++) {
								// alert(ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_Supplier_Name+"_"+ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_doc_no);
								availableTags
										.push(ajaxResponse.ltpartyMaster[i].party_master_name
												+ "_"
												+ ajaxResponse.ltpartyMaster[i].party_master_id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value="'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);

							if (type != 'onload') {
								$("#div" + inputID + " .typeahead").show();
							}

							setTimeout(function() {
								$('#txtPurchaseQuotationSupplierName')
										.typeahead({
											source : resultData,
											displayField : 'Name',
											valueField : 'ID',
											onSelect : displayResult,
											scrollBar : true

										});

							}, 500);
						}
					}
				});

		function displayResult(item) {
			$('#txtVendorCode').val(item.value);
			//alert("Id=" + item.value + " Value=" + item.text);
			var masterId = item.value;
			//alert(masterId);

			fetchPartyMasterContactsDetails(masterId);
			fetchPartyMasterAddressDetails(masterId);
			fetchPartyMasterPaymentDetails(masterId);
			fecthPartyOtherInfo(masterId);
			fetchPartyMasterGeneralDetails(masterId);

			/*
			 * // alert("Id=" + item.value + " Value=" + item.text);
			 * 
			 * $('.alert').show().html( 'You selected <strong>' + item.value + '</strong>:
			 * <strong>' + item.text + '</strong>');
			 */
		}
	}
}

/****************** get general information of party for party mobile number ************/
function fetchPartyMasterGeneralDetails(partyId) {
	var inputs = [];
	inputs.push('action=fetchPartyGeneralDetails');
	inputs.push('isEdit=no');
	inputs.push('txtpartymasterId=' + partyId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			//pobj1 = eval('(' + r + ')');
			objPartyGenralInfo = JSON.parse(r);
			var myGenralnfoObj = "";
			for ( var i = 0; i < objPartyGenralInfo.ltinventorypartymastergeneralinfodto.length; i++) {
				if (objPartyGenralInfo.ltinventorypartymastergeneralinfodto[i].party_master_id == partyId) {
					myGenralnfoObj = objPartyGenralInfo.ltinventorypartymastergeneralinfodto[i];
					break;
				}
			}

			$("#txtPurchaseQuotationMobileNo").val(myGenralnfoObj.party_master_general_info_mobile);
			//$("#txtPurchaseOrderMobileNo").val(myGenralnfoObj.party_master_general_info_mobile);
			//alert(r);
			/*counterPartyGeneralInfo = 1;
			$("#GeneralInfoTable").setTemplate(inventoryPartyGeneralInfoTemp);
			$("#GeneralInfoTable").processTemplate(pobj1);
			$("#PartyGeneralTableInfoList").html(r);*/
		}
	});
}


/*****************************************other info**************************************************/
function getOtherInfoIdPurList() {
	var inputs = [];
	inputs.push('action=txtotherid');
	inputs.push('tableName=inv_party_master_other_info');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtotherid").val(r);
		}
	});
}

function fecthPartyOtherInfo(partyMasterID) {
	//alert(partyMasterID);
	var inputs = [];
	inputs.push('action=fetchPartyOtherDetails');
	inputs.push('partyMasterID=' + partyMasterID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
				//	alert("error");
				},
				success : function(r) {
					//alert(r);
					objOther = JSON.parse(r);
					var myOtherObj = "";
					for ( var i = 0; i < objOther.ltinventorypartymasterotherinfodto.length; i++) {
						if (objOther.ltinventorypartymasterotherinfodto[i].party_master_id == partyMasterID) {
							myOtherObj = objOther.ltinventorypartymasterotherinfodto[i];
							break;
						}
					}

					$("#txtotherid").val(myOtherObj.party_master_other_info_id);
					$("#txttopic")
							.val(myOtherObj.party_master_other_info_topic);
					$("#txtfile").val(myOtherObj.party_master_other_info_file);
					$("#txtdescription").val(
							myOtherObj.party_master_other_info_description);
				}

			});

}

/***************************Autosuggetion for supplyer Name for PO *******************/
function setValuesToAutocompleteForSupplierNamePO(inputID, type) {

	var resultData = [];

	var txtVal = $('#' + inputID).val();
	if ((type == "onload") || (txtVal != null && txtVal != "")) {

		// alert(inputID + " " + type);

		var inputs = [];

		inputs.push('action=fetchVendorName');

		inputs.push('txtVal=' + txtVal);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
					//	alert('error');
					},
					success : function(r) {
						// alert("r.length>>" + r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");
							$('#' + inputID).val('');
							$('#' + inputID).focuse();

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(ajaxResponse);

							// alert(ajaxResponse.ltinvetorypurchasecommonmaster.length);
							for ( var i = 0; i < ajaxResponse.ltpartyMaster.length; i++) {
								// alert(ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_Supplier_Name+"_"+ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_doc_no);
								availableTags
										.push(ajaxResponse.ltpartyMaster[i].party_master_name
												+ "_"
												+ ajaxResponse.ltpartyMaster[i].party_master_id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value="'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);

							if (type != 'onload') {
								$("#div" + inputID + " .typeahead").show();
							}

							setTimeout(function() {
								$('#txtPurchaseOrderSupplierName').typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult(item) {
			$('#txtVendorCodePO').val(item.value);

			//alert("Id=" + item.value + " Value=" + item.text);
			var masterID = item.value;
			//alert(masterID);

			fetchPartyMasterContactsDetailsPO(masterID);
			fetchPartyMasterAddressDetailsPO(masterID);
			fecthPartyOtherInfoPO(masterID);
			fetchPartyMasterGeneralDetailsPO(masterID);
			getGeneralInfoIdForPurListPO();
			getAddressInfoIdPurListPO();
			getOtherInfoIdPurListPO();
			
			
			
			
		}
		
		 
	}
}
/****************** get general information of party for party mobile number  Date :7 jan 2015 Auothor:sudhir ************/
function fetchPartyMasterGeneralDetailsPO(partyId) {
	var inputs = [];
	inputs.push('action=fetchPartyGeneralDetails');
	inputs.push('isEdit=no');
	inputs.push('txtpartymasterId=' + partyId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			//pobj1 = eval('(' + r + ')');
			objPartyGenralInfo = JSON.parse(r);
			var myGenralnfoObj = "";
			for ( var i = 0; i < objPartyGenralInfo.ltinventorypartymastergeneralinfodto.length; i++) {
				if (objPartyGenralInfo.ltinventorypartymastergeneralinfodto[i].party_master_id == partyId) {
					myGenralnfoObj = objPartyGenralInfo.ltinventorypartymastergeneralinfodto[i];
					
					break;
				}
			}

			$("#txtPurchaseOrderMobileNo").val(myGenralnfoObj.party_master_general_info_mobile);
			 
		}
	});
}

/*****************************************other info**************************************************/
function getOtherInfoIdPurListPO() {
	var inputs = [];
	inputs.push('action=txtotherid');
	inputs.push('tableName=inv_party_master_other_info');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		//	alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtotheridPO").val(r);
		}
	});
}

function fecthPartyOtherInfoPO(partyMasterID) {
	//alert(partyMasterID);
	var inputs = [];
	inputs.push('action=fetchPartyOtherDetails');
	inputs.push('partyMasterID=' + partyMasterID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					//alert(r);
					objOther = JSON.parse(r);
					var myOtherObj = "";
					for ( var i = 0; i < objOther.ltinventorypartymasterotherinfodto.length; i++) {
						if (objOther.ltinventorypartymasterotherinfodto[i].party_master_id == partyMasterID) {
							myOtherObj = objOther.ltinventorypartymasterotherinfodto[i];
							break;
						}
					}

					$("#txtotheridPO").val(
							myOtherObj.party_master_other_info_id);
					$("#txttopicPO").val(
							myOtherObj.party_master_other_info_topic);
					$("#txtfilePO")
							.val(myOtherObj.party_master_other_info_file);
					$("#txtdescriptionPO").val(
							myOtherObj.party_master_other_info_description);
				}

			});

}

/*******************************************SHow fiunction for purchase Quatation************************************************/
/* 
 function showInfo(id, tableName) {
 if (id != "-1") {
 if (tableName == 'inv_party_master_contact_info') {
 var inputs = [];
 inputs.push('action=fetchShowDetail');
 inputs.push('id=' + id);
 inputs.push('tableName=' + tableName);
 var str = inputs.join('&');
 jQuery
 .ajax({
 async : true,
 type : "POST",
 data : str + "&reqType=AJAX",
 url : "InventoryServlet",
 timeout : 1000 * 60 * 5,
 catche : false,
 error : function() {
 alert("error");
 },
 success : function(r) {
 objContact = JSON.parse(r);
 for ( var i = 0; i < objContact.ltinventorypartymastrecontactinfodto.length; i++) {
 var ContactID=objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_id;
 $("#txtcontactcode").val(ContactID);
 var contactPerson=objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_name;
 $("#txtcontactperson").val(contactPerson);
 $("#txtdesignation").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_designation);
 $("#txtcontaddress").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_address);
 $("#txtgender").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_gender);
 $("#txtdate").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_dob);
 $("#txtphone1").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_phone_number1);
 $("#txtphone2").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_phone_number2);
 var mobNo=objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_mobile;
 $("#txtcontactmobile").val(mobNo);
 var emailID=objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_email;
 $("#txtemail").val(emailID);
 *//***********************************************husen added table *******************************************/
/*
 $("#txtTblcontactcode").val(ContactID);
 $("#txtTblcontactperson").val(contactPerson);
 $("#txtTblcontactmobile").val(mobNo);
 $("#txtTblemail").val(emailID);
 }
 }
 });
 } else if (tableName == 'inv_party_master_address_info') {
 var inputs = [];
 inputs.push('action=fetchShowDetail');
 inputs.push('id=' + id);
 inputs.push('tableName=' + tableName);
 var str = inputs.join('&');
 jQuery
 .ajax({
 async : true,
 type : "POST",
 data : str + "&reqType=AJAX",
 url : "InventoryServlet",
 timeout : 1000 * 60 * 5,
 catche : false,
 error : function() {
 alert("error");
 },
 success : function(r) {

 objAddress = JSON.parse(r);
 for ( var i = 0; i < objAddress.ltinventorypartymasteraddressinfodto.length; i++) {

 var addInfoID=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_id;
 var CompanyName=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_designation;
 var addAddress=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_address;
 var addCity=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_city;
 var addPin=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_pin;
 var addState=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_state;
 var addCountry=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_country;
 $("#txtaddressinfocode").val(addInfoID);
 $("#txtaddressdesignation").val(CompanyName);
 $("#txtadraddress").val(addAddress);
 $("#txtaddrcity").val(addCity);
 $("#txtaddrpin").val(addPin);
 $("#txtaddrstate").val(addState);
 $("#txtaddrcountry").val(addCountry);
 $("#txtstreet").val(objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_street);
 $("#txtarea").val(objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_area);								
 *//***********************************************husen added info table *******************************************/
/*
 var radiobtn="";
 if (objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_type == "BillingAddress") 
 {
 radiobtn=$("#iBillingAddress").prop('checked', true);
 }
 if (objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_type == "ShippingAddress") 
 {
 radiobtn=$("#iShippingAddress").prop('checked', true);
 }
 $("#iSpanValue").val(radiobtn);
 $("#txtTbladdressinfocode").val(addInfoID);
 $("#txtTbladdressdesignation").val(CompanyName);
 $("#txtTbladdrstate").val(addState);
 $("#txtTbladdrcity").val(addCity);
 $("#txtTbladdrcountry").val(addCountry);
 $("#txtTbladraddress").val(addAddress);
 $("#txtTbladdrpin").val(addPin);		

 }

 }
 });
 } else if (tableName == 'inv_party_master_payment_info') {

 var inputs = [];
 inputs.push('action=fetchShowDetail');
 inputs.push('id=' + id);
 inputs.push('tableName=' + tableName);
 var str = inputs.join('&');
 jQuery
 .ajax({
 async : true,
 type : "POST",
 data : str + "&reqType=AJAX",
 url : "InventoryServlet",
 timeout : 1000 * 60 * 5,
 catche : false,
 error : function() {
 alert("error");
 },
 success : function(r) {
 objPayment = JSON.parse(r);
 for ( var i = 0; i < objPayment.ltinventorypartymasterpaymentinfo.length; i++) {

 var paymentId=objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_id;
 var bankName=objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_bank_name;
 var acctName=objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_account_name;
 var payAddrs=objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_address;
 $("#txtpaymentid").val(paymentId);
 $("#txtpaymentterm").val(objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_tem);
 $("#txtcreditterm").val(objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_credit_term);
 $("#txtbankname").val(bankName);
 $("#txtaccountname").val(acctName);
 $("#txtaccountnumber").val(objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_account_number);
 $("#txtifsc").val(objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_ifsc);
 $("#txtpaymentaddress").val(payAddrs);
 *//********************************husen added info table **********************************/
/*
 $("#txtTblpaymentid").val(paymentId);
 $("#txtTblbankname").val(bankName);
 $("#txtTblaccountname").val(acctName);
 $("#txtTblpaymentaddress").val(payAddrs);

 }

 }
 });
 } else if (tableName == 'inv_party_master_other_info') {
 var inputs = [];
 inputs.push('action=fetchShowDetail');
 inputs.push('tableName=' + tableName);
 inputs.push('id=' + id);
 var str = inputs.join('&');
 jQuery
 .ajax({
 async : true,
 type : "POST",
 data : str + "&reqType=AJAX",
 url : "InventoryServlet",
 timeout : 1000 * 60 * 5,
 catche : false,
 error : function() {
 alert("error");
 },
 success : function(r) {

 objOther = JSON.parse(r);
 for ( var i = 0; i < objOther.ltinventorypartymasterotherinfodto.length; i++) {
 $("#txtotherid")
 .val(
 objOther.ltinventorypartymasterotherinfodto[i].party_master_other_info_id);
 $("#txttopic")
 .val(
 objOther.ltinventorypartymasterotherinfodto[i].party_master_other_info_topic);
 $("#txtfile")
 .val(
 objOther.ltinventorypartymasterotherinfodto[i].party_master_other_info_file);
 $("#txtdescription")
 .val(
 objOther.ltinventorypartymasterotherinfodto[i].party_master_other_info_description);

 }
 }
 });
 }
 }

 }

 *//*******************************************SHow fiunction for purchase Order************************************************/
/* 
 function showInfoPO(id, tableName) {
 if (id != "-1") {
 if (tableName == 'inv_party_master_contact_info') {
 var inputs = [];
 inputs.push('action=fetchShowDetail');
 inputs.push('id=' + id);
 inputs.push('tableName=' + tableName);
 var str = inputs.join('&');
 jQuery
 .ajax({
 async : true,
 type : "POST",
 data : str + "&reqType=AJAX",
 url : "InventoryServlet",
 timeout : 1000 * 60 * 5,
 catche : false,
 error : function() {
 alert("error");
 },
 success : function(r) {
 objContact = JSON.parse(r);
 for ( var i = 0; i < objContact.ltinventorypartymastrecontactinfodto.length; i++) {
 var ContactID=objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_id;
 $("#txtcontactcode").val(ContactID);
 var contactPerson=objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_name;
 $("#txtcontactperson").val(contactPerson);
 $("#txtdesignation").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_designation);
 $("#txtcontaddress").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_address);
 $("#txtgender").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_gender);
 $("#txtdate").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_dob);
 $("#txtphone1").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_phone_number1);
 $("#txtphone2").val(objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_phone_number2);
 var mobNo=objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_mobile;
 $("#txtcontactmobile").val(mobNo);
 var emailID=objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_email;
 $("#txtemail").val(emailID);
 *//***********************************************husen added table *******************************************/
/*
 $("#txtTblcontactcode").val(ContactID);
 $("#txtTblcontactperson").val(contactPerson);
 $("#txtTblcontactmobile").val(mobNo);
 $("#txtTblemail").val(emailID);
 }
 }
 });
 } else if (tableName == 'inv_party_master_address_info') {
 var inputs = [];
 inputs.push('action=fetchShowDetail');
 inputs.push('id=' + id);
 inputs.push('tableName=' + tableName);
 var str = inputs.join('&');
 jQuery
 .ajax({
 async : true,
 type : "POST",
 data : str + "&reqType=AJAX",
 url : "InventoryServlet",
 timeout : 1000 * 60 * 5,
 catche : false,
 error : function() {
 alert("error");
 },
 success : function(r) {

 objAddress = JSON.parse(r);
 for ( var i = 0; i < objAddress.ltinventorypartymasteraddressinfodto.length; i++) {

 var addInfoID=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_id;
 var CompanyName=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_designation;
 var addAddress=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_address;
 var addCity=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_city;
 var addPin=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_pin;
 var addState=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_state;
 var addCountry=objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_country;
 $("#txtaddressinfocode").val(addInfoID);
 $("#txtaddressdesignation").val(CompanyName);
 $("#txtadraddress").val(addAddress);
 $("#txtaddrcity").val(addCity);
 $("#txtaddrpin").val(addPin);
 $("#txtaddrstate").val(addState);
 $("#txtaddrcountry").val(addCountry);
 $("#txtstreet").val(objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_street);
 $("#txtarea").val(objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_area);								
 *//***********************************************husen added info table *******************************************/
/*
 var radiobtn="";
 if (objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_type == "BillingAddress") 
 {
 radiobtn=$("#iBillingAddress").prop('checked', true);
 }
 if (objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_type == "ShippingAddress") 
 {
 radiobtn=$("#iShippingAddress").prop('checked', true);
 }
 $("#iSpanValue").val(radiobtn);
 $("#txtTbladdressinfocode").val(addInfoID);
 $("#txtTbladdressdesignation").val(CompanyName);
 $("#txtTbladdrstate").val(addState);
 $("#txtTbladdrcity").val(addCity);
 $("#txtTbladdrcountry").val(addCountry);
 $("#txtTbladraddress").val(addAddress);
 $("#txtTbladdrpin").val(addPin);		

 }

 }
 });
 } else if (tableName == 'inv_party_master_payment_info') {

 var inputs = [];
 inputs.push('action=fetchShowDetail');
 inputs.push('id=' + id);
 inputs.push('tableName=' + tableName);
 var str = inputs.join('&');
 jQuery
 .ajax({
 async : true,
 type : "POST",
 data : str + "&reqType=AJAX",
 url : "InventoryServlet",
 timeout : 1000 * 60 * 5,
 catche : false,
 error : function() {
 alert("error");
 },
 success : function(r) {
 objPayment = JSON.parse(r);
 for ( var i = 0; i < objPayment.ltinventorypartymasterpaymentinfo.length; i++) {

 var paymentId=objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_id;
 var bankName=objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_bank_name;
 var acctName=objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_account_name;
 var payAddrs=objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_address;
 $("#txtpaymentid").val(paymentId);
 $("#txtpaymentterm").val(objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_tem);
 $("#txtcreditterm").val(objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_credit_term);
 $("#txtbankname").val(bankName);
 $("#txtaccountname").val(acctName);
 $("#txtaccountnumber").val(objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_account_number);
 $("#txtifsc").val(objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_ifsc);
 $("#txtpaymentaddress").val(payAddrs);
 *//********************************husen added info table **********************************/
/*
 $("#txtTblpaymentid").val(paymentId);
 $("#txtTblaccountname").val(acctName);
 $("#txtTblpaymentaddress").val(payAddrs);

 }

 }
 });
 } else if (tableName == 'inv_party_master_other_info') {
 var inputs = [];
 inputs.push('action=fetchShowDetail');
 inputs.push('tableName=' + tableName);
 inputs.push('id=' + id);
 var str = inputs.join('&');
 jQuery
 .ajax({
 async : true,
 type : "POST",
 data : str + "&reqType=AJAX",
 url : "InventoryServlet",
 timeout : 1000 * 60 * 5,
 catche : false,
 error : function() {
 alert("error");
 },
 success : function(r) {

 objOther = JSON.parse(r);
 for ( var i = 0; i < objOther.ltinventorypartymasterotherinfodto.length; i++) {
 $("#txtotherid")
 .val(
 objOther.ltinventorypartymasterotherinfodto[i].party_master_other_info_id);
 $("#txttopic")
 .val(
 objOther.ltinventorypartymasterotherinfodto[i].party_master_other_info_topic);
 $("#txtfile")
 .val(
 objOther.ltinventorypartymasterotherinfodto[i].party_master_other_info_file);
 $("#txtdescription")
 .val(
 objOther.ltinventorypartymasterotherinfodto[i].party_master_other_info_description);

 }
 }
 });
 }
 }

 }*/

/********************************************New Save Purchase Quatation Author:sudhir Modified date:15:12:2015 ****************************************/

function savePurchaseQuotation() {

	var txtPurchaseFormName = $("#txtPurchaseFormName").val();

	var rowCount = $("#RowCount").val();
	var totaltblsize =$("#totaltblsize").val();

	var txtPurchaseQuotationDocNo = $("#txtPurchaseQuotationDocNo").val();
	var txtPurchaseQuotationDate1 = $("#txtPurchaseQuotationDate1").val();
	var txtPurchaseQuotationMobileNo = $("#txtPurchaseQuotationMobileNo").val();
	var txtPurchaseQuotationSupplierCode = $('#txtVendorCode').val();
	var txtPurchaseQuotationSupplierName = $("#txtPurchaseQuotationSupplierName").val();
	var selDocName = $("#selDocName option:selected").text();
	var txtPurchaseQuotationDocSeries = $("#txtPurchaseQuotationDocSeries").val();
	
	var finaltxtPurchaseQuotationDocSeries =txtPurchaseQuotationDocSeries +"No"+":"+txtPurchaseQuotationDocNo;
	
	var txtDocSeries = finaltxtPurchaseQuotationDocSeries;
	var txtPurchaseQuotationRequestNo = $("#txtPurchaseQuotationRequestNo").val();
	var txtPurchaseQuotationReferenceNo = $("#txtPurchaseQuotationReferenceNo").val();
	var txtPurchaseQuotationAddress = $("#txtPurchaseQuotationAddress").val();
	var sclPurchaseQuotationDocstatus = $("#sclPurchaseQuotationDocstatus").val();
	var txtPurchaseQuotationAmountinlocalcurrency = $("#txtPurchaseQuotationAmountinlocalcurrency").val();
	var txtPurchaseQuotationTotalDocDiscount = $("#txtPurchaseQuotationTotalDocDiscount").val();
	var txtPurchaseQuotationTotalDocQty = $("#txtPurchaseQuotationTotalDocQty").val();
	var txtPurchaseQuotationExpiryDate1 = $("#txtPurchaseQuotationExpiryDate1").val();
	var txtPurchaseQuotationDeliveryDate1 = $("#txtPurchaseQuotationDeliveryDate1").val();
	
	//var txtPurchaseQuotationNotes2 = $("#txtPurchaseQuotationNotes2").val();
	

	// save All Charges for purchase Quotation @Date:10june2016 @Author Sudhir jadhav
	var txtSplDisc = $("#txtSplDiscPQ").val();
	var txtdebitAmt1 = $("#txtdebitAmt1PQ").val();
	var txtCD1 = $("#txtCD1PQ").val();
	var txtCDAmt = $("#txtCDAmtPQ").val();
	
	var txtOctroi = $("#txtOctroiPQ").val();
	var txtSurcharge = $("#txtSurchargePQ").val();
	var txtCreditAmt = $("#txtCreditAmtPQ").val();
	var txtFreight = $("#txtFreightPQ").val();
	
	var txtVat = $("#txtVatPQ").val();	
	var txtlbt = $("#txtlbtPQ").val();
	var txtcst = $("#txtcstPQ").val();
	var txtExVat = $("#txtExVatPQ").val();
	var txtTotalVat = $("#txtTotalVatPQ").val();
	
	var txtGross = $("#txtGrossPQ").val();
	var txtLess = $("#txtLessPQ").val();
	var txtAdd = $("#txtAddPQ").val();
	var textVat = $("#textVatPQ").val();
	var txtNetAmt = $("#txtNetAmtPQ").val();
	
	
	var txtPurchasTermsAndConditions = encodeURIComponent($.trim($("#txtPurchaseQuotationNotes2").val()));
	
	/****validation of savePurchaseQuotation @author:paras suryawanshi @Date:6OCT2016 *********/
	
	
	
	
	
	if(txtSplDisc == "" || txtSplDisc == null || txtSplDisc == NaN)
	{
		var min = parseInt(minLen);
		var max = parseInt(maxLen);
		   		
		var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
		var value1 = ""; 
		    value1 = $("#txtSplDiscPQ").val(); 
			
			if (min > value1.length || max < value1.length) {
			
				$("#txtSplDiscPQ").val('0');
				$("#txtSplDiscPQ").focus();
				return false;
			} else if (value1 != "" && !name1.test(value1)) {
			
				alert("Please enter valid item special Discount !");
				$("#txtSplDiscPQ").val('0');
				$("#txtSplDiscPQ").focus();
				return false;
			}else if(value1 == "" || value1 == null)
		      {
				
				alert("Please Enter Valid Special Discount ");
		     	$("#txtSplDiscPQ").focus();
		     	return false;
		      }

	
	}
	 if(txtdebitAmt1 == "" || txtdebitAmt1 == null || txtdebitAmt1 == NaN)
		{
			
			var min = parseInt(minLen);
		    var max = parseInt(maxLen);
			var name2 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value2 = ""; 
				value2 = $("#txtdebitAmt1PQ").val(); 
				
				if (min > value2.length || max < value2.length) {
				
					$("#txtdebitAmt1PQ").val('0');
					$("#txtdebitAmt1PQ").focus();
					return false;
				} else if (value2 != "" && !name2.test(value2)) {
					
					alert("Please enter valid item Debit Amount !");
					$("#txtdebitAmt1PQ").val('0');
					$("#txtdebitAmt1PQ").focus();
					return false;
				}
			
				else if(value2 == "" || value2 == null)
			      {
					
					alert("Please Enter Valid Debit Amount ");
			     	$("#txtdebitAmt1PQ").focus();
			    	return false;
			      }
			

		}
	
	
		if(txtCD1  == "" ||  txtCD1 == null ||  txtCD1  == NaN)
		{
			  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
				
				var name3 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value3 = ""; 
					value3 = $("#txtCD1PQ").val(); 
				
				if (min > value3.length || max < value3.length) {
			
					$("#txtCD1PQ").val('0');
					$("#txtCD1PQ").focus();
					return false;
				} else if (value3 != "" && !name3.test(value3)) {
				
					alert("Please enter valid item CD !");
					$("#txtCD1PQ").val('0');
					$("#txtCD1PQ").focus();
					return false;
				}
			
				else if(value3 == "" || value3 == null)
			      {
					
					alert("Please Enter Valid CD  ");
			     	$("#txtCD1PQ").focus();
			    	return false;
					
			      }
			}
	
		if( txtCDAmt  == "" ||  txtCDAmt == null ||  txtCDAmt  == NaN)
		{
			
			

			  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
			
				var name4 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value4 = ""; 
					value4 = $("#txtCDAmtPQ").val(); 
				
				if (min > value4.length || max < value4.length) {
				
					$("#txtCDAmtPQ").val('0');
					$("#txtCDAmtPQ").focus();
					return false;
				} else if (value4 != "" && !name4.test(value4)) {
				
					alert("Please enter valid item CD Amount !");
					$("#txtCDAmtPQ").val('0');
					$("#txtCDAmtPQ").focus();
					return false;
				}
			   else if(value4 == "" || value4 == null)
			      {
					
					alert("Please Enter Valid CD Amount ");
			     	$("#txtCDAmtPQ").focus();
			    	
			    	return false;
					
			      }
			}
	
	     
		if( txtOctroi  == "" ||  txtOctroi == null ||  txtOctroi == NaN)
		{
		      var min = parseInt(minLen);
			  var max = parseInt(maxLen);
		
				var name5 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value5 = ""; 
					value5 = $("#txtOctroiPQ").val(); 
				
				if (min > value5.length || max < value5.length) {
			
					$("#txtOctroiPQ").val('0');
					$("#txtOctroiPQ").focus();
					return false;
				} else if (value5 != "" && !name5.test(value5)) {
					
					alert("Please enter valid item Octroi !");
					$("#txtOctroiPQ").val('0');
					$("#txtOctroiPQ").focus();
					return false;
				}
			   else if(value5 == "" || value5 == null)
			      {
					
					alert("Please Enter Valid Octroi ");
					$("#txtOctroiPQ").focus();
					return false;
			      }
				
		}
		
		  
		if(txtSurcharge  == "" || txtSurcharge == null ||  txtSurcharge == NaN)
		{
	 		  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			  var name6 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			  var value6 = ""; 
				  value6 = $("#txtSurchargePQ").val();
				
				if (min > value6.length || max < value6.length) {
			
					$("#txtSurchargePQ").val('0');
					$("#txtSurchargePQ").focus();
					return false;
				} else if (value6 != "" && !name6.test(value6)) {
				
					alert("Please enter valid Surcharge !");
					$("#txtSurchargePQ").val('0');
					$("#txtSurchargePQ").focus();
					return false;
				}
			   else if(value6 == "" || value6 == null)
			      {
					
					alert("Please Enter Valid Surcharge ");
					$("#txtSurchargePQ").focus();

					return false;
					
			      }
			
		}

		
		
		if(txtCreditAmt  == "" || txtCreditAmt == null ||  txtCreditAmt == NaN)
		{

			var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
				var name7 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value7 = ""; 
					value7 = $("#txtCreditAmtPQ").val(); 
				
				if (min > value7.length || max < value7.length) {
				
					$("#txtCreditAmtPQ").val('0');
					$("#txtCreditAmtPQ").focus();
					return false;
				} else if (value7 != "" && !name7.test(value7)) {
					
					alert("Please enter valid Credit amount !");
					$("#txtCreditAmtPQ").val('0');
					$("#txtCreditAmtPQ").focus();
					return false;
				}
			   else if(value7 == "" || value7 == null)
			      {
	           		alert("Please Enter Valid Credit Amount ");
					
					$("#txtCreditAmtPQ").focus();
					return false;
					
			      }
		}
		
		if( txtFreight == "" || txtFreight == null || txtFreight == NaN)
		{
			var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
			
				var name8 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value8 = ""; 
					value8 = $("#txtFreightPQ").val();
				
				if (min > value8.length || max < value8.length) {
			
					$("#txtFreightPQ").val('0');
					$("#txtFreightPQ").focus();
					return false;
				} else if (value8 != "" && !name8.test(value8)) {
					
					alert("Please enter valid Freight !");
					$("#txtFreightPQ").val('0');
					$("#txtFreightPQ").focus();
					return false;
				}
			   else if(value8 == "" || value8 == null)
			      {
					  alert("Please Enter Valid Freight ");  
					   $("#txtFreightPQ").focus();
					   return false;
					
			      }	
		}
		
		if(txtVat == "" || txtVat == null ||  txtVat == NaN)
		{
			var min = parseInt(minLen);
			var max = parseInt(maxLen);
			var name9 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value9 = ""; 
				value9 = $("#txtVatPQ").val(); 
				
				if (min > value9.length || max < value9.length) {
				
					$("#txtVatPQ").val('0');
					$("#txtVatPQ").focus();
					return false;
				} else if (value9 != "" && !name9.test(value9)) {
					
					alert("Please enter valid Vat !");
					$("#txtVatPQ").val('0');
					$("#txtVatPQ").focus();
					return false;
				}
			   else if(value9 == "" || value9 == null)
			      {
					
					alert("Please Enter Valid Vat ");
					$("#txtVatPQ").focus();
					return false;
			      }
		 }
		
		
		if(txtlbt == "" ||  txtlbt == null ||   txtlbt == NaN)
		{
			  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
				
				var name10 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value10 = ""; 
					value10 = $("#txtlbtPQ").val();
				
				if (min > value10.length || max < value10.length) {
		
					$("#txtlbtPQ").val('0');
					$("#txtlbtPQ").focus();
					return false;
				} else if (value10 != "" && !name10.test(value10)) {
		
					alert("Please enter valid Lbt !");
					$("#txtlbtPQ").val('0');
					$("#txtlbtPQ").focus();
					return false;
				}
			   else if(value10 == "" || value10 == null)
			      {
					
					alert("Please Enter Valid LBT ");
				    $("#txtlbtPQ").focus();

					return false;
					
			      }	
		}
		
		  if(txtcst == "" ||  txtcst == null ||   txtcst == NaN)
			{
				var min = parseInt(minLen);
				var max = parseInt(maxLen);
				var name11 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value11 = ""; 
					value11 = $("#txtcstPQ").val(); 
					
					if (min > value11.length || max < value11.length) {
				
						$("#txtcstPQ").val('0');
						$("#txtcstPQ").focus();
						return false;
					} else if (value11 != "" && !name11.test(value11)) {
					
						alert("Please enter valid Cst !");
						$("#txtcstPQ").val('0');
						$("#txtcstPQ").focus();
						return false;
					}
				   else if(value11 == "" || value11 == null)
				      {
						alert("Please Enter Valid CST ");
						
						$("#txtcstPQ").focus();
						return false;
						
				      }
					
			}
		  if(txtExVat == "" ||  txtExVat == null ||   txtExVat == NaN)
			{
				var min = parseInt(minLen);
				var max = parseInt(maxLen);
				var name12 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value12 = ""; 
					value12 = $("#txtExVatPQ").val(); 
					
					if (min > value12.length || max < value12.length) {
				
						$("#txtExVatPQ").val('0');
						$("#txtExVatPQ").focus();
						return false;
					} else if (value12 != "" && !name12.test(value12)) {
					
						alert("Please enter valid Ex Vat!");
						$("#txtExVatPQ").val('0');
						$("#txtExVatPQ").focus();
						return false;
					}
				   else if(value12 == "" || value12 == null)
				      {
					    alert("Please Enter Valid Ex Vat ");
						
						$("#txtExVatPQ").focus();
						return false;
						
				      }
			}

		
		
		  
		  
		  if(txtTotalVat == "" ||  txtTotalVat == null ||   txtTotalVat == NaN)
			{
				var min = parseInt(minLen);
				var max = parseInt(maxLen);
				var name13 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value13 = ""; 
					value13 = $("#txtTotalVatPQ").val(); 
					
					if (min > value13.length || max < value13.length) {
				
						$("#txtTotalVatPQ").val('0');
						$("#txtTotalVatPQ").focus();
						return false;
					} else if (value13 != "" && !name13.test(value13)) {
					
						alert("Please enter valid Total Tax !");
						$("#txtTotalVatPQ").val('0');
						$("#txtTotalVatPQ").focus();
						return false;
					}
				   else if(value13 == "" || value13 == null)
				      {
						
						alert("Please Enter Valid Total Tax ");
						  $("#txtTotalVatPQ").focus();
							 return false;
				      }
			}
	
		  
			if(txtGross == "" ||  txtGross == null ||   txtGross == NaN)
			{
				var min = parseInt(minLen);
				var max = parseInt(maxLen);
				var name14 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value14 = ""; 
					value14 = $("#txtGrossPQ").val(); 
					
					if (min > value14.length || max < value14.length) {
					
						$("#txtGrossPQ").val('0');
						$("#txtGrossPQ").focus();
						return false;
					} else if (value14 != "" && !name14.test(value14)) {
					
						alert("Please enter valid Gross Amount !");
						$("#txtGrossPQ").val('0');
						$("#txtGrossPQ").focus();
						return false;
					}
				   else if(value14 == "" || value14 == null)
				      {
						
						alert("Please Enter Valid Gross Amount ");
						
						$("#txtGrossPQ").focus();
						return false;
				      }
				}
			
			
			
			

			if(txtLess == "" ||   txtLess == null ||   txtLess == NaN)
			{
				var min = parseInt(minLen);
				var max = parseInt(maxLen);
				var name15 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value15 = ""; 
					value15 = $("#txtLessPQ").val(); 
					
					if (min > value15.length || max < value15.length) {
				
						$("#txtLessPQ").val('0');
						$("#txtLessPQ").focus();
						return false;
					} else if (value15 != "" && !name15.test(value15)) {
					
						alert("Please enter Valid Less !");
						$("#txtLessPQ").val('0');
						$("#txtLessPQ").focus();
						return false;
					}
				   else if(value15 == "" || value15 == null)
				      {
						
						alert("Please Enter Valid Less ");
						
						$("#txtLessPQ").focus();
						
						return false;
				      }

			
			}
			

			if(txtAdd == "" ||  txtAdd  == null ||   txtAdd == NaN)
			{
				var min = parseInt(minLen);
				var max = parseInt(maxLen);
				var name16 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value16 = ""; 
					value16 = $("#txtAddPQ").val();
					
					if (min > value16.length || max < value16.length) {
					
						$("#txtAddPQ").val('0');
						$("#txtAddPQ").focus();
						return false;
					} else if (value16 != "" && !name16.test(value16)) {
					
						alert("Please enter valid ADD !");
						$("#txtAddPQ").val('0');
						$("#txtAddPQ").focus();
						return false;
					}
				   else if(value16 == "" || value16 == null)
				      {
						
						alert("Please Enter Valid ADD ");
						
						$("#txtAddPQ").focus();
						return false;
						
				      }
			}
			
			if(txtNetAmt == "" ||  txtNetAmt == null ||   txtNetAmt == NaN)
			{
				var min = parseInt(minLen);
				var max = parseInt(maxLen);
				var name17 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value17 = ""; 
					value17 = $("#txtNetAmtPQ").val(); //$('#' + id).val();
					
					if (min > value17.length || max < value17.length) {
					
						$("#txtNetAmtPQ").val('0');
						$("#txtNetAmtPQ").focus();
						return false;
					} else if (value17 != "" && !name17.test(value17)) {
					
						alert("Please enter valid Net Amount !");
						$("#txtNetAmtPQ").val('0');
						$("#txtNetAmtPQ").focus();
						return false;
					}
				   else if(value17 == "" || value17 == null)
				      {
						
						alert("Please Enter Valid Net Amount ");
						
						$("#txtNetAmtPQ").focus();
						return false;
						
				      }
				
			}
			
			
			
			
			
			if(textVat == "" ||  textVat == null ||   textVat == NaN)
				{
					var min = parseInt(minLen);
					var max = parseInt(maxLen);
					var name18 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
					var value18 = ""; 
					    value18 = $("#textVatPQ").val(); 
						
						if (min > value18.length || max < value18.length) {
						
							$("#textVatPQ").val('0');
							$("#textVatPQ").focus();
							return false;
						} else if (value18 != "" && !name18.test(value18)) {
							
							alert("Please enter valid Tax !");
							$("#textVatPQ").val('0');
							$("#textVatPQ").focus();
							return false;
						}
					   else if(value18 == "" || value18 == null)
					      {
							alert("Please Enter Valid Tax ");
							
							$("#textVatPQ").focus();
							return false;
					      }
					
				}
		  
		  
		  
	/****End validation of savePurchaseQuotation @author:paras suryawanshi @Date:6OCT2016 *********/
	
	
	
	
	
	/** save all special Charges with his amount 11jully2016 **/
	var selboxChargeswithAmtList = "";
	$('#selboxChargeswithAmtListPQ').find('option').each(function() {
		selboxChargeswithAmtList = selboxChargeswithAmtList + ($(this).val() + ",");
	});
	selboxChargeswithAmtList = selboxChargeswithAmtList.substring(0, selboxChargeswithAmtList.length-1);
	if (selboxChargeswithAmtList == "-Select-" || selboxChargeswithAmtList == null || selboxChargeswithAmtList == '' || selboxChargeswithAmtList == "Select" || selboxChargeswithAmtList == "0") {
		selboxChargeswithAmtList = "No";
	} 
	var sumofCharges = $("#sumofChargesPQ").val();
	
	
	
	var materiallist = {
		ltinvetorypurchasecommonitemmaster : []
	};
	//validation
	if(txtPurchaseQuotationDate1 == "" || txtPurchaseQuotationDate1 == null)
	{
	alert("Please select purchase quatation  date ");
	$("#txtPurchaseQuotationDate1").focus();
	return false;
	}
	
	if(txtPurchaseQuotationDate1)
	{
/*		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    
	    var today1 = dd+'/'+mm+'/'+yyyy;*/
		var today = new Date();
		 
		var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!
	    var yyyy = today.getFullYear();
	    
	    if(dd<10){
	        dd='0'+dd;
	    } 
	    if(mm<10){
	        mm='0'+mm;
	    } 
	    
	    var today1 = dd+'/'+mm+'/'+yyyy;
	    
	    if(txtPurchaseQuotationDate1 === today1)
		   {
		   		    
		   }
	    else
	    {
	    	alert("Please Enter Current Date ");
		    $("#txtPurchaseQuotationDate1").focus();
		   return false;
	    }
	    
	  /* if(new Date(txtPurchaseQuotationDate1).getTime() < new Date(today1).getTime())
		   {
		   alert("please Enter current Date ");
		   $("#txtPurchaseOrderDatePRL").focus();
		   return false;
		   }
	   
	   if(new Date(txtPurchaseQuotationDate1).getTime() > new Date(today1).getTime())
	   {
		   alert("Enter Date is future Date ");
		   $("#txtPurchaseOrderDatePRL").focus();
		   return false;
	   }*/
		
 
	}
	
	
	if(txtPurchaseQuotationSupplierName == "" || txtPurchaseQuotationSupplierName == null)
	{
		alert("Please enter supplier name");
		$("#txtPurchaseQuotationSupplierName").focus();
		return false;
	}
	if(txtPurchaseQuotationMobileNo == "" || txtPurchaseQuotationMobileNo == null)	
	{
	alert("Please enter mobile number");
	$("#txtPurchaseQuotationMobileNo").focus();
	return false;
	}
	
	if(txtPurchaseQuotationMobileNo.length < 10 || txtPurchaseQuotationMobileNo.length > 10)
	{
	alert("Mobile number should be of 10 digits");
	$("#txtPurchaseOrderMobileNo").focus();
	return false;
	}
	
	 var docseries= $("#txtPurchaseQuotationDocSeries").val();
     if(docseries == 0 || docseries == '-Select-')
     {
	    alert('please select doc series');
		$("#selDocName").focus();
		return false;
     }
	/* var curency = document.getElementById("selDocName");
     var docseries = curency.options[curency.selectedIndex].text;
     if(docseries == 0 || docseries == '-Select-')
     {
	    alert('please select doc series');
		$("#txtPurchaseQuotationDocSeries").focus();
		return false;
     }*/
     
    if(txtPurchaseQuotationReferenceNo == "" || txtPurchaseQuotationReferenceNo == null)
 	{
 	alert("Please enter reference number");
 	$("#txtPurchaseQuotationReferenceNo").focus();
 	return false;
 	}
     
     if(txtPurchaseQuotationAddress == "" || txtPurchaseQuotationAddress == null)
 	{
 	alert("Please enter address");
 	$("#txtPurchaseQuotationAddress").focus();
 	return false;
 	}
     
     var status = document.getElementById("sclPurchaseQuotationDocstatus");
     var docstatus = status.options[status.selectedIndex].text;
     if(docstatus == 0 ||  docstatus == 'Select')
     {
	    alert('please select doc status');
		$("#sclPurchaseQuotationDocstatus").focus();
		return false;
     }
	
	// alert("ROW" +rowCount);
	for ( var i = 1; i <= totaltblsize; i++) {
		for ( var i = 1; i <= totaltblsize-1; i++)
		{
		
		if ($("#txtPurchaseQuotationItemNumber" + i).val() != null
				&& $("#txtPurchaseQuotationItemNumber" + i).val() != undefined ) {
			
				var txtPurchaseQuotationItemName = $(
					"#txtPurchaseQuotationItemNumber" + i).val();
				
			var txtPurchaseQuotationItemName_ = $(
					"#txtPurchaseQuotationItemName_" + i).val();

			var txtInvpurchaseCommonItemMasterId = $(
					"#txtInvpurchaseCommonItemMasterId" + i).val();

			var txtPurchaseQuotationDocQuantity = $(
					"#txtPurchaseQuotationDocQuantity" + i).val();

			var txtPurchaseQuotationUnitPrice = $(
					"#txtPurchaseQuotationUnitPrice" + i).val();
			var txtPurchaseQuotationTrdeDiscountPercentage = $(
					"#txtPurchaseQuotationTrdeDiscountPercentage" + i).val();
			
			var txtPurchaseQuotationTrdeDiscountInRupess = $(
					"#txtPurchaseQuotationTrdeDiscountInRupess" + i).val();
			
			var txtPurchaseQuotationTrdeDiscountAmt = $(
					"#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
			var txtPurchaseQuotationBaseAmount = $(
					"#txtPurchaseQuotationBaseAmount" + i).val();
			
			
		/*	var txtPurchaseQuotationTaxCode_ = $(
					"#txtPurchaseQuotationTaxCode_" + i).val();*/
			
			var txtPurchaseQuotationTaxCode_ = "";
			$('#txtPurchaseQuotationTaxCode_'+ i).find('option').each(function() {
				txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
			});
			txtPurchaseQuotationTaxCode_= txtPurchaseQuotationTaxCode_.substring(0, txtPurchaseQuotationTaxCode_.length-1);
			var txtPurchaseQuotationTaxAmount = $(
					"#txtPurchaseQuotationTaxAmount" + i).val();
			var txtPurchaseQuotationTaxAmtinRupess = $("#txtPurchaseQuotationTaxAmtinRs"  + i).val();  //add tax amount in Rs purchase quatation @author:paras @Date:23Nov
		
			var txtPurchaseQuotationRowAmount = $(
					"#txtPurchaseQuotationRowAmount" + i).val();
			var txtPurchaseQuotationFactor1 = $(
					"#txtPurchaseQuotationFactor1" + i).val();
			var txtPurchaseQuotationFactor2 = $(
					"#txtPurchaseQuotationFactor2" + i).val();
			var txtPurchaseQuotationFactor3 = $(
					"#txtPurchaseQuotationFactor3" + i).val();
			var txtPurchaseQuotationFactor4 = $(
					"#txtPurchaseQuotationFactor4" + i).val();
			var txtPurchaseQuotationActualQuantity = $(
					"#txtPurchaseQuotationActualQuantity" + i).val();
			var txtPurchaseQuotationPendingQuantity = $(
					"#txtPurchaseQuotationPendingQuantity" + i).val();
			var txtPurchaseQuotationBatchNo = $(
					"#txtPurchaseQuotationBatchNo" + i).val();
			/*var txtPurchaseQuotationBatchNo = $(
					"#txtPurchaseQuotationBatchNo" + i).val();*/

			
			var txtPurchaseQuotationFactor1UOM = $("#txtPurchaseQuotationFactor1UOM" + i).text();
			var txtPurchaseQuotationFactor2UOM = $("#txtPurchaseQuotationFactor2UOM" + i).text();
			var txtPurchaseQuotationFactor3UOM = $("#txtPurchaseQuotationFactor3UOM" + i).text();
			var txtPurchaseQuotationFactor4UOM = $("#txtPurchaseQuotationFactor4UOM" + i).text();
			var txtPurchaseQuotationLastFactorUOM = $("#txtPurchaseQuotationLastFactorUOM" + i).text();
			

			//validatoin
		    if(txtPurchaseQuotationItemName_ == "" || txtPurchaseQuotationItemName_ == null){
				
				alert("Please enter item name in "+i+" Row");
				$("#txtPurchaseQuotationItemName_" + i).focus();
				return false;
				
			}		   
		    if(txtPurchaseQuotationDocQuantity == "" || txtPurchaseQuotationDocQuantity == null){
				
				alert("Please enter item quantity in "+i+" Row");
				$("#txtPurchaseQuotationDocQuantity" + i).focus();
				return false;
				
			}var txtPurchaseQuotationDeliveryDate1 = $("#txtPurchaseQuotationDeliveryDate1").val();
		   if(txtPurchaseQuotationUnitPrice == "" || txtPurchaseQuotationUnitPrice == null){
				
				alert("Please enter item unit price in "+i+" Row");
				$("#txtPurchaseQuotationUnitPrice" + i).focus();
				return false;
				
			}
		   
		   var pattern = /^[0-9]+\.?[0-9]*$/;
			if (!pattern.test(txtPurchaseQuotationUnitPrice)) {
				alert("Purchase info:Unit price should be of digits and a decimal point Only!");
				$("#txtPurchaseQuotationUnitPrice"+i).focus();
				return false;
			}
		   
		   if(txtPurchaseQuotationTrdeDiscountPercentage == "" || txtPurchaseQuotationTrdeDiscountPercentage == null){
				
				alert("Please enter item trade discount in "+i+" Row");
				$("#txtPurchaseQuotationTrdeDiscountPercentage" + i).focus();
				return false;
				
			}
		   if(txtPurchaseQuotationTrdeDiscountAmt == "" || txtPurchaseQuotationTrdeDiscountAmt == null){
				
				alert("Please enter item trade discount amount in "+i+" Row");
				$("#txtPurchaseQuotationTrdeDiscountAmt" + i).focus();
				return false;
				
			}
		  if(txtPurchaseQuotationBaseAmount == "" || txtPurchaseQuotationBaseAmount == null){
				
				alert("Please enter item base amount in "+i+" Row");
				$("#txtPurchaseQuotationBaseAmount" + i).focus();
				return false;
				
			}     
		  if(txtPurchaseQuotationTaxCode_ == "" || txtPurchaseQuotationTaxCode_ == null){
				
				alert("Please enter item taxcode amount in "+i+" Row");
				$("#txtPurchaseQuotationTaxCode_" + i).focus();
				return false;
				
			}
		  
		  if(txtPurchaseQuotationTaxAmount == "" || txtPurchaseQuotationTaxAmount == null){
				
				alert("Please enter item tax amount in "+i+" Row");
				$("#txtPurchaseQuotationTaxAmount" + i).focus();
				return false;
				
			}
		  
/****************************adding tax amount  @author:paras suryawanshi   @Date:5oct2016   ****************************/		  
		  
		  if (txtPurchaseQuotationTaxAmount == '' || txtPurchaseQuotationTaxAmount == undefined || txtPurchaseQuotationTaxAmount == null || txtPurchaseQuotationTaxAmount == "NaN") {
		     	var min = parseInt(minLen);
		  	var max = parseInt(maxLen);
		  	
		  	var name19 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
		  	var value19 = ""; 
		  	    value19 = $("#txtPurchaseQuotationTaxAmount" + i).val();
		  		
		  		if (min > value19.length || max < value19.length) {
		  		
		  			/*$("#txtPurchaseQuotationTaxAmount").val('0');*/
		  			$("#txtPurchaseQuotationTaxAmount" + i).val('');
		  			$("#txtPurchaseQuotationTaxCode_" + i).focus();
		  			return false;
		  		} else if (value19 != "" && !name19.test(value19)) {
		  			
		  			alert("Please enter valid Tax");
		  			$("#txtPurchaseQuotationTaxAmount" + i).val('');
		  			$("#txtPurchaseQuotationTaxCode_" + i).focus();
		  			return false;
		  		}
		  	   else if(value19 == "" || value19 == null)
		  	      {
		  			alert("Please Enter Valid Tax ");
		  			$("#txtPurchaseQuotationTaxCode_" + i).focus();
		  			return false;
		  	      }
		  }
		  
		  
	/**************************** ending adding tax amount  @author:paras suryawanshi   @Date:5oct2016   ****************************/		  
	  
		  
		  
		  
		  if(txtPurchaseQuotationRowAmount == "" || txtPurchaseQuotationRowAmount == null){
				
				alert("Please enter item row amount in "+i+" Row");
				$("#txtPurchaseQuotationRowAmount" + i).focus();
				return false;
				
			}
		  
			 
		  if((parseFloat(txtPurchaseQuotationFactor1) == NaN || txtPurchaseQuotationFactor1 != "")){

			  		  var min = parseInt(minLen);
					  var max = parseInt(maxLen);
					   
						// alert("number field");
						var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
						var value1 = txtPurchaseQuotationFactor1; //$('#' + id).val();
						
						if (min > value1.length || max < value1.length) {
							alert("Please enter valid item factor1 in "+i+" Row");
							
							$("#txtPurchaseQuotationFactor1" + i).val('');
							$("#txtPurchaseQuotationFactor1" + i).focus();
							return false;
						} else if (value1 != "" && !name1.test(value1)) {
							//alert("Please Enter  txtPurchaseQuotationFactor3  Only number!");
							alert("Please enter valid item factor1 in "+i+" Row");
							$("#txtPurchaseQuotationFactor1" + i).val('');
							$("#txtPurchaseQuotationFactor1" + i).focus();
							return false;
						}
						
					}
		  
		  if((parseFloat(txtPurchaseQuotationFactor2) == NaN || txtPurchaseQuotationFactor2 != "")){
			  
			  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
				// alert("number field");
				var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value1 = txtPurchaseQuotationFactor2; //$('#' + id).val();
				
				if (min > value1.length || max < value1.length) {
					alert("Please enter valid item factor2 in "+i+" Row");
					
					$("#txtPurchaseQuotationFactor2" + i).val('');
					$("#txtPurchaseQuotationFactor2" + i).focus();
					return false;
				} else if (value1 != "" && !name1.test(value1)) {
					//alert("Please Enter  txtPurchaseQuotationFactor3  Only number!");
					alert("Please enter valid item factor2 in "+i+" Row");
					$("#txtPurchaseQuotationFactor2" + i).val('');
					$("#txtPurchaseQuotationFactor2" + i).focus();
					return false;
				}
				
			}
		  
		  if((parseFloat(txtPurchaseQuotationFactor3) == NaN || txtPurchaseQuotationFactor3 != "")){
			  
			  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
				// alert("number field");
				var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value1 = txtPurchaseQuotationFactor3; //$('#' + id).val();
				
				if (min > value1.length || max < value1.length) {
					alert("Please enter valid item factor3 in "+i+" Row");
					
					$("#txtPurchaseQuotationFactor3" + i).val('');
					$("#txtPurchaseQuotationFactor3" + i).focus();
					return false;
				} else if (value1 != "" && !name1.test(value1)) {
					//alert("Please Enter  txtPurchaseQuotationFactor3  Only number!");
					alert("Please enter valid item factor3 in "+i+" Row");
					$("#txtPurchaseQuotationFactor3" + i).val('');
					$("#txtPurchaseQuotationFactor3" + i).focus();
					return false;
				}
				
			}
				  
				  if((parseFloat(txtPurchaseQuotationFactor4) == NaN || txtPurchaseQuotationFactor4 != "")){
					  
					  var min = parseInt(minLen);
					  var max = parseInt(maxLen);
					   
						// alert("number field");
						var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
						var value1 = txtPurchaseQuotationFactor4; //$('#' + id).val();
						
						if (min > value1.length || max < value1.length) {
							alert("Please enter valid item factor4 in "+i+" Row");
							
							$("#txtPurchaseQuotationFactor4" + i).val('');
							$("#txtPurchaseQuotationFactor4" + i).focus();
							return false;
						} else if (value1 != "" && !name1.test(value1)) {
							alert("Please enter valid item factor4 in "+i+" Row");
							$("#txtPurchaseQuotationFactor4" + i).val('');
							$("#txtPurchaseQuotationFactor4" + i).focus();
							return false;
						}
					}

		  
		  
		  
		 /* if(txtPurchaseQuotationFactor1 == "" || txtPurchaseQuotationFactor1 == null){
				
				alert("Please enter item factor1 in "+i+" Row");
				$("#txtPurchaseQuotationFactor1" + i).focus();
				return false;
				
			}
		  if(txtPurchaseQuotationFactor2 == "" || txtPurchaseQuotationFactor2 == null){
				
			    alert("Please enter item factor2 in "+i+" Row");
				$("#txtPurchaseQuotationFactor2" + i).focus();
				return false;
				
			}
		  if(txtPurchaseQuotationFactor3 == "" || txtPurchaseQuotationFactor3 == null){
				
			  alert("Please enter item factor3 in "+i+" Row");
				$("#txtPurchaseQuotationFactor3" + i).focus();
				return false;
				
			}
		  if(txtPurchaseQuotationFactor4 == "" || txtPurchaseQuotationFactor4 == null){
				
			  alert("Please enter item factor4 in "+i+" Row");
				$("#txtPurchaseQuotationFactor4" + i).focus();
				return false;
				
			}
		  */
		  
		  if(txtPurchaseQuotationActualQuantity == "" || txtPurchaseQuotationActualQuantity == null){
				
				alert("Please enter item Order quantity in "+i+" Row");
				$("#txtPurchaseQuotationActualQuantity" + i).focus();
				return false;
				
			}
		  
		  if(txtPurchaseQuotationDocQuantity !== txtPurchaseQuotationActualQuantity){
				
		    	alert("Order Quantity should be equal to Item Quantity "+i+" Row");
				$("#txtPurchaseQuotationActualQuantity" + i).focus();
				return false;
				
			}
		  
		  if(txtPurchaseQuotationPendingQuantity == "" || txtPurchaseQuotationPendingQuantity == null){
				
				alert("Please enter item pending quantity in "+i+" Row");
				$("#txtPurchaseQuotationPendingQuantity" + i).focus();
				return false;
				
			}
			materiallist.ltinvetorypurchasecommonitemmaster
					.push({

						// inv_purchase_common_item_code:,
						inv_purchase_common_item_code : txtPurchaseQuotationItemName,
						inv_purchase_common_item_Name : txtPurchaseQuotationItemName_,
						inv_purchase_common_item_doc_Qty : txtPurchaseQuotationDocQuantity,
						inv_purchase_common_item_unit_price : txtPurchaseQuotationUnitPrice,

						inv_purchase_common_item_trade_discount_per : txtPurchaseQuotationTrdeDiscountPercentage,
						inv_purchase_common_item_trade_discount_rupess:txtPurchaseQuotationTrdeDiscountInRupess,
						inv_purchase_common_item_trade_discount_amount : txtPurchaseQuotationTrdeDiscountAmt,
						inv_purchase_common_item_trade_base_amount : txtPurchaseQuotationBaseAmount,
						inv_purchase_common_item_master_id : txtInvpurchaseCommonItemMasterId,

						inv_purchase_common_item_tax_amount : txtPurchaseQuotationTaxAmount,
						inv_purchase_common_item_tax_amount_rupess :txtPurchaseQuotationTaxAmtinRupess, // add tax amount in rupess purcahse quotation.   
						inv_purchase_common_item_tax_code:txtPurchaseQuotationTaxCode_,
						inv_purchase_common_item_row_amount : txtPurchaseQuotationRowAmount,
						inv_purchase_common_item_factor1 : txtPurchaseQuotationFactor1,
						inv_purchase_common_item_factor2 : txtPurchaseQuotationFactor2,

						inv_purchase_common_item_factor3 : txtPurchaseQuotationFactor3,
						inv_purchase_common_item_factor4 : txtPurchaseQuotationFactor4,
						inv_purchase_common_item_actural_qty : txtPurchaseQuotationActualQuantity,
						inv_purchase_common_item_pending_qty : txtPurchaseQuotationPendingQuantity,

						/*inv_purchase_common_item_row_status : txtPurchaseQuotationRowStatus,*/
						inv_purchase_common_item_batch_No : txtPurchaseQuotationBatchNo,

						inv_purchase_common_item_base_doc_No : txtPurchaseQuotationDocNo,
						inv_purchase_common_item_doc_number : txtPurchaseQuotationDocNo,

						inv_purchase_common_item_doc_number_fk : txtPurchaseQuotationDocNo,
						inv_purchase_common_item_doc_series : txtDocSeries,
						
						item_purchase_factor_uom_1 : txtPurchaseQuotationFactor1UOM,
						item_purchase_factor_uom_2 : txtPurchaseQuotationFactor2UOM,
						item_purchase_factor_uom_3 : txtPurchaseQuotationFactor3UOM,
						item_purchase_factor_uom_4 : txtPurchaseQuotationFactor4UOM,
						inv_item_purchase_last_factor_uom :txtPurchaseQuotationLastFactorUOM,

					});

		}

	}
}
	
	var li = materiallist.ltinvetorypurchasecommonitemmaster.length;
	 if(li == 0)
		{
		alert("Please enter atleast one Item row to Save Purchase Quotation");
		return false;
		}
	materiallist = JSON.stringify(materiallist);
	var inputs = [];

	inputs.push('action=savePurchaseCommonDetail');
	inputs.push('materiallist=' + materiallist);
	inputs.push('txtPurchaseQuotationDocNo=' + txtPurchaseQuotationDocNo);
	inputs.push('txtPurchaseQuotationDate1=' + txtPurchaseQuotationDate1);
	inputs.push('txtPurchaseQuotationMobileNo=' + txtPurchaseQuotationMobileNo);
	inputs.push('txtPurchaseQuotationSupplierCode='
			+ txtPurchaseQuotationSupplierCode);
	inputs.push('txtPurchaseQuotationSupplierName='
			+ txtPurchaseQuotationSupplierName);
	inputs.push('txtDocSeries=' + txtDocSeries);
	inputs.push('txtPurchaseQuotationReferenceNo='
			+ txtPurchaseQuotationReferenceNo);
	inputs.push('txtPurchaseQuotationAddress=' + txtPurchaseQuotationAddress);
	inputs.push('sclPurchaseQuotationDocstatus='
			+ sclPurchaseQuotationDocstatus);
	inputs.push('txtPurchaseQuotationAmountinlocalcurrency='
			+ txtPurchaseQuotationAmountinlocalcurrency);
	inputs.push('txtPurchaseQuotationTotalDocDiscount='
			+ txtPurchaseQuotationTotalDocDiscount);
	inputs.push('txtPurchaseQuotationTotalDocQty='
			+ txtPurchaseQuotationTotalDocQty);
	inputs.push('FORMNAME=' + txtPurchaseFormName);
	inputs.push('txtPurchaseQuotationRequestNo='
			+ txtPurchaseQuotationRequestNo);
	inputs.push('txtPurchaseQuotationExpiryDate1=' + txtPurchaseQuotationExpiryDate1);
	inputs.push('txtPurchaseQuotationDeliveryDate1=' + txtPurchaseQuotationDeliveryDate1);
	
	inputs.push('txtPurchaseQuotationNotes2='+txtPurchasTermsAndConditions);
	
	// save All Charges for purchase Qoutation @Date:10june2016 @Author Sudhir jadhav
	inputs.push('txtSplDisc=' + txtSplDisc);
	inputs.push('txtdebitAmt=' + txtdebitAmt1);
	inputs.push('txtCD=' + txtCD1);
	inputs.push('txtCDAmt=' + txtCDAmt);
	
	inputs.push('txtOctroi=' + txtOctroi);
	inputs.push('txtSurcharge=' + txtSurcharge);
	inputs.push('txtCreditAmt=' + txtCreditAmt);
	inputs.push('txtFreight=' + txtFreight);
	
	inputs.push('txtVat=' + txtVat);
	inputs.push('txtlbt=' + txtlbt);
	inputs.push('txtcst=' + txtcst);
	inputs.push('txtExVat=' + txtExVat);
	inputs.push('txtTotalVat=' + txtTotalVat);
	
	inputs.push('txtGross=' + txtGross);
	inputs.push('txtLess=' + txtLess);
	inputs.push('txtAdd=' + txtAdd);
	inputs.push('totalfinalVat=' + textVat);
	inputs.push('txtNetAmt=' + txtNetAmt);
	
	inputs.push('selboxChargeswithAmtList='+selboxChargeswithAmtList);
	inputs.push('sumofCharges='+sumofCharges);
 
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			alert("Record saved successfully..!");

			if (txtPurchaseQuotationRequestNo != null
					&& txtPurchaseQuotationRequestNo != ""
					&& txtPurchaseQuotationRequestNo != undefined
					&& txtPurchaseQuotationRequestNo > 0) {

				var inputs = [];
				inputs.push('action=createpurchaseQuatation');
				inputs.push('isEdit=no');
				inputs.push('MrnId=' + txtPurchaseQuotationRequestNo);
				var str = inputs.join('&');
				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {

						/*alert("Record saved successfully..");*/
						$('#Purchase_Quotation_Form').removeClass('fade');
						$('#Purchase_Quotation_Form').modal('hide');
						//fetchMaterialRequestNoteDetails();

					}
				});

			}

			else {

			}

			window.location.reload("inventory_Purchase_Request_List.jsp");
		}
	});
}

/********************************************New Save Purchase Order  ****************************************/
/********************************************New Save Purchase Order  ****************************************/
function savePurchaseOrder() {
	
	var  txtSanctNo = $("#txtSanctNo").val();
	var txtSanctionId  = $("#txtSanctionId").val();
	var sanSeriesNo = txtSanctNo + ":" +txtSanctionId;
  
	var currentuserName = $("#currentuserName").val();
	var currentUserID = $("#currentUserID").val();
	/*var txtPurchaseFormName = $("#txtPurchaseFormName").val();*/
	var txtPurchaseFormName = "PURCHASE ORDER";
	var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo").val();
	//alert(txtPurchaseOrderQuatationNo);
	var rowCount = $("#RowCountPO").val();
	var totaltblsize =$("#totaltblsize").val();
 //set the client Ip ,center id ,and send to pO to clent flag for Normal Purchase Order 
	var clientIp = $("#txtHiddenClientIp").val();
	var txtSendtoClient = $("#txtSendtoClient").val(); 
	var centerId = $("#txtHiddenCenterId").val();
	
  
	var txtPurchaseQuotationDocNo = $("#txtPurchaseOrderDocNoPRl").val();
	var txtPurchaseQuotationDate1 = $("#txtPurchaseOrderDatePRL").val();
	var txtPurchaseQuotationMobileNo = $("#txtPurchaseOrderMobileNo").val();
	var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val();
	var txtPurchaseQuotationSupplierName = $("#txtPurchaseOrderSupplierName").val();
	var selDocName = $("#selDocNamePO option:selected").text();
	var txtPurchaseQuotationDocSeries = $("#txtPurchaseOrderDocSeries").val();
	var finaltxtPurchaseOrderDocSeries =txtPurchaseQuotationDocSeries +"No"+":"+txtPurchaseQuotationDocNo;
	
	var txtDocSeries = finaltxtPurchaseOrderDocSeries;
	
	var txtPurchaseQuotationRequestNo = $("#txtPurchaseOrderRequestNo").val();
	var txtPurchaseQuotationReferenceNo = $("#txtPurchaseOrderReferenceNo").val();
	var txtPurchaseQuotationAddress = $("#txtPurchaseOrderAddress").val();
	var sclPurchaseQuotationDocstatus = $("#sclPurchaseOrderDocstatus").val();
	var txtPurchaseQuotationAmountinlocalcurrency = $("#txtPurchaseOrderAmountinlocalcurrency").val();
	var txtPurchaseQuotationTotalDocDiscount = $("#txtPurchaseOrderTotalDocDiscount").val();
	var txtPurchaseQuotationTotalDocQty = $("#txtPurchaseOrderTotalDocQty").val();
	var txtPurchaseOrderDeliveryDate = $("#txtPurchaseOrderDeliveryDate").val();
	
	
	
	// save All Charges for purchase Order @Date:10june2016 @Author Sudhir jadhav
	var txtSplDisc = $("#txtSplDisc").val();
	var txtdebitAmt1 = $("#txtdebitAmt1").val();
	var txtCD1 = $("#txtCD1").val();
	var txtCDAmt = $("#txtCDAmt").val();
	
	var txtOctroi = $("#txtOctroi").val();
	var txtSurcharge = $("#txtSurcharge").val();
	var txtCreditAmt = $("#txtCreditAmt").val();
	var txtFreight = $("#txtFreight").val();
	
	var txtVat = $("#txtVat").val();	
	var txtlbt = $("#txtlbt").val();
	var txtcst = $("#txtcst").val();
	var txtExVat = $("#txtExVat").val();
	var txtTotalVat = $("#txtTotalVat").val();
	
	var txtGross = $("#txtGross").val();
	var txtLess = $("#txtLess").val();
	var txtAdd = $("#txtAdd").val();
	var textVat = $("#textVat").val();
	var txtNetAmt = $("#txtNetAmt").val();
	
	
	
	
	/****validation of savePurchaseOrder @author:paras suryawanshi @Date:10OCT2016 *********/
	if(txtSplDisc == "" || txtSplDisc == null || txtSplDisc == NaN)
	{
		var min = parseInt(minLen);
		var max = parseInt(maxLen);
		   		
		var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
		var value1 = ""; 
		    value1 = $("#txtSplDisc").val(); 
			
			if (min > value1.length || max < value1.length) {
			
				$("#txtSplDisc").val('0');
				$("#txtSplDisc").focus();
				return false;
			} else if (value1 != "" && !name1.test(value1)) {
			
				alert("Please enter valid item special Discount !");
				$("#txtSplDisc").val('0');
				$("#txtSplDisc").focus();
				return false;
			}else if(value1 == "" || value1 == null)
		      {
				
				alert("Please Enter Valid Special Discount ");
		     	$("#txtSplDisc").focus();
		     	return false;
		      }

	
	}
	 if(txtdebitAmt1 == "" || txtdebitAmt1 == null || txtdebitAmt1 == NaN)
		{
			
			var min = parseInt(minLen);
		    var max = parseInt(maxLen);
			var name2 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value2 = ""; 
				value2 = $("#txtdebitAmt1").val(); 
				
				if (min > value2.length || max < value2.length) {
				
					$("#txtdebitAmt1").val('0');
					$("#txtdebitAmt1").focus();
					return false;
				} else if (value2 != "" && !name2.test(value2)) {
					
					alert("Please enter valid item Debit Amount !");
					$("#txtdebitAmt1").val('0');
					$("#txtdebitAmt1").focus();
					return false;
				}
			
				else if(value2 == "" || value2 == null)
			      {
					
					alert("Please Enter Valid Debit Amount ");
			     	$("#txtdebitAmt1").focus();
			    	return false;
			      }
			

		}

		if(txtCD1  == "" ||  txtCD1 == null ||  txtCD1  == NaN)
		{
			  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
				
				var name3 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value3 = ""; 
					value3 = $("#txtCD1").val(); 
				
				if (min > value3.length || max < value3.length) {
			
					$("#txtCD1").val('0');
					$("#txtCD1").focus();
					return false;
				} else if (value3 != "" && !name3.test(value3)) {
				
					alert("Please enter valid item CD !");
					$("#txtCD1").val('0');
					$("#txtCD1").focus();
					return false;
				}
			
				else if(value3 == "" || value3 == null)
			      {
					
					alert("Please Enter Valid CD  ");
			     	$("#txtCD1").focus();
			    	return false;
					
			      }
				
				}
		
		if( txtCDAmt  == "" ||  txtCDAmt == null ||  txtCDAmt  == NaN)
		{
			
			

			  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
			
				var name4 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value4 = ""; 
					value4 = $("#txtCDAmt").val(); 
				
				if (min > value4.length || max < value4.length) {
				
					$("#txtCDAmt").val('0');
					$("#txtCDAmt").focus();
					return false;
				} else if (value4 != "" && !name4.test(value4)) {
				
					alert("Please enter valid item CD Amount !");
					$("#txtCDAmt").val('0');
					$("#txtCDAmt").focus();
					return false;
				}
			   else if(value4 == "" || value4 == null)
			      {
					
					alert("Please Enter Valid CD Amount ");
			     	$("#txtCDAmt").focus();
			    	
			    	return false;
					
			      }	
		}

		if( txtOctroi  == "" ||  txtOctroi == null ||  txtOctroi == NaN)
		{
		      var min = parseInt(minLen);
			  var max = parseInt(maxLen);
		
				var name5 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value5 = ""; 
					value5 = $("#txtOctroi").val(); 
				
				if (min > value5.length || max < value5.length) {
			
					$("#txtOctroi").val('0');
					$("#txtOctroi").focus();
					return false;
				} else if (value5 != "" && !name5.test(value5)) {
					
					alert("Please enter valid item Octroi !");
					$("#txtOctroi").val('0');
					$("#txtOctroi").focus();
					return false;
				}
			   else if(value5 == "" || value5 == null)
			      {
					
					alert("Please Enter Valid Octroi ");
					$("#txtOctroi").focus();
					return false;
			      }
				
		}
		if(txtSurcharge  == "" || txtSurcharge == null ||  txtSurcharge == NaN)
		{
	 		  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			  var name6 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			  var value6 = ""; 
				  value6 = $("#txtSurcharge").val();
				
				if (min > value6.length || max < value6.length) {
			
					$("#txtSurcharge").val('0');
					$("#txtSurcharge").focus();
					return false;
				} else if (value6 != "" && !name6.test(value6)) {
				
					alert("Please enter valid Surcharge !");
					$("#txtSurcharge").val('0');
					$("#txtSurcharge").focus();
					return false;
				}
			   else if(value6 == "" || value6 == null)
			      {
					
					alert("Please Enter Valid Surcharge ");
					$("#txtSurcharge").focus();

					return false;
					
			      }
			
		}

		if(txtCreditAmt  == "" || txtCreditAmt == null ||  txtCreditAmt == NaN)
		{

			var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
				var name7 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value7 = ""; 
					value7 = $("#txtCreditAmt").val(); 
				
				if (min > value7.length || max < value7.length) {
				
					$("#txtCreditAmt").val('0');
					$("#txtCreditAmt").focus();
					return false;
				} else if (value7 != "" && !name7.test(value7)) {
					
					alert("Please enter valid Credit amount !");
					$("#txtCreditAmt").val('0');
					$("#txtCreditAmt").focus();
					return false;
				}
			   else if(value7 == "" || value7 == null)
			      {
	           		alert("Please Enter Valid Credit Amount ");
					
					$("#txtCreditAmt").focus();
					return false;
					
			      }
		}
		
		
		if( txtFreight == "" || txtFreight == null || txtFreight == NaN)
		{
			var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
			
				var name8 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value8 = ""; 
					value8 = $("#txtFreight").val();
				
				if (min > value8.length || max < value8.length) {
			
					$("#txtFreight").val('0');
					$("#txtFreight").focus();
					return false;
				} else if (value8 != "" && !name8.test(value8)) {
					
					alert("Please enter valid Freight !");
					$("#txtFreight").val('0');
					$("#txtFreight").focus();
					return false;
				}
			   else if(value8 == "" || value8 == null)
			      {
					  alert("Please Enter Valid Freight ");  
					   $("#txtFreight").focus();
					   return false;
					
			      }	
		}
	if(txtVat == "" || txtVat == null ||  txtVat == NaN)
		{
			var min = parseInt(minLen);
			var max = parseInt(maxLen);
			var name9 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value9 = ""; 
				value9 = $("#txtVat").val(); 
				
				if (min > value9.length || max < value9.length) {
				
					$("#txtVat").val('0');
					$("#txtVat").focus();
					return false;
				} else if (value9 != "" && !name9.test(value9)) {
					
					alert("Please enter valid Vat !");
					$("#txtVat").val('0');
					$("#txtVat").focus();
					return false;
				}
			   else if(value9 == "" || value9 == null)
			      {
					
					alert("Please Enter Valid Vat ");
					$("#txtVat").focus();
					return false;
			      }
		 }
	if(txtlbt == "" ||  txtlbt == null ||   txtlbt == NaN)
	{
		  var min = parseInt(minLen);
		  var max = parseInt(maxLen);
		   
			
			var name10 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value10 = ""; 
				value10 = $("#txtlbt").val();
			
			if (min > value10.length || max < value10.length) {
	
				$("#txtlbt").val('0');
				$("#txtlbt").focus();
				return false;
			} else if (value10 != "" && !name10.test(value10)) {
	
				alert("Please enter valid Lbt !");
				$("#txtlbt").val('0');
				$("#txtlbt").focus();
				return false;
			}
		   else if(value10 == "" || value10 == null)
		      {
				
				alert("Please Enter Valid LBT ");
			    $("#txtlbt").focus();

				return false;
				
		      }	
	}
	 if(txtcst == "" ||  txtcst == null ||   txtcst == NaN)
		{
			var min = parseInt(minLen);
			var max = parseInt(maxLen);
			var name11 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value11 = ""; 
				value11 = $("#txtcst").val(); 
				
				if (min > value11.length || max < value11.length) {
			
					$("#txtcst").val('0');
					$("#txtcst").focus();
					return false;
				} else if (value11 != "" && !name11.test(value11)) {
				
					alert("Please enter valid Cst !");
					$("#txtcst").val('0');
					$("#txtcst").focus();
					return false;
				}
			   else if(value11 == "" || value11 == null)
			      {
					alert("Please Enter Valid CST ");
					
					$("#txtcst").focus();
					return false;
					
			      }
				
		}
		
		if(txtExVat == "" ||  txtExVat == null ||   txtExVat == NaN)
		{
			var min = parseInt(minLen);
			var max = parseInt(maxLen);
			var name12 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value12 = ""; 
				value12 = $("#txtExVat").val(); 
				
				if (min > value12.length || max < value12.length) {
			
					$("#txtExVat").val('0');
					$("#txtExVat").focus();
					return false;
				} else if (value12 != "" && !name12.test(value12)) {
				
					alert("Please enter valid Ex Vat!");
					$("#txtExVat").val('0');
					$("#txtExVat").focus();
					return false;
				}
			   else if(value12 == "" || value12 == null)
			      {
				    alert("Please Enter Valid Ex Vat ");
					
					$("#txtExVat").focus();
					return false;
					
			      }
		}
		
		
		if(txtTotalVat == "" ||  txtTotalVat == null ||   txtTotalVat == NaN)
		{
			var min = parseInt(minLen);
			var max = parseInt(maxLen);
			var name13 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value13 = ""; 
				value13 = $("#txtTotalVat").val(); 
				
				if (min > value13.length || max < value13.length) {
			
					$("#txtTotalVat").val('0');
					$("#txtTotalVat").focus();
					return false;
				} else if (value13 != "" && !name13.test(value13)) {
				
					alert("Please enter valid Total Tax !");
					$("#txtTotalVat").val('0');
					$("#txtTotalVat").focus();
					return false;
				}
			   else if(value13 == "" || value13 == null)
			      {
					
					alert("Please Enter Valid Total Tax ");
					  $("#txtTotalVat").focus();
						 return false;
			      }
		}
	
		
		

		if(txtGross == "" ||  txtGross == null ||   txtGross == NaN)
		{
			var min = parseInt(minLen);
			var max = parseInt(maxLen);
			var name14 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value14 = ""; 
				value14 = $("#txtGross").val(); 
				
				if (min > value14.length || max < value14.length) {
				
					$("#txtGross").val('0');
					$("#txtGross").focus();
					return false;
				} else if (value14 != "" && !name14.test(value14)) {
				
					alert("Please enter valid Gross Amount !");
					$("#txtGross").val('0');
					$("#txtGross").focus();
					return false;
				}
			   else if(value14 == "" || value14 == null)
			      {
					
					alert("Please Enter Valid Gross Amount ");
					
					$("#txtGross").focus();
					return false;
			      }
			}
		

		if(txtLess == "" ||   txtLess == null ||   txtLess == NaN)
		{
			var min = parseInt(minLen);
			var max = parseInt(maxLen);
			var name15 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value15 = ""; 
				value15 = $("#txtLess").val(); 
				
				if (min > value15.length || max < value15.length) {
			
					$("#txtLess").val('0');
					$("#txtLess").focus();
					return false;
				} else if (value15 != "" && !name15.test(value15)) {
				
					alert("Please enter Valid Less !");
					$("#txtLess").val('0');
					$("#txtLess").focus();
					return false;
				}
			   else if(value15 == "" || value15 == null)
			      {
					
					alert("Please Enter Valid Less ");
					
					$("#txtLess").focus();
					
					return false;
			      }

		
		}
		
		if(txtAdd == "" ||  txtAdd  == null ||   txtAdd == NaN)
		{
			var min = parseInt(minLen);
			var max = parseInt(maxLen);
			var name16 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value16 = ""; 
				value16 = $("#txtAdd").val();
				
				if (min > value16.length || max < value16.length) {
				
					$("#txtAdd").val('0');
					$("#txtAdd").focus();
					return false;
				} else if (value16 != "" && !name16.test(value16)) {
				
					alert("Please enter valid ADD !");
					$("#txtAdd").val('0');
					$("#txtAdd").focus();
					return false;
				}
			   else if(value16 == "" || value16 == null)
			      {
					
					alert("Please Enter Valid ADD ");
					
					$("#txtAdd").focus();
					return false;
					
			      }
		}
		
		
		
		
		if(txtNetAmt == "" ||  txtNetAmt == null ||   txtNetAmt == NaN)
		{
			var min = parseInt(minLen);
			var max = parseInt(maxLen);
			var name17 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value17 = ""; 
				value17 = $("#txtNetAmt").val(); //$('#' + id).val();
				
				if (min > value17.length || max < value17.length) {
				
					$("#txtNetAmt").val('0');
					$("#txtNetAmt").focus();
					return false;
				} else if (value17 != "" && !name17.test(value17)) {
				
					alert("Please enter valid Net Amount !");
					$("#txtNetAmt").val('0');
					$("#txtNetAmt").focus();
					return false;
				}
			   else if(value17 == "" || value17 == null)
			      {
					
					alert("Please Enter Valid Net Amount ");
					
					$("#txtNetAmt").focus();
					return false;
					
			      }
			
		}
		if(textVat == "" ||  textVat == null ||   textVat == NaN)
		{
			var min = parseInt(minLen);
			var max = parseInt(maxLen);
			var name18 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
			var value18 = ""; 
			    value18 = $("#textVat").val(); 
				
				if (min > value18.length || max < value18.length) {
				
					$("#textVat").val('0');
					$("#textVat").focus();
					return false;
				} else if (value18 != "" && !name18.test(value18)) {
					
					alert("Please enter valid Tax !");
					$("#textVat").val('0');
					$("#textVat").focus();
					return false;
				}
			   else if(value18 == "" || value18 == null)
			      {
					alert("Please Enter Valid Tax ");
					
					$("#textVat").focus();
					return false;
			      }
			
		}
		
	/****END validation of savePurchaseOrder @author:paras suryawanshi @Date:10OCT2016 *********/
	
	
	
	
	/** save all special Charges with his amount 11jully2016 **/
	var selboxChargeswithAmtList = "";
	$('#selboxChargeswithAmtList').find('option').each(function() {
		selboxChargeswithAmtList = selboxChargeswithAmtList + ($(this).val() + ",");
	});
	selboxChargeswithAmtList = selboxChargeswithAmtList.substring(0, selboxChargeswithAmtList.length-1);
	if (selboxChargeswithAmtList == "-Select-" || selboxChargeswithAmtList == null || selboxChargeswithAmtList == '' || selboxChargeswithAmtList == "Select" || selboxChargeswithAmtList == "0") {
		selboxChargeswithAmtList = "No";
	} 
	var sumofCharges = $("#sumofCharges").val();
	//validation
	
	if(txtPurchaseQuotationDate1 == "" || txtPurchaseQuotationDate1 == null)
	{
	alert("Please select order date ");
	$("#txtPurchaseOrderDatePRL").focus();
	return false;
	}
	
	
	if(txtPurchaseQuotationDate1)
	{
		/*var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    
	    var today1 = dd+'/'+mm+'/'+yyyy;*/
		
		var today = new Date();
		 
		var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!
	    var yyyy = today.getFullYear();
	    
	    if(dd<10){
	        dd='0'+dd;
	    } 
	    if(mm<10){
	        mm='0'+mm;
	    } 
	    
	    var today1 = dd+'/'+mm+'/'+yyyy;
	    
	    if(txtPurchaseQuotationDate1 === today1)
		   {
		   		    
		   }
	    else
	    {
	    	alert("Please Enter Current Date ");
		    $("#txtPurchaseOrderDatePRL").focus();
		   return false;
	    }
	    
	  /* if(new Date(txtPurchaseQuotationDate1).getTime() < new Date(today1).getTime())
		   {
		   alert("please Enter current Date ");
		   $("#txtPurchaseOrderDatePRL").focus();
		   return false;
		   }
	   
	   if(new Date(txtPurchaseQuotationDate1).getTime() > new Date(today1).getTime())
	   {
		   alert("Enter Date is future Date ");
		   $("#txtPurchaseOrderDatePRL").focus();
		   return false;
	   }*/
		
 
	}
	
	
	
	if(txtPurchaseQuotationSupplierName == "" || txtPurchaseQuotationSupplierName == null)
	{
		alert("Please enter supplier name");
		$("#txtPurchaseOrderSupplierName").focus();
		return false;
	}
	
	if(txtPurchaseQuotationMobileNo == "" || txtPurchaseQuotationMobileNo == null)	
	{
	alert("Please enter mobile number");
	$("#txtPurchaseOrderMobileNo").focus();
	return false;
	}
	
	if(txtPurchaseQuotationMobileNo.length < 10 || txtPurchaseQuotationMobileNo.length > 10)
	{
	alert("Mobile number should be of 10 digits");
	$("#txtPurchaseOrderMobileNo").focus();
	return false;
	}

	 var docseries= $("#txtPurchaseOrderDocSeries").val();
     if(docseries == 0 || docseries == '-Select-')
     {
	    alert('please select doc series');
		$("#selDocNamePO").focus();
    //	$("#txtPurchaseOrderDocSeries").focus();
	
		return false;
     }
	      
     if(txtPurchaseQuotationReferenceNo == "" || txtPurchaseQuotationReferenceNo == null)
 	{
 	alert("Please enter reference number");
 	$("#txtPurchaseOrderReferenceNo").focus();
 	return false;
 	}
     
     if(txtPurchaseQuotationAddress == "" || txtPurchaseQuotationAddress == null)
 	{
 	alert("Please enter address");
 	$("#txtPurchaseOrderAddress").focus();
 	return false;
 	}
     
    /* var pattern = /^([a-zA-Z0-9]+\s?)*$/;
  	if (!pattern.test(txtPurchaseQuotationAddress)) {
  		alert("Purchase order address should be of alphabets and digits  only with a single space allowed..!");
  		$("#txtPurchaseQuotationAddress").focus();
  		return false;
  	  }*/
     
     var status = document.getElementById("sclPurchaseOrderDocstatus");
     var docstatus = status.options[status.selectedIndex].text;
     if(docstatus == 0 ||  docstatus == 'Select')
     {
	    alert('please select order status');
		$("#sclPurchaseOrderDocstatus").focus();
		return false;
     }
	
	
	var materiallist = {
		ltinvetorypurchaseorderitemmaster : []
	};

	// alert("ROW" +rowCount);
	for ( var i = 1; i <= totaltblsize; i++) {
		
		for ( var i = 1; i <= totaltblsize-1; i++)
			{
	
		if ( $("#txtPurchaseQuotationItemNumberPO" + i).val() != null && $("#txtPurchaseQuotationItemNumberPO" + i).val() != undefined) {
			
		var txtPurchaseQuotationItemNumberPO = $("#txtPurchaseQuotationItemNumberPO" + i).val();
			
			var txtPurchaseQuotationItemName = $(
					"#txtPurchaseQuotationItemNumberPO" + i).val();

			var txtPurchaseQuotationItemName_ = $(
					"#txtPurchaseQuotationItemNamePO_" + i).val();
		
			var txtInvpurchaseCommonItemMasterId = $(
					"#txtInvpurchaseCommonItemMasterIdPO" + i).val();

			var txtPurchaseQuotationDocQuantity = $(
					"#txtPurchaseQuotationDocQuantityPO" + i).val();
			

			var txtPurchaseQuotationUnitPrice = $(
					"#txtPurchaseQuotationUnitPricePO" + i).val();
		
			var txtPurchaseQuotationTrdeDiscountPercentage = $("#txtPurchaseQuotationTrdeDiscountPercentagePO" + i).val();
			var txtPurchaseQuotationTrdeDiscountInRupess = $("#txtPurchaseQuotationTrdeDiscountInRupessPO" + i).val();
		
			var txtPurchaseQuotationTrdeDiscountAmt = $("#txtPurchaseQuotationTrdeDiscountAmtPO" + i).val();
			
			var txtPurchaseQuotationBaseAmount = $("#txtPurchaseQuotationBaseAmountPO" + i).val();
			 
			/*var txtPurchaseQuotationTaxCodePO_ = $("#txtPurchaseQuotationTaxCodePO_" + i).val();*/
			
			var txtPurchaseQuotationTaxCodePO_ = "";
			
			$('#txtPurchaseQuotationTaxCodePO_'+ i).find('option').each(function() {
				txtPurchaseQuotationTaxCodePO_ = txtPurchaseQuotationTaxCodePO_ + ($(this).val() + ",");
			});
			txtPurchaseQuotationTaxCodePO_= txtPurchaseQuotationTaxCodePO_.substring(0, txtPurchaseQuotationTaxCodePO_.length-1);
			var txtPurchaseQuotationTaxAmount = $("#txtPurchaseQuotationTaxAmountPO" + i).val();
			
			var txtPurchaseQuotationTaxAmount = $(
					"#txtPurchaseQuotationTaxAmountPO" + i).val();
	    
			var  txtPurchaseQuotationTaxAmtinRs = $("#txtPurchaseQuotationTaxAmtinRsPO" + i).val(); //add tax amount in rs @author: paras @Date:22Nov2016 

			var txtPurchaseQuotationRowAmount = $(
					"#txtPurchaseQuotationRowAmountPO" + i).val();
			
			var txtPurchaseQuotationFactor1 = $(
					"#txtPurchaseQuotationFactor1PO" + i).val();
			var txtPurchaseQuotationFactor2 = $(
					"#txtPurchaseQuotationFactor2PO" + i).val();
			var txtPurchaseQuotationFactor3 = $(
					"#txtPurchaseQuotationFactor3PO" + i).val();
			var txtPurchaseQuotationFactor4 = $(
					"#txtPurchaseQuotationFactor4PO" + i).val();
			var txtPurchaseQuotationActualQuantity = $(
					"#txtPurchaseQuotationActualQuantityPO" + i).val();
			var txtPurchaseQuotationPendingQuantity = $(
					"#txtPurchaseQuotationPendingQuantityPO" + i).val();
			var txtPurchaseQuotationBatchNoPO = $(
					"#txtPurchaseQuotationBatchNoPO" + i).val();
			
			var txtPurchaseQuotationFactor1UOM = $("#txtPurchaseQuotationFactor1UOMPO" + i).text();
			var txtPurchaseQuotationFactor2UOM = $("#txtPurchaseQuotationFactor2UOMPO" + i).text();
			var txtPurchaseQuotationFactor3UOM = $("#txtPurchaseQuotationFactor3UOMPO" + i).text();
			var txtPurchaseQuotationFactor4UOM = $("#txtPurchaseQuotationFactor4UOMPO" + i).text();
			
			var txtPurchaseQuotationLastFactorUOM = $("#txtPurchaseQuotationLastFactorUOMPO" + i).text();

		
			
			
			//validatoin
		    if(txtPurchaseQuotationItemName_ == "" || txtPurchaseQuotationItemName_ == null){
				
				alert("Please enter item name in "+i+" Row");
				$("#txtPurchaseQuotationItemNamePO_" + i).focus();
				return false;
				
			}
		    else
		    {
		    	// $('#txtPurchaseQuotationItemNamePO_').css('border-color', '');
		    }
		    if(txtPurchaseQuotationDocQuantity == "" || txtPurchaseQuotationDocQuantity == null){
				
				alert("Please enter item quantity in "+i+" Row");
				$("#txtPurchaseQuotationDocQuantityPO" + i).focus();
				return false;
				
			}
		   if(txtPurchaseQuotationUnitPrice == "" || txtPurchaseQuotationUnitPrice == null){
				
				alert("Please enter item unit price in "+i+" Row");
				$("#txtPurchaseQuotationUnitPricePO" + i).focus();
				return false;
				
			}
		   
		   
		   var pattern = /^[0-9]+\.?[0-9]*$/;
			if (!pattern.test(txtPurchaseQuotationUnitPrice)) {
				alert("Purchase info:Unit price should be of digits and a decimal point Only!");
				$("#txtPurchaseQuotationUnitPrice"+i).focus();
				return false;
			}
		   
		   if(txtPurchaseQuotationTrdeDiscountPercentage == "" || txtPurchaseQuotationTrdeDiscountPercentage == null){
				
				alert("Please enter item trade discount in "+i+" Row");
				$("#txtPurchaseQuotationTrdeDiscountPercentagePO" + i).focus();
				return false;
				
			}
		   if(txtPurchaseQuotationTrdeDiscountAmt == "" || txtPurchaseQuotationTrdeDiscountAmt == null){
				
				alert("Please enter item trade discount amount in "+i+" Row");
				$("#txtPurchaseQuotationTrdeDiscountAmtPO" + i).focus();
				return false;
				
			}
		  if(txtPurchaseQuotationBaseAmount == "" || txtPurchaseQuotationBaseAmount == null){
				
				alert("Please enter item base amount in "+i+" Row");
				$("#txtPurchaseQuotationBaseAmountPO" + i).focus();
				return false;
				
			}     
		  
		  
		  if(txtPurchaseQuotationTaxCodePO_ == "" || txtPurchaseQuotationTaxCodePO_ == null){
				
				alert("Please enter item tax code in "+i+" Row");
				$("#txtPurchaseQuotationTaxCodePO_" + i).focus();
				return false;
				
			}

		  if(txtPurchaseQuotationTaxAmount == "" || txtPurchaseQuotationTaxAmount == null){
				
				alert("Please enter item tax amount in "+i+" Row");
				$("#txtPurchaseQuotationTaxAmountPO" + i).focus();
				return false;
				
			}
		  
		  
/***********************adding valdation tax amount@Date:10oct2016 @author:paras suryawanshi **********************************************/	  
		  
		  if (txtPurchaseQuotationTaxAmount == '' || txtPurchaseQuotationTaxAmount == undefined || txtPurchaseQuotationTaxAmount == null || txtPurchaseQuotationTaxAmount == "NaN") {
		     	var min = parseInt(minLen);
		  	var max = parseInt(maxLen);
		  	
		  	var name19 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
		  	var value19 = ""; 
		  	    value19 = $("#txtPurchaseQuotationTaxAmountPO" + i).val();
		  		
		  		if (min > value19.length || max < value19.length) {
		  		
		  			/*$("#txtPurchaseQuotationTaxAmount").val('0');*/
		  			$("#txtPurchaseQuotationTaxAmountPO" + i).val('');
		  			$("#txtPurchaseQuotationTaxCodePO_" + i).focus();
		  			return false;
		  		} else if (value19 != "" && !name19.test(value19)) {
		  			
		  			alert("Please enter valid Tax");
		  			$("#txtPurchaseQuotationTaxAmountPO" + i).val('');
		  			$("#txtPurchaseQuotationTaxCodePO_" + i).focus();
		  			return false;
		  		}
		  	   else if(value19 == "" || value19 == null)
		  	      {
		  			alert("Please Enter Valid Tax ");
		  			$("#txtPurchaseQuotationTaxCodePO_" + i).focus();
		  			return false;
		  	      }
		  }
		  
/***********************END adding valdation tax amount@Date:10oct2016 @author:paras suryawanshi **********************************************/	  
		  
		  if(txtPurchaseQuotationRowAmount == "" || txtPurchaseQuotationRowAmount == null){
				
				alert("Please enter item row amount in "+i+" Row");
				$("#txtPurchaseQuotationRowAmountPO" + i).focus();
				return false;
				
			}
		  
		  
		  if(txtPurchaseQuotationActualQuantity == "" || txtPurchaseQuotationActualQuantity == null){
				
				alert("Please enter item Order quantity in "+i+" Row");
				$("#txtPurchaseQuotationActualQuantityPO" + i).focus();
				return false;
				
			}
		  
		  if(txtPurchaseQuotationDocQuantity !== txtPurchaseQuotationActualQuantity){
				
		    	alert("Order Quantity should be equal to Item Quantity "+i+" Row");
				$("#txtPurchaseQuotationActualQuantity" + i).focus();
				return false;
				
			}
		  
		  if(txtPurchaseQuotationPendingQuantity == "" || txtPurchaseQuotationPendingQuantity == null){
				
				alert("Please enter item pending quantity in "+i+" Row");
				$("#txtPurchaseQuotationPendingQuantityPO" + i).focus();
				return false;
				
			}
		    
		  if((parseFloat(txtPurchaseQuotationFactor1) == NaN || txtPurchaseQuotationFactor1 != "")){

	  		  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
				// alert("number field");
				var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value1 = txtPurchaseQuotationFactor1; //$('#' + id).val();
				
				if (min > value1.length || max < value1.length) {
					alert("Please enter valid item factor1 in "+i+" Row");
					
					$("#txtPurchaseQuotationFactor1PO" + i).val('');
					$("#txtPurchaseQuotationFactor1PO" + i).focus();
					return false;
				} else if (value1 != "" && !name1.test(value1)) {
					//alert("Please Enter  txtPurchaseQuotationFactor3  Only number!");
					alert("Please enter valid item factor1 in "+i+" Row");
					$("#txtPurchaseQuotationFactor1PO" + i).val('');
					$("#txtPurchaseQuotationFactor1PO" + i).focus();
					return false;
				}
				//return true;
				
			}
  
  if((parseFloat(txtPurchaseQuotationFactor2) == NaN || txtPurchaseQuotationFactor2 != "")){
	  
	  var min = parseInt(minLen);
	  var max = parseInt(maxLen);
	   
		// alert("number field");
		var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
		var value1 = txtPurchaseQuotationFactor2; //$('#' + id).val();
		
		if (min > value1.length || max < value1.length) {
			alert("Please enter valid item factor2 in "+i+" Row");
			
			$("#txtPurchaseQuotationFactor2PO" + i).val('');
			$("#txtPurchaseQuotationFactor2PO" + i).focus();
			return false;
		} else if (value1 != "" && !name1.test(value1)) {
			//alert("Please Enter  txtPurchaseQuotationFactor3  Only number!");
			alert("Please enter valid item factor2 in "+i+" Row");
			$("#txtPurchaseQuotationFactor2PO" + i).val('');
			$("#txtPurchaseQuotationFactor2PO" + i).focus();
			return false;
		}
		//return true;
		
	}
  
  if((parseFloat(txtPurchaseQuotationFactor3) == NaN || txtPurchaseQuotationFactor3 != "")){
	  
	  var min = parseInt(minLen);
	  var max = parseInt(maxLen);
	   
		// alert("number field");
		var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
		var value1 = txtPurchaseQuotationFactor3; //$('#' + id).val();
		
		if (min > value1.length || max < value1.length) {
			alert("Please enter valid item factor3 in "+i+" Row");
			
			$("#txtPurchaseQuotationFactor3PO" + i).val('');
			$("#txtPurchaseQuotationFactor3PO" + i).focus();
			return false;
		} else if (value1 != "" && !name1.test(value1)) {
			//alert("Please Enter  txtPurchaseQuotationFactor3  Only number!");
			alert("Please enter valid item factor3 in "+i+" Row");
			$("#txtPurchaseQuotationFactor3PO" + i).val('');
			$("#txtPurchaseQuotationFactor3PO" + i).focus();
			return false;
		}
		//return true;
		
	}
		  
		  if((parseFloat(txtPurchaseQuotationFactor4) == NaN || txtPurchaseQuotationFactor4 != "")){
			  
			  var min = parseInt(minLen);
			  var max = parseInt(maxLen);
			   
				// alert("number field");
				var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value1 = txtPurchaseQuotationFactor4; //$('#' + id).val();
				
				if (min > value1.length || max < value1.length) {
					alert("Please enter valid item factor4 in "+i+" Row");
					
					$("#txtPurchaseQuotationFactor4PO" + i).val('');
					$("#txtPurchaseQuotationFactor4PO" + i).focus();
					return false;
				} else if (value1 != "" && !name1.test(value1)) {
					alert("Please enter valid item factor4 in "+i+" Row");
					$("#txtPurchaseQuotationFactor4PO" + i).val('');
					$("#txtPurchaseQuotationFactor4PO" + i).focus();
					return false;
				}
			
			}
		  
		  
		 /* if(txtPurchaseQuotationFactor1 == "" || txtPurchaseQuotationFactor1 == null){
				
				alert("Please enter item factor1 in "+i+" Row");
				$("#txtPurchaseQuotationFactor1PO" + i).focus();
				return false;
				
			}
		  if(txtPurchaseQuotationFactor2 == "" || txtPurchaseQuotationFactor2 == null){
				
			    alert("Please enter item factor2 in "+i+" Row");
				$("#txtPurchaseQuotationFactor2PO" + i).focus();
				return false;
				
			}
		  if(txtPurchaseQuotationFactor3 == "" || txtPurchaseQuotationFactor3 == null){
				
			  alert("Please enter item factor3 in "+i+" Row");
				$("#txtPurchaseQuotationFactor3PO" + i).focus();
				return false;
				
			}
		  if(txtPurchaseQuotationFactor4 == "" || txtPurchaseQuotationFactor4 == null){
				
			  alert("Please enter item factor4 in "+i+" Row");
				$("#txtPurchaseQuotationFactor4PO" + i).focus();
				return false;
				
			}*/

			materiallist.ltinvetorypurchaseorderitemmaster
					.push({

						// inv_purchase_common_item_code:,
						inv_purchase_order_item_Name : txtPurchaseQuotationItemName_,
						inv_purchase_order_item_code : txtPurchaseQuotationItemName,
						inv_purchase_order_item_doc_Qty : txtPurchaseQuotationDocQuantity,
						inv_purchase_order_item_unit_price : txtPurchaseQuotationUnitPrice,

						inv_purchase_order_item_trade_discount_per : txtPurchaseQuotationTrdeDiscountPercentage,
						inv_purchase_order_item_trade_discount_rupess:txtPurchaseQuotationTrdeDiscountInRupess,
						inv_purchase_order_item_trade_discount_amount : txtPurchaseQuotationTrdeDiscountAmt,
						inv_purchase_order_item_trade_base_amount : txtPurchaseQuotationBaseAmount,
						inv_purchase_order_item_master_id : txtInvpurchaseCommonItemMasterId,

						inv_purchase_order_item_tax_amount : txtPurchaseQuotationTaxAmount,
						inv_purchase_order_item_tax_amount_rupess:txtPurchaseQuotationTaxAmtinRs,
						inv_purchase_order_item_tax_code:txtPurchaseQuotationTaxCodePO_,
						inv_purchase_order_item_row_amount : txtPurchaseQuotationRowAmount,
						inv_purchase_order_item_factor1 : txtPurchaseQuotationFactor1,
						inv_purchase_order_item_factor2 : txtPurchaseQuotationFactor2,

						inv_purchase_order_item_factor3 : txtPurchaseQuotationFactor3,
						inv_purchase_order_item_factor4 : txtPurchaseQuotationFactor4,
						inv_purchase_order_item_actural_qty : txtPurchaseQuotationActualQuantity,
						inv_purchase_order_item_pending_qty : txtPurchaseQuotationPendingQuantity,

						/*inv_purchase_order_item_batch_No : txtPurchaseQuotationRowStatus,*/
						inv_purchase_order_item_batch_No : txtPurchaseQuotationBatchNoPO,

						//inv_purchase_order_item_base_doc_No : txtPurchaseQuotationDocNo,
						inv_purchase_order_item_doc_number : txtPurchaseQuotationDocNo,

						inv_purchase_order_item_doc_number_fk : txtPurchaseQuotationDocNo,
						inv_purchase_order_item_doc_series : txtDocSeries,

						inv_item_purchase_factor_uom_1 : txtPurchaseQuotationFactor1UOM,
						inv_item_purchase_factor_uom_2 : txtPurchaseQuotationFactor2UOM,
						inv_item_purchase_factor_uom_3 : txtPurchaseQuotationFactor3UOM,
						inv_item_purchase_factor_uom_4 : txtPurchaseQuotationFactor4UOM,
						inv_item_purchase_last_factor_uom :txtPurchaseQuotationLastFactorUOM,

					});

		
		}
	}
	
	
	var li = materiallist.ltinvetorypurchaseorderitemmaster.length;
	 if(li == 0)
		{
		alert("Please enter atleast one Item row to Save Purchase Order");
		return false;
		}
	 
	materiallist = JSON.stringify(materiallist);
	var inputs = [];

	inputs.push('action=savePurchaseOrderDetail');
	inputs.push('materiallist=' + materiallist);
	inputs.push('txtPurchaseQuotationDocNo=' + txtPurchaseQuotationDocNo);
	inputs.push('txtPurchaseOrderQuatationNo=' + txtPurchaseOrderQuatationNo);

	inputs.push('txtPurchaseQuotationDate1=' + txtPurchaseQuotationDate1);
	inputs.push('txtPurchaseQuotationMobileNo=' + txtPurchaseQuotationMobileNo);
	inputs.push('txtPurchaseQuotationSupplierCode='
			+ txtPurchaseQuotationSupplierCode);
	inputs.push('txtPurchaseQuotationSupplierName='
			+ txtPurchaseQuotationSupplierName);
	inputs.push('txtDocSeries=' + txtDocSeries);
	inputs.push('txtPurchaseQuotationReferenceNo='
			+ txtPurchaseQuotationReferenceNo);
	inputs.push('txtPurchaseQuotationAddress=' + txtPurchaseQuotationAddress);
	inputs.push('sclPurchaseQuotationDocstatus='
			+ sclPurchaseQuotationDocstatus);
	inputs.push('txtPurchaseQuotationAmountinlocalcurrency='
			+ txtPurchaseQuotationAmountinlocalcurrency);
	inputs.push('txtPurchaseQuotationTotalDocDiscount='
			+ txtPurchaseQuotationTotalDocDiscount);
	inputs.push('txtPurchaseQuotationTotalDocQty='
			+ txtPurchaseQuotationTotalDocQty);
	inputs.push('FORMNAME=' + txtPurchaseFormName);
	inputs.push('txtPurchaseQuotationRequestNo='
			+ txtPurchaseQuotationRequestNo);
	inputs.push('txtPurchaseOrderDeliveryDate='	+txtPurchaseOrderDeliveryDate);
	
	// save All Charges for purchase Order @Date:10june2016 @Author Sudhir jadhav
	inputs.push('txtSplDisc=' + txtSplDisc);
	inputs.push('txtdebitAmt=' + txtdebitAmt1);
	inputs.push('txtCD=' + txtCD1);
	inputs.push('txtCDAmt=' + txtCDAmt);
	
	inputs.push('txtOctroi=' + txtOctroi);
	inputs.push('txtSurcharge=' + txtSurcharge);
	inputs.push('txtCreditAmt=' + txtCreditAmt);
	inputs.push('txtFreight=' + txtFreight);
	
	inputs.push('txtVat=' + txtVat);
	inputs.push('txtlbt=' + txtlbt);
	inputs.push('txtcst=' + txtcst);
	inputs.push('txtExVat=' + txtExVat);
	inputs.push('txtTotalVat=' + txtTotalVat);
	
	inputs.push('txtGross=' + txtGross);
	inputs.push('txtLess=' + txtLess);
	inputs.push('txtAdd=' + txtAdd);
	inputs.push('totalfinalVat=' + textVat);
	inputs.push('txtNetAmt=' + txtNetAmt);
	inputs.push('txtHiddenIp=' + clientIp);
	inputs.push('selboxChargeswithAmtList='+selboxChargeswithAmtList);
	inputs.push('sumofCharges='+sumofCharges);
	inputs.push('txtCenterId='+centerId);
	inputs.push('txtSendtoClient='+txtSendtoClient);
	
	inputs.push('currentuserName='+currentuserName);
	inputs.push('currentUserID='+currentUserID);
	inputs.push('sanSeriesNo='+sanSeriesNo);
	inputs.push('txtPoApprovFlg=N');
	inputs.push('txtPoAmendFlg=N');
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert("Record saved successfully..!");

			if (txtPurchaseQuotationRequestNo != null
					&& txtPurchaseQuotationRequestNo != ""
					&& txtPurchaseQuotationRequestNo != undefined
					&& txtPurchaseQuotationRequestNo > 0) {

				var inputs = [];
				inputs.push('action=createpurchaseQuatation');
				inputs.push('isEdit=no');
				inputs.push('MrnId=' + txtPurchaseQuotationRequestNo);
				var str = inputs.join('&');
				jQuery.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						//alert("error");
					},
					success : function(r) {

						/* alert("Record saved successfully..");*/
						//fetchMaterialRequestNoteDetails();
						$('#Purchase_Order_Form').removeClass('fade');
						$('#Purchase_Order_Form').modal('hide');

					}
				});
				
				if($("#txtSendtoClient").val()=='Y')
				{
				jQuery.ajax({
					async : false,
					type : "POST",
					url : "/EhatEnterprise/api/getInventoryPoList",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) 
					{
						//alert();
					}
				});
				return true;
				
				}

			}
			else 
			{

			}

			
		}
	});
	window.location.reload("inventory_Purchase_Request_List.jsp");
}
	
}
function purchaseQuatViewRefresh() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	$('#Sales_Quotation_Form').find('input:hidden').val('');
	$("#ItemInfoTable > tbody").html('');
	$('#ItemInfoTable').find('input:text').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	isNew = 1;

}
/** ****** set new table counter and refresh popup ******** */
function setnewtablecounter() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	$('#Sales_Quotation_Form').find('input:hidden').val('');
	$("#ItemInfoTable > tbody").html('');
	$('#ItemInfoTable').find('input:text').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	isNew = 0;
	rowCount = 1;
	getNextQuotationId();
}
/*modified @Date 17 june 2016 AUthor Sudhir resion make Actual qty and Item qty Equal */
function totalAmount(id, rowCount) {
	//alert(id);
	var quantity = $('#' + id).val();
	/**PQ***call factoring *@author husenbadshah**@since 3/3/2016****/
	//var PQ ="PurchaseQuotation";
	//calculateFactoring(quantity,rowCount,PQ);

	var rate = $('#txtPurchaseQuotationUnitPrice' + rowCount).val();

	$('#txtPurchaseQuotationActualQuantity' + rowCount).val(quantity);
	$('#txtPurchaseQuotationPendingQuantity' + rowCount).val(quantity);
	$('#txtPurchaseQuotationFactor1' + rowCount).val(quantity);
	$('#txtPurchaseQuotationBaseAmount' + rowCount).val(quantity * rate);

	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();

	// var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#txtPurchaseQuotationDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#txtPurchaseQuotationTotalDocQty").val(sum);

}

/********** Calculate treade discount AMt ******************/
function calculTradeDis(id, rowCount) {
	var treadeDiscount = $(
			"#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).val();
	var oldbaseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();

	if (treadeDiscount) {
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val('');
		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');

		var docqty = $("#txtPurchaseQuotationDocQuantity" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowCount).val();

		var baseAmt = docqty * unitprise;

		var totalAmtInpercntage = baseAmt * treadeDiscount / 100;

		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val(
				totalAmtInpercntage);

		var finalBaseAmt = baseAmt - totalAmtInpercntage;
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(finalBaseAmt.toFixed(2));

		var oldTotaldiscount = $("#txtPurchaseQuotationTotalDocDiscount").val();
		if (oldTotaldiscount == '' || oldTotaldiscount == null
				|| oldTotaldiscount == undefined) {
			$("#txtPurchaseQuotationTotalDocDiscount").val(totalAmtInpercntage);
		} else {
			var finaltotalDiscount = (parseFloat(oldTotaldiscount) + parseFloat(totalAmtInpercntage))
					.toFixed(2);
			$("#txtPurchaseQuotationTotalDocDiscount").val(finaltotalDiscount);
		}
	} else {

		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(baseAmt.toFixed(2));
	}
	rowAmtCal(1,rowCount);
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
}

function rowAmtCal(id, rowCount) {

	var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val('');
	}
	
	var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if(baseAmt == " " || baseAmt == null)
	{
	$("#txtPurchaseQuotationRowAmount"+ rowCount).val(' ');
	return false;
	}
	
	else {
		
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
		 caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		 var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		 
	   $('#txtPurchaseQuotationTaxAmtinRs'+ rowCount).val(finalcaltaxanmount); // tax amount in rs added @Author:paras @Date:22nov 
		 
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountcalculated = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(finalRowAmountcalculated);
		
		/*var sum = 0;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
		sum = parseFloat(baseAmt) + parseFloat(taxAmt);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(sum);*/
	}

}
function pendingAmount(id, rowCount) {

	var actualquantity = $('#' + id).val();
	var quantity = $('#txtPurchaseQuotationDocQuantity' + rowCount).val();
	if (actualquantity > quantity) {
		alert("Plz enter valid quantity");
	} else {
		// ss alert(quantity + "-" +actualquantity);
		/*
		 * $('#txtPurchaseQuotationPendingQuantity' + rowCount).val( quantity -
		 * actualquantity);
		 */
	}

}

function totalDocQtyPQ() {
	var sum = 0;
	var totalQty;
	var RowCount = $("#totaltblsize").val();

	// var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#txtPurchaseQuotationDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#txtPurchaseQuotationTotalDocQty").val(sum);
	$("#txtPurchaseOrderTotalDocQty").val(sum);
	$("#RowCount").val(RowCount);

}

/************** Total Doc Discount ***********/

function totalDocDiscountPQ() {
	var sum = 0;
	var tradeAmt;
	var RowCount = $("#RowCount").val();

	for ( var i = 1; i <= RowCount; i++) {
		tradeAmt = $("#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
		if (tradeAmt == null || tradeAmt == undefined || tradeAmt == '') {
			var flag = 1;
		} else {
			sum = (parseFloat(sum) + parseFloat(tradeAmt)).toFixed(2);
			;
		}

	}

	$("#txtPurchaseQuotationTotalDocDiscount").val(sum);
	$("#RowCount").val(RowCount);

}

function fetchDocumentNameList() {
	var inputs = [];
	inputs.push('action=fetchDocumentNameDetail');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			//alert(r);
			$('#AjaxResopnse').html(r);
			pobj1 = eval('(' + r + ')');
			$("#selDocName").setTemplate(selInventoryDocumentTemplate);
			$("#selDocName").processTemplate(pobj1);

			$("#selDocNamePO").setTemplate(selInventoryDocumentTemplatePO);
			$("#selDocNamePO").processTemplate(pobj1);
			
			$("#txtSanctNo").setTemplate(selInvForSantionNo);
			$("#txtSanctNo").processTemplate(pobj1);

		}
	});
}
var selInventoryDocumentTemplate = 
		 "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
		+"{#if $T.lstDocumentNUmberDto.document_series == 'Purchase Quotation'}"
		+ "<option id='pqId' value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
		+ "{#/for}";

var selInventoryDocumentTemplatePO = 
		 "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
		+"{#if $T.lstDocumentNUmberDto.document_series == 'Purchase Order'}"
		+ "<option id='prId' value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
		+ "{#/for}";

function getSeries(id) {
	var obj = $("#AjaxResopnse").html();
	var txtId = $('#txtPurchaseQuotationDocNo').val();
	objDocument = JSON.parse(obj);

	for ( var i = 0; i < objDocument.lstDocumentNUmberDto.length; i++) {
		if (objDocument.lstDocumentNUmberDto[i].document_numbering_id == id) {
			$("#txtPurchaseQuotationDocSeries").val(
					objDocument.lstDocumentNUmberDto[i].document_prefix
							+ objDocument.lstDocumentNUmberDto[i].document_number
							+ txtId
							+ objDocument.lstDocumentNUmberDto[i].document_suffix);

		}
	}

}

function getSeriesPO(id) {
	var obj = $("#AjaxResopnse").html();
	var txtId = $('#txtPurchaseOrderDocSeries').val();
	objDocument = JSON.parse(obj);

	for ( var i = 0; i < objDocument.lstDocumentNUmberDto.length; i++) {
		if (objDocument.lstDocumentNUmberDto[i].document_numbering_id == id) {
			$("#txtPurchaseOrderDocSeries").val(
					objDocument.lstDocumentNUmberDto[i].document_prefix
							+ objDocument.lstDocumentNUmberDto[i].document_number
							+ txtId
							+ objDocument.lstDocumentNUmberDto[i].document_suffix);

		}
	}

}

function refresh()
{
	 $('#txtPurchaseQuotationFactor1PO').val('');
	 $('#txtPurchaseQuotationFactor2PO').val('');
	 $('#txtPurchaseQuotationFactor3PO').val('');
	 $('#txtPurchaseQuotationFactor4PO').val('');
}
function calculateFactoring(qty,rowCountPO,Type)
{
	var HiddenOBJ = "";
	if(Type == "PurchaseOrder")
		{
		HiddenOBJ = $("#POItemPurchaseInfoDIV").html();
		}
	else if(Type == "PurchaseQuotation")
		{
		HiddenOBJ = $("#PQItemPurchaseInfoDIV").html();
		}
	
 var ParsedOBJ = JSON.parse(HiddenOBJ);
 $("#hiddenfactorPrice").val(ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].hiddenFactorPrice);
 $("#hiddenfactorQTY").val(ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].hiddenFactorValue);
 $("#item_purchase_uom_factor1").val(ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1);
 $("#item_purchase_uom_factor2").val(ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2);
 $("#item_purchase_uom_factor3").val(ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3);
 $("#item_purchase_uom_factor4").val(ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor4);
 
 var factQty1  = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1;
 var factQty2  = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2;
 var factQty3  = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3;
 var factQty4  = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor4;
 //alert(factQty1+" "+factQty2+" "+factQty3+" "+factQty4);
 
 var factQty11 = '';
 var factQty22 = '';
 var factQty33 = '';
 var factQty44 = '';
 if((factQty1 != '' || factQty1 != 'undefined') && (factQty2 == 'undefined' || factQty2 == '') && 
		 (factQty3 == 'undefined' || factQty3 == '') && (factQty4 == 'undefined' || factQty4 == ''))
	     {
			  if(qty != 0)
				 {
				  if(Type == "PurchaseOrder")
					{
					    // var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val() ;
						// var newUnitPrice = (qty) * (unitPrice); 
						// $('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val(parseFloat(newUnitPrice));
						 
						 $('#txtPurchaseQuotationFactor1PO' + rowCountPO).val(qty);
						 $('#txtPurchaseQuotationFactor2PO' + rowCountPO).val(factQty22);
						 $('#txtPurchaseQuotationFactor3PO' + rowCountPO).val(factQty33);
						 $('#txtPurchaseQuotationFactor4PO' + rowCountPO).val(factQty44);
					}
				  else if(Type == "PurchaseQuotation")
					  {
					    //var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val() ;
						// var newUnitPrice = (qty) * (unitPrice); 
						// $('#txtPurchaseQuotationUnitPrice' + rowCountPO).val(parseFloat(newUnitPrice));
						 
						 $('#txtPurchaseQuotationFactor1' + rowCountPO).val(qty);
						 $('#txtPurchaseQuotationFactor2' + rowCountPO).val(factQty22);
						 $('#txtPurchaseQuotationFactor3' + rowCountPO).val(factQty33);
						 $('#txtPurchaseQuotationFactor4' + rowCountPO).val(factQty44);
					  }
				 
				 }
		
	     }
 else if((factQty1 != '' || factQty1 != 'undefined') && (factQty2 != 'undefined' || factQty2 != '') && 
		 (factQty3 == 'undefined' || factQty3 == '') && (factQty4 == 'undefined' || factQty4 == ''))
	    {
	      if(qty != 0)
	    	  {
		    	  if(Type == "PurchaseOrder")
					{
					     factQty11 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1;
					     factQty22 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2;
					     
					    // var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val();
						// var newUnitPrice = (qty) * (unitPrice); 
						// $('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val(parseFloat(newUnitPrice));
						 
						 var fact1QTY = ((qty) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1)) / factQty22;
						 $('#txtPurchaseQuotationFactor1PO' + rowCountPO).val(parseFloat(fact1QTY));
						 $('#txtPurchaseQuotationFactor2PO' + rowCountPO).val(qty);
						 $('#txtPurchaseQuotationFactor3PO' + rowCountPO).val(factQty33);
						 $('#txtPurchaseQuotationFactor4PO' + rowCountPO).val(factQty44);
					}
				  else if(Type == "PurchaseQuotation")
				  {
					     factQty11 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1;
					     factQty22 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2;
					     
					    // var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val();
						// var newUnitPrice = (qty) * (unitPrice); 
						// $('#txtPurchaseQuotationUnitPrice' + rowCountPO).val(parseFloat(newUnitPrice));
						 
						 var fact1QTY = ((qty) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1)) / factQty22;
						 $('#txtPurchaseQuotationFactor1' + rowCountPO).val(parseFloat(fact1QTY));
						 $('#txtPurchaseQuotationFactor2' + rowCountPO).val(qty);
						 $('#txtPurchaseQuotationFactor3' + rowCountPO).val(factQty33);
						 $('#txtPurchaseQuotationFactor4' + rowCountPO).val(factQty44);
				  }
	    	  }
        }
 else if((factQty1 != '' || factQty1 != 'undefined') && (factQty2 != 'undefined' || factQty2 != '') && 
		 (factQty3 != 'undefined' || factQty3 != '') && (factQty4 == 'undefined' || factQty4 == ''))
       {
		  if(qty != 0){
					  if(Type == "PurchaseOrder")
						{
						     factQty11 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1;
						     factQty22 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2;
						     factQty33 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3;
						     
							// var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val();
							// var newUnitPrice = (qty) * (unitPrice); 
							// $('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val(parseFloat(newUnitPrice));
								 
							 var fact2QTY = ((qty) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2)) / factQty33;
							 $('#txtPurchaseQuotationFactor2PO' + rowCountPO).val(parseFloat(fact2QTY));
							 
							 var fact1QTY = ((fact2QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1)) / factQty22;
							 $('#txtPurchaseQuotationFactor1PO' + rowCountPO).val(parseFloat(fact1QTY));
							  
							 $('#txtPurchaseQuotationFactor3PO' + rowCountPO).val(qty);	
							 $('#txtPurchaseQuotationFactor4PO' + rowCountPO).val(factQty44); 
					   }			     	
					else if(Type == "PurchaseQuotation")
						  {
							 factQty11 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1;
						     factQty22 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2;
						     factQty33 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3;
						     
							// var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val();
							// var newUnitPrice = (qty) * (unitPrice); 
							// $('#txtPurchaseQuotationUnitPrice' + rowCountPO).val(parseFloat(newUnitPrice));
								 
							 var fact2QTY = ((qty) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2)) / factQty33;
							 $('#txtPurchaseQuotationFactor2' + rowCountPO).val(parseFloat(fact2QTY));
							 
							 var fact1QTY = ((fact2QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1)) / factQty22;
							 $('#txtPurchaseQuotationFactor1' + rowCountPO).val(parseFloat(fact1QTY));
							  
							 $('#txtPurchaseQuotationFactor3' + rowCountPO).val(qty);	
							 $('#txtPurchaseQuotationFactor4' + rowCountPO).val(factQty44); 
						  }
						 
			 }
       } 
 else if((factQty1 != '' || factQty1 != 'undefined') && (factQty2 != 'undefined' || factQty2 != '') 
		 && (factQty3 != 'undefined' || factQty3 != '') && (factQty4 != 'undefined' || factQty4 != ''))
       {
		  if(qty != 0){
				  if(Type == "PurchaseOrder")
					{
						     factQty11 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1;
						     factQty22 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2;
						     factQty33 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3;
						     factQty44 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor4;
						     
							// var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val() ;
							// var newUnitPrice = (qty) * (unitPrice); 
							 //$('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val(parseFloat(newUnitPrice));
								 
							 var fact3QTY = ((qty) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3)) / factQty44;
							 $('#txtPurchaseQuotationFactor3PO' + rowCountPO).val(parseFloat(fact3QTY));
							 
							 var fact2QTY = ((fact3QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2)) / factQty33;
							 $('#txtPurchaseQuotationFactor2PO' + rowCountPO).val(parseFloat(fact2QTY));
							 
							 var fact1QTY = ((fact2QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1)) / factQty22;
							 $('#txtPurchaseQuotationFactor1PO' + rowCountPO).val(parseFloat(fact1QTY));
							  
							 $('#txtPurchaseQuotationFactor4PO' + rowCountPO).val(qty);	
					}
				  else if(Type == "PurchaseQuotation")
						  {
						     factQty11 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1;
						     factQty22 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2;
						     factQty33 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3;
						     factQty44 = ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor4;
						     
							// var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val() ;
							// var newUnitPrice = (qty) * (unitPrice); 
							// $('#txtPurchaseQuotationUnitPrice' + rowCountPO).val(parseFloat(newUnitPrice));
								 
							 var fact3QTY = ((qty) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3)) / factQty44;
							 $('#txtPurchaseQuotationFactor3' + rowCountPO).val(parseFloat(fact3QTY).toFixed(2));
							 
							 var fact2QTY = ((fact3QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2)) / factQty33;
							 $('#txtPurchaseQuotationFactor2' + rowCountPO).val(parseFloat(fact2QTY));
							 
							 var fact1QTY = ((fact2QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1)) / factQty22;
							 $('#txtPurchaseQuotationFactor1' + rowCountPO).val(parseFloat(fact1QTY));
							  
							 $('#txtPurchaseQuotationFactor4' + rowCountPO).val(qty);	
					
						  }
			 }
        } 

}
/************ Functions for purchase Order* modified @Author sudhir @Date 17june2016 resion make Item Qty and Actual Qty Equal ****** */
function totalAmountPO(id, rowCountPO) {
	//alert(rowCountPO);
	//alert(id);
	var quantity = $('#' + id).val();
	/***PO****call factoring function**@author*husenbadshah***@since 3/3/2016*****/
	//var PO ="PurchaseOrder";
	//calculateFactoring(quantity,rowCountPO,PO);

	var rate = $('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val();

	$('#txtPurchaseQuotationActualQuantityPO' + rowCountPO).val(quantity);
	$('#txtPurchaseQuotationPendingQuantityPO' + rowCountPO).val(quantity);
	
	$('#txtPurchaseQuotationFactor1PO' + rowCountPO).val(quantity);
	
	$('#txtPurchaseQuotationBaseAmountPO' + rowCountPO).val(quantity * rate);

	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCountPO").val();

	// var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#txtPurchaseQuotationDocQuantityPO" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#txtPurchaseOrderTotalDocQty").val(sum);

}

/********** Calculate treade discount AMt ******************/
function calculTradeDisPO(id, rowCount) {
	var treadeDiscount = $(
			"#txtPurchaseQuotationTrdeDiscountPercentagePO" + rowCount).val();
	var oldbaseAmt = $('#txtPurchaseQuotationBaseAmountPO' + rowCount).val();

	if (treadeDiscount) {
		$('#txtPurchaseQuotationBaseAmountPO' + rowCount).val('');
		$('#txtPurchaseQuotationTrdeDiscountAmtPO' + rowCount).val('');
		$('#txtPurchaseQuotationTrdeDiscountAmtPO'+rowCount).val('');

		var docqty = $("#txtPurchaseQuotationDocQuantityPO" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPricePO" + rowCount).val();

		var baseAmt = docqty * unitprise;

		var totalAmtInpercntage = baseAmt * treadeDiscount / 100;

		$('#txtPurchaseQuotationTrdeDiscountAmtPO' + rowCount).val(
				totalAmtInpercntage);

		var finalBaseAmt = baseAmt - totalAmtInpercntage;
		$('#txtPurchaseQuotationBaseAmountPO' + rowCount).val(finalBaseAmt.toFixed(2));

		var oldTotaldiscount = $("#txtPurchaseOrderTotalDocDiscount").val();
		if (oldTotaldiscount == '' || oldTotaldiscount == null
				|| oldTotaldiscount == undefined) {
			$("#txtPurchaseOrderTotalDocDiscount").val(totalAmtInpercntage);
		} else {
			var finaltotalDiscount = (parseFloat(oldTotaldiscount) + parseFloat(totalAmtInpercntage))
					.toFixed(2);
			$("#txtPurchaseOrderTotalDocDiscount").val(finaltotalDiscount);
		}
	} else {

		$('#txtPurchaseQuotationTrdeDiscountAmtPO' + rowCount).val('');
		$('#txtPurchaseQuotationBaseAmountPO' + rowCount).val(baseAmt.toFixed(2));
	}
	rowAmtCalPO(1,rowCount);
	totalGrossAmtPO(1,rowCount);
	totalVatAmtPO(1,rowCount);
}

function rowAmtCalPO(id, rowCount) {
	var taxAmt = $("#txtPurchaseQuotationTaxAmountPO" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmountPO' + rowCount).val('');
	} 
	
	var baseAmt = $('#txtPurchaseQuotationBaseAmountPO' + rowCount).val();
	if(baseAmt == " " || baseAmt == null)
	{
	$("#txtPurchaseQuotationRowAmountPO"+ rowCount).val(' ');
	return false;
	}
	
	else {
		
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationBaseAmountPO' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmountPO" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
	    var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		
	    $('#txtPurchaseQuotationTaxAmtinRsPO'+ rowCount).val(finalcaltaxanmount);   // Add tax amount in Rs @author:paras @Date:22nov
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalalRowamount = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmountPO' + rowCount).val(finalalRowamount);
		
		/*var sum = 0;
		var baseAmt = $('#txtPurchaseQuotationBaseAmountPO' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmountPO" + rowCount).val();
		sum = parseFloat(baseAmt) + parseFloat(taxAmt);
		$('#txtPurchaseQuotationRowAmountPO' + rowCount).val(sum);*/
		
	}

}
function pendingAmountPO(id, rowCount) {
	var actualquantity = $('#' + id).val();
	var quantity = $('#txtPurchaseQuotationDocQuantityPO' + rowCount).val();
	if (actualquantity > quantity) {
		alert("Please enter valid quantity");
	} else {
		// ss alert(quantity + "-" +actualquantity);
		/*
		 * $('#txtPurchaseQuotationPendingQuantity' + rowCount).val( quantity -
		 * actualquantity);
		 */
	}

}

function totalDocQtyPO() {

	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCountPO").val();

	  var totalRow = $("#totaltblsize").val();
	for ( var i = 1; i <= totalRow; i++) {
		totalQty = $("#txtPurchaseQuotationDocQuantityPO" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#txtPurchaseOrderTotalDocQty").val(sum);
	$("#RowCountPO").val(RowCount);

}

/************** Total Doc Discount ***********/

function totalDocDiscountPO() {
	var sum = 0;
	var tradeAmt;
	var RowCount = $("#RowCountPO").val();

	for ( var i = 1; i <= RowCount; i++) {
		tradeAmt = $("#txtPurchaseQuotationTrdeDiscountAmtPO" + i).val();
		if (tradeAmt == null || tradeAmt == undefined || tradeAmt == '') {
			var flag = 1;
		} else {
			sum = (parseFloat(sum) + parseFloat(tradeAmt)).toFixed(2);
			;
		}

	}

	$("#txtPurchaseQuotationTotalDocDiscountPO").val(sum);
	$("#RowCountPO").val(RowCount);

}

/********************* search mrn purchaesh Request *********************/

function fetchMRNDetailByIdPurchasesRequest(mrnId) {

	if (mrnId == null || mrnId == "") {
		alert("Please Enter MRN Id");
		$("#byMrnId").focus();
		return false;
	}

	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailinPurReqList');
	inputs.push('isEdit=yes');
	inputs.push('MrnId=' + mrnId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			 //alert(r);
			pobj1 = eval('(' + r + ')');
			objMRN = JSON.parse(r);
			srNumber = 1;
			if (objMRN.inventoryMaterialRequestNoteMasterDTO.length > 0) {

				/*$("#MRNcontent").setTemplate(inventoryMRNTemp);
				$("#MRNcontent").processTemplate(pobj1);*/
				$("#MRNcontent").setTemplate(inventoryMRNTemp);
				$("#MRNcontent").processTemplate(pobj1);

				 $("#MRNAjaxResp").html(r);

			} else {
				alert("Record not found..!");
				//fetchMaterialRequestNoteDetails();
				fetchMaterialRequestNoteDetailsinPurReqList();
			}
			$('#byMrnId').val("");

		}
	});
}

/******************************************************new party master**added in quatation*************************************************husen**/
function getGeneralInfoIdForPurList() {
	var inputs = [];
	inputs.push('action=txtcontactcode');
	inputs.push('tableName=inv_party_master_contact_info');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtcontactcode").val(r);
		}
	});
}

var counterPartyContactInfo = 1;
var inventoryPartyContactInfoTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Contact Person</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Designation</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Address</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr></thead>"
		+ "{#foreach $T.ltinventorypartymastrecontactinfodto as ltinventorypartymastrecontactinfodto}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered' id='id{$T.ltinventorypartymastrecontactinfodto.party_contact_info_id}'>{counterPartyContactInfo++}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymastrecontactinfodto.party_contact_info_id}'>{$T.ltinventorypartymastrecontactinfodto.party_contact_info_name}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymastrecontactinfodto.party_contact_info_id}'>{$T.ltinventorypartymastrecontactinfodto.party_contact_info_designation}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymastrecontactinfodto.party_contact_info_id}'>{$T.ltinventorypartymastrecontactinfodto.party_contact_info_address}</td>"
		+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit' type='button' class='btn btn-xs btn-success' value='EDIT' onclick='EditPartyContactsDetails({$T.ltinventorypartymastrecontactinfodto.party_contact_info_id})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'><button id='btnDelete' value='Delete' type='button' class='btn btn-xs btn-danger' onclick=\"DeletePartyContactsDetails({$T.ltinventorypartymastrecontactinfodto.party_contact_info_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";

function SavePartyMasterContactInfoDetails() {
	var txtcontactInfoId = $("#txtcontactcode").val();
	var txtpartymasterId = $("#txtVendorCode").val();

	var txtcontactperson = $("#txtcontactperson").val();
	var txtdesignation = $("#txtdesignation").val();
	var txtcontaddress = $("#txtcontaddress").val();
	var txtgender = $("#txtgender").val();
	var txtdate = $("#txtdate").val();
	var txtphone1 = $("#txtphone1").val();
	var txtphone2 = $("#txtphone2").val();
	//var txtcontactmobile = $("#txtcontactmobile").val();
	var txtemail = $("#txtemail").val();
	
	//validation
	
	if(txtcontactperson !="")
	{
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(txtcontactperson)) {
			alert("Person name should be of alphabets only with a single space allowed..!");
			$("#txtcontactperson").focus();
			return false;
		  }
	}
	
	/*if(txtdate == "")
		{		
		alert("Please select date of birth!");
		$("#txtdate").focus();
		return false;
		}*/
	
	
	if(txtdesignation != "")
	{
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(txtdesignation)) {
			alert("Designation name should be of alphabets only with a single space allowed..!");
			$("#txtdesignation").focus();
			return false;
		  }
	}
	
	
	
	/*if(txtcontaddress != "")
	{
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtcontaddress)) {
			alert("Contact address should be of alphabets and digits  only with a single space allowed..!");
			$("#txtcontaddress").focus();
			return false;
		  }
	}*/
	
	
		
	if(txtphone1 != "")
	{
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtphone1)) {
			alert("Phone1 should be of digits.!");
			$("#txtphone1").focus();
			return false;
		  }
	}
	
	if(txtphone2 != "")
	{
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtphone2)) {
			alert("Phone2 should be of digits.!");
			$("#txtphone2").focus();
			return false;
		  }
		
	}
	if(txtemail != "")
		{
	    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    if (!filter.test(txtemail))
		    {
		    alert('Please provide a valid email address');
		    $("#txtemail").focus();
		    return false;
		    }
		
	}
	

	var inputs = [];
	inputs.push('action=SavePartyMasterContactDetails');
	inputs.push('txtcontactInfoId=' + txtcontactInfoId);
	inputs.push('txtpartymasterId=' + txtpartymasterId);
	inputs.push('txtcontactperson=' + txtcontactperson);
	inputs.push('txtdesignation=' + txtdesignation);
	inputs.push('txtcontaddress=' + txtcontaddress);
	inputs.push('txtgender=' + txtgender);
	inputs.push('txtdate=' + txtdate);
	inputs.push('txtphone1=' + txtphone1);
	inputs.push('txtphone2=' + txtphone2);
	//inputs.push('txtcontactmobile=' + txtcontactmobile);
	inputs.push('txtemail=' + txtemail);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtcontactperson").val("");
			$("#txtdesignation").val("");
			$("#txtgender").val("");
			$("#txtcontaddress").val("");
			$("#txtdate").val("");
			$("#txtphone1").val("");
			$("#txtphone2").val("");
			//$("#txtcontactmobile").val("");
			$("#txtemail").val("");
			alert("Record saved successfully..!");
			getGeneralInfoIdForPurList();
			fetchPartyMasterContactsDetails();
		}
	});
}

function fetchPartyMasterContactsDetails() {
	var txtcontactInfoId = $("#txtcontactcode").val();
	var txtpartymasterId = $("#txtVendorCode").val();
	var inputs = [];
	inputs.push('action=fetchPartyContactsDetails');
	inputs.push('isEdit=no');
	inputs.push('txtcontactInfoId=' + txtcontactInfoId);
	inputs.push('txtpartymasterId=' + txtpartymasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			// alert(r);
			counterPartyContactInfo = 1;
			$("#ContactInfoTable").setTemplate(inventoryPartyContactInfoTemp);
			$("#ContactInfoTable").processTemplate(pobj1);
			$("#PartyContactTableInfoList").html(r);
			
			
			
			/*********************************************** featch address and mobile no for suppler name In purchase quatation  Date:24/6/2015 Author :sudhir ***********************************/
			/*var obj = $("#PartyContactTableInfoList").html();
			var objPurchase = JSON.parse(obj);
			for(var row =0 ;row < objPurchase.ltinventorypartymastrecontactinfodto.length;row ++  )
			{
			//$("#txtPurchaseQuotationMobileNo").val(objPurchase.ltinventorypartymastrecontactinfodto[row].party_contact_info_phone_number1);
			$("#txtPurchaseQuotationAddress").val(objPurchase.ltinventorypartymastrecontactinfodto[row].party_contact_info_address);
			break;
			}*/
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
			
			
			
			
		}
	});
}

function EditPartyContactsDetails(id) {
	var obj = $("#PartyContactTableInfoList").html();
	objpartycontactsDetail = JSON.parse(obj);
	var myobj = "";
	for ( var i = 0; i < objpartycontactsDetail.ltinventorypartymastrecontactinfodto.length; i++) {
		if (objpartycontactsDetail.ltinventorypartymastrecontactinfodto[i].party_contact_info_id == id) {
			myobj = objpartycontactsDetail.ltinventorypartymastrecontactinfodto[i];
			break;
		}
	}

	$("#txtcontactperson").val(myobj.party_contact_info_name);
	$("#txtdesignation").val(myobj.party_contact_info_designation);
	$("#txtgender").val(myobj.party_contact_info_gender);
	$("#txtcontaddress").val(myobj.party_contact_info_address);
	/**********************************date convert**************************************/
	var strdate="";
	if(myobj.party_contact_info_dob == "0000-00-00")
		{
		strdate="";
		$("#txtdate").val(strdate);
		}
	else{
		/*var str = (myobj.party_contact_info_dob).split("-");
		var bdate = str[2] + "-" + str[1] + "-" + str[0];*/
		$("#txtdate").val(myobj.party_contact_info_dob);
		
	}
	

	$("#txtphone1").val(myobj.party_contact_info_phone_number1);
	$("#txtphone2").val(myobj.party_contact_info_phone_number2);
	//$("#txtcontactmobile").val(myobj.party_contact_info_mobile);
	$("#txtemail").val(myobj.party_contact_info_email);
	$("#txtcontactcode").val(id);

}

function DeletePartyContactsDetails(partyContactId) {
	//alert("contct id is:" + partyContactId);
	var txtpartymasterId = $("#txtVendorCode").val();
	//alert("party id:" + txtpartymasterId);
	var didConfirm = confirm("Are you sure?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePartycontactdetails');
		inputs.push('partyContactId=' + partyContactId);
		inputs.push('txtpartymasterId=' + txtpartymasterId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				//alert("error");
			},
			success : function(r) {
				alert(r);
				fetchPartyMasterContactsDetails();
			}
		});
	}
}

function resetContactInfoFields() {
	$("#txtcontactperson").val("");
	$("#txtdesignation").val("");
	$("#txtgender").val("");
	$("#txtcontaddress").val("");
	$("#txtdate").val("");
	$("#txtphone1").val("");
	$("#txtphone2").val("");
	//$("#txtcontactmobile").val("");
	$("#txtemail").val("");
	getGeneralInfoIdForPurList();
}

/********************************************************new party mastertxtcontactcode address details******************************************************/
function getAddressInfoIdPurList() {
	var inputs = [];
	inputs.push('action=txtaddressinfocode');
	inputs.push('tableName=inv_party_master_address_info');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		//	alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			$("#txtaddressinfocode").val(r);
		}
	});
}

var counterPartyAddressInfo = 1;
var inventoryPartyAddressInfoTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Comapny</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Country</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>city</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr></thead>"
		+ "{#foreach $T.ltinventorypartymasteraddressinfodto as ltinventorypartymasteraddressinfodto}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered' id='id{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id}'>{counterPartyAddressInfo++}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id}'>{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_company}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id}'>{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_country}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id}'>{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_city}</td>"
		+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit' type='button' class='btn btn-xs btn-success' onclick='EditpartyAddressdetails({$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'><button id='btnDelete' type='button' class='btn btn-xs btn-danger' onclick=\"DeletePartyAddressDetails({$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";

function SavePartyMasterAddressInfoDetails() {
	var txtpartymasterId = $("#txtVendorCode").val();
	//alert(txtpartymasterId);
	var txtaddressinfocode = $("#txtaddressinfocode").val();
	//alert(txtaddressinfocode);
	var radioBtn = null;
	if ($('#iBillingAddress').is(":checked") == true) {

		radioBtn = $("#iBillingAddress").val();
	}
	if ($('#iShippingAddress').is(":checked") == true) {
		radioBtn = $("#iShippingAddress").val();

	}
	var txtaddresscompany = $("#txtaddresscompany").val();
	var txtadraddress = $("#txtadraddress").val();
	var txtstreet = $("#txtstreet").val();
	var txtarea = $("#txtarea").val();
	var txtaddrcity = $("#txtaddrcity").val();
	var txtaddrpin = $("#txtaddrpin").val();
	var txtaddrstate = $("#txtaddrstate").val();
	var txtaddrcountry = $("#txtaddrcountry").val();

	
	//validation
	if(txtaddresscompany != "")
	{
	var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(txtaddresscompany)) {
		alert("Company name should be of alphabets only with a single space allowed..!");
		$("#txtaddresscompany").focus();
		return false;
	  }
	
	}


if(txtaddrcity != "")
{
	var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(txtaddrcity)) {
		alert("City name should be of alphabets only with a single space allowed..!");
		$("#txtaddrcity").focus();
		return false;
	  }

}


/*if(txtadraddress != "")
{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtadraddress)) {
		alert("Address should be of alphabets and digits only with a single space allowed..!");
		$("#txtadraddress").focus();
		return false;
	  }
}*/



if(txtaddrpin != "")
{
	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtaddrpin)) {
		alert("Pin code should be of digits only!");
		$("#txtaddrpin").focus();
		return false;
	  }	
}


if(txtaddrstate != "")
{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtaddrstate)) {
		alert("State name should be of alphabets only with a single space allowed..!");
		$("#txtaddrstate").focus();
		return false;
	  }	
}


if(txtstreet !=""||txtstreet !=null)
	{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtstreet)) {
		alert("Street should be of alphabets and digits only with a single space allowed..!");
		$("#txtstreet").focus();
		return false;
	  }		
	
	}

if(txtarea !=""||txtarea !=null)
{
var pattern = /^([a-zA-Z0-9]+\s?)*$/;
if (!pattern.test(txtarea)) {
	alert("Area should be of alphabets and digits only with a single space allowed..!");
	$("#txtarea").focus();
	return false;
  }		

}
if(txtaddrcountry !=""||txtaddrcountry !=null)
{
var pattern = /^([a-zA-Z]+\s?)*$/;
if (!pattern.test(txtaddrcountry)) {
	alert("Country should be of alphabets only with a single space allowed..!");
	$("#txtaddrcountry").focus();
	return false;
  }		

}
	var inputs = [];
	inputs.push('action=SavePartyMasterAddressDetails');
	inputs.push('txtpartymasterId=' + txtpartymasterId);
	inputs.push('txtaddressinfocode=' + txtaddressinfocode);
	inputs.push('radioBtn=' + radioBtn);
	inputs.push('txtaddresscompany=' + txtaddresscompany);
	inputs.push('txtadraddress=' + txtadraddress);
	inputs.push('txtstreet=' + txtstreet);
	inputs.push('txtarea=' + txtarea);
	inputs.push('txtaddrcity=' + txtaddrcity);
	inputs.push('txtaddrpin=' + txtaddrpin);
	inputs.push('txtaddrstate=' + txtaddrstate);
	inputs.push('txtaddrcountry=' + txtaddrcountry);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtaddresscompany").val("");
			$("#txtadraddress").val("");
			$("#txtstreet").val("");
			$("#txtarea").val("");
			$("#txtaddrcity").val("");
			$("#txtaddrpin").val("");
			$("#txtaddrstate").val("");
			$("#txtaddrcountry").val("");
			alert("Record saved successfully..!");
			getAddressInfoIdPurList();
			fetchPartyMasterAddressDetails();
		}
	});
}

function fetchPartyMasterAddressDetails() {
	var txtpartymasterId = $("#txtVendorCode").val();
	//alert(txtpartymasterId);
	var inputs = [];
	inputs.push('action=fetchPartyAddressDetails');
	inputs.push('isEdit=no');
	//inputs.push('txtaddressinfocode=' + txtaddressinfoId);
	inputs.push('txtpartymasterId=' + txtpartymasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//alert(r);
			counterPartyAddressInfo = 1;
			$("#AddressInfoTable").setTemplate(inventoryPartyAddressInfoTemp);
			$("#AddressInfoTable").processTemplate(pobj1);
			$("#PartyAddressTableInfoList").html(r);
			
			/*********************************************** featch address and mobile no for suppler name In purchase quatation  Date:24/6/2015 Author :sudhir ***********************************/
			var obj = $("#PartyAddressTableInfoList").html();
			var objPurchase = JSON.parse(obj);
			for(var row =0 ;row < objPurchase.ltinventorypartymasteraddressinfodto.length;row ++  )
			{
			/*$("#txtPurchaseQuotationMobileNo").val(objPurchase.ltinventorypartymastrecontactinfodto[row].party_contact_info_phone_number1);*/
			$("#txtPurchaseQuotationAddress").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
			break;
			}
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
			
		}
	});
}

function EditpartyAddressdetails(id) {
	//alert("ok id is"+id);
	var obj = $("#PartyAddressTableInfoList").html();
	objpartyaddress = JSON.parse(obj);
	var myAddrsObj = "";

	for ( var i = 0; i < objpartyaddress.ltinventorypartymasteraddressinfodto.length; i++) {
		if (objpartyaddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_id == id) {
			myAddrsObj = objpartyaddress.ltinventorypartymasteraddressinfodto[i];
			break;
		}
	}
	if (myAddrsObj.party_master_address_info_type == "BillingAddress") {
		$("#iBillingAddress").prop('checked', true);
	} else {
		$("#iShippingAddress").prop('checked', true);
	}

	$("#txtaddresscompany").val(myAddrsObj.party_master_address_info_company);
	$("#txtadraddress").val(myAddrsObj.party_master_address_info_address);
	$("#txtstreet").val(myAddrsObj.party_master_address_info_street);
	$("#txtarea").val(myAddrsObj.party_master_address_info_area);
	$("#txtaddrcity").val(myAddrsObj.party_master_address_info_city);
	$("#txtaddrpin").val(myAddrsObj.party_master_address_info_pin);
	$("#txtaddrstate").val(myAddrsObj.party_master_address_info_state);
	$("#txtaddrcountry").val(myAddrsObj.party_master_address_info_country);
	$("#txtaddressinfocode").val(id);

}

function DeletePartyAddressDetails(partyAddressId) {
	//alert("contct id is:" + partyAddressId);
	var txtpartymasterId = $("#txtVendorCode").val();
	//alert("party id:" + txtpartymasterId);
	var didConfirm = confirm("Are you sure?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePartyaddressdetails');
		inputs.push('partyAddressId=' + partyAddressId);
		inputs.push('txtpartymasterId=' + txtpartymasterId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				},
			success : function(r) {
				alert(r);
				fetchPartyMasterAddressDetails();
			}
		});
	}
}

function resetAddressInfoFields() {
	$("#txtaddresscompany").val("");
	$("#txtadraddress").val("");
	$("#txtstreet").val("");
	$("#txtarea").val("");
	$("#txtaddrcity").val("");
	$("#txtaddrpin").val("");
	$("#txtaddrstate").val("");
	$("#txtaddrcountry").val("");
	$("#iShippingAddress").val("");
	//$("#iBillingAddress").val("");

	$("#iShippingAddress").prop('checked', false);
	$("#iBillingAddress").prop('checked', true);
	getAddressInfoIdPurList();

}

/********************************************************new party master payment details******************************************************/
function getPaymentInfoIdPurList() {
	var inputs = [];
	inputs.push('action=txtpaymentid');
	inputs.push('tableName=inv_party_master_payment_info');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtpaymentid").val(r);
		}
	});
}

var counterPartyPaymentInfo = 1;
var inventoryPartyPaymentInfoTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Account Name</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Account No</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Address</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr></thead>"
		+ "{#foreach $T.ltinventorypartymasterpaymentinfo as ltinventorypartymasterpaymentinfo}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered' id='id{$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_id}'>{counterPartyPaymentInfo++}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_id}'>{$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_account_name}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_id}'>{$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_account_number}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_id}'>{$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_address}</td>"
		+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit' type='button' class='btn btn-xs btn-success' onclick='EditpartyPaymentdetails({$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_id})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'><button id='btnDelete' type='button' class='btn btn-xs btn-danger' onclick=\"DeletePartyPaymentDetails({$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";

function SavePartyMasterPaymentInfoDetails() {
	var txtpartymasterId = $("#txtVendorCode").val();
	//alert("master id :"+txtpartymasterId);
	var txtpaymentid = $("#txtpaymentid").val();
	//alert("master id :"+txtpaymentid);
	var txtpaymentterm = $("#txtpaymentterm").val();
	var txtcreditterm = $("#txtcreditterm").val();
	var txtbankname = $("#txtbankname").val();
	var txtaccountname = $("#txtaccountname").val();
	var txtaccountnumber = $("#txtaccountnumber").val();
	var txtifsc = $("#txtifsc").val();
	var txtcity = $("#txtcity").val();
	var txtpaymentaddress = $("#txtpaymentaddress").val();

	
	//validation
	var bankname= document.getElementById("txtbankname");
     var bank = bankname.options[bankname.selectedIndex].value;
     if(txtaccountname != "")
     {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(txtaccountname)) {
			alert("Payment Info:account name should be of alphabets only with a single space allowed..!");
			$("#txtaccountname").focus();
			return false;
		  }
     }
      
     if(txtifsc != "")
     {
    	 var pattern = /^([a-zA-Z0-9]+\s?)*$/;
    	  if (!pattern.test(txtifsc)) {
    		alert("Payment Info:IFSC/Branch should be of alphabets or digits only with a single space allowed..!");
    		$("#txtifsc").focus();
    		return false;
    	  }
     }
     
     
 	
     if(txtaccountnumber != "")
     {
    	 var pattern = /^([0-9])*$/;
   	     if (!pattern.test(txtaccountnumber)) {
   		alert("Payment Info:account number should be of digits only!");
   		$("#txtaccountnumber").focus();
   		return false;
   	  }
     }
    
     if(txtpaymentterm !="")
	  {
		  var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	 	  if (!pattern.test(txtpaymentterm)) {
	 		alert("Payment Info:Payment term should be of alphabets and digits only with a single space allowed..!");
	 		$("#txtpaymentterm").focus();
	 		return false;
	 	  }
	  
	  
	  }
     
	  if(txtcreditterm !="")
	  {
		  var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	 	  if (!pattern.test(txtcreditterm)) {
	 		alert("Payment Info:Credit term should be of alphabets and digits only with a single space allowed..!");
	 		$("#txtcreditterm").focus();
	 		return false;
	 	  }
	 	  
	  }
	  
	
		
	  if(txtcity != "")
	  {
		  var pattern = /^([a-zA-Z]+\s?)*$/;
	 	  if (!pattern.test(txtcity)) {
	 		alert("Payment Info:City should be of alphabets only with a single space allowed..!");
	 		$("#txtcity").focus();
	 		return false;
	 	  }
	  
	  
	  }
	  /*if(txtpaymentaddress != "")
	  {
		  var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	 	  if (!pattern.test(txtpaymentaddress)) {
	 		alert("Payment Info:Address should be of alphabets and digits only with a single space allowed..!");
	 		$("txtpaymentaddress").focus();
	 		return false;
	 	  }
	  
	  
	  }*/
     
	var inputs = [];
	inputs.push('action=SavePartyMasterPaymentDetails');
	inputs.push('txtpartymasterId=' + txtpartymasterId);
	inputs.push('txtpaymentid=' + txtpaymentid);
	inputs.push('txtpaymentterm=' + txtpaymentterm);
	inputs.push('txtcreditterm=' + txtcreditterm);
	inputs.push('txtbankname=' + txtbankname);
	inputs.push('txtaccountname=' + txtaccountname);
	inputs.push('txtaccountnumber=' + txtaccountnumber);
	inputs.push('txtifsc=' + txtifsc);
	inputs.push('txtcity=' + txtcity);
	inputs.push('txtpaymentaddress=' + txtpaymentaddress);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtpaymentterm").val("");
			$("#txtcreditterm").val("");
			$("#txtbankname").val("");
			$("#txtaccountname").val("");
			$("#txtaccountnumber").val("");
			$("#txtifsc").val("");
			$("#txtcity").val("");
			$("#txtpaymentaddress").val("");
			alert("Record saved successfully..!");
			getPaymentInfoIdPurList();
			fetchPartyMasterPaymentDetails();
		}
	});
}

function fetchPartyMasterPaymentDetails() {
	var txtpartymasterId = $("#txtVendorCode").val();
	//alert(txtpartymasterId);
	var inputs = [];
	inputs.push('action=fetchPartyPaymentDetails');
	inputs.push('isEdit=no');
	inputs.push('txtpartymasterId=' + txtpartymasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//alert(r);
			counterPartyPaymentInfo = 1;
			$("#PaymentInfoTable").setTemplate(inventoryPartyPaymentInfoTemp);
			$("#PaymentInfoTable").processTemplate(pobj1);
			$("#PartyPaymentInfoTableList").html(r);
		}
	});
}

function EditpartyPaymentdetails(id) {
	//alert("ok id is"+id);
	var obj = $("#PartyPaymentInfoTableList").html();
	objpartypayment = JSON.parse(obj);
	var myPaymentObj = "";

	for ( var i = 0; i < objpartypayment.ltinventorypartymasterpaymentinfo.length; i++) {
		if (objpartypayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_id == id) {
			myPaymentObj = objpartypayment.ltinventorypartymasterpaymentinfo[i];
			break;
		}
	}

	$("#txtpaymentterm").val(myPaymentObj.party_master_payment_info_term);
	$("#txtcreditterm").val(myPaymentObj.party_master_payment_info_credit_term);
	$("#txtbankname").val(myPaymentObj.party_master_payment_info_bank_name);
	$("#txtaccountname").val(
			myPaymentObj.party_master_payment_info_account_name);
	$("#txtaccountnumber").val(
			myPaymentObj.party_master_payment_info_account_number);
	$("#txtifsc").val(myPaymentObj.party_master_payment_info_ifsc);
	$("#txtcity").val(myPaymentObj.inv_party_master_payment_info_city);
	$("#txtpaymentaddress").val(myPaymentObj.party_master_payment_info_address);
	$("#txtpaymentid").val(id);

}

function DeletePartyPaymentDetails(paymentId) {
	//alert("contct id is:" + paymentId);
	var txtpartymasterId = $("#txtVendorCode").val();
	//alert("party id:" + txtpartymasterId);
	var didConfirm = confirm("Are you sure?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePartypaymentdetails');
		inputs.push('partypaymentId=' + paymentId);
		inputs.push('txtpartymasterId=' + txtpartymasterId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
			//	alert("error");
			},
			success : function(r) {
				alert(r);
				fetchPartyMasterPaymentDetails();
			}
		});
	}
}

function resetPaymentInfoFields() {
	$("#txtpaymentterm").val("");
	$("#txtcreditterm").val("");
	$("#txtbankname").val("");
	$("#txtaccountname").val("");
	$("#txtaccountnumber").val("");
	$("#txtifsc").val("");
	$("#txtcity").val("");
	$("#txtpaymentaddress").val("");
	getPaymentInfoIdPurList();
}

/******************************************************new party MASTER FOR PURSHACE ORDER PO**added in LIST*************************************************husen**/
function getGeneralInfoIdForPurListPO() {
	var inputs = [];
	inputs.push('action=txtcontactcode');
	inputs.push('tableName=inv_party_master_contact_info');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtcontactcodePO").val(r);
		}
	});
}

var counterPartyContactInfoPO = 1;
var inventoryPartyContactInfoTempPO = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Contact Person</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Designation</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Address</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr></thead>"
		+ "{#foreach $T.ltinventorypartymastrecontactinfodto as ltinventorypartymastrecontactinfodto}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered' id='id{$T.ltinventorypartymastrecontactinfodto.party_contact_info_id}'>{counterPartyContactInfoPO++}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymastrecontactinfodto.party_contact_info_id}'>{$T.ltinventorypartymastrecontactinfodto.party_contact_info_name}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymastrecontactinfodto.party_contact_info_id}'>{$T.ltinventorypartymastrecontactinfodto.party_contact_info_designation}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymastrecontactinfodto.party_contact_info_id}'>{$T.ltinventorypartymastrecontactinfodto.party_contact_info_address}</td>"
		+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit' type='button' class='btn btn-xs btn-success' value='EDIT' onclick='EditPartyContactsDetailsPO({$T.ltinventorypartymastrecontactinfodto.party_contact_info_id})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'><button id='btnDelete' value='Delete' type='button' class='btn btn-xs btn-danger' onclick=\"DeletePartyContactsDetailsPO({$T.ltinventorypartymastrecontactinfodto.party_contact_info_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";

function SavePartyMasterContactInfoDetailsPO() {
	var txtcontactInfoIdPO = $("#txtcontactcodePO").val();
	var txtpartymasterIdPO = $("#txtVendorCodePO").val();

	var txtcontactpersonPO = $("#txtcontactpersonPO").val();
	var txtdesignationPO = $("#txtdesignationPO").val();
	var txtcontaddressPO = $("#txtcontaddressPO").val();
	var txtgenderPO = $("#txtgenderPO").val();
	var txtdatePO = $("#txtdatePO").val();
	var txtphone1PO = $("#txtphone1PO").val();
	var txtphone2PO = $("#txtphone2PO").val();
	//var txtcontactmobile = $("#txtcontactmobile").val();
	var txtemail = $("#txtemailPO").val();

	
//validation
	
	if(txtcontactpersonPO !="")
	{
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(txtcontactpersonPO)) {
			alert("Person name should be of alphabets only with a single space allowed..!");
			$("#txtcontactpersonPO").focus();
			return false;
		  }
	}
	
	if(txtdesignationPO != "")
	{
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(txtdesignationPO)) {
			alert("Designation name should be of alphabets only with a single space allowed..!");
			$("#txtdesignation").focus();
			return false;
		  }
	}
	
	
	
	/*if(txtcontaddressPO != "")
	{
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtcontaddressPO)) {
			alert("Contact address should be of alphabets and digits  only with a single space allowed..!");
			$("#txtcontaddressPO").focus();
			return false;
		  }
	}*/
	
	
		
	if(txtphone1PO != "")
	{
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtphone1PO)) {
			alert("Phone1 should be of digits.!");
			$("#txtphone1PO").focus();
			return false;
		  }
	}
	
	if(txtphone2PO != "")
	{
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtphone2PO)) {
			alert("Phone2 should be of digits.!");
			$("#txtphone2PO").focus();
			return false;
		  }
		
	}
	if(txtemail != "")
		{
	    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    if (!filter.test(txtemail))
		    {
		    alert('Please provide a valid email address');
		    $("#txtemail").focus();
		    return false;
		    }
		
		
	}
	
	var inputs = [];
	inputs.push('action=SavePartyMasterContactDetails');
	inputs.push('txtcontactInfoId=' + txtcontactInfoIdPO);
	inputs.push('txtpartymasterId=' + txtpartymasterIdPO);
	inputs.push('txtcontactperson=' + txtcontactpersonPO);
	inputs.push('txtdesignation=' + txtdesignationPO);
	inputs.push('txtcontaddress=' + txtcontaddressPO);
	inputs.push('txtgender=' + txtgenderPO);
	inputs.push('txtdate=' + txtdatePO);
	inputs.push('txtphone1=' + txtphone1PO);
	inputs.push('txtphone2=' + txtphone2PO);
	//inputs.push('txtcontactmobile=' + txtcontactmobile);
	inputs.push('txtemail=' + txtemail);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		//	alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtcontactpersonPO").val("");
			$("#txtdesignationPO").val("");
			$("#txtgenderPO").val("");
			$("#txtcontaddressPO").val("");
			$("#txtdatePO").val("");
			$("#txtphone1PO").val("");
			$("#txtphone2PO").val("");
			//$("#txtcontactmobile").val("");
			$("#txtemailPO").val("");
			alert("Record saved successfully..!");
			getGeneralInfoIdForPurListPO();
			fetchPartyMasterContactsDetailsPO();
		}
	});
}

function fetchPartyMasterContactsDetailsPO() {
	var txtcontactInfoIdPO = $("#txtcontactcodePO").val();
	var txtpartymasterIdPO = $("#txtVendorCodePO").val();
	var inputs = [];
	inputs.push('action=fetchPartyContactsDetails');
	inputs.push('isEdit=no');
	inputs.push('txtcontactInfoId=' + txtcontactInfoIdPO);
	inputs.push('txtpartymasterId=' + txtpartymasterIdPO);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			 // alert(r);
			counterPartyContactInfoPO = 1;
			$("#ContactInfoTablePO").setTemplate(
					inventoryPartyContactInfoTempPO);
			$("#ContactInfoTablePO").processTemplate(pobj1);
			$("#PartyContactTableInfoListPO").html(r);
			
			/*********************************************** featch address and mobile no for suppler name In purchase Order Date:24/6/2015 Author :sudhir ***********************************/
			/*var obj = $("#PartyContactTableInfoListPO").html();
			var objPurchase = JSON.parse(obj);
			for(var row =0 ;row < objPurchase.ltinventorypartymastrecontactinfodto.length;row ++  )
			{
			$("#txtPurchaseOrderMobileNo").val(objPurchase.ltinventorypartymastrecontactinfodto[row].party_contact_info_phone_number1);
			$("#txtPurchaseOrderAddress").val(objPurchase.ltinventorypartymastrecontactinfodto[row].party_contact_info_address);
			break;
			}*/
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
				 
			
		}
	});
}

function EditPartyContactsDetailsPO(id) {
	var obj = $("#PartyContactTableInfoListPO").html();
	objpartycontactsDetail = JSON.parse(obj);
	var myobj = "";
	for ( var i = 0; i < objpartycontactsDetail.ltinventorypartymastrecontactinfodto.length; i++) {
		if (objpartycontactsDetail.ltinventorypartymastrecontactinfodto[i].party_contact_info_id == id) {
			myobj = objpartycontactsDetail.ltinventorypartymastrecontactinfodto[i];
			break;
		}
	}

	$("#txtcontactpersonPO").val(myobj.party_contact_info_name);
	$("#txtdesignationPO").val(myobj.party_contact_info_designation);
	$("#txtgenderPO").val(myobj.party_contact_info_gender);
	$("#txtcontaddressPO").val(myobj.party_contact_info_address);
	/**********************************date convert**************************************/
	var strdate="";
	if(myobj.party_contact_info_dob == "0000-00-00")
		{
		strdate="";
		$("#txtdatePO").val(strdate);
		}
	else{
		/*var str = (myobj.party_contact_info_dob).split("-");*/
		/*var bdate = str[2] + "-" + str[1] + "-" + str[0];*/
		$("#txtdatePO").val(myobj.party_contact_info_dob);	
		
	}
	

	$("#txtphone1PO").val(myobj.party_contact_info_phone_number1);
	$("#txtphone2PO").val(myobj.party_contact_info_phone_number2);
	//$("#txtcontactmobile").val(myobj.party_contact_info_mobile);
	$("#txtemailPO").val(myobj.party_contact_info_email);
	$("#txtcontactcodePO").val(id);

}

function DeletePartyContactsDetailsPO(partyContactId) {
	//alert("contct id is:" + partyContactId);
	var txtpartymasterIdPO = $("#txtVendorCodePO").val();
	//alert("party id:" + txtpartymasterId);
	var didConfirm = confirm("Are you sure?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePartycontactdetails');
		inputs.push('partyContactId=' + partyContactId);
		inputs.push('txtpartymasterId=' + txtpartymasterIdPO);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				//alert("error");
			},
			success : function(r) {
				alert(r);
				fetchPartyMasterContactsDetailsPO();
			}
		});
	}
}

function resetContactInfoFieldsPO() {
	$("#txtcontactpersonPO").val("");
	$("#txtdesignationPO").val("");
	$("#txtgenderPO").val("");
	$("#txtcontaddressPO").val("");
	$("#txtdatePO").val("");
	$("#txtphone1PO").val("");
	$("#txtphone2PO").val("");
	//$("#txtcontactmobile").val("");
	$("#txtemailPO").val("");
	getGeneralInfoIdForPurListPO();
}

/********************************************************new party address details PO******************************************************/
function getAddressInfoIdPurListPO() {
	var inputs = [];
	inputs.push('action=txtaddressinfocode');
	inputs.push('tableName=inv_party_master_address_info');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		//	alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			$("#txtaddressinfocodePO").val(r);
		}
	});
}

var counterPartyAddressInfoPO = 1;
var inventoryPartyAddressInfoTempPO = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Comapny</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Country</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>city</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr></thead>"
		+ "{#foreach $T.ltinventorypartymasteraddressinfodto as ltinventorypartymasteraddressinfodto}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered' id='id{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id}'>{counterPartyAddressInfoPO++}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id}'>{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_company}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id}'>{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_country}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id}'>{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_city}</td>"
		+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit' type='button' class='btn btn-xs btn-success' onclick='EditpartyAddressdetailsPO({$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'><button id='btnDelete' type='button' class='btn btn-xs btn-danger' onclick=\"DeletePartyAddressDetailsPO({$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";

function SavePartyMasterAddressInfoDetailsPO() {
	var txtpartymasterId = $("#txtVendorCodePO").val();
	//alert(txtpartymasterId);
	var txtaddressinfocode = $("#txtaddressinfocodePO").val();
	//alert(txtaddressinfocode);
	var radioBtn = null;
	if ($('#iBillingAddressPO').is(":checked") == true) {

		radioBtn = $("#iBillingAddressPO").val();
	}
	if ($('#iShippingAddressPO').is(":checked") == true) {
		radioBtn = $("#iShippingAddressPO").val();

	}
	var txtaddresscompany = $("#txtaddresscompanyPO").val();
	var txtadraddress = $("#txtadraddressPO").val();
	var txtstreet = $("#txtstreetPO").val();
	var txtarea = $("#txtareaPO").val();
	var txtaddrcity = $("#txtaddrcityPO").val();
	var txtaddrpin = $("#txtaddrpinPO").val();
	var txtaddrstate = $("#txtaddrstatePO").val();
	var txtaddrcountry = $("#txtaddrcountryPO").val();

	
	//validation
	if(txtaddresscompany != "")
	{
	var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(txtaddresscompany)) {
		alert("Company name should be of alphabets only with a single space allowed..!");
		$("#txtaddresscompanyPO").focus();
		return false;
	  }
	
	}


if(txtaddrcity != "")
{
	var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(txtaddrcity)) {
		alert("City name should be of alphabets only with a single space allowed..!");
		$("#txtaddrcityPO").focus();
		return false;
	  }

}


/*if(txtadraddress != "")
{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtadraddress)) {
		alert("Address should be of alphabets and digits only with a single space allowed..!");
		$("#txtadraddressPO").focus();
		return false;
	  }
}
*/


if(txtaddrpin != "")
{
	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtaddrpin)) {
		alert("Pin code should be of digits only!");
		$("#txtaddrpinPO").focus();
		return false;
	  }	
}


if(txtaddrstate != "")
{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtaddrstate)) {
		alert("State name should be of alphabets only with a single space allowed..!");
		$("#txtaddrstatePO").focus();
		return false;
	  }	
}


if(txtstreet !="")
	{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtstreet)) {
		alert("Street should be of alphabets and digits only with a single space allowed..!");
		$("#txtstreetPO").focus();
		return false;
	  }		
	
	}

if(txtarea !="")
{
var pattern = /^([a-zA-Z0-9]+\s?)*$/;
if (!pattern.test(txtarea)) {
	alert("Area should be of alphabets and digits only with a single space allowed..!");
	$("#txtareaPO").focus();
	return false;
  }		

}
if(txtaddrcountry !="")
{
var pattern = /^([a-zA-Z]+\s?)*$/;
if (!pattern.test(txtaddrcountry)) {
	alert("Country should be of alphabets only with a single space allowed..!");
	$("#txtaddrcountryPO").focus();
	return false;
  }		

}
	
	var inputs = [];
	inputs.push('action=SavePartyMasterAddressDetails');
	inputs.push('txtpartymasterId=' + txtpartymasterId);
	inputs.push('txtaddressinfocode=' + txtaddressinfocode);
	inputs.push('radioBtn=' + radioBtn);
	inputs.push('txtaddresscompany=' + txtaddresscompany);
	inputs.push('txtadraddress=' + txtadraddress);
	inputs.push('txtstreet=' + txtstreet);
	inputs.push('txtarea=' + txtarea);
	inputs.push('txtaddrcity=' + txtaddrcity);
	inputs.push('txtaddrpin=' + txtaddrpin);
	inputs.push('txtaddrstate=' + txtaddrstate);
	inputs.push('txtaddrcountry=' + txtaddrcountry);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtaddresscompanyPO").val("");
			$("#txtadraddressPO").val("");
			$("#txtstreetPO").val("");
			$("#txtareaPO").val("");
			$("#txtaddrcityPO").val("");
			$("#txtaddrpinPO").val("");
			$("#txtaddrstatePO").val("");
			$("#txtaddrcountryPO").val("");
			alert("Record saved successfully..!");
			getAddressInfoIdPurListPO();
			fetchPartyMasterAddressDetailsPO();
		}
	});
}

function fetchPartyMasterAddressDetailsPO() {
	var txtpartymasterId = $("#txtVendorCodePO").val();
	//alert(txtpartymasterId);
	var inputs = [];
	inputs.push('action=fetchPartyAddressDetails');
	inputs.push('isEdit=no');
	//inputs.push('txtaddressinfocode=' + txtaddressinfoId);
	inputs.push('txtpartymasterId=' + txtpartymasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//alert(r);
			counterPartyAddressInfoPO = 1;
			$("#AddressInfoTablePO").setTemplate(
					inventoryPartyAddressInfoTempPO);
			$("#AddressInfoTablePO").processTemplate(pobj1);
			$("#PartyAddressTableInfoListPO").html(r);
			
			/*********************************************** featch address and mobile no for suppler name In purchase Order Date:24/6/2015 Author :sudhir ***********************************/
			var obj = $("#PartyAddressTableInfoListPO").html();
			var objPurchase = JSON.parse(obj);
			for(var row =0 ;row < objPurchase.ltinventorypartymasteraddressinfodto.length;row ++  )
			{
			$("#txtPurchaseOrderAddress").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
			break;
			}
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
				 
			
			
		}
	});
}

function EditpartyAddressdetailsPO(id) {
	//alert("ok id is"+id);
	var obj = $("#PartyAddressTableInfoListPO").html();
	objpartyaddress = JSON.parse(obj);
	var myAddrsObj = "";

	for ( var i = 0; i < objpartyaddress.ltinventorypartymasteraddressinfodto.length; i++) {
		if (objpartyaddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_id == id) {
			myAddrsObj = objpartyaddress.ltinventorypartymasteraddressinfodto[i];
			break;
		}
	}
	if (myAddrsObj.party_master_address_info_type == "BillingAddress") {
		$("#iBillingAddressPO").prop('checked', true);
	} else {
		$("#iShippingAddressPO").prop('checked', true);
	}

	$("#txtaddresscompanyPO").val(myAddrsObj.party_master_address_info_company);
	$("#txtadraddressPO").val(myAddrsObj.party_master_address_info_address);
	$("#txtstreetPO").val(myAddrsObj.party_master_address_info_street);
	$("#txtareaPO").val(myAddrsObj.party_master_address_info_area);
	$("#txtaddrcityPO").val(myAddrsObj.party_master_address_info_city);
	$("#txtaddrpinPO").val(myAddrsObj.party_master_address_info_pin);
	$("#txtaddrstatePO").val(myAddrsObj.party_master_address_info_state);
	$("#txtaddrcountryPO").val(myAddrsObj.party_master_address_info_country);
	$("#txtaddressinfocodePO").val(id);

}

function DeletePartyAddressDetailsPO(partyAddressId) {
	//alert("contct id is:" + partyAddressId);
	var txtpartymasterId = $("#txtVendorCodePO").val();
	//alert("party id:" + txtpartymasterId);
	var didConfirm = confirm("Are you sure?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePartyaddressdetails');
		inputs.push('partyAddressId=' + partyAddressId);
		inputs.push('txtpartymasterId=' + txtpartymasterId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				//alert("error");
			},
			success : function(r) {
				alert(r);
				fetchPartyMasterAddressDetailsPO();
			}
		});
	}
}

function resetAddressInfoFieldsPO() {
	$("#txtaddresscompanyPO").val("");
	$("#txtadraddressPO").val("");
	$("#txtstreetPO").val("");
	$("#txtareaPO").val("");
	$("#txtaddrcityPO").val("");
	$("#txtaddrpinPO").val("");
	$("#txtaddrstatePO").val("");
	$("#txtaddrcountryPO").val("");
	$("#iShippingAddressPO").val("");
	//$("#iBillingAddress").val("");

	$("#iShippingAddressPO").prop('checked', false);
	$("#iBillingAddressPO").prop('checked', true);
	getAddressInfoIdPurListPO();

}





/************************** Featch taxcode By Autosuggetion  for purchase order Author :sudhir Date:26-6-2015***************** */
 

/*function autotaxCode(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchItemTaxcode');

		inputs.push('txtVal=' + txtVal1);
		inputs.push('isId=no');
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.inventoryTaxSetUps.length; i++) {
								availableTags
										.push(ajaxResponse.inventoryTaxSetUps[i].tax_code
												+ "_"
												+ ajaxResponse.inventoryTaxSetUps[i].tax_rate);
							}

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value= "'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);
							if (typeauto != 'onload') {
								$("#div" + inputID + " .typeahead").show();
							}

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult(item) {

			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var itemrate = item.value;
			
			$('#txtPurchaseQuotationTaxAmountPO' + idValue).val(itemrate);
			
			rowAmtCalPO(1,idValue);
			

		}
	}
}
*/



/************************** Featch taxcode By Autosuggetion  for purchase Queataion Author :sudhir Date:29-6-2015***************** */

function autotaxCodeQouetaion(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchItemTaxcode');

		inputs.push('txtVal=' + txtVal1);
		inputs.push('isId=no');
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						//alert('error');
					},
					success : function(r) {
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.inventoryTaxSetUps.length; i++) {
								availableTags
										.push(ajaxResponse.inventoryTaxSetUps[i].tax_code
												+ "_"
												+ ajaxResponse.inventoryTaxSetUps[i].tax_rate);
							}

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value= "'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);
							if (typeauto != 'onload') {
								$("#div" + inputID + " .typeahead").show();
							}

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult(item) {

			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var itemrate = item.value;
			
			$('#txtPurchaseQuotationTaxAmount' + idValue).val(itemrate);
			
			rowAmtCal(1,idValue);
			

		}
	}
}

/* ************************** chkTradAmtorPercentage Author: sudhir Date:27:10:2015  for PQ modified Date 15:12:2015**************************************/

function chkTradAmtorPercentage(id,rowcount)
{
	var txtPurchaseQuotationTrdeDiscountPercentage = $("#txtPurchaseQuotationTrdeDiscountPercentage"+rowcount).val();
	var txtTredeAmt = $("#txtPurchaseQuotationTrdeDiscountPercentage"+rowcount).val();
	
	 if(txtPurchaseQuotationTrdeDiscountPercentage == '' || txtPurchaseQuotationTrdeDiscountPercentage == null)
		 {
		 document.getElementById("txtPurchaseQuotationTrdeDiscountInRupess"+rowcount).disabled = false;
		 $("#txtPurchaseQuotationTrdeDiscountAmt"+rowcount).val(' ');
		 $("#txtPurchaseQuotationBaseAmount"+rowcount).val(' ');
		 $("#txtPurchaseQuotationRowAmount"+rowcount).val(' ');
		 }
	
	 if(!txtPurchaseQuotationTrdeDiscountPercentage == '' || !txtPurchaseQuotationTrdeDiscountPercentage == null)
	{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountInRupess"+rowcount).disabled = true;
		 $("#txtPurchaseQuotationTrdeDiscountInRupess" + rowcount).val(0);
		 calculTradeDis("txtPurchaseQuotationTrdeDiscountPercentage",rowcount);
	 }
	
	
}

function chKTradAmt(id,rowcount)
{
	var txtPurchaseQuotationTrdeDiscountInRupess = $("#txtPurchaseQuotationTrdeDiscountInRupess"+rowcount).val();
	
	if(txtPurchaseQuotationTrdeDiscountInRupess =='' || txtPurchaseQuotationTrdeDiscountInRupess == null )
		{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountPercentage"+rowcount).disabled = false;
		 $("#txtPurchaseQuotationTrdeDiscountAmt"+rowcount).val(' ');
		 $("#txtPurchaseQuotationBaseAmount"+rowcount).val(' ');
		 $("#txtPurchaseQuotationRowAmount"+rowcount).val(' ');
		 $("#txtPurchaseQuotationTotalDocDiscount").val('0');
		
		}
	
	if(txtPurchaseQuotationTrdeDiscountInRupess !='' || txtPurchaseQuotationTrdeDiscountInRupess != null )
		{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountPercentage"+rowcount).disabled = true;
		 $("#txtPurchaseQuotationTrdeDiscountPercentage" + rowcount).val(0);
		 var docqty = $("#txtPurchaseQuotationDocQuantity" +rowcount).val();
			var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowcount).val();
			var baseAmt = docqty * unitprise;
			var FinalBaseAmt = baseAmt - txtPurchaseQuotationTrdeDiscountInRupess;
			
			$("#txtPurchaseQuotationTrdeDiscountAmt"+rowcount).val(txtPurchaseQuotationTrdeDiscountInRupess);
			$("#txtPurchaseQuotationBaseAmount"+rowcount).val(FinalBaseAmt);
			rowAmtCal(1,rowcount);
			calculTradeDisRs("txtPurchaseQuotationTrdeDiscountInRupess",rowcount);
			totalGrossAmt(1,rowcount);
			totalVatAmt(1,rowcount);
		 
		}
	 
}

/*calculate Total TradeDis Discount IN rupess @Date14june2016 @Authour Sudhir*/ 
/***modified Date:1jully2016 reason:remove 100 > validation for AMt @Author:sudhir***/
function calculTradeDisRs(id, rowCount) {
	
	var treadeDiscountRs = $("#txtPurchaseQuotationTrdeDiscountInRupess" + rowCount).val();
	var oldbaseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	
	
	/*if(treadeDiscountRs > 100 )
	{
		alert("Trade Discount should not more than 100" );
		$("#txtPurchaseQuotationTrdeDiscountInRupess"+ rowCount).val('');
		
		$("#txtPurchaseQuotationTrdeDiscountAmt"+rowCount).val('');
		$("#txtPurchaseQuotationBaseAmount"+rowCount).val('');
		$("#txtPurchaseQuotationRowAmount"+rowCount).val('');
		
		var docqty = $("#txtPurchaseQuotationDocQuantity" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowCount).val();
		
		var baseAmt = docqty * unitprise;
		$("#txtPurchaseQuotationBaseAmount"+rowCount).val(baseAmt);
		
		$("#txtPurchaseQuotationTrdeDiscountInRupess"+ rowCount).focus();
		
		
		return false;
		
	}
	else
	{
*/
	if (treadeDiscountRs) {
		
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val('');
		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');

		var docqty = $("#txtPurchaseQuotationDocQuantity" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowCount).val();

		var baseAmt = parseFloat(docqty) * parseFloat(unitprise);

		var finaltotalbaseAmt = parseFloat((baseAmt)) - parseFloat(treadeDiscountRs);

		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val(treadeDiscountRs);

		/*var finalBaseAmt = baseAmt - totalAmtInpercntage;*/
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(finaltotalbaseAmt.toFixed(2));
		
		 
		/*var oldTotaldiscount = $("#txtPurchaseQuotationTotalDocDiscount").val();*/
		
		var RowCount =$("#RowCount").val();
		var totaltblsize  = $("#totaltblsize").val();
		
		var FinaltradeDiscount = 0;
		for(var i=1; i<=totaltblsize; i++)
			{
			
			var txtPurchaseQuotationTrdeDiscountAmt = $("#txtPurchaseQuotationTrdeDiscountAmt"+ i).val();
			
			if(txtPurchaseQuotationTrdeDiscountAmt != '' && txtPurchaseQuotationTrdeDiscountAmt != null &&  txtPurchaseQuotationTrdeDiscountAmt !=  undefined)
			{
				  FinaltradeDiscount = (parseFloat(FinaltradeDiscount) + parseFloat(txtPurchaseQuotationTrdeDiscountAmt)).toFixed(2);
			}
			
			}
		
		
		$("#txtPurchaseQuotationTotalDocDiscount").val(FinaltradeDiscount);
		
	}
	/*}*/
	/*rowAmtCal(1,rowCount);
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);*/
	/*rowCount(1,rowCount);*/
}




/* ************************** chkTradAmtorPercentage Author: sudhir Date:27:10:2015  for PO **************************************/

function chkTradAmtorPercentagePO(id,rowcount)
{
	var txtPurchaseQuotationTrdeDiscountPercentage = $("#txtPurchaseQuotationTrdeDiscountPercentagePO"+rowcount).val();
	var txtTredeAmt = $("#txtPurchaseQuotationTrdeDiscountPercentagePO"+rowcount).val();
	
	 if(txtPurchaseQuotationTrdeDiscountPercentage == '' || txtPurchaseQuotationTrdeDiscountPercentage == null)
		 {
		 document.getElementById("txtPurchaseQuotationTrdeDiscountInRupessPO"+rowcount).disabled = false;
		 $("#txtPurchaseQuotationTrdeDiscountAmtPO"+rowcount).val(' ');
		 $("#txtPurchaseQuotationBaseAmountPO"+rowcount).val(' ');
		 $("#txtPurchaseQuotationRowAmountPO"+rowcount).val(' ');
		 }
	
	 if(!txtPurchaseQuotationTrdeDiscountPercentage == '' || !txtPurchaseQuotationTrdeDiscountPercentage == null)
	{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountInRupessPO"+rowcount).disabled = true;
		 $("#txtPurchaseQuotationTrdeDiscountInRupessPO" + rowcount).val(0);
		 calculTradeDisPO("txtPurchaseQuotationTrdeDiscountPercentagePO",rowcount);
	 }
	
	
}

/* ************************** chKTradAmtPO  Author: sudhir Date:27:10:2015  for PO modified Date 14june2016 **************************************/
function chKTradAmtPO(id,rowcount)
{
	var txtPurchaseQuotationTrdeDiscountInRupess = $("#txtPurchaseQuotationTrdeDiscountInRupessPO"+rowcount).val();
	
	if(txtPurchaseQuotationTrdeDiscountInRupess =='' || txtPurchaseQuotationTrdeDiscountInRupess == null )
		{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountPercentagePO"+rowcount).disabled = false;
		 $("#txtPurchaseQuotationTrdeDiscountAmtPO"+rowcount).val(' ');
		 $("#txtPurchaseQuotationBaseAmountPO"+rowcount).val(' ');
		 $("#txtPurchaseQuotationRowAmountPO"+rowcount).val(' ');
		 $("#txtPurchaseOrderTotalDocDiscount").val('0');
		
		}
	
	if(txtPurchaseQuotationTrdeDiscountInRupess !='' || txtPurchaseQuotationTrdeDiscountInRupess != null )
		{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountPercentagePO"+rowcount).disabled = true;
		 $("#txtPurchaseQuotationTrdeDiscountPercentagePO" + rowcount).val(0);
		 var docqty = $("#txtPurchaseQuotationDocQuantityPO" +rowcount).val();
			var unitprise = $("#txtPurchaseQuotationUnitPricePO" + rowcount).val();
			var baseAmt = docqty * unitprise;
			var FinalBaseAmt = baseAmt - txtPurchaseQuotationTrdeDiscountInRupess;
			
			$("#txtPurchaseQuotationTrdeDiscountAmtPO"+rowcount).val(txtPurchaseQuotationTrdeDiscountInRupess);
			$("#txtPurchaseQuotationBaseAmountPO"+rowcount).val(FinalBaseAmt);
			rowAmtCalPO(1,rowCount);
			calculTradeDisRsPO("txtPurchaseQuotationTrdeDiscountInRupessPO",rowcount);
			totalGrossAmtPO(1,rowcount);
			totalVatAmtPO(1,rowcount);
		 
		}
	 
}


/*calculate Total TradeDis Discount IN rupess @Date14june2016 @Authour Sudhir*/ 
/***modified Date:1jully2016 reason:remove 100 > validation for AMt @Author:sudhir***/
function calculTradeDisRsPO(id, rowCount) {
	
	var treadeDiscountRs = $("#txtPurchaseQuotationTrdeDiscountInRupessPO" + rowCount).val();
	var oldbaseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	
/*	
	if(treadeDiscountRs > 100 )
	{
		alert("Trade Discount should not more than 100" );
		$("#txtPurchaseQuotationTrdeDiscountInRupessPO"+ rowCount).val('');
		
		$("#txtPurchaseQuotationTrdeDiscountAmtPO"+rowCount).val('');
		$("#txtPurchaseQuotationBaseAmountPO"+rowCount).val('');
		$("#txtPurchaseQuotationRowAmountPO"+rowCount).val('');
		
		var docqty = $("#txtPurchaseQuotationDocQuantityPO" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPricePO" + rowCount).val();
		
		var baseAmt = docqty * unitprise;
		$("#txtPurchaseQuotationBaseAmountPO"+rowCount).val(baseAmt);
		
		$("#txtPurchaseQuotationTrdeDiscountInRupessPO"+ rowCount).focus();
		
		
		return false;
		
	}
	else
	{
*/
	if (treadeDiscountRs) {
		
		$('#txtPurchaseQuotationBaseAmountPO' + rowCount).val('');
		$('#txtPurchaseQuotationTrdeDiscountAmtPO' + rowCount).val('');

		var docqty = $("#txtPurchaseQuotationDocQuantityPO" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPricePO" + rowCount).val();

		var baseAmt = parseFloat(docqty) * parseFloat(unitprise);

		var finaltotalbaseAmt = parseFloat((baseAmt)) - parseFloat(treadeDiscountRs);

		$('#txtPurchaseQuotationTrdeDiscountAmtPO' + rowCount).val(treadeDiscountRs);

		/*var finalBaseAmt = baseAmt - totalAmtInpercntage;*/
		$('#txtPurchaseQuotationBaseAmountPO' + rowCount).val(finaltotalbaseAmt.toFixed(2));
		
		 
		/*var oldTotaldiscount = $("#txtPurchaseQuotationTotalDocDiscount").val();*/
		
		var RowCount =$("#RowCountPO").val();
		var totaltblsize  = $("#totaltblsize").val();
		
		var FinaltradeDiscount = 0;
		for(var i=1; i<=totaltblsize; i++)
			{
			
			var txtPurchaseQuotationTrdeDiscountAmt = $("#txtPurchaseQuotationTrdeDiscountAmtPO"+ i).val();
			
			if(txtPurchaseQuotationTrdeDiscountAmt != '' && txtPurchaseQuotationTrdeDiscountAmt != null &&  txtPurchaseQuotationTrdeDiscountAmt !=  undefined)
			{
				  FinaltradeDiscount = (parseFloat(FinaltradeDiscount) + parseFloat(txtPurchaseQuotationTrdeDiscountAmt)).toFixed(2);
			}
			
			}
		
		
		$("#txtPurchaseOrderTotalDocDiscount").val(FinaltradeDiscount);
		
	}
	/*}*/
	/*rowAmtCal(1,rowCount);
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);*/
	/*rowCount(1,rowCount);*/
}




/******************** taxcalculation author:sudhir Date:11:12:2012  for purchase Order **********************/

/*function taxcalculationPO(id ,rowCount){
	var taxcodeandrate = $("#txtPurchaseQuotationTaxCodePO_"+rowCount).val();
	if(taxcodeandrate=="Select")
		{
		alert("please Select Tax");
		return false;
		}
	var taxRate =  taxcodeandrate.split("_");
	var finalRate = taxRate[1];
	$("#txtPurchaseQuotationTaxAmountPO"+rowCount).val(finalRate);
	rowAmtCalPO(1,rowCount);
}*/

/*********************** ***** getTaxcodeandRate for purchase order Author Sudhir Date:15:12:2015 ************ *********** *******/

function getTaxcodeandRate(id ,rowCount)
{
	var txtPurchaseQuotationItemNamePO_ = $("#txtPurchaseQuotationItemNamePO_"+rowCount).val();
	var txtPurchaseQuotationItemNumberPO = $("#txtPurchaseQuotationItemNumberPO"+rowCount).val();
	var txtPurchaseQuotationTaxCodePO_ = "";
	$('#txtPurchaseQuotationTaxCodePO_'+ rowCount).find('option').each(function() {
		txtPurchaseQuotationTaxCodePO_ = txtPurchaseQuotationTaxCodePO_ + ($(this).val());
	});
	
	
	if(txtPurchaseQuotationTaxCodePO_ == "" || txtPurchaseQuotationTaxCodePO_== null)
		{
		
		var inputs = [];
		inputs.push('action=fetchItemPurchaseandItemMasterDetails');
		inputs.push('itemId=' + txtPurchaseQuotationItemNumberPO);
		inputs.push('isId=yes');
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						ajaxResponse = eval('(' + r + ')');
						for ( var i = 0; i < ajaxResponse.inventoryitempurchaseandItemMasterDTOs.length; i++) {

							/*$('#txtPurchaseQuotationUnitPricePO' + idValue)
									.val(
											ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_unit_price);
							$('#txtPurchaseQuotationFactor1PO' + idValue)
									.val(
											ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor1);
							$('#txtPurchaseQuotationFactor2PO' + idValue)
									.val(
											ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor2);
							$('#txtPurchaseQuotationFactor3PO' + idValue)
									.val(
											ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor3);
							$('#txtPurchaseQuotationFactor4PO' + idValue)
									.val(
											ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor4);
							$(
									'#txtPurchaseQuotationDocQuantityPO'
											+ idValue)
									.val(
											ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);
							
							$('#txtPurchaseQuotationPendingQuantityPO'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);*/
							//for UOM of factors 
							$('#txtPurchaseQuotationFactor1UOMPO' + rowCount)
							.text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_1);
							
					$('#txtPurchaseQuotationFactor2UOMPO' + rowCount)
							.text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_2);
					$('#txtPurchaseQuotationFactor3UOMPO' + rowCount)
							.text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_3);
					$('#txtPurchaseQuotationFactor4UOMPO' + rowCount).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_4);
					$('#txtPurchaseQuotationLastFactorUOMPO' +rowCount).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenLastUOM);
							
							
							var txtPurchaseQuotationTaxCode = ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].inv_item_taxcode_and_rate;
							var Finalrateandtax = txtPurchaseQuotationTaxCode.split(",");
							var finalrat;
							var finalRateamt;
							var sumofRate = 0;
							for(k=0;k<Finalrateandtax.length;k++)
								{ 
								finalrat = Finalrateandtax[k];
								
								var taxRate =  finalrat.split("_");
								finalRateamt = taxRate[1];
								
								sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
								
								var option = "";
								option = option
									+ "<option value="
									+ finalrat
									+ ">"
									+ finalrat
									+ "</option>";
							$("#txtPurchaseQuotationTaxCodePO_"+rowCount).append(option);
								}
							//totalAmountPO();
							$("#txtPurchaseQuotationTaxAmountPO"+rowCount).val(sumofRate);
							break;
						}

					}
				});

		}
	
}


/************************************ getTaxcodeandRatePQ for purchase Quotation Author :sudhir Date:15:12:2015 ***************/

function getTaxcodeandRatePQ(id,rowCount)
{
	var txtPurchaseQuotationItemName_ = $("#txtPurchaseQuotationItemName_"+rowCount).val();
	var txtPurchaseQuotationItemNumber = $("#txtPurchaseQuotationItemNumber"+rowCount).val();
	
	
	var txtPurchaseQuotationTaxCode_ = "";
	$('#txtPurchaseQuotationTaxCode_'+ rowCount).find('option').each(function() {
		txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val());
	});

	if(txtPurchaseQuotationTaxCode_ == "" || txtPurchaseQuotationTaxCode_== null)
	{
	var inputs = [];
	inputs.push('action=fetchItemPurchaseandItemMasterDetails');
	inputs.push('itemId=' + txtPurchaseQuotationItemNumber);
	inputs.push('isId=yes');
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					//alert("error");
				},
				success : function(r) {
					ajaxResponse = eval('(' + r + ')');
					for ( var i = 0; i < ajaxResponse.inventoryitempurchaseandItemMasterDTOs.length; i++) {

						
						/*$('#txtPurchaseQuotationUnitPricePO' + idValue)
								.val(
										ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_unit_price);
						$('#txtPurchaseQuotationFactor1PO' + idValue)
								.val(
										ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor1);
						$('#txtPurchaseQuotationFactor2PO' + idValue)
								.val(
										ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor2);
						$('#txtPurchaseQuotationFactor3PO' + idValue)
								.val(
										ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor3);
						$('#txtPurchaseQuotationFactor4PO' + idValue)
								.val(
										ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor4);
						$(
								'#txtPurchaseQuotationDocQuantityPO'
										+ idValue)
								.val(
										ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);
						
						$('#txtPurchaseQuotationPendingQuantityPO'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);*/
						
						//for UOM of factors 
						$('#txtPurchaseQuotationFactor1UOM' + rowCount)
						.text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_1);
						
				$('#txtPurchaseQuotationFactor2UOM' + rowCount)
						.text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_2);
				$('#txtPurchaseQuotationFactor3UOM' + rowCount)
						.text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_3);
				$('#txtPurchaseQuotationFactor4UOM' + rowCount).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_4);
				$('#txtPurchaseQuotationLastFactorUOM' + rowCount).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenLastUOM);
						var txtPurchaseQuotationTaxCode = ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].inv_item_taxcode_and_rate;
						var Finalrateandtax = txtPurchaseQuotationTaxCode.split(",");
						var finalrat;
						var finalRateamt;
						var sumofRate = 0;
						for(k=0;k<Finalrateandtax.length;k++)
							{ 
							finalrat = Finalrateandtax[k];
							
							var taxRate =  finalrat.split("_");
							finalRateamt = taxRate[1];
							
							sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
							
							var option = "";
							option = option
								+ "<option value="+finalrat +">"+finalrat +" </option>";
						$("#txtPurchaseQuotationTaxCode_"+rowCount).append(option);
							}
						//totalAmountPO();
						$("#txtPurchaseQuotationTaxAmount"+rowCount).val(sumofRate);
						break;
					}

				}
			});
	
	}
	
}


/******************** taxcalculation author:sudhir Date:11:12:2012  for purchase Quotation **********************/

/*function taxcalculationPQ(id ,rowCount){
	var taxcodeandrate = $("#txtPurchaseQuotationTaxCode_"+rowCount).val();
	if(taxcodeandrate=="Select")
		{
		alert("please Select Tax");
		return false;
		}
	var taxRate =  taxcodeandrate.split("_");
	var finalRate = taxRate[1];
	$("#txtPurchaseQuotationTaxAmount"+rowCount).val(finalRate);
	rowAmtCal(1,rowCount);
}*/


/********************** multipletaxCalculation Author sudhir Date:11/1/2016 for Purchase Order *****************/
function multipletaxCalculation(id ,rowCount)
{
	var txtPurchaseQuotationTaxCode1_ = "";
	$('#txtPurchaseQuotationTaxCodePO_'+ rowCount).find('option:selected').each(function() {
		txtPurchaseQuotationTaxCode1_ = txtPurchaseQuotationTaxCode1_ + ($(this).val() + ",");
	});
	if(txtPurchaseQuotationTaxCode1_== "")
		{
		var txtPurchaseQuotationTaxCode_ = "";
		$('#txtPurchaseQuotationTaxCodePO_'+ rowCount).find('option').each(function() {
			txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
		});
		 txtPurchaseQuotationTaxCode_= txtPurchaseQuotationTaxCode_.substring(0, txtPurchaseQuotationTaxCode_.length-1);
		 var Finalrateandtax = txtPurchaseQuotationTaxCode_.split(",");
			var finalrat;
			var finalRateamt;
			var sumofRate = 0;
			for( var i=0;i<Finalrateandtax.length;i++)
				{ 
				finalrat = Finalrateandtax[i];
				
				var taxRate =  finalrat.split("_");
				finalRateamt = taxRate[1];
				
				sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
				 
				}
		 
		}
	else{
		txtPurchaseQuotationTaxCode1_= txtPurchaseQuotationTaxCode1_.substring(0, txtPurchaseQuotationTaxCode1_.length-1);
		var Finalrateandtax = txtPurchaseQuotationTaxCode1_.split(",");
		var finalrat;
		var finalRateamt;
		var sumofRate = 0;
		for(var i=0;i<Finalrateandtax.length;i++)
			{ 
			finalrat = Finalrateandtax[i];
			
			var taxRate =  finalrat.split("_");
			finalRateamt = taxRate[1];
			
			sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
			 
			}
		}
	
	//totalAmount();
	$("#txtPurchaseQuotationTaxAmount"+rowCount).val(sumofRate);
	rowAmtCal(1,rowCount);
	
}





/********************************* applyTaxforItem for item in purchase Quaotation Author:sudhir Date:12 jan 2016 *****************************/
function  applyTaxforItem(){
	
	var txtPurchaseOrderTaxCode_ = "";
	 
	// remove the wite space and empty option
	$('select option').filter(function() {
	    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
	}).remove();
	
	$('#lstBoxforTax').find('option').each(function() {
		txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_ + ($(this).val() + ",");
	});
	if(txtPurchaseOrderTaxCode_== ',')
	{
		alert("Please Apply Atleast One Tax ");
		return false;
	}
	 
	
	txtPurchaseOrderTaxCode_= txtPurchaseOrderTaxCode_.substring(0, txtPurchaseOrderTaxCode_.length-1);
	var rowCount = $("#hiddenCount").val();
	var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");
	
	 //$("#txtPurchaseQuotationTaxCodePO_"+rowCount).remove();
	//$('#txtPurchaseQuotationTaxCodePO_'+rowCount+'option').remove();
	$("#txtPurchaseQuotationTaxCode_" + rowCount + " option").remove();
	//$('#txtPurchaseQuotationTaxCodePO_'+rowCount).val('');
	
	 var sumofRate = 0;
	 for(var i=0;i<Finalrateandtax.length;i++)
		{ 
		finalrat = Finalrateandtax[i];
		var taxRate =  finalrat.split("_");
		finalRateamt = taxRate[1];
		
		sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
		
		var option = "";
		option = option
			+ "<option value="
			+ finalrat
			+ ">"
			+ finalrat
			+ "</option>";
	$("#txtPurchaseQuotationTaxCode_"+rowCount).append(option);
		}
	$("#txtPurchaseQuotationTaxAmount"+rowCount).val(sumofRate);
	$('#lstBoxforTax').html();
	$("#ApplyTaxforItem").hide('hide');
	rowAmtCal(1,rowCount);
	totalVatAmt(1,rowCount);
	
	
}
/********************************* End applyTaxforItem for item in purchase Quaotation Author:sudhir Date:12 jan 2016 *****************************/
/********************************* hideApplyTaxpopaup for item in purchase Quaotation Author:sudhir Date:12 jan 2016 *****************************/
 function  hideApplyTaxpopaup() {
	 $('#lstBoxforTax').html();
	 $("#ApplyTaxforItem").hide();	
 		}
 /********************************* End hideApplyTaxpopaup for item in purchase Quaotation Author:sudhir Date:12 jan 2016 *****************************/
 
 /**
    ***select * Tax code and tax rate for purchase Quatation ** **Author:Sudhir Date:12:jan:2016 *** ***
  */
 function addItemTaxName() {
 	//var pid = $("#hiddenPartyId").val();
 	var taxcodeandrate = $("#txtNewTax1").val();
 	if (taxcodeandrate == '') {
 		alert("Please Select Tax.");
 		return false;
 	}
 	var add = taxcodeandrate;
 	//var partyid = pid;

 	var flag = 1;
 	$('#lstBoxforTax').find('option').each(function() {
 		if ($(this).html() == add) {
 			alert("Tax Is Present In List");
 			flag = 0;
 		}
 	});
 	if (flag == 1) {
 		var o = new Option("option text", "value");
 		// / jquerify the DOM object 'o' so we can use the html method
 		$(o).html(add);
 		$(o).val(taxcodeandrate);
 		$("#lstBoxforTax").append(o);
 		$("#txtNewTax1").val("");
 		
 	// remove the wite space and empty option
 		$('select option').filter(function() {
 		    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
 		}).remove();
 	}
 }
 /************************remove tax code and rate from list purchase Quaotation *********Author:Sudhir Date:11:jan:2016 ************************/
 function removeItemTax() {

 	$('#lstBoxforTax option:selected').remove();
 }
 
 /************** multipletaxCalculationPQ apply multiple tax for items for purchase Quaotation  in List Author: sudhir Date:12 jan 2016 ********/
 function multipletaxCalculationPQ(id ,rowCount)
 {
 	$("#ApplyTaxforItem").show();
 	
 	var txtPurchaseQuotationTaxCode_ = "";
 	$('#txtPurchaseQuotationTaxCode_'+ rowCount).find('option').each(function() {
 		txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
 	});
 	//alert(txtPurchaseQuotationTaxCode_);
 	$("#hiddenCount").val(rowCount);
 	$("#lstBoxforTax").html(" ");
 	
 	var Finalrateandtax = txtPurchaseQuotationTaxCode_.split(",");
 	var finalrat;
 	for(var i=0;i<Finalrateandtax.length;i++)
 		{ 
 		finalrat = Finalrateandtax[i];
 		//var fk = Finalrateandtax.split(",");
 		var option = "";
 		option = option
 			+ "<option value="
 			+ finalrat
 			+ ">"
 			+ finalrat
 			+ "</option>";
 	$("#lstBoxforTax").append(option);
 		}
 	
 }
 
 /************** multipletaxCalculationPQ apply multiple tax for items for purchase Quaotation  in List Author: sudhir Date:12 jan 2016 ********/
 function multipletaxCalculationPQ(id ,rowCount)
 {
 	$("#ApplyTaxforItem").show();
 	
 	var txtPurchaseQuotationTaxCode_ = "";
 	$('#txtPurchaseQuotationTaxCode_'+ rowCount).find('option').each(function() {
 		txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
 	});
 	//alert(txtPurchaseQuotationTaxCode_);
 	$("#hiddenCount").val(rowCount);
 	$("#lstBoxforTax").html(" ");
 	
 	var Finalrateandtax = txtPurchaseQuotationTaxCode_.split(",");
 	var finalrat;
 	for(var i=0;i<Finalrateandtax.length;i++)
 		{ 
 		finalrat = Finalrateandtax[i];
 		//var fk = Finalrateandtax.split(",");
 		var option = "";
 		option = option
 			+ "<option value="
 			+ finalrat
 			+ ">"
 			+ finalrat
 			+ "</option>";
 	$("#lstBoxforTax").append(option);
 		}
 	
 	
 }
 
 /************** multipletaxCalculationPO apply multiple tax for items for purchase Order  in List Author: sudhir Date:12 jan 2016 ********/
 function multipletaxCalculationPO(id ,rowCount)
 {
	 $("#ApplyTaxforItem1").show();
 	var txtPurchaseQuotationTaxCode_ = "";
 	$('#txtPurchaseQuotationTaxCodePO_'+ rowCount).find('option').each(function() {
 		txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
 	});
 	//alert(txtPurchaseQuotationTaxCode_);
 	$("#hiddenCount1").val(rowCount);
 	$("#lstBoxforTax1").html(" ");
 	
 	var Finalrateandtax = txtPurchaseQuotationTaxCode_.split(",");
 	var finalrat;
 	for(var i=0;i<Finalrateandtax.length;i++)
 		{ 
 		finalrat = Finalrateandtax[i];
 		//var fk = Finalrateandtax.split(",");
 		var option = "";
 		option = option
 			+ "<option value="
 			+ finalrat
 			+ ">"
 			+ finalrat
 			+ "</option>";
 	$("#lstBoxforTax1").append(option);
 		}
	
 }
 
 /********************************* applyTaxforItem for item in purchase Order Author:sudhir Date:12 jan 2016 *****************************/
 function  applyTaxforItemPO(){
 	var txtPurchaseOrderTaxCode_ = "";
 	
 	$('select option').filter(function() {
	    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
	}).remove();
 	
 	$('#lstBoxforTax1').find('option').each(function() {
 		txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_ + ($(this).val() + ",");
 	});
 	 
 	if(txtPurchaseOrderTaxCode_== ',')
 	{
 		alert("Please Apply Atleast One Tax ");
 		return false;
 	}
 	
 	txtPurchaseOrderTaxCode_= txtPurchaseOrderTaxCode_.substring(0, txtPurchaseOrderTaxCode_.length-1);
 	var rowCount = $("#hiddenCount1").val();
 	var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");
 	
 	 //$("#txtPurchaseQuotationTaxCodePO_"+rowCount).remove();
 	//$('#txtPurchaseQuotationTaxCodePO_'+rowCount+'option').remove();
 	$("#txtPurchaseQuotationTaxCodePO_" + rowCount + " option").remove();
 	//$('#txtPurchaseQuotationTaxCodePO_'+rowCount).val('');
 	
 	 var sumofRate = 0;
 	 for(var i=0;i<Finalrateandtax.length;i++)
 		{ 
 		finalrat = Finalrateandtax[i];
 		var taxRate =  finalrat.split("_");
 		finalRateamt = taxRate[1];
 		
 		sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
 		
 		var option = "";
 		option = option
 			+ "<option value="
 			+ finalrat
 			+ ">"
 			+ finalrat
 			+ "</option>";
 	$("#txtPurchaseQuotationTaxCodePO_"+rowCount).append(option);
 		}
 	$("#txtPurchaseQuotationTaxAmountPO"+rowCount).val(sumofRate);
 	$('#lstBoxforTax1').html();
 	$("#ApplyTaxforItem1").hide();
 	rowAmtCalPO(1,rowCount);
 	totalVatAmtPO(1,rowCount);
 	
 }
 /********************************* End applyTaxforItem for item in purchase Quaotation Author:sudhir Date:12 jan 2016 *****************************/

 /********************************* hideApplyTaxpopaup for item in purchase Quaotation Author:sudhir Date:12 jan 2016 *****************************/
 function  hideApplyTaxpopaup1() {
	 $('#lstBoxforTax1').html();
	 $("#ApplyTaxforItem1").hide();	
 		}
 /********************************* End hideApplyTaxpopaup for item in purchase Quaotation Author:sudhir Date:12 jan 2016 *****************************/
 
 /************************remove tax code and rate from list purchase Order *********Author:Sudhir Date:11:jan:2016 ************************/
 function removeItemTax1() {

 	$('#lstBoxforTax1 option:selected').remove();
 }
 
 

 /** Featch taxcode By Autosuggetion for PURCHASE ORDER  * Author :sudhir Date:24:Feb:2016 ** */
 function autotaxCodeforItem(inputID, typeauto) {
 	var resultData = [];
 	var txtVal1 = $('#' + inputID).val();
 	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
 		var inputs = [];

 		inputs.push('action=fetchItemTaxcode');

 		inputs.push('txtVal=' + txtVal1);
 		inputs.push('isId=no');
 		var str = inputs.join('&');

 		jQuery
 				.ajax({
 					async : true,
 					type : "POST",
 					data : str + "&reqType=AJAX",
 					url : "InventoryServlet",
 					timeout : 1000 * 60 * 15,
 					cache : true,
 					error : function() {
 					//	alert('error');
 					},
 					success : function(r) {
 						//var availableTags = [];
 						if (r.length == 25) {
 							alert("NO MATCHING FOUND Please Enter Valid Tax Code");
 							// var arrValue1 = (inputID).split("_");
 							// var idValue1 = (arrValue1[1]);
 							$("#txtNewTax").val('');
 							$("#txtNewTax").focus();

 						} else {
 							ajaxResponse = eval('(' + r + ')');
 							//ajaxResponse = decodeURIComponent(r);
 							var availableTags = [];
 							availableTags = ajaxResponse;

 							/*for ( var i = 0; i < ajaxResponse.inventoryTaxSetUps.length; i++) {
 								availableTags
 										.push((ajaxResponse.inventoryTaxSetUps[i].tax_code)
 												+ "_"
 												+ (ajaxResponse.inventoryTaxSetUps[i].tax_rate));
 							}*/

 							var template = "";
 							for ( var j = 0; j < availableTags.length; j++) {
 								var arrValue = (availableTags[j]).split(",");
 								var idValue = (arrValue[1]);
 								resultData.push({
 									ID : idValue,
 									Name : arrValue[0]
 								});

 								template = template + '<li data-value="' + idValue
 								+ '" class=""><a href="#">' + arrValue[0] + "_"
 								+ idValue + '</a></li>';

 							}

 							$("#div" + inputID + " .typeahead").html(template);

 							if (typeauto != 'onload') {
 								$("#div" + inputID + " .typeahead").show();
 							}

 							setTimeout(function() {
 								$('#' + inputID).typeahead({
 									source : resultData,
 									displayField : 'Name',
 									valueField : 'ID',
 									onSelect : displayResult,
 									scrollBar : true

 								});
 								//$("#" + inputId).data("typeahead").source = resultData;
 							}, 500);
 						}
 					}
 				});

 		function displayResult(item) {

 			$("#" + inputID).val((item.text).trim());
 			//alert(item.value);

 		}
 	}
 }

 
 /***** select * Tax code and tax rate for purchase Order ** **Author:Sudhir Date:12:jan:2016 *** * */
function addItemTaxName1() {
	var taxcodeandrate = $("#txtNewTax").val();
	if (taxcodeandrate == '') {
		alert("Please Select Tax.");
		return false;
	}
	var add = taxcodeandrate;

	var flag = 1;
	$('#lstBoxforTax1').find('option').each(function() {
		if ($(this).html() == add) {
			alert("Tax Is Present In List");
			flag = 0;
		}
	});
	if (flag == 1) {
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(add);
		$(o).val(taxcodeandrate);
		$("#lstBoxforTax1").append(o);
		$("#txtNewTax").val("");
		$('select option').filter(function() {
 		    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
 		}).remove();
	}
}




/** Featch taxcode By Autosuggetion for PURCHASE Quotation  * Author :sudhir Date:24:Feb:2016 ** */
function autotaxCodeforItemPurQuotaion(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchItemTaxcode');

		inputs.push('txtVal=' + txtVal1);
		inputs.push('isId=no');
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						//alert('error');
					},
					success : function(r) {
						//var availableTags = [];
						if (r.length == 25) {
							alert("NO MATCHING FOUND Please Enter Valid Tax Code");
							// var arrValue1 = (inputID).split("_");
							// var idValue1 = (arrValue1[1]);
							$("#txtNewTax1").val('');
							$("#txtNewTax1").focus();

						} else {
							ajaxResponse = eval('(' + r + ')');
							//ajaxResponse = decodeURIComponent(r);
							var availableTags = [];
							availableTags = ajaxResponse;

							/*for ( var i = 0; i < ajaxResponse.inventoryTaxSetUps.length; i++) {
								availableTags
										.push((ajaxResponse.inventoryTaxSetUps[i].tax_code)
												+ "_"
												+ (ajaxResponse.inventoryTaxSetUps[i].tax_rate));
							}*/

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split(",");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0] + "_"
								+ idValue + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);

							if (typeauto != 'onload') {
								$("#div" + inputID + " .typeahead").show();
							}

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true

								});
								//$("#" + inputId).data("typeahead").source = resultData;
							}, 500);
						}
					}
				});

		function displayResult(item) {

			$("#" + inputID).val((item.text).trim());
			//alert(item.value);

		}
	}
}

/**** functions for purchase Order @Date : 9june 2016  @Author:Sudhir ******/

/***** Calculate Total Gross AMt  of Base Amt @Author Sudhir @Date:7june2016*******/
function totalGrossAmtPO(id, rowCount) {
	 	var sum = 0;
		var baseAmount;
		//var RowCount = $("#RowCountPO").val();
		var RowCount = $("#totaltblsize").val();
		
		// var totalRow = $("#totalRow").val();

		for ( var i = 1; i <= RowCount; i++) {
			baseAmount = $("#txtPurchaseQuotationBaseAmountPO" + i).val();
			if (baseAmount == null || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
				sum = parseFloat(sum) + parseFloat(baseAmount);
			}

		}
	    // alert(sum);
		$("#txtGross").val(sum.toFixed(2));

	}


/***** Calculate Total Vat AMt  @Author Sudhir @Date:7june2016*******/
function totalVatAmtPO(id, rowCount) {
	 
	 	var sum = 0;
		var baseAmount;
		//var RowCount = $("#RowCountPO").val();
		var RowCount = $("#totaltblsize").val();
		var caltaxonBaseAmt;
		// var totalRow = $("#totalRow").val();

		for ( var i = 1; i <= RowCount; i++) {
			baseAmount = $("#txtPurchaseQuotationBaseAmountPO" + i).val();
			var taxAmt = $("#txtPurchaseQuotationTaxAmountPO" + i).val();
			if (baseAmount == null || taxAmt == null ||taxAmt == undefined || taxAmt =='' || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
				
				caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;
				
				var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
				
				sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
			}

		}
		
		$("#txtVat").val(sum.toFixed(2));
		$("#txtTotalVat").val(sum.toFixed(2));
		$("#textVat").val(sum.toFixed(2));
	
		var totalgrossAmt = $("#txtGross").val(); 
		$("#txtNetAmt").val((parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

	}

/****** onblur calculateTotalTax under the Heading of TAx info @author Sudhir @Date:2june2016********/
function calculateTotalTax() {
		var txtVat = 0;
		var txtExVat = 0;
		var lbt = 0;
		var cst = 0;
		var totalTax = 0;
	    var gross=0;
	    var less=0;	
	    
		if ($('#txtVat').val() != '' && $('#txtVat').val().length > 0)
			txtVat = parseFloat($('#txtVat').val());

		if ($('#txtlbt').val() != '' && $('#txtlbt').val().length > 0)
			lbt = parseFloat($('#txtlbt').val());

		if ($('#txtcst').val() != '' && $('#txtcst').val().length > 0)
			cst = parseFloat($('#txtcst').val());
		
		if ($('#txtExVat').val() != '' && $('#txtExVat').val().length > 0)
			txtExVat = parseFloat($('#txtExVat').val());
	
		$('#txtTotalVat').val(parseFloat(txtVat) + parseFloat(txtExVat));

		totalTax = parseFloat(txtVat) + parseFloat(txtExVat) + parseFloat(lbt)
				+ parseFloat(cst);

		$('#textVat').val((totalTax).toFixed(2));
	
		/*	
		if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0)
			gross = parseFloat($('#txtGross').val());
		
		
		if ($('#txtLess').val() != '' && $('#txtLess').val().length > 0)
			less = parseFloat($('#txtLess').val());
		
		var amt=gross-less;
		 */
		
		
		
		$('#txtTotalVat').val((totalTax).toFixed(2));
		calculateNetAmount();
	}


/*** isFloatingPoint @Author :Sudhir @Date:2june 2016 ****/
function isFloatingPoint(id, minLen, maxLen) {
	var min = parseInt(minLen);
	var max = parseInt(maxLen);
   
	// alert("number field");
	var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
	var value1 = $('#' + id).val();
	
	if (min > value1.length || max < value1.length) {
		alert("Please Enter Only number!");
		$('#' + id).focus();
		return false;
	} else if (value1 != "" && !name1.test(value1)) {
		alert("Please Enter Only number!");
		$('#' + id).val('');
		$('#' + id).focus();
		return false;

	}
	return true;
}

/**** calculateNetAmount @author Sudhir @Date 2june2016*****/
function calculateNetAmount() {
		// net amount
		var gross = 0;
		var less = 0;
		var add = 0;
		var total = 0;

		if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0) {
			gross = parseFloat($('#txtGross').val());
		}
		if ($('#txtLess').val() != '' && $('#txtLess').val().length > 0) {
			less = parseFloat($('#txtLess').val());
		}
		if ($('#txtAdd').val() != '' && $('#txtAdd').val().length > 0) {
			add = parseFloat($('#txtAdd').val());
		}

		var vat = 0;
		if (gross > 0)
			total = (gross - less) + add;
		if ($('#textVat').val() != '' && $('#textVat').val().length > 0)
			vat = parseFloat($('#textVat').val());

		$('#txtNetAmt').val((total + vat).toFixed(2));
		//resetAllValues();
	}



/**** calculateTotalAdd onblure under heading of Add  @Author:Sudhir @Date:2june2016 ****/
function calculateTotalAdd() {
		/*
		 * var numbers = /^\d+(\.\d+)?$/; if (number.match(numbers)) {
		 * 
		 * totalLess = parseFloat(number) + parseFloat(totalLess);
		 * $('#txtLess').val(totalLess); }
		 */

		var octroi = 0;
		var surcharge = 0;
		var creditAmt = 0;
		var freight = 0;
		var totalAdd = 0;

		if ($('#txtOctroi').val() != '' && $('#txtOctroi').val().length > 0)
			octroi = parseFloat($('#txtOctroi').val());

		if ($('#txtSurcharge').val() != '' && $('#txtSurcharge').val().length > 0)
			surcharge = parseFloat($('#txtSurcharge').val());

		if ($('#txtCreditAmt').val() != '' && $('#txtCreditAmt').val().length > 0)
			creditAmt = parseFloat($('#txtCreditAmt').val());

		if ($('#txtFreight').val() != '' && $('#txtFreight').val().length > 0)
			freight = parseFloat($('#txtFreight').val());

		totalAdd = parseFloat(octroi) + parseFloat(surcharge) + parseFloat(creditAmt) + parseFloat(freight);

		$('#txtAdd').val(totalAdd.toFixed(2));
		calculateNetAmount();
	}




/*** calculatSpeDisct @author sudhir @Date:2june2016 ***/
function calculatSpeDisct() {
	var GrossAmt = parseFloat($('#txtGross').val());
	var less = parseFloat($('#txtLess').val());
	var finalvatafterreduece = 0;
	var txtSplDisc = 0;
	var txtVat = 0;
	
/* 	if (less > GrossAmt) {
		alert("Less Amount should be less than Gross Amount!");

		 $('#txtSchmDisc').focus();

		 $('#txtNetAmt').val('');
		$('#txtLess').val(0);
		$('#txtItemDisc').val('');
		$('#txtSchmDisc').val('');
		$('#txtSplDisc').val('');
		$('#txtdebitAmt1').val('');
		$('#txtdebitAmt1').val('');
		$('#txtCD1').val('');
		$('#txtVat12').val('');
		$('#txtTotalVat').val('');
		$('#textVat').val('');
		$('#txtNetAmt').val('');
	}*/
	
	
	if ($('#txtSplDisc').val() == '' || $('#txtSplDisc').val() == 0)
	{
	totalVatAmtPO(1, rowCount);
	calculateTotalTax();
	calculateTotalLess();
	calculateNetAmount();
	}
	
	if ($('#txtVat').val() != '' && $('#txtVat').val().length > 0)
		txtVat = parseFloat($('#txtVat').val());
	if ($('#txtSplDisc').val() != '' && $('#txtSplDisc').val().length > 0)
		txtSplDisc = parseFloat($('#txtSplDisc').val());
	 
	 finalvatafterreduece =	parseFloat(txtVat) - (parseFloat(txtVat) * parseFloat(txtSplDisc)/100);
	 
	$('#txtVat').val(finalvatafterreduece.toFixed(2));
	
	calculateTotalTax();
	calculateTotalLess();
	calculateNetAmount();
	 
}

/**** calculateCDAmt @Author:sudhir @Date:2june2016 *******/
function calculateCDAmt()
{
	var gross = 0;
	var itemDis = 0;
	var cd=0;
	var cdAmt=0;
	var amt=0;
	if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0) {
		gross = parseFloat($('#txtGross').val());
	}
	
	/*if ($('#txtItemDisc').val() != '' && $('#txtItemDisc').val().length > 0) {
		itemDis = parseFloat($('#txtItemDisc').val());
	}*/
	
	if ($('#txtCD1').val() != '' && $('#txtCD1').val().length > 0) {
		cd = parseFloat($('#txtCD1').val());
	}
	
	 //amt=(gross-itemDis);
	if(parseFloat(gross)>parseFloat(cd))
		{
		cdAmt = parseFloat(gross)*(parseFloat(cd)/100);
	 	$('#txtCDAmt').val(cdAmt.toFixed(2));
	 	calculateTotalLess();
		
		}
	else
		{
		alert("CD is less then Gross Amount!");
		$('#txtCDAmt').val('0');
		$('#txtCD1').val('0');
		calculateTotalLess();
		return false;
		}
	
}

/***** calculateTotalLess @Author Sudhir @Date:2june2016 modifeied Date:23june2016****/
function calculateTotalLess() {
		var itemDisc = 0;
		var schmDisc = 0;
		var splDisc = 0;
		var debitAmt1 = 0;
		var cd1 = 0;
		var totalLess = 0;

		/*if ($('#txtItemDisc').val() != '' && $('#txtItemDisc').val().length > 0)
			itemDisc = parseFloat($('#txtItemDisc').val());

		if ($('#txtSchmDisc').val() != '' && $('#txtSchmDisc').val().length > 0)
			schmDisc = parseFloat($('#txtSchmDisc').val());*/

		if ($('#txtSplDisc').val() != '' && $('#txtSplDisc').val().length > 0)
			splDisc = parseFloat($('#txtSplDisc').val());

		if ($('#txtdebitAmt1').val() != '' && $('#txtdebitAmt1').val().length > 0)
			debitAmt1 = parseFloat($('#txtdebitAmt1').val());

		if ($('#txtCDAmt').val() != '' && $('#txtCDAmt').val().length > 0)
			cd1 = parseFloat($('#txtCDAmt').val());

		totalLess = parseFloat(splDisc) + parseFloat(debitAmt1) + parseFloat(cd1);

		$('#txtLess').val(totalLess.toFixed(2));

		calculateNetAmount();
	}

  
/*** setRoundNetAmount  @author sudhir @Date3june2016 ***/

function setRoundNetAmount() {
	 if ($('#txtNetAmt').val() == null && $('#txtNetAmt').val() == '') {
		 alert("please Enter Net Amount");
		 return false;
		 
	 }
	 else
		 {
		 var retVal = confirm("Do you want to Round off Net Amount  ?");
		 if(retVal)
			 {
			 var r = Math.round($('#txtNetAmt').val()); 
			  $("#txtNetAmt").val(r);
			 }
		 else
			 {
			 	calculateNetAmount();
			 }
		 }
	  
	}

/**** End functions for purchase Order @Date : 9june 2016  @Author:Sudhir ******/



/**** functions for purchase Qoataion @Date:9june 2016  @Author:Sudhir ******/

/***** Calculate Total Gross AMt  of Base Amt @Author Sudhir @Date:7june2016*******/
function totalGrossAmt(id, rowCount) {
	 	var sum = 0;
		var baseAmount;
		var RowCount = $("#RowCount").val();
		// var totalRow = $("#totalRow").val();

		for ( var i = 1; i <= RowCount; i++) {
			baseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
			if (baseAmount == null || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
				sum = parseFloat(sum) + parseFloat(baseAmount);
			}

		}
	    // alert(sum);
		$("#txtGrossPQ").val(sum.toFixed(2));

	}


/***** Calculate Total Vat AMt  @Author Sudhir @Date:7june2016*******/
function totalVatAmt(id, rowCount) {
	 
	 	var sum = 0;
		var baseAmount;
		var RowCount = $("#RowCount").val();
		var caltaxonBaseAmt;
		// var totalRow = $("#totalRow").val();

		for ( var i = 1; i <= RowCount; i++) {
			baseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
			var taxAmt = $("#txtPurchaseQuotationTaxAmount" + i).val();
			if (baseAmount == null || taxAmt == null ||taxAmt == undefined || taxAmt =='' || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
				
				caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;
				
				var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
				
				sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
			}

		}
		
		$("#txtVatPQ").val(sum.toFixed(2));
		$("#txtTotalVatPQ").val(sum.toFixed(2));
		$("#textVatPQ").val(sum.toFixed(2));
	
		var totalgrossAmt = $("#txtGrossPQ").val(); 
		$("#txtNetAmtPQ").val((parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

	}





/****** onblur calculateTotalTax under the Heading of TAx info @author Sudhir @Date:2june2016********/
function calculateTotalTaxPQ() {
		var txtVat = 0;
		var txtExVat = 0;
		var lbt = 0;
		var cst = 0;
		var totalTax = 0;
	    var gross=0;
	    var less=0;	
	    
		if ($('#txtVatPQ').val() != '' && $('#txtVatPQ').val().length > 0)
			txtVat = parseFloat($('#txtVatPQ').val());

		if ($('#txtlbtPQ').val() != '' && $('#txtlbtPQ').val().length > 0)
			lbt = parseFloat($('#txtlbtPQ').val());

		if ($('#txtcstPQ').val() != '' && $('#txtcstPQ').val().length > 0)
			cst = parseFloat($('#txtcstPQ').val());
		
		if ($('#txtExVatPQ').val() != '' && $('#txtExVatPQ').val().length > 0)
			txtExVat = parseFloat($('#txtExVatPQ').val());
	
		$('#txtTotalVatPQ').val(parseFloat(txtVat) + parseFloat(txtExVat));

		totalTax = parseFloat(txtVat) + parseFloat(txtExVat) + parseFloat(lbt)
				+ parseFloat(cst);

		$('#textVatPQ').val((totalTax).toFixed(2));
	
		/*	
		if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0)
			gross = parseFloat($('#txtGross').val());
		
		
		if ($('#txtLess').val() != '' && $('#txtLess').val().length > 0)
			less = parseFloat($('#txtLess').val());
		
		var amt=gross-less;
		 */
		
		
		
		$('#txtTotalVatPQ').val((totalTax).toFixed(2));
		calculateNetAmountPQ();
	}

 

/**** calculateNetAmount @author Sudhir @Date 2june2016*****/
function calculateNetAmountPQ() {
		// net amount
		var gross = 0;
		var less = 0;
		var add = 0;
		var total = 0;

		if ($('#txtGrossPQ').val() != '' && $('#txtGrossPQ').val().length > 0) {
			gross = parseFloat($('#txtGrossPQ').val());
		}
		if ($('#txtLessPQ').val() != '' && $('#txtLessPQ').val().length > 0) {
			less = parseFloat($('#txtLessPQ').val());
		}
		if ($('#txtAddPQ').val() != '' && $('#txtAddPQ').val().length > 0) {
			add = parseFloat($('#txtAddPQ').val());
		}

		var vat = 0;
		if (gross > 0)
			total = (gross - less) + add;
		if ($('#textVatPQ').val() != '' && $('#textVatPQ').val().length > 0)
			vat = parseFloat($('#textVatPQ').val());

		$('#txtNetAmtPQ').val((total + vat).toFixed(2));
		//resetAllValues();
	}



/**** calculateTotalAdd onblure under heading of Add  @Author:Sudhir @Date:2june2016 ****/
function calculateTotalAddPQ() {
		/*
		 * var numbers = /^\d+(\.\d+)?$/; if (number.match(numbers)) {
		 * 
		 * totalLess = parseFloat(number) + parseFloat(totalLess);
		 * $('#txtLess').val(totalLess); }
		 */

		var octroi = 0;
		var surcharge = 0;
		var creditAmt = 0;
		var freight = 0;
		var totalAdd = 0;

		if ($('#txtOctroiPQ').val() != '' && $('#txtOctroiPQ').val().length > 0)
			octroi = parseFloat($('#txtOctroiPQ').val());

		if ($('#txtSurchargePQ').val() != '' && $('#txtSurchargePQ').val().length > 0)
			surcharge = parseFloat($('#txtSurchargePQ').val());

		if ($('#txtCreditAmtPQ').val() != '' && $('#txtCreditAmtPQ').val().length > 0)
			creditAmt = parseFloat($('#txtCreditAmtPQ').val());

		if ($('#txtFreightPQ').val() != '' && $('#txtFreightPQ').val().length > 0)
			freight = parseFloat($('#txtFreightPQ').val());

		totalAdd = parseFloat(octroi) + parseFloat(surcharge) + parseFloat(creditAmt) + parseFloat(freight);

		$('#txtAddPQ').val(totalAdd.toFixed(2));
		calculateNetAmountPQ();
	}




/*** calculatSpeDisct @author sudhir @Date:2june2016 ***/
function calculatSpeDisctPQ() {
	var GrossAmt = parseFloat($('#txtGrossPQ').val());
	var less = parseFloat($('#txtLessPQ').val());
	var finalvatafterreduece = 0;
	var txtSplDisc = 0;
	var txtVat = 0;
	
/* 	if (less > GrossAmt) {
		alert("Less Amount should be less than Gross Amount!");

		 $('#txtSchmDisc').focus();

		 $('#txtNetAmt').val('');
		$('#txtLess').val(0);
		$('#txtItemDisc').val('');
		$('#txtSchmDisc').val('');
		$('#txtSplDisc').val('');
		$('#txtdebitAmt1').val('');
		$('#txtdebitAmt1').val('');
		$('#txtCD1').val('');
		$('#txtVat12').val('');
		$('#txtTotalVat').val('');
		$('#textVat').val('');
		$('#txtNetAmt').val('');
	}*/
	
	if ($('#txtSplDisc').val() == '' || $('#txtSplDisc').val() == 0)
	{
	totalVatAmt(1, rowCount);
	calculateTotalTaxPQ();
	calculateTotalLessPQ();
	calculateNetAmountPQ();
	}
	
	if ($('#txtVatPQ').val() != '' && $('#txtVatPQ').val().length > 0)
		txtVat = parseFloat($('#txtVatPQ').val());
	if ($('#txtSplDiscPQ').val() != '' && $('#txtSplDiscPQ').val().length > 0)
		txtSplDisc = parseFloat($('#txtSplDiscPQ').val());
	 
	 finalvatafterreduece =	parseFloat(txtVat) - (parseFloat(txtVat) * parseFloat(txtSplDisc)/100);
	 
	$('#txtVatPQ').val(finalvatafterreduece.toFixed(2));
	
	calculateTotalTaxPQ();
	calculateTotalLessPQ();
	calculateNetAmountPQ();
	 
}

/**** calculateCDAmt @Author:sudhir @Date:2june2016 *******/
function calculateCDAmtPQ()
{
	var gross = 0;
	var itemDis = 0;
	var cd=0;
	var cdAmt=0;
	var amt=0;
	if ($('#txtGrossPQ').val() != '' && $('#txtGrossPQ').val().length > 0) {
		gross = parseFloat($('#txtGrossPQ').val());
	}
	
	/*if ($('#txtItemDisc').val() != '' && $('#txtItemDisc').val().length > 0) {
		itemDis = parseFloat($('#txtItemDisc').val());
	}*/
	
	if ($('#txtCD1PQ').val() != '' && $('#txtCD1PQ').val().length > 0) {
		cd = parseFloat($('#txtCD1PQ').val());
	}
	
	 //amt=(gross-itemDis);
	if(parseFloat(gross)>parseFloat(cd))
		{
		cdAmt = parseFloat(gross)*(parseFloat(cd)/100);
	 	$('#txtCDAmtPQ').val(cdAmt.toFixed(2));
	 	calculateTotalLess();
		
		}
	else
		{
		alert("CD is less then Gross Amount!");
		$('#txtCDAmtPQ').val('0');
		$('#txtCD1PQ').val('0');
		calculateTotalLessPQ();
		return false;
		}
	
}

/***** calculateTotalLess @Author Sudhir @Date:2june2016 modifeied Date:23june2016****/
function calculateTotalLessPQ() {
		var itemDisc = 0;
		var schmDisc = 0;
		var splDisc = 0;
		var debitAmt1 = 0;
		var cd1 = 0;
		var totalLess = 0;

		/*if ($('#txtItemDisc').val() != '' && $('#txtItemDisc').val().length > 0)
			itemDisc = parseFloat($('#txtItemDisc').val());

		if ($('#txtSchmDisc').val() != '' && $('#txtSchmDisc').val().length > 0)
			schmDisc = parseFloat($('#txtSchmDisc').val());*/

		if ($('#txtSplDiscPQ').val() != '' && $('#txtSplDiscPQ').val().length > 0)
			splDisc = parseFloat($('#txtSplDiscPQ').val());

		if ($('#txtdebitAmt1PQ').val() != '' && $('#txtdebitAmt1PQ').val().length > 0)
			debitAmt1 = parseFloat($('#txtdebitAmt1PQ').val());

		if ($('#txtCDAmtPQ').val() != '' && $('#txtCDAmtPQ').val().length > 0)
			cd1 = parseFloat($('#txtCDAmtPQ').val());

		totalLess = parseFloat(splDisc) + parseFloat(debitAmt1) + parseFloat(cd1);

		$('#txtLessPQ').val(totalLess.toFixed(2));

		calculateNetAmountPQ();
	}

  
/*** setRoundNetAmount  @author sudhir @Date3june2016 ***/

function setRoundNetAmountPQ() {
	 if ($('#txtNetAmtPQ').val() == null && $('#txtNetAmtPQ').val() == '') {
		 alert("please Enter Net Amount");
		 return false;
		 
	 }
	 else
		 {
		 var retVal = confirm("Do you want to Round off Net Amount  ?");
		 if(retVal)
			 {
			 var r = Math.round($('#txtNetAmtPQ').val()); 
			  $("#txtNetAmtPQ").val(r);
			 }
		 else
			 {
			 	calculateNetAmountPQ();
			 }
		 }
	  
	}

/**** ENd functions for purchase Qoataion @Date:9june 2016  @Author:Sudhir ******/





/** ************************************** Purchase Order functions for Charges 18jully2016 **************************/

/****showChargesdiv Author Sudhir jadhav @Date 15jully2016****/
function showChargesdiv() {
	 $("#ApplyChargesforItem").show('show');
	 fetchChargesDetail();
} 

/**** hideApplyChargespopaup for item in purchase Order Author:sudhir  @Date 15jully2016****/
function  hideApplyChargespopaup() {
	 $('#lstBoxforCharges').html();
	 $("#ApplyChargesforItem").hide('hide');	
	 $("#txtChargesAmt").val('');
	}
/********************************* End hideApplyTaxpopaup for item in purchase order Author:sudhir  @Date 15jully2016 *****************************/

/***fetchChargesDetail for select Box Setting values  @Author Sudhir jadhav @Date : 15jully2016***/
function fetchChargesDetail() {
		var inputs = [];
		inputs.push('action=fetchChargesDetail');//fetchCategoryDetail
		inputs.push('isEdit=no');
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
			//alert(r);
				pobj1=JSON.parse(r);
			
			$("#txtChargesList").setTemplate(selInventoryChargesDetails);
			$("#txtChargesList").processTemplate(pobj1);
			
			}
		});
	}
/***templet for set charges Name to select box @Author sudhir @Data :15jully2016*/
var selInventoryChargesDetails= "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.CategoryDTO as CategoryDTO}"
	+ "<option  value='{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryName}</option>"
	+ "{#/for}";
/*** End templet for set charges Name to select box @Author sudhir @Data :15jully2016*/


/**** Adding charges to list @Author Sudhir @Date 15jully2016 ***/  
function addItemChargesName()
{
	 var txtChargesList = $("#txtChargesList option:selected").text();
	 if("-Select-" == txtChargesList ||txtChargesList == 0)
		 {
		 alert("Please Select Charges");
		 return false;
		 }
	 
	 var txtChargesAmt = $("#txtChargesAmt").val();

	 if(txtChargesAmt=='' || txtChargesAmt == null)
	 {
		 alert("please Select Charges Amt");
		return false;
	 }
	 
	 if(txtChargesAmt == ''|| txtChargesAmt == null || txtChargesList == "-Select-" || txtChargesList == 0)
		{
		 
		 alert("Please Enter All Feilds ");
		 return false;
		 
		} 
	 var finalChargesNameandAMt = txtChargesList +"_"+ txtChargesAmt;
	 
	 var flag = 1;
	 	$('#lstBoxforCharges').find('option').each(function() {
	 		if ($(this).html() == finalChargesNameandAMt) {
	 			alert(" Charge Is Present In List");
	 			flag = 0;
	 		}
	 	});
	 
	 
	if(flag == 1)
		{
	 var o = new Option("option text", "value");
		$(o).html(finalChargesNameandAMt); 
		$(o).val(finalChargesNameandAMt);
		$("#lstBoxforCharges").append(o);
		$("#txtChargesAmt").val("");
		$("#txtChargesList ").val('Select');
		$("#txtChargesList  option:selected").text("-Select-");
		
		$('select option').filter(function() {
		    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
		}).remove();
	}
	 
}


/******** remove Item Charges from list purchase Order ****Author:Sudhir Date:15jully2016 ****/
function removeItemCharges() {

	$('#lstBoxforCharges option:selected').remove();
}
/***** End remove Item Charges from list purchase Order ****Author:Sudhir Date:15jully2016 ****/


/****** * apply Charges for Item in purchase Order Author:sudhir Date:15jully2016  ****/
function  applyChargesforItem(){
	
	var txtPurchaseOrderTaxCode_ = "";
	// remove the wite space and empty option
	$('select option').filter(function() {
	    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
	}).remove();
	
	$('#lstBoxforCharges').find('option').each(function() {
		txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_ + ($(this).val() + ",");
	});
	if(txtPurchaseOrderTaxCode_== ','|| txtPurchaseOrderTaxCode_=='' || txtPurchaseOrderTaxCode_== null)
	{
		alert("Please Apply Atleast One Charge ");
		return false;
	}
	txtPurchaseOrderTaxCode_= txtPurchaseOrderTaxCode_.substring(0, txtPurchaseOrderTaxCode_.length-1);
	
	
	var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");
	
	$("#selboxChargeswithAmtList  option").remove();
	
	 var sumofRate = 0;
	 for(var i=0;i<Finalrateandtax.length;i++)
		{ 
		finalrat = Finalrateandtax[i];
		var taxRate =  finalrat.split("_");
		finalRateamt = taxRate[1];
		
		sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
		
		var option = "";
		option = option
			+ "<option value="
			+ finalrat
			+ ">"
			+ finalrat
			+ "</option>";
	$("#selboxChargeswithAmtList").append(option);
		}
	$("#sumofCharges").val(sumofRate.toFixed(2));
	
	calculateTotalTax();
	
	var textVat = $("#textVat").val();
	var finaltextVatValue =  parseFloat(sumofRate) +  parseFloat(textVat);
	$("#textVat").val(finaltextVatValue.toFixed(2));
	
	$('#lstBoxforCharges').html();
	$("#ApplyChargesforItem").hide('hide');
	
	calculateNetAmount();
	 
	
}
/*** *** End applyChargesforItem  in purchase Order Author:sudhir Date:15jully2016 ***** **/ 

/** ******************************** ENd Purchase Order functions for Charges 18jully2016 ************************************/



/** ************************************** Purchase Quoatation functions for Charges 18jully2016 **************************/

/****showChargesdiv Author Sudhir jadhav @Date 15jully2016****/
function showChargesdivPQ() {
	 $("#ApplyChargesforItemPQ").show('show');
	 fetchChargesDetailPQ();
} 

/**** hideApplyChargespopaup for item in purchase Quoatation Author:sudhir  @Date 15jully2016****/
function  hideApplyChargespopaupPQ() {
	 $('#lstBoxforChargesPQ').html();
	 $("#ApplyChargesforItemPQ").hide('hide');	
	 $("#txtChargesAmtPQ").val('');
	}
/********************************* End hideApplyTaxpopaup for item in purchase Quoatation Author:sudhir  @Date 15jully2016 *****************************/

/***fetchChargesDetail for select Box Setting values  @Author Sudhir jadhav @Date : 15jully2016***/
function fetchChargesDetailPQ() {
		var inputs = [];
		inputs.push('action=fetchChargesDetail');//fetchCategoryDetail
		inputs.push('isEdit=no');
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				//alert("error");
			},
			success : function(r) {
			//alert(r);
				pobj1=JSON.parse(r);
			
			$("#txtChargesListPQ").setTemplate(selInventoryChargesDetailsPQ);
			$("#txtChargesListPQ").processTemplate(pobj1);
			
			}
		});
	}
/***templet for set charges Name to select box @Author sudhir @Data :15jully2016*/
var selInventoryChargesDetailsPQ= "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.CategoryDTO as CategoryDTO}"
	+ "<option  value='{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryName}</option>"
	+ "{#/for}";
/*** End templet for set charges Name to select box @Author sudhir @Data :15jully2016*/


/**** Adding charges to list @Author Sudhir @Date 15jully2016 ***/  
function addItemChargesNamePQ()
{
	 var txtChargesList = $("#txtChargesListPQ option:selected").text();
	 if("-Select-" == txtChargesList ||txtChargesList == 0)
		 {
		 alert("Please Select Charges");
		 return false;
		 }
	 
	 var txtChargesAmt = $("#txtChargesAmtPQ").val();

	 if(txtChargesAmt=='' || txtChargesAmt == null)
	 {
		 alert("please Select Charges Amt");
		return false;
	 }
	 
	 if(txtChargesAmt == ''|| txtChargesAmt == null || txtChargesList == "-Select-" || txtChargesList == 0)
		{
		 
		 alert("Please Enter All Feilds ");
		 return false;
		 
		} 
	 var finalChargesNameandAMt = txtChargesList +"_"+ txtChargesAmt;
	 
	 var flag = 1;
	 	$('#lstBoxforChargesPQ').find('option').each(function() {
	 		if ($(this).html() == finalChargesNameandAMt) {
	 			alert(" Charge Is Present In List");
	 			flag = 0;
	 		}
	 	});
	 
	 
	if(flag == 1)
		{
	 var o = new Option("option text", "value");
		$(o).html(finalChargesNameandAMt); 
		$(o).val(finalChargesNameandAMt);
		$("#lstBoxforChargesPQ").append(o);
		$("#txtChargesAmtPQ").val("");
		$("#txtChargesListPQ").val('Select');
		$("#txtChargesListPQ  option:selected").text("-Select-");
		
		$('select option').filter(function() {
		    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
		}).remove();
	}
	 
}


/******** remove Item Charges from list purchase Quoatation ****Author:Sudhir Date:15jully2016 ****/
function removeItemChargesPQ() {

	$('#lstBoxforChargesPQ option:selected').remove();
}
/***** End remove Item Charges from list purchase Quoatation ****Author:Sudhir Date:15jully2016 ****/


/****** * apply Charges for Item in purchase Quoatation Author:sudhir Date:15jully2016  ****/
function  applyChargesforItemPQ(){
	
	var txtPurchaseOrderTaxCode_ = "";
	// remove the wite space and empty option
	$('select option').filter(function() {
	    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
	}).remove();
	
	$('#lstBoxforChargesPQ').find('option').each(function() {
		txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_ + ($(this).val() + ",");
	});
	if(txtPurchaseOrderTaxCode_== ','|| txtPurchaseOrderTaxCode_=='' || txtPurchaseOrderTaxCode_== null)
	{
		alert("Please Apply Atleast One Charge ");
		return false;
	}
	txtPurchaseOrderTaxCode_= txtPurchaseOrderTaxCode_.substring(0, txtPurchaseOrderTaxCode_.length-1);
	
	
	var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");
	
	$("#selboxChargeswithAmtListPQ  option").remove();
	
	 var sumofRate = 0;
	 for(var i=0;i<Finalrateandtax.length;i++)
		{ 
		finalrat = Finalrateandtax[i];
		var taxRate =  finalrat.split("_");
		finalRateamt = taxRate[1];
		
		sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
		
		var option = "";
		option = option
			+ "<option value="
			+ finalrat
			+ ">"
			+ finalrat
			+ "</option>";
	$("#selboxChargeswithAmtListPQ").append(option);
		}
	$("#sumofChargesPQ").val(sumofRate.toFixed(2));
	
	calculateTotalTaxPQ();
	
	var textVat = $("#textVatPQ").val();
	var finaltextVatValue =  parseFloat(sumofRate) +  parseFloat(textVat);
	$("#textVatPQ").val(finaltextVatValue.toFixed(2));
	
	$('#lstBoxforChargesPQ').html();
	$("#ApplyChargesforItemPQ").hide('hide');
	
	calculateNetAmountPQ();
	 
	
}
/*** *** End applyChargesforItem  in purchase Quoatation Author:sudhir Date:15jully2016 ***** **/ 

/** ******************************** ENd Purchase Quoatation functions for Charges 18jully2016 ************************************/





   function refresh() {
	
	   
	   
	   window.location.reload("inventory_Purchase_Request_List.jsp");
	   
   }
	  
	   
/*fetch terms and condition for purchase quotation and purchase order author: 20/10/2016 */ 

   
   function addtermsandCondition(Id) {
		 
		 var didConfirm = confirm("Are you sure to Add terms and conditions ?");
			if (didConfirm) {var inputs = [];
			inputs.push('action=fetchtermsandConditionsDetail');
			inputs.push('isEdit=yes');
			inputs.push('id='+ Id);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					//alert("error");
				},
				success : function(r) {
					r = $.parseJSON(r);
					var oldtermsandConditions = $("#txtPurchaseQuotationNotes2").val();
					
					 if(oldtermsandConditions==""||oldtermsandConditions==null||oldtermsandConditions==undefined)
						 {
						  	 $("#txtPurchaseQuotationNotes2").val(r.ltinvHospitalDetailDTOs[0].termsAndCondition).replace(/\s/g, "");
						 }
					 else
						 {
					var finalTermsandConditon = oldtermsandConditions +"\n"+ r.ltinvHospitalDetailDTOs[0].termsAndCondition;
					 $("#txtPurchaseQuotationNotes2").val(finalTermsandConditon);
						 }
					 
				}
			});
			
			}
			else{
				//$("#txtPurchaseQuotationNotes2").val("");
				
			}
   }
   
   
   
   
   function addtermsandCondition1(Id) {
		 
		 var didConfirm = confirm("Are you sure to Add terms and conditions ?");
			if (didConfirm) {var inputs = [];
			inputs.push('action=fetchtermsandConditionsDetail');
			inputs.push('isEdit=yes');
			inputs.push('id='+ Id);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					//alert("error");
				},
				success : function(r) {
					r = $.parseJSON(r);
					var oldtermsandConditions = $("#txtPurchaseQuotationNotes3").val();
					
					 if(oldtermsandConditions==""||oldtermsandConditions==null||oldtermsandConditions==undefined)
						 {
						  	 $("#txtPurchaseQuotationNotes3").val(r.ltinvHospitalDetailDTOs[0].termsAndCondition).replace(/\s/g, "");
						 }
					 else
						 {
					var finalTermsandConditon = oldtermsandConditions +"\n"+ r.ltinvHospitalDetailDTOs[0].termsAndCondition;
					 $("#txtPurchaseQuotationNotes3").val(finalTermsandConditon);
						 }
					 
				}
			});
			
			}
			else{
				//$("#txtPurchaseQuotationNotes2").val("");
				
			}
 }
   
  
   
 
   function fetchtermsandConditionsDetail() {
  		var inputs = [];
  		inputs.push('action=fetchtermsandConditionsDetail');
  		inputs.push('isEdit=no');
  		var str = inputs.join('&');
  		jQuery.ajax({
  			async : true,
  			type : "POST",
  			data : str + "&reqType=AJAX",
  			url : "InventoryServlet",
  			timeout : 1000 * 60 * 5,
  			catche : false,
  			error : function() {
  				//alert("error");
  			},
  			success : function(r) {
  			 	//alert(r);
  				pobj1 = eval('(' + r + ')');
  				SrNo = 1;
  				$("#termsandConditionformmaster").setTemplate(inventorytermsAndConditionTemp);
  				$("#termsandConditionformmaster").processTemplate(pobj1);
  				
  				$("#termsandConditionformmaster1").setTemplate(inventorytermsAndConditionTemp1);
  				$("#termsandConditionformmaster1").processTemplate(pobj1);


  				$("#termsandConditionsDetailsAjaxResp").html(r);
  				$("#termsandConditionsDetailsAjaxResp1").html(r);
  			}
  		});
  	}
   /*set Tamplet For Terms and Conditions purchase quotation  @Date :19/10/2016  @Author kalpesh patil*/
   var inventorytermsAndConditionTemp = "<table class='table table-striped' style='margin: 10px;width: 598px;'>"
  		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>  <th style='height: 21.5px;' class='col-md-1 center'><div>Id</div></th>"
  		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Terms and Condition </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Add</div></th>"
  		+ "</tr> </thead>"
  		+ "{#foreach $T.ltinvHospitalDetailDTOs as ltinvHospitalDetailDTOs}<tr class='center'> <td>{SrNo++}</td><td id='id{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}'>{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}</td><td style='text-align=left' id='desc{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}'>{$T.ltinvHospitalDetailDTOs.termsAndCondition}</td>"
  		+ "<td><button type='button' id='btnEdit2' class='btn btn-xs btn-success' onclick = \"addtermsandCondition({$T.ltinvHospitalDetailDTOs.idinvhospitaldetails})\" value='EDIT'><i class='fa fa-plus'></i></button></td>"
  		+ "</tr>{#/for}</table>";
   
   /*set Tamplet For Terms and Conditions purchase quotation @Date :20/10/2016  @Author kalpesh patil */
   var inventorytermsAndConditionTemp1 = "<table class='table table-striped' style='margin: 10px;width: 598px;'>"
  		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>  <th style='height: 21.5px;' class='col-md-1 center'><div>Id</div></th>"
  		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Terms and Condition </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Add</div></th>"
  		+ "</tr> </thead>"
  		+ "{#foreach $T.ltinvHospitalDetailDTOs as ltinvHospitalDetailDTOs}<tr class='center'> <td>{SrNo++}</td><td id='id{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}'>{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}</td><td style='text-align=left' id='desc{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}'>{$T.ltinvHospitalDetailDTOs.termsAndCondition}</td>"
  		+ "<td><button type='button' id='btnEdit2' class='btn btn-xs btn-success' onclick = \"addtermsandCondition1({$T.ltinvHospitalDetailDTOs.idinvhospitaldetails})\" value='EDIT'><i class='fa fa-plus'></i></button></td>"
  		+ "</tr>{#/for}</table>";
 
   
  /* @Code: fetch multiple purchase request details for purchase order
   * @author:Sudhir jadhav 
   * @date: 14march2017*/
   function getmulPurReqtDetails() {
	   
	   var inputs = [];
 		inputs.push('action=GetmulPurReqtDetails');
 		inputs.push('isEdit=no');
 		var str = inputs.join('&');
 		jQuery.ajax({
 			async : false,
 			type : "POST",
 			data : str + "&reqType=AJAX",
 			url : "InventoryServlet",
 			timeout : 1000 * 60 * 5,
 			catche : false,
 			error : function() {
 				//alert("error");
 			},
 			success : function(r) {
 			 	//alert(r);
 				pobj1 = eval('(' + r + ')');
 				SrNo = 1;
 				
 				srNumber=1;
 				$("#MRNcontent").setTemplate(invtempltPurRequest);
 				$("#MRNcontent").processTemplate(pobj1);

 				/*$("#termsandConditionformmaster").setTemplate(inventorytermsAndConditionTemp);
 				$("#termsandConditionformmaster").processTemplate(pobj1);
 				
 				$("#termsandConditionformmaster1").setTemplate(inventorytermsAndConditionTemp1);
 				$("#termsandConditionformmaster1").processTemplate(pobj1);


 				$("#termsandConditionsDetailsAjaxResp").html(r);
 				$("#termsandConditionsDetailsAjaxResp1").html(r);*/
 			}
 		});
	
   	}
   /*//this templet used to set purchase Request Details (No of request comes for Purchase Order) @Date :14march2017 @author :sudhir
   var invtempltPurRequest = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Purchase Request Id</div></th>"
		+ "<th ' class='col-md-2 center'><div>Purchase Request Date </div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Center Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Center Name</div></th><th style='height: 21.5px;' class='col-md-1 center'><div> Ip Address</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Add to Center</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Purchase Quatation </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div> Purchase Order</div></th>  </tr> </thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}<tr class='center'> <td>{srNumber++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.purReqId}'>{$T.inventoryMaterialRequestNoteMasterDTO.purReqId}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.purReqDate}'>{$T.inventoryMaterialRequestNoteMasterDTO.purReqDate}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterId}'>{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterId}</td><td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterName}'>{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterName}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location}</td> <td><button id='btnAddtoCenter'  value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"addtoCenter({$T.inventoryMaterialRequestNoteMasterDTO.purReqId}))\"><i class='fa fa-edit'></i></button></td> "
		+ " <td ><button id='btnPurchaseQuataion'  value='Delete' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#Purchase_Quotation_Form'  onclick=\"createpurchaseQuatation({$T.inventoryMaterialRequestNoteMasterDTO.purReqId}), getSeries(($('#pqId').val()))\"><i class='fa fa-edit'></i></button></td> <td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#Purchase_Order_Form' onclick='createPurchaseOrder(\"{$T.inventoryMaterialRequestNoteMasterDTO.purReqId}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location}\",{$T.inventoryMaterialRequestNoteMasterDTO.purReqId}),getSeriesPO($(\"#prId\").val());' value='EDIT'><i class='fa fa-edit'></i></button></td></tr>{#/for}</table>";
   */
   
   
 //this templet used to set purchase Request Details (No of request comes for Purchase Order) @Date :14march2017 @author :sudhir
   var invtempltPurRequest = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Purchase Request Id</div></th>"
		+ "<th ' class='col-md-2 center'><div>Purchase Request Date </div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Center Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Center Name</div></th><th style='height: 21.5px;' class='col-md-1 center'><div> Ip Address</div></th> "
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Purchase Quatation </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div> Purchase Order</div></th>  </tr> </thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}<tr class='center'> <td>{srNumber++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.purReqId}'>{$T.inventoryMaterialRequestNoteMasterDTO.purReqId}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.purReqDate}'>{$T.inventoryMaterialRequestNoteMasterDTO.purReqDate}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterId}'>{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterId}</td><td style='text-align=left' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterName}'>{$T.inventoryMaterialRequestNoteMasterDTO.hllCenterName}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location}</td>"
		+ " <td ><button id='btnPurchaseQuataion'  value='Delete' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#Purchase_Quotation_Form'  onclick=\"createpurchaseQuatation({$T.inventoryMaterialRequestNoteMasterDTO.purReqId}), getSeries(($('#pqId').val()))\"><i class='fa fa-edit'></i></button></td> <td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#MulPOForm' onclick='createPurchaseOrder(\"{$T.inventoryMaterialRequestNoteMasterDTO.purReqId}\",\"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location}\",{$T.inventoryMaterialRequestNoteMasterDTO.purReqId}),getSeriesPO($(\"#prId\").val());' value='EDIT'><i class='fa fa-edit'></i></button></td></tr>{#/for}</table>";
   
   
  /* @code: this fuction is used set the */
   function callforDemoPOONClient() {
	   jQuery.ajax({
			async : false,
			type : "POST",
			url : "/EhatEnterprise/api/getInventoryPoList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				alert(r);
			}
		});
		return true;
}
   
   
  /* this function is used to set Snaction No Doc Series @Author Sudhir Jadhav @Date 22may2017*/ 
   function getSeriesSN(Sid) {
		  
	 	var obj = $("#AjaxResopnse").html();
	 	
	 	objDocument = JSON.parse(obj);

	 	for ( var i = 0; i < objDocument.lstDocumentNUmberDto.length; i++) {
	 		if (objDocument.lstDocumentNUmberDto[i].document_numbering_id == Sid) {
	 			$("#txtSanctNo")
	 					.val(
	 							objDocument.lstDocumentNUmberDto[i].document_prefix
	 									+ objDocument.lstDocumentNUmberDto[i].document_number + objDocument.lstDocumentNUmberDto[i].document_suffix);
	 			break;

	 		}
	 	
	 	}
	 	
	 }

 
	 /******************** get next auto Genrated id for sanction No ************/
	 function getNextSanctId() {
	 	var inputs = [];
	 	inputs.push('action=getQuotationNextId');
	 	inputs.push('tableName=inv_po_sanction_details');
	 	var str = inputs.join('&');
	 	jQuery.ajax({
	 		async : false,
	 		type : "POST",
	 		data : str + "&reqType=AJAX",
	 		url : "InventoryServlet",
	 		timeout : 1000 * 60 * 5,
	 		catche : false,
	 		error : function() {
	 			alert("error");
	 		},
	 		success : function(r) {
	 			ajaxResponse = r;  
	 			$("#txtSanctionId").val(r);
	 		}
	 	});
	 }

	 /*this templet is uesd for set Sanction Series for Purchase Order @Date : 22may2017 @Author Sudhir Jadhav*/ 
	 var selInvForSantionNo = "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
			+"{#if $T.lstDocumentNUmberDto.document_series == 'Sanction No'}"
			+ "<option id='sancnId'  value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
			+ "{#/for}";

	 
	 /* *  this function is used for Review the Indend and accecpt and Reject Items (change the status of items Accept or Reject according to it send to Purchase Order ) @date 23june2017  */
	 function editMrnforReview(MrnId,club,review,requstNo) {
		// alert(" Mrn Id :"+ MrnId);
	 	//$('#iToHideBtns').css('display', 'block');
		 
	 	refreshonview();
	 	
	 	var currUN = $("#CurrentuserName").val();
	    $("#txtCurrentUserName").val(currUN);
	 	
	 	if(review == "Y")
	 	{
	 	$("#btnMrnreview").hide();
	 	}
	 	
	   if(club == "Y")
		   {
		   viewClubMRNDetails(requstNo,MrnId);
		   $("#clubMrn").val('Y');
		   $("#requestId").val(requstNo);
		   return false;
		   
		   }
		 
			
		 var inputs = [];
			inputs.push('action=fetchMaterialRequestNoteDetailsforMRNAll');
			inputs.push('isEdit=yes');
			inputs.push('MrnId=' + MrnId);

			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					// alert(r);
					/*SrNo = 1 ;
					pobj1 = eval('(' + r + ')');*/
					//alert(pobj1);
					var objMrnMaster = eval('(' + r + ')'); //JSON.parse(r);
					//alert(objMrnMaster);
				 	 //this for loop for get Master Details of Material Request Note /Indent  23june2017

				 	for ( var i = 0; i < objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) {
				 		
				 	
				 		
				 		if (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
				 			 
				 			$("#txtmaterialReqaestNoteListDocId").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);
				 			   
				 			$("#txtmaterialReqaestNoteDocDate").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date);
				 			$("#txtMRNTotal").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_total_qty);
				 			$("#txtMRNRemark").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_remark);

				 			$("#txtMRNLocationName").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location_name);
				 			
				 			$("#txtMRNNote").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrnNote);
				 			
				 			$("#txtReceiverName").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);
				 			  // $("#sclMRNLocation option:selected").text(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location);
				 			   $("#subInventoryId").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_subinventory_id);
				 			   break;
				 			 
				 		}
				 		
				 		else
				 			{
				 			 
				 			}
				 	} 
					
					 

				}
			});
		 


	 	var inputs = [];
	 	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	 	inputs.push('isEdit=no');
	 	//var txtmaterialReqaestNoteDocId = $("#txtmaterialReqaestNoteListDocId").val();
	 	// alert(txtSubContractingMaterialIssueDocNo);
	 	inputs.push('txtmaterialReqaestNoteDocId=' + MrnId);
	 	var str = inputs.join('&');
	 	jQuery
	 			.ajax({
	 				async : false,
	 				type : "POST",
	 				data : str + "&reqType=AJAX",
	 				url : "InventoryServlet",
	 				timeout : 1000 * 60 * 5,
	 				catche : false,
	 				error : function() {
	 					alert("error");
	 				},
	 				success : function(r) {
	 					//alert(r);
	 					pobj1 = eval('(' + r + ')');
	 					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;

	 					var count = 1;
	 					for ( var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
	 						var divcontent = "";
	 						
	 						if(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].accptRejtstus == "Accept" && pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty > 0)
	 						{
	 						var mrnActualItemQty = parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty) + parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_fixed_issue_qty_to_subinventory);
	 						
	 						divcontent = divcontent + "<tr id ='deleterows"
	 												+ count
	 												+ "' > <td> <input type='checkbox'  name='checkbox"
	 												+ count
	 												+ "' onclick='chkForAccept("
	 												+ count
	 												+ ")'  id='chkbox"
	 												+ count
	 												+ "'> </td> <td><input style='width:60px;' type='text' id='txtSrNo"
	 												+ count
	 												+ "' name='txtSrNo'  value="
	 												+ count
	 												+ "  class='form-control input-SmallText'> <input type='hidden' id='txtinventoryMaterailRequestNote"
	 												+ count
	 												+ "' name='txtinventoryMaterailRequestNote'  value="
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_id
	 												+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;width:260px;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
	 												+ "<input type='text' style='width:260px;' id='txtinventoryMaterailRequestNoteItemcode_"
	 												+ count
	 												+ "' "
	 												+ "onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' readonly='' value='"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
	 												+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
	 												+ count
	 												+ "' value="
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code
	 												+ " /></div></td> <td><input type='text' readonly=''style='width:200px;' id='txtinventoryMaterailRequestNoteDocQuantity"
	 												+ count
	 												+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()'  value='"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty
	 												+ "'></td> <td style='display: none;'><input style='width:160px;'type='text' readonly='' id='mrnActualItemQty"
	 												+ count
	 												+ "' class='form-control input-SmallText' value='"
	 												+ mrnActualItemQty
	 												+ "'></td> <td id='xyz'><select style='width:60px;' onclick=getSalesDetailsOnChange(this.id); class='form-control input-SmallText' id='selItemQty_"
	 												+ count
	 												+ "'><option selected=selected >"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty
	 												+ "</option></select></td><td id='xyz'><select style='width:100px;'class='form-control input-SmallText' id='selUrjStatus_"
	 												+ count
	 												+ "'><option selected=selected >"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].itmeurjStatus
	 												+ "</option><option value ='Require'>Require</option> <option value = 'VeryUrgent' >VeryUrgent</option><option value='Urgent'>Urgent</option></select></td> <td id='xyz'><select class='form-control input-SmallText' style='width:100px;' id='selAcptRejStatus_"
	 												+ count
	 												+ "'><option selected=selected >"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].accptRejtstus+ "</option><option value ='Accept'>Accept</option><option value='Reject'>Reject</option></select></td> <td> <input type='hidden' id='txtNoteforItemhidd"+ count + "' value='0' class='form-control input-SmallText' /> <input type='text' style='width:230px;' id='txtItmeNote"+ count + "' class='form-control input-SmallText' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].noteforItem+ "'></td><tdstyle='display: none;'><input type='text' style='width:160px;' id='txtcurrentSubInventoryStock"
	 												+ count
	 												+ "' readonly=''  class='form-control input-SmallText'  value='"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].currentSubInventoryStock
	 												+ "' > <td style='display: none;'><input style='width:230px;' type='text' id='txtmainInventoryStock"
	 												+ count
	 												+ "' readonly=''  value='"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mainInventoryStock
	 												+ "' class='form-control input-SmallText' ></td></tr>";
	 						
	 						count++;
	 									}
	 						else
	 							{
	 							 
	 							}
	 						
	 						$("#ItemInfoReviewTbl").append(divcontent);
	 						
	 						$("#txtMRNID").val(count);
	 						
	 						
	 						//test++;

	 					}

	 					/*totalDocQty();
	 					setEditSave();*/
	 					
	 					

	 					var tblSubContractingCountRow1 = $("#txtMRNID").val();
	 					$("#totalRow").val(tblSubContractingCountRow1);
	 					  

	 				}

	 			});
	 	
	 }
	 
	 
	//this function is used for  save the Mrn Review State @DAte :3jully2017
	 
	 function saveReviewState()
	 {
		/* var totalRow = $("#totalRow").val();
		 var txtMRNID = $("#txtMRNID").val();*/
			
		 // General In
				var curtUrName = $("#CurrentuserName").val();
				var currUseId = $("#currentUserID").val();
				var txtMrnId = $("#txtmaterialReqaestNoteListDocId").val();
				//alert("MrnId is : " +txtMrnId);
				
				var txtMRNRemark = $("#txtMRNRemark").val();
				var txtNoteforMrn = $("#txtMRNNote").val();
				
				var txtMRNID = $("#txtMRNID").val();
				var totalRow = $("#totalRow").val();
				var clubMrn = $("#clubMrn").val();
				var restId = $("#requestId").val(); 
				 
				var materiallist = {
					inventoryMaterialRequestNoteItemInfoSlaveDTO : []
				};

				for ( var i = 1; i <= txtMRNID; i++) {

					if ($("#txtinventoryMaterailRequestNote" + i).val() != null
							&& $("#txtinventoryMaterailRequestNote" + i).val() != undefined) {
						var mrnSlaveId = $("#txtinventoryMaterailRequestNote" + i).val();
						var txtMRNItemName = $("#txtinventoryMaterailRequestNoteItemcode_" + i).val();
						var txtMRNItemcodeId = $("#txtMRNItemcodeId" + i).val();
						 
						//var selItemQty = $("#selItemQty_" + i + " option:selected").text();
						var selUrjStatus = $("#selUrjStatus_"+ i + " option:selected").text();
						var selAcptRejStatus = $("#selAcptRejStatus_"+ i + " option:selected").text();
						var txtItmeNote = $("#txtItmeNote" + i).val();
						 
						materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO
								.push({

										mrn_item_info_slave_id : mrnSlaveId,
										mrn_item_info_slave_item_name : txtMRNItemName,
										mrnRemark :txtMRNRemark,
										currentUserID   : currUseId,
										currentuserName : curtUrName,
										mrn_id:txtMrnId,
										mrn_item_info_slave_item_code : txtMRNItemcodeId,
										itmeurjStatus : selUrjStatus,
										accptRejtstus:selAcptRejStatus,
										noteforItem:txtItmeNote,
										mrn_status:clubMrn,
										mrn_item_info_slave_item_factor2:restId,
										mrnSrNo:txtNoteforMrn //this fild is used for Mrn Note (total mrn note)
								});

					}
				}

				var li = materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
				 if(li == 0)
					{
					alert("please enter atleast one item row to save review mrn");
					return false;
					
					}
				
				materiallist = JSON.stringify(materiallist);
				var inputs = [];
				inputs.push('action=SaveReviewMrnStatus');
				//alert(materiallist);
				// General Info
				inputs.push("materiallist=" + materiallist);
				
				var str = inputs.join('&');
				jQuery.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) { 
						alert("Review and save succssefully");
						$('#indend_form').removeClass('fade');
						$('#indend_form').modal('hide');
						window.location.reload("inventory_Purchase_Request_List.jsp");
						//refreshonview();
						
						
						
			 }
			});
			 
			// alert("Approved level Succssefully");
				/*$('#userNameandpasswordPopUp').removeClass('fade');
				$('#userNameandpasswordPopUp').modal('hide');
				$('#MRNForm').removeClass('fade');
				$('#MRNForm').modal('hide');
				onmrn();
				fetchMaterialRequestNoteDetailsShows();*/
		 
	 }
	 
	 //clear the Review Indend /Mrn Popup on Review Mrn@Date : 29june2017 @Author Sudhir 
 	 function refreshonview() {
			$('#indend_form').find('input:text').val('');
			$('#indend_form').find('input:hidden').val('');

			$('#indend_form').find('input:text').val('');
			$('#ItemInfoReviewTbl').find('input:text').val('');
			$('#indend_form').find('textarea').val('');
			$("#ItemInfoReviewTbl > tbody").html('');
			isNew = 1;
			 $("#clubMrn").val('N');
			  $("#requestId").val('0');
		}
 	 
 	//this function is used to show Club MRN Details @Date 1 jully 2017
 	function viewClubMRNDetails(reqId,MrnId) {
 		 var inputs = [];
			inputs.push('action=fetchMaterialRequestNoteDetailsforMRNAll');
			inputs.push('isEdit=yes');
			inputs.push('MrnId=' + MrnId);

			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					// alert(r);
					/*SrNo = 1 ;
					pobj1 = eval('(' + r + ')');*/
					//alert(pobj1);
					var objMrnMaster = eval('(' + r + ')'); //JSON.parse(r);
					//alert(objMrnMaster);
				 	 //this for loop for get Master Details of Material Request Note /Indent  23june2017

				 	for ( var i = 0; i < objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) {
				 		
				 	
				 		
				 		if (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
				 			 
				 			$("#txtmaterialReqaestNoteListDocId").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);
				 			   
				 			$("#txtmaterialReqaestNoteDocDate").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date);
				 			$("#txtMRNTotal").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_total_qty);
				 			$("#txtMRNRemark").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_remark);
				 		
				 			$("#txtMRNNote").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrnNote);
				 		
				 			$("#txtMRNLocationName").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location_name);

				 			$("#txtReceiverName").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);
				 			  // $("#sclMRNLocation option:selected").text(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location);
				 			   $("#subInventoryId").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_subinventory_id);
				 			   break;
				 			 
				 		}
				 		
				 		else
				 			{
				 			//alert("hii");
				 			}
				 	} 
					
					 

				}
			});
 		
//mrn culb Mrn Details 1 jully 2017
 		var inputs = [];
 		inputs.push('action=GetClubMrnSlaveDetails');
 		inputs.push('isEdit=no');
 		// alert(txtSubContractingMaterialIssueDocNo);
 		inputs.push('txtReqId=' + reqId);
 		var str = inputs.join('&');
 		jQuery
 				.ajax({
 					async : false,
 					type : "POST",
 					data : str + "&reqType=AJAX",
 					url : "InventoryServlet",
 					timeout : 1000 * 60 * 5,
 					catche : false,
 					error : function() {
 						alert("error");
 					},
 					success : function(r) {
 						//alert(r);
 						pobj1 = eval('(' + r + ')');
 						var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;

 						var count = 1;
	 					for ( var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
	 						var divcontent = "";
	 						
	 						if(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].accptRejtstus == "Accept" && pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty > 0)
	 						{
	 						var mrnActualItemQty = parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty) + parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_fixed_issue_qty_to_subinventory);
	 						
	 						divcontent = divcontent + "<tr id ='deleterows"
	 												+ count
	 												+ "' > <td> <input type='checkbox'  name='checkbox"
	 												+ count
	 												+ "' onclick='chkForAccept("
	 												+ count
	 												+ ")'  id='chkbox"
	 												+ count
	 												+ "'> </td> <td><input style='width:60px;' type='text' id='txtSrNo"
	 												+ count
	 												+ "' name='txtSrNo'  value="
	 												+ count
	 												+ "  class='form-control input-SmallText'> <input type='hidden' id='txtinventoryMaterailRequestNote"
	 												+ count
	 												+ "' name='txtinventoryMaterailRequestNote'  value="
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_id
	 												+ "  class='form-control input-SmallText'></td>  <td><div style='text-align:left;width:260px;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
	 												+ "<input type='text' style='width:260px;' id='txtinventoryMaterailRequestNoteItemcode_"
	 												+ count
	 												+ "' "
	 												+ "onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' readonly='' value='"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
	 												+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
	 												+ count
	 												+ "' value="
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code
	 												+ " /></div></td> <td><input type='text' readonly=''style='width:260px;' id='txtinventoryMaterailRequestNoteDocQuantity"
	 												+ count
	 												+ "' class='form-control input-SmallText'onkeyup='chcknulldocQty()'  value='"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty
	 												+ "'></td> <td style='display: none;'><input style='width:260px;'type='text' readonly='' id='mrnActualItemQty"
	 												+ count
	 												+ "' class='form-control input-SmallText' value='"
	 												+ mrnActualItemQty
	 												+ "'></td> <td id='xyz'><select style='width:60px;' onclick=getSalesDetailsOnChange(this.id); class='form-control input-SmallText' id='selItemQty_"
	 												+ count
	 												+ "'><option selected=selected >"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty
	 												+ "</option></select></td><td id='xyz'><select style='width:100px;'class='form-control input-SmallText' id='selUrjStatus_"
	 												+ count
	 												+ "'><option selected=selected >"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].itmeurjStatus
	 												+ "</option><option value ='Require'>Require</option> <option value = 'VeryUrgent' >VeryUrgent</option><option value='Urgent'>Urgent</option></select></td> <td id='xyz'><select class='form-control input-SmallText' style='width:100px;' id='selAcptRejStatus_"
	 												+ count
	 												+ "'><option selected=selected >"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].accptRejtstus+ "</option><option value ='Accept'>Accept</option><option value='Reject'>Reject</option></select></td> <td> <input type='hidden' id='txtNoteforItemhidd"+ count + "' value='0' class='form-control input-SmallText' /> <input type='text' style='width:260px;' id='txtItmeNote"+ count + "' class='form-control input-SmallText' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].noteforItem+ "'></td><td style='display: none;'><input type='text' style='width:160px;' id='txtcurrentSubInventoryStock"
	 												+ count
	 												+ "' readonly=''  class='form-control input-SmallText'  value='"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].currentSubInventoryStock
	 												+ "' > <td style='display: none;'><input style='width:160px;' type='text' id='txtmainInventoryStock"
	 												+ count
	 												+ "' readonly=''  value='"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mainInventoryStock
	 												+ "' class='form-control input-SmallText' ></td></tr>";
	 						
	 						count++;
	 									}
	 						else
	 							{
	 							//alert("In Else...!");
	 							}
	 						
	 						$("#ItemInfoReviewTbl").append(divcontent);
	 						
	 						$("#txtMRNID").val(count);
	 						
	 						
	 						//test++;

	 					}

 						var tblSubContractingCountRow1 = $("#txtMRNID").val();
 						$("#totalRow").val(tblSubContractingCountRow1);
 						
 						
 						//checkSession();

 					}

 				});
 		
 	}

 	
	 //this function is used for reject the Mrn @Date :3jully2017
	 function noteforMrn(MrnId)
	 {
			var curtUrName = $("#CurrentuserName").val();
			var currUseId = $("#currentUserID").val();
				
			 var didConfirm = confirm("Are you sure to reject this mrn ?");
				if (didConfirm) {
					  
					 var inputs = [];
						inputs.push('action=RejectMrnInPurReq');
						inputs.push('isEdit=Reject');
						inputs.push('MrnId=' + mrnId);
						inputs.push('curtUrName=' + curtUrName);
						inputs.push('currUseId=' + currUseId);
						
						var str = inputs.join('&');
						jQuery.ajax({
							async : false,
							type : "POST",
							data : str + "&reqType=AJAX",
							url : "InventoryServlet",
							timeout : 1000 * 60 * 5,
							catche : false,
							error : function() {
								alert("error");
							},
							success : function(r) {
								 alert(r);
								 
								 
							}
						});
					 
				}
			
	 }
	 
	 //this function is used for reject the Mrn @Date :3jully2017
	 function rejectMrn(mrnId)
	 {
		var curtUrName = $("#CurrentuserName").val();
		var currUseId = $("#currentUserID").val();
			
		 var didConfirm = confirm("Are you sure to reject this mrn ?");
			if (didConfirm) {
				  
				 var inputs = [];
					inputs.push('action=RejectMrnInPurReq');
					inputs.push('isEdit=Reject');
					inputs.push('MrnId=' + mrnId);
					inputs.push('curtUrName=' + curtUrName);
					inputs.push('currUseId=' + currUseId);
					
					var str = inputs.join('&');
					jQuery.ajax({
						async : false,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "InventoryServlet",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							alert("error");
						},
						success : function(r) {
							 alert(r);
							 fetchMaterialRequestNoteDetailsinPurReqList();
							 
						}
					});
				 
			}
		
		 
	 }
   
	 
	  
	 
	 
	 /***** * this function is used for create Mul POProces  @Date:6jully2017 @author:Sudhir modified 5augus add inv_mrn_location_name and sub inv Id ******/
	 function createMulPOProces(MrnId,reViewStat,clubMrn,reqId,clientIp,centerId,formClient,subInvId,subInvName) {
		 
		 $("#removeBtn").hide();
		 
		 if(reViewStat == "N")
			 {
			 alert("Pr can not process to po without review !");
			 return false;
			 }
		 
		 $("#txtPurchaseOrderRequestNo").val(MrnId);
		 $("#txtHiddenClientIp").val(clientIp);
		 $("#txtsubInvId").val(subInvId);
		 $("#txtsubInvName").val(subInvName);
		 
		 
		//this used for Checked Wethere request coming from client or not if Yes then Flag Is Y else Flag is N  
			if(formClient == 'Y'){
		    	$("#txtSendtoClient").val('Y');
			   	$("#txtHiddenCenterId").val(centerId);
			   	$("#txtHiddenClientIp").val(clientIp);
			  	
			}
			else
				{	
				$("#txtSendtoClient").val('N');
				}
			$("#txtPurchaseFormName").val("PURCHASE ORDER Processing");

			$("#txtPurchaseOrderQuatationNo").val(0);
			
		 
		 
		 if(clubMrn== "Y" )
		  {
			 procClubMRNPO(reqId,MrnId);
			 return false
			 
		  }
	 	//$("#txtPurchaseQuotationRequestNo").val(MrnId);
	     /*this cloud flag is used for showing saveing button to cloud and hideing to client*/
	 	/*if(incloud == "Y")
	 	{
	 		$("#savePoBtn").hide();
	 	}
	 	$('#iToHideOrderSaveBtn').css('display','block');
	 	$("#closeonclick").hide();
	 	$("#txtPurchaseOrderRequestNo").val(MrnId);
	 	
	 	$("#txtHiddenClientIp").val(ip);*/
	 			
	 	//this used for Checked Wethere request coming from client or not if Yes then Flag Is Y else Flag is N  
	 /*	if(formClient == 'Y'){
	     	$("#txtSendtoClient").val('Y');
	 	   	$("#txtHiddenCenterId").val(centerId);
	 	   	$("#txtHiddenClientIp").val(ip);
	 	  	
	 	}
	 	else
	 		{	
	 		$("#txtSendtoClient").val('N');
	 		}
	 	$("#txtPurchaseFormName").val("PURCHASE ORDER");*/

	 	/*$("#txtPurchaseOrderQuatationNo").val(0);*/
	 	
	 	
	 	var today = new Date();
	 	 
	 	var dd = today.getDate();
	     var mm = today.getMonth()+1; //January is 0!
	     var yyyy = today.getFullYear();
	     
	     if(dd<10){
	         dd='0'+dd;
	     } 
	     if(mm<10){
	         mm='0'+mm;
	     } 
	     
	     var today1 = dd+'/'+mm+'/'+yyyy;
	     
	     
	     $("#txtPurOrderDate").val(today1);
	     $("#txtMulPODeliDate").val(today1);
	 	
	 	var inputs = [];
	 	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	 	inputs.push('isEdit=no');
	 	/*var txtmaterialReqaestNoteDocId = $("#txtmaterialReqaestNoteDocId").val();*/
	 	inputs.push('txtmaterialReqaestNoteDocId=' + MrnId);
	 	var str = inputs.join('&');
	 	jQuery
	 			.ajax({
	 				async : false,
	 				type : "POST",
	 				data : str + "&reqType=AJAX",
	 				url : "InventoryServlet",
	 				timeout : 1000 * 60 * 5,
	 				catche : false,
	 				error : function() {
	 					//alert("error");
	 				},
	 				success : function(r) {
	 					//alert(r);
	 					pobj1 = eval('(' + r + ')');
	 					// alert(r);
	 					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
	 					// alert(lenghtofpobj);
	 					var rowCount = 1;
	 					for ( var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
	 						
	 						var divcontent = "";
	 						if(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].accptRejtstus == "Accept" && pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty > 0)
	 						{	
	 							divcontent = divcontent + "<tr id='deleterow"
	 										+ rowCount
	 										+ "'> <td> <input type='checkbox'  name='checkbox"
	 										+ rowCount
	 										+ "' id='checkbox"
	 										+ rowCount
	 										+ "'/></td><td>"
	 										+ rowCount
	 										+ "  <input type='hidden' id='rowcountid"
	 										+ rowCount
	 										+ "' value ="
	 										+ rowCount
	 										+ "> </td>"
	 										+ " <td><div id ='divtxtPurchaseQuotationItemName_'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  onkeyup = autoforMulPo(this.id,'onload')  id='txtPurchaseQuotationItemName_"+rowCount+ "'  value='"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
	 												+ "' readOnly='readOnly' onblur='fetchContPartyDetails("+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code+","+rowCount+");'/>"
	 										+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
	 										+ rowCount
	 										+ "' value="+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code+" /><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
	 										+ rowCount
	 										+ "' value='0'/></div></td> <td><div id ='divtxtPurOrderSuplrName'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurOrderSuplrName_"
	 										+ rowCount
	 										+ "'  onkeyup = 'autoSugPartyName(this.id,onchange)'/>"
	 										+ "<input type='hidden'  id='txtPurOrderSuppId"
	 										+ rowCount
	 										+ "'value='0' /></div></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
	 										+ rowCount
	 										+ "' onkeyup='totalAmount(this.id,"
	 										+ rowCount
	 										+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty +"' >"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty + "</label></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
	 										+ ""
	 										+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
	 										+ rowCount
	 										+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
	 										+ rowCount
	 										+ "' onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
	 										+ rowCount
	 										+ "'   ></td>"
	 										+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' readonly=''></td>"
	 										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);'readonly='' style='width:100px;'></td>" +
	 										"<td><select style='width:160px;' class='form-control input-SmallText' onclick='multaxCalMulPO(this.id," + rowCount + ")'  multiple='multiple' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCodePO_"
	 										+ rowCount
	 										+ "'></select></td>"
	 										+ " <td><input  style='width:80px;' type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
	 										+ rowCount
	 										+ ")' id='txtPurchaseQuotationTaxAmount"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' readonly='' ></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
	 										+ rowCount
	 										+ "'   readonly='' ></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:100px;'></td>"
	 										+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor1"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);'maxlength='5' style='width:60px;' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "'><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor2"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;'> <label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor3"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);'maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor4"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td> "
	 										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
	 										+ rowCount
	 										+ "' onblur='pendingAmount(this.id,"
	 										+ rowCount
	 										+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "'></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' readonly=''  id='txtPurchaseQuotationPendingQuantity"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' style='width:60px;' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "'></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
	 										+ rowCount
	 										+ "' style='width:60px;'></td>"
	 										+ " </tr>";
	 						
	 						$("#ItemInfoTableMulPO").append(divcontent);
	 						$("#RowCountPO").val(rowCount);
	 						autoSugPartyName("txtPurOrderSuplrName_" + rowCount, "onload");
	 						rowCount++;
	 						autotaxMulPo("txtNewTaxMulPO", "onload");//this Function is used to Set multiple Taxes to items
	 						}
	 						
	 						else
	 							{
	 							
	 							}
	 						 
	 						
	 						}

	 					
	 					//autoSuggestionForLocation("txtPurchaseQuotationItemName_","onchange");
	 					isNew = 1;
	 					var totaltblsize = $("#RowCountPO").val();
	 					$("#totaltblsize").val(totaltblsize);
	 					/*totalDocQtyPO();
	 					toCreateDivPO();*/

	 				}

	 			});

	 }
	 
	 
	  
	 /**
	    Fetch taxcode By Autosuggetion for Multiple PURCHASE ORDER  * @Author :sudhir @Date:30may2017**/
	 function autotaxMulPo(inputID, typeauto) {
	 	 
	 	var resultData = [];
	 	var txtVal1 = $('#' + inputID).val();
	 	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
	 		var inputs = [];

	 		inputs.push('action=fetchItemTaxcode');

	 		inputs.push('txtVal=' + txtVal1);
	 		inputs.push('isId=no');
	 		var str = inputs.join('&');

	 		jQuery
	 				.ajax({
	 					async : false,
	 					type : "POST",
	 					data : str + "&reqType=AJAX",
	 					url : "InventoryServlet",
	 					timeout : 1000 * 60 * 15,
	 					cache : true,
	 					error : function() {
	 						alert('error');
	 					},
	 					success : function(r) {
	 						//var availableTags = [];
	 						if (r.length == 2) {
	 							$("#txtNewTaxMulPO").val('');
	 							$("#txtNewTaxMulPO").focus();
	 							
	 							alert("NO MATCHING FOUND Please Enter Valid Tax Code");
	 							// var arrValue1 = (inputID).split("_");
	 							// var idValue1 = (arrValue1[1]);
	 							

	 						} else {
	 							ajaxResponse = eval('(' + r + ')');
	 							//ajaxResponse = decodeURIComponent(r);
	 							var availableTags = [];
	 							availableTags = ajaxResponse;

	 							/*for ( var i = 0; i < ajaxResponse.inventoryTaxSetUps.length; i++) {
	 								availableTags
	 										.push((ajaxResponse.inventoryTaxSetUps[i].tax_code)
	 												+ "_"
	 												+ (ajaxResponse.inventoryTaxSetUps[i].tax_rate));
	 							}*/

	 							var template = "";
	 							for ( var j = 0; j < availableTags.length; j++) {
	 								var arrValue = (availableTags[j]).split(",");
	 								var idValue = (arrValue[1]);
	 								resultData.push({
	 									ID : idValue,
	 									Name : arrValue[0]
	 								});

	 								template = template + '<li data-value="' + idValue
	 								+ '" class=""><a href="#">' + arrValue[0] + "_"
	 								+ idValue + '</a></li>';

	 							}

	 							$("#div" + inputID + " .typeahead").html(template);

	 							if (typeauto != 'onload') {
	 								$("#div" + inputID + " .typeahead").show();
	 							}

	 							setTimeout(function() {
	 								$('#' + inputID).typeahead({
	 									source : resultData,
	 									displayField : 'Name',
	 									valueField : 'ID',
	 									onSelect : displayResult,
	 									scrollBar : true

	 								});
	 								//$("#" + inputId).data("typeahead").source = resultData;
	 							}, 500);
	 						}
	 					}
	 				});

	 		function displayResult(item) {
	 			$("#" + inputID).val((item.text).trim());
	 			//alert(item.value);

	 		}
	 	}
	 }

	 /*add the multiple vat and tax to listBox @Author Sudhir @date 30may2017*/ 
	 
	/* function addItemTaxNameMulPo() {
			//var pid = $("#hiddenPartyId").val();
			var taxcodeandrate = $("#txtNewTaxMulPO").val();
			if (taxcodeandrate == '') {
				alert("Please Select Tax.");
				return false;
			}
			var add = taxcodeandrate;
			//var partyid = pid;

			var flag = 1;
			$('#lstBoxforTaxMUlPO').find('option').each(function() {
				if ($(this).html() == add) {
					alert("Tax Is Present In List");
					flag = 0;
				}
			});
			if (flag == 1) {
				var o = new Option("option text", "value");
				// / jquerify the DOM object 'o' so we can use the html method
				$(o).html(add);
				$(o).val(taxcodeandrate);
				$("#lstBoxforTaxMUlPO").append(o);
				$("#txtNewTaxMulPO").val("");
				$('select option').filter(function() {
		 		    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
		 		}).remove();
			}
		}*/
	 
	 
	 function addItemTaxNameMulPo() {
			//var pid = $("#hiddenPartyId").val();
			var taxcodeandrate = $("#txtNewTaxMulPO").val();
			if (taxcodeandrate == '') {
				alert("Please Select Tax.");
				return false;
			}
			var add = taxcodeandrate;
			//var partyid = pid;
			
			var SGST = "";
			var CGST = "";

			var ckGst = add.split("_");

			if(ckGst[0] == "GST")//this if is used for adding Only GST Related Taxes 
			{
				var gstval = ckGst[1]; 
				
				var dividVal = parseFloat(gstval) / parseFloat(2);
				
				SGST = "SGST" + "_" + dividVal;
				CGST = "CGST" + "_" + dividVal;
				
				var flag = 1;
				$('#lstBoxforTaxMUlPO').find('option').each(function() {
					if ($(this).html() == SGST) {
						alert("Tax Is Present In List");
						flag = 0;
					}
				});
				if (flag == 1) {
					var o = new Option("option text", "value");
					// / jquerify the DOM object 'o' so we can use the html method
					$(o).html(SGST);
					$(o).val(SGST);
					$("#lstBoxforTaxMUlPO").append(o);
					$("#txtNewTaxMulPO").val("");
					$('select option').filter(function() {
			 		    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
			 		}).remove();
				}
				
				if (flag == 1) {
					var o = new Option("option text", "value");
					// / jquerify the DOM object 'o' so we can use the html method
					$(o).html(CGST);
					$(o).val(CGST);
					$("#lstBoxforTaxMUlPO").append(o);
					$("#txtNewTaxMulPO").val("");
					$('select option').filter(function() {
			 		    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
			 		}).remove();
				}
				}
				
			else //this else is used for adding None GST Taxes   
			{
			var flag = 1;
			$('#lstBoxforTaxMUlPO').find('option').each(function() {
				if ($(this).html() == add) {
					alert("Tax Is Present In List");
					flag = 0;
				}
			});
			if (flag == 1) {
				var o = new Option("option text", "value");
				// / jquerify the DOM object 'o' so we can use the html method
				$(o).html(add);
				$(o).val(taxcodeandrate);
				$("#lstBoxforTaxMUlPO").append(o);
				$("#txtNewTaxMulPO").val("");
				$('select option').filter(function() {
		 		    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
		 		}).remove();
			}
			}
		}
	 
	 /*** remove tax code and rate from list FOR mul purchase Order  **Author:Sudhir Date:11:jan:2016  ****/
	 function removeItemTaxMulPo() {

	 	$('#lstBoxforTaxMUlPO option:selected').remove();

	 }
	 
	 
	 
	// this function is used for apply tax to item in multiple PO @Date :30may2017 @Author :Sudhir 
	 function  applyTaxMulPO(){
	 	
	 	var txtPurchaseOrderTaxCode_ = "";
	 	// remove the wite space and empty option
	 	$('select option').filter(function() {
	 	    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
	 	}).remove();
	 	$('#lstBoxforTaxMUlPO').find('option').each(function() {
	 		txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_ + ($(this).val() + ",");
	 	});
	 	if(txtPurchaseOrderTaxCode_== ',')
	 	{
	 		alert("please Apply atleast one tax for Item");
	 		return false;
	 	}
	 	txtPurchaseOrderTaxCode_= txtPurchaseOrderTaxCode_.substring(0, txtPurchaseOrderTaxCode_.length-1);
	 	var rowCount = $("#hiddenCount").val();
	 	var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");
	 	
	 	 //$("#txtPurchaseQuotationTaxCodePO_"+rowCount).remove();
	 	//$('#txtPurchaseQuotationTaxCodePO_'+rowCount+'option').remove();
	 	$("#txtPurchaseQuotationTaxCodePO_" + rowCount + " option").remove();
	 	//$('#txtPurchaseQuotationTaxCodePO_'+rowCount).val('');
	 	
	 	 var sumofRate = 0;
	 	 for(var i=0;i<Finalrateandtax.length;i++)
	 		{ 
	 		finalrat = Finalrateandtax[i];
	 		var taxRate =  finalrat.split("_");
	 		finalRateamt = taxRate[1];
	 		
	 		sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
	 		
	 		var option = "";
	 		option = option
	 			+ "<option value="
	 			+ finalrat
	 			+ ">"
	 			+ finalrat
	 			+ "</option>";
	 	$("#txtPurchaseQuotationTaxCodePO_"+rowCount).append(option);
	 		}
	 	$("#txtPurchaseQuotationTaxAmount"+rowCount).val(sumofRate);
	 	$('#lstBoxforTaxMUlPO').html();
	 	$("#ApplyTaxforItemMUlPO").hide('hide');
	 	rowAmtCalMulPO(1,rowCount);
	 	//totalVatAmtPO(1,rowCount);
	 	 
	 }
	//this function is used for hide the Multipel Po POUP on close button @Date 30may2017 @Author Sudhir 
	  function  hideTaxPoupMulPO() {
	 	 $('#lstBoxforTaxMUlPO').html();
	 	 $("#ApplyTaxforItemMUlPO").hide('hide');
	 	 $("#txtNewTaxMulPO").val('');
	 	 
	 	}
	  
	  
	  //this function is used for calculate the tax and row Amt @Date :6jully2017 @Author :Sudhir Jadhav
	  function rowAmtCalMulPO(id, rowCount) {
			var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
			if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
				$('#txtPurchaseQuotationRowAmount' + rowCount).val('');
			} 
			
			var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
			if(baseAmt == " " || baseAmt == null)
			{
			$("#txtPurchaseQuotationRowAmount"+ rowCount).val(' ');
			return false;
			}
			
			else {
				
				var caltaxonBaseAmt = 0;
				var finalsumofRowAmt;
				var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
				var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
				caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
			    var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
				
			    $('#txtPurchaseOrderTaxAmtinRs'+ rowCount).val(finalcaltaxanmount);   // Add tax amount in Rs @author:paras @Date:22nov
				finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
				var finalalRowamount = finalsumofRowAmt.toFixed(2);
				$('#txtPurchaseQuotationRowAmount' + rowCount).val(finalalRowamount);
				
				/*var sum = 0;
				var baseAmt = $('#txtPurchaseQuotationBaseAmountPO' + rowCount).val();
				var taxAmt = $("#txtPurchaseQuotationTaxAmountPO" + rowCount).val();
				sum = parseFloat(baseAmt) + parseFloat(taxAmt);
				$('#txtPurchaseQuotationRowAmountPO' + rowCount).val(sum);*/
				
			}

		}
	  
	  
	
	  
	  
	  
	  /*@Author : sudhir jadhav 
	  @Date     : 7jully2017 @ Reactive @Date 27ug2017 gauid by sajan Rate and all those things 
	  @Code     : this function is used for getining party Contract Detasils for PO Processsing */ 
	  	
	  	function fetchContPartyDetails(itemMasterId,count) {
	  		// alert(itemMasterId);
	  		var itemId = itemMasterId; 
	  		var partyConId = '0';
			$("#txtPOprRowCont").val(count);
			
			$("#iHideMulPO").show();
			$("#closeMulPO").hide();
			
	  		var inputs = [];
	  		inputs.push('action=fetchPatyConDetails');
	  		inputs.push('itemId=' + itemId);
	  		inputs.push('partyConId=' + partyConId);
	  		inputs.push('isEdit=mulPOProc');

	  		var str = inputs.join('&');
	  		jQuery.ajax({
	  			async : false,
	  			type : "POST",
	  			data : str + "&reqType=AJAX",
	  			url : "InventoryServlet",
	  			timeout : 1000 * 60 * 5,
	  			catche : false,
	  			error : function() {
	  				alert("error");
	  			},
	  			success : function(r) {
	  				//alert(r);
	  				pobj1 = eval('(' + r + ')');
	  				
	  				$("#poProcPopUp").show();
	  				
	  				setLastPurDetails(r);
	  				
	  				counterItemSale = 1;
	  				 
	  			}
	  		});
	  	}
	  	
	  	
	  	function hidePOProcss()
	  	{
	  		$("#poProcPopUp").hide();
	  	}
	  	
	  	
	  	
	  	
	  	 /*@Date : 8jully2017
	    @Author : Sudhir Jadhav
	    @Code   : This Function is used for saviing and Genrationg Multiple Purchase Order Processing */
	    function saveMulPO() {
	  	  
	  	  	var txtPurOrderDate = $("#txtPurOrderDate").val();
	  		//var txtNarration = $("#txtNarration").val();
	  		var txtMulPODeliDate = $("#txtMulPODeliDate").val();
	  		
	  		var txtsubInvId = $("#txtsubInvId").val();
	  		var txtsubInvName = $("#txtsubInvName").val();
	  		 
	  		var rowCount = $("#RowCount").val();
	  		var totaltblsize = $("#totaltblsize").val();
	  		totaltblsize = totaltblsize + 1; //this for 
	  		var currentuserName = $("#CurrentuserName").val();
	  		var currentUserID = $("#currentUserID").val();
	  		 
	  		var clientIp = $("#txtHiddenClientIp").val();
	  		var txtSendtoClient = $("#txtSendtoClient").val(); 
	  		var centerId = $("#txtHiddenCenterId").val();
	  		var txtPurchaseQuotationRequestNo = $("#txtPurchaseOrderRequestNo").val();
	  		 
	  		
	  		var materiallist = {
	  				ltinvetorypurchaseorderitemmaster : []
	  			};
	  		
	  		
	  		/*this loop for removining last row which is not requaired @Date:30may2017 */
	  		for ( var i = 1; i <= totaltblsize; i++) {
	  		for ( var i = 1; i <= totaltblsize-1; i++)
	  			{
	  		if ($("#txtPurchaseQuotationItemNumber" + i).val() != null	&& $("#txtPurchaseQuotationItemNumber" + i).val() != undefined) {

	  			var txtPurchaseQuotationItemName = $(
	  					"#txtPurchaseQuotationItemNumber" + i).val();

	  			var txtPurchaseQuotationItemName_ = $(
	  					"#txtPurchaseQuotationItemName_" + i).val();

	  			var txtInvpurchaseCommonItemMasterId = $(
	  					"#txtInvpurchaseCommonItemMasterId" + i).val();
	  			
	  			var vendorId   = $("#txtPurOrderSuppId" + i).val();
	  			var vendorName = $("#txtPurOrderSuplrName_" + i).val();
	  			 

	  			var txtPurchaseQuotationDocQuantity = $(
	  					"#txtPurchaseQuotationDocQuantity" + i).val();

	  			var txtPurchaseQuotationUnitPrice = $(
	  					"#txtPurchaseQuotationUnitPrice" + i).val();
	  			var txtPurchaseQuotationTrdeDiscountPercentage = $(
	  					"#txtPurchaseQuotationTrdeDiscountPercentage" + i).val();
	  			var txtPurchaseQuotationTrdeDiscountAmt = $(
	  					"#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
	  			
	  			var txtPurchaseQuotationTrdeDiscountInRupess = $(
	  					"#txtPurchaseQuotationTrdeDiscountInRupess" + i).val();
	  			 
	  			
	  			var txtPurchaseQuotationBaseAmount = $(
	  					"#txtPurchaseQuotationBaseAmount" + i).val();
	  			
	  		/*	var txtPurchaseQuotationTaxCodePO_ = $("#txtPurchaseQuotationTaxCodePO_" + i).val();*/
	  			
	  			var txtPurchaseQuotationTaxCodePO_ = "";
	  			$('#txtPurchaseQuotationTaxCodePO_'+ i).find('option').each(function() {
	  				txtPurchaseQuotationTaxCodePO_ = txtPurchaseQuotationTaxCodePO_ + ($(this).val() + ",");
	  			});
	  			
	  			txtPurchaseQuotationTaxCodePO_= txtPurchaseQuotationTaxCodePO_.substring(0, txtPurchaseQuotationTaxCodePO_.length-1);
	  			 
	  			
	  /*var txtPurchaseQuotationTaxCodePO_ = "";
	  			
	  			$('#txtPurchaseQuotationTaxCodePO_'+ i).find('option:selected').each(function() {
	  				txtPurchaseQuotationTaxCodePO_ = txtPurchaseQuotationTaxCodePO_ + ($(this).val() + ",");
	  			});
	  			if(txtPurchaseQuotationTaxCode_ != "") 
	  			{
	  				txtPurchaseQuotationTaxCodePO_= txtPurchaseQuotationTaxCodePO_.substring(0, txtPurchaseQuotationTaxCodePO_.length-1);
	  			}
	  			else
	  			{
	  				$('#txtPurchaseQuotationTaxCodePO_'+ i).find('option').each(function() {
	  					txtPurchaseQuotationTaxCodePO_ = txtPurchaseQuotationTaxCodePO_ + ($(this).val() + ",");
	  				});
	  				txtPurchaseQuotationTaxCodePO_= txtPurchaseQuotationTaxCodePO_.substring(0, txtPurchaseQuotationTaxCodePO_.length-1);
	  			}*/
	  			
	  			
	  			var txtPurchaseQuotationTaxAmount = $(
	  					"#txtPurchaseQuotationTaxAmount" + i).val();
	  			
	  			var txtPurchaseOrderTaxAmtinRs= $("#txtPurchaseOrderTaxAmtinRs"+ i).val(); // Add TAX amount in Rs.
	  		
	  			var txtPurchaseQuotationRowAmount = $(
	  					"#txtPurchaseQuotationRowAmount" + i).val();
	  			var txtPurchaseQuotationFactor1 = $(
	  					"#txtPurchaseQuotationFactor1" + i).val();
	  			var txtPurchaseQuotationFactor2 = $(
	  					"#txtPurchaseQuotationFactor2" + i).val();
	  			var txtPurchaseQuotationFactor3 = $(
	  					"#txtPurchaseQuotationFactor3" + i).val();
	  			var txtPurchaseQuotationFactor4 = $(
	  					"#txtPurchaseQuotationFactor4" + i).val();
	  			var txtPurchaseQuotationActualQuantity = $(
	  					"#txtPurchaseQuotationActualQuantity" + i).val();
	  			var txtPurchaseQuotationPendingQuantity = $(
	  					"#txtPurchaseQuotationPendingQuantity" + i).val();
	  			var txtPurchaseQuotationBatchNoPO = $(
	  					"#txtPurchaseQuotationBatchNoPO" + i).val();
	  			
	  			var txtPurchaseQuotationFactor1UOM = $("#txtPurchaseQuotationFactor1UOM" + i).text(); 
	  			var txtPurchaseQuotationFactor2UOM = $("#txtPurchaseQuotationFactor2UOM" + i).text(); 
	  			var txtPurchaseQuotationFactor3UOM = $("#txtPurchaseQuotationFactor3UOM" + i).text(); 
	  			var txtPurchaseQuotationFactor4UOM = $("#txtPurchaseQuotationFactor4UOM" + i).text(); 
	  			var txtPurchaseQuotationLastFactorUOM = $("#txtPurchaseQuotationLastFactorUOM" + i).text();
	  			 

	  			//validatoin
	  			if (txtPurchaseQuotationItemName_ == ""
	  					|| txtPurchaseQuotationItemName_ == null) {

	  				alert("Please enter item name in " + i + " Row");
	  				$("#txtPurchaseQuotationItemName_" + i).focus();
	  				return false;

	  			} else {
	  				// $('#txtPurchaseQuotationItemNamePO_').css('border-color', '');
	  			}
	  			if(vendorId == '0' || vendorName == "" || vendorName == null)
	  			{
	  				alert("Please enter valid supplier name in " + i + " Row");
	  				return false;
	  				
	  			}
	  			if (txtPurchaseQuotationDocQuantity == ""
	  					|| txtPurchaseQuotationDocQuantity == null) {

	  				alert("Please enter item quantity in " + i + " Row");
	  				$("#txtPurchaseQuotationDocQuantity" + i).focus();
	  				return false;

	  			}
	  			if (txtPurchaseQuotationUnitPrice == ""
	  					|| txtPurchaseQuotationUnitPrice == null) {

	  				alert("Please enter item unit price in " + i + " Row");
	  				$("#txtPurchaseQuotationUnitPrice" + i).focus();
	  				return false;

	  			}

	  			 var pattern = /^[0-9]+\.?[0-9]*$/;
	  				if (!pattern.test(txtPurchaseQuotationUnitPrice)) {
	  					alert("Unit price should be of digits and a decimal point Only in "+i+" Row!");
	  					$("#txtPurchaseQuotationUnitPrice"+i).focus();
	  					return false;
	  				}
	  			
	  			if (txtPurchaseQuotationTrdeDiscountPercentage == ""
	  					|| txtPurchaseQuotationTrdeDiscountPercentage == null) {

	  				alert("Please enter item trade discount in " + i + " Row");
	  				$("#txtPurchaseQuotationTrdeDiscountPercentage" + i).focus();
	  				return false;

	  			}

	  			if (txtPurchaseQuotationTrdeDiscountInRupess == ""
	  					|| txtPurchaseQuotationTrdeDiscountInRupess == null) {

	  				alert("Please enter item trade discount rupess in " + i + " Row");
	  				$("#txtPurchaseQuotationTrdeDiscountInRupess" + i).focus();
	  				return false;

	  			}
	  			
	  			
	  			var pattern = /^[0-9]+\.?[0-9]*$/;
	  			if (!pattern.test(txtPurchaseQuotationTrdeDiscountPercentage)) {
	  				alert("Trade Discount should be of digits and a decimal point Only in "+i+" Row!");
	  				$("#txtPurchaseQuotationTrdeDiscountPercentage"+i).focus();
	  				return false;
	  			}
	  			
	  			if (txtPurchaseQuotationTrdeDiscountAmt == ""
	  					|| txtPurchaseQuotationTrdeDiscountAmt == null) {

	  				alert("Please enter item trade discount amount in " + i
	  						+ " Row");
	  				$("#txtPurchaseQuotationTrdeDiscountAmt" + i).focus();
	  				return false;

	  			}
	  			if (txtPurchaseQuotationBaseAmount == ""
	  					|| txtPurchaseQuotationBaseAmount == null) {

	  				alert("Please enter item base amount in " + i + " Row");
	  				$("#txtPurchaseQuotationBaseAmount" + i).focus();
	  				return false;

	  			}
	  			
	  			if (txtPurchaseQuotationTaxCodePO_ == ""|| txtPurchaseQuotationTaxCodePO_ == null) {

	  			alert("Please enter item tax code in " + i + " Row");
	  			$("#txtPurchaseQuotationTaxCodePO_" + i).focus();
	  			return false;

	  		}
	  			
	  			if (txtPurchaseQuotationTaxAmount == ""
	  					|| txtPurchaseQuotationTaxAmount == null) {

	  				alert("Please enter item tax amount in " + i + " Row");
	  				$("#txtPurchaseQuotationTaxAmount" + i).focus();
	  				return false;

	  			}
	  	
	  			/***** adding valdation for tax amount@Date:17oct2016 @author: sudhir jadhav *****/	  
	  			  
	  			  if (txtPurchaseQuotationTaxAmount == '' || txtPurchaseQuotationTaxAmount == undefined || txtPurchaseQuotationTaxAmount == null || txtPurchaseQuotationTaxAmount == "NaN") {
	  			     	var min = parseInt(minLen);
	  			  	var max = parseInt(maxLen);
	  			  	
	  			  	var name19 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
	  			  	var value19 = ""; 
	  			  	    value19 = $("#txtPurchaseQuotationTaxAmount" + i).val();
	  			  		
	  			  		if (min > value19.length || max < value19.length) {
	  			  		
	  			  			/*$("#txtPurchaseQuotationTaxAmount").val('0');*/
	  			  			$("#txtPurchaseQuotationTaxAmount" + i).val('');
	  			  			$("#txtPurchaseQuotationTaxCodePO_" + i).focus();
	  			  			return false;
	  			  		} else if (value19 != "" && !name19.test(value19)) {
	  			  			
	  			  			alert("Please enter valid Tax");
	  			  			$("#txtPurchaseQuotationTaxAmount" + i).val('');
	  			  			$("#txtPurchaseQuotationTaxCodePO_" + i).focus();
	  			  			return false;
	  			  		}
	  			  	   else if(value19 == "" || value19 == null)
	  			  	      {
	  			  			alert("Please Enter Valid Tax ");
	  			  			$("#txtPurchaseQuotationTaxCodePO_" + i).focus();
	  			  			return false;
	  			  	      }
	  			  }
	  			  
	  			  /*** END adding valdation for tax amount@Date:17oct2016 @author: sudhir jadhav *****/		  

	  			

	  			if (txtPurchaseQuotationRowAmount == ""
	  					|| txtPurchaseQuotationRowAmount == null) {

	  				alert("Please enter item row amount in " + i + " Row");
	  				$("#txtPurchaseQuotationRowAmount" + i).focus();
	  				return false;

	  			}

	  			if (txtPurchaseQuotationActualQuantity == ""
	  					|| txtPurchaseQuotationActualQuantity == null) {

	  				alert("Please enter item order quantity in " + i + " Row");
	  				$("#txtPurchaseQuotationActualQuantity" + i).focus();
	  				return false;

	  			}

	  			if (txtPurchaseQuotationPendingQuantity == ""
	  					|| txtPurchaseQuotationPendingQuantity == null) {

	  				alert("Please enter item pending quantity in " + i + " Row");
	  				$("#txtPurchaseQuotationPendingQuantity" + i).focus();
	  				return false;

	  			}

	  			if((parseFloat(txtPurchaseQuotationFactor1) == NaN || txtPurchaseQuotationFactor1 != "")){
	  				  
	  				  var min = parseInt(minLen);
	  				  var max = parseInt(maxLen);
	  				   
	  					// alert("number field");
	  					var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
	  					var value1 = txtPurchaseQuotationFactor1; //$('#' + id).val();
	  					
	  					if (min > value1.length || max < value1.length) {
	  						alert("Please enter valid item factor1 in "+i+" Row");
	  						
	  						$("#txtPurchaseQuotationFactor1" + i).val('');
	  						$("#txtPurchaseQuotationFactor1" + i).focus();
	  						return false;
	  					} else if (value1 != "" && !name1.test(value1)) {
	  						//alert("Please Enter  txtPurchaseQuotationFactor3  Only number!");
	  						alert("Please enter valid item factor1 in "+i+" Row");
	  						$("#txtPurchaseQuotationFactor1" + i).val('');
	  						$("#txtPurchaseQuotationFactor1" + i).focus();
	  						return false;
	  					}
	  					
	  				}
	  	  
	  	  if((parseFloat(txtPurchaseQuotationFactor2) == NaN || txtPurchaseQuotationFactor2 != "")){
	  		  
	  		  var min = parseInt(minLen);
	  		  var max = parseInt(maxLen);
	  		   
	  			// alert("number field");
	  			var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
	  			var value1 = txtPurchaseQuotationFactor2; //$('#' + id).val();
	  			
	  			if (min > value1.length || max < value1.length) {
	  				alert("Please enter valid item factor2 in "+i+" Row");
	  				
	  				$("#txtPurchaseQuotationFactor2" + i).val('');
	  				$("#txtPurchaseQuotationFactor2" + i).focus();
	  				return false;
	  			} else if (value1 != "" && !name1.test(value1)) {
	  				//alert("Please Enter  txtPurchaseQuotationFactor3  Only number!");
	  				alert("Please enter valid item factor2 in "+i+" Row");
	  				$("#txtPurchaseQuotationFactor2" + i).val('');
	  				$("#txtPurchaseQuotationFactor2" + i).focus();
	  				return false;
	  			}
	  			
	  		}
	  	  
	  	  if((parseFloat(txtPurchaseQuotationFactor3) == NaN || txtPurchaseQuotationFactor3 != "")){
	  		  
	  		  var min = parseInt(minLen);
	  		  var max = parseInt(maxLen);
	  		   
	  			// alert("number field");
	  			var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
	  			var value1 = txtPurchaseQuotationFactor3; //$('#' + id).val();
	  			
	  			if (min > value1.length || max < value1.length) {
	  				alert("Please enter valid item factor3 in "+i+" Row");
	  				
	  				$("#txtPurchaseQuotationFactor3" + i).val('');
	  				$("#txtPurchaseQuotationFactor3" + i).focus();
	  				return false;
	  			} else if (value1 != "" && !name1.test(value1)) {
	  				//alert("Please Enter  txtPurchaseQuotationFactor3  Only number!");
	  				alert("Please enter valid item factor3 in "+i+" Row");
	  				$("#txtPurchaseQuotationFactor3" + i).val('');
	  				$("#txtPurchaseQuotationFactor3" + i).focus();
	  				return false;
	  			}
	  			
	  		}
	  			  
	  			  if((parseFloat(txtPurchaseQuotationFactor4) == NaN || txtPurchaseQuotationFactor4 != "")){
	  				  
	  				  var min = parseInt(minLen);
	  				  var max = parseInt(maxLen);
	  				   
	  					// alert("number field");
	  					var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
	  					var value1 = txtPurchaseQuotationFactor4; //$('#' + id).val();
	  					
	  					if (min > value1.length || max < value1.length) {
	  						alert("Please enter valid item factor4 in "+i+" Row");
	  						
	  						$("#txtPurchaseQuotationFactor4" + i).val('');
	  						$("#txtPurchaseQuotationFactor4" + i).focus();
	  						return false;
	  					} else if (value1 != "" && !name1.test(value1)) {
	  						alert("Please enter valid item factor4 in "+i+" Row");
	  						$("#txtPurchaseQuotationFactor4" + i).val('');
	  						$("#txtPurchaseQuotationFactor4" + i).focus();
	  						return false;
	  					}
	  					
	  				}
	  			  
	  			
	  			/*			if (txtPurchaseQuotationFactor1 == ""
	  					|| txtPurchaseQuotationFactor1 == null) {

	  				alert("Please enter item factor1 in " + i + " Row");
	  				$("#txtPurchaseQuotationFactor1" + i).focus();
	  				return false;

	  			}
	  			if (txtPurchaseQuotationFactor2 == ""
	  					|| txtPurchaseQuotationFactor2 == null) {

	  				alert("Please enter item factor2 in " + i + " Row");
	  				$("#txtPurchaseQuotationFactor2" + i).focus();
	  				return false;

	  			}
	  			if (txtPurchaseQuotationFactor3 == ""
	  					|| txtPurchaseQuotationFactor3 == null) {

	  				alert("Please enter item factor3 in " + i + " Row");
	  				$("#txtPurchaseQuotationFactor3" + i).focus();
	  				return false;

	  			}
	  			if (txtPurchaseQuotationFactor4 == ""
	  					|| txtPurchaseQuotationFactor4 == null) {

	  				alert("Please enter item factor4 in " + i + " Row");
	  				$("#txtPurchaseQuotationFactor4" + i).focus();
	  				return false;

	  			}*/
	  			
	  			 if(txtPurchaseQuotationDocQuantity !== txtPurchaseQuotationActualQuantity){
	  					
	  			    	alert(" Order Quantity should be equal to Item Quantity "+i+" Row");
	  					$("#txtPurchaseQuotationActualQuantity" + i).focus();
	  					return false;
	  					
	  				}
	  			 
	  			  
	  			materiallist.ltinvetorypurchaseorderitemmaster
	  					.push({

	  						// inv_purchase_common_item_code:,
	  						inv_purchase_order_item_Name : txtPurchaseQuotationItemName_,
	  						inv_purchase_order_item_code : txtPurchaseQuotationItemName,
	  						inv_purchase_order_item_doc_Qty : txtPurchaseQuotationDocQuantity,
	  						inv_purchase_order_item_unit_price : txtPurchaseQuotationUnitPrice,

	  						inv_purchase_order_item_trade_discount_per : txtPurchaseQuotationTrdeDiscountPercentage,
	  						inv_purchase_order_item_trade_discount_rupess:txtPurchaseQuotationTrdeDiscountInRupess,
	  						inv_purchase_order_item_trade_discount_amount : txtPurchaseQuotationTrdeDiscountAmt,
	  						inv_purchase_order_item_trade_base_amount : txtPurchaseQuotationBaseAmount,
	  						inv_purchase_order_item_master_id : txtInvpurchaseCommonItemMasterId,

	  						inv_purchase_order_item_tax_amount : txtPurchaseQuotationTaxAmount,
	                       	inv_purchase_order_item_tax_amount_rupess:txtPurchaseOrderTaxAmtinRs, // push tax amount in Rs list @author:paras @Date:23nov
	  						inv_purchase_order_item_tax_code:txtPurchaseQuotationTaxCodePO_,
	  						inv_purchase_order_item_row_amount : txtPurchaseQuotationRowAmount,
	  						inv_purchase_order_item_factor1 : txtPurchaseQuotationFactor1,
	  						inv_purchase_order_item_factor2 : txtPurchaseQuotationFactor2,

	  						inv_purchase_order_item_factor3 : txtPurchaseQuotationFactor3,
	  						inv_purchase_order_item_factor4 : txtPurchaseQuotationFactor4,
	  						inv_purchase_order_item_actural_qty : txtPurchaseQuotationActualQuantity,
	  						inv_purchase_order_item_pending_qty : txtPurchaseQuotationPendingQuantity,

	  						inv_purchase_order_item_batch_No : txtPurchaseQuotationBatchNoPO,
	  						/*inv_purchase_order_item_batch_No : txtPurchaseQuotationBatchNo,*/

	  						//inv_purchase_order_item_base_doc_No : txtPurchaseQuotationDocNo,
	  						//inv_purchase_order_item_doc_number : txtPurchaseQuotationDocNo,

	  						//inv_purchase_order_item_doc_number_fk : txtPurchaseQuotationDocNo,
	  						//inv_purchase_order_item_doc_series : txtDocSeries,
	  						
	  						
	  						
	  						inv_item_purchase_factor_uom_1 : txtPurchaseQuotationFactor1UOM,
	  						inv_item_purchase_factor_uom_2 : txtPurchaseQuotationFactor2UOM,
	  						inv_item_purchase_factor_uom_3 : txtPurchaseQuotationFactor3UOM,
	  						inv_item_purchase_factor_uom_4 : txtPurchaseQuotationFactor4UOM,
	  						inv_item_purchase_last_factor_uom :txtPurchaseQuotationLastFactorUOM,
	  						inv_purchase_order_master_Supplier_Id:vendorId,
	  						inv_purchase_order_master_Supplier_Name:vendorName,
	  						
	  						usrName  : currentuserName,
	  						userId   : currentUserID,
	  						delvDate : txtMulPODeliDate,
	  						docDate  : txtPurOrderDate,
	  				  	  
	  						sendtoClient : txtSendtoClient,
	  						inv_purchase_order_hidden_ip : clientIp,
	  						purchaseOrderCenterId : centerId,
	  						clientIp : clientIp,
	  						mrnId :txtPurchaseQuotationRequestNo,
	  						
	  						subInvId:txtsubInvId,
	  						subInvName:txtsubInvName
	  							 
	  					});

	  		}

	  	}

	  }
	  		
	  		var li = materiallist.ltinvetorypurchaseorderitemmaster.length;
	  		 if(li == 0)
	  			{
	  			alert("Please enter atleast one Item row to Save Purchase Order Processing");
	  			return false;
	  			}
	  		
	  		materiallist = JSON.stringify(materiallist);
	  		var inputs = [];
	   
	  		inputs.push('action=SaveMulPOProcesing');
	  		inputs.push('materiallist=' + materiallist);
	  		 
	  		//alert(materiallist);
	  		var str = inputs.join('&');

	  		jQuery.ajax({
	  			async : false,
	  			type : "POST",
	  			data : str + "&reqType=AJAX",
	  			url : "InventoryServlet",
	  			timeout : 1000 * 60 * 5,
	  			catche : false,
	  			error : function() {
	  				alert("error");
	  			},
	  			success : function(r) {
	  				ajaxResponse = r;
	  				alert(r);
	  				
	  				$('#MulPOForm').removeClass('fade');
	  				$('#MulPOForm').modal('hide');
	  				window.location.reload("inventory_Purchase_Request_List.jsp");
	  			}
	  		});
	  		
	  }
	    
	    
	    
	    
	    
	  //this function is used  to proccess the  club Mrn to Purchase Order @Date : 6jully2017 @Author :Sudhir jadhav
	  	function procClubMRNPO(reqId,MrnId) {
	 		var today = new Date();
		 	var dd = today.getDate();
		     var mm = today.getMonth()+1; //January is 0!
		     var yyyy = today.getFullYear();
		     
		     if(dd<10){
		         dd='0'+dd;
		     } 
		     if(mm<10){
		         mm='0'+mm;
		     } 
		     
		     var today1 = dd+'/'+mm+'/'+yyyy;
		     
		     
		     $("#txtPurOrderDate").val(today1);
		     $("#txtMulPODeliDate").val(today1);
		     
	//mrn culb Mrn Details 1 jully 2017
	 		var inputs = [];
	 		inputs.push('action=GetClubMrnSlaveDetails');
	 		inputs.push('isEdit=no');
	 		// alert(txtSubContractingMaterialIssueDocNo);
	 		inputs.push('txtReqId=' + reqId);
	 		var str = inputs.join('&');
	 		jQuery
	 				.ajax({
	 					async : false,
	 					type : "POST",
	 					data : str + "&reqType=AJAX",
	 					url : "InventoryServlet",
	 					timeout : 1000 * 60 * 5,
	 					catche : false,
	 					error : function() {
	 						alert("error");
	 					},
	 					success : function(r) {
	 						//alert(r);
	 						pobj1 = eval('(' + r + ')');
	 						var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;

	 						var rowCount = 1;
		 					for ( var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
		 						
		 						var divcontent = "";
	 						if(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].accptRejtstus == "Accept" && pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty > 0)
	 						{	
	 							divcontent = divcontent + "<tr id='deleterow"
	 										+ rowCount
	 										+ "'> <td> <input type='checkbox'  name='checkbox"
	 										+ rowCount
	 										+ "' id='checkbox"
	 										+ rowCount
	 										+ "'/></td><td>"
	 										+ rowCount
	 										+ "  <input type='hidden' id='rowcountid"
	 										+ rowCount
	 										+ "' value ="
	 										+ rowCount
	 										+ "> </td>"
	 										+ " <td><div id ='divtxtPurchaseQuotationItemName_'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  onkeyup = autoforMulPo(this.id,'onload')  id='txtPurchaseQuotationItemName_"+rowCount+ "'  value='"
	 												+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
	 												+ "' readOnly='readOnly' onblur='fetchlastPurDetails("+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code+","+rowCount+");'/>"
	 										+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
	 										+ rowCount
	 										+ "' value="+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code+" /><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
	 										+ rowCount
	 										+ "' value='0'/></div></td> <td><div id ='divtxtPurOrderSuplrName'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurOrderSuplrName_"
	 										+ rowCount
	 										+ "' onkeyup = 'autoSugPartyName(this.id,onchange)'  />"
	 										+ "<input type='hidden'  id='txtPurOrderSuppId"
	 										+ rowCount
	 										+ "'value='0' /></div></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
	 										+ rowCount
	 										+ "' onkeyup='totalAmount(this.id,"
	 										+ rowCount
	 										+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"'  ></label></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
	 										+ ""
	 										+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
	 										+ rowCount
	 										+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
	 										+ rowCount
	 										+ "' onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
	 										+ rowCount
	 										+ "'   ></td>"
	 										+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' readonly=''></td>"
	 										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);'readonly='' style='width:100px;'></td>" +
	 										"<td><select style='width:160px;' class='form-control input-SmallText' onclick='multaxCalMulPO(this.id," + rowCount + ")'  multiple='multiple' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCodePO_"
	 										+ rowCount
	 										+ "'></select></td>"
	 										+ " <td><input  style='width:80px;' type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
	 										+ rowCount
	 										+ ")' id='txtPurchaseQuotationTaxAmount"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' readonly='' ></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
	 										+ rowCount
	 										+ "'   readonly='' ></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:100px;'></td>"
	 										+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor1"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);'maxlength='5' style='width:60px;' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "'><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor2"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;'> <label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor3"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);'maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor4"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td> "
	 										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
	 										+ rowCount
	 										+ "' onblur='pendingAmount(this.id,"
	 										+ rowCount
	 										+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "'></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' readonly=''  id='txtPurchaseQuotationPendingQuantity"
	 										+ rowCount
	 										+ "' onkeypress='return validateNumbers(event);' style='width:60px;' value='"+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty + "'></td> "
	 										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
	 										+ rowCount
	 										+ "' style='width:60px;'></td>"
	 										+ " </tr>";
	 						
	 						$("#ItemInfoTableMulPO").append(divcontent);
	 						$("#RowCountPO").val(rowCount);
	 						autoSugPartyName("txtPurOrderSuplrName_" + rowCount, "onload");
	 						rowCount++;
	 						autotaxMulPo("txtNewTaxMulPO", "onload");//this Function is used to Set multiple Taxes to items
	 						}
	 						
	 						else
	 							{
	 							
	 							}

		 					}

	 						/*var tblSubContractingCountRow1 = $("#txtMRNID").val();
	 						$("#totalRow").val(tblSubContractingCountRow1);*/
	 						
		 					isNew = 1;
		 					var totaltblsize = $("#RowCountPO").val();
		 					$("#totaltblsize").val(totaltblsize);
	 						//checkSession();

	 					}

	 				});
	 		
	 	}
	  	
	  	//this function is used for fetch last Purchase Details for items 9jully21017
	  	
	  	 function fetchlastPurDetails(itemId,count) {
	  		 
	  		$("#txtPOprRowCont").val(count);
			$("#iHideMulPO").show();
			$("#closeMulPO").hide();
			
	  		 
	  		var inputs = [];
	  		inputs.push('action=FetchlastPurItemDetails');
	  		inputs.push('itemId='+itemId);
	  		var str = inputs.join('&');
	  		jQuery.ajax({
	  			async : false,
	  			type : "POST",
	  			data : str + "&reqType=AJAX",
	  			url : "InventoryServlet",
	  			timeout : 1000 * 60 * 5,
	  			catche : false,
	  			error : function() {
	  				alert("error");
	  			},
	  			success : function(r) {
	  				//ajaxResponse = r;
	  				//alert(r);
	  				
	  				pobj1 = eval('(' + r + ')');
	  				
	  				$("#poProcPopUp").show();
	  				
	  				setLastPurDetails(r);
	  				/*$('#lastPurchasePopUp').modal('show');
	  				var pobj1 = JSON.parse(r); 
	  				setLastPurDetails(pobj1);*/
	  			}
	  		});

	  	}
	  	 
	  	 
	  	 
	  	 
	  	/**this Auto suggetion function  Party Name when last Purchase Is not Avaliable  @author sudhir @date 9jully2017***/
	  	 function autoSugPartyName(inputId, type) {
	  	 	var resultData = [];

	  	 	var txtVal = $('#' + inputId).val();

	  	 	if ((type == "onload") || (txtVal != null && txtVal != "")) {
	  	 		var inputs = [];
	  	 		inputs.push('action=fetchPartyName');
	  	 		inputs.push('txtVal=' + txtVal);
	  	 		var str = inputs.join('&');
	  	 		jQuery.ajax({
	  	 			async : false,
	  	 			type : "POST",
	  	 			data : str + "&reqType=AJAX",
	  	 			url : "InventoryServlet",
	  	 			timeout : 1000 * 60 * 15,
	  	 			cache : true,
	  	 			error : function() {
	  	 				alert('error');
	  	 			},
	  	 			success : function(r) {
	  	 				if (r.length == 20) {
	  	 					 
	  							var arrValue1 = (inputId).split("_");
	  							var idValue1 = (arrValue1[1]);
	  							
	  							$("#txtPurOrderSuplrName_"+ idValue1).val('');
	  							$("#txtPurOrderSuplrName_"+ idValue1).focus();
	  							alert("NO MATCHING FOUND");
	  	 				} else {
	  	 					ajaxResponseObj = r;
	  	 					beanObj = eval('(' + ajaxResponseObj + ')');

	  	 					var template = "";
	  	 					for ( var j = 0; j < beanObj.ltpartyMaster.length; j++) {

	  	 						resultData.push({
	  	 							ID : beanObj.ltpartyMaster[j].party_master_id,
	  	 							Name : beanObj.ltpartyMaster[j].party_master_name
	  	 						});

	  	 						template = template + '<li data-value="'
	  	 								+ (beanObj.ltpartyMaster[j].party_master_id)
	  	 								+ '" class=""><a href="#">'
	  	 								+ beanObj.ltpartyMaster[j].party_master_name
	  	 								+ '</a></li>';

	  	 					}

	  	 					setTimeout(function() {

	  	 						$("#div" + inputId + " .typeahead").html(template);
	  	 						if (type != 'onload') {
	  	 							$("#div" + inputId + " .typeahead").show();
	  	 						}

	  	 						$("#" + inputId).typeahead({
	  	 							source : resultData,
	  	 							displayField : 'Name',
	  	 							valueField : 'ID',
	  	 							onSelect : displayResult,
	  	 							scrollBar : true
	  	 						});

	  	 					}, 500);
	  	 				}
	  	 			}
	  	 		});

	  	 		function displayResult(item) {

	  	 			$("#" + inputId).val((item.text).trim());
	  	 		//	$("#txtPurOrderSuppId").val(item.value);
	  	 			
	  	 			/*$('#' + inputId).val(item.text);*/
	  	 			var arrValue = (inputId).split("_");
	  	 			var idValue = (arrValue[1]);
	  	 			var currentcode = item.value;

	  	 			$('#txtPurOrderSuppId' + idValue).val(currentcode);
	  	 			//$("#hiddenPartyId").val(item.value);

	  	 		}
	  	 	}
	  	 }
	  	 