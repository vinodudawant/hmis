setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(4000);
}, 5000);

function resetUomValues() {
	$('#uomMaster').find('input:text').val('');
	$('#uomMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}

function deleteUom(uomId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	

		var inputs = [];
		inputs.push('companyId=' + uomId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/uom/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getUomList();
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
function editUom(uomId) {
	$('#uomId').val($('#uomId' + uomId).val());
	$('#txtUomDescription').val($('#uomName' + uomId).val());
	
}
function getUomList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/uom/uomList",
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
		$('#hiddenId').val(0);
	}
}

function searchUom(uomId) {
	resetUomValues();

	var inputs = [];
	inputs.push('uomId=' + uomId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/uom/getUomById",
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
			$('#hiddenId').val('');
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
				+ "<input type='hidden' id='uomId"
				+ r[i].uomId
				+ "' value='"
				+ r[i].uomId
				+ "'></td> <td class='col-md-1 '>"
				+ r[i].uomName
				+ "<input type='hidden' id='uomName"
				+ r[i].uomId
				+ "' value='"
				+ r[i].uomName
				+ "'></td>"

				+ " <td class='col-md-1 '> <button id='btnEdit"
				+ r[i].uomId
				+ "' class='btn btn-xs btn-success' onclick='editUom("
				+ r[i].uomId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteUom("
				+ r[i].uomId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#divUomList').html(divContent);
}