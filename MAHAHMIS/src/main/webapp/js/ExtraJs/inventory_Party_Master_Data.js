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
var tempforLab = "<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Item Info</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Contect Info</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Baseic Info</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Account Info</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Freight Info</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Repart</div></th>"
		+ "	</tr></thead><tbody div  >";
function getSalesQuotationDashboard(type) {
	if (type == "onload") {
		var pobj1;
		$("#ItemMastercontainer").setTemplate(tempforLab);
		$("#ItemMastercontainer").processTemplate(pobj1);
	}
}

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

function getNextPartyMasterId() {
	var inputs = [];
	inputs.push('action=txtpartymastercode');
	inputs.push('tableName=inv_party_master');
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
			$("#txtpartymastercode").val(r);
		}
	});
}

function getGeneralInfoId() {
	var inputs = [];
	inputs.push('action=txtgeneralinfoId');
	inputs.push('tableName=inv_party_master_general_info');
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
			$("#txtgeneralinfoId").val(r);		
		}
	});
}

function getContactInfoId() {
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
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtcontactcode").val(r);
		}
	});
}
function getPaymentInfoId() {
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
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtpaymentid").val(r);
		}
	});
}

function refreshPage()
{
	
	window.location.replace("inventory_Party_Master_Data.jsp");
}
function getOtherInfoId() {
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
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtotherid").val(r);
		}
	});
}
function getAddressInfoId() {
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
			alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			$("#txtaddressinfocode").val(r);
		}
	});
}

function SavePartyMaster() 
{
	var txtpartymastercode = $("#txtpartymastercode").val();
	var txtpartyname = $("#txtpartyname").val();
	/*var selgroup1 = $("#selgroup").val();
	alert(selgroup1);*/
	var selgroup = $("#selgroup option:selected").text();
	var txtparentcompany = $("#txtparentcompany").val();
	var txtstatus = $("#txtstatus").val();
	var selpriority = $("#selpriority").val();
	var seltype = $("#seltype").val();
	var selcurrency = $("#selcurrency").val();
	
	var txtVatNo = $("#txtVatNo").val();
	var txtServiceTaxNo = $("#txtServiceTaxNo").val();
	var txtTinNo = $("#txtTinNo").val();
	
	//validation
	if(txtpartyname == "" || txtpartyname == null)
	{
	alert("please enter party name");
	$("#txtpartyname").focus();
	return false;
	}
	/*var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(txtpartyname)) {
		alert("Party name should be of alphabets only with a single space allowed..!");
		$("#txtpartyname").focus();
		return false;
	}*/
	
	var group = document.getElementById("selgroup");
    var strgrp = group.options[group.selectedIndex].val;
   // var strUser1 = e.options[e.selectedIndex].text;
    if(strgrp == 0)
    {
	    alert('please select group');
		$("#selgroup").focus();
		return false;
    }
	
    var curency = document.getElementById("selcurrency");
    var strcuurency = curency.options[curency.selectedIndex].value;
    if(strcuurency == 0)
    {
	    alert('please select currency');
		$("#selcurrency").focus();
		return false;
    } 
    
	if(txtparentcompany == "" || txtparentcompany == null)
	{
		txtparentcompany ="-";
/*	alert("please enter parent company name");
	$("#txtparentcompany").focus();
	return false;*/
	}
	var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(txtparentcompany)) {
		alert("Parent party name should be of alphabets only with a single space allowed..!");
		$("#txtparentcompany").focus();
		return false;
	}
	 
	 var curency = document.getElementById("txtstatus");
     var strcuurency = curency.options[curency.selectedIndex].value;
     if(strcuurency == 0)
     {
	    alert('please select party status');
		$("#txtstatus").focus();
		return false;
     }
     
	 
     
     var curency = document.getElementById("selpriority");
     var strcuurency = curency.options[curency.selectedIndex].val;
     if(strcuurency == 0)
     {
	    alert('please select party priority');
		$("#selpriority").focus();
		return false;
     }
     
     
     var curency = document.getElementById("seltype");
     var strcuurency = curency.options[curency.selectedIndex].value;
     if(strcuurency == 0)
     {
	    alert('please select party type');
		$("#seltype").focus();
		return false;
     }
     
	// Other Info
	var txtotherid = $("#txtotherid").val();
	var txttopic = $("#txttopic").val();
	var txtdescription = $("#txtdescription").val();
	var txtfile = $("#txtfile").val();

	
	//validaiotn others
	
	/*if(txttopic == "" || txttopic == null)
		{
		alert("please enter other info topic");
		$("#txttopic").focus();
		return false;
		}*/
	if(txttopic != "")
		{
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txttopic)) {
			alert("Topic should be of alphabets and digits only with a single space allowed..!");
			$("#txttopic").focus();
			return false;
		  }
		
		}
/*	
	if(txtdescription != "")
	{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtdescription)) {
		alert("Topic description should be of alphabets and digits only with a single space allowed..!");
		$("#txtdescription").focus();
		return false;
	  }
	
	}*/
	
	if(txtfile != "")
	{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtfile)) {
		alert("Topic txt file should be of alphabets and digits only with a single space allowed..!");
		$("#txtfile").focus();
		return false;
	  }
	
	}
	
	var genralInfo = $("#PartyGeneralTableInfoList").html();
	
	   if(genralInfo== "" || genralInfo == null)
		   {
		   alert("Enter at least One Record In General Info tab ");
		   return false;
		   }
	   
	   var contactInfo = $("#PartyContactTableInfoList").html();
	   if(contactInfo == "" || contactInfo == null)
	   {
		   alert("Enter at least One Record In Contact Info tab ");
		   return false;
	   }
	   
	   var addressInfo = $("#PartyAddressTableInfoList").html();
	   
	   if(addressInfo == "" || addressInfo == null)
	   {
		   alert("Enter at least One Record In Address Info tab ");
		   return false;
	   }
	
	/*if(txtdescription == "" || txtdescription == null)
	{
	alert("please enter topic description");
	$("#txtdescription").focus();
	return false;
	}
   var pattern = /^([a-zA-Z0-9]+\s?)*$/;
   if (!pattern.test(txtdescription)) {
	alert("Topic description should be of alphabets and digits only with a single space allowed..!");
	$("#txtdescription").focus();
	return false;
  }
	
   if(txtfile == "" || txtfile == null)
	{
	alert("please enter file details");
	$("#txtfile").focus();
	return false;
	}
  var pattern = /^([a-zA-Z0-9]+\s?)*$/;
  if (!pattern.test(txtfile)) {
	alert("File details should be of alphabets and digits only with a single space allowed..!");
	$("#txtfile").focus();
	return false;
 }*/
  
	/*if(txttopic == "" || txttopic == null)
		{
		alert("please enter topic");
		$("#txttopic").focus();
		return false;
		}*/
	var inputs = [];	
	inputs.push('action=savePartyDetail');
	inputs.push('txtpartymastercode=' + txtpartymastercode);
	inputs.push('txtpartyname=' + txtpartyname);
	inputs.push('selgroup=' + selgroup);
	inputs.push('selcurrency=' + selcurrency);
	inputs.push('txtparentcompany=' + txtparentcompany);
	inputs.push('txtstatus=' + txtstatus);
	inputs.push('selpriority=' + selpriority);
	inputs.push('seltype=' + seltype);

	inputs.push('txtotherid=' + txtotherid);
	inputs.push('txttopic=' + txttopic);
	inputs.push('txtdescription=' + txtdescription);
	inputs.push('txtfile=' + txtfile);
	
	inputs.push('txtVatNo=' + txtVatNo);
	inputs.push('txtServiceTaxNo=' + txtServiceTaxNo);
	inputs.push('txtTinNo=' + txtTinNo);
	
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
			var txtPartySaveUpdate = $("#txtPartySaveUpdate").val();
			if(txtPartySaveUpdate=="Update")
				{
				alert("Record Updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				
				}
			$("#txtPartySaveUpdate").val("0");
			window.location.replace("inventory_Party_Master_Data.jsp");
		}
	});
}

function fetchPartyDetailForSearch() {
	
	var partyName = $('#byName').val();
	//alert(partyName);
	if (partyName == "" || partyName == null) {
		alert("Please enter party name");
		$("#byName").focus();
		return false;
	}

	var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(partyName)) {
		alert("Party name should be of alphabets only with a single space allowed..!");
		$("#byName").focus();
		return false;
	}
	
	var inputs = [];
	inputs.push('action=fetchPartyDetailsOnSerach');
	inputs.push('itemName=' + partyName);
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
			if (objUOM.ltpartyMaster.length > 0) {
				$("#documentContent").setTemplate(inventoryDocumentTemp);
				$("#documentContent").processTemplate(pobj1);
				//$("#itemMasterAjaxResp").html(r);		
			 }
		 else {
				alert("Record not found..!");
				fetchPartyMasterNew();
			}
			//$("#byUomId").val("");
			userAccess();
		}
	});
}

function fetchPartyMasterNew() {
	var inputs = [];
	inputs.push('action=fetchPartyMasterDetail');
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
			$("#documentContent").setTemplate(inventoryDocumentTemp);
			$("#documentContent").processTemplate(pobj1);
			$("#docuemntAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function viewPartyMasterDetail(partyMasterId) {
	//alert(partyMasterId);
	$("#txtPartySaveUpdate").val("Update");
	$("#byId").val(partyMasterId);
	if (partyMasterId == null || partyMasterId == "") {
		alert("Please enter partyId Id");
		$("#byName").focus();
		return false;
	}
	var obj = $("#docuemntAjaxResp").html();
	objParty = JSON.parse(obj);
	objpartyMaster = "";
	for ( var i = 0; i < objParty.ltpartyMaster.length; i++) 
	{
		if (objParty.ltpartyMaster[i].party_master_id == partyMasterId) 
		{
			objpartyMaster = objParty.ltpartyMaster[i];
			break;
		}
	}
	$("#txtpartymastercode").val(objpartyMaster.party_master_id);
	$("#txtpartyname").val(objpartyMaster.party_master_name);
	$("#selgroup option:selected").text(objpartyMaster.party_master_group);
	$("#txtparentcompany").val(objpartyMaster.party_master_parent_company);
	$("#txtstatus").val(objpartyMaster.party_master_status);
	$("#selpriority").val(objpartyMaster.party_master_priority);
	$("#seltype").val(objpartyMaster.party_master_type);
	$("#selcurrency").val(objpartyMaster.party_master_currency);
	
	$("#txtVatNo").val(objpartyMaster.inv_party_master_vatno);
	$("#txtServiceTaxNo").val(objpartyMaster.inv_party_master_servicetaxno);
	$("#txtTinNo").val(objpartyMaster.inv_party_master_tinno);
	/*********************************slave tables*************************************/
	fetchPartyMasterGeneralDetails(partyMasterId);
	fetchPartyMasterContactsDetails(partyMasterId);	
	fetchPartyMasterAddressDetails(partyMasterId);
	fetchPartyMasterPaymentDetails(partyMasterId);
	fecthPartyOtherInfo(partyMasterId);
	
	getGeneralInfoId();
	getContactInfoId();
	getPaymentInfoId();
	getOtherInfoId();
	getAddressInfoId();
}

function fecthPartyOtherInfo(partyMasterID)
{
 //alert(partyMasterID);
 var inputs = [];
 inputs.push('action=fetchPartyOtherDetails');
 inputs.push('partyMasterID=' +partyMasterID);
 var str = inputs.join('&');
 jQuery.ajax({
	 async : true,
	 type : "POST",
	 data : str + "&reqType=AJAX",
	 url : "InventoryServlet",
	 timeout : 1000 * 60 * 5,
	 catche : false,
	 error : function()	 {
		 alert("error");		 
	 },
	 success : function(r) {
		 //alert(r);
		 objOther = JSON.parse(r);
		 var myOtherObj = "";
		 for ( var i = 0; i < objOther.ltinventorypartymasterotherinfodto.length; i++) 
		   {
			if(objOther.ltinventorypartymasterotherinfodto[i].party_master_id == partyMasterID)
				{
				myOtherObj = objOther.ltinventorypartymasterotherinfodto[i];
				break;
				}
			}
		 
		    $("#txtotherid").val(myOtherObj.party_master_other_info_id);
			$("#txttopic").val(myOtherObj.party_master_other_info_topic);
			$("#txtfile").val(myOtherObj.party_master_other_info_file);
			$("#txtdescription").val(myOtherObj.party_master_other_info_description);
	     }	 
	 
       });
 
}


function deletePartyMasterFormDetail(id) {
	var didConfirm = confirm("Are you sure to delete party details?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePartyFormDetail');
		inputs.push('id=' + id);
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
				fetchPartyMasterNew();
			}
		});
	}
}

/*function showInfo(id, tableName) {
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
								var ContactID = objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_id;
								$("#txtcontactId").val(ContactID);
								var contactPerson = objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_name;
								$("#txtcontactperson").val(contactPerson);
								$("#txtdesignation")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_designation);
								$("#txtcontaddress")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_address);
								$("#txtgender")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_gender);
								$("#txtdate")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_dob);
								$("#txtphone1")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_phone_number1);
								$("#txtphone2")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_phone_number2);
								var mobNo = objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_mobile;
								$("#txtcontactmobile").val(mobNo);
								var emailID = objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_email;
								$("#txtemail").val(emailID);
								*//**
								 * *********************************************husen
								 * added table
								 * ******************************************
								 *//*
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

								var addInfoID = objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_id;
								var CompanyName = objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_designation;
								var addAddress = objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_address;
								var addCity = objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_city;
								var addPin = objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_pin;
								var addState = objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_state;
								var addCountry = objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_country;
								$("#txtaddressinfocode").val(addInfoID);
								$("#txtaddressdesignation").val(CompanyName);
								$("#txtadraddress").val(addAddress);
								$("#txtaddrcity").val(addCity);
								$("#txtaddrpin").val(addPin);
								$("#txtaddrstate").val(addState);
								$("#txtaddrcountry").val(addCountry);
								$("#txtstreet")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_street);
								$("#txtarea")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_area);
								*//**
								 * *********************************************husen
								 * added info table
								 * ******************************************
								 *//*
								if (objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_type == "BillingAddress") {
									$("#iBillingAddress").prop('checked', true);
								}
								if (objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_type == "ShippingAddress") {
									$("#iShippingAddress")
											.prop('checked', true);
								}
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

								var paymentId = objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_id;
								var bankName = objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_bank_name;
								var acctName = objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_account_name;
								var payAddrs = objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_address;
								$("#txtpaymentid").val(paymentId);
								$("#txtpaymentterm")
										.val(
												objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_tem);
								$("#txtcreditterm")
										.val(
												objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_credit_term);
								$("#txtbankname").val(bankName);
								$("#txtaccountname").val(acctName);
								$("#txtaccountnumber")
										.val(
												objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_account_number);
								$("#txtifsc")
										.val(
												objPayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_ifsc);
								$("#txtpaymentaddress").val(payAddrs);
								*//**
								 * ******************************husen added
								 * info table *********************************
								 *//*
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

}*/
function deletePartyMasterDetail(partyId) {

}
var SrNo = 1;
/* New Inventory Function */
var inventoryDocumentTemp = "<table class='table table-striped' style='margin: 10px;width: 97%; '>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Party Name</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Party Group</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Party Master Type</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltpartyMaster as ltpartyMaster}<tr class='center'><td>{SrNo++}</td><td id='id{$T.ltpartyMaster.party_master_id}'>{$T.ltpartyMaster.party_master_id}</td><td style='text-align=left' id='desc{$T.ltpartyMaster.party_master_id}'>{$T.ltpartyMaster.party_master_name}</td><td style='text-align=left' id='desc{$T.ltpartyMaster.party_master_id}'>{$T.ltpartyMaster.party_master_group}</td>"
		+ "<td style='text-align=left' id='desc{$T.ltpartyMaster.party_master_id}'>{$T.ltpartyMaster.party_master_type}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess'  type='button' data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewPartyMasterDetail({$T.ltpartyMaster.party_master_id})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deletePartyMasterFormDetail({$T.ltpartyMaster.party_master_id})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";

function onCloseBtnRefrshPage() {

	window.location.replace("inventory_Party_Master_Data.jsp");

}



/********************************************************new party master general info details******************************************************/
var counterPartyGeneralInfo = 1;
var inventoryPartyGeneralInfoTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>GSTTx No</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Mobile No</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Company Mail </div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> </tr></thead>"
		+ "{#foreach $T.ltinventorypartymastergeneralinfodto as ltinventorypartymastergeneralinfodto}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered' id='id{$T.ltinventorypartymastergeneralinfodto.party_master_general_info_id}'>{counterPartyGeneralInfo++}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymastergeneralinfodto.party_master_general_info_id}'>{$T.ltinventorypartymastergeneralinfodto.party_master_general_info_industry_type}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymastergeneralinfodto.party_master_general_info_id}'>{$T.ltinventorypartymastergeneralinfodto.party_master_general_info_mobile}</td>"
		+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymastergeneralinfodto.party_master_general_info_id}'>{$T.ltinventorypartymastergeneralinfodto.party_master_general_info_comapny_mail}</td>"
		+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit' type='button' class='btn btn-xs btn-success' onclick='EditpartyGeneraldetails({$T.ltinventorypartymastergeneralinfodto.party_master_general_info_id})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'><button id='btnDelete' type='button' class='btn btn-xs btn-success' onclick=\"DeletePartyGeneralDetails({$T.ltinventorypartymastergeneralinfodto.party_master_general_info_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";


function SavePartyMasterGeneralInfoDetails() 
{
	var txtpartymasterId = $("#txtpartymastercode").val();
	//alert("master id :"+txtpartymasterId);
	var txtgeneralinfoId = $("#txtgeneralinfoId").val();
	//alert("gen info id :"+txtgeneralinfoId);
	
	var txtmobile = $("#txtmobile").val();
	var txtlandline = $("#txtlandline").val();
	var txtwebsite = $("#txtwebsite").val();
	var txtcompanymail = $("#txtcompanymail").val();
	var txtindustrytype = $("#txtindustrytype").val();
	var txtrating = $("#txtrating").val();
	
	
	
	//validation
	if(txtmobile != "")
		{
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtmobile)) {
			alert("Mobile number should be of digits only!");
			$("#txtmobile").focus();
			return false;
		  }
		
		}
	
	if(txtmobile == ""){
		
		alert("Mobile number should not be Empty!");
		$("#txtmobile").focus();
		return false;
	}
	
	if(txtlandline != "")
	{
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtlandline)) {
			alert("Landline should be of digits only!");
			$("#txtlandline").focus();
			return false;
		  }
	}
	
/*	if(txtindustrytype != "")
	{
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(txtindustrytype)) {
			alert("Industry type should be of alphabets only with a single space allowed..!");
			$("#txttopic").focus();
			return false;
		  }
	}*/

	
	/*if(txtrating != "")
	{
		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtrating)) {
			alert("Rating should be of digits only!");
			$("#txtrating").focus();
			return false;
		  }
	
	}*/
	var txtpanno = $("#txtpanno").val();
	
	if(txtpanno==null || txtpanno==undefined || txtpanno==""){
		txtpanno="-";
	}
	var txtcompanymail = $("#txtcompanymail").val();
	
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(txtcompanymail !=""){
	   if (!filter.test(txtcompanymail))
	    {
	    alert('Please provide valid company mail id');
	    $("#txtcompanymail").focus();
	    return false;
	    }
	   
   }
    
    
	
	var inputs = [];
	inputs.push('action=SavePartyMasterGeneralDetails');
	inputs.push('txtpartymasterId=' + txtpartymasterId);
	inputs.push('txtgeneralinfoId=' + txtgeneralinfoId);
	inputs.push('txtmobile=' + txtmobile);
	inputs.push('txtlandline=' + txtlandline);
	inputs.push('txtwebsite=' + txtwebsite);
	inputs.push('txtcompanymail=' + txtcompanymail);
	inputs.push('txtindustrytype=' + txtindustrytype);
	inputs.push('txtrating=' + txtrating);
	inputs.push('txtpanno=' + txtpanno);
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
			 $("#txtmobile").val("");
			 $("#txtlandline").val("");
			 $("#txtwebsite").val("");
			 $("#txtcompanymail").val("");
			 $("#txtindustrytype").val("");
			 $("#txtrating").val("");
			 var txtPartySaveUpdate = $("#txtPartySaveUpdate").val();
			 
			 if(txtPartySaveUpdate=="Update")
				 {
				 alert("Record Updated successfully..!");
				 }
			 else
				 {
				 alert("Record saved successfully..!");
				 }
			 $("#txtPartySaveUpdate").val("0");
			 
			 getGeneralInfoId();
			 fetchPartyMasterGeneralDetails();		 
			
		}
	});
}

function fetchPartyMasterGeneralDetails() {
	var txtpartymasterId = $("#txtpartymastercode").val();
	//alert(txtpartymasterId);
	var inputs = [];
	inputs.push('action=fetchPartyGeneralDetails');
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
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//alert(r);
			counterPartyGeneralInfo = 1;
			$("#GeneralInfoTable").setTemplate(inventoryPartyGeneralInfoTemp);
			$("#GeneralInfoTable").processTemplate(pobj1);
			$("#PartyGeneralTableInfoList").html(r);
		}
	});
}


function EditpartyGeneraldetails(id)
{
	//alert("ok id is"+id);
	$("#txtPartySaveUpdate").val("Update");
	var obj = $("#PartyGeneralTableInfoList").html();
	objpartygeneral = JSON.parse(obj);
    var myGeneralObj = "";
    
    for ( var i = 0; i < objpartygeneral.ltinventorypartymastergeneralinfodto.length; i++) {
		if (objpartygeneral.ltinventorypartymastergeneralinfodto[i].party_master_general_info_id == id) {
			myGeneralObj = objpartygeneral.ltinventorypartymastergeneralinfodto[i];
			break;
		}
	}
    
     $("#txtmobile").val(myGeneralObj.party_master_general_info_mobile);
	 $("#txtlandline").val(myGeneralObj.party_master_general_info_landline);
	 $("#txtwebsite").val(myGeneralObj.party_master_general_info_website);
	 $("#txtcompanymail").val(myGeneralObj.party_master_general_info_comapny_mail);
	 $("#txtindustrytype").val(myGeneralObj.party_master_general_info_industry_type);
	 $("#txtrating").val(myGeneralObj.party_master_general_info_rating);   
	 $("#txtgeneralinfoId").val(id);
	 $("#txtpanno").val(myGeneralObj.inv_party_master_panno);


}


function DeletePartyGeneralDetails(generalInfoId) {
	//alert("contct id is:" + generalInfoId);
	var txtpartymasterId = $("#txtpartymastercode").val();
	//alert("party id:" + txtpartymasterId);
	var didConfirm = confirm("Are you sure to delete party general info details?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePartygeneraldetails');
		inputs.push('generalInfoId=' + generalInfoId);
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
				alert(r);
				fetchPartyMasterGeneralDetails();
			}
		});
	}
}

function resetGeneralInfoFields()
{	
	 $("#txtmobile").val("");
	 $("#txtlandline").val("");
	 $("#txtwebsite").val("");
	 $("#txtcompanymail").val("");
	 $("#txtindustrytype").val("");
	 $("#txtrating").val("");
}

/******************************************************new party master***************************************************husen**/ 
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
		+ "<td class='col-md-1 center'><button id='btnDelete' value='Delete' type='button' class='btn btn-xs btn-success' onclick=\"DeletePartyContactsDetails({$T.ltinventorypartymastrecontactinfodto.party_contact_info_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";


function SavePartyMasterContactInfoDetails() {
	var txtcontactInfoId = $("#txtcontactcode").val();
	var txtpartymasterId = $("#txtpartymastercode").val();
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
	/*if(txtcontactperson == "")
	{
	   alert("Please enter person name");
	   $("#txtcontactperson").focus();
		return false;
	}*/
	if(txtcontactperson ==""){
		alert("Contact Person name shouldnot  be  empty ..!");
		$("#txtcontactperson").focus();
		return false;
	}
	
	if(txtcontactperson !="")
	{
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(txtcontactperson)) {
			alert("Contact Person name should be of alphabets only with a single space allowed..!");
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
	
	
	/*if(txtdesignation != "")
	{
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(txtdesignation)) {
			alert("Designation name should be of alphabets only with a single space allowed..!");
			$("#txtdesignation").focus();
			return false;
		  }
	}*/
	
	
	
	/*if(txtcontaddress != "")
	{
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtcontaddress)) {
			alert("Contact address should be of alphabets and digits  only with a single space allowed..!");
			$("#txtcontaddress").focus();
			return false;
		  }
	}
	*/
	
		
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
		    alert('Please Enter valid Email Id');
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
			alert("error");
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
		var txtPartySaveUpdate = $("#txtPartySaveUpdate").val();
		
		if(txtPartySaveUpdate == "Update")
			{
				alert("Record updated successfully..!");
			}
		else
			{
				alert("Record saved successfully..!");
			}
		
		$("#txtPartySaveUpdate").val("0");
			getContactInfoId();
			fetchPartyMasterContactsDetails();
		}
	});
}

function fetchPartyMasterContactsDetails() {
	var txtcontactInfoId = $("#txtcontactcode").val();
	var txtpartymasterId = $("#txtpartymastercode").val();
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
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			// alert(r);
			counterPartyContactInfo = 1;
			$("#ContactInfoTable").setTemplate(inventoryPartyContactInfoTemp);
			$("#ContactInfoTable").processTemplate(pobj1);
			$("#PartyContactTableInfoList").html(r);
		}
	});
}

function EditPartyContactsDetails(id) {
	var obj = $("#PartyContactTableInfoList").html();
	$("#txtPartySaveUpdate").val("Update");
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
	var strDate="";
	//alert(myobj.party_contact_info_dob);
	if(myobj.party_contact_info_dob == "0000-00-00")
		{
		strDate="";
		$("#txtdate").val(strDate);
		
		}
	else{
		/*var str = (myobj.party_contact_info_dob).split("-");
		var bdate = str[2] + "/" + str[1] + "/" + str[0];*/
		$("#txtdate").val(myobj.party_contact_info_dob);
	   }
	$("#txtcontactcode").val(id);
	$("#txtphone1").val(myobj.party_contact_info_phone_number1);
	$("#txtphone2").val(myobj.party_contact_info_phone_number2);
	//$("#txtcontactmobile").val(myobj.party_contact_info_mobile);
	$("#txtemail").val(myobj.party_contact_info_email);

}

function DeletePartyContactsDetails(partyContactId) {
	//alert("contct id is:" + partyContactId);
	var txtpartymasterId = $("#txtpartymastercode").val();
	//alert("party id:" + txtpartymasterId);
	var didConfirm = confirm("Are you sure to delete party contact details?");
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
				alert("error");
			},
			success : function(r) {
				alert(r);
				fetchPartyMasterContactsDetails();
			}
		});
	}
}

function resetContactInfoFields()
{	
	$("#txtcontactperson").val("");
	$("#txtdesignation").val("");
	$("#txtgender").val("");
	$("#txtcontaddress").val("");
	$("#txtdate").val("");
	$("#txtphone1").val("");
	$("#txtphone2").val("");
	//$("#txtcontactmobile").val("");
	$("#txtemail").val("");
}

/********************************************************new party mastertxtcontactcode address details******************************************************/
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
		+ "<td class='col-md-1 center'><button id='btnDelete' type='button' class='btn btn-xs btn-success' onclick=\"DeletePartyAddressDetails({$T.ltinventorypartymasteraddressinfodto.party_master_address_info_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";


function SavePartyMasterAddressInfoDetails() 
{
	var txtpartymasterId = $("#txtpartymastercode").val();
	//alert(txtpartymasterId);
	var txtaddressinfocode = $("#txtaddressinfocode").val();
	//alert(txtaddressinfocode);
	var radioBtn = null;
	if ($('#iBillingAddress').is(":checked") == true) {
		
		  radioBtn = $("#iBillingAddress").val();
	} 
	if($('#iShippingAddress').is(":checked") == true)
	{
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
	/*if(txtaddresscompany != "")
		{
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(txtaddresscompany)) {
			alert("Company name should be of alphabets only with a single space allowed..!");
			$("#txtaddresscompany").focus();
			return false;
		  }
		
		}*/
	
	if(txtadraddress==""){
		
		alert("address should not be empty..!");
		$("#txtadraddress").focus();
		return false;
		
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
	}
	*/
	
	
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
	
	/*if(txtarea !=""||txtarea !=null)
	{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtarea)) {
		alert("Area should be of alphabets and digits only with a single space allowed..!");
		$("#txtarea").focus();
		return false;
	  }		
	
	}*/
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
			alert("error");
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
			var txtPartySaveUpdate = $("#txtPartySaveUpdate").val();
			if(txtPartySaveUpdate =="Update")
			{
				alert("Record Updated successfully..!");
			}
			else
			{
				alert("Record saved successfully..!");	
			}
			
			$("#txtPartySaveUpdate").val("0");
			getAddressInfoId();
			fetchPartyMasterAddressDetails();
		}
	});
}

function fetchPartyMasterAddressDetails() {
	var txtpartymasterId = $("#txtpartymastercode").val();
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
		}
	});
}


function EditpartyAddressdetails(id)
{
	//alert("ok id is"+id);
	$("#txtPartySaveUpdate").val("Update");
	var obj = $("#PartyAddressTableInfoList").html();
	objpartyaddress = JSON.parse(obj);
    var myAddrsObj = "";
    
    for ( var i = 0; i < objpartyaddress.ltinventorypartymasteraddressinfodto.length; i++) {
		if (objpartyaddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_id == id) {
			myAddrsObj = objpartyaddress.ltinventorypartymasteraddressinfodto[i];
			break;
		}
	}
    if(myAddrsObj.party_master_address_info_type == "BillingAddress")
    	{
    	   $("#iBillingAddress").prop('checked', true);
    	}
    else {
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
	var txtpartymasterId = $("#txtpartymastercode").val();
	//alert("party id:" + txtpartymasterId);
	var didConfirm = confirm("Are you sure to delete party address details?");
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
				alert("error");
			},
			success : function(r) {
				alert(r);
				fetchPartyMasterAddressDetails();
			}
		});
	}
}

function resetAddressInfoFields()
{	
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

}

/********************************************************new party master payment details******************************************************/
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
		+ "<td class='col-md-1 center'><button id='btnDelete' type='button' class='btn btn-xs btn-success' onclick=\"DeletePartyPaymentDetails({$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_id})\">"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";


function SavePartyMasterPaymentInfoDetails() 
{
	var txtpartymasterId = $("#txtpartymastercode").val();
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
	  bankname= document.getElementById("txtbankname");
     var bank = bankname.options[bankname.selectedIndex].value;
     var fileUp = $("#fileUp").val();
	  // alert(fileUp);
	   if(fileUp==null || fileUp==undefined || fileUp==""){
		   
		   fileUp="-";
	   }
    /* if(txtaccountname != "")
     {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(txtaccountname)) {
			alert("Payment Info:account name should be of alphabets only with a single space allowed..!");
			$("#txtaccountname").focus();
			return false;
		  }
     }*/
      
    /* if(txtifsc != "")
     {
    	 var pattern = /^([a-zA-Z0-9]+\s?)*$/;
    	  if (!pattern.test(txtifsc)) {
    		alert("Payment Info:IFSC/Branch should be of alphabets or digits only with a single space allowed..!");
    		$("#txtifsc").focus();
    		return false;
    	  }
     }
     */
     
 	
     if(txtaccountnumber != "")
     {
    	 var pattern = /^([0-9])*$/;
   	     if (!pattern.test(txtaccountnumber)) {
   		alert("Payment Info:account number should be of digits only!");
   		$("#txtaccountnumber").focus();
   		return false;
   	  }
     }
    
    /* if(txtpaymentterm !="")
	  {
		  var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	 	  if (!pattern.test(txtpaymentterm)) {
	 		alert("Payment Info:Payment term should be of alphabets and digits only with a single space allowed..!");
	 		$("#txtpaymentterm").focus();
	 		return false;
	 	  }
	  
	  
	  }*/
     
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
	 /* if(txtpaymentaddress != "")
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
	inputs.push('fileUp=' + fileUp);
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
			 $("#txtpaymentterm").val("");
	    	 $("#txtcreditterm").val("");
			 $("#txtbankname").val("");
			 $("#txtaccountname").val("");
			 $("#txtaccountnumber").val("");
			 $("#txtifsc").val("");
			 $("#txtcity").val("");
		     $("#txtpaymentaddress").val("");
		   var txtPartySaveUpdate = $("#txtPartySaveUpdate").val();
		   if(txtPartySaveUpdate =="Update")
			   {
			   alert("Record Updated successfully..!");
			   }
		   else
			   {
			   alert("Record saved successfully..!");
			   }
		   
		   $("#txtPartySaveUpdate").val("0");
			
			 getPaymentInfoId();
			 fetchPartyMasterPaymentDetails();
		}
	});
}

function fetchPartyMasterPaymentDetails() {
	var txtpartymasterId = $("#txtpartymastercode").val();
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
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//alert(r);
			counterPartyPaymentInfo = 1;
		/*	$("#PaymentInfoTable").setTemplate(inventoryPartyPaymentInfoTemp);
			$("#PaymentInfoTable").processTemplate(pobj1);*/
			$("#uploddtable").setTemplate(inventoryPartyPaymentInfoTemp2);
			$("#uploddtable").processTemplate(pobj1);
			$("#PartyPaymentInfoTableList").html(r);
		}
	});
}

var inventoryPartyPaymentInfoTemp2 = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
	+ "<thead class='cf' style='background: white;'>"
	+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div> Name</div></th>"
	+ " </tr></thead>"
	+ "{#foreach $T.ltinventorypartymasterpaymentinfo as ltinventorypartymasterpaymentinfo}"
	+ "<tr>"
	+ "<td class='col-md-1 center table-bordered' id='id{$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_id}'>{counterPartyPaymentInfo++}</td>"
	+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltinventorypartymasterpaymentinfo.party_master_payment_info_id}'>" 

	+ "<a href='InvUploadImg?fileName={$T.ltinventorypartymasterpaymentinfo.inv_party_master_filename}' style='color:black;'>{$T.ltinventorypartymasterpaymentinfo.inv_party_master_filename}</a>"
	+ "</td>"
    +"</tr>{#/for}</table>";
function EditpartyPaymentdetails(id)
{
	//alert("ok id is"+id);
	var obj = $("#PartyPaymentInfoTableList").html();
	$("#txtPartySaveUpdate").val("Update");
	objpartypayment = JSON.parse(obj);
    var myPaymentObj = "";
    
    for ( var i = 0; i < objpartypayment.ltinventorypartymasterpaymentinfo.length; i++) {
		if (objpartypayment.ltinventorypartymasterpaymentinfo[i].party_master_payment_info_id == id) {
			myPaymentObj = objpartypayment.ltinventorypartymasterpaymentinfo[i];
			break;
		}
	}
    
     $("#txtpaymentterm").val(myPaymentObj.party_master_payment_info_tem);
	 $("#txtcreditterm").val(myPaymentObj.party_master_payment_info_credit_term);
	 $("#txtbankname").val(myPaymentObj.party_master_payment_info_bank_name);
	 $("#txtaccountname").val(myPaymentObj.party_master_payment_info_account_name);
	 $("#txtaccountnumber").val(myPaymentObj.party_master_payment_info_account_number);
	 $("#txtifsc").val(myPaymentObj.party_master_payment_info_ifsc);
	 $("#txtcity").val(myPaymentObj.party_master_payment_info_city);
     $("#txtpaymentaddress").val(myPaymentObj.party_master_payment_info_address);
	 $("#txtpaymentid").val(id);


}


function DeletePartyPaymentDetails(paymentId) {
	//alert("contct id is:" + paymentId);
	var txtpartymasterId = $("#txtpartymastercode").val();
	//alert("party id:" + txtpartymasterId);
	var didConfirm = confirm("Are you sure to delete pyament details?");
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
				alert("error");
			},
			success : function(r) {
				alert(r);
				fetchPartyMasterPaymentDetails();
			}
		});
	}
}

function resetPaymentInfoFields()
{	
	 $("#txtpaymentterm").val("");
	 $("#txtcreditterm").val("");
	 $("#txtbankname").val("");
	 $("#txtaccountname").val("");
	 $("#txtaccountnumber").val("");
	 $("#txtifsc").val("");
	 $("#txtcity").val("");
     $("#txtpaymentaddress").val("");
}



//by tk for state list
var StateListTempInv = "<option value='0'>-SELECT-</option>{#foreach $T.stateList as stateList"
	+ "}<option value='{$T.stateList.state_id}'>{$T.stateList.state_name}</option>{#/for}";

function fetchStateListForRegInv(StateType) {
	var inputs = [];
	inputs.push('action=fetchStateList');
	
	inputs.push('StateType=' + encodeURIComponent(StateType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			
			var obj = eval('(' + ajaxResponse + ')');
	
				$("#txtaddrstate").setTemplate(StateListTempInv);
				$("#txtaddrstate").processTemplate(obj);

		}
	});
}
function ReadDocuments(rowNumber) {
	var doc = $("#desc"+rowNumber).text();
//	var note = $("#hiddenDocnote"+rowNumber).val();
	$('#viewDocModal').modal('show');
	$('#ViewDocumemnt').attr("src","InvUploadImg?fileName="+doc);
	//$('#documentComment').html(note);
}
function uploadInventroryItem() {
	jQuery(document)
			.ready(
					function() {
						$('input[type="file"]')
								.ajaxfileupload(
										{
											'action' : 'UploadFileServlet',
											'onComplete' : function(response) {
												var fileName = document
														.getElementById("fileUp").files[0].name;
												
												/*$('#upload').hide();
												$('#message').show();*/
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
													$('#patImg1').attr(
															'src',
															'pharmacy/pharmacy/readImage?url='
																	+ fileName);
													$('#patImg1').attr('value',
															fileName);
												}
											},
											'onStart' : function() {
												/*$('#upload').show();
												$('#message').hide();*/
											}
										});
					});};