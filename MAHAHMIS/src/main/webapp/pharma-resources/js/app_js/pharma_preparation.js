setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function resetDocumentValues() {
	$('#preparationMasterForm').find('input:text').val('');
	$('#preparationMasterForm').find('input:hidden').val('');
	$('#searchBox').val('');
}

function deletePreparation(preparationId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('preparationId=' + preparationId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/preparation/delete",
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


function editPreparation(preparationId) {
	$('#preparationId').val($('#preparationId' + preparationId).val());
	$('#txtPreparation').val($('#preparationName' + preparationId).val());
	
	//
	var status = $('#preparationQty' + preparationId).val();
	if(status=="0"){
		$('#radioPreprationNo').prop('checked', 'checked');
		//$('#radioPreprationNo').prop('checked', false);
	}
	else if(status=="1"){
		$('#radioPreprationYes').prop('checked', true);
		//$('#radioPreprationNo').val();
	}
	
	
}

function searchPreparation(preparationId) 
{
	resetDocumentValues();
	var inputs = [];
	inputs.push('preparationId=' + preparationId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/preparation/getPreparationById",
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
				+ "<input type='hidden' id='preparationId"
				+ r[i].preparationId
				+ "' value='"
				+ r[i].preparationId
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].preparationName
				+ "<input type='hidden' id='preparationName"
				+ r[i].preparationId
				+ "' value='"
				+ r[i].preparationName
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].preparationQty
				+ "<input type='hidden' id='preparationQty"
				+ r[i].preparationId
				+ "' value='"
				+ r[i].preparationQty
				+ "'></td> <td class='col-md-1 '> <button id='btnEdit"
				+ r[i].preparationId
				+ "' class='btn btn-xs btn-success' onclick='editPreparation("
				+ r[i].preparationId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete4' class='btn btn-xs btn-success' onclick='deletePreparation("
				+ r[i].preparationId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#PreparationContent').html(divContent);
}
