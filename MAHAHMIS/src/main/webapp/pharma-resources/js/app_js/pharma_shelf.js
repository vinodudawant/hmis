setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function resetShellfValues() {
	$('#shelfMaster').find('input:text').val('');
	$('#shelfMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}

function deleteShelf(shelfId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	var shelfId = parseInt(shelfId);
	
		var inputs = [];
		inputs.push('shelfId=' + shelfId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/shelf/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getShelfList();
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
function edit(shelfId) {
	$('#shelfId').val($('#shelfId' + shelfId).val());
	$('#txtName').val($('#shelfName' + shelfId).val());
}
function getShelfList() {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/shelf/shelfList",
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

function splitShelfContent(content) {
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

function searchShelf(shelfId) {
	resetShellfValues();

	var inputs = [];
	inputs.push('shelfId=' + shelfId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/shelf/getShelfById",
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
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr> <td class='col-md-1 '>"
				+ (i + 1)
				+ "<input type='hidden' id='shelfId"
				+ r[i].shelfId
				+ "' value='"
				+ r[i].shelfId
				+ "'></td> <td class='col-md-1 '>"
				+ r[i].shelfName
				+ "<input type='hidden' id='shelfName"
				+ r[i].shelfId
				+ "' value='"
				+ r[i].shelfName
				+ "'></td>"

				+ " <td class='col-md-1 '> <button id='btnEdit"
				+ r[i].shelfId
				+ "' class='btn btn-xs btn-success' onclick='edit("
				+ r[i].shelfId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteShelf("
				+ r[i].shelfId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#divShelfList').html(divContent);
}