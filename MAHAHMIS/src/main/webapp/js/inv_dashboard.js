// this is for add inventroy dashboard by Vishnu

function getItemStockBelowMinimumInQty() {

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/invDashboard/getItemStockBelowMinimumInQty",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(response) {

			var htm = "";
			var index = 0;
			var count = 1;
			if (response.lstDashboardDto != null
					&& response.lstDashboardDto != "") {
				for ( var i = 0; i < response.lstDashboardDto.length; i++) {
					htm = htm + '<tr> ' + ' <td class="col-md-1 center">'
							+ count + '</td>' + ' <td class="col-md-3 center">'
							+ response.lstDashboardDto[i].id + '</td>' +

							' <td class="col-md-3 center">'
							+ response.lstDashboardDto[i].itemName + '</td>'
							+ ' <td class="col-md-3 center">'
							+ response.lstDashboardDto[i].categoryName
							+ '</td>' + ' <td class="col-md-3 center">'
							+ response.lstDashboardDto[i].minQty + '</td>' +
							/*
							 * ' <td class="col-md-3 center">' +
							 * response.lstDashboardDto[i].batchNo + '</td>' + '
							 * <td class="col-md-3 center">' +
							 * response.lstDashboardDto[i].batchExpiryDate + '</td>' +
							 */
							' <td class="col-md-3 center">'
							+ response.lstDashboardDto[i].itemQuantity + '  '
							+ response.lstDashboardDto[i].itemUOMName
							+ '</td> </tr>';
					index++;
					count++;
				}
			}
			$("#itemStockBelowInQtyTotal").html(
					"Item Stock Below-in-Quantity (" + index + ") ");
			$("#itemStockBelowInQty").html(htm);
		}
	});
}

function getProductExpired() {

	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/invDashboard/getProductExpired",
				error : function() {
					alert('Network Issue..!!');
				},
				success : function(response) {
					var htm = "";
					var index = 0;
					var count = 1;
					if (response.lstDashboardDto != null
							&& response.lstDashboardDto != "") {
						for ( var i = 0; i < response.lstDashboardDto.length; i++) {
							var expirayDate = getDateWithoutTime(response.lstDashboardDto[i].batchExpiryDate);
							if (expirayDate == "1970-01-01") {
								expirayDate = "NA";
							}
							htm = htm + '<tr> '
									+ ' <td class="col-md-1 center">' + count
									+ '</td>' + ' <td class="col-md-3 center">'
									+ response.lstDashboardDto[i].id + '</td>' +

									' <td class="col-md-3 center">'
									+ response.lstDashboardDto[i].itemName
									+ '</td>' + ' <td class="col-md-3 center">';
							if (response.lstDashboardDto[i].subInventoryName != null) {
								htm = htm
										+ response.lstDashboardDto[i].subInventoryName;
							} else {
								htm = htm + 'Main Store';
							}
							htm = htm + '</td>'
									+ ' <td class="col-md-3 center">'
									+ response.lstDashboardDto[i].batchNo
									+ '</td>' + ' <td class="col-md-3 center">'
									+ expirayDate + '</td>';
							htm = htm + ' <td class="col-md-3 center">'
							if (response.lstDashboardDto[i].subInventoryName != null) {
								htm = htm + response.lstDashboardDto[i].itemQuantity
									+ '  '
									+ response.lstDashboardDto[i].itemUOMName;
							}else{
								htm = htm + response.lstDashboardDto[i].itemQuantity
								+ '  '
								+ response.lstDashboardDto[i].itemUOMName;
							}	
							htm = htm +'</td></tr>';
							index++;
							count++;

						}
					}
					$("#productExpiredTotal").html(
							"Product Expired (" + index + ") ");
					$("#invProductExpired").html(htm);
				}
			});
}

function getProductNearExpiry() {

	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/invDashboard/getProductNearExpiry",
				error : function() {
					alert('Network Issue..!!');
				},
				success : function(response) {
					var htm = "";
					var index = 0;
					var count = 1;
					if (response.lstDashboardDto != null
							&& response.lstDashboardDto != "") {
						for ( var i = 0; i < response.lstDashboardDto.length; i++) {
							
							var expirayDate = new Date(response.lstDashboardDto[i].batchExpiryDate).toLocaleDateString('en-GB');
							if (expirayDate == "1970-01-01") {
								expirayDate = "NA";
							}
							htm = htm + '<tr> '
									+ ' <td class="col-md-1 center">' + count
									+ '</td>' + ' <td class="col-md-3 center">'
									+ response.lstDashboardDto[i].id + '</td>' +

									' <td class="col-md-3 center">'
									+ response.lstDashboardDto[i].itemName
									+ '</td>' + ' <td class="col-md-3 center">';
							if (response.lstDashboardDto[i].subInventoryName != null) {
								htm = htm
										+ response.lstDashboardDto[i].subInventoryName;
							} else {
								htm = htm + 'Main Store';
							}
							htm = htm + '</td>'
									+ ' <td class="col-md-3 center">'
									+ response.lstDashboardDto[i].batchNo
									+ '</td>' + ' <td class="col-md-3 center">'
									+ expirayDate + '</td>'
									+ ' <td class="col-md-3 center">'
									+ response.lstDashboardDto[i].daysLeftBig
									+ '</td>' + ' <td class="col-md-3 center">';
							if (response.lstDashboardDto[i].subInventoryName != null) {
							htm = htm	+ response.lstDashboardDto[i].itemQuantity
									+ '  '
									+ response.lstDashboardDto[i].itemUOMName;
							}else{
							htm = htm	+ response.lstDashboardDto[i].itemQuantity
								+ '  '
								+ response.lstDashboardDto[i].itemUOMName;
							}
									
							htm = htm + '</td> </tr>';
							index++;
							count++;

						}
					}
					$("#productNearExpiryTotal").html(
							"Product Near Expiry (" + index + ") ");
					$("#invProductNearExpiry").html(htm);
				}
			});
}

function getTodayIndent() {

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/invDashboard/getTodayIndent",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(response) {
			var htm = "";
			var index = 0;
			var count = 1;
			if (response.lstmrnmaster != null && response.lstmrnmaster != "") {
				for ( var i = 0; i < response.lstmrnmaster.length; i++) {
					var mrnDate = new Date(response.lstmrnmaster[i].mrnDate).toLocaleDateString('en-GB');
					htm = htm + '<tr> ' + ' <td class="col-md-1 center">'
							+ count + '</td>' + ' <td class="col-md-3 center">'
							+ response.lstmrnmaster[i].mrnId + '</td>' +

							' <td class="col-md-3 center">'
							+ response.lstmrnmaster[i].mrnSubinventoryName
							+ '</td>' + ' <td class="col-md-3 center">'
							+ mrnDate + '</td></tr>';
					index++;
					count++;

				}
			}
			$("#todayIndentTotal").html("Today Indent (" + index + ") ");
			$("#invTodayIndent").html(htm);
		}
	});
}

function getInProgressIndent() {

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/invDashboard/getInProgressIndent",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(response) {
			var htm = "";
			var index = 0;
			var count = 1;
			if (response.lstmrnmaster != null && response.lstmrnmaster != "") {
				for ( var i = 0; i < response.lstmrnmaster.length; i++) {
					htm = htm + '<tr> ' + ' <td class="col-md-1 center">'
							+ count + '</td>' + ' <td class="col-md-3 center">'
							+ response.lstmrnmaster[i].mrnId + '</td>' +

							' <td class="col-md-3 center">'
							+ response.lstmrnmaster[i].mrnSubinventoryName
							+ '</td>' + ' <td class="col-md-3 center">'
							+ response.lstmrnmaster[i].mrnDate + '</td></tr>';
					index++;
					count++;

				}
			}
			$("#inProgressIndentTotal").html(
					"In-progress Indent (" + index + ") ");
			$("#invInProgressIndent").html(htm);
		}
	});
}

function getPendingIndent() {

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/invDashboard/getPendingIndent",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(response) {
			var htm = "";
			var index = 0;
			var count = 1;
			if (response.lstmrnmaster != null && response.lstmrnmaster != "") {
				for ( var i = 0; i < response.lstmrnmaster.length; i++) {
					var mrnDate = new Date(response.lstmrnmaster[i].mrnDate).toLocaleDateString('en-GB');
					htm = htm + '<tr> ' + ' <td class="col-md-1 center">'
							+ count + '</td>' + ' <td class="col-md-3 center">'
							+ response.lstmrnmaster[i].mrnId + '</td>'
							+ ' <td class="col-md-3 center">'
							+ response.lstmrnmaster[i].mrnSubinventoryName
							+ '</td>' + ' <td class="col-md-3 center">'
							+ mrnDate + '</td></tr>';
					index++;
					count++;

				}
			}
			$("#pendingIndentTotal").html("Pending Indent (" + index + ") ");
			$("#invPendingIndent").html(htm);
		}
	});
}

function fetchItemMasterDetails() {
	var selection = $("#searchItemMasterId").val().toLowerCase();
	$("#itemStockQty tbody tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(selection) > -1);
	});
}
function getDateWithoutTime(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	return datee;
}
