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
		+ "</tr>{#/for}";
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
if(type=="onload"){
	var pobj1;
	$("#patientcontainer").setTemplate(tempforLab);
	$("#patientcontainer").processTemplate(pobj1);	
}
}

var ItemInfoList="<tr><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td>";

function setItemInfotr(){ 
	
	$("#ItemInfoTable > tbody").append("<tr>  <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td> <td><input type='text' class='form-control input-SmallText'></td>");
	
}
function addBasicInfo(){
	$("#BasicInfoTable > tbody").append("<tr><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><tr>");
}
function addAccountInfo(){
	$("#AccountInfoTable > tbody").append("	<tr><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text'  class='form-control input-SmallText'></td></tr>");
}
function addFreightDetails(){
	$("#FreightDetailsTable > tbody").append("	<tr><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td><td><input type='text'  class='form-control input-SmallText'></td></td></tr>");
}*/

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

function savePurchaseOrder(callFrom) {
	var currentuserName = $("#currentuserName").val();
	var currentUserID = $("#currentUserID").val();
	var txtPurchaseFormName = $("#txtPurchaseFormName").val();
	var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo").val();
	//alert(txtPurchaseOrderQuatationNo);
	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();

	var txtPurchaseQuotationDocNo = $("#txtPurchaseOrderDocNoPRl").val();
	var txtPurchaseQuotationDate1 = $("#txtPurchaseOrderDatePRL").val();
	var txtPurchaseQuotationMobileNo = $("#txtPurchaseOrderMobileNo").val();
	var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val();

	var txtPurchaseQuotationSupplierName = $("#txtPurchaseOrderSupplierName").val();

	var selDocName = $("#selDocNamePO option:selected").text();
	var txtPurchaseQuotationDocSeries = $("#txtPurchaseOrderDocSeries").val();
	
	var txtPurchaseOrderDocSeriesIsEdit = $("#txtPurchaseOrderDocSeriesIsEdit").val();
	var txtDocSeries;
	if(txtPurchaseOrderDocSeriesIsEdit == 'isEdit')
	{
			txtDocSeries = txtPurchaseQuotationDocSeries;
	}
	else
	{
		var finaltxtPurchaseOrderDocSeries =txtPurchaseQuotationDocSeries +"No"+":"+txtPurchaseQuotationDocNo;
			txtDocSeries = finaltxtPurchaseOrderDocSeries;
	}
	
	var txtPurchaseQuotationRequestNo = $("#txtPurchaseOrderRequestNo").val();

	var txtPurchaseQuotationReferenceNo = $("#txtPurchaseOrderReferenceNo")
			.val();

	var txtPurchaseQuotationAddress = $("#txtPurchaseOrderAddress").val();
	var sclPurchaseQuotationDocstatus = $("#sclPurchaseOrderDocstatus option:selected").text();
	var txtPurchaseQuotationAmountinlocalcurrency = $(
			"#txtPurchaseOrderAmountinlocalcurrency").val();
	var txtPurchaseQuotationTotalDocDiscount = $(
			"#txtPurchaseOrderTotalDocDiscount").val();
	
	/*var txtPurchasTermsAndConditions = $("#txtPurchaseQuotationNotes2").val();
	alert("txtPurchasTermsAndConditions : "+txtPurchasTermsAndConditions);*/
	
	var txtPurchasTermsAndConditions = encodeURIComponent($.trim($("#txtPurchaseQuotationNotes2").val()));
	
	var txtPurchaseQuotationTotalDocQty = $("#txtPurchaseOrderTotalDocQty").val();
	var txtPurchaseOrderDeliveryDate = $("#txtPurchaseOrderDeliveryDate").val();
	
	/*All chargesh 7/6/2016 */
	
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
	
	/**** validation for charges @author:sudhir jadhav @Date:17OCT2016  *********/
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
		
	/****END validation for charges @author:sudhir jadhav @Date:17OCT2016 *********/

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
		ltinvetorypurchaseorderitemmaster : []
	};

	//validation
	/*setnewtablecounterPO*/
	/*var NewVAlue = $("#setnewtablecounterPO").val();
	alert(NewVAlue);
	var onViewValue = $("#btnEdit2").val();
	alert(onViewValue);
	if(onViewValue == 'EDIT')
		{
		
		}
	if(NewVAlue == 'NewBtn'){
	var curency = document.getElementById("txtPurchaseQuotationList");
	var docseries = curency.options[curency.selectedIndex].text;
	if(docseries == 0 || docseries == '-Select-')
	{
	    alert('please select purchase quotation');
		$("#txtPurchaseQuotationList").focus();
		return false;
	}
	}*/
	if (txtPurchaseQuotationDate1 == "" || txtPurchaseQuotationDate1 == null) {
		alert("Please select purchase order  date ");
		$("#txtPurchaseOrderDatePRL").focus();
		return false;
	}

	var txtPurchaseOrderSaveOrUpdate =$("#txtPurchaseOrderSaveOrUpdate").val();
	if(!(txtPurchaseOrderSaveOrUpdate =='Update'))
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
	    
	    if( txtPurchaseQuotationDate1 === today1)
		   {
		   		    
		   }
	    else
	    {
	    	alert("Please Enter Current Date ");
		    $("#txtPurchaseOrderDatePRL").focus();
		   return false;
	    }
		}
		}

	if (txtPurchaseQuotationSupplierName == ""
			|| txtPurchaseQuotationSupplierName == null) {
		alert("Please enter supplier name");
		$("#txtPurchaseOrderSupplierName").focus();
		return false;
	}

	if (txtPurchaseQuotationMobileNo == ""
		|| txtPurchaseQuotationMobileNo == null) {
	alert("Please enter mobile number");
	$("#txtPurchaseOrderMobileNo").focus();
	return false;
}

if (txtPurchaseQuotationMobileNo.length < 10
		|| txtPurchaseQuotationMobileNo.length > 10) {
	alert("Mobile number should be of 10 digits");
	$("#txtPurchaseOrderMobileNo").focus();
	return false;
}
	/* var curency = document.getElementById("txtPurchaseOrderDocSeries");
	 if(curency == "" || curency == null)
	 {
	    alert('please select doc series');
		$("#txtPurchaseOrderDocSeries").focus();
		return false;
	 }*/

	//var curency = document.getElementById("txtPurchaseOrderDocSeries");
	// var docseries = curency.options[curency.selectedIndex].text;
	var txtPurchaseQuotationDocSeries = $("#txtPurchaseOrderDocSeries").val();
	if (txtPurchaseQuotationDocSeries == "" || txtPurchaseQuotationDocSeries == null) {
		alert('please select doc series');
		$("#selDocNamePO").focus();
		return false;
	}

	if (txtPurchaseQuotationReferenceNo == ""
			|| txtPurchaseQuotationReferenceNo == null) {
	/*	alert("Please enter reference number");
		$("#txtPurchaseOrderReferenceNo").focus();
		return false;*/
		txtPurchaseQuotationReferenceNo="-";
	}

	if (txtPurchaseQuotationAddress == ""
			|| txtPurchaseQuotationAddress == null) {
		alert("Please enter address");
		$("#txtPurchaseOrderAddress").focus();
		return false;
	}

	var status = document.getElementById("sclPurchaseOrderDocstatus");
	var docstatus = status.options[status.selectedIndex].text;
	if (docstatus == 0 || docstatus == 'Select') {
		alert('Please Select  Order Status');
		$("#sclPurchaseOrderDocstatus").focus();
		return false;
	}
	for ( var i = 1; i <= totaltblsize; i++) {
		/*this loop for removining last row which is not requaired @Date:17oct2016 */
		for ( var i = 1; i <= totaltblsize-1; i++)
			{
		if ($("#txtPurchaseQuotationItemNumber" + i).val() != null	&& $("#txtPurchaseQuotationItemNumber" + i).val() != undefined) {

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
			var txtPurchaseQuotationTrdeDiscountAmt = $(
					"#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
			
			var txtPurchaseQuotationTrdeDiscountInRupess = $(
					"#txtPurchaseQuotationTrdeDiscountInRupess" + i).val();
			 
			
			var txtPurchaseQuotationBaseAmount = $(
					"#txtPurchaseQuotationBaseAmount" + i).val();
			
		/*	var txtPurchaseQuotationTaxCodePO_ = $("#txtPurchaseQuotationTaxCodePO_" + i).val();*/
			
			var txtPurchaseQuotationTaxCodePO_ = "";
		/*	$('#txtPurchaseQuotationTaxCodePO_'+ i).find('option').each(function() {
				txtPurchaseQuotationTaxCodePO_ = txtPurchaseQuotationTaxCodePO_ + ($(this).val() + ",");
			});*/
			
	//		txtPurchaseQuotationTaxCodePO_= txtPurchaseQuotationTaxCodePO_.substring(0, txtPurchaseQuotationTaxCodePO_.length-1);
			txtPurchaseQuotationTaxCodePO_= $('#txtPurchaseQuotationTaxCodePO_'+ i).val();
			
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
					"#txtPurchaseQuotationTaxAmount_" + i).val();
			
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
				$("#txtPurchaseQuotationTaxAmount_" + i).focus();
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
			  			$("#txtPurchaseQuotationTaxAmount_" + i).val('');
			  			$("#txtPurchaseQuotationTaxCodePO_" + i).focus();
			  			return false;
			  		} else if (value19 != "" && !name19.test(value19)) {
			  			
			  			alert("Please enter valid Tax");
			  			$("#txtPurchaseQuotationTaxAmount_" + i).val('');
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
						inv_purchase_order_item_code : 0,//txtPurchaseQuotationItemName,
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
}
	var txtSupplierState = $("#txtSupplierState").val();
	if(txtSupplierState == 0){
		alert("Please Select Supplier State!!!");
		return false;
	}
	var li = materiallist.ltinvetorypurchaseorderitemmaster.length;
	 if(li == 0)
		{
		alert("Please enter atleast one Item row to Save Purchase Order");
		console.log(materiallist.ltinvetorypurchaseorderitemmaster);
		return false;
		}
	
	
	materiallist = JSON.stringify(materiallist);
	var inputs = [];

	inputs.push('action=savePurchaseOrderDetail');
	inputs.push('materiallist=' + materiallist);
	inputs.push('txtPurchaseQuotationDocNo=' + txtPurchaseQuotationDocNo);
	inputs.push('txtPurchaseOrderQuatationNo=' + txtPurchaseOrderQuatationNo);
	inputs.push('txtPurchasTermsAndConditions=' + txtPurchasTermsAndConditions);
	
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
	inputs.push('currentuserName='+currentuserName);
	inputs.push('currentUserID='+currentUserID);
	
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
	inputs.push('txtSupplierState=' + txtSupplierState);
	inputs.push('plainpo=Y');
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
			/*var txtPurchaseOrderSaveOrUpdate =$("#txtPurchaseOrderSaveOrUpdate").val();
			if(txtPurchaseOrderSaveOrUpdate=='Update')
			{
				alert("Order updated successfully..!");
			}
			else
				{
				alert("Order is saved successfully..!");
				}*/
			
			
			$('#Purchase_Order_Form').removeClass('fade');
			$('#Purchase_Order_Form').modal('hide');
			//$('#userNameandpasswordPopUp').modal('show');
			//checkUserNameandPassword();
		
			//window.location.reload("inventory_Purchase_Order.jsp");
		}
	});
}

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
								+ "' onkeyup='auto(this.id,onchange,toCreateDivPO)' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "'  onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "'  style='width:60px;' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly=''  style='width:60px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'readonly='' style='width:100px;' ></td>" 
							/*	"<td><select style='width:160px;' class='form-control input-SmallText'  multiple='multiple' onclick='multipletaxCalculation(this.id," + rowCount + ")' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCodePO_"
								+ rowCount
								+ "'></select></td>"*/
							/*	+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount_"
								+ rowCount
								+ "'  style='width:100px;'></td> "*/
								 +"<td><input type='text' class=' ui-autocomplete-input form-control input-SmallText'  autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
									+ rowCount
									+ "' onkeypress='autotaxfetch(this.id,onchange)'  style='width:80px;'></td>"
									
								+ " <td><input type='text' class=' ui-autocomplete-input form-control input-SmallText' id='txtPurchaseQuotationTaxAmount_"
								+ rowCount
								+ "' onkeypress='autotaxfetch(this.id,onchange)'  style='width:100px;' autocomplete='off'>"
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
								+ rowCount
								+ "'   readonly='' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:100px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);'  value='0' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' value='0' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text'  value='0' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' style='width:60px;' ></label></td> "
								+ "<td><input type='text'   value='0' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return value='0' validateNumbers(event);' maxlength='5' style='width:60px;'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' style='width:60px;'></label></td> "
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input type='text' value='0' class='form-control input-SmallText'    id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input value='0' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
								+ rowCount
								+ "' style='width:60px;' ></td>"
								+ " </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload","toCreateDivPO");
		//autotaxCode("txtPurchaseQuotationTaxCodePO_" + rowCount, "onload");

	} else {
		$("#ItemInfoTablePO > tbody")
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
								+ "' onkeyup='auto(this.id,onchange,toCreateDivPO)' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"'  ></label></td> "
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
								+ "' onkeypress='return validateNumbers(event);'readonly='' style='width:100px;'></td>"
				/*				+ "<td><select style='width:160px;' class='form-control input-SmallText'  multiple='multiple' onclick='multipletaxCalculation(this.id," + rowCount + ")' onchange ='taxcalculation(this.id," + rowCount + ")' id='txtPurchaseQuotationTaxCodePO_"
								+ rowCount
								+ "'></select></td>"*/
								/*+ " <td><input  style='width:80px;' type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ ")' id='txtPurchaseQuotationTaxAmount_"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'  ></td> "*/
								 +"<td><input type='text' class=' ui-autocomplete-input form-control input-SmallText'  autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
									+ rowCount
									+ "' onkeypress='autotaxfetch(this.id,onchange)'  style='width:80px;'></td>"
									
								+ " <td><input type='text' class=' ui-autocomplete-input form-control input-SmallText'  id='txtPurchaseQuotationTaxAmount_"
								+ rowCount
								+ "' onkeypress='autotaxfetch(this.id,onchange)'  style='width:100px;' autocomplete='off'>"
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
								+ rowCount
								+ "'   readonly='' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:100px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' value='0' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value='0' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;'> <label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  value='0' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value='0' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5'  style='width:60px;'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td> "
								+ " <td><input type='text' class='form-control input-SmallText' value='0'  id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value='0'  id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input value='0' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
								+ rowCount
								+ "' style='width:60px;'></td>"
								+ " </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload","toCreateDivPO");
	//	autotaxCode("txtPurchaseQuotationTaxCodePO_" + rowCount, "onload");
		rowCount++;
	}

}

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
	totalDocDiscountPQ();
	totalDocQtyPQ();
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
}

function fetchDocumentNameListInorder() {

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
			/*$("#selDocName").setTemplate(selInventoryDocumentTemplate);
			$("#selDocName").processTemplate(pobj1);*/

			$("#selDocNamePO").setTemplate(selInventoryDocumentTemplatePO);
			$("#selDocNamePO").processTemplate(pobj1);

		}
	});
}
var selInventoryDocumentTemplate = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
		+ "<option  value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
		+ "{#/for}";

/*var selInventoryDocumentTemplatePO = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
		+"{#if $T.lstDocumentNUmberDto.document_series == 'Purchase Order'}"
		+ "<option id='seriesId'  value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
		+ "{#/for}";*/


var selInventoryDocumentTemplatePO = "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
	+"{#if $T.lstDocumentNUmberDto.document_series == 'Purchase Order'}"
	+ "<option id='seriesId'  value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
	+ "{#/for}";

 

function getSeriesPO(id) {
	var obj = $("#AjaxResopnse").html();
	var txtId = $('#txtPurchaseOrderDocSeries').val();
	objDocument = JSON.parse(obj);

	for ( var i = 0; i < objDocument.lstDocumentNUmberDto.length; i++) {
		if (objDocument.lstDocumentNUmberDto[i].document_numbering_id == id) {
			$("#txtPurchaseOrderDocSeries")
					.val(
							objDocument.lstDocumentNUmberDto[i].document_prefix
									+ objDocument.lstDocumentNUmberDto[i].document_number
									+ txtId
									+ objDocument.lstDocumentNUmberDto[i].document_suffix);
			break;

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
			$("#documentContent").setTemplate(inventoryPurchaseOrderTemp);
			$("#documentContent").processTemplate(pobj1);

			$("#docuemntAjaxResp").html(r);
		}
	});
}

// view and  pending  Quatation Details Author :sudhir  modified Date: 24 nov 2015
function viewPurchaseMasterDetails(partyId) {

	$('#iHidePurOrderBtn').css('display', 'block');
	clearPopUp();

	$("#closeonclick").hide();
	//$("#txtVendorCode").val(partyId);

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
					 // alert(r);
					pobj1 = eval('(' + r + ')');
					//fetchPurchaseQuotationMasterNew();
					srNumber = 1;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchasecommonitemmaster.length; Count++) {
						$("#ItemInfoTablePO > tbody")
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
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_Name
												+ "'  onkeyup = 'auto(this.id,onchange,viewPurchaseMasterDetails)'  /> "
												+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_code
												+ "'/> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_master_id
												+ "'/> </div> </td>"
												+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_doc_Qty
												+ "'  onblur='totalAmount(this.id,"
												+ srNumber
												+ ")' onkeypress='return validateNumbers(event);' > <label id='txtPurchaseQuotationLastFactorUOM"+srNumber+"' class='form-control input-SmallText'  value= '"+pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_item_purchase_last_factor_uom+"'>"+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_item_purchase_last_factor_uom +"</label></td> "
												+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_unit_price
												+ "' onkeypress='return validateNumbers(event);' ></td>"
												+ ""
												+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_discount_per
												+ "' onblur='calculTradeDis(this.id,"
												+ srNumber
												+ ")'  onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_discount_rupess
												+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td>"
												+ "<td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_discount_amount
												+ "' onkeypress='return validateNumbers(event);' ></td>"
												+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationBaseAmount"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_trade_base_amount
												+ "' onkeypress='return validateNumbers(event);' ></td>" +
												"<td><select class='form-control input-SmallText'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCodePO_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_code +"</option>  </select></td> "
												+ "<td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_amount
												+ "' onkeyup='rowAmtCal(this.id,"
												+ srNumber
												+ ")' onkeypress='return validateNumbers(event);' ></td> "
												+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtPurchaseOrderTaxAmtinRs"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_tax_amount_rupess
												+ "' readonly='' ></td>"
												+ "<td><input  readonly='' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_row_amount
												+ "' onkeypress='return validateNumbers(event);' ></td>"
												+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor1
												+ "' onkeypress='return validateNumbers(event);' > <label  id='txtPurchaseQuotationFactor1UOM"+srNumber+"' class='form-control input-SmallText' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_1 +"' >"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_1 +" </label></td> "
												+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor2
												+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor2UOM"+srNumber+"' class='form-control input-SmallText'  value= '"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_2+"'>"+ pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_2 +"</label></td> "
												+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor3
												+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor3UOM"+srNumber+"' class='form-control input-SmallText' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_3+"' >"+ pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_3 +"</label></td>"
												+ " <td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_factor4
												+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor4UOM"+srNumber+"' class='form-control input-SmallText' value='"+pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_4+"'>"+ pobj1.ltinvetorypurchasecommonitemmaster[Count].item_purchase_factor_uom_4 +"</label></td>"
												+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_actural_qty
												+ "' onblur='pendingAmount(this.id,"
												+ srNumber
												+ ")' onkeypress='return validateNumbers(event);' ></td> "
												+ "<td><input type='text' class='form-control input-SmallText'   id='txtPurchaseQuotationPendingQuantity"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_pending_qty
												+ "' onkeypress='return validateNumbers(event);' ></td> "
												+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchasecommonitemmaster[Count].inv_purchase_common_item_batch_No
												+ "' ></td>"
												+ "   </tr>");

						$("#RowCount").val(srNumber);
						srNumber++;
						test++;
					}
					// auto("txtPurchaseQuotationItemName_","onload");
					totalDocQtyPQ();
					totalDocDiscountPQ();
					//var txtEmptyItem = $("#txtEmptyItem").val();
					//auto(txtEmptyItem, "onload");
					toCreateDivPO();
					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				}

			});

	var obj = $("#docuemntAjaxRespforcommanMaster").html();
	objPurchase = JSON.parse(obj);
	var orderObj = "";
	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchasecommonmaster.length; rowCount++) {
		if (objPurchase.ltinvetorypurchasecommonmaster[rowCount].inv_purchase_common_master_doc_no == partyId) {
			//alert(obj);
			orderObj = objPurchase.ltinvetorypurchasecommonmaster[rowCount];
			break;
		}
	}

	var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo").val(
			orderObj.inv_purchase_common_master_doc_no);
	/**********************************date convert***************************************/
	/*var str = (orderObj.inv_purchase_common_master_doc_date).split("-");
	var leaddate = str[2] + "-" + str[1] + "-" + str[0];
	$("#txtPurchaseOrderDatePRL").val(leaddate);*/
	/*var txtPurchaseQuotationDate1 = $("#txtPurchaseOrderDatePRL").val(.inv_purchase_common_master_create_date);*/
	var txtPurchaseQuotationMobileNo = $("#txtPurchaseOrderMobileNo").val(
			orderObj.inv_purchase_common_master_mobile_number);
	var txtPurchaseQuotationSupplierCode = $("#txtVendorCodePO").val(
			orderObj.inv_purchase_common_master_Supplier_Id);
	var txtPurchaseQuotationSupplierName = $("#txtPurchaseOrderSupplierName")
			.val(orderObj.inv_purchase_common_master_Supplier_Name);
	// $("#selDocName").hide();
	// option:selected").text(objPurchase.ltinvetorypurchasecommonmaster[rowCount].);
	/*var txtPurchaseQuotationDocSeries = $("#txtPurchaseOrderDocSeries").val(
			orderObj.inv_purchase_common_master_doc_Series);*/
	//var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;			
	var txtPurchaseQuotationReferenceNo = $("#txtPurchaseOrderReferenceNo")
			.val(orderObj.inv_purchase_common_master_reference_no);
	var txtPurchaseQuotationAddress = $("#txtPurchaseOrderAddress").val(
			orderObj.inv_purchase_common_master_Address);
	/*var sclPurchaseQuotationDocstatus = $(
			"#sclPurchaseOrderDocstatus option:selected").text(
			orderObj.inv_purchase_common_master_status);*/
	var txtPurchaseQuotationTotalDocDiscount = $(
			"#txtPurchaseOrderTotalDocDiscount").val(
			orderObj.inv_purchase_common_master_total_discount);
	var txtPurchaseQuotationTotalDocQty = $("#txtPurchaseOrderTotalDocQty")
			.val(orderObj.inv_purchase_common_master_total_doc_qty);
	var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderRequestNo").val(
			orderObj.inv_purchase_common_master_purchase_Request_No);

	var masterId = $('#txtVendorCodePO').val();
	
	$("#txtSplDisc").val(orderObj.inv_purchase_common_master_special_disc);
	$("#txtdebitAmt1").val(orderObj.inv_purchase_common_master_debit_amt);
	$("#txtCD1").val(orderObj.inv_purchase_common_master_cash_amt_perct);
	$("#txtCDAmt").val(orderObj.inv_purchase_common_master_cash_amt_rupees);
	
	$("#txtOctroi").val(orderObj.inv_purchase_common_master_octroi_amt);
	$("#txtSurcharge").val(orderObj.inv_purchase_common_master_surcharge_amt);
	$("#txtCreditAmt").val(orderObj.inv_purchase_common_master_credit_amt);
	$("#txtFreight").val(orderObj.inv_purchase_common_master_freight_amt);
	
	$("#txtVat").val(orderObj.inv_purchase_common_master_calcuated_vat_amt);
	$("#txtlbt").val(orderObj.inv_purchase_common_master_lbt_amt);
	$("#txtcst").val(orderObj.inv_purchase_common_master_cst_amt);
	$("#txtExVat").val(orderObj.inv_purchase_common_master_ex_vat_amt);
	
	$("#txtTotalVat").val((orderObj.inv_purchase_common_master_calcuated_total_taxes_amt).toFixed(2));
	$("#txtGross").val((orderObj.inv_purchase_common_master_total_base_gross_amt).toFixed(2));
	$("#txtLess").val((orderObj.inv_purchase_common_master_total_less_amt).toFixed(2));
	$("#txtAdd").val((orderObj.inv_purchase_common_master_total_add_amt).toFixed(2));
	
	$("#textVat").val((orderObj.inv_purchase_common_master_final_calcuated_total_taxes_amt).toFixed(2));
	$("#txtNetAmt").val(orderObj.inv_purchase_common_master_final_total_net_amt);


	var selboxChargeswithAmtList = "";
		
	selboxChargeswithAmtList = orderObj.inv_purchase_common_master_special_charges;

		if (selboxChargeswithAmtList == "No" || selboxChargeswithAmtList == null
			|| selboxChargeswithAmtList == '') {
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
		
		
	$("#sumofCharges").val(orderObj.inv_purchase_common_master_sumofspecial_charges.toFixed(2));
	
	
	//alert("Id=" + item.value + " Value=" + item.text);
	//var masterId = item.value;
	// alert("master id on get NEW  order"+masterId);

	fetchPartyMasterContactsDetailsPO(masterId);
	fetchPartyMasterAddressDetailsPO(masterId);
	fecthPartyOtherInfoPO(masterId);
	
	getGeneralInfoIdForPurListPO();
	getAddressInfoIdPurListPO();
	getOtherInfoIdPurListPO();

	getNextOrderId();
	getSeriesPO(($('#seriesId').val()));
}

//featch on view  order master and oder item master details 

function viewPurchaseMasterDetailsOnEdit(partyId) {

	$('#iHidePurOrderBtn').css('display', 'none');
	
	$("#selDocNamePO").text("");
	document.getElementById("selDocNamePO").disabled = true;
	$("#closeonclick").show();
	
	
	clearPopUp();
$("#txtPurchaseOrderDocSeriesIsEdit").val('isEdit');
$("#txtPurchaseOrderSaveOrUpdate").val('Update');

//var masterid = $("#txtVendorCode").val();
//  alert(masterid);
var obj = $("#docuemntAjaxResp").html();
objPurchase = JSON.parse(obj);
var myObj = "";
for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchaseordermaster.length; rowCount++) {
	if (objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_no == partyId) {
		//alert(obj);
		myObj = objPurchase.ltinvetorypurchaseordermaster[rowCount];
		break;
	}
}

/****************************************Date conversion**********************************/
/*var str = (myObj.inv_purchase_order_master_doc_date).split("-");
var leaddate = str[2] + "/" + str[1] + "/" + str[0];*/
$("#txtPurchaseOrderDatePRL").val(myObj.inv_purchase_order_master_doc_date);


var txtPurchaseOrderDocNoPRl = $("#txtPurchaseOrderDocNoPRl").val(
		myObj.inv_purchase_order_master_doc_no);
var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo").val(
		myObj.inv_purchase_order_master_purchase_quotation_No_fk);

/*var txtPurchaseQuotationDate1 = $("#txtPurchaseOrderDatePRL").val(
		myObj.inv_purchase_order_master_doc_date);*/

var txtPurchaseQuotationMobileNo = $("#txtPurchaseOrderMobileNo").val(
		myObj.inv_purchase_order_master_mobile_number);
var txtPurchaseQuotationSupplierCode = $("#txtVendorCodePO").val(
		myObj.inv_purchase_order_master_Supplier_Id);
//	alert("vendor id"+txtPurchaseQuotationSupplierCode);
var txtPurchaseQuotationSupplierName = $("#txtPurchaseOrderSupplierName")
		.val(myObj.inv_purchase_order_master_Supplier_Name);
// $("#selDocName").hide();
// option:selected").text(objPurchase.ltinvetorypurchasecommonmaster[rowCount].);
var txtPurchaseQuotationDocSeries = $("#txtPurchaseOrderDocSeries").val(
		myObj.inv_purchase_order_master_doc_Series);
//var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;			
var txtPurchaseQuotationReferenceNo = $("#txtPurchaseOrderReferenceNo")
		.val(myObj.inv_purchase_order_master_reference_no);
var txtPurchaseQuotationAddress = $("#txtPurchaseOrderAddress").val(
		myObj.inv_purchase_order_master_Address);
var sclPurchaseQuotationDocstatus = $(
		"#sclPurchaseOrderDocstatus option:selected").text(
		myObj.inv_purchase_order_master_status);
var txtPurchaseQuotationTotalDocDiscount = $(
		"#txtPurchaseOrderTotalDocDiscount").val(
		myObj.inv_purchase_order_master_total_discount);

var txtPurchaseQuotationTotalDocQty = $("#txtPurchaseOrderTotalDocQty")
		.val(myObj.inv_purchase_order_master_total_doc_qty);

var txtPurchaseOrderRequestNo = $("#txtPurchaseOrderRequestNo").val(
		myObj.inv_purchase_order_master_purchase_Request_No);
var txtPurchaseOrderDeliveryDate = $("#txtPurchaseOrderDeliveryDate").val(myObj.inv_purchase_order_master_Delivery_Date);

var masterID = $("#txtVendorCodePO").val();
var orderId = $("#txtPurchaseOrderDocNoPRl").val();



$("#txtSplDisc").val(myObj.inv_purchase_order_master_special_disc);
$("#txtdebitAmt1").val(myObj.inv_purchase_order_master_debit_amt);
$("#txtCD1").val(myObj.inv_purchase_order_master_cash_amt_perct);
$("#txtCDAmt").val(myObj.inv_purchase_order_master_cash_amt_rupees);

$("#txtOctroi").val(myObj.inv_purchase_order_master_octroi_amt);
$("#txtSurcharge").val(myObj.inv_purchase_order_master_surcharge_amt);
$("#txtCreditAmt").val(myObj.inv_purchase_order_master_credit_amt);
$("#txtFreight").val(myObj.inv_purchase_order_master_freight_amt);

$("#txtVat").val(myObj.inv_purchase_order_master_calcuated_vat_amt);
$("#txtlbt").val(myObj.inv_purchase_order_master_lbt_amt);
$("#txtcst").val(myObj.inv_purchase_order_master_cst_amt);
$("#txtExVat").val(myObj.inv_purchase_order_master_ex_vat_amt);

$("#txtTotalVat").val((myObj.inv_purchase_order_master_calcuated_total_taxes_amt).toFixed(2));
$("#txtGross").val((myObj.inv_purchase_order_master_total_base_gross_amt).toFixed(2));
$("#txtLess").val((myObj.inv_purchase_order_master_total_less_amt).toFixed(2));
$("#txtAdd").val((myObj.inv_purchase_order_master_total_add_amt).toFixed(2));

$("#textVat").val((myObj.inv_purchase_order_master_final_calcuated_total_taxes_amt).toFixed(2));
$("#txtNetAmt").val(myObj.inv_purchase_order_master_final_total_net_amt);


var selboxChargeswithAmtList = myObj.inv_purchase_order_master_special_charges;

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
//add by paras for edit supplier state	 
if(myObj.inv_SupplierState == 0 || myObj.inv_SupplierState ==null || myObj.inv_SupplierState==undefined ){
	 
}else{
	 $("#hoseditState").val(myObj.inv_SupplierState);
}
//end	
$("#sumofCharges").val(myObj.inv_purchase_order_master_sumofspecial_charges.toFixed(2));



//alert("Id=" + item.value + " Value=" + item.text);
//var masterID = item.value;
//alert("master id in view===:" +masterID);
fetchhospitalstate();
fetchPartyMasterContactsDetailsPO(masterID);
fetchPartyMasterAddressDetailsPO(masterID);
fecthPartyOtherInfoPO(masterID);
fetchtermsandconditionsDetailsforOrder(orderId);

	var inputs = [];
	inputs.push('action=fetchPurchaseOrderItemMasterDetail');
	inputs.push('isEdit=plainpo');
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
					state = myObj.inv_SupplierState;
					srNumber = 1;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
						$("#ItemInfoTablePO > tbody")
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
												+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left;width:250px;'  readonly=''  class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
												+ srNumber
												+ "'  value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_Name
												+ "'  onkeyup = 'auto(this.id,onchange,plain)' onkeypress='return validateOnlyName(event);' /> "
												+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
												+ srNumber
												+ "' value='0'/> "
												
												+ "<input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
												+ srNumber
												+ "' value='0'/>"
												//+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_master_id
												+ " </div> </td>"
												+ "<td><input type='text' style='width:60px;'class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_doc_Qty
												+ "'  onkeyup='totalAmount(this.id,"+ srNumber+ ")' onkeyup = 'fetchItemFactors(this.id,"+ srNumber+ ")' onkeypress='return validateNumbers(event);'> <lable  id ='txtPurchaseQuotationLastFactorUOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_last_factor_uom +" </label></td> "
												+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_unit_price
												+ "' onkeypress='return validateNumbers(event);' ></td>"
												+ ""
												+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_per
												+ "' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")'  onblur='calculTradeDis(this.id,"
												+ srNumber
												+ ")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_rupess
												+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td>"
												+ " <td><input readonly='' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_discount_amount
												+ "' onkeypress='return validateNumbers(event);' ></td>"
												+ "<td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_trade_base_amount
												+ "' onkeypress='return validateNumbers(event);' ></td> "
												/*+ "<td><select style='width:160px;'class='form-control input-SmallText'  multiple='multiple' onchange ='taxcalculation(this.id," + srNumber + ")' id='txtPurchaseQuotationTaxCodePO_"+srNumber+ "' > <option selected=selected >" + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_code + "</option>  </select></td>"
												+ " <td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
												+ "' onkeyup='rowAmtCal(this.id,"
												+ srNumber
												+ ")' onkeypress='return validateNumbers(event);' ></td> "*/
												+"<td><input type='text' class='ui-autocomplete-input form-control input-SmallText'  autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
												+ srNumber
												+ "' onkeypress='autotaxfetch(this.id,onchange)'  style='width:80px;' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
												+ "'></td>"
												+ " <td><input type='text' class='ui-autocomplete-input form-control input-SmallText' onkeyup='rowAmtCalNEW(this.id,"
												+ srNumber
												+ ")' onkeypress='autotaxfetch(this.id,onchange)'  id='txtPurchaseQuotationTaxAmount_"
												+ srNumber
												+ "'   style='width:80px;'  autocomplete='off' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount
												+ "'></td> "
												+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtPurchaseOrderTaxAmtinRs"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_tax_amount_rupess
												+ "' readonly='' ></td>"
												+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationRowAmount"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_row_amount
												+ "'></td>"
												+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor1
												+ "' onkeypress='return validateNumbers(event);' ><lable id ='txtPurchaseQuotationFactor1UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_1 +" </label></td> "
												+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor2
												+ "' onkeypress='return validateNumbers(event);'> <lable  id ='txtPurchaseQuotationFactor2UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_2 +" </label> </td> "
												+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor3
												+ "' onkeypress='return validateNumbers(event);'> <lable  id ='txtPurchaseQuotationFactor3UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_3 +" </label></td> "
												+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_factor4
												+ "' onkeypress='return validateNumbers(event);'><lable  id ='txtPurchaseQuotationFactor4UOM"+srNumber+"' value='"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4+"' >"+pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_item_purchase_factor_uom_4 +" </label></td> "
												+ "   <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
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
												+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
												+ srNumber
												+ "' value='"
												+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_purchase_order_item_batch_No
												+ "'  ></td>"
												+ "  </tr>");
						   hostate = $("#hosState").val();
							 if(state == hostate)
							{
							
								$("#txtPurchaseQuotationTaxAmount_"+srNumber).hide();
								
								//totalAmount();
							}else{
								$("#txtPurchaseQuotationTaxCodePO_"+srNumber).hide();
							//	$("#txtPurchaseQuotationTaxCodePO_"+srNumber).val("0.0");
								
								
							
								}

						$("#RowCount").val(srNumber);
						srNumber++;
						test++;
					}
					// auto("txtPurchaseQuotationItemName_","onload");
					totalDocQtyPQ();
					totalDocDiscountPQ();
					toCreateDivPO();
					//var txtEmptyItem = $("#txtPurchaseOrderSupplierName").val();
					//auto(txtEmptyItem, "onload");

					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				}

			});

	$("#divtxtPurchaseQuotationList").hide();


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
	var currentuserName = $("#currentuserName").val();
	var currentUserID = $("#currentUserID").val();
	var didConfirm = confirm("Are you sure to delete record ?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePurchaseOrderDetail');
		inputs.push('id=' + id);
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
				alert(r);
				fetchPurchaseOrderMasterNew();
			}
		});
	}
}

var SrNo = 1; 

var inventoryPurchaseOrderTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
		+ "<thead class='cf' style='background: white;'><tr>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Order Id</div></th><th style='height: 21.5px;' class='col-md-5-1 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th></tr> </thead>"
		+ "{#foreach $T.ltinvetorypurchaseordermaster as ltinvetorypurchaseordermaster}<tr class='center'>"
		+ "{#if $T.ltinvetorypurchaseordermaster.inv_purchase_order_master_form_Name == 'PURCHASE ORDER' && $T.ltinvetorypurchaseordermaster.inv_purchase_order_palinpo == 'Y' }<td>{SrNo++}</td><td id='id{$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_doc_no}'>{$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_doc_no}</td><td id='desc{$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_doc_no}'>{$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_Supplier_Name}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success'  data-toggle='modal' data-target='#Purchase_Order_Form' onclick=\"viewPurchaseMasterDetailsOnEdit({$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_doc_no})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deletePurchaseMasterDetails({$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_doc_no})\"><i class='fa fa-trash-o'></i></button></td><td><button id='btnEdit2' class='btn btn-xs btn-success'  data-toggle='modal'   onclick=\"printPurchaseMasterDetailsOnEdit({$T.ltinvetorypurchaseordermaster.inv_purchase_order_master_doc_no})\" value='EDIT'><i class='fa fa-print'></i></button></td></tr>{#/if}{#/for}</table>";

function refresh() {
	window.location.reload("inventory_Purchase_Order.jsp");
}

function printPurchaseMasterDetailsOnEdit(partyId) {
	
	$("#purchaseorderprint").show();
	$("#purOrderPrintId").val(partyId);
	/*var obj = $("#docuemntAjaxResp").html();
	objPurchase = JSON.parse(obj);
	var myObj = "";
	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchaseordermaster.length; rowCount++) {
		if (objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_no == partyId) {
			//alert(obj);
			myObj = objPurchase.ltinvetorypurchaseordermaster[rowCount];
			break;
		}
	}

	$("#txtVendorCodePO").val(myObj.inv_purchase_order_master_Supplier_Id);

	$("#txtPurchaseOrderDocSeries").val(
			myObj.inv_purchase_order_master_doc_Series);
	$("#txtPurchaseOrderDeliveryDate").val(myObj.inv_purchase_order_master_Delivery_Date);
	var txtPurchaseOrderDocSeries = $("#txtPurchaseOrderDocSeries").val();

	var txtPurchaseOrderSupplierCode = $("#txtVendorCodePO").val();
	var txtPurchaseOrderDeliveryDate =$("#txtPurchaseOrderDeliveryDate").val();
	 
	window.open("Inventory_purchase_order_print.jsp?txtPurchaseOrderSupplierCode="
					+ txtPurchaseOrderSupplierCode
					+ "&partyId="
					+ partyId
					+ "&txtPurchaseOrderDocSeries=" + txtPurchaseOrderDocSeries+"&txtPurchaseOrderDeliveryDate="+txtPurchaseOrderDeliveryDate);*/
}

function refreshPopUp() {
	$('#Sales_Quotation_Form').find('input:text').val('');
	$('#Sales_Quotation_Form').find('textarea').val('');
	//getNextQuotationId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	window.location.reload("inventory_Purchase_Order.jsp");

}

function clearPopUp() {
	$('#Purchase_Order_Form').find('input:text').val('');
	$('#Purchase_Order_Form').find('textarea').val('');
	//	getNextQuotationId();
	$("#ItemInfoTablePO > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	isNew = 1;
	test = 1;
	rowCount = 1;
}

function clearpopupAddnewPO() {
	$('#Purchase_Order_Form').find('input:text').val('');
	$('#Purchase_Order_Form').find('textarea').val('');
	$('#Purchase_Order_Form').find('input:hidden').val('');
	$("#ItemInfoTablePO > tbody").html('');
	$('#ItemInfoTablePO').find('input:text').val('');
	$("#ItemInfoTablePO > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');

	$("#txtPurchaseOrderRequestNo").val(0);
	$("#txtPurchaseOrderQuatationNo").val(0);
	$("#txtPurchaseOrderTotalDocQty").val(0);
	getNextOrderId();
	isNew = 0;
	rowCount = 1;

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
	$("#txtPurchaseOrderTotalDocDiscount").val(0);
	//getNextQuotationId();
	
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
    $("#txtPurchaseOrderDatePRL").val(today1);
    $("#txtPurchaseOrderDeliveryDate").val(today1);
}

function getPendingQuotaion() {
	var inputs = [];
	inputs.push('action=getPendingQuotation');
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
			$("#txtPurchaseQuotationList").setTemplate(
					selInventoryPendingQuotation);
			$("#txtPurchaseQuotationList").processTemplate(pobj1);
		}
	});
}

var selInventoryPendingQuotation = "<option value='Select'>-Select-</option>"
		+ "{#foreach $T.ltinvetorypurchasecommonmaster as ltinvetorypurchasecommonmaster}"

		+ "{#if $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_form_Name == 'PURCHASE QUOTATION' && $T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_order_place_flag !='1'}"
		+ "<option  value='{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_no}'>{$T.ltinvetorypurchasecommonmaster.inv_purchase_common_master_doc_Series}</option>"
		+ "{#/if}{#/for}";

/**PQ***function factoring *@author husenbadshah**@since 3/3/2016****/
function calculateFactoring(qty,rowCountPO,Type)
{/*
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
						 //$('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val(parseFloat(newUnitPrice));
						 
						 $('#txtPurchaseQuotationFactor1PO' + rowCountPO).val(qty);
						 $('#txtPurchaseQuotationFactor2PO' + rowCountPO).val(factQty22);
						 $('#txtPurchaseQuotationFactor3PO' + rowCountPO).val(factQty33);
						 $('#txtPurchaseQuotationFactor4PO' + rowCountPO).val(factQty44);
					}
				  else if(Type == "PurchaseQuotation")
					  {
					    // var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val() ;
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
					     
					     //var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val();
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
							// $('#txtPurchaseQuotationUnitPricePO' + rowCountPO).val(parseFloat(newUnitPrice));
								 
							 var fact3QTY = ((qty) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3)) / factQty44;
							 $('#txtPurchaseQuotationFactor3PO' + rowCountPO).val(parseFloat(fact3QTY).toFixed(2));
							 
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
						     
							 //var unitPrice = $("#hiddenfactorPrice").val() / $("#hiddenfactorQTY").val() ;
							// var newUnitPrice = (qty) * (unitPrice); 
							// $('#txtPurchaseQuotationUnitPrice' + rowCountPO).val(parseFloat(newUnitPrice));
								 
							 var fact3QTY = ((qty) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor3)) / factQty44;
							 $('#txtPurchaseQuotationFactor3' + rowCountPO).val(parseFloat(fact3QTY));
							 
							 var fact2QTY = ((fact3QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor2)) / factQty33;
							 $('#txtPurchaseQuotationFactor2' + rowCountPO).val(parseFloat(fact2QTY));
							 
							 var fact1QTY = ((fact2QTY) * (ParsedOBJ.inventoryitempurchaseandItemMasterDTOs[0].item_purchase_uom_factor1)) / factQty22;
							 $('#txtPurchaseQuotationFactor1' + rowCountPO).val(parseFloat(fact1QTY));
							  
							 $('#txtPurchaseQuotationFactor4' + rowCountPO).val(qty);	
					
						  }
			 }
        } 

*/}

function totalAmount(id, rowCount) {
	// alert(id);
	var quantity = $('#' + id).val();
	/**PQ***call factoring *@author husenbadshah**@since 3/3/2016****/
	var PQ ="PurchaseQuotation";
	calculateFactoring(quantity,rowCount,PQ);
	
	var rate = $('#txtPurchaseQuotationUnitPrice' + rowCount).val();

	$('#txtPurchaseQuotationActualQuantity' + rowCount).val(quantity);
	$('#txtPurchaseQuotationPendingQuantity' + rowCount).val(quantity);
	$('#txtPurchaseQuotationBaseAmount' + rowCount).val(quantity * rate);
	//tk
	//$('#txtPurchaseQuotationDocQuantity' + rowCount).val(1);
/*	$('#txtPurchaseQuotationUnitPrice' + rowCount).val(0);
	$('#txtPurchaseQuotationTrdeDiscountPercentage' + rowCount).val(0);
	$('#txtPurchaseQuotationTrdeDiscountInRupess' + rowCount).val(0);
	$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val(0);
	$('#txtPurchaseQuotationTaxAmount' + rowCount).val(0);
	$('#txtPurchaseOrderTaxAmtinRs' + rowCount).val(0);
	$('#txtPurchaseQuotationRowAmount' + rowCount).val(0);
	$('#txtPurchaseQuotationFactor1' + rowCount).val(0);
	$('#txtPurchaseQuotationFactor2' + rowCount).val(0);
	$('#txtPurchaseQuotationFactor3' + rowCount).val(0);
	$('#txtPurchaseQuotationFactor4' + rowCount).val(0);*/
	//toCreateDivPO();
	//tk
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

	$("#txtPurchaseOrderTotalDocQty").val(sum);
	totalGrossAmt(1,rowCount);
}

/********** Calculate treade discount AMt modified  Author :sudhir Date:14:12:2015 ******************/

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
		
		 
		var oldTotaldiscount = $("#txtPurchaseOrderTotalDocDiscount").val();
		
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
		
		
		$("#txtPurchaseOrderTotalDocDiscount").val(FinaltradeDiscount);
		
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

		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(baseAmt);
	}
}*/
/******************** Calculate RAW AmT *******************/

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
		$('#txtPurchaseOrderTaxAmtinRs'+ rowCount).val(finalcaltaxanmount); //add tax amount in Rs @author:paras @Date:23nov 
		 
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
/************TOTAOL DOC QTy *************/
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

	$("#txtPurchaseOrderTotalDocDiscount").val(sum);
	$("#RowCount").val(RowCount);

}

/***************** Auto suggetion for purchase order supplyer ************/

function setVendorNamesPO(inputID, type) {

	var resultData = [];

	var txtVal = $('#' + inputID).val();
	if ((type == "onload") || (txtVal != null && txtVal != "")) {

		//alert(inputID + " " + type);

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
							alert("NO MATCHING FOUND Please enter valid Supplier Name");
							
							$("#txtPurchaseOrderSupplierName").val('');
							$("#txtPurchaseOrderSupplierName").focus();
							/*$("#txtPurchaseOrderMobileNo").val('');
							$("#txtPurchaseOrderAddress").val('');
							*/

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
			//alert("your vendor id is" +masterID);
			$('#txtVendorCodePO').val(masterID);
			getGeneralInfoIdForPurListPO();
			getAddressInfoIdPurListPO();
			getOtherInfoIdPurListPO();
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
			alert("error");
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

/** ******* AutoSuggestion Code for item in purchase order ********** */

function auto(inputID, typeauto,callFrom) {/*

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
					  //alert(r.length);
						var availableTags = [];
						if (r.length == 32) {
							//alert("NO MATCHING FOUND Please Enter Valid Item Name");
							var arrValue1 = (inputID).split("_");
							var idValue1 = (arrValue1[1]);
							//$("#txtPurchaseQuotationItemName_"+idValue1).val('');
							//$("#txtPurchaseQuotationItemName_"+idValue1).focus();

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

			//alert((item.text).trim() + " : " + (item.value).trim());
			
			$("#ItemInfoTablePO input[type=checkbox]").each(function(){

				  $(this).prop("checked",false);
				});
			
			toCreateDivPO();

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
			docuemntAjaxResp
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
							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								// alert(ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_Supplier_Name+"_"+ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_doc_no);
								$('#txtPurchaseQuotationUnitPrice' + idValue)
										.val(
												ajaxResponse.ltInventoryItemMasterDTOs[i].item_purchase_unit_price);
								$('#txtPurchaseQuotationDocQuantity' + idValue)
								.val(
										ajaxResponse.ltInventoryItemMasterDTOs[i].order_stock);
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
								$('#txtPurchaseQuotationDocQuantity' + idValue)

								totalAmount();
							}
						}
					});
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
						
						$('#txtPurchaseQuotationLastFactorUOM' +idValue).text(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenLastUOM);
						
								$('#txtPurchaseQuotationDocQuantity' + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);
								
								$('#txtPurchaseQuotationPendingQuantity' + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);
								
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
								$("#txtPurchaseQuotationTaxCodePO_"+idValue).append(option);
									}
								totalAmount();
								$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
								break;

							}
						}
					});

		}
	}
*/
	
var moduleINV =$("#moduleINV").val();
if(moduleINV=="Expense"){
	fetchexpenseitem(inputID, typeauto,callFrom);
}else{
	if(typeauto !="onload"){
	 var  txtPurchaseOrderSupplierName =$("#txtPurchaseOrderSupplierName").val();
	 var  txtSupplierState =$("#txtSupplierState").val();
	 if(txtPurchaseOrderSupplierName ==null || txtPurchaseOrderSupplierName==""){
		 if(txtSupplierState ==null || txtSupplierState=="" || txtSupplierState==0){
			 alert("Please Select Supplier Name And Supplier State!!");
			 $('#' + inputID).val("");
			 return false;
		 }
		 alert("Please Select Supplier Name And Supplier State!!");
		 return false;
	 }	
		var state = $("#txtSupplierState").val();//added by paras for igst 
		var hostate = $("#hosState").val();
		var arrValue = (inputID).split("_");
		var idValue = (arrValue[1]);
		if(state ==hostate || state == hostate || state == hostate)
		{
    	$("#txtPurchaseQuotationTaxAmount_"+idValue).val("0.0").hide();
		}else{
			
			$("#txtPurchaseQuotationTaxCodePO_"+idValue).val("0.0").hide();
			
			}
		var rc =rowCount-1;
		if(rc == idValue){
			$("#ItemInfoTablePO input[type=checkbox]").each(function(){

				  $(this).prop("checked",false);
				});
			toCreateDivPO();
		}
   }
 }
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
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			$("#txtPurchaseOrderDocNoPRl").val(r);
		}
	});
}

/******************************************************Search purchase order by Vendor id*********************************************/

function fetchPurchaeseOrderforSearch(mrnId) {

var byVendorName = $("#byVendorName").val();
	
	if((mrnId == "")&&(byVendorName == ""))
	{
		alert("Please Enter Either Order Id or Vendor Name for search");
		return false;
	}	
	
	var inputs = [];
	inputs.push('action=fetchPurchaseOrderMasterDetail');
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
			objMRN = JSON.parse(r);
			SrNo = 1;
			if (objMRN.ltinvetorypurchaseordermaster.length > 0) {

				$("#documentContent").setTemplate(inventoryPurchaseOrderTemp);
				$("#documentContent").processTemplate(pobj1);

				//	$("#docuemntAjaxResp").html(r);

			} else {
				alert("Record not found..!");
				fetchPurchaseOrderMasterNew();
			}
			$('#byMrnId').val("");
			$('#byVendorName').val("");
			

		}
	});
}

/***********************************************new purchase commannMaster Details from Quatation**********************************************************/

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

			//$("#documentContentforcommanMaster").setTemplate(inventoryPurchaseQuotationTemp);
			$("#documentContentforcommanMaster").processTemplate(pobj1);

			$("#docuemntAjaxRespforcommanMaster").html(r);
		}
	});
}

/******************************************************new party master**added in purchase order jsp************************************************husen**/
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
	var str = (myobj.party_contact_info_dob).split("-");
	var bdate = str[2] + "-" + str[1] + "-" + str[0];
	$("#txtdate").val(bdate);

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
	var str="";
	if(myobj.party_contact_info_dob == "0000-00-00")
		{
		 str="";
		 $("#txtdatePO").val(str);
		
		}
	else
		{
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

/*
if(txtadraddress != "")
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


if(txtstreet !=""||txtstreet !=null)
	{
	var pattern = /^([a-zA-Z0-9]+\s?)*$/;
	if (!pattern.test(txtstreet)) {
		alert("Street should be of alphabets and digits only with a single space allowed..!");
		$("#txtstreetPO").focus();
		return false;
	  }		
	
	}

if(txtarea !=""||txtarea !=null)
{
var pattern = /^([a-zA-Z0-9]+\s?)*$/;
if (!pattern.test(txtarea)) {
	alert("Area should be of alphabets and digits only with a single space allowed..!");
	$("#txtareaPO").focus();
	return false;
  }		

}
if(txtaddrcountry !=""||txtaddrcountry !=null)
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
			$("#AddressInfoTablePO").setTemplate(
					inventoryPartyAddressInfoTempPO);
			$("#AddressInfoTablePO").processTemplate(pobj1);
			$("#PartyAddressTableInfoListPO").html(r);
			
			
			/*********************************************** featch address and mobile no for suppler name In purchase quatation  Date:24/6/2015 Author :sudhir ***********************************/
			var obj = $("#PartyAddressTableInfoListPO").html();
			var objPurchase = JSON.parse(obj);
			for(var row =0 ;row < objPurchase.ltinventorypartymasteraddressinfodto.length;row ++  )
			{
			$("#txtPurchaseOrderAddress").val(objPurchase.ltinventorypartymasteraddressinfodto[row].party_master_address_info_address);
			break;
			}
			/***********************************************  End featch address and mobile no for suppler name Date:24/6/2015 Author :sudhir ***********************************/
			fetchStateListForRegInvPO(objPurchase);
			
		}
	});
}

function EditpartyAddressdetailsPO(id) {
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



/************************** Featch taxcode By Autosuggetion  for purchase order Author :sudhir Date:1-7-2015***************** */


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
						if (r.length == 25) {
							alert("NO MATCHING FOUND Please Enter Valid Tax Code");
							var arrValue1 = (inputID).split("_");
							var idValue1 = (arrValue1[1]);
							$("#txtPurchaseQuotationTaxCodePO_"+idValue1).val('');
							$("#txtPurchaseQuotationTaxCodePO_"+idValue1).focus();
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
			 fetchexpensedetail("byname");
			
			 
		}
	}
}


/* ************************************** Fetch terms and condition  Details Author :sudhir Date:27/10/2015 *************************************/
function fetchtermsandconditionsDetailsforOrder(orderId) {
		var inputs = [];
		inputs.push('action=fetchtermsandconditionsDetailsforOrder');
		inputs.push('orderId='+orderId);
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
				$("#txtPurchaseQuotationNotes2").val(objPurchase.ltinvetorypurchaseordermaster[0].inv_purchase_order_terms_and_condition_master_termsandcondition);
				
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
		 $("#txtPurchaseQuotationRowAmount"+rowcount).val(' ');
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
		 $("#txtPurchaseQuotationRowAmount"+rowcount).val(' ');
			$("#txtPurchaseOrderTotalDocDiscount").val('0');
		
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
		
		
		$("#txtPurchaseOrderTotalDocDiscount").val(FinaltradeDiscount);
		
	}
	/*}*/
	/*rowAmtCal(1,rowCount);
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);*/
	/*rowCount(1,rowCount);*/
}





/******************** taxcalculation author:sudhir Date:11:12:2012 **********************/

function taxcalculation(id ,rowCount){
	var taxcodeandrate = $("#txtPurchaseQuotationTaxCodePO_"+rowCount).val();
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


/********************** multipletaxCalculation Author sudhir Date:11/1/2016 for Purchase Order *****************/
function multipletaxCalculation(id ,rowCount)
{
	var txtPurchaseQuotationTaxCode_ = "";
	$('#txtPurchaseQuotationTaxCodePO_'+ rowCount).find('option').each(function() {
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
	/*return false;*/
	 
	/*var txtPurchaseQuotationTaxCode1_ = "";
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
	rowAmtCal(1,rowCount);*/
	
}


/**
 * ************************************select * Tax code and tax rate for purchase Order *********Author:Sudhir Date:11:jan:2016 ******************************************
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




/**
 *** Fetch taxcode By Autosuggetion for PURCHASE ORDER  * Author :sudhir Date:11:JAN:2016*****************
 */
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
						var moduleINV =$("#moduleINV").val();
						if(moduleINV=="Expense"){
							applyTaxforItemexpense(inputID);
						}
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
			var moduleINV =$("#moduleINV").val();
			if(moduleINV=="Expense"){
				applyTaxforItemexpense(inputID);
			}
		}
	}
}


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
	$('#lstBoxforTax').html();
	$("#ApplyTaxforItem").hide('hide');
	rowAmtCal(1,rowCount);
	totalVatAmt(1,rowCount);
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

 function  hideApplyTaxpopaup() {
	 $('#lstBoxforTax').html();
	 $("#ApplyTaxforItem").hide('hide');
	 $("#txtNew").val('');
	 
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
 
 
 /***** Calculate Total Vat AMt  @Author Sudhir @Date:7june2016*******/
 function totalVatAmt(id, rowCount) {
 	 
	 	var sum = 0;
		var baseAmount;
		var RowCount = $("#RowCount").val();
		var caltaxonBaseAmt;
		// var totalRow = $("#totalRow").val();
		var totaltblsize = $("#totaltblsize").val();
		for ( var i = 1; i <= totaltblsize; i++) {
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
 
 
 
 /****showChargesdiv Author Sudhir jadhav @Date 12jully2016****/
 function showChargesdiv() {
	 $("#ApplyChargesforItem").show('show');
	 fetchChargesDetail();
} 
 
 /**** hideApplyChargespopaup for item in purchase Quaotation Author:sudhir  @Date 12jully2016****/
 function  hideApplyChargespopaup() {
	 $('#lstBoxforCharges').html();
	 $("#ApplyChargesforItem").hide('hide');	
	 $("#txtChargesAmt").val('');
	}
 /********************************* End hideApplyTaxpopaup for item in purchase Quaotation Author:sudhir  @Date 12jully2016 *****************************/
 
 /***fetchChargesDetail for select Box Setting values  @Author Sudhir jadhav @Date : 12jully2016***/
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
 /***templet for set charges Name to select box @Author sudhir @Data :12jully2016*/
 var selInventoryChargesDetails= "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.CategoryDTO as CategoryDTO}"
	+ "<option  value='{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryName}</option>"
	+ "{#/for}";
 /*** End templet for set charges Name to select box @Author sudhir @Data :12jully2016*/
 
 
 /**** Adding charges to list @Author Sudhir @Date 12jully2016 ***/  
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
 
 
 /******** remove Item Charges from list purchase Order ****Author:Sudhir Date:12jully2016 ****/
 function removeItemCharges() {

 	$('#lstBoxforCharges option:selected').remove();
 }
 /******** End remove Item Charges from list purchase Order ****Author:Sudhir Date:12jully2016 ****/
 
 
 /****** * apply Charges for Item in purchase Order Author:sudhir Date:12jully2016  ****/
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
 	
 	/*rowAmtCal(1,rowCount);
 	totalVatAmt(1,rowCount);*/
 	
 }
 /*** *** End applyChargesforItem  in purchase Order Author:sudhir Date:8:jully:2016  ***** **/ 
 
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
 
/* add terms and Condition @Date :09/08/2016  @Author Sudhir jadhav ***/
/* function addtermsandCondition(Id) {
	 
	 var didConfirm = confirm("Are you sure to Add terms and conditions ?");
		if (didConfirm) {
		var obj = $("#termsandConditionsDetailsAjaxResp").html();
		objtermsandCondition = JSON.parse(obj);
		for ( var i = 0; i < objtermsandCondition.ltinvHospitalDetailDTOs.length; i++) {
			if (objtermsandCondition.ltinvHospitalDetailDTOs[i].idinvhospitaldetails == Id) {
				
				encodeURIComponent($.trim($("#txtPurchaseQuotationNotes2").val(objtermsandCondition.ltinvHospitalDetailDTOs[i].termsAndCondition)));
				break;
			}
		}
 }
		else{
			//$("#txtPurchaseQuotationNotes2").val("");
			
		}
 
 
}*/
 
 
 
 
 
 
 /* add terms and Condition @Date :09/08/2016  @Author Sudhir jadhav  modified Date 1Sep2016 @Author Sudhir jadhav ***/
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
 
//*multiplepurOrderPrint Author Vinod @Date 14/09/2016 */

 function printPurchaseOrderVendorsWise() {
 	var purOrderPrintId = $("#purOrderPrintId").val();
 	
 	// alert(purOrderPrintId);
 	var obj = $("#docuemntAjaxResp").html();
 	objPurchase = JSON.parse(obj);
 	var myObj = "";
 	for ( var rowCount = 0; rowCount < objPurchase.ltinvetorypurchaseordermaster.length; rowCount++) {
 		if (objPurchase.ltinvetorypurchaseordermaster[rowCount].inv_purchase_order_master_doc_no == purOrderPrintId) {
 			// alert(obj);
 			myObj = objPurchase.ltinvetorypurchaseordermaster[rowCount];
 			break;
 		}
 	}

 	$("#txtVendorCodePO").val(myObj.inv_purchase_order_master_Supplier_Id);

 	$("#txtPurchaseOrderDocSeries").val(
 			myObj.inv_purchase_order_master_doc_Series);
 	$("#txtPurchaseOrderDeliveryDate").val(
 			myObj.inv_purchase_order_master_Delivery_Date);
 	var txtPurchaseOrderDocSeries = $("#txtPurchaseOrderDocSeries").val();

 	var txtPurchaseOrderSupplierCode = $("#txtVendorCodePO").val();
 	var txtPurchaseOrderDeliveryDate = $("#txtPurchaseOrderDeliveryDate").val();
 	var txtPurchaseOrderQuatationNo = myObj.inv_purchase_order_master_purchase_quotation_No_fk;
 	var purOrderDate = myObj.inv_purchase_order_master_doc_date;
 	 
 	
 	if (parseInt(txtPurchaseOrderQuatationNo) == 0
 			|| txtPurchaseOrderQuatationNo == null) {
 		txtPurchaseOrderQuatationNo = "-";
 	}

 	/*
 	 * var $radios = $('input:checkbox[name=supplierscopy]'); if
 	 * ($radios.is(':checked') == true) { //alert("supplierscopy"); }
 	 */

 	var $supplierscopy = $('input:checkbox[name=supplierscopy]');
 	var $purchasercopy = $('input:checkbox[name=purchasercopy]');
 	var $receiptcopy = $('input:checkbox[name=receiptcopy]');
 	var $accountscopy = $('input:checkbox[name=accountscopy]');
 	var $indentorscopy = $('input:checkbox[name=indentorscopy]');
 	var $mastercopy = $('input:checkbox[name=mastercopy]');

 	var str = "";

 	if ($supplierscopy.is(':checked') == true) {
 		str = "supplierscopy";
 	} else if ($purchasercopy.is(':checked') == true) {
 		str = str + " purchasercopy";
 	} else if ($receiptcopy.is(':checked') == true) {
 		str = str + " receiptcopy";
 	} else if ($accountscopy.is(':checked') == true) {
 		str = str + " accountscopy ";
 	} else if ($indentorscopy.is(':checked') == true) {
 		str = str + " indentorscopy";
 	} else if ($mastercopy.is(':checked') == true) {
 		str = str + " mastercopy";
 	} else {
 		alert("Please select at least one purchase order print copy...");
 	}

 	if ($supplierscopy.is(':checked') == true) {
 		window
 				.open("Inventory_purchase_order_print.jsp?txtPurchaseOrderSupplierCode="
 						+ txtPurchaseOrderSupplierCode
 						+ "&partyId="
 						+ purOrderPrintId
 						+ "&txtPurchaseOrderDocSeries="
 						+ txtPurchaseOrderDocSeries
 						+ "&txtPurchaseOrderDeliveryDate="
 						+ txtPurchaseOrderDeliveryDate
 						+ "&purchaseCopy=Suppliers Copy&purchaseOrderCopies="
 						+ str
 						+ "&quotationNo="
 						+ txtPurchaseOrderQuatationNo
 						+ "&purOrderDate=" + purOrderDate);

 	}
 	if ($purchasercopy.is(':checked') == true) {
 		window
 				.open("Inventory_purchase_order_print.jsp?txtPurchaseOrderSupplierCode="
 						+ txtPurchaseOrderSupplierCode
 						+ "&partyId="
 						+ purOrderPrintId
 						+ "&txtPurchaseOrderDocSeries="
 						+ txtPurchaseOrderDocSeries
 						+ "&txtPurchaseOrderDeliveryDate="
 						+ txtPurchaseOrderDeliveryDate
 						+ "&purchaseCopy=Purchaser Copy&purchaseOrderCopies="
 						+ str
 						+ "&quotationNo="
 						+ txtPurchaseOrderQuatationNo
 						+ "&purOrderDate=" + purOrderDate);
 	}
 	if ($receiptcopy.is(':checked') == true) {
 		window
 				.open("Inventory_purchase_order_print.jsp?txtPurchaseOrderSupplierCode="
 						+ txtPurchaseOrderSupplierCode
 						+ "&partyId="
 						+ purOrderPrintId
 						+ "&txtPurchaseOrderDocSeries="
 						+ txtPurchaseOrderDocSeries
 						+ "&txtPurchaseOrderDeliveryDate="
 						+ txtPurchaseOrderDeliveryDate
 						+ "&purchaseCopy=Receipt Copy&purchaseOrderCopies="
 						+ str
 						+ "&quotationNo="
 						+ txtPurchaseOrderQuatationNo
 						+ "&purOrderDate=" + purOrderDate);
 	}
 	if ($accountscopy.is(':checked') == true) {
 		window
 				.open("Inventory_purchase_order_print.jsp?txtPurchaseOrderSupplierCode="
 						+ txtPurchaseOrderSupplierCode
 						+ "&partyId="
 						+ purOrderPrintId
 						+ "&txtPurchaseOrderDocSeries="
 						+ txtPurchaseOrderDocSeries
 						+ "&txtPurchaseOrderDeliveryDate="
 						+ txtPurchaseOrderDeliveryDate
 						+ "&purchaseCopy=Accounts Copy&purchaseOrderCopies="
 						+ str
 						+ "&quotationNo="
 						+ txtPurchaseOrderQuatationNo
 						+ "&purOrderDate=" + purOrderDate);
 	}
 	if ($indentorscopy.is(':checked') == true) {
 		window
 				.open("Inventory_purchase_order_print.jsp?txtPurchaseOrderSupplierCode="
 						+ txtPurchaseOrderSupplierCode
 						+ "&partyId="
 						+ purOrderPrintId
 						+ "&txtPurchaseOrderDocSeries="
 						+ txtPurchaseOrderDocSeries
 						+ "&txtPurchaseOrderDeliveryDate="
 						+ txtPurchaseOrderDeliveryDate
 						+ "&purchaseCopy=Indentors Copy&purchaseOrderCopies="
 						+ str
 						+ "&quotationNo="
 						+ txtPurchaseOrderQuatationNo
 						+ "&purOrderDate=" + purOrderDate);
 	}
 	if ($mastercopy.is(':checked') == true) {
 		window
 				.open("Inventory_purchase_order_print.jsp?txtPurchaseOrderSupplierCode="
 						+ txtPurchaseOrderSupplierCode
 						+ "&partyId="
 						+ purOrderPrintId
 						+ "&txtPurchaseOrderDocSeries="
 						+ txtPurchaseOrderDocSeries
 						+ "&txtPurchaseOrderDeliveryDate="
 						+ txtPurchaseOrderDeliveryDate
 						+ "&purchaseCopy=Master Copy&purchaseOrderCopies="
 						+ str
 						+ "&quotationNo="
 						+ txtPurchaseOrderQuatationNo
 						+ "&purOrderDate=" + purOrderDate);
 	}
 }

 // *multiplepurOrderPrint Author Vinod @Date 14/09/2016 */
 
//*hidepurOrderPrint Author Vinod @Date 14/09/2016 */ 
 
 function hidepurOrderPrint()
 {
 	$("#purchaseorderprint").hide();
 	
 	$(".check-uncheck").each(function() 
 		{
 	 		$(this).attr("checked",false);
 	});	
 	$("#purOrderPrintId").val(0);
 }
 
//*multiplepurOrderPrint Author Vinod @Date 14/09/2016 */
 
//*checkallpurOrderPrint Author Vinod @Date 14/09/2016 */

 function checkAllPurchaseOrders()
 {
 	$(".check-uncheck").each(function() 
 	{
  		$(this).attr("checked",true);
 	});
 }

//*checkallpurOrderPrint Author Vinod @Date 14/09/2016 */
 
//*uncheckpurOrderPrint Author Vinod @Date 14/09/2016 */
 
 function uncheckAllPurchaseOrders()
 {
 	$(".check-uncheck").each(function() 
 	{
  		$(this).attr("checked",false);
 	});
 }
 
//*uncheckpurOrderPrint Author Vinod @Date 14/09/2016 */
 function clearPopUp() {
		$('#Purchase_Order_Form').find('input:text').val('');
		$('#Purchase_Order_Form').find('textarea').val('');
		//	getNextQuotationId();
		$("#ItemInfoTablePO > tbody").html('');
		$("#txtVendorCode").val('');
		$("#RowCount").val('');
		isNew = 1;
		test = 1;
		rowCount = 1;
	}

	function clearpopupAddnewEB() {
		$('#Purchase_Order_Form').find('input:text').val('');
		$('#Purchase_Order_Form').find('textarea').val('');
		$('#Purchase_Order_Form').find('input:hidden').val('');
		$("#ItemInfoTablePO > tbody").html('');
		$('#ItemInfoTablePO').find('input:text').val('');
		$("#ItemInfoTablePO > tbody").html('');
		$("#txtVendorCode").val('');
		$("#RowCount").val('');

		$("#txtPurchaseOrderRequestNo").val(0);
		$("#txtPurchaseOrderQuatationNo").val(0);
		$("#txtPurchaseOrderTotalDocQty").val(0);
		getNextOrderIdEB();
		isNew = 0;
		rowCount = 1;

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
		$("#txtPurchaseOrderTotalDocDiscount").val(0);
		//getNextQuotationId();
		
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
	    $("#txtPurchaseOrderDatePRL").val(today1);
	    $("#txtPurchaseOrderDeliveryDate").val(today1);
	}
	function getNextOrderIdEB() {

		jQuery.ajax({
			async : false,
			type 	: "POST",
			url 	: "ehat/inventory/getexpid",
			data	: {
				
				"tablename":"inv_expenses_bill"
			},
			timeout : 1000 * 60 * 5,
			cache 	: false,
		
			success : function(response) {
			$("#txtPurchaseOrderDocNoPRl").val(response);
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
				//	alert(hoseditState);
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

	 var hos=0;
	 var sta=0;	 
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
var callFromexp="toCreateDivPO";	 
	 function fetchexpenseitem(inputID, typeauto,callFrom){
		 var  txtVal1 = $('#' + inputID).val();
		 var  txtPurchaseOrderSupplierName =$("#txtPurchaseOrderSupplierName").val();
		 var  txtSupplierState =$("#txtSupplierState").val();
		 if(callFrom !=="add"){
			 if(txtPurchaseOrderSupplierName ==null || txtPurchaseOrderSupplierName==""){
				 alert("Please Select Supplier Name And Supplier State!!");
				 return false;
			 }else{
				 callFromexp = callFrom;
				 jQuery.ajax({
						type : "POST",
						url : "ehat/inventory/fetchexpenseitem",
						data	: {
							
							"itemname":txtVal1
						},
						timeout : 1000 * 60 * 5,
						cache : false,
						error : function() {
							alert('error');
						},
						success : function(response) {
						
						
							//	ajaxResponse = eval('(' +response + ')');
							var availableTags = [];

							if(response.ltinvetorypurchaseorderitemmaster.length > 0){
								var resultData = [];
								for ( var i = 0; i < response.ltinvetorypurchaseorderitemmaster.length; i++) {
									// alert(ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_Supplier_Name+"_"+ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_doc_no);
									//alert(response.ltinvetorypurchaseorderitemmaster[i].inv_expenses_item_Name);
									availableTags
											.push(response.ltinvetorypurchaseorderitemmaster[i].inv_expenses_item_Name
													+ "_"
													+ response.ltinvetorypurchaseorderitemmaster[i].inv_expenses_item_slave_id);
									
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
										onSelect : displayResultnew,
										scrollBar : true

									});

								}, 500);
							}else{
								
								var arrValue = (inputID).split("_");
								var idValue = (arrValue[1]);
								$("#lengthitem").val(0 +"_"+idValue);
								/*
								$("#ItemInfoTablePO input[type=checkbox]").each(function(){

									  $(this).prop("checked",false);
									});
								var arrValue = (inputID).split("_");
								var idValue = (arrValue[1]);
								toCreateDivExpense('toCreateDivPO');
								var state = $("#txtSupplierState").val();
								var hostate = $("#hosState").val();
								
									if(state ==hostate || state == hostate || state == hostate)
									{
										
									
										$("#txtPurchaseQuotationTaxAmount"+idValue).hide();
										$("#txtPurchaseQuotationTaxAmount"+idValue).val(0.0);
										//totalAmount();
									}else{
										
										$("#txtPurchaseQuotationTaxCodePO_"+idValue).hide();
										$("#txtPurchaseQuotationTaxCodePO_"+idValue).val(0.0);
										}	
								
							*/}
							
							
							}
						
					
						
				

					});
				 
					function displayResultnew(item) {

						//alert((item.text).trim() + " : " + (item.value).trim());
						
						$("#ItemInfoTablePO input[type=checkbox]").each(function(){

							  $(this).prop("checked",false);
							});
						  // alert(callFromexp);
						toCreateDivExpense('toCreateDivPO');

						$('#' + inputID).val(item.text);
						var arrValue = (inputID).split("_");
						var idValue = (arrValue[1]);
						var currentcode = item.value;
						var state = $("#txtSupplierState").val();
						var hostate = $("#hosState").val();
						var txtPurchaseOrderDocSeriesIsEdit =$("#txtPurchaseOrderDocSeriesIsEdit").val();
						
							if(state ==hostate || state == hostate || state == hostate)
							{
								
							
								$("#txtPurchaseQuotationTaxAmount_"+idValue).hide();
								$("#txtPurchaseQuotationTaxAmount_"+idValue).val(0.0);
								//totalAmount();
							}else{
								
								$("#txtPurchaseQuotationTaxCodePO_"+idValue).hide();
								$("#txtPurchaseQuotationTaxCodePO_"+idValue).val(0.0);
								}	
						
						$('#txtPurchaseQuotationItemNumber' + idValue).val(currentcode);
						}
			 } 
		 }
		 
		
	 }
	 
function savePurchaseOrderEXP(){

	var currentuserName = $("#currentuserName").val();
	var currentUserID = $("#currentUserID").val();
	var txtPurchaseFormName = $("#txtPurchaseFormName").val();
	var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo").val();
	//alert(txtPurchaseOrderQuatationNo);
	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	var txtPurchaseOrderDocSeriesIsEdit = $("#txtPurchaseOrderDocSeriesIsEdit").val();
	var txtPurchaseQuotationDocNo = $("#txtPurchaseOrderDocNoPRl").val();
	if(txtPurchaseOrderDocSeriesIsEdit== 0){
		txtPurchaseQuotationDocNo =0;
	}
	var txtPurchaseQuotationDate1 = $("#txtPurchaseOrderDatePRL").val();
	var txtPurchaseQuotationMobileNo = $("#txtPurchaseOrderMobileNo").val();
	var txtPurchaseQuotationSupplierCode = $('#txtVendorCodePO').val();

	var txtPurchaseQuotationSupplierName = $("#txtPurchaseOrderSupplierName").val();

	var selDocName = $("#selDocNamePO option:selected").text();
	var txtPurchaseQuotationDocSeries = $("#txtPurchaseOrderDocSeries").val();
	
	
	var txtDocSeries;
	if(txtPurchaseOrderDocSeriesIsEdit == 'isEdit')
	{
			txtDocSeries = txtPurchaseQuotationDocSeries;
	}
	else
	{
		var finaltxtPurchaseOrderDocSeries =txtPurchaseQuotationDocSeries +"No"+":"+txtPurchaseQuotationDocNo;
			txtDocSeries = finaltxtPurchaseOrderDocSeries;
	}
	
	var txtPurchaseQuotationRequestNo = $("#txtPurchaseOrderRequestNo").val();

	var txtPurchaseQuotationReferenceNo = $("#txtPurchaseOrderReferenceNo")
			.val();

	var txtPurchaseQuotationAddress = $("#txtPurchaseOrderAddress").val();
	var sclPurchaseQuotationDocstatus = $("#sclPurchaseOrderDocstatus option:selected").text();
	var txtPurchaseQuotationAmountinlocalcurrency = $(
			"#txtPurchaseOrderAmountinlocalcurrency").val();
	var txtPurchaseQuotationTotalDocDiscount = $(
			"#txtPurchaseOrderTotalDocDiscount").val();
	
	/*var txtPurchasTermsAndConditions = $("#txtPurchaseQuotationNotes2").val();
	alert("txtPurchasTermsAndConditions : "+txtPurchasTermsAndConditions);*/
	
	var txtPurchasTermsAndConditions = encodeURIComponent($.trim($("#txtPurchaseQuotationNotes2").val()));
	
	var txtPurchaseQuotationTotalDocQty = $("#txtPurchaseOrderTotalDocQty").val();
	var txtPurchaseOrderDeliveryDate = $("#txtPurchaseOrderDeliveryDate").val();
	
	/*All chargesh 7/6/2016 */
	
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
	var txtPurchaseOrderDocSeriesIsEdit =$("#txtPurchaseOrderDocSeriesIsEdit").val();
	
	
	/**** validation for charges @author:sudhir jadhav @Date:17OCT2016  *********/
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
		
	/****END validation for charges @author:sudhir jadhav @Date:17OCT2016 *********/

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
			ltInv_expenses_billSlave : []
	};
	var materiallist1 = {
			ltinvetoryEXPmaster : []
		};
	//validation
	/*setnewtablecounterPO*/
	/*var NewVAlue = $("#setnewtablecounterPO").val();
	alert(NewVAlue);
	var onViewValue = $("#btnEdit2").val();
	alert(onViewValue);
	if(onViewValue == 'EDIT')
		{
		
		}
	if(NewVAlue == 'NewBtn'){
	var curency = document.getElementById("txtPurchaseQuotationList");
	var docseries = curency.options[curency.selectedIndex].text;
	if(docseries == 0 || docseries == '-Select-')
	{
	    alert('please select purchase quotation');
		$("#txtPurchaseQuotationList").focus();
		return false;
	}
	}*/
	if (txtPurchaseQuotationDate1 == "" || txtPurchaseQuotationDate1 == null) {
		alert("Please select purchase order  date ");
		$("#txtPurchaseOrderDatePRL").focus();
		return false;
	}

	var txtPurchaseOrderSaveOrUpdate =$("#txtPurchaseOrderSaveOrUpdate").val();
	if(!(txtPurchaseOrderSaveOrUpdate =='Update'))
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
	    
	    if( txtPurchaseQuotationDate1 === today1)
		   {
		   		    
		   }
	    else
	    {
	    	alert("Please Enter Current Date ");
		    $("#txtPurchaseOrderDatePRL").focus();
		   return false;
	    }
		}
		}

	if (txtPurchaseQuotationSupplierName == ""
			|| txtPurchaseQuotationSupplierName == null) {
		alert("Please enter supplier name");
		$("#txtPurchaseOrderSupplierName").focus();
		return false;
	}

	if (txtPurchaseQuotationMobileNo == ""
		|| txtPurchaseQuotationMobileNo == null) {
	alert("Please enter mobile number");
	$("#txtPurchaseOrderMobileNo").focus();
	return false;
}

if (txtPurchaseQuotationMobileNo.length < 10
		|| txtPurchaseQuotationMobileNo.length > 10) {
	alert("Mobile number should be of 10 digits");
	$("#txtPurchaseOrderMobileNo").focus();
	return false;
}
	/* var curency = document.getElementById("txtPurchaseOrderDocSeries");
	 if(curency == "" || curency == null)
	 {
	    alert('please select doc series');
		$("#txtPurchaseOrderDocSeries").focus();
		return false;
	 }*/

	//var curency = document.getElementById("txtPurchaseOrderDocSeries");
	// var docseries = curency.options[curency.selectedIndex].text;
	var challanno = $("#challanno").val();


	if (txtPurchaseQuotationReferenceNo == ""
			|| txtPurchaseQuotationReferenceNo == null) {
		alert("Please enter reference number");
		$("#txtPurchaseOrderReferenceNo").focus();
		return false;
	}

	if (txtPurchaseQuotationAddress == ""
			|| txtPurchaseQuotationAddress == null) {
		alert("Please enter address");
		$("#txtPurchaseOrderAddress").focus();
		return false;
	}

	var status = document.getElementById("sclPurchaseOrderDocstatus");
	var docstatus = status.options[status.selectedIndex].text;

	for ( var i = 1; i <= totaltblsize; i++) {
		/*this loop for removining last row which is not requaired @Date:17oct2016 */
		for ( var i = 1; i <= totaltblsize-1; i++)
			{
		if ($("#txtPurchaseQuotationItemNumber" + i).val() != null	&& $("#txtPurchaseQuotationItemNumber" + i).val() != undefined) {

			var txtPurchaseQuotationItemNo = $(
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
			var txtPurchaseQuotationTrdeDiscountAmt = $(
					"#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
			
			var txtPurchaseQuotationTrdeDiscountInRupess = $(
					"#txtPurchaseQuotationTrdeDiscountInRupess" + i).val();
			 
			
			var txtPurchaseQuotationBaseAmount = $(
					"#txtPurchaseQuotationBaseAmount" + i).val();
			
		/*	var txtPurchaseQuotationTaxCodePO_ = $("#txtPurchaseQuotationTaxCodePO_" + i).val();*/
			
			var txtPurchaseQuotationTaxCodePO_ = "";
			
				txtPurchaseQuotationTaxCodePO_ = $('#txtPurchaseQuotationTaxCodePO_'+ i).val();
		
				if (isNaN(txtPurchaseQuotationTaxCodePO_)) {
			      //  alert("Invalid characters");
			       // document.myForm.name.focus();
					txtPurchaseQuotationTaxCodePO_= txtPurchaseQuotationTaxCodePO_.substring(0, txtPurchaseQuotationTaxCodePO_.length-1);

			    }
			 
			
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
					"#txtPurchaseQuotationTaxAmount_" + i).val();
			
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

			  
			materiallist.ltInv_expenses_billSlave
					.push({

						// inv_purchase_common_item_code:,
						inv_expenses_item_slave_id :txtInvpurchaseCommonItemMasterId,
						inv_expenses_item_Name : txtPurchaseQuotationItemName_,
						inv_expenses_item_code : txtPurchaseQuotationItemNo,//txtPurchaseQuotationItemName,
						inv_expenses_item_doc_Qty : txtPurchaseQuotationDocQuantity,
						inv_expenses_item_unit_price : txtPurchaseQuotationUnitPrice,

						inv_expenses_item_discount_per : txtPurchaseQuotationTrdeDiscountPercentage,
						inv_expenses_item_discount_rupess:txtPurchaseQuotationTrdeDiscountInRupess,
						inv_expenses_item_discount_amount : txtPurchaseQuotationTrdeDiscountAmt,
						inv_expenses_item_base_amount : txtPurchaseQuotationBaseAmount,
						

						inv_expenses_item_tax_amount : txtPurchaseQuotationTaxAmount,
						inv_expenses_item_tax_amount_rupess:txtPurchaseOrderTaxAmtinRs, // push tax amount in Rs list @author:paras @Date:23nov
						inv_expenses_item_tax_code:txtPurchaseQuotationTaxCodePO_,
						inv_expenses_item_row_amount : txtPurchaseQuotationRowAmount,
					
						inv_expenses_item_actural_qty : txtPurchaseQuotationActualQuantity,
						inv_expenses_item_pending_qty : txtPurchaseQuotationPendingQuantity,

						inv_expenses_item_batch_No : txtPurchaseQuotationBatchNoPO,
						/*inv_purchase_order_item_batch_No : txtPurchaseQuotationBatchNo,*/

						//inv_purchase_order_item_base_doc_No : txtPurchaseQuotationDocNo,
						inv_expenses_item_doc_number : txtPurchaseQuotationDocNo,

						inv_expenses_item_doc_number_fk : txtPurchaseQuotationDocNo,
						
					

					});

		}

	}
}
	var txtSupplierState = $("#txtSupplierState").val();
	if(txtSupplierState == 0){
		alert("Please Select Supplier State!!!");
		return false;
	}
	
	materiallist1.ltinvetoryEXPmaster
	.push({

		// inv_purchase_common_item_code:,
		inv_exp_no : txtPurchaseQuotationDocNo,
		inv_exp_date : 0,//txtPurchaseQuotationItemName,
		inv_exp_total_doc_qty : txtPurchaseQuotationTotalDocQty,
		inv_exp_mobile_number : txtPurchaseQuotationMobileNo,

		inv_exp_supplier_name : txtPurchaseQuotationSupplierName,
		inv_exp_Supplier_Id:txtPurchaseQuotationSupplierCode,
		inv_exp_reference_no : txtPurchaseQuotationReferenceNo,
		inv_exp_address : txtPurchaseQuotationAddress,
		inv_exp_challan :challanno,

		inv_exp_total_doc_qty : txtPurchaseQuotationTotalDocQty,
		inv_exp_total_discount:txtPurchaseQuotationTotalDocDiscount, // push tax amount in Rs list @author:paras @Date:23nov
		inv_exp_Delivery_Date:txtPurchaseOrderDeliveryDate,
		inv_exp_special_disc : txtSplDisc,
	
		inv_exp_debit_amt : txtdebitAmt1,
		inv_exp_cash_amt_perct : txtCD1,

		inv_exp_cash_amt_rupees : txtCDAmt,
		/*inv_purchase_order_item_batch_No : txtPurchaseQuotationBatchNo,*/

		//inv_purchase_order_item_base_doc_No : txtPurchaseQuotationDocNo,
		inv_exp_octroi_amt : txtOctroi,

		inv_exp_surcharge_amt : txtSurcharge,
		
		inv_exp_freight_amt :txtFreight,
		inv_exp_calcuated_vat_amt:txtVat,
		inv_exp_cst_amt:txtcst,
		inv_exp_ex_vat_amt:txtExVat,
		inv_exp_calcuated_total_taxes_amt:txtTotalVat,				
		inv_exp_total_base_gross_amt:txtGross,
		inv_exp_total_less_amt:txtLess,
		inv_exp_total_add_amt:	txtAdd,
	    inv_exp_final_calcuated_total_taxes_amt:textVat,	
	    inv_exp_final_total_net_amt:txtNetAmt,
	    inv_exp_special_charges:selboxChargeswithAmtList,
	    inv_exp_sumofspecial_charges:sumofCharges,
	    inv_supplierState:	txtSupplierState
	
	});
	
	var li1 = materiallist1.ltinvetoryEXPmaster.length;
	var li = materiallist.ltInv_expenses_billSlave.length;
	/* if(li == 0 || li1==0)
		{
		alert("Please enter atleast one Item row to Save Exprense Bill");
		console.log(materiallist.ltinvetorypurchaseorderitemmaster);
		return false;
		}*/
	
    materiallist1 = JSON.stringify(materiallist1);
	materiallist = JSON.stringify(materiallist);
	var inputs = [];

	inputs.push('materiallist=' + materiallist);
	inputs.push('materiallist1=' + materiallist1);
	/*inputs.push('txtPurchaseQuotationDocNo=' + txtPurchaseQuotationDocNo);
	inputs.push('txtPurchaseOrderQuatationNo=' + txtPurchaseOrderQuatationNo);
	inputs.push('txtPurchasTermsAndConditions=' + txtPurchasTermsAndConditions);
	
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
	inputs.push('currentuserName='+currentuserName);
	inputs.push('currentUserID='+currentUserID);
	
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
	inputs.push('sumofCharges='+sumofCharges);*/
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventory/saveexpenseitem",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alertify.success("Save Sucessfully");
			$('#Purchase_Order_Form').removeClass('fade');
			$('#Purchase_Order_Form').modal('hide');
			fetchexpensedetail("onload");
			
	
		}
	});

		
		
		
	}
var SrNo1=1;
var inventoryExpenseTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 97%; '>"
	+ "<thead class='cf' style='background: white;'><tr>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>Expense Id</div></th><th style='height: 21.5px;' class='col-md-5-1 center'><div>Vendor Name</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th></tr> </thead>"
	+ "{#foreach $T.ltinvetoryEXPmaster as ltinvetoryEXPmaster}<tr class='center'>"
	+ "<td>{SrNo1++}</td><td id='id{$T.ltinvetoryEXPmaster.inv_exp_no}'>{$T.ltinvetoryEXPmaster.inv_exp_no}</td><td>{$T.ltinvetoryEXPmaster.inv_exp_supplier_name}</td>"
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success'  data-toggle='modal' data-target='#Purchase_Order_Form' onclick=\"viewPurchaseExpenseDetailsOnEdit({$T.ltinvetoryEXPmaster.inv_exp_no})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
	+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button' onclick=\"deleteExpenseMasterDetails({$T.ltinvetoryEXPmaster.inv_exp_no})\"><i class='fa fa-trash-o'></i></button></td><td><button id='btnEdit2' class='btn btn-xs btn-success'  data-toggle='modal'   onclick=\"printExpenseMasterDetailsOnEdit({$T.ltinvetoryEXPmaster.inv_exp_no})\" value='EDIT'><i class='fa fa-print'></i></button></td></tr>{#/for}</table>";
function fetchexpensedetail(callform){
var value="";	
if(callform=="byname"){
	
	value = $("#byVendorName").val();
}else if(callform=="byid"){
	
	value = $("#byMrnId").val();
}
	jQuery.ajax({
		async : true,
		type : "POST",
		data	: {
			
			  "value" : value,
				"callform":callform
			},
		url : "ehat/inventory/fetchexpenseBill",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//alert(r.ltinvetoryEXPmaster.length);
		var a =	JSON.stringify(r);
			$("#docuemntAjaxResp").html(a);
			$("#documentContent").setTemplate(inventoryExpenseTemp);
			$("#documentContent").processTemplate(r);

			
		}
	});
}

function viewPurchaseExpenseDetailsOnEdit(partyId){
	


	$('#iHidePurOrderBtn').css('display', 'none');
	
	$("#selDocNamePO").text("");
	document.getElementById("selDocNamePO").disabled = true;
	$("#closeonclick").show();
	
	
	clearPopUp();
$("#txtPurchaseOrderDocSeriesIsEdit").val('isEdit');
$("#txtPurchaseOrderSaveOrUpdate").val('Update');
//var masterid = $("#txtVendorCode").val();
//  alert(masterid);
var obj = $("#docuemntAjaxResp").html();
objPurchase = JSON.parse(obj);
var myObj = "";
for ( var rowCount = 0; rowCount < objPurchase.ltinvetoryEXPmaster.length; rowCount++) {
	if (objPurchase.ltinvetoryEXPmaster[rowCount].inv_exp_no == partyId) {
		//alert(obj);
		myObj = objPurchase.ltinvetoryEXPmaster[rowCount];
		break;
	}
}

/****************************************Date conversion**********************************/

$("#txtPurchaseOrderDatePRL").val(myObj.inv_exp_Delivery_Date);


var txtPurchaseOrderDocNoPRl = $("#txtPurchaseOrderDocNoPRl").val(
		myObj.inv_exp_no);
var txtPurchaseOrderQuatationNo = $("#txtPurchaseOrderQuatationNo").val(
		myObj.inv_exp_no);

/*var txtPurchaseQuotationDate1 = $("#txtPurchaseOrderDatePRL").val(
		myObj.inv_purchase_order_master_doc_date);*/

var txtPurchaseQuotationMobileNo = $("#txtPurchaseOrderMobileNo").val(
		myObj.inv_exp_mobile_number);
var txtPurchaseQuotationSupplierName = $("#txtPurchaseOrderSupplierName")
.val(myObj.inv_exp_supplier_name);
var txtPurchaseQuotationSupplierCode = $("#txtVendorCodePO").val(
		myObj.inv_exp_Supplier_Id);

//var txtDocSeries = selDocName + txtPurchaseQuotationDocSeries;			
var txtPurchaseQuotationReferenceNo = $("#txtPurchaseOrderReferenceNo")
		.val(myObj.inv_exp_reference_no);
var txtPurchaseQuotationAddress = $("#txtPurchaseOrderAddress").val(
		myObj.inv_exp_address);

var txtPurchaseQuotationTotalDocDiscount = $(
		"#txtPurchaseOrderTotalDocDiscount").val(
		myObj.inv_exp_total_discount);

var txtPurchaseQuotationTotalDocQty = $("#txtPurchaseOrderTotalDocQty")
		.val(myObj.inv_exp_total_doc_qty);


var txtPurchaseOrderDeliveryDate = $("#txtPurchaseOrderDeliveryDate").val(myObj.inv_exp_Delivery_Date);

var masterID = $("#txtVendorCodePO").val();
var orderId = $("#txtPurchaseOrderDocNoPRl").val();



$("#txtSplDisc").val(myObj.inv_exp_special_disc);
$("#txtdebitAmt1").val(myObj.inv_exp_debit_amt);
$("#txtCD1").val(myObj.inv_exp_cash_amt_perct);
$("#txtCDAmt").val(myObj.inv_exp_cash_amt_rupees);

$("#txtOctroi").val(myObj.inv_exp_octroi_amt);
$("#txtSurcharge").val(myObj.inv_exp_surcharge_amt);
$("#txtCreditAmt").val(myObj.inv_exp_credit_amt);
$("#txtFreight").val(myObj.inv_exp_freight_amt);

$("#txtVat").val(myObj.inv_exp_calcuated_vat_amt);
$("#txtlbt").val(myObj.inv_exp_lbt_amt);
$("#txtcst").val(myObj.inv_exp_cst_amt);
$("#txtExVat").val(myObj.inv_exp_ex_vat_amt);

$("#txtTotalVat").val((myObj.inv_exp_calcuated_total_taxes_amt).toFixed(2));
$("#txtGross").val((myObj.inv_exp_total_base_gross_amt).toFixed(2));
$("#txtLess").val((myObj.inv_exp_total_less_amt).toFixed(2));
$("#txtAdd").val((myObj.inv_exp_total_add_amt).toFixed(2));

$("#textVat").val((myObj.inv_exp_final_calcuated_total_taxes_amt).toFixed(2));
$("#txtNetAmt").val(myObj.inv_exp_final_total_net_amt);
if(myObj.inv_supplierState == 0 || myObj.inv_supplierState ==null || myObj.inv_supplierState==undefined ){
	 
}else{
	////alert("ad"+myObj.inv_supplierState);
	 $("#hoseditState").val(myObj.inv_supplierState);
}

var selboxChargeswithAmtList = myObj.inv_exp_special_charges;

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

$("#sumofCharges").val(0.0);



//alert("Id=" + item.value + " Value=" + item.text);
//var masterID = item.value;
//alert("master id in view===:" +masterID);
fetchPartyMasterContactsDetailsPO(masterID);
fetchPartyMasterAddressDetailsPO(masterID);
fecthPartyOtherInfoPO(masterID);
fetchtermsandconditionsDetailsforOrder(orderId);
var data= $("#docuemntAjaxResp").html();
var pobj1=  JSON.parse(data);
srNumber = 1;

var state =0;
var hostate = 0;

state = myObj.inv_supplierState;
hostate = $("#hosState").val();
for ( var Count = 0; Count < pobj1.ltinvetoryEXPmaster.length; Count++) {
	if( pobj1.ltinvetoryEXPmaster[Count].inv_exp_no==partyId){
		for ( var Count1 = 0; Count1 < pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave.length; Count1++) {
			$("#ItemInfoTablePO > tbody")
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
									+ " <td> <div id ='divtxtPurchaseQuotationItemName'> <input type='text' style='text-align:left;width:250px;'  readonly=''  class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
									+ srNumber
									+ "'  value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_Name
									+ "'  onkeyup = 'auto(this.id,onchange,plain)' onkeypress='return validateOnlyName(event);' /> "
									+ " <input type='hidden'  id='txtPurchaseQuotationItemNumber"
									+ srNumber
									+ "' value='"+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_code +"'/> "
									
									+ "<input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
									+ srNumber
									+ "' value='"+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_slave_id +"'/>"
									
									+ " </div> </td>"
									+ "<td><input type='text' style='width:60px;'class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_doc_Qty
									+ "'  onkeyup='totalAmount(this.id,"+ srNumber+ ")' onkeyup = 'fetchItemFactors(this.id,"+ srNumber+ ")' onkeypress='return validateNumbers(event);'> </td> "
									+ "<td><input type='text' style='width:60px;' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_unit_price
									+ "' onkeypress='return validateNumbers(event);' ></td>"
									+ ""
									+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_discount_per
									+ "' onkeyup='chkTradAmtorPercentage(this.id,"+srNumber+")'  onblur='calculTradeDis(this.id,"
									+ srNumber
									+ ")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountInRupess"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_discount_rupess
									+ "' onkeyup='chKTradAmt(this.id,"+srNumber+")' onkeypress='return validateNumbers(event);'></td>"
									+ " <td><input readonly='' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_discount_amount
									+ "' onkeypress='return validateNumbers(event);' ></td>"
									+ "<td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_base_amount
									+ "' onkeypress='return validateNumbers(event);' ></td> "
									+"<td><input style='width:80px;' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTaxCodePO_"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_tax_code
									+ "'  onkeyup = 'autotaxCodeforItem(this.id, \"onchange\");'  ></td>"
									+ " <td><input type='text' readonly='' class='form-control input-SmallText' id='txtPurchaseQuotationTaxAmount_"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_tax_amount
									+ "' onkeyup='rowAmtCal(this.id,"
									+ srNumber
									+ "),autotaxCodeforItem(this.id, \"onchange\");'  ></td> "
									+ "<td><input type='text'  style='width:100px;' class='form-control input-SmallText' id='txtPurchaseOrderTaxAmtinRs"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_tax_amount_rupess
									+ "' readonly='' ></td>"
									+ "<td><input type='text' class='form-control input-SmallText' readonly='' id='txtPurchaseQuotationRowAmount"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_row_amount
									+ "'></td>"
									+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor1"
									+ srNumber
									+ "' value='"
									+ 0
									+ "' onkeypress='return validateNumbers(event);' ></td> "
									+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor2"
									+ srNumber
									+ "' value='"
									+ 0
									+ "' onkeypress='return validateNumbers(event);'> </td> "
									+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor3"
									+ srNumber
									+ "' value='"
									+ 0
									+ "' onkeypress='return validateNumbers(event);'> </td> "
									+ "<td><input type='text' maxlength='5' class='form-control input-SmallText' id='txtPurchaseQuotationFactor4"
									+ srNumber
									+ "' value='"
									+ 0
									+ "' onkeypress='return validateNumbers(event);'></td> "

									+ "   <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_actural_qty
									+ "' onblur='pendingAmount(this.id,"
									+ srNumber
									+ ")' onkeypress='return validateNumbers(event);' ></td> "
									+ "<td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationPendingQuantity"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_pending_qty
									+ "' onkeypress='return validateNumbers(event);' ></td> "
									+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
									+ srNumber
									+ "' value='"
									+ pobj1.ltinvetoryEXPmaster[Count].ltInv_expenses_billSlave[Count1].inv_expenses_item_batch_No
									+ "'  ></td>"
									+ "  </tr>");

			$("#RowCount").val(srNumber);
			
		//	alert(hostate);
	
				if(state ==hostate || state == hostate || state == hostate)
				{
					
				
					$("#txtPurchaseQuotationTaxAmount_"+srNumber).hide();
				//	$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
					//totalAmount();
				}else{
					
					$("#txtPurchaseQuotationTaxCodePO_"+srNumber).hide();
				//	$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
					}	
			srNumber++;
			test++;
}
	}
	}
					// auto("txtPurchaseQuotationItemName_","onload");
					totalDocQtyPQ();
					totalDocDiscountPQ();
					toCreateDivExpense();
					//var txtEmptyItem = $("#txtPurchaseOrderSupplierName").val();
					//auto(txtEmptyItem, "onload");

					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				
    	$("#divtxtPurchaseQuotationList").hide();



	
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
	 if(rowCount[0]=="txtPurchaseQuotationTaxCodePO"){
		 $("#txtPurchaseQuotationTaxCodePO_"+rowCount[1]).val(sumofRate);
			$("#txtPurchaseQuotationTaxAmount_"+rowCount[1]).val(sumofRate);
		 
	 }else{
		 $("#txtPurchaseQuotationTaxCodePO_"+rowCount[1]).val(sumofRate);
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
		$('#txtPurchaseOrderTaxAmtinRs'+ rowCount).val(finalcaltaxanmount); //add tax amount in Rs @author:paras @Date:23nov 
		 
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
function toCreateDivExpense(callform) {
	
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
								+ "' onkeyup='auto(this.id,onchange,toCreateDivPO)' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
								+ rowCount
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ rowCount
								+ "'  onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ rowCount
								+ "'  style='width:60px;' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly=''  style='width:60px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'readonly='' style='width:100px;' ></td>" +
								"<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTaxCodePO_"
								+ rowCount
								+ "' style='width:80px;' onkeyup = 'autotaxCodeforItem(this.id, \"onchange\");'  ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ "),autotaxCodeforItem(this.id, \"onchange\");' id='txtPurchaseQuotationTaxAmount_"
								+ rowCount
								+ "'  style='width:100px;' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
								+ rowCount
								+ "'   readonly='' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:100px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);'  value='0' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' value='0' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text'  value='0' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' ><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' style='width:60px;' ></label></td> "
								+ "<td><input type='text'   value='0' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return value='0' validateNumbers(event);' maxlength='5' style='width:60px;'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' style='width:60px;'></label></td> "
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input type='text' value='0' class='form-control input-SmallText'    id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input value='0' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
								+ rowCount
								+ "' style='width:60px;' ></td>"
								+ " </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload",callform);
		//autotaxCode("txtPurchaseQuotationTaxCodePO_" + rowCount, "onload");

	} else {
		$("#ItemInfoTablePO > tbody")
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
								+ "' onkeyup='auto(this.id,onchange,toCreateDivPO)' onchange='newdivexp()' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' value='0'/><input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"'  ></label></td> "
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
								"<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTaxCodePO_"
								+ rowCount
								+ "' style='width:80px;' onkeyup = 'autotaxCodeforItem(this.id, \"onchange\");'  ></td>"
								+ " <td><input  style='width:80px;' type='text' class='form-control input-SmallText' onkeyup='rowAmtCal(this.id,"
								+ rowCount
								+ "),autotaxCodeforItem(this.id, \"onchange\");' id='txtPurchaseQuotationTaxAmount_"
								+ rowCount
								+ "'   ></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
								+ rowCount
								+ "'   readonly='' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' readonly='' style='width:100px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' value='0' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor1"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value='0' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor2"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;'> <label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  value='0' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor3"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);'maxlength='5' style='width:60px;' ><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value='0' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactor4"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' maxlength='5'  style='width:60px;'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' ></label></td> "
								+ " <td><input type='text' class='form-control input-SmallText' value='0'  id='txtPurchaseQuotationActualQuantity"
								+ rowCount
								+ "' onblur='pendingAmount(this.id,"
								+ rowCount
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value='0'  id='txtPurchaseQuotationPendingQuantity"
								+ rowCount
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input value='0' type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
								+ rowCount
								+ "' style='width:60px;'></td>"
								+ " </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		callFromexp= callform;
	//	alert(callFromexp);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload",callform);
	//	autotaxCode("txtPurchaseQuotationTaxCodePO_" + rowCount, "onload");

		rowCount++;
	}

}

function printExpenseMasterDetailsOnEdit(partyId){
	
	
	var obj = $("#docuemntAjaxResp").html();
	objPurchase = JSON.parse(obj);
	var myObj = "";
	for ( var rowCount = 0; rowCount < objPurchase.ltinvetoryEXPmaster.length; rowCount++) {
		if (objPurchase.ltinvetoryEXPmaster[rowCount].inv_exp_no == partyId) {
			//alert(obj);
			myObj = objPurchase.ltinvetoryEXPmaster[rowCount];
			break;
		}
	}


	$("#txtVendorCodePO").val(myObj.inv_exp_Supplier_Id);


	var txtPurchaseOrderSupplierCode = $("#txtVendorCodePO").val();
	var txtPurchaseOrderDeliveryDate =$("#txtPurchaseOrderDeliveryDate").val();
	 
	window.open("Inventory_purchase_expense_print.jsp?txtVendorCode="
					+ txtPurchaseOrderSupplierCode
					+ "&partyId="
					+ partyId
					+ "&txtPurchaseQuotationDocSeries=" + 1+"&txtPurchaseQuotationDeliveryDate="+txtPurchaseOrderDeliveryDate);
	
}
function newdivexp(){
	
	 var  txtPurchaseOrderSupplierName =$("#txtPurchaseOrderSupplierName").val();
	 var  txtSupplierState =$("#txtSupplierState").val();
	 
		 if(txtPurchaseOrderSupplierName ==null || txtPurchaseOrderSupplierName==""){
			
			 return false;
		 }else{
			 
			 if(txtSupplierState ==0){
				 return false;
			 }else{
				 
				 var length=$("#lengthitem").val();	
				 var arrValue = (length).split("_");
		

				 	
				 if(arrValue[0] == 0){
					 $("#ItemInfoTablePO input[type=checkbox]").each(function(){

					 	  $(this).prop("checked",false);
					 	});

					 var state = $("#txtSupplierState").val();
					 var hostate = $("#hosState").val();
				 	toCreateDivExpense('toCreateDivPO');
				 	if(state ==hostate || state == hostate || state == hostate)
				 	{
				 		
				 	
				 		$("#txtPurchaseQuotationTaxAmount"+arrValue[1]).hide();
				 		$("#txtPurchaseQuotationTaxAmount"+arrValue[1]).val(0.0);
				 		//totalAmount();
				 	}else{
				 		
				 		$("#txtPurchaseQuotationTaxCodePO_"+arrValue[1]).hide();
				 		$("#txtPurchaseQuotationTaxCodePO_"+arrValue[1]).val(0.0);
				 		}	
				 }
			 }
			
		 }

}
function autotaxfetch(inputID, typeauto){
	
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

function fetchdetailsonedititem(){
	

	    var totaltblsize = $("#RowCount").val();
		var state = $("#txtSupplierState").val();
		var hostate = $("#hosState").val();
	   for(var a=1;a<= totaltblsize;a++){
			if(state == hostate)
			{
			
				$("#txtPurchaseQuotationTaxAmount_"+a).hide();
				$("#txtPurchaseQuotationTaxCodePO_"+a).show();
			}else{
				$("#txtPurchaseQuotationTaxAmount_"+a).show();
            	$("#txtPurchaseQuotationTaxCodePO_"+a).hide();
			
				}
	
 
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