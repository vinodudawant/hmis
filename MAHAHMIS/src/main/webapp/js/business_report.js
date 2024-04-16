function updateDynamicDateLabel() {
    var fromDateValue = document.getElementById('fromDate').value;
    var toDateValue = document.getElementById('lastDate').value;

    document.getElementById('dynamicFromDate').textContent = fromDateValue;
    document.getElementById('dynamicToDate').textContent = toDateValue;
}


function getTotalBusinessAmt()
{

	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	callF=0;
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + 0);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/billregisterreport/fetchbillRegister",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			if (callF == "0"){
				// start opd 
				$('table tbody').empty();
				if (r.lstOpd == null && r.lstIpd == null && r.lstDaigno == null) {
				
		            var noRecordsHtml = '<tr style="background-color: lightgray; font-size: 16px; border: 2px solid darkgray;">' +
		                '<td colspan="8" style="text-align: center; font-weight: bold;">No Records Found</td>' +
		                '</tr>';
		            $("#businessData").html(noRecordsHtml);
		            return;
		        
				}
				
				  var finalTotBillOPD=0,finalTotPaidOPD=0,finalToDiscOPD=0,finalTotBalOPD=0,finalTotRefundOPD=0,finalTotalConcessionOPD=0,finalNetBillOPD=0,finalDepositOPD=0;
				
				if (r.lstOpd !== null)
			 	if(r.lstOpd.length > 0){
			 		
					for(var i=0;i < r.lstOpd.length;i++){
												
						
						
						var totBill = r.lstOpd[i].totBill;
						var totPaid = r.lstOpd[i].totPaid;
						var totBal = r.lstOpd[i].totBal;
						var totrefund = r.lstOpd[i].totalRefund;
						var totdiscount = r.lstOpd[i].totDisc;
						 var totalConcession=r.lstOpd[i].totalConcession;
						 var netAmt=r.lstOpd[i].netAmt;
						 var deposit=r.lstOpd[i].deposit;
						 
						if(totBal < 0){
							totBal =0;
						}
						
						finalTotBillOPD=Number(finalTotBillOPD)+Number(totBill);
						finalTotPaidOPD=Number(finalTotPaidOPD)+Number(totPaid);
						//finalTotBal=Number(finalTotBal)+Number(totBal);
						finalTotBalOPD=Number(finalTotBalOPD)+Number(totBal);
						finalToDiscOPD=Number(finalToDiscOPD)+Number(totdiscount);
						finalTotRefundOPD=Number(finalTotRefundOPD)+Number(totrefund);
						finalTotalConcessionOPD=Number(finalTotalConcessionOPD)+Number(totalConcession);
						finalNetBillOPD=Number(finalNetBillOPD)+Number(netAmt);
						finalDepositOPD=Number(finalDepositOPD)+Number(deposit);
						
					
											
					}	
					
					
				}
			 	
				
			
				// end opd
			 	
			 	// start ipd 
			 	 // for IPD
				
				  var finalTotBillIPD=0,finalTotPaidIPD=0,finalToDiscIPD=0,finalTotBalIPD=0,finalTotRefundIPD=0,finalTotalConcessionIPD=0,finalNetBillIPD=0,finalDepositIPD=0;
				
				if(r.lstIpd !== null)
			 	if(r.lstIpd.length > 0){
			 	
					
					
					for(var i=0;i < r.lstIpd.length;i++){
						
						
						var totBill = r.lstIpd[i].totBill;
						var totPaid = r.lstIpd[i].totPaid;
						var totBal = r.lstIpd[i].totBal;
						var totrefund = r.lstIpd[i].totalRefund;
						var totdiscount = r.lstIpd[i].totDisc;
						 var totalConcession=r.lstIpd[i].totalConcession;
						 var netAmt=r.lstIpd[i].netAmt;
						 var deposit=r.lstIpd[i].deposit;
						 
						if(totBal < 0){
							totBal =0;
						}
						
						finalTotBillIPD=Number(finalTotBillIPD)+Number(totBill);
						finalTotPaidIPD=Number(finalTotPaidIPD)+Number(totPaid);
						//finalTotBal=Number(finalTotBal)+Number(totBal);
						finalTotBalIPD=Number(finalTotBalIPD)+Number(totBal);
						finalToDiscIPD=Number(finalToDiscIPD)+Number(totdiscount);
						finalTotRefundIPD=Number(finalTotRefundIPD)+Number(totrefund);
						finalTotalConcessionIPD=Number(finalTotalConcessionIPD)+Number(totalConcession);
						finalNetBillIPD=Number(finalNetBillIPD)+Number(netAmt);
						finalDepositIPD=Number(finalDepositIPD)+Number(deposit);
						
										
					}	
					
					
				
				}
			 	
				
				
			
			 	// end ipd
			 	
			 	
			 	//start diagno
			 	
			 	 // for Diagno
				
				  
				var finalTotBillDiagno=0,finalTotPaidDiagno=0,finalToDiscDiagno=0,finalTotBalDiagno=0,finalTotRefundDiagno=0,finalTotalConcessionDiagno=0,finalNetBillDiagno=0,finalDepositDiagno=0;
				
				if(r.lstDaigno !== null)
			 	if(r.lstDaigno.length > 0){
			 		
					
					for(var i=0;i < r.lstDaigno.length;i++){
												
					
						
						var totBill = r.lstDaigno[i].totBill;
						var totPaid = r.lstDaigno[i].totPaid;
						var totBal = r.lstDaigno[i].totBal;
						var totrefund = r.lstDaigno[i].totalRefund;
						var totdiscount = r.lstDaigno[i].totDisc;
						 var totalConcession=r.lstDaigno[i].totalConcession;
						 var netAmt=r.lstDaigno[i].netAmt;
						 var deposit=r.lstDaigno[i].deposit;
						 
						if(totBal < 0){
							totBal =0;
						}
						
						finalTotBillDiagno=Number(finalTotBillDiagno)+Number(totBill);
						finalTotPaidDiagno=Number(finalTotPaidDiagno)+Number(totPaid);
						//finalTotBal=Number(finalTotBal)+Number(totBal);
						finalTotBalDiagno=Number(finalTotBalDiagno)+Number(totBal);
						finalToDiscDiagno=Number(finalToDiscDiagno)+Number(totdiscount);
						finalTotRefundDiagno=Number(finalTotRefundDiagno)+Number(totrefund);
						finalTotalConcessionDiagno=Number(finalTotalConcessionDiagno)+Number(totalConcession);
						finalNetBillDiagno=Number(finalNetBillDiagno)+Number(netAmt);
						finalDepositDiagno=Number(finalDepositDiagno)+Number(deposit);
						
						
						
						
										
					}	
					
					
					
					
				}
			 	
			 	
			 	var TotalBillAmount = 0,TotalDiscount=0,TotalConcession=0,totalnet=0,TotalPaid=0,TotalRefund=0,totalduesAmount=0;
			 	TotalBillAmount = finalTotBillOPD + finalTotBillIPD + finalTotBillDiagno;
			 	TotalDiscount = finalToDiscOPD + finalToDiscIPD + finalToDiscDiagno;
			 	TotalConcession = finalTotalConcessionOPD + finalTotalConcessionIPD + finalTotalConcessionDiagno;
			 	totalnet = finalNetBillOPD + finalNetBillIPD + finalNetBillDiagno;
			 	TotalPaid = finalTotPaidOPD + finalTotPaidIPD + finalTotPaidDiagno;
			 	TotalRefund = finalTotRefundOPD + finalTotRefundIPD + finalTotRefundDiagno;
			 	totalduesAmount = finalTotBalOPD + finalTotBalIPD + finalTotBalDiagno;
			 	
			 	
			 	// end daigno
			 	
				var htm = 
					'<tr style="background-color: lightyellow; font-size: 16px; border: 2px solid darkgray;">'
					    + '<td style="font-weight: bold;">OPD Business</td>'
					    + '<td>'+parseFloat(finalTotBillOPD).toFixed(2)+'</td>'
					    + '<td>'+parseFloat(finalToDiscOPD).toFixed(2)+'</td>'
					    + '<td>'+parseFloat(finalTotalConcessionOPD).toFixed(2)+'</td>'
					    + '<td>'+parseFloat(finalNetBillOPD).toFixed(2)+'</td>'			    
					    + '<td>'+parseFloat(finalTotPaidOPD).toFixed(2)+'</td>'
					    + '<td>'+parseFloat(finalTotRefundOPD).toFixed(2)+'</td>'
					    + '<td>'+parseFloat(finalTotBalOPD).toFixed(2)+'</td>'
					+ '</tr>'
				+'<tr style="background-color: lightyellow; font-size: 16px; border: 2px solid darkgray;">'+
				    '<td style="font-weight: bold;">IPD Business</td>'+
				    '<td>'+parseFloat(finalTotBillIPD).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalToDiscIPD).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalTotalConcessionIPD).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalNetBillIPD).toFixed(2)+'</td>'+		    	    
					 '<td>'+parseFloat(finalTotPaidIPD).toFixed(2)+'</td>'+
					 '<td>'+parseFloat(finalTotRefundIPD).toFixed(2)+'</td>'+	
				    '<td>'+parseFloat(finalTotBalIPD).toFixed(2)+'</td>'+
				'</tr>'+
				'<tr style="background-color: lightyellow; font-size: 16px; border: 2px solid darkgray;">'+
				    '<td style="font-weight: bold;">Diagnostic</td>'+
				    '<td>'+parseFloat(finalTotBillDiagno).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalToDiscDiagno).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalTotalConcessionDiagno).toFixed(2)+'</td>'+		    
				    '<td>'+parseFloat(finalNetBillDiagno).toFixed(2)+'</td>'+
					 '<td>'+parseFloat(finalTotPaidDiagno).toFixed(2)+'</td>'+
					 '<td>'+parseFloat(finalTotRefundDiagno).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalTotBalDiagno).toFixed(2)+'</td>'+
				'</tr>'+
				'<tr class="table-primary" style="background-color: yellow; font-size: 16px; border: 2px solid darkgray;">'+
				    '<td style="font-weight: bold;">Total</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(TotalBillAmount).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(TotalDiscount).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(TotalConcession).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(totalnet).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(TotalPaid).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(TotalRefund).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(totalduesAmount).toFixed(2)+'</td>'+
				'</tr>';
			        
			        $("#businessData").html(htm)

			
			}
 		}
	});	

	
}

function getDateFormat(fdate, tdate)
{
	farr = fdate.split('/');
	tarr = tdate.split('/');
	
	fdate = farr[2]+'-'+farr[1]+'-'+farr[0];
	tdate = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	return fdate+':'+tdate;
}


function getUserEntryLogReport()
{
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var unitId = parseInt($("#unitId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/billregisterreport/getUserEntryLogReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			var htm = ""; 

			for (var i = 0; i < r.length; i++) {
				
				var serviceCount =  parseInt(r[i].totalOPDServicesCount) +  parseInt(r[i].totalIPDServicesCount);
			    htm +=
			        '<tr style="font-size: 12px; border: 2px solid darkgray;">'
			        + '<td style="font-weight: bold;">' + r[i].userName + '</td>'
			        + '<td style="' + (r[i].totalVitalCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].totalVitalCount + '</td>'
			        + '<td style="' + (r[i].totalInputCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].totalInputCount + '</td>'
			        + '<td style="' + (r[i].totalOutputCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].totalOutputCount + '</td>'
			        + '<td style="' + (r[i].totalOPDServicesCount || r[i].totalIPDServicesCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + serviceCount + '</td>'
			        + '<td style="' + (r[i].totalOPDPrescriptionCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].totalOPDPrescriptionCount+ '</td>'
			        + '<td style="' + (r[i].totalNurshingPrescriptionCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].totalNurshingPrescriptionCount + '</td>'
			        + '<td style="' + (r[i].totalotScheduleCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].totalotScheduleCount + '</td>'
			        + '<td style="' + (r[i].totalRegistrationCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + 0 + '</td>'
			        + '<td style="' + (r[i].totalRegistrationCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].totalRegistrationCount + '</td>'
			        + '<td style="' + (r[i].totalOPDBillCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].totalOPDBillCount + '</td>'
			        + '<td style="' + (r[i].totalDiagnoBillCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].totalDiagnoBillCount + '</td>'
			        + '<td style="' + (r[i].totalIPDBillCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].totalIPDBillCount + '</td>'
			        + '</tr>';
			}

        $("#userEntryLogReport").html(htm); // Move this line outside the loop
    }
});
}


function getSpecialityReport(clickedButton)
{
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var unitId = parseInt($("#unitId").val());	
    var CallFrom = $(clickedButton).val();
    
    if(CallFrom == undefined)
    {
    	CallFrom = clickedButton;
    }
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	inputs.push("CallFrom=" + CallFrom);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/billregisterreport/getSpecialityWiseReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			var htm = ""; 

			if(CallFrom == "Speciality Wise")
			{
			htm += '<thead>'
		    +'<tr style="background-color: lightyellow; font-size: 12px; border: 2px solid darkgray; font-weight: bold;">'
		       +'<th>Sr.No</th>'
		        +'<th>Department</th>'
		        +'<th>OPD</th>'
		        +'<th>Admission</th>'
		        +'<th>Discharge</th>'
		        +'<th>Surgeries</th>'
		        +'<th>Death</th>'
		   +'</tr>'
		+'</thead>'
		
			for (var i = 0; i < r.length; i++) {
			    htm +=
			        '<tr style="font-size: 12px; border: 2px solid darkgray;">'
			    	+ '<td style="font-weight: bold;">' + (i+1) + '</td>'
			        + '<td style="font-weight: bold;">' + r[i].department + '</td>'
			        + '<td style="' + (r[i].opdCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].opdCount + '</td>'
			        + '<td style="' + (r[i].admissionCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].admissionCount + '</td>'
			        + '<td style="' + (r[i].dischargeCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].dischargeCount + '</td>'
			        + '<td style="' + (r[i].surgeriesCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].surgeriesCount + '</td>'
			        + '<td style="' + (r[i].deathCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].deathCount+ '</td>'			        + '</tr>';
			}
		}else
		{
			htm = '<thead>'
			    +'<tr style="background-color: lightyellow; font-size: 12px; border: 2px solid darkgray; font-weight: bold;">'
			       +'<th>Sr.No</th>'
			        +'<th>Date</th>'
			        +'<th>OPD</th>'
			        +'<th>Admission</th>'
			        +'<th>Discharge</th>'
			        +'<th>Surgeries</th>'
			        +'<th>Death</th>'
			   +'</tr>'
			+'</thead>'
			
				for (var i = 0; i < r.length; i++) {
				const formattedDate = new Date(r[i].recordDate).toLocaleDateString('en-GB');	
				    htm +=
				        '<tr style="font-size: 12px; border: 2px solid darkgray;">'
				    	+ '<td style="font-weight: bold;">' + (i+1) + '</td>'
				        + '<td style="font-weight: bold;">' + formattedDate + '</td>'
				        + '<td style="' + (r[i].opdCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].opdCount + '</td>'
				        + '<td style="' + (r[i].admissionCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].admissionCount + '</td>'
				        + '<td style="' + (r[i].dischargeCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].dischargeCount + '</td>'
				        + '<td style="' + (r[i].surgeriesCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].surgeriesCount + '</td>'
				        + '<td style="' + (r[i].deathCount > 0 ? 'font-weight: bold; color: black;' : '') + '">' + r[i].deathCount+ '</td>'			        + '</tr>';
				}
			}
			
        $("#SpecialityWiseReport").html(htm); // Move this line outside the loop
    }
});
}


function getTotalBusinessAmtWithPatho()
{

	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	callF=0;
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + 0);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/billregisterreport/getLabBillRegisterReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			if (callF == "0"){
				// start opd 
				$('table tbody').empty();
				if (r.lstOpd == null && r.lstIpd == null && r.lstDaigno == null) {
				
		            var noRecordsHtml = '<tr style="background-color: lightgray; font-size: 16px; border: 2px solid darkgray;">' +
		                '<td colspan="8" style="text-align: center; font-weight: bold;">No Records Found</td>' +
		                '</tr>';
		            $("#businessData").html(noRecordsHtml);
		            return;
		        
				}
				
				  var finalTotBillOPD=0,finalTotPaidOPD=0,finalToDiscOPD=0,finalTotBalOPD=0,finalTotRefundOPD=0,finalTotalConcessionOPD=0,finalNetBillOPD=0,finalDepositOPD=0;
				  var pathoTotalAMtOPD=0,pathoTotalDiscountOPD=0,pathoTotalConcessionOPD=0,pathoTotalNetAmtOPD=0,pathoPaidAmtOPD=0,pathoRefundAmtOPD=0,pathoDuesAmtOPD=0;
				if (r.lstOpd !== null)
			 	if(r.lstOpd.length > 0){
			 		
					for(var i=0;i < r.lstOpd.length;i++){
												
						
						
						var totBill = r.lstOpd[i].totBill;
						var totPaid = r.lstOpd[i].totPaid;
						var totBal = r.lstOpd[i].totBal;
						var totrefund = r.lstOpd[i].totalRefund;
						var totdiscount = r.lstOpd[i].totDisc;
						 var totalConcession=r.lstOpd[i].totalConcession;
						 var netAmt=r.lstOpd[i].netAmt;
						 var deposit=r.lstOpd[i].deposit;
						 
						if(totBal < 0){
							totBal =0;
						}
						
						finalTotBillOPD=Number(finalTotBillOPD)+Number(totBill);
						finalTotPaidOPD=Number(finalTotPaidOPD)+Number(totPaid);
						//finalTotBal=Number(finalTotBal)+Number(totBal);
						finalTotBalOPD=Number(finalTotBalOPD)+Number(totBal);
						finalToDiscOPD=Number(finalToDiscOPD)+Number(totdiscount);
						finalTotRefundOPD=Number(finalTotRefundOPD)+Number(totrefund);
						finalTotalConcessionOPD=Number(finalTotalConcessionOPD)+Number(totalConcession);
						finalNetBillOPD=Number(finalNetBillOPD)+Number(netAmt);
						finalDepositOPD=Number(finalDepositOPD)+Number(deposit);
						
						pathoTotalAMtOPD=Number(pathoTotalAMtOPD)+Number(r.lstOpd[i].pathoBillAmt);
						pathoTotalDiscountOPD=Number(pathoTotalDiscountOPD)+Number(r.lstOpd[i].pathoDiscountAmt);
						pathoTotalConcessionOPD=Number(pathoTotalConcessionOPD)+Number(r.lstOpd[i].pathoConcessionAmt);
						pathoTotalNetAmtOPD=Number(pathoTotalNetAmtOPD)+Number(r.lstOpd[i].pathoNetAmt);
						pathoPaidAmtOPD=Number(pathoPaidAmtOPD)+Number(r.lstOpd[i].pathoPaidAmt);
						pathoRefundAmtOPD=Number(pathoRefundAmtOPD)+Number(r.lstOpd[i].pathoRefundAmt);
						pathoDuesAmtOPD=Number(pathoDuesAmtOPD)+Number(r.lstOpd[i].pathoDuesAmt);
											
					}	
					
					
				}
			 	
				
			
				// end opd
			 	
			 	// start ipd 
			 	 // for IPD
				
				  var finalTotBillIPD=0,finalTotPaidIPD=0,finalToDiscIPD=0,finalTotBalIPD=0,finalTotRefundIPD=0,finalTotalConcessionIPD=0,finalNetBillIPD=0,finalDepositIPD=0;
				 
				  var pathoTotalAMtIPD=0,pathoTotalDiscountIPD=0,pathoTotalConcessionIPD=0,pathoTotalNetAmtIPD=0,pathoPaidAmtIPD=0,pathoRefundAmtIPD=0,pathoDuesAmtIPD=0;
				
				if(r.lstIpd !== null)
			 	if(r.lstIpd.length > 0){
			 	
					
					
					for(var i=0;i < r.lstIpd.length;i++){
						
						
						var totBill = r.lstIpd[i].totBill;
						var totPaid = r.lstIpd[i].totPaid;
						var totBal = r.lstIpd[i].totBal;
						var totrefund = r.lstIpd[i].totalRefund;
						var totdiscount = r.lstIpd[i].totDisc;
						 var totalConcession=r.lstIpd[i].totalConcession;
						 var netAmt=r.lstIpd[i].netAmt;
						 var deposit=r.lstIpd[i].deposit;
						 
						if(totBal < 0){
							totBal =0;
						}
						
						finalTotBillIPD=Number(finalTotBillIPD)+Number(totBill);
						finalTotPaidIPD=Number(finalTotPaidIPD)+Number(totPaid);
						//finalTotBal=Number(finalTotBal)+Number(totBal);
						if((totBal).toFixed(2) < 1){
						finalTotBalIPD=Number(finalTotBalIPD)+Number(0.0);
						}else{
							finalTotBalIPD=Number(finalTotBalIPD)+Number(totBal);
						}

						finalToDiscIPD=Number(finalToDiscIPD)+Number(totdiscount);
						finalTotRefundIPD=Number(finalTotRefundIPD)+Number(totrefund);
						finalTotalConcessionIPD=Number(finalTotalConcessionIPD)+Number(totalConcession);
						finalNetBillIPD=Number(finalNetBillIPD)+Number(netAmt);
						finalDepositIPD=Number(finalDepositIPD)+Number(deposit);
						
						pathoTotalAMtIPD=Number(pathoTotalAMtIPD)+Number(r.lstIpd[i].pathoBillAmt);
						pathoTotalDiscountIPD=Number(pathoTotalDiscountIPD)+Number(r.lstIpd[i].pathoDiscountAmt);
						pathoTotalConcessionIPD=Number(pathoTotalConcessionIPD)+Number(r.lstIpd[i].pathoConcessionAmt);
						pathoTotalNetAmtIPD=Number(pathoTotalNetAmtIPD)+Number(r.lstIpd[i].pathoNetAmt);
						pathoPaidAmtIPD=Number(pathoPaidAmtIPD)+Number(r.lstIpd[i].pathoPaidAmt);
						pathoRefundAmtIPD=Number(pathoRefundAmtIPD)+Number(r.lstIpd[i].pathoRefundAmt);
						pathoDuesAmtIPD=Number(pathoDuesAmtIPD)+Number(r.lstIpd[i].pathoDuesAmt);
						
										
					}	
					
					
				
				}
			 	
				
				
			
			 	// end ipd
			 	
			 	
			 	//start diagno
			 	
			 	 // for Diagno
				
				  
				var finalTotBillDiagno=0,finalTotPaidDiagno=0,finalToDiscDiagno=0,finalTotBalDiagno=0,finalTotRefundDiagno=0,finalTotalConcessionDiagno=0,finalNetBillDiagno=0,finalDepositDiagno=0;
				var pathoTotalAMtDiagno=0,pathoTotalDiscountDiagno=0,pathoTotalConcessionDiagno=0,pathoTotalNetAmtDiagno=0,pathoPaidAmtDiagno=0,pathoRefundAmtDiagno=0,pathoDuesAmtDiagno=0;
				if(r.lstDaigno !== null)
			 	if(r.lstDaigno.length > 0){
			 		
					
					for(var i=0;i < r.lstDaigno.length;i++){
												
					
						
						var totBill = r.lstDaigno[i].totBill;
						var totPaid = r.lstDaigno[i].totPaid;
						var totBal = r.lstDaigno[i].totBal;
						var totrefund = r.lstDaigno[i].totalRefund;
						var totdiscount = r.lstDaigno[i].totDisc;
						 var totalConcession=r.lstDaigno[i].totalConcession;
						 var netAmt=r.lstDaigno[i].netAmt;
						 var deposit=r.lstDaigno[i].deposit;
						 
						if(totBal < 0){
							totBal =0;
						}
						
						finalTotBillDiagno=Number(finalTotBillDiagno)+Number(totBill);
						finalTotPaidDiagno=Number(finalTotPaidDiagno)+Number(totPaid);
						//finalTotBal=Number(finalTotBal)+Number(totBal);
						finalTotBalDiagno=Number(finalTotBalDiagno)+Number(totBal);
						finalToDiscDiagno=Number(finalToDiscDiagno)+Number(totdiscount);
						finalTotRefundDiagno=Number(finalTotRefundDiagno)+Number(totrefund);
						finalTotalConcessionDiagno=Number(finalTotalConcessionDiagno)+Number(totalConcession);
						finalNetBillDiagno=Number(finalNetBillDiagno)+Number(netAmt);
						finalDepositDiagno=Number(finalDepositDiagno)+Number(deposit);
						
						pathoTotalAMtDiagno=Number(pathoTotalAMtDiagno)+Number(r.lstDaigno[i].pathoBillAmt);
						pathoTotalDiscountDiagno=Number(pathoTotalDiscountDiagno)+Number(r.lstDaigno[i].pathoDiscountAmt);
						pathoTotalConcessionDiagno=Number(pathoTotalConcessionDiagno)+Number(r.lstDaigno[i].pathoConcessionAmt);
						pathoTotalNetAmtDiagno=Number(pathoTotalNetAmtDiagno)+Number(r.lstDaigno[i].pathoNetAmt);
						pathoPaidAmtDiagno=Number(pathoPaidAmtDiagno)+Number(r.lstDaigno[i].pathoPaidAmt);
						pathoRefundAmtDiagno=Number(pathoRefundAmtDiagno)+Number(r.lstDaigno[i].pathoRefundAmt);
						pathoDuesAmtDiagno=Number(pathoDuesAmtDiagno)+Number(r.lstDaigno[i].pathoDuesAmt);
						
						
						
										
					}	
					
					
					
					
				}
			 	
			 	
			 	var TotalBillAmount = 0,TotalDiscount=0,TotalConcession=0,totalnet=0,TotalPaid=0,TotalRefund=0,totalduesAmount=0;
			 	TotalBillAmount = finalTotBillOPD + finalTotBillIPD + finalTotBillDiagno;
			 	TotalDiscount = finalToDiscOPD + finalToDiscIPD + finalToDiscDiagno;
			 	TotalConcession = finalTotalConcessionOPD + finalTotalConcessionIPD + finalTotalConcessionDiagno;
			 	totalnet = finalNetBillOPD + finalNetBillIPD + finalNetBillDiagno;
			 	TotalPaid = finalTotPaidOPD + finalTotPaidIPD + finalTotPaidDiagno;
			 	TotalRefund = finalTotRefundOPD + finalTotRefundIPD + finalTotRefundDiagno;
			 	totalduesAmount = finalTotBalOPD + finalTotBalIPD + finalTotBalDiagno;
			 	
			 	var totalPathoAmt=Number(pathoTotalAMtOPD)+Number(pathoTotalAMtIPD)+Number(pathoTotalAMtDiagno);
				var totalPathoDiscountAmt=Number(pathoTotalDiscountOPD)+Number(pathoTotalDiscountIPD)+Number(pathoTotalDiscountDiagno);
				var totalPathoConcessionAmt=Number(pathoTotalConcessionOPD)+Number(pathoTotalConcessionIPD)+Number(pathoTotalConcessionDiagno);
				var totalPathoNetAmt=Number(pathoTotalNetAmtOPD)+Number(pathoTotalNetAmtIPD)+Number(pathoTotalNetAmtDiagno);
				var totalPathoPaidAmt=Number(pathoPaidAmtOPD)+Number(pathoPaidAmtIPD)+Number(pathoPaidAmtDiagno);
				var totalPathoRefundAmt=Number(pathoRefundAmtOPD)+Number(pathoRefundAmtIPD)+Number(pathoRefundAmtDiagno);
				var totalPathoDuesAmt=Number(pathoDuesAmtOPD)+Number(pathoDuesAmtIPD)+Number(pathoDuesAmtDiagno);
			 	
			 	
			 	// end daigno
			 	
				var htm = 
					'<tr style="background-color: lightyellow; font-size: 16px; border: 2px solid darkgray;">'
					    + '<td style="font-weight: bold;">OPD Business</td>'
					    + '<td>'+parseFloat(finalTotBillOPD).toFixed(2)+'</td>'
					    + '<td>'+parseFloat(finalToDiscOPD).toFixed(2)+'</td>'
					    + '<td>'+parseFloat(finalTotalConcessionOPD).toFixed(2)+'</td>'
					    + '<td>'+parseFloat(finalNetBillOPD).toFixed(2)+'</td>'			    
					    + '<td>'+parseFloat(finalTotPaidOPD).toFixed(2)+'</td>'
					    + '<td>'+parseFloat(finalTotRefundOPD).toFixed(2)+'</td>'
					    + '<td>'+parseFloat(finalTotBalOPD).toFixed(2)+'</td>'
					+ '</tr>'
				+'<tr style="background-color: lightyellow; font-size: 16px; border: 2px solid darkgray;">'+
				    '<td style="font-weight: bold;">IPD Business</td>'+
				    '<td>'+parseFloat(finalTotBillIPD).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalToDiscIPD).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalTotalConcessionIPD).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalNetBillIPD).toFixed(2)+'</td>'+		    	    
					 '<td>'+parseFloat(finalTotPaidIPD).toFixed(2)+'</td>'+
					 '<td>'+parseFloat(finalTotRefundIPD).toFixed(2)+'</td>'+	
				    '<td>'+parseFloat(finalTotBalIPD).toFixed(2)+'</td>'+
				'</tr>'+
				'<tr style="background-color: lightyellow; font-size: 16px; border: 2px solid darkgray;">'+
				    '<td style="font-weight: bold;">Diagnostic</td>'+
				    '<td>'+parseFloat(finalTotBillDiagno).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalToDiscDiagno).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalTotalConcessionDiagno).toFixed(2)+'</td>'+		    
				    '<td>'+parseFloat(finalNetBillDiagno).toFixed(2)+'</td>'+
					 '<td>'+parseFloat(finalTotPaidDiagno).toFixed(2)+'</td>'+
					 '<td>'+parseFloat(finalTotRefundDiagno).toFixed(2)+'</td>'+
				    '<td>'+parseFloat(finalTotBalDiagno).toFixed(2)+'</td>'+
				'</tr>'+
				'<tr class="table-primary" style="background-color: yellow; font-size: 16px; border: 2px solid darkgray;">'+
				    '<td style="font-weight: bold;">Total</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(TotalBillAmount).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(TotalDiscount).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(TotalConcession).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(totalnet).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(TotalPaid).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(TotalRefund).toFixed(2)+'</td>'+
				    '<td style="font-weight: bold;">'+parseFloat(totalduesAmount).toFixed(2)+'</td>'+
				'</tr>'+
				
				'<tr class="table-primary" style=" font-size: 16px; border: 2px solid darkgray;">'+
			    '<td style="font-weight: bold;"></td>'+
			    '<td style="font-weight: bold;"></td>'+
			    '<td style="font-weight: bold;"></td>'+
			    '<td style="font-weight: bold;"></td>'+
			    '<td style="font-weight: bold;"></td>'+
			    '<td style="font-weight: bold;"></td>'+
			    '<td style="font-weight: bold;"></td>'+
			    '<td style="font-weight: bold;"></td>'+
			'</tr>'+
				
				
				'<tr class="table-primary" style="background-color: orange; font-size: 16px; border: 2px solid darkgray;">'+
			    '<td style="font-weight: bold;">Pathology </td>'+
			    '<td style="font-weight: bold;">'+parseFloat(totalPathoAmt).toFixed(2)+'</td>'+
			    '<td style="font-weight: bold;">'+parseFloat(totalPathoDiscountAmt).toFixed(2)+'</td>'+
			    '<td style="font-weight: bold;">'+parseFloat(totalPathoConcessionAmt).toFixed(2)+'</td>'+
			    '<td style="font-weight: bold;">'+parseFloat(totalPathoNetAmt).toFixed(2)+'</td>'+
			    '<td style="font-weight: bold;">'+parseFloat(totalPathoPaidAmt).toFixed(2)+'</td>'+
			    '<td style="font-weight: bold;">'+parseFloat(totalPathoRefundAmt).toFixed(2)+'</td>'+
			    '<td style="font-weight: bold;">'+parseFloat(totalPathoDuesAmt).toFixed(2)+'</td>'+
			'</tr>';
			        
			        $("#businessData").html(htm)

			
			}
 		}
	});	

	
}

function setIpdBillAmt(){
	
	var fromDate1 = $("#fromDate").val();
	var toDate1 = $("#lastDate").val();
	
	var departmentId = $("#departmentId").val();
	
	var str = getDateFormat(fromDate1, toDate1); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var str = "Please wait Amount is distributing..";
	$("#resultHead").css("color","red");
	$("#resultHead").html(str);
	
	var inputs = [];	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("departmentId=" + departmentId);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/billregisterreport/setDistributeAmountForLab",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			if(r > 0){
				
				var str = "Amount is distributed successfully..";
				$("#resultHead").css("color","green");
				$("#resultHead").html(str);
			}
		}
	});	
}