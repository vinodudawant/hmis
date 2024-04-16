
/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 12-feb-2020
 * @codeFor : Tab colour change of Lab
 ******************************************************************************/
function tabColorChangeForLab(callFrom) {

	$("#byName").val('');
	$("#txtFdate").val('');
	$("#txtTdate").val('');
	$("#byBarcode").val('');

	if (callFrom == "ct") {
		$("#chkTotal").prop("checked", true);
		//getLabTestPatientDashboard('onload', 'labTestResults');
		$("#ct").css("background-color", "#00ff80green");
		$("#autho").css("background-color", "");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "");
		$("#privst").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "autho") {
		getLabTestPatientDashboard('autho', 'labTestResults');
		$("#authochkTotal").prop("checked", true);
		$("#ct").css("background-color", "");
		$("#autho").css("background-color", "#00ff80");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "");
		$("#privst").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "unathot") {
		getLabTestPatientDashboard('unathot', 'labTestResults');
		$("#ct").css("background-color", "");
		$("#autho").css("background-color", "");
		$("#unathot").css("background-color", "#00ff80");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "");
		$("#privst").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "recallt") {
		getLabTestPatientDashboard('recallt', 'labTestResults');
		$("#ct").css("background-color", "");
		$("#autho").css("background-color", "");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "#00ff80");
		$("#holdt").css("background-color", "");
		$("#privst").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "holdt") {
		getLabTestPatientDashboard('holdt', 'labTestResults');
		$("#ct").css("background-color", "");
		$("#autho").css("background-color", "");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "#00ff80");
		$("#privst").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "privst") {
		getLabTestPatientDashboard('privst', 'labTestResults');
		$("#privchkTotal").prop("checked", true);
		$("#ct").css("background-color", "");
		$("#privst").css("background-color", "#00ff80");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "");
		$("#autho").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "outlab") {
		// loadPopUp1();
		getAllLaboutSourcelist();
		$("#outlab").css("background-color", "#00ff80");
		$("#ct").css("background-color", "");
		$("#privst").css("background-color", "");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "");
		$("#autho").css("background-color", "");

	}
}
