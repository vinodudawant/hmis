function getPatientInfoByTreatIdIPD() {
	
	var treatmentId = $("#trtId").val();
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
				url : "ehat/ipdhistory/getPatientInfoByTreatmentIdIPD",
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
					$("#gender").text(
							" " + r.listOpdPatientDetailsDto[0].gender);
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
					$("#patientId").val(
							" " + r.listOpdPatientDetailsDto[0].patient_id);
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


function saveOpdServicesAdvisedIPD(callfrom) {
	var departmentId = $("#depdocdeskid").val();
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var receiptOf = "general";
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	var recSlaveId = 0;

	if (recSlaveId == "" || recSlaveId == null || recSlaveId == undefined
			|| isNaN(recSlaveId)) {
		recSlaveId = 0;
	}

	var emrPer = $("#emrPer").val();

	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer = 0;
	}

	if (departmentId == 2) {
		saveIPDCpoe();
	} else {
		var flagUpdateorNotsendtoLab = $("#flagUpdateorNotsendtoLab").val();
		if (flagUpdateorNotsendtoLab == 1) {
			alert("Can Not Updated this Test Because test already send It!! ");
			return false;
		}

		var flagUpdateorNotsendtoRis = $("#flagUpdateorNotsendtoRis").val();
		if (flagUpdateorNotsendtoRis == 1) {
			alert("Can Not Updated this Test Because this test already send It!! ");
			return false;
		}

		var queryType = "insert";
		var module = "DrDesk";
		var treatmentId = $("#treatmentId").val();
		var patientId = $.trim(($("#patientId").val()));
		var callfrom1 = $("#callfromforprvTrtmnt").val();
		if (callfrom1 == 'privioustreatmentVise') {
			treatmentId = $("#priviousTrtmntId").val();
		} else if (callfrom1 == "cepisode") {
			treatmentId = $("#treatmentId").val();
		}

		var departmentId = $("#depdocdeskid").val();
		var billId = $("#bill_Id").val();
		var sourceTypeId = 1;
		var rate = 0;
		var otherRate = 0;
		var otherAmount = 0;
		if (sponsorId > 0 && chargesSlaveId > 0) {
			receiptOf = "sponsor";
			getchargesDR(0);
			otherRate = parseFloat($("#chargesfromConf").val());
			if (otherRate == 0 || otherRate == 0.0) {
				getchargesDR(2);
				otherRate = parseFloat($("#chargesubservice").val());
			}
			if (otherRate == 0 || otherRate == 0.0) {
				otherRate = parseFloat($("#chargesubservice").val());
			}
			var emrgancyper = parseFloat($('#emrPer').val());
			var emp = parseFloat(otherRate * emrgancyper / 100);
			otherRate = parseFloat(emp + otherRate);
			otherAmount = otherRate * 1;

		}
		rate = $("#cpoeCharges2").val();
		var quantity = 1;
		var amount = rate * 1;

		var billCat = $("#billCat").val();
		var coPay = 0;
		if (billCat == 0) {
			coPay = amount;
		}

		if (callfrom == "sponsorpack") {
			callfrom = "";
			sponsorId = 0;
			chargesSlaveId = 0;
		} else {
			callfrom = "DrDesk";
		}
		var iscombination = $("#iscombination").val();

		var serviceId = $("#serviceid").val();
		var subServiceId = $("#subserviceid").val();

		var billDetailsId = $("#billidservice").val();

		var subservicesname = $("#txtautoserviceName").val();
		var servicename = $("#servicename").val();
		var unitId = $("#uId").val();
		var doctorId = $("#doctor2").val();
		var clinicalNotes = $("#cpoeClinicalNotes").val();
		var instructions = $("#cpoeIns").val();
		var urgentflag = 'N';
		var sndToLabFlag = 'N';
		var sendToRisFlag = 'N';
		var radiationFlag = 'N';
		var drdeskflag = "-";
		if (departmentId == 3) {
			drdeskflag = 'D';
		} else {
			drdeskflag = 'Y';
		}
		if ($("#cpoeUrgent").is(':checked')) {
			urgentflag = 'Y';
		}
		if ($("#cpoeSendToRad").is(':checked')) {

			radiationFlag = 'Y';
		}
		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}
		var doctorsel = $("#doctor2 :selected").val();

		if (doctorsel == 0 || doctorsel == "" || doctorsel == null) {

		}
		if (clinicalNotes == "" || clinicalNotes == null) {
			clinicalNotes = "-";
		}
		if (instructions == "" || instructions == null) {
			instructions = "-";
		}

		if ($("#cpoeSendToRis").prop("checked") == true) {
			sendToRisFlag = 'Y';
			sndToLabFlag = 'N';
		}
		var serviceDetails = {
			listBillDetails : []
		};
		var patientId ='';
		if($("#patientId").text()!='' && $("#patientId").text() !=null && $("#patientId").text() !=undefined){
			patientId = $("#patientId").text();
		}else{
			patientId = $("#pt_Id").val();
		}
		serviceDetails.listBillDetails.push({
			billDetailsId : billDetailsId,
			patienttId : patientId,
			treatmentId : $("#tr_Id").val(),
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sponsorId,
			rate : rate,
			quantity : quantity,
			amount : amount,
			serviceId : serviceId,
			subServiceId : subServiceId,
			doctorId : doctorId,
			urgentflag : urgentflag,
			clinicalnotes : clinicalNotes,
			instructions : instructions,
			unitId : unitId,
			coPay : coPay,
			drdeskflag : drdeskflag,
			callfrom : callfrom,
			sponsorId : sponsorId,
			chargesSlaveId : chargesSlaveId,
			iscombination : iscombination,
			otherRate : otherRate,
			otherAmount : otherAmount,
			otherPay : otherAmount,
			receiptOf : receiptOf,
			recSlaveId : recSlaveId,
			sndToLabFlag : sndToLabFlag,
			sendToRisFlag : sendToRisFlag,
			rFlag : radiationFlag,
			emrPer : emrPer
		});
		var subList = {
			subSrvList : []
		};
		subList.subSrvList.push({
			serviceId : serviceId,
			subSrvid : subServiceId,
			refDocId : doctorId,
		});
		serviceDetails = JSON.stringify(serviceDetails);
		subList = JSON.stringify(subList);

		var inputs = [];
		inputs.push('module=' + module);
		inputs.push('queryType=' + queryType);
		inputs.push('serviceDetails=' + serviceDetails);
		inputs.push('callfrom=' + callfrom);
		inputs.push('subList=' + subList);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/opdServicesAdvised/saveOpdServicesAdvised",

					success : function(r) {
					
						if (r == 1) {
							alertify.success("Service assign Successfully");
							if (departmentId == 3) {
								fetchbilldetailsDigno();
							} else {
								fetchBillDetails();
							}
							$('#txtautoserviceName').val("");
							$("#subservicesname").val("");
							$("#doctor2").select2("val", 0);
							$("#chargesubservice").val("");

							$("#servicename").val("");
							$("#cpoeClinicalNotes").val("");
							$("#cpoeIns").val("");
							$('#txtautoserviceName').attr('readonly', false);
							$('#dynamicItem').html("");
							$('#cpoeUrgent').attr('checked', false);
							$("#cpoesndtolabdiv").hide();
							$('#cpoesndtolab').attr('checked', false);
						} else if (r == 3) {

							alert("Package is not Configure Please Configure Package!");
							return false;
						} else if (r == 4) {
							var res = confirm("Package is not configure for sponsor. Do you want Default Package?");
							if (res == true) {
								// For opd sponsor patient.
								saveOpdServicesAdvised('sponsorpack');
							} else {

								return false;
							}

						} else if (r == 6) {
							alert("Package is out of Date Can't save!!!!");

						} else if (r == 2) {
							alertify.success("Update successfully...!!!");
							$('#txtautoserviceName').val("");
							$("#subservicesname").val("");
							$("#doctor2").select2("val", 0);
							$("#chargesubservice").val("");
							$("#servicename").val("");
							$("#cpoeClinicalNotes").val("");
							$("#cpoeIns").val("");
							$('#txtautoserviceName').attr('readonly', false);
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

function fetchPreviousTreatmentsByTreatmentIDNew(){
	var  treatmentId= ($("#tr_Id").val()).trim();
	 var inputs=[];
	 inputs.push('treatmentId=' + treatmentId);
	 var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/previousTreatemnt/fetchPreviousTreatmentsByTreatmentID",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				
				   //alert('Success fetch'+JSON.stringify(r));
									$("#previousPatientSummaryTable").html("");
									var htm = "";
									var rowCount = 0;

									if (r.litreatment.length > 0) {
										
										for (var i = 0; i < r.litreatment.length; i++) {  
											
											rowCount++;

											htm = htm
													+ "<tr  class='newIvfallergyAlertRow' id='count"
													+ (rowCount)
													+ "'>"

													+ "<td class='col-md-2-1 center TextFont'> <span id='snum"
													+ rowCount
													+ "'>"
													+ rowCount
													+ "</span><input type='hidden' id='allergyAlertsHiddenId"
													+ rowCount
													+ "' value="
													+ r.litreatment[i].treatment_ID
													+ "></td>"
													
													+ "<td class='col-md-2-1 center TextFont' >"
													+ r.litreatment[i].department
													+ "</td>"
													
													+ "<td class='col-md-2-1 center TextFont' >"
													+ r.litreatment[i].tstartDate
													+ "</td>"

													+ "<td class='col-md-2-1 center TextFont'>"
													+ r.litreatment[i].treatmentCount	
													+ "</td>"
													
													+ "<td class='col-md-2-1 TextFont' > "
													+ "<button id='viewid' class='b' title='Pervious Treatment'onclick='printPreviousTreatment("
													+ r.litreatment[i].treatment_ID
													+ ")' type='button'><i class='fa fa-eye View'></i></button></td>"

													
													+ "</tr>";
							
										}
										$("#previousPatientSummaryTable").append(htm);
									}
									
								
			}
		});

}
