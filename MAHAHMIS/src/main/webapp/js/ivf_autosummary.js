


function viewIvfDischargeSummary(ivftreatmentId,treatmentId){
//var treatmentId = $("#tr_Id").val();
//	var treatmentId =1;

	window.location.href = "ivf_autosummary.jsp?" + "treatmentId=" + treatmentId + "&ivfTreatmentId=" + ivftreatmentId ;
}


function getIvfPatientInfoByIVFTreatIdForAutoSummary(){
	
	var treatmentId = $('#treatmentId').text();
	var ivfTreatmentId = $('#ivf_tr_Id').val();
	
	//alert("hello---"+ivfTreatmentId);
	var inputs = [];
	inputs.push("ivftreatmentId=" +ivfTreatmentId);
	//inputs.push("treatmentId=" +treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/getIvfPatientInfoByIVFTreatId",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			
			 // $('#pt_Id').val(r.patientId);
			//  $('#pid').val(r.patientId);
			  $('#patientId').text(r.patientId);
			  $('#patientName').text(r.patientName);
			  $('#age').text(r.age);
			  var date=new Date(r.createdDateTime).toLocaleString();
			  $('#doa').text(date);
			//  $('#height1').text(r.height);
			//  $('#weight1').text(r.weight);
			  $('#sex').text(r.gender);
			 
			
		}
	});
}

function getPatientDataByTreatmentId(r) {
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
 		//	  $("#doa").text(date);
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
		  		$("#dod").text("-");
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

function sponsorTypeList(callfrom)
{

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/registration/getSponsorTypeList",
				error:function(r){
					alert(r);
 				},
		    	success : function(r) {
		    		 console.log(r);
		    		setTemplateForSponsorTypeList(r,callfrom);
		    	 
		    		
				}
			});
	

}


function setTemplateForSponsorTypeList(r,callFrom){

	var list="<option value='0'>Self</option>";
	

	for ( var int = 0; int < r.lstCharges.length; int++) {
		
		if(callFrom==r.lstCharges[int].chargesId){
			$("#billCategoty").text(r.lstCharges[int].chargesName);
 		}
		
		
			list=list+'<option value="'+(r.lstCharges[int].chargesId)+'">'+(r.lstCharges[int].chargesName)+'</option>';
		 	
	}	
	$("#sourceType").html(list);
	}
/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment fetch IVF Digno Template For Auto Summary
 ******************************************************************************/
function getListOfIVFDignosisForAutoSummary() {
	var ivftreatmentId =$('#ivf_tr_Id').val();

	
	var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('ivfTreatId=' + ivftreatmentId);

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdiagnosis/getListOfIVFDignosis",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			setIvfProvisisonalDignoTemplateForAutoSummary(r);
			setIVFConfirmedDignosisTemplateForAutoSummary(r);

		}
	});
}

/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment set Provisional IVF Digno Template List
 ******************************************************************************/
function setIvfProvisisonalDignoTemplateForAutoSummary(r) {
	$("#assesmentContentProvisionalDischarge").html("");

	var htm = "";

	var rowCount = 0;

	if (r.getListOfIVFDignosisDTO.length > 0) {

		for ( var i = 0; i < r.getListOfIVFDignosisDTO.length; i++) {
			if (r.getListOfIVFDignosisDTO[i].diagnosisType === "Provisional") {
				rowCount++;

				htm = htm
						+ "<tr class='newStudyIVFDigno' id='count"
						+ (rowCount)
						+ "'>"

						
						+ "<td> <span id='snum" + rowCount + "'>" + rowCount
						+ "</span><input type='hidden' id='ivfDignosisMasterId"
						+ rowCount + "' value="
						+ r.getListOfIVFDignosisDTO[i].dignosisMasterId
						+ "></td>"
						

						+ "<td>" + r.getListOfIVFDignosisDTO[i].diagnosis
						+ " </td> "

						+ "<td>"
						+ r.getListOfIVFDignosisDTO[i].diagnosisDescription
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].iCD10Code
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].date
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].diagnosisType
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].comments
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].comments
						+ " </td> "

						+ "</tr>";
			}

		}
		$("#assesmentContentProvisionalDischarge").append(htm);
	}

}

/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment set Confirm IVF Digno Template List
 ******************************************************************************/
function setIVFConfirmedDignosisTemplateForAutoSummary(r) {
	$("#assesmentContentConfirmaedDischarge").html("");
	var htm1 = "";
	var rowCount1 = 0;
	if (r.getListOfIVFDignosisDTO.length > 0) {

		for ( var i = 0; i < r.getListOfIVFDignosisDTO.length; i++) {
			if (r.getListOfIVFDignosisDTO[i].diagnosisType === "Confirmed") {
				rowCount1++;

				htm1 = htm1
						+ "<tr class='newStudyIVFDignoConfirm' id='count"
						+ (rowCount1)
						+ "'>"

					

						+ "<td> <span id='snum"
						+ rowCount1
						+ "'>"
						+ rowCount1
						+ "</span><input type='hidden' id='ivfDignosisMasterIdConfirm"
						+ rowCount1 + "' value="
						+ r.getListOfIVFDignosisDTO[i].dignosisMasterId
						+ "></td>"

						+ "<td>" + r.getListOfIVFDignosisDTO[i].diagnosis
						+ " </td> "

						+ "<td>"
						+ r.getListOfIVFDignosisDTO[i].diagnosisDescription
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].iCD10Code
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].date
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].diagnosisType
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].comments
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].comments
						+ " </td> "

						+ "</tr>";

			}
		}
		$("#assesmentContentConfirmaedDischarge").append(htm1);

	}
}
function getPriscriptionDetailsForAutoSummary(){
	getUnitTypeListForIvfAutoSummary();
	getPreperationsListForIvfAutoSummary();
	getAllPresInstructionsForIvfAutoSummary();
	fetchRouteTypeListForAutoSummary();
	fetchIvfPrescriptionDataForIVFAutoSummary();
}

function getUnitTypeListForIvfAutoSummary() {
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/getUnitTypeListForIvfDoctorRound",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			 alert("errorr..........");
		},
		success : function(r) {  
		
			
			var unitlistTemp = "";   
			unitlistTemp = unitlistTemp
					+ "<option value='0'>--Select --</option>";
			
			for (var i = 0; i < r.routeList.length; i++) {  
				
				unitlistTemp = unitlistTemp + "<option value="
						+ r.routeList[i].routeId + " ' data-name=" + r.routeList[i].route_name + "'>"
						+  r.routeList[i].route_name + "</option>";
			}
			$('#unit').html(unitlistTemp);
					
		}
	});	
	
}

function getPreperationsListForIvfAutoSummary() { 
	 
		var inputs = [];
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/ivfDoctorRound/getPreperationsListForIvfDoctorRound",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				 alert("errorr..........");
			},
			success : function(r) {  
			
				var unitlistTemp = "";   
				unitlistTemp = unitlistTemp
						+ "<option value='0'>--Select --</option>";
				
				for (var i = 0; i < r.routeList.length; i++) {  
					
					unitlistTemp = unitlistTemp + "<option value="
							+ r.routeList[i].routeId + " ' data-name=" + r.routeList[i].prep + "'>"
							+  r.routeList[i].prep + "</option>";
				}
				$('#prep').html(unitlistTemp);
						
			}
		});		
 }

function getAllPresInstructionsForIvfAutoSummary() {
	
	
	var inputs = [];
	inputs.push('unitId=' + $('#unitId').val());
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/prescriptionController/getIntsructionsForPrescriptions",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			var list = "";  
			list = list + "<option value='0'> -SELECT- </option>";
			
		    for ( var i = 0; i < r.listPrescriptionInstructionDto.length; i++) {  

		        list = list + "<option value='"+r.listPrescriptionInstructionDto[i].id+"' class='un'>" + (r.listPrescriptionInstructionDto[i].englishInstruction) + " / " + (r.listPrescriptionInstructionDto[i].hindiInstruction)+ " / " + (r.listPrescriptionInstructionDto[i].marathiInstruction) +"</option>";    
		    }  
		    
		    $("#instruction").html(list);
		   // $("#instructionDoc").html(list); //
			
		}
	});
}

 /* new Auto Suggestion Prescription */
function setPrescriptionAutocompleteNameIDForAutoSummary(id) {
	
	

	
	var prep = ($("#prep").val()).trim();
	var findingName = $("#" + id).val();
	
	var letter = findingName;
	
	
	
	
	
	var parameterFetchMedicine = "NORMAL";
	if ($("#paediatricsDocCheckBox").prop("checked")){
		parameterFetchMedicine = "PAEDIA_DOC_CHECKBOX";
		
		getPaediatricsMedicine(id, prep, letter);
		
		return;
		
	}
		

	
	var inputs = [];
	

	inputs.push('prep=' + prep);
	inputs.push('letter=' + letter);
	
	var str = inputs.join('&');
	

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/prescriptionController/autoSuggestMedicinelist",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var resultData = [];
						var template = "";
						
						for ( var j = 0; j < r.lstprod.length; j++) {
							
							var arrValue = r.lstprod[j].productId +"-"+r.lstprod[j].productName;
							var idValue = r.lstprod[j].productId;
							var productName = r.lstprod[j].productName;
							
							resultData.push({
								ID : idValue,
								Name : productName
							});
							template = template + '<li data-value="' + idValue
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';
						}
						
				
					setTimeout(function() {
						
						$("div#divTagname .typeahead").html(template);
						$("div#divTagname .typeahead").show();
				
						$("input#" + id).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("input#" + id).data('typeahead').source = resultData;
					}, 500);
					
			
		}
	});
	
	function displayResult(item) {
		
		var res = item.text.split('-');
		
		var medicineId = res[0];
		var medicineName = res[1];
		
		$("#" + id).val(res[1]);
		
		setMedicineDetails(medicineId);
	
	}
}


function setMedicineDetails(medicineId){
	
	
	if(medicineId !=undefined && medicineId!=null && medicineId!="" && medicineId!="null"){
		
		var inputs = [];
		inputs.push('productId=' + medicineId);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/prescriptionController/getMedicineById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				
					
					$("#medicineID").val(r.productId);
					$("#name").val(r.productName);
					$("#prep").val(r.preparationMaster.preparationId);
					$("#strength").val(r.strengthMaster.strengthName);
					$("#unit").val(r.uomMaster.uomId);
				
					
				
			}
		});
	}
}


function fetchRouteTypeListForAutoSummary(pageType) {
	
	var unitID = $("#unitId").val();
	
	var inputs = [];
	inputs.push('unitId=' + unitID);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/prescriptionController/getAllRoutesForPrescription",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var list = "";  
			list = list + "<option value='0'> -SELECT- </option>";
			
		    for ( var i = 0; i < r.listroutemasters.length; i++) {  

		        list = list + "<option value='"+r.listroutemasters[i].route_id+"' class='un'>" + (r.listroutemasters[i].routename) + "</option>";    
		    }  
		    
		    $("#route").html(list);
		  //  $("#routeDoc").html(list);
		}
	});
}



function calculateQuantity(){
	var frequency=$("#frequency").val();
	var days=$("#days").val();
	var total=0;
	if(frequency > 0){
		total=days*frequency; 
	}else{
		total=days;
	}
	$("#qty").val(total);
}

function setFrequency(){
	var frequency = 0;
	var count =0;
	//mo an ev nt
	if(document.getElementById('mo').checked){
		count++;
		$("#tmo").removeAttr("readonly");
		$("#timeMorn").removeAttr("disabled");
		//$("#timeMorn").removeAttr("readonly");
		
	}else{
		$("#tmo").attr('readonly', 'readonly');
		$("#timeMorn").attr('disabled', 'disabled');
		$("#tmo").val(1);
	}
	if(document.getElementById('an').checked){
		count++;
		$("#tan").removeAttr("readonly");
		$("#timeAfter").removeAttr("disabled");

	}else{
		$("#tan").attr('readonly', 'readonly');
		$("#timeAfter").attr('disabled', 'disabled');
		$("#tan").val(1);
	}
	if(document.getElementById('ev').checked){
		count++;
		$("#tev").removeAttr("readonly");
		$("#timeEven").removeAttr("disabled");

	}else{
		$("#tev").attr('readonly', 'readonly');
		$("#timeEven").attr('disabled', 'disabled');
		$("#tev").val(1);
	}
	if(document.getElementById('nt').checked){
		count++;
		$("#tnt").removeAttr("readonly");
		$("#timeNight").removeAttr("disabled");

	}else{
		$("#tnt").attr('readonly', 'readonly');
		$("#timeNight").attr('disabled', 'disabled');
		$("#tnt").val(1);
	}
	frequency = count;
	$("#frequency").val(frequency);
	calculateQuantity();
}

function savePrescriptionIvfAutoSummary() {

	
	var prescriptionId = $("#prescriptionIdHidden").val(); 
	var treatmentId = $("#tr_Id").val();
	var ivf_treatmentId = $("#ivf_tr_Id").val();
	var patientId = $("#patientId").html();
	 
	var date = $("#date-pick").val(); 
	
	var userId = $("#userId").val();
    var unitId = $("#unitId").val();
	
	var preparation = $("#prep").val();
	var prepName = $("#prep option:selected").text();
	//var preparation = $("#preparation").val();
	
	var medicineId = $("#name").val();	
	var strength = $("#strength").val();	
	var doseType = $("#doseP").val();	
	var unit = $("#unit").val();
	
	var morning = "";
	var afternoon = "";
	var evening ="" ;
	var night ="" ;
	
	if ($("#mo").prop('checked')) {
		 morning = $("#mo").val();
	}else
		{
		 morning=""; 
		}
	
	if ($("#an").prop('checked')) {
		afternoon = $("#an").val();
	}else
		{
		afternoon=""; 
		}
	
	if ($("#ev").prop('checked')) {   
		evening = $("#ev").val();
	}else
		{
		evening=""; 
		}
	
	if ($("#nt").prop('checked')) {
		night = $("#nt").val();
	}else
		{
		night=""; 
		}
	
	
	var frequency = $("#frequency").val();
	var instruction = $("#instruction").val();	
	var instructionName = $("#instruction option:selected").text();
	
	var route = $("#route").val();
	var days = $("#days").val();
	var quantity = $("#qty").val();	
	
			if (medicineId == "0" || medicineId == "undefined" || medicineId == "") {
				alert("Please enter proper medicine name");
				SetFocus("name");
				return false;
			}
			if (prepName == "") {
				alert("Please enter proper medicine name");
				$("#medicineID").val("0");
				SetFocus("name");
				return false;
			}
		//}
	
	if (instruction == "0") {
		
		instructionName='';
	}
	if (frequency == "0" || frequency == "undefined" || frequency == "") {
		alert("Please check at least one Time Slot for Frequency..!");
		SetFocus("mo");
		return false;
	}

	if (days == "") {
		alert("Please Enter days...");
		SetFocus("days");
		return false;
	}
	if (quantity == "") {
		alert("Please Select Quantity...");
		SetFocus("qty");
		return false;
	}
	
	var inputs = [];
	inputs.push('prescriptionId=' + prescriptionId);

	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('preparation=' + preparation); 
	inputs.push('prepName=' + prepName); 
    inputs.push('medicineId=' + medicineId);
	inputs.push('strength=' + strength);	
	inputs.push('doseType=' + doseType);
	inputs.push('unit=' + unit);
	inputs.push('morning=' + morning);  
    inputs.push('afternoon=' + afternoon);
	inputs.push('evening=' + evening);	
	inputs.push('night=' + night);
	inputs.push('frequency=' + frequency);
	inputs.push('instruction=' + instruction);
	inputs.push('instructionName=' + instructionName);
    inputs.push('route=' + route);
	inputs.push('days=' + days);	
	inputs.push('quantity=' + quantity);
	inputs.push('date=' + date);
	inputs.push('createdBy=' + userId);
	inputs.push('saveFrom=' + "AutoSummary");
	inputs.push('ivf_treatmentId=' + ivf_treatmentId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/saveIvfPrescriptionInfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else if (r == 2) {
				alert("Record Updated Successfully");
			} else {
				alert("Network Issue..");
			}
			//temForIvfPrescription();
			setTemForIvfPrescriptionForIVFAutoSummary()
			//fetchIvfPrescriptionData(); 
			fetchIvfPrescriptionDataForIVFAutoSummary();
			
		}
	});		

}

function setTemForIvfPrescriptionForIVFAutoSummary() {
	
	$("#prep").val("0");
	$("#name").val('');
	$("#prep").attr("disabled", false);
	$("#name").attr("disabled", false);     
	$("#strength").val('');
	$("#doseP").val('');
	$("#unit").val('0');
	$("#frequency").val('');
	$("#instruction").val('0');
	$("#route").html('<option value="0">SELECT</option>');
	$("#route").val('0');
	$("#days").val('');
	$("#qty").val('');
	$("#medicineID").val('0');        
	
	//Unchecking time slot 
	$("#mo").prop('checked', false);
	$("#an").prop('checked', false);
	$("#ev").prop('checked', false);
	$("#nt").prop('checked', false);	
	
}

/*function fetchIvfPrescriptionDataForIVFAutoSummary() {
	
	var treatmentId = $("#ivf_tr_Id").val();
	var date = $("#date-pick").val();
	
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	inputs.push('date=' + date);
	inputs.push('callFrom=' + "AutoSummary");

	var str = inputs.join('&');
	
	jQuery
	.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfDoctorRound/fetchPrescriptionByDate",

		error : function() {
			alert('Network Issue.......................!!!');
		},

		success : function(r) {
			
         //alert('Success fetch'+JSON.stringify(r))
			$("#prescriptionTempBody").html("");
			var htm = "";
			var rowCount = 0;

			if (r.ivfPrescriptionList.length > 0) {
				
				for (var i = 0; i < r.ivfPrescriptionList.length; i++) {  
					rowCount++;

					htm = htm
							+ "<tr  class='newPrescriptionRow' id='count"
							+ (rowCount)
							+ "'>"

							+ "<td> <span id='snum"
							+ rowCount
							+ "'>"
							+ rowCount
							+ "</span><input type='hidden' id='prescriptionIdHidden"
							+ rowCount
							+ "' value="
							+ r.ivfPrescriptionList[i].prescriptionId
							+ "></td>"

							+ "<td  >"
							+ r.ivfPrescriptionList[i].medicineId
							+ "</td>"

							+ "<td>"
							+ r.ivfPrescriptionList[i].prepName
							+ "</td>"
							
							+ "<td>"
							+ r.ivfPrescriptionList[i].instructionName
							+ "</td>"

							+ "<td>"
							+ r.ivfPrescriptionList[i].days
							+ "</td>"
																
							+ "<td ><input type='checkbox'   class='chkgyno'  value='"
							+ rowCount
							+ "'"
							+ " name='prescrptiodocid'   isNew='false' id="
							+ r.ivfPrescriptionList[i].prescriptionId
							+ "></td>"
							+ "</tr>";
	
				}
				$("#prescriptionTempBody").append(htm);
			}

		}
	});

}
*/

function fetchIvfPrescriptionDataForIVFAutoSummary() {
	
	var treatmentId = $("#ivf_tr_Id").val();

	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	inputs.push('callFrom=' + "AutoSummary");

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ivfDoctorRound/fetchIvfPrescriptionData",

				error : function() {
					alert('Network Issue.......................!!!');
				},

				success : function(r) {
					
					$("#prescriptionTempBody").html("");
					var htm = "";
					var rowCount = 0;

					if (r.ivfPrescriptionList.length > 0) {
						
						for (var i = 0; i < r.ivfPrescriptionList.length; i++) {  
							rowCount++;

							htm = htm
									+ "<tr  class='newPrescriptionRow' id='count"
									+ (rowCount)
									+ "'>"

									+ "<td> <span id='snum"
									+ rowCount
									+ "'>"
									+ rowCount
									+ "</span><input type='hidden' id='prescriptionIdHidden"
									+ rowCount
									+ "' value="
									+ r.ivfPrescriptionList[i].prescriptionId
									+ "></td>"

									+ "<td  >"
									+ r.ivfPrescriptionList[i].medicineId
									+ "</td>"

									+ "<td>"
									+ r.ivfPrescriptionList[i].prepName
									+ "</td>"
									
									+ "<td>"
									+ r.ivfPrescriptionList[i].instructionName
									+ "</td>"

									+ "<td>"
									+ r.ivfPrescriptionList[i].days
									+ "</td>"
																		
									+ "<td ><input type='checkbox'   class='chkgyno'  value='"
									+ rowCount
									+ "'"
									+ " name='prescrptiodocid'   isNew='false' id="
									+ r.ivfPrescriptionList[i].prescriptionId
									+ "></td>"
									+ "</tr>";
			
						}
						$("#prescriptionTempBody").append(htm);
					}

				}
			});
	
}


function editPrescriptoinDatataForAutoSummary() {
	
	var docId = new Array();
	var userId = parseInt($("#userId").val());

	$("input[name='prescrptiodocid']:checked").each(function() {
         
		var presId = $("#prescriptionIdHidden" + $(this).val()).val();
		
		if (presId > 0) {

			docId.push($("#prescriptionIdHidden" + $(this).val()).val());      //prescriptionIdHidden
		}
	});
	
	if ((docId.length) == 0) {
		alert("Please check the checkbox to edit...");
		return false;
	}

	if ((docId.length) != 1) {
		alert("Please Select Single Checkbox...");
		return false;
	}
	
	var inputs = [];
	inputs.push('prescriptionId=' + docId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ivfDoctorRound/editIvfPrescriptionData",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {    
			
			//alert('aaaaaaaaaaaa......'+JSON.stringify(r));		
			$("#prescriptionIdHidden").val(r.prescriptionId);
			$("#name").val(r.medicineId);
			
	        $("#prep").val(r.preparation);
			$("#instruction").val(r.instruction);		
			$("#strength").val(r.strength);
			$("#route").val(r.route);
			$("#frequency").val(r.frequency);
			$("#doseP").val(r.doseType);
			$("#unit").val(r.unit);		
			$("#days").val(r.days);			
			
			$("#qty").val(r.quantity);
			
			$("#route").val(r.route);	
			
			$("#date-pick").val(r.date);	
			
			if (r.morning == "Morning") {
				$("#mo").prop('checked', true);
			}else
				{
				$("#mo").prop('checked', false);
				}
			
			if (r.afternoon == "Afternoon") {
				$("#an").prop('checked', true);
			}else
				{
				$("#an").prop('checked', false);
				}
			
			if (r.evening == "Evening") {
				$("#ev").prop('checked', true);
			}else
				{
				$("#ev").prop('checked', false);
				}
			if (r.night == "Night") {
				$("#nt").prop('checked', true);
			}else
				{
				$("#nt").prop('checked', false);
				}
			
		}
	});
}

function deleteIvfPrescriptionDataForAutoSummary() {
	
	
	var docId = new Array();
	var userId = parseInt($("#userId").val());

	$("input[name='prescrptiodocid']:checked").each(function() {
         
		var presId = $("#prescriptionIdHidden" + $(this).val()).val();
		
		if (presId > 0) {

			docId.push($("#prescriptionIdHidden" + $(this).val()).val());    
		}
	});

	
	if(docId.length== 0){
		alert("Please Select At One Check Box To Delete Record...");
		return false;
	}
	if (docId.length > 0) {

		var inputs = [];
		inputs.push('prescriptionIdRow=' + docId);
		inputs.push('userId=' + userId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/ivfDoctorRound/deleteIvfPrescriptionRow",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error.................');
			},
			success : function(response) {
              alert(response)
               
              fetchIvfPrescriptionDataForIVFAutoSummary();
				
				
			}
		});
	} 
}

function printIVFAutoSummaryTreatMentAtDischarge(){
	var patientId =$("#patientId").text();
	var treatmentId =$("#tr_Id").val();
	var ivf_tr_Id =$("#ivf_tr_Id").val();
	
	
	var depdocdeskid = 1;
	var unitId = $.trim($('#unitId').val());
	
	var pageSize = "standard"; 
	
	window.open(("ivf_autosummary_treatmentatdischarge_print.jsp?pid=" +"&patientId="+patientId+"&treatmentId="+treatmentId+"&callfrom="+"printHF"+"&depdocdeskid="+depdocdeskid+"&unitId="+unitId +"&IVFTreatmentId="+ivf_tr_Id));
}

function getPriscriptionDataFromDoctorstation(){
	var treatmentId = $("#ivf_tr_Id").val();

	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	inputs.push('callFrom=' + "doctorstation");

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ivfDoctorRound/fetchIvfPrescriptionData",

				error : function() {
					alert('Network Issue.......................!!!');
				},

				success : function(r) {
					
					$("#ivfdoctorstationprescriptionTempBody").html("");
					var htm = "";
					var rowCount = 0;

					if (r.ivfPrescriptionList.length > 0) {
						
						for (var i = 0; i < r.ivfPrescriptionList.length; i++) {  
							rowCount++;

							htm = htm
									+ "<tr  class='newPrescriptionRow' id='count"
									+ (rowCount)
									+ "'>"

									+ "<td> <span id='snum"
									+ rowCount
									+ "'>"
									+ rowCount
									+ "</span><input type='hidden' id='prescriptionIdHidden"
									+ rowCount
									+ "' value="
									+ r.ivfPrescriptionList[i].prescriptionId
									+ "></td>"

									+ "<td  >"
									+ r.ivfPrescriptionList[i].medicineId
									+ "</td>"

									+ "<td>"
									+ r.ivfPrescriptionList[i].prepName
									+ "</td>"
									
									+ "<td>"
									+ r.ivfPrescriptionList[i].instructionName
									+ "</td>"

									+ "<td>"
									+ r.ivfPrescriptionList[i].days
									+ "</td>"
																		
									
									+ "</tr>";
			
						}
						$("#ivfdoctorstationprescriptionTempBody").append(htm);
					}

				}
			});
}

function getIVFSeviceAdvicetestDeatils(){
	
var tID  = $("#treatmentId").val(); 
	
	
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		tID = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		tID = $("#treatmentId").val();
	}
	
    var servid=0;
	if(tID==0){
		
	//	return false;
		
	}
	
	
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "GET",
		url 	: "ehat/ivfdoctordesk/fetchbilldetails",
		data	: {
			"tID"        : $("#tr_Id").val(),
			"callform"   :callform,
			"servid"      :servid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			$("#ivfinvestigationBody").html("");
			var htm = "";
			var rowCount = 0;

			if (r.cpoeServdetails.length > 0) {
				
				for (var i = 0; i < r.cpoeServdetails.length; i++) {  
					rowCount++;

					htm = htm
							+ "<tr  class='newPrescriptionRow' id='count"
							+ (rowCount)
							+ "'>"

							+ "<td> <span id='snum"
							+ rowCount
							+ "'>"
							+ rowCount
							+ "</span></td>"

							+ "<td  >"
							+ r.cpoeServdetails[i].categoryName
							+ "</td>"

							+ "<td>"
							+ r.cpoeServdetails[i].created_date_time
							+ "</td>"
							
							+ "<td>"
							+ r.cpoeServdetails[i].servicename
							+ "</td>"
             		+ "</tr>";
	
				}
				$("#ivfinvestigationBody").append(htm);
			}

		}
		
	});
	
}

function fetchIvfOperationsData(){
	var pid = $("#patientId").text();
	var tid = $("#treatmentId").text();
	
	var inputs = [];
	
	inputs.push('pid='+ pid);
	inputs.push('tid='+ tid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ivfDoctorRound/fetchIvfOperationsData",
		data : str + "&reqType=AJAX",
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			
			var OprnName ="";
			var tomId = 0;
			//var pobj1 =JSON.parse(ajaxResponse.decodeSpecialChars());
		
			for(var i = 0; i < ajaxResponse.listtreatmentoperation.length; i++){
				if(ajaxResponse.listtreatmentoperation[i].operName != "" || ajaxResponse.listtreatmentoperation[i].operName != null){
					OprnName = ajaxResponse.listtreatmentoperation[i].operName; 
					tomId= ajaxResponse.listtreatmentoperation[i].iD;
				}
				$("#ivftomId").val(tomId);
				SelOperationDataTemplate(r);
			}
			
		}
	});
}

function SelOperationDataTemplate(r)
{
	var ajaxResponse = r;
	
	var divContent = "";
	divContent = divContent
			+ "<select name='Operation Name'  class='col-md-12' >";
	for ( var i = 0; i < r.listtreatmentoperation.length; i++) 
	{
		divContent=divContent+'<option  value="'+(r.listtreatmentoperation[i].iD)+'" id="'+(r.listtreatmentoperation[i].iD)+'" data-name="'+r.listtreatmentoperation[i].operName+'">'+(r.listtreatmentoperation[i].operName)+'</option>';
	}
	divContent = divContent + "</select>";
	$("#idIvfSelOperationData").html(divContent);
}

function fetchIvfOTNotesData(){

	
		var ivf_tr_Id=$("#ivf_tr_Id").val();
	
			
		var inputs = [];
		inputs.push('ivftreatmentId=' + ivf_tr_Id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/ivfdoctordesk/getIvfOTNotes",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {

			},
			success : function(r) {
		
				if (r == "" || r== undefined || r== null || r== "null") {
					$("#otNotesMasterId").val(0);

				} else {
					
					$("#otNotesMasterId").val(r.id);
					$("#iEBLoss").val(r.estimatedBloodLoss);
					$("#iABLoss").val(r.actualBloodLoss);
					$("#iICount").val(r.instrumentalCount);
					$("#iRecBy").val(r.recordedBy);
					$("#iMOPCount").val(r.mOPCountRecordedBy);
					$("#iOTNotesComment").val(r.comment);
					$("#selIvfCustomizeTemp").val(r.templateId);
					$("#editor1").val(r.otNotesDescription);
					CKEDITOR.instances['editor1'].setData(r.otNotesDescription);
					
				}
			}
		});
	}


function fetchIvfCustomizeTemplateList(){
	
	 var callFrom = "onload";
	 var templateId = "0";
		
	   var inputs = [];
	   inputs.push('templateId=' + templateId); 
	   inputs.push('callFrom=' + callFrom); 
	  
	   var str = inputs.join('&');
	   jQuery.ajax({
	       async 	: true,
	       type 	: "POST",
	       data 	: str + "&reqType=AJAX",
	
		url : "ehat/ivfDoctorRound/fetchIvfCustomizeTemplateList",
		error : function() {
			 alert('error');
		  },
     success : function(r) {
			ajaxResponse = r;
			
			$("#IvfCustomizeTemplateDiv").html(encodeURIComponent(ajaxResponse));
			setCustTemplateList(r);
		}
	});

}

function setCustTemplateList(r){
	
	var list="<option value=''>--Select--</option>";
	for ( var i = 0; i < r.lts.length; i++) {

		list=list+'<option onclick="setIvfCustomizeTemplate('+r.lts[i].idCustomizeTemplate+')" value="'+(r.lts[i].idCustomizeTemplate)+'">'+(r.lts[i].temp_name)+'</option>';	
	}
	$("#selIvfCustomizeTemp").html(list);
}


function setIvfNewCustomizeTemp() {
	$("#queryType").val("insert");
	$("#updateTempId").val("0");
	$("#selCustomizeTempType").val("Select");
	$("#selDocSpec").val("");
	$("#customizeTemplateName").val("");
	
	CKEDITOR.instances['editor1'].setData("");
	CKEDITOR.instances['editorSubjective'].setData("");
	CKEDITOR.instances['editorObjective'].setData("");
}

function setIvfCustomizeTemplate(templateId) {
	$("#queryType").val("update");
	$('#ipdFlag').attr("checked", false);
	$('#opdFlag').attr("checked", false);
	
   var callFrom = "byTempId";
	
   var inputs = [];
   inputs.push('templateId=' + templateId); 
   inputs.push('callFrom=' + callFrom); 
  
   var str = inputs.join('&');
   jQuery.ajax({
       async 	: true,
       type 	: "POST",
       data 	: str + "&reqType=AJAX",
       url 	: "ehat/ivfDoctorRound/fetchIvfCustomizeTemplateList",
       cache 	: true,
       success : function(r) {
    	  
    	 if(callFrom == "byTempId"){
    	  // var hisType = r.hitoryType;
    		if (r.type == "h") {
    			$('#tempHistDiv').show();
    			$('#move').hide();
    			$('#historyTemp').show();
    			$("#selCustomizeTempType").val(r.lts[0].type);
    			$("#updateTempId").val(templateId);
    			$("#customizeTemplateName").val(r.lts[0].temp_name);
    			$("#selDocSpec").val(r.lts[0].specializaion);
    			// $("#selCustomizeTempSubType").val(myObj.hitoryType);
    			CKEDITOR.instances['editorSubjective'].setData(r.lts[0].temp_data);
    			CKEDITOR.instances['editorObjective'].setData(r.lts[0].objectiveTempData);
    		} else {
    			$('#tempHistDiv').hide();
    			$('#historyTemp').hide();
    			$('#move').show();
    			$("#selCustomizeTempType").val(r.lts[0].type);
    			$("#updateTempId").val(templateId);
    			$("#customizeTemplateName").val(r.lts[0].temp_name);
    			CKEDITOR.instances['editor1'].setData(r.lts[0].temp_data);
    		}
    	  }
    		var flag = r.lts[0].ipd_opd_flag;
    		if (flag == "ipd#opd") {
    			$('#ipdFlag').attr("checked", true);
    			$('#opdFlag').attr("checked", true);
    		} else if (flag == "ipd") {
    			$('#ipdFlag').attr("checked", true);
    		} else if (flag == "opd") {
    			$('#opdFlag').attr("checked", true);
    		}
    	}
   });
}
	

function saveIvfOTNotesData(){
	
	var otNotesMasterId = $("#otNotesMasterId").val();
	
	var patientId =$("#patientId").text();
	var treatmentId =$("#tr_Id").val();
	var ivf_tr_Id =$("#ivf_tr_Id").val();
	
	var operationId = $("#idIvfSelOperationData").val();
	
	var operatinName = $("#idIvfSelOperationData").text();
	
	var chkEditerdata = "";
	
	
	
	var estimatedBLoodLoss = $("#iEBLoss").val();
	var actualBloodLoss = $("#iABLoss").val();
	var instrumentCount = $("#iICount").val();
	var recordedBy = $("#iRecBy").val();
	var mopCountRecordedBy = $("#iMOPCount").val();
	var comment = $("#iOTNotesComment").val();
	var templateID = $('#selIvfCustomizeTemp').val();
	
	//var templateName = $('#selIvfCustomizeTemp').text();
	var templateName=$("#selIvfCustomizeTemp option:selected").text();
	
	chkEditerdata = CKEDITOR.instances['editor1'].getData();
	
	
	
	
	
	var reg = /^[0-9]+$/;
	if (estimatedBLoodLoss != "" && !reg.test(estimatedBLoodLoss)) {
		alert("Estimated Blood Loss should be in number!");
		$('#iEBLoss').val("");
		return false;
	}
	if (estimatedBLoodLoss == "" || estimatedBLoodLoss == undefined) {
		estimatedBLoodLoss = "0";
	}
	if (instrumentCount != "" && !reg.test(instrumentCount)) {
		alert("Instrumental Count should be in number!");
		$('#iICount').val("");
		return false;
	}
	if (instrumentCount == "" || instrumentCount == undefined) {
		instrumentCount = "0";
	}
	if (recordedBy == "" || recordedBy == undefined) {
		recordedBy = "-";
	}
	if (mopCountRecordedBy == "" || mopCountRecordedBy == undefined) {
		mopCountRecordedBy = "-";
	}
	if (comment == "" || comment == undefined) {
		comment = "-";
	}

	
	
	var inputs = [];
	inputs.push('id=' + otNotesMasterId);
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('ivftreatmentId=' + ivf_tr_Id);
	inputs.push('operationId=' + operationId);
	inputs.push('operatinName=' + operatinName);
	inputs.push('estimatedBloodLoss=' + estimatedBLoodLoss);
	inputs.push('actualBloodLoss=' + actualBloodLoss);
	inputs.push('instrumentalCount=' + instrumentCount);
	inputs.push('recordedBy=' + recordedBy);
	inputs.push('mOPCountRecordedBy=' + mopCountRecordedBy);
	inputs.push('Comment=' + comment);
	inputs.push('templateId=' + templateID);
	inputs.push('templateName=' + templateName);
	
	inputs.push('otNotesDescription=' + encodeURIComponent(chkEditerdata));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str,
		url :  "ehat/ivfdoctordesk/saveIvfAutoSummaryOTNotes",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
		},
		success : function(r) {
			
            if (r == 1) {
				alert("OT Notes Save Successfully...");
				fetchIvfOTNotesData();
			} else {
				alert("Network Issue...");
			}
			

		}
	});
}


function saveAutoIvfDischargeSummery(){
	
	var id = $("#autoMasterId").val(); 
	var treatmentId = $("#tr_Id").val();
	var ivftreatmentId = $("#ivf_tr_Id").val();
	var patientId = $("#patientId").html();
	var patientName = $("#patientName").html();
	var patient_gender = $("#sex").html();
	var patient_age = $("#age").html();
	var userId = $("#userId").val();
    var unitId = $("#unitId").val();
    var createdBy = $("#userId").val();
    
    var ivfDischargeDate = $("#ivf_discharge_date").val();
    var ivfDischargeTime = $("#ivf_discharge_Time").val();
    var ivfDischargeType = $("#discharge_Type").val();
   // var admissionNote = $("#adNotee").val();
    var riskFactor = $("#riskfactor").val();
    var complications = $("#complications").val();
    var treatmentGiven = $("#treatmentgiven").val();
    var specialInvestigation = $("#specialinvestigation").val();
    var conditionAtDischarge = $("#conditionondischargeivf").val();
    var adviceAtDischarge = $("#adivisedondischarge").val();
    var admissionNote  = CKEDITOR.instances['adNote'].getData();
    
    
    var inputs = [];
	inputs.push('id=' + id);
	inputs.push('patientId=' + patientId);
	inputs.push('ivftreatmentId=' + ivftreatmentId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientName=' + patientName);
	inputs.push('patient_age=' + patient_age);
	inputs.push('patient_gender=' + patient_gender);
	inputs.push('ivfDischargeDate=' + ivfDischargeDate);
	inputs.push('ivfDischargeTime=' + ivfDischargeTime);
	inputs.push('ivfDischargeType=' + ivfDischargeType);
	inputs.push('admissionNote=' + admissionNote);
	inputs.push('riskFactor=' + riskFactor);
	inputs.push('complications=' + complications);
	inputs.push('treatmentGiven=' + treatmentGiven);
	inputs.push('specialInvestigation=' + specialInvestigation);
	inputs.push('conditionAtDischarge=' + conditionAtDischarge);
	inputs.push('adviceAtDischarge=' + adviceAtDischarge);
	inputs.push('createdBy=' + createdBy);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdoctordesk/saveAutoIvfDischargeSummery",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else if (r == 2) {
				alert("Record Updated Successfully");
			} else {
				alert("Network Issue..");
			}
			
			getIvfAutoSummary()
			
			
			
		}
	});		
	
}

function getIvfAutoSummary(){
	var ivftreatmentId = $("#ivf_tr_Id").val();
	
	var inputs = [];
	inputs.push("ivftreatmentId=" +ivftreatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/getIvfAutoSummary",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			if(r==""){
				$("#autoMasterId").val(0); 
			}else{
				$("#autoMasterId").val(r.id); 
				  $("#ivf_discharge_date").val(r.ivfDischargeDate);
				   $("#ivf_discharge_Time").val(r.ivfDischargeTime);
				    $("#discharge_Type").val(r.ivfDischargeType);
				 //$("#adNote").val(r.admissionNote);
				    $("#riskfactor").val(r.riskFactor);
				    $("#complications").val(r.complications);
				  $("#treatmentgiven").val(r.treatmentGiven);
				    $("#specialinvestigation").val(r.specialInvestigation);
			 $("#conditionondischargeivf").val(r.conditionAtDischarge);
			 $("#adivisedondischarge").val(r.adviceAtDischarge);
			 
			
			 $("#adNote").val(r.admissionNote);
			 //CKEDITOR.instances['adNote'].setData(r.admissionNote);
				    
			}
			
		}
	});
}

function getIvfPreviousAutoSummaryList(){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/getIvfPreviousAutoSummaryList",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setPreviousAutoSummaryTemplate(r);		
		}
	});
}

function setPreviousAutoSummaryTemplate(r){
	
	var index = 1;	
	for ( var i = 0; i < r.getListIVFRegPatientDTO.length;i++) {
		
		var patId=  r.getListIVFRegPatientDTO[i].patientId 
		
		
		var datetime= new Date(r.getListIVFRegPatientDTO[i].createdate).toLocaleString(); 		
		var htm = htm
			+ "<tr id='div123"+ r.getListIVFRegPatientDTO[i].patientIdd+"'>"
			+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
			+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.getListIVFRegPatientDTO[i].patientName+"</td>"
			+ "<td style='height: 21.5px;' class='col-md-2 center'>"+ r.getListIVFRegPatientDTO[i].mobile+"</td>"

			
			+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.getListIVFRegPatientDTO[i].center_patient_id +"</td>"

			+ "<td style='height: 21.5px;' class='col-md-2 center'>"+datetime+"</td>"
			
			
			
			
			/*+'<td>'
			+'<div class="text-left">'
			+'	<div class="panel-group" id="accordion">'
				+'	<div class="panel">'
				+'	<div class="panel-heading">'
				+'		<h3 class="panel-title">'
				+'			<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"  onclick="getIvfTreatmentListByPatientId('+r.getListIVFRegPatientDTO[i].patientId+','+i+')"  href="#collapseCghsTwo'+i+'">'
				+'				<div class="row">'
				+'							<center>'
				+'								<i class="fa fa-chevron-down"></i>'
				+'							</center>'
				+'						</div>'
				+'					</a>'
				+'				</h3>'
				+'			</div>'
				+'			<div id="collapseCghsTwo'+i+'" class="panel-collapse collapse" style="height: auto;">'
				+'				<div class="panel-body">'
				+'					<table class="table table-hover" style="width: 450px">'
				+'						<thead>'
				+'							<tr>'
				+'								<th>Sr No</th>'
				+'								<th>Created Date</th>'
				+'								<th>Treatment Id</th>'
				+'								<th>view</th>'
				+'							</tr>'
				+'						</thead>'
				+'						<tbody id="ivfPreviousAutoTreatmentList"'+i+'>'
				
				+'						</tbody >'
				+'					</table>'
				+'				</div>'
				+'			</div>'
				+'		</div>'
				+'	</div>'
				+'		</div>'
				+'	</td>'
								+"</tr>";*/
			
			+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreAutoSummary("+ r.getListIVFRegPatientDTO[i].patientId+")'>"
			+ "<img src='images/down.png' id='imgupdown"+r.getListIVFRegPatientDTO[i].patientId+"' />"
			+ "<input type='hidden' id='hideShowStatus"+ r.getListIVFRegPatientDTO[i].patientId+"' value='0' /><input type='hidden' id='patientDOB123' value='"+ r.getListIVFRegPatientDTO[i].patientId+"' /></td>"
			+ "</tr>"
			
					+ "<tr id='patPreAutoSummary"+ r.getListIVFRegPatientDTO[i].patientId+"' style='width:0%;float:right'><td style='display:none' id='td123"+ r.getListIVFRegPatientDTO[i].patientId+"'>"
							+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
								+ "<tbody1 id='xyz"+ r.getListIVFRegPatientDTO[i].patientId+"'>"
									+ "<tr>"
									+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
									+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
									+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
									+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
									+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
									+ "</tr>"
								+ "</tbody1>"
							+ "</table>"
						+ "</td></tr>"
						;

	 		index++;
	 
	 }
	$("#ivfPreviousAutosummaryDetails").html(htm);
}
function hideShowPreAutoSummary(count) {

	
	var hideShowStatus = $("#hideShowStatus" + count).val();
	
	if (hideShowStatus == 0) {

		$("#imgupdown" + count).attr('src', "images/up.png");
		$("#patPreAutoSummary" + count).show();
		$("#hideShowStatus" + count).val(1);
		getIvfTreatmentListByPatientId(count);

	} else {
		 
		$("#imgupdown" + count).attr('src', "images/down.png");
		$("#patPreAutoSummary" + count).hide();
		$("#hideShowStatus" + count).val(0);
		

	}
}

function getIvfTreatmentListByPatientId(patientId){
	
	var inputs = [];
	inputs.push("patientId=" +patientId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/getIvfTreatmentListByPatientId",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			setIvfTreatmentListTemplate(r);
			
		}
	});
	
}

function setIvfTreatmentListTemplate(r){
	
	 
	 var htm=" class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
	 + "<td style='height: 21.5px;' class='col-md-2 center' class=''>Treatment Id</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>Created Date</td>"
	 + "<td style='height: 21.5px;' class='col-md-2 ' class=''>view</td>"
	 + "<i class='fa fa-eye View'></i></button></td>> </tr>";
	 
	 for ( var j = 0; j < r.getListIVFRegPatientDTO.length;j++) {
			var datetime= new Date(r.getListIVFRegPatientDTO[j].createdDateTime).toLocaleDateString('en-GB');

		 htm=htm+ "<tr id='div123"+ r.getListIVFRegPatientDTO[j].patientId+"' class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r.getListIVFRegPatientDTO[j].patientId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r.getListIVFRegPatientDTO[j].treatmentId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r.getListIVFRegPatientDTO[j].ivf_treat_id+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-5 ' class=''>"+ datetime+"</td>";
		
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-1 '>";
		 htm=htm+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='viewPreviousIvfDischargeSummary("+ r.getListIVFRegPatientDTO[j].ivf_treat_id+","+r.getListIVFRegPatientDTO[j].treatmentId+")'>";
		 htm=htm+ "<i class='fa fa-eye View'></i></button></td>";
		 htm=htm	+ "<input type='hidden' value='"+ r.getListIVFRegPatientDTO[j].patientId+"' id='rowCount' /></tr>";
		 
		
		 $("#patPreAutoSummary" + r.getListIVFRegPatientDTO[j].patientId).html(htm);
		 $("#td123" +  r.getListIVFRegPatientDTO[j].patientId).show();
		 $("#xyz" +  r.getListIVFRegPatientDTO[j].patientId).html(htm);
		}
	
	 
}

/*function getIvfTreatmentListByPatientId(patientId,count){

	var inputs = [];
	inputs.push("patientId=" +patientId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/getIvfTreatmentListByPatientId",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			alert(patientId);
			alert(count);
			alert(r.getListIVFRegPatientDTO.length);
			var index = 1;	
			for ( var i = 0; i < r.getListIVFRegPatientDTO.length;i++) {
				
				var patId=  r.getListIVFRegPatientDTO[i].patientId 
				
				var datetime= new Date(r.getListIVFRegPatientDTO[i].createdDateTime).toLocaleString(); 		
				var htm = htm
					+ "<tr id='div123"+ r.getListIVFRegPatientDTO[i].patientIdd+"'>"
					+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
					+ "<td style='height: 21.5px;' class='col-md-2 center'>"+datetime+"</td>"
					+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.getListIVFRegPatientDTO[i].ivf_treat_id+"</td>"
					+'<td>'
					+'<button type="button" class="btn btn-xs btn-success" onclick="getMobileTestInfoByAppoId('+r.getListIVFRegPatientDTO[i].ivf_treat_id+')"><i class="fa fa-eye"></i></button>'
					+'</td>'
					
					
					
					+"</tr>";

		 		index++;
		 
		 }
		$("#ivfPreviousAutoTreatmentList"+count).html(htm);
			
		}
	});
}*/

function viewPreviousIvfDischargeSummary(ivftreatmentId,treatmentId){
	//var treatmentId = $("#tr_Id").val();
//		var treatmentId =1;

		window.location.href = "ivf_autosummary.jsp?" + "treatmentId=" + treatmentId + "&ivfTreatmentId=" + ivftreatmentId + "&callfrom=" + "prev";
	}

function hideShowButtons(){
	var ivf_callfrom = $("#ivf_callfrom").val();
	
	
	if(ivf_callfrom === "prev"){
		
		$("#saveIvfDischargeSummeryButton").prop('disabled',true);
		$("#isaveIvfOTNotesData").prop('disabled',true);
		$("#saveIvfPriscription").prop('disabled',true);
		//document.getElementById("saveIvfDischargeSummeryButton").disabled = true;
	}
}

function autoSuggestionForPriviousAuttosummary(inputID){
	var resultData = [];
	var searchText = $("#" + inputID).val();

	if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getIvfQueue();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + searchText);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdoctordesk/autoSuggestionForPriviousAuttosummary",
		cache : false,
		success : function(response) {

			var template = "";
			if( response.getListIVFRegPatientDTO.length == 0){
				alertify.error("Record Not Found.....");
				 $("#" + inputID).val(" ");
				return false;
			}
			for ( var j = 0; j < response.getListIVFRegPatientDTO.length; j++) {
				var arrValue = response.getListIVFRegPatientDTO[j].patientId +"-"+response.getListIVFRegPatientDTO[j].patientName;
				var idValue = response.getListIVFRegPatientDTO[j].patientId;
				var stateName = response.getListIVFRegPatientDTO[j].patientName;
				resultData.push({
					ID : idValue,
					Name : stateName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var patientId = res[0];
		var patientName = res[1];		
		getPatientInfoByPatientId(patientId);
		$("input#" + inputID).val(patientName);
	}
}

function getPatientInfoByPatientId(patientId){
	var inputs = [];
	inputs.push("patientId=" +patientId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/getPatientInfoByPatientId",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			setPreviousAutoSummaryTemplateForAutoSuggestion(r);
			
		}
	});
}

function setPreviousAutoSummaryTemplateForAutoSuggestion(r){
	
	var index = 1;	
	
		
		var patId=  r.patientId 
		
		var datetime= new Date(r.createdDateTime).toLocaleString(); 		
		var htm = htm
			+ "<tr id='div123"+ r.patientIdd+"'>"
			+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
			+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.patientName+"</td>"
			+ "<td style='height: 21.5px;' class='col-md-2 center'>"+ r.mobile+"</td>"

			
			+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.center_patient_id +"</td>"

			+ "<td style='height: 21.5px;' class='col-md-2 center'>"+r.createdate+"</td>"
			
			
			
			
			/*+'<td>'
			+'<div class="text-left">'
			+'	<div class="panel-group" id="accordion">'
				+'	<div class="panel">'
				+'	<div class="panel-heading">'
				+'		<h3 class="panel-title">'
				+'			<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"  onclick="getIvfTreatmentListByPatientId('+r.getListIVFRegPatientDTO[i].patientId+','+i+')"  href="#collapseCghsTwo'+i+'">'
				+'				<div class="row">'
				+'							<center>'
				+'								<i class="fa fa-chevron-down"></i>'
				+'							</center>'
				+'						</div>'
				+'					</a>'
				+'				</h3>'
				+'			</div>'
				+'			<div id="collapseCghsTwo'+i+'" class="panel-collapse collapse" style="height: auto;">'
				+'				<div class="panel-body">'
				+'					<table class="table table-hover" style="width: 450px">'
				+'						<thead>'
				+'							<tr>'
				+'								<th>Sr No</th>'
				+'								<th>Created Date</th>'
				+'								<th>Treatment Id</th>'
				+'								<th>view</th>'
				+'							</tr>'
				+'						</thead>'
				+'						<tbody id="ivfPreviousAutoTreatmentList"'+i+'>'
				
				+'						</tbody >'
				+'					</table>'
				+'				</div>'
				+'			</div>'
				+'		</div>'
				+'	</div>'
				+'		</div>'
				+'	</td>'
								+"</tr>";*/
			
			+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreAutoSummary("+ r.patientId+")'>"
			+ "<img src='images/down.png' id='imgupdown"+r.patientId+"' />"
			+ "<input type='hidden' id='hideShowStatus"+ r.patientId+"' value='0' /><input type='hidden' id='patientDOB123' value='"+ r.patientId+"' /></td>"
			+ "</tr>"
			
					+ "<tr id='patPreAutoSummary"+ r.patientId+"' style='width:0%;float:right'><td style='display:none' id='td123"+ r.patientId+"'>"
							+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
								+ "<tbody1 id='xyz"+ r.patientId+"'>"
									+ "<tr>"
									+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
									+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
									+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
									+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
									+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
									+ "</tr>"
								+ "</tbody1>"
							+ "</table>"
						+ "</td></tr>"
						;

	 		index++;
	 
	
	$("#ivfPreviousAutosummaryDetails").html(htm);
}

function printIvfAllAutoDischargeSummary(){
	var patID = $("#patientId").text();
	var treatID = $("#tr_Id").val();
	var ivftreatmentId = $("#ivf_tr_Id").val(); 

	
	setTimeout(
			function() {
				window
						.open(("ivf_autosummary_print.jsp?" + "patID="
								+ encodeURIComponent(patID) + "&treatID=" 
								+ encodeURIComponent(treatID) + "&ivftreatmentId="
								+ encodeURIComponent(ivftreatmentId)));
			}, 300);
	return;	
}