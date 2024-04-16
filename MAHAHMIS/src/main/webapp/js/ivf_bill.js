/************
 * @author  : Vinod Udawant
 * @date    : 31-march_2021
 * @Codefor : Get ivf queue
 ************/
function getAllIVFPatient() {
	
	var deptId = 1;
	$("#depId").val(deptId);
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"deptId" : deptId
		},		
		url : "ehat/ivfbill/getAllRecordsForOPDqueue1",
		success : function(r) {
			
			$("#appointedpatientDiv").html(r);
			setTempPatientForIVFque1(r);		 
		}
	});
}
/************
 * @author  : Vinod Udawant
 * @date    : 31-march_2021
 * @Codefor : search ivf queue
 ************/
function SearchIVFPatientIdOnEnter(key, page_name) {

	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 47 && keycode < 58) || keycode == 8 || keycode == 9
			|| (keycode > 36 && keycode < 41) || keycode == 127
			|| keycode == 27 || keycode == 46) {
		return true;
	} else if (keycode == 13) {
		
		if (page_name == "OPDQueueNew") {
			AutosuggestionForIVFOPDque1("",'search');
		}
	} else {
		alert("Please Enter Numbers Only!");
		return false;
	}
};

/************
 * @author  : Vinod Udawant
 * @date    : 31-march_2021
 * @Codefor : autosuggestion ivf queue
 ************/
function AutosuggestionForIVFOPDque1(inputId,callfrom) {
	
	var deptId=1;
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		
		var sridname = $("#sridname").val();
		if(sridname=='N'){
			usertype=sridname; 
			letter=$("#byName").val();    	  
		}else{
			letter=$("#byId").val();
			usertype=sridname;     	  
		}
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
		url : "ehat/ivfbill/getAllOpdRecordsDeptwiseWithAuto",
		success : function(r) {

			$("#byId").val("");
			$("#OPDPatientList").html(r);			 
			setTempPatientForIVFque1(r);
			//AllPatientRecordsAutosuggestioTemp(r,inputId);			
		}
	});
}

/************
 *@author	: Vinod Udawant
 *@date		: 01-April-2021
 *@code		: save Service BillDetails
 ***********/
function saveIvfServiceToPatient(callform){
	
	var emrPer=$('#emrPer').val();
	if (emrPer == "" || emrPer == null || emrPer == undefined) {
		emrPer=0;
	}
	
	var narration =$("#narration").val();
	if (narration == "narration") {
		setnarationpopup();
		return false;
	}

	var narrationid =$('#narrationid').val();
	if (narrationid != "" || narrationid != null || narrationid != undefined) {
		closePopupnarration();
	}
	
	if (narrationid == "" || narrationid == null || narrationid == undefined) {
		narrationid="-";
	}

	var narrationBill =$("#narrationBill").val();
	if (narrationBill == "narrationBill") {
		setnarationpopupBill();
		return false;
	}
	
	var narrationidBill =$('#narrationidBill').val();
	if (narrationidBill != "" || narrationidBill != null || narrationidBill != undefined) {
		closePopupnarrationBill();
	}	
	
	if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
		narrationidBill="-";
	}
    	
	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	
	if (sponsorId > 0 && chargesSlaveId > 0) {
		getcharges();
	}
	
	var SponsorOtherRate  = parseFloat($("#chargesfromConf").val());
	var defchargesfromConf  = parseFloat($("#defchargesfromConf").val());
	var serviceId	 =  $("#serviceid").val(); 
	var callfrom =$('#saveServiceCallFrom').val();
	var masterReceiptId =$('#receiptMasterId').val();
	var iscombination =$("#iscombination").val();
	var receiptOf  =$('#receiptOf').val();
	var recSlaveId  =	$('#receiptSlaveId').val();	//receipt slave id
	var sndToLabFlag = $("#sndtolabflag").val().trim();
	
	if(sndToLabFlag == "" || sndToLabFlag == null || sndToLabFlag == undefined){
		sndToLabFlag="N";
	}
	
	if (recSlaveId == "" || recSlaveId == null || recSlaveId == undefined || isNaN(recSlaveId)) {
		recSlaveId = 0;
	} 
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	if(sponsorId > 0 && chargesSlaveId > 0){
	     $("#sponsorid2").val(sponsorId);
	     $("#chargesSlaveId2").val(chargesSlaveId);
	} 
	if (masterReceiptId == "" || masterReceiptId == null || masterReceiptId == undefined || isNaN(masterReceiptId)) {
		masterReceiptId = 0;
	}
	
	if (serviceId == "" || serviceId == null || serviceId == undefined || isNaN(serviceId)) {
		serviceId = 0;
	}
	
	if (SponsorOtherRate == "" || SponsorOtherRate == null || SponsorOtherRate == undefined || isNaN(SponsorOtherRate)) {
		SponsorOtherRate = 0;
	}
	
	if (defchargesfromConf == "" || defchargesfromConf == null || defchargesfromConf == undefined || isNaN(defchargesfromConf)) {
		defchargesfromConf = 0;
	}
	
    var sendToRisId = $("#sendToRisId").val().trim();
	var queryType  =	$('#queryType').val();
	var doctorId = $( "#doctorName option:selected" ).val();
	var billDetailsId =$('#billDetailsId').val();
	var	patienttId   =  $("#pId").val();
	var treatmentId  =  $("#tId").val(); 
	var	departmentId = $("#depdocdeskid").val(); ;
	var billId       =  $("#billId").val(); 
	var	sourceTypeId =  $("#sourceTypeId").val();
	var rate         =  $("#rate").val();
	var concession         =  $("#concession").val();
	var quantity     =   $("#qty").val();
	var amount       = $("#amount").val();		
	var pay       = $("#pay").val();
	var coPay       = $("#coPay").val();
	var createdDateTime   = $("#finalDate").val();
	var subServiceId =  $("#subserviceid").val();
	var pharmaId=$("#pharmacyInvoice").val();
	var  drdeskflag="N";
	var pharmacyInvname = $("#perticular").val();  //Pooja
	var update = $('#queryType').val();
	if(update != "update"){
		if(subServiceId == 0 && pharmacyInvname != ""){
			subServiceId = 9;
			serviceId =$("#pharmacyInvoice").val();//only for invoice 
			drdeskflag =$("#perticular").val();
		}
	}else{
		if(serviceId == pharmaId && subServiceId == 9 && pharmacyInvname != ""){
			drdeskflag =$("#perticular").val();
		}
	}
	
	if(subServiceId == 0){
		alert("Please enter valid service Name");
		clearAllFieldsOfOpd();
		return false;
	}
	
	var ratevalidation = $('#rate').val();
    var subservicesname   = $("#perticular").val();
    var servicename       = $("#servicename").val();
    var unitId            = $("#uId").val();
    var concessionOnPerc  = $("#concessionOnPerc").val();
    var module 	 = "opd";
    
    var otherRate=0;
    var otherConcession=0;
    var otherCoPay=0;
    var otherPay=0;
    var otherAmount=0;
    if(SponsorOtherRate== -10){
    	
    	otherRate=rate;
    	otherAmount=(rate * quantity) ;
    	var otherconAmt=((concessionOnPerc * otherAmount)/100).toFixed(2);
	    otherCoPay=0;
	    otherPay=amount-otherconAmt;
	    otherConcession  =  otherconAmt;
	    
    }else{
    	
		if (sponsorId > 0 && chargesSlaveId > 0) {
			otherRate = SponsorOtherRate;
		} else {
			otherRate = rate;
		}
    	
	    otherAmount=(otherRate * quantity);
	    var otherconAmt=((concessionOnPerc * otherAmount)/100).toFixed(2);
	    otherCoPay=0;
	    otherPay=otherAmount-otherconAmt;
	    otherConcession  =  otherconAmt;
    }
   
    var tempDate = createdDateTime.split("/");
	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
    
	if (subServiceId == "" || subServiceId == null || subServiceId == undefined || isNaN(subServiceId)) {
		subServiceId = 0;
	}
	
	if(unitId ==0){
		unitid = $("#allunitid").val();
	}
	
	var serviceDetails = {
			listBillDetails : []
	};
	serviceDetails.listBillDetails.push({
		
		patienttId : patienttId,
		billDetailsId : billDetailsId,
		serviceId : serviceId,
		doctorId : doctorId,
		treatmentId : treatmentId,
		departmentId : departmentId,
		billId : billId,
		sourceTypeId : sourceTypeId,
		rate : rate,
		concession : concession,
		quantity : quantity,
		amount : amount,
		pay : pay,
		coPay : coPay,
		serviceId : serviceId,
		subServiceId : subServiceId,
		unitId : unitId,
		createdDateTime : addDate,
        recSlaveId : recSlaveId,
        callfrom   : callfrom,
        masterReceiptId : masterReceiptId,
        subservicesname : subservicesname,
        urgentflag : "N",
        sponsorId  : sponsorId,
        chargesSlaveId : chargesSlaveId,
        otherRate : otherRate,
        otherAmount : otherAmount,
        otherCoPay : otherCoPay,
        otherPay : otherPay,
        otherConcession : otherConcession,
        concessionOnPerc : concessionOnPerc,
        iscombination : iscombination,
        receiptOf  :  receiptOf,
        narrationid : narrationid,
        narrationidBill : narrationidBill,
        accountStatusOpdDiagno : "N",
   		emrPer          : emrPer,
        sndToLabFlag : sndToLabFlag,
		sndToRisFlag:sendToRisId,
		drdeskflag : drdeskflag
  
	});
	
	serviceDetails = JSON.stringify(serviceDetails);
	
	var inputs = [];
	inputs.push("serviceDetails="+ encodeURIComponent(serviceDetails));
	inputs.push("queryType="+ queryType);
	inputs.push("module="+ module);
	inputs.push("callfrom="+ callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfbill/saveCpoe",
		error 	: function() {
					alert('Network Issue!!!');
		  		},
		success : function(r) {
			
			if (r ==1 && queryType == 'insert') {
				
				alertify.success("Service assign Successfully");
				
			} else if (r ==2 && queryType == 'update') {
				
				alertify.success("Service Update Successfully");
				
			}else if (r ==3) {
				
				alert("Package is Not Configure Please Configure package!");
				return false;
			}
			else if(r ==4){
				
				var con = confirm("Package is not configure for sponsor. Do you want Default Package?");
				if (con == true) {
					
					$("#SponsorsourceTypeId").val(0);
					$("#chargesSlaveId").val(0);
					saveServiceToPatient('general');
					
				}else{
					
					var sponsorid2=$("#sponsorid2").val();
					var chargesSlaveId2=$("#chargesSlaveId2").val();
					$("#SponsorsourceTypeId").val(sponsorid2);
					$("#chargesSlaveId").val(chargesSlaveId2);
					return false;
				}
			}else if(r ==6){
			    
				alert("Package is out of Date Can't save!!!!");
			    
			}else if(r ==21){
			    
				alertify.success("Duplicate Radiation Test Cannot Be Added !!!");
			}
			
			getIvfPatientBillAmount(treatmentId);		
			calculatePerticularTotal1();	
		}	
	});

	clearAllFieldsOfOpd();
	$("#chargesfromConf").val("0");					
	$("#defchargesfromConf").val("0");
	$("#perticular").removeAttr('readonly');
	$("#pay").removeAttr('readonly');
	$("#coPay").removeAttr('readonly');
	$("#concession").removeAttr('readonly');
	$("#qty").removeAttr('readonly');
	
	$("#narration").val('');
	$('#narrationid').val('');
	$('#receiptOf').val('general');
	stActiveTab();
}

function ivfResetAll(callFrom){
	setTimeout(function() {			
		$('#perticular').focus();
		$('#perticularIpdSponsor').focus();
		$('#perticularOpdSponsor').focus();
	}, 30);
	//for receipt edit from sponsor tab
	$("#receiptEditSponsor").val(callFrom); 

	$("#trDisc").hide();	
	$("#trDiscAmt").hide();
	//$("#discAuth").hide();	
	$("#discNarrtn").hide();
	//$("#discRemark").hide(); 
	
	$("#txtDiscRemk").val("");
	$("#recId").val(0);
	$("#payable").val(0);
	$("#discount").val(0);
	$("#discountAmt").val(0);		
	$("#payNow").val(0);		
	$("#batchnumber").val(0);	
	$("#newBatchNumber").val(0);	
	$("#payMode").val(1);
	
	$('#headerTable').find('.member').hide();  
	$('#headerTable').find('.member2').hide(); 
	$('#headerTable').find('.member3').hide(); 
	//$(".openAllSlave").trigger('click');
	var trId=$("#treatmentId").text();
	var departmentId   = $("#depdocdeskid").val();	
	var c=$("#preId").val();		
			
	if(callFrom=="general"){
		
		//getPatientBillAmount(trId,"general");
		if(c=="treatclose"){
			
			getPatientPreviousBillAmount(trId,"general");
		}else{
			
			getPatientBillAmount(trId,"general");
		}
				
		$("#receiptOf").val("general");
		
	}else if(callFrom=="cghs"){
		
		if(c=="treatclose"){
			
				getPatientPreviousBillAmount(trId,"cghs");
				getOpdServiceDetailsForCghs(trId,departmentId);
		}else{
			
			getPatientBillAmount(trId,"cghs");
			getOpdServiceDetailsForCghs(trId,departmentId);
			
		}		
		
		$("#receiptOf").val("cghs");
		
	}else{
					
		if(c=="treatclose"){
			
			getPatientSponsorOpdSponsorBillAmount(trId,"sponsor");
		}else{
			
			getPatientBillAmountForSponsor(trId);
		}
	
		$("#receiptOf").val("sponsor");
	}
	
	if(callFrom=="cghs"){
		
		$("#btnPayNow").prop("disabled","true");
	}else{
		
		$("#btnPayNow").removeAttr("disabled");
	}
	//getBillReceiptDetails('allForChk');	
	var uiMode=$("#uiMode").val();
	
	if(uiMode=="P"){
		
		getIvfBillReceiptDetails('all');
		getBillAmountDetails(callFrom);
		/*getBillRefundDetails("refund");
		getBillReceiptDetails('all');*/				
		//setTotalPaid(callFrom,-1);
		//getCommonAdvc();		
		//fetchAuthorisedBy();		
		//fetchAllReceiptTotals("opd"); 
		/*fetchPrevPending("onload");
		getAllPayments();
		getAllNarrations();*/			
		setTimeout(function(){userAccess();},300);
	}	
	$(".openAllSlave").trigger('click');
}

function getIvfPatientBillAmount(r,callFrom) {
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/ivfbill/fetchPatientBillAmount",
		success : function(r) {
						
			setIvfBillDetailsTemp(r,callFrom);		
			$('#amount').attr('readonly', 'true');
			$("#concessionOnPerc").val(0);				
		}
	});
}

var totAmt=0;
function setIvfBillDetailsTemp(r,callFrom){
	
	
	var setBill="";
	var totAmt=0;
	
	var totqyt=0;
	var treatmentId=$('#treatmentId').text();
	var pharmaId=$("#pharmacyInvoice").val();
	
	for ( var i = 0; i < r.listBillNobleDto.length; i++) {
		
		if(r.listBillNobleDto[i].serviceId==1){
			totqyt=totqyt + 1;
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'
			+	'<input type="checkbox" onclick="setIvfSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+ r.listBillNobleDto[i].serviceId+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'
			+	'<td style="display:none;"><input type="hidden" id="regBillId" value="'+ r.listBillNobleDto[i].billDetailsId +'"> </td>'

			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillNobleDto[i].serviceName +'</div>'	
			
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'			
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			+	'<td><div class="text-center">1</div></td>'
			+ 	'<td>'
			+	'<div class="text-right mainAddedInTotal" id="tamt'+(r.listBillNobleDto[i].serviceId)+'">' + (r.listBillNobleDto[i].amount).toFixed(2) +'</div></td>'
			
			+	'<td  class="text-center"><a style="cursor:pointer;display:none;"> '
            +		'<button class="btn btn-xs btn-success editUserAccess" ' 
            +'  	onclick=printOpdServiceWise('+treatmentId+',\'general\',\'No\','+ r.listBillNobleDto[i].serviceId +') '
            +'		value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			+	'</tr>';
						
			totAmt=totAmt+r.listBillNobleDto[i].amount;
						
		}else if (r.listBillNobleDto[i].serviceId == 3) {
			setBill = setBill

			+ '<tr>'
			+ '<td class="only-checkbox" >'
			+ '<input type="checkbox" onclick="setSlaveChk('
			+ (r.listBillNobleDto[i].serviceId)
			+ ')" checked=checked id="chkOpdBillReg'
			+ r.listBillNobleDto[i].serviceId
			+ '" name="opdBillCheckboxReg" value="'
			+ r.listBillNobleDto[i].serviceId
			+ '">'
			+ '</td>'
			+ '<td>'
			+ '<div class="text-left">'
			+ '<div class="panel-group" id="accordion">'
			+ '<div class="panel">'
			+ '<div class="panel-heading">'
			+ '<h3 class="panel-title">'
			+ '<a class="accordion-toggle openAllSlaveIpd" data-toggle="collapse"data-parent="#accordion" href="#collapseCghsTwo'
			+ i + '" onclick="getIvfBedDetails(' + treatmentId + ','
			+ r.listBillNobleDto[i].serviceId + ')">'
			+ '<div class="row">' + '<div class="col-md-10">'
			+ r.listBillNobleDto[i].serviceName + '</div>'
			+ '<div class="col-md-1">'
			+ '<i class="fa fa-chevron-down" id="list' + i + '"></i>'
			+ '</div>' + '</div>' + '</a>' + '</h3>' + '</div>'

			+ '<div id="collapseCghsTwo' + i
			+ '" class="panel-collapse collapse">'
			+ '<div class="panel-body">'
			+ '<table class="table table-hover">' + '<thead>' + '<tr>'
			+ '<th class="only-checkbox">#</th>'
			+ '<th>Bed + Hall</th>'

			/* + '<th>Doc Name</th>' */

			+ '<th>' + '<div class="text-center">Rate</div>' + '</th>'

			+ '<th>' + '<div class="text-center">Qty</div>' + '</th>'

			/*
			 * + '<th>' + '<div class="text-center">Disc</div>' + '</th>'
			 *  + '<th>' + '<div class="text-center">Disc %</div>' + '</th>'
			 */
			+ '<th>' + '<div class="text-center">Amount</div>'
			+ '</th>';
	var concessionFlow = $('#concessionFlow').val();

	if (concessionFlow == "on") {
		setBill = setBill + '<th>'
				+ '<div class="text-center">Disc</div>' + '</th>'

				+ '<th>' + '<div class="text-center">Disc Per%</div>'
				+ '</th>';
	} else {
		setBill = setBill + '<th style="display:none">'
				+ '<div class="text-center">Disc</div>' + '</th>'

				+ '<th style="display:none">'
				+ '<div class="text-center">Disc Per%</div>' + '</th>';
	}
	setBill = setBill

	/* + '<th>' + '<div class="text-center">Pay</div>' + '</th>' */

	+ '<th>' + '<div class="text-center">Co-Pay</div>' + '</th>'

	+ '<th>' + '<div class="text-right">Date</div>' + '</th>'
			+ '<th class="only-checkbox">Edit</th>'
			+ '<th class="only-checkbox">Cancel</th>'

			+ '<th class="only-checkbox">ChB</th>'

			+ '</tr>' + '</thead>'

			+ '<tbody id="bedData">'

			+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
			+ '</div>' + '</div>' + '</td>'
			+ '<td><div class="text-center"> '
			+ r.listBillNobleDto[i].serviceCount + '</div></td>'
			+ '<td>' + '<div class="text-right">'
			+ (r.listBillNobleDto[i].amount).toFixed(2)
			+ '</div></td>'

			+ '<td  class="text-center" ><a style="cursor:pointer;"> '
			+ '<button class="btn btn-xs btn-success editUserAccess" '
			+ '  onclick=printIpdServiceWise(' + treatmentId
			+ ',\'general\',\'No\',' + r.listBillNobleDto[i].serviceId
			+ ') '
			+ 'value="EDIT"><i class="fa fa-print"  id=btnServWise'
			+ r.listBillNobleDto[i].serviceId
			+ '></i></button></a> </td>'

			+ '</tr>';

	totqyt = totqyt + r.listBillNobleDto[i].serviceCount;
	totAmt = totAmt + r.listBillNobleDto[i].amount;
  }else if(r.listBillNobleDto[i].serviceId == pharmaId){
			
		}else{
					
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'// added by vinod
			+	'<input type="checkbox" onclick="setIvfSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+(r.listBillNobleDto[i].serviceId)+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'// added by vinod
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'+i+'" onclick="getIvfSubServiceDetails1('+i+','+treatmentId+','+ r.listBillNobleDto[i].serviceId +')">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillNobleDto[i].serviceName +'</div>'			
			+ 	'<div class="col-md-1">'
			+ 	'<i class="fa fa-chevron-down" id="list'+i+'"></i>'
			+	'</div>'
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'
			+	'<div id="collapseCghsTwo'+i+'" class="panel-collapse collapse">'
			+	'<div class="panel-body">'
			+	'<table class="table table-hover">'
			+	'<thead>'
			+	'<tr>'
			+	'<th class="only-checkbox">#</th>'
			+	'<th>SubService Name</th>'
			
			+	'<th>Doc Name</th>'
			
			+	'<th>'
			+	'<div class="text-center">Rate</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-center">Qty</div>'
			+	'</th>';
			
			var concessionFlow=$('#concessionFlow').val();			
			
			if(concessionFlow == "on"){
				setBill=setBill
				+	'<th>'
				+	'<div class="text-center">Disc</div>'
				+	'</th>'
				
				+	'<th>'
				+	'<div class="text-center">Disc Per%</div>'
				+	'</th>';
			}else{
				setBill=setBill
				+	'<th style="display:none">'
				+	'<div style="display:none;" class="text-center">Disc</div>'
				+	'</th>'
				
				+	'<th style="display:none">'
				+	'<div style="display:none;" class="text-center">Disc Per%</div>'
				+	'</th>';
			}
			
			setBill=setBill
			+	'<th>'
			+	'<div class="text-center">Amount</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-center">Co-Pay</div>'
			+	'</th>'
						
			+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'
			+	'<th class="only-checkbox">Edit</th>'
			+	'<th class="only-checkbox">Cancel</th>';
			
			if(r.listBillNobleDto[i].isCombination=='Y') {
			
				setBill=setBill	+ '<th class="only-checkbox">Pkg</th>';
			}
		
			setBill=setBill	
			+	'<th class="only-checkbox">ChB</th>'
					
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceData'+i+'">'
			
			+	'</tbody>'
			+	'</table>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			+	'<td><div class="text-center"> '+ r.listBillNobleDto[i].serviceCount +'</div></td>'
			+ 	'<td>'// added by vinod
			+	'<div id="tamt'+(r.listBillNobleDto[i].serviceId)+'" class="text-right">' + (r.listBillNobleDto[i].amount).toFixed(2) +'</div></td>'
			
			+	'<td  class="text-center" ><a style="cursor:pointer;"> '
            +'<button class="btn btn-xs btn-success editUserAccess" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'general\',\'No\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			+	'</tr>';// added by vinod	
			
			totqyt=totqyt+ r.listBillNobleDto[i].serviceCount;
			totAmt=totAmt+r.listBillNobleDto[i].amount;
		}
	}
	
	if(callFrom == "cghs"){
		
		$("#totalQtty").text(totqyt);
		$("#totalAmmt").text((totAmt).toFixed(2));
		$("#cghsBill").html(setBill);
		
	} else{
		
		$("#totalQty").text(totqyt);
		$("#totalAmt").text((totAmt).toFixed(2));
		$("#totAmt").text((totAmt).toFixed(2));
		$("#billDetails").html(setBill);
	}
}

function getIvfSubServiceDetails1(i,t,s) {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		url : "ehat/ivfbill/getPatientServiceBill",
		success : function(r) {
				
			getSubServiceDetailsTemp1(i,r,s);			
		}
	});
}

function getSubServiceDetailsTemp1(j,t,s) {
	
	var setService="";
		
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		var a=1+i;
		
		var datetime12= new Date(t.listBillNobleServiceDto[i].createdDate).toLocaleDateString('en-GB');
		var dname= t.listBillNobleServiceDto[i].docName;
		var osid = t.listBillNobleServiceDto[i].serviceId;
		var netAmt=Number(t.listBillNobleServiceDto[i].amount)-Number(t.listBillNobleServiceDto[i].concession);
		var cghsCode = "("+t.listBillNobleServiceDto[i].cghsCode+")";
		if(cghsCode == "" || cghsCode == "-" || cghsCode=="()" || cghsCode=="(-)" || cghsCode=="(null)"){
			cghsCode="";
		}
		if(dname==null){
			
			dname="-";
		}
		
		if(t.listBillNobleServiceDto[i].paidByCashFlag == "Y"){
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y") || (t.listBillNobleServiceDto[i].cancle =="Y") || t.listBillNobleServiceDto[i].isModify=="N")
			{
				setService = setService + '<tr bgcolor="lightblue" id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">';
			}else
			{		
				setService = setService + '<tr bgcolor="lightblue" id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">';

			}
		}else{
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y") || (t.listBillNobleServiceDto[i].cancle =="Y") || t.listBillNobleServiceDto[i].isModify=="N")
			{
				setService = setService + '<tr id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">';
			}else
			{		
				setService = setService + '<tr onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">';

			}
		}
		
		setService=setService
			
		+ '<td style="display:none;" id="row'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'
			
		
		+	'<td> '+ a +' </td>'
		+	'<td style="display:none;" id="bdId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>';

		

			if (osid == 14) {

				setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ t.listBillNobleServiceDto[i].invName + cghsCode+' </td>';
			}else if (osid==11 || osid==13){//Added by laxman for sended lab test coloe change.
				if((t.listBillNobleServiceDto[i].sndtolabflag)=="Y"){
					setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: green;"> '
					+ t.listBillNobleServiceDto[i].categoryName + cghsCode+' </td>';
				}else{
				setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ t.listBillNobleServiceDto[i].categoryName + cghsCode+' </td>';
				}
			
			}//code By Sanjay on 26-03-2018 for changes the testname color when it sent to RIS
			else if (osid==12){
				if((t.listBillNobleServiceDto[i].sndtorisflag)=="Y"){
					setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: #00bfff;"> '
					+ t.listBillNobleServiceDto[i].categoryName + cghsCode+' </td>';
				}else{
				setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ t.listBillNobleServiceDto[i].categoryName + cghsCode+' </td>';
				}
			
			}else if (osid == 16) {
				
				setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ t.listBillNobleServiceDto[i].pharmaName + ' </td>';
			}
			else {
				setService = setService + '<td id="catName'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].categoryName + cghsCode+' </td>';
			}

		setService = setService
		
		+	'<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ dname+' </td>'
		
		+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].subServiceId+' </td>'
		
		+	'<td style="display:none;" id="dId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'
		
		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
						
		+	'<td style="display:none;" id="amt'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].amount+' </td>'
		
		+	'<td style="display:none;" id="isCombination'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isCombination+' </td>'
		
		+	'<td style="display:none;" id="emrP'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].emrPer+' </td>'
		
		+	'<td style="display:none;" id="othRates'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherRate +' </td>'
		
		+	'<td style="display:none;" id="sndtolabflag'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtolabflag+' </td>'
		// added by vinod
		+	'<td style="display:none;" id="sendToRisId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtorisflag +' </td>';
		//Code  by Sanjay
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService +'<td style="display:none;"> '
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ t.listBillNobleServiceDto[i].charges +'</div>'
			+	'</td>'
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
			+	'</td>';
		
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
				+	'</td>';
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}			
			
		}// added by vinod
						
		if(t.listBillNobleServiceDto[i].paidByCashFlag == "Y"){
			setService = setService + '<td id="q'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].quantity +'</div>'
			+	'</td>';
			
			var concessionFlow=$('#concessionFlow').val();
			if(concessionFlow == "on"){
				setService = setService
				+	'<td id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concession).toFixed(2) +'</div>'
				+	'</td>'
				
				+	'<td id="consPerc'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
				+	'</td>';
			}else{
				setService = setService
				+	'<td style="display:none;" id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concession).toFixed(2) +'</div>'
				+	'</td>'
				
				+	'<td style="display:none;" id="consPerc'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
				+	'</td>';
				
			}
			
			setService = setService
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].amount).toFixed(2) +'</div>'
			+	'</td>'
									
			+	'<td id="cP'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td id="dateSub'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-right" id="dateSubservice">'+ datetime12 +'</div>';
			setService = setService +	'</td>';
			
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
				
				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				
			}else{
				
				if (t.listBillNobleServiceDto[i].cancle =="Y" || t.listBillNobleServiceDto[i].isModify=="N") {
					setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				}else{
					setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				}
			}	
					
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
				
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				
			}else{
				
				if (t.listBillNobleServiceDto[i].cancle =="Y") {
					setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}	
			
			if(t.listBillNobleServiceDto[i].isCombination=='Y')
			{
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" id=packBtnClr'+t.listBillNobleServiceDto[i].billDetailsId+' data-toggle="modal" data-target="#pack"  onclick="getPackagedataforOpd('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			//Added By BILAL For pring of Package
			  if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
					
					setService = setService +'<td class="col-md-1 center" ><a style="cursor:pointer;"> '
				                            +'<button class="btn btn-xs btn-success editUserAccess" ' 
				                            +'  onclick="printopdpackage('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" '
				                            +'value="EDIT"><i class="fa fa-print"  id=btnpack'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
		        }
			}
			
			
			setService = setService +	'<td class="only-checkbox" >';
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N" && t.listBillNobleServiceDto[i].cancle=="N"){
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
				
			}else{
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
			}	
		}else{
			setService = setService + '<td id="q'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].quantity +'</div>'
			+	'</td>';
			
			var concessionFlow=$('#concessionFlow').val();
			if(concessionFlow == "on"){
				setService = setService
				+	'<td id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concession).toFixed(2) +'</div>'
				+	'</td>'
				
				+	'<td id="consPerc'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
				+	'</td>';
			}else{
				setService = setService
				+	'<td style="display:none;" id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concession).toFixed(2) +'</div>'
				+	'</td>'
				
				+	'<td style="display:none;" id="consPerc'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
				+	'</td>';
				
			}
			
			setService = setService
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].amount).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td id="cP'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td id="dateSub'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-right" id="dateSubservice">'+ datetime12 +'</div>';
			setService = setService +	'</td>';
			
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
				
				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				
			}else{
				
				if (t.listBillNobleServiceDto[i].cancle =="Y" || t.listBillNobleServiceDto[i].isModify=="N") {
					setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				}else{
					setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				}
			}	
					
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
				
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				
			}else{
				
				if (t.listBillNobleServiceDto[i].cancle =="Y") {
					setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}	
			
			if(t.listBillNobleServiceDto[i].isCombination=='Y')
			{
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" id=packBtnClr'+t.listBillNobleServiceDto[i].billDetailsId+' data-toggle="modal" data-target="#pack"  onclick="getPackagedataforOpd('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			//Added By BILAL For pring of Package
			  if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
					
					setService = setService +'<td class="col-md-1 center" ><a style="cursor:pointer;"> '
				                            +'<button class="btn btn-xs btn-success editUserAccess" ' 
				                            +'  onclick="printopdpackage('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" '
				                            +'value="EDIT"><i class="fa fa-print"  id=btnpack'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
		        }
			}			
			
			setService = setService +	'<td class="only-checkbox" >';
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N" && t.listBillNobleServiceDto[i].cancle=="N"){
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" checked=checked id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
				
			}else{
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" disabled id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
			}
		}		
				
		setService = setService +	'</td>';
		
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';			
	}
	$("#serviceData"+j).html(setService);
}


function setIvfSlaveChk(id){
	
	var payable=$("#payable").val();
	
    if(($('#chkOpdBillReg'+id).prop("checked") == true)){
    	   	
    	if(id==1){
    		
    		$('#tamt1').removeClass("mainNotInTotal");
        	$('#tamt1').addClass("mainAddedInTotal");
    	}
    	
    	$('input[class=billSlaveChk'+id+']:checked').each(function(){
			
			var mstId=$(this).val();			
			var amt=$("#tAmtSlave"+mstId).val();
			payable=Number(payable)-Number(amt);
			
		});
    	
		$('input[class=billSlaveChk'+id+']').each(function(){
					
			var mstId=$(this).val();			
				
			if(! $('#chkOpdBill'+mstId).is(':disabled')){
		    		
				$('#chkOpdBill'+mstId).prop('checked', true);  
		    }				
		});
    	  	     	
		setIvfTotalPaid("general",id);
    	var ifCurPayable=$("#payable").val();    	
    	payable=Number(payable)+Number(ifCurPayable);
    
    }else{
    	
    	if(id==1){
    		
    		$('#tamt1').removeClass("mainAddedInTotal");
        	$('#tamt1').addClass("mainNotInTotal");
    	}
    	
    	$('.billSlaveChk'+id).removeAttr("checked");    	
    	setIvfTotalPaid("general",id);
    	var elseCurPayable=$("#payable").val();
    	payable=Number(payable)-Number(elseCurPayable);
    
    }	    
    $("#payable").val(parseFloat(payable).toFixed(2));
    $("#payNow").val(parseFloat(payable).toFixed(2));
}
/************
* @author	: Vinod Udawant
* @date		: 26-July-2017
* @codeFor	: Set Total Payable
 ************/
function setIvfTotalPaid(callFrom,serviceId) {

	var sId=serviceId;
	var treatmentId	= $("#treatmentId").text();  
	var billId		= $("#billNo").text(); 
	var unitId = $("#unitId").val();
	var userId = parseInt($("#userId").val());	
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());	
	var depId= 1;
	
	jQuery.ajax({
		async	: false,
		type	: "POST",	
		data : {
			"treatmentId" : parseInt(treatmentId),
			"billId" : parseInt(billId),
			"serviceId" : parseInt(sId),
			"callFrom" : callFrom,
			"depId" : parseInt(depId),
			"unitId" : parseInt(unitId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			"userId" : parseInt(userId)
		},
		url 	: "ehat/ivfbill/getTotalPayable",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			var totAmt=0,totCons=0,totPayable=0;
		
			for(var inx=0;inx<r.listBillDetails.length;inx++){
				
				var servId=r.listBillDetails[inx].serviceId;
				
				if(callFrom=="sponsor"){
					
					totAmt=totAmt+r.listBillDetails[inx].otherAmount;
					totCons=totCons+r.listBillDetails[inx].otherConcession;
				}else{
					
					totAmt=totAmt+r.listBillDetails[inx].amount;
					totCons=totCons+r.listBillDetails[inx].concession;	
				}
				
				if(sId==-1){
					
					$("#chkOpdBillReg"+servId).removeAttr("disabled");
					$("#chkOpdBillReg"+servId).prop("checked","checked");
				}			
			}		
				
			totPayable=totAmt-totCons;
			$("#payable").val(parseFloat(totPayable).toFixed(2));	
			$("#payNow").val(parseFloat(totPayable).toFixed(2));	
		}
	});
};

/************
* @author	: Vinod Udawant
* @date		: 08-Nov-2017
* @codeFor	: Get all total amounts
 ************/
function fetchAllIvfReceiptTotals(callFrom) {	
	
	var unitId		= parseInt($("#unitId").val());
	var userId		= parseInt($("#userId").val());	
	var treatmentId	= parseInt($("#treatmentId").text());	
	var sponsorCatId= $("#chargesSlaveId").val();	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("sponsorId=" + sponsorCatId);
	inputs.push("createdBy=" + userId);
	inputs.push("callFrom=" + callFrom);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",		
		url 	: "ehat/ivfbill/fetchAllReceiptTotals",
		error 	: function() {
					alert('Network Issue!!!');
				  },
		success : function(r) {
			
			var otherwise=parseFloat(0.00).toFixed(2);
			var finalBillTotal=parseFloat(r.actualAmt).toFixed(2);			
			var grandTotal=parseFloat(r.actualAmt).toFixed(2);		
			var conTotal=parseFloat(r.actualTotConcn).toFixed(2);		
			var finalDiscount=parseFloat(r.totalDisc).toFixed(2);		
			var finalPaid=parseFloat(r.totalPaid).toFixed(2);		
			var finalRefund=parseFloat(r.refundAmt).toFixed(2);		
			var paidBySponsor=parseFloat(r.totalSonsorAmt).toFixed(2);		
			
			if(finalBillTotal<=0 || isNaN(finalBillTotal)){
				
				finalBillTotal=otherwise;
			}
			
			if(grandTotal<=0 || isNaN(grandTotal)){
				
				grandTotal=otherwise;
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
			
			var remain=Number(finalBillTotal)-(Number(finalDiscount)+Number(finalPaid)+Number(conTotal)+Number(paidBySponsor));
			
			if(remain<=0 || isNaN(remain)){
				
				remain=otherwise;
			}
			
			if(conTotal<=0 || isNaN(conTotal)){
				
				conTotal=otherwise;
			}
			
			finalNetAmt=Number(finalBillTotal)-(Number(finalDiscount)+Number(conTotal));
			finalNetAmt=parseFloat(finalNetAmt).toFixed(2);
			
			if(finalNetAmt<=0 || isNaN(finalNetAmt)){
				
				finalNetAmt=otherwise;
			}
			
			$("#grandTotal").html(grandTotal);
			$("#conTotal").html(conTotal);	
			$("#finalDiscount").html(finalDiscount);
			$("#finalBillTotal").html(finalNetAmt);		
			$("#finalPaid").html(finalPaid);
			$("#paidBySponsor").html(paidBySponsor);
			$("#finalRefund").html(finalRefund);
			$("#finalRemain").html(parseFloat(remain).toFixed(2));					
		}
	});
}


/************
* @author	: Vinod Udawant
* @date		: 16-June-2017
* @codeFor	: Save ehat bill details
 ************/
function saveIvfBillDetails(callFrom) {

	var payNowConf = parseFloat($("#payNow").val());
	
	var r = confirm("Are You Sure You Want To Pay Amount :"+payNowConf);
	if (r == true) {
	var unitId		= parseInt($("#unitId").val());
	var userId		= parseInt($("#userId").val());	
	var refDocId	= 0;	
	var treatmentId	= 0;
	var subservIdsChecked=""; 
	$('input[name=opdBillCheckbox]:checked').each(function(){
				
		var bilDetId	=  parseInt($(this).val());
		
		//getting service id
		var serviceId 		= parseInt($("#sId"+bilDetId).text());
		if(serviceId == 12){//Checking whether test is of Investigation type or not 
			
		//getting sub service id
		 subservIdsChecked=subservIdsChecked+","+$(this).val();
		}		
	});
	
	var pendingFlag = $("#pendingFlag").val();
	if(pendingFlag=="Y"){
		
		treatmentId = $("#pendingTreatId").val();
	}else{
		
		treatmentId = parseInt($("#treatmentId").text()); 
	}
	
	var payable		= parseFloat($("#payable").val());
	var discount	= parseFloat($("#discount").val()); 
	var discountAmt	= parseFloat($("#discountAmt").val()); 
	var disAuth		= parseInt($("#discAuthSel").val()); 
	var disNarrtn	= $("#narrSel").val(); 	
	var disRemark	= $("#txtDiscRemk").val(); 	
	var payNow		= parseFloat($("#payNow").val());
	var payMode		= $("#payMode").val();
	var bnumber		= "";
	var batchNo		= "";
	var bName		= "";
	var againstId	= $("#recId").val();
	var sourceCatId	= $("#SponsorsourceTypeId").val();
	var sponsorCatId= $("#chargesSlaveId").val();	
	var receiptOf= $("#receiptOf").val();	
	
	var payeeSprlastId=0;
	var payeeSprMainId=0;
	var payeeTypeId= $("#payee").val();	
	if(payeeTypeId==2){
		
		var size=$("#dynamicItems li").length;
		payeeSprlastId=$("#lis" + (size - 1)).val();
		payeeSprMainId=$("#lis0").val();
	}
	
	callFrom= $("#callFromForSave").val();
		
	var paidByCashFlag = $("#paidByCashFlag").val();	
	var paidByCashServices = $("#paidByCashServices").val();	
	
	if(paidByCashFlag == "N"){
		
		if(sponsorCatId>0){

			if(receiptOf != "sponsor"){
				
				alert("Please pay amount from sponsor tab");
				return false;
			}
		}
	}
	
	var multiPayDetails = {
			listMultiBillReceiptMaster : []
    };
	
	if(payMode==2 || payMode==3){
		
		if(payMode==2){
			
			bnumber= $("#cardnumber").val();
		}
		
		if(payMode==3){
			
			bnumber= $("#chequenumber").val();
		}
		
		bName= $("#bankID").val();
		batchNo= $("#newBatchNumber").val();
				
	}else if(payMode==-1){
				
		var rows= $('#multiPayTable tbody tr.multiPayClass').length;
		for(var i=1;i<=rows;i++){
						
			var payModePop=$("#payMode"+i).val();
			var bankId=$("#bankID"+i).val();
			var bNum=$("#txtbankNo"+i).val();			
			var batchNum=$("#txtaccNo"+i).val();			
			var amt=$("#txtAmount"+i).val();		
			setReceiptList(multiPayDetails,payModePop,bankId,bNum,batchNum,amt);
		}		
		
	}else{
		
		bnumber= 0;
		bName= 0;
		batchNo=0;
	}		
	
	if(payNow > payable){
		
		alert("Amount should be less than payable");
		$("#payNow").val(0);			
		$("#discount").val(0);
		$("#discountAmt").val(0);		
		$("#payNow").focus();
		return false;
		
	}else if(payNow < 0){
		
		alert("Amount should be greater than 0");
		$("#payNow").val(0);
		$("#payNow").focus();
		return false;
		
	}else if(payNow == 0 || payNow < payable){
		
		if(disAuth==0){
			
			alert("Please Select Authorized Person");
			return false;
		}			
	}
	 
	if(discount>0){
		
		var discPayNow = Number(payNow) + Number(discountAmt);
		if(discPayNow > payable){
			
			alert("Pay now should be less than or equal to payable");
			$("#payNow").val(payable);
			$("#discount").val(0);
			$("#discountAmt").val(0);
			
			return false;
		}
		
		if(disAuth==0){
			
			alert("Please Select Authorized Person");
			return false;
		}
		if(disNarrtn==0){
			
			alert("Please Select Discount Reason");
			$("#txtDiscRemk").focus(); 	
			return false;
		}		
	}
	
	var masterIdsChecked=[]; 
	var servIdsChecked=[];
	var regBillDetId=0;
	
	if(paidByCashFlag == "Y"){
		
		$('input[name=opdBillCheckboxReg]:checked').each(function(){
			
			if($(this).val() == 1){
				
				regBillDetId = $("#regBillId").val();					
			}
		});
		
		$('input[name=opdBillCheckbox]:checked').each(function(){
			
			servIdsChecked.push($(this).val());
		});
		
	}else{
		
		$('input[name=opdBillCheckboxReg]:checked').each(function(){
			
			masterIdsChecked.push($(this).val());
			
			if($(this).val() == 1){
				
				regBillDetId = $("#regBillId").val();					
			}
		});
		
		$('input[name=opdBillCheckboxReg]:not(:checked)').each(function(){
			
			if($(this).val() == 1){
				
				regBillDetId = $("#regBillId").val();					
			}
		});

		$('input[name=opdBillCheckbox]:not(:checked)').each(function(){
					
			servIdsChecked.push($(this).val());
		});	
	}	
		
	multiPayDetails = JSON.stringify(multiPayDetails);
	
	var inputs = [];	
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("unitId=" + unitId);
	inputs.push("createdBy=" + userId);
	inputs.push("totalAmt=" + payable);	
	inputs.push("discount=" + discount);	
	inputs.push("discountAmt=" + discountAmt);	
	inputs.push("disAuth=" + disAuth);	
	inputs.push("disNarrtn=" + disNarrtn);	
	inputs.push("totalPaid=" + payNow);	
	inputs.push("masterIdsChecked=" + masterIdsChecked);
	inputs.push("servIdsChecked=" + servIdsChecked);	
	inputs.push("refDocId=" + refDocId);		
	inputs.push("payMode=" + payMode);		
	inputs.push("bNumber=" + bnumber);	
	inputs.push("batchNo=" + batchNo);	
	inputs.push("bName=" + bName);		
	inputs.push("callFrom=" + callFrom);		
	inputs.push("againstId=" + againstId);	
	inputs.push("sourceCatId=" + sourceCatId);
	inputs.push("sponsorCatId=" + sponsorCatId);	
	inputs.push("multiPayDetails=" + multiPayDetails);	
	inputs.push("receiptOf=" + receiptOf);
	inputs.push("payeeTypeId=" + payeeTypeId);
	inputs.push("payeeSprMainId=" + payeeSprMainId);
	inputs.push("payeeSprlastId=" + payeeSprlastId);
	inputs.push("disRemark=" + disRemark);
	inputs.push("regBillDetId=" + regBillDetId);
	inputs.push("paidByCashFlag=" + paidByCashFlag);
	inputs.push("paidByCashServices=" + paidByCashServices);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",		
		url 	: "ehat/ivfbill/saveBillDetails",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			if(r>0){
				
				resetMultiPopup();				
				alertify.success("Receipt generated succesfully");
				
				var chargesSlaveId = $("#chargesSlaveId").val();
				if(chargesSlaveId > 0){
					
					sendToPhlebotomyFromSaveSponsor(0);
				}else{
					
					sendToPhlebotomyFromSave(0);
				}
				
				receiptIvfBillPrint("receipt",r,"");
				
				paidTestSendToRis(subservIdsChecked,treatmentId);
				paidTestSenToRadiation(subservIdsChecked,treatmentId);
				
			}else if(r==-2){
				
				alert("Common advance not enough to pay bill...");
			}else{
				
				alertify.error("Network issue");
			}			
			ivfResetAll(receiptOf);
			$("#paidByCashFlag").val('N');
			$("#paidByCashServices").val('0');
			$("#txtDiscRemk").val("");
		}
		});
	}
	
};

function setReceiptList(multiPayDetails,payMode,bankName,bNumber,batchNum,amt){
	
	multiPayDetails.listMultiBillReceiptMaster.push({
		payMode	  : payMode,
		bName	  : bankName,
		bNumber	  : bNumber,
		batchNumber	: batchNum,
		totalPaid : amt
    });
}

function receiptIvfBillPrint(callFrom,recId){

    //var billId=$("#billNo").text();
	var billId=$("#billId").text();    
    var treatId=$("#treatmentId").text();
    var patId=$("#patientId").text();
    var deptId = $("#deptid").val();
    var pendFlag = $("#pendingFlag").val();
    var meeshaFlow = $("#meeshaFlow").val();   
   
    if(recId==-5){
       
        recId=$("#recId").val();
    }
    if(callFrom=="receipt"){
       
        if(deptId==1){
           
        	window.open("ivf_ehat_opd_receipt.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag);
           
        }else if(deptId==3){
           
        	window.open("ivf_ehat_digno_receipt.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag);
        }
       
    }else{
       
        if(deptId==1){
           
        	window.open("ivf_ehat_opd_refund.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"");
           
        }else if(deptId==3){
           
        	window.open("ivf_ehat_digno_refund.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"");
        }       
    }   
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
function getIvfBillReceiptDetails(callFrom) {

	var treatmentId	= $("#treatmentId").text();  
	var billId		= $("#billNo").text();
	var receiptOf= $("#receiptOf").val();	
	var userId = parseInt($("#userId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());	
	
	jQuery.ajax({
		async	: false,
		type	: "POST",		
		data 	: { "treatmentId" : parseInt(treatmentId),"billId" : parseInt(billId), "callFrom" : callFrom, "receiptOf" : receiptOf, "userId" : userId, "chargesSlaveId" : chargesSlaveId  },
		url 	: "ehat/ivfbill/getBillReceiptDetails",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			if(callFrom=="allForChk"){
				
				disableSevices(r);				
			}else{
				
				if(callFrom=="deleted"){
					setIvfDeletedReceiptTemplate(r,callFrom);
				}else{
					
					setIvfReceiptTemplate(r,callFrom);				
					disableSevices(r);
				}	
			}	
			
			$("#trRefPer").hide();
		}
	});
};

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Set receipt master template
 ************/
function setIvfReceiptTemplate(res,callFrom){
	
	var prevPaid=0;
	$("#btnRefund").prop('disabled','true');
		
	var recPrefix=$("#recPrefix").val();
	var recMiddle=$("#recMiddle").val();
	var recSufix=$("#recSufix").val();
	var result = "";
	
	if(callFrom=="refundable"){		
		
			$("#btnPayNow").prop("disabled","true");
			$("#trDisc").hide();	
			$("#discAuth").hide();	
			$("#discNarrtn").hide();
			$("#refAuth").show();	
			$("#discRemark").hide();	
			$("#refRemark").show();			
			
			result = ' <table class="table table-hover" id="receipts"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Receipt Id</th> '
			+ '			<th>Amount</th> '
			+ '			<th>Paid</th> '
			+ '			<th>Discount</th> '
			+ '			<th>Refund</th> '
			+ '			<th>Refundable</th> '
			+ '			<th>Date</th> '
			+ '			<th>Details</th> '
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody> ';
				
			for(var i=0;i<res.listBillReceiptMaster.length;i++){
				
				var recId=res.listBillReceiptMaster[i].billReceiptId;
				var recCount=res.listBillReceiptMaster[i].receiptCount;
				var totalAmt=parseFloat(res.listBillReceiptMaster[i].totalAmt).toFixed(2);
				var totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);		
				var refAmt=parseFloat(res.listBillReceiptMaster[i].refundAmt).toFixed(2);
				var totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
				var remainAmt=parseFloat(Number(totAmt)-Number(refAmt)).toFixed(2);
				var datetime= new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
				
				recCount = recPrefix + recMiddle + recCount + recSufix;
				
				result=result
				  + '<tr> '
				  + '	<td>'+(i+1)+'</td> '
				  + '	<td>'+recCount+'</td> '
				  + '	<td>'+totalAmt+'</td> '
				  + '	<td>'+totAmt+'</td> '
				  + '	<td>'+totDisc+'</td> '
				  + '	<td>'+refAmt+'</td> '
				  + '	<td>'+remainAmt+'</td> '
				  + '	<td>'+datetime+'</td> '
				  + '	<td>';
				 
				if(remainAmt<=0){
					
					result=result	+ '   <button disabled onclick="setCreditPayble('+remainAmt+','+recCount+',\'refund\')"><i class="fa fa-credit-card"></i></button> ';
				}else{
					
					result=result	+ '   <button onclick="setCreditPayble('+remainAmt+','+recCount+',\'refund\')"><i class="fa fa-credit-card"></i></button> ';
				}		
				  
				  + '	</td>'
				  + '</tr> ';
			}
				
			result=result
			+ '	</tbody> '
			+ '</table> ';		
	
	}else{	
			
		$("#btnPayNow").removeAttr('disabled');
		$("#refAuth").hide();	
		$("#discAuth").show();	
		$("#discRemark").show();	
		$("#refRemark").hide();		
				
		result= ' <table class="table table-hover" id="receipts"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Receipt Id</th> '
			+ '			<th>Amount</th> '
			+ '			<th>Paid</th> '
			+ '			<th>Discount</th> '
			+ '			<th>Remain</th> '
			+ '			<th>Date</th> '
			+ '			<th>Details</th> '
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody> ';
				
			for(var i=0;i<res.listBillReceiptMaster.length;i++){
				
				var recId=res.listBillReceiptMaster[i].billReceiptId;
				var recCount=res.listBillReceiptMaster[i].receiptCount;
				
				recCount = recPrefix + recMiddle + recCount + recSufix;
				
				var againId=res.listBillReceiptMaster[i].againstId;
				var totAmt=0;
				var totDisc=0;
				var remainAmt=0;
				if(againId==0){
					
					totAmt=parseFloat(res.listBillReceiptMaster[i].firstPaid).toFixed(2);	
					totDisc=parseFloat(res.listBillReceiptMaster[i].firstDisc).toFixed(2);
					remainAmt=parseFloat(res.listBillReceiptMaster[i].firstRemain).toFixed(2);	
				}else{
					
					totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);	
					totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
					remainAmt=parseFloat(res.listBillReceiptMaster[i].totalRemain).toFixed(2);	
				}
				var totalAmt=parseFloat(res.listBillReceiptMaster[i].totalAmt).toFixed(2);
				var datetime= new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
				var creditFlag=res.listBillReceiptMaster[i].creditFlag;					
				var paidByCashFlag=res.listBillReceiptMaster[i].paidByCashFlag;	
				
				if(callFrom=="all"){
					
					prevPaid=Number(prevPaid)+Number(totAmt);
					$("#prevPaid").val(prevPaid);
				}
				
				result=result
				  + '<tr> '
				  + '	<td>'+(i+1)+'</td> '
				  + '	<td>'+recCount+'</td> '
				  + '	<td>'+totalAmt+'</td> '				 
				  + '	<td>'+totAmt+'</td> '
				  + '	<td>'+totDisc+'</td> '
				  + '	<td>'+remainAmt+'</td> '
				  + '	<td>'+datetime+'</td> '				 
				  + '	<td><a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>';
				
				if(paidByCashFlag == "Y"){
									
				}else{
					
					 if(creditFlag=="Y"){
						  
						  result=result /*+ '   <button disabled onclick="hideOpdBillPanel('+recId+')"><i class="fa fa-plus"></i></button> '*/
						  				+ '   <button disabled onclick="deleteIvfMasterReceiptOPD('+recId+')"><i class="fa fa-trash-o"></i></button> ';
						    
					  }else{
						  
						  result=result /*+ '   <button onclick="hideOpdBillPanel('+recId+')"><i class="fa fa-plus"></i></button> '*/
						  				+ '   <button class="deleteUserAccess" onclick="deleteIvfMasterReceiptOPD('+recId+')"><i class="fa fa-trash-o"></i></button> ';
						  
					  }		
				}
				
				result=result  + '   <button onclick=receiptIvfBillPrint("receipt",'+recId+') data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button> ';
				
				if(creditFlag=="Y"){
					
					result=result	+ '   <button disabled onclick="setCreditPayble('+res.listBillReceiptMaster[i].totalRemain+','+recId+')"><i class="fa fa-credit-card"></i></button> ';
				}else{
					
					result=result	+ '   <button onclick="setCreditPayble('+res.listBillReceiptMaster[i].totalRemain+','+recId+')"><i class="fa fa-credit-card"></i></button> ';
				}		
				 	 
				  + '	</td>'
				  + '</tr> ';
				  
					  
				  var resultSlave= 
					  ' <div class="panel-collapse collapse" id="recSlave'+i+'" style="height: 0px;">'
				    + ' <div class="panel-body"> '		
					+ ' <table class="table table-hover" id="receiptSlave"> '
					+ ' <thead> '
					+ '		<tr> '
					+ '			<th>#</th> '
					+ '			<th>Comp Name</th> '						
					+ '			<th>Amount</th> '
					+ '			<th>Date</th> '	
					/*+ '			<th>Edit</th> '*/
					+ '			<th>Delete</th> '
					+ '		</tr> '
					+ '	</thead> '
					+ '	<tbody> ';	 
		
				  for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
					  
					  var slaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
					  var billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
					  var billAmt=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount).toFixed(2);
					  var rate=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate).toFixed(2);
					  var quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
					  var copay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay).toFixed(2);
					  var pay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay).toFixed(2);
					  var disc=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession).toFixed(2);
					  var againstId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].againstId;
					  var serviceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
					  var subServiceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].subServiceId;
					  var doctorId   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].doctorId;
					  // For Professional fees
					  var pfVoucherFlag   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].pfVoucherFlag;
					  var advanceFlag   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].advanceFlag;
					  
					  var finalBillAmt=(rate*quantity)-disc;
					  
					  resultSlave = resultSlave + '<tr> '
							+ '	<td>'+(k+1)+'</td> '
							+ '	<td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> '
							+ '	<td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> '
							+ '	<td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> ';
												  
						  	if(pfVoucherFlag == "Y" || creditFlag == "Y" || againstId > 0){
								
								resultSlave = resultSlave	/*+ '	<td><button disabled class="btn btn-xs btn-success SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '*/
														+ '	<td><button disabled class="btn btn-xs btn-success SlaveBtn" value="DELETE" onclick="deleteNarration(\'open\','+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
							}else {
							   
								resultSlave = resultSlave /*+ ' <td><button disabled class="btn btn-xs btn-success editUserAccess SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '*/
														  + ' <td><button disabled class="btn btn-xs btn-success deleteUserAccess SlaveBtn" value="DELETE" onclick="deleteNarration(\'open\','+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
													   
							}
														
					  		resultSlave=resultSlave	+ '	<td ><input type="hidden" id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> '
							+ '	<td ><input type="hidden" id="rateOfReceipt'+billDetailsId+'" value="'+rate+'"></td> '
							+ '	<td ><input type="hidden" id="quan'+billDetailsId+'" value="'+quantity+'"></td> '
							+ '	<td ><input type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> '
							+ '	<td ><input type="hidden" id="copay'+billDetailsId+'" value="'+copay+'"></td> '
							+ '	<td ><input type="hidden" id="pay'+billDetailsId+'" value="'+pay+'"></td> '
							+ '	<td ><input type="hidden" id="servId'+billDetailsId+'" value="'+serviceId+'"></td> '
							+ '	<td ><input type="hidden" id="subsId'+billDetailsId+'" value="'+subServiceId+'"></td> '
							+ '	<td ><input type="hidden" id="doctorId'+billDetailsId+'" value="'+doctorId+'"></td> '
							
							+ '</tr>';	
					  
				  }					 		 	
					
				resultSlave=resultSlave + '	</tbody></table></div></div> ';
				result=result +resultSlave;							  	
			}
				
			result=result
			+ '	</tbody> '
			+ '</table> ';			
		
	}

	$("#cashReceipts").html(result);
}

function saveIvfRefundBillDetails(callFrom){

	var payNowConf = parseFloat($("#payNow").val());
	
	var r = confirm("Are You Sure You Want To Refund Amount :"+payNowConf);
	if (r == true) {
		var unitId		= parseInt($("#unitId").val());
		var userId		= parseInt($("#userId").val());	
		var refDocId	= 0; //parseInt($("#refDocId").val());	
		var treatmentId	= parseInt($("#treatmentId").text());  
		var regBillId	= $("#regBillId").val();  
		var payable		= parseFloat($("#payable").val()); 
		var discount	= parseFloat($("#discount").val()); 
		var refPer		= parseFloat($("#refPer").val());
		var payNow		= parseFloat($("#payNow").val());
		var refAuth		= parseInt($("#refAuthSel").val()); 
		var refRemark	= $("#txtRefRemk").val(); 
		var payMode		= $("#payMode").val();
		
		var batchNo		= "";
		var bnumber 	= "";
		var bName		= "";
		
		if(refRemark == ""){
			
			alert("Please fill remark");
			return false;
			$("#txtRefRemk").focus(); 
		}
		
		var againstId	= $("#recId").val();	
		var receiptOf= $("#receiptOf").val();
		
		var payeeSprlastId=0;
		var payeeSprMainId=0;
		var payeeTypeId= $("#payee").val();	
		if(payeeTypeId==2){
			
			var size=$("#dynamicItems li").length;
			payeeSprlastId=$("#lis" + (size - 1)).val();
			payeeSprMainId=$("#lis0").val();
		}
		
		callFrom= $("#callFromForSave").val();
		
		if(payable<=0){
			
			alert("Payable should be greater than zero");
			return false;
		}
		
		if(payNow>payable){
			
			alert("Amount should be less than payable");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		}else if(payNow<=0){
			
			alert("Pay Now should be greater than zero");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		}
			
		var servIdsChecked=[]; 
		
		$('input[id=chkOpdBillReg1]:not(:checked)').each(function(){
			
			servIdsChecked.push(regBillId);
		});
	
		$('input[name=opdBillCheckbox]:not(:checked)').each(function(){
			
			servIdsChecked.push($(this).val());
		});
		
		var multiPayDetails = {
				listMultiBillReceiptMaster : []
	    };
		
		if(payMode==2 || payMode==3){
			
			bName= $("#bankID").val();
			batchNo= $("#newBatchNumber").val();
			
			if(payMode==2){
				
				bnumber= $("#cardnumber").val();
			}
			
			if(payMode==3){
				
				bnumber= $("#chequenumber").val();
			}
			
		}else if(payMode==4){
			
			var advance= $("#advancePaid").val();
			
			if(advance<=0){
				
				alert("Common advance not given by patient");
				$("#payNow").val(0);
				return false;
			}else if(payNow > advance){
				
				alert("Pay less or exact amount of common advance");
				$("#payNow").val(0);
				return false;
			}
		}
		else if(payMode==-1){
					
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
			batchNo= 0;
		}
		
		var inputs = [];	
		inputs.push("treatmentId=" + treatmentId);
		inputs.push("unitId=" + unitId);
		inputs.push("createdBy=" + userId);
		inputs.push("totalAmt=" + payable);	
		inputs.push("discount=" + discount);	
		inputs.push("totalPaid=" + payNow);	
		inputs.push("refAuth=" + refAuth);	
		inputs.push("refRemark=" + refRemark);		
		inputs.push("servIdsChecked=" + servIdsChecked);	
		inputs.push("refDocId=" + refDocId);		
		inputs.push("payMode=" + payMode);		
		inputs.push("bNumber=" + bnumber);		
		inputs.push("batchNo=" + batchNo);		
		inputs.push("bName=" + bName);		
		inputs.push("callFrom=" + callFrom);		
		inputs.push("againstId=" + againstId);	
		inputs.push("receiptOf=" + receiptOf);	
		inputs.push("payeeSprMainId=" + payeeSprMainId);
		inputs.push("payeeSprlastId=" + payeeSprlastId);
		inputs.push("payeeTypeId=" + payeeTypeId);
		inputs.push("refPer=" + refPer);
		var str = inputs.join('&');	
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data 	: str + "&reqType=AJAX",		
			url 	: "ehat/ivfbill/saveRefundBillDetails",
			error 	: function() {
						alert('Network Issue!!!');
					  },
			success : function(r) {
				
				if(r>0){
					
					alertify.success("Refund Receipt generated succesfully");
					receiptIvfBillPrint("refund",r);
				}else if(r==-1){
					
					alertify.error("Amount should be less than paid");
				}else if(r==-2){
					
					alertify.error("Receipt is not generated to refund");
				}else{
					
					alertify.error("Network Issue");
				}
				
				ivfResetAll(receiptOf);			
			}
		});
	}
}

/************
* @author	: Vinod Udawant
* @date		: 14-July-2017
* @codeFor	: Get bill refund master details
 ************/
function getIvfBillRefundDetails(callFrom) {

	var treatmentId	= $("#treatmentId").text();  
	var billId = $("#billNo").text();
	var receiptOf= $("#receiptOf").val();
	var userId = parseInt($("#userId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());	
	
	jQuery.ajax({
		async	: false,
		type	: "POST",		
		//data 	: { "treatmentId" : parseInt(treatmentId),"billId" : parseInt(billId), "callFrom" : callFrom, "receiptOf" : receiptOf, "createdBy" : userId, "chargesSlaveId" : chargesSlaveId },
		data 	: { "treatmentId" : parseInt(treatmentId),"billId" : parseInt(billId), "callFrom" : callFrom, "receiptOf" : receiptOf, "userId" : userId, "chargesSlaveId" : chargesSlaveId },
		url 	: "ehat/ivfbill/getBillRefundDetails",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			setIvfRefundTemplate(r,callFrom);				
		}
	});
};

/************
* @author	: Vinod Udawant
* @date		: 14-July-2017
* @codeFor	: Set refund master template
 ************/
function setIvfRefundTemplate(res,callFrom){
	
	var prevRefund=0;
	
	var recPrefix=$("#recPrefix").val();
	var recMiddle=$("#recMiddle").val();
	var recSufix=$("#recSufix").val();
	
	var result= ' <table class="table table-hover" id="refunds"> '
	+ ' <thead> '
	+ '		<tr> '
	+ '			<th>#</th> '
	+ '			<th>Refund Id</th> '
	+ '			<th>Amount</th> '
	+ '			<th>Refund</th> '
	+ '			<th>Reduction</th> '
	+ '			<th>Date</th> '			
	+ '		</tr> '
	+ '	</thead> '
	+ '	<tbody> ';
		
	for(var i=0;i<res.listBillRefundMaster.length;i++){
		
		var recId=res.listBillRefundMaster[i].billRefundId;
		var recCount=res.listBillRefundMaster[i].refundCount;
		var totalAmt=parseFloat(res.listBillRefundMaster[i].totalAmt).toFixed(2);
		var totAmt=parseFloat(res.listBillRefundMaster[i].totalPaid).toFixed(2);
		var remainAmt=parseFloat(res.listBillRefundMaster[i].totalRemain).toFixed(2);	
		var datetime= new Date(res.listBillRefundMaster[i].createdDateTime).toLocaleDateString('en-GB');
		
		recCount = recPrefix + recMiddle + recCount + recSufix;
		
		prevRefund=Number(prevRefund)+Number(totAmt);
		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+recCount+'</td> '
		  + '	<td>'+totalAmt+'</td> '
		  + '	<td>'+totAmt+'</td> '
		  + '	<td>'+remainAmt+'</td> '
		  + '	<td>'+datetime+'</td> '
		  + '   <td> <button onclick=receiptIvfBillPrint("refund",'+recId+') data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button></td> '
	}
		
	result=result
	+ '	</tbody> '
	+ '</table> ';		
	
	$("#prevRefunded").text(prevRefund);
	var refundable=Number($("#prevPaid").val())-Number(prevRefund);
	
	if(refundable<0){
		
		refundable=0;
	}
	$("#nowRefunded").text(refundable);	
	$("#cashReceipts").html(result);	
}

function deleteIvfMasterReceiptOPD(recId){
		
	var r = confirm("Are You Sure You Want To Delete?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/ivfbill/deleteMasterReceiptOPD",
			data : {
				"recId" : parseInt(recId)
			},			
			
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.success(response);
				getIvfBillReceiptDetails("all");
				ivfResetAll('general');
			}
		});
	}
}


/************
* @author	: Bilal
* @date		: 21-June-2017
* @codeFor	: Set receipt master template for deleted tab of OPD
 ************/
function setIvfDeletedReceiptTemplate(res,callFrom){
	
	var prevPaid=0;
	$("#btnRefund").prop('disabled','true');
	$("#payable").val(0.00);
	$("#payNow").val(0.00);
	var recPrefix=$("#recPrefix").val();
	var recMiddle=$("#recMiddle").val();
	var recSufix=$("#recSufix").val();
		
	var result= ' <table class="table table-hover" id="receipts"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Receipt Id</th> '
			+ '			<th>Amount</th> '
			+ '			<th>Paid</th> '
			+ '			<th>Discount</th> '
			+ '			<th>Remain</th> '
			+ '			<th>Date</th> '
			+ '			<th>Details</th> '
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody> ';
				
			for(var i=0;i<res.listBillReceiptMaster.length;i++){
				
				var recCount=res.listBillReceiptMaster[i].receiptCount;				
				recCount = recPrefix + recMiddle + recCount + recSufix;				
				var againId=res.listBillReceiptMaster[i].againstId;
				var totAmt=0;
				var totDisc=0;
				var remainAmt=0;
				if(againId==0){
					
					totAmt=parseFloat(res.listBillReceiptMaster[i].firstPaid).toFixed(2);	
					totDisc=parseFloat(res.listBillReceiptMaster[i].firstDisc).toFixed(2);
					remainAmt=parseFloat(res.listBillReceiptMaster[i].firstRemain).toFixed(2);	
				}else{
					
					totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);	
					totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
					remainAmt=parseFloat(res.listBillReceiptMaster[i].totalRemain).toFixed(2);	
				}
				var totalAmt=parseFloat(res.listBillReceiptMaster[i].totalAmt).toFixed(2);
				var datetime= new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
				
				if(callFrom=="all"){
					
					prevPaid=Number(prevPaid)+Number(totAmt);
					$("#prevPaid").val(prevPaid);
				}
				
				result=result
				  + '<tr> '
				  + '	<td>'+(i+1)+'</td> '
				  + '	<td>'+recCount+'</td> '
				  + '	<td>'+totalAmt+'</td> '				 
				  + '	<td>'+totAmt+'</td> '
				  + '	<td>'+totDisc+'</td> '
				  + '	<td>'+remainAmt+'</td> '
				  + '	<td>'+datetime+'</td> '				 
				  + '	<td><a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>';
					 
				/*result=result  + '   <button onclick=receiptBillPrint("receipt",'+recId+') data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button> ';*/
									 	 
				  + '	</td>'
				  + '</tr> ';				  
					  
				  var resultSlave= 
					  ' <div class="panel-collapse collapse" id="recSlave'+i+'" style="height: 0px;">'
				    + ' <div class="panel-body"> '		
					+ ' <table class="table table-hover" id="receiptSlave"> '
					+ ' <thead> '
					+ '		<tr> '
					+ '			<th>#</th> '
					+ '			<th>Comp Name</th> '						
					+ '			<th>Amount</th> '
					+ '			<th>Date</th> '						
					+ '		</tr> '
					+ '	</thead> '
					+ '	<tbody> ';	 
		
				  for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
					  
					  var billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
					  var billAmt=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount).toFixed(2);
					  var rate=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate).toFixed(2);
					  var quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
					  var copay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay).toFixed(2);
					  var pay=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay).toFixed(2);
					  var disc=parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession).toFixed(2);
					  var serviceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
					  var subServiceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].subServiceId;
					  var doctorId   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].doctorId;
					  var finalBillAmt=(rate*quantity)-disc;
					  
					  resultSlave = resultSlave + '<tr> '
							+ '	<td>'+(k+1)+'</td> '
							+ '	<td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> '
							+ '	<td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> '
							+ '	<td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> ';
																					
					  		resultSlave=resultSlave	+ '	<td ><input type="hidden" id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> '
							+ '	<td ><input type="hidden" id="rateOfReceipt'+billDetailsId+'" value="'+rate+'"></td> '
							+ '	<td ><input type="hidden" id="quan'+billDetailsId+'" value="'+quantity+'"></td> '
							+ '	<td ><input type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> '
							+ '	<td ><input type="hidden" id="copay'+billDetailsId+'" value="'+copay+'"></td> '
							+ '	<td ><input type="hidden" id="pay'+billDetailsId+'" value="'+pay+'"></td> '
							+ '	<td ><input type="hidden" id="servId'+billDetailsId+'" value="'+serviceId+'"></td> '
							+ '	<td ><input type="hidden" id="subsId'+billDetailsId+'" value="'+subServiceId+'"></td> '
							+ '	<td ><input type="hidden" id="doctorId'+billDetailsId+'" value="'+doctorId+'"></td> '
							
							+ '</tr>';	
					  
				  }					 		 	
					
				resultSlave=resultSlave + '	</tbody></table></div></div> ';
				result=result +resultSlave;							  	
			}
				
			result=result
			+ '	</tbody> '
			+ '</table> ';			
		
	

	$("#cashReceipts").html(result);
}

function getIvfBedDetails(t, s) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		url : "ehat/ivfbill/getIvfPatientBedBill",
		success : function(r) {
			getIvfBedDetailsTemp(r, s);
		}
	});
}


function getIvfBedDetailsTemp(t, s) {

	var setService = "";
	var nursing = "Nursing";
	var hallName = "";

	for ( var i = 0; i < t.listBedIvfDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listBedIvfDto[i].createdDate)
				.toLocaleDateString('en-GB');

		var netAmt = Number(t.listBedIvfDto[i].amount)
				- Number(t.listBedIvfDto[i].concession);

		/*
		 * var dname= t.listBedIvfDto[i].docName;
		 * 
		 * if(dname==null) { dname="-"; }
		 */
		if (t.listBedIvfDto[i].paidByCashFlag == "Y") {

			if (t.listBedIvfDto[i].cancle == "Y"
					|| t.listBedIvfDto[i].isModify == "N") {
				setService = setService
						+ '<tr disabled bgcolor="lightblue" id="tr'
						+ (t.listBedIvfDto[i].billDetailsId) + '">';

			} else {
				setService = setService
						+ '<tr bgcolor="lightblue" disabled="disabled" id="tr'
						+ (t.listBedIvfDto[i].billDetailsId) + '">';
			}
		} else {
			if (t.listBedIvfDto[i].cancle == "Y"
					|| t.listBedIvfDto[i].isModify == "N") {
				setService = setService + '<tr id="tr'
						+ (t.listBedIvfDto[i].billDetailsId) + '">';

			} else {
				setService = setService + '<tr onclick="editOnClickForIvfBed('
						+ t.listBedIvfDto[i].billDetailsId + ')" id="tr'
						+ (t.listBedIvfDto[i].billDetailsId) + '">';
			}

		}

		setService = setService

		// + '<tr id="tr' + (t.listBedIvfDto[i].billDetailsId) + '">'
		+ '<td style="display:none;" id="row'
				+ (t.listBedIvfDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listBedIvfDto[i].billDetailsId) + '"> '
				+ t.listBedIvfDto[i].billDetailsId + ' </td>'

				+ '<td style="display:none;" id="othIpdRate'
				+ (t.listBedIvfDto[i].billDetailsId) + '"> '
				+ t.listBedIvfDto[i].otherRate + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listBedIvfDto[i].billDetailsId) + '"> '
				+ t.listBedIvfDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listBedIvfDto[i].billDetailsId) + '"> '
				+ t.listBedIvfDto[i].amount + ' </td>'

				+ '<td style="display:none;" id="ehatHallId"> '
				+ t.listBedIvfDto[i].ehatHallId + ' </td>'

				+ '<td style="display:none;" id="hallID"> '
				+ t.listBedIvfDto[i].hallID + ' </td>'

				+ '<td style="display:none;" id="idHallType"> '
				+ t.listBedIvfDto[i].idHallType + ' </td>'

				+ '<td style="display:none;" id="ehatHalltypeId"> '
				+ t.listBedIvfDto[i].ehatHalltypeId + ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listBedIvfDto[i].billDetailsId) + '"> '
				+ t.listBedIvfDto[i].subServiceId + ' </td>';

		if (t.listBedIvfDto[i].subServiceId == 0) {

			setService = setService + '<td id="catName'
					+ (t.listBedIvfDto[i].billDetailsId) + '"> ' + (nursing)
					+ ":" + (hallName) + ' </td>';
		} else {
			hallName = t.listBedIvfDto[i].bedHall;
			if (t.listBedIvfDto[i].isCategory == 'N') {
				setService = setService + '<td id="catName'
						+ (t.listBedIvfDto[i].billDetailsId) + '"> '
						+ t.listBedIvfDto[i].bedHall + ' </td>';

			} else {
				hallName = t.listBedIvfDto[i].bedHall;

				setService = setService + '<td id="catName'
						+ (t.listBedIvfDto[i].billDetailsId) + '"> '
						+ t.listBedIvfDto[i].bedHall + ' </td>';

			}
		}

		setService = setService

		/*
		 * + '<td id="doccName'+(t.listBedIvfDto[i].billDetailsId)+'"> '+
		 * dname+' </td>'
		 */

		+ '<td style="display:none;" id="subserviceid'
				+ (t.listBedIvfDto[i].billDetailsId) + '"> '
				+ t.listBedIvfDto[i].subServiceId + ' </td>';

		/*
		 * + '<td style="display:none;" id="dId'+(t.listBedIvfDto[i].billDetailsId)+'"> '+
		 * t.listBedIvfDto[i].docId+' </td>'
		 */

		/*
		 * + '<td id="char'+(t.listBedIvfDto[i].billDetailsId)+'">' + '<div
		 * class="text-center">'+ t.listBedIvfDto[i].rate +'</div>' + '</td>';
		 */

		// added by vinod
		if (t.listBedIvfDto[i].paidByCashFlag == "Y") {
			if (t.listBedIvfDto[i].cancle == "Y") {

				setService = setService + '<td style="display:none;"> '
						+ '<div class="text-center" id="tAmt'
						+ (t.listBedIvfDto[i].billDetailsId) + '">'
						+ t.listBedIvfDto[i].rate + '</div>' + '</td>'
						+ '<td id="char' + (t.listBedIvfDto[i].billDetailsId)
						+ '">' + '<div class="text-center">'
						+ (t.listBedIvfDto[i].rate).toFixed(2) + '</div>'
						+ '</td>';

			} else {

				if (t.listBedIvfDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listBedIvfDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIvfDto[i].billDetailsId)
							+ '">'
							+ (t.listBedIvfDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listBedIvfDto[i].billDetailsId) + '" value="'
							+ netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listBedIvfDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIvfDto[i].billDetailsId) + '">'
							+ (t.listBedIvfDto[i].rate).toFixed(2) + '</div>'
							+ '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listBedIvfDto[i].billDetailsId)
							+ '" value="'
							+ netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listBedIvfDto[i].billDetailsId) + '">'
					+ '<div class="text-center">' + t.listBedIvfDto[i].quantity
					+ '</div>' + '</td>'

					+ '<td id="amt' + (t.listBedIvfDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIvfDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listBedIvfDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIvfDto[i].concession).toFixed(2) + '</div>'
						+ '</td>'

						+ '<td id="conPer' + (t.listBedIvfDto[i].billDetailsId)
						+ '">' + '<div class="text-center">'
						+ (t.listBedIvfDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listBedIvfDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIvfDto[i].concession).toFixed(2) + '</div>'
						+ '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listBedIvfDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIvfDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			/*
			 * + '<td id="p' + (t.listBedIvfDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' + (t.listBedIvfDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 */

			+ '<td id="cP' + (t.listBedIvfDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIvfDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub' + (t.listBedIvfDto[i].billDetailsId)
					+ '">' + '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listBedIvfDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForIvfBed('
						+ t.listBedIvfDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBedIvfDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listBedIvfDto[i].cancle == "Y"
						|| t.listBedIvfDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForIvfBed('
							+ t.listBedIvfDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIvfDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled" onclick="editOnClickForIvfBed('
							+ t.listBedIvfDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIvfDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listBedIvfDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBedIvfDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBedIvfDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listBedIvfDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listBedIvfDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIvfDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIvfDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBedIvfDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIvfDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIvfDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" disabled="disabled" onclick="cancleOnClick('
							+ t.listBedIvfDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}

			setService = setService + '<td class="only-checkbox" >';

			if (t.listBedIvfDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIvfDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIvfDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIvfDto[i].billDetailsId + '">';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIvfDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIvfDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIvfDto[i].billDetailsId + '">';
			}
		} else {
			if (t.listBedIvfDto[i].cancle == "Y") {

				setService = setService + '<td style="display:none;"> '
						+ '<div class="text-center" id="tAmt'
						+ (t.listBedIvfDto[i].billDetailsId) + '">'
						+ t.listBedIvfDto[i].rate + '</div>' + '</td>'
						+ '<td id="char' + (t.listBedIvfDto[i].billDetailsId)
						+ '">' + '<div class="text-center">'
						+ (t.listBedIvfDto[i].rate).toFixed(2) + '</div>'
						+ '</td>';

			} else {

				if (t.listBedIvfDto[i].paidFlag == "N") {

					setService = setService
							+ '<td id="char'
							+ (t.listBedIvfDto[i].billDetailsId)
							+ '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIvfDto[i].billDetailsId)
							+ '">'
							+ (t.listBedIvfDto[i].rate).toFixed(2)
							+ '</div>'
							+ '</td>'
							+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s + '" id="tAmtSlave'
							+ (t.listBedIvfDto[i].billDetailsId) + '" value="'
							+ netAmt + '"></td>';
				} else {

					setService = setService + '<td id="char'
							+ (t.listBedIvfDto[i].billDetailsId) + '">'
							+ '<div class="text-center" id="tAmt'
							+ (t.listBedIvfDto[i].billDetailsId) + '">'
							+ (t.listBedIvfDto[i].rate).toFixed(2) + '</div>'
							+ '</td>';
					+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
							+ s
							+ '" id="tAmtSlave'
							+ (t.listBedIvfDto[i].billDetailsId)
							+ '" value="'
							+ netAmt + '"></td>';
				}

			}// added by vinod

			setService = setService + '<td id="q'
					+ (t.listBedIvfDto[i].billDetailsId) + '">'
					+ '<div class="text-center">' + t.listBedIvfDto[i].quantity
					+ '</div>' + '</td>'

					+ '<td id="amt' + (t.listBedIvfDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIvfDto[i].amount).toFixed(2) + '</div>'
					+ '</td>';

			var concessionFlow = $('#concessionFlow').val();

			if (concessionFlow == "on") {
				setService = setService + '<td id="con'
						+ (t.listBedIvfDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIvfDto[i].concession).toFixed(2) + '</div>'
						+ '</td>'

						+ '<td id="conPer' + (t.listBedIvfDto[i].billDetailsId)
						+ '">' + '<div class="text-center">'
						+ (t.listBedIvfDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			} else {
				setService = setService + '<td style="display:none;" id="con'
						+ (t.listBedIvfDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIvfDto[i].concession).toFixed(2) + '</div>'
						+ '</td>'

						+ '<td style="display:none;" id="conPer'
						+ (t.listBedIvfDto[i].billDetailsId) + '">'
						+ '<div class="text-center">'
						+ (t.listBedIvfDto[i].concessionPer).toFixed(2)
						+ '</div>' + '</td>';
			}
			setService = setService
			/*
			 * + '<td id="p' + (t.listBedIvfDto[i].billDetailsId) + '">' + '<div
			 * class="text-center">' + (t.listBedIvfDto[i].pay).toFixed(2) + '</div>' + '</td>'
			 */

			+ '<td id="cP' + (t.listBedIvfDto[i].billDetailsId) + '">'
					+ '<div class="text-center">'
					+ (t.listBedIvfDto[i].coPay).toFixed(2) + '</div>'
					+ '</td>'

					+ '<td id="dateSub' + (t.listBedIvfDto[i].billDetailsId)
					+ '">' + '<div class="text-right" id="dateSubservice">'
					+ datetime12 + '</div>';
			setService = setService + '</td>';

			if ((t.listBedIvfDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClickForIvfBed('
						+ t.listBedIvfDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
						+ t.listBedIvfDto[i].billDetailsId
						+ '></i></button></a></td>';

			} else {

				if (t.listBedIvfDto[i].cancle == "Y"
						|| t.listBedIvfDto[i].isModify == "N") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClickForIvfBed('
							+ t.listBedIvfDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIvfDto[i].billDetailsId
							+ '></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClickForIvfBed('
							+ t.listBedIvfDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'
							+ t.listBedIvfDto[i].billDetailsId
							+ '></i></button></a></td>';
				}
			}

			if ((t.listBedIvfDto[i].paidFlag == "Y")) {

				setService = setService
						+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
						+ t.listBedIvfDto[i].cancle
						+ '" id=btnCancle'
						+ t.listBedIvfDto[i].billDetailsId
						+ ' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('
						+ t.listBedIvfDto[i].billDetailsId
						+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';

			} else {

				if (t.listBedIvfDto[i].cancle == "Y") {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIvfDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIvfDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('
							+ t.listBedIvfDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService
							+ '<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'
							+ t.listBedIvfDto[i].cancle
							+ '" id=btnCancle'
							+ t.listBedIvfDto[i].billDetailsId
							+ ' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" onclick="cancleOnClick('
							+ t.listBedIvfDto[i].billDetailsId
							+ ')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}

			setService = setService + '<td class="only-checkbox" >';

			if (t.listBedIvfDto[i].paidFlag == "N") {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIvfDto[i].serviceId
						+ '" checked=checked id="chkOpdBill'
						// + '"disabled=disabled id="chkOpdBill'
						+ (t.listBedIvfDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIvfDto[i].billDetailsId
						+ '" onclick=setService("general",'
						+ t.listBedIvfDto[i].billDetailsId + ')>';

			} else {

				setService = setService
						+ '<input type="checkbox" class="billSlaveChk'
						+ t.listBedIvfDto[i].serviceId
						+ '" disabled=disabled id="chkOpdBill'
						+ (t.listBedIvfDto[i].billDetailsId)
						+ '" name="opdBillCheckbox" value="'
						+ t.listBedIvfDto[i].billDetailsId
						+ '" onclick=setService("general",'
						+ t.listBedIvfDto[i].billDetailsId + ')>';
			}
		}

		setService = setService + '</td>';

		setService = setService + '</tr>';
		setService = setService + '<tr>';
		// $("#ehatHallIdFromUI").val(t.listBedIvfDto[i].ehatHallId);
	}
	$("#ehatHallIdd").val($("#ehatHallId").text());
	$("#bedData").html(setService);
}

function editOnClickForIvfBed(billDetailsId) {

	$('#queryType').val('update');
	// alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticular').val($('#catName' + billDetailsId).text());

	var a = parseInt($('#sId' + billDetailsId).html());

	$('#servId').val(a).text();
	$("#serviceid").val(a);
	// alert(a);
	$('#servId option:not(:selected)').prop('disabled', true);

	var chargesfromConf = $('#othIpdRate' + billDetailsId).text();

	$('#chargesfromConfIpd').val(chargesfromConf);
	// alert(chargesfromConf);

	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());

	$("#subserviceid").val(subserviceid);

	$('#rate').val($('#char' + billDetailsId).text());

	$('#qty').val($('#q' + billDetailsId).text());

	$('#concession').val($('#con' + billDetailsId).text());
	$('#concessionIpdPer').val($('#conPer' + billDetailsId).text());

	// $('#concession').val(0);
	// $('#concessionIpdPer').val(0);

	$('#amount').val($('#amt' + billDetailsId).text());
	$('#amount').attr('readonly', 'true');

	// $('#pay').val($('#p' + billDetailsId).text());
	$('#pay').val(0);

	$('#coPay').val($('#cP' + billDetailsId).text());


	$("#narrationBill").val('narrationBill');
}


function deallocateBedToIvfPatient(TreatId){
	
	var treatmentId = TreatId;
	
	var inputs = [];
    
	inputs.push('treatmentId=' + treatmentId);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/deallocateBedToIvfPatient",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			alert(r);
			$("#cancelIVFAdmissionPopUp").hide();
			window.location.reload(true);
		}
	});

}


function setTempPatientForIVFque1(r) {
	
	var d_id="";
	var htm = '';
	var count = 0;
	var dept = "";
	dept = "OPD";
	var cnt=0;
	var test="";
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	
	for ( var i = 0; i < r.listOpdQueManagmentViewDto.length; i++) {
		var strVale = r.listOpdQueManagmentViewDto[i].doctorId;
		var array = strVale.split(",");
		
		$("#invcount").val(r.listOpdQueManagmentViewDto[i].invoiceCountt);
		//To generate Tooltip
		for ( var k in array) {
		for ( var g = 0; g < r.lstDoctorDto.length; g++) {
			if (array[k] == r.lstDoctorDto[g].doctor_ID) {
			test=test+" "+r.lstDoctorDto[g].doc_name;
			}
		}
		}
		var patId= patPrefix + patMiddle + r.listOpdQueManagmentViewDto[i].patientId + patSufix; 	
		
  		var datetime= new Date(r.listOpdQueManagmentViewDto[i].createdDateTime).toLocaleString();
 		htm = htm   + '<tr>'
			 
					+ '<td  class="" id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (i + 1)
					+ ' <span class="tiptipClass" title="your tooltip text here"> </td>'

					+ '<td  class="col-md-2" id="name '
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].patientName) + ' </td>'

					+ '<td class="col-md-1" id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (patId) + '</td>'
					

					+ '<td class="col-md-1" id="mobile'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].mobile) + ' </td>'

					+ '<td class="" id="AppDate'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (datetime)
					+ ' </td>'
					//Added by Laxman on 28-Dec-2017
					+ '<td class="col-md-1" id="tokanNo'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' 
					+ (r.listOpdQueManagmentViewDto[i].tokenno)
					+ ' </td>'
						
					+ '<td id="toptip"  data-toggle="tooltip" data-placement="top" title="'+test+'" animation: true class="col-md-2" id="token'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].opdipdno) + ' </td>'
			
		if(array.length>1){
		htm = htm
					+ '<td class="col-md-2" style="padding:5px"><button style="font-size:10px" onclick="showDoctors('+i+');">'
					+ ' Show Doctors <i  style="font-size:10px;color:SteelBlue ;"  id="shBillView'+i+'" class="fa fa-chevron-circle-down" ></i></button>  <div id="'+i+'" class="box border" style="display:none;overflow-y: scroll;padding:5px;"> '
					+ ' <table > ' + '<tr> ' + '<th width="505Px"> Doctor Name  </th> '
					+ ' <th> Select   </th>' + '</tr>';

					for ( var k in array) {	

						for ( var g = 0; g < r.lstDoctorDto.length; g++) {
		
							if (array[k] == r.lstDoctorDto[g].doctor_ID) {
								d_id = r.lstDoctorDto[g].doctor_ID;
															
								if(d_id == r.listOpdQueManagmentViewDto[i].inQueueDocId){
									
									htm = htm + '<tr><td>' + r.lstDoctorDto[g].doc_name	+ '</td>'
									+ '<td> <input type="radio" checked name="drname' + cnt	+ '" value="' + r.lstDoctorDto[g].doctor_ID	+ '"> ' + '</td> ' + '</tr> '
									+ '<input type="hidden"  id="opddrid'+ r.lstDoctorDto[g].doctor_ID + '" value="' + r.lstDoctorDto[g].doctor_ID + '"> ';
								}else{
									
									htm = htm + '<tr><td>' + r.lstDoctorDto[g].doc_name	+ '</td>'
									+ '<td> <input type="radio" name="drname' + cnt	+ '" value="' + r.lstDoctorDto[g].doctor_ID	+ '"> ' + '</td> ' + '</tr> '
									+ '<input type="hidden"  id="opddrid'+ r.lstDoctorDto[g].doctor_ID + '" value="' + r.lstDoctorDto[g].doctor_ID + '"> ';
								}								
							}
						}
					}
					
					test="";
				htm = htm + '</table> ' + '</div> </td> '

				+ "<td class='numeric col-md-1'>"
				+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView"
				+ cnt
				+ "' onClick=sendTODoc("
				+ r.listOpdQueManagmentViewDto[i].patientId
				+ ","
				+ cnt
				+ ",'send',"
				+d_id+") /></td> "

					+ "<td class='numeric '>"
				+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
				+ r.listOpdQueManagmentViewDto[i].patientId
				+ ","
				+ cnt
				+ ") /></td> ";
					 
				if(r.listOpdQueManagmentViewDto[i].ivfTreatFlag == "Y"){
					
					htm = htm + '<td class="col-md-1 center" style="" >'
					+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToIVFBill( '
					+ r.listOpdQueManagmentViewDto[i].treatmentId
					+ ')" type="button"  ></button>' + '</td>';
				}else{
					
					htm = htm + '<td class="col-md-1 center" style="" >'
					+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToBill( '
					+ r.listOpdQueManagmentViewDto[i].treatmentId
					+ ')" type="button"  ></button>' + '</td>';
				}
				
				
				htm = htm +'<td class="col-md-1" style="padding-top: 14px;" id="divCD'+cnt+'">'
				+ '<button data-toggle="tooltip" data-placement="left" title="Cancel" class="btn btn-xs btn-warning" style="font-size: 7px;margin-right: 2%;width: 49%;" id="btnCancel'+cnt+'" onClick=cancelSendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"cancel",'+d_id+') disabled="disabled"> <i class="fa fa-times"></i></button>'
				+ '<button data-toggle="tooltip" data-placement="left" title="Check up done" class="btn btn-xs btn-success enableOnInput" style="font-size: 7px;width: 49%;" id="btnDone'+cnt+'" onClick=sendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"out",'+r.lstDoctorDto[i].doctor_ID+') disabled="disabled"> <i class="fa fa-check"></i></button>&nbsp;'
				+ "<button data-toggle='tooltip' data-placement='left' title='Change Consultation Doctor' class='btn btn-xs btn-info' style='font-size: 7px;' id='btnChangeConsultation' onClick=setPatientId("+r.listOpdQueManagmentViewDto[i].patientId+","+r.listOpdQueManagmentViewDto[i].treatmentId+") ><i class='fa fa-stethoscope fa-fw'></i></button>"
				+ '</td>'
				+ '</tr>';

		count++;
		cnt++;
		}else{
			htm = htm
			+ ' <td class=" " style="padding:5px"> '
			+ ' <div id="" > '
			+ ' <table > ' + '<tr> ' + '<th width="505Px">  </th> '
			+ ' <th width="505x"> </th>' + '</tr>';

				for ( var k in array) {
					
				for ( var g = 0; g < r.lstDoctorDto.length; g++) {
					
				if (array[k] == r.lstDoctorDto[g].doctor_ID) {
					 d_id=r.lstDoctorDto[g].doctor_ID;
		htm = htm + '<tr><td width="70%">' + r.lstDoctorDto[g].doc_name
					+ '</td>' + '<td> <input type="radio" style="display:none" name="drname'+i+'"  value="'+r.lstDoctorDto[g].doctor_ID+'"checked="checked"> ' + '</td> '
					+ '</tr> '
					+ '<input type="hidden"  id="opddrid'+r.lstDoctorDto[g].doctor_ID+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ';
								}
							}
						}
				test="";
		htm = htm + '</table> ' + '</div> </td> '
		

		+ "<td class='numeric col-md-1-1'>"
		+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView"
		+ count
		+ "' onClick=sendTODoc("
		+ r.listOpdQueManagmentViewDto[i].patientId
		+ ","
		+ cnt
		+ ",'send',"
		+d_id+") /></td> "

			+ "<td class='numeric '>"
		+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
		+ r.listOpdQueManagmentViewDto[i].patientId
		+ ","
		+ cnt
		+ ","
		+ r.listOpdQueManagmentViewDto[i].treatmentId 
		+ ") /></td> ";
			 
		if(r.listOpdQueManagmentViewDto[i].ivfTreatFlag == "Y"){
			
			htm = htm + '<td class="col-md-1 center" style="" >'
			+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToIVFBill( '
			+ r.listOpdQueManagmentViewDto[i].treatmentId
			+ ','+ r.listOpdQueManagmentViewDto[i].ivfTreatmentId+')" type="button"  ></button>' + '</td>';
		}else{
			
			htm = htm + '<td class="col-md-1 center" style="" >'
			+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToBill( '
			+ r.listOpdQueManagmentViewDto[i].treatmentId
			+ ')" type="button"  ></button>' + '</td>';
		}		
		
		htm = htm +'<td class="col-md-1" style="height: 21.5px;padding-top: 14px;" id="divCD'+cnt+'">'
		+ '<button data-toggle="tooltip" data-placement="left" title="Cancel" class="btn btn-xs btn-warning" style="font-size: 7px;margin-right: 2%;width: 49%;" id="btnCancel'+cnt+'" onClick=cancelSendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"cancel",'+d_id+') disabled="disabled"> <i class="fa fa-times"></i></button>'
		+ '<button data-toggle="tooltip" data-placement="left" title="Check up done" class="btn btn-xs btn-success enableOnInput" style="font-size: 7px;width: 49%;" id="btnDone'+cnt+'" onClick=sendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"out",'+d_id+') disabled="disabled"> <i class="fa fa-check"></i></button>&nbsp;'
		+ "<button data-toggle='tooltip' data-placement='left' title='Change Consultation Doctor' class='btn btn-xs btn-info' style='font-size: 7px;' id='btnChangeConsultation' onClick=setPatientId("+r.listOpdQueManagmentViewDto[i].patientId+","+r.listOpdQueManagmentViewDto[i].treatmentId+") ><i class='fa fa-stethoscope fa-fw'></i></button>"
		+ '</td>'
		+ '</tr>';

count++;
cnt++;
test="";
		}
			 
 	}

	$("#ivfBillcontainer12").html(htm);

	for ( var i = 0; i < r.listOpdQueManagmentViewDto.length; i++) {
		
		var qStatus=r.listOpdQueManagmentViewDto[i].treatmentId;
		if(qStatus!=null){
			$('#btnView' + i).addClass('btn btn-xs btn-primary');
			$('#btnView' + i).css({
				'width' : '80%',
				'border-radius' : '5px',
				'margin-top' : '3px'
			});
			$('#btnView' + i).removeClass("editUserAccess");
			
			$('#btnCancel' + i).removeAttr("disabled");
			$('#btnDone' + i).removeAttr("disabled");
		}
	
	}

}

function closeIVFPatientTreatment(treatmentId,ivfTreatId){

	
	var inputs = [];
	inputs.push("treatmentId=" +treatmentId);
	inputs.push("ivfTreatId=" +ivfTreatId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ivfbill/closeIVFPatientTreatment",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			if(r==1){
				alert("Closed Treatment Successfully");
				window.location.reload(true);
			}else{
				alert("Network Issue...");
			}
			
			
		}
	});
}
