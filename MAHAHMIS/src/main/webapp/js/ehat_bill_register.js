function getBillRegisterReport() {
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	callF=$("#searchType").val();
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
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
			$("#container").html(" ");
			var temp="";
			var grandFinalBill=0,grandFinalPaid=0,grandFinalDiscAmt=0,grandFinalToatlBal=0,grandFinalRefundAMt=0,grandFinalConcession=0,grandFinalNetAmt=0,grandFinalDepositAmt=0;
			if (callF == "0"){
				// start opd 

				
				  var finalTotBillOPD=0,finalTotPaidOPD=0,finalToDiscOPD=0,finalTotBalOPD=0,finalTotRefundOPD=0,finalTotalConcessionOPD=0,finalNetBillOPD=0,finalDepositOPD=0;
				
			 	if(r.lstOpd.length > 0){
			 		
			 		temp=temp+ '<tr> '
					+' <td style="height: 21.5px;background-color: yellow;" >OPD Type</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;" ></td> '
				//	+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;" ></td>'
					+' </tr> ';	
					
					
					for(var i=0;i < r.lstOpd.length;i++){
												
						var date=new Date(r.lstOpd[i].createdDateTime).toLocaleString('en-GB');					
						var dd=date.split(',');
						
						var bdate=new Date(r.lstOpd[i].billDateTime).toLocaleString('en-GB');					
						var bd=bdate.split(',');
						
						
						var patType="";
						var catType="";
						
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
						
						var spId=r.lstOpd[i].chargesMasterSlaveId;
						
						if(spId > 0){					
							
							patType=r.lstOpd[i].categoryName;
							catType="Sponsor";
			 			}else{
			 				
			 				patType="Self Paying";		
			 				catType="Hospital";
						}
						
						if(r.lstOpd[i].bedName==null)
							{
								r.lstOpd[i].bedName="-";
							}
						if(r.lstOpd[i].doctorName=="null")
						{
							r.lstOpd[i].doctorName="-";
						}
						
						var refDoc = r.lstOpd[i].refDocPrefix+" "+r.lstOpd[i].refDoctorName;
						
						var cmode="Cash";
						if(r.lstOpd[i].totBal > 0){
							cmode="Credit";
						}
						
						
						temp=temp+ '<tr> '
						+' <td style="height: 21.5px;" >'+(i+1)+'</td> '
						+' <td style="height: 21.5px;" >'+bd[0] + " " + bd[1] +'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].billNo+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].mrnno+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].patientId+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].patientName+'</td>	'
						+' <td style="height: 21.5px;" >'+catType+'</td> '
						+' <td style="height: 21.5px;" >'+patType+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].doctorName+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].specilizationName+'</td>	'
						+' <td style="height: 21.5px;" >'+refDoc+'</td>	'
						+' <td style="height: 21.5px;" >'+cmode+'</td>	'
						+' <td style="height: 21.5px;" >'+parseFloat(totBill).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totdiscount).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].approveBy+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].approveRemark+'</td>	'	
	                	+' <td style="height: 21.5px;" >'+parseFloat(totalConcession).toFixed(2)+'</td> '
	                	//+' <td style="height: 21.5px;" >'+"Concession Approve"+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].netAmt+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totPaid).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].deposit+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totrefund).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totBal).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].visitType+'</td> '
	                		
						+' </tr> ';						
					}	
					
					
					
					
					temp=temp+ '<tr> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;background-color: yellow;" >Total </td> '
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalTotBillOPD).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalToDiscOPD).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalTotalConcessionOPD).toFixed(2)+'</td> '
					//+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalNetBillOPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalTotPaidOPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalDepositOPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalTotRefundOPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalTotBalOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;" ></td> ' 
					+' </tr> ';	
					
					$("#container").html(temp);
				}
			 	
				
			
				// end opd
			 	
			 	// start ipd 
			 	 // for IPD
				
				  var finalTotBillIPD=0,finalTotPaidIPD=0,finalToDiscIPD=0,finalTotBalIPD=0,finalTotRefundIPD=0,finalTotalConcessionIPD=0,finalNetBillIPD=0,finalDepositIPD=0;
				
			 	if(r.lstIpd.length > 0){
			 		
			 		temp=temp+ '<tr> '
					+' <td style="height: 21.5px;background-color: orange;" >IPD Type</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;" ></td> '
					//+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;" ></td>'
					+' </tr> ';	
					
					
					for(var i=0;i < r.lstIpd.length;i++){
												
						var date=new Date(r.lstIpd[i].createdDateTime).toLocaleString('en-GB');					
						var dd=date.split(',');
						
						var bdate=new Date(r.lstIpd[i].billDateTime).toLocaleString('en-GB');					
						var bd=bdate.split(',');
						
						
						var patType="";
						var catType="";
						
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
						
						var spId=r.lstIpd[i].chargesMasterSlaveId;
						
						if(spId > 0){					
							
							patType=r.lstIpd[i].categoryName;
							catType="Sponsor";
			 			}else{
			 				
			 				patType="Self Paying";		
			 				catType="Hospital";
						}
						
						if(r.lstIpd[i].bedName==null)
							{
								r.lstIpd[i].bedName="-";
							}
						if(r.lstIpd[i].doctorName=="null")
						{
							r.lstIpd[i].doctorName="-";
						}
						
						var refDoc = r.lstIpd[i].refDocPrefix+" "+r.lstIpd[i].refDoctorName;
						
						var cmode="Cash";
						if(r.lstIpd[i].totBal > 0){
							cmode="Credit";
						}
						
						
						temp=temp+ '<tr> '
						+' <td style="height: 21.5px;" >'+(i+1)+'</td> '
						+' <td style="height: 21.5px;" >'+bd[0] + " " + bd[1] +'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].billNo+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].mrnno+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].patientId+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].patientName+'</td>	'
						+' <td style="height: 21.5px;" >'+catType+'</td> '
						+' <td style="height: 21.5px;" >'+patType+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].doctorName+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].specilizationName+'</td>	'
						+' <td style="height: 21.5px;" >'+refDoc+'</td>	'
						+' <td style="height: 21.5px;" >'+cmode+'</td>	'
						+' <td style="height: 21.5px;" >'+parseFloat(totBill).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totdiscount).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].approveBy+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].approveRemark+'</td>	'	
	                	+' <td style="height: 21.5px;" >'+parseFloat(totalConcession).toFixed(2)+'</td> '
	                	//+' <td style="height: 21.5px;" >'+"Concession Approve"+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].netAmt+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totPaid).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].deposit+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totrefund).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totBal).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >-</td> '
	                		
						+' </tr> ';						
					}	
					
					
					
					
					temp=temp+ '<tr> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;background-color: orange;" >Total </td> '
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalTotBillIPD).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalToDiscIPD).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalTotalConcessionIPD).toFixed(2)+'</td> '
					//+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalNetBillIPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalTotPaidIPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalDepositIPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalTotRefundIPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalTotBalIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;" ></td> '
					+' </tr> ';	
					
					$("#container").html(temp);
				}
			 	
				
				
			
			 	// end ipd
			 	
			 	
			 	//start diagno
			 	
			 	 // for Diagno
				
				  var finalTotBillDiagno=0,finalTotPaidDiagno=0,finalToDiscDiagno=0,finalTotBalDiagno=0,finalTotRefundDiagno=0,finalTotalConcessionDiagno=0,finalNetBillDiagno=0,finalDepositDiagno=0;
				
			 	if(r.lstDaigno.length > 0){
			 		
			 		temp=temp+ '<tr> '
					+' <td style="height: 21.5px;background-color: violet;" >Daigno Type</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;" ></td> '
					//+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td> '
					+' </tr> ';	
					
					
					for(var i=0;i < r.lstDaigno.length;i++){
												
						var date=new Date(r.lstDaigno[i].createdDateTime).toLocaleString('en-GB');					
						var dd=date.split(',');
						
						var bdate=new Date(r.lstDaigno[i].billDateTime).toLocaleString('en-GB');					
						var bd=bdate.split(',');
						
						
						var patType="";
						var catType="";
						
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
						
						var spId=r.lstDaigno[i].chargesMasterSlaveId;
						
						if(spId > 0){					
							
							patType=r.lstDaigno[i].categoryName;
							catType="Sponsor";
			 			}else{
			 				
			 				patType="Self Paying";		
			 				catType="Hospital";
						}
						
						if(r.lstDaigno[i].bedName==null)
							{
								r.lstDaigno[i].bedName="-";
							}
						if(r.lstDaigno[i].doctorName=="null")
						{
							r.lstDaigno[i].doctorName="-";
						}
						
						var refDoc = r.lstDaigno[i].refDocPrefix+" "+r.lstDaigno[i].refDoctorName;
						
						var cmode="Cash";
						if(r.lstDaigno[i].totBal > 0){
							cmode="Credit";
						}
						
						
						temp=temp+ '<tr> '
						+' <td style="height: 21.5px;" >'+(i+1)+'</td> '
						+' <td style="height: 21.5px;" >'+bd[0] + " " + bd[1] +'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].billNo+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].mrnno+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].patientId+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].patientName+'</td>	'
						+' <td style="height: 21.5px;" >'+catType+'</td> '
						+' <td style="height: 21.5px;" >'+patType+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].doctorName+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].specilizationName+'</td>	'
						+' <td style="height: 21.5px;" >'+refDoc+'</td>	'
						+' <td style="height: 21.5px;" >'+cmode+'</td>	'
						+' <td style="height: 21.5px;" >'+parseFloat(totBill).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totdiscount).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].approveBy+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].approveRemark+'</td>	'	
	                	
	                	+' <td style="height: 21.5px;" >'+parseFloat(totalConcession).toFixed(2)+'</td> '
	                	//+' <td style="height: 21.5px;" >'+"Concession Approve"+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].netAmt+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totPaid).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].deposit+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totrefund).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totBal).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >-</td> '
	                		
						+' </tr> ';						
					}	
					
					
					
					
					temp=temp+ '<tr> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;background-color: violet;" >Total </td> '
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalTotBillDiagno).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalToDiscDiagno).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalTotalConcessionDiagno).toFixed(2)+'</td> '
					//+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalNetBillDiagno).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalTotPaidDiagno).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalDepositDiagno).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalTotRefundDiagno).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalTotBalDiagno).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;" ></td> '
					+' </tr> ';	
					
					$("#container").html(temp);
				}
			 	
				
				
			
			 	// end daigno
			 	
			 	
			}else if(callF == "1"){
				
				  var finalTotBillOPD=0,finalTotPaidOPD=0,finalToDiscOPD=0,finalTotBalOPD=0,finalTotRefundOPD=0,finalTotalConcessionOPD=0,finalNetBillOPD=0,finalDepositOPD=0;
				
			 	if(r.lstOpd.length > 0){
			 		
			 		temp=temp+ '<tr> '
					+' <td style="height: 21.5px;background-color: yellow;" >OPD Type</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;" ></td> '
					//+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;" ></td>'
					+' </tr> ';	
					
					
					for(var i=0;i < r.lstOpd.length;i++){
												
						var date=new Date(r.lstOpd[i].createdDateTime).toLocaleString('en-GB');					
						var dd=date.split(',');
						
						var bdate=new Date(r.lstOpd[i].billDateTime).toLocaleString('en-GB');					
						var bd=bdate.split(',');
						
						
						var patType="";
						var catType="";
						
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
						
						var spId=r.lstOpd[i].chargesMasterSlaveId;
						
						if(spId > 0){					
							
							patType=r.lstOpd[i].categoryName;
							catType="Sponsor";
			 			}else{
			 				
			 				patType="Self Paying";		
			 				catType="Hospital";
						}
						
						if(r.lstOpd[i].bedName==null)
							{
								r.lstOpd[i].bedName="-";
							}
						if(r.lstOpd[i].doctorName=="null")
						{
							r.lstOpd[i].doctorName="-";
						}
						
						var refDoc = r.lstOpd[i].refDocPrefix+" "+r.lstOpd[i].refDoctorName;
						
						var cmode="Cash";
						if(r.lstOpd[i].totBal > 0){
							cmode="Credit";
						}
						
						
						temp=temp+ '<tr> '
						+' <td style="height: 21.5px;" >'+(i+1)+'</td> '
						+' <td style="height: 21.5px;" >'+bd[0] + " " + bd[1] +'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].billNo+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].mrnno+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].patientId+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].patientName+'</td>	'
						+' <td style="height: 21.5px;" >'+catType+'</td> '
						+' <td style="height: 21.5px;" >'+patType+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].doctorName+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].specilizationName+'</td>	'
						+' <td style="height: 21.5px;" >'+refDoc+'</td>	'
						+' <td style="height: 21.5px;" >'+cmode+'</td>	'
						+' <td style="height: 21.5px;" >'+parseFloat(totBill).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totdiscount).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].approveBy+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].approveRemark+'</td>	'	
	                	+' <td style="height: 21.5px;" >'+parseFloat(totalConcession).toFixed(2)+'</td> '
	                	//+' <td style="height: 21.5px;" >'+"Concession Approve"+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].netAmt+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totPaid).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].deposit+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totrefund).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totBal).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstOpd[i].visitType+'</td>'
	                		
						+' </tr> ';						
					}	
					
					
					
					temp=temp+ '<tr> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;background-color: yellow;" >Total </td> '
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalTotBillOPD).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalToDiscOPD).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalTotalConcessionOPD).toFixed(2)+'</td> '
					//+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalNetBillOPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalTotPaidOPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalDepositOPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalTotRefundOPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalTotBalOPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;" >-</td> '
					+' </tr> ';		
					
					$("#container").html(temp);
				}
			 	
				
				
			}else if(callF == "2"){ // for IPD
				
				
					$("#visitType").hide();
				  var finalTotBillIPD=0,finalTotPaidIPD=0,finalToDiscIPD=0,finalTotBalIPD=0,finalTotRefundIPD=0,finalTotalConcessionIPD=0,finalNetBillIPD=0,finalDepositIPD=0;
				
			 	if(r.lstIpd.length > 0){
			 		
			 		temp=temp+ '<tr> '
					+' <td style="height: 21.5px;background-color: orange;" >IPD Type</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;" ></td> '
				//	+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' </tr> ';	
					
					
					for(var i=0;i < r.lstIpd.length;i++){
												
						var date=new Date(r.lstIpd[i].createdDateTime).toLocaleString('en-GB');					
						var dd=date.split(',');
						
						var bdate=new Date(r.lstIpd[i].billDateTime).toLocaleString('en-GB');					
						var bd=bdate.split(',');
						
						
						var patType="";
						var catType="";
						
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
						
						var spId=r.lstIpd[i].chargesMasterSlaveId;
						
						if(spId > 0){					
							
							patType=r.lstIpd[i].categoryName;
							catType="Sponsor";
			 			}else{
			 				
			 				patType="Self Paying";		
			 				catType="Hospital";
						}
						
						if(r.lstIpd[i].bedName==null)
							{
								r.lstIpd[i].bedName="-";
							}
						if(r.lstIpd[i].doctorName=="null")
						{
							r.lstIpd[i].doctorName="-";
						}
						
						var refDoc = r.lstIpd[i].refDocPrefix+" "+r.lstIpd[i].refDoctorName;
						
						var cmode="Cash";
						if(r.lstIpd[i].totBal > 0){
							cmode="Credit";
						}
						
						
						temp=temp+ '<tr> '
						+' <td style="height: 21.5px;" >'+(i+1)+'</td> '
						+' <td style="height: 21.5px;" >'+bd[0] + " " + bd[1] +'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].billNo+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].mrnno+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].patientId+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].patientName+'</td>	'
						+' <td style="height: 21.5px;" >'+catType+'</td> '
						+' <td style="height: 21.5px;" >'+patType+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].doctorName+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].specilizationName+'</td>	'
						+' <td style="height: 21.5px;" >'+refDoc+'</td>	'
						+' <td style="height: 21.5px;" >'+cmode+'</td>	'
						+' <td style="height: 21.5px;" >'+parseFloat(totBill).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totdiscount).toFixed(2)+'</td>'
					  	+' <td style="height: 21.5px;" >'+r.lstIpd[i].approveBy+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].approveRemark+'</td>	'	
	                	+' <td style="height: 21.5px;" >'+parseFloat(totalConcession).toFixed(2)+'</td> '
	                	//+' <td style="height: 21.5px;" >'+"Concession Approve"+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].netAmt+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totPaid).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].deposit+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totrefund).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totBal).toFixed(2)+'</td> '
	                		
						+' </tr> ';							
					}	
					
					
					
					
					temp=temp+ '<tr> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;background-color: orange;" >Total </td> '
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalTotBillIPD).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalToDiscIPD).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalTotalConcessionIPD).toFixed(2)+'</td> '
					//+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalNetBillIPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalTotPaidIPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalDepositIPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalTotRefundIPD).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalTotBalIPD).toFixed(2)+'</td>'		
					+' </tr> ';	
					
					$("#container").html(temp);
				}
			 	
				
				
			}else if(callF == "3"){ // for Diagno
				
				$("#visitType").hide();
				  var finalTotBillDiagno=0,finalTotPaidDiagno=0,finalToDiscDiagno=0,finalTotBalDiagno=0,finalTotRefundDiagno=0,finalTotalConcessionDiagno=0,finalNetBillDiagno=0,finalDepositDiagno=0;
				
			 	if(r.lstDaigno.length > 0){
			 		
			 		temp=temp+ '<tr> '
					+' <td style="height: 21.5px;background-color: violet;" >Daigno Type</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;" ></td> '
					//+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' <td style="height: 21.5px;" ></td>'		
					+' </tr> ';	
					
					
					for(var i=0;i < r.lstDaigno.length;i++){
												
						var date=new Date(r.lstDaigno[i].createdDateTime).toLocaleString('en-GB');					
						var dd=date.split(',');
						
						var bdate=new Date(r.lstDaigno[i].billDateTime).toLocaleString('en-GB');					
						var bd=bdate.split(',');
						
						
						var patType="";
						var catType="";
						
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
						
						var spId=r.lstDaigno[i].chargesMasterSlaveId;
						
						if(spId > 0){					
							
							patType=r.lstDaigno[i].categoryName;
							catType="Sponsor";
			 			}else{
			 				
			 				patType="Self Paying";		
			 				catType="Hospital";
						}
						
						if(r.lstDaigno[i].bedName==null)
							{
								r.lstDaigno[i].bedName="-";
							}
						if(r.lstDaigno[i].doctorName=="null")
						{
							r.lstDaigno[i].doctorName="-";
						}
						
						var refDoc = r.lstDaigno[i].refDocPrefix+" "+r.lstDaigno[i].refDoctorName;
						
						var cmode="Cash";
						if(r.lstDaigno[i].totBal > 0){
							cmode="Credit";
						}
						
						
						temp=temp+ '<tr> '
						+' <td style="height: 21.5px;" >'+(i+1)+'</td> '
						+' <td style="height: 21.5px;" >'+bd[0] + " " + bd[1] +'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].billNo+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].mrnno+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].patientId+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].patientName+'</td>	'
						+' <td style="height: 21.5px;" >'+catType+'</td> '
						+' <td style="height: 21.5px;" >'+patType+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].doctorName+'</td>	'
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].specilizationName+'</td>	'
						+' <td style="height: 21.5px;" >'+refDoc+'</td>	'
						+' <td style="height: 21.5px;" >'+cmode+'</td>	'
						+' <td style="height: 21.5px;" >'+parseFloat(totBill).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totdiscount).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].approveBy+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].approveRemark+'</td>	'	
	                	+' <td style="height: 21.5px;" >'+parseFloat(totalConcession).toFixed(2)+'</td> '
	                	//+' <td style="height: 21.5px;" >'+"Concession Approve"+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].netAmt+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totPaid).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].deposit+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totrefund).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totBal).toFixed(2)+'</td> '
	                		
						+' </tr> ';					
					}	
					
					
					
					
					temp=temp+ '<tr> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td>	'
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;background-color: violet;" >Total </td> '
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalTotBillDiagno).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalToDiscDiagno).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> ' 
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalTotalConcessionDiagno).toFixed(2)+'</td> '
					//+' <td style="height: 21.5px;" ></td>'	
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalNetBillDiagno).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalTotPaidDiagno).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalDepositDiagno).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalTotRefundDiagno).toFixed(2)+'</td>'		
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalTotBalDiagno).toFixed(2)+'</td>'		
					+' </tr> ';	
					
					$("#container").html(temp);
				}
			 	
				
				
			}
 		}
	});	
}
//added by sandip 
function getDateFormat(fdate, tdate)
{
	farr = fdate.split('/');
	tarr = tdate.split('/');
	
	fdate = farr[2]+'-'+farr[1]+'-'+farr[0];
	tdate = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	return fdate+':'+tdate;
}