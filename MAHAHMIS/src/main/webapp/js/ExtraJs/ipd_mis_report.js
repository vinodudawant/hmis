/**
 *  added by vishant pawar
 *  
 */

function fetchIPDMisReport(){
	
	
	var fromDate  = $("#fromDate").val();
	var toDate  = $("#toDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var searchByMisReport = $('#searchByMisReport').find(":selected").val();
	
	
	var inputs = [];
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('searchByMisReport=' + searchByMisReport);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/mis/fetchIPDMisReport",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
		if(r.list.length==0){
				alertify.error("Record Not Found..")
		}
		else{
			alertify.success("Record Fetch Successfully..")
		}
			
		var htm = "";
		
		var fdate = convertToDateFormat(fromDate);
		var tdate = convertToDateFormat(toDate);
		
		var specialityCount=0;
		var wardCount=0;
		
		var surgeryCount=0;
		
		var totalSpecialityPatient=0;
		var totalSpecialityBill=0;
		var totalSpecialityDiscount=0;
		
		var totalWardPatient=0;
		var totalWardBill=0;
		var totalWardDiscount=0;
		
		var totalSurgeryPatient=0;
		var totalSurgeryBill=0;
		var totalSurgeryDiscount=0;
		
//		surgery wise
		var totalSelfPatient=0;
		var totalRefPatient=0;
		var totalSelfAmount=0;
		var totalRefAmount=0;
		var totalSelfDiscount=0;
		var totalRefDiscount=0;
		
		//ward wise
		var totalSelfPatientW=0;
		var totalRefPatientW=0;
		var totalSelfAmountW=0;
		var totalRefAmountW=0;
		var totalSelfDiscountW=0;
		var totalRefDiscountW=0;
		
		//surgerywise
		var totalSelfPatientS=0;
		var totalRefPatientS=0;
		var totalSelfAmountS=0;
		var totalRefAmountS=0;
		var totalSelfDiscountS=0;
		var totalRefDiscountS=0;
		
		
		for(var i =0; i<r.list.length;i++){
			var type2 = r.list[i].stringType;
			
			if(type2=='specialityWise'){
			
				specialityCount++;	
				
				//set total patient spciality
				totalSpecialityPatient=totalSpecialityPatient+r.list[i].patientCount;
				totalSpecialityBill=totalSpecialityBill+r.list[i].totalBill;
				totalSpecialityDiscount=totalSpecialityDiscount+r.list[i].totalDiscount;
				
				//set total self patient spciality
				totalSelfPatient=totalSelfPatient+r.list[i].patientSelfCount;
				totalSelfAmount=totalSelfAmount+r.list[i].patientSelfAmount;
				totalSelfDiscount=totalSelfDiscount+r.list[i].patientSelfDis;
				
				//set total ref patient spciality
				totalRefPatient=totalRefPatient+r.list[i].patientRefCount;
				totalRefAmount=totalRefAmount+r.list[i].patientRefAmount;
				totalRefDiscount=totalRefDiscount+r.list[i].patientRefDis;
				
				
				
			
			}
			else if(type2=='wardWise'){
				
				wardCount++
				
				totalWardPatient=totalWardPatient+r.list[i].patientCount;
				totalWardBill=totalWardBill+r.list[i].totalBill;
				totalWardDiscount=totalWardDiscount+r.list[i].totalDiscount;
				
				
				//set total self patient spciality
				totalSelfPatientW=totalSelfPatientW+r.list[i].patientSelfCount;
				totalSelfAmountW=totalSelfAmountW+r.list[i].patientSelfAmount;
				totalSelfDiscountW=totalSelfDiscountW+r.list[i].patientSelfDis;
				
				//set total ref patient spciality
				totalRefPatientW=totalRefPatientW+r.list[i].patientRefCount;
				totalRefAmountW=totalRefAmountW+r.list[i].patientRefAmount;
				totalRefDiscountW=totalRefDiscountW+r.list[i].patientRefDis;
			}
			else if(type2=='surgeryWise'){
				
				surgeryCount++
				
				totalSurgeryPatient=totalSurgeryPatient+r.list[i].patientCount;
				totalSurgeryBill=totalSurgeryBill+r.list[i].totalBill;
				totalSurgeryDiscount=totalSurgeryDiscount+r.list[i].totalDiscount;
				
				//set total self patient spciality
				totalSelfPatientS=totalSelfPatientS+r.list[i].patientSelfCount;
				totalSelfAmountS=totalSelfAmountS+r.list[i].patientSelfAmount;
				totalSelfDiscountS=totalSelfDiscountS+r.list[i].patientSelfDis;
				
				//set total ref patient spciality
				totalRefPatientS=totalRefPatientS+r.list[i].patientRefCount;
				totalRefAmountS=totalRefAmountS+r.list[i].patientRefAmount;
				totalRefDiscountS=totalRefDiscountS+r.list[i].patientRefDis;
			}
			
		}

		
		var wardCount2=0;
		var surgeryCount2=0;
	for(var i =0; i<r.list.length;i++){	
			var srNo = Number((i+1));
			var type = r.list[i].stringType;
			
			
		if(type=='specialityWise'){	
			
			//specialityCount++;
			htm = htm
					+ '<tr> '
					+ " <td class='col-md-1-1 center' >"
					+ srNo
					+ '</td>'
					
					+ " <td class='col-md-2-1 center' style='width:8%;'>"
					+ r.list[i].name1
					+ "</td>"
					
					+ " <td class='col-md-2-1 center' style='width:10%;'>"
					+ fdate
					+ "</td>"
					+ " <td class='col-md-1-1 center' style='width:8%;'>"
					+ tdate
					+ "</td>"
					+ " <td class='col-md-2-1 center' style='width:10%;'>"
					+ r.list[i].patientCount
					+ "</td>"
					
					+ " <td class='col-md-2-1 center' style='width:8%;'>"
					+ r.list[i].totalDiscount
					+ "</td>"
					
					+ " <td class='col-md-2-1 center' style='width:10%;'>"
					+ r.list[i].totalBill
					+ "</td>"
					
					+ " <td class='col-md-2-1 center' style='width:8%;'>"
					+ r.list[i].patientSelfCount
					+ "</td>"
					
					+ " <td class='col-md-2-1 center' style='width:8%;'>"
					+ r.list[i].patientRefCount
					+ "</td>"
					
					+ " <td class='col-md-2-1 center' style='width:8%;'>"
					+ r.list[i].patientSelfAmount
					+ "</td>"
					
					+ " <td class='col-md-2-1 center' style='width:8%;'>"
					+ r.list[i].patientRefAmount
					+ "</td>"
					
					+ " <td class='col-md-2-1 center' style='width:8%;'>"
					+ r.list[i].patientSelfDis
					+ "</td>"
					
					+ " <td class='col-md-2-1 center' style='width:8%;'>"
					+ r.list[i].patientRefDis
					+ "</td>"
					
					+ '</tr>'
			if(specialityCount==(i+1)){
				htm=htm+
				
					+'<tr bgcolor="green" style=" border: 0; " >'
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'>"
					+ " "
					+ "</td>"
					+ " <td class='col-md-2-1 center' style=' width:8%; border: 0;'>"
					+ " "
					+ "</td>"
					+ " <td class='col-md-2-1 center' style=' width:8%; border: 0;'>"
					+ " "
					+ "</td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ 'Speciality Total'
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0; '><b>"
					+ totalSpecialityPatient
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSpecialityDiscount
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSpecialityBill
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSelfPatient
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalRefPatient
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSelfAmount
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalRefAmount
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSelfDiscount
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalRefDiscount
					+ "</b></td>"
				    + '</tr>';	
			}
			
			$("#setmisreportdata").html(htm);
		}
		
		
		
		else if(type=='wardWise'){
			wardCount2++;
			
			htm = htm
			+ '<tr> '
			+ " <td class='col-md-1-1 center' >"
			+ srNo
			+ '</td>'
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].name1
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:10%;'>"
			+ fdate
			+ "</td>"
			+ " <td class='col-md-1-1 center' style='width:8%;'>"
			+ tdate
			+ "</td>"
			+ " <td class='col-md-2-1 center' style='width:10%;'>"
			+ r.list[i].patientCount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].totalDiscount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:10%;'>"
			+ r.list[i].totalBill
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientSelfCount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientRefCount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientSelfAmount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientRefAmount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientSelfDis
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientRefDis
			+ "</td>"
			
			+ '</tr>';
			
			if(wardCount==wardCount2){
				htm=htm+
				
					+'<tr style="display: none; border: 0;">'
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'>"
					+ " "
					+ "</td>"
					+ " <td class='col-md-2-1 center' style=' width:8%; border: 0;'>"
					+ " "
					+ "</td>"
					+ " <td class='col-md-2-1 center' style=' width:8%; border: 0;'>"
					+ " "
					+ "</td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ 'Ward Total'
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalWardPatient
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalWardDiscount
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalWardBill
					+ "</b></td>"
					
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSelfPatientW
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalRefPatientW
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSelfAmountW
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalRefAmountW
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSelfDiscountW
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalRefDiscountW
					+ "</b></td>"
					
				    + '</tr>';	
			}
	
	$("#setmisreportdata").html(htm);
}
		else if(type=='surgeryWise'){
			
			surgeryCount2++;
			htm = htm
			+ '<tr> '
			+ " <td class='col-md-1-1 center' >"
			+ srNo
			+ '</td>'
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].name1
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:10%;'>"
			+ fdate
			+ "</td>"
			+ " <td class='col-md-1-1 center' style='width:8%;'>"
			+ tdate
			+ "</td>"
			+ " <td class='col-md-2-1 center' style='width:10%;'>"
			+ r.list[i].patientCount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].totalDiscount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:10%;'>"
			+ r.list[i].totalBill
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientSelfCount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientRefCount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientSelfAmount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientRefAmount
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientSelfDis
			+ "</td>"
			
			+ " <td class='col-md-2-1 center' style='width:8%;'>"
			+ r.list[i].patientRefDis
			+ "</td>"
			
			+ '</tr>';
			
			if(surgeryCount==surgeryCount2){
				
				htm=htm+
				
					+'<tr style="display: none; border: 0;">'
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'>"
					+ " "
					+ "</td>"
					+ " <td class='col-md-2-1 center' style=' width:8%; border: 0;'>"
					+ " "
					+ "</td>"
					+ " <td class='col-md-2-1 center' style=' width:8%; border: 0;'>"
					+ " "
					+ "</td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ 'Surgery Total'
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSurgeryPatient
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSurgeryDiscount
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSurgeryBill
					+ "</b></td>"
					
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSelfPatientS
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalRefPatientS
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSelfAmountS
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalRefAmountS
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalSelfDiscountS
					+ "</b></td>"
					+ " <td class='col-md-2-1 center' style='width:8%; border: 0;'><b>"
					+ totalRefDiscountS
					+ "</b></td>"
				    + '</tr>';	
			}
	
	$("#setmisreportdata").html(htm);
}
		
			
			//$("div").html("number of columns: ");
			
		}
		
			
		}
	});
	
	
}

function convertToDateFormat(dateString) {
    //  Convert a "dd/MM/yyyy" string into a Date object
    let d = dateString.split("-");
    let dat = d[2] + '/' + d[1] + '/' + d[0];
    return dat;     
}


function setCurrantDate()
{
	//doctorDeskPatientCount();
	$("#fromopdDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#toopdDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#ipdfromDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#ipdtoDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#fromerDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#toerDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#FormDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#ToDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
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