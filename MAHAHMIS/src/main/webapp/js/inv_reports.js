function getAllItemStockBelowMinimumLevel() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invReports/getAllItemStockBelowMinimunLevelReport",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setItemMasterDataToTable(r);
		}
	});
}

function setItemMasterDataToTable(r) {
	var htm = "";
	var index = 1;
	var expDate = "";
	for ( var i = 0; i < r.length; i++) {
		if(r[i].batchExpiryDate == "1970-01-01"){
			expDate = "NA";
		}else{
			expDate = r[i].batchExpiryDate;	
		}
		htm = htm + '<tr> ' + ' <td class="col-md-1 center">' + index + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].id + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemName + '</td>'
				/*+ ' <td class="col-md-1 center">' + r[i].batchNo + '</td>'
				+ ' <td class="col-md-1 center">' + expDate + '</td>'*/
				+ ' <td class="col-md-1 center">' + r[i].reOrderQty + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].maxQty + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].orderQty + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemQuantity+ '</td>' 
				+ ' <td class="col-md-1 center">' + (r[i].itemQuantity) + '</td>'
				+ '</tr>';
		index++;
	}
	$("#itemStockDetailList").html(htm);
};
/************
 * @author	: Dayanand Khandekar
 * @date		: 07-feb-2020
 * @codeFor	: getAllItemExpirayDateReport
 ************/
function getAllItemExpirayDateReport() {
	var inputs = [];
	var fromuserDate = $("#fromuserDate").val();
	var touserDate = $("#touserDate").val();


	inputs.push('fromuserDate=' + fromuserDate);
	inputs.push('touserDate=' + touserDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invReports/getallitemexpiraydatereport",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			if(r.length==0){
			alert("Record Not Found............!!!!!");	
			$("#itemexpirayDetailList").html("");
			return false;
			}
			setItemExpirayReportToTable(r);
		}
	});
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 07-feb-2020
 * @codeFor	: setItemExpirayReportToTable
 ************/
function setItemExpirayReportToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		var expirayDate = getDateWithoutTime(r[i].expirayDate);
		if(expirayDate == "1970-01-01"){
			expirayDate ="NA";
		 	}
		if(r[i].batchNo !=0 && r[i].batchNo !=null){
			htm = htm + '<tr> ' + ' <td class="col-md-1 center">' + index + '</td>'
					+ ' <td class="col-md-1 center">' + r[i].id + '</td>'
					+ ' <td class="col-md-1 center">' + r[i].itemName + '</td>'
					+ ' <td class="col-md-1 center">' + r[i].batchNo + '</td>'
					+ ' <td class="col-md-1 center">' + expirayDate + '</td>'
					+ ' <td class="col-md-1 center">' + r[i].daysLeft + '</td>'
					+ ' <td class="col-md-1 center">' + r[i].availableStockQty
					+ '</td>' + '</tr>';
			index++;
		}
	}
	$("#itemexpirayDetailList").html(htm);
};

/// this is for opening stock reports 

function getAllItemOpeningStock() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invReports/getAllItemOpeningStockReport",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setItemOpeningStockDataToTable(r);
		}
	});
}

// this is for set opening stock table data 

function setItemOpeningStockDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
	
		var expirayDate = getDateWithoutTime(r[i].expirayDate);
		var insertedDateAndTime = getDate(r[i].insertedDateAndTime);
		if(expirayDate == "1970-01-01"){
			expirayDate="NA";
		
		}
		//var openingDate = getDate(r[i].openingDate);
		var openingdate= new Date(r[i].openingDate).toLocaleDateString('en-GB');
		var manuFactureDate= new Date(r[i].manuFactureDate).toLocaleDateString('en-GB');
		if(manuFactureDate =="Invalid Date"){
			manuFactureDate = "NA";
		}
		var openingTime=new Date(r[i].openingDate).toLocaleTimeString('en-GB');
		openingDate = openingdate+" "+openingTime;
		htm = htm + '<tr> ' + ' <td class="col-md-1 center">' + index + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].openingStockId + '</td>'
			+ ' <td class="col-md-1 center">' + r[i].naaration + '</td>'
				+ ' <td class="col-md-1 center">' + openingDate + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].stockSeries + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemId + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemName + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].batchNo + '</td>'
				if(expirayDate == "NA"){
					htm = htm	+ ' <td class="col-md-1 center" style="display:none;">' + expirayDate + '</td>'
				}
				else{
					htm = htm	+ ' <td class="col-md-1 center" style="display:none;">' + getDateWithoutTime(expirayDate) + '</td>'
				}
				
		 		htm = htm + ' <td class="col-md-1 center">' +manuFactureDate + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].totalQty1 + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].addedQuantity+ '</td>'
				/*+ ' <td class="col-md-1 center">' + r[i].availableStockQty+ '</td>'*/
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].latestUOMFactor+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].unitPrice+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].discountInpercentage+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].discountInRs+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].discountAmt+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].baseAmt+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].gst+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].igst+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].totalTaxAmt+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].totalAmt+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].userName+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + r[i].userId+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none">' + insertedDateAndTime+ '</td>'
				+ '</td>' + '</tr>';
		index++;
	}
	$("#itemOpeningStockDetailList").html(htm);
};

/********************************************************************************
 * @since 07-02-2020
 * @comment added this js function to set the consumption list data to dynamic table
 * @author Rohit Sandbhor
 * @param r
 *******************************************************************************/
function setConsumptionListDataToTableForReport11(r) {

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstConsumptionDto.length; i++) {
		for ( var j = 0; j < r.lstConsumptionDto[i].consumptionItemSlaveDto.length; j++) {
			htm = htm + '<tr> ' + ' <td class="col-md-1 center">' + index
					+ '</td>' + ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].id + '</td>'
			if (r.lstConsumptionDto[i].consumedBy == "Individual") {
				htm = htm + ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].dispensedTo + '</td>'
			} else if (r.lstConsumptionDto[i].consumedBy == "Patient") {
				htm = htm + ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].patientName + '</td>'
			}
			htm = htm
					+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].consumedBy
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType
					+ '</td>' + ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].dispensedDate + '</td>'
			if (r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType == "Consumed"
					|| r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType == "NA") {
				htm = htm
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success editBodyPartMaster" disabled data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=editGeneratedConsumptionDetails('
						+ r.lstConsumptionDto[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-primary editBodyPartMaster" data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=viewGeneratedConsumptionDetails('
						+ r.lstConsumptionDto[i].id
						+ ')><i class="fa fa-eye"></i></button></td>'
			} else if (r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType == "In-Use") {
				htm = htm
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=editGeneratedConsumptionDetails('
						+ r.lstConsumptionDto[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-primary editBodyPartMaster" data-toggle="modal" data-target="#generateConsumptionRequestModal"  onclick=viewGeneratedConsumptionDetails('
						+ r.lstConsumptionDto[i].id
						+ ')><i class="fa fa-eye"></i></button></td>'
			}
			+'</tr>';
			index++;
		}
	}
//	$("#itemConsumptionDetailList").html(htm);
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
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	//datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	return datee;
}


/**
 * @author : Rohit Sandbhor
 * @date : 27-12-2019
 * @comment	: This function is created for to get formated date on table
 * @param date
 * @returns
 */
function getDateWithoutTime(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	//datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	datee = ('0' + dd).slice(-2) + "/" + ('0' + mm).slice(-2) + "/" + year;
	return datee;
}



/************
 * @author	: Dayanand Khandekar
 * @date		: 07-feb-2020
 * @codeFor	: setAutoSubInventoryName
 ************/
function setAutoSubInventoryNameForConsumtion(inputID) {

	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alert("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];
	inputs.push('subInventoryName=' + findingName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryM/autoFillSearchOnSubInventory",
				cache : false,
				success : function(r) {

					 if(r.lstSubInventoryMaster.length==0){
						 alertify.error("You Cannot Insert Other Sub Inventory Name...!!!");
							document.getElementById('subInvName').value = "";
							return false;
					 }
					var template = "";
					for ( var j = 0; j < r.lstSubInventoryMaster.length; j++) {

						var arrValue = r.lstSubInventoryMaster[j].id + "-"
								+ r.lstSubInventoryMaster[j].subInventoryName;
						var id = r.lstSubInventoryMaster[j].id;
						var subInventoryName = r.lstSubInventoryMaster[j].subInventoryName;

						resultData.push({
							ID : id,
							Name : subInventoryName
						});
						template = template + '<li data-value="' + id
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					setTimeout(
							function() {
								$("div#searchSubInventoryDivId .typeahead")
										.html(template);
								$("div#searchSubInventoryDivId .typeahead")
										.show();

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
		document.getElementById("subInvId").value = subInventoryId;
		//$("#subInvId").val(subInventoryId);
		//getSubInventoryDetailsById(subInventoryId);
		$("#" + inputID).val(subInventoryName);
	}
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 18-feb-2020
 * @codeFor	: getConsumptionListForConsumtionReport
 ************/
function getConsumptionListForConsumtionReport() {
	var subInvId = $("#subInvId").val();
	if (subInvId == 0 || subInvId == "null" || subInvId == null) {
		alert("Please Select Sub Inventory Name");
		return false;
	}
	$("#searchByType option:selected").val("All");
	//$("#searchByType option:selected").text("All");
	var inputs = [];
	inputs.push('subInvId=' + subInvId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getConsumptionListById',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setConsumptionListDataToTableForReport(r,null);
		}
	});
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 18-feb-2020
 * @codeFor	: setConsumptionListDataToTableForReport
 ************/
function setConsumptionListDataToTableForReport(r,consumptionType) {
	$("#itemConsumptionDetailList").html("");
	if(r.lstConsumptionDto.length==0){
		 alertify.error("Record Not Found....!!!!");
		return false;
	}

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstConsumptionDto.length; i++) {
		for ( var j = 0; j < r.lstConsumptionDto[i].consumptionItemSlaveDto.length; j++) {
			var expDate = getDateWithoutTime(r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchExpDate);
			if(expDate == "01/01/1970" || expDate == "aN/aN/NaN"){
				expDate ="NA";
			 }
			var createDate = new Date(r.lstConsumptionDto[i].createdDateTime).toLocaleDateString('en-GB');
			var createTime = new Date(r.lstConsumptionDto[i].createdDateTime).toLocaleTimeString('en-GB');
			createdDate  = createDate +" "+createTime;
			if(consumptionType == r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType ){
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
	
						+ ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].id
						+ '</td>'
	
						+ ' <td class="col-md-1 center">'
						+ createdDate
						+ '</td>'
	
						+ ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemMasterId
						+ '</td>'
	
						+ ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemName
						+ '</td>'
	
						+ ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchCode
						+ '</td>'
	
						+ ' <td class="col-md-1 center">'
						+ expDate
						+ '</td>'
	
						+ ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].requiredQuantity
						+ '</td>'
						
						+ ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemUomUnit
						+ '</td>'
	
						+ ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType
						+ '</td>'
				if (r.lstConsumptionDto[i].consumedBy == "Patient") {
					htm = htm + ' <td class="col-md-1 center">'
							+ r.lstConsumptionDto[i].patientName + '</td>'
	
				} else if (r.lstConsumptionDto[i].consumedBy == "Individual") {
					htm = htm + ' <td class="col-md-1 center">'
							+ r.lstConsumptionDto[i].dispensedTo + '</td>'
	
				}
	
				htm = htm + ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].consumedBy + '</td>'
	
						+ '</tr>';
				index++;
			}else if(consumptionType == "All"){
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].id
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ createdDate
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemMasterId
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemName
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchCode
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ expDate
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].requiredQuantity
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemUomUnit
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType
				+ '</td>'
				if (r.lstConsumptionDto[i].consumedBy == "Patient") {
					htm = htm + ' <td class="col-md-1 center">'
							+ r.lstConsumptionDto[i].patientName + '</td>'
		
				} else if (r.lstConsumptionDto[i].consumedBy == "Individual") {
					htm = htm + ' <td class="col-md-1 center">'
							+ r.lstConsumptionDto[i].dispensedTo + '</td>'
		
				}
		
				htm = htm + ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].consumedBy + '</td>'
		
						+ '</tr>';
				index++;
			}else if(consumptionType == null){
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].id
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ createdDate
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemMasterId
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemName
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchCode
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ expDate
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].requiredQuantity
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemUomUnit
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType
				+ '</td>'
				if (r.lstConsumptionDto[i].consumedBy == "Patient") {
					htm = htm + ' <td class="col-md-1 center">'
							+ r.lstConsumptionDto[i].patientName + '</td>'
		
				} else if (r.lstConsumptionDto[i].consumedBy == "Individual") {
					htm = htm + ' <td class="col-md-1 center">'
							+ r.lstConsumptionDto[i].dispensedTo + '</td>'
		
				}
		
				htm = htm + ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].consumedBy + '</td>'
		
						+ '</tr>';
				index++;
			}
		}
	}
	$("#itemConsumptionDetailList").html(htm);
};
// this is made by Vishnu for get data consumtion type and subinventory id. 

function getConsumptionTypeListForConsumtionReport() {
	var subInvId = $("#subInvId").val();
	if (subInvId == 0 || subInvId == "null" || subInvId == null) {
		alert("Please Select Sub Inventory Name");
		return false;
	}
	var consumptionType = $("#searchByType option:selected").val();
	var inputs = [];
	inputs.push('subInvId=' + subInvId);
	inputs.push('consumptionType=' + consumptionType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getConsumptionTypeListForConsumtionReport',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setConsumptionListDataToTableForReport(r,consumptionType);
		}
	});
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 18-feb-2020
 * @codeFor	: setConsumptionListDataToTableForReport
 ************/
function getCategoryDiv(call){
	if(call=="all"){
		
		$("#categoryDivId").hide();
		getItemDetailsByCategoryWise(0);
		$("#catName").val("");
	}else{
		$("#categoryDivId").show();
		$("#itemCategoryWiseDetailList").html("");
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : auttosuggestion for Category Master
 ******************************************************************************/
function inventoryCategoryAutoSuggestion(inputID) {
	var type = $("#" + inputID).attr('data-name');
	var resultData = [];
	var categoryName = $("#" + inputID).val();

	if (categoryName == "" || categoryName == null || categoryName == "null"
			|| categoryName == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		//getAllInventoryFormDoc();
		return false;
	}

	var inputs = [];
	inputs.push('categoryName=' + categoryName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/inventoryCategoryAutoSuggestion",
		cache : false,
		success : function(response) {
			if (response.lstcategoaryDoc.length == 0) {
				alertify
				.error("You Cannot Insert Other Category Value...!!!");
		document.getElementById('catName').value = "";
			}
			var template = "";
			for ( var j = 0; j < response.lstcategoaryDoc.length; j++) {
				var arrValue = response.lstcategoaryDoc[j].categoryId + "-"
						+ response.lstcategoaryDoc[j].categoryName;
				var idValue = response.lstcategoaryDoc[j].categoryId;
				var formType = response.lstcategoaryDoc[j].categoryName;
				resultData.push({
					ID : idValue,
					Name : formType
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#searchcategoryDivId .typeahead").html(template);
				$("div#searchcategoryDivId .typeahead").show();

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
		var categoryId = res[0];
		var categoryName = res[1];
			getItemDetailsByCategoryWise(categoryId);
		
		$("input#" + inputID).val(categoryName);
	}
}

function getItemDetailsByCategoryWise(categoryId){
	var categoryType =  $("input[name='rdDept']:checked").val();
	
	var inputs = [];
	inputs.push('categoryType=' + categoryType);
	inputs.push('categoryId=' + categoryId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'GET',
		data : str + "&reqType=AJAX",
		url : 'ehat/invReports/getItemDetailsByCategoryWise',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setitemcategoryWiseReport(r);
		}
	});
}

function setitemcategoryWiseReport(r){
	
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		var expirayDate = getDateWithoutTime(r[i].expirayDate);
		 if(expirayDate == "01/01/1970"){
			 expirayDate ="NA";
		 	}
		htm = htm + '<tr> ' + ' <td class="col-md-1 center">' + index + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].id + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemName + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].batchNo + '</td>'
				+ ' <td class="col-md-1 center">' + expirayDate+ '</td>'
				+ ' <td class="col-md-1 center">' + r[i].categoryName + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].availableStockQty
				+ '</td>' + '</tr>';
		index++;
	}
	$("#itemCategoryWiseDetailList").html(htm);
}


// this is good receipt note reports by Vishnu

function getGoodReceiptNoteReport(){
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'GET',
		data : str + "&reqType=AJAX",
		url : 'ehat/invReports/getGoodReceiptNoteReports',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setGoodReceiptNoteReport(r);
		}
	});
}

function setGoodReceiptNoteReport(r){
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		var grnDate = getDateWithoutTime(r[i].grnDate);
		var createdDate = getDateWithoutTime(r[i].insertedDateAndTime);
		var expirayDate = getDateWithoutTime(r[i].expirayDate);
		var batchCode = r[i].batchNo;
		 if(expirayDate == "1970-01-01" || expirayDate == null){
			 expirayDate ="NA";
		 }
		 if(batchCode == 0 || batchCode == "0" ){
			 batchCode ="NA"; 
		 }
		htm = htm 
				+ '<tr> ' 
				+ ' <td class="col-md-1 center">' + index + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].id + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].partyMasterName + '</td>'
				+ ' <td class="col-md-1 center">' + grnDate + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].stockSeries + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].grnPurchaseInvoiceNo + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemId + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemName + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].batchNo + '</td>'
				+ ' <td class="col-md-1 center">' + expirayDate + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].manuFactureDate + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].availableStockQty1 + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].addedQuantity + '</td>'
				/*+ ' <td class="col-md-1 center" style="display: none;">' + r[i].totalQty + '</td>'*/
				/*+ ' <td class="col-md-1 center" style="display: none;">' + r[i].canceledQty + '</td>'*/
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].latestUOMFactor + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].unitPrice1 + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].discountInpercentage + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].discountInRs + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].discountAmt + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].baseAmt + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].gst + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].igst + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].totalTaxAmt + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].totalAmt + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].purchaseOrder.substring( 0, r[i].purchaseOrder.indexOf( " :" ) ) + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].purchaseOrderNumber + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].userName + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].userId + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + createdDate + '</td>' 
				+ '</tr>';
		index++;
	}
	$("#goodReceiptNoteExcelReportList").html(htm);
}


//this is MRN Issue reports by Vishnu

function getMrnIssueReports(){
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'GET',
		data : str + "&reqType=AJAX",
		url : 'ehat/invReports/getMrnIssueReports',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setMrnIssueReports(r);
		}
	});
}

function setMrnIssueReports(r){
	
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		var batchCode = r[i].batchNo;
		var availableStockQty = r[i].availableStockQty;
		var mainStoreQuantity = r[i].availableStockQty - r[i].addedQuantity;
		var createDate = new Date(r[i].insertedDateAndTime).toLocaleDateString('en-GB');
		var createTime = new Date(r[i].insertedDateAndTime).toLocaleTimeString('en-GB');
		createdDate  = createDate+" "+createTime;
		var expirayDate = getDateWithoutTime(r[i].batchExpiryDate);
	     if(expirayDate == "1970-01-01" || expirayDate == null || expirayDate == '' || expirayDate == "NaN-aN-aN"){
			 expirayDate ="NA";
		 }
		 if(batchCode == 0 || batchCode == "0" ){
			 batchCode ="NA"; 
		 }
		 if(availableStockQty == null || availableStockQty == "null"){
			 availableStockQty = 0;
		 }
		htm = htm 
				+ '<tr> ' 
				+ ' <td class="col-md-1 center">' + index + '</td>'
				+ ' <td class="col-md-1 center">' + createdDate + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].generatedMrnId + '</td>'
				+ ' <td class="col-md-1 center">'+ r[i].subInventoryName +'</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemId + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemName + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].batchNo + '</td>'
				+ ' <td class="col-md-1 center">' + expirayDate + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].availableStockQty + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].mainInventoryStock + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].latestUOMFactor + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].requestedQty + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].addedQuantity + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].canceledQty + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].pendingQty + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].subRemarks + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].userName + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].userId + '</td>'
				+ '</tr>';
		index++;
	}
	$("#goodReceiptNoteExcelReportList").html(htm);
}

/**
 * @since 02-09-2020
 * @comment created this function to get stock return report
 * @author Rohit Sandbhor
 */
function getStockReturnReports(){
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'GET',
		data : str + "&reqType=AJAX",
		url : 'ehat/invReports/getStockReturnReports',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setStockReturnReports(r);
		}
	});
}
/**
 * @since 02-09-2020
 * @comment created this function to set stock return report
 * @author Rohit Sandbhor
 * @param r
 */
function setStockReturnReports(r){
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		var batchCode = r[i].batchNo;
		var currentSubInvStock = r[i].availableStockQty;
		var createdDate = getDate(r[i].insertedDateAndTime);
		var expirayDate = getDateWithoutTime(r[i].batchExpiryDate);
		var availableQty = r[i].mainInventoryStock - r[i].stockReturnQty;
		 if(expirayDate == "1970-01-01"){
			 expirayDate ="NA";
		 }
		 if(batchCode == 0 || batchCode == "0" ){
			 batchCode ="NA"; 
		 }
		 if(currentSubInvStock == null || currentSubInvStock == "null"){
			 currentSubInvStock = 0;
		 }
		htm = htm 
				+ '<tr> ' 
				+ ' <td class="col-md-1 center">' + index + '</td>'
				+ ' <td class="col-md-1 center">' + createdDate + '</td>' 
				+ ' <td class="col-md-1 center">' + r[i].id + '</td>'
				+ ' <td class="col-md-1 center">'+r[i].subInventoryName +'</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemId + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].itemName + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].batchNo + '</td>'
				+ ' <td class="col-md-1 center">' + expirayDate + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].stockReturnQty + '</td>'
				/*+ ' <td class="col-md-1 center">' + availableQty + '</td>'*/
				+ ' <td class="col-md-1 center">' + (availableQty + r[i].stockReturnQty) + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].latestUOMFactor + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].stockReturnReason + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].narration + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].userName + '</td>'
				+ ' <td class="col-md-1 center" style="display: none;">' + r[i].userId + '</td>'
				+ '</tr>';
		index++;
	}
	$("#stockReturnExcelReportList").html(htm);
}

function getAllInventoryStockReport() {

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/invReports/getInventoryStockReport",
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

function setDataToStockTable(r, templateName) {
	var htm = "";
	var htm1 = "";
	var index = 1;
	var indexSub = 1;
	if (templateName != "subInvItem") {
	for ( var i = 0; i < r.lstBatchStockDto.length; i++) {
		//alert("r.lstBatchStockDto[i].itemUOMName::"+r.lstBatchStockDto[i].itemUOMName);
		var expDate = getDateWithoutTime(r.lstBatchStockDto[i].itemBatchExpDate);
		if(expDate == "01/01/1970" || expDate == "aN/aN/NaN"){
			expDate="NA";	
		}
		htm = htm + '<tr> ' + ' <td class="col-md-1 center">' + index + '</td>'
				+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemMasterId + '</td>'
				+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemName + '</td>'
				if(r.lstBatchStockDto[i].itemBatchCode == 0){
					htm = htm+ ' <td class="col-md-1 center">NA</td>'
				}else{
					htm = htm+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemBatchCode + '</td>'
				}
		        htm = htm + ' <td class="col-md-1 center">' + expDate + '</td>'
				+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemQuantity + '</td>'
				+ ' <td class="col-md-1 center">' + r.lstBatchStockDto[i].itemUOMName + '</td>'
				+ '</td>' + '</tr>';
		index++;
	
	}
	}
	if (templateName == "subInvItem") {
		for ( var i = 0; i < r.goodsIssueMrnItemSlaveDtos.length; i++) {
			var expDate = getDateWithoutTime(r.goodsIssueMrnItemSlaveDtos[i].itemBatchExpDate);
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
					+ ' <td class="col-md-1 center">' + r.goodsIssueMrnItemSlaveDtos[i].currentSubInventoryStockUpdated + '</td>'
					+ '</td>' + '</tr>';
			indexSub++;
		}
		$("#stockAuditItemById").html(htm1);
	} else {
		$("#inventoryReports").html(htm);
	}
}
function getInventoryStockAutoSuggestion(stockId, callForm) {
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
		url : "ehat/invReports/getInventoryStockAutoSuggestion",
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

function getAllItemId(id) {
	var inputs = [];
	inputs.push('item_id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invReports/getAllItemById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			setDataToStockTable(response);
		}
	});
}

function onClearText(text){
	if(text=="clearSubInv"){
		$("#subInvSearchText").val("");
	}
	else{
		$("#stockItemName").val("");
	}
}

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
				url : "ehat/invReports/getSubInvBySuggestion",
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
function getAllsubInvById(id) {
	
	var inputs = [];
	inputs.push('subInvId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/stock/getSubInvDataById",
		//url : "ehat/invReports/getSubInvStockById",
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

/************
 * @author	: Vishnu Thorat
 * @date		: 20-Oct-2020
 * @codeFor	: getAllConsumptionListForConsumtionReport
 ************/
function getAllConsumptionListForConsumtionReport() {
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'GET',
		data : str + "&reqType=AJAX",
		url : 'ehat/subInventory/getAllConsumptionList',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setAllConsumptionListDataToTableForReport(r);
		}
	});
}

/************
 * @author	: Vishnu Thorat
 * @date		: 20-Oct-2020
 * @codeFor	: setAllConsumptionListDataToTableForReport
 ************/
function setAllConsumptionListDataToTableForReport(r) {
	if(r.lstConsumptionDto.length==0){
		 alertify.error("Record Not Found....!!!!");
		return false;
	}

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstConsumptionDto.length; i++) {
		for ( var j = 0; j < r.lstConsumptionDto[i].consumptionItemSlaveDto.length; j++) {
			var expDate = getDateWithoutTime(r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchExpDate);
			if(expDate == "01/01/1970" || expDate == "aN/aN/NaN"){
				expDate ="NA";
			 }
			var createDate = new Date(r.lstConsumptionDto[i].createdDateTime).toLocaleDateString('en-GB');
			var createTime = new Date(r.lstConsumptionDto[i].createdDateTime).toLocaleTimeString('en-GB');
			createdDate  = createDate +" "+createTime;
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'

					+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].id
					+ '</td>'

					+ ' <td class="col-md-1 center">'
					+ createdDate
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].subinvName
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemMasterId
					+ '</td>'

					+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemName
					+ '</td>'

					+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemBatchCode
					+ '</td>'

					+ ' <td class="col-md-1 center">'
					+ expDate
					+ '</td>'

					+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].requiredQuantity
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].itemUomUnit
					+ '</td>'

					+ ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].consumptionItemSlaveDto[j].consumptionType
					+ '</td>'
			if (r.lstConsumptionDto[i].consumedBy == "Patient") {
				htm = htm + ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].patientName + '</td>'

			} else if (r.lstConsumptionDto[i].consumedBy == "Individual") {
				htm = htm + ' <td class="col-md-1 center">'
						+ r.lstConsumptionDto[i].dispensedTo + '</td>'

			}

			htm = htm + ' <td class="col-md-1 center">'
					+ r.lstConsumptionDto[i].consumedBy + '</td>'

					+ '</tr>';
			index++;
		}
	}
	$("#allItemConsumptionDetailList").html(htm);
}

/************
 * @author	: Vishnu Thorat
 * @date		: 20-Oct-2020
 * @codeFor	: getAllSubInvStock
 ************/
function getAllSubInvStock() {
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invReports/getAllSubInvStock",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			setAllSubInvStockTable(response);
		}
	});
}

/************
 * @author	: Vishnu Thorat
 * @date		: 20-Oct-2020
 * @codeFor	: setAllSubInvStockTable
 ************/

function setAllSubInvStockTable(r) {
	var htm1 = "";
	var indexSub = 1;
	for ( var i = 0; i < r.goodsIssueMrnItemSlaveDtos.length; i++) {
		var expDate = getDateWithoutTime(r.goodsIssueMrnItemSlaveDtos[i].itemBatchExpDate);
		if(expDate == "1970-01-01" || expDate == "NaN-aN-aN"){
			expDate ="NA";
		 }
		htm1 = htm1 + '<tr> ' + ' <td class="col-md-1 center">' + indexSub + '</td>'
				+ ' <td class="col-md-1 center">' + r.goodsIssueMrnItemSlaveDtos[i].itemMasterId + '</td>'
				+ ' <td class="col-md-1 center">' + r.goodsIssueMrnItemSlaveDtos[i].itemName + '</td>'
				+ ' <td class="col-md-1 center">' + r.goodsIssueMrnItemSlaveDtos[i].subinventoryName + '</td>';
				if(r.goodsIssueMrnItemSlaveDtos[i].itemBatchCode == 0){
					htm1 = htm1	+ ' <td class="col-md-1 center">NA</td>';
				}else{
					htm1 = htm1	+ ' <td class="col-md-1 center">' + r.goodsIssueMrnItemSlaveDtos[i].itemBatchCode + '</td>';
				}
				htm1 = htm1+ ' <td class="col-md-1 center">' + expDate	+ '</td>'
				+ '<td class="col-md-1 center">' + r.goodsIssueMrnItemSlaveDtos[i].currentSubInventoryStockUpdated + '</td>' 
				+ '</tr>';
		indexSub++;
	}
	$("#allSubInvStock").html(htm1);
}
