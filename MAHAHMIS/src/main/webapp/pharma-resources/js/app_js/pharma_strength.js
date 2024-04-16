setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function resetDocumentValues() {
	$('#strengthMasterForm').find('input:text').val('');
	$('#strengthMasterForm').find('input:hidden').val('');
	$('#searchBox').val('');
}

function deleteStrength(strengthId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('strengthId=' + strengthId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/strength/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getCategoryList();
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


function editStrength(strengthId) {
	
	$('#strengthId').val($('#strengthId' + strengthId).val());
	$('#txtStrength').val($('#strengthName' + strengthId).val());
	$('#txtStrength').focus();
	
}

function searchStrength(strengthId) 
{
	resetDocumentValues();
	var inputs = [];
	inputs.push('strengthId=' + strengthId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/strength/getStrengthById",
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

function splitContent(content) {
	if (content != "") {
		var arr = content.split("$");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenId').val(arr[1]);
		}
	}
	else{
		$('#hiddenId').val(0);
	}
}

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr> <td class='col-md-1 '>"
				+ (i + 1)
				+ "<input type='hidden' id='strengthId"
				+ r[i].strengthId
				+ "' value='"
				+ r[i].strengthId
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].strengthName
				+ "<input type='hidden' id='strengthName"
				+ r[i].strengthId
				+ "' value='"
				+ r[i].strengthName
				+ "'></td> <td class='col-md-1 '> <button id='btnEdit"
				+ r[i].strengthId
				+ "' class='btn btn-xs btn-success' onclick='editStrength("
				+ r[i].strengthId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete4' class='btn btn-xs btn-success' onclick='deleteStrength("
				+ r[i].strengthId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#StrengthContent').html(divContent);
}
