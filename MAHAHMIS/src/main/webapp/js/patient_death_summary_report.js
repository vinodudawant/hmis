function saveDeathSummary(){
	var patientDeathId = $("#patientDeathId").val();
	var patientId = $("#pt_Id").val();
	var treatmentId = $("#tid").val();
	
	var patientName = $("#dpatientName").val();
	var patientGeneder = $("#dpatient_gender").val();
	var patientAge = $("#dpatient_age").val();
	var patientAddress = $("#dpatient_address").val();
	var patientContact = $("#dpatient_contact").val();
	var patientOccuption = $("#dpatient_occupation").val();
	var patientDate = $("#dpatient_date").val();
	var patientSymptom = $("#dpatient_symptom").val();
	var patientPhysicalCondition = $("#dpatient_physical_condion").val();
	var patientTreatmentDetail = $("#dpatient_treatment_detail").val();
	var patientFirstDateFrom = $("#dpatient_first_dfrom").val();
	var patientSecondDateFrom = $("#dpatient_second_dfrom").val();
	var patientTravelHistory = $("#dpatient_travel_history").val();
	var patientIWWDateFrom = $("#dpatient_iww_dtfrom").val();
	var patientreferncingHospital = $("#dpatient_refering_hospital").val();
	var patientAdmissionDateinIWW = $("#dpatient_admission_in_iww").val();
	var patientAdmissionTimeinIWW = $("#dpatient_admission_time_in_iww").val();
	var patientIWWName = $("#dpatient_iww_name").val();
	var patientDateThroatTaken = $("#dpatient_date_throat_taken").val();
	var patienTrhoatSwabResultDate = $("#dpatient_date_throat_swap_result").val();
	var patienTrhoatSwabResult = $("#dpatient_result_throat_swab").val();
	var patientLaboratoryName = $("#dpatient_laboratory_name").val();
	var patientOtRelevantLabResult = $("#dpatient_other_relevant_lab_result").val();
	var patientSpecialTreatment = $("#dpatient_special_treatment").val();
	var patientDeathDate = $("#dpatient_death_date").val();
	var patientDeathTime = $("#dpatient_death_time").val();
	var patientDathPlace = $("#dpatient_place_death").val();
	var patientDeathCause = $("#dpatient_cause_death").val();
	var patientDischargeDate = $("#discharge_date").val();
	var patientDischargeTime = $("#discharge_Time").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	
	
	var inputs = [];
	inputs.push('patientDeathId=' + patientDeathId);
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientName=' + patientName);
	inputs.push('patientGeneder=' + patientGeneder);
	inputs.push('patientAge=' + encodeURIComponent(patientAge));
	inputs.push('patientAddress=' + encodeURIComponent(patientAddress));
	inputs.push('patientContact=' + patientContact);
	inputs.push('patientOccuption=' + encodeURIComponent(patientOccuption));
	inputs.push('patientDate=' + patientDate);
	inputs.push('patientSymptom=' + encodeURIComponent(patientSymptom));
	inputs.push('patientPhysicalCondition=' + encodeURIComponent(patientPhysicalCondition));
	inputs.push('patientTreatmentDetail=' + encodeURIComponent(patientTreatmentDetail));
	inputs.push('patientFirstDateFrom=' + patientFirstDateFrom);
	inputs.push('patientSecondDateFrom=' + patientSecondDateFrom);
	inputs.push('patientTravelHistory=' + encodeURIComponent(patientTravelHistory));
	inputs.push('patientIWWDateFrom=' + patientIWWDateFrom);
	inputs.push('patientreferncingHospital=' + encodeURIComponent(patientreferncingHospital));
	inputs.push('patientAdmissionDateinIWW=' + patientAdmissionDateinIWW);
	inputs.push('patientAdmissionTimeinIWW=' + patientAdmissionTimeinIWW);
	inputs.push('patientIWWName=' + encodeURIComponent(patientIWWName));
	inputs.push('patientDateThroatTaken=' + encodeURIComponent(patientDateThroatTaken));
	inputs.push('patienTrhoatSwabResultDate=' + patienTrhoatSwabResultDate);
	inputs.push('patienTrhoatSwabResult=' + encodeURIComponent(patienTrhoatSwabResult));
	inputs.push('patientLaboratoryName=' + encodeURIComponent(patientLaboratoryName));
	inputs.push('patientOtRelevantLabResult=' + encodeURIComponent(patientOtRelevantLabResult));
	inputs.push('patientSpecialTreatment=' + encodeURIComponent(patientSpecialTreatment));
	inputs.push('patientDeathDate=' + patientDeathDate);
	inputs.push('patientDeathTime=' + patientDeathTime);
	inputs.push('patientDathPlace=' + patientDathPlace);
	inputs.push('patientDeathCause=' + encodeURIComponent(patientDeathCause));
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('patientDischargeDate=' + patientDischargeDate);
	inputs.push('patientDischargeTime=' + patientDischargeTime);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/deathsummary/savepatientdeathsummary",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alertify.success("Record saved successfully..!");
			} else if (response == 2) {
				alertify.success("Record Updated successfully..!");
			}  else {
				alertify.error("Network Issue");
			}
			//setExistingDoctorTemp();
			//refershChannelDoctorMgmt();
			getListOfDeathSummaryReportByTreatmentId();

		}
	});

	
}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 15-july-2020
 * @codeFor : getListOfDeathSummaryReportByTreatmentId()
 ******************************************************************************/
function getListOfDeathSummaryReportByTreatmentId() {

	var treatmentId = $("#tid").val();
	var inputs = [];
	inputs.push('treatmentId=' + treatmentId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/deathsummary/getlistOfdeathsummaryreportbytreatmentId",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			setDeathSummaryReportOnTab(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}


function setDeathSummaryReportOnTab(r){
	if(r.lstpatientDeathSummaryReportDto.length==0){
		$("#patientDeathId").val(0);
	}else{
		$("#patientDeathId").val(r.lstpatientDeathSummaryReportDto[0].patientDeathId);
		
		 $("#tid").val(r.lstpatientDeathSummaryReportDto[0].treatmentId);
		 $("#pid").val(r.lstpatientDeathSummaryReportDto[0].patientId);
		 $("#dpatientName").val(r.lstpatientDeathSummaryReportDto[0].patientName);
		 $("#dpatient_gender").val(r.lstpatientDeathSummaryReportDto[0].patientGeneder);
		 $("#dpatient_age").val(r.lstpatientDeathSummaryReportDto[0].patientAge);
		 $("#dpatient_address").val(r.lstpatientDeathSummaryReportDto[0].patientAddress);
		 $("#dpatient_contact").val(r.lstpatientDeathSummaryReportDto[0].patientContact);
		 $("#dpatient_occupation").val(r.lstpatientDeathSummaryReportDto[0].patientOccuption);
		 $("#dpatient_date").val(r.lstpatientDeathSummaryReportDto[0].patientDate);
		 $("#dpatient_symptom").val(r.lstpatientDeathSummaryReportDto[0].patientSymptom);
		 $("#dpatient_physical_condion").val(r.lstpatientDeathSummaryReportDto[0].patientPhysicalCondition);
		 $("#dpatient_treatment_detail").val(r.lstpatientDeathSummaryReportDto[0].patientTreatmentDetail);
		 $("#dpatient_first_dfrom").val(r.lstpatientDeathSummaryReportDto[0].patientFirstDateFrom);
		 $("#dpatient_second_dfrom").val(r.lstpatientDeathSummaryReportDto[0].patientSecondDateFrom);
		 $("#dpatient_travel_history").val(r.lstpatientDeathSummaryReportDto[0].patientTravelHistory);
		 $("#dpatient_iww_dtfrom").val(r.lstpatientDeathSummaryReportDto[0].patientIWWDateFrom);
		 $("#dpatient_refering_hospital").val(r.lstpatientDeathSummaryReportDto[0].patientreferncingHospital);
		 $("#dpatient_admission_in_iww").val(r.lstpatientDeathSummaryReportDto[0].patientAdmissionDateinIWW);
		 $("#dpatient_admission_time_in_iww").val(r.lstpatientDeathSummaryReportDto[0].patientAdmissionTimeinIWW);
		 $("#dpatient_iww_name").val(r.lstpatientDeathSummaryReportDto[0].patientIWWName);
		 $("#dpatient_date_throat_taken").val(r.lstpatientDeathSummaryReportDto[0].patientDateThroatTaken);
		 $("#dpatient_date_throat_swap_result").val(r.lstpatientDeathSummaryReportDto[0].patienTrhoatSwabResultDate);
		 $("#dpatient_laboratory_name").val(r.lstpatientDeathSummaryReportDto[0].patientLaboratoryName);
		 $("#dpatient_other_relevant_lab_result").val(r.lstpatientDeathSummaryReportDto[0].patientOtRelevantLabResult);
		 $("#dpatient_special_treatment").val(r.lstpatientDeathSummaryReportDto[0].patientSpecialTreatment);
		 $("#dpatient_death_date").val(r.lstpatientDeathSummaryReportDto[0].patientDeathDate);
		 $("#dpatient_death_time").val(r.lstpatientDeathSummaryReportDto[0].patientDeathTime);
		 $("#dpatient_place_death").val(r.lstpatientDeathSummaryReportDto[0].patientDathPlace);
		 $("#dpatient_cause_death").val(r.lstpatientDeathSummaryReportDto[0].patientDeathCause);
		 $("#dpatient_result_throat_swab").val(r.lstpatientDeathSummaryReportDto[0].patienTrhoatSwabResult);
		
	}
}


function printDeathSummaryReport(){
	var treatmentId=$("#tid").val();
	
	
	window
	.open(("patient_death_summary_report_print.jsp?" + "treatmentId="
			+ encodeURIComponent(treatmentId) ));
	
}

function getPatientDataByTreatmentId2(r) {
	var deptID=0;
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"treatmentId" : r
		},
		url : "ehat/opdbill/getPatientInfoByTreatmentId",
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			
			
			// setTempPatientRecords(r);
 			if(r.listRegTreBillDto[0]!=undefined || r.listRegTreBillDto[0]!=null){
			 /*****Added By Sagar******/
			var date=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString('en-GB');
			//set hidden date +
			var dd=date.split(',');
  			$("#dtofadmission").text(dd[0]);
  			//set hidden for print +
  			
  		//	$("#ptName").val(r.listRegTreBillDto[0].patientName);
  			$("#OpdIpdNo").val(r.listRegTreBillDto[0].trcount);

            //        $("#ptName").val(r.listRegTreBillDto[0].patientName);



                    $("#ptName").val(r.listRegTreBillDto[0].patientName);

                    $("#corporate").text(r.listRegTreBillDto[0].categoryName);



                    $("#corporate").text(r.listRegTreBillDto[0].categoryName);



                    $("#dpatientName").val(r.listRegTreBillDto[0].patientName);



                    $("#dpatient_age").val(r.listRegTreBillDto[0].age);



                    $("#dpatient_gender").val(r.listRegTreBillDto[0].gender);



                     $("#dpatient_address").val(r.listRegTreBillDto[0].address);



               $("#dpatient_contact").val(r.listRegTreBillDto[0].mobile);



                    $("#patientId").val(r.listRegTreBillDto[0].patientId); 
  			$("#corporate").text(r.listRegTreBillDto[0].categoryName);
  		//	$("#idForDisc").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
  		//	$("#isPpn").val(r.listRegTreBillDto[0].isPpn);
  		//	$("#numbr").val(r.listRegTreBillDto[0].numbr);
  			
  		//	if(r.listRegTreBillDto[0].isPpn == "Y"){
  			//	$('#ppn').show();
  				
  				//$("#txtnumber").html(r.listRegTreBillDto[0].numbr);
  			//	$("#ppnNumber").html(r.listRegTreBillDto[0].numbr);
  		//		$('#ppnNumber').show();
  		//	}
  			
			
		//	$("#genInvoiceFlag").val(r.listRegTreBillDto[0].invoiceFlag);
			
		//	var fileName=r.listRegTreBillDto[0].imageName;	
		//	$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
			   			  
   		//	getSponsorRecords(r.listRegTreBillDto[0].chargesMasterSlaveId,r.listRegTreBillDto[0].sourceTypeId);
 			
			$("#age").text(r.listRegTreBillDto[0].age);
			$("#dpatient_age").text(r.listRegTreBillDto[0].age);
			$("#patientName").text(r.listRegTreBillDto[0].patientName );
		//	$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
		    $("#billNo").text(r.listRegTreBillDto[0].billId);
		    $("#DisBillNo").text(r.listRegTreBillDto[0].billId);
		    //alert(r.listRegTreBillDto[0].departmentId);
	//	    $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
		    //hidden set 
		    $("#deptid").val(r.listRegTreBillDto[0].departmentId);
		    
		    $("#consultingDoctorr").text(r.listRegTreBillDto[0].consultingDocName);
			 
	//	    dept=r.listRegTreBillDto[0].departmentId;
		//    $("#drid").val(r.listRegTreBillDto[0].doctorId);
		//    $("#pid").val(r.listRegTreBillDto[0].patientId);
		    
		    //****hidden set for bmi****//
 	//	   $("#dbirth").val(r.listRegTreBillDto[0].dob) ;
		   $("#height1").val(r.listRegTreBillDto[0].height) ;
 		   $("#weight1").val(r.listRegTreBillDto[0].weight) ;
		  
 		  $("#h_w").text(r.listRegTreBillDto[0].height+" / "+r.listRegTreBillDto[0].weight) ;
 
			$("#sex").text(r.listRegTreBillDto[0].gender);
			deptID =r.listRegTreBillDto[0].departmentId;
	//		$("#deptId").val(r.listRegTreBillDto[0].departmentId);
	//	$("#pId").val(r.listRegTreBillDto[0].patientId);
	//		$("#PiD").val(r.listRegTreBillDto[0].patientId);			
	//		$("#bId").val(r.listRegTreBillDto[0].billId);
			$("#tId").val(r.listRegTreBillDto[0].treatmentId);
			$("#treatmentId").html(r.listRegTreBillDto[0].treatmentId);
			$("#sId").val(r.listRegTreBillDto[0].serviceId);
			//$("#ipdNo").text(r.listRegTreBillDto[0].fName);
			
  			if(r.listRegTreBillDto[0].sourceTypeId>0){
 				sponsorTypeList(r.listRegTreBillDto[0].sourceTypeId);
 			}else{
				$("#billCategoty").text("Self");
				$("#corporate").text("");
			}
  			  $("#ipdNo").text(r.listRegTreBillDto[0].trcount);
  		//	$("#ipdNumber").val(r.listRegTreBillDto[0].trcount);
  			  $("#doa").text(date);
 			//  $("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
		//	  $("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
 			  //hidden field set 
			  $("#pt_Id").val(r.listRegTreBillDto[0].patientId);
			  //$("#pid").val(r.listRegTreBillDto[0].patientId);
			  $("#bill_Id").val(r.listRegTreBillDto[0].billId);
			  $("#refDocId").val(r.listRegTreBillDto[0].refDocId);
			  $("#patientId").text(r.listRegTreBillDto[0].patientId);	
			  //$("#consultingDoctor").text('');//r.listRegTreBillDto[0].invoiceCount			  
			  $("#consultingDoctor").text(r.listRegTreBillDto[0].invoiceCount);
			  
			  $("#prnId").text(r.listRegTreBillDto[0].patientId);	
			  $("#preBillId").text(r.listRegTreBillDto[0].invoiceCount);			  
			  
			 var patPrefix=$("#patPrefix").val();
			 var patMiddle=$("#patMiddle").val();
			 var patSufix=$("#patSufix").val();
			 var patIdPrefix=patPrefix+patMiddle+r.listRegTreBillDto[0].patientId+patSufix;				
	  		 //$("#prnId").text(patIdPrefix);
			 $("#prnId").text(r.listRegTreBillDto[0].patientId);
			 $("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
			 $("#centeripdID").text(r.listRegTreBillDto[0].centerPatientId);

			 
			 var billPrefix=$("#billPrefix").val();
		  	 var billMiddle=$("#billMiddle").val();
		  	 var billSufix=$("#billSufix").val();
		  	 var billIdPrefix=billPrefix+billMiddle+r.listRegTreBillDto[0].invoiceCount+billSufix;
		  	 $("#preBillId").text(billIdPrefix);
		  	 $("#refDoctor").text(r.listRegTreBillDto[0].refDocName);
		  	//$("#refDoctor").text(r.listRegTreBillDto[0].refDocName);
		  	
		  	$("#tFlag").val(r.listRegTreBillDto[0].tFlag);

		  	
		  	if(r.listRegTreBillDto[0].dischargeDate!="-" && r.listRegTreBillDto[0].dischargeDate!=null && r.listRegTreBillDto[0].dischargeDate!=""){
		  		var dischargeDate= new Date(r.listRegTreBillDto[0].dischargeDate).toLocaleString();
			  	$("#dod").text((dischargeDate).split(",")[0]+", "+r.listRegTreBillDto[0].dischargeTime);
		  	}else{
		  		//$("#dod").text("-");
		  	}
		  	$("#physicalDisFlag").val(r.listRegTreBillDto[0].physicalDisFlag);
		  	 $("#mrn").val(r.listRegTreBillDto[0].mrnno );
			  /*var len = r.listRegTreBillDto[0].listEhatBillPrefix.length;		
			  for(var n=0;n<len;n++){
				
			  		var lst = r.listRegTreBillDto[0].listEhatBillPrefix[n];
			  		// For Patient Id
			  		var patId=r.listRegTreBillDto[0].patientId;
			  		if(lst.depId==4){
			  			
			  			var prefix=lst.billPrefix;
			  			var middle=lst.billMiddle;
			  			var sufix=lst.billSuffix;
			  			var patIdPrefix=prefix+middle+patId+sufix;
			  			$("#prnId").text(patIdPrefix);			  			
			  		}
			  		// For Patient Id
			  		
			  		// For bill Id
			  		var invoiceCount=r.listRegTreBillDto[0].invoiceCount;
			  		if((lst.billRecBoth==1 || lst.billRecBoth==3)){
			  			
			  			var prefix=lst.billPrefix;
			  			var middle=lst.billMiddle;
			  			var sufix=lst.billSuffix;
			  			var billIdPrefix=prefix+middle+invoiceCount+sufix;
			  			$("#preBillId").text(billIdPrefix);			  			
			  		}
			  		// For Patient Id
			  		
			  	}*/		  
 			}
 		}
	});
	return deptID;
}


