	/*var ItemInfoList="<tr><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td>";

function setItemInfotrPurchaseReturn(){
	
	
	$("#ItemInfoTable > tbody").append("<tr><td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td>");
	
}*/

 var rowCount = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;


function getNextPurReturnId() {
	var inputs = [];
	inputs.push('action=getQuotationNextId');
	inputs.push('tableName=inv_purchase_return_master');
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
			$("#txtPurchaseReturnDocNo").val(r);
		}
	});
}


function getPendPurchaseInvoiceforpurReturn() {
	var inputs = [];
	inputs.push('action=getPendPurchaseInvoiceforpurReturn');
	inputs.push('tableName=inv_purchase_return_master');
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
		//	alert(r);
			pobj1 = eval('(' + r + ')');
			
			$("#txtPurchaseinvoiceList").setTemplate(selInventoryPendingpurInvoiceforpurReturn);
			$("#txtPurchaseinvoiceList").processTemplate(pobj1);
		}
	});
}


var selInventoryPendingpurInvoiceforpurReturn = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}"
	
	+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_form_Name == 'PURCHASE INVOICE'}" +
			"<option  value='{$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_invoice_master_doc_Series}</option>"
	+ "{#/if}{#/for}";





function purchaseQuatViewRefresh() {
//	$('#Sales_Quotation_Form').find('input:text').val('');
//	$('#Sales_Quotation_Form').find('textarea').val('');
	//$('#Sales_Quotation_Form').find('input:hidden').val('');
	$("#ItemInfoTable > tbody").html('');
	$('#ItemInfoTable').find('input:text').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	isNew = 1;

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
/************************************************ show on get pending purchase Invoice Author:sudhir Modified Date:24:11:2015 ***********************************/
function viewPurchaseInvoiceMasterDetails(partyId) {
	
	$('#hidePRsaveBtn').css('display','block');
	purchaseQuatViewRefresh();
	$("#closeonclick").hide();
	
	var obj = $("#docuemntAjaxRespPurchaseInvoiceMaster").html();
 
	var objPurchase = JSON.parse(obj);

	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_no == partyId) {

			  
			/*var str=(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_date).split("-");
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];
			$("#txtPurchaseReturnDocDate").val(leaddate);*/
			/*var txtPurchaseQuotationDate1 = $("#txtPurchaseQuotationDate1")
					.val();*/
			var txtPurchaseQuotationMobileNo = $(
					"#txtPurchaseReturnMobileNo")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_mobile_number);

			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO')
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_Supplier_Id);

			var txtPurchaseQuotationSupplierName = $(
					"#txtPurchaseReturnSupplierName")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_Supplier_Name);
			// $("#selDocName").hide();
			// option:selected").text(objPurchase.ltinvetorypurchasecommonmaster[rowCount].);
			/*var txtPurchaseQuotationDocSeries = $(
					"#txtPurchaseReturnDocSeries")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_Series);*/
			/*var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;*/
			
			var txtPurchaseQuotationReferenceNo = $("#txtPurchaseReturnCodeReferenceNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_reference_no);
			
			var txtPurchaseQuotationAddress = $("#txtPurchaseReturnAddress")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_Address);
			var sclPurchaseQuotationDocstatus = $(
					"#sclPurchaseReturnDocStatus option:selected")
					.text(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_status);
			var txtPurchaseQuotationTotalDocDiscount = $(
					"#txtPurchaseReturnTotalDocDiscount")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_total_discount);
			var txtPurchaseQuotationTotalDocQty = $(
					"#txtPurchaseReturnTotalDocQty")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_total_doc_qty);
			
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderRequestNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_purchase_Request_No);
			
			
			var txtPurchaseOrderRequestNo = $("#txtPurchaseGrnNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_grn_no);
			var txtPurchaseInvoiceNo = $("#txtPurchaseInvoiceNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_no);
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderQuatationNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_order_no);
			var txtPurchaseInvoiceNo  = $("#txtPurchaseInvoiceNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_doc_no);
			var txtPurchaseReturnDeliveryDate  = $("#txtPurchaseReturnDeliveryDate").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_delivery_date);
			
			
			var txtPurchaseGrnNo = $("#txtPurchaseGrnNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_grn_no);
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderQuatationNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_order_no);
			var txtPurchaseQuotationDeliveryDate = $("#txtPurchaseQuotationDeliveryDate").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_invoice_master_delivery_date);
			
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
	//alert(masterID);
	
	//alert("Id=" + item.value + " Value=" + item.text);
	//var masterID = item.value;
      //alert("master id onclick==="+masterID);
	
	fetchPartyMasterContactsDetailsPO(masterID);
	fetchPartyMasterAddressDetailsPO(masterID);
	fecthPartyOtherInfoPO(masterID);

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
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left;width:160px;' readonly='' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_Name
										+ "'  onkeyup = 'auto(this.id,onchange)' onkeypress='return validateOnlyName(event);' /> "
										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_code
										+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_master_id
										+ "' /> </div> </td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_doc_Qty
										+ "'  onkeyup='totalAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +" </label></td> "
				                        +  "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationAvlqty"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].item_avl_quantity
										+ "' onkeypress='return validateNumbers(event);' style='width:60px;' readonly=''></td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_unit_price
										+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
										+ ""
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_discount_per
										+ "' onblur='calculTradeDis(this.id,"
										+ srNumber
										+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeyup='chKTradAmt(this.id,"+srNumber+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_discount_rupess
										+ "'></td>"
										+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_discount_amount
										+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
										+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_trade_base_amount
										+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>  <td><select class='form-control input-SmallText'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_code + "</option></select></td> "
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);' readonly='' ></td> "
									    + "<td><input type='text' style='width:100px;' class='form-control input-SmallText' id='txtPurchaseReturnTaxAmntinRs"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_tax_amount_rupess
										+ "' readonly='' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_row_amount
										+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
										+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'    maxlength='5' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor1
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText'   onkeypress='return validateNumbers(event);'  maxlength='5' id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor2
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor3
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_factor4
										+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_actural_qty
										+ "' onblur='pendingAmount(this.id,"
										+ srNumber
										+ ")' onkeypress='return validateNumbers(event);'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_pending_qty
										+ "' onkeypress='return validateNumbers(event);' ></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_batch_No
										+ "' ></td>"
										+ " <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ srNumber
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_mfg_Date
										+ "' > </td> <td><input type='text' readonly='readonly' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ srNumber
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;;'value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_invoice_item_Expiry_Date
										+ "' > </td> </tr>");
						
						var state = $("#txtSupplierState").val();
						if(state =="MAHARASHTRA" || state == "Maharashtra" || state == "maharashtra")
						{
						
							$("#txtPurchaseQuotationTaxAmount"+srNumber).hide();
							
							//totalAmount();
						}else{
							
							$("#txtPurchaseQuotationTaxCode_"+srNumber).val("0.0");
						
							}

				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
					}
				//	auto("txtPurchaseQuotationItemName_","onload");
					totalDocQtyPQ();
					totalDocDiscountPQ();

					//var txtEmptyItem = $("#txtEmptyItem").val();
					//auto(txtEmptyItem, "onload");

					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				}
			});
	getNextPurReturnId();
}




/******************************************featch piurchase Invoice master Details**********************************************/
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
		//	$("#documentContentPurchaseInvoiceMaseter").setTemplate(inventorypurchaseinvoicetemp);
			$("#documentContentPurchaseInvoiceMaseter").processTemplate(pobj1);
			$("#docuemntAjaxRespPurchaseInvoiceMaster").html(r);
		}
	});
}


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
								+ ",onchange)'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' maxlength='5'id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowStatus"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount + "' value=''></td> " +
										"<td><input type='text' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		//auto("txtPurchaseQuotationItemName_" + rowCount, "onload");

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
								+ ",onchange)'/>"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "'></td>"
								+ "<td><input type='text' class='form-control input-SmallText'maxlength='5' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "'></td> "
								+ "<td><input type='text' class='form-control input-SmallText'maxlength='5'  id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' maxlength='5'id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowStatus"
								+ rowCount
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount + "' value=''></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ rowCount
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;' > </td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ rowCount
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ rowCount
										+ ")'; style='float:left;;' > </td> " + "</tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
	//auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
		rowCount++;
	}

}

/************** Remove  row dynamically in table  modified @Date:9june2016 @Author sudhir ****************/

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

	$("#txtPurchaseReturnTotalDocQty").val(sum);
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
		} else 
		{
			sum = (parseFloat(sum) + parseFloat(tradeAmt)).toFixed(2);;
		}

	}

	$("#txtPurchaseReturnTotalDocDiscount").val(sum);
	$("#RowCount").val(RowCount);

}



/************************************************** saving operation of purchase RETURN   *************************************************/
function savePurchaseReturn() {

	var txtPurchaseFormName = $("#txtPurchaseFormName").val();
	 
	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();

	var txtPurchaseQuotationDocNo = $("#txtPurchaseReturnDocNo").val();
	var txtPurchaseQuotationDate1 = $("#txtPurchaseReturnDocDate").val();				
	var txtPurchaseQuotationMobileNo = $("#txtPurchaseReturnMobileNo").val();
	var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val();
	
	var txtPurchaseQuotationSupplierName = $("#txtPurchaseReturnSupplierName").val();

	var selDocName = $("#selDocName option:selected").text();
	
	var txtPurchaseQuotationDocSeries = $("#txtPurchaseReturnDocSeries").val();
	
	var txtPurchaseReturnDocSeriesIsEdit = $("#txtPurchaseReturnDocSeriesIsEdit").val();
	
	var txtPurchaseReturnNote2 = $("#txtPurchaseReturnNote2").val();
	
	var txtPurchaseReturnOutWardNo = $("#txtPurchaseReturnOutWardNo").val();
	var txtPurchaseReturnDeliveryDate = $("#txtPurchaseReturnDeliveryDate").val();
	
	
	
	var txtDocSeries;
	if(txtPurchaseReturnDocSeriesIsEdit == 'isEdit')
	{
			txtDocSeries = txtPurchaseQuotationDocSeries;
	}
	else
	{
		var finaltxtPurchaseReturnDocSeries = txtPurchaseQuotationDocSeries +"No"+":"+txtPurchaseQuotationDocNo;
			txtDocSeries = finaltxtPurchaseReturnDocSeries;
	}
	
	
	
	
	var txtPurchaseQuotationRequestNo =$("#txtPurchaseOrderRequestNo").val();
	var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo").val();
	
	var txtPurchaseGrnNo = $("#txtPurchaseGrnNo").val();
	
	var txtPurchaseQuotationReferenceNo = $("#txtPurchaseReturnCodeReferenceNo")
			.val();

	var txtPurchaseQuotationAddress = $("#txtPurchaseReturnAddress").val();
	var sclPurchaseQuotationDocstatus = $("#sclPurchaseReturnDocStatus option:selected").text();
	var txtPurchaseQuotationAmountinlocalcurrency = $(
			"#txtGRNlocalcurrency").val();
	var txtPurchaseQuotationTotalDocDiscount = $(
			"#txtPurchaseReturnTotalDocDiscount").val();
	var txtPurchaseInvoiceNo= $("#txtPurchaseInvoiceNo").val();
	var txtPurchaseQuotationTotalDocQty = $("#txtPurchaseReturnTotalDocQty").val();
	
	
	
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
	alert("Please select purchase return date ");
	$("#txtPurchaseReturnDocDate").focus();
	return false;
	}
	
	
	var txtPurchaseReturnSaveOrUpdate = $("#txtPurchaseReturnSaveOrUpdate").val();
	if(!(txtPurchaseReturnSaveOrUpdate =='Update'))
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
		    
		/*var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    
	    var today1 = dd+'/'+mm+'/'+yyyy;*/
	    
	    if(txtPurchaseQuotationDate1 === today1)
		   {
		   		    
		   }
	    else
	    {
	    	alert("Please Enter Current Date ");
		    $("#txtPurchaseReturnDocDate").focus();
		   return false;
	    }
	   }
	}
	
	
	/*var selectGRN = $("#txtPurchaseGRNList").val();
    if(selectGRN == 'EDIT')
    {
	 
    	alert("ok");
		return true;
    }*/
    
	/*var selectGRN = $("#txtPurchaseinvoiceList").val();
     if(selectGRN == 0 || selectGRN == 'Select')
     {
	    alert('please select Purchase invoice');
		$("#txtPurchaseinvoiceList").focus();
		return false;
     }*/
    
	
	if(txtPurchaseQuotationMobileNo == "" || txtPurchaseQuotationMobileNo == null)	
	{
	alert("Please enter mobile number");
	$("#txtPurchaseReturnMobileNo").focus();
	return false;
	}
	
	if(txtPurchaseQuotationMobileNo.length < 10 || txtPurchaseQuotationMobileNo.length > 10)
	{
	alert("Mobile number should be of 10 digits");
	$("#txtPurchaseReturnMobileNo").focus();
	return false;
	}
	
	if(txtPurchaseQuotationSupplierName == "" || txtPurchaseQuotationSupplierName == null)
	{
		alert("Please enter supplier name");
		$("#txtPurchaseReturnSupplierName").focus();
		return false;
	}
	
	 var docseries= $("#txtPurchaseReturnDocSeries").val();
     if(docseries == 0 || docseries == '-Select-')
     {
	    alert('please select doc series');
		$("#txtPurchaseReturnDocSeries").focus();
		return false;
     }
     
     if(txtPurchaseQuotationReferenceNo == "" || txtPurchaseQuotationReferenceNo == null)
 	{
 	alert("Please enter reference number");
 	$("#txtPurchaseReturnCodeReferenceNo").focus();
 	return false;
 	}
     
     if(txtPurchaseQuotationAddress == "" || txtPurchaseQuotationAddress == null)
 	{
 	alert("Please enter address");
 	$("#txtPurchaseReturnAddress").focus();
 	return false;
 	}
     
     var status = document.getElementById("sclPurchaseReturnDocStatus");
     var docstatus = status.options[status.selectedIndex].text;
     if(docstatus == 0 ||  docstatus == 'Select')
     {
	    alert('Please select Return Status');
		$("#sclPurchaseReturnDocStatus").focus();
		return false;
     }
	var materiallist = {
		ltinvetorypurchasecommonitemmaster : []
	};
	// alert("ROW" +rowCount);
	for ( var i = 1; i <= totaltblsize; i++) {

		if ($("#txtPurchaseQuotationItemNumber" + i).val() != null
				&& $("#txtPurchaseQuotationItemNumber" + i).val() != undefined ) {
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

			var txtPurchaseQuotationTaxAmount = $(
					"#txtPurchaseQuotationTaxAmount" + i).val();
			
			var txtPurchaseReturnTaxAmntinRs  = $("#txtPurchaseReturnTaxAmntinRs" + i).val();  // Add Tax Amount in Rs Purchase Return @author:paras @Date:25nov
		
			
		/*	var txtPurchaseQuotationTaxCode_ = $(
					"#txtPurchaseQuotationTaxCode_" + i).val();*/
			
			var txtPurchaseQuotationTaxCode_ = "";
			$('#txtPurchaseQuotationTaxCode_'+ i).find('option').each(function() {
				txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
			});
			
			txtPurchaseQuotationTaxCode_= txtPurchaseQuotationTaxCode_.substring(0, txtPurchaseQuotationTaxCode_.length-1);
			
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
			/*var txtPurchaseQuotationRowStatus = $(
					"#txtPurchaseQuotationRowStatus" + i).val();*/
			var txtPurchaseQuotationBatchNo = $("#txtPurchaseQuotationBatchNo" + i).val();
			
			var txtPurchaseMfgDate = $(
					"#txtPurchaseMfgDate_" + i).val();
			var txtPurchaseExpiryDate = $(
					"#txtPurchaseExpiryDate_" + i).val();

			
			var txtPurchaseQuotationFactor1UOM = $("#txtPurchaseQuotationFactor1UOM" + i).text(); 
			var txtPurchaseQuotationFactor2UOM = $("#txtPurchaseQuotationFactor2UOM" + i).text(); 
			var txtPurchaseQuotationFactor3UOM = $("#txtPurchaseQuotationFactor3UOM" + i).text(); 
			var txtPurchaseQuotationFactor4UOM = $("#txtPurchaseQuotationFactor4UOM" + i).text();
			var txtPurchaseQuotationLastFactorUOM = $("#txtPurchaseQuotationLastFactorUOM" + i).text();
			 
			var txtAvliableqty = $("#txtPurchaseQuotationAvlqty" + i).val();
			//validatoin
			
			 if(parseInt(txtPurchaseQuotationDocQuantity) > parseInt(txtAvliableqty)){
					
					alert("Item Quantity less than available Quantity in "+i+" Row");
					$("#txtPurchaseQuotationDocQuantity" + i).focus();
					return false;
					
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
				alert("Unit price should be of digits and a decimal point Only in "+i+" Row");
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
				alert("Trade Discount should be of digits and a decimal point Only in "+i+" Row");
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
		  
		  
		/*  if(txtPurchaseQuotationTaxCode_ == "" || txtPurchaseQuotationTaxCode_ == null){
				
				alert("Please enter item tax code in "+i+" Row");
				$("#txtPurchaseQuotationTaxCode_" + i).focus();
				return false;
				
			}*/
		  
		  
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
		  
		  if(txtPurchaseQuotationPendingQuantity !== txtPurchaseQuotationDocQuantity)
		  {
			  alert(" pending Quantity should be equal to Item Quantity");
			  return false;
		  }
		 /* if(txtPurchaseMfgDate == "" || txtPurchaseMfgDate == null){
				
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

						// inv_purchase_common_item_code:,
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
						inv_purchase_common_item_tax_amount_rupess: txtPurchaseReturnTaxAmntinRs, // Add Tax amount in Rs in to list @author:paras @Date:25nov 
						inv_purchase_common_item_tax_code : txtPurchaseQuotationTaxCode_,
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
						inv_item_purchase_last_factor_uom :txtPurchaseQuotationLastFactorUOM,

					});

		}

	}
	
	var li = materiallist.ltinvetorypurchasecommonitemmaster.length;
	 if(li == 0)
		{
		alert("Please enter atleast one Item row to Save Purchase Return");
		return false;
		}
	
	materiallist = JSON.stringify(materiallist);
	var inputs = [];

	inputs.push('action=savePurchaseReturnDetail');
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
	inputs.push('txtPurchaseInvoiceNo=' + txtPurchaseInvoiceNo);
	
	inputs.push('txtPurchaseReturnNote2=' + txtPurchaseReturnNote2);
	inputs.push('txtPurchaseReturnOutWardNo=' +txtPurchaseReturnOutWardNo);
	inputs.push('txtPurchaseReturnDeliveryDate=' +txtPurchaseReturnDeliveryDate);
	
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
			var txtPurchaseReturnSaveOrUpdate = $("#txtPurchaseReturnSaveOrUpdate").val();
			if(txtPurchaseReturnSaveOrUpdate =='Update')
				{
					alert("Record Updated successfully..!");
				}
			else {
					alert("Record saved successfully..!");
				}
			
			
			$('#Sales_Quotation_Form').removeClass('fade');
			$('#Sales_Quotation_Form').modal('hide');		 			
			window.location.reload("inventory_Purchase_Return.jsp");
		}
	});
}




function totalAmount(id, rowCount) {
	// alert(id);
	var quantity = $('#' + id).val();

	var rate = $('#txtPurchaseQuotationUnitPrice' + rowCount).val();

	/*$('#txtPurchaseQuotationActualQuantity' + rowCount).val('0');*/
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
 
	
	
	$("#txtPurchaseReturnTotalDocQty").val(sum);
	
	calculTradeDis(id,rowCount);
	rowAmtCal(id,rowCount);
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	/*$("#txtPurchaseQuotationActualQuantity"+rowCount).val(quantity);*/
	

}

/********** Calculate treade discount AMt ******************/



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
		
		 
		var oldTotaldiscount = $("#txtPurchaseReturnTotalDocDiscount").val();
		
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
		
		
		$("#txtPurchaseReturnTotalDocDiscount").val(FinaltradeDiscount);
		
	}
}
	rowAmtCal(1,rowCount);
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
}

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
		
		 
		var oldTotaldiscount = $("#txtPurchaseReturnTotalDocDiscount").val();
		if(oldTotaldiscount == ''||oldTotaldiscount == null || oldTotaldiscount == undefined)
			{
			 $("#txtPurchaseReturnTotalDocDiscount").val(totalAmtInpercntage);
			}
		else
			{
			var finaltotalDiscount = (parseFloat(oldTotaldiscount) + parseFloat(totalAmtInpercntage)).toFixed(2);
			$("#txtPurchaseReturnTotalDocDiscount").val(finaltotalDiscount);
			}
	} else {

		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(baseAmt);
	}
}*/
/******************** Calculate RAW AmT *******************/

function rowAmtCal(id, rowCount) {

	var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val('');
		
	} else {
	/*	var sum = 0;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
		sum = parseFloat(baseAmt) + parseFloat(taxAmt);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(sum);*/
		
		
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
			$('#txtPurchaseReturnTaxAmntinRs'+ rowCount).val(finalcaltaxanmount); //add tax amount in Rs @author:paras @Date:23nov 
			 
			 finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
			 var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
			$('#txtPurchaseQuotationRowAmount' + rowCount).val(finalRowAmtcalculationgTax);
			
		}
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






/*************** featch piurchase Return master Details  modified Date 9june2016 @author sudhir** ******/
function fetctchPurchaseReturnMasterDetails() {
	var inputs = [];
	inputs.push('action=fetctchPurchaseReturnMasterDetails');
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
			$("#documentContent").setTemplate(inventorypurchasReturntemp);
			$("#documentContent").processTemplate(pobj1);
			$("#docuemntAjaxResPurReturnMaster").html(r);
		}
	});
}

var SrNo =1;
/**********************************Tamplet for Display Purchase Return master Detail************************************/

/*var inventorypurchasReturntemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
	+ "<thead class='cf' style='background: white;'><tr>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Return Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th> </tr> </thead>"
	+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}<tr class='center'>"
	+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_form_Name == 'PURCHASE RETURN'}<td>{SrNo++}</td><td id='id{$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no}</td><td id='desc{$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_Supplier_Name}</td>"
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewPurReturnMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
	+"<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal'  onclick=\"deletePurReturnMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no})\" value='EDIT' disabled><i class='fa fa-edit'></i></button></td>"
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal'   onclick=\"printPurReturnMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no})\" value='EDIT'><i class='fa fa-print'></i></button></td></tr>{#/if}{#/for}</table>"
	*/

/*new templet for removing delete option and remove save button in edit buttton @Date 31march2016 @Author : sudhir */
var inventorypurchasReturntemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
	+ "<thead class='cf' style='background: white;'><tr>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Return Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div> View </div></th></th> "
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th> </tr> </thead>"
	+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}<tr class='center'>"
	+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_form_Name == 'PURCHASE RETURN'}<td>{SrNo++}</td><td id='id{$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no}</td><td id='desc{$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_Supplier_Name}</td>"
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal' data-target='#Sales_Quotation_Form' onclick=\"viewPurReturnMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no})\" value='EDIT'><i class='fa fa-eye View'></i></button></td>"
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button'  data-toggle='modal'   onclick=\"printPurReturnMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_return_master_doc_no})\" value='EDIT'><i class='fa fa-print'></i></button></td></tr>{#/if}{#/for}</table>"
	
	
	
/*********************************** print Purchase Return Details*****************/
	
	
	function printPurReturnMasterDetails(partyId)
{
	
	var obj = $("#docuemntAjaxResPurReturnMaster").html();

	var objPurchase = JSON.parse(obj);

	var myObj = "";

	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_doc_no == partyId) {
			
			myObj = objPurchase.ltinvetorypurchasecommonmaster[rowCount];
			break;
			
		}
	}
			  $('#txtVendorCodePO').val(myObj.inv_purchase_return_master_Supplier_Id);
	 		  $("#txtPurchaseReturnDocSeries").val(myObj.inv_purchase_return_master_doc_Series);
	 		 $("#txtPurchaseReturnOutWardNo").val(myObj.inv_purchase_return_master_outward_no);
	 		 $("#txtPurchaseReturnDeliveryDate").val(myObj.inv_purchase_return_master_delivery_date);
	 		var txtVendorCode = $("#txtVendorCodePO").val();
	 		 var txtPurchaseReturnDocSeries =  $("#txtPurchaseReturnDocSeries").val();
	 		 var txtPurchaseReturnOutWardNo = $("#txtPurchaseReturnOutWardNo").val();
	 		 var txtPurchaseReturnDeliveryDate =$("#txtPurchaseReturnDeliveryDate").val();
	 		 //alert(txtPurchaseReturnOutWardNo);
	 		window.open("Inventory_purchase_return_print.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtPurchaseReturnDocSeries="+txtPurchaseReturnDocSeries+"&txtPurchaseReturnOutWardNo="+txtPurchaseReturnOutWardNo+"&txtPurchaseReturnDeliveryDate="+txtPurchaseReturnDeliveryDate);

	
	  	 		
	}
	
	function fetchpurchaseReturnforSearch(mrnId) {
	 
		var byVendorName = $("#byVendorName").val();
		
		if((mrnId == "")&&(byVendorName == ""))
		{
			alert("Please Enter Either Return Id or Vendor Name");
			return false;
		}
			var inputs = [];
			inputs.push('action=fetctchPurchaseReturnMasterDetails');
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
					objMRN = JSON.parse(r);
					SrNo =1;
					if (objMRN.ltinvetorypurchasecommonmaster.length > 0) {


						$("#documentContent").setTemplate(inventorypurchasReturntemp);
						$("#documentContent").processTemplate(pobj1);

					//	$("#docuemntAjaxResp").html(r);

					} else {
						alert("Record not found..!");
						fetctchPurchaseReturnMasterDetails();
						}
					$('#byMrnId').val("");
					$('#byVendorName').val("");

				}
			});
		}


function refreshpage()
{
	window.location.replace("inventory_Purchase_Return.jsp");
}

/** ***************** ON  Edit and view purchase Return  master and slave Details Author :Sudhir Modified Date:24:11:2015  ****************** */


function viewPurReturnMasterDetails(partyId) {
	
	$("#btnPurchaseReturnSave").hide();	
	$('#Sales_Quotation_Form').find('input, text').attr("readonly", "readonly");
	
	purchaseQuatViewRefresh();
	$('#hidePRsaveBtn').css('display','block');
	$("#divtxtPurchaseinvoiceList").hide();
	
	$("#closeonclick").hide();
	$("#selDocName").val('');
	document.getElementById("selDocName").disabled=true;
	$("#txtPurchaseReturnDocSeriesIsEdit").val('isEdit');
	$("#txtPurchaseReturnSaveOrUpdate").val('Update');
	var obj = $("#docuemntAjaxResPurReturnMaster").html();
	var objPurchase = JSON.parse(obj);
 
	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_doc_no == partyId) {
			
			
			var txtPurchaseQuotationDocNo = $("#txtPurchaseReturnDocNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_doc_no);
			
			/*var str=(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_doc_date).split("-");
			
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];*/
			
			$("#txtPurchaseReturnDocDate").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_doc_date);
			var txtPurchaseQuotationMobileNo = $("#txtPurchaseReturnMobileNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_mobile_number);

			var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO')
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_Supplier_Id);

			var txtPurchaseQuotationSupplierName = $(
					"#txtPurchaseReturnSupplierName")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_Supplier_Name);
			// $("#selDocName").hide();
			// option:selected").text(objPurchase.ltinvetorypurchasecommonmaster[rowCount].);
			var txtPurchaseQuotationDocSeries = $(
					"#txtPurchaseReturnDocSeries")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_doc_Series);
			/*var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;*/
			
			var txtPurchaseQuotationReferenceNo = $("#txtPurchaseReturnCodeReferenceNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_reference_no);
			
			var txtPurchaseQuotationAddress = $("#txtPurchaseReturnAddress")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_Address);
			var sclPurchaseQuotationDocstatus = $(
					"#sclPurchaseReturnDocStatus")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_status);
			var txtPurchaseQuotationTotalDocDiscount = $(
					"#txtPurchaseReturnTotalDocDiscount")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_total_discount);
			var txtPurchaseQuotationTotalDocQty = $(
					"#txtPurchaseReturnTotalDocQty")
					.val(
							objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_total_doc_qty);
			
			var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderRequestNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_purchase_Request_No);
			
			
			var txtPurchaseGrnNo = $("#txtPurchaseGrnNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_grn_No);
 
			var txtPurchaseInvoiceNo = $("#txtPurchaseInvoiceNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_invoice_no);
			var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo")
			.val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_order_no);
			
			var txtPurchaseReturnOutWardNo = $("#txtPurchaseReturnOutWardNo").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_outward_no);
			var txtPurchaseReturnDeliveryDate = $("#txtPurchaseReturnDeliveryDate").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_delivery_date);
			
			$("#txtSplDisc").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_special_disc);
			$("#txtdebitAmt1").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_debit_amt);
			$("#txtCD1").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_cash_amt_perct);
			$("#txtCDAmt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_cash_amt_rupees);
			
			$("#txtOctroi").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_octroi_amt);
			$("#txtSurcharge").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_surcharge_amt);
			$("#txtCreditAmt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_credit_amt);
			$("#txtFreight").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_freight_amt);
			
			$("#txtVat").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_calcuated_vat_amt);
			$("#txtlbt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_lbt_amt);
			$("#txtcst").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_cst_amt);
			$("#txtExVat").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_ex_vat_amt);
			
			$("#txtTotalVat").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_calcuated_total_taxes_amt).toFixed(2));
			$("#txtGross").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_total_base_gross_amt).toFixed(2));
			$("#txtLess").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_total_less_amt).toFixed(2));
			$("#txtAdd").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_total_add_amt).toFixed(2));
			
			$("#textVat").val((objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_final_calcuated_total_taxes_amt).toFixed(2));
			$("#txtNetAmt").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_final_total_net_amt);

			var selboxChargeswithAmtList = objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_special_charges;

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
			
		$("#sumofCharges").val(objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_return_master_sumofspecial_charges.toFixed(2));

			break;
			
		}
	}
var txtPurchaseReturnDocNo = $("#txtPurchaseReturnDocNo").val();
fetchtermsandconditionsDetailsforReturn(txtPurchaseReturnDocNo);
fetchPartyMasterAddressDetailsPO();
	var ck = $('#txtVendorCode').val();
	$('#txtVendorCode').val(ck);
	var inputs = [];
	inputs.push('action=fetchpurchaseReturnIteamMasterDetail');
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
										+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' readonly='' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
										+ srNumber
										+ "'  value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_Name
										+ "'  onkeyup = 'auto(this.id,onchange)' /> "
										+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_code
										+ "' readonly='' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_master_id
										+ "'/> </div> </td>"
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_doc_Qty
										+ "'  onkeyup='totalAmount(this.id,"
										+ srNumber
										+ ")' readonly=''><lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_unit_price
										+ "' readonly='' ></td>"
										+ ""
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_trade_discount_per
										+ "' onblur='calculTradeDis(this.id,"
										+ srNumber
										+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' readonly='' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_trade_discount_rupess
										+ "' readonly=''></td>"
										+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_trade_discount_amount
										+ "'onkeyup='chKTradAmt(this.id,"+srNumber+")'readonly='' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_trade_base_amount
										+ "'></td>"
										+ " <td><select class='form-control input-SmallText'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_tax_code +"</option>  </select></td><td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTaxAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_tax_amount
										+ "' onkeyup='rowAmtCal(this.id,"
										+ srNumber
										+ ")' readonly=''></td> "
									    + "<td><input type='text' style='width:100px;' class='form-control input-SmallText' id='txtPurchaseReturnTaxAmntinRs"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_tax_amount_rupess
										+ "' readonly='' ></td>"
										+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationRowAmount"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_row_amount
										+ "' readonly=''></td>"
										+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor1"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_factor1
										+ "' readonly=''><lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' maxlength='5'  id='txtPurchaseQuotationFactor2"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_factor2
										+ "' readonly=''><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label></td> "
										+ "<td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor3"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_factor3
										+ "' readonly='' ><lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor4"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_factor4
										+ "' readonly=''><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td>"
										+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_actural_qty
										+ "' onblur='pendingAmount(this.id,"
										+ srNumber
										+ ")' readonly=''></td> "
										+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_pending_qty
										+ "'></td> "
										+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
										+ srNumber
										+ "' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_batch_No
										+ "' readonly=''></td>"
										+ "  <td><input type='text' class='form-control input-SmallText' id='txtPurchaseMfgDate_"
										+ srNumber
										+ "'onclick = 'getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;' value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_mfg_Date
										+ "' readonly=''> </td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseExpiryDate_"
										+ srNumber
										+ "' onclick ='getMfgandexpyDate(this.id,"
										+ srNumber
										+ ")'; style='float:left;;'value='"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_return_item_Expiry_Date
										+ "' readonly='' > </td> </tr>");
						var state = $("#txtSupplierState").val();
						if(state =="MAHARASHTRA" || state == "Maharashtra" || state == "maharashtra")
						{
						
							$("#txtPurchaseQuotationTaxAmount"+srNumber).hide();
							
							//totalAmount();
						}else{
							
							$("#txtPurchaseQuotationTaxCode_"+srNumber).val("0.0");
						
							}

				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
					}

					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				}
			});

}


/******************************************************new party MASTER FOR PURSHACE return **added in LIST*************************************************husen**/ 
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
			/*********************************************** featch address and mobile no for suppler name In purchase quatation  Date:24/6/2015 Author :sudhir ***********************************/
			var obj = $("#PartyAddressTableInfoListPO").html();
			var objPurchase = JSON.parse(obj);
			for(var row =0 ;row < objPurchase.ltinventorypartymasteraddressinfodto.length;row ++  )
			{
			$("#txtPurchaseOrderAddress").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
			$("#txtSupplierState").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_state);
			break;
			}
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
			
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



/************************************ featch Document List*******************************************/


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
var selInventoryDocumentTemplate =
		 "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
		+"{#if $T.lstDocumentNUmberDto.document_series == 'Purchase Return'}"
		+ "<option id='myid' value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
		+ "{#/for}";

function getSeries(id) {

	var obj = $("#AjaxResopnse").html();
	var txtId = $('#txtPurchaseReturnDocNo').val();
	objDocument = JSON.parse(obj);

	for ( var i = 0; i < objDocument.lstDocumentNUmberDto.length; i++) {
		if (objDocument.lstDocumentNUmberDto[i].document_numbering_id == id) {
			$("#txtPurchaseReturnDocSeries").val(
					objDocument.lstDocumentNUmberDto[i].document_prefix
							+ objDocument.lstDocumentNUmberDto[i].document_number
							+ txtId
							+ objDocument.lstDocumentNUmberDto[i].document_suffix);

		}
		
	/*	$("#selDocName").val("'<option value='"+id+"'>Purchase Return'</option>");*/
		
	}

}

/** *************** AutoSuggestion Code for Search by Vendor Name Author :sudhir date :9:09:2015:************** */
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
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
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
			 $("#byVendorName").val(item.text);
			 
		}
	}
}



/* ************************************** fetch  terms and conditions Details for purchase Return Author :sudhir Date:27/10/2015 *************************************/
function fetchtermsandconditionsDetailsforReturn(ReturnId) {
		var inputs = [];
		inputs.push('action=fetchtermsandconditionsDetailsforReturn'); 
		inputs.push('ReturnId='+ReturnId);
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
				$("#txtPurchaseReturnNote2").val(objPurchase.ltinvetorypurchasecommonmaster[0].inv_purchase_return_terms_and_condition_master);
				
			}
		});
	}



/* ************************** chkTradAmtorPercentage Author: sudhir Date:24:10:2015 **************************************/

function chkTradAmtorPercentage(id,rowcount)
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
	
	
}

/* ************************** chKTradAmt Author: sudhir Date:24:10:2015 **************************************/
function chKTradAmt(id,rowcount)
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
		
			rowAmtCal(1,rowcount);
			totalGrossAmt(1,rowcount);
			totalVatAmt(1,rowcount);
			
		}
	 
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




/****showChargesdiv Author Sudhir jadhav @Date 14jully2016****/
function showChargesdiv() {
	 $("#ApplyChargesforItem").show('show');
	 fetchChargesDetail();
} 

/**** hideApplyChargespopaup for item in purchase Return Author:sudhir  @Date 14jully2016****/
function  hideApplyChargespopaup() {
	 $('#lstBoxforCharges').html();
	 $("#ApplyChargesforItem").hide('hide');	
	 $("#txtChargesAmt").val('');
	}
/********************************* End hideApplyTaxpopaup for item in purchase Return Author:sudhir  @Date 14jully2016 *****************************/

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


/******** remove Item Charges from list purchase Return ****Author:Sudhir Date:14jully2016 ****/
function removeItemCharges() {

	$('#lstBoxforCharges option:selected').remove();
}
/******** End remove Item Charges from list purchase Return ****Author:Sudhir Date:14jully2016 ****/


/****** * apply Charges for Item in purchase Return Author:sudhir Date:14jully2016  ****/
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
/*** *** End applyChargesforItem  in purchase Return Author:sudhir Date:14:jully:2016  ***** **/ 

//added byv vishant
function fetchPurchaseReturn(){
	
	var inputs = [];
	inputs.push('isEdit=' + 'no');
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: false,
			type: "GET",
			url: "ehat/invGoodReceiptNote/getGoodReceiptNoteSeries",
			data: str + "&reqType=AJAX",
			error: function () {
				alert('error');
			},
			success: function (response) {
				for (var i = 0; i < response.lstdocMasterDocNumFinancialYearDto.length; i++) {
					// this is for purchase order series if condition will be depend on entry in document number master
					if (response.lstdocMasterDocNumFinancialYearDto[i].docNumberingId == 6) {
						$("#returnSeriesId").val(response.lstdocMasterDocNumFinancialYearDto[i].docSeries+""+response.lstdocMasterDocNumFinancialYearDto[i].docId+""+response.lstdocMasterDocNumFinancialYearDto[i].docNumber+""+response.lstdocMasterDocNumFinancialYearDto[i].docSuffix);
						break;
					}
				}
				
			}
		});
	
	getAllGRN();
	getNextPurchaseReturnId();
	
}

/*******************************************************************************
 * @author : Vishant Pawar
 * @date : 04-Oct-2023
 * @codeFor : get all getAllGRN master 
 ******************************************************************************/

function getAllGRN() {

	//$('#callFrom').val(call);
	var inputs = [];
	inputs.push('call=' + 'NODRAFT');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invGoodReceiptNote/getAllGoodReceiptNote",
		timeout : 1000 * 60 * 5,
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "<option value='0'>select</option>";
	           
            for ( var i = 0; i < r.lstGoodReceiptNoteDto.length; i++){             
	                divContent = divContent + "<option value='" + r.lstGoodReceiptNoteDto[i].id + "'  >GRN:"
	                        + r.lstGoodReceiptNoteDto[i].id + "</option>";
            }
           
            $("#purchaseInvoiceId").html(divContent);
            $("#purchaseInvoiceId").select2();
            $("#purchaseInvoiceId").on("change", function () { 
            	//getTemplateDataById(); 
            	//viewGoodReceiptNote();
            	
            });
            
            $("#itemInfoTable *").attr("disabled",false);
    		$("#financialFormId *").attr("disabled",false);
		}		
	});
}

function viewGoodReceiptNote2(){
	
	var id = $('#purchaseInvoiceId').find(":selected").val();
	
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('call=' + 'NODRAFT');
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/purchasereturn/editGoodReceiptNote",
		data: str + "&reqType=AJAX",
		error: function () {
			alert('error');
		},
		success: function (response) {
			
			//response = response.lstGoodReceiptNoteItemDto;
			var rows = $('#itemInfoTable tbody tr.newAdded').length;
			for (var i = 1; i <= rows; i++) {
				
				//for (var i = 1; i <= rows; i++) {
					$("#gstId"+i).val(0);
					$("#igstId"+i).val(0);
					$("#itemNameId"+i).val("");
					$("#itemQuantityId"+i).val(0);
					$("#unitPriceId"+i).val(0);
					$("#discountPerId"+i).val(0);
					$("#discountRsId"+i).val(0);
					$("#discountAmtId"+i).val(0);
					$("#baseAmountId"+i).val(0);
					$("#gstId"+i).val(0);
					$("#igstId"+i).val(0);
					$("#gstAmtId"+i).val(0);
					$("#igstAmtId"+i).val(0);
					$("#totalAmtId"+i).val(0);
					$("#lblPurchaseQuotationDocQuantity"+i).val(0);
					$("#uomUnitLatestFactorId"+i).val(0);
					$("#factor1"+i).val();
					$("#factor2"+i).val();
					$("#factor3"+i).val();
					$("#factor4"+i).val();
					$("#uomUnitFactorOneNameId"+i).val(0);
					$("#uomUnitFactorTwoNameId"+i).val(0);
					$("#uomUnitFactorThreeNameId"+i).val(0);
					$("#uomUnitFactorFourNameId"+i).val(0);
					$("#itemExpectedQtyId"+i).val(0);
					$("#itemReceivedQtyId"+i).val(0);
					$("#totalReceivedQtyId"+i).val(0);
					$("#pendinQtyId"+i).val(0);
					$("#batchId"+i).val();
					$("#itemManufactureDateId"+i).val("");
					$("#itemExpireDateId"+i).val("NA");
					$("#itemTotalAmount1"+i).val(0);
				
			}
			
			$("#invGRNId").val(response.id);
			
			$("#supplierName").val(response.grnSupplierName);
			$("#supplierAddress").text(response.grnSupplierAddress);
			$("#mbNo").val(response.grnSupplierMobile);
			$("#hiddenpartyMasterId").val(response.grnSupplierStateId);
			$("#grnDate").val($("#grnDate").val());
			//setParyMasterStateToGrn(response.partyMasterDtos);
			//getVenderState()
			//$('#supplierState').select2('val', response.grnSupplierState);
			//$('#supplierState').select2('val', response.grnSupplierState);
			$("#supplierState2 option:selected").text(response.grnSupplierState);
			$("#hiddenVenderState").val(response.grnSupplierStateId);
			$("#referenceNo").val(response.grnReferenceNo);
			$("#grnPurInvNumber").val($("#grnPurInvNumber").val());
			$("#grnDeliveryDate").val(response.deliveryDate);
			//$("#supplierAddress").val(response.supplierAddress);
			$("#grnStatus option:selected").val($("#grnStatus option:selected").val());
			$("#grnDeliveryChallanNumber").val($("#grnDeliveryChallanNumber").val());

			$("#totalItemId").val(response.totalItemQuantity);
			$("#totalDiscountId").val(response.totalItemDiscount);

			$("#txtSplDisc").val(response.lessSpecialDiscount);
			$("#txtdebitAmt").val(response.lessDebitAmount);
			$("#txtCD1").val(response.lessCDPercent1);
			$("#txtCDAmt").val(response.lessCDPercent2);


			$("#txtOctroi").val(response.addOctroi);
			$("#txtSurcharge").val(response.addSurcharge);
			$("#txtCreditAmt").val(response.addCreditAmount);
			$("#txtFreight").val(response.addFreight);

			$("#txtVat").val(response.taxVat);
			$("#txtlbt").val(response.taxLBT);
			$("#txtcst").val(response.taxCST);
			$("#txtExVat").val(response.taxExVat);
			$("#txtTotalVat").val(response.taxTotalTaxes);
			$("#txtGRNArermark").val(response.purchaseOrderRemark);
			$("#sumofCharges").val(0);

			$("#txtGross").val(response.grossAmount);
			$("#txtLess").val(response.grossLessAmount);
			$("#txtAdd").val(response.grossAddAmount);
			$("#grossTaxesId").val(response.grossTaxes);
			$("#txtNetAmt").val(response.grossNetAmount);
			$("#btnAddNew").hide();
			setEditGoodReceiptNoteSlaveInfo2(response, "purchaseReturn","");
		}
	});
}

/**
 * @author : Vishant Pawar
 * @date : 04-10-2023
 * @comment	: This function is created for to get formated date on table
 * @param date
 * @returns
 */
function getDate(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	console.log("Datee >> " + datee);
	return datee;
}


function getNextPurchaseReturnId() {
	var inputs = [];
	inputs.push('tableName=inv_purchase_return_master_new');
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "POST",
		data: str + "&reqType=AJAX",
		url: "ehat/invGoodReceiptNote/getGoodReceiptNoteSeriesNextId",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (r) {
			$("#returnId").val(r);
			//$("#txtgrnId").val(r);

			//$("#txtGRNDocNoOpeningStock").val(r);
		}
	});
}

function getUploadedDocuments(grnId){
	var grnId = grnId; // $("#grnId").val();
	var count = 0;
	var htm = "";
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {"grnMasterId" : grnId },
		url : "ehat/invGoodReceiptNote/getUploadedDocuments",
		success : function(response) {
			if(response !=null && response !="" && response.lstGoodReceiptNoteDocUploadDto !=null){
				var fileName = "";
				//fileName.replace(/^\[(.+)\]$/,'$1')
				
				for ( var i = 0; i < response.lstGoodReceiptNoteDocUploadDto.length; i++) {
					count++;
					fileName = response.lstGoodReceiptNoteDocUploadDto[i].imagePath;
					htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="filePathDocumentUploadId' + count
					+ '" >'
					+ response.lstGoodReceiptNoteDocUploadDto[i].imagePath
					+ '</td>'
					+ ' <td class="col-md-1 center" id="commentDocumentUploadId' + count
					+ '" >'
					+ response.lstGoodReceiptNoteDocUploadDto[i].note
					+ '</td>'
					+ ' <td class="col-md-1 center" id="uploadedDateDocumentUploadId' + count
					+ '" >'
					+ getDateWithTime(response.lstGoodReceiptNoteDocUploadDto[i].createdDate)
					+ '</td>'
					//view button
					+ ' <td class="col-md-1 center"><button id="viewDocumentUploadId'+count+'" value="'+JSON.parse(response.lstGoodReceiptNoteDocUploadDto[i].imagePath)+'"  type="button" onclick="viewUploadedDocument(this.value)" ><i class="fa fa-eye" title="View Document"></i></button>'
					// delete button
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" id="deleteDocumentUploadId'+count+'" value="'+response.lstGoodReceiptNoteDocUploadDto[i].id+'"  type="button" onclick="deleteUploadedDocument(this.value)" ><i class="fa fa-trash-o" title="Delete Document"></i></button>'
					+ '</td>'
					
					+ '</tr>';
				}
				$('#uploadedDocumentGrnBody').html(htm);
			}
		}
			
	});
}

function rowAmtCalForGST(id, rowCount) {
	
	var taxAmt = $("#gstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#totalAmtId' + rowCount).val(' ');
		$('#itemTotalAmount' + rowCount).val(' ');
		return false;
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#totalAmtId").val(' ');
		$("#itemTotalAmount").val(' ');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#gstId" + rowCount).val();
		if($("#gstId" + rowCount).val() > 0 &&  $("#igstId" + rowCount).val() == 0){
			taxAmt = $("#gstId" + rowCount).val(); // add tax amount in
		}else if($("#igstId" + rowCount).val() >0 && $("#gstId" + rowCount).val() == 0){
			taxAmt = $("#igstId" + rowCount).val(); // add tax amount in
		}
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		
		$("#gstAmtId" + rowCount).val(finalcaltaxanmount); // add tax amount in
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
		$('#itemTotalAmount' + rowCount).val(finalRowAmountAddingtax);
	}

}

function rowAmtCalForIGST(id, rowCount) {
	var taxAmt = $("#igstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$("#igstId" + rowCount).val('');
		return false;
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#igstId" + rowCount).val('');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#igstId" + rowCount).val();
		if($("#gstId" + rowCount).val() > 0 &&  $("#igstId" + rowCount).val() == 0){
			taxAmt = $("#gstId" + rowCount).val(); // add tax amount in
		}else if($("#igstId" + rowCount).val() >0 && $("#gstId" + rowCount).val() == 0){
			taxAmt = $("#igstId" + rowCount).val(); // add tax amount in
		}
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$("#igstAmtId" + rowCount).val(finalcaltaxanmount); // add tax amount in
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
		$('#itemTotalAmount' + rowCount).val(finalRowAmountAddingtax);
	}

}

/*******************************************************************************
 * @author : Vishant Pawar
 * @date : 05-10-2023
 * @codeFor : calcultae total item amount with igst_gst_base amount of all item
 ******************************************************************************/
function calculateTotalItemAmount(id){
	
var tableLengt = $('#grnItemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var totalAmt=$("#totalAmtId"+i).val();
		totalAmt = (totalAmt != '' && totalAmt !="undefined" && totalAmt !=null) ? totalAmt : 0;
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(totalAmt);
		
	}
	
	$("#itemTotalAmt").val(totalGstAMt);
}

function calculateTotalItemgstAmount(id){
	var tableLengt = $('#grnItemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var itemGstAmt=$("#gstAmtId"+i).val();
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(itemGstAmt);
		
	}
	
	$("#totalGstAmt").val(totalGstAMt);
}