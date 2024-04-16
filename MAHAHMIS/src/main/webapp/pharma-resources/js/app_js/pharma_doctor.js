setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}

function resetDoctorValues() {
	$('#doctorMaster').find('input:text').val('');
	$('#doctorMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}


function deleteDoctor(doctId) {
	resetDoctorValues();
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	var doctorId = parseInt(doctId);
	
		var inputs = [];
		inputs.push('doctorId=' + doctorId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/doctor/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getDoctorsList();
						if (r == true) {
							/*$('#resultDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");
							hideResultDiv();
							location.reload();*/
						} else {
							$('#resultDiv')
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

function edit(doctorId) {
	$('#doctorId').val($('#doctorId' + doctorId).val());
	$('#txtDoctorName').val($('#doctorName' + doctorId).val());
	$('#txtAddress').val($('#doctorAddress' + doctorId).val());
	$('#txtPhone').val($('#doctorPhone' + doctorId).val());
	$('#txtRegNo').val($('#doctorRegNo' + doctorId).val());
	
}

function getDoctorsList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/doctor/doctorsList",
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

function searchDoctor(doctId) {
	resetDoctorValues();
	
	var inputs = [];
	inputs.push('doctorId=' + doctId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/doctor/getDoctorById",
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
				+ " <tr> <td class='col-md-1'>"
				+ (i + 1)
				+ "<input type='hidden' id='doctorId"
				+ r[i].doctorId
				+ "' value='"
				+ r[i].doctorId
				+ "'></td> <td class='col-md-2'>"
				+ r[i].doctorName
				+ "<input type='hidden' id='doctorName"
				+ r[i].doctorId
				+ "' value='"
				+ r[i].doctorName
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].doctorAddress
				+ "<input type='hidden' id='doctorAddress"
				+ r[i].doctorId
				+ "' value='"
				+ r[i].doctorAddress
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].doctorPhone
				+ "<input type='hidden' id='doctorPhone"
				+ r[i].doctorId
				+ "' value='"
				+ r[i].doctorPhone
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].doctorRegNo
				+ "<input type='hidden' id='doctorRegNo"
				+ r[i].doctorId
				+ "' value='"
				+ r[i].doctorRegNo
				+ "'></td> <td class='col-md-1 '> <button id='btnEdit"
				+ r[i].doctorId
				+ "' class='btn btn-xs btn-success' onclick='edit("
				+ r[i].doctorId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteDoctor("
				+ r[i].doctorId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#divDoctorList').html(divContent);
}