var cancelTestSmplColFlag="N";
var deleteTestSmplColFlg="N";
var risReportFlag="N";

/*******************************************************************************
  * @author Kishor Lokhande
 * @date 3_June_2017
 * @Code Getting Patient Data By Id
 ******************************************************************************/
function getPatientBillById(r) {
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/billNoble/fetchPatientsBillById",
		success : function(r) {
		}
	});
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 6_June_2017
 * @Code Getting Bill Data By Service
 ******************************************************************************/
function getPatientBillAmount(r,callFrom) {
	var tFlag = "AT";
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform" : r
		},*/
		data : {
			"tFlag" : tFlag,
			"treatmentId" : r
		},
		//url : "ehat/billNoble/fetchPatientBillAmount"," +
		url : "ehat/opdbill/fetchPatientBillAmount",
		success : function(r) {
						
			setBillDetailsTemp(r,callFrom);		
			$('#amount').attr('readonly', 'true');
			$("#concessionOnPerc").val(0);
			//$(".openAllSlave").trigger('click');
			//resetAll();		
		}
	});
}

var totAmt=0;
function setBillDetailsTemp(r,callFrom){
	
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
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+ r.listBillNobleDto[i].serviceId+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
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
            +'<button class="btn btn-xs btn-success" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'general\',\'No\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			+	'</tr>';
						
			totAmt=totAmt+r.listBillNobleDto[i].amount;
						
		}/*else if(r.listBillNobleDto[i].serviceId== 2){
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+ r.listBillNobleDto[i].serviceId+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseCghsOne'+i+'" onclick="getSubServiceDetails('+treatmentId+','+ r.listBillNobleDto[i].serviceId +')">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillNobleDto[i].serviceName +'</div>'	
			
			
			
			+ 	'<div class="col-md-1">'
			+ 	'<i class="fa fa-chevron-down" id="list'+i+'"></i>'
			+	'</div>'
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'
			+	'<div id="collapseCghsOne'+i+'" class="panel-collapse collapse">'
			+	'<div class="panel-body">'
			+	'<table class="table table-hover">'
			+	'<thead>'
			+	'<tr>'
			+	'<th class="only-checkbox">#</th>'
			+	'<th>Doctor Name</th>'
			+	'<th>'
			+	'<div class="text-center">Amount</div>'
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
				+	'<div class="text-center">Disc</div>'
				+	'</th>'
				
				+	'<th style="display:none">'
				+	'<div class="text-center">Disc Per%</div>'
				+	'</th>';
			}
			setBill=setBill
			+	'<th>'
			+	'<div class="text-center">Co-Pay</div>'
			+	'</th>'
			+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'
			+	'<th class="only-checkbox">Edit</th>'
			+	'<th class="only-checkbox">Cancel</th>'
			+	'<th class="only-checkbox">ChB</th>'
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceData">'
		
			+	'</tbody>'
			+	'</table>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			
			
			
			+	'<td><div class="text-center">' + r.listBillNobleDto[i].serviceCount +'</div></td>'
			+ 	'<td>'
			+	'<div id="tamt'+(r.listBillNobleDto[i].serviceId)+'" class="text-right">' + (r.listBillNobleDto[i].amount).toFixed(2) +'</div></td>'
			
			+	'<td  class="text-center" ><a style="cursor:pointer;"> '
            +'<button class="btn btn-xs btn-success editUserAccess" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'general\',\'No\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			+	'</tr>';
			
			totqyt=totqyt+ r.listBillNobleDto[i].serviceCount;
			totAmt=totAmt+r.listBillNobleDto[i].amount;
		}*/else if(r.listBillNobleDto[i].serviceId == pharmaId){}
		else{
						
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'// added by vinod
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+(r.listBillNobleDto[i].serviceId)+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'// added by vinod
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'+i+'" onclick="getSubServiceDetails1('+i+','+treatmentId+','+ r.listBillNobleDto[i].serviceId +')">'
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
			
			/*+	'<th>'
			+	'<div class="text-center">Pay</div>'
			+	'</th>'*/
			

			+	'<th>'
			+	'<div class="text-center">Co-Pay</div>'
			+	'</th>'
			
			
			+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'
			+	'<th class="only-checkbox">Edit</th>'
			+	'<th class="only-checkbox">Cancel</th>';
			
			if(r.listBillNobleDto[i].isCombination=='Y')
			{
			setBill=setBill	+ '<th class="only-checkbox">Pkg</th>';
			}
			setBill=setBill	
			+	'<th class="only-checkbox">ChB</th>'
					
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceData'+i+'">'
				/*'<tr>'
			+	'<td class="only-checkbox">'
			+	'<input type="checkbox">'
			+	'</td>'
			+	'<td>Cash</td>'
			+	'<td>'
			+	'<div class="text-center"></div>'
			+	'</td>'
			+	'<td>'
			+	'<div class="text-right">25-05-2017</div>'
			+	'</td>'
			+	'</tr>'
			+	'<tr>'
			+	'<td class="only-checkbox">'
			+	'<input type="checkbox">'
			+	'</td>'
			+	'<td>Cash</td>'
			+	'<td>'
			+	'<div class="text-center">999.00</div>'
			+	'</td>'
			+	'<td>'
			+	'<div class="text-right">25-05-2017</div>'
			+	'</td>'
			+	'</tr>'*/
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
            +'<button class="btn btn-xs btn-success" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'general\',\'No\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			+	'</tr>';// added by vinod	
			
			totqyt=totqyt+ r.listBillNobleDto[i].serviceCount;
			totAmt=totAmt+r.listBillNobleDto[i].amount;
		}
	}
	
	//alert(totqyt);
	//alert(totAmt);
	//alert(callFrom);
	if(callFrom == "cghs"){
		//$("#billDetails").html("");
		//alert("in chgs");
		$("#totalQtty").text(totqyt);
		$("#totalAmmt").text((totAmt).toFixed(2));
		
		$("#cghsBill").html(setBill);
		
		//$("#cghsBill").html(setBill);
	}/*else if(callFrom == "sponsor"){
		getPatientBillAmountForSponsor(treatmentId);
		$("#cghs").html("");
		//alert("in chgs");
		$("#totalQtty").text(totqyt);
		$("#totalAmmt").text(totAmt);
		
		$("#sponsor").html(setBill);
	}*/
	else{
		//$("#cghsBill").html("");
		//alert("in general");
		$("#totalQty").text(totqyt);
		$("#totalAmt").text((totAmt).toFixed(2));
		$("#totAmt").text((totAmt).toFixed(2));
		$("#billDetails").html(setBill);
	}
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Save total payble 
 ************/
/*function setTotalPaid(){
	
	var total=0;
	$('.mainAddedInTotal').each(function() {
		
		total=total+Number($(this).text());    
	});
	
	$('.addedInTotal').each(function() {
		
		total=total+Number($(this).val());    
	});
	
	$("#payable").val(total);
}*/

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Set slave checkboxes according to master
 ************/
/*function setSlaveChk(id){
	
    if(($('#chkOpdBillReg'+id).prop("checked") == true)){
    	
    	if(id==1){
    		
    		$('#tamt1').removeClass("mainNotInTotal");
        	$('#tamt1').addClass("mainAddedInTotal");
    	}
    	
    	$('.billSlaveChk'+id).prop('checked', true);    	
    	 
    	$('.billSlave'+id).removeClass("notInTotal");
    	$('.billSlave'+id).addClass("addedInTotal");
    	setTotalPaid();
    }else{
    	
    	if(id==1){
    		
    		$('#tamt1').removeClass("mainAddedInTotal");
        	$('#tamt1').addClass("mainNotInTotal");
    	}
    	
    	$('.billSlaveChk'+id).prop('checked', false);	
    	
    	$('.billSlave'+id).removeClass("addedInTotal");
    	$('.billSlave'+id).addClass("notInTotal");
    	setTotalPaid();
    }	
}*/

function setSlaveChk(id){
	
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
    	  	     	
    	setTotalPaid("general",id);
    	var ifCurPayable=$("#payable").val();    	
    	payable=Number(payable)+Number(ifCurPayable);
    
    }else{
    	
    	if(id==1){
    		
    		$('#tamt1').removeClass("mainAddedInTotal");
        	$('#tamt1').addClass("mainNotInTotal");
    	}
    	
    	$('.billSlaveChk'+id).removeAttr("checked");    	
    	setTotalPaid("general",id);
    	var elseCurPayable=$("#payable").val();
    	payable=Number(payable)-Number(elseCurPayable);
    
    }	    
    $("#payable").val(parseFloat(payable).toFixed(2));
    $("#payNow").val(parseFloat(payable).toFixed(2));
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Set total paid according to slaves
 ************/
/*function setTotalPaidbySlave(id){
	
    if($('#chkOpdBill'+id).prop("checked") == true){

    	$("#tAmtSlave"+id).removeClass("notInTotal");
    	$("#tAmtSlave"+id).addClass("addedInTotal");
    	setTotalPaid();
    }else{
    		
    	$("#tAmtSlave"+id).removeClass("addedInTotal");
    	$("#tAmtSlave"+id).addClass("notInTotal");
    	setTotalPaid();
    }	
}*/

function setTotalPaidbySlave(billDetailId,sevId,chargesSlaveId){
	
	var sponsorCatId= $("#chargesSlaveId").val();
	
	if(chargesSlaveId == sponsorCatId){
		
		var payable=$("#payable").val();
		var slaveAmt=Number($("#tAmtSlave"+billDetailId).val());
		
		var totalChk=$('.billSlaveChk'+sevId).length;
		var checkedChk=$('.billSlaveChk'+sevId+':checked').size();
		var disabledChk=$('.billSlaveChk'+sevId+':disabled').size();	
		totalChk=Number(totalChk)-Number(disabledChk);
	    if(totalChk==checkedChk){
			
			$("#chkOpdBillReg"+sevId).prop("checked","true");
		}else{
			
			$("#chkOpdBillReg"+sevId).removeAttr("checked");
		}
				
	    if($('#chkOpdBill'+billDetailId).prop("checked") == true){

	    	payable=Number(payable)+Number(slaveAmt);
	    	
	    }else{
	    	    	
	    	if(payable>0 && payable>=Number(slaveAmt)){
	    		
	    		payable=Number(payable)-Number(slaveAmt);
	    		
	    	}else{
	    		
	    		alert("Payable is greater than service amount");
	    		$('#chkOpdBill'+billDetailId).prop("checked","true");
	    	}
	    }	 
	    
	    $("#payable").val(parseFloat(payable).toFixed(2));
	    $("#payNow").val(parseFloat(payable).toFixed(2));		
	}	
}

function getSubServiceDetails(t,s){
	//alert("hiiii");
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform" : t,
			"call" : s
		},*/
		data : {
			"treatmentId" : t,
			"serviceId" : s
		},
		//url : "ehat/billNoble/getPatientServiceBill",
		url : "ehat/opdbill/getPatientServiceBill",
		success : function(r) {
			
			getSubServiceDetailsTemp(r,s);		
			
			//disablePaidSevices(r);
			/*var id=s;
			
			if(($('#chkOpdBillReg'+id).prop("checked") == true)){
	    	   			    	
		    	$('.billSlaveChk'+id).prop('checked', true);       	
		    	
		    }else{
		    	
		    	$('.billSlaveChk'+id).removeAttr("checked");    			    	
		    }*/
		}
	});
}

function getSubServiceDetailsTemp(t,s)
{
	//alert(t.listBillNobleServiceDto.length);
	var setService="";
	//var treatmentId=$('#treatmentId').text();
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		var a=1+i;
		var datetime= new Date(t.listBillNobleServiceDto[i].createdDateTime).toLocaleDateString('en-GB');
		
		if ((t.listBillNobleServiceDto[i].paidFlag=="Y") || (t.listBillNobleServiceDto[i].cancle =="Y"))
		{
			setService = setService + '<tr>';
		}else
		{		
						
			setService = setService + '<tr onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')">';
			
			
		}
		
		
			//setService = setService + '<tr>';
			
		
		setService=setService
		
		
		+	'<td style="display:none;" id="bdId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>'

		+ '<td style="display:none;" id="doc'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'

		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
		+	'<td style="display:none;" id="docId'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+ t.listBillNobleServiceDto[i].docId +'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'
		+	'<td style="display:none;" id=othRates'+(t.listBillNobleServiceDto[i].billDetailsId)+'> '+ t.listBillNobleServiceDto[i].otherRate +' </td>'

		
		+	'<td style="display:none;"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>'
		
		+	'<td> '+ a +' </td>';
		
		
		setService = setService	+	'<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docName +' </td>';

		
		
		
		
		// added by vinod
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
			+	'</td>';
			
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
				/*+   '<input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+Number(t.listBillNobleServiceDto[i].charges)+'">'*/
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+(t.listBillNobleServiceDto[i].charges)+'"></td>';
				
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
				/*+   '<input type="hidden" class="notInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+Number(t.listBillNobleServiceDto[i].charges)+'">'*/
				+	'</td>';
				/*+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+(t.listBillNobleServiceDto[i].charges)+'"></td>';*/
				
			}		
		}
		// added by kishor
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
		+	'<td id="cP'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td>'
		+	'<div class="text-right">'+ datetime +'</div>'
		+	'</td>';
		setService = setService +	'</td>';
		
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"></a></td>';
		}else{
			
			if (t.listBillNobleServiceDto[i].cancle =="Y") {
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'"  disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button disabled="disabled" class="btn btn-xs btn-primary deleteUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			}else{
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled"  onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button disabled="disabled" class="btn btn-xs btn-danger deleteUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}			
		}		
			
		
		/*	if (t.listBillNobleServiceDto[i].cancle =="Y" || (t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
		} else {
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
		}*/
			
		setService = setService +	'<td class="only-checkbox" >';
		
		if(t.listBillNobleServiceDto[i].paidFlag=="N" && t.listBillNobleServiceDto[i].cancle=="N"){
			
			setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+' forEdit" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].chargesSlaveId+'),clearAllFieldsOfOpd()" checked=checked id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
			
		}else{
			
			setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+' forEdit" disabled="disabled" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
			
		}		
		
		setService = setService +	'</td>';
				
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';		
		
}	
	

	$("#serviceData").html(setService);
}

function getSubServiceDetails1(i,t,s)
{
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform" : t,
			"call" : s
		},*/
		data : {
			"treatmentId" : t,
			"serviceId" : s
		},
		//url : "ehat/billNoble/getPatientServiceBill",
		url : "ehat/opdbill/getPatientServiceBill",
		success : function(r) {
				
			getSubServiceDetailsTemp1(i,r,s);		
			userAccess();
			/*var id=s;
			
			if(($('#chkOpdBillReg'+id).prop("checked") == true)){
	    	   			    	
		    	$('.billSlaveChk'+id).prop('checked', true);       	
		    	
		    }else{
		    	
		    	$('.billSlaveChk'+id).removeAttr("checked");    			    	
		    }*/
		}
	});
}

function getSubServiceDetailsTemp1(j,t,s)
{
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
				//setService = setService + '<tr onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">';
                  setService = setService + '<tr id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">';
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
				if((t.listBillNobleServiceDto[i].sndtolabflag)=="Y"  ){
					setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: green;"> '
					+ t.listBillNobleServiceDto[i].categoryName + cghsCode+' </td>';
				
				}else if((t.listBillNobleServiceDto[i].sndtorisflag)=="Y"){ // added Rohini for ris package
					setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: #00bfff;"> '
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
			
			}
			else {
				setService = setService + '<td id="catName'
				+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
				+ t.listBillNobleServiceDto[i].categoryName + cghsCode+' </td>';
			}

		
		
		
		

		setService = setService
		/*+	'<td id="barCode'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].barCode+' </td>'*/
		+	'<td style="display:none;" id="barCode'+(t.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
		
		+	'<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ dname+' </td>'
		
		+	'<td style="display:none;" id="isServModify'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isModify+' </td>'
		
		+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].subServiceId+' </td>'
		
		+	'<td style="display:none;" id="spclId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].specialityId+' </td>'
		
		+	'<td style="display:none;" id="dId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'
		
		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
						
		+	'<td style="display:none;" id="amt'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].amount+' </td>'
		
		+	'<td style="display:none;" id="isCombination'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isCombination+' </td>'
		
		+	'<td style="display:none;" id="emrP'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].emrPer+' </td>'
		
		+	'<td style="display:none;" id="othRates'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherRate +' </td>'
		
		+	'<td style="display:none;" id="sndtolabflag'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtolabflag+' </td>'
		
		+	'<td style="display:none;" id="sampleType'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sampleTypeId+' </td>'
		
		/*+	'<td style="display:none;" id="barCodeId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].barCode+' </td>'
		
		+	'<td style="display:none;" id="inOutHouse'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].inOutHouse+' </td>'
		
		+	'<td style="display:none;" id="histopathLab'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].histopathLab+' </td>'
		
		+	'<td style="display:none;" id="collectionDate'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionDate+' </td>'
		
		+	'<td style="display:none;" id="collectionTime'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionTime+' </td>'

		+	'<td style="display:none;" id="regRefDocId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].regRefDocId+' </td>'*/
		
		+	'<td style="display:none;" id="barCodeId'+(t.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
		
		+	'<td style="display:none;" id="inOutHouse'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ t.listBillNobleServiceDto[i].inOutHouse+'</td>'
		
		+	'<td style="display:none;" id="histopathLab'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ t.listBillNobleServiceDto[i].histopathLab+'</td>'
		
		+	'<td style="display:none;" id="collectionDate'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionDate+' </td>'
		
		+	'<td style="display:none;" id="collectionTime'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionTime+' </td>'

		+	'<td style="display:none;" id="regRefDocId'+(t.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'

		// added by vinod
		+	'<td style="display:none;" id="sendToRisId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtorisflag +' </td>'
		
		// added by vinod
		+	'<td style="display:none;" id="isTemplateWiseTest'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].templateWise +' </td>'
		
		+	'<td style="display:none;" id="payFlag'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].paidFlag+' </td>';
		
		//Code  by Sanjay
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService +'<td style="display:none;"> '
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ t.listBillNobleServiceDto[i].rate +'</div>'
			+	'</td>'
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
			+	'</td>';
		
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].rate).toFixed(2) +'</div>'
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].rate).toFixed(2) +'</div>'
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
			
			/*+	'<td id="p'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].pay).toFixed(2) +'</div>'
			+	'</td>'*/
			
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
					setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}	
			
			if(t.listBillNobleServiceDto[i].isCombination=='Y')
			{
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success" id=packBtnClr'+t.listBillNobleServiceDto[i].billDetailsId+' data-toggle="modal" data-target="#pack"  onclick="getPackagedataforOpd('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			//Added By BILAL For pring of Package
			 /* if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
					
					setService = setService +'<td class="col-md-1 center" ><a style="cursor:pointer;"> '
				                            +'<button class="btn btn-xs btn-success editUserAccess" ' 
				                            +'  onclick="printopdpackage('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" '
				                            +'value="EDIT"><i class="fa fa-print"  id=btnpack'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
		        }*/
			}
			
			
			setService = setService +	'<td class="only-checkbox" >';
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N" && t.listBillNobleServiceDto[i].cancle=="N"){
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
				
			}else{
				
				//setService = setService +	'<input type="checkbox" disabled="disabled" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
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
			
			/*+	'<td id="p'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].pay).toFixed(2) +'</div>'
			+	'</td>'*/
			
			+	'<td id="cP'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td id="dateSub'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-right" id="dateSubservice">'+ datetime12 +'</div>';
			setService = setService +	'</td>';
			
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
				
				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				
			}else{
				
				if (t.listBillNobleServiceDto[i].cancle =="Y" || t.listBillNobleServiceDto[i].isModify=="N") {
					setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				}else{
					setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" disabled="disabled"  onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				}
			}	
					
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
				
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				
			}else{
				
				if (t.listBillNobleServiceDto[i].cancle =="Y") {
					setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}	
			
			if(t.listBillNobleServiceDto[i].isCombination=='Y')
			{
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success" id=packBtnClr'+t.listBillNobleServiceDto[i].billDetailsId+' data-toggle="modal" data-target="#pack"  onclick="getPackagedataforOpd('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			//Added By BILAL For pring of Package
			  if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
					
					setService = setService +'<td class="col-md-1 center" ><a style="cursor:pointer;"> '
				                            +'<button class="btn btn-xs btn-success" ' 
				                            +'  onclick="printopdpackage('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" '
				                            +'value="EDIT"><i class="fa fa-print"  id=btnpack'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
		        }
			}
			
			
			setService = setService +	'<td class="only-checkbox" >';
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N" && t.listBillNobleServiceDto[i].cancle=="N"){
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" checked=checked id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
				
			}else{
				
				//setService = setService +	'<input type="checkbox" disabled="disabled" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" disabled id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
			}
		}
		
				
		setService = setService +	'</td>';
		
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';		
		
		var sampleType = t.listBillNobleServiceDto[i].sampleTypeId;
		var collectionChargesSampleTypeId = $("#collectionChargesSampleTypeId").val();
		if(collectionChargesSampleTypeId == sampleType){
			
			$("#collectionCharges").val("Y");
		}
	}
	
	$("#serviceData"+j).html(setService);
}

function editOnClickForDoctor(billDetailsId)
{
	$('#queryType').val('update');
	//alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticular').val($('#doccName'+billDetailsId).text());
	$('#perticular').attr('readonly', 'true');
	
	var chargesfromConf=$('#othRates'+billDetailsId).text();
	$('#chargesfromConf').val(chargesfromConf);
	
	
	var a=parseInt($('#sId'+billDetailsId).text());
	
	 $('#servId').val(a).text();
	 $("#serviceid").val(a); 
	 $('#servId option:not(:selected)').prop('disabled', true);
	 
	 var subserviceid= parseInt($('#subserviceid'+billDetailsId).text());
	// alert(subserviceid);
	 $("#subserviceid").val(subserviceid);
	 var d=parseInt($('#docId'+billDetailsId).text());
	 //alert(d);
	 
	 $('#doctorName').select2('val',d);
	 
	/* var d=parseInt($('#dId'+billDetailsId).text());
		$('#doctorName').select2('val',d);
		alert(d);*/
	//var doctorId = $( "#docId"+billDetailsId ).text();
	 //$("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true); 
/*	var d=parseInt($('#dId'+billDetailsId).text());
	 $('#doctorName').select2($('#doccName'+billDetailsId).text());
	 */
	
	$('#rate').val($('#char'+billDetailsId).text());
	//$('#rate').attr('readonly', 'true');

	//$('#qty').val($('#q'+billDetailsId).text());
	$('#qty').val(1);
	$('#qty').attr('readonly', 'true');
	$('#concession').val($('#con'+billDetailsId).text());
	//$('#concession').val(0);
	//$('#concession').val($('#con'+billDetailsId).text());
	//$('#concession').val(0);
	$('#concessionOnPerc').val($('#consPerc'+billDetailsId).text());
	//$('#concessionOnPerc').val(0);
	//$('#concession').attr('readonly', 'true');
	$('#amount').val($('#char'+billDetailsId).text());
	
	$('#pay').val(0);
	//$('#pay').val($('#p'+billDetailsId).text());
	$('#pay').attr('readonly', 'true');
	$('#coPay').val($('#cP'+billDetailsId).text());
	$('#coPay').attr('readonly', 'true');
	
	$('#chkOpdBill'+billDetailsId).change(function() {
         // alert("HI"+billDetailsId);
            clearAllFieldsOfOpd();       
    });
	
	$("#narrationBill").val('narrationBill');
}

function editOnClick(billDetailsId)
{
	
	$('#perticular').attr("readonly",false);
	$('#servId').select2('enable');
	
	$('#queryType').val('update');
	//alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticular').val($('#catName'+billDetailsId).text());
	
	//
	var sndtolabflag	= $("#sndtolabflag"+billDetailsId).text().trim();	    	
 	var sndtoRisflag = $("#sendToRisId"+billDetailsId).text().trim();
	$("#sndtolabflag").val(sndtolabflag);
	$("#sendToRisId").val(sndtoRisflag);
	
	var chargesfromConf=parseFloat($('#othRates'+billDetailsId).text());
	$('#chargesfromConf').val(chargesfromConf);
	
	/* var defchargesfromConf=$('#genRate'+billDetailsId).text();		
	 $('#defchargesfromConf').val(defchargesfromConf);*/
	var f=parseInt($('#sampleType'+billDetailsId).text());
	$("#sampleType").val(f);
	
	var bbbb = $('#barCodeId'+billDetailsId).text().trim();
	if(Number(bbbb) == 0){
		$("#barcodeNo").val('');
	}else{
		$("#barcodeNo").val(bbbb);
	}
	
	$('#collectionDate').val($('#collectionDate'+billDetailsId).text());
	$('#collectionTime').val($('#collectionTime'+billDetailsId).text());
	
	var a=parseInt($('#sId'+billDetailsId).text());
	
	 //$('#servId').val(a).text();
	 $('#servId').select2('val',a);
	 $("#serviceid").val(a); 
	 
	  if(a == '11' || a == '12' || a == '13'){  // addeded Rohini
		
		  var treatmentId=$('#treatmentId').text();
			
		  if(a == '11'){
				cancelLabTestCheckService(treatmentId,billDetailsId); 
			  }else if(a == '12'){
				  cancelRisTestforEditCheck(billDetailsId,'edit');
			  }else if(a == '13'){
				  cancelLabTestCheckService(treatmentId,billDetailsId); 
				  cancelRisTestforEditCheck(billDetailsId,'edit');
			}
			//cancelLabTestCheckService(treatmentId,billDetailsId); 
			//cancelRisTest(billDetailsId,'edit');
			//cancelRisTestforEdit(billDetailsId,callFrom);
			
            var sndtolabflag	= $("#sndtolabflag"+billDetailsId).text().trim();	    	
	    	var sndtoRisflag = $("#sendToRisId"+billDetailsId).text().trim();
			
			if(cancelTestSmplColFlag=="Y" || risReportFlag=="Y" || sndtolabflag == "Y" || sndtoRisflag == "Y"){
				$('#servId').select2('disable');
				$('#perticular').attr("readonly",true);
			}			
		   
	  }
	
	// $('#servId option:not(:selected)').prop('disabled', true);
	 
	 var subserviceid= parseInt($('#subserviceid'+billDetailsId).text());
	 $('#selPerticular').select2('val',subserviceid);
	// alert(subserviceid);
	 $("#subserviceid").val(subserviceid);
	 //$("#servId").attr("readonly", true);
	// $('#servId').attr("disabled", true);
	 var spId = parseInt($('#spclId'+billDetailsId).text());
	 $("#specialityId").select2('val',spId);
	 
	 getDoctorBySpecialization('generalOpdBill','doctorName');
	 
	var d=parseInt($('#dId'+billDetailsId).text());
	$('#doctorName').select2('val',d);
	
	$('#rate').val($('#char'+billDetailsId).text());
	
	$('#qty').val($('#q'+billDetailsId).text());
	
	$('#concession').val($('#con'+billDetailsId).text());
	//$('#concession').val(0);
	
	$('#concessionOnPerc').val($('#consPerc'+billDetailsId).text());
	//$('#concessionOnPerc').val(0);
	var amt=Number($('#char'+billDetailsId).text()) * Number($('#q'+billDetailsId).text());
	
	//Added By Tarique Aalam
	var emrP =parseFloat($('#emrP'+billDetailsId).text());	
	$('#emrPer').val(emrP); 
	if (emrP > 0) 
	{
		$("#emrChrFlag").prop("checked", true);
		$('#emrPer').css("display","inline");
	}
/*	$('#rate2').val($('#char'+billDetailsId).text());*/
	
	$('#amount').val(amt);
	$('#amount').attr('readonly', 'true');
	$("#testAmtBeforeEdit").val(amt);
	
	//$('#pay').val($('#p'+billDetailsId).text());
	$('#pay').val(0);
	
	$('#coPay').val($('#cP'+billDetailsId).text());
	
	$('#chkOpdBill'+billDetailsId).change(function() {
           clearAllFieldsOfOpd();           
   });
	
	$('#packBtnClr'+billDetailsId).change(function() {
        clearAllFieldsOfOpd();           
	});
	
	$("#narrationBill").val('narrationBill');
	$('#rate2').val($('#char'+billDetailsId).text());
	
	$("#sndtolabflag").val($('#sndtolabflag'+billDetailsId).text());
//Sanjay kr Shah
	var sendToRisId = $('#sendToRisId'+billDetailsId).text();
	$("#sendToRisId").val(sendToRisId);
	
	var isServModify = $('#isServModify'+billDetailsId).text();
	if(isServModify == "N"){
		
		$('#rate').attr('readonly', 'true');
		$('#amount').attr('readonly', 'true');
		$('#rateOpdSponsor').attr('readonly', 'true');
		$('#amountOpdSponsor').attr('readonly', 'true');
	}else{

		$('#rate').removeAttr('readonly');
		$('#amount').removeAttr('readonly');
		$('#rateOpdSponsor').removeAttr('readonly');
		$('#amountOpdSponsor').removeAttr('readonly');
	}
}


/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion
 ***********/
function setallservautocompleteOnBilling(inputID) {
	//var	listofunit=[];
	//var resultData = [];
	var findingName = $("#" + inputID).val();
	
	if(findingName == null || findingName == "null" || findingName == undefined || findingName == "undefined"){
		
		findingName = "";
	}
	
	var unit = $("#uId").val();
 	//var unitlist=listofunit.slice(1); 
	var unitlist="";
	var depdocdeskid = $("#depdocdeskid").val();
	
	var q=$('#queryType').val();
	var serviceid = 0;
	var querytype="all";
	if(q == "update"){
		serviceid =$("#servId").val(); 
	}else{
		serviceid= $("#servId").val(); 
	}
	var userId = $("#userId").val();
	
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + encodeURIComponent(findingName));
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	
	/*inputs.push('userId=' + userId);
	inputs.push('unitid=' + unit);
	inputs.push('categoryName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('dept_id=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);*/
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",
		//url : "ehat/testautosuggest/getTestAutosuggestion",
	
		success : function(r) {
	        
			autoCompDoctorDeskOnBilling(r,inputID);
			//autoCompDoctorDeskOnBilling2222(r,inputID);
			
		}
	});
}

function setallservautocompleteOnBillingForNormal(inputID){

	//var	listofunit=[];
	//var resultData = [];
	var findingName = $("#" + inputID).val();
	
	if(findingName == null || findingName == "null" || findingName == undefined || findingName == "undefined"){
		
		findingName = "";
	}
	
	var unit = $("#uId").val();
 	//var unitlist=listofunit.slice(1); 
	var unitlist="";
	var depdocdeskid = $("#depdocdeskid").val();
	
	var q=$('#queryType').val();
	var serviceid = 0;
	var querytype="all";
	if(q == "update"){
		serviceid =$("#servId").val(); 
	}else{
		serviceid= $("#servId").val(); 
	}
	var userId = $("#userId").val();
	
	var inputs = [];
	
	
	inputs.push('userId=' + userId);
	inputs.push('unitid=' + unit);
	inputs.push('categoryName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('dept_id=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "ehat/autoallservicestest/getallservices",
		url : "ehat/testautosuggest/getTestAutosuggestion",
	
		success : function(r) {
	        
			//autoCompDoctorDeskOnBilling(r,inputID);
			autoCompDoctorDeskOnBilling2222(r,inputID);
			
		}
	});

}


function autoCompDoctorDeskOnBilling2222(r,id){
	
	var htm='';
	htm = htm + "<option id='0' >-- Select Service --</option>";
	for(var i=0; i< r.lstService.length; i++){
		
		htm = htm + "<option class='"+r.lstService[i].categoryid+"_"+r.lstService[i].categoryName+"_"+r.lstService[i].categorycharges+"_"+r.lstService[i].concession+"_"+r.lstService[i].amount+"_"+r.lstService[i].iscombination+"_"+r.lstService[i].isModify+"_"+r.lstService[i].serviceid+"_"+r.lstService[i].serviceName+"_"+r.lstService[i].templateWise+"' value='"+r.lstService[i].categoryid+"' style='width:100%'>"+r.lstService[i].categoryName+"   </option> ";
	   //htm=htm+"<input type='hidden' id='autoId"+r.lstService[i].categoryid+"'  value='"+r.lstService[i].categoryid+"_"+r.lstService[i].categoryName+ "'/>";
	}
	
	$("#"+id).html(htm);
	$("#"+id).select2();
}

function setProfileDetails(){
	
	        //var data= $(".selPerticular").val();
	var data= $('select[name="selPerticular"] :selected').attr('class');
	       var dataarray= data.split("_");
	       
	        var categoryId=dataarray[0];
	        var categoryName=dataarray[1];
	        var categoryCharges=dataarray[2];
	        var isCombination=dataarray[5];
	        var isModify=dataarray[6];
	        var serviceid=dataarray[7];
	        var servicename=dataarray[8];
	        var templateWise=dataarray[9];
	
		
		
		$("#templateWiseTestFlag").val(templateWise);
		$('#perticular').val(categoryName);
		$('#selPerticular').val(categoryId);
		//var isModify=ui.item.isModify;
		if(isModify=="N"){
			$("#rate").prop("disabled", true);
		}else{
			$("#rate").prop("disabled", false);
		}
		$("#subserviceid").val(categoryId);
		$("#servicename").val(servicename);
		$("#serviceid" ).val(serviceid);
		var subservid =categoryId;
		//Added By BILAL 
		
		var yearwisecharges = getyearwisecharges(subservid);
		
		if (yearwisecharges > 0) {
			$("#rate" ).val(yearwisecharges);
			$("#rate2" ).val(yearwisecharges);   // added by Tarique Aalam
		}else{
			$("#rate" ).val(categoryCharges);
			$("#rate2" ).val(categoryCharges); // added by Tarique Aalam
		} 
		
		//$("#concession" ).val(ui.item.concession);
		//$("#amount" ).val(ui.item.amount);
		$("#servId" ).select2('val',serviceid);
		$("#iscombination").val(isCombination);
		//@auhtor-tk @date - 05-feb-2018 @reason open doctor list after selecting service name
		$('#doctorName').select2('open');
		//$('#specialityId').select2('open');
		
		calculatePerticularTotal1();
		calculate123('general');// added by tarique aalam
		//Added by Kishor
		
		if(isCombination == "Y"){
			setPackageBarcodePopup(serviceid, categoryId);
		///}else if(isPkg == 'N'){
		}else{
			
			if(serviceid == 11){
				
					getPathologyPreDetails(serviceid,categoryId);
				
				
			}					
		}

	return false;
	

}

function setallservautocompleteOnBillingForSponsor(inputID){

	var findingNames = $("#" + inputID).val();
	var sugVal = $("#inputAuto").val();
	
	//if(sugVal != findingNames && findingNames!="" ){
		
	if(sugVal != findingNames){
		var sponsorId = parseInt($("#SponsorsourceTypeId").val());
		var chargesSlaveId = parseInt($("#chargesSlaveId").val());
		
		if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
			sponsorId = 0;
		}
		if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
			chargesSlaveId = 0;
		}
		//var	listofunit=[];
		//var resultData = [];
		var findingName = $("#" + inputID).val();
		var unit = $("#uId").val();
		var userId = $("#userId").val();
		//var unitlist=listofunit.slice(1); 
		var unitlist="";
		var depdocdeskid = $("#depdocdeskid").val();
		 
		var querytype="all";
	    var serviceid=$('#servIdOpdSponsor').val(); 
	    var hallId = 0;
		var hallSlaveId = 0;
		var treatId=$("#treatId").val();
		
		var inputs = [];
		inputs.push('unit=' + unit);
		inputs.push('findingName=' + encodeURIComponent(findingName));
		inputs.push('unitlist=' + unitlist);
		inputs.push('depdocdeskid=' + depdocdeskid);
		inputs.push('querytype=' + querytype);
		inputs.push('serviceid=' + serviceid);
		inputs.push('sponsorId=' + sponsorId);
		inputs.push('chargesSlaveId=' + chargesSlaveId);
		inputs.push('hallId=' + hallId);
		inputs.push('hallSlaveId=' + hallSlaveId);
		inputs.push('treatId=' + treatId);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			
			data : {
				"unitid" : unit,
				"userid" : userId,
				"dept_id" : depdocdeskid,
				"serviceid" : serviceid,
				"categoryName" : encodeURIComponent("")
			},
			url : "ehat/testautosuggest/getSponsorTestAutosuggestion",
			success : function(r) {
				setSponsorServiceList(r,inputID);
			}
		});
		//$("#inputAuto").val(findingName);
	}
	

}

function setSponsorServiceList(r,id){
	
	var htm='';
	htm = htm + "<option id='0' >-- Select Service --</option>";
	for(var i=0; i< r.lstService.length; i++){
		
		htm = htm + "<option class='"+r.lstService[i].categoryid+"_"+r.lstService[i].categoryName+"_"+r.lstService[i].categorycharges+"_"+r.lstService[i].concession+"_"+r.lstService[i].amount+"_"+r.lstService[i].iscombination+"_"+r.lstService[i].isModify+"_"+r.lstService[i].serviceid+"_"+r.lstService[i].serviceName+"_"+r.lstService[i].templateWise+"' value='"+r.lstService[i].categoryid+"' style='width:100%'>"+r.lstService[i].categoryName+"   </option> ";
	   //htm=htm+"<input type='hidden' id='autoId"+r.lstService[i].categoryid+"'  value='"+r.lstService[i].categoryid+"_"+r.lstService[i].categoryName+ "'/>";
	}
	
	$("#"+id).html(htm);
	$("#"+id).select2();
}


function setProfileDetailsForSponsor(){
	var data= $('select[name="selPerticularOpdSponsor"] :selected').attr('class');
    var dataarray= data.split("_");
    
     var categoryId=dataarray[0];
     var categoryName=dataarray[1];
     var categoryCharges=dataarray[2];
     var isCombination=dataarray[5];
     var isModify=dataarray[6];
     var serviceid=dataarray[7];
     var servicename=dataarray[8];
     var templateWise=dataarray[9];

	$("#templateWiseTestFlag").val(templateWise);
	//var categoryid= ui.item.categoryid;
	    $('#categoryids').val(categoryId);
	   // var isModify=ui.item.isModify;
		if(isModify=="N"){
			$("#rate").prop("disabled", true);
			$("#rateOpdSponsor").prop("disabled", true);
		}else{
			$("#rate").prop("disabled", false);
			$("#rateOpdSponsor").prop("disabled", false);
		}
	//	var iscombination = ui.item.iscombination;
		var iscombination=isCombination;
		var isComServlastId = 0;
		if(iscombination == "Y"){
			
			//isComServlastId = ui.item.categoryid;
			isComServlastId =categoryId;
		}
		getSponsorTestCharges(isComServlastId,categoryId);
		var valsponsor = $("#sponsorTestCharges").val();
		var yearWiseSponsorTestCharges = $("#yearWiseSponsorTestCharges").val();
		
	  
	    
		$('#perticularOpdSponsor').val(categoryName);
		
		$("#subserviceid").val(categoryId);
		$("#servicename").val(servicename);
		$("#serviceid" ).val(serviceid);
		
		
		var yearwisecharges = yearWiseSponsorTestCharges;
		
		
		if (Number(valsponsor) > 0) {
			
			$("#rateOpdSponsor").val(valsponsor);
			$("#rateOpdSponsor2").val(valsponsor);
			if (Number(yearwisecharges) > 0) {
				
				$("#defchargesfromConf").val(yearwisecharges);
			}else{
				
				$("#defchargesfromConf").val(categoryCharges);
			}
		}
		else {
			
			if (Number(yearwisecharges) > 0) {
				$("#rateOpdSponsor" ).val(yearwisecharges);
				$("#defchargesfromConf").val(yearwisecharges);
				$("#rateOpdSponsor2" ).val(yearwisecharges);
			}else{
				$("#rateOpdSponsor" ).val(categoryCharges);
				$("#defchargesfromConf").val(categoryCharges);
				$("#rateOpdSponsor2" ).val(categoryCharges);
			}
		}
		$("#servIdOpdSponsor" ).val(serviceid);

		$("#iscombinationsponsor").val(isCombination);
		//@auhtor-tk @date - 05-feb-2018 @reason open doctor list after selecting service name
		$('#doctorNameOpdSponsor').select2('open');
		
		
		calculatePerticularTotalOpdSponsor();
		calculate123('sponsor');
		
		//Added by Kishor
		if(isCombination == "Y"){
			setPackageBarcodePopup(serviceid, categoryId);
		///}else if(isPkg == 'N'){
		}else{
			if(serviceid == 11){						
				getPathologyPreDetails(serviceid,categoryId);
			}
		}		
	return false;
	

}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion services
 ***********/
function autoCompDoctorDeskOnBilling(response,id) {
	
	
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
					name : 'CategoryName',
					width : '150px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '100px',
					valueField : 'serviceName'
				},{
					name : 'categorycharges',
					width : '100px',
					valueField : 'categorycharges'
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					
					
						//var tempstr=ui.item.templateWise;
						//var tempFalg=	tempstr.startsWith("H");
						var tempWise = ui.item.templateWise;
						$("#templateWiseTestFlag").val(ui.item.templateWise);
						$('#perticular').val(ui.item.categoryName);
						var isModify=ui.item.isModify;
						if(isModify=="N"){
							$("#rate").prop("disabled", true);
						}else{
							$("#rate").prop("disabled", false);
						}
						$("#subserviceid").val(ui.item.categoryid);
						$("#servicename").val(ui.item.serviceName);
						$("#serviceid" ).val(ui.item.serviceid);
						var subservid =ui.item.categoryid;
						//Added By BILAL 
						
						var categoryid = ui.item.categoryid;
						
						var isCombServLastId = 0;
						if(ui.item.iscombination=="Y")
							isCombServLastId = categoryid;
						
						var b2bCharges = getB2BChargesForOpd(isCombServLastId,categoryid);
						
						if(b2bCharges > 0){
							$("#rate" ).val(b2bCharges);
							$("#rate2" ).val(b2bCharges);  							
						}else{
							
							var yearwisecharges = getyearwisecharges(subservid);
							
							if (yearwisecharges > 0) {
								$("#rate" ).val(yearwisecharges);
								$("#rate2" ).val(yearwisecharges);   // added by Tarique Aalam
							}else{
								$("#rate" ).val(ui.item.categorycharges);
								$("#rate2" ).val(ui.item.categorycharges); // added by Tarique Aalam
							} 
							
						}
						
						$("#concession" ).val(ui.item.concession);
						$("#amount" ).val(ui.item.amount);
						$("#servId" ).select2('val',ui.item.serviceid);
						$("#iscombination").val(ui.item.iscombination);
						//@auhtor-tk @date - 05-feb-2018 @reason open doctor list after selecting service name
						$('#doctorName').select2('open');
						//$('#specialityId').select2('open');
						
						calculatePerticularTotal1();
						calculate123('general');// added by tarique aalam
						//Added by Kishor
						
						if(ui.item.iscombination == "Y"){
							setPackageBarcodePopup(ui.item.serviceid, ui.item.categoryid);
							
							//added by vishant
							fetchPackageCharges(ui.item.categoryid);
							
						///}else if(isPkg == 'N'){
						}else{
							
							if(ui.item.serviceid == 11){
								
									getPathologyPreDetails(ui.item.serviceid,ui.item.categoryid);
								
								
							}
							else if(ui.item.serviceid == 12){ //Added Rohini Ambhore ris test 
								
								var isDuplicate = getInvstigationPreDetails(ui.item.serviceid, ui.item.categoryid);
								if(isDuplicate > 0){
									alert("Test/Profile Already Added");
									clearAllFieldsOfOpd();
									return false;
								}
							}
							/*else{
								
								var isDuplicate = setCollectionCharges(ui.item.serviceid, ui.item.categoryid);
								if(isDuplicate > 0){
									alert("Test/Profile Already Added");
									clearAllFieldsOfOpd();
									return false;
								}
							}*/							
						}
				
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
					$('#ui-id-1').css("z-index", "10000000000");
					
					
				}
			});
}

function setCollectionCharges(servId,subServId){
		
	var response = "";
	var unitId = $("#unitId").val();
	var businessType = $("#businessType").val();
	var	patientId   =  $("#pId").val();
	var treatmentId  =  $("#tId").val();
	
	var inputs = [];
		inputs.push('serviceId=' + servId);
		inputs.push('subServiceId=' + subServId);
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/checkDuplicateCollectionCharges",
		success : function(r) {
			response = r;
			if(servId == 12){
				
				var risSampleTypeId = $("#risSampleTypeId").val();
				$("#sampleType").val(risSampleTypeId);
				$("#barcodeNo").val("NA");
			}else{
				
				var collectionChargesSampleTypeId = $("#collectionChargesSampleTypeId").val();
				$("#sampleType").val(collectionChargesSampleTypeId);
				$("#barcodeNo").val("NA");
			}
		}
	});
	return response;
}

function checkDuplicateServicesFromPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId){
	var response = "";
	var inputs = [];
		inputs.push('serviceId=' + serviceId);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/checkDuplicateServicesFromPackage",
		success : function(r) {
			response = r;
		}
	});
	return response;
}

function setPackageBarcodePopup(serviceId, subServiceId){
	var unitId = $("#unitId").val();
	var businessType = $("#businessType").val();
	var billDetailsId =$('#billDetailsId').val();
	var	patientId   =  $("#pId").val();
	var treatmentId  =  $("#tId").val();
	
	var iscombination = $("#iscombination").val();
	if(iscombination == "Y"){
		var packageSampleTypeId = $("#packageDefaultSampleTypeId").val();
		if(packageSampleTypeId == 0){
			alert("Please add sample type for package.");
			closeAndResetBarcodePopup();
			return false;
		}else{
			$('#sampleType').val(packageSampleTypeId);
		}
	}
	
	$("#barcodeNo").val("NA");
	var checkDuplicate = checkDuplicateServicesFromPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	if(checkDuplicate == "Package" || checkDuplicate == "Profile"){
		var msg = "";
		if(checkDuplicate == "Package"){
			msg = "Given package is already exists.";
		}else{
			msg = "Some of the tests are already exists.";
		}
		alert(msg);

		//clearAllFieldsOfIpd();
		$("#perticular").focus();
		heightCount = 0;
		weightCount = 0;
		urineVolumeCount = 0;
		$("#txtautoserviceName").val('');
		$("#chargesubservice").val('');
		$("#dynamicItem").html("");
		
		closeAndResetBarcodePopup();
		
		
		
		return false;
	}
	
	var inputs = [];
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('serviceId=' + serviceId);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getSampleWiseProfileFromPackage",
		success : function(r) {
			resetBarcodePopup();
			//getDefaultBarcodeForPackage(serviceId, subServiceId, unitId, businessType, patienttId, treatmentId, billDetailsId);
			setTemplateForSampleWiseBarcode(r);
		}
	});
}

function getDefaultBarcodeForPackage(serviceId, subServiceId, unitId, businessType, patienttId, treatmentId, billDetailsId){
	var response = "";
	var inputs = [];
		inputs.push('serviceId=' + serviceId);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getDefaultBarcodeForPackage",
		success : function(r) {
			response = r;
		}
	});
	return response;
}

function setTemplateForSampleWiseBarcode(r){
	
	var htm = "";
	for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++){
		htm = htm
			+ '<tr class="">'
				+ ' <td class="col-md-1 center"><input type="hidden" id="barcodeSampleId'+(i+1)+'" value="0">'+(i+1)+'</td>'
				+ ' <td class="col-md-1 center">'+r.labSampleWiseMasterDtoList[i].samplename+'<input type="hidden" id="barcodeSampleName'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].sampleId+'"></td>'
				+ ' <td class="col-md-1 center" id="barcodeSampleTests'+i+'">'+r.labSampleWiseMasterDtoList[i].testName+'<input type="hidden" id="barcodeSampleTestsId'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].masterId+'"></td>'
				+ ' <td class="col-md-1 center" id="barcodeSampleNumber'+(i+1)+'"><input type="text" class="form-control" id="barcodeSampleNo'+(i+1)+'" onchange="barcodeValidation(this.id)" placeholder="Enter Barcode No" name="barcodeSampleNo'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].barCode+'" maxlength="14"></td>'
			+ '</tr>';
	}
	$("#sampleWiseBarcodeTableBody").append(htm);
	//$("#sampleWiseBarcode").modal('show');
}

function saveSampleWiseBarcodes(){
	var response = 0;//checkDuplicateBarcodeForPackage("savePackage");
	if(response > 0){
		alert("Barcode Number allready Exists !!!.");
	}else{
		$("#sampleWiseBarcode").modal('hide');
	}
}

function checkDuplicateBarcodeForPackage(callFrom){
	var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());
	var barcode = "";
	var response = "";
	
	if(callFrom == "editPackage"){
		barcode = $("#packageBarcodeId").val();
	}
	
	var unitId = $("#unitId").val();
	var businessType = $("#businessType").val();
	var billDetailsId =$('#billDetailsId').val();
	var	patientId   =  $("#pId").val();
	var treatmentId  =  $("#tId").val();
	
	var inputs = [];
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
		inputs.push('barcode=' + barcode);
		inputs.push('sampleWiseBarcodes=' + sampleWiseBarcodes);
		inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/checkDuplicateBarcodeForPackage",
		success : function(r) {
			response = r;
		}
	});
	return response;
}

function closeAndResetBarcodePopup(){
	resetBarcodePopup();
	clearAllFieldsOfOpd();
	$("#sampleWiseBarcode").modal('hide');
}

function resetBarcodePopup(){
	var tableHeaderRowCount = 1;
	var reagentTable = document.getElementById('sampleWiseBarcodeTable');
	var rowCount = reagentTable.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		reagentTable.deleteRow(tableHeaderRowCount);
	}
}

function readSampleWiseBarcodes(){
	var subList = {	labSampleWiseMasterDtoList : [] };
	var count = 0;
	var totalRow = $('#sampleWiseBarcodeTableBody tr').length;
	for(var i = 1; i <= totalRow; i++) {
		count++;
		var sampleTypeId = $("#barcodeSampleName" + count +"").val();
		var masterIds = $("#barcodeSampleTestsId" + count + "").val();
		var barcodeSampleNo = $("#barcodeSampleNo" + count + "").val();
		
		var subServiceIds = masterIds.split(",");
		
		if(subServiceIds.length > 1){
			for(var num = 0; num < subServiceIds.length; num++)
				subList.labSampleWiseMasterDtoList.push({
					subServiceId	: subServiceIds[num],
					sampleTypeId	: sampleTypeId,
					barCode       	: barcodeSampleNo
			});
		}else{
			subList.labSampleWiseMasterDtoList.push({
				subServiceId	: masterIds,
				sampleTypeId	: sampleTypeId,
				barCode       	: barcodeSampleNo
			});
		}
	}
	return subList;
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 10_June_2017
 * @Code Getting amount 
 ******************************************************************************/


function calculatePerticularTotal1() {
	var rate = ($("#rate").val()).trim();
	var qty = ($("#qty").val()).trim();
	var concession = ($("#concession").val()).trim();
	var concessionOnPerc = ($("#concessionOnPerc").val()).trim();
	
	if (concessionOnPerc == "" || concessionOnPerc == "") {
		$("#concessionOnPerc").val(0);
		return false;
	}
	if(concessionOnPerc < 0){
		$("#concessionOnPerc").val(0);
	}else if(isNaN(concessionOnPerc)){
		//concessionOnPerc = 0;
		$("#concessionOnPerc").val(0);		
	}
	
	if (rate == "") {
		$("#rate").val(0);
	}
	
	if (qty == "" || qty == 0) {
		
		$("#qty").val(1);
		var a=rate * 1;
		setTimeout(function() {
			$("#amount").val(a);
			$("#concessionOnPerc").val(0);
			$("#concession").val(0);
			$("#coPay").val(a);
		}, 50);
	}
	if (concession == "") {
		$("#concession").val(0);
	}
	if (concession > (rate * qty)) {
		var quantity = $("#qty").val();
		if (quantity == 0) {
			// alert("Quantity Cannot Be 0");
			$("#concession").val(0);
			calculatePerticularTotal1();
			return false;
		} else {
			alert("Discount Cannot Be Greater Than " + (rate * qty));
			$("#concession").val(0);
			$("#amount").val(rate * qty);
			$("#coPay").val(rate * qty);
			return false;
		}
	}
	//var amount = ((rate * qty) - concession);
	var amount = ((rate * qty));
	$("#amount").val(Math.round(amount));
	$("#coPay").val(Math.round(amount));
	/*var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	
	if (sponsorId == 1 && chargesSlaveId>0) {

		$("#pay").val(amount);

	} else {

		$("#coPay").val(amount);
		
	}*/

	
	var amount = $("#amount").val();
	var concession = $("#concession").val();
	
	/*var consAmt=((concession * 100 ) / amount);//.toFixed(2);
	$("#concessionOnPerc").val(consAmt);
		*/
	
	
	var SpecialDisc = $("#SpecialDisc").val();
	if (SpecialDisc == 0 && ($("#pay").val()) == 0) {
		
		calculatePerticularCoPay1();
		
	} else {
		
		calculatePerticularPay1();
	}
}


function calculatePerticularCoPay1() {
	var pay = $("#pay").val();
	//var coPay = $("#coPay").val();
	var amount = $("#amount").val();
	var concession = $("#concession").val();
	
	if (pay == "" || amount == "") {
		return false;
	}
	
	if(pay < 0){
		pay = 0;
	}else if(isNaN(pay) == true){
		pay = 0;
	}
	
	var coPay = ((amount - pay)-concession).toFixed(2);	

	if(coPay < 0)
	{
	alert("Pay should be Less Than CoPay");
	$("#pay").val("0");
	//retuen false;
	}
	$("#coPay").val(Math.round(coPay));
}

function calculatePerticularPay1() {
	
	var coPay = $("#coPay").val();
	var amount = $("#amount").val();
	var concession = $("#concession").val();
	
	if (coPay == "" || amount == "") {
		return false;
	}
	if(coPay < 0){
		coPay = 0;
	}else if(isNaN(coPay) == true){
		coPay = 0;
	}
	var pay = ((amount - coPay)-concession).toFixed(2);
	
	var coPay1 = (amount - concession);
	if(pay < 0)
	{
	alert("CoPay should be Less Than Pay");
	$("#coPay").val((Math.round(coPay1)));
	$("#pay").val("0");
	return false;
	//$("#coPay").val("0");
	
	//retuen false;
	}
	$("#pay").val(Math.round(pay));
	//added by Bilal
/*	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	if (sponsorId == 1 && chargesSlaveId > 0) {
		var pay = (amount - concession);
		$("#pay").val(pay);
	}*/
}

function concessionOnPercentage()
{
	var amount = $("#amount").val();
	var concessionOnPerc = $("#concessionOnPerc").val();
	
	if (concessionOnPerc == "" || concessionOnPerc == "") {
		return false;
	}
	if(concessionOnPerc < 0){
		concessionOnPerc = 0;
	}else if(isNaN(concessionOnPerc) == true){
		concessionOnPerc = 0;
	}
	
	if(concessionOnPerc > 100)
		{
		alert("Percentage should be less than 100");
		$("#concessionOnPerc").val(0);
		$("#concession").val(0);
		return false;
		}
	//alert(amount);	
	var conAmt=((concessionOnPerc * amount)/100);//.toFixed(2);
	
	$("#concession").val(Math.round(conAmt));
	
	calculatePerticularTotal1();

}


/************
 *@author	: Kishor Lokhande
 *@date		: 10-June-2017
 *@code		: save ServiceBillDetails
 ***********/
function saveServiceToPatient(callform){
	//document.getElementById("primeLoader").style.display = "block";
	var userId = $("#userId").val();
	var serviceId = $("#serviceid").val();
	
	if(serviceId == null || serviceId == undefined || serviceId == 0 || serviceId == "null" || serviceId == "" || serviceId == "undefined"){
		
		alert("Please select service first!!!");
		return false;
	}
	
	var emrPer=$('#emrPer').val();    // added by Tarique Aalam
	if (emrPer == "" || emrPer == null || emrPer == undefined) 
	{
		emrPer=0;
	}
	
	//Added By BILAL For narration of receipt at the time of edit
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
	
	
	//Added By Kishor For narration of Bill at the time of edit
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
    	 
	
	//added by bilal for getting sponsor charges
	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	
	if (sponsorId > 0 && chargesSlaveId > 0) {
		getcharges();
	}
	
	var SponsorOtherRate  = parseFloat($("#chargesfromConf").val());
	var defchargesfromConf  = parseFloat($("#defchargesfromConf").val());
	//alert(defchargesfromConf);
	
	//var serviceId	 =  $("#serviceid").val(); 
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
	
	//Sanjay Kr Shah
    var sendToRisId = $("#sendToRisId").val().trim();
	
	var queryType  =	$('#queryType').val();
	//var recSlaveId  =	$('#receiptSlaveId').val();	//receipt slave id	
	var doctorId = $( "#doctorName option:selected" ).val();
	
	var billDetailsId =$('#billDetailsId').val();
	//var totalAmt		= parseFloat($("#payable").val()); 
	//var totalPaid		= parseFloat($("#payNow").val());
	
	/*alert(billDetailsId);
	return false;*/
	/*var num = isNaN(parseInt(doctorId)) ? 0 : parseInt(doctorId);*/
	//alert(doctorId);
	var	patienttId   =  $("#pId").val();
	//var doctorId =$('#doctorName').val();
	var treatmentId  =  $("#tId").val(); 
		
	var	departmentId = $("#depdocdeskid").val(); ;
	var billId       =  parseInt($("#billNo").html());//$("#bNo").val();  
	var	sourceTypeId =  $("#sourceTypeId").val();
	var rate         =  $("#rate").val();
	var concession         =  $("#concession").val();
	var quantity     =   $("#qty").val();
	var amount       = $("#amount").val();		
	var pay       = $("#pay").val();
	var coPay       = $("#coPay").val();
	var createdDateTime   = $("#finalDate").val();
	/*alert(createdDateTime);*/
	var subServiceId =  $("#subserviceid").val();
	//alert(subServiceId);
	var pharmaId=$("#pharmacyInvoice").val();
	var  drdeskflag="N";
	var pharmacyInvname = $("#perticular").val();  //Pooja
	var update = $('#queryType').val();
	if(update != "update"){
		if(subServiceId == 0 && pharmacyInvname != ""){
			subServiceId = 9;
			serviceId =$("#pharmacyInvoice").val();//only for invoice 
			//serviceId =$("#servId").val();//only for invoice 
			drdeskflag =$("#perticular").val();
		}
	}else{
		if(serviceId == pharmaId && subServiceId == 9 && pharmacyInvname != ""){
			drdeskflag =$("#perticular").val();
	}
		}
	
	//return false;
	
	
	if(subServiceId == 0){
		alert("Please enter valid service Name");
		clearAllFieldsOfOpd();
		return false;
	}
	
	//Added By Kishor For Barcode PopUP
	var barcodeNo=0;//$('#barcodeNo').val();
	
	/*if(iscombination == "Y"){
		
	}else{
		if($('#businessType').val() == 2){				
			if(barcodeNo == 0 || barcodeNo == "" || barcodeNo == null || barcodeNo == undefined) {
				alertify.error("Please Enter Barcode!!!");
				return false;
			}
		}
	}*/
	
	var ratevalidation = $('#rate').val();
	/*if (ratevalidation == "" || ratevalidation == null || ratevalidation == undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
		ratevalidation = 0;
		alert("Please Enter Rate");
		return false;
	}*/
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
    if(SponsorOtherRate== -10)	
    	{
    	otherRate=rate;
    	 otherAmount=(rate * quantity) ;
	  // alert("In iff"+otherAmount);
    	
    	var otherconAmt=((concessionOnPerc * otherAmount)/100).toFixed(2);
	     otherCoPay=0;
	    
	     otherPay=amount-otherconAmt;
	        otherConcession  =  otherconAmt;
	   // alert(otherPay);
    	}
    else{
    	
   	 // var otherRate=chargesfromConf ;
		if (sponsorId > 0 && chargesSlaveId > 0) {
			otherRate = SponsorOtherRate;
		} else {
			otherRate = rate;
		}
    	
	     otherAmount=(otherRate * quantity);
	    
	    var otherconAmt=((concessionOnPerc * otherAmount)/100).toFixed(2);
    			    
	    //alert("In else"+otherAmount);
	     otherCoPay=0;
	    
	     otherPay=otherAmount-otherconAmt;
	        otherConcession  =  otherconAmt;
	    //alert(otherConcession);
	 
    }
   
    var tempDate = createdDateTime.split("/");
	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
    
	if (subServiceId == "" || subServiceId == null || subServiceId == undefined || isNaN(subServiceId)) {
		subServiceId = 0;
	}
	
	var templateWiseTestFlag = $("#templateWiseTestFlag").val();
	
	/*if (subservicesname == "" ||  subservicesname ==null) {
		alert("Please enter servicename ");
		return false;
	}*/
	if(unitId ==0){
		unitid = $("#allunitid").val();
	}
	/*var doctorsel = $("#doctor2 :selected").val();
	
	if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
		alert("Please Select doctor ");
		return false;	
	}
	if (ClinicalNotes == "" ||  ClinicalNotes ==null) {
		ClinicalNotes="-";
	}
	if (instructions == "" ||  instructions ==null) {
		instructions="-";
	}*/
	//added by kishor for pathology
	var sampleTypeId  =	$('#sampleType').val();
	//var barCode  =	$('#barCode').val();
	var inOutHouse = 0;
	var histopathLab = "N";
	if(serviceId == 11){
		
		inOutHouse = $('#inOutHouseCount').val();
		histopathLab = $('#histopathLab').val();
	}
	
	
	var customerType = 0; //$('#customerType').val();	
	var customerId = 0; //$('#customerId').val();	
	var businessType = 2;//$('#businessType').val();
	var prepaidReceiptId = 0;//$('#prepaidReceiptId').val();
	var collectionDate = $('#collectionDate').val();
	var collectionTime = $('#collectionTime').val();
	var regRefDocId = 0;//$('#refDocId').val();

	// Added for validate
	if(sampleTypeId <= 0 || sampleTypeId == undefined){
		//alert("Please Select Sample Type!");
		//return false;
		sampleTypeId = 0;
	}
	
	if(parseInt(doctorId) > 0)
	{
		var specialityId = $('#specialityId').val();
		if(specialityId == undefined || specialityId == null || specialityId == "0"){
			alert("Please Select Doctor Speciality!");
			return false;
			specialityId = 0;
	}
	}
	
	var defaultFlag = $("#defaultPkgFlag").val();
	//var validationResult = validateBusinessAmountLimit(amount);
	
	var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());
		var serviceDetails = {
			listBillDetails : []
		};
		serviceDetails.listBillDetails.push({
			
			patienttId : patienttId,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			specialityId : specialityId,
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
			//coPay : rate * quantity,
			serviceId : serviceId,
			subServiceId : subServiceId,
			unitId : unitId,
			createdBy : userId,
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
            //otherPay : otherPay,
            otherPay : otherRate * quantity,
            otherConcession : otherConcession,
            concessionOnPerc : concessionOnPerc,
            iscombination : iscombination,
            receiptOf  :  receiptOf,
            narrationid : narrationid,
            narrationidBill : narrationidBill,
            accountStatusOpdDiagno : "N",
       		emrPer : emrPer,
            sndToLabFlag : sndToLabFlag,
			sndToRisFlag:sendToRisId,
			drdeskflag : drdeskflag,
			sampleTypeId : sampleTypeId,
			barCode : barcodeNo,
			inOutHouse : inOutHouse,
			//inOutHouse : 0,
			histopathLab : histopathLab,
			businessType : businessType,
			customerId : customerId,
			customerType : customerType,
			invoiceRemainAmount : amount,
			prepaidReceiptId : prepaidReceiptId,
			collectionDate : collectionDate,
			collectionTime : collectionTime,
			regRefDocId : regRefDocId,
			templateWise : templateWiseTestFlag,
			ivfTreatFlag : "N",
			defaultFlag : defaultFlag
		});
		
		serviceDetails = JSON.stringify(serviceDetails);
	
	var inputs = [];
	// patient details push
	inputs.push("serviceDetails="+ encodeURIComponent(serviceDetails));
	inputs.push("queryType="+ queryType);
	inputs.push("module="+ inOutHouse);
	//inputs.push("module="+ 0);
	inputs.push("callfrom="+ callfrom);
	inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
	/*inputs.push("billDetailsId="+ encodeURIComponent(recSlaveId));*/
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/saveCpoe",
		error 	: function() {
					alert('Network Issue!!!');
		  		},
		success : function(r) {
							 
	//	if(r >0){
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
			/*if(r ==1 && queryType=='insert')
				{
				  alertify.success("Service assign Sucessfully");
				  //alert("Service assign Sucessfully");
				}
			else if(r ==1 && queryType=='update'){
				alertify.success("Service Update Sucessfully");
				//alert("Service Update Sucessfully");
				
				}*/
			
				//getPatientBillAmount(treatmentId);
		
			   calculatePerticularTotal1();	
			 
			//}			
		}	
	});

	updateBillMasterTotalForOPD();
	clearAllFieldsOfOpd();

	/*$(".openAllSlave").trigger('click');	
	getBillReceiptDetails('all');			
	
	if(callfrom != "reciept"){
		
		setTotalPaid();
	}*/
	//$(".openAllSlave").trigger('click');
	
	//resetAll('general');
	//window.location.reload(true);
	//$('#perticular').attr('readonly', 'false'); 
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
	//window.location.reload(true);
	setTimeout(function() {
		//sendToPhlebotomyFromSave(0);
	}, 900);
	
	var sendTestFlagMeesha=$("#sendTestFlagMeesha").val();
	if(sendTestFlagMeesha == "on"){
		sendToPhlebotomyFromSave(0);// send test automatically to LIS after save
	}
	resetAll('general'); // added by Rohini to refresh test
}
	
	

/************
 *@author	: Kishor Lokhande
 *@date		:  18--2017
 *@code		:delete Sub-Service
 ***********/
function deleteServiceToPatient(billDetailsId){
	
	  var callFrom  =$("#preId").val();
	 
	  if(callFrom == "treatclose"){
             
				var labservicelist=[];	
				
					$('input[name=opdBillCheckbox]:checked').each(function() {
			
					labservicelist.push(parseInt($(this).val()));
					});
			
				if (labservicelist.length == 0) {
					alert("Please check  at least Service to delete");
			
					}
				deleteservdetailsPreviousOPD(labservicelist);
		}	
	  else{
			
				var isCheked = $('#chkOpdBillReg1').is(":checked");
				var isValue = $('#chkOpdBillReg1').val();
			
				if (isCheked == true && isValue == 1) {
					alert("You can not delete Registration charges !");
					return false;
				}
					
				var labservicelist=[];	
				var treatId=$('#treatId').val();
				var callFrom="BILL";
				var deleteType="Y";
					$('input[name=opdBillCheckbox]:checked').each(function() {
			
					labservicelist.push(parseInt($(this).val()));
					});
			
				if (labservicelist.length == 0) {
					alert("Please check  at least Service to delete");
			
					}
				
				//Added by Laxman Call for delete test in lab.
				//deleteLabTest(labservicelist,treatId,deleteType);
				if(deleteTestSmplColFlg=="Y"){
					alert("Test Sample are collected,You can't cancel or delete this Test.");
					return false;
				}
				//Added by Vikas Godse for Delete Investigation Test From Billing
				deleteInvTestFromBill(labservicelist,deleteType);
				if(risReportFlag=="Y"){
					alert("Test Report are created,You can't cancel or delete this Test.");
					return false;
				}
				var inputs = [];	
				inputs.push("labservicelist="+ encodeURIComponent(labservicelist));
				inputs.push("callform="+ callFrom );
				var str = inputs.join('&');
				jQuery.ajax({
					async : false,
					type 	: "POST",
					url 	: "ehat/doctordesk/deleteservdetails",
					data	: str + "&reqType=AJAX",
					timeout : 1000 * 60 * 5,
					cache 	: false,
					error 	: function() {
						alert('Network Issue!!!');
			  		},
					success : function(r) {
						
						//alert(r);
						if(r == '1'){
							alert("Service Deleted successfuly");
						}else if(r == '3'){
							alert("Accession Done!!! Test cannot be deleted");
						}
						//fetchbilldetails();
						updateBillMasterTotalForOPD();
						getPatientBillAmount(treatId);
						
						//alert(r);
					//	window.location.reload(true);
						
						clearAllFieldsOfOpd();   // Added by Rohini
						/*$("#chargesfromConf").val("0");					
						$("#defchargesfromConf").val("0");
						//$("#perticular").removeAttr('readonly');
						$("#pay").removeAttr('readonly');
						$("#coPay").removeAttr('readonly');
						$("#concession").removeAttr('readonly');
						$("#qty").removeAttr('readonly');
						
						$("#narration").val('');
						$('#narrationid').val('');
						$('#receiptOf').val('general');*/
						stActiveTab();
						
					}
					
				});
				
			}
}

/*******************************************************************************
 * @Vikas Godse
 * @date 5_March_2018 this method is used to Delete Investigation Test From 
 * Billing
 ******************************************************************************/
function deleteInvTestFromBill(labservicelist,deleteType){
	
	var deleteType="N";
	var callform="OPDDignoBill";
	var billDetailIds = labservicelist.join(',');
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/cancelInvestigationTest",
		data	: {
			
		  "billDetId" : billDetailIds,
		  "cancleType" : deleteType,
		  "callform" : callform,
			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			
			if(r=="0")
			{ 
				risReportFlag="Y";
				return false;
			}
			else if(r=="-1")
			{
				alert("Network error...!");
				return false;
			}else if(r=="1")
			{
				risReportFlag="N";
			}
		}
		
	});
}

/************
 *@author	: Kishor Lokhande
 *@date		:  18-June-2017
 *@code		:delete Service
 ***********/
function deleteServicesToPatient(values){
	var servId =[];
	var tretId=$('#treatmentId').text();
	
	
	$('input[name=opdBillCheckboxReg]:checked').each( function () {
	       
		servId.push(parseInt($(this).val()));
	});
	
	
	var inputs = [];	
	inputs.push("servId="+ encodeURIComponent(servId));
	inputs.push("tretId="+ encodeURIComponent(tretId));
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/deleteServices",
		data	: str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			//fetchbilldetails();
			getPatientBillAmount(tretId);
			alertify.success("Service Deleted successfuly");
			//alert(r);
			window.location.reload(true);
		}
	});
}


//@author : kishor Lokhande @date: 15-June-2017 @reason : Function for use to get all services
function getServicesOnBilling() {

	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/serv/fetchServiceList",
		success : function(r) {
			setTempAllService(r);
		}
	});
}

//@author : kishor Lokhande @date: 15-June-2017 @reason : Template use to get all services
function setTempAllService(r) {

	var list = "<option value='0'>select</option>";    
	for ( var i = 0; i < r.listService.length; i++) {

		list = list + "<option value='"+r.listService[i].serviceId+"'>" + ((r.listService[i].serviceName)) + "</option>";    
		}   
	$("#servId").html(list); 
	$("#servIdOpdSponsor").html(list);
	$("#servIdPackage").html(list);
	
	$("#servId").select2(); 
	$("#servIdOpdSponsor").select2();
	$("#servIdPackage").select2();
	
	$("#txtSelectService").html(list);
	$("#txtSelectService").select2();
	

	}






function cancleOnClick(billDetailsId,callFrom)
{
		  var callFromP  =$("#preId").val();
	//if(callFromP == "treatclose"){
		//cancelServicesForPreviousOPD(billDetailsId,callFrom);
	//}else{
				var opType=$('#btnCancle'+billDetailsId).val();
				var msg="";
				
				if(opType=="N"){
					
					msg = "Are you sure ! You Want To Cancel Service";
				}else{
					
					msg = "Are you sure ! You Want To Revert Service";
				}
				var r = confirm(msg);
				if (r == true) {
					
					var cancleType ="N";
					
					//Added by Laxman.whene cancel test from bill,the also cancel from labtestresult.
					//cancelLabTest(billDetailsId,callFrom);
					//GET selected value
					
					var treatmentId=$('#treatmentId').text();
					
					cancelLabTestCheckService(treatmentId,billDetailsId); // addeded Rohini 
					if(cancelTestSmplColFlag=="Y"){
						alert("Accession Done!!! OR Test Sample are collected.You can't cancel or delete this Test.");
						return false;
					}
					
					//Added by Vikas Godse
					cancelRisTest(billDetailsId,callFrom);
					
					if(risReportFlag=="Y"){
						alert("Test Report are created,You can't cancel or delete this Test.");
						return false;
					}
					
					var idremarkcanceltest =$('#idremarkcanceltest').val();		// added Rohini for remark cancel test			
					if(opType=="N" && (idremarkcanceltest == "0" || idremarkcanceltest =="undefined")){
						
						$('#billDetailsId').val(billDetailsId);
						$('#callFrom').val(callFrom);
						setRemarkpopupCancelTest();
					    return false;
					}
					
					//if(opType=="N" && idremarkcanceltest == "1"){
					//	closeRemarkpopupCancelTest();
					//}
					
					var a=$('#btnCancle'+billDetailsId).val();
					
					if(a=="N"){
						cancleType="Y";
						$('#tr'+billDetailsId).attr("disabled", true);
					}
					
					if(callFrom!="uncheck"){
						
						if(a=="N")
						{
						//alert("Service Successfully cancel");
						}
						else{
							//alert("Service Successfully Revert");
						}
					
					}
			
				
			
					var servId=$('#bdId'+billDetailsId).text();
					
			        var remarkcanceltest = $('#remarkcanceltest').val();
			        
			      //  alert('.......remarkcanceltestremarkcanceltest...........'+remarkcanceltest);
			
			        if(opType=="N"){
					if(remarkcanceltest == '' || remarkcanceltest == undefined || remarkcanceltest == null){
						alert('Please fill remark to cancel service !!!!');
						$('#remarkcanceltest').focus();
						return false;
					  }
			        }
					
						/*$.each($('#chkOpdBillReg:checked'), function() {
						//	labservicelist.push(parseInt($(this).val()));
							servId=servId+","+$(this).val();
						//alert(servId);
						//	tretId=tretId+","+$('#treatmentId').text();
							//alert(tretId);
						});*/
						//servId = servId.slice(0,-1);
						//alert("servId="+servId);
						
						
						/*$.each($('#chkOpdBill:checked'), function() {
							//	labservicelist.push(parseInt($(this).val()));
								labservicelist1=labservicelist1+","+$(this).val();
							});
							*/
						
						/* if(labservicelist.length==0){
							   alert("Please check  at least Service to delete");	   
							   return false;
						   }*/
					/*}else{
						labservicelist=labservicelist+","+ values;
					}*/
				 //	labservicelist = JSON.stringify(labservicelist);
					//var tk = servId.slice(1);
					//var kl = tretId.slice(1);
					//alert("final"+a);
					//alert("tk"+servId);
					
					var serViceId= servId.replaceAll("[^a-zA-Z0-9,.]","");
					
					jQuery.ajax({
						async : false,
						type 	: "POST",
						url 	: "ehat/doctordesk/cancleServices",
						data	: {
							
						  "servId" : encodeURIComponent(serViceId.trim()),
						  "tretId" : treatmentId,
						  cancleType : cancleType,
						  remarkcanceltest : remarkcanceltest,
						},
						timeout : 1000 * 60 * 5,
						cache 	: false,
					
						success : function(r) {
							
							//fetchbilldetails();
							closeRemarkpopupCancelTest();
							alert(r);
							getPatientBillAmount(treatmentId,servId);
							getPatientBillAmountForSponsor(treatmentId,servId);
							updateBillMasterTotalForOPD();
						//	window.location.reload(true);
							//stActiveTab();              // Added by Rohini
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
						
					});
					//$('#cancleType').val("N");
				}	
		//}
}
/*******************************************************************************
 * @Vikas Godse
 * @date 25_April_2018 this method is used to cancel Investigation Test From 
 * OPD and Diagno Billing
 ******************************************************************************/
function cancelRisTest(billDetailsId,callform){
	
	var callform;
	if(callform == 'edit'){
		 callform = callform;
	}else{
	 callform="OPDDignoBill";
	}
	var a=$('#btnCancle'+billDetailsId).val();
	var cancleType ="Y";
	var billDetId=$('#bdId'+billDetailsId).text();
	
	if(a=="N"){
		cancleType="N";
		$('#tr'+billDetailsId).attr("disabled", true);
	}
	
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/cancelInvestigationTest",
		data	: {
			
		  "billDetId" : billDetId,
		  "cancleType" : cancleType,
		  "callform" : callform,
			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			if(r=="0")
			{ 
				risReportFlag="Y";
				return false;
			}
			else if(r=="-1")
			{
				alert("Network error...!");
				return false;
			}else if(r=="1")
			{
				risReportFlag="N";
			}else if(callform == "edit" && r == "9")
			{ 
				risReportFlag="Y";
				return false;
			}
		}
		
	});
}
/*-------------------------------------------END GENERAL BILL----------------------------------------------------*/

/*-------------------------------------------START CGHS BILL----------------------------------------------------*/


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 10_June_2017
 * @Code Getting amount 
 ******************************************************************************/


function calculatePerticularTotal2() {
	var rateManual = $("#rateManual").val();
	var qtyManual = $("#qtyManual").val();
	var concessionManual = $("#concessionManual").val();
	var payManual = $("#payManual").val();
	if (qtyManual == "") {
		$("#qtyManual").val(1);
	}
	if (rateManual == "") {
		$("#rateManual").val(0);
	}
	if (payManual == "") {
		$("#rateManual").val(0);
	}
	
	if (concessionManual == "") {
		$("#concessionManual").val(0);
	}
	if (concessionManual > (rateManual * qtyManual)) {
		var quantityManual = $("#qtyManual").val();
		if (quantityManual == 0) {
			// alert("Quantity Cannot Be 0");
			$("#concessionManual").val(0);
			calculatePerticularTotal2();
			return false;
		} else {
			alert("Discount Cannot Be Greater Than "
					+ (rate * qty));
			$("#concessionManual").val(0);
			$("#amountManual").val(rateManual * qtyManual);
			$("#payManual").val(rateManual * qtyManual);
			return false;
		}
	}
	var amountManual = ((rateManual * qtyManual) - concessionManual);
	$("#amountManual").val(amountManual);
	
	
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();

	if (sponsorId == 1 && chargesSlaveId > 0) {

		$("#payManual").val(amountManual);

	} else {

		$("#coPayManual").val(amountManual);

	}	
	
	//$("#payManual").val(amountManual);
	var SpecialDisc1 = $("#SpecialDisc").val();
	if (SpecialDisc1 == 0 && ($("#payManual").val()) == 0) {
		
		calculatePerticularCoPay2();
		
	} else {
		calculatePerticularPay2();
		
	}
}

function calculatePerticularCoPay2() {
	var payManual = $("#payManual").val();
	var amountManual = $("#amountManual").val();
	if (payManual == "" || amountManual == "") {
		return false;
	}
	
	if(payManual < 0){
		payManual = 0;
	}else if(isNaN(payManual) == true){
		payManual = 0;
	}
	
	var coPayManual = (amountManual - payManual);
	$("#coPayManual").val(coPayManual);
}


function calculatePerticularPay2() {
	var coPayManual = $("#coPayManual").val();
	var amountManual = $("#amountManual").val();
	if (coPayManual == "" || amountManual == "") {
		return false;
	}
	if(coPayManual < 0){
		coPayManual = 0;
	}else if(isNaN(coPayManual) == true){
		coPayManual = 0;
	}
	
	var payManual = (amountManual - coPayManual);
	$("#payManual").val(payManual);
}





//@author : kishr Lokhande @date: 15-June-2017 @reason : Function for use to get all services
function getTempInCghs() {

	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/temp/fetchTempList",
		success : function(r) {
			setTempAll(r);
		}
	});
}

//@author : kishr Lokhande @date: 15-June-2017 @reason : Template use to get all services
function setTempAll(r) {
	
	var list = "<option value='0'>select</option>";    
	for ( var i = 0; i < r.listTemp.length; i++) {

		list = list + "<option value='"+r.listTemp[i].tempId+"'>" + ((r.listTemp[i].tempName)) + "</option>";    
		}   
	$("#servIdForCghs").html(list);  

	}



function getAllTempManual() {

	jQuery
			.ajax({
				async : true,
				//type : "POST",
				//url : "ehat/temp/fetchTempList",

				success : function(r) {
					setTemplateForTemp(r);//call template
				}
			});
}


tA=0;
 tAmt=0;
function setTemplateForTemp(r) {
	var a = $('#editHidden').val();

	if (a > 0) {
		
		var amtRem= parseFloat($('#totalManualRemains').val());
		var amtTot=parseFloat($('#amountManual').val());
		
		if(amtTot <= amtRem){
			
			$('#serM' + a).text($('#perManual').val());
			$('#packM' + a).text($('#packManual').val());//new pack box add 
			$('#rateM' + a).text($('#rateManual').val());
			$('#qtyM' + a).text($('#qtyManual').val());
			$('#conM' + a).text($('#concessionManual').val());
			$('#amt' + a).text($('#amountManual').val());
			$('#payM' + a).text($('#payManual').val());
			$('#cPayM' + a).text($('#coPayManual').val());
			
			var z=amtRem-amtTot; 
			$("#totalManualRemains").val(z);
			$('#totalManualRemains').attr('readonly', 'true');
			
		}else{
			alert("amount should be less than remain amount");
			return false;
		}
		
		$('#perManual').val("");
		$('#packManual').val("");
		$('#rateManual').val(0);
		$('#qtyManual').val(1);
		$('#concessionManual').val(0);
		$('#amountManual').val(0);
		$('#payManual').val(0);
		$('#coPayManual').val(0);

	} else {
		tA = parseFloat($("#totalAmmt").text());
		var service = $('#perManual').val();
		var packService = $('#packManual').val();
		var dateManual = $('#dateManual').val();
		var rateManual = $('#rateManual').val();
		var qtyManual = $('#qtyManual').val();
		var concessionManual = $('#concessionManual').val();
		var amountManual = parseFloat($('#amountManual').val());
		$('#amountManual').attr('readonly', 'true');
		var payManual = $('#payManual').val();
		var coPayManual = $('#coPayManual').val();

		if (service == "" || service == null) {
			alert("Please enter servicename ");
			return false;
		}

		if (rateManual <= 0) {
			alert("Please Enter Amount");
			return false;
		}

		var counterIpdCghs = $('#counterIpdCghs').val();
		var index = $("#cghsBillManual tr").length;
		index = index + 1;
		if (index == 0 && counterIpdCghs == 0) {
			// alert("HI");
			/*
			 * if(tAmt > 0) { tAmt=0; alert("HI"); }
			 */
			$('#counterIpdCghs').val(1);
			tAmt = tAmt + amountManual;
			if (tAmt <= tA) {
				var masterModuleBody = "";

				masterModuleBody = masterModuleBody
						+

						'<tr class="cghsclassM" id="cghsId'
						+ index
						+ '"><td class="col-md-1 center" id="inM'
						+ index
						+ '">'
						+ (index)
						+ '</td> <td class="col-md-1 center" id="serM'
						+ index
						+ '">'
						+ service
						+ '</td> <td class="col-md-1 center" id="packM'
						+ index
						+ '">'
						+ packService
						+ '</td><td class="col-md-1 center" id="dateM'
						+ index
						+ '">'
						+ dateManual
						+ '</td> <td class="col-md-1 center" id="rateM'
						+ index
						+ '">'
						+ rateManual
						+ '</td> <td class="col-md-1 center" id="qtyM'
						+ index
						+ '">'
						+ qtyManual
						+ '</td> <td class="col-md-1 center" id="conM'
						+ index
						+ '">'
						+ concessionManual
						+ '</td> <td class="col-md-1 center" id="amt'
						+ index
						+ '">'
						+ amountManual
						+ '</td> <td class="col-md-1 center" id="payM'
						+ index
						+ '">'
						+ payManual
						+ '</td> <td class="col-md-1 center" id="cPayM'
						+ index
						+ '">'
						+ coPayManual
						+ '</td> <td class="col-md-1 center"><i aria-hidden="true" onclick="deleteCghs2('
						+ index
						+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>';

				$("#cghsBillManual").append(masterModuleBody);

				$('#perManual').val("");
				$('#packManual').val("");
				$('#rateManual').val(0);
				$('#qtyManual').val(1);
				$('#concessionManual').val(0);
				$('#amountManual').val(0);
				$('#payManual').val(0);
				$('#coPayManual').val(0);

				// $("#ehatTable").html(masterModuleBody);
			} else {
				var k = tAmt - tA;
				tAmt = tAmt - amountManual;
				alert("amount should be less than Main amount");
				// alert("Total amount should be less than=" +tA+ "and Your
				// account
				// Max is "+ k);
				$('#perManual').val("");
				$('#packManual').val("");
				$('#rateManual').val(0);
				$('#qtyManual').val(1);
				$('#concessionManual').val(0);
				$('#amountManual').val(0);
				$('#payManual').val(0);
				$('#coPayManual').val(0);
			}

			var a = tA - tAmt;
			// alert(a);
			// $('#totalManualRemains').text(a);
			$("#totalManualRemains").val(a);
			$('#totalManualRemains').attr('readonly', 'true');

		} else {

			var TotRemains = $("#totalManualRemains").val();

			if (amountManual <= TotRemains) {
				// alert("hi"+TotRemains);
				var masterModuleBody = "";

				masterModuleBody = masterModuleBody
						+

						'<tr class="cghsclassR" id="cghsId'
						+ index
						+ '"><td class="col-md-1 center" id="inM'
						+ index
						+ '">'
						+ (index)
						+ '</td> <td class="col-md-1 center" id="serM'
						+ index
						+ '">'
						+ service
						+ '</td> <td class="col-md-1 center" id="packM'
						+ index
						+ '">'
						+ packService
						+ '</td> <td class="col-md-1 center" id="dateM'
						+ index
						+ '">'
						+ dateManual
						+ '</td> <td class="col-md-1 center" id="rateM'
						+ index
						+ '">'
						+ rateManual
						+ '</td> <td class="col-md-1 center" id="qtyM'
						+ index
						+ '">'
						+ qtyManual
						+ '</td> <td class="col-md-1 center" id="conM'
						+ index
						+ '">'
						+ concessionManual
						+ '</td> <td class="col-md-1 center" id="amt'
						+ index
						+ '">'
						+ amountManual
						+ '</td> <td class="col-md-1 center" id="payM'
						+ index
						+ '">'
						+ payManual
						+ '</td> <td class="col-md-1 center" id="cPayM'
						+ index
						+ '">'
						+ coPayManual
						+ '</td> <td class="col-md-1 center"><i aria-hidden="true" onclick="deleteCghs2('
						+ index
						+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>';

				$("#cghsBillManual").append(masterModuleBody);

				// tAmt=TotRemains - amountManual;

				$('#perManual').val("");
				$('#packManual').val("");
				$('#rateManual').val(0);
				$('#qtyManual').val(1);
				$('#concessionManual').val(0);
				$('#amountManual').val(0);
				$('#payManual').val(0);
				$('#coPayManual').val(0);

				var a = TotRemains - amountManual;
				// alert(a);
				// $('#totalManualRemains').text(a);
				$("#totalManualRemains").val(a);
				$('#totalManualRemains').attr('readonly', 'true');
				// $("#ehatTable").html(masterModuleBody);
			} else {
				var k = tAmt - tA;
				tAmt = tAmt - amountManual;
				alert("amount should be less than Main amount");

				// alert("Total amount should be less than=" +tA+ "and Your account
				// Max is "+ k);
				$('#perManual').val("");
				$('#perManual').val("");
				$('#rateManual').val(0);
				$('#qtyManual').val(1);
				$('#concessionManual').val(0);
				$('#amountManual').val(0);
				$('#payManual').val(0);
				$('#coPayManual').val(0);
			}

		}
	}
	$('#editHidden').val(0);
}
function deleteCghs(id){
	
	var compAmt=$("#amt"+id).html();
	//alert(compAmt);
	var totAmt=$("#totalManualRemains").val();
	//alert(totAmt);
	var totAmttt=Number(totAmt)+Number(compAmt);
	$("#totalManualRemains").val(totAmttt);
	$("#cghsId"+id).remove();
	
}

tAR=0;
tAmtR=0;

function setTemplateForTempRemains()
{var SerManualRemains = $('#SerManualRemains').val();
var dateManualRemains = $('#dateManualRemains').val();
var amountManualRemains = parseFloat($('#amountManualRemains').val());
var payManualRemains = $('#payManualRemains').val();
var totalManualRemains = $('#totalManualRemains').val();
$('#totalManualRemains').attr('readonly', 'true');

var a = $('#editHiddenR').val();

if (a > 0) {
	if(payManualRemains > amountManualRemains )
	{
	alert("Please Enter Pay less than Amount");
	$("#payManualRemains").val(0);
	return false;
	}
	var amtRem= parseFloat($('#totalManualRemains').val());
	var amtTot=parseFloat($('#amountManualRemains').val());
	
	if(amtTot <= amtRem){
		
		$('#serR' + a).text($('#SerManualRemains').val());		
		$('#amtR' + a).text($('#amountManualRemains').val());
		$('#payR' + a).text($('#payManualRemains').val());
		
		
		var z=amtRem-amtTot; 
		$("#totalManualRemains").val(z);
		$('#totalManualRemains').attr('readonly', 'true');
		
	}else{
		alert("amount should be less than remain amount");
		return false;
	}
	
	$('#SerManualRemains').val("");
	$('#amountManualRemains').val(0);
	$('#payManualRemains').val(0);
	

} else {
	//alert("in remains");
	
	
	if (SerManualRemains == "" || SerManualRemains == null) {
		alert("Please enter servicename ");
		return false;
	}
	
	
	if(payManualRemains > amountManualRemains )
	{
	alert("Please Enter Pay less than Amount");
	$("#payManualRemains").val(0);
	return false;
	}
	
	if(amountManualRemains <= 0 && payManualRemains <= 0 )
	{
	alert("Please Enter Amount");
	return false;
	}
	
	var tAR=totalManualRemains;
	var i=amountManualRemains;
	tAmtR=tAmtR + amountManualRemains;
	//alert("total"+tAmtR);
	
	var RA=totalManualRemains -i;
	if(RA>=0)
		{
	$("#totalManualRemains").val(RA);
		}else{
			tAmtR=tAmtR - amountManualRemains;
			alert("amount should be less than remain amount");
			return false;
			}
	//var a=tAR-tAmtR;
	if(i<=tAR)
		
		{
		$("#totalManualRemains").val(RA);
	var indexR=$("#cghsBillManualChangeRemains tr").length;
	indexR = indexR + 1;
	var masterModuleBody1="";
			
		masterModuleBody1=masterModuleBody1
				
		 +
			'<tr id="cghsIdR'+ indexR
			+ '"><td class="col-md-1 center">' + (indexR)
					+ '</td> <td class="col-md-1 center" id="serR'+ indexR+ '">' + SerManualRemains 
					+ '</td> <td class="col-md-1 center" id="dateR'+ indexR+ '">' + dateManualRemains
					+ '</td> <td class="col-md-1 center" id="amtR'+ indexR+ '">' + amountManualRemains
					+ '</td> <td class="col-md-1 center" id="payR'+ indexR+ '">' + payManualRemains
					+ '</td> <td class="col-md-1 center"><i aria-hidden="true" onclick="deleteManualCghs2('
					+ indexR
					+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td> </tr>';

			$("#cghsBillManualChangeRemains").append(masterModuleBody1);
			$('#SerManualRemains').val("");
			$('#amountManualRemains').val(0);
			$('#payManualRemains').val(0);
		}
	else{
			var kR=tAmtR -tAR;
			tAmtR=tAmtR - amountManualRemains;
			alert("Total amount should be less than=" +tAR+ "and Your account Max is "+ kR);
			$('#SerManualRemains').val();
			$('#amountManualRemains').val();
			$('#payManualRemains').val();
		}
	}
$('#editHiddenR').val(0);
}

function deleteManualCghs(id) {

	var compAmt = $("#amtR" + id).html();

	var totAmt = $("#totalManualRemains").val();

	var totAmttt = Number(totAmt) + Number(compAmt);
	$("#totalManualRemains").val(totAmttt);
	$("#cghsIdR" + id).remove();

}

/**
 * @author Bilal
 * @date 22-JUN-2017
 * @code For autosuggetion from configuration 
 * **/
function setallchargesConfigOnBillingOPD(inputID) {
	var findingNames = $("#" + inputID).val();
	var sugVal = $("#inputAuto").val();
	
	//if(sugVal != findingNames && findingNames!="" ){
		
	if(sugVal != findingNames){
		var sponsorId = parseInt($("#SponsorsourceTypeId").val());
		var chargesSlaveId = parseInt($("#chargesSlaveId").val());
		
		if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
			sponsorId = 0;
		}
		if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
			chargesSlaveId = 0;
		}
		//var	listofunit=[];
		//var resultData = [];
		var findingName = $("#" + inputID).val();
		var unit = $("#uId").val();
		var userId = $("#userId").val();
		//var unitlist=listofunit.slice(1); 
		var unitlist="";
		var depdocdeskid = $("#depdocdeskid").val();
		 
		var querytype="all";
	    var serviceid=$('#servIdOpdSponsor').val(); 
	    var hallId = 0;
		var hallSlaveId = 0;
		var treatId=$("#treatId").val();
		
		var inputs = [];
		inputs.push('unit=' + unit);
		inputs.push('findingName=' + encodeURIComponent(findingName));
		inputs.push('unitlist=' + unitlist);
		inputs.push('depdocdeskid=' + depdocdeskid);
		inputs.push('querytype=' + querytype);
		inputs.push('serviceid=' + serviceid);
		inputs.push('sponsorId=' + sponsorId);
		inputs.push('chargesSlaveId=' + chargesSlaveId);
		inputs.push('hallId=' + hallId);
		inputs.push('hallSlaveId=' + hallSlaveId);
		inputs.push('treatId=' + treatId);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/autoallservicestest/getallservicesConf",
			/*data : {
				"unitid" : unit,
				"userid" : userId,
				"dept_id" : depdocdeskid,
				"serviceid" : serviceid,
				"categoryName" : (findingName)
			},
			url : "ehat/testautosuggest/getSponsorTestAutosuggestion",*/
			success : function(r) {
				autoCompConfigurationBilling(r,inputID);
			}
		});
		$("#inputAuto").val(findingName);
	}
	
}


/************
 *@author	: Bilal
 *@date		:  22-JUN-2017
 *@code		:autosuggestion services from configuration and services 
 ***********/
function autoCompConfigurationBilling(response,id) {
    
	//var qty = id.slice(0, -1); // for dyamic col getting id
	//alert("hi");
	var myArray = response;// parsing response in JSON format
	//alert(myArray);
	//alert("b");
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
				
				showHeader : true,
				columns : [ {
					name : 'CategoryName',
					width : '150px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '100px',
					valueField : 'serviceName'
				}],

				// Event handler for when a list item is selected. 
				select : function(event, ui) {

					$("#templateWiseTestFlag").val(ui.item.templateWise);
					var categoryid= ui.item.categoryid;
					    $('#categoryids').val(categoryid);
					    var isModify=ui.item.isModify;
						if(isModify=="N"){
							$("#rate").prop("disabled", true);
							$("#rateOpdSponsor").prop("disabled", true);
						}else{
							$("#rate").prop("disabled", false);
							$("#rateOpdSponsor").prop("disabled", false);
						}
						var iscombination = ui.item.iscombination;
						var isComServlastId = 0;
						if(iscombination == "Y"){
							
							isComServlastId = ui.item.categoryid;
						}
						
					    //var valsponsor=getcharges();
						//var valsponsor = sponsorTestCharges;
					    
						$('#perticularOpdSponsor').val(ui.item.categoryName);
						
						$("#subserviceid").val(ui.item.categoryid);
						$("#servicename").val(ui.item.serviceName);
						$("#serviceid" ).val(ui.item.serviceid);
						
						//var yearwisecharges=getyearwisecharges(categoryid);						
						//var rategeneralopd =$("#rategeneralopd").val();
						
						var b2bCharges = getB2BChargesForOpd(isComServlastId,categoryid);
												
						if(b2bCharges > 0){
							$("#rateOpdSponsor").val(b2bCharges);
							$("#rateOpdSponsor2").val(b2bCharges);
						}else{
							
							getSponsorTestCharges(isComServlastId,categoryid);
							var valsponsor = $("#sponsorTestCharges").val();
							var yearWiseSponsorTestCharges = $("#yearWiseSponsorTestCharges").val();
							var yearwisecharges = yearWiseSponsorTestCharges;
							
							if (Number(valsponsor) > 0) {
								
								$("#rateOpdSponsor").val(valsponsor);
								$("#rateOpdSponsor2").val(valsponsor);
								if (Number(yearwisecharges) > 0) {
									
									$("#defchargesfromConf").val(yearwisecharges);
								}else{
									
									$("#defchargesfromConf").val(ui.item.categorycharges);
								}
							}else {
								
								if (Number(yearwisecharges) > 0) {
									$("#rateOpdSponsor" ).val(yearwisecharges);
									$("#defchargesfromConf").val(yearwisecharges);
									$("#rateOpdSponsor2" ).val(yearwisecharges);
								}else{
									$("#rateOpdSponsor" ).val(ui.item.categorycharges);
									$("#defchargesfromConf").val(ui.item.categorycharges);
									$("#rateOpdSponsor2" ).val(ui.item.categorycharges);
								}
							}
						}
						$("#servIdOpdSponsor" ).val(ui.item.serviceid);
						$("#servIdOpdSponsor" ).select2('val',ui.item.serviceid);
			
						$("#iscombinationsponsor").val(ui.item.iscombination);
						//@auhtor-tk @date - 05-feb-2018 @reason open doctor list after selecting service name
						$('#doctorNameOpdSponsor').select2('open');
						//$('#specialityIdSponsor').select2('open');
						
						calculatePerticularTotalOpdSponsor();
						calculate123('sponsor');
						
						//Added by Kishor
						if(ui.item.iscombination == "Y"){
							setPackageBarcodePopup(ui.item.serviceid, ui.item.categoryid);
						///}else if(isPkg == 'N'){
						}else{
							if(ui.item.serviceid == 11){						
								getPathologyPreDetails(ui.item.serviceid,ui.item.categoryid);
							}
                             else if(ui.item.serviceid == 12){ //Added Rohini Ambhore ris test 
								
								var isDuplicate = getInvstigationPreDetails(ui.item.serviceid, ui.item.categoryid);
								if(isDuplicate > 0){
									alert("Test/Profile Already Added");
									clearAllFieldsOfOpd();
									return false;
								}
							}
						}		
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
					$('#ui-id-1').css("z-index", "10000000000");
					
					
				}
			});
}

/************
 *@author	: Kishor Lokhande
 *@date		:  25-June-2017
 *@code		:autosuggestion Temp Master
 ***********/
function setallTempAutocompleteOnOpdBilling(inputID) {
	var	listofunit=[];
	var resultData = [];
	var findingName = $("#" + inputID).val();
	//var unit = $("#uId").val();
	//var unitlist=listofunit.slice(1); 
	//var unitlist="";
	//var depdocdeskid = $("#depdocdeskid").val();

	var inputs = [];
	//inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	//inputs.push('unitlist=' + unitlist);
	//inputs.push('depdocdeskid=' + depdocdeskid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/temp/fetchTempList",
	
		success : function(r) {
/*	        alert(r.lstSubService[0].categoryName);
*/			
			autoCompDoctorDeskOnOpdBilling(r,inputID);
			
         
				
		}
	});
}


/************
 *@author	: Kishor Lokhande
 *@date		:  25-June-2017
 *@code		:autosuggestion Temp
 ***********/
function autoCompDoctorDeskOnOpdBilling(response,id) {

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
					name : 'CategoryName',
					width : '100px',
					valueField : 'tempName'
				},{
					name : 'ServiceName',
					width : '90px',
					valueField : 'tempCode'
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
			
						
						$('#perManual').val(ui.item.tempName);
						$('#payManual').val(0);
						
						/*$("#subservicesname").val(ui.item.categoryName);
						$("#subserviceid").val(ui.item.categoryid);
						$("#servicename").val(ui.item.serviceName);
						$("#serviceid" ).val(ui.item.serviceid);
						$("#rate" ).val(ui.item.categorycharges);
						$("#concession" ).val(ui.item.concession);
						$("#amount" ).val(ui.item.amount);
						$("#servId" ).val(ui.item.serviceid);
						calculatePerticularTotal1();*/
				
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
							/*'dn' : 'No',*/
							'categoryName' : 'NO',
							'serviceName' : 'Match',
							/*'depNm' : 'Match'*/
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


/************
 *@author	: Sagar kadam
 *@date		:  25-June-2017
 *@code		:close treatment
 ***********/

function  closePatientTreatment(tretId) {
	 var did=$("#deptid").val();
	var r = confirm("Do You Want To Close Treatment ??");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url  : "ehat/billNoble/closetreatment",
			data : {
	   "treatmentId" : tretId
			},
	     timeout : 1000 * 60 * 5,
		   cache : false,
		   error : function() {
				    alert('error');
			},
		 success : function(response) {
		     		alertify.success(response);
		     		if(did==3){
 			    // 		window.location.href = "diagnoPatBillDashboard.jsp";
		     			window.location.href = "prevDiagnostic_Bill_Database.jsp";
 		     		}else{
			     		window.location.href = "prevOPD_Bill_Database.jsp";
 		     		}
		     		/*resetUlList();
				    getConfigTemp();*/
				 	 
			}
		});
	}
}
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
        inputs.push('deptId=' + 1);
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
			
			 
  		 setpatientForTreatment(r);
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
var deptId=1;

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
		 setpatientForTreatment(r);
	}
});
}


/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: setting  details on tempelate
 **********/ 
function setpatientForTreatment(r) {
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	
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
	
	var patId= patPrefix + patMiddle + r.lstRegviewDto[i].ptId + patSufix;
	var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
 		
		htm= htm
		+ "<tr id='div"+ r.lstRegviewDto[i].ptId+"'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.lstRegviewDto[i].patientName+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 '>"+ r.lstRegviewDto[i].mobile+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ patId +"</td>"
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
	   "deptId" : 1,
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
	 
	 var htm="";
	 for ( var j = 0; j < r1.listTreatment.length;j++) {
		 var date= new Date(r1.listTreatment[j].createdDateTime).toLocaleString();
		  
		 htm=htm+ "<tr id='div"+ r1.listTreatment[j].patientId+"'>";
		 htm=htm	+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.listTreatment[j].treatmentId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.listTreatment[j].opdipdno+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+date+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.listTreatment[j].patientId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-1 center'>";
		 htm=htm+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='sendingToPreviousBill("+ r1.listTreatment[j].treatmentId+")'>";
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
 


/**
 * @author Bilal
 * @date 28-JUN-2017
 * @code for autosuggestion on billing from configuration and from subservice based on sponsor id  **/
function autosuggetionForDefault(inputID) {
	var findingName = $("#" + inputID).val();
	var len = findingName.length;  // added by Rohini for loading issue
	if(len<=2){               
		return false;
	}
	var sugVal = $("#inputAuto").val();
	//if(sugVal != findingName && findingName!="" ){
	if(sugVal != findingName){
		var sponsorId = $("#SponsorsourceTypeId").val();
		var chargesSlaveId = $("#chargesSlaveId").val();
		//var depdocdeskid = $("#depdocdeskid").val();//departmentId
	    //var sponsortab  = $("#sponsortab").val();
	   
		if ( sponsorId >= 1 && chargesSlaveId > 0) {
			setallchargesConfigOnBillingOPD2(inputID);
			//setallservautocompleteOnBilling(inputID);
			$("#inputAuto").val(findingName);
		}
		else{
			setallservautocompleteOnBilling(inputID);
			$("#inputAuto").val(findingName);
		}
	}	
}


/**
 * @author Bilal
 * @date 28-JUN-2017
 * @code For fetching records from configuration based on sponsor id and hall id
 * **/
function setallchargesConfigOnBillingForIPD(inputID) {

	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	var unitlist="";
	var depdocdeskid = $("#depdocdeskid").val();//departmentId
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var hallId = 2;
	var hallSlaveId =39;
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallchargesConfigForIPD",
		success : function(r) {
			console.log(r);
			autoCompConfigurationBilling(r,inputID);		
		}
	});
}

/**
 * @author Bilal
 * @date 21-JUN-2017
 * @code For fetching Hall type id 
 * **/
function fetchehatHallTypeId2() {
	var hallTypeId = 22;
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/fetchehatHallTypeId",
		data : {
			"hallTypeId" : parseInt(hallTypeId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			//alert("hallTypeId>>>>>>>>........>>>>>>."+response);
			//console.log(response);
			
		}
	});
}


/**
 * @author Bilal
 * @date 21-JUN-2017
 * @code For fetching Hall id 
 * **/
function fetchehatHallNmaeId2() {
	var hallId = 25;
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/fetchehatHallNmaeId",
		data : {
			"hallId" : parseInt(hallId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			//alert("hallId >>>>>>>>>>"+response);
			//console.log(response); subservicesclass
			
		}
	});
}
/*---------------------------------------------FOR SPONSOR------------------------------------*/



/**
 * for sponsor and package billing**/
function calculatePerticularTotalOpdSponsor() {
	var rate = $("#rateOpdSponsor").val();
	var qty = $("#qtyOpdSponsor").val();
	var concession = $("#concessionOpdSponsor").val();
	var concessionOpdSponsorOnPerc = $("#concessionOpdSponsorOnPerc").val();
	
	if (concessionOpdSponsorOnPerc == "" || concessionOpdSponsorOnPerc == "") {
		return false;
	}
	if(concessionOpdSponsorOnPerc < 0){
		concessionOpdSponsorOnPerc = 0;
	}else if(isNaN(concessionOpdSponsorOnPerc) == true){
		concessionOpdSponsorOnPerc = 0;
	}
	
	if (rate == "") {
		$("#rateOpdSponsor").val(0);
	}
	if (qty == "" || qty == 0) {
		$("#qtyOpdSponsor").val(1);
		
		var a=rate * 1; 		
		setTimeout(function() { 	
			$("#amountOpdSponsor").val(a); 
			$("#concessionOpdSponsorOnPerc").val(0);
			$("#concessionOpdSponsor").val(0);
			$("#payOpdSponsor").val(a);
			}, 50);
	}
	if (concession == "") {
		$("#concessionOpdSponsor").val(0);
	}
	if (concession > (rate * qty)) {
		var quantity = $("#qtyOpdSponsor").val();
		if (quantity == 0) {
			// alert("Quantity Cannot Be 0");
			$("#concessionOpdSponsor").val(0);
			calculatePerticularTotalOpdSponsor();
			return false;
		} else {
			alert("Discount Cannot Be Greater Than " + (rate * qty));
			$("#concessionOpdSponsor").val(0);
			$("#amountOpdSponsor").val(rate * qty);
			//$("#coPayOpdSponsor").val(rate * qty);
			return false;
		}
	}
	//var amount = ((rate * qty) - concession);
	var amount = ((rate * qty));
	$("#amountOpdSponsor").val(Math.round(amount));

	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();

	if (sponsorId == 1 && chargesSlaveId > 0) {

		$("#payOpdSponsor").val(Math.round(amount));

	} else {

		$("#coPayOpdSponsor").val(Math.round(amount));

	}
	
	/*var amountOpdSponsor = $("#amountOpdSponsor").val();
	var concessionOpdSponsor = $("#concessionOpdSponsor").val();
	
	var consAmt=((concessionOpdSponsor * 100 ) / amountOpdSponsor).toFixed(2);
	$("#concessionOpdSponsorOnPerc").val(consAmt);*/

	

	var SpecialDisc = $("#SpecialDisc").val();
	if (SpecialDisc == 0 && ($("#payOpdSponsor").val()) == 0) {

		calculatePerticularCoPayOpdSponsor();
	} else {

		calculatePerticularPayOpdSponsor();
	}
}

function calculatePerticularCoPayOpdSponsor() {
	var pay = $("#payOpdSponsor").val();
	var amount = $("#amountOpdSponsor").val();
	var concession = $("#concessionOpdSponsor").val();
	if (pay == "" || amount == "") {
		return false;
	}
	var abc=amount-concession;

	if (pay > abc ) {
		alert("pay should be less than amount");		
		$("#payOpdSponsor").val(Math.round(abc));
	
	}
	if (pay < 0) {
		
		pay = 0;
	} else if (isNaN(pay) == true) {
		pay = 0;
	}

	var coPay = (((amount - pay) - concession).toFixed(2));	
		
	$("#coPayOpdSponsor").val(Math.round(coPay));
	

}

function calculatePerticularPayOpdSponsor() {

	var coPayOpdSponsor = $("#coPayOpdSponsor").val();
	var amountOpdSponsor = $("#amountOpdSponsor").val();
	var concessionOpdSponsor = $("#concessionOpdSponsor").val();
	var payOpdSponsor = $("#payOpdSponsor").val();

	if (coPayOpdSponsor == "" || amount == "") {
		return false;
	}
	if (coPayOpdSponsor < 0) {
		coPayOpdSponsor = 0;
	} else if (isNaN(coPayOpdSponsor) == true) {
		coPayOpdSponsor = 0;
	}
	
	var pay = (amountOpdSponsor - concessionOpdSponsor).toFixed(2);
	//var pay = ((payOpdSponsor - coPayOpdSponsor).toFixed(2));
	$("#payOpdSponsor").val(Math.round(pay));
	
}

function concessionOnPercentageOpdSponsor()
{
	var amountOpdSponsor = $("#amountOpdSponsor").val();
	var concessionOpdSponsorOnPerc = $("#concessionOpdSponsorOnPerc").val();
	
	if (concessionOpdSponsorOnPerc == "" || concessionOpdSponsorOnPerc == "") {
		return false;
	}
	if(concessionOpdSponsorOnPerc < 0){
		concessionOpdSponsorOnPerc = 0;
	}else if(isNaN(concessionOpdSponsorOnPerc) == true){
		concessionOpdSponsorOnPerc = 0;
	}
	
	if(concessionOpdSponsorOnPerc > 100)
		{
		alert("Percentage should be less than 100");
		$("#concessionOpdSponsorOnPerc").val(0);
		$("#concessionOpdSponsor").val(0);
		return false;
		}
	//alert(amount);	
	var conAmt=((concessionOpdSponsorOnPerc * amountOpdSponsor)/100).toFixed(2);
	
	$("#concessionOpdSponsor").val(Math.round(conAmt));	
	
	}


function editSponsorOnClickForDoctor(billDetailsId)
{
	
	$('#queryType').val('update');
	//alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticularOpdSponsor').val($('#doccName'+billDetailsId).text());
	$('#perticularOpdSponsor').attr('readonly', 'true');
	
	var a=parseInt($('#sId'+billDetailsId).text());
	
	 $('#servIdOpdSponsor').val(a).text();
	 $("#serviceid").val(a); 
	 $('#servIdOpdSponsor option:not(:selected)').prop('disabled', true);
	 
	 var d = parseInt($('#docId' + billDetailsId).text());
	// alert(d);
		$('#doctorNameOpdSponsor').select2('val',d);
		
	 
	 var subserviceid= parseInt($('#subserviceid'+billDetailsId).text());	
	 $("#subserviceid").val(subserviceid);	
	 $('#rateOpdSponsor').val($('#char'+billDetailsId).text());
	$('#amountOpdSponsor').attr('readonly', 'true');
	$('#qtyOpdSponsor').val($('#quantity'+billDetailsId).text());
	$('#qtyOpdSponsor').attr('readonly', 'true');
	
	var defchargesfromConf=$('#genRate'+billDetailsId).text();
	 $('#defchargesfromConf').val(defchargesfromConf);
	
	 $('#concessionOpdSponsor').val($('#con'+billDetailsId).text());
	$('#amountOpdSponsor').val($('#char'+billDetailsId).text());
	
	$('#payOpdSponsor').val($('#oPay'+billDetailsId).text());
	$('#payOpdSponsor').attr('readonly', 'true');
	$('#coPayOpdSponsor').val(0);
	$('#coPayOpdSponsor').attr('readonly', 'true');
	 $('#concessionOpdSponsorOnPerc').val($('#consPercSpon'+billDetailsId).text());
	//$('#concessionOpdSponsor').val(0);
	 //$('#concessionOpdSponsorOnPerc').val(0);
	 
	 $('#chkOpdBill'+billDetailsId).change(function() {//This function use to call clear fields
         
            clearAllFieldsOfOpd();           
    });
	 
	 $("#narrationBill").val('narrationBill');
}

function editSponsorOnClick(billDetailsId)
{
	
	$('#perticularOpdSponsor').attr("readonly",false);
	$('#servIdOpdSponsor').attr("disabled",false);  
	
	$('#queryType').val('update');
	//alert("hii");
	$('#billDetailsId').val(billDetailsId);
	$('#perticularOpdSponsor').val($('#catName'+billDetailsId).text());
	
	var f=parseInt($('#sampleTypeOpdSponsorr'+billDetailsId).text());
	 $("#sampleTypeOpdSponsor").val(f); 
	 $("#barcodeNoOpdSponsor").val($('#barCodeIdOpdSponsor'+billDetailsId).text());
	 $('#collectionDateOpdSponsor').val($('#collectionDateOpdSponsor'+billDetailsId).text());
	 $('#collectionTimeOpdSponsor').val($('#collectionTimeOpdSponsor'+billDetailsId).text());
	 
	 
	 var sndtolabflag	= $("#sndtolabflag"+billDetailsId).text().trim();	    	
	 var sndtoRisflag = $("#sendToRisId"+billDetailsId).text().trim();
	 $("#sndtolabflag").val(sndtolabflag);
	 $("#sendToRisId").val(sndtoRisflag);
		
	var a=parseInt($('#sId'+billDetailsId).text());
	 //$('#servIdOpdSponsor').val(a);
	 
	 $('#servIdOpdSponsor').select2('val',a);
	 
	 $("#serviceid").val(a); 
	 
	  if(a == '11' || a == '12' || a == '13'){  // addeded Rohini
			
		  var treatmentId=$('#treatmentId').text();
			
		  if(a == '11'){
			cancelLabTestCheckService(treatmentId,billDetailsId); 
		  }else if(a == '12'){
			  cancelRisTestforEditCheck(billDetailsId,'edit'); 
		  }else if(a == '13'){
			  cancelLabTestCheckService(treatmentId,billDetailsId); 
			  cancelRisTestforEditCheck(billDetailsId,'edit');
		  }
			//cancelRisTest(billDetailsId,callFrom);
		//	cancelRisTestforEditCheck(billDetailsId,'edit');
			
			var sndtolabflag	= $("#sndtolabflag"+billDetailsId).text().trim();	    	
		    var sndtoRisflag = $("#sendToRisId"+billDetailsId).text().trim();
		    	
			if(cancelTestSmplColFlag=="Y" || risReportFlag=="Y" || sndtolabflag == "Y" || sndtoRisflag =="Y"){
				$("#servIdOpdSponsor").attr("disabled", true);//	$('#servIdOpdSponsor').attr("readonly",true); // .select('disable');
			    $('#perticularOpdSponsor').attr("readonly",true);
			}			
		   
	  }
	  
	 var defchargesfromConf=$('#genRate'+billDetailsId).text();
	
	 $('#defchargesfromConf').val(defchargesfromConf);
	 
	 var conPer=$('#consPercSpon'+billDetailsId).text();
	 if(conPer=="" || conPer==null || isNaN(conPer)){
		 $('#concessionOpdSponsorOnPerc').val(0);
	 }else{
		 $('#concessionOpdSponsorOnPerc').val($('#consPercSpon'+billDetailsId).text());
	 }
	
	// $('#concessionOpdSponsorOnPerc').val(0);
	 
	 var subserviceid= parseInt($('#subserviceid'+billDetailsId).text());
	 $('#selPerticularOpdSponsor').select2('val',subserviceid);
	// alert(subserviceid);
	 $("#subserviceid").val(subserviceid);
	 
	 var spId = parseInt($('#spclIdSponsor'+billDetailsId).text());
	 $("#specialityIdSponsor").select2('val',spId);
	 
	 getDoctorBySpecialization('sponsorOpdBill','doctorNameOpdSponsor');
	
	var d=parseInt($('#dId'+billDetailsId).text());
	$('#doctorNameOpdSponsor').select2('val',d);	
	$('#rateOpdSponsor').val($('#char'+billDetailsId).text());	
	$('#qtyOpdSponsor').val($('#q'+billDetailsId).text());	
	var amt=Number($('#char'+billDetailsId).text()) * Number($('#q'+billDetailsId).text());	
	
	//added By Tarique Aalam
	var emrP =parseFloat($('#emrPerSpon'+billDetailsId).text());
	$('#emrPer').val( emrP);
	if (emrP > 0) {
		$("#emrChrFlag").prop("checked", true);
		$('#emrPer').css("display","inline");
	}
	
	$('#amountOpdSponsor').val(amt);
	$('#amountOpdSponsor').attr('readonly', 'true');
	$('#concessionOpdSponsor').val($('#oCon'+billDetailsId).text());
	//$('#concessionOpdSponsor').val(0);	
	//$('#payOpdSponsor').val($('#oPay'+billDetailsId).text());
	$('#payOpdSponsor').val($('#p'+billDetailsId).text());
	$('#coPayOpdSponsor').val(0);	
	 $('#chkOpdBill'+billDetailsId).change(function() {//This function use to call clear fields
            clearAllFieldsOfOpd();           
    });
	 
	 $("#narrationBill").val('narrationBill');
	 $('#rateOpdSponsor2').val($('#char'+billDetailsId).text());
}



/**
 * @code for sponsor charges in billing on sponsor tab
 * @date 30-JUN-2017**/
function fetchDataForSponser() {
	var subservicesids=[];
	var tretId=$('#treatmentId').text();
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	$(".subservicesclass").each(function() {
		//var subservicesids=$(this).text();
		subservicesids.push(parseInt($(this).text()));
		
		
	});
	/*alert("subservicesids:"+subservicesids);
	return false;*/
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	var inputs = [];	
	inputs.push("subservicesids="+ encodeURIComponent(subservicesids));
	inputs.push("tretId="+ encodeURIComponent(tretId));
	inputs.push("sponsorId="+ encodeURIComponent(sponsorId));
	inputs.push("chargesSlaveId="+ encodeURIComponent(chargesSlaveId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/billNoble/fetchDataForSponser",
		data	: str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			console.log(r);
		}
		
	});
	
}

/**
 * @code for sponsor charges in billing on sponsor tab
 * @date 30-JUN-2017**/
function getPatientBillAmountForSponsor(r,call) {
	
	$('#saveServiceCallFrom').val(call);
	var tFlag = "AT";
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform" : r
		},
		// url : "ehat/billNoble/fetchPatientBillAmountForOpdSponsor",
		url :"ehat/billNoble/fetchPatientBillAmount",*/
		
		data : {
			"tFlag" : tFlag,
			"treatmentId" : r
		},
		url : "ehat/opdbill/fetchPatientBillAmount",
		success : function(r) {			
			
			setBillDetailsTempForSponsor(r);
			$('#amountOpdSponsor').attr('readonly', 'true');
			$('#concessionOnPerc').val(0);
			
			
		}
	});
}

var totAmt=0;
/**
 * @code for sponsor charges in billing on sponsor tab
 * @date 30-JUN-2017**/
function setBillDetailsTempForSponsor(r){
	
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
			+	'<input type="checkbox" onclick="setSlaveChk1('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+ r.listBillNobleDto[i].serviceId+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'
			+	'<td style="display:none;"><input type="hidden" id="regBillIds" value="'+ r.listBillNobleDto[i].billDetailsId +'"><input type="hidden" id="regBillId" value="'+ r.listBillNobleDto[i].billDetailsId +'"> </td>'

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
			+	'<div class="text-right mainAddedInTotal" id="tamts'+(r.listBillNobleDto[i].serviceId)+'">' + (r.listBillNobleDto[i].otherAmount).toFixed(2) +'</div></td>'
			
			+	'<td  class="text-center" ><a style="cursor:pointer;display:none;"> '
            +'<button class="btn btn-xs btn-success" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'sponsor\',\'No\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			+	'</tr>';
			
			
			totAmt=totAmt+r.listBillNobleDto[i].otherAmount;
			
			
		}/*else if(r.listBillNobleDto[i].serviceId==2){
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'
			+	'<input type="checkbox" onclick="setSlaveChk1('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+ r.listBillNobleDto[i].serviceId+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+i+'" onclick="getSubServiceDetailsForSponsor('+treatmentId+','+ r.listBillNobleDto[i].serviceId +')">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillNobleDto[i].serviceName +'</div>'			
			+ 	'<div class="col-md-1">'
			+ 	'<i class="fa fa-chevron-down" id="list'+i+'"></i>'
			+	'</div>'
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'
			+	'<div id="collapseOne'+i+'" class="panel-collapse collapse">'
			+	'<div class="panel-body">'
			+	'<table class="table table-hover">'
			+	'<thead>'
			+	'<tr>'
			+	'<th class="only-checkbox">#</th>'
			+	'<th>Doctor Name</th>'
			+	'<th>'
			+	'<div class="text-center">Amount</div>'
			+	'</th>';
			
			var concessionFlow)=$('#concessionFlow').val();			
			
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
				+	'<div class="text-center">Disc</div>'
				+	'</th>'
				
				+	'<th style="display:none">'
				+	'<div class="text-center">Disc Per%</div>'
				+	'</th>';
			}
			setBill=setBill
			+	'<th>'
			+	'<div class="text-center">Pay</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'
			
		
			
			+	'<th class="only-checkbox">Edit</th>'
			+	'<th class="only-checkbox">Cancel</th>'
			
			+	'<th class="only-checkbox">ChB</th>'
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceDataOpdSponsor">'
		
			+	'</tbody>'
			+	'</table>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			+	'<td><div class="text-center">' + r.listBillNobleDto[i].serviceCount +'</div></td>'
			+ 	'<td>'
			+	'<div id="tamt'+(r.listBillNobleDto[i].serviceId)+'" class="text-right">' + (r.listBillNobleDto[i].otherAmount).toFixed(2) +'</div></td>'
			
			+	'<td  class="text-center" ><a style="cursor:pointer;"> '
            +'<button class="btn btn-xs btn-success editUserAccess" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'sponsor\',\'No\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			+	'</tr>';
			
			totqyt=totqyt+ r.listBillNobleDto[i].serviceCount;
			totAmt=totAmt+r.listBillNobleDto[i].otherAmount;
		}*/else if(r.listBillNobleDto[i].serviceId == pharmaId){}
		else{
		
			
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'// added by vinod
			+	'<input type="checkbox" onclick="setSlaveChk1('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+(r.listBillNobleDto[i].serviceId)+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'// added by vinod
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo'+i+'" onclick="getSubServiceDetailsForSponsor1('+i+','+treatmentId+','+ r.listBillNobleDto[i].serviceId +')">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillNobleDto[i].serviceName +'</div>'			
			+ 	'<div class="col-md-1">'
			+ 	'<i class="fa fa-chevron-down" id="list'+i+'"></i>'
			+	'</div>'
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'
			+	'<div id="collapseTwo'+i+'" class="panel-collapse collapse">'
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
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-center">Amount</div>'
			+	'</th>';;
			
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
				+	'<div class="text-center">Disc</div>'
				+	'</th>'
				
				+	'<th style="display:none">'
				+	'<div class="text-center">Disc Per%</div>'
				+	'</th>';
			}
			setBill=setBill
			
						
			+	'<th>'
			+	'<div class="text-center">Pay</div>'
			+	'</th>'
			

			/*+	'<th>'
			+	'<div class="text-center">Co-Pay</div>'
			+	'</th>'*/
			
			
			+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'
			+	'<th class="only-checkbox">Edit</th>'
			+	'<th class="only-checkbox">Cancel</th>';
			if(r.listBillNobleDto[i].isCombination=='Y')
			{
			setBill=setBill	+ '<th class="only-checkbox">Pkg</th>';
			}
			setBill=setBill
			+	'<th class="only-checkbox">ChB</th>'
			
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceDataOpdSponsorr'+i+'">'
		
			
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
			+	'<div id="tamt'+(r.listBillNobleDto[i].serviceId)+'" class="text-right">' + (r.listBillNobleDto[i].otherAmount).toFixed(2) +'</div></td>'
			
			+	'<td  class="text-center" ><a style="cursor:pointer;"> '
            +'<button class="btn btn-xs btn-success" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'sponsor\',\'No\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			+	'</tr>';// added by vinod	
			
			totqyt=totqyt+ r.listBillNobleDto[i].serviceCount;
			totAmt=Number(totAmt)+Number((r.listBillNobleDto[i].otherAmount).toFixed(2));
		
		}
	}
	
	//alert(totqyt);
	//alert(totAmt);
	//alert(callFrom);

		totAmt=parseFloat(totAmt).toFixed(2);
	
		$("#billDetails").html("");
		
		$("#totalQtys").text(totqyt);
		$("#totalAmts").text(totAmt);
		
		$("#sponsor").html(setBill);
	
		//$("#cghsBill").html(setBill);
	
}

/**
 * @code for sponsor doctor charges in billing on sponsor tab
 * @date 30-JUN-2017**/
function getSubServiceDetailsForSponsor(t,s){
	//alert("hiiii");
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		/*url : "ehat/billNoble/getPatientServiceBillForOpdSponsor",*/
		url : "ehat/billNoble/getPatientServiceBill",
		
		success : function(r) {
			
			getSubServiceDetailsTempForSponsor(r,s);
			/*var id=s;
			
			if(($('#chkOpdBillReg'+id).prop("checked") == true)){
	    	   			    	
		    	$('.billSlaveChk'+id).prop('checked', true);       	
		    	
		    }else{
		    	
		    	$('.billSlaveChk'+id).removeAttr("checked");    			    	
		    }*/
		}
	});
}

/**
 * @code for sponsor charges in billing on sponsor tab
 * @date 30-JUN-2017**/
function getSubServiceDetailsTempForSponsor(t,s)
{
	
	var setService="";
	//var treatmentId=$('#treatmentId').text();
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		
		var a=1+i;
		var datetime= new Date(t.listBillNobleServiceDto[i].createdDateTime).toLocaleDateString('en-GB');
		
		
		if ((t.listBillNobleServiceDto[i].paidFlag=="Y") || (t.listBillNobleServiceDto[i].cancle =="Y"))
		{
			
			setService = setService + '<tr>';
		}else
		{
			setService = setService + '<tr onclick="editSponsorOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')">';
		}
			
		
		
		setService=setService
		//+	'<tr>'
		
		+	'<td style="display:none;" id="bdId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>'

		+ '<td style="display:none;" id="doc'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'

		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
		+	'<td style="display:none;" id="docId'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+ t.listBillNobleServiceDto[i].docId +'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'
		+	'<td style="display:none;" id="oCon'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherConcession+' </td>'
		+	'<td style="display:none;" id="oPay'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherPay+' </td>'
		+	'<td style="display:none;" id="quantity'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].quantity+' </td>'
		+	'<td style="display:none;" id="oCoPay'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherCoPay+' </td>'
		+	'<td style="display:none;" id="genRate'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].rate+' </td>'

		
		+	'<td style="display:none;"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>'
		
		+	'<td> '+ a +' </td>';
		
	
			setService = setService + '<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docName +' </td>';

		// added by vinod

		
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
			+	'</td>';
			
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
				+   '<input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+Number(t.listBillNobleServiceDto[i].otherRate)+'">'
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+(t.listBillNobleServiceDto[i].otherRate)+'"></td>';
				
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
				+   '<input type="hidden" class="notInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+Number(t.listBillNobleServiceDto[i].otherRate)+'">'
				+	'</td>';
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+(t.listBillNobleServiceDto[i].otherRate)+'"></td>';
				
			}		
		}
		// added by vinod
		var concessionFlow=$('#concessionFlow').val();			
		
		if(concessionFlow == "on"){
			setService = setService
		
		+	'<td id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td id="consPercSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
		+	'</td>';
		}else{
			setService = setService
			
			+	'<td style="display: none;" id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td style="display: none;" id="consPercSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
			+	'</td>';
			
		}
		setService = setService 
		
		+	'<td id="p'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherPay).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td id="dateSub'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-right" id="dateSubservice">'+ datetime +'</div>';
		+ 	'</td>'	;
		
		
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="editSponsorOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"></a></td>';
		}else{
			
			if (t.listBillNobleServiceDto[i].cancle =="Y") {
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'"  disabled="disabled" onclick="editSponsorOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			}else{
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'"  onclick="editSponsorOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			}			
		}		
		
		
		
		
		/*if (t.listBillNobleServiceDto[i].cancle =="Y" || (t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
		} else {
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
		}*/
			
		setService = setService +	'<td class="only-checkbox" >';
		
		if(t.listBillNobleServiceDto[i].paidFlag=="N" && t.listBillNobleServiceDto[i].cancle=="N"){
			
			setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave1('+t.listBillNobleServiceDto[i].billDetailsId+','+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" checked=checked id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
			
		}else{
			
			setService = setService +	'<input type="checkbox" disabled="disabled" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
			
		}
		
		
		setService = setService +	'</td>';
				
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';		
		
}
	
	$("#serviceDataOpdSponsor").html(setService);
}


/**
 * @code for sponsor charges in billing on sponsor tab
 * @date 30-JUN-2017**/
function getSubServiceDetailsForSponsor1(i,t,s)
{
	//alert("hii");
	//var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform" : t,
			"call" : s,
			"chargesSlaveId" : chargesSlaveId
		},*/
		/*url : "ehat/billNoble/getPatientServiceBillForOpdSponsor",*/
		//url : "ehat/billNoble/getPatientServiceBill",
		
		data : {
			"treatmentId" : t,
			"serviceId" : s
		},
		//url : "ehat/billNoble/getPatientServiceBill",
		url : "ehat/opdbill/getPatientServiceBill",
		success : function(r) {
			
			getSubServiceDetailsForSponsorTemp1(i,r,s);
		//	userAccess();
			
			setTimeout(function(){userAccess();},300);
			//resetAll('sponsor')
			/*var id=s;
			
			if(($('#chkOpdBillReg'+id).prop("checked") == true)){
	    	   			    	
		    	$('.billSlaveChk'+id).prop('checked', true);       	
		    	
		    }else{
		    	
		    	$('.billSlaveChk'+id).removeAttr("checked");    			    	
		    }*/
		}
	});
}



/**
 * @code for sponsor charges in billing on sponsor tab
 * @date 30-JUN-2017**/
function getSubServiceDetailsForSponsorTemp1(j,t,s)
{
	var setService="";
	
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		var a=1+i;
		
		var datetime12= new Date(t.listBillNobleServiceDto[i].createdDate).toLocaleDateString('en-GB');
		var dname= t.listBillNobleServiceDto[i].docName;
		
		var netAmt=Number(t.listBillNobleServiceDto[i].otherAmount)-Number(t.listBillNobleServiceDto[i].concession);
		var osidd=t.listBillNobleServiceDto[i].serviceId;
		var cghsCode = "("+t.listBillNobleServiceDto[i].cghsCode+")";
		var netAmtSpo=Number(t.listBillNobleServiceDto[i].otherAmount)-Number(t.listBillNobleServiceDto[i].otherConcession);
		if(cghsCode == "" || cghsCode == "-" || cghsCode=="()" || cghsCode=="(-)" || cghsCode=="(null)"){
			cghsCode="";
		}
		if(dname==null){
			
			dname="-";
		}
		
		if(t.listBillNobleServiceDto[i].paidByCashFlag == "Y"){
			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")
				|| (t.listBillNobleServiceDto[i].cancle == "Y")
				|| (t.listBillNobleServiceDto[i].isModify == "N")) {
			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';
		} else {
			setService = setService + '<tr bgcolor="lightblue" id="tr'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';
		}
		}else{
			if ((t.listBillNobleServiceDto[i].paidFlag == "Y")
					|| (t.listBillNobleServiceDto[i].cancle == "Y")
					|| (t.listBillNobleServiceDto[i].isModify == "N")) {
				setService = setService + '<tr id="tr'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';
			} else {
				//setService = setService + '<tr onclick="editSponsorOnClick(' + t.listBillNobleServiceDto[i].billDetailsId + ')" id="tr' + (t.listBillNobleServiceDto[i].billDetailsId) + '">';
		    	setService = setService + '<tr  id="tr' + (t.listBillNobleServiceDto[i].billDetailsId) + '">';
			}
		}
		
				
		
		setService=setService
		
		//+	'<tr id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+ '<td style="display:none;" id="row'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'
			
		
		+	'<td> '+ a +' </td>'
		+	'<td style="display:none;" id="bdId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>';

		
		
			
			if (osidd == 14) {

				setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ t.listBillNobleServiceDto[i].invName +cghsCode+' </td>';
			}else if (osidd==11 || osidd==13){//Added by laxman for sended lab test coloe change. 
				
				if((t.listBillNobleServiceDto[i].sndtolabflag)=="Y"){
					setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: green;"> '
					+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
				}else if((t.listBillNobleServiceDto[i].sndtorisflag)=="Y"){
					setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: #00bfff;"> '
					+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
			}else{
				setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
				}
				
				}//code By Sanjay on 26-03-2018 for changes the testname color when it sent to RIS
			else if (osidd==12){
					
					if((t.listBillNobleServiceDto[i].sndtorisflag)=="Y"){
						setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: #00bfff;"> '
						+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
					}else{
					setService = setService + '<td id="catName'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
							+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
					}
					
				}else {

					setService = setService + '<td id="catName'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
							+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
				
			}	
		

		setService = setService

		+	'<td style="display:none;" id="barCode'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].barCode+' </td>'
		
		+	'<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ dname+' </td>'
		
		+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].subServiceId+' </td>'
		
		+	'<td style="display:none;" id="isServModify'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isModify+' </td>'
		
		+	'<td style="display:none;" id="spclIdSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].specialityId+' </td>'
		
		+	'<td style="display:none;" id="dId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'
		
		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
				
		+	'<td style="display:none;" id="amt'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherAmount+' </td>'
		
		+	'<td style="display:none;" id="genRate'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].rate+' </td>'
		
		+	'<td style="display:none;" id="oCon'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherConcession+' </td>'

		+	'<td style="display:none;" id="oPay'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherPay+' </td>'
		
		+	'<td style="display:none;" id="emrPerSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].emrPer+' </td>'
		
		+	'<td style="display:none;" id="isCombinationSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isCombination+' </td>'
 
		
		+	'<td style="display:none;" id="oCoPay'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherCoPay+' </td>'
		
		+	'<td style="display:none;" id="sndtolabflag'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtolabflag+' </td>'

		+	'<td style="display:none;" id="sampleTypeOpdSponsorr'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sampleTypeId+' </td>'

		+	'<td style="display:none;" id="barCodeIdOpdSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].barCode+' </td>'

		+	'<td style="display:none;" id="inOutHouseOpdSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].inOutHouse+' </td>'
		+	'<td style="display:none;" id="histopathLabOpdSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].histopathLab+' </td>'

		+	'<td style="display:none;" id="collectionDateOpdSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionDate+' </td>'

		+	'<td style="display:none;" id="collectionTimeOpdSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionTime+' </td>'

		+	'<td style="display:none;" id="isTemplateWiseTestSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].templateWise+' </td>'
		
		
		// added by vinod
		+	'<td style="display:none;" id="sendToRisId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtorisflag +' </td>'
		
		//added Rohini
		+	'<td style="display:none;" id="payFlag'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].paidFlag+' </td>';
		//Code  by Sanjay
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService +'<td style="display:none;"> '
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
			+	'</td>'
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].otherRate.toFixed(2) +'</div>'
			+	'</td>';
		
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
				+	'</td>';
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}			
			
		}// added by vinod
		
		if(t.listBillNobleServiceDto[i].paidByCashFlag == "Y"){
			setService = setService + '<td id="q'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].quantity +'</div>'
			+	'</td>'
			
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherAmount).toFixed(2) +'</div>'
			+	'</td>';
			
			var concessionFlow=$('#concessionFlow').val();			
			
			if(concessionFlow == "on"){
				setService = setService
			+	'<td id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td id="consPercSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
			+	'</td>';
				}else{
					setService = setService
					+	'<td style="display: none; id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
					+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
					+	'</td>'
					
					+	'<td style="display: none; id="consPercSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
					+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
					+	'</td>';
				
			}
			setService = setService
			
			
			+	'<td id="p'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherPay).toFixed(2) +'</div>'
			+	'</td>'
			
			/*+	'<td id="cP'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherCoPay).toFixed(2) +'</div>'
			+	'</td>'*/
			
			+	'<td id="dateSub'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-right" id="dateSubservice">'+ datetime12 +'</div>';
			setService = setService +	'</td>';
			
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
				
				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editSponsorOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				
			}else{
				
				if (t.listBillNobleServiceDto[i].cancle =="Y" || t.listBillNobleServiceDto[i].isModify=="N") {
					setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editSponsorOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				}else{
					setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editSponsorOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				}
			}	
					
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
				
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				
			}else{
				
				if (t.listBillNobleServiceDto[i].cancle =="Y") {
					setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}	
			if(t.listBillNobleServiceDto[i].isCombination=='Y')
			{
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success" data-toggle="modal" data-target="#pack"  onclick="getPackagedataforOpd('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'sponsor\','+ t.listBillNobleServiceDto[i].otherAmount +','+ t.listBillNobleServiceDto[i].otherConcession +')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			//Added By BILAL For pring of Package
	        
				
			  /*if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
					
					setService = setService +'<td class="col-md-1 center" ><a style="cursor:pointer;"> '
				                            +'<button class="btn btn-xs btn-success editUserAccess"' 
				                            +'  onclick="printopdpackage('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'sponsor\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" '
				                            +'value="EDIT"><i class="fa fa-print"  id=btnpack'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
		        }*/
	       	
			
			}
				
			setService = setService +	'<td class="only-checkbox" >';
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N" && t.listBillNobleServiceDto[i].cancle=="N"){
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave1('+t.listBillNobleServiceDto[i].billDetailsId+','+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
			}else{
				
				setService = setService +	'<input type="checkbox" disabled="disabled" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';			
			}
		}else{
			setService = setService + '<td id="q'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].quantity +'</div>'
			+	'</td>'
			
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherAmount).toFixed(2) +'</div>'
			+	'</td>';
			
			var concessionFlow=$('#concessionFlow').val();			
			
			if(concessionFlow == "on"){
				setService = setService
			+	'<td id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td id="consPercSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
			+	'</td>';
				}else{
					setService = setService
					+	'<td style="display: none; id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
					+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
					+	'</td>'
					
					+	'<td style="display: none; id="consPercSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
					+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
					+	'</td>';
				
			}
			setService = setService
			
			
			+	'<td id="p'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			// +	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherPay).toFixed(2) +'</div>'
		/*	+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
			+	'</td>'*/
			
			+	'<div class="text-center">'+ (netAmtSpo).toFixed(2) +'</div>'
			+	'</td>'
			
			/*+	'<td id="cP'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherCoPay).toFixed(2) +'</div>'
			+	'</td>'*/
			
			+	'<td id="dateSub'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-right" id="dateSubservice">'+ datetime12 +'</div>';
			setService = setService +	'</td>';
			
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
				
				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editSponsorOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				
			}else{
				
				if (t.listBillNobleServiceDto[i].cancle =="Y" || t.listBillNobleServiceDto[i].isModify=="N") {
					setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editSponsorOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				}else{
					setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editSponsorOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				}
			}	
					
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
				
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				
			}else{
				
				if (t.listBillNobleServiceDto[i].cancle =="Y") {
					setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
				} else {
					setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				}
			}	
			if(t.listBillNobleServiceDto[i].isCombination=='Y')
			{
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#pack"  onclick="getPackagedataforOpd('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'sponsor\','+ t.listBillNobleServiceDto[i].otherAmount +','+ t.listBillNobleServiceDto[i].otherConcession +')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			//Added By BILAL For pring of Package
	        
				
			  if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
					
					setService = setService +'<td class="col-md-1 center" ><a style="cursor:pointer;"> '
				                            +'<button class="btn btn-xs btn-success"' 
				                            +'  onclick="printopdpackage('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'sponsor\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" '
				                            +'value="EDIT"><i class="fa fa-print"  id=btnpack'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
		        }
	       	
			
			}
				
			setService = setService +	'<td class="only-checkbox" >';
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N" && t.listBillNobleServiceDto[i].cancle=="N"){
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave1('+t.listBillNobleServiceDto[i].billDetailsId+','+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" checked=checked id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
			}else{
				
				setService = setService +	'<input type="checkbox" disabled="disabled" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';			
			}
		}
		
				
		setService = setService +	'</td>';
		
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';			
	}
	
	$("#serviceDataOpdSponsorr"+j).html(setService);
	//sendToPhlebotomyFromSaveSponsor(1);//Added by kishor
	var sendTestFlagMeesha=$("#sendTestFlagMeesha").val();
	if(sendTestFlagMeesha == "on"){
		//sendToPhlebotomyFromSave(0);// send test automatically to LIS after save
		sendToPhlebotomyFromSaveSponsor(0);
	}
	
}


/************
 *@author	: Kishor Lokhande
 *@date		:  31-July-2017
 *@code		:save Sponsor Service Bill Details
 ***********/
function saveServiceToSponsorPatient(callform2){
	var userId = $("#userId").val();
	var emrPer=$('#emrPer').val();    // added by Tarique Aalam
	if (emrPer == "" || emrPer == null || emrPer == undefined) 
	{
		emrPer=0;
	}
	
	var ratevalidation = $('#rateOpdSponsor').val();
	
	/*if (ratevalidation == "" || ratevalidation == null || ratevalidation == undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
		ratevalidation = 0;
		alert("Please Enter Rate");
		return false;
	}*/
	
	//Added By BILAL For narration of receipt at the time of edit
	var narration =$("#narration").val();
	if (narration == "narration") {
		setnarationpopup();
		return false;
	}
	if (narrationid != "" || narrationid != null || narrationid != undefined) {
		closePopupnarration();
	}
	
	var narrationid =$('#narrationid').val();
	if (narrationid == "" || narrationid == null || narrationid == undefined) {
		narrationid="-";
	}
    
	//Added By Kishor For narration of Bill at the time of edit
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
	
	var SponsorOtherRate  = $("#chargesfromConf").val();
	var SponsorGeneralRate  = $("#defchargesfromConf").val();
	//alert("gen=>"+SponsorGeneralRate);
	
	//alert(otherRate);
	var serviceId	 =  $("#serviceid").val();
	var callfrom =$('#saveServiceCallFrom').val();
	
	var masterReceiptId =$('#receiptMasterId').val();
	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	var concessionOpdSponsorOnPerc =($("#concessionOpdSponsorOnPerc").val());
	
	var iscombination =$("#iscombinationsponsor").val();
	var receiptOf  =$('#receiptOf').val();
	var recSlaveId  =	$('#receiptSlaveId').val();
	
	if (recSlaveId == "" || recSlaveId == null || recSlaveId == undefined || isNaN(recSlaveId)) {
		recSlaveId = 0;
	} 
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	if(callform2 =="sponsorpack"){
		sponsorId =0;
		//chargesSlaveId = 0;// comminted by dayanand 2-2-2023
	} 
	if (masterReceiptId == "" || masterReceiptId == null || masterReceiptId == undefined || isNaN(masterReceiptId)) {
		masterReceiptId = 0;
	}
	
	if (serviceId == "" || serviceId == null || serviceId == undefined || isNaN(serviceId)) {
		serviceId = 0;
	}
	
    var sndToLabFlag = $("#sndtolabflag").val().trim(); // Rohini
	
	if(sndToLabFlag == "" || sndToLabFlag == null || sndToLabFlag == undefined){
		sndToLabFlag="N";
	}
	
	//Sanjay Kr Shah
    var sendToRisId = $("#sendToRisId").val().trim();
	/*alert(callform);
    return false;*/
	
	var queryType  =	$('#queryType').val();
	//var recSlaveId  =	$('#receiptSlaveId').val();	//receipt slave id	
	var doctorId = $( "#doctorNameOpdSponsor option:selected" ).val();
	var billDetailsId =$('#billDetailsId').val();
	//var totalAmt		= parseFloat($("#payable").val()); 
	//var totalPaid		= parseFloat($("#payNow").val());
	
	/*alert(billDetailsId);
	return false;*/
	/*var num = isNaN(parseInt(doctorId)) ? 0 : parseInt(doctorId);*/
	//alert(doctorId);
	var	patienttId   =  $("#pId").val();
	//var doctorId =$('#doctorName').val();
	var treatmentId  =  $("#tId").val(); 
		
	var	departmentId = $("#depdocdeskid").val(); ;
	var billId       =  parseInt($("#billNo").html());//$("#bNo").val();  
	var	sourceTypeId =  $("#sourceTypeId").val();;
	var otherRate         =  $("#rateOpdSponsor").val();
	var otherConcession   =  $("#concessionOpdSponsor").val();
	var quantity     =  $("#qtyOpdSponsor").val();
	var otherAmount       =  $("#amountOpdSponsor").val();
	
	var otherPay       	 =  $("#payOpdSponsor").val();
	var otherCoPay        =  $("#coPayOpdSponsor").val();
	var createdDateTime   = $("#finalDate").val();
	
	var subServiceId =  $("#subserviceid").val();
	var pharmaId=$("#pharmacyInvoice").val();
	var  drdeskflag="N";
	var pharmacyInvname = $("#perticularOpdSponsor").val();  //Pooja
	var update = $('#queryType').val();
	if(update != "update"){
		if(subServiceId == 0 && pharmacyInvname != ""){
			subServiceId = 9;
			serviceId =$("#pharmacyInvoice").val();//only for invoice 
			//serviceId =$("#servId").val();//only for invoice 
			drdeskflag =$("#perticularOpdSponsor").val();
		}
	}else{
		if(serviceId == pharmaId && subServiceId == 9 && pharmacyInvname != ""){
			drdeskflag =$("#perticularOpdSponsor").val();
	}
		}
	//alert(subServiceId);
	if(subServiceId == 0){
		alert("Please Enter valid Service Name");
		$('#perticular').val("");
		$("#rate").val("");
		$("#qty").val("1");
		$("#concession").val("0");
		$("#amount").val("0");
		$("#pay").val("0");
		$("#coPay").val("0");
		$("#servId").val("0");
		$("#servIdOpdSponsor").val("0");
		//$('#saveServiceCallFrom').val("0");
		$("#concessionOpdSponsorOnPerc").val(0);
		return false;
	}
	
	var ratevalidation = $('#rateOpdSponsor').val();
	
	/*if (ratevalidation == "" || ratevalidation == null || ratevalidation == undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
		ratevalidation = 0;
		alert("Please Enter Rate");
		return false;
	}*/
	
    var subservicesname   = $("#perticularOpdSponsor").val();
    
    var servicename  = $("#servicename").val();
    var unitId       = $("#uId").val();
    var module 	   	 = "opd";
    
    var rate=0;
    var coPay=0;
    var pay = 0;
    var amount=0;
    var concession=0;
    if(SponsorGeneralRate== -10)	
    	{
    /*	rate=otherRate;
    	amount=(otherRate * quantity) ;
	  // alert("In iff"+otherAmount);
	    coPay = amount-otherConcession;
	    pay = 0;
	    concession=$("#concessionOpdSponsor").val();*/
	    //alert(otherPay);
	    rate=otherRate;
    	var amount=(otherRate * quantity) ;
	  // alert("In iff"+otherAmount);	    	
    	var otherconAmt=((concessionOpdSponsorOnPerc * amount)/100).toFixed(2);
	    var pay=0;		    
	    var coPay=amount-otherconAmt;
	        concession  =  otherconAmt;
	    
    	}
    else{
    	/* //var otherRate=chargesfromConf ;
    	rate=SponsorGeneralRate;	
	    amount=(rate * quantity) ;		    
	    //alert("In else"+otherAmount);
	   pay=0;
	    
	   coPay=amount-otherConcession;
	   concession=$("#concessionOpdSponsor").val();*/
	    //alert(otherPay);		   
	   
	  // otherRate=rate;
	  
	   // alert(otherPay);
	 //var otherRate=chargesfromConf ;
	   rate=SponsorGeneralRate;	    	
	    var amount=(rate * quantity);		    
	    var otherconAmt=((concessionOpdSponsorOnPerc * amount)/100).toFixed(2);	    			    
	    //alert("In else"+otherAmount);
	   pay=0;		    
	   coPay=amount-otherconAmt;
	   concession  =  otherconAmt;
	    //alert(otherConcession);
    	
	 
    }
   
    var tempDate = createdDateTime.split("/");
	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	//alert(addDate);
	/*alert(createdDateTime);
	var regdate = $("#dateSubservice").html();
	var date1 = regdate.split("&nbsp;&nbsp;");
	var rdate = new Date(date1[0]);
	rdate.setHours(0, 0, 0, 0);*/
	/*if (addDate.getTime() < rdate.getTime()) {
		alert("Date should not be before registration date!");
		$("#finalDate").val(today);
		return false;
	}*/
    
	if (subServiceId == "" || subServiceId == null || subServiceId == undefined || isNaN(subServiceId)) {
		subServiceId = 0;
	}
	
	if (subservicesname == "" ||  subservicesname ==null) {
		alert("Please enter servicename ");
		return false;
	}
	if(unitId ==0){
		unitid = $("#allunitid").val();
	}
	
	//Added By Kishor For Barcode PopUP
	var barcodeNo=0;/*$('#barcodeNoOpdSponsor').val();
			if($('#businessType').val() == 2){					
				if (barcodeNo == 0 || barcodeNo == "" || barcodeNo == null || barcodeNo == undefined) {
					alertify.error("Please Enter Barcode!!!");
					return false;
		}	
		
	}*/
	/*var doctorsel = $("#doctor2 :selected").val();
	
	if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
		alert("Please Select doctor ");
		return false;	
	}
	if (ClinicalNotes == "" ||  ClinicalNotes ==null) {
		ClinicalNotes="-";
	}
	if (instructions == "" ||  instructions ==null) {
		instructions="-";
	}*/
	//added by kishor for pathology
	
	var sampleTypeId  =	$('#sampleType').val();
	//var barCode  =	$('#barCode').val();
	var inOutHouse = 0;
	var histopathLab = "N";
	if(serviceId == 11){
		
		inOutHouse = $('#inOutHouseCount').val();
		histopathLab = $('#histopathLab').val();
	}
	
	var customerType = 0; //$('#customerType').val();	
	var customerId = 0; //$('#customerId').val();	
	var businessType = 2;//$('#businessType').val();
	var prepaidReceiptId = 0;//$('#prepaidReceiptId').val();
	var collectionDate = $('#collectionDate').val();
	var collectionTime = $('#collectionTime').val();
	var regRefDocId = 0;//$('#refDocId').val();
	
	if(sampleTypeId <= 0 || sampleTypeId == undefined){
		sampleTypeId = 0;
	}
	
	if(parseInt(doctorId) > 0){
		
		var specialityId = $('#specialityIdSponsor').val();
		if(specialityId == undefined || specialityId == null || specialityId == "0"){
			
			alert("Please select speciality of doctor");
			return false;
			specialityId = 0;
		}
	}
	
	var templateWiseTestFlag = $("#templateWiseTestFlag").val();
	
	var defaultFlag = $("#defaultPkgFlag").val();
	
	var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());
	var serviceDetails = {
			listBillDetails : []
		};
	serviceDetails.listBillDetails.push({
		
		patienttId : patienttId,
		billDetailsId : billDetailsId,
		serviceId : serviceId,
		specialityId : specialityId,
		doctorId : doctorId,
		treatmentId : treatmentId,
		departmentId : departmentId,
		billId : billId,
		sourceTypeId : sourceTypeId,
		rate : rate,
		otherConcession : otherConcession,
		quantity : quantity,
		amount : amount,
		pay : pay,
		coPay : coPay,
		//coPay : rate * quantity,
		serviceId : serviceId,
		subServiceId : subServiceId,
		createdBy : userId,
		unitId : unitId,
		createdDateTime : addDate,
		urgentflag : "N",
        recSlaveId : recSlaveId,
        callfrom   : callfrom,
        masterReceiptId : masterReceiptId,
        subservicesname : subservicesname,
        
        sponsorId  : sponsorId,
        chargesSlaveId : chargesSlaveId,
        
        otherRate : otherRate,
        otherAmount : otherAmount,
        otherCoPay : otherCoPay,
        //otherPay : otherPay,
        otherPay : otherRate * quantity,
        concession : concession,
        concessionOnPerc : concessionOpdSponsorOnPerc,
        iscombination : iscombination,
        receiptOf  :  receiptOf,
        narrationidBill : narrationidBill,
        accountStatusOpdDiagno : "N",
		emrPer          : emrPer,
		sndToLabFlag : sndToLabFlag,
        sndToRisFlag:sendToRisId,
        drdeskflag : drdeskflag,
        sampleTypeId : sampleTypeId,
		barCode : barcodeNo,
		inOutHouse : inOutHouse,
		//inOutHouse : 0,
		histopathLab : histopathLab,
		businessType : businessType,
		customerId : customerId,
		customerType : customerType,
		invoiceRemainAmount : otherAmount,
		prepaidReceiptId : prepaidReceiptId,
		collectionDate : collectionDate,
		collectionTime : collectionTime,
		regRefDocId : regRefDocId,
		templateWise : templateWiseTestFlag,
		ivfTreatFlag : "N",
		defaultFlag : defaultFlag
			
	});
	
	serviceDetails = JSON.stringify(serviceDetails);
	
	/*if(listBillDetails == null){
		alert("Service details are Null!!!!");
		return false;
	}*/
	
	var inputs = [];
	// patient details push
	inputs.push("serviceDetails="+ encodeURIComponent(serviceDetails));
	inputs.push("queryType="+ queryType);
	inputs.push("module="+ inOutHouse);
	inputs.push("callfrom="+ callfrom);
	inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
	/*inputs.push("billDetailsId="+ encodeURIComponent(recSlaveId));*/
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/saveCpoe",
		error 	: function() {
					alert('Network Issue!!!');
		  		},
		success : function(r) {
							 
		//if(r >0){
			if (r ==1 && queryType == 'insert') {
				alertify.success("Service assign Successfully");
				
			} else if (r ==2 && queryType == 'update') {
				alertify.success("Service Update Successfully");
				
			}if(r == 33){
				
				var r = confirm("Package is not configured for Sponsor. Do you want Default Package?");
				if (r == true) {
					$("#defaultPkgFlag").val(1);
					saveServiceToSponsorPatient('sponsorpack');
				} else {
					return false;
				}
			}else if(r == 4){
				var r = confirm("Package is not configure for sponsor. Do you want Default Package?");
				if (r == true) {
					
					saveServiceToSponsorPatient('sponsorpack');
				}else{
					
					return false;
				}
				
			}else if(r ==6){
				 alert("Package is out of Date Can't save!!!!");
				
			}else{
				alertify.success("Service Update Successfully");
			}
			
			/*if(queryType=='insert')
				{
				alertify.success("Service assign Sucessfully");
				//alert("Service assign Sucessfully");
				}
			else{
				alertify.success("Service Update Sucessfully");
				//alert("Service Update Sucessfully");
				}*/
			
			//getPatientBillAmount(treatmentId);
			
			 
			$('#perticular').val("");
			
			$("#rate").val("");
			
			$("#qty").val("1");
			    $("#concession").val("0");
			   $("#amount").val("0");
			   $("#pay").val("0");
			   $("#coPay").val("0");
			   
			   $("#servId").val("0");
			   $("#servIdOpdSponsor").val("0");
			   $('#saveServiceCallFrom').val("0");
			   calculatePerticularTotal1();	
			   $("#concessionOpdSponsorOnPerc").val(0);
			//}			
		}	
	});
	$('#queryType').val("insert");
	$('#billDetailsId').val("0");
	$('#subserviceid').val("0");				
	updateBillMasterTotalForOPD();
	/*$(".openAllSlave").trigger('click');	
	getBillReceiptDetails('all');			
	
	if(callfrom != "reciept"){
		
		setTotalPaid();
	}*/
	//$(".openAllSlave").trigger('click');
	//resetAll("sponsor");
	//window.location.reload(true);
	//$('#perticular').attr('readonly', 'false'); 
	$("#perticularOpdSponsor").removeAttr('readonly');
	$("#payOpdSponsor").removeAttr('readonly');
	$("#coPayOpdSponsor").removeAttr('readonly');
	$("#concessionOpdSponsor").removeAttr('readonly');
	$("#qtyOpdSponsor").removeAttr('readonly');
	
	$("#perticularOpdSponsor").val('');
	$("#payOpdSponsor").val('0');
	$("#coPayOpdSponsor").val('0');
	$("#concessionOpdSponsor").val('0');
	$("#rateOpdSponsor").val('0');
	$("#amountOpdSponsor").val('0');
	$("#qtyOpdSponsor").val('1');
	$('#receiptOf').val('general');	
	$("#chargesfromConf").val("0");					
	$("#defchargesfromConf").val("0");
	$("#barcodeNoOpdSponsor").val("0");
	$("#narration").val('');
	$('#narrationid').val('');
	$("#defaultPkgFlag").val(0);
	
	stActiveTab();
	clearAllFieldsOfOpd();
	setTimeout(function() {
	}, 900);
	//window.location.reload(true);
	//sendToPhlebotomyFromSaveSponsor(0);
	//window.location.reload(true);
}
	
/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Save total payble 
 ************/
function setTotalPaid1(){
	
	var total=0;
	$('.mainAddedInTotal').each(function() {
		
		total=total+Number($(this).text());    
	});
	
	$('.addedInTotal').each(function() {
		
		total=total+Number($(this).val());    
	});
	
	$("#payable").val(total);
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Set slave checkboxes according to master
 ************/
/*function setSlaveChk1(id){
	
    if(($('#chkOpdBillReg'+id).prop("checked") == true)){
    	
    	if(id==1){
    		
    		$('#tamt1').removeClass("mainNotInTotal");
        	$('#tamt1').addClass("mainAddedInTotal");
    	}
    	
    	$('.billSlaveChk'+id).prop('checked', true);    	
    	 
    	$('.billSlave'+id).removeClass("notInTotal");
    	$('.billSlave'+id).addClass("addedInTotal");
    	setTotalPaid1();
    }else{
    	
    	if(id==1){
    		
    		$('#tamt1').removeClass("mainAddedInTotal");
        	$('#tamt1').addClass("mainNotInTotal");
    	}
    	
    	$('.billSlaveChk'+id).prop('checked', false);	
    	
    	$('.billSlave'+id).removeClass("addedInTotal");
    	$('.billSlave'+id).addClass("notInTotal");
    	setTotalPaid1();
    }	
}*/

function setSlaveChk1(id){
	
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
    	
    	$('.billSlaveChk'+id).prop('checked', true);       	
    	setTotalPaid("sponsor",id);
    	var ifCurPayable=$("#payable").val();
    	payable=Number(payable)+Number(ifCurPayable);
    
    }else{
    	
    	if(id==1){
    		
    		$('#tamt1').removeClass("mainAddedInTotal");
        	$('#tamt1').addClass("mainNotInTotal");
    	}
    	
    	$('.billSlaveChk'+id).removeAttr("checked");    	
    	setTotalPaid("sponsor",id);
    	var elseCurPayable=$("#payable").val();
    	payable=Number(payable)-Number(elseCurPayable);
    	
    }	    
    $("#payable").val(parseFloat(payable).toFixed(2));
    $("#payNow").val(parseFloat(payable).toFixed(2));
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Set total paid according to slaves
 ************/
/*function setTotalPaidbySlave1(id){
	
    if($('#chkOpdBill'+id).prop("checked") == true){

    	$("#tAmtSlave"+id).removeClass("notInTotal");
    	$("#tAmtSlave"+id).addClass("addedInTotal");
    	setTotalPaid1();
    }else{
    		
    	$("#tAmtSlave"+id).removeClass("addedInTotal");
    	$("#tAmtSlave"+id).addClass("notInTotal");
    	setTotalPaid1();
    }	
}*/

function setTotalPaidbySlave1(billDetailId,sevId,chargesSlaveId){
	
	var sponsorCatId= $("#chargesSlaveId").val();
	
	if(chargesSlaveId == sponsorCatId){
		
		var payable=$("#payable").val();
		var slaveAmt=Number($("#tAmtSlave"+billDetailId).val());
		
		var totalChk=$('.billSlaveChk'+sevId).length;
		var checkedChk=$('.billSlaveChk'+sevId+':checked').size();
	    
	    if(totalChk==checkedChk){
			
			$("#chkOpdBillReg"+sevId).prop("checked","true");
		}else{
			
			$("#chkOpdBillReg"+sevId).removeAttr("checked");
		}
				
	    if($('#chkOpdBill'+billDetailId).prop("checked") == true){

	    	payable=Number(payable)+Number(slaveAmt);
	    	
	    }else{
	    	    	
	    	if(payable>0 && payable>=Number(slaveAmt)){
	    		
	    		payable=Number(payable)-Number(slaveAmt);
	    		
	    	}else{
	    		
	    		alert("Payable is greater than service amount");
	    		$('#chkOpdBill'+billDetailId).prop("checked","true");
	    	}
	    }	 
	    
	    $("#payable").val(parseFloat(payable).toFixed(2));
	    $("#payNow").val(parseFloat(payable).toFixed(2));
	}	
}


/**
 * @author Bilal
 * @date 30-JUN-2017
 * @code show and hide sponsor tabe based on sponsor id**/
function showAndHideSponsor() {
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	if (sponsorId >= 1 && chargesSlaveId>0) {

		$('#sponsorHide').show();

	} else {

		$('#sponsorHide').hide();
		
	}
}

/*******************************************************************************
 * @author Sagar kadam
 * @date 14_July_2017
 * @Code for autosuggestion 
 ******************************************************************************/
function getAllPatientRecordsForPrevOPD(inputId,callfrom) {
	
	var deptId=1;
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
			autosuggestionTempForPrevOPD(r,inputId);
			//autoCompTablefoipdManualSummaryTempAuto(r,inputId);
		
	}
});}





/*******************************************************************************
 * @author Sagar Kadam
 * @date 27_June_2017
 * @Code template for opd Patient records.
 ************************************/
function opdPrevRecordsTemp(r){
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	
	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mobile No</div></th>"

			//+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>UHID</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Treatment</div></th>"
			 
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
var index = 1;	
 
htm =htm+ "<tbody>"	;
for ( var i = 0; i < r.lstRegviewDto.length;i++) {
	
	var patId= patPrefix + patMiddle + r.lstRegviewDto[i].ptId + patSufix;
	var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString(); 		
		htm= htm
		+ "<tr id='div123"+ r.lstRegviewDto[i].ptId+"'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.lstRegviewDto[i].patientName+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>"+ r.lstRegviewDto[i].mobile+"</td>"

		//+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ patId +"</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.lstRegviewDto[i].centerPatientId +"</td>"

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
$("#containerprevOpd").html(htm);
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
			/*url  : "ehat/billNoble/closetreatmentdetails",
			data : {
	   "patientId" : patientId*/
			url  : "ehat/billNoble/getPrevPatdetails",
			data : {
	   "patientId" : patientId,
	   "deptId" : 1,
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
	 var htm=" class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
	 + "<td style='height: 21.5px;' class='col-md-2 center' class=''>treatment Id</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>Admission  No</td>"
	 + "<td style='height: 21.5px;' class='col-md-5 ' class=''>Date</td>"
	 + "<td style='height: 21.5px;' class='col-md-2 ' class=''>BIll No</td>"
	 + "<i class='fa fa-eye View'></i></button></td>> </tr>";
	 
	 for ( var j = 0; j < r1.listTreatment.length;j++) {
			var datetime= new Date(r1.listTreatment[j].createdDateTime).toLocaleDateString('en-GB');

		 htm=htm+ "<tr id='div123"+ r1.listTreatment[j].patientId+"' class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.listTreatment[j].patientId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>"+ r1.listTreatment[j].opdipdno+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-5 ' class=''>"+ datetime+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>"+ r1.listTreatment[j].treatmentId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-1 '>";
		 htm=htm+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='sendingToPreviousBill("+ r1.listTreatment[j].treatmentId+")'>";
		 htm=htm+ "<i class='fa fa-eye View'></i></button></td>";
		 htm=htm	+ "<input type='hidden' value='"+ r1.listTreatment[j].patientId+"' id='rowCount' /></tr>";
		 
		
		 $("#patPreOPDBill123" + r1.listTreatment[j].patientId).html(htm);
		 $("#td123" + r1.listTreatment[j].patientId).show();
		 $("#xyz" + r1.listTreatment[j].patientId).html(htm);
		}
	
	 
 }


/************
* @author	: Sagar Kadam
* @date		:29-June-2017
* @codeFor	: Autosuggestion Template for patient Treatment   
 ************/
function autosuggestionTempForPrevOPD(response, id) {
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
			
			//getPreviousTreatmentPatient(id,'search');
			getAllPatientRecordsForPrevOPD(id,'search');
			 
			//$("#mrnNo").val(101);
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listRegTreBillDto.length);
			var result;
			if (!data || data.listRegTreBillDto.length === 0 || !data.listRegTreBillDto
					|| data.listRegTreBillDto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'fName' : 'Record',
					'ptId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.listRegTreBillDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}



/*-------------------------------------For Previous Bill----------------------------------------*/


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 4_July_2017
 * @Code Getting Previous Bill Data By Service
 ******************************************************************************/
function getPatientPreviousBillAmount(r,callFrom) {
	//alert("Hii");
	var tFlag = "CT";
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform" : r
		},
		url : "ehat/billNoble/fetchPatientPreviousBillAmount",*/
		data : {
			"tFlag" : tFlag,
			"treatmentId" : r
		},
		url : "ehat/opdbill/fetchPatientBillAmount",
		success : function(r) {
			
			resetAllOpdPackage();
			setBillDetailsTempForPreviousBill(r,callFrom);	
			$("#saveBill").prop("disabled", true);
			$("#perticular").prop("disabled", true);
			$("#servId").prop("disabled", true);
			$("#specialityId").prop("disabled", true);
			//$("#doctorName").prop("disabled", true);
			$('#doctorName').select2("enable", false) 
			$("#rate").prop("disabled", true);
			$("#qty").prop("disabled", true);
			$("#amount").prop("disabled", true);
			$("#concession").prop("disabled", true);
			$("#pay").prop("disabled", true);
			$("#coPay").prop("disabled", true);
			$("#concessionOnPerc").prop("disabled", true);
			$("#emrChrFlag").prop("disabled", true);
			
			
			$("#perManualPackage").prop("disabled", true);
			$("#servIdPackage").prop("disabled", true);
			$("#doctorNamePackage").prop("disabled", true); //hide for meesha hospital
			$("#ratePackage").prop("disabled", true);
			$("#qtyPackage").prop("disabled", true);
			$("#addServicePackage").prop("disabled", true); //hide for meesha hospital
			
		}
	});
}

function setBillDetailsTempForPreviousBill(r,callFrom){
	
	var setBill="";
	var totAmt=0;
	
	var totqyt=1;
	var treatmentId=$('#treatmentId').text();
	var pharmaId=$("#pharmacyInvoice").val();
	for ( var i = 0; i < r.listBillNobleDto.length; i++) {
		
		if(r.listBillNobleDto[i].serviceId==1){
			
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+ r.listBillNobleDto[i].serviceId+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
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
            +'<button class="btn btn-xs btn-success" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'general\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			
			+	'</tr>';
			
			
			totAmt=totAmt+r.listBillNobleDto[i].amount;
			
			
		}/*else if(r.listBillNobleDto[i].serviceId==2){
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+ r.listBillNobleDto[i].serviceId+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+i+'" onclick="getSubServiceDetailsForPreviousBill123('+treatmentId+','+ r.listBillNobleDto[i].serviceId +')">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillNobleDto[i].serviceName +'</div>'			
			+ 	'<div class="col-md-1">'
			+ 	'<i class="fa fa-chevron-down" id="list'+i+'"></i>'
			+	'</div>'
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'
			+	'<div id="collapseOne'+i+'" class="panel-collapse collapse">'
			+	'<div class="panel-body">'
			+	'<table class="table table-hover">'
			+	'<thead>'
			+	'<tr>'
			+	'<th class="only-checkbox">#</th>'
			+	'<th>Doctor Name</th>'
			+	'<th>'
			+	'<div class="text-center">Amount</div>'
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
			+	'<th style="display:none;">'
			+	'<div class="text-center">Disc</div>'
			+	'</th>'
			
			+	'<th style="display:none;">'
			+	'<div class="text-center">Disc Per%</div>'
			+	'</th>';
			}
			setBill=setBill	
			+	'<th>'
			+	'<div class="text-right">Co-Pay</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'
			+	'<th class="only-checkbox">Edit</th>'
			+	'<th class="only-checkbox">Cancel</th>'
			+	'<th class="only-checkbox">ChB</th>'
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceData">'
		
			//dynamic inner Temp Added
			
			+	'</tbody>'
			+	'</table>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			+	'<td><div class="text-center">' + r.listBillNobleDto[i].serviceCount +'</div></td>'
			+ 	'<td>'
			+	'<div id="tamt'+(r.listBillNobleDto[i].serviceId)+'" class="text-right">' + (r.listBillNobleDto[i].amount).toFixed(2) +'</div></td>'
			
			+	'<td  class="text-center"><a style="cursor:pointer;"> '
            +'<button class="btn btn-xs btn-success editUserAccess" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'general\',\'Yes\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			
			+	'</tr>';
			
			totqyt=totqyt+ r.listBillNobleDto[i].serviceCount;
			totAmt=totAmt+r.listBillNobleDto[i].amount;
		}*/else if(r.listBillNobleDto[i].serviceId == pharmaId){}
		else{
			
			
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'// added by vinod
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+(r.listBillNobleDto[i].serviceId)+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'// added by vinod
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo'+i+'" onclick="getSubServiceDetails1ForPreviousBill('+i+','+treatmentId+','+ r.listBillNobleDto[i].serviceId +')">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillNobleDto[i].serviceName +'</div>'			
			+ 	'<div class="col-md-1">'
			+ 	'<i class="fa fa-chevron-down" id="list'+i+'"></i>'
			+	'</div>'
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'
			+	'<div id="collapseTwo'+i+'" class="panel-collapse collapse">'
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
			+	'</th>'
			
			
			+	'<th>'
			+	'<div class="text-center">Amount</div>'
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
				
				+	'<th style="display:none;">'
				+	'<div class="text-center">Disc</div>'
				+	'</th>'
				
				+	'<th style="display:none;">'
				+	'<div class="text-center">Disc Per%</div>'
				+	'</th>';
			}
			setBill=setBill	
			/*+	'<th>'
			+	'<div class="text-center">Pay</div>'
			+	'</th>'*/
			

			+	'<th>'
			+	'<div class="text-center">Co-Pay</div>'
			+	'</th>'
			
			
			+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'
			+	'<th class="only-checkbox">Edit</th>'
			+	'<th class="only-checkbox">Cancel</th>';
			
			if(r.listBillNobleDto[i].isCombination=='Y')
			{
			setBill=setBill	+ '<th class="only-checkbox">Pkg</th>';
			}
			setBill=setBill	
			+	'<th class="only-checkbox">ChB</th>'
			
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceData'+i+'">'
				/*'<tr>'
			+	'<td class="only-checkbox">'
			+	'<input type="checkbox">'
			+	'</td>'
			+	'<td>Cash</td>'
			+	'<td>'
			+	'<div class="text-center"></div>'
			+	'</td>'
			+	'<td>'
			+	'<div class="text-right">25-05-2017</div>'
			+	'</td>'
			+	'</tr>'
			+	'<tr>'
			+	'<td class="only-checkbox">'
			+	'<input type="checkbox">'
			+	'</td>'
			+	'<td>Cash</td>'
			+	'<td>'
			+	'<div class="text-center">999.00</div>'
			+	'</td>'
			+	'<td>'
			+	'<div class="text-right">25-05-2017</div>'
			+	'</td>'
			+	'</tr>'*/
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
			
			+	'<td  class="text-center"><a style="cursor:pointer;"> '
            +'<button class="btn btn-xs btn-success" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'general\',\'Yes\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			
			+	'</tr>';// added by vinod	
			
			totqyt=totqyt+ r.listBillNobleDto[i].serviceCount;
			totAmt=totAmt+r.listBillNobleDto[i].amount;
		}
	}
	
	//alert(totqyt);
	//alert(totAmt);
	//alert(callFrom);
	if(callFrom == "cghs"){
		//alert("in chgs");
		$("#billDetails").html("");
		$("#sponsor").html("");
		
		$("#totalQtty").text(totqyt);
		$("#totalAmmt").text((totAmt).toFixed(2));
		
		$("#cghsBill").html(setBill);
		
		$("#cghsBill").html(setBill);
	}else if(callFrom == "sponsor"){
		
		resetAll("sponsor");
		//getPatientBillAmountForSponsor(treatmentId);
		/*$("#cghs").html("");
		//alert("in chgs");
		$("#totalQtty").text(totqyt);
		$("#totalAmmt").text(totAmt);
		
		$("#sponsor").html(setBill);*/
	}
	else{
		$("#cghsBill").html("");
		$("#sponsor").html("");
		//alert("in general");
		$("#totalQty").text(totqyt);
		$("#totalAmt").text((totAmt).toFixed(2));
		$("#totAmt").text((totAmt).toFixed(2));
		
		$("#billDetails").html(setBill);
	}
}
function getSubServiceDetailsForPreviousBill123(t,s){
	//alert("getSubServiceDetailsForPreviousBill()");
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		url : "ehat/billNoble/getPatientServiceBill",
		success : function(r) {
			
			getSubServiceDetailsTempForPreviousBill123(r,s);			
		}
	});
}

function getSubServiceDetailsTempForPreviousBill123(t,s)
{
	var setService="";
	//var treatmentId=$('#treatmentId').text();
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		var a=1+i;
		var datetime= new Date(t.listBillNobleServiceDto[i].createdDate).toLocaleDateString('en-GB');
		setService=setService
		+	'<tr>'
		
		+	'<td style="display:none;" id="bdId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>'

		+ '<td style="display:none;" id="doc'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'

		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
		+	'<td style="display:none;" id="docId'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+ t.listBillNobleServiceDto[i].docId +'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'

		
		+	'<td style="display:none;"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>'
		
		+	'<td> '+ a +' </td>'
		
		+	'<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docName +' </td>';
		
		// added by vinod
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
			+	'</td>';
			
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
				/*+   '<input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+Number(t.listBillNobleServiceDto[i].charges)+'">'*/
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+(t.listBillNobleServiceDto[i].charges)+'"></td>';
				
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
				/*+   '<input type="hidden" class="notInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+Number(t.listBillNobleServiceDto[i].charges)+'">'*/
				+	'</td>';
				/*+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+(t.listBillNobleServiceDto[i].charges)+'"></td>';*/
				
			}		
		}
		// added by vinod
		
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
		
		+	'<td id="coPay'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td>'
		+	'<div class="text-right">'+ datetime +'</div>'
		+	'</td>';
		setService = setService +	'</td>';
		
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			/* change for meesha hospital*/					
				/*setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';*/

				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"></a></td>';
			
					
			}else{
			
			if (t.listBillNobleServiceDto[i].cancle =="Y") {
				/*setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'"  disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			*/
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"></a></td>';
				
					
			}else{
				/*setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'"  disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			*/
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"></a></td>';
					
			}			
		}		
		
		
		
		
	/*	if (t.listBillNobleServiceDto[i].cancle =="Y" || (t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
		} else {
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
		}*/
			
		setService = setService +	'<td class="only-checkbox" >';
		var abc=0;
		if(t.listBillNobleServiceDto[i].paidFlag=="N"){
			
			setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+abc+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" checked="checked" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
			
		}else{
			
			setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
			
		}
		
		
		setService = setService +	'</td>';
				
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';		
		
}
	
	$("#serviceData").html(setService);
}

function getSubServiceDetails1ForPreviousBill(i,tId,s)
{
	//alert(tId);
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform" : tId,
			"call" : s
		},
		url : "ehat/billNoble/getPatientServiceBill",*/
		data : {
			"treatmentId" : tId,
			"serviceId" : s
		},
		url : "ehat/opdbill/getPatientServiceBill",
		success : function(r) {
			
			getSubServiceDetailsTemp1ForPrevousBill(i,r,s,tId);	
			userAccess();
		}
	});
}

function getSubServiceDetailsTemp1ForPrevousBill(j,t,s,tId)
{
	var setService="";
	
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		var a=1+i;
		var datetime12= new Date(t.listBillNobleServiceDto[i].createdDate).toLocaleDateString('en-GB');
		var posid = t.listBillNobleServiceDto[i].serviceId;
		var dname= t.listBillNobleServiceDto[i].docName;
		
		var netAmt=Number(t.listBillNobleServiceDto[i].amount)-Number(t.listBillNobleServiceDto[i].concession);
		var cghsCode = "("+t.listBillNobleServiceDto[i].cghsCode+")";
		if(cghsCode == "" || cghsCode == "-" || cghsCode=="()" || cghsCode=="(-)" || cghsCode=="(null)"){
			cghsCode="";
		}
		if(dname==null){
			
			dname="-";
		}
		if(t.listBillNobleServiceDto[i].paidByCashFlag == "Y"){
			setService=setService
			+	'<tr bgcolor="lightblue" id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">';
		}else{
			setService=setService
			+	'<tr id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">';
		}
		setService=setService
		
		
		+ '<td style="display:none;" id="row'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'
			
		
		+	'<td> '+ a +' </td>'
		+	'<td style="display:none;" id="bdId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>';
		
		if(posid == 14){
			
			setService=setService +	'<td id="catName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].invName+cghsCode+' </td>';

		}else if (posid==11 || posid==13){//Added by laxman for sended lab test coloe change. 

			if((t.listBillNobleServiceDto[i].sndtolabflag)=="Y"){
				setService=setService +	'<td id="catName'+(t.listBillNobleServiceDto[i].billDetailsId)+'" style="color: green;"> '+ t.listBillNobleServiceDto[i].categoryName+cghsCode+' </td>';
			}else{
				setService=setService +	'<td id="catName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].categoryName+cghsCode+' </td>';
			}
			
		}//code By Sanjay on 26-03-2018 for changes the testname color when it sent to RIS
		else if (posid==12){

			if((t.listBillNobleServiceDto[i].sndtorisflag)=="Y"){
				setService=setService +	'<td id="catName'+(t.listBillNobleServiceDto[i].billDetailsId)+'" style="color: #00bfff;"> '+ t.listBillNobleServiceDto[i].categoryName+cghsCode+' </td>';
			}else{
				setService=setService +	'<td id="catName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].categoryName+cghsCode+' </td>';
			}
			
		}else{
			setService=setService +	'<td id="catName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].categoryName+cghsCode+' </td>';

		}

		setService=setService
		+	'<td style="display:none;" id="barCode'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].barCode+' </td>'
		+	'<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ dname+' </td>'
		
		+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].subServiceId+' </td>'
		
		+	'<td style="display:none;" id="isServModify'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isModify+' </td>'
		
		+	'<td style="display:none;" id="dId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'
		
		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
				
		+	'<td style="display:none;" id="amt'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].amount+' </td>'
		
		+	'<td style="display:none;" id="sndtolabflag'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtolabflag+' </td>'
		// added by vinod
		+	'<td style="display:none;" id="sendToRisId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtorisflag +' </td>'
		
		
		//added by Rohini 
		+	'<td style="display:none;" id="isTemplateWiseTest'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].templateWise +' </td>'
        +	'<td style="display:none;" id="collectionDate'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionDate+' </td>'		
		+	'<td style="display:none;" id="collectionTime'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionTime+' </td>'
		+	'<td style="display:none;" id="isCombination'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isCombination+' </td>'
		+	'<td style="display:none;" id="histopathLab'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].histopathLab+' </td>';

		
		//Code  by Sanjay
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService +'<td style="display:none;"> '
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].rate).toFixed(2) +'</div>'
			+	'</td>'
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].rate +'</div>'
			+	'</td>';
		
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].rate).toFixed(2) +'</div>'
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].rate).toFixed(2) +'</div>'
				+	'</td>';
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}			
			
		}// added by vinod
						
		setService = setService + '<td id="q'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].quantity +'</div>'
		+	'</td>'
		
		
		
		+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].amount).toFixed(2) +'</div>'
		+	'</td>';
		
var concessionFlow=$('#concessionFlow').val();			
		
		if(concessionFlow == "on"){
			setService = setService
			+	'<td id="conS'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concession).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td id="conPer'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
			+	'</td>';
		}else{
			setService = setService
			+	'<td style="display:none;" id="conS'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concession).toFixed(2) +'</div>'
			+	'</td>';
			
			+	'<td style="display:none;" id="conPer'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
			+	'</td>';
		}
		setService = setService
		/*+	'<td id="p'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].pay).toFixed(2) +'</div>'
		+	'</td>'*/
		
		+	'<td id="cP'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td id="dateSub'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-right" id="dateSubservice">'+ datetime12 +'</div>';
		setService = setService +	'</td>';
		
		if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			/*Change for meesha hospital*/
			/*setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';*/
		}else{
			
			if (t.listBillNobleServiceDto[i].cancle =="Y" || t.listBillNobleServiceDto[i].isModify=="N") {
/*				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
*/	
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
	
			}else{
/*				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';*/
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				/* Change for meesha hospital*/
				/*setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';*/
			}
		}	
				
		if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			
		}else{
			
			if (t.listBillNobleServiceDto[i].cancle =="Y") {
/*				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
*/	
				//setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger"  onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';

				} else {
/*				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
*/
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
	
				}
		}	
				
		if(t.listBillNobleServiceDto[i].isCombination=='Y')
		{
		setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#pack"  onclick="getPackagedataforOpd('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
		
       /*if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			
			setService = setService +'<td class="col-md-1 center" ><a style="cursor:pointer;"> '
		                            +'<button class="btn btn-xs btn-success editUserAccess"' 
		                            +' onclick="printopdpackage('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" '
		                            +'value="EDIT"><i class="fa fa-print"  id=btnpack'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
        }*/
		}
		
		setService = setService +	'<td class="only-checkbox" >';
		var abc=0;
		if(t.listBillNobleServiceDto[i].paidByCashFlag == "Y"){
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+abc+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
			}else{
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';			
			}
		}else{
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+abc+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" checked="checked" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
			}else{
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';			
			}
		}
		
		
				
		setService = setService +	'</td>';
		
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';			
	}
	
	$("#serviceData"+j).html(setService);
}



function sendingToPreviousBill(r){
	//alert("hi");
    var treatclose="treatclose";
    window.location = "ehat_billing.jsp?" + "treatmentId=" + r + "&treatclose="+ treatclose;
    
}

/**
 * @author Bilal
 * @date 27-JUN-2017
 * @code For autosuggetion from configuration 
 * **/
function setallchargesConfigOnBillingOPD2(inputID) {

	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	//var	listofunit=[];
	//var resultData = [];
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	//var unitlist=listofunit.slice(1); 
	var unitlist="";
	var depdocdeskid = $("#depdocdeskid").val();
	 
	var querytype="all";
    var serviceid=$('#servId').val();
   
    var hallId = 0;
	var hallSlaveId = 0;
	var treatId=$("#treatId").val();
	
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservicesConf",
	
		success : function(r) {

			autoCompDoctorDeskOnBilling2(r,inputID);
			
         
				
		}
	});
}


/**
 * @author  :Bilal
 * @date    :27-JUN-2017
 * @code    :For autosuggetion from configuration 
 * **/
function autoCompDoctorDeskOnBilling2(response,id) {
    
	
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
					name : 'CategoryName',
					width : '150px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '100px',
					valueField : 'serviceName'
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					
					
					
					
					   
					
						$('#perticular').val(ui.item.categoryName);
								
						var isModify=ui.item.isModify;
						if(isModify=="N"){
							$("#rate").prop("disabled", true);
							$("#rateOpdSponsor").prop("disabled", true);
						}else{
							$("#rate").prop("disabled", false);
							$("#rateOpdSponsor").prop("disabled", false);
						}
						
						$("#subserviceid").val(ui.item.categoryid);
						$("#servicename").val(ui.item.serviceName);
						$("#serviceid" ).val(ui.item.serviceid);
                       
						
						//Added By BILAL 
						var subservid=ui.item.categoryid;
						var yearwisecharges = getyearwisecharges(subservid);
						
						if (yearwisecharges > 0) {
							$("#rate" ).val(yearwisecharges);
							$("#rate2" ).val(yearwisecharges);  		//added by tarique aalam
						}else{
							$("#rate" ).val(ui.item.categorycharges);
							$("#rate2" ).val(ui.item.categorycharges);  //added by tarique aalam	
						} 
						
						
						$("#concession" ).val(ui.item.concession);
						$("#amount" ).val(ui.item.amount);
						$("#servId" ).select2('val',ui.item.serviceid);
						
						$("#iscombination").val(ui.item.iscombination);
						$("#categoryids").val(ui.item.categoryid);
						$("#toDateopd").val(ui.item.toDate);
						
						//@auhtor-tk @date - 05-feb-2018 @reason open doctor list after selecting service name
						$('#doctorName').select2('open');
						
						calculatePerticularTotal1();
						calculate123('general');  // added by tarique Aalam
					
						//Added by Kishor
						if(ui.item.serviceid == 11){						
							getPathologyPreDetails(ui.item.serviceid,ui.item.categoryid);
						}					
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
					$('#ui-id-1').css("z-index", "10000000000");
					
					
				}
			});
}


function clerpiPR(){
	
	$("#byId").val("");
	$("#sridnamepr").val("N");
	
}
function clerpnPR(){
	
	$("#byName").val("");
	$("#sridnamepr").val("Y");
	
}
//calling function for token number update only 
//@Author -Sagar
function callingSubServiceDetailsFunction(t){
	//alert("hiiii"+t);
	
	var s=2;
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		url : "ehat/billNoble/getPatientServiceBill",
		success : function(r) {
			
			//getSubServiceDetailsTemp(r,s);			
		}
	});
}

/***@author    :Bilal
 * @Date       :13-sep-2017
 * @code       : for getting charges of sponsor***/
function getcharges() {
	var val=0;
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var categoryid = $("#categoryids").val();
	var treatId=$("#treatId").val();
	var toDate =$("#toDate").val();
	//alert("toDateopd???"+toDate);
	
	if (toDate == "" || toDate == null || toDate == undefined
			) {
		toDate = "0";
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (categoryid == "" || categoryid == null || categoryid == undefined
			|| isNaN(categoryid)) {
		categoryid = 0;
	}

	var hallId = 0;
	var hallSlaveId = 0;

	var inputs = [];

	inputs.push('serviceid=' + categoryid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	inputs.push('toDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getchargessponsor",

		success : function(r) {
			val = r;
			$("#rategeneralopd").val(r);
			$("#chargesfromConf").val(r);
			

		}
	});
	return val;
}


/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Disable paid services
 ************/
function disablePaidSevices(res){
		
	//alert("hi");
	
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
			 
		var serId=res.listBillNobleServiceDto[i].serviceId;
		var paidFlag=res.listBillNobleServiceDto[i].paidFlag;
		
		if(paidFlag=="Y"){
		
			$("#chkOpdBillReg"+serId).attr("disabled", true);
			$("#chkOpdBillReg"+serId).attr("checked", false);
		}	
	}	
}

function calPerForCon(){
	
	var amount = $("#amount").val();
	var concession = $("#concession").val();
	
	var consAmt=((concession * 100 ) / amount);//.toFixed(2);
	$("#concessionOnPerc").val(consAmt);
}

function calPerForConIpd(){
	
	var amountOpdSponsor = $("#amountOpdSponsor").val();
	var concessionOpdSponsor = $("#concessionOpdSponsor").val();
	
	var consAmt=((concessionOpdSponsor * 100 ) / amountOpdSponsor).toFixed(2);
	$("#concessionOpdSponsorOnPerc").val(consAmt);
}

/************
* @author	: Laxman Nikam
* @date		: 08-March-2018
* @codeFor	: Disable/Enable lab delete flag.
 ************/
function cancelLabTest(billDetailsId,callFrom){
	//GET selected value
	var deptId=$('#deptId').val();
	var a=$('#btnCancle'+billDetailsId).val();
	var cancleType ="N";
	var billDetId=$('#bdId'+billDetailsId).text();
	var treatmentId=$('#treatmentId').text();
	if(a=="N"){
		cancleType="Y";
		$('#tr'+billDetailsId).attr("disabled", true);
	}
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/cancelLabTest",
		data	: {
			
		  "billDetId" : billDetId,
		  "cancleType" : cancleType,
		  "deptId" : deptId,
			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			if(r=="0")
			{
				cancelTestSmplColFlag="Y";
				return false;
			}
			else if(r=="-1")
			{
				alert("Network error...!");
				return false;
			}else if(r=="1")
			{
				cancelTestSmplColFlag="N";
				//call for cancel service.
				//cancleServices(billDetailsId,cancleType,callFrom);
			}
		}
		
	});
	
}


/************
* @author	: Laxman Nikam
* @date		: 08-March-2018
* @codeFor	: if delete from bill,Disable lab delete flag.
 ************/
function deleteLabTest(billDetId,treatmentId,deleteType){
	var deptId=$('#deptId').val();
	var billDId = billDetId.join(',');
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/cancelLabTest",
		data	: {
			
		  "billDetId" : billDId,
		  "cancleType" : deleteType,
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
				//call for cancel service.
				//deleteservdetails();
			}
		}
		
	});
}

/************
* @author	: Vinod Udawant
* @codeFor	: Get all amount details
 ************/
function getBillAmountDetails(callFrom) {
	
	var unitId = $("#unitId").val();
	var depId = $("#depdocdeskid").val();
	var userId = $("#userId").val();
	var treatmentId = $("#treatId").val();
	var serviceId = -1;
	var chargesSlaveId = $("#chargesSlaveId").val();
	var sponsorCatId = 0;
	var pharmacyInvoice = $("#pharmacyInvoice").val();
	var pharmacyServId = $("#pharmacyServId").val();
	var callformComAdv = "opdBill";
	var callformRcptTot = "opd";
	var callformPrevPending = "onload";
	
	if(chargesSlaveId > 0){
		sponsorCatId = 1;
	}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"unitId" : unitId,
			"depId" : depId,
			"userId" : userId,
			"treatmentId" : treatmentId,
			"serviceId" : serviceId,
			"chargesSlaveId" : chargesSlaveId,
			"sponsorCatId" : sponsorCatId,
			"pharmacyInvoice" : pharmacyInvoice,
			"pharmacyServId" : pharmacyServId,
			"callformComAdv" : callformComAdv,
			"callformRcptTot" : callformRcptTot,
			"callformPrevPending" : callformPrevPending
		},
		url : "ehat/opdbill/getAllAmountDetails",
		success : function(r) {
			
			r = r.lstAmountDetails[0];
			
			setPrevioudPendingAmt(r);
			setPayableAmt(r,callFrom);
			setCommonAdvanceAmt(r);
			setAllReceiptTotals(r);
		}
	});
}

function setPrevioudPendingAmt(r){
	
	var totRemain=r.total_remain;
	if(totRemain <= 0 || isNaN(totRemain)){
		
		totRemain=0.00;					
	}
	$("#previousRemainingValue").html(parseFloat(totRemain).toFixed(2));
}

function setPayableAmt(r,callFrom){
	
	var totAmt=0,totCons=0,totPayable=0;
	
	if(callFrom=="sponsor"){
		
		totAmt = totAmt + r.other_amount;
		totCons = totCons + r.other_concession;
	}else{
		
		totAmt = totAmt + r.amount;
		totCons = totCons + r.concession;	
	}

	/*for(var inx=0;inx<r.listBillDetails.length;inx++){
		
		var servId=r.listBillDetails[inx].serviceId;
		
		if(sId==-1){
			
			$("#chkOpdBillReg"+servId).removeAttr("disabled");
			$("#chkOpdBillReg"+servId).prop("checked","checked");
		}
	
	}*/		
	totPayable=totAmt-totCons;
	$("#payable").val(parseFloat(totPayable).toFixed(2));	
	$("#payNow").val(parseFloat(totPayable).toFixed(2));	
}

function setCommonAdvanceAmt(r){
	
	var totalAdvc = 0;
	
	totalAdvc = Number(r.remaining_common_amnt);
	
	var otherwise=parseFloat(0.00).toFixed(2);
	if(totalAdvc <= 0){
		
		$("#finalAdvance").html(otherwise); 
	}else{
		
		$("#finalAdvance").html(parseFloat(totalAdvc).toFixed(2)); 			
	}	
}

function setAllReceiptTotals(r){
	
	var otherwise=parseFloat(0.00).toFixed(2);
	var finalBillTotal=parseFloat(r.totAmt).toFixed(2);			
	var grandTotal=parseFloat(r.totAmt).toFixed(2);		
	var conTotal=parseFloat(r.totConcn).toFixed(2);		
	var finalDiscount=parseFloat(r.totDisc).toFixed(2);		
	var finalPaid=parseFloat(r.totPaid).toFixed(2);		
	var finalRefund=parseFloat(r.totRefund).toFixed(2);		
	var paidBySponsor=parseFloat(r.totalSpnsrpaid).toFixed(2);		
	
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

/************
* @author	: Vinod Udawant
* @codeFor	: To get charges configured for sponsor
 ************/
function getSponsorTestCharges(isComServlastId,serviceid) {
	
	var chargesSlaveId = $("#chargesSlaveId").val();
	var isComServId = $("#packageID").val();
	var unitId = $("#unitId").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesSlaveId" : chargesSlaveId,
			"isComServId" : isComServId,
			"isComServlastId" : isComServlastId,
			"serviceid" : serviceid,
			"unitId" : unitId,
		},
		url : "ehat/testautosuggest/getSponsorTestCharges",
		success : function(r) {
			
			if(r.lstSponsorTestChargesDto.length > 0){
			
				r = r.lstSponsorTestChargesDto[0];
				
				$("#sponsorTestCharges").val(parseFloat(r.charges).toFixed(2));
				$("#yearWiseSponsorTestCharges").val(parseFloat(r.yearWiseCharges).toFixed(2));
			}
		}
	});
}

function getDoctorConsultationCharges(){
	
	var subserviceid = $("#subserviceid").val();
	var serviceId = $("#serviceid").val();
	if(serviceId == 2 && subserviceid!=310){  //rahul
		
		var deptId = 1;//$('#deptId').val();
		var patientId = $('#pId').val();
		var treatmentId = $('#tId').val();
		var billId = $('#billNo').text();
		var unitId = $('#unitId').val();
		var userId = $('#userId').val();
		var chargesSlaveId = $('#chargesSlaveId').val();
		var doctorId = 0;
		if(chargesSlaveId > 0){
			doctorId = $('#doctorNameOpdSponsor').val();
		}else{
			doctorId = $('#doctorName').val();
		}
		
		jQuery.ajax({
			async : false,
			type 	: "POST",
			url 	: "ehat/opdbill/getDoctorConsultationCharges",
			data	: {
				
				"patientId" : patientId,
				"treatmentId" : treatmentId,
				"billId" : billId,
				"unitId" : unitId,
				"depId" : deptId,
				"userId" : userId,
				"serviceId" : 2,
				"chargesSlaveId" : chargesSlaveId,
				"doctorId" : doctorId
			},
			timeout : 1000 * 60 * 5,
			cache 	: false,
			success : function(r) {
				
				if(r.lstConstCharges.length > 0){
					
					var charges = 0;
					
					if(chargesSlaveId == 0){
						
						charges = r.lstConstCharges[0].n_amount;
						$("#rate").val(charges);
						$("#amount").val(charges);
					}else{
						
						charges = r.lstConstCharges[0].n_other_amount;
						$("#rateOpdSponsor").val(charges);
						$("#amountOpdSponsor").val(charges);
					}
				}
			}
		});
	}
}


function deleteservdetailsPreviousOPD(labservicelist){
	var treatId=$('#treatId').val();
	  var callFrom  =$("#preId").val();
	if(callFrom == "treatclose"){
		
	
	var inputs = [];	
	inputs.push("labservicelist="+ encodeURIComponent(labservicelist));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/deleteservdetailsPreviousOPD",
		data	: str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('Network Issue!!!');
  		},
		success : function(r) {
			
			//alert(r);
			if(r == ""){
				alert("Service Deleted successfuly");
				getPatientBillAmount(treatId);
			}else {
				alert("You  cannot be deleted id  "+r);
				getPatientBillAmount(treatId);
			}
		
			
			stActiveTab();
			
		}
		
	});
	
	}
	
}

function cancelServicesForPreviousOPD(billDetailsId,callFrom){

	var opType=$('#btnCancle'+billDetailsId).val();
	var msg="";
	
	if(opType=="N"){
		
		msg = "Are you sure ! You Want To Cancel Service";
	}else{
		
		msg = "Are you sure ! You Want To Revert Service";
	}
	var r = confirm(msg);
	if (r == true) {
		
		var cancleType ="N";

		//Added by Laxman.whene cancel test from bill,the also cancel from labtestresult.
		//cancelLabTest(billDetailsId,callFrom);
		//GET selected value
		
		if(cancelTestSmplColFlag=="Y"){
			alert("Test Sample are collected.You can't cancel or delete this Test.");
			return false;
		}
		
		//Added by Vikas Godse
		cancelRisTest(billDetailsId,callFrom);
		
		if(risReportFlag=="Y"){
			alert("Test Report are created,You can't cancel or delete this Test.");
			return false;
		}
		
		var a=$('#btnCancle'+billDetailsId).val();
		
		if(a=="N"){
			cancleType="Y";
			$('#tr'+billDetailsId).attr("disabled", true);
		}
		
		if(callFrom!="uncheck"){
			
			if(a=="N")
			{
			//alert("Service Successfully cancel");
			}
			else{
				alert("Service Successfully Revert");
			}
		
		}

		

		var servId=$('#bdId'+billDetailsId).text();
		var treatmentId=$('#treatmentId').text();

		
		
		jQuery.ajax({
			async : false,
			type 	: "POST",
			url 	: "ehat/doctordesk/canclePreviousServices",
			data	: {
				
			  "servId" : servId,
			  "tretId" : treatmentId,
			  cancleType : cancleType,
				
			},
			timeout : 1000 * 60 * 5,
			cache 	: false,
		
			success : function(r) {
				
				//fetchbilldetails();
				alert(r);
				getPatientBillAmount(treatmentId,servId);
				getPatientBillAmountForSponsor(treatmentId,servId);
				
				window.location.reload(true);
				
			}
			
		});
		//$('#cancleType').val("N");
	}	

}

function getPatientCommanAdvance(){
	var patient_ID = $('#pId').val();

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

// added by dayanand for update the bill master details such as total paid,total remain etc.
function updateBillMasterTotalForOPD(){

	var treatId=$('#treatId').val();
	
	var inputs = [];	
	inputs.push("treatId="+treatId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/bill/updateBillMasterTotalForOPD",
		data	: str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('Network Issue!!!');
  		},
		success : function(r) {
			
		}		
	});	
}

//Added by Rohini for remark to cancel test.

function setRemarkpopupCancelTest(){
	
	$('#idremarkcanceltest').val('1');
	$("#modal-19").addClass("md-show");
}

function submitRemarkCancelTest(){
	//$("#modal-19").removeClass("md-show");
   var billDetailsId =	$('#billDetailsId').val();
   
   var billDetId= billDetailsId.replaceAll("[^a-zA-Z0-9,.]","");
   var callFrom =	$('#callFrom').val();	
	cancleOnClick(billDetId,callFrom);	
}

function closeRemarkpopupCancelTest(){

	$("#modal-19").removeClass("md-show");	
	$('#remarkcanceltest').val('');
	$('#idremarkcanceltest').val('0');
}

function cancelRemarkpopupCancelTest(){
	$("#modal-19").removeClass("md-show");
	$('#remarkcanceltest').val('');
	$('#idremarkcanceltest').val('0');
	return false;
}


function cancelLabTestCheckService(treatmentId,billDetailsId)
{
		      //  var callFromP  =$("#preId").val();		//	if(cancelTestSmplColFlag=="Y"){
					
					var servId=$('#bdId'+billDetailsId).text();					
					var serViceId= servId.replaceAll("[^a-zA-Z0-9,.]","");
					var treatmentId= treatmentId; //$('#treatmentId').val();
					var cancleType="";
					
					jQuery.ajax({
						async : false,
						type 	: "POST",
						url 	: "ehat/doctordesk/cancelLabTestCheckService",
						data	: {
						  "servId" : encodeURIComponent(serViceId.trim()),
						  "tretId" : treatmentId,
						  cancleType : cancleType
						},
						timeout : 1000 * 60 * 5,
						cache 	: false,
					
						success : function(r) {
							//alert(r);	
							 if(r=="-1")
							{
								alert("Network error...!");
								return false;
							}else if(r < "3")
							{
								cancelTestSmplColFlag="N"; //call for cancel service.							
							}else if(r>="3")
							{
								cancelTestSmplColFlag="Y";
								return false;
							}
						}					
					});				
}

function cancelRisTestforEditCheck(billDetailsId,callform){
	
	var callform;
	if(callform == 'edit'){
		 callform = callform;
	}else{
	 callform="OPDDignoBill";
	}
	var a=$('#btnCancle'+billDetailsId).val();
	var cancleType ="Y";
	var billDetId=$('#bdId'+billDetailsId).text();
	
	if(a=="N"){
		cancleType="N";
		$('#tr'+billDetailsId).attr("disabled", true);
	}
	
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/cancelInvestigationTest",
		data	: {
			
		  "billDetId" : billDetId,
		  "cancleType" : cancleType,
		  "callform" : callform,
			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			if(r=="0")
			{ 
				risReportFlag="Y";
				return false;
			}
			else if(r=="-1")
			{
				alert("Network error...!");
				return false;
			}else if(r=="1")
			{
				risReportFlag="N";
			}else if(callform == "edit" && r == "9")
			{ 
				//risReportFlag="Y";
				risReportFlag="N";
				return false;
			}
		}
		
	});
}

//added by vishant
function fetchPackageCharges(packageId){
	
	
	var inputs = [];	
	inputs.push("packageId="+packageId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type 	: "GET",
		url 	: "ehat/autoallservicestest/fetchPackageCharges",
		data	: str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('Network Issue!!!');
  		},
		success : function(r) {
			
			if(r!=""){
				
				$("#rate" ).val(r);
				$("#rate2" ).val(r);
				$("#coPay").val(r);
				$("#amount").val(r);
			}
		}		
	});	
}

function getB2BChargesForOpd(isComServlastId,serviceid){
	
	var b2bCharges = 0;
	var customerId = $("#customerId").val();
	
	if(customerId > 1){
		
		//var chargesSlaveId = $("#chargesSlaveId").val();
		var isComServId    = $("#packageID").val();
		var unitId         = $("#unitId").val();
		jQuery.ajax({
			async : false,
			type  : "POST",
			data  : {
				"chargesSlaveId"  : customerId,
				"isComServId"     : isComServId,
				"isComServlastId" : isComServlastId,
				"serviceid"       : serviceid,
				"unitId"          : unitId,
			},
			url  : "ehat/testautosuggest/getB2BTestCharges",
			success : function(r) {
				
				b2bCharges = r.b2bCharges;
			}
		});
	}	
	
	return b2bCharges;
}

function getFollowUpCount(){

	$("#followUpCount").text(0);
	var patientId = $('#pId').val(); 
   var sponsorId = $("#chargesSlaveId").val();
   //var sponsorId = $("#sponsor_select").val();

  if(sponsorId == 0){
	  return false;
  }
	
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('sponsorId=' + sponsorId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/register/getfollowUpCount",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#followUpCount").text(r);
		}
	});


}