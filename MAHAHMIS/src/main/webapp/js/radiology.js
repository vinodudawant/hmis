//var count = 1;
var divCount = 1;
var deleteTestSmplColFlg="N";
var risReportFlag="N";
var lengthofServiceAdvised=0;
function saveradioAssignedTests(pageType, ipdOPd) {
 	var investigationtestId = 0;
	var queryType = "";
	var investigationInstruction = "";
	var investigationClinicalNote = "";
	var investigationUrgentFlag = 0;
	var testType = "";
	var bodyPart = "";
	var doctor = "";
	var hospital = "";
	// var testobj = "";
	var charges1 = 0;
	var billSlaveID = 0;
	var investigationSlaveID = 0;

	var hallid = 0;
	if (ipdOPd == "ipd" && pageType == "IPDDocStation") {
		var pobj = $("#divPatId").html();
		var myobj = eval('(' + pobj + ')');
		hallid = myobj.oBed.hi;
	} else {
		hallid = 0;
	}

	if ((ipdOPd == "ipd" && pageType == "IPDDocStation")
			|| (ipdOPd == "opd" && pageType == "DoctorDesk")
			|| (ipdOPd == "diagnosis" && pageType == "DiagnosisAssignTest")) {

		queryType = $("#InvestigationQueryType").val();
		investigationtestId = $('#investigationtestId').val();
		investigationInstruction = $("#investigationInstruction").val();
		investigationClinicalNote = $("#investigationClinicalNote").val();
		testType = $("#radiologyTestType :selected").val();
		bodyPart = $("#radiologyBodyPart :selected").val();
		doctor = $("#doctor2 :selected").val();
		hospital = $("#hospital2 :selected").val();
		charges1 = $("#charges1").val();

		if (investigationtestId == 0 || investigationtestId == "undefined"
				|| investigationtestId == "") {
			alert("Please enter valid test Name.");
			return false;
		}
		
		if (testType == undefined) {
			testType = 0;
		}
		
		if (bodyPart == undefined) {
			bodyPart = 0;
		}

		if ($('#InvestigationUrgent').is(':checked')) {
			investigationUrgentFlag = 1;
		} else {
			investigationUrgentFlag = 0;
		}

		if (charges1 == "" || charges1 == undefined) {
			charges1 = 0;
		}

		if (queryType == "update") {
			billSlaveID = $("#billSlaveID").val();
			investigationSlaveID = $("#investigationSlaveID").val();

			if (billSlaveID == "" || billSlaveID == "0"
					|| billSlaveID == undefined) {
				alert("Improper billSlaveID data...");
				return;
			}

		}

	}

	var trId = $("#treatmentId").val();
	var totalAmt = $("#charges1").val();http://localhost:8082/EhatEnterprise/dd_main_dashboard.jsp?tid=33865&callfrom=OPDID&pid=4428#collapseVitalshttp://localhost:8082/EhatEnterprise/NewFile1.jsp?tid=33865&callfrom=OPDID&pid=4428#collapseVitalspatHeader
	var inputs = [];
	inputs.push('action=saveRadiologyAssignedTests');
	inputs.push('trId=' + trId);
	inputs.push('totalAmt=' + totalAmt);
	inputs.push('queryType=' + queryType);
	inputs.push('radiologytestId=' + investigationtestId);
	// inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('billSlaveID=' + billSlaveID);
	inputs.push('investigationSlaveID=' + investigationSlaveID);
	inputs.push('investigationInstruction=' + investigationInstruction);
	inputs.push('investigationClinicalNote=' + investigationClinicalNote);
	inputs.push('testType=' + testType);
	inputs.push('bodyPart=' + bodyPart);
	inputs.push('doctor=' + doctor);
	inputs.push('hospital=' + hospital);
	inputs.push('charges1=' + charges1);
	inputs.push('investigationUrgentFlag=' + investigationUrgentFlag);
	inputs.push('hallid=' + hallid);

	if (ipdOPd == "ipd") {
		inputs.push('ipdOPd=' + ipdOPd);
	} else if (ipdOPd == "opd") {
		inputs.push('ipdOPd=' + 'opd');
	} else if (ipdOPd == "diagnosis") {
		inputs.push('ipdOPd=' + 'diagnosis');
	}

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);

					if ((ipdOPd == "ipd" && pageType == "IPDDocStation")
							|| (ipdOPd == "opd" && pageType == "DoctorDesk")
							|| (ipdOPd == "diagnosis" && pageType == "DiagnosisAssignTest")) {

						$("#InvestigationTestName").val("");
						$("#InvestigationTestName").prop("readonly", false);
						$("#InvestigationQueryType").val("insert");
						$('#investigationtestId').val("0");
						$("#investigationInstruction").val("");
						$("#investigationClinicalNote").val("");
						$("#testCodeInvestigation").val("");
						$("#radiologyTestType").val(0);
						$("#radiologyBodyPart").val(0);
						$("#doctor2").val(0);
						$("#hospital2").val(0);
						$("#charges1").val("0");
						$("#billSlaveID").val("0");
						$("#investigationSlaveID").val("0");
						$('#InvestigationUrgent').prop('checked', false);

					//fetchTestDashboard();
						// window.location.reload(true);
					}

					if ($("#pageType").val() == "ipd") {
						editPatientRadioligyAssignTests("IPD");
					} else {
						if (pageType == "DoctorDesk") {
							$('#radiologytestId').val(0);
							$("#patAmt").val(0);
							$("#idTestSlave").val(0);
							$("#radiologyTestName").val("");
							$("#radiologyInstruction").val("");
							$("#radiologyClinicalNote").val("");
							$("#radiologyTestType").val(0);
							$("#radiologyBodyPart").val(0);
							$("#testCode").val('');
						} else {
							// window.location.href =
							// "RadiologyPatientAssignTestDashboard.jsp";
						}

					}

				}
			});

}
function searchTest(pageName) {
	count = 1;
	var testType;

	if (pageName == 'Radiology') {
		testType = 'Radiology';
	} else {
		testType = $("#testType").val();
	}

	var strValue = $("#strValue").val();
	strValue = $.trim(strValue);
	if (strValue == "") {
		alert("Please Enter Test Name For Search");
		SetFocus("strValue");
		return false;
	}
	var inputs = [];
	inputs.push('action=searchTest');
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('testType=' + testType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.testList.length == 0) {

				if (testType == "dental" || testType == "casuality") {
					alert("Services Not Found");
				} else {
					alert("Test Not Found");
				}

				SetFocus("strValue");
			} else {

				$("#testDiv").setTemplate(defaultTestViewTemp);
				$("#testDiv").processTemplate(pobj1);
			}

		}
	});
}

function savecardioAssignedTests(pageType) {
	var patientTests = {
		testList : []
	};
	var queryType = "";
	if (pageType == "DoctorDesk") {

		queryType = $("#InvestigationQueryType").val();
		var testId = $('#investigationtestId').val();
		var investigationInstruction = $("#investigationInstruction").val();
		var investigationClinicalNote = $("#investigationClinicalNote").val();

		var investigationUrgentFlag = 0;
		if ($('#InvestigationUrgent').is(':checked')) {
			investigationUrgentFlag = 1;
		} else {
			investigationUrgentFlag = 0;
		}
		if (testId == 0) {
			alert("Please enter test Name.");
			return false;
		} else {
			patientTests.testList.push({
				"charges1" : $("#patAmt").val(),
				"test_ID" : testId,
				"id" : $("#idTestSlave").val(),
				"investigationInstruction" : investigationInstruction,
				"investigationClinicalNote" : investigationClinicalNote,
				"investigationUrgentFlag" : investigationUrgentFlag,
			});
		}
	} else {
		queryType = $("#queryType").val();
		var rowCount = $("#divCount").val();
		if (rowCount == 0) {
			alert("Please Assign Test First");
			return false;
		}

		var allVals = [];
		$.each($('#checkbox:checked'), function() {
			allVals.push($(this).val());
		});
		if (allVals.length != 0) {
			alert("Please add selected test for assignment");
			return false;
		}

		for ( var i = 1; i < rowCount; i++) {
			var radios = $('input:checkbox[name=assignedCheckbox' + i + ']');

			if (radios.val() == 0) {
				alert("Please add selected test for assignment");
				return false;
			} else {
				patientTests.testList.push({
					"charges1" : $("#patAmt" + i).html(),
					"test_ID" : radios.val(),
					"id" : $("#idTestSlave" + i).val()

				});
			}
		}
	}
	var patientradioTests = JSON.stringify(patientTests);
	var trId = $("#treatmentId").val();

	var inputs = [];
	inputs.push('action=saveCardiologyAssignedTests');
	inputs.push('patientTests=' + patientradioTests.decodeSpecialChars());
	inputs.push('trId=' + trId);
	inputs.push('queryType=' + queryType);

	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					if ($("#pageType").val() == "ipd") {
						editPatientcardioAssignTests("IPD");
					} else {
						if (pageType == "DoctorDesk") {
							$('#investigationtestId').val(0);
							$("#patAmt").val(0);
							$("#idTestSlave").val(0);
							$("#InvestigationTestName").val("");
						} else {
							window.location.href = "cardiologyPatientAssignTestDashboard.jsp";
						}
					}
				}
			});
}

function savecasualityAssignedTests(pagetype) {
	var queryType = "";
	queryType = $("#casualityServiceQueryType").val();
	var testId = $('#casualitytestId').val();
	var doctorId = $("#doctor3 :selected").val();
	var hospitalId = $("#hospital3 :selected").val();
	var casualityInstruction = $("#casualityInstruction").val();
	var casualityClinicalNote = $("#casualityClinicalNote").val();
	var billSlaveID = 0;
	var idCasualtyTreatment = 0;

	if (testId == 0 || testId == "undefined" || testId == "") {
		alert("Please enter valid test Name.");
		return false;
	}

	if ($('#casualityUrgent').is(':checked')) {
		casualityUrgent = 1;
	} else {
		casualityUrgent = 0;
	}

	if (queryType == "update") {
		billSlaveID = $("#billSlaveID").val();
		idCasualtyTreatment = $("#idCasualtyTreatment").val();

		if (billSlaveID == "" || billSlaveID == "0" || billSlaveID == undefined) {
			alert("Improper billSlaveID data...");
			return;
		}

	}

	var trId = $("#treatmentId").val();
	var inputs = [];
	inputs.push('action=saveCasualityAssignedTests');
	inputs.push('trId=' + trId);
	inputs.push('testId=' + testId);
	inputs.push('queryType=' + queryType);
	inputs.push('pagetype=' + pagetype);
	inputs.push('doctorId=' + doctorId);
	inputs.push('hospitalId=' + hospitalId);
	inputs.push('casualityInstruction=' + casualityInstruction);
	inputs.push('casualityClinicalNote=' + casualityClinicalNote);
	inputs.push('casualityUrgent=' + casualityUrgent);
	inputs.push('billSlaveID=' + billSlaveID);
	inputs.push('idCasualtyTreatment=' + idCasualtyTreatment);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);

			if ($("#pageType").val() == "IPD") {
				// editPatientRadioligyAssignTests("IPD");
			} else {
				if ($("#pageType").val() == "DoctorDesk") {
					$('#casualitytestId').val(0);
					$("#patAmt").val(0);
					$("#idTestSlave").val(0);
					$("#txtCasualityTestName").val("");
					$("#txtCasualityTestName").removeAttr('readonly');
					$("#casualityTest_Code").val("");
					$("#casualityTest_Code").removeAttr('readonly');
					$("#casualityInstruction").val("");
					$("#casualityClinicalNote").val("");
					$("#doctor3").val("0");
					$("#hospital3").val("0");
					$('#casualityUrgent').prop('checked', false);
					//fetchTestDashboard();
				} else {
					window.location.href = "OPDDoctorsDeskDashboard.jsp";
				}

			}

		}

	});

}

function savePhysiotherapyAssignedTests(pagetype) {
	var queryType = "";
	queryType = $("#physiotherapyQueryType").val();
	var testId = $('#physiotherapytestId').val();
	var doctorId = $("#doctorForPhysiotherapy :selected").val();
	var hospitalId = $("#hospitalForPhysiotherapy :selected").val();
	var physiotherapyInstruction = $("#physiotherapyInstruction").val();
	var physiotherapyClinicalNote = $("#physiotherapyClinicalNote").val();
	var billSlaveID = 0;
	var idPhysiotherapyTreatment = 0;
	
	var hallid = 0;
	if (pagetype == "DoctorStation") {
		var pobj = $("#divPatId").html();
		var myobj = eval('(' + pobj + ')');
		hallid = myobj.oBed.hi;
	} else {
		hallid = 0;
	}

	var pageType = "";
	if (pagetype == "DoctorDesk") {
		pageType = pagetype;
	} else if (pagetype == "DoctorStation") {
		pageType = pagetype;
	} else {
		pageType = "diagnosis";
	}

	if (testId == 0 || testId == "undefined" || testId == "") {
		alert("Please enter valid test Name.");
		return false;
	}

	if ($('#physiotherapyUrgent').is(':checked')) {
		physiotherapyUrgent = 1;
	} else {
		physiotherapyUrgent = 0;
	}

	if (queryType == "update") {
		billSlaveID = $("#billSlaveID").val();
		idPhysiotherapyTreatment = $("#idPhysiotherapyTreatment").val();

		if (billSlaveID == "" || billSlaveID == "0" || billSlaveID == undefined) {
			alert("Improper billSlaveID data...");
			return;
		}
	}

	var trId = $("#treatmentId").val();
	var inputs = [];
	inputs.push('action=savePhysiotherapyAssignedTests');
	inputs.push('trId=' + trId);
	inputs.push('testId=' + testId);
	inputs.push('queryType=' + queryType);
	inputs.push('pagetype=' + pageType);
	inputs.push('doctorId=' + doctorId);
	inputs.push('hospitalId=' + hospitalId);
	inputs.push('physiotherapyInstruction=' + physiotherapyInstruction);
	inputs.push('physiotherapyClinicalNote=' + physiotherapyClinicalNote);
	inputs.push('physiotherapyUrgent=' + physiotherapyUrgent);
	inputs.push('billSlaveID=' + billSlaveID);
	inputs.push('idPhysiotherapyTreatment=' + idPhysiotherapyTreatment);
	inputs.push('hallid=' + hallid);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);

			if ($("#pageType").val() == "DoctorDesk") {
				$('#physiotherapytestId').val(0);
				$("#patAmtphysio").val(0);
				$("#idTestSlave").val(0);
				$("#txtPhysiotherapyTestName").val("");
				$("#txtPhysiotherapyTestName").removeAttr('readonly');
				$("#physiotherapyInstruction").val("");
				$("#physiotherapyClinicalNote").val("");
				$("#doctorForPhysiotherapy").val("0");
				$("#hospitalForPhysiotherapy").val("0");
				$('#physiotherapyUrgent').prop('checked', false);
			//	fetchTestDashboard();
			} else if (pageType == "DoctorStation") {
				$('#physiotherapytestId').val(0);
				$("#patAmtphysio").val(0);
				$("#idTestSlave").val(0);
				$("#physiotherapyTest_Code").val("");
				$("#txtPhysiotherapyTestName").val("");
				$("#txtPhysiotherapyTestName").removeAttr('readonly');
				$("#physiotherapyInstruction").val("");
				$("#physiotherapyClinicalNote").val("");
				$("#doctorForPhysiotherapy").val("0");
				$("#hospitalForPhysiotherapy").val("0");
				$('#physiotherapyUrgent').prop('checked', false);
				//fetchTestDashboard();
			} else {
				window.location.href = "OPDDoctorsDeskDashboard.jsp";
			}
		}
	});
}

function saveOtherServicesAssignedTests(pagetype) {
	var queryType = "";
	queryType = $("#otherServiceQueryType").val();
	var testId = $('#othertestId').val();
	var doctorId = $("#doctorForOther :selected").val();
	var hospitalId = $("#hospitalForOther :selected").val();
	var otherInstruction = $("#otherInstruction").val();
	var otherClinicalNote = $("#otherClinicalNote").val();
	var billSlaveID = 0;
	var idOtherTreatment = 0;
	
	var hallid = 0;
	if (pagetype == "DoctorStation") {
		var pobj = $("#divPatId").html();
		var myobj = eval('(' + pobj + ')');
		hallid = myobj.oBed.hi;
	} else {
		hallid = 0;
	}

	var pageType = "";
	if (pagetype == "DoctorDesk") {
		pageType = pagetype;
	} else if (pagetype == "DoctorStation") {
		pageType = pagetype;
	} else {
		pageType = "Diagnostics";
	}

	if (testId == 0 || testId == "undefined" || testId == "") {
		alert("Please enter valid test Name.");
		return false;
	}

	if ($('#otherUrgent').is(':checked')) {
		otherUrgent = 1;
	} else {
		otherUrgent = 0;
	}

	if (queryType == "update") {
		billSlaveID = $("#billSlaveID").val();
		idOtherTreatment = $("#idOtherTreatment").val();

		if (billSlaveID == "" || billSlaveID == "0" || billSlaveID == undefined) {
			alert("Improper billSlaveID data...");
			return;
		}

	}

	var trId = $("#treatmentId").val();
	var inputs = [];
	inputs.push('action=saveOtherServicesAssignedTests');
	inputs.push('trId=' + trId);
	inputs.push('testId=' + testId);
	inputs.push('queryType=' + queryType);
	inputs.push('pagetype=' + pageType);
	inputs.push('doctorId=' + doctorId);
	inputs.push('hospitalId=' + hospitalId);
	inputs.push('otherInstruction=' + otherInstruction);
	inputs.push('otherClinicalNote=' + otherClinicalNote);
	inputs.push('otherUrgent=' + otherUrgent);
	inputs.push('billSlaveID=' + billSlaveID);
	inputs.push('idOtherTreatment=' + idOtherTreatment);
	inputs.push('hallId=' + hallid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			if (pageType == "DoctorDesk") {
				$('#othertestId').val(0);
				$("#patAmtOther").val(0);
				$("#idTestSlave").val(0);
				$("#txtOtherTestName").val("");
				$("#txtOtherTestName").removeAttr('readonly');
				$("#otherInstruction").val("");
				$("#otherClinicalNote").val("");
				$("#doctorForOther").val("0");
				$("#hospitalForOther").val("0");
				$('#otherUrgent').prop('checked', false);
			//	fetchTestDashboard();
			} else if (pageType == "DoctorStation") {
				$('#othertestId').val(0);
				$("#patAmtOther").val(0);
				$("#idTestSlave").val(0);
				$("#txtOtherTestName").val("");
				$("#txtOtherTestName").removeAttr('readonly');
				$("#otherInstruction").val("");
				$("#otherClinicalNote").val("");
				$("#doctorForOther").val("0");
				$("#hospitalForOther").val("0");
				$('#otherUrgent').prop('checked', false);
			//	fetchTestDashboard();
			} else if (pageType == "Diagnostics") {
				$('#othertestId').val(0);
				$("#patAmtOther").val(0);
				$("#idTestSlave").val(0);
				$("#txtOtherTestName").val("");
				$("#txtOtherTestName").removeAttr('readonly');
				$("#otherInstruction").val("");
				$("#otherClinicalNote").val("");
				$("#doctorForOther").val("0");
				$("#hospitalForOther").val("0");
				$('#otherUrgent').prop('checked', false);
			//	fetchTestDashboard();
			} else {
				window.location.href = "OPDDoctorsDeskDashboard.jsp";
			}
		}
	});
}

function saveDentalAssignServices() {
	var queryType = $("#queryType").val();
	var rowCount = $("#divCount").val();
	if (rowCount == 1) {
		alert("Please Assign Services First");
		return false;
	}
	if (queryType == "update") {
		testobj = $("#div1").html();
		// testobj = eval('(' + testobj + ')');
	} else {
		testobj = "";
	}
	var patientTests = {
		testList : []
	};
	for ( var i = 1; i < rowCount; i++) {
		var radios = $('input:checkbox[name=assignedCheckbox' + i + ']');
		// allVals.push(radios.val());

		if (radios.size() == 0) {
		} else {
			patientTests.testList.push({
				"charges1" : $("#patAmt" + i).html(),
				"test_ID" : radios.val()

			});
		}
	}
	var patientradioTests = JSON.stringify(patientTests);
	var trId = $("#treatmentId").val();

	var inputs = [];
	inputs.push('action=SaveDentalAssignServices');
	inputs.push('patientTests=' + patientradioTests.decodeSpecialChars());
	inputs.push('trId=' + trId);
	inputs.push('queryType=' + queryType);
	inputs.push('testobj=' + testobj);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);

					if (ajaxResponse == "Patient Services Assigned Successfully.") {
						window.location.href = "DentalServicesDashboard.jsp";
					} else if (ajaxResponse == "Patient Services Updates Successfully.") {
						window.location.href = "DentalPatientDashboard.jsp";
					}
					// window.location.href = "PathologyPatientDashboard.jsp";
				}
			});
}

function saveCasualityAssignServices() {
	var queryType = $("#queryType").val();
	var rowCount = $("#divCount").val();
	if (rowCount == 1) {
		alert("Please Assign Services First");
		return false;
	}
	if (queryType == "update") {
		testobj = $("#div1").html();
		// testobj = eval('(' + testobj + ')');
	} else {
		testobj = "";
	}
	var patientTests = {
		testList : []
	};
	for ( var i = 1; i < rowCount; i++) {
		var radios = $('input:checkbox[name=assignedCheckbox' + i + ']');
		// allVals.push(radios.val());

		if (radios.size() == 0) {
		} else {

			if ($("#txtQty" + i).val() == "") {

				alert("Please Enter Quantity For #No: " + i);
				SetFocus("txtQty" + i);
				return false;
			} else {

				patientTests.testList.push({
					"suggest" : $("#patAmt" + i).html(),
					"qty" : $("#txtQty" + i).val(),
					"test_ID" : radios.val()

				});
			}
		}
	}

	var patientradioTests = JSON.stringify(patientTests);
	var trId = $("#treatmentId").val();

	var inputs = [];
	inputs.push('action=SaveCausalityAssignServices');
	inputs.push('patientTests=' + patientradioTests.decodeSpecialChars());
	inputs.push('trId=' + trId);
	inputs.push('queryType=' + queryType);
	inputs.push('testobj=' + testobj);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			if ($("#pageType").val() == "ipd") {
				editCasualtyServAssignPat("IPD");
			} else {
				window.location.href = "CasualityServicesDashboard.jsp";
			}

		}
	});
}

function removeradioAssignedTest() {

	var allVals = [];
	$.each($('#assignedCheckbox:checked'), function() {
		allVals.push($(this).val());
	});

	if (allVals.length == 0) {
		alert("Please Select Test Name First");
		return false;
	}

	var testIds = [];
	var divCount = $("#divCount").val();
	var p = 1;
	var q = divCount;
	if (allVals.length != 0) {
		for ( var i = 0; i < q; i++) {

			var $radios = $('input:checkbox[name=assignedCheckbox' + p + ']');
			if ($radios.is(':checked') == true) {

				var testId = $("#idTestSlave" + p).val();
				if (testId != undefined && testId != "") {
					testIds.push(testId);
				}

				var remTotal = $("#patAmt" + p).html();
				var total = $("#divtotalAmt").html();
				total = parseFloat(total) - parseFloat(remTotal);
				$("#divtotalAmt").html(total);
				$("#row" + p).remove();
				// divCount--;
			}
			p++;

		}
	}
	$("#divCount").val(divCount);

	if (slaveIds.length != 0) {
		var r = confirm("Are You Confirm To Remove Test?");
		if (r == true) {
			var inputs = [];
			inputs.push('action=removeAssignedTest');
			inputs.push('slaveIds=' + testIds);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(ajaxResponse);
					// window.location = 'PathologyEditPatientAssignTests.jsp';
				}
			});
		} else {
			location.reload();
		}
	}
}

function addRadiologyTest() {

	var allVals = [];
	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});
	if (allVals.length == 0) {
		alert("Please Select Test Name First");
		return false;
	}
	var divCount = $("#divCount").val();
	if (divCount == undefined)
		divCount = 1;
	myArray = JSON.parse($("#testDetails").html());
	for ( var k = 0; k < myArray.testList.length; k++) {
		if (allVals.length != 0) {
			for ( var j = 0; j < allVals.length; j++) {
				if (myArray.testList[k].test_ID == allVals[j]) {
					myObj = myArray.testList[k];
					myObj = JSON.stringify(myObj);
					myObj = JSON.parse(myObj.decodeSpecialChars());

					divId = "row" + divCount;
					var x = document.createElement('tr');
					x.setAttribute('id', divId);

					document.getElementById("assignTestDiv").appendChild(x);
					document.getElementById(divId).innerHTML = '<td class="col-sm-1-1 center" style="height: 21.5px;">'
							+ divCount
							+ '</td><td id="uname2" class="col-sm-7-1 center" style="height: 21.5px;">'
							+ myObj.tname
							+ '</td><td id="patAmt'
							+ divCount
							+ '" class="col-sm-2-1 center" style="height: 21.5px;">'
							+ myObj.charges1
							+ '</td><td id="utype2" class="col-sm-2-1 center" style="height: 21.5px;"><input id="assignedCheckbox" name="assignedCheckbox'
							+ divCount
							+ '" type="checkbox" value="'
							+ myObj.test_ID + '" /></td></tr>';

					var total = $("#divtotalAmt").html();
					total = parseFloat(total) + parseFloat(myObj.charges1);
					$("#divtotalAmt").html(total);
					divCount++;
				}
			}
		}
	}

	$("#divCount").val(divCount);

	$.each($('#checkbox:checked'), function() {
		$(this).removeAttr('checked');
	});

}

function addCausalityTest() {

	var allVals = [];
	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});
	if (allVals.length == 0) {
		alert("Please Select Test Name First");
		return false;
	}
	var divCount = $("#divCount").val();
	if (divCount == undefined)
		divCount = 1;
	var myArray = JSON.parse($("#testDetails").html());
	for ( var k = 0; k < myArray.testList.length; k++) {
		if (allVals.length != 0) {
			for ( var j = 0; j < allVals.length; j++) {
				if (myArray.testList[k].test_ID == allVals[j]) {
					myObj = myArray.testList[k];
					myObj = JSON.stringify(myObj);
					myObj = JSON.parse(myObj.decodeSpecialChars());

					var x = document.createElement('div');
					x.setAttribute('id', 'divId' + divCount);
					x
							.setAttribute('style',
									'width:100%; height: 28px; border-bottom: 1px solid #069;');

					document.getElementById("assignTestDiv").appendChild(x);
					document.getElementById('divId' + divCount).innerHTML = '<div style="width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
							+ divCount
							+ '</div><div id="uname2" style="width: 52%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;">'
							+ myObj.tName
							+ '</div><div id="patAmt'
							+ divCount
							+ '" style="width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;">'
							+ myObj.charges1
							+ '</div></div><div id="utype2" style="width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;"><input type="text" onkeypress="return validateNumbers(event)" value="1" id="txtQty'
							+ divCount
							+ '" style="width: 80%;" /></div><div id="utype2" style="width: 4%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: center;"><input id="assignedCheckbox" name="assignedCheckbox'
							+ divCount
							+ '" type="checkbox" value="'
							+ myObj.test_ID + '"></div>';

					var total = $("#divtotalAmt").html();
					total = parseFloat(total) + parseFloat(myObj.charges1);
					$("#divtotalAmt").html(total);
					divCount++;
				}
			}
		}
	}

	$("#divCount").val(divCount);
	$.each($('#checkbox:checked'), function() {
		$(this).removeAttr('checked');
	});

}

defaultTestViewTemp = "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.testList as tl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-7-1 center' style='height: 21.5px;'>{$T.tl.tname}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.tl.charges1}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
		+ "<input type='checkbox' id='checkbox' value='{$T.tl.test_ID}' />"
		+ "</td>" + "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewTest(pageName) {
	count = 1;
	var testType;

	if (pageName == 'Radiology' || pageName == "RadioGroup") {
		testType = pageName;
	} else {

		testType = $("#testType").val();
	}
	var inputs = [];
	inputs.push('action=fetchTest');
	inputs.push('testType=' + testType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajaxResponse = r;
					$("#testDetails").html(ajaxResponse);
					var pobj1 = eval('(' + ajaxResponse + ')');
					if (pageName == "RadioGroup") {
						$("#radiologyTestType")
								.setTemplate(
										"<option value='0'>Select</option>{#foreach $T.testList as tl}<option value='{$T.tl.test_ID}'>{$T.tl.tname}</option>{#/for}");
						$("#radiologyTestType").processTemplate(pobj1);
					} else {

						$("#testDiv").setTemplate(defaultTestViewTemp);
						$("#testDiv").processTemplate(pobj1);
					}
					setTimeout(function(){userAccess();},100);
				}
			});
}

var risTestTemplate = "<option value='0' onclick='setNewCustomizeTemp()'>-- Select --</option>{#foreach $T.testList as pattemplist}<option onclick='setRadiologyTemplate({$T.pattemplist.test_ID})'	value={$T.pattemplist.test_ID}>{$T.pattemplist.tname}</option>{#/for}";
var risTestTemplate1 = "<option value='0' onclick='setNewCustomizeTemp()'>-- Select --</option>{#foreach $T.testList as pattemplist}<option value={$T.pattemplist.test_ID}>{$T.pattemplist.tname}</option>{#/for}";

function fetchRisTest(Type, Name) {

	count = 1;
	var inputs = [];
	inputs.push('action=fetchTest');
	inputs.push('testType=' + Type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",//"AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');

			if (Name == "RisCr") {
				$("#selRisCrTempList").setTemplate(risTestTemplate);
				$("#selRisCrTempList").processTemplate(pobj1);

			} else {

				$("#selRisTempType").setTemplate(risTestTemplate1);
				$("#selRisTempType").processTemplate(pobj1);
			}
		}
	});
}

function uploadRadiologyFile() {

	var treatmentId = $("#treatmentId").val();
	var filePath = $("#fileUp").val();
	var txtimageNote = $("#txtimageNote").val();
	var radiologyTestId = $("#radiologyTestId").val();

	if (filePath.length == 0) {
		alert("Please Select File To Upload.");
		return false;
	} else if (txtimageNote == "") {
		alert("Please Enter File Comment");
		return false;
	} else {

		$("#fileUploadfrm").attr(
				"action",
				"CommonsFileUploadServlet?treatmentId=" + treatmentId
						+ "&filePath=" + filePath + "&txtimageNote="
						+ txtimageNote + "&radiologyTestId=" + radiologyTestId);
		setTimeout(function() {
			$("#fileUploadfrm").ajaxForm().submit();
		}, 500);
		setTimeout(function() {
			location.reload();
			$("#fileUp").val("");
			$("#txtimageNote").val("");
		}, 1000);
	}

}

function showRemoveButton() {
	$("#divRemoveBtn").show();
}

// var radiologyPatientAssignedTestDashboard = "{#foreach $T.liRadFlMstr as
// liRadFlMstr}<div style='width: 100%; height: 28px; border-bottom: 1px solid
// #069;'><div style='width: 4%; height: 23px; text-align: center; border-right:
// 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width:
// 13%;padding-left: 1%; height: 23px; text-align: center; border-right: 1px
// solid #069; padding-top: 5px;'>{#if $T.liRadFlMstr.liRadasgntest==''}
// {#else}{$T.liRadFlMstr.liRadasgntest[0].idRadtasgndt}{#/if}</div><div
// style='width: 19%; height: 23px; border-right: 1px solid #069; padding-left:
// 1%; padding-top: 5px;'>{$T.liRadFlMstr.objPat.tit}{$T.liRadFlMstr.objPat.fn}
// {$T.liRadFlMstr.objPat.mn} {$T.liRadFlMstr.objPat.ln}</div><div
// style='width:8%; height: 23px; border-right: 1px solid #069; padding-left:
// 1%; padding-top: 5px;'>{$T.liRadFlMstr.objPat.trid}</div><div style='width:
// 5.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%;
// padding-top: 3px; text-align:
// center;'>{$T.liRadFlMstsetEditPatientcardioAssignedTestTempr.objPat.ag}
// {$T.liRadFlMstr.objPat.agtp}</div><div style='width: 5%; height: 25px;
// border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;
// text-align: center;'>{$T.liRadFlMstr.objPat.sx}</div><div style='width: 7.5%;
// height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top:
// 3px; text-align: center;'>{$T.liRadFlMstr.objPat.mb}</div><div style='width:
// 9%; height: 25px; padding-left: 1%; padding-top: 3px; border-right: 1px solid
// #069;'><input
// onclick=editPatientRadioligyAssignTests({$T.liRadFlMstr.objPat.pi})
// style='font-size: 10px;' type='button' value='TESTS' class='edit'
// /></div><div style='width: 9.5%; height: 25px; padding-left: 0.5%;
// padding-top: 3px; border-right: 1px solid #069;'><input
// onclick=viewRadiologyFileUpload({$T.liRadFlMstr.radFlId}) style='font-size:
// 10px;' type='button' value='UPLOAD FILES' class='edit'
// /></div></div>{#/for}";
var radiologyPatientAssignedTestDashboard = "{#foreach $T.liRadFlMstr as liRadFlMstr}<tr>	<td class='col-md-1-1 center'>{count++}.</td>	<td class='col-md-1-1 center'>{#if		$T.liRadFlMstr.liRadasgntest==''}		{#else}{$T.liRadFlMstr.liRadasgntest[0].idRadtasgndt}{#/if}</td>	<td class='col-md-1-1 center'>{$T.liRadFlMstr.objPat.tit}{$T.liRadFlMstr.objPat.fn}		{$T.liRadFlMstr.objPat.mn} {$T.liRadFlMstr.objPat.ln}</td>	<td class='col-md-1-1 center'>{$T.liRadFlMstr.objPat.trid}</td>	<td class='col-md-1-1 center'>{$T.liRadFlMstr.objPat.ag}		{$T.liRadFlMstr.objPat.agtp}</td>	<td class='col-md-1-1 center'>{$T.liRadFlMstr.objPat.sx}</td>	<td class='col-md-1-1 center'>{$T.liRadFlMstr.objPat.mb}</td>	<td class='col-md-1-1 center'>		<input			onclick=editPatientRadioligyAssignTests({$T.liRadFlMstr.objPat.pi})			style='font-size: 10px;' type='button' value='TESTS' class='edit' /></td>	<td class='col-md-2-1 center'>		<input onclick=viewRadiologyFileUpload({$T.liRadFlMstr.radFlId})			style='font-size: 10px;' type='button' value='UPLOAD FILES'			class='edit' />	</td></tr>{#/for}";

function viewRadiologyFileUpload(radFlId) {
	myArray = JSON.parse($("#radiologyAllPatInfo").html());
	for ( var i = 0; i < myArray.liRadFlMstr.length; i++) {
		if (myArray.liRadFlMstr[i].radFlId == radFlId) {
			myObj = myArray.liRadFlMstr[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	window.location = "RadiologyPatientAssignTests.jsp?" + "myObj="
			+ encodeURIComponent(myObj);
}

function fetchRadiologyFiles(type) {

	var searchBy = "";
	var value = "";

	if (type == 'search') {

		var byName = $("#byName").val();
		var byId = $("#byId").val();

		if (byName != "" && byId != "") {
			alert("Please Search Either By Patient Id or by Patient Name!");
			SetFocus("byName");
			return false;
		} else if (byName == "" && byId == "") {
			alert("Please Enter Patient Name Or Patient Id!");
			SetFocus("byName");
			return false;
		} else {
			if (byName != "") {
				searchBy = "byName";
				value = byName;

			} else if (byId != "") {
				searchBy = "byId";
				value = byId;
			}
		}
	}

	var inputs = [];
	inputs.push('action=fetchRadiologyFiles');
	inputs.push('type=' + type);
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			$("#radiologyAllPatInfo").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(radiologyPatientAssignedTestDashboard);
			$("#container").processTemplate(pobj1);

		}
	});

}
var cardioPatientTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 1090px; margin-top: 9px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Patient Name</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Admission No</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Age</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Gender</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Contact No</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Tests</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 300px; max-height: auto;' id='TimeslotTD{countForNATable}'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr><td style='height: 21.5px;' class='numeric col-md-1 center'>{count++}.</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-2 center'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.objTreat.trCount}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.ag} {$T.pl.agtp}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.sx}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.mb}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'><input onclick=editPatientcardioAssignTests({$T.pl.pi}) style='font-size: 10px;' type='button'  value='EDIT TESTS' class='edit' /></td>"
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

function fetchCardiologyFiles(callFor) {

	var searchBy = "";
	var value = "";

	if (callFor == 'search') {

		var byName = $("#byName").val();
		var byId = $("#byId").val();

		if (byName != "" && byId != "") {
			alert("Please Search Either By Patient Id or by Patient Name!");
			SetFocus("byName");
			return false;
		} else if (byName == "" && byId == "") {
			alert("Please Enter Patient Name Or Patient Id!");
			SetFocus("byName");
			return false;
		} else {
			if (byName != "") {
				searchBy = "byName";
				value = byName;

			} else if (byId != "") {
				searchBy = "byId";
				value = byId;
			}
		}
	}

	var inputs = [];
	inputs.push('action=fetchCardiologyFiles');
	inputs.push('callFor=' + callFor);
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			count = 1;
			$("#cardiologyAllPatInfo").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(cardioPatientTemp);
			$("#container").processTemplate(pobj1);

		}
	});

}

var cardioPatientTempOther = "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 300px; max-height: auto;' id='TimeslotTD{countForNATable}'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr><td style='height: 21.5px;' class='numeric col-md-1 center'>{count++}.</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-2 center'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.objTreat.trCount}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.ag}	{$T.pl.agtp}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.sx}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.mb}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'><input onclick=editDentalServAssignPat({$T.pl.pi}) style='font-size: 10px;' type='button'  value='Edit Services' class='edit' /></td>"
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

function fetchDentalServicesPat(type) {
	count = 1;
	var searchBy = "";
	var value = "";

	if (type == 'search') {

		var byName = $("#byName").val();
		var byId = $("#byId").val();

		if (byName != "" && byId != "") {
			alert("Please Search Either By Patient Id or by Patient Name!");
			SetFocus("byName");
			return false;
		} else if (byName == "" && byId == "") {
			alert("Please Enter Patient Name Or Patient Id!");
			SetFocus("byName");
			return false;
		} else {
			if (byName != "") {
				searchBy = "byName";
				value = byName;

			} else if (byId != "") {
				searchBy = "byId";
				value = byId;
			}
		}
	}

	var inputs = [];
	inputs.push('action=FetchDentalServicesPat');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	inputs.push('type=' + type);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			$("#cardiologyAllPatInfo").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(cardioPatientTempOther);
			$("#container").processTemplate(pobj1);

		}
	});

}

function fetchCasualtyServicesPat(type) {

	count = 1;
	var searchBy = "";
	var value = "";

	if (type == 'search') {

		var byName = $("#byName").val();
		var byId = $("#byId").val();

		if (byName != "" && byId != "") {
			alert("Please Search Either By Patient Id or by Patient Name!");
			SetFocus("byName");
			return false;
		} else if (byName == "" && byId == "") {
			alert("Please Enter Patient Name Or Patient Id!");
			SetFocus("byName");
			return false;
		} else {
			if (byName != "") {
				searchBy = "byName";
				value = byName;

			} else if (byId != "") {
				searchBy = "byId";
				value = byId;
			}
		}
	}

	var inputs = [];
	inputs.push('action=FetchCasualtyServicesPat');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	inputs.push('type=' + type);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			$("#cardiologyAllPatInfo").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate($("#cardioPatient").html());
			$("#container").processTemplate(pobj1);

		}
	});

}

function editDentalServAssignPat(pid) {
	// alert(patientId);
	var myArray = JSON.parse($("#cardiologyAllPatInfo").html());
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];
			break;
		}
	}

	myObj = JSON.stringify(myObj);
	window.location = "DentalEditPatAssignServices.jsp?myObj="
			+ encodeURIComponent(myObj);
}

var editPatientcardioAssignedTestTemp = "{#foreach $T.trt as trt}"
		+ "<tr id='rowId{divCount}'>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{divCount}</td>"
		+ "<td id='uname2' class='col-sm-5-1 center' style='height: 21.5px;'>{$T.trt.tname}</td>"
		+ "<td id='patAmt{divCount}' class='col-sm-2-1 center' style='height: 21.5px;'>{$T.trt.test_fee}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.trt.date}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'><input id='assignedCheckbox' name='assignedCheckbox{divCount}' type='checkbox' value='{$T.trt.test_ID}'></td>"
		+ "<input type='hidden' id='idTestSlave{divCount}' value='{$T.trt.id}'>"
		+ "<input type='hidden' value='{divCount++}'></div>{#/for}"
		+ "<input	type='hidden' id='divCount' value='{divCount}' />";

function setEditPatientcardioAssignedTestTemp() {
	// $("#divtotalAmt").html(myObj.tlamt);
	var myObj = window.parent.document.getElementById("div1").innerHTML;
	var testmyObj = JSON.parse(myObj);
	$("#assignTestDiv").setTemplate(editPatientcardioAssignedTestTemp);
	$("#assignTestDiv").processTemplate(testmyObj);
	var testTotal = 0;
	for ( var i = 0; i < testmyObj.trt.length; i++) {
		testTotal = parseInt(testTotal) + parseInt(testmyObj.trt[i].test_fee);
	}
	$("#divtotalAmt").html(testTotal);
}

var editPatientCasualityAssignedTestTemp = "{#foreach $T.trt as trt}<div id='divId{divCount}'	style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div	style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{divCount}</div><div id='uname2' style='width: 52%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;'>{$T.trt.tname}</div><div id='patAmt{divCount}' style='width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.trt.test_fee}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'><input type='text' value='{$T.trt.serviceQty}' id='txtQty{divCount}' onkeypress='return validateNumbers(event)' style='width: 80%;' /></div><div style='width: 4%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: center;'>	<input id='assignedCheckbox' name='assignedCheckbox{divCount}' type='checkbox' value='{$T.trt.test_ID}'></div><input type='hidden' id='idTestSlave{divCount}' value='{$T.trt.id}'><input type='hidden' value='{divCount++}'></div>{#/for}<input	type='hidden' id='divCount' value='{divCount}' />";

function setEditPatientCasualityAssignedTestTemp() {
	var myObj = window.parent.document.getElementById("div1").innerHTML;
	myObj = JSON.parse(myObj);
	$("#assignTestDiv").setTemplate(editPatientCasualityAssignedTestTemp);
	$("#assignTestDiv").processTemplate(myObj);
	var testTotal = 0;
	for ( var i = 0; i < myObj.trt.length; i++) {
		testTotal = parseInt(testTotal) + parseInt(myObj.trt[i].test_fee);
	}
	$("#divtotalAmt").html(testTotal);
}

function removeRadiologyUploadFiles() {

	var allVals = [];
	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});
	if (allVals.length == 0) {
		alert("Please Select File Name First");
		return false;
	}

	var r = confirm("Are You Confirm To Remove File");
	if (r == true) {

		var inputs = [];
		inputs.push('action=removeRadiologyUploadFiles');
		inputs.push('fileComponentIds=' + allVals);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

var fileUploadTemp = "{#foreach $T.liRadFlComp as liRadFlComp}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count}.</div><div style='width: 20%; height: 23px; padding-left:1%; border-right: 1px solid #069; padding-top: 5px;'>{$T.liRadFlComp.fldt}</div><div style='width: 51%; padding-left: 1%; height: 23px; border-right: 1px solid #069; padding-top: 5px;'>{$T.liRadFlComp.flComm}</div><div	style='width: 18%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><a href='{$T.liRadFlComp.flPth}' target='_blank'>{$T.liRadFlComp.flNm}</a></div><div style='width: 2%; height: 23px; padding-left: 0%; padding-top: 5px;'><input type='checkbox' onclick='showRemoveButton()' id='checkbox' name='checkbox' value='{$T.liRadFlComp.idRadFlComp}' ></div></div><input type='hidden' value={count++}>{#/for}<input type='hidden' id='RowCount' value={--count}>";

var radiologyAssignedTestsTemp = "{#foreach $T.liRadasgntest as liRadasgntest}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6%; height: 24px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 72%; height: 23px; padding-left: 1%; border-right: 1px solid #069; padding-top: 5px;' id='testName{$T.liRadasgntest.idRadtasgn}'>{$T.liRadasgntest.objt.tName}</div><div style='width: 17%; height: 23px; padding-left: 1%; padding-top: 2.5px; text-align: center;'><input type='button' value='Upload' onclick='uploadFilesForRadiologyTest({$T.liRadasgntest.idRadtasgn})' class='edit'></div></div>{#/for}";

function setRadiologyAssignedTests(myObj) {

	$("#divRadiologyAssignedTest").setTemplate(radiologyAssignedTestsTemp);
	$("#divRadiologyAssignedTest").processTemplate(myObj);

}

function uploadFilesForRadiologyTest(idRadtasgn) {

	$("#lableTestName").html($("#testName" + idRadtasgn).html());
	$("#radiologyTestId").val(idRadtasgn);

	myArray = JSON.parse($("#div1").html());
	for ( var j = 0; j < myArray.liRadasgntest.length; j++) {
		if (myArray.liRadasgntest[j].idRadtasgn == idRadtasgn) {
			myObj = myArray.liRadasgntest[j];
			break;
		}
	}

	myObj = JSON.stringify(myObj);
	myObj = JSON.parse(myObj.decodeSpecialChars());

	count = 1;

	$("#radiologyDiv").setTemplate(fileUploadTemp);
	$("#radiologyDiv").processTemplate(myObj);
}

var editPatientRadiologyAssignedTestTemp = "{#foreach $T.liRadasgntest as liRadasgntest}<div id='divId{divCount}'	style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div	style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{divCount}</div><div id='uname2' style='width: 47%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;'>{$T.liRadasgntest.objt.tName}</div><div id='patAmt{divCount}' style='width: 17%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.liRadasgntest.objt.charges1}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>In Process</div><div style='width: 7%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: center;'>	<input id='assignedCheckbox' name='assignedCheckbox{divCount}' type='checkbox' value='{$T.liRadasgntest.objt.test_ID}'></div><input type='hidden' id='idTestSlave{divCount}' value='{$T.liRadasgntest.idRadtasgn}'></div><input type='hidden' value='{divCount++}'>{#/for}<input	type='hidden' id='divCount' value='{divCount}' />";

function setEditPatientradioAssignedTestTemp() {
	// $("#divtotalAmt").html(myObj.tlamt);
	var myObj = window.parent.document.getElementById("div1").innerHTML;
	myObj = JSON.parse(myObj);
	$("#assignTestDiv").setTemplate(editPatientRadiologyAssignedTestTemp);
	$("#assignTestDiv").processTemplate(myObj);
	$("#divtotalAmt").html(myObj.rtot);
}

function setPathologyTestHeadingandID() {
	setTimeout(function() {
		var headingName = $("#txtTestHeadingSearch").val();
		var headingNameArr = headingName.split("_");
		if (headingNameArr[1] == undefined) {
			alert("Please Enter Valid Test...");
			$("#txtTestHeadingSearch").val("");
			return false;
		} else {
			$("#txtTestHeadingSearch").val(headingNameArr[0]);
			$("#headingId").val(headingNameArr[1]);
		}
	}, 500);
}

function setCasualityTestNameandId() {

	var testCode = $("#casualityTest_Code").val();
	var testCodeArray = testCode.split("_");

	var inputs = [];
	inputs.push('action=fetchCasualityTestNameById');
	inputs.push('test_id=' + testCodeArray[1]);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#txtCasualityTestName").val(ajaxResponse);
		}
	});
}

function setCasualityTestIDandCharges() {
	setTimeout(function() {
		var itemName = $("#txtCasualityTestName").val();
		var itemNameArr = itemName.split("_");
		// $("#casualityTest_Code").val("C" + "_" + itemNameArr[1]);
		if (itemNameArr[1] == undefined) {
			alert("Please Enter Valid Test...");
			$("#txtCasualityTestName").val("");
			$("#casualityTest_Code").val("");
			return false;
		} else {
			$("#txtCasualityTestName").val(itemNameArr[0]);
			$("#casualitytestId").val(itemNameArr[1]);
			$("#casualityTest_Code").val(itemNameArr[1]);
			// $("#patAmt").val(itemNameArr[2]);
		}
	}, 500);
}

function setInvestigationTestIDandCharges() {
	setTimeout(function() {

		var itemName = $("#InvestigationTestName").val();
		var itemNameArr = itemName.split("_");
		if (itemNameArr[1] == undefined) {
			alert("Please Enter Valid Test Name...");
			$("#InvestigationTestName").val("");
			return false;
		} else {
			$("#InvestigationTestName").val(itemNameArr[0]);
			$("#investigationtestId").val(itemNameArr[1]);
			$("#testCodeInvestigation").val(itemNameArr[1]);
			$("#charges1").val(itemNameArr[2]);
		}
	}, 500);
}

function setRadiologyTestIDandCharges() {

	setTimeout(function() {

		var itemName = $("#radiologyTestName").val();
		var itemNameArr = itemName.split(":");
		if (itemNameArr[1] == undefined) {
			alert("Please Enter Valid Test...");
			$("#radiologyTestName").val("");
			return false;
		} else {
			$("#radiologyTestName").val(itemNameArr[0]);
			$("#radiologytestId").val(itemNameArr[1]);
			$("#patAmt").val(itemNameArr[2]);
			getRadiologyTestBodyPart(itemNameArr[3]);
		}
	}, 500);

}

function getRadiologyTestBodyPart(radiologyTestTypeId) {
	var inputs = [];
	inputs.push('action=getRadiologyTestBodyPart');
	inputs.push('radiologyTestTypeId=' + radiologyTestTypeId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					var myObj = JSON.parse(ajaxResponse);
					$("#radiologyBodyPart")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.testList as tl}<option value='{$T.tl.test_ID}'>{$T.tl.tName}</option>{#/for}");
					$("#radiologyBodyPart").processTemplate(myObj);
				}
			});

}

function getpatientAllAssignedtest() {

	var inputs = [];
	inputs.push('action=getpatientAllAssignedtest');
	inputs.push('treatmentId=' + $("#treatmentId").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
		}
	});

}
function fetchAndSetRadiologyDetails() {

	var testCode = $("#testCode").val();
	if (testCode != "") {
		var testID = testCode.split("-");
		var id = testID[1];
		var inputs = [];
		inputs.push('action=setRadiologyDetails');
		inputs.push('id=' + id);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "PathologyServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {

						ajaxResponse = r;
						var myObj = JSON.parse(ajaxResponse);
						$("#radiologyBodyPart")
								.setTemplate(
										"<option value='0'>Select</option>{#foreach $T.testList as tl}<option value='{$T.tl.id}'>{$T.tl.bpn}</option>{#/for}");
						$("#radiologyTestType").val(myObj.testList[0].test_ID);
						$("#radiologyTestName").val(myObj.testList[0].tname);
						$("#radiologyBodyPart").processTemplate(myObj);
						$("#radiologytestId").val(id);
						$("#radiologyBodyPart").val(myObj.testList[0].id);
						// myObj = JSON.parse(myObj);

					}
				});
	}
}
function fetchAndSetInvestigationDetails() {
	var testCode = $("#testCodeInvestigation").val();
	var testID = testCode.split("-");
	var id = testID[1];

	if (id == undefined) {
		alert("Radiology.js_ fetchAndSetInvestigationDetails() id is undefined");
		return;
	}

	var inputs = [];
	inputs.push('action=SetInvestigationDetails');
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {

					ajaxResponse = r;
					var myObj = JSON.parse(ajaxResponse);
					$("#radiologyBodyPart")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.testList as tl}<option value='{$T.tl.id}'>{$T.tl.bpn}</option>{#/for}");
					$("#radiologyTestType").val(myObj.testList[0].test_ID);

					$("#radiologyBodyPart").processTemplate(myObj);
					$("#radiologytestId").val(id);
					// myObj = JSON.parse(myObj);

				}
			});

}
function autoSuggetionTestNames() {
	var inputs = [];
	inputs.push('auto=autoSuggetionTestNames');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AutoSuggetionServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			var availableTags = [];
			availableTags = ajaxResponse.split("\n");
			$("#radiologyTestName").autocomplete({
				source : availableTags
			});
		}
	});
}
function setvalues() {

	/*
	 * var radiologyTestName = $("#radiologyTestName").val(); var testarr =
	 * radiologyTestName.split("_"); var testName = testarr[0];
	 * $("#radiologyTestName").val(testName); var testID = testarr[1]; var
	 * ftestID = "R-" + testID; $("#testCode").val(ftestID);
	 * fetchAndSetRadiologyDetails();
	 */

	var radiologyTestName = $("#radiologyTestName").val();
	var testarr = radiologyTestName.split("_");
	var testName = testarr[0];
	$("#radiologyTestName").val(testName);
	var testID = testarr[1];
	$("#testCode").val(testID);
	$("#radiologyTestType").val(testarr[5]);
	$("#radiologyTestName").val(testarr[0]);
	$("#radiologytestId").val(testarr[4]);
	$("#radiologyBodyPart").val(testarr[6]);
}
/*
 * function fetchAndSetInvestigationDetails(){ }
 */

function fetchBodyPartDetails() {
	var id = 0;
	var inputs = [];
	inputs.push('action=setRadiologyDetails');
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {

					ajaxResponse = r;
					var myObj = JSON.parse(ajaxResponse);
					$("#radiologyBodyPart")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.testList as tl}<option value='{$T.tl.id}'>{$T.tl.bpn}</option>{#/for}");
					$("#radiologyBodyPart").processTemplate(myObj);

					/*
					 * $("#radiologyTestType").val(myObj.testList[0].test_ID);
					 * $("#radiologyTestName").val(myObj.testList[0].tname);
					 * 
					 * $("#radiologytestId").val(id);
					 * $("#radiologyBodyPart").val(myObj.testList[0].id); //
					 * myObj = JSON.parse(myObj);
					 */
				}
			});
}

/* new Auto Suggestion Investigation */
function setInvestigationAutocompleteTestNameIDCharges(inputID, callfrom) {
	// alert(callfrom);
	var hallid = 0;
	if (callfrom == "IPD") {
		var pobj = $("#divPatId").html();
		var myobj = eval('(' + pobj + ')');
		hallid = myobj.oBed.hi;
	} else {
		hallid = 0;
	}

	// alert(hallid);
	var resultData = [];
	var auto = "DoctorDesk";
	var data = "investigation";
	var autoType = "b";
	var findingName = $("#" + inputID).val();
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('data=' + data);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	inputs.push('hallid=' + hallid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(ajaxResponse);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1] + "_" + arrValue[2] + "_"
								+ arrValue[3] + "_" + arrValue[4]);

						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					setTimeout(function() {
						$("#div" + inputID + " .typeahead").html(template);
						$("#div" + inputID + " .typeahead").show();
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>\'" + item.value +"\'");
		if (item.text != "") {
			$("#InvestigationTestName").val(item.text);
			var arrItem = ((item.value).trim()).split("_");
			$("#testCodeInvestigation").val((arrItem[0]).trim());
			$("#investigationtestId").val((arrItem[0]).trim());
			$("#charges1").val((arrItem[1]).trim());

			/* for ipd_discharge.jsp */
			// alert((item.text).trim() + "_" + (item.value).trim());
			setTimeout(function() {
				$("#txtEqNameb1").val(
						(item.text).trim() + "_" + (item.value).trim());

				$("#radiologyTestType").val((arrItem[2]).trim());
				$("#radiologyTestType").attr("disabled", true);
				$("#radiologyBodyPart").val((arrItem[3]).trim());
				$("#radiologyBodyPart").attr("disabled", true);
			}, 200);
		} else {
			$("#testCodeInvestigation").val("");
			$("#radiologyTestType").val(0);
			$("#radiologyBodyPart").val(0);
		}
	}

}

/* new Auto Suggestion Investigation */
function setCasualityAutocompleteTestIDandCharges(inputID) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = 't';
	var auto = 'CasualityTestName';
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					// alert(r);
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						$("#div" + inputID + " .typeahead").html(template);
						$("#div" + inputID + " .typeahead").show();
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);
		if (item.text != "") {
			$("#txtCasualityTestName").val((item.text).trim());
			$("#casualitytestId").val((item.value).trim());
			$("#casualityTest_Code").val((item.value).trim());
		} else {
			$("#casualityTest_Code").val("");
		}
	}
}

/* new AutoSuggestion lab headings */
function setPathologyAutocompleteTestIDandCharges(inputID) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	if(findingName == ""){
		return false;
	}
	var autoType = 'th';
	var auto = 'PathologyTestHeading';
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					// alert(r);
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						$("#div" + inputID + " .typeahead").html(template);
						$("#div" + inputID + " .typeahead").show();
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);

		$("#txtTestHeadingSearch").val((item.text).trim());
		$("#headingId").val((item.value).trim());

		setTimeout(function() {
			getAllHeading('search', 'assignTest');
		}, 500);

	}
}
// AutoSuggestion pathology test search
function setPathologyAutocompleteLabTest(inputID) {

	var idHeading = "";
	$('input[name="headchk"]:checked').each(function() {
		idHeading = this.value;
	});
	if (idHeading == "" || idHeading == "select") {

		alert("Please Select Heading To Search Test.");
		return false;
	}

	var resultData = [];
	var findingName = $("#" + inputID).val();

	if(findingName == ""){
		return false;
	}

	var auto = 'PathologyTestSearch';
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('idHeading=' + idHeading);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					// alert(r);
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						$("#div" + inputID + " .typeahead").html(template);
						$("#div" + inputID + " .typeahead").show();
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);

		$("#" + inputID).val((item.text).trim());
		// $("#headingId").val((item.value).trim());

		setTimeout(function() {
			searchProAndTest('assign');
		}, 500);

	}
}

/* new Auto Suggestion physiotherapy */
function setPhysiotherapyTestAutocompleteTestID(inputID) {
	var resultData = [];
	var findingName = $("#" + inputID).val();

	var autoType = 'g';
	var auto = 'DoctorDesk';
	var data = 'physiotherapy';

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	inputs.push('data=' + data);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					// alert(r);
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						$("#div" + inputID + " .typeahead").html(template);
						$("#div" + inputID + " .typeahead").show();
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);
		setTimeout(function() {
			if (item.text != "") {
				$("#" + inputID).val((item.text).trim());
				$("#physiotherapytestId").val((item.value).trim());
				$("#physiotherapyTest_Code").val((item.value).trim());
			}
		}, 200);
	}
}

/* new Auto Suggestion Investigation */
function setIPD_Discharge_DentalAutocomplete(inputID, callfrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = 'i';
	var auto = 'DoctorDesk';
	var data = 'dental';
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	inputs.push('data=' + data);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					// alert(r);
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						$("#div" + inputID + " .typeahead").html(template);
						$("#div" + inputID + " .typeahead").show();
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {

		// alert((item.text).trim() + "_" + (item.value).trim());

		setTimeout(function() {
			if (callfrom = 'opd') {
				$("#" + inputID).val((item.text).trim());
				$("#othertestId").val((item.value).trim());
				$("#otherTest_Code").val((item.value).trim());
			} else {
				$("#" + inputID).val(
						(item.text).trim() + "_" + (item.value).trim());
			}

		}, 200);

	}
}

/* new Auto Suggestion Investigation */
function setIPD_Discharge_PathologyAutocomplete(inputID) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = 'p';
	var auto = 'DoctorDesk';
	var data = 'pathology';
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	inputs.push('data=' + data);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					// alert(r);
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						$("#div" + inputID + " .typeahead").html(template);
						$("#div" + inputID + " .typeahead").show();
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {

		// alert((item.text).trim() + "_" + (item.value).trim());

		setTimeout(function() {
			$("#" + inputID)
					.val((item.text).trim() + "_" + (item.value).trim());
		}, 200);

	}
}

/* new Auto Suggestion Investigation */
function setIPD_Discharge_CasualtyAutocomplete(inputID) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = 'c';
	var auto = 'DoctorDesk';
	var data = 'casualty';
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	inputs.push('data=' + data);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					// alert(r);
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						$("#div" + inputID + " .typeahead").html(template);
						$("#div" + inputID + " .typeahead").show();
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {

		// alert((item.text).trim() + "_" + (item.value).trim());

		setTimeout(function() {
			$("#" + inputID)
					.val((item.text).trim() + "_" + (item.value).trim());
		}, 200);

	}
}

function saveInvTestChargesSlave() {

	var result = $("#testDetails").html();
	var testObj = eval('(' + result + ')');
	var halllist = $("#InvTestAllHallDetails").html();
	var halldetails = eval('(' + halllist + ')');

	var investTestObj = 0;

	investTestObj = {
		invstList : []

	};

	for ( var i = 0; i < testObj.invstList.length; i++) {

		var testid = testObj.invstList[i].invstId;
		var hallid = 0;
		var charges = $("#TestID" + testid + "-HallID0").val();
		var slaveid = $("#invtestchargesslaveID" + testid + "-0").val();
		
		if(charges < 0){
			alert("Charges can't be negative!!!");
			return false;
		}else if(charges == "" || charges == null || charges == undefined){
			charges = 0;
		}

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"slaveId" : slaveid,
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrg = $("#TestID" + testid + "-HallID" + hlid).val();
			var slvid = $("#invtestchargesslaveID" + testid + "-" + hlid).val();
			
			if(chrg < 0){
				alert("Charges can't be negative!!!");
				return false;
			}else if(chrg == "" || chrg == null || chrg == undefined){
				chrg = 0;
			}

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrg,
				"slaveId" : slvid
			});
		}

		investTestObj.invstList.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"invstId" : testid
		});

	}

	investTestObj = JSON.stringify(investTestObj);
	var inputs = [];
	inputs.push('action=saveInvTestHallWiseCharges');
	inputs.push('investTestObj=' + encodeURIComponent(investTestObj));
	inputs.push('sid=' + encodeURIComponent(0));
	inputs.push('pageType=' + encodeURIComponent("NormalCharges"));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});
}

function defaultViewIPDServices(search) {

	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Service Name !");
			setFocus("#byName");
		}
	}
	var testType = $("#testType").val();

	var inputs = [];
	inputs.push('action=fetchTest');
	inputs.push('testType=' + encodeURIComponent(testType));
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#testDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					if (searhFlag == "search" && testObj.testList.length == 0) {
						alert("Service Name Not Found");
						$("#byName").val("");
						location.reload();
					}

					$('#CasualityChrgsTable > thead > tr:nth-child(n+2)')
							.remove();
					$('#CasualityChrgsTable > tbody > tr:nth-child(n+2)')
							.remove();

					var halllist = $("#InvTestAllHallDetails").html();
					var halldetails = eval('(' + halllist + ')');
					var IPDServicesTestCharges = "<tr id = 'headerTr'>"
							+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>#</div></th>"
							+ "<th class='center' style = 'width: 200px;'><div class='TextFont'>IPD Service Name</div></th>"
							+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";

					$
							.each(
									halldetails.hl,
									function(name, value) {
										IPDServicesTestCharges = IPDServicesTestCharges
												+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>"
												+ value.hn + "</div></th>";
									});

					IPDServicesTestCharges = IPDServicesTestCharges + "</tr>";
					$('#TestHeading').after(IPDServicesTestCharges);

					var count = 1;
					$
							.each(
									testObj.testList,
									function(name, value) {
										var IPDServicesTestbody = "";
										IPDServicesTestbody = IPDServicesTestbody
												+ "<tr id=Test"
												+ count
												+ "><td class='center' style='height: 21.5px;width: 30px;'>"
												+ value.test_ID
												+ "</td><td class='center' style='height: 21.5px;width: 200px;'>"
												+ value.tname + "</td>";

										var TestChrgs = 0;
										var slaveid = 0;
										var hallid = 0;

										if (value.hallWsTestChrgsList.length > 0) {
											for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
												if (value.hallWsTestChrgsList[j].hallID == 0) {
													TestChrgs = value.hallWsTestChrgsList[j].chrgs;
													slaveid = value.hallWsTestChrgsList[j].slaveId;
													hallid = 0;

													IPDServicesTestbody = IPDServicesTestbody
															+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
															+ value.test_ID
															+ "-HallID"
															+ hallid
															+ " value = '"
															+ TestChrgs
															+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'IPDServiceChargesSlaveID"
															+ value.test_ID
															+ "-"
															+ hallid
															+ "' value = '"
															+ slaveid
															+ "' /></td>";
												}
											}
										} else {
											IPDServicesTestbody = IPDServicesTestbody
													+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
													+ value.test_ID
													+ "-HallID"
													+ hallid
													+ " value = '"
													+ value.charges1
													+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'IPDServiceChargesSlaveID"
													+ value.test_ID
													+ "-"
													+ hallid
													+ "' value = '"
													+ slaveid + "' /></td>";
										}

										$
												.each(
														halldetails.hl,
														function(name,
																hallvalue) {

															var isPresent = 0;
															for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
																if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
																	TestChrgs = value.hallWsTestChrgsList[i].chrgs;
																	slaveid = value.hallWsTestChrgsList[i].slaveId;
																	hallid = value.hallWsTestChrgsList[i].hallID;
																	isPresent = 1;
																	break;
																}
															}
															if (isPresent > 0) {
																IPDServicesTestbody = IPDServicesTestbody
																		+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																		+ value.test_ID
																		+ "-HallID"
																		+ hallid
																		+ " value = '"
																		+ TestChrgs
																		+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'IPDServiceChargesSlaveID"
																		+ value.test_ID
																		+ "-"
																		+ hallid
																		+ "' value = '"
																		+ slaveid
																		+ "' /></td>";

															} else {
																TestChrgs = value.charges1;
																slaveid = 0;
																hallid = hallvalue.hi;

																IPDServicesTestbody = IPDServicesTestbody
																		+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																		+ value.test_ID
																		+ "-HallID"
																		+ hallid
																		+ " value = '"
																		+ TestChrgs
																		+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'IPDServiceChargesSlaveID"
																		+ value.test_ID
																		+ "-"
																		+ hallid
																		+ "' value = '"
																		+ slaveid
																		+ "' /></td>";
															}
														});

										IPDServicesTestbody = IPDServicesTestbody
												+ "</tr>";

										$('#Test' + (count - 1)).after(
												IPDServicesTestbody);
										count++;
									});
				}
			});
}

function saveServiceChargesSlave() {

	var testType = $("#testType").val();
	var result = $("#testDetails").html();
	var testObj = eval('(' + result + ')');
	var halllist = $("#InvTestAllHallDetails").html();
	var halldetails = eval('(' + halllist + ')');

	var serviceObj = 0;

	serviceObj = {
		testList : []

	};

	for ( var i = 0; i < testObj.testList.length; i++) {

		var testid = testObj.testList[i].test_ID;
		var hallid = 0;
		var charges = $("#TestID" + testid + "-HallID0").val();
		var slaveid = $("#IPDServiceChargesSlaveID" + testid + "-0").val();
		
		if(charges == "" || charges == null || charges == undefined){
			charges = 0;
		}

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"slaveId" : slaveid,
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrg = $("#TestID" + testid + "-HallID" + hlid).val();
			var slvid = $("#IPDServiceChargesSlaveID" + testid + "-" + hlid)
					.val();
			
			if(chrg == "" || chrg == null || chrg == undefined){
				chrg = 0;
			}

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrg,
				"slaveId" : slvid
			});
		}

		serviceObj.testList.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"test_ID" : testid
		});

	}

	serviceObj = JSON.stringify(serviceObj);
	var inputs = [];
	inputs.push('action=saveServicesHallWiseCharges');
	inputs.push('serviceObj=' + encodeURIComponent(serviceObj));
	inputs.push('sid=' + encodeURIComponent(0));
	inputs.push('testType=' + encodeURIComponent(testType));
	inputs.push('pageType=' + encodeURIComponent("NormalDiscount"));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});
}

function saveMedicine() {
	var preparationValue = $( "#prName option:selected" ).text();
	preparationValue = preparationValue.toLocaleLowerCase();

	var prescriptionId = $("#prescriptionId").val();
	var comName = $.trim($("#comName").val());
	var prName = $.trim($("#prName").val());
	var medName = $.trim($("#name").val());
	var medicineId = $.trim($("#medicineId").val());
	var strength = $.trim($("#strength").val());
	var capacity = $.trim($("#capacity").val());
	var dosePerDay = $.trim($("#dosePerDay").val());
	var fixedDose = $.trim($("#fixedDose").val());
	var unit = $.trim($("#unit").val());
	var freqency = $.trim($("#freqency").val());
	var days = $.trim($("#days").val());
	  if(days == ""){
		  days = 0 ;
	  }
	var other = $.trim($("#other").val());
	var instruction = $.trim($("#instruction").val());
	var usedFor = $("input[name='UsedFor']:checked").val();
	
	if(comName == "0") {
		alert("Please select Company Name.");
		return false;
	}else if(prName == "0") {
		alert("Please select Preparation Name.");
		return false;
	}else if(medName == "") {
		alert("Please enter Medicine Name.");
		return false;
	}else if(medicineId == "0") {
		alert("Please enter valid Medicine Name.");
		return false;
	}else if (strength == "") {
		if(preparationValue == "general" || preparationValue == "pessaries"){
			
		}else{
			alert("Please enter Strength.");
			return false;
		}
	}else if(strength == 0){
		if(preparationValue == "syrup"){
		alert("Please enter Strength.");
		return false;
		}
	}else if(dosePerDay == "" && fixedDose == ""){
		if(preparationValue == "general" || preparationValue == "pessaries"){
			
		}else{
			alert("Please enter Dose Or Fixed Dose");
			return false;
		}
	}else if(dosePerDay == 0 && fixedDose == 0){
		if(preparationValue == "syrup"){
			alert("Please select Dose Or Fixed Dose.");
			return false;
		}
	}else if(unit == "0") {
		if(preparationValue == "syrup"){
			alert("Please select Unit.");
			return false;
		}
	}else if(freqency == "") {
		if(preparationValue == "general" || preparationValue == "pessaries"){
			
		}else{
			alert("Please enter Frequency.");
			return false;
		}
	}else if(days == "0") {
		if(preparationValue == "general" || preparationValue == "pessaries"){
			
		}else{
			alert("Please enter No.of Days.");
			return false;
		}
	}else if (instruction == "0") {
		// alert("Please select Instruction.");
		// return false;
	}

	var inputs = [];
	inputs.push('action=savePeadiatricMedicine');
	inputs.push('prescriptionId=' + encodeURIComponent(prescriptionId));
	inputs.push('comName=' + encodeURIComponent(comName));
	inputs.push('prName=' + encodeURIComponent(prName));
	inputs.push('medName=' + encodeURIComponent(medName));
	inputs.push('medicineId=' + encodeURIComponent(medicineId));
	inputs.push('strength=' + encodeURIComponent(strength));
	inputs.push('capacity=' + encodeURIComponent(capacity));
	inputs.push('dosePerDay=' + encodeURIComponent(dosePerDay));
	inputs.push('fixedDose=' + encodeURIComponent(fixedDose));
	inputs.push('unit=' + encodeURIComponent(unit));
	inputs.push('freqency=' + encodeURIComponent(freqency));
	inputs.push('days=' + encodeURIComponent(days));
	inputs.push('other=' + encodeURIComponent(other));
	inputs.push('instruction=' + encodeURIComponent(instruction));
	inputs.push('usedFor=' + encodeURIComponent(usedFor));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			refreshpaediatricMedicationMaster();
			showMedicineList();
			// location.reload(true);
		}
	});
}

function refreshpaediatricMedicationMaster() {
	$("#prescriptionId").val("0");
	$("#comName").val("0");
	$("#prName").val("0");
	$("#name").val("");
	$("#medicineId").val("0");
	$("#strength").val("");
	$("#capacity").val("");
	$("#dosePerDay").val("");
	$("#fixedDose").val("");
	$("#unit").val("0");
	$("#freqency").val("");
	$("#days").val("");
	$("#other").val("");
	$('input:radio[name="UsedFor"][value="BOTH"]').prop('checked', 'checked');
	$("#instruction").val("0");
}

// fetching companyId and companyMaster
var companylistTemp = "<option value='0'>-SELECT-</option>{#foreach $T.prescriptionList as rtlist}<option value='{$T.rtlist.company_id}'>{$T.rtlist.name}</option>{#/for}";
function fetchCompanyListUtil(pageType) {

	var inputs = [];
	inputs.push('action=fetchCompanyList');
	inputs.push('pageType=' + encodeURIComponent(pageType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			if (pageType == "DoctorDesk" || pageType == "Medicine") {
				$("#comName").setTemplate(companylistTemp);
				$("#comName").processTemplate(obj);

			}
		}
	});
}

var counterMedicine = 1;
// creating template
var medicineTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 110%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center'><div>#</div></th>"
		+ "<th class='col-md-2-1'><div>Company Name</div></th>"
		+ "<th class='col-md-2-1'><div>Medicine Name</div></th>"
		+ "<th class='col-md-1-1 center'><div>Fixed Dose</div></th>"
		+ "<th class='col-md-1-1 center'><div>Dose in Day</div></th>"
		+ "<th class='col-md-1-1 center'><div>Frequency</div></th>"
		+ "<th class='col-md-1-1 center'><div>No.Of Days</div></th>"
		+ "<th class='col-md-1-1 center'><div>Strength</div></th>"
		+ "<th class='col-md-1-1 center'><div>edit</div></th>"
		+ "<th class='col-md-1-1 center'><div>delete</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.prescriptionList as pl}"
		+ "<tr>"
		+ "<td class='center'>{counterMedicine}</td>"
		+ "<td>{$T.pl.compName}</td>"
		+ "<td>{$T.pl.name}</td>"
		+ "<td class='center'>{$T.pl.dose}</td>"
		+ "<td class='center'>{$T.pl.dosePerDay}</td>"
		+ "<td class='center'>{$T.pl.frequency}</td>"
		+ "<td class='center'>{$T.pl.days}</td>"
		+ "<td class='center'>{$T.pl.strength}</td>"
		+ "<td class='center'><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' data-toggle='modal'"
		+ " data-target='#iPackage' onclick=editPMedicineMaster({counterMedicine++})"
		+ " value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td class='center'><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deletePMedicineMaster({$T.pl.prescription_id})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";

// showing medicine list
function showMedicineList(search, type) {

	var searchText = $.trim($("#byName").val());
	var searhFlag = $("#searchTest").val();
	if (searhFlag == search) {
		if (searchText == "") {
			alert("Please Enter Medicine Name !");
			setFocus("#byName");
		}
	}

	var inputs = [];
	inputs.push('action=fetchPMedicineMaster');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {

			$("#MedicineListDivAjax").html(res);
			var pobj1 = eval('(' + res + ')');
			
			counterMedicine = 1;

			if (pobj1.prescriptionList.length > 0) {
				$("#packageDiv_showMedicineList").setTemplate(medicineTemp);
				$("#packageDiv_showMedicineList").processTemplate(pobj1);
			} else {
				// alert("Record not found..!");
			}
			setTimeout(function(){userAccess();},100);
		}
	});

}

function editPMedicineMaster(arrayCounter) {

	var ajaxResponse = $("#MedicineListDivAjax").html();

	var myArray = JSON.parse(ajaxResponse);
	var ObjData = myArray.prescriptionList[(arrayCounter - 1)];
	
	$("#medicineHead").html("Edit Peditric Medicine Master");
	$("#prescriptionId").val(ObjData.prescription_id);

	$("#comName").val(ObjData.company_id);
	$("#prName").val(ObjData.prep);
	
	$("#name").val(ObjData.name);
	$("#medicineId").val(ObjData.medicineID);
	$("#strength").val(ObjData.strength);
	$("#capacity").val(ObjData.capacity);
	$("#days").val(ObjData.days);
	$("#dosePerDay").val(ObjData.dosePerDay);
	$("#fixedDose").val(ObjData.dose);
	$("#unit").val(ObjData.unit);
	$("#freqency").val(ObjData.frequency);
	$("#noOfDays").val(ObjData.days);
	$("#other").val(ObjData.other);
	$("#instruction").val(ObjData.instruction);
	
	$('input:radio[name="UsedFor"][value="' + (ObjData.usedFor) + '"]').prop('checked', 'checked');
	
	/*if (ObjData.usedFor == "on") {
		$("#both").prop('checked', true);
	} else if (ObjData.usedFor == "opd") {
		$("#opd").prop('checked', true);
	} else if (ObjData.usedFor == "ipd") {
		$("#ipd").prop('checked', true);
	}*/

}

// Touheed
// 01-Oct-2015

function deletePMedicineMaster(prescription_id) {

	// alert(prescription_id);
	var r = confirm("Are you confirm to Delete Medicine?");
	if (r == true) {

		var inputs = [];
		inputs.push('action=deletePMedicineMaster');
		inputs.push("prescription_id=" + prescription_id);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			// timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				showMedicineList();
				location.reload();

			}
		});

	}
}

/* new Auto Suggestion Prescription */
function setCompanyPrescriptionAutocompleteNameID(inputID, onloadTempVar) {

	var prName = $("#prName").val();
	var comName = $("#comName").val();
	var findingName = $("#" + inputID).val();

	$("#medicineId").val("0");

	if (prName == 0) {
		alert("Please select prep.");
		return false;
	}

	/* var resultData = []; */
	var auto = "CompanyPrescription";
	var inputs = [];

	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('prName=' + prName);
	inputs.push('comName=' + comName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var availableTags = [];
					var resultData = [];
					availableTags = r.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1] + "_" + arrValue[2] + "_" + arrValue[3]);
						var name = arrValue[0];
						resultData.push({
							ID : idValue,
							Name : name
						});

						template = template + '<li data-value="'
								+ (arrValue[1]) + '" class=""><a href="#">'
								+ arrValue[0] + '</a></li>';
					}

					$("#divTag" + inputID + " .typeahead").html(template);

					if (onloadTempVar != "onLoad") {
						$("#divTag" + inputID + " .typeahead").show();
					}

					setTimeout(function() {
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});

						$("#" + inputID).data('typeahead').source = resultData;

					}, 100);

				}
			});

	function displayResult(item) {

		// alert("Name==>" + item.text + " \n\nId==>" + item.value);

		// medicine name
		$("#" + inputID).val((item.text).trim());

		// medicine id
		$("#medicineId").val((((item.value).trim()).split("_")[0]));

		// unit
		$("#unit").val((((item.value).trim()).split("_")[1]));

		// strength
		$("#capacity").val((((item.value).trim()).split("_")[2]));

		// var content = item.value.split("_");
		// var Newid = item.value.split("_");
		// var myId = Newid[0];
		// $("#medicineId").val(myId);
		// $("#divTagname").val(content[0]);
		// $("#strength").val(content[1]);

	}

}

function savePrescriptionInstruction() {

	var presciptionInstructionId = $("#presciptionInstructionId").val();

	var englishInstruction = ($("#englishInstruction").val()).trim();
	if (englishInstruction == "") {
		alert("Please enter English Instruction...");
		return false;
	}

	var hindiInstruction = $("#hindiInstruction").val();
	var marathiInstruction = $("#marathiInstruction").val();
	var unicodeInstruction = $("#unicodeInstruction").val();
	
	var selrefTo = $("#selRefTo").val();
	
	if(selrefTo == "select"){
		
		selrefTo = "-";
		
	}
	  
	var inputs = [];
	//inputs.push('action=savePrescriptionInstruction');
	inputs.push('presciptionInstructionId=' + presciptionInstructionId);
	inputs.push('englishInstruction=' + englishInstruction);
	inputs.push('hindiInstruction=' + hindiInstruction);
	inputs.push('marathiInstruction=' + marathiInstruction);
	inputs.push('unicode=' + unicodeInstruction);
	inputs.push('refTo=' + selrefTo);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str,
		url : "./ehat/ipdmaster/savePrescriptionInstruction",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			location.reload();
			enableAddUpdatePrescriptionInstruction();
		}
	});
}

/*
 * var pInstructionTemp = "<table class='table table-striped table-bordered
 * header-fixed cf' style='width: 100%;'>" + "<thead class='cf'
 * style='background: white;'>" + "<tr>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>Instruction
 * Id</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>English
 * Instruction</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>Hindi
 * Instruction</div></th>" + "<th style='height: 21.5px;' class='col-md-2 center'><div>Marathi
 * Instruction</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>edit</div></th>" + "<th style='height: 21.5px;' class='col-md-1 center'><div>delete</div></th>" + "</tr></thead>" +
 * "{#foreach $T.prescriptionInstructionList as ul}" + "<tr class='center'>" + "<td>{counter++}</td>" + "<td id='presciptionInstructionId{$T.ul.presciptionInstructionId}' >{$T.ul.presciptionInstructionId}</td>" + "<td id='englishInstruction{$T.ul.englishInstruction}'>{$T.ul.englishInstruction}</td>" + "<td id='hindiInstruction{$T.ul.hindiInstruction}'>{$T.ul.hindiInstruction}</td>" + "<td id='marathiInstruction{$T.ul.marathiInstruction}'>{$T.ul.marathiInstruction}</td>" + "<td><button
 * id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal'
 * data-target='#iPackage' onclick=\"editPackageMaster({$T.ul.packageId})\"
 * value='EDIT'><i class='fa fa-edit'></i></button></td>" + "<td><button
 * id='btnDelete' value='Delete' class='btn btn-xs btn-success' type='button'
 * onclick=\"deletePackageMaster({$T.ul.packageId})\"><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";
 */
var counter = 1;
var pInstructionTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Instruction Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2'><div>English Instruction</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2'><div>Hindi Instruction</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2'><div>Marathi Instruction</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1'><div>Ref To</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Select</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.prescriptionInstructionList as ul}"
		+ "<tr class='center'>"
		+ "<td>{counter++}</td>"
		+ "<td id='presciptionInstructionId{$T.ul.presciptionInstructionId}' >{$T.ul.presciptionInstructionId}</td>"
		+ "<td id='englishInstruction{$T.ul.englishInstruction}' align='left'>{$T.ul.englishInstruction}</td>"
		+ "<td id='hindiInstruction{$T.ul.hindiInstruction}' align='left'>{$T.ul.hindiInstruction}</td>"
		+ "<td id='marathiInstruction{$T.ul.marathiInstruction}' align='left'>{$T.ul.marathiInstruction}</td>"
		+ "<td id='refTo{$T.ul.refTo}' align='left'>{$T.ul.refTo}</td>"
		+ "<td class='col-md-1-1 center'>"
		+ "<input name='checkboxRI' id='{$T.ul.presciptionInstructionId}' type='checkbox' style='cursor: pointer' /></td>"
		+ "</tr>{#/for}";

// Instruction
var instructionTemp = "<option value='0'>-SELECT-</option>{#foreach $T.prescriptionInstructionList as rtlist}<option value='{$T.rtlist.presciptionInstructionId}'>{$T.rtlist.englishInstruction}/{$T.rtlist.hindiInstruction}/{$T.rtlist.marathiInstruction}</option>{#/for}";

function fectchAllPrescriptionInstruction(type) {
	
	var inputs = [];
	//inputs.push('action=fectchAllPrescriptionInstruction');
	inputs.push('depType=' + encodeURIComponent(type));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/ivfDoctorRound/getAllPresInstructionsForIvfDoctorRound",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {
			var pobj1 = res;
			if (pobj1.prescriptionInstructionList.length > 0) {
				$("#packageDiv").setTemplate(pInstructionTemp);
				$("#packageDiv").processTemplate(pobj1);
				$("#packageDivAjax").html(res);
			}

			// select box template for medication master
			$("#instruction").setTemplate(instructionTemp);
			$("#instruction").processTemplate(pobj1);
			
			$("#instructionDoca").setTemplate(instructionTemp);
			$("#instructionDoca").processTemplate(pobj1);

			// select instruction
			$("#instructionDoc").setTemplate(instructionTemp);
			$("#instructionDoc").processTemplate(pobj1);

		}
	});

}

function enableAddUpdatePrescriptionInstruction() {
	$("#englishInstruction").val("");
	$("#hindiInstruction").val("");
	$("#marathiInstruction").val("");
	$("#selRefTo").val("");
	$("#unicodeInstruction").val("");
	$("#presciptionInstructionId").val("0");
	$("input[name='checkboxRI']:checked").each(function() {
		$(this).prop("checked", false);
	});
}

function editPrescriptionInstruction() {

	if (($("#packageDiv").html()) == "") {
		alert("No Data to Edit Instruction...");
		enableAddUpdateReportInstruction();
		return;
	}

	var reportInstructionID = new Array();
	var tempReportInstructionID = 0;
	$("input[name='checkboxRI']:checked").each(function() {
		reportInstructionID.push($(this).val());
		tempReportInstructionID = ($(this).attr('id')).trim();
	});

	if ((reportInstructionID.length) == 0) {
		alert("Please check the checkbox to edit Instructions...");
		enableAddUpdateReportInstruction();
		return;
	}

	if (reportInstructionID.length > 1) {
		alert("Please Select Single Checkbox");
		enableAddUpdatePrescriptionInstruction();
		return false;
	}

	var ajaxResponse = $("#packageDivAjax").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	var obj = "";
	for ( var i = 0; i < myArray.prescriptionInstructionList.length; i++) {
		if (myArray.prescriptionInstructionList[i].presciptionInstructionId == tempReportInstructionID) {
			obj = myArray.prescriptionInstructionList[i];
			break;
		}
	}
 
	$("#presciptionInstructionId").val(obj.presciptionInstructionId);
	$("#englishInstruction").val(obj.englishInstruction);
	$("#hindiInstruction").val(obj.hindiInstruction);
	$("#marathiInstruction").val(obj.marathiInstruction);
	$("#selRefTo").val(obj.refTo);
	$("#unicodeInstruction").val(obj.marathiInstruction_forPrint);
}

function deletePrescriptionInstruction() {

	if (($("#packageDiv").html()) == "") {
		alert("No Data to Delete Instruction...");
		return;
	}

	var reportInstructionIDs = new Array();
	$("input[name='checkboxRI']:checked").each(function() {
		reportInstructionIDs.push(($(this).attr('id')).trim());
	});

	if ((reportInstructionIDs.length) == 0) {
		alert("Please check the checkbox to delete Instructions...");
		return;
	}
	// alert(reportInstructionIDs);
	// alert("reportInstructionIDs>"+reportInstructionIDs);
	// reportInstructionIDs>20,21
	var r = confirm("Please confirm to Delete Record?");
	if (r == true) {
		var ids=reportInstructionIDs.toString();
		
		var inputs = [];
		inputs.push('action=deletePrescriptionInstruction');
		inputs.push('id=' + reportInstructionIDs);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "DELETE",
		//	data : str,
			url : "./ehat/ipdmaster/deletePrescriptionInstruction/"+ids,
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				fectchAllPrescriptionInstruction();
			}
		});
	}
}

/**
 * ****************************************************Prescription Instrucction
 * Search by id or name********************************************
 */

function searchPrescriptionInstruction(call) {

	var search="";
	if(call!="onload"){
		var byName = ($("#byName").val()).trim();
		var byId = ($("#byId").val()).trim();
	
		if (byId == "" && byName == "") {
			alert("Please enter Instruction Id or Name.");
			return false;
		}
	
		if ((byId != "") && (byName != "")) {
			alert("Please search either by Instruction Id or by Name.");
			return false;
		}
	
		if (byId == "") {
			byId = "0";
			search=byName;
		}
	
		if (byName == "") {
			byName = "1";
			search=byId;
		}
	}
	
	var inputs = [];
	//inputs.push('action=fetchPrescriptionInstructionSearch');
	//inputs.push('isEdit=yes');
	//inputs.push('byId=' + byId);
	inputs.push('search=' + search.toString());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str,
		url : "./ehat/ipdmaster/fetchPrescriptionInstructionSearch",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			// alert(r);
			pobj1 = r;
			// alert(r);

			if (pobj1.prescriptionInstructionList.length > 0) {
				counter = 1;
				$("#packageDiv").setTemplate(pInstructionTemp);
				$("#packageDiv").processTemplate(pobj1);
				$("#packageDivAjax").html(JSON.stringify(r));

			} else {
				alert("Record not found..!");
				fetchPurchaseOrderMasterNew();
			}
			$('#byId').val("");
			$('#byName').val("");

		}
	});
}

/**
 * *********************************************End search prescription
 * instruction*********************************************************
 */

// Touheed 03-Nov-2015 Code for enabling medicine on company name changed
function enableMedicine(from) {
	if (from == "com") {

		$('#prName').val("0");
		$('#name').val("");
		$('#strength').val("");
		$('#unit').val("0");
		$('#dosePerDay').val("");

	} else {
		$('#name').val("");
		$('#strength').val("");
		$('#unit').val("0");
		$('#dosePerDay').val("");

	}

}

// Touheed code for the Pathology test
function setPackageProfieTestIDandCharges(inputID) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = 't';
	var auto = 'pathoTestName';
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					// alert(r);
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);

						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						$("#div" + inputID + " .typeahead").html(template);
						$("#div" + inputID + " .typeahead").show();
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);
		// getting test type
		var name = item.text;
		var s1 = name.split("-");
		var tType = s1[1];
		var x = tType.replace("(", "");
		var testType = x.replace(")", "");

		var fullID = item.value;
		var res = fullID.split("$");
		var pid = res[0];
		var pcode = res[1];
		var charges = res[2];
		var hid = res[3];
		// alert(hid);
		// alert("charges:"+charges);

		// alert("ID:"+pid+" code:"+pcode);

		if (item.text != "") {
			$("#txtPathologyName").val((item.text).trim());
			$("#pathologyTest_ID").val(pid);
			$("#pathologyTest_Code").val(pcode);
			$("#divtotalAmtPatho").text(charges);
			$("#testType").val((testType).trim());
			$("#heading").val(hid);
		} else {
			$("#pathologyTest_Code").val("");
		}
	}
}

// Touheed Code for Pathology New Ui and Database

function savePathologyAssignedTests(pageType, ipdOPd) {

	var queryType = $("#pathologyQueryType").val();
	var pathologyTest_ID = $('#pathologyTest_ID').val();
	var pathologyTest_Code = $('#pathologyTest_Code').val();
	var pathologyInstruction = $("#pathologyInstruction").val();
	var pathologyClinicalNote = $("#pathologyClinicalNote").val();
	var testType = $("#testType").val();
	var doctor = $("#doctor :selected").val();
	var hospital = $("#hospital :selected").val();
	var charges = $("#divtotalAmtPatho").text();
	var urgent = 0;
	var labResult = 0;
	var headingId = $("#heading").val();
	var tId = $("#treatmentId").val();

	if ($('#pathologyUrgent').is(':checked')) {
		urgent = 1;
	}
	if ($('#labresultFlag').is(':checked')) {
		labResult = 1;
	}

	alert("urgent:" + urgent);
	alert("labResult:" + labResult);

	alert("QT:" + queryType + " pathoID:" + pathologyTest_ID + " code:"
			+ pathologyTest_Code + " instruction:" + pathologyInstruction
			+ " note:" + pathologyClinicalNote + " testType:" + testType
			+ " doctor:" + doctor + " HeadingID:" + headingId + " hospital:"
			+ hospital + " charges" + charges + " Tid:" + tId);
}

function savePhysiotherapyTestChargesSlave() {

	var result = $("#testDetails").html();
	var testObj = eval('(' + result + ')');
	var halllist = $("#InvTestAllHallDetails").html();
	var halldetails = eval('(' + halllist + ')');

	var physiotherapyTestObj = 0;

	physiotherapyTestObj = {
			physiotherapyList : []

	};

	for ( var i = 0; i <testObj.physiotherapyList.length; i++) {

		var testid = testObj.physiotherapyList[i].physiotherapyId;
		var hallid = 0;
		var charges = $("#TestID" + testid + "-HallID0").val();
		var slaveid = $("#physiotherapyChargesSlaveID" + testid + "-0").val();

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"slaveId" : slaveid,
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrg = $("#TestID" + testid + "-HallID" + hlid).val();
			var slvid = $("#physiotherapyChargesSlaveID" + testid + "-" + hlid).val();

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrg,
				"slaveId" : slvid
			});
		}

		physiotherapyTestObj.physiotherapyList.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"physiotherapyId" : testid
		});

	}

	physiotherapyTestObj = JSON.stringify(physiotherapyTestObj);
	var inputs = [];
	inputs.push('action=savePhysiotherapyTestHallWiseCharges');
	inputs.push('physiotherapyTestObj=' + encodeURIComponent(physiotherapyTestObj));
	inputs.push('sid=' + encodeURIComponent(0));
	inputs.push('pageType=' + encodeURIComponent("NormalCharges"));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});
}

function saveOtherServicesChargesSlave() {
	//alert("hello");
	var result = $("#testDetails").html();
	var testObj = eval('(' + result + ')');
	var halllist = $("#InvTestAllHallDetails").html();
	var halldetails = eval('(' + halllist + ')');

	var otherServicesObj = 0;

	otherServicesObj = {
			oslist : []

	};

	for ( var i = 0; i <testObj.oslist.length; i++) {

		var testid = testObj.oslist[i].osid;
		var hallid = 0;
		var charges = $("#TestID" + testid + "-HallID0").val();
		var slaveid = $("#OSChargesSlaveID" + testid + "-0").val();

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"slaveId" : slaveid,
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrg = $("#TestID" + testid + "-HallID" + hlid).val();
			var slvid = $("#OSChargesSlaveID" + testid + "-" + hlid).val();

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrg,
				"slaveId" : slvid
			});
		}

		otherServicesObj.oslist.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"osid" : testid
		});

	}

	otherServicesObj = JSON.stringify(otherServicesObj);
	var inputs = [];
	inputs.push('action=saveOSHWCharges');
	inputs.push('otherServicesObj=' + encodeURIComponent(otherServicesObj));
	inputs.push('sid=' + encodeURIComponent(0));
	inputs.push('pageType=' + encodeURIComponent("NormalCharges"));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});
}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion
 ***********/
function setallservautocomplete(inputID) {
	
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	if(sponsorId > 0 && chargesSlaveId > 0){
		setallchargesConfigOnGenBillingIPDrDsk(inputID);
	}else{
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	var unitlist=listofunit.slice(1); 
	var depdocdeskid = $("#depdocdeskid").val();
    var querytype="all";
    var serviceid=0; 
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",
	
		success : function(r) {			 
			autoCompDoctorDesk(r,inputID);        
         }
	});
}
}
function setallchargesConfigOnGenBillingIPDrDsk(inputID) {
	//var listofunit = [];
	//var resultData = [];
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	// var unitlist=listofunit.slice(1);
	var unitlist = "";
	var depdocdeskid = $("#depdocdeskid").val();
	var querytype = "all";
	var serviceid = 0;
	
	var sponsorId = 0;
	sponsorId =  parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = 0;
	chargesSlaveId =parseInt($("#chargesSlaveId").val());
	var hallId = 2;
	var hallSlaveId = 0; 
	var treatId=$("#tr_Id").val();
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
		hallSlaveId = 0;
	}
	if (treatId == "" || treatId == null || treatId == undefined || isNaN(treatId)) {
		treatId = 0;
	}
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservicesConf",

		success : function(r) {
			
			autoCompDoctorDesk(r, inputID);

		}
	});
}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion services
 ***********/
function autoCompDoctorDesk(response,id) {
	
	var qty = id.slice(0, -1); // for dyamic col getting id
	var myArray = response;// parsing response in JSON format
	//alert(myArray);
	//alert("b");
	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to the
				// autocomplete widget.
				showHeader : true,
				columns : [ {
					name : 'CategoryName',
					width : '100px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '90px',
					valueField : 'serviceName'
				}/*, {
					name : 'doctypeId',
				//	width : '90px',
					valueField : 'doctypeId'
				}*/],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != 'Match') {
					//	$('#results').text(ui.item ? 'Selected: ' + ui.item.dn + ', '+ spl + ', '+ ui.item.specialisationName + ', ' + ui.item.depNm: 'Nothing selected, input was ' + this.value);
						//$('#' + id).val(ui.item.dn);
						//$('#userDocId').val(ui.item.ui);
						//$('#selectedObj').html(JSON.stringify(ui.item));
				
						if(ui.item.categoryName!="NO"){
							var depdocdeskid = $("#depdocdeskid").val();
						$('#txtautoserviceName').val(ui.item.categoryName);
/*						$("#subservicesname").val(ui.item.categoryName);
*/						$("#subserviceid").val(ui.item.categoryid);
/*						$("#servicename").val(ui.item.serviceName);
*/						$("#serviceid" ).val(ui.item.serviceid);
                        var sponsorId = $("#SponsorsourceTypeId").val();
                        var chargesSlaveId = $("#chargesSlaveId").val();
                     //   if(sponsorId > 0 && chargesSlaveId > 0){
                       
                       if(sponsorId == 0 && chargesSlaveId == 0){
                    	   if(depdocdeskid==2){
                      		 getchargesDR(2);
                     		var chargesfromConf= $("#chargesfromConf").val();
                     		if(chargesfromConf==0 || chargesfromConf==null){
                     			 $("#chargesubservice" ).val(ui.item.categorycharges); 
                     			 $("#cpoeCharges2").val(ui.item.categorycharges);
                     		}else{
                     			 $("#chargesubservice" ).val(chargesfromConf); 
                     			 $("#cpoeCharges2").val(chargesfromConf);
                     		}
                     	  }else{
                         		 	   $("#chargesubservice" ).val(ui.item.categorycharges);
                                	   $("#cpoeCharges2").val(ui.item.categorycharges); 
                         		 }
                   
                             }else{
                            	 getchargesDR(2);
                            	 var chargesfromConf= $("#chargesfromConf").val();
                            	 if(depdocdeskid==2){
                            	
                            		if(chargesfromConf==0 || chargesfromConf==null){
                            			if(parseFloat (chargesfromConf)==0.0 || parseFloat(chargesfromConf) ==0 || chargesfromConf ==null || chargesfromConf ==undefined){
                            				if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
                                   			 $("#chargesubservice").val(ui.item.categorycharges);

                               			 }else{
                                   			 $("#chargesubservice").val(ui.item.configcharges);

                               			 }
                            			}
                            			$("#cpoeCharges2").val(ui.item.categorycharges);

                            			/* $("#chargesubservice" ).val(ui.item.categorycharges); 
                            			 $("#cpoeCharges2").val(ui.item.categorycharges);*/
                            		}else{
                            			     $("#chargesubservice" ).val(chargesfromConf); 
                                           	 if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
                                			 $("#cpoeCharges2").val(ui.item.categorycharges);

                            			 }else{
                                			 $("#cpoeCharges2").val(ui.item.configcharges);

                            			 }
                            		}
                            	 }else{

                    			     $("#chargesubservice" ).val(chargesfromConf); 
                                   	 if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
                        			 $("#cpoeCharges2").val(ui.item.categorycharges);

                    			 }else{
                        			 $("#cpoeCharges2").val(ui.item.configcharges);

                    			 }
                    		
                        			 /*$("#chargesubservice" ).val(ui.item.categorycharges); 
                        			 $("#cpoeCharges2").val(ui.item.categorycharges);*/

                            	 }
                            	
                             }
                      
           			calculateEmerChrForDocDesskOpd();
						
						if($("#uId").val()==0){
							$("#allunitid").val(ui.item.categoryid);
						}
						fetchSuperCat(ui.item.categoryid);
						}
						if($("#serviceid" ).val()==11 || $("#serviceid" ).val()==13){
							//$("#cpoesndtolabdiv").show();
						}else{
							$("#cpoesndtolabdiv").hide();
						}
						
						if($("#serviceid" ).val()==12){
							$("#cpoeSendToRisdiv").show();
						}else{
							$("#cpoeSendToRisdiv").hide();
						}
						
						if($("#serviceid" ).val()==18){
							$("#cpoeSendToRaddiv").show();
						}else{
							$("#cpoeSendToRaddiv").hide();
						}
						$("#iscombination" ).val(ui.item.iscombination);
					}
				
					return false;
					/*setallservautocomplete(id);
					return false;*/
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstService.length);
					var result;
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'categoryName' : 'NO',
							'serviceName' : 'Match',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
			
				}
			});
}


/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:save cpoe
 ***********/
function saveCpoe(callfrom){
	 
	var	departmentId =  $("#depdocdeskid").val();
	
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	//var receiptOf  ="xyz";
	var receiptOf  ="general";
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
    var recSlaveId  =0;	//$('#receiptSlaveId').val();	//receipt slave id
	
	if (recSlaveId == "" || recSlaveId == null || recSlaveId == undefined || isNaN(recSlaveId)) {
		recSlaveId = 0;
	} 
	
	var emrPer=$("#emrPer").val();
	
	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer=0;
	}
	
	if(departmentId==2){
		//Call for IPDCpoe.
		saveIPDCpoe();
		
	}else{
	//adding by ajay:2-06-2020 update time check this varible if test is already send it lab and  Ris that time using this varible
	var flagUpdateorNotsendtoLab  =  $("#flagUpdateorNotsendtoLab").val();  	
	if(flagUpdateorNotsendtoLab==1)
	{
		alert("Can Not Updated this Test Because test already send It!! ");
		return false;
	}
	
	var flagUpdateorNotsendtoRis  =  $("#flagUpdateorNotsendtoRis").val();  	
	if(flagUpdateorNotsendtoRis==1)
	{
		alert("Can Not Updated this Test Because this test already send It!! ");
		return false;
	}
	
	var queryType 	 = "insert";
	var module 	 = "DrDesk";
	//var	patienttId   =  $("#patientId").text();
	//var	patientId   =  $("#patientId").val();
	//alert(patientId);
	var treatmentId  =  $("#treatmentId").val();  
	var patientId = $.trim(($("#patientId").val()));
	var callfrom1 = $("#callfromforprvTrtmnt").val();
	if (callfrom1 == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom1 == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	

	
	var	departmentId =  $("#depdocdeskid").val();
	var billId       =  $("#bill_Id").val();  
	var	sourceTypeId =  1;
	var rate = 0;
	var otherRate=0;
	var otherAmount=0;
	if (sponsorId > 0 && chargesSlaveId > 0) {
		receiptOf="sponsor";
		getchargesDR(0);
		otherRate = parseFloat($("#chargesfromConf").val());
		if(otherRate== 0 || otherRate== 0.0){
			getchargesDR(2);
			otherRate =	parseFloat($("#chargesubservice").val());
			}
		if(otherRate== 0 || otherRate== 0.0){
			
			otherRate =	parseFloat($("#chargesubservice").val());
			
		}
		var emrgancyper=parseFloat($('#emrPer').val());
		var emp=parseFloat(otherRate*emrgancyper/100);
		otherRate = parseFloat(emp + otherRate);
		otherAmount=otherRate *1;
		
	}
	   //rate =	$("#chargesubservice").val();	
		 rate =  $("#cpoeCharges2").val();
	
	var quantity     =  1;
	var amount       =  rate * 1;  
	
	var billCat		 = $("#billCat").val();
	var coPay        = 0;
	if(billCat==0)
	{
		coPay=amount;
		
	}
	
	//for sponcer patient pkg.
	if(callfrom =="sponsorpack"){
		callfrom="";
		sponsorId =0;
		chargesSlaveId = 0;
	}else{
		callfrom="DrDesk";
	} 
	//Added by Laxman.
	var iscombination =$("#iscombination" ).val();

	var serviceId    =  $("#serviceid" ).val();
	var subServiceId =  $("#subserviceid").val();

	var billDetailsId     = $("#billidservice").val();

    var subservicesname   = $("#txtautoserviceName").val();
    var servicename       = $("#servicename").val();
    var unitId            = $("#uId").val();
    var doctorId          = $("#doctor2").val();                         
    var clinicalNotes     = $("#cpoeClinicalNotes").val();
    var instructions      = $("#cpoeIns").val();
    var urgentflag='N';
    var sndToLabFlag='N';
    var	sendToRisFlag = 'N';
    var radiationFlag='N';
   // var paid_flag='N';
   //alert(subservicesname);
   /* if(serviceId=='12'){
    	paid_flag='Y';
    }*/
    var drdeskflag="-";
    if(departmentId==3){
    	drdeskflag='D';
    }else{
     drdeskflag='Y';
    }
    
    if($("#cpoeUrgent").is(':checked')){
    	urgentflag='Y';
    }
    /*if($("#cpoesndtolab").is(':checked')){
    	sndToLabFlag='Y';
    	sendToRisFlag='N';
    }*/
    if($("#cpoeSendToRad").is(':checked')){

        radiationFlag='Y';
    }
	if (subservicesname == "" ||  subservicesname ==null) {
		alert("Please enter servicename ");
		return false;
	}
	if(unitId ==0){
		unitid = $("#allunitid").val();
	}
	var doctorsel = $("#doctor2 :selected").val();
	
	if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
		//alert("Please Select doctor ");
		//return false;
		
	}
	if (clinicalNotes == "" ||  clinicalNotes ==null) {
		clinicalNotes="-";
	}
	if (instructions == "" ||  instructions ==null) {
		instructions="-";
	} 
	
	//Added by sanjay on savecpoe send to ris opd/digno.
	if($("#cpoeSendToRis").prop("checked")==true){
		sendToRisFlag = 'Y';
		sndToLabFlag='N';
	}
	

	
	var serviceDetails = {
            listBillDetails : []
        };

	
	serviceDetails.listBillDetails.push({
    	billDetailsId:billDetailsId,
    	patienttId : $("#patientId").text(),
    	treatmentId :  $("#tr_Id").val(),
        departmentId : departmentId,
        billId : billId,
        sourceTypeId : sponsorId,
        rate : rate,
        quantity : quantity,
        amount : amount,
        serviceId : serviceId,
        subServiceId : subServiceId,
        doctorId:doctorId,
        urgentflag:urgentflag,
        clinicalnotes:clinicalNotes,
        instructions:instructions,
        unitId : unitId,
        coPay  :coPay,
        drdeskflag:drdeskflag,
        callfrom : callfrom,
        sponsorId  : sponsorId,
        chargesSlaveId : chargesSlaveId,
        iscombination : iscombination,
        otherRate : otherRate,
        otherAmount : otherAmount,
        otherPay :otherAmount,
        receiptOf : receiptOf,
        recSlaveId : recSlaveId,
        sndToLabFlag : sndToLabFlag,
		sendToRisFlag : sendToRisFlag,
		rFlag : radiationFlag,
		emrPer : emrPer
		//paidFlag:paid_flag
    });
    
	//Added by Laxman on 04-March-2018 for service send to lab.
	var subList 	= {	subSrvList : [] };
	subList.subSrvList.push({
		serviceId		: serviceId,
		subSrvid 		: subServiceId,
		refDocId		: doctorId,
	});	
    serviceDetails = JSON.stringify(serviceDetails);
    subList = JSON.stringify(subList);
    
	var inputs = [];
	inputs.push('module=' + module);
	inputs.push('queryType=' + queryType);
	inputs.push('serviceDetails=' + serviceDetails);
	inputs.push('callfrom=' + callfrom);
	inputs.push('subList=' + subList);
	/*inputs.push('billDetailsId=' + billDetailsId);
	inputs.push('patienttId=' + patienttId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('sourceTypeId=' + sourceTypeId);
	inputs.push('billId=' + billId);
	inputs.push('amount=' + amount);
	inputs.push('quantity=' + quantity);
	inputs.push('departmentId=' + departmentId);
	inputs.push('rate=' + rate);
	inputs.push('subServiceId=' + subServiceId);
	inputs.push('serviceId=' + serviceId);
	inputs.push('unitId=' + unitId);
	inputs.push('doctorId=' + doctorId);
	
	
	inputs.push('ClinicalNotes=' + ClinicalNotes);
	inputs.push('instructions=' + instructions);
	inputs.push('urgentflag=' + urgentflag);*/
	
		var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/saveOpdIpdCpoe",
	
		success : function(r) {
			
			 
		if(r ==1){
			alertify.success("Service assign Successfully");
			if(departmentId==3){
				fetchbilldetailsDigno();
				 
 			}else{
			
			fetchbilldetails();
 			}
			$('#txtautoserviceName').val("");
			$("#subservicesname").val("");
			$("#doctor2").val("0");
			$("#chargesubservice").val("");
			
			$("#servicename").val("");
			    $("#cpoeClinicalNotes").val("");
			   $("#cpoeIns").val("");
			   $('#txtautoserviceName').attr('readonly',false);
			   $('#dynamicItem').html("");
			   $('#cpoeUrgent').attr('checked', false);
			   $("#cpoesndtolabdiv").hide();
			   $('#cpoesndtolab').attr('checked', false);
			}else if (r ==3) {
				
				alert("Package is not Configure Please Configure Package!");
				return false;
			}else if(r ==4){
				var res = confirm("Package is not configure for sponsor. Do you want Default Package?");
				if (res == true) {
					//For opd sponsor patient.
					saveCpoe('sponsorpack');
				}else{
					
					return false;
				}
				
			}else if(r ==6){
				 alert("Package is out of Date Can't save!!!!");
				
			}else if(r ==2){
				 alertify.success("Update successfully...!!!");
				 $('#txtautoserviceName').val("");
				 $("#subservicesname").val("");
				 $("#doctor2").val("0");
				 $("#chargesubservice").val("");
				 $("#servicename").val("");
				 $("#cpoeClinicalNotes").val("");
				 $("#cpoeIns").val("");
				 $('#txtautoserviceName').attr('readonly',false);
				 $('#dynamicItem').html("");
				 $('#cpoeUrgent').attr('checked', false);
				 $("#cpoesndtolabdiv").hide();
				 $('#cpoesndtolab').attr('checked', false);
				 $("#chargesubservice").val(0);
				 $("#cpoeCharges2").val(0);
				 $("#billidservice").val(0);
				
			}
		}	
		
	});
	}
}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:fetchbilldetails
 ***********/
function fetchbilldetails(){
	
	var tID  = $("#treatmentId").val(); 
	//alert(tID);
	
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		tID = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		tID = $("#treatmentId").val();
	}
	
	/*var depid= $("#depdocdeskid").val(); */
    var servid=0;
	if(tID==0){
		
	//	return false;
		
	}
	
	
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/fetchbilldetails",
		data	: {
			"tID"        : $("#tr_Id").val(),
			"callform"   :callform,
			"servid"      :servid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			/* testRowCountcpoe = 1;
			$("#tcpoeservices").setTemplate(servicedetails);
			$("#tcpoeservices").processTemplate(response);
			  var jsonConvertedData = JSON.stringify(response);
			$("#billdetailsnew").html(jsonConvertedData);
			lengthofServiceAdvised=response.cpoeServdetails.length;
			if (response.cpoeServdetails.length == 0) {
				$("#collapseService").slideUp('fast');
				$("#tcpoeservices").hide();
				
			} else {
				$("#collapseService").slideDown('slow');
				$("#tcpoeservices").show();
			}*/
			
			    testRowCountcpoe = 1;
			
				$("#tcpoeservices").setTemplate(servicedetails);
				$("#tcpoeservices").processTemplate(response);
				  var jsonConvertedData = JSON.stringify(response);
				 
				$("#billdetailsnew").html(jsonConvertedData);
			//setAllLabOrders(response);
			
		}
		
	});
	
}
function editCPOE_Testnew(values){
	var id=0;
	var countcheckbox=0;
	$.each($('#chkunserv:checked'), function() {
		id = $(this).val();
		countcheckbox++;
		//$("#cpoesndtolabdiv").show();
		});
	if(countcheckbox>1){	
		alert("can not multiple test edit");	
		return false;
	}
/*	if($("#serviceid" ).val()==11 || $("#serviceid" ).val()==13){
		$("#cpoesndtolabdiv").show();
	}else{
		$("#cpoesndtolabdiv").hide();
	}
	*/
		/*var emrP =parseFloat($('#empR'+id).html());	*/
		if(id==0){
			alert("Please Check test to edit!!");
		}else{
			var depid= $("#depdocdeskid").val(); 
			var myArray = JSON.parse($("#billdetailsnew").html());
			if(depid==1){
				for ( var k = 0; k < myArray.cpoeServdetails.length; k++) {
					//console.log(JSON.stringify(myArray.cpoeServdetails));
					
					if(myArray.cpoeServdetails[k].billdetailsid == id){
						$("#cpoeIns").val(myArray.cpoeServdetails[k].clinical_notes);
						$("#cpoeClinicalNotes").val(myArray.cpoeServdetails[k].instructions);
						//$("#doctor2").val(myArray.cpoeServdetails[k].doctor_id);
						$('#doctor2').select2('val', myArray.cpoeServdetails[k].doctor_id);
						$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
						$("#subserviceid").val(myArray.cpoeServdetails[k].categoryid);
						$("#txtautoserviceName").val(myArray.cpoeServdetails[k].categoryName);
						$("#txtautoserviceName").attr('readonly',true);
						$("#billidservice").val(myArray.cpoeServdetails[k].billdetailsid);
						$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
						$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
						//alert(JSON.stringify(myArray.cpoeServdetails[k].sndtolabflag));
						//$("#cpoesndtolab").val(myArray.cpoeServdetails[k].sndtolabflag);
						var sentlabflag = (myArray.cpoeServdetails[k].sndtolabflag);
					//	alert(sentlabflag);
						
						//$('#cpoesndtolab').val(sentlabflag); 
						if (sentlabflag > 'Y' || sentlabflag == 'Y' ) 
						{
							$("#cpoesndtolab").prop("checked", true);
						
						}
						
						//alert(myArray.cpoeServdetails[k].sndtorisflag);
						
						if(myArray.cpoeServdetails[k].sndtorisflag=="Y"){
							$("#cpoesndtolabdiv").hide();
							$("#cpoeSendToRisdiv").show();
							$("#cpoeSendToRis").prop("checked", true);
						}
						
						
						var emrP =parseFloat(myArray.cpoeServdetails[k].emrPer);
						if(isNaN(emrP))
							{
								emrP=0;
							}
					
							$('#emrPer').val(emrP); 
							if (emrP > 0 || emrP == 0 ) 
								{
									$("#emrChrFlag").prop("checked", true);
									$('#emrPer').css("display","inline");
								}
						fetchSuperCat(myArray.cpoeServdetails[k].categoryid);
					}
				}	
			}else if(depid==3){
				
				for ( var k = 0; k < myArray.cpoeServdetails.length; k++) {
					
					if(myArray.cpoeServdetails[k].billdetailsid == id){
					
						$("#cpoeIns").val(myArray.cpoeServdetails[k].instructions);
						$("#cpoeClinicalNotes").val(myArray.cpoeServdetails[k].clinical_notes);
						//$("#doctor2").val(myArray.cpoeServdetails[k].doctor_id);
						$('#doctor2').select2('val', myArray.cpoeServdetails[k].doctor_id);
						$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
						$("#subserviceid").val(myArray.cpoeServdetails[k].categoryid);
						$("#txtautoserviceName").val(myArray.cpoeServdetails[k].categoryName);
						$("#txtautoserviceName").attr('readonly',true);
						$("#billidservice").val(myArray.cpoeServdetails[k].billdetailsid);
						$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
						$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
						
						//$("#cpoesndtolab").val(myArray.cpoeServdetails[k].sndToLabFlag);
						//$('#cpoesndtolab').attr('checked', true);
						var sentlabflag = (myArray.cpoeServdetails[k].sndtolabflag);						
						if (sentlabflag > 'Y' || sentlabflag == 'Y' ) 
							{						
								$("#cpoesndtolab").prop("checked", true);
								
								$("#cpoesndtolab").attr({disabled:"true"});
								
								$("#flagUpdateorNotsendtoLab").val(1);							
							}
						
						if(myArray.cpoeServdetails[k].sndtorisflag=="Y"){
							
							$("#cpoesndtolabdiv").hide();
							
							$("#cpoeSendToRisdiv").show();
							
							$("#cpoeSendToRis").prop("checked", true);
							
							$("#cpoeSendToRis").attr({disabled:"true"});
							
							$("#flagUpdateorNotsendtoRis").val(1);		
						}
					
						var emrP =parseFloat(myArray.cpoeServdetails[k].emrPer);
						if(isNaN(emrP))
							{
								emrP=0;
							}
					
							$('#emrPer').val(emrP); 
							if (emrP > 0 || emrP == 0 ) 
								{
									$("#emrChrFlag").prop("checked", true);
									$('#emrPer').css("display","inline");
								}
						fetchSuperCat(myArray.cpoeServdetails[k].categoryid);
					}
				}
				
			}else{
				
			
				for ( var k = 0; k < myArray.cpoeServdetails.length; k++) {
					
					if(myArray.cpoeServdetails[k].billipd_id == id){
						$("#cpoeIns").val(myArray.cpoeServdetails[k].instructions);
						$("#cpoeClinicalNotes").val(myArray.cpoeServdetails[k].clinical_notes);
						//$("#doctor2").val(myArray.cpoeServdetails[k].doctor_id);
						$('#doctor2').select2('val', myArray.cpoeServdetails[k].doctor_id);
						$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
						$("#subserviceid").val(myArray.cpoeServdetails[k].categoryid);
						$("#txtautoserviceName").val(myArray.cpoeServdetails[k].categoryName);
						$("#txtautoserviceName").attr('readonly',true);
						$("#billidservice").val(myArray.cpoeServdetails[k].billipd_id);
						$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
						$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
						$("#cpoesndtolab").val(myArray.cpoeServdetails[k].sndtolabflag);
					//	$('#cpoesndtolab').attr('checked', true);
						var emrP =parseFloat(myArray.cpoeServdetails[k].emrPer);
						if(isNaN(emrP))
							{
								emrP=0;
							}
					
							$('#emrPer').val(emrP); 
							if (emrP > 0 || emrP == 0 ) 
								{
									$("#emrChrFlag").prop("checked", true);
									$('#emrPer').css("display","inline");
								}
						fetchSuperCat(myArray.cpoeServdetails[k].categoryid);
					}
				}
			}
			
			
			
		
		}

}
var testRowCountcpoe = 1;

var servicedetails = '{#foreach $T.cpoeServdetails as cpoeservice}<tr>'
	+ '<td class="col-md-1-1 center">{testRowCountcpoe}.</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.categoryName}</td>'
	+ '<td class="col-md-1-1 center"> {$T.cpoeservice.created_date_time}</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.docName}</td>'
	+ '<td class="col-md-2 center">{$T.cpoeservice.servicename}</td>'
	+ '<td style="display:none;" id="empR{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.emrPer}</td>'
	+ '<td style="display:none;" id="rate{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.rate}</td>'
	+ '<td style="display:none;" id="subserviceid{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.categoryid}</td>'
	+ '<td style="display:none;" id="sId{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.serviceid}</td>'
	+ '<td style="display:none;" id="dId{$T.cpoeservice.billdetailsid}" class="col-md-2 center">{$T.cpoeservice.doctor_id}</td>'


	+ '{#if $T.cpoeservice.deleted == "N" && $T.cpoeservice.cancel == "N"}'
	
	+ '{#if $T.cpoeservice.paid_flag == "Y"}'
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: orange;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv" class="btn disabled" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice disabled"  onclick=deleteCpoeServ({$T.cpoeservice.billdetailsid},\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
	+'{#/if}'
	+ '{#if $T.cpoeservice.paid_flag == "N"}'
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: green;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	
	+ '{#if $T.cpoeservice.servicename == "Pathology"}'
	+ '{#if $T.cpoeservice.sndtolabflag == "Y"}'
	+ '<td class="col-md-1-1 center">'
	//+ '<input id="chkOpdBill{$T.cpoeservice.billipd_id}" type="checkbox" class="btn disabled" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '<input type="button" id="chkOpdBill{$T.cpoeservice.billdetailsid}" value ="Sent" style="width:60px; background-color: orange;" disabled ></input></td>'
	+'{#/if}'
	+ '{#if $T.cpoeservice.sndtolabflag == "N"}'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkOpdBill{$T.cpoeservice.billdetailsid}" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	+'{#/if}'
	+'{#/if}'
	+ '{#if $T.cpoeservice.servicename != "Pathology"}'
	+ '<td class="col-md-1-1 center">'
	+ '-</td>'
	+'{#/if}'
	
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteCpoeServ({$T.cpoeservice.billdetailsid},\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
	+'{#/if}'
	
	+ '{#else}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: red;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv" class="btn disabled" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billdetailsid}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice"  onclick=deleteCpoeServ({$T.cpoeservice.billdetailsid},\'DR\') ><i class="fa fa-trash-o"></i></button></td>'
	
	+'{#/if}'
	
	+ '</tr>{testRowCountcpoe++}{#/for}';


/************
 *@author	: Kishor Lokhande
 *@date		: 23-May-2017
 *@code		:Disply unit list on login page
 ***********/

/*function unitMasterListOnLogin()
{
	
		//var ulogin ="userName";
		var ulogin =$("#userType").val();
		//alert(ulogin);
		jQuery.ajax({
			
			async : false,
			type : "POST",
			url : "ehat/unit/unitMasterListOnLogin",
			data : {
			"ulogin" : ulogin
		},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
			alert('error');
		},
		
			success : function(r) 
			{
					//refreshUnitMaster();		
				setTemplateForLoginUnitSelectList(r);	
		}
	});	
		
}*/


/*******************************************************************************
 * @author paras suryawanshi
 * @date 16_May_2017 
 * @Code Fetching data 
 ******************************************************************************/

function getAllUnitdrdesk() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/unit/fetchUnitList",

				success : function(r) {
					setTemplateForLoginUnitSelectList(r);
					
					var unitiddr=$("#uids").val();
					$("#uId").val(unitiddr);
				}
			});
}
var listofunit ="";
function setTemplateForLoginUnitSelectList(r){
	
	var list="<option value='0'>All</option>";
	
	//alert(list);
	for ( var int = 0; int < r.lstUnit.length; int++) {

		//list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
		list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
		listofunit= listofunit+","+(r.lstUnit[int].unitId);
		//list=list+'<option <input type="hidden" unitId="'+(r.lstUnit[int].unitId)+'" name="uId" value="'+(r.lstUnit[int].unitName)+'"></option>';
		//temp= '<li> '+  ul +' <input type="hidden" id="ul'+uls+'" name="unitList" value="'+uls+'"> </li>';	
	}	
	
	$("#uId").html(list);
}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:cleartexrfiled
 ***********/
function cleartexrfiled(){
	$("#txtautoserviceName").val("");
	
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:deleteCpoeServ
 ***********/
function deleteCpoeServ(values,callform){
	//alert(callform+"   aa    "+values);
	var labservicelist ='';
	//var cnt =-1;
	deleteType="Y";
	if (values=='multiple'){
		
		$.each($('#chkunserv:checked'), function() {
			//alert("aa");
		//	labservicelist.push(parseInt($(this).val()));
			labservicelist=labservicelist+","+$(this).val();
			//alert(labservicelist);
		});
		
		 if(labservicelist.length==0){
			   
			   
			   alert("Please check  at least Service to delete");	   
			   return false;
			   
		   }
	}else{
		labservicelist=labservicelist+","+ values;
		
	}
	
	
	//call for delete test in lab on 08-March-2018.
	deleteLabTestCpoe(labservicelist,deleteType,values,callform);
 
	if(deleteTestSmplColFlg=="Y"){
		alert("Test Sample are collected,You can't cancel or delete this Test.");
		return false;
	}
	//	labservicelist = JSON.stringify(labservicelist);	
	
	//Added by Vikas Godse for Delete Investigation Test from cpoe
	deleteInvTestCpoe(labservicelist,deleteType,values,callform);
	if(risReportFlag=="Y"){
		alert("Test Report are created,You can't cancel or delete this Test.");
		return false;
	}
	
	var tk = labservicelist.slice(1); 
	
	var r = confirm("Are You Sure You Want To Permanantly Delete this row ?");
 	if (r == true) { 

	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/deleteservdetails",
		data	: {
			
		  "labservicelist" : tk,
			"callform":callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			
			if(response.indexOf("Delete") != -1){
				alertify.success(response);
			}
			else{
				alertify.error(response);
				return false;
			}
			
			if(callform=="DR"){
			
			
					fetchbilldetails();   //for OPD 
				
				
			}else if(callform=="IPD"){
				
				fetchipddetailsdrdesk();  //for ipd
				
			}else if(callform=="Diagno"){
				
				fetchbilldetailsDigno(); //for Diagno
				
			}
			else {
				fetchipdbilldetails(callform);  //for ot
			}
			
			
		}
		
	});
 }
}


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 3_June_2017
 * @Code Getting Patient Data By Id
 ******************************************************************************/
function getpatientTrIddrdesk(r) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
		//	alert("r.listRegTreBillDto[1].docName>>"+r.listRegTreBillDto[1].docName);
			// setTempPatientRecords(r);
			console.log(r);
  			 /*****Added By Sagar******/
			//	getSponsorRecords(r.listRegTreBillDto[0].chargesMasterSlaveId,r.listRegTreBillDto[0].sourceTypeId);
			var date=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString();
 			/* alert(); */
			$("#patientId").text(r.listRegTreBillDto[0].patientId);
			$("#pId").text(r.listRegTreBillDto[0].centerPatientId);
			$("#pt_Id").val(r.listRegTreBillDto[0].patientId);
			$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
			$("#pid").val(r.listRegTreBillDto[0].patientId);
 			$("#age").text(r.listRegTreBillDto[0].age);
			$("#patientName").text(r.listRegTreBillDto[0].patientName );
			 $("#pname").text(r.listRegTreBillDto[0].patientName );
			 $("#mrnID").val(r.listRegTreBillDto[0].mrnno );
			 
		    $("#billNo").text(r.listRegTreBillDto[0].billId);
		    $("#bill_Id").val(r.listRegTreBillDto[0].billId); 
		    $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
		    $("#consultingDoctor").text(r.listRegTreBillDto[0].invoiceCount);
		    //****hidden set for bmi****//
		    $("#dbirth").val(r.listRegTreBillDto[0].dob) ;
			$("#weight1").val(r.listRegTreBillDto[0].weight) ;
 			$("#height1").val(r.listRegTreBillDto[0].height) ;
 			
 			$("#h_w").text(r.listRegTreBillDto[0].height+" / "+r.listRegTreBillDto[0].weight) ;
		   
		    $("#drid").val(r.listRegTreBillDto[0].doctorId);	
		    $("#sex").text(r.listRegTreBillDto[0].gender);
 			$("#ipdNo").text(r.listRegTreBillDto[0].fName);
 			$("#refDoctor").text(r.listRegTreBillDto[0].docNameChan); 
 			$("#dod").text(r.listRegTreBillDto[0].dischargeDate); 
 			//By Pooja Sukre
 			if(r.listRegTreBillDto[0].sourceTypeId>0){
 				sponsorTypeList(r.listRegTreBillDto[0].sourceTypeId);
 				$("#corporate").text(r.listRegTreBillDto[0].categoryName);
 			}else{
				$("#billCategoty").text("Self");
				$("#corporate").text("-");
				$("#billCat").val(r.listRegTreBillDto[0].sourceTypeId);

			}
			  $("#ipdNo").text(r.listRegTreBillDto[0].trcount);
 			  $("#doa").text(date);
 			  $("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
			  $("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
			  var fileName=r.listRegTreBillDto[0].imageName;	
			  if(fileName!="" && fileName!=null && fileName!=undefined){
				  $('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
			  }
			  $("#physicalDisFlag").val(r.listRegTreBillDto[0].physicalDisFlag);
			  //getSponsorRecords(r.listRegTreBillDto[0].chargesMasterSlaveId,r.listRegTreBillDto[0].sourceTypeId);
		}
	});
}
function seldoctor(){
	
	var docName=$("#docName").html();
	//alert(docName);
	var list="<option value='0'>"+ docName +"</option>";
	$("#doctorForPhysiotherapy").html(list);

	//
	
}

/********
 * @author	Touheed
 * @base 	Fetching super master of service based on there id
 * @since	1st-June-2017
 ********/
function fetchSuperCat(serviceId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			//$("#cpoeCharges").val(response.lstSubService[0].charges);
			//$("#chargesubservice").val(response.lstSubService[0].charges); 
	/*		var rate=response.lstSubService[0].charges; 
			var emp=parseFloat(rate*emrP/100);
			rate = parseFloat(emp + rate);*/
		//	$("#chargesubservice").val(rate); 
			
	//old  $("#cpoeCharges2").val(response.lstSubService[0].charges);
		  
			//calculateEmerChrForDocDesskOpd();
			setDyanamicDivForList('dynamicItem',response);
		}
	});
}



//Touheed for multiselect
/********
 * @author	Touheed
 * @base 	Setting fectched Response of fetchSuperCatogoires 
 * @since	1st-June-2017
 ********/
function setDyanamicDivForList(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count =i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
		 htm = htm+ '<li class="select2-search-choice" id="liItme'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
		 	
		 if(response.lstSubService[i].serviceId == 11 || response.lstSubService[i].serviceId == 13){
		 	//$("#cpoesndtolabdiv").show();
			$("#cpoeSendToRisdiv").hide();
		 	$("#cpoesndtolab").prop("checked", true);
			
			}
			
			if(response.lstSubService[i].serviceId == 12){
				$("#cpoesndtolabdiv").hide();
				$("#cpoeSendToRisdiv").show();
				$("#cpoeSendToRis").prop("checked", true);
			}
		 
	}
	$('#' + setDiv).html(htm);
}

function setDocNamedrdesk() {
	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('date=onload');
	inputs.push('docType=doc');
	inputs.push('drDeptId='+ 0);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {	
			var doctorBean = eval('(' + r + ')');
			//$("#doctor2").setTemplate("<option value='0'>-select-</option>{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}");
			//$("#doctor2").processTemplate(doctorBean);
		///	$("#doctor2").select2();
		}
	});
}





/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:save cpoe
 ***********/
function saveIPDCpoe(callfrom){ 
	var queryType 	 = "insert";
	var module 	 = "OT";
	//var	patienttId   =  $("#patientId").text();
	var	patienttId   =  $("#pt_Id").val();
	var treatmentId  =  $("#tr_Id").val();  
	var	departmentId =  2;
	var billId       =  $("#bill_Id").val();  
	var	sourceTypeId =  1;
	var receiptOf  ="general";
	var rate = 0;
	var otherRate=0;
	var otherAmount=0;
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var sndToLabFlag='N';
	var sendToRisFlag ='N';
	var hallId  =$("#hallId").val();
	
	var emrPer=$("#emrPer").val();
	
	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer=0;
	}
	
	if (sponsorId > 0 && chargesSlaveId > 0) {
		getchargesDR(2);
		otherRate = parseFloat($("#chargesfromConf").val());
		if(otherRate== 0 || otherRate== 0.0){
			getchargesDR(0);
			otherRate =	parseFloat($("#chargesfromConf").val());
			}
		if(otherRate== 0 || otherRate== 0.0){
			
			otherRate =	parseFloat($("#chargesubservice").val());
			
		}
		//added by Tarique Aaalam		
		var emrgancyper=parseFloat($('#emrPer').val());
		var emp=parseFloat(otherRate*emrgancyper/100);
		otherRate = parseFloat(emp + otherRate);		
		otherAmount=otherRate *1;
		
	}
		
		/*if (sponsorId > 0 && chargesSlaveId > 0){
			receiptOf  ="sponsor";
			 rate =	$("#chargesubservice").val();	
	    }else{
	    	// rate = otherAmount;
	    	 rate =	$("#chargesubservice").val();	
	    }*/
	rate =	$("#cpoeCharges2").val();	
	var quantity     =  1;
	var amount       =  rate * 1;  
	
    var recSlaveIdIPD  =0;	//$('#receiptSlaveId').val();	//receipt slave id
	
	if (recSlaveIdIPD == "" || recSlaveIdIPD == null || recSlaveIdIPD == undefined || isNaN(recSlaveIdIPD)) {
		recSlaveIdIPD = 0;
	} 
	
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	
	var iscombination =$("#iscombination" ).val();
	var serviceId    =  $("#serviceid" ).val();
	var subServiceId =  $("#subserviceid").val();

	var billDetailsId     = $("#billidservice").val();
    var subservicesname   = $("#txtautoserviceName").val();
    var servicename       = $("#servicename").val();
    var unitId            = $("#uId").val();
    var doctorId          = $("#doctor2").val();                         
    var clinicalNotes     = $("#cpoeClinicalNotes").val();
    var instructions      = $("#cpoeIns").val();
    var urgentflag='N';
  //  var ot_flag='N';
    var ot_flag='Y';
    var drdeskflag='D';
    var radiationFlag='N';
    var coPay        = amount;
    
    if(callfrom == "IpdSponsor3"){
    	hallId =2;
    	sponsorId =0;
    	chargesSlaveId =0;
    }else if(callfrom == "IpdSponsor4"){
    	hallId =0;
    	sponsorId =0;
    	chargesSlaveId =0;
    }else{
    callfrom="DrDeskIPD";
    }
    
    if($("#cpoeUrgent").is(':checked')){
    	urgentflag='Y';
    }

    //Added by Laxman on 04-March-2018 for send to lab flag.
    if(serviceId=="11" || serviceId=="13"){
    	 /*if($("#cpoesndtolab").is(':checked')){
    	    	sndToLabFlag='Y';
    	    	sendToRisFlag = 'N';
    	    }*/
    }else if(serviceId=="12"){
    	//Added by sanjay on savecpoe send to ris ipd.
    	if($("#cpoeSendToRis").prop("checked")==true){
    		sendToRisFlag = 'Y';
    		sndToLabFlag='N';
    		
    	}
    }else if(serviceId=="18"){
    	 if($("#cpoeSendToRad").is(':checked')){
           radiationFlag='Y';
       }
    }
  
	
	if (subservicesname == "" ||  subservicesname ==null) {
		alert("Please enter servicename ");
		return false;
	}
	if(unitId ==0){
		unitid = $("#allunitid").val();
	}
	var doctorsel = $("#doctor2 :selected").val();
	
	if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
	//	alert("Please Select doctor ");
	//	return false;
		
	}
	if (clinicalNotes == "" ||  clinicalNotes ==null) {
		clinicalNotes="-";
	}
	if (instructions == "" ||  instructions ==null) {
		instructions="-";
	}
	
	
	
	var serviceDetails = {
			listBillDetailsIpd : []
        };
	serviceDetails.listBillDetailsIpd.push({
		billDetailsId:billDetailsId,
		patienttId : patienttId,
        treatmentId : treatmentId,
        departmentId : departmentId,
        billId : billId,
        sourceTypeId : sponsorId,
        chargesSlaveId:chargesSlaveId,
        rate : rate,
        quantity : quantity,
        amount : amount,
        serviceId : serviceId,
        subServiceId : subServiceId,
      
        doctorId:doctorId,
        urgentFlag:urgentflag,
        clinicalnotes:clinicalNotes,
        instructions:instructions,
        unitId : unitId,
        ot_flag:ot_flag,
        coPay  :coPay,
        drdeskflag:drdeskflag,
        callfrom : callfrom,
        otherRate : otherRate,
        otherAmount : otherAmount,
        otherPay :otherAmount,
        onBedFlag:"N",
        receiptOf : receiptOf,
        recSlaveIdIPD : recSlaveIdIPD,
        sndToLabFlag : sndToLabFlag,
		sendToRisFlag : sendToRisFlag,
		iscombination : iscombination,
		hallId     : hallId,
		sponsorId  : sponsorId,
		rFlag : radiationFlag,
		emrPer : emrPer
    });
    
	var subList 	= {	subSrvList : [] };
	subList.subSrvList.push({
		serviceId		: serviceId,
		subSrvid 		: subServiceId,
		refDocId		: doctorId,
	});	
    subList = JSON.stringify(subList);
    serviceDetails = JSON.stringify(serviceDetails);
	
	var inputs = [];
	inputs.push('module=' + module);
	inputs.push('queryType=' + queryType);
	inputs.push('serviceDetails=' + serviceDetails);
	inputs.push('callfrom=' + callfrom);
	inputs.push('subList=' + subList);
	/*inputs.push('billDetailsId=' + billDetailsId);
	inputs.push('patienttId=' + patienttId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('sourceTypeId=' + sourceTypeId);
	inputs.push('billId=' + billId);
	inputs.push('amount=' + amount);
	inputs.push('quantity=' + quantity);
	inputs.push('departmentId=' + departmentId);
	inputs.push('rate=' + rate);
	inputs.push('subServiceId=' + subServiceId);
	inputs.push('serviceId=' + serviceId);
	inputs.push('unitId=' + unitId);
	inputs.push('doctorId=' + doctorId);
	
	
	inputs.push('ClinicalNotes=' + ClinicalNotes);
	inputs.push('instructions=' + instructions);
	inputs.push('urgentflag=' + urgentflag);*/
	
		var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/saveOpdIpdCpoe",
	
		success : function(r) {
			
			 
		if(r==1){
			alertify.success("Service assign Sucessfully");
			fetchipddetailsdrdesk();
			$('#txtautoserviceName').val("");
			$("#subservicesname").val("");
			$('#dynamicItem').html("");
			$("#servicename").val("");
			$("#cpoeClinicalNotes").val("");
			$("#cpoeIns").val("");
			$('#cpoeUrgent').attr('checked', false);
			$("#cpoesndtolabdiv").hide();
			$("#doctor2").val(0);
			$("#chargesubservice").val(0);
			$("#cpoeCharges2").val(0);
			$("#billidservice").val(0);
			
			//$('#cpoesndtolab').attr('checked', false);
			}else if (r ==3) {
				var res = confirm("Package is not configure for Hall and sponsor. Do you want Default Hall Package?");
				if (res == true) {
					
					saveIPDCpoe('IpdSponsor3');
				}else{
					return false;
				}
			}else if (r == 4) {
				var res = confirm("Package is not configure for Hall and sponsor. Do you want Default Package?");
				if (res == true) {
					
					saveIPDCpoe('IpdSponsor4');
				}else{
					return false;
				}
			}else if (r == 2) {
				alertify.error("Duplicate Test Can not be Saved");
			}else{
				alert("Network Issue!!!!");
			}
		}	
		
	});
	
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:fetchbilldetails
 ***********/
function fetchipddetailsdrdesk(callfrom){
	
	var tID  = $("#tr_Id").val(); 
	

	if(tID==0){
		
	//	return false;
		
	}
 	
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/fetchipddetailsdrdesknew",
		data	: {
			"tID"        : tID,
			"callform"   :callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			//alert(response.cpoeServdetails.length);
			
			testcountipd = 1;
			if(callfrom=="AutoDischarge"){
				 
				$("#tcpoeservices").setTemplate(servicedetailsipdDischarge);
				$("#tcpoeservices").processTemplate(response);
				
				$("#teleMedicpoeservices").setTemplate(servicedetailsipdDischarge);
				$("#teleMedicpoeservices").processTemplate(response);
  			}else{
  				 
			$("#tcpoeservices").setTemplate(servicedetailsipd);
			$("#tcpoeservices").processTemplate(response);
			  var jsonConvertedData = JSON.stringify(response);
				$("#billdetailsnew").html(jsonConvertedData);
  			}
	
		}
		
	});
 }
var servicedetailsipdDischarge = '{#foreach $T.cpoeServdetails as cpoeservice}<tr>'
	+ '<td class="col-md-2 center">{testcountipd}.</td>'
	+ '<td class="col-md-2-2 center">{$T.cpoeservice.categoryName}</td>'
	+ '<td class="col-md-2-1 center"> {$T.cpoeservice.insertDate}</td>'
	//+ '<td class="col-md-2-1 center">{$T.cpoeservice.docName}</td>'
	+ '<td class="col-md-2 center">{$T.cpoeservice.servicename}</td>'

	//+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: green;" disabled></input></td>'
//	+ '<td class="col-md-1-1 center">'
	//+ '<input id="chkunserv" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	//+ '</td>'
	//+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteCpoeServ({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'
	 + '</tr>{testcountipd++}{#/for}';

var testcountipd = 1;
var servicedetailsipd = '{#foreach $T.cpoeServdetails as cpoeservice}<tr>'
	+ '<td class="col-md-1-1 center">{testcountipd}.</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.categoryName}</td>'
	+ '<td class="col-md-1-1 center"> {$T.cpoeservice.created_date_time}</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.docName}</td>'
	+ '<td class="col-md-2 center">{$T.cpoeservice.servicename}</td>'
	+ '<td style="display:none;" id="empR{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.emrPer}</td>'
	+ '<td style="display:none;" id="rate{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.rate}</td>'
	+ '<td style="display:none;" id="subserviceid{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.categoryid}</td>'
	+ '<td style="display:none;" id="sId{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.serviceid}</td>'
	+ '<td style="display:none;" id="dId{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.doctor_id}</td>'


	+ '{#if $T.cpoeservice.deleted == "N" && $T.cpoeservice.cancel == "N"}'
	
	+ '{#if $T.cpoeservice.paid_flag == "Y"}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: orange;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv"  type="checkbox" class="btn disabled" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkOpdBill"  type="checkbox" class="btn disabled" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice disabled " onclick=deleteCpoeServ({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'
	
	+'{#/if}'
	
	+ '{#if $T.cpoeservice.paid_flag == "N"}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: green;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	
	+ '{#if $T.cpoeservice.servicename == "Pathology"}'
	+ '{#if $T.cpoeservice.sndtolabflag == "Y"}'
	+ '<td class="col-md-1-1 center">'
	//+ '<input id="chkOpdBill{$T.cpoeservice.billipd_id}" type="checkbox" class="btn disabled" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '<input type="button" id="chkOpdBill{$T.cpoeservice.billipd_id}" value ="Sent" style="width:60px; background-color: orange;" disabled ></input></td>'
	+'{#/if}'
	+ '{#if $T.cpoeservice.sndtolabflag == "N"}'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkOpdBill{$T.cpoeservice.billipd_id}" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+'{#/if}'
	+'{#/if}'
	+ '{#if $T.cpoeservice.servicename != "Pathology"}'
	+ '<td class="col-md-1-1 center">'
	+ '-</td>'
	+'{#/if}'
	
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteCpoeServ({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'
	
	+'{#/if}'
	
	+ '{#else}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: red;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv"  type="checkbox" class="btn disabled" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteCpoeServ({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'

	+'{#/if}'
	
	+ '</tr>{testcountipd++}{#/for}';
//added by sagar
var servicedetailsipdForDash = '{#foreach $T.cpoeServdetails as cpoeservice}'
	+ '{#if $T.cpoeservice.deleted == "N" && $T.cpoeservice.cancel == "N"}'
	+'<tr>' 
	+ '<td class="col-md-1-1 center">{testcountipd}.</td>'
	+ '<td class="col-md-1-1 center">{$T.cpoeservice.categoryName}</td>'
	+ '<td class="col-md-1-1 center"> {$T.cpoeservice.insertDate}</td>'
	+ '<td class="col-md-1-1 center">{$T.cpoeservice.docName}</td>'
	+ '<td class="col-md-1-1 center">{$T.cpoeservice.servicename}</td>'
	+ '{#if $T.cpoeservice.drdeskFlag == "D"}'
	+ '<td class="col-md-1-1 center">Doctor</td>'
	+ '{#else}'
	+ '<td class="col-md-1-1 center">Billing</td>'
	 +'{#/if}'
	//+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: green;" disabled></input></td>'
	//+ '<td class="col-md-1-1 center">'
	//+ '<input id="chkunserv" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	//+ '</td>'
	//+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteCpoeServ({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'
	 + '</tr>{testcountipd++}'
	 +'{#/if}{#/for}';

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:fetchbilldetails
 ***********/
function fetchipddetailsdrdeskForNursDashboard(call){
	 
	var tID  = $("#tr_Id").val(); 
	

	if(tID==0){
		
	//	return false;
		
	}
 	
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/fetchipddetailsdrdesknew",
		data	: {
			"tID"        : tID,
			"callform"   :callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			/*alert(response.cpoeServdetails.length);*/
			testcountipd = 1;
			if(call=="nursingdash"){
				 
				$("#testDashNursing").setTemplate(servicedetailsipdForDash);
				$("#testDashNursing").processTemplate(response);
 			}else{
 				 
			$("#testDashNursing").setTemplate(servicedetailsipd);
			$("#testDashNursing").processTemplate(response);
			
 			}
		}
		
	});
	
}

/************
 *@author	: Sagar  Kadam
 *@date		:  01/aug/2017
 *@code		:cpoe for Diagno
 ***********/
function setNewtempDigno(id){
	var depid= $("#depdocdeskid").val(); 
	if (id=="cpoe"){
		temForCpoe(id);
		if(depid==3){
		/*	fetchipddetailsdrdesk();
			$('#muldelcp').removeAttr('onclick');
			$('#muldelcp').attr('onclick','deleteCpoeServ(\'multiple\',\'IPD\')');
		}else{*/
			fetchbilldetailsDigno();
			
		}
		getAllUnitdigno();
		//unitMasterListOnLogin();
		//var uid=$("#uids").val();
		setDocNamedrdesk();
		//$("#uId").val(uid);
		
		//fetchDoctorHospital();
		//showADNOTE(id);
		
	}
}

/************
 *@author	: Sagar  Kadam
 *@date		:  01/sep/2017
 *@code		:To get units for Diagnostics
 ***********/
function getAllUnitdigno(){


	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/unit/fetchUnitList",

				success : function(r) {
					setTemplateForLoginUnitSelectList(r);
					
					var unitiddr=$("#uids").val();
					$("#uId").val(unitiddr);
				}
			});

}

/************
 *@author	: Sagar  Kadam
 *@date		:  01/sep/2017
 *@code		:fetchbilldetailsDiagno
 ***********/
function fetchbilldetailsDigno(){
	
	
	var tID  = $("#tr_Id").val(); 
	 
	/*var depid= $("#depdocdeskid").val(); */
    var servid=0;
	if(tID==0){
		
 	}
	
     var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "GET",
		url 	: "ehat/doctordesk/fetchbilldetails",
		data	: {
			"tID"        : tID,
			"callform"   :callform,
			"servid"      :servid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
  			tempDigno(response);
  			var jsonConvertedData = JSON.stringify(response);
			$("#billdetailsnew").html(jsonConvertedData);
  		}
		 
	});
	
}

/************
 *@author	: Sagar  Kadam
 *@date		:  02/sep/2017
 *@code		:fetchbilldetailsDiagno
 ***********/
function tempDigno(response)
{
	var htm="";
	var cnt =1;
	for ( var i = 0; i < response.cpoeServdetails.length;i++) {
		
		var datetime= response.cpoeServdetails[i].created_date_time;
		 
	htm=htm
	+ '<tr> <td class="col-md-1-1 center">'+cnt+'</td>'
	+ '<td class="col-md-2-1 center">'+response.cpoeServdetails[i].categoryName+'</td>'
	+ '<td class="col-md-1-1 center">'+datetime.split(",")[0]+'</td>'
	+ '<td class="col-md-2-1 center">'+response.cpoeServdetails[i].docName+'</td>'
	+ '<td class="col-md-2 center">'+response.cpoeServdetails[i].servicename+'</td>'

	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+cnt+'" style="width:60px; background-color: green;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">';
	
	if(response.cpoeServdetails[i].paid_flag=="Y"){
		htm=htm+ '<input id="chkunserv" class="btn disabled" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="'+response.cpoeServdetails[i].billdetailsid+'"/></td>'
		+ '</td>'
		+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice disabled" onclick=deleteCpoeServ('+response.cpoeServdetails[i].billdetailsid+',\'Diagno\') ><i class="fa fa-trash-o"></i></button></td>';
	}else{
		htm=htm+ '<input id="chkunserv" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="'+response.cpoeServdetails[i].billdetailsid+'"/></td>'
		+ '</td>'
		+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteCpoeServ('+response.cpoeServdetails[i].billdetailsid+',\'Diagno\') ><i class="fa fa-trash-o"></i></button></td>';

	}
	
	htm=htm+ '</tr>';
	cnt++;
	}
	$("#tcpoeservices").html(htm);
	 
	}



/***@author    :paras
 * @Date       :13-sep-2017
 * @code       : for getting charges of sponsor***/
function getchargesDR(hallid) {
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	
		
	var	departmentId =  $("#depdocdeskid").val();
	
	var categoryid = $("#subserviceid").val();
	var treatId=$("#tr_Id").val();
	var toDate ="";
	//alert("toDateopd???"+toDate);
	
	if (toDate == "" || toDate == null || toDate == undefined
			) {
		toDate = "0";
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (categoryid == "" || categoryid == null || categoryid == undefined
			|| isNaN(categoryid)) {
		categoryid = 0;
	}
	
    var hallId=0;
	var hallSlaveId = 0;
   if (departmentId == 2){
		
	   hallId =hallid;
	}

	var inputs = [];

	inputs.push('serviceid=' + categoryid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	inputs.push('toDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getchargessponsor",

		success : function(r) {
			$("#chargesfromConf").val(r);
			console.log(r);

		}
	});
	
}

/************
* @author	: Laxman Nikam
* @date		: 08-March-2018
* @codeFor	: if delete from bill,Disable lab delete flag.
 ************/
function deleteLabTestCpoe(labservicelist,deleteType,values,callform){
	var deptId=0;
	if(callform=="IPD"){
		deptId=2;
	}else{
		 deptId=$("#deptId").val();
	}
	var billDetailIds = labservicelist.slice(1); 
	//alert("--->"+billDetailIds);
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/cancelLabTest",
		data	: {
			
		  "billDetId" : billDetailIds,
		  "cancleType" : deleteType,
		  "deptId" : deptId,
			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			if(r=="0")
			{
				deleteTestSmplColFlg="Y";
				return false;
			}
			else if(r=="-1")
			{
				alert("Network error...!");
				return false;
			}else if(r=="1")
			{
				deleteTestSmplColFlg="N";
				//call for delete service.
				//deleteCpoeService(labservicelist,values,callform);
			}
		}
		
	});
}
/*******************************************************************************
 * @Vikas Godse
 * @date 5_March_2018 this method is used to Delete Investigation Test From 
 * CPOE(Diagno and OPD)
 ******************************************************************************/
function deleteInvTestCpoe(labservicelist,deleteType,values,callform){
	deleteType="N";
	var deptId=0;
	if(callform=="IPD"){
		deptId=2;
	}else{
		 deptId=$("#deptId").val();
	}
	
	var billDetailIds = labservicelist.slice(1); 
	//alert("--->"+billDetailIds);
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/cancelInvestigationTest",
		data	: {
			
		  "billDetId" : billDetailIds,
		  "cancleType" : deleteType,
		  "callform" : callform,
			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			if(r=="0")
			{ 
				risReportFlag="Y";
				return false;
			}
			else if(r=="-1")
			{
				alert("Network error...!");
				return false;
			}else if(r=="1")
			{
				risReportFlag="N";
			}
		}
		
	});
}




/***@author    :Vikas Godse
 * @Date       :10-March-2018
 * @code       : for Save Ris Template***/
function saveRisTemplate1(Type) {
	var templateId = $("#risTemplateId").val();
	var templateName = $("#risTemplateName").val();
	var selRisTempType = $('#selRisTempType').val();
	var templateData = "";
		templateData = CKEDITOR.instances['RiseditorSubjective'].getData();
		
	if(templateName == "" || templateName == undefined || templateName == null){
		alertify.alert("Please Select Template Name");
		return false;
	}
	else if(selRisTempType == "" || selRisTempType == "--Select--" || selRisTempType == null
			|| selRisTempType == undefined){
		alertify.alert("Please Select Template Name");
		return false;
	}else if(templateData == "" || templateData == undefined || templateData == null){
		alertify.alert("Please Enter Template Data");
		return false;
	}
	var inputs = [];	
	inputs.push('templateId=' + templateId);
	inputs.push('templateName=' + templateName);
	inputs.push('templateType=' + selRisTempType);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/ris/saveRisTemplate",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
		//	window.location.reload();
			location.reload(true);
		}
	});
}
/***@author    :Vikas Godse
 * @Date       :10-March-2018
 * @code       : For Getting Ris Template Data***/
function getRisTemplateDetails(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ris/getRisTemplateData",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTemplateList(r); //Fetching Template List For Creating Template- Vikas Godse
			
		}
	});
}
function setTemplateList(r){
	var list="<option value=''>--Select--</option><option value='' onclick='setNewRisTemp()'>NewTemplate</option>";
	for ( var i = 0; i < r.lstRisTemplate.length; i++) {
		list=list+'<option onclick="setRisTemplateForData('+r.lstRisTemplate[i].templateId+')" value="'+(r.lstRisTemplate[i].templateId)+'">'+(r.lstRisTemplate[i].templateName)+'</option>';
	}	
	$("#selRisTempList").html(list);
}
//Setting Data When New Template is selected - Vikas Godse
function setNewRisTemp() {
	$("#risTemplateId").val(0);
	$("#selRisTempType").val("");
	$("#risTemplateName").val("");
	
	CKEDITOR.instances['RiseditorSubjective'].setData("");
}
//Fetching Data When Template is selected - Vikas Godse
function setRisTemplate(templateId){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ris/getRisTemplateData",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			for(var i=0; i<r.lstRisTemplate.length; i++){
				
				if(r.lstRisTemplate[i].templateId == templateId){
					
					$("#selRisTempType").val(r.lstRisTemplate[i].templateType);
					$("#risTemplateName").val(r.lstRisTemplate[i].templateName);
					CKEDITOR.instances['RiseditorSubjective'].setData(r.lstRisTemplate[i].templateData);
					$("#risTemplateId").val(r.lstRisTemplate[i].templateId);
				}
				
			}
			
		}
	});
}

function setRisTemplateForData(templateId){
	var inputs = [];	
	inputs.push('templateId=' + templateId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ris/getRisTemplateDataforID",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			// setTimeout( function() {
		for(var i=0; i<r.lstRisTemplate.length; i++){
				
			//	if(r.lstRisTemplate[i].templateId == templateId){
					
					$("#selRisTempType").val(r.lstRisTemplate[i].templateType);
					$("#risTemplateName").val(r.lstRisTemplate[i].templateName);
					CKEDITOR.instances['RiseditorSubjective'].setData(r.lstRisTemplate[i].templateData);
					$("#risTemplateId").val(r.lstRisTemplate[i].templateId);
					
			//	}
				
			}
		//	 }, 600);
			
		}
	});
}
//not in use
function setRadiologyTemplate()
{
	var templateType=$("#selRisCrTempList").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/getRisTemplateDataById",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			/*ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#rislistobject").html(ajaxResponse);
			
			$("#risTempList").setTemplate(TemplateRISList);
			$("#risTempList").processTemplate(pobj1);*/
		}
	});
}
function getRisTestGroup(){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/ris/getRisTemplateType",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setRisTemplateType(r); //Fetching Template List For Creating Template- Vikas Godse
		}
	});
}
function setRisTemplateType(r){
	$("#selRisCrTempList1").html("<option value=''>--Select--</option>");
	var list="<option value=''>--Select--</option>";
	for ( var i = 0; i < r.testList.length; i++) {
		list=list+'<option onclick="setRisTemplateList('+r.testList[i].groupId+')" value="'+(r.testList[i].groupId)+'">'+(r.testList[i].groupName)+'</option>';
	}	
	$("#selRisCrTempList1").html(list);
}
function setRisTemplateList(groupId){
	document.getElementById("risTemplateList").innerHTML = "";
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ris/getRisTemplateData",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var list = "<option value=''>--Select--</option>";
			for(var i=0; i<r.lstRisTemplate.length; i++){
				if(r.lstRisTemplate[i].templateType == groupId){
					list = list + '<option onclick="setRisTemplateData('+r.lstRisTemplate[i].templateId+')" value="'+(r.lstRisTemplate[i].templateId)+'">'+(r.lstRisTemplate[i].templateName)+'</option>';
				}
			}
			$("#risTemplateList").html(list);
		}
	});
}
function setRisTemplateData(templateId){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ris/getRisTemplateData",
		error : function() {
			alert('error');
		},
		success : function(r) {
			for(var i=0; i<r.lstRisTemplate.length; i++){
				
				if(r.lstRisTemplate[i].templateId == templateId){
					CKEDITOR.instances['Riseditor1'].setData(r.lstRisTemplate[i].templateData);
				}
			}
		}
	});
}

/*******************************************************************************
 * @author Laxman Nikam
 * @date 15-March-2018
 * @Code Getting counsulting Dr name assign to patient
 ******************************************************************************/
function getConsultantDrName(treatmentId) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatmentId" : treatmentId
		},
		url : "ehat/registration/getConsultantDrName",
		success : function(r) {
			var doc_name="";
			if(r.lstDoctorDto!=null){
			for ( var i = 0; i < r.lstDoctorDto.length; i++) {
					//alert("----------->>>>"+r.lstDoctorDto[i].doc_name);
					doc_name=doc_name+","+r.lstDoctorDto[i].doc_name;
				}
			}
			if(doc_name!=""){         
			$("#consultingDoctorr").text(doc_name.slice(1));
			}else{
				$("#consultingDoctorr").text("-");
			}
		}
	});
}

var nuclearTemplate = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	+ "{#foreach $T.listRadiologyDTO as pl} {#if $T.pl.treatmentFlag == 'Y' && ($T.pl.groupName == 'PET-CT' || $T.pl.groupName == 'Nuclear Medicine'|| $T.pl.groupName == 'Gamma')}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "{#if $T.pl.radUrgentFlag == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
	//+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.centerPatientId}</td>{#/if}"
	+ "<td class='col-md-2-1' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 ' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "{#if $T.pl.arrivalTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>{#/if}"
	+ "{#if $T.pl.takenTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+"{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Nuclear')><i class='fa fa-check'></i></button>"
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Nuclear')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	+ "</td>"
	+ "</tr>{#/if}{#/for}</tbody></table></div>";


var nuclearTemplate11 = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	+ "{#foreach $T.listRadiologyDTO as pl} {#if $T.pl.treatmentFlag == 'N' && ($T.pl.groupName == 'PET-CT' || $T.pl.groupName == 'Nuclear Medicine'|| $T.pl.groupName == 'Gamma')}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "{#if $T.pl.radUrgentFlag == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
	//+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.centerPatientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-2-1' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 ' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "{#if $T.pl.arrivalTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>{#/if}"
	+ "{#if $T.pl.takenTime == 0}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
	+ "{#else}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+"{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Nuclear')><i class='fa fa-check'></i></button>"
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Nuclear')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	+ "</td>"
	+ "</tr>{#/if}{#/for}</tbody></table></div>";

/*******************************************************************************
 * @Vikas Godse
 * @date 26_March_2018 this method is used to Getting All nuclear tests Details
 ******************************************************************************/
function setTemplateNuclear(type,flag) {

	$("#pageType").html(flag);
	var tId="";
	var inputs = [];
	inputs.push('type=' + type);
	inputs.push('tid=' + tId);
	inputs.push('flag=' + flag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/getAllRadiologyDetail",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse=r;
			if(flag == "1"){
				count =1;
			$("#studTabND").setTemplate(nuclearTemplate);
			$("#studTabND").processTemplate(ajaxResponse);
			$("#studTabND1").hide();
			$("#studTabND").show();
			}else if(flag == "0"){
				count =1;
			$("#studTabND1").setTemplate(nuclearTemplate11);
			$("#studTabND1").processTemplate(ajaxResponse);
			$("#studTabND").hide();
			$("#studTabND1").show();
			}
			$("#searchlabel").html('<input class="form-control input-sm" id="byName" onkeyup="setAutoSuggNuclearTemplate(this.id)" '
						+' type="text" placeholder="Search" aria-controls="datatable1">');
		
		}
	});
}

/*******************************************************************************
 * @Vikas Godse
 * @date 26_March_2018 this method is used for nuclear autosuggetion
 ******************************************************************************/
function setAutoSuggNuclearTemplate(inputId) {

	var usertype = "";
	var letter="";
	letter=$("#byName").val();
	
	var findingName = $("#" + inputId).val();
	
		var inputs = [];
		
		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + letter);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ris/autoSuggestionNuclearTest",
			timeout : 1000 * 60 * 15,
			cache : false,
			success : function(r) {
				count =1;
				$("#studTabND").setTemplate(nuclearTemplate);
				$("#studTabND").processTemplate(r);
				
				$("#studTabND1").setTemplate(nuclearTemplate11);
				$("#studTabND1").processTemplate(r);
			}
		});
	}

function setTemplateRisIPD() {
	var patId = $("#patientId").text();
	var tId = $("#treatmentId").text();
	var inputs = [];
	inputs.push('treatmentId=' + tId);
	inputs.push('patientId=' + patId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/getAllRadiologyDetailForCoversheet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {

			setinvestiDashboard11(r);
		}
	});
}
function setinvestiDashboard11(response) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < response.listRadiologyTempReportDTO.length; i++) {
		htm = htm
				+ "<tr><<td class='col-md-1-1 TextFont'>"
				+ index
				+ "</td>"
				+ "<td class='col-md-4-1 TextFont'  >"
				+ response.listRadiologyTempReportDTO[i].testName
				+ "</td>"
				+ "<td class='col-md-2-1 TextFont' >"
				+  new Date(response.listRadiologyTempReportDTO[i].createdDate).toLocaleDateString('en-GB')
				+ "</td>"
				+ "<td class='col-md-2-1 TextFont' > "
				+ "<button id='xrayImg' class='b' title='View investigation image' onclick='displayXrayIPD("+response.listRadiologyTempReportDTO[i].radiologyTestId+","+response.listRadiologyTempReportDTO[i].testId+","+response.listRadiologyTempReportDTO[i].treatmentId+")' type='button' style='margin-top: -4px;'><i class='fa fa-eye View'></i></button>"
				+ "<button class='btn btn-xs btn-primary' data-target='#RisviewPopUp' data-toggle='modal' onclick='getTestRadilogyReports1("+response.listRadiologyTempReportDTO[i].radiologyTestId+","+response.listRadiologyTempReportDTO[i].testId+","+response.listRadiologyTempReportDTO[i].treatmentId+","+response.listRadiologyTempReportDTO[i].patientId+")'><i class='fa fa-credit-card'></i></button>"
				+ "</td>"
		        + "</tr>";
		index++;

	}
	$("#coverSheetInvestDashBoard11").html(htm);
}

function getTestRadilogyReports1(radiologyTestId,testId,treatmentId,patientId){ 
	
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('testId=' + testId);
	inputs.push('radiologyTestId=' + radiologyTestId);
	inputs.push('treatmentId=' + treatmentId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/getTestRadilogyReportsData",
		error : function() {
			alert('error');
		},
		success : function(r) {
			CKEDITOR.instances['viewckeditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
		}
	});
}

function displayXrayIPD(radiologyTestId,testId,treatmentId){
	fetchImage(radiologyTestId,testId,treatmentId);
	$("#groupModal").modal();
}

function fetchImage(radiologyTestId,testId,treatmentId) {
	
	count = 1;
	var inputs = [];
	inputs.push('idRadiologyTest=' + radiologyTestId);
	inputs.push('testId=' + testId);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		// url : "ehat/doctordesk/fetchXrayImage",
		url : "ehat/doctordesk/fetchXrayImageNew",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
	//		alert(JSON.stringify(r));
			
			// commented by aniket, 30 AUG 22
//			ajaxResponse = JSON.stringify(r);
//			var obj = eval('(' + ajaxResponse + ')');
//			$("#totalX-ray").setTemplate(opdXrayImageTemp);
//			$("#totalX-ray").processTemplate(obj);
			
			
			
			//----------------below code added by aniket kanse, 30 AUG 22
			
			var htmBody = "";
			if (r.lstRisImageUploadDTONew.length == 0 || r.lstRisImageUploadDTONew.length == null) {
				htmBody = htmBody + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>No Records Found</th></tr>";
				
			} else {
				
				for ( var i = 0; i < r.lstRisImageUploadDTONew.length; i++) {
					
					htmBody = htmBody + "<tr style='height:21px;'>"
					+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
			//		+ "<td class='col-md-3 center' >" + r.lstRisImageUploadDTONew[i].documentName + "</td>"
					+ "<td class='col-md-3 center' ><a href = ehat/ris/viewRISDocuments?idRadiologyTestReport="+r.lstRisImageUploadDTONew[i].idRadiologyTestReport+"&fileName="+r.lstRisImageUploadDTONew[i].risFile+" target='_blank' style='color:black;'>"+r.lstRisImageUploadDTONew[i].documentName+"</a></td>"
			//		+ "<td class='col-md-3 center' >" + r.lstRisImageUploadDTONew[i].comment + "</td>"
					+ "<td class='col-md-3 center' >" + r.lstRisImageUploadDTONew[i].stringDate + "</td>"
			//		+ "<td class='col-md-1 center' ><button class='btn btn-xs btn-warning' onclick=viewRisReflectedDocument('"+r.lstRisImageUploadDTONew[i].risFile+"','"+r.lstRisImageUploadDTONew[i].idRadiologyTestReport+"')><i class='fa fa-eye'></i></button></td>"
			//		+ "<td class='col-md-1 center' >" + r.lstRisImageUploadDTONew[i].createdByUser + "</td>" 
			//		+ "<td class='col-md-1 center' ><button class='btn btn-xs btn-danger' onclick=deleteRisUpDocument('"+r.lstRisImageUploadDTONew[i].idRadiologyTestReport+"')> <i class='fa fa-times' aria-hidden='true'></i></button></td>"
					+'</tr>';
				}
			}
			$("#totalX-ray").html(htmBody);
		}
	});
	/*count = 1;
	var inputs = [];
	inputs.push('tid=' +treatmentId);
	inputs.push('testID=' + testId);
	inputs.push('idRadiologyTest=' + radiologyTestId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/fetchImageTest",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			$("#totalX-ray").setTemplate(opdXrayImageTemp);
			$("#totalX-ray").processTemplate(r);
		}
	});*/
}

var opdXrayImageTemp = "<div class='col-sm-12-1 scroller' style='margin-top:-21px; height: 0px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='margin-left: 00px; width: 103.2%;'>"
	+ "<tbody>"
	+ "{#foreach $T.lstRisImageUploadDTO as img}"
	+ "<tr>"
	+ "<td class='col-md-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "<td class='col-md-3 center' style='height: 21.5px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='RisImageReadServlet?name={$T.img.imageName}' target='_blank' style='color:black; '>{$T.img.imageName}</a></td>"
	+ "<td class='col-md-3 center' style='height: 21.5px;'>{new Date($T.img.createdDate).toLocaleDateString()}</td>"
	+ "</tr>{#/for}</tbody></table></div>";

function printDrround(){
	var pid = parseInt($('#patientId').html());
	var tid = parseInt($('#tr_Id').val());
	var date = $("#regDate2").html();
	var corporate =  $("#corporate").text();
	var hallName =  $("#hallName").text();
	var from_date = $("#fromDate").val();//jitendra 10 april 2019
	var to_date = $("#toDate").val();
	
	
	var drRoundIdList = [];
	$(':checkbox').each(function() {
		if( this.checked == true){
			drRoundIdList.push($(this).val());               
			}
    });
	
	setTimeout(function() {
		window.open(("IPDPrintDrround.jsp?patID=" + pid + "&treatID=" + tid +  "&date=" + date
				+"&fromDate=" + encodeURIComponent(from_date) + "&toDate=" + encodeURIComponent(to_date)//jitendra  10 april 2019
				+"&drRoundIdList="+encodeURIComponent(drRoundIdList) +"&corporate="+encodeURIComponent(corporate) +"&hallName="+encodeURIComponent(hallName)));
	}, 300);
	refreshPatselDrRound();
}


function calculateEmerChrForDocDesskOpd()
{

	var emrgancyper=parseFloat($('#emrPer').val());
	if(isNaN(emrgancyper))
		{
			$("#emrPer").val(0);
			emrgancyper=parseFloat($('#emrPer').val());
		}
	if (emrgancyper > 100) {
		alert("Percentage should be less than 100");
		$("#emrPer").val(0);
		emrgancyper=parseFloat($('#emrPer').val());
		//return false;
	}
		var rate=0;
		//rate =parseFloat($("#cpoeCharges2").val());
		rate =parseFloat($("#chargesubservice").val());
		var emp=parseFloat(rate*emrgancyper/100);
		//amount = parseFloat(emp + amount);
		rate = parseFloat(emp + rate);
	
		if(isNaN(rate)){
		//	rate =parseFloat($("#cpoeCharges2").val());
			rate =parseFloat($("#chargesubservice").val());

		}
		$("#chargesubservice").val(rate);

}


function setBoxOpdDocDesk() {
	
	if ($("#emrChrFlag").is(":checked")) {

		$('#emrPer').css("display","inline");
		getEmergancyCharges();
		calculateEmerChrForDocDesskOpd();
	} else {
		$('#emrPer').css("display","none");
		$('#emrPer').val(0);
		calculateEmerChrForDocDesskOpd();
	}
}

function setHiddenFieldOpdDokDesk(value)
{
	$("#cpoeCharges2").val(value);
}

/********************************
 * @author Laxman Nikam
 * @date 23-July-2018
 * @Code showPopUpRIS
 ********************************/
function showPopUpRIS(){
	setTemplateRisIPD();
	$("#risImgReportModal").modal();
}


/********************************
 * @author Laxman Nikam
 * @date 01-Nov-2018
 * @Code printWithoutHdrDrround
 ********************************/
function printWithoutHdrDrround(){
	var pid = parseInt($('#patientId').html());
	var tid = parseInt($('#tr_Id').val());
	var date = $("#regDate2").html();
	
	var drRoundIdList = [];
	$(':checkbox').each(function() {
		if( this.checked == true){
			drRoundIdList.push($(this).val());               
			}
    });
	
	setTimeout(function() {
		window.open(("IPDPrintDrroundWithoutHdr.jsp?patID=" + pid + "&treatID=" + tid +  "&date=" + date +"&drRoundIdList="+encodeURIComponent(drRoundIdList)));
	}, 300);
	refreshPatselDrRound();
}

function refreshPatselDrRound(){
	
	$(':checkbox').each(function() {
        this.checked = false;                        
    });
}

/************
 *@author	: Akshata Desai
 *@date		:  27-March-2020
 *@code		:fetchLabOrders
 ***********/
function fetchLabOrders(){
	
	var tID  = $("#patientId").val(); 
	//alert(tID);
	
	/*var depid= $("#depdocdeskid").val(); */
    var servid=0;
	if(tID==0){
		
	//	return false;
		
	}
	
	
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "GET",
		url 	: "ehat/doctordesk/fetchLabOrders",
		data	: {
			"tID"        : tID,
			"callform"   :callform,
			"servid"      :servid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			 /*testRowCountcpoe = 1;
			$("#tcpoeservices").setTemplate(servicedetails);
			$("#tcpoeservices").processTemplate(response);
			  var jsonConvertedData = JSON.stringify(response);
			$("#billdetailsnew").html(jsonConvertedData);*/
			setAllLabOrders(response,"All");
			//alert(response.cpoeServdetails.length);
			$("#countlab").text(response.cpoeServdetails.length);
			
		}
		
	});
	
}

function setAllLabOrders(response,CallFrom){
	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < response.CpoeServdetails.length; i++) {
			htm = htm + '<tr> '
			+ ' <td>'+index+'</td>'
			+ ' <td>'+response.CpoeServdetails[i].categoryName+'</td>'
			+ ' <td>'+response.CpoeServdetails[i].created_date_time+'</td>'
			+ '<td><img src="ehat-design/img/icon1.png" style="margin-left: 14px;"></td>'
			+ '</tr>';
			index++;
			
		}
		
	}/*else{
		if( response.cpoeServdetails.length==0){
			htm = htm
			+ "<tr><td colspan='6' class='center text-danger'>Sorry No Records To Display</td></tr>";
		}
	}*/
	$("#tblForLabOrders").html(htm);
	
}


/************
 *@author	: Akshata Desai
 *@date		:  27-March-2020
 *@code		:fetch Radiology order
 ***********/
function fetchRadiologyOrder(){

	var tID  = $("#patientId").val(); 
	//alert(tID);
	//var	patientId   =  $("#patientId").val();
	//alert(patientId);
	/*var depid= $("#depdocdeskid").val(); */
    var servid=0;
	if(tID==0){
		
	//	return false;
		
	}
	
	
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "GET",
		url 	: "ehat/doctordesk/fetchRadiologyOrder",
		data	: {
			"tID"        : tID,
			"callform"   :callform,
			"servid"      :servid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			 /*testRowCountcpoe = 1;
			$("#tcpoeservices").setTemplate(servicedetails);
			$("#tcpoeservices").processTemplate(response);
			  var jsonConvertedData = JSON.stringify(response);
			$("#billdetailsnew").html(jsonConvertedData);*/
			setAllRadiologyOrders(response,"All");
			//alert(response.cpoeServdetails.length);
			$("#countRad").text(response.cpoeServdetails.length);
			
		}
		
	});
	
}

function setAllRadiologyOrders(response,CallFrom){
	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < response.cpoeServdetails.length; i++) {
			htm = htm + '<tr> '
			+ ' <td>'+index+'</td>'
			+ ' <td>'+response.cpoeServdetails[i].categoryName+'</td>'
			+ ' <td >'+response.cpoeServdetails[i].created_date_time+'</td>'
			+ '<td><img src="ehat-design/img/icon1.png" style="margin-left: 14px;"></td>'
			+ '</tr>';
			index++;
			
		}
		
	}
	$("#tblForRadiologyOrders").html(htm);
	
}

function refreshService(){
	 $('#txtautoserviceName').val("");
	 $("#subservicesname").val("");
	 $("#doctor2").val("0");
	 $("#chargesubservice").val("");
	 $("#servicename").val("");
	 $("#cpoeClinicalNotes").val("");
	 $("#cpoeIns").val("");
	 $('#txtautoserviceName').attr('readonly',false);
	 $('#dynamicItem').html("");
	 $('#cpoeUrgent').attr('checked', false);
	 $("#cpoesndtolabdiv").hide();
	 $('#cpoesndtolab').attr('checked', false);
	 $("#chargesubservice").val(0);
	 $("#cpoeCharges2").val(0);
	 $("#billidservice").val(0);
}


function sendToLabFromDoctorStation(deptId){
	var departmentId=$("#depdocdeskid").val();
	//var departmentId = deptId;
	var r = confirm("Are you sure to Send these tests into Lab?");
	if(r==false){
		return false;
	}
	var flagTest=0;
	var patientId = parseInt($("#patientId").text());
	if ( isNaN(patientId)) {
		patientId=0;
	}
	var treatmentId = parseInt($("#treatmentId").text());
	if ( isNaN(treatmentId)) {
		treatmentId=0;
	}
	//var subSrvNBilDetIds=[]; 
	var subList 	= {	subSrvList : [] };
    $('input[name=opdBillCheckbox]:checked').each(function(){
		var bilDetId	=  parseInt($(this).val());
		if ( isNaN(bilDetId)) {
			bilDetId=0;
		}
		//getting service id 
		var serviceId 		= parseInt($("#sId"+bilDetId).text());
		if ( isNaN(serviceId)) {
			serviceId=0;
		}
		//getting sub service id
		var subSrvid	= parseInt($("#subserviceid"+bilDetId).text());
		if ( isNaN(subSrvid)) {
			subSrvid=0;
		}
		//Added by Laxman on 31-Jan-2018.
		//getting Doctor id
		var refDocId	= parseInt($("#dId"+bilDetId).text());
		if ( isNaN(refDocId)) {
			refDocId=0;
		}
		//alert("------>>>>>"+bilDetId);
		//pusing sub service id into variable
		//subSrvNBilDetIds.push(bilDetId+"^"+subSrvid);
		subList.subSrvList.push({
			bilDetId		: bilDetId,
			serviceId		: serviceId,
			subSrvid 		: subSrvid,
			refDocId		: refDocId,
		});	
		
		flagTest=1;
	});
    
   
    subList = JSON.stringify(subList);
	if(flagTest==0){
		alertify.error("Please Select At Least One Test For Sent To Lab...!");
		return false;
	}
    var inputs = [];
    inputs.push("patientId="+patientId);
    inputs.push("treatmentId=" + treatmentId);
	inputs.push("subList=" + subList);	
	inputs.push("deptId="+departmentId);
	
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/lab/sendToLab",
		error 	: function() {
					alert('Not coneected to server: Please check connections!');
				 },
		success : function(r) {
			if(r=="-1"){
				alertify.error("Test has been already sent to lab..!");
			}else if(r=="-2"){
				alertify.error("Duplicate test can not be send to lab..!");
			}else if(r=="-3"){
				alertify.error("Only Pathology test are allowed send to lab..!");
			}else if(parseInt(r)>0){
					alertify.success("Tests Sent.");
			}else{
				alertify.error("NetWork error...");
			}
					
		}
	});	
}


/*function saveCpoeNew(callfrom){
	
	var HallSlaveId = 0;
	var liSizelab = $("#dynamicItems li").length;
	HallSlaveId = $("#lis" + (liSizelab - 1)).val();
	
	 alert(HallSlaveId);
	
	var serviceLastId  = $("#li" + (liSizeForServices - 1)).val();
	
	
	
	//charges Hall validation liSizeForServices
    if(liSizelab > 0){
    	if(liSizelab <= 1){
    		alert("Please Select Atleast One Pathology Test! ");
    		SetFocus('dynamicItems');
    		return false;
    	}
    	
    }
    
   
    
    if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined) {
		HallSlaveId = 0;
	}

    
	return false;
	 
	var	departmentId =  $("#depdocdeskid").val();
	
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	//var receiptOf  ="xyz";
	var receiptOf  ="general";
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
    var recSlaveId  =0;	//$('#receiptSlaveId').val();	//receipt slave id
	
	if (recSlaveId == "" || recSlaveId == null || recSlaveId == undefined || isNaN(recSlaveId)) {
		recSlaveId = 0;
	} 
	
	var emrPer=$("#emrPer").val();
	
	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer=0;
	}
	
	if(departmentId==2){
		//Call for IPDCpoe.
		saveIPDCpoe();
		
	}else{
	//adding by ajay:2-06-2020 update time check this varible if test is already send it lab and  Ris that time using this varible
	var flagUpdateorNotsendtoLab  =  $("#flagUpdateorNotsendtoLab").val();  	
	if(flagUpdateorNotsendtoLab==1)
	{
		alert("Can Not Updated this Test Because test already send It!! ");
		return false;
	}
	
	var flagUpdateorNotsendtoRis  =  $("#flagUpdateorNotsendtoRis").val();  	
	if(flagUpdateorNotsendtoRis==1)
	{
		alert("Can Not Updated this Test Because this test already send It!! ");
		return false;
	}
	
	var queryType 	 = "insert";
	var module 	 = "DrDesk";
	//var	patienttId   =  $("#patientId").text();
	//var	patientId   =  $("#patientId").val();
	//alert(patientId);
	var treatmentId  =  $("#treatmentId").val();  
	var patientId = $.trim(($("#patientId").val()));
	var callfrom1 = $("#callfromforprvTrtmnt").val();
	if (callfrom1 == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom1 == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	

	
	var	departmentId =  $("#depdocdeskid").val();
	var billId       =  $("#bill_Id").val();  
	var	sourceTypeId =  1;
	var rate = 0;
	var otherRate=0;
	var otherAmount=0;
	if (sponsorId > 0 && chargesSlaveId > 0) {
		receiptOf="sponsor";
		getchargesDR(0);
		otherRate = parseFloat($("#chargesfromConf").val());
		if(otherRate== 0 || otherRate== 0.0){
			getchargesDR(2);
			otherRate =	parseFloat($("#chargesubservice").val());
			}
		if(otherRate== 0 || otherRate== 0.0){
			
			otherRate =	parseFloat($("#chargesubservice").val());
			
		}
		var emrgancyper=parseFloat($('#emrPer').val());
		var emp=parseFloat(otherRate*emrgancyper/100);
		otherRate = parseFloat(emp + otherRate);
		otherAmount=otherRate *1;
		
	}
	   //rate =	$("#chargesubservice").val();	
		 rate =  $("#cpoeCharges2").val();
	
	var quantity     =  1;
	var amount       =  rate * 1;  
	
	var billCat		 = $("#billCat").val();
	var coPay        = 0;
	if(billCat==0)
	{
		coPay=amount;
		
	}
	
	//for sponcer patient pkg.
	if(callfrom =="sponsorpack"){
		callfrom="";
		sponsorId =0;
		chargesSlaveId = 0;
	}else{
		callfrom="DrDesk";
	} 
	//Added by Laxman.
	var iscombination =$("#iscombination" ).val();

	var serviceId    =  $("#serviceid" ).val();
	var subServiceId =  $("#subserviceid").val();

	var billDetailsId     = $("#billidservice").val();

    var subservicesname   = $("#txtautoserviceName").val();
    var servicename       = $("#servicename").val();
    var unitId            = $("#uId").val();
    var doctorId          = $("#doctor2").val();                         
    var clinicalNotes     = $("#cpoeClinicalNotes").val();
    var instructions      = $("#cpoeIns").val();
    var urgentflag='N';
    var sndToLabFlag='N';
    var	sendToRisFlag = 'N';
    var radiationFlag='N';
   // var paid_flag='N';
   //alert(subservicesname);
    if(serviceId=='12'){
    	paid_flag='Y';
    }
    var drdeskflag="-";
    if(departmentId==3){
    	drdeskflag='D';
    }else{
     drdeskflag='Y';
    }
    
    if($("#cpoeUrgent").is(':checked')){
    	urgentflag='Y';
    }
    if($("#cpoesndtolab").is(':checked')){
    	sndToLabFlag='Y';
    	sendToRisFlag='N';
    }
    if($("#cpoeSendToRad").is(':checked')){

        radiationFlag='Y';
    }
	if (subservicesname == "" ||  subservicesname ==null) {
		alert("Please enter servicename ");
		return false;
	}
	if(unitId ==0){
		unitid = $("#allunitid").val();
	}
	var doctorsel = $("#doctor2 :selected").val();
	
	if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
		//alert("Please Select doctor ");
		//return false;
		
	}
	if (clinicalNotes == "" ||  clinicalNotes ==null) {
		clinicalNotes="-";
	}
	if (instructions == "" ||  instructions ==null) {
		instructions="-";
	} 
	
	//Added by sanjay on savecpoe send to ris opd/digno.
	if($("#cpoeSendToRis").prop("checked")==true){
		sendToRisFlag = 'Y';
		sndToLabFlag='N';
	}
	

	
	var serviceDetails = {
            listBillDetails : []
        };

	
	serviceDetails.listBillDetails.push({
    	billDetailsId:billDetailsId,
    	patienttId : $("#patientId").text(),
    	treatmentId :  $("#tr_Id").val(),
        departmentId : departmentId,
        billId : billId,
        sourceTypeId : sponsorId,
        rate : rate,
        quantity : quantity,
        amount : amount,
        serviceId : serviceId,
        subServiceId : subServiceId,
        doctorId:doctorId,
        urgentflag:urgentflag,
        clinicalnotes:clinicalNotes,
        instructions:instructions,
        unitId : unitId,
        coPay  :coPay,
        drdeskflag:drdeskflag,
        callfrom : callfrom,
        sponsorId  : sponsorId,
        chargesSlaveId : chargesSlaveId,
        iscombination : iscombination,
        otherRate : otherRate,
        otherAmount : otherAmount,
        otherPay :otherAmount,
        receiptOf : receiptOf,
        recSlaveId : recSlaveId,
        sndToLabFlag : sndToLabFlag,
		sendToRisFlag : sendToRisFlag,
		rFlag : radiationFlag,
		emrPer : emrPer
		//paidFlag:paid_flag
    });
    
	//Added by Laxman on 04-March-2018 for service send to lab.
	var subList 	= {	subSrvList : [] };
	subList.subSrvList.push({
		serviceId		: serviceId,
		subSrvid 		: subServiceId,
		refDocId		: doctorId,
	});	
    serviceDetails = JSON.stringify(serviceDetails);
    subList = JSON.stringify(subList);
    
	var inputs = [];
	inputs.push('module=' + module);
	inputs.push('queryType=' + queryType);
	inputs.push('serviceDetails=' + serviceDetails);
	inputs.push('callfrom=' + callfrom);
	inputs.push('subList=' + subList);
	inputs.push('HallSlaveId=' + encodeURIComponent(HallSlaveId));
	inputs.push('billDetailsId=' + billDetailsId);
	inputs.push('patienttId=' + patienttId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('sourceTypeId=' + sourceTypeId);
	inputs.push('billId=' + billId);
	inputs.push('amount=' + amount);
	inputs.push('quantity=' + quantity);
	inputs.push('departmentId=' + departmentId);
	inputs.push('rate=' + rate);
	inputs.push('subServiceId=' + subServiceId);
	inputs.push('serviceId=' + serviceId);
	inputs.push('unitId=' + unitId);
	inputs.push('doctorId=' + doctorId);
	
	
	inputs.push('ClinicalNotes=' + ClinicalNotes);
	inputs.push('instructions=' + instructions);
	inputs.push('urgentflag=' + urgentflag);
	
		var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/saveOpdIpdCpoe",
	
		success : function(r) {
			
			 
		if(r ==1){
			alertify.success("Service assign Successfully");
			if(departmentId==3){
				fetchbilldetailsDigno();
				 
 			}else{
			
			fetchbilldetails();
 			}
			$('#txtautoserviceName').val("");
			$("#subservicesname").val("");
			$("#doctor2").val("0");
			$("#chargesubservice").val("");
			
			$("#servicename").val("");
			    $("#cpoeClinicalNotes").val("");
			   $("#cpoeIns").val("");
			   $('#txtautoserviceName').attr('readonly',false);
			   $('#dynamicItem').html("");
			   $('#cpoeUrgent').attr('checked', false);
			   $("#cpoesndtolabdiv").hide();
			   $('#cpoesndtolab').attr('checked', false);
			}else if (r ==3) {
				
				alert("Package is not Configure Please Configure Package!");
				return false;
			}else if(r ==4){
				var res = confirm("Package is not configure for sponsor. Do you want Default Package?");
				if (res == true) {
					//For opd sponsor patient.
					saveCpoe('sponsorpack');
				}else{
					
					return false;
				}
				
			}else if(r ==6){
				 alert("Package is out of Date Can't save!!!!");
				
			}else if(r ==2){
				 alertify.success("Update successfully...!!!");
				 $('#txtautoserviceName').val("");
				 $("#subservicesname").val("");
				 $("#doctor2").val("0");
				 $("#chargesubservice").val("");
				 $("#servicename").val("");
				 $("#cpoeClinicalNotes").val("");
				 $("#cpoeIns").val("");
				 $('#txtautoserviceName').attr('readonly',false);
				 $('#dynamicItem').html("");
				 $('#cpoeUrgent').attr('checked', false);
				 $("#cpoesndtolabdiv").hide();
				 $('#cpoesndtolab').attr('checked', false);
				 $("#chargesubservice").val(0);
				 $("#cpoeCharges2").val(0);
				 $("#billidservice").val(0);
				
			}
		}	
		
	});
	}
}




function saveIPDCpoe1(callfrom){ 
	var queryType 	 = "insert";
	var module 	 = "OT";
	//var	patienttId   =  $("#patientId").text();
	var	patienttId   =  $("#pt_Id").val();
	var treatmentId  =  $("#tr_Id").val();  
	var	departmentId =  2;
	var billId       =  $("#bill_Id").val();  
	var	sourceTypeId =  1;
	var receiptOf  ="general";
	var rate = 0;
	var otherRate=0;
	var otherAmount=0;
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var sndToLabFlag='N';
	var sendToRisFlag ='N';
	var hallId  =$("#hallId").val();
	
	var emrPer=$("#emrPer").val();
	
	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer=0;
	}
	
	if (sponsorId > 0 && chargesSlaveId > 0) {
		getchargesDR(2);
		otherRate = parseFloat($("#chargesfromConf").val());
		if(otherRate== 0 || otherRate== 0.0){
			getchargesDR(0);
			otherRate =	parseFloat($("#chargesfromConf").val());
			}
		if(otherRate== 0 || otherRate== 0.0){
			
			otherRate =	parseFloat($("#chargesubservice").val());
			
		}
		//added by Tarique Aaalam		
		var emrgancyper=parseFloat($('#emrPer').val());
		var emp=parseFloat(otherRate*emrgancyper/100);
		otherRate = parseFloat(emp + otherRate);		
		otherAmount=otherRate *1;
		
	}
		
		if (sponsorId > 0 && chargesSlaveId > 0){
			receiptOf  ="sponsor";
			 rate =	$("#chargesubservice").val();	
	    }else{
	    	// rate = otherAmount;
	    	 rate =	$("#chargesubservice").val();	
	    }
	rate =	$("#cpoeCharges2").val();	
	var quantity     =  1;
	var amount       =  rate * 1;  
	
    var recSlaveIdIPD  =0;	//$('#receiptSlaveId').val();	//receipt slave id
	
	if (recSlaveIdIPD == "" || recSlaveIdIPD == null || recSlaveIdIPD == undefined || isNaN(recSlaveIdIPD)) {
		recSlaveIdIPD = 0;
	} 
	
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	
	var iscombination =$("#iscombination" ).val();
	var serviceId    =  $("#serviceid" ).val();
	var subServiceId =  $("#subserviceid").val();

	var billDetailsId     = $("#billidservice").val();
    var subservicesname   = $("#txtautoserviceName").val();
    var servicename       = $("#servicename").val();
    var unitId            = $("#uId").val();
    var doctorId          = $("#doctor2").val();                         
    var clinicalNotes     = $("#cpoeClinicalNotes").val();
    var instructions      = $("#cpoeIns").val();
    var urgentflag='N';
  //  var ot_flag='N';
    var ot_flag='Y';
    var drdeskflag='D';
    var radiationFlag='N';
    var coPay        = amount;
    
    if(callfrom == "IpdSponsor3"){
    	hallId =2;
    	sponsorId =0;
    	chargesSlaveId =0;
    }else if(callfrom == "IpdSponsor4"){
    	hallId =0;
    	sponsorId =0;
    	chargesSlaveId =0;
    }else{
    callfrom="DrDeskIPD";
    }
    
    if($("#cpoeUrgent").is(':checked')){
    	urgentflag='Y';
    }

    //Added by Laxman on 04-March-2018 for send to lab flag.
    if(serviceId=="11" || serviceId=="13"){
    	 if($("#cpoesndtolab").is(':checked')){
    	    	sndToLabFlag='Y';
    	    	sendToRisFlag = 'N';
    	    }
    }else if(serviceId=="12"){
    	//Added by sanjay on savecpoe send to ris ipd.
    	if($("#cpoeSendToRis").prop("checked")==true){
    		sendToRisFlag = 'Y';
    		sndToLabFlag='N';
    		
    	}
    }else if(serviceId=="18"){
    	 if($("#cpoeSendToRad").is(':checked')){
           radiationFlag='Y';
       }
    }
  
	
	if (subservicesname == "" ||  subservicesname ==null) {
		alert("Please enter servicename ");
		return false;
	}
	if(unitId ==0){
		unitid = $("#allunitid").val();
	}
	var doctorsel = $("#doctor2 :selected").val();
	
	if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
	//	alert("Please Select doctor ");
	//	return false;
		
	}
	if (clinicalNotes == "" ||  clinicalNotes ==null) {
		clinicalNotes="-";
	}
	if (instructions == "" ||  instructions ==null) {
		instructions="-";
	}
	
	
	
	var serviceDetails = {
			listBillDetailsIpd : []
        };
	serviceDetails.listBillDetailsIpd.push({
		billDetailsId:billDetailsId,
		patienttId : patienttId,
        treatmentId : treatmentId,
        departmentId : departmentId,
        billId : billId,
        sourceTypeId : sponsorId,
        chargesSlaveId:chargesSlaveId,
        rate : rate,
        quantity : quantity,
        amount : amount,
        serviceId : serviceId,
        subServiceId : subServiceId,
      
        doctorId:doctorId,
        urgentFlag:urgentflag,
        clinicalnotes:clinicalNotes,
        instructions:instructions,
        unitId : unitId,
        ot_flag:ot_flag,
        coPay  :coPay,
        drdeskflag:drdeskflag,
        callfrom : callfrom,
        otherRate : otherRate,
        otherAmount : otherAmount,
        otherPay :otherAmount,
        onBedFlag:"N",
        receiptOf : receiptOf,
        recSlaveIdIPD : recSlaveIdIPD,
        sndToLabFlag : sndToLabFlag,
		sendToRisFlag : sendToRisFlag,
		iscombination : iscombination,
		hallId     : hallId,
		sponsorId  : sponsorId,
		rFlag : radiationFlag,
		emrPer : emrPer
    });
    
	var subList 	= {	subSrvList : [] };
	subList.subSrvList.push({
		serviceId		: serviceId,
		subSrvid 		: subServiceId,
		refDocId		: doctorId,
	});	
    subList = JSON.stringify(subList);
    serviceDetails = JSON.stringify(serviceDetails);
	
	var inputs = [];
	inputs.push('module=' + module);
	inputs.push('queryType=' + queryType);
	inputs.push('serviceDetails=' + serviceDetails);
	inputs.push('callfrom=' + callfrom);
	inputs.push('subList=' + subList);
	inputs.push('billDetailsId=' + billDetailsId);
	inputs.push('patienttId=' + patienttId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('sourceTypeId=' + sourceTypeId);
	inputs.push('billId=' + billId);
	inputs.push('amount=' + amount);
	inputs.push('quantity=' + quantity);
	inputs.push('departmentId=' + departmentId);
	inputs.push('rate=' + rate);
	inputs.push('subServiceId=' + subServiceId);
	inputs.push('serviceId=' + serviceId);
	inputs.push('unitId=' + unitId);
	inputs.push('doctorId=' + doctorId);
	
	
	inputs.push('ClinicalNotes=' + ClinicalNotes);
	inputs.push('instructions=' + instructions);
	inputs.push('urgentflag=' + urgentflag);
	
		var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/saveOpdIpdCpoe",
	
		success : function(r) {
			
			 
		if(r==1){
			alertify.success("Service assign Sucessfully");
			fetchipddetailsdrdesk();
			$('#txtautoserviceName').val("");
			$("#subservicesname").val("");
			$('#dynamicItem').html("");
			$("#servicename").val("");
			$("#cpoeClinicalNotes").val("");
			$("#cpoeIns").val("");
			$('#cpoeUrgent').attr('checked', false);
			$("#cpoesndtolabdiv").hide();
			$("#doctor2").val(0);
			$("#chargesubservice").val(0);
			$("#cpoeCharges2").val(0);
			$("#billidservice").val(0);
			
			//$('#cpoesndtolab').attr('checked', false);
			}else if (r ==3) {
				var res = confirm("Package is not configure for Hall and sponsor. Do you want Default Hall Package?");
				if (res == true) {
					
					saveIPDCpoe('IpdSponsor3');
				}else{
					return false;
				}
			}else if (r == 4) {
				var res = confirm("Package is not configure for Hall and sponsor. Do you want Default Package?");
				if (res == true) {
					
					saveIPDCpoe('IpdSponsor4');
				}else{
					return false;
				}
			}else if (r == 2) {
				alertify.error("Duplicate Test Can not be Saved");
			}else{
				alert("Network Issue!!!!");
			}
		}	
		
	});
	
}*/



function checkAllIpdLabService(){
	
	$("input[name='opdBillCheckbox']:checkbox").each(function() {
		 
		var cb = $(this);
		if(cb.is(':disabled')) {
		   	 			 
		}else{
			  
			cb.prop('checked',true);			 
		}		
	});		
}

/*******************************************************************************
 * @author Dayanand Khandekar
 * @comment get Radiologist Doctor List For RIS
 ******************************************************************************/
function getRadiologistDoctorListForRIS() {
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		
		url : "ehat/ris/getAllRadiologistsList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			
		  
			 var htm="<option value='0'>--Select--</option>";
			    for ( var i = 0; i < r.listDoctor.length; i++){    
			        htm = htm + "<option value='"+r.listDoctor[i].doctor_ID+"'> "+r.listDoctor[i].doc_name+" </option>";
			    }
			    $("#radioDoctorList").html(htm);
					          
        }
    });	
}

function setRisTestDataByRadiologist(){
	var doctorId=$("#radioDoctorList").val();
	var callFromRadio=$("#callFromRadio").val();
	
	   if(callFromRadio == "current"){
		   setTemplateRis3("onload","1",doctorId) 
	   }else if(callFromRadio == "previous"){
		   setTemplateRis3("onload","0",doctorId) 
	   }
	
	
}