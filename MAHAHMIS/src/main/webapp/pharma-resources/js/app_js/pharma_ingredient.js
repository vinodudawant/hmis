
function editIngredients(ingredientId)
{
	$('#txtContentCode').val($('#contentId' + ingredientId).val());
	$('#txtContentName').val($('#contentName' + ingredientId).val());
	
	
}

function deleteIngredient(ingredientId) {
	var retVal = confirm("Do you want to delete It?");
	
	if (retVal == true) {
		var inputs = [];
		inputs.push('ingredientId=' + ingredientId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						/*getDoctorsList();*/
						if (r == true) {
							
							location.reload(true);
							$("#msgDiv").html("<div class='alert alert-success' >Record deleted successfully..!</div>");
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
						reloadPage();
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
	}
	else{
		$('#hiddenId').val(0);
	}
}

function searchIngredient(ingredientId) 
{
	var inputs = [];
	inputs.push('ingredientId=' + ingredientId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "getIngredientById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() 
		{
			alert('error');
		},
		success : function(r) {
			setTableContent(r);
		}
	});
}

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr> <td class='col-md-1 center'>"
				+ (i + 1)
				+ " <input type='hidden' id='contentId"
				+ r[i].ingredientId
				+ "' value='"
				+ r[i].ingredientId
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].ingredientContent
				+ "<input type='hidden' id='contentName"
				+ r[i].ingredientId
				+ "' value='"
				+ r[i].ingredientContent
				+ "'></td> <td class='col-md-1 center'> <button id='btnEdit"
				+ r[i].ingredientId
				+ "' class='btn btn-xs btn-success' onclick='editIngredients("
				+ r[i].ingredientId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteIngredient("
				+ r[i].ingredientId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divIngredientList').html(divContent);
}