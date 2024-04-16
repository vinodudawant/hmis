setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);
function splitChequeReceiptEntryContent(content) {
	/*if (content != "") {
		var arr = content.split("-");
		$('#searchBox1').val(arr[0]);
		if (arr.length > 1) {
			$('#vendorId').val(arr[1]);
			$('#txtAddress').val(arr[2]);
			$('#txtPhone').val(arr[3]);

		}

	} else {
		$('#vendorId').val(0);
	}*/
	
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox1').val(arr[0]);
		if (arr.length > 1) {
			$('#vendorId').val(arr[1]);
			
			jQuery.ajax({
				async : true,
				type : "GET",
				data : {
					"vendorId" : arr[1]
				},
				url : "../../pharmacy/vendoraddress/getAllAddressOfVendor",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					
				    $("#txtAddress").val(r[0].vendorAddress);
				    $("#txtPhone").val(r[0].vendorMobileNumber);
				    
				    
					//$("#hiddenVendoraddId").val(r[0][0]);
					
				   
				}
			});
			
			
		
		}
	} else {
		$('#vendorId').val(0);
	}
}
function splitCheque(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#vendorIdSearch').val(arr[1]);

		}

	} else {
		$('#vendorIdSearch').val(0);
	}
}
function splitBank(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox2').val(arr[1]);
		if (arr.length > 1) {
			$('#bankId').val(arr[0]);
			
			
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

function edit(chequeReceiptId) 
{ 
	$('#chequeReceiptId').val($('#chequeReceiptId' + chequeReceiptId).val());
	$('#bankId').val($('#bankId' + chequeReceiptId).val());
	$('#bankId1').val($('#bankId1' + chequeReceiptId).val());
	$('#ourBranchId').val($('#branchId' + chequeReceiptId).val());
	$('#branchId1').val($('#branchId1' + chequeReceiptId).val());
	$('#vendorId').val($('#vendorId' + chequeReceiptId).val());
	$('#searchBox1').val($('#vendorName' + chequeReceiptId).val());
	$('#txtAddress').val($('#vendorAddress' + chequeReceiptId).val());
	$('#txtPhone').val($('#vendorMobileNum' + chequeReceiptId).val());
	$('#searchBox2').val($('#bankName' + chequeReceiptId).val());
	$('#searchBox3').val($('#bankName1' + chequeReceiptId).val());
	$('#txtNaration').val($('#chequeReceiptNarration' + chequeReceiptId).val());
	$('#txtAmount').val($('#chequeReceiptAmt' + chequeReceiptId).val());
	$('#txtChequeNo').val($('#chequeReceiptNo' + chequeReceiptId).val());
	$('#txtBranch').val($('#OurbranchName' + chequeReceiptId).val());
	$('#popup_container2').val($('#chequeReceiptDate' + chequeReceiptId).val());
	$('#txtEntryMadeBY').val($('#chequeReceiptMadeBy' + chequeReceiptId).val());
	$('#txtNextBranch1').val($('#branchName1' + chequeReceiptId).val());
	
}

function deleteCheque(chequeId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");


		setTimeout(
				function() {
					var inputs = [];
					inputs.push('chequeReceiptId=' + chequeId);

					var str = inputs.join('&');
					jQuery
							.ajax({
								async : true,
								type : "GET",
								data : str + "&reqType=AJAX",
								url : "../../pharmacy/chequeReceiptEntry/delete",
								timeout : 1000 * 60 * 5,
								catche : false,
								error : function() {
									alert("error");
								},
								success : function(r) {
									//getChequeList();
									if (r == true) {
									/*	$('#msgDiv')
												.html(
														"<div class='alert alert-success' >Record deleted successfully..!</div>");
*/									} else {
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
		url : "../../pharmacy/chequeReceiptEntry/chequeReceiptList",
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


function resetCashValues() {
	$('#ChequeReceiptMasterForm').find('input:text').val('');
	$('#ChequeReceiptMasterForm').find('input:hidden').val('');
	$('#searchBox').val('');
}

function searchCheque(id) {
	/*resetCashValues();*/
	var inputs = [];
	inputs.push('vendorId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/chequeReceiptEntry/getChequebyVendorId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(r=="")
			{
			alert("Record not found!");
			$('#searchBox').val('');
			}
			$('#searchBox').val('');
			$("#vendorIdSearch").val('');
			setTableContent(r);

		}
	});

	return true;
}
function setTableContent(result) {
	var r = result;

	var divContent = "";
	for (var i = 0; i < r.length; i++) {
		var cashDate = getDate(r[i].chequeReceiptDate);

		divContent = divContent
				+ " <tr> <td class='col-md-1 center'>"
				+ (i + 1)
				+ "<input type='hidden' id='chequeReceiptId"
				+ r[i].chequeReceiptId
				+ "' value='"
				+ r[i].chequeReceiptId
				+ "'></td><td class='col-md-1 center'>"
				+ r[i].vendorMaster.vendorName
				+ "<input type='hidden' id='vendorName"
				+ r[i].chequeReceiptId
				+ "' value='"
				+ r[i].vendorMaster.vendorName
				+ "'></td> <td class='col-md-1 center'>"
				+ r[i].chequeReceiptAmt
				+ "<input type='hidden' id='chequeReceiptAmt"
				+ r[i].chequeReceiptId
				+ "' value='"
				+ r[i].chequeReceiptAmt
				+ "'></td> <td class='col-md-1 center'>"
				+ r[i].chequeReceiptNo
				+ "<input type='hidden' id='chequeReceiptNo"
				+ r[i].chequeReceiptId
				+ "' value='"
				+ r[i].chequeReceiptNo
				+ "'></td><td class='col-md-1 center'>"
				+ r[i].branchMaster.branchName
				+ "<input type='hidden' id='OurbranchName"
				+ r[i].chequeReceiptId
				+ "' value='"
				+ r[i].branchMaster.branchName
				+ "'></td><td style='display: none' id='vendorName'>"
				+ r[i].vendorMaster.vendorMobileNumber
				+ "<input type='hidden' id='vendorMobileNum"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].vendorMaster.vendorMobileNumber
				+ "'>"
				+ "</td><td style='display: none' id='vendorName'>"
				+ r[i].bankMaster.bankName
				+ "<input type='hidden' id='bankName"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].bankMaster.bankName
				+ "'><td style='display: none' id='vendorName'>"
				+ r[i].bankMaster1.bankName
				+ "<input type='hidden' id='bankName1"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].bankMaster1.bankName
				+ "'>"
				+ "</td><td style='display: none' id='vendorName'>"
				+ cashDate
				+ "<input type='hidden' id='chequeReceiptDate"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ cashDate
				+ "'>"
				+ "</td><td style='display: none' id='vendorId'>"
				+ r[i].vendorMaster.vendorId
				+ "<input type='hidden' id='vendorId"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].vendorMaster.vendorId
				+ "'>"
				+"</td><td style='display: none' id='txtCredit'>"
				+ r[i].vendorMaster.vendorAddress
				+ "<input type='hidden' id='vendorAddress"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].vendorMaster.vendorAddress
				+ "'>"
				+ "</td><td style='display: none' id='txtCredit'>"
				+ r[i].chequeReceiptNarration
				+ "<input type='hidden' id='chequeReceiptNarration"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].chequeReceiptNarration
				+ "'>"
				+ "</td><td style='display: none' id='txtCredit'>"
				+ r[i].chequeReceiptMadeBy
				+ "<input type='hidden' id='chequeReceiptMadeBy"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].chequeReceiptMadeBy
				+ "'>"
				+ "</td><td style='display: none' id='txtCredit'>"
				+ r[i].branchMaster1.branchName
				+ "<input type='hidden' id='branchName1"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].branchMaster1.branchName
				+ "'>"
				+"<td style='display: none' id='txtCredit'>"
				+ r[i].bankMaster.bankId
				+ "<input type='hidden' id='bankId"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].bankMaster.bankId
				+ "'>"
				+"<td style='display: none' id='txtCredit'>"
				+ r[i].bankMaster1.bankId
				+ "<input type='hidden' id='bankId1"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].bankMaster1.bankId
				+ "'>"
				+"<td style='display: none' id='txtCredit'>"
				+ r[i].branchMaster.branchId
				+ "<input type='hidden' id='branchId"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].branchMaster.branchId
				+ "'>"
				+"<td style='display: none' id='txtCredit'>"
				+ r[i].branchMaster1.branchId
				+ "<input type='hidden' id='branchId1"
				+ +r[i].chequeReceiptId
				+ "'value='"
				+ r[i].branchMaster1.branchId
				+ "'>"
			/*	+ "</td><td class='col-md-2 center'><a id='btnPrint"
				+ r[i].chequeReceiptId
				+ "' class='btn btn-xs btn-success'  href='/EhatEnterprise/pharmacy/chequeReceiptEntry/printView?chequeId="
				+ r[i].chequeReceiptId
				+ "'> <i class='fa fa-print'></i> </a></td>"*/
				+ "</td><td class='col-md-2 center'><button id='btnPrint"
				+ r[i].chequeReceiptId
				+ "' class='btn btn-xs btn-success'  onclick='chequeReceiptPrint("
				+ r[i].chequeReceiptId
				+ ")'> <i class='fa fa-print'></i> </button></td>"
				
				+"<td class='col-md-1 center'> <button id='btnEdit"
				+ r[i].chequeReceiptId
				+ "' class='btn btn-xs btn-success' onclick='edit("
				+ r[i].chequeReceiptId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteCheque("
				+ r[i].chequeReceiptId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divChequeList').html(divContent);
}
function chequeReceiptPrint(chequeReceiptId) 
{
	  window.open("../../pharmacy/chequeReceiptEntry/printView?chequeId="+chequeReceiptId+"");
	
}

