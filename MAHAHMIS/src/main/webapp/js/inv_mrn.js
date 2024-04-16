/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Add new row temp for MRN
 ************/
function addNewRowInTableForMrn(tableId,callFrom){
	
	var tbody = "";
	var rows = $('#'+tableId+' tbody tr').length;
	
	if(callFrom == "MRNG"){
		
		tbody = getMrnTableBodyStringForMrn(rows+1);
	}
	
	$('#'+tableId).append(tbody);
}

/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Remove row temp for MRN
 ************/
function removeRowFromTableForMrn(tableId,checkboxClass){
	
	
	var docId = new Array();
	$("input[name='patientdocid']:checked").each(function() {	
		
		
		var itemInfoId=$("#itemInfoId"+$(this).val()).val();
		
		if(itemInfoId >0){
		docId.push($(this).attr('id'));
		}
	});
	if(docId.length>0){
		
		 var inputs = [];
			inputs.push('itemId=' + docId);
			
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "POST",
				url : "ehat/mrn/deleteMrnMasterItemInfoSlave",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
					alert(response);
					checkForMrn(tableId);
					checkCompForMrn(tableId);
					
					 
				}
			}); 
	   } 
	else{
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	checkForMrn(tableId);
	checkCompForMrn(tableId);
	}
}

/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: For reorder srno after delete
 ************/
function checkForMrn(tableId){
	
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
function checkCompForMrn(tableId){
	
	
	var trLength = $('#'+tableId).find("tr:first th").length;
	obj=$('#'+tableId+' tbody tr td').find('input,select,radio');
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
		
		$('.'+slaveChkClass).prop("checked",true);
	}else{
		
		$('.'+slaveChkClass).prop("checked",false);
	}
}


function getMrnTableBodyStringForMrn(id){
	
	//$("#txtUom" +id).select2();
	getUOMTempForMrn("txtUom"+id);
	var tbody = "<tr id='multiTr"+id+"' class='newAdded'>"
	+ "<td class='col-md-1 center'><input type='checkbox'  name='patientdocid' class='chkMrnItem' id='checkbox"+id+"' value='"+id+"'></td>"
	+ "<td class='col-md-1 center'><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value='0'></td>"
	+ "<td class='col-md-3 center'><div id='divtxtPurchaseQuotationItemName"+id+"'><input type='text' id='txtItemNameId"+id+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetailsForMrn(this.id)' data-name='generateMRN'> </div></td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtMrnQty"+id+"' class='form-control input-SmallText'> </td>"
	/*+ "<td class='col-md-1 center'><input type='text' id='txtUom"+id+"' onkeyup='inventoryUnitAutoSuggestion(this.id)' class='form-control input-SmallText'> </td>"*/
	+ "<td class='col-md-1 center'><select class='form-control' style='width:100px' id='txtUom"+id+"'><option value='0'>---Select---</option></select></td>"
	+ "<td class='col-md-2 center'><input type='text' id='currentSubInvStock"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center' style='display:none'><input type='text' id='itemMasterId"+id+"' class='form-control input-SmallText'> </td>"
	+ "</tr>";
	
	return tbody;
}
/************
* @author    : Dayanand Khandekar
* @date        : 25-oct-2019
* @codeFor    :getAllUnitMaster Detail
 ************/
function getUOMTempForMrn(selectId){
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
        	setUOMTempForMrn(r,selectId);            
        }
    });    
}

/**
 * 
 * @param r
 * @param selectId
 */
function setUOMTempForMrn(r,selectId){
    var htm="<option value='0'>--Select--</option>";
    for ( var i = 0; i < r.lstunitmaster.length; i++){    
        htm = htm + "<option value='"+r.lstunitmaster[i].uniId+"'>"+r.lstunitmaster[i].unitName+"</option>";
    }
    $("#"+selectId).html(htm);
    //$("#"+selectId).select2();
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-Dec-2019
 * @codeFor : saveMrnMasterDetail
 ******************************************************************************/
function saveMrnMasterDetail(){
	
	var mrnId = $("#mrnId").val();
	var subInvId = $("#hiddenSubInvId").val();
	var subInvNameId = $("#subInvNameId").val();
	var mrnDate = $("#mrnDate").val();
	var remark = $("#remark").val();
	
	if(subInvNameId==""||subInvNameId==null||subInvNameId=="null"){
		alert("Please Enter Sub Inventory Name");
		return false;
		
	}
	
	
	//var genralInfo = $("#PartyGeneralTableInfoList").html().length;
	  var   itemInfo =  $('#mrnItemInfoTable tbody tr.newAdded').length; 
	 
	  
	  if (itemInfo == "" || itemInfo == null || itemInfo == 0) { 
		  alert("Enter at least One Record In Item Info tab ");
		  return false; 
	  }
	// this is for item info
	var itemInfoDtoDetails = {
			lstMrniteminfo : []
	};
	
	
	
	
	var rows = $('#mrnItemInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		
		var userId =$("#userId").val();
		var unitId = $("#unitId").val();
		var itemInfoId = $("#itemInfoId" + i).val();		
		var itemName = $("#txtItemNameId" + i).val();		
		var itemQty = $("#txtMrnQty" + i).val();
		var itemMasterId = $("#itemMasterId" + i).val();
		
		var itemUom = $("#txtUom" + i).val();
		var currentSubInvStock = $("#currentSubInvStock" + i).val();
		
		setItemInfoList(itemInfoDtoDetails,parseInt(itemInfoId),
				itemName, parseInt(itemQty), parseInt(itemUom),parseInt(itemMasterId),subInvId,subInvNameId,currentSubInvStock,userId,unitId);
	}

	itemInfoDtoDetails = JSON
			.stringify(itemInfoDtoDetails);
	
	
	
	var inputs = [];
	inputs.push("mrnId=" + mrnId);
	inputs.push("mrnDate=" + mrnDate);
	
	inputs.push("mrnSubinventoryId=" + subInvId);
	inputs.push("mrnSubinventoryName=" + subInvNameId);
	inputs.push("mrnRemark=" + remark);
	
	
	
	
	// this is for item info
	inputs.push("itemInfoDtoDetails="+ encodeURIComponent(itemInfoDtoDetails));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/mrn/saveMrnMasterDetail",
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
			
			getAllMrnMaster();
			refershMrnMaster();
			$("#MrnModal").modal('hide');
			
		}
	});

}


function setItemInfoList(itemInfoDtoDetails,itemInfoId,
		itemName, itemQty,itemUom ,itemMasterId,subInvId,subInvNameId,currentSubInvStock,userId,unitId){
	 
	itemInfoDtoDetails.lstMrniteminfo.push({
		
		itemInfoId:itemInfoId,
		itemName:itemName,
		mrnQuantity:itemQty,
		itemUom:itemUom,
		itemMasterId:itemMasterId,
		sunInventoryId:subInvId,
		subinventoryName:subInvNameId,
		currentSubInventoryStock:currentSubInvStock,
		unitId:unitId,

		createdBy:userId,


});
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-Dec-2019
 * @codeFor : getAllMrnMaster()
 ******************************************************************************/
function getAllMrnMaster() {
	
	
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/mrn/getAllMrnMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			
			setMrnMasterTemplate(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-Dec-2019
 * @codeFor : setMrnMasterTemplate()
 ******************************************************************************/

function setMrnMasterTemplate(response) {
	
	
	var htm = "";
	var index = 1;
			
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
							+ response.lstmrnmaster[i].createdBy
							+ '</td>'
							
							if(response.lstmrnmaster[i].mrnApproveStatus=='Y' ||response.lstmrnmaster[i].mrnpurchaseRequestStatus=='Y' ){
							
					htm=htm	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" disabled="disabled" data-toggle="modal" data-target="#MrnModal" onclick=editMrnMaster('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
							
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger deleteUserAccess disabled" disabled="disabled"  onclick=deleteMrnMaster('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							
							+ ' <td class="col-md-1 center">'
							+ '	<button class="glyphicon glyphicon-trash" data-toggle="modal"  disabled="disabled" onclick=approveMrnPurchaseRequest('
							+ response.lstmrnmaster[i].mrnId
							+ ')><i class="fa fa-edit"></i></button></td>'
							
							}else{
								htm=htm	+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#MrnModal" onclick=editMrnMaster('
								+ response.lstmrnmaster[i].mrnId
								+ ')><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteMrnMaster('
								+ response.lstmrnmaster[i].mrnId
								+ ')><i class="fa fa-trash-o"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="glyphicon glyphicon-trash" data-toggle="modal" onclick=approveMrnPurchaseRequest('
								+ response.lstmrnmaster[i].mrnId
								+ ')><i class="fa fa-edit"></i></button></td>'
								
								
							}
							+ '</tr>';
					index++;
					
				
				
			} 
				$("#mrnMasterInfoList").html(htm);
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-Dec-2019
 * @codeFor : editMrnMaster()
 ******************************************************************************/
function editMrnMaster(mrnId){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('mrnId=' + mrnId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/mrn/editMrnMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#mrnId").val(r.mrnId);
			$("#mrnDate").val(r.mrnDate);
			$("#hiddenSubInvId").val(r.mrnSubinventoryId);
			$("#subInvNameId").val(r.mrnSubinventoryName);
			$("#remark").val(r.mrnRemark);
			setEditMrnMasterSlaveInfo(r);
				
			
		}
	});
	
	
}


function setEditMrnMasterSlaveInfo(response){

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
			+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem'   value='"+id+"' "
			+ id
			+ "  checked='checked'    name='patientdocid' id="+response.lstMrniteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-1 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value="+response.lstMrniteminfo[i].itemInfoId+"></td>"
			
			+ "<td class='col-md-3 center'><input type='text'  id='txtItemNameId" 
			+ id
			+ "' class='form-control input-SmallText'  value='"+response.lstMrniteminfo[i].itemName+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><input type='text'     id='txtMrnQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].mrnQuantity+"'>"
			+ "</td>"
			+ "<td class='col-md-1 center'><select style='width:100px'  id='txtUom"+id+ "' class='form-control input-SmallText''>"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><input type='text'     id='currentSubInvStock"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].currentSubInventoryStock+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center' style='display:none'><input type='text'     id='itemMasterId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstMrniteminfo[i].itemMasterId+"'>"
			+ "</td>"
					
			+ "</tr>";
		}
		
		$("#mrnItemInfoTableBody").html(htm);
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
	}
}





/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-Dec-2019
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
				
				var arrValue =r.lstSubInventoryMaster[j].subInventoryName ;
				var id = r.lstSubInventoryMaster[j].id;
				$("#hiddenSubInvId").val(id);
				var subInventoryName = r.lstSubInventoryMaster[j].subInventoryName;
				
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
		var res = item.text.split('-');
		var subInventoryId = res[0];
		var subInventoryName = res[1];
		
		$("#" + inputID).val(subInventoryName);		
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-Dec-2019
 * @codeFor : refershMrnMaster()
 ******************************************************************************/
function  refershMrnMaster(){
	$("#mrnId").val(0);
	 $("#hiddenSubInvId").val(0);
	$("#subInvNameId").val("");
	 $("#mrnDate").val("");
	 $("#remark").val("");
	 
	 var tableHeaderRowCount = 1;
		var table = document.getElementById('mrnItemInfoTable');
		var rowCount = table.rows.length;
		for (var i = tableHeaderRowCount; i < rowCount; i++) {
		    table.deleteRow(tableHeaderRowCount);
		}
	 $("#MrnModal").modal('hide');
	
}

/************
* @author	: Dayanand Khandekar
* @date		: 25-Dec-2019
* @codeFor	: deleteMrnMaster
 ************/

	function  deleteMrnMaster(mrnId){
	
		var r = confirm("Are You Sure You Want To Delete Mrn Master Detail");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/mrn/deleteMrnMaster",
				data : {
					"mrnId" : mrnId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					
					getAllMrnMaster();
				}
			});
		}
	}
	/************
	* @author	: Dayanand Khandekar
	* @date		: 25-Dec-2019
	* @codeFor	: approveMrnPurchaseRequest
	 ************/
	function approveMrnPurchaseRequest(mrnId){
		
		var r = confirm("Are You Approve Purchase Request Detail");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/mrn/approveMrnPurchaseRequest",
				data : {
					"mrnId" : mrnId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.success(response);
					
					getAllMrnMaster();
				}
			});
		}
		
	}
	
	/********************************************************************************
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment created this js to get the next item master id
	*******************************************************************************/
	function getNextItemMasterIdNew() {
		var inputs = [];
		inputs.push('action=getItemMasterNextId');
		inputs.push('tableName=inv_mrn_master_new');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/inventoryItemMaster/getNextItemMasterIdNew",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
				$("#nextItemId").text(r);
			}
		});
	}
	
	function getItemMasterSlaveDetailsModalForMRN(itemMasterId,subInvId)
	{
		
		
		getItemMasterSlaveDetailsOnMRNById(itemMasterId,subInvId);
		$('#generateMRNModalForMrn').modal('show');
		
	}
	
	/*******************************************************************************
	 * @author : Dayanand Khandekar
	 * @date : 7-jan-2020
	 * @codeFor : getItemMasterSlaveDetailsOnMRNById()
	 ******************************************************************************/
	function getItemMasterSlaveDetailsOnMRNById(itemMasterId,subInvId) {
		
		
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
				
				for ( var i = 0; i < r.itemPurchaseSlaveDto.length; i++) {
					if(i == 0){
						
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
										+ "</tr>");
						
					}
					if(r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 == null){
					$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);	
					
					$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
					$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
					$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
					$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
					$("#itemNameId" + i).val(r.itemName);
					$("#cgstRateId" + i).val(r.cgst);
					$("#sgstRateId" + i).val(r.sgst);
					$("#taxNameId" + i).val(r.taxName);
					$("#taxRateId" + i).val(r.taxRate);
					}
					else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 == null && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == null){
						$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);
						$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
						$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
						$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
						$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
						$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
						$("#purchaseFactorUomTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom2);
						$("#itemNameId" + i).val(r.itemName);
						$("#cgstRateId" + i).val(r.cgst);
						$("#sgstRateId" + i).val(r.sgst);
						$("#taxNameId" + i).val(r.taxName);
						$("#taxRateId" + i).val(r.taxRate);
					}
					else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == null){
						$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);
						$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
						$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
						$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
						$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
						$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
						$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
						$("#purchaseFactorUomTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom2);
						$("#purchaseFactorUomThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom3);
						$("#itemNameId" + i).val(r.itemName);
						$("#cgstRateId" + i).val(r.cgst);
						$("#sgstRateId" + i).val(r.sgst);
						$("#taxNameId" + i).val(r.taxName);
						$("#taxRateId" + i).val(r.taxRate);
					}
					else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor4 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != null){
						$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);
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
		});
	}
	
	
	/*******************************************************************************
	 * @author : Dayanand Khandekar
	 * @date : 7-jan-2020
	 * @codeFor : setModalInfoToGenerateMRNItemSalve()
	 ******************************************************************************/
	function setModalInfoToGenerateMRNItemSalve()
	{
		var table = document.getElementById("mrnItemInfoTable");
		var itemSlaveRowCount = table.rows.length;
		var newItemSlaveRowCount = itemSlaveRowCount - 1;
		var totalRow=0;
		$('#itemMasterSlaveRecordListOnMRNGenerate input[type=radio]').each(function()
		{
			totalRow++;
		});
		var totalCheckboxes = $('input[name=row]:checked').val();
	
	
		setTableValuesToGenerateMRNItemSlave(totalCheckboxes,totalRow,newItemSlaveRowCount);
		
	}

	/*******************************************************************************
	 * @author : Dayanand Khandekar
	 * @date : 7-jan-2020
	 * @codeFor : setTableValuesToGenerateMRNItemSlave()
	 ******************************************************************************/
	function setTableValuesToGenerateMRNItemSlave(totalCheckboxes, totalRow,radioButtonIndex) {
		if(totalRow >= 0)
		{
					var unit1 = $('#purchaseFactorUomOneId'+totalCheckboxes).val();
					var unit2 = $('#purchaseFactorUomTwoId'+totalCheckboxes).val();
					var unit3 = $('#purchaseFactorUomThreeId'+totalCheckboxes).val();
					var unit4 = $('#purchaseFactorUomFourId'+totalCheckboxes).val();
					
					if(unit1 != 0 && unit2 == 0){
						//$('#txtUom' + radioButtonIndex).select2('val',$('#purchaseFactorUomOneId'+totalCheckboxes).val());
						$('#txtUom' + radioButtonIndex).val($('#purchaseFactorUomOneId'+totalCheckboxes).val());

						$('#currentSubInvStock' + radioButtonIndex).val($('#currentSubInventoryStockId'+totalCheckboxes).val());
						$('#itemMasterId' + radioButtonIndex).val($('#itemId' + totalCheckboxes).val());
					}
					else if(unit2 != 0 && unit1 != 0 && unit3 == 0 && unit4 == 0){
						//$('#txtUom' + radioButtonIndex).select2('val',$('#purchaseFactorUomTwoId'+totalCheckboxes).val());
						$('#txtUom' + radioButtonIndex).val($('#purchaseFactorUomOneId'+totalCheckboxes).val());

						$('#currentSubInvStock' + radioButtonIndex).val($('#currentSubInventoryStockId'+totalCheckboxes).val());
						$('#itemMasterId' + radioButtonIndex).val($('#itemId' + totalCheckboxes).val());
					}
					else if(unit3 != 0 && unit2 != 0 && unit1 != 0 && unit4 == 0){
						//$('#txtUom' + radioButtonIndex).select2('val',$('#purchaseFactorUomThreeId'+totalCheckboxes).val());
						$('#txtUom' + radioButtonIndex).val($('#purchaseFactorUomOneId'+totalCheckboxes).val());

						$('#currentSubInvStock' + radioButtonIndex).val($('#currentSubInventoryStockId'+totalCheckboxes).val());
						$('#itemMasterId' + radioButtonIndex).val($('#itemId' + totalCheckboxes).val());
					}
					else if(unit4 != 0 && unit3 != 0 && unit2 != 0 && unit1 != 0){
						//$('#txtUom' + radioButtonIndex).select2('val',$('#purchaseFactorUomFourId'+totalCheckboxes).val());
						$('#txtUom' + radioButtonIndex).val($('#purchaseFactorUomOneId'+totalCheckboxes).val());

						$('#currentSubInvStock' + radioButtonIndex).val($('#currentSubInventoryStockId'+totalCheckboxes).val());
						$('#itemMasterId' + radioButtonIndex).val($('#itemId' + totalCheckboxes).val());
					}

				}
	}
	
	function closeItemMasterPopUpModal(){
		$("#generateMRNModalForMrn").modal('hide');
	}
	
	
	
	/*******************************************************************************
	 * @author : Dayanand Khandekar
	 * @date : 15-jan-2020
	 * @codeFor : fetchItemMasterDetailsForMrn()
	 ******************************************************************************/
	function fetchItemMasterDetailsForMrn(inputID) {
		
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
		inputs.push('itemName=' + findingName);
		var availableTags = [];
		var str = inputs.join('&');
		var template = "";
		jQuery
				.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/inventoryItemMaster/autoFillSearchItemMaster",
					cache : false,
					success : function(r) {
						
						 if(categoryName=="generateMRN"||categoryName=="purchasequotation"){
							template = "";
							
							for ( var j = 0; j < r.lstItemMaster.length; j++) {
								availableTags.push(r.lstItemMaster[j].id + "-"
										+ r.lstItemMaster[j].itemName);
								for ( var j = 0; j < availableTags.length; j++) {
									var arrValue = (availableTags[j]).split("-");
									var idValue = arrValue[0];
									
									resultData.push({
										ID : idValue,
										Name : arrValue[1]
									});
									template = template + '<li id="myNewLi" data-toggle="modal" data-target="#myModal" data-value= "'
									+ arrValue[0]
									+ '" class=""><a href="#">'
									+ arrValue[1] + '</a></li>';
									
		
							}
						}
						}
						
						if(categoryName == "purchaseOrderModule" || categoryName == "purchasequotation" 
							|| categoryName == "purchaseExpenseModule" || categoryName == "generateMRNRequest" ||categoryName=="generateMRN"||categoryName=="purchasequotation" ){
							

							setTimeout(
									function() {
										//alert("purchaseOrderModule"+template);
										$("#divtxtPurchaseQuotationItemName .typeahead")
												.html(template);
										$("#divtxtPurchaseQuotationItemName .typeahead")
												.show();
										$("input#" + inputID).typeahead({
											source : resultData,
											displayField : 'Name',
											valueField : 'ID',
											onSelect : displayItemMasterSearchResult,
											scrollBar : true
										});
										$("input#" + inputID).data('typeahead').source = resultData;
									}, 500);
							
						}
						
						
						
					}
				
				});
		// below function to set the search value to search text feild and calling
		// getPackingDetailsById function
		function displayItemMasterSearchResult(item) {
			var res = item.text.split('-');
			var itemMasterId = res[0];
			var itemName = res[1];
		    var masterId = item.value;
			 if(categoryName == "generateMRN"){
				
				var subInvId = document.getElementById("hiddenSubInvId").value;
				getItemMasterSlaveDetailsModalForMRN(masterId,subInvId);
			}else if(categoryName == "purchasequotation"){
				
				//var subInvId = document.getElementById("hiddenSubInvId").value;
				
				getItemMasterSlaveDetailsModalForPurchaseQuotation(masterId,0);
			}
			else
			{
				getItemMasterSlaveDetailsModal(masterId);
			}
			$("#" + inputID).val(itemName);
		}
	}