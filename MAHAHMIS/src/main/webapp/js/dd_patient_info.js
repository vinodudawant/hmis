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
							|| r.listOpdPatientDetailsDto[0].bill_category == " "
							|| r.listOpdPatientDetailsDto[0].bill_category == undefined
							|| r.listOpdPatientDetailsDto[0].bill_category === '' || r.listOpdPatientDetailsDto[0].bill_category === "Self") {
						$("#billCategoty").text(" " + "Self");
						$("#corporate").text("-");
					} else {
						$("#billCategoty").text(" " + "Sponsor");
						$("#corporate")	.text(
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
					$("#gender").text(
							" " + r.listOpdPatientDetailsDto[0].gender);
					var Doadate = new Date(
							r.listOpdPatientDetailsDto[0].created_date_time)
							.toLocaleString();
					var prdate = Doadate.split(',');
					var dateD = GetFormattedDate(new Date(prdate[0]),
							"ddmmyyyy").toLocaleString();
					var date = dateD + "," + prdate[1];

				//	$("#doa").text(getDateWithTime(r.listOpdPatientDetailsDto[0].created_date_time));
					$("#doa").text(	" " + date);
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

					$("#billNo").text(	" " + r.listOpdPatientDetailsDto[0].bill_id);
					$("#bill_Id").text(	" " + r.listOpdPatientDetailsDto[0].bill_id);
					$("#billNo1").text(	" " + r.listOpdPatientDetailsDto[0].invoice_count);
					$("#pdob").val(" " + r.listOpdPatientDetailsDto[0].dob);
					$("#opdNo").text(
							" " + r.listOpdPatientDetailsDto[0].opdipdno);
					$("#patientId").text(" " + r.listOpdPatientDetailsDto[0].patient_id);
					
					var checkTarget = r.listOpdPatientDetailsDto[0].target_height;
					if(checkTarget != 6.5 && checkTarget != -6.5 )
				  	{
				  		$("#TARGET_HEIGHT").text(r.listOpdPatientDetailsDto[0].target_height);
				  	}
				//	$("#TARGET_HEIGHT").text(" " + r.listOpdPatientDetailsDto[0].target_height);
					$("#userdr_id").val(+ r.listOpdPatientDetailsDto[0].doctor_id);

					$("#doctorSpecilizationId").val(+ r.listOpdPatientDetailsDto[0].speciality_id);
					
					$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='	+ r.listOpdPatientDetailsDto[0].image_name);
					if (r.listOpdPatientDetailsDto[0].weight != null
							&& r.listOpdPatientDetailsDto[0].weight != "") {
						$("#h_w").text(
								" " + r.listOpdPatientDetailsDto[0].height
										+ "/"
										+ r.listOpdPatientDetailsDto[0].weight);
					} else {
						$("#h_w").text(" ");
					}
					$("#lblCenterPIdVal").text(	" "	+ r.listOpdPatientDetailsDto[0].center_patient_id);
					
					$("#sex").text(	" "	+ r.listOpdPatientDetailsDto[0].gender);
					
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

function getPatientCommanAdvance(){
	var patient_ID = $('#pt_Id').val();

    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/commanadv/getcommanadvMasterList",
		data	: {
			"pID_cID" : patient_ID,
			"callform"   :callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			
			var total=0;
			var add=0;
			for ( var i = 0; i < response.lstCommonadv.length; i++) {
				//total=Number(total)+Number( response.lstCommonadv[i].commonadv_amnt).toFixed(2);
				add=parseFloat(add)+parseFloat(response.lstCommonadv[i].commonadv_amnt);
			}
			
			$("#finalAdvance").text(add);
			
		}

	});
 
}
