/**
 * @author Rohit Sandbhor
 * @Since 31-12-2019
 * @param id
 * @returns {String}
 */
function generateGoodsIssueTableBody(id){
	$("#txtUom" +id).select2();
	getUOMTemp("txtUom"+id);
	var tbody = "<tr id='multiTr"+id+"' class='newAdded'>"
	+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+id+"' value='"+id+"'></td>"
	+ "<td class='col-md-1 center' style='display:none'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemSlaveId"+id+"' value='0'></td>"
	+ "<td class='col-md-1 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemMasterIdGenerateGoodsIssue"+id+"' value='0'></td>"
	+ "<td class='col-md-3 center'><input type='text' id='txtItemNameId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='generateMRNRequest'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='pendingReqItemQuantity"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='requestedItemQuantity"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center'><select id='txtUom"+id+"'  class='form-control input-SmallText '><option value='NA' >--Select UOM--</option></select> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='issuedQuantity"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvStock"+id+"' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='currentInvStock"+id+"' class='form-control input-SmallText '> </td>"
	+ "<td class='col-md-3 center'><textarea  style='width:100%;' id='subRemarkGoodsIssue" + id + "' /> </td>"
	+ "</tr>";
	
	return tbody;
	
}

/********************************************************************************
 * @author Rohit Sandbhor
 * @since 02-01-2020
 * @comment Below js code to to generated MRN ID on goods issue module by checking status as in process
*******************************************************************************/
function getGeneratedMRNID() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryGoodsIssue/getGeneratedMRNID",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var response = r;
			$.each(response, function() {
				$('#generatedMRNId').append(
						'<option value="' + this.mrnId + '">' + this.mrnId
								+ '</option>');
			});
		}
	});
}

/********************************************************************************
 * @since 08-11-2019
 * @comment below js function to get the goods details by using MRN ID
 * @author Rohit Sandbhor
 * @param id
 *******************************************************************************/
/*function getGoodsIssueDetailsByMRNId(id) {
	var inputs = [];
	var htm = "";
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/inventoryGoodsIssue/editGeneratedMRNDataGoodsIssue",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$("#mrnId").val(r.mrnId);
			$("#mrnDate").val(r.mrnDate);
			$("#subInventoryNameId").val(r.mrnSubinventoryName);
			$("#subInventoryIdInsideModal").val(r.mrnSubinventoryId);
			$("#remark").val(r.mrnRemak);
			$("#mrnStatusId").val(r.mrnStatus);
			for ( var j = 1; j <= r.batchStockDtos.length; j++) {
			for ( var i = 1; i <= r.lstMrniteminfo.length; i++) {
			if(r.batchStockDtos[j-1].itemMasterId === r.lstMrniteminfo[i-1].itemMasterId){
				var currentInvStock = getCurrentInventoryStock(r.lstMrniteminfo[i-1].itemMasterId,r.batchStockDtos[j-1].itemBatchCode,r.batchStockDtos[j-1].itemBatchExpDate);
				var itemName = r.lstMrniteminfo[i-1].itemName;
				var expDate = getDate(r.batchStockDtos[j-1].itemBatchExpDate);
				if(expDate == "1970-01-01"){
					expDate ="NA";
				}
				htm = htm
				+
				"<tr id='multiTr"+j+"' class='newAdded'> "
						+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+j+"' value='"+j+"'></td>"
						+ "<td class='col-md-1 center'><span id='snum"+j+"'>"+j+"</span><input type='hidden' value="+r.lstMrniteminfo[i-1].itemMasterId+" id='itemMasterIdEditMrnGeneData"+j+"'></td>"
						+ "<td class='col-md-1 center' style='display:none'><span id='snum"+j+"'>"+j+"</span><input type='hidden' value="+r.lstMrniteminfo[i-1].itemInfoId+" id='itemSlaveId"+j+"' style='width:auto;'></td>"
						+ "<td class='col-md-3 center'><input type='text'  id='txtItemNameId"+j+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' value='"+r.lstMrniteminfo[i-1].itemName+"' data-name='generateMRNRequest' readonly> </td>"
						+ "<td class='col-md-1 center'><input type='text' readonly  style='width: 50px;' id='pendingReqItemQuantity"+j+"' class='form-control input-SmallText' value="+r.lstMrniteminfo[i-1].pendingRequestItemQuantity+" data-name='generateMRNRequest' style='width:100%;'> </td>"
						+ "<td class='col-md-1 center'><input type='text' readonly  style='width: 50px;' id='requestedItemQuantity"+j+"' class='form-control input-SmallText' value="+r.lstMrniteminfo[i-1].requestedItemQuantity+" data-name='generateMRNRequest' style='width:100%;'> </td>"
						+ "<td class='col-md-1 center'><select id='txtUom"+j+"'  class='form-control input-SmallText'></select> </td>"
						+ "<td class='col-md-2 center' style='display:none'><input type='text' id='txtMrnQty"+j+"' value="+r.lstMrniteminfo[i-1].mrnQuantity+" class='form-control input-SmallText'> </td>"
						+ "<td class='col-md-1 center'><input type='text' id='issuedQuantity"+j+"' value='0'  class='form-control input-SmallText' style='width:80%;'> </td>"
						+ "<td class='col-md-1 center'><input type='text' id='currentSubInvStock"+j+"' readonly value="+r.batchStockDtos[j-1].currentSubInventoryStock+" class='form-control input-SmallText ' style='width:80%;'> </td>"
						+ "<td class='col-md-1 center'><input type='text' id='currentInvStock"+j+"' readonly value="+currentInvStock+" class='form-control input-SmallText ' style='width:100%;'> </td>"
						+ "<td class='col-md-1 center'><input type='text'  style='width: 50px;'  id='itemBatchCodeId"+j+"' readonly class='form-control input-SmallText' value="+r.batchStockDtos[j-1].itemBatchCode+" style='width:auto;'> </td>"
						+ "<td class='col-md-1 center'><input type='text'  style='width: 80px;'  id='itemBatchExpDate"+j+"' readonly class='form-control input-SmallText' value="+expDate+" style='width:auto;'> </td>"
						+ "<td class='col-md-3 center'><textarea  style='width: 240px; height: 39px;' id='subRemarkMrnGoodsIssue" + j + "'>"+r.lstMrniteminfo[i-1].mrnSubRemark+"</textarea> </td>"
						+ "<td class='col-md-3 center'><textarea  style='width: 240px; height: 39px;' id='subRemarkGoodsIssue" + j + "'></textarea> </td>"
						+"<td class='col-md-1 center'><input onclick=updatePendingRequestAndValidateInvStock("+j+","+r.lstMrniteminfo[i-1].itemMasterId+") type='button' value='accept' id='accept"+j+"' class='btn btn-xs btn-success' /></td>"
						+ "</tr>";
				}
			}
				$("#generateGoodsIssueTableBodyId").html(htm);
		}
			//calling this function to enable or disable the accept button goods issue
			//on the basis of pending requested item quantity
			setEnableDisableAcceptButtonOnGoodsIssue();
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
		        	    for ( var i = 1; i <= r.batchStockDtos.length; i++) {
		        	    	  $("#txtUom"+i).html(htm);
		        	    	  $("#txtUom"+i).select2();
				        	  $('#txtUom' +i).select2('val',r.lstMrniteminfo[0].itemUom);
		        	    }
		        }
		    });
		
		}
		
	
	});
}
function getCurrentInventoryStock(itemMasterId,itemBatchCode,itemBatchExpDate){
	var expDate = getDate(itemBatchExpDate);
	var res= "";
	var inputs = [];
	inputs.push('itemMasterId=' + itemMasterId);
	inputs.push('itemBatchCode=' + itemBatchCode);
	inputs.push('expDate=' + expDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryGoodsIssue/getCurrentInventoryStock",
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
function updatePendingRequestAndValidateInvStock(count,itemMasterId) {
	var tableLength = $('#generateGoodsIssueInfoTable tbody tr.newAdded').length;
	var currentInvStock = $("#currentInvStock" + count).val();
	var itemName = $("#txtItemNameId" +count).val();
	var pendingReqItemQuantity = $("#pendingReqItemQuantity" + count).val();
	if (pendingReqItemQuantity == 0) {
		return false;
	}
	if (parseInt(currentInvStock) == 0 || parseInt(currentInvStock) < 0) {
		alert("Stock not available");
		document.getElementById("checkbox" + count).checked = false;
		document.getElementById("checkbox" + count).disabled = true;
		return false;
	}
	var issuedQuantity = $("#issuedQuantity" + count).val();
	if (issuedQuantity != "" && issuedQuantity != " ") {
		if (parseInt(issuedQuantity) > parseInt(pendingReqItemQuantity)) {
			alert("Issue Quantity is less then item Quantity");
			return false;
		}
	
		if (parseInt(issuedQuantity)< 0 || parseInt(issuedQuantity) == 0) {
			alert("Issue Quantity should not less than or equal to 0");
			return false;
		}
		if (parseInt(issuedQuantity) <= parseInt(pendingReqItemQuantity)) {
			if (parseInt(issuedQuantity) > parseInt(currentInvStock)) {
				alert("Issue Quantity is less then Main Inventory Stock");
				return false;
			} else {
				for ( var i = 1; i <= tableLength; i++) {
				if($("#itemMasterIdEditMrnGeneData" + i).val() == itemMasterId){
				var finalItemQty = parseInt(pendingReqItemQuantity) - parseInt(issuedQuantity);
				var sameItemIssueQuantity = document.getElementById("issuedQuantity" + count).value;
				$("#pendingReqItemQuantity" + i).val(finalItemQty);
				document.getElementById("checkbox" + i).disabled = true;
				document.getElementById("checkbox" + i).checked = true;
				
				if(finalItemQty == 0){
					document.getElementById("accept" + i).disabled = true;
				}
				else{
				document.getElementById("accept" + count).disabled = true;
				}
				document.getElementById("issuedQuantity" + count).disabled = true;
				document.getElementById("hiddenIdForValidation").value = 1;
				//totalDocQty();
				}
				}
			}
		}
	}
	return false;
}
function updateBatchStock(){
	var subInventoryId = $("#subInventoryIdInsideModal").val();
	var batchStockDetails = {
			lstBatchStockDto : []
		};
	var rowsGenerateMRNItemSlave = $('#generateGoodsIssueInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rowsGenerateMRNItemSlave; i++) {
		var itemMasterId = $("#itemMasterIdEditMrnGeneData" + i).val();
		var itemName = $("#txtItemNameId" + i).val();
		var mrnQuantity = $("#pendingReqItemQuantity" + i).val();
		var issueQuantity = $("#issuedQuantity" + i).val();
		var itemBatchCode = $("#itemBatchCodeId" + i).val();
		var itemBatchExpDate = $("#itemBatchExpDate" + i).val();
		if(itemBatchExpDate == "NA"){
			itemBatchExpDate = null;
		}
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

function setBatchStockValues(batchStockDetails,itemMasterId,itemName,
		issueQuantity,totalQuantity,subInventoryId,itemBatchCode,itemBatchExpDate) {
	batchStockDetails.lstBatchStockDto.push({
		itemMasterId : itemMasterId,
		itemName : itemName,
		issueQuantity : issueQuantity,
		totalQuantity : totalQuantity,
		subInventoryId : subInventoryId,
		itemBatchCode : itemBatchCode,
		itemBatchExpDate : itemBatchExpDate
	});
}

function saveGoodsIssue(){
	var mrnDate = $("#mrnDate").val();
	var mrnId = $("#generatedMRNId").val();
	var subInventoryName = $("#subInventoryNameId").val();
	var subInventoryId = $("#subInventoryIdInsideModal").val();
	var remark = $("#remark").val();
//	var totalItemQuantity = $("#totalItemQuantityId").val();
	var mrnStatus =  $("#mrnStatusId").val();
	var userId = $('#userId').val();
	var userName = $("#userNameId").val();
	var unitId = $("#unitId").val();
	var id = $("#goodsIssueId").val();
	if(mrnId=="" || mrnId == null || mrnId == undefined){
		alert('please select atleast one issue id');
		return false;
	}
	
	if(subInventoryName=="" || subInventoryName == null || subInventoryName == undefined){
		alert('please select sub inventory name');
		return false;
	}
	if(mrnDate=="" || mrnDate == null || mrnDate == undefined){
		alert('please select mrn date');
		return false;
	}
	var goodsIssueMrnItemSlaveDetails = {
			goodsIssueMrnItemSlaveDtos : []
		};
	var rowsGenerateMRNItemSlave = $('#generateGoodsIssueInfoTable tbody tr.newAdded').length;
	//remove equal to
	for ( var i = 1; i <= rowsGenerateMRNItemSlave; i++) {
		var itemSlaveId = $("#itemSlaveId" + i).val();
		var itemMasterId = $("#itemMasterIdEditMrnGeneData" + i).val();
		var itemName = $("#txtItemNameId" + i).val();
		var mrnQuantity = $("#txtMrnQty" + i).val();
		var uomUnit = $("#txtUom" + i).val();
		var currentSubInvStock = $("#currentSubInvStock" + i).val();
		var issueQuantity =$("#issuedQuantity" + i).val();
		var pendingRequestItemQuantity = $("#pendingReqItemQuantity" +i).val();
		var hiddenIdForValidation = $("#hiddenIdForValidation").val();
		var subRemarkGoodsIssue = $("#subRemarkGoodsIssue" +i).val();
		if(hiddenIdForValidation == 0){
			alert("Issue Quantity Should Not Be Less Than Or equal To Zero In Row.."+i);
			return false;
		}
		var itemBatchCode = $("#itemBatchCodeId"+i).val();
		var itemBatchExpDate = $("#itemBatchExpDate"+i).val();
		if(itemBatchExpDate == "NA"){
			itemBatchExpDate = null;
		}
		var subInventoryNameSlave = subInventoryName;
		var subInventoryIdSlave = subInventoryId;
		if(pendingRequestItemQuantity > 0){
			mrnStatus = $("#mrnStatusId").val();
		}
		else{
			$("#mrnStatusId").val("Dispatched");
			mrnStatus = $("#mrnStatusId").val();
		}
		
		//return false;
		var requestedItemQuantity = $("#requestedItemQuantity" +i).val();
		setGoodsIssueItemSlave(goodsIssueMrnItemSlaveDetails,itemSlaveId,itemMasterId,itemName,
				uomUnit,
				currentSubInvStock,issueQuantity,pendingRequestItemQuantity,
				requestedItemQuantity,mrnQuantity,subInventoryNameSlave,subInventoryIdSlave,mrnStatus,itemBatchCode,itemBatchExpDate,subRemarkGoodsIssue);
	}
	goodsIssueMrnItemSlaveDetails = JSON.stringify(goodsIssueMrnItemSlaveDetails);
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('mrnId=' + mrnId);
	inputs.push('mrnDate=' + mrnDate);
	inputs.push('mrnSubinventoryName=' + subInventoryName);
	inputs.push('mrnSubinventoryId=' + subInventoryId);
	inputs.push('mrnRemak=' + remark);
	//inputs.push('totalItemQuantity=' + totalItemQuantity);
	inputs.push('mrnStatus=' + mrnStatus);
	inputs.push('goodsIssueMrnItemSlaveDetails=' + goodsIssueMrnItemSlaveDetails);
	
	inputs.push('userId=' + userId);
	inputs.push('userName=' + userName);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	inputs.push('unitId=' + unitId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryGoodsIssue/saveGoodsIssueMRNRequest",
		cache : false,
		success : function(r) {
			if (r == 1) {
				updateBatchStock();
				alertify.success("Goods Issue Generated Sucessfully");
				$("#hiddenIdForValidation").val('0');
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
				
			} else if (r == 2) {
				updateBatchStock();
				alertify.success("Goods Issue Updated Sucessfully");
				$("#hiddenIdForValidation").val('0');
				setTimeout(function() {
		         window.location.reload();
		      }, 1000);
			} 
			else {
				alertify.error("Oops Some Problem Ocured");
			}
			
		}
	});
}

function setGoodsIssueItemSlave(goodsIssueMrnItemSlaveDetails,itemSlaveId,itemMasterId,itemName,uomUnit,
		currentSubInvStock,issueQuantity,pendingRequestItemQuantity,
		requestedItemQuantity,mrnQuantity,subInventoryNameSlave,subInventoryIdSlave,mrnStatus,itemBatchCode,itemBatchExpDate,subRemarkGoodsIssue) {
	
	goodsIssueMrnItemSlaveDetails.goodsIssueMrnItemSlaveDtos.push({
		mrnItemSlaveId : itemSlaveId,
		itemMasterId : itemMasterId,
		itemName : itemName,
		itemUom : uomUnit,
		itemIssueQty : issueQuantity,
		mrnQuantity : mrnQuantity,
		currentSubInventoryStock : currentSubInvStock,
		pendingRequestItemQuantity : pendingRequestItemQuantity,
		requestedItemQuantity : requestedItemQuantity,
		subinventoryName : subInventoryNameSlave,
		subInventoryId : subInventoryIdSlave,
		mrnStatus : mrnStatus,
		itemBatchCode : itemBatchCode,
		itemBatchExpDate : itemBatchExpDate,
		goodsIssueSubRemark : subRemarkGoodsIssue
	});
}
function setEnableDisableAcceptButtonOnGoodsIssue() {
	var totalQty;
	var goodsIssueTableRowLength = $('#generateGoodsIssueInfoTable tbody tr.newAdded').length;
	for (var i = 1; i <= goodsIssueTableRowLength; i++) {
		totalQty = $("#pendingReqItemQuantity" + i).val();
		if (totalQty == 0) {
			document.getElementById("accept" + i).disabled = true;
			document.getElementById("txtItemNameId"+ i).disabled = true;
			document.getElementById("pendingReqItemQuantity"+ i).disabled = true;
		} else {
			document.getElementById("accept" + i).disabled = false;
			document.getElementById("txtItemNameId"+ i).disabled = false;
			document.getElementById("pendingReqItemQuantity"+ i).disabled = false;
		}

	}

}
function onCloseBtnRefrshPage() {
	window.location.replace("inv_goods_issue.jsp");
}

function getDate(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	return datee;
}
*/

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 19-Feb-2020
 * @codeFor : getAllGoodIssue()
 ******************************************************************************/
function getAllGoodIssue() {	
	
	var unitId = $("#unitId").val();
	var inputs = [];
		inputs.push('unitId=' + unitId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryGoodsIssue/getAllGoodIssue",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {		
			
			setGoodIssueMasterTemplate(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date :  19-Feb-2020
 * @codeFor : setGoodIssueMasterTemplate()
 ******************************************************************************/

function setGoodIssueMasterTemplate(response) {	
	var htm = "";
	var index = 1;			
				for ( var i = 0; i < response.lstGoodsIssueMrnMaster.length; i++) {
					
					var disDate=getDate(response.lstGoodsIssueMrnMaster[i].createdDate);
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstGoodsIssueMrnMaster[i].mrnId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstGoodsIssueMrnMaster[i].mrnDate
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ disDate
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstGoodsIssueMrnMaster[i].mrnSubinventoryName
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ response.lstGoodsIssueMrnMaster[i].mrnStatus
							+ '</td>'							
							
							+ '</tr>';
					index++;
			
			} 
				$("#goodissueInfoList").html(htm);
}


/************
 * @author	: Dayanand Khandekar
 * @date		: 07-feb-2020
 * @codeFor	: setAutoSubInventoryName
 ************/
//function setAutoSubInventoryNameForGoodIssue(inputID) {
//
//	var resultData = [];
//	var findingName = $("input#" + inputID).val();
//	if (findingName == "" || findingName == null || findingName == "null"
//			|| findingName == undefined) {
//		alert("Please enter search value");
//		$("input#" + inputID).focus();
//		return false;
//	}
//	var inputs = [];
//	inputs.push('subInventoryName=' + findingName);
//	var str = inputs.join('&');
//	jQuery
//			.ajax({
//				async : false,
//				type : "POST",
//				data : str + "&reqType=AJAX",
//				url : "ehat/inventoryM/autoFillSearchOnSubInventory",
//				cache : false,
//				success : function(r) {
//
//					var template = "";
//					for ( var j = 0; j < r.lstSubInventoryMaster.length; j++) {
//
//						var arrValue = r.lstSubInventoryMaster[j].id + "-"
//								+ r.lstSubInventoryMaster[j].subInventoryName;
//						var id = r.lstSubInventoryMaster[j].id;
//						var subInventoryName = r.lstSubInventoryMaster[j].subInventoryName;
//
//						resultData.push({
//							ID : id,
//							Name : subInventoryName
//						});
//						template = template + '<li data-value="' + id
//								+ '" class=""><a href="#">' + arrValue
//								+ '</a></li>';
//					}
//					setTimeout(
//							function() {
//								$("div#goodIssueDiv .typeahead")
//										.html(template);
//								$("div#goodIssueDiv .typeahead")
//										.show();
//
//								$("input#" + inputID).typeahead({
//									source : resultData,
//									displayField : 'Name',
//									valueField : 'ID',
//									onSelect : displaySubInventorySearchResult,
//									scrollBar : true
//								});
//								$("input#" + inputID).data('typeahead').source = resultData;
//							}, 500);
//				}
//			});
//	//below function to set the search value to search text feild and calling getPackingDetailsById function
//	function displaySubInventorySearchResult(item) {
//		var res = item.text.split('-');
//		var subInventoryId = res[0];
//		var subInventoryName = res[1];
//		document.getElementById("subInvId").value = subInventoryId;
//		$("#" + inputID).val(subInventoryName);
//	}
//}





/************
 * @author	: Dayanand Khandekar
 * @date		: 20-feb-2020
 * @codeFor	: getGoodIssueById
 ************/
//function getGoodIssueById() {
//	var subInvId = $("#subInvId").val();
//	if (subInvId == 0 || subInvId == "null" || subInvId == null) {
//		alert("Please Select Sub Inventory Name");
//		return false;
//	}
//	var inputs = [];
//	inputs.push('subInvId=' + subInvId);
//	var str = inputs.join('&');
//	jQuery.ajax({
//		async : true,
//		type : 'GET',
//		data : str + "&reqType=AJAX",
//		url : 'ehat/inventoryGoodsIssue/getGoodIssueById',
//		timeout : 1000 * 60 * 5,
//		catche : false,
//		success : function(r) {
//			setgoodIssueDataToTable(r);
//		}
//	});
//}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-feb-2020
 * @codeFor	: setgoodIssueDataToTable
 ************/
//function setgoodIssueDataToTable(r) {
//
//	var htm = "";
//	var index = 1;
//	
//	if(r.mrnSubinventoryName==null || r.mrnSubinventoryName=="null" || r.mrnSubinventoryName==""){
//		alert("Please Select SubInventory First");
//		return false;
//	}
//	
//			var createDate = getDate(r.createdDate);
//			htm = htm
//					+ '<tr> '
//					+ ' <td class="col-md-1 center">'
//					+ index
//					+ '</td>'
//
//					+ ' <td class="col-md-1 center">'
//					+ r.mrnId
//					+ '</td>'
//
//					+ ' <td class="col-md-1 center">'
//					+r.mrnDate
//					+ '</td>'
//
//					+ ' <td class="col-md-1 center">'
//					+ createDate
//					+ '</td>'
//					
//
//					+ ' <td class="col-md-1 center">'
//					+ r.mrnSubinventoryName
//					+ '</td>'
//					
//					+ ' <td class="col-md-1 center">'
//					+ r.mrnStatus
//					+ '</td>'
//
//					
//
//					+ '</tr>';
//			index++;
//		
//
//	$("#goodissueInfoList").html(htm);
//};
