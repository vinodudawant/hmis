
/**************Save subInventory Master ************/
function savesubInventoryMaster() {
	
	var txtShelfId = $("#txtShelfId").val();
	var txtName = $("#txtName").val();
	var txtLocation = $("#txtLocation").val();
	var status = 'Y';

	if (txtName == "") {
		alert("Please fill mandetory fields..!");
		return false;
	}
	var inputs = [];
	inputs.push('action=saveSubInventoryDetail');
	inputs.push('txtShelfId=' + txtShelfId);
	inputs.push('txtName=' + txtName);
	inputs.push('txtLocation=' + txtLocation);
	inputs.push('status=' + status);
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
			alert("Record saved successfully..!");
			window.location.replace("inventory_subInventory_Master.jsp");
		}
	});
}
/****************** fetch div display content **************/
function fetchSubInventoryNew() {
	var inputs = [];
	inputs.push('action=fetchSubInventoryNew');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
//		url : "InventoryServlet",
		url : "ehat/inventoryM/fetchSubInventoryNew",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//alert(r);
			pobj1 = eval('(' + r + ')');
			$("#shelfContent").setTemplate(inventoryShelfTemp);
			$("#shelfContent").processTemplate(pobj1);

			$("#shelfAjaxResp").html(r);
		}
	});
}

/******* view and Edit SubInventory **********/  
function viewSubInventoryDetail(subinventory_Id) {
	
	var obj = $("#shelfAjaxResp").html();
	objShelf = JSON.parse(obj);
	
	for ( var i = 0; i < objShelf.ltSubInventoryDTO.length; i++) {
		if (objShelf.ltSubInventoryDTO[i].subinventory_Id == subinventory_Id) {
			$("#txtShelfId").val(objShelf.ltSubInventoryDTO[i].subinventory_Id);
			$("#txtName").val(objShelf.ltSubInventoryDTO[i].subinventory_name);
			$("#txtLocation").val(objShelf.ltSubInventoryDTO[i].subinventory_location);
		}
	}
}

/*************** Delete the inventory subInventory ****************/
function deleteSubInventoryDetail(shelfId) {
	var didConfirm = confirm("Are you sure to delete?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteShelfDetail');
		inputs.push('shelfid=' + shelfId);
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
				fetchShelfDetailNew();
			}
		});
	}
}

function fetchShelfDetail(shelfId) {
	if(shelfId == "")
		{
		alert("Please enter sub inventory name");
		$("#byName").focus();
		return false;		
		}
	
	if(shelfId != "")
	{
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(mfgName)) {
			alert("manufacturer name should be of alphabets only with a single space allowed..!");
			$("#byName").focus();
			return false;
		}		
	}
	
	var inputs = [];
	inputs.push('action=fetchSubInventoryNew');
	inputs.push('isEdit=yes');

	inputs.push('shelfid=' + shelfId);
   
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
			objVendor = JSON.parse(r);
			if (pobj1.ltShelfDTO.length >0) {
				$("#shelfContent").setTemplate(inventoryShelfTemp);
				$("#shelfContent").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchShelfDetailNew();
			}
			$("#byName").val("");

		}
	});
}
/* New Inventory Function */
var inventoryShelfTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Name</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Location</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltSubInventoryDTO as ltSubInventoryDTO}<tr><td id='id{$T.ltSubInventoryDTO.subinventory_Id}'>{$T.ltSubInventoryDTO.subinventory_Id}</td><td id='desc{$T.ltSubInventoryDTO.subinventory_Id}'>{$T.ltSubInventoryDTO.subinventory_name}</td><td id='desc{$T.ltSubInventoryDTO.subinventory_Id}'>{$T.ltSubInventoryDTO.subinventory_location}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' onclick=\"viewSubInventoryDetail({$T.ltSubInventoryDTO.subinventory_Id})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='submit' onclick=\"deleteSubInventoryDetail({$T.ltSubInventoryDTO.subinventory_Id})\"><i class='fa fa-edit'></i></button></td</tr>{#/for}</table>"

		
function getNextSubInventoryStocktblId() {
	var inputs = [];
	inputs.push('action=getNextSubInventoryStocktblId');
	inputs.push('tableName=inv_subinventory_stock_master');
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
			$("#subInvStockID").val(r);
		}
	});
}	
/******************@author husenbadashah**************/
var subInventoryTemplate = "<option value='0'>-Select-</option>"
		+ "{#foreach $T.inventoryMaterialRequestNoteItemInfoSlaveDTO as list}"
		+ "<option value='{$T.list.subinventory_id}'>{$T.list.inv_mrn_item_info_slave_subinventory}</option>"
		+ "{#/for}";

function fetchSubInventoryNew() {
	var inputs = [];
	inputs.push('action=fetchAllSubInventory');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
//		url : "InventoryServlet",
		url : "ehat/inventoryM/fetchSubInventoryNew",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//alert(r);
			pobj1 = r;//JSON.parse(r);//eval('(' + r + ')');
			$("#selDocument").setTemplate(subInventoryTemplate);
			$("#selDocument").processTemplate(pobj1);
			$("#shelfAjaxResp").html(r);
		}
	});
	
	var subInventoryTemplate = "<option value='0'>-Select-</option>"
		+ "{#foreach $T as list}"
		+ "<option value='{$T.list.subinventory_id}'>{$T.list.subInventoryName}</option>"
		+ "{#/for}";
	
//	var inputs = [];
//	inputs.push('action=fetchAllSubInventory');
//	inputs.push('isEdit=no');
//	var str = inputs.join('&');
//	jQuery.ajax({
//		async : true,
//		type : "GET",
//		url : "ehat/inventoryM/fetchSubInventoryNew",
//		data : str + "&reqType=AJAX",
//		error : function() {
//			alert('Network Issue..!!');
//		},
//		success : function(r) {
////			setItemMasterDataToTable(r);
//			alert(r)
//		}
//	});
}

function fetchSubInventoryName() {
	var inputs = [];
	//inputs.push('action=fetchAllSubInventory');
	//inputs.push('isEdit=yes');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/fetchAllSubInventory",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//alert(r);
			setTimeout(function() {
			//objVendor = JSON.parse(r);
				var cnt = 0;
				var temp="<option value=0>-- Select --</option>";
				for(var i=0;i<r.lstSubInventoryMaster.length;i++){
					
						cnt = getSubInventoryStockRecord(r.lstSubInventoryMaster[i].id);
							
						if(cnt > 0)
							temp = temp + "<option value="+r.lstSubInventoryMaster[i].id+" selected>"+r.lstSubInventoryMaster[i].subInventoryName+"</option>";
						else
							temp = temp + "<option value="+r.lstSubInventoryMaster[i].id+">"+r.lstSubInventoryMaster[i].subInventoryName+"</option>";
					
				}
				$("#selDocument").html(temp);
			//if (r.lstSubInventoryMaster.length >0) {
			//	$("#selDocument").val(r.lstSubInventoryMaster[0].id);
			//}
			},100);
			/*pobj1 = eval('(' + r + ')');
			if (pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length >0) {
			$("#selDocument").setTemplate(subInventoryTemplate);
			$("#selDocument").processTemplate(pobj1);
			}*/
		}
	});
}

function savesubInventoryName()
{
	var id = $("#selDocument").val();
	var name = $("#selDocument :selected").text();
	//alert(id+"-----"+name);
	if (name == "0" || name == '-Select-') {
		alert("Please select subinventory!");
		$("#selDocument").focus();
		return false;
	}
	var inputs = [];
	//inputs.push('action=saveOTSubInv');
	inputs.push('selDocument=' + name);
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/saveOTSubInv",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if( r == 1){
				alert("Save Successfully");
			}else{
				alert("Updated Successfully");
			}
			
			fetchSubInventoryName();
		}
	});
}

function getSubInventoryStockRecord(id)
{
	var result = 0;
	
	$.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/getSubInventoryStockRecord",
		data : {
			"id" : id
		},
		error() {
			alert("Something Went Wrong!!")
		},
		success(r) {
			result = r;
		}
		
	});
	
	return result;
}

