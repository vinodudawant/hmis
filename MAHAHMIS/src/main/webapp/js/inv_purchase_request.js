/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Add new row temp for MRN
 ************/
function addNewRowInTable(tableId,callFrom){
	
	var tbody = "";
	var rows = $('#'+tableId+' tbody tr').length;
	
	if(callFrom == "MRN"){
		
		tbody = getMrnTableBodyString(rows+1);
	}if(callFrom == "purchasequotation"){
		
		tbody = getPurchaseQuotationItemInfoBody(rows+1);
	}if(callFrom == "purchaserequest"){
				
		tbody = getPurchaseRequestItemInfoBody(rows+1);
	}if(callFrom == "po"){
				
		tbody = getPurchaseRequestItemInfoBodyForPO(rows+1);
	}if(callFrom == "so"){
				
		tbody = getItemInfoBodyForSO(rows+1);
	}
		
	$('#'+tableId).append(tbody);
}

/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Remove row temp for MRN
 ************/
function removeRowFromTable(tableId,checkboxClass){	
	
   
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	check(tableId);
	checkComp(tableId);
  
  
}

/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: For reorder srno after delete
 ************/
function check(tableId){
	obj=$('#'+tableId+' tbody tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		$('#'+id).html(key+1);
	});
}
/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: For reorder index ids of componant after delete
 ************/
function checkComp(tableId){
	
	var trLength = $('#'+tableId).find("tr:first th").length;
	obj=$('#'+tableId+' tbody tr td').find('input');
	var inx = 1;
	var idIndex = 1;
	$.each( obj, function( key, value ) {		
		
		if(inx == (trLength+1)){
			
			inx = 1;
			idIndex++;
		}		
		id=value.id;		
		var idText = (value.id).replace(/[0-9]/g, '');
		var replaceById = idText + idIndex;
		$('#'+id).attr('id',replaceById);
		inx++;
	});
}
/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Check uncheck all checkbox in table
 ************/
function checkUncheckAll(masterChkId,slaveChkClass){
	
	if($("#"+masterChkId).is(":checked")){
		
		$('.'+slaveChkClass).prop("checked",true)
	}else{
		
		$('.'+slaveChkClass).prop("checked",false)
	}
}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 17-Dec-2019
 * @codeFor : to Set Row Template To Body Of Item Info Table
 ******************************************************************************/
function getPurchaseRequestItemInfoBody(id) {
	var tbody = "<tr id='multiTr"+id+"' class='newAdded'>"
	+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+id+"' value='"+id+"'></td>"
	+ "<td class='col-md-1 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value='0'></td>"
	+ "<td class='col-md-3 center'><input type='text' id='txtitemNameId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtitemQty"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtitemreviwedQty"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtpurchaserequestQty"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtlastpoQty"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtlastpoNumber"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtlasrgrnNumber"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtlastconsumentionMonth"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center' ><Select id='txtUom"+id+"'  class='form-control input-SmallText'><option value='0'>-------select------</option></select> </td>"
	+ "<td class='col-md-1 center'><Select  id='txtStatus"+id+"' class='form-control input-SmallText'> <option value='0'>-------select------</option></select></td>"
	+ "<td class='col-md-1 center'><input type='checkbox' id='txtPO"+id+"'  data-name='po'  class='chkMrnPO' name='pocheck'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtPOQty"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center'><input type='checkbox' id='txtSto"+id+"'  data-name='sto' class='chkMrnSTO' name='pocheck'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtStoQty"+id+"' class='form-control input-SmallText' value='0' onkeyup='calculateTotalQty("+id+")'> </td>"
	+ "<td class='col-md-2 center'><Select  id='txtsubInventoryId"+id+"' class='form-control input-SmallText'> <option value='0'>-------select------</option></select></td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtavailableQty"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-1 center'><input type='text' id='txtcurrentlabstock"+id+"' class='form-control input-SmallText' value='0'> </td>"
	
	+ "<td class='col-md-1 center' style='display:none'><input type='text' id='hiddenSubInvId1"+id+"' class='form-control input-SmallText' value='"+$("#hiddenSubInvId").val()+"'> </td>"

	
	+ "</tr>";
	
	return tbody;
}

function setItemInfoList(itemInfoDtoDetails,itemInfoId,
		itemName, itemactualQty, itemreviewedQty,
		itemPurchaseQty,itemlastpoQty, itemlastpoNumber,
		itemlastgrnNumber,itemlastConsumption,itemUom,itemStatus,itemPoStatus,itemPoQty,
		itemStoStatus,itemStoQty,itemCenterName,itemAvailableQty,itemCurrentLabStockQty,itemMasterId,subInvIdForItem,userId,unitId){
	
	itemInfoDtoDetails.lstMrniteminfo.push({
		
		itemInfoId:itemInfoId,
		itemName:itemName,
		itemactualQty:itemactualQty,
		itemreviewedQty:itemreviewedQty,
		itemPurchaseQty:itemPurchaseQty,
		itemlastpoQty:itemlastpoQty,
		itemlastpoNumber:itemlastpoNumber,
		itemlastgrnNumber:itemlastgrnNumber,
		itemlastConsumption:itemlastConsumption,
		itemUom:itemUom,
		itemStatus:itemStatus,
		itemPoStatus:itemPoStatus,
		itemPoQty:itemPoQty,
		itemStoStatus:itemStoStatus,

		itemStoQty:itemStoQty,

		itemCenterName:itemCenterName,
		
		subinventoryName:itemCenterName,			
	

		itemAvailableQty:itemAvailableQty,

		currentSubInventoryStock:itemCurrentLabStockQty,
		sunInventoryId:subInvIdForItem,
		itemMasterId:itemMasterId,
		
		unitId:unitId,

		createdBy:userId,


});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 19-Dec-2019
 * @codeFor : savePurchaseRequestMaster
 ******************************************************************************/
function  savePurchaseRequestMaster(){
	
	var mrnId = $("#mrnId").val();
	var mrnDate = $("#mrnDate").val();
	var mrnCenterName = $("#centerName").val();
	var mrnRemak = $("#remark").val();
	
	var mrnNote = $("#Note").val();
	var mrnCurrentUserName = $("#mrncurrentusername").val();
	var subInvId = $("#hiddenSubInvId").val();
	var subInvNameId = $("#subInvNameId").val();
	
	
	
	//var genralInfo = $("#PartyGeneralTableInfoList").html().length;
	  var   itemInfo =  $('#purchaserequestInfoTable tbody tr.newAdded').length; 
	 
	  
	  if (itemInfo == "" || itemInfo == null || itemInfo == 0) { 
		  alert("Enter at least One Record In Item Info tab ");
		  return false; 
	  }
	// this is for item info
	var itemInfoDtoDetails = {
			lstMrniteminfo : []
	};
	
	
	
	var itemPoStatusMaster="N";
	var itemStoStatusMaster="N";
	var itemPoStatusMasterForMaster="N";
	var itemStoStatusMasterForMaster="N";
	
	
	var itemPoStatusmMasterCount=0;
	var itemStoStatusMasterCount=0;
	
	
	var rows = $('#purchaserequestInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		
		var userId =$("#userId").val();
		var unitId = $("#unitId").val();
		var itemInfoId = $("#itemInfoId" + i).val();
		
		var itemName = $("#txtitemNameId" + i).val();		
		var itemactualQty = $("#txtitemQty" + i).val();
		var itemreviewedQty = $("#txtitemreviwedQty" + i).val();
		var itemPurchaseQty = $("#txtpurchaserequestQty" + i).val();
		var itemlastpoQty = $("#txtlastpoQty" + i).val();
		var itemlastpoNumber = $("#txtlastpoNumber" + i).val();
		var itemlastgrnNumber = $("#txtlasrgrnNumber" + i).val();
		var itemlastConsumption = $("#txtlastconsumentionMonth" + i).val();
		var itemUom = $("#txtUom" + i).val();
		var itemStatus = $("#txtStatus" + i).val();
		
//		if($("#txtPO"+i+":checked")){
//			itemPoStatus="Y";
//			
//		}
//		if($("#txtPO"+i).prop('checked',false)){
//			alert("hiii777");
//		}
		
		if( $('input:checkbox[id = txtPO'+i+']').is(':checked')){
			
			
			itemPoStatusmMasterCount=1;
			 $("#txtSto" + i).disabled=true;
		}
		
		//var itemPoStatus = $("#txtPO" + i).val();
		var itemPoQty = $("#txtPOQty" + i).val();
		
		if( $('input:checkbox[id = txtSto'+i+']').is(':checked')){
			
			itemStoStatusMasterCount=1;
			
		}
		
		if(itemPoStatusmMasterCount==1){
			itemPoStatusMaster="Y";
			itemPoStatusMasterForMaster="Y";
			
		}
		
		if(itemStoStatusMasterCount==1){
			itemStoStatusMaster="Y";			
			itemStoStatusMasterForMaster="Y";
			
		}
		
		//var itemStoStatus = $("#txtSto" + i).val();
		var itemStoQty = $("#txtStoQty" + i).val();
		var itemCenterName = $("#txtcenterName" + i).val();		
		var itemAvailableQty = $("#txtavailableQty" + i).val();
		var itemCurrentLabStockQty = $("#txtcurrentlabstock" + i).val();
		var subInvIdForItem = $("#txtsubInventoryId" + i).val();
		
		var itemMasterId = $("#txtitemMasterId" + i).val();
		
		var result=calculateTotalQty(i);
		
		if(result==0)
		{
			
			alert("Sto qty and Po Qty Should Not be Greater Than Item Qty in Row"+i);
			return false;
		}else{

		setItemInfoList(itemInfoDtoDetails,parseInt(itemInfoId),
				itemName, parseInt(itemactualQty), parseInt(itemreviewedQty),
				parseInt(itemPurchaseQty),parseInt(itemlastpoQty),parseInt(itemlastpoNumber),
				parseInt(itemlastgrnNumber),parseInt(itemlastConsumption),parseInt(itemUom),itemStatus,itemPoStatusMaster,parseInt(itemPoQty),
				itemStoStatusMaster,parseInt(itemStoQty),itemCenterName,parseInt(itemAvailableQty),parseInt(itemCurrentLabStockQty),parseInt(itemMasterId),parseInt(subInvIdForItem),userId,unitId);
		}
	}

	itemInfoDtoDetails = JSON
			.stringify(itemInfoDtoDetails);
	
	
	var inputs = [];
	inputs.push("mrnId=" + mrnId);
	inputs.push("mrnDate=" + mrnDate);
	
	inputs.push("mrnCenterName=" + mrnCenterName);
	inputs.push("mrnRemark=" + mrnRemak);
	
	inputs.push("mrnNote=" + mrnNote);
	inputs.push("mrnCurrentUserName=" + mrnCurrentUserName);
	
	inputs.push("itemPoStatus=" + itemPoStatusMasterForMaster);
	inputs.push("itemStoStatus=" + itemStoStatusMasterForMaster);
	
	inputs.push("mrnSubinventoryId=" + subInvId);
	inputs.push("mrnSubinventoryName=" + subInvNameId);
	
	// this is for item info
	inputs.push("itemInfoDtoDetails="+ encodeURIComponent(itemInfoDtoDetails));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/purchaserequest/savePurchaseRequestMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alert("Record saved successfully..!");
			} else if (response == 2) {
				alert("Record Updated successfully..!");
			} else {
				alert("Oops something went wrong.....");
			}
			
			getAllPurchaseRequestMaster("all");
			
			$("#itemMasterModal").modal('hide');
			
		}
	});

	
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 19-Dec-2019
 * @codeFor : getAllPurchaseRequestMaster()
 ******************************************************************************/
function getAllPurchaseRequestMaster(call) {

	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	inputs.push('call=' + call);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchaserequest/getAllPurchaseRequestMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			
			setPurchaseRequestMasterTemplate(r, call);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 19-Dec-2019
 * @codeFor : setPurchaseRequestMasterTemplate()
 ******************************************************************************/

function setPurchaseRequestMasterTemplate(response, callFrom) {
	
	var htm = "";
	var index = 1;
			if (callFrom === "open") {
				for ( var i = 0; i < response.lstmrnmaster.length; i++) {
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnDate
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnRemark
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnSubinventoryName
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=reviewPurchaseRequestMaster('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=deletePurchaseQuotationMaster('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="glyphicon glyphicon-ok-sign"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="glyphicon glyphicon-trash" data-toggle="modal" onclick=rejectPurchaseRequestMaster('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ '</tr>';
					index++;
					
				}
				$("#openrequestInfoList").html(htm);
			} else if (callFrom === "search") {				
			
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.mrnId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.mrnDate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.lstmrnmaster[i].mrnRemark
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.mrnSubinventoryName
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=reviewPurchaseRequestMaster('
				+ response.mrnId
				+ ')><i class="fa fa-edit"></i></button></td>'
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=deletePurchaseQuotationMaster('
				+ response.mrnId
				+ ')><i class="glyphicon glyphicon-ok-sign"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="glyphicon glyphicon-trash" data-toggle="modal" data-target="#purchaserequestRejectionModalId" onclick=printPurchaseQuotationMaster('
				+ response.mrnId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '</tr>';
		index++;
				
		
			} else if (callFrom === "close") {
				
				for ( var i = 0; i < response.lstmrnmaster.length; i++) {
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnDate
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnRemark
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnSubinventoryName
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=reviewPurchaseRequestMasterForView('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
							
							
							+ '</tr>';
					index++;
				}
				$("#closerequestInfoList").html(htm);
				
			}	 else if (callFrom === "rejection"){
			
				
				for ( var i = 0; i < response.lstmrnmaster.length; i++) {
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnDate
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnRejectionDateTime
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnRemark
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnrejectremark
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnSubinventoryName
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editPurchaseQuotationMaster('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
							
							
							+ '</tr>';
					index++;
				}
				$("#mrnrejectionInfoList").html(htm);
			} else if (callFrom === "po"){
				
				for ( var i = 0; i < response.lstmrnmaster.length; i++) {
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnDate
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnRemark
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnSubinventoryName
							+ '</td>'
							
				if(response.lstmrnmaster[i].visisbilityPOsStatus=='Y'){
							htm=htm	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal"  disabled="disabled"  data-target="#itemMasterModalForPO" onclick=reviewPurchaseRequestMasterForPO('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
						
							+ ' <td class="col-md-1 center">'
							+ '	<button class="glyphicon glyphicon-trash" data-toggle="modal"   disabled="disabled" onclick=rejectPurchaseRequestMaster('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
								
					}else{
							
							htm=htm	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModalForPO" onclick=reviewPurchaseRequestMasterForPO('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
						
							+ ' <td class="col-md-1 center">'
							+ '	<button class="glyphicon glyphicon-trash" data-toggle="modal" onclick=rejectPurchaseRequestMaster('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
							}
							+ '</tr>';
					index++;
				
			}
				$("#poprocessingInfoList").html(htm);
			}else if (callFrom === "so"){
				
				for ( var i = 0; i < response.lstmrnmaster.length; i++) {
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnDate
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnRemark
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstmrnmaster[i].mrnSubinventoryName
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModalForSO" onclick=reviewPurchaseRequestMasterForSTO('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
						
							+ '</tr>';
					index++;
				
			}
				$("#soprocessingInfoList").html(htm);
			}
			
	
}


/************
* @author	: Dayanand Khandekar
* @date		: 19-Dec-2019
* @codeFor	: rejectPurchaseRequestMaster
 ************/
function rejectPurchaseRequestMaster(mrnId) {
	$("#mrnrejectId").val(mrnId);
	
	var r = confirm("Are You Sure To Reject This MRN ?");
	if (r == true) {
		$("#purchaserequestRejectionModalId").modal('show');
	}
}
	function  rejectMrnRequest(){
	var 	mrnId=$("#mrnrejectId").val();
	
	var 	mrnrejectremark=$("#mrnrejectremark").val();
		jQuery.ajax({
			type : "POST",
			url : "ehat/purchaserequest/rejectPurchaseRequestMaster",
			data : {
				"mrnId" : mrnId,
				"mrnrejectremark" : mrnrejectremark
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				//refreshrackDoc();
				getAllPurchaseRequestMaster("rejection");
				closemrnRejectionModal();
			}
		});
	}



function closemrnRejectionModal(){
	$("#purchaserequestRejectionModalId").modal('hide');
}

/************
* @author	: Dayanand Khandekar
* @date		: 20-Dec-2019
* @codeFor	: reviewPurchaseRequestMaster
 ************/
function reviewPurchaseRequestMaster(mrnId){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('mrnId=' + mrnId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchaserequest/reviewPurchaseRequestMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#mrnId").val(r.mrnId);
			$("#mrnNo").val(r.mrnId);
			$("#mrnDate").val(r.mrnDate);
			//$("#centerName").val(r.mrnCenterName);
			$("#remark").val(r.mrnRemark);
			$("#Note").val(r.mrnNote);
			 $("#hiddenSubInvId").val(r.mrnSubinventoryId);
			 $("#subInvNameId").val(r.mrnSubinventoryName);
			setEditPurchaseRequestItemSlaveInfo(r);	
			
		}
	});
	
}

/************
* @author	: Dayanand Khandekar
* @date		: 20-Dec-2019
* @codeFor	: setEditPurchaseRequestItemSlaveInfo
 ************/

function setEditPurchaseRequestItemSlaveInfo(response){

	var length = 0;
	if(response.lstMrniteminfo.length != 0 && response.lstMrniteminfo !=null && response.lstMrniteminfo != ""){
		
		length = response.lstMrniteminfo.length;
		var htm = "";
		var id = 0;
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
			+ "<tr class='newAdded' id='mutitr'"
			+ id
			+ "'>"
			+ "<td class='col-md-2 center'><input type='checkbox' class='chkMrnItem'   value='"+id+"' "
			+ id
			+ " name='patientdocid'  checked='checked' isNew='false' id="+response.lstMrniteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-2 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value="+response.lstMrniteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtitemNameId" 
			+ id
			+ "' class='form-control input-SmallText'  value='"+response.lstMrniteminfo[i].itemName+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text'   class='form-control input-SmallText'   onkeypress='return validateNumbers(event)'  id='txtitemQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].mrnQuantity+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtitemreviwedQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemreviewedQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtpurchaserequestQty" 
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemPurchaseQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtlastpoQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemlastpoQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText' id='txtlastpoNumber"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemlastpoNumber+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtlasrgrnNumber"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemlastgrnNumber+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtlastconsumentionMonth"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemlastConsumption+"'>"
			+ "</td>"
			
			/*+ "<td><input type='text' style='width: 80px;' id='txtUom"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstmrniteminfo[i].itemUom+"'>"
			+ "</td>"*/
			
			+ "<td class='col-md-2 center'><Select id='txtUom"+id+"'  class='form-control input-SmallText'><option value='0'>-------select------</option></select> </td>"
			
			
		
			+ "<td class='col-md-2 center'><Select  id='txtStatus"+id+"' class='form-control input-SmallText'> <option value='0'>-------select------</option></select></td>"
			
			
			
			
			/*+ "<td class='col-md-2 center'><input type='checkbox' id='txtPO"+id+"'  onclick='disbledCheckBox(this.id,"+id+")' data-name='po' class='chkMrnPO' name='pocheck'> </td>"*/
			+ "<td class='col-md-2 center'><input type='checkbox' id='txtPO"+id+"'  data-name='po' class='chkMrnPO' name='pocheck'> </td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText' id='txtPOQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemPoQty+"'>"
			+ "</td>"
			
		
			
			/*+ "<td class='col-md-2 center'><input type='checkbox' id='txtSto"+id+"'  onclick='disbledCheckBox(this.id,"+id+")' data-name='sto' class='chkMrnSTO' name='stocheck'> </td>"*/
			
			+ "<td class='col-md-2 center'><input type='checkbox' id='txtSto"+id+"' onclick='enableSubInvName("+id+")'  data-name='sto' class='chkMrnSTO' name='stocheck'> </td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtStoQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemStoQty+"' onkeyup='calculateTotalQty("+id+")'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><Select  id='txtsubInventoryId"+id+"' disabled='disabled' class='form-control input-SmallText'> <option value='0'>-------select------</option></select></td>"
			
		
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtavailableQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemAvailableQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtcurrentlabstock"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].currentSubInventoryStock+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center' style='display:none'><input type='text' class='form-control input-SmallText' id='txtitemMasterId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemMasterId+"'> '"
			+ "</td>"
			
			
			
						
			+ "</tr>";
		}
		
		$("#purchaserequestInfoTableBody").html(htm);
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
	        success : function(r){    
	        	
	        	var htm="<option value='0'>--Select--</option>";
			    for ( var i = 0; i < r.lstunitmaster.length; i++){    
			        htm = htm + "<option value='"+r.lstunitmaster[i].uniId+"'>"+r.lstunitmaster[i].unitName+"</option>";
			    }
			    
				for ( var i = 0; i < response.lstMrniteminfo.length; i++) {
					
					var id = i+1;
					$("#txtUom" +id).html(htm);
					$("#txtUom" +id).select2();
					$("#txtUom"+id).select2('val',response.lstMrniteminfo[i].itemUom);
				}			          
	        }
	    });	
		
		var htm="<option value='0'>--Select--</option>";
		
	    for ( var i = 0; i <= response.lstforsubInventoryInfo.length; i++){
	    	var length= response.lstforsubInventoryInfo.length;
	    	
	    	var id=i+1;
	    	 if(length >0){
	    	
	        htm = htm + "<option value='"+response.lstforsubInventoryInfo[i].sunInventoryId+"'>"+response.lstforsubInventoryInfo[i].subinventoryName+"-"+response.lstforsubInventoryInfo[i].currentSubInventoryStock+"</option>";
	        $("#txtsubInventoryId" +id).html(htm);
			$("#txtsubInventoryId" +id).select2();
	    	 }else{
	    		 
	    		 $("#txtsubInventoryId" +id).val(0);
	 			$("#txtsubInventoryId" +id).select2();
	    	 }
	    }
	    
		
	}
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-Dec-2019
 * @codeFor : getPurchaseRequestItemInfoBodyForPO
 ******************************************************************************/
function getPurchaseRequestItemInfoBodyForPO(id) {
	var tbody = "<tr id='multiTr"+id+"' class='newAdded'>"
	+ "<td class='col-md-2 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+id+"' value='"+id+"'></td>"
	+ "<td class='col-md-2 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value='0'></td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtitemNameId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtitemQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtpurchaserequestQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtprocessedQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='checkbox' id='txtPurchaseType"+id+"' class='chkMrnPO' name='pocheck'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text'  id='txtsupplierId"+id+"' class='form-control input-SmallText'></td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtunitprice"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtdispercen"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtdisrs"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtdisamt"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtbaseamt"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txttaxcode"+id+"' class='form-control input-SmallText' value='0'> </td>"	
	+ "<td class='col-md-2 center'><input type='text' id='txttaxamtperc"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txttaxamtrs"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txttotalamt"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtorderqty"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtpendingqty"+id+"' class='form-control input-SmallText' value='0'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txttemperature"+id+"' class='form-control input-SmallText' value='0'> </td>"
	
	+ "</tr>";
	
	return tbody;
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-Dec-2019
 * @codeFor : saveProcessPurchaseOrderMaster
 ******************************************************************************/
function saveProcessPurchaseOrderMaster(){
	
	var processId = $("#processId").val();
	var mrnId = $("#mrnIdForPO").val();
	var orderDate = $("#orderDate").val();
	var deliveryDate = $("#deliveryDate").val();
	var subInvIdForPO=$("#subInvIdForPO").val();
	var subInvNameForPO=$("#subInvNameForPO").val();
	
	
	
	
	//var genralInfo = $("#PartyGeneralTableInfoList").html().length;
	  var   itemInfo =  $('#purchaserequestPOInfoTable tbody tr.newAdded').length; 
	 
	  
	  if (itemInfo == "" || itemInfo == null || itemInfo == 0) { 
		  alert("Enter at least One Record In Item Info tab ");
		  return false; 
	  }
	// this is for item info
	var itemInfoDtoDetails = {
			lstprocessiteminfo : []
	};
	
	
	var purchaseType="N";
	
	var rows = $('#purchaserequestPOInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		
		var userId =$("#userId").val();
		var unitId = $("#unitId").val();
		var itemInfoId = $("#itemInfoId" + i).val();
		
		var itemName = $("#txtitemNameId" + i).val();		
		var itemQty = $("#txtitemQty" + i).val();
		var itempurchaserequestQty = $("#txtpurchaserequestQty" + i).val();
		var itemprocessedQty = $("#txtprocessedQty" + i).val();
		var quantity = $("#txtQty" + i).val();
		var supplierInfo = $("#txtsupplierId" + i).val();
		if(supplierInfo==0||supplierInfo==null||supplierInfo=="null"){
			alert("Please Enter Supplier Name");
			$("#txtsupplierId" + i).focus();
			return false;
		}
		
		var res = supplierInfo.split('-');
		var supplierId = res[0];
		var supplierName = res[1];
		
		var itemUnitPrice = $("#txtunitprice" + i).val();
		var itemDiscountPerc = $("#txtdispercen" + i).val();
		var itemDiscountRs = $("#txtdisrs" + i).val();
		var itemDiscountAmt = $("#txtdisamt" + i).val();
		var itemBaseAmt = $("#txtbaseamt" + i).val();
		var itemTaxCode = $("#txttaxcode" + i).val();
		var itemtaxPercen = $("#txttaxamtperc" + i).val();
		var itemtaxAmt = $("#txttaxamtrs" + i).val();
		var itemtotalAmt = $("#txttotalamt" + i).val();
		var itemorderQty = $("#txtorderqty" + i).val();
		var itempendingQty = $("#txtpendingqty" + i).val();
		var temperature = $("#txttemperature" + i).val();

		
		if( $('input:checkbox[id = txtPurchaseType'+i+']').is(':checked')){
			
			
			purchaseType="Y";
		}
		
		
		
		

		setItemInfoListForPo(itemInfoDtoDetails,parseInt(itemInfoId),
				itemName, parseInt(itemQty), parseInt(itempurchaserequestQty),
				parseInt(itemprocessedQty),parseInt(quantity),parseInt(supplierId),supplierName,
				parseFloat(itemUnitPrice),parseFloat(itemDiscountPerc),parseFloat(itemDiscountRs),
				parseFloat(itemDiscountAmt),parseFloat(itemBaseAmt),itemTaxCode,parseFloat(itemtaxPercen),parseFloat(itemtaxAmt),parseFloat(itemtotalAmt),
				parseFloat(itemorderQty),parseFloat(itempendingQty),parseInt(temperature),userId,unitId);
	}

	itemInfoDtoDetails = JSON
			.stringify(itemInfoDtoDetails);
	
	
	
	var inputs = [];
	inputs.push("processId=" + processId);
	inputs.push("orderdDate=" + orderDate);
	
	inputs.push("deliveryDate=" + deliveryDate);
	inputs.push("mrnId=" + mrnId);
	
	inputs.push("mrnSubinventoryId=" + subInvIdForPO);
	inputs.push("mrnSubinventoryName=" + subInvNameForPO);
	
	
	
	// this is for item info
	inputs.push("itemInfoDtoDetails="+ encodeURIComponent(itemInfoDtoDetails));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/purchaserequest/saveProcessPurchaseOrderMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alert("Record saved successfully..!");
			} else if (response == 2) {
				alert("Record Updated successfully..!");
			} else {
				alert("Oops something went wrong.....");
			}
			
			getAllPurchaseRequestMaster("all");
			
			$("#itemMasterModalForPO").modal('hide');
			
		}
	});

}

function setItemInfoListForPo(itemInfoDtoDetails,itemInfoId,
		itemName, itemQty, itempurchaserequestQty,
		itemprocessedQty,quantity,supplierId,supplierName,
		itemUnitPrice,itemDiscountPerc,itemDiscountRs,
		itemDiscountAmt,itemBaseAmt,itemTaxCode,itemtaxPercen,itemtaxAmt,itemtotalAmt,
		itemorderQty,itempendingQty,temperature,userId,unitId){
	
	itemInfoDtoDetails.lstprocessiteminfo.push({
		
		itemInfoId:itemInfoId,
		itemName:itemName,
		itemQty:itemQty,
		itempurchaserequestQty:itempurchaserequestQty,
		itemprocessedQty:itemprocessedQty,
		quantity:quantity,
		supplierId:supplierId,
		supplierName:supplierName,
		itemUnitPrice:itemUnitPrice,
		itemDiscountPerc:itemDiscountPerc,
		itemDiscountRs:itemDiscountRs,
		itemDiscountAmt:itemDiscountAmt,
		itemBaseAmt:itemBaseAmt,
		itemTaxCode:itemTaxCode,
		itemtaxPercen:itemtaxPercen,

		itemtaxAmt:itemtaxAmt,

		itemtotalAmt:itemtotalAmt,

		itemorderQty:itemorderQty,

		itempendingQty:itempendingQty,
		temperature:temperature,

		
		unitId:unitId,

		createdBy:userId,


});
}

function refershMrnPurchaseRequest(){
	
	 $("#mrnId").val(0);
	 $("#mrnDate").val("");
	 $("#centerName").val("");
	 $("#remark").val("");
	 $("#Note").val("");
	 $("#mrncurrentusername").val("");
	 var tableHeaderRowCount = 1;
		var table = document.getElementById('purchaserequestInfoTable');
		var rowCount = table.rows.length;
		for (var i = tableHeaderRowCount; i < rowCount; i++) {
		    table.deleteRow(tableHeaderRowCount);
		}
		document.getElementById('savePurchase').style.visibility = 'visible';
	$("#itemMasterModal").modal('hide');
	
}




/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 30-Dec-2019
 * @codeFor : setAutoSubInventoryName()
 ******************************************************************************/
 
function setAutoSubInventoryName(inputID) {	
	
	
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
			
			var template = "";
			for ( var j = 0; j < r.lstSubInventoryMaster.length; j++){
				
				//var arrValue =r.lstSubInventoryMaster[j].subInventoryName ;
				var arrValue = r.lstSubInventoryMaster[j].id +"-"+r.lstSubInventoryMaster[j].subInventoryName +"-"+r.lstSubInventoryMaster[j].contactNumber;

			
				var id = r.lstSubInventoryMaster[j].id;
				
			//	$("#hiddenSubInvId").val(id);
				var subInventoryName = id+"-"+r.lstSubInventoryMaster[j].subInventoryName;
				
				resultData.push({
					ID : id,
					Name : subInventoryName
				});
				template = template + '<li data-value="' + id
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			setTimeout(function() {
				$("div#searchSubInventoryDivId .typeahead").html(template);
				$("div#searchSubInventoryDivId .typeahead").show();
				
				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displaySubInventorySearchResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	//below function to set the search value to search text feild and calling getPackingDetailsById function
	function displaySubInventorySearchResult(item) {
		var res = item.text.split('_');
		var subInventoryId = res[1];
		var subInventoryName = res[0];
		
		$("#hiddenSubInvId11").val(subInventoryId);		
		$("#" + inputID).val(subInventoryName);		
	}
}

/*******************************************************************************
* @author : Dayanand Khandekar
* @date : 31-Dec-2019
* @codeFor : getItemInfoBodyForSO
******************************************************************************/
function getItemInfoBodyForSO(id) {
	var tbody = "<tr id='multiTr"+id+"' class='newAdded'>"
	+ "<td class='col-md-2 center'><input type='checkbox' class='chkMrnItem' id='checkbox"+id+"' value='"+id+"'></td>"
	+ "<td class='col-md-2 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value='0'></td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtitemNameIdd"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)'> </td>"
	+ "<td class='col-md-2 center'><Select id='batchId"+id+"'  class='form-control input-SmallText'><option value='0'>-------select------</option></select> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='expirayDate"+id+"' class='form-control input-SmallText'> </td>"	
	+ "<td class='col-md-2 center'><input type='text' id='txtitemAvaialableQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtitemtransperQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtitemtransperreqQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtsubbInventoryId"+id+"' class='form-control input-SmallText'> </td>"
	
	
	+ "</tr>";
	
	return tbody;
}


/*******************************************************************************
* @author : Dayanand Khandekar
* @date : 1-jan-2020
* @codeFor : setItemInfoListForSto
******************************************************************************/

function setItemInfoListForSto(itemInfoDtoDetails,itemInfoId,
		itemName,batchName, itemExpirayDate,itemAvailableQty, itemTransperQty,
		itemTransperreqQty,stockSubinventoryId,stockSubinventoryNameForItem,itemMasterId,mrnitemSlaveId,stockSubinventoryIdForMaster,stockSubinventoryName,userId,unitId){
	
	itemInfoDtoDetails.lststocktrasiteminfo.push({
		
		itemInfoId:itemInfoId,
		itemName:itemName,
		itemBatchId:batchName,
		itemExpirayDate:itemExpirayDate,
		itemAvailableQty:itemAvailableQty,
		itemTransperQty:itemTransperQty,
		itemTransperreqQty:itemTransperreqQty,
		stockSubinventoryId:stockSubinventoryId,
		stockSubinventoryName:stockSubinventoryNameForItem,
		itemMasterId:itemMasterId,
		mrnitemSalveId:mrnitemSlaveId,
		itemIssueQty:itemTransperQty,
		itemRemainQty:itemTransperQty,
		sendSubinventoryId:stockSubinventoryIdForMaster,
		sendSubinventoryName:stockSubinventoryName,
		unitId:unitId,

		createdBy:userId,


});
}

/*******************************************************************************
* @author : Dayanand Khandekar
* @date : 1-jan-2020
* @codeFor : savestockTransperMaster
******************************************************************************/
function  savestockTransperMaster(){
	var stockId = $("#stockId").val();	
	var stockDate = $("#stockDate").val();
	var stockRemark = $("#remarksto").val();
	var mrnId = $("#mrnIdSO").val();
	var stockSubinventoryName = $("#subInvName").val();
	var stockSubinventoryIdForMaster = $("#subInvIdForStock").val();
	
	
	
	//var genralInfo = $("#PartyGeneralTableInfoList").html().length;
	  var   itemInfo =  $('#stocktransperInfoTable tbody tr.newAdded').length; 
	 
	  
	  if (itemInfo == "" || itemInfo == null || itemInfo == 0) { 
		  alert("Enter at least One Record In Item Info tab ");
		  return false; 
	  }
	// this is for item info
	var itemInfoDtoDetails = {
			lststocktrasiteminfo : []
	};
	
	
	
	
	var rows = $('#stocktransperInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		
		var userId =$("#userId").val();
		var unitId = $("#unitId").val();
		var itemInfoId = $("#itemInfoId" + i).val();		
		
		var itemName = $("#txtitemNameIdd"+i).val();
		var mrnitemSlaveId= $("#txtitemSlaveId"+i).val();
		
		var batchName = $("#batchId" + i).val();
		var itemExpirayDate = $("#expirayDate" + i).val();
		
		var itemAvailableQty = $("#txtitemAvaialableQty" + i).val();
		var itemTransperQty = $("#txtitemtransperQty" + i).val();
		var itemTransperreqQty = $("#txtitemtransperreqQty" + i).val();
		var subInvId = $("#txtsubbInventoryId" + i).val();
		var subInvName = $("#txtsubbInventoryName" + i).val();
		var itemMasterId = $("#txtitemMasterId" + i).val();
		
		
		if(subInvId==0||subInvId==null||subInvId=="null"){
			alert("Please Enter Sub Inventory Name");
			$("#txtsubbInventoryId" + i).focus();
			return false;
		}
		
		
		var stockSubinventoryId = subInvId;
		var stockSubinventoryNameForItem = subInvName;
		
		
		var result=calculateQtyForSto(i);
       if(result==1){
		setItemInfoListForSto(itemInfoDtoDetails,parseInt(itemInfoId),
				itemName,batchName, itemExpirayDate,parseInt(itemAvailableQty), parseInt(itemTransperQty),
				parseInt(itemTransperreqQty),parseInt(stockSubinventoryId),stockSubinventoryNameForItem,itemMasterId,mrnitemSlaveId,stockSubinventoryIdForMaster,stockSubinventoryName,userId,unitId);
       }else if(result==0){
    	   alert("Transper  Qty Should Not be Greater Than Transper Request Qty and Available Qty in Row"+i);
    	  return false;
       }
	}

	itemInfoDtoDetails = JSON
			.stringify(itemInfoDtoDetails);
	
	
	
	var inputs = [];
	inputs.push("stockId=" + stockId);
	inputs.push("stockDate=" + stockDate);
	
	inputs.push("stockRemark=" + stockRemark);
	inputs.push("mrnId=" + mrnId);
	inputs.push("stockSubinventoryName=" + stockSubinventoryName);
	inputs.push("stockSubinventoryId=" + stockSubinventoryIdForMaster);
	
	
	
	
	// this is for item info
	inputs.push("itemInfoDtoDetails="+ encodeURIComponent(itemInfoDtoDetails));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/stocktransper/savestockTransperMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alert("Record saved successfully..!");
			} else if (response == 2) {
				alert("Record Updated successfully..!");
			} else {
				alert("Oops something went wrong.....");
			}
			
			getAllPurchaseRequestMaster("all");
			
			$("#itemMasterModalForSO").modal('hide');
			
		}
	});

}




/************
* @author	: Dayanand Khandekar
* @date		: 2-Jan-2019
* @codeFor	: editstockTransperMaster
 ************/
function editstockTransperMaster(stockId){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('stockId=' + stockId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/stocktransper/editstockTransperMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			
			 $("#stockId").val(r.stockId);	
			 $("#stockDate").val(r.stockDate);
			 $("#remarksto").val(r.stockRemark);
			 $("#mrnIdSO").val(r.mrnId);
			seteditStockTransperItemSlaveInfo(r);	
			
		}
	});
	
}

/************
* @author	: Dayanand Khandekar
* @date		: 2-Jan-2019
* @codeFor	: seteditStockTransperItemSlaveInfo
 ************/

function seteditStockTransperItemSlaveInfo(response){

	var length = 0;
	if(response.lststocktrasiteminfo.length != 0 && response.lststocktrasiteminfo !=null && response.lststocktrasiteminfo != ""){
		
		length = response.lststocktrasiteminfo.length;
		var htm = "";
		var id = 0;
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
			+ "<tr class='newAdded' id='mutitr'"
			+ id
			+ "'>"
			+ "<td class='col-md-2 center'><input type='checkbox' class='chkMrnItem'   value='"+id+"' "
			+ id
			+ " name='patientdocid'  checked='checked' isNew='false' id="+response.lststocktrasiteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-2 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value="+response.lststocktrasiteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtitemNameId" 
			+ id
			+ "' class='form-control input-SmallText'  value='"+response.lststocktrasiteminfo[i].itemName+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text'   class='form-control input-SmallText'     id='batchId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].batchName+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='expirayDate"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemExpirayDate+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtitemAvaialableQty" 
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemAvailableQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtitemtransperQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemTransperQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText' id='txtitemtransperreqQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemTransperreqQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtsubbInventoryId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].stockSubinventoryId+"'>"
			+ "</td>"
			
		
						
			+ "</tr>";
		}
		
		$("#stocktransperInfoTableBody").html(htm);
	}
}


/************
* @author	: Dayanand Khandekar
* @date		: 2-Jan-2019
* @codeFor	: reviewPurchaseRequestMasterForSTO
 ************/
function reviewPurchaseRequestMasterForSTO(mrnId){	
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('mrnId=' + mrnId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/stocktransper/reviewPurchaseRequestMasterForSTO",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			$("#subInvIdForStock").val(r.mrnSubinventoryId);
			$("#subInvName").val(r.mrnSubinventoryName);
			 $("#remarksto").val(r.mrnRemark);
			 $("#mrnIdSO").val(r.mrnId);
			setreviewItemSlaveInfoForSTO(r);	
			
		}
	});
	
}



/************
* @author	: Dayanand Khandekar
* @date		: 2-Jan-2019
* @codeFor	: setreviewItemSlaveInfoForSTO
 ************/

function setreviewItemSlaveInfoForSTO(response){

	var length = 0;
	if(response.lstMrniteminfo.length != 0 && response.lstMrniteminfo !=null && response.lstMrniteminfo != ""){
		
		length = response.lstMrniteminfo.length;
		var htm = "";
		var id = 0;
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
			+ "<tr class='newAdded' id='mutitr'"
			+ id
			+ "'>"
			+ "<td class='col-md-2 center'><input type='checkbox' class='chkMrnItem'   value='"+id+"' "
			+ id
			+ " name='patientdocid'  checked='checked' isNew='false' id="+response.lstMrniteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-2 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value="+response.lstMrniteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtitemNameIdd" 
			+ id
			+ "' class='form-control input-SmallText'  value='"+response.lstMrniteminfo[i].itemName+"'>"
			+ "</td>"
			
			/*+ "<td  class='col-md-2 center'><input type='text'   class='form-control input-SmallText'     id='batchId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].batchName+"'>"
			+ "</td>"*/
			
			+ "<td class='col-md-2 center'><Select id='batchId"+id+"'  class='form-control input-SmallText' onchange='getBatchIdInfo("+id+")'><option value='0'>-------select------</option></select> </td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='expirayDate"
			+ id
			+ "' class='form-control input-SmallText' value=''>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtitemAvaialableQty" 
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtitemtransperQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'>'"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' disabled='disabled' class='form-control input-SmallText' id='txtitemtransperreqQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemStoQty+"'> '"
			+ "</td>"
			
			+ "<div id='searchSubInventoryDivId'><td  class='col-md-2 center'><input type='text' disabled='disabled' class='form-control input-SmallText' onkeyup='setAutoSubInventoryName(this.id)' id='txtsubbInventoryName"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].subinventoryName+"'> '"
			+ "</td></div>"
			
			+ "<td  class='col-md-2 center' style='display:none'><input type='text' class='form-control input-SmallText' id='txtsubbInventoryId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].sunInventoryId+"'> '"
			+ "</td>"
					
			+ "<td  class='col-md-2 center' style='display:none'><input type='text' class='form-control input-SmallText' id='txtitemMasterId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemMasterId+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center' style='display:none'><input type='text' class='form-control input-SmallText' id='txtitemSlaveId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemInfoId+"'> '"//added for getting itemslave id
			+ "</td>"
			
			+ "</tr>";
		}
		
		$("#stocktransperInfoTableBody").html(htm);
		
		var htm="<option value='0'>--Select--</option>";
		
	    for ( var i = 0; i <= response.lstbatchcode.length; i++){
	    	var length= response.lstbatchcode.length;
	    	
	    	var id=i+1;
	    	 if(length >0){
	    	
	        htm = htm + "<option value='"+response.lstbatchcode[i].id+"'>"+response.lstbatchcode[i].itemBatchCode+"</option>";
	        $("#batchId" +id).html(htm);
			$("#batchId" +id).select2();
	    	 }else{
	    		 
	    		 $("#batchId" +id).val(0);
	 			$("#batchId" +id).select2();
	    	 }
	    }
	}

}
/************
* @author	: Dayanand Khandekar
* @date		: 3-Jan-2019
* @codeFor	: reviewPurchaseRequestMasterForPO
 ************/
function reviewPurchaseRequestMasterForPO(mrnId){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('mrnId=' + mrnId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/stocktransper/reviewPurchaseRequestMasterForPO",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			$("#subInvIdForPO").val(r.mrnSubinventoryId);
			$("#subInvNameForPO").val(r.mrnSubinventoryName);
			 $("#remarksto").val(r.mrnRemark);
			 $("#mrnIdSO").val(r.mrnId);
			 $("#mrnIdForPO").val(r.mrnId);
			setreviewItemSlaveInfoForPO(r);	
			
		}
	});
	
}

/************
* @author	: Dayanand Khandekar
* @date		: 3-Jan-2019
* @codeFor	: setreviewItemSlaveInfoForPO
 ************/
function setreviewItemSlaveInfoForPO(response){	

	var length = 0;
	if(response.lstMrniteminfo.length != 0 && response.lstMrniteminfo !=null && response.lstMrniteminfo != ""){
		
		length = response.lstMrniteminfo.length;
		var htm = "";
		var id = 0;
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
					+ "<tr class='newAdded' id='mutitr'"
			+ id
			+ "'>"
			+ "<td class='col-md-2 center'><input type='checkbox' class='chkMrnItem'   value='"+id+"' "
			+ id
			+ " name='patientdocid'  checked='checked' isNew='false' id="+response.lstMrniteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-2 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value="+response.lstMrniteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtitemNameId" 
			+ id
			+ "' class='form-control input-SmallText'  value='"+response.lstMrniteminfo[i].itemName+"'>"
			+ "</td>"
			
		
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtitemQty" 
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemactualQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtpurchaserequestQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemPoQty+"'>'"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtprocessedQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'>'"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><input type='checkbox' id='txtPurchaseType"+id+"' class='chkMrnPO' name='pocheck'> </td>"
			
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText' id='txtQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemAvailableQty+"'> '"
			+ "</td>"
			
			+ "<div id='partyMasterByName'><td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtsupplierId"
			+ id
			+ "' class='form-control input-SmallText' onkeyup='getAutoPartyMasterName(this.id)'  value='"+0+"'> </div>'"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtunitprice"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtdispercen"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtdisrs"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtdisamt"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtbaseamt"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txttaxcode"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txttaxamtperc"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txttaxamtrs"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txttotalamt"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtorderqty"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtpendingqty"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txttemperature"
			+ id
			+ "' class='form-control input-SmallText' value='"+0+"'> '"
			+ "</td>"
					
			+ "</tr>";
		}
		
		$("#purchaserequestPoInfoTableBody").html(htm);
	}

}
/************
* @author	: Dayanand Khandekar
* @date		: 3-Jan-2019
* @codeFor	: getAutoPartyMasterName
 ************/

function getAutoPartyMasterName(partyMasterId) {
	var resultData = [];
	var partyMasterName = $("input#" + partyMasterId).val();

	if (partyMasterName == "" || partyMasterName == null
			|| partyMasterName == "null" || partyMasterName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + partyMasterId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('name=' + partyMasterName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/invPartyMaster/partyMasterAutoSuggestion",
				cache : false,
				success : function(response) {
					var template = "";
					for ( var j = 0; j < response.partyMasterDto.length; j++) {
						var arrValue = response.partyMasterDto[j].id + "-"
								+ response.partyMasterDto[j].name;
						var idValue = response.partyMasterDto[j].id;
						var partyName = response.partyMasterDto[j].id + "-"+response.partyMasterDto[j].name;
						resultData.push({
							ID : idValue,
							Name : partyName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}

					setTimeout(
							function() {
								$("div#partyMasterByName .typeahead").html(
										template);
								$("div#partyMasterByName .typeahead").show();

								$("input#" + partyMasterId).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("input#" + partyMasterId).data('typeahead').source = resultData;
							}, 500);
				}
			});

	function displayResult(item) {
		var res = item.text.split('-');
		var partyId = res[0];
		var partyName = res[1];
		
		$("input#" + partyMasterId).val(partyName);
	}
}

/************
* @author	: Dayanand Khandekar
* @date		: 3-Jan-2019
* @codeFor	: disbledCheckBox (selected item transper for po or stock at a time not simetaniously)
 ************/
function disbledCheckBox(checkBoxId,id){
	var callFrom = $("#" + checkBoxId).attr('data-name');
	if(callFrom === "po"){
	var isChecked=$('#txtPO'+ id).is(':checked');
	
	if(isChecked === true)
	{
	document.getElementById("txtSto"+id).disabled = true;
	}
	else{
		document.getElementById("txtSto"+id).disabled = false;
		
	}
	}
	else if(callFrom === "sto"){
		var isChecked=$('#txtSto'+ id).is(':checked');
		
		if(isChecked === true)
		{
		document.getElementById("txtPO"+id).disabled = true;
		}
		else{
			document.getElementById("txtPO"+id).disabled = false;
			
		}	
		
	}
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Jan-2019
* @codeFor	: closePurchaseRequestPOModal
 ************/

function closePurchaseRequestPOModal(){
	
	
	 var tableHeaderRowCount = 1;
		var table = document.getElementById('purchaserequestPOInfoTable');
		var rowCount = table.rows.length;
		for (var i = tableHeaderRowCount; i < rowCount; i++) {
		    table.deleteRow(tableHeaderRowCount);
		}
	$("#itemMasterModalForPO").modal('hide');
	
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Jan-2019
* @codeFor	: closePurchaseRequestStOModal
 ************/

function closePurchaseRequestStOModal(){
	
	
	 var tableHeaderRowCount = 1;
		var table = document.getElementById('stocktransperInfoTable');
		var rowCount = table.rows.length;
		for (var i = tableHeaderRowCount; i < rowCount; i++) {
		    table.deleteRow(tableHeaderRowCount);
		}
	$("#itemMasterModalForPO").modal('hide');
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Jan-2019
* @codeFor	: closePurchaseRequestStOModal
 ************/
function reviewPurchaseRequestMasterForView(mrnId){
	reviewPurchaseRequestMasterDataForView(mrnId);
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Jan-2019
* @codeFor	: reviewPurchaseRequestMasterDataForView
 ************/
function reviewPurchaseRequestMasterDataForView(mrnId){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('mrnId=' + mrnId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchaserequest/reviewPurchaseRequestMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#mrnId").val(r.mrnId);
			$("#mrnNo").val(r.mrnId);
			$("#mrnDate").val(r.mrnDate);
			//$("#centerName").val(r.mrnCenterName);
			$("#remark").val(r.mrnRemark);
			$("#Note").val(r.mrnNote);
			 $("#hiddenSubInvId").val(r.mrnSubinventoryId);
			 $("#subInvNameId").val(r.mrnSubinventoryName);
		
			 document.getElementById('savePurchase').style.visibility = 'hidden';
			setEditPurchaseRequestItemSlaveInfoForView(r);	
			
		}
	});
	
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Jan-2019
* @codeFor	: setEditPurchaseRequestItemSlaveInfoForView
 ************/

function setEditPurchaseRequestItemSlaveInfoForView(response){

	var length = 0;
	if(response.lstMrniteminfo.length != 0 && response.lstMrniteminfo !=null && response.lstMrniteminfo != ""){
		
		length = response.lstMrniteminfo.length;
		var htm = "";
		var id = 0;
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
			+ "<tr class='newAdded' id='mutitr'"
			+ id
			+ "'>"
			+ "<td class='col-md-2 center'><input type='checkbox' class='chkMrnItem'   value='"+id+"' "
			+ id
			+ " name='patientdocid'  checked='checked' isNew='false' id="+response.lstMrniteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-2 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value="+response.lstMrniteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtitemNameId" 
			+ id
			+ "' class='form-control input-SmallText'  value='"+response.lstMrniteminfo[i].itemName+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text'   class='form-control input-SmallText'   onkeypress='return validateNumbers(event)'  id='txtitemQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemactualQty+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtitemreviwedQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemreviewedQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtpurchaserequestQty" 
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemPurchaseQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'   id='txtlastpoQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemlastpoQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText' id='txtlastpoNumber"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemlastpoNumber+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtlasrgrnNumber"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemlastgrnNumber+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtlastconsumentionMonth"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemlastConsumption+"'>"
			+ "</td>"
			
			/*+ "<td><input type='text' style='width: 80px;' id='txtUom"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstmrniteminfo[i].itemUom+"'>"
			+ "</td>"*/
			
			+ "<td class='col-md-2 center'><Select id='txtUom"+id+"'  class='form-control input-SmallText'><option value='0'>-------select------</option></select> </td>"
			
			
			/*+ "<td><input type='text' style='width: 80px;' id='txtStatus"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstmrniteminfo[i].itemStatus+"'>"
			+ "</td>"*/
			+ "<td class='col-md-2 center'><Select  id='txtStatus"+id+"' class='form-control input-SmallText'> <option value='0'>-------select------</option></select></td>"
			
			
			/*+ "<td class='col-md-2 center'><input type='checkbox'  id='txtPO"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstmrniteminfo[i].itemPoStatus+"'>"
			+ "</td>"*/
		if(response.lstMrniteminfo[i].itemPoStatus=="Y"){
			
					htm=htm	+ "<td class='col-md-2 center'><input type='checkbox' id='txtPO"+id+"'  checked='checked'  onclick='disbledCheckBox(this.id,"+id+")' data-name='po' class='chkMrnPO' name='pocheck'> </td>";
		}else{
				htm=htm		+ "<td class='col-md-2 center'><input type='checkbox' id='txtPO"+id+"'    onclick='disbledCheckBox(this.id,"+id+")' data-name='po' class='chkMrnPO' name='pocheck'> </td>";
			}
			
			htm=htm + "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText' id='txtPOQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemPoQty+"'>"
			+ "</td>";
			
			
			
		if(response.lstMrniteminfo[i].itemStoStatus=="Y"){
				htm=htm + "<td class='col-md-2 center'><input type='checkbox' id='txtSto"+id+"'checked='checked'   onclick='disbledCheckBox(this.id,"+id+")' data-name='sto' class='chkMrnSTO' name='stocheck'> </td>";
		}else{
				htm=htm + "<td class='col-md-2 center'><input type='checkbox' id='txtSto"+id+"'  onclick='disbledCheckBox(this.id,"+id+")' data-name='sto' class='chkMrnSTO' name='stocheck'> </td>";
			}
			
			htm=htm + "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtStoQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemStoQty+"'>"
			+ "</td>"
			
			/*+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'     onkeyup=setAutoSubInventoryName(this.id)  id='txtcenterName"
			+ id
			+ "' class='form-control input-SmallText'   value='"+response.lstMrniteminfo[i].itemCenterName+"'>"
			+ "</td>"*/
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtsubInventoryId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].subinventoryName+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtavailableQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemAvailableQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtcurrentlabstock"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].currentSubInventoryStock+"'>"
			+ "</td>"
			
				
			+ "</tr>";
		}
		
		$("#purchaserequestInfoTableBody").html(htm);
	}
}

/************
* @author	: Dayanand Khandekar
* @date		: 8-Jan-2019
* @codeFor	: calculateTotalQty check sto qty and po qty  is not  greater than item qty
 ************/
function calculateTotalQty(id){
	var result="";
	//var value=$("txtStoQty1").val();
	var itemQty = $('#txtitemQty'+id).val();
	var stoQty = $('#txtStoQty'+id).val();	
	var poQty=$("#txtPOQty"+id).val();
	
	var total=parseInt(stoQty)+parseInt(poQty);
	if(parseInt(total)<=parseInt(itemQty)){
		
		result=1;
	}else{
		
		result=0;
		
	}
	
	return result;
}

/************
* @author	: Dayanand Khandekar
* @date		: 8-Jan-2019
* @codeFor	: enableSubInvName
 ************/
function enableSubInvName(id){
	
	var isChecked=$('#txtSto'+ id).is(':checked');
	
	if(isChecked === true)
	{
	document.getElementById("txtsubInventoryId"+id).disabled = false;
	}else if(isChecked === false){
		
		 var x=document.getElementById("txtsubInventoryId"+id);
	      x.disabled=true;
		
	}
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 8-Jan-2019
* @codeFor	: calculateQtyForSto
 ************/
function calculateQtyForSto(id){
	var result="";
	//var value=$("txtStoQty1").val();
	var tQty = $('#txtitemtransperQty'+id).val();
	var aoQty = $('#txtitemAvaialableQty'+id).val();	
	var troQty=$("#txtitemtransperreqQty"+id).val();
	
	if(parseInt(tQty)<= parseInt(aoQty) && parseInt(tQty) <= parseInt(troQty)){
		
		
		result=1;
		
	}else{
		
		result=0;
		
	}
	
	
	return result;
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 9-Jan-2019
* @codeFor	: getBatchIdInfo
 ************/
function getBatchIdInfo(id){
	var batchId = $('#batchId'+id).val();
	
	getBatchIdInfoForSto(batchId,id);
	
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 19-Dec-2019
 * @codeFor : getBatchIdInfoForSto()
 ******************************************************************************/
function getBatchIdInfoForSto(batchId,id) {

	
	var inputs = [];
	
	inputs.push('batchId=' + batchId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/stocktransper/getBatchIdInfoForSto",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			 $('#expirayDate'+id).val(r.itemBatchExpDate);
			 $('#txtitemAvaialableQty'+id).val(r.itemQuantity);
			
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}

