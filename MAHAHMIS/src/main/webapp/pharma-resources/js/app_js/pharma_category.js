setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}

function resetCategoryValues() {
	$('#categoryMaster').find('input:text').val('');
	$('#categoryMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}

function deleteCategory(catId) {

	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('catId=' + catId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/category/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						if (r == true) {
						/*	$('#resultDiv')
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
		url : "../../pharmacy/category/categoryList",
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

function editCategory(catId) {
	
	$('#catId').val($('#catId' + catId).val());
	$('#txtCategoryName').val($('#categoryName' + catId).val());
	
	
}

function searchCategory(catId) {
	resetCategoryValues();
	
	var inputs = [];
	inputs.push('catId=' + catId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/category/getCategoryById",
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

function splitCategoryContent(content) {
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

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr> <td class='col-md-1 '>"
				+ (i + 1)
				+ "<input type='hidden' id='catId"
				+ r[i].catId
				+ "' value='"
				+ r[i].catId
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].catName
				+ "<input type='hidden' id='categoryName"
				+ r[i].catId
				+ "' value='"
				+ r[i].catName
				+ "'></td> <td class='col-md-1 '> <button id='btnEdit"
				+ r[i].catId
				+ "' class='btn btn-xs btn-success' onclick='editCategory("
				+ r[i].catId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete4' class='btn btn-xs btn-success' onclick='deleteCategory("
				+ r[i].catId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#CategoryContent').html(divContent);
}
