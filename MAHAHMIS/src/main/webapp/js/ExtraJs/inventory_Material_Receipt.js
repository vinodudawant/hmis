function fetchMaterialRequestNoteDetailsforIssue() {
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetail');
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
			pobj1 = eval('(' + r + ')');
			//alert(r);
			$("#MRNcontentRecieved").setTemplate(inventoryMRNTemp1Recieved);
			$("#MRNcontentRecieved").processTemplate(pobj1);

			$("#MRNAjaxRespRecieved").html(r);
		}
	});
}



function fetchMRNDetailByIdReceipt(mrnId) {
	if (mrnId == null || mrnId == "") {
		alert("Plz enter  mrn Id");
		$("#byMrnIdRecieved").focus();
		return false;
	}
	
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetail');
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
				
				$("#MRNcontentRecieved").setTemplate(inventoryMRNTemp1Recieved);
				$("#MRNcontentRecieved").processTemplate(pobj1);
				
			} else {
				alert("Record not found..!");
				fetchMaterialRequestNoteDetailsforIssue();
			}
			$('#byMrnIdRecieved').val("");

		}
	});
}




/*var inventoryMRNTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 98%;'>"
	+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
	+ "<th ' class='col-md-2 center'><div>MRN Doc No</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Qty</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>status</div></th> </tr> </thead>"
	+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO} <tr> {#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_status ='complete'}<td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td>"
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#Purchase_Request' onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
	+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='submit'   onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-edit'></i></button></td> <td id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td></tr>{#/if}{#/for}</table>"
*/	
	var inventoryMRNTemp1Recieved = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
		+ "<th ' class='col-md-2 center'><div>MRN Doc No</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Dispatch date </div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Recived Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>status</div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_status ='complete'}<tr class='center'><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td> "
		+ " <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_recived_date}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td> <td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#MRNForm' onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT'><i class='fa fa-edit'></i></button></td> "
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger' type='button'   onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-trash-o'></i></button></td> <td style='background:#C0C0C0;color:green' id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td></tr>{#/if}{#/for}</table>";

