setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function setFinancialYear() {
	var startDate = $('#txtYearStartDate').val();
	var arr = startDate.split('/');
	var startYear = parseInt(arr[2].trim());
	var endYear = startYear + 1;
	$('#txtFinancialYear').val(startYear + "-" + endYear);
	$('#txtYearEndDate').val("31/3/" + endYear);
}

setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function deleteYear(yearId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	var yId = parseInt(yearId);
	
		var inputs = [];
		inputs.push('yearId=' + yId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/year/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getYearsList();
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
function editFinacial(yearId) {
	$('#txtYearId').val($('#yearId' + yearId).val());
	$('#txtYearStartDate').val($('#yearStartDate' + yearId).val());
	$('#txtYearEndDate').val($('#yearEndDate' + yearId).val());
	$('#txtFinancialYear').val($('#yearFinancial' + yearId).val());
	
}
function getYearsList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/year/yearsList",
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
		$('#searchBox').val(arr[0] + "-" + arr[1]);
		if (arr.length > 1) {
		
			$('#hiddenId').val(arr[2]);
		}
	} else {
		$('#hiddenId').val(0);
	}
}

function searchYear(yId) {
	resetYearValues();
	
	var inputs = [];
	inputs.push('yearId=' + yId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/year/getYearById",
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

// get formatted date dd/mm/yyyy
function getDate(milliseconds) {
	var d = new Date(milliseconds);
	var dd = d.getDate();
	var mm = d.getMonth() + 1; // January is 0!

	var yyyy = d.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	return dd + '/' + mm + '/' + yyyy;
}

function resetYearValues() {
	 $('#yearContent').find('input:text').val('');
	 $('#yearContent').find('input:hidden').val('');
	 $('#searchBox').val('');
	 
}


// set table content
function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		var endDate = getDate(r[i].yearEndDate);
		var startDate = getDate(r[i].yearStartDate);

		divContent = divContent
				+ "<tr> <td style='height: 21.5px;' class='numeric'>"
				+ (i + 1)
				+ "<input type='hidden' id='yearId"
				+ r[i].yearId
				+ "' value='"
				+ r[i].yearId
				+ "'> </td> <td style='height: 21.5px;' class=''>"
				+ startDate
				+ " <input type='hidden' id='yearStartDate"
				+ r[i].yearId
				+ "'  value='"
				+ startDate
				+ "'> </td> <td style='height: 21.5px;' class=''>"
				+ endDate
				+ " <input type='hidden' id='yearEndDate"
				+ r[i].yearId
				+ "' value='"
				+ endDate
				+ "'> </td> <td style='height: 21.5px;' class=''>"
				+ r[i].yearFinancial
				+ " <input type='hidden' id='yearFinancial"
				+ r[i].yearId
				+ "'value='"
				+ r[i].yearFinancial
				+ "'> </td> <td style=''> <button class='btn btn-xs btn-success' style='height: 21.5px; text-align: center;' value='EDIT' id='btnEdit"
				+ r[i].yearId
				+ "' onclick='editFinacial("
				+ r[i].yearId
				+ ")'> <i class='fa fa-edit' class='edit'></i> </button> </td> <td style='height: 21.5px;'> <button class='btn btn-xs btn-success' style='height: 21.5px;' value='DELETE' id='btnDelete"
				+ r[i].yearId
				+ "' onclick='deleteYear("
				+ r[i].yearId
				+ ")'><i class='fa fa-trash-o' class='edit'></i></button></td></tr>";

	}

	$('#divYearList').html(divContent);
}