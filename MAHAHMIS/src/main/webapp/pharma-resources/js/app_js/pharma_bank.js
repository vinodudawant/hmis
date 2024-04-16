setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
/**
*
* @Code :This method for rest values
* @return
**/
function resetBankValues() {
	$('#bankMaster').find('input:text').val('');
	$('#bankMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}
/**
*
* @Code :This method for check value
* @return
**/
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
/**
*
* @Code :This method for delete
* @return
**/
function deleteBank(bankId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('bankId=' + bankId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/bank/delete",
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
/**
*
* @Code :This method for edit
* @return
**/
function editBank(bankId) {
	$('#bankId').val($('#bankId' + bankId).val());
	$('#txtBankName').val($('#bankName' + bankId).val());
	$('#txtDebit').val($('#OpeningDebit' + bankId).val());
	$('#txtCredit').val($('#OpeningCredit' + bankId).val());
	
}
/**
*
* @Code :This method for get bank list
* @return
**/
function getBankList() {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/bank/bankList",
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
		var arr = content.split("$");
		
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenId').val(arr[1]);
		}
	} else {
		$('#hiddenId').val(0);
	}
}
/**
*
* @Code :This method for search bank
* @return
**/
function searchBank(bankId) {
	resetBankValues();
	
	var inputs = [];
	inputs.push('bankId=' + bankId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/bank/getBankById",
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

/**
*
* @Code :This method for set table content
* @return
**/

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for (var i = 0; i < r.length; i++) {
		divContent = divContent
				+ "<tr>"
				+ "<td class='col-md-1'>"
				+ (i + 1)
				+ "<input type='hidden' id='bankId"
				+ +r[i].bankId
				+ "'value='"
				+ +r[i].bankId
				+ "'></td>"
				+ "<td class='col-md-2'>"
				+ r[i].bankName
				+ "<input type='hidden' id='bankName"
				+ +r[i].bankId
				+ "' value='"
				+ r[i].bankName
				+ "'>"
				+ "</td>"
				
				+ "<td style='display: none' id='txtCredit'>"
				+ r[i].bankOpeningDebit
				+ "<input type='hidden' id='OpeningDebit"
				+ +r[i].bankId
				+ "'value='"
				+ r[i].bankOpeningDebit
				+ "'>"
				+ "</td>"
				+ "<td style='display: none' id='txtCredit'>"
				+ r[i].bankOpeningCredit
				+ "<input type='hidden' id='OpeningCredit"
				+ +r[i].bankId
				+ "'value='"
				+ r[i].bankOpeningCredit
				+ "'>"
				+ "</td>"
				
				+ " <td class='col-md-1'> <button id='btnEdit"
				+ r[i].bankId
				+ "' class='btn btn-xs btn-success' onclick='editBank("
				+ r[i].bankId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteBank("
				+ r[i].bankId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#divBankList').html(divContent);
}