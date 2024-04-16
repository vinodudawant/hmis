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
	}
if(callFrom == "purchasequotation"){
		
		tbody = getPurchaseQuotationItemInfoBody(rows+1);
	}

if(callFrom == "purchaserequest"){
	
	
	tbody = getPurchaseRequestItemInfoBody(rows+1);
}

if(callFrom == "po"){
	
	
	tbody = getPurchaseRequestItemInfoBodyForPO(rows+1);
}

if(callFrom == "so"){
	
	
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
		
		$('.'+slaveChkClass).prop("checked",true);
	}else{
		
		$('.'+slaveChkClass).prop("checked",false);
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
	+ "<td class='col-md-2 center'><input type='text' id='txtitemNameId"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' disabled='disabled' id='txtitemIssueQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='batchName"+id+"'  class='form-control input-SmallText'></td>"
	+ "<td class='col-md-2 center'><input type='text' id='expirayDate"+id+"' class='form-control input-SmallText'> </td>"	
	+ "<td class='col-md-2 center'><input type='text'disabled='disabled' id='txtitemRemainQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center'><input type='text' id='txtitemreceiveQty"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center' style='display:none'><input type='text' id='txtsubbInventoryId"+id+"' class='form-control input-SmallText'> </td>"
	+ "<td class='col-md-2 center' style='display:none'><input type='text' disabled='disabled' id='batchId"+id+"' class='form-control input-SmallText'> </td>"

	
	+ "</tr>";
	
	return tbody;
}


function getStockTransperDetailsByStockId(){
	var stockId= $("#stockId").val();
	
	editstockTransperMaster(stockId);
	
	
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
			 $("#stoSubInvId").val(r.stockSubinventoryId);	
			 $("#stockSubInvName").val(r.stockSubinventoryName);
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
			
			+ "<td class='col-md-2 center'><input type='text' disabled='disbled' class='form-control input-SmallText'  id='txtitemIssueQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemIssueQty+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text'   class='form-control input-SmallText'     id='batchName"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].batchName+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='expirayDate"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemExpirayDate+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><input type='text' disabled='disbled' class='form-control input-SmallText'  id='txtitemRemainQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemRemainQty+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><input type='text' class='form-control input-SmallText'  id='txtitemreceiveQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemReceiveQty+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center' style='display:none'><input type='text' class='form-control input-SmallText'  id='batchId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemBatchId+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center' style='display:none'><input type='text' class='form-control input-SmallText'  id='itemMasterId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemMasterId+"'>"
			+ "</td>"
			
			
			
			+ ' <td class="col-md-2 center">'
			+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal"  onclick=acceptStockTransperItemMaster('
			+ response.lststocktrasiteminfo[i].itemInfoId+","+id
			+ ')><i class="fa fa-edit"></i></button></td>'
						
			+ "</tr>";
		}
		
		$("#stocktransperInfoTableBody").html(htm);
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 10-Jan-2019
* @codeFor	: acceptStockTransperItemMaster
 ************/
function acceptStockTransperItemMaster(itemInfoId,id){
	
	var remainQty=$("#txtitemRemainQty"+id).val();
	var receiveQty=$("#txtitemreceiveQty"+id).val();
   var stockId= $("#stockId").val();	
	
	var subInvId= $("#stoSubInvId").val();
	
	
	if(parseInt(receiveQty) <= parseInt(remainQty)){
		
		
		var inputs = [];
		inputs.push('itemInfoId=' + itemInfoId);
		inputs.push('receiveQty=' + receiveQty);
		inputs.push('subInvId=' + subInvId);
		inputs.push('stockId=' + stockId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/stocktransper/acceptStockTransperItemMaster",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(r==1){
					alert("Item Received Successfuly");
				}else if(r==0){
					alert("Network Issue");
				}
				
				$("#itemMasterModalForSO").modal("hide");
				
				
			}
		});
		
	}else{
		alert("Receive  Qty Should Not Be Greater Than Remain Qty ");
	}
	
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 10-jan-2020
 * @codeFor : setAutoSubInventoryName()
 ******************************************************************************/
 
function setAutoSubInventoryName(inputID) {
	
		var resultData = [];
	var findingName = $("input#" + inputID).val();
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		alert("Please enter search value");
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
				
				$("#subInvIdForStockId").val(id);
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
		getAllStockIdBySubInventoryName(subInventoryId);
		$("#" + inputID).val(subInventoryName);		
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 10-jan-2020
 * @codeFor : getAllStockIdBySubInventoryName()
 ******************************************************************************/
function getAllStockIdBySubInventoryName(){
	var subInvId=$("#subInvIdForStockId").val();
	
	getAllStockId(subInvId);
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 2-Jan-2020
* @codeFor	: get All Stock Id Detail
 ************/
function  getAllStockId(subInvId){
	var inputs = [];	
	inputs.push('subInvId=' + subInvId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/stocktransper/getAllStockId",
		error : function() {
			alert('error');
		},
		success : function(r) {					
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
	            for ( var i = 0; i < r.lststocktranspermaster.length; i++){             
		                divContent = divContent + "<option value='" + r.lststocktranspermaster[i].stockId + "'  >"
		                        +"Receive From-"+ r.lststocktranspermaster[i].receiveSubInvName + "</option>";
	            }
            divContent = divContent + "</select>";
            $("#stockId").html(divContent);
            $("#stockId").select2();
		}		
	});
}



/************
* @author	: Dayanand Khandekar
* @date		: 13-Jan-2020
* @codeFor	:getAllStockMasterForView
 ************/
function  getAllStockMasterForView(){
	var inputs = [];	
	var unitId = $("#unitId").val();
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/stocktransper/getAllStockMasterForView",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			
			setviewStockTransperMasterInfo(r);
		}		
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 13-Jan-2010
* @codeFor	: setviewStockTransperMasterInfo
 ************/

function setviewStockTransperMasterInfo(r){
	

	
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lststocktranspermaster.length; i++) {
		 var datetime = new Date(r.lststocktranspermaster[i].createdDate).toLocaleString();
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.lststocktranspermaster[i].stockId+'</td>'
				+ ' <td class="col-md-1 center">'+r.lststocktranspermaster[i].stockSubinventoryName+'</td>'
				+ ' <td class="col-md-1 center">'+datetime+'</td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#stoMasterModalForView" onclick=viewstockTransperMaster('+r.lststocktranspermaster[i].stockId+')><i class="fa fa-edit"></i></button></td>'
				
				+ '</tr>';
				index++;
	}
	$("#soprocessingInfoListForView").html(htm);
}


/************
* @author	: Dayanand Khandekar
* @date		: 2-Jan-2019
* @codeFor	: viewstockTransperMaster
 ************/
function viewstockTransperMaster(stockId){
	
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
						
			 $("#sIdForView").val(r.stockId);	
			 $("#stockDateForView").val(r.stockDate);
			
			setviewStockTransperItemSlaveInfo(r);	
			
		}
	});
	
}


/************
* @author	: Dayanand Khandekar
* @date		: 13-Jan-2020
* @codeFor	: setviewStockTransperItemSlaveInfo
 ************/

function setviewStockTransperItemSlaveInfo(response){
	

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
			
			+ "<td class='col-md-2 center'><input type='text' disabled='disabled' class='form-control input-SmallText'  id='txtitemNameId" 
			+ id
			+ "' class='form-control input-SmallText'  value='"+response.lststocktrasiteminfo[i].itemName+"'>"
			+ "</td>"
			
			+ "<td class='col-md-2 center'><input type='text' disabled='disbled' class='form-control input-SmallText'  id='txtitemIssueQtyForView"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemreceiveQtyForView+"'>"
			+ "</td>"
			
			+ "<td  class='col-md-2 center'><input type='text'  disabled='disabled' class='form-control input-SmallText'     id='txtPendingQty"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lststocktrasiteminfo[i].itemPendingQtyForView+"'>"
			+ "</td>"
			
			
						
			+ "</tr>";
		}
		
		$("#stocktransperInfoTableBodyForView").html(htm);
	}
}