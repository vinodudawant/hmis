setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function resetDocumentValues() {
	$('#formMaster').find('input:text').val('');
	$('#formMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}

function deleteCategory(formId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('formId=' + formId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/form/delete",
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

function getCategoryList() {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/form/formList",
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

function editCategory(formId) {
	$('#formId').val($('#formId' + formId).val());
	$('#txtFormName').val($('#formName' + formId).val());
	
}

function searchForm(formId) {
	resetDocumentValues();
	
	var inputs = [];
	inputs.push('formId=' + formId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/form/getFormById",
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
		var arr = content.split("-");
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
				+ "<input type='hidden' id='formId"
				+ r[i].formId
				+ "' value='"
				+ r[i].formId
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].formName
				+ "<input type='hidden' id='formName"
				+ r[i].formId
				+ "' value='"
				+ r[i].formName
				+ "'></td> <td class='col-md-1 '> <button id='btnEdit"
				+ r[i].formId
				+ "' class='btn btn-xs btn-success' onclick='editCategory("
				+ r[i].formId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete4' class='btn btn-xs btn-success' onclick='deleteCategory("
				+ r[i].formId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#CategoryContent').html(divContent);
}
