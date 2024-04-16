
function resetBankValues() {
	$('#bankMaster').find('input:text').val('');
	$('#bankMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}
function checkValue()
{
	var DebitAmt=parseFloat($('#txtDebit').val());
	var CreditAmt=parseFloat($('#txtCredit').val());
	
	  if(DebitAmt>CreditAmt)
	    {
	    alert("Debit Amount should be less than Credit Amount!");
	    $('#txtDebit').val('');
	    }
	
}
function deleteShift(shiftId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('shiftId=' + shiftId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/shift/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getBankList();
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
function editBank(bankId) {
	$('#bankId').val($('#bankId' + bankId).val());
	$('#txtBankName').val($('#bankName' + bankId).val());
	$('#txtDebit').val($('#OpeningDebit' + bankId).val());
	$('#txtCredit').val($('#OpeningCredit' + bankId).val());
	
}

function getBankList() {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/bank/bankList",
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

function searchShift(shiftId) {
	resetBankValues();
	
	var inputs = [];
	inputs.push('shiftId=' + shiftId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/shift/getShiftById",
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

// set table content
function setTableContent(result) {
	var r = result;
	var divContent = "";
	for (var i = 0; i < r.length; i++) {
		divContent = divContent
				+ "<tr>"
				+ "<td class='col-md-1'>"
				+ (i + 1)
				+ "<input type='hidden' id='shiftId"
				+ +r[i].shiftId
				+ "'value='"
				+ +r[i].shiftId
				+ "'></td>"
				+ "<td class='col-md-2'>"
				+ r[i].shiftName
				+ "<input type='hidden' id='bankName"
				+ +r[i].shiftId
				+ "' value='"
				+ r[i].shiftName
				+ "'>"
				+ "</td>"
				
				+ "<td  id='txtCredit'>"
				+ r[i].shiftStartTime
				+ "<input type='hidden' id='OpeningDebit"
				+ +r[i].shiftId
				+ "'value='"
				+ r[i].shiftStartTime
				+ "'>"
				+ "</td>"
				+ "<td  id='txtCredit'>"
				+ r[i].shiftEndTime
				+ "<input type='hidden' id='OpeningCredit"
				+ +r[i].shiftId
				+ "'value='"
				+ r[i].shiftEndTime
				+ "'>"
				+ "</td>"
				
				+ " <td class='col-md-1'> <button id='btnEdit"
				+ r[i].shiftId
				+ "' class='btn btn-xs btn-success' onclick='editBank("
				+ r[i].shiftId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteShift("
				+ r[i].shiftId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#divShiftList').html(divContent);
}