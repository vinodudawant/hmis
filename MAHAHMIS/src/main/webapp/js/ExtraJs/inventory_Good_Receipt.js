
// fetchMaterialRequestNoteDetailsGoodsReceipt for goods Receipt 

function fetchMaterialRequestNoteDetailsGoodsReceipt() {
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailsGoodsReceipt');
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
			pobj1 = eval('(' + r + ')');
			$("#documentContent").setTemplate(inventoryMRNTemp1goofsreceipt);
			$("#documentContent").processTemplate(pobj1);

			$("#docuemntAjaxResp").html(r);
		}
	});
}




/********************************88Search Goods Receipt***********************************/
function fetchMaterialRequestNoteDetailsGoodsReceiptSearch(mrnId) {
	 
	if (mrnId == null || mrnId == "") {
		alert("Please Enter MRN Id");
		$("#byMrnIdRecieved").focus();
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailsGoodsReceipt');
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
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			objMRN = JSON.parse(r);
			if (objMRN.inventoryMaterialRequestNoteMasterDTO.length > 0) {
				
				$("#documentContent").setTemplate(inventoryMRNTemp1goofsreceipt);
				$("#documentContent").processTemplate(pobj1);
				$("#docuemntAjaxResp").html(r);
				
			} else {
				alert("Record not found..!");
				/*$("#MRNcontentRecieved").setTemplate("oops!  No Record Found");
				$("#MRNcontentRecieved").css("text-align", "left");
				$("#MRNcontentRecieved").processTemplate(pobj1);*/
				//fetchMaterialRequestNoteDetailsShows();
				fetchMaterialRequestNoteDetailsGoodsReceipt();
			}

		}
	});
}

/*print Mrn Details for Gooods Receipt*/
function printMRNDetails(mrnId)
{
	
	var obj = $("#docuemntAjaxResp").html();
	objPurchase = JSON.parse(obj);
	var myObj = "";
	for ( var rowCount = 0; rowCount < objPurchase.inventoryMaterialRequestNoteMasterDTO.length; rowCount++) {
		if (objPurchase.inventoryMaterialRequestNoteMasterDTO[rowCount].mrn_id == mrnId) {
			myObj = objPurchase.inventoryMaterialRequestNoteMasterDTO[rowCount];
			break;
		}
	}
	
	$("#txtSubInventoryName").val(myObj.inv_mrn_location_name);
	
	$("#txtcarrierName").val(myObj.inv_mrn_receiver_name);
	$("#txtMrnRaisedByName").val(myObj.inv_mrn_booker_name);
	
	
	
	var txtSubInventoryName = $("#txtSubInventoryName").val();
	var txtcarrierName = $("#txtcarrierName").val();
	var txtMrnRaisedByName = $("#txtMrnRaisedByName").val();
	window.open("inventory_Good_Receipt_Print.jsp?txtPurchaseOrderSupplierCode="+ mrnId+"&MrnID="+mrnId+ "&txtPurchaseOrderDocSeries=" +txtSubInventoryName+ "&txtcarrierName=" +txtcarrierName+"&txtMrnRaisedByName="+txtMrnRaisedByName);
	
}


/************************ tamplet variable for view Mrn master  details for Goods Receipt ***************************/

var SrNo =1;
var inventoryMRNTemp1goofsreceipt = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
	+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Dispatch date </div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Received Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Subinventory Name </div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th> "
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Status</div></th> </tr> </thead>"
	+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO} <tr class='center'><td>{SrNo++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td> "
	+ " <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_recived_date}</td> <td style='text-align=left;' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td> <td style='text-align=left;' id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td> <td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#MRNForm' onclick=\"printMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT' ><i class='fa fa-print'></i></button></td> "
	+ "  <td  style='text-align=left;' id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td></tr> {#/for}</table>";