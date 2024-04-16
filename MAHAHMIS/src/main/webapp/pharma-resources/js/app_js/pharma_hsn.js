setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function resetHsnValues() {
	$('#HsnContent').find('input:text').val('');
	$('#HsnContent').find('input:hidden').val('');
	$('#searchBox').val('');

}

function deleteHsn(hsnId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('hsnId=' + hsnId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/hsn/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getHsnList();
						if (r == true) {
							/*$('#resultDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");
							hideResultDiv();*/
							// location.reload(true);
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
function editHsn(hsnId) {
	$('#hsnId').val($('#hsnId' + hsnId).val());
	$('#txtHsnNo').val($('#hsnNo' + hsnId).val());
	

}
function getHsnList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/hsn/hsnList",
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

		$('#hiddenId').val(1);
	}
}

function searchHsn(hsnId) {

	resetHsnValues();

	var inputs = [];
	inputs.push('hsnId=' + hsnId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/hsn/getHsnById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			if (r =="")
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
				+ "<input type='hidden' id='hsnId"
				+ r[i].hsnId
				+ "' value='"
				+ r[i].hsnId
				+ "'></td> <td class='col-md-1 '>"
				+ r[i].hsnNo
				+ "<input type='hidden' id='hsnNo"
				+ r[i].hsnId
				+ "' value='"
				+ r[i].hsnNo
				+ "'></td><td class='col-md-1 '> <button id='btnEdit"
				+ r[i].hsnId
				+ "' class='btn btn-xs btn-success' onclick='editHsn("
				+ r[i].hsnId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteHsn("
				+ r[i].hsnId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divHsnList').html(divContent);
}