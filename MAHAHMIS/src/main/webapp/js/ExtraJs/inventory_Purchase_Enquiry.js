var rowCount = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;

/**auto suggestion code party NAMES for purchase Enquiry ** Author:sudhir @date:16may2016 **/
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
/* addInvPartyName for Purchase Enquiry @Author:sudhir @Date:16may2016 **/
function addInvPartyName() {

	var pid = $("#hiddenPartyId").val();
	var pName = $("#txtPurchaseQuotationSupplierName").val();
	if (pid == 0 || pid == '') {
		alert("Please Select Party Name.");
		return false;
	}
	var add = pName;
	var partyid = pid;
	var NameId=add+"_"+partyid;
	var flag = 1;
	$('#lstBoxforTax').find('option').each(function() {
		if ($(this).html() == add) {
			alert("Party Is Present In List");
			flag = 0;
		}
	});
	if (flag == 1) {
		var o = new Option("option text", "value");
		var o1 = new Option("option text", "value");
		// jquerify the DOM object 'o' so we can use the html method
		$(o).html(add);
		$(o).val(partyid);
		
		$("#lstBoxforTax").append(o);			
		$("#hiddenPartyId").val("");
		$("#txtPurchaseQuotationSupplierName").val("");
	}	
}



function emptyValue() {
	$("#txtPurchaseQuotationSupplierName").val("");
}
/* removeInvPartyName for Purchase Enquiry @Author:sudhir @Date:16may2016 **/
function removeInvPartyName() {

	$('#lstBoxforTax option:selected').remove();

}

/**toCreateDiv For purchase Enquiry @Author:Sudhir @DAte:16may2016 ***/
function toCreateDiv() {
	
	$('#iHidePurQtnBtn').css('display','block');
	$("#closeonclick").hide();
	if (test > 0 && isNew > 0) 
	{		
		if (rowCount == 1)
		{			
			rowCount = test;
		}		

		rowCount++;

		$("#ItemInfoTable > tbody")
				.append(
						"<tr id='deleterow"
								+ rowCount
								+ "'> <td style='text-align: center'> <input type='checkbox' checked='checked' name='checkbox"
								+ rowCount
								+ "' id='checkbox"
								+ rowCount
								+ "'/></td><td style='text-align: center'>"
								+ rowCount
								+ "  <input type='hidden' id='rowcountid"
								+ rowCount
								+ "' value ="
								+ rowCount
								+ "> </td>"
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
								+ rowCount
								+ "' onkeyup='auto(this.id,onchange)' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ rowCount
								+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ rowCount
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationExpectedDate"
								+ rowCount
								+ "' onkeyup='totalAmount(this.id,"
								+ rowCount
								+ ")' onclick ='getExpectedDate(this.id,"
								+ rowCount
								+ ")';></td> "
								+ "<td><input type='text' class='form-control input-SmallText' style='float: left;width: 67%' id='txtPurchaseQuotationleadtime"
								+ rowCount
								+ "'> <select id='ileadtimeselector"+rowCount+"'> <option value=''>Select</option> <option value='hours'>Hours</option><option value='days'>Days</option> <option value='months'>Months</option></select></td>"							
								+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseEnquiryMinCost"
								+ rowCount
								+ "'   ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseEnquiryMaxCost"
								+ rowCount
								+ "'></td> "
								+ " </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload");		
	} 
	else
	{		
		$("#ItemInfoTable > tbody")
		.append(
				"<tr id='deleterow"
						+ rowCount
						+ "'> <td style='text-align: center'> <input type='checkbox' checked='checked' name='checkbox"
						+ rowCount
						+ "' id='checkbox"
						+ rowCount
						+ "'/></td><td style='text-align: center'>"
						+ rowCount
						+ "  <input type='hidden' id='rowcountid"
						+ rowCount
						+ "' value ="
						+ rowCount
						+ "> </td>"
						+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
						+ rowCount
						+ "' onkeyup='auto(this.id,onchange)' />"
						+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
						+ rowCount
						+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
						+ rowCount
						+ "' value='0'/></div></td> "
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationExpectedDate"
						+ rowCount
						+ "' onclick = 'getExpectedDate(this.id,"
						+ rowCount
						+ ")'; ></td> "
						+ "<td><input type='text' class='form-control input-SmallText' style='float: left;width: 67%' id='txtPurchaseQuotationleadtime"
						+ rowCount
						+ "'> <select id='ileadtimeselector"+rowCount+"'> <option value=''>Select</option> <option value='hours'>Hours</option><option value='days'>Days</option> <option value='months'>Months</option></select></td>"							
						+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseEnquiryMinCost"
						+ rowCount
						+ "'   ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseEnquiryMaxCost"
						+ rowCount
						+ "'></td> "
						+ " </tr>");

		$("#RowCount").val(rowCount);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
		rowCount++;
	}

}


/**toRemoveDivStock For purchase Enquiry @Author:Sudhir @DAte:16may2016 ***/
function toRemoveDivStock(RowCount) {
	var hiddenRowCount = document.getElementById(RowCount).value;
	// alert(hiddenRowCount);
	// var rowCount = hiddenRowCount.value;
	var temp = hiddenRowCount;

	var totaltblsize = $("#totaltblsize").val();

	var p = 1;
	for ( var i = 0; i < totaltblsize-1; i++) {

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


/**** AutoSuggestion Code for item for purchase Enquriy @author sudhir @Date16may2016 **** */

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
			//addInvPartyName();
/*
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
								
								
								$('#txtPurchaseQuotationDocQuantity' + idValue)
										.val(
												ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);
								
								//$('#txtPurchaseQuotationPendingQuantity' + idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].order_stock);
								$('#txtPurchaseQuotationDocQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								$('#txtPurchaseQuotationPendingQuantity'+ idValue).val(ajaxResponse.inventoryitempurchaseandItemMasterDTOs[i].hiddenFactorValue);
								
								
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
								$("#txtPurchaseQuotationTaxCode_"+idValue).append(option);
									}
								
								//$('#txtPurchaseQuotationDocQuantity' + idValue);
								totalAmount();
								$("#txtPurchaseQuotationTaxAmount"+idValue).val(sumofRate);
								break;

							}
						}
					});*/

		}
	}
}


/***** fetchDocuNameforPurchaseEnquiry  @Date 17May2016 @author sudhir ******/

function fetchDocuNameforPurchaseEnquiry() {
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

			$("#selDocName").setTemplate(selInventoryDocumentTemplatePO);
			$("#selDocName").processTemplate(pobj1);

		}
	});
}

/***** selInventoryDocumentTemplatePO  @Date 17May2016 @author sudhir ******/
var selInventoryDocumentTemplatePO = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.lstDocumentNUmberDto as lstDocumentNUmberDto}"
	+"{#if $T.lstDocumentNUmberDto.document_series == 'Purchase Enquiry'}"
	+ "<option  value='{$T.lstDocumentNUmberDto.document_numbering_id}'>{$T.lstDocumentNUmberDto.document_series}</option>"
	+ "{#/for}";

/***** getSeries  @Date 17May2016 @author sudhir ******/
function getSeries(id) {
	var obj = $("#AjaxResopnse").html();
	var txtId = $('#txtPurchaseEnquiryDocNo').val();
	objDocument = JSON.parse(obj);

	for ( var i = 0; i < objDocument.lstDocumentNUmberDto.length; i++) {
		if (objDocument.lstDocumentNUmberDto[i].document_numbering_id == id) {
			$("#txtPurchaseEnquiryDocSeries").val(
					objDocument.lstDocumentNUmberDto[i].document_prefix +objDocument.lstDocumentNUmberDto[i].document_number +txtId+objDocument.lstDocumentNUmberDto[i].document_suffix);

		}
	}
}


/***** getExpectedDate @date16may2016 @author Sudhir*******/
function getExpectedDate(inputID)
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

/*** save Purcahse Enquiry @Date 16may2016 @Author :sudhir ********/
function savePurchaseEnqiry() {
	var txtPurchaseEnquiryDocNo = $("#txtPurchaseEnquiryDocNo").val();
	var txtPurchaseEnquiryDate = $("#txtPurchaseEnquiryDate1").val();
	var txtPurchaseEnquiryExpiryDate = $("#txtPurchaseEnquiryExpiryDate1").val();
	var txtPurchaseEnquiryDocSeries = $("#txtPurchaseEnquiryDocSeries").val();
	
	var chkPurchaseEnquirySms=0;
	var chkPurchaseEnquiryEmail=0;	
	
	if($("#chkPurchaseEnquirySms").prop("checked"))
	{		
		chkPurchaseEnquirySms=1;		
	}
	if($("#chkPurchaseEnquiryEmail").prop("checked"))
	{
		chkPurchaseEnquiryEmail=1;		
	}
	
	
	var suppliersList = new Array();	
	var rowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
		
	if(txtPurchaseEnquiryDate == "" || txtPurchaseEnquiryDate == null)
	{
		alert("Please enter enquiry date");
	 	$("#txtPurchaseEnquiryDate1").focus();
	 	return false;
	}
	/*if(txtPurchaseEnquiryExpiryDate == "" || txtPurchaseEnquiryExpiryDate == null)
	{
		alert("Please enter expiry date");
	 	$("#txtPurchaseEnquiryExpiryDate1").focus();
	 	return false;
	}*/
	if(txtPurchaseEnquiryDocSeries == "" || txtPurchaseEnquiryDocSeries == null)
	{
		alert("Please enter enquiry document series");
	 	$("#txtPurchaseEnquiryDocSeries").focus();
	 	return false;
	}
	
	var ddl = document.getElementById('lstBoxforTax');	
	
	
	for ( var i = 0; i < ddl.options.length; i++) {
		suppliersList[i] = ddl.options[i].value;		
	}
		
	
	if(ddl.options.length == 0)
	{
		alert("Please enter enquiry suppliers name");
	 	$("#txtPurchaseEnquiryDocSeries").focus();
	 	return false;
	}
	
	var materiallist = {
			ltInventoryEnquiryItemSlaveDTOs : []
		};
	
	for(var i=0; i<totaltblsize; i++)
	{
		for ( var i = 1; i <= totaltblsize-1; i++) {
			if ($("#txtPurchaseQuotationItemNumber" + i).val() != null && $("#txtPurchaseQuotationItemNumber" + i).val() != undefined ) {
				
				var txtItemCode = $("#txtPurchaseQuotationItemNumber" + i).val();
				var txtItemName = $("#txtPurchaseQuotationItemName_" + i).val();
				var txtPurchaseQuotationExpectedDate= $("#txtPurchaseQuotationExpectedDate" + i).val();
				
				var txtInvpurchaseCommonItemMasterId = $("#txtInvpurchaseCommonItemMasterId"+i).val();
												
				var txtPurchaseQuotationleadtime=$("#txtPurchaseQuotationleadtime" + i).val();
				var ileadtimeselector = $("#ileadtimeselector"+i+" option:selected").text();
				
				var txtPurchaseEnquiryMinCost=$("#txtPurchaseEnquiryMinCost" + i).val();
				var txtPurchaseEnquiryMaxCost=$("#txtPurchaseEnquiryMaxCost" + i).val();
				
				if(txtItemName == "" || txtItemName == null)
				{
					alert("Please enter item name at row "+i);
				 	$("#txtPurchaseQuotationItemName_" + i).focus();
				 	return false;
				}
				if(txtPurchaseQuotationExpectedDate == "" || txtPurchaseQuotationExpectedDate == null)
				{
					alert("Please enter expected date at row "+i);
				 	$("#txtPurchaseQuotationExpectedDate"+i).focus();
				 	return false;
				}
				if(txtPurchaseQuotationleadtime == "" || txtPurchaseQuotationleadtime == null)
				{
					alert("Please enter lead time at row "+i);
				 	$("#txtPurchaseQuotationleadtime"+i).focus();
				 	return false;
				}
				/*if(txtPurchaseEnquiryMinCost == "" || txtPurchaseEnquiryMinCost == null)
				{
					alert("Please enter minimum cost at row "+i);
				 	$("#txtPurchaseEnquiryMinCost"+i).focus();
				 	return false;
				}
				if(txtPurchaseEnquiryMaxCost == "" || txtPurchaseEnquiryMaxCost == null)
				{
					alert("Please enter maximum cost at row "+i);
				 	$("#txtPurchaseEnquiryMamCost"+i).focus();
				 	return false;
				}*/
				
				materiallist.ltInventoryEnquiryItemSlaveDTOs
				.push({

					// inv_purchase_common_item_code:,
					purchaseEnquiryItemCode : txtItemCode,
					purchaseEnquiryItemName:txtItemName,
					purchaseEnquiryExpectedDate : txtPurchaseQuotationExpectedDate,

					purchaseEnquiryLeadtime : txtPurchaseQuotationleadtime,
					purchaseEnquiryLeadtimeInwords:ileadtimeselector,
					purchaseEnquiryMinCost : txtPurchaseEnquiryMinCost,
					purchaseEnquiryMaxCost : txtPurchaseEnquiryMaxCost,
					purchaseEnquiryItemMasterId : txtInvpurchaseCommonItemMasterId,
					purchaseEnquiryMasterId : txtPurchaseEnquiryDocNo,
				});

			}
	}
		var li = materiallist.ltInventoryEnquiryItemSlaveDTOs.length;
		if(li == 0)
		{
			alert("Please enter atleast one Item row to Save Purcahse Enquiry");
			return false;
		}
		
	materiallist = JSON.stringify(materiallist);
				 
	}
	var inputs = [];

	inputs.push('action=SavePurchaseEnquiry');
	inputs.push('materiallist='+materiallist);
	inputs.push('txtPurchaseEnquiryDocNo='+txtPurchaseEnquiryDocNo);
	inputs.push('txtPurchaseEnquiryDate='+txtPurchaseEnquiryDate);	
	inputs.push('txtPurchaseEnquiryExpiryDate='+txtPurchaseEnquiryExpiryDate);
	inputs.push('suppliersList='+suppliersList);	
	inputs.push('chkPurchaseEnquirySms='+chkPurchaseEnquirySms);	
	inputs.push('chkPurchaseEnquiryEmail='+chkPurchaseEnquiryEmail);	
	
	var supIds=new Array();
	var len=suppliersList.length;
	var supId;
	
	if(len>0)
	{
		for(var i=0;i<len;i++)
		{
			var SplitChars = '_';
			supId = suppliersList[i].split(SplitChars);				
			supIds[i]=supId[1];			
		} 	
	}
	
	inputs.push('suppliersIdList='+supIds);	
	
	/*inputs.push('suppliersIdList='+supIds);	*/
	inputs.push('txtPurchaseEnquiryDocSeries='+txtPurchaseEnquiryDocSeries);
	//return false;
	var str =inputs.join('&');
	jQuery.ajax({
		async:true,
		type:"POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() 
		{
			alert("error");
			purchaseEnquiryViewRefresh();
			window.location.reload();
			openProcessdQuotation();
		},
		success : function(r) {
			ajaxResponse = r;
			
			//splitSupliersList(suppliersList);
			
			alert(r);
			purchaseEnquiryViewRefresh();
			window.location.reload();
			openProcessdQuotation();
			//$("#txtPurchaseQuotationDocNo").val(r);
		}
	});	  
	
}

/***** get Next EnquiryId @date21sep2016 @author Vinod*******/

function getNextEnquiryId() {
	
	var inputs = [];
	inputs.push('action=getQuotationNextId');
	inputs.push('tableName=inv_purchase_qtn_enquiry_master');
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
			$("#txtPurchaseEnquiryDocNo").val(r);
		}
	});
}



/***** fetch Purchase Enquiry Master @date23sep2016 @author Vinod*******/
function fetchPurchaseEnquiryMasterNew(enqId,loadOn)
{
	var inputs = [];
	if(loadOn == "onload")
	{
		inputs.push('isEdit=no');		
		inputs.push('enqId=undefined');
	}
	if( loadOn =="onClick")
	{
		inputs.push('isEdit=yes');
		inputs.push('enqId=undefined');
	}
	if(loadOn == "search")
	{
		inputs.push('isEdit=search');
		inputs.push('enqId='+enqId);
	}
	
	inputs.push('action=fetchPurchaseEnquiryMaster');	
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
			
			if (pobj1.ltInventoryEnquiryMasterDTOs.length > 0) 
			{  
				counterEnquiryMaster=1;
				$("#documentContent").setTemplate(inventoryPurchaseEnquiryMaster);
				$("#documentContent").processTemplate(pobj1);
				$("#docuemntAjaxResp").html(r);					
				$('#byMrnId').val("");				
			} 
			else 
			{
				if(loadOn == "search")
				{
					alert("Record not found..!");					
				}
				if(loadOn == "onload")
				{
					$("#documentContent").setTemplate(inventoryPurchaseEnquiryMaster);
					$("#documentContent").processTemplate(pobj1);
					$("#docuemntAjaxResp").html(r);			
				}
				if(loadOn == "onClick")
				{
					$("#documentContent1").setTemplate(inventoryPurchaseEnquiryMaster);
					$("#documentContent1").processTemplate(pobj1);
					$("#docuemntAjaxResp1").html(r);					
				}
				//openProcessdQuotation();
				$('#byMrnId').val("");	
			}			
		}
	});
}
var counterEnquiryMaster=1;
var inventoryPurchaseEnquiryMaster = "<table class='table table-striped table-bordered header-fixed cf' style='width: 100%;height:50%;'>"
	+ "<thead class='cf' style='background: white;'>"
	+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Enquiry Id</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Enquiry Date</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Expiry Date</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Document Series</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-4 center'><div>Generator Name</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Print</div></th> </tr></thead>"
	+ "{#foreach $T.ltInventoryEnquiryMasterDTOs as ltInventoryEnquiryMasterDTOs}"
	+ "<tr>"
	+ "<td class='col-md-1 center table-bordered' id='id{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryMasterId}'>{counterEnquiryMaster++}</td>"
	+ "<td class='col-md-1 center table-bordered' id='id{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryMasterId}'>{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryMasterId}</td>"
	+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryDate}'>{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryDate}</td>"
	+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryExpiryDate}'>{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryExpiryDate}</td>"
	+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryDocSeries}'>{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryDocSeries}</td>"
	+ "<td class='col-md-2 center table-bordered' id='desc{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryGeneratorName}'>{$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryGeneratorName}</td>"
	+ "<td class='col-md-1 center table-bordered' ><button id='btnEdit' type='button' class='btn btn-xs btn-success' data-toggle='modal' data-target='#Purchase_Quotation_Form' onclick='viewPurchaseEnquiryMaster({$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryMasterId})'>"
	+ "<i class='fa fa-edit'></i></button></td>"
	+ "<td class='col-md-1 center'><button id='btnDelete' type='button' class='btn btn-xs btn-danger' onclick=\"deletePurchaseEnquiryMaster({$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryMasterId})\">"
	+ "<i class='fa fa-trash-o'></i></button></td>"
	+ "<td class='col-md-1 center'><button value='Ptint' onclick='printPurchaseEnquiryDetails({$T.ltInventoryEnquiryMasterDTOs.purchaseEnquiryMasterId})' data-toggle='modal' class='btn btn-xs btn-success' id='btnEdit2'><i class='fa fa-print'></i></button></td"
	+ "</tr>{#/for}</table>";



/***** viewPurchaseEnquiryMasterNew @date23sep2016 @author Vinod*******/
function viewPurchaseEnquiryMaster(enqId)
{
	purchaseEnquiryViewRefresh();
	var obj = $("#docuemntAjaxResp").html();
	var objPurchase = eval('(' + obj + ')');
	
	var myObj = "";
	for ( var rowCount = 0; rowCount < objPurchase.ltInventoryEnquiryMasterDTOs.length; rowCount++)
	{
		if (objPurchase.ltInventoryEnquiryMasterDTOs[rowCount].purchaseEnquiryMasterId == enqId) 
		{			 
			myObj = objPurchase.ltInventoryEnquiryMasterDTOs[rowCount];
			break;
		}
	}
	
	$("#txtPurchaseEnquiryDocNo").val(myObj.purchaseEnquiryMasterId);
	$("#txtPurchaseEnquiryDate1").val(myObj.purchaseEnquiryDate);
	$("#txtPurchaseEnquiryExpiryDate1").val(myObj.purchaseEnquiryExpiryDate);
	$("#txtPurchaseQuotationItemNumber").val(myObj.purchaseEnquiryItemCode);
	$("#txtPurchaseEnquiryDocSeries").val(myObj.purchaseEnquiryDocSeries);
	$("#selDocName option[value='14'").prop('selected', true);
	

	// To get Suppliers list in view @ Author : Vinod	
	
	for(var j=0;j<myObj.ltInventoryPartyMasterDTOs.length;j++)
	{
		var o = new Option("option text", "value");
		$(o).html(myObj.ltInventoryPartyMasterDTOs[j].party_master_name);
		$(o).val(myObj.ltInventoryPartyMasterDTOs[j].party_master_id);				
		$("#lstBoxforTax").append(o);
	}
	
	
	//alert(supList);
	
	// Code:start to split suppliers list first using ',' & then individual supplier with '_'
	/*var len=supList.length;
	var count=0;
	
	if (supList != null)
	{
		for(var k=0;k<=len;k++)
		{
			if(supList[k]==',')
			{
				count++;
			}	
		}
	}
	
	var supNameId=null;
	if(count>0)
	{
		var SplitChars = ',';
	    if (supList.indexOf(SplitChars) >= 0) 
		{
	    	supNameId = supList.split(SplitChars);			           
		}		
	}	
	else
	{
		supNameId=supList;
	}
	
	
	var supNameIdSep=null;
	if(count>0)
	{
		for(var i=0;i<=count;i++)
		{
			if (supNameId != null)
			{
				var SplitChars = '_';
				supNameIdSep = supNameId[i].split(SplitChars);	
				var supname_id=supNameIdSep[0]+"_"+supNameIdSep[1];
				var o = new Option("option text", "value");
				$(o).html(supNameIdSep[0]);
				$(o).val(supNameIdSep[1]);				
				$("#lstBoxforTax").append(o);				
			}						
		} 	
	}	
	else
	{
		supNameId=supList;
		var supname_id=null;
		if (supNameId != null)
		{
			var SplitChars = '_';
			supNameIdSep = supNameId.split(SplitChars);	
			supname_id=supNameIdSep[0]+"_"+supNameIdSep[1];
		}	
		var o = new Option("option text", "value");
		$(o).html(supNameIdSep[0]);
		$(o).val(supNameIdSep[1]);				
		$("#lstBoxforTax").append(o);
	}	*/
	// Code:end to split suppliers list first using ',' & then individual supplier with '_'
	
	var inputs = [];
	inputs.push('action=fetchPurchaseEnquiryItemSlaveDetail');
	inputs.push('isEdit=no');
	inputs.push('enqId=' + enqId);
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
				success : function(r) 
				{					
					pobj1 = eval('(' + r + ')');
					
					//fetchPurchaseQuotationMasterNew();
					rowCount = 1;
					for ( var Count = 0; Count < pobj1.ltInventoryEnquiryItemSlaveDTOs.length; Count++) {

						$('#iHidePurQtnBtn').css('display','block');
						$("#closeonclick").hide();					

							$("#ItemInfoTable > tbody")
									.append(
											"<tr id='deleterow"
													+ rowCount
													+ "'> <td style='text-align: center'> <input type='checkbox' name='checkbox"
													+ rowCount
													+ "' id='checkbox"
													+ rowCount
													+ "'/></td><td style='text-align: center'>"
													+ rowCount
													+ "  <input type='hidden' id='rowcountid"
													+ rowCount
													+ "' value ="
													+ rowCount
													+ "> </td>"	
													
													+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;' class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
													+ rowCount
													+ "' onkeyup='auto(this.id,onchange)' value='"+ pobj1.ltInventoryEnquiryItemSlaveDTOs[Count].purchaseEnquiryItemName+ "' />"
													+ "<input type='hidden'  id='txtInvpurchaseCommonItemMasterId"+rowCount+"' value='"+pobj1.ltInventoryEnquiryItemSlaveDTOs[Count].purchaseEnquiryItemMasterId+"'/>"
													
													+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"+rowCount+"'"													
													+ "value='"+ pobj1.ltInventoryEnquiryItemSlaveDTOs[Count].purchaseEnquiryItemCode+ "'/></div></td> "
													+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationExpectedDate"
													+ rowCount
													+ "' onkeyup='totalAmount(this.id,"
													+ rowCount
													+ ")' onclick ='getExpectedDate(this.id,"
													+ rowCount
													+ ")' value='"+ pobj1.ltInventoryEnquiryItemSlaveDTOs[Count].purchaseEnquiryExpectedDate+ "' ;></td> "
													+ "<td><input type='text' class='form-control input-SmallText' style='float: left;width: 67%' value='"+ pobj1.ltInventoryEnquiryItemSlaveDTOs[Count].purchaseEnquiryLeadtime+ "' id='txtPurchaseQuotationleadtime"
													+ rowCount
													+ "'> <select id='ileadtimeselector"+rowCount+"'> <option value='"+ pobj1.ltInventoryEnquiryItemSlaveDTOs[Count].purchaseEnquiryLeadtimeInwords+ "'>"+ pobj1.ltInventoryEnquiryItemSlaveDTOs[Count].purchaseEnquiryLeadtimeInwords+ "</option><option value=''>Select</option> <option value='hours'>Hours</option><option value='days'>Days</option> <option value='months'>Months</option></select></td>"							
													+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseEnquiryMinCost"
													+ rowCount
													+ "'  value='"+ pobj1.ltInventoryEnquiryItemSlaveDTOs[Count].purchaseEnquiryMinCost+ "' ></td> <td><input type='text' class='form-control input-SmallText' id='txtPurchaseEnquiryMaxCost"
													+ rowCount
													+ "' value='"+ pobj1.ltInventoryEnquiryItemSlaveDTOs[Count].purchaseEnquiryMaxCost+ "'></td> "
													+ " </tr>");

							$("#RowCount").val(rowCount);
							var totaltblsize = $("#RowCount").val();
							$("#totaltblsize").val(totaltblsize);
							auto("txtPurchaseQuotationItemName_" + rowCount, "onload");
							//autotaxCodeQouetaion("txtPurchaseQuotationTaxCode_" + rowCount, "onload");
							rowCount++;	
							test++;
						
					}
					
					toCreateDiv();
					// auto("txtPurchaseQuotationItemName_","onload");
					//totalDocQtyPQ();
					//totalDocDiscountPQ();

					var txtEmptyItem = $("#txtEmptyItem").val();
					//auto(txtEmptyItem, "onload");

					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
				}
			});	
	
}

/***** Delete PurchaseEnquiryMaster @date23sep2016 @author Vinod*******/
function deletePurchaseEnquiryMaster(id)
{
	var didConfirm = confirm("Are you sure to delete record?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deletePurchaseEnquiryMaster');
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
				openProcessdQuotation();
			}
		});
	}
}

/***** Search By EnquiryId PurchaseEnquiryMaster view @date27sep2016 @author Vinod*******/
function fetchPurchaeseEnquiriesforSearch() {

	var enquiryId = $("#byMrnId").val();
	
	if((enquiryId == ""))
	{
		alert("Please Enter Enquiry Id for search");
		return false;
	}	
	else
	{
		fetchPurchaseEnquiryMasterNew(enquiryId,"search");		
	}	
}

/****************** Active Proccesd Enquiries color  Author :Vinod Date:28/09/2016 ****************/
function openProcessdQuotation() {
	$("#ExpiredQuotation").css("background-color", "");
	$("#processdQuotation").css("background-color", "#81A981");
	$("#ExpiredQuotation").css("color", "black");
	$("#processdQuotation").css("color", "white");
	fetchPurchaseEnquiryMasterNew("no","onload");
}

/****************** Active Proccesd Enquiries color  Author :Vinod Date:28/09/2016 ****************/
function openExpiryQuotation() {
	$("#processdQuotation").css("background-color", "");
	$("#ExpiredQuotation").css("background-color", "#81A981");
	$("#processdQuotation").css("color", "black");
	$("#ExpiredQuotation").css("color", "white");
	fetchPurchaseEnquiryMasterNew("no","onClick");
}


/***** Refresh PurchaseEnquiryMaster view @date23sep2016 @author Vinod*******/
function purchaseEnquiryViewRefresh() {
	$('#Purchase_Quotation_Form').find('input:text').val('');
	$('#Purchase_Quotation_Form').find('textarea').val('');
	$('#Purchase_Quotation_Form').find('input:hidden').val('');	
	$('#lstBoxforTax option').each(function(index, option) {
	    $(option).remove();
	});
	$("#ItemInfoTable > tbody").html('');
	$('#ItemInfoTable').find('input:text').val('');
	$("#ItemInfoTable > tbody").html('');
	$("#txtVendorCode").val('');
	$("#RowCount").val('');
	$('#iHidePurQtnBtn').css('display','none');
	//$('#closeonclick').css('display','block');
	isNew = 1;
	test=0;
	rowCount=1;
	//getNextEnquiryId();
}

/***** Split Suppliers List @date3Oct2016 @author Vinod*******/
function splitSupliersList(supList) {
	
	alert(supList);
	
	var supIds=new Array();
	var len=supList.length;
	
	var supNameIdSep=null;
	if(len>0)
	{
		for(var i=0;i<len;i++)
		{
			var SplitChars = '_';
			supNameIdSep = supList[i].split(SplitChars);				
			supIds[i]=supNameIdSep[1];
		} 	
	}	
}

//* open purchase enquiry print popup Author Vinod @Date 05/10/2016 */ 
function printPurchaseEnquiryDetails(enqId)
{	
	getSuppliersForPrint(enqId);
	$("#purchaseEnquiryPrint").show();
	$("#txtPurchaseEnquiryDocNo").val(enqId);
}

//* close purchase enquiry print popup Author Vinod @Date 05/10/2016 */ 

function hidepurEnqiryPrint()
{
	$("#purchaseEnquiryPrint").hide();
	
	$(".check-uncheck").each(function() 
		{
	 		$(this).attr("checked",false);
	});	
	$("#txtPurchaseEnquiryDocNo").val(0);
}

//* check all suppliers Author Vinod @Date 05/10/2016  */

function checkAllPurEnquiries()
{
	$(".check-uncheck").each(function() 
	{
 		$(this).attr("checked",true);
	});
}

//* uncheck all suppliers Author Vinod @Date 05/10/2016  */

function uncheckAllPurEnquiries()
{
	$(".check-uncheck").each(function() 
	{
 		$(this).attr("checked",false);
	});
}


//* multiple purchase enquiry Prints supplierwise Author Vinod @Date 05/10/2016 */

function printPurchaseEnquiryVendorsWise() {
	var purEnquiryMasterId = $("#txtPurchaseEnquiryDocNo").val();
	
	var obj = $("#docuemntAjaxResp").html();	
	objPurchase = JSON.parse(obj);
	var myObj = "";
	for ( var rowCount = 0; rowCount < objPurchase.ltInventoryEnquiryMasterDTOs.length; rowCount++) 
	{
		if (objPurchase.ltInventoryEnquiryMasterDTOs[rowCount].purchaseEnquiryMasterId == purEnquiryMasterId) 
		{			
			myObj = objPurchase.ltInventoryEnquiryMasterDTOs[rowCount];
			var supList= myObj.purchaseEnquirySuppliersId;
			var enquiryDate= myObj.purchaseEnquiryDate;
			var enquiryDocSeries= myObj.purchaseEnquiryDocSeries;
			
			//alert(suppliers);
			var supSepByComma=new Array();
			var len=supList.length;
			if(supList!=null || len>0)
			{
				supSepByComma=supList.split(',');
			}
			
			var supSepByUnder=new Array();	
			var sepLen=supSepByComma.length;
			var count=1;
			if(sepLen>0)
			{
				for(var i=0;i<sepLen;i++)
				{
					supSepByUnder = supSepByComma[i].split('_');
					
					var supplier = $('input:checkbox[name="sup'+count+'"]');					
					if(supplier.is(':checked') == true)
					{						
						window
						.open("inventory_purchase_enquiry_print.jsp?txtPurchaseEnquiryId="
								+ purEnquiryMasterId
								+ "&txtPurchaseEnquiryDate="
								+ enquiryDate
								+ "&txtPurchaseDocSeries="
								+ enquiryDocSeries
								+ "&txtSupplierName="
								+ supSepByUnder[0]);
					}
					count++;
				}
			}
		}	
	}	
}

//* Supplier Names on popup Author Vinod @Date 05/10/2016 */

function getSuppliersForPrint(enqId)
{	
	var obj = $("#docuemntAjaxResp").html();	
	objPurchase = JSON.parse(obj);
	var myObj = "";
	for ( var rowCount = 0; rowCount < objPurchase.ltInventoryEnquiryMasterDTOs.length; rowCount++) 
	{
		if (objPurchase.ltInventoryEnquiryMasterDTOs[rowCount].purchaseEnquiryMasterId == enqId) 
		{
			myObj = objPurchase.ltInventoryEnquiryMasterDTOs[rowCount];
			var supList= myObj.purchaseEnquirySuppliersId;
			
			//alert(suppliers);
			var supSepByComma=new Array();
			var len=supList.length;
			if(supList!=null || len>0)
			{
				supSepByComma=supList.split(',');
			}
			
			var supSepByUnder=new Array();	
			var sepLen=supSepByComma.length;
			var count=1;
			var divContent="";
			if(sepLen>0)
			{
				for(var i=0;i<sepLen;i++)
				{
					supSepByUnder = supSepByComma[i].split('_');
					
					divContent=divContent+
					"<tr id='deleterow"+count+ "'>" +
					"<td style='text-align: left'> <input type='checkbox' class='check-uncheck' name='sup"+count+"' id='sup"+count+"' value='"+supSepByUnder[0]+"'/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+supSepByUnder[0]+"</td>" +
									
					" </tr>";
										
				
					
					count++;
				} 
				$("#SupplerNamesTable > tbody")
				.html(divContent);
			}			
		}
	}
}

