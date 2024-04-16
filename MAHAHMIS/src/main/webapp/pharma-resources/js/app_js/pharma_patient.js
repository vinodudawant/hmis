setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}

function resetPatientValues() {
	$('#patientMaster').find('input:text').val('');
	$('#patientMaster').find('input:hidden').val('');
	$('#searchBox').val('');
	$('#txtPatDOB').val('');
}

function splitPatientMasterContent(content) {
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

function searchPatient(patId) {
	resetPatientValues();
		var inputs = [];
	inputs.push('patId=' + patId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "getPatientById",
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

function deletePatient(patientId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('patId=' + patientId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/patient/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");

					},
					success : function(r) {
						/* getDoctorsList(); */
						if (r == true) {

							/*location.reload(true);
							$("#msgDiv")
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");*/
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

function editPatient(patId) 
{
	$('#patId').val($('#patId' + patId).val());
	$('#txtPatName').val($('#patName' + patId).val());
	$('#txtPatAddress').val($('#patAddress' + patId).val());
	$('#txtPatMobile').val($('#patMobile' + patId).val());
	$('#txtPatCode').val($('#patCode' + patId).val());
	$('#txtPatPhone').val($('#patPhone' + patId).val());
	$('#txtPatEmail').val($('#patEmail' + patId).val());
	
	$('#txtPatDOB').val($('#patDOB' + patId).val());
	if($('#patOpeningDebit' + patId).val()!=null && $('#patOpeningDebit' + patId).val()!="null" )
	$('#txtPatOpeningDebit').val($('#patOpeningDebit' + patId).val());
	if($('#patOpeningCredit' + patId).val()!=null && $('#patOpeningCredit' + patId).val()!="null" )
	$('#txtPatOpeningCredit').val($('#patOpeningCredit' + patId).val());
}
//get formatted date dd/mm/yyyy
function getDate(milliseconds)
{
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

function setTableContent(result)
{    var DOB="";
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) 
	{
		if((r[i].patDOB)!=null && (r[i].patDOB)!="null")
		   DOB = getDate(r[i].patDOB);
		else
			DOB=""; 
		divContent = divContent
				+ " <tr> <td class='col-md-1'>"
				+ (i + 1)
				+ " <input type='hidden' id='patId"
				+ r[i].patId
				+ "' value='"
				+ r[i].patId
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].patName
				+ "<input type='hidden' id='patName"
				+ r[i].patId
				+ "' value='"
				+ r[i].patName
				+ "'></td> "

				+ "<td class='col-md-2 '>"
				+ r[i].patAddress
				+ "<input type='hidden' id='patAddress"
				+ r[i].patId
				+ "' value='"
				+ r[i].patAddress
				+ "'></td> "

				+ "<td class='col-md-2 '>"
				+ r[i].patMobile
				+ "<input type='hidden' id='patMobile"
				+ r[i].patId
				+ "' value='"
				+ r[i].patMobile
				+ "'></td> "

				+ "<td style='display:none;' class='col-md-2 '>"
				+ r[i].patCode
				+ "<input type='hidden' id='patCode"
				+ r[i].patId
				+ "' value='"
				+ r[i].patCode
				+ "'></td> "

				+ "<td style='display:none;' class='col-md-2 '>"
				+ r[i].patPhone
				+ "<input type='hidden' id='patPhone"
				+ r[i].patId
				+ "' value='"
				+ r[i].patPhone
				+ "'></td> "

				+ "<td style='display:none;' class='col-md-2 '>"
				+ r[i].patEmail
				+ "<input type='hidden' id='patEmail"
				+ r[i].patId
				+ "' value='"
				+ r[i].patEmail
				+ "'></td> "

				+ "<td style='display:none;' class='col-md-2 '>"
				+ DOB
				+ "<input type='hidden' id='patDOB"
				+ r[i].patId
				+ "' value='"
				+ DOB
				+ "'></td> "

				+ "<td style='display:none;' class='col-md-2 '>"
				+ r[i].patOpeningDebit
				+ "<input type='hidden' id='patOpeningDebit"
				+ r[i].patId
				+ "' value='"
				+ r[i].patOpeningDebit
				+ "'></td> "

				+ "<td style='display:none;' class='col-md-2 '>"
				+ r[i].patOpeningCredit
				+ "<input type='hidden' id='patOpeningCredit"
				+ r[i].patId
				+ "' value='"
				+ r[i].patOpeningCredit
				+ "'></td> "

				+ "<td class='col-md-1 '> <button id='btnEdit"
				+ r[i].patId
				+ "' class='btn btn-xs btn-success' onclick='editPatient("
				+ r[i].patId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deletePatient("
				+ r[i].patId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#divPatientList').html(divContent);
}
