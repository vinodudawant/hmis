/**
 * @since 21-03-2020
 * @author Rohit Sandbhor
 * @comment This JS function is created for to get pagination on sub inventory master 
 * @param pageNumber
 */
function paginationSubInvMaster(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/getSubInventoryMasterPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setSubInventoryMasterPagination(r);
 		},
	});	
}

/**
 * @since 21-03-2020
 * @author Rohit Sandbhor
 * @comment This JS function is created for to set sub inventory master pagination
 * @param r
 */
function setSubInventoryMasterPagination(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstSubInventoryMaster.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstSubInventoryMaster[i].subInventoryName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstSubInventoryMaster[i].contactNumber
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editSubInventoryMaster('
				+ r.lstSubInventoryMaster[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteSubInventoryMaster('
				+ r.lstSubInventoryMaster[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;
	}
	$("#subInventoryRecordsList").html(htm);
}

/**
 * @since 21-03-2020
 * @comment This JS function is created for to get next pagination suv inventory master list
 * @author Rohit Sandbhor
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationSubInvMaster(currentIndex, numberOfPages){
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationSubInvMaster("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationSubInvMaster("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationSubInvMaster("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
		$('#sunInventoryMasterRecordPagination').html(numberOfRows);
}
/**
 * @since 21-03-2020
 * @comment This JS function is created for to get previous pagination sub inv master list 
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationSubInvMaster(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationSubInvMaster("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationSubInvMaster("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationSubInvMaster("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
		$('#sunInventoryMasterRecordPagination').html(numberOfRows);
}

/*******************************************************************************************************************************************/

/**
 * @since 21-04-2020
 * @author Rohit Sandbhor
 * @comment This JS function is created for to get pagination on opening stock 
 * @param pageNumber
 */
function paginationOpeningStock(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryOpeningStock/getOpeningStockPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setOpeningStockPagination(r);
 		},
	});	
}

/**
 * @since 21-04-2020
 * @author Rohit Sandbhor
 * @comment This JS function is created for to set opening stock pagination
 * @param r
 */
function setOpeningStockPagination(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.openingStockDtos.length; i++) {
		var datee = getDate(r.openingStockDtos[i].createdDateTime);
		
			var itemExpDate = getDateWithoutTime(r.openingStockDtos[i].batchExpDate);
			if(itemExpDate == "1970-01-01"){
				itemExpDate ="NA";	
			}
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ datee
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.openingStockDtos[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.openingStockDtos[i].itemName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.openingStockDtos[i].batchNumber
					+ '</td>' 
					+ ' <td class="col-md-1 center">'
					+ itemExpDate
					+ '</td>' 
					+' <td class="col-md-1 center">'
					+ r.openingStockDtos[i].itemQuantity + '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.openingStockDtos[i].userName + '</td>' + '</tr>';
			index++;
	}
	$("#openingStockTableBodyId").html(htm);
}

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination opening stock list
 * @author Rohit Sandbhor
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationOpeningStock(currentIndex, numberOfPages){
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationOpeningStock("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationOpeningStock("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationOpeningStock("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
		$('#openingStockRecordPagination').html(numberOfRows);
}
/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination opening stock list 
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationOpeningStock(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationOpeningStock("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationOpeningStock("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationOpeningStock("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
		$('#openingStockRecordPagination').html(numberOfRows);
}
 
 


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination party master master list
 * @author Dayanand Khandekar
 * @param currentIndex
 * @param numberOfPages
 */

function paginationPartyMasterMaster(pageNumber){
	
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/getPartyMasterPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        partyMasterTemplateForPagination(r,pageNumber);
	       // setSubInventoryMasterPagination(r);
 		},
	});	
}



/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination party master list
 * @author Dayanand Khandekar
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationPartyMaster(currentIndex, numberOfPages){
	
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationPartyMaster("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationPartyMasterMaster("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationPartyMaster("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
		$('#partyMasterRecordPagination').html(numberOfRows);
}

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination party master list 
 * @author Dayanand Khandekar
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationPartyMaster(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationPartyMaster("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationPartyMasterMaster("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationPartyMaster("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
		$('#partyMasterRecordPagination').html(numberOfRows);
}



function partyMasterTemplateForPagination(response,pageNumber) {
	var htm = "";
	var index = 1;
	var countAuto = (pageNumber - 1) + '1';
	countAuto = Number(countAuto);
		for ( var i = 0; i < response.partyMasterDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ countAuto
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.partyMasterDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.partyMasterDto[i].name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.partyMasterDto[i].group
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.partyMasterDto[i].type
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#itemMasterModal" onclick=editPartyMaster('
					+ response.partyMasterDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deletePartyMaster('
					+ response.partyMasterDto[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			countAuto++;
			
			
			
		}
	
	$("#partyMasterList").html(htm);
}


/**
 * @since 22-04-2020
 * @comment This JS function is created for to get next pagination Item master list
 * @author Dayanand Khandekar
 * @param currentIndex
 * @param numberOfPages
 */

function paginationItemMasterMaster(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryItemMaster/getItemMasterPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setItemMasterDataToTableForPagination(r,pageNumber);
 		},
	});	
}

function setItemMasterDataToTableForPagination(r,pageNumber) {
	var htm = "";
	var index = 1;
	var countAuto = (pageNumber - 1) + '1';
	countAuto = Number(countAuto);
	for ( var i = 0; i < r.lstItemMaster.length; i++) {
		var createdDateTime = getDateTime(r.lstItemMaster[i].createdDateTime);
		
		if(createdDateTime == null || createdDateTime == "1970-01-01 5:30:00" || createdDateTime == ""){
			createdDateTime = getNullDate(createdDateTime);
		}
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ countAuto
				+ '</td>'
				 + ' <td class="col-md-1 center">'+createdDateTime+'</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstItemMaster[i].itemName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstItemMaster[i].categoryType
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstItemMaster[i].leadTime
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstItemMaster[i].priority
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#itemMasterModal"  onclick=editItemMaster('
				+ r.lstItemMaster[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteItemMaster('
				+ r.lstItemMaster[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		countAuto++;
		
		
		
	}
	$("#itemMasterRecordsList").html(htm);
};


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination item master list
 * @author Dayanand Khandekar
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationItemMaster(currentIndex, numberOfPages){
	
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationItemMaster("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationItemMasterMaster("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationItemMaster("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
		$('#itemMasterRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination item master list 
 * @author Dayanand Khandekar
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationItemMaster(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationItemMaster("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationItemMasterMaster("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationItemMaster("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
		$('#itemMasterRecordPagination').html(numberOfRows);
}

// this is for Grn By Vishnu

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function paginationGRNMaster(pageNumber){
	var call = $('#callFrom').val();
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
    inputs.push('call=' + call);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/invGoodReceiptNote/getGrnMasterPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setGrnMasterDataToTableForPagination(r,call);
 		},
	});	
}

function setGrnMasterDataToTableForPagination(r,call) {
	var htm = "";
	var index = 1;
	if(call=="DRAFT"){
		$("#goodRecepitPrint").hide();
	}else{
		$("#goodRecepitEdit").hide();
	}
	for ( var i = 0; i < r.lstGoodReceiptNoteDto.length; i++) {
		htm = htm +
		'<tr> ' +
		' <td class="col-md-1 center">' +
		index +
		'</td>' +
		' <td class="col-md-1 center">' +
		r.lstGoodReceiptNoteDto[i].id +
		'</td>' +
		
		' <td class="col-md-1 center">' +
		r.lstGoodReceiptNoteDto[i].grnSupplierName +
		'</td>' +
		' <td class="col-md-1 center">' +
		r.lstGoodReceiptNoteDto[i].grnDate +
		'</td>';
		if(call != "all"){
			htm = htm +	' <td class="col-md-1 center">' +
			'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=editGoodReceiptNote(' +
			r.lstGoodReceiptNoteDto[i].id +
			',\'nodraft\')><i class="fa fa fa-edit"></i></button></td>';
		}
		htm = htm +	' <td class="col-md-1 center">' +
		'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
		r.lstGoodReceiptNoteDto[i].id +
		',\'nodraft\')><i class="fa fa-eye View"></i></button></td>';
		if(call != "DRAFT"){
			htm = htm +	' <td class="col-md-1 center">' +
			'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=printGoodsReceiptNote(' +
			r.lstGoodReceiptNoteDto[i].id +
			',\'nodraft\')><i class="fa fa-print"></i></button></td>';
		}
		htm = htm + '</tr>';
		index++;
		
	}
	$("#goodReceiptNoteList").html(htm);
};


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationGrnMaster(currentIndex, numberOfPages){
	
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationGrnMaster("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationGRNMaster("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationGrnMaster("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#grnRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationGrnMaster(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationGrnMaster("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationGRNMaster("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationGrnMaster("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#grnRecordPagination').html(numberOfRows);
}


//this is for Stock Audit By Vishnu

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination Stock Audit master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function paginationStockAuditMaster(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/stock/getStockAuditPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setStockAuditDataToTableForPagination(r);
 		},
	});	
}

function setStockAuditDataToTableForPagination(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstBatchStockDto.length; i++) {
		var expDate = getDate(r.lstBatchStockDto[i].itemBatchExpDate);
		if(expDate == "1970-01-01"){
			expDate="NA";	
		}
		htm = htm + '<tr> ' + ' <td class="col-md-1 center">' + index + '</td>'
		+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemMasterId + '</td>'
		+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemName + '</td>'
		+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemBatchCode + '</td>'
		+ ' <td class="col-md-1 center" style="display:none">' + r.lstBatchStockDto[i].reorderStock + '</td>'
	
		
		+ ' <td class="col-md-1 center">' + expDate
		+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemQuantity + '</td>'
		/*+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].totalCurrentInvStock + '</td>'*/
		+ '</td>' + '</tr>';
		index++;
	}
	$("#stockAuditItem").html(htm);
};


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationStockAuditMaster(currentIndex, numberOfPages){
	
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationStockAuditMaster("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationStockAuditMaster("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationStockAuditMaster("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#stockAuditRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationStockAuditMaster(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationStockAuditMaster("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationStockAuditMaster("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationStockAuditMaster("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#stockAuditRecordPagination').html(numberOfRows);
}


// this is item wise data 

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination Stock Audit master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function paginationStockAudit(pageNumber,id){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
    inputs.push('id='+id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/stock/getStockAuditItemPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setStockAuditItemDataToTableForPagination(r);
 		},
	});	
}

function setStockAuditItemDataToTableForPagination(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstBatchStockDto.length; i++) {
		htm = htm + '<tr> ' + ' <td class="col-md-1 center">' + index + '</td>'
		+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemMasterId + '</td>'
		+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemName + '</td>'
		+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemBatchCode + '</td>'
		+ ' <td class="col-md-1 center" style="display:none">' + r.lstBatchStockDto[i].reorderStock + '</td>'
	
		+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemQuantity + '</td>'
		+ ' <td class="col-md-1 center">' + expDate
		+ '</td>' + '</tr>';
		index++;
	}
	$("#stockAuditItemById").html(htm);
};


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationStockAudit(currentIndex, numberOfPages){
	
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	var subInvId = $("#subInvId").val();
	numberOfRows +="<li class='previous' onclick='previousPaginationStockAudit("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationStockAudit("+j+","+subInvId+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationStockAudit("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#stockAuditItemRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationStockAudit(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	var subInvId = $("#subInvId").val();
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationStockAudit("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationStockAudit("+j+","+subInvId+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationStockAudit("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#stockAuditItemRecordPagination').html(numberOfRows);
}

/**
 * @since 28-05-2020
 * @author Rohit Sandbhor
 * @comment this js function is created for to get goods issue modal pagination data 
 * @param pageNumber
 */
function paginationGoodsIssueModal(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryGoodsIssueNew/getGoodsIssueModalPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setGoodsIssueModalPagination(r);
 		},
	});
}

/**
 * @since 28-05-2020
 * @author Rohit Sandbhor
 * @comment this js function is created for to set goods issue modal pagination data
 * @param r
 */
function setGoodsIssueModalPagination(r){
	var htm = "";
	var index = 1;
	for (var i = 0; i < r.lstmrnmaster.length; i++) {
		var mrnGeneratedDate = getDateTimeGoodsIssueNew(r.lstmrnmaster[i].createdDate);
		htm = htm +
			'<tr> ' +
			' <td class="col-md-1 center"><input type="radio" name="mrnNumber" id="rowId' + index + '" value="' + r.lstmrnmaster[i].mrnId + '" autofocus="autofocus"></td>' +
			' <td class="col-md-1 center">' +
			index +
			'</td>' +
			' <td class="col-md-1 center">' +
			mrnGeneratedDate +
			'</td>' +
			' <td class="col-md-1 center">' +
			r.lstmrnmaster[i].mrnId +
			'</td>' +
			' <td class="col-md-1 center">' +
			r.lstmrnmaster[i].mrnSubinventoryName +
			'</td>'+
			' <td class="col-md-1 center"><span class="label label-warning">'+r.lstmrnmaster[i].mrnStatus+'</span></td>' 
			+'</tr>';
		index++;
	}
	$("#getMrnDataTableBodyId").html(htm);
}

/**
 * @since 21-03-2020
 * @comment This JS function is created for to get next pagination internal MRN list under goods issue get mrn button
 * @author Rohit Sandbhor
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationGoodsIssueModal(currentIndex, numberOfPages){
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationGoodsIssueModal("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationGoodsIssueModal("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationGoodsIssueModal("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
		$('#goodsIssueMrnRecordModalPagination').html(numberOfRows);
}
/**
 * @since 21-03-2020
 * @comment This JS function is created for to get previous pagination internal MRN list under goods issue get mrn button
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationGoodsIssueModal(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationGoodsIssueModal("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationGoodsIssueModal("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationGoodsIssueModal("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
		$('#goodsIssueMrnRecordModalPagination').html(numberOfRows);
}

//this is for MRN By Vishnu

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function paginationMRN(pageNumber,subInventoryName){
	
	var subinvname="";
	if(subInventoryName !=undefined && subInventoryName !=""){
		subinvname = subInventoryName;
	}else{
		subinvname = $("#subinvname").val();
	}
	
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
    inputs.push('mrnSubinventoryName='+subinvname);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/getMRNPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setMRNDataToTableForPagination(r);
 		},
	});	
}

function setMRNDataToTableForPagination(r) {
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
				if(r.lstmrnmaster[i].mrnStatus == "In-Process"){
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
		
	}
	$("#mrnDataTableBodyId").html(htm);
};


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationMRN(currentIndex, numberOfPages){
	var subInventoryName = $("#generateMRNSearchId").val();
	$("#subinvname").val(subInventoryName);
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationMRN("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +='<li onclick=paginationMRN('+j+'")><a>'+j+'</a></li>';
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationMRN("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#mrnRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationMRN(currentIndex,numberOfPages){
	var subInventoryName = $("#generateMRNSearchId").val();
	$("#subinvname").val(subInventoryName);
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationMRN("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +='<li onclick=paginationMRN('+j+')><a>'+j+'</a></li>';
	}
		numberOfRows +="<li class='next' onclick='nextPaginationMRN("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#mrnRecordPagination').html(numberOfRows);
}

// this is all about good issue mrn 


function paginationGoodIssueMRN(pageNumber,subInventoryName){
	
	var subinvname = "";
	if(subInventoryName !=undefined && subInventoryName !=""){
		subinvname = subInventoryName;
	}else{
		subinvname =$("#subinvname").val();
	}
	
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
    inputs.push('mrnSubinventoryName='+subinvname);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryGoodsIssueNew/getGoodIssueMRNPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setGoodIssueMRNDataToTableForPagination(r);
 		},
	});	
}

function setGoodIssueMRNDataToTableForPagination(r) {
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
		+ '	<button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#generateMRNRequestModalAfterGoodsIssue"  onclick=editGeneratedMRNDataForApproval('
		+ r.lstGoodsIssueMrnMaster[i].id
		+ ')><i class="fa fa-edit"></i></button></td>'
		 + '</tr>';
		index++;
		
	}
	$("#mrnApprovedStatusDataTbodyId").html(htm);
};


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination mrn master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationGoodIssueMRN(currentIndex, numberOfPages){
	var subInventoryName = $("#generateMRNSearchId").val();
	alert(subInventoryName);
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationGoodIssueMRN("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +='<li onclick=paginationGoodIssueMRN('+j+',\"'+subInventoryName+'\")><a>'+j+'</a></li>';
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationGoodIssueMRN("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#mrnGoodIssueRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination mrn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationGoodIssueMRN(currentIndex,numberOfPages){
	var subInventoryName = $("#generateMRNSearchId").val();
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationGoodIssueMRN("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +='<li onclick=paginationMRN('+j+',\"'+subInventoryName+'\")><a>'+j+'</a></li>';
	}
		numberOfRows +="<li class='next' onclick='nextPaginationGoodIssueMRN("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#mrnGoodIssueRecordPagination').html(numberOfRows);
}

/**
 * @since 28-05-2020
 * @author Rohit Sandbhor
 * @comment this js function is created for to get goods issue data list pagination 
 * @param pageNumber
 */
function paginationGoodsIssueList(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryGoodsIssueNew/paginationGoodsIssueList",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setGoodsIssueListPagination(r);
 		},
	});
}

/**
 * @since 28-05-2020
 * @author Rohit Sandbhor
 * @comment this js function is created for to set goods issue modal pagination data
 * @param r
 */
function setGoodsIssueListPagination(response){
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

/**
 * @since 21-03-2020
 * @comment This JS function is created for to get next pagination internal MRN list under goods issue get mrn button
 * @author Rohit Sandbhor
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationGoodsIssueList(currentIndex, numberOfPages){
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationGoodsIssueModal("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationGoodsIssueModal("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationGoodsIssueModal("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
		$('#goodsIssueListPagination').html(numberOfRows);
}
/**
 * @since 21-03-2020
 * @comment This JS function is created for to get previous pagination internal MRN list under goods issue get mrn button
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationGoodsIssueList(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationGoodsIssueList("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationGoodsIssueList("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationGoodsIssueList("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
		$('#goodsIssueListPagination').html(numberOfRows);
}

//this is all about received mrn 


function paginationReceivedMRN(pageNumber,subInventoryId){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
    inputs.push('mrnSubinventoryId='+subInventoryId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/paginationReceivedMRN",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setReceivedMRNDataToTableForPagination(r);
 		},
	});	
}

function setReceivedMRNDataToTableForPagination(r) {
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
		
	}
	$("#mrnReceivedStatusDataTbodyId").html(htm);
};


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination mrn received master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationReceivedMRN(currentIndex, numberOfPages){
	var subInventoryId = $("#subInventoryId").val();
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationReceivedMRN("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +='<li onclick=paginationReceivedMRN('+j+','+subInventoryId+')><a>'+j+'</a></li>';
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationReceivedMRN("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#receivedMRNRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination mrn received master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationReceivedMRN(currentIndex,numberOfPages){
	var subInventoryId = $("#subInventoryId").val();
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationReceivedMRN("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +='<li onclick=paginationReceivedMRN('+j+','+subInventoryId+')><a>'+j+'</a></li>';
	}
		numberOfRows +="<li class='next' onclick='nextPaginationReceivedMRN("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#receivedMRNRecordPagination').html(numberOfRows);
}

//this is all about Consumtions


function paginationConsumptionMRN(pageNumber,subInventoryName){
	var subInvName="";
	if(subInventoryName !=undefined && subInventoryName !=""){
		subInvName = subInventoryName;
	}else{
		subInvName = $("#subinvname").val();
	}
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
    inputs.push('mrnSubinventoryName='+subInvName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/getPaginationConsumption",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setConsumptionMRNDataToTableForPagination(r);
 		},
	});	
}

function setConsumptionMRNDataToTableForPagination(r) {
	
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
	}
	$("#consumptionTabDataTbodyId").html(htm);
};


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination Consumption master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationConsumptionMRN(currentIndex, numberOfPages){
	var subInventoryName = $("#generateMRNSearchId").val();
	$("#subinvname").val(subInventoryName);
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationConsumptionMRN("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +='<li onclick=paginationConsumptionMRN('+j+')><a>'+j+'</a></li>';
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationConsumptionMRN("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#consumptionMRNRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination Consumption master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationConsumptionMRN(currentIndex,numberOfPages){
	var subInventoryName = $("#generateMRNSearchId").val();
	$("#subinvname").val(subInventoryName);
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationConsumptionMRN("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +='<li onclick=paginationConsumptionMRN('+j+')><a>'+j+'</a></li>';
	}
		numberOfRows +="<li class='next' onclick='nextPaginationConsumptionMRN("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#consumptionMRNRecordPagination').html(numberOfRows);
}


// this is for Stock return by Vishnu 



function paginationStockReturnMRN(pageNumber,subInventoryName){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
    inputs.push('mrnSubinventoryName='+subInventoryName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subInventory/getPaginationStockReturn",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setStockReturnMRNDataToTableForPagination(r);
 		},
	});	
}

function setStockReturnMRNDataToTableForPagination(r) {
	
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstStockReturnDto.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTimeStockReturn(r.lstStockReturnDto[i].createdDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstStockReturnDto[i].status
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstStockReturnDto[i].subinvName
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-primary editUserAccess"   data-toggle="modal"  data-target="#generateMrnReturnRequestModal" data-name="approvedMRN"   onclick=editStockReturn('
				+ r.lstStockReturnDto[i].id+ ',\'view\')><i class="fa fa-eye"></i></button></td>'
				
				+ '</tr>';
		index++;
		
	}
	$("#mrnReturnTabDataTbodyId").html(htm);
};


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination Consumption master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationStockReturnMRN(currentIndex, numberOfPages){
	var subInventoryName = $("#generateMRNSearchId").val();
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationStockReturnMRN("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +='<li onclick=paginationStockReturnMRN('+j+',\"'+subInventoryName+'\")><a>'+j+'</a></li>';
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationStockReturnMRN("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#stockReturnMRNRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination Consumption master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationStockReturnMRN(currentIndex,numberOfPages){
	var subInventoryName = $("#generateMRNSearchId").val();
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationStockReturnMRN("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +='<li onclick=paginationStockReturnMRN('+j+',\"'+subInventoryName+'\")><a>'+j+'</a></li>';
	}
		numberOfRows +="<li class='next' onclick='nextPaginationStockReturnMRN("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#stockReturnMRNRecordPagination').html(numberOfRows);
}

/*******************************************************************************************************************************************/
/**
 * @since 04-07-2020
 * @author Rohit Sandbhor
 * @comment This JS function is created for to get pagination on closing stock 
 * @param pageNumber
 */
function paginationClosingStock(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryClosingStock/getClosingStockPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setClosingStockPagination(r);
 		},
	});	
}

/**
 * @since 04-07-2020
 * @author Rohit Sandbhor
 * @comment This JS function is created for to set closing stock pagination
 * @param r
 */
function setClosingStockPagination(r) {
	var htm = "";
	var index = 1;
	for (var i = 0; i < r.lstclosingstockmaster.length; i++) {
		var datee = getDate(r.lstclosingstockmaster[i].createdDateTime);
		var batchExpDate = getDateWithoutTime(r.lstclosingstockmaster[i].batchExpDate);

		htm = htm +
			'<tr> ' +
			' <td class="col-md-1 center">' +
			index +
			'</td>'
			+
			' <td class="col-md-1 center">' +
			datee +
			'</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].id +
			'</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].itemName +
			'</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].batchNumber + '</td>'
			+
			' <td class="col-md-1 center">' +
			batchExpDate + '</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].itemDeductQuantity + '</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].narration + '</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].userName + '</td>'

			+
			'</tr>';
		index++;
	}
	$("#closingStockTableBody").html(htm);
}

/**
 * @since 04-07-2020
 * @comment This JS function is created for to get next pagination closing stock list
 * @author Rohit Sandbhor
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationClosingStock(currentIndex, numberOfPages){
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationClosingStock("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationClosingStock("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationClosingStock("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
		$('#closingStockRecordPagination').html(numberOfRows);
}
/**
 * @since 04-07-2020
 * @comment This JS function is created for to get previous pagination closing stock list 
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationClosingStock(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationClosingStock("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationClosingStock("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationClosingStock("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
		$('#closingStockRecordPagination').html(numberOfRows);
}

//this is for Asset Complaint By Vishnu

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function paginationAssetComplaint(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/complaintsM/getAssetComplaintPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setAssetComplaintPagination(r);
 		},
	});	
}

function setAssetComplaintPagination(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstAssetComplaintMasterDto.length; i++) {
		htm = htm
		+ '<tr> '
		+ ' <td class="col-md-1 center">'
		+ index
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ getDateTime(r.lstAssetComplaintMasterDto[i].createdDateTime)
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].id
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].userName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].productCategoryName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].assetName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].complainType
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].ticketStatus
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].priority
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].rateOfInconvenience
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].urgent
		+ '</td>'
		if(r.lstAssetComplaintMasterDto[i].ticketStatus != "OPEN"){
			htm = htm + ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" data-toggle="modal" disabled data-target="#assetComplaintModuleModal" onclick=editAssetComplaintsData('+ r.lstAssetComplaintMasterDto[i].id + ',"ASSETCOMPLAINT")><i class="fa fa-edit"></i></button></td>'
		}
		else{
			htm = htm + ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" data-toggle="modal" data-target="#assetComplaintModuleModal" onclick=editAssetComplaintsData('+ r.lstAssetComplaintMasterDto[i].id + ',"ASSETCOMPLAINT")><i class="fa fa-edit"></i></button></td>'
		}
		htm = htm + ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-info" data-toggle="modal" data-target="#assetComplaintViewModuleModal" onclick=editAssetTicketManagement('+ r.lstAssetComplaintMasterDto[i].id + ',"ASSETCOMPLAINT")><i class="fa fa-eye"></i></button></td>'
	    + '</tr>';
		index++;
		
	}
	$("#assetComplaintTableBodyId").html(htm);
};


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationAssetComplaint(currentIndex, numberOfPages){
	
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationAssetComplaint("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationAssetComplaint("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationAssetComplaint("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#assetComplaintRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationAssetComplaint(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationAssetComplaint("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationAssetComplaint("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationAssetComplaint("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#assetComplaintRecordPagination').html(numberOfRows);
}


//this is for Asset Closed Complaint By Vishnu

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function paginationAssetClosedComplaint(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/complaintsM/getAssetClosedComplaintPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setAssetClosedComplaintForPagination(r);
 		},
	});	
}

function setAssetClosedComplaintForPagination(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstAssetComplaintMasterDto.length; i++) {
		htm = htm
		+ '<tr> '
		+ ' <td class="col-md-1 center">'
		+ index
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ getDateTime(r.lstAssetComplaintMasterDto[i].createdDateTime)
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].id
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].userName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].productCategoryName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].assetName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].complainType
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].ticketStatus
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].priority
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].rateOfInconvenience
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstAssetComplaintMasterDto[i].urgent
		+ '</td>'
		+' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-info" data-toggle="modal" data-target="#assetComplaintViewModuleModal" data-name="approvedMRN" onclick=editAssetTicketManagement(' + r.lstAssetComplaintMasterDto[i].id + ',"ASSETCOMPLAINT")><i class="fa fa-eye"></i></button></td>'
	    + '</tr>';
		index++;
		
	}
	$("#assetClosedComplaintTableBodyId").html(htm);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationAssetClosedComplaint(currentIndex, numberOfPages){
	
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationAssetClosedComplaint("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationAssetClosedComplaint("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationAssetClosedComplaint("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#assetClosedComplaintRecordPagination').html(numberOfRows);
}

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationAssetClosedComplaint(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationAssetClosedComplaint("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationAssetClosedComplaint("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationAssetClosedComplaint("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#assetClosedComplaintRecordPagination').html(numberOfRows);
}

//this is for Asset Maintenance By Vishnu

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination Asset Maintenance
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function paginationAssetMaintenance(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryAssetMaintenance/getAssetMaintenancePagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setAssetMaintenanceForPagination(r);
 		},
	});	
}

function setAssetMaintenanceForPagination(response) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < response.lstItemAssetMaintenanceMasterDto.length; i++) {
		htm = htm +
		'<tr> ' +
		' <td class="col-md-1 center">' +
		index +
		'</td>';
		htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].id +'</td>';
		htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemId +'</td>';
		if(response.lstItemAssetMaintenanceMasterDto[i].assetType == "LABEQUIPMENT"){
			htm = htm + ' <td class="col-md-1 center"><span style="color:#d9534f;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</span></td>';
		}
		else{
			htm = htm + ' <td class="col-md-1 center"><span style="color:#f0ad4e;">' +response.lstItemAssetMaintenanceMasterDto[i].assetItemName +'</span></td>';
		}
		htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].productCategory +'</td>';
		if(response.lstItemAssetMaintenanceMasterDto[i].locationDeptName !="" && response.lstItemAssetMaintenanceMasterDto[i].locationDeptName !=null){
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].locationDeptName +'</td>';
		}else{
			htm = htm + ' <td class="col-md-1 center">NA</td>';
		}
		if(response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName !="" && response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName !=null){
			htm = htm + ' <td class="col-md-1 center">' +response.lstItemAssetMaintenanceMasterDto[i].locationHospitalDeptName +'</td>';
		}else{
			htm = htm + ' <td class="col-md-1 center">NA</td>';
		}
		if(response.lstItemAssetMaintenanceMasterDto[i].recordType == 1){
		
			htm = htm + ' <td class="col-md-1 center">' +getDateWithTime(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime) +'</td>';
		}
		else if(response.lstItemAssetMaintenanceMasterDto[i].recordType == 3){
			htm = htm + ' <td class="col-md-1 center">'+getDateWithTime(response.lstItemAssetMaintenanceMasterDto[i].updatedDateTime) +'</td>';
		}
	
		else{
			htm = htm + ' <td class="col-md-1 center">'+getDate(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime) +'</td>';
		}
		htm = htm + ' <td class="col-md-3 center">' +response.lstItemAssetMaintenanceMasterDto[i].serialNo +'</td>' +
		
		' <td class="col-md-1 center">' +
				'<button class="btn btn-xs btn-success" data-toggle="modal" id="assetModal" data-target="#assetModal" type="button" onclick=editItemAssetMaintenanceMaster('+response.lstItemAssetMaintenanceMasterDto[i].id+','+response.lstItemAssetMaintenanceMasterDto[i].recordType+',\"'+response.lstItemAssetMaintenanceMasterDto[i].assetType+'\");><i class="fa fa-edit View"></i></button></td>'+
		' <td class="col-md-1 center">' +
		'	<button class="btn btn-xs btn-success" type="button" onclick=getAssetMaintenanceBarCode('+response.lstItemAssetMaintenanceMasterDto[i].id+',\"'+response.lstItemAssetMaintenanceMasterDto[i].serialNo+'\",\"'+getDate(response.lstItemAssetMaintenanceMasterDto[i].createdDateTime)+'\",\"'+encodeURIComponent(response.lstItemAssetMaintenanceMasterDto[i].assetItemName)+'\",\"'+response.lstItemAssetMaintenanceMasterDto[i].assetItemId+'\",\"'+response.lstItemAssetMaintenanceMasterDto[i].orgFarNo+'\");><i class="fa fa-barcode"></i></button></td>' +
		' <td class="col-md-1 center">' +
		'	<button class="btn btn-xs btn-danger"  type="button" onclick=deleteAssetMaintenanceDetails('+response.lstItemAssetMaintenanceMasterDto[i].id+');><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	index++;
		
	}
	$("#assetMaintenance").html(htm);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationAssetMaintenance(currentIndex, numberOfPages){
	
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationAssetMaintenance("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationAssetMaintenance("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationAssetMaintenance("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#assetMaintenanceRecordPagination').html(numberOfRows);
}

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationAssetMaintenance(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationAssetMaintenance("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationAssetMaintenance("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationAssetMaintenance("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#assetMaintenanceRecordPagination').html(numberOfRows);
}

// this is by Vishnu

function paginationBlockedPatient(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url 	: "ehat/markvisit/getBlockedPatientPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setBlockedPatientPagination(r);
 		},
	});	
}

/**
 * @since 05-11-2020
 * @author Vishnu Thorat
 * @comment This JS function is created for to set Blocked Patient pagination
 * @param r
 */
function setBlockedPatientPagination(r) {
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();	 
	
	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Sr No</div></th>"
			+ "<th class='col-md-3-1' style='height: 21.5px;padding-right: 40px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mobile</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Aadhaar No</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Blocked Date and Time</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Narration</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Blocked By</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Block Patient</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>UnBlock Patient</div></th>"
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
var index = 1;	
var Mrn= 1010101111;
for ( var i = 0; i < r.listReg.length;i++) {
	
	var datetime= new Date(r.listReg[i].createdDateTime).toLocaleString();
	 var patIdPrefix=patPrefix+patMiddle+r.listReg[i].patientId+patSufix;	
	 var patientName = r.listReg[i].prefix+""+ r.listReg[i].fName+" "+ r.listReg[i].mName+" "+ r.listReg[i].lName ;
	 
	var a="";
			
		htm=htm
		+ "<table class='table table-condensed cf'>"
		+ "<tbody>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.listReg[i].prefix+""+ r.listReg[i].fName+" "+ r.listReg[i].mName+" "+ r.listReg[i].lName+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+datetime+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].patientId +"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].mobile +"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].adharcardNo +"</td>"
		
		
		if(r.listReg[i].blockFlag == "F"){//Patient with one warning = F
			htm=htm + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+(r.listReg[i].blockedDateTime1 != null ? getDateWithTime(r.listReg[i].blockedDateTime1):"NA") +"</td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].blockNarration1 +"</td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].prefix+""+r.listReg[i].blockUserName1 +"</td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs ' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")' data-toggle='tooltip' title='1]"+r.listReg[i].blockNarration1+" -By("+r.listReg[i].blockUserName1+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs btn-success' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
			
		}else if(r.listReg[i].blockFlag == "S"){//Patient with two warning = S
			htm=htm + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+(r.listReg[i].blockedDateTime2 != null ? getDateWithTime(r.listReg[i].blockedDateTime2):"NA") +"</td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].blockNarration2 +"</td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].prefix+""+r.listReg[i].blockUserName2 +"</td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs ' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")' data-toggle='tooltip' title='1]"+r.listReg[i].blockNarration1+" -By("+r.listReg[i].blockUserName1+")\n2]"+r.listReg[i].blockNarration2+" -By("+r.listReg[i].blockUserName2+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs btn-success' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
			
		}else if(r.listReg[i].blockFlag == "T"){//Blocked patient list = T
			htm=htm + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+(r.listReg[i].blockedDateTime1 != null ? getDateWithTime(r.listReg[i].blockedDateTime1):"NA")+", "+(r.listReg[i].blockedDateTime2 != null ? getDateWithTime(r.listReg[i].blockedDateTime2):"NA")+", "+(r.listReg[i].blockedDateTime3 != null ? getDateWithTime(r.listReg[i].blockedDateTime3):"NA")+"</td>"
			+ "<td class='col-sm-5-1 center' style='height: 21.5px;flex-wrap: wrap;'>"+r.listReg[i].blockNarration1+", "+r.listReg[i].blockNarration2+", "+r.listReg[i].blockNarration3 +"</td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].prefix+""+r.listReg[i].blockUserName3 +"</td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs btn-success' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")' data-toggle='tooltip' title='1]"+r.listReg[i].blockNarration1+" -By("+r.listReg[i].blockUserName1+")\n2]"+r.listReg[i].blockNarration2+" -By("+r.listReg[i].blockUserName2+")\n3]"+r.listReg[i].blockNarration3+" -By("+r.listReg[i].blockUserName3+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs btn-success' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
			
		}else{//Active patient = N
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs ' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")' ><i class='fa fa-circle-o' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs btn-success' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
		}
		htm=htm+ "</tr>" + "</tbody>" + "</table>" + "</div>";
 index++;
Mrn++;
}
$("#blockedPatientTableBodyId").html(htm);
$("#CamPatId").val(r.listReg[0].patientId);
$("#blockedPatientTableBodyId").html(htm);
$("#allPatInfo").html(r);
//$("#ehatTable").html(htm);
var maxPatId=Number(r.listReg[0].ptId)+Number(1);
$("#maxPatId").val(maxPatId);

}

/**
 * @since 05-11-2020
 * @comment This JS function is created for to get next pagination Blocked Patient list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 * 
 */
function nextPaginationBlockedPatient(currentIndex, numberOfPages){
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationBlockedPatient("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationBlockedPatient("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationBlockedPatient("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
		$('#blockedPatientPagination').html(numberOfRows);
}
/**
 * @since 05-11-2020
 * @comment This JS function is created for to get previous pagination Blocked Patient list 
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationBlockedPatient(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationBlockedPatient("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationBlockedPatient("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationBlockedPatient("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
		$('#blockedPatientPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination grn master list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function paginationHospitalLicense(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/hospitalLicense/getHospitalLicensePagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setHospitalLicensePagination(r);
 		},
	});	
}

function setHospitalLicensePagination(response) {
	var htm = "";
	var index = 1;
		for (var i = 0; i < response.lstHospitalLicenseDto.length; i++) {
			htm = htm +
				'<tr> ' +
				' <td class="col-md-1 center">' +
				index +
				'</td>' +
				' <td class="col-md-1 center">' +
				getDateWithTime(response.lstHospitalLicenseDto[i].createdDate) +
				'</td>' +
				' <td class="col-md-1 center">' +
				response.lstHospitalLicenseDto[i].documentName +
				'</td>' +
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].descClauseNoDetails
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthOfficeName
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthOfficeAddress
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthorityContactPerson
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthorityContactNO
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthorityContactEmail
				 +
				'</td>'+
				
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].isApplicable
				 +
				'</td>'+' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].regNoLicenseNo
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].issuedOnDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].validFromDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].validTillDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].renewalSubmissionDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].actionAlertDate)
				 +
				'</td>'+' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].status
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].note
				 +
				 '</td>';
				if(response.lstHospitalLicenseDto[i].lstHospitalLicenseDocUploadDto !=null){
				htm = htm +	' <td class="col-md-1 center">' +
					'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" value="'+JSON.parse(response.lstHospitalLicenseDto[i].lstHospitalLicenseDocUploadDto[0].imagePath)+'" onclick=viewHospitalLicense(' +
						response.lstHospitalLicenseDto[i].id +',this.value)><i class="fa fa-eye View"></i></button></td>' ;
				}else{
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				htm = htm +' <td class="col-md-1 center">' +
					'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#hospitalLicensesModal" onclick=editHospitalLicense(' +
					response.lstHospitalLicenseDto[i].id +')><i class="fa fa fa-edit"></i></button></td>' +
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].userName
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].lastLoggedInDateTime
				 +
				'</td>'+
				' <td class="col-md-1 center">' +
				'	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteHospitalLicense(' +
				response.lstHospitalLicenseDto[i].id +')><i class="fa fa-trash-o"></i></button></td>'+ 
				'</tr>';
			index++;
		}
		
	$("#hospitalLicenseTbody").html(htm);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination Hospital License list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function nextPaginationHospitalLicense(currentIndex, numberOfPages){
	
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationHospitalLicense("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationHospitalLicense("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationHospitalLicense("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#hlRecordPagination').html(numberOfRows);
}


/**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination Hospital License list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 */
function previousPaginationHospitalLicense(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationHospitalLicense("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationHospitalLicense("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationHospitalLicense("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#hlRecordPagination').html(numberOfRows);
}

/**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination Company list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 *//*
function paginationCompany(pageNumber){
	var inputs = [];
	var startIndex = (pageNumber-1)+"0";
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bmw/getCompaniesPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        ajaxResponse = r;		
	        setCompanyPagination(r);
 		},
	});	
}

function setCompanyPagination(r) {
	var divContent = "";
	if (r.list.length > 0) {
		for (var i = 0; i < r.list.length; i++) {
			divContent = divContent + '<tr>'
					+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
			divContent = divContent
					+ "<td class='col-md-1 center'>"+ r.list[i].companyName + "</td>";
			divContent = divContent
					+ "<td class='col-md-1 center'>"+ r.list[i].gstNo + "</td>";
			divContent = divContent
					+ "<td class='col-md-1 center'>"+ r.list[i].registrationNumber
					+ "</td>";
			divContent = divContent
					+ " <td class='col-md-1 center'>"+ "<button class='btn btn-xs btn-success' onclick=editCompany('"+ r.list[i].id+ "')><i class='fa fa-edit'></i></button></td>";
			divContent = divContent
					+ " <td class='col-md-1 center'>"+ "<button class='btn btn-xs btn-danger' onclick=deleteCompany('"+ r.list[i].id+ "')><i class='fa fa-trash-o'></i></button></td></tr>";
		}
	} else {
		divContent = divContent
				+ "<tr style='height:20px; color:red; font-size:20px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
	}
	$('#companyTbody').html(divContent);
	
}


*//**
 * @since 21-04-2020
 * @comment This JS function is created for to get next pagination Company list
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 *//*
function nextPaginationCompany(currentIndex, numberOfPages){
	
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPaginationCompany("+currentIndex+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationCompany("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPaginationCompany("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#companyPagination').html(numberOfRows);
}


*//**
 * @since 21-04-2020
 * @comment This JS function is created for to get previous pagination Company list 
 * @author Vishnu Thorat
 * @param currentIndex
 * @param numberOfPages
 *//*
function previousPaginationCompany(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPaginationCompany("+displayPagination+","+Math.round(numberOfPages)+")'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='paginationCompany("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPaginationCompany("+j+","+Math.round(numberOfPages)+")'><a class='page-link' href='#'>Next</a></li>";
	$('#companyPagination').html(numberOfRows);
}*/


