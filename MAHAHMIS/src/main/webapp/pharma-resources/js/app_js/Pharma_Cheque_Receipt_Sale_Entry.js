setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);
function splitChequeReceiptEntryContent(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox1').val(arr[0]);
		if (arr.length > 1) {
			$('#patientId').val(arr[1]);
			$('#txtAddress').val(arr[2]);
			$('#txtPhone').val(arr[3]);

		}

	} else {
		$('#patientId').val(0);
	}
}
function splitCheque(content) {
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
function splitBank(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox2').val(arr[0]);
		if (arr.length > 1) {
			$('#bankId').val(arr[1]);
			
			
		}

	} else {
		$('#bankId').val(0);
		
	}
}
function splitBank1(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox3').val(arr[0]);
		if (arr.length > 1) {
			$('#bankId1').val(arr[1]);
			
		}

	} else {
		$('#bankId1').val(0);
	}
}

function edit(chequeReceiptSaleId) 
{ 
	$('#chequeReceiptSaleId').val($('#chequeReceiptSaleId' + chequeReceiptSaleId).val());
	$('#bankId').val($('#bankId' + chequeReceiptSaleId).val());
	$('#bankId1').val($('#bankId1' + chequeReceiptSaleId).val());
	$('#ourBranchId').val($('#branchId' + chequeReceiptSaleId).val());
	$('#branchId1').val($('#branchId1' + chequeReceiptSaleId).val());
	$('#patientId').val($('#patientId' +chequeReceiptSaleId).val());
	$('#searchBox1').val($('#PatName' + chequeReceiptSaleId).val());
	$('#txtAddress').val($('#patientAddress' + chequeReceiptSaleId).val());
	$('#txtPhone').val($('#patientMobileNum' + chequeReceiptSaleId).val());
	$('#searchBox2').val($('#bankName' + chequeReceiptSaleId).val());
	$('#searchBox3').val($('#bankName1' + chequeReceiptSaleId).val());
	$('#txtNaration').val($('#chequeReceiptSaleNarration' + chequeReceiptSaleId).val());
	$('#txtAmount').val($('#chequeReceiptSaleAmt' + chequeReceiptSaleId).val());
	$('#txtChequeNo').val($('#chequeReceiptSaleNo' + chequeReceiptSaleId).val());
	$('#txtBranch').val($('#OurbranchName' + chequeReceiptSaleId).val());
	$('#popup_container2').val($('#chequeReceiptSaleDate' + chequeReceiptSaleId).val());
	$('#txtEntryMadeBY').val($('#chequeReceiptSaleMadeBy' + chequeReceiptSaleId).val());
	$('#txtNextBranch1').val($('#branchName1' + chequeReceiptSaleId).val());
}

function deleteCheque(chequeId) {

	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted Succesfully");

		setTimeout(
				function() {
					var inputs = [];
					inputs.push('chequeReceiptSaleId=' + chequeId);

					var str = inputs.join('&');
					jQuery
							.ajax({
								async : true,
								type : "GET",
								data : str + "&reqType=AJAX",
								url : "/EhatEnterprise/pharmacy/chequeReceiptPatientSale/delete",
								timeout : 1000 * 60 * 5,
								catche : false,
								error : function() {
									alert("error");
								},
								success : function(r) {
									//getChequeList();
									if (r == true) {
										/*$('#msgDiv')
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
function getChequeList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/chequeReceiptPatientSale/chequeReceiptList",
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
function resetChequeValues() {
	$('#ChequeReceiptSaleMasterForm').find('input:text').val('');
	$('#ChequeReceiptSaleMasterForm').find('input:hidden').val('');
	$('#searchBox').val('');
}

function searchCheque(id) {
	resetChequeValues();
	var inputs = [];
	inputs.push('patientId=' +id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/chequeReceiptPatientSale/getChequebyPatientId",
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
function setTableContent(result) {
	var r = result;

	var divContent = "";
	for (var i = 0; i < r.length; i++) {
		var cashDate = getDate(r[i].chequeReceiptSaleDate);

		divContent = divContent
				+ " <tr> <td class='col-md-1 center'>"
				+ (i + 1)
				+ "<input type='hidden' id='chequeReceiptSaleId"
				+ r[i].chequeReceiptSaleId
				+ "' value='"
				+ r[i].chequeReceiptSaleId
				+ "'></td><td class='col-md-1 center'>"
				+ r[i].patientMaster.patName
				+ "<input type='hidden' id='PatName"
				+ r[i].chequeReceiptSaleId
				+ "' value='"
				+ r[i].patientMaster.patName
				+ "'></td> <td class='col-md-1 center'>"
				+ r[i].chequeReceiptSaleAmt
				+ "<input type='hidden' id='chequeReceiptSaleAmt"
				+ r[i].chequeReceiptSaleId
				+ "' value='"
				+ r[i].chequeReceiptSaleAmt
				+ "'></td> <td class='col-md-1 center'>"
				+ r[i].chequeReceiptSaleNo
				+ "<input type='hidden' id='chequeReceiptSaleNo"
				+ r[i].chequeReceiptSaleId
				+ "' value='"
				+ r[i].chequeReceiptSaleNo
				+ "'></td><td class='col-md-1 center'>"
				+ r[i].branchMaster1.branchName
				+ "<input type='hidden' id='branchName1"
				+ r[i].chequeReceiptSaleId
				+ "' value='"
				+ r[i].branchMaster1.branchName
				+ "'></td><td style='display: none' >"
				+ r[i].patientMaster.patMobile
				+ "<input type='hidden' id='patientMobileNum"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].patientMaster.patMobile
				+ "'>"
				+ "</td><td style='display: none'>"
				+ r[i].patientMaster.patName
				+ "<input type='hidden' id='patName"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].patientMaster.patName
				+ "'>"
				+ "</td><td style='display: none' >"
				+ cashDate
				+ "<input type='hidden' id='chequeReceiptSaleDate"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ cashDate
				+ "'>"
				+ "</td><td style='display: none'>"
				+ r[i].patientMaster.patId
				+ "<input type='hidden' id='patientId"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].patientMaster.patId
				+ "'>"
				+"</td><td style='display: none' id='txtCredit'>"
				+ r[i].patientMaster.patAddress
				+ "<input type='hidden' id='patientAddress"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].patientMaster.patAddress
				+ "'>"
				+ "</td><td style='display: none'>"
				+ r[i].chequeReceiptSaleNarration
				+ "<input type='hidden' id='chequeReceiptSaleNarration"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].chequeReceiptSaleNarration
				+ "'><td style='display: none'>"
				+ r[i].bankMaster.bankName
				+ "<input type='hidden' id='bankName"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].bankMaster.bankName
				+ "'><td style='display: none'>"
				+ r[i].bankMaster1.bankName
				+ "<input type='hidden' id='bankName1"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].bankMaster1.bankName
				+ "'><td style='display: none'>"
				+ r[i].branchMaster.branchName
				+ "<input type='hidden' id='OurbranchName"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].branchMaster.branchName
				+ "'>"
				+ "</td><td style='display: none'>"
				+ r[i].chequeReceiptSaleMadeBy
				+ "<input type='hidden' id='chequeReceiptSaleMadeBy"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].chequeReceiptSaleMadeBy
				+ "'>"
				+ "</td><td style='display: none'>"
				+ r[i].bankMaster.bankId
				+ "<input type='hidden' id='bankId"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].bankMaster.bankId
				+ "'>"
				+ "</td><td style='display: none'>"
				+ r[i].bankMaster1.bankId
				+ "<input type='hidden' id='bankId1"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].bankMaster1.bankId
				+ "'>"
				+ "</td><td style='display: none'>"
				+ r[i].branchMaster.branchId
				+ "<input type='hidden' id='branchId"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].branchMaster.branchId
				+ "'>"
				+ "</td><td style='display: none'>"
				+ r[i].branchMaster1.branchId
				+ "<input type='hidden' id='branchId1"
				+ +r[i].chequeReceiptSaleId
				+ "'value='"
				+ r[i].branchMaster1.branchId
				+ "'>"
				+ "</td>"
				/*+"</td><td class='col-md-2 center'><a id='btnPrint"
				+ r[i].chequeReceiptSaleId
				+ "' class='btn btn-xs btn-success'  href='/EhatEnterprise/pharmacy/chequeReceiptPatientSale/printView?chequeReceiptSaleId="
				+ r[i].chequeReceiptSaleId
				+ "'> <i class='fa fa-print'></i> </a></td><td class='col-md-1 center'> <button id='btnEdit"*/
				+"</td><td class='col-md-2 center'><button id='btnPrint"
				+ r[i].chequeReceiptSaleId
				+ "' class='btn btn-xs btn-success'  onclick='chequeReceiptSalePrint("
				+ r[i].chequeReceiptSaleId
				+ ")'> <i class='fa fa-print'></i> </button></td><td class='col-md-1 center'> <button id='btnEdit"
				+ r[i].chequeReceiptSaleId
				+ "' class='btn btn-xs btn-success' onclick='edit("
				+ r[i].chequeReceiptSaleId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteCheque("
				+ r[i].chequeReceiptSaleId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divChequeList').html(divContent);
}

function chequeReceiptSalePrint(chequeReceiptSaleId) 
{
	  window.open("/EhatEnterprise/pharmacy/chequeReceiptPatientSale/printView?chequeReceiptSaleId="+chequeReceiptSaleId+"");
	
}
