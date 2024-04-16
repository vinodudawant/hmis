/*var ItemInfoList = "<tr><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td>";

function setItemInfotrPurchaseQuatation() {

	$("#ItemInfoTable > tbody")
			.append(
					"<tr>  <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td>");

}*/
/*$(document).on('click', '.removeButton', function() {
 $('#row1' + counter).remove();
 });*/

var rowCount = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;
var minLen;
var maxLen;
 
/*********************** Refreah poup Add new  Quation ****************************************************/ 
function setclearPOPONAddPQ() {
	$('#Purchase_Quotation_Form').find('input:text').val('');
	$('#Purchase_Quotation_Form').find('input:hidden').val('');

	$('#Purchase_Quotation_Form').find('input:text').val('');
	$('#ItemInfoTable').find('input:text').val('');
	$('#Purchase_Quotation_Form').find('textarea').val('');
	$("#ItemInfoTable > tbody").html('');
 
	isNew = 0;
	 
	getNextQuotationId();
	$("#txtPurchaseQuotationRequestNo").val(0);
	$("#txtPurchaseQuotationTotalDocQty").val(0);
	$("#divtxtPurchaseQuotationRequestNo").hide();
	
	$("#sumofCharges").val(0);

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
	$("#txtPurchaseQuotationTotalDocDiscount").val(0);
	
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
    $("#txtPurchaseQuotationDate1").val(today1);
	 
	// $("#txtPurchaseFormName").val("PURCHASE ORDER");
	//window.location.reload("inventory_Materail_Request_Note.jsp");
}
/********* New Save Purchase Quotation Author:sudhir modified @date:6june2016 add charges modified date:21jully2016 add validation for factoring********/

function savePurchaseQuotation() {

	var txtPurchaseFormName = $("#txtPurchaseFormName").val();	 
	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	var txtPurchaseQuotationDocNo = $("#txtPurchaseQuotationDocNo").val();
	//var txtPurchaseQuotationDocNo = 0;
	var txtPurchaseQuotationDate1 = $("#txtPurchaseQuotationDate1").val();
	var txtPurchaseQuotationMobileNo = $("#txtPurchaseQuotationMobileNo").val();
	var txtPurchaseQuotationSupplierCode = $('#txtVendorCode').val();	
	var txtPurchaseQuotationSupplierName = $("#txtPurchaseQuotationSupplierName").val();
	var selDocName = $("#selDocName option:selected").text();
	var txtPurchaseQuotationDocSeries = $("#txtPurchaseQuotationDocSeries").val();
	var txtPurchaseQuotationDocSeriesIsEdit = $("#txtPurchaseQuotationDocSeriesIsEdit").val();
	var txtPurchaseQuotationExpiryDate1 = $("#txtPurchaseQuotationExpiryDate1").val();
	var txtPurchaseQuotationDeliveryDate1 = $("#txtPurchaseQuotationDeliveryDate1").val();
	//var txtPurchaseQuotationNotes2 = $("#txtPurchaseQuotationNotes2").val();
	
	
	var txtDocSeries;
	var txtSupplierState = $("#txtSupplierState").val();
	if(txtSupplierState == 0){
		alert("Please Select Supplier State!!!");
		return false;
	}
	if(txtPurchaseQuotationDocSeriesIsEdit == 'isEdit')
	{
		txtDocSeries = txtPurchaseQuotationDocSeries;
	}
	else
	{
		var finaltxtPurchaseQuotationDocSeries = txtPurchaseQuotationDocSeries +"No"+":"+txtPurchaseQuotationDocNo;
		txtDocSeries = finaltxtPurchaseQuotationDocSeries;
	}	
	var txtPurchaseQuotationRequestNo =$("#txtPurchaseQuotationRequestNo").val(); 
	var txtPurchaseQuotationReferenceNo = $("#txtPurchaseQuotationReferenceNo").val();
	var txtPurchaseQuotationAddress = $("#txtPurchaseQuotationAddress").val();
	var sclPurchaseQuotationDocstatus = $("#sclPurchaseQuotationDocstatus").val();
	var txtPurchaseQuotationAmountinlocalcurrency = $("#txtPurchaseQuotationAmountinlocalcurrency").val();
	var txtPurchaseQuotationTotalDocDiscount = $("#txtPurchaseQuotationTotalDocDiscount").val();
	var txtPurchaseQuotationTotalDocQty = $("#txtPurchaseQuotationTotalDocQty").val();
	var txtGRNArermark =$("#txtGRNArermark").val();
	if(txtGRNArermark==null || txtGRNArermark==""){
		txtGRNArermark="-";
	}
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
	/*terms and condition */
	var txtPurchasTermsAndConditions = encodeURIComponent($.trim($("#txtPurchaseQuotationNotes2").val()));
	
	
/****validation of savePurchaseQuotation @author:paras suryawanshi @Date:28sep2016 *********/
	
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
	if(txtNetAmt <0)
	{
		alert("Please Enter Valid Net Amount ");
		$("#txtNetAmt").focus();
		return false;
	}
/**** End   validation of savePurchaseQuotation @author:paras suryawanshi @Date:28sep2016 *********/
	
	
	
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
	alert("“Please select purchase Quotation Date ");
	$("#txtPurchaseQuotationDate1").focus();
	return false;
	}
	
	
	var txtPurchaseQuotationSaveorUpDate =$("#txtPurchaseQuotationSaveorUpDate").val();
	
	if(!(txtPurchaseQuotationSaveorUpDate =='Update'))
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
	    	alert("Please Enter Current Date ");
		    $("#txtPurchaseQuotationDate1").focus();
		   return false;
	    }
	   }
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
	
	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtPurchaseQuotationMobileNo)) {
		alert("Purchase Quotation:Mobile No  should be of digits!");
		$("#txtPurchaseQuotationMobileNo").focus();
		return false;
	}
	
	
	// var curency = document.getElementById("selDocName");
    // var docseries = curency.options[curency.selectedIndex].text;
     var txtPurchaseQuotationDocSeries=$("#txtPurchaseQuotationDocSeries").val();
     if(txtPurchaseQuotationDocSeries == "" || txtPurchaseQuotationDocSeries == null)
     {
	    alert('please select doc series');
		$("#selDocName").focus();
		return false;
     }
     
     if(txtPurchaseQuotationReferenceNo == "" || txtPurchaseQuotationReferenceNo == null)
 	{
    	 txtPurchaseQuotationReferenceNo ="-";
 /*	alert("Please enter reference number");
 	$("#txtPurchaseQuotationReferenceNo").focus();
 	return false;*/
 	}
     
     if(txtPurchaseQuotationAddress == "" || txtPurchaseQuotationAddress == null)
 	{
 	alert("Please enter address");
 	$("#txtPurchaseQuotationAddress").focus();
 	return false;
 	}
     
     /*var pattern = /^([a-zA-Z0-9]+\s?)*$/;
 	if (!pattern.test(txtPurchaseQuotationAddress)) {
 		alert("Purchase Quotation address should be of alphabets and digits  only with a single space allowed..!");
 		$("#txtPurchaseQuotationAddress").focus();
 		return false;
 	  }*/
     
     
     var status = document.getElementById("sclPurchaseQuotationDocstatus");
     var docstatus = status.options[status.selectedIndex].text;
     if(docstatus == 0 ||  docstatus == 'Select')
     {
	    alert('Please select Quotation Status');
		$("#sclPurchaseQuotationDocstatus").focus();
		return false;
     }
     
    /* if(txtPurchaseQuotationExpiryDate1 == ""|| txtPurchaseQuotationExpiryDate1== " ")
    	 {
    	 alert("Please Select Expiry Quotation Date");
    	 return false;
    	 }
     return false;*/
	var materiallist = {
		ltinvetorypurchasecommonitemmaster :[]
	};
	
	
	// alert("ROW" +rowCount);
	for ( var i = 1; i <= totaltblsize; i++) {
		for ( var i = 1; i <= totaltblsize-1; i++) {
		
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
			
			/*var txtPurchaseQuotationTaxCode_ = $(
					"#txtPurchaseQuotationTaxCode_" + i).val();*/
			
			
			var txtPurchaseQuotationTaxCode_ = "";
			/*$('#txtPurchaseQuotationTaxCode_'+ i).find('option').each(function() {
				txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
			});
			txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_.substring(0, txtPurchaseQuotationTaxCode_.length-1);*/
			
			
			txtPurchaseQuotationTaxCode_ = $('#txtPurchaseQuotationTaxCode_'+ i).val();
			/*var txtPurchaseQuotationTaxCode_ = "";
			
			$('#txtPurchaseQuotationTaxCode_'+ i).find('option:selected').each(function() {
				txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
			});
			if(txtPurchaseQuotationTaxCode_ != "") 
			{
				 txtPurchaseQuotationTaxCode_= txtPurchaseQuotationTaxCode_.substring(0, txtPurchaseQuotationTaxCode_.length-1);
			}
			else
			{
				$('#txtPurchaseQuotationTaxCode_'+ i).find('option').each(function() {
					txtPurchaseQuotationTaxCode_ = txtPurchaseQuotationTaxCode_ + ($(this).val() + ",");
				});
				 txtPurchaseQuotationTaxCode_= txtPurchaseQuotationTaxCode_.substring(0, txtPurchaseQuotationTaxCode_.length-1);
			}*/
			  
			/*return false;
			
			var txtPurchaseQuotationTaxCode_ = new Array();
			var taxCodeAndRate = document.getElementById('txtPurchaseQuotationTaxCode_'+ i);
			for(var K=0;K<taxCodeAndRate.options.length;K++)
				{
				txtPurchaseQuotationTaxCode_[K] = taxCodeAndRate.options[K].value;
				}
			alert(txtPurchaseQuotationTaxCode_);*/
			
			var txtPurchaseQuotationTaxAmount = $(
					"#txtPurchaseQuotationTaxAmount_" + i).val();
			var txtPurchaseQuotationTaxAmountinRs = $("#txtPurchaseQuotationTaxAmountinRs"+ i).val();
		
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
				
				alert("Please enter Item name in "+i+" Row");
				$("#txtPurchaseQuotationItemName_" + i).focus();
				return false;
				
			} 
		    if(txtPurchaseQuotationDocQuantity == "" || txtPurchaseQuotationDocQuantity == null){
				
				alert("Please enter item quantity in "+i+" Row");
				$("#txtPurchaseQuotationDocQuantity" + i).focus();
				return false;
				
			}
		    
		    if(parseInt(txtPurchaseQuotationDocQuantity) <= 0){
		    	alert("Please enter correct item quantity in "+i+" Row");
				$("#txtPurchaseQuotationDocQuantity" + i).focus();
				return false;
		    	
		    }
		    
		    if(txtPurchaseQuotationDocQuantity !== txtPurchaseQuotationActualQuantity){
	
		    	alert(" Order Quantity should be equal to Item Quantity "+i+" Row");
				$("#txtPurchaseQuotationActualQuantity" + i).focus();
				return false;
				
			}
		    
		    var pattern = /^([0-9])*$/;
			if (!pattern.test(txtPurchaseQuotationDocQuantity)) {
				alert("Item Quantity should be of digits Only! ");
				$("#txtPurchaseQuotationDocQuantity"+ i).focus();
				return false;
			}
		    
		    
		   if(txtPurchaseQuotationUnitPrice == "" || txtPurchaseQuotationUnitPrice == null){
				
				alert("Please enter item unit price in "+i+" Row");
				$("#txtPurchaseQuotationUnitPrice" + i).focus();
				return false;
				
			}
		   
		   
		   var pattern = /^[0-9]+\.?[0-9]*$/;
			if (!pattern.test(txtPurchaseQuotationUnitPrice)) {
				alert("Unit price should be of digits and a decimal point Only in "+i+" Row!");
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
				alert("Trade Discount should be of digits and a decimal point Only  in "+i+" Row !");
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
		  
		  /*if(txtPurchaseQuotationTaxCode_ == "" || txtPurchaseQuotationTaxCode_ == null){
				
				alert("Please enter item Tax code in "+i+" Row");
				$("#txtPurchaseQuotationTaxCode_" + i).focus();
				return false;
				
			} */    
		  
		  
		  if(txtPurchaseQuotationTaxAmount == "" || txtPurchaseQuotationTaxAmount == null || txtPurchaseQuotationTaxAmount == NaN){
				
				alert("Please enter item tax amount in "+i+" Row");
				$("#txtPurchaseQuotationTaxAmount_" + i).focus();
				return false;
				
			}
		  
		  if (txtPurchaseQuotationTaxAmount == '' || txtPurchaseQuotationTaxAmount == undefined || txtPurchaseQuotationTaxAmount == null || txtPurchaseQuotationTaxAmount == "NaN") {
		     	var min = parseInt(minLen);
		  	var max = parseInt(maxLen);
		  	
		  	var name19 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
		  	var value19 = ""; 
		  	    value19 = $("#txtPurchaseQuotationTaxAmount_" + i).val();
		  		
		  		if (min > value19.length || max < value19.length) {
		  		
		  			/*$("#txtPurchaseQuotationTaxAmount").val('0');*/
		  			$("#txtPurchaseQuotationTaxAmount_" + i).val('');
		  			$("#txtPurchaseQuotationTaxCode_" + i).focus();
		  			return false;
		  		} else if (value19 != "" && !name19.test(value19)) {
		  			
		  			alert("Please enter valid Tax");
		  			$("#txtPurchaseQuotationTaxAmount_" + i).val('');
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
		  
		  
		  
		  
		  if(txtPurchaseQuotationRowAmount == "" || txtPurchaseQuotationRowAmount == null || txtPurchaseQuotationRowAmount == NaN){
				
				alert("Please enter item row amount in "+i+" Row");
				$("#txtPurchaseQuotationRowAmount" + i).focus();
				return false;
				
			}
		  
		  
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
						inv_purchase_common_item_tax_amount_rupess :txtPurchaseQuotationTaxAmountinRs,
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
	inputs.push('txtPurchaseQuotationRequestNo=' + txtPurchaseQuotationRequestNo);
	inputs.push('txtPurchaseQuotationExpiryDate1=' + txtPurchaseQuotationExpiryDate1);
	inputs.push('txtPurchaseQuotationDeliveryDate1=' + txtPurchaseQuotationDeliveryDate1);
	
	 
	
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
	inputs.push('txtPurchaseQuotationNotes2='+txtPurchasTermsAndConditions);
	inputs.push('txtSupplierState='+txtSupplierState);//add by paras for supplier state
	
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
			/*var txtPurchaseQuotationSaveorUpDate =$("#txtPurchaseQuotationSaveorUpDate").val();
			
			if(txtPurchaseQuotationSaveorUpDate=='Update')
				{
				alert("Quotation Updated successfully..!");
				}
			else
				{
				alert("Quotation saved successfully..!");
				}*/
			
			$('#Purchase_Quotation_Form').removeClass('fade');
			$('#Purchase_Quotation_Form').modal('hide');		
		 			
			window.location.reload("inventory_Purchase_Quotation.jsp");
		}
	}); 
}

function refreshonviewPurchaseRequest() {
	$('#Purchase_Quotation_Form').find('input:text').val('');
	$('#Purchase_Quotation_Form').find('input:hidden').val('');

	$('#Purchase_Quotation_Form').find('input:text').val('');
	$('#ItemInfoTable').find('input:text').val('');
	$('#Purchase_Quotation_Form').find('textarea').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#ItemInfoTable > tbody").html('');
	window.location.reload("inventory_Purchase_Quotation.jsp");
	isNew = 1;
}

/*********************************changing width of textbox inventory purchasse order by paras suryawanshi @Date:3oct2016*******************************************/
function toCreateDiv() {

	$('#iHidePurQtnBtn').css('display','block');
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
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id,onchange)' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' style='width:60px;' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ");' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text'style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "'  ></td>"							
								+ " <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onblur='calculTradeDis(this.id,"+ rowCount+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "'   ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "'   ></td> "
								+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "'  ></td>"
								+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "'   ></td>"
							    +"<td><input type='text' class='typeahead form-control input-SmallText' 	autocomplete='off'  id='txtPurchaseQuotationTaxCode_"
									+ rowCount
									+ "' onkeyup='autotaxCodeforItem(this.id,onchange)' style='width:80px;'></td>"
									+ " <td><input type='text' class='typeahead form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
									+ rowCount
									+ "),autotaxCodeforItem(this.id,onchange)' id='txtPurchaseQuotationTaxAmount_"
									+ rowCount
									+ "' style='width:80px;' 	autocomplete='off'  ></td> "
							/*	+"<td><select style='width:160px;' class='form-control input-SmallText' multiple='multiple' onclick='multipletaxCalculation(this.id," + rowCount + ")' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCode_"
								+ rowCount
								+ "'></select></td> "
								+ " <td><input type='text' style='width:80px;' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "*/
								+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmountinRs"
  					            + rowCount
								+ "' readonly=''></td> "
								+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td>"
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText'maxlength='5'  onkeypress='return validateNumbers(event)' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "'><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"'  ></label></td> "
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5'  onkeypress='return validateNumbers(event)' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "'  ><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"'  ></label></td> "
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText'maxlength='5'   onkeypress='return validateNumbers(event)' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "'   ><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td>"
								+ " <td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5'  onkeypress='return validateNumbers(event)' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "'   > <label id='txtPurchaseQuotationFactor4UOM"+rowCount+"'></label> </td>"
								+ " <td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' ></td> "
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText'  readonly='' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "'  ></td> "
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount
								+ "'  ></td>"
								+ " </tr>");

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
								+ "'> <td> <input type='checkbox'  checked='checked' name='checkbox"
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
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;width:250px;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id,onchange)'  />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value ='0'/><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' style='width:60px;' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")'   ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "'  ></td>"							
								+ " <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chkTradAmtorPercentage(this.id,"+rowCount+")' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "'  ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")'  id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "'   ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "'  ></td>"
								+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' ></td>"
								  +"<td><input type='text' class='typeahead form-control input-SmallText' id='txtPurchaseQuotationTaxCode_"
									+ rowCount
									+ "' onkeyup='autotaxCodeforItem(this.id,onchange)'  style='width:80px;' autocomplete='off'></td>"
									+ " <td><input type='text' class='typeahead form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
									+ rowCount
									+ "),autotaxCodeforItem(this.id,onchange)' id='txtPurchaseQuotationTaxAmount_"
									+ rowCount
									+ "'   style='width:80px;' autocomplete='off' ></td> "
							/*	+"<td><select style='width:160px;' class='form-control input-SmallText' multiple='multiple'  onclick='multipletaxCalculation(this.id," + rowCount + ")' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCode_"
								+ rowCount
								+ "'></select></td>"
								+ " <td><input style='width:80px;' type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ></td> "*/
								+ "<td><input type='text'  style='width:100px;'  class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmountinRs"
  					            + rowCount
								+ "' readonly=''></td> "
								+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "'  readonly='' ></td>"
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'> <label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText'  onkeypress='return validateNumbers(event)' maxlength='5' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "'   > <label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText'  onkeypress='return validateNumbers(event)'  maxlength='5' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "'   > <label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td>"
								+ " <td><input type='text' style='width:60px;' class='form-control input-SmallText'  onkeypress='return validateNumbers(event)' maxlength='5' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "'   > <label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td>"
								+ " <td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' ></td> "
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "'   ></td> "
								+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
								+ rowCount
								+ "' ></td>"
								+ " </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
	//	autotaxCodeQouetaion("txtPurchaseQuotationTaxCode_" + rowCount, "onload");
		rowCount++;
	}

}


/*********************************End changing width of textbox inventory purchasse order by @author: paras suryawanshi @Date:3oct2016*******************************************/
function fetchPurchaeseQuatationeforSearch(mrnId) {

	var byVendorName = $("#byVendorName").val();
	
	if((mrnId == "")&&(byVendorName == ""))
	{
		alert("Please Enter Either Quotation Id or Vendor Name for search");
		return false;
	}	
	
	var inputs = [];
	inputs.push('action=fetchPurchaseCommonMasterDetailSearch');
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
			SrNo=1;
			if (objMRN.ltinvetorypurchasecommonmaster.length > 0) {

				
				$("#documentContent").setTemplate(inventoryPurchaseQuotationTemp);
				$("#documentContent").processTemplate(pobj1);

			//	$("#docuemntAjaxResp").html(r);

			} else {
				alert("Record not found..!");
				fetchPurchaseQuotationMasterNew("no","onload");
			}
			$('#byMrnId').val("");
			$('#byVendorName').val("");
		}
	});
}
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
	totalDocDiscountPQ();
	totalDocQtyPQ();
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
}

function getNextQuotationId() {
	//alert("hhhh");
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
			alert("error");
		},
		success : function(r) {
			//alert(r);
			ajaxResponse = r;
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
			//alert(r);
			$('#AjaxResopnse').html(r);
			pobj1 = eval('(' + r + ')');
			$("#selDocName").setTemplate(selInventoryDocumentTemplate);
			$("#selDocName").processTemplate(pobj1);

		}
	});
}
var selInventoryDocumentTemplate = "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
		+"{#if $T.lstDocumentNUmberDto.document_series == 'Purchase Quotation'}"
		+ "<option id=pqId value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
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

// AutoSuggestion Code.............

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
						alert('error');
					},
					success : function(r) {
						// alert("r.length>>" + r.length);
						var availableTags = [];
						if (r.length == 20) {
							
							alert("NO MATCHING FOUND  please select Suppler Name from Auto suggestion drop down list !");
							$("#txtPurchaseQuotationSupplierName").val('');
							$("#txtPurchaseQuotationSupplierName").focus();
							

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
								$('#txtPurchaseQuotationSupplierName').data('typeahead').source = resultData;

							}, 500);
						}
					}
				});

		function displayResult(item) {
			//alert("name is =" + item.text);
			$('#txtVendorCode').val(item.value);
			//alert("Id=" + item.value + " Value=" + item.text);
			var masterId = item.value;
			//alert(masterId);
			getGeneralInfoIdForPurList();
			getAddressInfoIdPurList();
			getPaymentInfoIdPurList();
			fetchPartyMasterContactsDetails(masterId);	
			fetchPartyMasterAddressDetails(masterId);
			fetchPartyMasterPaymentDetails(masterId);
			fetchPartyMasterGeneralDetails(masterId);
			fecthPartyOtherInfo(masterId);
			
			
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


//AutoSuggestion Code for Search .............

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
			 $("#byVendorName").val(item.text);
			 
		}
	}
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
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtotherid").val(r);
		}
	});
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
/** ******* AutoSuggestion Code for item modified date:19may2016 Author Sudhir ********** */

function auto(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	// var txtVal = $('#'+ inputID).val();
	var txtPurchaseQuotationTaxCode1="";
	var availableTags1="";
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
						//alert(r);
						//alert(r.length);r.length == 32
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
							availableTags1 = eval('(' + r + ')');
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

			$("#ItemInfoList input[type=checkbox]").each(function(){

				  $(this).prop("checked",false);
				});
			
			
			toCreateDiv();
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
							setTimeout(function() {
							//alert(r);
							
							$('#PQItemPurchaseInfoDIV').html(r);
							var state = $("#txtSupplierState").val();//added by paras for igst 
							var hostate = $("#hosState").val();
							ajaxResponse = eval('(' + r + ')');
if(ajaxResponse.inventoryitempurchaseandItemMasterDTOs.length ==0){
	$('#txtPurchaseQuotationUnitPrice' + idValue)
	.val(0);
$('#txtPurchaseQuotationFactor1' + idValue)
	.val(0);
$('#txtPurchaseQuotationFactor2' + idValue)
	.val(0);
$('#txtPurchaseQuotationFactor3' + idValue)
	.val(0);
$('#txtPurchaseQuotationFactor4' + idValue)
	.val(0);

//for UOM of factors 



/*$('#txtPurchaseQuotationDocQuantity' + idValue)
	.val(
			ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);*/

//$('#txtPurchaseQuotationPendingQuantity' + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);
$('#txtPurchaseQuotationDocQuantity'+ idValue).val(0);
$('#txtPurchaseQuotationPendingQuantity'+ idValue).val(0);
$('#txtPurchaseQuotationActualQuantity'+ idValue).val(0);
var finalrat = 0.0;
var finalRateamt;
var sumofRate = 0;
for ( var i = 0; i < availableTags1.ltInventoryItemMasterDTOs.length; i++) {
	txtPurchaseQuotationTaxCode1 = availableTags1.ltInventoryItemMasterDTOs[i].inv_item_taxcode_and_rate;
}
if(txtPurchaseQuotationTaxCode1.length > 0){
	
	var Finalrateandtax = txtPurchaseQuotationTaxCode1.split(",");
	
	for(var i=0;i<Finalrateandtax.length;i++)
		{ 
		finalrat = Finalrateandtax[i];
		
		var taxRate =  finalrat.split("_");
		finalRateamt = taxRate[1];
		
		sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
	
		
		}
}



if(state == hostate)
{
	$("#txtPurchaseQuotationTaxCode_"+idValue).val(finalrat);
	$("#txtPurchaseQuotationTaxAmount_"+idValue).val("0.0").hide();

}else{
	$("#txtPurchaseQuotationTaxAmount_"+idValue).val(sumofRate);
	$("#txtPurchaseQuotationTaxCode_"+idValue).val("0.0");

	$("#txtPurchaseQuotationTaxCode_"+idValue).hide();
	}
totalAmount();

}	

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
								
						$('#txtPurchaseQuotationLastFactorUOM' + idValue).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenLastUOM);
						
								/*$('#txtPurchaseQuotationDocQuantity' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);*/
								
								//$('#txtPurchaseQuotationPendingQuantity' + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);
								$('#txtPurchaseQuotationDocQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								$('#txtPurchaseQuotationPendingQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								$('#txtPurchaseQuotationActualQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								
								
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
									
									//$("#txtPurchaseQuotationTaxCode_"+idValue).append(option);	
								
									//igst code new	
									
									
									if(state == hostate)
									{
										$("#txtPurchaseQuotationTaxCode_"+idValue).val(finalrat);
										//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
										$("#txtPurchaseQuotationTaxAmount_"+idValue).val("0.0").hide();
									
									}else{
										
										$("#txtPurchaseQuotationTaxCode_"+idValue).val("0.0");
										$("#txtPurchaseQuotationTaxAmount_"+idValue).val(sumofRate);
										$("#txtPurchaseQuotationTaxCode_"+idValue).hide();
										}
									}
                         /*  if(state =="MAHARASHTRA" || state == "Maharashtra" || state == "maharashtra")
									{
										$("#txtPurchaseQuotationTaxCode_"+idValue).append(option);
										//$("#txtPurchaseQuotationTaxCode_"+idValue).val(sumofRate);
										$("#txtPurchaseQuotationTaxAmount"+idValue).val("0.0").hide();
										$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
										//totalAmount();
									}else{
										
										$("#txtPurchaseQuotationTaxCode_"+idValue).val("0.0");
										$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
										}
									}*/
								
								//$('#txtPurchaseQuotationDocQuantity' + idValue);
								totalAmount();
								$("#txtPurchaseQuotationTaxAmount_"+idValue).val(sumofRate);
								break;

							}
							}, 200);
						}
					
					});

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
								*//***********************************************husen added table *******************************************//*
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
								*//***********************************************husen added info table *******************************************//*
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
								*//********************************husen added info table **********************************//*
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

function fetchPurchaseQuotationMasterNew(Id,loadOn) {
	var inputs = [];
	inputs.push('action=fetchPurchaseCommonMasterDetail');
	if(loadOn == "onload")
		{
	inputs.push('isEdit=no');
	inputs.push('partyId=undefined');
		}
	if( loadOn =="onClick")
		{
		inputs.push('isEdit=Yes');
		inputs.push('partyId=undefined');
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
			//alert(r);
			pobj1 = eval('(' + r + ')');
			SrNo = 1;
			$("#documentContent").setTemplate(inventoryPurchaseQuotationTemp);
			$("#documentContent").processTemplate(pobj1);

			$("#docuemntAjaxResp").html(r);
		}
	});
}
/** ****** Edit and view purchase Quatation ** modified Date:7/6/2016  modified Date 11jully2016 Reson Add Charges Button and sum of Special charges ******/

/****************(Edit)changing width of text box inventory purchase Quatation @author:paras suryawanshi @Date:3oct2016 ***************************************************************************************/
function viewPurchaseMasterDetails(partyId) {
	purchaseQuatViewRefresh();
	$("#selDocName").text("");
	document.getElementById("selDocName").disabled = true;
	$("#closeonclick").hide();
	$("#txtPurchaseQuotationDocSeriesIsEdit").val('isEdit');
	$("#txtPurchaseQuotationSaveorUpDate").val('Update');
	$('#iHidePurQtnBtn').css('display','block');
	var obj = $("#docuemntAjaxResp").html();
	var objPurchase = JSON.parse(obj);
//alert(obj);
	var myObj = "";
	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_common_master_doc_no == partyId) 
		{
			 
			myObj = objPurchase.ltinvetorypurchasecommonmaster[rowCount];
			 
			break;
		}
	}

	
		 $("#txtPurchaseQuotationDocNo").val(myObj.inv_purchase_common_master_doc_no);
			/**********************************date convert***************************************/	
			/*var str=(myObj.inv_purchase_common_master_doc_date).split("-");
			var leaddate=str[2]+"-"+str[1]+"-"+str[0];*/
			$("#txtPurchaseQuotationDate1").val(myObj.inv_purchase_common_master_doc_date);
			 
			$("#txtPurchaseQuotationMobileNo").val(myObj.inv_purchase_common_master_mobile_number);
			
			 $('#txtVendorCode').val(myObj.inv_purchase_common_master_Supplier_Id);

			$("#txtPurchaseQuotationSupplierName").val(myObj.inv_purchase_common_master_Supplier_Name);
			 
			var txtPurchaseQuotationDocSeries = $("#txtPurchaseQuotationDocSeries").val(myObj.inv_purchase_common_master_doc_Series);
			var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;
			 $("#txtPurchaseQuotationReferenceNo").val(myObj.inv_purchase_common_master_reference_no);
			 $("#txtPurchaseQuotationAddress").val(myObj.inv_purchase_common_master_Address);
			 $("#sclPurchaseQuotationDocstatus").val(myObj.inv_purchase_common_master_status);
			 $("#txtPurchaseQuotationTotalDocDiscount").val(myObj.inv_purchase_common_master_total_discount);
			 $("#txtPurchaseQuotationTotalDocQty").val(myObj.inv_purchase_common_master_total_doc_qty);
			 $("#txtPurchaseQuotationRequestNo").val(myObj.inv_purchase_common_master_purchase_Request_No);
			 
			 $("#txtPurchaseQuotationExpiryDate1").val(myObj.inv_purchase_common_master_expired_quotation_date);
			 
			 $("#txtPurchaseQuotationDeliveryDate1").val(myObj.inv_purchase_common_master_delivery_date);
			
		 var txtPurchaseQuotationRequestNo1 =$("#txtPurchaseQuotationRequestNo").val();
	
	//add by paras for edit supplier state	 
		 if(myObj.inv_SupplierState == 0 || myObj.inv_SupplierState ==null || myObj.inv_SupplierState==undefined ){
			 
		 }else{
			 $("#hoseditState").val(myObj.inv_SupplierState);
		 }
   //end
	//	 alert(myObj.inv_reamrk);
		 if(myObj.inv_reamrk==null ||myObj.inv_reamrk=="null"){
				$("#txtGRNArermark").val("-");

			}else{
				$("#txtGRNArermark").val(myObj.inv_reamrk);
			}
	$("#txtSplDisc").val(myObj.inv_purchase_common_master_special_disc);
	$("#txtdebitAmt1").val(myObj.inv_purchase_common_master_debit_amt);
	$("#txtCD1").val(myObj.inv_purchase_common_master_cash_amt_perct);
	$("#txtCDAmt").val(myObj.inv_purchase_common_master_cash_amt_rupees);
	
	$("#txtOctroi").val(myObj.inv_purchase_common_master_octroi_amt);
	$("#txtSurcharge").val(myObj.inv_purchase_common_master_surcharge_amt);
	$("#txtCreditAmt").val(myObj.inv_purchase_common_master_credit_amt);
	$("#txtFreight").val(myObj.inv_purchase_common_master_freight_amt);
	
	$("#txtVat").val(myObj.inv_purchase_common_master_calcuated_vat_amt);
	$("#txtlbt").val(myObj.inv_purchase_common_master_lbt_amt);
	$("#txtcst").val(myObj.inv_purchase_common_master_cst_amt);
	$("#txtExVat").val(myObj.inv_purchase_common_master_ex_vat_amt);
	
	$("#txtTotalVat").val((myObj.inv_purchase_common_master_calcuated_total_taxes_amt).toFixed(2));
	$("#txtGross").val((myObj.inv_purchase_common_master_total_base_gross_amt).toFixed(2));
	$("#txtLess").val((myObj.inv_purchase_common_master_total_less_amt).toFixed(2));
	$("#txtAdd").val((myObj.inv_purchase_common_master_total_add_amt).toFixed(2));
	
	$("#textVat").val((myObj.inv_purchase_common_master_final_calcuated_total_taxes_amt).toFixed(2));
	$("#txtNetAmt").val(myObj.inv_purchase_common_master_final_total_net_amt);
	
	var selboxChargeswithAmtList = myObj.inv_purchase_common_master_special_charges;
  
		if (selboxChargeswithAmtList == "No" || selboxChargeswithAmtList == null || selboxChargeswithAmtList == '' || selboxChargeswithAmtList == "0" || selboxChargeswithAmtList=="-Select-" || selboxChargeswithAmtList == "Select") {
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
		
		
	/*$("#selboxChargeswithAmtList  option:selected : removed").remove();
	$("#selboxChargeswithAmtList").text('');
	if(selboxChargeswithAmtList== "" || selboxChargeswithAmtList== null || selboxChargeswithAmtList== undefined || selboxChargeswithAmtList == '' || selboxChargeswithAmtList == '0' )
	{
		selboxChargeswithAmtList="No";
	}
	else if(selboxChargeswithAmtList == "-Select-" || selboxChargeswithAmtList== "Select" || selboxChargeswithAmtList == '0')
	{
		selboxChargeswithAmtList ="No"	;
	}
	
	for(var i=0;i<selboxChargeswithAmtList.legth;i++)
	{
	var option ="";
	option + "<option value="selboxChargeswithAmtList.[i]"> </option>";	
	}*/
		
	$("#sumofCharges").val(myObj.inv_purchase_common_master_sumofspecial_charges.toFixed(2));
	
	  
		 if(txtPurchaseQuotationRequestNo1 > 0)
			 {
			 $("#divtxtPurchaseQuotationRequestNo").show();
			 }
		 else
			 {
			 $("#divtxtPurchaseQuotationRequestNo").hide();
			 
			 }	
		
	
	/**************************fetch party master********************************/
		 fetchhospitalstate();
	fetchPartyMasterContactsDetails(partyId);	
	fetchPartyMasterAddressDetails(partyId);
	fetchPartyMasterPaymentDetails(partyId);
	fecthPartyOtherInfo(partyId);
	fetchtermsConditionsForQtn(partyId);
	 
	
	var ck = $('#txtVendorCode').val();
	$('#txtVendorCode').val(ck);
	 
	var inputs = [];
	inputs.push('action=fetchPurchaseCommonItemMasterDetail');
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
					var state = 0;
					var hostate = 0;
					
						state = myObj.inv_SupplierState;
					  
					   
					   
					srNumber = 1;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchasecommonitemmaster.length; Count++) {
							
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
												+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text'  style='text-align:left;width:250px;' readonly='' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
												+ srNumber
												+ "'  value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_Name
												+ "'  onkeyup = 'auto(this.id,onchange)' onkeypress='return validateOnlyName(event);'/> "
												+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_code
												+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_master_id
												+ "'/> </div> </td>"
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_doc_Qty
												+ "'  onblur='totalAmount(this.id,"+ srNumber+ ")' onkeyup= 'fetchItemFactors(this.id,"+ srNumber+ ")'><lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_item_purchase_last_factor_uom +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_item_purchase_last_factor_uom +" </label></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_unit_price
												+ "' onkeypress='return validateNumbers(event);'></td>"
												+ ""
												+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_discount_per
												+ "' onblur='calculTradeDis(this.id,"
												+ srNumber
												+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_discount_rupess
												+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td>"
												+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_discount_amount
												+ "'  onkeypress='return validateNumbers(event);'readonly='' ></td>"
												+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' readonly=''  id='txtPurchaseQuotationBaseAmount"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_base_amount
												+ "' onkeypress='return validateNumbers(event);' ></td> "
												/*+ "<td><select style='width:160px;' class='form-control input-SmallText'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_code + "</option>  </select></td> "
												
												+ " <td><input  style='width:80px;' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"+ srNumber
												+ "' value='"+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_amount +"' onkeyup='rowAmtCal(this.id,"+ srNumber+ ")' onkeypress='return validateNumbers(event);'readonly='' ></td> "*/
												
												    +"<td><input type='text' class='typeahead form-control input-SmallText' id='txtPurchaseQuotationTaxCode_"
													+ srNumber
													+ "' onkeyup='autotaxCodeforItem(this.id,onchange)'  style='width:80px;'   value='"+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_amount +"'></td>"
													+ " <td><input type='text' class='typeahead form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
													+ srNumber
													+ "),autotaxCodeforItem(this.id,onchange)' id='txtPurchaseQuotationTaxAmount_"
													+ srNumber
													+ "' value='"+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_amount +"' onkeyup='rowAmtCal(this.id,"+ srNumber+ ")'  style='width:80px;' ></td> "
												+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmountinRs"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_amount_rupess
												+ "' readonly='' ></td>"
												+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_row_amount
												+ "' onkeypress='return validateNumbers(event);'readonly='' ></td>"
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor1"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor1
												+ "' onkeypress='return validateNumbers(event);' > <lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_1 +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_1 +" </label></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor2"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor2
												+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_2 +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_2 +" </label></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor3"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor3
												+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_3 +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_3 +" </label></td>"
												+ " <td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5'id='txtPurchaseQuotationFactor4"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor4
												+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_4 +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_4 +" </label></td>"
												+ " <td><input type='text'  style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_actural_qty
												+ "' onblur='pendingAmount(this.id,"
												+ srNumber
												+ ")' onkeypress='return validateNumbers(event);' ></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText'readonly='' id='txtPurchaseQuotationPendingQuantity"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_pending_qty
												+ "' onkeypress='return validateNumbers(event);'  ></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_batch_No
												+ "' ></td>"
												+ "   </tr>");
						
						    hostate = $("#hosState").val();
						 
						if(state == hostate)
						{
						
							$("#txtPurchaseQuotationTaxAmount_"+srNumber).hide();
							
							//totalAmount();
						}else{
							$("#txtPurchaseQuotationTaxCode_"+srNumber).hide();
							$("#txtPurchaseQuotationTaxCode_"+srNumber).val("0.0");
							
							
						
							}
					
					/*	if(state =="MAHARASHTRA" || state == "Maharashtra" || state == "maharashtra")
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
					// auto("txtPurchaseQuotationItemName_","onload");
					//totalDocQtyPQ();
					//totalDocDiscountPQ();
					toCreateDiv();
					var txtEmptyItem = $("#txtEmptyItem").val();
					//auto(txtEmptyItem, "onload");

					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				}
			});

}
/****************End (Edit)changing width of text box inventory purchase Quatation @author:paras suryawanshi @Date:3oct2016 ***************************************************************************************/

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
					alert("error");
				},
				success : function(r) {
					//alert(r);
					$('#PQItemPurchaseInfoDIV').html(r);
					var PQ ="PurchaseQuotation";
					calculateFactoring(quantity,count,PQ);
				}
			});

}
function deletePurchaseMasterDetails(id) {
	var didConfirm = confirm("Are you sure to delete record?");
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
				fetchPurchaseQuotationMasterNew("no","onload");
			}
		});
	}
}


var SrNo = 1;
var inventoryPurchaseQuotationTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
		+ "<thead class='cf' style='background: white;'><tr>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Quotation Id</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-2 center'><div>Quotation Expiry Date</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th></tr> </thead>"
		+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}<tr class='center'>"
		+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_form_Name == 'PURCHASE QUOTATION'}<td id='Sr.No'>{SrNo++}</td><td id='id{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}</td><td id='desc{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_Supplier_Name}</td> <td id='desc{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_expired_quotation_date}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success'  data-toggle='modal' data-target='#Purchase_Quotation_Form' onclick=\"viewPurchaseMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deletePurchaseMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no})\"><i class='fa fa-trash-o'></i></button></td><td><button id='btnEdit2' class='btn btn-xs btn-success'  data-toggle='modal'  onclick=\"printPurchaseQuatationMasterDetails({$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no})\" value='EDIT'><i class='fa fa-print'></i></button></td></tr>{#/if}{#/for}</table>";

function refreshPopUp() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	$('#Sales_Quotation_Form').find('input:hidden').val('');

	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	window.location.reload("inventory_Purchase_Quotation.jsp");

}


/**************************print purchase Quataion********************/

function printPurchaseQuatationMasterDetails(partyId)
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
//alert(obj);
	var myObj = "";
	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {

		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_common_master_doc_no == partyId) 
		{
			myObj = objPurchase.ltinvetorypurchasecommonmaster[rowCount];
			break;
		}
	}
	
	$('#txtVendorCode').val(myObj.inv_purchase_common_master_Supplier_Id);

	$("#txtPurchaseQuotationSupplierName").val(myObj.inv_purchase_common_master_Supplier_Name);
	$("#txtPurchaseQuotationDeliveryDate1").val(myObj.inv_purchase_common_master_delivery_date);
	var txtPurchaseQuotationDocSeries = $("#txtPurchaseQuotationDocSeries").val(myObj.inv_purchase_common_master_doc_Series);

	
	var txtVendorCode = $("#txtVendorCode").val();
	var txtPurchaseQuotationDocSeries =  $("#txtPurchaseQuotationDocSeries").val();
	var txtPurchaseQuotationDeliveryDate1 =$("#txtPurchaseQuotationDeliveryDate1").val(); 
	var txtPurchaseQuotationDate1 =$("#txtPurchaseQuotationDate1").val(); 

	var hostate = parseInt(response);
 	var stateid= parseInt(myObj.inv_SupplierState);
 	var taxapp="IGST";
 	if(hostate == stateid ){
 		taxapp="GST";
 	}
	
	/*window.location.replace("Inventory_purchase_Quatation_print.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtPurchaseQuotationDocSeries="+txtPurchaseQuotationDocSeries);*/
	 window.open("Inventory_purchase_Quatation_NEWprint.jsp?txtVendorCode="+txtVendorCode+"&partyId="+partyId+"&txtPurchaseQuotationDocSeries="+txtPurchaseQuotationDocSeries+"&txtPurchaseQuotationDeliveryDate="+txtPurchaseQuotationDeliveryDate1
			   + "&purOrderDate="+txtPurchaseQuotationDate1 +"&taxapp="+taxapp);
	
		}});
	
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
/**PQ***function factoring *@author husenbadshah**@since 3/3/2016****/
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
// alert(ParsedOBJ.inventoryitempurchaseandItemMasterDTOs.length);
 if(ParsedOBJ.inventoryitempurchaseandItemMasterDTOs.length > 0){
 $("#hiddenfactorPrice").val(ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].hiddenFactorPrice);
 $("#hiddenfactorQTY").val(ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].hiddenFactorValue);
 var f1=ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1;
 var f2=ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2;
 var f3=ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3;
 var f4=ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor4;
 if(f1 == "NaN" || f1== NaN ||f1 == undefined ){
  f1 = 0;
 }
 if(f2 == "NaN" || f2== NaN ||f2 == undefined ){
  f2 = 0;
 }
 if(f3 == "NaN" || f3== NaN || f3 == undefined ){
  f3 = 0;
 }
 if(f4 == "NaN" || f4 == NaN || f4 == undefined ){
   f4 =0;
 }
 $("#item_purchase_uom_factor1").val(f1);
 $("#item_purchase_uom_factor2").val(f2);
 $("#item_purchase_uom_factor3").val(f3);
 $("#item_purchase_uom_factor4").val(f4);	 
 
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
}
function totalAmount(id, rowCount) {
	//  alert(id);
	
	checkValueZero(id);
	var quantity = $('#' + id).val();
	/**PQ***call factoring *@author husenbadshah**@since 3/3/2016****/
	var PQ ="PurchaseQuotation";
	calculateFactoring(quantity,rowCount,PQ);
	
	var rate = $('#txtPurchaseQuotationUnitPrice' + rowCount).val();

	$('#txtPurchaseQuotationActualQuantity' + rowCount).val(quantity);
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
    // alert(sum);
	$("#txtPurchaseQuotationTotalDocQty").val(sum);
	totalGrossAmt(1,rowCount);
}

/********** Calculate treade discount AMt Author:sudhir  modified data 14:12:2015* modified @Date 2june2016 add new fun call as totalGrossAmt() *****************/
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

		var baseAmt = docqty * unitprise;

		var totalAmtInpercntage = baseAmt * treadeDiscount / 100;

		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val(
				totalAmtInpercntage);

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
		
		
		$("#txtPurchaseQuotationTotalDocDiscount").val(FinaltradeDiscount);
		
	}
	}
	rowAmtCal(1,rowCount);
	 
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	/*rowCount(1,rowCount);*/
}
 

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
		$("#txtPurchaseQuotationTaxAmountinRs" + rowCount).val(finalcaltaxanmount); //add tax amount in Rs purchase quotation  @author:paras @Date:23nov
		
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(
				finalRowAmountAddingtax);
	}

}
/*function pendingAmount(id, rowCount) {

	var actualquantity = $('#' + id).val();
	var quantity = $('#txtPurchaseQuotationDocQuantity' + rowCount).val();
	if (actualquantity > quantity) {
		alert("Please enter valid quantity");
	} else {
		// ss alert(quantity + "-" +actualquantity);
		
		 * $('#txtPurchaseQuotationPendingQuantity' + rowCount).val( quantity -
		 * actualquantity);
		 
	}

}*/

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

	$("#txtPurchaseQuotationTotalDocQty").val(sum);
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

	$("#txtPurchaseQuotationTotalDocDiscount").val(sum);
	$("#RowCount").val(RowCount);

}

/******************************************************new party master**added in quatation jsp*************************************************husen**/ 
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
			alert("error");
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
		    alert('Please provide a valid Email Id');
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
			alert("error");
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
			$("#txtPurchaseQuotationMobileNo").val(objPurchase.ltinventorypartymastrecontactinfodto[row].party_contact_info_phone_number1);
			$("#txtPurchaseQuotationAddress").val(objPurchase.ltinventorypartymastrecontactinfodto[row].party_contact_info_address);
			break;
			}*/
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
			
			
		}
	});
}

function EditPartyContactsDetails(id) {
	
	$("#txtPurchaseContractandAddress").val("Update");
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
	var strDate = "";
	if(myobj.party_contact_info_dob == "0000-00-00")
		{
		strDate = "";
		 $("#txtdate").val(strDate);		
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
	var didConfirm = confirm("Are you sure to delete?");
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
			alert("error");
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
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Company</div></th>"
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


function SavePartyMasterAddressInfoDetails() 
{
	var txtpartymasterId = $("#txtVendorCode").val();
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
			$("#txtPurchaseQuotationAddress").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
		//	$("#txtSupplierState").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_state);
			
			break;
			}
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
			fetchStateListForRegInvPO(objPurchase);
			
		}
	});
}


function EditpartyAddressdetails(id)
{
	//alert("ok id is"+id);
	$("#txtPurchaseContractandAddress").val("Update");
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
	var txtpartymasterId = $("#txtVendorCode").val();
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
			alert("error");
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


function SavePartyMasterPaymentInfoDetails() 
{
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
	if(bank!= "" && txtaccountnumber == "")
		{
		alert("please Enter Account Number");
		return false;
		}
	
	if(bank == "" && txtaccountnumber != "")
		{
		alert("Please Select Bank Name First");
		return false;
		}
   
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
	/*  if(txtpaymentaddress != "")
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
			alert("error");
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


function EditpartyPaymentdetails(id)
{
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
	var txtpartymasterId = $("#txtVendorCode").val();
	//alert("party id:" + txtpartymasterId);
	var didConfirm = confirm("Are you sure to delete?");
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
     getPaymentInfoIdPurList();
}


/************************** Featch taxcode By Autosuggetion  for purchase Queataion Author :sudhir Date:30-6-2015***************** */


function autotaxCodeQouetaion(inputID, type) {
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
						if (r.length == 25) {
							alert("NO MATCHING FOUND Please Enter Valid Tax Code");
							var arrValue1 = (inputID).split("_");
							var idValue1 = (arrValue1[1]);
							$("#txtPurchaseQuotationTaxCode_"+idValue1).val('');
							$("#txtPurchaseQuotationTaxCode_"+idValue1).focus();

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
			
			//calculTaxAmtOnBaseAmt(itemrate,idValue);
			

		}
	}
}

/****************** Active Proccesd Quotation color  Author :sudhir Date:20/11/2015 ****************/
function openProcessdQuotation() {
	$("#ExpiredQuotation").css("background-color", "");
	$("#processdQuotation").css("background-color", "#81A981");
	$("#ExpiredQuotation").css("color", "black");
	$("#processdQuotation").css("color", "white");
	fetchPurchaseQuotationMasterNew("no","onload");
}

/****************** Active Expiry Quotation color  Author :sudhir Date:20/11/2015 ****************/
function openExpiryQuotation() {
	$("#processdQuotation").css("background-color", "");
	$("#ExpiredQuotation").css("background-color", "#81A981");
	$("#processdQuotation").css("color", "black");
	$("#ExpiredQuotation").css("color", "white");
	 fetchPurchaseQuotationMasterNew("no","onClick");
}


/* ************************** chkTradAmtorPercentage Author: sudhir Date:23:10:2015 **************************************/

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
/*****modified @Date :14june2016***/
function chKTradAmt(id,rowcount)
{
	var txtPurchaseQuotationTrdeDiscountInRupess = $("#txtPurchaseQuotationTrdeDiscountInRupess"+rowcount).val();
	
	if(txtPurchaseQuotationTrdeDiscountInRupess == "" || txtPurchaseQuotationTrdeDiscountInRupess == null )
		{
		 document.getElementById("txtPurchaseQuotationTrdeDiscountPercentage"+rowcount).disabled = false;
		 $("#txtPurchaseQuotationTrdeDiscountAmt"+rowcount).val(' ');
		 $("#txtPurchaseQuotationBaseAmount"+rowcount).val(' ');
		 $("#txtPurchaseQuotationRowAmount"+rowcount).val(' ');
		 $("#txtPurchaseQuotationTotalDocDiscount").val('0');
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
/*	}*/
	/*rowAmtCal(1,rowCount);
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);*/
	/*rowCount(1,rowCount);*/
}



/******************** taxcalculation author:sudhir Date:14:12:2012 **********************/

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
 
/********************** multipletaxCalculation Author sudhir Date:11/1/2016 *****************/
/*function multipletaxCalculation(id ,rowCount)
{
	var txtPurchaseQuotationTaxCode1_ = "";
	$('#txtPurchaseQuotationTaxCode_'+ rowCount).find('option:selected').each(function() {
		txtPurchaseQuotationTaxCode1_ = txtPurchaseQuotationTaxCode1_ + ($(this).val() + ",");
	});
	if(txtPurchaseQuotationTaxCode1_== "")
		{
		var txtPurchaseQuotationTaxCode_ = "";
		$('#txtPurchaseQuotationTaxCode_'+ rowCount).find('option').each(function() {
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
*/
/****** * applyTaxforItem for item in purchase Quaotation Author:sudhir Date:12 jan 2016  modified Date 2june2016 add fn call ****/
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
/**** hideApplyTaxpopaup for item in purchase Quaotation Author:sudhir Date:12 jan 2016 * Modified Date:23:feb:2016 ****/
 function  hideApplyTaxpopaup() {
	 $('#lstBoxforTax').html();
	 $("#ApplyTaxforItem").hide('hide');	
	 $("#txtNewTax").val('');
	}
 /********************************* End hideApplyTaxpopaup for item in purchase Quaotation Author:sudhir Date:12 jan 2016 *****************************/
 
 /***select * Tax code and tax rate for purchase Quatation **** Author:Sudhir Date:12:jan:2016 *****/
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
 /************************remove tax code and rate from list purchase Order *********Author:Sudhir Date:11:jan:2016 ************************/
 function removeItemTax() {

 	$('#lstBoxforTax option:selected').remove();
 }
 
 
 /** Fetch taxcode By Autosuggetion for purchase Quoatation Author :sudhir Date:23:02:2016**/

 function autotaxCodeforItem1(inputID, typeauto) {
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
 						
 						applyTaxforItemexpense(inputID);

 						if (r.length == 25) {
 							//alert("NO MATCHING FOUND Please Enter Valid Tax Code");
 							// var arrValue1 = (inputID).split("_");
 							// var idValue1 = (arrValue1[1]);
 							$("#txtNewTax").val('');
 							$("#txtNewTax").focus();

 						} else {
 							ajaxResponse = eval('(' + r + ')');
 							//ajaxResponse = decodeURIComponent(r);
 							var availableTags = [];
 							availableTags = ajaxResponse;
 							if(availableTags.length==0){
 		                        
 	                  			var arrValue = (inputID).split("_");
 	                  			var idValue = (arrValue[1]);
 	                  			$('#'+inputID + idValue).val(txtVal1);
 									//applyTaxforItemexpense(inputID); //added by paras
 								}
 							/*for ( var i = 0; i < ajaxResponse.inventoryTaxSetUps.length; i++) {
 								availableTags
 										.push((ajaxResponse.inventoryTaxSetUps[i].tax_code)
 												+ "_"
 												+ (ajaxResponse.inventoryTaxSetUps[i].tax_rate));
 							}*/
                            var lpq= availableTags.length;
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
                        if(lpq > 0){
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
 					}
 				});

 		function displayResult(item) {

 			$("#" + inputID).val((item.text).trim());
 			//alert(item.value);
 			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var itemrate1 = ((item.text).trim()).split("_");
			var itemrate = itemrate1[1];
			$('#txtPurchaseQuotationTaxAmount_' + idValue).val(itemrate);
			applyTaxforItemexpense(inputID);
			
				rowAmtCalNEW(1,idValue);
			totalVatAmtnEW(1,idValue);///added by paras calculate total vat
 		}
 	}
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
			$('#txtPurchaseQuotationTaxAmountinRs'+ rowCount).val(finalcaltaxanmount); //add tax amount in Rs @author:paras @Date:23nov 
			 
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
 
 /***** Calculate Total Gross AMt  of Base Amt @Author Sudhir @Date:7june2016*******/
 function totalGrossAmt(id, rowCount) {
	 	var sum = 0;
		var baseAmount;
		var RowCount = $("#RowCount").val();
		// var totalRow = $("#totalRow").val();
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
 
 
 /***** Calculate Total Vat AMt  @Author Sudhir @Date:2june2016*******/
 function totalVatAmt(id, rowCount) {
 	 
	 	var sum = 0;
		var baseAmount;
		var RowCount = $("#RowCount").val();
		var totaltblsize = $("#totaltblsize").val();
		var caltaxonBaseAmt;
		// var totalRow = $("#totalRow").val();

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
 
 /****showChargesdiv Author Sudhir jadhav @Date 6jully2016****/
 function showChargesdiv() {
	 $("#ApplyChargesforItem").show('show');
	 fetchChargesDetail();
} 
 
 /**** hideApplyChargespopaup for item in purchase Quaotation Author:sudhir  @Date 6jully2016****/
 function  hideApplyChargespopaup() {
	 $('#lstBoxforCharges').html();
	 $("#ApplyChargesforItem").hide('hide');	
	 $("#txtChargesAmt").val('');
	}
 /********************************* End hideApplyTaxpopaup for item in purchase Quaotation Author:sudhir  @Date 6jully2016 *****************************/
 
 /***fetchChargesDetail for select Box Setting values  @Author Sudhir jadhav @Date : 6jully2016***/
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
 /***templet for set charges Name to select box @Author sudhir @Data :8jully*/
 var selInventoryChargesDetails= "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.CategoryDTO as CategoryDTO}"
	+ "<option  value='{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryName}</option>"
	+ "{#/for}";
 /*** End templet for set charges Name to select box @Author sudhir @Data :8jully*/
 
 
 /**** Adding charges to list @Author Sudhir @Date 8jully2016 ***/  
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
	 var txtempAmt = $("#txtempAmt").val();
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
	 var finalChargesNameandAMt = txtChargesList +"_"+ txtChargesAmt +"_"+ txtempAmt +"_"+ txtexGstper +"_"+ txtexGstamt;
	 
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
 
 
 /******** remove Item Charges from list purchase Qoatation ****Author:Sudhir Date:8:jully:2016 ****/
 function removeItemCharges() {

 	$('#lstBoxforCharges option:selected').remove();
 }
 /******** End remove Item Charges from list purchase Qoatation ****Author:Sudhir Date:8:jully:2016 ****/
 
 
 /****** * apply Charges for Item in purchase Quaotation Author:sudhir Date:8:jully:2016  ****/
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
 /*** *** End applyChargesforItem  in purchase Quaotation Author:sudhir Date:8:jully:2016  ***** **/ 
 
 
 
 
 /**** fetchtermsandConditionsDetail for purchase Order @Date :09/08/2016  @Author Sudhir jadhav ***@*/
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
				alert("error");
			},
			success : function(r) {
			 	//alert(r);
				pobj1 = eval('(' + r + ')');
				SrNo = 1;
				$("#termsandConditionformmaster").setTemplate(inventorytermsAndConditionTemp);
				$("#termsandConditionformmaster").processTemplate(pobj1);

				$("#termsandConditionsDetailsAjaxResp").html(r);
			}
		});
	}
 /*set Tamplet For Terms and Conditions  @Date :09/08/2016  @Author Sudhir jadhav */
 var inventorytermsAndConditionTemp = "<table class='table table-striped' style='margin: 10px;width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>  <th style='height: 21.5px;' class='col-md-1 center'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Terms and Condition </div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Add</div></th>"
		+ "</tr> </thead>"
		+ "{#foreach $T.ltinvHospitalDetailDTOs as ltinvHospitalDetailDTOs}<tr class='center'> <td>{SrNo++}</td><td id='id{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}'>{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}</td><td style='text-align=left' id='desc{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}'>{$T.ltinvHospitalDetailDTOs.termsAndCondition}</td>"
		+ "<td><button type='button' id='btnEdit2' class='btn btn-xs btn-success' onclick = \"addtermsandCondition({$T.ltinvHospitalDetailDTOs.idinvhospitaldetails})\" value='EDIT'><i class='fa fa-plus'></i></button></td>"
		+ "</tr>{#/for}</table>";
 
 
  
 /**** fetchtermsandConditionsDetail for purchase Order @Date :12/10/2016  @Author kalpesh patil ****/
 function fetchtermsConditionsForQtn(quotationId) {
		var inputs = [];
		inputs.push('action=FetchTermsConditionsDetailForQtn');
		inputs.push('quotationId='+quotationId);
		
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
				$("#txtPurchaseQuotationNotes2").val(objPurchase.ltinvetorypurchasecommonmaster[0].invpurqtntermsandcondition);
			}
		});
	}
 
 
 
 /* add terms and Condition @Date :12/10/2016  @Author kalpesh Patil  ***/
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
				alert("error");
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
				var txtPurchaseQuotationDocSeriesIsEdit = $("#txtPurchaseQuotationDocSeriesIsEdit").val();

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
					if(txtPurchaseQuotationDocSeriesIsEdit ==0){
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
 var hos=0;
 var sta=0;
 function fetchdetailsonedititem()
 {
	   var txtPurchaseQuotationDocSeriesIsEdit = $("#txtPurchaseQuotationDocSeriesIsEdit").val();
	    var partyId =$("#txtPurchaseQuotationDocNo").val();
	
	    if(txtPurchaseQuotationDocSeriesIsEdit == 'isEdit' ){
	    	var inputs = [];
	        $("#ItemInfoTable > tbody").html('');
			inputs.push('action=fetchPurchaseCommonItemMasterDetail');
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
							
							
							for ( var Count = 0; Count < pobj1.ltinvetorypurchasecommonitemmaster.length; Count++) {

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
												+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text'  style='text-align:left;width:250px;' readonly='' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
												+ srNumber
												+ "'  value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_Name
												+ "'  onkeyup = 'auto(this.id,onchange)' onkeypress='return validateOnlyName(event);'/> "
												+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_code
												+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_master_id
												+ "'/> </div> </td>"
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_doc_Qty
												+ "'  onblur='totalAmount(this.id,"+ srNumber+ ")' onkeyup= 'fetchItemFactors(this.id,"+ srNumber+ ")'><lable id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_item_purchase_last_factor_uom +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_item_purchase_last_factor_uom +" </label></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_unit_price
												+ "' onkeypress='return validateNumbers(event);'></td>"
												+ ""
												+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_discount_per
												+ "' onblur='calculTradeDis(this.id,"
												+ srNumber
												+ ")' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_discount_rupess
												+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td>"
												+ " <td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationTrdeDiscountAmt"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_discount_amount
												+ "'  onkeypress='return validateNumbers(event);'readonly='' ></td>"
												+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' readonly=''  id='txtPurchaseQuotationBaseAmount"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_base_amount
												+ "' onkeypress='return validateNumbers(event);' ></td> "
												/*+ "<td><select style='width:160px;' class='form-control input-SmallText'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCode_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_code + "</option>  </select></td> "
												
												+ " <td><input  style='width:80px;' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"+ srNumber
												+ "' value='"+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_amount +"' onkeyup='rowAmtCal(this.id,"+ srNumber+ ")' onkeypress='return validateNumbers(event);'readonly='' ></td> "*/
												
												    +"<td><input type='text' class='typeahead form-control input-SmallText' id='txtPurchaseQuotationTaxCode_"
													+ srNumber
													+ "' onkeyup='autotaxCodeforItem(this.id,onchange)'  style='width:80px;'   value='"+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_amount +"'></td>"
													+ " <td><input type='text' class='typeahead form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
													+ srNumber
													+ "),autotaxCodeforItem(this.id,onchange)' id='txtPurchaseQuotationTaxAmount_"
													+ srNumber
													+ "' value='"+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_amount +"' onkeyup='rowAmtCal(this.id,"+ srNumber+ ")'  style='width:80px;' ></td> "
												+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmountinRs"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_amount_rupess
												+ "' readonly='' ></td>"
												+ "<td><input type='text' style='width:100px;' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_row_amount
												+ "' onkeypress='return validateNumbers(event);'readonly='' ></td>"
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor1"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor1
												+ "' onkeypress='return validateNumbers(event);' > <lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_1 +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_1 +" </label></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor2"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor2
												+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_2 +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_2 +" </label></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5' id='txtPurchaseQuotationFactor3"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor3
												+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_3 +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_3 +" </label></td>"
												+ " <td><input type='text' style='width:60px;' class='form-control input-SmallText' maxlength='5'id='txtPurchaseQuotationFactor4"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor4
												+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_4 +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_4 +" </label></td>"
												+ " <td><input type='text'  style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_actural_qty
												+ "' onblur='pendingAmount(this.id,"
												+ srNumber
												+ ")' onkeypress='return validateNumbers(event);' ></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText'readonly='' id='txtPurchaseQuotationPendingQuantity"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_pending_qty
												+ "' onkeypress='return validateNumbers(event);'  ></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNo"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_batch_No
												+ "' ></td>"
												+ "   </tr>");
								
								var state = $("#txtSupplierState").val();
								var hostate = $("#hosState").val();
								if(state == hostate)
								{
								
									$("#txtPurchaseQuotationTaxAmount_"+srNumber).hide();
									
									//totalAmount();
								}else{
									
									$("#txtPurchaseQuotationTaxCode_"+srNumber).val("0.0");
									$("#txtPurchaseQuotationTaxCode_"+srNumber).hide();
								
									}
								
							/*	if(state =="MAHARASHTRA" || state == "Maharashtra" || state == "maharashtra")
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
							// auto("txtPurchaseQuotationItemName_","onload");
							//totalDocQtyPQ();
							//totalDocDiscountPQ();
							toCreateDiv();
							var txtEmptyItem = $("#txtEmptyItem").val();
							//auto(txtEmptyItem, "onload");

							var totaltblsize = $("#RowCount").val();
							$("#totaltblsize").val(totaltblsize);
						}
					});
	    }
 else{
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
 function autotaxCodeforItem(inputID, typeauto){
		
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
//		var qty		= id.slice(0,-1); //for dyamic col getting id
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