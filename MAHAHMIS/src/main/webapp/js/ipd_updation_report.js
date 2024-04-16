function getIpdUpdationData() {
	
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
		url 	: "ehat/ipdupdationreport/fetchIpdPatientsRecords",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			$("#container").html(" ");
			var temp="";
			var finalTotBill=0,finalTotPaid=0,finalToDisc=0,finalTotBal=0,finalTotRefund=0;
			
			if(r.listRegTreBillDto.length > 0){
				
				for(var i=0;i < r.listRegTreBillDto.length;i++){
											
					var date=new Date(r.listRegTreBillDto[i].createdDateTime).toLocaleString('en-GB');					
					var dd=date.split(',');
					
					
					var patType="";
					var catType="";
					
					var totBill = r.listRegTreBillDto[i].totBill;
					var totPaid = r.listRegTreBillDto[i].totPaid;
					var totBal = r.listRegTreBillDto[i].totBal;
					var totrefund = r.listRegTreBillDto[i].totalRefund;
					var totdiscount = r.listRegTreBillDto[i].totDisc;
					
					if(totBal < 0){
						totBal =0;
					}
					
					finalTotBill=Number(finalTotBill)+Number(totBill);
					finalTotPaid=Number(finalTotPaid)+Number(totPaid);
					//finalTotBal=Number(finalTotBal)+Number(totBal);
					finalTotBal=Number(finalTotBal)+Number(totBal);
					finalToDisc=Number(finalToDisc)+Number(totdiscount);
					finalTotRefund=Number(finalTotRefund)+Number(totrefund);
					
					var spId=r.listRegTreBillDto[i].chargesMasterSlaveId;
					
					if(spId > 0){					
						
						patType=r.listRegTreBillDto[i].imageName;
						catType="Sponsor";
		 			}else{
		 				
		 				patType="Self Paying";		
		 				catType="Hospital";
					}
					
					if(r.listRegTreBillDto[i].bedName==null)
						{
							r.listRegTreBillDto[i].bedName="-";
						}
					if(r.listRegTreBillDto[i].address=="null")
					{
						r.listRegTreBillDto[i].address="-";
					}
					
					var refDoc = r.listRegTreBillDto[i].refDocPrefix+" "+r.listRegTreBillDto[i].refDoctorName;
					
					temp=temp+ '<tr> '
					+' <td style="height: 21.5px;width: 5%" >'+(i+1)+'</td> '
					+' <td style="height: 21.5px;width: 5%" >'+r.listRegTreBillDto[i].patientId+'</td> '
					+' <td style="height: 21.5px;width: 5%" >'+r.listRegTreBillDto[i].billNo+'</td> '
					+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].patientName+'</td>	'
					+' <td style="height: 21.5px;width: 7%" >'+catType+'</td> '
					+' <td style="height: 21.5px;width: 12%" >'+patType+'</td> '
					+' <td style="height: 21.5px;width: 11%" >'+r.listRegTreBillDto[i].bedName+'</td>	'
					+' <td style="height: 21.5px;width: 7%" >'+r.listRegTreBillDto[i].trcount+'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+dd[0] + " " + dd[1] +'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+r.listRegTreBillDto[i].dischargeDate+'</td> '
					+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].address+'</td>	'
					+' <td style="height: 21.5px;width: 10%" >'+refDoc+'</td>	'
					+' <td style="height: 21.5px;width: 10%" >'+parseFloat(totBill).toFixed(2)+'</td> '
					//+' <td style="height: 21.5px;width: 6%" >'+parseFloat(totBal).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+parseFloat(totBal).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+parseFloat(totPaid).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 5%" >'+parseFloat(totrefund).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+parseFloat(totdiscount).toFixed(2)+'</td>'
                    +' <td style="height: 21.5px;width: 4%" >No</td> '
                	+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].approveRemark+'</td>	'	
                	+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].approveBy+'</td>	'
					+' </tr> ';						
				}	
				
				temp=temp+ '<tr> '
				+' <th style="height: 21.5px;width: 5%" ></th> '
				+' <th style="height: 21.5px;width: 5%" ></th> '
				+' <th style="height: 21.5px;width: 10%" ></th> '
				+' <th style="height: 21.5px;width: 7%" ></th>	'
				+' <th style="height: 21.5px;width: 12%" ></th> '
				+' <th style="height: 21.5px;width: 11%" ></th>	'
				+' <th style="height: 21.5px;width: 7%" ></th>	'
				+' <th style="height: 21.5px;width: 6%" ></th> '
				+' <th style="height: 21.5px;width: 10%" ></th> '
				+' <th style="height: 21.5px;width: 10%" ></th> '
				+' <th style="height: 21.5px;width: 10%" ></th> '
				+' <th style="height: 21.5px;width: 10%" >Total</th> '
				+' <th style="height: 21.5px;width: 10%" >'+parseFloat(finalTotBill).toFixed(2)+'</th> '
				+' <th style="height: 21.5px;width: 6%" >'+parseFloat(finalTotBal).toFixed(2)+'</th> '
				+' <th style="height: 21.5px;width: 6%" >'+parseFloat(finalTotPaid).toFixed(2)+'</th> '
				+' <th style="height: 21.5px;width: 5%" >'+parseFloat(finalTotRefund).toFixed(2)+'</th> ' 
				+' <th style="height: 21.5px;width: 6%" >'+parseFloat(finalToDisc).toFixed(2)+'</th> '
				+' <td style="height: 21.5px;width: 4%" >' +'</td>'																							
				+' </tr> ';	
				
				$("#container").html(temp);
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