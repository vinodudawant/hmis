-setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function splitContent(content) {

	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenId').val(arr[1]);
		}
	} else {
		$('#hiddenId').val(0);
	}
}

function resetDrugValues() {
	$('#drugMasterForm').find('input:text').val('');
	$('#drugMasterForm').find('input:hidden').val('');
	$('#drugMasterForm').find('input:radio').prop('checked', false);
	$('#searchBox').val('');
}

function searchDrug(drugId) {
	resetDrugValues();
	
	var inputs = [];
	inputs.push('drugId=' + drugId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/drug/getDrugById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r=="")
			{
			alert("Record not found!");
			}
			$("#hiddenId").val('');
			setTableContent(r);
		}
	});
}

function editDrug(drugId) {

	$('#txtDrugId').val($('#drugId' + drugId).val());
	$('#txtDrugName').val($('#drugName' + drugId).val());
	$('#txtTheraupticUse').val($('#drugTheraupticUse' + drugId).val());
	$('radioDiscount').val($('#drugDisc' + drugId).val());
	$('radioScheduled').val($('#drugBillingMust' + drugId).val());
	$('radioBilling').val($('#drugScheduleH1' + drugId).val());
	$('radioStock').val($('#drugStockHold' + drugId).val());

	if ($('#drugDisc' + drugId).val() == '1') {
		$('#radioDiscountYes').prop('checked', true);
	} else {
		$('#radioDiscountNo').prop('checked', true);
	}

	if ($('#drugBillingMust' + drugId).val() == '1') {
		$('#radioBillingYes').prop('checked', true);
	} else {
		$('#radioBillingNo').prop('checked', true);
	}

	if ($('#drugScheduleH1' + drugId).val() == '1') {
		$('#radioScheduledYes').prop('checked', true);
	} else {
		$('#radioScheduledNo').prop('checked', true);
	}

	if ($('#drugStockHold' + drugId).val() == '1') {
		$('#radioStockYes').prop('checked', true);
	} else {
		$('#radioStockNo').prop('checked', true);
	}
	
	$('#txtTheraupticUse').prop('focus', true);
	
}

function deleteDrug(drugId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");

		var inputs = [];
		inputs.push('drugId=' + drugId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/drug/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						/* getDoctorsList(); */
						if (r == true) {
							/*$('#resultDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");
							hideResultDiv();
							location.reload();*/
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
						window.location.href = "view";
					}
				});

		return true;
	} else {

	}
}

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr> <td class='col-md-1'>"
				+ (i + 1)
				+ " <input type='hidden' id='drugId"
				+ r[i].drugId
				+ "' value='"
				+ r[i].drugId
				+ "'></td> <td class='col-md-2'>"
				+ r[i].drugName
				+ "<input type='hidden' id='drugName"
				+ r[i].drugId
				+ "' value='"
				+ r[i].drugName
				+ "'></td> "

				+ "<td class='col-md-2'>"
				+ r[i].drugTheraupticUse
				+ "<input type='hidden' id='drugTheraupticUse"
				+ r[i].drugId
				+ "' value='"
				+ r[i].drugTheraupticUse
				+ "'></td> "

				+ "<td class='col-md-2' style='display: none;'>"
				+ r[i].drugDisc
				+ "<input type='hidden' id='drugDisc"
				+ r[i].drugId
				+ "' value='"
				+ r[i].drugDisc
				+ "'></td> "

				+ "<td class='col-md-2 ' style='display:none;'>"
				+ r[i].drugBillingMust
				+ "<input type='hidden' id='drugBillingMust"
				+ r[i].drugId
				+ "' value='"
				+ r[i].drugBillingMust
				+ "'></td> "

				+ "<td class='col-md-2 ' style='display:none;'>"
				+ r[i].drugScheduleH1
				+ "<input type='hidden' id='drugScheduleH1"
				+ r[i].drugId
				+ "' value='"
				+ r[i].drugScheduleH1
				+ "'></td> "

				+ "<td class='col-md-2 ' style='display:none;'>"
				+ r[i].drugStockHold
				+ "<input type='hidden' id='drugStockHold"
				+ r[i].drugId
				+ "' value='"
				+ r[i].drugStockHold
				+ "'></td> "

				+ "<td class='col-md-1 '> <button id='btnEdit"
				+ r[i].drugId
				+ "' class='btn btn-xs btn-success' onclick='editDrug("
				+ r[i].drugId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteDrug("
				+ r[i].drugId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divDrugList').html(divContent);
}
