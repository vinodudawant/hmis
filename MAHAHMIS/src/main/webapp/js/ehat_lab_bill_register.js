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
		url 	: "ehat/billregisterreport/getLabBillRegisterReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			$("#container").html(" ");
			var temp="";
			var grandFinalBill=0,grandFinalPaid=0,grandFinalDiscAmt=0,grandFinalToatlBal=0,grandFinalRefundAMt=0,grandFinalConcession=0,grandFinalNetAmt=0,grandFinalDepositAmt=0;
			if (callF == "0"){
				// start opd 

				
				  var finalTotBillOPD=0,finalTotPaidOPD=0,finalToDiscOPD=0,finalTotBalOPD=0,finalTotRefundOPD=0,finalTotalConcessionOPD=0,finalNetBillOPD=0,finalDepositOPD=0,finalPathoBillAmtOPD=0,finalPathoDiscountAmtOPD=0,
				  finalPathoConcessionAMtOPD=0,finalPathoNetAMtOPD=0,finalPathoPaidAmtOPD=0,finalPathoDuesAmtOPD=0,finalPathoRefundAmtOPD=0,
				  finalHospitalBillAmtOPD=0,finalHospitalDiscountAmtOPD=0, finalHospitalConcessionAMtOPD=0,finalHospitalNetAMtOPD=0,finalHospitalPaidAmtOPD=0,finalHospitalDuesAmtOPD=0,finalHospitalRefundAmtOPD=0;
				
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
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
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
						finalPathoBillAmtOPD=Number(finalPathoBillAmtOPD)+Number(r.lstOpd[i].pathoBillAmt);
						finalPathoDiscountAmtOPD=Number(finalPathoDiscountAmtOPD)+Number(r.lstOpd[i].pathoDiscountAmt);
						finalPathoConcessionAMtOPD=Number(finalPathoConcessionAMtOPD)+Number(r.lstOpd[i].pathoConcessionAmt);
						finalPathoNetAMtOPD=Number(finalPathoNetAMtOPD)+Number(r.lstOpd[i].pathoNetAmt);
						finalPathoPaidAmtOPD=Number(finalPathoPaidAmtOPD)+Number(r.lstOpd[i].pathoPaidAmt);
						finalPathoDuesAmtOPD=Number(finalPathoDuesAmtOPD)+Number(r.lstOpd[i].pathoDuesAmt);
						finalPathoRefundAmtOPD=Number(finalPathoRefundAmtOPD)+Number(r.lstOpd[i].pathoRefundAmt);
//						finalPathoRefundAmtOPD=parseFloat(0.0).toFixed(2);
						finalHospitalBillAmtOPD=Number(finalHospitalBillAmtOPD)+(parseFloat(totBill).toFixed(2)-(r.lstOpd[i].pathoBillAmt));
						finalHospitalDiscountAmtOPD=Number(finalHospitalDiscountAmtOPD)+(parseFloat(totdiscount).toFixed(2)-(r.lstOpd[i].pathoDiscountAmt));
						finalHospitalConcessionAMtOPD=Number(finalHospitalConcessionAMtOPD)+(parseFloat(totalConcession).toFixed(2)-(r.lstOpd[i].pathoConcessionAmt));
						finalHospitalNetAMtOPD=Number(finalHospitalNetAMtOPD)+((r.lstOpd[i].netAmt)-(r.lstOpd[i].pathoNetAmt));
						finalHospitalPaidAmtOPD=Number(finalHospitalPaidAmtOPD)+(parseFloat(totPaid).toFixed(2)-(r.lstOpd[i].pathoPaidAmt));
						finalHospitalRefundAmtOPD=Number(finalHospitalRefundAmtOPD)+(parseFloat(totrefund).toFixed(2)-(r.lstOpd[i].pathoRefundAmt));
						//finalHospitalRefundAmtOPD=parseFloat(0.0).toFixed(2);
						finalHospitalDuesAmtOPD=Number(finalHospitalDuesAmtOPD)+(parseFloat(totBal).toFixed(2)-(r.lstOpd[i].pathoDuesAmt));
						
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
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoBillAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoDiscountAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoConcessionAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoNetAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoPaidAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoRefundAmt).toFixed(2)+'</td> '
//						+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoDuesAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totBill)-Number(r.lstOpd[i].pathoBillAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totdiscount)-Number(r.lstOpd[i].pathoDiscountAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totalConcession)-Number(r.lstOpd[i].pathoConcessionAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(r.lstOpd[i].netAmt)-Number(r.lstOpd[i].pathoNetAmt))).toFixed(2)+'</td> '
						if(parseFloat((Number(totPaid)-Number(r.lstOpd[i].pathoPaidAmt))).toFixed(2) < 1){
							temp=temp	+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						}else{
							temp=temp +' <td style="height: 21.5px;" >'+parseFloat((Number(totPaid)-Number(r.lstOpd[i].pathoPaidAmt))).toFixed(2)+'</td> '
						}
						
						
						temp=temp +' <td style="height: 21.5px;" >'+parseFloat((Number(totrefund)-Number(r.lstOpd[i].pathoRefundAmt))).toFixed(2)+'</td> '
//						' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((parseFloat(totBal).toFixed(2)-parseFloat(r.lstOpd[i].pathoDuesAmt).toFixed(2))).toFixed(2)+'</td> '
	                		
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
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoBillAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoDiscountAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoConcessionAMtOPD).toFixed(2)+'</td>' 
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoNetAMtOPD).toFixed(2)+'</td>' 
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoPaidAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoRefundAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoDuesAmtOPD).toFixed(2)+'</td>'
					
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalBillAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalDiscountAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalConcessionAMtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalNetAMtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalPaidAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalRefundAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalDuesAmtOPD).toFixed(2)+'</td>'
					+' </tr> ';	
					
					$("#container").html(temp);
				}
			 	
				
			
				// end opd
			 	
			 	// start ipd 
			 	 // for IPD
				
				  var finalTotBillIPD=0,finalTotPaidIPD=0,finalToDiscIPD=0,finalTotBalIPD=0,finalTotRefundIPD=0,finalTotalConcessionIPD=0,finalNetBillIPD=0,finalDepositIPD=0,finalPathoBillAmtIPD=0,finalPathoDiscountAmtIPD=0,
				  finalPathoConcessionAMtIPD=0,finalPathoNetAMtIPD=0,finalPathoPaidAmtIPD=0,finalPathoDuesAmtIPD=0,finalPathoRefundAmtIPD=0,
				  finalHospitalBillAmtIPD=0,finalHospitalDiscountAmtIPD=0, finalHospitalConcessionAMtIPD=0,finalHospitalNetAMtIPD=0,finalHospitalPaidAmtIPD=0,finalHospitalDuesAmtIPD=0,finalHospitalRefundAmtIPD=0;
				
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
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
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
						finalPathoBillAmtIPD=Number(finalPathoBillAmtIPD)+Number(r.lstIpd[i].pathoBillAmt);
						finalPathoDiscountAmtIPD=Number(finalPathoDiscountAmtIPD)+Number(r.lstIpd[i].pathoDiscountAmt);
						finalPathoConcessionAMtIPD=Number(finalPathoConcessionAMtIPD)+Number(r.lstIpd[i].pathoConcessionAmt);
						finalPathoNetAMtIPD=Number(finalPathoNetAMtIPD)+Number(r.lstIpd[i].pathoNetAmt);
						finalPathoPaidAmtIPD=Number(finalPathoPaidAmtIPD)+Number(r.lstIpd[i].pathoPaidAmt);
					//	finalPathoDuesAmtIPD=Number(finalPathoDuesAmtIPD)+Number(r.lstIpd[i].pathoDuesAmt);
                        if((r.lstIpd[i].pathoDuesAmt).toFixed(2) < 1){
						
                       	 finalPathoDuesAmtIPD =Number(finalPathoDuesAmtIPD)+Number(0);
					      }else{
						finalPathoDuesAmtIPD =Number(finalPathoDuesAmtIPD)+Number(r.lstIpd[i].pathoDuesAmt);
					    }
					//	finalPathoRefundAmtIPD=Number(finalPathoRefundAmtIPD)+Number(r.lstIpd[i].pathoRefundAmt);
						finalPathoRefundAmtIPD=parseFloat(0.0).toFixed(2);
						finalHospitalBillAmtIPD=Number(finalHospitalBillAmtIPD)+(parseFloat(totBill).toFixed(2)-(r.lstIpd[i].pathoBillAmt));
						finalHospitalDiscountAmtIPD=Number(finalHospitalDiscountAmtIPD)+(parseFloat(totdiscount).toFixed(2)-(r.lstIpd[i].pathoDiscountAmt));
						finalHospitalConcessionAMtIPD=Number(finalHospitalConcessionAMtIPD)+(parseFloat(totalConcession).toFixed(2)-(r.lstIpd[i].pathoConcessionAmt));
						finalHospitalNetAMtIPD=Number(finalHospitalNetAMtIPD)+((r.lstIpd[i].netAmt)-(r.lstIpd[i].pathoNetAmt));
						finalHospitalPaidAmtIPD=Number(finalHospitalPaidAmtIPD)+(parseFloat(totPaid).toFixed(2)-(r.lstIpd[i].pathoPaidAmt));
						finalHospitalRefundAmtIPD=Number(finalHospitalRefundAmtIPD)+(parseFloat(totrefund).toFixed(2)-(r.lstIpd[i].pathoRefundAmt));
						//finalHospitalRefundAmtIPD=parseFloat(0.0).toFixed(2);
						finalHospitalDuesAmtIPD=Number(finalHospitalDuesAmtIPD)+(parseFloat(totBal).toFixed(2)-(r.lstIpd[i].pathoDuesAmt));
						
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
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].deposit).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totrefund).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totBal).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstIpd[i].visitType+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoBillAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoDiscountAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoConcessionAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoNetAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoPaidAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoRefundAmt).toFixed(2)+'</td> '
						//+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						//+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoDuesAmt).toFixed(2)+'</td> '
						if((r.lstIpd[i].pathoDuesAmt).toFixed(2) < 1){
							
							temp=temp +' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						}else{
							temp=temp	+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoDuesAmt).toFixed(2)+'</td> '
						}
						
						temp=temp	 +' <td style="height: 21.5px;" >'+parseFloat((Number(totBill)-Number(r.lstIpd[i].pathoBillAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totdiscount)-Number(r.lstIpd[i].pathoDiscountAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totalConcession)-Number(r.lstIpd[i].pathoConcessionAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(r.lstIpd[i].netAmt)-Number(r.lstIpd[i].pathoNetAmt))).toFixed(2)+'</td> '
					    +' <td style="height: 21.5px;" >'+parseFloat((Number(totPaid-totrefund)-Number(r.lstIpd[i].pathoPaidAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totrefund)-Number(r.lstIpd[i].pathoRefundAmt))).toFixed(2)+'</td> '
						//+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
					    
					    +' <td style="height: 21.5px;" >'+parseFloat((parseFloat(totBal).toFixed(2)-parseFloat(r.lstIpd[i].pathoDuesAmt).toFixed(2))).toFixed(2)+'</td> '
						
	                		
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
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoBillAmtIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoDiscountAmtIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoConcessionAMtIPD).toFixed(2)+'</td>' 
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoNetAMtIPD).toFixed(2)+'</td>' 
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoPaidAmtIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoRefundAmtIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoDuesAmtIPD).toFixed(2)+'</td>'
					
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalBillAmtIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalDiscountAmtIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalConcessionAMtIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalNetAMtIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalPaidAmtIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalRefundAmtIPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalDuesAmtIPD).toFixed(2)+'</td>'
				
					+' </tr> ';	
					
					$("#container").html(temp);
				}
			 	
				
				
			
			 	// end ipd
			 	
			 	
			 	//start diagno
			 	
			 	 // for Diagno
				
				  var finalTotBillDiagno=0,finalTotPaidDiagno=0,finalToDiscDiagno=0,finalTotBalDiagno=0,finalTotRefundDiagno=0,finalTotalConcessionDiagno=0,finalNetBillDiagno=0,finalDepositDiagno=0,finalPathoBillAmtDiagno=0,finalPathoDiscountAmtDiagno=0,
				  finalPathoConcessionAMtDiagno=0,finalPathoNetAMtDiagno=0,finalPathoPaidAmtDiagno=0,finalPathoDuesAmtDiagno=0,finalPathoRefundAmtDiagno=0,
				  finalHospitalBillAmtDiagno=0,finalHospitalDiscountAmtDiagno=0, finalHospitalConcessionAMtDiagno=0,finalHospitalNetAMtDiagno=0,finalHospitalPaidAmtDiagno=0,finalHospitalDuesAmtDiagno=0,finalHospitalRefundAmtDiagno=0;
				
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
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
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
						
						finalPathoBillAmtDiagno=Number(finalPathoBillAmtDiagno)+Number(r.lstDaigno[i].pathoBillAmt);
						finalPathoDiscountAmtDiagno=Number(finalPathoDiscountAmtDiagno)+Number(r.lstDaigno[i].pathoDiscountAmt);
						finalPathoConcessionAMtDiagno=Number(finalPathoConcessionAMtDiagno)+Number(r.lstDaigno[i].pathoConcessionAmt);
						finalPathoNetAMtDiagno=Number(finalPathoNetAMtDiagno)+Number(r.lstDaigno[i].pathoNetAmt);
						finalPathoPaidAmtDiagno=Number(finalPathoPaidAmtDiagno)+Number(r.lstDaigno[i].pathoPaidAmt);
						finalPathoDuesAmtDiagno=Number(finalPathoDuesAmtDiagno)+Number(r.lstDaigno[i].pathoDuesAmt);
						finalPathoRefundAmtDiagno=Number(finalPathoRefundAmtDiagno)+Number(r.lstDaigno[i].pathoRefundAmt);
						//finalPathoRefundAmtDiagno=parseFloat(0.0).toFixed(2);
						
						finalHospitalBillAmtDiagno=Number(finalHospitalBillAmtDiagno)+(parseFloat(totBill).toFixed(2)-(r.lstDaigno[i].pathoBillAmt));
						finalHospitalDiscountAmtDiagno=Number(finalHospitalDiscountAmtDiagno)+(parseFloat(totdiscount).toFixed(2)-(r.lstDaigno[i].pathoDiscountAmt));
						finalHospitalConcessionAMtDiagno=Number(finalHospitalConcessionAMtDiagno)+(parseFloat(totalConcession).toFixed(2)-(r.lstDaigno[i].pathoConcessionAmt));
						finalHospitalNetAMtDiagno=Number(finalHospitalNetAMtDiagno)+((r.lstDaigno[i].netAmt)-(r.lstDaigno[i].pathoNetAmt));
						finalHospitalPaidAmtDiagno=Number(finalHospitalPaidAmtDiagno)+(parseFloat(totPaid).toFixed(2)-(r.lstDaigno[i].pathoPaidAmt));
						finalHospitalRefundAmtDiagno=Number(finalHospitalRefundAmtDiagno)+(parseFloat(totrefund).toFixed(2)-(r.lstDaigno[i].pathoRefundAmt));
						//finalHospitalRefundAmtDiagno=parseFloat(0.0).toFixed(2);
						finalHospitalDuesAmtDiagno=Number(finalHospitalDuesAmtDiagno)+(parseFloat(totBal).toFixed(2)-(r.lstDaigno[i].pathoDuesAmt));
						
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
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].deposit).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totrefund).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(totBal).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].visitType+'</td> '
						
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoBillAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoDiscountAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoConcessionAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoNetAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoPaidAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoRefundAmt).toFixed(2)+'</td> '
						//+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoDuesAmt).toFixed(2)+'</td> '
						
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totBill)-Number(r.lstDaigno[i].pathoBillAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totdiscount)-Number(r.lstDaigno[i].pathoDiscountAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totalConcession)-Number(r.lstDaigno[i].pathoConcessionAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(r.lstDaigno[i].netAmt)-Number(r.lstDaigno[i].pathoNetAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totPaid)-Number(r.lstDaigno[i].pathoPaidAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totrefund)-Number(r.lstDaigno[i].pathoRefundAmt))).toFixed(2)+'</td> '
						//+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((parseFloat(totBal).toFixed(2)-parseFloat(r.lstDaigno[i].pathoDuesAmt).toFixed(2))).toFixed(2)+'</td> '
	                		
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
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoBillAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoDiscountAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoConcessionAMtDiagno).toFixed(2)+'</td>' 
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoNetAMtDiagno).toFixed(2)+'</td>' 
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoPaidAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoRefundAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoDuesAmtDiagno).toFixed(2)+'</td>'
					
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalBillAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalDiscountAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalConcessionAMtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalNetAMtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalPaidAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalRefundAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalDuesAmtDiagno).toFixed(2)+'</td>'
					+' </tr> ';	
					
					$("#container").html(temp);
				}
			 	
				
				
			
			 	// end daigno
			 	
			 	
			}else if(callF == "1"){		
				  var finalTotBillOPD=0,finalTotPaidOPD=0,finalToDiscOPD=0,finalTotBalOPD=0,finalTotRefundOPD=0,finalTotalConcessionOPD=0,finalNetBillOPD=0,finalDepositOPD=0,finalPathoBillAmtOPD=0,finalPathoDiscountAmtOPD=0,
				  finalPathoConcessionAMtOPD=0,finalPathoNetAMtOPD=0,finalPathoPaidAmtOPD=0,finalPathoDuesAmtOPD=0,finalPathoRefundAmtOPD=0,
				  finalHospitalBillAmtOPD=0,finalHospitalDiscountAmtOPD=0, finalHospitalConcessionAMtOPD=0,finalHospitalNetAMtOPD=0,finalHospitalPaidAmtOPD=0,finalHospitalDuesAmtOPD=0,finalHospitalRefundAmtOPD=0;
				
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
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
					+' <td style="height: 21.5px;" ></td>'
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
						finalPathoBillAmtOPD=Number(finalPathoBillAmtOPD)+Number(r.lstOpd[i].pathoBillAmt);
						finalPathoDiscountAmtOPD=Number(finalPathoDiscountAmtOPD)+Number(r.lstOpd[i].pathoDiscountAmt);
						finalPathoConcessionAMtOPD=Number(finalPathoConcessionAMtOPD)+Number(r.lstOpd[i].pathoConcessionAmt);
						finalPathoNetAMtOPD=Number(finalPathoNetAMtOPD)+Number(r.lstOpd[i].pathoNetAmt);
						finalPathoPaidAmtOPD=Number(finalPathoPaidAmtOPD)+Number(r.lstOpd[i].pathoPaidAmt);
						finalPathoDuesAmtOPD=Number(finalPathoDuesAmtOPD)+Number(r.lstOpd[i].pathoDuesAmt);
						finalPathoRefundAmtOPD=Number(finalPathoRefundAmtOPD)+Number(r.lstOpd[i].pathoRefundAmt);
					//	finalPathoRefundAmtOPD=parseFloat(0.0).toFixed(2);

						finalHospitalBillAmtOPD=Number(finalHospitalBillAmtOPD)+(parseFloat(totBill).toFixed(2)-(r.lstOpd[i].pathoBillAmt));
						finalHospitalDiscountAmtOPD=Number(finalHospitalDiscountAmtOPD)+(parseFloat(totdiscount).toFixed(2)-(r.lstOpd[i].pathoDiscountAmt));
						finalHospitalConcessionAMtOPD=Number(finalHospitalConcessionAMtOPD)+(parseFloat(totalConcession).toFixed(2)-(r.lstOpd[i].pathoConcessionAmt));
						finalHospitalNetAMtOPD=Number(finalHospitalNetAMtOPD)+((r.lstOpd[i].netAmt)-(r.lstOpd[i].pathoNetAmt));
						finalHospitalPaidAmtOPD=Number(finalHospitalPaidAmtOPD)+(parseFloat(totPaid).toFixed(2)-(r.lstOpd[i].pathoPaidAmt));
						finalHospitalRefundAmtOPD=Number(finalHospitalRefundAmtOPD)+(parseFloat(totrefund).toFixed(2)-(r.lstOpd[i].pathoRefundAmt));
						//finalHospitalRefundAmtOPD=parseFloat(0.0).toFixed(2);
						finalHospitalDuesAmtOPD=Number(finalHospitalDuesAmtOPD)+(parseFloat(totBal).toFixed(2)-(r.lstOpd[i].pathoDuesAmt));
						
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
					
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoBillAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoDiscountAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoConcessionAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoNetAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoPaidAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoRefundAmt).toFixed(2)+'</td> '
					//	+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstOpd[i].pathoDuesAmt).toFixed(2)+'</td> '
						
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totBill)-Number(r.lstOpd[i].pathoBillAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totdiscount)-Number(r.lstOpd[i].pathoDiscountAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totalConcession)-Number(r.lstOpd[i].pathoConcessionAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(r.lstOpd[i].netAmt)-Number(r.lstOpd[i].pathoNetAmt))).toFixed(2)+'</td> '
					//	+' <td style="height: 21.5px;" >'+parseFloat((Number(totPaid)-Number(r.lstOpd[i].pathoPaidAmt))).toFixed(2)+'</td> '
						
						if(parseFloat((Number(totPaid)-Number(r.lstOpd[i].pathoPaidAmt))).toFixed(2) < 1){
							temp=temp	+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						}else{
							temp=temp +' <td style="height: 21.5px;" >'+parseFloat((Number(totPaid)-Number(r.lstOpd[i].pathoPaidAmt))).toFixed(2)+'</td> '
						}
						
						temp=temp	+' <td style="height: 21.5px;" >'+parseFloat((Number(totrefund)-Number(r.lstOpd[i].pathoRefundAmt))).toFixed(2)+'</td> '
			 	//temp=temp	+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						
						+' <td style="height: 21.5px;" >'+parseFloat((parseFloat(totBal).toFixed(2)-parseFloat(r.lstOpd[i].pathoDuesAmt).toFixed(2))).toFixed(2)+'</td> '
	                		
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
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoBillAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoDiscountAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoConcessionAMtOPD).toFixed(2)+'</td>' 
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoNetAMtOPD).toFixed(2)+'</td>' 
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoPaidAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoRefundAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalPathoDuesAmtOPD).toFixed(2)+'</td>'
					
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalBillAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalDiscountAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalConcessionAMtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalNetAMtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalPaidAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalRefundAmtOPD).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: yellow;" >'+parseFloat(finalHospitalDuesAmtOPD).toFixed(2)+'</td>'
					+' </tr> ';	
					
					$("#container").html(temp);
				  }
			 	}else if(callF == "2"){
					  var finalTotBillIPD=0,finalTotPaidIPD=0,finalToDiscIPD=0,finalTotBalIPD=0,finalTotRefundIPD=0,finalTotalConcessionIPD=0,finalNetBillIPD=0,finalDepositIPD=0,finalPathoBillAmtIPD=0,finalPathoDiscountAmtIPD=0,
					  finalPathoConcessionAMtIPD=0,finalPathoNetAMtIPD=0,finalPathoPaidAmtIPD=0,finalPathoDuesAmtIPD=0.0,finalPathoRefundAmtIPD=0,
					  finalHospitalBillAmtIPD=0,finalHospitalDiscountAmtIPD=0, finalHospitalConcessionAMtIPD=0,finalHospitalNetAMtIPD=0,finalHospitalPaidAmtIPD=0,finalHospitalDuesAmtIPD=0,finalHospitalRefundAmtIPD=0;
					
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
						+' <td style="height: 21.5px;" ></td>'
						+' <td style="height: 21.5px;" ></td>'
						+' <td style="height: 21.5px;" ></td>'
						+' <td style="height: 21.5px;" ></td>'
						+' <td style="height: 21.5px;" ></td>'
						+' <td style="height: 21.5px;" ></td>'
						+' <td style="height: 21.5px;" ></td>'
						+' <td style="height: 21.5px;" ></td>'
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
							finalPathoBillAmtIPD=Number(finalPathoBillAmtIPD)+Number(r.lstIpd[i].pathoBillAmt);
							finalPathoDiscountAmtIPD=Number(finalPathoDiscountAmtIPD)+Number(r.lstIpd[i].pathoDiscountAmt);
							finalPathoConcessionAMtIPD=Number(finalPathoConcessionAMtIPD)+Number(r.lstIpd[i].pathoConcessionAmt);
							finalPathoNetAMtIPD=Number(finalPathoNetAMtIPD)+Number(r.lstIpd[i].pathoNetAmt);
							finalPathoPaidAmtIPD=Number(finalPathoPaidAmtIPD)+Number(r.lstIpd[i].pathoPaidAmt);
							//finalPathoDuesAmtIPD=finalPathoDuesAmtIPD+parseFloat(r.lstIpd[i].pathoDuesAmt).toFixed(2);
							
                                 if((r.lstIpd[i].pathoDuesAmt).toFixed(2) < 1){
								
                                	 finalPathoDuesAmtIPD =Number(finalPathoDuesAmtIPD)+Number(0);
							}else{
								finalPathoDuesAmtIPD =Number(finalPathoDuesAmtIPD)+Number(r.lstIpd[i].pathoDuesAmt);
							}
							
			
							//finalPathoRefundAmtIPD=Number(finalPathoRefundAmtIPD)+Number(r.lstIpd[i].pathoRefundAmt);
							finalPathoRefundAmtIPD=parseFloat(0.0).toFixed(2);
							finalHospitalBillAmtIPD=Number(finalHospitalBillAmtIPD)+(parseFloat(totBill).toFixed(2)-(r.lstIpd[i].pathoBillAmt));
							finalHospitalDiscountAmtIPD=Number(finalHospitalDiscountAmtIPD)+(parseFloat(totdiscount).toFixed(2)-(r.lstIpd[i].pathoDiscountAmt));
							finalHospitalConcessionAMtIPD=Number(finalHospitalConcessionAMtIPD)+(parseFloat(totalConcession).toFixed(2)-(r.lstIpd[i].pathoConcessionAmt));
							finalHospitalNetAMtIPD=Number(finalHospitalNetAMtIPD)+((r.lstIpd[i].netAmt)-(r.lstIpd[i].pathoNetAmt));
							finalHospitalPaidAmtIPD=Number(finalHospitalPaidAmtIPD)+(parseFloat(totPaid).toFixed(2)-(r.lstIpd[i].pathoPaidAmt));
							finalHospitalRefundAmtIPD=Number(finalHospitalRefundAmtIPD)+(parseFloat(totrefund).toFixed(2)-(r.lstIpd[i].pathoRefundAmt));
							//finalHospitalRefundAmtIPD=parseFloat(0.0).toFixed(2);
							finalHospitalDuesAmtIPD=Number(finalHospitalDuesAmtIPD)+(parseFloat(totBal).toFixed(2)-(r.lstIpd[i].pathoDuesAmt));
							
							
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
							+' <td style="height: 21.5px;" >'+r.lstIpd[i].visitType+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoBillAmt).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoDiscountAmt).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoConcessionAmt).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoNetAmt).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoPaidAmt).toFixed(2)+'</td> '
							//+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoRefundAmt).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
							
							if((r.lstIpd[i].pathoDuesAmt).toFixed(2) < 1){
								
								temp=temp +' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
							}else{
								temp=temp	+' <td style="height: 21.5px;" >'+parseFloat(r.lstIpd[i].pathoDuesAmt).toFixed(2)+'</td> '
							}
							
						temp=temp	+' <td style="height: 21.5px;" >'+parseFloat((Number(totBill)-Number(r.lstIpd[i].pathoBillAmt))).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat((Number(totdiscount)-Number(r.lstIpd[i].pathoDiscountAmt))).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat((Number(totalConcession)-Number(r.lstIpd[i].pathoConcessionAmt))).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat((Number(r.lstIpd[i].netAmt)-Number(r.lstIpd[i].pathoNetAmt))).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat((Number(totPaid-totrefund)-Number(r.lstIpd[i].pathoPaidAmt))).toFixed(2)+'</td> '
							//+' <td style="height: 21.5px;" >'+parseFloat((Number(totrefund)-Number(r.lstIpd[i].pathoRefundAmt))).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
							+' <td style="height: 21.5px;" >'+parseFloat((parseFloat(totBal).toFixed(2)-parseFloat(r.lstIpd[i].pathoDuesAmt).toFixed(2))).toFixed(2)+'</td> '
		                		
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
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoBillAmtIPD).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoDiscountAmtIPD).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoConcessionAMtIPD).toFixed(2)+'</td>' 
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoNetAMtIPD).toFixed(2)+'</td>' 
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoPaidAmtIPD).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoRefundAmtIPD).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalPathoDuesAmtIPD).toFixed(2)+'</td>'
						
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalBillAmtIPD).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalDiscountAmtIPD).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalConcessionAMtIPD).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalNetAMtIPD).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalPaidAmtIPD).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalRefundAmtIPD).toFixed(2)+'</td>'
						+' <td style="height: 21.5px;background-color: orange;" >'+parseFloat(finalHospitalDuesAmtIPD).toFixed(2)+'</td>'
						
						+' </tr> ';	
						
						$("#container").html(temp);
					}
				}else if(callF == "3"){	 
					var finalTotBillDiagno=0,finalTotPaidDiagno=0,finalToDiscDiagno=0,finalTotBalDiagno=0,finalTotRefundDiagno=0,finalTotalConcessionDiagno=0,finalNetBillDiagno=0,finalDepositDiagno=0,finalPathoBillAmtDiagno=0,finalPathoDiscountAmtDiagno=0,
				  finalPathoConcessionAMtDiagno=0,finalPathoNetAMtDiagno=0,finalPathoPaidAmtDiagno=0,finalPathoDuesAmtDiagno=0,finalPathoRefundAmtDiagno=0,
				  finalHospitalBillAmtDiagno=0,finalHospitalDiscountAmtDiagno=0, finalHospitalConcessionAMtDiagno=0,finalHospitalNetAMtDiagno=0,finalHospitalPaidAmtDiagno=0,finalHospitalDuesAmtDiagno=0,finalHospitalRefundAmtDiagno=0;
				
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
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
					+' <td style="height: 21.5px;" ></td> '
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
						
						finalPathoBillAmtDiagno=Number(finalPathoBillAmtDiagno)+Number(r.lstDaigno[i].pathoBillAmt);
						finalPathoDiscountAmtDiagno=Number(finalPathoDiscountAmtDiagno)+Number(r.lstDaigno[i].pathoDiscountAmt);
						finalPathoConcessionAMtDiagno=Number(finalPathoConcessionAMtDiagno)+Number(r.lstDaigno[i].pathoConcessionAmt);
						finalPathoNetAMtDiagno=Number(finalPathoNetAMtDiagno)+Number(r.lstDaigno[i].pathoNetAmt);
						finalPathoPaidAmtDiagno=Number(finalPathoPaidAmtDiagno)+Number(r.lstDaigno[i].pathoPaidAmt);
						finalPathoDuesAmtDiagno=Number(finalPathoDuesAmtDiagno)+Number(r.lstDaigno[i].pathoDuesAmt);
						finalPathoRefundAmtDiagno=Number(finalPathoRefundAmtDiagno)+Number(r.lstDaigno[i].pathoRefundAmt);
//						finalPathoRefundAmtDiagno=parseFloat(0.0).toFixed(2);
						
						finalHospitalBillAmtDiagno=Number(finalHospitalBillAmtDiagno)+(parseFloat(totBill).toFixed(2)-(r.lstDaigno[i].pathoBillAmt));
						finalHospitalDiscountAmtDiagno=Number(finalHospitalDiscountAmtDiagno)+(parseFloat(totdiscount).toFixed(2)-(r.lstDaigno[i].pathoDiscountAmt));
						finalHospitalConcessionAMtDiagno=Number(finalHospitalConcessionAMtDiagno)+(parseFloat(totalConcession).toFixed(2)-(r.lstDaigno[i].pathoConcessionAmt));
						finalHospitalNetAMtDiagno=Number(finalHospitalNetAMtDiagno)+((r.lstDaigno[i].netAmt)-(r.lstDaigno[i].pathoNetAmt));
						finalHospitalPaidAmtDiagno=Number(finalHospitalPaidAmtDiagno)+(parseFloat(totPaid).toFixed(2)-(r.lstDaigno[i].pathoPaidAmt));
						finalHospitalRefundAmtDiagno=Number(finalHospitalRefundAmtDiagno)+(parseFloat(totrefund).toFixed(2)-(r.lstDaigno[i].pathoRefundAmt));
//						finalHospitalRefundAmtDiagno=parseFloat(0.0).toFixed(2);
						
						finalHospitalDuesAmtDiagno=Number(finalHospitalDuesAmtDiagno)+(parseFloat(totBal).toFixed(2)-(r.lstDaigno[i].pathoDuesAmt));
						
						
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
						+' <td style="height: 21.5px;" >'+r.lstDaigno[i].visitType+'</td> '
						
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoBillAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoDiscountAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoConcessionAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoNetAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoPaidAmt).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoRefundAmt).toFixed(2)+'</td> '
						//+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat(r.lstDaigno[i].pathoDuesAmt).toFixed(2)+'</td> '
						
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totBill)-Number(r.lstDaigno[i].pathoBillAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totdiscount)-Number(r.lstDaigno[i].pathoDiscountAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totalConcession)-Number(r.lstDaigno[i].pathoConcessionAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(r.lstDaigno[i].netAmt)-Number(r.lstDaigno[i].pathoNetAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totPaid)-Number(r.lstDaigno[i].pathoPaidAmt))).toFixed(2)+'</td> '
						+' <td style="height: 21.5px;" >'+parseFloat((Number(totrefund)-Number(r.lstDaigno[i].pathoRefundAmt))).toFixed(2)+'</td> '
						//+' <td style="height: 21.5px;" >'+parseFloat(0.0).toFixed(2)+'</td> '
						
						+' <td style="height: 21.5px;" >'+parseFloat((parseFloat(totBal).toFixed(2)-parseFloat(r.lstDaigno[i].pathoDuesAmt).toFixed(2))).toFixed(2)+'</td> '
	                		
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
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoBillAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoDiscountAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoConcessionAMtDiagno).toFixed(2)+'</td>' 
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoNetAMtDiagno).toFixed(2)+'</td>' 
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoPaidAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoRefundAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalPathoDuesAmtDiagno).toFixed(2)+'</td>'
					
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalBillAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalDiscountAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalConcessionAMtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalNetAMtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalPaidAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalRefundAmtDiagno).toFixed(2)+'</td>'
					+' <td style="height: 21.5px;background-color: violet;" >'+parseFloat(finalHospitalDuesAmtDiagno).toFixed(2)+'</td>'
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