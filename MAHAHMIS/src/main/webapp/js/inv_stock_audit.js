/*
 * /*#Date:- 24-12-2019
 * #Author:- Arpit
 * #CodeFor:- Below js code to fetch Data for inventory tab
 */
function fetchAllBatchStockItems() {

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/stock/getStockData",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setDataToStockTable(r);
		}
	});
}

/*
 * /*#Date:- 24-12-2019 
 * #Author:- Arpit 
 * #CodeFor:- Below js code to set data to table
 */
function setDataToStockTable(r, templateName) {
	var htm = "";
	var htm1 = "";
	var index = 1;
	var indexSub = 1;
	if (templateName != "subInvItem") {
	for ( var i = 0; i < r.lstBatchStockDto.length; i++) {
		var expDate = getDate(r.lstBatchStockDto[i].itemBatchExpDate);
		if(expDate == "1970-01-01"){
			expDate="NA";	
		}
		htm = htm + '<tr> ' + ' <td class="col-md-1 center">' + index + '</td>'
				+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemMasterId + '</td>'
				+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemName + '</td>';
				if(r.lstBatchStockDto[i].itemBatchCode == 0){
					htm = htm+ ' <td class="col-md-1 center">NA</td>';
				}else{
					htm = htm+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemBatchCode + '</td>';
				}
				htm = htm	+ ' <td class="col-md-1 center" style="display:none">' + r.lstBatchStockDto[i].reorderStock + '</td>'
				+ ' <td class="col-md-1 center">' + expDate
				+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemQuantity + '</td>'
				+ '</td>' + '</tr>';
		index++;
		
		var numberOfRows="";
		var indexNewInv=1;
		var count=r.noOfPages;
		var numberOfPages=(count/10);
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
			displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			numberOfRows +="<li onclick='paginationStockAuditMaster("+indexNewInv+");'><a>"+indexNewInv+"</a></li>";
			indexNewInv=indexNewInv+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationStockAuditMaster("+indexNewInv+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesStockAudit').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#stockAuditRecordPagination').html(numberOfRows);
	}
	}
	if (templateName == "subInvItem") {
		var subInvId = $("#subInvId").val();
		for ( var i = 0; i < r.goodsIssueMrnItemSlaveDtos.length; i++) {
			var expDate = getDate(r.goodsIssueMrnItemSlaveDtos[i].itemBatchExpDate);
			if(expDate == "NaN-aN-aN"){
				expDate = "NA";
			}
			htm1 = htm1 + '<tr> ' + ' <td class="col-md-1 center">' + indexSub + '</td>'
					+ ' <td class="col-md-1 center">' + r.goodsIssueMrnItemSlaveDtos[i].itemMasterId + '</td>'
					+ ' <td class="col-md-1 center">' + r.goodsIssueMrnItemSlaveDtos[i].itemName + '</td>';
					if(r.goodsIssueMrnItemSlaveDtos[i].itemBatchCode == 0){
						htm1 = htm1	+ ' <td class="col-md-1 center">NA</td>';
					}else{
						htm1 = htm1	+ ' <td class="col-md-1 center">' + r.goodsIssueMrnItemSlaveDtos[i].itemBatchCode + '</td>';
					}
					htm1 = htm1+ ' <td class="col-md-1 center">' + expDate 
					+' <td class="col-md-1 center">' + r.goodsIssueMrnItemSlaveDtos[i].currentSubInventoryStockUpdated + '</td>'
					+ '</td>' + '</tr>';
			indexSub++;
			
			var numberOfRows="";
			var indexNewSubInv=1;
			var count=r.noOfPages;
			var numberOfPages=(count/10);
			var displayPagination=numberOfPages;	
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='ti-angle-double-left'></i></a></li>";
				displayPagination=5;
			}
			for(var j=0;j<displayPagination;j++){
				numberOfRows +="<li onclick='paginationStockAudit("+indexNewSubInv+","+subInvId+");'><a>"+indexNewSubInv+"</a></li>";
				indexNewSubInv=indexNewSubInv+1;
			}
			if(numberOfPages>6){
				numberOfRows +="<li class='next' onclick='nextPaginationStockAudit("+indexNewSubInv+","+Math.round(numberOfPages)+");'><a><i class='ti-angle-double-right' value='Next'></i></a></li>";
			}
			$('#totalNumberOfPagesStockAuditItem').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
			$('#stockAuditItemRecordPagination').html(numberOfRows);
		}
		$("#stockAuditItemById").html(htm1);
	} else {

		$("#stockAuditItem").html(htm);
	}
}
/*
 * /*#Date:- 24-12-2019 #Author:- Arpit #CodeFor:- to perform autosuggestion
 */
function StockItemSuggestion(stockId, callForm) {

	var resultData = [];
	var stockName = $("input#" + stockId).val();
	if (stockName == "" || stockName == null || stockName == "null"
			|| stockName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + stockId).focus();
		return false;
	}
	var inputs = [];

	inputs.push('itemName=' + stockName);
	inputs.push('callFrom=' + callForm);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/stock/getItemsBySuggestion",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.lstBatchStockDto.length; j++) {
				var arrValue = response.lstBatchStockDto[j].itemMasterId + "-"
						+ response.lstBatchStockDto[j].itemName;
				var idValue = response.lstBatchStockDto[j].itemMasterId;
				var alicename = response.lstBatchStockDto[j].itemName;
				resultData.push({
					ID : idValue,
					Name : alicename
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			setTimeout(function() {
				$("div#itemByName .typeahead").html(template);
				$("div#itemByName .typeahead").show();

				$("input#" + stockId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + stockId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var item_id = res[0];
		var itemName = res[1];
		getAllItemId(item_id);
		$("input#" + stockId).val(itemName);
	}
}

/*
 * /*#Date:- 24-12-2019 #Author:- Arpit #CodeFor:- Below js code to fetch data
 * after select autosuggestion text
 */
function getAllItemId(id) {
	var inputs = [];
	inputs.push('item_id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/stock/getAllItemById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			setDataToStockTable(response);
		}
	});
}
/*
 * /*#Date:- 26-12-2019 #Author:- Arpit #CodeFor:- Below js code to perform
 * autosuggestion for subInventory tab
 */
function getSubInvAutoSuggestion(subInvId, callForm) {
	var resultData = [];
	var subInvName = $("input#" + subInvId).val();
	if (subInvName == "" || subInvName == null || subInvName == "null"
			|| subInvName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + subInvId).focus();
		return false;
	}
	var inputs = [];

	inputs.push('subInvName=' + subInvName);
	inputs.push('callFrom=' + callForm);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "ehat/stock/getSubInvBySuggestion",
				cache : false,
				success : function(response) {

					var template = "";
					for ( var j = 0; j < response.lstSubInventoryMaster.length; j++) {
						var arrValue = response.lstSubInventoryMaster[j].id
								+ "-"
								+ response.lstSubInventoryMaster[j].subInventoryName;
						var idValue = response.lstSubInventoryMaster[j].id;
						var subInvname = response.lstSubInventoryMaster[j].subInventoryName;
						resultData.push({
							ID : idValue,
							Name : subInvname
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					setTimeout(
							function() {
								$("div#subInvByName .typeahead").html(template);
								$("div#subInvByName .typeahead").show();

								$("input#" + subInvId).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("input#" + subInvId).data('typeahead').source = resultData;
							}, 500);

				}

			});
	function displayResult(item) {

		var res = item.text.split('-');
		var item_id = res[0];
		var subInvName = res[1];
		getAllsubInvById(item_id);
		$("input#" + subInvId).val(subInvName);
	}

}

/*
 * /*#Date:- 26-12-2019 #Author:- Arpit #CodeFor:- Below js code to fetch
 * subInventory Item By Id
 */
function getAllsubInvById(id) {
	var inputs = [];
	inputs.push('subInvId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/stock/getSubInvDataById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			$("#subInvId").val(id);
			setDataToStockTable(response, "subInvItem");
		}
	});
}

/*
 * /*#Date:- 26-12-2019 #Author:- Arpit #CodeFor:- Below js code to fetch
 * subInventory List
 */
function getAllSubInvList() {
	jQuery.ajax({
		async : false,
		type : "GET",
		data : "&reqType=AJAX",
		url : "ehat/stock/getSubInvData",
		cache : false,
		success : function(response) {
			
			setDataToSubInvTable(response);
		}
	});
}

/*
 * /*#Date:- 26-12-2019 #  Author:- Arpit #CodeFor:- Below js code to set data to
 * subInventory popup
 */
function setDataToSubInvTable(response) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < response.lstSubInventoryMaster.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.lstSubInventoryMaster[i].id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.lstSubInventoryMaster[i].subInventoryName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '<button  data-dismiss="modal" class="btn btn-success btn-xs editUserAccess" onclick="getAllsubInvById('
				+ response.lstSubInventoryMaster[i].id + ')">view</button>'
				+ '</td>' + '</tr>';
		index++;
	}
	$("#subInvList").html(htm);
}
/*
 * /*#Date:- 26-12-2019 #Author:- Arpit #CodeFor:- Below js code to export
 * template to excel
 */
function expoertexcel() {
	var val = $("#invSubstock").attr("class");

	var div = "sTable";
	if (val == "active") {
		var stockSubInvItemName = $("#subInvSearchText").val();
		if (stockSubInvItemName == "" || stockSubInvItemName == null
				|| stockSubInvItemName == undefined) {
			alert("Please Select Subinventory Name!!!");
			return false;
		}
		div = "tTable";
	}
	window.open('data:application/vnd.ms-excel,'
			+ encodeURIComponent($('div[id$=' + div + ']').html()));
	e.preventDefault();
}
/*
 * /*#Date:- 27-12-2019 #Author:- Arpit #CodeFor:- Below js code to clear text box
 */
function onClearText(text){
	if(text=="clearSubInv"){
		$("#subInvSearchText").val("");
		
	}
	else{
		$("#stockItemName").val("");
	}
}

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
	console.log("Datee >> " + datee);
	return datee;
}