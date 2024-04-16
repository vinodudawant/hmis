/*var tempforLab = "<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
 + "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
 + "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
 + "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Report Due Date</div></th>"
 + "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
 + "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
 + "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
 + "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Value</div></th>"
 + "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Repart</div></th>"
 + "	</tr></thead><tbody div  >"
 + " {#foreach $T.trmli as trmli}<tr>"
 + "<td class='filterable-cell'>{count++}.</td>" 
 + "<td class='filterable-cell'>{$T.trmli.tmcoll}</td>"
 + "<td class='filterable-cell'>{$T.trmli.tmdd}</td>"
 + "<td class='filterable-cell'>{$T.trmli.objp.pini}{$T.trmli.objp.pnm}</td>"
 + "<td class='filterable-cell'>{$T.trmli.objp.pag}{$T.trmli.objp.pagty}</td>"
 + "<td class='filterable-cell'>{$T.trmli.objp.psx}</td>"
 + "<td class='numeric filterable-cell'><input onclick='viewTestforResult({$T.trmli.tmid})'	style='font-size: 10px;' type='button' value='ROUTINE VALUES' class='edit' /></td>"
 + "<td class='numeric filterable-cell'><input						onclick='viewPathalogyPatientReport({$T.trmli.tmid})'						style='font-size: 10px;' type='button' value='ROUTINE REPORT'						class='edit' /></td>"
 + "</tr>{#/for}";*/

/* New Inventory Function */
/*var inventoryFormTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 598px;'>"
 + "<thead class='cf' style='background: white;'>" +
 "<tr>" +
 "<th style='height: 21.5px;' class='col-md-1 center'><div>Id</div></th>"
 + "<th style='height: 21.5px;' class='col-md-2 center'><div>Form type</div></th>" +
 " <th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th>"
 + "<th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th>" +
 " </tr>" +
 " </thead>"
 + "{#foreach $T.ltFormDTOs as ltFormDTOs}" +
 "<tr>" +
 "<td id='id{$T.ltFormDTOs.form_Id}'>{$T.ltFormDTOs.form_Id}</td>" +
 "<td id='desc{$T.ltFormDTOs.form_Id}'>{$T.ltFormDTOs.form_type}</td>"
 + "<td><button id='btnEdit2' class='btn btn-xs btn-success' onclick=\"viewFormDetail({$T.ltFormDTOs.form_Id})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
 + "<td><button id='btnEdit2' class='btn btn-xs btn-success' onclick=\"deleteFormDetail({$T.ltFormDTOs.form_Id})\" value='EDIT'><i class='fa fa-edit'></i></button></td</tr>{#/for}</table>";
 var inventoryItemPurcahseInfoTblTemp=
 "<table class='table table-striped table-borderd header-fixed cf' style='margin: 10px;width:400px;'>" +
 "<thead class='cf' style='background:white;'>" +
 "<tr>" +
 "<th style='height:20px;' class='col-md-1 center'><div>Id</div></th>" +
 "<th style='height:20px;' class='col-md-1 center'><div>Tax</div></th>" +
 "<th style='height:20px;' class='col-md-1 center'><div>fact1</div></th>" +
 "<th style='height:20px;' class='col-md-1 center'><div>fact2</div></th>" +
 "<th style='height:20px;' class='col-md-1 center'><div>fact3</div></th>" +
 "<th style='height:20px;' class='col-md-1 center'><div>fact4</div></th>" +
 "<th style='height:20px;' class='col-md-1 center'><div>Edit</div></th>" +
 "<th style='height:20px;' class='col-md-1 center'><div>Delete</div></th>" +
 "</tr>" +
 "</thead>" +
 "{#foreach $T.ltItemPurDTOs as ltItemPurDTO}" +
 "<tr>" +
 "<td id='id{$T.ltItemPurDTOs.ItemPurId}'>{$T.ltItemPurDTOs.ItemPurId}</td>" +
 "<td id='desc{$T.ltItemPurDTOs.ItemPurId}'>{$T.lsItemPurDTOs.tax}</td>" +
 "<td id='desc{$T.ltItemPurDTOs.ItemPurId}'>{$T.lsItemPurDTOs.fact1}</td>" +
 "<td id='desc{$T.ltItemPurDTOs.ItemPurId}'>{$T.lsItemPurDTOs.fact2}</td>" +
 "<td id='desc{$T.ltItemPurDTOs.ItemPurId}'>{$T.lsItemPurDTOs.fact3}</td>" +
 "<td id='desc{$T.ltItemPurDTOs.ItemPurId}'>{$T.lsItemPurDTOs.fact4}</td>" +
 "<td><button id='btnEdit1' class='btn btn-xs btn-success' onclick=\"viewitempurdetaisl({$T.ltitempusdto.itempurid})\" value='EDIT'><i class='fa fa-edit'></i></button></td>" +
 "<td><button id='btnEdit1' class='btn btn-xs btn-success' onclick=\"deleteitempurdetaisl({$T.ltitempusdto.itempurid})\" value='EDIT'><i class='fa fa-delete'></i></button></td>" +
 "</tr>" +
 "{#/for}" +
 "</table>";*/

var rowCount = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;

var SrNo = 1;
var inventoryItemMaserTemp = "<table class='table table-striped' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Item Id</div></th>"
		+ "<th ' class='col-md-2 center'><div>Item Name</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Item Category</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Lead Time</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Duration</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Date</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> "
		+"<th style='height: 21.5px;' class='col-md-1 center'><div>Print Barcodes</div></th></tr> </thead>"
		+ "{#foreach $T.ltInventoryItemMasterDTOs as ltInventoryItemMasterDTOs}<tr class='center'><td>{SrNo++}</td><td id='id{$T.ltInventoryItemMasterDTOs.item_id}'>{$T.ltInventoryItemMasterDTOs.item_id}</td><td style='text-align=left' id='desc{$T.ltInventoryItemMasterDTOs.item_id}'>{$T.ltInventoryItemMasterDTOs.item_name}</td><td  style='text-align=left' id='id{$T.ltInventoryItemMasterDTOs.item_id}'>{$T.ltInventoryItemMasterDTOs.item_group}</td><td id='desc{$T.ltInventoryItemMasterDTOs.item_id}'>{$T.ltInventoryItemMasterDTOs.item_leadtimeNew}</td><td id='desc{$T.ltInventoryItemMasterDTOs.item_id}'>{$T.ltInventoryItemMasterDTOs.item_leadtimeselctor}</td><td id='desc{$T.ltInventoryItemMasterDTOs.item_id}'>{$T.ltInventoryItemMasterDTOs.lead_time}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' type='button' data-toggle='modal' data-target='#Item_Master_Form' onclick=\"viewItemMasterDetail({$T.ltInventoryItemMasterDTOs.item_id})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button'   onclick=\"deleteDItemMasterDetail({$T.ltInventoryItemMasterDTOs.item_id})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td>"
        + "<td><button id='' value='Delete' class='btn btn-xs btn-success editUserAccess' type='button'   onclick=\"printbarcodeinv({$T.ltInventoryItemMasterDTOs.item_id})\" disabled='disabled'><i class='fa fa-print'></i></button></td</tr>{#/for}</table>";

var selItemMasterPartid = "{#foreach $T.ltpartyMaster as ltpartyMaster}"
		+ "<option  value='{$T.ltpartyMaster.party_master_id}' >{$T.ltpartyMaster.party_master_name}</option>"

		+ "{#/for}";

function addContectInfo() {
	$("#ContactInfoTable > tbody")
			.append(
					"	<tr><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td></tr>");
}
function addWareHouseInfo() {
	$("#WareHouseInfoTable > tbody")
			.append(
					"<tr><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td></tr>");
}

function getNextItemMasterId() {

	var inputs = [];
	inputs.push('action=getItemMasterNextId');
	inputs.push('tableName=inv_item_master');
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
			$("#lblItemID").text(r);
		}
	});
}

function getNextItemPurchaseId() {

	var inputs = [];
	inputs.push('action=getItemPurchaseNextId');
	inputs.push('tableName=inv_item_purchase');
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
			$("#txtItemPurchaseInfoId").val(r);
		}
	});
}
// get sale id
function getNextItemSaleId() {

	var inputs = [];
	inputs.push('action=getItemSalesNextId');
	inputs.push('tableName=inv_item_sale');
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
			$("#txtItemSalesInfoId").val(r);
		}
	});
}

/* warehouse Id */
function getNextItemWareHouseId() {

	var inputs = [];
	inputs.push('action=getWarehouseNextId');
	inputs.push('tableName=inv_item_warehouse');
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
			$("#txtItemWareHouseId").val(r);
		}
	});
}

function getNextItemPartyId() {

	var inputs = [];
	inputs.push('action=getItemPartyNextId');
	inputs.push('tableName=inv_item_party_details');
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
			$("#txtItemPartyInfoId").val(r);
		}
	});
}

function getNextItemOtherId() {

	var inputs = [];
	inputs.push('action=getItemOtherrNextId');
	inputs.push('tableName=inv_item_other_info');
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
			$("#txtItemOtherInfoId").val(r);
		}
	});
}

function saveItemMaster() {
	/* General Info */

	var lblItemId = $("#lblItemID").text();
	var selItemType = $("#selItemType").val();
	var selItemGroup = $("#selItemGroup").val();
	var txtItemName = $("#txtItemName").val();
	var txtMfgByName = $("#txtMfgByName").val();
	var selStatus = $("#selStatus").val();
	var hsn = $("#hsn").val();
	var txtLeadTime = $("#txtLeadTime").val();
//alert("HSN :"+hsn);
	if(hsn==0){
		alert("Please Select HSN No!!!");
		return false;
	}
	if(txtLeadTime == "" || txtLeadTime == null)
		{
		 txtLeadTime = "";
		}
	else{
		txtLeadTime = $("#txtLeadTime").val();
	  }
	// var txtItemCategory = $("#txtItemCategory").val();
	var txtAliasName = $("#txtAliasName").val();
	var txtMaxStock = $("#txtMaxStock").val();
	// var txtSerialNoType = $("#txtSerialNoType").val();
	// var txtItemExpiryValidity = $("#txtItemExpiryValidity").val();
	var txtMinStock = $("#txtMinStock").val();
	var txtOrderStock = $("#txtorderStock").val();
	var txtOtherInfo = $("#txtOtherInfo").val();
	// alert(txtOtherInfo);
	// var txtRemark = $("#txtRemark").val();
	// var txtBatchNo = $("#txtBatchNo").val();
	var machin_id = $("#hideMachinCode").val();
	
	//added By Tarique aaalam
	var isLnL='N';
	var imageFile=document.getElementById("fileUp").value;
	var imageComment=$("#imageComment").val();
	// alert(machin_id);

	// validation
	if (selItemType == "" || selItemType == null) {
		alert("Please select form type");
		$("#selItemType").focus();
		return false;
	}

	/*var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(selItemType)) {
		alert("Form type should be of alphabets Only with a single space allowed..!");
		$("#selItemType").focus();
		return false;
	}*/

	if (selItemGroup == "" || selItemGroup == null) {
		alert("Please select category name");
		$("#selItemGroup").focus();
		return false;
	}

	/*var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(selItemGroup)) {
		alert("Category name should be of alphabets Only with a single space allowed..!");
		$("#selItemType").focus();
		return false;
	}*/
	if (txtItemName == "" || txtItemName == null) {
		alert("Please enter item name");
		$("#txtItemName").focus();
		return false;
	}

	/*
	 * var pattern = /^([a-zA-Z]+\s?)*$/; if (!pattern.test(txtItemName)) {
	 * alert("Item name should be of alphabets only with a single space
	 * allowed..!"); $("#txtItemName").focus(); return false; }
	 */

	/*
	 * if(txtMfgByName == "" || txtMfgByName == null) { alert("Please select
	 * manufacturer name"); $("#txtMfgByName").focus(); return false; }
	 * 
	 * var pattern = /^([a-zA-Z]+\s?)*$/; if (!pattern.test(txtMfgByName)) {
	 * alert("Manufacturer name should be of alphabets and numbers with a single
	 * space allowed..!"); $("#txtMfgByName").focus(); return false; }
	 */
	/*
	 * if(document.getElementById("selStatus").selectedIndex == "") {
	 * alert('Please select status'); $("#selStatus").focus(); return false; }
	 */
	if (inventoryItemMasterFormName.chkInventoryItem.checked == false) {
		alert(" Please select the checkbox of inventory item");
		$("#chkInventoryItem").focus();
		return false;
	}
	if (inventoryItemMasterFormName.chkPurchaseItem.checked == false) {
		alert(" Please select the checkbox of purchase item");
		$("#chkPurchaseItem").focus();
		return false;
	}
	if (inventoryItemMasterFormName.chkSaleItem.checked == false) {
		alert(" Please select the checkbox of Issue item");
		$("#chkSaleItem").focus();
		return false;
	}

/*	if (txtLeadTime == "" || txtLeadTime == null) {
		alert("Please select date");
		$("#txtLeadTime").focus();
		return false;
	}*/

	var hideSalesItemSaveUpdate = $("#hideSalesItemSaveUpdate").val();
	if (!(hideSalesItemSaveUpdate == "Update")) {
		if (txtLeadTime) {
		
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

			if (txtLeadTime === today1) {
			} else {
				alert("Please Enter Current Date ");
				$("#txtLeadTime").focus();
				return false;
			}
		}
	}

	if (txtMinStock == "" || txtMinStock == null) {
		alert("Please enter Reorder stock");
		$("#txtMinStock").focus();
		return false;
	}

	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtMinStock)) {
		alert("General info:Reorder stock should of digits!");
		$("#txtMinStock").focus();
		return false;
	}

	if (txtMaxStock == "" || txtMaxStock == null) {
		alert("Please enter max stock");
		$("#txtMaxStock").focus();
		return false;
	}

	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtMaxStock)) {
		alert("General info:Max stock should of digits!");
		$("#txtMaxStock").focus();
		return false;
	}

	if (txtOrderStock == "" || txtOrderStock == null) {
		alert("Please enter order stock");
		$("#txtorderStock").focus();
		return false;
	}

	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtOrderStock)) {
		alert("General info:Order stock should of digits!");
		$("#txtorderStock").focus();
		return false;
	}

	/*var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(txtAliasName)) {
		alert("General info:Alias name should be of alphabets only with a single space allowed..!");
		$("#txtAliasName").focus();
		return false;
	}*/
	/*
	 * var pattern = /^([a-zA-Z]+\s?)*$/; if (!pattern.test(txtOtherInfo)) {
	 * alert("General info:Other info should be of alphabets only with a single
	 * space allowed..!"); $("#txtOtherInfo").focus(); return false; }
	 */
	var txtNewleadtime = $("#txtNewleadtime").val();
	var ileadtimeselector = $("#ileadtimeselector").val();
	
	var criticalityselector = $("#criticalityselector").val();
	var purchaseStrategy = $("#purchaseStrategy").val();
	
	if (txtNewleadtime == "" || txtNewleadtime == null) {
		alert("Please enter lead time");
		$("#txtNewleadtime").focus();
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtNewleadtime)) {
		alert("General info:Lead time should be of digits only!");
		$("#txtAliasName").focus();
		return false;
	}
 
	if (document.getElementById("ileadtimeselector").selectedIndex == "") {
		alert('Please select lead time selector');
		$("#ileadtimeselector").focus();
		return false;
	}
	if (document.getElementById("criticalityselector").selectedIndex == "") {
		alert('Please select criticality selector');
		$("#criticalityselector").focus();
		return false;
	}
	var chkInventoryItem1;
	var chkPurchaseItem1;
	var chkPhantomItem1;
	var chkAssetItem1;
	var chkOtherItem1;
	var chkSaleItem1;
	var chkBatchNo1;
	var chkShowInScheduler1;
	var chkImmunizationItem1;
	var chkUniqueIdentification1;

	if ($('#chkImmunizationItem').is(":checked")) {
		chkImmunizationItem1 = 1;
	} else {
		chkImmunizationItem1 = 0;
	}

	if ($('#chkShowInScheduler').is(":checked")) {
		chkShowInScheduler1 = 1;
	} else {
		chkShowInScheduler1 = 0;
	}

	if ($('#chkBatchNo').is(":checked")) {
		chkBatchNo1 = 1;
	} else {
		chkBatchNo1 = 0;
	}

	if ($('#chkInventoryItem').is(":checked")) {
		chkInventoryItem1 = 1;
	} else {
		chkInventoryItem1 = 0;
	}

	if ($('#chkPurchaseItem').is(":checked")) {
		chkPurchaseItem1 = 1;
	} else {
		chkPurchaseItem1 = 0;
	}
	if ($('#chkPhantomItem').is(":checked")) {
		chkPhantomItem1 = 1;
	} else {
		chkPhantomItem1 = 0;
	}
	if ($('#chkAssetItem').is(":checked")) {
		chkAssetItem1 = 1;
	} else {
		chkAssetItem1 = 0;
	}
	var txtRemark = null;
	if ($('#chkOtherItem').is(":checked")) {
		// txtRemark = $("#txtRemark").val();
		chkOtherItem1 = 1;
	} else {
		chkOtherItem1 = 0;

	}
	if ($('#chkSaleItem').is(":checked")) {
		chkSaleItem1 = 1;
	} else {
		chkSaleItem1 = 0;
	}
	if ($('#chkApplyUniqueIdentification').is(":checked")) {
		chkUniqueIdentification1 = 1;
	} else {
		chkUniqueIdentification1 = 0;
	}
	
	/* Warehouse Info */
	var txtItemWareHouseId = $("#txtItemWareHouseId").val();
	var txtwhCode = $("#txtItemWareHouseId").val();
	var txtwhName = $("#txtwhName").val();
	var txtwhLocation = $("#txtwhLocation").val();

	/* VALIDATION WAREHOUSE */

	if (txtwhName == "" || txtwhName == null) {
		alert("Please enter warehouse name");
		$("#txtwhName").focus();
		return false;
	}
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtwhName)) {
		alert("Warehouse info:warehouse name should be of alphabets and digits only with a single space allowed..!");
		$("#txtwhName").focus();
		return false;
	}

	// party validation
	var ddlArray = new Array();
	var partyList = "";
	$('#lstBox2').find('option').each(function() {
		partyList = partyList + $(this).val();
	});
	/*if (partyList == "" || partyList == null) {
		alert('Please fill party details');
		$("#lstBox2").focus();
		return false;
	}*/
	
	if (partyList == "" || partyList == null) {
		//alert('Please fill party details');
		$("#lstBox2").val('0');
		//return false;
	}
	
	var ddl = document.getElementById('lstBox2');
	for ( var i = 0; i < ddl.options.length; i++) {
		ddlArray[i] = ddl.options[i].value;
	}
	/* save Tax code and rate*/
	
	var taxcodeandrate = "";
	$('#lstBoxforTax').find('option').each(function() {
		taxcodeandrate = taxcodeandrate + $(this).val();
	});
	
	var taxcodeRateArray = new Array();
	var taxCodeAndRate = document.getElementById('lstBoxforTax');
	for(var i=0;i<taxCodeAndRate.options.length;i++)
		{
		taxcodeRateArray[i] = taxCodeAndRate.options[i].value;
		}
	
	/*$('#lstBoxforTax option:selected').each(function() {
	    alert($(this).val());
	});*/
	
	/*
	 * var box1 = document.inventoryItemMasterFormName.selectbox.value;
	 * //alert(box1); if(box1 == "" || box1 == "-1") { alert("Please select
	 * party and add it"); $("#lstBox2").focus(); return false; }
	 */
	/*
	 * if ($('#lstBox2 option:selected').length == 0) { alert('select item
	 * related party'); $("#lstBox2").focus(); return false; } return false;
	 */

	/* Other Info */
	var txtItemOtherInfoId = $("#txtItemOtherInfoId").val();
	var txtTopic = $("#txtTopic").val();

	var txtDescriptionCategory = $("#txtDescriptionCategory").val();

	var txtFile = $("#txtFile").val();
	var txtareaNotes = $("#txtareaNotes").val();
	// other validation

	/*
	 * if(txtTopic != "") { var pattern = /^([a-zA-Z0-9]+\s?)*$/; if
	 * (!pattern.test(txtTopic)) { alert("Other info:topic should be of
	 * alphabets and digits only with a single space allowed..!");
	 * $("#txtTopic").focus(); return false; } }
	 */

	/*
	 * if(txtDescriptionCategory != "") { var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	 * if (!pattern.test(txtDescriptionCategory)) { alert("Other info:Topic
	 * description should be of alphabets and digits only with a single space
	 * allowed..!"); $("#txtDescriptionCategory").focus(); return false; } }
	 */

	/*
	 * if(txtFile != "") { var pattern = /^([a-zA-Z0-9]+\s?)*$/; if
	 * (!pattern.test(txtDescriptionCategory)) { alert("Other info:File should
	 * be of alphabets and digits only with a single space allowed..!");
	 * $("#txtFile").focus(); return false; } }
	 */

	/*
	 * var purDivhtml = $("#itemPurchaseAjaxResp").html(); objItemMasterPurchase =
	 * JSON.parse(purDivhtml);
	 * if(objItemMasterPurchase.inventoryItemPurchaseDTO.length ==null ||
	 * objItemMasterPurchase.inventoryItemPurchaseDTO.size() < 0) {
	 * alert("123444."); }
	 */
	
	/*save unique Identification for Item @Date :25 may 2016 @Author sudhir jadhav*/

/*	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	var chekedorUncheckedflag; 
	var materiallist = {
			ltInventoryItemUniqueIdendifications :[]
	};
	
	var $radios = $('input:checkbox[name=chkApplyUniqueIdentification]');
	if ($radios.is(':checked') == true) {

		for ( var i = 1; i <= totaltblsize; i++) {
			if ($("#txtPurchaseQuotationItemNumber" + i).val() != null && $("#txtPurchaseQuotationItemNumber" + i).val() != undefined) 
			{
			var txtPurchaseQuotationItemName = $("#txtPurchaseQuotationItemNumber" + i).val();
			var txtPurchaseQuotationItemName_ = $("#txtPurchaseQuotationItemName_" + i).val();
				
				 chekedorUncheckedflag = "Checked";
				var txtInvItemUniqueId = $("#txtInvItemUniqueId" + i).val();

				var txtSirNo = $("#txtSirNo_" + i).val();
				var txtItemLocation = $("#txtItemLocation" + i).val();
				materiallist.ltInventoryItemUniqueIdendifications
						.push({
							inv_item_unique_identification_sir_no : txtSirNo,
							inv_item_unique_identification_location_name : txtItemLocation,
							inv_item_unique_identification_id : txtInvItemUniqueId,
							item_id : lblItemId,
						});

			}

		}

		var li = materiallist.ltInventoryItemUniqueIdendifications.length;
		 
		if (li == 0) {
			 alert("Please enter atleast one Item row to Save Unique Identification");
			return false;
		}

	} else { 	
		
		 chekedorUncheckedflag = "UnChecked";
		
	}
 
 
	materiallist = JSON.stringify(materiallist);*/
	// Added By Tarique Aalam
	if (imageFile == "" || imageFile == null || imageFile == undefined) {
		imageFile="NoImage";
	}
	
	if (imageComment == "" || imageComment == null || imageComment == undefined) {
		imageComment="";
	}

	/* Party Master */
	var txtItemPartyInfoId = $("#txtItemPartyInfoId").val();
	var status = 'Y';
	
	// Added By Tarique Aaalam
	if($("#chkLaundryItem").is(':checked')){
		isLnL='Y';
	}
	
	if($("#chkCssdItem").is(':checked'))
		{
				if($("#cssd1").is(':checked')){
					isLnL='CI';
				}
				
				if($("#cssd2").is(':checked')){
					isLnL='MI';
				}
		}

	var inputs = [];
	inputs.push('action=SaveItemMasterDetails');
	/* General Info */
	inputs.push('lblItemId=' + lblItemId);
	inputs.push('selItemType=' + selItemType);
	inputs.push('selItemGroup=' + selItemGroup);
	inputs.push('txtItemName=' + txtItemName);
	inputs.push('txtMfgByName=' + txtMfgByName);
	inputs.push('selStatus=' + selStatus);
	inputs.push('hsn=' + hsn);
	inputs.push('txtLeadTime=' + txtLeadTime);
	// inputs.push('txtItemCategory=' + txtItemCategory);
	inputs.push('txtAliasName=' + txtAliasName);
	inputs.push('txtMaxStock=' + txtMaxStock);
	/*unique identification json Arrya @Date 26may2016 ****/
	inputs.push('txtMinStock=' + txtMinStock);
	inputs.push('txtOrderStock=' + txtOrderStock);
	inputs.push('txtOtherInfo=' + txtOtherInfo);
	inputs.push('txtRemark=' + txtRemark);
	inputs.push('chkInventoryItem=' + chkInventoryItem1);
	inputs.push('chkPurchaseItem=' + chkPurchaseItem1);
	inputs.push('chkPhantomItem=' + chkPhantomItem1);
	inputs.push('chkShowInScheduler=' + chkShowInScheduler1);
	inputs.push('chkImmunizationItem=' + chkImmunizationItem1);

	inputs.push('chkBatchNo=' + chkBatchNo1);

	inputs.push('chkSaleItem=' + chkSaleItem1);
	inputs.push('chkAssetItem=' + chkAssetItem1);
	inputs.push('chkOtherItem=' + chkOtherItem1);
	inputs.push('txtNewleadtime=' + txtNewleadtime);
	inputs.push('ileadtimeselector=' + ileadtimeselector);
	inputs.push('criticalityselector=' + criticalityselector);
	inputs.push('purchaseStrategy=' + purchaseStrategy);
	inputs.push('chkOtherItem=' + chkOtherItem1);
	inputs.push('chkUniqueIdentification=' + chkUniqueIdentification1);
	
	
	// inputs.push('radioBtn=' + radioBtn);
	// inputs.push('txtBatchNo=' + txtBatchNo);

	/* Purchase info */
	/*
	 * inputs.push('txtItemPurchaseInfoId=' + txtItemPurchaseInfoId);
	 * //inputs.push('selUOM_Pur_Purchase=' + selUOM_Pur_Purchase);
	 * inputs.push('txtTaxCodePurchase=' + txtTaxCodePurchase);
	 * inputs.push('txtPurchaseUnitPrice=' + txtPurchaseUnitPrice);
	 * inputs.push('txtPurFactor1=' + txtPurFactor1);
	 * inputs.push('txtPurFactor1UOM=' + txtPurFactor1UOM);
	 * inputs.push('txtPurFactor2=' + txtPurFactor2);
	 * inputs.push('txtPurFactor2UOM=' + txtPurFactor2UOM);
	 * inputs.push('txtPurFactor3=' + txtPurFactor3);
	 * inputs.push('txtPurFactor3UOM=' + txtPurFactor3UOM);
	 * inputs.push('txtPurFactor4=' + txtPurFactor4);
	 * inputs.push('txtPurFactor4UOM=' + txtPurFactor4UOM);
	 */
	/* Sale Info */
	/*
	 * inputs.push('txtItemSalesInfoId=' + txtItemSalesInfoId);
	 * inputs.push('txtUOM_sale_Purchase=' + txtUOM_sale_Purchase);
	 * inputs.push('txtSaleFactor1=' + txtSaleFactor1);
	 * inputs.push('txtSaleFactor1UOM=' + txtSaleFactor1UOM);
	 * inputs.push('txtSaleFactor2=' + txtSaleFactor2);
	 * inputs.push('txtSaleFactor2UOM=' + txtSaleFactor2UOM);
	 * inputs.push('txtSaleFactor3=' + txtSaleFactor3);
	 * inputs.push('txtSaleFactor3UOM=' + txtSaleFactor3UOM);
	 * inputs.push('txtSaleFactor4=' + txtSaleFactor4);
	 * inputs.push('txtSaleFactor4UOM=' + txtSaleFactor4UOM);
	 */
	/* Warehouse Info */
	inputs.push('txtItemWareHouseId=' + txtItemWareHouseId);
	inputs.push('txtwhCode=' + txtwhCode);
	inputs.push('txtwhName=' + txtwhName);
	inputs.push('txtwhLocation=' + txtwhLocation);
	// inputs.push('txtwhContactNO=' + txtwhContactNO);
	/* inputs.push('txtDefaultValue=' + txtDefaultValue); */
	/* Other Info */
	inputs.push('txtItemOtherInfoId=' + txtItemOtherInfoId);
	inputs.push('txtTopic=' + txtTopic);
	inputs.push('txtDescriptionCategory=' + txtDescriptionCategory);
	inputs.push('txtFile=' + txtFile);
	inputs.push('txtareaNotes=' + txtareaNotes);
	inputs.push('status=' + status);
	/* Party Info */
	inputs.push('txtItemPartyInfoId=' + txtItemPartyInfoId);
	inputs.push('ddlArray=' + ddlArray);
	inputs.push('taxcodeRateArray='+ taxcodeRateArray);

	inputs.push('machin_id=' + machin_id);
	inputs.push('isLnL=' + isLnL);
	inputs.push('imageFile=' + imageFile);
	inputs.push('imageComment=' + imageComment);

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
			var hideSalesItemSaveUpdate = $("#hideSalesItemSaveUpdate").val();

			if (hideSalesItemSaveUpdate == "Update") {
				alert("Record Updated successfully..!");
			} else {
				alert("Record saved successfully..!");
			}
			$("#hideSalesItemSaveUpdate").val("0");

			window.location.reload("inventory_Item_Master.jsp");
			//fetchItemMasterDetails();
		}
	});
}

function fetchItemMasterDetails() {
	var inputs = [];
	inputs.push('action=fetchItemMasterDetail');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			// alert(r);
			// alert(r);
			pobj1 = eval('(' + r + ')');
			$("#ItemMastercontent").setTemplate(inventoryItemMaserTemp);
			$("#ItemMastercontent").processTemplate(pobj1);

			$("#itemMasterAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function getItemPurcahseDetails() {
	var inputs = [];
	inputs.push('action=fetchONEDITItemPurchasDetail');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');

			$("#itemPurchaseAjaxResp").html(r);
		}
	});

}

function getItemsalesDetails() {
	var inputs = [];
	inputs.push('action=fetchONEDITItemSalesDetail');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');

			$("#itemMasterSalesAjaxResp").html(r);
		}
	});

}

function getItemWarehouseDetails() {
	var inputs = [];
	inputs.push('action=fetchONEDITItemWarehouseDetail');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			var obj = JSON.parse(r);
			// $("#itemMasterWarehouseAjaxResp").processTemplate(pobj1);
			$("#itemMasterWarehouseAjaxResp").html(r);
		}
	});

}
function getOtherDetails() {
	var inputs = [];
	inputs.push('action=fetchONEDITItemOtherDetail');
	inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');

			$("#itemMasterOtherAjaxResp").html(r);

		}
	});

}

function getItemPartyDetails(itemMasterID) {
	var inputs = [];
	inputs.push('action=fetchONEDITItemPartyDetail');
	inputs.push('itemMasterId=' + itemMasterID);
	inputs.push('isEdit=yes');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');

			$("#itemmasterpartids").html(r);

		}
	});

}

function fetchItemType() {
	var inputs = [];
	inputs.push('action=fetchItemMasterItemTypeDetail');

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

			var arr = $.parseJSON(r);

			$('#selItemType').html("");
			$('#selItemType').append('<option value="" > Select </option>');
			$.each(arr, function(i, item) {
				$('#selItemType').append(
						'<option value="' + item.inv_item_type_id + '" >'
								+ item.inv_item_type_name + '</option>');

			});

		}
	});
}
function fetchItemGroup() {
	var inputs = [];
	inputs.push('action=fetchItemMasterItemGroupDetail');

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

			var arr = $.parseJSON(r);
			$('#selItemGroup').html("");
			$('#selItemGroup').append('<option value="" > Select </option>');
			$.each(arr, function(i, item) {
				$('#selItemGroup').append(
						'<option value="' + item.inv_item_group_id + '" >'
								+ item.inv_item_group_name + '</option>');

			});
		}
	});
}
function fetchItemMasterPartyeid() {
	var inputs = [];
	inputs.push('action=fetchItemMasterPartId');

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

			// ajaxResponse = r;
			// alert(r);
			pobj1 = eval('(' + r + ')');

			$("#seltemplateid").setTemplate(selItemMasterPartid);
			$("#seltemplateid").processTemplate(pobj1);
			$("#itemMasterPartyAjaxResp").html(r);

		}
	});
}

function reloadPage()
{
	window.location.reload("inventory_Item_Master.jsp");	
}
/**
 * ** **view ItemMaster Details** HUSEN * modifide : 19/10/2015   Author sudhir modified date 31 dec 2015 *  */
function viewItemMasterDetail(itemMasterId) {
	
	$("#CloseBTN").hide();
	$("#cancelID").show();
	$("#uniqueIdentification").hide();
	 //document.getElementById("cancelID").style.display='block';
	if (itemMasterId == null || itemMasterId == "") {
		alert("Plz enter Proper Item Id Id");
		$("#byName").focus();
		return false;
	}
	$("#hideSalesItemSaveUpdate").val("Update");
	
	getItemWarehouseDetails(itemMasterId);
	getOtherDetails(itemMasterId);
	getItemPartyDetails(itemMasterId);
	//getItemUniqueIdentificationDetails(itemMasterId);
	var obj = $("#itemMasterAjaxResp").html();
	objItemMaster = JSON.parse(obj);
	for ( var i = 0; i < objItemMaster.ltInventoryItemMasterDTOs.length; i++) {
		if (parseInt(objItemMaster.ltInventoryItemMasterDTOs[i].item_id) === parseInt(itemMasterId)) {
			/* General Info */
			
			$("#lblItemID").text(
					objItemMaster.ltInventoryItemMasterDTOs[i].item_id);
			$("#txtItemName").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].item_name);
			$("#selItemType").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].item_type);
			$("#selItemGroup").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].item_group);
			$("#txtMfgByName").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].mfg_by_name);
			$("#selStatus").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].status);
			$("#txtShortCode").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].short_code);
			$("#hsn").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].hsn);
			/**
			 * *****date*convert* */
			/*
			   var str=(objItemMaster.ltInventoryItemMasterDTOs[i].lead_time).split("-");
			   var leaddate=str[2]+"-"+str[1]+"-"+str[0];
			 */
			$("#txtLeadTime").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].lead_time);

			$("#txtItemCategory").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].item_category);
			$("#txtAliasName").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].item_alias_name);
			$("#txtMaxStock").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].max_stock);
			$("#txtSerialNoType")
					.val(
							objItemMaster.ltInventoryItemMasterDTOs[i].item_serial_no_type);
			
			var taxcodeandrate = objItemMaster.ltInventoryItemMasterDTOs[i].inv_item_taxcode_and_rate;
			
			/*$("#lstBoxforTax").html(" ");
			
			var Finalrateandtax = taxcodeandrate.split(",");
			var finalrat;
			for(i=0;i<Finalrateandtax.length;i++)
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
				}*/
			
			 
		
			
			$("#txtMinStock").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].min_stock);
			$("#txtorderStock").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].order_stock);
			$("#txtOtherInfo").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].item_other_info);

			$("#txtNewleadtime")
					.val(
							objItemMaster.ltInventoryItemMasterDTOs[i].item_leadtimeNew);
			
			$("#ileadtimeselector").val(objItemMaster.ltInventoryItemMasterDTOs[i].item_leadtimeselctor);
			$("#criticalityselector").val(objItemMaster.ltInventoryItemMasterDTOs[i].inv_item_criticality);
			$("#purchaseStrategy").val(objItemMaster.ltInventoryItemMasterDTOs[i].inv_item_purchaseStrategy);
			

			$("#txtRemark").val(
					objItemMaster.ltInventoryItemMasterDTOs[i].item_remark);

			if (objItemMaster.ltInventoryItemMasterDTOs[i].item_batch_No == 1) {
				$("#chkBatchNo").prop('checked', true);
			}

			if (objItemMaster.ltInventoryItemMasterDTOs[i].item_inventory_item == 1) {
				$("#chkInventoryItem").prop('checked', true);
			}
			if (objItemMaster.ltInventoryItemMasterDTOs[i].item_purchase_item == 1) {
				$("#chkPurchaseItem").prop('checked', true);
			}
			if (objItemMaster.ltInventoryItemMasterDTOs[i].item_Phantam_item == 1) {
				$("#chkPhantomItem").prop('checked', true);
			}
			if (objItemMaster.ltInventoryItemMasterDTOs[i].item_sale_item == 1) {
				$("#chkSaleItem").prop('checked', true);
			}
			if (objItemMaster.ltInventoryItemMasterDTOs[i].item_assest_item == 1) {
				$("#chkAssetItem").prop('checked', true);
				// document.getElementById("chkAssetItem").disabled = true;
			}
			if (objItemMaster.ltInventoryItemMasterDTOs[i].item_other_item == 1) {
				$("#chkOtherItem").prop('checked', true);
			}

			if (objItemMaster.ltInventoryItemMasterDTOs[i].inv_item_show_in_scheduler == 1) {
				$("#chkShowInScheduler").prop('checked', true);
			}

			if (objItemMaster.ltInventoryItemMasterDTOs[i].inv_immunizationr_item == 1) {
				$("#chkImmunizationItem").prop('checked', true);
			}
			
			if (objItemMaster.ltInventoryItemMasterDTOs[i].inv_item_master_apply_unique_identification == 1) {
				$("#chkApplyUniqueIdentification").prop('checked', true);
			}
			$("#lstBoxforTax").html(" ");
			
			$("#imageComment").val("");
			var image=objItemMaster.ltInventoryItemMasterDTOs[i].image_file;
			if (image != "NoImage") {
				ReadInventoryItemsImage(image);
				$("#imageComment").val(
						objItemMaster.ltInventoryItemMasterDTOs[i].image_comment);
			}
			
			if (objItemMaster.ltInventoryItemMasterDTOs[i].isLnL == "Y") {
				$("#chkLaundryItem").prop('checked', true);
			}
			
			if (objItemMaster.ltInventoryItemMasterDTOs[i].isLnL == "CI" || objItemMaster.ltInventoryItemMasterDTOs[i].isLnL == "MI" ) {
				$("#chkCssdItem").prop('checked', true);
				$("#cssdOptions").show();
				if(objItemMaster.ltInventoryItemMasterDTOs[i].isLnL == "CI")
					{
					  $("#cssd1").prop('checked', true);
					}else{
						$("#cssd2").prop('checked', true);
					}
			}
			
			
			var Finalrateandtax = taxcodeandrate.split(",");
			var finalrat;
			for(i=0;i<Finalrateandtax.length;i++)
				{ 
				finalrat = Finalrateandtax[i];
				//var fk = Finalrateandtax.split(",");
				var option = "";
				option = option
					+ "<option value='"
					+ finalrat
					+ "'>"
					+ finalrat
					+ "</option>";
			$("#lstBoxforTax").append(option);
				}

			break;
		}
		
/*End If*/ 		 

	}
	/*End for*/
	setTimeout(
			
				/** * ****fetchToViewItemPurchaseDetails**** */
			function() {
				var inputs = [];
				inputs.push('action=fetchToViewItemPurchaseDetails');
				inputs.push('itemMasterId=' + itemMasterId);
				var str = inputs.join('&');
				jQuery.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						pobj1 = eval('(' + r + ')');
						$("#PurchaseInfoTable").setTemplate(
								inventoryItemPurchaseTemp);
						$("#PurchaseInfoTable").processTemplate(pobj1);
						$("#PurchaseInfoTableAjax").html(r);

					}
				});
				
				/** **fetchToViewItemSalesDetails ******* */
				var inputs = [];
				inputs.push('action=fetchToViewItemSalesDetails');
				inputs.push('itemMasterId=' + itemMasterId);
				var str = inputs.join('&');
				jQuery.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						pobj1 = eval('(' + r + ')');
						$("#SalesInfoTable")
								.setTemplate(inventoryItemSalesTemp);
						$("#SalesInfoTable").processTemplate(pobj1);
						$("#SalesInfoTableAjax").html(r);

					}
				});

				/*
				 * var obj1 = $("#itemPurchaseAjaxResp").html();
				 * objItemMasterPurchase = JSON.parse(obj1); for ( var j = 0; j <
				 * objItemMasterPurchase.inventoryItemPurchaseDTO.length; j++) {
				 * if
				 * (objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_item_id ==
				 * itemMasterId) { Purchase Info var
				 * id=objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_id;
				 * var
				 * taxCode=objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_tax_code;
				 * var
				 * fact1=objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_uom_factor1;
				 * var
				 * fact2=objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_uom_factor2;
				 * var
				 * fact3=objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_uom_factor3;
				 * var
				 * fact4=objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_uom_factor4;
				 * 
				 * $("#txtItemPurchaseInfoId").val(id);
				 * $("#txtTaxCodePurchase").val(taxCode);
				 * $("#txtPurFactor1").val(fact1);
				 * $("#txtPurFactor2").val(fact2);
				 * $("#txtPurFactor3").val(fact3);
				 * $("#txtPurFactor4").val(fact4);
				 * //$("#selUOM_Pur_Purchase").val(objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_uom);
				 * $("#txtPurchaseUnitPrice").val(objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_unit_price);
				 * $("#txtPurFactor1UOM").val(objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_factor_uom_1);
				 * $("#txtPurFactor2UOM").val(objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_factor_uom_2);
				 * $("#txtPurFactor3UOM").val(objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_factor_uom_3);
				 * $("#txtPurFactor4UOM").val(objItemMasterPurchase.inventoryItemPurchaseDTO[j].item_purchase_factor_uom_4);
				 *//**
					 * *********************added box table data
					 * display***********************
					 */
				/*
				 * $("#txtItemTblPurchaseInfoId").val(id);
				 * $("#txtTblPurFactor1").val(fact1);
				 * $("#txtTblPurFactor2").val(fact2);
				 * $("#txtTblPurFactor3").val(fact3);
				 * $("#txtTblPurFactor4").val(fact4);
				 * $("#txtTblTaxCodePurchase").val(taxCode); } }
				 */

				/*
				 * var obj2 = $("#itemMasterSalesAjaxResp").html();
				 * objItemMasterSales = JSON.parse(obj2);
				 * 
				 * for ( var k = 0; k <
				 * objItemMasterSales.ltInventoryItemSaleDTOs.length; k++) { if
				 * (objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sale_item_id ==
				 * itemMasterId) { Sales INfo var
				 * saleId=objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sales_id;
				 * var
				 * saleFact1=objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sales_uom_factor1;
				 * var
				 * saleFact2=objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sales_uom_factor2;
				 * var
				 * saleFact3=objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sales_uom_factor3;
				 * var
				 * saleFact4=objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sales_uom_factor4;
				 * 
				 * $("#txtItemSalesInfoId").val(saleId);
				 * $("#txtSaleFactor1").val(saleFact1);
				 * $("#txtSaleFactor2").val(saleFact2);
				 * $("#txtSaleFactor3").val(saleFact3);
				 * $("#txtSaleFactor4").val(saleFact4);
				 * //$("#txtUOM_sale_Purchase").val(objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sales_uom);
				 * $("#txtSaleFactor1UOM").val(objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sales_factor_uom1);
				 * $("#txtSaleFactor2UOM").val(objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sales_factor_uom2);
				 * $("#txtSaleFactor3UOM").val(objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sales_factor_uom3);
				 * $("#txtSaleFactor4UOM").val(objItemMasterSales.ltInventoryItemSaleDTOs[k].item_sales_factor_uom4);
				 *//**
					 * *********************added box table data
					 * display***********************
					 */
				/*
				 * $("#txtItemtTblSalesInfoId").val(saleId);
				 * $("#txtTblSaleFactor1").val(saleFact1);
				 * $("#txtTblSaleFactor2").val(saleFact2);
				 * $("#txtTblSaleFactor3").val(saleFact3);
				 * $("#txtTblSaleFactor4").val(saleFact4); } }
				 */

				var WHObj = $("#itemMasterWarehouseAjaxResp").html();
				objItemWarehouse = JSON.parse(WHObj);
				for ( var w = 0; w < objItemWarehouse.ltInventoryItemWarehouseDetailsDTOs.length; w++) {
					if (objItemWarehouse.ltInventoryItemWarehouseDetailsDTOs[w].item_warehouse_item_id == itemMasterId) {
						$("#txtItemWareHouseId")
								.val(
										objItemWarehouse.ltInventoryItemWarehouseDetailsDTOs[w].item_warehouse_id);
						$("#txtwhCode")
								.val(
										objItemWarehouse.ltInventoryItemWarehouseDetailsDTOs[w].item_warehouse_code);
						$("#txtwhName")
								.val(
										objItemWarehouse.ltInventoryItemWarehouseDetailsDTOs[w].item_warehouse_name);
						$("#txtwhLocation")
								.val(
										objItemWarehouse.ltInventoryItemWarehouseDetailsDTOs[w].item_warehouse_location);
						$("#txtwhContactNO")
								.val(
										objItemWarehouse.ltInventoryItemWarehouseDetailsDTOs[w].item_warehouse_contactNo);
						break;
					}
				}

				var obj3 = $("#itemMasterOtherAjaxResp").html();
				objItemMasterOther = JSON.parse(obj3);
				for ( var l = 0; l < objItemMasterOther.ltInventoryItemOtherDetailsDTOs.length; l++) {
					if (objItemMasterOther.ltInventoryItemOtherDetailsDTOs[l].item_other_item_id == itemMasterId) {

						/* Other INfo */
						$("#txtItemOtherInfoId")
								.val(
										objItemMasterOther.ltInventoryItemOtherDetailsDTOs[l].inv_item_other_info_id);
						$("#txtTopic")
								.val(
										objItemMasterOther.ltInventoryItemOtherDetailsDTOs[l].item_other_info_topic);
						$("#txtDescriptionCategory")
								.val(
										objItemMasterOther.ltInventoryItemOtherDetailsDTOs[l].item_other_info_description_category);
						$("#txtFile")
								.val(
										objItemMasterOther.ltInventoryItemOtherDetailsDTOs[l].item_other_info_file);
						$("#txtareaNotes")
								.val(
										objItemMasterOther.ltInventoryItemOtherDetailsDTOs[l].item_other_info_note);
					}
					break;
				}
				var obj5 = $("#itemmasterpartids").html();
				objItemMasterPartyid = JSON.parse(obj5);

				var obj4 = $("#itemMasterPartyAjaxResp").html();
				objItemMasterParty = JSON.parse(obj4);
				$("#lstBox2").html("");
				for ( var n = 0; n < objItemMasterPartyid.inventoryItemPartyDetailsDTO.length; n++) {
					for ( var m = 0; m < objItemMasterParty.ltpartyMaster.length; m++) {
						if (objItemMasterParty.ltpartyMaster[m].party_master_id == objItemMasterPartyid.inventoryItemPartyDetailsDTO[n].party_id) {

							var option = "";
							option = option
									+ "<option value="
									+ objItemMasterParty.ltpartyMaster[m].party_master_id
									+ ">"
									+ objItemMasterParty.ltpartyMaster[m].party_master_name
									+ "</option>";

							$("#lstBox2").append(option);

						}
					}
				}

			}, 500);
	calculateProfitOfItem();

}
function deleteDItemMasterDetail(itemMasterID) {
	var didConfirm = confirm("Are you sure to delete record?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteItemMasterDetail');
		inputs.push('itemMasterId=' + itemMasterID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				alert(r);
				fetchItemMasterDetails();
			}
		});
	}
}

/**
 * * ***auto suggestion code
 * MANUFACTURE NAMES*******husen** ****
 */

function setValuesOfMfgAutocomplete(inputId, type) {
	var resultData = [];

	var txtVal = $('#' + inputId).val();

	if ((type == "onload") || (txtVal != null && txtVal != "")) {
		var inputs = [];
		inputs.push('action=fetchMfgName');
		inputs.push('txtVal=' + txtVal);
		var str = inputs.join('&');
		jQuery.ajax({
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
				if (r.length == 20) {
					alert("NO MATCHING FOUND");

				} else {
					ajaxResponse = r;
					bean = eval('(' + ajaxResponse + ')');

					var template = "";
					for ( var j = 0; j < bean.ltManufacturerDTOs.length; j++) {
						resultData.push({
							ID : bean.ltManufacturerDTOs[j].manufacturerId,
							Name : bean.ltManufacturerDTOs[j].manufacturerName
						});

						template = template + '<li data-value="'
								+ (bean.ltManufacturerDTOs[j].manufacturerId)
								+ '" class=""><a href="#">'
								+ bean.ltManufacturerDTOs[j].manufacturerName
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
			// $('#txtMfgByName').val(item.value);
			$("#" + inputId).val((item.text).trim());

		}
	}
}

/**auto suggestion code UOM * PARAMETERS******husenbadsha**/
function setValuesUOMAutoSuggestion(inputId, type) {
	var resultData = [];

	var txtVal = $('#' + inputId).val();

	if ((type == "onload") || (txtVal != null && txtVal != "")) {
		var inputs = [];
		inputs.push('action=fetchUOMNames');
		inputs.push('txtVal=' + txtVal);
		var str = inputs.join('&');
		jQuery.ajax({
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
				if (r.length == 20) {
					alert("NO MATCHING FOUND");

				} else {
					ajaxResponse = r;
					bean = eval('(' + ajaxResponse + ')');

					var template = "";
					for ( var j = 0; j < bean.ltUomDTOs.length; j++) {
						resultData.push({
							ID : bean.ltUomDTOs[j].uomId,
							Name : bean.ltUomDTOs[j].uomDescription

						});

						template = template + '<li data-value="'
								+ (bean.ltUomDTOs[j].uomId)
								+ '" class=""><a href="#">'
								+ bean.ltUomDTOs[j].uomDescription
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
			// $('#txtMfgByName').val(item.value);
			$("#" + inputId).val((item.text).trim());
			$("#hiddenLastUOM").val((item.text).trim());

		}
	}
}
/**auto suggestion code warehouse NAMES******husenbadsha****/
function autoSuggestWarehouseNames(inputId, type) {

	var resultData = [];
	var txtVal = $('#' + inputId).val();
	if ((type == "onload") || (txtVal != null && txtVal != "")) {
		var inputs = [];
		inputs.push('action=fetchWarehouseName');
		inputs.push('txtVal=' + txtVal);
		var str = inputs.join('&');
		jQuery.ajax({
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
				if (r.length == 20) {
					alert("NO MATCHING FOUND");

				} else {
					ajaxResponse = r;
					bean = eval('(' + ajaxResponse + ')');
					var template = "";
					for ( var j = 0; j < bean.ltWarehouseDTOs.length; j++) {
						resultData.push({
							ID : bean.ltWarehouseDTOs[j].warehouseId,
							Name : bean.ltWarehouseDTOs[j].warehouseName,
						});

						template = template + '<li data-value="'
								+ (bean.ltWarehouseDTOs[j].warehouseId)
								+ '" class=""><a href="#">'
								+ bean.ltWarehouseDTOs[j].warehouseName
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
			// $("#txtwhLocation").val("");
			$("#" + inputId).val((item.text).trim());
			var inputs = [];
			inputs.push('action=fetchLocationforWarehouse');
			var whName = (item.text.trim());
			inputs.push('whName=' + whName);
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
						success : function(result) {
							// alert(result);
							objResponse = JSON.parse(result);
							for ( var k = 0; k < objResponse.ltWarehouseDTOs.length; i++) {
								Location = objResponse.ltWarehouseDTOs[k].warehouselocation;
								// alert(Location);
								$("#txtwhLocation").val(Location);
							}

						}
					});

		}
	}
}

/*fetchItemDetail for Search modified @Date:21jully2016 @Author: sudhir*/
function fetchItemDetail() {

	var itemName = $('#byName').val();
	var hiddenItemIdforAutSgn = $("#hiddenItemIdforAutSgn").val();
	
	if (itemName == "" || itemName == null || hiddenItemIdforAutSgn == '0') {
		alert("Please Enter Proper Item Name");
		$("#byName").val('');
		$("#byName").focus();
		return false;
	}

	/*var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(itemName)) {
		alert("Item name should be of alphabets and digits only with a single space allowed..!");
		$("#byName").focus();
		return false;
	}*/

	var inputs = [];
	inputs.push('action=fetchItemDetail');
	inputs.push('itemName=' + itemName);
	inputs.push('isEdit=yes');

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
			objUOM = JSON.parse(r);
			SrNo = 1;
			if (objUOM.ltInventoryItemMasterDTOs.length > 0) {
				$("#ItemMastercontent").setTemplate(inventoryItemMaserTemp);
				$("#ItemMastercontent").processTemplate(pobj1);
				$("#itemMasterAjaxResp").html(r);
				countMachine = 1;
				$("#machine_div").setTemplate(
						inventoryAssestItemForMaintananceView);
				$("#machine_div").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchItemMasterDetails();
				fetchAssets();
			}
			// $("#byUomId").val("");
			userAccess();
		}
	});
}

/**auto suggestion code party NAMES****husenbadsha***/
function autoSuggestPartyNames(inputId, type) {
	var resultData = [];

	var txtVal = $('#' + inputId).val();

	if ((type == "onload") || (txtVal != null && txtVal != "")) {
		var inputs = [];
		inputs.push('action=fetchPartyName');
		inputs.push('txtVal=' + txtVal);
		var str = inputs.join('&');
		jQuery.ajax({
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
				if (r.length == 20) {
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
			$("#hiddenPartyId").val(item.value);

		}
	}
}
/**
 * ************************************select
 * party******************************husen******************************************
 */
function addInvPartyName() {

	var pid = $("#hiddenPartyId").val();
	var pName = $("#txtPartyName").val();
	if (pid == 0 || pid == '') {
		alert("Please Select Party Name.");
		return false;
	}
	var add = pName;
	var partyid = pid;

	var flag = 1;
	$('#lstBox2').find('option').each(function() {
		if ($(this).html() == add) {
			alert("Party Is Present In List");
			flag = 0;
		}
	});
	if (flag == 1) {
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(add);
		$(o).val(partyid);
		// $(0).val();
		$("#lstBox2").append(o);
		$("#hiddenPartyId").val("");
		$("#txtPartyName").val("");
	}
}

function removeInvPartyName() {

	$('#lstBox2 option:selected').remove();

}
/***auto suggestion code form names*******husenbadsha***/
function AutoSuggestionFormType(inputId, type) {
	var resultData = [];

	var txtVal = $('#' + inputId).val();

	if ((type == "onload") || (txtVal != null && txtVal != "")) {
		var inputs = [];
		inputs.push('action=fetchFormName');
		inputs.push('txtVal=' + txtVal);
		var str = inputs.join('&');
		jQuery.ajax({
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
				if (r.length == 20) {
					alert("NO MATCHING FOUND");

				} else {
					ajaxResponse = r;
					bean = eval('(' + ajaxResponse + ')');

					var template = "";
					for ( var j = 0; j < bean.ltFormDTOs.length; j++) {
						resultData.push({
							ID : bean.ltFormDTOs[j].formId,
							Name : bean.ltFormDTOs[j].formType

						});

						template = template + '<li data-value="'
								+ (bean.ltFormDTOs[j].formId)
								+ '" class=""><a href="#">'
								+ bean.ltFormDTOs[j].formType + '</a></li>';

					}

					$("#div" + inputId + " .typeahead").html(template);
					if (type != 'onload') {
						$("#div" + inputId + " .typeahead").show();
					}
					setTimeout(function() {
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
			// $('#txtMfgByName').val(item.value);
			$("#" + inputId).val((item.text).trim());

		}
	}
}
/****auto suggestion code category* name***husenbadshah without adding category wise item Code ****/
function AutoSuggestionCategoryType(inputId, type) {
	var resultData = [];

	var txtVal = $('#' + inputId).val();

	if ((type == "onload") || (txtVal != null && txtVal != "")) {
		var inputs = [];
		inputs.push('action=fetchCategoryName');
		inputs.push('txtVal=' + txtVal);
		var str = inputs.join('&');
		jQuery.ajax({
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
				if (r.length == 20) {
					alert("NO MATCHING FOUND");

				} else {
					ajaxResponse = r;
					/*alert(ajaxResponse);*/
					bean = eval('(' + ajaxResponse + ')');

					var template = "";
					for ( var j = 0; j < bean.CategoryDTO.length; j++) {
						resultData.push({
							ID : bean.CategoryDTO[j].categoryId,
							Name : bean.CategoryDTO[j].categoryName

						});

						template = template + '<li data-value="'
								+ (bean.CategoryDTO[j].categoryId)
								+ '" class=""><a href="#">'
								+ bean.CategoryDTO[j].categoryName
								+ '</a></li>';

					}

					$("#div" + inputId + " .typeahead").html(template);
					if (type != 'onload') {
						$("#div" + inputId + " .typeahead").show();
					}
					setTimeout(function() {
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
			// $('#txtMfgByName').val(item.value);
			$("#" + inputId).val((item.text).trim());

		}
	}
}


/****auto suggestion code category* name sudhir *** with adding category wise item Code @Date 7nov2016 ****/
/*function AutoSuggestionCategoryType(inputId, type) {
	var resultData = [];
	var txtVal = $('#' + inputId).val();

	if ((type == "onload") || (txtVal != null && txtVal != "")) {
		var inputs = [];
		inputs.push('action=fetchCategoryName');
		inputs.push('txtVal=' + txtVal);
		var str = inputs.join('&');
		jQuery.ajax({
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
					var ajaxResponse = r;
					//alert(ajaxResponse);
					
				var	bean = eval('(' + ajaxResponse + ')');
				
					for ( var i = 0; i < bean.CategoryDTO.length; i++) {

						  availableTags.push(bean.CategoryDTO[i].categoryId	+ "_"+ bean.CategoryDTO[i].categoryName	+ "__" + bean.CategoryDTO[i].categoryPerifix );
					}

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						// alert(availableTags[j]);
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[0]);
						resultData.push({
							ID : idValue,
							Name : arrValue[1]
						});

						template = template + '<li data-value="'
						+ (arrValue[1])
						+ '" class=""><a href="#">'
						+ arrValue[0] + '</a></li>';

					}

					$("#div" + inputId + " .typeahead").html(template);
					if (type != 'onload') {
						$("#div" + inputId + " .typeahead").show();
					}
					setTimeout(function() {
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
			alert(item.text +" : "+item.value);
			
			alert(item[0] +" : "+item[1]);
			var categoryDetails = (item.value).split("__");
			alert("categoryDetails  :" + categoryDetails);
			
			//var pid = pidTip[0];
			//var tid = pidTip[1];
			
			
			// $('#txtMfgByName').val(item.value);
			//$("#" + inputId).val((item.text).trim());

		}
	}
}*/

/** **************clear values from item mast form**husen*************** */
function refreshPage() {
	
	 $("#lblItemID").val(""); $("#selItemType").val("");
	 $("#selItemGroup").val(""); $("#txtItemName").val("");
	 $("#txtMfgByName").val(""); $("#selStatus").val("");
	 $("#txtShortCode").val(""); $("#txtLeadTime").val("");
	 $("#txtorderStock").val("");
	 $("#txtItemCategory").val(""); $("#txtAliasName").val("");
	 $("#txtMaxStock").val(""); $("#txtSerialNoType").val("");
	 $("#txtItemExpiryValidity").val(""); $("#txtMinStock").val("");
	 $("#txtOtherInfo").val(""); $("#txtRemark").val("");
	 $("#txtBatchNo").val(""); $("#chkInventoryItem").prop('checked', false);
	 $("#chkPurchaseItem").prop('checked', false);
	 $("#chkPhantomItem").prop('checked', false);
	 $("#chkAssetItem").prop('checked', false);
	 $("#chkOtherItem").prop('checked', false);
	 $("#chkSaleItem").prop('checked', false); 
	 $("#txtItemPurchaseInfoId").val(""); $("#selUOM_Pur_Purchase").val("");
	 $("#txtTaxCodePurchase").val(""); $("#txtPurchaseUnitPrice").val("");
	 $("#txtPurFactor1").val(""); $("#txtPurFactor1UOM").val("");
	 $("#txtPurFactor2").val(""); $("#txtPurFactor2UOM").val("");
	 $("#txtPurFactor3").val(""); $("#txtPurFactor3UOM").val("");
	 $("#txtPurFactor4").val(""); $("#txtPurFactor4UOM").val(""); 
	 $("#txtItemSalesInfoId").val(""); $("#txtUOM_sale_Purchase").val("");
	 $("#txtSaleFactor1").val(""); $("#txtSaleFactor1UOM").val("");
	 $("#txtSaleFactor2").val(""); $("#txtSaleFactor2UOM").val("");
	 $("#txtSaleFactor3").val(""); $("#txtSaleFactor3UOM").val("");
	 $("#txtSaleFactor4").val(""); $("#txtSaleFactor4UOM").val(""); 
	 $("#txtwhCode").val(""); $("#txtwhName").val("");
	 $("#txtwhLocation").val(""); $("#txtwhContactNO").val(""); 
	 $("#txtItemOtherInfoId").val(""); $("#txtTopic").val("");
	 $("#txtDescriptionCategory").val(""); $("#txtFile").val("");
	 $("#txtareaNotes").val("");
	 $("#lstBox2").html("");
	 $("#lstBoxforTax").html("");
	 
	 $("#chkShowInScheduler").prop('checked', false);
	 $("#chkBatchNo").prop('checked', false);
	 $("#chkImmunizationItem").prop('checked', false);
	 $("#txtNewleadtime").val("");
	 $("#ileadtimeselector").val("");
	 $("#criticalityselector").val("");
	 $("#purchaseStrategy").val("");
	 
	 
	   var ItemMastId = $("#lblItemID").text();
	   //alert("item id:"+ItemMastId);
		var inputs = [];
		inputs.push('action=deleteItemPurchaseRowDetail');
		inputs.push('ItemPurchaseId=' + 0);
		inputs.push('ItemMastId=' + ItemMastId);
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
				//fetchItemPurchaseDetails();
				$("#PurchaseInfoTable").html("");
				$("#PurchaseInfoTable").empty();
			}
		});
		$("#PurchaseInfoTable").html("");
		$("#PurchaseInfoTable").empty();
		
		var ItemMastId = $("#lblItemID").text();
		// alert("item id:"+ItemMastId);
			var inputs = [];
			inputs.push('action=deleteItemSalesRowDetail');
			inputs.push('ItemSalesId=' + 0);
			inputs.push('ItemMastId=' + ItemMastId);
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
					//fetchItemSalesDetails();
					$("#SalesInfoTable").html("");
					$("#SalesInfoTable").empty();
				}
			});
			$("#SalesInfoTable").html("");
			$("#SalesInfoTable").empty();
			$("#txtSaleProfitOfItem").val("");

			getNextItemMasterId();
			getNextItemPurchaseId();
			getNextItemSaleId();
}
/** **********************item general info********husen************************ */
function addFeilds() {
	$("#batchNO").css("display", "block");
	$("#otherInfo").css("display", "block");
}
function removeFeilds() {
	$('#txtBatchNo').val(''); // clear value
	$('#txtOtherInfo').val(''); // clear value
	$("#batchNO").css("display", "none");
	$("#otherInfo").css("display", "none");

}
/*
 * function addRemark() { //jQuery('#completed').prop("disabled", false); $(
 * "#chkOtherItem" ).prop( "disabled", true );
 * $("#divRemark").css("display","block"); } function removeRemark() {
 * $('#txtRemark').val(''); // clear value
 * $("#divRemark").css("display","none"); $( "#chkOtherItem" ).prop( "checked",
 * false ); $( "#chkOtherItem" ).prop( "disabled", false ); }
 */
/******item purchase* details***@author husenbadshah**/
var counterItemPurchase = 1;
var inventoryItemPurchaseTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Unit Cost</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Fact1</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Fact2</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Fact3</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Fact4</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryItemPurchaseDTO as inventoryItemPurchaseDTO}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered' id='id{$T.inventoryItemPurchaseDTO.item_purchase_id}'>{counterItemPurchase++}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.inventoryItemPurchaseDTO.item_purchase_id}'>{$T.inventoryItemPurchaseDTO.item_purchase_unit_price}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.inventoryItemPurchaseDTO.item_purchase_id}'>{$T.inventoryItemPurchaseDTO.item_purchase_uom_factor1}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.inventoryItemPurchaseDTO.item_purchase_id}'>{$T.inventoryItemPurchaseDTO.item_purchase_uom_factor2}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.inventoryItemPurchaseDTO.item_purchase_id}'>{$T.inventoryItemPurchaseDTO.item_purchase_uom_factor3}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.inventoryItemPurchaseDTO.item_purchase_id}'>{$T.inventoryItemPurchaseDTO.item_purchase_uom_factor4}</td>"
		+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit' type='button' class='btn btn-xs btn-success' value='EDIT' onclick='EditItemPurchaseDetails({$T.inventoryItemPurchaseDTO.item_purchase_id})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'><button id='btnDelete' value='Delete' type='button' class='btn btn-xs btn-success' onclick=\"DeleteItemPurchaseDetails({$T.inventoryItemPurchaseDTO.item_purchase_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";

/*var counterItemPurchase = 1;
var inventoryItemPurchaseTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Unit Cost</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Fact1</div></th>"	
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryItemPurchaseDTO as inventoryItemPurchaseDTO}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered' id='id{$T.inventoryItemPurchaseDTO.item_purchase_id}'>{counterItemPurchase++}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.inventoryItemPurchaseDTO.item_purchase_id}'>{$T.inventoryItemPurchaseDTO.item_purchase_unit_price}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.inventoryItemPurchaseDTO.item_purchase_id}'>{$T.inventoryItemPurchaseDTO.item_purchase_uom_factor1}</td>"
		+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit' type='button' class='btn btn-xs btn-success' value='EDIT' onclick='EditItemPurchaseDetails({$T.inventoryItemPurchaseDTO.item_purchase_id})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'><button id='btnDelete' value='Delete' type='button' class='btn btn-xs btn-success' onclick=\"DeleteItemPurchaseDetails({$T.inventoryItemPurchaseDTO.item_purchase_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";*/


function calculateProfitOfItem()
{
	var ItemMastId = $("#lblItemID").text();
	//alert(ItemMastId);
	var inputs = [];
	inputs.push('action=calculateProfit');
	inputs.push('ItemMastId=' + ItemMastId);
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
			$("#txtSaleProfitOfItem").val(parseFloat(r).toFixed(2));
		}
	});

}
/**husen*save purchase details**form****/
function SaveItemMasterPurchaseDetails() {
	var txtItemPurchaseInfoId = $("#txtItemPurchaseInfoId").val();
	// var selUOM_Pur_Purchase = $("#selUOM_Pur_Purchase").val();
	// var txtTaxCodePurchase = $("#txtTaxCodePurchase").val();
	var ItemMastId = $("#lblItemID").text();
	var txtPurchaseUnitPrice = $("#txtPurchaseUnitPrice").val();
	var txtPurFactor1 = $("#txtPurFactor1").val();
	var txtPurFactor1UOM = $("#txtPurFactor1UOM").val();
	var txtPurFactor2 = $("#txtPurFactor2").val();
	//var txtPurFactor2 ='0';
	var txtPurFactor2UOM = $("#txtPurFactor2UOM").val();
	//var txtPurFactor3 ='0';

	var txtPurFactor3 = $("#txtPurFactor3").val();
	var txtPurFactor3UOM = $("#txtPurFactor3UOM").val();
	var txtPurFactor4 = $("#txtPurFactor4").val();
	//var txtPurFactor4 ='0';
	var txtPurFactor4UOM = $("#txtPurFactor4UOM").val();
	// validation
	if (txtPurFactor1 == "") {
		alert("Please enter factor1");
		$("#txtPurFactor1").focus();
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtPurFactor1)) {
		alert("Purchase info:Factor1 should be of digits!");
		$("#txtPurFactor1").focus();
		return false;
	}
	if (txtPurFactor1UOM == "" || txtPurFactor1UOM == null) {
		alert("please enter uom for factor1");
		$("#txtPurFactor1UOM").focus();
		return false;
	}
	
	/*if (txtPurFactor2 != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtPurFactor2)) {
			alert("Purchase info:Factor 2 should be of digits!");
			$("#txtPurFactor2").focus();
			return false;
		}
	}

	if (txtPurFactor3 != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtPurFactor3)) {
			alert("Purchase info:Factor 3 should be of digits!");
			$("#txtPurFactor3").focus();
			return false;
		}
	}

	if (txtPurFactor4 != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtPurFactor4)) {
			alert("Purchase info:Factor 4 should be of digits!");
			$("#txtPurFactor4").focus();
			return false;
		}
	}*/

	if (txtPurchaseUnitPrice == "" || txtPurchaseUnitPrice == null) {
		alert("Please enter purchase unit price");
		$("#txtPurchaseUnitPrice").focus();
		return false;
	}

	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(txtPurchaseUnitPrice)) {
		alert("Purchase info:Unit price should be of digits and a decimal point Only!");
		$("#txtPurchaseUnitPrice").focus();
		return false;
	}
	
	//factors unit price
	var PurchaseUnitPrice2 = $("#PurchaseUnitPrice2").val();
	var PurchaseUnitPrice3 = $("#PurchaseUnitPrice3").val();
	var PurchaseUnitPrice4 = $("#PurchaseUnitPrice4").val();
	
	var hiddenFactorValue = $("#hiddenFactorValue").val();
	//alert(hiddenFactorValue);
	var hiddenFactorPrice = $("#hiddenFactorPrice").val();
	
	var hiddenLastUOM = $("#hiddenLastUOM").val();
	if(hiddenFactorValue == null || hiddenFactorValue==""){
		hiddenFactorValue = txtPurFactor1;
	}
	//alert(hiddenFactorPrice);
/*	var PurchaseUnitPrice2 = 0.0;
	var PurchaseUnitPrice3 = 0.0;
	var PurchaseUnitPrice4 = 0.0;*/
	
	//alert(PurchaseUnitPrice2+"_"+PurchaseUnitPrice3+"_"+PurchaseUnitPrice4);
	var inputs = [];
	inputs.push('action=SaveItemMasterPurchaseDetails');
	/* Purchase info */
	// inputs.push('pid=' + pid);
	inputs.push('txtItemPurchaseInfoId=' + txtItemPurchaseInfoId);
	inputs.push('ItemMastId=' + ItemMastId);
	inputs.push('txtPurchaseUnitPrice=' + txtPurchaseUnitPrice);
	inputs.push('PurchaseUnitPrice2=' + PurchaseUnitPrice2);
	inputs.push('PurchaseUnitPrice3=' + PurchaseUnitPrice3);
	inputs.push('PurchaseUnitPrice4=' + PurchaseUnitPrice4);
	inputs.push('hiddenFactorValue=' + hiddenFactorValue);
	inputs.push('hiddenFactorPrice=' + hiddenFactorPrice);
	inputs.push('txtPurFactor1=' + txtPurFactor1);
	inputs.push('txtPurFactor1UOM=' + txtPurFactor1UOM);
	inputs.push('txtPurFactor2=' + txtPurFactor2);
	inputs.push('txtPurFactor2UOM=' + txtPurFactor2UOM);
	inputs.push('txtPurFactor3=' + txtPurFactor3);
	inputs.push('txtPurFactor3UOM=' + txtPurFactor3UOM);
	inputs.push('txtPurFactor4=' + txtPurFactor4);
	inputs.push('txtPurFactor4UOM=' + txtPurFactor4UOM);
	inputs.push('hiddenLastUOM=' + hiddenLastUOM);
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
			/* ajaxResponse = r; */
			$("#PurchaseUnitPrice2").val("");
	    	$("#PurchaseUnitPrice3").val("");
	    	$("#PurchaseUnitPrice4").val("");
	    	
			$("#txtPurchaseUnitPrice").val("");
			$("#txtPurFactor1").val("");
			$("#txtPurFactor1UOM").val("");
			$("#txtPurFactor2").val("");
			$("#txtPurFactor2UOM").val("");

			$("#txtPurFactor3").val("");
			$("#txtPurFactor3UOM").val("");
			$("#txtPurFactor4").val("");
			$("#txtPurFactor4UOM").val("");
			var hideSalesItemSaveUpdate = $("#hideSalesItemSaveUpdate").val();
			if (hideSalesItemSaveUpdate == "Update") {
				alert("Record Updated successfully..!");
			} else {
				alert("Record saved successfully..!");
			}
			//$("#hideSalesItemSaveUpdate").val("0");
			getNextItemPurchaseId();
			refreshAllvalueOnload();
			fetchItemPurchaseDetails();
			calculateProfitOfItem();
		}
	});
}

function fetchItemPurchaseDetails() {
	var itempurId = $("#txtItemPurchaseInfoId").val();
	var ItemMasterId = $("#lblItemID").text();
	var inputs = [];
	inputs.push('action=fetchItemPurchaseDetails');
	inputs.push('isEdit=no');
	inputs.push('itempurId=' + itempurId);
	inputs.push('ItemMasterId=' + ItemMasterId);
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
			counterItemPurchase = 1;
			$("#PurchaseInfoTable").setTemplate(inventoryItemPurchaseTemp);
			$("#PurchaseInfoTable").processTemplate(pobj1);
			$("#PurchaseInfoTableAjax").html(r);
		}
	});
}

function EditItemPurchaseDetails(id) {
	
	$("hiddenFactorValue").val('');
	$("#hiddenFactorPrice").val('');
	$("#hiddenLastUOM").val('');
	
	// var txtItemPurchaseInfoId = $("#txtItemPurchaseInfoId").val();
	var obj = $("#PurchaseInfoTableAjax").html();
	objItemPurDetail = JSON.parse(obj);
	$("#hideSalesItemSaveUpdate").val("Update");
	for ( var i = 0; i < objItemPurDetail.inventoryItemPurchaseDTO.length; i++) {
		if (objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_id == id) {
			// $("#txtBxVendorCode").val(objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_id);
			$("#txtPurchaseUnitPrice")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_unit_price);
			
			//alert(objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_unit_price2);
			if(objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_unit_price2 == 0)
				{
				$("#PurchaseUnitPrice2")
				.val("");
				}else{
					$("#PurchaseUnitPrice2")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_unit_price2);
				}
			if(objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_unit_price3 == 0)
				{
				$("#PurchaseUnitPrice3")
				.val("");
				}else{
					$("#PurchaseUnitPrice3")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_unit_price3);
				}
			
			if(objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_unit_price4 == 0)
				{
				$("#PurchaseUnitPrice4")
				.val("");
				}else{
					$("#PurchaseUnitPrice4")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_unit_price4);
				}
		
			
			$("#txtPurFactor1")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_uom_factor1);
			$("#txtPurFactor2")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_uom_factor2);
			$("#txtPurFactor3")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_uom_factor3);
			$("#txtPurFactor4")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_uom_factor4);
			$("#txtPurFactor1UOM")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_factor_uom_1);
			$("#txtPurFactor2UOM")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_factor_uom_2);
			$("#txtPurFactor3UOM")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_factor_uom_3);
			$("#txtPurFactor4UOM")
					.val(
							objItemPurDetail.inventoryItemPurchaseDTO[i].item_purchase_factor_uom_4);
			
			//alert(objItemPurDetail.inventoryItemPurchaseDTO[i].hiddenFactorValue);
			$("#hiddenFactorValue").val(objItemPurDetail.inventoryItemPurchaseDTO[i].hiddenFactorValue);
			$("#hiddenFactorPrice").val(objItemPurDetail.inventoryItemPurchaseDTO[i].hiddenFactorPrice);
			$("#hiddenLastUOM").val(objItemPurDetail.inventoryItemPurchaseDTO[i].hiddenLastUOM);
			
			$("#txtItemPurchaseInfoId").val(id);
			
			
		}
	}

}

function DeleteItemPurchaseDetails(ItemPurchaseId) {
	// alert("id pur is:"+ItemPurchaseId);
	var ItemMastId = $("#lblItemID").text();
	// alert("item id:"+ItemMastId);
	var didConfirm = confirm("Are you sure to delete record?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteItemPurchaseRowDetail');
		inputs.push('ItemPurchaseId=' + ItemPurchaseId);
		inputs.push('ItemMastId=' + ItemMastId);
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
				alert(r);
				fetchItemPurchaseDetails();
			}
		});
	}
}

function resetItemPurchaseForm() {
	$("#hiddenFactorValue").val('');
	$("#hiddenFactorPrice").val('');
	
	$("#txtPurchaseUnitPrice").val("");
	$("#PurchaseUnitPrice2").val("");
	$("#PurchaseUnitPrice3").val("");
	$("#PurchaseUnitPrice4").val("");
	
	$("#txtPurFactor1").val("");
	$("#txtPurFactor1UOM").val("");
	$("#txtPurFactor2").val("");
	$("#txtPurFactor2UOM").val("");

	$("#txtPurFactor3").val("");
	$("#txtPurFactor3UOM").val("");
	$("#txtPurFactor4").val("");
	$("#txtPurFactor4UOM").val("");
	$("#txtPurchaseUnitPrice").val("");
	getNextItemPurchaseId();
}

/***item mseter sale info****husenbadshah***/
/*var counterItemSale = 1;
var inventoryItemSalesTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Unit Cost</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Fact1</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Fact2</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Fact3</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Fact4</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltInventoryItemSaleDTOs as ltInventoryItemSaleDTOs}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered' id='id{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{counterItemSale++}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_uom}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_uom_factor1}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_uom_factor2}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_uom_factor3}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_uom_factor4}</td>"
		+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit'  type='button' class='btn btn-xs btn-success' value='EDIT' onclick='EditItemSalesDetails({$T.ltInventoryItemSaleDTOs.item_sales_id})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'><button id='btnDelete' value='Delete' type='button' class='btn btn-xs btn-success' onclick=\"DeleteItemSalesDetails({$T.ltInventoryItemSaleDTOs.item_sales_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";*/

/***item mseter sale info****husenbadshah***/
var counterItemSale = 1;
var inventoryItemSalesTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Unit MRP</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Fact1</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltInventoryItemSaleDTOs as ltInventoryItemSaleDTOs}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered' id='id{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{counterItemSale++}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_uom}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_uom_factor1}</td>"
		+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit'  type='button' class='btn btn-xs btn-success' value='EDIT' onclick='EditItemSalesDetails({$T.ltInventoryItemSaleDTOs.item_sales_id})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'><button id='btnDelete' value='Delete' type='button' class='btn btn-xs btn-success' onclick=\"DeleteItemSalesDetails({$T.ltInventoryItemSaleDTOs.item_sales_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";


function SetPrice1(value)
{
		$("#hiddenFactorPrice").val(value);
}
function SetPrice2(value)
{
	    var price1 = $("#hiddenFactorPrice").val();
		$("#hiddenFactorPrice").val(parseFloat(price1/value).toFixed(2));
}
function refreshAllvalueOnload()
{
	$("#hiddenFactorValue").val('');
	$("#hiddenFactorPrice").val('');
	$("#hiddenLastUOM").val('');
	$("#txtPurFactor1").val('');
	$("#txtPurFactor2").val('');
	$("#txtPurFactor3").val('');
	$("#txtPurFactor4").val('');
	$("#txtPurFactor1UOM").val('');
	$("#txtPurFactor2UOM").val('');
	$("#txtPurFactor3UOM").val('');
	$("#txtPurFactor4UOM").val('');
	$("#txtPurchaseUnitPrice").val('');
	$("#PurchaseUnitPrice2").val('');
	$("#PurchaseUnitPrice3").val('');
	$("#PurchaseUnitPrice4").val('');
	$("#byName").val('');
}
function PutValueInHiddenField(value)
{
	///SetPrice2(value);
	$("#hiddenFactorValue").val(value);
}
/**@author husenbadshah****apply unit price on item purchase as well as sell cost*/
function CalculateUnitPrice1(Callfrom)
{
	
	if(Callfrom == "purchase")
	{
		var fact1 = $("#txtPurFactor1").val();
		var fact2 = $("#txtPurFactor2").val();
		var fact3 = $("#txtPurFactor3").val();
		var fact4 = $("#txtPurFactor4").val();
		/***********************************/
		var factor2;
		var factor3;
		var factor4;
		var empty = "";
		/*******************for fact2******************/
		if(fact1 == "" || fact1 == 0)
		{
			//alert("Please enter facotr 1");
			return false;
		}else{
			if(fact2 != "" || fact2 != 0)
			{
			    var unitP1 = $("#txtPurchaseUnitPrice").val(); 
	    		  //alert(unitP1);
			    factor2 = unitP1 / fact2;
				//alert(factor2);
				if(factor2 != "" || factor2 != 0 )
				{
				   $("#PurchaseUnitPrice2").val(parseFloat(factor2).toFixed(2));
				   $("#hiddenFactorPrice").val(parseFloat(factor2).toFixed(2));
				   //$("#PurchaseUnitPrice2").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#PurchaseUnitPrice2").val(empty);
					$("#hiddenFactorPrice").val(empty);
					//$("#hiddenFactorPrice").val(empty);
					//$("#PurchaseUnitPrice2").css('background-color', 'white');
				}
			    
			}
		}	
		/*********************for fact3***********************/
		if(fact2 == "" || fact2 == 0)
		{
			//alert("Please enter facotr 2");
			$("#PurchaseUnitPrice2").val("");
	    	$("#PurchaseUnitPrice3").val("");
	    	$("#PurchaseUnitPrice4").val("");
			return false;
		}
		else{
			if(fact3 != "" || fact3 != 0)
			{
			    var unitP2 = $("#PurchaseUnitPrice2").val(); 
			   // alert(unitP2);
			    factor3 = unitP2 / fact3;
				//alert(factor3);
				if(factor3 != "" || factor3 != 0 )
				{
				   $("#PurchaseUnitPrice3").val(parseFloat(factor3).toFixed(2));
				   $("#hiddenFactorPrice").val(parseFloat(factor3).toFixed(2));
				  // $("#PurchaseUnitPrice3").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#PurchaseUnitPrice3").val(empty);
					$("#hiddenFactorPrice").val(empty);
					//$("#PurchaseUnitPrice3").css('background-color', 'white');
				}
		     }
			else{
			$("#PurchaseUnitPrice3").val(empty);
			$("#hiddenFactorPrice").val(empty);
			//$("#PurchaseUnitPrice3").css('background-color', 'white');
		 }
	   }
	/*********************for fact4***********************/
		if(fact3 == "" || fact3 == 0)
		{
			//alert("Please enter facotr 3");
			//$("#PurchaseUnitPrice2").val("");
	    	$("#PurchaseUnitPrice3").val("");
	    	$("#PurchaseUnitPrice4").val("");
			return false;
		}
		else{
			if(fact4 != "" || fact4 != 0)
			{
			    var unitP3 = $("#PurchaseUnitPrice3").val(); 
			    //alert(unitP3);
			    factor4 = unitP3 / fact4;
				//alert(factor4);
				if(factor4 != "" || factor4 != 0 )
				{
				   $("#PurchaseUnitPrice4").val(parseFloat(factor4).toFixed(2));
				   $("#hiddenFactorPrice").val(parseFloat(factor4).toFixed(2));
				  // $("#PurchaseUnitPrice4").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#PurchaseUnitPrice4").val(empty);
					$("#hiddenFactorPrice").val(empty);
					//$("#PurchaseUnitPrice4").css('background-color', 'white');
				}
		     }
			else{
			$("#PurchaseUnitPrice4").val(empty);
			$("#hiddenFactorPrice").val(empty);
			//$("#PurchaseUnitPrice4").css('background-color', 'white');
			 }
		}
	}else
	{
		var fact1 = $("#txtSaleFactor1").val();
		var fact2 = $("#txtSaleFactor2").val();
		var fact3 = $("#txtSaleFactor3").val();
		var fact4 = $("#txtSaleFactor4").val();
		/***********************************/
		var factor2;
		var factor3;
		var factor4;
		var empty = "";
		/*******************for fact2******************/
		if(fact1 == "" || fact1 == 0)
		{
			//alert("Please enter facotr 1");
			return false;
		}else{
			if(fact2 != "" || fact2 != 0)
			{
			    var unitP1 = $("#txtSalesUnitPrice").val(); 
	    		  //alert(unitP1);
			    factor2 = unitP1 / fact2;
				//alert(factor2);
				if(factor2 != "" || factor2 != 0 )
				{
				   $("#SellUnitPrice2").val(parseFloat(factor2).toFixed(2));
				   //$("#PurchaseUnitPrice2").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#SellUnitPrice2").val(empty);
					//$("#PurchaseUnitPrice2").css('background-color', 'white');
				}
			    
			}
		}	
		/*********************for fact3***********************/
		if(fact2 == "" || fact2 == 0)
		{
			//alert("Please enter facotr 2");
			$("#SellUnitPrice2").val("");
	    	$("#SellUnitPrice3").val("");
	    	$("#SellUnitPrice4").val("");
			return false;
		}
		else{
			if(fact3 != "" || fact3 != 0)
			{
			    var unitP2 = $("#SellUnitPrice2").val(); 
			   // alert(unitP2);
			    factor3 = unitP2 / fact3;
				//alert(factor3);
				if(factor3 != "" || factor3 != 0 )
				{
				   $("#SellUnitPrice3").val(parseFloat(factor3).toFixed(2));
				  // $("#PurchaseUnitPrice3").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#SellUnitPrice3").val(empty);
					//$("#PurchaseUnitPrice3").css('background-color', 'white');
				}
		     }
			else{
			$("#SellUnitPrice3").val(empty);
			//$("#PurchaseUnitPrice3").css('background-color', 'white');
		 }
	   }
	/*********************for fact4***********************/
		if(fact3 == "" || fact3 == 0)
		{
			//alert("Please enter facotr 3");
			//$("#PurchaseUnitPrice2").val("");
	    	$("#SellUnitPrice3").val("");
	    	$("#SellUnitPrice4").val("");
			return false;
		}
		else{
			if(fact4 != "" || fact4 != 0)
			{
			    var unitP3 = $("#SellUnitPrice3").val(); 
			    //alert(unitP3);
			    factor4 = unitP3 / fact4;
				//alert(factor4);
				if(factor4 != "" || factor4 != 0 )
				{
				   $("#SellUnitPrice4").val(parseFloat(factor4).toFixed(2));
				  // $("#PurchaseUnitPrice4").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#SellUnitPrice4").val(empty);
					//$("#PurchaseUnitPrice4").css('background-color', 'white');
				}
		     }
			else{
			$("#SellUnitPrice4").val(empty);
			//$("#PurchaseUnitPrice4").css('background-color', 'white');
			 }
		}
		
	}
}
function CalculateUnitPrice2(Callfrom)
{
	if(Callfrom == "purchase")
	{
	var fact1 = $("#txtPurFactor1").val();
	var fact2 = $("#txtPurFactor2").val();
	/***********************************/
	var factor2;
	var empty = "";
	if(fact1 == "" || fact1 == 0)
	{
		alert("Please enter facotr 1");
		return false;
	}else{
		if(fact2 != "" || fact2 != 0)
		{
		    var unitP1 = $("#txtPurchaseUnitPrice").val(); 
		    //alert(unitP1);
		    factor2 = unitP1 / fact2;
			//alert(factor2);
			if(factor2 != "" || factor2 != 0 )
			{
			   $("#PurchaseUnitPrice2").val(parseFloat(factor2).toFixed(2));
			   $("#hiddenFactorPrice").val(parseFloat(factor2).toFixed(2));
			   //$("#PurchaseUnitPrice2").css('background-color', '#F0E68C');
			 }
			else
			{
				$("#PurchaseUnitPrice2").val(empty);
				//$("#hiddenFactorPrice").val(empty);
				//$("#PurchaseUnitPrice2").css('background-color', 'white');
			}
		}
		else{
			$("#PurchaseUnitPrice2").val(empty);
			//$("#hiddenFactorPrice").val(empty);
			//$("#PurchaseUnitPrice2").css('background-color', 'white');
			 }
	  }
	var fact2 = $("#txtPurFactor2").val();
	var fact3 = $("#txtPurFactor3").val();
	/***********************************/
	var factor3;
	var empty = "";
	if(fact2 == "" || fact2 == 0)
	{
		//alert("Please enter facotr 2");
		$("#PurchaseUnitPrice2").val("");
    	$("#PurchaseUnitPrice3").val("");
    	$("#PurchaseUnitPrice4").val("");
		return false;
	}
	else{
		if(fact3 != "" || fact3 != 0)
		{
		    var unitP2 = $("#PurchaseUnitPrice2").val(); 
		   // alert(unitP2);
		    factor3 = unitP2 / fact3;
			//alert(factor3);
			if(factor3 != "" || factor3 != 0 )
			{
			   $("#PurchaseUnitPrice3").val(parseFloat(factor3).toFixed(2));
			   $("#hiddenFactorPrice").val(parseFloat(factor3).toFixed(2));
			  // $("#PurchaseUnitPrice3").css('background-color', '#F0E68C');
			 }
			else
			{
				$("#PurchaseUnitPrice3").val(empty);
				//$("#hiddenFactorPrice").val(empty);
				//$("#PurchaseUnitPrice3").css('background-color', 'white');
			}
	     }
		else{
		$("#PurchaseUnitPrice3").val(empty);
		//$("#hiddenFactorPrice").val(empty);
		//$("#PurchaseUnitPrice3").css('background-color', 'white');
		 }
		}
	}else{
		var fact1 = $("#txtSaleFactor1").val();
		var fact2 = $("#txtSaleFactor2").val();
		/***********************************/
		var factor2;
		var empty = "";
		if(fact1 == "" || fact1 == 0)
		{
			alert("Please enter facotr 1");
			return false;
		}else{
			if(fact2 != "" || fact2 != 0)
			{
			    var unitP1 = $("#txtSalesUnitPrice").val(); 
			    //alert(unitP1);
			    factor2 = unitP1 / fact2;
				//alert(factor2);
				if(factor2 != "" || factor2 != 0 )
				{
				   $("#SellUnitPrice2").val(parseFloat(factor2).toFixed(2));
				   //$("#PurchaseUnitPrice2").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#SellUnitPrice2").val(empty);
					//$("#PurchaseUnitPrice2").css('background-color', 'white');
				}
			}
			else{
				$("#SellUnitPrice2").val(empty);
				//$("#PurchaseUnitPrice2").css('background-color', 'white');
				 }
		  }
		var fact2 = $("#txtSaleFactor2").val();
		var fact3 = $("#txtSaleFactor3").val();
		/***********************************/
		var factor3;
		var empty = "";
		if(fact2 == "" || fact2 == 0)
		{
			//alert("Please enter facotr 2");
			$("#SellUnitPrice2").val("");
	    	$("#SellUnitPrice3").val("");
	    	$("#SellUnitPrice4").val("");
			return false;
		}
		else{
			if(fact3 != "" || fact3 != 0)
			{
			    var unitP2 = $("#SellUnitPrice2").val(); 
			   // alert(unitP2);
			    factor3 = unitP2 / fact3;
				//alert(factor3);
				if(factor3 != "" || factor3 != 0 )
				{
				   $("#SellUnitPrice3").val(parseFloat(factor3).toFixed(2));
				  // $("#PurchaseUnitPrice3").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#SellUnitPrice3").val(empty);
					//$("#PurchaseUnitPrice3").css('background-color', 'white');
				}
		     }
			else{
			$("#SellUnitPrice3").val(empty);
			//$("#PurchaseUnitPrice3").css('background-color', 'white');
			 }
			}
		
	}
}
function CalculateUnitPrice3(Callfrom)
{
	if(Callfrom == "purchase")
	{		
	var fact2 = $("#txtPurFactor2").val();
	var fact3 = $("#txtPurFactor3").val();
	/***********************************/
	var factor3;
	var empty = "";
	if(fact2 == "" || fact2 == 0)
	{
		//alert("Please enter facotr 2");
		$("#PurchaseUnitPrice2").val("");
    	$("#PurchaseUnitPrice3").val("");
    	$("#PurchaseUnitPrice4").val("");
		return false;
	}
	else{
		if(fact3 != "" || fact3 != 0)
		{
		    var unitP2 = $("#PurchaseUnitPrice2").val(); 
		   // alert(unitP2);
		    factor3 = unitP2 / fact3;
			//alert(factor3);
			if(factor3 !== "" && factor3 !== 0 )
			{
			   $("#PurchaseUnitPrice3").val(parseFloat(factor3).toFixed(2));
			   $("#hiddenFactorPrice").val(parseFloat(factor3).toFixed(2));
			   //$("#PurchaseUnitPrice3").css('background-color', '#F0E68C');
			 }
			else
			{
				$("#PurchaseUnitPrice3").val(empty);
				//$("#hiddenFactorPrice").val(empty);
				//$("#PurchaseUnitPrice3").css('background-color', 'white');
			}
	     }
		else{
		$("#PurchaseUnitPrice3").val(empty);
		//$("#hiddenFactorPrice").val(empty);
		//$("#PurchaseUnitPrice3").css('background-color', 'white');
		 }
	}
	var fact3 = $("#txtPurFactor3").val();
	var fact4 = $("#txtPurFactor4").val();
	/***********************************/
	var factor4;
	var empty = "";
	if(fact3 == "" || fact3 == 0)
	{
		//alert("Please enter facotr 3");
    	$("#PurchaseUnitPrice3").val("");
    	$("#PurchaseUnitPrice4").val("");
		return false;
	}
	else{
		if(fact4 != "" || fact4 != 0)
		{
		    var unitP3 = $("#PurchaseUnitPrice3").val(); 
		    //alert(unitP3);
		    factor4 = unitP3 / fact4;
			//alert(factor4);
			if(factor4 != "" || factor4 != 0 )
			{
			   $("#PurchaseUnitPrice4").val(parseFloat(factor4).toFixed(2));
			   $("#hiddenFactorPrice").val(parseFloat(factor4).toFixed(2));
			  // $("#PurchaseUnitPrice4").css('background-color', '#F0E68C');
			 }
			else
			{
				$("#PurchaseUnitPrice4").val(empty);
				//$("#hiddenFactorPrice").val(empty);
				//$("#PurchaseUnitPrice4").css('background-color', 'white');
			}
	     }
		else{
		$("#PurchaseUnitPrice4").val(empty);
		//$("#hiddenFactorPrice").val(empty);
		//$("#PurchaseUnitPrice4").css('background-color', 'white');
		 }
	 }
	}
	else{
		var fact2 = $("#txtSaleFactor2").val();
		var fact3 = $("#txtSaleFactor3").val();
		/***********************************/
		var factor3;
		var empty = "";
		if(fact2 == "" || fact2 == 0)
		{
			//alert("Please enter facotr 2");
			$("#SellUnitPrice2").val("");
	    	$("#SellUnitPrice3").val("");
	    	$("#SellUnitPrice4").val("");
			return false;
		}
		else{
			if(fact3 != "" || fact3 != 0)
			{
			    var unitP2 = $("#SellUnitPrice2").val(); 
			   // alert(unitP2);
			    factor3 = unitP2 / fact3;
				//alert(factor3);
				if(factor3 != "" || factor3 != 0 )
				{
				   $("#SellUnitPrice3").val(parseFloat(factor3).toFixed(2));
				   //$("#PurchaseUnitPrice3").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#SellUnitPrice3").val(empty);
					//$("#PurchaseUnitPrice3").css('background-color', 'white');
				}
		     }
			else{
			$("#SellUnitPrice3").val(empty);
			//$("#PurchaseUnitPrice3").css('background-color', 'white');
			 }
		}
		var fact3 = $("#txtSaleFactor3").val();
		var fact4 = $("#txtSaleFactor4").val();
		/***********************************/
		var factor4;
		var empty = "";
		if(fact3 == "" || fact3 == 0)
		{
			//alert("Please enter facotr 3");
	    	$("#SellUnitPrice3").val("");
	    	$("#SellUnitPrice4").val("");
			return false;
		}
		else{
			if(fact4 != "" || fact4 != 0)
			{
			    var unitP3 = $("#SellUnitPrice3").val(); 
			    //alert(unitP3);
			    factor4 = unitP3 / fact4;
				//alert(factor4);
				if(factor4 != "" || factor4 != 0 )
				{
				   $("#SellUnitPrice4").val(parseFloat(factor4).toFixed(2));
				  // $("#PurchaseUnitPrice4").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#SellUnitPrice4").val(empty);
					//$("#PurchaseUnitPrice4").css('background-color', 'white');
				}
		     }
			else{
			$("#SellUnitPrice4").val(empty);
			//$("#PurchaseUnitPrice4").css('background-color', 'white');
			 }
		 }
		
	}
	
}
function CalculateUnitPrice4(Callfrom)
{	
	if(Callfrom == "purchase")
	{
		
		var fact2 = $("#txtPurFactor2").val();
		var fact3 = $("#txtPurFactor3").val();
		/***********************************/
		var factor3;
		var empty = "";
		if(fact2 == "" || fact2 == 0)
		{
			//alert("Please enter facotr 2");
			$("#PurchaseUnitPrice2").val("");
	    	$("#PurchaseUnitPrice3").val("");
	    	$("#PurchaseUnitPrice4").val("");
			return false;
		}
		else{
			if(fact3 != "" || fact3 != 0)
			{
			    var unitP2 = $("#PurchaseUnitPrice2").val(); 
			   // alert(unitP2);
			    factor3 = unitP2 / fact3;
				//alert(factor3);
				if(factor3 != "" || factor3 != 0 )
				{
				   $("#PurchaseUnitPrice3").val(parseFloat(factor3).toFixed(2));
				   $("#hiddenFactorPrice").val(parseFloat(factor3).toFixed(2));
				   //$("#PurchaseUnitPrice3").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#PurchaseUnitPrice3").val(empty);
					//$("#hiddenFactorPrice").val(empty);
					//$("#PurchaseUnitPrice3").css('background-color', 'white');
				}
		     }
			else{
			$("#PurchaseUnitPrice3").val(empty);
			//$("#hiddenFactorPrice").val(empty);
			//$("#PurchaseUnitPrice3").css('background-color', 'white');
			 }
			}
	var fact3 = $("#txtPurFactor3").val();
	var fact4 = $("#txtPurFactor4").val();
	/***********************************/
	var factor4;
	var empty = "";
	if(fact3 == "" || fact3 == 0)
	{
		//alert("Please enter facotr 3");
		//$("#PurchaseUnitPrice2").val("");
    	$("#PurchaseUnitPrice3").val("");
    	$("#PurchaseUnitPrice4").val("");
		return false;
	}
	else{
		if(fact4 != "" || fact4 != 0)
		{
		    var unitP3 = $("#PurchaseUnitPrice3").val(); 
		    //alert(unitP3);
		    factor4 = unitP3 / fact4;
			//alert(factor4);
			if(factor4 != "" || factor4 != 0 )
			{
			   $("#PurchaseUnitPrice4").val(parseFloat(factor4).toFixed(2));
			   $("#hiddenFactorPrice").val(parseFloat(factor4).toFixed(2));
			   //$("#PurchaseUnitPrice4").css('background-color', '#F0E68C');
			 }
			else
			{
				$("#PurchaseUnitPrice4").val(empty);
				//$("#hiddenFactorPrice").val(empty);
				//$("#PurchaseUnitPrice4").css('background-color', 'white');
			}
	     }
		else{
		$("#PurchaseUnitPrice4").val(empty);
		//$("#hiddenFactorPrice").val(empty);
		//$("#PurchaseUnitPrice4").css('background-color', 'white');
		 }
	 }
	}
	else{

		var fact2 = $("#txtSaleFactor2").val();
		var fact3 = $("#txtSaleFactor3").val();
		/***********************************/
		var factor3;
		var empty = "";
		if(fact2 == "" || fact2 == 0)
		{
			//alert("Please enter facotr 2");
			$("#SellUnitPrice2").val("");
	    	$("#SellUnitPrice3").val("");
	    	$("#SellUnitPrice4").val("");
			return false;
		}
		else{
			if(fact3 != "" || fact3 != 0)
			{
			    var unitP2 = $("#SellUnitPrice2").val(); 
			   // alert(unitP2);
			    factor3 = unitP2 / fact3;
				//alert(factor3);
				if(factor3 != "" || factor3 != 0 )
				{
				   $("#SellUnitPrice3").val(parseFloat(factor3).toFixed(2));
				   //$("#PurchaseUnitPrice3").css('background-color', '#F0E68C');
				 }
				else
				{
					$("#SellUnitPrice3").val(empty);
					//$("#PurchaseUnitPrice3").css('background-color', 'white');
				}
		     }
			else{
			$("#SellUnitPrice3").val(empty);
			//$("#PurchaseUnitPrice3").css('background-color', 'white');
			 }
			}
	var fact3 = $("#txtSaleFactor3").val();
	var fact4 = $("#txtSaleFactor4").val();
	/***********************************/
	var factor4;
	var empty = "";
	if(fact3 == "" || fact3 == 0)
	{
		//alert("Please enter facotr 3");
		//$("#PurchaseUnitPrice2").val("");
    	$("#SellUnitPrice3").val("");
    	$("#SellUnitPrice4").val("");
		return false;
	}
	else{
		if(fact4 != "" || fact4 != 0)
		{
		    var unitP3 = $("#SellUnitPrice3").val(); 
		    //alert(unitP3);
		    factor4 = unitP3 / fact4;
			//alert(factor4);
			if(factor4 != "" || factor4 != 0 )
			{
			   $("#SellUnitPrice4").val(parseFloat(factor4).toFixed(2));
			   //$("#PurchaseUnitPrice4").css('background-color', '#F0E68C');
			 }
			else
			{
				$("#SellUnitPrice4").val(empty);
				//$("#PurchaseUnitPrice4").css('background-color', 'white');
			}
	     }
		else{
		$("#SellUnitPrice4").val(empty);
		//$("#PurchaseUnitPrice4").css('background-color', 'white');
		 }
	 }
	
		
		
	}
}

/*****husenbadshah***save sales details**form****/
function SaveItemMasterSalesDetails() {
	var txtItemSalesInfoId = $("#txtItemSalesInfoId").val();
	var ItemMastId = $("#lblItemID").text();
	// alert("item master"+ItemMastId);
	// alert("item sales id"+txtItemSalesInfoId);
	var txtSaleFactor1 = $("#txtSaleFactor1").val();
	var txtSaleFactor1UOM = $("#txtSaleFactor1UOM").val();
	var txtSaleFactor2 = $("#txtSaleFactor2").val();
	//var txtSaleFactor2UOM = $("#txtSaleFactor2UOM").val();

	var txtSaleFactor3 = $("#txtSaleFactor3").val();
	//var txtSaleFactor3UOM = $("#txtSaleFactor3UOM").val();
	var txtSaleFactor4 = $("#txtSaleFactor4").val();
	//var txtSaleFactor4UOM = $("#txtSaleFactor4UOM").val();
	var txtSalesUnitPrice = $("#txtSalesUnitPrice").val();
	// alert(txtSalesUnitPrice);
	// validation
	var txtSaleFactor2UOM = "";
	var txtSaleFactor3UOM = "";
	var txtSaleFactor4UOM = "";
	
	if (txtSaleFactor1 == "" || txtSaleFactor1 == null) {
		alert("please enter factor1");
		$("#txtSaleFactor1").focus();
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtSaleFactor1)) {
		alert("Sales info:Factor 1 should be of digits Only");
		$("#txtSaleFactor1").focus();
		return false;
	}

	if (txtSaleFactor1UOM == "" || txtSaleFactor1UOM == null) {
		alert("please enter uom for factor1");
		$("#txtSaleFactor1UOM").focus();
		return false;
	}
	/*
	 * var pattern = /^([a-zA-Z0-9])*$/; if (!pattern.test(txtSaleFactor1UOM)) {
	 * alert("Sales info:Uom1 name should be of alphabets and digits Only with a
	 * single space allowed..!"); $("#txtSaleFactor1UOM").focus(); return false; }
	 */

	/*if (txtSaleFactor2 != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtSaleFactor2)) {
			alert("Sales info:Factor 2 should be of digits Only");
			$("#txtSaleFactor1").focus();
			return false;
		}
	}*/

	/*
	 * if(txtSaleFactor2UOM != "") { var pattern = /^([a-zA-Z0-9])*$/; if
	 * (!pattern.test(txtSaleFactor2UOM)) { alert("Sales info:Uom2 name should
	 * be of alphabets and digits Only with a single space allowed..!");
	 * $("#txtSaleFactor2UOM").focus(); return false; } }
	 */
/*
	if (txtSaleFactor3 != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtSaleFactor3)) {
			alert("Sales info:Factor 3 should be of digits Only");
			$("#txtSaleFactor3").focus();
			return false;
		}
	}*/

	/*
	 * if(txtSaleFactor3UOM !="") { var pattern = /^([a-zA-Z0-9])*$/; if
	 * (!pattern.test(txtSaleFactor3UOM)) { alert("Sales info:Uom3 name should
	 * be of alphabets and digits Only with a single space allowed..!");
	 * $("#txtSaleFactor3UOM").focus(); return false; } }
	 */

/*	if (txtSaleFactor4 != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtSaleFactor4)) {
			alert("Sales info:Factor 4 should be of digits Only");
			$("#txtSaleFactor4").focus();
			return false;
		}
	}*/

	/*
	 * if(txtSaleFactor4UOM != "") { var pattern = /^([a-zA-Z0-9])*$/; if
	 * (!pattern.test(txtSaleFactor4UOM)) { alert("Sales info:Uom4 name should
	 * be of alphabets and digits Only with a single space allowed..!");
	 * $("#txtSaleFactor4UOM").focus(); return false; } }
	 */

	if (txtSalesUnitPrice == "" || txtSalesUnitPrice == null) {
		alert("please enter sale unit price");
		$("#txtSalesUnitPrice").focus();
		return false;
	}
	if (txtSalesUnitPrice != "") {
		var pattern = /^[0-9]+\.?[0-9]*$/;
		if (!pattern.test(txtSalesUnitPrice)) {
			alert("Sales info:Unit price should be of digits and a decimal point Only!");
			$("#txtSalesUnitPrice").focus();
			return false;
		}

	}
	//var SellUnitPrice2 = $("#SellUnitPrice2").val();
	//var SellUnitPrice3 = $("#SellUnitPrice3").val();
	//var SellUnitPrice4 = $("#SellUnitPrice4").val();
	var SellUnitPrice2 = 0.0;
	var SellUnitPrice3 = 0.0;
	var SellUnitPrice4 = 0.0;

	var inputs = [];
	inputs.push('action=SaveItemMasterSalesDetails');
	inputs.push('txtItemSalesInfoId=' + txtItemSalesInfoId);
	inputs.push('ItemMastId=' + ItemMastId);
	inputs.push('txtSaleFactor1=' + txtSaleFactor1);
	inputs.push('txtSaleFactor1UOM=' + txtSaleFactor1UOM);
	inputs.push('txtSaleFactor2=' + txtSaleFactor2);
	inputs.push('txtSaleFactor2UOM=' + txtSaleFactor2UOM);
	inputs.push('txtSaleFactor3=' + txtSaleFactor3);
	inputs.push('txtSaleFactor3UOM=' + txtSaleFactor3UOM);
	inputs.push('txtSaleFactor4=' + txtSaleFactor4);
	inputs.push('txtSaleFactor4UOM=' + txtSaleFactor4UOM);
	inputs.push('txtSalesUnitPrice=' + txtSalesUnitPrice);
	inputs.push('SellUnitPrice2=' + SellUnitPrice2);
	inputs.push('SellUnitPrice3=' + SellUnitPrice3);
	inputs.push('SellUnitPrice4=' + SellUnitPrice4);
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
			$("#txtSaleFactor1").val("");
			$("#txtSaleFactor1UOM").val("");
			$("#txtSaleFactor2").val("");
			$("#txtSaleFactor2UOM").val("");

			$("#txtSaleFactor3").val("");
			$("#txtSaleFactor3UOM").val("");
			$("#txtSaleFactor4").val("");
			$("#txtSaleFactor4UOM").val("");
			$("#txtSalesUnitPrice").val("");
			$("#SellUnitPrice2").val("");
			$("#SellUnitPrice3").val("");
			$("#SellUnitPrice4").val("");
			var hideSalesItemSaveUpdate = $("#hideSalesItemSaveUpdate").val();
			if (hideSalesItemSaveUpdate == "Update") {
				alert("Record Updated successfully..!");
			} else {
				alert("Record saved successfully..!");
			}
			//$("#hideSalesItemSaveUpdate").val("0");
			getNextItemSaleId();
			fetchItemSalesDetails();
			calculateProfitOfItem();
		}
	});
}

function fetchItemSalesDetails() {
	var itemsalesId = $("#txtItemSalesInfoId").val();
	var ItemMasterId = $("#lblItemID").text();
	var inputs = [];
	inputs.push('action=fetchItemSalesDetails');
	inputs.push('isEdit=no');
	inputs.push('itemsalesId=' + itemsalesId);
	inputs.push('ItemMasterId=' + ItemMasterId);
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
			// alert(r);
			counterItemSale = 1;
			$("#SalesInfoTable").setTemplate(inventoryItemSalesTemp);
			$("#SalesInfoTable").processTemplate(pobj1);
			$("#SalesInfoTableAjax").html(r);
		}
	});
}

function EditItemSalesDetails(id) {
	$("#hideSalesItemSaveUpdate").val("Update");
	var obj = $("#SalesInfoTableAjax").html();
	objItemSalesDetail = JSON.parse(obj);

	for ( var i = 0; i < objItemSalesDetail.ltInventoryItemSaleDTOs.length; i++) {
		if (objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_id == id) {

			$("#txtSaleFactor1")
					.val(
							objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_uom_factor1);
			$("#txtSaleFactor2")
					.val(
							objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_uom_factor2);
			$("#txtSaleFactor3")
					.val(
							objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_uom_factor3);
			$("#txtSaleFactor4")
					.val(
							objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_uom_factor4);
			$("#txtSaleFactor1UOM")
					.val(
							objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_factor_uom1);
			$("#txtSaleFactor2UOM")
					.val(
							objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_factor_uom2);
			$("#txtSaleFactor3UOM")
					.val(
							objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_factor_uom3);
			$("#txtSaleFactor4UOM")
					.val(
							objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_factor_uom4);
			$("#txtSalesUnitPrice")
					.val(
							objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_uom);
			$("#SellUnitPrice2")
			.val(
					objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_unit_price2);
			$("#SellUnitPrice3")
			.val(
					objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_unit_price3);
			$("#SellUnitPrice4")
			.val(
					objItemSalesDetail.ltInventoryItemSaleDTOs[i].item_sales_unit_price4);
			$("#txtItemSalesInfoId").val(id);
		}
	}

}

function DeleteItemSalesDetails(ItemSalesId) {
	// alert("id pur is:"+ItemSalesId);
	var ItemMastId = $("#lblItemID").text();
	// alert("item id:"+ItemMastId);
	var didConfirm = confirm("Are you sure to delete record?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteItemSalesRowDetail');
		inputs.push('ItemSalesId=' + ItemSalesId);
		inputs.push('ItemMastId=' + ItemMastId);
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
				alert(r);
				fetchItemSalesDetails();
			}
		});
	}
}

function resetItemSalesForm() {

	$("#txtSalesUnitPrice").val("");
	$("#SellUnitPrice2").val("");
	$("#SellUnitPrice3").val("");
	$("#SellUnitPrice4").val("");
	
	$("#txtSaleFactor1").val("");
	$("#txtSaleFactor1UOM").val("");
	$("#txtSaleFactor2").val("");
	$("#txtSaleFactor2UOM").val("");

	$("#txtSaleFactor3").val("");
	$("#txtSaleFactor3UOM").val("");
	$("#txtSaleFactor4").val("");
	$("#txtSaleFactor4UOM").val("");
	$("#txtSalesUnitPrice").val("");
	getNextItemSaleId();

}
/** ******************************************Maintainance(Vikram)***************************************************************** */
var countMachine = 1;
var inventoryAssestItemForMaintanance = "<table class='table table-bordered table-striped table-condensed cf' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;height: 21.5px;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Machine Name</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Machine Code</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>From</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Months</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>To</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.ltInventoryItemMasterDTOs as ltInventoryItemMasterDTOs}"
		+ "<tr id='myRow' style='height: 21.5px;'>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='maintainanceId{countMachine}'>{countMachine}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='itemName{countMachine}'>{$T.ltInventoryItemMasterDTOs.item_name}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='itemId{countMachine}'>{$T.ltInventoryItemMasterDTOs.item_id}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='leadDate{countMachine}'>"
		+ "<input type='text' id='idTourDateDetails{countMachine}' onclick='displayCalendar(this.idTourDateDetails,'dd/mm/yyyy',this)' class='form-control input-SmallText' value='{$T.ltInventoryItemMasterDTOs.lead_time}' readonly='readonly'/></td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered'>"
		+ "<input type='text' id='selinterval{countMachine}' style='height: 21.5px;' name='selinterval' style='width: 40%;font-size: 11px;'  onkeyup='Calculaterenewal(this.value,{countMachine})'></td>"
		+ "<td class='col-md-2 center style='height: 21.5px;' table-bordered' id='renewalDate{countMachine++}'></td>"
		+ "</tr>{#/for}"
		+ "<input type='hidden' value='{countMachine}' id='RowCount'/></table>";

var countMachine1 = 1;
var inventoryAssestItemForMaintananceView = "<table class='table table-bordered table-striped table-condensed cf' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;height: 21.5px;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Machine Name</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Machine Code</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>From</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Months</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>To</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Maintenance Complete</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.ltMaintainanceMachineDTO as ltMaintainanceMachineDTO}"
		+ "<tr id='myRow' style='height: 21.5px;'>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='maintainanceId{countMachine1}'>{$T.ltMaintainanceMachineDTO.machine_maintainance_id}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='itemName{countMachine1}'>{$T.ltMaintainanceMachineDTO.item_name}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center table-bordered' id='itemId{countMachine1}'>{$T.ltMaintainanceMachineDTO.machine_maintainance_item_id}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='leadDate{countMachine1}'>{$T.ltMaintainanceMachineDTO.from_date}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='months{countMachine1}'>{$T.ltMaintainanceMachineDTO.months}</td>" // <input
		// type='text'
		// id='selinterval{countMachine1}'
		// style='height:
		// 21.5px;'
		// name='selinterval'
		// style='width:
		// 40%;font-size:
		// 11px;'
		// onkeyup='Calculaterenewal(this.value,{countMachine1})'>
		+ "<td class='col-md-2 center style='height: 21.5px;' table-bordered' id='renewalDate{countMachine1}'>{$T.ltMaintainanceMachineDTO.to_date}</td>"
		+ "<td class='col-md-2 center style='height: 20px;' table-bordered' id='btnrenewalDate{countMachine1++}'><button id='btnEdit2' class='btn btn-success' value='EDIT' onclick='editMaintainenceSchedule({$T.ltMaintainanceMachineDTO.machine_maintainance_id})' data-target='#Item_Master_Form' data-toggle='modal' type='button'><i class='fa fa-edit'></i></td>"
		+ "<td class='col-md-2 center style='height: 20px;' table-bordered' id='checkedrenewalDate{countMachine1++}'><input onclick='changeDateOnCheked({$T.ltMaintainanceMachineDTO.machine_maintainance_id})' data-target='#popupmaintanenceColmplete' data-toggle='modal' type='checkbox' /></td>"
		+ "</tr>"
		+ "<input type='hidden' value='{countMachine1}' id='RowCount'/>{#/for}</table>";

function fetchAssets(pageName) {

	if (pageName == "MachinTable") {

		var inputs = [];
		inputs.push('action=fetchAssets');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {
				// alert(ajaxResponse);
				var pobj1 = eval('(' + ajaxResponse + ')');
				$("#objMM").html(ajaxResponse);

				$("#machine_div")
						.setTemplate(inventoryAssestItemForMaintanance);
				$("#machine_div").processTemplate(pobj1);

				$('#rowCount').val(pobj1.ltInventoryItemMasterDTOs.length);
				/*
				 * }else{ }
				 */

			}
		});
	} else if (pageName == "MachineTableView") {
		var inputs = [];
		inputs.push('action=fetchAssetsView');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {
				// alert(ajaxResponse);
				var pobj1 = eval('(' + ajaxResponse + ')');
				$("#objMM").html(ajaxResponse);

				$("#machine_div").setTemplate(
						inventoryAssestItemForMaintananceView);
				$("#machine_div").processTemplate(pobj1);

				$('#rowCount').val(pobj1.ltMaintainanceMachineDTO.length);

			}
		});

	}

}

function saveAssetsPreRequisites() {
	var inputs = [];
	inputs.push('action=saveAssetsPreRequisites');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "MachineMaintainenceServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			// alert(ajaxResponse);
			location.reload();
		}
	});

}

function saveMaintainanceMachin() {
	var maintainance_machin = {
		ltMaintainanceMachineDTO : []
	};

	var rowCount = $("#RowCount").val();
	// alert(rowCount-1);
	for ( var i = 1; i < rowCount; i++) {

		var maintainance_id = $("#maintainanceId" + i).html();
		// alert(maintainance_id);
		var itemName = $("#itemName" + i).html();
		// alert(itemName);
		var itemId = $("#itemId" + i).html();
		// alert(itemId);
		var idTourDateDetails = $("#idTourDateDetails" + i).val();
		// alert(idTourDateDetails);
		var selinterval = $("#selinterval" + i).val();
		// alert(selinterval);
		var renewalDate = $("#renewalDate" + i).html();
		// alert(renewalDate);
		// var currentdate = $("#currentDate").val();
		// alert(currentdate);

		/* if (filePath != undefined) { */

		maintainance_machin.ltMaintainanceMachineDTO.push({
			item_name : itemName,
			machine_maintainance_item_id : itemId,
			from_date : idTourDateDetails,
			months : selinterval,
			to_date : renewalDate,
			maintainance_machine_delete_flag : 0,
		});
		/* } */

		maintainance_machin = JSON.stringify(maintainance_machin);
		var inputs = [];
		inputs.push('action=saveMaintainanceMachin');
		inputs.push('maintainance_machin=' + maintainance_machin);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "MachineMaintainenceServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {

				alert(ajaxResponse);
				location.reload();
			}
		});
	}

}
/** ****************************************** modified Maintance table @date 31march2016 *********************** */
/*var manageMachinMaintainence = "<table id='' cellpadding='1' cellspacing='0' class='table table-bordered table-striped table-condensed'>"
		+ "<tbody>"
		 +"{#foreach $T.ltMaintainanceMachineDTO as ltMaintainanceMachineDTO}" 
		+ "<tr>"
		+ "<td>Machine Name</td>"
		+ "<td>Machine Code</td>"
		+ "</tr>"
		+ "<tr><td><input type='text' id='item_name' class='form-control input-SmallText' readonly='readonly' value='{$T.ltMaintainanceMachineDTO[0].item_name}'/></td>"
		+ "<td><input type='text' id='item_id' class='form-control input-SmallText' readonly='readonly' value='{$T.ltMaintainanceMachineDTO[0].machine_maintainance_item_id}'/></input>"
		+ "</td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td>From</td>"
		+ "<td>Months</td>"
		+ "<td>To</td></tr>"
		+ "<tr>"
		+ "<td><input type='text' id='from_date' value='{$T.ltMaintainanceMachineDTO[0].from_date}'/><br>(dd/mm/yyyy)</td>"
		+ "<td><input type='text' id='months' style='height: 21.5px;' name='selinterval' style='width: 20%;font-size: 11px;'  onkeyup='Calculaterenewal(this.value)' value='{$T.ltMaintainanceMachineDTO[0].months}'></td>"
		+ "<td><input type='text' id='renewalDate' class='form-control input-SmallText' readonly='readonly' value='{$T.ltMaintainanceMachineDTO[0].to_date}'/></td>"
		+ "<td><input type='hidden' id='hiddenMaintainenceId' value='{$T.ltMaintainanceMachineDTO[0].machine_maintainance_id}'/></td></tr>"
		+ "</tbody>"
		+ "</table>"
		+ "<div class='modal-footer' style='margin-left: -150px;'>"
		+ "<div class='form-group col-md-9-1'>"
		+ "<button type='button' class='btn btn-primary' onclick = 'updateMaintainance()'>Save</button>"
		+ "<button type='button' class='btn btn-default' data-dismiss='modal' id='closeBtn'>Cancel</button>";*/
/****  modified date in dd/mm/yyyy formate ******/
var manageMachinMaintainence = "<table id='' cellpadding='1' cellspacing='0' class='table table-bordered table-striped table-condensed'>"
	+ "<tbody>"
	/* +"{#foreach $T.ltMaintainanceMachineDTO as ltMaintainanceMachineDTO}" */
	+ "<tr>"
	+ "<td>Machine Name</td>"
	+ "<td>Machine Code</td>"
	+ "</tr>"
	+ "<tr><td><input type='text' id='item_name' class='form-control input-SmallText' readonly='readonly' value='{$T.ltMaintainanceMachineDTO[0].item_name}'/></td>"
	+ "<td><input type='text' id='item_id' class='form-control input-SmallText' readonly='readonly' value='{$T.ltMaintainanceMachineDTO[0].machine_maintainance_item_id}'/></input>"
	+ "</td>"
	+ "</tr>"
	+ "<tr>"
	+ "<td>From</td>"
	+ "<td>Months</td>"
	+ "<td>To</td></tr>"
	+ "<tr>"
	+ "<td><input type='text' id='from_date' value='{$T.ltMaintainanceMachineDTO[0].from_date}'/><br>(dd/mm/yyyy)</td>"
	+ "<td><input type='text' id='months' style='height: 21.5px;' name='selinterval' style='width: 20%;font-size: 11px;'  onkeyup='Calculaterenewal(this.value)' value='{$T.ltMaintainanceMachineDTO[0].months}'></td>"
	+ "<td><input type='text' id='renewalDate' class='form-control input-SmallText' readonly='readonly' value='{$T.ltMaintainanceMachineDTO[0].to_date}'/></td>"
	+ "<td><input type='hidden' id='hiddenMaintainenceId' value='{$T.ltMaintainanceMachineDTO[0].machine_maintainance_id}'/></td></tr>"
	+ "</tbody>"
	+ "</table>"
	+ "<div class='modal-footer' style='margin-left: -150px;'>"
	+ "<div class='form-group col-md-9-1'>"
	+ "<button type='button' class='btn btn-primary' onclick = 'updateMaintainance()'>Save</button>"
	+ "<button type='button' class='btn btn-default' data-dismiss='modal' id='closeBtn'>Cancel</button>";

/** *********************************************************************************************** */
/*
 * var completeMachinMaintainence="<table id='' cellpadding='1' cellspacing='0'
 * class='table table-bordered table-striped table-condensed'>" +"<tbody>" +"<tr>" +"<td>Maintanence
 * Completion Date </td>" +"<td><input type='text' id='iRDate'
 * class='form-control input-SmallText' readonly='readonly' /></td>" +"</tr>" +"<tr>" +"<td>Comments</td></tr>" +"<tr>" +"<td><textarea
 * name='comment' id='comment'></textarea></td>" +"</tr>" +"</tbody>" +"</table>" +"<div
 * class='modal-footer' style='margin-left: -150px;'>" +"<div class='form-group
 * col-md-9-1'>" +"<button type='button' class='btn btn-primary' onclick =
 * 'completeMaintainance()'>Save</button>" +"<button type='button' class='btn
 * btn-default' data-dismiss='modal' id='closeBtn'>Cancel</button>";
 * 
 */

function editMaintainenceSchedule(itemId) {

	$("#months").focus();
	// $("#itemData").val('');
	/*
	 * $("#item_name").val(''); $("#item_id").val(''); $("#from_date").val('');
	 * $("#months").val(''); $("#renewalDate").val('');
	 */
	// alert(itemId);
	// alert($("#hideMachinCode").val());
	// /var rowCount = $("#RowCount").val();
	/* for(var i = 1; i < rowCount; i++) { */
	// var itemId = $("#itemId"+1).html();
	var inputs = [];
	inputs.push('action=editMaintainenceSchedule');
	inputs.push('itemId=' + itemId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "MachineMaintainenceServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#itemData").html(ajaxResponse);
			$("#divmanageMachin").setTemplate(manageMachinMaintainence);
			// $("#item_name").val(pobj1.ltMaintainanceMachineDTO[0].item_name);
			// $("#item_id").val(pobj1.ltMaintainanceMachineDTO[0].machine_maintainance_item_id);
			// $("#from_date").val(pobj1.ltMaintainanceMachineDTO[0].from_date);
			// $("#months").val(pobj1.ltMaintainanceMachineDTO[0].months);
			// $("#renewalDate").val(pobj1.ltMaintainanceMachineDTO[0].to_date);
			// $("#hiddenMaintainenceId").val(pobj1.ltMaintainanceMachineDTO[0].machine_maintainance_id);
			$("#divmanageMachin").processTemplate(pobj1);
			// $('#rowCount').val(pobj1.ltMaintainanceMachineDTO.length);
			var  renewalDate = $("#renewalDate").val();
			
			/*var str = (renewalDate).split("-");
			var convrenewalDate = str[2]+"/"+str[1]+"/"+str[0];
			$("#renewalDate").val(convrenewalDate)*/
			
			
		}
	});

	/* } */
}

/* Calculaterenewal modified @date 31 march 2016 @Author : Sudhir jadhav */
function Calculaterenewal(value) {

	var lead_date = $("#from_date").val();
	
	var str = (lead_date).split("/");
	var leaddate = str[2]+"-"+str[1]+"-"+str[0];
	var months = $('#months').val();
	var date = new Date(leaddate);
	var renewalDate = date.addMonths(parseInt(months));

	if (months == "" || months == null) {
		var non = "";
		$('#renewalDate').val(non);
	} else {
		var day;
		var month;
		var year;

		if (renewalDate.getDate() < 10) {
			day = "0" + renewalDate.getDate();
		} else {
			day = renewalDate.getDate();
		}

		if (renewalDate.getMonth() < 9) {
			// month = "0"+renewalDate.getMonth();
			month = "0" + (parseInt(renewalDate.getMonth()) + 1);
		} else {
			month = (parseInt(renewalDate.getMonth()) + 1);
		}

		year = renewalDate.getFullYear();

		// (parseInt(month)+1)
		/*$('#renewalDate').val(year + "-" + month + "-" + day);*/
		
		$('#renewalDate').val(day +"/"+  month + "/" + year);
		
		/*var str = (lead_date).split("/");
		var leaddate = str[2]+"-"+str[1]+"-"+str[0];
		   alert(leaddate);*/
		
		
		
		
/*		var lead_date = $("#from_date").val();
		
		var str = (lead_date).split("/");
		var leaddate=str[2]+"-"+str[1]+"-"+str[0];
		   
		var months = $('#months').val();
		var date = new Date(lead_date);
		var renewalDate = date.addMonths(parseInt(months));

		if (months == "" || months == null) {
			var non = "";
			$('#renewalDate').val(non);
		} else {
			var day;
			var month;
			var year;

			if (renewalDate.getDate() < 10) {
				day = "0" + renewalDate.getDate();
			} else {
				day = renewalDate.getDate();
			}

			if (renewalDate.getMonth() < 9) {
				// month = "0"+renewalDate.getMonth();
				month = "0" + (parseInt(renewalDate.getMonth()) + 1);
			} else {
				month = (parseInt(renewalDate.getMonth()) + 1);
			}

			year = renewalDate.getFullYear();

			// (parseInt(month)+1)
			$('#renewalDate').val(year + "-" + month + "-" + day);*/

	}
}

/* maintainenece */
function getNextMachinCodeId() {

	var inputs = [];
	inputs.push('action=getNextMachinCodeId');
	inputs.push('tableName=maintainance_machine');
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
			// alert(r);
			ajaxResponse = r;
			$("#hideMachinCode").val(r);

		}
	});
}

/* update Maintainance modified @date 31 march 2016 @Author : Sudhir jadhav */
function updateMaintainance() {

	// alert("In updateMaintainance");
	var from_date = $("#from_date").val();
	var months = $("#months").val();
	var to_date = $("#renewalDate").val();
	/*var str = (to_date).split("/");
	var to_date = str[2]+"-"+str[1]+"-"+str[0];*/
	var item_id = $("#item_id").val();
	var maintainence_id = $("#hiddenMaintainenceId").val();

	var input = [];
	input.push("action=updateMaintainance");
	input.push('maintainence_id=' + maintainence_id);
	input.push('from_date=' + from_date);
	input.push('months=' + months);
	input.push('to_date=' + to_date);
	input.push('item_id=' + item_id);

	var str = input.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "MachineMaintainenceServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			alert(ajaxResponse);
			location.reload();
		}
	});
}

function changeDateOnCheked(ItemId) {
	var inputs = [];
	inputs.push('action=changeDateOnCheked');
	inputs.push('itemId=' + ItemId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "MachineMaintainenceServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(ajaxResponse) {
					// alert(ajaxResponse);
					pobj1 = eval('(' + ajaxResponse + ')');
					$("#maintaneneceComplete").html(ajaxResponse);
					if (pobj1.ltMaintainanceMachineDTO.length > 0) {
						var renewalDateDB = pobj1.ltMaintainanceMachineDTO[0].to_date;
						// alert(renewalDateDB);
						$("#iRDate").val(renewalDateDB);
						$("#maintaneneceId")
								.val(
										pobj1.ltMaintainanceMachineDTO[0].machine_maintainance_id);
						$("#maintanenceMonths").val(
								pobj1.ltMaintainanceMachineDTO[0].months);
						$("#divManageMaintainence").setTemplate(
								completeMachinMaintainence);
						$("#divManageMaintainence").processTemplate(pobj1);
					}

				}
			});

}

function completeMaintainance() {
	var day = "";
	var month = "";
	var year = "";
	var newRenewalDate = "";
	var maintanenceId = $("#maintaneneceId").val();
	
	var toDate = $("#iRDate").val();
	var months = $("#maintanenceMonths").val();
	
	var date = new Date(toDate);
	var renewalDate = date.addMonths(parseInt(months));

	if (months == "" || months == null) {
		var non = "";
		$('#renewalDate').val(non);
	} else {

		if (renewalDate.getDate() < 10) {
			day = "0" + renewalDate.getDate();
		} else {
			day = renewalDate.getDate();
		}

		if (renewalDate.getMonth() < 9) {
			// month = "0"+renewalDate.getMonth();
			month = "0" + (parseInt(renewalDate.getMonth()) + 1);
		} else {
			month = (parseInt(renewalDate.getMonth()) + 1);
		}

		year = renewalDate.getFullYear();

		newRenewalDate = year + "-" + month + "-" + day;
	}
	var comment = $("#comment").val();
	// alert(comment);
	// alert(toDate);
	var inputs = [];
	inputs.push('action=updateToNewMaintanence');
	inputs.push('maintanenceId=' + maintanenceId);
	inputs.push('newFromDate=' + toDate);
	inputs.push('newToDate=' + newRenewalDate);
	inputs.push('comment=' + comment);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "MachineMaintainenceServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			alert(ajaxResponse);
			location.reload();
		}

	});

}

function fetchAssetItemDetail() {

	var itemName = $('#byName').val();
	if (itemName == "" || itemName == null) {
		alert("Please enter item name");
		$("#byName").focus();
		return false;
	}

	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(itemName)) {
		alert("Item name should be of alphabets and digits only with a single space allowed..!");
		$("#byName").focus();
		return false;
	}
	// alert(itemName);
	var inputs = [];
	inputs.push('action=fetchAssetItemDetail');
	inputs.push('itemName=' + itemName);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "MachineMaintainenceServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			// alert(r);
			pobj1 = eval('(' + r + ')');
			objUOM = JSON.parse(r);
			if (objUOM.ltMaintainanceMachineDTO.length > 0) {
				$("#machine_div").setTemplate(
						inventoryAssestItemForMaintananceView);
				$("#machine_div").processTemplate(pobj1);
			} else {
				alert("Record not found..!");
				fetchAssets();
			}
			// $("#byUomId").val("");
			fetchAssets();
		}
	});

}

/*
 * 
 * var mainMachineMainTemp = "{#foreach $T.ltInventoryItemMasterDTOs as sl}<tr>" + "<td class='col-md-1-1 center'>{++i1}</td>" + "<td class='col-md-1-1 center'>{$T.sl.mn}</td>" + "<td class='col-md-1-1 center'>{$T.sl.mc}</td>" + "<td class='col-md-1-1 center'>{$T.sl.dn}</td>" + "<td class='col-md-1-1 center'><input
 * type='text' name='frm_date{i1}' value='{$T.sl.fm}' style='width: 90%; border:
 * 0.2px solid; text-align: center;' id='frm_date{i1}' class='dp-applied'
 * onchange='geteTodate1({i1})'></td>" + "<td class='col-md-1-1 center'><input
 * type='text' id='months{i1}' name='months{i1}' value='{$T.sl.nom}'
 * style='width: 80%; border: 0.2px solid; text-align: center;'
 * onkeyup='geteTodate1({i1})' onkeypress='return validateNumbers(event)' />" + "</td><td class='col-md-1-1 center'><input
 * type='text' name='to_date{i1}' value='{$T.sl.td}' style='width: 90%; border:
 * 0.2px solid; text-align: center;' id='to_date{i1}' class='dp-applied'
 * readonly='readonly'>" + "</td></tr>{#/for}<input type='hidden'
 * value='{i1}' id='countForMachineMainte'>";
 */

/**
 * ************************ Featch taxcode By Autosuggetion for item Master
 * Author :sudhir Date:10:12:2015*****************
 */

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
						alert('error');
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


/**
 * ************************************select * Tax code and tax rate *********Author:Sudhir Date:11:12:2015 ******************************************
 */
function addItemTaxName() {
	//var pid = $("#hiddenPartyId").val();
	var taxcodeandrate = $("#txtNewTax").val();
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
		 //$(0).val();
		$("#lstBoxforTax").append(o);
		//$("#hiddenPartyId").val("");
		$("#txtNewTax").val("");
	}
}
/******remove tax code and rate from list Author:sudhir Date:11:12:2014***************/
function removeItemTax() {

	$('#lstBoxforTax option:selected').remove();

}



/*****  create dyanamic row for unique identification * modified @Date 13june2016 *****/
function toCreateDivPO() {
	
	$("#closeonclick").hide();
	$('#iHidePurOrderBtn').css('display', 'block');
	if (test > 0 && isNew > 0) {
		if (rowCount == 1) {

			rowCount = test;

		}

		rowCount++;

		$("#ItemInfoTablePO > tbody")
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
						+ " <td><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtSirNo_"
						+ rowCount
						+ "' onkeyup='auto(this.id,onchange)' />"
						+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
						+ rowCount
						+ "' /><input type='hidden'  id='txtInvItemUniqueId"
						+ rowCount
						+ "' value='0'/></td> "
						+ "<td><input type='text' class='form-control input-SmallText' id='txtItemLocation"
						+ rowCount
						+ "' </td>"+" </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		/*auto("txtPurchaseQuotationItemName_" + rowCount, "onload"); */
		//autotaxCode("txtPurchaseQuotationTaxCodePO_" + rowCount, "onload");

	} else {
		//rowCount = 1;
		$("#ItemInfoTablePO > tbody")
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
								+ " <td><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtSirNo_"
								+ rowCount
								+ "' onkeyup='auto(this.id,onchange)' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /><input type='hidden'  id='txtInvItemUniqueId"
								+ rowCount
								+ "' value='0'/></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtItemLocation"
								+ rowCount
								+ "' </td>"+" </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		/*auto("txtPurchaseQuotationItemName_" + rowCount, "onload");*/
	//	autotaxCode("txtPurchaseQuotationTaxCodePO_" + rowCount, "onload");
		rowCount++;
	}

}
/*********** End create dyanamic row for unique identification *****************/

/****** remove dyanamic row for unique identification *****************/

function toRemoveDivStockPO(RowCount) {
	var hiddenRowCount = document.getElementById("RowCount").value;
	var temp = hiddenRowCount;

	var totaltblsize = $("#totaltblsize").val();
	var p = 1;
	for ( var i = 0; i < totaltblsize; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#deleterow" + p + "").remove();
			temp = temp - 1;
			$("#RowCount").val(temp);
		}
		p++;
	}
	isNew = 1;
	/*totalDocDiscountPQ();
	totalDocQtyPQ();*/

}

/***********End remove dyanamic row for unique identification *****************/





/***************** @Author Sudhir @Date:24may2016 ***********/
function checkuniqueIdentification()
{
	var $radios = $('input:checkbox[name=chkApplyUniqueIdentification]');
	if ($radios.is(':checked') == true)
		
	{
		$("#btnAddNew").show('show');
		$("#removeRow").show('show');
		$("#ItemInfoTablePO").show('show');
	}
	if ($radios.is(':checked') == false)
	{
		$("#btnAddNew").hide('show');
		$("#removeRow").hide('hide');
		$("#ItemInfoTablePO").hide('show');
	}
	
}


/*** New Save unique identification @Date:25may2016 @AUthor :Sudhir  ***/
/*
function saveUniqueIdentification() {

 	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
     
     var lblItemID = $("#lblItemID").val(); 
	var materiallist = {
		ltinvetorypurchasecommonitemmaster :[]
	};
	 
	for ( var i = 1; i <= totaltblsize; i++) {
		if ($("#txtPurchaseQuotationItemNumber" + i).val() != null &&  $("#txtPurchaseQuotationItemNumber" + i).val() != undefined ) {
	
			var txtPurchaseQuotationItemName = $("#txtPurchaseQuotationItemNumber" + i).val();
			 
			var txtInvpurchaseCommonItemMasterId = $("#txtInvpurchaseCommonItemMasterId" + i).val();

			var txtSirNo = $("#txtSirNo_" + i).val();
			var txtItemLocation = $("#txtItemLocation" + i).val();

			  
			materiallist.ltInventoryItemUniqueIdendifications
					.push({
						
						inv_item_unique_identification_sir_no :txtSirNo,
						inv_item_unique_identification_location_name:txtItemLocation,
						inv_item_unique_identification_id : txtInvpurchaseCommonItemMasterId,
						item_id:lblItemID,
						 
					});

		}
		
	}
	
	var li = materiallist.ltInventoryItemUniqueIdendifications.length;
	 if(li == 0)
		{
		alert("Please enter atleast one Item row to Save Purchase Quotation");
		return false;
		}
		 

	materiallist = JSON.stringify(materiallist);
	 
	var inputs = [];

	inputs.push('action=savePurchaseCommonDetail');
	inputs.push('materiallist=' + materiallist);
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
			  
		}
	}); 
}
*/


/****** getItemUniqueIdentificationDetails @Date:30may2016 @author sudhir ***********/
function getItemUniqueIdentificationDetails(itemId) {
	var inputs = [];
	inputs.push('action=fetchItemUniqueIdentificationDetails');
	inputs.push('isEdit=no');
	inputs.push('itemId='+itemId);
	clearPopUp();
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//var obj = JSON.parse(r);
			srNumber = 1;
			/*$("#btnAddNew").hide('hide');
			$("#removeRow").hide('hide');
			$("#ItemInfoTablePO").show('show');
			$("#uniqueIdentification").show();*/
			if(pobj1.ltInventoryItemUniqueIdendifications.length > 0)
			{
				
				document.getElementById("chkApplyUniqueIdentification").checked = true;
				document.getElementById("chkApplyUniqueIdentification").disabled = true
				$("#btnAddNew").show();
				$("#removeRow").show();
				
			for ( var Count = 0; Count < pobj1.ltInventoryItemUniqueIdendifications.length; Count++) {
				$("#ItemInfoTablePO > tbody")
				.append(
						"<tr id='deleterow"
								+ srNumber
								+ "'> <td> <input type='checkbox'  name='checkbox"
								+ srNumber
								+ "' id='checkbox"
								+ srNumber
								+ "'/></td><td>"
								+ srNumber
								+ "  <input type='hidden' id='rowcountid"
								+ srNumber
								+ "' value ="
								+ srNumber
								+ "> </td>"
								+ " <td><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtSirNo_"+srNumber+ "'  value='"+pobj1.ltInventoryItemUniqueIdendifications[Count].inv_item_unique_identification_sir_no + "' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ srNumber
								+ "' /><input type='hidden'  id='txtInvItemUniqueId"
								+ srNumber
								+ "' value='"+pobj1.ltInventoryItemUniqueIdendifications[Count].inv_item_unique_identification_id + "' /></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtItemLocation"+ srNumber+ "' value='"+pobj1.ltInventoryItemUniqueIdendifications[Count].inv_item_unique_identification_location_name + "' /></td>"+" </tr>");
 				
		$("#RowCount").val(srNumber);
		srNumber++;
		test++;
			}
 			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
			
			
			}
			
			else
				{
				
				document.getElementById("chkApplyUniqueIdentification").checked = false;
				document.getElementById("chkApplyUniqueIdentification").disabled = false;
			
				}
	  	}
	});

}


function showidentificationdiv(){
	/*$("#btnAddNew").show('show');
	$("#removeRow").show('show');
	$("#ItemInfoTablePO").show('show');*/
	$("#uniqueIdentification").show('show');
}
function hideidentificationdiv(){
	$("#uniqueIdentification").hide('hide');
	/*$("#btnAddNew").hide('hide');
	$("#removeRow").hide('hide');
	$("#ItemInfoTablePO").hide('hide');*/
	
}

function clearPopUp() {
	/*$('#Purchase_Order_Form').find('input:text').val('');
	$('#Purchase_Order_Form').find('textarea').val('');*/
	//	getNextQuotationId();
	$("#ItemInfoTablePO > tbody").html('');
	//$("#txtVendorCode").val('');
	$("#RowCount").val('');
	isNew = 1;
	test = 1;
}

/***Tamplet for Setting Assest Management Div  for machine MAintance @Date 28june2016 @Author Sudhir jadhav ***/ 
var countAssentMgt = 1;
var inventoryMaintaiceAssestManagementView = "<table class='table table-bordered table-striped table-condensed cf' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;height: 21.5px;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Item Name</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Item Code </div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>UID</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Quantity</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.ltInventoryItemUniqueIdendifications as ltInventoryItemUniqueIdendifications}"
		+ "<tr id='myRow' style='height: 21.5px;'>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='maintainanceId{countMachine1}'>{countAssentMgt++}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='itemName{countMachine1}'>{$T.ltInventoryItemUniqueIdendifications.inv_item_unique_identification_location_name}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center table-bordered' id='itemId{countMachine1}'>{$T.ltInventoryItemUniqueIdendifications.item_id}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='leadDate{countMachine1}'>{$T.ltInventoryItemUniqueIdendifications.inv_item_unique_identification_id}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center table-bordered' id='months{countMachine1}'>{$T.ltInventoryItemUniqueIdendifications.inv_batch_stock_fixed_item_qty}</td>" // <input
		+ "<td class='col-md-2 center style='height: 20px;' table-bordered' id='btnrenewalDate{countMachine1++}'><button id='btnEdit2' data-toggle='modal' data-target='#assestManagementDivUID'  class='btn btn-success' value='EDIT' onclick='editAssestManagement({$T.ltInventoryItemUniqueIdendifications.inv_item_unique_identification_id},{$T.ltInventoryItemUniqueIdendifications.item_id})'type='button'><i class='fa fa-edit'></i></td>"
		+ "</tr>"
		+ "<input type='hidden' value='{countAssentMgt}' id='RowCount'/>{#/for}</table>";



function fetchAssetsMangemet() {
	//fetchAssetsMangement
	//alert("hiii");
		var inputs = [];
		//inputs.push('action=fetchAssetsView');
		inputs.push('action=fetchAssetsMangement');
		inputs.push('isEdit=no');
		inputs.push('itemId=0');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "MachineMaintainenceServlet",
			//url : "InventoryServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {
				// alert(ajaxResponse);
				
				countAssentMgt = 1;
				var pobj1 = eval('(' + ajaxResponse + ')');
				/*$("#objMM").html(ajaxResponse);*/

				$("#machine_div").setTemplate(
						inventoryMaintaiceAssestManagementView);
				$("#machine_div").processTemplate(pobj1);

				/*$('#rowCount').val(pobj1.ltMaintainanceMachineDTO.length);*/

			}
		});

}


/****************** Active Total Assests color  Author :sudhir Date:28/6/2016 ****************/
function openfetchAssetsMangemetDiv() {
	$("#assetManagment").css("background-color", "");
	$("#totalAssests").css("background-color", "#81A981");
	$("#assetManagment").css("color", "black");
	$("#totalAssests").css("color", "white");
	fetchAssets('MachineTableView');
}

/****************** Active Assests Management color  Author :sudhir Date:28/6/2016 ****************/
function opentotalAssetsMgt() {
	$("#totalAssests").css("background-color", "");
	$("#assetManagment").css("background-color", "#81A981");
	$("#totalAssests").css("color", "black");
	$("#assetManagment").css("color", "white");
	// fetchPurchaseQuotationMasterNew("no","onClick");
	fetchAssetsMangemet();
}

function editAssestManagement(uid,itemId)
{
	$("#txtUIDid").val(uid);
	alert("uid :"+uid);
	alert("itemId :"+itemId);
	rowCount = 1;
}

/***save unique Identification for Item @Date :30 june 2016 @Author sudhir jadhav for machine Maintanace */
function saveUniqueIdentification() {
 	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	
	var txtUIDid = $("#txtUIDid").val();
	alert(txtUIDid);
	var materiallist = {
			ltInventoryItemUniqueIdendifications :[]
	};
	
		for ( var i = 1; i <= totaltblsize; i++) {
			if ($("#txtPurchaseQuotationItemNumber" + i).val() != null && $("#txtPurchaseQuotationItemNumber" + i).val() != undefined) 
			{
			var txtPurchaseQuotationItemName = $("#txtPurchaseQuotationItemNumber" + i).val();
			var txtPurchaseQuotationItemName_ = $("#txtPurchaseQuotationItemName_" + i).val();
				 
				var txtInvItemUniqueId = $("#txtInvItemUniqueId" + i).val();

				var txtSirNo = $("#txtSirNo_" + i).val();
				var txtItemLocation = $("#txtItemLocation" + i).val();
				materiallist.ltInventoryItemUniqueIdendifications
						.push({
							inv_item_unique_identification_sir_no : txtSirNo,
							inv_item_unique_identification_location_name : txtItemLocation,
							inv_item_unique_identification_id : txtUIDid,
							item_id : itemId,
						});

			}

		}

		var li = materiallist.ltInventoryItemUniqueIdendifications.length;
		 
		if (li == 0) {
			 alert("Please enter atleast one Item row to Save Unique Identification");
			return false;
		}

	 
  	materiallist = JSON.stringify(materiallist); 

	/* Party Master */
	var inputs = [];
	inputs.push('action=SaveUniqueIdentification');
	/*unique identification json Arrya @Date 26may2016 ****/
	inputs.push('materiallist='+materiallist);
	/* End unique identification json Arrya @Date 26may2016 ****/
	 	
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
			/*var hideSalesItemSaveUpdate = $("#hideSalesItemSaveUpdate").val();

			if (hideSalesItemSaveUpdate == "Update") {
				alert("Record Updated successfully..!");
			} else {
				alert("Record saved successfully..!");
			}
			$("#hideSalesItemSaveUpdate").val("0");*/

			window.location.reload("MachineTableView.jsp");
		}
	});
	
}


/*** auto Suggest for Item Name @Date: 20jully2016 @Author:Sudhir ****/
function autoSuggest(inputID, typeauto) {
	var resultData = [];

	var txtVal1 = $('#' + inputID).val();
	$("#hiddenItemIdforAutSgn").val('0');
	
	/*alert("inputID :"+ inputID);*/
	
	
	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchItemNamesOnlyAutoSuggest');
		inputs.push('txtVal=' + txtVal1);
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
						//alert(r.length);
						var availableTags = [];
						if (r.length === 32 || r.length <= 0) {
							alert("NO MATCHING FOUND");
							$("#"+ inputID).val('');
							$("#"+ inputID).focus();

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(r);

							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
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
			var currentcode = item.value;
			
			$("#hiddenItemIdforAutSgn").val(currentcode);
 

		}
	}

}

function fetchHsn() {
	var hsn = $('#hsn').val();
	var inputs = [];
	inputs.push('hsn=' + hsn);
	
	var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/hsn/allhsnList",
			error : function() {
				alert('error');
			},
			success : function(r) {
			var response = r;
				        $.each(response, function() {
			            $('#hsn').append('<option value="'+this.hsnId+'">'+this.hsnNo+'</option>');
			        });
				
				
			}
		});
		
	
	
}

function printbarcodeinv(masterId)
{
	
	window.open("inv_print_barcode.jsp?masterId="+masterId);

}

/*Upload Image Data added by Tarique aalam*/
function uploadInventroryItem()
{

	jQuery(document).ready(function() {
	$('input[type="file"]')
	.ajaxfileupload(
			{
				'action' : 'UploadFileServlet',
				'onComplete' : function(
						response) {
					var fileName = document.getElementById("fileUp").files[0].name; 
					$('#upload').hide();
					$('#message').show();
					var statusVal = JSON
							.stringify(response.status);
					if (statusVal == "false") {
						$("#message")
								.html(
										"<font color='red'>"
												+ JSON
														.stringify(response.message)
												+ " </font>");
					}
					if (statusVal == "true") {
						$("#message")
								.html(
										"<font color='green'>"
												+ JSON
														.stringify(response.message)
												+ " </font>");
						$('#patImg1')
								.attr(
										'src',
										'pharmacy/pharmacy/readImage?url='
												+ fileName);
						$('#patImg1').attr(
								'value',
								fileName);
					}
				},
				'onStart' : function() {
					$('#upload').show();
					$('#message').hide();
				}
			});
	});
};

function printbarcodeinv(masterId)
{
	
	window.open("inv_print_barcode.jsp?masterId="+masterId);
}
/*Reading Image Data*/
function ReadInventoryItemsImage(image) {
	var doc = image;
	$('#patImg1').attr("src","ReadInventoryIMagesServlet?fileName="+doc);
}


function setCssdOption()
{
	if($('#chkCssdItem').is(":checked"))
		{
		/*$('#cssdOptions').css("");*/
		$("#cssdOptions").css("display", "block");
		}
	else
		{
			$("#cssdOptions").css("display", "none");
			//$("[name=CSSDItem]").prop("checked", false);
			
		}
	
}	


function checkCheckbox(id)
{
	if(id=="chkLaundryItem")
		{
			$("#chkCssdItem").prop("checked",false);
			setCssdOption();
		}
	else{
		$("#chkLaundryItem").prop("checked",false);
	}
	}


