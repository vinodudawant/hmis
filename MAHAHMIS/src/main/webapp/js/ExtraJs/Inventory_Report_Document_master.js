
var test = 0;
function getReportForDocumentList() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		var MasterName = "DocumentMaster";
		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('MasterName=' + MasterName);
		inputs.push('action=getDocumentListReport');
		/* inputs.push('bedType=' + bedType); */
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
				var b = r.replace(/"/g, "");
							 
				setViewBtns1(b);
			}
		});

	}
}

function setViewBtns1(ajaxResponse) {

	alert("Report Generated Successfully");
	 
	/*$('#template')
			.append(
					"&nbsp;&nbsp;<a href='sss' style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='eee' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");*/
	/*$('#template').html("&nbsp;&nbsp;<a href='sss' style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='eee' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");*/
	var o = [];

	o = ajaxResponse.split('$');
	/*$('#template').html("&nbsp;&nbsp;<a   style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCategoryWisePurchase/"+o[0]+"'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCategoryWisePurchase/"+o[1]+"' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");*/
	
	
	$('#template')
	.html(
			"<button onclick='getReportForDocumentList()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;'href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/DocumentMasterReports/"+o[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/DocumentMasterReports/"+o[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
					+ "");
	
	
	/*
	 * var i = ajaxResponse;
	 * 
	 * var z = []; z = i.split('"');
	 * 
	 * var t = z[1];
	 */

	/*var o = [];

	o = ajaxResponse.split('$');
	$("a[href='sss']").attr('href', '/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/DocumentMasterReports/' + o[0]);
	$("a[href='eee']").attr('href', '/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/DocumentMasterReports/' + o[1]);
*/	
	/*$('#setButtons')
	.html(
			"<a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCategoryWisePurchase/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCategoryWisePurchase/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
					+ "");*/

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

function viewPurchaseMasterDetailsReport() {
	var fdate     =	$("#popup_container2").val();
	var todate    =	$("#popup_container3").val();
	var venderid  =	$("#txtVendorCode").val();
	var hiddenItemIdforAutSgn =	$("#hiddenItemIdforAutSgn").val();
	var inputs = [];
	inputs.push('action=FetchGST_Report');
	inputs.push('todate=' + todate );
	inputs.push('fdate=' + fdate);
	inputs.push('venderid=' + venderid);
	inputs.push('hiddenItemIdforAutSgn=' + hiddenItemIdforAutSgn);
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
					var hosState=$("#hosState").val();
					srNumber = 1;
					var htm="";
					var cgst=0;
					var cgsramt =0;
					var sgst=0;
					var sgstamt=0;
					var igst=0;
					var igstamt=0;
					var totaldiscount=0;
					var netamount=0;
					var totaldiscountamt=0;
					var totaltxamt=0;
					var totalcgst=0;
					var totalcgstamt=0;
					var totalSgst=0;
					var totalSgstamt=0;
					var totaligst=0;
					var totaligstamt=0;
					var ntamt=0;
					for ( var Count = 0; Count < pobj1.ltinvetorypurchaseorderitemmaster.length; Count++) {
						
						var inv_batch_stock_master_purchase_invoice_number=pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_master_purchase_invoice_number;
						if(inv_batch_stock_master_purchase_invoice_number =="" || inv_batch_stock_master_purchase_invoice_number==null){
							inv_batch_stock_master_purchase_invoice_number="-";
						}
						totaldiscount=totaldiscount +  pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_per;
				//		netamount=netamount +  pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_base_amount;
						totaldiscountamt=totaldiscountamt +  pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_discount_amount;
		            	totaltxamt=totaltxamt +  pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess;
						//alert(totaltxamt);
		            	if(hosState == pobj1.ltinvetorypurchaseorderitemmaster[Count].txtstateid){
						  var    totalgstamt = pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess/2;
						  var totalgst = pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount/2;
						    cgst         = Number(totalgst).toFixed(2);
						    cgsramt      = Number(totalgstamt).toFixed(2);
							sgst         = Number(totalgst).toFixed(2);
							sgstamt      = Number(totalgstamt).toFixed(2);
							totalcgst    = (totalcgst) + ( totalgst );
							totalcgstamt = totalcgstamt + totalgstamt;
							totalSgst    = totalSgst + totalgst;
							totalSgstamt = totalSgstamt + totalgstamt;
							ntamt = Number( pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_base_amount).toFixed(2);
						}else{
							 igstamt      = Number( pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess).toFixed(2);
							 igst         = Number( pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount ).toFixed(2);
							 totaligst    = totaligst +  pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount ;
							 totaligstamt = totaligstamt +  pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess;
						    ntamt = Number(pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_base_amount).toFixed(2);

						}
		            //	alert(totalcgst);
		            	netamount=netamount + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_tax_amount_rupess + pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_base_amount;
				 htm= htm	+"<tr id='deleterow"
										+ srNumber
										+ "'> "
										+"<td>"
										+srNumber
										+ "</td>"
										+"<td>"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_createdatemaster
										+ "</td>"
										+"<td>"
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].suppliername
										+ "</td>"
										+"<td>"
										+ inv_batch_stock_master_purchase_invoice_number
										+ "</td>"
										+ " <td> "
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_item_name
										+"</td>"
										+ " <td> "
										+ pobj1.ltinvetorypurchaseorderitemmaster[Count].hsn
										+"</td>"
										+ " <td> "
										+ Number( pobj1.ltinvetorypurchaseorderitemmaster[Count].netamt  ).toFixed(2)
										+"</td>"
										+ " <td> "
										+  Number( pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_Item_trade_discount_per ).toFixed(2)
										+"</td>"
										+ " <td> "
										+ Number( pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_discount_amount).toFixed(2)
										+"</td>"
										+ " <td> "
										+ ntamt
										+"</td>"
										+ " <td> "
										+ Number( pobj1.ltinvetorypurchaseorderitemmaster[Count].inv_batch_stock_item_trade_base_amount ).toFixed(2)
										+"</td>"
										+ " <td> "
										+ cgst
										+"</td>"
										+ " <td> "
										+ cgsramt
										+"</td>"
										+ " <td> "
										+ sgst
										+"</td>"
										+" <td> "
										+ sgstamt
										+"</td>"
										+" <td> "
										+ igst
										+"</td>"
										+" <td> "
										+ igstamt
										+"</td>"
										+" <td> "
										+ 0.0
										+"</td>"
										+" <td> "
										+ 0.0
										+"</td>"
										+" </tr>";
						
						
					
				$("#RowCount").val(srNumber);
				srNumber++;
				test++;
				igstamt=0.0;
				igst=0.0;
				sgstamt=0.0;
				sgst=0.0;
				cgsramt=0.0;
				cgst=0.0;
					}
				if(isNaN(totaldiscountamt) ){
					totaldiscountamt=0.00;
				}	
				if(isNaN(netamount) ){
					netamount=0.00;
				}
				if(isNaN(totaltxamt) ){
					totaltxamt=0.00;
				}
				
				if(isNaN(totalcgst) ){
					totalcgst=0.00;
				}
				if(isNaN(totalcgstamt) ){
					totalcgstamt=0.00;
				}
				if(isNaN(totalSgst) ){
					totalSgst=0.00;
				}
				if(isNaN(totalSgstamt) ){
					totalSgstamt=0.00;
				}
				if(isNaN(totaligst) ){
					totaligst=0.00;
				}
				if(isNaN(totaligstamt) ){
					totaligstamt=0.00;
				}
			
            var htm1="<tr> <td align='left' colspan='6'>Total</td><td></td><td></td>" +
            		"<td>"+  Number( totaldiscountamt ).toFixed(2) +"</td><td>"+  Number( netamount ).toFixed(2) +"</td><td>"+ Number( totaltxamt ).toFixed(2)+ "</td><td>"+  Number( totalcgst ).toFixed(2) +"</td>" +
            		"<td>"+   Number( totalcgstamt ).toFixed(2)+"</td><td>"+  Number( totalSgst ).toFixed(2) +"</td><td>"+   Number( totalSgstamt ).toFixed(2)+"</td><td>"+  Number( totaligst  ).toFixed(2) +"</td><td>"+ Number( totaligstamt ).toFixed(2)+"</td><td>0.00 </td><td>0.00</td></tr>";
					$("#purchasedetailswithgst").html(htm+ htm1 );
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
		
		}
	}
}
var hos=0;
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

function getReportForGST(){
	
	window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$="reportListwithgst"]').html()));
	 e.preventDefault();
}



function autoSuggestionForLocation(inputID, typeauto) {
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];
	$("#subInventoryId").val('0');
	var txtVal1 = $('#' + inputID).val();
	// alert("text value is:"+txtVal1);

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchLocationAndNameAtuosugg');
		inputs.push('txtVal=' + txtVal1);
		inputs.push('isEdit=no');
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
						// alert(r);
						// alert(r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.ltSubInventoryDTO.length; i++) {
								availableTags
										.push(ajaxResponse.ltSubInventoryDTO[i].subinventory_name
												+ "_"
												+ ajaxResponse.ltSubInventoryDTO[i].subinventory_Id);
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
									onSelect : displayResult1,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult1(item) {
			$('#' + inputID).val(item.text);
			$("#subInventoryId").val(item.value);

		}

	}

}
function viewsUBinvDetailsReport() {
	var fdate     =	$("#popup_container2").val();
	var todate    =	$("#popup_container3").val();
	var venderid  =	$("#subInventoryId").val();
	var hiddenItemIdforAutSgn =	$("#hiddenItemIdforAutSgn").val();
	if(venderid==0){
		alert("Please Enter Subinventory Name!!!");
		return false;
	}
	if(hiddenItemIdforAutSgn==0){
		alert("Please Enter Item Name!!!");
		return false;
	}
	var inputs = [];
	inputs.push('action=FetchSubinv_Report');
	inputs.push('todate=' + todate );
	inputs.push('fdate=' + fdate);
	inputs.push('venderid=' + venderid);
	inputs.push('hiddenItemIdforAutSgn=' + hiddenItemIdforAutSgn);
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
		var stock = 0;			
		var htm="";
					for ( var Count = 0; Count < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; Count++) {
						
						stock =  parseInt(stock) +   parseInt(pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[Count].mrn_item_info_slave_item_selItemQty) ;
				 htm= htm	+"<tr id='deleterow"
										+ srNumber
										+ "'> "
										+"<td>"
										+srNumber
										+ "</td>"
										+"<td>"
										+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[Count].mrn_item_info_slave_item_name
										+ "</td>"
										+"<td>"
										+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[Count].mrn_item_info_slave_item_selItemQty
										+ "</td>"
										/*+"<td>"
										+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[Count].mrn_item_info_slave_create_date
										+ "</td>"*/
										+ " <td> "
										+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[Count].inv_mrn_item_info_slave_subinventory
										+"</td>"
										+ " <td> "
										+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[Count].currentuserName
										+"</td>"
										+ " <td> "
										+  pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[Count].mrn_item_info_slave_create_date  
										+"</td>"
										+ " <td> "
										+   pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[Count].currentuserName 
										+"</td>"
										+ " <td> "
										+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[Count].inv_mrn_item_info_slave_subinventory_consumption_date
										+"</td>"
										+" </tr>";
						
						
				 srNumber++;
					}

		            var htm1="<tr> <td align='left' colspan='2'>Total Stock</td><td>"+ stock +"</td><td></td>" +
		            		"<td></td><td></td><td></td><td></td>" +
		            		"</tr>";
							$("#purchasedetailswithgst").html(htm+ htm1 );
						
					
				}
			});
	}


