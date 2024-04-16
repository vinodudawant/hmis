setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
	
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
		
	}, 4000);
	
}
function editTax(taxId) {
	$('#taxId').val($('#taxId' + taxId).val());
	$('#txtTaxName').val($('#taxName' + taxId).val());
	$('#txtTaxRate').val($('#igstRate' + taxId).val());
	var type=$('#type' + taxId).val();
	if(type==1)
		type="GST";
	else
		type="Free";
	$("#txtTaxDesc option[value=" + type + "]").prop("selected",true);
	
}

function resetTaxValues() {
	$('#taxMaster').find('input:text').val('');
	$('#taxMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}

function deleteTax(taxId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('taxId=' + taxId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/tax/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						/* getDoctorsList(); */
						if (r == true) {
						/*	$('#resultDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");*/
							/*hideResultDiv();*/
							//location.reload();
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

function searchTax(taxId) {
	resetTaxValues();
	var inputs = [];
	inputs.push('taxId=' + taxId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/tax/getTaxById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			console.log(r);
			if(r=="")
			{
			alert("Record not found!");
			}
			$("#hiddenId").val('');
			setTableContent(r);
			
		}
	});
}

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		var type=r[i].type;
		divContent = divContent
				+ " <tr> <td class='col-md-1'>"
				+ (i + 1)
				+ " <input type='hidden' id='taxId"
				+ r[i].taxId
				+ "' value='"
				+ r[i].taxId
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].taxName
				+ "<input type='hidden' id='taxName"
				+ r[i].taxId
				+ "' value='"
				+ r[i].taxName
				+ "'></td> "

				+ "<td class='col-md-2 '>"
				+ r[i].taxRate/2
				+ "<input type='hidden' id='CGSTRate"
				+ r[i].taxId
				+ "' value='"
				+ r[i].taxRate/2
				+ "'></td> "
				
				+ "<td class='col-md-2 '>"
				+ r[i].taxRate/2
				+ "<input type='hidden' id='SGSTRate"
				+ r[i].taxId
				+ "' value='"
				+ r[i].taxRate/2
				+ "'></td> "
				
				+ "<td class='col-md-2 '>"
				+ r[i].taxRate
				+ "<input type='hidden' id='igstRate"
				+ r[i].taxId
				+ "' value='"
				+ r[i].taxRate
				+ "'></td> ";

				/*+ "<td class='col-md-2 '>"
				+ r[i].taxDesc
				+ "<input type='hidden' id='taxDesc"
				+ r[i].taxId
				+ "' value='"
				+ r[i].taxDesc
				+ "'></td> "*/
				if (type == 1) {
					divContent = divContent
					+ "<td class='col-md-2 '>"
					+ "GST"
					+ "<input type='hidden' id='taxGSTtype"
					+ r[i].taxId
					+ "' value='"
					+ "GST"
					+ "'></td> ";
				} else {
					divContent = divContent
					+ "<td class='col-md-2 '>"
					+ "Free"
					+ "<input type='hidden' id='taxGSTtype"
					+ r[i].taxId
					+ "' value='"
					+ "Free"
					+ "'></td> ";
				}
				
				divContent = divContent
				+ "<td class='col-md-1 '> <button id='btnEdit"
				+ r[i].taxId
				+ "' class='btn btn-xs btn-success' onclick='editTax("
				+ r[i].taxId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteTax("
				+ r[i].taxId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#divTaxList').html(divContent);
}