/* =========== Lab Information =========== */

/************
* @author	: Akshay Mache
* @date		: 16-Jan-2020
* @codeFor	: get Lab Details
 ************/
function fetchOwnLabDetails(callFrom) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labinformation/getlabinfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("Network Issue");
		},
		success : function(r) {
			if (callFrom == "LabForm") {
				$("#txtLabName").val(r.name);
				$("#txtAddress").html(r.address);
				$("#email").val(r.email);
				$("#txtPathologist").val(r.pathalogist);
				$("#txtDegree").val(r.degree);
				$("#txtLabCode").val(r.labCode);
				$("#txtTelephone").val(r.telephoneNo);
				$("#txtOpeningTime").val(r.openingTime);
				$("#txtClosingTime").val(r.closingTime);
				$("#txtLunchTime").val(r.lunchTime);
				$("#selClosedDay").val(r.closedDay);
				
				if(r.idOwnLab == "" || r.idOwnLab == null || r.idOwnLab == undefined)
					$("#hiddenMainLabId").val("0");
				else
					$("#hiddenMainLabId").val(r.idOwnLab);
			} else {
				$("#labName").html(mainLabData.labInformationList[0].name);
				$("#labAdd").html(mainLabData.labInformationList[0].address);
				$("#labTelephone").html(mainLabData.labInformationList[0].telephoneNo);
				$("#OpenTime").html(mainLabData.labInformationList[0].openingTime);
				$("#CloseTime").html(mainLabData.labInformationList[0].closingTime);
				$("#LunchTime").html(mainLabData.labInformationList[0].lunchTime);
				$("#closeOn").html(mainLabData.labInformationList[0].closedDay);
				$("#footerLab").html(mainLabData.labInformationList[0].footerName);
			}
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 16-Jan-2020
* @codeFor	: Save Lab Details
 ************/
function saveOwnLabDetails() {
	var labName = $("#txtLabName").val();
	var address = $("#txtAddress").val();
	var txtEmail = $("#email").val();
	var txtTelephone = $("#txtTelephone").val();
	var txtLabCode = $("#txtLabCode").val();
	var txtPathologist = $("#txtPathologist").val();
	var txtDegree = $("#txtDegree").val();
	var txtOpeningTime = $("#txtOpeningTime").val();
	var txtClosingTime = $("#txtClosingTime").val();
	var txtLunchTime = $("#txtLunchTime").val();
	var selClosedDay = $("#selClosedDay").val();
	var hiddenLabId = $("#hiddenMainLabId").val();
	
	if (labName == "") {
		icon - thin - right - arrow
		alert("Please Enter Lab Name!");
		SetFocus("txtLabName");
		return false;
	} else if (txtPathologist == "") {
		alert("Please Enter Pathologist Name!");
		SetFocus("txtPathologist");
		return false;
	} else if (txtTelephone == "") {
		alert("Please Enter Telephone Number!");
		SetFocus("txtTelephone");
		return false;
	}

	var inputs = [];
	inputs.push('idOwnLab=' + encodeURIComponent(hiddenLabId));
	inputs.push('labCode=' + encodeURIComponent(txtLabCode));
	inputs.push('name=' + encodeURIComponent(labName));
	inputs.push('address=' + encodeURIComponent(address));
	inputs.push('email=' + encodeURIComponent(txtEmail));
	inputs.push('pathalogist=' + encodeURIComponent(txtPathologist));
	inputs.push('degree=' + encodeURIComponent(txtDegree));
	inputs.push('telephoneNo=' + encodeURIComponent(txtTelephone));
	inputs.push('openingTime=' + encodeURIComponent(txtOpeningTime));
	inputs.push('closingTime=' + encodeURIComponent(txtClosingTime));
	inputs.push('lunchTime=' + encodeURIComponent(txtLunchTime));
	inputs.push('closedDay=' + encodeURIComponent(selClosedDay));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labinformation/savelabinfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("Network Issue");
		},
		success : function(r) {
			fetchOwnLabDetails("LabForm");
		}
	});
}
