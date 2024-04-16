function getIpdBillPatients(callform, id) {

	var ward = "-";
	if (id == "wardType1") {
		ward = "wardwise";
	} else if (id == "hallTypeSelectID") {
		ward = "bothwise";
	}
	var wardType = $("#wardType1").val();
	var hallTypeSelectId = $("#hallTypeSelectID").val();

	if (wardType == null || wardType == "-") {

		wardType = 0;
	}

	if (hallTypeSelectId == null) {

		hallTypeSelectId = 0;
	}

	var inputs = [];
	inputs.push("callform=" + callform);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/viewIpdbillPatients",
		success : function(r) {

			setIpdbillPatientsTemp(r);
		}
	});
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 09-June-2017
 * @codeFor : Set ipd queue template
 ******************************************************************************/
function setIpdbillPatientsTemp(res) {

	var count = 1;
	var ipdqueueTemp = "";		

	for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {		

		var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;
		var fullName = res.lstIpdbillPatients[indx].patientName;
		var categoryName = res.lstIpdbillPatients[indx].categoryName;
		ipdqueueTemp = ipdqueueTemp
				+ "<tr>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
				+ count
				+ "</td>"
				+ "	<td class='col-sm-3-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ fullName
				+ "</td>"

				// For Sonsor Name
				+ "	<td class='col-sm-3-1' id='divSp"
				+ count
				+ "' style='height: 21.5px;'>"
				+ categoryName
				+ "</td>"

				+ "	<td class='col-sm-1-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].centerPatientId
				+ "</td>"

				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mobile
				+ "</td>"

				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mrnno
				+ "</td>"

				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].opdipdno
				+ "</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnDelete"
				+ count
				+ "' "
				+ "		onclick=viewBillForIPD("
				+ res.lstIpdbillPatients[indx].treatId
				+ ",'generalBill','"+phyDisFlag+"') style='font-size: 12px;' />"
				+ "	</td>"

				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='Print' class='btn btn-xs btn-success' id='btnPrint"
				+ count + "' " + "		onclick=printsForPatients("
				+ res.lstIpdbillPatients[indx].treatId
				+ ") style='font-size: 12px;' />" + "	</td>"

				+ "</tr>";

		count = count + 1;
	}
	$("#ipdBillPatients").html(ipdqueueTemp);
	$("#ipdBillPatients1").html(ipdqueueTemp);
}

function viewBillForIPD(treatId, finalbill, phyDisFlag) {

	if(phyDisFlag != "Y"){
		
		phyDisFlag = "N";
	}
	window.location.href = "ehat_ipd_billing.jsp?" + "treatmentId="
			+ encodeURIComponent(treatId) + "&finalbillIs="
			+ encodeURIComponent(finalbill)+ "&phyDisFlag="
			+ encodeURIComponent(phyDisFlag);
}