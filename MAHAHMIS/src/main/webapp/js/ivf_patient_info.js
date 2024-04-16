function getPatientInfoByTreatId() {
	
	var treatmentId = $("#tr_Id").val();
	if (treatmentId == null || treatmentId == undefined || treatmentId == "") {
		alert("Please select patient");
		return false;
	}
	var dpid = 1;

	
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
	inputs.push('dpid=' + encodeURIComponent(dpid));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/opdhistory/getPatientInfoByTreatmentId",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					

					$("#patientName").text(
							r.listOpdPatientDetailsDto[0].patient_name);
					$("#treatmentId").text(
							" " + r.listOpdPatientDetailsDto[0].treatment_id);

					// $("#mrnid").text(r.mrnno);
					if (r.listOpdPatientDetailsDto[0].bill_category == null
							|| r.listOpdPatientDetailsDto[0].bill_category == "null"
							|| r.listOpdPatientDetailsDto[0].bill_category == ""
							|| r.listOpdPatientDetailsDto[0].bill_category == undefined
							|| r.listOpdPatientDetailsDto[0].bill_category === '') {
						$("#billCategoty").text(" " + "Self");
					} else {
						$("#billCategoty")
								.text(
										" "
												+ r.listOpdPatientDetailsDto[0].bill_category);
					}
					// /$("#age").text(r.listOpdPatientDetailsDto[0].age+"Y/"+r.listOpdPatientDetailsDto[0].age_months+"M/"+r.listOpdPatientDetailsDto[0].age_days+"D");
					$("#age").text(r.listOpdPatientDetailsDto[0].patient_age);
					var docName = r.listOpdPatientDetailsDto[0].doc_name;
					var res = "";
					if (docName != "" && docName != null) {
						res = docName.split(',');
					}
					var dname = res[0];
					$("#doctor_id").text(" " + dname)
					$("#sex").text(" " + r.listOpdPatientDetailsDto[0].gender);
					var Doadate = new Date(
							r.listOpdPatientDetailsDto[0].created_date_time)
							.toLocaleString();
					var prdate = Doadate.split(',');
					var dateD = GetFormattedDate(new Date(prdate[0]),
							"ddmmyyyy").toLocaleString();
					var date = dateD + "," + prdate[1];

					$("#doa")
							.text(
									getDateWithTime(r.listOpdPatientDetailsDto[0].created_date_time));
					if (r.listOpdPatientDetailsDto[0].consulting_doctor == null
							|| r.listOpdPatientDetailsDto[0].consulting_doctor == "null"
							|| r.listOpdPatientDetailsDto[0].consulting_doctor == ""
							|| r.listOpdPatientDetailsDto[0].consulting_doctor == undefined) {
						$("#refDoctor").text("");
					} else {
						$("#refDoctor")
								.text(
										" "
												+ r.listOpdPatientDetailsDto[0].consulting_doctor);
					}

					if (r.listOpdPatientDetailsDto[0].doc_name != null
							&& r.listOpdPatientDetailsDto[0].doc_name != "") {
						$("#consultingDoctorr").text(
								" " + r.listOpdPatientDetailsDto[0].doc_name);
					} else {
						$("#consultingDoctorr").text(" ");
					}

					$("#billNo").text(
							" " + r.listOpdPatientDetailsDto[0].bill_id);
					$("#pdob").val(" " + r.listOpdPatientDetailsDto[0].dob);
					$("#opdNo").text(
							" " + r.listOpdPatientDetailsDto[0].opdipdno);
					$("#patientId").text(" " + r.listOpdPatientDetailsDto[0].patient_id);
					
					$("#userdr_id").val(+ r.listOpdPatientDetailsDto[0].doctor_id);
					
					$('#patientImg').attr(
							'src',
							'pharmacy/pharmacy/readImage?url='
									+ r.listOpdPatientDetailsDto[0].image_name);
					if (r.listOpdPatientDetailsDto[0].weight != null
							&& r.listOpdPatientDetailsDto[0].weight != "") {
						$("#h_w").text(
								" " + r.listOpdPatientDetailsDto[0].height
										+ "/"
										+ r.listOpdPatientDetailsDto[0].weight);
					} else {
						$("#h_w").text(" ");
					}
					$("#lblCenterPIdVal")
							.text(
									" "
											+ r.listOpdPatientDetailsDto[0].center_patient_id);

				}
			});
}

// this is added by Vishnu
function getDateWithTime(date) {
	var date1;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	date1 = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2)
			+ " " + hours + ":" + ('0' + minute).slice(-2) + ":"
			+ ('0' + seconds).slice(-2);
	//datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	console.log("Datee >> " + date1);
	return date1;
}

function GetFormattedDate(date, type) {

	var todayTime = date;

	var month = todayTime.getMonth() + 1;

	var day = todayTime.getDate();

	var year = todayTime.getFullYear();

	if (type == "ddmmyyyy") {

		return day + "/" + month + "/" + year;
	}

	return month + "/" + day + "/" + year;

}
