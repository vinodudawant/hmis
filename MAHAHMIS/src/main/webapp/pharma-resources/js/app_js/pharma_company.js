setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function resetCompanyValues() {
	$('#CompanyContent').find('input:text').val('');
	$('#CompanyContent').find('input:hidden').val('');
	$('#searchBox').val('');

}

function deleteCompany(compId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('companyId=' + compId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/company/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getCompanyList();
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
function editcomp(compId) {

	$('#compId').val($('#compId' + compId).val());
	$('#txtCompanyName').val($('#companyName' + compId).val());
	$('#txtShortName').val($('#shortName' + compId).val());
	

}
function getCompanyList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/company/companyList",
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

function searchCompany(compId) {

	resetCompanyValues();

	var inputs = [];
	inputs.push('companyId=' + compId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/company/getCompanyById",
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
				+ "<input type='hidden' id='compId"
				+ r[i].compId
				+ "' value='"
				+ r[i].compId
				+ "'></td> <td class='col-md-1 '>"
				+ r[i].compName
				+ "<input type='hidden' id='companyName"
				+ r[i].compId
				+ "' value='"
				+ r[i].compName
				+ "'></td> <td class='col-md-1 '>"
				+ r[i].compShortName
				+ "<input type='hidden' id='shortName"
				+ r[i].compId
				+ "' value='"
				+ r[i].compShortName
				+ "'></td> <td class='col-md-1 '> <button id='btnEdit"
				+ r[i].compId
				+ "' class='btn btn-xs btn-success' onclick='editcomp("
				+ r[i].compId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteCompany("
				+ r[i].compId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divCompanyList').html(divContent);
}