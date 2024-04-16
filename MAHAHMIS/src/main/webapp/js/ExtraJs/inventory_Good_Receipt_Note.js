var rowCount = 1;
var test = 0;
var isNew = 0;  
var srNumber = 1;
var minLen;
var maxLen;
var mrlMaindiv = "";
 
/*************************************GEt pending orders form order table*****************************************/

/*function getPendingOrder() {
 
	var inputs = [];
	inputs.push('action=getPendingOrder');
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
			//alert(r);
			pobj1 = eval('(' + r + ')');
			//alert(r);
			$("#txtPurchaseOrderList").setTemplate(selInventoryPendingOrder);
			$("#txtPurchaseOrderList").processTemplate(pobj1);
		}
	});
}*/

var selInventoryPendingOrder = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltinvetorypurchaseordermaster as ltinvetorypurchaseordermaster}"
	
	+ "{#if $T.ltinvetorypurchaseordermaster.inv_purchase_order_master_form_Name == 'PURCHASE ORDER' && $T.ltinvetorypurchaseordermaster.inv_purchase_common_master_order_place_flag !='1'}" +
			"<option  value='{$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_doc_no}'>{$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_doc_Series}</option>"
	+ "{#/if}{#/for}";



  

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
			$("#txtGRNDocNoOpeningStock").val(r);
		}
	});
}
 // featch Document Series for for Grn  Date 20:8:2015

function fetchDocumentNameListforGRN() {
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
			//alert(r);
			$('#AjaxResopnse').html(r);
			pobj1 = eval('(' + r + ')');
			// alert(r);
			$("#selDocName").setTemplate(selInventoryDocumentTemplate);
			$("#selDocName").processTemplate(pobj1);
			
			/*$("#selDocNameOpnigStock").setTemplate(selInventoryDocumentTemplate);
			$("#selDocNameOpnigStock").processTemplate(pobj1);*/

		}
	});
}
var selInventoryDocumentTemplate = "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
		+"{#if $T.lstDocumentNUmberDto.document_series == 'GRN'}"
		+ "<option id='seriesId' value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
		+ "{#/for}";

function getSeries(id) {
	var obj = $("#AjaxResopnse").html();
	var txtId1 = $('#txtGRNDocNo').val();
	var txtId2 = $('#txtGRNDocNoOpeningStock').val();
	objDocument = JSON.parse(obj);

	for ( var i = 0; i < objDocument.lstDocumentNUmberDto.length; i++) {
		if (objDocument.lstDocumentNUmberDto[i].document_numbering_id == id) {
			$("#txtGRNDocSeries").val(
					objDocument.lstDocumentNUmberDto[i].document_prefix
							+ objDocument.lstDocumentNUmberDto[i].document_number
							+ txtId1
							+ objDocument.lstDocumentNUmberDto[i].document_suffix);
			$("#txtGRNDocSeriesOpnigStock").val(objDocument.lstDocumentNUmberDto[i].document_prefix + objDocument.lstDocumentNUmberDto[i].document_number + txtId2 + objDocument.lstDocumentNUmberDto[i].document_suffix);

		}
	}

}


/***** AutoSuggestion Code for item  openig stock modifeid @Date 12april2016  @author Sudhir modified @Date 17june2106 item qty === actual Qty modified @Date 20sep2016 @Author Sudhir Jadhav assign item Qty to txtPurchaseQuotationChangingItemQty ********** */

function auto(inputID, typeauto) {
	 var  txtPurchaseOrderSupplierName =$("#txtGRNSupplierName").val();
	 var  txtSupplierState =$("#txtSupplierState").val();
	if(typeauto !="onload"){
		 if(txtPurchaseOrderSupplierName ==null || txtPurchaseOrderSupplierName==""){
			 if(txtSupplierState ==null || txtSupplierState=="" || txtSupplierState==0){
				 alert("Please Select Supplier Name And Supplier State!!");
				 $('#' + inputID).val("");
				 return false;
			 }
			
		 }	
	}
	
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

			$("#ItemInfoTable input[type=checkbox]").each(function(){

				  $(this).prop("checked",false);
				});
			
			toCreateDivGRN();
				
			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var currentcode = item.value;
			//alert(item.value);
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
						
						$('#txtlastUom' +idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenLastUOM);
						
						$('#txtPurchaseQuotationDocQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
						$('#txtPurchaseQuotationChangingItemQty' + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
						$('#txtPurchaseQuotationActualQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
						$('#txtPurchaseQuotationLastFactorUOM' +idValue).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenLastUOM);
						/*$('#txtPurchaseQuotationPendingQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);*/
						
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
							
							//var state = $("#txtSupplierState").val();
							//var state = $("#selSupplierState").val();
						/*	var option = "";
							option = option
								+ "<option value="
								+ finalrat
								+ ">"
								+ finalrat
								+ "</option>";
							*/
							var option= finalrat;
							var state = $("#txtSupplierState").val();
							var hostate = $("#hosState").val();
							if(state ==hostate || state == hostate || state == hostate)
							{
								$("#txtPurchaseQuotationTaxCode_"+idValue).val(option);
								
							//	$("#txtPurchaseQuotationTaxCode_"+idValue).append(option);
								//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
								$("#txtPurchaseQuotationTaxAmount_"+idValue).val("0.0").hide();
								$("#txtPurchaseQuotationTaxAmount_"+idValue).val(sumofRate);
								//totalAmount();
							}else{
								
								$("#txtPurchaseQuotationTaxCode_"+idValue).val("0.0").hide();
								$("#txtPurchaseQuotationTaxAmount_"+idValue).val(sumofRate);
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
						
							}
						
						//$('#txtPurchaseQuotationDocQuantity' + idValue);
						totalAmount();
						
						//$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
						break;

								
								 
							}
						}					});

		}
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

}*/

/************************************* featch grn master data onlode ****************************************/
/*
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
			// alert(r);
			pobj1 = eval('(' + r + ')');
			$("#documentContent").setTemplate(inventoryGRNTemp);
			$("#documentContent").processTemplate(pobj1);
			$("#docuemntAjaxResp").html(r);
		}
	});
}

 */

/** ***************** ON  Edit and view Grn master and slave Details  Author :sudhir  Modifid Date:24:11:2015 ****************** */

function viewGRNMasterDetails(partyId) {
	$("#saveGRN").hide();
	$("#removebtn").hide();
	/*$('#taxcodeGst').css('display','none');
	$('#taxcodeIGst').css('display','none');*/
	$('#taxAmount').css('display','none');
	$('#divtxtGRNwithoutPO').css('display','none');
	$('#divtxtPartialGRNDetails').css('display','none');
	
	
	$('#Sales_Quotation_Form').find('input, text').attr("readonly", "readonly");
	 	
	purchaseQuatViewRefresh();
	$("#selDocName").text("");
	document.getElementById("selDocName").disabled = true;
	$("#closeonclick").hide();
	$("#txtGrnDocSeriesIsEdit").val('isEdit');
	$('#iHideGRNSaveBtn').css('display','block');
	$("#divtxtPurchaseOrderList").hide();
	$("#txtGrnSaveOrUpdate").val('Update');
	
	var obj = $("#docuemntAjaxResp").html();
	//alert(obj);
	var objPurchase = JSON.parse(obj);
	var state = 0; //added by paras
	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no == partyId) {
			var txtPurchaseQuotationDocNo = $("#txtGRNDocNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no);
			/**********************************date convert***************************************/	
			/*var str=(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_date).split("-");
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];*/
			
			$("#txtGRNDOCDate").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_date);
			
			/*var txtPurchaseQuotationDate1 = $("#txtPurchaseQuotationDate1")
					.val();*/
			var txtPurchaseQuotationMobileNo = $("#txtGRNMobileNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_mobile_number);

			var txtGRNPurchaseInvoiceNumber = $("#txtGRNPurchaseInvoiceNumber").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_purchase_invoice_number);
			var txtGRNDeliverychallanNumber = $("#txtGRNDeliverychallanNumber").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_purchase_delivery_challan_number);

			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO')
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Id);

			var txtPurchaseQuotationSupplierName = $(
					"#txtGRNSupplierName")
					.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Name);
			document.getElementById("txtGRNSupplierName").disabled = true;
			$("#txtGRNPurchaseInvoiceNumber1").css("display", "none");
			$("#txtGRNDeliverychallanNumber1").css("display", "none");
		
			// $("#selDocName").hide();
			// option:selected").text(objPurchase.ltinvetorypurchasecommonmaster[rowCount].);
			var txtPurchaseQuotationDocSeries = $(
					"#txtGRNDocSeries")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_Series);
			var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;
			var txtPurchaseQuotationReferenceNo = $(
					"#txtGRNReferenceNo")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_reference_no);
			var txtPurchaseQuotationAddress = $("#txtGRNAddress")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Address);
			var sclPurchaseQuotationDocstatus = $(
					"#sclGRNDocstatus option:selected")
					.text(
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
			
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderQuatationNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_batch_order_No_fk);
			
			var txtGRNDeliveryDate = $("#txtGRNDeliveryDate").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_purchase_delivery_date);
			
			$("#txtGRNTotalPendingQty").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_total_item_pending_qty);
			
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
			if(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_remark==null || objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_remark=="null"){
				$("#txtGRNArermark").val("-");

			}else{
				$("#txtGRNArermark").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_remark);
			}
			//check wether is expense bills
			if(objPurchase.ltinvetorypurchasecommonmaster[rowCount].txtagchallan=="Y"){
				$("#txtagchallan").attr('checked', true);
				$("#divtxtchallan").css("display", "block");
				$("#divtxtpo").css("display", "none");
				$("#chkapndchllan").attr('readonly', false);
				$("#saveGRN").show();
			}
		//end	
			//add by paras for edit supplier state	 
			if(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState == 0 || objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState ==null || objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState ==undefined ){
				 
			}else{
				 $("#hoseditState").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState);
				 state = objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_SupplierState;
			}
			//end
			
			 document.getElementById("chkVMI").disabled = true;
			if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_common_master_vmi == 1) {
				$("#chkVMI").prop('checked', true);
				
			}
			
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
	
    var masterId = $('#txtVendorCodePO').val();
	 var grnId = $("#txtGRNDocNo").val();
	fetchhospitalstate();
	fetchtermsandconditionsDetailsforGrn(grnId);
	fetchPartyMasterContactsDetailsPO(masterId);
	fetchPartyMasterAddressDetailsPO(masterId);
	fecthPartyOtherInfoPO(masterId);
	

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
					//fetchPurchaseQuotationMasterNew();
					srNumber = 1;
					
					var itemqtyAdd = 0;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
						itemqtyAdd = parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_actural_qty) + parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock__item_pending_qty);
						var batchstateid= parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].txtstateid);
						var appendpo= parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].txtPurchaseAppPO);
						
						/*alert("itemqtyAdd :" + itemqtyAdd);
						alert("Actual qty " +pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_actural_qty);
						alert("pending qty " + parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock__item_pending_qty));*/
						$("#ItemInfoTable > tbody")
						.append(
								"<tr id='deleterow"
										+ srNumber
										+ "'> <td> <input type='checkbox'  name='checkbox"+ srNumber
										+ "' id='checkbox"
										+ srNumber
										+ "'/></td>" +"<td> "+ srNumber + "</td>"
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left;width:250px;' readonly='' class='typeahead form-group'  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_item_name
										+ "'  onkeyup = 'auto(this.id,onchange)' onkeypress='return validateOnlyName(event);' /> "
										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_code
										+ "' readonly =''/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_id
										+ "'/> </div> </td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
										+ srNumber
										+ "' value='"
										+itemqtyAdd
										+ "'  onblur='totalAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' readonly ='' ><input type='hidden' id='txtPurchaseQuotationChangingItemQty"
								    	+ srNumber
									    + "' value='"+ itemqtyAdd+ "' /> <lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_rate
										+ "' onkeypress='return validateNumbers(event);' readonly = '' ></td>"
										+ ""
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_per
										+ "' onblur='calculTradeDis(this.id,"
										+ srNumber
										+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' readonly ='' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_rupess
												+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' readonly =''></td>"
										+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_discount_amount
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ "<td><input readonly='' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_base_amount
										+ "' onkeypress='return validateNumbers(event);'readonly ='' ></td>"
										+ " <td style='display: none'><select class='form-control input-SmallText'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount + "</option>  </select></td> <td style='display: none'><input type='text'  readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount_"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' readonly ='' ></td> "
			
										+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxGSTPercent"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
										+ "' readonly='' ></td>"
										+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxIGSTPercent"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
										+ "' readonly='' ></td>"
									
										+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxAmtinRs"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess
										+ "' readonly='' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText' readonly=''  id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_amount
										+ "'></td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor1
										+ "' onkeypress='return validateNumbers(event);' readonly =''> <lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor2
										+ "' onkeypress='return validateNumbers(event);' readonly =''><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor3
										+ "' onkeypress='return validateNumbers(event);' readonly =''><lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor4
										+ "' onkeypress='return validateNumbers(event);' readonly =''><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_actural_qty
										+ "' onkeyup='pendingAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' readonly =''> <input type='hidden' id='txtPurchaseQuotationhiddenActualQuantity"+srNumber+"' value='0'/> </td> "
										+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock__item_pending_qty
										+ "' onkeypress='return validateNumbers(event);' readonly ='' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
										+ srNumber
										+ "' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_code + "'></td>"
										+ "<td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"+srNumber+"' onclick = 'getMfgandexpyDate(this.id,"+ srNumber+ ")'; style='float:left;' value='"+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_mfg_date +"' readonly =''> </td>"+
										"<td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"+ srNumber	+"' onclick ='getMfgandexpyDate(this.id,"+srNumber+ ")'; style='float:left;' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_exp_date+"'></td>" + "</tr>");
							//alert(pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess);
					
		             	var hostate = $("#hosState").val();
		             	if(batchstateid > 0){
		             		if(batchstateid ==hostate || batchstateid == hostate || batchstateid == hostate)
							{
								
								
								//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
								$("#txtGRNTaxIGSTPercent"+srNumber).hide();
								//$("#txtGRNTaxIGSTPercent"+idValue).val(sumofRate);
								//totalAmount();
							}else{
								
								$("#txtGRNTaxGSTPercent"+srNumber).hide();
							
								}
		             	}else{
		             		if(state ==hostate || state == hostate || state == hostate)
							{
								
								
								//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
								$("#txtGRNTaxIGSTPercent"+srNumber).hide();
								//$("#txtGRNTaxIGSTPercent"+idValue).val(sumofRate);
								//totalAmount();
							}else{
								
								$("#txtGRNTaxGSTPercent"+srNumber).hide();
							
								}
		             	}
						
						
						/*if( !($("#txtGRNTaxIGSTPercent"+srNumber).val() ) ==""){
								$("#txtGRNTaxGSTPercent"+srNumber).val("0");
								
							}
						
						if( !($("#txtGRNTaxGSTPercent"+srNumber).val() ) =="0" ||
								!($("#txtGRNTaxGSTPercent"+srNumber).val() ) == "" ){
							$("#txtGRNTaxIGSTPercent"+srNumber).val("0");
							
						}*/
						
						if( ($("#txtPurchaseQuotationBatchNo"+srNumber).val() ) == null 
								|| ($("#txtPurchaseQuotationBatchNo"+srNumber).val() ) =="null"){
							
							$("#txtPurchaseQuotationBatchNo"+srNumber).val("");
							$("#txtPurchaseQuotationBatchNo"+srNumber).attr("readonly", "readonly");
						}
						
						
				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
					}
					// auto("txtPurchaseQuotationItemName_","onload");
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

function deleteGRNMasterDetails(id) {
	var didConfirm = confirm("Are you sure to delete?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteGRNMasterDetail');
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
				fetchGRNMasterDetails("no","onload");
			}
		});
	}
}

/********************************tamplet variable  for set grn master data on lode*********************************/
 var SrNo =1;
/*var inventoryGRNTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
		+ "<thead class='cf' style='background: white;'><tr>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Grn Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th> </tr></thead>"
		+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}<tr class='center'>"
		+ "{#if $T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_form_Name == 'GRN' || $T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_form_Name == 'Goods Reciept'}<td>{SrNo++}</td><td id='id{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}</td><td id='desc{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_Supplier_Name}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewGRNMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deleteGRNMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no})\"><i class='fa fa-trash-o'></i></button></td><td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal' onclick=\"printGRNMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no})\" value='EDIT'><i class='fa fa-print'></i></button></td></tr>{#/if}{#/for}</table>"*/

 /* new tamplet for remove  delete option  @Date 31march2016  @Author sudhir*/
 var inventoryGRNTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
		+ "<thead class='cf' style='background: white;'><tr>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Grn Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>View</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th> </tr></thead>"
		+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}<tr class='center'>"
		+ "{#if $T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_form_Name == 'GRN' || $T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_form_Name == 'Goods Reciept'}<td>{SrNo++}</td><td id='id{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}</td><td id='desc{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_Supplier_Name}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewGRNMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no})\" value='EDIT'><i class='fa fa-eye View'></i></button></td>"
		+ "</td><td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal' onclick=\"printGRNMasterDetailsNEW({$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no})\" value='EDIT'><i class='fa fa-print'></i></button></td></tr>{#/if}{#/for}</table>";

/********************** print GrN Details*************************************/		
/*function printGRNMasterDetails(partyId)
{

var obj = $("#docuemntAjaxResp").html();

var objPurchase = JSON.parse(obj);

var myObj = "";

for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

	if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no == partyId) {
		
		
		
		myObj = objPurchase.ltinvetorypurchasecommonmaster[rowCount];
		break;
		
	}
}
		var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val(myObj.inv_batch_stock_master_Supplier_Id);
 		var txtPurchaseQuotationDocSeries = $("#txtGRNDocSeries").val(myObj.inv_batch_stock_master_doc_Series);
 		$("#txtGRNDeliveryDate").val(myObj.inv_batch_stock_master_purchase_delivery_date);
 		
 		var txtVendorCode = $("#txtVendorCodePO").val();
 		 var txtGRNDocSeries =  $("#txtGRNDocSeries").val();
 		 var txtGRNDeliveryDate = $("#txtGRNDeliveryDate").val();
 		
 		 alert(txtGRNDeliveryDate);
 		 return false;
 		 
 		window.open("Inventory_Grn_print.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtGRNDocSeries="+txtGRNDocSeries+"&txtGRNDeliveryDate="+txtGRNDeliveryDate);

}*/		
	function refreshPopUp() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	getNextQuotationId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');

}

function refresh()
{
	window.location.reload("inventory_Good_Receipt_Note.jsp");
}

function clearPopUp() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
//	getNextQuotationId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	

}

var selInventoryPendingQuotation = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}"
	
	+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_form_Name == 'PURCHASE ORDER' && $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_status!='Closed'  && $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_status!='Cancelled'}" +
			"<option  value='{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_Series}</option>"
	+ "{#/if}{#/for}";



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
/*****MODIFIED @Date16june2016 Author Sudhir jadhav reson :actual qty and item Qty make it equal ******/
function totalAmount(id, rowCount) {
	// alert(id);
	var quantity = $('#' + id).val();

	var PQ ="PurchaseQuotation";
	calculateFactoring(quantity,rowCount,PQ);
	
	var rate = $('#txtPurchaseQuotationUnitPrice' + rowCount).val();

	$('#txtPurchaseQuotationActualQuantity' + rowCount).val(quantity);
	$('#txtPurchaseQuotationChangingItemQty'+ rowCount).val(quantity);
	/*$('#txtPurchaseQuotationPendingQuantity' + rowCount).val(quantity);*/
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

	$("#txtGRNTotalDocQty").val(sum);
	$("#txtGRNTotalDocQtyOpnigStock").val(sum);
	totalGrossAmt(1,rowCount);

}

/********** Calculate treade discount AMt  MODIFIED @author kING  @DATE 13 APRIL 2016 ******************/
/*function calculTradeDis(id, rowCount) {
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
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(finalBaseAmt);
		
		 
		var oldTotaldiscount = $("#txtGRNTotalDocDiscount").val();
		if(oldTotaldiscount == ''||oldTotaldiscount == null || oldTotaldiscount == undefined)
			{
			 $("#txtGRNTotalDocDiscount").val(totalAmtInpercntage);
			}
		else
			{
			var finaltotalDiscount = (parseFloat(oldTotaldiscount) + parseFloat(totalAmtInpercntage)).toFixed(2);
			$("#txtGRNTotalDocDiscount").val(finaltotalDiscount);
			}
	} else {

		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(baseAmt);
	}
	
	rowAmtCal(1,rowCount);
}*/
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
		$("#txtPurchaseQuotationBaseAmount"+rowCount).val(baseAmt);
		
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

		var baseAmt = docqty * unitprise;

		var totalAmtInpercntage = baseAmt * treadeDiscount / 100;

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
/********** calculate total Amount  @Author sudhir Date:13April2016 *********/
/*function rowAmtCal(id, rowCount) {

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
		var sum = 0;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
		sum = parseFloat(baseAmt) + parseFloat(taxAmt);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(sum);
	}

}*/
/* **** modified date:19APril2016 @Author sudhir modified Date 16sep2016 *****/
function pendingAmount(id, rowCount) {
	
	$("#txtPurchaseQuotationPendingQuantity"+rowCount).val(0);
	var actualquantity = $('#' + id).val();
	var quantity = $('#txtPurchaseQuotationDocQuantity' + rowCount).val();
	if(actualquantity=="")
		{
		 $("#txtPurchaseQuotationPendingQuantity"+rowCount).val('0');
		 $("#lblPurchaseQuotationDocQuantity" +rowCount).text(quantity);
		 $("#txtPurchaseQuotationChangingItemQty" +rowCount).val(quantity);
		 /*$('#' + id).val(quantity);*/
		 totalPendingQtyGRN();
		 
		/* this used for calculation the base AMT 19sep2016 */
		 totalAmountforParialGRN(1,rowCount);
		 		 		 
		 totalVatAmt(id, rowCount);
		 rowAmtCal(id, rowCount);
		 calcuatSumforTradeDisAmtforPartialGRN();
		 calcuatSumforitemQTYforPartialGRN();
		 
		 totalGrossAmt(id, rowCount);
		 calculateNetAmount();
		 return false;
		//$('#' + id).val('0');
		}
	
	if (parseInt(actualquantity) > parseInt(quantity)) {
		alert("Please enter valid quantity");
		$('#' + id).val(quantity);
		$("#lblPurchaseQuotationDocQuantity" +rowCount).text(quantity);
		$("#txtPurchaseQuotationChangingItemQty" +rowCount).text(quantity);
		//$('#' + id).focuse();
		totalPendingQtyGRN();
		
		/* this used for calculation the base AMT 19sep2016 */
		 totalAmountforParialGRN(1,rowCount);
		 totalVatAmt(id, rowCount);
		 rowAmtCal(id, rowCount);
		 calcuatSumforTradeDisAmtforPartialGRN();
		 calcuatSumforitemQTYforPartialGRN();
		 
		 totalGrossAmt(id, rowCount);
		 calculateNetAmount();
		 
		return false;
	} else {
		
		 var pendingQty = parseInt(quantity) - parseInt(actualquantity);
		 $("#txtPurchaseQuotationPendingQuantity"+rowCount).val(pendingQty);
		 
		 $("#lblPurchaseQuotationDocQuantity" +rowCount).text(actualquantity);
		
		 //this store's item qty changing which is entering in order Qty.
		 $("#txtPurchaseQuotationChangingItemQty" +rowCount).val(actualquantity);
		 
		// ss alert(quantity + "-" +actualquantity);
		/*
		 * $('#txtPurchaseQuotationPendingQuantity' + rowCount).val( quantity -
		 * actualquantity);
		 */
	}

	totalPendingQtyGRN();
	/* this used for calculation the base AMT 19sep2016 */
	 
	 totalAmountforParialGRN(1,rowCount);
	
	 totalVatAmt(id, rowCount);
	 rowAmtCal(id, rowCount);
	 calcuatSumforTradeDisAmtforPartialGRN();
	 calcuatSumforitemQTYforPartialGRN();
	
	 totalGrossAmt(id, rowCount);
	 calculateNetAmount();
}

/**** total Doc Qty PQ @author Sudhir modified @Date:15April2016*/
function totalDocQtyPQ() {
	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	// var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= totaltblsize; i++) {
		totalQty = $("#txtPurchaseQuotationDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}
 
	$("#txtGRNTotalDocQty").val(sum);
	$("#txtGRNTotalDocQtyOpnigStock").val(sum);
	$("#RowCount").val(RowCount);

}


/************** Total Doc Discount ***********/

function totalDocDiscountPQ() {
	var sum = 0;
	var tradeAmt;
	var RowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	for ( var i = 1; i <= totaltblsize; i++) {
		tradeAmt = $("#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
		if (tradeAmt == null || tradeAmt == undefined || tradeAmt == '') {
			var flag = 1;
		} else 
		{
			sum = (parseFloat(sum) + parseFloat(tradeAmt)).toFixed(2);;
		}

	}

	$("#txtGRNTotalDocDiscount").val(sum);
	//$("#txtGRNTotalDocQtyOpnigStock").val(sum);
	$("#RowCount").val(RowCount);

}


/************** Adding row dynamically in table for Main GRN @author Sudhir @Date:12aparil2016 modified @Date 20sep2016 @author Sudhir************/


function toCreateDivGRN() {
	$('#iHideGRNSaveBtn').css('display','block');
	
	/*$('#taxcode').css('display','block');
	$('#taxAmount').css('display','block');*/
	
	$("#closeonclick").hide();
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
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;width:160px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id,onchange)' style='width:80px;' />"
								/*+ rowCount
								+ ",onchange)' />"*/
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty"+rowCount+"' value='0' /> <input type='hidden' id='txtlastUom"+rowCount+"'value=''> <label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'style='width:60px;' ></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText'  onkeyup ='chkTradAmtorPercentage(this.id,"+rowCount+")' onblur='calculTradeDis(this.id,"+rowCount +")' id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td><td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "'   ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'style='width:60px;' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td><td><div id ='divtxtPurchaseQuotationTaxCode_'><input type='text' class='typeahead form-control input-SmallText'"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxCode_"
								+ rowCount
								+ "' onkeyup='autotaxCodeGrn(this.id,onchange)'></div></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ "),autotaxCodeGrn(this.id,onchange)' id='txtPurchaseQuotationTaxAmount_"
								+ rowCount
								+ "'  ></td> "

                                + "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxAmtinRs"
							    + rowCount
							    + "' value='' readonly='' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText'readonly='' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'style='width:60px;' ></td>"
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
								+ ")' onkeypress='return validateNumbers(event);' /><input type='hidden' id='txtPurchaseQuotationhiddenActualQuantity"+rowCount+"' value='0' /></td> "
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
								+ ")'; style='float:left;;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
	//	auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
		autotaxCodeGrn("txtPurchaseQuotationTaxCode_" + rowCount, "onload");

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
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;width:260px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id,onchange)' style='width:80px;'/>"
								/*+ rowCount
								+ ",onchange)'/>"*/
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' > <input type='hidden' id='txtPurchaseQuotationChangingItemQty"+rowCount+"' value='0' /> <input type='hidden' id='txtlastUom"+rowCount+"'value=''><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup ='chkTradAmtorPercentage(this.id,"+rowCount+")' onblur='calculTradeDis(this.id,"+rowCount +")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td><td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "'style='width:100px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:190px;'></td><td>" 
								
                                + "<input type='text' class='typeahead form-control input-SmallText'"
								+" id='txtPurchaseQuotationTaxCode_"
								+ rowCount
								+ "' onkeyup='autotaxCodeGrn(this.id,onchange)'  style='width:80px;'>"
								
								/*+"<select style='width:120px;' class='form-control input-SmallText' multiple='multiple'  onclick='multipletaxCalculation(this.id," + rowCount + ")' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCode_"
								+ rowCount
								+ "'></select>"*/
								+"</td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ "),autotaxCodeGrn(this.id,onchange)' id='txtPurchaseQuotationTaxAmount_"
								+ rowCount
								+ "'     style='width:80px;'></td> "
							    + "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxAmtinRs"
								+ rowCount
								+ "' value='' readonly='' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:160px;' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "'style='width:60px;'><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "'style='width:60px;'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'/> <input type='hidden' id='txtPurchaseQuotationhiddenActualQuantity"+rowCount+"' value='0'/></td> "
								+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' value ='0'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowStatus"
								+ rowCount
								+ "' style='width:60px;' ></td>"
								+ "  <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;width:80px;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;width:80px;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
//	auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
	autotaxCodeGrn("txtPurchaseQuotationTaxCode_" + rowCount, "onload");
		rowCount++;
	}

}


/************** Remove  row dynamically in table modified @date 8june2016 add call function****************/

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
	totalPendingQtyGRN();
	
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
}
*/
//AutoSuggestion Code. modified Date 18April2018 ............

function setSupplierNameForNewGRN(inputID, type) {

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
							$("#txtGRNSupplierName").val('');
							$("#txtGRNSupplierName").focus();

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
								$('#txtGRNSupplierName')
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
			/*
			 * // alert("Id=" + item.value + " Value=" + item.text);
			 * 
			 * $('.alert').show().html( 'You selected <strong>' + item.value + '</strong>:
			 * <strong>' + item.text + '</strong>');
			 */
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
/**************************************************show order Details on get Order********************************************************* */
/*function viewPurchaseOrderMasterDetails(partyId) {

	clearPopUp();
	 
	$('#iHideGRNSaveBtn').css('display','block');
	//$("#txtVendorCode").val(partyId);
	 
	var inputs = [];
	inputs.push('action=fetchPurchaseOrderItemMasterDetail');
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
					pobj1 = eval('(' + r + ')');
					//fetchPurchaseQuotationMasterNew();
					srNumber = 1;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
						$("#ItemInfoTable> tbody")
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
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' readonly=''style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_Name
										+ "'  onkeyup = 'auto(this.id,onchange)' onkeypress='return validateOnlyName(event);' /> "
										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_code
										+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_master_id
										+ "'/> </div> </td>"
										+ "<td><input type='text'  class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_doc_Qty
										+ "'  onblur='totalAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_unit_price
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ ""
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_per
										+ "' onblur='calculTradeDis(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' ></td>"
										+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_amount
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_base_amount
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ " <td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_row_amount
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor1
										+ "' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor2
										+ "' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor3
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor4
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_actural_qty
										+ "' onblur='pendingAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationPendingQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_pending_qty
										+ "' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowStatus"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_row_status
										+ "' onkeypress='return validateOnlyName(event);'></td>"
										+ " <td><input type='text' readonly='readonly'class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ srNumber
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ srNumber
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;;' > </td> </tr>");

				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
			}
			// auto("txtPurchaseQuotationItemName_","onload");
					totalDocQtyPQ();
					totalDocDiscountPQ();
			var txtEmptyItem = $("#txtEmptyItem").val();
			//auto(txtEmptyItem, "onload");
			
			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
			isNew=1;
		}

	});
		
	var obj = $("#docuemntAjaxRespfororderMaster").html();
 
	objPurchase = JSON.parse(obj);

	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchaseordermaster.length; rowCount++) {
		if (objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_no == partyId) {

			//alert(obj);
			var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo")
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_no);
			
			*//**********************************date convert***************************************//*	
			var str=(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_date).split("-");
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];
			$("#txtGRNDOCDate").val(leaddate);
			
			
			
			
			var txtPurchaseQuotationDate1 = $("#txtPurchaseOrderDatePRL")
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_common_master_create_date);
			var txtPurchaseQuotationMobileNo = $(
					"#txtGRNMobileNo")
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_mobile_number);
			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO')
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_Supplier_Id);
			var txtPurchaseQuotationSupplierName = $(
					"#txtGRNSupplierName")
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_Supplier_Name);
			// $("#selDocName").hide();
			// option:selected").text(objPurchase.ltinvetorypurchaseordermaster[rowCount].);
			var txtPurchaseQuotationDocSeries = $(
					"#txtGRNDocSeries").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_Series);
			//var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;
			
			var txtPurchaseQuotationReferenceNo = $("#txtGRNReferenceNo").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_reference_no);
			
			var txtPurchaseQuotationAddress = $("#txtGRNAddress").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_Address);
			var sclPurchaseQuotationDocstatus = $("#sclGRNDocstatus option:selected").text(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_status);
			var txtPurchaseQuotationTotalDocDiscount = $("#txtGRNTotalDocDiscount").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_total_discount);
		
			var txtPurchaseQuotationTotalDocQty = $("#txtGRNTotalDocQty")
					.val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_total_doc_qty);

			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderRequestNo")
			.val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_purchase_Request_No);
			
		}
	}
	
	var masterId = $('#txtVendorCodePO').val();
	
	
	//alert("Id=" + item.value + " Value=" + item.text);
	//var masterId = item.value;
  //  alert("master id on get order"+masterId);
	getGeneralInfoIdForPurListPO();
	fetchPartyMasterContactsDetailsPO(masterId);
	fetchPartyMasterAddressDetailsPO(masterId);
	fecthPartyOtherInfoPO(masterId);
	
	getNextGRNId();
}*/


//f/********************** fetchPurchaseOrderMasterNew *******************/

function fetchPurchaseOrderMasterNew() {
	var inputs = [];
	inputs.push('action=fetchPurchaseOrderMasterDetail');
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
			//alert(r);
		//	$("#documentContent").setTemplate(inventoryPurchaseOrderTemp);
			$("#documentContentOrderMaster").processTemplate(pobj1);
			$("#docuemntAjaxRespfororderMaster").html(r);
		}
	});
}

/*************************************Manufacturing Date and expariDare**************************************/
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


function clearnewGRN() 
{
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
//	getNextQuotationId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	$("#txtPurchaseOrderRequestNo").val(0);
	$("#txtPurchaseOrderQuatationNo").val(0);
	$("#txtGRNTotalPendingQty").val(0);
	document.getElementById("chkDirectGRN").checked = false;
	getNextGRNId();
	/**** set all charges defualt values @8june2016 ***/
	getchallanandpurchaseinvoiceid();
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
	$("#txtGRNTotalDocDiscount").val(0);
	
	$("#sumofCharges").val(0);
	
	/*** set Defalut todays Date to date @Date3Aug2016 @Author Sudhir */
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
    $("#txtGRNDOCDate").val(today1);
    $("#txtGRNDeliveryDate").val(today1);
}

/**********************************Search Grn Master Details******************************/
/*function fetchGrnforSearch(mrnId) {
//alert(mrnId);
	if (mrnId == null || mrnId == "") {
		alert("Please enter  grn id");
		$("#byMrnId").focus();
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchGRNMasterDetail');
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


				$("#documentContent").setTemplate(inventoryGRNTemp);
				$("#documentContent").processTemplate(pobj1);

			//	$("#docuemntAjaxResp").html(r);

			} else {
				alert("Record not found..!");
				fetchGRNMasterDetails();
				}
			$('#byMrnId').val("");

		}
	});
}
*/
/******************************************************new party MASTER FOR PURSHACE GRN PO**added in LIST*************************************************husen**/ 
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
	
	
	
	if(txtcontaddressPO != "")
	{
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtcontaddressPO)) {
			alert("Contact address should be of alphabets and digits  only with a single space allowed..!");
			$("#txtcontaddressPO").focus();
			return false;
		  }
	}
	
	
		
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
		    $("#txtemailPO").focus();
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
			
			/*********************************************** featch address and mobile no for suppler name In Grn Date:24/6/2015 Author :sudhir ***********************************/
			/*var obj = $("#PartyContactTableInfoListPO").html();
			var objPurchase = JSON.parse(obj);
			for(var row =0 ;row < objPurchase.ltinventorypartymastrecontactinfodto.length;row ++  )
			{
			$("#txtGRNMobileNo").val(objPurchase.ltinventorypartymastrecontactinfodto[row].party_contact_info_phone_number1);
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
	var str = "";
	if(myobj.party_contact_info_dob == "0000-00-00")
		{
		$("#txtdatePO").val(str);
		}
	else{
		/*var str = (myobj.party_contact_info_dob).split("-");
		var bdate = str[2] + "-" + str[1] + "-" + str[0];*/
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


if(txtadraddress != "")
{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtadraddress)) {
		alert("Address should be of alphabets and digits only with a single space allowed..!");
		$("#txtadraddressPO").focus();
		return false;
	  }
}



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
				alert("Record Updated successfully..!");
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
			
			counterPartyAddressInfoPO = 1;
			$("#AddressInfoTablePO").setTemplate(inventoryPartyAddressInfoTempPO);
			$("#AddressInfoTablePO").processTemplate(pobj1);
			$("#PartyAddressTableInfoListPO").html(r);
			/*$("#selSupplierState").setTemplate(selInventoryPendingOrder2);
			$("#selSupplierState").processTemplate(pobj1);*/
			
			/*********************************************** featch address and mobile no for suppler name In Grn Date:24/6/2015 Author :sudhir ***********************************/
			var obj = $("#PartyAddressTableInfoListPO").html();
			var objPurchase = JSON.parse(obj);
			for(var row=0 ;row < objPurchase.ltinventorypartymasteraddressinfodto.length;row ++  )
			{
			$("#txtGRNAddress").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
		//	$("#txtSupplierState").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_state);
			
			break;
			} 
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
			fetchStateListForRegInvPO(pobj1);
			
		}
	});
}


function EditpartyAddressdetailsPO(id)
{
	$("#txtPurchaseContractandAddress").val("Update");
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

}


var rowCount = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;


/*************************************GEt pending orders form order table*****************************************/

function getPendingOrder() {
 
	var inputs = [];
	inputs.push('action=getPendingOrder');
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
			//alert(r);
			pobj1 = eval('(' + r + ')');
			//alert(r);
			$("#txtPurchaseOrderList").setTemplate(selInventoryPendingOrder);
			$("#txtPurchaseOrderList").processTemplate(pobj1);
			$('#AjaxResopnPOapd').html(r);
			
		}
	});
}

var selInventoryPendingOrder = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltinvetorypurchaseordermaster as ltinvetorypurchaseordermaster}"
	
	+ "{#if $T.ltinvetorypurchaseordermaster.inv_purchase_order_master_form_Name == 'PURCHASE ORDER' && $T.ltinvetorypurchaseordermaster.inv_purchase_common_master_order_place_flag !='1'}" +
			"<option  value='{$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_doc_no}'>{$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_doc_Series}</option>"
	+ "{#/if}{#/for}";



var selInventoryPendingOrder2 = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltinventorypartymasteraddressinfodto as ltinventorypartymasteraddressinfodto}"
	+ "<option  value='{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_state}'>{$T.ltinventorypartymasteraddressinfodto.party_master_address_info_state}</option>"
	+ "{#/for}";

/********************************************New Save GRN  ****************************************/

function saveGRN() {
	var txtPurchaseFormName = $("#txtPurchaseFormName").val();
	
	var directORIndirectGRN ;
	
	var $radios = $('input:checkbox[name=chkDirectGRN]');
	
/***************add vmi chekbox @author paras suryawanshi @date:4nov 2016*******************************************/	
	
	var $radiovmi = $('input:checkbox[name=chkVMI]');
	var vmi=0;
	if ($radios.is(':checked') == true)
	{
		directORIndirectGRN='DirectGRN';
	}
	if ($radios.is(':checked') == false)
	{
		directORIndirectGRN='IndirectGRN'; 
	}

	if ($radiovmi.is(':checked') == true){
		 vmi = 1;
	}
//	alert(vmi);
	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	var OpenigStockflage ="N";
	var txtPurchaseQuotationDocNo = $("#txtGRNDocNo").val();
	var txtPurchaseQuotationDate1 = $("#txtGRNDOCDate").val();				
	var txtPurchaseQuotationMobileNo = $("#txtGRNMobileNo").val();
	var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val();
	var txtGRNPurchaseInvoiceNumber = $('#txtGRNPurchaseInvoiceNumber').val();
	var txtGRNPurchaseInvoiceNumber1 = $('#txtGRNPurchaseInvoiceNumber1').val();
	 if(txtGRNPurchaseInvoiceNumber1 ==null || txtGRNPurchaseInvoiceNumber1 =="" ||txtGRNPurchaseInvoiceNumber1== undefined){
		 txtGRNPurchaseInvoiceNumber1 =txtGRNPurchaseInvoiceNumber;
	 }
	var txtGRNDeliverychallanNumber = $("#txtGRNDeliverychallanNumber").val();
	var txtGRNDeliverychallanNumber1 = $("#txtGRNDeliverychallanNumber1").val();
	var txtPurchaseQuotationNotes2 = $("#txtPurchaseQuotationNotes2").val();
	var txtGRNDeliveryDate = $("#txtGRNDeliveryDate").val();
	
	var currentuserName = $("#currentuserName").val();
	var currentUserID = $("#currentUserID").val();
	/*var ApprovedByIncharge = $("#levelValue").val();*/
	
	var txtGRNTotalPendingQty = $("#txtGRNTotalPendingQty").val();
 
	var txtPurchaseQuotationSupplierName = $(
			"#txtGRNSupplierName").val();

	var selDocName = $("#selDocName option:selected").text();
 
	var txtPurchaseQuotationDocSeries = $("#txtGRNDocSeries").val();
	
	var txtPurchaseAppPO =0;
	var txtsuppiersateslave =0;
	var txtPurchaseAppchallan =0;
	var txtGrnDocSeriesIsEdit = $("#txtGrnDocSeriesIsEdit").val();
	var txtGRNArermark =$("#txtGRNArermark").val();
	var txtSupplierState = $("#txtSupplierState").val(); //added by paras for slecting state 
	if(txtSupplierState == 0){
		alert("Please Select Supplier State!!!");
		return false;
	}
   //end	
	var txtDocSeries;
	if(txtGrnDocSeriesIsEdit == 'isEdit')
	{
			txtDocSeries = txtPurchaseQuotationDocSeries;
	}
	else
	{
		var finaltxtPurchaseGrnDocSeries =txtPurchaseQuotationDocSeries +"No"+":"+txtPurchaseQuotationDocNo;
		txtDocSeries = finaltxtPurchaseGrnDocSeries;

		txtagchallan="Y";
		
		if(txtGRNDeliverychallanNumber=="" || txtGRNDeliverychallanNumber==null){
			alertify.error("Please Select Delivery challan number!!");
			return false;
		}
		
		if(txtGRNDeliverychallanNumber1=="" || txtGRNDeliverychallanNumber1==null){
			alertify.error("Please Select Delivery challan number!!");
			return false;
		}
		txtGRNDeliverychallanNumber =txtGRNDeliverychallanNumber + txtGRNDeliverychallanNumber1;
		txtGRNPurchaseInvoiceNumber = txtGRNPurchaseInvoiceNumber + txtGRNPurchaseInvoiceNumber1;
}
	var txtPurchaseQuotationRequestNo =$("#txtPurchaseOrderRequestNo").val();
	
	var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo").val();
	
	var txtPurchaseQuotationReferenceNo = $("#txtGRNReferenceNo")
			.val();

	var txtPurchaseQuotationAddress = $("#txtGRNAddress").val();
	var sclPurchaseQuotationDocstatus = $("#sclGRNDocstatus option:selected")
			.text();
	var txtagchallan ="N";
	var $radios1 = $('input:checkbox[name=txtagchallan]');
	if($radios1.is(':checked')==true){
		txtagchallan="Y";
		
		if(txtGRNDeliverychallanNumber=="" || txtGRNDeliverychallanNumber==null){
			alertify.error("Please Select Delivery challan number!!");
			return false;
		}
		
		if(txtGRNDeliverychallanNumber1=="" || txtGRNDeliverychallanNumber1==null){
			alertify.error("Please Select Delivery challan number!!");
			return false;
		}
		txtGRNDeliverychallanNumber =txtGRNDeliverychallanNumber + txtGRNDeliverychallanNumber1;
	}
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
	
	var txtGrnSaveOrUpdate = $("#txtGrnSaveOrUpdate").val();
	
	if(!(txtGrnSaveOrUpdate == 'Update'))
		{
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
	    
	    if(txtPurchaseQuotationDate1 === today1 )
		   {
		   		    
		   }
	    else
	    {
	    	alert("Please Enter Current Date ");
		    $("#txtGRNDOCDate").focus();
		   return false;
	    }
	   }
		}
	
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
     
     if(txtPurchaseQuotationReferenceNo == "" || txtPurchaseQuotationReferenceNo == null)
 	{
 	alert("Please enter reference number");
 	$("#txtGRNReferenceNo").focus();
 	return false;
 	}
     
     if(txtPurchaseQuotationAddress == "" || txtPurchaseQuotationAddress == null)
 	{
 	alert("Please enter address");
 	$("#txtGRNAddress").focus();
 	return false;
 	}
     
     var status = document.getElementById("sclGRNDocstatus");
     var docstatus = status.options[status.selectedIndex].text;
     if(docstatus == 0 ||  docstatus == 'Select')
     {
	    alert('Please select GRN Status');
		$("#sclGRNDocstatus").focus();
		return false;
     }
	var materiallist = {
		ltinvetorypurchasecommonitemmaster : []
	};
	
	var mrllistforMtnc = {ltMaintainanceMachineDTO:[]}; 
 
	for ( var i = 1; i <= totaltblsize; i++) {
		var $radios = $('input:checkbox[name=checkbox' + i + ']');
		if($radios.is(':checked') ==false){
			
		
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
			
			//fixed item qty coming from order
			var txtfixeditemQty = $("#txtPurchaseQuotationDocQuantity" + i).val();
			//lable value
			var lblPurchaseQuotationDocQuantity = $("#lblPurchaseQuotationDocQuantity" + i).text(); 
			
			var txtPurchaseQuotationChangingItemQty = $("#txtPurchaseQuotationChangingItemQty" + i).val();
			//alert(txtPurchaseQuotationChangingItemQty);
			//this condition used when direct Grn will be genrated @Date 25 April 2016 
			if(lblPurchaseQuotationDocQuantity == "" || lblPurchaseQuotationDocQuantity == null ||  lblPurchaseQuotationDocQuantity == undefined)
				{
				 lblPurchaseQuotationDocQuantity = txtfixeditemQty;
				}
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
					"#txtPurchaseQuotationTaxAmount_" + i).val();
			 var txtGRNTaxAmtinRs = $("#txtGRNTaxAmtinRs"+ i).val(); // add tax amount in rs grn @author:paras @Date:25nov
			
			
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
			
			var txtPurchaseQuotationhiddenActualQuantity = $("#txtPurchaseQuotationhiddenActualQuantity" + i).val();
			var finalActualQty = parseInt(txtPurchaseQuotationActualQuantity) + parseInt(txtPurchaseQuotationhiddenActualQuantity);
			 
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
			var txtlastUom = $("#txtlastUom" + i).val();
			//validatoin
			
		//	var $radios = $('input:checkbox[name=chkapnd]');
			
			var $radios = $('#chkapnd').is(':checked');
			if($radios == true){
				txtPurchaseAppPO = $("#txtPurchaseAppPO" + i).val();
				txtsuppiersateslave = $("#txtsuppiersateslave" + i).val();
				if(txtPurchaseAppPO == null || txtPurchaseAppPO =="" || txtPurchaseAppPO== undefined){
					txtPurchaseAppPO = 0;
					txtsuppiersateslave =0;
				}else{
					var txtPurchaseAppPO1 = txtPurchaseAppPO.split("_");
					txtPurchaseAppPO = txtPurchaseAppPO1[0];
					/*if(){
						
					}*/
					txtsuppiersateslave = txtPurchaseAppPO1[1];
				}
				
			}else if($radios1.is(':checked')== true && txtGrnDocSeriesIsEdit == 'isEdit'){
				txtPurchaseAppchallan = $("#txtPurchaseAppPO" + i).val();
				txtsuppiersateslave = $("#txtsuppiersateslave" + i).val();
				if(txtPurchaseAppchallan == null || txtPurchaseAppchallan =="" || txtPurchaseAppchallan== undefined){
					txtPurchaseAppchallan = 0;
					txtsuppiersateslave =0;
				}else{
					var txtPurchaseAppchallan1 = txtPurchaseAppchallan.split("_");
					txtPurchaseAppchallan = txtPurchaseAppchallan1[0];
					/*if(){
						
					}*/
					txtsuppiersateslave = txtPurchaseAppchallan1[1];
				}
				
			}
			
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
		  
		  
		  
		  if(txtPurchaseQuotationTaxCode_ == "" || txtPurchaseQuotationTaxCode_ == null ){
				
			  if(!txtPurchaseQuotationRowAmount == "" || !txtPurchaseQuotationRowAmount == null){
					
				 /* $("#txtPurchaseQuotationTaxCode_" + i).val("0");*/
				  txtPurchaseQuotationTaxCode_="0";
				  
				}
			  else if(txtPurchaseQuotationRowAmount == "" || txtPurchaseQuotationRowAmount == null){
					
					alert("Please enter item row amount in "+i+" Row");
					$("#txtPurchaseQuotationRowAmount" + i).focus();
					return false;
			  }
			  else{
				  
				alert("Please enter item tax code in "+i+" Row");
				//txtPurchaseQuotationTaxAmount
				$("#txtPurchaseQuotationTaxCode_" + i).focus();
				return false;
			  
			  }
			  
			} 
		  
		  if(txtPurchaseQuotationTaxAmount == "" || txtPurchaseQuotationTaxAmount == null){
				
				alert("Please enter item tax amount in "+i+" Row");
				$("#txtPurchaseQuotationTaxAmount_" + i).focus();
				return false;
				
			}
		  
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
				
				alert("Please enter item Order quantity in "+i+" Row");
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
  		  
		  var itemCounter = 1;
		  
		  $('.itemNameRow_'+i).each(function(){
			   
			  var tblSize = $(".totaltblsize_"+i).val();
			  
			  if(tblSize != undefined && tblSize != null && tblSize != '')
				 {
					 if(itemCounter==1)
					 {
					 
			   for(var k=1; k<=tblSize;k++)
			    { 

				 var itemId = $(".itemIdInput_"+i+"_"+k).val();
				 var itemName = $(".itemNameInput_"+i+"_"+k).val();
				 var itemSrNoInput = $(".itemSrNoInput_"+i+"_"+k).val();
				 var itemPurDateInput = $(".itemPurDateInput_"+i+"_"+k).val();
				 if(itemSrNoInput=="" || itemSrNoInput==null)
					{
					 itemSrNoInput="No";
					}
				   
				 mrllistforMtnc.ltMaintainanceMachineDTO
						.push({
									
							machine_maintainance_item_id : itemId , 
							                   item_name : itemName,
							       invsrnoformainteitem  : itemSrNoInput,
							                    invgrnid : txtPurchaseQuotationDocNo,
						                    currusername : currentuserName,
						                      curruserid : currentUserID, 
						                      from_date  : itemPurDateInput
						});
				 
					 }
			   itemCounter++;
			   }
			 }
		    
		  });
		 /* alert(txtPurchaseAppPO);
		  alert(txtsuppiersateslave);*/
		  materiallist.ltinvetorypurchasecommonitemmaster
					.push({

						inv_purchase_common_item_code :txtPurchaseQuotationItemName,
						inv_purchase_common_item_Name:txtPurchaseQuotationItemName_,
						inv_purchase_common_item_doc_Qty :txtPurchaseQuotationChangingItemQty,//lblPurchaseQuotationDocQuantity,
						inv_purchase_common_item_unit_price : txtPurchaseQuotationUnitPrice,

						inv_purchase_common_item_trade_discount_per : txtPurchaseQuotationTrdeDiscountPercentage,
						inv_purchase_common_item_trade_discount_rupess:txtPurchaseQuotationTrdeDiscountInRupess,
						inv_purchase_common_item_trade_discount_amount : txtPurchaseQuotationTrdeDiscountAmt,
						inv_purchase_common_item_trade_base_amount : txtPurchaseQuotationBaseAmount,
						inv_purchase_common_item_master_id : txtInvpurchaseCommonItemMasterId,

						inv_purchase_common_item_tax_amount : txtPurchaseQuotationTaxAmount,
						inv_purchase_common_item_tax_amount_rupess:txtGRNTaxAmtinRs, // add tax amount in rs @author:paras @Date:25nov
						inv_purchase_common_item_tax_code:txtPurchaseQuotationTaxCode_,
						inv_purchase_common_item_row_amount : txtPurchaseQuotationRowAmount,
						inv_purchase_common_item_factor1 : txtPurchaseQuotationFactor1,
						inv_purchase_common_item_factor2 : txtPurchaseQuotationFactor2,

						inv_purchase_common_item_factor3 : txtPurchaseQuotationFactor3,
						inv_purchase_common_item_factor4 : txtPurchaseQuotationFactor4,
						inv_purchase_common_item_actural_qty : finalActualQty,//txtPurchaseQuotationActualQuantity,
						inv_purchase_common_item_pending_qty : txtPurchaseQuotationPendingQuantity,

						/*inv_purchase_common_item_row_status : txtPurchaseQuotationRowStatus,*/
						inv_purchase_common_item_batch_No : txtPurchaseQuotationBatchNo,

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
						inv_batch_stock_fixed_item_qty : txtfixeditemQty,
						inv_item_purchase_last_factor_uom :txtlastUom,
						inv_purchase_common_item_apndpo  :txtPurchaseAppPO,
						inv_stateid: txtsuppiersateslave,
						inv_purchase_common_item_challan:txtPurchaseAppchallan
						 
					});

			
		}
		
	}	 
		 	 

	}
 
	var li = materiallist.ltinvetorypurchasecommonitemmaster.length;
	 if(li == 0)
		{
		alert("Please enter atleast one Item row to Save GRN");
		return false;
		}
	 
	 mrllistforMtnc = JSON.stringify(mrllistforMtnc);
	 materiallist = JSON.stringify(materiallist);
	   
	var inputs = [];
	inputs.push('action=saveGRNDetail');
	inputs.push('materiallist=' + materiallist);
	inputs.push('mrllistforMtnc=' + mrllistforMtnc);
	
	inputs.push('txtPurchaseQuotationDocNo=' + txtPurchaseQuotationDocNo);
	inputs.push('txtPurchaseQuotationDate1=' + txtPurchaseQuotationDate1);
	inputs.push('txtPurchaseQuotationMobileNo=' + txtPurchaseQuotationMobileNo);
	inputs.push('txtPurchaseQuotationSupplierCode='	+ txtPurchaseQuotationSupplierCode);
	inputs.push('txtGRNPurchaseInvoiceNumber='	+  txtGRNPurchaseInvoiceNumber1);
	inputs.push('txtGRNPurchaseInvoiceNumber1='	+ txtGRNPurchaseInvoiceNumber);
	inputs.push('txtGRNDeliverychallanNumber='	+ txtGRNDeliverychallanNumber1);
	inputs.push('txtGRNDeliverychallanNumber1='	+ txtGRNDeliverychallanNumber  );
	inputs.push('txtPurchaseQuotationSupplierName='	+ txtPurchaseQuotationSupplierName);
	inputs.push('txtDocSeries=' + txtDocSeries);
	inputs.push('txtPurchaseQuotationReferenceNo='
			+ encodeURIComponent (txtPurchaseQuotationReferenceNo));
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
	inputs.push('txtGRNTotalPendingQty=' + txtGRNTotalPendingQty);

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
	inputs.push('txtSupplierState='+txtSupplierState); //added by paras 
	inputs.push('txtagchallan='+txtagchallan); //added by paras FOR agienst challan bill
	inputs.push('vmi=' + vmi);
	
	/*inputs.push('ApprovedByIncharge=' + ApprovedByIncharge);*/
	inputs.push('currentuserName='+currentuserName);
	inputs.push('currentUserID='+currentUserID);
	inputs.push('txtGRNArermark='+txtGRNArermark);

	
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
			alert(r);
			/*var txtGrnSaveOrUpdate = $("#txtGrnSaveOrUpdate").val();
			
			if(txtGrnSaveOrUpdate == 'Update')
				{
				alert("Record Updated successfully..!");
				}
			else{
				alert("Record saved successfully..!");
				}*/
			
			
			$('#Sales_Quotation_Form').removeClass('fade');
			$('#Sales_Quotation_Form').modal('hide');		 			
			window.location.reload("inventory_Good_Receipt_Note.jsp");
		}
	});
}


 

/*function getNextGRNId() {
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
		}
	});
}*/
 
/*function fetchDocumentNameListforGRN() {
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
			//alert(r);
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
			$("#txtGRNDocSeries").val(
					objDocument.lstDocumentNUmberDto[i].document_prefix
							+ objDocument.lstDocumentNUmberDto[i].document_number
							+ txtId
							+ objDocument.lstDocumentNUmberDto[i].document_suffix);

		}
	}

}*/


/** ******* AutoSuggestion Code for item ********** */
/*
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
						alert('error');
					},
					success : function(r) {
						// alert(r.length);
						var availableTags = [];
						if (r.length == 32) {
							alert("NO MATCHING FOUND Please Enter Valid Item Name");
							var arrValue1 = (inputID).split("_");
							var idValue1 = (arrValue1[1]);
							$("#txtPurchaseQuotationItemName_"+idValue1).val('');
							$("#txtPurchaseQuotationItemName_"+idValue1).focus();

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

							}
						}
					});

		}
	}
}*/

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

}*/

/**** *** featch grn master data onlode @modifiendDate26April2016 @Author sudhir ********/

function fetchGRNMasterDetails(Id,loadOn) {
	var inputs = [];
	inputs.push('action=fetchGRNMasterDetail');
	
	if(loadOn == "onload")
	{
		inputs.push('isEdit=no');
		inputs.push('partyId=undefined');
	}
if( loadOn == "onClick")
	{
		inputs.push('isEdit=Openigstock');
		inputs.push('partyId=Openigstock');
	}
	 if(loadOn =="challan"){
		 inputs.push('isEdit=no1');
	     inputs.push('partyId=challan');
	 }
	/*inputs.push('isEdit=no');
	inputs.push('partyId=undefined');*/
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
			SrNo = 1;
			pobj1 = eval('(' + r + ')');
			if(loadOn =="challan"){
				inventorychallanlist(pobj1);
			}else{
				$("#documentContent").setTemplate(inventoryGRNTemp);
				$("#documentContent").processTemplate(pobj1);
				
			}
			$("#docuemntAjaxResp").html(r);	
		}
	});
}

 function inventorychallanlist(objPurchase){
	var htm= "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
	   +"<thead class='cf' style='background: white;'><tr class='center'>"		
	   +"<th style='height: 21.5px;' class='col-md-2 center'><div>#</div></th>" 
	   +"<th style='height: 21.5px;' class='col-md-2 center'><div>Grn Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>View</div></th>"
	   +"<th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th> </tr></thead>";

		
	 for( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++){
		 if(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_form_Name == "GRN" ||objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_form_Name == "Goods Reciept"){
			 htm = htm
			   +"<tr class='center'>"
		       +"<td>"+ SrNo +"</td>"
               +"<td id='id"+ objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no +"'>"+ objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no +"</td><td id='desc"+ objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no +"'>"+ objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Name + "</td>"
	           + "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal' data-target='#Sales_Quotation_Form' onclick='viewGRNMasterDetails("+ objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no +")' value='EDIT'><i class='fa fa-eye View'></i></button></td>"
	           +"</td><td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal' onclick='printGRNMasterDetailsNEW("+ objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no +")' value='EDIT'><i class='fa fa-print'></i></button></td>";
		 } 
		 SrNo ++;	 
	 } 
	 $("#documentContent").html(htm + "</tr></table>");
 }

/** ***************** ON  Edit and view Grn master and slave Details  ****************** */
/*
function viewGRNMasterDetails(partyId) {
	purchaseQuatViewRefresh();

	$('#iHideGRNSaveBtn').css('display','block');
	$("#divtxtPurchaseOrderList").hide();
	var obj = $("#docuemntAjaxResp").html();
 
	var objPurchase = JSON.parse(obj);

	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no == partyId) {

			var txtPurchaseQuotationDocNo = $("#txtGRNDocNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no);
			*//**********************************date convert***************************************//*	
			var str=(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_date).split("-");
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];
			$("#txtGRNDOCDate").val(leaddate);
			var txtPurchaseQuotationDate1 = $("#txtPurchaseQuotationDate1")
					.val();
			var txtPurchaseQuotationMobileNo = $(
					"#txtGRNMobileNo")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_mobile_number);

			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO')
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Id);

			var txtPurchaseQuotationSupplierName = $(
					"#txtGRNSupplierName")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Name);
			// $("#selDocName").hide();
			// option:selected").text(objPurchase.ltinvetorypurchasecommonmaster[rowCount].);
			var txtPurchaseQuotationDocSeries = $(
					"#txtGRNDocSeries")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_Series);
			var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;
			var txtPurchaseQuotationReferenceNo = $(
					"#txtGRNReferenceNo")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_reference_no);
			var txtPurchaseQuotationAddress = $("#txtGRNAddress")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Address);
			var sclPurchaseQuotationDocstatus = $(
					"#sclGRNDocstatus")
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
			
			
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderQuatationNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_batch_order_No_fk);
			

		}
	}
	
    var masterId = $('#txtVendorCodePO').val();
	
	 
	
	fetchPartyMasterContactsDetailsPO(masterId);
	fetchPartyMasterAddressDetailsPO(masterId);
	fecthPartyOtherInfoPO(masterId);
	

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
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_item_name
										+ "'  onkeyup = 'auto(this.id,onchange)' onkeypress='return validateOnlyName(event);' /> "
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
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_qty
										+ "'  onblur='totalAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_rate
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ ""
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_per
										+ "' onblur='calculTradeDis(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' ></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_discount_amount
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_base_amount
										+ "' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTaxCode_"
										+ srNumber
										+ "' value='"+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_code
										+ "'onkeyup='autotaxCodeGrn(this.id"+rowCount+ ",onchange)'onkeypress='return validateOnlyName(event);' ></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' ></td>  "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_amount
										+ "'></td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor1
										+ "' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor2
										+ "' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor3
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor4
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_actural_qty
										+ "' onblur='pendingAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock__item_pending_qty
										+ "' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowStatus"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_row_status
										+ "' onkeypress='return validateOnlyName(event);' ></td>"
										+ " <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
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

				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
					}
					// auto("txtPurchaseQuotationItemName_","onload");
					totalDocQtyPQ();
					totalDocDiscountPQ();

					var txtEmptyItem = $("#txtEmptyItem").val();
					//auto(txtEmptyItem, "onload");

					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				}
			});

}*/

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

function deleteGRNMasterDetails(id) {
	var didConfirm = confirm("Are you sure to delete record ?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteGRNMasterDetail');
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
				fetchGRNMasterDetails("no","onload");
			}
		});
	}
}

/********************************tamplet variable  for set grn master data on lode*********************************/

/*var inventoryGRNTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
		+ "<thead class='cf' style='background: white;'><tr>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>GRN Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>print</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}<tr class='center'>"
		+ "{#if $T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_form_Name == 'GRN' || $T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_form_Name == 'Goods Reciept'}<td id='id{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}</td><td id='desc{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_Supplier_Name}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal' onclick=\"printGRNMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no})\" value='EDIT'><i class='fa fa-print'></i></button></td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewGRNMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deleteGRNMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no})\"><i class='fa fa-trash-o'></i></button></td</tr>{#/if}{#/for}</table>"
*/

/********************** print GrN Details*************************************/		
function printGRNMasterDetails(partyId)
{

var obj = $("#docuemntAjaxResp").html();

var objPurchase = JSON.parse(obj);

var myObj = "";

for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

	if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no == partyId) {
		myObj = objPurchase.ltinvetorypurchasecommonmaster[rowCount];
		break;
		
	}
}
		/*var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val(myObj.inv_batch_stock_master_Supplier_Id);
 		var txtPurchaseQuotationDocSeries = $("#txtGRNDocSeries").val(myObj.inv_batch_stock_master_doc_Series);
 		
 		var txtVendorCode = $("#txtVendorCodePO").val();
 		 var txtGRNDocSeries =  $("#txtGRNDocSeries").val();
 		 
 		window.open("Inventory_Grn_print.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtGRNDocSeries="+txtGRNDocSeries);*/
 		
 		var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val(myObj.inv_batch_stock_master_Supplier_Id);
 		var txtPurchaseQuotationDocSeries = $("#txtGRNDocSeries").val(myObj.inv_batch_stock_master_doc_Series);
 		$("#txtGRNDeliveryDate").val(myObj.inv_batch_stock_master_purchase_delivery_date);
 		var txtVendorCode = $("#txtVendorCodePO").val();
 		 var txtGRNDocSeries =  $("#txtGRNDocSeries").val();
 		 var txtGRNDeliveryDate = $("#txtGRNDeliveryDate").val();
 		 var txtGrnDate = myObj.inv_batch_stock_master_doc_date;
 		 var txtOrderNO = myObj.inv_batch_stock_master_batch_order_No_fk; 
 	
 		 if (parseInt(txtOrderNO) == 0	|| txtOrderNO == null) {
 			txtOrderNO = "-";
 	 	}
 		 
 		window.open("Inventory_Grn_print.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtGRNDocSeries="+txtGRNDocSeries+"&txtGRNDeliveryDate="+txtGRNDeliveryDate+"&txtGrnDate="+txtGrnDate+"&txtOrderNO="+txtOrderNO);


}	


function printGRNMasterDetailsNEW(partyId)
{
	 jQuery.ajax({
			type : "POST",
			url : "ehat/inventory/fetchhospitalstate",
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				var obj = $("#docuemntAjaxResp").html();

				var objPurchase = JSON.parse(obj);

				var myObj = "";

				for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

					if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no == partyId) {
						myObj = objPurchase.ltinvetorypurchasecommonmaster[rowCount];
						break;
						
					}
				}
						/*var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val(myObj.inv_batch_stock_master_Supplier_Id);
				 		var txtPurchaseQuotationDocSeries = $("#txtGRNDocSeries").val(myObj.inv_batch_stock_master_doc_Series);
				 		
				 		var txtVendorCode = $("#txtVendorCodePO").val();
				 		 var txtGRNDocSeries =  $("#txtGRNDocSeries").val();
				 		 
				 		window.open("Inventory_Grn_print.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtGRNDocSeries="+txtGRNDocSeries);*/
				 		
				 		var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val(myObj.inv_batch_stock_master_Supplier_Id);
				 		var txtPurchaseQuotationDocSeries = $("#txtGRNDocSeries").val(myObj.inv_batch_stock_master_doc_Series);
				 		$("#txtGRNDeliveryDate").val(myObj.inv_batch_stock_master_purchase_delivery_date);
				 		var txtVendorCode = $("#txtVendorCodePO").val();
				 		 var txtGRNDocSeries =  $("#txtGRNDocSeries").val();
				 		 var txtGRNDeliveryDate = $("#txtGRNDeliveryDate").val();
				 		 var txtGrnDate = myObj.inv_batch_stock_master_doc_date;
				 		 var txtOrderNO = myObj.inv_batch_stock_master_batch_order_No_fk; 
				 	
				 		 if (parseInt(txtOrderNO) == 0	|| txtOrderNO == null) {
				 			txtOrderNO = "-";
				 	 	}
				 		var hostate = parseInt(response);
					 	var stateid= parseInt(myObj.inv_SupplierState);
					 	var taxapp="IGST";
					 	if(hostate == stateid ){
					 		taxapp="GST";
					 	}
				 		window.open("Inventory_Grn_printNEW.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtGRNDocSeries="+txtGRNDocSeries+"&txtGRNDeliveryDate="+txtGRNDeliveryDate+"&txtGrnDate="+txtGrnDate+"&txtOrderNO="+txtOrderNO +"&taxapp="+taxapp +"&bill="+"GRN");
			}});



}		
	function refreshPopUp() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	getNextQuotationId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');

}

function refresh()
{
	window.location.reload("inventory_Good_Receipt_Note.jsp");
}

function clearPopUp() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
//	getNextQuotationId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');

}

var selInventoryPendingQuotation = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}"
	
	+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_form_Name == 'PURCHASE ORDER' && $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_status!='Closed'  && $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_status!='Cancelled'}" +
			"<option  value='{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_Series}</option>"
	+ "{#/if}{#/for}";



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

/*function totalAmount(id, rowCount) {
	// alert(id);
	var quantity = $('#' + id).val();

	var rate = $('#txtPurchaseQuotationUnitPrice' + rowCount).val();

	$('#txtPurchaseQuotationActualQuantity' + rowCount).val('0');
	$('#txtPurchaseQuotationPendingQuantity' + rowCount).val(quantity);
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

	$("#txtGRNTotalDocQty").val(sum);

}*/

/********** Calculate treade discount AMt ******************/



/*function calculTradeDis(id, rowCount) {
	
	var treadeDiscount = $(
			"#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).val();
	var oldbaseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	
	
	if(treadeDiscount > 100 )
	{
		alert("Trade Discount should not more than 100" );
		$("#txtPurchaseQuotationTrdeDiscountPercentage"+ rowCount).val('');
		
		$("#txtPurchaseQuotationTrdeDiscountAmt"+rowCount).val('');
		$("#txtPurchaseQuotationBaseAmount"+rowCount).val('');
		
		
		var docqty = $("#txtPurchaseQuotationDocQuantity" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowCount).val();
		
		var baseAmt = docqty * unitprise;
		$("#txtPurchaseQuotationBaseAmount"+rowCount).val(baseAmt);
		
		$("#txtPurchaseQuotationTrdeDiscountPercentage"+ rowCount).focus();
	}
	else
	{

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
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(finalBaseAmt);
		
		 
		var oldTotaldiscount = $("#txtGRNTotalDocDiscount").val();
		
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
}*/










/*function calculTradeDis(id, rowCount) {
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
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(finalBaseAmt);
		
		 
		var oldTotaldiscount = $("#txtGRNTotalDocDiscount").val();
		if(oldTotaldiscount == ''||oldTotaldiscount == null || oldTotaldiscount == undefined)
			{
			 $("#txtGRNTotalDocDiscount").val(totalAmtInpercntage);
			}
		else
			{
			var finaltotalDiscount = (parseFloat(oldTotaldiscount) + parseFloat(totalAmtInpercntage)).toFixed(2);
			$("#txtGRNTotalDocDiscount").val(finaltotalDiscount);
			}
	} else {

		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(baseAmt);
	}
}*/

/*function rowAmtCal(id, rowCount) {

	var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val('');
	} else {
		var sum = 0;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
		sum = parseFloat(baseAmt) + parseFloat(taxAmt);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(sum);
	}

}*/
/*function pendingAmount(id, rowCount) {

	var actualquantity = $('#' + id).val();
	var quantity = $('#txtPurchaseQuotationDocQuantity' + rowCount).val();
	if (actualquantity > quantity) {
		alert("Plz enter valid quantity");
	} else {
		// ss alert(quantity + "-" +actualquantity);
		
		 * $('#txtPurchaseQuotationPendingQuantity' + rowCount).val( quantity -
		 * actualquantity);
		 
	}

}*/

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

	$("#txtGRNTotalDocQty").val(sum);
	$("#RowCount").val(RowCount);

}*/


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

	$("#txtGRNTotalDocDiscount").val(sum);
	$("#RowCount").val(RowCount);

}*/


/************** Adding row dynamically in table ****************/


/*function toCreateDivGRN() {

	$('#iHideGRNSaveBtn').css('display','block');
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
								+ ")' onkeypress='return validateNumbers(event);'></td> "
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
								+    
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
								+ ",onchange)' onkeypress='return validateOnlyName(event);'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
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
								+ "'></td>"
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
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "'></td>"
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
								+ "  <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
	auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
		rowCount++;
	}

}
*/
 
/******  Remove  row dynamically in table modified Date 8sept2016 ******/

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
			//$("#totalRow").val(temp);
		}
		p++;
	}
	isNew = 1;
	 	 	
	totalDocQtyPQ();
	totalDocDiscountPQ();
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	totalPendingQtyforPartialGRN();
	calcuatSumforitemQTYforPartialGRN();
	
}

//AutoSuggestion Code.............

/*function setSupplierNameForNewGRN(inputID, type) {

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
								$('#txtGRNSupplierName')
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
				
			
			 * // alert("Id=" + item.value + " Value=" + item.text);
			 * 
			 * $('.alert').show().html( 'You selected <strong>' + item.value + '</strong>:
			 * <strong>' + item.text + '</strong>');
			 
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
/***** ********show order Details on get Order Author: Sudhir Modified Date:24:11:2015 ** modified @Date:19may2016 modified Date 3Nov2016 *****/
function viewPurchaseOrderMasterDetails(partyId) {
	/*$('#taxcode').css('display','block');
	$('#taxAmount').css('display','block');*/
	
	/*******************VMI chkbox hide @author  paras suryawanshi @Date:4NOV 2016 *************************/
	var $radios = $('input:checkbox[name=chkapnd]');

	if($radios.is(':checked') == false){	$('#divtxtGRNwithoutPO').css('display','none');
	$('#divtxtPartialGRNDetails').css('display','none');
	$('#divtxtVMI').css('display','none');
	
	/******************* end  VMI chkbox hide @author  paras suryawanshi @Date:4NOV 2016 *************************/	
	clearPopUp();
	 
	$('#iHideGRNSaveBtn').css('display','block');
	//$("#txtVendorCode").val(partyId);
	
	$("#ApprovedByIncharge1").hide();
	$("#ApprovedByIncharge2").hide();
	 $("#levelValue").val('NYA');
	 $("#closeonclick").hide();
	 
	 var state = 0;//added by paras
	 
		var obj = $("#docuemntAjaxRespfororderMaster").html();
		 
		objPurchase = JSON.parse(obj);

		for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchaseordermaster.length; rowCount++) {
			if (objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_no == partyId) {

				//alert(obj);
				var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_no);
				
				/**********************************date convert***************************************/	
				/*var str=(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_date).split("-");
				var leaddate=str[2]+"-"+str[1]+"-"+str[0];
				$("#txtGRNDOCDate").val(leaddate);*/
				
				
				
				
				/*var txtPurchaseQuotationDate1 = $("#txtPurchaseOrderDatePRL")
						.val(
								objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_common_master_create_date);*/
				var txtPurchaseQuotationMobileNo = $("#txtGRNMobileNo").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_mobile_number);
				var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_Supplier_Id);
				var txtPurchaseQuotationSupplierName = $("#txtGRNSupplierName").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_Supplier_Name);
				// $("#selDocName").hide();
				// option:selected").text(objPurchase.ltinvetorypurchaseordermaster[rowCount].);
				/*var txtPurchaseQuotationDocSeries = $(
						"#txtGRNDocSeries").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_Series);*/
				//var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;
				
				var txtPurchaseQuotationReferenceNo = $("#txtGRNReferenceNo").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_reference_no);
				
				var txtPurchaseQuotationAddress = $("#txtGRNAddress").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_Address);
				/*var sclPurchaseQuotationDocstatus = $("#sclGRNDocstatus option:selected").text(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_status);*/
				var txtPurchaseQuotationTotalDocDiscount = $("#txtGRNTotalDocDiscount").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_total_discount);
			
				var txtPurchaseQuotationTotalDocQty = $("#txtGRNTotalDocQty").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_total_doc_qty);

				var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderRequestNo").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_purchase_Request_No);
				
				/*view all charges @Date 8/6/2016 @Author sudhir */ 

				$("#txtSplDisc").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_special_disc);
				$("#txtdebitAmt1").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_debit_amt);
				$("#txtCD1").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_cash_amt_perct);
				$("#txtCDAmt").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_cash_amt_rupees);
				
				$("#txtOctroi").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_octroi_amt);
				$("#txtSurcharge").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_surcharge_amt);
				$("#txtCreditAmt").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_credit_amt);
				$("#txtFreight").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_freight_amt);
				
				$("#txtVat").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_calcuated_vat_amt);
				$("#txtlbt").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_lbt_amt);
				$("#txtcst").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_cst_amt);
				$("#txtExVat").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_ex_vat_amt);
				
				$("#txtTotalVat").val((objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_calcuated_total_taxes_amt).toFixed(2));
				$("#txtGross").val((objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_total_base_gross_amt).toFixed(2));
				$("#txtLess").val((objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_total_less_amt).toFixed(2));
				$("#txtAdd").val((objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_total_add_amt).toFixed(2));
				
				$("#textVat").val((objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_final_calcuated_total_taxes_amt).toFixed(2));
				$("#txtNetAmt").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_final_total_net_amt);
				
				
				var selboxChargeswithAmtList = objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_special_charges;

				//add by paras for edit supplier state	 
				if(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_SupplierState == 0 || objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_SupplierState ==null || objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_SupplierState ==undefined ){
					 
				}else{
					 $("#hoseditState").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_SupplierState);
					 state = objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_SupplierState;
				}
				//end
				
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
				
			$("#sumofCharges").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_sumofspecial_charges.toFixed(2));


				 
				break;
				
			}
		}
		
		var masterId = $('#txtVendorCodePO').val();
		
		
		//alert("Id=" + item.value + " Value=" + item.text);
		//var masterId = item.value;
	  //  alert("master id on get order"+masterId);
		fetchhospitalstate();
		fetchPartyMasterContactsDetailsPO(masterId);
		fetchPartyMasterAddressDetailsPO(masterId);
		fecthPartyOtherInfoPO(masterId);
		
		getNextGRNId();
		getSeries(($('#seriesId').val()));
	 
	 
	 
	var inputs = [];
	inputs.push('action=fetchPurchaseOrderItemMasterDetail');
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
					pobj1 = eval('(' + r + ')');
					//fetchPurchaseQuotationMasterNew();
					srNumber = 1;
					var $radioschallan = $('#txtagchallan').is(':checked');
					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
						$("#ItemInfoTable> tbody")
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
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left;width:260px;' class='typeahead form-group'  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_Name
										+ "'  onkeyup = 'auto(this.id,onchange)' readonly='' /> "
										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_code
										+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_master_id
										+ "'/> </div> </td>"
										+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_doc_Qty
										+ "'  onblur='totalAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);'readonly=''> <input type='hidden' id='txtPurchaseQuotationChangingItemQty"
										+ srNumber
										+ "' value='"+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_doc_Qty + "' /><input type='hidden' id='txtlastUom"+srNumber+"'value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"'> <lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +"</label> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity"+srNumber+"'  style ='text-align:center;' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_actural_qty
										+ "' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_actural_qty+"</label> </td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_unit_price
										+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
										+ ""
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_per
										+ "' onblur='calculTradeDis(this.id,"
										+ srNumber
										+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_rupess
												+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td>"
										+ " <td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_amount
										+ "' onkeypress='return validateNumbers(event);'style='width:160px;' ></td>"
										+ "<td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_base_amount
										+ "' onkeypress='return validateNumbers(event);' style='width:160px;' ></td>"
										/*+ "<td><select readonly=''  style='width:140px;' class='form-control input-SmallText'  multiple='multiple'  onclick='multipletaxCalculation(this.id," + srNumber + ")' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_code + "</option>  </select></td>   <td><input type='text' style='width:160px;' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount_"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' ></td> "*/
										+ "<td><input type='text'  style='width:100px;' class='typeahead form-control input-SmallText' onkeyup='autotaxCodeGrn(this.id,onchange)' id='txtPurchaseQuotationTaxCode_"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
										+ "' ></td>"
										+ "<td><input type='text'  style='width:100px;' class='typeahead form-control input-SmallText' id='txtPurchaseQuotationTaxAmount_"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
										+ "'  onkeyup='autotaxCodeGrn(this.id,onchange)'></td>"
										+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxAmtinRs"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount_rupess
										+ "' readonly='' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText'  readonly='' id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_row_amount
										+ "' onkeypress='return validateNumbers(event);' style='width:160px;'></td>"
										+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor1
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor2
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor3
										+ "' onkeypress='return validateNumbers(event);' > <lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +"</label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor4
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
										+ " <td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_actural_qty
										+ "' onkeyup='pendingAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);'  > <input type='hidden' id='txtPurchaseQuotationhiddenActualQuantity"+srNumber+"' value='0'/> </td> "
										+ "<td><input type='text'style='width:60px;' class='form-control input-SmallText'  id='txtPurchaseQuotationPendingQuantity"
										+ srNumber
										+ "' value='0' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText'  style='width:60px;' id='txtPurchaseQuotationBatchNo"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_batch_No
										+ "'></td>"
										+ " <td><input type='text' style='width:80px;' readonly='readonly'class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ srNumber
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;' > </td> <td> <input style='width:80px;' type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ srNumber
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;;' > </td> <td>   <button id='addtoMaintenance_"+ srNumber+"'' class='btn btn-xs btn-info' type='button' value='Add' onclick='addtoMaintanace(this.id,"+srNumber+ ")' data-toggle='modal' data-target='#addToMaintenacediv'> <i class='fa fa-plus'></i></button> <div style='display:none;' id='allitemlistforMaintenace"+ srNumber+"' class='allitemlistforMaintenace"+srNumber+"' ></div> </td> </tr>");
						
						if($radioschallan  ==true)
						{
							$("#txtPurchaseQuotationUnitPrice"+srNumber).hide();
							$("#txtPurchaseQuotationTrdeDiscountPercentage"+srNumber).hide();
							$("#txtPurchaseQuotationTrdeDiscountInRupess"+srNumber).hide();
							$("#txtPurchaseQuotationTrdeDiscountAmt"+srNumber).hide();
							$("#txtPurchaseQuotationTaxAmount_"+srNumber).hide();
							$("#txtPurchaseQuotationTaxCode_"+srNumber).hide();
							$("#txtGRNTaxAmtinRs"+srNumber).hide();		
							$("#txtPurchaseQuotationRowAmount"+srNumber).hide();		
							$("#txtPurchaseQuotationFactor2"+srNumber).hide();		
							$("#txtPurchaseQuotationFactor3"+srNumber).hide();		
							$("#txtPurchaseQuotationFactor4"+srNumber).hide();		}
						
						var hostate = $("#hosState").val();
						if(state ==hostate || state == hostate || state == hostate)
						{
							
							
							//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
							$("#txtPurchaseQuotationTaxAmount_"+srNumber).hide();
							
						}else{
							
							$("#txtPurchaseQuotationTaxCode_"+srNumber).hide();
							
							}
						
						
				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
			}
			// auto("txtPurchaseQuotationItemName_","onload");
				//	pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_pending_qty
					
			var txtEmptyItem = $("#txtEmptyItem").val();
			//auto(txtEmptyItem, "onload");
			
			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
			isNew=1;
			
			totalDocQtyPQ();
			totalDocDiscountPQ();
			totalPendingQtyGRN();
		}

	});}

	getchallanandpurchaseinvoiceid();	

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

/*************************************************show on edit GRN **************************************************//*	

function viewPurchaseOrderMasterDetails(partyId) {

	clearPopUp();
	 
	$("#txtVendorCode").val(partyId);
	 
	var inputs = [];
	inputs.push('action=fetchPurchaseOrderItemMasterDetail');
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
					pobj1 = eval('(' + r + ')');
					//fetchPurchaseQuotationMasterNew();
					srNumber = 1;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
						$("#ItemInfoTable> tbody")
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
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_Name
										+ "'  onkeyup = 'auto(this.id,onchange)' /> "
										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_code
										+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_master_id
										+ "'/> </div> </td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_doc_Qty
										+ "'  onblur='totalAmount(this.id,"
										+ srNumber
										+ ")'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_unit_price
										+ "'></td>"
										+ ""
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_per
										+ "' onblur='calculTradeDis(this.id,"
										+ srNumber
										+ ")'></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_amount
										+ "' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_base_amount
										+ "'></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_row_amount
										+ "'></td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor1
										+ "'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor2
										+ "'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor3
										+ "'></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor4
										+ "'></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_actural_qty
										+ "' onblur='pendingAmount(this.id,"
										+ srNumber
										+ ")'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_pending_qty
										+ "'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowStatus"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_row_status
										+ "'></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_batch_No
										+ "'> </td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ srNumber
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;' > </td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ srNumber
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;;' > </td> </tr>");

				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
			}
			// auto("txtPurchaseQuotationItemName_","onload");
					totalDocQtyPQ();
					totalDocDiscountPQ();
			var txtEmptyItem = $("#txtEmptyItem").val();
			//auto(txtEmptyItem, "onload");
			
			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
			isNew=1;
		}

	});
		
	var obj = $("#docuemntAjaxRespfororderMaster").html();
 
	objPurchase = JSON.parse(obj);

	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchaseordermaster.length; rowCount++) {
		if (objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_no == partyId) {

			//alert(obj);
			var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo")
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_no);
			
			*//**********************************date convert***************************************//*	
			var str=(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_date).split("-");
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];
			$("#txtGRNDOCDate").val(leaddate);
			
			
			
			
			var txtPurchaseQuotationDate1 = $("#txtPurchaseOrderDatePRL")
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_common_master_create_date);
			var txtPurchaseQuotationMobileNo = $(
					"#txtGRNMobileNo")
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_mobile_number);
			var txtPurchaseQuotationSupplierCode = $('#txtVendorCode')
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_Supplier_Id);
			var txtPurchaseQuotationSupplierName = $(
					"#txtGRNSupplierName")
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_Supplier_Name);
			// $("#selDocName").hide();
			// option:selected").text(objPurchase.ltinvetorypurchaseordermaster[rowCount].);
			var txtPurchaseQuotationDocSeries = $(
					"#txtGRNDocSeries").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_Series);
			//var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;
			
			var txtPurchaseQuotationReferenceNo = $("#txtGRNReferenceNo").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_reference_no);
			
			var txtPurchaseQuotationAddress = $("#txtGRNAddress").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_Address);
			var sclPurchaseQuotationDocstatus = $("#sclGRNDocstatus option:selected").text(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_status);
			var txtPurchaseQuotationTotalDocDiscount = $("#txtGRNTotalDocDiscount").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_total_discount);
		
			var txtPurchaseQuotationTotalDocQty = $("#txtGRNTotalDocQty")
					.val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_total_doc_qty);

			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderRequestNo")
			.val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_purchase_Request_No);
			
		}
	}
	
	getNextGRNId();
}
*/

 

/*function fetchPurchaseOrderMasterNew() {
	var inputs = [];
	inputs.push('action=fetchPurchaseOrderMasterDetail');
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
			//alert(r);
		//	$("#documentContent").setTemplate(inventoryPurchaseOrderTemp);
			$("#documentContentOrderMaster").processTemplate(pobj1);
			$("#docuemntAjaxRespfororderMaster").html(r);
		}
	});
}
*/
/*************************************Manufacturing Date and expariDare**************************************/
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


/*function clearnewGRN() 
{
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
//	getNextQuotationId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	$("#txtPurchaseOrderRequestNo").val(0);
	$("#txtPurchaseOrderQuatationNo").val(0);
	getNextGRNId();
}*/

/**********************************Search Grn Master Details******************************/
function fetchGrnforSearch(mrnId) {
//alert(mrnId);
var byVendorName = $("#byVendorName").val();
var byInvoiceNumber = $("#byInvoiceNumber").val();
	if((byVendorName == "")&&(byInvoiceNumber==""))
	{
		alert("Please Enter Either Invoice Number or Vendor Name for search");
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchGRNMasterDetail');
	inputs.push('isEdit=yes');
	inputs.push('partyId=' + mrnId);
	inputs.push('VendorName=' + byVendorName);
	inputs.push('byInvoiceNumber=' + byInvoiceNumber);
	
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
			SrNo=1;
			if (objMRN.ltinvetorypurchasecommonmaster.length > 0) {
				$("#documentContent").setTemplate(inventoryGRNTemp);
				$("#documentContent").processTemplate(pobj1);
			//	$("#docuemntAjaxResp").html(r);

			} else {
				alert("Record not found..!");
				fetchGRNMasterDetails("no","onload");
				}
			$('#byMrnId').val("");
			$('#byVendorName').val("");
			$('#byInvoiceNumber').val('');
		}
	});
}

/******************************************************new party MASTER FOR PURSHACE GRN PO**added in LIST*************************************************husen**/ 
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
	
	
	
	if(txtcontaddressPO != "")
	{
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtcontaddressPO)) {
			alert("Contact address should be of alphabets and digits  only with a single space allowed..!");
			$("#txtcontaddressPO").focus();
			return false;
		  }
	}
	
	
		
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
				alert("Record Updated successfully..!");
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

/*function fetchPartyMasterContactsDetailsPO() {
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
}*/

/*function EditPartyContactsDetailsPO(id) {
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
*/
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


/*function SavePartyMasterAddressInfoDetailsPO() 
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


/************************** Featch taxcode By Autosuggetion  for Grn Author :sudhir Date:2-7-2015***************** */


function autotaxCodeGrn1(inputID, typeauto) {
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
						applyTaxforItemexpense(inputID);
						if (r.length == 20) {
							/*$('#txtPurchaseQuotationTaxAmount_' + idValue).val(itemrate);*/
							
							//applyTaxforItemexpense(inputID); //added by paras	
							///alert("NO MATCHING FOUND");

						} else {
							
							
							ajaxResponse = eval('(' + r + ')');
							var availableTags = [];
							availableTags = ajaxResponse;
							
                          if(availableTags.length==0){
                        
                  			var arrValue = (inputID).split("_");
                  			var idValue = (arrValue[1]);
                  			$('#'+inputID + idValue).val(txtVal1);
								//applyTaxforItemexpense(inputID); //added by paras
							}

						/*	for ( var i = 0; i < ajaxResponse.inventoryTaxSetUps.length; i++) {
								availableTags
										.push(ajaxResponse.inventoryTaxSetUps[i].tax_code
												+ "_"
												+ ajaxResponse.inventoryTaxSetUps[i].tax_rate);
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
							$("#div" + inputID + " .typeahead").show();

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
		//	applyTaxforItem(idValue);//aedded by paras 
			$('#txtPurchaseQuotationTaxAmount_' + idValue).val(itemrate);
			
				applyTaxforItemexpense(inputID); //added by paras	
			
			
				rowAmtCalNEW(1,idValue);
			//rowAmtCal(1,idValue);
			totalVatAmtnEW(1,idValue);///added by paras calculate total vat

		}
	}
}



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


/************************* Adding Dynamic rows for  Openig Stock Author :sudhir Date:23/9/2015 *********************/

/*function toCreateDivGRNforOpnigStock() {
	$('#iHideGRNSaveBtnforOpenigStock').css('display','block');
	$("#closeonclickOpenigStock").hide();
	if (test > 0 && isNew > 0) {
		if (rowCount == 1) {

			rowCount = test;

		}
		rowCount++;

		$("#ItemInfoTableOpnigStock > tbody")
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
								+ ",onchange)'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
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
								+ "<td><input type='text' class='form-control input-SmallText' value='0'  id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount
								+ "'  ></td>"
								+    
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
		autotaxCodeGrn("txtPurchaseQuotationTaxCode_" + rowCount, "onload");

	} else {
		$("#ItemInfoTableOpnigStock > tbody")
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
								+ ",onchange)' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
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
								+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "'></td>"
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
								+ "' onkeypress='return validateNumbers(event);' readonly='' ></td> "
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
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value='0' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount
								+ "'></td>"
								+ "  <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
	auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
	autotaxCodeGrn("txtPurchaseQuotationTaxCode_" + rowCount, "onload");
		rowCount++;
	}

}*/

/**** toCreateDivGRNforOpnigStock  modified @Date 20may2016 Author sudhir  *********/

function toCreateDivGRNforOpnigStock() {
	$('#iHideGRNSaveBtnforOpenigStock').css('display','block');
	$("#closeonclickOpenigStock").hide();
	if (test > 0 && isNew > 0) {
		if (rowCount == 1) {

			rowCount = test;

		}
		rowCount++;

		$("#ItemInfoTableOpnigStock > tbody")
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
								+ ",onchange)'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);'><input type='hidden' id='txtlastUom"+rowCount+"'value=''><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "'  value='0' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' value='0' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' value='0' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "'  value='0' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount
								+ "'  ></td>"
								+    
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
		autotaxCodeGrn("txtPurchaseQuotationTaxCode_" + rowCount, "onload");

	} else {
		$("#ItemInfoTableOpnigStock > tbody")
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
								+ ",onchange)' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' ><input type='hidden' id='txtlastUom"+rowCount+"'value=''><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' value='0' ><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' value='0' ><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"'  ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3" + rowCount
								+ "' value='0'><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"'  ></label></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "'value='0'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"'   ></label></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' value='0' ></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount
								+ "'></td>"
								+ "  <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
	auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
	//autotaxCodeGrn("txtPurchaseQuotationTaxCode_" + rowCount, "onload");
		rowCount++;
	}

}


 /************************* End Adding Dynamic rows for  Openig Stock Author :sudhir Date:23/9/2015 *********************/

/************** Remove  row dynamically in table for  Openig Stock Author :sudhir Date:23/9/2015 ****************/

function toRemoveDivStockforOpengStock(RowCount) {
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
	//totalDocDiscountPQ();
}
/**************  End Remove  row dynamically in table for  Openig Stock Author :sudhir Date:23/9/2015 ****************/

/****************************** save GRN Openig Stock  Date:23/09/2015 ***********************************************/
function saveGRNOpenigStock()
{
	var txtPurchaseFormName = $("#txtPurchaseFormNameOpnigStock").val();
	var directORIndirectGRN ="IndirectGRN";
	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();

	var txtPurchaseQuotationDocNo = $("#txtGRNDocNoOpeningStock").val();
	var txtPurchaseQuotationDate1 = $("#txtGRNDOCDateOpenigStock").val();				
	var txtPurchaseQuotationMobileNo = $("#txtGRNMobileNoOpnigStock").val();
	var txtPurchaseQuotationSupplierCode = $("#txtVendorCodeOpnigStock").val();
	var txtGRNPurchaseInvoiceNumber = "NO";// $("#txtGRNPurchaseInvoiceNumberOpnigStock").val();
	var txtGRNDeliverychallanNumber = "NO";$("#txtGRNDeliverychallanNumberOpnigStock").val();
	
	var txtPurchaseQuotationSupplierName = $("#txtGRNSupplierNameOpnigStock").val();

	var selDocName = $("#selDocNameOpnigStock option:selected").text();
 
	var txtPurchaseQuotationDocSeries = $("#txtGRNDocSeriesOpnigStock").val();

	var txtGRNTotalPendingQty = $("#txtGRNTotalPendingQty").val();
	
	var txtGrnDocSeriesIsEdit = $("#txtGrnDocSeriesIsEdit").val();
	var txtDocSeries;
	if(txtGrnDocSeriesIsEdit == 'isEdit')
	{
			txtDocSeries = txtPurchaseQuotationDocSeries;
	}
	else
	{
		var finaltxtPurchaseGrnDocSeries =txtPurchaseQuotationDocSeries +"No"+":"+txtPurchaseQuotationDocNo;
			txtDocSeries = finaltxtPurchaseGrnDocSeries;
	}
	var OpenigStockflage ="Y";
	
	var txtPurchaseQuotationRequestNo =$("#txtPurchaseOrderRequestNoOpnigStock").val();
	
	var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNoOpnigStock").val();
	
	var txtPurchaseQuotationReferenceNo = $("#txtGRNReferenceNoOpnigStock")
			.val();

	var txtPurchaseQuotationAddress = $("#txtGRNAddressOpnigStock").val();
	var sclPurchaseQuotationDocstatus = $("#sclGRNDocstatusOpnigStock option:selected").text();
	
	var txtPurchaseQuotationAmountinlocalcurrency = $(
			"#txtGRNlocalcurrencyOpnigStock").val();
	var txtPurchaseQuotationTotalDocDiscount = $(
			"#txtGRNTotalDocDiscountOpnigStock").val();

	var txtPurchaseQuotationTotalDocQty = $("#txtGRNTotalDocQtyOpnigStock").val();
	
	//validation
	if(txtPurchaseQuotationDate1 == "" || txtPurchaseQuotationDate1 == null)
	{
	alert("Please select GRN date ");
	$("#txtGRNDOCDateOpenigStock").focus();
	return false;
	}
	
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
		    $("#txtGRNDOCDateOpenigStock").focus();
		   return false;
	    }
	   }
	
	/*var docseries= $("#txtGRNDocSeriesOpnigStock").val();
    alert(docseries);
    if(docseries == 0 || docseries == '-Select-')
    {
	    alert('please select Grn series');
		$("#txtGRNDocSeriesOpnigStock").focus();
		return false;
    }*/
    
	 var status = document.getElementById("sclGRNDocstatusOpnigStock");
     var docstatus = status.options[status.selectedIndex].text;
     
   //save all Charges @Date:8june2016
 	var txtSplDisc = 0;//$("#txtSplDisc").val();
 	var txtdebitAmt1 = 0;//$("#txtdebitAmt1").val();
 	var txtCD1 = 0;//$("#txtCD1").val();
 	var txtCDAmt = 0;//$("#txtCDAmt").val();
 	
 	var txtOctroi = 0;//$("#txtOctroi").val();
 	var txtSurcharge = 0;// $("#txtSurcharge").val();
 	var txtCreditAmt = 0;//$("#txtCreditAmt").val();
 	var txtFreight = 0;//$("#txtFreight").val();
 	
 	var txtVat = 0 ;//$("#txtVat").val();	
 	var txtlbt = 0 ;//$("#txtlbt").val();
 	var txtcst = 0 ;//$("#txtcst").val();
 	var txtExVat = 0;//$("#txtExVat").val();
 	var txtTotalVat = 0;//$("#txtTotalVat").val();
 	
 	var txtGross = 0; //$("#txtGross").val();
 	var txtLess = 0;//$("#txtLess").val();
 	var txtAdd = 0;//$("#txtAdd").val();
 	var textVat = 0;//$("#textVat").val();
 	
 	var txtNetAmt = 0; //$("#txtNetAmt").val();
 	
     /*if(docstatus == 0 ||  docstatus == 'Select')
     {
	    alert('Please select GRN Status');
		$("#sclGRNDocstatus").focus();
		return false;
     }*/
     
 	/** save all special Charges with his amount 11jully2016 **/
	var selboxChargeswithAmtList = "No";
	var sumofCharges = 0;
 	
     
	var materiallist = {
		ltinvetorypurchasecommonitemmaster : []
	};
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

			var txtPurchaseQuotationUnitPrice = 0;/*$("#txtPurchaseQuotationUnitPrice" + i).val();*/
			var txtPurchaseQuotationTrdeDiscountPercentage = 0;/*$("#txtPurchaseQuotationTrdeDiscountPercentage" + i).val();*/
			var txtPurchaseQuotationTrdeDiscountAmt = 0; /*$("#txtPurchaseQuotationTrdeDiscountAmt" + i).val();*/
			var txtPurchaseQuotationTrdeDiscountInRupess = 0;// $(	"#txtPurchaseQuotationTrdeDiscountInRupess" + i).val();
			var txtPurchaseQuotationBaseAmount = 0; /*$("#txtPurchaseQuotationBaseAmount" + i).val();*/
			var txtPurchaseQuotationTaxCode_ = "No Tax";/*$("#txtPurchaseQuotationTaxCode_" + i).val();*/
		 
			var txtPurchaseQuotationTaxAmount = 0; /*$("#txtPurchaseQuotationTaxAmount" + i).val();*/
			var txtPurchaseQuotationRowAmount = 0; /*$("#txtPurchaseQuotationRowAmount" + i).val();*/
			var txtPurchaseQuotationFactor1 = $("#txtPurchaseQuotationFactor1" + i).val();
			
			var txtPurchaseQuotationFactor2 = $("#txtPurchaseQuotationFactor2" + i).val();
			var txtPurchaseQuotationFactor3 = $("#txtPurchaseQuotationFactor3" + i).val();
			var txtPurchaseQuotationFactor4 = $("#txtPurchaseQuotationFactor4" + i).val();
		
			var txtPurchaseQuotationActualQuantity = $("#txtPurchaseQuotationActualQuantity" + i).val();
			var txtPurchaseQuotationPendingQuantity = 0; //var txtPurchaseQuotationPendingQuantity = $("#txtPurchaseQuotationPendingQuantity" + i).val();
			var txtPurchaseQuotationBatchNo = $("#txtPurchaseQuotationBatchNo" + i).val();
			var txtPurchaseMfgDate = $("#txtPurchaseMfgDate_" + i).val();
			var txtPurchaseExpiryDate = $("#txtPurchaseExpiryDate_" + i).val();
			
			
			var txtPurchaseQuotationFactor1UOM = $("#txtPurchaseQuotationFactor1UOM" + i).text(); 
			var txtPurchaseQuotationFactor2UOM = $("#txtPurchaseQuotationFactor2UOM" + i).text(); 
			var txtPurchaseQuotationFactor3UOM = $("#txtPurchaseQuotationFactor3UOM" + i).text(); 
			var txtPurchaseQuotationFactor4UOM = $("#txtPurchaseQuotationFactor4UOM" + i).text(); 
			var txtPurchaseQuotationLastFactorUOM = $("#txtPurchaseQuotationLastFactorUOM" + i).text();
			var txtlastUom = $("#txtlastUom" + i).val();
			 
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
		 
		    
		    if(txtPurchaseQuotationDocQuantity !== txtPurchaseQuotationActualQuantity){
				
		    	alert(" Order Quantity should be equal to Item Quantity "+i+" Row");
				$("#txtPurchaseQuotationActualQuantity" + i).focus();
				return false;
				
			}

			materiallist.ltinvetorypurchasecommonitemmaster
					.push({

						// inv_purchase_common_item_code:,
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
						inv_batch_stock_item_mfg_date:txtPurchaseMfgDate,
						inv_batch_stock_item_exp_date:txtPurchaseExpiryDate,
						
						
						item_purchase_factor_uom_1 : txtPurchaseQuotationFactor1UOM,
						item_purchase_factor_uom_2 : txtPurchaseQuotationFactor2UOM,
						item_purchase_factor_uom_3 : txtPurchaseQuotationFactor3UOM,
						item_purchase_factor_uom_4 : txtPurchaseQuotationFactor4UOM,
						inv_batch_stock_fixed_item_qty : txtPurchaseQuotationDocQuantity,
						inv_item_purchase_last_factor_uom :txtlastUom,

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
	var inputs = [];

	inputs.push('action=saveGRNDetail');
	inputs.push('materiallist=' + materiallist);
	inputs.push('txtPurchaseQuotationDocNo=' + txtPurchaseQuotationDocNo);
	inputs.push('txtPurchaseQuotationDate1=' + txtPurchaseQuotationDate1);
	inputs.push('txtPurchaseQuotationMobileNo=' + txtPurchaseQuotationMobileNo);
	inputs.push('txtPurchaseQuotationSupplierCode='	+ txtPurchaseQuotationSupplierCode);
	inputs.push('txtGRNPurchaseInvoiceNumber='	+ txtGRNPurchaseInvoiceNumber);
	inputs.push('txtGRNDeliverychallanNumber='	+ txtGRNDeliverychallanNumber);
	inputs.push('txtPurchaseQuotationSupplierName='	+ txtPurchaseQuotationSupplierName);
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
	inputs.push('OpenigStockflage='+OpenigStockflage);
	inputs.push('directORIndirectGRN='+directORIndirectGRN);
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
	inputs.push('selboxChargeswithAmtList=' + selboxChargeswithAmtList);
	inputs.push('sumofCharges=' + sumofCharges);
	 	
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
			
			var txtGrnSaveOrUpdate = $("#txtGrnSaveOrUpdate").val();
			
			if(txtGrnSaveOrUpdate == 'Update')
				{
				alert("Record Updated successfully..!");
				}
			else{
				alert("Record saved successfully..!");
				}
			
			
			$('#Openig_Stock_Form').removeClass('fade');
			$('#Openig_Stock_Form').modal('hide');		 			
			window.location.reload("inventory_Good_Receipt_Note.jsp");
		}
	});

}
/****************************** End save GRN Openig Stock  Date:23/09/2015 ***********************************************/


/* ************************************** Fetch terms and condition  Details Author :sudhir Date:27/10/2015 *************************************/
function fetchtermsandconditionsDetailsforGrn(grnId) {
		var inputs = [];
		inputs.push('action=fetchtermsandconditionsDetailsforGrn');
		inputs.push('grnId='+grnId);
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
				$("#txtPurchaseQuotationNotes2").val(objPurchase.ltinvetorypurchasecommonmaster[0].inv_purchase_grn_terms_and_condition_master);
				
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
		 $("#txtPurchaseQuotationRowAmount"+rowcount).val(' ');
		
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
			rowAmtCal(1,rowcount);
		 
		}
	 
}*/

/***modified Date:1jully2016 reason:remove 100 > validation for AMt @Author:sudhir***/
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
		// return false;
		
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


/*calculate Total TradeDis Discount IN rupess @Date14june2016 @Authour Sudhir*/ 
/***modified Date:1jully2016 reason:remove 100 > validation for AMt @Author:sudhir***/
function calculTradeDisRs(id, rowCount) {

	var treadeDiscountRs = $("#txtPurchaseQuotationTrdeDiscountInRupess" + rowCount).val();
	var oldbaseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	
	/*
	if(treadeDiscountRs > 100 )
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
	{*/

	if (treadeDiscountRs) {
		
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val('');
		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');

		var docqty = $("#txtPurchaseQuotationDocQuantity" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowCount).val();

		var baseAmt = parseFloat(docqty) * parseFloat(unitprise);

		var finaltotalbaseAmt = parseFloat((baseAmt)) - parseFloat(treadeDiscountRs);
	
	
        var totalAmt = finaltotalbaseAmt ;
		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val(treadeDiscountRs);

		/*var finalBaseAmt = baseAmt - totalAmtInpercntage;*/
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(finaltotalbaseAmt.toFixed(2));

		 $('#txtPurchaseQuotationRowAmount'+rowCount).val(totalAmt.toFixed(2));
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
	/*rowAmtCal(1,rowCount);
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);*/
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
	$("#txtPurchaseQuotationTaxAmount_"+rowCount).val(finalRate);
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



/****************** fetch Party Master Address Details for openig Stock  @Author Sudhir @Date 12April2016************/
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
				
			
			/*********************************************** featch address and mobile no for suppler name In purchase quatation  Date:24/6/2015 Author :sudhir ***********************************/
			var obj = $("#PartyAddressTableInfoListPO").html();
			var objPurchase = JSON.parse(obj);
			for(var row =0 ;row < objPurchase.ltinventorypartymasteraddressinfodto.length;row ++  )
			{
			$("#txtGRNAddressOpnigStock").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
			break;
			}
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
			
			
		}
	});
}

/***************** @Author Sudhir @Date:13april2016 ***********/
function directIndirectGRN()
{
	var $radios = $('input:checkbox[name=chkDirectGRN]');
	if ($radios.is(':checked') == true)
	{
		$('#divtxtPurchaseOrderList').hide();
		$('#btnAddNew').show();
		$('#divtxtPartialGRNDetails').css('display','none');
		
		$("#txtGRNTotalDocQty").val(0);
		toCreateDivGRN();
		
	/*	$('#btnAddNew').css('display','block');*/
	}
	if ($radios.is(':checked') == false)
	{
		$('#divtxtPurchaseOrderList').show();
		$('#btnAddNew').css('display','none');
		$('#divtxtPartialGRNDetails').css('display','block');
		$("#txtGRNTotalDocQty").val(0);
	}
	
}

/********** multipletaxCalculation @Author Sudhir @Date:13april2016  ********/
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
	$("#ApplyTaxforItem").show();
	
}


/******************** taxcalculation author:sudhir  @Date:13april2016 **********************/

function taxcalculation(id ,rowCount){
	var taxcodeandrate = $("#txtPurchaseQuotationTaxCode_"+rowCount).val();
	if(taxcodeandrate=="Select")
		{
		alert("please Select Tax");
		return false;
		}
	var taxRate =  taxcodeandrate.split("_");
	var finalRate = taxRate[1];
	$("#txtPurchaseQuotationTaxAmount_"+rowCount).val(finalRate);
	rowAmtCal(1,rowCount);
}


/****** **** applyTaxforItem for item in GRN Author:sudhir @Date:13april2016 ***** *****/
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
	//$("#txtPurchaseQuotationTaxAmount"+rowCount).val(sumofRate);
	$('#lstBoxforTax').html();
	$("#ApplyTaxforItem").hide();
	rowAmtCal(1,rowCount);
	totalVatAmt(1,rowCount);
}

function  applyTaxforItemexpense(inputID){
	
	var txtPurchaseOrderTaxCode_ = "";
	// remove the wite space and empty option

		txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_ + ($("#"+inputID).val() + ",");

	if(txtPurchaseOrderTaxCode_== "")
	{
		alert("please Apply atleast one tax for Item");
		return false;
	}
	txtPurchaseOrderTaxCode_= txtPurchaseOrderTaxCode_.substring(0, txtPurchaseOrderTaxCode_.length-1);
	//var rowCount = $("#hiddenCount").val();
	var rowCount = inputID.split("_");
	var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");
/*	if(idValue=="" || idValue== undefined){
		var idValue1=arrValue.toString();
		alert("string=="+idValue1);
		idValue = idValue1.replace ( /[^\d.]/g, '' );
		alert("new=="+idValue);
	
	}*/
	 var sumofRate = 0;
	 for(var i=0;i<Finalrateandtax.length;i++)
		{ 
		finalrat = Finalrateandtax[i];
		var taxRate =  finalrat.split("_");
		finalRateamt = taxRate[1];
		if(finalRateamt==null ||finalRateamt ==undefined){
			finalRateamt = taxRate[0];
		}
		sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
		if(isNaN(sumofRate)){
			sumofRate = finalRateamt;
		}
		if(isNaN(finalrat)){
			finalrat== finalRateamt;
		}

		}
	 if(rowCount[0]=="txtPurchaseQuotationTaxCode_"){
		 $("#txtPurchaseQuotationTaxCode_"+rowCount[1]).val(sumofRate);
			$("#txtPurchaseQuotationTaxAmount_"+rowCount[1]).val(sumofRate);
		 
	 }else{
		 $("#txtPurchaseQuotationTaxCode_"+rowCount[1]).val(sumofRate);
	     $("#txtPurchaseQuotationTaxAmount_"+rowCount[1]).val(sumofRate);
	 }
	/*$("#txtPurchaseQuotationTaxCodePO_"+rowCount[1]).val(finalrat);
	$("#txtPurchaseQuotationTaxAmount_"+rowCount[1]).val(sumofRate);*/
	$('#lstBoxforTax').html();
	$("#ApplyTaxforItem").hide('hide');
	rowAmtCalNEW(1,rowCount[1]);
	totalVatAmtnEW(1,rowCount[1]);
	/* return false;
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
	alert(taxcodeandrate);*/
}
function rowAmtCalNEW(id, rowCount) {

	var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
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
		var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$('#txtGRNTaxAmtinRs'+ rowCount).val(finalcaltaxanmount); //add tax amount in Rs @author:paras @Date:23nov 
		 
		 finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		 var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(finalRowAmtcalculationgTax);
		
		/*var sum = 0;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
		sum = parseFloat(baseAmt) + parseFloat(taxAmt);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(sum);*/
	}

}
function totalVatAmtnEW(id, rowCount) {
	 
 	var sum = 0;
	var baseAmount;
	var RowCount = $("#RowCount").val();
	var caltaxonBaseAmt;
	// var totalRow = $("#totalRow").val();
	var totaltblsize = $("#totaltblsize").val();
	for ( var i = 1; i <= totaltblsize; i++) {
		baseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + i).val();
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
/********************************* End applyTaxforItem for item in GRN Author:sudhir @Date:13april2016 *****************************/


/**** hideApplyTaxpopaup for item in GRN Author:sudhir @Date:13april2016 ****/
function  hideApplyTaxpopaup() {
	 $('#lstBoxforTax').html();
	 $("#ApplyTaxforItem").hide();	
	 $("#txtNewTax").val('');
	}
/*********** End GRN Author:sudhir @Date:13april2016 ***********/



/** Fetch taxcode By Autosuggetion for GRN Author:sudhir @Date:13april2016**/
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


/***select * Tax code and tax rate for GRN Author:sudhir @Date:13april2016***/
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
/************************remove tax code and rate from for GRN Author:sudhir @Date:13april2016 ***********************/
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
								 
							/* var fact3QTY = ((qty) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3)) / factQty44;
							 $('#txtPurchaseQuotationFactor3' + rowCountPO).val(parseFloat(fact3QTY).toFixed(2));
							 
							 var fact2QTY = ((fact3QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2)) / factQty33;
							 $('#txtPurchaseQuotationFactor2' + rowCountPO).val(parseFloat(fact2QTY));
							 
							 var fact1QTY = ((fact2QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1)) / factQty22;
							 $('#txtPurchaseQuotationFactor1' + rowCountPO).val(parseFloat(fact1QTY));
							  
							 $('#txtPurchaseQuotationFactor4' + rowCountPO).val(qty);*/	
						     var fact3QTY = ((qty) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3)) / factQty44;
							 fact3QTY =parseFloat(fact3QTY).toFixed(2);
							 
							 if(fact3QTY ==undefined || fact3QTY == NaN || fact3QTY =="NaN" || isNaN(fact3QTY)){
								 fact3QTY=0;
							 }
							 
							 
							 $('#txtPurchaseQuotationFactor3' + rowCountPO).val(fact3QTY);
							 
							 var fact2QTY = ((fact3QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2)) / factQty33;
							 
							 fact2QTY =parseFloat(fact2QTY);
							 if(fact2QTY ==undefined || fact2QTY == NaN || fact2QTY =="NaN" || isNaN(fact2QTY)){
								 fact2QTY=0;
							 }
							
							 $('#txtPurchaseQuotationFactor2' + rowCountPO).val(fact2QTY);
							 
							 var fact1QTY = ((fact2QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1)) / factQty22;
							
							 fact1QTY =parseFloat(fact1QTY);
							 if(fact1QTY ==undefined || fact1QTY == NaN || fact1QTY =="NaN" || isNaN(fact1QTY)){
								 fact1QTY=0;
							 }
							 $('#txtPurchaseQuotationFactor1' + rowCountPO).val(fact1QTY);
							  
							 $('#txtPurchaseQuotationFactor4' + rowCountPO).val(qty);
					
						  }
			 }
        } 

}


/* ***** **** chkTradAmtorPercentage *for GRN Author:sudhir @Date:13april2016 *** *******/

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

/********** calculate total Amount  @Author sudhir Date:13April2016 *********/
function rowAmtCal(id, rowCount) {

	var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
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
		var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$('#txtGRNTaxAmtinRs'+ rowCount).val(finalcaltaxanmount);
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(
				finalRowAmountAddingtax);
	}

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

			$("#txtGRNMobileNo").val(myGenralnfoObj.party_master_general_info_mobile);
			 
		}
	});
}




/**** tota lPending Qty GRN @author Sudhir modified @Date:19April2016  modified Date 08/09/2016*/
function totalPendingQtyGRN() {
	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	// var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= totaltblsize; i++) {
		totalQty = $("#txtPurchaseQuotationPendingQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}
 
	$("#txtGRNTotalPendingQty").val(sum);
	$("#RowCount").val(RowCount);

}



/*************************************GEt pending orders form order table*****************************************/

function getPartialGRN() {
 
	var inputs = [];
	inputs.push('action=getPartialGRN');
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
			//alert(r);
			$("#selPartialGRN").setTemplate(selPartialGRN);
			$("#selPartialGRN").processTemplate(pobj1);
		}
	});
}

var selPartialGRN = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}"
	+ "{#if $T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_form_Name == 'GRN'}" +
			"<option  value='{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_batch_stock_master_doc_Series}</option>"
	+ "{#/if}{#/for}";




/**************************************************show partial GRN Author: Sudhir Modified Date:24:11:2015 ********************************************************* */
/*function viewPartialGRNDetails(partyId) {
	alert(partyId);
	$('#taxcode').css('display','none');
	$('#taxAmount').css('display','none');
	$('#divtxtGRNwithoutPO').css('display','none');

	clearPopUp();
	 
	$('#iHideGRNSaveBtn').css('display','block');
	 $("#closeonclick").hide();
	var inputs = [];
	inputs.push('action=fetchPurchaseOrderItemMasterDetail');
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
					pobj1 = eval('(' + r + ')');
					//fetchPurchaseQuotationMasterNew();
					srNumber = 1;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
						$("#ItemInfoTable> tbody")
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
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left;' class='typeahead form-group'  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_Name
										+ "'  onkeyup = 'auto(this.id,onchange)' readonly='' /> "
										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_code
										+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_master_id
										+ "'/> </div> </td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_doc_Qty
										+ "'  onblur='totalAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);'readonly=''></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_unit_price
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ ""
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_per
										+ "' onblur='calculTradeDis(this.id,"
										+ srNumber
										+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_rupess
												+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td>"
										+ " <td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_amount
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ "<td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_base_amount
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ "<td style='display: none'><select readonly='' class='form-control input-SmallText'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_code + "</option>  </select></td>   <td style='display: none'><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText'  readonly='' id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_row_amount
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor1
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor2
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor3
										+ "' onkeypress='return validateNumbers(event);' > <lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +"</label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor4
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_actural_qty
										+ "' onkeyup='pendingAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);'  ></td> "
										+ "<td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationPendingQuantity"
										+ srNumber
										+ "' value='0' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_batch_No
										+ "'></td>"
										+ " <td><input type='text' readonly='readonly'class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ srNumber
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ srNumber
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;;' > </td> </tr>");

				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
			}
			// auto("txtPurchaseQuotationItemName_","onload");
				//	pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_pending_qty
					totalDocQtyPQ();
					totalDocDiscountPQ();
					totalPendingQtyGRN();
			var txtEmptyItem = $("#txtEmptyItem").val();
			//auto(txtEmptyItem, "onload");
			
			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
			isNew=1;
		}

	});
		
	var obj = $("#docuemntAjaxResp").html();
	alert(obj);
	objPurchase = JSON.parse(obj);
	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {
		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no == partyId) {

			//alert(obj);
			var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo")
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_batch_stock_master_doc_no);
			
			*//**********************************date convert***************************************//*	
			var str=(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_batch_stock_master_doc_date).split("-");
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];
			$("#txtGRNDOCDate").val(leaddate);
			
			
			
			
			var txtPurchaseQuotationDate1 = $("#txtPurchaseOrderDatePRL")
					.val(
							objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_common_master_create_date);
			var txtPurchaseQuotationMobileNo = $(
					"#txtGRNMobileNo")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_mobile_number);
			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO')
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Id);
			var txtPurchaseQuotationSupplierName = $(
					"#txtGRNSupplierName")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Name);
			// $("#selDocName").hide();
			// option:selected").text(objPurchase.ltinvetorypurchaseordermaster[rowCount].);
			var txtPurchaseQuotationDocSeries = $(
					"#txtGRNDocSeries").val(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_Series);
			//var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;
			
			var txtPurchaseQuotationReferenceNo = $("#txtGRNReferenceNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_reference_no);
			
			var txtPurchaseQuotationAddress = $("#txtGRNAddress").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Address);
			var sclPurchaseQuotationDocstatus = $("#sclGRNDocstatus option:selected").text(objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_status);
			var txtPurchaseQuotationTotalDocDiscount = $("#txtGRNTotalDocDiscount").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_order_master_total_discount);
		
			var txtPurchaseQuotationTotalDocQty = $("#txtGRNTotalDocQty")
					.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_order_master_total_doc_qty);

			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderRequestNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_order_master_purchase_Request_No);
		
			break;
			
		}
	}
	var masterId = $('#txtVendorCodePO').val();
	 
	fetchPartyMasterContactsDetailsPO(masterId);
	fetchPartyMasterAddressDetailsPO(masterId);
	fecthPartyOtherInfoPO(masterId);
	
	getNextGRNId();
}*/




/*** *show partial GRN Author: Sudhir Modified Date:24:11:2015 ****/

function viewPartialGRNDetails(partyId) {
	$("#saveGRN").show();
	$("#removebtn").hide();
	/*$('#taxcode').css('display','none');
	$('#taxAmount').css('display','none');*/
	$('#divtxtGRNwithoutPO').css('display','none');
	
	$('#Sales_Quotation_Form').find('input, text').attr("readonly", "readonly");
	
	purchaseQuatViewRefresh();
	$("#selDocName").text("");
	document.getElementById("selDocName").disabled = true;
	$("#closeonclick").hide();
	$("#txtGrnDocSeriesIsEdit").val('isEdit');
	$('#iHideGRNSaveBtn').css('display','block');
	$("#divtxtPurchaseOrderList").hide();
	$("#txtGrnSaveOrUpdate").val('Update');
	
	var obj = $("#docuemntAjaxResp").html();
	//alert(obj);
	var objPurchase = JSON.parse(obj);

	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no == partyId) {

			var txtPurchaseQuotationDocNo = $("#txtGRNDocNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no);
			/**********************************date convert***************************************/	
			/*var str=(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_date).split("-");
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];*/
			
			$("#txtGRNDOCDate").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_date);
			
			/*var txtPurchaseQuotationDate1 = $("#txtPurchaseQuotationDate1")
					.val();*/
			var txtPurchaseQuotationMobileNo = $("#txtGRNMobileNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_mobile_number);

			var txtGRNPurchaseInvoiceNumber = $("#txtGRNPurchaseInvoiceNumber").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_purchase_invoice_number);
			var txtGRNDeliverychallanNumber = $("#txtGRNDeliverychallanNumber").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_purchase_delivery_challan_number);

			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO')
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Id);

			var txtPurchaseQuotationSupplierName = $(
					"#txtGRNSupplierName")
					.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Supplier_Name);
			document.getElementById("txtGRNSupplierName").disabled = true;
			
			// $("#selDocName").hide();
			// option:selected").text(objPurchase.ltinvetorypurchasecommonmaster[rowCount].);
			var txtPurchaseQuotationDocSeries = $("#txtGRNDocSeries").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_Series);
			var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;
			var txtPurchaseQuotationReferenceNo = $("#txtGRNReferenceNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_reference_no);
			var txtPurchaseQuotationAddress = $("#txtGRNAddress").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_Address);
			var sclPurchaseQuotationDocstatus = $(
					"#sclGRNDocstatus option:selected")
					.text(
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
			
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderQuatationNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_batch_order_No_fk);
			
			var txtGRNDeliveryDate = $("#txtGRNDeliveryDate").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_purchase_delivery_date);

			$("#txtGRNTotalPendingQty").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_total_item_pending_qty);
			
			
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
			
			document.getElementById("chkVMI").disabled = true;
			if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_common_master_vmi == 1) {
				$("#chkVMI").prop('checked', true);
				
			}
			
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
	
    var masterId = $('#txtVendorCodePO').val();
	 var grnId = $("#txtGRNDocNo").val();
	/*fetchtermsandconditionsDetailsforGrn(grnId);
	fetchPartyMasterContactsDetailsPO(masterId);
	fetchPartyMasterAddressDetailsPO(masterId);
	fecthPartyOtherInfoPO(masterId);
	*/

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
					//fetchPurchaseQuotationMasterNew();
					srNumber = 1;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
						$("#ItemInfoTable > tbody")
						.append(
								"<tr id='deleterow"
										+ srNumber
										+ "'> <td> <input type='checkbox'  name='checkbox"+ srNumber
										+ "' id='checkbox"
										+ srNumber
										+ "'/></td>" +"<td> "+ srNumber + "</td>"
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text'   readonly='' class='typeahead form-group'  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_item_name
										+ "'  onkeyup = 'auto(this.id,onchange)' onkeypress='return validateOnlyName(event);' style='text-align:left;width:256px;' /> "
										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_code
										+ "' readonly =''/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
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
										+ ")' onkeypress='return validateNumbers(event);' readonly ='' > <input type='hidden' id='txtlastUom"+srNumber+"'value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"'> <lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +" </label> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + srNumber + "' value='"+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_qty + "' /> <input type='hidden' id='txtPurchaseQuotationCurrentItemQty"+srNumber+"' value='"+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_qty + "' />   <input type='hidden' id='txtfixdPurchaseQuotationDocQuantity"+srNumber+"' value='"+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_qty +"'/> <lable id ='lblPurchaseQuotationDocQuantity"+srNumber+"'  style ='text-align:center' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_actural_qty+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_actural_qty +" </label> </td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_rate
										+ "' onkeypress='return validateNumbers(event);' readonly = '' ></td>"
										+ ""
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_per
										+ "' onblur='calculTradeDis(this.id,"
										+ srNumber
										+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' readonly ='' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_rupess
												+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' readonly =''></td>"
										+ " <td><input type='text' class='form-control input-SmallText'  style='width:60px;' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_discount_amount
										+ "' onkeypress='return validateNumbers(event);' ></td>"
										+ "<td><input readonly='' style='width:190px;'  type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_base_amount
										+ "' onkeypress='return validateNumbers(event);'readonly ='' ></td>"
										+ " <td ><select style='width:130px;' class='form-control input-SmallText'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_code + "</option>  </select></td> <td><input type='text' style='width:60px;' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount_"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' readonly ='' ></td> "
                                        + "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxAmtinRs"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess
										+ "' readonly='' ></td>"
										+ "<td><input type='text' style='width:190px;' class='form-control input-SmallText' readonly=''  id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_amount
										+ "'></td>"
										+ "<td><input style='width:60px;' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor1
										+ "' onkeypress='return validateNumbers(event);' readonly =''> <lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
										+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor2
										+ "' onkeypress='return validateNumbers(event);' readonly =''><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor3
										+ "' onkeypress='return validateNumbers(event);' readonly =''><lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor4
										+ "' onkeypress='return validateNumbers(event);' readonly =''><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='0' onkeyup='pendingAmountforpartialGRN(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);'> <input type='hidden' style='width:100px;' id='txtPurchaseQuotationhiddenActualQuantity"+srNumber+"' value='"+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_actural_qty + "'/></td> "
										+ "<td><input  style='width:60px;' type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity" 
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock__item_pending_qty
										+ "' onkeypress='return validateNumbers(event);' readonly ='' > <input type=hidden id='txtfixedPurchaseQuotationPendingQuantity"+srNumber+"' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock__item_pending_qty
										+ "' /></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
										+ srNumber
										+ "' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_code + "'></td>"
										+ "<td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"+srNumber+"' onclick = 'getMfgandexpyDate(this.id,"+ srNumber+ ")'; style='float:left;' value='"+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_mfg_date +"' readonly =''> </td>"+
										"<td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"+ srNumber	+"' onclick ='getMfgandexpyDate(this.id,"+srNumber+ ")'; style='float:left;' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_exp_date+"'> </td> <td><button id='addtoMaintenance_"+ srNumber+"'' class='btn btn-xs btn-info' type='button' value='Add' onclick='addtoMaintanace(this.id,"+srNumber+ ")' data-toggle='modal' data-target='#addToMaintenacediv'> <i class='fa fa-plus'></i></button> <div style='display:none;' id='allitemlistforMaintenace"+ srNumber+"' class='allitemlistforMaintenace"+srNumber+"' ></div> </td>" + "</tr>");

				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
					}
					// auto("txtPurchaseQuotationItemName_","onload");
					totalDocQtyPQ();
					totalDocDiscountPQ();

					var txtEmptyItem = $("#txtEmptyItem").val();
					//auto(txtEmptyItem, "onload");

					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				}
			});

}
 
 

/* ****  @date: 21APril2016 @Author sudhir  modified Date 16sep2016 ***/
function pendingAmountforpartialGRN(id, rowCount) {
	
	var fixedhiddenPendingQty = $("#txtfixedPurchaseQuotationPendingQuantity"+ rowCount).val();
	var lblPurchaseQuotationDocQuantity = $("#lblPurchaseQuotationDocQuantity"+ rowCount).text().trim();
	var fixedhiddenitemQty = $("#txtfixdPurchaseQuotationDocQuantity"+ rowCount).val();
	
	/**** geting currentItemQty item qty and puting into changing qty becuse changing qtity change dyanmiacally when parital getting *****/
	var currentItemQty = $("#txtPurchaseQuotationCurrentItemQty"+ rowCount).val();

	$("#txtPurchaseQuotationChangingItemQty" + rowCount).val(currentItemQty);
	var txtPurchaseQuotationChangingItemQty = $("#txtPurchaseQuotationChangingItemQty" + rowCount).val();
	
	/**** this is actual item qty form database *****/
	var txtPurchaseQuotationhiddenActualQuantity = $("#txtPurchaseQuotationhiddenActualQuantity" + rowCount).val();
	//put fixed item qty to lbl
	//$("#lblPurchaseQuotationDocQuantity"+ rowCount).text(fixedhiddenitemQty);
	$("#lblPurchaseQuotationDocQuantity"+ rowCount).text(txtPurchaseQuotationhiddenActualQuantity);
	//put fixed fixed hidden Pending Qty
	$("#txtPurchaseQuotationPendingQuantity"+rowCount).val(fixedhiddenPendingQty);
	
	var txtPurchaseQuotationPendingQuantity = $("#txtPurchaseQuotationPendingQuantity" + rowCount).val();
	var actualquantity = $('#' + id).val();
	/*var quantity = $('#txtPurchaseQuotationDocQuantity' + rowCount).val();*/
	if(actualquantity == "")
		{
		 $("#txtPurchaseQuotationPendingQuantity"+rowCount).val(txtPurchaseQuotationPendingQuantity);
		
		 totalPendingQtyforPartialGRN();
		 
		 
			/* this used for calculation the base AMT 19sep2016 */
			 totalAmountforParialGRN(1,rowCount);
			 		 		 
			 totalVatAmt(id, rowCount);
			 rowAmtCal(id, rowCount);
			 
			 calcuatSumforTradeDisAmtforPartialGRN();
			 calcuatSumforitemQTYforPartialGRN();
		 
			 totalGrossAmt(id, rowCount);
			 calculateNetAmount();
		 
		 return false;
		}
	
	if (parseInt(actualquantity) > parseInt(txtPurchaseQuotationPendingQuantity)) {
		alert("Please enter valid quantity");
		 $("#lblPurchaseQuotationDocQuantity"+ rowCount).text(txtPurchaseQuotationhiddenActualQuantity);
		 $('#' + id).val('0');
		totalPendingQtyforPartialGRN();
		
		totalAmountforParialGRN(1,rowCount);
		totalVatAmt(id, rowCount);
		rowAmtCal(id, rowCount);
		 
		calcuatSumforTradeDisAmtforPartialGRN();
		calcuatSumforitemQTYforPartialGRN();
		
		totalGrossAmt(id, rowCount);
		 calculateNetAmount();
		 
		return false;
	} else {
		
		 var pendingQty = parseInt(txtPurchaseQuotationPendingQuantity) - parseInt(actualquantity);
		 $("#txtPurchaseQuotationPendingQuantity"+rowCount).val(pendingQty);
		 
		 var finalItemQty = parseInt(actualquantity) + parseInt(txtPurchaseQuotationhiddenActualQuantity);
		 $("#lblPurchaseQuotationDocQuantity"+ rowCount).text(finalItemQty);
		 
		var finalChangingItemQty  = parseInt(actualquantity) + parseInt(txtPurchaseQuotationChangingItemQty);
		//alert("txtPurchaseQuotationChangingItemQty : "+finalChangingItemQty);
		$("#txtPurchaseQuotationChangingItemQty"+ rowCount).val(finalChangingItemQty);
		 
	}

	totalPendingQtyforPartialGRN();
	
	totalAmountforParialGRN(1,rowCount);
	totalVatAmt(id, rowCount);
	rowAmtCal(id, rowCount);
	calcuatSumforTradeDisAmtforPartialGRN();
	calcuatSumforitemQTYforPartialGRN();
	
	totalGrossAmt(id, rowCount);
	calculateNetAmount();
}


/**** total Pending Qty for Partial GRN @author Sudhir modified @Date:21 April 2016 */
function totalPendingQtyforPartialGRN() {
	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	// var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= totaltblsize; i++) {
		totalQty = $("#txtPurchaseQuotationPendingQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}
 
	$("#txtGRNTotalPendingQty").val(sum);
	$("#RowCount").val(RowCount);
}




/****************** Active Proccesd Quotation color  Author :sudhir Date:20/11/2015 ****************/
function openPlanGRN() {
	$("#opneningGRNTab").css("background-color", "");
	$("#planGRNTab").css("background-color", "#81A981");
	$("#opneningGRNTab").css("color", "black");
	$("#planGRNTab").css("color", "white");
	fetchGRNMasterDetails("no","onload");
}

/****************** Active Expiry Quotation color  Author :sudhir Date:20/11/2015 ****************/
function openOpnigStockGRN() {
	$("#planGRNTab").css("background-color", "");
	$("#opneningGRNTab").css("background-color", "#81A981");
	$("#planGRNTab").css("color", "black");
	$("#opneningGRNTab").css("color", "white");
	 fetchGRNMasterDetails("no","onClick");
}



/***** Calculate Total Gross AMt  of Base Amt @Author Sudhir @Date:7june2016*******/

function challanbill(){

	$("#planGRNTab").css("background-color", "");
	$("#opneningGRNTab").css("background-color", "#81A981");
	$("#planGRNTab").css("color", "black");
	$("#opneningGRNTab").css("color", "white");
	 fetchGRNMasterDetails("no","challan");

}
function totalGrossAmt(id, rowCount) {
	 	var sum = 0;
		var baseAmount = 0;
		var RowCount = $("#RowCount").val();
		var totaltblsize = $("#totaltblsize").val();
		for ( var i = 1; i <= totaltblsize; i++) {
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
		var baseAmount = 0;
		var RowCount = $("#RowCount").val();
		var caltaxonBaseAmt;
		var totalRow = $("#totalRow").val();
		var totaltblsize = $("#totaltblsize").val();
		for ( var i = 1; i <= totaltblsize; i++) {
			baseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
			var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + i).val();
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




/****showChargesdiv Author Sudhir jadhav @Date 13jully2016****/
function showChargesdiv() {
	 $("#ApplyChargesforItem").show('show');
	 fetchChargesDetail();
} 

/**** hideApplyChargespopaup for item in purchase Quaotation Author:sudhir  @Date 13jully2016****/
function  hideApplyChargespopaup() {
	 $('#lstBoxforCharges').html();
	 $("#ApplyChargesforItem").hide('hide');	
	 $("#txtChargesAmt").val('');
	}
/********************************* End hideApplyTaxpopaup for item in GRN Author:sudhir  @Date 13jully2016 *****************************/

/***fetchChargesDetail for select Box Setting values  @Author Sudhir jadhav @Date : 13jully2016***/
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
/***templet for set charges Name to select box @Author sudhir @Data :13jully2016*/
var selInventoryChargesDetails= "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.CategoryDTO as CategoryDTO}"
	+ "<option  value='{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryName}</option>"
	+ "{#/for}";
/*** End templet for set charges Name to select box @Author sudhir @Data :12jully2016*/


/**** Adding charges to list @Author Sudhir @Date 13jully2016 ***/  
function addItemChargesName()
{
	 var txtChargesList = $("#txtChargesList option:selected").text();
	 if("-Select-" == txtChargesList ||txtChargesList == 0)
		 {
		 alert("Please Select Charges");
		 return false;
		 }
	 
	 var txtChargesAmt = $("#txtChargesAmt").val();
	 var txtexGstper = $("#txtexGstper").val();
	 var txtexGstamt = $("#txtexGstamt").val();

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
	 var finalChargesNameandAMt = txtChargesList +"_"+ txtChargesAmt+"_"+ txtexGstper +"_"+ txtexGstamt;
	 
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
		$("#txtexGstper").val(0);
		$("#txtexGstamt").val(0);
		 $("#txtempAmt").val(0);
		$("#txtChargesList ").val('Select');
		$("#txtChargesList  option:selected").text("-Select-");
		
		$('select option').filter(function() {
		    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
		}).remove();
	}
	 
}


/******** remove Item Charges from list GRN ****Author:Sudhir Date:13jully2016 ****/
function removeItemCharges() {

	$('#lstBoxforCharges option:selected').remove();
}
/******** End remove Item Charges from list purchase Order ****Author:Sudhir Date:12jully2016 ****/


/****** * apply Charges for Item in GRN Author:sudhir Date:13jully2016  ****/
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
 	
 	/*var rowCount = $("#hiddenCount").val();*/
 	
 	var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");
 	
 	 //$("#txtPurchaseQuotationTaxCodePO_"+rowCount).remove();
 	//$('#txtPurchaseQuotationTaxCodePO_'+rowCount+'option').remove();
 	$("#selboxChargeswithAmtList  option").remove();
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
 	
 	/*rowAmtCal(1,rowCount);
 	totalVatAmt(1,rowCount);*/}
/*** *** End applyChargesforItem  in purchase Order Author:sudhir Date:13jully2016 ***** **/ 







/****@Date 19sep2016 Author Sudhir jadhav for reciving partial GRN ******/
function totalAmountforParialGRN(id, rowCount) {
	 
	var quantity = $('#lblPurchaseQuotationDocQuantity' + rowCount).text();

	 
	var rate = $('#txtPurchaseQuotationUnitPrice' + rowCount).val();

	var txtPurchaseQuotationTrdeDiscountPercentage = $("#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).val();
	var txtPurchaseQuotationTrdeDiscountInRupess = $("#txtPurchaseQuotationTrdeDiscountInRupess" + rowCount).val();
	
	
	if(parseInt(txtPurchaseQuotationTrdeDiscountPercentage) == 0  && parseInt(txtPurchaseQuotationTrdeDiscountInRupess) == 0)
		{
		$("#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).val(0);
		$("#txtPurchaseQuotationTrdeDiscountInRupess" + rowCount).val(0);
		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowCount).val(0);
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val((quantity * rate).toFixed(2));
		return false;
		}
	
	
	//calculate Discount In reupess IN Pecentage
	if(parseInt(txtPurchaseQuotationTrdeDiscountPercentage) > 0)
		{
		var baseAmt = quantity * rate;

		var totalAmtInpercntage = baseAmt * txtPurchaseQuotationTrdeDiscountPercentage / 100;

		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowCount).val(totalAmtInpercntage.toFixed(2));

		var finalBaseAmt = baseAmt - totalAmtInpercntage;
		$("#txtPurchaseQuotationBaseAmount" + rowCount).val(finalBaseAmt.toFixed(2)); 
		}
	
	//calculate Discount In reupess
	if(parseInt(txtPurchaseQuotationTrdeDiscountInRupess) > 0)
	{
	var baseAmt = quantity * rate;

	var totalAmtInRupess = baseAmt - txtPurchaseQuotationTrdeDiscountInRupess;

	$("#txtPurchaseQuotationTrdeDiscountAmt" + rowCount).val(txtPurchaseQuotationTrdeDiscountInRupess);
 
	$("#txtPurchaseQuotationBaseAmount" + rowCount).val(totalAmtInRupess.toFixed(2)); 
	}
	
	
	/*if(parseInt(txtPurchaseQuotationTrdeDiscountPercentage) == null || parseInt(txtPurchaseQuotationTrdeDiscountPercentage) == '' || parseInt(txtPurchaseQuotationTrdeDiscountPercentage) == undefined )
	{
		alert("txtPurchaseQuotationTrdeDiscountPercentage " + txtPurchaseQuotationTrdeDiscountPercentage);
		$("#txtPurchaseQuotationTrdeDiscountInRupess" + rowCount).val(0);
		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowCount).val(0);
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val((quantity * rate).toFixed(2));
	}
	
	
	if(parseInt(txtPurchaseQuotationTrdeDiscountInRupess) == null || parseInt(txtPurchaseQuotationTrdeDiscountInRupess) == '' || parseInt(txtPurchaseQuotationTrdeDiscountInRupess) == undefined )
	{
		alert("txtPurchaseQuotationTrdeDiscountInRupess" + txtPurchaseQuotationTrdeDiscountInRupess);
		$("#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).val(0);
		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowCount).val(0);
		$("#txtPurchaseQuotationBaseAmount" + rowCount).val((quantity * rate).toFixed(2));
	}*/
	
	

	/*var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();*/

	// var totalRow = $("#totalRow").val();

	/*for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#txtPurchaseQuotationDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}*/

	/*$("#txtGRNTotalDocQty").val(sum);
	$("#txtGRNTotalDocQtyOpnigStock").val(sum);*/
	totalGrossAmt(1,rowCount);

}

 
 


/*calcuatSumforTradeDisAmtforPartialGRN @Date 20sep2016 @Author Sudhir */
function calcuatSumforTradeDisAmtforPartialGRN()
{
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

/*calcuatSumforitemQTYforPartialGRN @Date 20sep2016 @Author Sudhir */
function calcuatSumforitemQTYforPartialGRN()
{
var totaltblsize  = $("#totaltblsize").val();
var FinaltxtItemdocQty = 0;
var totlqtyflag = 0 ;
for(var i=1; i<=totaltblsize; i++)
	{
	var txtItemdocQty = $("#lblPurchaseQuotationDocQuantity"+ i).text();
	
	if(txtItemdocQty != '' && txtItemdocQty != null &&  txtItemdocQty !=  undefined)
	{
		FinaltxtItemdocQty = (parseFloat(FinaltxtItemdocQty) + parseFloat(txtItemdocQty));
		totlqtyflag = 1;
	}
	
	}
//this if is used for calculating total item qty when partial GRN and Direct GRN @24 Oct 2016 
if(parseInt(totlqtyflag) == 0) {

	} else {
		$("#txtGRNTotalDocQty").val(FinaltxtItemdocQty);
	}
 
}
 


/*checkUserNameandPassword for GRN @Author sudhir jadhav @Date :27oct2016 */ 
function checkUserNameandPasswordforGRN() 
{
	//saveGRN();
	
var currentuserName = $("#currentuserName").val();
var currentUserID = $("#currentUserID").val();
var ApprovedByIncharge = $("#levelValue").val();
var userName = $("#userName").val();
var userPassword = $("#userPassword").val();
if(userName=="" || userPassword =="")
	{
	alert(" Please Fill All Details ");
	return false;
	}

var grnId = $("#txtGRNDocNo").val();
var inputs = [];
inputs.push('action=getValUserNamePassforGrn');
inputs.push('userPassword=' + userPassword);
inputs.push('userName=' + userName);
inputs.push('grnId=' + grnId);

inputs.push('ApprovedByIncharge=' + ApprovedByIncharge);
inputs.push('currentuserName='+currentuserName);
inputs.push('currentUserID='+currentUserID);
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
	 
		 //ajaxResponse = r;
		 var b = r.replace(/"/g, "");
		 if(b=="1")
		 {
			alert("Invalid User Name or Password");
			return false;
			
		 }
		 else
		 { 
			 alert("Approved level Succssefully");
		 }
	}
	});
  
}

/* END checkUserNameandPassword for GRN for GRN  @Author sudhir jadhav @Date :27oct2016 */


function chklevlval(val)
{
	 $("#levelValue").val(val);
	 $("#userName").val('');
	 $("#userPassword").val('');
	 $("#showhideMrnMaintabs").show();
}
/*addtoMaintanace @Author Sudhir Jadhav @Date:15Nov2016*/
function addtoMaintanace(id) {
	
	$('#addToMaintenacediv').find('input:text').val('');
	$('#addToMaintenacediv').find('textarea').val('');
	$("#ItemInfoTableforMainteance > tbody").html('');
	
	$("#uniqueID").show();
	var idandcount = id.split("_");
	var count = idandcount[1];
	$("#currRowCount").val(count);
	var txtGRNDocNo = $("#txtGRNDocNo").val();
	var rowsfortbl = $("#txtPurchaseQuotationActualQuantity"+ count).val();
	var purDate = $("#txtGRNDOCDate").val();
	var itemName = $("#txtPurchaseQuotationItemName_"+count).val();
	var itemId = $("#txtPurchaseQuotationItemNumber"+count).val();
	rowCount = 1;
 
	for(var i=0; i<rowsfortbl; i++)
	{
	$("#ItemInfoTableforMainteance > tbody")
	.append(
			"<tr id='deleterowforMainteance"
					+ rowCount
					+ "'><td style='text-align:center'>"
					+ rowCount
					+ "</td>"
					+ " <td><input type='text' class='form-control input-SmallText itemName tblSize' style='text-align:left;width:300px;'  id='txtItemNameforMaintenance_"
					+ rowCount
					+ "' value='"+itemName+"' readonly=''/>"
					+ "</td> "
					+ "<td style='display: none;'><input type='text' class='form-control input-SmallText itemId' id='txtItemIdforMaintenance_"
					+ rowCount
					+ "' style='text-align:right;width:54px;' value='"+itemId+"' readonly=''/> </td> "
					+ "<td><input type='text' class='form-control input-SmallText itemSrNo'  style='text-align:left;width:300px;'id='txtItemSrNoforMaintenance_"+rowCount
					+ "' value=''> <input type='hidden' class='form-control input-SmallText grnId' id='grnId"+rowCount+"' value='"+txtGRNDocNo+"' > </td> <td><input type='text' onclick='setPurchaseDate(this.id)' class='form-control input-SmallText purDate'  style='text-align:left;width:300px;'id='txtPurDate_"+rowCount+"' value ='"+purDate+"' /></td>"
					 + "</tr>");

$("#RowCountforMaintenance").val(rowCount);
var totaltblsize = $("#RowCountforMaintenance").val();
$("#totaltblsizeforMaintenance").val(totaltblsize);
rowCount++;
}
	
}
/* ENd addtoMaintanace @Author Sudhir Jadhav @Date:15Nov2016*/


/*addMaitcItmstoDiv @Author Sudhir Jadhav @Date : 17/11/2016 *****/
function addMaitcItmstoDiv() {
	
	var count = $("#currRowCount").val();
	var itemNameInput = "";
	var	itemIdInput = "";
	
	var	itemSrNOInput = "";
	
	var itemPurDateInput = "";
	var tblSize = "";
		
	var itemNameCount = 1;
	var itemIDCount = 1;
	var itemSrNoCount = 1;
	var itemPurDateCount = 1;
	var alldata = "";
	  
	$('.itemName').map(function(){
		var itemnameId = this.id; 
		var id = itemnameId.split("_")[1];
		
		var itemname = $('#txtItemNameforMaintenance_'+id).val();
				 
	    	itemNameInput = itemNameInput + "<input type='text' value='"+itemname+"' class='itemNameRow_"+count+" itemNameInput_"+count+"_"+itemNameCount+"' style='display:none;'/>";
	    	itemNameCount++;
		});
	
	
	$('.itemId').map(function(){
		var itemId = this.id; 
		var id = itemId.split("_")[1];
		
		var itemId = $('#txtItemIdforMaintenance_'+id).val();
		 
	    	itemIdInput = itemIdInput + "<input type='text' value='"+itemId+"' class='itemNameRow_"+count+" itemIdInput_"+count+"_"+itemIDCount+"' style='display:none;'/>";
	    	itemIDCount++;
		});
	
	
	$('.itemSrNo').map(function(){
		var itemSrNO = this.id; 
		var id = itemSrNO.split("_")[1];
		
		var itemSrNoVal = $('#txtItemSrNoforMaintenance_'+id).val();
			 
		itemSrNOInput = itemSrNOInput + "<input type='text' value='"+itemSrNoVal+"' class='itemNameRow_"+count+" itemSrNoInput_"+count+"_"+itemSrNoCount+"' style='display:none;'/>";
	    	itemSrNoCount++;
		});
	
	  
	$('.purDate').map(function(){
		var purDate = this.id; 
		var id = purDate.split("_")[1];
		
		var txtPurDate = $('#txtPurDate_'+id).val();
			 
		itemPurDateInput = itemPurDateInput + "<input type='text' value='"+txtPurDate+"' class='itemNameRow_"+count+" itemPurDateInput_"+count+"_"+itemPurDateCount+"' style='display:none;'/>";
		itemPurDateCount++;
		});
	
	
	
	
	$('.tblSize').map(function(){
		var totaltblsize = $("#totaltblsizeforMaintenance").val();
		tblSize = tblSize + "<input type='text' value='"+totaltblsize+"' class='itemNameRow_"+count+" totaltblsize_"+count+"' style='display:none;'/>";
		});
	
				  
		 alldata = itemNameInput + itemIdInput + tblSize + itemSrNOInput + itemPurDateInput;
		 alldata = JSON.stringify(alldata);
	 $("#allitemlistforMaintenace"+count).html(alldata);
	
	 $('#addToMaintenacediv').removeClass('fade');
	 $('#addToMaintenacediv').modal('hide');
	
	
	/*var totaltblsize = $("#totaltblsizeforMaintenance").val();
	var count = $("#currRowCount").val();
	 
	var currentuserName = $("#currentuserName").val();
	var currentUserID = $("#currentUserID").val();
	
	//var mrllistforMtnc = [];
	var mrllistforMtnc = { ltMaintainanceMachineDTO :[]};
		for ( var i = 1; i <= totaltblsize; i++) {
			var txtItemNameforMaintenance = $("#txtItemNameforMaintenance_"+i).val();
			var txtItemIdforMaintenance = $("#txtItemIdforMaintenance"+i).val();
			var grnId = $("#grnId"+i).val();
			
			var txtItemSrNoforMaintenance = $("#txtItemSrNoforMaintenance"+i).val();
			if((txtItemNameforMaintenance != null) && (txtItemNameforMaintenance != undefined))
			{							
				mrllistforMtnc.ltMaintainanceMachineDTO
						.push({
							
							machine_maintainance_item_id :txtItemIdforMaintenance,
							item_name:txtItemNameforMaintenance,
							invsrnoformainteitem:txtItemSrNoforMaintenance,
						    invgrnid:grnId,
						    currusername:currentuserName,
						    curruserid:currentUserID
						});

			}

		}
		var li = mrllistforMtnc.ltMaintainanceMachineDTO.length;
		 if(li == 0)
			{
			alert("Please enter atleast one Item row to Add to Maintenance");
			return false;
			}
		   
		   mrllistforMtnc = JSON.stringify(mrllistforMtnc);
		  // mrllistforMtnc = mrllistforMtnc.substr(1, mrllistforMtnc.length-2);
		 $("#allitemlistforMaintenace"+count).html(mrllistforMtnc);
		 $('#addToMaintenacediv').removeClass('fade');
		 $('#addToMaintenacediv').modal('hide');*/
		 
		 	 
}
/* End addMaitcItmstoDiv @Author Sudhir Jadhav @Date : 17/11/2016 *****/



//seting Purchase Date to the Assest Item @Author Sudhir @Date 11jan2017        
function setPurchaseDate(inputID)
{
	new JsDatePick({
		useMode:2,
		target:inputID,
		/* dateFormat:"%d-%M-%Y", */
		yearsRange:[1920,2099],
		limitToToday:false,
		/* cellColorScheme:"beige", */
		dateFormat:"%d/%m/%Y",
		imgPath:"../img/",
		weekStartDay:1,
		 
	});
}


/*@Code:hide Advance Search Model
 * @Author:Sudhir
 * @Date:8Feb2016
 */

function closeAdvnceSrch()
{
	 $('#AdvanceSearch').removeClass('fade');
	 $('#AdvanceSearch').modal('hide');
}
/*@Code:hide Advance Search Model
* @Author:Sudhir
* @Date:8Feb2016
*/

/*@Code: This Function is User To  Advance Search  
* @Author:Sudhir
* @Date:8Feb2016
*/
function advancSerch()
{
	var txtSerchByPurInNo = $("#txtSerchByPurInNo").val();
	var txtSerchByVendrName = $("#txtSerchByVendrName").val();
	var txtSerchByOrderNo = $("#txtSerchByOrderNo").val();
	
	if(txtSerchByPurInNo != "" && txtSerchByVendrName != "" && txtSerchByOrderNo != "" )
		{
		alert("Please search either invoice number or vendor name or order no ");

		 $("#txtSerchByPurInNo").val('');
		 $("#txtSerchByVendrName").val('');
		 $("#txtSerchByOrderNo").val('');
		
		return false;
		}
	
	if(txtSerchByPurInNo == "" && txtSerchByVendrName == "" && txtSerchByOrderNo == "" )
	{
	alert("Please search either invoice number or vendor name or order no ");
	 $("#txtSerchByPurInNo").val('');
	 $("#txtSerchByVendrName").val('');
	 $("#txtSerchByOrderNo").val('');
	 
	return false;
	}
	//check first two Invoice No and Vendor Name
	if(txtSerchByPurInNo != "" && txtSerchByVendrName != "")
	{
	alert("Please search either invoice number or vendor name ");
	 $("#txtSerchByPurInNo").val('');
	 $("#txtSerchByVendrName").val('');
	 $("#txtSerchByOrderNo").val('');
	return false;
	}
	
	//check second and thrid Vendor Name and Order No
	if(txtSerchByVendrName != "" &&  txtSerchByOrderNo != "")
	{
	alert("Please search either vendor name or Order No");
	 $("#txtSerchByPurInNo").val('');
	 $("#txtSerchByVendrName").val('');
	 $("#txtSerchByOrderNo").val('');
	return false;
	}
	
	//check First  and thrid Invoice No and Order No
	if(txtSerchByPurInNo != "" &&  txtSerchByOrderNo != "")
	{
	alert("Please search either invoice number or Order No");
	 $("#txtSerchByPurInNo").val('');
	 $("#txtSerchByVendrName").val('');
	 $("#txtSerchByOrderNo").val('');
	return false;
	}
	
	
	// Invoice Number Is Enter
	if(txtSerchByPurInNo != "" && txtSerchByVendrName == "" && txtSerchByOrderNo == "")
		{
		 
		fetchAdvancSearch("InvoiceNo" ,txtSerchByPurInNo);
		 $("#txtSerchByPurInNo").val('');
		 $("#txtSerchByVendrName").val('');
		 $("#txtSerchByOrderNo").val('');
		return false;
		}
	
	// Vendor Name Is Enter
	if(txtSerchByPurInNo == "" && txtSerchByVendrName != "" && txtSerchByOrderNo == "")
	{
	
	fetchAdvancSearch("VendorName" ,txtSerchByVendrName);
	 $("#txtSerchByPurInNo").val('');
	 $("#txtSerchByVendrName").val('');
	 $("#txtSerchByOrderNo").val('');
	return false;
	}
	// Order No is  Name Is Enter
	if(txtSerchByPurInNo == "" && txtSerchByVendrName == "" && txtSerchByOrderNo != "")
	{
	fetchAdvancSearch("OrderNo" ,txtSerchByOrderNo);
	$("#txtSerchByPurInNo").val('');
	 $("#txtSerchByVendrName").val('');
	 $("#txtSerchByOrderNo").val('');
	return false;
	}
}

/*@Code: This Function is User To  Advance Search  
* @Author:Sudhir
* @Date:8Feb2016
*/


/*@Code: This Function is Used for fetch Grn Details for Advanced Search  
* @Author:Sudhir
* @Date:8Feb2016
*/
function fetchAdvancSearch(callfor ,data) {
 	 
	var inputs = [];
	inputs.push('action=FetchAdvancedSearchGrn');
	inputs.push('callfor=' + callfor);
	inputs.push('data=' + data);
	
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
			SrNo=1;
			if (objMRN.ltinvetorypurchasecommonmaster.length > 0) {
				
				 
				$("#documentContent").setTemplate(inventoryGRNTemp);
				$("#documentContent").processTemplate(pobj1);
				
				$('#AdvanceSearch').removeClass('fade');
				 $('#AdvanceSearch').modal('hide');
			//	$("#docuemntAjaxResp").html(r);

			} else {
				alert("Record not found..!");
				fetchGRNMasterDetails("no","onload");
				}
			 $("#txtSerchByPurInNo").val('');
			 $("#txtSerchByVendrName").val('');
			 $("#txtSerchByOrderNo").val('');
		}
	});
}
/*@Code: This Function is Used for fetch Grn Details for Advanced Search  
* @Author:Sudhir
* @Date:8Feb2016
*/

//clear the poup Values
function clearAdvnSerch() {
	 $("#txtSerchByPurInNo").val('');
	 $("#txtSerchByVendrName").val('');
	 $("#txtSerchByOrderNo").val('');
	
}

//by tk for state list
var StateListTempInv = "<option value='0'>-SELECT-</option>{#foreach $T.stateList as stateList"
	+ "}<option value='{$T.stateList.state_name}'>{$T.stateList.state_name}</option>{#/for}";

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
			
			 //$("#state").html(ajaxResponse);
			
			var obj = eval('(' + ajaxResponse + ')');
	
				$("#txtaddrstatePO").setTemplate(StateListTempInv);
				$("#txtaddrstatePO").processTemplate(obj);

		}
	});
}



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
		var hosState =$("#hosState").val();	
		var $radios = $('input:checkbox[name=chkDirectGRN]');

			for(var row =0 ;row < obj.stateList.length;row ++  ){
				for(var i =0 ;i < objPurchase.ltinventorypartymasteraddressinfodto.length;i ++  )
				{
					
					if(objPurchase.ltinventorypartymasteraddressinfodto[i].party_master_address_info_state == obj.stateList[row].state_id){
						
						htm =htm + "<option value='"+ obj.stateList[row].state_id +"'>"+ obj.stateList[row].state_name +"</option>";
					
						if(hosState ==  obj.stateList[row].state_id){
							hosState ==  obj.stateList[row].state_id;
						}else{
							hosState= obj.stateList[row].state_id;
						}
					}
					
				//$("#txtPurchaseQuotationAddress").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
			//	$("#txtSupplierState").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_state);
				
				}	
			}
			
			$("#txtSupplierState").html(htm);
			
			if(! hoseditState == "" || ! hoseditState == undefined || ! hoseditState == null){
				$("#txtSupplierState").val(hoseditState);
			}
			if($radios.is(':checked') == true){
				if( objPurchase.ltinventorypartymasteraddressinfodto.length > 0){
					$("#txtSupplierState").val(hosState);
					fetchdetailsonedititem();
					
				}
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
function chkappendpo(){
	
	var suppliername = $("#txtGRNSupplierName").val();
	var txtSupplierState = $("#txtSupplierState").val();
	//var $radios = $('input:checkbox[name=chkapnd]');
	var $radios = $('#chkapnd').is(':checked');
	var $radioschallan = $('#chkapndchllan').is(':checked');
//	alert($radios);
	if($radios == true){
		if(suppliername ==null || suppliername ==""){
			alertify.error("Please Select Suppliername!!");
			return false;
		}
		$("#btappnd").css("display", "block");
		var txtPurchaseOrderList = $("#txtPurchaseOrderList").val();
		var txtVendorCodePO = $("#txtVendorCodePO").val();
		if(txtVendorCodePO !="" || txtVendorCodePO !=null || txtVendorCodePO !=undefined){
			
			var AjaxResopnPOapd= $('#AjaxResopnPOapd').html();
			var objDocument = JSON.parse(AjaxResopnPOapd);
			var list="<option value='Select'>-Select-</option>";
			for ( var i = 0; i < objDocument.ltinvetorypurchaseordermaster.length; i++) {
				if(txtPurchaseOrderList != objDocument.ltinvetorypurchaseordermaster[i].inv_purchase_order_master_doc_no){
					if (objDocument.ltinvetorypurchaseordermaster[i].inv_purchase_order_master_Supplier_Id == txtVendorCodePO && objDocument.ltinvetorypurchaseordermaster[i].inv_SupplierState == txtSupplierState) {
						
						
						if(objDocument.ltinvetorypurchaseordermaster[i].inv_purchase_order_master_form_Name == "PURCHASE ORDER"){
							
							list=list+'<option value="'+(objDocument.ltinvetorypurchaseordermaster[i].inv_purchase_order_master_doc_no +"_"+ objDocument.ltinvetorypurchaseordermaster[i].inv_SupplierState )+'">'+(objDocument.ltinvetorypurchaseordermaster[i].inv_purchase_order_master_doc_Series)+'</option>';
							
						}
						
				/*		var id = objDocument.ltinvetorypurchaseordermaster[i].inv_purchase_order_master_doc_no+",";
						$("#idPOapd").html();
*/
							
							
						
					}	
				}
				
			}
			$("#txtPurchaseOrderList").html(list);
		}
	}else if($radioschallan ==true){
		if(suppliername ==null || suppliername ==""){
			alertify.error("Please Select Suppliername!!");
			return false;
		}
		$("#btappnd23").css("display", "block");
		$("#divlistchallan").css("display", "block");
		
		var txtPurchaseOrderList = $("#txtGRNDocNo").val();
		var txtVendorCodePO = $("#txtVendorCodePO").val();
		if(txtVendorCodePO !="" || txtVendorCodePO !=null || txtVendorCodePO !=undefined){
			
			var AjaxResopnPOapd= $('#docuemntAjaxResp').html();
			var objDocument = JSON.parse(AjaxResopnPOapd);
			var list="<option value='0'>Select challan</option>";
			for ( var i = 0; i < objDocument.ltinvetorypurchasecommonmaster.length; i++) {
				if(txtPurchaseOrderList != objDocument.ltinvetorypurchasecommonmaster[i].inv_batch_stock_master_doc_no){
					if (objDocument.ltinvetorypurchasecommonmaster[i].inv_batch_stock_master_Supplier_Id == txtVendorCodePO) {
						
						
							
							list=list+'<option value="'+(objDocument.ltinvetorypurchasecommonmaster[i].inv_batch_stock_master_doc_no +"_"+ objDocument.ltinvetorypurchasecommonmaster[i].inv_SupplierState )+'">'+(objDocument.ltinvetorypurchasecommonmaster[i].inv_batch_stock_master_purchase_delivery_challan_number)+'</option>';
							
						
					
							
						
					}	
				}
				
			}
			$("#txtPurchasechallan").html(list);
			}
			
		
	}
	else{
		$("#btappnd").css("display", "none");
		getPendingOrder();
		$("#btappnd23").css("display", "none");
	}

}
function setappendpo(){
	var suppliername = $("#txtGRNSupplierName").val();
	var txtPurchaseOrderList = $("#txtPurchaseOrderList").val();
	var  txtPurchaseOrderList1= txtPurchaseOrderList;
	txtPurchaseOrderList = txtPurchaseOrderList.split("_");
if(suppliername ==null || suppliername ==""){
	alertify.error("Please Select Suppliername!!");
	return false;
}
if(txtPurchaseOrderList[0] == "Select"){
	alertify.error("Please Select PO!!");
	return false;
}else
	
	
/*	var obj = $("#docuemntAjaxResp").html();
//alert(obj);
var objPurchase = JSON.parse(obj);
var state = 0; //added by paras
for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

	if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no == txtPurchaseOrderList[0]) {
		
		$("#txtGross").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_total_base_gross_amt).toFixed(2));

	}
}*/
	var inputs = [];
inputs.push('action=fetchPurchaseOrderItemMasterDetail');
inputs.push('isEdit=no');
inputs.push('partyId=' + txtPurchaseOrderList[0]);
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
				pobj1 = eval('(' + r + ')');
				//fetchPurchaseQuotationMasterNew();
				var totaltblsize1 = $("#RowCount").val();
				srNumber = totaltblsize1;
				srNumber++;
				for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
					$("#ItemInfoTable> tbody")
					.append(
							"<tr id='deleterow"
									+ srNumber
									+ "'> <td> <input type='checkbox'  name='checkbox"
									+ srNumber
									+ "' id='checkbox"
									+ srNumber
									+ "'/></td> <td>"
									+ srNumber
                                    + "<input type='hidden'  id='txtPurchaseAppPO"
									+ srNumber
									+ "' value='"
									+ txtPurchaseOrderList1
									+ "'/>"
									+ "</td>"
									+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left;width:260px;' class='typeahead form-group'  id='txtPurchaseQuotationItemName_"
									+ srNumber
									+ "'  value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_Name
									+ "'  onkeyup = 'auto(this.id,onchange)' readonly='' /> "
									+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_code
									+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_master_id
									+ "'/> </div> </td>"
									+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_doc_Qty
									+ "'  onblur='totalAmount(this.id,"
									+ srNumber
									+ ")' onkeypress='return validateNumbers(event);'readonly=''> <input type='hidden' id='txtPurchaseQuotationChangingItemQty"
									+ srNumber
									+ "' value='"+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_doc_Qty + "' /><input type='hidden' id='txtlastUom"+srNumber+"'value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"'> <lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +"</label> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity"+srNumber+"'  style ='text-align:center;' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_actural_qty
									+ "' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_actural_qty+"</label> </td>"
									+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_unit_price
									+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
									+ ""
									+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_per
									+ "' onblur='calculTradeDis(this.id,"
									+ srNumber
									+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
											+ srNumber
											+ "' value='"
											+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_rupess
											+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td>"
									+ " <td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_amount
									+ "' onkeypress='return validateNumbers(event);'style='width:160px;' ></td>"
									+ "<td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_base_amount
									+ "' onkeypress='return validateNumbers(event);' style='width:160px;' ></td>"
									/*+ "<td><select readonly=''  style='width:140px;' class='form-control input-SmallText'  multiple='multiple'  onclick='multipletaxCalculation(this.id," + srNumber + ")' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_code + "</option>  </select></td>   <td><input type='text' style='width:160px;' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount_"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
									+ "' onkeyup='rowAmtCal(this.id,"
									+ srNumber
									+ ")' onkeypress='return validateNumbers(event);' ></td> "*/
									+ "<td><input type='text'  style='width:100px;' class='typeahead form-control input-SmallText' onkeyup='autotaxCodeGrn(this.id,onchange)' id='txtPurchaseQuotationTaxCode_"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_code
									+ "' ></td>"
									+ "<td><input type='text'  style='width:100px;' class='typeahead form-control input-SmallText' id='txtPurchaseQuotationTaxAmount_"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
									+ "'  onkeyup='autotaxCodeGrn(this.id,onchange)'></td>"
									+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxAmtinRs"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount_rupess
									+ "' readonly='' ></td>"
									+ "<td><input type='text' class='form-control input-SmallText'  readonly='' id='txtPurchaseQuotationRowAmount"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_row_amount
									+ "' onkeypress='return validateNumbers(event);' style='width:160px;'></td>"
									+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor1
									+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
									+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor2
									+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
									+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor3
									+ "' onkeypress='return validateNumbers(event);' > <lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +"</label></td>"
									+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor4
									+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
									+ " <td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_actural_qty
									+ "' onkeyup='pendingAmount(this.id,"
									+ srNumber
									+ ")' onkeypress='return validateNumbers(event);'  > <input type='hidden' id='txtPurchaseQuotationhiddenActualQuantity"+srNumber+"' value='0'/> </td> "
									+ "<td><input type='text'style='width:60px;' class='form-control input-SmallText'  id='txtPurchaseQuotationPendingQuantity"
									+ srNumber
									+ "' value='0' onkeypress='return validateNumbers(event);' ></td> "
									+ "<td><input type='text' class='form-control input-SmallText'  style='width:60px;' id='txtPurchaseQuotationBatchNo"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_batch_No
									+ "'></td>"
									+ " <td><input type='text' style='width:80px;' readonly='readonly'class='form-control input-SmallText' id='txtPurchaseMfgDate_"
									+ srNumber
									+ "'onclick = 'getMfgandexpyDate(this.id,"
									+ srNumber
									+ ")'; style='float:left;' > </td> <td> <input style='width:80px;' type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
									+ srNumber
									+ "' onclick ='getMfgandexpyDate(this.id,"
									+ srNumber
									+ ")'; style='float:left;;' > </td> <td>   <button id='addtoMaintenance_"+ srNumber+"'' class='btn btn-xs btn-info' type='button' value='Add' onclick='addtoMaintanace(this.id,"+srNumber+ ")' data-toggle='modal' data-target='#addToMaintenacediv'> <i class='fa fa-plus'></i></button> <div style='display:none;' id='allitemlistforMaintenace"+ srNumber+"' class='allitemlistforMaintenace"+srNumber+"' ></div> </td> </tr>");

					
					
					var hostate = $("#hosState").val();
					if(txtPurchaseOrderList[1] == hostate )
					{
						
						
						//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
						$("#txtPurchaseQuotationTaxAmount_"+srNumber).hide();
						
					}else{
						
						$("#txtPurchaseQuotationTaxCode_"+srNumber).hide();
						
						}
					
				
					$("#RowCount").val(srNumber);
					
			
			srNumber++;
			test++;
		}
		// auto("txtPurchaseQuotationItemName_","onload");
			//	pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_pending_qty
				
		var txtEmptyItem = $("#txtEmptyItem").val();
		//auto(txtEmptyItem, "onload");
		
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		totalGrossAmt(1,srNumber);
		totalVatAmt(1,srNumber);	
		isNew=1;
		
		totalDocQtyPQ();
		totalDocDiscountPQ();
		totalPendingQtyGRN();
	
}
		});

}

function setappendchallan(){
	var suppliername = $("#txtGRNSupplierName").val();
	var txtPurchaseOrderList = $("#txtPurchasechallan").val();
	var  txtPurchaseOrderList1= txtPurchaseOrderList;
	txtPurchaseOrderList = txtPurchaseOrderList.split("_");
if(suppliername ==null || suppliername =="" ){
	alertify.error("Please Select Suppliername!!");
	return false;
}
if(txtPurchaseOrderList[0] == "0"){
	alertify.error("Please Select PO!!");
	return false;
}else
	
	
/*	var obj = $("#docuemntAjaxResp").html();
//alert(obj);
var objPurchase = JSON.parse(obj);
var state = 0; //added by paras
for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

	if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_doc_no == txtPurchaseOrderList[0]) {
		
		$("#txtGross").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_batch_stock_master_total_base_gross_amt).toFixed(2));

	}
}*/
	var inputs = [];
inputs.push('action=fetchGrnBatchStocDetail');
inputs.push('isEdit=no');
inputs.push('partyId=' + txtPurchaseOrderList[0]);
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
				//fetchPurchaseQuotationMasterNew();
				srNumber = 1;
				var totaltblsize1 = $("#RowCount").val();
				srNumber = totaltblsize1;
				srNumber++;
				var itemqtyAdd = 0;
				for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
					itemqtyAdd = parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_actural_qty) + parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock__item_pending_qty);
					var batchstateid= parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].txtstateid);
					var appendpo= parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].txtPurchaseAppPO);
					
					/*alert("itemqtyAdd :" + itemqtyAdd);
					alert("Actual qty " +pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_actural_qty);
					alert("pending qty " + parseInt(pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock__item_pending_qty));*/
					$("#ItemInfoTable > tbody")
					.append(
							"<tr id='deleterow"
									+ srNumber
									+ "'> <td> <input type='checkbox'  name='checkbox"+ srNumber
									+ "' id='checkbox"
									+ srNumber
									+ "'/></td>" 
									+"<td> "
									+ srNumber 
									+ "<input type='hidden'  id='txtPurchaseAppPO"
									+ srNumber
									+ "' value='"
									+ txtPurchaseOrderList1
									+ "'/>"
									+ "</td>"
									+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left;width:250px;' readonly='' class='typeahead form-group'  id='txtPurchaseQuotationItemName_"
									+ srNumber
									+ "'  value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_item_name
									+ "'  onkeyup = 'auto(this.id,onchange)' onkeypress='return validateOnlyName(event);' /> "
									+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_code
									+ "' readonly =''/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_id
									+ "'/> </div> </td>"
									+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
									+ srNumber
									+ "' value='"
									+itemqtyAdd
									+ "'  onblur='totalAmount(this.id,"
									+ srNumber
									+ ")' onkeypress='return validateNumbers(event);' readonly ='' ><input type='hidden' id='txtPurchaseQuotationChangingItemQty"
									+ srNumber
									+ "' value='"+ itemqtyAdd+ "' /><input type='hidden' id='txtlastUom"+srNumber+"'value='"+ itemqtyAdd +"'> <lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +" </label></td> "
									+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_rate
									+ "' onkeypress='return validateNumbers(event);' readonly = '' ></td>"
									+ ""
									+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_per
									+ "' onblur='calculTradeDis(this.id,"
									+ srNumber
									+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' readonly ='' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
											+ srNumber
											+ "' value='"
											+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_rupess
											+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' readonly =''></td>"
									+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_discount_amount
									+ "' onkeypress='return validateNumbers(event);' ></td>"
									+ "<td><input readonly='' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_base_amount
									+ "' onkeypress='return validateNumbers(event);'readonly ='' ></td>"
									+ " <td style='display: none'><select class='form-control input-SmallText'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_code + "</option>  </select></td> <td style='display: none'><input type='text'  readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount_"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
									+ "' onkeyup='rowAmtCal(this.id,"
									+ srNumber
									+ ")' onkeypress='return validateNumbers(event);' readonly ='' ></td> "
		
									+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxGSTPercent"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
									+ "' readonly='' ></td>"
									+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxIGSTPercent"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount
									+ "' readonly='' ></td>"
								
									+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtGRNTaxAmtinRs"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess
									+ "' readonly='' ></td>"
									+ "<td><input type='text' class='form-control input-SmallText' readonly=''  id='txtPurchaseQuotationRowAmount"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_amount
									+ "'></td>"
									+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor1
									+ "' onkeypress='return validateNumbers(event);' readonly =''> <lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
									+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor2
									+ "' onkeypress='return validateNumbers(event);' readonly =''><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
									+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor3
									+ "' onkeypress='return validateNumbers(event);' readonly =''><lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +" </label></td>"
									+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_factor4
									+ "' onkeypress='return validateNumbers(event);' readonly =''><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
									+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_actural_qty
									+ "' onkeyup='pendingAmount(this.id,"
									+ srNumber
									+ ")' onkeypress='return validateNumbers(event);' readonly =''> <input type='hidden' id='txtPurchaseQuotationhiddenActualQuantity"+srNumber+"' value='0'/> </td> "
									+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock__item_pending_qty
									+ "' onkeypress='return validateNumbers(event);' readonly ='' ></td> "
									+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
									+ srNumber
									+ "' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_code + "'></td>"
									+ "<td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"+srNumber+"' onclick = 'getMfgandexpyDate(this.id,"+ srNumber+ ")'; style='float:left;' value='"+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_mfg_date +"' readonly =''> </td>"+
									"<td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"+ srNumber	+"' onclick ='getMfgandexpyDate(this.id,"+srNumber+ ")'; style='float:left;' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_exp_date+"'></td>" + "</tr>");
						//alert(pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess);
				
	             	var hostate = $("#hosState").val();
	             
	             		if(txtPurchaseOrderList[1] ==hostate || txtPurchaseOrderList[1] == hostate || txtPurchaseOrderList[1] == hostate)
						{
							
							
							//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
							$("#txtGRNTaxIGSTPercent"+srNumber).hide();
							//$("#txtGRNTaxIGSTPercent"+idValue).val(sumofRate);
							//totalAmount();
						}else{
							
							$("#txtGRNTaxGSTPercent"+srNumber).hide();
						
							}
	             	
					
					
					/*if( !($("#txtGRNTaxIGSTPercent"+srNumber).val() ) ==""){
							$("#txtGRNTaxGSTPercent"+srNumber).val("0");
							
						}
					
					if( !($("#txtGRNTaxGSTPercent"+srNumber).val() ) =="0" ||
							!($("#txtGRNTaxGSTPercent"+srNumber).val() ) == "" ){
						$("#txtGRNTaxIGSTPercent"+srNumber).val("0");
						
					}*/
					
					if( ($("#txtPurchaseQuotationBatchNo"+srNumber).val() ) == null 
							|| ($("#txtPurchaseQuotationBatchNo"+srNumber).val() ) =="null"){
						
						$("#txtPurchaseQuotationBatchNo"+srNumber).val("");
						$("#txtPurchaseQuotationBatchNo"+srNumber).attr("readonly", "readonly");
					}
					
					
			$("#RowCount").val(srNumber);
			srNumber++;
			test++;
				}
				
				var txtEmptyItem = $("#txtEmptyItem").val();
				//auto(txtEmptyItem, "onload");

				var totaltblsize = $("#RowCount").val();
				$("#totaltblsize").val(totaltblsize);
				totalGrossAmt(1,srNumber);
				totalVatAmt(1,srNumber);	
				// auto("txtPurchaseQuotationItemName_","onload");
				totalDocQtyPQ();
				totalDocDiscountPQ();

				totalPendingQtyGRN();
			
			}
		});


}

function getchallanandpurchaseinvoiceid(){
	

	 
	 jQuery.ajax({
			type : "POST",
			data	: {
				
				  "grnid" : "0",
				  
			},
			url : "ehat/inventory/getchallanandpurchaseinvoiceid",
			error : function() {
				alert('error');
			},
			success : function(response) {
				var	challnid=0;
				var purinvoiceid=0;
				if(response.length > 0){
					if(response =="no"){
						challnid=1;
						purinvoiceid=1;
					}else{
						var Finalrateandtax = response.split("@");
						 challnid=	parseInt(Finalrateandtax[0]);
						
						 purinvoiceid=	 parseInt(Finalrateandtax[1]);
						purinvoiceid ++ ;
						challnid ++;
					}
					
				
                    $("#txtGRNDeliverychallanNumber1").val(challnid); 
                    $("#txtGRNDeliverychallanNumber").val(challnid);
                    $("#txtGRNPurchaseInvoiceNumber").val(purinvoiceid); 
                    $("#txtGRNPurchaseInvoiceNumber1").val(purinvoiceid);
				}
			
			
			
			}

		});

}
function gstamt(ID){
	 var txtChargesAmt = $("#txtempAmt").val();
	 var txtfianlamt = 0.0;
	 if(isNaN(txtChargesAmt)){
		 txtChargesAmt=0;
	 }
	 var txtexGstper = $("#"+ ID).val();
	 if(isNaN(txtexGstper)|| txtexGstper=="" || txtexGstper==null){
		 txtexGstper=0;
	 }
	 var taxamt=0;
	  taxamt = parseFloat(txtChargesAmt) * parseFloat(txtexGstper) / 100;
	 var txtexGstamt = taxamt;
	 if(isNaN(txtexGstamt) || txtexGstamt==""){
	
		 txtexGstamt=0;
	 }else{
		 var txtexamunt = $("#txtempAmt").val();
		 txtfianlamt = parseFloat(txtexamunt) + parseFloat(txtexGstamt);
		 
	 }
$("#txtexGstamt").val(txtexGstamt);
$("#txtChargesAmt").val(txtfianlamt);
	 
	
}

function examunt(id){
	var txtexamunt = $("#txtempAmt").val();
   $("#txtChargesAmt").val(txtexamunt);
	
}

function fetchdetailsonedititem(id){
	var $radios = $('input:checkbox[name=chkDirectGRN]');
	if ($radios.is(':checked') == false){
		alert("State Cannot Change !!");
		var hoseditState=$("#hoseditState").val();
		$("#"+id).val(hoseditState);
		
	}else{
		setTimeout(function() {
	    var totaltblsize = $("#RowCount").val();
		var state = $("#txtSupplierState").val();
		var hostate = $("#hosState").val();
	   for(var a=1;a<= totaltblsize;a++){
			if(state == hostate)
			{
			
				$("#txtPurchaseQuotationTaxAmount_"+a).hide();
				$("#txtPurchaseQuotationTaxCode_"+a).show();
			}else{
				$("#txtPurchaseQuotationTaxAmount_"+a).show();
            	$("#txtPurchaseQuotationTaxCode_"+a).hide();
			
				}
	 }
		 }, 100);
	}
	
}

function autotaxCodeGrn(inputID, typeauto){
	
	var txtVal1 = $('#' + inputID).val();
		jQuery.ajax({
			async : true,
			type : "POST",
			data	: {
				
				  "value" : txtVal1,
					"callform":typeauto
				},
			url : "ehat/inventory/fetchtax",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				//alert(r.ltinvetoryEXPmaster.length);
			var a =	JSON.stringify(r);
				/*$("#docuemntAjaxResp").html(a);
				$("#documentContent").setTemplate(inventoryExpenseTemp);
				$("#documentContent").processTemplate(r);*/
			
				autoCompTableinv(r,inputID);
				applyTaxforItemexpense(inputID);
			}
		});
}
function autoCompTableinv(response,id){
//	var qty		= id.slice(0,-1); //for dyamic col getting id
	var myArray =response;// $.parseJSON(response);// parsing response in JSON format 
	console.log(myArray);
	$.widget('custom.mcautocomplete', $.ui.autocomplete, {
	    _create: function () {
	        this._super();
	        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
	    },
	    _renderMenu: function (ul, items) {
	        var self = this,
	            thead;
	        if (this.options.showHeader) {
	            table = $('<div class="ui-widget-header" style="width:100%"></div>');
	            $.each(this.options.columns, function (index, item) {
	                table.append('<span style="padding:0 4px;float:left;width:' + item.width + ';">' + item.name + '</span>');
	            });
	            table.append('<div style="clear: both;"></div>');
	            ul.append(table);
	        }
	        $.each(items, function (index, item) {
	            self._renderItem(ul, item);
	        });
	    },
	    _renderItem: function (ul, item) {
	        var t = '',
	            result = '';
	        $.each(this.options.columns, function (index, column) {
	            t += '<span style="padding:0 4px;float:left;width:' + column.width + ';">' + item[column.valueField ? column.valueField : index] + '</span>';
	        });
	        result = $('<li></li>')
	            .data('ui-autocomplete-item', item)
	            .append('<a class="mcacAnchor">' + t + '<div style="clear: both;"></div></a>')
	            .appendTo(ul);
	        $(ul).css("z-index", "10000000000");
	        return result;
	    }
	});


	// Sets up the multicolumn autocomplete widget.
	$("#"+ id).mcautocomplete({
	    // These next two options are what this plugin adds to the autocomplete widget.
	    showHeader: true,
	    columns: [ {
	    	name: 'tax_code',
	        width: '110px',
	        valueField: 'tax_code'
	    } ],

	    // Event handler for when a list item is selected.
	    select: function (event, ui) {
	    	console.log("tk");
	    	console.log(ui);
	    //    this.value = (ui.item ? ui.item.tax_code : '');
	       if( ui.item.tax_code !='No Record' ){
	    	//  $('#results').text(ui.item ? 'Selected: ' +  ui.item.tax_code : 'Nothing selected, input was ' + this.value);
		       /* $('#'+qty+'2').val(ui.item.srvQty);//always quantity column on 2nd position
		        $('#'+qty+'3').val(ui.item.srvCharges);//always opdcharges column on 3rd position
		        $('#'+qty+'3act').val(ui.item.srvCharges);//actual basic charges 
		        $('#'+qty+'3actBasic').val(ui.item.srvCharges);//actual basic charges unchanged
		        $('#'+id+'srid').val(ui.item.srvId);//service id setting
		        $('#'+id+'srtname').val(ui.item.sevType);//service type name setting
		        $('#'+id+'type').val(ui.item.sevType);//service type name setting
		        createRow4Pkg('auto');//adding new row dynamically
		        //getSrvHalWsChrg(qty ,ui.item.srvId,ui.item.sevType, 'auto' );//fetching hall wise charges
		        sethallwiseVals(ui.item.hallFrSrv,ui.item.srvCharges,qty,'autoCompTable');//sending list inside mainlist
		        calSumofSrv('autoCompTable');*/
	    	   

	    		$("#" + id).val(( ui.item.tax_code).trim());
				
			
					applyTaxforItemexpense(id);
				
					
	       }
	        
	        return false;
	    },

	    // The rest of the options are for configuring the ajax webservice call.
	    minLength: 1,
	    source: function (request, response) {
	    	var data = myArray;
	    	console.log(data);
	    /*	console.log(data.inventoryTaxSetUps.length);*/
	    	var result;
            if (!data || !data.inventoryTaxSetUps || data.inventoryTaxSetUps.length === 0  ) {
            	/*result = [{
                    label: 'No match found.'
                }];*/
            	result = [{
                
                     'tax_code'	: 'No Record',
                     
               
                 }];
            } else {
                result = data.inventoryTaxSetUps;//Response List for All Services
            }
            response(result);
         
          }
	});
}