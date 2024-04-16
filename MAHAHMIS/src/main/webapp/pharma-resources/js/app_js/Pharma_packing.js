setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function resetPackingValues() {
	$('#packingMaster').find('input:text').val('');
	$('#packingMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}

function deletePacking(packId) {
	resetPackingValues();
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('packId=' + packId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/packing/delete",
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
		url : "../../pharmacy/packing/packingList",
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

function editPacking(packId) {
	$('#packId').val($('#packId' + packId).val());
	$('#txtPackingName').val($('#packType' + packId).val());
	
}

function searchPacking(packId) {
	resetPackingValues();
	var inputs = [];
	inputs.push('packId=' + packId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/packing/getPackingById",
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

function splitPackingContent(content) {
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
				+ " <tr> <td class='col-md-1'>"
				+ (i + 1)
				+ "<input type='hidden' id='packId"
				+ r[i].packId
				+ "' value='"
				+ r[i].packId
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].packType
				+ "<input type='hidden' id='packType"
				+ r[i].packId
				+ "' value='"
				+ r[i].packType
				+ "'></td> <td class='col-md-1 '> <button id='btnEdit"
				+ r[i].packId
				+ "' class='btn btn-xs btn-success' onclick='editPacking("
				+ r[i].packId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete4' class='btn btn-xs btn-success' onclick='deletePacking("
				+ r[i].packId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#CategoryContent').html(divContent);
}
