var count = 1;
var test = 0;

/*var inventoryMRNTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
		+ "<th ' class='col-md-2 center'><div>MRN Doc No</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Qty</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>status</div></th> </tr> </thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}<tr><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_doc_no}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_total_qty}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#Purchase_Request' onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='submit'   onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-edit'></i></button></td> <td id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td></tr>{#/for}</table>"
*/
/*<td><button id='btIssue' class='btn btn-xs btn-success' onclick=\"issueMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='issue'><i class='fa fa-edit'></i></button></td> <td>
*/		
	
		var SrNo =1;
		var inventoryMRNTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 98%;'>"
			+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
			+ "<th style='height: 21.5px;' class='col-md-2 center'><div>MRN Date</div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Dispatch Date </div></th><th style='height: 21.5px;' class='col-md-2 center'><div>MRN Remark</div></th>  <th style='height: 21.5px;' class='col-md-2 center'><div>Subinventory Name </div></th>  <th style='height: 21.5px;' class='col-md-2 center'><div> Mrn Raised By </div></th>  <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th><th style='height: 21.5px;' class='col-md-1 center'><div>Delete</div></th>"
			+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Status</div></th> </tr> </thead>"
			+ "{#foreach $T.inventoryMaterialRequestNoteMasterDTO as inventoryMaterialRequestNoteMasterDTO}<tr class='center'>{#if $T.inventoryMaterialRequestNoteMasterDTO.mrn_status == 'open'|| $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='InProcess'|| $T.inventoryMaterialRequestNoteMasterDTO.mrn_status =='dispatch'}<td>{SrNo++}</td><td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}</td> <td id='id{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_date}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_dispatched_date}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_remark}</td> <td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_location_name}</td><td id='desc{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>" +"{$T.inventoryMaterialRequestNoteMasterDTO.inv_mrn_booker_name}</td> "
			+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' type='button' data-toggle='modal' data-target='#Purchase_Request' onclick=\"viewMRNDetails({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\" value='EDIT'><i class='fa fa-edit'></i></button></td> "
			+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'   onclick=\"deleteDItemMasterDetail({$T.inventoryMaterialRequestNoteMasterDTO.mrn_id})\"><i class='fa fa-trash-o'></i></button></td> <td id='status{$T.inventoryMaterialRequestNoteMasterDTO.mrn_id}'>{$T.inventoryMaterialRequestNoteMasterDTO.mrn_status}</td>{#/if}</tr>{#/for}</table>";
		
//var ItemInfoList = "<tr><td><input type='text'  class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td>";

		function setEditSavepurchaseRequest() {
				
				$('#Purchase_Request').find('input:text').val('');
				$('#Purchase_Request').find('input:hidden').val('');
				 
				$('#Purchase_Request').find('input:text').val('');
				$('#ItemInfoTable').find('input:text').val('');
				$('#Purchase_Request').find('textarea').val('');
				$("#ItemInfoTable > tbody").html('');
				isNew = 0;
				count = 1;
				getNextMaterialRequestNoteId();
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
			    $("#txtPurchaseRequestDocDate").val(today1);
}


/*function setMaterialRequestInfo() {
	 	if (test > 0 && isNew > 0) 
	 	{
		if (count == 1) {
		
			count = test;
		
		}
		count++;

		$("#ItemInfoTable > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td>  <td><input type='hidden' id='txtinventoryMaterailRequestNote"
								+ count
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'> <input type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'></td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>" +
								"<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "'  value='0' /> </div></td> <td><input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactorone"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactortwo"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text'  id='txtinventoryMaterailRequestNoteFactorthree"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactorfoure"
								+ count
								+ "' class='form-control input-SmallText'></td>");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_"+count,"onload");
		totalDocQty();
	} else {
		 
		$("#ItemInfoTable > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td>  <td> <input type='hidden' id='txtinventoryMaterailRequestNote"
								+ count
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'> <input type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'> </td><td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>" +
								"<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /><input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "'  value='0' /></div></td> <td><input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactorone"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactortwo"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text'  id='txtinventoryMaterailRequestNoteFactorthree"
								+ count
								+ "' class='form-control input-SmallText'></td> <td><input type='text' id='txtinventoryMaterailRequestNoteFactorfoure"
								+ count
								+ "' class='form-control input-SmallText'></td>");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_"+count,"onload");
		count++;
		

	}
	totalDocQty();

}*/
	function setMaterialRequestInfo() {	
	$("#closeonclick").hide();
	$('#iToStoreRurReqSaveBtn').css('display','block');
	if (test > 0 && isNew > 0) {
		if (count == 1) {
			/*var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
			count = lenghtofpobj;*/
			count = test;
		}
		//alert(count);
		count++;

		$("#ItemInfoTable > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td>  <td><input type='hidden' id='txtinventoryMaterailRequestNote"
								+ count
								+ "' name='txtinventoryMaterailRequestNote'  value ='0'  class='form-control input-SmallText'>  <center><label>  <input   style='width:36px;' readonly='readonly' type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'> </label></center> </td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)' class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "' value='0'  /></div></td> <td><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"+count+"' value='0' class='form-control input-SmallText' /><input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' onkeypress='return validateNumbers(event)'></td> <td><select class='form-control input-SmallText' id='selItemQty_"
								+ count	+ "'><option value = '0'>Select</option></select></td> ");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count, "onload");
		//count++;
		/*totalDocQty();*/
		
	} else {

		$("#ItemInfoTable > tbody")
				.append(
						" <tr id ='deleterows"
								+ count
								+ "' > <td> <input type='checkbox'  name='checkbox"
								+ count
								+ "' id='checkbox "
								+ count
								+ "'> </td>  <td> <input type='hidden' id='txtinventoryMaterailRequestNote"
								+ count
								+ "' name='txtinventoryMaterailRequestNote' value ='0'   class='form-control input-SmallText'><center><label> <input readonly='readonly'   style='width:36px;'   type='text' id='txtSrNo"
								+ count
								+ "' name='txtSrNo'  value="
								+ count
								+ "  class='form-control input-SmallText'></label></center>  </td> <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode_'>"
								+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
								+ count
								+ "' onkeyup='autoSuggest(this.id,onchange)'  class='typeahead form-control input-SmallText' />"
								+ "<input type='hidden'  id='txtMRNID"
								+ count
								+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
								+ count
								+ "'  value='0' /> </div></td> <td><input type='hidden' id='txtinventoryMaterailRequestNoteIssueQuantity"+count+"' value='0' class='form-control input-SmallText' /><input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
								+ count
								+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' onkeypress='return validateNumbers(event)'></td> <td><select class='form-control input-SmallText' id='selItemQty_"
								+ count	+ "'><option value = '0'>Select</option></select></td> ");
		$("#txtMRNID").val(count);
		var tblSubContractingCountRow1 = $("#txtMRNID").val();
		$("#totalRow").val(tblSubContractingCountRow1);
		autoSuggest("txtinventoryMaterailRequestNoteItemcode_" + count, "onload");
		count++;

	}

}
 

function autoSuggest(inputID, typeauto) {
	//alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];

	var txtVal1 = $('#' + inputID).val();
	//alert("text value is:"+txtVal1);

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
						var availableTags = [];
						if (r.length == 32) {
							alert("NO MATCHING FOUND Please Enter Valid Item Name");
							var arrValue1 = (inputID).split("_");
							var idValue1 = (arrValue1[1]);
							$("#txtinventoryMaterailRequestNoteItemcode_"+idValue1).val('');
							$("#txtinventoryMaterailRequestNoteItemcode_"+idValue1).focus();

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
			
			$("#txtMRNItemcodeId" +idValue).val(currentcode);
			
			
			
			// featch item sales Details for mrn item name
			
			
			var inputs = [];
			inputs.push('action=fetchItemSalesDetail');
			inputs.push('itemId=' + currentcode);
			inputs.push('isId=yes');
			var str = inputs.join('&');
			//docuemntAjaxResp
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
							
							$("#selItemQty_"+idValue).setTemplate(selInventorySalesDetailsTemplateforPR);
							$("#selItemQty_"+idValue).processTemplate(pobj1);
					 						 
						}
					});
			
		}
	}

}

var selInventorySalesDetailsTemplateforPR = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltInventoryItemSaleDTOs as ltInventoryItemSaleDTOs}"
	+ "{#if $T.ltInventoryItemSaleDTOs.item_sales_uom_factor1 !=''}"
	+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom1}</option>"
	+ "{#elseif $T.ltInventoryItemSaleDTOs.item_sales_uom_factor2 !=''}"
	+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom2}</option>"
	+ "{#elseif $T.ltInventoryItemSaleDTOs.item_sales_uom_factor3 !=''}"
	+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom3}</option>"
	+ "{#elseif $T.ltInventoryItemSaleDTOs.item_sales_uom_factor4 !=''}"
	+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom4}</option>"
	+ "{#/else}{#/else}{#/else}{#/if}{#/for}";

/*var selInventorySalesDetailsTemplateforPR = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltInventoryItemSaleDTOs as ltInventoryItemSaleDTOs}"
	+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom1}</option>"
	+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom2}</option>"
	+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom3}</option>"
	+ "<option  value='{$T.ltInventoryItemSaleDTOs.item_sales_id}'>{$T.ltInventoryItemSaleDTOs.item_sales_factor_uom4}</option>"
	+ "{#/for}";*/

function toRemovesetItemInfotrMRN(tblSubContractingCountRow) {
	// alert(tblSubContractingCountRow);
	var tblSubContractingCountRow1 = $("#txtMRNID").val();
	//$("#totalRow").val(tblSubContractingCountRow1);
	var oldrow = $("#totalRow").val();
	
	// alert(tblSubContractingCountRow1);

	var temp = tblSubContractingCountRow1;
	var p = 1;
	for ( var i = 0; i < tblSubContractingCountRow1 ; i++) {
		// alert(p);

		var $radios = $('input:checkbox[name=checkbox' + p + ']');

		if ($radios.is(':checked') == true) {
			$("#deleterows" + p + " ").remove();
			// alert(p);
			temp = temp - 1;

			$("#totalRow").val(temp);
		}

		p++;

	}
	
	totalDocQty();
	chcknulldocQty();
	 isNew=1;
	/*var tblSubContractingCountRow1 = $("#txtMRNID").val();
	$("#totalRow").val(tblSubContractingCountRow1);*/

}
 
function deleteDItemMasterDetail(MrnId) {
	var didConfirm = confirm("Are you sure to delete Record ?");
	//alert(MrnId);
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteMrnMasterDetail');
		inputs.push('MrnId=' + MrnId);
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
				//fetchMaterialRequestNoteDetailsInList();
				fetchMaterialRequestNoteDetailspurRequest();

			}
		});
	}
}

function savePurchaseRequest() {
	
	// General Info
 	var txtmaterialReqaestNoteId = $("#txtPurchaseRequestDocNo").val();
	var txtDocNo = $("#txtPurchaseRequestDocNo").val();
	var txtDocDate = $("#txtPurchaseRequestDocDate").val();
	var txtMRNTotal = $("#txtPurchaseRequestTotalDocQty").val();
	var txtMRNRemark = $("#txtPurchaseRequestRemark").val();
	var txtMRNID = $("#txtMRNID").val();
	var totalRow = $("#totalRow").val();
	var CurrentuserName = $("#CurrentuserName").val();
	var subInventoryId = $("#subInventoryId").val(); 
	var txtReceiverName ="";
	var mrnApprovedStatus='NYA';
	
   if(txtDocDate == "" || txtDocDate == 0){
		
		alert("Please select mrn date");
		$("#txtPurchaseRequestDocDate").focus();
		return false;
		
	}
 
   
   var txtPurchaseRequestSaveorUpDate =$("#txtPurchaseRequestSaveorUpDate").val();
	if(!(txtPurchaseRequestSaveorUpDate == 'Update'))
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

		    if (txtDocDate === today1) {

			} else {
				alert("Please Enter Current Date ");
				$("#txtPurchaseRequestDocDate").focus();
				return false;
			}
		
   /*if(txtDocDate)
	{
	var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth()+1; //January is 0!

   var yyyy = today.getFullYear();
   
   var today1 = dd+'/'+mm+'/'+yyyy;
   
   if(new Date(txtDocDate).getTime() === new Date(today1).getTime())
	   {
	   		    
	   }
   else
   {
   	alert("Please Enter Current Date ");
	    $("#txtPurchaseRequestDocDate").focus();
	   return false;
   }
  }*/
} 
   
	var txtMRNLocationName= $("#txtMRNLocationName").val();
	 if(txtMRNLocationName == "" || txtMRNLocationName == 0){
			
			alert("Please enter subinventory name");
			$("#txtMRNLocationName").focus();
			return false;
			
		    }
	/*var sclMRNLocation = $("#sclMRNLocation option:selected").text();*/
	var status = 'open';
	var materiallist = {
		inventoryMaterialRequestNoteItemInfoSlaveDTO : []
	};

	for ( var i = 1; i <= txtMRNID; i++) {
		if($("#txtinventoryMaterailRequestNote" + i).val()!=null && $("#txtinventoryMaterailRequestNote" + i).val() != undefined)
		{
		var txtinventoryMaterailRequestNote = $("#txtinventoryMaterailRequestNote" + i).val();
		var txtMRNItemName = $("#txtinventoryMaterailRequestNoteItemcode_" + i).val();
		var txtMRNItemcodeId = $("#txtMRNItemcodeId"+ i).val();
		var txtMRNDocQuantity = $(
				"#txtinventoryMaterailRequestNoteDocQuantity" + i).val();
		
		var txtinventoryMaterailRequestNoteIssueQuantity = $("#txtinventoryMaterailRequestNoteIssueQuantity" +i).val();
		var selItemQty = $("#selItemQty_"+i+" option:selected").text();
		if(txtMRNItemName == "" || txtMRNItemName == null){
			
			alert("Please enter item name in "+i+" Row");
			$("#txtinventoryMaterailRequestNoteItemcode_" + i).focus();
			return false;
			
		}	
         if(txtMRNDocQuantity == "" || txtMRNDocQuantity == null){
			
			alert("Please enter Item quantity in "+i+" Row");
			$("#txtinventoryMaterailRequestNoteDocQuantity" + i).focus();
			return false;
			
		}
         
         var pattern = /^[0-9]+$/;
      	if (!pattern.test(txtMRNDocQuantity)) {
      		alert("Item Quantity should be of digits in "+i+" Row");
      		$("#txtinventoryMaterailRequestNoteDocQuantity"+i).val('');
      		$("#txtinventoryMaterailRequestNoteDocQuantity"+i).focus();
      		return false;
      	}
         
         
         if(selItemQty == 0 || selItemQty == '-Select-')
	     {
		    alert("Please select uom in "+i+" row");
			$("#selItemQty_").focus();
			return false;
	     }
                  
	/*	var txtfactor1 = $("#txtinventoryMaterailRequestNoteFactorone" + i)
				.val();
		var txtfactor2 = $("#txtinventoryMaterailRequestNoteFactortwo" + i)
				.val();
		var txtfactor3 = $("#txtinventoryMaterailRequestNoteFactorthree" + i)
				.val();refreshPopUp
		var txtfactor4 = $("#txtinventoryMaterailRequestNoteFactorfoure" + i)
				.val();*/

		materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.push({

			mrn_item_info_slave_id : txtinventoryMaterailRequestNote,
			mrn_item_info_slave_item_name : txtMRNItemName,
			mrn_item_info_slave_doc_qty : txtMRNDocQuantity,
			mrn_item_info_slave_item_name : txtMRNItemName,
			mrn_item_info_slave_item_code:txtMRNItemcodeId,
			/*mrn_item_info_slave_item_factor1 : txtfactor1,
			mrn_item_info_slave_item_factor2 : txtfactor2,
			mrn_item_info_slave_item_factor3 : txtfactor3,
			mrn_item_info_slave_item_factor4 : txtfactor4,*/
			mrn_item_info_slave_item_selItemQty : selItemQty,
			mrn_item_info_slave_issue_qty:txtinventoryMaterailRequestNoteIssueQuantity,
			mrn_item_info_slave_update_date : new Date(),
			mrn_item_info_slave_create_date : new Date()

		});
		}

	}
	var lenlist = materiallist.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
	 
	if(lenlist == 0)
	{
		alert("Please enter atleast one Item row to Save Purchase Request");
		return false;
		
	}
	materiallist = JSON.stringify(materiallist);
	var inputs = [];
	inputs.push('action=SaveMaterialRequestNoteDetails');

	// General Info
	inputs.push("materiallist=" + materiallist);
	inputs.push('txtMRNID=' + txtMRNID);
	inputs.push('txtDocNo=' + txtDocNo);
	inputs.push('txtDocDate=' + txtDocDate);
	inputs.push('txtMRNTotal=' + txtMRNTotal);
	inputs.push('txtMRNRemark=' + txtMRNRemark);
	
	inputs.push('txtMRNLocationName=' + txtMRNLocationName);
	/*inputs.push('sclMRNLocation=' + sclMRNLocation);*/
	
	inputs.push('status=' + status);
	inputs.push('txtmaterialReqaestNoteId=' + txtmaterialReqaestNoteId);
	inputs.push('txtMrnBookerName=' + CurrentuserName);
	inputs.push('subInventoryId=' + subInventoryId);
	inputs.push('txtReceiverName=' + txtReceiverName);
	inputs.push('MrnApprovedStatus=' + mrnApprovedStatus);
	
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
			
			var txtPurchaseRequestSaveorUpDate =$("#txtPurchaseRequestSaveorUpDate").val();
			if(txtPurchaseRequestSaveorUpDate == 'Update')
				{
				 alert("Record Updated successfully..!");
				}
			else
				{
				 alert("Record saved successfully..!");
				}
			$('#Purchase_Request').removeClass('fade');
			$('#Purchase_Request').modal('hide');
			window.location.reload("inventory_Purchase_Request.jsp");
		}
	});
}

function getNextMaterialRequestNoteId() {
		 
	var inputs = [];
	inputs.push('action=getMaterailRequestNoteNextId');
	inputs.push('tableName=inv_mrn_master');
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
			$("#txtPurchaseRequestDocNo").val(r);
		}
	});
}
function fetchMaterialRequestNoteDetailspurRequest() {
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailsforMRNAll');
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
			$("#MRNcontent").setTemplate(inventoryMRNTemp);
			$("#MRNcontent").processTemplate(pobj1);

			$("#MRNAjaxResp").html(r);
		}
	});
}

function refreshonviewPurchaseRequest()
{
	$('#Purchase_Request').find('input:text').val('');
	$('#Purchase_Request').find('input:hidden').val('');
	 
	$('#Purchase_Request').find('input:text').val('');
	$('#ItemInfoTable').find('input:text').val('');
	$('#Purchase_Request').find('textarea').val('');
	$("#ItemInfoTable > tbody").html('');
	isNew=1;
}


/* view dynamic data into the page on lodeing the page */

function viewMRNDetails(MrnId) {

	if (MrnId == null || MrnId == "") {
		alert("Please enter Proper Item Id Id");
		$("#byName").focus();
		return false;
	}
	
	$('#iToStoreRurReqSaveBtn').css('display','block');
	$("#closeonclick").hide();
	$("#txtPurchaseRequestSaveorUpDate").val('Update');
	refreshonviewPurchaseRequest();

	var obj = $("#MRNAjaxResp").html();
	objMrnMaster = JSON.parse(obj);
	 
	for ( var i = 0; i < objMrnMaster.inventoryMaterialRequestNoteMasterDTO.length; i++) {
		if (objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_id == MrnId) {
			$("#txtPurchaseRequestDocNo").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_doc_no);
			/******************************convert date **husen******************************/
			/*var str=(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date).split("-");
			var MrnPurchaseDate=str[2]+"-"+str[1]+"-"+str[0];*/
			$("#txtPurchaseRequestDocDate").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_date);
			$("#txtPurchaseRequestTotalDocQty")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_total_qty);
			$("#txtPurchaseRequestRemark")
					.val(
							objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].mrn_remark);
			$("#txtMRNLocationName").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location_name);
			$("#txtReceiverName").val(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_receiver_name);
		    document.getElementById("txtMRNLocationName").disabled = true;
			
			/*$("#sclMRNLocation option:selected").text(objMrnMaster.inventoryMaterialRequestNoteMasterDTO[i].inv_mrn_location);*/
		}
	}

	var inputs = [];
	inputs.push('action=getMaterialRequestNoteSlaveDetails');
	inputs.push('isEdit=no');
	var txtPurchaseRequestDocNo = $("#txtPurchaseRequestDocNo").val();
	 
	// alert(txtSubContractingMaterialIssueDocNo);
	inputs.push('txtmaterialReqaestNoteDocId=' + txtPurchaseRequestDocNo);
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
					// alert(r);
					var lenghtofpobj = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length;
					// alert(lenghtofpobj);

					var count = 1;
					for ( var k = 0; k < pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO.length; k++) {
						 $("#ItemInfoTable > tbody")
						.append(
								" <tr id ='deleterows"
										+ count
										+ "' > <td> <input type='checkbox'  name='checkbox"
										+ count
										+ "' id='refreshPopUpcheckbox "
										+ count
										+ "' > </td> <td><center><label> <input type='text'   style='width:36px;'  id='txtSrNo"
										+ count
										+ "' name='txtSrNo'  value="
										+ count
										+ "  class='form-control input-SmallText'></label></center> <input type='hidden' id='txtinventoryMaterailRequestNote"
										+ count
										+ "' name='txtinventoryMaterailRequestNote'  value="
										+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_id
										+ "  class='form-control input-SmallText'></td>"
										+ " <td><div style='text-align:left;' id ='divtxtinventoryMaterailRequestNoteItemcode'>"
										+ "<input type='text' id='txtinventoryMaterailRequestNoteItemcode_"
										+ count
										+ "' "
										+ "onkeyup='autoSuggest(this.id,onchange)' onkeypress='return validateOnlyName(event)' class='typeahead form-control input-SmallText' value='"
										+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_name
										+ "' /> <input type='hidden'  id='txtMRNItemcodeId"
										+ count
										+ "' value="
										+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_code
		 								+ " /></div></td>"
										+ "<input type='hidden'  id='txtMRNID"
										+ count
										+ "' /><td><input id='txtinventoryMaterailRequestNoteIssueQuantity"+count+"' class='form-control input-SmallText' type='hidden' value='"+pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_issue_qty +"'/><input type='text' id='txtinventoryMaterailRequestNoteDocQuantity"
										+ count
										+ "' class='form-control input-SmallText' onkeyup='chcknulldocQty()' value='"
										+ pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_doc_qty
										+ "' onkeypress='return validateNumbers(event)' ></td>  " +
										"<td id='xyz'><select onclick=getSalesDetailsOnChange(this.id); class='form-control input-SmallText' id='selItemQty_"+count+"'><option selected=selected >"+pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].mrn_item_info_slave_item_selItemQty+"</option></select></td> </tr>");

				
				
			 var txt = pobj1.inventoryMaterialRequestNoteItemInfoSlaveDTO[k].inv_mrn_item_info_slave_uom;
			 setTimeout(function() {
					$("#selItemQty_"+count+" option[text=" + txt +"]").attr("selected","selected");
					
				},5000);
				
				$("#txtMRNID").val(count);
				count++;
				test++;

					}

					totalDocQty();
					//autoSuggest("txtinventoryMaterailRequestNoteItemcode"+count,"onload");
					var tblSubContractingCountRow1 = $("#txtMRNID").val();
					$("#totalRow").val(tblSubContractingCountRow1);

				}

			});

}



//GETING UOM FOR ITEAM

function getSalesDetailsOnChange(id,count) {
	//alert("hii");
	
	/*alert(selItemQtyval);*/
	var arrValue = (id).split("_");
	var idValue = (arrValue[1]);
	var txtMRNItemcodeId = $("#txtMRNItemcodeId"+ idValue).val();
	var selItemQtyval = $("#selItemQty_"+idValue+" option:selected").text();
	
	var inputs = [];
	inputs.push('action=fetchItemSalesDetail');
	inputs.push('itemId=' + txtMRNItemcodeId);
	inputs.push('isId=yes');
	var str = inputs.join('&');
	//docuemntAjaxResp
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
					r=$.parseJSON(r);
					
					/*pobj1 = eval('(' + r + ')');*/
					
					 //alert(selItemQtyval);
					 
					 var newData="<option value=''>"+selItemQtyval+"</option>";
					 for(var i=0;i<+r.ltInventoryItemSaleDTOs.length;i++)
					 {
						 var data="";
						 
						  	data="<option value="+r.ltInventoryItemSaleDTOs[i].item_sales_id+">"+r.ltInventoryItemSaleDTOs[i].item_sales_factor_uom1+"</option>"
							+"<option value="+r.ltInventoryItemSaleDTOs[i].item_sales_id+">"+r.ltInventoryItemSaleDTOs[i].item_sales_factor_uom2+"</option>"
							+"<option value="+r.ltInventoryItemSaleDTOs[i].item_sales_id+">"+r.ltInventoryItemSaleDTOs[i].item_sales_factor_uom3+"</option>"
							+"<option value="+r.ltInventoryItemSaleDTOs[i].item_sales_id+">"+r.ltInventoryItemSaleDTOs[i].item_sales_factor_uom4+"</option>";
						  	newData+=data;
						 	
					 }
					 $("#"+id).html(newData);
					 
					/*$("#"+id).setTemplate(selInventorySalesDetailsTemplateforMRNOnEdit);
					$("#"+id).processTemplate(pobj1);*/
				}
			});
	
}
 
function refreshPopUp() {
	$('#MRNForm').find('input:text').val('');
	$('#MRNForm').find('textarea').val('');

	//getNextMaterialRequestNoteId();
	$("#ItemInfoTable > tbody").html('');
	$("#txtinventoryMaterailRequestNoteDocQuantity").val("");
	$("#txtPurchaseRequestRemark").val("");
	$("#txtinventoryMaterailRequestNoteItemcode").val("");
	$("#txtPurchaseRequestTotalDocQty").val("");
	$("#txtinventoryMaterailRequestNoteFactorone" ).val("");
	$("#txtinventoryMaterailRequestNoteFactortwo" ).val("");
	$("#txtinventoryMaterailRequestNoteFactorthree " ).val("");
	$("#txtinventoryMaterailRequestNoteFactorfoure" ).val("");
	$("#txtMRNID").val('');
	window.location.replace("inventory_Purchase_Request.jsp");

}

function totalDocQty() {
	//var i=1;
	 
	var sum = 0 ;
	var totalQty;
	var txtMRNID = $("#txtMRNID").val();
	/*var tblSubContractingCountRow1 = $("#txtMRNID").val();*/
	
	var tblSubContractingCountRow1 = $("#totalRow").val();
	
	for(var i=1;i<=txtMRNID;i++)
		{
		
		
		totalQty = $("#txtinventoryMaterailRequestNoteDocQuantity"+ i).val();
		if(totalQty==null || totalQty == undefined || totalQty=='')
		{
			 
		}
		
		else
		{
		sum = parseInt(sum) + parseInt(totalQty);
		}
		}
	
	 
	$("#txtPurchaseRequestTotalDocQty").val(sum);
	
}

function chcknulldocQty()
{
	
	var sum = 0 ;
	var totalQty;
	var txtMRNID = $("#txtMRNID").val();
	 var totalRow = $("#totalRow").val();
	
	for(var i=1; i<= txtMRNID;i++)
		{
		
		
		totalQty = $("#txtinventoryMaterailRequestNoteDocQuantity"+ i).val();
		if(totalQty==null || totalQty == undefined || totalQty=='')
		{
			var flag=1; 
		}
		else
		{
		  sum = parseInt(sum) + parseInt(totalQty);
		}
		
		}
		 
	$("#txtPurchaseRequestTotalDocQty").val(sum);
	$("#txtMRNID").val(txtMRNID);  
	 
}

/******************AUtosuggetion for Name for Location ***************/

function autoSuggestionForLocationInRequest(inputID, typeauto) {
	//alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];

	var txtVal1 = $('#' + inputID).val();
	//alert("text value is:"+txtVal1);

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
						//alert(r);
						 //alert(r.length);
						var availableTags = [];
						if (r.length == 24) {
							alert("NO MATCHING FOUND Please Enter valid Name");
							$("#txtMRNLocationName").val('');
							$("#txtMRNLocationName").focus();
							
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
			var txtMRNLocationName = $("#txtMRNLocationName").val();
			var inputs = [];
			inputs.push('action=fetchLocationforNameAtuosugg');
			inputs.push('txtVal=' + item.text);
			inputs.push('isEdit=yes');
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
				success : function(result) {
					//alert(result);
					pobj1 = eval('(' + result + ')');
					$("#sclMRNLocation").setTemplate(selSubInventoryLocation);
					$("#sclMRNLocation").processTemplate(pobj1);

				}
			});

		}

	}

}
var selSubInventoryLocation = "<option value='Select'>-Select-</option>"
	+ "{#foreach $T.ltSubInventoryDTO as ltSubInventoryDTO}"
	+ "<option  value='{$T.ltSubInventoryDTO.subinventory_Id}'>{$T.ltSubInventoryDTO.subinventory_location}</option>"
	+ "{#/for}";


/****************************** Issue mrn dispactch in sotre *********************************/
function issueMRNDetails(MrnId) 
{	
	var didConfirm = confirm("Are you sure to issue ?");
	if(didConfirm)
		{
		var inputs =[];
		inputs.push('action=issueMrnstausDispatch');
		inputs.push('MrnId=' + MrnId);
		var str = inputs.join('&');
		jQuery.ajax({
			async:true,
			type:"post",
			data:str + "&reqType=AJAX",
			url: "InventoryServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				alert(r);
				//fetchMaterialRequestNoteDetailsInList();
				fetchMaterialRequestNoteDetailspurRequest();
				
			}
		})
		}
	
}






/*******************Search code for mrn IN List *******************/

function fetchMRNDetailByIdInLIst(mrnId) {
	if (mrnId == null || mrnId == "") {
		alert("Please Enter Mrn Id First");
		$("#byMrnId").focus();
		return false;
	}
	
	var inputs = [];
	inputs.push('action=fetchMaterialRequestNoteDetailsforMRNAll');
	inputs.push('isEdit=yes');
	inputs.push('MrnId=' + mrnId);

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
			 objMRN = JSON.parse(r);
			if (objMRN.inventoryMaterialRequestNoteMasterDTO.length > 0) {
				
				$("#MRNcontent").setTemplate(inventoryMRNTemp);
				$("#MRNcontent").processTemplate(pobj1);
				//$("#MRNAjaxResp").html(r);
				
			} else {
				alert("Record not found..!");
				//fetchMaterialRequestNoteDetailsInList();
				fetchMaterialRequestNoteDetailspurRequest();
			}
			$('#byMrnId').val("");

		}
	});
}