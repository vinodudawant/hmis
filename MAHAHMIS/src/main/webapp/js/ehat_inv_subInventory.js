/**
 * @author Rohit Sandbhor
 * @Since 20-12-2019
 * @param id
 * @returns {String}
 */
function generateMrnRequestTableBody(id){
	$("#txtUom" +id).select2();
	getUOMTempGenerateMrn("txtUom"+id);
	var tbody = "<tr id='multiTr"+id+"' class='newAdded'>"
	+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+id+"' value='"+id+"'></td>"
	+ "<td class='col-md-1 center' style='display:none'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemSlaveId"+id+"' value='0'></td>"
	+ "<td class='col-md-1 center'><input type='hidden' id='itemMasterIdGeneMrnReqTable"+id+"' value='0'>"+id+"</td>"
	+ "<td class='col-md-3 center'><input type='text' autocomplete='off' id='txtItemNameId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='generateMRNRequest'> </td>"
	+ "<td class='col-md-1 center'><input  type='text' id='txtMrnQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center' style='display:none'><input  type='text' id='cancelMrnQty"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center'><select id='txtUom"+id+"' class='form-control input-SmallText '><option value='NA' >--Select UOM--</option></select> </td>"
	+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvStock"+id+"' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-1 center'><input type='text' readonly id='currentInventoryStock"+id+"' class='form-control input-SmallText '> </td>"
	+"<td class='col-md-3 center'><textarea  style='width:100%;' id='subRemarkGenerateMRN" + id + "' /> </td>"
	+ "</tr>";
	
	return tbody;
	
}
/**
 * @author Rohit
 * @comment to get latest UOM unit on subinventory
 * @param itemMasterId
 */
function getItemPurchaseUnitList(itemMasterId){
	var inputs = [];
	inputs.push('id=' + itemMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryPurchaseOrder/getItemMasterSlaveDetails',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			for ( var i = 1; i <= r.itemPurchaseSlaveDto.length; i++) {
				if(r.itemPurchaseSlaveDto[i-1].purchaseFactorUom1 != 0 && r.itemPurchaseSlaveDto[i-1].purchaseFactorUom2 == 0){
					$('#txtUom'+i).select2('val',r.itemPurchaseSlaveDto[i-1].purchaseFactorUom1);
				}
				else if(r.itemPurchaseSlaveDto[i-1].purchaseFactorUom2 != 0 && r.itemPurchaseSlaveDto[i-1].purchaseFactorUom1 != 0 && r.itemPurchaseSlaveDto[i-1].purchaseFactorUom3 == 0 && r.itemPurchaseSlaveDto[i-1].purchaseFactorUom4 == 0){
					$('#txtUom'+i).select2('val',r.itemPurchaseSlaveDto[i-1].purchaseFactorUom2);
				}
				else if(r.itemPurchaseSlaveDto[i-1].purchaseFactorUom3 != 0 && r.itemPurchaseSlaveDto[i-1].purchaseFactorUom2 != 0 && r.itemPurchaseSlaveDto[i-1].purchaseFactorUom1 != 0 && r.itemPurchaseSlaveDto[i-1].purchaseFactorUom4 == 0){
					$('#txtUom'+i).select2('val',r.itemPurchaseSlaveDto[i-1].purchaseFactorUom3);
				}
				else if(r.itemPurchaseSlaveDto[i-1].purchaseFactorUom4 != 0 && r.itemPurchaseSlaveDto[i-1].purchaseFactorUom3 != 0 && r.itemPurchaseSlaveDto[i-1].purchaseFactorUom2 != 0 && r.itemPurchaseSlaveDto[i-1].purchaseFactorUom1 != 0){
					$('#txtUom'+i).select2('val',r.itemPurchaseSlaveDto[i-1].purchaseFactorUom4);
				}
			}
			
		}
	});
}
/**
 * 
 * @param itemMasterId
 */
function getItemMasterSlaveDetailsModalOnMRNGenerate(itemMasterId,subInvId)
{
	
	getItemMasterSlaveDetailsOnMRNGenerateById(itemMasterId,subInvId);
	$('#generateMRNModalId').modal('show');
	
}

/**
 * 
 * @param itemMasterId
 */
function getItemMasterSlaveDetailsOnMRNGenerateById(itemMasterId,subInvId){
var currentInventoryStock = 0;
var inputs = [];
inputs.push('id=' + itemMasterId);
inputs.push('subInvId=' + subInvId);
var str = inputs.join('&');
jQuery.ajax({
	async : true,
	type : 'POST',
	data : str + "&reqType=AJAX",
	url : 'ehat/subInventory/getItemMasterSlaveDetailsAndCurrentSubInvStock',
	timeout : 1000 * 60 * 5,
	catche : false,
	success : function(r) {
		if(r.itemPurchaseSlaveDto.length == 0){
			$('#generateMRNModalId').modal('hide');
			alert("No Purchase Related Details Are Available For This Perticular Item..Please Fill Purchase Info Properly Under Item Master First!!");
			return false;
		}else{
		for ( var i = 0; i < r.itemPurchaseSlaveDto.length; i++) {
			if(i == 0){
				currentInventoryStock = getCurrentInventoryStock(itemMasterId);
				$("#itemMasterSlaveRecordListOnMRNGenerate")
				.html(
						"<tr><td>"
								+ "<input type='radio' name='row' id='rowId"
								+ i
								+ "' value="
								+ i
								+ "  autofocus='autofocus'></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='itemNameId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td style='display:none'><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' value="+itemMasterId+"  id='itemId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='itemQuantityId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUnitPriceOneId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='cgstRateId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='sgstRateId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='taxNameId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='taxRateId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorOneId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorTwoId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorThreeId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorFourId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomOneId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomTwoId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomThreeId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomFourId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='currentSubInventoryStockId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='currentInventoryStockId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "</tr>");
	}
			else{
				$("#itemMasterSlaveRecordListOnMRNGenerate")
				.append(
						"<tr><td>"
								+ "<input type='radio' name='row' id='rowId"
								+ i
								+ "' value="
								+ i
								+ " autofocus='autofocus'></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='itemNameId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td style='display:none'><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' value="+itemMasterId+"  id='itemId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='itemQuantityId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUnitPriceOneId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='cgstRateId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='sgstRateId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='taxNameId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='taxRateId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorOneId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorTwoId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorThreeId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorFourId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomOneId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomTwoId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomThreeId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomFourId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='currentSubInventoryStockId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display: none'><input type='hidden'"
								+ "class='form-control input-SmallText' readonly='true' id='currentInventoryStockId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "</tr>");
				
			}
			if(r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 == 0){
			$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);
			$("#currentInventoryStockId" + i).val(currentInventoryStock);	
			
			$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
			$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
			
			$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
			$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
			$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
			$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
			
			$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
			$("#itemNameId" + i).val(r.itemName);
			$("#cgstRateId" + i).val(r.cgst);
			$("#sgstRateId" + i).val(r.sgst);
			$("#taxNameId" + i).val(r.taxName);
			$("#taxRateId" + i).val(r.taxRate);
			}
			else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 == 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0){
				$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);
				$("#currentInventoryStockId" + i).val(currentInventoryStock);
				$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
				
				
				$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				
				$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
				$("#purchaseFactorUomTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom2);
				$("#itemNameId" + i).val(r.itemName);
				$("#cgstRateId" + i).val(r.cgst);
				$("#sgstRateId" + i).val(r.sgst);
				$("#taxNameId" + i).val(r.taxName);
				$("#taxRateId" + i).val(r.taxRate);
			}
			else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0){
				$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);
				$("#currentInventoryStockId" + i).val(currentInventoryStock);
				$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
				
				$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				
				$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
				$("#purchaseFactorUomTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom2);
				$("#purchaseFactorUomThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom3);
				$("#itemNameId" + i).val(r.itemName);
				$("#cgstRateId" + i).val(r.cgst);
				$("#sgstRateId" + i).val(r.sgst);
				$("#taxNameId" + i).val(r.taxName);
				$("#taxRateId" + i).val(r.taxRate);
			}
			else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor4 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0){
				$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);
				$("#currentInventoryStockId" + i).val(currentInventoryStock);
				$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
				
				$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				
				$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
				$("#purchaseFactorUomTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom2);
				$("#purchaseFactorUomThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom3);
				$("#purchaseFactorUomFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom4);
				
				
				
				$("#itemNameId" + i).val(r.itemName);
				$("#cgstRateId" + i).val(r.cgst);
				$("#sgstRateId" + i).val(r.sgst);
				$("#taxNameId" + i).val(r.taxName);
				$("#taxRateId" + i).val(r.taxRate);
			}
			
		}
		}
		
	}
});

}


/**
 * @author Rohit Sandbhor
 * @since 23-12-2019
 * @comment to get UOM units on subinventory
 * @param selectId
 */
function getUOMTempSubInventory(selectId){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
    jQuery.ajax({
        async : true,
        type : "POST",
        data : str + "&reqType=AJAX",
        url : "ehat/inventoryM/getAllUnitMaster",
        error : function() {
            alert('error');
        },
        success : function(r){    
            setUOMTempSubInventory(r,selectId);            
        }
    });    
}
/**
 * @Author Rohit
 * @since 23-12-2019
 * @comment to set UOM unit value to sub inventory
 * @param r
 * @param selectId
 */
function setUOMTempSubInventory(r,selectId){
    var htm="<option value='0'>--Select--</option>";
    for ( var i = 0; i < r.lstunitmaster.length; i++){    
        htm = htm + "<option value='"+r.lstunitmaster[i].uniId+"'>"+r.lstunitmaster[i].unitName+"</option>";
    }
    $("#"+selectId).html(htm);
    $("#"+selectId).select2();
}
/**
 * 
 * @param inputID
 * @returns {Boolean}
 */
function getAutoSubInventoryNameOnGenerateMRN(inputID) {
	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];	
	inputs.push('subInventoryName=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/autoFillSearchOnSubInventory",
		cache : false,		
		success : function(r) {
			if(r.lstSubInventoryMaster.length <= 0){
				alertify.error("You Cannot Gererate MRN Without Sub-Inventory Name");
				document.getElementById('generateMRNSearchId').value = "";
			}
			else{
			document.getElementById("generateMRNButtonId").style.display = "block";	
			var template = "";
			for ( var j = 0; j < r.lstSubInventoryMaster.length; j++){
				var id = r.lstSubInventoryMaster[j].id;
				var subInventoryName = r.lstSubInventoryMaster[j].subInventoryName;
				resultData.push({
					ID : id,
					Name : subInventoryName
				});
				template = template + '<li data-value="' + id
						+ '" class=""><a href="#">' + subInventoryName
						+ '</a></li>';
			}
			setTimeout(function() {
				$("div#generateMRNPartyNameDiv .typeahead").html(template);
				$("div#generateMRNPartyNameDiv .typeahead").show();
				
				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : getSubInventoryId,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
		}
	});
	
}

/**
 * 
 * @param item
 */
function getSubInventoryId(item){
	document.getElementById("subInventoryId").value = item.value;
	$("#searchSubInventroyId").click();
	document.getElementById("searchItemName").value ="";
	document.getElementById("searchFromDate").value ="";
	document.getElementById("searchToDate").value ="";
}

/**
 * 
 */
function setModalInfoToTableOnGenerateMRN()
{
	var table = document.getElementById("generateMRNRequestInfoTable");
	var itemSlaveRowCount = table.rows.length;
	var newItemSlaveRowCount = itemSlaveRowCount - 1;
	var totalRow=0;
	$('#itemMasterSlaveRecordListOnMRNGenerate input[type=radio]').each(function()
	{
		totalRow++;
	});
	var totalCheckboxes = $('input[name=row]:checked').val();
	if(totalCheckboxes == undefined || totalCheckboxes == null){
		alert("Atleat Select 1 Radio button to fetch the values..!!");
		return false;
	}
	setTableValuesToGenerateMRN(totalCheckboxes,totalRow,newItemSlaveRowCount);
	
}

//####################################################################################
/**
 * 
 */
function setTableValuesToGenerateMRN(totalCheckboxes, totalRow,radioButtonIndex) {
	if(totalRow >= 0)
	{
				var unit1 = $('#purchaseFactorUomOneId'+totalCheckboxes).val();
				var unit2 = $('#purchaseFactorUomTwoId'+totalCheckboxes).val();
				var unit3 = $('#purchaseFactorUomThreeId'+totalCheckboxes).val();
				var unit4 = $('#purchaseFactorUomFourId'+totalCheckboxes).val();
				
				if(unit1 != 0 && unit2 == 0){
					$('#txtUom' + radioButtonIndex).val($('#purchaseFactorUomOneId'+totalCheckboxes).val());
					//$('#txtUom' + radioButtonIndex).select2('val',$('#purchaseFactorUomOneId'+totalCheckboxes).val());
					$('#currentSubInvStock' + radioButtonIndex).val($('#currentSubInventoryStockId'+totalCheckboxes).val());
					$('#currentInventoryStock' + radioButtonIndex).val($('#currentInventoryStockId'+totalCheckboxes).val());
					$('#itemMasterIdGeneMrnReqTable' + radioButtonIndex).val($('#itemId' + totalCheckboxes).val());
					//to close modal popup
					closeItemPurchaseDetailsModalOnGenerateMRN();
				}
				else if(unit2 != 0 && unit1 != 0 && unit3 == 0 && unit4 == 0){
					$('#txtUom' + radioButtonIndex).val($('#purchaseFactorUomTwoId'+totalCheckboxes).val());
					//$('#txtUom' + radioButtonIndex).select2('val',$('#purchaseFactorUomTwoId'+totalCheckboxes).val());
					$('#currentSubInvStock' + radioButtonIndex).val($('#currentSubInventoryStockId'+totalCheckboxes).val());
					$('#currentInventoryStock' + radioButtonIndex).val($('#currentInventoryStockId'+totalCheckboxes).val());
					$('#itemMasterIdGeneMrnReqTable' + radioButtonIndex).val($('#itemId' + totalCheckboxes).val());
					//to close modal popup
					closeItemPurchaseDetailsModalOnGenerateMRN();
				}
				else if(unit3 != 0 && unit2 != 0 && unit1 != 0 && unit4 == 0){
					$('#txtUom' + radioButtonIndex).val($('#purchaseFactorUomThreeId'+totalCheckboxes).val());
					//$('#txtUom' + radioButtonIndex).select2('val',$('#purchaseFactorUomThreeId'+totalCheckboxes).val());
					$('#currentSubInvStock' + radioButtonIndex).val($('#currentSubInventoryStockId'+totalCheckboxes).val());
					$('#currentInventoryStock' + radioButtonIndex).val($('#currentInventoryStockId'+totalCheckboxes).val());
					$('#itemMasterIdGeneMrnReqTable' + radioButtonIndex).val($('#itemId' + totalCheckboxes).val());
					//to close modal popup
					closeItemPurchaseDetailsModalOnGenerateMRN();
				}
				else if(unit4 != 0 && unit3 != 0 && unit2 != 0 && unit1 != 0){
					$('#txtUom' + radioButtonIndex).val($('#purchaseFactorUomFourId'+totalCheckboxes).val());
					//$('#txtUom' + radioButtonIndex).select2('val',$('#purchaseFactorUomFourId'+totalCheckboxes).val());
					$('#currentSubInvStock' + radioButtonIndex).val($('#currentSubInventoryStockId'+totalCheckboxes).val());
					$('#currentInventoryStock' + radioButtonIndex).val($('#currentInventoryStockId'+totalCheckboxes).val());
					$('#itemMasterIdGeneMrnReqTable' + radioButtonIndex).val($('#itemId' + totalCheckboxes).val());
					//to close modal popup
					closeItemPurchaseDetailsModalOnGenerateMRN();
				}

			}
}

/**
 * 
 */
function setSubInventoryNameAndId(){
	document.getElementById("saveButtonId").style.visibility = "visible";
	document.getElementById("approvedButtonId").style.visibility = "hidden";
	var subInventoryName = document.getElementById("generateMRNSearchId").value;
	var subInventoryId = document.getElementById("subInventoryId").value;
	document.getElementById("subInventoryNameId").value = subInventoryName;
	document.getElementById("subInventoryIdInsideModal").value = subInventoryId;
	document.getElementById("plusMinusButtonDivIdGeneratedMrn").style.display = "block";
	document.getElementById("plusMinusButtonDivIdConsumption").style.display = "block";
	$("#saveStockReturn").show();
	
	
}

/**
 * @author Rohit Sandbhor
 * @comment created this javascript function to save/generate the MRN request
 */
function saveGenerateMRNRequest(){
	var mrnDate = $("#mrnDate").val();
	var subInventoryName = $("#subInventoryNameId").val();
	var subInventoryId = $("#subInventoryIdInsideModal").val();
	var remark = $("#remark").val();
	var mrnStatus =  $("#mrnStatusReceivedId").val();
	var userId = $('#userId').val();
	var userName = $("#userNameId").val();
	var id = $("#mrnId").val();
	
	if(subInventoryId == null || subInventoryId == "" || subInventoryId == undefined || subInventoryId == 0 ){
		alert("Please Enter Subinventory name");
		return false;
	}
	
	if(subInventoryName == null || subInventoryName == "" || subInventoryName == undefined ){
		alert("Please Enter Subinventory name");
		return false;
	}
	var generateMRNItemSlaveDetails = {
			lstMrniteminfo : []
		};
	var rowsGenerateMRNItemSlave = $('#generateMRNRequestInfoTable tbody tr.newAdded').length;
	if (rowsGenerateMRNItemSlave == "" || rowsGenerateMRNItemSlave == null || rowsGenerateMRNItemSlave == 0) {
		alert("Please Enter Atleast One Record Under Given Item Info Table..!!");
		return false;
	}
	for ( var i = 1; i <= rowsGenerateMRNItemSlave; i++) {
		
		var itemSlaveId = $("#itemSlaveId" + i).val();
		var itemMasterId = $("#itemMasterIdGeneMrnReqTable" + i).val();
		var itemName = $("#txtItemNameId" + i).val();
		var mrnQuantity = $("#txtMrnQty" + i).val();
		var cancelMrnQty = $("#cancelMrnQty" + i).val();
		var uomUnit = $("#txtUom" + i).val();
		var currentSubInvStock = $("#currentSubInvStock" + i).val();
		//added sub remark generate mrn
		var subRemark = $("#subRemarkGenerateMRN" + i).val();
	    //added main inventory stock while generating the MRN request
		var mainInventoryStock = $("#currentInventoryStock" + i).val();
		var issueQuantity = 0;
		var pendingRequestItemQuantity = mrnQuantity;
		var requestedItemQuantity = mrnQuantity;
		var subInventoryNameSlave = subInventoryName;
		var subInventoryIdSlave = subInventoryId;
		
		
		
		if(itemName==null||itemName=="" || itemName=="null"){
			alert("Please Enter Item name..!!");
			return false;
		}
		if(mrnQuantity==null||mrnQuantity=="" || mrnQuantity=="null"){
			alert("Please Enter Quantity..!!");
			return false;
		}
		var updatedBy = 0;
		setGenerateMRNItemSlaveList(generateMRNItemSlaveDetails,itemSlaveId,itemMasterId,itemName,
				mrnQuantity,
				uomUnit,
				currentSubInvStock,issueQuantity,pendingRequestItemQuantity,requestedItemQuantity,cancelMrnQty,subInventoryNameSlave,subInventoryIdSlave,subRemark,updatedBy,mainInventoryStock);
	}
	
	
	generateMRNItemSlaveDetails = JSON.stringify(generateMRNItemSlaveDetails);
	
	var inputs = [];
	inputs.push('mrnId=' + id);
	inputs.push('mrnDate=' + mrnDate);
	inputs.push('mrnSubinventoryName=' + subInventoryName);
	inputs.push('mrnSubinventoryId=' + subInventoryId);
	inputs.push('mrnRemark=' + remark);
	inputs.push('mrnStatus=' + mrnStatus);
	inputs.push('generateMRNItemSlaveDetails=' + generateMRNItemSlaveDetails);
	
	inputs.push('userId=' + userId);
	inputs.push('userName=' + userName);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/saveGenerateMRNRequest",
		cache : false,
		success : function(r) {
			if (r == 1) {
				alertify.success("MRN Generated Sucessfully");
				$('#generateMRNRequestModal').modal('hide');
				$('#mrnTab').tab('show');
				onmrn();
				getInProcessStatusGeneratedMRNRequest();
				getAllGeneratedMRNRequestOnApprovedTab();
				refreshGenerateMrnModalAfterSave();
				setTimeout(function() {
					 window.location.reload();
					 }, 1000);
			} else if (r == 2) {
				alertify.success("MRN Updated Sucessfully");
				getInProcessStatusGeneratedMRNRequest();
				getAllGeneratedMRNRequestOnApprovedTab();
				getAllGeneratedMRNRequestDataForIndentTab();
				getConsumptionList();
				getAllStockRetrun();
				refreshGenerateMrnModalAfterSave();
				setTimeout(function() {
					 window.location.reload();
					 }, 1000);
				$('#generateMRNRequestModal').modal('hide');
			}  else {
				alertify.error("Oops Some Problem Ocured");
			}
			
		}
	});
	
	
}

/**
 * 
 * @param generateMRNItemSlaveDetails
 * @param itemSlaveId
 * @param itemName
 * @param mrnQuantity
 * @param uomUnit
 * @param currentSubInvStock
 */
function setGenerateMRNItemSlaveList(generateMRNItemSlaveDetails,itemSlaveId,itemMasterId,itemName,
		mrnQuantity,
		uomUnit,
		currentSubInvStock,issueQuantity,pendingRequestItemQuantity,requestedItemQuantity,cancelMrnQty,subInventoryNameSlave,subInventoryIdSlave,subRemark,updatedBy,mainInventoryStock) {
	
	generateMRNItemSlaveDetails.lstMrniteminfo.push({
		itemInfoId : (itemSlaveId != 'undefined' && itemSlaveId != null && itemSlaveId != 'null') ? itemSlaveId : 0,
		itemMasterId : (itemMasterId != 'undefined' && itemMasterId != null && itemMasterId != 'null') ? itemMasterId : 0,
		itemName : (itemName != 'undefined' && itemName != null && itemName != 'null') ? itemName : 'NA',
		mrnQuantity : (mrnQuantity != 'undefined' && mrnQuantity != null && mrnQuantity != 'null') ? mrnQuantity : 0,
		pendingRequestItemQuantity : (mrnQuantity != 'undefined' && mrnQuantity != null && mrnQuantity != 'null') ? mrnQuantity : 0,
		requestedItemQuantity : (mrnQuantity != 'undefined' && mrnQuantity != null && mrnQuantity != 'null') ? mrnQuantity : 0,
		itemUom : (uomUnit != 'undefined' && uomUnit != null && uomUnit != 'null') ? uomUnit : 'NA',
		currentSubInventoryStock : (currentSubInvStock != 'undefined' && currentSubInvStock != null && currentSubInvStock != 'null') ? currentSubInvStock : 0,
		itemIssueQty : (issueQuantity != 'undefined' && issueQuantity != null && issueQuantity != 'null') ? issueQuantity : 0,
		itemCanceledQty : (cancelMrnQty != 'undefined' && cancelMrnQty != null && cancelMrnQty != 'null') ? cancelMrnQty : 0,
		pendingRequestItemQuantity : (pendingRequestItemQuantity != 'undefined' && pendingRequestItemQuantity != null && pendingRequestItemQuantity != 'null') ? pendingRequestItemQuantity : 0,
		requestedItemQuantity : (requestedItemQuantity != 'undefined' && requestedItemQuantity != null && requestedItemQuantity != 'null') ? requestedItemQuantity : 0,
		subinventoryName : (subInventoryNameSlave != 'undefined' && subInventoryNameSlave != null && subInventoryNameSlave != 'null') ? subInventoryNameSlave : 'NA',
		sunInventoryId : (subInventoryIdSlave != 'undefined' && subInventoryIdSlave != null && subInventoryIdSlave != 'null') ? subInventoryIdSlave : 0,
		mrnSubRemark : (subRemark != 'undefined' && subRemark != null && subRemark != 'null') ? subRemark : 'NA',
		updatedBy : (updatedBy != 'undefined' && updatedBy != null && updatedBy != 'null') ? updatedBy : 0,
		mainInventoryStock : (mainInventoryStock != 'undefined' && mainInventoryStock != null && mainInventoryStock != 'null') ? mainInventoryStock : 0
	});
}

function onmrn() {
	$("#indentTab").css("background-color", "");
	$("#mrnTab").css("background-color", "#81A981");
	$("#recieved").css("background-color", "");
	$("#stock").css("background-color", "");

	$("#indentTab").css("color", "black");
	$("#mrnTab").css("color", "white");
	$("#recieved").css("color", "black");
	$("#stock").css("color", "black");

	$("#approved").css("background-color", "");
	$("#approved").css("color", "black");
	$("#approved").css("color", "");
	$("#approved").css("color", "black");

	$("#consumptionBY").css("background", "");
	$("#consumptionBY").css("color", "black");
	$("#availablestock").css("color", "black");
	$("#availablestock").css("background-color", "");

	$("#mrnReturn").css("background-color", "");
	$("#mrnReturn").css("color", "black");
}

/**
 * @since 27-12-2019
 * @comment created this functon to get in process status generated MRN request data after completing the indent process
 * @author Rohit Sandbhor
 * @param r 
 */
function getInProcessStatusGeneratedMRNRequest(){
	var subInventoryName = $("#generateMRNSearchId").val();
	var inputs = [];
	inputs.push('mrnSubinventoryName=' + subInventoryName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getInProcessStatusGeneratedMRNRequest',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setInProcessStatusGeneratedMRNDataToTable(r);
		}
	});
}

/********************************************************************************
 * @since 27-12-2019
 * @comment added this js function to set the generated MRN data to dynamic table
 * @author Rohit Sandbhor
 * @param r
 *******************************************************************************/
function setInProcessStatusGeneratedMRNDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstmrnmaster.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstmrnmaster[i].mrnId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstmrnmaster[i].mrnDate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstmrnmaster[i].userName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstmrnmaster[i].mrnSubinventoryName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstmrnmaster[i].mrnStatus
				+ '</td>'
				if(r.lstmrnmaster[i].mrnStatus == "In-Process" || r.lstmrnmaster[i].mrnStatus == "Dispatched" || r.lstmrnmaster[i].mrnStatus == "FullyReceived" || r.lstmrnmaster[i].mrnStatus == "PartiallyReceived" || r.lstmrnmaster[i].mrnStatus == "PartiallyReceivedQty"){
				htm = htm + ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" disabled data-target="#generateMRNRequestModal" data-name="approvedMRN" onclick=editGeneratedMRNData('
				+ r.lstmrnmaster[i].mrnId
				+ ')><i class="fa fa-edit"></i></button></td>'+
				//MRN View Button
				'<td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-info editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#generateMRNRequestModal" data-name="approvedMRN" onclick=viewGeneratedMRNData('
				+ r.lstmrnmaster[i].mrnId
				+ ')><i class="fa fa-eye"></i></button></td>'
				}
				else{
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#generateMRNRequestModal" data-name="approvedMRN" onclick=editGeneratedMRNData('
					+ r.lstmrnmaster[i].mrnId
					+ ')><i class="fa fa-edit"></i></button></td>'+
					//MRN View Button
					' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-info editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#generateMRNRequestModal" data-name="approvedMRN" onclick=viewGeneratedMRNData('
					+ r.lstmrnmaster[i].mrnId
					+ ')><i class="fa fa-eye"></i></button></td>'
				}
			     + '</tr>';
		index++;
		
		var numberOfRows='';
		var index1=1;
		var count=r.noOfPages;
		var numberOfPages=(count/10);
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +='<li class="disabled previous"><a class="page-link" href="#" tabindex="-1">Previous</a></li>';
			displayPagination=5;
		}
		$("#subinvname").val(r.lstmrnmaster[i].mrnSubinventoryName);
		for(var j=0;j<displayPagination;j++){
			numberOfRows +='<li onclick=paginationMRN('+index1+');><a>'+index1+'</a></li>';
			index1=index1+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationMRN("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesMRN').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#mrnRecordPagination').html(numberOfRows);
	}
	$("#mrnDataTableBodyId").html(htm);
};

/********************************************************************************
 * @since 27-12-2019
 * @comment below js function to edit the generated mrn master details on MRN tab
 * @author Rohit Sandbhor
 * @param id
 *******************************************************************************/
function editGeneratedMRNData(id) {
	document.getElementById("plusMinusButtonDivIdGeneratedMrn").style.display = "none";
	document.getElementById("approvedButtonId").style.visibility = "visible";
	document.getElementById("saveButtonId").style.visibility = "hidden";
	var inputs = [];
	var htm = "";
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/subInventory/editGeneratedMRNData",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$("#mrnId").val(r.mrnId);
			$("#mrnDate").val(r.mrnDate);
			$("#subInventoryNameId").val(r.mrnSubinventoryName);
			$("#subInventoryIdInsideModal").val(r.mrnSubinventoryId);
			$("#remark").val(r.mrnRemark);
			$("#mrnStatusReceivedId").val("In-Process");
			for ( var i = 1; i <= r.lstMrniteminfo.length; i++) {
				var currentSubInventoryStock = getCurrentSubInventoryStockWithoutBatch(r.lstMrniteminfo[i-1].itemMasterId,r.lstMrniteminfo[i-1].sunInventoryId);
				htm = htm + "<tr id='multiTr"+i+"' class='newAdded'> "
						+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+i+"' value='"+i+"'></td>"
						+ "<td class='col-md-1 center'><span id='snum"+i+"'>"+i+"</span><input type='hidden' value="+r.lstMrniteminfo[i-1].itemMasterId+" id='itemMasterIdGeneMrnReqTable"+i+"'></td>"
						+ "<td class='col-md-1 center' style='display:none'><span id='snum"+i+"'>"+i+"</span><input type='hidden' value="+r.lstMrniteminfo[i-1].itemInfoId+" id='itemSlaveId"+i+"'></td>"
						+ "<td class='col-md-3 center'><input type='text' id='txtItemNameId"+i+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' value='"+r.lstMrniteminfo[i-1].itemName+"' data-name='generateMRNRequest'> </td>"
						+ "<td class='col-md-1 center'><input type='text' id='txtMrnQty"+i+"' value="+r.lstMrniteminfo[i-1].mrnQuantity+" class='form-control input-SmallText'> </td>"
						+ "<td class='col-md-1 center' style='display:none'><input type='text' id='cancelMrnQty"+i+"' value="+r.lstMrniteminfo[i-1].itemCanceledQty+" class='form-control input-SmallText'> </td>"
						+ "<td class='col-md-1 center'><select id='txtUom"+i+"'  class='form-control input-SmallText'></select> </td>"
						+ "<td class='col-md-1 center'><input type='text' id='currentSubInvStock"+i+"' readonly value="+currentSubInventoryStock+" class='form-control input-SmallText '> </td>"
						+ "<td class='col-md-1 center'><input type='text' id='currentInventoryStock"+i+"' readonly value="+r.lstMrniteminfo[i-1].mainInventoryStock+" class='form-control input-SmallText '> </td>"
				        + "<td class='col-md-1 center'><input type='text' id='subRemarkGenerateMRN"+i+"' class='form-control input-SmallText ' value='"+r.lstMrniteminfo[i-1].mrnSubRemark+"'> </td>"
				        
						+ "</tr>";
			}
			$("#generateMRNRequestTableBodyId").html(htm);
			var unitId = $("#unitId").val();
			var inputs = [];
			inputs.push('unitId=' + unitId);
			var str = inputs.join('&');
			jQuery.ajax({
		        async : false,
		        type : "POST",
		        data : str + "&reqType=AJAX",
		        url : "ehat/inventoryM/getAllUnitMaster",
		        error : function() {
		            alert('error');
		        },
		        success : function(res){    
		        	 var htm="<option value='0'>--Select--</option>";
		        	    for ( var i = 0; i < res.lstunitmaster.length; i++){    
		        	        htm = htm + "<option value='"+res.lstunitmaster[i].uniId+"'>"+res.lstunitmaster[i].unitName+"</option>";
		        	    }
		        	    for ( var i = 1; i <= r.lstMrniteminfo.length; i++) {
		        	    	  $("#txtUom"+i).html(htm);
		        	    	  $("#txtUom"+i).select2();
				        	  $('#txtUom' +i).select2('val',r.lstMrniteminfo[i-1].itemUom);
		        	    }
		        	          
		        }
		    });
			
		}
	
	});
};
/********************************************************************************
 * @since 06-04-2020
 * @comment below js function to view the generated mrn master details on MRN tab
 * @author Rohit Sandbhor
 * @param id
 *******************************************************************************/
function viewGeneratedMRNData(id) {
	document.getElementById("plusMinusButtonDivIdGeneratedMrn").style.display = "none";
	document.getElementById("approvedButtonId").style.visibility = "hidden";
	document.getElementById("saveButtonId").style.visibility = "hidden";
	document.getElementById("remark").setAttribute("readonly", "true");
	var inputs = [];
	var htm = "";
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/subInventory/viewGeneratedMRNData",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$("#mrnId").val(r.mrnId);
			$("#mrnDate").val(r.mrnDate);
			$("#subInventoryNameId").val(r.mrnSubinventoryName);
			$("#subInventoryIdInsideModal").val(r.mrnSubinventoryId);
			$("#remark").val(r.mrnRemark);
			$("#mrnStatusReceivedId").val("In-Process");
			//alert("r.lstMrniteminfo.length::"+JSON.stringify(r));
			/*if(r.mrnStatus == "OPEN" || r.mrnStatus == "In-Process"){
				alert("Once you issued the MRN qty then only you can view this perticular MRN..!!!");
				$('#generateMRNRequestModal').modal('hide');
				onCloseBtnRefrshPageSubInventoryGenerateEditMrnRequest();
				//$('#generateMRNRequestModal').modal('toggle');
			}*/
			for ( var i = 1; i <= r.lstMrniteminfo.length; i++) {
				var currentSubInventoryStock = getCurrentSubInventoryStockWithoutBatch(r.lstMrniteminfo[i-1].itemMasterId,r.lstMrniteminfo[i-1].sunInventoryId);
				htm = htm + "<tr id='multiTr"+i+"' class='newAdded'> "
						+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+i+"' value='"+i+"'></td>"
						+ "<td class='col-md-1 center'><span id='snum"+i+"'>"+i+"</span><input type='hidden' value="+r.lstMrniteminfo[i-1].itemMasterId+" id='itemMasterIdGeneMrnReqTable"+i+"'></td>"
						+ "<td class='col-md-1 center' style='display:none'><span id='snum"+i+"'>"+i+"</span><input type='hidden' value="+r.lstMrniteminfo[i-1].itemInfoId+" id='itemSlaveId"+i+"'></td>"
						+ "<td class='col-md-3 center'><input type='text' readonly  id='txtItemNameId"+i+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' value='"+r.lstMrniteminfo[i-1].itemName+"' data-name='generateMRNRequest'> </td>"
						+ "<td class='col-md-1 center'><input type='text' readonly  id='txtMrnQty"+i+"' value="+r.lstMrniteminfo[i-1].mrnQuantity+" class='form-control input-SmallText'> </td>"
						+ "<td class='col-md-1 center' style='display:none'><input type='text' readonly  id='cancelMrnQty"+i+"' value="+r.lstMrniteminfo[i-1].itemCanceledQty+" class='form-control input-SmallText'> </td>"
						+ "<td class='col-md-1 center'><select id='txtUom"+i+"' disabled class='form-control input-SmallText'></select> </td>"
						+ "<td class='col-md-1 center'><input type='text' id='currentSubInvStock"+i+"' readonly value="+currentSubInventoryStock+" class='form-control input-SmallText '> </td>"
						+ "<td class='col-md-1 center'><input type='text' id='currentInventoryStock"+i+"' readonly value="+r.lstMrniteminfo[i-1].mainInventoryStock+" class='form-control input-SmallText '> </td>"
						+ "<td class='col-md-1 center'><input type='text' id='subRemarkGenerateMRN"+i+"' readonly class='form-control input-SmallText ' value="+r.lstMrniteminfo[i-1].mrnSubRemark+"> </td>"
						+ "</tr>";
			}
			$("#generateMRNRequestTableBodyId").html(htm);
			var unitId = $("#unitId").val();
			var inputs = [];
			inputs.push('unitId=' + unitId);
			var str = inputs.join('&');
			jQuery.ajax({
		        async : false,
		        type : "POST",
		        data : str + "&reqType=AJAX",
		        url : "ehat/inventoryM/getAllUnitMaster",
		        error : function() {
		            alert('error');
		        },
		        success : function(res){    
		        	 var htm="<option value='0'>--Select--</option>";
		        	    for ( var i = 0; i < res.lstunitmaster.length; i++){    
		        	        htm = htm + "<option value='"+res.lstunitmaster[i].uniId+"'>"+res.lstunitmaster[i].unitName+"</option>";
		        	    }
		        	    for ( var i = 1; i <= r.lstMrniteminfo.length; i++) {
		        	    	  $("#txtUom"+i).html(htm);
		        	    	  $("#txtUom"+i).select2();
				        	  $('#txtUom' +i).select2('val',r.lstMrniteminfo[i-1].itemUom);
		        	    }
		        	          
		        }
		    });
			
		}
	
	});
};
/**
 * 
 * @param count
 */
function updateSubInventoryItemStockQuantity(count) {
	document.getElementById("accept" + count).disabled = true;
	var itemSlaveId = $("#itemSlaveIdForApproval" + count).val();
	var goodsIssueSlaveId = $("#goodsIssueSlaveId" + count).val();
	var mrnId = $("#mrnId").val();
	var requiredQuantityBatchWise = $("#itemIssueQtyId" + count).val();
	var totalIssueQty = $("#totalIssueQtyIdIssueMrn").val();
	var itemMasterId = $("#itemMasterIdEditMrnGeneDataAppoval" + count).val();
	var itemBatchCode = $("#itemBatchCodeId" + count).val();
	var goodsIssueMrnId =  $("#goodsIssueMrnId").val();
	var totalPendingQuantity = $("#totalPendingQtyIdIssueMrn").val();
	var subInventoryIdInsideModalOnApproval = $("#subInventoryIdInsideModalOnApproval").val();
	//added by rohit 16-09-2020 22222222222222222222222222222
	var itemBatchExpDate = $("#itemBatchExpId" + count).val();
	if(itemBatchExpDate == "NA"){
		itemBatchExpDate = "1970-01-01";
	}
	var mrnStatus = "";
	if(Number(totalPendingQuantity) == 0){
		mrnStatus = "FullyReceived";
	}
	else{
		//this status indetifies the partially received qty in issues mrn tab na d get reflected into two
		// tables inv_goods_issue_mrn_item_slave_new & inv_mrn_master_new
		// PartiallyReceivedQty - this mrn status comes from goods issue save
		// PartiallyReceivedQty - this mrn staus comes from after we accept the lead in issued mrn tab 
		mrnStatus = "PartiallyReceivedQty";
	}
	var inputs = [];
	inputs.push("itemSlaveId="+ encodeURIComponent(itemSlaveId));
	inputs.push("mrnId="+ encodeURIComponent(mrnId));
	inputs.push("requiredQuantityBatchWise="+ encodeURIComponent(requiredQuantityBatchWise));
	inputs.push("itemMasterId="+ encodeURIComponent(itemMasterId));
	inputs.push("itemBatchCode="+ encodeURIComponent(itemBatchCode));
	inputs.push("goodsIssueMrnId="+encodeURIComponent(goodsIssueMrnId));
	inputs.push("mrnStatus="+encodeURIComponent(mrnStatus));
	inputs.push("goodsIssueSlaveId="+encodeURIComponent(goodsIssueSlaveId));
	//added by rohit 16-09-2020
	inputs.push("itemBatchExpDate="+encodeURIComponent(itemBatchExpDate));
	inputs.push("subInventoryIdInsideModalOnApproval="+encodeURIComponent(subInventoryIdInsideModalOnApproval));
	var str = inputs.join('&');
	//return false;
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/updateSubInventoryItemStockQuantity',
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r == 0) {
				alertify.success("Item Received Successfully");
				getInProcessStatusGeneratedMRNRequest();
				getAllGeneratedMRNRequestOnApprovedTab();
				getAllGeneratedMRNRequestDataForIndentTab();
				getReceivedMrnData();
				getConsumptionList();
				getAllStockRetrun();
			}
			else{
				alertify.error("Technical Problem");
			}
		}
	});

}

/********************************************************************************
 * @since 15-01-2020
 * @comment below js function to edit the generated mrn master details on MRN tab for received tab
 * @author Rohit Sandbhor
 * @param id
 *******************************************************************************/
function editReceivedGeneratedMRNData(goodsIssueMasterId) {
	var inputs = [];
	var htm = "";
	inputs.push('goodsIssueMasterId=' + goodsIssueMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/subInventory/viewReceivedGeneratedMRNData",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$("#mrnId").val(r.mrnId);
			$("#mrnDateReceivedId").val(getDate(r.updatedDate));
			$("#subInventoryNameReceivedId").val(r.mrnSubinventoryName);
			$("#subInventoryReceivedId").val(r.mrnSubinventoryId);
			$("#remarkReceivedId").val(r.mrnRemark);
			$("#mrnStatusReceivedId").val("In-Process");
			
			for ( var i = 1; i <= r.goodsIssueMrnItemSlaveDtos.length; i++) {
				htm = htm
				+
				"<tr id='multiTr"+i+"' class='newAdded'> "
						+ "<td class='col-md-1 center'><span id='snum"+i+"'>"+i+"</span><input type='hidden' value="+r.goodsIssueMrnItemSlaveDtos[i-1].itemMasterId+" id='itemMasterIdForReceivedMrn"+i+"'></td>"
						+ "<td class='col-md-3 center'><input style='width:150px;' type='text' readonly id='itemNameReceivedMrn"+i+"' class='form-control input-SmallText' value='"+r.goodsIssueMrnItemSlaveDtos[i-1].itemName+"'> </td>"
						+ "<td class='col-md-2 center'><input style='width:70px;' type='text' readonly id='requestQuantityReceivedMrn"+i+"' value="+r.goodsIssueMrnItemSlaveDtos[i-1].requestedItemQuantity+" class='form-control input-SmallText'> </td>"
						+ "<td class='col-md-2 center'><input style='width:100px;' type='text' readonly id='uomNameReceivedMrn"+i+"' value="+r.goodsIssueMrnItemSlaveDtos[i-1].uomUnitName+" class='form-control input-SmallText'> </td>"
						+ "<td class='col-md-1 center'><input style='width:150px;' type='text' readonly id='batchCodeReceivedMrn"+i+"' value="+r.goodsIssueMrnItemSlaveDtos[i-1].itemBatchCode+" class='form-control input-SmallText '> </td>"
						+ "<td class='col-md-1 center'><input style='width:150px;' type='text' readonly id='batchExpDateReceivedMrn"+i+"' value="+r.goodsIssueMrnItemSlaveDtos[i-1].itemBatchExpDate+" class='form-control input-SmallText '> </td>"
						+ "<td class='col-md-1 center'><input style='width:70px;' type='text' readonly id='currentSubInvStockReceivedMrn"+i+"' value="+r.goodsIssueMrnItemSlaveDtos[i-1].currentSubInventoryStockUpdated+" class='form-control input-SmallText '> </td>"
						+ "</tr>";
			
			}
			$("#generateMRNRequestTableBodyIdForReceived").html(htm);
		}
	
	});
};

/**
 * @since 12-03-2020
 * @comment created this js function to clear consupmtion form details after closing the modal
 * @author Rohit Sandbhor
 */
function onCloseBtnRefrshPageSubInventory() {
	$("#mrnId").val(0);
	$("#consumptionId").val(0);
	$("#mrnReturnId").val(0);
	$("#mrnrejectId").val(0);
	$("#goodsIssueMrnId").val(0);
	document.getElementById('dispensedToId').disabled = false;
	document.getElementById('consumedById').disabled = false;
	document.getElementById('consumptionRemark').disabled = false;
	$("#consumptionRemark").val(" ");
	$('#generateConsumptionRequestModal').on('hidden.bs.modal', function () {
	    $('#generateConsumptionRequestModal form')[0].reset();
	    });
	var tableHeaderRowCount = 1;
	var table = document.getElementById('consumptionRequestTable');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
}

/**
 * @since 22-01-2020
 * @comment This js function is created for to update the MRN status after receiving full quantity of product
 * @author Rohit Sandbhor
 * @param mrnId
 */
function fullyReceivedMrnStatus(mrnId){
	var conformationStatus = confirm("Are you sure to receive this MRN ?");
	if (conformationStatus) {
		var inputs = [];
		inputs.push('mrnId=' + mrnId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : 'POST',
			data : str + "&reqType=AJAX",
			url : 'ehat/subInventory/updateFullyReceivedMrnStatus',
			timeout : 1000 * 60 * 5,
			catche : false,
			success : function(r) {
				//setReceivedGeneratedMRNDataToTable(r);
			}
		});
	}
}
/**
 * @since 29-01-2020
 * @author Rohit Sandbhor
 * @comment to close the modal on item purchase details modal on generate MRN
 */
function closeItemPurchaseDetailsModalOnGenerateMRN(){
	/*alert("roooo::");
	var serialNo = document.getElementById("hiddenSerialNoId").value;
	$("#itemMasterIdGeneMrnReqTable"+serialNo).val(0);*/
	$("#generateMRNModalId").modal("hide");
}

function updateBatchStockSubInvQuantity(){
	var subInventoryId = $("#subInventoryIdInsideModalOnApproval").val();
	var batchStockDetails = {
			lstBatchStockDto : []
		};
	var rowsGenerateMRNItemSlave = $('#generateMRNRequestTableBodyIdForApproval tbody tr.newAdded').length;
	if (rowsGenerateMRNItemSlave == "" || rowsGenerateMRNItemSlave == null || rowsGenerateMRNItemSlave == 0) {
		alert("Please Enter Atleast One Record Under Given Item Info Table..!!");
		return false;
	}
	for ( var i = 1; i <= rowsGenerateMRNItemSlave; i++) {
		var itemMasterId = $("#itemMasterId" + i).val();
		var itemName = $("#txtItemNameId" + i).val();
		var mrnQuantity = $("#pendingReqItemQuantity" + i).val();
		var issueQuantity = $("#issuedQuantity" + i).val();
		var itemBatchCode = $("#itemBatchCodeId" + i).val();
		var itemBatchExpDate = $("#itemBatchExpDate" + i).val();
		var totalQuantity = mrnQuantity + issueQuantity;
		setBatchStockValues(batchStockDetails,itemMasterId,itemName,
				issueQuantity,totalQuantity,subInventoryId,itemBatchCode,itemBatchExpDate);
	}
	batchStockDetails = JSON.stringify(batchStockDetails);
	var inputs = [];
	inputs.push('batchStockDetails=' + batchStockDetails);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/updateBatchStock",
		cache : false,
		success : function(r) {
			
		}
	});
	
}

/**
 * @since 13-01-2020
 * @comment created this functon to get all get generated MRN data for indent tab with current sub inv stock batch wise
 * @author Rohit Sandbhor
 * @param r 
 */
function getAllGeneratedMRNRequestDataForIndentTab(){
	var subInventoryId = $("#subInventoryId").val();
	var inputs = [];
	inputs.push('subInventoryId=' + subInventoryId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getAllGeneratedMRNRequestDataForIndentTab',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setGeneratedMRNIndentTabDataToTable(r);
		}
	});
}
/**
 * 
 * @param r
 */
function setGeneratedMRNIndentTabDataToTable(r) {
	var htm = "";
	var index = 1;
	if(r.goodsIssueMrnItemSlaveDtos !=null && r.goodsIssueMrnItemSlaveDtos !=""){
		for ( var i = 0; i < r.goodsIssueMrnItemSlaveDtos.length; i++) {
			if(r.goodsIssueMrnItemSlaveDtos[i].currentSubInventoryStockUpdated == null){
				return false;
			}
			var expDate =new Date(r.goodsIssueMrnItemSlaveDtos[i].itemBatchExpDate).toLocaleDateString('en-GB');
			if(expDate == null || expDate =='' || expDate == "1970-01-01" || expDate == "NaN-aN-aN" ||expDate =="Invalid Date"){
				expDate = "NA";
			}
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.goodsIssueMrnItemSlaveDtos[i].itemName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.goodsIssueMrnItemSlaveDtos[i].itemMasterId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.goodsIssueMrnItemSlaveDtos[i].itemBatchCode
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ expDate
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.goodsIssueMrnItemSlaveDtos[i].currentSubInventoryStockUpdated
					+ '</td>'
					 + '</tr>';
			index++;
		}
	}
	$("#indentTabDataTbodyId").html(htm);
};

/**
 * @author Rohit Sandbhor
 * @Since 31-12-2019
 * @param id
 * @returns {String}
 */
function generateConsumptionRequestTableBody(id){
		var tbody = "<tr id='multiTrConsumption"+id+"' class='newAdded'>"
		+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkboxConsumption"+id+"' value='"+id+"'></td>"
		+ "<td class='col-md-1 center' style='display:none'><input type='text' id='itemSlaveConsumpId"+id+"' value='0'></td>"
		+ "<td class='col-md-1 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemMasterIdConsumption"+id+"' value='0'></td>"
		+ "<td class='col-md-3 center'><input type='text' id='txtItemNameConsumptionId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='consumptionRequest'> </td>"
		+ "<td class='col-md-2 center'><input type='text' id='itemBatchCodeConsumpId"+id+"' readonly class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-2 center'><input type='text' id='itemBatchExpDateConsumpId"+id+"' readonly class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-2 center'><input type='text' id='txtUomConsumption"+id+"' readonly class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-2 center'><input type='number' min='0' oninput='this.value = Math.abs(this.value)' id='issuedQuantityConsumption"+id+"' class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvStockConsumption"+id+"' class='form-control input-SmallText '> </td>"
		+ "<td class='col-md-1 center'><select id='consumptionType"+id+"'  class='form-control input-SmallText '><option value='NA' >--Select Type--</option><option value='Consumed'>Consumed</option><option value='In-Use'>In-Use</option></select> </td>"
		+ "<td class='col-md-3 center'><textarea  style='width: 240px; height: 39px;' id='subRemarkConsumption" + id + "' /> </td>"
		+ "</tr>";
		return tbody;	
}


/**
 * @author Rohit Sandbhor
 * @Since 31-12-2019
 * @param id
 * @returns {String}
 */
function generateConsumptionRequestTableBodyByAddButtonConsumption(id){
		var mainTable = document.getElementById("consumptionRequestTable");
		var mainTableLength =  mainTable.rows.length;
		if(mainTableLength == 1){
			var tbody = "<tr id='multiTrConsumption"+id+"' class='newAdded'>"
			+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkboxConsumption"+id+"' value='"+id+"'></td>"
			+ "<td class='col-md-1 center' style='display:none'><input type='text' id='itemSlaveConsumpId"+id+"' value='0'></td>"
			+ "<td class='col-md-1 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemMasterIdConsumption"+id+"' value='0'></td>"
			+ "<td class='col-md-3 center'><input type='text' id='txtItemNameConsumptionId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='consumptionRequest'> </td>"
			+ "<td class='col-md-2 center'><input type='text' id='itemBatchCodeConsumpId"+id+"' readonly class='form-control input-SmallText'> </td>"
			+ "<td class='col-md-2 center'><input type='text' id='itemBatchExpDateConsumpId"+id+"' readonly class='form-control input-SmallText'> </td>"
			+ "<td class='col-md-2 center'><input type='text' id='txtUomConsumption"+id+"' readonly class='form-control input-SmallText'> </td>"
			+ "<td class='col-md-2 center'><input type='number' min='0' oninput='this.value = Math.abs(this.value)' id='issuedQuantityConsumption"+id+"' class='form-control input-SmallText'> </td>"
			+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvStockConsumption"+id+"' class='form-control input-SmallText '> </td>"
			+ "<td class='col-md-1 center'><select id='consumptionType"+id+"'  class='form-control input-SmallText '><option value='NA' >--Select Type--</option><option value='Consumed'>Consumed</option><option value='In-Use'>In-Use</option></select> </td>"
			+ "<td class='col-md-3 center'><textarea  style='width: 240px; height: 39px;' id='subRemarkConsumption" + id + "' /> </td>"
			+ "</tr>";
			return tbody;
		}
		else{
		var newid = id - 1;
		var tbody = "<tr id='multiTrConsumption"+id+"' class='newAdded'>"
		+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkboxConsumption"+id+"' value='"+id+"'></td>"
		+ "<td class='col-md-1 center' style='display:none'><input type='text' id='itemSlaveConsumpId"+id+"' value='0'></td>"
		+ "<td class='col-md-1 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemMasterIdConsumption"+id+"' value='0'></td>"
		+ "<td class='col-md-3 center'><input type='text' id='txtItemNameConsumptionId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='consumptionRequest'> </td>"
		+ "<td class='col-md-2 center'><input type='text' id='itemBatchCodeConsumpId"+id+"' readonly class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-2 center'><input type='text' id='itemBatchExpDateConsumpId"+id+"' readonly class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-2 center'><input type='text' id='txtUomConsumption"+id+"' readonly class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-2 center'><input type=''number' min='0' oninput='this.value = Math.abs(this.value)' id='issuedQuantityConsumption"+id+"' class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvStockConsumption"+id+"' class='form-control input-SmallText '> </td>"
		+ "<td class='col-md-1 center'><select id='consumptionType"+id+"'  class='form-control input-SmallText '><option value='NA' >--Select Type--</option><option value='Consumed'>Consumed</option><option value='In-Use'>In-Use</option></select> </td>"
		+ "<td class='col-md-3 center'><textarea  style='width: 240px; height: 39px;' id='subRemarkConsumption" + id + "' /> </td>"
		+ "</tr>";
		var batchCode = $("#itemBatchCodeConsumpId"+newid).val();
		if(batchCode == null || batchCode == ""){
			alert("You Cannot Add Row Without Filling Previous Row Values...!!!");
			return false;
		}
		return tbody;	
		}
}

function getCurrentSubStockBatchWiseForConsumption(itemMasterId,subInvIdConsumption,currentTableLen,inputID){
	var index = inputID.replace(/\D/g, '');
	getCurrentSubStockBatchWise(itemMasterId,subInvIdConsumption,currentTableLen,index);
	$('#batchWiseSubInvStockModal').modal('show');
}

/**
 * 
 * @param itemMasterId
 */
function getCurrentSubStockBatchWise(itemMasterId,subInvIdConsumption,currentTableLen,index) {
    var inputs = [];
    inputs.push('itemMasterId=' + itemMasterId);
    inputs.push('subInvIdConsumption=' + subInvIdConsumption);
    var str = inputs.join('&');
    jQuery.ajax({
        async: true,
        type: 'POST',
        data: str + "&reqType=AJAX",
        url: 'ehat/subInventory/getCurrentSubStockBatchWise',
        timeout: 1000 * 60 * 5,
        catche: false,
        success: function(r) {
        	if(r.goodsIssueMrnItemSlaveDtos.length == 0){
        		$('#batchWiseSubInvStockModal').modal('hide');
        		alert("This Item Not Added Under This Subinventory Yet..!!");
        		return false;
        	}
        	else{
            for (var i = 1; i <= r.goodsIssueMrnItemSlaveDtos.length; i++) {
                if (i == 1) {
                    $("#batchWiseSubInvStockTbody")
                        .html(
                            "<tr><td>" +
                            "<input type='radio' class='rohit' name='row' id='rowId" +
                            i +
                            "' value=" +
                            i +
                            "  autofocus='autofocus'></td>" +
                            
                            
                            "<td style='display:none'><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' value='"+index+"' id='currentTableLen" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            
                            
                            
                            "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='itemNameId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            "<td style='display:none'><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' value=" + itemMasterId + "  id='itemId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='itemUOMUnitConId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>"
                            +
                            "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='itemBatchCodeConId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='itemExpDateConId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='subInvStockConId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            "</tr>");
                } else {
                    $("#batchWiseSubInvStockTbody")
                        .append(
                        		"<tr><td>" +
                                "<input type='radio' class='rohit' name='row' id='rowId" +
                                i +
                                "' value=" +
                                i +
                                "  autofocus='autofocus'></td>" +
                                
                                
                                "<td style='display:none'><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' value='"+index+"' id='currentTableLen" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                
                                
                                
                                "<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='itemNameId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                "<td style='display:none'><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' value=" + itemMasterId + "  id='itemId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                "<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='itemUOMUnitConId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>"
                                +
                                "<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='itemBatchCodeConId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                "<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='itemExpDateConId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                "<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='subInvStockConId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                "</tr>");

                }
               
                	$("#itemId" + i).val(itemMasterId);
                    $("#itemNameId" + i).val(r.goodsIssueMrnItemSlaveDtos[i-1].itemName);
                    $("#itemUOMUnitConId" + i).val(r.goodsIssueMrnItemSlaveDtos[i-1].uomUnitName);
                    $("#itemBatchCodeConId" + i).val(r.goodsIssueMrnItemSlaveDtos[i-1].itemBatchCode);
                    var expDateConsumption = getDate(r.goodsIssueMrnItemSlaveDtos[i-1].itemBatchExpDate);
                    if(expDateConsumption == null || expDateConsumption =='' || expDateConsumption == "1970-01-01" || expDateConsumption == "NaN-aN-aN"){
                    	expDateConsumption = "NA";
    				}
                    $("#itemExpDateConId" + i).val(expDateConsumption);
                    $("#subInvStockConId" + i).val(r.goodsIssueMrnItemSlaveDtos[i-1].currentSubInventoryStockUpdated);

                }

            }
        }
        
    });

}

/**
 * 
 */
function setModalInfoToTableOnConsumptionRequest()
{
	var table = document.getElementById("batchWiseSubInvStockTableId");
	var consumptionSlaveTableLength = table.rows.length;
	var newLength = consumptionSlaveTableLength - 1;
	var checkBoxCheckCount = $('input[name=row]:checked').length;
	if(checkBoxCheckCount == 0){
		alert("Atleat Select 1 Radio button to fetch the values..!!");
		return false;
	}
	var mainTable = document.getElementById("consumptionRequestTable");
	var mainTableLength =  mainTable.rows.length;
	var newcount = checkBoxCheckCount - 1;
	if(newcount == 0){
		newcount = 1;
	}
	var currentIndex =0;
	for(var j = 1 ; j <=newcount ; j++){
		//addNewRowInTable('consumptionRequestTable','addConsumptionRequest');
		var currentTableLen = $("#currentTableLen" +j).val();
		currentIndex = $("#currentTableLen" +j).val();
	}
	setTableValuesToConsumptionSlave(checkBoxCheckCount,consumptionSlaveTableLength,newLength,mainTableLength,currentTableLen,currentIndex);

	
}
/**
 * 
 * @param checkBoxCheckCount
 * @param consumptionSlaveTableLength
 * @param newLength
 */
function setTableValuesToConsumptionSlave(checkBoxCheckCount, consumptionSlaveTableLength,newLength,mainTableLength,currentTableLen,currentIndex) {
	if(checkBoxCheckCount > 1){
				for(var i = 1 ; i<= consumptionSlaveTableLength; i++){
					for(var y = 1 ; y<= consumptionSlaveTableLength; y++){
						
						var checkedValue = null; 
						var inputElements = document.getElementsByClassName('rohit');
						for(var l=0; inputElements[l]; ++l){
						      if(inputElements[l].checked){
						           checkedValue = inputElements[l].value;
											if(i <= checkBoxCheckCount){
														$('#itemMasterIdConsumption' + currentTableLen).val($('#itemId' + checkedValue).val());
														$('#txtItemNameConsumptionId' + currentTableLen).val($('#itemNameId' + checkedValue).val());
														$('#itemBatchCodeConsumpId' + currentTableLen).val($('#itemBatchCodeConId' + checkedValue).val());
														$('#itemBatchExpDateConsumpId' + currentTableLen).val($('#itemExpDateConId' + checkedValue).val());
														$('#txtUomConsumption' + currentTableLen).val($('#itemUOMUnitConId' + checkedValue).val());
														$('#currentSubInvStockConsumption' + currentTableLen).val($('#subInvStockConId' + checkedValue).val());
														currentTableLen++;
														i++;
											}
						      }
						}
						closeConsumptioRequestModalOnGenerateMRN();
	}
	}
	}
	else{
		var set = mainTableLength - 1;
		for(var j = 1 ; j<= checkBoxCheckCount; j++){
			var totalCheckboxes = $('input[name=row]:checked').val();
			$('#itemMasterIdConsumption' + currentIndex).val($('#itemId' + totalCheckboxes).val());
			$('#txtItemNameConsumptionId' + currentIndex).val($('#itemNameId' + totalCheckboxes).val());
			$('#itemBatchCodeConsumpId' + currentIndex).val($('#itemBatchCodeConId' + totalCheckboxes).val());
			$('#itemBatchExpDateConsumpId' + currentIndex).val($('#itemExpDateConId' + totalCheckboxes).val());
			$('#txtUomConsumption' + currentIndex).val($('#itemUOMUnitConId' + totalCheckboxes).val());
			$('#currentSubInvStockConsumption' + currentIndex).val($('#subInvStockConId' + totalCheckboxes).val());
			closeConsumptioRequestModalOnGenerateMRN();
		}
	}
			
}
/********************************************************************************
 * @Since 06-02-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to get the dispenser name on subinventory consumption tab
*******************************************************************************/
function getAutoDispenserName(inputID) {
	var categoryName = $("#" + inputID).attr('data-name');
	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];
	inputs.push('userName=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/subInventory/getAutoSuggestionListDispenser",
				cache : false,
				success : function(r) {

					// for server
					/*if(r.ul.length==0){
						 alertify.error("You Cannot Insert Other User Name...!!!");
							document.getElementById('dispensedToId').value = "";
							return false;
					 }
					var template = "";
					
					for ( var j = 0; j < r.ul.length; j++) {
						var newId = r.ul[j].ui;
						var arrValue = r.ul[j].ui + "-"
								+ r.ul[j].un;
							
						var id = r.ul[j].ui;
						var userName = r.ul[j].un;
						resultData.push({
							ID : id,
							Name : userName
						});
						if(categoryName == "dispenserName"){
						template = template + '<li data-value="' + id
								+ '" class=""><a href="#">' + userName
								+ '</a></li>';
						}
						
					}*/
					// for local
					if(r.usersList.length==0){
						 alertify.error("You Cannot Insert Other User Name...!!!");
							document.getElementById('dispensedToId').value = "";
							return false;
					 }
					var template = "";
					
					for ( var j = 0; j < r.usersList.length; j++) {
						var newId = r.usersList[j].user_ID;
						var arrValue = r.usersList[j].user_ID + "-"
								+ r.usersList[j].user_Name +"-"+ r.usersList[j].user_Type;
							
						var id = r.usersList[j].user_ID;
						var userName = r.usersList[j].user_Name;
						resultData.push({
							ID : id,
							Name : userName
						});
						if(categoryName == "dispenserName"){
						template = template + '<li data-value="' + id
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
						}
						
					}
					
					
					
					if(categoryName == "dispenserName"){
					setTimeout(
							function() {
								$("div#searchDispenserDivId .typeahead")
										.html(template);
								$("div#searchDispenserDivId .typeahead")
										.show();

								$("input#" + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayDispenserNameResult,
									scrollBar : true
								});
								$("input#" + inputID).data('typeahead').source = resultData;
							}, 500);
					}
					
				}
			});
	function displayDispenserNameResult(item) {
		 var userId = item.value;
		 document.getElementById("dispenserId").value = userId;
	}
}

/**
 * 
 */
function addDispensedtoOthersName() {
	var checkBox = document.getElementById("otherId").checked;
	if (checkBox == true) {
		$("#dispenseToOtherDivId").show();
		document.getElementById("dispensedToId").disabled = true;
		$("#dispensedToId").val('');
		$("#dispenserId").val(0);
	} else {
		$("#dispenseToOtherDivId").hide();
		document.getElementById("dispensedToId").disabled = false;
	}

}

/**
 * @author Rohit Sandbhor
 * @since 28-02-2020
 * @comment created this js function to save the consumption request
 * @returns {Boolean}
 */
function saveConsumptionDetails(){
	var consumptionId = $("#consumptionId").val();
	var dispensedDate = $("#dispensedDateId").val();
	var consumedBy = $("#consumedById").val();
	var dispenser = $("#dispenserId").val();
	var dispensedTo = $("#dispensedToId").val();
	var dispensedToOther = $("#dispensedToOtherId").val();
	var remark = $("#consumptionRemark").val();
	var subInvName = $("#subInventoryNameId").val();
	var SubInvId = $("#subInventoryIdInsideModal").val();
	var userId = $('#userId').val();
	var userName = $("#userNameId").val();
	
	var patientId = $('#patientId').val();
	var patientName = $('#patientName').val();
	var dept = $('#departMent').val();
	    var department="0";
	    if(dept==1){
	    	department="opd";
	    }else if(dept==2){
	    	department="ipd";
	    }else{
	    	department="NA";
	    }
	    
	    if(consumedBy==0||consumedBy==""){
	    	alert("Please Select Consumed By First");
	    	return false;
	    }
	    if(consumedBy=="Individual"){
	    	if(dispensedTo==null||dispensedTo==""||dispensedTo=="null" ){
	    		alert("Please Enter Dispense To Name");
	    		return false;
	    	}
	    	
	    }else{
	    	dispensedTo="NA";
	    }
	
	    if(consumedBy=="Patient"){
	    	if(patientName==null||patientName==""||patientName=="null" || patientName=="NA" ){
	    		alert("Please Enter Patient Name");
	    		return false;
	    	}
	    	
	    }else{
	    	patientName="NA";
	    	patientId=0;
	    }
	
	
	var consumptionItemSlaveDetails = {
			lstConsumptionItemSlaveDto : []
		};
	var rowsConsumptionTable = $('#consumptionRequestTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rowsConsumptionTable; i++){
		var itemMasterId = $("#itemMasterIdConsumption" + i).val();
		var subInvIdInSlave = SubInvId;
		var itemName = $("#txtItemNameConsumptionId" + i).val();
		var itemBatchCode = $("#itemBatchCodeConsumpId"+i).val();
		var itemBatchExpDate = $("#itemBatchExpDateConsumpId"+i).val();
		if(itemBatchExpDate == "NA"){
			itemBatchExpDate = "1970-01-01";
		}
		var itemUOMUnit = $("#txtUomConsumption"+i).val();
		var requiredQuantity = parseInt($("#issuedQuantityConsumption"+i).val());
		var currentSubInvStock = parseInt($("#currentSubInvStockConsumption"+i).val());
		var consumptionType = $("#consumptionType"+i).val();
		var subRemark = $("#subRemarkConsumption"+i).val();
		if(consumptionType ==  "NA"){
			alert("Kindly Select Appropriate Consumption Type..!!");
			return false;
		}
		if(requiredQuantity > currentSubInvStock){
			alert("Kindly enter required qty less than or equal to available quantity..!!");
			return false;
		}
		
		setConsumptionItemSlave(consumptionItemSlaveDetails,itemMasterId,itemName,itemBatchCode,
				itemBatchExpDate,itemUOMUnit,requiredQuantity,currentSubInvStock,consumptionType,subInvIdInSlave,subRemark);
	
	}
	consumptionItemSlaveDetails = JSON.stringify(consumptionItemSlaveDetails);
	var inputs = [];
	inputs.push('id=' + consumptionId);
	inputs.push('dispensedDate=' + dispensedDate);
	inputs.push('consumedBy=' + consumedBy);
	inputs.push('dispensedTo=' + dispensedTo);
	inputs.push('dispensedToId=' + dispenser);
	inputs.push('dispensedToOther=' + dispensedToOther);
	inputs.push('remark=' + remark);
	inputs.push('subinvName=' + subInvName);
	inputs.push('subinvId=' + SubInvId);
	inputs.push('consumptionItemSlaveDetails=' + consumptionItemSlaveDetails);
	
	inputs.push('userId=' + userId);
	inputs.push('userName=' + userName);
	inputs.push('createdBy=' + userId);
	inputs.push('patientId=' + patientId);
	inputs.push('patientName=' + patientName);
	inputs.push('departMent=' + department);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/saveConsumptionDetails",
		cache : false,
		success : function(r) {
			if (r == 1) {
				updateBatchStockAfterConsumotionRequest();
				alertify.success("Consumption Request Generated Sucessfully");
				refreshConsumption();
				getInProcessStatusGeneratedMRNRequest();
				getAllGeneratedMRNRequestOnApprovedTab();
				getAllGeneratedMRNRequestDataForIndentTab();
				getConsumptionList();
				$("#searchSubInventroyId").click();
				onCloseBtnRefrshPageSubInventory();
				$('#generateConsumptionRequestModal').modal('hide');
			} else if (r == 2) {
				alertify.success("Consumption Request Updated Sucessfully");
				refreshConsumption();
				getInProcessStatusGeneratedMRNRequest();
				getAllGeneratedMRNRequestOnApprovedTab();
				getAllGeneratedMRNRequestDataForIndentTab();
				getConsumptionList();
				$("#searchSubInventroyId").click();
				$('#generateConsumptionRequestModal').modal('hide');
				onCloseBtnRefrshPageSubInventory();
			} 
			else {
				alertify.error("Oops Some Problem Ocured");
			}
			
		}
	});
}

/**
 * 
 * @param consumptionItemSlaveDetails
 * @param itemMasterId
 * @param itemName
 * @param itemBatchCode
 * @param itemBatchExpDate
 * @param itemUOMUnit
 * @param requiredQuantity
 * @param currentSubInvStock
 * @param consumptionType
 */
function setConsumptionItemSlave(consumptionItemSlaveDetails,itemMasterId,itemName,itemBatchCode,
		itemBatchExpDate,itemUOMUnit,requiredQuantity,currentSubInvStock,consumptionType,subInvIdInSlave,subRemark) {
	consumptionItemSlaveDetails.lstConsumptionItemSlaveDto.push({
		itemMasterId : itemMasterId,
		itemName : itemName,
		itemBatchCode : itemBatchCode,
		itemBatchExpDate : itemBatchExpDate,
		itemUomUnit : itemUOMUnit,
		requiredQuantity : requiredQuantity,
		availableSubinvQuantity : currentSubInvStock,
		consumptionType : consumptionType,
		subInvIdInSlave : subInvIdInSlave,
		consumptionSubRemark : subRemark
		
	});
}

/**
 * @author Rohit Sandbhor
 * @comment this function is created for to update the goods issue table after consuming the respective quantity under consumption request
 */
function updateBatchStockAfterConsumotionRequest(){
	var subInventoryId = $("#subInventoryIdInsideModal").val();
	var batchStockDetails = {
			lstBatchStockDto : []
		};
	
	//added by Rohit on 02-11-2020
	//goods issue item slave
	var goodsIssueMrnItemSlaveDetails = {
			goodsIssueMrnItemSlaveDtos: []
		};
	var rowsGoodsIssueTable = $('#consumptionRequestTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rowsGoodsIssueTable; i++){
		var itemMasterIdGoodsIssue = $("#itemMasterIdConsumption" + i).val();
		var subInvIdInSlaveGoodsIssue = subInventoryId;
		var itemNameGoodsIssue = $("#txtItemNameConsumptionId" + i).val();
		var itemBatchCodeGoodsIssue = $("#itemBatchCodeConsumpId"+i).val();
		var itemBatchExpDateGoodsIssue = $("#itemBatchExpDateConsumpId"+i).val();
		if(itemBatchExpDateGoodsIssue == "NA"){
			itemBatchExpDateGoodsIssue = "1970-01-01";
		}
		var requiredQuantityGoodsIssue = $("#issuedQuantityConsumption"+i).val();
		var currentSubInvStockGoodsIssue = $("#currentSubInvStockConsumption"+i).val();
		setGoodsIssueItemSlaveConsumption(goodsIssueMrnItemSlaveDetails,itemMasterIdGoodsIssue,itemNameGoodsIssue,itemBatchCodeGoodsIssue,
				itemBatchExpDateGoodsIssue,requiredQuantityGoodsIssue,currentSubInvStockGoodsIssue,subInvIdInSlaveGoodsIssue);
	
	}
	goodsIssueMrnItemSlaveDetails = JSON.stringify(goodsIssueMrnItemSlaveDetails);
	
	var rowsConsumptionTable = $('#consumptionRequestTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rowsConsumptionTable; i++) {
		var itemMasterId = $("#itemMasterIdConsumption" + i).val();
		var itemName = $("#txtItemNameConsumptionId" + i).val();
		var issueQuantity = $("#issuedQuantityConsumption" + i).val();
		var itemBatchCode = $("#itemBatchCodeConsumpId" + i).val();
		var itemBatchExpDate = $("#itemBatchExpDateConsumpId" + i).val();
		if(itemBatchExpDate == "NA"){
			itemBatchExpDate = "1970-01-01";
		}
		
		setBatchStockValuesConsumption(batchStockDetails,itemMasterId,itemName,
				issueQuantity,itemBatchCode,itemBatchExpDate,subInventoryId);
	}
	batchStockDetails = JSON.stringify(batchStockDetails);
	var inputs = [];
	inputs.push('batchStockDetails=' + batchStockDetails);
	inputs.push('goodsIssueMrnItemSlaveDetails=' + goodsIssueMrnItemSlaveDetails);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/updateBatchStockAfterConsumptionRequest",
		cache : false,
		success : function(r) {
			
			
		}
	});

}
/**
 * 
 * @param batchStockDetails
 * @param itemMasterId
 * @param itemName
 * @param issueQuantity
 * @param itemBatchCode
 * @param itemBatchExpDate
 * @param subInventoryId
 */
function setBatchStockValuesConsumption(batchStockDetails,itemMasterId,itemName,
		issueQuantity,itemBatchCode,itemBatchExpDate,subInventoryId){
	batchStockDetails.lstBatchStockDto.push({
		itemMasterId : itemMasterId,
		itemName : itemName,
		issueQuantity : issueQuantity,
		subInventoryId : subInventoryId,
		itemBatchCode : itemBatchCode,
		itemBatchExpDate : itemBatchExpDate
	});
}

/**
 * @since 07-02-2020
 * @comment created this functon to get cosumption list
 * @author Rohit Sandbhor
 * @param r 
 */
function getConsumptionList(){
	var subInventoryName = $("#generateMRNSearchId").val();
	var subInventoryId = $("#subInventoryId").val();
	var inputs = [];
	inputs.push('mrnSubinventoryName=' + subInventoryName);
	inputs.push('subInventoryId=' + subInventoryId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getConsumptionList',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setConsumptionListDataToTable(r);
		}
	});
}

/********************************************************************************
 * @since 07-02-2020
 * @comment added this js function to set the consumption list data to dynamic table
 * @author Rohit Sandbhor
 * @param r
 *******************************************************************************/
function setConsumptionListDataToTable(r) {
	
	var htm = "";
	var index = 1;
	for(var i = 0; i < r.lstConsumptionDto.length; i++){
		
	for ( var j = 0; j < r.lstConsumptionDto[i].consumptionItemSlaveDto.length; j++) {
		
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTimeStockReturn(r.lstConsumptionDto[i].createdDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].id
				+ '</td>'
				if(r.lstConsumptionDto[i].consumedBy=="Individual"){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].dispensedTo
					+ '</td>'
				}else if(r.lstConsumptionDto[i].consumedBy=="Patient"){
					htm = htm	+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].patientName
				+ '</td>'
				}
		htm = htm	+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumedBy
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchCode
				+ '</td>';
				if(r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchExpDate !="1970-01-01"){
					htm = htm + ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchExpDate
				+ '</td>';
				}else{
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				htm = htm + ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].availableSubinvQuantity
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].dispensedDate
				+ '</td>'
				if(r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType == "Consumed" || r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType == "NA"){
				htm = htm + ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" disabled data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=editGeneratedConsumptionDetails('
				+ r.lstConsumptionDto[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-primary editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=viewGeneratedConsumptionDetails('
				+ r.lstConsumptionDto[i].id
				+ ')><i class="fa fa-eye"></i></button></td>'
				}
				else if(r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType == "In-Use"){
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess"  data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=editGeneratedConsumptionDetails('
					+ r.lstConsumptionDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-primary editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=viewGeneratedConsumptionDetails('
					+ r.lstConsumptionDto[i].id
					+ ')><i class="fa fa-eye"></i></button></td>'
				}
				+'</tr>';
			index++;
		}
		var numberOfRows='';
		var index1=1;
		var count=r.noOfPages;
		var numberOfPages=(parseInt(count)/10);
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +='<li class="disabled previous"><a class="page-link" href="#" tabindex="-1">Previous</a></li>';
			displayPagination=5;
		}
		$("#subinvname").val(r.lstConsumptionDto[i].subinvName);
		for(var j=0;j<displayPagination;j++){
			numberOfRows +='<li onclick="paginationConsumptionMRN('+index1+');"><a>'+index1+'</a></li>';
			index1=index1+1;
		}
		if(numberOfPages > 6){
			numberOfRows +='<li class="next" onclick="nextPaginationConsumptionMRN('+index1+','+Math.round(numberOfPages)+');"><a class="page-link" href="#">Next</a></li>';
		}
		$('#totalNumberOfPagesConsumptionMRN').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#consumptionMRNRecordPagination').html(numberOfRows);
	}
	$("#consumptionTabDataTbodyId").html(htm);
};

/********************************************************************************
 * @since 08-02-2020
 * @comment below js function to edit the generated consumption details
 * @author Rohit Sandbhor
 * @param id
 *******************************************************************************/
function editGeneratedConsumptionDetails(id) {
	document.getElementById("plusMinusButtonDivIdConsumption").style.display = "none";
	var inputs = [];
	var htm = "";
	var index = 1;
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/subInventory/editGeneratedConsumptionDetails",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			document.getElementById("consumedById").disabled = true;
			document.getElementById("dispenserId").disabled = true;
			document.getElementById("dispensedToId").disabled = true;
			document.getElementById("dispensedToOtherId").disabled = true;
			document.getElementById("consumptionRemark").disabled = true;
			document.getElementById("otherId").disabled = true;
			$("#consumptionId").val(r.id);
			$("#dispensedDateId").val(r.dispensedDate);
			$("#consumedById").val(r.consumedBy);
			$("#consumptionIdUpdated").val(r.id);
			$("#dispenserId").val(r.dispensedToId);
			$("#dispensedToId").val(r.dispensedTo);
			$("#dispensedToOtherId").val(r.dispensedToOther);
			$("#consumptionRemark").val(r.remark);
			$("#subInventoryNameId").val(r.subinvName);
			$("#subInventoryIdInsideModal").val(r.subinvId);
			$("#byName").val(r.patientName);
			$("#patientId").val(r.patientId);
			$("#patientName").val(r.patientName);
			$("#userId").val(r.userId);
			
			for ( var i = 0; i <  r.consumptionItemSlaveDto.length; i++) {
				var expDate  = r.consumptionItemSlaveDto[i].itemBatchExpDate;
				if(expDate == null || expDate =='' || expDate == "1970-01-01" || expDate == "NaN-aN-aN"){
					expDate = "NA";
				}
				htm = htm
				+
				"<tr id='multiTrConsumption"+index+"' class='newAdded'>"
				+ "<td class='col-md-1 center'><input type='checkbox' readonly class='chkMrnItem' id='checkboxConsumption"+index+"' value='"+index+"'></td>"
				+ "<td class='col-md-1 center' style='display:none'><input type='text' value="+r.consumptionItemSlaveDto[i].id+" id='itemSlaveConsumpId"+index+"'></td>"
				+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span><input type='hidden' id='itemMasterIdConsumption"+index+"' value="+r.consumptionItemSlaveDto[i].itemMasterId+"></td>"
				+ "<td class='col-md-3 center'><input type='text' value='"+r.consumptionItemSlaveDto[i].itemName+"' id='txtItemNameConsumptionId"+index+"' readonly class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='consumptionRequest'> </td>"
				+ "<td class='col-md-2 center'><input type='text' value="+r.consumptionItemSlaveDto[i].itemBatchCode+" id='itemBatchCodeConsumpId"+index+"' readonly class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-2 center'><input type='text' value="+expDate+" id='itemBatchExpDateConsumpId"+index+"' readonly class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-2 center'><input type='text' value="+r.consumptionItemSlaveDto[i].itemUomUnit+" id='txtUomConsumption"+index+"' readonly class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-2 center'><input type='text' value="+r.consumptionItemSlaveDto[i].requiredQuantity+" id='issuedQuantityConsumption"+index+"' readonly class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-1 center'><input type='text' value="+r.consumptionItemSlaveDto[i].availableSubinvQuantity+" readonly id='currentSubInvStockConsumption"+index+"' class='form-control input-SmallText '> </td>"
				if(r.consumptionItemSlaveDto[i].consumptionType == "Consumed"){
					htm = htm	+ "<td class='col-md-1 center'><select id='consumptionType"+index+"' disabled class='form-control input-SmallText '><option value="+r.consumptionItemSlaveDto[i].consumptionType+" >"+r.consumptionItemSlaveDto[i].consumptionType+"</option><option value='Consumed'>Consumed</option><option value='In-Use'>In-Use</option></select> </td>"	
				}
				else{
					htm = htm	+ "<td class='col-md-1 center'><select id='consumptionType"+index+"'  class='form-control input-SmallText '><option value="+r.consumptionItemSlaveDto[i].consumptionType+" >"+r.consumptionItemSlaveDto[i].consumptionType+"</option><option value='Consumed'>Consumed</option><option value='In-Use'>In-Use</option></select> </td>"
				}
				htm = htm + "<td class='col-md-3 center'><textarea disabled style='width: 240px; height: 39px;' id='subRemarkConsumption" + index + "'>"+r.consumptionItemSlaveDto[i].consumptionSubRemark+"</textarea> </td>"
				+ "</tr>";
				if(r.consumptionItemSlaveDto[i].consumptionType == "In-Use" && r.consumedBy == "Patient"){
					document.getElementById("divbyName").style.display = "block";
				}
				else if(r.consumptionItemSlaveDto[i].consumptionType == "Consumed" && r.consumedBy == "Patient"){
					document.getElementById("divbyName").style.display = "block";
				}
				index++;
				
			}
			$("#consumptionRequestTableBodyId").html(htm);
		}
	
	});
};

/********************************************************************************
 * @since 08-02-2020
 * @comment below js function to edit the generated consumption details
 * @author Rohit Sandbhor
 * @param id
 *******************************************************************************/
function viewGeneratedConsumptionDetails(id) {
	document.getElementById("plusMinusButtonDivIdConsumption").style.display = "none";
	var inputs = [];
	var htm = "";
	var index = 1;
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/subInventory/editGeneratedConsumptionDetails",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			document.getElementById("consumedById").disabled = true;
			document.getElementById("dispenserId").disabled = true;
			document.getElementById("dispensedToId").disabled = true;
			document.getElementById("dispensedToOtherId").disabled = true;
			document.getElementById("consumptionRemark").disabled = true;
			document.getElementById("otherId").disabled = true;
			document.getElementById("byName").disabled = true;
			document.getElementById("patSearchType").disabled = true;
			$("#consumptionId").val(r.id);
			$("#consumptionIdUpdated").val(r.id);
			$("#dispensedDateId").val(r.dispensedDate);
			$("#consumedById").val(r.consumedBy);
			$("#dispenserId").val(r.dispensedToId);
			$("#dispensedToId").val(r.dispensedTo);
			$("#dispensedToOtherId").val(r.dispensedToOther);
			$("#consumptionRemark").val(r.remark);
			$("#subInventoryNameId").val(r.subinvName);
			$("#byName").val(r.patientName);
			$("#subInventoryIdInsideModal").val(r.subinvId);
			$("#userId").val(r.userId);
			
			for ( var i = 0; i <  r.consumptionItemSlaveDto.length; i++) {
				var expDate  = r.consumptionItemSlaveDto[i].itemBatchExpDate;
				if(expDate == null || expDate =='' || expDate == "1970-01-01"){
					expDate = "NA";
				}
				htm = htm
				+
				"<tr id='multiTrConsumption"+index+"' class='newAdded'>"
				+ "<td class='col-md-1 center'><input type='checkbox' readonly class='chkMrnItem' id='checkboxConsumption"+index+"' value='"+index+"'></td>"
				+ "<td class='col-md-1 center' style='display:none'><input type='text' value="+r.consumptionItemSlaveDto[i].id+" id='itemSlaveConsumpId"+index+"'></td>"
				+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span><input type='hidden' id='itemMasterIdConsumption"+index+"' value="+r.consumptionItemSlaveDto[i].itemMasterId+"></td>"
				+ "<td class='col-md-3 center'><input type='text' value='"+r.consumptionItemSlaveDto[i].itemName+"' id='txtItemNameConsumptionId"+index+"' readonly class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='consumptionRequest'> </td>"
				+ "<td class='col-md-2 center'><input type='text' value="+r.consumptionItemSlaveDto[i].itemBatchCode+" id='itemBatchCodeConsumpId"+index+"' readonly class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-2 center'><input type='text' value="+expDate+" id='itemBatchExpDateConsumpId"+index+"' readonly class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-2 center'><input type='text' value="+r.consumptionItemSlaveDto[i].itemUomUnit+" id='txtUomConsumption"+index+"' readonly class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-2 center'><input type='text' value="+r.consumptionItemSlaveDto[i].requiredQuantity+" id='issuedQuantityConsumption"+index+"' readonly class='form-control input-SmallText'> </td>"
				+ "<td class='col-md-1 center'><input type='text' value="+r.consumptionItemSlaveDto[i].availableSubinvQuantity+" readonly id='currentSubInvStockConsumption"+index+"' class='form-control input-SmallText '> </td>"
				+ "<td class='col-md-1 center'><select id='consumptionType"+index+"'  disabled class='form-control input-SmallText '><option value="+r.consumptionItemSlaveDto[i].consumptionType+" >"+r.consumptionItemSlaveDto[i].consumptionType+"</option><option value='Consumed'>Consumed</option><option value='In-Use'>In-Use</option></select> </td>"
				+ "<td class='col-md-3 center'><textarea disabled style='width: 240px; height: 39px;' id='subRemarkConsumption" + index + "'>"+r.consumptionItemSlaveDto[i].consumptionSubRemark+"</textarea> </td>"
				+ "</tr>";
				index++;
				if(r.consumptionItemSlaveDto[i].consumptionType == "In-Use"){
					document.getElementById("divbyName").style.display = "block";
				}
				else if(r.consumptionItemSlaveDto[i].consumptionType == "Consumed"){
					document.getElementById("divbyName").style.display = "hidden";
				}
				
			}
			$("#consumptionRequestTableBodyId").html(htm);
		}
	
	});
};

/**
 * @author : Rohit Sandbhor
 * @date : 27-12-2019
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
	return datee;
}


/************
* @author	: Dayanand Khandekar
* @date		: 14-feb-2020
* @codeFor	: getPatientInfo
 ************/
function getPatientInfo(){
	var consumedby=$("#consumedById").val();
	if(consumedby=="Patient"){
		$("#patientDivId").show();
		$("#divbyName").show();
		//$("#dispensedToId").show();
		document.getElementById("dispensedToId").disabled = true;
	}else{
		$("#patientDivId").hide();
		$("#divbyName").hide();
		document.getElementById("dispensedToId").disabled = false;

		
	}
}

/************
* @author	: Dayanand Khandekar
* @date		: 26-Sept-2019
* @codeFor	: set perticular searching pattern
 ************/
function setPatientSearchTypeFM(){
	
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient Id Here");
		
	}else if(patSearchType == 2){
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		
	}else if(patSearchType == 3){
		
		$("#byName").attr("placeholder", "Type Patient Mobile Here");
	}
}



/************
* @author	: Dayanand Khandekar
* @date		: 14-feb-2020
* @codeFor	: autosuggestion for getting Registration People
 ************/
function setAutoPatientNameFM(inputID,callFrom) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var patDeptType =  $("input[name='rdDept']:checked").val();
	
	if(patDeptType == 1){
		
		callFrom = "prevOpd";
	$("#departMent").val("opd");
	}else if(patDeptType == 2){
		
		callFrom = "prevIpd";
		$("#departMent").val("ipd");
	}else{
		
		callFrom = "reg";
	}
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('patSearchType=' + patSearchType);		
	inputs.push('callFrom=' + callFrom);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/markvisit/autoSuggestionMarkVisit1",
		cache : false,		
		success : function(r) {
			if(r.lstRegviewDto.length==0){
				 alertify.error("You Cannot Insert Other Patient Name...!!!");
					document.getElementById('byName').value = "";
					return false;
			 }
			var template = "";
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName;
				var idValue = r.lstRegviewDto[j].ptId;				
				var patName = r.lstRegviewDto[j].patientName;
				var departMent = r.lstRegviewDto[j].department_id;
				$("#departMent").val(departMent);
				resultData.push({
					ID : idValue,
					Name : patName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			
			setTimeout(function() {

				$("#div" + inputID + " .typeahead").html(template);
				$("#div" + inputID + " .typeahead").show();
				
				$("#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResultFM,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResultFM(item) {

		var res = item.text.split('-');
		var patId = res[0];
		
		var patName = res[1];	

		document.getElementById("patientId").value = patId;
		document.getElementById("patientName").value = patName;
		
		$("#" + inputID).val(patName);		
	}	
}

function closeConsumptioRequestModalOnGenerateMRN(){
	$("#batchWiseSubInvStockModal").modal("hide");
}


/**
 * @author Rohit Sandbhor
 * @Since 24-02-2020
 * @param id
 * @returns {String}
 */
function addMrnReturnRequest(id){
	var tbody = "<tr id='multiTrMrnReturn"+id+"' class='newAdded'>"
	+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkboxMrnReturn"+id+"' value='"+id+"'></td>"
	+ "<td class='col-md-1 center' style='display:none'><input type='text' id='itemSlaveMrnReturnId"+id+"' value='0'></td>"
	+ "<td class='col-md-1 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemMasterIdMrnReturn"+id+"' value='0'></td>"
	+ "<td class='col-md-3 center'><input type='text' id='txtItemNameMrnReturnId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='mrnReturnRequest'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='itemBatchCodeMrnReturnId"+id+"' readonly class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='itemBatchExpDateMrnReturnId"+id+"' readonly class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtUomMrnReturn"+id+"' readonly class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center'><input type='number' min='0' oninput='this.value = Math.abs(this.value)' id='issuedQuantityMrnReturn"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvStockMrnReturn"+id+"' class='form-control input-SmallText '> </td>"
	/*+ "<td class='col-md-1 center'><input type='text' readonly id='mainInventoryStockMrnReturn"+id+"' class='form-control input-SmallText '> </td>"*/
	+"<td class='col-md-3 center'><textarea  style='width:100%;' id='txtItemNaration" + id + "' /> </td>"
	+"<td class='col-md-1 center'><select style='width:80px;' id='stockReturnReason"+id+"' class='form-control input-SmallText' >" +
			"<option value='0'>--Select--</option><option value='Expired'>Expired</option>" +
			"<option value='Near Expiry'>Near Expiry</option><option value='Damaged Item'>Damaged Item</option>" +
			"<option value='Extra Stock'>Extra Stock</option>" +
			"<option value='Wrong Batch'>Wrong Batch</option></select> </td>"
	+ "</tr>";
	
	return tbody;
	
}

function getCurrentSubStockBatchWiseForMrnReturn(itemMasterId,subInvIdMrnReturn,currentTableLen){
	getCurrentSubStockBatchWiseMrnReturn(itemMasterId,subInvIdMrnReturn,currentTableLen);
}

/**
 * 
 * @param itemMasterId
 */
function getCurrentSubStockBatchWiseMrnReturn(itemMasterId,subInvIdConsumption,currentTableLen) {
    var inputs = [];
    inputs.push('itemMasterId=' + itemMasterId);
    inputs.push('subInvIdConsumption=' + subInvIdConsumption);
    var str = inputs.join('&');
    jQuery.ajax({
        async: true,
        type: 'POST',
        data: str + "&reqType=AJAX",
        url: 'ehat/subInventory/getCurrentSubStockBatchWise',
        timeout: 1000 * 60 * 5,
        catche: false,
        success: function(r) {
        	if(r.goodsIssueMrnItemSlaveDtos.length == 0){
        		alert("This Item Does Not Have Any Batch Code So You Can't Return This Item...!!!");
        		$('#batchWiseSubInvStockForMrnReturnModal').modal('hide');
        		return false;
        	}
        	else{
            for (var i = 1; i <= r.goodsIssueMrnItemSlaveDtos.length; i++) {
                if (i == 1) {
                    $("#batchWiseSubInvStockForMrnReturnTbody")
                        .html(
                            "<tr><td>" +
                            "<input type='radio' class='rohit' name='row' id='rowId" +
                            i +
                            "' value=" +
                            i +
                            "  autofocus='autofocus'></td>" +
                            
                            
                            "<td style='display:none'><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' value='"+currentTableLen+"' id='currentTableLen" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            
                            
                            
                            "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='itemNameId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            "<td style='display:none'><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' value=" + itemMasterId + "  id='itemId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='itemUOMUnitMrnRnId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>"
                            +
                            "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='itemBatchCodeMrnRnId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='itemExpDateMrnRnId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                            "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='subInvStockMrnRnId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +
                           /* "<td><input type='text'" +
                            "class='form-control input-SmallText' readonly='true' id='mainInventoryStockMrnRnId" +
                            i +
                            "'" +
                            "tabindex='-1' /></td>" +*/
                            "</tr>");
                } else {
                    $("#batchWiseSubInvStockForMrnReturnTbody")
                        .append(
                        		"<tr><td>" +
                                "<input type='radio' class='rohit' name='row' id='rowId" +
                                i +
                                "' value=" +
                                i +
                                "  autofocus='autofocus'></td>" +
                                
                                "<td style='display:none'><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' value='"+currentTableLen+"' id='currentTableLen" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                
                                
                                
                                "<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='itemNameId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                "<td style='display:none'><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' value=" + itemMasterId + "  id='itemId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                "<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='itemUOMUnitMrnRnId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>"
                                +
                                "<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='itemBatchCodeMrnRnId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                "<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='itemExpDateMrnRnId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                "<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='subInvStockMrnRnId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +
                                /*"<td><input type='text'" +
                                "class='form-control input-SmallText' readonly='true' id='mainInventoryStockMrnRnId" +
                                i +
                                "'" +
                                "tabindex='-1' /></td>" +*/
                                "</tr>");

                }
               
                	$("#itemId" + i).val(itemMasterId);
                    $("#itemNameId" + i).val(r.goodsIssueMrnItemSlaveDtos[i-1].itemName);
                    $("#itemUOMUnitMrnRnId" + i).val(r.goodsIssueMrnItemSlaveDtos[i-1].uomUnitName);
                    $("#itemBatchCodeMrnRnId" + i).val(r.goodsIssueMrnItemSlaveDtos[i-1].itemBatchCode);
                    var expDateStockReturn = getDate(r.goodsIssueMrnItemSlaveDtos[i-1].itemBatchExpDate);
                    if(expDateStockReturn == null || expDateStockReturn =='' || expDateStockReturn == "1970-01-01" || expDateStockReturn == "NaN-aN-aN"){
                    	expDateStockReturn = "NA";
    				}
                    $("#itemExpDateMrnRnId" + i).val(expDateStockReturn);
                    $("#subInvStockMrnRnId" + i).val(r.goodsIssueMrnItemSlaveDtos[i-1].currentSubInventoryStockUpdated);
                    //to store the main inventory stock while generating the stock return request
                    //$("#mainInventoryStockMrnRnId" + i).val(r.goodsIssueMrnItemSlaveDtos[i-1].itemQuantity);
                    $('#batchWiseSubInvStockForMrnReturnModal').modal('show');
                }

            }
        }    
    });
    
}

/**
 * 
 */
function setModalInfoToTableOnMrnReturn()
{
	var table = document.getElementById("batchWiseSubInvStockMrnReturnTableId");
	var mainTable = document.getElementById("mrnReturnRequestTable");
	var mrnReturnSlaveTableLength = table.rows.length;
	var mainTableLength =  mainTable.rows.length;
	var newLength = mrnReturnSlaveTableLength - 1;
	var checkBoxCheckCount = $('input[name=row]:checked').length;
	if(checkBoxCheckCount == 0){
		alert("Atleat Select 1 Radio button to fetch the values..!!");
		return false;
	}
	var newcount = checkBoxCheckCount - 1;
	if(newcount == 0){
		newcount = 1;
	}
		for(var j = 1 ; j <  newcount ; j++){
			//addNewRowInTable('mrnReturnRequestTable','addMrnReturnRequest');//commited by dayanand(15-5-2020)
			var currentTableLen = $("#currentTableLen" +j).val();
		}
	setTableValuesToMrnReturnSlave(checkBoxCheckCount,mrnReturnSlaveTableLength,newLength,mainTableLength,currentTableLen);

	
}
/**
 * 
 * @param checkBoxCheckCount
 * @param mrnReturnSlaveTableLength
 * @param newLength
 * @param mainTableLength
 * @param currentTableLen
 */
function setTableValuesToMrnReturnSlave(checkBoxCheckCount,mrnReturnSlaveTableLength,newLength,mainTableLength,currentTableLen){
	if(checkBoxCheckCount > 1){
		for(var i = 1 ; i<= mrnReturnSlaveTableLength; i++){
			for(var y = 1 ; y<= mrnReturnSlaveTableLength; y++){
				var checkedValue = null; 
				var inputElements = document.getElementsByClassName('rohit');
				for(var l=0; inputElements[l]; ++l){
				      if(inputElements[l].checked){
				           checkedValue = inputElements[l].value;
									if(i <= checkBoxCheckCount){
												$('#itemMasterIdMrnReturn' + currentTableLen).val($('#itemId' + checkedValue).val());
												$('#txtItemNameMrnReturnId' + currentTableLen).val($('#itemNameId' + checkedValue).val());
												$('#itemBatchCodeMrnReturnId' + currentTableLen).val($('#itemBatchCodeMrnRnId' + checkedValue).val());
												$('#itemBatchExpDateMrnReturnId' + currentTableLen).val($('#itemExpDateMrnRnId' + checkedValue).val());
												$('#txtUomMrnReturn' + currentTableLen).val($('#itemUOMUnitMrnRnId' + checkedValue).val());
												$('#currentSubInvStockMrnReturn' + currentTableLen).val($('#subInvStockMrnRnId' + checkedValue).val());
												//$('#mainInventoryStockMrnReturn' + currentTableLen).val($('#mainInventoryStockMrnRnId' + checkedValue).val());
												$('#itemSlaveMrnReturnId' + currentTableLen).val($('#itemId' + checkedValue).val());
												currentTableLen++;
												i++;
									}
				      }
				}
				closeMrnReturnRequestModalOnGenerateMRN();
}
}
}
else{
var set = mainTableLength - 1;
for(var j = 1 ; j<= checkBoxCheckCount; j++){
	var totalCheckboxes = $('input[name=row]:checked').val();
	$('#itemMasterIdMrnReturn' + set).val($('#itemId' + totalCheckboxes).val());
	$('#txtItemNameMrnReturnId' + set).val($('#itemNameId' + totalCheckboxes).val());
	$('#itemBatchCodeMrnReturnId' + set).val($('#itemBatchCodeMrnRnId' + totalCheckboxes).val());
	$('#itemBatchExpDateMrnReturnId' + set).val($('#itemExpDateMrnRnId' + totalCheckboxes).val());
	$('#txtUomMrnReturn' + set).val($('#itemUOMUnitMrnRnId' + totalCheckboxes).val());
	$('#currentSubInvStockMrnReturn' + set).val($('#subInvStockMrnRnId' + totalCheckboxes).val());
	//$('#mainInventoryStockMrnReturn' + set).val($('#mainInventoryStockMrnRnId' + totalCheckboxes).val());
	$('#itemSlaveMrnReturnId' + set).val($('#itemId' + totalCheckboxes).val());
	closeMrnReturnRequestModalOnGenerateMRN();
}
}
	
}



function closeMrnReturnRequestModalOnGenerateMRN(){
	$("#batchWiseSubInvStockForMrnReturnModal").modal("hide");
}


/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 28-02-2020
 * @codeFor : Remove row temp for MRN
 ******************************************************************************/
function removeRowFromTableForSI(tableId, checkboxClass) {
	$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
	checkForSI(tableId);
	checkCompForSI(tableId);
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 28-02-2020
 * @codeFor : For reorder srno after delete
 ******************************************************************************/
function checkForSI(tableId) {
	obj = $('#' + tableId + ' tbody tr').find('span');
	$.each(obj, function(key, value) {
		id = value.id;
		$('#' + id).html(key + 1);
	});
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 28-02-2020
 * @codeFor : For reorder index ids of componant after delete
 ******************************************************************************/
function checkCompForSI(tableId) {
	var trLength = $('#' + tableId).find("tr:first th").length;
	obj = $('#' + tableId + ' tbody tr td').find('input,select,radio,checkbox,span,textarea');
	console.log(obj);
	var inx = 1;
	var idIndex = 1;
	$.each(obj, function(key, value) {
		if (inx == (trLength + 1)) {
			inx = 1;
			idIndex++;
		}
		id = value.id;
		var idText = (value.id).replace(/[0-9]/g, '');
		var replaceById = idText + idIndex;
		$('#' + id).attr('id', replaceById);
		inx++;
	});
}

/**
 * @author Rohit Sandbhor
 * @since 28-02-2020
 * @comment created this js function to save the stock return request
 * @returns {Boolean}
 */
function saveStockReturnDetails(){
	var stockReturnId = $("#mrnReturnId").val();
	var stockReturnDate = $("#mrnReturnDateId").val();
	var stockReturnRemark = $("#mrnReturnRemark").val();
	
	var subInvName = $("#subInventoryNameId").val();
	var SubInvId = $("#subInventoryIdInsideModal").val();
	var userId = $('#userId').val();
	var userName = $("#userNameId").val();
	var unitId = $('#userId').val();
	
	var stockReturnItemSlaveDetails = {
			lstStockReturnItemSlaveDto : []
		};
	
	var rowsStockReturnTable = $('#mrnReturnRequestTable tbody tr.newAdded').length;
	if(rowsStockReturnTable >= 1){
	for ( var i = 1; i <= rowsStockReturnTable; i++){
		var itemSlaveId = $("#itemSlaveId" + i).val();
		var itemMasterId = $("#itemMasterIdMrnReturn" + i).val();
		var subInvIdInSlave = SubInvId;
		var itemName = $("#txtItemNameMrnReturnId" + i).val();
		var itemBatchCode = $("#itemBatchCodeMrnReturnId"+i).val();
		var itemBatchExpDate = $("#itemBatchExpDateMrnReturnId"+i).val();
		if(itemBatchExpDate == "NA"){
			itemBatchExpDate = "1970-01-01";
		}
		var itemUOMUnit = $("#txtUomMrnReturn"+i).val();
		var returnQuantity = $("#issuedQuantityMrnReturn"+i).val();
		var currentSubInvStock = $("#currentSubInvStockMrnReturn"+i).val();
		//var mainInventoryStock = $("#mainInventoryStockMrnReturn"+i).val();
		var stockReturnNaration = $("#txtItemNaration"+i).val();
		var stockReturnReason = $("#stockReturnReason"+i).val();
		
		if(itemName == null || itemName == undefined || itemName ==""){
			alert("Without Selecting Item Name You Can Not Save..!!!");
			return false;
		}
		if(returnQuantity == null || returnQuantity == 0){
			alert("Without Entering Return Quantity You Can Not Save..!!!");
			return false;
		}
		
		setStockReturnItemSlave(stockReturnItemSlaveDetails,itemMasterId,itemName,itemBatchCode,
				itemBatchExpDate,itemUOMUnit,returnQuantity,currentSubInvStock,stockReturnNaration,subInvIdInSlave,stockReturnReason,itemSlaveId);
	
	}
	}
	else{
		alert("You Cannot Save This Record without Filling Proper Values..!!");
		return false;
	}
	stockReturnItemSlaveDetails = JSON.stringify(stockReturnItemSlaveDetails);
	var inputs = [];
	inputs.push('id=' + stockReturnId);
	inputs.push('remark=' + stockReturnRemark);
	inputs.push('stockReturnDate=' +stockReturnDate);
	inputs.push('subinvName=' + subInvName);
	inputs.push('subinvId=' + SubInvId);
	inputs.push('stockReturnItemSlaveDetails=' + stockReturnItemSlaveDetails);
	
	inputs.push('userId=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('userName=' + userName);
	inputs.push('createdBy=' + userId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/saveStockReturnDetails",
		cache : false,
		success : function(r) {
			if (r == 1) {
				refreshStockReturnAfterSaveAndClose();
				alertify.success("Stock Return Generated Sucessfully");
				$('#generateMrnReturnRequestModal').modal('hide');
				getInProcessStatusGeneratedMRNRequest();
				getAllGeneratedMRNRequestOnApprovedTab();
				getAllGeneratedMRNRequestDataForIndentTab();
				getConsumptionList();
				getAllStockRetrunForSubInventory();
				
			} else if (r == 2) {
				alertify.success("Stock Return Updated Sucessfully");
				getInProcessStatusGeneratedMRNRequest();
				getAllGeneratedMRNRequestOnApprovedTab();
				getAllGeneratedMRNRequestDataForIndentTab();
				getConsumptionList();
				getAllStockRetrunForSubInventory();
				$('#generateMrnReturnRequestModal').modal('hide');
			} 
			else {
				alertify.error("Oops Some Problem Ocured");
			}
			
		}
	});
}

/**
 * @since 28-02-2020
 * @author Rohit Sandbhor
 * @comment to set the stock return item slave values
 * @param stockReturnItemSlaveDetails
 * @param itemMasterId
 * @param itemName
 * @param itemBatchCode
 * @param itemBatchExpDate
 * @param itemUOMUnit
 * @param requiredQuantity
 * @param currentSubInvStock
 * @param stockReturnNaration
 * @param subInvIdInSlave
 */
function setStockReturnItemSlave(stockReturnItemSlaveDetails,itemMasterId,itemName,itemBatchCode,
		itemBatchExpDate,itemUOMUnit,returnQuantity,currentSubInvStock,stockReturnNaration,subInvIdInSlave,stockReturnReason,itemSlaveId) {
	stockReturnItemSlaveDetails.lstStockReturnItemSlaveDto.push({
		id: (itemSlaveId != 'undefined' && itemSlaveId != null) ? itemSlaveId : 0,
		itemMasterId : itemMasterId,
		itemName : itemName,
		itemBatchCode : itemBatchCode,
		itemBatchExpDate : itemBatchExpDate,
		itemUomUnit : itemUOMUnit,
		returnQuantity : returnQuantity,
		availableSubinvQuantity : currentSubInvStock,
		//mainInventoryStock : mainInventoryStock,
		subInvIdInSlave : subInvIdInSlave,
		narration : stockReturnNaration,
		stockReturnReason : stockReturnReason
		
	});
}

/**
 * @since 30-10-2020
 * @author Rohit Sandbhor
 * @comment added to set details on goods issue slave as well
 * @param stockReturnItemSlaveDetails
 * @param itemMasterId
 * @param itemName
 * @param itemBatchCode
 * @param itemBatchExpDate
 * @param itemUOMUnit
 * @param returnQuantity
 * @param currentSubInvStock
 * @param stockReturnNaration
 * @param subInvIdInSlave
 * @param stockReturnReason
 * @param itemSlaveId
 */
function setGoodsIssueItemSlave(goodsIssueMrnItemSlaveDetails,itemMasterIdGoodsIssue,itemNameGoodsIssue,itemBatchCodeGoodsIssue,
		itemBatchExpDateGoodsIssue,returnQuantityGoodsIssue,currentSubInvStockGoodsIssue,subInvIdInSlaveGoodsIssue) {
	    goodsIssueMrnItemSlaveDetails.goodsIssueMrnItemSlaveDtos.push({
	    itemMasterId : itemMasterIdGoodsIssue,
		itemName : itemNameGoodsIssue,
		itemBatchCode : itemBatchCodeGoodsIssue,
		itemBatchExpDate : itemBatchExpDateGoodsIssue,
		returnQuantity : returnQuantityGoodsIssue,
		//availableSubinvQuantity : currentSubInvStock,
		subInventoryId : subInvIdInSlaveGoodsIssue
	});
}

/**
 * 
 * @param goodsIssueMrnItemSlaveDetails
 * @param itemMasterIdGoodsIssue
 * @param itemNameGoodsIssue
 * @param itemBatchCodeGoodsIssue
 * @param itemBatchExpDateGoodsIssue
 * @param returnQuantityGoodsIssue
 * @param currentSubInvStockGoodsIssue
 * @param subInvIdInSlaveGoodsIssue
 */
function setGoodsIssueItemSlaveConsumption(goodsIssueMrnItemSlaveDetails,itemMasterIdGoodsIssue,itemNameGoodsIssue,itemBatchCodeGoodsIssue,
		itemBatchExpDateGoodsIssue,returnQuantityGoodsIssue,currentSubInvStockGoodsIssue,subInvIdInSlaveGoodsIssue) {
	    goodsIssueMrnItemSlaveDetails.goodsIssueMrnItemSlaveDtos.push({
	    itemMasterId : itemMasterIdGoodsIssue,
		itemName : itemNameGoodsIssue,
		itemBatchCode : itemBatchCodeGoodsIssue,
		itemBatchExpDate : itemBatchExpDateGoodsIssue,
		returnQuantity : returnQuantityGoodsIssue,
		subInventoryId : subInvIdInSlaveGoodsIssue
	});
}


/**
 * 
 */
function updateBatchStockAfterStockReturnRequest(){
	var stockReturnId = $("#mrnReturnId").val();
	var stockReturnDate = $("#mrnReturnDateId").val();
	var stockReturnRemark = $("#mrnReturnRemark").val();
	
	var subInvName = $("#subInventoryNameId").val();
	var SubInvId = $("#subInventoryIdInsideModal").val();
	var userId = $('#userId').val();
	var userName = $("#userNameId").val();
	var unitId = $('#userId').val();
	
	var stockReturnItemSlaveDetails = {
			lstStockReturnItemSlaveDto : []
		};
	//goods issue item slave
	var goodsIssueMrnItemSlaveDetails = {
			goodsIssueMrnItemSlaveDtos: []
		};
	
	var rowsGoodsIssueTable = $('#mrnReturnRequestTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rowsGoodsIssueTable; i++){
		var itemMasterIdGoodsIssue = $("#itemMasterIdMrnReturn" + i).val();
		var subInvIdInSlaveGoodsIssue = SubInvId;
		var itemNameGoodsIssue = $("#txtItemNameMrnReturnId" + i).val();
		var itemBatchCodeGoodsIssue = $("#itemBatchCodeMrnReturnId"+i).val();
		var itemBatchExpDateGoodsIssue = $("#itemBatchExpDateMrnReturnId"+i).val();
		if(itemBatchExpDateGoodsIssue == "NA"){
			itemBatchExpDateGoodsIssue = "1970-01-01";
		}
		var returnQuantityGoodsIssue = $("#issuedQuantityMrnReturn"+i).val();
		var currentSubInvStockGoodsIssue = $("#currentSubInvStockMrnReturn"+i).val();
		
		
		setGoodsIssueItemSlave(goodsIssueMrnItemSlaveDetails,itemMasterIdGoodsIssue,itemNameGoodsIssue,itemBatchCodeGoodsIssue,
				itemBatchExpDateGoodsIssue,returnQuantityGoodsIssue,currentSubInvStockGoodsIssue,subInvIdInSlaveGoodsIssue);
	
	}
	goodsIssueMrnItemSlaveDetails = JSON.stringify(goodsIssueMrnItemSlaveDetails);
	
	//return false;
	
	var rowsStockReturnTable = $('#mrnReturnRequestTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rowsStockReturnTable; i++){
		var itemSlaveId = $("#itemSlaveId" + i).val();
		var itemMasterId = $("#itemMasterIdMrnReturn" + i).val();
		var subInvIdInSlave = SubInvId;
		var itemName = $("#txtItemNameMrnReturnId" + i).val();
		var itemBatchCode = $("#itemBatchCodeMrnReturnId"+i).val();
		var itemBatchExpDate = $("#itemBatchExpDateMrnReturnId"+i).val();
		if(itemBatchExpDate == "NA"){
			itemBatchExpDate = "1970-01-01";
		}
		var itemUOMUnit = $("#txtUomMrnReturn"+i).val();
		var returnQuantity = $("#issuedQuantityMrnReturn"+i).val();
		var currentSubInvStock = $("#currentSubInvStockMrnReturn"+i).val();
		//var mainInventoryStock = $("#mainInventoryStockMrnReturn"+i).val();
		var stockReturnNaration = $("#txtItemNaration"+i).val();
		var stockReturnReason = $("#stockReturnReason"+i).val();
		
		if(itemName == null || itemName == undefined || itemName ==""){
			alert("Without Selecting Item Name You Can Not Save..!!!");
			return false;
		}
		if(returnQuantity == null || returnQuantity == 0){
			alert("Without Entering Return Quantity You Can Not Save..!!!");
			return false;
		}
		
		setStockReturnItemSlave(stockReturnItemSlaveDetails,itemMasterId,itemName,itemBatchCode,
				itemBatchExpDate,itemUOMUnit,returnQuantity,currentSubInvStock,stockReturnNaration,subInvIdInSlave,stockReturnReason,itemSlaveId);
	
	}
	stockReturnItemSlaveDetails = JSON.stringify(stockReturnItemSlaveDetails);
	var subInventoryId = $("#subInventoryIdInsideModal").val();
	
	var batchStockDetails = {
			lstBatchStockDto : []
		};
	var rowsStockReturnTable = $('#mrnReturnRequestTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rowsStockReturnTable; i++) {
		
		var itemMasterId = $("#itemMasterIdMrnReturn" + i).val();
		var itemName = $("#txtItemNameMrnReturnId" + i).val();
		var returnQuantity = $("#issuedQuantityMrnReturn" + i).val();
		var itemBatchCode = $("#itemBatchCodeMrnReturnId" + i).val();
		var itemBatchExpDate = $("#itemBatchExpDateMrnReturnId" + i).val();
		if(itemBatchExpDate == "NA"){
			itemBatchExpDate = "1970-01-01";
		}
		
		setBatchStockValuesStockReturn(batchStockDetails,itemMasterId,itemName,
				returnQuantity,itemBatchCode,itemBatchExpDate,subInventoryId);
	}
	batchStockDetails = JSON.stringify(batchStockDetails);
	var inputs = [];
	
	
	inputs.push('id=' + stockReturnId);
	inputs.push('remark=' + stockReturnRemark);
	inputs.push('stockReturnDate=' +stockReturnDate);
	inputs.push('subinvName=' + subInvName);
	inputs.push('subinvId=' + SubInvId);
	
	inputs.push('userId=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('createdBy=' + userId);
	
	inputs.push('batchStockDetails=' + batchStockDetails);
	inputs.push('stockReturnItemSlaveDetails=' + stockReturnItemSlaveDetails);
	inputs.push('goodsIssueMrnItemSlaveDetails=' + goodsIssueMrnItemSlaveDetails);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/updateBatchStockAfterStockReturnRequest",
		cache : false,
		success : function(r) {
			
			alertify.success("Stock Return Updated Sucessfully");
			$('#generateMrnReturnRequestModal').modal('hide');	
			getAllStockRetrunForApproval();
			//added by rohit 08-07-2020
			//to get the stock return approval data after save with updated status
			getStockReturnDetailsBySubInventory(SubInvId);
		}
	});

}

/**
 * 
 * @param batchStockDetails
 * @param itemMasterId
 * @param itemName
 * @param issueQuantity
 * @param itemBatchCode
 * @param itemBatchExpDate
 * @param subInventoryId
 */
function setBatchStockValuesStockReturn(batchStockDetails,itemMasterId,itemName,
		returnQuantity,itemBatchCode,itemBatchExpDate,subInventoryId){
	batchStockDetails.lstBatchStockDto.push({
		itemMasterId : itemMasterId,
		itemName : itemName,
		issueQuantity : returnQuantity,
		subInventoryId : subInventoryId,
		itemBatchCode : itemBatchCode,
		itemBatchExpDate : itemBatchExpDate
	});
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 20-02-2020
 * @codeFor : refresh consumption after save
 ******************************************************************************/
function refreshConsumption(){	
		 $("#consumedById").val("");
		 $("#dispensedToId").val("");
		 $("#patSearchType").val("");
		 $("#byName").val("");
		 $("#consumptionRemark").val("");
		 
		 var tableHeaderRowCount = 1;
			var table = document.getElementById('consumptionRequestTable');
			var rowCount = table.rows.length;
			for (var i = tableHeaderRowCount; i < rowCount; i++) {
			    table.deleteRow(tableHeaderRowCount);
			}
}

/**
 * @since 09-03-2020
 * @comment created this functon to get all get received MRN data for received tab from goods issue
 * @author Rohit Sandbhor
 * @param r 
 */
function getReceivedMrnData(){
	var subInventoryId = $("#subInventoryId").val();
	var inputs = [];
	inputs.push('subInventoryId=' + subInventoryId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getReceivedMrnData',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setReceivedMrnDataToTable(r);
		}
	});
}

/**
 * 
 * @param r
 */
function setReceivedMrnDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstGoodsIssueMrnMaster.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstGoodsIssueMrnMaster[i].mrnId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstGoodsIssueMrnMaster[i].mrnDate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstGoodsIssueMrnMaster[i].userName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstGoodsIssueMrnMaster[i].mrnSubinventoryName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstGoodsIssueMrnMaster[i].mrnStatus
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-primary editUserAccess" data-toggle="modal" data-target="#generateMRNRequestModalForReceivedData"  onclick=editReceivedGeneratedMRNData('
				+ r.lstGoodsIssueMrnMaster[i].id
				+ ')><i class="fa fa-eye"></i></button></td>'
				+ '</tr>';
		index++;
		var numberOfRows='';
		var index1=1;
		var count=r.noOfPages;
		var numberOfPages=(count/10);
		var displayPagination=numberOfPages;
		if(numberOfPages > 5){
			numberOfRows +='<li class="disabled previous"><a class="page-link" href="#" tabindex="-1">Previous</a></li>';
			displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			numberOfRows +='<li onclick=paginationReceivedMRN('+index1+',\"'+r.lstGoodsIssueMrnMaster[i].mrnSubinventoryId+'\");><a>'+index1+'</a></li>';
			index1=index1+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationReceivedMRN("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesReceivedMRN').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#receivedMRNRecordPagination').html(numberOfRows);
		
		
	}
	$("#mrnReceivedStatusDataTbodyId").html(htm);
};

/**
 * @since 12-03-2020
 * @comment this js is to create generate mrn request row on plus button click and check if extra rows not get added
 * @author Rohit Sandbhor
 * @param id
 * @returns {String}
 */
function generateMrnRequestTableBodyByAddButtonGenerateMrn(id){
	var mainTable = document.getElementById("generateMRNRequestInfoTable");
	var mainTableLength =  mainTable.rows.length;
	if(mainTableLength == 1){
	$("#txtUom" +id).select2();
	getUOMTempGenerateMrn("txtUom"+id);
	var tbody = "<tr id='multiTr"+id+"' class='newAdded'>"
	+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+id+"' value='"+id+"'></td>"
	+ "<td class='col-md-1 center' style='display:none'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemSlaveId"+id+"' value='0'></td>"
	+ "<td class='col-md-1 center'><input type='hidden' id='itemMasterIdGeneMrnReqTable"+id+"' value='0'>"+id+"</td>"
	+ "<td class='col-md-3 center'><input type='text' id='txtItemNameId"+id+"' autocomplete='off' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='generateMRNRequest'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtMrnQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center' style='display:none'><input  type='text' id='cancelMrnQty"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center'><select id='txtUom"+id+"' class='form-control input-SmallText '><option value='NA' >--Select UOM--</option></select> </td>"
	+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvStock"+id+"' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-1 center'><input type='text' readonly id='currentInventoryStock"+id+"' class='form-control input-SmallText '> </td>"
	+"<td class='col-md-3 center'><textarea  style='width:100%;' id='subRemarkGenerateMRN" + id + "' /> </td>"
	+ "</tr>";
	
	return tbody;
	}
	else{
		var newid = id - 1;
		var currentInvStock = $("#currentSubInvStock"+newid).val();
		if(currentInvStock == null || currentInvStock == ""){
			alert("You Cannot Add Row Without Filling Previous Row Values...!!!");
			return false;
		}
		$("#txtUom" +id).select2();
		getUOMTempGenerateMrn("txtUom"+id);
		var tbody = "<tr id='multiTr"+id+"' class='newAdded'>"
		+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+id+"' value='"+id+"'></td>"
		+ "<td class='col-md-1 center' style='display:none'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemSlaveId"+id+"' value='0'></td>"
		+ "<td class='col-md-1 center'><input type='hidden' id='itemMasterIdGeneMrnReqTable"+id+"' value='0'>"+id+"</td>"
		+ "<td class='col-md-3 center'><input type='text' id='txtItemNameId"+id+"' autocomplete='off' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='generateMRNRequest'> </td>"
		+ "<td class='col-md-2 center'><input type='text' id='txtMrnQty"+id+"' class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-2 center' style='display:none'><input  type='text' id='cancelMrnQty"+id+"' class='form-control input-SmallText' value='0'> </td>"
		+ "<td class='col-md-1 center'><select id='txtUom"+id+"' class='form-control input-SmallText '><option value='NA' >--Select UOM--</option></select> </td>"
		+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvStock"+id+"' class='form-control input-SmallText '> </td>"
		+ "<td class='col-md-1 center'><input type='text' readonly id='currentInventoryStock"+id+"' class='form-control input-SmallText '> </td>"
		+"<td class='col-md-3 center'><textarea  style='width:100%;' id='subRemarkGenerateMRN" + id + "' /> </td>"
		+ "</tr>";
		
		return tbody;
	}
	
}

/**
 * @since 12-03-2020
 * @comment created this js function to clear generated mrn form details after closing the modal
 * @author Rohit Sandbhor
 */
function onCloseBtnRefrshPageSubInventoryGenerateEditMrnRequest() {
	$("#subInventoryNameId").val("");
	$("#remark").val("");
	$("#mrnId").val(0);
	$("#consumptionId").val(0);
	$("#mrnReturnId").val(0);
	$("#mrnrejectId").val(0);
	$("#goodsIssueMrnId").val(0);
	$("#mrnStatusReceivedId").val("OPEN");
	var tableHeaderRowCount = 1;
	var table = document.getElementById('generateMRNRequestInfoTable');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
}

function getAllStockRetrun(){
	var subInventoryId = document.getElementById("subInventoryId").value;
	if(subInventoryId=='' || subInventoryId == null){
		alert("Please Enter Subnventory Name ");
		return 0;
	}
	var inputs = [];
	inputs.push('subinvId=' + subInventoryId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getAllStockRetrun',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setStockReturnDataToTable(r);
		}
	});
}

function setStockReturnDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTimeStockReturn(r[i].created_date_time)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].item_name
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].item_batch_code
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDate(r[i].item_batch_exp_date)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].subinv_name
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].return_quantity
				+ '</td>'
				/*+ ' <td class="col-md-1 center">'
				+ r[i].current_sub_inventory_stock
				+ '</td>'*/
				+ '</tr>';
		index++;
	}
	$("#mrnReturnTabDataTbodyId").html(htm);
};


function getDateTimeStockReturn(date){
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	//datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	//datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	datee = ('0' + dd).slice(-2) + "/" + ('0' + mm).slice(-2) + "/" + year + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	return datee;
}

/**
 * @since 12-03-2020
 * @comment created this js function to clear generated mrn form details after closing the modal
 * @author Rohit Sandbhor
 */
function refreshGenerateMrnModalAfterSave() {
	
	$("#subInventoryNameId").val("");
	$("#remark").val("");
	$("#mrnId").val(0);
	$("#consumptionId").val(0);
	$("#mrnReturnId").val(0);
	$("#mrnrejectId").val(0);
	$("#goodsIssueMrnId").val(0);
	$("#mrnStatusReceivedId").val("OPEN");
	var tableHeaderRowCount = 1;
	var table = document.getElementById('generateMRNRequestInfoTable');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
}

/**
 * @since 16-03-2020
 * @comment created this js function to clear stock return details after save and closing the modal
 * @author Rohit Sandbhor
 */
function refreshStockReturnAfterSaveAndClose() {
	$("#mrnId").val(0);
	$("#consumptionId").val(0);
	$("#mrnReturnId").val(0);
	$("#mrnrejectId").val(0);
	$("#goodsIssueMrnId").val(0);
	$("#mrnReturnRemark").val("");
	$('#generateMrnReturnRequestModal').on('hidden.bs.modal', function () {
	    $('#generateMrnReturnRequestModal form')[0].reset();
	    });
	var tableHeaderRowCount = 1;
	var table = document.getElementById('mrnReturnRequestTable');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
}

/**
 * @since 16-03-2020
 * @comment created this js function to show user name and password modal
 * @author Dayanand Khandekar
 */
function showUserNameAndPasswordPopUp(){
	
	$("#userNameandpasswordPopUp").modal('show');
	$("#userName").val("");
	$("#userPassword").val("");
}

/**
 * @since 16-03-2020
 * @comment created this js function to check  user name and password is valid or not
 * @author Dayanand Khandekar
 */
function checkUserNameandPassword(){
var userName=$("#userName").val();
var userPassword=$("#userPassword").val();	
var inputs = [];
inputs.push('userName=' + userName);
inputs.push('userPassword=' + userPassword);
var str = inputs.join('&');
jQuery.ajax({
	async : true,
	type : "GET",
	url : "ehat/subInventory/checkUserNameandPassword",
	data : str + "&reqType=AJAX",
	error : function() {
		alert('Network Issue..!!');
	},
	success : function(r) {
	
		if(r. lstmrnmaster[0].count > 0){
		var userId=	r. lstmrnmaster[0].approvedById;
			
			saveGenerateMRNRequestAfterApprove(userId,userName);
			$("#userName").val(" ");
			$("#userPassword").val(" ");	
			$("#userNameandpasswordPopUp").modal('hide');
			
		}else{
			alert("User Name And Password Is Invalid.....!!!!");
			return false;
		}
		
	}
});
}


/**
 * /**
 * @since 16-03-2020
 * @comment created this js function to save mrn after approve 
 * @authorDayanand Khandekar
 */
 
function saveGenerateMRNRequestAfterApprove(userIdd,userNamee){
	
	var mrnDate = $("#mrnDate").val();
	var subInventoryName = $("#subInventoryNameId").val();
	var subInventoryId = $("#subInventoryIdInsideModal").val();
	var remark = $("#remark").val();
//	var totalItemQuantity = $("#totalItemQuantityId").val();
	var mrnStatus =  $("#mrnStatusReceivedId").val();
	var userId = $('#userId').val();
	var userName = $("#userNameId").val();
	var id = $("#mrnId").val();
	var generateMRNItemSlaveDetails = {
			lstMrniteminfo : []
		};
	var rowsGenerateMRNItemSlave = $('#generateMRNRequestInfoTable tbody tr.newAdded').length;
	if (rowsGenerateMRNItemSlave == "" || rowsGenerateMRNItemSlave == null || rowsGenerateMRNItemSlave == 0) {
		alert("Please Enter Atleast One Record Under Given Item Info Table..!!");
		return false;
	}
	for ( var i = 1; i <= rowsGenerateMRNItemSlave; i++) {
		
		var itemSlaveId = $("#itemSlaveId" + i).val();
		var itemMasterId = $("#itemMasterIdGeneMrnReqTable" + i).val();
		var itemName = $("#txtItemNameId" + i).val();
		var mrnQuantity = $("#txtMrnQty" + i).val();
		var cancelMrnQty = $("#cancelMrnQty" + i).val();
		var uomUnit = $("#txtUom" + i).val();
		var currentSubInvStock = $("#currentSubInvStock" + i).val();
		 //added main inventory stock while generating the MRN request
		var mainInventoryStock = $("#currentInventoryStock" + i).val();
		var issueQuantity = 0;
		var pendingRequestItemQuantity = mrnQuantity;
		var requestedItemQuantity = mrnQuantity;
		var subInventoryNameSlave = subInventoryName;
		var subInventoryIdSlave = subInventoryId;
		var subRemark = $("#subRemarkGenerateMRN" + i).val();
		if(itemName==null||itemName==""||itemName=="null"){
			alert("Please Enter Item name");
			return false;
		}
		var updatedBy = 0;
		setGenerateMRNItemSlaveList(generateMRNItemSlaveDetails,itemSlaveId,itemMasterId,itemName,
				mrnQuantity,
				uomUnit,
				currentSubInvStock,issueQuantity,pendingRequestItemQuantity,requestedItemQuantity,cancelMrnQty,subInventoryNameSlave,subInventoryIdSlave,subRemark,updatedBy,mainInventoryStock);
	}
	
	
	generateMRNItemSlaveDetails = JSON.stringify(generateMRNItemSlaveDetails);
	
	
	
	
	var inputs = [];
	inputs.push('mrnId=' + id);
	inputs.push('mrnDate=' + mrnDate);
	inputs.push('mrnSubinventoryName=' + subInventoryName);
	inputs.push('mrnSubinventoryId=' + subInventoryId);
	inputs.push('mrnRemark=' + remark);
	//inputs.push('totalItemQuantity=' + totalItemQuantity);
	inputs.push('mrnStatus=' + mrnStatus);
	inputs.push('generateMRNItemSlaveDetails=' + generateMRNItemSlaveDetails);
	
	inputs.push('userId=' + userId);
	inputs.push('userName=' + userName);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	inputs.push('approvedById=' + userIdd);
	inputs.push('approvedByName=' + userNamee);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/saveGenerateMRNRequest",
		cache : false,
		success : function(r) {
			if (r == 1) {
				alertify.success("MRN Generated Sucessfully");
				$('#generateMRNRequestModal').modal('hide');
				$('#mrnTab').tab('show');
				onmrn();
				refreshGenerateMrnModalAfterSave();
				getInProcessStatusGeneratedMRNRequest();
				getAllGeneratedMRNRequestOnApprovedTab();
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
				
			} else if (r == 2) {
				alertify.success("MRN Updated Sucessfully");
				getInProcessStatusGeneratedMRNRequest();
				getAllGeneratedMRNRequestOnApprovedTab();
				getAllGeneratedMRNRequestDataForIndentTab();
				getConsumptionList();
				getAllStockRetrun();
				refreshGenerateMrnModalAfterSave();
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
				$('#generateMRNRequestModal').modal('hide');
				$('#userNameandpasswordPopUp').modal('hide');
				
			}  else {
				alertify.error("Oops Some Problem Ocured");
			}
			
		}
	});
	
	
}
/**
 * /**
 * @since 16-03-2020
 * @comment created this js function to close username and password pop up 
 * @authorDayanand Khandekar
 */
function closeUserNameAndPasswordPopUp(){
	$("#userName").val("");
	$("#userPassword").val("");	
	$("#userNameandpasswordPopUp").modal('hide');
}

/**
 * @author Rohit Sandbhor
 * @Since 24-02-2020
 * @param id
 * @returns {String}
 */
function addMrnReturnRequestByAddButtonStockReturn(id){
	var mainTable = document.getElementById("mrnReturnRequestTable");
	var mainTableLength =  mainTable.rows.length;
	if(mainTableLength == 1){
	var tbody = "<tr id='multiTrMrnReturn"+id+"' class='newAdded'>"
	+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkboxMrnReturn"+id+"' value='"+id+"'></td>"
	+ "<td class='col-md-1 center' style='display:none'><input type='text' id='itemSlaveMrnReturnId"+id+"' value='0'></td>"
	+ "<td class='col-md-1 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemMasterIdMrnReturn"+id+"' value='0'></td>"
	+ "<td class='col-md-3 center'><input type='text' id='txtItemNameMrnReturnId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='mrnReturnRequest'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='itemBatchCodeMrnReturnId"+id+"' readonly class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='itemBatchExpDateMrnReturnId"+id+"' readonly class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtUomMrnReturn"+id+"' readonly class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='number' min='0' oninput='this.value = Math.abs(this.value)' id='issuedQuantityMrnReturn"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvStockMrnReturn"+id+"' class='form-control input-SmallText '> </td>"
	/*+ "<td class='col-md-1 center'><input type='text' readonly id='mainInventoryStockMrnReturn"+id+"' class='form-control input-SmallText '> </td>"*/
	+"<td class='col-md-3 center'><textarea  id='txtItemNaration" + id + "' /> </td>"
	+"<td class='col-md-3 center'><select style='width:80px;' id='stockReturnReason"+id+"' class='form-control input-SmallText' >" +
	"<option value='0'>--Select--</option><option value='Expired'>Expired</option>" +
	"<option value='Near Expiry'>Near Expiry</option><option value='Damaged Item'>Damaged Item</option>" +
	"<option value='Extra Stock'>Extra Stock</option>" +
	"<option value='Wrong Batch'>Wrong Batch</option></select> </td>"
	+ "</tr>";
	
	return tbody;
	}
	else{
		var newid = id - 1;	
		var tbody = "<tr id='multiTrMrnReturn"+id+"' class='newAdded'>"
		+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkboxMrnReturn"+id+"' value='"+id+"'></td>"
		+ "<td class='col-md-1 center' style='display:none'><input type='text' id='itemSlaveMrnReturnId"+id+"' value='0'></td>"
		+ "<td class='col-md-1 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemMasterIdMrnReturn"+id+"' value='0'></td>"
		+ "<td class='col-md-3 center'><input type='text' id='txtItemNameMrnReturnId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='mrnReturnRequest'> </td>"
		+ "<td class='col-md-2 center'><input type='text' id='itemBatchCodeMrnReturnId"+id+"' readonly class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-2 center'><input type='text' id='itemBatchExpDateMrnReturnId"+id+"' readonly class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-2 center'><input type='text' id='txtUomMrnReturn"+id+"' readonly class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-2 center'><input type='number' min='0' oninput='this.value = Math.abs(this.value)' id='issuedQuantityMrnReturn"+id+"' class='form-control input-SmallText'> </td>"
		+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvStockMrnReturn"+id+"' class='form-control input-SmallText '> </td>"
		/*+ "<td class='col-md-1 center'><input type='text' readonly id='mainInventoryStockMrnReturn"+id+"' class='form-control input-SmallText '> </td>"*/
		+"<td class='col-md-3 center'><textarea  id='txtItemNaration" + id + "' /> </td>"
		+"<td class='col-md-3 center'><select id='stockReturnReason"+id+"' class='form-control input-SmallText' >" +
		"<option value='0'>--Select--</option><option value='Expired'>Expired</option>" +
		"<option value='Near Expiry'>Near Expiry</option><option value='Damaged Item'>Damaged Item</option>" +
		"<option value='Extra Stock'>Extra Stock</option>" +
		"<option value='Wrong Batch'>Wrong Batch</option></select> </td>"
		+ "</tr>";
		var batchCode = $("#itemBatchCodeMrnReturnId"+newid).val();
		if(batchCode == null || batchCode == ""){
			alert("You Cannot Add Row Without Filling Previous Row Values...!!!");
			return false;
		}
		return tbody;
	}
}


function getAllStockRetrunForApproval(){
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getAllStockReturnRecordsDetails',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			
			setStockReturnDataToTableForApproval(r);
		}
	});
}

function setStockReturnDataToTableForApproval(r) {
	var htm = "";
	var index = 1;
	var status = "Returned";
	for ( var i = 0; i < r.lstStockReturnDto.length; i++) {
		
		//var createddate= new Date(r.lstStockReturnDto[i].createdDateTime).toLocaleDateString('en-GB');
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTimeStockReturn(r.lstStockReturnDto[i].createdDateTime)
				+ '</td>'
				if(r.lstStockReturnDto[i].status == "Return"){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ status
					+ '</td>'
				}
				else{
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstStockReturnDto[i].status
					+ '</td>'
				}
				htm = htm + ' <td class="col-md-1 center">'
				+ r.lstStockReturnDto[i].subinvName
				+ '</td>'
				
				if(r.lstStockReturnDto[i].status=="Return"){
				htm=htm	+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" disabled   data-toggle="modal"  data-target="#generateMrnReturnRequestModal" data-name="approvedMRN"  onclick=editStockReturn('
					+ r.lstStockReturnDto[i].id+ ',\'edit\')><i class="fa fa-edit"></i></button></td>'
				}else{
			htm=htm	+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess"   data-toggle="modal"  data-target="#generateMrnReturnRequestModal" data-name="approvedMRN"  onclick=editStockReturn('
				+ r.lstStockReturnDto[i].id+ ',\'edit\')><i class="fa fa-edit"></i></button></td>'
				}
				
			htm=htm	+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-primary editUserAccess"   data-toggle="modal"  data-target="#generateMrnReturnRequestModal" data-name="approvedMRN"   onclick=editStockReturn('
				+ r.lstStockReturnDto[i].id+ ',\'view\')><i class="fa fa-eye"></i></button></td>'
				
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteStockReturn('
				+ r.lstStockReturnDto[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				
				+ '</tr>';
		index++;
	}
	$("#stockReturnApprovalBody").html(htm);
};


function editStockReturn(id,call) {
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('stockId=' + id);
	inputs.push('unitId=' + unitId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subInventory/editStockReturn",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			 $("#mrnReturnRemark").val(r.remark);
			 $("#mrnReturnId").val(r.id);
			 $("#mrnReturnDateId").val(r.stockReturnDate);
			 $("#subInventoryNameId").val(r.subinvName);
			 $("#subInventoryIdInsideModal").val(r.subinvId);
			 $('#userId').val(r.userId);
			 $("#userNameId").val(r.userName);
			var htm = "";
			
			for ( var i = 1; i <= r.stockReturnItemSlaveDto.length; i++) {
				var ifNoExpDate = "NA";
				htm = htm
				+
				"<tr id='multiTr"+i+"' class='newAdded'> "
						+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+i+"' value='"+i+"'></td>"
						+ "<td class='col-md-1 center'><span id='snum"+i+"'>"+i+"</span><input type='hidden' value="+r.stockReturnItemSlaveDto[i-1].itemMasterId+" id='itemMasterIdMrnReturn"+i+"'></td>"
						+ "<td class='col-md-1 center' style='display:none'><span id='snum"+i+"'>"+i+"</span><input type='hidden' value="+r.stockReturnItemSlaveDto[i-1].id+" id='itemSlaveId"+i+"'></td>"
						+ "<td class='col-md-3 center'><input type='text' readonly  id='txtItemNameMrnReturnId"+i+"' class='form-control input-SmallText'  value='"+r.stockReturnItemSlaveDto[i-1].itemName+"' data-name='generateMRNRequest'> </td>"
						+ "<td class='col-md-1 center'><input type='text' readonly  id='itemBatchCodeMrnReturnId"+i+"' value="+r.stockReturnItemSlaveDto[i-1].itemBatchCode+" class='form-control input-SmallText'> </td>"
						if(r.stockReturnItemSlaveDto[i-1].itemBatchExpDate == "1970-01-01"){
							htm=htm	+ "<td class='col-md-1 center'><input type='text' readonly  id='itemBatchExpDateMrnReturnId"+i+"' value="+ifNoExpDate+" class='form-control input-SmallText'> </td>"
						}
						else
							{
							htm=htm	+ "<td class='col-md-1 center'><input type='text' readonly  id='itemBatchExpDateMrnReturnId"+i+"' value="+r.stockReturnItemSlaveDto[i-1].itemBatchExpDate+" class='form-control input-SmallText'> </td>"	
							}
				        htm=htm	+ "<td class='col-md-1 center'><input type='text' readonly  id='txtUomMrnReturn"+i+"' value="+r.stockReturnItemSlaveDto[i-1].itemUomUnit+" class='form-control input-SmallText'> </td>"
						//+ "<td class='col-md-1 center'><select id='txtUomMrnReturn"+i+"' disabled class='form-control input-SmallText'></select> </td>"
						if(call=="edit"){
							htm=htm	+ "<td class='col-md-1 center'><input type='number' min='0' oninput='this.value = Math.abs(this.value)' id='issuedQuantityMrnReturn"+i+"'  value="+r.stockReturnItemSlaveDto[i-1].returnQuantity+" class='form-control input-SmallText '> </td>"
							$("#saveStockReturn").show();
						}else{
							htm=htm	+ "<td class='col-md-1 center'><input type='number' min='0' oninput='this.value = Math.abs(this.value)' id='issuedQuantityMrnReturn"+i+"'  readonly  value="+r.stockReturnItemSlaveDto[i-1].returnQuantity+" class='form-control input-SmallText '> </td>"
							$("#saveStockReturn").hide();
						}
					htm=htm	+ "<td class='col-md-1 center'><input type='text' id='currentSubInvStockMrnReturn"+i+"' readonly value="+r.stockReturnItemSlaveDto[i-1].availableSubinvQuantity+" class='form-control input-SmallText '> </td>"
						/*+ "<td class='col-md-1 center'><input type='text' id='mainInventoryStockMrnReturn"+i+"' readonly value="+r.stockReturnItemSlaveDto[i-1].mainInventoryStock+" class='form-control input-SmallText '> </td>"*/
						+ "<td class='col-md-3 center'><textarea  disabled style='width: 201px; height: 34px;' id='txtItemNaration" + i + "'>"+r.stockReturnItemSlaveDto[i-1].narration+"</textarea></td>"
						+"<td class='col-md-1 center'><select disabled style='width:80px;' id='stockReturnReason" + i + "' class='form-control input-SmallText' >" +
						"<option value='"+r.stockReturnItemSlaveDto[i-1].stockReturnReason+"'>"+r.stockReturnItemSlaveDto[i-1].stockReturnReason+"</option><option value='Expired'>Expired</option>" +
						"<option value='Near Expiry'>Near Expiry</option><option value='Damaged Item'>Damaged Item</option>" +
						"<option value='Extra Stock'>Extra Stock</option>" +
						"<option value='Wrong Batch'>Wrong Batch</option></select> </td>"
						+ "</tr>";
				$("#mrnReturnRequestTableBodyId").html(htm);
			}
			
		}
	
	});
}

function deleteStockReturn(id){
	var r = confirm("Are You Sure You Want To Delete Stock Return Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subInventory/deleteStockReturn",
			data : {
				"stockId" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('Network Issue..!!');
			},
			success : function(response) {
				alertify.error(response);
				getAllStockRetrunForApproval();
			}
		});
	}
}

function subInventoryAutoSuggestion(inputID){
	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		getAllStockRetrunForApproval();
		return false;
	}
	var inputs = [];	
	inputs.push('subInventoryName=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/autoFillSearchOnSubInventory",
		cache : false,		
		success : function(r) {
			//alert(JSON.stringify(r));
			if (r.lstSubInventoryMaster.length == 0) {
				alertify.error("You Cannot Gererate Stock Return Without Sub-Inventory Name");
				//document.getElementById('search_sub_name').value = "";
			}
			var template = "";
			for ( var j = 0; j < r.lstSubInventoryMaster.length; j++) {
				var arrValue = r.lstSubInventoryMaster[j].id
						+ "-"
						+ r.lstSubInventoryMaster[j].subInventoryName;
				var idValue = r.lstSubInventoryMaster[j].id;
				var documentName = r.lstSubInventoryMaster[j].subInventoryName;
				resultData.push({
					ID : idValue,
					Name : documentName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}

			setTimeout(
					function() {
						$("div#stockReturnDiv .typeahead").html(
								template);
						$("div#stockReturnDiv .typeahead").show();

						$("input#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("input#" + inputID).data('typeahead').source = resultData;
					}, 500);
		}
	});
function displayResult(item) {

var res = item.text.split('-');
var subId = res[0];
var documentName = res[1];
$("#subInventoryId").val(subId);
getStockReturnDetailsBySubInventory(subId);
$("input#" + inputID).val(documentName);
}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 13-May-2020
 * @codeFor : get getStockReturnDetailsBySubInventory Detail
 ******************************************************************************/
function getStockReturnDetailsBySubInventory(subInvId){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('subInvId=' + subInvId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subInventory/getStockReturnDetailsBySubInventory",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setStockReturnDataToTableForApproval(r);
		}

	});

	
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 13-May-2020
 * @codeFor :getStockReturnDetailsBySubInventoryId
 ******************************************************************************/
function getStockReturnDetailsBySubInventoryId() {
	var mID = $("#search_sub_name").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(mID)) {
		alert("Please Enter Number Only!");
		$("#search_sub_name").focus();
		return false;
	}
	
	getStockReturnDetailsBySubInventory(mID);

}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 13-May-2020
 * @codeFor :getAllStockRetrunForSubInventory 
 ******************************************************************************/
function getAllStockRetrunForSubInventory(){
	var subInventoryName = $("#generateMRNSearchId").val();
	var subInventoryId = $("#subInventoryId").val();
	var inputs = [];
	var unitId = $("#unitId").val();
	inputs.push('mrnSubinventoryName=' + subInventoryName);
	inputs.push('subInventoryId=' + subInventoryId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getAllStockReturnRecordsDetails',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setStockReturnDataToTableForSubInventory(r);
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 13-May-2020
 * @codeFor :setStockReturnDataToTableForSubInventory 
 ******************************************************************************/

function setStockReturnDataToTableForSubInventory(r) {
	
	var htm = "";
	var index = 1;
	var status = "Returned";
	for ( var i = 0; i < r.lstStockReturnDto.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTimeStockReturn(r.lstStockReturnDto[i].createdDateTime)
				+ '</td>'
				if(r.lstStockReturnDto[i].status == "Return"){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ status
					+ '</td>'
				}
				else{
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstStockReturnDto[i].status
					+ '</td>'
				}
				
				htm = htm + ' <td class="col-md-1 center">'
				+ r.lstStockReturnDto[i].subinvName
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-primary editUserAccess"   data-toggle="modal"  data-target="#generateMrnReturnRequestModal" data-name="approvedMRN"   onclick=editStockReturn('
				+ r.lstStockReturnDto[i].id+ ',\'view\')><i class="fa fa-eye"></i></button></td>'
				
				+ '</tr>';
		index++;
		
		var numberOfRows='';
		var index1=1;
		var count=r.noOfPages;
		var numberOfPages=(count/10);
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +='<li class="disabled previous"><a class="page-link" href="#" tabindex="-1">Previous</a></li>';
			displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			numberOfRows +='<li onclick=paginationStockReturnMRN('+index1+',\"'+r.lstStockReturnDto[i].subinvName+'\");><a>'+index1+'</a></li>';
			index1=index1+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationStockReturnMRN("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesStockReturnMRN').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#stockReturnMRNRecordPagination').html(numberOfRows);
		
		
		
	}
	$("#mrnReturnTabDataTbodyId").html(htm);
};

/**
 * @since 11-11-2020
 * @comment created this js function to clear issued mrn form details after closing the modal
 * @author Rohit Sandbhor
 */
function onCloseBtnRefrshPageSubInventoryIssuedMrnRequest() {
	$("#subInventoryNameId").val("");
	$("#remark").val("");
	$("#mrnId").val(0);
	$("#consumptionId").val(0);
	$("#mrnReturnId").val(0);
	$("#mrnrejectId").val(0);
	$("#goodsIssueMrnId").val(0);
	$("#mrnStatusReceivedId").val("OPEN");
	var tableHeaderRowCount = 1;
	var table = document.getElementById('generateMRNRequestInfoTableIssueTab');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
}

function getCurrentSubInventoryStockWithoutBatch(itemMasterId,subInventoryId){
	var res= "";
	var inputs = [];
	inputs.push('itemMasterId=' + itemMasterId);
	inputs.push('subInventoryId=' + subInventoryId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryGoodsIssueNew/getCurrentSubInventoryStockWithoutBatch",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r){    
			res = r;
        }
	});
	return res;
}

/**
 * @since 24-11-2020
 * @author Rohit Sandbhor
 * @comment to close the modal on item purchase details modal on close button click
 */
function closeItemPurchaseDetailsModalOnGenerateMRNClickClose(){
	var serialNo = document.getElementById("hiddenSerialNoId").value;
	$("#itemMasterIdGeneMrnReqTable"+serialNo).val(0);
	$("#txtItemNameId"+serialNo).val("");
	$("#currentSubInvStock"+serialNo).val("");
	$("#txtUom"+serialNo).val("");
	
	var tableHeaderRowCount = 1;
	var table = document.getElementById('itemMasterSlaveRecordListOnMRNGenerate');
	var rowCount = table.rows.length;
	for ( var i = tableHeaderRowCount; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount);
	}
	
	
	$("#generateMRNModalId").modal("hide");
}

/**
 * @since 11-02-2021
 * @comment added this fundtion get current inventory stock while generating the MRN
 * @author Rohit Sandbhor
 * @param itemMasterId
 * @param itemBatchCode
 * @param itemBatchExpDate
 * @returns {String}
 */
function getCurrentInventoryStock(itemMasterId){
	var res= "";
	var inputs = [];
	inputs.push('itemMasterId=' + itemMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/subInventory/getCurrentInventoryStock",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r){    
			res = r;
        }
	});
	return res;
}


function searchMRN(){
	var mrnMasterId = '';
	var subInventoryName  = $("#generateMRNSearchId").val();
	mrnMasterId = $("#searchMRNId").val();
	if(subInventoryName == null || subInventoryName == "" || subInventoryName == undefined ){
		alert("Please Enter Subinventory name");
		return false;
	}
	var inputs = [];
	inputs.push('mrnMasterId=' +mrnMasterId );
	inputs.push('mrnSubinventoryName=' +subInventoryName );
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/subInventory/searchMRN",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r){  
			$("#searchMRNId").val("");
			setInProcessStatusGeneratedMRNDataToTable(r);
			
        }
	});
}

function searchReceivedMRN(){
	var mrnMasterId = '';
	mrnMasterId = $("#searchReceivedMRNId").val();
	var subInventoryName  = $("#generateMRNSearchId").val();
	if(subInventoryName == null || subInventoryName == "" || subInventoryName == undefined ){
		alert("Please Enter Subinventory name");
		return false;
	}
	
	if(mrnMasterId == null || mrnMasterId == "" || mrnMasterId == undefined ){
		alert("Please Enter Mrn Id");
		return false;
	}
	
	var inputs = [];
	inputs.push('mrnMasterId=' +mrnMasterId );
	inputs.push('mrnSubinventoryName=' +subInventoryName );
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/subInventory/searchReceivedMRN",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r){  
			$("#searchReceivedMRNId").val("");
			setGeneratedMRNDataToTable(r);
        }
	});
}

function searchConsumptionByDate(){
	var subInventoryName  = $("#generateMRNSearchId").val();
	if(subInventoryName == null || subInventoryName == "" || subInventoryName == undefined ){
		alert("Please Enter Subinventory name");
		return false;
	}
	var searchFromDate =  $("#searchFromDate").val();
	var searchToDate = $("#searchToDate").val();
	if(searchFromDate == "" || searchFromDate == null || searchFromDate == undefined ){
		alert("Please select from date.");		
		return false;
	}
	
	if((searchToDate == "" || searchToDate == null || searchToDate == undefined) && (searchFromDate !="" && searchFromDate!=null && searchFromDate !=undefined) ){
		alert("Please select To date.");		
		return false;
	}
	
	var inputs = [];
	inputs.push('mrnSubinventoryName=' + subInventoryName);
	inputs.push('searchFromDate=' + searchFromDate);
	inputs.push('searchToDate=' + searchToDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getConsumptionListByDate',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setConsumptionListDataToTableBySearch(r);
		}
	});
}

function getAutoItemNameOnConsumption(inputID) {
	var subInventoryName  = $("#generateMRNSearchId").val().trim();
	if(subInventoryName == null || subInventoryName == "" || subInventoryName == undefined ){
		alert("Please Enter Subinventory name");
		return false;
	}
	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];	
	inputs.push('subInventoryName=' + subInventoryName);
	inputs.push('itemId=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/getAutoItemNameOnConsumption",
		cache : false,		
		success : function(r) {
			if(r.lstConsumptionDto.length <= 0){
				alertify.error("You Cannot Search Item Name Without Sub-Inventory Name");
				document.getElementById('searchItemName').value = "";
			}else{
				var template = "";
				for(var i = 0; i < r.lstConsumptionDto.length; i++){
					for ( var j = 0; j < r.lstConsumptionDto[i].consumptionItemSlaveDto.length; j++) {
						var id = r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemMasterId;
						var itemName = r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemName;
						resultData.push({
							ID : id,
							Name : itemName
						});
						template = template + '<li data-value="' + id
								+ '" class=""><a href="#">' + itemName
								+ '</a></li>';
					}
				}
				
				setTimeout(function() {
					$("div#itemNameMRNDiv .typeahead").html(template);
					$("div#itemNameMRNDiv .typeahead").show();
					
					$("input#" + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayItemConsumptionSearchResult,
						scrollBar : true
					});
					$("input#" + inputID).data('typeahead').source = resultData;
				}, 500);
			}
		}
	});
	function displayItemConsumptionSearchResult(item) {
		var itemId = item.value;
		var itemName = item.text;
		if( itemId !=null && itemId !="" && itemName!="" && itemName !=null){
			searchItemConsumptionResult(itemId,itemName);
		}
	}
}

function setConsumptionListDataToTableBySearch(r) {
	var htm = "";
	var index = 1;
	for(var i = 0; i < r.lstConsumptionDto.length; i++){
		
	for ( var j = 0; j < r.lstConsumptionDto[i].consumptionItemSlaveDto.length; j++) {
		
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTimeStockReturn(r.lstConsumptionDto[i].createdDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].id
				+ '</td>'
				if(r.lstConsumptionDto[i].consumedBy=="Individual"){
					htm = htm	+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].dispensedTo
					+ '</td>'
				}else if(r.lstConsumptionDto[i].consumedBy=="Patient"){
					htm = htm	+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].patientName
				+ '</td>'
				}
		htm = htm	+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumedBy
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchCode
				+ '</td>';
				if(r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchExpDate !="1970-01-01"){
					htm = htm + ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchExpDate
					+ '</td>';
				}else{
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				 			
				htm = htm + ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].availableSubinvQuantity
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].dispensedDate
				+ '</td>'
				if(r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType == "Consumed" || r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType == "NA"){
				htm = htm + ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" disabled data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=editGeneratedConsumptionDetails('
				+ r.lstConsumptionDto[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-primary editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=viewGeneratedConsumptionDetails('
				+ r.lstConsumptionDto[i].id
				+ ')><i class="fa fa-eye"></i></button></td>'
				}
				else if(r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType == "In-Use"){
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess"  data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=editGeneratedConsumptionDetails('
					+ r.lstConsumptionDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-primary editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=viewGeneratedConsumptionDetails('
					+ r.lstConsumptionDto[i].id
					+ ')><i class="fa fa-eye"></i></button></td>'
				}
				+'</tr>';
			index++;
		}
		$("#subinvname").val(r.lstConsumptionDto[i].subinvName);
	}
	document.getElementById('consumptionMRNRecordPagination').style = "display:none";
	$("#consumptionTabDataTbodyId").html(htm);
}

 function searchItemConsumptionResult(itemId,itemName) {
	var subInventoryName  = $("#generateMRNSearchId").val().trim();
	if(subInventoryName == null || subInventoryName == "" || subInventoryName == undefined ){
		alert("Please Enter Subinventory name");
		return false;
	}
	if(itemName == "" || itemName == null || itemName == "null" || itemName == undefined){
		alertify.error("Please enter search value");
		return false;
	}
	var inputs = [];	
	inputs.push('subInventoryName=' + subInventoryName);
	inputs.push('itemName=' + itemName);
	inputs.push('itemId=' + itemId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/searchItemConsumptionResult",
		cache : false,		
		success : function(r) {
			if(r.lstConsumptionDto.length <= 0){
				alertify.error("You Cannot Search Item Name Without Sub-Inventory Name");
				document.getElementById('searchItemName').value = "";
			}else{
				setConsumptionListDataToTableBySearch(r);
			}
		}
	});
	
}


