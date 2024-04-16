/*
 * /*#Date:- 23-10-2019
 * #Author:- Rohit
 * #CodeFor:- Below js code to perform search operation
 */

var rowCount = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;
var minLen;
var maxLen;

function fetchFinancialDetails() {

	var financialYear = document.getElementById('searchYearValueId').value;
	if (financialYear == "") {
		alertify.error("Enter Financial Year First..!!");
	}
	var inputs = [];
	inputs.push('year=' + financialYear);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryM/getFinancialYearDetails',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setFinancialDataToTable(r);
		}
	});
}
// #########################
/*
 * #Date:- 23-10-2019 #Author:- Rohit #CodeFor:- Below js code to save the
 * record into inv_financial_year_new table
 */
function saveFinancialYearData() {
	var startDate = $('#startDateId').val();
	var endDate = $('#endDateId').val();
	var financialYear = $('#financialYear').val();
	var financialId = $('#financialId').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	if (startDate == "" || endDate == "" || financialYear == "") {
		alertify.error("Please Fill The Details Properly!!");
		return false;
	}
	var inputs = [];
	inputs.push('yearStartDate=' + startDate);
	inputs.push('yearEndDate=' + endDate);
	inputs.push('year=' + financialYear);
	inputs.push('id=' + financialId);
	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	$
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/inventoryM/saveFinancialYearDetails",
				data : str + "&reqType=AJAX",
				catche : false,
				success : function(data) {
					if (data == 1) {
						alertify.success("Records Saved Sucessfully111");

					} else if (data == 2) {
						alertify.success("Records Updated Sucessfully");
					} else if (data == 3) {
						alertify
								.error("Financial Year Is Already Present IN The Records");
					} else {
						alertify.error("Oops Some Problem Ocured");
					}
					refreshFinancialMaster();
					getAllFinancialMasterRecords();
					// below line to set current date on datepicker
					$('#startDateId').datepicker('setDate', 'now');
				},
				error : function() {
					alert('Network Issue..!!');
				}
			});
}
// #########################
/*
 * #Date:- 23-10-2019 #Author:- Rohit #CodeFor:- Below js code to show all
 * record from inv_financial_year_new table
 */
function getAllFinancialMasterRecords() {


	var unitId = $("#unitId").val();
		var inputs = [];
		
		inputs.push('unitId=' + unitId);
		var str = inputs.join('&');
		
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/getAllFinancialMasterRecords",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setFinancialDataToTable(r);
		}
	});
}

// #########################
/*
 * #Date:- 23-10-2019 #Author:- Rohit #CodeFor:- Below js code to show the
 * records from financial master table and showing it dynamically
 */
function setFinancialDataToTable(r) {

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstFinancialMaster.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstFinancialMaster[i].yearStartDate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstFinancialMaster[i].yearEndDate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstFinancialMaster[i].year
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editFinancialMaster('
				+ r.lstFinancialMaster[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteFinancialMaster('
				+ r.lstFinancialMaster[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#financialRecordsList").html(htm);
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 23-10-2019 @codeFor: below js function to
 * edit the financial master data details
 */
function editFinancialMaster(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editFinancialMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$('#startDateId').val(r.yearStartDate);
			$('#endDateId').val(r.yearEndDate);
			$('#financialYear').val(r.year);
			$('#financialId').val(r.id);
			
		}
	});
}

// #########################
/*
 * @author:- Rohit sandbhor @date:- 23-10-2019 @codeFor: below js function to
 * edit the financial master data details
 */
function deleteFinancialMaster(id) {
	var r = confirm("Are You Sure You Want To Delete Financial Master Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteFinancialMaster",
			data : {
				"id" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('Network Issue..!!');
			},
			success : function(response) {
				alertify.error(response);
				refreshFinancialMaster();
				getAllFinancialMasterRecords();
			}
		});
	}
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 23-10-2019 @codeFor: below js function to
 * refresh the values on financial master jsp page
 */
function refreshFinancialMaster() {
	$('#startDateId').val("");
	$('#endDateId').val("");
	$('#financialYear').val("");
	$('#financialId').val(0);
	// toggleEntryDiv('divForEntry');
	return false;
}
// #########################
/*
 * #Date:- 23-10-2019 #Author:- Rohit #CodeFor:- Below js code to save the
 * record into inv_warehouse_new table
 */
function saveWarehouseMasterDetails() {
	var warehouseName = $('#warehouseNameId').val();
	var warehouseLocation = $('#warehouseLocationId').val();
	var warehouseId = $('#warehouseId').val();
	var contactNumber1 = $('#contactNumber1').val();
	var contactNumber2 = $('#contactNumber2').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	if (warehouseName == "" || warehouseLocation == "") {
		alertify.error("Please Fill The Details Properly!!");
		return false;
	}
	var inputs = [];
	inputs.push('warehouseName=' + warehouseName);
	inputs.push('warehouseLocation=' + warehouseLocation);
	inputs.push('contactNumber1=' + contactNumber1);
	inputs.push('contactNumber2=' + contactNumber2);
	inputs.push('id=' + warehouseId);
	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		url : 'ehat/inventoryM/saveWarehouseMasterDetails',
		type : 'POST',
		data : str + "&reqType=AJAX",
		success : function(data) {

			if (data == 1) {
				alertify.success("Records Saved Successfully");
			} else if (data == 2) {
				alertify.success("Records Updated Successfully");
			} else if (data == 3) {
				alertify.error("Warehouse Name is Already Exist");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			refreshWarehouseMaster();
			getAllWarehouseMasterRecords();
		},
		error : function() {
			alert('Network Issue..!!');
		}
	});
}
// #########################
/*
 * #Date:- 23-10-2019 #Author:- Rohit #CodeFor:- Below js code to show all
 * record from inv_warehouse_master_new table
 */
function getAllWarehouseMasterRecords() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/getAllWarehouseMasterRecords",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setWarehouseDataToTable(r);
		}
	});
}
// #########################

/*
 * #Date:- 25-10-2019 #Author:- Rohit #CodeFor:- Below js code to show the
 * records from warehouse master table and showing it dynamically
 */
function setWarehouseDataToTable(r) {

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstWarehouseMaster.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstWarehouseMaster[i].warehouseName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstWarehouseMaster[i].warehouseLocation
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editWarehouseMaster('
				+ r.lstWarehouseMaster[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteWarehouseMaster('
				+ r.lstWarehouseMaster[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#warehouseRecordsList").html(htm);
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 23-10-2019 @codeFor: below js function to
 * edit the warehouse master data details
 */
function editWarehouseMaster(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editWarehouseMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$('#warehouseNameId').val(r.warehouseName);
			$('#warehouseLocationId').val(r.warehouseLocation);
			$('#warehouseId').val(r.id);
			$('#contactNumber1').val(r.contactNumber1);
			$('#contactNumber2').val(r.contactNumber2);
			toggleEntryDiv('divForEdit');
		}
	});
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 23-10-2019 @codeFor: below js function to
 * edit the warehouse master data details
 */
function deleteWarehouseMaster(id) {
	var r = confirm("Are You Sure You Want To Delete Warehouse Master Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteWarehouseMaster",
			data : {
				"id" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshWarehouseMaster();
			}
		});
	}
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 23-10-2019 @codeFor: below js function to
 * refresh the values on warehouse master jsp page
 */
function refreshWarehouseMaster() {
	$('#warehouseNameId').val("");
	$('#warehouseLocationId').val("");
	$('#warehouseId').val(0);
	$('#contactNumber2').val("");
	$('#contactNumber1').val("");
	getAllWarehouseMasterRecords();
	// toggleEntryDiv('divForEntry');
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 25-10-2019 @codeFor: below js function to
 * perform autofill search operation on warehouse master POJO
 */
function setAutoWarehouseName(inputID) {
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
	inputs.push('warehouseName=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/autoFillSearchOnWarehouse",
		cache : false,
		success : function(r) {
			if (r.lstWarehouseMaster.length == 0) {
				alertify.error("Data Not Found...!!!");
			}
			var template = "";
			for ( var j = 0; j < r.lstWarehouseMaster.length; j++) {

				var arrValue = r.lstWarehouseMaster[j].id + "-"
						+ r.lstWarehouseMaster[j].warehouseName + "-"
						+ r.lstWarehouseMaster[j].warehouseLocation;
				var id = r.lstWarehouseMaster[j].id;
				var warehouseName = r.lstWarehouseMaster[j].warehouseName;
				resultData.push({
					ID : id,
					Name : warehouseName
				});
				if (categoryName == "warehouseMaster") {
					template = template + '<li data-value="' + id
							+ '" class=""><a href="#">' + arrValue
							+ '</a></li>';
				}
				// below else condition for itemWarehouseMaster list
				else {
					template = template + '<li data-value="' + id
							+ '" class=""><a href="#">' + warehouseName
							+ '</a></li>';
				}
			}
			setTimeout(function() {
				$("div#searchWarehouseDivId .typeahead").html(template);
				$("div#searchWarehouseDivId .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayWarehouseSearchResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	// below function to set the search value to search text feild and calling
	// getWarehouseDetailsById function
	function displayWarehouseSearchResult(item) {
		var res = item.text.split('-');
		var warehouseId = "";
		warehouseId = res[0];
		var warehouseName = res[1];
		getWarehouseDetailsById(warehouseId);
		$("#" + inputID).val(warehouseName);
	}
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 25-10-2019 @codeFor: below js function to
 * set find the warehouse master details and setting data to table
 */
function getWarehouseDetailsById(warehouseId) {
	var inputs = [];
	inputs.push('id=' + warehouseId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryM/getWarehouseDetails',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			// here we calling another function to set the data to table
			setWarehouseDataToTable(r);
		}
	});
}
// #########################
/*
 * #Date:- 30-10-2019 #Author:- Rohit #CodeFor:- Below js code to save the
 * record into inv_packing_new table
 */
function savePackingMasterDetails() {
	var packingName = $('#packingNameId').val();
	var packingId = $('#packingId').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	if (packingName == "") {
		alertify.error("Please Fill The Details Properly!!");
		return false;
	}
	var inputs = [];
	inputs.push('packingName=' + packingName);
	inputs.push('id=' + packingId);
	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				url : 'ehat/inventoryM/savePackingMasterDetails',
				type : 'POST',
				data : str + "&reqType=AJAX",
				success : function(data) {

					if (data == 1) {
						alertify.success("Records Saved Sucessfully");
					} else if (data == 2) {
						alertify.success("Records Updated Sucessfully");
					} else if (data == 3) {
						alertify
								.error("Packing Name Already Present In The System...");
					} else {
						alertify.error("Oops Some Problem Ocured");
					}
					refreshPackingMaster();
					getAllPackingMasterRecords();
				},
				error : function() {
					alert('Network Issue..!!');
				}
			});
}
// #########################
/*
 * #Date:- 30-10-2019 #Author:- Rohit #CodeFor:- Below js code to show all
 * record from inv_packing_master_new table
 */
function getAllPackingMasterRecords() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/getAllPackingMasterRecords",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setPackingDataToTable(r);
		}
	});
}
// #########################

/*
 * #Date:- 30-10-2019 #Author:- Rohit #CodeFor:- Below js code to show the
 * records from packing master table and showing it dynamically
 */
function setPackingDataToTable(r) {

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstPackingMaster.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstPackingMaster[i].packingName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editPackingMaster('
				+ r.lstPackingMaster[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deletePackingMaster('
				+ r.lstPackingMaster[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#packingRecordsList").html(htm);
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * edit the packing master data details
 */
function editPackingMaster(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editPackingMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$('#packingNameId').val(r.packingName);
			$('#packingId').val(r.id);
			toggleEntryDiv('divForEdit');
		}
	});
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * edit the packing master data details
 */
function deletePackingMaster(id) {
	var r = confirm("Are You Sure You Want To Delete Packing Master Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deletePackingMaster",
			data : {
				"id" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('Network Issue..!!');
			},
			success : function(response) {
				alertify.error(response);
				refreshPackingMaster();
			}
		});
	}
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * refresh the values on packing master jsp page
 */
function refreshPackingMaster() {
	$('#packingNameId').val("");
	$('#packingId').val(0);
	getAllPackingMasterRecords();
	// toggleEntryDiv('divForEntry');
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * perform autofill search operation on packing master POJO
 */
function setAutoPackingName(inputID) {
	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];
	inputs.push('packingName=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/autoFillSearchOnPacking",
		cache : false,
		success : function(r) {
			if (r.lstPackingMaster.length == 0) {
				alertify.error("Data Not Found...!!!");
			}
			var template = "";
			for ( var j = 0; j < r.lstPackingMaster.length; j++) {

				var arrValue = r.lstPackingMaster[j].id + "-"
						+ r.lstPackingMaster[j].packingName;
				var id = r.lstPackingMaster[j].id;
				var packingName = r.lstPackingMaster[j].packingName;

				resultData.push({
					ID : id,
					Name : packingName
				});
				template = template + '<li data-value="' + id
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			setTimeout(function() {
				$("div#searchPackingDivId .typeahead").html(template);
				$("div#searchPackingDivId .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayPackingSearchResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	// below function to set the search value to search text feild and calling
	// getPackingDetailsById function
	function displayPackingSearchResult(item) {
		var res = item.text.split('-');
		var packingId = res[0];
		var packingName = res[1];
		getPackingDetailsById(packingId);
		$("#" + inputID).val(packingName);
	}
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * set find the packing master details and setting data to table
 */
function getPackingDetailsById(packingId) {
	var inputs = [];
	inputs.push('id=' + packingId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryM/getPackingDetails',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			// here we calling another function to set the data to table
			setPackingDataToTable(r);
		}
	});
}
// #########################
/*
 * #Date:- 30-10-2019 #Author:- Rohit #CodeFor:- Below js code to save the
 * record into inv_subinventory_master_new table
 */
function saveSubInventoryMasterDetails() {
	var subInventoryName = $('#subInventoryNameId').val();
	var contactNumber = $('#contactNumberId').val();
	var contactNumber2 = $('#contactNumber2').val();
	var subInventoryId = $('#subInventoryId').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	if (subInventoryName == "") {
		alertify.error("Please Fill The Details Properly!!");
		return false;
	}
	var inputs = [];
	inputs.push('subInventoryName=' + subInventoryName);
	inputs.push('contactNumber=' + contactNumber);
	inputs.push('contactNumber2=' + contactNumber2);
	inputs.push('id=' + subInventoryId);
	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		url : 'ehat/inventoryM/saveSubInventoryMasterDetails',
		type : 'POST',
		data : str + "&reqType=AJAX",
		success : function(data) {
			if (data == 1) {
				alertify.success("Records Saved Sucessfully");

			} else if (data == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (data == 3) {
				alertify.error("Sub-Inventory Name is Already Exist");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			refreshSubInventoryMaster();
			getAllSubInventoryMasterRecords();
		},
		error : function() {
			alert('Network Issue..!!');
		}
	});
}
// #########################
/*
 * #Date:- 30-10-2019 #Author:- Rohit #CodeFor:- Below js code to show all
 * record from inv_subinventory_master_new table
 */
function getAllSubInventoryMasterRecords() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/getAllSubInventoryMasterRecords",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setSubInventoryDataToTable(r);
		}
	});
}
// #########################
/*
 * #Date:- 30-10-2019 #Author:- Rohit #CodeFor:- Below js code to show the
 * records from sub-inventory master table and showing it dynamically
 */
function setSubInventoryDataToTable(r) {
	
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
		
		var numberOfRows="";
		var indexNew=1;
		var count=r.noOfPages;
		var numberOfPages=(count/10);
		
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
			displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			numberOfRows +="<li onclick='paginationSubInvMaster("+indexNew+");'><a>"+indexNew+"</a></li>";
			indexNew=indexNew+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationSubInvMaster("+indexNew+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesSubInvMaster').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#sunInventoryMasterRecordPagination').html(numberOfRows);
	}
	$("#subInventoryRecordsList").html(htm);
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * edit the sub-inventory master data details
 */
function editSubInventoryMaster(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editSubInventoryMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$('#subInventoryNameId').val(r.subInventoryName);
			$('#contactNumberId').val(r.contactNumber);
			$('#subInventoryId').val(r.id);
			$('#contactNumber2').val(r.contactNumber2);
			toggleEntryDiv('divForEdit');
		}
	});
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * delete the sub-inventory master data details
 */
function deleteSubInventoryMaster(id) {
	var r = confirm("Are You Sure You Want To Delete Sub-Inventory Master Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteSubInventoryMaster",
			data : {
				"id" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('Network Issue..!!');
			},
			success : function(response) {
				refreshSubInventoryMaster();
			}
		});
	}
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * refresh the values on packing master jsp page
 */
function refreshSubInventoryMaster() {
	$('#subInventoryNameId').val("");
	$('#contactNumberId').val("");
	$('#subInventoryId').val(0);
	$('#contactNumber2').val("");
	getAllSubInventoryMasterRecords();
	// toggleEntryDiv('divForEntry');
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * perform autofill search operation on sub-inventory master POJO
 */
function setAutoSubInventoryName(inputID) {

	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alertify.error("Please enter search value");
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
					if (r.lstSubInventoryMaster.length == 0) {
						alertify.error("Data Not Found...!!!");
					}
					var template = "";
					for ( var j = 0; j < r.lstSubInventoryMaster.length; j++) {

						var arrValue = r.lstSubInventoryMaster[j].id + "-"
								+ r.lstSubInventoryMaster[j].subInventoryName
								+ "-"
								+ r.lstSubInventoryMaster[j].contactNumber;
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
	// below function to set the search value to search text feild and calling
	// getPackingDetailsById function
	function displaySubInventorySearchResult(item) {
		var res = item.text.split('-');
		var subInventoryId = res[0];
		var subInventoryName = res[1];
		getSubInventoryDetailsById(subInventoryId);
		$("#" + inputID).val(subInventoryName);
	}
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * set find the sub-inventory master details and setting data to table
 */
function getSubInventoryDetailsById(subInventoryId) {
	var inputs = [];
	inputs.push('id=' + subInventoryId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryM/getSubInventoryDetails',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			// here we calling another function to set the data to table
			setSubInventoryDataToTable(r);
		}
	});
}
// #########################
/*
 * #Date:- 31-10-2019 #Author:- Rohit #CodeFor:- Below js code to save the
 * record into inv_abcanalysys_master_new table
 */
function saveAbcRangeAnalysisMasterDetails() {
	var itemAMinRange = $('#itemAMinRangeID').val();
	var itemAMaxRange = $('#itemAMaxRangeID').val();
	var itemBMinRange = $('#itemBMinRangeID').val();
	var itemBMaxRange = $('#itemBMaxRangeID').val();
	var itemCMinRange = $('#itemCMinRangeID').val();
	var itemCMaxRange = $('#itemCMaxRangeID').val();
	var abcRangeAnalysysId = $('#abcRangeAnalysysId').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	if (itemAMinRange == "" || itemAMaxRange == "" || itemBMinRange == ""
			|| itemBMaxRange == "" || itemCMinRange == ""
			|| itemCMaxRange == "") {
		alertify.error("Please Fill The Details Properly!!");
		return false;
	}
	var inputs = [];
	inputs.push('itemAMinRange=' + itemAMinRange);
	inputs.push('itemAMaxRange=' + itemAMaxRange);
	inputs.push('itemBMinRange=' + itemBMinRange);
	inputs.push('itemBMaxRange=' + itemBMaxRange);
	inputs.push('itemCMinRange=' + itemCMinRange);
	inputs.push('itemCMaxRange=' + itemCMaxRange);
	inputs.push('id=' + abcRangeAnalysysId);
	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		url : 'ehat/inventoryM/saveAbcRangeAnalysisMasterDetails',
		type : 'POST',
		data : str + "&reqType=AJAX",
		success : function(data) {
			if (data == 1) {
				alertify.success("Records Saved Sucessfully");

			} else if (data == 2) {
				alertify.success("Records Updated Sucessfully");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			refreshAbcAnalysisMaster();
			getAllAbcAnalysisMasterRecords();
		},
		error : function() {
			alert('Network Issue..!!');
		}
	});
}
// #########################
/*
 * #Date:- 31-10-2019 #Author:- Rohit #CodeFor:- Below js code to show all
 * record from inv_abcanalysys_master_new table
 */
function getAllAbcAnalysisMasterRecords() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/getAllAbcAnalysisMasterRecords",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setAbcAnalysisDataToTable(r);
		}
	});
}
// #########################

/*
 * #Date:- 30-10-2019 #Author:- Rohit #CodeFor:- Below js code to show the
 * records from inv_abcanalysys_master_new table and showing it dynamically
 */
function setAbcAnalysisDataToTable(r) {

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstAbcAnalysisMaster.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAbcAnalysisMaster[i].itemAMinRange
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAbcAnalysisMaster[i].itemAMaxRange
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAbcAnalysisMaster[i].itemBMinRange
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAbcAnalysisMaster[i].itemBMaxRange
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAbcAnalysisMaster[i].itemCMinRange
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstAbcAnalysisMaster[i].itemCMaxRange
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editAbcAnalysisMaster('
				+ r.lstAbcAnalysisMaster[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteAbcAnalysisMaster('
				+ r.lstAbcAnalysisMaster[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#abcAnalysisRecordsList").html(htm);
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 31-10-2019 @codeFor: below js function to
 * edit the inv_abcanalysys_master_new data details
 */
function editAbcAnalysisMaster(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editAbcAnalysisMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$('#itemAMinRangeID').val(r.itemAMinRange);
			$('#itemAMaxRangeID').val(r.itemAMaxRange);
			$('#itemBMinRangeID').val(r.itemBMinRange);
			$('#itemBMaxRangeID').val(r.itemBMaxRange);
			$('#itemCMinRangeID').val(r.itemCMinRange);
			$('#itemCMaxRangeID').val(r.itemCMaxRange);
			$('#abcRangeAnalysysId').val(r.id);
			toggleEntryDiv('divForEdit');
		}
	});
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 31-10-2019 @codeFor: below js function to
 * delete the inv_abcanalysys_master_new master data details
 */
function deleteAbcAnalysisMaster(id) {
	var r = confirm("Are You Sure You Want To Delete Abc Analysis Master Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteAbcAnalysisMaster",
			data : {
				"id" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				// alertify.error(response);
				refreshAbcAnalysisMaster();
			}
		});
	}
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * refresh the values on Abc Analysis master jsp page
 */
function refreshAbcAnalysisMaster() {
	$('#itemAMinRangeID').val("");
	$('#itemAMaxRangeID').val("");
	$('#itemBMinRangeID').val("");
	$('#itemBMaxRangeID').val("");
	$('#itemCMinRangeID').val("");
	$('#itemCMaxRangeID').val("");
	$('#abcRangeAnalysysId').val(0);
	getAllAbcAnalysisMasterRecords();
	// toggleEntryDiv('divForEntry');
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 30-10-2019 @codeFor: below js function to
 * perform autofill search operation on sub-inventory master POJO
 */
function setAutoAbcAnalysisId(inputID) {

	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];
	inputs.push('id=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/autoFillSearchOnAbcAnalysis",
		cache : false,
		success : function(r) {

			var template = "";
			for ( var j = 0; j < r.lstAbcAnalysisMaster.length; j++) {

				var arrValue = r.lstAbcAnalysisMaster[j].id + "-"
						+ r.lstAbcAnalysisMaster[j].itemAMinRange + "-"
						+ r.lstAbcAnalysisMaster[j].itemAMaxRange + "-"
						+ r.lstAbcAnalysisMaster[j].itemBMinRange + "-"
						+ r.lstAbcAnalysisMaster[j].itemBMaxRange + "-"
						+ r.lstAbcAnalysisMaster[j].itemCMinRange + "-"
						+ r.lstAbcAnalysisMaster[j].itemCMaxRange;
				var id = r.lstAbcAnalysisMaster[j].id;
				var itemAMinRange = r.lstAbcAnalysisMaster[j].itemAMinRange;

				resultData.push({
					ID : id,
					Name : itemAMinRange
				});
				template = template + '<li data-value="' + id
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			setTimeout(function() {
				$("div#searchAbcAnalysisDivId .typeahead").html(template);
				$("div#searchAbcAnalysisDivId .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayAbcAnalysisSearchResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	// below function to set the search value to search text feild and calling
	// getPackingDetailsById function
	function displayAbcAnalysisSearchResult(item) {
		var res = item.text.split('-');
		var abcAnalysisId = res[0];
		var itemAMinRange = res[1];
		getAbcAnalysisDetailsById(abcAnalysisId);
		$("#" + inputID).val(itemAMinRange);
	}
}
// #########################
/*
 * @author:- Rohit sandbhor @date:- 31-10-2019 @codeFor: below js function to
 * set find the AbcAnalysis master details and setting data to table
 */
function getAbcAnalysisDetailsById(abcAnalysisId) {
	var inputs = [];
	inputs.push('id=' + abcAnalysisId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryM/getAbcAnalysisDetails',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			// here we calling another function to set the data to table
			setAbcAnalysisDataToTable(r);
		}
	});
}
/*
 * @author:- Vishnu Thorat @date:- 23-10-2019 @codeFor: below js function to
 * save master documents jsp page
 */

function saveInventoryDocument() {

	var documentName = $("#document_name").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var doc_id = $("#doc_id").val();
	// validation Doc Master
	if (documentName == "" || documentName == null || documentName == undefined) {
		alert("Please enter document name");
		$("#document_name").focus();
		return false;
	}
	if (documentName != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(documentName)) {
			alert("Document name should be of alphabets and digits with a single space allowed..!");
			$("#document_name").focus();
			return false;
		}
	}
	var inputs = [];
	inputs.push('docName=' + documentName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('doc_id=' + doc_id);
	var str = inputs.join('&');
	// end
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/saveDocumentMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			ajaxResponse = response;
			if (response == 1) {
				alertify.success("Records Saved Sucessfully");
				window.location.reload(true); 
			} else if (response == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (response == 3) {
				alertify.error("Document Name is Already Exists");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			$("#document_name").val("");
			$("#document_name").focus();
			refreshDocumentMaster();
			getAllDocumentMaster();
		}
	});
}

/*
 * @author:- Vishnu Thorat @date:- 23-10-2019 @codeFor: below js function to
 * refresh master documents jsp page
 */
function refreshDocumentMaster() {
	$('#document_name').val("");
	$('#doc_id').val(0);
	// toggleEntryDiv('divForEntry')
}

/*
 * @author:- Vishnu Thorat @date:- 23-10-2019 @codeFor: below js function to get
 * all documents master documents jsp page
 */
function getAllDocumentMaster() {

	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/getAllDocumentMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("Network Issue");
		},
		success : function(response) {
			setInventoryDocMasterTemp(response, "AllDocumentMaster");
		}
	});
}
function setInventoryDocMasterTemp(response, callFrom) {

	var htm = "";
	var index = 1;
	if (callFrom === "AllDocumentMaster") {
		for ( var i = 0; i < response.documentMasterDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.documentMasterDto[i].doc_id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.documentMasterDto[i].docName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editInvDocMaster('
					+ response.documentMasterDto[i].doc_id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteInvDocMaster('
					+ response.documentMasterDto[i].doc_id
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			index++;
		}
	} else if (callFrom === "searchDocument") {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.doc_id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.docName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editInvDocMaster('
				+ response.doc_id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteInvDocMaster('
				+ response.doc_id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	}

	$("#inv_document_master").html(htm);

}

function editInvDocMaster(documentId) {
	var inputs = [];
	inputs.push('doc_id=' + documentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editDocumentMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#document_name').val(response.docName);
			$('#doc_id').val(response.doc_id);
			toggleEntryDiv('divForEdit');
		}
	});
}

function deleteInvDocMaster(documentId) {

	var r = confirm("Are You Sure You Want To Delete Inventory Document Master.");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteDocumentMaster",
			data : {
				"doc_id" : documentId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshDocumentMaster();
				getAllDocumentMaster();
			}
		});
	}
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 23-Oct-2019
 * @codeFor : this is code for document name autosuggestion in document master
 ******************************************************************************/
function inventoryDocumentAutoSuggestion(documentNameId, callFrom) {
	var resultData = [];
	var documentName = $("input#" + documentNameId).val();

	if (documentName == "" || documentName == null || documentName == "null"
			|| documentName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + documentNameId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('docName=' + documentName);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryM/inventoryDocumentAutoSuggestion",
				cache : false,
				success : function(response) {
					if (response.documentMasterDto.length == 0) {
						alertify.error("Data Not Found...!!!");
					}
					var template = "";
					for ( var j = 0; j < response.documentMasterDto.length; j++) {

						var arrValue = response.documentMasterDto[j].doc_id
								+ "-" + response.documentMasterDto[j].docName;
						var idValue = response.documentMasterDto[j].doc_id;
						var docName = response.documentMasterDto[j].docName;
						resultData.push({
							ID : idValue,
							Name : docName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}

					setTimeout(
							function() {
								$("div#documentByName .typeahead").html(
										template);
								$("div#documentByName .typeahead").show();

								$("input#" + documentNameId).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("input#" + documentNameId).data('typeahead').source = resultData;
							}, 500);
				}
			});
	function displayResult(item) {

		var res = item.text.split('-');
		var doc_id = res[0];
		var docName = res[1];
		getAllDocumentById(doc_id);
		$("input#" + documentNameId).val(docName);
	}
}

function getAllDocumentById(documentId) {
	var inputs = [];
	inputs.push('doc_id=' + documentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/getAllDocumentById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			setInventoryDocMasterTemp(response, "searchDocument");
			$("#search_document_name").focus();
			$('#search_document_name').val("");
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : saveDocNumberMaster
 ******************************************************************************/
function saveDocNumberMaster() {
	var txtDocumentNumberId = $("#txtDocumentNumberId").val();
	var selDocument = $("#selDocument").val();
	var txtDocSeriesName = $("#txtDocSeriesName").val();
	var txtDocNumber = $("#txtDocNumber").val();
	var txtDocuPrefix = $("#txtDocuPrefix").val();
	var txtDocuSuffix = $("#txtDocuSuffix").val();
	var selFinancialYear = $("#selFinancialYear").val();
	var index = $("#selDocument").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();

	if (index == 0 || index == 'Select') {
		alert('please select document name');
		$("#selDocument").focus();
		return false;
	}

	if (txtDocSeriesName == "" || txtDocSeriesName == null) {
		alert("please select document series");
		$("#txtDocSeriesName").focus();
		return false;
	}

	if (txtDocSeriesName.length == 0 || txtDocSeriesName.length > 45) {
		alert("Document series should be less than 45 alphabets");
		$("#txtDocSeriesName").focus();
		return false;
	}

	if (txtDocNumber == "" || txtDocNumber == null) {
		alert("please select document number");
		$("#txtDocNumber").focus();
		return false;
	}

	if (txtDocNumber.length == 0 || txtDocNumber.length > 8) {
		alert("Document number should be less than 8 digits");
		$("#txtDocNumber").focus();
		return false;
	}

	if (txtDocuPrefix == "" || txtDocuPrefix == null) {
		alert("please select doc prefix");
		$("#txtDocuPrefix").focus();
		return false;
	}
	if (txtDocuPrefix.length == 0 || txtDocuPrefix.length > 10) {
		alert("Document prefix should be less than 10 alphabets");
		$("#txtDocuPrefix").focus();
		return false;
	}

	if (txtDocuSuffix == "" || txtDocuSuffix == null) {
		alert("please select doc suffix");
		$("#txtDocuSuffix").focus();
		return false;
	}

	if (txtDocuSuffix.length == 0 || txtDocuSuffix.length > 10) {
		alert("Document suffix should be less than 10 alphabets");
		$("#txtDocuSuffix").focus();
		return false;
	}

	var index2 = $("#selFinancialYear").val();

	if (index2 == 0 || index2 == 'Select') {
		alert('please select financial year ');
		$("#selFinancialYear").focus();
		return false;
	}
	// end

	var inputs = [];

	inputs.push('document_numbering_id=' + txtDocumentNumberId);
	inputs.push('docId=' + index);
	inputs.push('document_series=' + txtDocSeriesName);
	inputs.push('document_number=' + txtDocNumber);
	inputs.push('document_prefix=' + txtDocuPrefix);
	inputs.push('document_suffix=' + txtDocuSuffix);
	inputs.push('doc_financial_year_id=' + selFinancialYear);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/saveDocNumberMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (r == 3) {
				alertify.error("Document Number Is Already Present");
			} else {
				alertify.error("Network Issue");
			}
			resetDocumentNumberingForm();
			getAllInventoryNUmberDoc();
		}
	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : get Document Number Master Detail
 ******************************************************************************/
function getAllInventoryNUmberDoc() {
	
	var unitId = $("#unitId").val();
	var inputs = [];	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryNUmberDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDocNumberTemp(r, "All");
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : set Document Number Master Detail
 ******************************************************************************/
function setDocNumberTemp(r, CallFrom) {
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.lstDocumentNumberDTO.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDocumentNumberDTO[i].document_numbering_id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDocumentNumberDTO[i].documentName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDocumentNumberDTO[i].document_series
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDocumentNumberDTO[i].document_number
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDocumentNumberDTO[i].document_prefix
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDocumentNumberDTO[i].document_suffix
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDocumentNumberDTO[i].year
					+ '</td>'
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editNumberDoc('
					+ r.lstDocumentNumberDTO[i].document_numbering_id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess deleteUserAccess" onclick=deleteNumberDoc('
					+ r.lstDocumentNumberDTO[i].document_numbering_id
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			index++;
		}
	} else if (CallFrom == "search") {

		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.document_numbering_id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.documentName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.document_series
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.document_number
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.document_prefix
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.document_suffix
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.year
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editNumberDoc('
				+ r.document_numbering_id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess deleteUserAccess" onclick=deleteNumberDoc('
				+ r.document_numbering_id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;

	}
	$("#numberDocDetails").html(htm);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : editNumberDoc Master Detail
 ******************************************************************************/
function editNumberDoc(docId) {
	var inputs = [];
	inputs.push('docId=' + docId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editNumberDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			$("#txtDocumentNumberId").val(myOBJECT.document_numbering_id);
			$('#selDocument').select2('val', myOBJECT.docId);
			$("#txtDocSeriesName").val(myOBJECT.document_series);
			$("#txtDocNumber").val(myOBJECT.document_number);
			$("#txtDocuPrefix").val(myOBJECT.document_prefix);
			$("#txtDocuSuffix").val(myOBJECT.document_suffix);
			$('#selFinancialYear').select2('val',
					myOBJECT.doc_financial_year_id);
			toggleEntryDiv('divForEdit');
		}

	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : deleteNumberDoc Master Detail
 ******************************************************************************/
function deleteNumberDoc(docId) {
	var r = confirm("Are You Sure You Want To Number Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteNumberDoc",
			data : {
				"docId" : docId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				resetDocumentNumberingForm();
				getAllInventoryNUmberDoc();
			}
		});
	}

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : resetDocumentNumberingForm Master Detail
 ******************************************************************************/
function resetDocumentNumberingForm() {
	$("#txtDocSeriesName").val("");
	$("#txtDocNumber").val("");
	$("#txtDocuPrefix").val("");
	$("#txtDocuSuffix").val("");
	$('#selDocument').select2('val', 0);
	$('#selFinancialYear').select2('val', 0);
	// toggleEntryDiv('divForEntry');
	getAllInventoryNUmberDoc();
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : saveTaxMaster
 ******************************************************************************/
function saveTaxMaster() {
	var txtTaxmastercode = $("#txttaxmastercode").val();
	var txtTaxCode = $("#txttaxcode").val();
	var txtTaxRate = $("#txttaxRate").val();
	var hsnName = $("#hsnName").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();

	if (hsnName == "" || hsnName == null) {
		alert("please enter Hsn Name");
		$("#hsnName").focus();
		return false;
	}

	if (txtTaxCode == "") {
		alert("please enter tax code");
		$("#txttaxcode").focus();
		return false;
	}

	if (txtTaxCode != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtTaxCode)) {
			alert("Tax code should be of alphabets and digits with a single space allowed..!");
			$("#txttaxcode").focus();
			return false;
		}
	}

	if (txtTaxRate == "" || txtTaxRate == null) {
		alert("please enter tax rate");
		$("#txttaxRate").focus();
		return false;
	}
	if (txtTaxRate != "") {
		var pattern = /^[0-9]+\.?[0-9]*$/;
		if (!pattern.test(txtTaxRate)) {
			alert("Tax rate should be of digits and a decimal point Only!");
			$("#txttaxRate").focus();
			return false;
		}
	}
	var inputs = [];

	inputs.push('tax_id=' + txtTaxmastercode);
	inputs.push('tax_code=' + txtTaxCode);
	inputs.push('tax_rate=' + txtTaxRate);
	inputs.push('hsnName=' + hsnName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/saveTaxMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (r == 3) {
				alertify.error("HSN Name is Already Exist");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			resetTaxMasterForm();
			getAllInventoryTaxDoc();
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor :getAllInventoryTaxDoc Detail
 ******************************************************************************/
function getAllInventoryTaxDoc() {

	var unitId = $("#unitId").val();
		var inputs = [];
		
		inputs.push('unitId=' + unitId);
		var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryTaxDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTaxDocTemp(r);
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : setTaxDocTemp Master Detail
 ******************************************************************************/
function setTaxDocTemp(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstinventoryTaxSetUps.length; i++) {
		htm = htm
				+ '<tr> <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstinventoryTaxSetUps[i].tax_id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstinventoryTaxSetUps[i].hsnName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstinventoryTaxSetUps[i].tax_code
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstinventoryTaxSetUps[i].sgst
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstinventoryTaxSetUps[i].cgst
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstinventoryTaxSetUps[i].tax_rate
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editTaxDoc('
				+ r.lstinventoryTaxSetUps[i].tax_id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteTaxDoc('
				+ r.lstinventoryTaxSetUps[i].tax_id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#taxDocDetails").html(htm);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : editTaxDoc Master Detail
 ******************************************************************************/
function editTaxDoc(taxId) {
	var inputs = [];
	inputs.push('taxId=' + taxId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editTaxDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			$("#txttaxmastercode").val(myOBJECT.tax_id);
			$("#txttaxcode").val(myOBJECT.tax_code);
			$("#txttaxRate").val(myOBJECT.tax_rate);
			$("#hsnName").val(myOBJECT.hsnName);
			toggleEntryDiv('divForEdit');
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : deleteTaxDoc Master Detail
 ******************************************************************************/
function deleteTaxDoc(taxId) {
	var r = confirm("Are You Sure You Want To Delete Tax Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteTaxDoc",
			data : {
				"taxId" : taxId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				resetTaxMasterForm();
			}
		});
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : resetTaxMasterForm Master Detail
 ******************************************************************************/
function resetTaxMasterForm() {
	$("#txttaxmastercode").val('0');
	$("#txttaxcode").val("");
	$("#txttaxRate").val("");
	$("#hsnName").val("");
	getAllInventoryTaxDoc();
	// toggleEntryDiv('divForEntry');
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor : saveCategoryMaster
 ******************************************************************************/
function saveCategoryMaster() {

	var txtCategoryId = $("#txtcategorycode").val();
	var txtCategoryName = $("#txtcategoryname").val();
	var txtPrefixName = $("#txtPrefixName").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	// validation
	if (txtCategoryName == "") {
		alert("please enter category name");
		$("#txtcategoryname").val("");
		$("#txtcategoryname").focus();
		return false;

	}

	if ($("#txtcategoryname").val().toString().trim() == 0) {
		alert("Can not save empty record");
		$("#txtcategoryname").val("");
		$("#txtcategoryname").focus();
		return false;

	}

	if (txtPrefixName == "") {
		alert("please enter Prefix");
		$("#txtPrefixName").focus();
		return false;

	}

	var inputs = [];

	inputs.push('categoryId=' + txtCategoryId);
	inputs.push('categoryName=' + txtCategoryName);
	inputs.push('categoryPerifix=' + txtPrefixName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/inventoryM/saveCategoryMaster",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					if (r == 1) {
						alertify.success("Records Saved Sucessfully");
					} else if (r == 2) {
						alertify.success("Records Updated Sucessfully");
					} else if (r == 3) {
						alertify
								.error("Category Name Already Present In The System...");
					} else {
						alertify.error("Oops Some Problem Ocured");
					}
					resetCategoryForm();
					getAllInventoryCategoryDoc();
				}
			});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-oct-2019
 * @codeFor :getAllInventoryCategoryDoc Detail
 ******************************************************************************/
function getAllInventoryCategoryDoc() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryCategoryDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setCategoryDocTemp(r);
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : setCategoryDocTemp Master Detail
 ******************************************************************************/
function setCategoryDocTemp(r) {
	var htm = "";
	var index = 1;

	for ( var i = 0; i < r.lstcategoaryDoc.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstcategoaryDoc[i].categoryId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstcategoaryDoc[i].categoryName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstcategoaryDoc[i].categoryPerifix
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editCategoryDoc('
				+ r.lstcategoaryDoc[i].categoryId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteCategoryDoc('
				+ r.lstcategoaryDoc[i].categoryId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#categoryDocDetails").html(htm);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : editCategoryDoc Master Detail
 ******************************************************************************/
function editCategoryDoc(catId) {
	var inputs = [];
	inputs.push('catId=' + catId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editCategoryDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			$("#txtcategorycode").val(myOBJECT.categoryId);
			$("#txtcategoryname").val(myOBJECT.categoryName);
			$("#txtPrefixName").val(myOBJECT.categoryPerifix);
			toggleEntryDiv('divForEditCategory');

		}

	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : deleteCategoryDoc Master Detail
 ******************************************************************************/
function deleteCategoryDoc(catId) {
	var r = confirm("Are You Sure You Want To Delete  Category Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteCategoryDoc",
			data : {
				"catId" : catId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				resetCategoryForm();
				getAllInventoryCategoryDoc();
			}
		});
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : resetCategoryForm Master Detail
 ******************************************************************************/
function resetCategoryForm() {
	$("#txtcategorycode").val('0');
	$("#txtPrefixName").val("");
	$("#txtcategoryname").val("");
	$("#txtcategoryname").focus();
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : saveFormMaster
 ******************************************************************************/
function saveFormMaster() {
	var txtFormCode = $("#txtFormCode").val();
	var txtFormName = $("#txtFormName").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();

	if (txtFormName == "" || txtFormName == null) {

		alert("Please Enter Form Type..!");
		$("#txtFormName").focus();
		return false;
	} else if (txtFormName.length > 40) {
		alert("Form name length should be less than 45 alphabets..!");
		$("#txtFormName").val("");
		$("#txtFormName").focus();
		return false;
	} else if (txtFormName.length < 2) {
		alert("Form name length should be greater  than 2 alphabets..!");
		$("#txtFormName").val("");
		$("#txtFormName").focus();
		return false;
	}

	if ($('#txtFormName').val().toString().trim().length == 0) {
		alert("Can not insert empty record");
		$("#txtFormName").val("");
		$("#txtFormName").focus();
		return false;
	}

	var inputs = [];

	inputs.push('formId=' + txtFormCode);
	inputs.push('formType=' + txtFormName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/saveFormMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (r == 3) {
				alertify.error("Form Type is Already Present");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			resetFormMaster();
			getAllInventoryFormDoc();
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor :getAllInventoryFormDoc Detail
 ******************************************************************************/
function getAllInventoryFormDoc() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryFormDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setFormDocTemp(r);
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : setFormDocTemp Master Detail
 ******************************************************************************/
function setFormDocTemp(r) {
	var htm = "";
	var index = 1;

	for ( var i = 0; i < r.lstformDoc.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstformDoc[i].formId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstformDoc[i].formType
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editFormDoc('
				+ r.lstformDoc[i].formId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteFormDoc('
				+ r.lstformDoc[i].formId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#formDocDetails").html(htm);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : editFormDoc Master Detail
 ******************************************************************************/
function editFormDoc(formId) {
	var inputs = [];
	inputs.push('formId=' + formId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editFormDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			$("#txtFormCode").val(myOBJECT.formId);
			$("#txtFormName").val(myOBJECT.formType);
			toggleEntryDiv('divForEdit');
		}

	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : deleteFormDoc Master Detail
 ******************************************************************************/
function deleteFormDoc(formId) {
	var r = confirm("Are You Sure You Want To Form Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteFormDoc",
			data : {
				"formId" : formId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				resetFormMaster();
			}
		});
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : resetFormMaster Master Detail
 ******************************************************************************/
function resetFormMaster() {
	$("#txtFormName").val("");
	$("#txtFormCode").val('0');
	$("#txtFormName").focus();
	getAllInventoryFormDoc();
	// toggleEntryDiv('divForEntry');
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : saveManufacturerMaster
 ******************************************************************************/
function saveManufacturerMaster() {
	var txtManufacturerId = $("#txtManufacturerId").val();
	var txtManufacturerName = $("#txtManufacturerName").val();
	var txtManufacturerDetails = $("#txtManufacturerDetails").val();
	var countryId = $("#countryName").val();
	var stateId = $("#stateName").val();
	var districtId = $("#distictName").val();
	var talukaId = $("#talukaName").val();
	var cityId = $("#cityName").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();

	if (countryId == "" || countryId == 0) {
		alert("Please Select Country");
		$("#countryId").focus();
		return false;
	}
	if (stateId == "" || stateId == 0) {
		alert("Please Select State");
		$("#stateId").focus();
		return false;
	}
	if (districtId == "" || districtId == 0) {
		alert("Please Select District");
		$("#districtId").focus();
		return false;
	}

	if (talukaId == "" || talukaId == 0) {
		alert("Please Select Taluka");
		$("#talukaId").focus();
		return false;
	}

	if (cityId == "" || cityId == 0) {
		alert("Please Select City");
		$("#cityId").focus();
		return false;
	}

	if (txtManufacturerName == "") {
		alert("Please enter manufacturer name");
		$("#txtManufacturerName").focus();
		return false;
	}
	var inputs = [];
	inputs.push('manufacturerId=' + txtManufacturerId);
	inputs.push('manufacturerName=' + txtManufacturerName);
	inputs.push('manufacturerDetail=' + txtManufacturerDetails);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('countryId=' + countryId);
	inputs.push('stateId=' + stateId);
	inputs.push('districtId=' + districtId);
	inputs.push('talukaId=' + talukaId);
	inputs.push('cityId=' + cityId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/inventoryM/saveManufacturerMaster",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					if (r == 1) {
						alertify.success("Records Saved Sucessfully");
					} else if (r == 2) {
						alertify.success("Records Updated Sucessfully");
					} else if (r == 3) {
						alertify
								.error("Manufacture Name Is Already Present In The System...");
					} else {
						alertify.error("Oops Some Problem Ocured");
					}
					resetManufacturerForm();
					getAllInventoryManufactureDoc();
				}
			});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor :getAllInventoryManufactureDoc Detail
 ******************************************************************************/
function getAllInventoryManufactureDoc() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryManufactureDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setManufactureDocTemp(r);
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : setManufactureDocTemp Master Detail
 ******************************************************************************/
function setManufactureDocTemp(r) {
	var htm = "";
	var index = 1;

	for ( var i = 0; i < r.ltManufacturerDTO.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.ltManufacturerDTO[i].manufacturerId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.ltManufacturerDTO[i].manufacturerName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.ltManufacturerDTO[i].manufacturerDetail
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-name="getDistrictOnManufac" onclick=editManufactureDoc('
				+ r.ltManufacturerDTO[i].manufacturerId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteManufactureDoc('
				+ r.ltManufacturerDTO[i].manufacturerId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#manufactureDocDetails").html(htm);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : editManufactureDoc Master Detail
 ******************************************************************************/
function editManufactureDoc(mID) {
	var inputs = [];
	inputs.push('mID=' + mID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editManufactureDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			$("#txtManufacturerId").val(myOBJECT.manufacturerId);
			$("#txtManufacturerName").val(myOBJECT.manufacturerName);
			$("#txtManufacturerDetails").val(myOBJECT.manufacturerDetail);
			$('#countryName').select2('val', myOBJECT.countryId);
			$('#stateName').select2('val', myOBJECT.stateId);
			getAllDistrictByStateId('stateName');
			$('#distictName').select2('val', myOBJECT.districtId);
			getAllTalukaBydDistictId('distictName');
			$('#talukaName').select2('val', myOBJECT.talukaId);
			getAllCityByTalukaId('talukaName');
			$('#cityName').select2('val', myOBJECT.cityId);
			toggleEntryDiv('divForEdit');
		}

	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : deleteManufactureDoc Master Detail
 ******************************************************************************/
function deleteManufactureDoc(mId) {
	var r = confirm("Are You Sure You Want To Delete Manufacture Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteManufactureDoc",
			data : {
				"mId" : mId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				resetManufacturerForm();
			}
		});
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 24-oct-2019
 * @codeFor : resetManufacturerForm Master Detail
 ******************************************************************************/
function resetManufacturerForm() {
	$("#txtManufacturerId").val('0');
	$("#txtManufacturerName").val("");
	$("#txtManufacturerDetails").val("");
	$('#countryName').select2('val', 0);
	$('#stateName').select2('val', 0);
	$('#distictName').select2('val', 0);
	$('#talukaName').select2('val', 0);
	$('#cityName').select2('val', 0);

	$("#txtManufacturerName").focus();
	getAllInventoryManufactureDoc();
	// toggleEntryDiv('divForEntry');
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor : saveChargeMaster
 ******************************************************************************/
function saveChargeMaster() {
	var chargeName = $("#chargeName").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var chargeId = $("#chargeId").val();

	if (chargeName == "" || chargeName == null || chargeName == undefined) {
		alert("Please enter charge name");
		$("#document_name").focus();
		return false;
	}
	if (chargeName != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(chargeName)) {
			alert("Charge name should be of alphabets and digits with a single space allowed..!");
			$("#document_name").focus();
			return false;
		}
	}
	var inputs = [];
	inputs.push('chargeName=' + chargeName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('chargeId=' + chargeId);
	var str = inputs.join('&');
	// end
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/saveChargeMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			ajaxResponse = response;
			if (response == 1) {
				alertify.success("Records Saved Sucessfully");
			} else if (response == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (response == 3) {
				alertify.error("Document Name is Already Exists");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}

			refreshChargeMaster();
			getAllChargeMaster();
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor :getAllChargeMaster Detail
 ******************************************************************************/
function getAllChargeMaster() {
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/getAllChargeMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setChargeMasterDocTemp(r);
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor : setChargeMasterDocTemp Detail
 ******************************************************************************/
function setChargeMasterDocTemp(r) {
	var htm = "";
	var index = 1;

	for ( var i = 0; i < r.lstchargemaster.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstchargemaster[i].chargeId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstchargemaster[i].chargeName
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editChargeMasterDoc('
				+ r.lstchargemaster[i].chargeId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteChargeMasterDoc('
				+ r.lstchargemaster[i].chargeId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#chargeDocDetails").html(htm);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor : editChargeMasterDoc Master Detail
 ******************************************************************************/
function editChargeMasterDoc(chargeId) {
	var inputs = [];
	inputs.push('chargeId=' + chargeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editChargeMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			$("#chargeId").val(myOBJECT.chargeId);
			$("#chargeName").val(myOBJECT.chargeName);

		}

	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor : deleteChargeMasterDoc Master Detail
 ******************************************************************************/
function deleteChargeMasterDoc(chargeId) {
	var r = confirm("Are You Sure You Want To Charge Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteChargeMasterDoc",
			data : {
				"chargeId" : chargeId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshChargeMaster();
				getAllChargeMaster();
			}
		});
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor : refreshChargeMaster Detail
 ******************************************************************************/
function refreshChargeMaster() {
	$("#chargeId").val('0');
	$("#chargeName").val("");

	$("#chargeName").focus();
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-Oct-2019
 * @codeFor : auttosuggestion for Charge Master
 ******************************************************************************/
function inventoryChargeAutoSuggestion(inputID) {
	var resultData = [];
	var chargeName = $("#" + inputID).val();

	if (chargeName == "" || chargeName == null || chargeName == "null"
			|| chargeName == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		getAllChargeMaster();
		return false;
	}
	var unitId = $("#unitId").val();

	var inputs = [];
	inputs.push('chargeName=' + chargeName);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/inventoryChargeAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstchargemaster.length; j++) {
				var arrValue = response.lstchargemaster[j].chargeId + "-"
						+ response.lstchargemaster[j].chargeName;
				var idValue = response.lstchargemaster[j].chargeId;
				var chargeName = response.lstchargemaster[j].chargeName;
				resultData.push({
					ID : idValue,
					Name : chargeName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

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
		var chargeId = res[0];
		var chargeName = res[1];
		getChargeMasterByChargeId(chargeId);
		$("input#" + inputID).val(chargeName);
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-Oct-2019
 * @codeFor :set auttosuggestion for Charge Master
 ******************************************************************************/
function getChargeMasterByChargeId(chargeId) {
	var inputs = [];
	inputs.push('chargeId=' + chargeId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/inventoryM/editChargeMasterDoc",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {

					var htm = "";
					var index = 1;
					if (r == "" || r == null || r == "null" || r == undefined) {

						alert("Record Not Found");
						$("#" + inputID).focus();
						getAllChargeMaster();
						return false;
					}

					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.chargeId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.chargeName
							+ '</td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster" onclick=editChargeMasterDoc('
							+ r.chargeId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteChargeMasterDoc('
							+ r.chargeId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
					index++;

					$("#chargeDocDetails").html(htm);
				}

			});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-Oct-2019
 * @codeFor : search Cahrge Master Record Useing ChargeId
 ******************************************************************************/
function getChargeMasterByChargeId1() {
	var chargeId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(chargeId)) {
		alert("Please Enter Number Only!");
		$("#txttaxRate").focus();
		return false;
	}
	getChargeMasterByChargeId(chargeId);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor : saveUnitMaster
 ******************************************************************************/
function saveUnitMaster() {
	var unitName = $("#unitName").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var uniId = $("#uniId").val();

	if (unitName == "" || unitName == null || unitName == undefined) {
		alert("Please enter unitName ");
		$("#unitName").focus();
		return false;
	}
	if (unitName != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(unitName)) {
			alert("unitName  should be of alphabets and digits with a single space allowed..!");
			$("#unitName").focus();
			return false;
		}
	}
	var inputs = [];
	inputs.push('unitName=' + unitName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('uniId=' + uniId);
	var str = inputs.join('&');
	// end
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/saveUnitMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			ajaxResponse = response;
			if (response == 1) {
				alertify.success("Records Saved Sucessfully");
			} else if (response == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (response == 3) {
				alertify.error("Unit Name is Already Exists");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}

			refreshUnitMaster();
			getAllUnitMaster();
		}
	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor :getAllUnitMaster Detail
 ******************************************************************************/
function getAllUnitMaster() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllUnitMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setUnitMasterDocTemp(r);
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor : setUnitMasterDocTemp Detail
 ******************************************************************************/
function setUnitMasterDocTemp(r) {
	var htm = "";
	var index = 1;

	for ( var i = 0; i < r.lstunitmaster.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstunitmaster[i].uniId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstunitmaster[i].unitName
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editUnitMasterDoc('
				+ r.lstunitmaster[i].uniId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteUnitMasterDoc('
				+ r.lstunitmaster[i].uniId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#unitDocDetails").html(htm);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor : editUnitMasterDoc Master Detail
 ******************************************************************************/
function editUnitMasterDoc(uniId) {
	var inputs = [];
	inputs.push('uniId=' + uniId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editUnitMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			$("#uniId").val(myOBJECT.uniId);
			$("#unitName").val(myOBJECT.unitName);
			toggleEntryDiv('divForEdit');
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor : deleteUnitMasterDoc Master Detail
 ******************************************************************************/
function deleteUnitMasterDoc(uniId) {
	var r = confirm("Are You Sure You Want To Delete Unit Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteUnitMasterDoc",
			data : {
				"uniId" : uniId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshUnitMaster();
			}
		});
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor : refreshUnitMaster Detail
 ******************************************************************************/
function refreshUnitMaster() {
	$("#uniId").val('0');
	$("#unitName").val("");
	$("#unitName").focus();
	getAllUnitMaster();
	// toggleEntryDiv('divForEntry');
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-Oct-2019
 * @codeFor : auttosuggestion for Unit Master
 ******************************************************************************/
function inventoryUnitAutoSuggestion(inputID) {
	var attrValue = $("#" + inputID).attr('data-name');

	var resultData = [];
	var unitName = $("#" + inputID).val();

	if (unitName == "" || unitName == null || unitName == "null"
			|| unitName == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		getAllUnitMaster();
		return false;
	}

	var inputs = [];
	inputs.push('unitName=' + unitName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/inventoryUnitAutoSuggestion",
		cache : false,
		success : function(response) {
			if (response.lstunitmaster.length == 0) {
				alertify.error("Unit Not Found!!!");
			}
			var template = "";
			for ( var j = 0; j < response.lstunitmaster.length; j++) {
				var arrValue = response.lstunitmaster[j].uniId + "-"
						+ response.lstunitmaster[j].unitName;
				var idValue = response.lstunitmaster[j].uniId;
				var chargeName = response.lstunitmaster[j].unitName;
				resultData.push({
					ID : idValue,
					Name : chargeName
				});
				if (attrValue == "unitMaster") {
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue
							+ '</a></li>';
				} else {
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue
							+ '</a></li>';
				}
			}

			setTimeout(function() {
				$("div#documentByName .typeaheadUnit").html(template);
				$("div#documentByName .typeaheadUnit").show();

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
		var uniId = res[0];
		var unitName = res[1];
		var masterId = item.value;
		if (attrValue == "unitMaster") {
			getUnitMasterByuniId(masterId);
		}
		$("input#" + inputID).val(unitName);
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-Oct-2019
 * @codeFor : set auttosuggestion for Unit Master
 ******************************************************************************/
function getUnitMasterByuniId(uniId) {
	var inputs = [];
	inputs.push('uniId=' + uniId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/inventoryM/editUnitMasterDoc",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {

					var htm = "";
					var index = 1;
					if (r == "" || r == null || r == "null" || r == undefined) {

						alert("Record Not Found");
						$("#" + inputID).focus();
						getAllUnitMaster();
						return false;
					}

					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.uniId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.unitName
							+ '</td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editUnitMasterDoc('
							+ r.uniId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteUnitMasterDoc('
							+ r.uniId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
					index++;

					$("#unitDocDetails").html(htm);
				}

			});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-Oct-2019
 * @codeFor : search Unit Master Record useing Unit Id
 ******************************************************************************/
function getUnitMasterByuniId1() {
	var uniId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(uniId)) {
		alert("Please Enter Number Only!");
		$("#txttaxRate").focus();
		return false;
	}
	getUnitMasterByuniId(uniId);

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : auttosuggestion for Tax Master
 ******************************************************************************/
function inventoryTaxAutoSuggestion(inputID) {
	var attrValue = $("#" + inputID).attr('data-name');
	var resultData = [];
	var hsnName = $("#" + inputID).val();
	if (hsnName == "" || hsnName == null || hsnName == "null"
			|| hsnName == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		getAllInventoryTaxDoc();
		return false;
	}
	var inputs = [];
	inputs.push('hsnName=' + hsnName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryM/inventoryTaxAutoSuggestion",
				cache : false,
				success : function(response) {
					if (response.lstinventoryTaxSetUps.length == 0) {
						alertify.error("Data Not Found...!!!");
					}
					var template = "";
					for ( var j = 0; j < response.lstinventoryTaxSetUps.length; j++) {

						var arrValue = response.lstinventoryTaxSetUps[j].tax_id
								+ "-"
								+ response.lstinventoryTaxSetUps[j].hsnName;
						var idValue = response.lstinventoryTaxSetUps[j].tax_id;
						var hsnName = response.lstinventoryTaxSetUps[j].tax_code;
						resultData.push({
							ID : idValue,
							Name : hsnName
						});

						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';

					}

					setTimeout(
							function() {
								$("div#documentByName .typeahead").html(
										template);
								$("div#documentByName .typeahead").show();

								$("input#" + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("input#" + inputID).data('typeaheadGSTCode').source = resultData;
							}, 500);

				}
			});
	function displayResult(item) {
		var res = item.text.split('-');
		var taxId = res[0];
		var taxName = res[1];
		// here we check the attribute value to use this function dynamically
		if (attrValue == "taxValueTaxMaster") {
			getTaxMasterBytaxId(taxId);
		}
		$("input#" + inputID).val(taxName);
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : set auttosuggestion for Tax Master
 ******************************************************************************/
function getTaxMasterBytaxId(taxId) {
	var inputs = [];
	inputs.push('taxId=' + taxId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/inventoryM/editTaxDoc",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					var htm = "";
					var index = 1;
					if (r == "" || r == null || r == "null" || r == undefined) {

						alert("Record Not Found");
						$("#" + inputID).focus();
						getAllInventoryTaxDoc();
						return false;
					}
					htm = htm
							+ '<tr> <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.tax_id
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.hsnName
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.tax_code
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.sgst
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.cgst
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.tax_rate
							+ '</td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editTaxDoc('
							+ r.tax_id
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteTaxDoc('
							+ r.tax_id
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
					index++;
					$("#taxDocDetails").html(htm);
				}

			});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : search Tax Master Record useing tax Id
 ******************************************************************************/
function getTaxMasterBytaxId1() {
	var taxId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(taxId)) {
		alert("Please Enter Number Only!");
		$("#txttaxRate").focus();
		return false;
	}
	getTaxMasterBytaxId(taxId);

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : auttosuggestion for Category Master
 ******************************************************************************/
function inventoryCategoryAutoSuggestion(inputID) {
	var categoryType = $("#" + inputID).attr('data-name');
	var resultData = [];
	var categoryName = $("#" + inputID).val();

	if (categoryName == "" || categoryName == null || categoryName == "null"
			|| categoryName == undefined) {
		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		getAllInventoryCategoryDoc();
		return false;
	}

	var inputs = [];
	inputs.push('categoryName=' + categoryName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryM/inventoryCategoryAutoSuggestion",
				cache : false,
				success : function(response) {
					if (response.lstcategoaryDoc.length == 0) {
						alertify
								.error("You Cannot Insert Other Category Value...!!!");
						document.getElementById('searchId11').value = "";
					}
					var template = "";
					for ( var j = 0; j < response.lstcategoaryDoc.length; j++) {
						var arrValue = response.lstcategoaryDoc[j].categoryId
								+ "-"
								+ response.lstcategoaryDoc[j].categoryName;
						var idValue = response.lstcategoaryDoc[j].categoryId;
					
						
						var categoryName = response.lstcategoaryDoc[j].categoryName;
						resultData.push({
							ID : idValue,
							Name : categoryName
						});
						if (categoryType == 'categoryMaster') {
							template = template + '<li data-value="' + idValue
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';
						} else {
							template = template + '<li data-value="' + idValue
									+ '" class=""><a href="#">' + categoryName
									+ '</a></li>';

						}
					}
					if (categoryType == "categoryMaster") {
						setTimeout(
								function() {
									$("div#documentByName .typeahead").html(
											template);
									$("div#documentByName .typeahead").show();

									$("input#" + inputID).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult,
										scrollBar : true
									});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					} else {
						setTimeout(
								function() {
									$(
											"div#categoryNameDivId .typeahead")
											.html(template);
									$(
											"div#categoryNameDivId .typeahead")
											.show();

									$("input#" + inputID).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult,
										scrollBar : true
									});
									$("input#" + inputID).data(
											'typeahead').source = resultData;
								}, 500);
					}
				}
			});
	function displayResult(item) {
		if (categoryType == 'categoryMaster') {
			var res = item.text.split('-');
			var categoryId = res[0];
			var categoryName = res[1];
			getCategoryMasterBycategoryId(categoryId);
			$("input#" + inputID).val(categoryName);
		} else if (categoryType == 'itemCategoryMaster') {
			var res = item.text.split('-');
			var categoryId = item.value;
			var categoryName = item.text;
			$("#categoryId").val(categoryId);
		
			//getCategoryMasterBycategoryId(categoryId);
			$("input#" + inputID).val(categoryName);
		} else {
			$("input#" + inputID).val(categoryName);
		}
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : set auttosuggestion for Category Master
 ******************************************************************************/
function getCategoryMasterBycategoryId(categoryId) {
	var inputs = [];
	inputs.push('catId=' + categoryId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/inventoryM/editCategoryDoc",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					if (r == "" || r == null || r == "null" || r == undefined) {

						alert("Record Not Found");
						$("#" + inputID).focus();
						getAllInventoryCategoryDoc();
						return false;
					}
					var htm = "";
					var index = 1;

					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.categoryId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.categoryName
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.categoryPerifix
							+ '</td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editCategoryDoc('
							+ r.categoryId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteCategoryDoc('
							+ r.categoryId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
					index++;

					$("#categoryDocDetails").html(htm);
				}

			});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : search Category Master Record useing Category Id
 ******************************************************************************/
function getCategoryMasterBytaxId1() {
	var categoryId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(categoryId)) {
		alert("Please Enter Number Only!");
		$("#txttaxRate").focus();
		return false;
	}
	getCategoryMasterBycategoryId(categoryId);

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : auttosuggestion for Form Master
 ******************************************************************************/
function inventoryFormAutoSuggestion(inputID) {
	var type = $("#" + inputID).attr('data-name');
	var resultData = [];
	var formType = $("#" + inputID).val();

	if (formType == "" || formType == null || formType == "null"
			|| formType == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		getAllInventoryFormDoc();
		return false;
	}

	var inputs = [];
	inputs.push('formType=' + formType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/inventoryFormAutoSuggestion",
		cache : false,
		success : function(response) {
			if (response.lstformDoc.length == 0) {
				alertify.error("You Cannot Enter Other Form Type Name...!!!");
				document.getElementById('formTypeId').value = "";
			}
			var template = "";
			for ( var j = 0; j < response.lstformDoc.length; j++) {
				var arrValue = response.lstformDoc[j].formId + "-"
						+ response.lstformDoc[j].formType;
				var idValue = response.lstformDoc[j].formId;
				var formType = response.lstformDoc[j].formType;
				resultData.push({
					ID : idValue,
					Name : formType
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

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
		var formId = res[0];
		var formType = res[1];
		// here we check the form type using data-attr
		if (type == "formMaster") {
			getFormMasterByformId(formId);
		}
		$("input#" + inputID).val(formType);
	}
}
function getFormMasterByformId(formId) {

	var inputs = [];
	inputs.push('formId=' + formId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/inventoryM/editFormDoc",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					var htm = "";
					var index = 1;
					if (r == "" || r == null || r == "null" || r == undefined) {

						alert("Record Not Found");
						$("#" + inputID).focus();
						getAllInventoryFormDoc();
						return false;
					}
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.formId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.formType
							+ '</td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editFormDoc('
							+ r.formId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteFormDoc('
							+ r.formId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
					index++;
					$("#formDocDetails").html(htm);
				}

			});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : search Form Master Record useing Form Id
 ******************************************************************************/
function getFormMasterByformId1() {
	var formId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(formId)) {
		alert("Please Enter Form ID Only!");
		$("#searchId").focus();
		return false;
	}
	getFormMasterByformId(formId);

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : auttosuggestion for Manufacture Master
 ******************************************************************************/
function inventoryManufactureAutoSuggestion(inputID) {
	var resultData = [];
	var manufName = $("#" + inputID).val();

	if (manufName == "" || manufName == null || manufName == "null"
			|| manufName == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		getAllInventoryManufactureDoc();
		return false;
	}

	var inputs = [];
	inputs.push('manufName=' + manufName);
	// inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryM/inventoryManufactureAutoSuggestion",
				cache : false,
				success : function(response) {
					if (response.ltManufacturerDTO.length == 0) {
						alertify.error("Data Not Found...!!!");
					}
					var template = "";
					for ( var j = 0; j < response.ltManufacturerDTO.length; j++) {
						var arrValue = response.ltManufacturerDTO[j].manufacturerId
								+ "-"
								+ response.ltManufacturerDTO[j].manufacturerName;
						var idValue = response.ltManufacturerDTO[j].manufacturerId;
						var manufacturerName = response.ltManufacturerDTO[j].manufacturerName;
						resultData.push({
							ID : idValue,
							Name : manufacturerName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}

					setTimeout(
							function() {
								$("div#documentByName .typeahead").html(
										template);
								$("div#documentByName .typeahead").show();

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
		var mId = res[0];
		var manufacturerName = res[1];
		getManufactureMasterBymanufId(mId);
		$("input#" + inputID).val(manufacturerName);
	}
}
function getManufactureMasterBymanufId(mID) {
	var inputs = [];
	inputs.push('mID=' + mID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/inventoryM/editManufactureDoc",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					var htm = "";
					var index = 1;
					if (r == "" || r == null || r == "null" || r == undefined) {

						alert("Record Not Found");
						$("#" + inputID).focus();
						getAllInventoryManufactureDoc();
						return false;
					}
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.manufacturerId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.manufacturerName
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.manufacturerDetail
							+ '</td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editManufactureDoc('
							+ r.manufacturerId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteManufactureDoc('
							+ r.manufacturerId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
					index++;
					$("#manufactureDocDetails").html(htm);
				}
			});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 31-Oct-2019
 * @codeFor : search Manufacture Master Record useing Manufacture Id
 ******************************************************************************/
function getManufactureMasterBymanuId1() {
	var mID = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(mID)) {
		alert("Please Enter Number Only!");
		$("#txttaxRate").focus();
		return false;
	}
	getManufactureMasterBymanufId(mID);

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : saveTermAndconditionMaster
 ******************************************************************************/
function saveTermAndconditionMaster() {

	var termConditionId = $("#termConditionId").val();
	var termconditionName = $("#termconditionName").val();
	var headingName = $("#headingName").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	// validation

	if (headingName == "" || headingName == null) {
		alert("please enter Heading Name");
		$("#headingName").focus();
		return false;

	}
	if (termconditionName == "" || termconditionName == null) {
		alert("please enter Term And Condition");
		$("#termconditionName").focus();
		return false;

	}

	var inputs = [];

	inputs.push('termConditionId=' + termConditionId);
	inputs.push('termconditionName=' + termconditionName);
	inputs.push('headingName=' + headingName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/saveTermAndconditionMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (r == 3) {
				alertify.error("Heading  is Already Present");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			resetTermAndconditionMaster();
			getAllInventoryTermAndCondition();
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor :getAllInventoryTermAndCondition Detail
 ******************************************************************************/
function getAllInventoryTermAndCondition() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryTermAndCondition",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTermAndConditionDocTemp(r, "All");
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : setUnitMasterDocTemp Detail
 ******************************************************************************/
function setTermAndConditionDocTemp(r, callFrom) {
	var htm = "";
	var index = 1;
	if (callFrom == "All") {
		for ( var i = 0; i < r.lsttermcondition.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lsttermcondition[i].termConditionId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lsttermcondition[i].headingName
					+ '</td>'
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editTermAndConditionMasterDoc('
					+ r.lsttermcondition[i].termConditionId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteTermAndConditionMasterDoc('
					+ r.lsttermcondition[i].termConditionId
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			index++;
		}
	} else if (callFrom === "search") {

		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.termConditionId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.headingName
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editTermAndConditionMasterDoc('
				+ r.termConditionId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteTermAndConditionMasterDoc('
				+ r.termConditionId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;

	}

	$("#termConditionDetails").html(htm);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : editTermAndConditionMasterDoc Detail
 ******************************************************************************/
function editTermAndConditionMasterDoc(termconditionId) {
	var inputs = [];
	inputs.push('termconditionId=' + termconditionId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editTermAndConditionMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			$("#termConditionId").val(myOBJECT.termConditionId);
			$("#termconditionName").val(myOBJECT.termconditionName);
			$("#headingName").val(myOBJECT.headingName);
			toggleEntryDiv('divForEdit');
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : deleteTermAndConditionMasterDoc Detail
 ******************************************************************************/
function deleteTermAndConditionMasterDoc(termConditionId) {
	var r = confirm("Are You Sure You Want To Delete Unit Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteTermAndConditionMasterDoc",
			data : {
				"termConditionId" : termConditionId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				resetTermAndconditionMaster();
			}
		});
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : resetTermAndconditionMaster Detail
 ******************************************************************************/
function resetTermAndconditionMaster() {
	$("#termConditionId").val('0');
	$("#termconditionName").val("");
	$("#headingName").val("");
	$("#termconditionName").focus();
	getAllInventoryTermAndCondition();
	// toggleEntryDiv('divForEntry');
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : auttosuggestion for Term And Condition Master
 ******************************************************************************/
function inventoryTermConditionAutoSuggestion(inputID) {
	var resultData = [];
	var headingName = $("#" + inputID).val();

	if (headingName == "" || headingName == null || headingName == "null"
			|| headingName == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		getAllInventoryTermAndCondition();
		return false;
	}

	var inputs = [];
	inputs.push('headingName=' + headingName);
	// inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/inventoryTermConditionAutoSuggestion",
		cache : false,
		success : function(response) {
			if (response.lsttermcondition.length == 0) {
				alertify.error("Data Not Found...!!!");
			}
			var template = "";
			for ( var j = 0; j < response.lsttermcondition.length; j++) {
				var arrValue = response.lsttermcondition[j].termConditionId
						+ "-" + response.lsttermcondition[j].headingName;
				var idValue = response.lsttermcondition[j].termConditionId;
				var headingName = response.lsttermcondition[j].headingName;
				resultData.push({
					ID : idValue,
					Name : headingName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

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
		var termConditionId = res[0];
		var termconditionName = res[1];
		getTermConditionMasterByTermId(termConditionId);
		$("input#" + inputID).val(termconditionName);
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : get Term And Condition By Id Detail
 ******************************************************************************/
function getTermConditionMasterByTermId(termconditionId) {
	var inputs = [];
	inputs.push('termconditionId=' + termconditionId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editTermAndConditionMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTermAndConditionDocTemp(r, "search");

		}

	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : get Term And Condition By Id
 ******************************************************************************/
function getTermConditionMasterByTermId1() {
	var termconditionId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(termconditionId)) {
		alert("Please Enter Number Only!");
		$("#txttaxRate").focus();
		return false;
	}
	getTermConditionMasterByTermId(termconditionId);
}

/**
 * 
 * @returns {Boolean}
 */
function saveHospitalDetails() {

	var hospitalName = $("#hospital_name").val();
	var country = $("#country").val();
	var state = $("#state").val();
	var district = $("#district").val();
	var taluka = $("#taluka").val();
	var pincode = $("#pincode").val();

	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var hospital_id = $("#hospital_id").val();
	// validation Doc Master
	if (hospitalName == "" || hospitalName == null || hospitalName == undefined) {
		alert("Please enter hospital name");
		$("#hospital_name").focus();
		return false;
	}
	if (hospitalName != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(hospitalName)) {
			alert("Hospital name should be of alphabets and digits with a single space allowed..!");
			$("#hospital_name").focus();
			return false;
		}
	}
	var inputs = [];
	inputs.push('hospitalName=' + hospitalName);
	inputs.push('hospitalCountry=' + country);
	inputs.push('hospitalState=' + state);
	inputs.push('hospitalDistrict=' + district);
	inputs.push('hospitalTaluka=' + taluka);
	inputs.push('hospitalPincode=' + pincode);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('hospitalId=' + hospital_id);
	var str = inputs.join('&');
	// end
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/saveHospitalDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			if (response == 1) {
				alertify.success("Records Saved Sucessfully");
			} else if (response == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (response == 3) {
				alertify.error("Document Name is Already Exists");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			$("#hospital_name").val("");
			$("#hospital_name").focus();
			refreshHospital();
			getAllHospitalDetails();
		}
	});
}

/*
 * @author:- Vishnu Thorat @date:- 23-10-2019 @codeFor: below js function to
 * refresh master documents jsp page
 */
function refreshHospital() {
	$('#hospital_name').val("");
	$('#hospital_id').val(0);
	$('#country').val("");
	$('#state').val("");
	$('#district').val("");
	$('#taluka').val("");
	$('#pincode').val("");
}

/*
 * @author:- Vishnu Thorat @date:- 23-10-2019 @codeFor: below js function to get
 * all documents master documents jsp page
 */

function getAllHospitalDetails() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/getAllHospitalDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setHospitalDetailsTemp(response, "AllHospitalDetails");
		}
	});
}
/**
 * 
 * @param response
 * @param callFrom
 */
function setHospitalDetailsTemp(response, callFrom) {

	var htm = "";
	var index = 1;
	if (callFrom === "AllHospitalDetails") {
		for ( var i = 0; i < response.hospitalDetailsDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.hospitalDetailsDto[i].hospitalId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.hospitalDetailsDto[i].hospitalName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editHospitalDetails('
					+ response.hospitalDetailsDto[i].hospitalId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteHospitalDetails('
					+ response.hospitalDetailsDto[i].hospitalId
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			index++;
		}
	} else if (callFrom === "searchHospital") {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.hospitalId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.hospitalName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editHospitalDetails('
				+ response.hospitalId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteHospitalDetails('
				+ response.hospitalId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	}

	$("#hospital_details_table").html(htm);

}

/**
 * 
 * @param hospitalId
 */
function editHospitalDetails(hospitalId) {
	var inputs = [];
	inputs.push('hospital_id=' + hospitalId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editHospitalDetails",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#hospital_name').val(response.hospitalName);
			$('#hospital_id').val(response.hospitalId);
			$('#country').val(response.hospitalCountry);
			$('#state').val(response.hospitalState);
			$('#district').val(response.hospitalDistrict);
			$('#taluka').val(response.hospitalTaluka);
			$('#pincode').val(response.hospitalPincode);
		}
	});
}

function deleteHospitalDetails(hospitalId) {

	var r = confirm("Are You Sure You Want To Delete Hospital Details.");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteHospitalDetails",
			data : {
				"hospital_id" : hospitalId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshHospital();
				getAllHospitalDetails();
			}
		});
	}
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 23-Oct-2019
 * @codeFor : this is code for document name autosuggestion in document master
 ******************************************************************************/
function hospitalDetailsAutoSuggestion(hospitalId, callFrom) {
	var resultData = [];
	var hospitalName = $("input#" + hospitalId).val();

	if (hospitalName == "" || hospitalName == null || hospitalName == "null"
			|| hospitalName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + hospitalId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('hospitalName=' + hospitalName);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/hospitalDetailsAutoSuggestion",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.hospitalDetailsDto.length; j++) {

				var arrValue = response.hospitalDetailsDto[j].hospitalId + "-"
						+ response.hospitalDetailsDto[j].hospitalName;
				var idValue = response.hospitalDetailsDto[j].hospitalId;
				var hosName = response.hospitalDetailsDto[j].hospitalName;
				resultData.push({
					ID : idValue,
					Name : hosName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#hospitalById .typeahead").html(template);
				$("div#hospitalById .typeahead").show();

				$("input#" + hospitalId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + hospitalId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var hospital_id = res[0];
		var hospitalName = res[1];
		getAllHospitalDetailsById(hospital_id);
		$("input#" + hospitalId).val(hospitalName);
	}
}

/**
 * 
 * @param hospital_id
 */

function getAllHospitalDetailsById(hospital_id) {
	var inputs = [];
	inputs.push('hospital_id=' + hospital_id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/getAllHospitalDetailsById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			setHospitalDetailsTemp(response, "searchHospital");
			$("#search_hospital_id").focus();
			$('#search_hospital_id').val("");
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : saveCompanyMaster
 ******************************************************************************/
function saveCompanyMaster() {

	var companyId = $("#companyId").val();
	var companyName = $("#companyName").val();
	var shortName = $("#shortName").val();

	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	// validation
	if (companyName == "") {
		alert("please enter company Name");
		$("#companyName").focus();
		return false;

	}

	if (shortName == "") {
		alert("please enter short name");
		$("#shortName").focus();
		return false;

	}

	var inputs = [];

	inputs.push('companyId=' + companyId);
	inputs.push('companyName=' + companyName);
	inputs.push('shortName=' + shortName);

	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/saveCompanyMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			resetCompanyMaster();
			getAllInventoryCompanyDoc();
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor :getAllInventoryCompanyDoc Detail
 ******************************************************************************/
function getAllInventoryCompanyDoc() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryCompanyDoc",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setCompanyDocTemp(r, "All");
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : setCompanyDocTemp Detail
 ******************************************************************************/
function setCompanyDocTemp(r, callFrom) {
	var htm = "";
	var index = 1;
	if (callFrom == "All") {
		for ( var i = 0; i < r.lstcompanydoc.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstcompanydoc[i].companyId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstcompanydoc[i].companyName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstcompanydoc[i].shortName
					+ '</td>'
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editCompanyMasterDoc('
					+ r.lstcompanydoc[i].companyId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess deleteUserAccess" onclick=deleteComanyMasterDoc('
					+ r.lstcompanydoc[i].companyId
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			index++;
		}
	} else if (callFrom === "search") {

		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.companyId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.companyName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.shortName
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editCompanyMasterDoc('
				+ r.companyId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteComanyMasterDoc('
				+ r.companyId + ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;

	}

	$("#companyDocDetails").html(htm);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : editCompanyMasterDoc Detail
 ******************************************************************************/
function editCompanyMasterDoc(companyId) {
	var inputs = [];
	inputs.push('companyId=' + companyId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editCompanyMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			$("#companyId").val(myOBJECT.companyId);
			$("#companyName").val(myOBJECT.companyName);
			$("#shortName").val(myOBJECT.shortName);

		}

	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : deleteComanyMasterDoc Detail
 ******************************************************************************/
function deleteComanyMasterDoc(companyId) {
	var r = confirm("Are You Sure You Want To Company Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteComanyMasterDoc",
			data : {
				"companyId" : companyId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				resetCompanyMaster();
				getAllInventoryCompanyDoc();
			}
		});
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : resetTermAndconditionMaster Detail
 ******************************************************************************/
function resetCompanyMaster() {
	$("#companyId").val('0');
	$("#companyName").val("");
	$("#shortName").val("");

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : auttosuggestion for Company Master
 ******************************************************************************/
function inventoryCompanyAutoSuggestion(inputID) {
	var categoryName = $("#" + inputID).attr('data-name');
	var resultData = [];
	var companyName = $("#" + inputID).val();

	if (companyName == "" || companyName == null || companyName == "null"
			|| companyName == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		getAllInventoryCompanyDoc();
		return false;
	}

	var inputs = [];
	inputs.push('companyName=' + companyName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryM/inventoryCompanyAutoSuggestion",
				cache : false,
				success : function(response) {

					var template = "";
					for ( var j = 0; j < response.lstcompanydoc.length; j++) {
						var arrValue = response.lstcompanydoc[j].companyId
								+ "-" + response.lstcompanydoc[j].companyName;
						var idValue = response.lstcompanydoc[j].companyId;
						var companyName = response.lstcompanydoc[j].companyName;
						resultData.push({
							ID : idValue,
							Name : companyName
						});
						if (categoryName == "companyName") {
							template = template + '<li data-value="' + idValue
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';
						} else {
							template = template + '<li data-value="' + idValue
									+ '" class=""><a href="#">' + companyName
									+ '</a></li>';
						}
					}
					if (categoryName == "companyName") {

						setTimeout(
								function() {
									$("div#documentByName .typeahead").html(
											template);
									$("div#documentByName .typeahead").show();

									$("input#" + inputID).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult,
										scrollBar : true
									});
									$("input#" + inputID).data(
											'typeaheadCompanyName').source = resultData;
								}, 500);

					} else {

						setTimeout(
								function() {
									$(
											"div#documentByName .typeaheadCompanyName")
											.html(template);
									$(
											"div#documentByName .typeaheadCompanyName")
											.show();

									$("input#" + inputID).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult,
										scrollBar : true
									});
									$("input#" + inputID).data(
											'typeaheadCompanyName').source = resultData;
								}, 500);
					}
				}
			});
	function displayResult(item) {

		var res = item.text.split('-');
		var companyId = res[0];
		var companyName = res[1];
		if (categoryName == "companyName") {
			getCompanyMasterBycompanyId(companyId);
		}
		$("input#" + inputID).val(companyName);
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : get Company Master By Id Detail
 ******************************************************************************/
function getCompanyMasterBycompanyId(companyId) {
	var inputs = [];
	inputs.push('companyId=' + companyId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editCompanyMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
			alert("Please Enter Number Only!");
			$("#txttaxRate").focus();
			return false;

		},
		success : function(r) {
			setCompanyDocTemp(r, "search");

		}

	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : getCompany Master By Id
 ******************************************************************************/
function getCompanyMasterBycomapnyId() {
	var companyId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(companyId)) {
		alert("Please Enter Number Only!");
		$("#txttaxRate").focus();
		return false;
	}
	getCompanyMasterBycompanyId(companyId);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 6-Nov-2019
 * @codeFor : get All Financial Year For Document Numbering details
 ******************************************************************************/
function getAllFinacialYear() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/inventoryM/getAllFinancialMasterRecords",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select name='financial Name' class='col-md-12'><option value='0'>---Select---</option>";
					for ( var i = 0; i < r.lstFinancialMaster.length; i++) {
						divContent = divContent + "<option value='"
								+ r.lstFinancialMaster[i].id + "'  >"
								+ r.lstFinancialMaster[i].year + "</option>";
					}
					divContent = divContent + "</select>";
					$("#selFinancialYear").html(divContent);

				}
			});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 6-Nov-2019
 * @codeFor : get All Document Name For Document Numbering details
 ******************************************************************************/
function getAllDocumentMasterForNumbering() {

	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/inventoryM/getAllDocumentMaster",
				data : str + "&reqType=AJAX",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select name='Document Name' class='col-md-12'><option value='0'>---Select---</option>";
					for ( var i = 0; i < r.documentMasterDto.length; i++) {
						divContent = divContent + "<option value='"
								+ r.documentMasterDto[i].doc_id + "'  >"
								+ r.documentMasterDto[i].docName + "</option>";
					}
					divContent = divContent + "</select>";
					$("#selDocument").html(divContent);

				}
			});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 7-Nov-2019
 * @codeFor : auttosuggestion for Number Document Master
 ******************************************************************************/
function inventoryDocumentNumberAutoSuggestion(inputID) {
	var resultData = [];
	var docName = $("#" + inputID).val();

	if (docName == "" || docName == null || docName == "null"
			|| docName == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		getAllDistrictMaster();
		return false;
	}

	var inputs = [];
	inputs.push('docName=' + docName);
	// inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryM/inventoryDocumentNumberAutoSuggestion",
				cache : false,
				success : function(response) {
					if (response.lstDocumentNumberDTO.length == 0) {
						alertify.error("Data Not Found...!!!");
					}
					var template = "";
					for ( var j = 0; j < response.lstDocumentNumberDTO.length; j++) {
						var arrValue = response.lstDocumentNumberDTO[j].document_numbering_id
								+ "-"
								+ response.lstDocumentNumberDTO[j].documentName;
						var idValue = response.lstDocumentNumberDTO[j].document_numbering_id;
						var documentName = response.lstDocumentNumberDTO[j].documentName;
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
								$("div#documentByName .typeahead").html(
										template);
								$("div#documentByName .typeahead").show();

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
		var docNumId = res[0];
		var documentName = res[1];
		getDocNumberMasterBydistrictId(docNumId);
		$("input#" + inputID).val(documentName);
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 7-Nov-2019
 * @codeFor : get getDocNumberMasterBydistrictId Detail
 ******************************************************************************/
function getDocNumberMasterBydistrictId(docId) {
	var inputs = [];
	inputs.push('docId=' + docId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editNumberDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDocNumberTemp(r, "search");

		}

	});

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 7-Nov-2019
 * @codeFor : getDistrictMasterById
 ******************************************************************************/
function getDistrictMasterById() {
	var docId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(docId)) {
		alert("Please Enter Number Only!");
		$("#stateId").focus();
		return false;
	}
	getDocNumberMasterBydistrictId(docId);
}

/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 13112019
 * @comment Below js code to to load the HSN No on Item master page
 ******************************************************************************/
function getAllHSNList() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryItemMaster/loadHSNList",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent + 
				"<select class='col-md-12'><option value=''>--Select HSN No--</option>";
			for (var i = 0; i < r.length; i++) {
				divContent = divContent + "<option value='" + r[i].tax_id + "'>" +	r[i].hsnName + "</option>";
			}
			$("#hsnNameId").html(divContent);
		}
	});
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 13112019
 * @comment below js function to perform autofill search operation on warehouse
 *          master POJO
 ******************************************************************************/
function setAutoWarehouseNameOnItemMaster(inputID) {
	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];
	inputs.push('warehouseName=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/autoFillSearchOnWarehouse",
		cache : false,
		success : function(r) {
			if (r.lstWarehouseMaster.length == 0) {
				alertify.error("You Cannot Enter Other Warehouse Name...!!!");
				document.getElementById('wareHouseNameId').value = "";
			}
			var template = "";
			for ( var j = 0; j < r.lstWarehouseMaster.length; j++) {

				var arrValue = r.lstWarehouseMaster[j].id + "-"
						+ r.lstWarehouseMaster[j].warehouseName + "-"
						+ r.lstWarehouseMaster[j].warehouseLocation;
				var id = r.lstWarehouseMaster[j].id;
				var warehouseName = r.lstWarehouseMaster[j].warehouseName;
				resultData.push({
					ID : id,
					Name : warehouseName
				});
				template = template + '<li data-value="' + id
						+ '" class=""><a href="#">' + warehouseName
						+ '</a></li>';

			}
			setTimeout(function() {
				$("div#searchWarehouseDivId .typeahead").html(template);
				$("div#searchWarehouseDivId .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayWarehouseSearchResultItemMaster,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	// below function to set the search value to search text feild and calling
	// getWarehouseDetailsById function
	function displayWarehouseSearchResultItemMaster(item) {
		var res = item.text.split('-');
		var warehouseName = res[0];
		getWarehouseDetailsByName(warehouseName);
		$("#" + inputID).val(warehouseName);
	}
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 13112019
 * @comment below js function to set find the warehouse master details and
 *          setting data to item master warehouse location
 ******************************************************************************/
function getWarehouseDetailsByName(warehouseName) {
	var inputs = [];
	inputs.push('warehouseName=' + warehouseName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryM/getWarehouseDetailsByName',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			// here we calling another function to set the data to table
			setWarehouseDataText(r);

		}
	});
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 13112019
 * @comment Below js code to show the records from warehouse master table and
 *          set to item master warehouse location
 ******************************************************************************/
function setWarehouseDataText(r) {
	for ( var i = 0; i < r.lstWarehouseMaster.length; i++) {
		var location = r.lstWarehouseMaster[i].warehouseLocation;
		document.getElementById("wareHouseLocationId").value = location;
	}

}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 05112019
 * @comment Below js code to add tax value to select box on item master
 ******************************************************************************/
function addTaxValue() {
	var taxcodeandrate = $("#selectTaxId").val();
	if (taxcodeandrate == '') {
		alert("Please Select Tax.");
		return false;
	}
	var add = taxcodeandrate;
	// var partyid = pid;

	var flag = 1;
	$('#lstBoxforTax').find('option').each(function() {
		if ($(this).html() == add) {
			alert("Tax Is Present In List");
			flag = 0;
		}
	});
	if (flag == 1) {
		var o = new Option("option text", "value");
		$(o).html(add);
		$(o).val(taxcodeandrate);
		$("#lstBoxforTax").append(o);
		$("#selectTaxId").val("");

	}
}

/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 05112019
 * @comment Below js code to remove tax value from select box on item master
 ******************************************************************************/
function removeTaxValue() {
	$('#lstBoxforTax option:selected').remove();
}

/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 05112019
 * @comment Below js code save Item master and slaves details w.r.t item id
 ******************************************************************************/
function saveItemMaster() {
	var assetItem;
	var labEquipment;
	var reagentItem;
	var consumableItem;
	var laundryItem;
	var cssdItem;
	var formType;
	var categoryType;
	var categoryName;
	var status;
	var inventoryItem;
	var purchaseItem;
	var issueItem;
	var maxStock;
	var reorderStock;
	var orderStock;
	var leadTime;
	var priority;
	var criticality;
	var purchaseStrategy;
	var categoryId;
	var hiddenHsnNameValue;
	// this is added by vishnu for service item 
	var serviceItem;
	var licenseItem;
	var itemMasterId = $('#itemMasterId').val();
	// item master details
	var itemName = $("#itemNameId").val();
	formType = $("#formTypeId").val();
	categoryName = $("#searchId11").val();
	categoryType = $("#searchId11").val();
	categoryId = $("#categoryId").val();
	status = $("#statusId").val();
	hsnName = $("#hsnNameId").val();
	inventoryItem = $("#inventoryItemId").val();
	purchaseItem = $("#inventoryItemId").val();
	issueItem = $("#issueItemId").val();
	maxStock = $("#maxStockId").val();
	reorderStock = $("#reorderStockId").val();
	orderStock = $("#orderStockId").val();
	leadTime = $("#leadTimeId").val();
	priority = $("#priorityId").val();
	criticality = $("#criticalityId").val();
	purchaseStrategy = $("#purchaseStrategyId").val();
	itemMasterId = $('#itemMasterId').val();
	if(($('#hiddenHsnNameValue').val() != ""  && $('#hiddenHsnNameValue').val() !=null && $('#hiddenHsnNameValue').val() !=undefined)){
		hiddenHsnNameValue = $('#hiddenHsnNameValue').val();  
	}else{
		hiddenHsnNameValue = $("#hsnNameId option:selected").text();
	}
	
	var batchWise = $('#batchWiseId').val();
	var gstCode = $('#gstCodeId').val();
	var companyName = $('#companyNameId').val();
	var aliceName = $('#aliceNameId').val();
	var cgst = $('#cgstRateId').val();
	var sgst = $('#sgstRateId').val();
	var taxName = $('#taxNameId').val();
	var taxRate = $('#taxRateId').val();
	// contract slave details
	var partyNameContract = "";
	var priorityContract = "";
	// warehouse slave details
	var warehouseName = $("#wareHouseNameId").val();
	var warehouseLocation = $("#wareHouseLocationId").val();
	var leadTimeUnit = $("#leadTimeUnitId").val();
	var hiddenWarehouseId = $("#hiddenWarehouseId").val();
	// maintenance slave details
	var warrantyWithProduct = $("#warrantyWithProductId").val();
	var warrantyWithProductDuration = $("#warrantyWithProductDurationId").val();
	if(warrantyWithProductDuration == ""){
		warrantyWithProductDuration = 0;
	}
	if(warrantyWithProduct == ""){
		warrantyWithProduct = "Year";
	}
	var amccmcFreeTextDuration = $("#amccmcFreeTextDurationId").val();
	if(amccmcFreeTextDuration == ""){
		amccmcFreeTextDuration = 0;
	}
	var amccmcDuration = $("#amccmcDurationId").val();
	if(amccmcDuration == ""){
		amccmcDuration = "Year";
	}
	var preventiveMaintenanceFreeTextDuration = $("#preventiveMaintenanceFreeTextDurationId").val();
	if(preventiveMaintenanceFreeTextDuration == ""){
		preventiveMaintenanceFreeTextDuration = 0;
	}
	var preventiveMaintenanceDuration = $("#preventiveMaintenanceDurationId").val();
	if(preventiveMaintenanceDuration == ""){
		preventiveMaintenanceDuration = "Year";
	}
	var hiddenMaintenanceId = $("#hiddenMaintenanceId").val();
	
	
	// item sales masters details
	var salesUomFactor = $("#salesUomFactorId").val();
	var unitPrice = $("#unitPriceId").val();
	

	if (unitPrice == "") {
		unitPrice = 0;
	}
	if (salesUomFactor == "") {
		salesUomFactor = 0;
	}
	if (salesFactorUom = "") {
		salesFactorUom = 'NA';
	}

	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var userIdPurchaseSlave = $('#userIdPurchaseSlave').val();
	var userIdPartySlave = $('#userIdPartySlave').val();
	var userIdSalesSlave = $('#userIdSalesSlave').val();
	if ($('#assetItemId').is(":checked")) {
		assetItem = 1;
		if($("#warrantyWithProductDurationId").val() == 0 || $("#warrantyWithProductId").val() == 0){
			alert("Please fill maintenance details first..!!");
			return false;
		}
		
	} else {
		assetItem = 0;
	}
	if ($('#laundryItemId').is(":checked")) {
		laundryItem = 1;
	} else {
		laundryItem = 0;
	}
	if ($('#cssdItemId').is(":checked")) {
		cssdItem = 1;
	} else {
		cssdItem = 0;
	}
	if ($('#reagentItemId').is(":checked")) {
		reagentItem = 1;
	} else {
		reagentItem = 0;
	}
	if ($('#consumableItemId').is(":checked")) {
		consumableItem = 1;
	} else {
		consumableItem = 0;
	}
	if ($('#labEquipmentId').is(":checked")) {
		labEquipment = 1;
	} else {
		labEquipment = 0;
	}

	if ($('#serviceItemId').is(":checked")) {
		serviceItem = 1;
	} else {
		serviceItem = 0;
	}
	if ($('#licenseItemId').is(":checked")) {
		licenseItem = 1;
	} else {
		licenseItem = 0;
	}
	
	var isLnL='-';
	if($("#laundryItemId").is(':checked')){
		isLnL='Y';
	}
	
if($("#cssdItemId").is(':checked'))
		{
				if($("#cssd1").is(':checked')){
					isLnL='CI';
				}
				
				if($("#cssd2").is(':checked')){
					isLnL='MI';
				}
		}	
	
	if (itemName == "" || itemName == null) {
		$("#itemNameId").focus();
		document.getElementById('itemNameId').style.borderColor = "red";
		$("#itemNameId").attr('data-original-title', 'Form Name is Required')
				.tooltip('fixTitle').tooltip('show');
		return false;
	} else {
		document.getElementById('itemNameId').style.borderColor = "green";
	}
	// form type validation
	if (formType == "" || formType == null) {
		$("#formTypeId").focus();
		document.getElementById('formTypeId').style.borderColor = "red";
		$('#formTypeId').attr('data-original-title', 'Form Type Is Required')
				.tooltip('fixTitle').tooltip('show');
		return false;
	} else {
		document.getElementById('formTypeId').style.borderColor = "green";
	}
	// category name validation
	if (categoryName == "" || categoryName == null) {
		$("#searchId11").focus();
		document.getElementById('searchId11').style.borderColor = "red";
		$('#searchId11').attr('data-original-title',
				'Category Name Is Required').tooltip('fixTitle')
				.tooltip('show');
		return false;
	} else {
		document.getElementById('searchId11').style.borderColor = "green";
	}
	// max stock validation
	var pattern = /^([0-9])*$/;
	if (!pattern.test(maxStock) || maxStock == "") {
		$("#maxStockId").focus();
		document.getElementById('maxStockId').style.borderColor = "red";
		$('#maxStockId').attr('data-original-title',
				'Max Stock should of digits').tooltip('fixTitle').tooltip(
				'show');
		return false;
	} else {
		document.getElementById('maxStockId').style.borderColor = "green";
	}
	// reorder stock validation
	var pattern = /^([0-9])*$/;
	if (!pattern.test(reorderStock) || reorderStock == "") {
		$("#reorderStockId").focus();
		document.getElementById('reorderStockId').style.borderColor = "red";
		$('#reorderStockId').attr('data-original-title',
				'Reorder stock should of digits').tooltip('fixTitle').tooltip(
				'show');
		return false;
	} else {
		document.getElementById('reorderStockId').style.borderColor = "green";
	}
	// order stock validation
	var pattern = /^([0-9])*$/;
	if (!pattern.test(orderStock) || orderStock == "") {
		$("#orderStockId").focus();
		document.getElementById('orderStockId').style.borderColor = "red";
		$('#orderStockId').attr('data-original-title',
				'Order stock should of digits').tooltip('fixTitle').tooltip(
				'show');
		return false;
	} else {
		document.getElementById('orderStockId').style.borderColor = "green";
	}
	// lead time validation
	var pattern = /^([0-9])*$/;
	if (!pattern.test(leadTime) || leadTime == "") {
		$("#leadTimeId").focus();
		document.getElementById('leadTimeId').style.borderColor = "red";
		$('#leadTimeId').attr('data-original-title',
				'Lead time should of digits').tooltip('fixTitle').tooltip(
				'show');
		return false;
	} else {
		document.getElementById('leadTimeId').style.borderColor = "green";
	}
	// criticality validation
	if (criticality == "" || criticality == null) {
		$("#criticalityId").focus();
		document.getElementById('criticalityId').style.borderColor = "red";
		$('#criticalityId').attr('data-original-title',
				'Criticality Is Required').tooltip('fixTitle').tooltip('show');
		return false;
	} else {
		document.getElementById('criticalityId').style.borderColor = "green";
	}
	// purchase strategy validation
	if (purchaseStrategy == "" || purchaseStrategy == null) {
		$("#purchaseStrategyId").focus();
		document.getElementById('purchaseStrategyId').style.borderColor = "red";
		$('#purchaseStrategyId').attr('data-original-title',
				'Purchase Strategy Is Required').tooltip('fixTitle').tooltip(
				'show');
		return false;
	} else {
		document.getElementById('purchaseStrategyId').style.borderColor = "green";
	}
	// warehouse master validation
	if (warehouseName == "" || warehouseName == null) {
		$("#wareHouseNameId").focus();
		document.getElementById('wareHouseNameId').style.borderColor = "red";
		$('#wareHouseNameId').attr('data-original-title',
				'Warehousename Is Required').tooltip('fixTitle')
				.tooltip('show');
		alertify.error("Warehouse name is required.!!");
		return false;
	} else {
		document.getElementById('wareHouseNameId').style.borderColor = "green";
	}

	// warehouse master validation
	if (batchWise == "" || batchWise == null) {
		$("#batchWiseId").focus();
		document.getElementById('batchWiseId').style.borderColor = "red";
		$('#batchWiseId').attr('data-original-title', 'batch Wise Is Required')
				.tooltip('fixTitle').tooltip('show');
		alertify.error("batch Wise name is required.!!");
		return false;
	} else {
		document.getElementById('batchWiseId').style.borderColor = "green";
	}
	
	if(leadTimeUnit==""||leadTimeUnit==0||leadTimeUnit==null||leadTimeUnit=="null"){
		alert("Please Select Lead Time Unit ...........!!!!");
		return false;
	}

	var itemPurchaseDetails = {
		lstItemPurchaseSlave : []
	};
	var itemSalesDetails = {
		lstItemSalesSlave : []
	};
	var itemPartyDetails = {
		lstItemPartySlave : []
	};
	var itemContractDetails = {
			lstItemContractSlave : []
		};
	var rowsItemPurchase = $('#itemPurchaseMasterTableId tbody tr.newAdded').length;
	if(rowsItemPurchase==0){
		
		alert("please enter atleast one purchase/issue info.!");
		return false;
	}
	
	
	var rowsItemSales = $('#itemSalesSlaveTableId tbody tr.newAddedSales').length;
	var rowsItemParty = $('#itemVendorMasterTableId tbody tr.newAddedParty').length;
	var rowsItemContract = $('#itemContractDetailsTableId tbody tr.newAddedContract').length;
	for ( var i = 1; i <= rowsItemPurchase; i++) {
		var purSlaveId = $("#itemPurchaseSlaveIddd" + i).html();
		var purchaseUnitPriceOne = $("#purchaseUnitPriceOneId" + i).html();
		var purchaseUomFactorOne = $("#purchaseUomFactorOneId" + i).html();
		var purchaseUomFactorTwo = $("#purchaseUomFactorTwoId" + i).html();
		var purchaseUomFactorThree = $("#purchaseUomFactorThreeId" + i).html();
		var purchaseUomFactorFour = $("#purchaseUomFactorFourId" + i).html();
		var purchaseFactorUomOne = $("#purchaseFactorUomOneId" + i).html();
		var purchaseFactorUomTwo = $("#purchaseFactorUomTwoId" + i).html();
		var purchaseFactorUomThree = $("#purchaseFactorUomThreeId" + i).html();
		var purchaseFactorUomFour = $("#purchaseFactorUomFourId" + i).html();
		var purchaseUnitPriceTwo = $("#purchaseUnitPriceTwoId" + i).html();
		var purchaseUnitPriceThree = $("#purchaseUnitPriceThreeId" + i).html();
		var purchaseUnitPriceFour = $("#purchaseUnitPriceFourId" + i).html();
		// added below line to save UON unit names
		var unitOneNameId = $("#unitOneNameId" + i).html();
		var unitTwoNameId = $("#unitTwoNameId" + i).html();
		var unitThreeNameId = $("#unitThreeNameId" + i).html();
		var unitFourNameId = $("#unitFourNameId" + i).html();

		setItemPurchaseSlaveList(itemPurchaseDetails, purchaseUnitPriceOne,
				purchaseUomFactorOne, purchaseUomFactorTwo,
				purchaseUomFactorThree, purchaseUomFactorFour,
				purchaseFactorUomOne, purchaseFactorUomTwo,
				purchaseFactorUomThree, purchaseFactorUomFour,
				purchaseUnitPriceTwo, purchaseUnitPriceThree,
				purchaseUnitPriceFour, userIdPurchaseSlave, unitOneNameId,
				unitTwoNameId, unitThreeNameId, unitFourNameId, purSlaveId,unitId);
	}
	for ( var i = 1; i <= rowsItemSales; i++) {
		var unitPriceOne = $("#unitPriceOneId" + i).html();
		var salesUomFactorTwo = $("#salesUomFactorTwoId" + i).html();
		var salesFactorUomThree = $("#salesFactorUomThreeId" + i).html();
		setItemSalesSlaveList(itemSalesDetails, unitPriceOne,
				salesUomFactorTwo, salesFactorUomThree, userIdSalesSlave);
	}
	for ( var i = 1; i <= rowsItemParty; i++) {
		var vendorName = $("#vendorNameId" + i).html();
		var vendorId = $("#vendorId" + i).html();
		var partyInfoId = $("#partyItemInfoId" + i).html();
		var itemNameOnVendor = $("#itemNameOnVendor" + i).html();
		setItemPartySlaveList(itemPartyDetails, vendorName, vendorId,
				itemNameOnVendor, userIdPartySlave,partyInfoId,unitId);
	}
	for ( var i = 1; i <= rowsItemContract; i++) {
		partyNameContract = $("#partyNameContractId" + i).html();
		var rateContract = $("#rateContractId" + i).html();
		var contractSlaveId = $("#contractSlaveId" + i).html();
		priorityContract = $("#priorityContractId" + i).html();
		var mrpContract = $("#mrpContractId" + i).html();
		var referenceNoContract = $("#referenceNoContractId" + i).html();
		var profitContract = $("#profitContractId" + i).html();
		var fromDateContract = $("#fromDateContractId" + i).html();
		var toDateContract = $("#toDateContractId" + i).html();
		var withContract = $("#withContractId" + i).html();
		var partyMasterIdContract = $("#partyMasterIdContractId" + i).html();
		
		// contract details validation
//		if (partyNameContract == "" || partyNameContract == null) {
//			$("#partyNameContractId").focus();
//			document.getElementById('partyNameContractId').style.borderColor = "red";
//			$('#partyNameContractId').attr('data-original-title',
//					'Party Name Is Required').tooltip('fixTitle')
//					.tooltip('show');
//			alertify.error("Party Name is required.!!");
//			return false;
//		} else {
//			document.getElementById('partyNameContractId').style.borderColor = "green";
//		}
//		
//		if (priorityContract == "" || priorityContract == null) {
//			$("#priorityContractId").focus();
//			document.getElementById('priorityContractId').style.borderColor = "red";
//			$('#partyNameContractId').attr('data-original-title',
//					'Priority Is Required').tooltip('fixTitle')
//					.tooltip('show');
//			alertify.error("Priority is required.!!");
//			return false;
//		} else {
//			document.getElementById('priorityContractId').style.borderColor = "green";
//		}
		setItemContractSlaveList(itemContractDetails, partyNameContract, rateContract,priorityContract,mrpContract,
				referenceNoContract,profitContract,fromDateContract,toDateContract,withContract,partyMasterIdContract,contractSlaveId,unitId);
	}
	itemPurchaseDetails = JSON.stringify(itemPurchaseDetails);
	itemSalesDetails = JSON.stringify(itemSalesDetails);
	itemPartyDetails = JSON.stringify(itemPartyDetails);
	itemContractDetails = JSON.stringify(itemContractDetails);
	var inputs = [];
	// item master details
	inputs.push('id=' + itemMasterId);
	inputs.push('itemName=' + itemName);
	inputs.push('formType=' + formType);
	inputs.push('categoryType=' + categoryType);
	inputs.push('status=' + status);
	inputs.push('invItemStatus=' + inventoryItem);
	inputs.push('purchaseItemStatus=' + purchaseItem);
	inputs.push('assetItemStatus=' + assetItem);
	inputs.push('labEquipmentStatus=' + labEquipment);
	inputs.push('reagentItemStatus=' + reagentItem);
	inputs.push('consumableItemStatus=' + consumableItem);
	inputs.push('issueItemStatus=' + issueItem);
	inputs.push('serviceItemStatus=' + serviceItem);
	inputs.push('licenseItemStatus=' + licenseItem);
	inputs.push('cssItemStatus=' + cssdItem);
	inputs.push('maxStock=' + maxStock);
	inputs.push('reorderStock=' + reorderStock);
	inputs.push('orderStock=' + orderStock);
	inputs.push('priority=' + priority);
	inputs.push('criticality=' + criticality);
	inputs.push('purchaseStrategy=' + purchaseStrategy);
	inputs.push('laundryItemStatus=' + laundryItem);
	inputs.push('leadTime=' + leadTime);
	inputs.push('batchWise=' + batchWise);
	inputs.push('gstCode=' + gstCode);
	inputs.push('companyName=' + companyName);
	inputs.push('aliceName=' + aliceName);
	inputs.push('cgst=' + cgst);
	inputs.push('sgst=' + sgst);
	inputs.push('taxName=' + taxName);
	inputs.push('taxRate=' + taxRate);
	inputs.push('hsnName=' + hsnName);
	inputs.push('leadTimeUnit=' + leadTimeUnit);
	inputs.push('hsnNameValue=' + hiddenHsnNameValue);
	// item warehouse slave details
	inputs.push('warehouseName=' + warehouseName);
	inputs.push('warehouseLocation=' + warehouseLocation);
	inputs.push('wareHouseId=' + hiddenWarehouseId);
	// item maintenance slave details
	inputs.push('warrantyWithProduct=' + warrantyWithProduct);
	inputs.push('warrantyWithProductDuration=' + warrantyWithProductDuration);
	inputs.push('amccmcFreeTextDuration=' + amccmcFreeTextDuration);
	inputs.push('amccmcDuration=' + amccmcDuration);
	inputs.push('preventiveMaintenanceFreeTextDuration=' + preventiveMaintenanceFreeTextDuration);
	inputs.push('preventiveMaintenanceDuration=' + preventiveMaintenanceDuration);
	inputs.push('maintenanceId=' + hiddenMaintenanceId);
	
	// item purchase slave details
	inputs.push('itemPurchaseDetails=' + itemPurchaseDetails);
	// item sales slave details
	inputs.push('itemSalesDetails=' + itemSalesDetails);
	// item party slave details
	inputs.push('itemPartyDetails=' + itemPartyDetails);
	// item contract slave details
	inputs.push('itemContractDetails=' + itemContractDetails);

	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('categoryId=' + categoryId);
	
	inputs.push('isLnL=' + isLnL);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryItemMaster/saveItemMaster",
				cache : false,
				success : function(r) {
					if (r == 1) {
						alertify.success("Records Saved Sucessfully");
						refreshItemMasterMaster();
						$("#warrantyWithProductDurationId").val("");
						setTimeout(function() {
							window.location.reload();
						}, 1000);

					} else if (r == 2) {
						alertify.success("Records Updated Sucessfully");
						refreshItemMasterMaster();
						$("#warrantyWithProductDurationId").val("");
						setTimeout(function() {
							window.location.reload();
						}, 1000);
					} else if (r == 3) {
						alertify
								.error("This Item Name Is Already Present IN The Records");
					}

					else {
						alertify.error("Oops Some Problem Ocured");
					}

				}
			});
}

/*******************************************************************************
 * @since 06-11-2019
 * @comment created this js function to push the item purchase slave value into the list
 * @author Rohit Sandbhor
 * @param purchaseUnitPriceOne
 * @param purchaseUomFactorOne
 * @param purchaseUomFactorTwo
 * @param purchaseUomFactorThree
 * @param purchaseUomFactorFour
 * @param purchaseFactorUomOne
 * @param purchaseFactorUomTwo
 * @param purchaseFactorUomThree
 * @param purchaseFactorUomFour
 * @param purchaseUnitPriceTwo
 * @param purchaseUnitPriceThree
 * @param purchaseUnitPriceFour
 ******************************************************************************/
function setItemPurchaseSlaveList(itemPurchaseDetails, purchaseUnitPriceOne,
		purchaseUomFactorOne, purchaseUomFactorTwo, purchaseUomFactorThree,
		purchaseUomFactorFour, purchaseFactorUomOne, purchaseFactorUomTwo,
		purchaseFactorUomThree, purchaseFactorUomFour, purchaseUnitPriceTwo,
		purchaseUnitPriceThree, purchaseUnitPriceFour, userIdPurchaseSlave,
		unitOneNameId, unitTwoNameId, unitThreeNameId, unitFourNameId,
		purSlaveId,unitId) {
	itemPurchaseDetails.lstItemPurchaseSlave.push({
		id : purSlaveId,
		purchaseUnitPrice1 : (purchaseUnitPriceOne != "undefined" && purchaseUnitPriceOne != null && purchaseUnitPriceOne!= 'null' && purchaseUnitPriceOne!= '') ? purchaseUnitPriceOne : 0,
		purchaseUomFactor1 : (purchaseUomFactorOne != "undefined" && purchaseUomFactorOne != null && purchaseUomFactorOne != 'null' && purchaseUomFactorOne!='') ? purchaseUomFactorOne : 0,
		purchaseUomFactor2 : (purchaseUomFactorTwo != "undefined" && purchaseUomFactorTwo != null && purchaseUomFactorTwo != 'null' && purchaseUomFactorTwo !='') ? purchaseUomFactorTwo : 0,
		purchaseUomFactor3 : (purchaseUomFactorThree != "undefined" && purchaseUomFactorThree != null && purchaseUomFactorThree != 'null' && purchaseUomFactorThree !='') ? purchaseUomFactorThree : 0,
		purchaseUomFactor4 : (purchaseUomFactorFour != "undefined" && purchaseUomFactorFour != null && purchaseUomFactorFour != 'null' && purchaseUomFactorFour !='') ? purchaseUomFactorFour : 0,
		purchaseFactorUom1 : (purchaseFactorUomOne != "undefined" && purchaseFactorUomOne != null && purchaseFactorUomOne != 'null' && purchaseFactorUomOne !='') ? purchaseFactorUomOne : 0,
		purchaseFactorUom2 : (purchaseFactorUomTwo != "undefined" && purchaseFactorUomTwo != null && purchaseFactorUomTwo != 'null' && purchaseFactorUomTwo !='') ? purchaseFactorUomTwo : 0,
		purchaseFactorUom3 : (purchaseFactorUomThree != "undefined" && purchaseFactorUomThree != null && purchaseFactorUomThree != 'null' && purchaseFactorUomThree !='') ? purchaseFactorUomThree : 0,
		purchaseFactorUom4 : (purchaseFactorUomFour != "undefined" && purchaseFactorUomFour != null && purchaseFactorUomFour != 'null' && purchaseFactorUomFour !='') ? purchaseFactorUomFour : 0,
		purchaseUnitPrice2 : (purchaseUnitPriceTwo != "undefined" && purchaseUnitPriceTwo != null && purchaseUnitPriceTwo != 'null' && purchaseUnitPriceTwo !='') ? purchaseUnitPriceTwo : 0,
		purchaseUnitPrice3 : (purchaseUnitPriceThree != "undefined" && purchaseUnitPriceThree != null && purchaseUnitPriceThree != 'null' && purchaseUnitPriceThree !='') ? purchaseUnitPriceThree : 0,
		purchaseUnitPrice4 : (purchaseUnitPriceFour != "undefined" && purchaseUnitPriceFour != null && purchaseUnitPriceFour != 'null' && purchaseUnitPriceFour !='') ? purchaseUnitPriceFour : 0,
		userId : (userIdPurchaseSlave != "undefined" && userIdPurchaseSlave != null) ? userIdPurchaseSlave : 0,
		uomUnitOneName : (unitOneNameId != "undefined" && unitOneNameId != null && unitOneNameId != 'null' && unitOneNameId !='') ? unitOneNameId : "NA",
		uomUnitTwoName : (unitTwoNameId != "undefined" && unitTwoNameId != null && unitTwoNameId != 'null' && unitTwoNameId !='') ? unitTwoNameId : "NA",
		uomUnitThreeName : (unitThreeNameId != "undefined" && unitThreeNameId != null && unitThreeNameId != 'null' && unitThreeNameId !='') ? unitThreeNameId : "NA",
		uomUnitFourName : (unitFourNameId != "undefined" && unitFourNameId != null && unitFourNameId != 'null' && unitFourNameId !='') ? unitFourNameId : "NA",
		unitId: (unitId != 'undefined' && unitId != null) ? unitId : 0
	});
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 13112019
 * @comment This function is created for to set the item sales slave list data to perticular list
 * @param itemSalesDetails
 * @param unitPriceThree
 * @param salesUomFactorTwo
 * @param salesFactorUomThree
 ******************************************************************************/
function setItemSalesSlaveList(itemSalesDetails, unitPriceOne,
		salesUomFactorTwo, salesFactorUomThree, userIdSalesSlave) {
	itemSalesDetails.lstItemSalesSlave.push({
		unitPrice : unitPriceOne,
		salesUomFactor : salesUomFactorTwo,
		salesFactorUom : salesFactorUomThree,
		userId : userIdSalesSlave

	});
}
/**
 * 
 * @param itemPartyDetails
 * @param vendorName
 * @param vendorId
 * @param userIdPartySlave
 */
function setItemPartySlaveList(itemPartyDetails, vendorName, vendorId,
		itemNameOnVendor, userIdPartySlave,partyInfoId,unitId) {
	itemPartyDetails.lstItemPartySlave.push({
		id : partyInfoId,
		partyName : vendorName,
		partyMasterId : vendorId,
		userId : userIdPartySlave,
		itemMasterName : itemNameOnVendor,
		unitId: (unitId != 'undefined' && unitId != null) ? unitId : 0
	});
}
/**
 * 
 * @param itemContractDetails
 * @param partyNameContract
 * @param rateContract
 * @param priorityContract
 * @param mrpContract
 * @param referenceNoContract
 * @param profitContract
 * @param fromDateContract
 * @param toDateContract
 * @param withContract
 * @param partyMasterIdContract
 */
function setItemContractSlaveList(itemContractDetails, partyNameContract, rateContract,priorityContract,mrpContract,
		referenceNoContract,profitContract,fromDateContract,toDateContract,withContract,partyMasterIdContract,contractSlaveId,unitId) {
	itemContractDetails.lstItemContractSlave.push({
		id                   : contractSlaveId,
		partyNameContract    : partyNameContract,
		rateValue            : rateContract,
		priorityContract     : priorityContract,
		mrpValue             : mrpContract,
		referenceNo          : referenceNoContract,
		profitValue          : profitContract,
		fromDate             : fromDateContract,
		toDate               : toDateContract,
		withContract         : withContract,
		partyMasterIdContact : partyMasterIdContract,
		unitId: (unitId != 'undefined' && unitId != null) ? unitId : 0
		
	});
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 05112019
 * @comment Below js code to set the hidden factor price values on item purchase
 *          master
 ******************************************************************************/
function setFactorPrice(value) {
	$("#hiddenFactorPrice").val(value);
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 05112019
 * @comment Below js code to set the hidden factor value on item purchase master
 ******************************************************************************/
function setFactorValue(value) {
	$("#hiddenFactorValue").val(value);
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 05112019
 * @comment Below js code to set the last UOM value on item purchase master
 ******************************************************************************/
function setLastUom(value) {
	$("#hiddenLastUOM").val(value);
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 05112019
 * @comment Below js code to calculate unit prize in item purchase master
 ******************************************************************************/
function calculateUnitPrice() {
	var purchaseUomFactor2 = $("#purchaseUomFactor2Id").val();
	var purchaseUomFactor3 = $("#purchaseUomFactor3Id").val();
	var purchaseUomFactor4 = $("#purchaseUomFactor4Id").val();
	var unitPrice = $("#purchaseUnitPrice1Id").val();
	var unitPrice1;
	var unitPrice2;
	var unitPrice3;
	if(purchaseUomFactor2 == 0){
		unitPrice1 = 0;
	}else{
	unitPrice1 = unitPrice / purchaseUomFactor2;
	if (purchaseUomFactor2 != "" || purchaseUomFactor2 != 0) {
		if (unitPrice1 == 0) {
			$("#purchaseUnitPrice2Id").val(0);
		} else {
			$("#purchaseUnitPrice2Id").val(parseFloat(unitPrice1).toFixed(2));
		}
	}
	}if(purchaseUomFactor3 == 0){
		unitPrice2 = 0;
	}else{
	unitPrice2 = unitPrice1 / purchaseUomFactor3;
	if (purchaseUomFactor3 != "" || purchaseUomFactor3 != 0) {
		if (unitPrice1 == 0) {
			$("#purchaseUnitPrice3Id").val(0);
		} else {
			$("#purchaseUnitPrice3Id").val(parseFloat(unitPrice2).toFixed(2));
		}
	}
	}
	if(purchaseUomFactor4 == 0){
		unitPrice3 = 0;
	}
	else{
	unitPrice3 = unitPrice2 / purchaseUomFactor4;
	if (purchaseUomFactor4 != "" || purchaseUomFactor4 != 0) {
		if (unitPrice1 == 0) {
			$("#purchaseUnitPrice4Id").val(0);
		} else {
			$("#purchaseUnitPrice4Id").val(parseFloat(unitPrice3).toFixed(2));
		}

	}
	}
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 13112019
 * @comment Below js code to get the item purchase slave details w.r.t master id
 ******************************************************************************/
function showItemPurchaseMasterDetails(masterId) {
	var inputs = [];
	inputs.push('masterId=' + masterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryItemMaster/getItemPurchaseSlaveRecords",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setItemPurchaseDataToTable(r,masterId);
		}
	});
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 13112019
 * @comment Below js code to show the records from item purchase slave table and
 *          showing it dynamically
 ******************************************************************************/
function setItemPurchaseDataToTable(r,masterId) {
	var htm = "";
	var index = 1;
	var count = 0;
	for ( var i = 0; i < r.lstItemPurchaseSlave.length; i++) {
		count++;
		htm = htm
				+ '<tr class="newAdded"> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'

				+ ' <td class="col-md-1 center" style="display:none" id="itemPurchaseSlaveIddd'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].id
				+ '</td>'

				+ ' <td class="col-md-1 center" id="purchaseUnitPriceOneId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].purchaseUnitPrice1
				+ '</td>'
				
				+ ' <td class="col-md-1 center" style="display:none" id="purchaseUnitPriceTwoId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].purchaseUnitPrice2
				+ '</td>'
				
				+ ' <td class="col-md-1 center" style="display:none" id="purchaseUnitPriceThreeId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].purchaseUnitPrice3
				+ '</td>'
				
				+ ' <td class="col-md-1 center" style="display:none" id="purchaseUnitPriceFourId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].purchaseUnitPrice4
				+ '</td>'
				
				+ ' <td class="col-md-1 center" id="purchaseUomFactorOneId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].purchaseUomFactor1
				+ '</td>'
				+ ' <td class="col-md-1 center" id="purchaseUomFactorTwoId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].purchaseUomFactor2
				+ '</td>'
				+ ' <td class="col-md-1 center" id="purchaseUomFactorThreeId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].purchaseUomFactor3
				+ '</td>'
				+ ' <td class="col-md-1 center" id="purchaseUomFactorFourId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].purchaseUomFactor4
				+ '</td>'
				
				+ ' <td class="col-md-1 center" id="purchaseFactorUomOneId'
				+ count
				+ '" style="display:none;">'
				+ r.lstItemPurchaseSlave[i].purchaseFactorUom1
				+ '</td>'
				+ ' <td class="col-md-1 center" id="purchaseFactorUomTwoId'
				+ count
				+ '" style="display:none;">'
				+ r.lstItemPurchaseSlave[i].purchaseFactorUom2
				+ '</td>'
				+ ' <td class="col-md-1 center" id="purchaseFactorUomThreeId'
				+ count
				+ '" style="display:none;">'
				+ r.lstItemPurchaseSlave[i].purchaseFactorUom3
				+ '</td>'
				+ ' <td class="col-md-1 center" id="purchaseFactorUomFourId'
				+ count
				+ '" style="display:none;">'
				+ r.lstItemPurchaseSlave[i].purchaseFactorUom4
				+ '</td>'

				+ ' <td class="col-md-1 center" style="display:none" id="unitOneNameId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].uomUnitOneName
				+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none" id="unitTwoNameId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].uomUnitTwoName
				+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none" id="unitThreeNameId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].uomUnitThreeName
				+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none" id="unitFourNameId'
				+ count
				+ '">'
				+ r.lstItemPurchaseSlave[i].uomUnitFourName
				+ '</td>'
				
				+ ' <td class="col-md-1 center" id="purchaseItemInfoId1'
				+ count
				+ '" style="display:none" >'
				+ count
				+ '</td>'
				
				+ ' <td class="col-md-1 center" id="purchaseItemInfoId'
				+ count
				+ '" style="display:none">'
				+ r.lstItemPurchaseSlave[i].id
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editPurchaseInfoItemMaster('+ count + ',\'fromDB\')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteItemPurchaseSlave('+r.lstItemPurchaseSlave[i].id+',\"'+masterId+'\")><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#itemPurchaseMasterRecordList").html(htm);
};
/*******************************************************************************
 * @since 06-11-2019
 * @comment created this function to get the row count of item purchase table
 * @Author Rohit Sandbhor
 ******************************************************************************/
function addRowsItemPurchase() {
	var rows = $('#itemPurchaseMasterTableId tbody tr.newAdded').length;
	// calling the function
	addDynamicRecordsToPurchaseTable(rows + 1);
}
/*******************************************************************************
 * @since 06-11-2019
 * @comment created this function to get the row count of item sales table
 * @Author Rohit Sandbhor
 ******************************************************************************/
function addRowsItemSales() {
	var rows = $('#itemSalesSlaveTableId tbody tr.newAddedSales').length;
	// calling the function
	addDynamicRecordsSalesToTable(rows + 1);
}
/*******************************************************************************
 * @since 06-11-2019
 * @Comment Created this js function to create the dynamic table for item sales
 *          slave records
 * @Author Rohit Sandbhor
 * @param id
 ******************************************************************************/
function addDynamicRecordsSalesToTable(id) {
	var salesUomFactor = $("#salesUomFactorId").val();
	var salesFactorUom = $("#salesFactorUomId").val();
	var unitPrice = $("#unitPriceId").val();
	var htm = "";
	var index = 1;
	htm = htm
			+ '<tr class="newAddedSales"> '
			+ ' <td class="col-md-1 center">'
			+ index
			+ '</td>'
			+ ' <td class="col-md-1 center" id="unitPriceOneId'
			+ id
			+ '">'
			+ unitPrice
			+ '</td>'
			+ ' <td class="col-md-1 center" id="salesUomFactorTwoId'
			+ id
			+ '">'
			+ salesUomFactor
			+ '</td>'
			+ ' <td class="col-md-1 center" id="salesFactorUomThreeId'
			+ id
			+ '" style="display:none;">'
			+ salesFactorUom
			+ '</td>'
			+ ' <td class="col-md-1 center"></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteFinancialMaster('
			+ unitPrice + ')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
	$("#itemSalesSlaveTableId").append(htm);
	// refreshItemPurchaseSlaveData();
}

/*******************************************************************************
 * @since 06-11-2019
 * @Comment Created this js function to create the dynamic table for item
 *          purchase slave records
 * @Author Rohit Sandbhor
 * @param id
 ******************************************************************************/
function addDynamicRecordsToPurchaseTable(id) {
	var purchaseUomFactor1 = $("#purchaseUomFactor1Id").val();
	var purchaseUomFactor2 = $("#purchaseUomFactor2Id").val();
	var purchaseUomFactor3 = $("#purchaseUomFactor3Id").val();
	var purchaseUomFactor4 = $("#purchaseUomFactor4Id").val();
	var purchaseFactorUom1 = $("#purchaseFactorUom1Id").val();
	var purchaseFactorUom2 = $("#purchaseFactorUom2Id").val();
	var purchaseFactorUom3 = $("#purchaseFactorUom3Id").val();
	var purchaseFactorUom4 = $("#purchaseFactorUom4Id").val();
	var purchaseUnitPrice1 = $("#purchaseUnitPrice1Id").val();
	var purchaseUnitPrice2 = $("#purchaseUnitPrice2Id").val();
	var purchaseUnitPrice3 = $("#purchaseUnitPrice3Id").val();
	var purchaseUnitPrice4 = $("#purchaseUnitPrice4Id").val();
	var unitOneName = $("#uomFactorOneValueId").val();
	var unitTwoName = $("#uomFactorTwoValueId").val();
	var unitThreeName = $("#uomFactorThreeValueId").val();
	var unitFourName = $("#uomFactorFourValueId").val();

	if (purchaseUnitPrice1 == "") {
		purchaseUnitPrice1 = 0;
	}
	if (purchaseUnitPrice2 == "" || purchaseUnitPrice2 == null) {
		purchaseUnitPrice2 = 0;
	}
	if (purchaseUnitPrice3 == "" || purchaseUnitPrice3 == null) {
		purchaseUnitPrice3 = 0;
	}
	if (purchaseUnitPrice4 == "" || purchaseUnitPrice4 == null) {
		purchaseUnitPrice4 = 0;
	}

	if (purchaseUomFactor1 == "") {
		purchaseUomFactor1 = 0;
	}
	if (purchaseUomFactor2 == "") {
		purchaseUomFactor2 = 0;
	}
	if (purchaseUomFactor3 == "") {
		purchaseUomFactor3 = 0;
	}
	if (purchaseUomFactor4 == "") {
		purchaseUomFactor4 = 0;
	}
	if (purchaseFactorUom1 == "" || purchaseFactorUom1 == null) {
		purchaseFactorUom1 = 0;
	}
	if (purchaseFactorUom2 == "" || purchaseFactorUom2 == null) {
		purchaseFactorUom2 = 0;
	}
	if (purchaseFactorUom3 == "" || purchaseFactorUom3 == null) {
		purchaseFactorUom3 = 0;
	}
	if (purchaseFactorUom4 == "" || purchaseFactorUom4 == null) {
		purchaseFactorUom4 = 0;
	}
	if (unitOneName == "") {
		unitOneName = "NA";
	}
	if (unitTwoName == "") {
		unitTwoName = "NA";
	}
	if (unitThreeName == "") {
		unitThreeName = "NA";
	}
	if (unitFourName == "") {
		unitFourName = "NA";
	}
	
	/*if(purchaseFactorUom1 == 0 || purchaseUomFactor1 == 0 || purchaseUnitPrice1 == 0){
		alert("Atleast fill minimum 1 factorization details..!!!");
		return false;
	}*/
	
	
	if(purchaseUnitPrice1 != "" && purchaseUomFactor1 != "" && purchaseFactorUom1 == 0){
	alert("Kindly Select Respective UMO Unit For This Unit Price..!!");
	return false;
	}
	
	if(purchaseUnitPrice2 != "" && purchaseUomFactor2 != "" && purchaseFactorUom2 == 0){
		alert("Kindly Select Respective UMO Unit For This Unit Price..!!");
		return false;
		}
	
	if(purchaseUnitPrice3 != "" && purchaseUomFactor3 != "" && purchaseFactorUom3 == 0){
		alert("Kindly Select Respective UMO Unit For This Unit Price..!!");
		return false;
		}
	
	if(purchaseUnitPrice4 != "" && purchaseUomFactor4 != "" && purchaseFactorUom4 == 0){
		alert("Kindly Select Respective UMO Unit For This Unit Price..!!");
		return false;
		}
	
	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'

			+ ' <td class="col-md-1 center" style="display:none" id="itemPurchaseSlaveIddd'
			+ id
			+ '">'
			+ 0
			+ '</td>'

			+ ' <td class="col-md-1 center" id="purchaseUnitPriceOneId'
			+ id
			+ '">'
			+ purchaseUnitPrice1
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseUomFactorOneId'
			+ id
			+ '">'
			+ purchaseUomFactor1
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseUomFactorTwoId'
			+ id
			+ '">'
			+ purchaseUomFactor2
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseUomFactorThreeId'
			+ id
			+ '">'
			+ purchaseUomFactor3
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseUomFactorFourId'
			+ id
			+ '">'
			+ purchaseUomFactor4
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseFactorUomOneId'
			+ id
			+ '" style="display:none;">'
			+ purchaseFactorUom1
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseFactorUomTwoId'
			+ id
			+ '" style="display:none;">'
			+ purchaseFactorUom2
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseFactorUomThreeId'
			+ id
			+ '" style="display:none;">'
			+ purchaseFactorUom3
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseFactorUomFourId'
			+ id
			+ '" style="display:none;">'
			+ purchaseFactorUom4
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseUnitPriceTwoId'
			+ id
			+ '" style="display:none;">'
			+ purchaseUnitPrice2
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseUnitPriceThreeId'
			+ id
			+ '" style="display:none;">'
			+ purchaseUnitPrice3
			+ '</td>'
			+ ' <td class="col-md-1 center" id="purchaseUnitPriceFourId'
			+ id
			+ '" style="display:none;">'
			+ purchaseUnitPrice4
			+ '</td>'
			+ ' <td class="col-md-1 center" id="unitOneNameId'
			+ id
			+ '" style="display:none;">'
			+ unitOneName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="unitTwoNameId'
			+ id
			+ '" style="display:none;">'
			+ unitTwoName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="unitThreeNameId'
			+ id
			+ '" style="display:none;">'
			+ unitThreeName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="unitFourNameId'
			+ id
			+ '" style="display:none;">'
			+ unitFourName
			+ '</td>'
			//edit purchase info button
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editPurchaseInfoItemMaster('+ id + ',\'fromUI\')><i class="fa fa-edit"></i></button></td>'
			
			+ ' <td class="col-md-1 center" id="purchaseItemInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="purchaseItemInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			/*+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteItemPurchaseDetails('
			+ purchaseUomFactor1
			+ ')><i class="fa fa-trash-o"></i></button></td>'*/ 
			
			+ '</tr>';
	$("#itemPurchaseMasterTableId").append(htm);
	refreshItemPurchaseSlaveData();
}
/*******************************************************************************
 * @since 13112019
 * @comment below js function is created for to edit the item purchase slave
 *          details
 * @author Rohit Sandbhor
 * @param id
 ******************************************************************************/
/*function editItemPurchaseSlave(id) {
	document.getElementById("updateRecordButtonPurchaseId").style.display = "block";
	document.getElementById("addRowsButtonId").style.display = "none";
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryItemMaster/editItemPurchaseSlave",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$('#purchaseUomFactor1Id').val(r.purchaseUomFactor1);
			$('#purchaseUomFactor2Id').val(r.purchaseUomFactor2);
			$('#purchaseUomFactor3Id').val(r.purchaseUomFactor3);
			$('#purchaseUomFactor4Id').val(r.purchaseUomFactor4);
			$('#purchaseFactorUom1Id').select2('val', r.purchaseFactorUom1);
			$('#purchaseFactorUom2Id').select2('val', r.purchaseFactorUom2);
			$('#purchaseFactorUom3Id').select2('val', r.purchaseFactorUom3);
			$('#purchaseFactorUom4Id').select2('val', r.purchaseFactorUom4);
			$('#purchaseUnitPrice1Id').val(r.purchaseUnitPrice1);
			$('#purchaseUnitPrice2Id').val(r.purchaseUnitPrice2);
			$('#purchaseUnitPrice3Id').val(r.purchaseUnitPrice3);
			$('#purchaseUnitPrice4Id').val(r.purchaseUnitPrice4);
			$('#uomFactorOneValueId').val(r.uomUnitOneName);
			$('#uomFactorTwoValueId').val(r.uomUnitTwoName);
			$('#uomFactorThreeValueId').val(r.uomUnitThreeName);
			$('#uomFactorFourValueId').val(r.uomUnitFourName);

			$('#itemPurchaseSlaveId').val(r.id);

		}
	});
}*/
/*******************************************************************************
 * @since 13112019
 * @author Rohit Sandbhor
 * @comment below js function is created for update item purchase slave details
 ******************************************************************************/
/*function updateItemPurchaseSlave() {
	var purchaseUomFactor1 = $("#purchaseUomFactor1Id").val();
	var purchaseUomFactor2 = $("#purchaseUomFactor2Id").val();
	var purchaseUomFactor3 = $("#purchaseUomFactor3Id").val();
	var purchaseUomFactor4 = $("#purchaseUomFactor4Id").val();
	var uomUnitOneName = $("#uomFactorOneValueId").val();
	var uomUnitTwoName = $("#uomFactorTwoValueId").val();
	var uomUnitThreeName = $("#uomFactorThreeValueId").val();
	var uomUnitFourName = $("#uomFactorFourValueId").val();


	if (purchaseUomFactor2 == "") {
		purchaseUomFactor2 = 0;
	}

	if (purchaseUomFactor3 == "") {
		purchaseUomFactor3 = 0;
	}

	if (purchaseUomFactor4 == "") {
		purchaseUomFactor4 = 0;
	}

	var purchaseFactorUom1 = $("#purchaseFactorUom1Id").val();
	var purchaseFactorUom2 = $("#purchaseFactorUom2Id").val();
	var purchaseFactorUom3 = $("#purchaseFactorUom3Id").val();
	var purchaseFactorUom4 = $("#purchaseFactorUom4Id").val();
	var purchaseUnitPrice1 = $("#purchaseUnitPrice1Id").val();
	var purchaseUnitPrice2 = $("#purchaseUnitPrice2Id").val();
	var purchaseUnitPrice3 = $("#purchaseUnitPrice3Id").val();
	var purchaseUnitPrice4 = $("#purchaseUnitPrice4Id").val();
	var itemPurchaseSlaveId = $("#itemPurchaseSlaveId").val();
	var masterId = $("#itemMasterId").val();
	var inputs = [];
	inputs.push('purchaseUomFactor1=' + purchaseUomFactor1);
	inputs.push('purchaseUomFactor2=' + purchaseUomFactor2);
	inputs.push('purchaseUomFactor3=' + purchaseUomFactor3);
	inputs.push('purchaseUomFactor4=' + purchaseUomFactor4);
	inputs.push('purchaseFactorUom1=' + purchaseFactorUom1);
	inputs.push('purchaseFactorUom2=' + purchaseFactorUom2);
	inputs.push('purchaseFactorUom3=' + purchaseFactorUom3);
	inputs.push('purchaseFactorUom4=' + purchaseFactorUom4);
	inputs.push('purchaseUnitPrice1=' + purchaseUnitPrice1);
	inputs.push('purchaseUnitPrice2=' + purchaseUnitPrice2);
	inputs.push('purchaseUnitPrice3=' + purchaseUnitPrice3);
	inputs.push('purchaseUnitPrice4=' + purchaseUnitPrice4);
	inputs.push('uomUnitOneName=' + uomUnitOneName);
	inputs.push('uomUnitTwoName=' + uomUnitTwoName);
	inputs.push('uomUnitThreeName=' + uomUnitThreeName);
	inputs.push('uomUnitFourName=' + uomUnitFourName);

	inputs.push('id=' + itemPurchaseSlaveId);
	var str = inputs.join('&');
	$.ajax({
				async : false,
				type : "POST",
				url : "ehat/inventoryItemMaster/updateItemPurchaseSlave",
				data : str + "&reqType=AJAX",
				catche : false,
				success : function(data) {
					if (data == 1) {
						document.getElementById("addRowsButtonId").style.display = "block";
						document.getElementById("updateRecordButtonId").style.display = "none";
						alertify.success("Records Updated Sucessfully");

					} else {
						alertify.error("Oops Some Problem Ocured");
					}
					refreshItemPurchaseSlaveData();
					showItemPurchaseMasterDetails(masterId);
				},
				error : function() {
					alert('Network Issue..!!');
				}
			});
}*/

/*******************************************************************************
 * @Since 07-11-2019
 * @author Rohit Sandbhor
 * @Comment created this js function to reset the item purchase slave form
 *          values
 ******************************************************************************/
function refreshItemPurchaseSlaveData() {
	$("#purchaseUomFactor1Id").val("");
	$("#purchaseUomFactor2Id").val("");
	$("#purchaseUomFactor3Id").val("");
	$("#purchaseUomFactor4Id").val("");
	$("#purchaseFactorUom1Id").select2("val", 0);
	$("#purchaseFactorUom2Id").select2("val", 0);
	$("#purchaseFactorUom3Id").select2("val", 0);
	$("#purchaseFactorUom4Id").select2("val", 0);
//	$("#purchaseFactorUom1Id").val("");
//	$("#purchaseFactorUom2Id").val("");
//	$("#purchaseFactorUom3Id").val("");
//	$("#purchaseFactorUom4Id").val("");
	$("#purchaseUnitPrice1Id").val("");
	$("#purchaseUnitPrice2Id").val("");
	$("#purchaseUnitPrice3Id").val("");
	$("#purchaseUnitPrice4Id").val("");
	$("#itemPurchaseSlaveId").val(0);
	
	return false;
}

/*******************************************************************************
 * @since 13112019
 * @author this js function is created for to show the item sales slave details
 *         w.r.t to master id
 * @comment
 ******************************************************************************/
function showItemSalesSlaveDetails(masterId) {
	var inputs = [];
	inputs.push('masterId=' + masterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryItemMaster/getItemSalesSlaveRecords",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {

			setItemSalesDataToTable(r);
			// showItemSalesSlaveDetails();
		}
	});
}

/*******************************************************************************
 * @since 07112019
 * @author Rohit Sandbhor
 * @comment Below js code to show the records from item purchase slave table and
 *          showing it dynamically
 ******************************************************************************/
function setItemSalesDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstItemSalesSlave.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstItemSalesSlave[i].unitPrice
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstItemSalesSlave[i].salesUomFactor
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editItemSalesSlave('
				+ r.lstItemSalesSlave[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteItemSalesSlave('
				+ r.lstItemSalesSlave[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#itemSalesSlaveRecordList").html(htm);
};

/*******************************************************************************
 * @since 08-11-2019
 * @comment added this js to get all the item masters records
 * @author Rohit Sandbhor
 ******************************************************************************/
function getAllItemMasterRecords() {

	
	getUOMTemp("purchaseFactorUom1Id");
	getUOMTemp("purchaseFactorUom2Id");
	getUOMTemp("purchaseFactorUom3Id");
	getUOMTemp("purchaseFactorUom4Id");
	
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryItemMaster/getAllItemMasterRecords",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setItemMasterDataToTable(r);

		}
	});
}

/*******************************************************************************
 * @since 08-11-2019
 * @comment added this js function to set the item masters data to dynamic table
 * @author Rohit Sandbhor
 * @param r
 ******************************************************************************/
function setItemMasterDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstItemMaster.length; i++) {
		var createdDateTime = getDateTime(r.lstItemMaster[i].createdDateTime);
		var date = new Date(createdDateTime).toLocaleDateString('en-GB');
		var Time=new Date(createdDateTime).toLocaleTimeString('en-GB');
		date = date +" "+Time;
		if(createdDateTime == null || createdDateTime == "1970-01-01 5:30:00" || createdDateTime == ""){
			createdDateTime = getNullDate(createdDateTime);
		}
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'+date+'</td>'
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
		index++;
		
		
		var numberOfRows="";
		var index1=1;
		var count=r.noOfPages;
		var numberOfPages=(count/10);
		
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
			displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			numberOfRows +="<li onclick='paginationItemMasterMaster("+index1+");'><a>"+index1+"</a></li>";
			index1=index1+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationItemMaster("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesItemMaster').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#itemMasterRecordPagination').html(numberOfRows);
	
		
	}
	$("#itemMasterRecordsList").html(htm);
	$("#itemMasterRecordsListExcel").html(htm);
	
};

/*******************************************************************************
 * @since 08-11-2019
 * @comment below js function to edit the item master data details
 * @author Rohit Sandbhor
 * @param id
 ******************************************************************************/
function editItemMaster(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryItemMaster/editItemMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$("#itemNameId").val(r.itemName);
			$("#formTypeId").val(r.formType);
			$("#searchId11").val(r.categoryType);
			$("#statusId").val(r.status);
			$("#maxStockId").val(r.maxStock);
			$("#reorderStockId").val(r.reorderStock);
			$("#orderStockId").val(r.orderStock);
			if(r.reagentItemStatus !== 0){
			$('#reagentItemId').prop('checked', true);
			}
			if(r.consumableItemStatus !== 0){
				$('#consumableItemId').prop('checked', true);
				}
			if(r.assetItemStatus !== 0 ){
			$('#assetItemId').prop('checked', true);
			}
			if(r.labEquipmentStatus !== 0 ){
				$('#labEquipmentId').prop('checked', true);
			}
			//this is added by Vishnu for serviceItemStatus
			if(r.serviceItemStatus != 0 && r.serviceItemStatus != null ){
				$('#serviceItemId').prop('checked', true);
			}
			
			if(r.licenseItemStatus != 0 && r.licenseItemStatus != null ){
				$('#licenseItemId').prop('checked', true);
			}
			
			if(r.purchaseItemStatus !== 0){
			$('#purchaseItemId').prop('checked', true);	
			}
			if(r.laundryItemStatus !== 0){
			$('#laundryItemId').prop('checked', true);		
			}
			if(r.invItemStatus !== 0){
			$('#inventoryItemId').prop('checked', true);			
			}
			if(r.cssItemStatus !== 0){
			   $('#cssdItemId').prop('checked', true);
			   setCssdOption();
			   editCssdItemCheck(r.isLnL);
			}
			else{
				setCssdOption();
			}
			if(r.issueItemStatus !== 0){
			$('#issueItemId').prop('checked', true);			
			}
			$("#leadTimeId").val(r.leadTime);
			$("#priorityId").val(r.priority);
			$("#criticalityId").val(r.criticality);
			$("#purchaseStrategyId").val(r.purchaseStrategy);
			$("#itemMasterId").val(r.id);
			$("#batchWiseId").val(r.batchWise);
			$("#gstCodeId").val(r.gstCode);
			$("#companyNameId").val(r.companyName);
			$("#aliceNameId").val(r.aliceName);
			$("#leadTimeUnitId").val(r.leadTimeUnit);
			$("#cgstRateId").val(r.cgst);
			$("#sgstRateId").val(r.sgst);
			$("#taxNameId").val(r.taxName);
			$("#taxRateId").val(r.taxRate);
			$("#hsnNameId").val(r.hsnName);
			$("#hiddenHsnNameValue").val(r.hsnNameValue);
			$("#categoryId").val(r.categoryId);
			getWarehouseDetailsByItemMasterId(r.id);
			getMaintenanceDetailsByItemMasterId(r.id);
			getContractDetailsByItemMasterId(r.id);
			showItemPurchaseMasterDetails(r.id);
			showItemSalesSlaveDetails(r.id);
			getItemPartyDetailsByItemMasterId(r.id);
		}
	});
}

/*******************************************************************************
 * @since 13112019
 * @author Rohit Sandbhor
 * @comment created this js function to fetch item master details
 * @param inputID
 * @returns {Boolean}
 ******************************************************************************/
function fetchItemMasterDetails(inputID,callFrom) {
	var categoryName = $("#" + inputID).attr('data-name');
	var searchAssetOrServiceItem ="";
	if (categoryName == "goodReceiptNote") {
		var grnSupplierName = document.getElementById("grnSupplierName").value;
		var grnSupplierState = document.getElementById("grnSupplierState").value;

		if (grnSupplierName == "" || grnSupplierState == 0) {
			alert("Please Select Supplier Name & State First..!!");
			return false;
		}

	} else if (categoryName == "purchasequotation") {
		var grnSupplierName = document.getElementById("supplierName").value;
		var grnSupplierState = document.getElementById("supplierState").value;

		if (grnSupplierName == "" || grnSupplierState == 0) {
			alert("Please Select Supplier Name & State First..!!");
			return false;
		}
	}

	else if (categoryName == "purchaseInvoice") {
		var piSupplierName = document.getElementById("purchaseInvSupplierName").value;
		var piSupplierState = document
				.getElementById("purchaseInvoiceSupplierState").value;

		if (piSupplierName == "" || piSupplierState == 0) {
			alert("Please Select Supplier Name & State First..!!");
			return false;
		}
	}
	
	else if (categoryName == "purchaseOrderModule") {
		var poSupplierName = document.getElementById("supplierNameId").value;
		var poSupplierState = document.getElementById("supplierStateId").value;

		if (poSupplierName == "" || poSupplierState == 0) {
			alert("Please Select Supplier Name & State First..!!");
			return false;
		}
	}

	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	
	if(callFrom == "GRN"){
		
		if ($("#assetItemGrnId").is(':checked') && $("#assetItemGrnId").val() == 'Asset') {
			searchAssetOrServiceItem = 	$("#assetItemGrnId").val();
        }else if($("#serviceItemGrnId").is(':checked') && $("#serviceItemGrnId").val() == 'Service'){
        	searchAssetOrServiceItem = 	$("#serviceItemGrnId").val();
        }else{
        	searchAssetOrServiceItem = "All";
        }
	}else if(callFrom == "PO"){
		/*if ($("#assetItemOpningId").is(':checked') && $("#assetItemOpningId").val() == 'Asset') {
			searchAssetOrServiceItem = 	$("#assetItemOpningId").val();
        }else if($("#serviceItemOpningId").is(':checked') && $("#serviceItemOpningId").val() == 'Service'){
        	searchAssetOrServiceItem = 	$("#serviceItemOpningId").val();
        }*/
	}else if(callFrom == "OS"){
		
		if ($("#assetItemOpningId").is(':checked') && $("#assetItemOpningId").val() == 'Asset') {
			searchAssetOrServiceItem = 	$("#assetItemOpningId").val();
        }else if($("#serviceItemOpningId").is(':checked') && $("#serviceItemOpningId").val() == 'Service'){
        	searchAssetOrServiceItem = 	$("#serviceItemOpningId").val();
        }else {
        	searchAssetOrServiceItem = "All";
        }
	}else{
		searchAssetOrServiceItem = "All";
	}
	
	
	var inputs = [];
	inputs.push('itemName=' + findingName);
	inputs.push('searchAssetOrServiceItem=' + searchAssetOrServiceItem);
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
					if (r.lstItemMaster.length == 0) {
						alertify.error("Data Not Found...!!!");
					}
					if (categoryName == "itemMaster") {
						for ( var j = 0; j < r.lstItemMaster.length; j++) {

							var arrValue = r.lstItemMaster[j].id + "-"
									+ r.lstItemMaster[j].itemName;
							var id = r.lstItemMaster[j].id;
							var itemName = r.lstItemMaster[j].itemName;
							resultData.push({
								ID : id,
								Name : itemName,
							});
							template = template + '<li data-value="' + id
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';
						}
					} else if (categoryName == "openingStockModule"
							|| categoryName == "purchaseOrderModule"
							|| categoryName == "purchaseExpenseModule"
							|| categoryName == "purchasequotation"
							|| categoryName == "closingStockModule"
							|| categoryName == "goodReceiptNote"
							|| categoryName == "generateMRNRequest"
							|| categoryName == "generateMRN"
							|| categoryName == "purchaseInvoice"
							|| categoryName == "consumptionRequest"
							|| categoryName == "mrnReturnRequest") {
						template = "";
						for ( var j = 0; j < r.lstItemMaster.length; j++) {
							availableTags.push(r.lstItemMaster[j].id + "-"
									+ r.lstItemMaster[j].itemName);
						//	for ( var j = 0; j < availableTags.length; j++) {
								//var arrValue = (availableTags[j]).split("-");
								var idValue = r.lstItemMaster[j].id;

								resultData.push({
									ID : idValue,
									Name : r.lstItemMaster[j].itemName
								});
								template = template
										+ '<li id="myNewLi" data-toggle="modal" data-target="#myModal" data-value= "'
										+ r.lstItemMaster[j].id
										+ '" class=""><a href="#">'
										+ r.lstItemMaster[j].itemName + '</a></li>';

							//}
						}
					}
					if (categoryName == "itemMaster") {
						setTimeout(

								function() {
									// alert("itemMaster");
									$("div#searchItemMasterDivId .typeahead")
											.html(template);
									$("div#searchItemMasterDivId .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);

					} else if (categoryName == "purchaseOrderModule"
							|| categoryName == "purchasequotation"
							|| categoryName == "purchaseExpenseModule"
							|| categoryName == "generateMRNRequest"
							|| categoryName == "generateMRN"
							|| categoryName == "consumptionRequest"
							|| categoryName == "mrnReturnRequest") {

						setTimeout(
								function() {
									$(
											"#divtxtPurchaseQuotationItemName .typeahead")
											.html(template);
									$(
											"#divtxtPurchaseQuotationItemName .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);

					} else if (categoryName == "openingStockModule") {
						setTimeout(
								function() {
									$("#divtxtOpeningStockItemName .typeahead")
											.html(template);
									$("#divtxtOpeningStockItemName .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					} else if (categoryName == "closingStockModule") {
						setTimeout(
								function() {
									$("#divtxtClosingStockItemName .typeahead")
											.html(template);
									$("#divtxtClosingStockItemName .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					} else if (categoryName == "goodReceiptNote") {
						setTimeout(
								function() {
									$("#goodsReceiptNoteItemName .typeahead")
											.html(template);
									$("#goodsReceiptNoteItemName .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					} else if (categoryName == "purchaseInvoice") {
						setTimeout(
								function() {
									$("#purchaseInvoiceItemName .typeahead")
											.html(template);
									$("#purchaseInvoiceItemName .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
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
		var subInvId = "";
		var subInvName = "";
		var i="";
		var itemIdArray = [];
		if (categoryName == 'itemMaster') {
			getItemMasterDetailsById(itemMasterId);
		} else if (categoryName == 'closingStockModule') {
			getBatchDetailsForClosingStock(masterId);
		} else if (categoryName == "generateMRNRequest") {
			subInvId = document.getElementById("subInventoryIdInsideModal").value;
			subInvName = document.getElementById("subInventoryNameId").value;
			if (subInvId == "" || subInvName == "") {
				alertify
						.error("Please Search By SubInventory Name First...!!!");
				return false;
			}
			
			var subInvId = document.getElementById("subInventoryId").value;
			
			var table = document.getElementById("generateMRNRequestInfoTable");
			var itemSlaveRowCount = table.rows.length;
			var newRowCount = itemSlaveRowCount - 1;
			
			if(newRowCount > 1){
				for(i = 1 ; i<= newRowCount ;i++){
					var itemId = document.getElementById("itemMasterIdGeneMrnReqTable"+i).value;
					var tableSerialNoValue = document.getElementById("snum"+i).innerText;
					document.getElementById("hiddenSerialNoId").value = tableSerialNoValue;
					itemIdArray.push(itemId);	
				}
				var check = itemIdArray.includes(masterId);
				if(check == true){
					alert("This Item Is Already Present..!!!");
					return false;
				}
				else{
					getItemMasterSlaveDetailsModalOnMRNGenerate(masterId, subInvId);
				}
			}
			else{
				var tableSerialNoValue = document.getElementById("snum1").innerText;
				document.getElementById("hiddenSerialNoId").value = tableSerialNoValue;
				getItemMasterSlaveDetailsModalOnMRNGenerate(masterId, subInvId);
			}
			
		} else if (categoryName == "consumptionRequest") {

			subInvId = document.getElementById("subInventoryIdInsideModal").value;
			subInvName = document.getElementById("subInventoryNameId").value;
			if (subInvId == "" || subInvName == "") {
				alertify
						.error("Please Search By SubInventory Name First...!!!");
				return false;
			}
			var subInvIdConsumption = document.getElementById("subInventoryId").value;
			var mainTable = document.getElementById("consumptionRequestTable");
			var mainTableLength =  mainTable.rows.length;
			var currentTableLen = mainTableLength - 1;
			getCurrentSubStockBatchWiseForConsumption(masterId,
					subInvIdConsumption,currentTableLen,inputID);
		} else if (categoryName == "generateMRN") {

			var subInvId = document.getElementById("hiddenSubInvId").value;
			getItemMasterSlaveDetailsModalForMRN(masterId, subInvId);
		} else if (categoryName == "purchasequotation") {
			getItemMasterSlaveDetailsModalForPurchaseQuotation(masterId, 0);
		} else if (categoryName == "goodReceiptNote") {
			$("#grnItemId").val(masterId);
			getItemMasterSlaveGRNDetails(masterId);
		} else if (categoryName == "purchaseInvoice") {
			$("#purInvItemId").val(masterId);
			getItemMasterSlavePurchaseInvoiceDetails(masterId);
		} else if (categoryName == "openingStockModule") {
			getItemMasterSlaveDetailsForOpeningStockById(masterId);
		} 
		else if(categoryName == "mrnReturnRequest"){
			subInvId = document.getElementById("subInventoryIdInsideModal").value;
			subInvName = document.getElementById("subInventoryNameId").value;
			if (subInvId == "" || subInvName == "") {
				alertify.error("Please Search By SubInventory Name First...!!!");
				return false;
			}
			var subInvIdMrnReturn = document.getElementById("subInventoryId").value;
			var mainTable = document.getElementById("mrnReturnRequestTable");
			var mainTableLength =  mainTable.rows.length;
			var currentTableLen = mainTableLength - 1;
			getCurrentSubStockBatchWiseForMrnReturn(masterId,subInvIdMrnReturn,currentTableLen);
		}else if (categoryName == "purchaseOrderModule") {
			//$("#grnItemId").val(masterId);
			getItemMasterSlaveDetailsOnPurchaseOrder(masterId);
		}
		else {
			getItemMasterSlaveDetailsModal(masterId);
		}
		$("#" + inputID).val(itemName);
	}
}

/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 13112019
 * @comment below js created for to get the item master details by id
 * @param itemMasterId
 ******************************************************************************/
function getItemMasterDetailsById(itemMasterId) {
	var inputs = [];
	inputs.push('id=' + itemMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryItemMaster/getItemMasterDetailsById',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			// here we calling another function to set the data to table
			setItemMasterDataToTable(r);
		}
	});
}

/*******************************************************************************
 * @author Rohit Sandbhor
 * @comment below js fucntion is created for to edit the item sales slave
 *          details w.r.t id
 * @since 13112019
 * @param id
 ******************************************************************************/
function editItemSalesSlave(id) {
	document.getElementById("updateRecordItemSalesButtonId").style.display = "block";
	document.getElementById("addRowsItemSalesButtonId").style.display = "none";
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryItemMaster/editItemSalesSlave",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$('#salesUomFactorId').val(r.salesUomFactor);
			$('#salesFactorUomId').val(r.salesFactorUom);
			$('#unitPriceId').val(r.unitPrice);
			$('#itemSalesSlaveId').val(r.id);

		}
	});
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @comment below js created for to update the item sales slave
 * @since 13112019
 ******************************************************************************/
function updateItemSalesSlave() {
	var salesUomFactor = $('#salesUomFactorId').val();
	var salesFactorUom = $('#salesFactorUomId').val();
	var unitPrice = $('#unitPriceId').val();
	var itemSalesSlaveId = $('#itemSalesSlaveId').val();
	var masterId = $("#itemMasterId").val();
	var inputs = [];
	inputs.push('salesUomFactor=' + salesUomFactor);
	inputs.push('salesFactorUom=' + salesFactorUom);
	inputs.push('unitPrice=' + unitPrice);
	inputs.push('id=' + itemSalesSlaveId);
	var str = inputs.join('&');
	$
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/inventoryItemMaster/updateItemSalesSlave",
				data : str + "&reqType=AJAX",
				catche : false,
				success : function(data) {
					if (data == 1) {
						document.getElementById("addRowsItemSalesButtonId").style.display = "block";
						document
								.getElementById("updateRecordItemSalesButtonId").style.display = "none";
						alertify.success("Records Updated Sucessfully");

					} else {
						alertify.error("Oops Some Problem Ocured");
					}
					refreshItemSalesSlaveData();
					showItemSalesSlaveDetails(masterId);
				},
				error : function() {
					alert('Network Issue..!!');
				}
			});
}

/*******************************************************************************
 * @Since 07-11-2019
 * @author Rohit Sandbhor
 * @Comment created this js function to reset the item purchase slave form
 *          values
 ******************************************************************************/
function refreshItemSalesSlaveData() {
	$('#salesUomFactorId').val("");
	$('#salesFactorUomId').val("");
	$('#unitPriceId').val("");
	$('#itemSalesSlaveId').val(0);
	return false;
}
/*******************************************************************************
 * @Since 07-11-2019
 * @author Rohit Sandbhor
 * @Comment below js function to perform autofill search operation on party
 *          slave
 ******************************************************************************/
function setAutoPartyNameOnItemMaster(partyMasterId) {
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
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryItemMaster/autoFillSearchOnPartySlave",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.partyMasterDto.length; j++) {
				var arrValue = response.partyMasterDto[j].id + "-"
						+ response.partyMasterDto[j].name;
				var idValue = response.partyMasterDto[j].id;
				var partyName = response.partyMasterDto[j].name;
				resultData.push({
					ID : idValue,
					Name : partyName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + partyName + '</a></li>';
			}
			setTimeout(function() {
				$("#searchPartySlaveDivId .typeahead").html(template);
				$("#searchPartySlaveDivId .typeahead").show();

				$("input#" + partyMasterId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});

			}, 500);
		}
	});

	function displayResult(item) {
		var res = item.text.split('-');
		var partyId = res[0];
		var id = item.value;
		document.getElementById("hiddenPartyIdOnItemMaster").value = id;
		$("input#" + partyMasterId).val(partyId);
	}
}
/*******************************************************************************
 * @Since 07-11-2019
 * @author Rohit Sandbhor
 * @Comment Below js code to add party name to select box on item master
 ******************************************************************************/
function addPartyName() {
	var partyName = $("#partyNameId").val();
	if (partyName == '') {
		alert("Please Party Name");
		return false;
	}
	var add = partyName;
	// var partyid = pid;

	var flag = 1;
	$('#lstBox2').find('option').each(function() {
		if ($(this).html() == add) {
			alert("Tax Is Present In List");
			flag = 0;
		}
	});
	if (flag == 1) {
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(add);
		$(o).val(partyName);
		$("#lstBox2").append(o);
		$("#partyNameId").val("");
	}
}
/*******************************************************************************
 * @Since 09-11-2019
 * @author Rohit Sandbhor
 * @Comment Below js code to remove party name from select box on item master
 ******************************************************************************/
function removePartyName() {
	$('#lstBox2 option:selected').remove();
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 13112019
 * @comment created this js to get the next item master id
 ******************************************************************************/
function getNextItemMasterIdNew() {
	var inputs = [];
	inputs.push('action=getItemMasterNextId');
	inputs.push('tableName=inv_item_master_new');
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

/*******************************************************************************
 * @Since 13-11-2019
 * @author Rohit Sandbhor
 * @Comment created this js function delete the item master and his slaves
 ******************************************************************************/
function deleteItemMaster(id) {
	var r = confirm("Are You Sure You Want To Delete Warehouse Master Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryItemMaster/deleteItemMasterNew",
			data : {
				"id" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllItemMasterRecords();

			}
		});
	}
}

/*******************************************************************************
 * @Since 13-11-2019
 * @author Rohit Sandbhor
 * @Comment created this js function to get the warehouse slave details by using
 *          item master id
 ******************************************************************************/
function getWarehouseDetailsByItemMasterId(id) {
	var inputs = [];
	inputs.push('masterId=' + id);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : 'GET',
				data : str + "&reqType=AJAX",
				url : 'ehat/inventoryItemMaster/getItemWarehouseSlaveRecord',
				timeout : 1000 * 60 * 5,
				catche : false,
				success : function(r) {
					if(r.wareHouseId == null){
						document.getElementById("hiddenWarehouseId").value = 0;
					}else{
					document.getElementById("hiddenWarehouseId").value = r.wareHouseId;
					document.getElementById("wareHouseNameId").value = r.warehouseName;
					document.getElementById("wareHouseLocationId").value = r.warehouseLocation;
					}

				}
			});
}

/*******************************************************************************
 * @Since 13-11-2019
 * @author Rohit Sandbhor
 * @Comment created this js function to get the party slave details by using
 *          item master id
 ******************************************************************************/
function getItemPartyDetailsByItemMasterId(id) {
	var inputs = [];
	inputs.push('masterId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryItemMaster/getItemPartyDetailsByItemMasterId',
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setItemPartyDataToTable(r);
		}
	});

}
/*******************************************************************************
 * @Since 14-11-2019
 * @author Rohit Sandbhor
 * @Comment created this js function to get the party master details by using
 *          his name
 ******************************************************************************/
function setAutoSupplierName(inputID) {
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
	inputs.push('supplierName=' + findingName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryPurchaseOrder/autoFillSearchOnPartyMaster",
				cache : false,
				success : function(r) {
					var template = "";
					for ( var j = 0; j < r.partyMasterDto.length; j++) {
						var newId = r.partyMasterDto[j].id;
						var arrValue = r.partyMasterDto[j].id + "-"
								+ r.partyMasterDto[j].name;

						var id = r.partyMasterDto[j].id;
						var partyName = r.partyMasterDto[j].name;
						resultData.push({
							ID : id,
							Name : partyName
						});
						if (categoryName == "purchaseOrderSupplierName") {
							// below function is call to get current hospital
							// state id
							fetchHospitalState();
							template = template + '<li data-value="' + id
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';
						} else if (categoryName == "purchaseExpenseSupplierName") {
							// below function is call to get current hospital
							// state id
							fetchHospitalState();
							template = template + '<li data-value="' + id
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';

						}

					}
					if (categoryName == "purchaseOrderSupplierName") {
						setTimeout(
								function() {
									$("div#searchSupplierNameDivId .typeahead")
											.html(template);
									$("div#searchSupplierNameDivId .typeahead")
											.show();

									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayPartyMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					} else if (categoryName == "purchaseExpenseSupplierName") {
						setTimeout(
								function() {
									$(
											"div#searchSupplierNameExpenseDivId .typeahead")
											.html(template);
									$(
											"div#searchSupplierNameExpenseDivId .typeahead")
											.show();

									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayPartyMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);

					}
				}
			});
	// below function to set the search value to search text feild and calling
	// getPackingDetailsById function
	function displayPartyMasterSearchResult(item) {
		var res = item.text.split('-');
		var partyName = res[1];
		var partyMasterId = res[0];
		getPartyMasterDetailsById(partyMasterId);
		document.getElementById("hiddenSupplierNameId").value = partyName;

	}
}
/*******************************************************************************
 * @Since 14-11-2019
 * @author Rohit Sandbhor
 * @Comment created this js function to get the party master details by using
 *          his name
 ******************************************************************************/
function getPartyMasterDetailsById(partyMasterId) {
	var inputs = [];
	inputs.push('id=' + partyMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invPartyMaster/editPartyMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			$("#supplierNameId").val(response.name);
			$("#hiddenPartyMasterId").val(response.id);
			setPartyContactInfoOnPurchaseOrder(response);

			var addressresponse = response.partyMasterAddressInfoDto;
			$.each(addressresponse, function() {
				$('#supplierStateId').append(
						'<option value="' + this.stateId + '">' + this.state
								+ '</option>');
			});
			setPartyModalAddressInfoToPurchaseOrder(response);
			setPartyModalContactInfoToPurchaseOrder(response);
			showpartyMasterDetailsModalOnPurchaseOrder();

		}
	});

}
// this is all about party master save details.
function savePartyMaster() {

	var partyMasterId = $("#partyMasterId").val();
	var partyMasterName = $("#masterPartyName").val();
	var partyMasterGroup = $("#masterGroup option:selected").text();
	var partyMasterParentCompany = $("#masterParentCompany").val();
	var partyMasterStatus = $("#masterStatus option:selected").val();
	var partyMasterPriority = $("#masterPriority option:selected").val();
	var partyMasterType = $("#masterType option:selected").val();
	
	var partyMasterVendorCode = $("#partyMasterVendorCode").val(); 
	var partyMasterInvoiceCode = $("#partyMasterInvoiceCode").val();
	var partyMasterNote = $("#partyMasterNote").val();
	
	var partyMasterDeActivateDate =  $("#partyMasterDeActivateDate").val();
	
	// validation
	if (partyMasterName == "" || partyMasterName == null) {
		alert("please enter party name");
		$("#masterPartyName").focus();
		return false;
	}

	var group = document.getElementById("masterGroup");
	var strgrp = group.options[group.selectedIndex].val;
	if (strgrp == 0) {
		alert('please select Category');
		$("#masterGroup").focus();
		return false;
	}

	if (partyMasterParentCompany == "" || partyMasterParentCompany == null) {
		partyMasterParentCompany = "-";
	}
//	var pattern = /^([a-zA-Z]+\s?)*$/;
//	if (!pattern.test(partyMasterParentCompany)) {
//		alert("Parent party name should be of alphabets only with a single space allowed..!");
//		$("#masterParentCompany").focus();
//		return false;
//	}

	var status = document.getElementById("masterStatus");
	if (status.options[status.selectedIndex].value == 0) {
		alert('please select party status');
		$("#masterStatus").focus();
		return false;
	}

	var priority = document.getElementById("masterPriority");
	if (priority.options[priority.selectedIndex].val == 0) {
		alert('please select party priority');
		$("#selpriority").focus();
		return false;
	}

	var type = document.getElementById("masterType");
	if (type.options[type.selectedIndex].value == 0) {
		alert('please select party type');
		$("#masterType").focus();
		return false;
	}

	// var genralInfo = $("#PartyGeneralTableInfoList").html().length;
	var genralInfo = $('#GeneralInfoTable tbody tr.newAdded').length;

	if (genralInfo == "" || genralInfo == null || genralInfo == 0) {
		alert("Enter at least One Record In General Info tab ");
		return false;
	}

	// var contactInfo = $("#PartyContactTableInfoList").html();

	var contactInfo = $('#ContactInfoTable tbody tr.newAdded').length;
	if (contactInfo == "" || contactInfo == null || contactInfo == 0) {
		alert("Enter at least One Record In Contact Info tab ");
		return false;
	}

	// var addressInfo = $("#PartyAddressTableInfoList").html();
	var addressInfo = $('#AddressInfoTable tbody tr.newAdded').length;
	if (addressInfo == "" || addressInfo == null || addressInfo == 0) {
		alert("Enter at least One Record In Address Info tab ");
		return false;
	}

	// this is for general info
	var partyMasterGeneralInfoDtoDetails = {
		partyMasterGeneralInfoDto : []
	};
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {

		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var generalInfoId = $("#generalInfoId" + i).html();
		var generalGstNOId = $("#generalGstNOId" + i).html();
		var generalMobileNoId = $("#generalMobileNoId" + i).html();
		var generalCompanyMailId = $("#generalCompanyMailId" + i).html();
		var generalLandLineNoId = $("#generalLandLineNoId" + i).html();
		var generalWebSiteId = $("#generalWebSiteId" + i).html();
		var generalPanNoId = $("#generalPanNoId" + i).html();

		setGeneralInfoList(partyMasterGeneralInfoDtoDetails, generalGstNOId,
				generalMobileNoId, generalCompanyMailId, generalLandLineNoId,
				generalWebSiteId, generalPanNoId, generalInfoId, userId, unitId);
	}

	partyMasterGeneralInfoDtoDetails = JSON
			.stringify(partyMasterGeneralInfoDtoDetails);
	// this is for contact details
	var partyMasterContactInfoDtoDetails = {
		partyMasterContactInfoDto : []
	};
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;

	for ( var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var contactInfoId = $("#contactInfoId" + i).html();
		var contactPersonId = $("#contactPersonId" + i).html();
		var contactDesignationId = $("#contactDesignationId" + i).html();
		var contatcAddressId = $("#contatcAddressId" + i).html();
		var contactGenderId = $("#contactGenderId" + i).html();
		var contactDobId = $("#contactDobId" + i).html();
		var contactPhoneOneId = $("#contactPhoneOneId" + i).html();
		var contactPhoneSecondId = $("#contactPhoneSecondId" + i).html();
		var contactMailId = $("#contactMailId" + i).html();

		setContactInfoList(partyMasterContactInfoDtoDetails, contactPersonId,
				contactDesignationId, contatcAddressId, contactGenderId,
				contactDobId, contactPhoneOneId, contactPhoneSecondId,
				contactMailId, contactInfoId, userId, unitId);
	}

	partyMasterContactInfoDtoDetails = JSON
			.stringify(partyMasterContactInfoDtoDetails);

	// this is for address details

	var partyMasterAddressInfoDtoDetails = {
		partyMasterAddressInfoDto : []
	};
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var addressInfoId = $("#addressInfoId" + i).html();
		var companyNameId = $("#companyNameId" + i).html();
		var companyStreetId = $("#companyStreetId" + i).html();
		var companyPinId = $("#companyPinId" + i).html();
		var companyAreaId = $("#companyAreaId" + i).html();
		var companyCountryId = $("#companyCountryId" + i).html();
		var companyStateId = $("#companyStateId" + i).html();
		var companyTalukaId = $("#companyTalukaId" + i).html();
		var companyCityId = $("#companyCityId" + i).html();
		var companyAddressId = $("#companyAddressId" + i).html();
		var companyAddressType = $("#companyAddressTypeId" + i).html();

		var countryNameId = $("#hiddenCountryNameId" + i).html();
		var stateNameId = $("#hiddenStateNameId" + i).html();
		var districtNameId = $("#hiddenDistrictNameId" + i).html();
		var districtNameIdValue = $("#companyDistrictId" + i).html();
		var talukaNameId = $("#hiddenTalukaNameId" + i).html();
		var cityNameId = $("#hiddenCityNameId" + i).html();

		setAddressInfoList(partyMasterAddressInfoDtoDetails, companyNameId,
				companyCityId, companyStreetId, companyPinId, companyAreaId,
				companyCountryId, companyStateId,
				companyTalukaId, companyAddressId, companyAddressType,
				countryNameId, stateNameId, districtNameId, talukaNameId,
				cityNameId, addressInfoId, userId, unitId,districtNameIdValue);
	}

	partyMasterAddressInfoDtoDetails = JSON
			.stringify(partyMasterAddressInfoDtoDetails);
	// this is for payment details

	var partyMasterPaymentInfoDtoDetails = {
		partyMasterPaymentInfoDto : []
	};
	var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var paymentInfoId = $("#paymentInfoId" + i).html();
		var bankNameId = $("#bankNameId" + i).html();
		var bankIFSCId = $("#bankIFSCId" + i).html();
		var accountHolderNameId = $("#accountHolderNameId" + i).html();
		var accountNumberId = $("#accountNumberId" + i).html();
		var accountCityId = $("#accountCityId" + i).html();
		var accountAddressId = $("#accountAddressId" + i).html();
		var paymentTermsId = $("#paymentTermsId" + i).html();
		var creditTermsId = $("#creditTermsId" + i).html();

		setPaymentInfoList(partyMasterPaymentInfoDtoDetails, paymentInfoId,
				bankNameId, bankIFSCId, accountHolderNameId, accountNumberId,
				accountCityId, accountAddressId, paymentTermsId, creditTermsId,
				userId, unitId);
	}

	partyMasterPaymentInfoDtoDetails = JSON
			.stringify(partyMasterPaymentInfoDtoDetails);

	// this is for payment details

	var partyMasterTermsAndConditionInfoDtoDetails = {
		termsAndConditionInfoDto : []
	};
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var termsAndConditionTitleId = $("#txtTermsAndConditionsTitleId" + i)
				.html();
		var termsAndConditionNameId = $("#txtTermsAndConditionId" + i).html();
		var termsAndConditionInfoId = $("#termsAndCondId" + i).html();
		var termsAndConditionSlaveId = $("#termsAndCondSlaveId" + i).val();

		setTermsAndConditionInfoList(
				partyMasterTermsAndConditionInfoDtoDetails,
				termsAndConditionInfoId, termsAndConditionTitleId,
				termsAndConditionNameId, userId, unitId,termsAndConditionSlaveId);
	}

	partyMasterTermsAndConditionInfoDtoDetails = JSON
			.stringify(partyMasterTermsAndConditionInfoDtoDetails);
	

	var inputs = [];
	inputs.push("id=" + partyMasterId);
	inputs.push("name=" + partyMasterName);
	inputs.push("group=" + partyMasterGroup);
	inputs.push("parentCompany=" + partyMasterParentCompany);
	inputs.push("status=" + partyMasterStatus);
	inputs.push("priority=" + partyMasterPriority);
	inputs.push("type=" + partyMasterType);
	
	// this is added by Vishnu
	inputs.push("note=" + partyMasterNote);
	inputs.push("invoiceCode=" + partyMasterInvoiceCode);
	inputs.push("venderCode=" + partyMasterVendorCode);
	inputs.push("deActivationDate=" + partyMasterDeActivateDate);
	
	// this is for general info
	inputs.push("partyMasterGeneralInfoDtoList="
			+ encodeURIComponent(partyMasterGeneralInfoDtoDetails));
	// this is for contact Details
	inputs.push("partyMasterContactInfoDtoList="
			+ encodeURIComponent(partyMasterContactInfoDtoDetails));
	// this is for address info
	inputs.push("partyMasterAddressInfoDtoList="
			+ encodeURIComponent(partyMasterAddressInfoDtoDetails));
	// this is for payment info
	inputs.push("partyMasterPaymentInfoDtoList="
			+ encodeURIComponent(partyMasterPaymentInfoDtoDetails));
	// this is for terms and Conditon info
	inputs.push("partyMasterTermsAndConditionInfoDtoList="
			+ encodeURIComponent(partyMasterTermsAndConditionInfoDtoDetails));

	var str = inputs.join('&');
	
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/invPartyMaster/savePartyMaster",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					response = r;
					if (response == 1) {
						alert("Record saved successfully..!");
						onCloseBtnRefrshPage();
						setTimeout(function() {
							window.location.reload();
						}, 1000);
					} else if (response == 2) {
						alert("Record Updated successfully..!");
						onCloseBtnRefrshPage();
						setTimeout(function() {
							window.location.reload();
						}, 1000);
					} else if (response == 3) {
						alertify
								.error("Party Name Already Present In The System...!!!");
					} else {
						alertify.error("Oops something went wrong.....");
					}
					getAllPartyMaster();
					$("#txtPartySaveUpdate").val("0");
					// window.location.replace("inv_party_master_data.jsp");
				}
			});

}

function onChangePartyMasterStatus(){
	var partyMasterType = $("#masterStatus option:selected").val();
	if(partyMasterType == "DisContinue"){
		$("#partyMasterNoteId").show();
		$("#partyMasterDeActivateDateId").show();
	}else{
		$("#partyMasterNote").val("");
		$("#partyMasterNoteId").hide();
		$("#partyMasterDeActivateDateId").hide();
		$("#partyMasterDeActivateDate").val("");
	}
}

/**
 * 
 * @param partyMasterGeneralInfoDtoDetails
 * @param generalGstNOId
 * @param generalMobileNoId
 * @param generalCompanyMailId
 * @param generalLandLineNoId
 * @param generalWebSiteId
 * @param generalPanNoId
 * @param generalInfoId
 * @param userId
 * @param unitId
 */
function setGeneralInfoList(partyMasterGeneralInfoDtoDetails, generalGstNOId,
		generalMobileNoId, generalCompanyMailId, generalLandLineNoId,
		generalWebSiteId, generalPanNoId, generalInfoId, userId, unitId) {
	partyMasterGeneralInfoDtoDetails.partyMasterGeneralInfoDto.push({
		id : generalInfoId,
		mobile : generalMobileNoId,
		landline : generalLandLineNoId,
		website : generalWebSiteId,
		pancardNo : generalPanNoId,
		gstTransactionNo : generalGstNOId,
		mail : generalCompanyMailId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,

	});
}

/**
 * 
 * @param partyMasterContactInfoDtoDetails
 * @param contactPersonId
 * @param contactDesignationId
 * @param contatcAddressId
 * @param contactGenderId
 * @param contactDobId
 * @param contactPhoneOneId
 * @param contactPhoneSecondId
 * @param contactMailId
 * @param contactInfoId
 * @param userId
 * @param unitId
 */
function setContactInfoList(partyMasterContactInfoDtoDetails, contactPersonId,
		contactDesignationId, contatcAddressId, contactGenderId, contactDobId,
		contactPhoneOneId, contactPhoneSecondId, contactMailId, contactInfoId,
		userId, unitId) {
	partyMasterContactInfoDtoDetails.partyMasterContactInfoDto.push({
		id : contactInfoId,
		contactName : contactPersonId,
		contactDesignation : contactDesignationId,
		contactAddress : contatcAddressId,
		contactGender : contactGenderId,
		contactDob : contactDobId,
		contactPhoneNumber1 : contactPhoneOneId,
		contactPhoneNumber2 : contactPhoneSecondId,
		contactEmail : contactMailId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,
	});
}

/**
 * 
 * @param partyMasterAddressInfoDtoDetails
 * @param companyNameId
 * @param companyCityId
 * @param companyStreetId
 * @param companyPinId
 * @param companyAreaId
 * @param companyCountryId
 * @param companyStateId
 * @param companyDistictId
 * @param companyTalukaId
 * @param companyAddressId
 * @param companyAddressType
 * @param countryNameId
 * @param stateNameId
 * @param districtNameId
 * @param talukaNameId
 * @param cityNameId
 * @param addressInfoId
 * @param userId
 * @param unitId
 */
function setAddressInfoList(partyMasterAddressInfoDtoDetails, companyNameId,
		companyCityId, companyStreetId, companyPinId, companyAreaId,
		companyCountryId, companyStateId, companyTalukaId,
		companyAddressId, companyAddressType, countryNameId, stateNameId,
		districtNameId, talukaNameId, cityNameId, addressInfoId, userId, unitId,districtNameIdValue) {

	partyMasterAddressInfoDtoDetails.partyMasterAddressInfoDto.push({
		id : (addressInfoId != 'undefined' && addressInfoId != null && addressInfoId !='' && addressInfoId !=undefined) ? addressInfoId : 0,
		addressType : companyAddressType,
		countryId : (countryNameId != 'undefined' && countryNameId != null && countryNameId !='' && countryNameId !=undefined) ? countryNameId : 0,
		stateId : (stateNameId != 'undefined' && stateNameId != null && stateNameId !='' && stateNameId !=undefined) ? stateNameId : 0,
		districtId : (districtNameId != 'undefined' && districtNameId != null && districtNameId !='' && districtNameId !=undefined) ? districtNameId : 0,
		talukaId : (talukaNameId != 'undefined' && talukaNameId != null && talukaNameId !='' && talukaNameId !=undefined) ? talukaNameId : 0,
		cityId : (cityNameId != 'undefined' && cityNameId != null && cityNameId !='' && cityNameId !=undefined) ? cityNameId : 0,
				
		companyName : (companyNameId != 'undefined' && companyNameId != null && companyNameId !='' && companyNameId !=undefined) ? companyNameId :'NA',
		address : (companyAddressId != 'undefined' && companyAddressId != null && companyAddressId !='' && companyAddressId !=undefined) ? companyAddressId : 'NA',
		street : (companyStreetId != 'undefined' && companyStreetId != null && companyStreetId !='' && companyStreetId !=undefined) ? companyStreetId : 'NA',
		area : (companyAreaId != 'undefined' && companyAreaId != null && companyAreaId !='' && companyAreaId !=undefined) ? companyAreaId :'NA',
		country : (companyCountryId != 'undefined' && companyCountryId != null && companyCountryId !='' && companyCountryId !=undefined) ? companyCountryId :'NA',
		state : (companyStateId != 'undefined' && companyStateId != null && companyStateId !='' && companyStateId !=undefined) ? companyStateId : 'NA',
		districtName : (districtNameIdValue != 'undefined' && districtNameIdValue != null && districtNameIdValue !='' && districtNameIdValue !=undefined) ? districtNameIdValue : 'NA',
		talukaName : (companyTalukaId != 'undefined' && companyTalukaId != null && companyTalukaId !='' && companyTalukaId !=undefined) ? companyTalukaId : 'NA',
		city : (companyCityId != 'undefined' && companyCityId != null && companyCityId !='' && companyCityId !=undefined) ? companyCityId : 'NA',
		pin : (companyPinId != 'undefined' && companyPinId != null && companyPinId !='' && companyPinId !=undefined) ? companyPinId :'NA',
		createdBy : (userId != 'undefined' && userId != null && userId !='' && userId !=undefined) ? userId : 0,
		unitId : (unitId != 'undefined' && unitId != null && unitId !='' && unitId !=undefined) ? unitId : 0,
		updatedBy : (userId != 'undefined' && userId != null && userId !='' && userId !=undefined) ? userId : 0
		
	});
}

/**
 * 
 * @param partyMasterPaymentInfoDtoDetails
 * @param paymentInfoId
 * @param bankNameId
 * @param bankIFSCId
 * @param accountHolderNameId
 * @param accountNumberId
 * @param accountCityId
 * @param accountAddressId
 * @param paymentTermsId
 * @param creditTermsId
 * @param userId
 * @param unitId
 */
function setPaymentInfoList(partyMasterPaymentInfoDtoDetails, paymentInfoId,
		bankNameId, bankIFSCId, accountHolderNameId, accountNumberId,
		accountCityId, accountAddressId, paymentTermsId, creditTermsId, userId,
		unitId) {

	partyMasterPaymentInfoDtoDetails.partyMasterPaymentInfoDto.push({
		id : paymentInfoId,
		bankName : bankNameId,
		bankIFSC : bankIFSCId,
		accountHolderName : accountHolderNameId,
		accountNumber : accountNumberId,
		accountCity : accountCityId,
		accountAddress : accountAddressId,
		paymentTerms : paymentTermsId,
		creditTerms : creditTermsId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,

	});
}

/**
 * 
 * @param partyMasterTermsAndConditionInfoDtoDetails
 * @param termsAndConditionInfoId
 * @param termsAndConditionTitleId
 * @param termsAndConditionNameId
 * @param userId
 * @param unitId
 */
function setTermsAndConditionInfoList(
		partyMasterTermsAndConditionInfoDtoDetails, termsAndConditionInfoId,
		termsAndConditionTitleId, termsAndConditionNameId, userId, unitId,termsAndConditionSlaveId) {

	partyMasterTermsAndConditionInfoDtoDetails.termsAndConditionInfoDto.push({
		id : termsAndConditionInfoId,
		headingName : termsAndConditionTitleId,
		termconditionName : termsAndConditionNameId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,
		termsConditionSlaveId : termsAndConditionSlaveId

	});
}

// this is all aboout reset general info field
/**
 * 
 */
function resetInfoFields(tabType) {
	if (tabType === "generalInfo") {
		$('#generalFormId')[0].reset();
	} else if (tabType === "contactInfo") {
		$('#contactFormId')[0].reset();
	} else if (tabType === "addressInfo") {
		$('#addressFormId')[0].reset();
		$("#countryFromAddress").select2("val", 0);
		$("#stateFromAddress").select2("val", 0);
		$("#districtFromAddress").select2("val", 0);
		$("#talukaFromAddress").select2("val", 0);
		$("#cityFromAddress").select2("val", 0);
	} else if (tabType === "paymentInfo") {
		$('#paymentFormId')[0].reset();
	} else if (tabType === "TermsAndConditionInfo") {
		$('#termsAndConditionsTitle').select2('val', 0);
		$('#termsAndCondition').val('').empty();
	}
}
/**
 * 
 */
function resetAllField() {
	$('#partyMaterFormId')[0].reset();
	$('#generalFormId')[0].reset();
	$('#contactFormId')[0].reset();
	$('#addressFormId')[0].reset();
	$('#paymentFormId')[0].reset();
	$("#PartyGeneralTableInfoList").empty();
	$("#PartyContactTableInfoList").empty();
	$("#PartyAddressTableInfoList").empty();
};
/**
 * 
 */
// this is get all details of party master details
function getAllPartyMaster() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invPartyMaster/getAllPartyMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			partyMasterTemplate(r, "allPartyMaster");
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}
/**
 * 
 * @param response
 * @param callFrom
 */
function partyMasterTemplate(response, callFrom) {
	var htm = "";
	var index = 1;
	if (callFrom === "allPartyMaster") {
		for ( var i = 0; i < response.partyMasterDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
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
			index++;
			
			var numberOfRows="";
			var index1=1;
			var count=response.noOfPages;
			var numberOfPages=(count/10);
			
			var displayPagination=numberOfPages;	
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
				displayPagination=5;
			}
			for(var j=0;j<displayPagination;j++){
				numberOfRows +="<li onclick='paginationPartyMasterMaster("+index1+");'><a>"+index1+"</a></li>";
				index1=index1+1;
			}
			if(numberOfPages>6){
				numberOfRows +="<li class='next' onclick='nextPaginationPartyMaster("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
			}
			$('#totalNumberOfPagesPartyMaster').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
			$('#partyMasterRecordPagination').html(numberOfRows);
			
		}
		
	} else if (callFrom === "searchPartyMaster") {

		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.name
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.group
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.type
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#itemMasterModal" onclick=editPartyMaster('
				+ response.id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deletePartyMaster('
				+ response.id + ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		
		var numberOfRows="";
		var index1=1;
		var count=response.noOfPages;
		var numberOfPages=(count/10);
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
			displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			numberOfRows +="<li onclick='paginationPartyMasterMaster("+index1+");'><a>"+index1+"</a></li>";
			index1=index1+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationPartyMaster("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesPartyMaster').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#partyMasterRecordPagination').html(numberOfRows);

	}
	$("#partyMasterList").html(htm);
	$("#partyMasterListExcelExport").html(htm);
}
function editPartyMaster(partyMasterId) {
	var inputs = [];
	inputs.push('id=' + partyMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invPartyMaster/editPartyMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			$("#partyMasterId").val(response.id);
			$("#partyMaster").val(response.id);
			$("#masterPartyName").val(response.name);
			$("#masterGroup").val(response.group);
			$("#masterCurrency").val(response.currency);
			$("#masterVatNo").val(response.vatNo);
			$("#masterTinNo").val(response.tinNo);
			$("#masterParentCompany").val(response.parentCompany);
			$("#masterStatus").val(response.status);
			$("#masterPriority").val(response.priority);
			$("#masterType").val(response.type);
			$("#masterServiceTaxNo").val(response.serviceTaxno);
			
			$("#partyMasterVendorCode").val(response.venderCode);
			$("#partyMasterInvoiceCode").val(response.invoiceCode);
			if(response.status == "DisContinue"){
				$("#partyMasterNoteId").show();
				$("#partyMasterNote").val(response.note);
				$("#partyMasterDeActivateDateId").show();
				$("#partyMasterDeActivateDate").val(response.deActivationDate);
				
			}else{
				$("#partyMasterNoteId").hide();
				$("#partyMasterNote").val(response.note);
				$("#partyMasterDeActivateDateId").hide();
				$("#partyMasterDeActivateDate").val(response.deActivationDate);
			}
			setEditPartyMasterSlaveInfo(response);
		}
	});
}
/**
 * 
 * @param response
 */
function setEditPartyMasterSlaveInfo(response) {
	var length = 0;
	if (response.partyMasterGeneralInfoDto.length != 0
			&& response.partyMasterGeneralInfoDto != null
			&& response.partyMasterGeneralInfoDto != "") {

		length = response.partyMasterGeneralInfoDto.length;
		var htm = "";
		var count = 0;
		for ( var i = 0; i < length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalGstNOId'
					+ count
					+ '">'
					+ response.partyMasterGeneralInfoDto[i].gstTransactionNo
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalMobileNoId'
					+ count
					+ '">'
					+ response.partyMasterGeneralInfoDto[i].mobile
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalCompanyMailId'
					+ count
					+ '">'
					+ response.partyMasterGeneralInfoDto[i].mail
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalLandLineNoId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterGeneralInfoDto[i].landline
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalWebSiteId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterGeneralInfoDto[i].website
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalPanNoId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterGeneralInfoDto[i].pancardNo
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalInfoId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterGeneralInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="geneInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="geneInfoId'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="geneInfoNewId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterGeneralInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editGeneralPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editGeneralInfoPartyMaster('
					+ count
					+ ',\'fromDB\')" '
					+ '><i class="fa fa-edit"></i></button></td>'

					+ '<td class="col-md-1 center"><button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteGeneralPartMaster'
					+ response.partyMasterGeneralInfoDto[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.partyMasterGeneralInfoDto[i].id
					+ ',\'deleteGeneral\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyGeneralTableInfoList").html(htm);
	}

	if (response.partyMasterContactInfoDto.length != 0
			&& response.partyMasterContactInfoDto != null
			&& response.partyMasterContactInfoDto != "") {
		length = response.partyMasterContactInfoDto.length;
		var count = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPersonId'
					+ count
					+ '">'
					+ response.partyMasterContactInfoDto[i].contactName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactDesignationId'
					+ count
					+ '">'
					+ response.partyMasterContactInfoDto[i].contactDesignation
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contatcAddressId'
					+ count
					+ '">'
					+ response.partyMasterContactInfoDto[i].contactAddress
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactGenderId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].contactGender
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactDobId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].contactDob
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPhoneOneId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].contactPhoneNumber1
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].contactPhoneNumber2
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactMailId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].contactEmail
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactInfoId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editContactInfoPartyMaster('
					+ count
					+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center" id="contactInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="conInfoId'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="conInfoNewId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteContactPartMaster'
					+ response.partyMasterContactInfoDto[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.partyMasterContactInfoDto[i].id
					+ ',\'deleteContact\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyContactTableInfoList").html(htm);
	}
	if (response.partyMasterAddressInfoDto.length != 0
			&& response.partyMasterAddressInfoDto != null
			&& response.partyMasterAddressInfoDto != "") {
		length = response.partyMasterAddressInfoDto.length;
		
		var count = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyNameId'
					+ count
					+ '">'
					+ response.partyMasterAddressInfoDto[i].companyName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyCountryId'
					+ count
					+ '">'
					+ response.partyMasterAddressInfoDto[i].country
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyCityId'
					+ count
					+ '">'
					+ response.partyMasterAddressInfoDto[i].city
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAddressId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].address
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAddressTypeId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].addressType
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyStreetId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].street
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAreaId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].area
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyPinId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].pin
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyStateId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].state
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyDistrictId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].districtName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyTalukaId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].talukaName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenCountryNameId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].countryId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenStateNameId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].stateId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenDistrictNameId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].districtId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenTalukaNameId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].talukaId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenCityNameId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].cityId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addressInfoId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addressInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addInfoId'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editAddressInfoPartyMaster('
					+ count
					+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteAddressPartMaster'
					+ response.partyMasterAddressInfoDto[i].id
					+ '"  onclick="deletePartyMasterSlave('
					+ response.partyMasterAddressInfoDto[i].id
					+ ',\'deleteAddress\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyAddressTableInfoList").html(htm);
	}
	if (response.partyMasterPaymentInfoDto.length != 0
			&& response.partyMasterPaymentInfoDto != null
			&& response.partyMasterPaymentInfoDto != "") {
		length = response.partyMasterPaymentInfoDto.length;
		var id = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="accountHolderNameId'
					+ id
					+ '">'
					+ response.partyMasterPaymentInfoDto[i].accountHolderName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="accountNumberId'
					+ id
					+ '">'
					+ response.partyMasterPaymentInfoDto[i].accountNumber
					+ '</td>'
					+ ' <td class="col-md-1 center" id="accountAddressId'
					+ id
					+ '">'
					+ response.partyMasterPaymentInfoDto[i].accountAddress
					+ '</td>'
					+ ' <td class="col-md-1 center" id="bankNameId'
					+ id
					+ '" style="display:none">'
					+ response.partyMasterPaymentInfoDto[i].bankName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="bankIFSCId'
					+ id
					+ '" style="display:none">'
					+ response.partyMasterPaymentInfoDto[i].bankIFSC
					+ '</td>'
					+ ' <td class="col-md-1 center" id="accountCityId'
					+ id
					+ '" style="display:none">'
					+ response.partyMasterPaymentInfoDto[i].accountCity
					+ '</td>'
					+ ' <td class="col-md-1 center" id="paymentTermsId'
					+ id
					+ '" style="display:none">'
					+ response.partyMasterPaymentInfoDto[i].paymentTerms
					+ '</td>'
					+ ' <td class="col-md-1 center" id="creditTermsId'
					+ id
					+ '" style="display:none">'
					+ response.partyMasterPaymentInfoDto[i].creditTerms
					+ '</td>'
					+ ' <td class="col-md-1 center" id="paymentInfoId'
					+ id
					+ '" style="display:none">'
					+ response.partyMasterPaymentInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="payInfoId'
					+ id
					+ '" style="display:none">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="payInfoNewId'
					+ id
					+ '" style="display:none">'
					+ response.partyMasterPaymentInfoDto[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="paymentInfoId'
					+ id
					+ '" style="display:none">'
					+ response.partyMasterPaymentInfoDto[i].id
					+ '</td>'
					
					
					+ ' <td class="col-md-1 center" id="payInfoId1'
					+ id
					+ '" style="display:none">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editPaymentPartMaster'
					+ id
					+ '" value="'
					+ id
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editPaymentInfoPartyMaster('
					+ id
					+ ')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deletePaymentPartMaster'
					+ response.partyMasterPaymentInfoDto[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.partyMasterPaymentInfoDto[i].id
					+ ',\'deletePayment\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyPaymentInfoTableList").html(htm);
	}

	if (response.termsAndConditionInfoDto.length != 0
			&& response.termsAndConditionInfoDto != null
			&& response.termsAndConditionInfoDto != "") {
		length = response.termsAndConditionInfoDto.length;
		var id = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="txtTermsAndConditionsTitleId'
					+ id
					+ '">'
					+ response.termsAndConditionInfoDto[i].headingName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="txtTermsAndConditionId'
					+ id
					+ '">'
					+ response.termsAndConditionInfoDto[i].termconditionName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="termsAndCondId'
					+ id
					+ '" style="display:none">'
					+ response.termsAndConditionInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="termsAndCondSlaveId'
					+ id
					+ '" value="'
					+ response.termsAndConditionInfoDto[i].termsConditionSlaveId
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editTermsAndConditionInfoPartyMaster('
					+ response.termsAndConditionInfoDto[i].termsConditionSlaveId
					+ ','+ id
					+')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteTermsAndCondition'
					+ response.termsAndConditionInfoDto[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.termsAndConditionInfoDto[i].id
					+ ',\'deleteTermsAndCondition\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#TermsAndConditionInfoTableList").html(htm);
	}
}
/**
 * 
 * @param partyMasterId
 */
function deletePartyMaster(partyMasterId) {
	var inputs = [];
	inputs.push('id=' + partyMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/invPartyMaster/deletePartyMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			getAllPartyMaster();
		}
	});

}
/**
 * 
 */
function onCloseBtnRefrshPage() {
	window.location.replace("inv_party_master_data.jsp");
}

function getAutoPartyMaster(partyMasterId) {
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
					if (response.partyMasterDto.length == 0) {
						alertify.error("Data Not Found...!!!");
					}
					var template = "";
					for ( var j = 0; j < response.partyMasterDto.length; j++) {
						var arrValue = response.partyMasterDto[j].id + "-"
								+ response.partyMasterDto[j].name;
						var idValue = response.partyMasterDto[j].id;
						var partyName = response.partyMasterDto[j].name;
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
		getPartyMasterById(partyId);
		$("input#" + partyMasterId).val(partyName);
	}
}
/**
 * 
 * @param partyId
 */
function getPartyMasterById(partyId) {

	var inputs = [];
	inputs.push('id=' + partyId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/invPartyMaster/getPartyMasterById",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					partyMasterTemplate(response, "searchPartyMaster");
					$("#seachPartyMaster").focus();
					$('#seachPartyMaster').val("");
					var partyMaster = response;// JSON.stringify(response);
					var myGenralnfoObj = "";
					for ( var i = 0; i < partyMaster.partyMasterGeneralInfoDto.length; i++) {
						if (partyMaster.partyMasterGeneralInfoDto[i].party_master_id == partyId) {
							myGenralnfoObj = partyMaster.partyMasterGeneralInfoDto[i];
							break;
						}
					}
					$("#grnMobileNo").val(myGenralnfoObj.mobile);
				}
			});
}
/**
 * 
 */
function panValidation() {

	var generalPanNo = $("#generalPanNo").val();
	var regExp = /[a-zA-z]{5}\d{4}[a-zA-Z]{1}/;
	if (generalPanNo.length == 10) {
		if (generalPanNo.match(regExp)) {
			alert('PAN match found');
		} else {
			alert("Not a valid PAN number");
			event.preventDefault();
		}
	} else {
		alert('Please enter 10 digits for a valid PAN number');
		event.preventDefault();
	}
}
/**
 * 
 * @param tabType
 */
function addGeneralInfoRows(tabType) {
	if (tabType === "GeneralInfo") {
		var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToGeneralInfoTable(rows + 1);
	} else if (tabType === "ContactInfo") {
		var rows = $('#ContactInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToContactInfoTable(rows + 1);
	} else if (tabType === "AddressInfo") {
		var rows = $('#AddressInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToAddressInfoTable(rows + 1);
	} else if (tabType === "paymentInfo") {
		var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToPaymentInfoTable(rows + 1);
	} else if (tabType === "TermsAndConditionInfo") {
		var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToTermsAndConditionInfoTable(rows + 1);
	}

}
// this is for add dynamic row in table general information by vishnu
/**
 * 
 */
function addDynamicRecordsToGeneralInfoTable(id) {

	var generalMobileNo = $("#generalMobileNo").val().trim();
	var generalLandLineNo = $("#generalLandLineNo").val();
	var generalWebSite = $("#generalWebSite").val();
	var generalCompanyMail = $("#generalCompanyMail").val();
	var generalGstNO = $("#generalGstNO").val();
	var generalPanNo = $("#generalPanNo").val();

	if (generalMobileNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(generalMobileNo)) {
			alert("Phone1 should be of digits.!");
			$("#generalMobileNo").focus();
			return false;
		}
	}

	if (generalLandLineNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(generalLandLineNo)) {
			alert("Phone1 should be of digits.!");
			$("#generalLandLineNo").focus();
			return false;
		}
	}

	if (generalLandLineNo == "") {
		alert("Land Line should not be Empty!");
		$("#generalLandLineNo").focus();
		return false;
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalGstNOId'
			+ id
			+ '">'
			+ generalGstNO
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalMobileNoId'
			+ id
			+ '">'
			+ generalMobileNo
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalCompanyMailId'
			+ id
			+ '">'
			+ generalCompanyMail
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalLandLineNoId'
			+ id
			+ '" style="display:none">'
			+ generalLandLineNo
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalWebSiteId'
			+ id
			+ '" style="display:none">'
			+ generalWebSite
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalPanNoId'
			+ id
			+ '" style="display:none">'
			+ generalPanNo
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="geneInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			// test1
			+ ' <td class="col-md-1 center"><input type="hidden" id="editGeneralPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editGeneralInfoPartyMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id="deleteGeneralPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteGeneral\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyGeneralTableInfoList").append(htm);
	$('#generalFormId')[0].reset();
}

// *******************************************************
// this is for contact info add dynamic row added

function addDynamicRecordsToContactInfoTable(id) {

	var contactPerson = $("#contactPerson").val();
	var contactDesignation = $("#contactDesignation").val();
	var contatcAddress = $("#contatcAddress").val();
	var contactGender = $("#contactGender").val();
	var contactDob = $("#contactDateofbirth").val();
	var contactPhoneOne = $("#contactPhoneOne").val();
	var contactPhoneSecond = $("#contactPhoneSecond").val();
	var contactMail = $("#contactMail").val();
	if (contactPerson == "") {
		alert("Contact Person name should not  be  empty ..!");
		$("#contactPerson").focus();
		return false;
	}
	
	if (contactPhoneOne == "") {
		alert("Contact Phone-1 should not  be  empty ..!");
		$("#contactPhoneOne").focus();
		return false;
	}
	
	if (contactPhoneSecond == "") {
		alert("Contact Phone-2 should not  be  empty ..!");
		$("#contactPhoneSecond").focus();
		return false;
	}

	if (contactPerson != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(contactPerson)) {
			alert("Contact Person name should be of alphabets only with a single space allowed..!");
			$("#contactPerson").focus();
			return false;
		}
	}

	if (contactPhoneOne != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(contactPhoneOne)) {
			alert("Phone1 should be of digits.!");
			$("#contactPhoneOne").focus();
			return false;
		}
	}

	if (contactPhoneSecond != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(contactPhoneSecond)) {
			alert("Phone2 should be of digits.!");
			$("#contactPhoneSecond").focus();
			return false;
		}
	}
	if (contactMail != "") {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(contactMail)) {
			alert('Please Enter valid Email Id');
			$("#contactMail").focus();
			return false;
		}
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactPersonId'
			+ id
			+ '">'
			+ contactPerson
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactDesignationId'
			+ id
			+ '">'
			+ contactDesignation
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contatcAddressId'
			+ id
			+ '">'
			+ contatcAddress
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactGenderId'
			+ id
			+ '" style="display:none">'
			+ contactGender
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactDobId'
			+ id
			+ '" style="display:none">'
			+ contactDob
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactPhoneOneId'
			+ id
			+ '" style="display:none">'
			+ contactPhoneOne
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
			+ id
			+ '" style="display:none">'
			+ contactPhoneSecond
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactMailId'
			+ id
			+ '" style="display:none">'
			+ contactMail
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			
			
			// testtttttttttttttttt
			+ ' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editContactInfoPartyMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id ="deleteContactPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteContact\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyContactTableInfoList").append(htm);
	$('#contactFormId')[0].reset();

}

// this is all about dynamic row added in address table
/**
 * 
 */
function addDynamicRecordsToAddressInfoTable(id) {
	var companyName = $("#companyNameFromAddress").val();
	var companyArea = $("#areaFromAddress").val();
	var companyCountry = $("#countryFromAddress").val();
	var companyState = $("#stateFromAddress").val();
	var companyDistict = $("#districtFromAddress").val();
	var companyTaluka = $("#talukaFromAddress").val();
	var companyCity = $("#cityFromAddress").val();
	var companyStreet = $("#streetFromAddress").val();
	var companyPin = $("#pincodeFromAddress").val();
	var companyAddress = $("#addressFromAddress").val();
	
	var hiddenCountryName = $("#hiddenCountryFromPartyMaster").val();
	var hiddenStateName = $("#hiddenStateFromPartyMaster").val();
	var hiddenDistrictName = $("#hiddenDistrictFromPartyMaster").val();
	var hiddenTalukaName = $("#hiddenTalukaFromPartyMaster").val();
	var hiddenCityName = $("#hiddenCityFromPartyMaster").val();
	
	if (companyAddress == "") {
		alert("address should not be empty..!");
		$("#addressFromAddress").focus();
		return false;

	}
	/*if (hiddenCityName != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(hiddenCityName)) {
			alert("City name should be of alphabets only with a single space allowed..!");
			$("#cityFromAddress").focus();
			return false;
		}

	}*/

	if (companyPin != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(companyPin)) {
			alert("Pin code should be of digits only!");
			
			$("#pincodeFromAddress").focus();
			return false;
		}
		var result=checkPincodeLength();
		if(result==1){
			alert("Pincode Should Be Equal To 6 Digits");
			$("#pincodeFromAddress").val('');
			return false;
		}else{
			
		}
		
	}

	if (hiddenStateName != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(companyState)) {
			alert("State name should be of alphabets only with a single space allowed..!");
			$("#stateFromAddress").focus();
			return false;
		}
	}

	if (companyStreet != "" || companyStreet != null) {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(companyStreet)) {
			alert("Street should be of alphabets and digits only with a single space allowed..!");
			$("#streetFromAddress").focus();
			return false;
		}
	}

	if (hiddenCountryName != "" || hiddenCountryName != null) {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(hiddenCountryName)) {
			alert("Country should be of alphabets only with a single space allowed..!");
			$("#countryFromAddress").focus();
			return false;
		}
	}
	var companyAddressType = false;

	if ($('#billingAddress').is(":checked") == true) {
		companyAddressType = $("#billingAddress").val();
	}
	if ($('#shippingAddress').is(":checked") == true) {
		companyAddressType = $("#shippingAddress").val();
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyNameId'
			+ id
			+ '">'
			+ companyName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyCountryId'
			+ id
			+ '">'
			+ hiddenCountryName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyCityId'
			+ id
			+ '">'
			+ hiddenCityName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyAddressId'
			+ id
			+ '" style="display:none">'
			+ companyAddress
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyAddressTypeId'
			+ id
			+ '" style="display:none">'
			+ companyAddressType
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyStreetId'
			+ id
			+ '" style="display:none">'
			+ companyStreet
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyAreaId'
			+ id
			+ '" style="display:none">'
			+ companyArea
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyPinId'
			+ id
			+ '" style="display:none">'
			+ companyPin
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyStateId'
			+ id
			+ '" style="display:none">'
			+ hiddenStateName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyDistrictId'
			+ id
			+ '" style="display:none">'
			+ hiddenDistrictName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyTalukaId'
			+ id
			+ '" style="display:none">'
			+ hiddenTalukaName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenCountryNameId'
			+ id
			+ '" style="display:none">'
			+ companyCountry
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenStateNameId'
			+ id
			+ '" style="display:none">'
			+ companyState
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenDistrictNameId'
			+ id
			+ '" style="display:none">'
			+ companyDistict
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenTalukaNameId'
			+ id
			+ '" style="display:none">'
			+ companyTaluka
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenCityNameId'
			+ id
			+ '" style="display:none">'
			+ companyCity
			+ '</td>'
			+ ' <td class="col-md-1 center" id="addressInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="addressInfoId1'
			+ id
			+ '" style="display:none">'
			+ id
			+ '</td>'
			
			
			+ ' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editAddressInfoPartyMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id ="deleteAddressPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteAddress\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyAddressTableInfoList").append(htm);
	$('#addressFormId')[0].reset();
	$("#countryFromAddress").select2("val", 0);
	$("#stateFromAddress").select2("val", 0);
	$("#districtFromAddress").select2("val", 0);
	$("#talukaFromAddress").select2("val", 0);
	$("#cityFromAddress").select2("val", 0);

	$("#companyNameFromAddress").val("");
	$("#areaFromAddress").val("");
	$("#streetFromAddress").val("");
	$("#pincodeFromAddress").val("");
	$("#addressFromAddress").val("");
	$("#hiddenCountryFromPartyMaster").val("");
	$("#hiddenStateFromPartyMaster").val("");
	$("#hiddenDistrictFromPartyMaster").val("");
	$("#hiddenTalukaFromPartyMaster").val("");
	$("#hiddenCityFromPartyMaster").val("");

}

// this is all about dynamic row added in address table
/**
 * 
 */
function addDynamicRecordsToPaymentInfoTable(id) {

	var bankName = $("#bankName").val();
	var bankIfscCode = $("#bankIfscCode").val();
	var accountHolderName = $("#accountHolderName").val();
	var accountNumber = $("#accountNumber").val();
	var cityId = $("#cityId").val();
	var accountAddress = $("#accountAddress").val();
	var paymentTerm = $("#paymentTerm").val();
	var creditTerm = $("#creditTerm").val();

	if (bankName != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(bankName)) {
			alert("Bank name should be of alphabets only with a single space allowed..!");
			$("#bankName").focus();
			return false;
		}
	}

	if (accountNumber == "" || accountNumber == undefined
			|| accountNumber == null) {
		alert("Account Number code should be of digits only!");
		$("#accountNumber").focus();
		return false;
	}

	if (accountHolderName != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(accountHolderName)) {
			alert("Account Person name should be of alphabets only with a single space allowed..!");
			$("#accountHolderName").focus();
			return false;
		}
	}

	if (accountAddress != "" || accountAddress != null) {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(accountAddress)) {
			alert("Address should be of alphabets and digits only with a single space allowed..!");
			$("#accountAddress").focus();
			return false;
		}
	}

	if (bankIfscCode != "" || bankIfscCode != null) {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(bankIfscCode)) {
			alert("IFSC should be of alphabets and digits only with a single space allowed..!");
			$("#bankIfscCode").focus();
			return false;
		}
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountHolderNameId'
			+ id
			+ '">'
			+ accountHolderName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountNumberId'
			+ id
			+ '">'
			+ accountNumber
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountAddressId'
			+ id
			+ '">'
			+ accountAddress
			+ '</td>'
			+ ' <td class="col-md-1 center" id="bankNameId'
			+ id
			+ '" style="display:none">'
			+ bankName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="bankIFSCId'
			+ id
			+ '" style="display:none">'
			+ bankIfscCode
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountCityId'
			+ id
			+ '" style="display:none">'
			+ cityId
			+ '</td>'
			+ ' <td class="col-md-1 center" id="paymentTermsId'
			+ id
			+ '" style="display:none">'
			+ paymentTerm
			+ '</td>'
			+ ' <td class="col-md-1 center" id="creditTermsId'
			+ id
			+ '" style="display:none">'
			+ creditTerm
			+ '</td>'
			+ ' <td class="col-md-1 center" id="paymentInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="payInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			
			+ ' <td class="col-md-1 center"><input type="hidden" id="editPaymentPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editPaymentInfoPartyMaster('
			+ id
			+ ')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id ="deletePaymentPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deletePayment\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyPaymentInfoTableList").append(htm);
	$('#paymentFormId')[0].reset();
}
/**
 * 
 * @param id
 */
// this for terms and condtions
function addDynamicRecordsToTermsAndConditionInfoTable(id) {

	var termsAndConditionsTitle = $("#termsAndConditionsTitle option:selected")
			.html();
	if(termsAndConditionsTitle == "---Select---" ){
		
		alert("Please select terms and condition");
		return false;
	}
	var termsAndConditionsTitleVal = $(
			"#termsAndConditionsTitle option:selected").val();
	var termsAndCondition = $("#termsAndCondition").val();

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="txtTermsAndConditionsTitleId'
			+ id
			+ '">'
			+ termsAndConditionsTitle
			+ '</td>'
			+ ' <td class="col-md-1 center" id="txtTermsAndConditionId'
			+ id
			+ '">'
			+ termsAndCondition
			+ '</td>'
			+ id
			+ '">'
			+ ' <td class="col-md-1 center" id="termsAndCondId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			+ ' <td class="col-md-1 center"><input type="hidden" id="termsAndCondSlaveId'
			+ id
			+ '" value="'
			+ termsAndConditionsTitleVal
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editTermsAndConditionInfoPartyMaster('
			+ termsAndConditionsTitleVal
			+ ','+ id
			+ ')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id ="deleteTermsAndCondition'
			+ id + '" onclick="deletePartyMasterSlave('
			+ termsAndConditionsTitleVal + ',\'deleteTermsAndCondition\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#TermsAndConditionInfoTableList").append(htm);
	$('#termsAndConditionsTitle').select2('val', 0);
	$('#termsAndCondition').val("").empty();

}

// this is function for edit general inforamation
/**
 * 
 */
function editGeneralInfoPartyMaster(id, callFrom) {
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var generalInfoId = $("#geneInfoId1" + i).text();
		var geneInfoId = $("#geneInfoId" + i).text();
		var genInfoIdAdd = $("#generalInfoId" + i).text();
		if (generalInfoId == id || genInfoIdAdd == id) {
			$("#geneInfoIdNew").val($("#generalInfoId" + i).html());
			$("#generalMobileNo").val($("#generalMobileNoId" + i).html());
			$("#generalLandLineNo").val($("#generalLandLineNoId" + i).html());
			$("#generalWebSite").val($("#generalWebSiteId" + i).html());
			$("#generalCompanyMail").val($("#generalCompanyMailId" + i).html());
			$("#generalGstNO").val($("#generalGstNOId" + i).html());
			$("#generalPanNo").val($("#generalPanNoId" + i).html());
			$("#updateGeneralInfo").attr('myid', generalInfoId);
			$("#saveGeneralInfo").hide();
			$("#updateGeneralInfo").show();
			if (callFrom == "fromDB") {
				document.getElementById("saveGeneralInfo").style.display = "none";
				$("#updateGeneralInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateGeneralInfo").show();
				$("#saveGeneralInfo").hide();
			}

		}
	}
}
/**
 * 
 */
function updateGeneralInfoPartyMaster() {
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateGeneralInfo").attr('myid');
		if (id == i) {
			$("#generalInfoId" + i).html($("#geneInfoIdNew").val());
			$("#generalMobileNoId" + i).html($("#generalMobileNo").val());
			$("#generalLandLineNoId" + i).html($("#generalLandLineNo").val());
			$("#generalWebSiteId" + i).html($("#generalWebSite").val());
			$("#generalCompanyMailId" + i).html($("#generalCompanyMail").val());
			$("#generalGstNOId" + i).html($("#generalGstNO").val());
			$("#generalPanNoId" + i).html($("#generalPanNo").val());
			//$("#saveGeneralInfo").show();
			document.getElementById("saveGeneralInfo").style.display = "block";
			$("#updateGeneralInfo").hide();
		}
	}
	resetInfoFields('generalInfo');
}

function editContactInfoPartyMaster(id, callFrom) {
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var conInfoId = $("#conInfoId" + i).text();
		var contactInfoId = $("#contactInfoId1" + i).text();
		var conInfoIdAdd = $("#contactInfoId" + i).text();
		if (contactInfoId == id || conInfoIdAdd == id) {
			$("#conInfoIdNew").val($("#contactInfoId" + i).html());
			$("#contactPerson").val($("#contactPersonId" + i).html());
			$("#contactDesignation").val($("#contactDesignationId" + i).html());
			$("#contatcAddress").val($("#contatcAddressId" + i).html());
			$("#contactGender").val($("#contactGenderId" + i).html());
			$("#contactDateofbirth").val($("#contactDobId" + i).html());
			$("#contactPhoneOne").val($("#contactPhoneOneId" + i).html());
			$("#contactPhoneSecond").val($("#contactPhoneSecondId" + i).html());
			$("#contactMail").val($("#contactMailId" + i).html());
			$("#updateContactInfo").attr('updateContactInfoId', contactInfoId);
			if (callFrom == "fromDB") {
				document.getElementById("saveContactInfo").style.visibility = "hidden";
				$("#updateContactInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateContactInfo").show();
				$("#saveContactInfo").hide();
			}
		}
	}
}

function updateContactInfoPartyMaster() {
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateContactInfo").attr('updateContactInfoId');
		if (i == id) {
			
			var contactPerson = $("#contactPerson").val();
			if (contactPerson == "") {
				alert("Contact Person name should not  be  empty ..!");
				$("#contactPerson").focus();
				return false;
			}
			var contactPhoneOne = $("#contactPhoneOne").val();
			if (contactPhoneOne == "") {
				alert("Contact Phone-1 should not  be  empty ..!");
				$("#contactPhoneOne").focus();
				return false;
			}
			var contactPhoneSecond = $("#contactPhoneSecond").val()
			if (contactPhoneSecond == "") {
				alert("Contact Phone-2 should not  be  empty ..!");
				$("#contactPhoneSecond").focus();
			}
			
			$("#contactInfoId" + i).html($("#conInfoIdNew").val());
			$("#contactPersonId" + i).html($("#contactPerson").val());
			$("#contactDesignationId" + i).html($("#contactDesignation").val());
			$("#contatcAddressId" + i).html($("#contatcAddress").val());
			$("#contactGenderId" + i).html($("#contactGender").val());
			$("#contactDobId" + i).html($("#contactDateofbirth").val());
			$("#contactPhoneOneId" + i).html($("#contactPhoneOne").val());
			$("#contactPhoneSecondId" + i).html($("#contactPhoneSecond").val());
			$("#contactMailId" + i).html($("#contactMail").val());
			$("#saveContactInfo").show();
			$("#updateContactInfo").hide();
		}
	}
	resetInfoFields('contactInfo');
}

function editAddressInfoPartyMaster(id, callFrom) {
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var addressInfoId = $("#addressInfoId1" + i).text();
		var addInfoId = $("#addInfoId" + i).text();
		var addInfoIdAdd = $("#addressInfoId" + i).text();
		
		if (id == addressInfoId || id == addInfoIdAdd) {
			$("#addInfoIdNew").val($("#addressInfoId" + id).html());
			$("#companyNameFromAddress").val($("#companyNameId" + id).html());

			$("#countryFromAddress").select2('val',
					$("#hiddenCountryNameId" + id).html());
			
			$("#stateFromAddress").select2('val',
					$("#hiddenStateNameId" + id).html());
			getAllDistrictByStateId('stateFromAddress');

			$("#districtFromAddress").select2('val',$("#hiddenDistrictNameId" + id).html());
			getAllTalukaBydDistictId('districtFromAddress');
			$("#talukaFromAddress").select2('val',$("#hiddenTalukaNameId" + id).html());
			getAllCityByTalukaId('talukaFromAddress');
			$("#cityFromAddress").select2('val',$("#hiddenCityNameId" + id).html());

			$("#streetFromAddress").val($("#companyStreetId" + id).html());
			$("#pincodeFromAddress").val($("#companyPinId" + id).html());
			$("#areaFromAddress").val($("#companyAreaId" + id).html());
			$("#addressFromAddress").val($("#companyAddressId" + id).html());

			$("#hiddenCountryFromPartyMaster").val(
					$("#companyCountryId" + id).html());
			$("#hiddenStateFromPartyMaster").val(
					$("#companyStateId" + id).html());
			$("#hiddenDistrictFromPartyMaster").val(
					$("#companyDistrictId" + id).html());
			$("#hiddenTalukaFromPartyMaster").val(
					$("#companyTalukaId" + id).html());
			$("#hiddenCityFromPartyMaster")
					.val($("#companyCityId" + id).html());

			if ($("#companyAddressTypeId" + id).html() === "ShippingAddress") {
				$("#shippingAddress").val($("#companyAddressTypeId" + id).html());
				$('#shippingAddress').prop("checked", true);
				$('#billingAddress').prop("checked", false);
			} else {
				$("#billingAddress").val($("#companyAddressTypeId" + id).html());
					$('#billingAddress').prop("checked", true);
					$('#shippingAddress').prop("checked", false);
			}
			$("#updateAddressInfo").attr('updateAddressInfoId', addressInfoId);
			// $("#saveAddressInfo").hide();
			// $("#updateAddressInfo").show();
			if (callFrom == "fromDB") {
				document.getElementById("saveAddressInfo").style.visibility = "hidden";
				$("#updateAddressInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateAddressInfo").show();
				$("#saveAddressInfo").hide();
			}
		}
	}
}

function updateAddressInfoPartyMaster() {
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateAddressInfo").attr('updateAddressInfoId');
		if (i == id) {
			var companyAddress = $("#addressFromAddress").val();
			if (companyAddress == "") {
				alert("address should not be empty..!");
				$("#addressFromAddress").focus();
				return false;

			}
			$("#addressInfoId" + i).html($("#addInfoIdNew").val());
			$("#companyNameId" + i).html($("#companyNameFromAddress").val());
			$("#hiddenCountryNameId" + i).html($("#countryFromAddress").val());
			$("#hiddenStateNameId" + i).html($("#stateFromAddress").val());
			$("#hiddenDistrictNameId" + i)
					.html($("#districtFromAddress").val());
			$("#hiddenTalukaNameId" + i).html($("#talukaFromAddress").val());
			$("#hiddenCityNameId" + i).html($("#cityFromAddress").val());

			$("#companyCountryId" + i).html(
					$("#hiddenCountryFromPartyMaster").val());
			$("#companyStateId" + i).html(
					$("#hiddenStateFromPartyMaster").val());
			$("#companyDistrictId" + i).html(
					$("#hiddenDistrictFromPartyMaster").val());
			$("#companyTalukaId" + i).html(
					$("#hiddenTalukaFromPartyMaster").val());
			$("#companyCityId" + i).html($("#hiddenCityFromPartyMaster").val());

			$("#companyAddressId" + i).html($("#addressFromAddress").val());
			$("#companyStreetId" + i).html($("#streetFromAddress").val());
			$("#companyPinId" + i).html($("#pincodeFromAddress").val());
			$("#companyAreaId" + i).html($("#areaFromAddress").val());

		/*	if ($("#shippingAddress").val() === "ShippingAddress") {*/
				if ($("#shippingAddress").is(":checked")) {
					$('#shippingAddress').prop("checked", true);
					$("#companyAddressTypeId" + i).html($("#shippingAddress").val());
					$('#billingAddress').prop("checked", false);
				} else if($("#billingAddress").is(":checked")) {
					$('#billingAddress').prop("checked", true);
					$("#companyAddressTypeId" + i).html($("#billingAddress").val());
					$('#shippingAddress').prop("checked", false);
				}
			/*} else {
				
				if ($("#billingAddress").is(":checked")) {
					$("#companyAddressTypeId" + i).html($("#billingAddress").val());
					$('#billingAddress').prop("checked", true);
				} else {
					$('#shippingAddress').prop("checked", false);
				}
			}*/
			document.getElementById("saveAddressInfo").style.visibility = "visible";
			$("#saveAddressInfo").show();
			$("#updateAddressInfo").hide();
		}
	}
	resetInfoFields('addressInfo');
}

// this is for payment info
function editPaymentInfoPartyMaster(id) {
	var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var paymentInfoId = $("#payInfoId1" + i).text();
		var payInfoId = $("#payInfoId" + i).text();
		var payInfoIddd = $("#paymentInfoId" + i).text();
		if (id == paymentInfoId || id == payInfoIddd) {
			$("#payInfoIdNew").val($("#paymentInfoId" + id).html());
			$("#bankName").val($("#bankNameId" + i).html());
			$("#bankIfscCode").val($("#bankIFSCId" + i).html());
			$("#accountHolderName").val($("#accountHolderNameId" + i).html());
			$("#accountNumber").val($("#accountNumberId" + i).html());
			$("#cityId").val($("#accountCityId" + i).html());
			$("#accountAddress").val($("#accountAddressId" + i).html());
			$("#paymentTerm").val($("#paymentTermsId" + i).html());
			$("#creditTerm").val($("#creditTermsId" + i).html());
			$("#updatePaymentInfo").attr('updatePaymentInfoId', paymentInfoId);
			$("#savePaymentInfo").hide();
			$("#updatePaymentInfo").show();
		}
	}
}

function updatePaymentInfoPartyMaster() {
	var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updatePaymentInfo").attr('updatePaymentInfoId');
		if (i == id) {
			$("#paymentInfoId" + i).html($("#payInfoIdNew").val());
			$("#bankNameId" + i).html($("#bankName").val());
			$("#bankIFSCId" + i).html($("#bankIfscCode").val());
			$("#accountHolderNameId" + i).html($("#accountHolderName").val());
			$("#accountNumberId" + i).html($("#accountNumber").val());
			$("#accountCityId" + i).html($("#cityId").val());
			$("#accountAddressId" + i).html($("#accountAddress").val());
			$("#paymentTermsId" + i).html($("#paymentTerm").val());
			$("#creditTermsId" + i).html($("#creditTerm").val());
			$("#savePaymentInfo").show();
			$("#updatePaymentInfo").hide();
		}
	}
	resetInfoFields('paymentInfo');
}

// this is for terms and Conditions info edit
function editTermsAndConditionInfoPartyMaster(id,index) {
	getTermConditionMaster(id,index);
	$("#saveTermsAndConditionInfo").hide();
	$("#updateTermsAndConditionInfo").show();
}
// this is for terms and Conditions update
function updateTermsAndConditionPartyMaster() {
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var termsAndCondId = $("#termsAndCondSlaveId" + i).val();
		var id = $("#updateTermsAndConditionInfo").attr(
				'updatetermsAndCondInfoId');
		if (termsAndCondId == id) {
			$("#txtTermsAndConditionsTitleId" + i).html(
					$("#termsAndConditionsTitle option:selected").html());
			$("#txtTermsAndConditionId" + i)
					.html($("#termsAndCondition").val());
			$("#saveTermsAndConditionInfo").show();
			$("#updateTermsAndConditionInfo").hide();
		}
	}
	resetInfoFields('TermsAndConditionInfo');
}

function getMasterTermsAndCondition() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryM/getAllInventoryTermAndCondition",
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select name='room Name' id='termsAndConditionsTitle' class='col-md-12'><option value='0'>---Select---</option>";

					for ( var i = 0; i < r.lsttermcondition.length; i++) {
						divContent = divContent + "<option value='"
								+ r.lsttermcondition[i].termConditionId
								+ "'  >" + r.lsttermcondition[i].headingName
								+ "</option>";
					}
					divContent = divContent + "</select>";
					$("#termsAndConditionsTitle").html(divContent);
					$("#termsAndConditionsTitle").select2();
				}
			});
}

function getTermConditionMaster(termconditionId,index) {
	$("#termsAndConditionsSelectedId").val(termconditionId);
	var inputs = [];
	inputs.push('termconditionId=' + termconditionId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editTermAndConditionMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(index !=undefined && index !=""){
				var termconditionName = $("#txtTermsAndConditionId"+index).text();
				$("#termsAndCondition").val(termconditionName);
			}else{
				$("#termsAndCondition").val(r.termconditionName);	
			}
			
			$("#termsAndCondSlaveId" + termconditionId).val(r.termConditionId);
			$('#termsAndConditionsTitle').select2('val', r.termConditionId);
			$("#updateTermsAndConditionInfo").attr('updatetermsAndCondInfoId',
					r.termConditionId);
		}
	});
}

function deletePartyMasterSlave(id, callFrom) {
	var partyMasterId = $("#partyMasterId").val();
	if (callFrom === "deleteGeneral") {

		$("#PartyGeneralTableInfoList")
				.on(
						'click',
						'#deleteGeneralPartMaster' + id + '',
						function() {
							var isNew = $("#deleteGeneralPartMaster" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/invPartyMaster/deletePartyMasterSlave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}

						});
	} else if (callFrom === "deleteContact") {
		$("#PartyContactTableInfoList")
				.on(
						'click',
						'#deleteContactPartMaster' + id + '',
						function() {
							var isNew = $("#deleteContactPartMaster" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/invPartyMaster/deletePartyMasterSlave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
	} else if (callFrom === "deleteAddress") {
		$("#PartyAddressTableInfoList")
				.on(
						'click',
						'#deleteAddressPartMaster' + id + '',
						function() {
							var isNew = $("#deleteAddressPartMaster" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/invPartyMaster/deletePartyMasterSlave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
	} else if (callFrom === "deletePayment") {
		$("#PartyPaymentInfoTableList")
				.on(
						'click',
						'#deletePaymentPartMaster' + id + '',
						function() {
							var isNew = $("#deletePaymentPartMaster" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/invPartyMaster/deletePartyMasterSlave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
	} else if (callFrom === "deleteTermsAndCondition") {
		$("#TermsAndConditionInfoTableList")
				.on(
						'click',
						'#deleteTermsAndCondition' + id + '',
						function() {
							var isNew = $("#deleteTermsAndCondition" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/invPartyMaster/deletePartyMasterSlave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
	}
}
function getMrnTableBodyString(id) {

	var tbody = "<tr id='multiTr"
			+ id
			+ "'>"
			+ "<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox"
			+ id
			+ "' value='"
			+ id
			+ "'></td>"
			+ "<td class='col-md-1 center'><span id='snum"
			+ id
			+ "'>"
			+ id
			+ "</span><input type='hidden' id='slaveId"
			+ id
			+ "' value='0'></td>"
			+ "<td class='col-md-3 center'><input type='text' id='txtItemNameId"
			+ id
			+ "' class='typeahead form-control input-SmallText' data-name='itemMaster' onkeyup='fetchItemMasterDetails(this.id)'> </td>"
			+ "<td class='col-md-2 center'><input type='text' id='txtMrnQty"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+ "<td class='col-md-1 center'><select style='width:100px' id='selUom"
			+ id + "'><option value='0'>---Select---</option></select></td>"
			+ "</tr>";

	getUOMTemp("selUom" + id);

	return tbody;
}
/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : Add new row temp for MRN
 ******************************************************************************/
function addNewRowInTable(tableId, callFrom) {

	var tbody = "";
	var rows = $('#' + tableId + ' tbody tr').length;

	if (callFrom == "MRN") {

		tbody = getMrnTableBodyString(rows + 1);
	} else if (callFrom == "addGenerateMRNRequest") {
		tbody = generateMrnRequestTableBody(rows + 1);
	} else if (callFrom == "addConsumptionRequest") {
		tbody = generateConsumptionRequestTableBody(rows + 1);
	} else if (callFrom == "addGoodsIssueRequest") {
		tbody = generateGoodsIssueTableBody(rows + 1);
	} else if (callFrom == "GRN") {
		tbody = getGrnTableBodyString(rows + 1);
	} else if (callFrom == "GRNOnPlus") {
		tbody = getGrnTableBodyStringOnPlusButton(rows + 1);
	} else if (callFrom == "PurInv") {
		tbody = getPurInvTableBodyString(rows + 1);
	} else if (callFrom == "PurInvOnPlus") {
		tbody = getPurInvTableBodyStringOnPlusButton(rows + 1);
	} else if (callFrom == "addMrnReturnRequest") {
		tbody = addMrnReturnRequest(rows + 1);
	}
	$('#' + tableId).append(tbody);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : Remove row temp for MRN
 ******************************************************************************/
function removeRowFromTable(tableId, checkboxClass) {
	$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
	check(tableId);
	checkComp(tableId);
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : For reorder srno after delete
 ******************************************************************************/
function check(tableId) {
	obj = $('#' + tableId + ' tbody tr').find('span');
	$.each(obj, function(key, value) {
		id = value.id;
		$('#' + id).html(key + 1);
	});
}
/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : For reorder index ids of componant after delete
 ******************************************************************************/
function checkComp(tableId) {
	var trLength = $('#' + tableId).find("tr:first th").length;
	obj = $('#' + tableId + ' tbody tr td').find('input,span,select,textarea');
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
/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : Check uncheck all checkbox in table
 ******************************************************************************/
function checkUncheckAll(masterChkId, slaveChkClass) {

	if ($("#" + masterChkId).is(":checked")) {

		$('.' + slaveChkClass).prop("checked", true);
	} else {

		$('.' + slaveChkClass).prop("checked", false);
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 12-Dec-2019
 * @codeFor : set All state Master Detail
 ******************************************************************************/
function getAllStateMaster() {
	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllStateMaster",
				error : function() {
					alert('error');
				},
				success : function(r) {

					var divContent = "";
					divContent = divContent
							+ "<select name='State Name' class='col-md-12'><option value='0'>--Select State--</option>";
					for ( var i = 0; i < r.stateList.length; i++) {
						divContent = divContent + "<option value='"
								//for server
					//			+ r.stateList[i].state_id + "'>"
					//			+ r.stateList[i].state_name + "</option>";
								//for us
								+ r.stateList[i].state_ID + "'>"
								+ r.stateList[i].stateName + "</option>";
					}
					divContent = divContent + "</select>";
					$("#stateName").html(divContent);
					$("#stateName").select2();
					$("#stateIdPO").html(divContent);
					$("#stateIdPO").select2();
					$("#supplierStateId").html(divContent);
					$("#supplierStateId").select2();

					$("#stateName").html(divContent);
					$("#stateName").select2();
					$("#stateFromAddress").html(divContent);
					$("#stateFromAddress").select2();
					$("#grnSupplierState").html(divContent);
					$("#grnSupplierState").select2();
					$("#purchaseInvoiceSupplierState").html(divContent);
					$("#purchaseInvoiceSupplierState").select2();

				}
			});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 12-Dec-2019
 * @codeFor : getAllDistrictByStateId()
 ******************************************************************************/
function getAllDistrictByStateId(inputID) {
	var stateId = "";
	var categoryName = $("#" + inputID).attr('data-name');
	if (categoryName == "getDistrictOnPO") {
		stateId = $('#stateIdPO').val();
		var hiddenStateName = $("#stateIdPO option:selected").text();
		document.getElementById("hiddenStateName").value = hiddenStateName;
	} else if (categoryName == "getDistrictOnManufac") {
		stateId = $("#stateName").val();
	} else if (categoryName == "getDistrictOnGRN") {
		stateId = $('#stateFromAddress').val();
		var hiddenStateName = $("#stateFromAddress option:selected").text();
		document.getElementById("hiddenStateFromPartyAddress").value = hiddenStateName;
	} else if (categoryName == "getDistrictOnPurInv") {
		stateId = $('#stateFromAddress').val();
		var hiddenStateName = $("#stateFromAddress option:selected").text();
		document.getElementById("hiddenStateFromPartyMaster").value = hiddenStateName;
	} else if (categoryName == "getDistrictOnPartyMaster") {
		stateId = $('#stateFromAddress').val();
		var hiddenStateName = $("#stateFromAddress option:selected").text();
		document.getElementById("hiddenStateFromPartyMaster").value = hiddenStateName;
	}
	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllDistrictByStateId",
				data : {
					"stateId" : stateId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<option value='0'>--Select District--</option>";
					for ( var i = 0; i < r.districtList.length; i++) {
						divContent = divContent + "<option value='"
								//for server
						//		+ r.districtList[i].district_id + "'>"
						//		+ r.districtList[i].district_name + "</option>";
								//for us
								+ r.districtList[i].district_ID + "'>"
								+ r.districtList[i].districtName + "</option>";
					}
					// divContent = divContent + "</select>";
					if (categoryName == "getDistrictOnManufac") {
						$("#distictName").html(divContent);
						$("#distictName").select2();
					} else if (categoryName == "getDistrictOnPO") {
						$("#distictIdPO").html(divContent);
						$("#distictIdPO").select2();
					} else if (categoryName == "getDistrictOnGRN") {
						$("#districtFromAddress").html(divContent);
						$("#districtFromAddress").select2();
					} else if (categoryName == "getDistrictOnPurInv") {
						$("#districtFromAddress").html(divContent);
						$("#districtFromAddress").select2();
					} else if (categoryName == "getDistrictOnPartyMaster") {
						document.getElementById("districtFromAddress").innerHTML = divContent;
						$("#districtFromAddress").html(divContent);
						$("#districtFromAddress").select2();
					}
				}
			});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 12-Dec-2019
 * @codeFor : getAllTalukaBydDistictId()
 ******************************************************************************/
function getAllTalukaBydDistictId(inputID) {
	var districtId = "";
	var categoryName = $("#" + inputID).attr('data-name');
	if (categoryName == "getTalukaOnPO") {
		districtId = $('#distictIdPO').val();
		var hiddenDistrictName = $("#distictIdPO option:selected").text();
		document.getElementById("hiddenDistrictName").value = hiddenDistrictName;
	} else if (categoryName == "getTalukaOnManufac") {
		districtId = $('#distictName').val();
	} else if (categoryName == "getTalukaOnGRN") {
		districtId = $('#districtFromAddress').val();
		var hiddenDistrictName = $("#districtFromAddress option:selected")
				.text();
		document.getElementById("hiddenDistrictFromPartyAddress").value = hiddenDistrictName;
	} else if (categoryName == "getTalukaOnPurInv") {
		districtId = $('#districtFromAddress').val();
		var hiddenDistrictName = $("#districtFromAddress option:selected")
				.text();
		document.getElementById("hiddenDistrictFromPartyMaster").value = hiddenDistrictName;
	} else if (categoryName == "getTalukaOnPartyMaster") {
		districtId = $('#districtFromAddress').val();
		var hiddenDistrictName = $("#districtFromAddress option:selected")
				.text();
		document.getElementById("hiddenDistrictFromPartyMaster").value = hiddenDistrictName;
	}
	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllTalukaBydDistictId",
				data : {
					"districtId" : districtId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select name='Taluka Name' class='col-md-12'><option value='0'>--Select Taluka--</option>";
					for ( var i = 0; i < r.talukaList.length; i++) {
						divContent = divContent + "<option value='"
								//for server
							//	+ r.talukaList[i].taluka_id + "'>"
							//	+ r.talukaList[i].taluka_name + "</option>";
								//for us
								+ r.talukaList[i].taluka_ID + "'>"
								+ r.talukaList[i].talukaName + "</option>";
					}
					divContent = divContent + "</select>";
					if (categoryName == "getTalukaOnManufac") {
						$("#talukaName").html(divContent);
						$("#talukaName").select2();
					} else if (categoryName == "getTalukaOnPO") {
						$("#talukaIdPO").html(divContent);
						$("#talukaIdPO").select2();
					} else if (categoryName == "getTalukaOnGRN") {

						$("#talukaFromAddress").html(divContent);
						$("#talukaFromAddress").select2();
					} else if (categoryName == "getTalukaOnPurInv") {

						$("#talukaFromAddress").html(divContent);
						$("#talukaFromAddress").select2();
					} else if (categoryName == "getTalukaOnPartyMaster") {
						$("#talukaFromAddress").html(divContent);
						$("#talukaFromAddress").select2();
					}

				}
			});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 12-Dec-2019
 * @codeFor : getAllCityByTalukaId()()
 ******************************************************************************/
function getAllCityByTalukaId(inputID) {
	var talukaId = "";
	var categoryName = $("#" + inputID).attr('data-name');
	if (categoryName == "getCityOnPO") {
		talukaId = $('#talukaIdPO').val();
		var hiddenTalukaName = $("#talukaIdPO option:selected").text();
		document.getElementById("hiddenTalukaName").value = hiddenTalukaName;
	} else if (categoryName == "getCityOnManufac") {
		talukaId = $('#talukaName').val();
	} else if (categoryName == "getCityOnGRN") {
		talukaId = $('#talukaFromAddress').val();
		var hiddenTalukaName = $("#talukaFromAddress option:selected").text();
		document.getElementById("hiddenTalukaFromPartyAddress").value = hiddenTalukaName;
	} else if (categoryName == "getCityOnPurInv") {
		talukaId = $('#talukaFromAddress').val();
		var hiddenTalukaName = $("#talukaFromAddress option:selected").text();
		document.getElementById("hiddenTalukaFromPartyMaster").value = hiddenTalukaName;
	} else if (categoryName == "getCityOnPartyMaster") {
		talukaId = $('#talukaFromAddress').val();
		var hiddenTalukaName = $("#talukaFromAddress option:selected").text();
		document.getElementById("hiddenTalukaFromPartyMaster").value = hiddenTalukaName;
	}

	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllCityByTalukaId",
				data : {
					"talukaId" : talukaId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {

					var divContent = "";
					divContent = divContent
							+ "<select name='room Name' class='col-md-12'><option value='0'>---Select City---</option>";

					for ( var i = 0; i < r.cityList.length; i++) {
						divContent = divContent + "<option value='"
								//for server
							//	+ r.cityList[i].city_id + "'  >"
							//	+ r.cityList[i].city_name + "</option>";
								//for us	
								+ r.cityList[i].city_ID + "'  >"
								+ r.cityList[i].cityName + "</option>";
					}
					divContent = divContent + "</select>";

					if (categoryName == "getCityOnPO") {
						$("#cityIdPO").html(divContent);
						$("#cityIdPO").select2();
					} else if (categoryName == "getCityOnManufac") {
						$("#cityName").html(divContent);
						$("#cityName").select2();
					} else if (categoryName == "getCityOnGRN") {
						$("#cityFromAddress").html(divContent);
						$("#cityFromAddress").select2();
					} else if (categoryName == "getCityOnPurInv") {
						$("#cityFromAddress").html(divContent);
						$("#cityFromAddress").select2();
					} else if (categoryName == "getCityOnPartyMaster") {
						$("#cityFromAddress").html(divContent);
						$("#cityFromAddress").select2();
					}
				}
			});
}
/**
 * 
 */
function getSelectedCityName(inputID) {

	var cityId = "";
	var categoryName = $("#" + inputID).attr('data-name');
	if (categoryName == "getLocalityOnPartyMaster") {
		cityId = $('#cityFromAddress').val();
		var hiddenCityName = $("#cityFromAddress option:selected").text();
		document.getElementById("hiddenCityFromPartyMaster").value = hiddenCityName;
	} else if (categoryName == "getLocalityOnGRN") {
		cityId = $('#cityFromAddress').val();
		var hiddenCityName = $("#cityFromAddress option:selected").text();
		document.getElementById("hiddenCityFromPartyMaster").value = hiddenCityName;
	} else if (categoryName == "getLocalityOnPurInv") {
		cityId = $('#cityFromAddress').val();
		var hiddenCityName = $("#cityFromAddress option:selected").text();
		document.getElementById("hiddenCityFromPartyMaster").value = hiddenCityName;
	} else {
		var hiddenCityName = $("#cityIdPO option:selected").text();
		document.getElementById("hiddenCityName").value = hiddenCityName;
	}

}
/**
 * 
 */
function getSelectedCountryName(inputID) {
	var countryId = "";
	var categoryName = $("#" + inputID).attr('data-name');
	if (categoryName == "getStateOnPartyMaster") {
		countryId = $('#countryFromAddress').val();
		var hiddenCountryName = $("#countryFromAddress option:selected").text();
		document.getElementById("hiddenCountryFromPartyMaster").value = hiddenCountryName;
	} else if (categoryName == "getStateGRN") {
		countryId = $('#countryFromAddress').val();
		var hiddenCountryName = $("#countryFromAddress option:selected").text();
		document.getElementById("hiddenCountryFromAddress").value = hiddenCountryName;
	} else if (categoryName == "getStatePurInv") {
		countryId = $('#countryFromAddress').val();
		var hiddenCountryName = $("#countryFromAddress option:selected").text();
		document.getElementById("hiddenCountryFromPartyMaster").value = hiddenCountryName;
	} else {
		var hiddenCountryName = $("#countryIdPO option:selected").text();
		document.getElementById("hiddenCountryName").value = hiddenCountryName;
	}
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 13-12-2019
 * @codeFor :
 ******************************************************************************/
function getHSNDetails(hsnId) {
	var hiddenHsnNameValue = $("#hsnNameId option:selected").text();
	document.getElementById("hiddenHsnNameValue").value = hiddenHsnNameValue;
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('hsnId=' + hsnId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryItemMaster/getHSNDetails",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			console.log(r);
			$("#cgstRateId").val(r.cgst);
			$("#sgstRateId").val(r.sgst);
			$("#taxNameId").val(r.tax_code);
			$("#taxRateId").val(r.tax_rate);
		}
	});

}

/**
 * 
 */
function fetchHospitalState() {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : 'ehat/inventoryM/fetchHospitalState',
		error : function() {
			alert('error');
		},
		success : function(response) {

			if (response > 0) {
				$("#hosState").val(response);
			}
			hos = response;
		}
	});
}


/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : Check uncheck all checkbox in table
 ******************************************************************************/
function toggleEntryDiv(id) {
	if (id == "divForEdit") {
		$("#divForEntry").show('slow');
	} else if (id == "divForEntry") {
		$("#divForEntry").toggle('slow');
	} else if (id == "divForCategory") {
		$("#divForCategory").toggle('slow');
	} else if (id == "divForEditCategory") {
		$("#divForCategory").show('slow');
	}
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 25-oct-2019
 * @codeFor :getAllUnitMaster Detail
 ******************************************************************************/
function getUOMTemp(selectId) {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllUnitMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setUOMTemp(r, selectId);
		}
	});
}
/**
 * 
 * @param r
 * @param selectId
 */
function setUOMTemp(r, selectId) {
	var htm = "<option value='0'>--Select--</option>";
	for ( var i = 0; i < r.lstunitmaster.length; i++) {
		htm = htm + "<option value='" + r.lstunitmaster[i].uniId + "'>"
				+ r.lstunitmaster[i].unitName + "</option>";
	}
	$("#" + selectId).html(htm);
	$("#" + selectId).select2();
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 13-Dec-2019
 * @codeFor : inventoryFinancialYearAutoSuggestion
 ******************************************************************************/
function inventoryFinancialYearAutoSuggestion(inputID) {
	var type = $("#" + inputID).attr('data-name');
	var resultData = [];
	var year = $("#" + inputID).val();

	if (year == "" || year == null || year == "null" || year == undefined) {
		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}

	var inputs = [];
	inputs.push('year=' + year);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/inventoryFinancialYearAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstFinancialMaster.length; j++) {
				var arrValue = response.lstFinancialMaster[j].year;
				var idValue = response.lstFinancialMaster[j].id;
				var year = response.lstFinancialMaster[j].year;

				$("#hiddenyearname").val(year);
				$("#hiddenYearId").val(idValue);

				resultData.push({
					ID : idValue,
					Name : year
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

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
		var id = res[0];
		var year = res[1];

		$("input#" + inputID).val(year);
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 13-Dec-2019
 * @codeFor : auttosuggestion for Party Master
 ******************************************************************************/
function inventoryPartyMasterAutoSuggestion(inputID) {
	var resultData = [];
	var partyName = $("#" + inputID).val();

	if (partyName == "" || partyName == null || partyName == "null"
			|| partyName == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();

		return false;
	}

	var inputs = [];
	inputs.push('partyName=' + partyName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/purchasequotation/inventoryPartyMasterAutoSuggestion",
				cache : false,
				success : function(response) {
					if (response.partyMasterDto.length == 0) {
						alertify
								.error("You Cannot Insert Other Supplier Name Value...!!!");
						// document.getElementById('searchId11').value = "";
						document.getElementById('supplierId').value = "";
					}

					var template = "";
					for ( var j = 0; j < response.partyMasterDto.length; j++) {
						var arrValue = response.partyMasterDto[j].name;
						var idValue = response.partyMasterDto[j].id;
						var partyName = response.partyMasterDto[j].name;
						$("#hiddenpartyname").val(partyName);
						$("#hiddenPartyId").val(idValue);

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
		var partyId = res[0];
		var partyName = res[1];

		$("input#" + inputID).val(partyName);
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 13-Dec-2019
 * @codeFor : saveSanctionMaster()
 ******************************************************************************/
function saveSanctionMaster() {
	var sanctionId = $("#sanctionId").val();
	var sanctionDate = $("#sanDate").val();
	var financialYear = $("#financialYear").val();
	var empName = $("#empName").val();
	var empSanAmt = $("#empSanAmt").val();
	var partyId = $("#hiddenPartyId").val();
	var partyName = $("#supplierId").val();
	var yearName = $("#hiddenyearname").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	if (empName == "" || empName == null) {

		alert("Please Enter empName..!");
		$("#empName").focus();
		return false;
	}

	if (empSanAmt == 0 || empSanAmt == "" || empSanAmt == "null"
			|| empSanAmt == null) {
		alert("please enter sanction Amount");
		$("#empSanAmt").val("");
		$("#empSanAmt").focus();
		return false;
	}

	if (supplierId == 0 || supplierId == "" || supplierId == "null"
			|| supplierId == null) {
		alert("please enter Supplier Name");
		$("#partyId").focus();
		return false;
	}

	var inputs = [];

	inputs.push('sanctionId=' + sanctionId);
	inputs.push('sanctionDate=' + sanctionDate);
	inputs.push('financialYear=' + financialYear);
	inputs.push('empName=' + empName);
	inputs.push('empSanAmt=' + empSanAmt);
	inputs.push('partyId=' + partyId);

	inputs.push('partyName=' + partyName);
	inputs.push('yearName=' + yearName);

	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/saveSanctionMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (r == 3) {
				alertify.error("Financial Year or Party Name Not present");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			refreshSactionMaster();
			getAllSanctionMaster();
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 13-Dec-2019
 * @codeFor :getAllSanctionMaster Detail
 ******************************************************************************/
function getAllSanctionMaster() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllSanctionMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setSactionFormDocTemp(r);
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 13-Dec-2019
 * @codeFor : setFormDocTemp Master Detail
 ******************************************************************************/
function setSactionFormDocTemp(r) {

	var htm = "";
	var index = 1;

	for ( var i = 0; i < r.lstsactionform.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstsactionform[i].sanctionDate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstsactionform[i].yearName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstsactionform[i].empName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstsactionform[i].empSanAmt
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstsactionform[i].partyName
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editSactionMaster('
				+ r.lstsactionform[i].sanctionId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteSactionMaster('
				+ r.lstsactionform[i].sanctionId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#sanctionMasterDetails").html(htm);
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 13-Dec-2019
 * @codeFor : refreshSactionMaster Detail
 ******************************************************************************/
function refreshSactionMaster() {
	$("#sanctionId").val(0);

	// $("#sanDate").val("");
	$("#financialYear").val(0);
	$("#empName").val("");
	$("#empSanAmt").val(0.0);
	$("#supplierId").val("");

	$("#hiddenpartyname").val(0);
	$("#hiddenyearname").val(0);
}

function getAllFinancialMaster() {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/inventoryM/getAllFinancialMasterRecords",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('Network Issue..!!');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";

					for ( var i = 0; i < r.lstFinancialMaster.length; i++) {
						divContent = divContent + "<option value='"
								+ r.lstFinancialMaster[i].id + "'  >"
								+ r.lstFinancialMaster[i].year + "</option>";
					}
					divContent = divContent + "</select>";
					$("#financialYear").html(divContent);
					$("#financialYear").select2();

				}
			});
}

function editSactionMaster(sanctionId) {
	alert(sanctionId);
	var inputs = [];
	inputs.push('sanctionId=' + sanctionId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editSactionMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			$("#sanctionId").val(response.sanctionId);

			$("#sanDate").val(response.sanctionDate);
			$("#financialYear").select2('val', response.financialYear);
			$("#empName").val(response.empName);
			$("#empSanAmt").val(response.empSanAmt);
			$("#supplierId").val(response.partyName);
			$("#hiddenPartyId").val(response.partyId);
		}
	});

}

function deleteSactionMaster(sanctionId) {
	var inputs = [];
	inputs.push('sanctionId=' + sanctionId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/deleteSactionMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			alert(response);
			getAllSanctionMaster();
		}
	});

}

/**
 * @author Rohit Sandbhor
 * @since 17-01-2020
 * @comment created this js function to calculate unit price related to factor 2
 */
function calculateUnitPrice2() {
	var fact1 = $("#purchaseUomFactor1Id").val();
	var fact2 = $("#purchaseUomFactor2Id").val();
	var factor2;
	var empty = "";
	if (fact1 == "" || fact1 == 0) {
		alert("Please enter factor 1");
		return false;
	} else {
		if (fact2 != "" || fact2 != 0) {
			var unitP1 = $("#purchaseUnitPrice1Id").val();
			factor2 = unitP1 / fact2;
			if (factor2 != "" || factor2 != 0) {
				$("#purchaseUnitPrice2Id").val(parseFloat(factor2).toFixed(2));
			} else {
				$("#purchaseUnitPrice2Id").val(empty);
			}
		} else {
			$("#purchaseUnitPrice2Id").val(empty);
		}
	}
	var fact2 = $("#purchaseUomFactor2Id").val();
	var fact3 = $("#purchaseUomFactor3Id").val();
	var factor3;
	var empty = "";
	if (fact2 == "" || fact2 == 0) {
		$("#purchaseUnitPrice2Id").val(0);
		$("#purchaseUnitPrice3Id").val(0);
		$("#purchaseUnitPrice4Id").val(0);
		return false;
	} else {
		if (fact3 != "" && fact3 != 0) {
			var unitP2 = $("#purchaseUnitPrice2Id").val();
			factor3 = unitP2 / fact3;
			if (factor3 != "" || factor3 != 0) {
				$("#purchaseUnitPrice3Id").val(parseFloat(factor3).toFixed(2));
			} else {
				$("#purchaseUnitPrice3Id").val(0);
			}
		} else {
			$("#purchaseUnitPrice3Id").val(0);
		}
	}

}
/**
 * @author Rohit Sandbhor
 * @since 17-01-2020
 * @comment created this js function to calculate unit price related to factor 3
 */
function calculateUnitPrice3() {
	var fact2 = $("#purchaseUomFactor2Id").val();
	var fact3 = $("#purchaseUomFactor3Id").val();
	var factor3;
	var empty = "";
	if (fact2 == "" || fact2 == 0) {
		$("#purchaseUnitPrice2Id").val("");
		$("#purchaseUnitPrice3Id").val("");
		$("#purchaseUnitPrice4Id").val("");
		return false;
	} else {
		if (fact3 != "" && fact3 != 0) {
			var unitP2 = $("#purchaseUnitPrice2Id").val();
			factor3 = unitP2 / fact3;
			if (factor3 !== "" && factor3 !== 0) {
				$("#purchaseUnitPrice3Id").val(parseFloat(factor3).toFixed(2));
			} else {
				$("#purchaseUnitPrice3Id").val(0);
			}
		} else {
			$("#purchaseUnitPrice3Id").val(0);
		}
	}
	var fact3 = $("#purchaseUomFactor3Id").val();
	var fact4 = $("#purchaseUomFactor4Id").val();
	var factor4;
	var empty = "";
	if (fact3 == "" || fact3 == 0) {
		$("#purchaseUnitPrice3Id").val(0);
		$("#purchaseUnitPrice4Id").val(0);
		return false;
	} else {
		if (fact4 != "" && fact4 != 0) {
			var unitP3 = $("#purchaseUnitPrice3Id").val();
			factor4 = unitP3 / fact4;
			if (factor4 != "" || factor4 != 0) {
				$("#purchaseUnitPrice4Id").val(parseFloat(factor4).toFixed(2));
			} else {
				$("#purchaseUnitPrice4Id").val(0);
			}
		} else {
			$("#purchaseUnitPrice4Id").val(0);
		}
	}
}
/**
 * @author Rohit Sandbhor
 * @since 17-01-2020
 * @comment created this js function to calculate unit price related to factor 4
 */
function calculateUnitPrice4() {
	var fact2 = $("#purchaseUomFactor2Id").val();
	var fact3 = $("#purchaseUomFactor3Id").val();
	var factor3;
	var empty = "";
	if (fact2 == "" || fact2 == 0) {
		$("#purchaseUnitPrice2Id").val("");
		$("#purchaseUnitPrice3Id").val("");
		$("#purchaseUnitPrice4Id").val("");
		return false;
	} else {
		if (fact3 != "" && fact3 != 0) {
			var unitP2 = $("#purchaseUnitPrice2Id").val();
			factor3 = unitP2 / fact3;
			if (factor3 != "" || factor3 != 0) {
				$("#purchaseUnitPrice3Id").val(parseFloat(factor3).toFixed(2));
			} else {
				$("#purchaseUnitPrice3Id").val(0);
			}
		} else {
			$("#purchaseUnitPrice3Id").val(0);
		}
	}
	var fact3 = $("#purchaseUomFactor3Id").val();
	var fact4 = $("#purchaseUomFactor4Id").val();
	var factor4;
	var empty = "";
	if (fact3 == "" || fact3 == 0) {
		$("#purchaseUnitPrice3Id").val(0);
		$("#purchaseUnitPrice4Id").val(0);
		return false;
	} else {
		if (fact4 != "" && fact4 != 0) {
			var unitP3 = $("#purchaseUnitPrice3Id").val();
			factor4 = unitP3 / fact4;
			if (factor4 != "" || factor4 != 0) {
				$("#purchaseUnitPrice4Id").val(parseFloat(factor4).toFixed(2));
			} else {
				$("#purchaseUnitPrice4Id").val(0);
			}
		} else {
			$("#purchaseUnitPrice4Id").val(0);
		}
	}

}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @since : 17-01-2020
 * @comment : refresh item master
 ******************************************************************************/
function refreshItemMasterMaster() {
	$("#itemMasterId").val(0);
	$("#itemNameId").val("");
	$("#aliceNameId").val("");
	$("#formTypeId").val("");
	$("#hsnNameId").val("");
	$("#searchId11").val("");
	$("#statusId").val("");
	$("#cgstRateId").val("");
	$("#sgstRateId").val("");
	$("#taxNameId").val("");
	$("#taxRateId").val("");
	$("#companyNameId").val("");
	$("#batchWiseId").val("");
	$("#orderStockId").val("");
	$("#reorderStockId").val("");
	$("#maxStockId").val("");
	$("#purchaseStrategyId").val("");
	$("#priorityId").val("");
	$("#criticalityId").val("");
	$("#leadTimeId").val("");
	$("#leadTimeUnitId").val("");
	$("#wareHouseNameId").val("");
	$("#wareHouseLocationId").val("");
	$('#assetItemId').prop('checked', false);
	$('#reagentItemId').prop('checked', false);
	$('#laundryItemId').prop('checked', false);
	$('#cssdItemId').prop('checked', false);
	
	//clear purchase info details
	$("#purchaseUomFactor1Id").val("");
	$("#purchaseUomFactor2Id").val("");
	$("#purchaseUomFactor3Id").val("");
	$("#purchaseUomFactor4Id").val("");
	$("#purchaseFactorUom1Id").val("");
	$("#purchaseFactorUom2Id").val("");
	$("#purchaseFactorUom3Id").val("");
	$("#purchaseFactorUom4Id").val("");
	$("#purchaseUnitPrice1Id").val("");
	$("#purchaseUnitPrice2Id").val("");
	$("#purchaseUnitPrice3Id").val("");
	$("#purchaseUnitPrice4Id").val("");
	
	// maintenance slave details
	$("#warrantyWithProductDurationId").val("");
	$("#warrantyWithProductId").val("");
	$("#amccmcFreeTextDurationId").val("");
	$("#amccmcDurationId").val("");
	$("#preventiveMaintenanceFreeTextDurationId").val("");
	$("#preventiveMaintenanceDurationId").val("");
	
	$('#assetItemId').prop('checked', false);
	$('#labEquipmentId').prop('checked', false);
	$('#reagentItemId').prop('checked', false);
	$('#consumableItemId').prop('checked', false);

	var tableHeaderRowCount = 1;
	var table = document.getElementById('itemPurchaseMasterTableId');
	var rowCount = table.rows.length;
	for ( var i = tableHeaderRowCount; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount);
	}

	var tableHeaderRowCount1 = 1;
	var table1 = document.getElementById('itemVendorMasterTableId');
	var rowCount1 = table1.rows.length;
	for ( var i = tableHeaderRowCount1; i < rowCount1; i++) {
		table1.deleteRow(tableHeaderRowCount1);
	}
	
	var tableHeaderRowCountContractDetails = 1;
	var tableContractDetails = document.getElementById('itemContractDetailsTableId');
	var rowCountContractDetails = tableContractDetails.rows.length;
	for ( var i = tableHeaderRowCountContractDetails; i < rowCountContractDetails; i++) {
		tableContractDetails.deleteRow(tableHeaderRowCountContractDetails);
	}

}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 20-01-2020
 * @codeFor : validate it should be ID only
 ******************************************************************************/
function validateIDOnDocumentMaster() {
	var formId = $("#search_document_name").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(formId)) {
		alert("Please Enter Form ID Only!");
		$("#searchId").focus();
		return false;
	}
	getAllDocumentById(formId);

}

/**
 * @author : Rohit Sandbhor
 * @date : 20-01-2020
 * @codeFor : set finalcial year on financial year master
 */
function getAndSetFinancialYear() {
	var startDate = $('#startDateId').val();
	var arr = startDate.split('/');
	var startYear = parseInt(arr[2].trim());
	var endYear = startYear + 1;
	$('#financialYear').val(startYear + "/" + endYear);
	$('#endDateId').val("31/3/" + endYear);
}
/**
 * @since 21-01-2020
 * @Comment Created this js function to create the dynamic table for item vendor
 *          slave records
 * @Author Rohit Sandbhor
 */
function addRowsItemVendorNamesAndId() {
	var rows = $('#itemVendorMasterTableId tbody tr.newAddedParty').length;
	// calling the function
	addDynamicRecordsToVendorTableOnItemMaster(rows + 1);
}

/*******************************************************************************
 * @since 21-01-2020
 * @Comment Created this js function to create the dynamic table for item vendor
 *          slave records
 * @Author Rohit Sandbhor
 * @param id
 ******************************************************************************/
function addDynamicRecordsToVendorTableOnItemMaster(id) {
	var vendorName = $("#vendorNameId").val();
	var vendorId = $("#hiddenPartyIdOnItemMaster").val();
	var itemName = $("#itemNameId").val();
	var htm = "";
	var index = 1;
	htm = htm
			+ '<tr class="newAddedParty"> '
			+ ' <td class="col-md-1 center">'
			+ index
			+ '</td>'
			+ ' <td class="col-md-1 center" id="vendorNameId'
			+ id
			+ '">'
			+ vendorName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="vendorId'
			+ id
			+ '">'
			+ vendorId
			+ '</td>'
			+ ' <td class="col-md-1 center" style="display:none;"  id="itemNameOnVendor'
			+ id
			+ '">'
			+ itemName
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editPartyInfoItemMaster('+ id + ',\'fromUI\')><i class="fa fa-edit"></i></button></td>'
			
			+ ' <td class="col-md-1 center" id="partyItemInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="partyItemInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			
			+ '</tr>';
	$("#itemVendorMasterRecordList").append(htm);
	refreshItemVendorSlaveData();
}

/*******************************************************************************
 * @Since 28-01-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to reset the item purchase party form
 *          values
 ******************************************************************************/
function refreshItemVendorSlaveData() {
	$("#vendorNameId").val("");
	$("#hiddenPartyIdOnItemMaster").val(0);
}

/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 28-01-2020
 * @comment Below js code to show the records from item party slave table and
 *          showing it dynamically
 ******************************************************************************/
function setItemPartyDataToTable(r) {
	var htm = "";
	var index = 0;
	for ( var i = 0; i < r.lstItemPartySlave.length; i++) {
		index++;
		htm = htm
				+ '<tr class="newAddedParty"> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center" id="vendorNameId'
				+ index
				+ '">'
				+ r.lstItemPartySlave[i].partyName
				+ '</td>'
				+ ' <td class="col-md-1 center" id="vendorId'
				+ index
				+ '">'
				+ r.lstItemPartySlave[i].partyMasterId
				+ '</td>'
				+ ' <td class="col-md-1 center" style="display:none" id="itemNameOnVendor'
				+ index
				+ '">'
				+ r.lstItemPartySlave[i].itemMasterName
				+ '</td>'
				
				+ ' <td class="col-md-1 center" id="partyItemInfoId1'
				+ index
				+ '" style="display:none" >'
				+ index
				+ '</td>'
				
				+ ' <td class="col-md-1 center" id="partyItemInfoId'
				+ index
				+ '" style="display:none">'
				+ r.lstItemPartySlave[i].id
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editPartyInfoItemMaster('+ index + ',\'fromDB\')><i class="fa fa-edit"></i></button></td>'
				/*+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteItemPartySlave('
				+ r.lstItemPartySlave[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>'*/
				+ '</tr>';
	}
	$("#itemVendorMasterRecordList").html(htm);
};

/**
 * @since 29-01-2020
 * @comment below js function is created for to edit the item party slave
 *          details
 * @author Rohit Sandbhor
 * @param id
 */
function editItemPartySlave(id) {
	document.getElementById("updateRecordButtonPartyId").style.display = "block";
	document.getElementById("addRowsButtonPartyId").style.display = "none";
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryItemMaster/editItemPartySlave",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$('#vendorNameId').val(r.partyName);
			$('#hiddenPartyIdOnItemMaster').val(r.partyMasterId);
			$('#hiddenItemPartySlaveId').val(r.id);
			$('#hiddenItemMasterNameIdOnPartySlave').val(r.itemMasterName);

		}
	});
}

/*******************************************************************************
 * @Since 29-01-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to reset the item party slave form values
 ******************************************************************************/
function refreshItemPartySlaveData() {
	$("#vendorNameId").val("");
	$("#hiddenPartyIdOnItemMaster").val(0);
	$("#hiddenItemMasterNameIdOnPartySlave").val("");
	$("#hiddenItemPartySlaveId").val(0);
	return false;
}

/*******************************************************************************
 * @Since 12-02-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to close the item master pop up
 ******************************************************************************/
function closeItemMasterPopUp() {
	refreshItemMasterMaster();
	$("#itemMasterModal").modal('hide');
}
/**
 * 
 */
function setUOMFactorOneValue() {
	var UOMFactorOneValue = $("#purchaseFactorUom1Id option:selected").text();
	document.getElementById("uomFactorOneValueId").value = UOMFactorOneValue;
}
/**
 * 
 */
function setUOMFactorTwoValue() {
	var UOMFactorTwoValue = $("#purchaseFactorUom2Id option:selected").text();
	document.getElementById("uomFactorTwoValueId").value = UOMFactorTwoValue;
}
/**
 * 
 */
function setUOMFactorThreeValue() {
	var UOMFactorThreeValue = $("#purchaseFactorUom3Id option:selected").text();
	document.getElementById("uomFactorThreeValueId").value = UOMFactorThreeValue;
}
/**
 * 
 */
function setUOMFactorFourValue() {
	var UOMFactorFourValue = $("#purchaseFactorUom4Id option:selected").text();
	document.getElementById("uomFactorFourValueId").value = UOMFactorFourValue;
}

function checkPincodeLength(){
	var result="";
	var pincode=$("#pincodeFromAddress").val();
	if(pincode.length < 6) {		
		result=1;
		
	}else{
		result=2;
	}
	return result;
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : Add new row temp for MRN
 ******************************************************************************/
function addNewRowInTableByAddButton(tableId, callFrom) {

	var tbody = "";
	var rows = $('#' + tableId + ' tbody tr').length;

	if (callFrom == "MRN") {

		tbody = getMrnTableBodyString(rows + 1);
	} else if (callFrom == "addGenerateMRNRequest") {
		tbody = generateMrnRequestTableBodyByAddButtonGenerateMrn(rows + 1);
	} else if (callFrom == "addConsumptionRequest") {
		tbody = generateConsumptionRequestTableBodyByAddButtonConsumption(rows + 1);
	} else if (callFrom == "addGoodsIssueRequest") {
		tbody = generateGoodsIssueTableBody(rows + 1);
	} else if (callFrom == "GRN") {
		tbody = getGrnTableBodyString(rows + 1);
	} else if (callFrom == "GRNOnPlus") {
		tbody = getGrnTableBodyStringOnPlusButton(rows + 1);
	} else if (callFrom == "PurInv") {
		tbody = getPurInvTableBodyString(rows + 1);
	} else if (callFrom == "PurInvOnPlus") {
		tbody = getPurInvTableBodyStringOnPlusButton(rows + 1);
	} else if (callFrom == "addMrnReturnRequest") {
		tbody = addMrnReturnRequestByAddButtonStockReturn(rows + 1);
	} else if(callFrom == "purchaseorderonplus"){
		tbody = getPurchaseOrderItemInfoBodyByPlusButton(rows + 1);
	}else if(callFrom == "addAssetMaintenanceTableRow"){
		tbody = getAssetMaintetBodyByPlusButton(rows + 1);
	} else if(callFrom == "assetTicketSlaveTable"){
		tbody = assetTicketManagementSlaveTableByPlusButton(rows + 1);
	}
		
	$('#' + tableId).append(tbody);
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 18-03-2019
 * @codeFor :getAllUnitMaster Detail on Genate MRN Subinventory made changes select 2
 ******************************************************************************/
function getUOMTempGenerateMrn(selectId) {
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllUnitMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setUOMTempGenerateMrn(r, selectId);
		}
	});
}


/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 18-03-2019
 * @codeFor :setUOMTempGenerateMrn Detail on Genate MRN Subinventory made changes select 2
 ******************************************************************************/
function setUOMTempGenerateMrn(r, selectId) {
	var htm = "<option value='0'>--Select--</option>";
	for ( var i = 0; i < r.lstunitmaster.length; i++) {
		htm = htm + "<option value='" + r.lstunitmaster[i].uniId + "'>"
				+ r.lstunitmaster[i].unitName + "</option>";
	}
	$("#" + selectId).html(htm);
}

/**
 * 
 * @param id
 * @param callFrom
 */
function editPartyInfoItemMaster(id, callFrom) {
	var rows = $('#itemVendorMasterTableId tbody tr.newAddedParty').length;
	for ( var i = 1; i <= rows; i++) {
		var partyItemInfoId = $("#partyItemInfoId1" + i).text();
		var partyItemInfoIdAdd = $("#partyItemInfoId" + i).text();
		if (partyItemInfoId == id || partyItemInfoIdAdd == id) {
			$("#vendorNameId").val($("#vendorNameId" + i).html());
			$("#hiddenPartyIdOnItemMaster").val($("#vendorId" + i).html());
			
			$("#updateRecordButtonPartyId").attr('myid', partyItemInfoId);
			$("#addRowsButtonPartyId").hide();
			$("#updateRecordButtonPartyId").show();
			if (callFrom == "fromDB") {
				document.getElementById("addRowsButtonPartyId").style.display = "none";
				$("#updateRecordButtonPartyId").show();
			} else if (callFrom == "fromUI") {
				$("#updateRecordButtonPartyId").show();
				$("#addRowsButtonPartyId").hide();
			}

		}
	}
}

/**
 * 
 */
function updateItemPartySlave() {
	var rows = $('#itemVendorMasterTableId tbody tr.newAddedParty').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateRecordButtonPartyId").attr('myid');
		if (id == i) {
			$("#vendorNameId" + i).html($("#vendorNameId").val());
			$("#vendorId" + i).html($("#hiddenPartyIdOnItemMaster").val());
			
			document.getElementById("addRowsButtonPartyId").style.display = "block";
			$("#updateRecordButtonPartyId").hide();
		}
	}
	refreshItemPartySlaveData();
}

/**
 * 
 * @param id
 * @param callFrom
 */
function editPurchaseInfoItemMaster(id, callFrom) {
	var rows = $('#itemPurchaseMasterTableId tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var purchaseItemInfoId = $("#purchaseItemInfoId1" + i).text();
		var purchaseItemInfoIdAdd = $("#purchaseItemInfoId" + i).text();
		if (purchaseItemInfoId == id || purchaseItemInfoIdAdd == id) {
			//purchase cost
			if($("#purchaseUnitPriceOneId" + i).html() != 0 && $("#purchaseUnitPriceOneId" + i).html() != '0' && $("#purchaseUnitPriceOneId" + i).html() != 'null' && $("#purchaseUnitPriceOneId" + i).html() !=null){
				$("#purchaseUnitPrice1Id").val($("#purchaseUnitPriceOneId" + i).html());
			}else{
				$("#purchaseUnitPrice1Id").val("");
			}
			
			if($("#purchaseUnitPriceTwoId" + i).html() != 0 && $("#purchaseUnitPriceTwoId" + i).html() != '0' && $("#purchaseUnitPriceTwoId" + i).html()!=null && $("#purchaseUnitPriceTwoId" + i).html() !='null'){
				$("#purchaseUnitPrice2Id").val($("#purchaseUnitPriceTwoId" + i).html());
			}else{
				$("#purchaseUnitPrice2Id").val("");
			}
			
			if($("#purchaseUnitPriceThreeId" + i).html() != 0 && $("#purchaseUnitPriceThreeId" + i).html() != '0' && $("#purchaseUnitPriceThreeId" + i).html() != 'null' && $("#purchaseUnitPriceThreeId" + i).html()!=null){
				$("#purchaseUnitPrice3Id").val($("#purchaseUnitPriceThreeId" + i).html());
			}else{
				$("#purchaseUnitPrice3Id").val("");
			}
			
			if($("#purchaseUnitPriceFourId" + i).html() != 0 && $("#purchaseUnitPriceFourId" + i).html() != '0' && $("#purchaseUnitPriceFourId" + i).html() != 'null' && $("#purchaseUnitPriceFourId" + i).html() != null){
				$("#purchaseUnitPrice4Id").val($("#purchaseUnitPriceFourId" + i).html());
			}else{
				$("#purchaseUnitPrice4Id").val("");
			}
			/*$("#purchaseUnitPrice1Id").val($("#purchaseUnitPriceOneId" + i).html());
			$("#purchaseUnitPrice2Id").val($("#purchaseUnitPriceTwoId" + i).html());
			$("#purchaseUnitPrice3Id").val($("#purchaseUnitPriceThreeId" + i).html());
			$("#purchaseUnitPrice4Id").val($("#purchaseUnitPriceFourId" + i).html());*/
			//quantity
			if($("#purchaseUomFactorOneId" + i).html() != 0 && $("#purchaseUomFactorOneId" + i).html() != '0'){
				$("#purchaseUomFactor1Id").val($("#purchaseUomFactorOneId" + i).html());
			}else{
				$("#purchaseUomFactor1Id").val("");
			}
			
			if($("#purchaseUomFactorTwoId" + i).html() != 0 && $("#purchaseUomFactorTwoId" + i).html() != '0'){
				$("#purchaseUomFactor2Id").val($("#purchaseUomFactorTwoId" + i).html());
			}else{
				$("#purchaseUomFactor2Id").val("");
			}
			
			if($("#purchaseUomFactorThreeId" + i).html() != 0 && $("#purchaseUomFactorThreeId" + i).html() != '0'){
				$("#purchaseUomFactor3Id").val($("#purchaseUomFactorThreeId" + i).html());
			}else{
				$("#purchaseUomFactor3Id").val("");
			}
			
			if($("#purchaseUomFactorFourId" + i).html() != 0 && $("#purchaseUomFactorFourId" + i).html() != '0'){
				$("#purchaseUomFactor4Id").val($("#purchaseUomFactorFourId" + i).html());
			}else{
				$("#purchaseUomFactor4Id").val("");
			}
			/*$("#purchaseUomFactor1Id").val($("#purchaseUomFactorOneId" + i).html());
			$("#purchaseUomFactor2Id").val($("#purchaseUomFactorTwoId" + i).html());
			$("#purchaseUomFactor3Id").val($("#purchaseUomFactorThreeId" + i).html());
			$("#purchaseUomFactor4Id").val($("#purchaseUomFactorFourId" + i).html());*/
			//UOM

			if($("#purchaseFactorUomOneId" + i).html() != 0 && $("#purchaseFactorUomOneId" + i).html() != '0'){
				$("#purchaseFactorUom1Id").select2('val',$("#purchaseFactorUomOneId" + i).html());
			}else{
				$("#purchaseFactorUom1Id").select2('val',"0");
			}
			
			if($("#purchaseFactorUomTwoId" + i).html() != 0 && $("#purchaseFactorUomTwoId" + i).html() != '0'){
				$("#purchaseFactorUom2Id").select2('val',$("#purchaseFactorUomTwoId" + i).html());
			}else{
				$("#purchaseFactorUom2Id").select2('val',"0");
			}
			
			if($("#purchaseFactorUomThreeId" + i).html() != 0 && $("#purchaseFactorUomThreeId" + i).html() != '0'){
				$("#purchaseFactorUom3Id").select2('val',$("#purchaseFactorUomThreeId" + i).html());
			}else{
				$("#purchaseFactorUom3Id").select2('val',"0");
			}
			
			if($("#purchaseFactorUomFourId" + i).html() != 0 && $("#purchaseFactorUomFourId" + i).html() != '0'){
				$("#purchaseFactorUom4Id").select2('val',$("#purchaseFactorUomFourId" + i).html());
			}else{
				$("#purchaseFactorUom4Id").select2('val',"0");
			}
			/*$("#purchaseFactorUom1Id").select2('val',$("#purchaseFactorUomOneId" + id).html());
			$("#purchaseFactorUom2Id").select2('val',$("#purchaseFactorUomTwoId" + id).html());
			$("#purchaseFactorUom3Id").select2('val',$("#purchaseFactorUomThreeId" + id).html());
			$("#purchaseFactorUom4Id").select2('val',$("#purchaseFactorUomFourId" + id).html());*/
			
			//UOM Name
			$("#uomFactorOneValueId").val($("#unitOneNameId" + i).html());
			$("#uomFactorTwoValueId").val($("#unitTwoNameId" + i).html());
			$("#uomFactorThreeValueId").val($("#unitThreeNameId" + i).html());
			$("#uomFactorFourValueId").val($("#unitFourNameId" + i).html());
			
			
			$("#updateRecordButtonPurchaseId").attr('myid', purchaseItemInfoId);
			$("#addRowsButtonId").hide();
			$("#updateRecordButtonPurchaseId").show();
			if (callFrom == "fromDB") {
				document.getElementById("addRowsButtonId").style.display = "none";
				$("#updateRecordButtonPurchaseId").show();
			} else if (callFrom == "fromUI") {
				$("#updateRecordButtonPurchaseId").show();
				$("#addRowsButtonId").hide();
			}

		}
	}
}

/**
 * 
 */
function updateItemPurchaseSlave() {
	var rows = $('#itemPurchaseMasterTableId tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateRecordButtonPurchaseId").attr('myid');
		if (id == i) {
		
			var purchaseUomFactor1 = $("#purchaseUomFactor1Id").val();
			var purchaseUomFactor2 = $("#purchaseUomFactor2Id").val();
			var purchaseUomFactor3 = $("#purchaseUomFactor3Id").val();
			var purchaseUomFactor4 = $("#purchaseUomFactor4Id").val();
			var purchaseFactorUom1 = $("#purchaseFactorUom1Id").val();
			var purchaseFactorUom2 = $("#purchaseFactorUom2Id").val();
			var purchaseFactorUom3 = $("#purchaseFactorUom3Id").val();
			var purchaseFactorUom4 = $("#purchaseFactorUom4Id").val();
			var purchaseUnitPrice1 = $("#purchaseUnitPrice1Id").val();
			var purchaseUnitPrice2 = $("#purchaseUnitPrice2Id").val();
			var purchaseUnitPrice3 = $("#purchaseUnitPrice3Id").val();
			var purchaseUnitPrice4 = $("#purchaseUnitPrice4Id").val();
			if (purchaseUnitPrice1 == "") {
				purchaseUnitPrice1 = 0;
			}
			if (purchaseUnitPrice2 == "" || purchaseUnitPrice2 == null) {
				purchaseUnitPrice2 = 0;
			}
			if (purchaseUnitPrice3 == "" || purchaseUnitPrice3 == null) {
				purchaseUnitPrice3 = 0;
			}
			if (purchaseUnitPrice4 == "" || purchaseUnitPrice4 == null) {
				purchaseUnitPrice4 = 0;
			}

			if (purchaseUomFactor1 == "") {
				purchaseUomFactor1 = 0;
			}
			if (purchaseUomFactor2 == "") {
				purchaseUomFactor2 = 0;
			}
			if (purchaseUomFactor3 == "") {
				purchaseUomFactor3 = 0;
			}
			if (purchaseUomFactor4 == "") {
				purchaseUomFactor4 = 0;
			}
			if (purchaseFactorUom1 == "" || purchaseFactorUom1 == null) {
				purchaseFactorUom1 = 0;
			}
			if (purchaseFactorUom2 == "" || purchaseFactorUom2 == null) {
				purchaseFactorUom2 = 0;
			}
			if (purchaseFactorUom3 == "" || purchaseFactorUom3 == null) {
				purchaseFactorUom3 = 0;
			}
			if (purchaseFactorUom4 == "" || purchaseFactorUom4 == null) {
				purchaseFactorUom4 = 0;
			}
			if(purchaseUnitPrice1 != "" && purchaseUomFactor1 != "" && purchaseFactorUom1 == 0){
				alert("Kindly Select Respective UMO Unit For This Unit Price..!!");
				return false;
			}
			
			if(purchaseUnitPrice2 != "" && purchaseUomFactor2 != "" && purchaseFactorUom2 == 0){
				alert("Kindly Select Respective UMO Unit For This Unit Price..!!");
				return false;
			}
			
			if(purchaseUnitPrice3 != "" && purchaseUomFactor3 != "" && purchaseFactorUom3 == 0){
				alert("Kindly Select Respective UMO Unit For This Unit Price..!!");
				return false;
			}
			
			if(purchaseUnitPrice4 != "" && purchaseUomFactor4 != "" && purchaseFactorUom4 == 0){
				alert("Kindly Select Respective UMO Unit For This Unit Price..!!");
				return false;
			}
			//purchase cost
			$("#purchaseUnitPriceOneId" + i).html($("#purchaseUnitPrice1Id").val());
			$("#purchaseUnitPriceTwoId" + i).html($("#purchaseUnitPrice2Id").val());
			$("#purchaseUnitPriceThreeId" + i).html($("#purchaseUnitPrice3Id").val());
			$("#purchaseUnitPriceFourId" + i).html($("#purchaseUnitPrice4Id").val());
			//quantity
			$("#purchaseUomFactorOneId" + i).html($("#purchaseUomFactor1Id").val());
			$("#purchaseUomFactorTwoId" + i).html($("#purchaseUomFactor2Id").val());
			$("#purchaseUomFactorThreeId" + i).html($("#purchaseUomFactor3Id").val());
			$("#purchaseUomFactorFourId" + i).html($("#purchaseUomFactor4Id").val());
			//UOM
			$("#purchaseFactorUomOneId" + i).html($("#purchaseFactorUom1Id").val());
			$("#purchaseFactorUomTwoId" + i).html($("#purchaseFactorUom2Id").val());
			$("#purchaseFactorUomThreeId" + i).html($("#purchaseFactorUom3Id").val());
			$("#purchaseFactorUomFourId" + i).html($("#purchaseFactorUom4Id").val());
			//UOM Name
			$("#unitOneNameId" + i).html($("#uomFactorOneValueId").val());
			$("#unitTwoNameId" + i).html($("#uomFactorTwoValueId").val());
			$("#unitThreeNameId" + i).html($("#uomFactorThreeValueId").val());
			$("#unitFourNameId" + i).html($("#uomFactorFourValueId").val());
			
			
			document.getElementById("addRowsButtonId").style.display = "block";
			$("#updateRecordButtonPurchaseId").hide();
		}
	}
	refreshItemPurchaseSlaveData();
}

/**
 * 
 * @param date
 * @returns
 */
function getDateTime(date){
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	//datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	return datee;
}

function getNullDate(date){
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	if(year == "1970"){
		formattedDate = "NA";
	}
	return formattedDate;
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @since : 14-07-2020
 * @comment : to save the maintenance contract master details
 ******************************************************************************/
function saveMaintenanceContractMaster() {
	var maintenanceContractId = $("#maintenanceContractId").val();
	var maintenanceType = $("#maintenanceTypeId").val();
	
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	if (maintenanceTypeId == "" || maintenanceTypeId == null) {
		alert("Please Enter Maintenance Type..!");
		$("#maintenanceTypeId").focus();
		return false;
	}
	var inputs = [];

	inputs.push('id=' + maintenanceContractId);
	inputs.push('maintenanceType=' + maintenanceType);

	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/saveMaintenanceContractMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
				window.location.reload(true);
			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (r == 3) {
				alertify.error("Maintenence Type Not present");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			refreshMaintenanceContractMaster();
			getAllMaintenanceContractMasterRecords();
		}
	});
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @since : 14-07-2020
 * @Comment to get all maintainance contract master records 
 ******************************************************************************/
function getAllMaintenanceContractMasterRecords() {
	var unitId = $("#unitId").val();
		var inputs = [];
		inputs.push('unitId=' + unitId);
		var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/getAllMaintenanceContractMasterRecords",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setMaintenanceContractDataToTable(r);
		}
	});
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 14-07-2020
 * @comment to set maintenance contract master data to table
 * @param r
  ******************************************************************************/
function setMaintenanceContractDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstMaintenanceContractMasterDto.length; i++) {
		
		var createddate= new Date(r.lstMaintenanceContractMasterDto[i].createdDateTime).toLocaleDateString('en-GB');
		var createdTime=new Date(r.lstMaintenanceContractMasterDto[i].createdDateTime).toLocaleTimeString('en-GB');
		createdDate = createddate+" "+createdTime;
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ createdDate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstMaintenanceContractMasterDto[i].maintenanceType
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editMaintenanceContractMaster('
				+ r.lstMaintenanceContractMasterDto[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteMaintenanceContractMaster('
				+ r.lstMaintenanceContractMasterDto[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#maintenanceContractMasterDetails").html(htm);
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 14-07-2020
 * @codeFor : edit maintenance contract master detail
 ******************************************************************************/
function editMaintenanceContractMaster(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editMaintenanceContractMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#maintenanceContractId").val(r.id);
			$("#maintenanceTypeId").val(r.maintenanceType);
			toggleEntryDiv('divForEdit');
		}
	});
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 14-07-2020
 * @codeFor : refresh maintenance contract master detail
 ******************************************************************************/
function refreshMaintenanceContractMaster() {
	$('#maintenanceContractId').val("");
	$('#maintenanceTypeId').val("");
	return false;
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 14-07-2020
 * @codeFor : delete maintenance contract master detail
 ******************************************************************************/
function deleteMaintenanceContractMaster(id) {
	var r = confirm("Are You Sure You Want To Delete Maintenance Contract Details?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteMaintenanceContractMaster",
			data : {
				"id" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				window.location.reload(true);
				alertify.error(response);
				refreshMaintenanceContractMaster();
				getAllMaintenanceContractMasterRecords();
			}
		});
	}
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 03-08-2020
 * @codeFor : to set asset name check box under item master
 ******************************************************************************/
function setAssetNameCheckEnabled(){
	if($("#labEquipmentId").attr('checked', true)){
	$("#assetItemId").prop('checked', true);
	}else{
		$("#assetItemId").prop('checked', false);	
	}
}

/*******************************************************************************
 * @Since 08-06-2020
 * @author Rohit Sandbhor
 * @Comment below js function to perform autofill search operation on contract slave
 ******************************************************************************/
function setAutoPartyNameOnItemMasterContractDetails(partyMasterId) {
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
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryItemMaster/autoFillSearchOnPartySlave",
		cache : false,
		success : function(response) {
			if(response.partyMasterDto.length == 0){
				alertify.error("You Cannot Insert Other Supplier Name...!!!");
				document.getElementById('partyNameContractId').value = "";
			}
			var template = "";
			for ( var j = 0; j < response.partyMasterDto.length; j++) {
				var arrValue = response.partyMasterDto[j].id + "-"
						+ response.partyMasterDto[j].name;
				var idValue = response.partyMasterDto[j].id;
				var partyName = response.partyMasterDto[j].name;
				resultData.push({
					ID : idValue,
					Name : partyName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + partyName + '</a></li>';
			}
			setTimeout(function() {
				$("#searchPartySlaveDivId .typeahead").html(template);
				$("#searchPartySlaveDivId .typeahead").show();

				$("input#" + partyMasterId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});

			}, 500);
		}
	});

	function displayResult(item) {
		var res = item.text.split('-');
		var partyId = res[0];
		var id = item.value;
		document.getElementById("hiddenPartyIdOnItemMasterContractDetails").value = id;
		$("input#" + partyMasterId).val(partyId);
	}
}

/**
 * 
 */
function calculateContractProfit(){
	var rateContract = $("#rateContractId").val();
	var mrpContract = $("#mrpContractId").val();
	if(parseInt(mrpContract) < parseInt(rateContract)){
		alert("MRP value always greater then equal to rate value..!!");
		return false;
	}
	var profit = mrpContract - rateContract;
	$("#profitContractId").val(profit);
}

/*******************************************************************************
 * @since 09-06-2020
 * @comment created this function to get the row count of item contract details table
 * @Author Rohit Sandbhor
 ******************************************************************************/
function addRowsItemContractDetails() {
	var rows = $('#itemContractDetailsTableId tbody tr.newAddedContract').length;
	// calling the function
	addDynamicRecordsToContractDetailsTable(rows + 1);
}

/**
 * @since 09-06-2020
 * @Author Rohit Sandbhor 
 */
function addDynamicRecordsToContractDetailsTable(id) {
	var partyNameContract = $("#partyNameContractId").val();
	var rateContract = $("#rateContractId").val();
	var priorityContract = $("#priorityContractId").val();
	var mrpContract = $("#mrpContractId").val();
	var referenceNoContract = $("#referenceNoContractId").val();
	var profitContract = $("#profitContractId").val();
	var fromDateContract = $("#fromDateContractId").val();
	var toDateContract = $("#toDateContractId").val();
	var withContract ="";
	if ($('#withContractId').is(":checked"))
	{
		withContract = "ON";
		$('#withContractId').val("ON");
	}
	else{
		withContract = "OFF";
		$('#withContractId').val("OFF");
	}
	var partyMasterIdContract = $("#hiddenPartyIdOnItemMasterContractDetails").val();
	var htm = "";
	htm = htm
			+ '<tr class="newAddedContract"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="partyNameContractId'
			+ id
			+ '">'
			+ partyNameContract
			+ '</td>'
			+ ' <td class="col-md-1 center" id="rateContractId'
			+ id
			+ '">'
			+ rateContract
			+ '</td>'
			+ ' <td class="col-md-1 center" id="mrpContractId'
			+ id
			+ '">'
			+ mrpContract
			+ '</td>'
			+ ' <td class="col-md-1 center" id="fromDateContractId'
			+ id
			+ '">'
			+ fromDateContract
			+ '</td>'
			+ ' <td class="col-md-1 center" id="toDateContractId'
			+ id
			+ '">'
			+ toDateContract
			+ '</td>'
			+ ' <td class="col-md-1 center" id="priorityContractId'
			+ id
			+ '" style="display:none">'
			+ priorityContract
			+ '</td>'
			+ ' <td class="col-md-1 center" id="referenceNoContractId'
			+ id
			+ '" style="display:none" >'
			+ referenceNoContract
			+ '</td>'
			+ ' <td class="col-md-1 center" id="profitContractId'
			+ id
			+ '" style="display:none" >'
			+ profitContract
			+ '</td>'
			+ ' <td class="col-md-1 center" id="withContractId'
			+ id
			+ '" style="display:none" >'
			+ withContract
			+ '</td>'
			+ ' <td class="col-md-1 center" id="partyMasterIdContractId'
			+ id
			+ '" style="display:none" >'
			+ partyMasterIdContract
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contractSlaveId'
			+ id
			+ '" style="display:none" >'
			+ 0
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contractSlaveTempId'
			+ id
			+ '" style="display:none">'
			+ id
			+ '</td>'
			
			// test1
			+ ' <td class="col-md-1 center"><input type="hidden" id="editGeneralPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editContractSlaveItemMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id="deleteGeneralPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteGeneral\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#itemContractDetailsRecordList").append(htm);
	refreshItemContractDetailsData();
}
/*******************************************************************************
 * @Since 08-06-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to get the warehouse slave details by using item master id
 ******************************************************************************/
function getContractDetailsByItemMasterId(id) {
	document.getElementById("browseDocumentHeaderId").style.display = "table-cell";
	document.getElementById("viewDocumentHeaderId").style.display = "table-cell";
	document.getElementById("uploadDocumentHeaderId").style.display = "table-cell";
	document.getElementById("uploadDocumentInfoId").style.display = "none";
	var inputs = [];
	inputs.push('masterId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
			async : true,
			type : 'GET',
			data : str + "&reqType=AJAX",
			url : 'ehat/inventoryItemMaster/getItemContractSlaveRecord',
			timeout : 1000 * 60 * 5,
			catche : false,
			success : function(r) {
				setItemContactDataToTable(r);
			}
		});
}
/*******************************************************************************
 * @author Rohit Sandbhor
 * @since 10-06-2020
 * @comment Below js code to show the records from item contact slave table and showing it dynamically
 ******************************************************************************/
function setItemContactDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstItemContractSlave.length; i++) {
		htm = htm
		+ '<tr class="newAddedContract"> '
		+ ' <td class="col-md-1 center">'
		+ index
		+ '</td>'
		+ ' <td class="col-md-1 center" id="partyNameContractId'
		+ index
		+ '">'
		+ r.lstItemContractSlave[i].partyNameContract
		+ '</td>'
		+ ' <td class="col-md-1 center" id="rateContractId'
		+ index
		+ '">'
		+ r.lstItemContractSlave[i].rateValue
		+ '</td>'
		+ ' <td class="col-md-1 center" id="mrpContractId'
		+ index
		+ '">'
		+ r.lstItemContractSlave[i].mrpValue
		+ '</td>'
		+ ' <td class="col-md-1 center" id="fromDateContractId'
		+ index
		+ '">'
		+ r.lstItemContractSlave[i].fromDate
		+ '</td>'
		+ ' <td class="col-md-1 center" id="toDateContractId'
		+ index
		+ '">'
		+ r.lstItemContractSlave[i].toDate
		+ '</td>'
		+ ' <td class="col-md-1 center" id="priorityContractId'
		+ index
		+ '" style="display:none">'
		+ r.lstItemContractSlave[i].priorityContract
		+ '</td>'
		+ ' <td class="col-md-1 center" id="referenceNoContractId'
		+ index
		+ '" style="display:none" >'
		+ r.lstItemContractSlave[i].referenceNo
		+ '</td>'
		+ ' <td class="col-md-1 center" id="profitContractId'
		+ index
		+ '" style="display:none" >'
		+ r.lstItemContractSlave[i].profitValue
		+ '</td>'
		+ ' <td class="col-md-1 center" id="withContractId'
		+ index
		+ '" style="display:none" >'
		+ r.lstItemContractSlave[i].withContract
		+ '</td>'
		+ ' <td class="col-md-1 center" id="partyMasterIdContractId'
		+ index
		+ '" style="display:none" >'
		+ r.lstItemContractSlave[i].partyMasterIdContact
		+ '</td>'
		+ ' <td class="col-md-1 center" id="contractSlaveId'
		+ index
		+ '" style="display:none" >'
		+ r.lstItemContractSlave[i].id
		+ '</td>'
		+ ' <td class="col-md-1 center" id="contractSlaveTempId'
		+ index
		+ '" style="display:none">'
		+ index
		+ '</td>'
		
		//browse document
		+ ' <td class="col-md-1 center"><input type="file" name="browseContractDocument" id="browseDocumentContractDetails'
		+ index
		+ '"><label class="custom-file-label" for="inputGroupFile04">Choose file</label></td>'
		
		//view document
		+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-warning" value='+r.lstItemContractSlave[i].uploadDocumentName+' onclick="viewDocumentContractDetails(this.value,'+index+')" id="viewDocumentContractDetails'
		+ index
		+ '"><i class="fa fa-eye"></i></button></td>'
		
		
		//upload document
		+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-info" onclick="uploadDocumentContractDetails('+index+')" id="uploadDocumentContractDetails'
		+ index
		+ '"><i class="fa fa-upload"></i></button></td>'
		
		// test1
		+ ' <td class="col-md-1 center"><input type="hidden" id="editGeneralPartMaster'
		+ index
		+ '" value="'
		+ index
		+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editContractSlaveItemMaster('
		+ index
		+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id="deleteGeneralPartMaster'
		+ index + '" onclick="deletePartyMasterSlave(' + index
		+ ',\'deleteGeneral\')" '
		+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;
	}
	$("#itemContractDetailsRecordList").html(htm);
};
/*******************************************************************************
 * @Since 10-06-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to edit contract slave item master
 ******************************************************************************/
function editContractSlaveItemMaster(id, callFrom) {
	var rows = $('#itemContractDetailsTableId tbody tr.newAddedContract').length;
	for ( var i = 1; i <= rows; i++) {
		var contractSlaveTempId = $("#contractSlaveTempId" + i).text();
		var contractSlaveId = $("#contractSlaveId" + i).text();
		if (contractSlaveTempId == id || contractSlaveId == id) {
			$("#hiddenContractSlaveId").val($("#contractSlaveId" + i).html());
			$("#partyNameContractId").val($("#partyNameContractId" + i).html());
			$("#hiddenPartyIdOnItemMasterContractDetails").val($("#partyMasterIdContractId" + i).html());
			$("#rateContractId").val($("#rateContractId" + i).html());
			$("#mrpContractId").val($("#mrpContractId" + i).html());
			$("#fromDateContractId").val($("#fromDateContractId" + i).html());
			$("#toDateContractId").val($("#toDateContractId" + i).html());
			$("#priorityContractId").val($("#priorityContractId" + i).html());
			$("#referenceNoContractId").val($("#referenceNoContractId" + i).html());
			$("#profitContractId").val($("#profitContractId" + i).html());
			
			if($("#withContractId" + i).html() !="OFF"){
				$("#withContractId").prop("checked", true);
				$("#withContractId").val("ON");
			}else{
				$("#withContractId").prop("checked", false);
				$("#withContractId").val("OFF");
			}
			
			$("#updateContractInfo").attr('myid', contractSlaveTempId);
			$("#addRowsButtonContractId").hide();
			$("#updateContractInfo").show();
			if (callFrom == "fromDB") {
				document.getElementById("addRowsButtonContractId").style.display = "none";
				$("#updateContractInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateContractInfo").show();
				$("#addRowsButtonContractId").hide();
			}

		}
	}
}

/*******************************************************************************
 * @Since 10-06-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to update contract info item master
 ******************************************************************************/
function updateContractInfoItemMaster() {
	var rows = $('#itemContractDetailsTableId tbody tr.newAddedContract').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateContractInfo").attr('myid');
		if (id == i) {
			$("#contractSlaveId" + i).html($("#hiddenContractSlaveId").val());
			$("#partyNameContractId" + i).html($("#partyNameContractId").val());
			$("#partyMasterIdContractId" + i).html($("#hiddenPartyIdOnItemMasterContractDetails").val());
			$("#rateContractId" + i).html($("#rateContractId").val());
			$("#mrpContractId" + i).html($("#mrpContractId").val());
			$("#fromDateContractId" + i).html($("#fromDateContractId").val());
			$("#toDateContractId" + i).html($("#toDateContractId").val());
			$("#priorityContractId" + i).html($("#priorityContractId").val());
			$("#referenceNoContractId" + i).html($("#referenceNoContractId").val());
			$("#profitContractId" + i).html($("#profitContractId").val());
			
			if ($('#withContractId').is(":checked")) {
				withContract = "ON";
				$('#withContractId').val("ON");
				$("#withContractId" + i).html($("#withContractId").val());
			}else{
				withContract = "OFF";
				$('#withContractId').val("OFF");
				$("#withContractId" + i).html($("#withContractId").val());
			}
			document.getElementById("addRowsButtonContractId").style.display = "block";
			$("#updateContractInfo").hide();
		}
	}
	refreshItemContractDetailsData();
}

/*******************************************************************************
 * @Since 12-06-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to get the maintenance slave details by using item master id
 ******************************************************************************/
function getMaintenanceDetailsByItemMasterId(id) {
	var inputs = [];
	inputs.push('masterId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
				async : true,
				type : 'GET',
				data : str + "&reqType=AJAX",
				url : 'ehat/inventoryItemMaster/getMaintenanceDetailsByItemMasterId',
				timeout : 1000 * 60 * 5,
				catche : false,
				success : function(r) {
					if(r.maintenanceId == null){
						document.getElementById("hiddenMaintenanceId").value = 0;
					}
					else{
					document.getElementById("hiddenMaintenanceId").value = r.maintenanceId;
					document.getElementById("warrantyWithProductId").value = r.warrantyWithProduct;
					document.getElementById("warrantyWithProductDurationId").value = r.warrantyWithProductDuration;
					document.getElementById("amccmcFreeTextDurationId").value = r.amccmcFreeTextDuration;
					document.getElementById("amccmcDurationId").value = r.amccmcDuration;
					document.getElementById("preventiveMaintenanceFreeTextDurationId").value = r.preventiveMaintenanceFreeTextDuration;
					document.getElementById("preventiveMaintenanceDurationId").value = r.preventiveMaintenanceDuration;
					}

				}
			});
}

/*******************************************************************************
 * @Since 19-06-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to upload the contract related document
 ******************************************************************************/
function uploadDocumentContractDetails(index){
	var form = $("#contractTableFormId")[0];
	 if($("#browseDocumentContractDetails"+index).val()==""){
		    alert("Please select file");
		    return false;
		}
	var contractSlaveId = $("#contractSlaveId"+index).html();
	var uploadContractDocument=getFileValue('browseDocumentContractDetails'+index);
	var data = new FormData(form);
	data.append("contractSlaveId",contractSlaveId);
	data.append("uploadContractDocument",uploadContractDocument);
	jQuery.ajax({
		async : true,
		type : "POST",
		data : data,
		enctype: 'multipart/form-data',
		url : "ehat/inventoryItemMaster/uploadDocumentContractDetails",
		cache : false,
		processData: false,
        contentType: false,
		success : function(r) {
			alertify.success(r);
			document.getElementById("viewDocumentContractDetails1").value = uploadContractDocument;
		}
	});
	
	
}
/*******************************************************************************
 * @Since 19-06-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to get the uploaded file actual name
 ******************************************************************************/
function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}

/*******************************************************************************
 * @Since 19-06-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to view the contract related document
 ******************************************************************************/
function viewDocumentContractDetails(document,index){
	if(document == null || document =="" || document ==undefined || document == 'null'){
		alert("No File To View...!!First Upload And Save The Document");
		return false;
	}else{
		var contractSlaveId = $("#contractSlaveId"+index).html();
		$('#ViewDocumemnt').attr("src","");
		$('#ViewDocumemnt').attr("src","ehat/inventoryItemMaster/readDocuments?contractSlaveId="+contractSlaveId+"&fileName="+document);
		$('#viewDocModal').modal('show');
	}

}
/*******************************************************************************
 * @Since 19-06-2020
 * @author Rohit Sandbhor
 * @Comment created this js function to refresh item contract details fields
 ******************************************************************************/
function refreshItemContractDetailsData() {
	$("#partyNameContractId").val("");
	$("#rateContractId").val("");
	$("#priorityContractId").val("");
	$("#mrpContractId").val("");
	$("#referenceNoContractId").val("");
	$("#profitContractId").val("");
	$("#fromDateContractId").val("");
	$("#toDateContractId").val("");
	$("#withContractId").val("");
	
}

/**
 * @since 14-12-2020
 * @comment delete item purchase slave details w.r.t item master id
 * @author Rohit Sandbhor
 * @param id
 */
function deleteItemPurchaseSlave(id,itemMasterId){
	var r = confirm("Are You Sure You Want To Delete Purchase Slave Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryItemMaster/deleteItemPurchaseSlaveNew",
			data : {
				"id" : id,
				"itemMasterId" : itemMasterId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				showItemPurchaseMasterDetails(itemMasterId);
			}
		});
	}
}

//added by vishant set cssd and machine status (hide show)

function setCssdOption()
{
	if($('#cssdItemId').is(":checked"))
		{
		/*$('#cssdOptions').css("");*/
		$("#cssdOptions").css("display", "block");
		}
	else
		{
			$("#cssdOptions").css("display", "none");
			//$("[name=CSSDItem]").prop("checked", false);
			
		}
	
}	
function checkCheckbox(id)
{
	if(id=="chkLaundryItem")
		{
			$("#chkCssdItem").prop("checked",false);
			setCssdOption();
		}
	else{
		$("#chkLaundryItem").prop("checked",false);
	}
}

function editCssdItemCheck(id)
{
	if(id=="CI")
		{
			$("#cssd1").prop("checked",true);
			//setCssdOption();
		}
	else {
		$("#cssd2").prop("checked",true);
	}
}
