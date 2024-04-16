
var smplColFlg="N";
var dupTestFlag="N";
var deleteTestSmplColFlg="N";
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 2_Aug_2017
 * @Code Getting Bill Estimate Data By Service Id
 ******************************************************************************/
function getPatientBillAmountIpdForEstimation(r,callFrom) {

	// var k=31;
	var startDate = $('#dob').val();	
	var endDate = $('#dob1').val();

	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var todays = yyyy +'-'+mm+'-'+dd;

    var a = new Date(startDate);
    var b = new Date(endDate);
    var c = new Date(todays);
    
    if(a.getTime() > c.getTime()) {
      
        alert(" start Date should be Today or less than today");
        $('#dob').val(todays);
        return false;
    }
    if(b.getTime() < a.getTime()) {
        
        alert(" To date should be greater than equal to From date");
        $('#dob').val(todays);
        return false;
    }
    
    if(b.getTime() > c.getTime()) {
        
        alert("End Date should be Today or less than today");
        $('#dob1').val(todays);
        return false;
    }
    
	if(startDate==0 || startDate==null)
		{
		alert("Please Select From Date");
			 
		return false;
		}
	if(endDate==0 || endDate==null)
	{
	alert("Please Select End Date");
	return false;
	}
	//alert(endDate);
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : r,
			"startDate" : startDate,
			"endDate" : endDate,
			"callFrom" : callFrom
		},
		url : "ehat/ipdbill/getPatientBillAmountIpdForEstimation",
		success : function(r) {
			// setTempPatientRecords(r);
			
			//console.log(r);
			setBillDetailsEstimateTemp(r);
			
			
			//$(".openAllSlave").trigger('click');
			$("#payable").val(0);	
			
			
			//setTotalPaid();	
		}
	});
}

var totAmt=0;
function setBillDetailsEstimateTemp(r) {

	// alert(r);
	var setBill = "";
	var totAmt = 0;

	//alert(r.listServiceIpdDto.length);
	var totqyt = 1;
	var treatmentId = $('#treatmentId').text();
	for ( var i = 0; i < r.listServiceIpdDto.length; i++) {
		
		
		if (r.listServiceIpdDto[i].serviceId == 1) {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ r.listServiceIpdDto[i].serviceId
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'
					+ '<td style="display:none;"><input type="hidden" id="regBillId" value="'
					+ r.listServiceIpdDto[i].billDetailsId + '"> </td>'

					+ '<td>' + '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">' + '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle">' + '<div class="row">'
					+ '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>' + '</div>'
					+ '</a>' + '</h3>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</td>'
					+ '<td><div class="text-center">1</div></td>' + '<td>'
					+ '<div class="text-right mainAddedInTotal" id="tamt'
					+ (r.listServiceIpdDto[i].serviceId) + '">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2) + '</div></td>' + '</tr>';

			totAmt = totAmt + r.listServiceIpdDto[i].amount;

		} /*else if (r.listServiceIpdDto[i].serviceId == 2) {
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listServiceIpdDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+ r.listServiceIpdDto[i].serviceId+'" name="opdBillCheckboxReg" value="'+ r.listServiceIpdDto[i].serviceId+'">'
			+	'</td>'
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseOneBillE'+i+'" onclick="getSubServiceDetailsBillEstimate('+treatmentId+','+ r.listServiceIpdDto[i].serviceId +')">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listServiceIpdDto[i].serviceName +'</div>'			
			+ 	'<div class="col-md-1">'
			+ 	'<i class="fa fa-chevron-down" id="list'+i+'"></i>'
			+	'</div>'
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'
			+	'<div id="collapseOneBillE'+i+'" class="panel-collapse collapse">'
			+	'<div class="panel-body">'
			+	'<table class="table table-hover">'
			+	'<thead>'
			+	'<tr>'
			+	'<th class="only-checkbox">#</th>'
			+	'<th>Doctor Name</th>'
			+	'<th>'
			+	'<div class="text-center">Amount</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-center">Disc</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-center">Disc Per%</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'
			+	'<th class="only-checkbox">Edit</th>'
			+	'<th class="only-checkbox">Cancel</th>'
			+	'<th class="only-checkbox">ChB</th>'
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceDataBillEstimate">'
		
			+	'</tbody>'
			+	'</table>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			+	'<td><div class="text-center">' + r.listServiceIpdDto[i].serviceCount +'</div></td>'
			+ 	'<td>'
			+	'<div id="tamt'+(r.listServiceIpdDto[i].serviceId)+'" class="text-right">' + (r.listServiceIpdDto[i].amount).toFixed(2) +'</div></td>'
			+	'</tr>';
			
			totqyt=totqyt+ r.listServiceIpdDto[i].serviceCount;
			totAmt=totAmt+r.listServiceIpdDto[i].amount;
		}*/ else if (r.listServiceIpdDto[i].serviceId == 3) {
			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ r.listServiceIpdDto[i].serviceId
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse"data-parent="#accordion" href="#collapseTwoBillE'
					+ i + '" onclick="getBedDetailsForEstimate(' + treatmentId + ','
					+ r.listServiceIpdDto[i].serviceId + ')">'
					+ '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'

					+ '<div id="collapseTwoBillE' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					+ '<th>Bed + Hall</th>'

					/* + '<th>Doc Name</th>' */

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Disc</div>' + '</th>'
					+ '<th>' + '<div class="text-center">Disc %</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>'

					+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Co-Pay</div>'
					+ '</th>'

					+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					/*+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>'*/
					+ '<th class="only-checkbox">ChB</th>'

					+ '</tr>' + '</thead>'

					+ '<tbody id="bedDataForEstimate">'

					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>' + '<div class="text-right">'
					+ (r.listServiceIpdDto[i].amount).toFixed(2) + '</div></td>' + '</tr>';

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		} else if (r.listServiceIpdDto[i].serviceId == 4) {
			
			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseTwoBillE'
					+ i + '" onclick="getSubServiceDetails1ForOTEstimate(' + i + ','
					+ treatmentId + ',' + r.listServiceIpdDto[i].serviceId
					+ ')">' + '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseTwoBillE' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>' + '<th>OT Name</th>'

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Disc</div>' + '</th>'
					+ '<th>' + '<div class="text-center">Disc %</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>'

					+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Co-Pay</div>'
					+ '</th>'

					+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					/*+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>'*/
					+ '<th class="only-checkbox">ChB</th>'

					+ '</tr>' + '</thead>' + '<tbody id="OTEstimate' + i + '">'
					/*
					 * '<tr>' + '<td class="only-checkbox">' + '<input
					 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
					 * class="text-center"></div>' + '</td>' + '<td>' + '<div
					 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="only-checkbox">' + '<input
					 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
					 * class="text-center">999.00</div>' + '</td>' + '<td>' + '<div
					 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>'
					 */
					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">' + (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>' + '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		} else if (r.listServiceIpdDto[i].serviceId == 5) {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseTwoBillE'
					+ i
					+ '" onclick="getSubServiceDetails1ForConsultingVisitingChargesEstimate('
					+ i + ',' + treatmentId + ','
					+ r.listServiceIpdDto[i].serviceId + ')">'
					+ '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseTwoBillE' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					/* + '<th>OT Name</th>' */

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Disc</div>' + '</th>'
					+ '<th>' + '<div class="text-center">Disc %</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>'

					+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Co-Pay</div>'
					+ '</th>'

					+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					/*+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>'*/
					+ '<th class="only-checkbox">ChB</th>'

					+ '</tr>' + '</thead>' + '<tbody id="CVCEstimate' + i + '">'

					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">' + (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>' + '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		}

		else {

			setBill = setBill

					+ '<tr>'
					+ '<td class="only-checkbox" >'// added by vinod
					+ '<input type="checkbox" onclick="setSlaveChk('
					+ (r.listServiceIpdDto[i].serviceId)
					+ ')" checked=checked id="chkOpdBillReg'
					+ (r.listServiceIpdDto[i].serviceId)
					+ '" name="opdBillCheckboxReg" value="'
					+ r.listServiceIpdDto[i].serviceId
					+ '">'
					+ '</td>'// added by vinod
					+ '<td>'
					+ '<div class="text-left">'
					+ '<div class="panel-group" id="accordion">'
					+ '<div class="panel">'
					+ '<div class="panel-heading">'
					+ '<h3 class="panel-title">'
					+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse" data-parent="#accordion" href="#collapseTwoBillE'
					+ i + '" onclick="getSubServiceDetails1ForEstimate(' + i + ','
					+ treatmentId + ',' + r.listServiceIpdDto[i].serviceId
					+ ')">' + '<div class="row">' + '<div class="col-md-10">'
					+ r.listServiceIpdDto[i].serviceName + '</div>'
					+ '<div class="col-md-1">'
					+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
					+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'
					+ '<div id="collapseTwoBillE' + i
					+ '" class="panel-collapse collapse">'
					+ '<div class="panel-body">'
					+ '<table class="table table-hover">' + '<thead>' + '<tr>'
					+ '<th class="only-checkbox">#</th>'
					+ '<th>SubService Name</th>'

					+ '<th>Doc Name</th>'

					+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Disc</div>' + '</th>'
					+ '<th>' + '<div class="text-center">Disc %</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Amount</div>'
					+ '</th>'

					+ '<th>' + '<div class="text-center">Pay</div>' + '</th>'

					+ '<th>' + '<div class="text-center">Co-Pay</div>'
					+ '</th>'

					+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
					/*+ '<th class="only-checkbox">Edit</th>'
					+ '<th class="only-checkbox">Cancel</th>'*/
					+ '<th class="only-checkbox">ChB</th>'

					+ '</tr>' + '</thead>' + '<tbody id="serviceDataEstimate' + i
					+ '">'
					/*
					 * '<tr>' + '<td class="only-checkbox">' + '<input
					 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
					 * class="text-center"></div>' + '</td>' + '<td>' + '<div
					 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="only-checkbox">' + '<input
					 * type="checkbox">' + '</td>' + '<td>Cash</td>' + '<td>' + '<div
					 * class="text-center">999.00</div>' + '</td>' + '<td>' + '<div
					 * class="text-right">25-05-2017</div>' + '</td>' + '</tr>'
					 */
					+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
					+ '</div>' + '</div>' + '</td>'
					+ '<td><div class="text-center"> '
					+ r.listServiceIpdDto[i].serviceCount + '</div></td>'
					+ '<td>'// added by vinod
					+ '<div id="tamt' + (r.listServiceIpdDto[i].serviceId)
					+ '" class="text-right">' + (r.listServiceIpdDto[i].amount).toFixed(2)
					+ '</div></td>' + '</tr>';// added by vinod

			totqyt = totqyt + r.listServiceIpdDto[i].serviceCount;
			totAmt = totAmt + r.listServiceIpdDto[i].amount;
		}
	}
	$("#totalQtysEstimate").html(totqyt);
	$("#totalAmtsEstimate").html((totAmt).toFixed(2));
		$("#ipdEstimation").html(setBill);
	}



function getSubServiceDetailsBillEstimate(t, s) {
	// alert(t +" "+s);
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetailsTempBillEstimate(r,s);
			// setBillDetailsTemp(r);
		}
	});
}

function getSubServiceDetailsTempBillEstimate(t,s) {
	//alert(t.listSubServiceIpdDto.length);
	var setService="";
	//var treatmentId=$('#treatmentId').text();
	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a=1+i;
		var datetime= new Date(t.listSubServiceIpdDto[i].createdDate).toLocaleDateString('en-GB');
		setService=setService
		+	'<tr>'
		
		+	'<td style="display:none;" id="bdId'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].billDetailsId+' </td>'

		+ '<td style="display:none;" id="doc'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'

		+	'<td style="display:none;" id="sId'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].serviceId+' </td>'
		+	'<td style="display:none;" id="docId'+(t.listSubServiceIpdDto[i].billDetailsId)+'" value="'+ t.listSubServiceIpdDto[i].docId +'"> '+ t.listSubServiceIpdDto[i].docId+' </td>'

		
		+	'<td style="display:none;"> '+ t.listSubServiceIpdDto[i].billDetailsId+' </td>'
		
		+	'<td> '+ a +' </td>'
		
		+	'<td id="doccName'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+ t.listSubServiceIpdDto[i].docName +' </td>';
		
		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle =="Y") {
			
			setService = setService + '<td id="char'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'
			+	'<div class="text-center" id="tAmt'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ (t.listSubServiceIpdDto[i].rate).toFixed(2) +'</div>'
			+	'</td>';
			
		}else{
			
			if(t.listSubServiceIpdDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ (t.listSubServiceIpdDto[i].rate).toFixed(2) +'</div>'
				/*+   '<input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listSubServiceIpdDto[i].billDetailsId)+'" value="'+Number(t.listSubServiceIpdDto[i].charges)+'">'*/
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listSubServiceIpdDto[i].billDetailsId)+'" value="'+(t.listSubServiceIpdDto[i].rate)+'"></td>';
				
			}else{
				
				setService = setService + '<td id="char'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'+ (t.listSubServiceIpdDto[i].rate).toFixed(2) +'</div>'
				/*+   '<input type="hidden" class="notInTotal billSlave'+s+'" id="tAmtSlave'+(t.listSubServiceIpdDto[i].billDetailsId)+'" value="'+Number(t.listSubServiceIpdDto[i].charges)+'">'*/
				+	'</td>';
				/*+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listSubServiceIpdDto[i].billDetailsId)+'" value="'+(t.listSubServiceIpdDto[i].charges)+'"></td>';*/
				
			}		
		}
		// added by vinod
		setService = setService
		
		+	'<td id="con'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listSubServiceIpdDto[i].concession).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td id="consPerc'+(t.listSubServiceIpdDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2) +'</div>'
		+	'</td>';
		
		setService = setService  +	'<td>'
		+	'<div class="text-right">'+ datetime +'</div>'
		+	'</td>';
		setService = setService +	'</td>';
		
			/*if ((t.listSubServiceIpdDto[i].paidFlag=="Y")) {
			setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listSubServiceIpdDto[i].billDetailsId+'" onclick="editOnClickForDoctorIpd('+t.listSubServiceIpdDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listSubServiceIpdDto[i].billDetailsId+'></i></button></a></td>';
			setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listSubServiceIpdDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listSubServiceIpdDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'+ t.listSubServiceIpdDto[i].cancle +'" id=btnCancle'+t.listSubServiceIpdDto[i].billDetailsId+' type="hidden"></a></td>';
		}else{
			
			if (t.listSubServiceIpdDto[i].cancle =="Y") {
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listSubServiceIpdDto[i].billDetailsId+'"  disabled="disabled" onclick="editOnClickForDoctorIpd('+t.listSubServiceIpdDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listSubServiceIpdDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listSubServiceIpdDto[i].cancle +'" id=btnCancle'+t.listSubServiceIpdDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess billSlaveBtn'+t.listSubServiceIpdDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listSubServiceIpdDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			}else{
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listSubServiceIpdDto[i].billDetailsId+'"  onclick="editOnClickForDoctorIpd('+t.listSubServiceIpdDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listSubServiceIpdDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listSubServiceIpdDto[i].cancle +'" id=btnCancle'+t.listSubServiceIpdDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess billSlaveBtn'+t.listSubServiceIpdDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listSubServiceIpdDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}			
		}		*/
			
		
		/*	if (t.listSubServiceIpdDto[i].cancle =="Y" || (t.listSubServiceIpdDto[i].paidFlag=="Y")) {
			setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listSubServiceIpdDto[i].cancle +'" id=btnCancle'+t.listSubServiceIpdDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess billSlaveBtn'+t.listSubServiceIpdDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listSubServiceIpdDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
		} else {
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listSubServiceIpdDto[i].cancle +'" id=btnCancle'+t.listSubServiceIpdDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess billSlaveBtn'+t.listSubServiceIpdDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listSubServiceIpdDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
		}*/
			
		setService = setService +	'<td class="only-checkbox" >';
		
		if(t.listSubServiceIpdDto[i].paidFlag=="N" && t.listSubServiceIpdDto[i].cancle=="N"){
			
			setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listSubServiceIpdDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listSubServiceIpdDto[i].billDetailsId+','+t.listSubServiceIpdDto[i].serviceId+')" checked=checked id="chkOpdBill'+(t.listSubServiceIpdDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listSubServiceIpdDto[i].billDetailsId+'">';
			
		}else{
			
			setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listSubServiceIpdDto[i].serviceId+'" disabled="disabled" value="'+ t.listSubServiceIpdDto[i].billDetailsId+'">';
			
		}		
		
		setService = setService +	'</td>';
				
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';		
		
}	
	$("#serviceDataBillEstimate").html(setService);
}


function getBedDetailsForEstimate(t, s) {
	// alert("hiiii");
	
	var startDate = $('#dob').val();	
	var endDate = $('#dob1').val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s,
			"startDate" : startDate,
			"endDate" : endDate
		},
		url : "ehat/ipdbill/getBedDetailsForEstimate",
		success : function(r) {			
			getBedDetailsForEstimateTemp(r, s);
			
		}
	});
}


function getBedDetailsForEstimateTemp(t, s) {

	var setService = "";
	// var treatmentId=$('#treatmentId').text();
	var nursing = "Nursing";
	var hallName = "";
	for ( var i = 0; i < t.listBedIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listBedIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');

		var netAmt = Number(t.listBedIpdDto[i].amount)
				- Number(t.listBedIpdDto[i].concession);

		/*
		 * var dname= t.listBedIpdDto[i].docName;
		 * 
		 * if(dname==null) { dname="-"; }
		 */
		setService = setService

		+ '<tr id="tr' + (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<td style="display:none;" id="row'
				+ (t.listBedIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].billDetailsId + ' </td>'

				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].otherRate + ' </td>'
				
				+ '<td style="display:none;" id="sId'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].amount + ' </td>'
				
				+ '<td style="display:none;" id="subserviceid'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].subServiceId + ' </td>';
				
				

		if (t.listBedIpdDto[i].subServiceId == 0) {

			setService = setService + '<td id="catName'
					+ (t.listBedIpdDto[i].billDetailsId) + '"> ' + (nursing)
					+ ":" + (hallName) + ' </td>';
		} else {
			if (t.listBedIpdDto[i].isCategory == 'N') {
				setService = setService + '<td id="catName'
						+ (t.listBedIpdDto[i].billDetailsId) + '"> '
						+ t.listBedIpdDto[i].bedHall + ' </td>';
				hallName = t.listBedIpdDto[i].bedHall;	

			} else {
				hallName = t.listBedIpdDto[i].bedHall;
				setService = setService + '<td id="catName'
						+ (t.listBedIpdDto[i].billDetailsId) + '"> '
						+ t.listBedIpdDto[i].bedHall + ' </td>';
			}
		}
		/*
		 * + '<td id="doccName'+(t.listBedIpdDto[i].billDetailsId)+'"> '+
		 * dname+' </td>'
		 */

		+'<td style="display:none;" id="subserviceid'
				+ (t.listBedIpdDto[i].billDetailsId) + '"> '
				+ t.listBedIpdDto[i].subServiceId + ' </td>';

				/*
				 * + '<td style="display:none;" id="dId'+(t.listBedIpdDto[i].billDetailsId)+'"> '+
				 * t.listBedIpdDto[i].docId+' </td>'
				 */

				
		
				

		/*
		 * + '<td id="char'+(t.listBedIpdDto[i].billDetailsId)+'">' + '<div
		 * class="text-center">'+ t.listBedIpdDto[i].rate +'</div>' + '</td>';
		 */

		// added by vinod
		if (t.listBedIpdDto[i].cancle == "Y") {

			setService = setService + '<td style="display:none;"> '
					+ '<div class="text-center" id="tAmt'
					+ (t.listBedIpdDto[i].billDetailsId) + '">'
					+ t.listBedIpdDto[i].rate + '</div>' + '</td>'
					+ '<td id="char' + (t.listBedIpdDto[i].billDetailsId)
					+ '">' + '<div class="text-center">'
					+ (t.listBedIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';

		} else {

			if (t.listBedIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listBedIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listBedIpdDto[i].billDetailsId) + '" value="'
						+ netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listBedIpdDto[i].billDetailsId) + '">'
						+ (t.listBedIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listBedIpdDto[i].billDetailsId)
						+ '" value="'
						+ netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">' + t.listBedIpdDto[i].quantity
				+ '</div>' + '</td>'

				+ '<td id="con' + (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">' + (t.listBedIpdDto[i].concession).toFixed(2)
				+ '</div>' + '</td>'
				
				+ '<td id="conPer' + (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">' + (t.listBedIpdDto[i].concessionPer).toFixed(2)
				+ '</div>' + '</td>'

				+ '<td id="amt' + (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">' + (t.listBedIpdDto[i].amount).toFixed(2)
				+ '</div>' + '</td>'

				+ '<td id="p' + (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">' + (t.listBedIpdDto[i].pay).toFixed(2)
				+ '</div>' + '</td>'

				+ '<td id="cP' + (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">' + (t.listBedIpdDto[i].coPay).toFixed(2)
				+ '</div>' + '</td>'

				+ '<td id="dateSub' + (t.listBedIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-right" id="dateSubservice">' + datetime12
				+ '</div>';
		setService = setService + '</td>';

		if ((t.listBedIpdDto[i].paidFlag == "Y")) {

			/*setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForBed('
					+ t.listBedIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listBedIpdDto[i].billDetailsId
					+ '></i></button></a></td>';
*/
		} else {

			/*if (t.listBedIpdDto[i].cancle == "Y"
					|| t.listBedIpdDto[i].isModify == "N") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForBed('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBedIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClickForBed('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBedIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}*/
		}

		/*if ((t.listBedIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listBedIpdDto[i].cancle
					+ '" id=btnCancle'
					+ t.listBedIpdDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listBedIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listBedIpdDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBedIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBedIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBedIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBedIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('
						+ t.listBedIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}*/

		setService = setService + '<td class="only-checkbox" >';

		if (t.listBedIpdDto[i].paidFlag == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listBedIpdDto[i].serviceId
					+ '" checked=checked id="chkOpdBill'
					+ (t.listBedIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listBedIpdDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listBedIpdDto[i].serviceId
					+ '" disabled=disabled id="chkOpdBill'
					+ (t.listBedIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listBedIpdDto[i].billDetailsId + '">';
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#bedDataForEstimate").html(setService);
}


function getSubServiceDetails1ForOTEstimate(i, t, s)

{
	
	var startDate = $('#dob').val();	
	var endDate = $('#dob1').val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s,
			"startDate" : startDate,
			"endDate" : endDate
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2ForEstimate",
		success : function(r) {
			// setTempPatientRecords(r);
			 //alert(t);
			getSubServiceDetailsTemp1ForOTEstimate(i, r, s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function getSubServiceDetailsTemp1ForOTEstimate(j, t, s) {
	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();
	//alert(t.listSubServiceIpdDto.length);
	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].amount)
				- Number(t.listSubServiceIpdDto[i].concession);

		if (dname == null) {
			dname = "-";
		}
		setService = setService

		+ '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';

		if (t.listSubServiceIpdDto[i].isCategory == 'N')
		// if(t.listSubServiceIpdDto[i].subServiceId == 16)
		{
			// alert("In IF");
			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].categoryName + ' </td>';

		} else {
			// alert("In else");
			setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].categoryName + ' </td>';

		}

		+'<td id="doccName' + (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ dname + ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'
				
				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherRate + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

				+ '<td id="con' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concession).toFixed(2) + '</div>' + '</td>'
				
				+ '<td id="conPer' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2) + '</div>' + '</td>'

				+ '<td id="char' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>' + '</td>'

				+ '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'

				+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>' + '</td>'

				+ '<td id="dateSub' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		/*if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForOT('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForOT('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClickForOT('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceIpdDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}*/

		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceIpdDto[i].paidFlag == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" onclick="setTotalPaidbySlave('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" checked=checked id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" onclick="setTotalPaidbySlave('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#OTEstimate" + j).html(setService);
}


function getSubServiceDetails1ForConsultingVisitingChargesEstimate(i, t, s) {
	// alert("Hi kishor");
	var startDate = $('#dob').val();	
	var endDate = $('#dob1').val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s,
			"startDate" : startDate,
			"endDate" : endDate
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2ForEstimate",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetails1ForConsultingVisitingChargesEstimateTemp(i, r, s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}
function getSubServiceDetails1ForConsultingVisitingChargesEstimateTemp(j, t, s) {

	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();

	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].amount)
				- Number(t.listSubServiceIpdDto[i].concession);

		if (dname == null) {
			dname = "-";
		}
		setService = setService

		+ '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>'

				/*
				 * + '<td id="catName'+(t.listSubServiceIpdDto[i].billDetailsId)+'"> '+
				 * t.listSubServiceIpdDto[i].categoryName+' </td>'
				 */
				+ '<td id="doccName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> ' + dname
				+ ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'
				
				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherRate + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

				+ '<td id="con' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concession).toFixed(2) + '</div>' + '</td>'
				
				+ '<td id="conPer' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2) + '</div>' + '</td>'

				+ '<td id="char' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>' + '</td>'

				+ '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'

				+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>' + '</td>'

				+ '<td id="dateSub' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		/*if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForCVC('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForCVC('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClickForCVC('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceIpdDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}
*/
		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceIpdDto[i].paidFlag == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" checked=checked id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#CVCEstimate" + j).html(setService);

}




function getSubServiceDetails1ForEstimate(i, t, s)

{
	var startDate = $('#dob').val();	
	var endDate = $('#dob1').val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s,
			"startDate" : startDate,
			"endDate" : endDate
		},
		url : "ehat/ipdbill/getIpdPatientServiceBill2ForEstimate",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getSubServiceDetailsEstimateTemp1(i, r, s);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function getSubServiceDetailsEstimateTemp1(j, t, s) {
	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();

	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].amount)
				- Number(t.listSubServiceIpdDto[i].concession);
		var esid = t.listSubServiceIpdDto[i].serviceId;
		if (dname == null) {
			dname = "-";
		}
		setService = setService

		+ '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';

				if (esid==14) {
					

					setService = setService + '<td id="catName'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
							+ t.listSubServiceIpdDto[i].inventoryName + ' </td>';
				}else if (esid==16) {			

					setService = setService + '<td id="catName'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
							+ t.listSubServiceIpdDto[i].pharmaName + ' </td>';
				} 
				
				else {
					
					setService = setService + '<td id="catName'
							+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
							+ t.listSubServiceIpdDto[i].categoryName + ' </td>';
				}

				setService = setService
				
				+ '<td id="doccName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> ' + dname
				+ ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'
				
				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherRate + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		setService = setService + '<td id="q'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

				+ '<td id="con' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concession).toFixed(2) + '</div>' + '</td>'
				
				+ '<td id="conPer' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2) + '</div>' + '</td>'

				+ '<td id="char' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].amount).toFixed(2) + '</div>' + '</td>'

				+ '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].pay).toFixed(2) + '</div>' + '</td>'

				+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].coPay).toFixed(2) + '</div>' + '</td>'

				+ '<td id="dateSub' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';

		/*if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ '></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y"
					|| t.listSubServiceIpdDto[i].isModify == "N") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ '></i></button></a></td>';
			}
		}

		if ((t.listSubServiceIpdDto[i].paidFlag == "Y")) {

			setService = setService
					+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
					+ t.listSubServiceIpdDto[i].cancle
					+ '" id=btnCancle'
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId
					+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

		} else {

			if (t.listSubServiceIpdDto[i].cancle == "Y") {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			} else {
				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listSubServiceIpdDto[i].cancle
						+ '" id=btnCancle'
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('
						+ t.listSubServiceIpdDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}
		}
*/
		setService = setService + '<td class="only-checkbox" >';

		if (t.listSubServiceIpdDto[i].paidFlag == "N") {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" checked=checked id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';

		} else {

			setService = setService
					+ '<input type="checkbox" class="billSlaveChk'
					+ t.listSubServiceIpdDto[i].serviceId
					+ '" disabled=disabled id="chkOpdBill'
					+ (t.listSubServiceIpdDto[i].billDetailsId)
					+ '" name="opdBillCheckbox" value="'
					+ t.listSubServiceIpdDto[i].billDetailsId + '">';
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';

	}

	$("#serviceDataEstimate" + j).html(setService);
}


/*-------------------------Package Billing-------------------------------*/


/*******************************************************************************
 * @Kishor
 * @date 8_Aug_2017 
 * @code This method is used to fetch records of Ipd Package Services.
 ******************************************************************************/
function getPackagedataforIpd(pSId,pSubSId,billDetailsId,callFrom,amount, concession,ot_flag) {
	
	resetAllPopUpData();
	getSpecialization("reg","SplNamePackageIpd");
	
	$('#otServId').val(pSId);
	var a=$("#otServId").val();
	 
	if(a==4 && ot_flag == "Y"){ 
			
		 
		 $('#addServicePackage').hide();
		 $('#addServicePackageOT').show();
		 
		 
	}else{ 		
		
			 $('#addServicePackageOT').hide();
			 $('#addServicePackage').show();
			 
	} 
	
	var totalamt = amount - concession;
	$('#billDetailsIdIpd').val(billDetailsId);
	$('#subServiceIdIpd').val(pSubSId);
	$('#servIdPackageIpd2').val(pSId);
	$('#totalPackageAmountIPD').text(totalamt);
	
	$('#amountpack').val(amount);
	$('#concessionpack').val(concession);
	
	$("#qtyPackageIpd").val(1);
	$("#amountPackageIpd").val(0);
	$('#queryType').val('insert');
	$('#otherBillDetailsIdIpd').val(0);
	$("#childsubServiceIDIpd").val(0);
	$("#ratePackageIpd").val(0);
	$("#doctorNamePackageIpd").val(0);
	
	var sponsorId;
	var chargesSlaveId;
	//alert(billDetailsId);
	
	if(callFrom=="IpdSponsor")
	{
		sponsorId = $("#SponsorsourceTypeId").val();
	    chargesSlaveId = $("#chargesSlaveId").val();
		if (sponsorId == 1 && chargesSlaveId > 0) {

			sponsorId = $("#SponsorsourceTypeId").val();
			chargesSlaveId = $("#chargesSlaveId").val();

	} else {
		sponsorId = 0;
		chargesSlaveId = 0;
	}
	}
	if(callFrom=="general"){
		sponsorId = $("#SponsorsourceTypeId").val();
	    chargesSlaveId = $("#chargesSlaveId").val();
		if (sponsorId == 1 && chargesSlaveId > 0) {

			sponsorId = $("#SponsorsourceTypeId").val();
			chargesSlaveId = $("#chargesSlaveId").val();
	}else {
		sponsorId = 0;
		chargesSlaveId = 0;
	}
	}
	
	
	
	var treatmentId=$('#treatmentId').text();
	var patientId=$('#patientId').text();
	

	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"pSId" : pSId,
			"pSubSId" : pSubSId,
			"sponsorId" : sponsorId,
			"chargesSlaveId" : chargesSlaveId,
			"treatmentId" : treatmentId,
			"patientId" : patientId,
			"billDetailsId" : billDetailsId
		},
		url : "ehat/ipdbill/getPackagedataforIpd",*/
		
		data : {
			"serviceId" : pSId,
			"subServiceId" : pSubSId,			
			"chargesSlaveId" : chargesSlaveId,
			"treatmentId" : treatmentId,
			"patienttId" : patientId,
			"billDetailsId" : billDetailsId
		},
		url : "ehat/ipdbillmgt/getPackagedataforIpd",
		error : function() {
			alert('error');
		},
		success : function(pSId,pSubSId) {
			$('#amountPackageIpd').attr('readonly', 'true');
			getSubservicesOfPackageForIpdTemp(pSId,pSubSId,callFrom);
		}
	});
}

/*******************************************************************************
  * @Kishor
 * @date 5_Aug_2017 
 * @code This method is used to Set records of Package Services.
 ******************************************************************************/
function getSubservicesOfPackageForIpdTemp(r,s,callFrom) {

	var totalamt=0;
	var htm = "";
	
	htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">#</th>'
		
		+ '<th class="col-md-3 center" " style="height: 21.5px;"><div class="TextFont">Pack Service</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Doc Name</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Rate</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Qty</th>'
		
		
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Amount</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Date Slave</th>'
	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		
	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"  ><input type="checkbox" onclick="checkAllinpacipd(this.id)" id="chk"></th>'
		+ '</tr></thead>';
	
	var index = 0;
	for ( var i = 0; i < r.listIpdPackageDto.length; i++) {
		var dateTime= new Date(r.listIpdPackageDto[i].createdDateTime).toLocaleDateString('en-GB');
		var dname = r.listIpdPackageDto[i].docName;
		var otherBillDetailsId =r.listIpdPackageDto[i].otherBillDetailsId;
		var docId          =r.listIpdPackageDto[i].docId;
		var childServiceId =r.listIpdPackageDto[i].childServiceId;
		var otherAmount    =r.listIpdPackageDto[i].otherAmount;
		var otherRate      =r.listIpdPackageDto[i].otherRate;
		var rate           =r.listIpdPackageDto[i].rate;
		var amount         =r.listIpdPackageDto[i].amount;
		//var ot_flag        ="N";
		if (dname == null) {
			dname = "-";
		}
		htm = htm
				
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='categoryNameIpdPackage"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listIpdPackageDto[i].categoryName
				+ "</td>" 
				+"<td col-md-2-1 center center' id='docNameIpdPackage"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ dname
				+ "</td>";
				
				if (callFrom =="IpdSponsor") {
					totalamt = totalamt + otherAmount;
					htm = htm
					+ "<td class='col-md-2-1 center' id='rateIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ (otherRate).toFixed(2)
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='quantityIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listIpdPackageDto[i].quantity
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='amountIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ (otherAmount).toFixed(2)
					+ "</td>";
				} else {
					totalamt = totalamt + amount;
					htm = htm
					+ "<td class='col-md-2-1 center' id='rateIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ (rate).toFixed(2)
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='quantityIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listIpdPackageDto[i].quantity
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='amountIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ (amount).toFixed(2)
					+ "</td>";
				}
				
				
				htm = htm
				+ "<td class='col-md-2-1 center' id='dateTimeIpdPackage"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ dateTime
				+ "</td>";
				
				
				if ((r.listIpdPackageDto[i].paidFlag=="Y")) {
					htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listIpdPackageDto[i].billDetailsId+'" onclick="editOnClickForPackageIPD('+r.listIpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listIpdPackageDto[i].billDetailsId+'></i></button></a></td>';
					htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listIpdPackageDto[i].billDetailsId+'" onclick="deleteOnClickForPackageIpd('+r.listIpdPackageDto[i].serviceId+','+r.listIpdPackageDto[i].subServiceId+','+r.listIpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\',\'N\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listIpdPackageDto[i].billDetailsId+'></i></button></a></td>';
				
					
				}else{
					
					if (r.listIpdPackageDto[i].cancle =="Y") {
						htm = htm	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+r.listIpdPackageDto[i].billDetailsId+'"  disabled="disabled" onclick="editOnClickForPackageIPD('+r.listIpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listIpdPackageDto[i].billDetailsId+'></i></button></a></td>';
						htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listIpdPackageDto[i].billDetailsId+'" onclick="deleteOnClickForPackageIpd('+r.listIpdPackageDto[i].serviceId+','+r.listIpdPackageDto[i].subServiceId+','+r.listIpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\',,\'N\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listIpdPackageDto[i].billDetailsId+'></i></button></a></td>';
					
						
					}else{
						htm = htm	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+r.listIpdPackageDto[i].billDetailsId+'"  onclick="editOnClickForPackageIPD('+r.listIpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listIpdPackageDto[i].billDetailsId+'></i></button></a></td>';
						htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listIpdPackageDto[i].billDetailsId+'" onclick="deleteOnClickForPackageIpd('+r.listIpdPackageDto[i].serviceId+','+r.listIpdPackageDto[i].subServiceId+','+r.listIpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\',\'N\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listIpdPackageDto[i].billDetailsId+'></i></button></a></td>';
					
						
					}			
				}		
				
		htm = htm  +	'<td class="only-checkbox" >';
		
		if(r.listIpdPackageDto[i].paidFlag=="N"){
			
			htm = htm +	'<input type="checkbox" class="billSlaveChk'+r.listIpdPackageDto[i].serviceId+'" '
			
			+' id="chkOpdBillipd'+otherBillDetailsId+'" '
			+'name="ipdBillCheckbox" value="'+ otherBillDetailsId +'">';
			//'onclick="setTotalPaidbySlave('+r.listIpdPackageDto[i].billDetailsId+','+r.listIpdPackageDto[i].serviceId+')" '
		}else{
			
			htm = htm +	'<input type="checkbox" disabled="disabled" value="'+ r.listIpdPackageDto[i].billDetailsId+'">';
			
		}
		htm = htm 
				
		+ "<input type='hidden' id='otherBillDetailsIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listIpdPackageDto[i].otherBillDetailsId + "'>"

		+ "<input type='hidden' id='chargesIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listIpdPackageDto[i].chargesId + "'>"
		
		+ "<input type='hidden' id='chargesslave_idIpdPackage"+ otherBillDetailsId + "' value='"+ r.listIpdPackageDto[i].chargesSlaveId + "'>"
		
		+ "<input type='hidden' id='serviceIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listIpdPackageDto[i].serviceId + "'>"
		
		+ "<input type='hidden' id='childSubServiceIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listIpdPackageDto[i].childSubServiceId + "'>"

		+ "<input type='hidden' id='subServiceIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listIpdPackageDto[i].subServiceId + "'>"

		
		+ "<input type='hidden' id='subServicenameIpdPackage"+ otherBillDetailsId + "' value='"+ r.listIpdPackageDto[i].categoryName + "'>"
		
		+ "<input type='hidden' id='rate"+ otherBillDetailsId + "' value='"+ r.listIpdPackageDto[i].rate + "'>"
		
		+ "<input type='hidden' class='amountOfPack' id='amount"+ otherBillDetailsId + "' value='"+ r.listIpdPackageDto[i].amount + "'>"
		
		+ "<input type='hidden' class='quantityOfPack' id='quantity"+ otherBillDetailsId + "' value='"+ r.listIpdPackageDto[i].quantity + "'>"
		
		+ "<input type='hidden' id='docName"+ otherBillDetailsId + "' value='"+ docId + "'>"
		
		+ "<input type='hidden' id='childServiceId"+ otherBillDetailsId + "' value='"+ childServiceId + "'>"
		
		+ "</tr>" ;
			
		index++;
	}

	$("#packageIpdDiv").html(htm);
	$('#queryType').val('insert');
	var callfrom="ipd";
	totalAmountPackageIPD(totalamt,callFrom);
	
	
}


/**
 * @author   :Kishor
 * @date     :23-Aug-2017
 * @code     :for Reset records of other bill details package billing Ipd Data***/
function resetAllPopUpData(){

	
	$('#servIdPackageIpd').val(0);
	$("#perManualPackageIpd").val("");
	
	$("#ratePackageIpd").val(0);
	$("#doctorNamePackageIpd").val(0);	
	$("#qtyPackageIpd").val(1);
	$("#amountPackageIpd").val(0);
	
	$('#billDetailsIdIpd').val(0);
	$("#childsubServiceIDIpd").val(0);
	$('#subServiceIdIpd').val(0);	
	$('#servIdPackageIpd2').val(0);	
	
	$('#queryType').val('insert');
	//$('#otherBillDetailsIdIpd').val("");
	
//	$("#SponsorsourceTypeId").val("");
	//$("#chargesSlaveId").val("");
	
	//$("#servIdPackageIpd").val(""); 
	
	
	
	
}


/**
 * @author   :Kishor
 * @date     :9-Aug-2017
 * @code     :for Edit records of other bill details package billing Ipd***/
function editOnClickForPackageIPD(billDetailsId, otherBillDetailsId, cmt){
	//getting values of package on input feilds 
	var subName            =$("#subServicenameIpdPackage"+otherBillDetailsId).val();
	var subServiceId       =$("#subServiceIdIpdPackage"+otherBillDetailsId).val();
	var rate               =$("#rate"+otherBillDetailsId).val();
	var dockId             =$("#docName" +otherBillDetailsId).val();
	var quantity           =$("#quantity" +otherBillDetailsId).val();
	var amount             =$("#amount" +otherBillDetailsId).val();	
	var serviceId          =parseInt($('#serviceIdIpdPackage'+otherBillDetailsId).val());
	//alert(serviceId);
    var childSubSerID      =parseInt($("#childSubServiceIdIpdPackage"+otherBillDetailsId).val()); 
    var sponsorID          =parseInt($("#chargesIdIpdPackage"+otherBillDetailsId).val());
    var chargesSlaveID     =parseInt($("#chargesslave_idIpdPackage"+otherBillDetailsId).val());
   // var otherBillDetailsId =parseInt($("#otherBillDetailsIdOpdPackage"+otherBillDetailsId).val());
    var childServiceId    =$("#childServiceId"+otherBillDetailsId).val();
	//setting values of package on input feilds 
   
	$("#servIdPackageIpd").val(childServiceId); 
	$('#subServiceIdIpd').val(subServiceId);
	
	$('#servIdPackageIpd').val(serviceId).text();
	
	//$('#servIdPackageIpd option:not(:selected)').prop('disabled', true);
	
    //$('#servIdPackageIpd option:not(:selected)').prop('disabled', true);
	$("#perManualPackageIpd").val(subName);
	$("#childsubServiceIDIpd").val(childSubSerID);
	$("#ratePackageIpd").val(rate);
	$("#doctorNamePackageIpd").val(dockId).text();
	
	$("#qtyPackageIpd").val(quantity);
	$("#amountPackageIpd").val(amount);
	$('#queryType').val('update');
	$('#otherBillDetailsIdIpd').val(otherBillDetailsId);
	//setting on hidden feilds to access 
	
	
	
	//$("#otherBillDetailsIdOpd").val(otherBillDetailsId);
	//$("#SponsorsourceTypeId").val(sponsorID);
	//$("#chargesSlaveId").val(chargesSlaveID);
	$('#billDetailsIdIpd').val(billDetailsId);
	
	
}

/**
 * @author   :Kishor
 * @date     :9-Aug-2017
 * @code     :for calculate particular amount of package ***/
function calculatePackageForIpd() {
	var rate = $("#ratePackageIpd").val();
	var qty = $("#qtyPackageIpd").val();
	var amt =$("#amountPackageIpd").val();
	
	amt = qty*rate;
	$("#amountPackageIpd").val(Math.round(amt));
	
}

/**
 * @author   :Bilal
 * @date     :8-Aug-2017
 * @code     :for update records of Ipd package billing ***/
function savePackageBillingIPD(callfrom) {

	if(callfrom =="OT")
		{
		

		/*var serviceId = $("#servIdPackage").val();*/
		var serviceId = $("#servIdPackageIpd option:selected").val();
		//alert("hi" + serviceId);
		var iscombination = "Y";
		var chargesId = parseInt($("#SponsorsourceTypeId").val());
		var chargesSlaveId = parseInt($("#chargesSlaveId").val());
		var callfrom =$('#saveServiceCallFrom').val();
		//var iscombination =$("#iscombination").val();
		if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
			chargesId = 0;
		}
		
		if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
			chargesSlaveId = 0;
		}
		if (serviceId == 2) {
			
		}
		else if (serviceId == 4) {
			//alert("hi");
			var ot_flag = "Y";			
			var queryType = $('#queryType').val();		
			var doctorId = $("#doctorNamePackageIpd option:selected").val();		
			var patienttId     = $("#pId").val();
			var treatmentId    = $("#tId").val();
			var departmentId   = $("#depdocdeskid").val();		
			var billId         = parseInt($("#billNo").html());
			var sourceTypeId   = $("#sourceTypeId").val();	
			var serviceId      =$("#servIdPackageIpd").val(); 		
			var childSubServiceId   =$("#childsubServiceIDIpd").val();//childSubSerID
			
			var otherRate =0;		
			var otherAmount = 0;			
			var rate =0;		
			var quantity =0;
			var amount =0;
			
			var sponsorHideForIpd1=$('#sponsorHideForIpd1').attr('class');

			if(sponsorHideForIpd1 == "active"){
				 otherRate           =$("#ratePackageIpd").val();		
				 quantity      = $("#qtyPackageIpd").val();
				 otherAmount        = $("#amountPackageIpd").val();
			}else{
				 rate           =$("#ratePackageIpd").val();		
				 quantity      = $("#qtyPackageIpd").val();
				 amount        = $("#amountPackageIpd").val();
			}
			
			//alert(rate +"--- "+amount);
			
			var billDetailsId =$("#billDetailsIdIpd").val();		
			var otherBillDetailsId =$('#otherBillDetailsIdIpd').val();
			var subServiceId  =$('#subServiceIdIpd').val();		
			//var subServiceId = $("#subserviceid").val();
			var subservicesname = $("#perManualPackageIpd").val();
			//var servicename = $("#servicename").val();
			var unitId = $("#uId").val();
			var childServiceId = $("#servIdPackageIpd").val();
			if (childServiceId == "" || childServiceId == null
					|| childServiceId == undefined || isNaN(childServiceId)) {
				childServiceId = 0;
			}
			/*var tempDate = createdDateTime.split("/");
			var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);*/

			if (childSubServiceId == "" || childSubServiceId == null
					|| childSubServiceId == undefined || isNaN(childSubServiceId)) {
				childSubServiceId = 0;
			}

			if (subservicesname == "" || subservicesname == null) {
				alert("Please enter servicename ");
				return false;
			}
			if (unitId == 0) {
				unitid = $("#allunitid").val();
			}

			var serviceDetails = {
					listEhatOtherBillDetailForIpd : []
			};
			if(sponsorHideForIpd1 == "active"){
				serviceDetails.listEhatOtherBillDetailForIpd.push({
					
					otherbildetailidipd : otherBillDetailsId,
					patienttId : patienttId,
					billDetailsId : billDetailsId,
					serviceId : serviceId,
					ot_flag : ot_flag,
					doctorId : doctorId,
					treatmentId : treatmentId,
					departmentId : departmentId,
					billId : billId,
					sourceTypeId : sourceTypeId,
					rate : otherRate,
					amount : otherAmount,
					otherRate : otherRate,
					otherAmount : otherAmount,
					quantity : quantity,					
					serviceId         : serviceId,
					childSubServiceId : childSubServiceId,
					unitId            : unitId,
					subServiceId      : subServiceId,
					

					chargesId : chargesId,
					chargesSlaveId : chargesSlaveId,

					iscombination : iscombination,
					childServiceId : childServiceId

				});
			}else{
				serviceDetails.listEhatOtherBillDetailForIpd.push({
					
					otherbildetailidipd : otherBillDetailsId,
					patienttId : patienttId,
					billDetailsId : billDetailsId,
					serviceId : serviceId,
					ot_flag : ot_flag,
					doctorId : doctorId,
					treatmentId : treatmentId,
					departmentId : departmentId,
					billId : billId,
					sourceTypeId : sourceTypeId,
					rate : rate,
					quantity : quantity,
					amount : amount,
					otherRate : rate,
					otherAmount : amount,
					serviceId         : serviceId,
					childSubServiceId : childSubServiceId,
					unitId            : unitId,
					subServiceId      : subServiceId,
					

					chargesId : chargesId,
					chargesSlaveId : chargesSlaveId,

					iscombination : iscombination,
					childServiceId : childServiceId

				});
			}
			

			serviceDetails = JSON.stringify(serviceDetails);

			var inputs = [];

			inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
			inputs.push("queryType=" + queryType);
			inputs.push("callfrom=" + callfrom);

			var str = inputs.join('&');

			jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ipdbill/savePackageIpd",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {

					if (r > 0) {
						if (queryType == 'insert') {
							alert("Service assign Sucessfully");
						} else {
							alert("Service Update Sucessfully");
						}
						 
						$('#perManualPackageIpd').val("");
						$('#servIdPackageIpd').val(0);
						$('#doctorNamePackageIpd').val(0);

						$("#ratePackageIpd").val(0);
						$("#qtyPackageIpd").val(1);
						$("#amountPackageIpd").val(0);

						$('#saveServiceCallFrom').val(0);

					}
				}
			});
			$('#queryType').val("insert");
			$('#otherBillDetailsIdIpd').val(0);
			$('#subserviceid').val(0);
			callfrom ="general";
			
			var sponsorHideForIpd1=$('#sponsorHideForIpd1').attr('class');
			
			if(sponsorHideForIpd1 == "active"){
				callfrom = "sponsor";
			}else{
				callfrom ="general";
			}
		var amount=0;
					getPopUpDataForOT(serviceId,subServiceId,billDetailsId,callfrom,amount);
					//resetAllPopUpData();
					
		}

		else {
			var ot_flag = "Y";
			var queryType = $('#queryType').val();		
			var doctorId = $("#doctorNamePackageIpd option:selected").val();		
			var patienttId     = $("#pId").val();
			var treatmentId    = $("#tId").val();
			var departmentId   = $("#depdocdeskid").val();		
			var billId         = parseInt($("#billNo").html());
			var sourceTypeId   = $("#sourceTypeId").val();	
			//var serviceId      =$("#servIdPackageIpd2").val(); 		
			var serviceId      =4; 		

			var childSubServiceId   =$("#childsubServiceIDIpd").val();//childSubSerID
			var rate           =$("#ratePackageIpd").val();		
			var quantity      = $("#qtyPackageIpd").val();
			var amount        = $("#amountPackageIpd").val();
			var billDetailsId =$("#billDetailsIdIpd").val();		
			var otherBillDetailsId =$('#otherBillDetailsIdIpd').val();
			var subServiceId  =$('#subServiceIdIpd').val();		
			//var subServiceId = $("#subserviceid").val();
			var subservicesname = $("#perManualPackageIpd").val();
			//var servicename = $("#servicename").val();
			var unitId = $("#uId").val();
			var childServiceId = $("#servIdPackageIpd").val();
			if (childServiceId == "" || childServiceId == null
					|| childServiceId == undefined || isNaN(childServiceId)) {
				childServiceId = 0;
			}
			/*var tempDate = createdDateTime.split("/");
			var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);*/

			if (childSubServiceId == "" || childSubServiceId == null
					|| childSubServiceId == undefined || isNaN(childSubServiceId)) {
				childSubServiceId = 0;
			}

			if (subservicesname == "" || subservicesname == null) {
				alert("Please enter servicename ");
				return false;
			}
			if (unitId == 0) {
				unitid = $("#allunitid").val();
			}

			var serviceDetails = {
					listEhatOtherBillDetailForIpd : []
			};
			serviceDetails.listEhatOtherBillDetailForIpd.push({
				
				otherbildetailidipd : otherBillDetailsId,
				patienttId : patienttId,
				billDetailsId : billDetailsId,
				serviceId : serviceId,
				doctorId : doctorId,
				treatmentId : treatmentId,
				departmentId : departmentId,
				billId : billId,
				sourceTypeId : sourceTypeId,
				rate : rate,
				quantity : quantity,
				amount : amount,
				otherRate : rate,
				otherAmount : amount,
				serviceId         : serviceId,
				childSubServiceId : childSubServiceId,
				unitId            : unitId,
				subServiceId      : subServiceId,			
				ot_flag : ot_flag, 
				chargesId : chargesId,
				chargesSlaveId : chargesSlaveId,

				iscombination : iscombination,
				childServiceId : childServiceId

			});

			serviceDetails = JSON.stringify(serviceDetails);

			var inputs = [];

			inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
			inputs.push("queryType=" + queryType);
			inputs.push("callfrom=" + callfrom);

			var str = inputs.join('&');

			jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ipdbill/savePackageIpd",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {

					if (r > 0) {
						if (queryType == 'insert') {
							alert("Service assign Sucessfully");
						} else {
							alert("Service Update Sucessfully");
						}
						 
						$('#perManualPackageIpd').val("");
						$('#servIdPackageIpd').val(0);
						$('#doctorNamePackageIpd').val(0);

						$("#ratePackageIpd").val(0);
						$("#qtyPackageIpd").val(1);
						$("#amountPackageIpd").val(0);

						$('#saveServiceCallFrom').val(0);

					}
				}
			});
			$('#queryType').val("insert");
			$('#otherBillDetailsIdIpd').val(0);
			$('#subserviceid').val(0);
			callfrom ="general";
			
			getPopUpDataForOT(serviceId,subServiceId,billDetailsId,callfrom);

					//getPackagedataforIpd(serviceId,subServiceId,billDetailsId,callfrom);
					//resetAllPopUpData();
				
			}

		$("#perticular").removeAttr('readonly');
		$("#pay").removeAttr('readonly');
		$("#coPay").removeAttr('readonly');
		$("#concession").removeAttr('readonly');
		$("#qty").removeAttr('readonly');

		
		}
	else{
	
	/*var serviceId = $("#servIdPackage").val();*/
	var serviceId = $("#servIdPackageIpd option:selected").val();

	var iscombination = "Y";
	var chargesId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	var callfrom =$('#saveServiceCallFrom').val();
	//var iscombination =$("#iscombination").val();
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	if (serviceId == 1) {
		
	}/*else if (serviceId == 2) {
		
	}*/
	/*else if (serviceId == 4) {
		
		var ot_flag        = "N";			
		var queryType      = $('#queryType').val();		
		var doctorId       = $("#doctorNamePackageIpd option:selected").val();		
		var patienttId     = $("#pId").val();
		var treatmentId    = $("#tId").val();
		var departmentId   = $("#depdocdeskid").val();		
		var billId         = parseInt($("#billNo").html());
		var sourceTypeId   = $("#sourceTypeId").val();	
		var serviceId      =$("#servIdPackageIpd").val(); 		
		var childSubServiceId   =$("#childsubServiceIDIpd").val();//childSubSerID
		var rate           =$("#ratePackageIpd").val();		
		var quantity      = $("#qtyPackageIpd").val();
		var amount        = $("#amountPackageIpd").val();
		var billDetailsId =$("#billDetailsIdIpd").val();		
		var otherBillDetailsId =$('#otherBillDetailsIdIpd').val();
		var subServiceId  =$('#subServiceIdIpd').val();		
		//var subServiceId = $("#subserviceid").val();
		var subservicesname = $("#perManualPackageIpd").val();
		//var servicename = $("#servicename").val();
		var unitId = $("#uId").val();
		var childServiceId = $("#servIdPackageIpd").val();
		if (childServiceId == "" || childServiceId == null
				|| childServiceId == undefined || isNaN(childServiceId)) {
			childServiceId = 0;
		}
		var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

		if (childSubServiceId == "" || childSubServiceId == null
				|| childSubServiceId == undefined || isNaN(childSubServiceId)) {
			childSubServiceId = 0;
		}

		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}

		var serviceDetails = {
				listEhatOtherBillDetailForIpd : []
		};
		serviceDetails.listEhatOtherBillDetailForIpd.push({
			
			otherbildetailidipd : otherBillDetailsId,
			patienttId : patienttId,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			ot_flag : ot_flag, 
			doctorId : doctorId,
			treatmentId : treatmentId,
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sourceTypeId,
			rate : rate,

			quantity : quantity,
			amount : amount,

			serviceId         : serviceId,
			childSubServiceId : childSubServiceId,
			unitId            : unitId,
			subServiceId      : subServiceId,
			

			chargesId : chargesId,
			chargesSlaveId : chargesSlaveId,

			iscombination : iscombination,
			childServiceId : childServiceId

		});

		serviceDetails = JSON.stringify(serviceDetails);

		var inputs = [];

		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);
		inputs.push("callfrom=" + callfrom);

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdbill/savePackageIpd",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				if (r > 0) {
					if (r ==1) {
						alert("Service assign Sucessfully");
					} else {
						alert("Service Update Sucessfully");
					}
					 
					$('#perManualPackageIpd').val("");
					$('#servIdPackageIpd').val(0);
					$('#doctorNamePackageIpd').val(0);

					$("#ratePackageIpd").val(0);
					$("#qtyPackageIpd").val(1);
					$("#amountPackageIpd").val(0);

					$('#saveServiceCallFrom').val(0);

				}
			}
		});
		$('#queryType').val("insert");
		$('#otherBillDetailsIdIpd').val(0);
		$('#subserviceid').val(0);
		callfrom =$('#receiptOf').val();
		var amount      = $('#amountpack').val();
		var concession =$('#concessionpack').val();
		var ot_flag="N";
		getPackagedataforIpd(serviceId,subServiceId,billDetailsId,callfrom, amount, concession,ot_flag);
				//resetAllPopUpData();
				
	}
*/
	else {
		
		var queryType = $('#queryType').val();		
		var doctorId = $("#doctorNamePackageIpd option:selected").val();		
		var patienttId     = $("#pId").val();
		var treatmentId    = $("#tId").val();
		var departmentId   = $("#depdocdeskid").val();		
		var billId         = parseInt($("#billNo").html());
		var sourceTypeId   = $("#sourceTypeId").val();	
		var serviceId      =$("#servIdPackageIpd2").val(); 		
		var childSubServiceId   =$("#childsubServiceIDIpd").val();//childSubSerID
		var rate           =$("#ratePackageIpd").val();		
		var quantity      = $("#qtyPackageIpd").val();
		var amount        = $("#amountPackageIpd").val();
		var billDetailsId =$("#billDetailsIdIpd").val();		
		var otherBillDetailsId =$('#otherBillDetailsIdIpd').val();
		var subServiceId  =$('#subServiceIdIpd').val();			
		var subservicesname = $("#perManualPackageIpd").val();
		
		var otherRate =rate;
		var otherAmount=amount;
	    var otherCoPay=0;
		var otherConcession=0;
		var otherPay=otherAmount-otherConcession;
		
		var unitId = $("#uId").val();
		var childServiceId = $("#servIdPackageIpd").val();
		if (childServiceId == "" || childServiceId == null
				|| childServiceId == undefined || isNaN(childServiceId)) {
			childServiceId = 0;
		}
		
		if (childSubServiceId == "" || childSubServiceId == null
				|| childSubServiceId == undefined || isNaN(childSubServiceId)) {
			childSubServiceId = 0;
		}

		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}

		var serviceDetails = {
				listEhatOtherBillDetailForIpd : []
		};
		serviceDetails.listEhatOtherBillDetailForIpd.push({
			
			otherbildetailidipd : otherBillDetailsId,
			patienttId : patienttId,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			doctorId : doctorId,
			treatmentId : treatmentId,
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sourceTypeId,
			rate : rate,
			quantity : quantity,
			amount : amount,
			serviceId         : serviceId,
			childSubServiceId : childSubServiceId,
			unitId            : unitId,
			subServiceId      : subServiceId,			

			chargesId : chargesId,
			chargesSlaveId : chargesSlaveId,

			iscombination : iscombination,
			childServiceId : childServiceId,
			otherRate       : otherRate,
			otherAmount     : otherAmount,
			otherCoPay      : otherCoPay,
			otherPay        : otherPay,
			otherConcession : otherConcession
		});

		serviceDetails = JSON.stringify(serviceDetails);

		//call for when assign test that time test send to lab immediatly.
		packageIpdSendToLab(serviceDetails,queryType);
		if(smplColFlg=="Y"){
			alertify.error("Package sample are collected.You can not add or edit Test");
			$('#perManualPackageIpd').val("");
			$('#servIdPackageIpd').val(0);
			$('#doctorNamePackageIpd').val(0);
			$("#ratePackageIpd").val(0);
			$("#qtyPackageIpd").val(1);
			$("#amountPackageIpd").val(0);
			$('#saveServiceCallFrom').val(0);
			return false;
		}else if(dupTestFlag=="Y"){
			alertify.error("You can not add Duplicate Test.");
			$('#perManualPackageIpd').val("");
			$('#servIdPackageIpd').val(0);
			$('#doctorNamePackageIpd').val(0);
			$("#ratePackageIpd").val(0);
			$("#qtyPackageIpd").val(1);
			$("#amountPackageIpd").val(0);
			$('#saveServiceCallFrom').val(0);
			return false;
		}
		
		var inputs = [];

		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);
		inputs.push("callfrom=" + callfrom);

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdbill/savePackageIpd",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				if (r > 0) {
					if (r ==1 ) {
						alert("Service assign Sucessfully");
					} else {
						alert("Service Update Sucessfully");
					}
					 
					$('#perManualPackageIpd').val("");
					$('#servIdPackageIpd').val(0);
					$('#doctorNamePackageIpd').val(0);

					$("#ratePackageIpd").val(0);
					$("#qtyPackageIpd").val(1);
					$("#amountPackageIpd").val(0);

					$('#saveServiceCallFrom').val(0);

				}
			}
		});
		$('#queryType').val("insert");
		$('#otherBillDetailsIdIpd').val(0);
		$('#subserviceid').val(0);
		callfrom =$('#receiptOf').val();
		var amount      = $('#amountpack').val();
		var concession =$('#concessionpack').val();
		var ot_flag="N";
				getPackagedataforIpd(serviceId,subServiceId,billDetailsId,callfrom, amount, concession,ot_flag);
				//resetAllPopUpData();
			
		}

	$("#perticular").removeAttr('readonly');
	$("#pay").removeAttr('readonly');
	$("#coPay").removeAttr('readonly');
	$("#concession").removeAttr('readonly');
	$("#qty").removeAttr('readonly');
	}
	
	resetAllIpd("general");
}





/************
 *@author	: Kishor
 *@date		: 9-Aug-2017
 *@code		: autosuggestion Ipd packages
 ***********/
function autoSuggetionPackageIPD(inputID) {
	
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	//var unitlist=listofunit.slice(1); 
	var unitlist="";
	var depdocdeskid = $("#depdocdeskid").val();
	var querytype="all";
	//var serviceid= $("#servIdPackageIpd").val(); 
	var serviceid= $("#servIdPackageIpd").val(); 
	if (serviceid == "" || serviceid == null || serviceid == undefined || isNaN(serviceid)) {
		serviceid = 0;
	}
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",
	
		success : function(r) {
			 console.log(r);
			 autoCompPackageBillingForIpd(r,inputID);
			
         
				
		}
	});
}


/************
 *@author	: Kishor		
 *@date		: 9-Aug-2017
 *@code		: autosuggestion Ipd packages
 ***********/
function autoCompPackageBillingForIpd(response,id) {
	
	var myArray = response;// parsing response in JSON format

	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							$(ul).css("z-index", "10000000000");
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				
				showHeader : true,
				columns : [ {
					name : 'CategoryName',
					width : '100px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '90px',
					valueField : 'serviceName'
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					
				
						
						$('#perManualPackageIpd').val(ui.item.categoryName);
						$("#childsubServiceIDIpd").val(ui.item.categoryid);
						$("#servicename").val(ui.item.serviceName);
						$("#servIdPackageIpd" ).val(ui.item.serviceid);
						$("#ratePackageIpd" ).val(ui.item.categorycharges);
						$("#concession" ).val(ui.item.concession);
						
						var rate     =ui.item.categorycharges;
						var quantity =$("#qtyPackageIpd").val();
						var amount=rate*quantity;
						$("#amountPackageIpd" ).val(amount);
						//$("#servIdPackage" ).val(ui.item.serviceid);
						//$("#iscombination").val(ui.item.iscombination);
						
						calculatePackageForIpd();
				
					return false;
					
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstService.length);
					var result;
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'categoryName' : 'NO',
							'serviceName' : 'Match',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					response(result);
					
					
					
				}
			});
}


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 10_Aug_2017 
 * @Code Delete data from Package List For Opd 
 ******************************************************************************/

function deleteOnClickForPackageIpd(serviceId,subServiceId,billDetailsId,otherBillDetailsId,index,callfrom,ot_flag ) {
	// deleteModule()
	
	//callfrom =$('#receiptOf').val();
	var amount      = $('#amountpack').val();
	var concession =$('#concessionpack').val();
	var r = confirm("Are You Sure You Want To Delete This Service?");
	if (r == true) {
		//call for delete test in lab on 08-March-2018.
		deleteLabPackageTestIPD(otherBillDetailsId);
	 
		if(deleteTestSmplColFlg=="Y"){
			alertify.error("Test Sample are collected,You can't delete this Test.");
			return false;
		}
		jQuery.ajax({
			type : "POST",
			url : "ehat/ipdbill/deleteOnClickForPackageIpd",
			data : {
				"billDetailsId" : billDetailsId,
				"otherBillDetailsId" : otherBillDetailsId,
			},
			timeout	: 1000 * 60 * 5,
			cache	: false,
			error	: function() {
				alert('error');
			},
			success : function(response) {
				//refreshUnitMaster();
				//alert(response);
				
				if(serviceId==4 && ot_flag == "Y")
				{
					getPopUpDataForOT(serviceId,subServiceId,billDetailsId,callfrom);
					//resetAllPopUpData();
				}else
				{
					getPackagedataforIpd(serviceId,subServiceId,billDetailsId,callfrom, amount, concession);
					//resetAllPopUpData();
				}
			}
		});
	}
}
/**@author Bilal
 * @Date 16_Aug_2017
 * @code For total amount  *** */
function totalAmountPackageIPD(total,callFrom) {

	//var total = 0;
	var totalquantity = 0;
	var cmt = 1;
	
	/*$(".amountOfPack").each(function() {
		
		var charges  = parseFloat($(this).val());
		
		if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
			charges = 0;
		}
		total = total + charges;
		

	});*/
	
   $(".quantityOfPack").each(function() {
		
		var quantity  = parseFloat($(this).val());
		
		if (quantity == "" || quantity == null || quantity == undefined || isNaN(quantity)) {
			charges = 0;
		}
		totalquantity = totalquantity + quantity;
		

	});
	cmt++;
	
	$("#totalAmtPackageIPD").text(parseFloat(total).toFixed(2));
	$("#totalQtyPackageIPD").text(totalquantity);
	Math.ceil($("#totalAmtPackage").val()); 
	
	var totalPackage=$("#totalPackageAmountIPD").text();
	if(total > totalPackage){
		var totalRemaining =   total - totalPackage;
		
		$("#totalRemainingPackIPD").text(totalRemaining.toFixed(2));
	}else{
		$("#totalRemainingPackIPD").text("0");
	}
}

/**@author   :Bilal
 * @date     :21-Aug-2017
 * @code     :for converting ipd services to package **/
function convertToPackageipd(callfrom, treatmentId) {

	var inputs = [];
	inputs.push("treatmentId=" + treatmentId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/getlistOfPackageipd",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			console.log(r);
			setTempOfPackagesNameipd(r);

		}
	});
}

/**@author   :Bilal
 * @date     :21-Aug-2017
 * @code     :for setting template of package whose combination Y **/
function setTempOfPackagesNameipd(r){
	
	var htm = "";
	var index = 0;
	
	for ( var i = 0; i < r.listBillNobleServiceDto.length; i++) {
	var billDetailsId     =r.listBillNobleServiceDto[i].billDetailsId;
	//var isModify          =r.listBillNobleServiceDto[i].isModify;
	//var cancle            =r.listBillNobleServiceDto[i].cancle;
	//var paidFlag          =r.listBillNobleServiceDto[i].paidFlag;
	//var otherRate         =r.listBillNobleServiceDto[i].otherRate;
	//var otherAmount       =r.listBillNobleServiceDto[i].otherAmount;
	//var otherPay          =r.listBillNobleServiceDto[i].otherPay;
	//var otherCoPay        =r.listBillNobleServiceDto[i].otherCoPay;
	//var otherConcession   =r.listBillNobleServiceDto[i].otherConcession;
	//var isCombination     =r.listBillNobleServiceDto[i].isCombination;
	//var docId             =r.listBillNobleServiceDto[i].docId;
	var amount            =r.listBillNobleServiceDto[i].amount;
	var subServiceId      =r.listBillNobleServiceDto[i].subServiceId;
	//var concession        =r.listBillNobleServiceDto[i].concession;
	//var rate              =r.listBillNobleServiceDto[i].rate;
	//var quantity          =r.listBillNobleServiceDto[i].quantity;
	//var coPay             =r.listBillNobleServiceDto[i].coPay;
	//var pay               =r.listBillNobleServiceDto[i].pay;
	var treatmentId       =r.listBillNobleServiceDto[i].treatmentId;
	var categoryName      =r.listBillNobleServiceDto[i].categoryName;
	var serviceId         =r.listBillNobleServiceDto[i].serviceId;
	//var charges           =r.listBillNobleServiceDto[i].charges;
	//var docName           =r.listBillNobleServiceDto[i].docName;
	
	
		htm = htm
				
				+ "<tr  id='trlis"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='packageName"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ categoryName
				+ "</td>" 
				
				+ "<td class='col-md-2-1 center' id='amountOpdPackage"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ amount
				+ "</td>"
				
			    +"<td class='col-md-2-1 center'><input id='Otherid' type='radio' value='Y' " +
			    		"onclick='convertToPackageipdfor("+billDetailsId+","+subServiceId+","+serviceId+","+treatmentId+")' " 
					+"name='privilegesModify' style='position:relative; left:20%; margin-top:1px'>"
					+ "</td>"
				+ "</tr>" ;
				
			
		index++;
	}

	$("#packageDivToConvert").html(htm);
	
}

/**@author   :Bilal
 * @date     :21-Aug-2017
 * @code     :for converting services to package **/
function convertToPackageipdfor(billDetailsId,subServiceId,serviceId,treatmentId){
	
	
	var servIdsChecked=[]; 
    $('input[name=opdBillCheckbox]:checked').each(function(){
		
    	var servId = $("#sId"+$(this).val()).html();
    	if(servId != 3){
    		
    		servIdsChecked.push($(this).val());
    	}		
	});
    if (servIdsChecked == 0) {
		alert("please select atleast one service to convert");
		return false;
	}
    var inputs = [];
    
    inputs.push("treatmentId=" + treatmentId);
	inputs.push("servIdsChecked=" + servIdsChecked);	
	
	inputs.push("billDetailsId=" + billDetailsId);
	inputs.push("subServiceId=" + subServiceId);
	inputs.push("serviceId=" + serviceId);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",		
		url 	: "ehat/ipdbill/convertServiceToPackage",
		error 	: function() {
					alert('Network Issue!!!');
				  },
		success : function(r) {
			
			alertify.success(r);
		}
	});
	$("#packToConv").modal('hide');
	resetAllIpd('general');
	
}

/**@author   :Bilal
 * @date     :21-Aug-2017
 * @code     :for Icluding Remaining amount in package **/
function includeAmountInPackipd() {
	
	var billDetailsId=$('#billDetailsIdIpd').val();
	var pSubSId =$('#subServiceIdIpd').val();
	var pSId=$('#servIdPackageIpd2').val();
	var amount=parseFloat($('#totalAmtPackageIPD').text());
	var totalAmtPackage =parseFloat($('#totalPackageAmountIPD').text());
	var totalRemainingPackIPD =parseFloat($('#totalRemainingPackIPD').text());
	

		if (totalRemainingPackIPD > 0) {
		var inputs = [];

		inputs.push("pSubSId=" + pSubSId);
		inputs.push("pSId=" + pSId);
		inputs.push("billDetailsId=" + billDetailsId);
		inputs.push("amount=" + amount);
		inputs.push("totalAmtPackage=" + totalAmtPackage);
		inputs.push("totalAmtRem=" + totalRemainingPackIPD);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdbill/includeInPackAmount",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				alertify.success(r);
				$("#packIpd").modal('hide');
				resetAllIpd('IpdSponsor');

			}
		});

	}else{
		alert("Their is no Remaining amount to include");
		return false;
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 18-July-2017
* @codeFor	: reset All
 ************/
function resetAllIpd(callFrom){
	
	getAdminChargesIpd(callFrom);
	$("#payable").val(0);
	$("#discount").val(0);
	$("#payNow").val(0);
	$("#batchnumber").val(0);
	$("#newBatchNumber").val(0);	
	$("#payMode").val(0);
	$("#payee").val(1);
	$('#trSpon').hide();  
	
	$('#trRefPer').hide(); 
	$("#refPer").val(0);
	
	$('#headerTable').find('.member').hide();  
	$('#headerTable').find('.member2').hide();  
	
	//$(".openAllSlave").trigger('click');
	var trId=$("#treatmentId").text();
	var departmentId   = $("#depdocdeskid").val();	
	var a=$("#preIpdId").val();
		
	if(callFrom=="general"){
		
		//getPatientBillAmountIpd(trId,"general");
		$("#IpdSponsor").html("");		
		$("#cghsBill").html("");
		
		if(a=="treatcloseForIpd"){
			
			//getPatientPreviousBillAmountForGenIpd(trId,"general");
			getPatientBillAmountIpd(trId,"generalPrev");
			$('#currentCalfromdiv').hide();
			$('#prevCalfromdiv').show();
			 
			$('#generalHideForIpd').hide();
			$('#generalHideForIpdPrevBill').show();		
			
		}else{
			
			getPatientBillAmountIpd(trId,"general");
			$('#prevCalfromdiv').hide();
			$('#currentCalfromdiv').show();
				 
			$('#generalHideForIpdPrevBill').hide();
			$('#generalHideForIpd').show();			
		}
		
		$("#receiptOf").val("general");
		
	}else if(callFrom=="cghs"){
		
		$("#IpdSponsor").html("");
		$("#billDetails").html("");
		
		if(a=="treatcloseForIpd"){
			
			getPatientPreviousBillAmountForGenIpd(trId,"cghs");
			getIpdServiceDetailsForCghs(trId,departmentId);
			$('#currentCalfromdiv').hide();
			$('#prevCalfromdiv').show();
			 
			$('#generalHideForIpd').hide();
			$('#generalHideForIpdPrevBill').show();	
			
		}else{
			sponsorId = $("#SponsorsourceTypeId").val();
		    chargesSlaveId = $("#chargesSlaveId").val();
			if (sponsorId == 1 && chargesSlaveId > 0) {
				getPatientBillAmountIpdForSponsor(trId,"cghs");
			}else{
				getPatientBillAmountIpd(trId,"cghs");
			}
			
			getIpdServiceDetailsForCghs(trId,departmentId);
			//setDynamicFieldInCghs();//added by kishor
		}
		
		$("#receiptOf").val("cghs");
		
	}else{
		
		$("#billDetails").html("");
		$("#cghsBill").html("");
		
		if(a=="treatcloseForIpd"){
			
			//getPatientPreviousBillAmountForSponsorIpd(trId,"cghs");
			getPatientBillAmountIpdForSponsor(trId,"IpdPrevSponsor");		
			
		}else{
			getPatientBillAmountIpdForSponsor(trId,"IpdSponsor");
		}
		$("#receiptOf").val("IpdSponsor");
	}
	
	var uiMode=$("#uiMode").val();
	
	setFinalBillUi();
	
	if(uiMode=="P"){
		
		fetchIpdbilDiscount("ipdBill");	
		//getCommonAdvcIpd();			
		getBillReceiptDetailsIpd('all');
		//fetchAllReceiptTotals("ipd");
		//fetchPrevPendingIpd("onload");
		getBillAmountDetails(callFrom);
		/*fetchAuthorisedBy();
		getAllPayments();
		getAllNarrations();*/
	}
	
	$("#refundableCheckbox").prop("checked",false);
	$("#outstandingCheckbox").prop("checked",false);
	$("#refundableCheckbox").prop("disabled", false);
	$("#refundableCheckbox").prop("disabled", false);
	
	$("#refundableCheckbox").prop("checked", false);
	$("#refundableCheckbox").prop("checked", false);
	
	//added by kishor   --Start---
	$("#refundableDiffCheckbox").prop("checked",false);
	//added by kishor   -- End---
	
	$("#trPayable").hide();
	//$("#trPayable").show();

	var remain = $("#finalRemain").html();
	$("#payable").val(parseFloat(remain).toFixed(2)); 
	
	setTimeout(function() {			
		$('#perticular').focus();
		$('#perticularIpdSponsor').focus();
		$('#perticularOpdSponsor').focus();
	},50);
	
	var outstandingAmt = $("#finalRemain").html();
	if(a=="treatcloseForIpd" && Number(outstandingAmt) <= 0){
		
		$("#btnDisc").hide();
	}
	// added by kishor
	var multipleSponsor=$("#multipleSponsor").val();		
	if(multipleSponsor=="on"){
		getSponsorSanctionAmount();
		$('#sponsorDetailsHead').show();
		$('#sanctionAmountHead').show();
		$('#utilisedAmountHead').show();
		$('#balanceAmountHead').show();
		
		$('#sanctionAmount').show();
		$('#utilisedAmount').show();
		$('#balanceAmount').show();
	}	
	
	//$("#expPerticularLabels").trigger('click');	
	$(".openAllSlaveIpd").trigger('click');	
	
	userAccess();
}



function getPopUpDataForOT(pSId,pSubSId,billDetailsId,callFrom,amount)
{
	$('#queryType').val("insert");
	$('#otServId').val(pSId);
	var a=$("#otServId").val();
	 
	if(a=="4"){ 
			
		 
		 $('#addServicePackage').hide();
		 $('#addServicePackageOT').show();
		 
		 
	}else{ 		
		
			 $('#addServicePackageOT').hide();
			 $('#addServicePackage').show();
			 
	} 
	
	resetAllPopUpData();
	
	
	
	$('#billDetailsIdIpd').val(billDetailsId);
	$('#subServiceIdIpd').val(pSubSId);
	$('#servIdPackageIpd').val(pSId);
	$('#totalPackageAmountIPD').text(amount);
	$('#servIdPackageIpd').val(0);
	var sponsorId;
	var chargesSlaveId;
	//alert(billDetailsId);
	
	if(callFrom=="sponsor")
	{
		sponsorId = $("#SponsorsourceTypeId").val();
	    chargesSlaveId = $("#chargesSlaveId").val();
		if (sponsorId == 1 && chargesSlaveId > 0) {

			sponsorId = $("#SponsorsourceTypeId").val();
			chargesSlaveId = $("#chargesSlaveId").val();

	} else {
		sponsorId = 0;
		chargesSlaveId = 0;
	}
	}
	if(callFrom=="general"){
		sponsorId = $("#SponsorsourceTypeId").val();
	    chargesSlaveId = $("#chargesSlaveId").val();
		if (sponsorId == 1 && chargesSlaveId > 0) {

			sponsorId = $("#SponsorsourceTypeId").val();
			chargesSlaveId = $("#chargesSlaveId").val();
	}else {
		sponsorId = 0;
		chargesSlaveId = 0;
	}
	}
	
	
	
	var treatmentId=$('#treatmentId').text();
	var patientId=$('#patientId').text();
	

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"pSId" : pSId,
			"pSubSId" : pSubSId,
			"sponsorId" : sponsorId,
			"chargesSlaveId" : chargesSlaveId,
			"treatmentId" : treatmentId,
			"patientId" : patientId,
			"billDetailsId" : billDetailsId
		},
		url : "ehat/ipdbill/getPopUpDataForOT",

		error : function() {
			alert('error');
		},
		
		success : function(pSId,pSubSId) {
			$('#amountPackageIpd').attr('readonly', 'true');
			
			getSubservicesOfPopUpForOTTemp(pSId,pSubSId,callFrom);
			
		}
	});
}

function getSubservicesOfPopUpForOTTemp(r,s,callFrom)
{
	
var totamt = 0;
	var htm = "";
	var index = 0;
	for ( var i = 0; i < r.listGetPopUpDataForOTDto.length; i++) {
		var dateTime= new Date(r.listGetPopUpDataForOTDto[i].createdDateTime).toLocaleDateString('en-GB');
		var dname = r.listGetPopUpDataForOTDto[i].docName;
		var otherBillDetailsId =r.listGetPopUpDataForOTDto[i].otherBillDetailsId;
		var docId      =r.listGetPopUpDataForOTDto[i].docId;
		
		//var ot_flag    =r.listGetPopUpDataForOTDto[i].otFlag;
	
		if (dname == null) {
			dname = "-";
		}
		htm = htm
				
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='categoryNameIpdPackage"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listGetPopUpDataForOTDto[i].categoryName
				+ "</td>" 
				+"<td col-md-2-1 center center' id='docNameIpdPackage"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ dname
				+ "</td>";
				
				if(callFrom == "sponsor"){
					
					 totamt = totamt + r.listGetPopUpDataForOTDto[i].otherAmount;
					htm = htm
					+ "<td class='col-md-2-1 center' id='rateIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listGetPopUpDataForOTDto[i].otherRate
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='quantityIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listGetPopUpDataForOTDto[i].quantity
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='amountIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listGetPopUpDataForOTDto[i].otherAmount
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='dateTimeIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ dateTime
					+ "</td>";
					
					/*+"<td class='col-md-1 center'style='height: 21.5px;'>"
					+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ r.listGetPopUpDataForOTDto[i].idConfiguration + ","+(index + 1)+")'  data-toggle='modal'><i class='fa fa-edit'></i></button></td>"
				
					+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
					+ r.listGetPopUpDataForOTDto[i].idConfiguration + ", "+(index + 1)+")' ><i class='fa fa-edit'></i></button></td>";
					*/
					if ((r.listGetPopUpDataForOTDto[i].paidFlag=="Y")) {
						htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'" onclick="editOnClickForPackageIPD('+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
						htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'" onclick="deleteOnClickForPackageIpd('+r.listGetPopUpDataForOTDto[i].serviceId+','+r.listGetPopUpDataForOTDto[i].subServiceId+','+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\', \'Y\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
					}else{
						
						if (r.listGetPopUpDataForOTDto[i].cancle =="Y") {
							htm = htm	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'"  disabled="disabled" onclick="editOnClickForPackageIPD('+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
							htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'" onclick="deleteOnClickForPackageIpd('+r.listGetPopUpDataForOTDto[i].serviceId+','+r.listGetPopUpDataForOTDto[i].subServiceId+','+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\', \'Y\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
						}else{
							htm = htm	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'"  onclick="editOnClickForPackageIPD('+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
							htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'" onclick="deleteOnClickForPackageIpd('+r.listGetPopUpDataForOTDto[i].serviceId+','+r.listGetPopUpDataForOTDto[i].subServiceId+','+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\', \'Y\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
						}			
					}		
					
			htm = htm  +	'<td class="only-checkbox" >';
			
			if(r.listGetPopUpDataForOTDto[i].paidFlag=="N"){
				
				htm = htm +	'<input type="checkbox" class="billSlaveChk'+r.listGetPopUpDataForOTDto[i].serviceId+'" onclick="setTotalPaidbySlave('+r.listGetPopUpDataForOTDto[i].billDetailsId+','+r.listGetPopUpDataForOTDto[i].serviceId+')" checked=checked id="chkOpdBill'+(r.listGetPopUpDataForOTDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ r.listGetPopUpDataForOTDto[i].billDetailsId+'">';
				
			}else{
				
				htm = htm +	'<input type="checkbox" disabled="disabled" value="'+ r.listGetPopUpDataForOTDto[i].billDetailsId+'">';
				
			}
			htm = htm 
					
			+ "<input type='hidden' id='otherBillDetailsIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].otherBillDetailsId + "'>"

			+ "<input type='hidden' id='chargesIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].chargesId + "'>"
			
			+ "<input type='hidden' id='chargesslave_idIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].chargesSlaveId + "'>"
			
			+ "<input type='hidden' id='serviceIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].serviceId + "'>"
			
			+ "<input type='hidden' id='childSubServiceIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].childSubServiceId + "'>"

			+ "<input type='hidden' id='subServiceIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].subServiceId + "'>"

			
			+ "<input type='hidden' id='subServicenameIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].categoryName + "'>"
			
			+ "<input type='hidden' id='rate"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].otherRate + "'>"
			
			+ "<input type='hidden' class='amountOfPack' id='amount"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].otherAmount + "'>"
			
			+ "<input type='hidden' class='quantityOfPack' id='quantity"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].quantity + "'>"
			
			+ "<input type='hidden' id='docName"+ otherBillDetailsId + "' value='"+ docId + "'>"
			+ "</tr>" ;
				
			index++;
					
				}else{
					 totamt = totamt + r.listGetPopUpDataForOTDto[i].amount;
					htm = htm
					+ "<td class='col-md-2-1 center' id='rateIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listGetPopUpDataForOTDto[i].rate
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='quantityIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listGetPopUpDataForOTDto[i].quantity
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='amountIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ r.listGetPopUpDataForOTDto[i].amount
					+ "</td>"	
					
					+ "<td class='col-md-2-1 center' id='dateTimeIpdPackage"
					+ (index + 1)
					+ "' style='height: 21.5px;'>"
					+ dateTime
					+ "</td>";
					
					/*+"<td class='col-md-1 center'style='height: 21.5px;'>"
					+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ r.listGetPopUpDataForOTDto[i].idConfiguration + ","+(index + 1)+")'  data-toggle='modal'><i class='fa fa-edit'></i></button></td>"
				
					+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
					+ r.listGetPopUpDataForOTDto[i].idConfiguration + ", "+(index + 1)+")' ><i class='fa fa-edit'></i></button></td>";
					*/
					if ((r.listGetPopUpDataForOTDto[i].paidFlag=="Y")) {
						htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'" onclick="editOnClickForPackageIPD('+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
						htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'" onclick="deleteOnClickForPackageIpd('+r.listGetPopUpDataForOTDto[i].serviceId+','+r.listGetPopUpDataForOTDto[i].subServiceId+','+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\', \'Y\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
					}else{
						
						if (r.listGetPopUpDataForOTDto[i].cancle =="Y") {
							htm = htm	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'"  disabled="disabled" onclick="editOnClickForPackageIPD('+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
							htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'" onclick="deleteOnClickForPackageIpd('+r.listGetPopUpDataForOTDto[i].serviceId+','+r.listGetPopUpDataForOTDto[i].subServiceId+','+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\', \'Y\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
						}else{
							htm = htm	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'"  onclick="editOnClickForPackageIPD('+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
							htm = htm	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAcce SlaveBtn'+r.listGetPopUpDataForOTDto[i].billDetailsId+'" onclick="deleteOnClickForPackageIpd('+r.listGetPopUpDataForOTDto[i].serviceId+','+r.listGetPopUpDataForOTDto[i].subServiceId+','+r.listGetPopUpDataForOTDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\', \'Y\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listGetPopUpDataForOTDto[i].billDetailsId+'></i></button></a></td>';
						}			
					}		
					
			htm = htm  +	'<td class="only-checkbox" >';
			
			if(r.listGetPopUpDataForOTDto[i].paidFlag=="N"){
				
				htm = htm +	'<input type="checkbox" class="billSlaveChk'+r.listGetPopUpDataForOTDto[i].serviceId+'" onclick="setTotalPaidbySlave('+r.listGetPopUpDataForOTDto[i].billDetailsId+','+r.listGetPopUpDataForOTDto[i].serviceId+')" checked=checked id="chkOpdBill'+(r.listGetPopUpDataForOTDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ r.listGetPopUpDataForOTDto[i].billDetailsId+'">';
				
			}else{
				
				htm = htm +	'<input type="checkbox" disabled="disabled" value="'+ r.listGetPopUpDataForOTDto[i].billDetailsId+'">';
				
			}
			htm = htm 
					
			+ "<input type='hidden' id='otherBillDetailsIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].otherBillDetailsId + "'>"

			+ "<input type='hidden' id='chargesIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].chargesId + "'>"
			
			+ "<input type='hidden' id='chargesslave_idIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].chargesSlaveId + "'>"
			
			+ "<input type='hidden' id='serviceIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].serviceId + "'>"
			
			+ "<input type='hidden' id='childSubServiceIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].childSubServiceId + "'>"

			+ "<input type='hidden' id='subServiceIdIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].subServiceId + "'>"

			
			+ "<input type='hidden' id='subServicenameIpdPackage"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].categoryName + "'>"
			
			+ "<input type='hidden' id='rate"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].rate + "'>"
			
			+ "<input type='hidden' class='amountOfPack' id='amount"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].amount + "'>"
			
			+ "<input type='hidden' class='quantityOfPack' id='quantity"+ otherBillDetailsId + "' value='"+ r.listGetPopUpDataForOTDto[i].quantity + "'>"
			
			+ "<input type='hidden' id='docName"+ otherBillDetailsId + "' value='"+ docId + "'>"
			+ "</tr>" ;
				
			index++;
				}
				
				
				
				
	}
	var a=$("#otServId").val();
	 
	if(a=="4"){ 
		$("#packageIpdDivName").text('OT Service Details');
		$('#totalPackageAmountIPDLabel').hide();
		$('#totalPackageAmountIPD').hide();
		$('#totalRemainingPackIPDLabel').hide();
		$('#totalRemainingPackIPD').hide();
		$('#includeRemainingPack').hide();
		$('#convertToBillingipd').hide();
	}else{
		$("#packageIpdDivName").text('Package Details');
		$('#totalPackageAmountIPDLabel').show();
		$('#totalPackageAmountIPD').show();
		$('#totalRemainingPackIPDLabel').show();
		$('#totalRemainingPackIPD').show();
		$('#includeRemainingPack').show();
		$('#convertToBillingipd').show();
	}
	var callfrom="ipd";
	$("#packageIpdDiv").html(htm);
	totalAmountPackageIPD(totamt,callfrom);
	

}


/**@author   :Bilal
 * @date     :21-Aug-2017
 * @code     :for converting services to Billing **/
function convertToBillingipd(callfrom, treatmentId) {

	var otherBillDetailsIdOpd = [];
	$('input[name=ipdBillCheckbox]:checked').each(function() {
          
		var data=$(this).val();
	
		if(data == "N"){
			
		}else{
			
		   otherBillDetailsIdOpd.push($(this).val());
		}
		
	});
	if (otherBillDetailsIdOpd == 0) {
		alert("please select atleast one service to convert");
		return false;
	}
	
	
	var inputs = [];

	inputs.push("treatmentId=" + treatmentId);
	inputs.push("otherBillDetailsIdOpd=" + otherBillDetailsIdOpd);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/convertToBillingipd",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			alertify.success(r);
		}
	});
	$("#packIpd").modal('hide');
	resetAllIpd('general');

}

//For checking All services
/**@author   :Bilal
 * @date     :27-sep-2017
 * @code     :For checking all in package billing***/
function checkAllinpacipd(id){
	
	var checkbox = $('input:checkbox[id='+id+']');
	
	if (checkbox.is(':checked') == true) {
		$('input[name=ipdBillCheckbox]').each(function() {
			$(this).prop('checked','checked');
			
		});
	}else{
		$('input[name=ipdBillCheckbox]').each(function() {
			$(this).removeAttr('checked','checked');
			
		});
	}
	
}

// save Cghs services.
function saveIpdCghs() {
	var totalManualRemains = $('#totalManualRemains').val();
	if(totalManualRemains > 0)
		{
		alert("Remain Amount should be 0");
		return false;			
		}
			
	var queryType = $('#queryType').val();		
			
	var patientId     = $("#pId").val();
	var treatmentId    = $("#tId").val();
	var departmentId   = $("#depdocdeskid").val();		
	var billId         = parseInt($("#billNo").html());	
	var unitId = $("#uId").val();
	

	var tableRows = $('#cghsBillManual tr').length;

	/*if (tableRows == undefined || tableRows == 0) {
		alert("There is no record to add in CGHS List!");
		return false;
	}*/
	
		
	var cghsDetails = {
			listCghs : []
	};
	
	for(var index=1;index <= tableRows;index++){
		/*var Service = $("#serM"+index).text();
		var packService = $("#packM"+index).text();
		var packser="";
		if (packService == "" || packService == null) {
			packser = "-";
		} else {
			packser = $("#packM" + index).text();
		}
		var date = $("#dateM"+index).text();
		var rate = $("#rateM"+index).text();
		var qty = $("#qtyM"+index).text();
		var con = $("#conM"+index).text();
		var amount = $("#amt"+index).text();
		var pay = $("#payM"+index).text();
		var coPay = $("#cPayM"+index).text();
		var cghsFlag = 'M';*/
//alert(index);
		var Service = $("#serM"+index).val();
		if(tableRows != index){
			if(Service == ""){
				alert("Service should not be empty.");
				return false;
			}
		}
		
		var packService = $("#packM"+index).val();
		var packser="";
		if (packService == "" || packService == null) {
			packser = "-";
		} else {
			packser = $("#packM" + index).val();
		}
		var date = $("#dateM"+index).val();
		var rate = $("#rateM"+index).val();
		var qty = $("#qtyM"+index).val();
		var con = $("#conM"+index).val();
		var amount = $("#amt"+index).val();
		var pay = $("#payM"+index).val();
		var coPay = $("#cPayM"+index).val();
		var cghsFlag = 'M';
		
		
		
		/*alert(Service);
		alert(packService);
		alert(rate);
		alert(qty);
		alert(amount);
		alert(pay);
		alert(coPay);*/
		//return false;
		
		/*if (con == "" || con == null || con == undefined || isNaN(con)) {
			con = 0;
		}*/
		//alert(amount);
		
		cghsDetails.listCghs.push({
			queryType 		: queryType,
			patientId 		: patientId,
			treatmentId 	: treatmentId,
			departmentId 	: departmentId,
			billId			: billId,
			unitId			: unitId,
			serviceName 	: Service,
			packService     :packser,
			//date 			: date,
			rate 			: rate,
			quantity 		: qty,
			concession 		: con,
			amount 			: amount,
			pay 			: pay,
			coPay 			: coPay,
			cghsFlag 		: cghsFlag
			
			});
	}
	
	
	var tableR = $('#cghsBillManualChangeRemains tr').length;
	

	/*if (tableR == undefined || tableR == 0) {
		alert("There is no record to add in CGHS List!");
		return false;
	}*/
	
		
	var cghsDetailsRemain = {
			listCghsRemain : []
	};
	
	for(var i=1;i <= tableR;i++){
		var Service = $("#serR"+i).text();
		var date = $("#dateR"+i).text();		
		var packService = $("#packR"+i).text();
		
		
		var packser="";
		if (packService == "" || packService == null) {
			packser = "-";
		} else {
			packser = $("#packR" + i).text();
		}
		
		var rate = $("#rateR"+i).text();
		var qty = $("#qtyR"+i).text();		
		var amount = $("#amtR"+i).text();
		var pay = $("#payR"+i).text();
		
		var cghsFlagg = 'R';
		
		
		cghsDetailsRemain.listCghsRemain.push({
			queryType 		: queryType,
			patientId 		: patientId,
			treatmentId 	: treatmentId,
			departmentId 	: departmentId,
			billId			: billId,
			unitId			: unitId,
			serviceName 	: Service,
			//date 			: date,
			amount 			: amount,
			packService     :packser,
			rate 			: rate,
			quantity 		: qty,
			pay 			: pay,
			//coPay 			: coPay,
			cghsFlag 		: cghsFlagg
			
			});
	}
	cghsDetailsRemain = JSON.stringify(cghsDetailsRemain);
	cghsDetails = JSON.stringify(cghsDetails);
	
	if(cghsDetailsRemain == null || cghsDetailsRemain == undefined){
		alert("Fill Records!!!");
		return false;
	}
	
	if(cghsDetails == null || cghsDetails == undefined){
		alert("No Records!!!");
		return false;
	}
	//alert(cghsDetails);
	//return false;
	var inputs = [];
	
	//inputs.push('action=CghsfetchReports');
	inputs.push('treatmentId=' + treatmentId);	
	inputs.push('departmentId=' + departmentId);
	
	inputs.push("cghsDetails="+ encodeURIComponent(cghsDetails));
	inputs.push("cghsDetailsRemain="+ encodeURIComponent(cghsDetailsRemain));
	inputs.push("queryType=" + queryType);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/saveIpdCghs",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r);
			alertify.success("Saved succesfully");
			//proFeesDoctorPayment();
			getIpdServiceDetailsForCghs(treatmentId, departmentId);
		}
	});

}

function getIpdServiceDetailsForCghs(t, d) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : d
		},
		url : "ehat/ipdbill/getIpdServiceDetailsForCghs",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getIpdServiceDetailsForCghsTemp(r, d);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}
function getIpdServiceDetailsForCghsTemp(t, s) {

	var setService = "";
	var setService1 = "";
	var preBillIpd=$("#preIpdId").val(); 
	
var remainAmt=0;
var counter1=0;
var counter=0;
	for ( var i = 0; i < t.listCghs.length; i++) {
		
		var datetime12 = new Date(t.listCghs[i].createdDateTime)
				.toLocaleDateString('en-GB');
		var flag = t.listCghs[i].cghsFlag;
		remainAmt =Number(remainAmt) + Number(t.listCghs[i].amount);
		if(flag == 'M'){
			counter1 ++;
			setService = setService

			+ '<tr id="tr' + counter1 + '">'
					+ '<td style="display:none;" id="row'
					+ counter1
					+ '"> class="col-md-1 center">' + counter1 + '</td>'
				
					+ '<td style="display:none;" id="amtt'
					+ counter1 + '"> '
					+ t.listCghs[i].amount + ' </td>'
					
					
					+ '<td id="sN'
					+ counter1 + '" onclick="editOnClickForCghsIPD('+ counter1 +')">'
					+ '<div class="text-center">'+ counter1 + '</div>' + '</td>'
					
					+ '<td onclick="editOnClickForCghsIPD('+ counter1 +')">'
					+ '<div class="text-center"><input type="text" style="width: 350px;" onkeyup="setAutocompleteOnIpdBillingDynamic(this.id,'+counter1+')",onchange="setDynamicFieldInCghs()" id="serM'
					+ counter1 + '" value="'+t.listCghs[i].serviceName+'" '
					+  '></div>' + '</td>'
					
					+ '<td onclick="editOnClickForCghsIPD('+ counter1 +')">'
					+ '<div class="text-center"><input type="text" id="packM'
					+ counter1 + '" value='+t.listCghs[i].packService + ''
					+  '></div>' + '</td>'
					
					+ '<td style="display:none;>' + '<div class="text-center"<input type="text" id="dateM' + counter1
					+ '" value='+datetime12+'>'
					+  '></div>' + '</td>'
					
					+ '<td >'
					+ '<div class="text-center"> <input class="text-right" type="text" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+counter1+')" id="rateM'
					+ counter1 + '" value='+(t.listCghs[i].rate) +''
					+  '></div>' + '</td>'
					
					+ '<td >'
					+ '<div class="text-center"> <input type="text" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+counter1+')" id="qtyM'
					+ counter1 + '" value='+t.listCghs[i].quantity +''
					+  '></div>' + '</td>'

					+ '<td style="display:none; >' + '<div class="text-center"> <input type="text" onkeypress="return validatePrice(event)" id="conM' + counter1
					+ '" value='+(t.listCghs[i].concession).toFixed(2)+''
					+  '></div>' + '</td>'			
					

					+ '<td >' + '<div class="text-center"><input class="text-right" type="text" onkeypress="return validatePrice(event)" id="amt' + counter1
					+ '" value='+(t.listCghs[i].amount) +''
					+  '></div>' + '</td>'

					+ '<td style="display:none;" >' + '<div class="text-center"><input type="text" onkeypress="return validatePrice(event)" id="payM' + counter1
					+ '" value='+(t.listCghs[i].pay).toFixed(2) +''
					+  '></div>' + '</td>'

					+ '<td style="display:none;" >' + '<div class="text-center"><input type="text" onkeypress="return validatePrice(event)" id="cPayM' + counter1
					+ '" value='+(t.listCghs[i].coPay).toFixed(2) +''
					+  '></div>' + '</td>';
			if(preBillIpd=="treatcloseForIpd"){ 
			/*	setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listCghs[i].cghsId+'"  disabled="disabled" onclick="editOnClickForCghsIPD('+ counter1 +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listCghs[i].cghsId+'></i></button></a></td>';*/
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listCghs[i].cghsId+'" disabled="disabled" onclick="deleteOnClickForCghsIpd('+ t.listCghs[i].amount +','+ t.listCghs[i].cghsId +','+ t.listCghs[i].departmentId +')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+t.listCghs[i].cghsId+'></i></button></a></td>';
			}else{
				/*setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listCghs[i].cghsId+'"  onclick="editOnClickForCghsIPD('+ counter1 +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listCghs[i].cghsId+'></i></button></a></td>';*/
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listCghs[i].cghsId+'" onclick="deleteOnClickForCghsIpd('+ t.listCghs[i].amount +','+ t.listCghs[i].cghsId +','+ t.listCghs[i].departmentId +')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+t.listCghs[i].cghsId+'></i></button></a></td>';
				}
			
			setService = setService + '</tr>';
		}
		
		else if(flag == 'R'){
			counter ++;
			setService1 = setService1

			+ '<tr id="tr' + counter + '">'
					+ '<td style="display:none;" id="row'
					+ counter
					+ '"> class="col-md-1 center">' + counter + '</td>'
				
					+ '<td style="display:none;"><input type="text" id="amt'
					+ counter + ' value='+ t.listCghs[i].amount +'"> '
					+' </td>'
					
					+ '<td style="display:none;"><input type="text" id="dept'
					+ counter + '" value='+ t.listCghs[i].departmentId + '> '
					+' </td>'
					
					+ '<td style="display:none;"><input type="text" id="cghsid'
					+ counter + '" value='+ t.listCghs[i].cghsId + '> '
					+' </td>'

					+ '<td id="sN'
					+ counter + '">'
					+ '<div class="text-center">'+ counter + '</div>' + '</td>'
					
					+ '<td>'
					+ '<div class="text-center"><input type="text" style="width: 350px;" onchange="setDynmaicCghsRemains()" id="serR'
					+ counter + '" value='+ t.listCghs[i].serviceName + '></div>' 
					+ '</td>'
					
					+ '<td style="display:none;">' 
					+ '<div class="text-center"<input type="text"id="dateR'+ counter
					+ '" value='+ datetime12 +'>'
					+ '</div>' + '</td>'
					
					
					+ '<td>' + '<div class="text-center"> <input type="text" id="packR' + counter
					+ '" value='+ t.listCghs[i].packService +'>' 
					+'</div>' + '</td>'
					
					
					+ '<td>' + '<div class="text-center"><input class="text-right" type="text" onkeyup="calculatePerticularTotalRemainsNew('+counter+')" id="rateR' + counter
					+ '" value='+ t.listCghs[i].rate +'>'
					+'</div>' 
					+ '</td>'
					
					
					+ '<td>' + '<div class="text-center"><input type="text" onkeyup="calculatePerticularTotalRemainsNew('+counter+')" id="qtyR' + counter
					+ '" value='+ t.listCghs[i].quantity +'>'
					+ '</div>' + '</td>'
				
					+ '<td>' + '<div class="text-center"><input class="text-right" type="text" onkeyup="calculatePerticularTotalRemainsNew('+counter+')" id="amtR' + counter
					+ '" value='+ (t.listCghs[i].amount) + '>'
					+'</div>' + '</td>'

					+ '<td style="display:none;">' + '<div class="text-center"><input type="text" id="payR' + counter
					+ '" value='+ (t.listCghs[i].pay).toFixed(2) +'>'
					+ '</div>' + '</td>';
			if(preBillIpd=="treatcloseForIpd"){ 
				/*setService1 = setService1	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listCghs[i].cghsId+'"  disabled="disabled" onclick="editOnClickForCghsIPDRemain('+ counter +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listCghs[i].cghsId+'></i></button></a></td>';*/
				setService1 = setService1	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listCghs[i].cghsId+'" disabled="disabled" onclick="deleteOnClickForCghsIpd('+ t.listCghs[i].amount +','+ t.listCghs[i].cghsId +','+ t.listCghs[i].departmentId +')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+t.listCghs[i].cghsId+'></i></button></a></td>';
			}else{
				/*setService1 = setService1	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listCghs[i].cghsId+'"  onclick="editOnClickForCghsIPDRemain('+ counter +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listCghs[i].cghsId+'></i></button></a></td>';*/
				setService1 = setService1	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listCghs[i].cghsId+'" onclick="deleteOnClickForCghsIpd('+ t.listCghs[i].amount +','+ t.listCghs[i].cghsId +','+ t.listCghs[i].departmentId +')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+t.listCghs[i].cghsId+'></i></button></a></td>';
				}
			
			setService1 = setService1 + '<td class="only-checkbox" >';
			setService1 = setService1 + '</td>';
			setService1 = setService1 + '</tr>';
		}		

	}
	setTimeout(function() {			
		calDynamicTotal();
		}, 30);
	
	//var a = parseFloat($('#totalAmt').text());
	//var c=Number(a)-Number(remainAmt.toFixed(2));
	//$("#totalManualRemains").val(c);
	$('#totalManualRemains').attr('readonly', 'true');
	$('#amountManual').attr('readonly', 'true');
	$('#amountManualRemains').attr('readonly', 'true');
	$("#cghsBillManual").html(setService);
	$("#cghsBillManualChangeRemains").html(setService1);
	setDynamicFieldInCghs();
	setDynmaicCghsRemains();
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_Oct_2017 
 * @Code Delete data from Cghs List For Ipd 
 ******************************************************************************/

function deleteOnClickForCghsIpd(amt,cghsid,depid) {
	
	
	
	var r = confirm("Are You Sure You Want To Delete This Service?");
	if (r == true) {
		var treatmentId    = $("#tId").val();
		//var departmentId   = $("#depdocdeskid").text();		
		var tAmtRemain = $('#totalManualRemains').val();
		
		var deleteAmt = amt;
		var setAmt=Number(tAmtRemain)+Number(deleteAmt);
		jQuery.ajax({
			type : "POST",
			url : "ehat/ipdbill/deleteOnClickForCghsIpd",
			data : {
				"cghsid" : cghsid,
				"depid" : depid,
			},
			timeout	: 1000 * 60 * 5,
			cache	: false,
			error	: function() {
				alert('error');
			},
			success : function(response) {
				//refreshUnitMaster();
				//alert(response);
				alertify.error("Deleted succesfully");
				$('#totalManualRemains').val(setAmt);
				$('#totalManualRemains').attr('readonly', 'true');
				$('#packManual').text("");
				 getIpdServiceDetailsForCghs(treatmentId, depid);
					//resetAllPopUpData();
				
			}
		});
	}
}
//tk

function deleteCghs2(id){
	var len = $("#cghsBillManual tr").length;
	if(len == id){
		
	}else{
	var htm ="";
	$("#tkb").empty();
	for(var i =1; i<=len;i++){
		var serM = $("#serM"+i).val();
		var packM = $("#packM"+i).val();
		var dateM  = $("#dateM"+i).val() ;
		var rateM  = $("#rateM"+i).val();
		var qtyM = $("#qtyM"+i).val();
		var conM = $("#conM"+i).val();
		var amt = $("#amt"+i).val();
		var payM = $("#payM"+i).val();
		var cPayM = $("#cPayM"+i).val();
		
		if(serM==undefined || serM==null){
			serM="";
		}
		
		if(i!=id){
			var index = $("#tkb tr").length;
			index++;
			$("#tkb").append(
			'<tr class="cghsclassM" id="cghsId'
			+ index
			+ '"><td class=" center" id="inM'+ index + '">'
			+ index 
			+ '</td> <td  center"><input type="text" style="width: 350px;" value="'+serM+'" onkeyup="setAutocompleteOnIpdBillingDynamic(this.id,'+index+')" onchange="setDynamicFieldInCghs()" id="serM'+index +'"/>'
			+ '</td> <td  center"><input type="text" value="'+packM+'" onchange="setDynamicFieldInCghs()" id="packM'+ index + '"/>'
			+ '</td> <td  center" style="display:none;"><input type="text" value="'+dateM+'" id="dateM'+ index + '"/>'
			+ '</td> <td  center"><input class="text-right" type="text" value="'+rateM+'" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="rateM'+ index + '"/>'
			+ '</td> <td  center"><input type="text" value="'+qtyM+'" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="qtyM'+ index + '"/>'
			+ '</td> <td  center" style="display:none;"><input type="text" value="'+conM+'" onkeypress="return validatePrice(event)" id="conM'+ index + '"/>'
			+ '</td> <td  center"><input class="text-right" type="text" value="'+amt+'" onkeypress="return validatePrice(event)" id="amt'+ index + '"/>'
			+ '</td> <td  center" style="display:none;"><input type="text" value="'+payM+'" onkeypress="return validatePrice(event)" id="payM'+ index + '"/>'
			+ '</td> <td  center" style="display:none;"><input type="text" value="'+cPayM+'" onkeypress="return validatePrice(event)" id="cPayM'+ index + '"/>'
			+ '</td> <td  center"><i aria-hidden="true" onclick="deleteCghs2('
			+ index
			+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>'
			);
			//$("#tkb").append(htm2);

		}
		
	}
	
	var compAmt=$("#amt"+id).html();
	//alert(compAmt);
	var totAmt=$("#totalManualRemains").val();
	//alert(totAmt);
	var totAmttt=Number(totAmt)+Number(compAmt);
	$("#totalManualRemains").val(totAmttt);
	$("#cghsId"+id).remove();
	var set1 = $("#tkb").html();
	$("#cghsBillManual").empty();
	$("#cghsBillManual").html(set1);
	calDynamicTotal();
	}
}


function deleteManualCghs2(id){
	var len = $("#cghsBillManualChangeRemains tr").length;
	if(len == id){
		
	}else{
	var htm ="";
	$("#tkbR").empty();
	for(var i =1; i<=len;i++){
		var serM = $("#serR"+i).val();
		var dateM  = $("#dateR"+i).val();
		var packM  = $("#packR"+i).val();
		var rateM  = $("#rateR"+i).val();
		var qtyM = $("#qtyR"+i).val();
		//var conM = $("#conM"+i).text();
		var amt = $("#amtR"+i).val();
		var payM = $("#payR"+i).val();
		//var cPayM = $("#cPayM"+i).text();
		
		if(i!=id){
			var index = $("#tkbR tr").length;
			index++;
			$("#tkbR").append(
			'<tr class="cghsclassR" id="cghsId'
			+ index
			+ '"><td align="Center" id="inR'+ index + '">'
			+ index 
			+ '</td> <td align="Center"><input type="text" style="width: 350px;" onchange="setDynmaicCghsRemains()" id="serR'+ index + '" value="'+ serM+'">'
			+ '</td>'
			/*+'<td class="col-md-1 center" style="display:none;"><input type="text" id="dateR'+ index + 'value='+ dateM+'">'
			+ '</td>'*/
			+'<td align="Center"><input type="text" id="packR'+ index + '" value="'+ packM+'">'
			+ '</td><td align="Center"><input class="text-right" type="text"  onkeyup="calculatePerticularTotalRemainsNew('+index+')" id="rateR'+ index + '" value="'+ rateM+'">'
			+ '</td><td align="Center"><input type="text"  onkeyup="calculatePerticularTotalRemainsNew('+index+')" id="qtyR'+ index + '" value="'+ qtyM+'">'
			+ '</td><td align="Center"><input class="text-right" type="text"  id="amtR'+ index + '" value="'+ amt+'">'
			+ '</td>' 
			/*+'<td class="col-md-1 center"><input type="text" id="payR'+ index + 'value='+ payM+'">'
			+ '</td>'*/  
			+'<td align="Center"><i aria-hidden="true" onclick="deleteManualCghs2('
			+ index
			+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>'
			);
			//$("#tkb").append(htm2);

		}
		
	}
	
	var compAmt=$("#amtR"+id).html();
	//alert(compAmt);
	var totAmt=$("#totalManualRemains").val();
	//alert(totAmt);
	var totAmttt=Number(totAmt)+Number(compAmt);
	$("#totalManualRemains").val(totAmttt);
	$("#cghsIdR"+id).remove();
	var set1 = $("#tkbR").html();
	$("#cghsBillManualChangeRemains").empty();
	$("#cghsBillManualChangeRemains").html(set1);
	calDynamicTotal();
	}
}
function editOnClickForCghsIPD(counter)
{
	var editTotal=0;	
	var totalAmount = parseFloat($("#totalAmmt").text());	
	var tableRows = $('#cghsBillManual tr').length;
	
			for(var index=1;index <= tableRows;index++)
			{		
					var amount = parseFloat($("#amt"+index).text());		
					editTotal=Number(editTotal)+Number(amount);
			}
	
	var tableR = $('#cghsBillManualChangeRemains tr').length;	
	
			for(var index=1;index <= tableR;index++)
			{		
				var amount = parseFloat($("#amtR"+index).text());		
				editTotal=Number(editTotal)+Number(amount);
			}
			
	$('#editHidden').val(counter);
	$('#perManual').val($('#serM'+counter).text());
	$('#packManual').val($('#packM'+counter).text());
	$('#rateManual').val($('#rateM'+counter).text());
	$('#qtyManual').val($('#qtyM'+counter).text());
	$('#concessionManual').val($('#conM'+counter).text());	
	$('#amountManual').val($('#amt'+counter).text());
	$('#payManual').val($('#payM'+counter).text());
	$('#coPayManual').val($('#cPayM'+counter).text());
	
	var amountadd=parseFloat($('#amt'+counter).text());
	var x=((totalAmount- editTotal) + amountadd).toFixed(2);
	$("#totalManualRemains").val(x);
	$('#totalManualRemains').attr('readonly', 'true');
}

function editOnClickForCghsIPDRemain(counter)
{
	var editTotal=0;	
	var totalAmount = parseFloat($("#totalAmmt").text());	
	var tableRows = $('#cghsBillManual tr').length;
	
			for(var index=1;index <= tableRows;index++)
			{		
				var amount = parseFloat($("#amt"+index).text());		
				editTotal=Number(editTotal)+Number(amount);
			}
	
	var tableR = $('#cghsBillManualChangeRemains tr').length;	
	
			for(var index=1;index <= tableR;index++)
			{		
				var amount = parseFloat($("#amtR"+index).text());		
				editTotal=Number(editTotal)+Number(amount);
			}
			
	$('#editHiddenR').val(counter);
	$('#SerManualRemains').val($('#serR'+counter).text());	
	
	$('#packManualRemains').val($('#packR'+counter).text());	
	$('#rateManualRemains').val($('#rateR'+counter).text());	
	$('#qtyManualRemains').val($('#qtyR'+counter).text());	
	
	$('#amountManualRemains').val($('#amtR'+counter).text());
	$('#payManualRemains').val($('#payR'+counter).text());
	
	var amountadd=parseFloat($('#amtR'+counter).text());
	var x=((totalAmount- editTotal) + amountadd).toFixed(2);
	$("#totalManualRemains").val(x);
	$('#totalManualRemains').attr('readonly', 'true');
	
}

function cghsIpdPrint(callfrom)
{	
	var totalManualRemains = $('#totalManualRemains').val();
	if(totalManualRemains > 0)
		{
		alert("Remain Amount should be 0");
		return false;			
		}
	var patID = $("#patientId").text();
	var treatID = $("#treatmentId").text();
	var billId		= $("#billNo").text();
	var departmentId   = $("#depdocdeskid").val();
	var paidAmount = "No";

	if (callfrom == "Yes") {
		paidAmount = "Yes";
	}
	
	window.open("ipdCghsPrint.jsp?"+"patID=" +encodeURIComponent(patID) + 
		"&treatID=" + encodeURIComponent(treatID)+
		"&billId=" + encodeURIComponent(billId)+
		"&paidAmount=" + encodeURIComponent(paidAmount)+
		"&departmentId=" + encodeURIComponent(departmentId));
	closePopupForCghsPrint();
	}

function cghsRemainIpdPrint(callfrom)
{
	var totalManualRemains = $('#totalManualRemains').val();
	if(totalManualRemains > 0)
		{
		alert("Remain Amount should be 0");
		return false;			
		}
	var patID = $("#patientId").text();
	var treatID = $("#treatmentId").text();
	var billId		= $("#billNo").text();
	var departmentId   = $("#depdocdeskid").val();
	var paidAmount = "No";

	if (callfrom == "Yes") {
		paidAmount = "Yes";
	}
	
	window.open("ipdCghsRemainPrint.jsp?"+"patID=" +encodeURIComponent(patID) + 
		"&treatID=" + encodeURIComponent(treatID)+
		"&billId=" + encodeURIComponent(billId)+
		"&paidAmount=" + encodeURIComponent(paidAmount)+
		"&departmentId=" + encodeURIComponent(departmentId));
	closePopupForCghsPrint();
	}

function PrintDiffCghsAmount(callfrom)
{
	var totalManualRemains = $('#totalManualRemains').val();
	if(totalManualRemains > 0)
		{
		alert("Remain Amount should be 0");
		return false;			
		}
	var patID = $("#patientId").text();
	var treatID = $("#treatmentId").text();
	var billId		= $("#billNo").text();
	var departmentId   = $("#depdocdeskid").val();
	var paidAmount="No";
	
	if (callfrom == "Yes") {
		paidAmount="Yes";
	}
	
	window.open("ipdCghsDiffAmountPrint.jsp?"+"patID=" +encodeURIComponent(patID) + 
		"&treatID=" + encodeURIComponent(treatID)+
		"&billId=" + encodeURIComponent(billId)+
		"&paidAmount=" + encodeURIComponent(paidAmount)+
		"&departmentId=" + encodeURIComponent(departmentId));
	closePopupForCghsPrint();
}

function PrintAllCghsDetails(callfrom)
{
	//alert(callfrom);
	//return false;
	var totalManualRemains = $('#totalManualRemains').val();
	if(totalManualRemains > 0)
		{
		alert("Remain Amount should be 0");
		return false;			
		}
	var patID = $("#patientId").text();
	var treatID = $("#treatmentId").text();
	var billId		= $("#billNo").text();
	var departmentId   = $("#depdocdeskid").val();
	var paidAmount="No";	
	if (callfrom == "Yes") {
		paidAmount="Yes";
	}
	
	window.open("ipdAllCghsDetailsPrint.jsp?"+"patID=" +encodeURIComponent(patID) + 
			"&treatID=" + encodeURIComponent(treatID)+
			"&billId=" + encodeURIComponent(billId)+
			"&paidAmount=" + encodeURIComponent(paidAmount)+
			"&departmentId=" + encodeURIComponent(departmentId));
	closePopupForCghsPrint();
	
}

function allPrints(callfrom)
{

	var cghsPrintFrom = $("#cghsPrintFrom").val();
	//alert(cghsPrintFrom);
	if (cghsPrintFrom == "printCghs") {
		cghsIpdPrint(callfrom);
	}

	if (cghsPrintFrom == "printRemainCghs") {
		cghsRemainIpdPrint(callfrom);
	}
	if (cghsPrintFrom == "PrintDiffCghsAmount") {
		PrintDiffCghsAmount(callfrom);
	}
	if (cghsPrintFrom == "PrintAllCghsDetails") {
		PrintAllCghsDetails(callfrom);
	}
	
}

function openPopupForCghsPrint(callfrom){

$("#modal-20").addClass("md-show");
$('#cghsPrintFrom').val(callfrom);

return false;
	}

function closePopupForCghsPrint(){
$("#modal-20").removeClass("md-show");
}

function crearAllFields()
{
	$('#perticular').attr('readonly', 'false');	
	$('#servId').select2('val', 0);
	$('#specialityId').select2('val', 0);
	$('#doctorName').select2('val', 0);
	$('#perticular').val("");
	$("#rate").val("0");
	$("#qty").val("1");
	$("#concession").val("0");
	$("#amount").val("0");
	$("#pay").val("0");
	$("#coPay").val("0");
	$("#servId").val("0");
	$("#concessionIpdPer").val("0");
	$('#queryType').val("insert");
	$('#billDetailsId').val("0");
	$('#subserviceid').val("0");
	$("#perticular").removeAttr('readonly');
	$("#pay").removeAttr('readonly');
	$("#coPay").removeAttr('readonly');
	$("#concession").removeAttr('readonly');
	$("#qty").removeAttr('readonly');

	// for sponsor
	$('#doctorNameIpdSponsor').select2('val', 0);
	$('#servIdIpdSponsor').select2('val', 0);
	$('#specialityIdSponsor').select2('val', 0);
	$('#perticularIpdSponsor').attr('readonly', 'false');
	$('#perticularIpdSponsor').val("");
	$("#rateIpdSponsor").val("0");
	$("#qtyIpdSponsor").val("1");
	$("#concessionIpdSponsor").val("0");
	$("#amountIpdSponsor").val("0");
	$("#payIpdSponsor").val("0");
	$("#coPayIpdSponsor").val("0");
	$("#servIdIpdSponsor").val("0");
	$("#concessionIpdSponsorPer").val(0);
	$('#queryType').val("insert");
	$('#billDetailsId').val("0");
	$('#subserviceid').val("0");
	
	$("#perticularIpdSponsor").removeAttr('readonly');
	$("#payIpdSponsor").removeAttr('readonly');
	$("#coPayIpdSponsor").removeAttr('readonly');
	$("#concessionIpdSponsorPer").removeAttr('readonly');
	$("#qtyIpdSponsor").removeAttr('readonly');
	
	$("#narrationBill").val('notnarrationBill');
	$("#narrationidBill").val('');
	//for cghs
	
	$('#perManual').val("");
	$("#packManual").val("");
	$("#rateManual").val("0");
	$("#qtyManual").val("1");
	$("#concessionManual").val("0");
	$("#amountManual").val("0");
	
	$("#packManualRemains").val("");
	$("#rateManualRemains").val("0");
	$("#qtyManualRemains").val("1");
	
	$("#SerManualRemains").val("");
	$("#amountManualRemains").val("0");
	
	$('#queryType').val("insert");
    $('#subserviceid').val("-1");
    $('#sndtolabflag').val("N");
}


/*******
 * @author    :BILAL
 * @Date      :1-11-2017
 * @Code      :For Narration pop up on billing after edit from receipt
 * ******/
function setnarationpopupBill(){
	
	$("#modal-15").addClass("md-show");
}

function closePopupnarrationBill(){
	$("#modal-15").removeClass("md-show");
}

function setNarrationBill(){

	var receiptEditSponsor  = $("#receiptOf").val(); 	
	var narrationidBill =$('#narrationidBill').val();
	
    if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
		$("#narrationidBill").focus();		
		return false;
	}
    
   /* var deletenarration =$('narration').val();
    if (deletenarration == "deletemaster") {
		
	}*/
    
    $("#narrationBill").val('notnarrationBill');
	if (receiptEditSponsor == "IpdSponsor") {
		
		saveServiceToSponsorPatient('saveBillOpdSponsor');
	}else{
		saveServiceToPatient('general');
	}
	
	
}


/*-----------------------------------------------------------*/
/*******************************************************************************
 * @author Sagar kadam
 * @date 14_July_2017
 * @Code for autosuggestion 
 ******************************************************************************/
function getAllPatientRecordsForPrevOPDIPDNEW(inputId,callfrom) {
	
	var deptId=2;
	var usertype = "all";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
	
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/billNoble/getPreviousTreatmentPatient",
	success : function(r) {
		//setTempPatientRecords(r);

			opdPrevRecordsTemp(r);
			//autosuggestionTempForPrevOPD(r,inputId);
			//autoCompTablefoipdManualSummaryTempAuto(r,inputId);
		
	}
});}





/*******************************************************************************
 * @author Sagar Kadam
 * @date 27_June_2017
 * @Code template for opd Patient records.
 ************************************//*
function opdPrevRecordsTemp(r){	
	
 
var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mobile No</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Treatment</div></th>"
			 
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
var index = 1;	
 
htm =htm+ "<tbody>"	;
for ( var i = 0; i < r.lstRegviewDto.length;i++) {
	
	var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
 		
		htm= htm
		+ "<tr id='div123"+ r.lstRegviewDto[i].ptId+"'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.lstRegviewDto[i].patientName+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>"+ r.lstRegviewDto[i].mobile+"</td>"

		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.lstRegviewDto[i].ptId+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>"+datetime+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBill123("+ r.lstRegviewDto[i].ptId+")'>"
		+ "<img src='images/down.png' id='imgupdown"+ r.lstRegviewDto[i].ptId+"' />"
		+ "<input type='hidden' id='hideShowStatus123"+ r.lstRegviewDto[i].ptId+"' value='0' /><input type='hidden' id='patientDOB123' value='"+ r.lstRegviewDto[i].ptId+"' /></td>"
 		
		+ "</tr>"
		+ "</tbody></table>"
				+ "<tr id='patPreOPDBill123"+ r.lstRegviewDto[i].ptId+"' style='width:0%;float:right'><td style='display:none' id='td123"+ r.lstRegviewDto[i].ptId+"'>"
						+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
							+ "<tbody1 id='xyz"+ r.lstRegviewDto[i].ptId+"'>"
								+ "<tr>"
								+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
								+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
								+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
								+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
								+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
								+ "</tr>"
							+ "</tbody1>"
						+ "</table>"
					+ "</td></tr>";

 		index++;
 
 }

$("#IpdGenPreBill").html(htm);
//$("#containerprevOpd").html(htm);
//$("#ehatTable").html(htm);
}*/


/*******************************************************************************
 * @author Dayanand Khandekar
 * @date 11_Nov_2019
 * @Code template for opd Patient records.
 ************************************/
function opdPrevRecordsTemp(r){	
	
 
	var htm = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mobile No</div></th>"

		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>UHID</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

		+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Treatment</div></th>"
		 
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>";

var index = 1;	

htm =htm+ "<tbody>"	;
for ( var i = 0; i < r.lstRegviewDto.length;i++) {

var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
		
	htm= htm
	+ "<tr id='div123"+ r.lstRegviewDto[i].ptId+"'>"
	+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.lstRegviewDto[i].patientName+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 center'>"+ r.lstRegviewDto[i].mobile+"</td>"

	+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.lstRegviewDto[i].centerPatientId+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 center'>"+datetime+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBill123("+ r.lstRegviewDto[i].ptId+")'>"
	+ "<img src='images/down.png' id='imgupdown"+ r.lstRegviewDto[i].ptId+"' />"
	+ "<input type='hidden' id='hideShowStatus123"+ r.lstRegviewDto[i].ptId+"' value='0' /><input type='hidden' id='patientDOB123' value='"+ r.lstRegviewDto[i].ptId+"' /></td>"
		
	+ "</tr>"
	+ "</tbody></table>"
			+ "<tr id='patPreOPDBill123"+ r.lstRegviewDto[i].ptId+"' style='width:0%;float:right'><td style='display:none' id='td123"+ r.lstRegviewDto[i].ptId+"'>"
					+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
						+ "<tbody1 id='xyz"+ r.lstRegviewDto[i].ptId+"'>"
							+ "<tr>"
							+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
							+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
							+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
							+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
							+ "</tr>"
						+ "</tbody1>"
					+ "</table>"
				+ "</td></tr>";

		index++;

}

$("#IpdGenPreBill").html(htm);
//$("#containerprevOpd").html(htm);
//$("#ehatTable").html(htm);
}

function hideShowPreOPDBill123(count) {

	var hideShowStatus = $("#hideShowStatus123" + count).val();

	if (hideShowStatus == 0) {

		$("#imgupdown" + count).attr('src', "images/up.png");
		$("#patPreOPDBill123" + count).show();
		$("#hideShowStatus123" + count).val(1);
		 closeTreatmentDetailsOfPatient123(count);
		 

	} else {
		 
		$("#imgupdown" + count).attr('src', "images/down.png");
		$("#patPreOPDBill123" + count).hide();
		$("#hideShowStatus123" + count).val(0);
		//closeTreatmentDetailsOfPatient(count,callfrom);

	}
}
function  closeTreatmentDetailsOfPatient123(patientId ) {
	// alert("hi");
	//var r = confirm("Do You Want To Close Treatment ??");
	
	 var ajaxr="";
		jQuery.ajax({
			async 	: true,
			type : "POST",
			url  : "ehat/billNoble/getPrevPatdetails",
			data : {
	   "patientId" : patientId,
	   "deptId" : 2,
			},
	     timeout : 1000 * 60 * 5,
		   cache : true,
		   error : function() {
				    alert('error');
			},
		 success : function(response) {
			  console.log(response);
			  ajaxr = response;
			 // alert(response.listTreatment[0].treatmentId);
			  setTempForInnerLoop123(response);
		     		//alertify.success(response);
		     		/*resetUlList();
				    getConfigTemp();*/
				 	 
			}
		});
	return ajaxr;
}

 function setTempForInnerLoop123(r1){
	 //alert("hi");
	 var patientId=r1.listTreatment[0].patientId;
	 var treatmentId=r1.listTreatment[0].treatmentId;
	 var htm=" class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
	 + "<td style='height: 21.5px;' class='col-md-2 center' class=''>treatment Id</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>Admission  No</td>"
	 + "<td style='height: 21.5px;' class='col-md-5 ' class=''>Date</td>"
	 + "<td style='height: 21.5px;' class='col-md-2 ' class=''>BIll No</td>"
	 + "<i class='fa fa-eye View'></i></button></td>> </tr>";
	 
	 
	 
	 
	 for ( var j = 0; j < r1.listTreatment.length;j++) {
			var datetime= new Date(r1.listTreatment[j].createdDateTime).toLocaleDateString('en-GB');

		 htm=htm+ "<tr id='div123"+ r1.listTreatment[j].patientId+"' class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.listTreatment[j].invoiceCount+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>"+ r1.listTreatment[j].opdipdno+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-5 ' class=''>"+ datetime+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>"+ r1.listTreatment[j].treatmentId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-1 '>";
		 htm=htm+ "<button id='colorCode"+ r1.listTreatment[j].patientId+"' style='height: 21.5px;' class='btn btn-xs btn-success' onClick='sendingToPreviousGenIpdBill("+ r1.listTreatment[j].treatmentId+",0,\"previousPatient\")'>";
		 htm=htm+ "<i class='fa fa-eye View'></i></button></td>";
		 htm=htm	+ "<input type='hidden' value='"+ r1.listTreatment[j].patientId+"' id='rowCount' /></tr>";
		 
		
		 $("#patPreOPDBill123" + r1.listTreatment[j].patientId).html(htm);
		 $("#td123" + r1.listTreatment[j].patientId).show();
		 $("#xyz" + r1.listTreatment[j].patientId).html(htm);
		}
	
	 setColorCode(patientId,treatmentId);
	 
 }

/*-------------------------------------------------------------*/
 
 /***********
  * @author	: Sagar Kadam
  * @date	: 27-jun-2017
  * @reason	: fetching all patient with treatment flag inactive details from Reg view dto  
  **********/ 

 function getPreviousTreatmentPatient(inputId, callfrom) {
 	var r1="";
 	var usertype = "";
 	var letter="";
 	var sridname="";
 	if (callfrom =="search") {

 	  sridname = $("#sridnamepr").val();
   	  letter   = $("#byId").val();
   	  usertype=sridname;
 	}else{ 
 	    	  
 	    	 sridname = $("#sridnamepr").val();
 	 		 letter=    $("#byName").val();
 	 		 usertype=sridname;
 	}
 	
     var findingName = $("#" + inputId).val();
         var inputs = [];
         inputs.push('findingName=' + findingName);
         inputs.push('usertype=' + usertype);
         inputs.push('letter=' + letter);
         inputs.push('deptId=' + 2);
         var str = inputs.join('&');
 	jQuery.ajax({
 		async 	: true,
 		type 	: "POST",
 		data 	: str + "&reqType=AJAX",
  		url 	: "ehat/billNoble/getPreviousTreatmentPatient",
 		 
 		error 	: function() {
 			alert('error');
 		},
 		success : function(r) {
 			ajaxResponse = r;
 			
 			opdPrevRecordsTemp(r);
   		// setpatientForTreatment(r);
   		//autoCompTableforpreviousTreatment(r, inputId);
 		}
 	});
 }
 

 /***********
  * @author	: Kishor Lokhande
  * @date	: 17-Oct-2018
  * @reason	: to search date wise for Opd previous billing
  **********/ 

 function fetchPrevPatientDateWise() {
 var inputFromDate = $("#inputFromDate").val();
 var inputToDate = $("#inputToDate").val();
 if (inputFromDate == "")
 {
 	alert("Enter From Date");
 	return false;
 }
 if (inputToDate == "")
 {
 	alert("Enter To Date");
 	return false;

 }

 date1 = new Date(inputFromDate);
 date2 = new Date(inputToDate);

 if(date1>date2)
 	{
 		alert("FromDate is greater than ToDate");
 		return false;
 	}

 if(date2<date1)
 {
 	alert(" ToDate is less than FromDate");
 	return false;
 }

 var part1 = inputFromDate.split('/');
 inputFromDate = part1[2] + "-" + part1[1] + "-" + part1[0];
 var part2 = inputToDate.split('/');
 inputToDate = part2[2] + "-" + part2[1] + "-" + part2[0];


 //alert(inputFromDate +"   "+inputToDate);
 //return false;
var deptId=2;
 var inputs = [];
 inputs.push('inputFromDate=' + encodeURIComponent(inputFromDate));
 inputs.push('inputToDate=' + encodeURIComponent(inputToDate));
 inputs.push('deptId=' + encodeURIComponent(deptId));
 var str = inputs.join('&');

  

 jQuery.ajax({
 	async : true,
 	type : "POST",
 	data : str + "&reqType=AJAX",
 	url : "ehat/billNoble/getPreviousTreatmentPatientDateWiseSearch",
 	timeout : 1000 * 60 * 5,
 	cache : false,
 	error : function() {

 		alert('error');

 	},
 	success : function(r) {
 		ajaxResponse = r;
 		//console.log(r);
 		opdPrevRecordsTemp(r);
 	}
 });
 }
 
 
 

 /***********
  * @author	: Sagar Kadam
  * @date	: 9-jun-2017
  * @reason	: setting  details on tempelate
  **********/ 
 function setpatientForTreatment(r) {
 	
 	var htm = "<div class='col-sm-12-1'>"
 			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
 			+ "<thead>"
 			+ "<tr>"
 			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
 			+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
 			+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Mobile No</div></th>"

 			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
 			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

 			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Treatment</div></th>"
 			 
 			+ "</tr>"
 			+ "</thead>	"
 			+ "</table></div>";
  
 var index = 1;	
  
 htm =htm+ "<tbody>"	;
 for ( var i = 0; i < r.lstRegviewDto.length;i++) {
 	
 	var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
  		
 		htm= htm
 		+ "<tr id='div"+ r.lstRegviewDto[i].ptId+"'>"
 		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
 		+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.lstRegviewDto[i].patientName+"</td>"
 		+ "<td style='height: 21.5px;' class='col-md-2 '>"+ r.lstRegviewDto[i].mobile+"</td>"
 		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.lstRegviewDto[i].ptId+"</td>"
 		+ "<td style='height: 21.5px;' class='col-md-2 center'>"+datetime+"</td>"
 		+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBill("+ r.lstRegviewDto[i].ptId+")'>"
 		+ "<img src='images/down.png' id='imgupdown"+ r.lstRegviewDto[i].ptId+"' />"
 		+ "<input type='hidden' id='hideShowStatus"+ r.lstRegviewDto[i].ptId+"' value='0' /><input type='hidden' id='patientDOB' value='"+ r.lstRegviewDto[i].ptId+"' /></td>"
  		
 		+ "</tr>"
 		+ "</tbody></table>"
 				+ "<tr id='patPreOPDBill"+ r.lstRegviewDto[i].ptId+"' style='width:0%;float:right'><td style='display:none' id='td"+ r.lstRegviewDto[i].ptId+"'>"
 						+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
 							+ "<tbody>"
 								+ "<tr>"
 								+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
 								+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
 								+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
 								+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
 								+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
 								+ "</tr>"
 							+ "</tbody>"
 						+ "</table>"
 					+ "</td></tr>";

  		index++;
  
  }
 
 $("#containerprevOpd").html(htm);
// $("#containerprevOpd").html(htm);
 $("#container").html(htm);
 //$("#ehatTable").html(htm);
 }

 function hideShowPreOPDBill(count) {

 	var hideShowStatus = $("#hideShowStatus" + count).val();

 	if (hideShowStatus == 0) {

 		$("#imgupdown" + count).attr('src', "images/up.png");
 		$("#patPreOPDBill" + count).show();
 		$("#hideShowStatus" + count).val(1);
 		 closeTreatmentDetailsOfPatient(count);

 	} else {
 		 
 		$("#imgupdown" + count).attr('src', "images/down.png");
 		$("#patPreOPDBill" + count).hide();
 		$("#hideShowStatus" + count).val(0);
 		//closeTreatmentDetailsOfPatient(count,callfrom);

 	}
 }

   

 /************
  *@author	: Sagar kadam
  *@date		:  25-June-2017
  *@code		:close treatment details
  ***********/

 function  closeTreatmentDetailsOfPatient(patientId ) {
 	 //alert("hi");
 	//var r = confirm("Do You Want To Close Treatment ??");
 	 var ajaxr="";
 		jQuery.ajax({
 			async 	: true,
 			type : "POST",
 			/*url  : "ehat/billNoble/closetreatmentdetails",
 			data : {
 	   "patientId" : patientId*/
 			url  : "ehat/billNoble/getPrevPatdetails",
			data : {
	   "patientId" : patientId,
	   "deptId" : 2,
 			},
 	     timeout : 1000 * 60 * 5,
 		   cache : true,
 		   error : function() {
 				    alert('error');
 			},
 		 success : function(response) {
 			  console.log(response);
 			  ajaxr = response;
 			 // alert(response.listTreatment[0].treatmentId);
 			  setTempForInnerLoop(response);
 		     		//alertify.success(response);
 		     		/*resetUlList();
 				    getConfigTemp();*/
 				 	 
 			}
 		});
 	return ajaxr;
 }

  function setTempForInnerLoop(r1){
 	 //alert("hi");
 	 var htm="";
 	 for ( var j = 0; j < r1.listTreatment.length;j++) {
 		 var date= new Date(r1.listTreatment[j].createdDateTime).toLocaleString();
 		  
 		 htm=htm+ "<tr id='div"+ r1.listTreatment[j].patientId+"'>";
 		 htm=htm	+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.listTreatment[j].treatmentId+"</td>";
 		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.listTreatment[j].opdipdno+"</td>";
 		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+date+"</td>";
 		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.listTreatment[j].patientId+"</td>";
 		 htm=htm+ "<td style='height: 21.5px;' class='col-md-1 center'>";
 		 htm=htm+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='sendingToPreviousGenIpdBill("+ r1.listTreatment[j].treatmentId+")'>";
 		 htm=htm+ "<i class='fa fa-eye View'></i></button></td>";
 		 htm=htm	+ "<input type='hidden' value='"+ r1.listTreatment[j].patientId+"' id='rowCount' /></tr>";
 		 
 		 
 		 $("#patPreOPDBill" + r1.listTreatment[j].patientId).html(htm);
 		 $("#td" + r1.listTreatment[j].patientId).show();
 		}
 	
 	 
  }


 /************
 * @author	: Sagar Kadam
 * @date		: 05-June-2017
 * @codeFor	: Autosuggestion Template for patient Treatment   
  ************/
 function autoCompTableforpreviousTreatment(response, id) {
 	//var qty = id.slice(0, -1); // for dyamic col getting id

 	var myArray = response;// parsing response in JSON format

 	$.widget(
 		'custom.mcautocomplete',
 		$.ui.autocomplete,
 		{
 			_create : function() {
 				this._super();
 				this.widget().menu("option", "items",
 						"> :not(.ui-widget-header)");
 			},
 			_renderMenu : function(ul, items) {
 				var self = this, thead;
 				if (this.options.showHeader) {
 					table = $('<div class="ui-widget-header" style="width:100%"></div>');
 					$
 							.each(
 									this.options.columns,
 									function(index, item) {
 										table
 												.append('<span style="padding:0 4px;float:left;width:'
 														+ item.width
 														+ ';">'
 														+ item.name
 														+ '</span>');
 									});
 					table
 							.append('<div style="clear: both;"></div>');
 					ul.append(table);
 				}
 				$.each(items, function(index, item) {
 					self._renderItem(ul, item);
 				});
 			},
 			_renderItem : function(ul, item) {
 				var t = '', result = '';
 				$
 						.each(
 								this.options.columns,
 								function(index, column) {
 									t += '<span style="padding:0 4px;float:left;width:'
 											+ column.width
 											+ ';">'
 											+ item[column.valueField ? column.valueField
 													: index]
 											+ '</span>';
 								});
 				result = $('<li></li>')
 						.data('ui-autocomplete-item', item)
 						.append(
 								'<a class="mcacAnchor">'
 										+ t
 										+ '<div style="clear: both;"></div></a>')
 						.appendTo(ul);
 				return result;
 			}
 	});

 	// Sets up the multicolumn autocomplete widget.
 	$("#" + id).mcautocomplete(
 	{
 		// These next two options are what this plugin adds to the
 		// autocomplete widget.
 		showHeader : true,
 		columns : [ {
 			name : 'Patient Name',
 			width : '100px',
 			valueField : 'patientName'
 		}, /*
 			 * { name : 'unitCode', //width : '80px', valueField :
 			 * 'unitCode' }
 			 */],

 		// Event handler for when a list item is selected.
 		select : function(event, ui) {
 			console.log(ui);
 			
 			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
 			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
 					&& ui.item.specialisationName != 'Found'
 					&& ui.item.patientName != 'Match') {
 			
 				 
 				$('#'+id).val(ui.item.patientName);
 			}
 			/*
 			 * This function use for Enter keypress search
 			 */
 			
 			getPreviousTreatmentPatient(id,'search');
 			//setAutoCompleteMarkVisit(id, 'search');
 			//$("#mrnNo").val(101);
 			return false;
 		},

 		// The rest of the options are for configuring the ajax
 		// webservice call.
 		minLength : 1,
 		source : function(request, response) {
 			var data = myArray;
 			console.log(data);
 			console.log(data.lstRegviewDto.length);
 			var result;
 			if (!data || data.lstRegviewDto.length === 0 || !data.lstRegviewDto
 					|| data.lstRegviewDto.length === 0) {
 				/*
 				 * result = [{ label: 'No match found.' }];
 				 */
 				result = [ {
 					/* 'dn' : 'No', */
 					'patientName' : 'Record',
 					'ptId' : 'Found',
 				/* 'depNm' : 'Match' */
 				} ];
 			} else {
 				result = data.lstRegviewDto;// Response List for All
 				// Services
 			}
 			response(result);
 			$('#ui-id-1').css("z-index", "10000000000");
 		}
 	});
 }
  

 /*******************************************************************************
  * @author Kishor Lokhande
  * @date 10_June_2017
  * @Code Getting amount
  ******************************************************************************/

 function calculatePerticularTotalRemains() {
 	var rateManual = $("#rateManualRemains").val();
 	var qtyManual = $("#qtyManualRemains").val();
 	//var concessionManual = $("#concessionManual").val();
 	var concessionManual = 0;

 	if (qtyManual == "") {
 		$("#qtyManualRemains").val(1);
 	}
 	if (rateManual == "") {
 		$("#rateManualRemains").val(0);
 	}
 	if (payManual == "") {
 		$("#rateManualRemains").val(0);
 	}
 	if (concessionManual == "") {
 		$("#concessionManual").val(0);
 	}
 	if (concessionManual > (rateManual * qtyManual)) {
 		var quantityManual = $("#qtyManualRemains").val();
 		if (quantityManual == 0) {
 			// alert("Quantity Cannot Be 0");
 			//$("#concessionManual").val(0);
 			calculatePerticularTotalRemains();
 			return false;
 		} else {
 			alert("Discount Cannot Be Greater Than " + (rate * qty));
 			//$("#concessionManual").val(0);
 			$("#amountManualRemains").val(rateManual * qtyManual);
 			$("#payManualRemains").val(rateManual * qtyManual);
 			return false;
 		}
 	}
 	var amountManual = ((rateManual * qtyManual) - concessionManual);
 	$("#amountManualRemains").val(amountManual);
 	//$("#coPayManual").val(amountManual);
 	var sponsorId = $("#SponsorsourceTypeId").val();
 	var chargesSlaveId = $("#chargesSlaveId").val();

 	if (sponsorId == 1 && chargesSlaveId > 0) {

 		$("#payManualRemains").val(amountManual);

 	} else {

 		$("#coPayManualRemains").val(amountManual);

 	}	
 	
 	
 	
 	var SpecialDisc1 = $("#SpecialDisc").val();
 	if (SpecialDisc1 == 0 && ($("#coPayManual").val()) == 0) {

 		calculatePerticularCoPayRemains();

 	} else {
 		calculatePerticularPayRemains();

 	}
 }

 function calculatePerticularCoPayRemains() {
 	var payManual = $("#payManualRemains").val();
 	var amountManual = $("#amountManualRemains").val();
 	if (payManual == "" || amountManual == "") {
 		return false;
 	}

 	if (payManual < 0) {
 		payManual = 0;
 	} else if (isNaN(payManual) == true) {
 		payManual = 0;
 	}

 	var coPayManual = (amountManual - payManual);
 	$("#coPayManualRemains").val(coPayManual);
 }


 function calculatePerticularPayRemains() {
 	var coPayManual = $("#coPayManualRemains").val();
 	var amountManual = $("#amountManualRemains").val();
 	if (coPayManual == "" || amountManual == "") {
 		return false;
 	}
 	if (coPayManual < 0) {
 		coPayManual = 0;
 	} else if (isNaN(coPayManual) == true) {
 		coPayManual = 0;
 	}

 	var payManual = (amountManual - coPayManual);
 	$("#payManualRemains").val(payManual);
 }
 function printIpdServiceWise(treatId,callfrom,Prev,servId)
 {

 	var patID = $("#patientId").text();
 	var deptId   = $("#depdocdeskid").val();
 	
 	//if(servId == 11){
 		
 		var labservicelist = [];
		var labservicelist1 = [];
		var servicelist2 = [];		
		
		$('input[name=opdBillCheckbox]:checked').each(function() {

			labservicelist.push(parseInt($(this).val()));
			var a=parseInt($(this).val());
			labservicelist1.push(parseInt($("#bdId"+a).text()));
			//labservicelist1.push(parseInt($("#subserviceid"+a).text()));
			//servicelist2.push(parseInt($("#sId"+a).text()));
		});

		if (labservicelist1.length == 0) {
			alert("Please check at least One Service to Convert to Sponsor Or Open all Services.");
			return false;

		}		
		
		// note: jQuery's filter params are opposite of javascript's native implementation :(
		var unique = $.makeArray($(labservicelist1).filter(function(i,itm){ 
		    // note: 'index', not 'indexOf'
		    return i == $(labservicelist1).index(itm);
		}));
 		
 		
 		var billDetailsId=unique.toString();
 		
 		window.open("ipdServiceWisePrint.jsp?servId=" +encodeURIComponent(servId)
 				+ "&treatId=" + encodeURIComponent(treatId)
 				+ "&callfrom=" + encodeURIComponent(callfrom)
 				+ "&Prev=" + encodeURIComponent(Prev)
 				+ "&patID=" + encodeURIComponent(patID)
 				+ "&deptId=" + encodeURIComponent(deptId)
 				+ "&billDetailsId=" + encodeURIComponent(billDetailsId));
 	/*}else{ 	
 	
 	window.open("ipdServiceWisePrint.jsp?servId=" +encodeURIComponent(servId)
			+ "&treatId=" + encodeURIComponent(treatId)
			+ "&callfrom=" + encodeURIComponent(callfrom)
			+ "&Prev=" + encodeURIComponent(Prev)
			+ "&patID=" + encodeURIComponent(patID)
			+ "&deptId=" + encodeURIComponent(deptId));
 	}*/
 }
 
 
 function autosuggesstionDiscApprovel(input,callfrom){
	 	
	 	var usertype = "Y";
	 	var letter="";	 	
	 	 		 letter=    $("#byName").val();
	 	 		
	 	 		
	    // var findingName = $("#" + inputId).val();
	         var inputs = [];
	         //inputs.push('findingName=' + findingName);
	         inputs.push('usertype=' + usertype);
	         inputs.push('letter=' + letter);
	        
	         var str = inputs.join('&');
	 	jQuery.ajax({
	 		async 	: false,
	 		type 	: "POST",
	 		data 	: str + "&reqType=AJAX",
	  		url 	: "ehat/billNoble/autosuggesstionDiscApprovel",
	 		 
	 		error 	: function() {
	 			alert('error');
	 		},
	 		success : function(r) {
	 			ajaxResponse = r;
	 			
	 			setIpdbilDiscount(r);
	   		// setpatientForTreatment(r);
	   		//autoCompTableforpreviousTreatment(r, inputId);
	 		}
	 	});
	 
 }
 
 function autosuggesstionDiscApproved(input,callfrom){
	 	
	 	var usertype = "Y";
	 	var letter="";	 	
	 	 		 letter=    $("#byName2").val();
	 	 		
	 	 		
	    // var findingName = $("#" + inputId).val();
	         var inputs = [];
	         //inputs.push('findingName=' + findingName);
	         inputs.push('usertype=' + usertype);
	         inputs.push('letter=' + letter);
	        
	         var str = inputs.join('&');
	 	jQuery.ajax({
	 		async 	: false,
	 		type 	: "POST",
	 		data 	: str + "&reqType=AJAX",
	  		url 	: "ehat/billNoble/autosuggesstionDiscApprovel",
	 		 
	 		error 	: function() {
	 			alert('error');
	 		},
	 		success : function(r) {
	 			ajaxResponse = r;
	 			setIpdbilApprovedDiscount(r);
//	 			setIpdbilDiscount(r);
	   		// setpatientForTreatment(r);
	   		//autoCompTableforpreviousTreatment(r, inputId);
	 		}
	 	});
	 
}
 
 
 function showDiffRefundable(){
		
		if($('#refundableDiffCheckbox').is(':checked')){
			 
			$("#trPayable").show();
			var oustanding=parseFloat($("#refundableDiff").html());			
			
			if($('#refundableCheckbox').is(':checked')){
				
				var refCheck=parseFloat($("#finalRefundable").html());
			
			var fulltot= oustanding + refCheck;
			//alert(fulltot);
			$("#payable").val(parseFloat(fulltot).toFixed(2));
			$("#payNow").val(parseFloat(fulltot).toFixed(2));
			}else{
				$("#payable").val(parseFloat(oustanding).toFixed(2));
				$("#payNow").val(parseFloat(oustanding).toFixed(2));
			}
			$("#refPer").val(100.00);
			
			$("#btnPayNow").prop('disabled',true);
			$("#btnRefund").prop('disabled',false);
			$("#outstandingCheckbox").prop('checked',false);
			$("#payeeTr").hide();
			$("#trRefPer").show();
			//$("#refundableCheckbox").prop("disabled", true);
			
		}else{
			
			if($('#refundableCheckbox').is(':checked')){
				
				var refCheck=parseFloat($("#finalRefundable").html());
			
			var fulltot=  refCheck;
			//alert(fulltot);
			$("#payable").val(parseFloat(fulltot).toFixed(2));
			$("#payNow").val(parseFloat(fulltot).toFixed(2));
			
			$("#btnPayNow").prop('disabled',true);
			$("#btnRefund").prop('disabled',false);
			$("#outstandingCheckbox").prop('checked',false);
			$("#payeeTr").hide();
			$("#trRefPer").show();
			$("#refPer").val(100.00);
			}else{
			
		
			$("#trRefPer").hide();
			$("#trPayable").hide();
			$("#btnPayNow").prop('disabled',false);
			$("#btnRefund").prop('disabled',true);
			$("#payable").val(0);
			$("#payeeTr").show();
			//$("#refundableCheckbox").prop("disabled", false);
			$("#payNow").val(parseFloat(0.00).toFixed(2));
			$("#refPer").val(0);
		}
			}
	}
	
 /************
 * @author	: Vinod Udawant
 * @date	: 08-Nov-2017
 * @codeFor	: Get all total amounts
  ************/
 function fetchAllReceiptTotals(callFrom) {	
 	
 	var unitId		= parseInt($("#unitId").val());
 	var userId		= parseInt($("#userId").val());	
 	var treatmentId	= parseInt($("#treatmentId").text());	
 	var sponsorCatId= $("#chargesSlaveId").val();	
 	//var patientId	= parseInt($("#patientId").text());	
 	
 	var inputs = [];	
 	inputs.push("unitId=" + unitId);
 	inputs.push("treatmentId=" + treatmentId);
 	inputs.push("sponsorId=" + sponsorCatId);
 	inputs.push("createdBy=" + userId);
 	inputs.push("callFrom=" + callFrom);	
 	//inputs.push("patientId=" + patientId);	
 	
 	var str = inputs.join('&');	
 	jQuery.ajax({
 		async	: false,
 		type	: "POST",
 		data 	: str + "&reqType=AJAX",		
 		url 	: "ehat/bill/fetchAllReceiptTotals",
 		error 	: function() {
 					alert('Network Issue!!!');
 				  },
 		success : function(r) {
 			
 			var otherwise=parseFloat(0.00).toFixed(2);
 			var finalBillTotal=parseFloat(r.actualAmt).toFixed(2);			
			var grandTotal=parseFloat(r.actualAmt).toFixed(2);		
			var conTotal=parseFloat(r.actualTotConcn).toFixed(2);		
			var finalDiscount=parseFloat($("#finalDiscount").html()).toFixed(2);		
			var finalPaid=parseFloat(r.totalPaid).toFixed(2);		
			var finalRefund=parseFloat(r.refundAmt).toFixed(2);	
			var finalPharmaPaid=parseFloat($("#PharmacyAdvancePaid").html()).toFixed(2);	
			var finalPharmaReturn=parseFloat($("#PharmacyCashReturn").html()).toFixed(2);	
			var paidBySponsor=parseFloat(r.totalSonsorAmt).toFixed(2);	
						
			if(finalPharmaPaid<=0 || isNaN(finalPharmaPaid)){
				
				finalPharmaPaid=otherwise;
			}
			
			if(finalPharmaReturn<=0 || isNaN(finalPharmaReturn)){
				
				finalPharmaReturn=otherwise;
			}
			
			if(finalBillTotal<=0 || isNaN(finalBillTotal)){
				
				finalBillTotal=otherwise;
			}
			
			if(grandTotal<=0 || isNaN(grandTotal)){
				
				grandTotal=otherwise;
			}
			
			if(conTotal<=0 || isNaN(conTotal)){
				
				conTotal=otherwise;
			}
			
			if(finalDiscount<=0 || isNaN(finalDiscount)){
	
				finalDiscount=otherwise;
			}
			
			if(finalPaid<=0 || isNaN(finalPaid)){
				
				finalPaid=otherwise;
			}
			
			if(paidBySponsor<=0 || isNaN(paidBySponsor)){
				
				paidBySponsor=otherwise;
			}
			
			if(finalRefund<=0 || isNaN(finalRefund)){
				
				finalRefund=otherwise;
			}		
			
			var phramaAmt=Number(finalPharmaPaid)-Number(finalPharmaReturn);			
			var billDeductn=(Number(finalPaid)+Number(phramaAmt));
			var finalNetAmt=Number(finalBillTotal)-(Number(finalDiscount)+Number(conTotal));
			var remain=Number(finalNetAmt)-(Number(billDeductn)+Number(paidBySponsor));
			var finalRefundable=0.00;
			
			if(remain<=0 || isNaN(remain)){
				
				remain=otherwise;
				//alert(finalDiscount);				
				finalRefundable=Number(billDeductn)-(Number(finalNetAmt));
			}
			
			finalRefundable=Number(finalRefundable)-(Number(finalRefund));
						
			if(finalRefundable<=0 || isNaN(finalRefundable)){
				
				finalRefundable = otherwise;
			}		
			
			if(finalNetAmt<=0 || isNaN(finalNetAmt)){
				
				finalNetAmt = otherwise;
			}
			
			$("#finalBillTotal").html(finalBillTotal);
			$("#finalNetAmt").html(parseFloat(finalNetAmt).toFixed(2));
			$("#conTotal").html(conTotal);			
			$("#grandTotal").html(grandTotal);
			$("#finalDiscount").html(finalDiscount);
			$("#finalPaid").html(finalPaid);
			$("#paidBySponsor").html(paidBySponsor);
			$("#finalRefund").html(finalRefund);
			$("#finalRemain").html(parseFloat(remain).toFixed(2));
			$("#finalRefundable").html(parseFloat(finalRefundable).toFixed(2));
			
			//$("#PharmacyCashReturn").html(otherwise);			
						
 			/*$("#finalBillTotal").html(parseFloat(r.actualAmt).toFixed(2));
 			$("#grandTotal").html(parseFloat(r.actualAmt).toFixed(2));
 			//$("#finalDiscount").html(parseFloat(r.totalDisc).toFixed(2));
 			//$("#finalAdvance").html(parseFloat(r.actualAmt).toFixed(2));
 			$("#finalPaid").html(parseFloat(r.totalPaid).toFixed(2));
 			$("#finalRefund").html(parseFloat(r.refundAmt).toFixed(2));
 			var conTotal=parseFloat(r.actualTotConcn).toFixed(2);			
 			$("#conTotal").html(conTotal);*/
 			
			/*var refDiff = 0.00;
			var gTot = parseFloat(r.actualAmt).toFixed(2);*/
			/*var totPaid = (parseFloat(r.totalPaid) - parseFloat(r.refundAmt))
					.toFixed(2);*/
			
			/*var totPaid = (parseFloat(r.totalPaid));
			
			if (totPaid > gTot) {
				refDiff = Number(totPaid) - Number(gTot);
				var def = 0.00;
				if (refDiff > 0) {
					$("#refundableDiff").html(parseFloat(refDiff).toFixed(2));
				} else {
					$("#refundableDiff").html(parseFloat(def).toFixed(2));
				}
				
				getBillRefundDetailsIpdNew("refund",refDiff,r.totalPaid,r.actualAmt);
				$("#finalRefundable").html(parseFloat(Number(totPaid) - Number(refDiff)).toFixed(2));
				
			} else {
				$("#refundableDiff").html(parseFloat(refDiff).toFixed(2));
				$("#finalRefundable").html(parseFloat(totPaid).toFixed(2));
			}
 						
 			var disc=$("#finalDiscount").html();			
 			var remain=Number(r.actualAmt)-(Number(disc) + (Number(r.totalPaid)) + Number(conTotal));				
 			
 			if(remain<0){				
 				remain=0;
 			}*/
 			
 			/*var refundable = (Number(r.totalPaid) - Number(r.refundAmt))-Number(refDiff);
 			//var refundable = (Number(r.totalPaid) - Number(r.refundAmt));
 			$("#finalRefundable").html(parseFloat(refundable).toFixed(2));	*/			
 			//$("#finalRemain").html(parseFloat(remain).toFixed(2));	
 			
 			/*if(r.totalPaid > r.actualAmt){*/
 				
 				
 			/*}else{
 				
 				$("#finalRefundable").html(parseFloat(r.totalPaid).toFixed(2));
 			}*/			
 		}
 	});
 }
 
 
 function getBillRefundDetailsIpdNew(callFrom,refDiff,totalPaid,grantTot) {

	 
	 
		var treatmentId = $("#treatmentId").text();
		var billId = $("#billNo").text();
		var receiptOf= $("#receiptOf").val();	
		var userId = parseInt($("#userId").val());
		
		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"treatmentId" : parseInt(treatmentId),
				"billId" : parseInt(billId),
				"callFrom" : callFrom,
				"receiptOf" : receiptOf,
				"userId" : userId
			},
			url : "ehat/ipdbill/getBillRefundDetailsIpd",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				
				setRefundTemplateNew(r, callFrom,refDiff,totalPaid,grantTot);
				
			}
		});
	};

	/*******************************************************************************
	 * @author : Vinod Udawant
	 * @date : 14-July-2017
	 * @codeFor : Set refund master template
	 ******************************************************************************/
	function setRefundTemplateNew(res, callFrom,refDiff,totalPaid,grantTot) {
		
		var extraAmt = 0.00;
		var billAmt=0.00;
		

		for ( var i = 0; i < res.listBillRefundMaster.length; i++) {
			
			
			var totalAmt = parseFloat(res.listBillRefundMaster[i].totalAmt);	
			var totAmt = parseFloat(res.listBillRefundMaster[i].totalPaid);	
			var remainAmt = parseFloat(res.listBillRefundMaster[i].totalRemain);	
			var extraRefFlag = res.listBillRefundMaster[i].extraRefFlag;
			var conTotal=parseFloat(r.actualTotConcn).toFixed(2);		
 			
 			$("#conTotal").html(conTotal);

		if (extraRefFlag == "E") {

			extraAmt = extraAmt + totAmt;

		} else if (extraRefFlag == "B") {

			billAmt = billAmt + totAmt;
		}
		
		}
		
		var conTotal=parseFloat(r.actualTotConcn).toFixed(2);		
			
			
		var finalSetExtra=refDiff-extraAmt;
		$("#refundableDiff").html(parseFloat(finalSetExtra).toFixed(2));
		
		
			var refundable = (grantTot) - (Number(billAmt)-Number(conTotal));
			$("#finalRefundable").html(parseFloat(refundable).toFixed(2));
		
		
		//alert("hi"+"hi  =="+refDiff);
	}

	
	/*******************************************************************************
	 * @author : Vinod Udawant
	 * @date : 17-July-2017
	 * @codeFor : save refund receipts
	 ******************************************************************************/
	function saveRefundBillDetailsIpd(callFrom) {

		var payNowConf = parseFloat($("#payNow").val());
		
		var r = confirm("Are You Sure You Want To Refund Amount :"+payNowConf);
		if (r == true) {
		var unitId = parseInt($("#unitId").val());
		var userId = parseInt($("#userId").val());
		var patientId = parseInt($("#patientId").text());
		var billNo = parseInt($("#billNo").text());
		var refDocId = 0; // parseInt($("#refDocId").val());
		var treatmentId = parseInt($("#treatmentId").text());
		var regBillId = $("#regBillId").val();
		var discount = 0;//parseFloat($("#discount").val());
		
		var finalNetAmt =  parseFloat($("#finalNetAmt").html());
		var payable = parseFloat($("#payable").val());
		var refPer = parseFloat($("#refPer").val());
		var payNow = parseFloat($("#payNow").val());

		var remark	= $("#txtDiscRemk").val();

		var payMode = $("#payMode").val();
		var bnumber = "0";
		var batchNo	= "";
		var bName = "0";
		
		if(payMode == 0){
			
			alert("Please select payment mode");
			return false;
		}
		
		var multiPayDetails = {
				listMultiBillReceiptMaster : []
	    };
		
		var listMultiRefundSave = {
				listBillRefundMaster : []
	    };
		
		
		if(payMode==2 || payMode==3){
			
			bnumber= $("#batchnumber").val();
			bName= $("#bankID").val();
			batchNo= $("#newBatchNumber").val();
		}else if(payMode==-1){
			
			var rows= $('#multiPayTable tbody tr.multiPayClass').length;
			for(var i=1;i<=rows;i++){
							
				var payModePop=$("#payMode"+i).val();
				var bankId=$("#bankID"+i).val();
				var bNum=$("#txtbankNo"+i).val();
				var accNo=$("#txtaccNo"+i).val();
				var amt=$("#txtAmount"+i).val();		
				setReceiptList(multiPayDetails,payModePop,bankId,bNum,accNo,amt);
			}		
		}else{
			
			bnumber= 0;
			bName= 0;
			batchNo=0;
		}
		
		multiPayDetails = JSON.stringify(multiPayDetails);
		
		// var creditFlag = $("#creditFlag").val();
		var againstId = $("#consultingDoctor").text();//$("#recId").val();
		var receiptOf= $("#receiptOf").val();

		if (payable <= 0) {

			alert("Payable should be greater than zero");
			return false;
		}

		if (payNow > payable) {

			alert("Amount should be less than payable");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		} else if (payNow <= 0) {

			alert("Pay Now should be greater than zero");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		}

		var servIdsChecked = [];
		// add reg
		/*
		 * $('input[id=chkOpdBillReg1]:checked').each(function(){
		 * 
		 * servIdsChecked.push(regBillId); });
		 */

		/*
		 * $('input[name=opdBillCheckbox]:checked').each(function(){
		 * 
		 * servIdsChecked.push($(this).val()); });
		 */

		$('input[id=chkOpdBillReg1]:not(:checked)').each(function() {

			servIdsChecked.push(regBillId);
		});

		$('input[name=opdBillCheckbox]:not(:checked)').each(function() {

			servIdsChecked.push($(this).val());
		});
		
		//Added by kishor 
		var extraRefFlag = "";
		if($('#refundableDiffCheckbox').is(':checked') && $('#refundableCheckbox').is(':checked')){
			
			
			var refundableDiff = parseFloat($("#refundableDiff").html());
			
			
			if(refundableDiff >= payNow){								
				extraRefFlag = "E";
				
			}else{
				var remNew= payNow - refundableDiff;//calculate remain amount except diff amt. 				
				//payNow = refundableDiff;//diff amt
				//extraRefFlag = "E";
				var remainBillAmt=payable -refundableDiff;
				
				
				listMultiRefundSave.listBillRefundMaster.push({
					extraRefFlag : "E",
					totalAmt :refundableDiff,
					totalPaid : refundableDiff									
			    });
				
				listMultiRefundSave.listBillRefundMaster.push({
					extraRefFlag  : "B",
					totalAmt :remainBillAmt,
					totalPaid : remNew									
			    });
				
			}			
			
			
		}else{
			
		
		if ($('#refundableDiffCheckbox').is(':checked')) {
			
			extraRefFlag = "E";
		} else if ($('#refundableCheckbox').is(':checked')) {
			
			extraRefFlag = "B";
		}
		}
		listMultiRefundSave = JSON.stringify(listMultiRefundSave);
		
		//alert(listMultiRefundSave.listBillRefundMaster.length);
		//return false;
		/*
		 * $("#chkOpdBillReg1").prop("disabled",true);
		 * 
		 * for(var i=1;i<servIdsChecked.length;i++){
		 * 
		 * $("#chkOpdBill"+servIdsChecked[i]).prop("disabled",true); }
		 */

		/*
		 * if(servIdsChecked.length!=0){
		 * 
		 * alert("please select at least one service"); }
		 */
		
		var sourceCatId = $("#SponsorsourceTypeId").val();
		var sponsorCatId = $("#chargesSlaveId").val();

		var inputs = [];
		inputs.push("treatmentId=" + treatmentId);
		inputs.push("unitId=" + unitId);
		inputs.push("patientId=" + patientId);	
		inputs.push("billNo=" + billNo);
		inputs.push("createdBy=" + userId);
		inputs.push("totalAmt=" + finalNetAmt);
		inputs.push("discount=" + discount);
		inputs.push("totalPaid=" + payNow);
		inputs.push("servIdsChecked=" + servIdsChecked);
		inputs.push("refDocId=" + refDocId);
		inputs.push("payMode=" + payMode);
		inputs.push("bNumber=" + bnumber);
		inputs.push("batchNo=" + batchNo);	
		inputs.push("bName=" + bName);
		inputs.push("callFrom=" + callFrom);
		inputs.push("againstId=" + againstId);
		inputs.push("receiptOf=" + receiptOf);	
		inputs.push("multiPayDetails=" + multiPayDetails);
		inputs.push("listMultiRefundSave=" + listMultiRefundSave);
		inputs.push("refPer=" + refPer);
		inputs.push("extraRefFlag=" + extraRefFlag);
		inputs.push("remark=" + remark);
		inputs.push("sourceTypeId=" + sourceCatId);
		inputs.push("sponsorCatId=" + sponsorCatId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdbill/saveRefundBillDetailsIpd",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				/*
				 * $(".openAllSlave").trigger('click');
				 * $(".openAllSlave").trigger('click');
				 */
				/*
				 * getBillReceiptDetails('all'); setTotalPaid(); alert(r);
				 * $("#payable").val(0); $("#payNow").val(0);
				 */
			    //alert(r);
				if(r>0){
					
					alertify.success("Refund Receipt generated succesfully");
					receiptBillPrint("refundIpd",r);
				}else if(r==-1){
					
					alertify.error("Amount should be less than paid");
				}else if(r==-2){
					
					alertify.error("Receipt is not generated to refund");
				}else{
					
					alertify.error("Network Issue");
				}
				
				/*$("#payable").val(0);
				$("#payNow").val(0);*/
				$("#callFromForSave").val("");
				/*window.location.reload(true);
				getBillReceiptDetailsIpd('all');*/
				// window.location.reload(true);
				resetAllIpd("general");
				//$("#refundableCheckbox").prop("disabled", false);
				//$("#refundableCheckbox").prop("disabled", false);
				//$("#payNow").attr("onkeyup","");
			}
		});
		}
	}
	
	function setCghsMode(){
		
		$("#uiMode").val('cghs');		
		setUiMode();
	}
	
	/***********
	 * @author	: Vinod Udawant
	 * @date	: 06-jan-2018
	 * @codeFor : Set UI Mode
	 ***********/
	function setUiMode(){

		var uiMode=$("#uiMode").val();	
		
		if(uiMode=="cghs"){
			
			$('#servDiv').removeClass('col-md-9');
			$('#servDiv').addClass('col-md-12');
			$('#payDiv').hide('');
			$('#receiptView').hide('');
			$("#uiMode").val('S');		
			$("#txtPayAmtSp").html("Pay Amount");
			hideBillDetailsCghs();
			resetAllIpd('cghs');			
			//setFinalBillUi();
			
		}else{
			
			if(uiMode=='S'){
				
				$('#servDiv').removeClass('col-md-12');
				$('#servDiv').addClass('col-md-9');
				$('#payDiv').show('');
				$('#receiptView').show('');
				$("#uiMode").val('P');
				var sponsorId=$("#chargesSlaveId").val();
				if(sponsorId>0){
							
					$("#ipdSponsor").trigger('click');	
					resetAllIpd("IpdSponsor");	
					$("#txtPayAmtSp").html("Bill Details");
				}else{
					
					//$("#ipdGeneral").trigger('click');	
					resetAllIpd("general");
					$("#txtPayAmt").html("Bill Details");
				}
				
				//setFinalBillUi();
							
			}else{
				
				$('#servDiv').removeClass('col-md-9');
				$('#servDiv').addClass('col-md-12');
				$('#payDiv').hide('');
				$('#receiptView').hide('');
				$("#uiMode").val('S');
				var sponsorId=$("#chargesSlaveId").val();
				if(sponsorId>0){
							
					$("#ipdSponsor").trigger('click');	
					resetAllIpd("IpdSponsor");	
					$("#txtPayAmtSp").html("Pay Amount");
				}else{
					
					//$("#ipdGeneral").trigger('click');	
					resetAllIpd("general");
					$("#txtPayAmt").html("Pay Amount");
				}	
				
				//setFinalBillUi();
			}	
		}			
	}

	
	function hideBillDetailsCghs(){
		
		$("#cghsHide").toggle('slow');	
		var curClass=$("#shBillViewCghs").attr('class');
		
		if(curClass=="fa fa-chevron-up"){
			
			$("#shBillViewCghs").removeClass('fa fa-chevron-up');
			$("#shBillViewCghs").addClass('fa fa-chevron-down');
			$("#billTextCghs").text('Show Bill View');
			
			//$("#cghsHide").css("height","425px");
			$("#cghsHide").css("height","0px");
			$("#cghsHide").css("overflow","auto");		
			
		}else{
			
			$("#shBillViewCghs").removeClass('fa fa-chevron-down');
			$("#shBillViewCghs").addClass('fa fa-chevron-up');
			$("#billTextCghs").text('Show Cghs View');	
			
			//$("#cghsHide").css("height","259px");
			$("#cghsHide").css("height","259px");
			$("#cghsHide").css("overflow","auto");
		}	
	}
	
	 /*** 
	 * @author    :BILAL
	 * @Date      :07-02-2018
	 * @Code      :For getting year wsie charges  
	 * ********/
	function getyearwisecharges(suserviceId){
		var yearwisecharges=0;
		if (suserviceId == "" || suserviceId == null || suserviceId == undefined
				|| isNaN(suserviceId)) {
			suserviceId = 0;
		}
		

		var inputs = [];

		inputs.push('subserviceid=' + suserviceId);
		
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/autoallservicestest/getyearwisecharges",

			success : function(res) {
				
				yearwisecharges= res;
				
			}
		});
		return yearwisecharges;
	}
	
	
	
	/***********
	 * @author	: Kishor Lokhande
	 * @date	: 08-feb-2018
	 * @codeFor : This function use for access concession flow for Ipd
	 ***********/
	function setConcessionWhenAccesOnForIpd(){

	
			var concessionFlow=$('#concessionFlow').val();
			//var concessionFlow="off";
			if(concessionFlow=="on"){			
			//General
			$('#conDivGI').show('');
			$('#conPerDivGI').show('');	
			$('#coPayDivGI').show('');
			$('#dateDiveGI').hide('');
			
			/*$('#doctorDiveGI').removeClass('form-group col-md-2');
			$('#doctorDiveGI').addClass('form-group col-md-1');
			
			$('#dateDiveGI').removeClass('form-group col-md-2');
			$('#dateDiveGI').addClass('form-group col-md-1');*/
			
			//Sponsor
			$('#conDivSI').show('');
			$('#conPerDivSI').show('');	
			$('#payDivSI').show('');	
			$('#dateDiveSI').hide('');
			
			$('#divService').removeClass('col-md-2');
			$('#divService').addClass('col-md-1');
			
			$('#doctorDiveGI').removeClass('col-md-2');
			$('#doctorDiveGI').addClass('col-md-1');
			
			$('#divServiceSp').removeClass('col-md-2');
			$('#divServiceSp').addClass('col-md-1');
			
			$('#doctorDiveSI').removeClass('col-md-2');
			$('#doctorDiveSI').addClass('col-md-1');
			
			/*$('#doctorDiveSI').removeClass('form-group col-md-2');
			$('#doctorDiveSI').addClass('form-group col-md-1');
			
			$('#dateDiveSI').removeClass('form-group col-md-2');
			$('#dateDiveSI').addClass('form-group col-md-1');*/
			
		}else{		
			
			//General
			$('#conDivGI').hide('');
			$('#conPerDivGI').hide('');
			$('#coPayDivGI').hide('');			
			$('#dateDiveGI').show('');
					
			/*$('#doctorDiveGI').removeClass('form-group col-md-1');
			$('#doctorDiveGI').addClass('form-group col-md-2');
			
			$('#dateDiveGI').removeClass('form-group col-md-1');
			$('#dateDiveGI').addClass('form-group col-md-2');*/
			
			//Sponsor
			$('#conDivSI').hide('');
			$('#conPerDivSI').hide('');
			$('#payDivSI').hide('');			
			$('#dateDiveSI').show('');
			
			$('#divService').removeClass('col-md-1');
			$('#divService').addClass('col-md-2');
			
			$('#doctorDiveGI').removeClass('col-md-1');
			$('#doctorDiveGI').addClass('col-md-2');
			
			$('#divServiceSp').removeClass('col-md-1');
			$('#divServiceSp').addClass('col-md-2');
			
			$('#doctorDiveSI').removeClass('col-md-1');
			$('#doctorDiveSI').addClass('col-md-2');
			
			/*$('#doctorDiveSI').removeClass('form-group col-md-1');
			$('#doctorDiveSI').addClass('form-group col-md-2');
			
			$('#dateDiveSI').removeClass('form-group col-md-1');
			$('#dateDiveSI').addClass('form-group col-md-2');*/
			
		}	
	}
	
	
	function setDynamicFieldInCghs(){
		var masterModuleBody = "";
		var index = $("#cghsBillManual tr").length;
		//alert(index);
		if(index > 0){
			var serIndex=$('#serM'+index).val();
			if(serIndex != ""){
				index = index + 1;

				masterModuleBody = masterModuleBody
						+

						'<tr id="cghsId'
						+ index
						+ '"><td align="Center" id="inM'
						+ index
						+ '">'
						+ (index)
						+ '</td> <td align="Center"> <input type="text" style="width: 350px;" onkeyup="setAutocompleteOnIpdBillingDynamic(this.id,'+index+')" onchange="setDynamicFieldInCghs()" placeholder="Enter Perticular" id="serM'
						+ index
						+ '"/>'
						
						+ '</td> <td align="Center"> <input type="text" onchange="setDynamicFieldInCghs()" id="packM'
						+ index
						+ '"/> '
						
						+ '</td> <td style="display:none;" align="Center"> <input type="text" id="dateM'
						+ index
						+ '"/> '
						
						+ '</td> <td align="Center"> <input class="text-right" type="text" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="rateM'
						+ index
						+ '"/> '
						
						+ '</td> <td align="Center"> <input type="text" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="qtyM'
						+ index
						+ '"/> '
						
						+ '</td> <td style="display:none;" align="Center"> onkeypress="return validatePrice(event)" <input type="text" onkeyup="calculatePerticularTotal3('+index+')" id="conM'
						+ index
						+ '">'
						
						+ '</td> <td align="Center"> <input class="text-right" type="text" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="amt'
						+ index
						+ '"/> '
						
						+ '</td> <td align="Center" style="display:none"> <input type="text" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="payM'
						+ index
						+ '"/> '
						
						+ '</td> <td align="Center" style="display:none" <input type="text" value="0" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="cPayM'
						+ index
						+ '"/> '
						
						+ '</td> <td align="Center"><i aria-hidden="true" onclick="deleteCghs2('
						+ index
						+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>';

			}
		}else{
			index = index + 1;

			masterModuleBody = masterModuleBody
					+

					'<tr id="cghsId'
					+ index
					+ '"><td align="Center" id="inM'
					+ index
					+ '">'
					+ (index)
					+ '</td> <td align="Center"> <input type="text" style="width: 350px;" onkeyup="setAutocompleteOnIpdBillingDynamic(this.id,'+index+')" onchange="setDynamicFieldInCghs()" placeholder="Enter Perticular" id="serM'
					+ index
					+ '"/>'
					
					+ '</td> <td align="Center"> <input type="text" onchange="setDynamicFieldInCghs()" id="packM'
					+ index
					+ '"/> '
					
					+ '</td> <td style="display:none;" align="Center"> <input type="text" id="dateM'
					+ index
					+ '"/> '
					
					+ '</td> <td align="Center"> <input class="text-right" type="text" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="rateM'
					+ index
					+ '"/> '
					
					+ '</td> <td align="Center"> <input type="text" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="qtyM'
					+ index
					+ '"/> '
					
					+ '</td> <td style="display:none;" align="Center"> <input type="text" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="conM'
					+ index
					+ '">'
					
					+ '</td> <td align="Center"> <input type="text" class="text-right" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="amt'
					+ index
					+ '"/> '
					
					+ '</td> <td align="Center" style="display:none"> <input type="text" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="payM'
					+ index
					+ '"/> '
					
					+ '</td> <td align="Center" style="display:none" <input type="text" value="0" onkeypress="return validatePrice(event)" onkeyup="calculatePerticularTotal3('+index+')" id="cPayM'
					+ index
					+ '"/> '
					
					+ '</td> <td align="Center"><i aria-hidden="true" onclick="deleteCghs2('
					+ index
					+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>';

		}
		
		
		
		
		$("#cghsBillManual").append(masterModuleBody);
	}
	
	
	/*-------------------------------------------------------*/
	/*******************************************************************************
	 * @author : Kishor Lokhande
	 * @date : 19-feb-2018
	 * @code :autosuggestion Temp Master
	 ******************************************************************************/
	function setAutocompleteOnIpdBillingDynamic(inputID,index) {
		var listofunit = [];
		var resultData = [];
		var findingName = $("#" + inputID).val();

		var inputs = [];
		inputs.push('findingName=' + findingName);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/temp/fetchTempList",

			success : function(r) {
				/*
				 * alert(r.lstSubService[0].categoryName);
				 */
				autoCompOnIpdBillingCghsDynamic(r, inputID,index);

			}
		});
	}


	/*******************************************************************************
	 * @author : Kishor Lokhande
	 * @date :  19-feb-2018
	 * @code :autosuggestion Temp
	 ******************************************************************************/
	function autoCompOnIpdBillingCghsDynamic(response, id,index) {

		var myArray = response;// parsing response in JSON format
		$
				.widget(
						'custom.mcautocomplete',
						$.ui.autocomplete,
						{
							_create : function() {
								this._super();
								this.widget().menu("option", "items",
										"> :not(.ui-widget-header)");
							},
							_renderMenu : function(ul, items) {
								var self = this, thead;
								if (this.options.showHeader) {
									table = $('<div class="ui-widget-header" style="width:100%"></div>');
									$
											.each(
													this.options.columns,
													function(index, item) {
														table
																.append('<span style="padding:0 4px;float:left;width:'
																		+ item.width
																		+ ';">'
																		+ item.name
																		+ '</span>');
													});
									table
											.append('<div style="clear: both;"></div>');
									ul.append(table);
								}
								$.each(items, function(index, item) {
									self._renderItem(ul, item);
								});
							},
							_renderItem : function(ul, item) {
								var t = '', result = '';
								$
										.each(
												this.options.columns,
												function(index, column) {
													t += '<span style="padding:0 4px;float:left;width:'
															+ column.width
															+ ';">'
															+ item[column.valueField ? column.valueField
																	: index]
															+ '</span>';
												});
								result = $('<li></li>')
										.data('ui-autocomplete-item', item)
										.append(
												'<a class="mcacAnchor">'
														+ t
														+ '<div style="clear: both;"></div></a>')
										.appendTo(ul);
								return result;
							}
						});

		// Sets up the multicolumn autocomplete widget.
		$("#" + id).mcautocomplete(
				{
					// These next two options are what this plugin adds to the
					// autocomplete widget.
					showHeader : true,
					columns : [ {
						name : 'ServiceName',
						width : '100px',
						valueField : 'tempName'
					}, {
						name : 'CodeName',
						width : '90px',
						valueField : 'tempCode'
					} ],

					// Event handler for when a list item is selected.
					select : function(event, ui) {
						console.log(ui);
						
						$('#serM'+index).val(ui.item.tempName);
						$('#packM'+index).val(ui.item.tempCode);
						setDynamicFieldInCghs();
						/*
						 * $("#subservicesname").val(ui.item.categoryName);
						 * $("#subserviceid").val(ui.item.categoryid);
						 * $("#servicename").val(ui.item.serviceName);
						 * $("#serviceid" ).val(ui.item.serviceid); $("#rate"
						 * ).val(ui.item.categorycharges); $("#concession"
						 * ).val(ui.item.concession); $("#amount"
						 * ).val(ui.item.amount); $("#servId"
						 * ).val(ui.item.serviceid); calculatePerticularTotal1();
						 */
						//setDynamicFieldInCghs();
						return false;

					},

					// The rest of the options are for configuring the ajax
					// webservice call.
					minLength : 1,
					source : function(request, response) {
						var data = myArray;
						console.log(data);
						console.log(data.listTemp.length);
						var result;
						if (!data || data.listTemp.length === 0 || !data.listTemp
								|| data.listTemp.length === 0) {
							/*
							 * result = [{ label: 'No match found.' }];
							 */
							result = [ {
								/* 'dn' : 'No', */
								'categoryName' : 'NO',
								'serviceName' : 'Match',
							/* 'depNm' : 'Match' */
							} ];
						} else {
							result = data.listTemp;// Response List for All
							// Services
						}
						response(result);
						$('#ui-id-1').css("z-index", "10000000000");
						
					}
				});
	}
	
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 10_June_2017
	 * @Code Getting amount
	 ******************************************************************************/

	function calculatePerticularTotal3(index) {
		var rateManual = $("#rateM"+index).val();
		var qtyManual = $("#qtyM"+index).val();
		var concessionManual = $("#conM"+index).val();
		if (qtyManual == "") {
			$("#qtyM"+index).val(1);
		}
		if (rateManual == "") {
			$("#rateM"+index).val(0);
		}
		if (payManual == "") {
			$("#rateM"+index).val(0);
		}
		if (concessionManual == "") {
			$("#conM"+index).val(0);
		}
		if (concessionManual > (rateManual * qtyManual)) {
			var quantityManual = $("#qtyM"+index).val();
			if (quantityManual == 0) {
				// alert("Quantity Cannot Be 0");
				$("#conM"+index).val(0);
				calculatePerticularTotal2();
				return false;
			} else {
				alert("Discount Cannot Be Greater Than " + (rate * qty));
				$("#conM"+index).val(0);
				$("#amt"+index).val(rateManual * qtyManual);
				$("#payM"+index).val(rateManual * qtyManual);
				return false;
			}
		}
		var amountManual = ((rateManual * qtyManual) - concessionManual);
		$("#amt"+index).val(amountManual);
		
		//$("#coPayManual").val(amountManual);
		var sponsorId = $("#SponsorsourceTypeId").val();
		var chargesSlaveId = $("#chargesSlaveId").val();

		if (sponsorId == 1 && chargesSlaveId > 0) {

			$("#payM"+index).val(amountManual);
			$("#coPayM"+index).val(0);

		} else {

			$("#coPayM"+index).val(amountManual);
			$("#payM"+index).val(0);

		}	
		
		/*var aa=$("#amt"+index).val();
		var remAmttt = $("#totalManualRemains").val();
		if(remAmttt < aa){
			alert("Total should be less than remain amount");
			$("#rateM"+index).val(0);
			$("#qtyM"+index).val(1);
		}else{
		$("#totalManualRemains").val(Number(remAmttt)-Number(aa));
		}*/
		
		var SpecialDisc1 = $("#SpecialDisc").val();
		if (SpecialDisc1 == 0 && ($("#coPayM"+index).val()) == 0) {

			//calculatePerticularCoPay3(index);

		} else {
			//calculatePerticularPay3(index);

		}
		calDynamicTotal();
	}

	function calculatePerticularCoPay3(index) {
		var payManual = $("#payM"+index).val();
		var amountManual = $("#amt"+index).val();
		if (payManual == "" || amountManual == "") {
			return false;
		}

		if (payManual < 0) {
			payManual = 0;
		} else if (isNaN(payManual) == true) {
			payManual = 0;
		}

		var coPayManual = (amountManual - payManual);
		$("#coPayM"+index).val(coPayManual);
	}


	function calculatePerticularPay3(index) {
		var coPayManual = $("#coPayM"+index).val();
		var amountManual = $("#amt"+index).val();
		if (coPayManual == "" || amountManual == "") {
			return false;
		}
		if (coPayManual < 0) {
			coPayManual = 0;
		} else if (isNaN(coPayManual) == true) {
			coPayManual = 0;
		}

		var payManual = (amountManual - coPayManual);
		$("#payM"+index).val(payManual);
	}
	
	
	
//save funtion cghs dynamic
	function saveIpdCghsDynamic(){

		var tableRows1 = $('#cghsBillManual tr').length;

	for ( var index1 = 1; index1 <= tableRows1; index1++) {

		var Service1 = $("#serM" + index1).val();
		var rate1 = $("#rateM" + index1).val();

		if (tableRows1 != index1) {
			if (Service1 == "") {
				alert("Service should not be empty on Line NO-" + index1);
				return false;
			}
			if (rate1 == "" || rate1 == 0) {
				alert("Rate should not be empty Or Zero on Line NO-" + index1);
				return false;
			}
		}
	}

	var tableR1 = $('#cghsBillManualChangeRemains tr').length;

	for ( var ii = 1; ii <= tableR1; ii++) {

		var Service2 = $("#serR" + ii).val();
		var rate2 = $("#rateR" + ii).val();

		if (tableR1 != ii ) {
			if (Service2 == "") {
				alert("Service should not be empty on Line NO-" + ii);
				return false;
			}
			if (rate2 == "" || rate2==0) {
				alert("Rate should not be empty Or Zero on Line NO-" + ii);
				return false;
			}
		}
	}
		
		var totalManualRemains = parseFloat($('#totalManualRemains').val());
		if(totalManualRemains > 0.0)
			{
			alert("Remain Amount should be 0");
			return false;			
			}else if(totalManualRemains < 0.0){
				alert("Remain Amount should be 0");
				return false;
			}
				
		var queryType = $('#queryType').val();		
				
		var patientId     = $("#pId").val();
		var treatmentId    = $("#tId").val();
		var departmentId   = $("#depdocdeskid").val();		
		var billId         = parseInt($("#billNo").html());	
		var unitId = $("#uId").val();
		

		var tableRows = $('#cghsBillManual tr').length -1;
			
		var cghsDetails = {
				listCghs : []
		};
		
		for(var index=1;index <= tableRows;index++){
			
	
			var Service = $("#serM"+index).val();
			
			var packService = $("#packM"+index).val();
			var packser="";
			if (packService == "" || packService == null) {
				packser = "-";
			} else {
				packser = $("#packM" + index).val();
			}
			var date = $("#dateM"+index).val();
			var rate = $("#rateM"+index).val();
			var qty = $("#qtyM"+index).val();
			var con = $("#conM"+index).val();
			var amount = $("#amt"+index).val();
			//var pay = $("#payM"+index).val();
			var pay = $("#payM"+index).val();
			//var coPay = $("#cPayM"+index).val();
			var coPay = 0;
			var cghsFlag = 'M';
			
			
			
			cghsDetails.listCghs.push({
				queryType 		: queryType,
				patientId 		: patientId,
				treatmentId 	: treatmentId,
				departmentId 	: departmentId,
				billId			: billId,
				unitId			: unitId,
				serviceName 	: Service,
				packService     :packser,
				//date 			: date,
				rate 			: rate,
				quantity 		: qty,
				concession 		: con,
				amount 			: amount,
				pay 			: pay,
				coPay 			: coPay,
				cghsFlag 		: cghsFlag
				
				});
		}
		
		
		var tableR = $('#cghsBillManualChangeRemains tr').length-1;
		

		/*if (tableR == undefined || tableR == 0) {
			alert("There is no record to add in CGHS List!");
			return false;
		}*/
		
			
		var cghsDetailsRemain = {
				listCghsRemain : []
		};
		
		for(var i=1;i <= tableR;i++){
			
			var Service = $("#serR"+i).val();
			var date = $("#dateR"+i).val();		
			var packService = $("#packR"+i).val();
			
			
			var packser="";
			if (packService == "" || packService == null) {
				packser = "-";
			} else {
				packser = $("#packR" + i).val();
			}
			
			var rate = $("#rateR"+i).val();
			var qty = $("#qtyR"+i).val();		
			var amount = $("#amtR"+i).val();
			//var pay = $("#payR"+i).val();
			var pay = 0;
			var cghsFlagg = 'R';
			
			
			/*alert(Service);
			alert(packService);
			alert(rate);
			alert(qty);
			alert(amount);
			alert(pay);*/
			//return false;
			
			
			cghsDetailsRemain.listCghsRemain.push({
				queryType 		: queryType,
				patientId 		: patientId,
				treatmentId 	: treatmentId,
				departmentId 	: departmentId,
				billId			: billId,
				unitId			: unitId,
				serviceName 	: Service,
				//date 			: date,
				amount 			: amount,
				packService     :packser,
				rate 			: rate,
				quantity 		: qty,
				pay 			: pay,
				//coPay 			: coPay,
				cghsFlag 		: cghsFlagg
				
				});
		}
		cghsDetailsRemain = JSON.stringify(cghsDetailsRemain);
		cghsDetails = JSON.stringify(cghsDetails);
		
		if(cghsDetailsRemain == null || cghsDetailsRemain == undefined){
			alert("Fill Records!!!");
			return false;
		}
		
		if(cghsDetails == null || cghsDetails == undefined){
			alert("No Records!!!");
			return false;
		}
		//alert(cghsDetails);
		//return false;
		var inputs = [];
		
		//inputs.push('action=CghsfetchReports');
		inputs.push('treatmentId=' + treatmentId);	
		inputs.push('departmentId=' + departmentId);
		
		inputs.push("cghsDetails="+ encodeURIComponent(cghsDetails));
		inputs.push("cghsDetailsRemain="+ encodeURIComponent(cghsDetailsRemain));
		inputs.push("queryType=" + queryType);
		
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdbill/saveIpdCghs",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				//alert(r);
				alertify.success("Saved succesfully");
				//proFeesDoctorPayment();
				getIpdServiceDetailsForCghs(treatmentId, departmentId);
			}
		});


	}

function setDynmaicCghsRemains(){
	var indexR = $("#cghsBillManualChangeRemains tr").length;
	
	if(indexR > 0){
		var serIndex=$('#serR'+indexR).val();
		if(serIndex != ""){
			indexR = indexR + 1;
			var masterModuleBody1 = "";

			masterModuleBody1 = masterModuleBody1 +
			'<tr id="cghsIdR'+ indexR
			+ '"><td align="Center">' + (indexR)
					+ '</td> <td align="Center"><input type="text" style="width: 350px;" onchange="setDynmaicCghsRemains()" id="serR'+ indexR+ '">' 
					+ '</td><td align="Center"><input type="text" id="packR'+ indexR+ '">' 
					+ '</td><td align="Center"><input class="text-right" type="text"  onkeyup="calculatePerticularTotalRemainsNew('+indexR+')" id="rateR'+ indexR+ '">' 
					+ '</td><td align="Center"><input type="text"  onkeyup="calculatePerticularTotalRemainsNew('+indexR+')" id="qtyR'+ indexR+ '" value="1">'  
					+ '</td> <td align="Center" style="display:none;"><input type="text" id="dateR'+ indexR+ '">'
					+ '</td> <td align="Center"><input class="text-right" type="text"  id="amtR'+ indexR+ '">'
					+ '</td> <td align="Center" style="display:none"><input type="text"  id="payR'+ indexR+ '">'
					+ '</td> <td align="Center"><i aria-hidden="true" onclick="deleteManualCghs2('
					+ indexR
					+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td> </tr>';

			}
		}else{
			indexR = indexR + 1;
			var masterModuleBody1 = "";

			masterModuleBody1 = masterModuleBody1 +
			'<tr id="cghsIdR'+ indexR
			+ '"><td align="Center">' + (indexR)
					+ '</td> <td align="Center"><input type="text" style="width: 350px;" onchange="setDynmaicCghsRemains()" id="serR'+ indexR+ '">' 
					+ '</td><td align="Center"><input type="text" id="packR'+ indexR+ '">' 
					+ '</td><td align="Center"><input class="text-right" type="text"  onkeyup="calculatePerticularTotalRemainsNew('+indexR+')" id="rateR'+ indexR+ '">' 
					+ '</td><td align="Center"><input type="text"  onkeyup="calculatePerticularTotalRemainsNew('+indexR+')" id="qtyR'+ indexR+ '" value="1">'  
					+ '</td> <td align="Center" style="display:none;"><input type="text" id="dateR'+ indexR+ '">'
					+ '</td> <td align="Center"><input class="text-right" type="text"  id="amtR'+ indexR+ '">'
					+ '</td> <td align="Center" style="display:none"><input type="text"  id="payR'+ indexR+ '">'
					+ '</td> <td align="Center"><i aria-hidden="true" onclick="deleteManualCghs2('
					+ indexR
					+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td> </tr>';

			
		}
	
	
	$("#cghsBillManualChangeRemains").append(masterModuleBody1);
}




/*******************************************************************************
 * @author Kishor Lokhande
 * @date 19_Feb_2018
 * @Code Getting amount
 ******************************************************************************/

function calculatePerticularTotalRemainsNew(index) {
	
	var rateManual = $("#rateR"+index).val();
	var qtyManual = $("#qtyR"+index).val();
	//var concessionManual = $("#concessionManual").val();
	var concessionManual = 0;

	if (qtyManual == "") {
		$("#qtyR"+index).val(1);
	}
	if (rateManual == "") {
		$("#rateR"+index).val(0);
	}
	if (payManual == "") {
		$("#rateR"+index).val(0);
	}
	if (concessionManual == "") {
		$("#concessionManual").val(0);
	}
	/*if (concessionManual > (rateManual * qtyManual)) {
		var quantityManual = $("#qtyManualRemains").val();
		if (quantityManual == 0) {
			// alert("Quantity Cannot Be 0");
			//$("#concessionManual").val(0);
			calculatePerticularTotalRemains();
			return false;
		} else {
			alert("Discount Cannot Be Greater Than " + (rate * qty));
			//$("#concessionManual").val(0);
			$("#amtR"+index).val(rateManual * qtyManual);
			$("#payR"+index).val(rateManual * qtyManual);
			return false;
		}
	}*/
	var amountManual = ((rateManual * qtyManual) - concessionManual);
	$("#amtR"+index).val(amountManual);
	//$("#coPayManual").val(amountManual);
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();

	if (sponsorId == 1 && chargesSlaveId > 0) {

		$("#payR"+index).val(amountManual);

	} else {

		$("#coPayR"+index).val(amountManual);

	}	
	
	
	
	var SpecialDisc1 = $("#SpecialDisc").val();
	if (SpecialDisc1 == 0 && ($("#coPayManual").val()) == 0) {

		calculatePerticularCoPayRemainsNew(index);

	} else {
		calculatePerticularPayRemainsNew(index);

	}
	calDynamicTotal();
}

function calculatePerticularCoPayRemainsNew(index) {
	var payManual = $("#payR"+index).val();
	var amountManual = $("#amtR"+index).val();
	if (payManual == "" || amountManual == "") {
		return false;
	}

	if (payManual < 0) {
		payManual = 0;
	} else if (isNaN(payManual) == true) {
		payManual = 0;
	}

	var coPayManual = (amountManual - payManual);
	$("#coPayR"+index).val(coPayManual);
}


function calculatePerticularPayRemainsNew(index) {
	var coPayManual = $("#coPayR"+index).val();
	var amountManual = $("#amtR"+index).val();
	if (coPayManual == "" || amountManual == "") {
		return false;
	}
	if (coPayManual < 0) {
		coPayManual = 0;
	} else if (isNaN(coPayManual) == true) {
		coPayManual = 0;
	}

	var payManual = (amountManual - coPayManual);
	$("#payR"+index).val(payManual);
}

function calDynamicTotal(){
	
	var tableRows1 = $('#cghsBillManual tr').length;

	var amtTotal=0.0;
	for ( var index1 = 1; index1 <= tableRows1; index1++) {

		
		var amt1 = $("#amt" + index1).val();
		amtTotal=Number(amtTotal)+Number(amt1);
		
	}

	var tableR1 = $('#cghsBillManualChangeRemains tr').length;

	for ( var ii = 1; ii <= tableR1; ii++) {

		var amt2 = $("#amtR" + ii).val();
		amtTotal=Number(amtTotal)+Number(amt2);
		
	}
	var billAmt = parseFloat($("#totalAmmt").text());
	//var amtTotal1 = parseFloat(amtTotal);
	//var billAmt = $("#totalAmmt").text();
	var calAmt=Number(billAmt)-Number(amtTotal);
	$("#totalManualRemains").val(calAmt);
}


//Touheed
//Sorting data
//Date 15-Dec-2015
/*function sort() {
	$('.sortable').sortable();
	$('.handles').sortable({
		handle: 'span'
	});
	$('.connected').sortable({
		connectWith: '.demo'
	});
	$('.exclude').sortable({
		items: ':not(.disabled)'
	});
	
	
	
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-36251023-1']);
	  _gaq.push(['_trackPageview']);

	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();
}
*/

function goToDischargeSummary(treatId){
	if(treatId=="" || treatId==null || treatId == undefined)
		{
		return false;
		}
	
	window.open("IPD_DischargeAutoSummary2.jsp?"+"treatmentId=" +encodeURIComponent(treatId));
}

function uploadDocumentIpd() {  
	var doc = $("#ifile").val();
	var note = $("#iNotes").val();

	if (doc == "" || doc == undefined) {
		alert("Please select file");
		$('#fileUploadfrm').attr('onsubmit', 'return false;');
	} else {
		alert("File uploaded");
		$('#fileUploadfrm').attr('onsubmit', 'return true;');
	}
}

function setFinalBillUi(){
	
	var fb=$("#finalbillis").val();
	
	if(fb=="finalBill"){
		
		$('#servDiv').removeClass('col-md-12');
		$('#servDiv').addClass('col-md-9');
		$('#payDiv').show('');
		$('#receiptView').show('');
		
		//$("#uiMode").val("P");
		
		/*getCommonAdvcIpd();
		fetchIpdbilDiscount("ipdBill");		
		getBillReceiptDetailsIpd('all');
		fetchAllReceiptTotals("ipd");
		fetchPrevPendingIpd("onload");
		fetchAuthorisedBy();
		getAllPayments();
		getAllNarrations();*/
	}
}

function distributePpnAmount(){
	
	var patientId     = $("#pId").val();
	var treatmentId    = $("#tId").val();
	var departmentId   = $("#depdocdeskid").val();		
	var billId         = parseInt($("#billNo").html());	
	var unitId = $("#uId").val();
	var totalAmt    = parseFloat($("#grandTotal").text());
	var chargesSlaveId    = ($("#chargesSlaveId").val());
	var  distRate   = parseFloat($("#ppnNumber").text());
	if(distRate == 0 || distRate == null || distRate == undefined || isNaN(distRate)){
		alert("Distribute Should not be Zero");
		return false;
	}
	
	if(distRate == totalAmt){
		alert("Grant Amount and Distribute Amount can't be same");
		return false;
	}
	/*alert(patientId);
	alert(treatmentId);
	alert(departmentId);
	alert(billId);
	alert(unitId);
	alert(totalAmt);*/
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"patientId" : patientId,
			"treatmentId" : treatmentId,
			"departmentId" : departmentId,
			"billId" : billId,
			"distRate" : distRate,
			"totalAmt" : totalAmt,
			"chargesSlaveId" : chargesSlaveId
		},
		url : "ehat/ipdbill/distributePpnAmount",
		success : function(r) {
			// setTempPatientRecords(r);
			
			//console.log(r);
			//setBillDetailsEstimateTemp(r);
			resetAllIpd('IpdSponsor');
			if(r==1){
			alertify.success(" Distribute Rate succesfully");
			}
		}
	});
}

function checkAllIpd(callFrom){
	
	$("input[name='opdBillCheckboxReg']:checkbox").each(function() {
		 
		var cb = $(this);
		if(cb.is(':disabled')) {
		   	 			 
		}else{
			  
			cb.prop('checked',true);			 
		}		
	});	
	
	$("input[name='opdBillCheckbox']:checkbox").each(function() {
		 
		var cb = $(this);
		if(cb.is(':disabled')) {
		   	 			 
		}else{
			  
			cb.prop('checked',true);			 
		}		
	});		
}
 
function uncheckAllIpd(){
	
	$("input[name='opdBillCheckboxReg']:checkbox").prop('checked',false);
	$("input[name='opdBillCheckbox']:checkbox").prop('checked',false);	

	var a = parseFloat(0).toFixed(2);
	
	$("#payable").val(a);
	$("#payNow").val(a);	
}

/************
 * @author	: Laxman Nikam
 * @date	: 13-April-2018
 * @codeFor	: For when assign test that time test send to lab immediatly.
  ************/
 function packageIpdSendToLab(serviceDetails,queryType){
	 var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdbill/packageIpdSendToLab",

			error : function() {
				alertify.error('Network Issue!!!');
			},
			success : function(r) {
				if(r=="0")
				{
					smplColFlg="Y";
					dupTestFlag="N";
					return false;
				}
				else if(r=="-1")
				{
					alertify.error("Network error...!");
					return false;
				}else if(r=="1")
				{
					smplColFlg="N";
					dupTestFlag="N";
				}else if(r=="2")
				{
					dupTestFlag="Y";
					smplColFlg="N";
				}

			}
		});
 }
 /************
 * @author	: Laxman Nikam
 * @date	: 14-March-2018
 * @codeFor	: if Test inside package delete from bill,also delete from lab.
  ************/
 function deleteLabPackageTestIPD(otherBillDetailsId){
 	var deptId=2;
 	
 	jQuery.ajax({
 		async : false,
 		type 	: "POST",
 		url 	: "ehat/doctordesk/deleteLabPackageTest",
 		data	: {
 			
 		  "otherBillDetailsId" : otherBillDetailsId,
 		  "deptId" : deptId,
 			
 		},
 		timeout : 1000 * 60 * 5,
 		cache 	: false,
 	
 		success : function(r) {
 			
 			if(r=="0")
 			{
 				deleteTestSmplColFlg="Y";
 				return false;
 			}
 			else if(r=="-1")
 			{
 				alert("Network error...!");
 				return false;
 			}else if(r=="1")
 			{
 				deleteTestSmplColFlg="N";
 			}
 		}
 		
 	});
 }
 
 //Mohd Tarique Aalam Date:10/07/2018
 function  setColorCode(patientId,treatmentId)
 {
	 	jQuery.ajax({
	 		async : false,
	 		type 	: "POST",
	 		url		: "ehat/ipdbill/getColorCode",
	 		data	: {
	 		  "treatmentId" : treatmentId	
	 		},
	 		timeout : 1000 * 60 * 5,
	 		cache 	: false,
	 		success : function(r) {
	 			if(r=="general")
	 				{
	 				  $("#colorCode"+patientId).removeClass("btn-success");
		 			  $("#colorCode"+patientId).addClass("btn-success");
	 				}else if(r=="credit")
	 					{
	 					  $("#colorCode"+patientId).removeClass("btn-success");
	 		 			  $("#colorCode"+patientId).addClass("btn-warning");
	 					}else
	 						{
	 						  $("#colorCode"+patientId).removeClass("btn-success");
		 		 			  $("#colorCode"+patientId).addClass("btn-default");
	 						}
	 	
	 			  
	 			
	 		}
	 		
	 	});
 }
 
 
 
 //Added by Kishor for multiple sponsor
 
 function getSponsorSanctionAmount(){
	var SponsorsourceTypeId = $('#SponsorsourceTypeId').val();
	var chargesSlaveId = $('#chargesSlaveId').val();
	 var treatmentId=$('#treatmentId').text();
	var patientId=$('#patientId').text();
	//alert(treatmentId +"  "+patientId);
	
	if(SponsorsourceTypeId > 0 && chargesSlaveId > 0){
		
		jQuery.ajax({
	 		async : false,
	 		type 	: "POST",
	 		url		: "ehat/ipdbill/getSponsorSanctionAmount",
			 		data : {
			 	"callfrom" : "ipd",
				"patientId" : patientId,
				"treatmentId" : treatmentId,
				"SponsorId" : SponsorsourceTypeId,
				"chargesSlaveId" : chargesSlaveId
			},
	 		cache 	: false,
	 		success : function(r) {
	 			//alert(r.listMultipleSponsor[0].sanctionAmt);
	 			var sanctionAmt = Number(r.listMultipleSponsor[0].sanctionAmt);
	 			var balanceAmount = Number(r.listMultipleSponsor[0].remSanctionAmt);
	 			var utilisedAmount = (sanctionAmt - balanceAmount).toFixed(2);
	 			
	 			$('#sanctionAmount').text(sanctionAmt.toFixed(2));
	 			$('#utilisedAmount').text(utilisedAmount);
	 			$('#balanceAmount').text(balanceAmount.toFixed(2));
	 			
	 		}
	 		
	 	});
		
	}
 }
 
 //This function use for set Sponsor Rate To Self Patient @Kishor
 function setSponsorRateToSelfPatient(){
	 var r = confirm("Are You Sure You Want To Convert Sponsor Rate?");
		if (r == true) {
		var labservicelist = [];
		var labservicelist1 = [];
		var servicelist2 = [];
		var treatmentId = $('#treatId').val();
		var patientId = parseInt($("#patientId").text());
		var sponsorId = $("#SponsorsourceTypeId").val();
		var chargesSlaveId = $("#chargesSlaveId").val();
		
		$('input[name=opdBillCheckbox]:checked').each(function() {

			labservicelist.push(parseInt($(this).val()));
			var a=parseInt($(this).val());
			labservicelist1.push(parseInt($("#subserviceid"+a).text()));
			servicelist2.push(parseInt($("#sId"+a).text()));
		});

		if (labservicelist.length == 0) {
			alert("Please check at least One Service to Convert to Sponsor Or Open all Services.");
			return false;

		}		
		
		// note: jQuery's filter params are opposite of javascript's native implementation :(
		var unique = $.makeArray($(servicelist2).filter(function(i,itm){ 
		    // note: 'index', not 'indexOf'
		    return i == $(servicelist2).index(itm);
		}));

		//alert(unique);
		var inputs = [];
		inputs.push("labservicelist=" + encodeURIComponent(labservicelist1));
		inputs.push("servicelist=" + encodeURIComponent(unique));
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('patientId=' + patientId);
		inputs.push('sponsorId=' + sponsorId);
		inputs.push('chargesSlaveId=' + chargesSlaveId);
		inputs.push('callFrom=' + "IPD");
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/ipdbill/setSponsorRateToSelfPatient",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			cache : false,

			success : function(r) {

				// fetchbilldetails();
				//getPatientBillAmountIpd(treatId);
				alert(r);
				window.location.reload(true);
			}

		});
		}
}
 
 function getPatientCommanAdvance(){
		var patient_ID = $('#patientId').text();

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
 
 