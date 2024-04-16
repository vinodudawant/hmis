var rowCount = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;
var minLen;
var maxLen;

function getNextPurInvoiceId() {
	var inputs = [];
	inputs.push('action=getQuotationNextId');
	inputs.push('tableName=inv_purchase_invoice_master');
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
			//alert(r);
			$("#txtPurchaseQuotationDocNo").val(r);
		}
	});
}
/*function fetchDocumentNameList() {
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
			alert("error");
		},
		success : function(r) {
			$('#AjaxResopnse').html(r);
			pobj1 = eval('(' + r + ')');
			// alert(r);
			$("#selDocName").setTemplate(selInventoryDocumentTemplate);
			$("#selDocName").processTemplate(pobj1);

		}
	});
}
var selInventoryDocumentTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
		+ "<option  value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
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

}*/

//AutoSuggestion Code.............

function setSupplierNameForNewInvoice(inputID, type) {

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
						alert('error');
					},
					success : function(r) {
						// alert("r.length>>" + r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

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
			$('#txtVendorCodePO').val(item.value);
			
			
				//alert("Id=" + item.value + " Value=" + item.text);
				var masterID = item.value;
			   // alert(masterID);
				
				fetchPartyMasterContactsDetailsPO(masterID);
				fetchPartyMasterAddressDetailsPO(masterID);
				fecthPartyOtherInfoPO(masterID);
				fetchPartyMasterGeneralDetailsPO(masterID);
		}
	}
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
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtotheridPO").val(r);
		}
	});
}


function fecthPartyOtherInfoPO(partyMasterID)
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
		 
		    $("#txtotheridPO").val(myOtherObj.party_master_other_info_id);
			$("#txttopicPO").val(myOtherObj.party_master_other_info_topic);
			$("#txtfilePO").val(myOtherObj.party_master_other_info_file);
			$("#txtdescriptionPO").val(myOtherObj.party_master_other_info_description);
	     }	 
	 
       });
 
}



/** ******* AutoSuggestion Code for item  modified @Date 17june2016 ********** */

/*function auto(inputID, typeauto) {

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
						alert('error');
					},
					success : function(r) {
						// alert(r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								availableTags
										.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
												+ "_"
												+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
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
			var currentcode = item.value;

			$('#txtPurchaseQuotationItemNumber' + idValue).val(currentcode);

			var inputs = [];
			inputs.push('action=fetchItemIdDetail');
			inputs.push('itemId=' + item.value);
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
							// alert(r);
							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								// alert(ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_Supplier_Name+"_"+ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_doc_no);
								$('#txtPurchaseQuotationUnitPrice' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_unit_price);
								$('#txtPurchaseQuotationFactor1' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_uom_factor1);
								$('#txtPurchaseQuotationFactor2' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_uom_factor2);
								$('#txtPurchaseQuotationFactor3' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_uom_factor3);
								$('#txtPurchaseQuotationFactor4' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_uom_factor4);
								$('#txtPurchaseQuotationBatchNo' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_batch_No);
								$('#txtPurchaseQuotationDocQuantity' + idValue);
								$('#txtPurchaseQuotationActualQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
							   

							}
						}
					});

		}
	}
}
*/

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
								$("#txtcontactcode")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_id);
								$("#txtcontactperson")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_name);
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
								$("#txtcontactmobile")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_mobile);
								$("#txtemail")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_email);
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
								$("#txtaddressinfocode")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_id);
								$("#txtaddressdesignation")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_designation);
								$("#txtadraddress")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_address);
								$("#txtstreet")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_street);
								$("#txtarea")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_area);
								$("#txtaddrcity")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_city);
								$("#txtaddrpin")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_pin);
								$("#txtaddrstate")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_state);
								$("#txtaddrcountry")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_country);

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

function fetchPurchaseQuotationMasterNew() {
	var inputs = [];
	inputs.push('action=fetchPurchaseCommonMasterDetail');
	inputs.push('isEdit=no');
	inputs.push('partyId=undefined');
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
			pobj1 = eval('(' + r + ')');
			$("#documentContent").setTemplate(inventoryPurchaseQuotationTemp);
			$("#documentContent").processTemplate(pobj1);

			$("#docuemntAjaxResp").html(r);
		}
	});
}

 

function purchaseQuatViewRefresh() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	//$('#Sales_Quotation_Form').find('input:hidden').val('');
	$("#ItemInfoTable > tbody").html('');
	$('#ItemInfoTable').find('input:text').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	isNew = 1;

}
/** ***************** view on get grn for purchase Invoice Author :Sudhir Modified Date:24:11:2015 ****************** */

function viewPurchaseMasterDetails(partyId) {
	purchaseQuatViewRefresh();
	$("#closeonclick").hide();
	$('#hidePIsaveBtn').css('display','block');
	
	$('#divtxtpurINvoicewithoutGRN').css('display','none');
	$('#divtxtAddtostock').css('display','none');
	var obj = $("#docuemntAjaxRespGRNMaster").html();
//alert(obj);
	var objPurchase = JSON.parse(obj);
	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no == partyId) {

			//var txtPurchaseQuotationDocNo = $("#txtPurchaseQuotationDocNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no);
			/**********************************date convert***************************************/	
			/*var str=(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_date).split("-");
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];
			$("#txtPurchaseQuotationDate1").val(leaddate);*/
			/*var txtPurchaseQuotationDate1 = $("#txtPurchaseQuotationDate1")
					.val();*/
			var txtPurchaseQuotationMobileNo = $(
					"#txtPurchaseQuotationMobileNo")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_mobile_number);

			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO')
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Id);

			var txtPurchaseQuotationSupplierName = $(
					"#txtPurchaseQuotationSupplierName")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Name);
		 
			var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;
			var txtPurchaseQuotationReferenceNo = $(
					"#txtPurchaseQuotationReferenceNo")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_reference_no);
			var txtPurchaseQuotationAddress = $("#txtPurchaseQuotationAddress")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Address);
			var sclPurchaseQuotationDocstatus = $(
					"#sclPurchaseQuotationDocstatus")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_status);
			var txtPurchaseQuotationTotalDocDiscount = $(
					"#txtGRNTotalDocDiscount")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_total_discount);
			var txtPurchaseQuotationTotalDocQty = $(
					"#txtGRNTotalDocQty")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_total_doc_qty);
			
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderRequestNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_batch_Request_No);		
			
			var txtPurchaseGrnNo = $("#txtPurchaseGrnNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no);
		 
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderQuatationNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_batch_order_No_fk);
			
			var txtPurchaseQuotationDeliveryDate = $("#txtPurchaseQuotationDeliveryDate")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_purchase_delivery_date);
			
			$("#txtSplDisc").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_special_disc);
			$("#txtdebitAmt1").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_debit_amt);
			$("#txtCD1").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_cash_amt_perct);
			$("#txtCDAmt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_cash_amt_rupees);
			
			$("#txtOctroi").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_octroi_amt);
			$("#txtSurcharge").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_surcharge_amt);
			$("#txtCreditAmt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_credit_amt);
			$("#txtFreight").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_freight_amt);
			
			$("#txtVat").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_calcuated_vat_amt);
			$("#txtlbt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_lbt_amt);
			$("#txtcst").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_cst_amt);
			$("#txtExVat").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_ex_vat_amt);
			
			$("#txtTotalVat").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_calcuated_total_taxes_amt).toFixed(2));
			$("#txtGross").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_total_base_gross_amt).toFixed(2));
			$("#txtLess").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_total_less_amt).toFixed(2));
			$("#txtAdd").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_total_add_amt).toFixed(2));
			
			$("#textVat").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_final_calcuated_total_taxes_amt).toFixed(2));
			$("#txtNetAmt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_final_total_net_amt);

			//add by paras for edit supplier state	 
			if(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState == 0 || objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState ==null || objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState==undefined ){
				 
			}else{
				 $("#hoseditState").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState);
				 state = objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState;
			}
			//end
			
			var selboxChargeswithAmtList = objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_special_charges;

			if (selboxChargeswithAmtList == "No" || selboxChargeswithAmtList == null
				|| selboxChargeswithAmtList == ''|| txtChargesList == "-Select-" || txtChargesList == "Select") {
			$("#selboxChargeswithAmtList option").text(selboxChargeswithAmtList);
		} 
			else {
			$("#selboxChargeswithAmtList option").remove();
			var Finalrateandtax = selboxChargeswithAmtList.split(",");

			for ( var i = 0; i < Finalrateandtax.length; i++) {
				var chargeNamewithRate = Finalrateandtax[i];
				var option = "";
				option = option + "<option value=" + chargeNamewithRate + ">"
						+ chargeNamewithRate + "</option>";

				$("#selboxChargeswithAmtList").append(option);
			}

		}
			
		$("#sumofCharges").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_sumofspecial_charges.toFixed(2));
			
			break;

		}
	}

	var masterID = $('#txtVendorCodePO').val();
	fetchhospitalstate();
	fetchPartyMasterContactsDetailsPO(masterID);
	fetchPartyMasterAddressDetailsPO(masterID);
	fecthPartyOtherInfoPO(masterID);
	
	var ck = $('#txtVendorCode').val();
	$('#txtVendorCode').val(ck);
	var inputs = [];
	inputs.push('action=fetchGrnBatchStocDetail');
	inputs.push('isEdit=no');
	inputs.push('partyId=' + partyId);
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
					pobj1 = eval('(' + r + ')');
					//alert(r);
					//fetchPurchaseQuotationMasterNew();
					srNumber = 1;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
						$("#ItemInfoTable > tbody")
						.append(
								"<tr id='deleterow"
										+ srNumber
										+ "'> <td> <input type='checkbox'  name='checkbox"
										+ srNumber
										+ "' id='checkbox"
										+ srNumber
										+ "'/></td> <td>"
										+ srNumber
										+ "</td>"
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left; width:200px;' class=''  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_item_name
										+ "'  onkeyup = 'auto(this.id,onchange)' onkeypress='return validateOnlyName(event);'  readonly=''/> "
										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_code
										+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_id
										+ "'/> </div> </td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_fixed_item_qty
										+ "'  onblur='totalAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' > <lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +" </label></td> "
										+ "<td><input readonly='' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_rate
										+ "' onkeypress='return validateNumbers(event);' style='width:50px;'></td>"
										+ ""
										+ " <td><input readonly='' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_per
										+ "' onblur='calculTradeDis(this.id,"
										+ srNumber
										+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")'  onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_rupess
												+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td>"
										+ " <td><input readonly='' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_discount_amount
										+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:50px;'></td>"
										+ "<td><input readonly='' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_base_amount
										+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:60px;'></td>"
									/*	+ " <td><select class='form-control input-SmallText' style='width:160px;'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_code +"</option>  </select></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' readonly=''></td>"*/
										+ "<td><input type='text'  style='width:100px;' class='typeahead form-control input-SmallText' onkeyup='autotaxCodeGrn(this.id,onchange)' id='txtPurchaseQuotationTaxCode_"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
										+ "' ></td>"
										+ "<td><input type='text'  style='width:100px;' class='typeahead form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
										+ "'  onkeyup='autotaxCodeGrn(this.id,onchange)'></td>"
                                        +  "<td><input type='text' style='width:100px;' class='form-control input-SmallText' id='txtPurchaseInvoiceTaxAmntinRs"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess
										+ "' readonly='' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_amount
										+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:60px;'></td>"
										+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor1
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor2
										+ "' onkeypress='return validateNumbers(event);' readonly='' ><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
										+ "<td><input readonly='' type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor3
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +" </label></td>"
										+ " <td><input type='text' readonly='' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor4
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
										+ " <td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_fixed_item_qty
										+ "' onblur='pendingAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);'  ></td> "
										+ "<td><input type='text' readonly=''  readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock__item_pending_qty
										+ "' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text'  readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_code
										+ "'  ></td>"
										+ "  <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ srNumber
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_mfg_date
										+ "' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ srNumber
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;;'value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_exp_date
										+ "' > </td> </tr>");
						

						/*var state = $("#txtSupplierState").val();*/
						var batchstateid= parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].txtstateid);
						var appendpo= parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].txtPurchaseAppPO);
						var hostate = $("#hosState").val();
					 	if(batchstateid > 0){
		             		if(batchstateid ==hostate || batchstateid == hostate || batchstateid == hostate)
							{
								
								
								//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
		             			$("#txtPurchaseQuotationTaxAmount"+srNumber).hide();
								//$("#txtGRNTaxIGSTPercent"+idValue).val(sumofRate);
								//totalAmount();
							}else{
								
								$("#txtPurchaseQuotationTaxCode_"+srNumber).hide();
							
								}
		             	}else{
		             		if(state ==hostate || state == hostate || state == hostate)
							{
								
							
								$("#txtPurchaseQuotationTaxAmount"+srNumber).hide();
							
							}else{
								
								$("#txtPurchaseQuotationTaxCode_"+srNumber).hide();
							//	$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
								}
		             	}
					
						
						
					/*	var state = $("#txtSupplierState").val();
						if(state =="MAHARASHTRA" || state == "Maharashtra" || state == "maharashtra")
						{
						
							$("#txtPurchaseQuotationTaxAmount"+srNumber).hide();
							
							//totalAmount();
						}else{
							
							$("#txtPurchaseQuotationTaxCode_"+srNumber).val("0.0");
						
							}*/
				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
					}
					auto("txtPurchaseQuotationItemName_","onload");
					totalDocQtyPQ();
					totalDocDiscountPQ();

					//var txtEmptyItem = $("#txtEmptyItem").val();
					//auto(txtEmptyItem, "onload");

					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				}
			});
	getNextPurInvoiceId();
	getNextPayId();
	getSeries(($('#seriesId').val()));
	$("#txtCashAmount").val(0);
	$("#txtAmountCredit").val(0);
	
}
function deletePurchaseMasterDetails(id) {
	var didConfirm = confirm("Are you sure to delete?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePurchaseCommonDetail');
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
				fetchPurchaseQuotationMasterNew();
			}
		});
	}
}

var inventoryPurchaseQuotationTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
		+ "<thead class='cf' style='background: white;'><tr>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Invoice Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}<tr>"
		+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_form_Name == 'PURCHASE INVOICE' && $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_status!='Closed'  && $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_status!='Cancelled'}<td id='id{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}</td><td id='desc{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_Supplier_Name}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewPurchaseMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deletePurchaseMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no})\"><i class='fa fa-edit'></i></button></td</tr>{#/if}{#/for}</table>"

function refreshPopUp() {
	
	  window.location.reload("inventory_Purchase_Invoice.jsp");
	
	

}


function clearPopUp() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
//	getNextQuotationId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');

}


/*function totalAmount(id,rowCount)
{
	var quantity=$('#'+id).val();
	
	var rate=$('#txtPurchaseQuotationUnitPrice'+rowCount).val();
	$('#txtPurchaseQuotationActualQuantity'+rowCount).val('0');
	$('#txtPurchaseQuotationPendingQuantity'+rowCount).val(quantity);
	$('#txtPurchaseQuotationBaseAmount'+rowCount).val(quantity*rate);

}*/

/*** modified @Date:16june2016 @Author :sudhir reson:make item qty and Actual qty Equal ***/
function totalAmount(id, rowCount) {
	// alert(id);
	var quantity = $('#' + id).val();

	var PQ ="PurchaseQuotation";
	calculateFactoring(quantity,rowCount,PQ);
	
	var rate = $('#txtPurchaseQuotationUnitPrice' + rowCount).val();

	$('#txtPurchaseQuotationActualQuantity' + rowCount).val(quantity);
	$('#txtPurchaseQuotationBaseAmount' + rowCount).val(quantity * rate);

	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();

	for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#txtPurchaseQuotationDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#txtGRNTotalDocQty").val(sum);
	totalGrossAmt(1,rowCount);
}
/*function pendingAmount(id,rowCount)
{
	
	var actualquantity=$('#'+id).val();
	var quantity=$('#txtPurchaseQuotationDocQuantity'+rowCount).val();
	if(actualquantity>quantity)
	{
		alert("Plz enter valid quantity");
	}
	else{
		$('#txtPurchaseQuotationPendingQuantity'+rowCount).val(quantity - actualquantity);
	}
 
	

}*/


function getPendingGRNforInvoice() {
	var inputs = [];
	inputs.push('action=getPendingGRNforPurInvoice');
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
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//alert(r);
			$("#txtPurchaseGRNList").setTemplate(selInventoryPendingGRNforpurInvoice);
			$("#txtPurchaseGRNList").processTemplate(pobj1);
		}
	});
}


var selInventoryPendingGRNforpurInvoice = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}"
	
	+ "{#if $T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_form_Name == 'GRN' && $T.ltinvetorypurchasecommonmaster.txtagchallan=='N'}" +
			"<option  value='{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_Series}</option>"
	+ "{#/if}{#/for}";




/************** Adding row dynamically in table ****************/


function toCreateDivPurchaseInvoice() {

	if (test > 0 && isNew > 0) {
		if (rowCount == 1) {

			rowCount = test;

		}

		rowCount++;

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
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id"
								+ rowCount
								+ ",onchange)' onkeypress='return validateOnlyName(event);'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowStatus"
								+ rowCount
								+ "' onkeypress='return validateOnlyName(event);'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount + "' value=''></td> " +
										"<td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload");

	} else {
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
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id"
								+ rowCount
								+ ",onchange)' onkeypress='return validateOnlyName(event);' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount
								+ "' onkeypress='return validateOnlyName(event);' ></td>"
								+ " <td><input type='text' readonly='readonly'  class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> <td><input type='text'  readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
	auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
		rowCount++;
	}

}

/************** Remove  row dynamically in table for purchase Invoice @Date 15April2016****************/
/*
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
			$("#RowCount").val(temp);
		}
		p++;
	}
	isNew = 1;
	 
	//totalAmount();
	totalDocQtyPQ();
	totalDocDiscountPQ();
}
*/
	/******************************************featch grn master Details**********************************************/
/*function fetchGRNMasterDetails() {
	var inputs = [];
	inputs.push('action=fetchGRNMasterDetail');
	inputs.push('isEdit=no');
	inputs.push('partyId=undefined');
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
			//  alert(r);
			pobj1 = eval('(' + r + ')');
			//$("#documentContentGRNMaser").setTemplate(inventorypurchaseinvoicetemp);
			$("#documentContentGRNMaser").processTemplate(pobj1);
			$("#docuemntAjaxRespGRNMaster").html(r);
		}
	});
}*/

function fetchpurchaseInvoiceforSearch(mrnId) {
	//alert(mrnId);
var byVendorName = $("#byVendorName").val();
	
	if((mrnId == "")&&(byVendorName == ""))
	{
		alert("Please Enter Either Invoice Id or Vendor Name for search");
		return false;
	}
		var inputs = [];
		inputs.push('action=fetchPurchaseInvoiceasterDetail');
		inputs.push('isEdit=yes');
		inputs.push('partyId=' + mrnId);
		inputs.push('VendorName=' + byVendorName);

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
				SrNo=1;
				objMRN = JSON.parse(r);
				if (objMRN.ltinvetorypurchasecommonmaster.length > 0) {

					$("#documentContentPurchaseInvoiceMaseter").setTemplate(inventorypurchaseinvoicetemp);
					$("#documentContentPurchaseInvoiceMaseter").processTemplate(pobj1);

				//	$("#docuemntAjaxResp").html(r);

				} else {
					alert("Record not found..!");
					fetctchPurchaseInvoiceMasterDetails();
					}
				$('#byMrnId').val("");
				$('#byVendorName').val("");
				
			}
		});
	}

var SrNo =1;
/**************************Tamplet variable for set purchase Invoice Master Details*************************************************/ 
var inventorypurchaseinvoicetemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
	+ "<thead class='cf' style='background: white;'><tr>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-2 center'><div> Invoice Number</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th> </tr> </thead>"
	+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}<tr class='center'>"
	+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_form_Name == 'PURCHASE INVOICE'}<td>{SrNo++}</td><td id='id{$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no}</td><td id='desc{$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_Supplier_Name}</td>"
	+ "{#if $T.ltinvetorypurchasecommonmaster.dispatchflag == 'N'}"
	+ "<td>" 
	+ "<button id='btnEdit2' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewPurInvoiceMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no})\" value='EDIT'><i class='fa fa-edit'></i></button>"
	+ "</td>"
	+"{#/if}"
	+ "{#if $T.ltinvetorypurchasecommonmaster.dispatchflag == 'Y'}"
	+ "<td>" 
	+ "<button id='btnEdit2' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewPurInvoiceMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no})\" value='EDIT' disabled><i class='fa fa-edit'></i></button>"
	+ "</td>"
	+"{#/if}"
    + "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deleteGRNMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no})\" disabled><i class='fa fa-trash-o'></i></button></td><td><button id='btnEdit2' class='btn btn-xs btn-success' type='button' data-toggle='modal'   onclick=\"printPurInvoiceMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no})\" value='EDIT'><i class='fa fa-print'></i></button></td></tr>{#/if}{#/for}</table>";


	
	
	
	/***************************************************************print purchase Invoice Details Author :sudhir modified date :17:12:2015 ***************************************/
	function printPurInvoiceMasterDetails(partyId)
{

	var obj = $("#docuemntAjaxRespPurchaseInvoiceMaster").html();

	var objPurchase = JSON.parse(obj);

	var myObj = "";

	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_no == partyId) {
			
			myObj = objPurchase.ltinvetorypurchasecommonmaster[rowCount];
			break;
			
		}
	}
			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val(myObj.inv_purchase_invoice_master_Supplier_Id);
	 		var txtPurchaseQuotationDocSeries = $("#txtPurchaseQuotationDocSeries").val(myObj.inv_purchase_invoice_master_doc_Series);
	 		var txtPurchaseQuotationDeliveryDate = $("#txtPurchaseQuotationDeliveryDate").val(myObj.inv_purchase_invoice_master_delivery_date);
	 		
	 		var txtVendorCode = $("#txtVendorCodePO").val();
	 	    var txtpurchaseInvoiceDocSeries =  $("#txtPurchaseQuotationDocSeries").val();
	 	   var txtPurchaseQuotationDeliveryDate = $("#txtPurchaseQuotationDeliveryDate").val();
	 		 
	 		/*window.location.replace("Inventory_purchase_invoice_print.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtpurchaseInvoiceDocSeries="+txtpurchaseInvoiceDocSeries +"&txtPurchaseQuotationDeliveryDate="+txtPurchaseQuotationDeliveryDate);*/
	 	  window.open("Inventory_purchase_invoice_print.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtpurchaseInvoiceDocSeries="+txtpurchaseInvoiceDocSeries +"&txtPurchaseQuotationDeliveryDate="+txtPurchaseQuotationDeliveryDate);
	
} 
	
	
	
/******* fetch purchase Invoice master Details modified @date:9june2016 A**********/
function fetctchPurchaseInvoiceMasterDetails() {
	var inputs = [];
	inputs.push('action=fetchPurchaseInvoiceasterDetail');
	inputs.push('isEdit=no');
	inputs.push('partyId=undefined');
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
			$("#documentContentPurchaseInvoiceMaseter").setTemplate(inventorypurchaseinvoicetemp);
			$("#documentContentPurchaseInvoiceMaseter").processTemplate(pobj1);
			$("#docuemntAjaxRespPurchaseInvoiceMaster").html(r);

		/*	for ( var i = 1; i <= pobj1.ltinvetorypurchasecommonmaster.length; i++) {
				if(pobj1.ltinvetorypurchasecommonmaster[i].inv_purchase_invoice_master_form_Name == 'PURCHASE INVOICE' && pobj1.ltinvetorypurchasecommonmaster[i].dispatchflag=="Y"){
					
				}
				
			}
			*/
		}
	});
}

 

function purchaseQuatViewRefresh() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	//$('#Sales_Quotation_Form').find('input:hidden').val('');
	$("#ItemInfoTable > tbody").html('');
	$('#ItemInfoTable').find('input:text').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	isNew = 1;

}

/************** Total Doc Qty 14APril2016 ***********/

function totalDocQtyPQ() {
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

	$("#txtGRNTotalDocQty").val(sum);
	$("#RowCount").val(RowCount);

}


/************** Total Doc Discount ***********/

/*function totalDocDiscountPQ() {
	var sum = 0;
	var tradeAmt;
	var RowCount = $("#RowCount").val();

	for ( var i = 1; i <= RowCount; i++) {
		tradeAmt = $("#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
		if (tradeAmt == null || tradeAmt == undefined || tradeAmt == '') {
			var flag = 1;
		} else 
		{
			sum = (parseFloat(sum) + parseFloat(tradeAmt)).toFixed(2);;
		}

	}

	$("#txtPurchaseQuotationTotalDocDiscount").val(sum);
	$("#RowCount").val(RowCount);

}*/


/******************************************************new party MASTER FOR PURSHACE INVOICE**added in LIST*************************************************husen**/ 
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
			alert("error");
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
			alert("error");
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
			var txtPurchaseContractandAddress =	$("#txtPurchaseContractandAddress").val();
			if(txtPurchaseContractandAddress == "Update")
				{
				alert("Record Update successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			$("#txtPurchaseContractandAddress").val('0');
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
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			// alert(r);
			counterPartyContactInfoPO = 1;
			$("#ContactInfoTablePO").setTemplate(inventoryPartyContactInfoTempPO);
			$("#ContactInfoTablePO").processTemplate(pobj1);
			$("#PartyContactTableInfoListPO").html(r);
			
			/*********************************************** featch address and mobile no for suppler name In Grn Date:24/6/2015 Author :sudhir ***********************************/
			/*var obj = $("#PartyContactTableInfoListPO").html();
			var objPurchase = JSON.parse(obj);
			for(var row =0 ;row < objPurchase.ltinventorypartymastrecontactinfodto.length;row ++  )
			{
			$("#txtPurchaseQuotationMobileNo").val(objPurchase.ltinventorypartymastrecontactinfodto[row].party_contact_info_phone_number1);
			break;
			} */
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
		}
	});
}

function EditPartyContactsDetailsPO(id) {
	$("#txtPurchaseContractandAddress").val("Update");
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
	/*var str = (myobj.party_contact_info_dob).split("-");
	var bdate = str[2] + "-" + str[1] + "-" + str[0];*/
	$("#txtdatePO").val(myobj.party_contact_info_dob);

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
	var didConfirm = confirm("Are you sure to delete?");
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
				alert("error");
			},
			success : function(r) {
				alert(r);
				fetchPartyMasterContactsDetailsPO();
			}
		});
	}
}

function resetContactInfoFieldsPO()
{	
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
			alert("error");
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
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Company</div></th>"
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


function SavePartyMasterAddressInfoDetailsPO() 
{
	var txtpartymasterId = $("#txtVendorCodePO").val();
	//alert(txtpartymasterId);
	var txtaddressinfocode = $("#txtaddressinfocodePO").val();
	//alert(txtaddressinfocode);
	var radioBtn = null;
	if ($('#iBillingAddressPO').is(":checked") == true) {
		
		  radioBtn = $("#iBillingAddressPO").val();
	} 
	if($('#iShippingAddressPO').is(":checked") == true)
	{
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
}*/



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
			$("#txtaddresscompanyPO").val("");
			$("#txtadraddressPO").val("");
			$("#txtstreetPO").val("");
			$("#txtareaPO").val("");
			$("#txtaddrcityPO").val("");
			$("#txtaddrpinPO").val("");
			$("#txtaddrstatePO").val("");
			$("#txtaddrcountryPO").val("");
			
			var txtPurchaseContractandAddress =	$("#txtPurchaseContractandAddress").val();
			if(txtPurchaseContractandAddress == "Update")
				{
					alert("Record Update successfully..!");
				}
			else
				{
					alert("Record saved successfully..!");
				}
			$("#txtPurchaseContractandAddress").val('0');
			
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
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//alert(r);
			counterPartyAddressInfoPO = 1;
			$("#AddressInfoTablePO").setTemplate(inventoryPartyAddressInfoTempPO);
			$("#AddressInfoTablePO").processTemplate(pobj1);
			$("#PartyAddressTableInfoListPO").html(r);
			
			
			/*********************************************** featch address and mobile no for suppler name In Grn Date:24/6/2015 Author :sudhir ***********************************/
			var obj = $("#PartyAddressTableInfoListPO").html();
			var objPurchase = JSON.parse(obj);
			for(var row=0 ;row < objPurchase.ltinventorypartymasteraddressinfodto.length;row ++  )
			{
			$("#txtPurchaseQuotationAddress").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
		//	$("#txtSupplierState").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_state);

			break;
			} 
			/*************************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
			fetchStateListForRegInvPO(objPurchase);
		}
	});
	
}


function EditpartyAddressdetailsPO(id)
{
	//alert("ok id is"+id);
	$("#txtPurchaseContractandAddress").val("Update");
	var obj = $("#PartyAddressTableInfoListPO").html();
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
    	   $("#iBillingAddressPO").prop('checked', true);
    	}
    else {
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
	var didConfirm = confirm("Are you sure to delete?");
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
				fetchPartyMasterAddressDetailsPO();
			}
		});
	}
}

function resetAddressInfoFieldsPO()
{	
	$("#txtaddresscompanyPO").val("");
	$("#txtadraddressPO").val("");
	$("#txtstreetPO").val("");
	$("#txtareaPO").val("");
	$("#txtaddrcityPO").val("");
	$("#txtaddrpinPO").val("");
	$("#txtaddrstatePO").val("");
	$("#txtaddrcountryPO").val("");
	$("#iShippingAddressPO").val("");
	
	$("#iShippingAddressPO").prop('checked', false);
    $("#iBillingAddressPO").prop('checked', true);
    getAddressInfoIdPurListPO();

}

var rowCount = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;

function getNextPurInvoiceId() {
	var inputs = [];
	inputs.push('action=getQuotationNextId');
	inputs.push('tableName=inv_purchase_invoice_master');
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
			//alert(r);
			$("#txtPurchaseQuotationDocNo").val(r);
		}
	});
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
			alert("error");
		},
		success : function(r) {
			$('#AjaxResopnse').html(r);
			pobj1 = eval('(' + r + ')');
			// alert(r);
			$("#selDocName").setTemplate(selInventoryDocumentTemplate);
			$("#selDocName").processTemplate(pobj1);

		}
	});
}
var selInventoryDocumentTemplate ="{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
		+"{#if $T.lstDocumentNUmberDto.document_series == 'Purchase Invoice'}"
		+ "<option id='seriesId' value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
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

//AutoSuggestion Code.............
/*
function setSupplierNameForNewInvoice(inputID, type) {

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
						alert('error');
					},
					success : function(r) {
						// alert("r.length>>" + r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

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
			$('#txtVendorCodePO').val(item.value);
			
			
				//alert("Id=" + item.value + " Value=" + item.text);
				var masterID = item.value;
			   // alert(masterID);
				
				fetchPartyMasterContactsDetailsPO(masterID);
				fetchPartyMasterAddressDetailsPO(masterID);
				//fecthPartyOtherInfoPO(masterID);
				
		}
	}
}*/

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
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtotheridPO").val(r);
		}
	});
}


function fecthPartyOtherInfoPO(partyMasterID)
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
		 
		    $("#txtotheridPO").val(myOtherObj.party_master_other_info_id);
			$("#txttopicPO").val(myOtherObj.party_master_other_info_topic);
			$("#txtfilePO").val(myOtherObj.party_master_other_info_file);
			$("#txtdescriptionPO").val(myOtherObj.party_master_other_info_description);
	     }	 
	 
       });
 
}



/** ******* AutoSuggestion Code for item ********** */

function auto(inputID, typeauto) {

	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

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
						alert('error');
					},
					success : function(r) {
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								availableTags
										.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
												+ "_"
												+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
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
			var currentcode = item.value;

			$('#txtPurchaseQuotationItemNumber' + idValue).val(currentcode);

			var inputs = [];
			inputs.push('action=fetchItemIdDetail');
			inputs.push('itemId=' + item.value);
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

							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								$('#txtPurchaseQuotationUnitPrice' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_unit_price);
								$('#txtPurchaseQuotationFactor1' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_uom_factor1);
								$('#txtPurchaseQuotationFactor2' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_uom_factor2);
								$('#txtPurchaseQuotationFactor3' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_uom_factor3);
								$('#txtPurchaseQuotationFactor4' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_uom_factor4);
								$('#txtPurchaseQuotationBatchNo' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_batch_No);
								$('#txtPurchaseQuotationDocQuantity' + idValue);
								

							}
						}
					});

		}
	}
}


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
								$("#txtcontactcode")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_id);
								$("#txtcontactperson")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_name);
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
								$("#txtcontactmobile")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_mobile);
								$("#txtemail")
										.val(
												objContact.ltinventorypartymastrecontactinfodto[i].party_contact_info_email);
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
								$("#txtaddressinfocode")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_id);
								$("#txtaddressdesignation")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_designation);
								$("#txtadraddress")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_address);
								$("#txtstreet")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_street);
								$("#txtarea")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_area);
								$("#txtaddrcity")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_city);
								$("#txtaddrpin")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_pin);
								$("#txtaddrstate")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_state);
								$("#txtaddrcountry")
										.val(
												objAddress.ltinventorypartymasteraddressinfodto[i].party_master_address_info_country);

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

function fetchPurchaseQuotationMasterNew() {
	var inputs = [];
	inputs.push('action=fetchPurchaseCommonMasterDetail');
	inputs.push('isEdit=no');
	inputs.push('partyId=undefined');
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
			$("#documentContent").setTemplate(inventoryPurchaseQuotationTemp);
			$("#documentContent").processTemplate(pobj1);

			$("#docuemntAjaxResp").html(r);
		}
	});
}

 

function purchaseQuatViewRefresh() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	//$('#Sales_Quotation_Form').find('input:hidden').val('');
	$("#ItemInfoTable > tbody").html('');
	$('#ItemInfoTable').find('input:text').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	isNew = 1;

}
 
function deletePurchaseMasterDetails(id) {
	var didConfirm = confirm("Are you sure to delete?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePurchaseCommonDetail');
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
				fetchPurchaseQuotationMasterNew();
			}
		});
	}
}

var inventoryPurchaseQuotationTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
		+ "<thead class='cf' style='background: white;'><tr>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Doc Number</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}<tr>"
		+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_form_Name == 'PURCHASE INVOICE' && $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_status!='Closed'  && $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_status!='Cancelled'}<td id='id{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}</td><td id='desc{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_Supplier_Name}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewPurchaseMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deletePurchaseMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no})\"><i class='fa fa-edit'></i></button></td</tr>{#/if}{#/for}</table>"

function refreshPopUp() {
	
	
	  window.location.reload("inventory_Purchase_Invoice.jsp");
	
	

}


function clearPopUp() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');

}


/*function totalAmount(id,rowCount)
{
	var quantity=$('#'+id).val();
	
	var rate=$('#txtPurchaseQuotationUnitPrice'+rowCount).val();
	$('#txtPurchaseQuotationActualQuantity'+rowCount).val('0');
	$('#txtPurchaseQuotationPendingQuantity'+rowCount).val(quantity);
	$('#txtPurchaseQuotationBaseAmount'+rowCount).val(quantity*rate);

}*/
/*function pendingAmount(id,rowCount)
{
	
	var actualquantity=$('#'+id).val();
	var quantity=$('#txtPurchaseQuotationDocQuantity'+rowCount).val();
	if(actualquantity>quantity)
	{
		alert("Plz enter valid quantity");
	}
	else{
		$('#txtPurchaseQuotationPendingQuantity'+rowCount).val(quantity - actualquantity);
	}
 
	

}*/


/*function getPendingGRNforInvoice() {
	var inputs = [];
	inputs.push('action=getPendingGRNforPurInvoice');
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
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//alert(r);
			$("#txtPurchaseGRNList").setTemplate(selInventoryPendingGRNforpurInvoice);
			$("#txtPurchaseGRNList").processTemplate(pobj1);
		}
	});
}*/


/*var selInventoryPendingGRNforpurInvoice = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}"
	
	+ "{#if $T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_form_Name == 'GRN'}" +
			"<option  value='{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_Series}</option>"
	+ "{#/if}{#/for}";*/




/************** Adding row dynamically in table ****************/


function toCreateDivPurchaseInvoice() {

	if (test > 0 && isNew > 0) {
		if (rowCount == 1) {

			rowCount = test;

		}

		rowCount++;

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
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id"
								+ rowCount
								+ ",onchange)' onkeypress='return validateOnlyName(event);'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowStatus"
								+ rowCount
								+ "' onkeypress='return validateOnlyName(event);'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount + "' value=''></td> " +
										"<td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload");

	} else {
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
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id"
								+ rowCount
								+ ",onchange)' onkeypress='return validateOnlyName(event);' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowStatus"
								+ rowCount
								+ "' onkeypress='return validateOnlyName(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount + "' value=''></td> <td><input type='text' readonly='readonly'  class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> <td><input type='text'  readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
	auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
		rowCount++;
	}

}

/************** Remove  row dynamically in table ****************/

/*function toRemoveDivStock(RowCount) {
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
			$("#RowCount").val(temp);
		}
		p++;
	}
	isNew = 1;
	 
	totalDocQtyPQ();
	totalDocDiscountPQ();
}*/

	/******************************************featch grn master Details**********************************************/
function fetchGRNMasterDetails() {
	var inputs = [];
	inputs.push('action=fetchGRNMasterDetail');
	inputs.push('isEdit=no');
	inputs.push('partyId=undefined');
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
			//  alert(r);
			pobj1 = eval('(' + r + ')');
			//$("#documentContentGRNMaser").setTemplate(inventorypurchaseinvoicetemp);
			$("#documentContentGRNMaser").processTemplate(pobj1);
			$("#docuemntAjaxRespGRNMaster").html(r);
		}
	});
}

/*function fetchpurchaseInvoiceforSearch(mrnId) {
	//alert(mrnId);
		if (mrnId == null || mrnId == "") {
			alert("Please Enter Invoice Id");
			$("#byMrnId").focus();
			return false;
		}
		var inputs = [];
		inputs.push('action=fetchPurchaseInvoiceasterDetail');
		inputs.push('isEdit=yes');
		inputs.push('partyId=' + mrnId);

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
				objMRN = JSON.parse(r);
				if (objMRN.ltinvetorypurchasecommonmaster.length > 0) {


					$("#documentContentPurchaseInvoiceMaseter").setTemplate(inventorypurchaseinvoicetemp);
					$("#documentContentPurchaseInvoiceMaseter").processTemplate(pobj1);

				//	$("#docuemntAjaxResp").html(r);

				} else {
					alert("Record not found..!");
					fetctchPurchaseInvoiceMasterDetails();
					}
				$('#byMrnId').val("");

			}
		});
	}
*/

/**************************Tamplet variable for set purchase Invoice Master Details*************************************************/ 
/*var inventorypurchaseinvoicetemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
	+ "<thead class='cf' style='background: white;'><tr>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Invoice Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th> </tr> </thead>"
	+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}<tr class='center'>"
	+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_form_Name == 'PURCHASE INVOICE'}<td id='id{$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no}</td><td id='desc{$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_Supplier_Name}</td>"
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewPurInvoiceMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
	+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deleteGRNMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no})\"><i class='fa fa-trash-o'></i></button></td><td><button id='btnEdit2' class='btn btn-xs btn-success' type='button' data-toggle='modal'   onclick=\"printPurInvoiceMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no})\" value='EDIT'><i class='fa fa-print'></i></button></td></tr>{#/if}{#/for}</table>"*/


	
	
	
	/***************************************************************print purchase Invoice Details***************************************/
/*	function printPurInvoiceMasterDetails(partyId)
{

	var obj = $("#docuemntAjaxRespPurchaseInvoiceMaster").html();

	var objPurchase = JSON.parse(obj);

	var myObj = "";

	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_no == partyId) {
			
			myObj = objPurchase.ltinvetorypurchasecommonmaster[rowCount];
			break;
			
		}
	}
			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val(myObj.inv_purchase_invoice_master_Supplier_Id);
	 		var txtPurchaseQuotationDocSeries = $("#txtPurchaseQuotationDocSeries").val(myObj.inv_purchase_invoice_master_doc_Series);
	 		
	 		var txtVendorCode = $("#txtVendorCodePO").val();
	 		 var txtpurchaseInvoiceDocSeries =  $("#txtPurchaseQuotationDocSeries").val();
	 		 
	 		window.open("Inventory_purchase_invoice_print.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtpurchaseInvoiceDocSeries="+txtpurchaseInvoiceDocSeries);
	
} 
	*/
	
	
/******************************************featch piurchase Invoice master Details**********************************************/
/*function fetctchPurchaseInvoiceMasterDetails() {
	var inputs = [];
	inputs.push('action=fetchPurchaseInvoiceasterDetail');
	inputs.push('isEdit=no');
	inputs.push('partyId=undefined');
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
			$("#documentContentPurchaseInvoiceMaseter").setTemplate(inventorypurchaseinvoicetemp);
			$("#documentContentPurchaseInvoiceMaseter").processTemplate(pobj1);
			$("#docuemntAjaxRespPurchaseInvoiceMaster").html(r);
		}
	});
}*/

/****** ******** saving operation of purchase Invoice*** Modifed @Date 20may2016 @author  Sudhir*****/
function savePurchaseInvoice() {
	
	

	var txtPurchaseFormName = $("#txtPurchaseFormName").val();
	 
	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();

	var txtPurchaseQuotationDocNo = $("#txtPurchaseQuotationDocNo").val();
	var txtPurchaseQuotationDate1 = $("#txtPurchaseQuotationDate1").val();				
	var txtPurchaseQuotationMobileNo = $("#txtPurchaseQuotationMobileNo").val();
	var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val();
	var txtPurchaseQuotationNotes2 = $('#txtPurchaseQuotationNotes2').val();
	var txtPurchaseQuotationSupplierName = $(
			"#txtPurchaseQuotationSupplierName").val();

	var selDocName = $("#selDocName option:selected").text();
	var txtPurchaseQuotationDocSeries = $("#txtPurchaseQuotationDocSeries").val();
	var txtPurchaseInvoiceDocSeriesIsEdit = $("#txtPurchaseInvoiceDocSeriesIsEdit").val();

	var txtPurchaseQuotationDeliveryDate = $("#txtPurchaseQuotationDeliveryDate").val();
	var txtDocSeries;

	if(txtPurchaseInvoiceDocSeriesIsEdit == 'isEdit')
	{
			txtDocSeries = txtPurchaseQuotationDocSeries;
	}
	else
	{
		var finaltxtPurchaseInvoiceDocSeries =txtPurchaseQuotationDocSeries +"No"+":"+txtPurchaseQuotationDocNo;
			txtDocSeries = finaltxtPurchaseInvoiceDocSeries;
			
	}
	var txtSupplierState = $("#txtSupplierState").val();
	if(txtSupplierState == 0){
		alert("Please Select Supplier State!!!");
		return false;
	}
	var txtPurchaseQuotationRequestNo =$("#txtPurchaseOrderRequestNo").val();
	
	var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo").val();
	
	
	
	var txtPurchaseQuotationReferenceNo = $("#txtPurchaseQuotationReferenceNo")
			.val();

	var txtPurchaseQuotationAddress = $("#txtPurchaseQuotationAddress").val();
	var sclPurchaseQuotationDocstatus = $("#sclPurchaseQuotationDocstatus")
			.val();
	var txtPurchaseQuotationAmountinlocalcurrency = $(
			"#txtGRNlocalcurrency").val();
	var txtPurchaseQuotationTotalDocDiscount = $(
			"#txtGRNTotalDocDiscount").val();

	var txtPurchaseQuotationTotalDocQty = $("#txtGRNTotalDocQty").val();
	
	//save all Charges @Date:8june2016
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
	
	
	/**** validation for charges @author:sudhir jadhav @Date:25OCT2016********/
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
		
	/****END validation for charges @author:sudhir jadhav @Date:25OCT2016 *********/
	
	
	
	
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
	
	var materiallist = {
		ltinvetorypurchasecommonitemmaster : []
	};
	
	//validation
	if(txtPurchaseQuotationDate1 == "" || txtPurchaseQuotationDate1 == null)
	{
	alert("Please select purchase invoice date ");
	$("#txtPurchaseQuotationDate1").focus();
	return false;
	}
	
	
	var txtPurchaseInvoicSaveOrUpdate =$("#txtPurchaseInvoicSaveOrUpdate").val();
	if(!(txtPurchaseInvoicSaveOrUpdate=='Update'))
		{
		if(txtPurchaseQuotationDate1)
		{
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
	    	/*alert("Please Enter Current Date ");
		    $("#txtPurchaseQuotationDate1").focus();
		   return false;*/
	    }
	   }
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
	$("#txtPurchaseQuotationMobileNo").focus();
	return false;
	}
	
	if(txtPurchaseQuotationSupplierName == "" || txtPurchaseQuotationSupplierName == null)
	{
		alert("Please enter supplier name");
		$("#txtPurchaseQuotationSupplierName").focus();
		return false;
	}
	
	 var docseries= $("#txtPurchaseQuotationDocSeries").val();
     if(docseries == 0 || docseries == '-Select-')
     {
	    alert('please select doc series');
		$("#txtPurchaseQuotationDocSeries").focus();
		return false;
     }
     
    /* if(txtPurchaseQuotationReferenceNo == "" || txtPurchaseQuotationReferenceNo == null)
 	{
 	alert("Please enter reference number");
 	$("#txtPurchaseQuotationReferenceNo").focus();
 	return false;
 	}*/
     
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
	    alert('Please Select Invoice Status');
		$("#sclPurchaseQuotationDocstatus").focus();
		return false;
     }
	for ( var i = 1; i <= totaltblsize; i++) {

		if ($("#txtPurchaseQuotationItemNumber" + i).val() != null
				&& $("#txtPurchaseQuotationItemNumber" + i).val() != undefined)
			{
			var txtPurchaseQuotationItemName = $(
					"#txtPurchaseQuotationItemNumber" + i).val();
			var txtPurchaseQuotationItemName_=$("#txtPurchaseQuotationItemName_" + i).val();
			 
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

			/*var txtPurchaseQuotationTaxCode_ = $("#txtPurchaseQuotationTaxCode_" + i).val(); */
			
			  var txtPurchaseQuotationTaxCode_ = "";
				$('#txtPurchaseQuotationTaxCode_'+ i).find('option').each(function() {
					txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
					
				});
				
				txtPurchaseQuotationTaxCode_= txtPurchaseQuotationTaxCode_.substring(0, txtPurchaseQuotationTaxCode_.length-1);
			  
			 var txtPurchaseQuotationTaxAmount = $("#txtPurchaseQuotationTaxAmount" + i).val();
			  if(txtPurchaseQuotationTaxAmount == "" || txtPurchaseQuotationTaxAmount == null){
					
					alert("Please enter item tax amount in "+i+" Row");
					$("#txtPurchaseQuotationTaxAmount" + i).focus();
					return false;
					
				}
			
						  
/***** adding valdation for tax amount@Date:25oct2016 @author: sudhir jadhav *****/	  
			  
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
			  
			  /*** END adding valdation for tax amount@Date:25oct2016 @author: sudhir jadhav *****/	
			  
			var txtPurchaseInvoiceTaxAmntinRs = $("#txtPurchaseInvoiceTaxAmntinRs" + i).val(); // Add Tax Amount in Rs @author:paras @Date:24nov
			
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
			var txtPurchaseMfgDate = $(
					"#txtPurchaseMfgDate_" + i).val();
			var txtPurchaseExpiryDate = $(
					"#txtPurchaseExpiryDate_" + i).val();
			 
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
				
			}
		   if(txtPurchaseQuotationUnitPrice == "" || txtPurchaseQuotationUnitPrice == null){
				
				alert("Please enter item unit price in "+i+" Row");
				$("#txtPurchaseQuotationUnitPrice" + i).focus();
				return false;
				
			}
		   var pattern = /^[0-9]+\.?[0-9]*$/;
			if (!pattern.test(txtPurchaseQuotationUnitPrice)) {
				alert("Unit price should be of digits and a decimal Point Only in "+i+" Row !");
				$("#txtPurchaseQuotationUnitPrice"+i).focus();
				return false;
			}
		   
			
		   if(txtPurchaseQuotationTrdeDiscountPercentage == "" || txtPurchaseQuotationTrdeDiscountPercentage == null){
				
				alert("Please enter item trade discount in "+i+" Row");
				$("#txtPurchaseQuotationTrdeDiscountPercentage" + i).focus();
				return false;
				
			}
		   
		   var pattern = /^[0-9]+\.?[0-9]*$/;
			if (!pattern.test(txtPurchaseQuotationTrdeDiscountPercentage)) {
				alert("Trade Discount should be of digits and a decimal Point Only in "+i+" Row !");
				$("#txtPurchaseQuotationTrdeDiscountPercentage"+i).focus();
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
		 /* if(txtPurchaseQuotationTaxCode_ == "" || txtPurchaseQuotationTaxCode_ == null){
				
				alert("Please enter item tax code in "+i+" Row");
				$("#txtPurchaseQuotationTaxCode_" + i).focus();
				return false;
				
			} */
		  
		
		  
		  if(txtPurchaseQuotationRowAmount == "" || txtPurchaseQuotationRowAmount == null){
				
				alert("Please enter item row amount in "+i+" Row");
				$("#txtPurchaseQuotationRowAmount" + i).focus();
				return false;
				
			}
		  
		  
		  
		 /* if((parseFloat(txtPurchaseQuotationFactor1)  == NaN || txtPurchaseQuotationFactor1 != '')){
			  
				var min = parseInt(minLen);
				var max = parseInt(maxLen);
			   
				// alert("number field");
				var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
				var value1 = txtPurchaseQuotationFactor1; //$('#' + id).val();
				
				if (min > value1.length || max < value1.length) {
					alert("Please Enter  txtPurchaseQuotationFactor1  Only number!");
					$('#' + id).focus();
					return false;
				} else if (value1 != "" && !name1.test(value1)) {
					alert("Please Enter  txtPurchaseQuotationFactor1  Only number!");
					
					$("#txtPurchaseQuotationFactor1" + i).val('');
					$("#txtPurchaseQuotationFactor1" + i).focus();
					
					//$('#' + id).val('');
					//$('#' + id).focus();
					return false;

				}
				return true;
			  
			   
				
				alert("Please enter valid item factor1 in "+i+" Row");
				$("#txtPurchaseQuotationFactor1" + i).focus();
				return false;
				
			}*/
		  /*if((parseFloat(txtPurchaseQuotationFactor2) == NaN )){
				
			    alert("Please enter valid item factor2 in "+i+" Row");
				$("#txtPurchaseQuotationFactor2" + i).focus();
				return false;
				
			}*/
		 
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
					
					$("#txtPurchaseQuotationFactor4" + i).val('');
					$("#txtPurchaseQuotationFactor4" + i).focus();
					return false;
				} else if (value1 != "" && !name1.test(value1)) {
					alert("Please enter valid item factor4 in "+i+" Row");
					$("#txtPurchaseQuotationFactor4" + i).val('');
					$("#txtPurchaseQuotationFactor4" + i).focus();
					return false;
				}
				//return true;
				
			}
		  
		  if(txtPurchaseQuotationActualQuantity == "" || txtPurchaseQuotationActualQuantity == null){
				
				alert("Please enter item order quantity in "+i+" Row");
				$("#txtPurchaseQuotationActualQuantity" + i).focus();
				return false;
				
			}
		  
		  if(txtPurchaseQuotationActualQuantity !==  txtPurchaseQuotationDocQuantity ){
				
				alert("order quantity and item quantity shoud be equal "+i+" Row");
				$("#txtPurchaseQuotationActualQuantity" + i).focus();
				return false;
				
			}
		  
		  if(txtPurchaseQuotationPendingQuantity == "" || txtPurchaseQuotationPendingQuantity == null){
				
				alert("Please enter item pending quantity in "+i+" Row");
				$("#txtPurchaseQuotationPendingQuantity" + i).focus();
				return false;
				
			}
		  /*if(txtPurchaseMfgDate == "" || txtPurchaseMfgDate == null){
				
				alert("Please select mfg date in "+i+" Row");
				$("#txtPurchaseMfgDate_" + i).focus();
				return false;
				
			}
		  if(txtPurchaseExpiryDate == "" || txtPurchaseExpiryDate == null){
				
				alert("Please select expiry date in "+i+" Row");
				$("#txtPurchaseExpiryDate_" + i).focus();
				return false;
				
			}*/

			materiallist.ltinvetorypurchasecommonitemmaster
					.push({

						inv_purchase_common_item_code : txtPurchaseQuotationItemName,
						inv_purchase_common_item_Name:txtPurchaseQuotationItemName_,
						inv_purchase_common_item_doc_Qty : txtPurchaseQuotationDocQuantity,
						inv_purchase_common_item_unit_price : txtPurchaseQuotationUnitPrice,

						inv_purchase_common_item_trade_discount_per : txtPurchaseQuotationTrdeDiscountPercentage,
						inv_purchase_common_item_trade_discount_rupess:txtPurchaseQuotationTrdeDiscountInRupess,
						inv_purchase_common_item_trade_discount_amount : txtPurchaseQuotationTrdeDiscountAmt,
						inv_purchase_common_item_trade_base_amount : txtPurchaseQuotationBaseAmount,
						inv_purchase_common_item_master_id : txtInvpurchaseCommonItemMasterId,

						inv_purchase_common_item_tax_amount : txtPurchaseQuotationTaxAmount,
						inv_purchase_common_item_tax_code:txtPurchaseQuotationTaxCode_,
						inv_purchase_common_item_tax_amount_rupess :txtPurchaseInvoiceTaxAmntinRs, //Add Tax Amount in Rs @author:paras @Date:24nov
						inv_purchase_common_item_row_amount : txtPurchaseQuotationRowAmount,
						inv_purchase_common_item_factor1 : txtPurchaseQuotationFactor1,
						inv_purchase_common_item_factor2 : txtPurchaseQuotationFactor2,

						inv_purchase_common_item_factor3 : txtPurchaseQuotationFactor3,
						inv_purchase_common_item_factor4 : txtPurchaseQuotationFactor4,
						inv_purchase_common_item_actural_qty : txtPurchaseQuotationActualQuantity,
						inv_purchase_common_item_pending_qty : txtPurchaseQuotationPendingQuantity,

					/*	inv_purchase_common_item_row_status : txtPurchaseQuotationRowStatus,*/
						inv_purchase_common_item_batch_No:txtPurchaseQuotationBatchNo,

						inv_purchase_common_item_base_doc_No : txtPurchaseQuotationDocNo,
						inv_purchase_common_item_doc_number : txtPurchaseQuotationDocNo,

						inv_purchase_common_item_doc_number_fk : txtPurchaseQuotationDocNo,
						inv_purchase_common_item_doc_series : txtDocSeries,
						inv_batch_stock_item_mfg_date:txtPurchaseMfgDate,
						inv_batch_stock_item_exp_date:txtPurchaseExpiryDate,
						
						item_purchase_factor_uom_1 : txtPurchaseQuotationFactor1UOM,
						item_purchase_factor_uom_2 : txtPurchaseQuotationFactor2UOM,
						item_purchase_factor_uom_3 : txtPurchaseQuotationFactor3UOM,
						item_purchase_factor_uom_4 : txtPurchaseQuotationFactor4UOM,
						inv_item_purchase_last_factor_uom :txtPurchaseQuotationLastFactorUOM,

					});

		}

	}
	var li = materiallist.ltinvetorypurchasecommonitemmaster.length;
	 if(li == 0)
		{
		alert("Please enter atleast one Item row to Save Purchase Invoice ");
		return false;
		}
	 
	 var txtPurchaseGrnNo;
    	// Call to Save GRN
		var $radios = $('input:checkbox[name=chkAddtostock]');
		if ($radios.is(':checked') == true)
		{
		saveGRN();
		
		  txtPurchaseGrnNo = $("#txtGRNDocNo").val();
		
		}
		else
			{
			 txtPurchaseGrnNo = $("#txtPurchaseGrnNo").val();
			}
	 
	materiallist = JSON.stringify(materiallist);
	var inputs = [];

	inputs.push('action=savePurchaseInvoiceDetail');
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
	inputs.push('txtPurchaseQuotationRequestNo=' + txtPurchaseQuotationRequestNo);
	inputs.push('txtPurchaseOrderQuatationNo=' + txtPurchaseOrderQuatationNo);
	inputs.push('txtPurchaseGrnNo=' + txtPurchaseGrnNo);
	inputs.push('txtPurchaseQuotationNotes2=' + txtPurchaseQuotationNotes2);
	inputs.push('txtPurchaseQuotationDeliveryDate=' + txtPurchaseQuotationDeliveryDate);
	
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
	inputs.push('txtSupplierState='+txtSupplierState);//add by paras for supplier state
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
			/*var txtPurchaseInvoicSaveOrUpdate =$("#txtPurchaseInvoicSaveOrUpdate").val();
			if(txtPurchaseInvoicSaveOrUpdate=='Update')
				{
				
				alert("Record Updated successfully..!");
				
				}
			else
				{
				alert("Record saved successfully..!");
				}*/
			
			
			$('#Sales_Quotation_Form').removeClass('fade');
			$('#Sales_Quotation_Form').modal('hide');			 			
			window.location.reload("inventory_Purchase_Invoice.jsp");
		}
	});
}



/** ***************** ON  Edit and view purchase Invoice  master and slave Details   Author:sudhir modified Date : 24:11:2015****************** */

function viewPurInvoiceMasterDetails(partyId) {
	$('#hidePIsaveBtn').css('display','block');
	$('#divtxtpurINvoicewithoutGRN').css('display','none');
	$('#divtxtAddtostock').css('display','none');
	
	/*$("#btnRemoveNew").show();
	$("#btnAddNew").show();*/
	
	purchaseQuatViewRefresh();
	$("#txtPurchaseInvoiceDocSeriesIsEdit").val('isEdit');
	$("#txtPurchaseInvoicSaveOrUpdate").val('Update');
	$("#showhidePurchaseInvoice").hide();
	$("#closeonclick").hide();
	$("#selDocName").val('');
	document.getElementById("selDocName").disabled =true;
	var obj = $("#docuemntAjaxRespPurchaseInvoiceMaster").html();
	var state=0;
 //alert(obj);
	var objPurchase = JSON.parse(obj);

	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_no == partyId) {
			var txtPurchaseQuotationMobileNo = $("#txtPurchaseQuotationDocNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_no);
			  
			/*var str=(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_date).split("-");
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];*/
			
			$("#txtPurchaseQuotationDate1").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_date);
			
			/*var txtPurchaseQuotationDate1 = $("#txtPurchaseQuotationDate1")
					.val();*/
			var txtPurchaseQuotationMobileNo = $(
					"#txtPurchaseQuotationMobileNo")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_mobile_number);

			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO')
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_Supplier_Id);

			var txtPurchaseQuotationSupplierName = $(
					"#txtPurchaseQuotationSupplierName")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_Supplier_Name);
			var txtPurchaseQuotationDocSeries = $(
					"#txtPurchaseQuotationDocSeries")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_Series);
			var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;
			var txtPurchaseQuotationReferenceNo = $(
					"#txtPurchaseQuotationReferenceNo")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_reference_no);
			var txtPurchaseQuotationAddress = $("#txtPurchaseQuotationAddress")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_Address);
			var sclPurchaseQuotationDocstatus = $(
					"#sclPurchaseQuotationDocstatus")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_status);
			var txtPurchaseQuotationTotalDocDiscount = $(
					"#txtGRNTotalDocDiscount")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_total_discount);
			var txtPurchaseQuotationTotalDocQty = $(
					"#txtGRNTotalDocQty")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_total_doc_qty);
			
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderRequestNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_purchase_Request_No);
			
			
			var txtPurchaseGrnNo = $("#txtPurchaseGrnNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_grn_no);
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderQuatationNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_order_no);
			var txtPurchaseQuotationDeliveryDate = $("#txtPurchaseQuotationDeliveryDate").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_delivery_date);
			//add by paras for edit supplier state	 
			if(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState == 0 || objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState ==null || objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState==undefined ){
				 
			}else{
				 $("#hoseditState").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState);
				 state = objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState;
			}
			//end
			$("#txtSplDisc").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_special_disc);
			$("#txtdebitAmt1").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_debit_amt);
			$("#txtCD1").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_cash_amt_perct);
			$("#txtCDAmt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_cash_amt_rupees);
			
			$("#txtOctroi").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_octroi_amt);
			$("#txtSurcharge").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_surcharge_amt);
			$("#txtCreditAmt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_credit_amt);
			$("#txtFreight").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_freight_amt);
			
			$("#txtVat").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_calcuated_vat_amt);
			$("#txtlbt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_lbt_amt);
			$("#txtcst").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_cst_amt);
			$("#txtExVat").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_ex_vat_amt);
			
			$("#txtTotalVat").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_calcuated_total_taxes_amt).toFixed(2));
			$("#txtGross").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_total_base_gross_amt).toFixed(2));
			$("#txtLess").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_total_less_amt).toFixed(2));
			$("#txtAdd").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_total_add_amt).toFixed(2));
			
			$("#textVat").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_final_calcuated_total_taxes_amt).toFixed(2));
			$("#txtNetAmt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_final_total_net_amt);
			
			
			var selboxChargeswithAmtList = objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_special_charges;

			if (selboxChargeswithAmtList == "No" || selboxChargeswithAmtList == null
				|| selboxChargeswithAmtList == ''|| txtChargesList == "-Select-" || txtChargesList == "Select") {
			$("#selboxChargeswithAmtList option").text(selboxChargeswithAmtList);
		} 
			else {
			$("#selboxChargeswithAmtList option").remove();
			var Finalrateandtax = selboxChargeswithAmtList.split(",");

			for ( var i = 0; i < Finalrateandtax.length; i++) {
				var chargeNamewithRate = Finalrateandtax[i];
				var option = "";
				option = option + "<option value=" + chargeNamewithRate + ">"
						+ chargeNamewithRate + "</option>";

				$("#selboxChargeswithAmtList").append(option);
			}

		}
			
		$("#sumofCharges").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_sumofspecial_charges.toFixed(2));
			break;

		}
	}

	var masterID = $('#txtVendorCodePO').val();	
	var invoiceId =$('#txtPurchaseQuotationDocNo').val();
	fetchhospitalstate();
	fetchtermsandconditionsDetailsforInvoice(invoiceId);
	fetchPartyMasterContactsDetailsPO(masterID);
	fetchPartyMasterAddressDetailsPO(masterID);
	fecthPartyOtherInfoPO(masterID);
	viewPaymentmodeInfo(partyId);
	var ck = $('#txtVendorCode').val();
	$('#txtVendorCode').val(ck);
	var inputs = [];
	inputs.push('action=fetchpurchaseInvoiceIteamMasterDetail');
	inputs.push('isEdit=no');
	inputs.push('partyId=' + partyId);
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
					pobj1 = eval('(' + r + ')');
					//alert(r);
					//fetchPurchaseQuotationMasterNew();
					srNumber = 1;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
						$("#ItemInfoTable > tbody")
						.append(
								"<tr id='deleterow"
										+ srNumber
										+ "'> <td> <input type='checkbox'  name='checkbox"
										+ srNumber
										+ "' id='checkbox"
										+ srNumber
										+ "'/></td> <td>"
										+ srNumber
										+ "</td>"
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left; width:200px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_Name
										+ "'  onkeyup = 'auto(this.id,onchange)' /> "
										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_code
										+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_master_id
										+ "'/> </div> </td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_doc_Qty
										+ "'  onblur='totalAmount(this.id,"
										+ srNumber
										+ ")'> <lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_unit_price
										+ "'style='width:60px;'></td>"
										+ ""
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_discount_per
										+ "' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onblur='calculTradeDis(this.id,"+srNumber+ ")'></td> <td><input type='text' class='form-control input-SmallText' onkeyup='chKTradAmt(this.id,"+srNumber+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_discount_rupess
										+ "'></td>"
										+ " <td><input type='text'  readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_discount_amount
										+ "' ></td>"
										+ "<td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_base_amount
										+ "'style='width:60px;'></td>"
									/*	+"<td><select class='form-control input-SmallText'  style='width:160px;' multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_code + "</option> </select></td>"
										+ " <td><input type='text' class='form-control input-SmallText'readonly='' id='txtPurchaseQuotationTaxAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")'></td> "*/
										+"<td><select class='form-control input-SmallText'  style='width:160px;' multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_amount + "</option> </select></td>"
										+ " <td><input type='text' class='form-control input-SmallText'readonly='' id='txtPurchaseQuotationTaxAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")'></td> "
										+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' id='txtPurchaseInvoiceTaxAmntinRs"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_amount_rupess
										+ "' readonly='' ></td>"
										+ "<td><input type='text' readonly=''class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_row_amount
										+ "'style='width:60px;'></td>"
										+ "<td><input type='text' class='form-control input-SmallText'maxlength='5' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor1
										+ "'><lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor2
										+ "'><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor3
										+ "'><lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor4
										+ "'><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_actural_qty
										+ "' onblur='pendingAmount(this.id,"
										+ srNumber
										+ ")'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_pending_qty
										+ "'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_batch_No
										+ "'></td>"
										+ "  <td><input type='text' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ srNumber
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_mfg_Date
										+ "' > </td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ srNumber
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;;'value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_Expiry_Date
										+ "' > </td> </tr>");
					
						
						 var  hostate = $("#hosState").val();
							 if(state == hostate)
							{
							
								$("#txtPurchaseQuotationTaxAmount"+srNumber).hide();
								
								//totalAmount();
							}else{
								$("#txtPurchaseQuotationTaxCode_"+srNumber).hide();
							//	$("#txtPurchaseQuotationTaxCode_"+srNumber).val("0.0");
								
								
							
								}
						
						/*if(state =="MAHARASHTRA" || state == "Maharashtra" || state == "maharashtra")
						{
						
							$("#txtPurchaseQuotationTaxAmount"+srNumber).hide();
							
							//totalAmount();
						}else{
							
							$("#txtPurchaseQuotationTaxCode_"+srNumber).val("0.0");
						
							}*/


				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
					}
					 auto("txtPurchaseQuotationItemName_","onload");
					totalDocQtyPQ();
					totalDocDiscountPQ();

					var txtEmptyItem = $("#txtEmptyItem").val();
					//auto(txtEmptyItem, "onload");

					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				}
			});

}

function purchaseQuatViewRefresh() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	//$('#Sales_Quotation_Form').find('input:hidden').val('');
	$("#ItemInfoTable > tbody").html('');
	$('#ItemInfoTable').find('input:text').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	isNew = 1;

}



/*function totalDocQtyPQ() {
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
	$("#RowCount").val(RowCount);

}*/


/************** Total Doc Discount 14APril2016 ***********/

function totalDocDiscountPQ() {
	var sum = 0;
	var tradeAmt;
	var RowCount = $("#RowCount").val();

	for ( var i = 1; i <= RowCount; i++) {
		tradeAmt = $("#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
		if (tradeAmt == null || tradeAmt == undefined || tradeAmt == '') {
			var flag = 1;
		} else 
		{
			sum = (parseFloat(sum) + parseFloat(tradeAmt)).toFixed(2);;
		}

	}

	$("#txtGRNTotalDocDiscount").val(sum);
	$("#RowCount").val(RowCount);

}

/*
*//******************************************************new party MASTER FOR PURSHACE INVOICE**added in LIST*************************************************husen**//* 
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
			alert("error");
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
	
	if(txtcontactpersonPO == "" || txtcontactpersonPO == null)
	{
	alert("please enter contact person name");
	$("#txtcontactpersonPO").focus();
	return false;
	}
	if(txtdesignationPO == "" || txtdesignationPO == null)
	{
	alert("please enter designation");
	$("#txtdesignationPO").focus();
	return false;
	}
	if(txtcontaddressPO == "" || txtcontaddressPO == null)
	{
	alert("please enter address");
	$("#txtcontaddressPO").focus();
	return false;
	}
	
	if(txtdatePO == "" || txtdatePO == null)
	{
	alert("please select date of birth");
	$("#txtdatePO").focus();
	return false;
	}
	
	if(txtphone1PO == "" || txtphone1PO == null)
	{
	alert("please enter phone1");
	$("#txtphone1PO").focus();
	return false;
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
			alert("error");
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
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			// alert(r);
			counterPartyContactInfoPO = 1;
			$("#ContactInfoTablePO").setTemplate(inventoryPartyContactInfoTempPO);
			$("#ContactInfoTablePO").processTemplate(pobj1);
			$("#PartyContactTableInfoListPO").html(r);
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
	*//**********************************date convert**************************************//*
	var str = (myobj.party_contact_info_dob).split("-");
	var bdate = str[2] + "-" + str[1] + "-" + str[0];
	$("#txtdatePO").val(bdate);

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
	var didConfirm = confirm("Are you sure to delete?");
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
				alert("error");
			},
			success : function(r) {
				alert(r);
				fetchPartyMasterContactsDetailsPO();
			}
		});
	}
}

function resetContactInfoFieldsPO()
{	
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

*//********************************************************new party address details PO******************************************************//*
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
			alert("error");
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
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Company</div></th>"
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


function SavePartyMasterAddressInfoDetailsPO() 
{
	var txtpartymasterId = $("#txtVendorCodePO").val();
	//alert(txtpartymasterId);
	var txtaddressinfocode = $("#txtaddressinfocodePO").val();
	//alert(txtaddressinfocode);
	var radioBtn = null;
	if ($('#iBillingAddressPO').is(":checked") == true) {
		
		  radioBtn = $("#iBillingAddressPO").val();
	} 
	if($('#iShippingAddressPO').is(":checked") == true)
	{
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
	
	//validation
	if(txtaddresscompany == "" || txtaddresscompany == null)
		{
		alert("please enter company name");
		$("#txtaddresscompanyPO").focus();
		return false;
		
		}
	if(txtaddrcity == "" || txtaddrcity == null)
	{
	alert("please enter city");
	$("#txtaddrcityPO").focus();
	return false;
	
	}
	if(txtadraddress == "" || txtadraddress == null)
	{
	alert("please enter address");
	$("#txtadraddressPO").focus();
	return false;
	
	}
	if(txtaddrpin == "" || txtaddrpin == null)
	{
	alert("please enter pin");
	$("#txtaddrpinPO").focus();
	return false;
	
	}
	if(txtaddrstate == "" || txtaddrstate == null)
	{
	alert("please enter state");
	$("#txtaddrstatePO").focus();
	return false;
	
	}
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
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			//alert(r);
			counterPartyAddressInfoPO = 1;
			$("#AddressInfoTablePO").setTemplate(inventoryPartyAddressInfoTempPO);
			$("#AddressInfoTablePO").processTemplate(pobj1);
			$("#PartyAddressTableInfoListPO").html(r);
		}
	});
}


function EditpartyAddressdetailsPO(id)
{
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
    if(myAddrsObj.party_master_address_info_type == "BillingAddress")
    	{
    	   $("#iBillingAddressPO").prop('checked', true);
    	}
    else {
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
	var didConfirm = confirm("Are you sure to delete?");
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
				fetchPartyMasterAddressDetailsPO();
			}
		});
	}
}

function resetAddressInfoFieldsPO()
{	
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

}*/




/** *************** AutoSuggestion Code for Search by Vendor Name Author :sudhir date :8:09:2015:************** */

function setValuesToAutocompleteForSupplierNameforSearch(inputID, type) {
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
						alert('error');
					},
					success : function(r) {
						// alert("r.length>>" + r.length);
						var availableTags = [];
						if (r.length == 20) {
							
							alert("NO MATCHING FOUND  please select Vendor Name from Auto suggestion drop down list !");
							$("#byVendorName").val('');
							$("#byVendorName").focus();
							

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
								$('#byVendorName')
										.typeahead({
											source : resultData,
											displayField : 'Name',
											valueField : 'ID',
											onSelect : displayResult,
											scrollBar : true

										});
								$('#byVendorName').data('typeahead').source = resultData;

							}, 500);
						}
					}
				});

		function displayResult(item) {
			//$('#txtVendorCode').val(item.value);
			 $("#byVendorName").val(item.text);
			 
		}
	}
}


/****************** show Card Parameter  Author :sudhir jadhav Date:14:09:2015    ***********************/


function showCardParameter() {
	
	var lfckv = document.getElementById("CheckBoxCredit").checked;
	if (lfckv == true) {
		document.getElementById("CheckBoxCash").checked = false;
		$("#divCreditAmount").show();
		$("#divtxtAmountCreditNO").show();
		$("#divtxtAmountCreditBank").show();
		$("#divtxtCashAmount").hide();
		$("#divPaymentId").hide();
		$("#divDuration").show();
		$("#divtxtComment").show();
	 
	} else {
		$("#divCreditAmount").hide();
		$("#divtxtAmountCreditNO").hide();
		$("#divtxtAmountCreditBank").hide();
		$("#divPaymentId").hide();
		$("#divDuration").hide();
		$("#divtxtComment").hide();
	}
	
} 

/****************** show Cash Parameter  Author :sudhir jadhav Date:14:09:2015    ***********************/

function showCashParameter() {
	
	
	var lfckv = document.getElementById("CheckBoxCash").checked;
	
	if (lfckv == true) {
		document.getElementById("CheckBoxCredit").checked = false;
		$("#divCreditAmount").hide();
		$("#divtxtAmountCreditNO").hide();
		$("#divtxtAmountCreditBank").hide();
		$("#divPaymentId").hide();
		$("#divDuration").hide();
		$("#divtxtComment").show();
		$("#divtxtCashAmount").show();
	 
	} else {
		$("#divtxtCashAmount").hide();
		$("#divPaymentId").hide();
		$("#divtxtComment").hide();
		/*$("#divCreditAmount").hide();
		$("#divtxtAmountCreditNO").hide();
		$("#divtxtAmountCreditBank").hide();*/
	}
	
}

/******************** Generat new Auto Increment Id  for Payment mode in purchase Invoice Author :sudhir jadhav Date :14:09:2015  ******************************* */
function getNextPayId() {
	var inputs = [];
	inputs.push('action=getQuotationNextId');
	inputs.push('tableName=inv_purchase_invoice_mode_of_payment');
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
			//alert(r);
			$("#txtPaymentId").val(r);
		}
	});
}


/*********************************** save payment Details  Author :sudhir  Date:14:09:2015 *****************************/
function savepaymentDetails() 
{
var txtPaymentId = $("#txtPaymentId").val();
var txtDuration = $("#txtDuration").val();
var txtAmountCredit = $("#txtAmountCredit").val();
var txtAmountCreditNO = $("#txtAmountCreditNO").val();
var txtAmountCreditBank = $("#txtAmountCreditBank").val();
var txtCashAmount = $("#txtCashAmount").val();
var txtVendorCode = $("#txtVendorCodePO").val();

var txtPurchaseQuotationSupplierName =$("#txtPurchaseQuotationSupplierName").val();
var txtPurchaseQuotationDocNo = $("#txtPurchaseQuotationDocNo").val();
var txtComment = $("#txtComment").val();
var modeofpayment;
var lfcash = document.getElementById("CheckBoxCash").checked;
var lfcredit = document.getElementById("CheckBoxCredit").checked;

if(txtPurchaseQuotationSupplierName == "")
	{
	alert("please select first Grn");
	return false;
	}
if(lfcash==true)
{
	
	if(txtCashAmount=="")
		{
		alert("please Enter the Cash Amount");
		$("#txtCashAmount").focus();
		return false;
		}
	modeofpayment='Cash'
	 
}
if(lfcredit==true)
{
	modeofpayment='Credit'
		
		if(txtAmountCredit=="")
		{
		alert("please Enter the Credit Amount");
		$("#txtAmountCredit").focus();
		return false;
		}
		 
}

if(txtAmountCredit=="")
{	
	txtAmountCredit = 0;
	
	}
if(txtCashAmount=="")
{	
	txtCashAmount = 0;
	
	}
var inputs = [];
inputs.push('action=savePaymentDetailsofPurInvoice');
inputs.push('txtAmountCredit=' + txtAmountCredit);
inputs.push('txtAmountCreditNO=' + txtAmountCreditNO);
inputs.push('txtAmountCreditBank=' + txtAmountCreditBank);
inputs.push('txtCashAmount=' + txtCashAmount);
inputs.push('txtVendorCode=' + txtVendorCode);
inputs.push('txtPaymentId=' + txtPaymentId);

inputs.push('txtPurchaseQuotationSupplierName=' + txtPurchaseQuotationSupplierName);
inputs.push('txtPurchaseQuotationDocNo=' + txtPurchaseQuotationDocNo);

inputs.push('txtComment=' + txtComment);
inputs.push('modeofpayment=' + modeofpayment);
inputs.push('txtDuration=' + txtDuration);

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
		var txtPurchaseInvoicSaveOrUpdate =$("#txtPurchaseInvoicSaveOrUpdate").val();
		if(txtPurchaseInvoicSaveOrUpdate=='Update')
			{
			
			alert("Record Updated successfully..!");
			var partyId = $("txtPurchaseQuotationDocNo").val();
			viewPaymentmodeInfo(partyId);
			
			}
		else
			{
			alert("Record saved successfully..!");
			getNextPayId();
			$("#txtComment").val('');
			$("#txtCashAmount").val(0);
			$("#txtAmountCredit").val(0);
			$("#txtAmountCreditNO").val('');
			$("#txtAmountCreditBank").val('');
			$("#txtDuration").val('');
			}
		
		
	
		
		 
	}
});

} 
/* ********************** view Payment mode  info Author :sudhir Date:14:09:2015 ********** */

function viewPaymentmodeInfo(partyId) {
	
	var inputs = [];
	inputs.push('action=fetchpurchaseInvoicePaymentDetail');
	inputs.push('isEdit=no');
	inputs.push('partyId=' + partyId);
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
					pobj1 = JSON.parse(r);
					for(var i=0;i< pobj1.liPurInvoicePaymentDTOs.length;i++)
						{
						var paymode = pobj1.liPurInvoicePaymentDTOs[i].payMode;
						 
						if(paymode=="Cash")
							{
							
							$('#CheckBoxCash').attr('checked', true);
							$('#CheckBoxCredit').attr('checked', false);
							/*$("#divchkCreditAmount").hide();
							$("#divchkCashAmount").show();*/
							showCashParameter();
							$("#txtCashAmount").val(pobj1.liPurInvoicePaymentDTOs[i].cash_amt);
							$("#txtComment").val(pobj1.liPurInvoicePaymentDTOs[i].comment);
							var payid =pobj1.liPurInvoicePaymentDTOs[i].inv_mode_of_payment_id;
							$("#txtPaymentId").val(payid);	
							$("#txtAmountCredit").val(0);
							}
						
						if(paymode=="Credit")
							{
							$('#CheckBoxCredit').attr('checked', true); 
							$('#CheckBoxCash').attr('checked',false);
							/*$("#divchkCashAmount").hide();
							$("#divchkCreditAmount").show();*/
							showCardParameter();
							$("#txtCashAmount").val(0);
							$("#txtAmountCreditNO").val(pobj1.liPurInvoicePaymentDTOs[i].card_no);
							$("#txtAmountCredit").val(pobj1.liPurInvoicePaymentDTOs[i].Credit_amt);
							$("#txtAmountCreditBank").val(pobj1.liPurInvoicePaymentDTOs[i].bankName);
							$("#txtDuration").val(pobj1.liPurInvoicePaymentDTOs[i].duration);
							$("#txtComment").val(pobj1.liPurInvoicePaymentDTOs[i].comment);
							var payid =pobj1.liPurInvoicePaymentDTOs[i].inv_mode_of_payment_id;
							$("#txtPaymentId").val(payid);
							
							}
						
						}
				}
				});
	
}



/* ************************************** fetch  terms and conditions Details for Invoice Author :sudhir Date:27/10/2015 *************************************/
function fetchtermsandconditionsDetailsforInvoice(invoiceId) {
		var inputs = [];
		inputs.push('action=fetchtermsandconditionsDetailsforInvoice'); 
		inputs.push('InvoiceId='+invoiceId);
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
				objPurchase = JSON.parse(r);
				$("#txtPurchaseQuotationNotes2").val(objPurchase.ltinvetorypurchasecommonmaster[0].inv_purchase_invoice_terms_and_condition_master);
				
			}
		});
	}


/* ************************** chkTradAmtorPercentage Author: sudhir Date:24:10:2015 **************************************/

/*function chkTradAmtorPercentage(id,rowcount)
{
	var txtPurchaseQuotationTrdeDiscountPercentage = $("#txtPurchaseQuotationTrdeDiscountPercentage"+rowcount).val();
	var txtTredeAmt = $("#txtPurchaseQuotationTrdeDiscountPercentage"+rowcount).val();
	
	 if(txtPurchaseQuotationTrdeDiscountPercentage == '' || txtPurchaseQuotationTrdeDiscountPercentage == null)
		 {
		 document.getElementById("txtPurchaseQuotationTrdeDiscountInRupess"+rowcount).disabled = false;
		 $("#txtPurchaseQuotationTrdeDiscountAmt"+rowcount).val(' ');
		 $("#txtPurchaseQuotationBaseAmount"+rowcount).val(' ');
		 }
	
	 if(!txtPurchaseQuotationTrdeDiscountPercentage == '' || !txtPurchaseQuotationTrdeDiscountPercentage == null)
	{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountInRupess"+rowcount).disabled = true;
		 $("#txtPurchaseQuotationTrdeDiscountInRupess" + rowcount).val(0);
		 calculTradeDis("txtPurchaseQuotationTrdeDiscountPercentage",rowcount);
	 }
	
	
}*/

/* ************************** chKTradAmt Author: sudhir Date:24:10:2015 **************************************/
/*function chKTradAmt(id,rowcount)
{
	var txtPurchaseQuotationTrdeDiscountInRupess = $("#txtPurchaseQuotationTrdeDiscountInRupess"+rowcount).val();
	
	if(txtPurchaseQuotationTrdeDiscountInRupess =='' || txtPurchaseQuotationTrdeDiscountInRupess == null || txtPurchaseQuotationTrdeDiscountInRupess =="" )
		{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountPercentage"+rowcount).disabled = false;
		 $("#txtPurchaseQuotationTrdeDiscountAmt"+rowcount).val(' ');
		 $("#txtPurchaseQuotationBaseAmount"+rowcount).val(' ');
		
		}
	
	if(txtPurchaseQuotationTrdeDiscountInRupess !='' || txtPurchaseQuotationTrdeDiscountInRupess != null || txtPurchaseQuotationTrdeDiscountInRupess != "" )
		{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountPercentage"+rowcount).disabled = true;
		 $("#txtPurchaseQuotationTrdeDiscountPercentage" + rowcount).val(0);
		 var docqty = $("#txtPurchaseQuotationDocQuantity" +rowcount).val();
			var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowcount).val();
			var baseAmt = docqty * unitprise;
			var FinalBaseAmt = baseAmt - txtPurchaseQuotationTrdeDiscountInRupess;
			
			$("#txtPurchaseQuotationTrdeDiscountAmt"+rowcount).val(txtPurchaseQuotationTrdeDiscountInRupess);
			$("#txtPurchaseQuotationBaseAmount"+rowcount).val(FinalBaseAmt);
		 
		}
	 
}*/



/***************** @Author Sudhir @Date:14april2016 ***********/
function directIndirectpurInvoice()
{
	var $radios = $('input:checkbox[name=chkDirectpurInvoice]');
	if ($radios.is(':checked') == true)
	{
		$('#showhidePurchaseInvoice').hide();
		$('#btnAddNew').show();
		$('#btnRemoveNew').show();
		$('#hidePIsaveBtn').css('display','block');
		$("#closeonclick").hide();
		
		$("#ItemInfoTable input[type=checkbox]").each(function(){

			  $(this).prop("checked",false);
			});
		
		toCreateDivGRN(1);
	}
	if ($radios.is(':checked') == false)
	{
		$('#showhidePurchaseInvoice').show();
		$('#btnAddNew').hide();
		$('#btnRemoveNew').hide();
		$('#hidePIsaveBtn').css('display','none');
		$("#closeonclick").show();
	}
	
}




/************** Adding row dynamically in table for Main GRN @author Sudhir @Date:12aparil2016 modifeid Date @20may2016  **********/


function toCreateDivGRN() {
	$('#iHideGRNSaveBtn').css('display','block');
	
	/*$('#taxcode').css('display','block');
	$('#taxAmount').css('display','block');*/
	
	/*$("#closeonclick").hide();*/
	if (test > 0 && isNew > 0) {
		if (rowCount == 1) {

			rowCount = test;

		}
		rowCount++;

		$("#ItemInfoTable > tbody")
		.append(
				"<tr id='deleterow"
						+ rowCount
						+ "'> <td> <input type='checkbox' checked='checked' name='checkbox"
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
						+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;width:200px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
						+ rowCount
						+ "' onkeyup='auto(this.id"
						+ rowCount
						+ ",onchange)'/>"
						+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
						+ rowCount
						+ "' value='0'/><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
						+ rowCount
						+ "' value='0'/></div></td> "
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
						+ rowCount
						+ "' onkeyup='totalAmount(this.id,"
						+ rowCount
						+ ")' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
						+ rowCount
						+ "' onkeypress='return validateNumbers(event);' style='width:60px;' ></td>"
						+ ""
						+ " <td><input type='text' class='form-control input-SmallText' onkeyup ='chkTradAmtorPercentage(this.id,"+rowCount+")' onblur='calculTradeDis(this.id,"+rowCount +")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
						+ rowCount
						+ "' onkeypress='return validateNumbers(event);' ></td><td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
						+ rowCount
						+ "' ></td>"
						+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
						+ rowCount
						+ "' style='width:60px;'></td>"
						+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
						+ rowCount
						+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td><td><select class='form-control input-SmallText' multiple='multiple'  onclick='multipletaxCalculation(this.id," + rowCount + ")' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCode_"
						+ rowCount
						+ "' style='width:160px;' ></select></td>"
						+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
						+ rowCount
						+ ")' id='txtPurchaseQuotationTaxAmount"
						+ rowCount
						+ "' onkeypress='return validateNumbers(event);'readonly='' ></td> "
						+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseInvoiceTaxAmntinRs"
				        + rowCount
						+ "' readonly=''></td> "
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
						+ rowCount
						+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
						+ rowCount
						+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
						+ rowCount
						+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
						+ rowCount
						+ "'><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td>"
						+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
						+ rowCount
						+ "'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td>"
						+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
						+ rowCount
						+ "' onkeypress='return validateNumbers(event);' ></td> "
						+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity"
						+ rowCount
						+ "' onkeypress='return validateNumbers(event);' value ='0'></td> "
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
						+ rowCount
						+ "'  ></td>"
						+ "  <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
								+ rowCount
								+ "'onclick = 'getMfgandexpyDate(this.id,"
								+ rowCount
								+ ")'; style='float:left;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
								+ rowCount
								+ "' onclick ='getMfgandexpyDate(this.id,"
								+ rowCount
								+ ")'; style='float:left;' > </td> " + "</tr>");
		
		/*$("#ItemInfoTable > tbody")
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
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id"
								+ rowCount
								+ ",onchange)' onkeypress='return validateOnlyName(event);' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);'> <label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText'  onkeyup ='chkTradAmtorPercentage(this.id,"+rowCount+")' onblur='calculTradeDis(this.id,"+rowCount +")' id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td><td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "'   ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td><td><div id ='divtxtPurchaseQuotationTaxCode_'><input type='text' class='typeahead form-control input-SmallText'"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxCode_"
								+ rowCount
								+ "' onkeyup='autotaxCodeGrn(this.id"+rowCount+ ",onchange)'onkeypress='return validateOnlyName(event);'></div></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly=''></td> "
								+ "<td><input type='text' class='form-control input-SmallText'readonly='' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' readonly=''  id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowStatus"
								+ rowCount
								+ "' onkeypress='return validateOnlyName(event);' ></td>"
								+    
								"<td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
								+ rowCount
								+ "'onclick = 'getMfgandexpyDate(this.id,"
								+ rowCount
								+ ")'; style='float:left;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
								+ rowCount
								+ "' onclick ='getMfgandexpyDate(this.id,"
								+ rowCount
								+ ")'; style='float:left;;' > </td> " + "</tr>");*/

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
		//autotaxCodeGrn("txtPurchaseQuotationTaxCode_" + rowCount, "onload");

	} else {
		$("#ItemInfoTable > tbody")
				.append(
						"<tr id='deleterow"
								+ rowCount
								+ "'> <td> <input type='checkbox' checked='checked' name='checkbox"
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
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;width:200px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id"
								+ rowCount
								+ ",onchange)'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;' ></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup ='chkTradAmtorPercentage(this.id,"+rowCount+")' onblur='calculTradeDis(this.id,"+rowCount +")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td><td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' style='width:70px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:190px;'></td><td><select class='form-control input-SmallText' multiple='multiple'  onclick='multipletaxCalculation(this.id," + rowCount + ")' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCode_"
								+ rowCount
								+ "' style='width:180px;' ></select></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'readonly='' ></td> "
								+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseInvoiceTaxAmntinRs"
  					            + rowCount
								+ "' readonly=''></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:190px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "'><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'style='width:90px;' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' value ='0' style='width:90px;'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount
								+ "' style='width:90px;' ></td>"
								+ "  <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;width:90px;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;width:90px;'> </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
	auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
	//autotaxCodeGrn("txtPurchaseQuotationTaxCode_" + rowCount, "onload");
		rowCount++;
	}

}


/************** Remove  row dynamically in table  for purchase Invoice  @Date 15April2016****************/

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
			$("#RowCount").val(temp);
		}
		p++;
	}
	isNew = 1;
	 
	totalDocQtyPQ();
	totalDocDiscountPQ();
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
}


/** ******* AutoSuggestion Code for Direct purchase Invoice @Date 14april2016  @author Sudhir  @Modifeid Date 20may2016 ********** */

function auto(inputID, typeauto) {
	//alert("Hi");
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
						alert('error');
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

			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var currentcode = item.value;
			//alert(item.value);
			$('#txtPurchaseQuotationItemNumber' + idValue).val(currentcode);
					
			$("#ItemInfoTable input[type=checkbox]").each(function(){

				  $(this).prop("checked",false);
				});
			/*	THIS fUNCTION CALLED FORM HEAR FOR CREATE AUTOMATIC NEW ROW @AUTHOR SUDHIR @DATE :18JULLY2016 CREATE AUTOMATIC NEW */
			toCreateDivGRN(1);
			
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
							alert("error");
						},
						success : function(r) {
							///alert(r);
							ajaxResponse = eval('(' + r + ')');
							$('#PQItemPurchaseInfoDIV').html(r);
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
								//alert("Hi "+ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_uom_factor2);
								//for UOM of factors 
								
								$('#txtPurchaseQuotationFactor1UOM' + idValue)
								.text(
										ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_1);
						$('#txtPurchaseQuotationFactor2UOM' + idValue)
								.text(
										ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_2);
						$('#txtPurchaseQuotationFactor3UOM' + idValue)
								.text(
										ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_3);
						$('#txtPurchaseQuotationFactor4UOM' + idValue)
								.text(
										ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].item_purchase_factor_uom_4);
						
						$('#txtPurchaseQuotationLastFactorUOM' + idValue).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenLastUOM);
						
						$('#txtPurchaseQuotationDocQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
						$('#txtPurchaseQuotationActualQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
						/*$('#txtPurchaseQuotationPendingQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);*/
						
						
						var txtPurchaseQuotationTaxCode = ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].inv_item_taxcode_and_rate;
						var Finalrateandtax = txtPurchaseQuotationTaxCode.split(",");
						var finalrat;
						var finalRateamt;
						var sumofRate = 0;
						for(i=0;i<Finalrateandtax.length;i++)
							{ 
							finalrat = Finalrateandtax[i];
							var state = $("#txtSupplierState").val();
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
							
						//	var state = $("#txtSupplierState").val();
							var hostate = $("#hosState").val();
							if(state ==hostate || state == hostate || state == hostate)
							{
								
								$("#txtPurchaseQuotationTaxCode_"+idValue).append(option);
								//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
								$("#txtPurchaseQuotationTaxAmount"+idValue).val("0.0").hide();
								$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
								//totalAmount();
							}else{
								
								$("#txtPurchaseQuotationTaxCode_"+idValue).val("0.0").hide();
								$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
								}
							
							/*if(state =="MAHARASHTRA" || state == "Maharashtra" || state == "maharashtra")
							{
								
								$("#txtPurchaseQuotationTaxCode_"+idValue).append(option);
								//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
								$("#txtPurchaseQuotationTaxAmount"+idValue).val("0.0").hide();
								$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
								//totalAmount();
							}else{
								
								$("#txtPurchaseQuotationTaxCode_"+idValue).val("0.0");
								$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
								}*/
					//	$("#txtPurchaseQuotationTaxCode_"+idValue).append(option);
							}
						
						//$('#txtPurchaseQuotationDocQuantity' + idValue);
						totalAmount();
						$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
						break;

								
								 
							}
						}					});

		}
	}
}


/** ***Manufacturing Date and expariDare for purchase Invoice @author Sudhir @Date:14April2016 ***/
function getMfgandexpyDate(inputID)
{
	new JsDatePick({
		useMode:2,
		target:inputID,
		/* dateFormat:"%d-%M-%Y", */
		yearsRange:[1920,2099],
		limitToToday:false,
		/* cellColorScheme:"beige", */
		dateFormat:"%Y-%m-%d",
		imgPath:"../img/",
		weekStartDay:1,
	});
	
	}

/* ************************** chKTradAmt for purchase Invoice @author Sudhir @Date:14April2016 modified @Date 13june2016 modified date :1jully2016 for remove amt validation**************************************/
function chKTradAmt(id,rowcount)
{
	var txtPurchaseQuotationTrdeDiscountInRupess = $("#txtPurchaseQuotationTrdeDiscountInRupess"+rowcount).val();
	
	if(txtPurchaseQuotationTrdeDiscountInRupess == "" || txtPurchaseQuotationTrdeDiscountInRupess == null )
		{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountPercentage"+rowcount).disabled = false;
		 $("#txtPurchaseQuotationTrdeDiscountAmt"+rowcount).val(' ');
		 $("#txtPurchaseQuotationBaseAmount"+rowcount).val(' ');
		 $("#txtPurchaseQuotationRowAmount"+rowcount).val(' ');
		 $("#txtGRNTotalDocDiscount").val('0');
		
		}
	
	if(txtPurchaseQuotationTrdeDiscountInRupess !="" || txtPurchaseQuotationTrdeDiscountInRupess != null )
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



/*calculate Total TradeDis Discount IN rupess @Date13june2016 @Authour Sudhir*/ 
function calculTradeDisRs(id, rowCount) {
	
	var treadeDiscountRs = $("#txtPurchaseQuotationTrdeDiscountInRupess" + rowCount).val();
	var oldbaseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	/*alert(oldbaseAmt);
	
	if(treadeDiscountRs >= oldbaseAmt )
	{
		alert("Trade Discount should not more than base Amt" );
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
	{*/

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
		
		
		$("#txtGRNTotalDocDiscount").val(FinaltradeDiscount);
		
	}
	/*}*/
	rowAmtCal(1,rowCount);
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	/*rowCount(1,rowCount);*/
}

 
 
/******************** taxcalculation author:sudhir Date:11:12:2012 **********************/

function taxcalculation(id ,rowCount){
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
}


/* ******* AutoSuggestion Code. for Openig stock supplier @Author Sudhir @Date 12April2016...........****/

function setSupplierNameForOpenigStock(inputID, type) {

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
						alert('error');
					},
					success : function(r) {
						// alert("r.length>>" + r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND Please Enter Valide Name");
							$("#txtGRNSupplierNameOpnigStock").val('');
							$("#txtGRNSupplierNameOpnigStock").focus();

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
								$('#txtGRNSupplierNameOpnigStock')
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
			$('#txtVendorCodeOpnigStock').val(item.value);
			
				var masterID = item.value;
				
				fetchPartyMasterGeneralDetailsOpningStock(masterID);
				fetchPartyMasterAddressDetailsforopenigStock(masterID);
				//fecthPartyOtherInfoPO(masterID);
				
		}
	}
}


/****************** get general information of party for party mobile number  @Author Sudhir @Date 12April2016************/
function fetchPartyMasterGeneralDetailsOpningStock(partyId) {
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
			alert("error");
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

			$("#txtGRNMobileNoOpnigStock").val(myGenralnfoObj.party_master_general_info_mobile);
			 
		}
	});
}



/***** *** fetch Party Master Address Details for purchase Invoice @author Sudhir @Date:14April2016 ********/
function fetchPartyMasterAddressDetailsforopenigStock() {
	var txtpartymasterId = $("#txtVendorCodeOpnigStock").val();
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
			$("#PartyAddressTableInfoListPO").html(r);
				
			
			/******* **** featch address and mobile no for suppler name for purchase Invoice @author Sudhir @Date:14April2016 *************/
			var obj = $("#PartyAddressTableInfoListPO").html();
			var objPurchase = JSON.parse(obj);
			for(var row =0 ;row < objPurchase.ltinventorypartymasteraddressinfodto.length;row ++  )
			{
			$("#txtGRNAddressOpnigStock").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
			break;
			}
			/**********  End featch address and mobile no for suppler name for purchase Invoice @author Sudhir @Date:14April2016 *************/
			
			
		}
	});
}
 
/********** multipletaxCalculation for purchase Invoice @author Sudhir @Date:14April2016******/
function multipletaxCalculation(id ,rowCount)
{
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
	$("#ApplyTaxforItem").show('show');
	
}


/****** taxcalculation for purchase Invoice @author Sudhir @Date:14April2016 *********/

function taxcalculation(id ,rowCount){
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
}


/****** **** applyTaxforItem for item for purchase Invoice @author Sudhir @Date:14April2016 *****/
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
	$("#ApplyTaxforItem").hide();
	rowAmtCal(1,rowCount);
	totalVatAmt(1,rowCount);
	
}
/********************************* End applyTaxforItem for item for purchase Invoice @author Sudhir @Date:14April2016 *****************************/


/**** hideApplyTaxpopaup for purchase Invoice @author Sudhir @Date:14April2016****/
function  hideApplyTaxpopaup() {
	 $('#lstBoxforTax').html();
	 $("#ApplyTaxforItem").hide('hide');	
	 $("#txtNewTax").val('');
	}
/*********** End for purchase Invoice @author Sudhir @Date:14April2016 ***********/



/** Fetch taxcode By Autosuggetion for purchase Invoice @author Sudhir @Date:14April2016**/
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


/***select * Tax code and tax rate for purchase Invoice @author Sudhir @Date:14April2016 ***/
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
		$("#lstBoxforTax").append(o);
		$("#txtNewTax").val("");
		
		$('select option').filter(function() {
		    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
		}).remove();
		
	}
}
/****** ***remove tax code and rate from for purchase Invoice @author Sudhir @Date:14April2016 *************/
function removeItemTax() {

	$('#lstBoxforTax option:selected').remove();
}
 
/** Fetch taxcode By Autosuggetion for GRN Author:sudhir @Date:13april2016**/


/**PQ***function factoring *for GRN Author:sudhir @Date:13april2016****/
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
					     var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val() ;
						 var newUnitPrice = (qty) * (unitPrice); 
						 $('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val(parseFloat(newUnitPrice));
						 
						 $('#txtPurchaseQuotationFactor1PO' + rowCountPO).val(qty);
						 $('#txtPurchaseQuotationFactor2PO' + rowCountPO).val(factQty22);
						 $('#txtPurchaseQuotationFactor3PO' + rowCountPO).val(factQty33);
						 $('#txtPurchaseQuotationFactor4PO' + rowCountPO).val(factQty44);
					}
				  else if(Type == "PurchaseQuotation")
					  {
					  //  var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val() ;
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
					     
					     var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val();
						 var newUnitPrice = (qty) * (unitPrice); 
						 $('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val(parseFloat(newUnitPrice));
						 
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
						     
							 var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val();
							 var newUnitPrice = (qty) * (unitPrice); 
							 $('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val(parseFloat(newUnitPrice));
								 
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
						     
							 var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val() ;
							 var newUnitPrice = (qty) * (unitPrice); 
							 $('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val(parseFloat(newUnitPrice));
								 
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


/* ***** **** chkTradAmtorPercentage *for purchase Invoice @author Sudhir @Date:14April2016 *****/

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
 
function calculTradeDis(id, rowCount) {
	
	var treadeDiscount = $(
			"#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).val();
	var oldbaseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	
	
	if(treadeDiscount > 100 )
	{
		alert("Trade Discount should not more than 100" );
		$("#txtPurchaseQuotationTrdeDiscountPercentage"+ rowCount).val('');
		
		$("#txtPurchaseQuotationTrdeDiscountAmt"+rowCount).val('');
		$("#txtPurchaseQuotationBaseAmount"+rowCount).val('');
		$("#txtPurchaseQuotationRowAmount"+rowCount).val('');
		
		var docqty = $("#txtPurchaseQuotationDocQuantity" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowCount).val();
		
		var baseAmt = docqty * unitprise;
		$("#txtPurchaseQuotationBaseAmount"+rowCount).val(baseAmt.toFixed(2));
		
		$("#txtPurchaseQuotationTrdeDiscountPercentage"+ rowCount).focus();
		
		
		return false;
		
	}
	else
	{

	if (treadeDiscount) {
		
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val('');
		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');

		var docqty = $("#txtPurchaseQuotationDocQuantity" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowCount).val();

		var baseAmt = parseFloat(docqty) * parseFloat(unitprise);

		var totalAmtInpercntage = parseFloat((baseAmt)) * parseFloat(treadeDiscount) / 100;

		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val(
				totalAmtInpercntage.toFixed(2));

		var finalBaseAmt = baseAmt - totalAmtInpercntage;
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(finalBaseAmt.toFixed(2));
		
		 
		var oldTotaldiscount = $("#txtPurchaseQuotationTotalDocDiscount").val();
		
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
		
		
		$("#txtGRNTotalDocDiscount").val(FinaltradeDiscount);
		
	}
	}
	rowAmtCal(1,rowCount);
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	/*rowCount(1,rowCount);*/
}

/********** calculate total Amount  for purchase Invoice @author Sudhir @Date:14April2016 *********/
function rowAmtCal(id, rowCount) {

	var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(' ');
		return false;
	} 
	var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if(baseAmt == " " || baseAmt == null)
	{
	$("#txtPurchaseQuotationRowAmount").val(' ');
	return false;
	}
	else
	{
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$('#txtPurchaseInvoiceTaxAmntinRs'+ rowCount).val(finalcaltaxanmount); //Add Tax Amount in Rs @Author:Paras  @Date:24nov
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(
				finalRowAmountAddingtax);
	}

}


function clearnewpurchaseIvoice() 
{
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
//	getNextQuotationId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	$("#txtPurchaseOrderRequestNo").val(0);
	$("#txtPurchaseOrderQuatationNo").val(0);
	document.getElementById("chkDirectpurInvoice").checked = false;
	document.getElementById("chkAddtostock").checked = false;
	getNextPurInvoiceId();
	getNextGRNId();	
	
	
	$("#txtGRNTotalDocDiscount").val(0);
	$("#txtGRNTotalDocQty").val(0);
	/**** set all charges defualt values @8june2016 ***/
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
	
	/*** set Defalut todays Date to date @Date25oct2016 @Author Sudhir */
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
   $("#txtPurchaseQuotationDeliveryDate").val(today1);
}


/***************** @Author Sudhir @Date:14april2016 ***********/
function addtostock()
{
	var $radios = $('input:checkbox[name=chkAddtostock]');
	if ($radios.is(':checked') == true)
	{ 
		/*$('#showhidePurchaseInvoice').hide();
		$('#btnAddNew').show();
		$('#btnRemoveNew').show();
		$('#hidePIsaveBtn').css('display','block');
		$("#closeonclick").hide();*/
	}
	if ($radios.is(':checked') == false)
	{
		
		/*$('#showhidePurchaseInvoice').show();
		$('#btnAddNew').hide();
		$('#btnRemoveNew').hide();
		$('#hidePIsaveBtn').css('display','none');
		$("#closeonclick").show();*/
	}
	
}
/* get Next GRN Id for add to stock form Purchase Invoice @date 15April2016  */
function getNextGRNId() {
	var inputs = [];
	inputs.push('action=getGRNNextId');
	inputs.push('tableName=inv_batch_stock_master');
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
			$("#txtGRNDocNo").val(r);
			/*$("#txtGRNDocNoOpeningStock").val(r);*/
		}
	});
}



/****** New Save GRN from purchase Invoice @Date 14 April 2016 @Author sudhir   *********/
function saveGRN() {
	var txtPurchaseFormName = 'GRN'//$("#txtPurchaseFormName").val();
	
	var directORIndirectGRN = 'DirectGRNFromPurchaseInvoice';
	
	/*var $radios = $('input:checkbox[name=chkDirectGRN]');
	if ($radios.is(':checked') == true)
	{
		directORIndirectGRN='DirectGRN';
	}
	if ($radios.is(':checked') == false)
	{
		directORIndirectGRN='IndirectGRN'; 
	}*/
	 
	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	var OpenigStockflage ="N";
	var txtPurchaseQuotationDocNo = $("#txtGRNDocNo").val();
	var txtPurchaseQuotationDate1 = $("#txtPurchaseQuotationDate1").val();				
	var txtPurchaseQuotationMobileNo = $("#txtPurchaseQuotationMobileNo").val();
	var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val();
	var txtGRNPurchaseInvoiceNumber = ''; //$('#txtGRNPurchaseInvoiceNumber').val();
	var txtGRNDeliverychallanNumber = ''; //$("#txtGRNDeliverychallanNumber").val();
	var txtPurchaseQuotationNotes2 = ''; //$("#txtPurchaseQuotationNotes2").val();
	var txtGRNDeliveryDate = $("#txtPurchaseQuotationDeliveryDate").val();
	var vmi=0;
	var txtGRNTotalPendingQty = 0; 
 
	var txtPurchaseQuotationSupplierName = $(
			"#txtPurchaseQuotationSupplierName").val();

	var selDocName = $("#selDocName option:selected").text();
 
	var txtPurchaseQuotationDocSeries = ("GRN"+"1"+txtPurchaseQuotationDocNo+"OLCC").trim(); //$("#txtGRNDocSeries").val();
	
	/*var txtGrnDocSeriesIsEdit = $("#txtGrnDocSeriesIsEdit").val();
	var txtDocSeries;
	if(txtGrnDocSeriesIsEdit == 'isEdit')
	{
			txtDocSeries = txtPurchaseQuotationDocSeries;
	}
	else
	{
		var finaltxtPurchaseGrnDocSeries =txtPurchaseQuotationDocSeries +"No"+":"+txtPurchaseQuotationDocNo;
			txtDocSeries = finaltxtPurchaseGrnDocSeries;
	}*/
	var txtPurchaseQuotationRequestNo = '0'; //$("#txtPurchaseOrderRequestNo").val();
	
	var txtPurchaseOrderQuatationNo = '0';//$("#txtPurchaseOrderQuatationNo").val();
	
	var txtPurchaseQuotationReferenceNo = $("#txtPurchaseQuotationReferenceNo")
			.val();

	var txtPurchaseQuotationAddress = $("#txtPurchaseQuotationAddress").val();
	var sclPurchaseQuotationDocstatus = $("#sclPurchaseQuotationDocstatus option:selected")
			.text();
	
	var txtPurchaseQuotationAmountinlocalcurrency = $(
			"#txtGRNlocalcurrency").val();
	var txtPurchaseQuotationTotalDocDiscount = $(
			"#txtGRNTotalDocDiscount").val();

	var txtPurchaseQuotationTotalDocQty = $("#txtGRNTotalDocQty").val();
	
	//save all Charges @Date:9june2016
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
	
	
	var currentuserName = $("#currentuserName").val();
	var currentUserID = $("#currentUserID").val();
	
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
	alert("Please select GRN date ");
	$("#txtGRNDOCDate").focus();
	return false;
	}
	
/*	var txtGrnSaveOrUpdate = $("#txtGrnSaveOrUpdate").val();
	
	if(!(txtGrnSaveOrUpdate == 'Update'))
		{
		if(txtPurchaseQuotationDate1)
		{
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    
	    var today1 = dd+'/'+mm+'/'+yyyy;
	    
	    if(new Date(txtPurchaseQuotationDate1).getTime() === new Date(today1).getTime())
		   {
		   		    
		   }
	    else
	    {
	    	alert("Please Enter Current Date ");
		    $("#txtGRNDOCDate").focus();
		   return false;
	    }
	   }
		}*/
	
	if(txtPurchaseQuotationSupplierName == "" || txtPurchaseQuotationSupplierName == null)
	{
		alert("Please enter supplier name");
		$("#txtGRNSupplierName").focus();
		return false;
	}
	
	if(txtPurchaseQuotationMobileNo == "" || txtPurchaseQuotationMobileNo == null)	
	{
	alert("Please enter mobile number");
	$("#txtGRNMobileNo").focus();
	return false;
	}
	
	if(txtPurchaseQuotationMobileNo.length < 10 || txtPurchaseQuotationMobileNo.length > 10)
	{
	alert("Mobile number should be of 10 digits");
	$("#txtGRNMobileNo").focus();
	return false;
	}
	 var docseries= $("#txtGRNDocSeries").val();
     if(docseries == 0 || docseries == '-Select-')
     {
	    alert('please select Grn series');
		$("#txtGRNDocSeries").focus();
		return false;
     }
     
    /* if(txtPurchaseQuotationReferenceNo == "" || txtPurchaseQuotationReferenceNo == null)
 	{
 	alert("Please enter reference number");
 	$("#txtGRNReferenceNo").focus();
 	return false;
 	}*/
     
     if(txtPurchaseQuotationAddress == "" || txtPurchaseQuotationAddress == null)
 	{
 	alert("Please enter address");
 	$("#txtGRNAddress").focus();
 	return false;
 	}
     
     var status = document.getElementById("sclPurchaseQuotationDocstatus");
     var docstatus = status.options[status.selectedIndex].text;
     if(docstatus == 0 ||  docstatus == 'Select')
     {
	    alert('Please select GRN Status');
		$("#sclPurchaseQuotationDocstatus").focus();
		return false;
     }
	var materiallist = {
		ltinvetorypurchasecommonitemmaster : []
	};
	var mrllistforMtnc = {ltMaintainanceMachineDTO:null};
	// alert("ROW" +rowCount);
	for ( var i = 1; i <= totaltblsize; i++) {

		if ($("#txtPurchaseQuotationItemNumber" + i).val() != null
				&& $("#txtPurchaseQuotationItemNumber" + i).val() != undefined
				 ) {
		
			var txtPurchaseQuotationItemName = $(
					"#txtPurchaseQuotationItemNumber" + i).val();
			var txtPurchaseQuotationItemName_=$("#txtPurchaseQuotationItemName_" + i).val();
			 
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

			/*var txtPurchaseQuotationTaxCode_ = $(
					"#txtPurchaseQuotationTaxCode_" + i).val();*/
			
			var txtPurchaseQuotationTaxCode_ = "";
			$('#txtPurchaseQuotationTaxCode_'+ i).find('option').each(function() {
				txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
				
			});
			
			txtPurchaseQuotationTaxCode_= txtPurchaseQuotationTaxCode_.substring(0, txtPurchaseQuotationTaxCode_.length-1);
			
			var txtPurchaseQuotationTaxAmount = $(
					"#txtPurchaseQuotationTaxAmount" + i).val();
			 
			var txtPurchaseInvoiceTaxAmntinRs = $("#txtPurchaseInvoiceTaxAmntinRs" + i).val(); // Add Tax amount in Rs @author:paras @Date:29nov
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
			var txtPurchaseMfgDate = $(
					"#txtPurchaseMfgDate_" + i).val();
			var txtPurchaseExpiryDate = $(
					"#txtPurchaseExpiryDate_" + i).val();
			
			
			
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
				
			}
		   if(txtPurchaseQuotationUnitPrice == "" || txtPurchaseQuotationUnitPrice == null){
				
				alert("Please enter item unit price in "+i+" Row");
				$("#txtPurchaseQuotationUnitPrice" + i).focus();
				return false;
				
			}
		   
		   var pattern = /^[0-9]+\.?[0-9]*$/;
			if (!pattern.test(txtPurchaseQuotationUnitPrice)) {
				alert("Unit price should be of digits and a decimal point Only in "+i+" Row !");
				$("#txtPurchaseQuotationUnitPrice"+i).focus();
				return false;
			}
		   
		   if(txtPurchaseQuotationTrdeDiscountPercentage == "" || txtPurchaseQuotationTrdeDiscountPercentage == null){
				
				alert("Please enter item trade discount in "+i+" Row");
				$("#txtPurchaseQuotationTrdeDiscountPercentage" + i).focus();
				return false;
				
			}
		   
		   var pattern = /^[0-9]+\.?[0-9]*$/;
			if (!pattern.test(txtPurchaseQuotationTrdeDiscountPercentage)) {
				alert("Trade Discount should be of digits and a decimal point Only in "+i+" Row !");
				$("#txtPurchaseQuotationTrdeDiscountPercentage"+i).focus();
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
				
				alert("Please enter item tax code in "+i+" Row");
				$("#txtPurchaseQuotationTaxCode_" + i).focus();
				return false;
				
			} 
		  
		  if(txtPurchaseQuotationTaxAmount == "" || txtPurchaseQuotationTaxAmount == null){
				
				alert("Please enter item tax amount in "+i+" Row");
				$("#txtPurchaseQuotationTaxAmount" + i).focus();
				return false;
				
			}
		  
		  if(txtPurchaseQuotationRowAmount == "" || txtPurchaseQuotationRowAmount == null){
				
				alert("Please enter item row amount in "+i+" Row");
				$("#txtPurchaseQuotationRowAmount" + i).focus();
				return false;
				
			}
		  
		  /*
		  if(txtPurchaseQuotationFactor1 == "" || txtPurchaseQuotationFactor1 == null){
				
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
				
			}*/
		  
		  if(txtPurchaseQuotationActualQuantity == "" || txtPurchaseQuotationActualQuantity == null){
				
				alert("Please enter item actual quantity in "+i+" Row");
				$("#txtPurchaseQuotationActualQuantity" + i).focus();
				return false;
				
			}
		  
		  if(txtPurchaseQuotationPendingQuantity == "" || txtPurchaseQuotationPendingQuantity == null){
				
				alert("Please enter item pending quantity in "+i+" Row");
				$("#txtPurchaseQuotationPendingQuantity" + i).focus();
				return false;
				
			}
		/*  if(txtPurchaseMfgDate == "" || txtPurchaseMfgDate == null){
				
				alert("Please select mfg date in "+i+" Row");
				$("#txtPurchaseMfgDate_" + i).focus();
				return false;
				
			}
		  if(txtPurchaseExpiryDate == "" || txtPurchaseExpiryDate == null){
				
				alert("Please select expiry date in "+i+" Row");
				$("#txtPurchaseExpiryDate_" + i).focus();
				return false;
				
			}*/

			materiallist.ltinvetorypurchasecommonitemmaster
					.push({

						inv_purchase_common_item_code :txtPurchaseQuotationItemName,
						inv_purchase_common_item_Name:txtPurchaseQuotationItemName_,
						inv_purchase_common_item_doc_Qty : txtPurchaseQuotationDocQuantity,
						inv_purchase_common_item_unit_price : txtPurchaseQuotationUnitPrice,

						inv_purchase_common_item_trade_discount_per : txtPurchaseQuotationTrdeDiscountPercentage,
						inv_purchase_common_item_trade_discount_rupess:txtPurchaseQuotationTrdeDiscountInRupess,
						inv_purchase_common_item_trade_discount_amount : txtPurchaseQuotationTrdeDiscountAmt,
						inv_purchase_common_item_trade_base_amount : txtPurchaseQuotationBaseAmount,
						inv_purchase_common_item_master_id : txtInvpurchaseCommonItemMasterId,

						inv_purchase_common_item_tax_amount : txtPurchaseQuotationTaxAmount,
						inv_purchase_common_item_tax_amount_rupess :txtPurchaseInvoiceTaxAmntinRs,   //add tax amount in Rs @author:paras @Date:29nov. 
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
						inv_purchase_common_item_doc_series : txtPurchaseQuotationDocSeries,
						inv_batch_stock_item_mfg_date:txtPurchaseMfgDate,
						inv_batch_stock_item_exp_date:txtPurchaseExpiryDate,
						

						item_purchase_factor_uom_1 : txtPurchaseQuotationFactor1UOM,
						item_purchase_factor_uom_2 : txtPurchaseQuotationFactor2UOM,
						item_purchase_factor_uom_3 : txtPurchaseQuotationFactor3UOM,
						item_purchase_factor_uom_4 : txtPurchaseQuotationFactor4UOM,
						inv_batch_stock_fixed_item_qty : txtPurchaseQuotationDocQuantity,
						inv_item_purchase_last_factor_uom :txtPurchaseQuotationLastFactorUOM,

					});

		}

	}
	
	var li = materiallist.ltinvetorypurchasecommonitemmaster.length;
	 if(li == 0)
		{
		alert("Please enter atleast one Item row to Save GRN");
		return false;
		}
	materiallist = JSON.stringify(materiallist);
	mrllistforMtnc = JSON.stringify(mrllistforMtnc);
	var inputs = [];

	inputs.push('action=saveGRNDetail');
	inputs.push('materiallist=' + materiallist);
	inputs.push('mrllistforMtnc=' + mrllistforMtnc);
	inputs.push('txtPurchaseQuotationDocNo=' + txtPurchaseQuotationDocNo);
	inputs.push('txtPurchaseQuotationDate1=' + txtPurchaseQuotationDate1);
	inputs.push('txtPurchaseQuotationMobileNo=' + txtPurchaseQuotationMobileNo);
	inputs.push('txtPurchaseQuotationSupplierCode='	+ txtPurchaseQuotationSupplierCode);
	inputs.push('txtGRNPurchaseInvoiceNumber='	+ txtGRNPurchaseInvoiceNumber);
	inputs.push('txtGRNDeliverychallanNumber='	+ txtGRNDeliverychallanNumber);
	inputs.push('txtPurchaseQuotationSupplierName='	+ txtPurchaseQuotationSupplierName);
	inputs.push('txtDocSeries=' + txtPurchaseQuotationDocSeries);
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
	inputs.push('txtPurchaseQuotationRequestNo=' + txtPurchaseQuotationRequestNo);
	inputs.push('txtPurchaseOrderQuatationNo=' + txtPurchaseOrderQuatationNo);
	inputs.push('txtPurchaseQuotationNotes2=' + txtPurchaseQuotationNotes2);
	inputs.push('txtGRNDeliveryDate=' + txtGRNDeliveryDate);
	inputs.push('OpenigStockflage=' + OpenigStockflage);
	inputs.push('directORIndirectGRN=' + directORIndirectGRN);
	inputs.push('txtGRNTotalPendingQty='+txtGRNTotalPendingQty);
	
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
	inputs.push('vmi=' + vmi);
	
	inputs.push('currentuserName='+currentuserName);
	inputs.push('currentUserID='+currentUserID);
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
			
			/*var txtGrnSaveOrUpdate = $("#txtGrnSaveOrUpdate").val();
			
			if(txtGrnSaveOrUpdate == 'Update')
				{
				alert("Record Updated successfully..!");
				}
			else{
				alert("Record saved successfully..!");
				}
			
			
			$('#Sales_Quotation_Form').removeClass('fade');
			$('#Sales_Quotation_Form').modal('hide');		 			
			window.location.replace("inventory_Good_Receipt_Note.jsp");*/
		}
	});
}


/****************** get general information of party for party mobile number ************/
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
			alert("error");
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
			 
		}
	});
}


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
		$("#txtGross").val(sum.toFixed(2));

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
		//alert($('#txtSplDisc').val());
		totalVatAmt(1, rowCount);
		calculateTotalTax();
		calculateTotalLess();
		calculateNetAmount();
		}
	
	if ($('#txtVat').val() != '' && $('#txtVat').val().length > 0)
		txtVat = parseFloat($('#txtVat').val());
	if ($('#txtSplDisc').val() != '' && $('#txtSplDisc').val().length > 0)
		txtSplDisc = parseFloat($('#txtSplDisc').val());
	 
	finalvatafterreduece =	parseFloat(txtVat) - (parseFloat(txtVat) * parseFloat(txtSplDisc)/100);
	//finalvatafterreduece =	parseFloat(txtVat) - parseFloat(txtSplDisc);
	 
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

/***** calculateTotalLess @Author Sudhir @Date:8june2016****/
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

  
/*** setRoundNetAmount  @author sudhir @Date8june2016 ***/

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


/****showChargesdiv Author Sudhir jadhav @Date 14jully2016****/
function showChargesdiv() {
	 $("#ApplyChargesforItem").show('show');
	 fetchChargesDetail();
} 

/**** hideApplyChargespopaup for item in purchase Invoice Author:sudhir  @Date 14jully2016****/
function  hideApplyChargespopaup() {
	 $('#lstBoxforCharges').html();
	 $("#ApplyChargesforItem").hide('hide');	
	 $("#txtChargesAmt").val('');
	}
/********************************* End hideApplyTaxpopaup for item in purchase Invoice Author:sudhir  @Date 14jully2016 *****************************/

/***fetchChargesDetail for select Box Setting values  @Author Sudhir jadhav @Date : 14jully2016***/
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
/***templet for set charges Name to select box @Author sudhir @Data :14jully2016*/
var selInventoryChargesDetails= "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.CategoryDTO as CategoryDTO}"
	+ "<option  value='{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryName}</option>"
	+ "{#/for}";
/*** End templet for set charges Name to select box @Author sudhir @Data :14jully2016*/


/**** Adding charges to list @Author Sudhir @Date 14jully2016 ***/  
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


/******** remove Item Charges from list purchase Invoice ****Author:Sudhir Date:14jully2016 ****/
function removeItemCharges() {

	$('#lstBoxforCharges option:selected').remove();
}
/******** End remove Item Charges from list purchase Invoice ****Author:Sudhir Date:14jully2016 ****/


/****** * apply Charges for Item in purchase Invoice Author:sudhir Date:14jully2016  ****/
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
/*** *** End applyChargesforItem  in purchase Invoice Author:sudhir Date:14:jully:2016  ***** **/ 


function fetchStateListForRegInvPO(objPurchase) {
	 fetchhospitalstate();
	    var StateType = "state";
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
				var htm= "<option value='0'>Select</option>"; 
				var hoseditState= $("#hoseditState").val();
					for(var row =0 ;row < obj.stateList.length;row ++  ){
						for(var i =0 ;i < objPurchase.ltinventorypartymasteraddressinfodto.length;i ++  )
						{
							
							if(objPurchase.ltinventorypartymasteraddressinfodto[i].party_master_address_info_state == obj.stateList[row].state_id){
								
								htm =htm + "<option value='"+ obj.stateList[row].state_id +"'>"+ obj.stateList[row].state_name +"</option>";
							}
						//$("#txtPurchaseQuotationAddress").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
					//	$("#txtSupplierState").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_state);
						
						}	
					}
					
					$("#txtSupplierState").html(htm);
					
					if(! hoseditState == "" || ! hoseditState == undefined || ! hoseditState == null){
						$("#txtSupplierState").val(hoseditState);
					}
					
			}
		});
	}
function fetchhospitalstate(){
	 
	 jQuery.ajax({
			type : "POST",
			url : "ehat/inventory/fetchhospitalstate",
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				if(response > 0){
					$("#hosState").val(response);
				}
			
			hos =response;
			
			}

		});
}
var hos=0;
var sta=0;
var hos=0;
var sta=0;
function fetchdetailsonedititem()
{
	   var txtPurchaseQuotationDocSeriesIsEdit = $("#txtPurchaseInvoiceDocSeriesIsEdit").val();
	    var partyId =$("#txtPurchaseQuotationDocNo").val();
	    
	    if(txtPurchaseQuotationDocSeriesIsEdit == 'isEdit' ){
	    	
	    	$("#ItemInfoTable > tbody").html('');
	    	var inputs = [];
	    	inputs.push('action=fetchpurchaseInvoiceIteamMasterDetail');
	    	inputs.push('isEdit=no');
	    	inputs.push('partyId=' + partyId);
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
	    					pobj1 = eval('(' + r + ')');
	    					//alert(r);
	    					//fetchPurchaseQuotationMasterNew();
	    					srNumber = 1;
	    					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
	    						$("#ItemInfoTable > tbody")
	    						.append(
	    								"<tr id='deleterow"
	    										+ srNumber
	    										+ "'> <td> <input type='checkbox'  name='checkbox"
	    										+ srNumber
	    										+ "' id='checkbox"
	    										+ srNumber
	    										+ "'/></td> <td>"
	    										+ srNumber
	    										+ "</td>"
	    										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left; width:200px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
	    										+ srNumber
	    										+ "'  value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_Name
	    										+ "'  onkeyup = 'auto(this.id,onchange)' /> "
	    										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_code
	    										+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_master_id
	    										+ "'/> </div> </td>"
	    										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_doc_Qty
	    										+ "'  onblur='totalAmount(this.id,"
	    										+ srNumber
	    										+ ")'> <lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +" </label></td> "
	    										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_unit_price
	    										+ "'style='width:60px;'></td>"
	    										+ ""
	    										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_discount_per
	    										+ "' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onblur='calculTradeDis(this.id,"+srNumber+ ")'></td> <td><input type='text' class='form-control input-SmallText' onkeyup='chKTradAmt(this.id,"+srNumber+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_discount_rupess
	    										+ "'></td>"
	    										+ " <td><input type='text'  readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_discount_amount
	    										+ "' ></td>"
	    										+ "<td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_base_amount
	    										+ "'style='width:60px;'></td> <td><select class='form-control input-SmallText'  style='width:160px;' multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_code + "</option> </select></td>"
	    										+ " <td><input type='text' class='form-control input-SmallText'readonly='' id='txtPurchaseQuotationTaxAmount"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_amount
	    										+ "' onkeyup='rowAmtCal(this.id,"
	    										+ srNumber
	    										+ ")'></td> "
	    										+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' id='txtPurchaseInvoiceTaxAmntinRs"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_amount_rupess
	    										+ "' readonly='' ></td>"
	    										+ "<td><input type='text' readonly=''class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_row_amount
	    										+ "'style='width:60px;'></td>"
	    										+ "<td><input type='text' class='form-control input-SmallText'maxlength='5' id='txtPurchaseQuotationFactor1"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor1
	    										+ "'><lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
	    										+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor2"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor2
	    										+ "'><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
	    										+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor3"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor3
	    										+ "'><lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +" </label></td>"
	    										+ " <td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor4"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor4
	    										+ "'><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
	    										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_actural_qty
	    										+ "' onblur='pendingAmount(this.id,"
	    										+ srNumber
	    										+ ")'></td> "
	    										+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_pending_qty
	    										+ "'></td> "
	    										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
	    										+ srNumber
	    										+ "' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_batch_No
	    										+ "'></td>"
	    										+ "  <td><input type='text' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
	    										+ srNumber
	    										+ "'onclick = 'getMfgandexpyDate(this.id,"
	    										+ srNumber
	    										+ ")'; style='float:left;' value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_mfg_Date
	    										+ "' > </td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
	    										+ srNumber
	    										+ "' onclick ='getMfgandexpyDate(this.id,"
	    										+ srNumber
	    										+ ")'; style='float:left;;'value='"
	    										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_Expiry_Date
	    										+ "' > </td> </tr>");
	    					
	    						var   state = $("#txtSupplierState").val();
	    						var   hostate = $("#hosState").val();
	    							 if(state == hostate)
	    							{
	    							
	    								$("#txtPurchaseQuotationTaxAmount"+srNumber).hide();
	    								
	    								//totalAmount();
	    							}else{
	    								$("#txtPurchaseQuotationTaxCode_"+srNumber).hide();
	    							//	$("#txtPurchaseQuotationTaxCode_"+srNumber).val("0.0");
	    								
	    								
	    							
	    								}
	    						
	    						/*if(state =="MAHARASHTRA" || state == "Maharashtra" || state == "maharashtra")
	    						{
	    						
	    							$("#txtPurchaseQuotationTaxAmount"+srNumber).hide();
	    							
	    							//totalAmount();
	    						}else{
	    							
	    							$("#txtPurchaseQuotationTaxCode_"+srNumber).val("0.0");
	    						
	    							}*/


	    				$("#RowCount").val(srNumber);
	    				srNumber++;
	    				test++;
	    					}
	    					 auto("txtPurchaseQuotationItemName_","onload");
	    					totalDocQtyPQ();
	    					totalDocDiscountPQ();

	    					var txtEmptyItem = $("#txtEmptyItem").val();
	    					//auto(txtEmptyItem, "onload");

	    					var totaltblsize = $("#RowCount").val();
	    					$("#totaltblsize").val(totaltblsize);
	    				}
	    			});
	    }
}
