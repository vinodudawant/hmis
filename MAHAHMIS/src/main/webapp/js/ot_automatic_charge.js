function saveAutoChargeDetails(){
	
	
	var table = document.getElementById("teamTableId");
	var rows = table.rows.length; // 5
	
//var rows = $('#teamTableId tbody tr.newTeamRow').length;
	var resultCharg=hallwiseCHARGE("hall");// get the hall wise charges from configuration
	var amount=0;
	var serviceDetails = {
			listBillDetailsIpd : []
        };
		for ( var i = 1; i <= rows-1; i++) {
			var doctorId = $("#docIdd" + i).text();
			var docTypeT = $("#docTypeT" + i).text();
			
			var subServiceId=0;
			 var MainSurgan=   $("#MainSurgan").val();
			 var AsistanSurgan=   $("#AsistanSurgan").val();
			 var AnethesiaNormal=   $("#Anethesia").val();
			if(docTypeT.startsWith("surgeon"))
				{
				    
				    subServiceId=MainSurgan;
				    var percentage=getPercentageDetails(subServiceId);
				    amount=resultCharg*(percentage/100);
				}else if(	docTypeT.startsWith("assSurgeon")){
					
					  subServiceId=AsistanSurgan;
					  var percentage=getPercentageDetails(subServiceId);
					  amount=resultCharg*(percentage/100);
				}else if(docTypeT.startsWith("anaesthesiologist")){
					
					  subServiceId=AnethesiaNormal;
					  var percentage=getPercentageDetails(subServiceId);
					  amount=resultCharg*(percentage/100);
				}
			 setAutoDetails(serviceDetails,doctorId,amount,4,subServiceId);
			
			/*setOvamPickUpFormSlavenfoInfoList(ovamPickUpSlaveList, ovamPickUpSlaveId,
					appearance, ovampickupslavedate, maturity, pbappearance, pnscore, day2, day3, day4,
					day5, transper,rate,userId, unitId,patientId,treatmentId,cycleNo);*/
		}
		
		serviceDetails = JSON.stringify(serviceDetails);
		
		var inputs = [];

	   
		inputs.push('serviceDetails=' +  encodeURIComponent(serviceDetails));
		

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ot/saveAutoChargesForOT",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				// 
			},
			success : function(r) {
				ajaxResponse = r;
				
				alert("r====="+r);
			
		}
		});
		
		
}

function setAutoDetails(serviceDetails,doctorId,amount,serviceId,subServiceId){
	var patienttId = $('#pt_Id').val();
	var treatmentId = $('#tr_Id').val();
	var	departmentId =  2;
	var billId       =  $("#bill_Id").val(); 
	 var callfrom="OC";
	 var ot_flag      = 'Y';
	    var drdeskflag   = 'N';
	    var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	    var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	    var treatmentoperationid = $("#treatmentoperationid").val();
	    var hallSlaveId = $("#hallSlaveId").val();
		var hallId = $('#hallId').val();
		var  unitId          = $("#unlId").val();
		var otProcedure = $("#scheduledProcedure option:first").val();
		
	    if (sponsorId == "" || sponsorId == null || sponsorId == undefined
				|| isNaN(sponsorId)) {
			sponsorId = 0;
		}
		if (chargesSlaveId == "" || chargesSlaveId == null
				|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
			chargesSlaveId = 0;
		}
		
		if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
			hallId = 0;
		}
	    
	    serviceDetails.listBillDetailsIpd.push({
			billDetailsId:0,
			patienttId : patienttId,
	        treatmentId : treatmentId,
	        departmentId : departmentId,
	        billId : billId,
	        sourceTypeId : 0,
	        rate : amount,
	        quantity : 0,
	        amount : amount,
	        serviceId : serviceId,
	        subServiceId : subServiceId,
	        doctorId:doctorId,
	        urgentFlag:"N",
	        clinicalnotes:"",
	        instructions:"",
	        unitId : unitId,
	        ot_flag:ot_flag,
	        coPay  :amount,
	        drdeskflag:drdeskflag,
	        callfrom : "",
	        onBedFlag:"N",
	        countot  :treatmentoperationid,
	        otprocedure:otProcedure,
	        otherRate:amount,
		    otherAmount :amount,
		    otherPay :amount,
		    sourceTypeId:0,
		    emrPer:0,
		   // sponsorId:1
		  
			hallSlaveId : hallSlaveId,
		    sponsorId : sponsorId,
		    hallId : hallId,
			chargesSlaveId : chargesSlaveId,
			iscombination : " ",
			receiptOf : "",
			sendToRisIpdBill : "N",
			sndToLabFlag : "N",
			drdeskflag : "-",
			sampleTypeId : 0,
			barCode : 0,
			inOutHouse : 0,
			histopathLab : "N",
			businessType : 0,
			customerId : 0,
			customerType : 0,
			//invoiceRemainAmount : amount,
			//prepaidReceiptId : prepaidReceiptId,
			collectionDate : "",
			collectionTime : "",
			regRefDocId : "0",
			templateWise : "N",
			ivfTreatFlag : "N"
	        
	    });

}