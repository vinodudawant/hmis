setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function splitCashReceiptEntryContent(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox1').val(arr[0]);
		if (arr.length > 1) {
			$('#patientId').val(arr[1]);
			$('#txtAddress1').val(arr[2]);
			$('#txtPhone').val(arr[3]);

		}

	} else {
		$('#patientId').val(0);
	}
}

function splitCash(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#patientIdSearch').val(arr[1]);

		}

	} else {
		$('#patientIdSearch').val(0);
	}
}

function editCashReceiptSale(cashReceiptSaleId) {
	
	$('#patientId').val($('#patientId' + cashReceiptSaleId).val());
	$('#cashReceiptSaleId').val($('#cashReceiptSaleId' + cashReceiptSaleId).val());
	$('#txtVouNo').val($('#DocId' + cashReceiptSaleId).val());
	$('#searchBox1').val($('#PatientName' + cashReceiptSaleId).val());
	$('#txtAddress1').val($('#patientAddress' + cashReceiptSaleId).val());
	$('#txtPhone').val($('#PatientPhon' + cashReceiptSaleId).val());
	$('#txtVouDate').val($('#cashReceiptSalesDate' + cashReceiptSaleId).val());
	$('#txtAmount').val($('#cashReceiptAmt' + cashReceiptSaleId).val());
	$('#txtNarration').val($('#cashReceiptSaleNarration' + cashReceiptSaleId).val());
	$('#txtNameMadeBY').val($('#cashReceiptSaleMadeBy' + cashReceiptSaleId).val());

}
function deleteCashReceiptSale(cashId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");

	
		setTimeout(
				function() {
					var inputs = [];
					inputs.push('cashReceiptSaleId=' + cashId);

					var str = inputs.join('&');
					jQuery
							.ajax({
								async : true,
								type : "GET",
								data : str + "&reqType=AJAX",
								url : "/EhatEnterprise/pharmacy/cashReceiptPatientSale/delete",
								timeout : 1000 * 60 * 5,
								catche : false,
								error : function() {
									alert("error");
								},
								success : function(r) {
									//getCashList();
									if (r == true) {
									/*	$('#msgDiv')
												.html(
														"<div class='alert alert-success' >Record deleted successfully..!</div>");*/
									} else {
										$('#msgDiv')
												.html(
														"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
									}
									window.location.href = "view";
								}
							});
				}, 500);

	} else {
		return false;
	}

}
function getCashList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/cashReceiptPatientSale/cashReceiptList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			setTableContent(r);
		}
	});

	return true;
}

function resetCashValues() {
	$('#CashReceiptSaleMasterForm').find('input:text').val('');
	$('#CashReceiptSaleMasterForm').find('input:hidden').val('');
	$('#searchBox').val('');
}
function searchCash(id) {
	resetCashValues();
	var inputs = [];
	inputs.push('patientId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/cashReceiptPatientSale/getCashbyPatientId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(r=="")
			{
			alert("Record not found!");
			}
			$("#patientIdSearch").val('');
			setTableContent(r);

		}
	});

	return true;
}
//get formatted date dd/mm/yyyy
function getDate(milliseconds) {
	var d = new Date(milliseconds);
	var dd = d.getDate();
	var mm = d.getMonth() + 1; // January is 0!

	var yyyy = d.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	return dd + '/' + mm + '/' + yyyy;
}
function setTableContent(result) {
	var r = result;

	var divContent = "";
	for (var i = 0; i < r.length; i++) {
		var cashReceiptSaleDate = getDate(r[i].cashReceiptSaleDate);

		divContent = divContent
				+ " <tr> <td class='col-md-1 center'>"
				+ (i + 1)
				+ "<input type='hidden' id='cashReceiptSaleId"
				+ r[i].cashReceiptSaleId
				+ "' value='"
				+ r[i].cashReceiptSaleId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].patientMaster.patName
				+ "<input type='hidden' id='PatientName"
				+ r[i].cashReceiptSaleId
				+ "' value='"
				+ r[i].patientMaster.patName
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].patientMaster.patPhone
				+ "<input type='hidden' id='PatientPhon"
				+ r[i].cashReceiptSaleId
				+ "' value='"
				+ r[i].patientMaster.patPhone
				+ "'></td> <td class='col-md-2 center'>"
				+ cashReceiptSaleDate
				+ "<input type='hidden' id='cashReceiptSalesDate"
				+ r[i].cashReceiptSaleId
				+ "' value='"
				+ cashReceiptSaleDate
				+ "'></td><td style='display: none'>"
				+ r[i].patientMaster.patId
				+ "<input type='hidden' id='patientId"
				+ +r[i].cashReceiptSaleId
				+ "'value='"
				+ r[i].patientMaster.patId
				+ "'>"
				+"</td><td style='display: none' >"
				+ r[i].patientMaster.patAddress
				+ "<input type='hidden' id='patientAddress"
				+ +r[i].cashReceiptSaleId
				+ "'value='"
				+ r[i].patientMaster.patAddress
				+ "'>"
				+ "</td><td style='display: none' >"
				+ r[i].cashReceiptSaleNarration
				+ "<input type='hidden' id='cashReceiptSaleNarration"
				+ +r[i].cashReceiptSaleId
				+ "'value='"
				+ r[i].cashReceiptSaleNarration
				+ "'>"
				+ "</td><td style='display: none' >"
				+ r[i].cashReceiptSaleMadeBy
				+ "<input type='hidden' id='cashReceiptSaleMadeBy"
				+ +r[i].cashReceiptSaleId
				+ "'value='"
				+ r[i].cashReceiptSaleMadeBy
				+ "'>"
				+ "</td>"
				+"<td style='display: none' >"
				+ r[i].cashReceiptSaleDocId
				+ "<input type='hidden' id='DocId"
				+ r[i].cashReceiptSaleId
				+ "' value='"
				+ r[i].cashReceiptSaleDocId
				+ "'></td><td class='col-md-1 center'>"
				+ r[i].cashReceiptSaleAmt
				+ "<input type='hidden' id='cashReceiptAmt"
				+ r[i].cashReceiptSaleId
				+ "' value='"
				+ r[i].cashReceiptSaleAmt
				+ "'></td>" 
			/*	+ "<td class='col-md-1 center'><a id='btnPrint"
				+ r[i].cashReceiptSaleId
				+ "' class='btn btn-xs btn-success'  href='/EhatEnterprise/pharmacy/cashReceiptPatientSale/printView?cashSaleId="
				+ r[i].cashReceiptSaleId
				+ "'> <i class='fa fa-print'></i> </a></td>"*/
				+ "<td class='col-md-1 center'><a id='btnPrint"
				+ r[i].cashReceiptSaleId
				+ "' class='btn btn-xs btn-success'  onclick='cashReceiptSalePrint("
			    + r[i].cashReceiptSaleId
			    + ")'> <i class='fa fa-print'></i> </a></td>"
				
				+"<td class='col-md-1 center'> <button id='btnEdit"
				+ r[i].cashReceiptSaleId
				+ "' class='btn btn-xs btn-success' onclick='editCashReceiptSale("
				+ r[i].cashReceiptSaleId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteCashReceiptSale("
				+ r[i].cashReceiptSaleId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divCashList').html(divContent);
}

function cashReceiptSalePrint(cashReceiptId) 
{
	  window.open("/EhatEnterprise/pharmacy/cashReceiptPatientSale/printView?cashSaleId="+cashReceiptId+"");
	
}