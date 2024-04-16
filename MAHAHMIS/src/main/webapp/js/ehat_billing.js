/************
* @author	: Vinod Udawant
* @date		: 16-June-2017
* @codeFor	: Save ehat bill details
 ************/
function saveBillDetails(callFrom) {

	var payNowConf = parseFloat($("#payNow").val());
	
	var r = confirm("Are You Sure You Want To Pay Amount :"+payNowConf);
	if (r == true) {
	var unitId		= parseInt($("#unitId").val());
	var userId		= parseInt($("#userId").val());	
	var refDocId	= 0;	
	var treatmentId	= 0;
	var subservIdsChecked=""; 
	$('input[name=opdBillCheckbox]:checked').each(function(){
				
		//servIdsChecked.push($(this).val());
		var bilDetId	=  parseInt($(this).val());
		
		//getting service id
		var serviceId 		= parseInt($("#sId"+bilDetId).text());
		if(serviceId == 12){//Checking whether test is of Investigation type or not 
			
		//getting sub service id
		// subSrvid	= parseInt($("#subserviceid"+bilDetId).text());
		 subservIdsChecked=subservIdsChecked+","+$(this).val();
		// subservIdsChecked.push(object);
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
	
	if(payMode == 0){
		
		alert("Please select payment mode");
		return false;
	}
	
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
	
	/*if(payable<0){
		
		alert("Payable should be greater than or equal to zero");
		return false;
	}else{
		
		//payNow = Number(payNow) + Number(discountAmt);
		if(payNow>payable){
			
			alert("Amount should be less than payable");
			$("#payNow").val(0);			
			$("#discount").val(0);
			$("#discountAmt").val(0);		
			$("#payNow").focus();
			return false;
		}else if(payNow<0){
			
			alert("Amount should be greater than 0");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		}
	}*/
	
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
	
	/*if(payMode == 5){
			
		payNow=0;			
	}*/	
	var discountFrom="-";
	var discountStatus="N";
	if(discountAmt>0){	
		discountFrom = $("#discountFrom").val();
		discountStatus="Y";
		if(discountFrom==null||discountFrom==undefined){
			discountFrom="-";
		}
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
	inputs.push("discountFrom=" + discountFrom);
	inputs.push("discountStatus=" + discountStatus);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",		
		url 	: "ehat/bill/saveBillDetails",
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
				updateBillMasterTotalForOPD();
				receiptBillPrint("receipt",r,"");
				
				//Added by Laxman on 07-March-2018 for after paid Test Send to Lab.
				//paidTestSendToLab(treatmentId);
				//Added by sanjay on pay bill send to ris.
				//paidTestSendToRis(subservIdsChecked,treatmentId);
				//Added by Sufi on pay bill send to Radiation.
				//paidTestSenToRadiation(subservIdsChecked,treatmentId);
				
				//Added by Laxman on 07-March-2018 for after paid Test Send to Lab.
				//paidTestSendToLab(treatmentId);
				//Added by sanjay on pay bill send to ris.
				paidTestSendToRis(subservIdsChecked,treatmentId);
				//Added by Sufi on pay bill send to Radiation.
				paidTestSenToRadiation(subservIdsChecked,treatmentId);
				
			}else if(r==-2){
				
				alert("Common advance not enough to pay bill...");
			}else{
				
				alertify.error("Network issue");
			}			
			resetAll(receiptOf);
			var c=$("#preId").val(); 
			/*if(c!="treatclose"){ 
				
				closePatientTreatment(treatmentId);
			}*/		
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

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
function getBillReceiptDetails(callFrom) {

	var treatmentId	= $("#treatmentId").text();  
	var billId		= $("#billNo").text(); ;
	var receiptOf= $("#receiptOf").val();	
	var userId = parseInt($("#userId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());	
	
	jQuery.ajax({
		async	: false,
		type	: "POST",		
		data 	: { "treatmentId" : parseInt(treatmentId),"billId" : parseInt(billId), "callFrom" : callFrom, "receiptOf" : receiptOf, "userId" : userId, "chargesSlaveId" : chargesSlaveId  },
		url 	: "ehat/bill/getBillReceiptDetails",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			if(callFrom=="allForChk"){
				
				disableSevices(r);				
			}else{
				
				if(callFrom=="deleted"){
					setDeletedReceiptTemplate(r,callFrom);
				}else{
					
					setReceiptTemplate(r,callFrom);				
					disableSevices(r);
				}	
			}	
			
			$("#trRefPer").hide();
			userAccess();
		}
	});
};

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Set receipt master template
 ************/
function setReceiptTemplate(res,callFrom){
	
	var prevPaid=0;
	$("#btnRefund").prop('disabled','true');
	/*$("#trDisc").show();	
	$("#discAuth").show();	
	$("#discNarrtn").show();*/
		
	/*var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	var patIdPrefix=patPrefix+patMiddle+r.listRegTreBillDto[0].patientId+patSufix;	
	 
	var billPrefix=$("#billPrefix").val();
	var billMiddle=$("#billMiddle").val();
	var billSufix=$("#billSufix").val();
	var billIdPrefix=billPrefix+billMiddle+r.listRegTreBillDto[0].invoiceCount+billSufix;*/
	
	var recPrefix=$("#recPrefix").val();
	var recMiddle=$("#recMiddle").val();
	var recSufix=$("#recSufix").val();
	var tActiveFlag = $("#preId").val(); 
	
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
				
				recCount = recPrefix + recMiddle + recCount + recSufix;
				
				var againId=res.listBillReceiptMaster[i].againstId;
				var totAmt=0;
				var totDisc=0;
				var remainAmt=0;
				var refundAmt=0;
				var refundable=0;
				if(againId==0){
					//added by Rohit 04-01-2021
					//to get the total paid amount after doing a partially payment in refundable tab
					totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);
//					totAmt=parseFloat(res.listBillReceiptMaster[i].firstPaid).toFixed(2);	
					totDisc=parseFloat(res.listBillReceiptMaster[i].firstDisc).toFixed(2);
					remainAmt=parseFloat(res.listBillReceiptMaster[i].firstRemain).toFixed(2);	
				}else{
					
					totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);	
					totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
					remainAmt=parseFloat(res.listBillReceiptMaster[i].totalRemain).toFixed(2);	
				}
				var totalAmt=parseFloat(res.listBillReceiptMaster[i].totalAmt).toFixed(2);
				refundAmt= parseFloat(res.listBillReceiptMaster[i].actualRefAmt).toFixed(2);
				var refundable=parseFloat(totalAmt)-(parseFloat(refundAmt)+parseFloat(totDisc));
				var totalPaid=parseFloat(totAmt).toFixed(2);
				var datetime= new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
				var creditFlag=res.listBillReceiptMaster[i].creditFlag;					
				var paidByCashFlag=res.listBillReceiptMaster[i].paidByCashFlag;	
				
				if(callFrom=="all"){
					
					prevPaid=Number(prevPaid)+Number(totAmt);
					$("#prevPaid").val(prevPaid);
				}
				
				var callFun = "";
				
				if(parseFloat(remainAmt) > 0){
					  
					callFun = ' <button onclick=checkAllRefundChk('+recId+',"\credit"\),setRefundPayble('+recId+')><i class="fa fa-credit-card"></i></button> ';
					  
				}else{
				  
					callFun = ' <a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a> '
				  				+ ' <button onclick="setRefundPayble('+recId+')"><i class="fa fa-credit-card"></i></button> ';
				}
				
				result=result
				  + '<tr> '
				  + '	<td>'+(i+1)+'</td> '
				  + '	<td>'+recCount+'</td> '
				  + '	<td>'+totalAmt+'</td> '	
				  + '	<td>'+totalPaid+'</td> '
				  + '	<td>'+totDisc+'</td> '
				  + '	<td>'+refundAmt+'</td> '
				  + '	<td>'+refundable.toFixed(2)+'</td> '
				 // + '	<td>'+totAmt+'</td> '
				  + '	<td>'+datetime+'</td> '
				  + '   <td>'+callFun+' ';
				  
				 /* + '	<td><a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>'
				  + '   <button onclick="'+callFun+'"><i class="fa fa-credit-card"></i></button> ';*/
				
				
				/*if(parseFloat(remainAmt) > 0){
					  
					  result=result + ' <td> <a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a> '
					  				+ ' <button onclick="checkAllRefundChk('+recId+'),setRefundPayble()"><i class="fa fa-credit-card"></i></button> ';
					  
				  }else{
					  
					  result=result + ' <td> <a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a> '
					  				+ ' <button onclick="setRefundPayble()"><i class="fa fa-credit-card"></i></button> ';
				  }	*/	
				
				/*if(remainAmt<=0){
					
					result = result + ' <button disabled onclick="setCreditPayble('+remainAmt+','+recCount+',\'refund\')"><i class="fa fa-credit-card"></i></button> ';
				}else{
					
					result = result	+ ' <button onclick="setCreditPayble('+remainAmt+','+recCount+',\'refund\')"><i class="fa fa-credit-card"></i></button> ';
				}*/		
				 	 
				  + '	</td>'
				  + '</tr> ';
				  
					  
				  var resultSlave= 
					  ' <div class="panel-collapse collapse" id="recSlave'+i+'" style="height: 0px;">'
				    + ' <div class="panel-body"> '		
					+ ' <table class="table table-hover" id="receiptSlave"> '
					+ ' <thead> '
					+ '		<tr> '
					+ '			<th>#</th> '
					+ '			<th>Doctor Name</th> '
					+ '			<th>Service Name</th> '						
					+ '			<th>Rate</th> '
					+ '			<th>Concession</th> '
					+ '			<th>Discount</th> '
					+ '			<th>PayMode</th> '	
					+ '			<th>Paid</th> '			
					+ '			<th>Check<input type="checkbox" id="chkForAllRefund'+recId+'" name="chkAllSlaveRefund" onchange=checkAllRefundChk('+recId+',"\cash"\)></th> '
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
					  var refundableFlag = res.listBillReceiptMaster[i].listBillReceiptSlave[k].isRefundable;
					  var refundFlag = res.listBillReceiptMaster[i].listBillReceiptSlave[k].refundFlag;
					  var pathologyRefund = res.listBillReceiptMaster[i].listBillReceiptSlave[k].pathologyRefund;
					  var risRefund = res.listBillReceiptMaster[i].listBillReceiptSlave[k].risRefund;
					  var doctorDeskRefund = res.listBillReceiptMaster[i].listBillReceiptSlave[k].doctorDeskRefund;
					  var conAmt = parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].actualConcnAmt).toFixed(2);
					  var discAmt = parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].actualDiscAmt).toFixed(2);
					  var paidAmt = parseFloat(res.listBillReceiptMaster[i].listBillReceiptSlave[k].actualFinalPaid).toFixed(2);
					  var doctorName = res.listBillReceiptMaster[i].listBillReceiptSlave[k].doctorName;
					  //alert("doctorName::"+doctorName);
					  var payMode = res.listBillReceiptMaster[i].payMode;
					  var receiptMasterId=res.listBillReceiptMaster[i].billReceiptId;
					  var finalBillAmt=(rate*quantity)-disc;
					  
					  resultSlave = resultSlave + '<tr> '
							+ '	<td>'+(k+1)+'</td> ';
							if(doctorName == null){
								resultSlave = resultSlave 	+'	<td id="doctorNameId'+billDetailsId+'">NA</td> ';
							}else{
								resultSlave = resultSlave +'	<td id="doctorNameId'+billDetailsId+'">'+doctorName+'</td> ';
							}
					        resultSlave = resultSlave  + '	<td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> '
							+ '	<td id="billAmt'+billDetailsId+'">'+billAmt+'</td> '
							+ '	<td id="conAmt'+billDetailsId+'">'+conAmt+'</td> '
							+ '	<td id="discAmt'+billDetailsId+'">'+discAmt+'</td> '
							if(payMode == 4){
								resultSlave = resultSlave + '	<td id="payModeReceiptId'+receiptMasterId+'">CAdvance</td> '
							}
							else if(payMode == 1){
							resultSlave = resultSlave + '	<td id="payModeReceiptId'+receiptMasterId+'">Cash</td> '
					  		}
							else if(payMode == 2){
								resultSlave = resultSlave + '	<td id="payModeReceiptId'+receiptMasterId+'">Card</td> '
						  	}
							else if(payMode == 3){
								resultSlave = resultSlave + '	<td id="payModeReceiptId'+receiptMasterId+'">Cheque</td> '
						  	}
							else if(payMode == 6){
								resultSlave = resultSlave + '	<td id="payModeReceiptId'+receiptMasterId+'">Sponsor Credit</td> '
						  	}
							else if(payMode == 7){
								resultSlave = resultSlave + '	<td id="payModeReceiptId'+receiptMasterId+'">NEFT</td> '
						  	}
					  		resultSlave = resultSlave + '	<td id="paidAmt'+billDetailsId+'">'+paidAmt+'</td> '							
							
							if(refundFlag == "Y" || refundableFlag == "N" || pathologyRefund == "Y" || risRefund == "Y" || doctorDeskRefund == "Y"){
								
								resultSlave = resultSlave + '	<td><input type="checkbox" disabled class="slaveNotAddedRefund chkRfndSlave" name="refundRd" value="'+paidAmt+'" id="refundChk'+billDetailsId+'" onclick="setSlaveRefundAmt('+billDetailsId+')"></td> ';
							}else{
								
								resultSlave = resultSlave + '	<td><input type="checkbox" class="slaveNotAddedRefund chkRfndSlave'+recId+'" name="refundRd'+recId+'" value="'+paidAmt+'" id="refundChk'+billDetailsId+'" onclick="setSlaveRefundAmt('+billDetailsId+')"></td> ';
							}
							
					  resultSlave = resultSlave + '	<td ><input type="hidden" id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> '
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
				
			/*for(var i=0;i<res.listBillReceiptMaster.length;i++){
				var m=0;
				var x = res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId;
				var recId=res.listBillReceiptMaster[i].billReceiptId;
				var recCount=res.listBillReceiptMaster[i].receiptCount;
				//var againId=res.listBillReceiptMaster[i].againstId;
				var totalAmt=parseFloat(res.listBillReceiptMaster[i].totalAmt).toFixed(2);
				var totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);		
				var refAmt=parseFloat(res.listBillReceiptMaster[i].refundAmt).toFixed(2);
				var totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
				var remainAmt=parseFloat(Number(totAmt)-Number(refAmt)).toFixed(2);
				var datetime= new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
				
				recCount = recPrefix + recMiddle + recCount + recSufix;
				//prevPaid=prevPaid+totAmt;
				
				result=result
				  + '<tr> '
				  + '	<td>'+(i+1)+'</td> '
				  + '	<td><input type="checkbox" class="mstNotRefund" value="'+remainAmt+'" id="mstRefndId'+recId+'" onclick="setMasterRefundAmt('+recId+')"></td> '
				  + '	<td>'+recCount+'</td> '
				  + '	<td>'+totalAmt+'</td> '
				  + '	<td>'+totAmt+'</td> '
				  + '	<td>'+totDisc+'</td> '
				  + '	<td>'+refAmt+'</td> '
				  + '	<td>'+remainAmt+'</td> '
				  + '	<td>'+datetime+'</td> '
				  + '	<td>';
				  + '	<td><a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>'
				  + '   <button onclick=receiptBillPrint("receipt",'+recId+') data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button> ';
				
				if(remainAmt<=0){
					
					result=result	+ '   <button disabled onclick="setCreditPayble('+remainAmt+','+recCount+',\'refund\')"><i class="fa fa-credit-card"></i></button> ';
				}else{
					
					result=result	+ '   <button onclick="setCreditPayble('+remainAmt+','+recCount+',\'refund\')"><i class="fa fa-credit-card"></i></button> ';
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
					+ '			<th>Edit</th> '
					+ '			<th>Delete</th> '
					+ '			<th>Chk</th> '
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
					  var serviceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
					  var subServiceId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].subServiceId;
					  var doctorId   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].doctorId;
					  // For Professional fees
					  var pfVoucherFlag   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].pfVoucherFlag;
					  var advanceFlag   =res.listBillReceiptMaster[i].listBillReceiptSlave[k].advanceFlag;
					  
					  
					  var finalBillAmt=billAmt-disc;
					  
					  resultSlave = resultSlave + '<tr> '
							+ '	<td>'+(k+1)+'</td> '
							+ '	<td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> '
							+ '	<td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> '
							+ '	<td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> ';
							if (pfVoucherFlag == "N" && advanceFlag == "N") {
								 resultSlave = resultSlave + '	<td><button class="btn btn-xs btn-success editUserAccess SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
									
									+ '	<td><button class="btn btn-xs btn-success deleteUserAccess SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
									
							} else {
								resultSlave = resultSlave + '	<td><button disabled class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
								
								+ '	<td><button disabled class="btn btn-xs btn-success deleteUserAccess SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
								
							}
							
							+ '	<td><input type="checkbox" class="slaveNotAddedRefund chkRfndSlave'+recId+'" name="refundRd" value="'+billAmt+'" id="refundChk'+billDetailsId+'" onclick="setSlaveRefundAmt('+billDetailsId+')"></td> '
							
							+ '	<td ><input type="hidden" id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> '
							+ '	<td ><input type="hidden" id="rateOfReceipt'+billDetailsId+'" value="'+rate+'"></td> '
							+ '	<td ><input type="hidden" id="quan'+billDetailsId+'" value="'+quantity+'"></td> '
							+ '	<td ><input type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> '
							+ '	<td ><input type="hidden" id="copay'+billDetailsId+'" value="'+copay+'"></td> '
							+ '	<td ><input type="hidden" id="pay'+billDetailsId+'" value="'+pay+'"></td> '
							+ '	<td ><input type="hidden" id="sId'+billDetailsId+'" value="'+serviceId+'"></td> '
							+ '	<td ><input type="hidden" id="subsId'+billDetailsId+'" value="'+subServiceId+'"></td> '
							+ '	<td ><input type="hidden" id="doctorId'+billDetailsId+'" value="'+doctorId+'"></td> '							
							
							+ '</tr>';	
					  
				  }	
				
				resultSlave=resultSlave + '	</tbody></table></div></div> ';
				result=result +resultSlave;		
							  	
			}
				
			result=result
			+ '	</tbody> '
			+ '</table> ';	*/	
	
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
				/*var m=0;
				var x = res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId;*/
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
				//var totAmt=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);
				//var totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
				//var remainAmt=parseFloat(res.listBillReceiptMaster[i].totalRemain).toFixed(2);	
				var datetime= new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
				var creditFlag=res.listBillReceiptMaster[i].creditFlag;					
				var paidByCashFlag=res.listBillReceiptMaster[i].paidByCashFlag;	
				
				//For professional fees
				//var billSettledFlag=res.listBillReceiptMaster[i].billSettledFlag;	
				//var refundFlag=res.listBillReceiptMaster[i].refundFlag;		
				
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
					
					/*result=result + '   <button disabled onclick="hideOpdBillPanel('+recId+')"><i class="fa fa-plus"></i></button> ';*/
	  									
				}else{
					
					 if(creditFlag=="Y"){
						  
						  result=result /*+ '   <button disabled onclick="hideOpdBillPanel('+recId+')"><i class="fa fa-plus"></i></button> '*/
						  				+ '   <button disabled onclick="deleteMasterReceiptOPD('+recId+')"><i class="fa fa-trash-o"></i></button> ';
						    
					  }else{
						  
						  result=result /*+ '   <button onclick="hideOpdBillPanel('+recId+')"><i class="fa fa-plus"></i></button> '*/
						  				+ '   <button disabled class="deleteUserAccess" onclick="deleteMasterReceiptOPD('+recId+')"><i class="fa fa-trash-o"></i></button> ';
						  
					  }		
				}
				
				 	  
				  
				  /*if (billSettledFlag ="Y") {
					  result=result  + '   <button disabled onclick="deleteMasterReceiptOPD('+recId+')"><i class="fa fa-trash-o"></i></button> ';
					  
				  } else {
					  result=result  + '   <button onclick="deleteMasterReceiptOPD('+recId+')"><i class="fa fa-trash-o"></i></button> ';
					  
				  }*/
				result=result  + '   <button onclick=receiptBillPrint("receipt",'+recId+') data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button> ';
				
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
					  //var paid=res.listBillReceiptMaster[i].listBillReceiptSlave[k].paid;
					 // var paid=billAmt-disc;paid
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
							
							/*if(againstId > 0){
								
								
							}else{
								
								if(pfVoucherFlag == "Y" || creditFlag == "Y" || againstId > 0){
									
									resultSlave = resultSlave	+ '	<td><button disabled class="btn btn-xs btn-success SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
															+ '	<td><button disabled class="btn btn-xs btn-success SlaveBtn" value="DELETE" onclick="deleteNarration(\'open\','+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
								}else {
								   
									resultSlave = resultSlave + ' <td><button disabled class="btn btn-xs btn-success editUserAccess SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
															  + ' <td><button disabled class="btn btn-xs btn-success deleteUserAccess SlaveBtn" value="DELETE" onclick="deleteNarration(\'open\','+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
														   
								}	
							}*/
					  		var meeshaFlow = $("#sendTestFlagMeesha").val();
						  	if(meeshaFlow == "on"){
					  			
					  			resultSlave = resultSlave	/*+ '	<td><button disabled class="btn btn-xs btn-success SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '*/
								+ '	<td><button disabled class="btn btn-xs btn-success" value="DELETE" onclick="deleteNarration(\'open\','+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
					  		}else{
					  			
					  			if(pfVoucherFlag == "Y" || creditFlag == "Y" || againstId > 0){
									
									resultSlave = resultSlave	/*+ '	<td><button disabled class="btn btn-xs btn-success SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '*/
															+ '	<td><button disabled class="btn btn-xs btn-success SlaveBtn" value="DELETE" onclick="deleteNarration(\'open\','+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
								}else {
								   
									resultSlave = resultSlave /*+ ' <td><button disabled class="btn btn-xs btn-success editUserAccess SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '*/
															  + ' <td><button disabled class="btn btn-xs btn-success deleteUserAccess SlaveBtn" value="DELETE" onclick="deleteNarration(\'open\','+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> ';
														   
								}
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

/************
* @author	: Vishant Pawar
* @date		: 1-April-2024
* @codeFor	: Save total refund 
 ************/
function setRefundPayble(recId){
	
	var payable = $("#payable").val();
	var payMode = $("#payModeReceiptId"+recId).text();
	if(payMode == "CAdvance"){
		$("#payMode").val(4);
	}
	else if(payMode == "Cash"){
		$("#payMode").val(1);
	}
	else if(payMode == "Card"){
		$("#payMode").val(2);
	}
	else if(payMode == "Cheque"){
		$("#payMode").val(3);
	}
	else if(payMode == "Sponsor Credit"){
		$("#payMode").val(6);
	}
	else if(payMode == "NEFT"){
		$("#payMode").val(7);
	}
	$("#payable").val(Math.round(payable));
	$("#payNow").val(Math.round(payable));
	//added by Rohit on 28-12-2020
	//to disabled paynow amount to avoid partial refund payment option
	$("#payNow").prop("readonly","true");
	var servIdsChecked=[]; 
 	
 	$('.slaveAddedRefund:checkbox:checked').each(function(){
 		
 		var id = $(this).attr("id");
 		var splitId = id.replace( /^\D+/g, '');
 		servIdsChecked.push(splitId);
 	});
 	
 	if(servIdsChecked.length == 0){
 		
 		alert("All services already refunded"); 	
	}else{
		
		$("#recId").val(recId);
		$("#btnPayNow").prop("disabled","true");
		$("#btnDisc").prop("disabled","true");
		$("#btnRefund").removeAttr('disabled');	
		$("#trRefPer").show();
		
		$("#refAuth").show();	
		//$("#discNarrtn").show();
		$("#discAuth").hide();
		$("#discRemark").hide();	
		$("#refRemark").show();		
		$("#trRefPer").hide();
		
		$("#payMode option[value='-1']").remove();
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 14-July-2017
* @codeFor	: Get bill refund master details
 ************/
function getBillRefundDetails(callFrom) {

	var treatmentId	= $("#treatmentId").text();  
	var billId		= $("#billNo").text(); 
	var receiptOf= $("#receiptOf").val();
	var userId = parseInt($("#userId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());	
	
	jQuery.ajax({
		async	: false,
		type	: "POST",		
		data 	: { "treatmentId" : parseInt(treatmentId),"billId" : parseInt(billId), "callFrom" : callFrom, "receiptOf" : receiptOf, "userId" : userId, "chargesSlaveId" : chargesSlaveId },
		url 	: "ehat/bill/getBillRefundDetails",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			///var len=r.listBillReceiptMaster.length;
			/*if(len>0){*/
				
				setRefundTemplate(r,callFrom);				
				//disableSevices(r);
			/*}*/			
		}
	});
};

/************
* @author	: Vinod Udawant
* @date		: 14-July-2017
* @codeFor	: Set refund master template
 ************/
function setRefundTemplate(res,callFrom){
	
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
		/*var m=0;
		var x = res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId;*/
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
		  /*+ '	<td><input type="checkbox" class="mstNotRefund" value="'+remainAmt+'" id="mstRefndId'+recId+'" onclick="setMasterRefundAmt('+recId+')"></td> '*/
		  + '	<td>'+recCount+'</td> '
		  + '	<td>'+totalAmt+'</td> '
		  + '	<td>'+totAmt+'</td> '
		  + '	<td>'+remainAmt+'</td> '
		  + '	<td>'+datetime+'</td> '
		  + '   <td> <button onclick=receiptBillPrint("refund",'+recId+') data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button></td> '
		  /*+ '	<td><a href="#recSlave'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>';*/
		/*
		if(creditFlag=="Y"){
			
			result=result	+ '   <button disabled onclick="setCreditPayble('+totAmt+','+recId+')"><i class="fa fa-credit-card"></i></button> '
		}else{
			
			result=result	+ '   <button onclick="setCreditPayble('+totAmt+','+recId+')"><i class="fa fa-credit-card"></i></button> '
		}		
		  
		  + '	</td>'*/
		  + '</tr> ';
			
	  /*var resultSlave= 
			  ' <div class="panel-collapse collapse" id="recSlave'+i+'" style="height: 0px;">'
		    + ' <div class="panel-body"> '		
			+ ' <table class="table table-hover" id="receiptSlave"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Comp Name</th> '
			+ '			<th>Amount</th> '
			+ '			<th>Date</th> '		
			+ '			<th>Edit</th> '
			+ '			<th>Delete</th> '
			+ '			<th>Chk</th> '
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody> ';	 

		  for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
			  
			  var slaveId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billRecSlaveId;
			  var billDetailsId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;
			  var billAmt=res.listBillReceiptMaster[i].listBillReceiptSlave[k].amount;
			  var rate=res.listBillReceiptMaster[i].listBillReceiptSlave[k].rate;
			  var quantity=res.listBillReceiptMaster[i].listBillReceiptSlave[k].quantity;
			  var copay=res.listBillReceiptMaster[i].listBillReceiptSlave[k].coPay;
			  var pay=res.listBillReceiptMaster[i].listBillReceiptSlave[k].pay;
			  var disc=res.listBillReceiptMaster[i].listBillReceiptSlave[k].concession;
			 // var serviceID=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
			  
			  var finalBillAmt=billAmt-disc;
			  
			  resultSlave = resultSlave + '<tr> '
					+ '	<td>'+(k+1)+'</td> '
					+ '	<td id="compNameIPD'+billDetailsId+'">'+res.listBillReceiptMaster[i].listBillReceiptSlave[k].compName+'</td> '
					+ '	<td id="finalBillAmt'+billDetailsId+'">'+finalBillAmt+'</td> '
					+ '	<td id="datetimeIPD'+billDetailsId+'">'+datetime+'</td> '
					
					+ '	<td><button class="btn btn-xs btn-success editUserAcce SlaveBtn" value="EDIT" onclick="editOnClickForReciept('+billDetailsId+','+slaveId+','+rate+')"><i id="btnEdit1238" class="fa fa-edit" value="EDIT"></i></button></td> '
					
					+ '	<td><button class="btn btn-xs btn-success deleteUserAcce SlaveBtn" value="DELETE" onclick="deleteOnClickForReciept('+slaveId+','+recId+')"><i id="btnDelete" class="fa fa-trash-o" value="DELETE"></i></button></td> '
					
					+ '	<td><input type="checkbox" class="slaveNotAddedRefund chkRfndSlave'+recId+'" name="refundRd" value="'+billAmt+'" id="refundChk'+billDetailsId+'" onclick="setSlaveRefundAmt('+billDetailsId+')"></td> '
					
					+ '	<td ><input type="hidden" id="billAmtIPD'+billDetailsId+'" value="'+billAmt+'"></td> '
					+ '	<td ><input type="hidden" id="rateOfReceipt'+billDetailsId+'" value="'+rate+'"></td> '
					+ '	<td ><input type="hidden" id="quan'+billDetailsId+'" value="'+quantity+'"></td> '
					+ '	<td ><input type="hidden" id="disc'+billDetailsId+'" value="'+disc+'"></td> '
					+ '	<td ><input type="hidden" id="copay'+billDetailsId+'" value="'+copay+'"></td> '
					+ '	<td ><input type="hidden" id="pay'+billDetailsId+'" value="'+pay+'"></td> '
					+ '</tr>';	
			  
		  }	
		
		resultSlave=resultSlave + '	</tbody></table></div></div> ';
		result=result +resultSlave;		
					  	
	}*/
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

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Save total payble 
 ************/
function setRefundAmt(id){
		
	if($('#mstRefndId'+id).prop("checked") == true){	
				
		$("#mstRefndId"+id).removeClass("mstNotRefund");
    	$("#mstRefndId"+id).addClass("mstRefund");  
    	    	
    	$('.chkRfndSlave'+id).prop('checked', true);    	
    	mainRefundTotal(); 	
	}else{
		
		$("#mstRefndId"+id).removeClass("mstRefund");
    	$("#mstRefndId"+id).addClass("mstNotRefund");
    	
    	$('.chkRfndSlave'+id).prop('checked', false);
    	mainRefundTotal(); 	
	}
	
	$("#payable").val(refundAmt);	
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Save total payble 
 ************/
function setSlaveRefundAmt(id){
		
	if($('#refundChk'+id).prop("checked") == true){	
				
		$("#refundChk"+id).removeClass("slaveNotAddedRefund");
    	$("#refundChk"+id).addClass("slaveAddedRefund");  
    	    	
    	//$('.chkRfndSlave'+id).prop('checked', true);    	
    	mainRefundTotal(); 	
	}else{
		
		$("#refundChk"+id).removeClass("slaveAddedRefund");
    	$("#refundChk"+id).addClass("slaveNotAddedRefund");
    	
    	//$('.chkRfndSlave'+id).prop('checked', false);
    	mainRefundTotal(); 	
	}
	
	//$("#payable").val(refundAmt);	
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Save total payble 
 ************/
function mainRefundTotal(){
	
	var total=0;
	//var count=0;
	
	/*$('.slaveAddedRefund').each(function() {
		count++;		 
	});*/
	
	$('.slaveAddedRefund').each(function() {
		
		total=total+Number($(this).val());    
	});
		
	/*if(count>0){
		
		$("#mainBillDeatils").hide('hide');
	}else{
		
		$("#mainBillDeatils").show('show');
	}*/
	/*$('.slaveAddedRefund').each(function() {
		
		total=total+Number($(this).val());    
	});*/
	
	$("#payable").val(total);
	$("#payNow").val(total);
	
}


/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Set slave checkboxes according to master
 ************/
function setRefundAmtSlave(id){
	
    if(($('#mstRefndId'+id).prop("checked") == true)){
    	
    	/*if(id==1){
    		
    		$('#tamt1').removeClass("slaveNotAddedRefund");
        	$('#tamt1').addClass("slaveAddedRefund");
    	}*/
    	
    	$('.chkRfndSlave'+id).prop('checked', true);    	
    	 
    	$('.chkRfndSlave'+id).removeClass("slaveNotAddedRefund");
    	$('.chkRfndSlave'+id).addClass("slaveAddedRefund");
    	setTotalRefund();
    }else{
    	
    	/*if(id==1){
    		
    		$('#tamt1').removeClass("mainAddedInTotal");
        	$('#tamt1').addClass("mainNotInTotal");
    	}*/
    	
    	$('.chkRfndSlave'+id).prop('checked', false);	
    	
    	$('.chkRfndSlave'+id).removeClass("slaveAddedRefund");
    	$('.chkRfndSlave'+id).addClass("slaveNotAddedRefund");
    	setTotalRefund();
    }	
}





/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Set remain payable against credit
 ************/
/*function setCreditPayble(id){
	
	if(($('#mstRefndId'+id).prop("checked") == true)){
    	
		$('#mstRefndId'+id).removeClass("mstNotRefund");
    	$('#mstRefndId'+id).addClass("mstAddedRefund");   	
    	 
    	$('.chkRfndSlave'+id).prop("checked",true);  
    	
    	$('.billSlave'+id).removeClass("notInTotal");
    	$('.billSlave'+id).addClass("addedInTotal");
    	setTotalRefund();
		
		//$("#payable").val($('#mstRefndId'+id).val());
		
    }else{
    	
    	$('#mstRefndId'+id).removeClass("mstAddedRefund");
    	$('#mstRefndId'+id).addClass("mstNotRefund");   	
    	 
    	
    	$('.chkRfndSlave'+id).prop("checked",false);  
    	$('.billSlave'+id).removeClass("notInTotal");
    	$('.billSlave'+id).addClass("addedInTotal");
    	setTotalRefund();
    	if(id==1){
    		
    		$('#tamt1').removeClass("mstAddedRefund");
        	$('#tamt1').addClass("mstNotRefund");
    	}
    	
    	$('.billSlaveChk'+id).prop('checked', false);	
    	
    	$('.billSlave'+id).removeClass("addedInTotal");
    	$('.billSlave'+id).addClass("notInTotal");
    	$('.mstRefndId'+id).removeClass("mstNotRefund");
    	$('.mstRefndId'+id).addClass("mstAddedRefund"); 
    	//$("#payable").val(0);
    }
	$("#payable").val(remAmt);	
}*/
function setCreditPayble(remAmt,recId,callFrom,trId){
		
	var curClass=$("#shBillView").attr('class');
	
	if(curClass=="fa fa-chevron-up"){
		
		hideBillDetails();
	}
		
	$("#refPer").val(0);
	$("#payNow").val(0);
	
	$("#payable").val(parseFloat(remAmt).toFixed(2));	
	$("#recId").val(recId);
	$("#callFromForSave").val("credit");
	fetchAuthorisedBy();
	if(callFrom=="refund"){
		
		$("#btnPayNow").prop("disabled","true");
		$("#btnRefund").removeAttr('disabled');	
		$("#trRefPer").show();
		
		$("#refAuth").show();	
		//$("#discNarrtn").show();
		$("#discRemark").hide();	
		$("#refRemark").show();		
		
		$("#payMode option[value='4']").remove();
		$("#payMode option[value='-1']").remove();		
		
	}else if(callFrom=="pending"){
		
		$("#pendingFlag").val("Y");
		$("#pendingTreatId").val(trId);	
		$("#payNow").prop("readonly","readonly");
		$("#payNow").val(remAmt);
		$("#trRefPer").hide();
		
		if ( $("#payMode option[value='4']").length < 1 ){
			
			$("#payMode").append('<option value="4">CAdvance</option>');
		}
		
		if ( $("#payMode option[value='-1']").length < 1 ){
			
			$("#payMode").append('<option value="-1">Multiple</option>');
		}		
		
	}else{
		
		$("#refAuth").hide();	
		//$("#discNarrtn").hide();
		$("#refRemark").hide();
		
		if ( $("#payMode option[value='4']").length < 1 ){
			
			$("#payMode").append('<option value="4">CAdvance</option>');
		}
		
		if ( $("#payMode option[value='-1']").length < 1 ){
			
			$("#payMode").append('<option value="-1">Multiple</option>');
		}			
	}			
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Save total payble 
 ************/
function setTotalRefund(){
	
	var total=0;
	var count=0;
	$('.slaveAddedRefund').each(function() {
		count++;
		total=total+Number($(this).val());    
	});
	
	$("#mainBillDeatils").show('show');
	
	/*if(count>0){
		
		$("#mainBillDeatils").hide('hide');
	}else{
		
		$("#mainBillDeatils").show('show');
	}*/
	/*$('.slaveAddedRefund').each(function() {
		
		total=total+Number($(this).val());    
	});*/
	
	$("#payable").val(total);
}

/************
* @author	: Vinod Udawant
* @date		: 22-June-2017
* @codeFor	: Disable paid services
 ************/
function disableSevices(res){
		
	for(var i=0;i<res.listBillReceiptMaster.length;i++){
		
		 for(var k=0;k<res.listBillReceiptMaster[i].listBillReceiptSlave.length;k++){
			 
			 var serId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].serviceId;
			 var subSerId=res.listBillReceiptMaster[i].listBillReceiptSlave[k].billDetailsId;			 		
			
			 $("#chkOpdBillReg"+serId).attr("disabled", true);
			 $("#chkOpdBillReg"+serId).attr("checked", false);			 
			
			 $("#tamt"+serId).removeClass("mainAddedInTotal");
			 $("#tamt"+serId).addClass("mainNotInTotal");				 
			
			 $("#chkOpdBill"+subSerId).attr("disabled", true);				
			 $("#chkOpdBill"+subSerId).attr("checked", false);			
		 }
	}	
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 3_June_2017
 * @Code Getting Patient Data By Id
 ******************************************************************************/
function getPatientIPDBill(treatId) {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" :treatId
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			// setTempPatientRecords(r);
			console.log(r);
			/* alert(r); */
			 /*****Added By Sagar******/
			
			            callFrom=r.listRegTreBillDto[0].chargesMasterSlaveId;
			            if (callFrom==null || callFrom=="" || callFrom==undefined ||callFrom==0){
			            	
			            	
			            }else{
			            getSponsorRecords(callFrom);
			            }
			/* alert(); */
			$("#patientId").text(r.listRegTreBillDto[0].patientId);
			$("#age").text(r.listRegTreBillDto[0].age);
			$("#patientName").text(r.listRegTreBillDto[0].patientName );
		    $("#billNo").text(r.listRegTreBillDto[0].billId);
		    $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
			/*$("#patientName").text(r.ListRegTreBillDto[0].fName + " " + r.ListRegTreBillDto[0].mName + " "
							+ r.ListRegTreBillDto[0].lName);*/
			$("#sex").text(r.listRegTreBillDto[0].gender);
			$("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
			$("#pId").val(r.listRegTreBillDto[0].patientId);
			$("#bId").val(r.listRegTreBillDto[0].billId);
			$("#tId").val(r.listRegTreBillDto[0].treatmentId);
			$("#sId").val(r.listRegTreBillDto[0].serviceId);
			$("#ipdNo").text(r.listRegTreBillDto[0].fName);
			/* ****Added By Sagar******/
			if(r.listRegTreBillDto[0].sourceTypeId==1){
				
				$("#billCategoty").text("Sponsor");

			}else{
				$("#billCategoty").text("Self");
				$("#corporate").text("");
			}
		
 			/*  $("#ipdNo").text(r.listReg[0].fName);
			  $("#billCategoty").text(r.listReg[0].fName);
			  $("#consultingDoctor").text(r.listReg[0].fName);
			  $("#corporate").text(r.listReg[0].fName);
			  $("#doa").text(r.listReg[0].fName);
			  $("#dod").text(r.listReg[0].fName);*/
		}
	});
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
			
						
						$('#perticular').val(ui.item.categoryName);
/*						$("#subservicesname").val(ui.item.categoryName);
*/						$("#subserviceid").val(ui.item.categoryid);
						$("#servicename").val(ui.item.serviceName);
						$("#serviceid" ).val(ui.item.serviceid);
						$("#rate" ).val(ui.item.categorycharges);
						$("#concession" ).val(ui.item.concession);
						$("#amount" ).val(ui.item.amount);
						$("#servId" ).val(ui.item.serviceid);
						calculatePerticularTotal1();
				
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

/**
 * @author Bilal
 * @date 3-JULY-2017
 * @code for update after reciept generated**/
function editOnClickForReciept(billDetailsId,slaveId, billAmt){	
	
	var receiptEditSponsor  = $("#receiptEditSponsor").val(); 
	if (receiptEditSponsor == "sponsor") {
		$('#queryType').val('update');
		$('#saveServiceCallFrom').val('reciept');
		$('#billDetailsId').val(billDetailsId);
		$('#receiptSlaveId').val(slaveId);
		$('#perticularOpdSponsor').val($('#compNameIPD'+billDetailsId).text());
		
	    var a=parseInt($('#servId'+billDetailsId).val());
	        
		$('#servIdOpdSponsor').val(a).text();
		
		$("#serviceid").val(a);
		$("#servIdOpdSponsor").val(a);
		 
		//$('#servId option:not(:selected)').prop('disabled', true);
		 
		 var subserviceid= parseInt($('#subsId'+billDetailsId).val());
		 
		
		 /***if we edit consultation then quantity should be readonly**/
		    if (a == 1) {
		    	$("#qtyOpdSponsor").prop("readonly", true);
		    	 $("#subserviceid").val(-1);
			} else {
				$("#qtyOpdSponsor").prop("readonly", false);
				 $("#subserviceid").val(subserviceid);
			}
		 /***if we edit consultation then quantity should be readonly**/
		 var d=parseInt($('#doctorId'+billDetailsId).val());
		
		
		$('#doctorNameOpdSponsor').select2('val',d);
			
		var rate=$("#rateOfReceipt"+billDetailsId).val();
		$('#rateOpdSponsor').val(rate);
		$('#rate2').val(rate);
		
		var quantity=$("#quan"+billDetailsId).val();
		$('#qtyOpdSponsor').val(quantity);
		
		var disc=$("#disc"+billDetailsId).val();
		$('#concessionOpdSponsor').val(disc);
		
		var amt=rate*quantity;
		
		$('#amountOpdSponsor').val(amt);
		$('#amountOpdSponsor').attr('readonly', 'true');

		var sponsorId = $("#SponsorsourceTypeId").val();
		var chargesSlaveId = $("#chargesSlaveId").val();

		var pay = $("#pay" + billDetailsId).val();
		var copay = $("#copay" + billDetailsId).val();
		
		var consAmt=((disc * 100 ) / amt).toFixed(2);
		$('#concessionOpdSponsorOnPerc').val(consAmt);
		

		if (sponsorId >= 1 && chargesSlaveId > 0) {
			pay = amt - disc;
			$('#payOpdSponsor').val(pay);
		} else {
			copay = amt - disc;
			$('#coPayOpdSponsor').val(copay);
		}
		
		
		//for professional fees added by bilal 
		 /* var actualAmt         =$('#actualAmt'+billDetailsId).val();
		  $('#actualAmt').val(actualAmt);
		  var actualConcnPer    =$('#actualConcnPer'+billDetailsId).val();
		  $('#actualConcnPer').val(actualConcnPer);
		  var actualConcnAmt    =$('#actualConcnAmt'+billDetailsId).val();
		  $('#actualConcnAmt').val(actualConcnAmt);
		  var actualPayable     =$('#actualPayable'+billDetailsId).val();
		  $('#actualPayable').val(actualPayable);
		  var actualDiscPer     =$('#actualDiscPer'+billDetailsId).val();
		  $('#actualDiscPer').val(actualDiscPer);
		  var actualDiscAmt     =$('#actualDiscAmt'+billDetailsId).val();
		  $('#actualDiscAmt').val(actualDiscAmt);
		  var actualFinalPaid   =$('#actualFinalPaid'+billDetailsId).val();
		  $('#actualFinalPaid').val(actualFinalPaid);
		  */
		  
		  //for profesional fees 

	} else {
		$('#queryType').val('update');
		$('#saveServiceCallFrom').val('reciept');
		$('#billDetailsId').val(billDetailsId);
		$('#receiptSlaveId').val(slaveId);
		$('#perticular').val($('#compNameIPD'+billDetailsId).text());
		
		/*var a=parseInt($('#sId'+billDetailsId).text());
		
		$('#servId').val(a).text();
		
		$("#serviceid").val(a);*/
		
		
	    var a=parseInt($('#servId'+billDetailsId).val());
		
	    
	    
		$('#servId').val(a).text();
		
		$("#serviceid").val(a);
		$("#servId").val(a);
		 
		 var subserviceid= parseInt($('#subsId'+billDetailsId).val());
		
		 
		 
		 /***if we edit consultation then quantity should be readonly**/
		    if (a == 1) {
		    	$("#qty").prop("readonly", true);
		    	$("#subserviceid").val(-1);
			} else {
				$("#qty").prop("readonly", false);
				$("#subserviceid").val(subserviceid);
			}
		 /***if we edit consultation then quantity should be readonly**/
		    
		var d=parseInt($('#doctorId'+billDetailsId).val());
		
		$('#doctorName').select2('val',d);
			
		var rate=$("#rateOfReceipt"+billDetailsId).val();
		$('#rate').val(rate);
		$('#rate2').val(rate);
		
		var quantity=$("#quan"+billDetailsId).val();
		$('#qty').val(quantity);
		
		var disc=$("#disc"+billDetailsId).val();
		$('#concession').val(disc);
		
		
		var amt=rate*quantity;
		
		$('#amount').val(amt);
		$('#amount').attr('readonly', 'true');

		var sponsorId = $("#SponsorsourceTypeId").val();
		var chargesSlaveId = $("#chargesSlaveId").val();

		var pay = $("#pay" + billDetailsId).val();

		var consAmt=((disc * 100 ) / amt).toFixed(2);
		$('#concessionOnPerc').val(consAmt);
		
		if (sponsorId >= 1 && chargesSlaveId > 0 && receiptEditSponsor == "sponsor") {
			pay = amt - disc;
			$('#pay').val(pay);
		} else {
		}
		var copay = $("#copay" + billDetailsId).val();

		if (sponsorId >= 1 && chargesSlaveId > 0 && receiptEditSponsor == "sponsor") {
			// copay
			$('#coPay').val(copay);
		} else {
			copay = amt - disc;
			$('#coPay').val(copay);
		}
		
		//for professional fees added by bilal 
		 /* var actualAmt         =$('#actualAmt'+billDetailsId).val();
		  $('#actualAmt').val(actualAmt);
		  var actualConcnPer    =$('#actualConcnPer'+billDetailsId).val();
		  $('#actualConcnPer').val(actualConcnPer);
		  var actualConcnAmt    =$('#actualConcnAmt'+billDetailsId).val();
		  $('#actualConcnAmt').val(actualConcnAmt);
		  var actualPayable     =$('#actualPayable'+billDetailsId).val();
		  $('#actualPayable').val(actualPayable);
		  var actualDiscPer     =$('#actualDiscPer'+billDetailsId).val();
		  $('#actualDiscPer').val(actualDiscPer);
		  var actualDiscAmt     =$('#actualDiscAmt'+billDetailsId).val();
		  $('#actualDiscAmt').val(actualDiscAmt);
		  var actualFinalPaid   =$('#actualFinalPaid'+billDetailsId).val();
		  $('#actualFinalPaid').val(actualFinalPaid);
		  */
		  
		  //for profesional fees 
	}
	
	$("#narration").val('narration');
}
/**
 * @author Bilal 
 * @date 10-july-2017
 * @code For opd receipt add new service*/
function hideOpdBillPanel(recId){
	
	//$("#opdBillPanel").toggle();	 ,billDetailsId
	var receiptOf=$("#receiptOf").val();
	if(receiptOf=="general"){
		
		$('#opdBillPanel').slideToggle('fast', function() {
			 
			if($(this).is(':visible')){
				
				$('#saveServiceCallFrom').val('');
				$('#queryType').val('insert');
				$('#receiptMasterId').val();
				
			}else{
				//return when condition is true
				//$('#billDetailsId').val(billDetailsId);
				$('#saveServiceCallFrom').val('addToOPDreciept');
				$('#queryType').val('insert');
				$('#receiptMasterId').val(recId);
				
			}
		});
	}else{
		
		$('#opdBillPanelSponsor').slideToggle('fast', function() {
			 
			if($(this).is(':visible')){
				
				$('#saveServiceCallFrom').val('');
				$('#queryType').val('insert');
				$('#receiptMasterId').val();
				
			}else{
				//return when condition is true
				//$('#billDetailsId').val(billDetailsId);
				$('#saveServiceCallFrom').val('addToOPDreciept');
				$('#queryType').val('insert');
				$('#receiptMasterId').val(recId);
				
			}
		});
	}	
}

/**
 * @author Bilal
 * @Date 10-july-2017
 * @code for delete from receipt of OPD**/
function deleteOnClickForReciept(slaveId, billReceiptMasterId){
	
	var r = confirm("Are You Sure You Want To Delete?");
	if (r == true) {
		
		jQuery.ajax({
			type : "POST",
			url : "ehat/doctordesk/deleteReceiptOfOPD",
			data : {
				"slaveId" : parseInt(slaveId)
			},				
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				alertify.success(response);
				getBillReceiptDetails("deleteOPD");
				resetAll("general");
			}
		});
	}
}

/************
* @author	: Vinod Udawant
* @date		: 11-July-2017
* @codeFor	: Show/hide receipt view
 ************/
function hideBillDetails(){
	
	$("#mainBillDeatilsForOpd").toggle('slow');	
	var curClass=$("#shBillView").attr('class');
	
	if(curClass=="fa fa-chevron-up"){
		
		$("#shBillView").removeClass('fa fa-chevron-up');
		$("#shBillView").addClass('fa fa-chevron-down');
		$("#billText").text('Show Bill View');
		
		$("#refundBillDetails").css("height","425px");
		$("#refundBillDetails").css("overflow","auto");		
		
	}else{
		
		$("#shBillView").removeClass('fa fa-chevron-down');
		$("#shBillView").addClass('fa fa-chevron-up');
		$("#billText").text('Show Receipt View');	
		
		$("#refundBillDetails").css("height","182px");
		$("#refundBillDetails").css("overflow","auto");		
		
		stActiveTab();
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 12-July-2017
* @codeFor	: save refund receipts
 ************/
function saveRefundBillDetails(callFrom){

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
	//var disNarrtn	= $("#narrSel").val(); 	
	var refRemark	= $("#txtRefRemk").val(); 
	
	var payMode		= $("#payMode").val();
	
	var batchNo		= "";
	var bnumber 	= "";
	var bName		= "";
	
	/*var bnumber		= $("#bnumber").val();
	var batchNo		= $("#newBatchNumber").val();
	var bName		= $("#bName").val();	*/
	
	if(payMode == 0){
		
		alert("Please select payment mode");
		return false;
	}
	
	if(refRemark == ""){
		
		alert("Please fill remark");
		return false;
		$("#txtRefRemk").focus(); 
	}
	
	//var creditFlag	= $("#creditFlag").val();
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
	// add reg  
	/*$('input[id=chkOpdBillReg1]:checked').each(function(){
		
		servIdsChecked.push(regBillId);
	});*/	
	
	/*$('input[name=opdBillCheckbox]:checked').each(function(){
		
		servIdsChecked.push($(this).val());
	});*/
	
	$('input[id=chkOpdBillReg1]:not(:checked)').each(function(){
		
		servIdsChecked.push(regBillId);
	});

	$('input[name=opdBillCheckbox]:not(:checked)').each(function(){
		
		servIdsChecked.push($(this).val());
	});
	
	/*$("#chkOpdBillReg1").prop("disabled",true);
	
	for(var i=1;i<servIdsChecked.length;i++){
		
		$("#chkOpdBill"+servIdsChecked[i]).prop("disabled",true);
	}*/	
	
	/*if(servIdsChecked.length!=0){
		
		alert("please select at least one service");
	}*/
	
	/*if(bnumber== undefined){
		
		bnumber="0";
	}
	if(bName== undefined){
		
		bName="";
	}
	
	if(batchNo== undefined){
		
		batchNo="";
	}
	
	alert(bName);
	alert(bnumber);*/
	var multiPayDetails = {
			listMultiBillReceiptMaster : []
    };
	
	if(payMode==2 || payMode==3){
		
		/*bnumber= $("#batchnumber").val();
		bName= $("#bankID").val();
		batchNo= $("#newBatchNumber").val();*/
		
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
						
		/*var cashAmt=$("#cashAmt").val();
		if(cashAmt>0){
			
			setReceiptList(multiPayDetails,1,0,0,cashAmt);			
		}
		
		var bankIdCredit=$("#bankIdCredit").val();
		var creditBNum=$("#creditBNum").val();
		var creditAmt=$("#creditAmt").val();
		if(creditAmt>0){
			
			setReceiptList(multiPayDetails,2,bankIdCredit,creditBNum,creditAmt);			
		}	
		
		var bankIdCheque=$("#bankIdCheque").val();
		var chequeBNum=$("#chequeBNum").val();
		var chequeAmt=$("#chequeAmt").val();
		if(chequeAmt>0){
			
			setReceiptList(multiPayDetails,3,bankIdCheque,chequeBNum,chequeAmt);			
		}
		
		var bankIdRtgs=$("#bankIdRtgs").val();
		var rtgsBNum=$("#rtgsBNum").val();
		var rtgsAmt=$("#rtgsAmt").val();
		if(rtgsAmt>0){
			
			setReceiptList(multiPayDetails,4,bankIdRtgs,rtgsBNum,rtgsAmt);		
		}*/		
		
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
		url 	: "ehat/bill/saveRefundBillDetails",
		error 	: function() {
					alert('Network Issue!!!');
				  },
		success : function(r) {
			
			if(r>0){
				
				alertify.success("Refund Receipt generated succesfully");
				receiptBillPrint("refund",r);
			}else if(r==-1){
				
				alertify.error("Amount should be less than paid");
			}else if(r==-2){
				
				alertify.error("Receipt is not generated to refund");
			}else{
				
				alertify.error("Network Issue");
			}
			updateBillMasterTotalForOPD();
			resetAll(receiptOf);			
		}
	});
}
}

/************
* @author	: Vinod Udawant
* @date		: 12-July-2017
* @codeFor	: save refund receipts
 ************/
function setRefundable(){
	
	$("#payable").val($("#nowRefunded").text());
	$("#btnPayNow").prop("disabled","true");
	$("#btnRefund").removeAttr('disabled');	
	$("#trDisc").hide();
}

/************
* @author	: Vinod Udawant
* @date		: 18-July-2017
* @codeFor	: Manage Discount
 ************/
function manageDiscount(){
	
	if($("#trDisc").css('display') == 'none'){
		
		$("#trDisc").show();	
		$("#trDiscAmt").show();
		$("#discAuth").show();	
		$("#discNarrtn").show();
		$("#discRemark").show();
		
		$("#discFrom").show();
		
		var refDoctorName = $("#refDoctor").text();
		if(refDoctorName==null || refDoctorName==undefined || refDoctorName==" "){
			$("#discountFrom option[value='RefDoctor']").remove();
			
		}else{
			$("#refDoctorName").text(refDoctorName);
			
		}
		
		
		$("#refAuth").hide();	
		//$("#discNarrtn").hide();
		$("#refRemark").hide();
		
		$("#discountFlag").val(1);
		
	}else{
		
		$("#trDisc").hide();	
		$("#trDiscAmt").hide();
		//$("#discAuth").hide();	
		$("#discNarrtn").hide();
		//$("#discRemark").hide();
		
		$("#discFrom").hide();
		
		$("#discountFlag").val(0);
	}	
	fetchAuthorisedBy(); // added Rohini 
	getAllNarrations();
}

/************
* @author	: Vinod Udawant
* @date		: 18-July-2017
* @codeFor	: Manage Discount
 ************/
function calDiscount(){
	
	var payable=$("#payable").val();
	var disc=$("#discount").val();
	var discAmt=(Number(payable)*Number(disc))/100;
	if(Number(discAmt)>Number(payable)){
		alert("Discount should not be greater than payable");
		$("#discount").val(0);
		$("#discountAmt").val(0);
		$("#payNow").val(0);
	}else{
		
		var nowPay=Number(payable)-Number(discAmt);
		$("#discountAmt").val(parseFloat(discAmt).toFixed(2));
		$("#payNow").val(parseFloat(nowPay).toFixed(2));
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 18-July-2017
* @codeFor	: Manage Discount
 ************/
function calDiscountPer(){
	
	var payable=$("#payable").val();
	var discAmt=$("#discountAmt").val();
	var discPer=(Number(discAmt)/Number(payable))*100;
	if(Number(discAmt)>Number(payable)){
		alert("Discount should not be greater than payable");
		$("#discount").val(0);
		$("#discountAmt").val(0);
		$("#payNow").val(0);
	}else{
		
		var nowPay=Number(payable)-Number(discAmt);
		$("#discount").val(parseFloat(discPer).toFixed(2));
		$("#payNow").val(parseFloat(nowPay).toFixed(2));
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 18-July-2017
* @codeFor	: Manage Discount
 ************/
function resetAll(callFrom){
	setTimeout(function() {			
		$('#perticular').focus();
		$('#perticularIpdSponsor').focus();
		$('#perticularOpdSponsor').focus();
		}, 30);
	
		$("#btnRefund").prop('disabled','true');
	
	//for receipt edit from sponsor tab
		$("#receiptEditSponsor").val(callFrom); 
		$('#perticularOpdSponsor').val('');
		$('#rateOpdSponsor').val('0');
		$('#perticular').val('');
		$('#rate').val('0');

		$("#trDisc").hide();	
		$("#trDiscAmt").hide();
		//$("#discAuth").hide();	
		$("#discNarrtn").hide();
		
		
		$("#discFrom").hide(); 
		
		$("#txtDiscRemk").val("");
		$("#recId").val(0);
		$("#payable").val(0);
		$("#discount").val(0);
		$("#discountAmt").val(0);		
		$("#payNow").val(0);		
		$("#batchnumber").val(0);	
		$("#newBatchNumber").val(0);	
		$("#payMode").val(0);
		$("#discAuthSel").val(0);
		
		
		
		$("#servId").select2(); 
		$('#servId').select2('enable');
		$("#servIdOpdSponsor").val(0); 
		$("#servIdPackage").val(0); 
		$("#specialityId").select2();
		$("#specialityId").select2('val',0);
		
		$("#sndtolabflag").val('N');
		$("#sendToRisId").val('N');
		
		$("#pendingFlag").val("N");
		$("#pendingTreatId").val(0);	
		
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
		
		fetchOpdbilDiscount('opdBill');
		
		if(uiMode=="P"){
			
			getBillReceiptDetails('all');
			getBillAmountDetails(callFrom);
			/*getBillRefundDetails("refund");
			  getBillReceiptDetails('all');			
			  setTotalPaid(callFrom,-1);
			  getCommonAdvc();		
			  fetchAllReceiptTotals("opd"); 
			  fetchPrevPending("onload");
			  fetchAuthorisedBy();
			  getAllPayments();
			  getAllNarrations();*/
			//setTimeout(function(){userAccess();},300);
		}	
		$(".openAllSlave").trigger('click');
		setTimeout(function(){userAccess();},300);
}

/************
* @author	: Vinod Udawant
* @date		: 24-July-2017
* @codeFor	: Print Opd Receipts
 ************/
function receiptBillPrint(callFrom,recId){

    var billId=$("#billNo").text();    
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
           
            if(meeshaFlow == "on"){
               
                window.open("ehat_opd_receipt_meesha.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag);
            }else{
               
                window.open("ehat_opd_receipt.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag);
            }
           
        }else if(deptId==3){
           
            if(meeshaFlow == "on"){
               
                window.open("ehat_digno_receipt_meesha.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag);
            }else{
               
                window.open("ehat_digno_receipt.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag);
            }
           
        }
       
    }else{
       
        if(deptId==1){
           
            if(meeshaFlow == "on"){
               
                window.open("ehat_opd_refund_meesha.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"");
            }else{
               
                window.open("ehat_opd_refund.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"");
            }
           
        }else if(deptId==3){
           
            if(meeshaFlow == "on"){
               
                window.open("ehat_digno_refund_meesha.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"");
            }else{
               
                window.open("ehat_digno_refund.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"");
            }           
        }       
    }   
}

/**
 * @author Bilal
 * @Date 21-july-2017
 * @code for delete from receipt of OPD**/
function deleteMasterReceiptOPD(recId){
	//Added By BILAL For narration of receipt at the time of edit
	/*var narration =$("#deletenarration").val();
	if (narration == "delete") {
		$('#narration').val('deletemaster');
		setnarationpopup();
		return false;
	}
	var narrationid =$('#narrationid').val();
	if (narrationid != "" || narrationid != null || narrationid != undefined) {
		closePopupnarration();
	}
	

	if (narrationid == "" || narrationid == null || narrationid == undefined) {
		narrationid="-";
	}*/
	var idremarkdeletereceipt =$('#idremarkdeletereceipt').val();	
	if(idremarkdeletereceipt == "0" || idremarkdeletereceipt =="undefined"){  // Added Rohini for remark
	
		$('#recId').val(recId);
		setRemarkpopupToDeleteReceipts(); 
		return false;
		}
	
	var r = confirm("Are You Sure You Want To Delete?");
	if (r == true) {
		
		 var remarkdeletereceipt = $('#remarkdeletereceipt').val();
		 
		var idremarkdeletereceipt =$('#idremarkdeletereceipt').val();
		if(remarkdeletereceipt == '' || remarkdeletereceipt == undefined || remarkdeletereceipt == null){
			alert('Please fill remark to cancel service !!!!');
			$('#remarkdeletereceipt').focus();
			return false;
		  }
        
		//if( idremarkdeletereceipt == "1"){
		//	closeRemarkpopupDeleteReceipt();
		//}
		//alert('.........remarkdeletereceipt.....'+remarkdeletereceipt);
		jQuery.ajax({
			type : "POST",
			url : "ehat/doctordesk/deleteMasterReceiptOPD",
			data : {
				"recId" : parseInt(recId),
				"deleteRemark" : remarkdeletereceipt
			},			
			
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				closeRemarkpopupDeleteReceipt();
				alertify.success(response);
				getBillReceiptDetails("all");				
				stActiveTab();
				updateBillMasterTotalForOPD();
			}
		});
	}
}


/************
* @author	: Bilal
* @date		: 21-June-2017
* @codeFor	: Set receipt master template for deleted tab of OPD
 ************/
function setDeletedReceiptTemplate(res,callFrom){
	
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

/**
 * @author Bilal
 * @date 21-JUly-2017
 * @code for reset deleted receipts**/
function resetMasterReceiptOPD(recId) {
	var r = confirm("Are You Sure You Want To Reset?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/doctordesk/resetMasterReceiptOPD",
			data : {
				"recId" : parseInt(recId)
			},
						
			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				$("#deletedReceipt").removeClass("active");
				$("#allReceipt").addClass("active");
				getBillReceiptDetails("all");
				window.location.reload(true);
				//window.location.reload(true);
			}
		});
	}
}

/************
* @author	: Vinod Udawant
* @date		: 26-July-2017
* @codeFor	: Set Total Payable
 ************/
function setTotalPaid(callFrom,serviceId) {

	//alert(callFrom+"  "+serviceId);
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
		url 	: "ehat/bill/getTotalPayable",
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
			
				/*$("#chkOpdBillReg"+servId).removeAttr("disabled");
				$("#chkOpdBillReg"+servId).prop("checked","checked");*/
				
			}		
				
			totPayable=totAmt-totCons;
			$("#payable").val(parseFloat(totPayable).toFixed(2));	
			$("#payNow").val(parseFloat(totPayable).toFixed(2));	
		}
	});
};

/************
* @author	: Vinod Udawant
* @date		: 26-July-2017
* @codeFor	: Set Total Payable
 ************/
function exploreOnClick(callFrom){
	
	$(".openAllSlave").trigger('click');
	/*var curClass=$("#exploreServ").attr('class');
	
	if(curClass=="fa fa-plus"){
		
		$("#exploreServ").removeClass('fa fa-plus');	
		$("#exploreServ").addClass('fa fa-minus');			
		$("#expPerticularLabels").text('Close All');
		
	}else{
		
		$("#exploreServ").removeClass('fa fa-minus');	
		$("#exploreServ").addClass('fa fa-plus');			
		$("#expPerticularLabels").text('Open All');
	}*/	
}

//bank master List...
// @uthor - Sagar 
function getBankMasterList() {
	$('.member').hide();
	$('.member2').hide();
	$('.member3').hide();
	
    jQuery.ajax({
                async : true,
                type : "POST",
                url : "ehat/bill/getBankMasterList",

                success : function(r) {
                	console.log(r);
                	setTempForBanktList(r);//call template
                }
            });
  }
//temp for bank list 
//@uthor - Sagar 
function setTempForBanktList(r) {   
	
	var list = "<option value='0'>-- Select --</option>";    
    for ( var i = 0; i < r.ltBankMaster.length; i++) {    

		list = list + "<option value='"+r.ltBankMaster[i].bankId+"'>" + (r.ltBankMaster[i].bankName) + "</option>";    
	}
    
	$("#bankID").html(list); 
	$("#bankIdCredit").html(list);  
	$("#bankIdCheque").html(list);  
	$("#bankIdRtgs").html(list);
	$(".bankList").html(list);
	 
	$("#bankID1").html(list);   	
}

//hide or show bank name field for billing 
//@uthor - Sagar 
function BankOnSelect(){
	
	var payable=$("#payable").val();	
	//$("#multiPayable").val(payable);
	var multiPayNow=$("#payNow").val();
	$("#multiPayable").val(multiPayNow);	
	var paymode=$("#payMode").val();		
	$("#payNow").removeAttr("readonly");	
	
	if(paymode==2){
		
		getBankMasterList();
		$('#headerTable').find('.member').show();
		$('#headerTable').find('.member2').show();
		$('#headerTable').find('.member3').hide();	
		$('#divForChq').show();
		
	}else if(paymode==3){
		
		getBankMasterList();
		$('#headerTable').find('.member').show();
		$('#headerTable').find('.member2').hide();
		$('#headerTable').find('.member3').show();	
		$('#divForChq').show();		
		
	}else if(paymode==-1){
		
		$("#modal-11").addClass("md-show");
		$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide();
		$('#headerTable').find('.member3').hide();	
		$('#divForChq').hide();
		$("#payNow").prop("readonly",true);	
		getBankMasterList();
		resetMultiPopup();		
		
	}else if(paymode==4){
	
		$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide();
		$('#headerTable').find('.member3').hide();	
		$('#divForChq').hide();
		var payable=$("#payable").val();
		var commnAdvc= $("#finalAdvance").html(); //$("#commnAdvc").text();		
		var payNow=$("#payNow").val();
	
		if(Number(commnAdvc) > 0){
			
			if(Number(commnAdvc)>Number(payable)){
				
				commnAdvc=Number(commnAdvc)-Number(payable);		
				payNow=Number(payable);
				$("#finalAdvance").html(parseFloat(commnAdvc).toFixed(2));
				//$("#commnAdvc").text(commnAdvc);	
				$("#payNow").val(parseFloat(payNow).toFixed(2));	
			}else{
				
				//$("#commnAdvc").text(0);
				$("#finalAdvance").html(0.00);
				payNow=Number(commnAdvc);
				$("#payNow").val(parseFloat(payNow).toFixed(2));
			}	
			
		}else{
			
			alert("Common Advance not available..");
			$("#payMode").val(0);
			return false;
		}	
		
	}else{
		$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide();	
		$('#headerTable').find('.member3').hide();	
		$('#divForChq').hide();
	}
}

/************
* @author	: Vinod Udawant
* @date		: 01-August-2017
* @codeFor	: Get all patients
 ************/
/*function exploreOnClick(callFrom){
	
	$(".openAllSlave").trigger('click');
	var curClass=$("#exploreServ").attr('class');
	
	if(curClass=="fa fa-plus"){
		
		$("#exploreServ").removeClass('fa fa-plus');	
		$("#exploreServ").addClass('fa fa-minus');			
		$("#expPerticularLabels").text('Close All');
		
	}else{
		
		$("#exploreServ").removeClass('fa fa-minus');	
		$("#exploreServ").addClass('fa fa-plus');			
		$("#expPerticularLabels").text('Open All');
	}	
}*/

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
function unitMasterList(){
		
		var ulogin =$("#userName").val();	
		jQuery.ajax({
			
			async : false,
			type : "POST",
			url : "ehat/unit/unitMasterListOnLogin",
			data : { "ulogin" : ulogin	},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
			alert('error');
		},		
		success : function(r) {
				
			setTemplateForUnit(r);	
		}
	});	
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
function setTemplateForUnit(r){
	
	var list="<option></option>";	
	for ( var int = 0; int < r.lstUnit.length; int++) {

		list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
	}	
	$("#bulkUnitId").html(list);
	$("#bulkUnitId").select2({
        placeholder: "Select your unit"
    });
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
function getAllDept() {
    jQuery.ajax({
        async : true,
        type : "POST",
        url : "ehat/dept/viewAllDeptList",
        error : function() {
            alert('error');
        },
        success : function(r) {
            setDeptTemp(r);//call template
        }
    });
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
function setDeptTemp(r) {
	var list = "<option></option>";    
    for ( var i = 0; i < r.lstDepts.length; i++) {    

        list = list + "<option value='"+r.lstDepts[i].deptId+"'>" + (r.lstDepts[i].deptName) + "</option>";    
    }  
    $("#bulkDeptId").html(list);
    $("#bulkDeptId").select2({
        placeholder: "Select your department"
    });
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
function getSponsorRecords(callFrom,sourceTypeId) {
	
	var chargesMasterDto;
	if(callFrom=="sourceid") {
		chargesMasterDto=$("#sourceType").val();
	}else{
		chargesMasterDto=sourceTypeId;		
	}
	//alert(chargesMasterDto);
	jQuery.ajax({
	
		async : true,
		type : "POST",
		data : {
			"chargesMasterDto" : chargesMasterDto
		},
		url : "ehat/registration/fetchSponsorRecords",
		success : function(r) {
 			
			setTemplateForSponsorSelectList(r,callFrom);		
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
function setTemplateForSponsorSelectList(r,callFrom){

	var list="<option></option>";	

	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		if(callFrom==r.lstChargesSlave[int].slaveId){
  			$("#corporate").text(r.lstChargesSlave[int].categoryName);

		} 
		list=list+'<option value="'+(r.lstChargesSlave[int].slaveId)+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		 
	}	
	
	$("#sponsor_select").html(list);	
}



/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
/*function getAllSponsorRecords(callFrom,sourceTypeId) {
	
	var chargesMasterDto;
	if(callFrom=="sourceid") {
		chargesMasterDto=$("#sourceType").val();
	}else{
		
		chargesMasterDto=sourceTypeId;		
	}
	jQuery.ajax({
	
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : chargesMasterDto
		},
		url : "ehat/registration/fetchSponsorRecords",
		success : function(r) {
 			
			setTemplateForSponsor(r,callFrom);	
		}
	});
}*/

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
/*function setTemplateForSponsor(r,callFrom){

	var list="<option></option>";	

	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		if(callFrom==r.lstChargesSlave[int].slaveId){
			$("#corporate").text(r.lstChargesSlave[int].categoryName);

		}
			
		list=list+'<option value="'+(r.lstChargesSlave[int].slaveId)+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';		 	
	}	
	
	$("#sponsor_select").html(list);
	$("#sponsor_select").select2({
        placeholder: "Select your department"
    });
}*/

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Get bill receipt master details
 ************/
function getBulkReceiptDetails(callFrom) {

	var treatmentId	= 1;  
	var billId		= 1;
	
	jQuery.ajax({
		async	: false,
		type	: "POST",		
		data 	: { "treatmentId" : parseInt(treatmentId),"billId" : parseInt(billId), "callFrom" : callFrom },
		url 	: "ehat/bill/getBulkReceiptDetails",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			setBulkTemplate(r,callFrom);					
		}
	});
};

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Set bulk data
 ************/
function setBulkTemplate(r,callFrom) {
	
	var bulkTemp="";
	var totAmt=0;
	var count=0;
	for(var i=0;i<r.listBulkSettlementMultiSpsr.length;i++){	
		
		var billId=r.listBulkSettlementMultiSpsr[i].invoiceCount;
		var mulSponsorId=r.listBulkSettlementMultiSpsr[i].billId;
		//var patId=r.listBulkSettlementMultiSpsr[i].patientId;
		var patId=r.listBulkSettlementMultiSpsr[i].centerPatientId;
		var patientId=r.listBulkSettlementMultiSpsr[i].patientId;

		var depId=r.listBulkSettlementMultiSpsr[i].departmentId;		
		var trId=r.listBulkSettlementMultiSpsr[i].treatmentId;
		var sponId=r.listBulkSettlementMultiSpsr[i].sponsorCatId;		
		var totRemain=r.listBulkSettlementMultiSpsr[i].totalRemain;
		totRemain=parseFloat(totRemain).toFixed(2);
		bulkTemp=bulkTemp+"<tr>"
		+ "<td class='TextFont' style='width: 4%;'>"+(i+1)+"</td>"
		+ "<td class='TextFont' style='width: 12%;'>"+patId+"</td>"
		+ "<td class='TextFont' style='width: '>"+billId+"</td>"
		+ "<td class='TextFont' style='width: 12%;'>"+r.listBulkSettlementMultiSpsr[i].patientName+"</td>"
		+ "<td class='center TextFont' style='width: 8%;text-align: right;'>"+parseFloat(r.listBulkSettlementMultiSpsr[i].totalAmt).toFixed(2)+"</td>"
		+ "<td class='center TextFont' style='width: 7%;text-align: right;'>"+parseFloat(r.listBulkSettlementMultiSpsr[i].totalConcn).toFixed(2)+"</td>"
		+ "<td class='center TextFont' style='width: 7%;text-align: right;'>"+parseFloat(r.listBulkSettlementMultiSpsr[i].totalTds).toFixed(2)+"</td>"
		+ "<td class='center TextFont' style='width: 7%;text-align: right;'>"+parseFloat(r.listBulkSettlementMultiSpsr[i].totalPaid).toFixed(2)+"</td>"		
		+ "<td class='center TextFont' style='width: 8%;text-align: right;' id='tdRem"+mulSponsorId+"'>"+totRemain+"</td>"	
		+ "<td class='center TextFont' style='width: 7%;text-align: right;padding:0'><input type='text' style='text-align: right;padding:0;margin-left: 35%;' id='txtAmt"+mulSponsorId+"' onkeyup='calBulkPayable(this.id);' class='col-md-10 txtAmt' value='0' style='margin-left:20px'></td>"	
		+ "<td class='center TextFont' style='width: 7%;text-align: right;padding:0'><input type='text' style='text-align: right;padding:0;margin-left: 35%;' id='txtDisc"+mulSponsorId+"' onkeyup='calBulkPayable(this.id);' class='col-md-10 txtcon' value='0' style='margin-left:20px'></td>"
		+ "<td class='center TextFont' style='width: 7%;text-align: right;padding:0'><input type='text' style='text-align: right;padding:0;margin-left: 35%;' id='txtTds"+mulSponsorId+"' onkeyup='calBulkPayable(this.id);' class='col-md-10 txtTds' value='0' style='margin-left:20px'></td>"
		+ "<td class='TextFont' style='display:none '>"+mulSponsorId+"</td>"
		/*+ "<td class='center TextFont' style='width: 7%;'><input type='text' id='txtRedn"+patId+"' onkeyup='calBulkPayable(this.id);' class='col-md-10 txtRed' value='0' style='margin-left:20px'></td>"*/
		+ "<td class='TextFont' style='width: 7%;text-align:center'>" 
		+ "<input type='hidden' id='depId"+mulSponsorId+"' value='"+depId+"'>"		
		+ "<input type='hidden' id='patientId"+mulSponsorId+"' value='"+patientId+"'>"		
		+ "<input type='hidden' id='treatId"+mulSponsorId+"' value='"+trId+"'>"		
		+ "<input type='hidden' id='sponsrId"+mulSponsorId+"' value='"+sponId+"'>"		
		+ "<input type='checkbox' style='text-align: right;' id='bulkSlave"+mulSponsorId+"' name='bulkSlave' class='slaveChk' checked value='"+totRemain+"' onclick='distributeConTds()'></td>";
		totAmt=Number(totAmt)+Number(totRemain);
		count++;
	}
		
	$("#unitCount").html(r.listBulkSettlementMultiSpsr.length);
	$("#bulkData").html(bulkTemp);
	
	//var servIdsChecked = [];

	/*$('input[name=bulkSlave]:checked').each(function() {

		servIdsChecked.push($(this).val());
		totAmt=Number(totAmt)+Number($(this).val());
	});*/
	
	$("#payable").val(parseFloat(totAmt).toFixed(2));	
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Set bulk data
 ************/
function setTotalAmtMaster(){
	
	
	if(($('#masterChk').prop("checked") == true)){
		
		$('.slaveChk').prop('checked', true); 
		$(".slaveChk").trigger('onclick');
	}else{
		
		$('.slaveChk').prop('checked', false);  
		$(".slaveChk").trigger('onclick');
	}
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Set bulk data
 ************/
function setTotalAmtSlave(id) {
	
	var rows= $('#bulkTbl tbody tr').length;
	
	
	for(var i=0;i<rows;i++){
		
		var patId=$('#bulkTbl tr:eq('+i+') > td:eq(1)').text();
		
		var a=$("#txtAmt"+patId).val();
		
			if(a==null || isNaN(a) || a == "Infinity" || a == Infinity){
				$("#txtAmt"+patId).val(parseFloat(0.00).toFixed(2));
			}
		var b=$("#txtDisc"+patId).val();
		if(b==null || isNaN(b)){
			$("#txtDisc"+patId).val(parseFloat(0.00).toFixed(2));
		}
		
		var c=$("#txtTds"+patId).val();
		if(c==null || isNaN(c)){
			$("#txtTds"+patId).val(parseFloat(0.00).toFixed(2));
		}		
	}	
	
	
	var totAmt=$("#payable").val();
	totAmt=parseFloat(totAmt).toFixed(2);
	if(($('#'+id).prop("checked") == true)){
		
		var slaveAmt= $("#"+id).val();
		slaveAmt=parseFloat(slaveAmt).toFixed(2);
		totAmt=Number(totAmt)+Number(slaveAmt);
		$('#masterChk').prop('checked', true);
	}else{
		
		var slaveAmt= $("#"+id).val();	
		slaveAmt=parseFloat(slaveAmt).toFixed(2);
		totAmt=Number(totAmt)-Number(slaveAmt);
		$('#masterChk').prop('checked', false);
	}
	
	$("#payable").val(totAmt);
	
	distributeConTds();
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Set bulk data
 ************/
function setTotalRemain(id,totRemain){
		
	
	/*if(($('#masterChk').prop("checked") == true)){
		
		$('.slaveChk').prop('checked', true); 
		$(".slaveChk").trigger('onclick');
	}else{
		
		$('.slaveChk').prop('checked', false);  
		$(".slaveChk").trigger('onclick');
	}*/
}

/************
* @author	: Vinod Udawant
* @date		: 21-June-2017
* @codeFor	: Set bulk data
 ************/
function setTotalDisc(id,totRemain){
	
	var totalRemain=0;
	var totDisc=0;
	var totTds=0;
	
	$("#bulkTbl tr").each(function(){
	       
	    totalRemain=Number(totalRemain) + Number($(this).find('td:eq(5)').html());
	    var patId=$(this).find('td:eq(1)').html();
	    totDisc=Number(totDisc) + Number($("#txtDisc"+patId).val());
	    totTds=Number(totTds) + Number($("#txtTds"+patId).val());	    
	});
	
	var txtDisc=$("#txtDisc"+id).val();
	//var txtTds=$("#txtTds"+id).val();		
	//var totDedcn=Number(txtDisc)+Number(txtTds);
	
	if(txtDisc<=totRemain){
		
		totRemain=Number(totRemain)-Number(txtDisc);
	}else{
		
		alert("Discount should be less than total remain");
		
		$("#txtDisc"+id).val(0);
		$("#txtTds"+id).val(0);
		$("#txtDisc"+id).focus();
		
		totalRemain=0;
		totDisc=0;
		totTds=0;
		
		/*$("#bulkTbl tr").each(function(){
		       
		    totalRemain=Number(totalRemain) + Number($(this).find('td:eq(5)').html());
		    var patId=$(this).find('td:eq(1)').html();
		    totDisc=Number(totDisc) + Number($("#txtDisc"+patId).val());
		    totTds=Number(totTds) + Number($("#txtTds"+patId).val());	    
		});*/
	}	
	//alert(totalRemain +" "+totDisc +" "+totTds);
	
	var totalAmt=Number(totalRemain)-Number(txtDisc*2);
	$("#payable").val(totalAmt);
}

/************
* @author	: Vinod Udawant
* @date		: 16-June-2017
* @codeFor	: Save Bulk data
 ************/
function saveBulkDetails(callFrom) {

	var r = confirm("Are You Sure, You Want Setteled Bills");
	if (r == true) {
		
		var userId		= parseInt($("#userId").val());		
		var payable		= parseFloat($("#payable").val()); 	
		var payNow		= parseFloat($("#payNow").val());	
		var unitId		= parseInt($("#bulkUnitId").val());		
		var depId		= parseInt($("#bulkDeptId").val());	
		var fromDate	= $("#fromDate").val();	
		var lastDate	= $("#lastDate").val();	
		var totTDS 		= $("#totTDS").val();
		var totConcn 	= $("#totConcn").val();
		var gotPay 		= 0;//$("#gotPay").val();
		var payMode 	= $("#payMode").val();
		var bnumber		= "";
		var bName		= "";
		var chqNo		= "";
		var payeeSprlastId	= 0;
		var payeeSprMainId	= 0;
		var payeeTypeId		= 0;//$("#payee").val();
		
		if(isNaN(unitId)){
			
			unitId=0;
		}
		
		if(isNaN(depId)){
			
			depId=0;
		}
		
		var multiPayDetails = {
				listMultiBillReceiptMaster : []
	    };

		var bulkSlaveDetails = {
				listBulkSettlementSlave : []
	    };
		
		/*if(payeeTypeId==2){
			
			var size=$("#dynamicItems li").length;
			payeeSprlastId=$("#lis" + (size - 1)).val();
			payeeSprMainId=$("#lis0").val();
		}
		
		if(payeeSprlastId == undefined){
			
			payeeSprlastId=0;
		}
		if(payeeSprMainId == undefined){
			
			payeeSprMainId=0;
		}*/
		
		if(payMode==3 || payMode==2){
				
			bName= $("#bankID").val();
			bnumber= $("#ifsc").val();
			chqNo= $("#chqNo").val();
			
			debugger;
			
			if(bName == 0 || bName == "" || bName == undefined || bName == null || bName =="null"){
				
				alert("Please Select Bank Name");
				return false;
			}
			
			if(bnumber == "" || bnumber == undefined || bnumber == null || bnumber =="null"){
				
				alert("Please Enter Ifsc Code");
				return false;
			}
			
			if(chqNo == "" || chqNo == undefined || chqNo == null || chqNo =="null"){
				
				alert("Please Enter Cheque No.");
				return false;
			}
			
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
			
			bName= 0;
			bnumber= 0;		
			chqNo= 0;
		}	
		
		/*if(payNow<=0){
			
			alert("Pay now should be greater than zero");
			$("#payNow").val(0);
			$("#payNow").focus();
			return false;
		}*/
		
		if(payable<=0){
			
			alert("Payable should be greater than zero");
			return false;
		}else{
			
			if(payNow > payable){
				
				alert("Amount should be less than payable");
				$("#payNow").val(0);
				$("#payNow").focus();
				return false;
			}else if(payNow < 0){
				
				alert("Amount should be greater than 0");
				$("#payNow").val(0);
				$("#payNow").focus();
				return false;
			}
		}
		 
		var servIdsChecked=[]; 
			
		$('input[name=bulkSlave]:checked').each(function(){
			
			var res = $(this).attr("id").substr(9); 		
			servIdsChecked.push(res);		
		});
		
		var totalPaidAmt=0;
		totTDS = 0;
		totConcn = 0;
		
		// Set bulk slave list start
		$("#bulkTbl tr").each(function(){
		         
			var patId=$(this).find('td:eq(12)').html();
			
			if ($('#bulkSlave'+patId).is(':checked')) {
							
			    var txtAmt=$("#txtAmt"+patId).val();		    
			    var depId=$("#depId"+patId).val();	    
			    var txtDisc=$("#txtDisc"+patId).val();
			    var txtTds=$("#txtTds"+patId).val();
			    
			    totalPaidAmt = Number(totalPaidAmt) + Number(txtAmt);
			    totConcn = Number(totConcn) + Number(txtDisc);
			    totTDS = Number(totTDS) + Number(txtTds);
			    
			    var patientId=$("#patientId"+patId).val();	
			    var treatId=$("#treatId"+patId).val();	
			    var sponsorId=$("#sponsrId"+patId).val();	
			    
			    var txtRedn=0;//$("#txtRedn"+patId).val();	  
			    var remain=Number($(this).find('td:eq(8)').html())-(Number(txtAmt)+Number(txtDisc)+Number(txtTds)+Number(txtRedn));
			    var billTotal=$(this).find('td:eq(4)').html();
			    var billPaid=$(this).find('td:eq(7)').html();
			    var amount= $(this).find('td:eq(8)').html();
			    
				bulkSlaveDetails.listBulkSettlementSlave.push({
					billId		 : patId,
					treatmentId	 : treatId,
					patientId	 : patientId,
					departmentId : depId,
					unitId		 : unitId,
					fromDate	 : fromDate,
					toDate		 : lastDate,
					payMode		 : payMode,
					payeeType	 : payeeTypeId,
					payeeMainId  : payeeSprMainId,
					payeeLeafId  : payeeSprlastId,
					sourceTypeId : 1,
					sponsorCatId : sponsorId,
					bNumber		 : bnumber,
					bName		 : bName,
					chequeNo	 : chqNo,
					billTotal	 : billTotal,
					billPaid	 : billPaid,
					amount		 : amount,
					paidAmt		 : txtAmt,
					concession	 : txtDisc,
					tdsAmt		 : txtTds,			
					redcnAmt	 : txtRedn,		
					remainAmt	 : remain,
					createdBy	 : userId
			    });	
			}	    
		});
		
		// Set bulk slave list end
		
		multiPayDetails = JSON.stringify(multiPayDetails);
		bulkSlaveDetails = JSON.stringify(bulkSlaveDetails);
		
		var inputs = [];	
		inputs.push("fromDate=" + fromDate);
		inputs.push("lastDate=" + lastDate);	
		inputs.push("unitId=" + unitId);
		inputs.push("depId=" + depId);		
		inputs.push("createdBy=" + userId);
		inputs.push("totalAmt=" + payable);
		inputs.push("totTDS=" + totTDS);
		inputs.push("totConcn=" + totConcn);
		inputs.push("totalPaid=" + totalPaidAmt);
		inputs.push("totalRemain=" + payNow);
		inputs.push("payMode=" + payMode);	
		inputs.push("payeeTypeId=" + payeeTypeId);
		inputs.push("payeeSprMainId=" + payeeSprMainId);
		inputs.push("payeeSprlastId=" + payeeSprlastId);
		inputs.push("bNumber=" + bnumber);		
		inputs.push("bName=" + bName);
		inputs.push("chqNo=" + chqNo);
		inputs.push("servIdsChecked=" + servIdsChecked);
		inputs.push("multiPayDetails=" + multiPayDetails);	
		inputs.push("bulkSlaveDetails=" + bulkSlaveDetails);	
		var str = inputs.join('&');	
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data 	: str + "&reqType=AJAX",		
			url 	: "ehat/bill/saveBulkDetails",
			error 	: function() {
						alert('Network Issue!!!');
					  },
			success : function(r) {
				
				if(r>0){
					
					alert("Bill Settled Successfully");
					//setOpdBillMaster(treatmentId);
					window.location.reload(true);
					
				}else{
					
					alertify.error("Network Issue");
				}		
			}
		});		
	}
	
};
/************
* @author	: Vinod Udawant
* @date		: 16-June-2017
* @codeFor	: Set Bulk data
 ************/
function getBulkSearchData(callFrom){
	
 	var letter= $("#byName").val();
	var unitId=$("#bulkUnitId").val();
	var deptId=$("#bulkDeptId").val();
	
	var fromDate=$("#fromDate").val();
	var lastDate=$("#lastDate").val();	
	var sponId=0;	
	
	//For Hall Wise Id  
	var sponsorF = $("#lis1").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems li").length;
	sponsorL = $("#lis" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}	
	if(unitId==""){
		
		unitId=0;
	}
	if(deptId==""){
		
		deptId=0;
	}
	if(sponId==""){
		
		sponId=0;
	}	
	
	var inputs = [];		
	inputs.push("unitId=" + unitId);	
	inputs.push("deptId=" + deptId);	
	inputs.push("sponId=" + sponId);
	inputs.push("callFrom=" + callFrom);
	inputs.push("sponsorF=" + sponsorF);
	inputs.push("sponsorL=" + sponsorL);
	inputs.push("fromDate=" + fromDate);
	inputs.push("lastDate=" + lastDate);
	inputs.push('letter=' + letter);
	
	var str = inputs.join('&');
	jQuery.ajax({
	
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url		: "ehat/bill/getBulkSearchData",
		success : function(r) {
 			
			if(r.listBulkSettlementMultiSpsr.length > 0){
				
				setBulkTemplate(r,callFrom);
				calBulkPayable();
			}else{
				
				alert("Record Not Found");
				$("#bulkData").html("");	
			}				
		}
	});
}
/**@author   :Bilal
 * @date     :17-Aug-2017
 * @code     :for converting services to package **/
function convertToPackageOpd(callfrom,treatmentId){
	
	//alert(treatmentId);
	/*var servIdsChecked=[]; 
    $('input[name=opdBillCheckbox]:checked').each(function(){
		
		servIdsChecked.push($(this).val());
		
	});*/
    
    var inputs = [];
    
	inputs.push("treatmentId=" + treatmentId);
	//inputs.push("servIdsChecked=" + servIdsChecked);	
		
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",		
		url 	: "ehat/billNoble/getlistOfPackageOpd",
		error 	: function() {
					alert('Network Issue!!!');
				  },
		success : function(r) {
			setTempOfPackagesName(r);	
			updateBillMasterTotalForOPD();
			//console.log(r);
			//alertify.success(r);packageDivToConvert
		}
	});
}

/**@author   :Bilal
 * @date     :17-Aug-2017
 * @code     :for setting package name on popups **/
function setTempOfPackagesName(r){
	
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
			    		"onclick='convertToPackage("+billDetailsId+","+subServiceId+","+serviceId+","+treatmentId+")' " 
					+"name='privilegesModify' style='position:relative; left:20%; margin-top:1px'>"
					+ "</td>"
				+ "</tr>" ;
				
			
		index++;
	}

	$("#packageDivToConvert").html(htm);
	
}

/**@author   :Bilal
 * @date     :17-Aug-2017
 * @code     :for converting services to package **/
function convertToPackage(billDetailsId,subServiceId,serviceId,treatmentId){
	
	
	var servIdsChecked=[]; 
    $('input[name=opdBillCheckbox]:checked').each(function(){
		
    	var serViceIdCheck=$(this).val();
    	var sId	= parseInt($("#sId"+serViceIdCheck).text());//added by dayanand for adding profile only  in package except another package
    	if(sId !=13){
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
		url 	: "ehat/billNoble/convertServiceToPackage",
		error 	: function() {
					alert('Network Issue!!!');
				  },
		success : function(r) {
			
			alertify.success(r);
			$("#packToConv").modal('hide');
			
			var sponsorId=$("#chargesSlaveId").val();
			if(sponsorId>0){
						
				$("#sponsorOpd").trigger('click');				
			}else{
							
				resetAll("general");
			}		
		}
	});	
}

/**@author   :Bilal
 * @date     :18-Aug-2017
 * @code     :for Icluding Remaining amount in package **/
function includeAmountInPack() {
	var billDetailsId=$('#billDetailsIdOPD').val();
	var pSubSId =$('#subServiceIdOPD').val();
	var pSId=$('#servIdPackageOPD').val();
	var amount=$('#totalPackageAmount').text();
	var totalAmtPackage =$('#totalAmtPackage').text();
	var totalRemainingPack = parseFloat($('#totalRemainingPack').text());
	var receiptOf  = $("#receiptOf").val();
	
	if (totalRemainingPack > 0) {
	 var inputs = [];
	    
	    inputs.push("pSubSId=" + pSubSId);
		inputs.push("pSId=" + pSId);	
		inputs.push("billDetailsId=" + billDetailsId);
		inputs.push("amount=" + amount);
		inputs.push("totalAmtPackage=" + totalAmtPackage);
		inputs.push("totalRem=" + totalRemainingPack);
		inputs.push("receiptOf=" + receiptOf);
		
		var str = inputs.join('&');	
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data 	: str + "&reqType=AJAX",		
			url 	: "ehat/billNoble/includeInPackAmount",
			error 	: function() {
						alert('Network Issue!!!');
					  },
			success : function(r) {
				
				alertify.success(r);
				$("#pack").modal('hide');
				clearAllFieldsOfOpd();
				//resetAll('sponsor');
				stActiveTab();
				
			}
		});
	}else{
		alert("Their is no Remaining amount to include");
		return false;
	}
}


/************
* @author	: Vinod Udawant
* @date		: 21-August-2017
* @codeFor	: Show sponsor for select
 ************/
function showSponsor(){
	
	var payee=$("#payee").val();
	
	if(payee==2){
		
		$("#trSpon").show();
	}else{
		
		$("#trSpon").hide();
	}
}

/************
* @author	: Vinod Udawant
* @date		: 21-August-2017
* @codeFor	: Show sponsor for select
 ************/
function getAllChargesMasterOpd() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/charges/chargesMasterList",

		success : function(response) {
			multiSelectForChargesOpd(response);
		}
	});

}

/************
* @author	: Vinod Udawant
* @date		: 21-August-2017
* @codeFor	: Show sponsor for select
 ************/
function multiSelectForChargesOpd(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}
	$("#listmstr_select_service").html(list);
}

/************
* @author	: Vinod Udawant
* @date		: 21-August-2017
* @codeFor	: Show sponsor for select
 ************/
function setDyanamicDivForChargesOpd(setDiv, getDiv) {
	// listmstr_select

	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItmes'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForChargesOpd('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lis' + (count) + '" type="hidden" value="' + id
			+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMasterOpd();// for masters
	} else {
		var masterid = $("#lis" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListByIdOpd(masterid, selfId);
		} else {
			selfId = $("#lis" + (liSize - 1)).val();
			fetchChargesSlaveListByIdOpd(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}// now inside submaster catagories

}

/************
* @author	: Vinod Udawant
* @date		: 21-August-2017
* @codeFor	: Show sponsor for select
 ************/
function removeInpuntFildForChargesOpd(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmes' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMasterOpd();
	} else {
		var masterid = $("#lis" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById(masterid, selfId);
		} else {
			selfId = $("#lis" + (liSize - 1)).val();
			fetchChargesSlaveListById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}
}

/************
* @author	: Vinod Udawant
* @date		: 21-August-2017
* @codeFor	: Show sponsor for select
 ************/
function fetchChargesSlaveListByIdOpd(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getChragesSlaveById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		/* "slaveId" : parseInt(slaveId) */

		},
		success : function(response) {
			multiSelectSlaveForChargesOpd(response);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 21-August-2017
* @codeFor	: Show sponsor for select
 ************/
function multiSelectSlaveForChargesOpd(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select_service").html(list);
}

/************
* @author	: Vinod Udawant
* @date		: 21-August-2017
* @codeFor	: Show sponsor for select
 ************/
function getCommonAdvc() {

	var callform="opdBill";
	//var pId=$("#patientId").text();
	var pId = parseInt($("#treatmentId").text());
	//var treatmentId	= parseInt($("#treatmentId").text());	
	
	jQuery.ajax({
		type 	: "POST",
		url 	: "ehat/commanadv/getcommanadvMasterList",
		data	: {	"pID_cID" : pId, "callform" : callform },
		timeout : 1000 * 60 * 5,
		cache 	: false,	
		success : function(response) {

			var totalAdvc=0;
			if(response.lstCommonadv.length > 0){
				
				for(var i=0;i<response.lstCommonadv.length;i++){
					
					totalAdvc=Number(totalAdvc)+Number(response.lstCommonadv[i].remaining_amnt);
				}
				var otherwise=parseFloat(0.00).toFixed(2);
				if(totalAdvc <=0){
					
					$("#finalAdvance").html(otherwise); 
				}else{
					
					$("#finalAdvance").html(parseFloat(totalAdvc).toFixed(2)); 			
				}	
			}					
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 30-August-2017
* @codeFor	: Show sponsor for select
 ************/
function calMultiPayNow(id){
	
	/*var cashAmt=$("#cashAmt").val();
	var creditAmt=$("#creditAmt").val();
	var chequeAmt=$("#chequeAmt").val();
	var rtgsAmt=$("#rtgsAmt").val();
	
	var total=Number(cashAmt)+Number(creditAmt)+Number(chequeAmt)+Number(rtgsAmt);	
	var payable=$("#payable").val();
	var remain=0;
	if(payable>=total){
		
		remain=Number(payable)-Number(total);
	}else{
		
		alert("Amount should be less than payable");
		$("#"+id).val(0);		
	}
	
	cashAmt=$("#cashAmt").val();
	creditAmt=$("#creditAmt").val();
	chequeAmt=$("#chequeAmt").val();
	rtgsAmt=$("#rtgsAmt").val();
	total=Number(cashAmt)+Number(creditAmt)+Number(chequeAmt)+Number(rtgsAmt);	
	$("#multiRemain").val(remain);	
	$("#multiPayNow").val(total);	*/
	var rows= $('#multiPayTable tbody tr.multiPayClass').length;
	
	
	var total=0;
	for(var i=1;i<=rows;i++){
		var cashAmt=$("#txtAmount"+i).val();
		total=Number(total)+Number(cashAmt);
		var payMode=$("#payMode"+i).val();
		/*var finalAdvance=$("#finalAdvance").text();
		if(payMode==4){
			
			if(total > finalAdvance ){
				alert("Common advance not enough to pay bill...");
				$("#"+id).val(0);	
				total=0;
			}
		}*/
		
	}
	
	//var payable=$("#payable").val();
	var payable=$("#multiPayable").val();

	var remain=0;
	if(payable>=total){
		
		remain=Number(payable)-Number(total);
	}else{
		
		alert("Amount should be less than payable");
		$("#"+id).val(0);	
		total=0;
		for(var i=1;i<=rows;i++){
			
			var cashAmt=$("#txtAmount"+i).val();
			total=Number(total)+Number(cashAmt);	
		}
	}
	
	/*cashAmt=$("#cashAmt").val();
	creditAmt=$("#creditAmt").val();
	chequeAmt=$("#chequeAmt").val();
	rtgsAmt=$("#rtgsAmt").val();
	total=Number(cashAmt)+Number(creditAmt)+Number(chequeAmt)+Number(rtgsAmt);	*/
	$("#multiRemain").val(remain);	
	$("#multiPayNow").val(total);	
}

/************
* @author	: Vinod Udawant
* @date		: 30-August-2017
* @codeFor	: Show sponsor for select
 ************/
function setMultiPayNow(){
	
	var multiPayNow=$("#multiPayNow").val();	
	$("#payNow").val(multiPayNow);	
	$("#modal-11").removeClass("md-show");
}

function setMultiPayNowBulk(){
	
	var multiPayNow=$("#multiPayNow").val();	
	$("#gotPay").val(multiPayNow);	
	$("#modal-11").removeClass("md-show");	
	$("#gotPay").trigger('onkeyup');		
}

/************
* @author	: Vinod Udawant
* @date		: 30-August-2017
* @codeFor	: Show sponsor for select
 ************/
function resetMultiPopup(){
	
	var rows= $('#multiPayTable tbody tr.multiPayClass').length;
	
	for(var i=1;i<=rows;i++){
		
		$('#multiTr' + i).remove();
	}
	$("#multiPayNow").val(0);
	$("#multiRemain").val(0);
	setMultipaymodeView(1);		
}

/************
* @author	: Vinod Udawant
* @date		: 1-Sept-2017
* @codeFor	: Show sponsor for select
 ************/
function setComAdvToPayable(){
	
	var payable=$("#payable").val();
	var commnAdvc=$("#commnAdvc").text();
	var payNow=$("#payNow").val();
	
	if(Number(payNow)<Number(payable)){
		
		var addAmt=Number(payable)-Number(payNow);
		commnAdvc=Number(commnAdvc)+Number(addAmt);
		//payNow=Number(payable)+Number(payNow);
		$("#commnAdvc").text(commnAdvc);	
		//$("#payNow").val(payNow);	
	}else{
		
		commnAdvc=Number(commnAdvc)-Number(payable);
		payNow=Number(payable)+Number(payNow);
		$("#commnAdvc").text(commnAdvc);	
		$("#payNow").val(payNow);	
		
		$("#commnAdvc").text(0);
		payNow=Number(payNow)+Number(commnAdvc);
		$("#payNow").val(payNow);
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 18-Sept-2017
* @codeFor	: Set view multipay popup
 ************/
function setMultipaymodeView(id){
		
	var tbody="";
	tbody=tbody	
	+ "<tr class='multiPayClass' id='multiTr"+id+"'>"
	+ "<td><input type='checkbox' id='checkbox"+id+"' name='checkbox' checked='checked'></td>" 
	+ "<td>"
	+ "	<select id='payMode"+id+"' onchange='showHideBank("+id+")' class='form-control input-SmallText' style='width: 100px;'>" 
	/*+ "<option value='1'>Cash</option>"
	+ "<option value='2'>Card</option>"
	+ "<option value='3'>Cheque</option>"*/
	+ "</select>"
	+ "</td>"
	+ "<td><input type='text' style='width: 80px;' id='txtAmount"+id+"' class='form-control input-SmallText' onkeyup='calMultiPayNow(this.id)'>"
	+ "</td>"
	+ "<td>"
	+ "	<select id='bankID"+id+"' class='form-control input-SmallText bankList' style='width: 100px;' disabled></select>"
	+ "</td>"
	+ "<td><input type='text' style='width: 100px;' id='txtbankNo"+id+"' class='form-control input-SmallText' readonly>"
	+ "</td>"
	+ "<td><input type='text' style='width: 100px;'	id='txtaccNo"+id+"' class='form-control input-SmallText' readonly>"
	+ "</td>"
	+ "</tr>";	
	
	$("#multiPayTbody").append(tbody);
	getAllPaymentsOnBilling(id);
	$("#bankID"+id).html($("#bankID").html());
}
//Added By Badrinath
function getAllPaymentsOnBilling(id) {

	jQuery
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/payment/fetchPayList",

				success : function(r) {
					var optionList="<option>---Select---</option>";
					
					for ( var int = 0; int < r.listPay.length; int++) {
						optionList=optionList+"<option value="+r.listPay[int].payId+">"+r.listPay[int].payName+"</option>";
					}
					
					$("#payMode"+id).html(optionList);
				}
			});
}




function showHideBank(id){
	
	var payMode=$("#payMode"+id).val();
	if(payMode==2 || payMode==3){
		
		$("#bankID"+id).prop("disabled",false);
		$("#txtbankNo"+id).prop("readonly",false);
		$("#txtaccNo"+id).prop("readonly",false);		
	}else{
		
		$("#bankID"+id).prop("disabled",true);
		$("#txtbankNo"+id).prop("readonly",true);
		$("#txtaccNo"+id).prop("readonly",true);
		$("#bankID"+id).val(0);
	}
	
	if(payMode==4){
		
		//var finalAdvance=$("#finalAdvance").text();
		//$("#txtAmount"+id).val(finalAdvance);		
		
		/*$('#headerTable').find('.member').hide();  
		$('#headerTable').find('.member2').hide();
		$('#headerTable').find('.member3').hide();	
		$('#divForChq').hide();*/
		var payable=$("#payable").val();
		var commnAdvc= $("#finalAdvance").html(); //$("#commnAdvc").text();		
		var payNow=$("#payNow").val();
		
		if(Number(commnAdvc) > 0){
			
			if(Number(commnAdvc)>Number(payable)){
				
				commnAdvc=Number(commnAdvc)-Number(payable);		
				payNow=Number(payable);
				$("#finalAdvance").html(parseFloat(commnAdvc).toFixed(2));
				//$("#commnAdvc").text(commnAdvc);	
				//$("#payNow").val(parseFloat(payNow).toFixed(2));	
				$("#txtAmount"+id).val(payNow);
			}else{
				
				//$("#commnAdvc").text(0);
				$("#finalAdvance").html(0.00);
				payNow=Number(commnAdvc);
				$("#txtAmount"+id).val(payNow);
				//$("#payNow").val(parseFloat(payNow).toFixed(2));
			}	
		}else{
			
			alert("Common Advance not available..");
			$("#payMode"+id).val(1);
			return false;
		}		
	}
	calMultiPayNow();
}

/************
* @author	: Vinod Udawant
* @date		: 18-Sept-2017
* @codeFor	: Create new row multipay popup
 ************/
function toCreateTr(){
	
	var rows= $('#multiPayTable tbody tr.multiPayClass').length;
	//getBankMasterList();
	setMultipaymodeView(rows+1);	
}

/************
* @author	: Vinod Udawant
* @date		: 18-Sept-2017
* @codeFor	: remove row multipay popup
 ************/
function toRemoveTr(){
	
	var rows= $('#multiPayTable tbody tr.multiPayClass').length;
	$('#multiTr' + rows).remove();
	calMultiPayNow();
}
/************
* @author	: Vinod Udawant
* @date		: 18-Sept-2017
* @codeFor	: Close multipay popup
 ************/
function closePopup(){
	
	$("#modal-11").removeClass("md-show");
	//$("#idForClose").trigger("click");
	
}
function closeBulkPopup(){
	
	$("#modal-11").removeClass("md-show");
	//$("#idForClose").trigger("click");
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function searchDailyCashReport(callF){
	
	var fromDate=$("#fromDate").val();
	var toDate=$("#lastDate").val();
	var a=$('#byName').val();
	var userId = 0;
	if(a==""||a==null||a==undefined){
		 userId = 0;
	}else{
		 userId = parseInt($("#userId").val());
	}
	
	var deptId=parseInt($("#deptId").val());	
	var unitId=1;	
		
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("deptId=" + deptId);
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/bill/getDailyCash",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			if(callF=="hisab"){
				
				setHisabDailyCashReportTemp(r);
			}else if(callF=="hisabRefund"){
				
				setHisabDailyCashReportTemp(r);
			}else{
				
				setSearchDailyCashReportTemp(r);
				setSearchDailyCashReportRefundTemp(r);
			}		
		}
	});
}

function setHisabDailyCashReportTemp(res){
	
	var temp="";
	var totTemp="";
	
	var totcash=0;
	var totcard=0;
	var totcheque=0;
	var totcommonAdvc=0;
	var totmultiple=0;
	var tottotal=0;
	
	for(var i=0;i<res.listBillReceiptMaster.length;i++){
		/*var m=0;
		var x = res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId;*/
		var patName=res.listBillReceiptMaster[i].bName;
		var patientId=res.listBillReceiptMaster[i].patientId;
		//var amt=res.listBillReceiptMaster[i].totalPaid;
		var cash=res.listBillReceiptMaster[i].totalAmt;
		var card=res.listBillReceiptMaster[i].totalPaid;
		var cheque=res.listBillReceiptMaster[i].totalRemain;
		var commonAdvc=res.listBillReceiptMaster[i].totalDisc;
		var multiple=res.listBillReceiptMaster[i].refundAmt;
		var total=Number(cash)+Number(card)+Number(cheque)+Number(commonAdvc)+Number(multiple);
		
		temp=temp+"<tr>" +
				"<td style='height: 21.5px;' class='col-md-1 center'>"+(i+1)+"</td>" +
				"<td style='height: 21.5px;' class='numeric col-md-1 center'>"+patientId+"</td>" +
				"<td style='height: 21.5px;' class='numeric col-md-4'>"+patName+"</td>" +
				/*"<td style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(cash).toFixed(2)+"</td>" +
				"<td style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(card).toFixed(2)+"</td>" +
				"<td style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(cheque).toFixed(2)+"</td>" +
				"<td style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(commonAdvc).toFixed(2)+"</td>" +
				"<td style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(multiple).toFixed(2)+"</td>" +*/
				"<td style='height: 21.5px;' class='numeric col-md-1'>"+parseFloat(total).toFixed(2)+"</td>" +
				"</tr>";
		
		totcash=Number(totcash)+Number(cash);
		totcard=Number(totcard)+Number(card);
		totcheque=Number(totcheque)+Number(cheque);
		totcommonAdvc=Number(totcommonAdvc)+Number(commonAdvc);
		totmultiple=Number(totmultiple)+Number(multiple);
		tottotal=Number(tottotal)+Number(total);
	}
	
	/*totTemp=totTemp+"<tr>" +
	"<th style='height: 21.5px;' class='col-md-1-1 center'>    </th>" +
	"<th style='height: 21.5px;' class='numeric col-md-1-1 center'></th>" +
	"<th style='height: 21.5px;' class='numeric col-md-4-1'>Total</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcash).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcard).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcheque).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcommonAdvc).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totmultiple).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(tottotal).toFixed(2)+"</th>" +
	"</tr>";*/
	
	
	totTemp=totTemp+"<tr>"
	+' <th class="col-md-3 center">'
	+'	<div class="TextFont">'+parseFloat(tottotal).toFixed(2)+'</div>'
	+' </th>'
	+' <th class="col-md-3 center">'
	+'	<div class="TextFont">0</div>'
	+' </th>'
	+' <th class="col-md-3 center">'
	+'	<div class="TextFont">0</div>'
	+' </th>'
	+' <th class="col-md-3 center">'
	+'	<div class="TextFont">'+parseFloat(tottotal).toFixed(2)+'</div>'
	+' </th>'
	+' </tr>';
	
	$("#tableTestVouchar").html(totTemp);	
	$("#container").html(temp);	
}

function postData(){
	
	alert("Data posted succesfully");	
	
	$("#container").empty();
	$("#divTestDashVouchar").empty();
}

function setSearchDailyCashReportTemp(res){
	
	var temp="";	
	var totcash=0;
	var totcard=0;
	var totcheque=0;
	var totcommonAdvc=0;
	var totmultiple=0;
	var totdisc=0;
	var tottotal=0;
	var totRemain=0;
	
	for(var i=0;i<res.listBillReceiptMaster.length;i++){
		/*var m=0;
		var x = res.listBillReceiptMaster[i].listBillReceiptSlave[m].billDetailsId;*/
		var patName=res.listBillReceiptMaster[i].bName;
		var patientId=res.listBillReceiptMaster[i].patientId;
		//var amt=res.listBillReceiptMaster[i].totalPaid;
		var cash=res.listBillReceiptMaster[i].totalAmt;
		var card=res.listBillReceiptMaster[i].totalPaid;
		var cheque=res.listBillReceiptMaster[i].totalRemain;
		var commonAdvc=res.listBillReceiptMaster[i].totalDisc;
		var multiple=res.listBillReceiptMaster[i].refundAmt;
		var disc=res.listBillReceiptMaster[i].actualTotConcn;
		var opdipdno=res.listBillReceiptMaster[i].batchNumber;
		var totalPaid=Number(cash)+Number(card)+Number(cheque)+Number(commonAdvc)+Number(multiple);
		var total=Number(totalPaid)+Number(disc);
		var user = res.listBillReceiptMaster[i].doctorIds;
		var discRemark = res.listBillReceiptMaster[i].discRemark;
		
		var datetime = new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
		
		temp = temp +"<tr> "
					+" <td style='height: 21.5px;width: 40px' >"+(i+1)+"</td> "
					+" <td style='height: 21.5px;width: 65px' >"+patientId+"</td> "																	
					+" <td style='height: 21.5px;width: 150px' >"+patName+"</td> "																		
					+" <td style='height: 21.5px;width: 130px' >"+opdipdno+"</td> "	
					+" <td style='height: 21.5px;width: 75px' >"+datetime+"</td> "					
					+" <td style='height: 21.5px;width: 65px' >"+parseFloat(cash).toFixed(2)+"</td> "	
					+" <td style='height: 21.5px;width: 65px' >"+parseFloat(card).toFixed(2)+"</td> "	
					+" <td style='height: 21.5px;width: 65px' >"+parseFloat(cheque).toFixed(2)+"</td> "		
					+" <td style='height: 21.5px;width: 65px' >"+parseFloat(commonAdvc).toFixed(2)+"</td> "	
					+" <td style='height: 21.5px;width: 65px' >"+parseFloat(multiple).toFixed(2)+"</td> "	
					+" <td style='height: 21.5px;width: 65px' >"+parseFloat(totalPaid).toFixed(2)+"</td> "	
					+" <td style='height: 21.5px;width: 65px' >"+parseFloat(disc).toFixed(2)+"</td> "	
					/*+" <td style='height: 21.5px;width: 65px' >"+parseFloat(total).toFixed(2)+"</td> " */
					+" <td style='height: 21.5px;width: 200px' >"+user+"</td> "	
					+" <td style='height: 21.5px;width:	150px' >"+discRemark+"</td> "																																																		
				+"</tr> ";
		
		totcash=Number(totcash)+Number(cash);
		totcard=Number(totcard)+Number(card);
		totcheque=Number(totcheque)+Number(cheque);
		totcommonAdvc=Number(totcommonAdvc)+Number(commonAdvc);
		totmultiple=Number(totmultiple)+Number(multiple);
		totdisc = Number(totdisc)+Number(disc);
		tottotal=Number(tottotal)+Number(total);
	}
	
	$("#cashTot").html(parseFloat(totcash).toFixed(2));
	$("#cardTot").html(parseFloat(totcard).toFixed(2));
	$("#chequeTot").html(parseFloat(totcheque).toFixed(2));
	$("#cadvanceTot").html(parseFloat(totcommonAdvc).toFixed(2));
	$("#multiTot").html(parseFloat(totmultiple).toFixed(2));	
	$("#totalTot").html(parseFloat(tottotal).toFixed(2));
	$("#totalDisc").html(parseFloat(totdisc).toFixed(2));
	
	totRemain = Number(tottotal) - Number(totdisc);	
	
	$("#totalRemain").html(parseFloat(totRemain).toFixed(2));	
	$("#container").html(temp);
	
}

function setSearchDailyCashReportRefundTemp(res){
	
	var temp="";
	
	var totcash=0;
	var totcard=0;
	var totcheque=0;
	var totcommonAdvc=0;
	var totmultiple=0;
	var tottotal=0;
	
	for(var i=0;i<res.listBillRefundMaster.length;i++){
		/*var m=0;
		var x = res.listBillRefundMaster[i].listBillReceiptSlave[m].billDetailsId;*/
		var patName=res.listBillRefundMaster[i].bName;
		var patientId=res.listBillRefundMaster[i].patientId;
		//var amt=res.listBillRefundMaster[i].totalPaid;
		var cash=res.listBillRefundMaster[i].totalAmt;
		var card=res.listBillRefundMaster[i].totalPaid;
		var cheque=res.listBillRefundMaster[i].totalRemain;
		var commonAdvc=res.listBillRefundMaster[i].totalDisc;
		var multiple=res.listBillRefundMaster[i].totalQty;
		var total=Number(cash)+Number(card)+Number(cheque)+Number(commonAdvc)+Number(multiple);		
		var datetime = new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
		var opdipdno=res.listBillReceiptMaster[i].batchNumber;
		var user = res.listBillRefundMaster[i].doctorIds;
		var discRemark = res.listBillRefundMaster[i].refRemark;
		temp=temp+"<tr>" +
				"<td style='height: 21.5px;width: 40px' >"+(i+1)+"</td>" +
				"<td style='height: 21.5px;width: 65px'>"+patientId+"</td>" +
				"<td style='height: 21.5px;width: 150px'>"+patName+"</td>" +
				"<td style='height: 21.5px;width: 130px'>"+opdipdno+"</td>" +
				"<td style='height: 21.5px;width: 75px'>"+datetime+"</td>" +
				"<td style='height: 21.5px;width: 65px'>"+parseFloat(cash).toFixed(2)+"</td>" +
				"<td style='height: 21.5px;width: 65px'>"+parseFloat(card).toFixed(2)+"</td>" +
				"<td style='height: 21.5px;width: 65px'>"+parseFloat(cheque).toFixed(2)+"</td>" +
				"<td style='height: 21.5px;width: 65px'>"+parseFloat(commonAdvc).toFixed(2)+"</td>" +
				/*"<td style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(multiple).toFixed(2)+"</td>" +*/
				"<td style='height: 21.5px;width: 65px'>"+parseFloat(total).toFixed(2)+"</td>" +
				"<td style='height: 21.5px;width: 200px'>"+user+"</td>" +
				"<td style='height: 21.5px;width: 150px'>"+discRemark+"</td>" +

				"</tr>";
		
		totcash=Number(totcash)+Number(cash);
		totcard=Number(totcard)+Number(card);
		totcheque=Number(totcheque)+Number(cheque);
		totcommonAdvc=Number(totcommonAdvc)+Number(commonAdvc);
		totmultiple=Number(totmultiple)+Number(multiple);
		tottotal=Number(tottotal)+Number(total);
	}
	
	$("#cashTotRef").html(parseFloat(totcash).toFixed(2));
	$("#cardTotRef").html(parseFloat(totcard).toFixed(2));
	$("#chequeTotRef").html(parseFloat(totcheque).toFixed(2));
	$("#cadvanceTotRef").html(parseFloat(totcommonAdvc).toFixed(2));
	$("#multiTotRef").html(parseFloat(totmultiple).toFixed(2));
	$("#totalTotRef").html(parseFloat(tottotal).toFixed(2));
	
	var cashTot  = $("#cashTot").html();
	var cardTot  = $("#cardTot").html();
	var chequeTot  = $("#chequeTot").html();
	var cadvanceTot  = $("#cadvanceTot").html();
	var multiTot  = $("#multiTot").html();
	
	var cashInHand = Number(cashTot) - Number(totcash);
	if(cashInHand < 0){
		
		cashInHand = 0;
	}
	
	var cardInHand = Number(cardTot) - Number(totcard);
	if(cardInHand < 0){
		
		cardInHand = 0;
	}
	
	var chequeInHand = Number(chequeTot) - Number(totcheque);
	if(chequeInHand < 0){
		
		chequeInHand = 0;
	}
	
	var cAdvcInHand = Number(cadvanceTot) - Number(totcommonAdvc);
	if(cAdvcInHand < 0){
		
		cAdvcInHand = 0;
	}
	
	var multiInHand = Number(multiTot) - Number(totmultiple);
	if(multiInHand < 0){
		
		multiInHand = 0;
	}
	
	var totalCash=$("#totalTot").html();
	var totalAmountInHand=Number(totalCash)-Number(tottotal);
	if(totalAmountInHand < 0){
		
		totalAmountInHand=0;
	}
	
	var totalDiscInHand=$("#totalDisc").html();	
	if(totalDiscInHand < 0){
		
		totalDiscInHand=0;
	}
	
	var finalAmount=Number(totalCash)-Number(totalDiscInHand); 
	var finalTotalInHand=(finalAmount)-Number(tottotal);
	if(finalTotalInHand < 0){
		
		finalTotalInHand=0;
	}	
	
	$("#cashTotInHand").html(parseFloat(cashInHand).toFixed(2));
	$("#cardTotInHand").html(parseFloat(cardInHand).toFixed(2));
	$("#chequeTotInHand").html(parseFloat(chequeInHand).toFixed(2));
	$("#cadvanceTotInHand").html(parseFloat(cAdvcInHand).toFixed(2));
	$("#multiTotInHand").html(parseFloat(multiInHand).toFixed(2));
	$("#totalTotInHand").html(parseFloat(totalAmountInHand).toFixed(2));
	$("#totalDiscInHand").html(parseFloat(totalDiscInHand).toFixed(2));
	$("#finalTotInHand").html(parseFloat(finalTotalInHand).toFixed(2));
		
	$("#containerRef").html(temp);	
	
}

function printData(){
  
   var divToPrint=document.getElementById("tblReport");
   newWin= window.open("");
   newWin.document.write(divToPrint.outerHTML);
   newWin.print();
   newWin.close();
}


function setAutoPatientName(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var autoType = '';
	var auto = '';
	if (callFrom == "IPD_OPD_PatientDatabase") {
		auto = 'PatientName';
	} else if (callFrom == "OPDOldPatientDatabase") {
		auto = 'OPDManagementPatient';
	} else if (callFrom == "IPD_BedWardPatientDatabase") {
		auto = 'ipdbedward';
	} else if (callFrom == "IPD_OldPatientDatabase") {
		auto = 'ipdPatient';
	} else if (callFrom == "IPD_Bill_PatientDatabase") {
		auto = 'IPDBillPatient';
	} else if (callFrom == "Diagno_PatientBillDatabase") {
		auto = 'DigonosticPatient';
	} else if (callFrom == "MarkVisit_Database") {
		auto = 'MarkVisitPatient';
	} else if (callFrom == "previousOPDbill") {
		auto = 'PreviousOPDBillPatient';
	} else if (callFrom == "IPD_AdvanceDatabase") {
		auto = 'IPDAdvance';
	} else if (callFrom == "Consentform_Database") {
		auto = 'Consentform';
	} else if (callFrom == "Manage_ReferenceDatabase") {
		auto = 'Manage_Reference';
	} else if (callFrom == "OPDDoctorDesk_Dashboard") {
		auto = 'OPDDoctorDesk';
		autoType = inputID.substring(5);
	} else if (callFrom == "OperationDashboard") {
		auto = 'ManageOperationPatient';
	} else if (callFrom == "OperationSummaryDashboard") {
		auto = 'previousOperation';
	} else if (callFrom == "prevIPD_BillDatabase") {
		auto = 'preIPDBillPatient';
		autoType = 'g';
	} else if (callFrom == "BillingRegister") {
		auto = 'preIPDBillPatient';
		autoType = 'c';
	} else if (callFrom == "Pharmacy_Invoice") {
		auto = 'ipdPatient';
	} else if (callFrom == "CardioAssignTestPatientDatabase") {
		auto = 'CardiologyAssignPatient';
		// Auto Suggetion for Admin Model
	} else if (callFrom == "UserMgmt_Database"
			|| callFrom == "User_Access_Mgmt" || callFrom == "HRMgmt_Database") {
		auto = 'UserName';
	} else if (callFrom == "HallType_Management") {
		auto = 'HallTypeName';
	} else if (callFrom == "BedWard_Management") {
		auto = 'HallName';
	} else if (callFrom == "ChartMgmt_Database") {
		auto = 'ChartName';
	} else if (callFrom == "PhysiotherapyTest") {
		auto = 'PhysioTestName';
	} else if (callFrom == "DentalService_Database") {
		auto = 'DentalService';
	} else if (callFrom == "CasualityService_Database") {
		auto = 'CasualityTestName';
	} else if (callFrom == "OTandIPDservice_Database") {
		auto = 'IpdService';
		testType = $("#testType").val();
		if (testType == "bed") {
			autoType = 'b';
		} else if (testType == "gas") {
			autoType = 'g';
		} else if (testType == "instrument") {
			autoType = 'i';
		}
	} else if (callFrom == "NursingStation_BedSideProcedures") {
		auto = 'IpdService';
		autoType = 'b';
	} else if (callFrom == "NursingStation_GasesMonitors") {
		auto = 'IpdService';
		autoType = 'g';
	} else if (callFrom == "NursingStation_Instruments") {
		auto = 'IpdService';
		autoType = 'i';
	} else if (callFrom == "InvestigationTest") {
		auto = 'Investigation_Test';
	} else if (callFrom == "InvestigationTestGroup") {
		auto = 'Invest_Test_Group';
	} else if (callFrom == "InvestigationBodyPart") {
		auto = 'Invest_Body_Part';
	} else if (callFrom == "prev_databaseForConsentForm") {
		auto = 'prev_databaseForConsentForm';
	} else if (callFrom == "OPD_Appoinment") {
		auto = 'PatientName';
	} else if (callFrom == "Previous_ManualSummary") {
		auto = 'Previous_ManualSummary';
	} else if (callFrom == "Previous_AutoSummary") {
		auto = 'Previous_AutoSummary';
	}else if (callFrom == "Medicine") {
		auto = 'medicine';
	}else if (callFrom == "PreOperativeCheckListMasterDetails") {
		auto = 'PreOperativeCheckList';
	}else if (callFrom == "OTOperationAction") {
		auto = 'PreOperativeCheckList';
	}else if (callFrom == "PreviousDiagno_PatientBillDatabase") {
		auto = 'PreviousDiagno_PatientBillDatabase';
	}else if (callFrom == "ShowTopPatForCertificate") {
		auto = 'ShowTopPatForCertificate';
	}else if (callFrom == "OtherServicesCharges") {
		auto = 'OtherServicesCharges';
	}else if (callFrom == "Anaesthetist_Fee_Management") {
		auto = 'Anaesthetist_Fee_Management';
	}else if (callFrom == "Anaesthetist_Fee_Management") {
		auto = 'Anaesthetist_Fee_Management';
	}else if (callFrom == "Pre-Anaesthetic_Assessment") {
		auto = 'Pre-Anaesthetic_Assessment';
	}//Tushar Code For Visiting Doctor Fee @ 1Feb2017
	else if (callFrom == "Visiting_Doc_Fee_Management") {
		auto = 'Visiting_Doc_Fee_Management';
	}//Tushar Code For Medication Route Master @ 13Feb2017
	else if (callFrom == "routeMaster") {
		auto = 'routeMaster';
	}
	
	/*
	 * else if (callFrom == "OPD_Appoinment") { //alert("in OPDAppoinment's
	 * condition "); auto = 'AutoPatientNameforAppointment'; }
	 */

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = r;//decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					setTimeout(function() {
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);

					/*
					 * if($("#" + inputID).val() == ""){
					 * $(".typeahead").click(function(e) { e.stopPropagation(); //
					 * This is the preferred method. return false; // This
					 * should not be used unless you do not want }); }
					 */
				}
			});
	function displayResult(item) {
		
		$("#" + inputID).val((item.text).trim());
		//@author : Touheed Khan
		//for channeling doctor in Motivator
		$("#txtDoctorId").val((item.value).trim());
		$("#userId").val((item.value).trim());
		//@author : Amol Saware
		//for search user in HR module 
		/*var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
		if(currentPage=="HRManagement"){
			searchViewUser('HRDashBoard');
		}*/
	}

}

function getUserDetailsByName(inputID) {
	var resultData = [];
	var username=$("input#"+inputID).val();
	var inputs = [];
	inputs.push('userName=' + username);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/users/getUsersListByUserName",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			var availableTags = [];
			if (response.length == 50) {
				alert("NO MATCHING FOUND");

			} else {
				var template = "";
				for ( var j = 0; j < response.usersList.length; j++) {
					var arrValue = response.usersList[j].userid +"-"+response.usersList[j].user_Name+" "+response.usersList[j].l_name;
					var idValue = response.usersList[j].userid;
					var labProfile = response.usersList[j].user_Name+" "+response.usersList[j].l_name;
					var lName = response.usersList[j].l_name;
					resultData.push({
						ID : idValue,
						Name : labProfile,
						LName : lName
					});
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue + '</a></li>';
				}

				setTimeout(function() {
					// $("#div" + inputID + " .typeahead").html("");
					$("#div" + inputID + " .typeahead").html(template);

					if (onload != "onload") {
						$("#div" + inputID + " .typeahead").show();
					}
					$("#" + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("#" + inputID).data('typeahead').source = resultData;
				}, 500);
			}
			}
		});
		function displayResult(item) {
			
			$("#" + inputID).val((item.text).trim());
			//@author : Touheed Khan
			//for channeling doctor in Motivator
			$("#txtDoctorId").val((item.value).trim());
			$("#userId").val((item.value).trim());
			//@author : Amol Saware
			//for search user in HR module 
			/*var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			if(currentPage=="HRManagement"){
				searchViewUser('HRDashBoard');
			}*/
		}
	}

function setUserInputReadonly(){
	
	var userType = $("#userType").val();
	
	if(userType=="Admin" || userType=="admin"){
		
		$("#byUName").removeAttr("readonly");
	}else{
		
		$("#byUName").prop("readonly","true");
	}	
}


function getDailyCashPdf(){
	var isPharmacy="";
	
	if ($('#idPharmacy').is(':checked')) {
		isPharmacy="Yes";
	}else{
		isPharmacy="No";
	}
	
	var fromDate=($("#fromDate").val()).split("/");
	var fDate = (fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);  // added by sandip
	var toDate=($("#lastDate").val()).split("/");
	var tDate = (toDate[2] + "-" + toDate[1] + "-" + toDate[0]);
	var userId=$("#userId").val();
	var deptId=$("#deptId").val();
	window.open("ehat_daily_cash_pdf.jsp?fromDate="+fDate+"&toDate="+tDate+"&userId="+userId+"&deptId="+deptId+"&isPharmacy="+isPharmacy);
}
/*******
 * @author    :BILAL
 * @Date      :30-10-2017
 * @Code      :For Package print of OPD
 * ******/
function printopdpackage(packageServId,packageSubSerid,billDetailsId,callFrom,amount, concession){

	var treatmentId=$('#treatmentId').text();
	var patientId=$('#patientId').text();
	var sponsorId = $("#SponsorsourceTypeId").val();
    var chargesSlaveId = $("#chargesSlaveId").val();
    //alert(treatmentId+""+patientId+""+sponsorId+""+chargesSlaveId);
	window.open("opdpackageprint.jsp?treatmentId=" + treatmentId
			+ "&patientId=" + encodeURIComponent(patientId)
			+ "&psId=" + encodeURIComponent(packageServId)
			+ "&pSubSId=" + encodeURIComponent(packageSubSerid)
			+ "&billDetailsId=" + billDetailsId
			+ "&sponsorId=" + sponsorId
			+ "&chargesSlaveId=" + chargesSlaveId
			+ "&callFrom=" + callFrom
			);
}

/*******
 * @author    :BILAL
 * @Date      :31-10-2017
 * @Code      :For Convertting OPD patient Bill To IPD 
 * ******/
function ConvertToIpd(treatmentid){	
	
	var patientId = $("#patientId").text();
	//first clossing the treatment of the patient
	jQuery.ajax({
		type 	: "POST",
		url  	: "ehat/billNoble/closetreatment",
		data 	: { "treatmentId" : treatmentid	},	     
		error	: function() { alert('error'); },
		success : function(response) {
		     	
			$("#queryType").val('markvisit');
			getPatientRecords(patientId,treatmentid);
		}
	});
		
	/*jQuery.ajax({
		type : "POST",
		url : "ehat/registration/gettreatment",
		data : {
			"treatmentId" : treatmentid
		},

		error : function() {
			alert('error');
		},
		success : function(response) {
			console.log(response);
			getPatientRecords(patientId,response);
		}
	});*/
		//$("#queryType").val('markvisit');
		
		
}
/*******
 * @author    :BILAL
 * @Date      :31-10-2017
 * @Code      :For Convertting OPD patient Bill To IPD 
 * ******/
function getPatientRecords(patientId,treatmentid){

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"patientId" :patientId
		},
		url : "ehat/registration/getPatientRecordsbypatientId",
		success : function(r) {
			
			ConvertToIpdBillingNew(r,treatmentid);
		}
	});
}

function ConvertToIpdBillingNew(r,treatmentid){
	
	var queryType = "markvisit";
	var departmentId = 2;
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var oldPatientId = 0;//$('#oldPatientId').val();
	var res=0;
	// Patient info
	var patInfo = r.listReg[0];
	
	// Patient treatment info
	var treatLen = r.listReg[0].listTreatment.length;
	var treatInfo = r.listReg[0].listTreatment[treatLen - 1];
	
	// Patient bill info
	var billInfo = treatInfo.listBill[0];
	
	var sourceTypeId = billInfo.sponsorId;
	
	var multipleSponsor = null;
	if(sourceTypeId > 0){
		
		var multiSpInfo = treatInfo.listMultipleSponsor[0];
		
		multipleSponsor = {
			
			departmentId : departmentId,
			diseToBeTreat : multiSpInfo.diseToBeTreat,
			empid : multiSpInfo.empid,
			ipdOrOpd : multiSpInfo.ipdOrOpd,
			neisNo : multiSpInfo.neisNo,
			sactionOrdNo : multiSpInfo.sactionOrdNo,
			sanctionAmt : multiSpInfo.sanctionAmt,
			sponsorId : 1,
			chargesSlaveId : billInfo.sponsorId,
			tpaid : multiSpInfo.tpaid,
			treatPermited : multiSpInfo.treatPermited,
			validUpToDate : multiSpInfo.validUpToDate,
			visitNo : multiSpInfo.visitNo,
			remSanctionAmt : 0,
			refDate : multiSpInfo.refDate,
			createdBy:userId,
			updatedBy:userId,
			unitId : unitId
		}
	}
	var payResObj = null;
	if(patInfo.listPayRes.length > 0){
		
		var payResInfo = treatInfo.listPayRes[0];
		
		payResObj = {

			payResId : 0,
			prefix2 : payResInfo.prefix2,
			payResFName : payResInfo.payResFName,
			payResMName : payResInfo.payResMName,
			payResLName : payResInfo.payResLName,
			payResgender : payResInfo.payResgender,
			payResmobile : payResInfo.payResmobile,
			payResmobile : payResInfo.payResmobile,
			payResAddressText : payResInfo.payResAddressText,
			relation : payResInfo.relation,
			departmentId: departmentId,
			payResAdharNo: payResInfo.payResAdharNo,
			createdBy : userId,
			updatedBy : userId,
			unitId : unitId
		};
	}
	
	var mlcDetailsObj = null;
	if(patInfo.listMlcDetails.length > 0){
		
		var mlcInfo = patInfo.listMlcDetails[0];
		
		mlcDetailsObj = {
				
			mlcId : 0,
			mlcNo : mlcInfo.mlcNo,
			firNo : mlcInfo.firNo,
			authorityName : mlcInfo.authorityName,
			mlcFirstName : mlcInfo.mlcFirstName,
			mlcLastName : mlcInfo.mlcLastName,
			mlcCmoDoctor : mlcInfo.mlcCmoDoctor2,
			buccleNo : mlcInfo.buccleNo,
			plStname : mlcInfo.plStname,
			mlcGender : mlcInfo.mlcGender,
			mlcMobile: mlcInfo.mlcMobile,
			mlcEmail: mlcInfo.mlcEmail,
			mlcPlAddess: mlcInfo.mlcPlAddess,
			mlcAge: mlcInfo.mlcAge,
			mlcRelation: mlcInfo.mlcRelation,
			mlcAddressText: mlcInfo.mlcAddressText,
			incidentDetails: mlcInfo.incidentDetails,
			mlcDate: mlcInfo.mlcDate,
			prefix3: mlcInfo.prefix3,
			mlc_flag: mlcInfo.mlc_flag,
			createdBy : userId,
			updatedBy : userId,
			unitId : unitId
		};
	}
	
	var collectionDate = $("#collectionDate").val();
	var collectionTime = $("#collectionTime").val();
	
	var treatmentObj = {

		treatmentId : 0,
		departmentId : departmentId,
		token : treatInfo.token,
		tFlag : 'Y',
		doctorIdList : treatInfo.doctorIdList,
		specialityId : treatInfo.specialityId,
		unitId : treatInfo.unitId,
		refDocId : treatInfo.refDocId,
		refDocName : treatInfo.refDocId,
		weight : treatInfo.weight,
		height : treatInfo.height,
		BMI : treatInfo.BMI,
		BSA : treatInfo.BSA,
		HCIM : treatInfo.HCIM,
		empid: treatInfo.empid,
		tpaid: treatInfo.tpaid,
		caseType : treatInfo.caseType,
		reqGenFormId : treatInfo.reqGenFormId,
		referredBy : treatInfo.referredBy,
		referredSource : treatInfo.referredSource,
		referredSourceSlave : treatInfo.referredSourceSlave,
		referredSourceDocId : treatInfo.referredSourceDocId,
		refDate : treatInfo.refDate,
		sponsorId : treatInfo.sponsorId,
		sanctionAmt : treatInfo.sanctionAmt,
		sactionOrdNo : treatInfo.sactionOrdNo,
		neisNo : treatInfo.neisNo,
		visitNo : treatInfo.visitNo,
		ipdOrOpd : treatInfo.ipdOrOpd,
		validUpToDate : treatInfo.validUpToDate,
		treatPermited : treatInfo.treatPermited,
		diseToBeTreat : treatInfo.diseToBeTreat,
		admissionDateTime : treatInfo.admissionDateTime,
		reasonofvisit: treatInfo.reasonofvst,
		createdBy : userId,
		updatedBy : userId,
		casualityFlag : treatInfo.casualityFlag,
		organDonarFlag : treatInfo.organDonarFlag,
		collectionDate : collectionDate,
		collectionTime : collectionTime,
		ivfTreatFlag: treatInfo.ivfTreatFlag
		//listPayRes : [payResObj],
		//listMlcDetails : [mlcDetailsObj]
	};
		
	var billObj = {
		
		billId : 0,
		sourceTypeId : billInfo.sourceTypeId,
		departmentId : departmentId,
		unitId : unitId,
		patientCatId : billInfo.patientCatId,
		sponsorCatId : billInfo.sponsorCatId,
		count : billInfo.count,
		sponsorId : billInfo.sponsorId,
		invoiceCount : 0,
		invoiceFlag : 'N',
		createdBy : userId,
		updatedBy : userId
		
		//listPayRes : [payResObj],
		//listMlcDetails : [mlcDetailsObj]
	};
	
	//======= Set Master Object For Registration ======//
	var patientObj = {
		patientId : patInfo.patientId,
		prefix : patInfo.prefix,
		fName : patInfo.fName.toUpperCase(),
		mName : patInfo.mName.toUpperCase(),
		lName : patInfo.lName.toUpperCase(),
		gender : patInfo.gender,
		mobile : patInfo.mobile,
		dob : patInfo.dob,
		age : patInfo.age,
		ageMonths : patInfo.ageMonths,
		ageDays : patInfo.ageDays,
		talukaId : patInfo.talukaId,
		townId : patInfo.townId,
		districtId : patInfo.districtId,
		stateId : patInfo.stateId,
		countryId : patInfo.countryId,
		areaCode : patInfo.areaCode,
		address : patInfo.address,
		perAddress : patInfo.perAddress,
		pertalukaId : patInfo.pertalukaId,
		pertownId : patInfo.pertownId,
		perdistrictId : patInfo.perdistrictId,
		perstateId : patInfo.perstateId,
		percountryId : patInfo.percountryId,
		perareaCode : patInfo.perareaCode,
		unitId : unitId,
		adharcardNo : patInfo.adharcardNo,
		transSMS : patInfo.transSMS,
		transEmail : patInfo.transEmail,
		pramoEmail : patInfo.pramoEmail,
		pramoSMS : patInfo.pramoSMS,
		emergency : patInfo.emergency,
		external : patInfo.external,
		mrnno : patInfo.mrnno,
		address : patInfo.address,
		imageName : patInfo.imageName,
		aadharImageName : patInfo.aadharImageName,
		passport : patInfo.passport,
		visa : patInfo.visa,
		relationId : patInfo.relationId,
		relativeName : patInfo.relativeName,
		perAddress : patInfo.perAddress,
		pertalukaId : patInfo.pertalukaId,
		pertownId : patInfo.pertownId,
		perdistrictId : patInfo.perdistrictId,
		perstateId : patInfo.perstateId,
		percountryId : patInfo.percountryId,
		perareaCode : patInfo.perareaCode,
		oldPatientId : patInfo.oldPatientId,
		emailId : patInfo.emailId,
		maritalStatusId : patInfo.maritalStatusId,
		nationalityId : patInfo.nationalityId,
		religionId : patInfo.religionId,
		languageId : patInfo.languageId,
		bloodGroupId : patInfo.bloodGroupId,
		identityProofId : patInfo.identityProofId,
		identificationNumber : patInfo.indentificationNumber,
		annualIncomeId : patInfo.annualIncomeId,
		occupation : patInfo.occupation,
		education : patInfo.education,
		createdBy : userId,
		updatedBy : userId,
		queryType : queryType,
		organDonarFlag : patInfo.organDonarFlag,
		patientApId : patInfo.patientApId,
		ivfTreatFlag : patInfo.ivfTreatFlag,
		listTreatment : [treatmentObj],
		listBill : [billObj],
		listMultipleSponsor : [],
		listPayRes : [],
		listMlcDetails : []
	};
	
	if(sourceTypeId > 0){
		
		patientObj['listMultipleSponsor'].push(multipleSponsor);
	}
	
	if(patInfo.listPayRes.length > 0){
	
		patientObj['listPayRes'].push(payResObj);
	}
	
	if(patInfo.listMlcDetails.length > 0){
		
		patientObj['listMlcDetails'].push(mlcDetailsObj);
	}
	//======= Set Master Object For Registration ======//
 	
	$.ajax({
		async 		: false,
        url			: 'ehat/register/savePatientDetails1',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(patientObj),
        contentType	: 'application/json',
        error 		: function() { alertify.error('Network Issue!!!'); },
        success		: function (r) {
			
			$('#pleaseWait').hide();
			if(queryType == "insert" && r > 0){
				
				alertify.success("Registered Successfully!!!");
				$('#queryType').val("insert");
				//To Generate BarCode
				generateBarcodePrint2(r,"reg");
				if(departmentId == 2){//for ipd
					window.location = "ipd_queue.jsp";
				}else{//opd,er or diag
					window.location = "ehat_opd_billing.jsp?" + "treatmentId=" + r;
				}				
 				
			}else if(queryType == "update" && r > 0){
				
				// To Regenarate reg page for inactive patient 
				if(markvisitTflag=="N"){
					alertify.success("Updated Successfully!!!");
					window.location = "ehat_reg.jsp";
  				}
				alertify.success("Updated Successfully!!!");
				$('#queryType').val("insert");
				// To Generate BarCode
				generateBarcodePrint2(r,"reg");
				 if(departmentId == 2){
					window.location = "ehat_reg.jsp";
				}else{
					window.location = "ehat_reg.jsp";
				}
			 
			}else if(queryType == "delete" && r > 0){
				
				alertify.error("Deleted Successfully!!!");	
				
			}else if(queryType == "markvisit"){
				
				if(r > 0){
					alertify.success("Registered from Markvisit Successfully!!!");
				    
					$('#queryType').val("insert");							
					if(departmentId==2 && specialityId== 71){
						window.location = "ehat_DialysisPatientRecordsDetails.jsp?";
						
					}else if(departmentId == 2){
						window.location = "ipd_queue.jsp";
					
					}else{
						window.location = "ehat_opd_billing.jsp?" + "treatmentId=" + r;
					}					
				}else{					
					alertify.error("Patient treatment is already active!!!");
				}
			}
			else if(queryType == "insert" && r == 0){
				alertify.error("Patient already exist...");
			}
			$('#mrnnoHidden').val("xyz");
		}
	});
}

/*******
 * @author    :BILAL
 * @Date      :31-10-2017
 * @Code      :For Convertting OPD patient Bill To IPD 
 * ******/
function ConvertToIpdBilling(r,response){

	//For Ehat Patient 
	var patientId   = r.listReg[0].patientId;
 	var queryType   = $("#queryType").val();
 	var prefix      = r.listReg[0].prefix;
 	var fName       = r.listReg[0].fName;
	var mName       = r.listReg[0].mName;
	var lName       = r.listReg[0].lName;
	var gender      = r.listReg[0].gender;
	var mobile      = r.listReg[0].mobile;
	var dob         = r.listReg[0].dob;
	var age         = r.listReg[0].age;
	var ageMonths   = r.listReg[0].ageMonths;
	var ageDays     = r.listReg[0].ageDays;
	var talukaId    = r.listReg[0].talukaId;
	var townId      = r.listReg[0].townId;
	var districtId  = r.listReg[0].districtId;
	var stateId     = r.listReg[0].stateId;
	var countryId   = r.listReg[0].countryId;
	var areaCode    = r.listReg[0].areaCode;
	var unitId      = r.listReg[0].unitId;
	var adharcardNo = r.listReg[0].adharcardNo;
	var transSMS    = r.listReg[0].transSMS;
	var transEmail  = r.listReg[0].transEmail;
	var pramoEmail  = r.listReg[0].pramoEmail;
	var pramoSMS    = r.listReg[0].pramoSMS;
	var emergency   = r.listReg[0].emergency;
	var external    = r.listReg[0].external;
	var mrnno       = r.listReg[0].mrnno;
	var address     = r.listReg[0].address;
	var imageName   = r.listReg[0].imageName;
	
	//For Ehat treatment	
	var doctorIdList  = response.listTreatment[0].doctorIdList;
	var refDocId      = response.listTreatment[0].refDocId;
	var weight        = response.listTreatment[0].weight;
	
	
	var height        = response.listTreatment[0].height;
	
	if (doctorIdList == "" || doctorIdList == null || doctorIdList == undefined ) {
		doctorIdList = 0;
	}
		
		var payResId =0;
		var prefix2 = "-";
		var payResFName = "-";
		var payResMName = "-";
		var payResLName = "-";
		var payResgender = "-";
		var payResmobile = 0;
		var payResAdharNo = 0;
		var payResAddressText="-";	
		var relation = 0;
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data 	: {
			"patientId" : patientId
				},
		url : "ehat/registration/fetchPayResp",
		success : function(r) {
			
			payResId =r.listPayRes[0].payResId;
			prefix2 = r.listPayRes[0].prefix2;
			payResFName = r.listPayRes[0].payResFName;
			payResMName = r.listPayRes[0].payResMName;
			payResLName = r.listPayRes[0].payResLName;
			payResgender = r.listPayRes[0].payResgender;
			payResmobile = r.listPayRes[0].payResmobile;
			payResAdharNo =r.listPayRes[0].payResAdharNo;
			payResAddressText=r.listPayRes[0].payResAddressText;
			relation = r.listPayRes[0].relation;
			
			
		}
	});
	
	var mlcId=0;
	var mlcNo="";
	var firNo="";
	var authorityName="";
	var mlcFirstName="";
	var mlcLastName="";
	var mlcCmoDoctor=0;
	var buccleNo="";
	var plStname="";
	var mlcGender=""; 
	var mlcMobile=0;
	var mlcEmail="";
	var mlcPlAddess="";
	var mlcAge=0;
	var mlcRelation=0;
	var mlcAddressText="";
	var incidentDetails="";
	var mlcDate=null;
	var prefix3="select";
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data 	: {
			"patientId" : patientId
				},
		url : "ehat/registration/fetchMlcDetails",
		success : function(r) {
			
				 mlcId=r.listMlcDetails[0].mlcId;
				 mlcNo=r.listMlcDetails[0].mlcNo;
				 firNo=r.listMlcDetails[0].firNo;
				 authorityName=r.listMlcDetails[0].authorityName;
				 mlcFirstName=r.listMlcDetails[0].mlcFirstName;
				 mlcLastName=r.listMlcDetails[0].mlcLastName;
				 mlcCmoDoctor=r.listMlcDetails[0].mlcCmoDoctor;
				 buccleNo=r.listMlcDetails[0].buccleNo;
				 plStname=r.listMlcDetails[0].plStname;
				 mlcGender=r.listMlcDetails[0].mlcGender;
				 mlcMobile=r.listMlcDetails[0].mlcMobile;
				 mlcEmail=r.listMlcDetails[0].mlcEmail;
				 mlcPlAddess=r.listMlcDetails[0].mlcPlAddess;
				 mlcAge=r.listMlcDetails[0].mlcAge;
				 mlcRelation=r.listMlcDetails[0].mlcRelation;
				 mlcAddressText=r.listMlcDetails[0].mlcAddressText;
				 incidentDetails=r.listMlcDetails[0].incidentDetails;
				 mlcDate=r.listMlcDetails[0].mlcDate;
				 prefix3=r.listMlcDetails[0].prefix3;
			
			
		}
	});
	
	if (patientId == "" || patientId == null || patientId == undefined) {
		patientId = 0;
	}

	var AppId=0;  
  	if (AppId == "" || AppId == null || AppId == undefined || AppId =="null") {
  		AppId =0;  
 	}

	var treatmentId = 0;
	var departmentId = 2;

 		if (weight == "")
			weight = 0;
 		if (height == "")
			height = 0;
 		var BMI = finalCalculatedBMI(height, weight);
		var BSA = finalCalculatedBSA(height, weight);
		var HCIM = (height / 100);
 	
	var markvisitTflag='Y'; 
	
	var billId = 0;
	//var sourceTypeId = $("#sourceType").val();
 	
	var sponsorId = $("#SponsorsourceTypeId").val();
    if(sponsorId == "" || sponsorId == null || sponsorId == undefined){
        sponsorId = 0;
    }
 
	var sponsorCatId = $("#chargesSlaveId").val();
	//var count = $("#count").val();

	// bill details
	var billDetailsId = 0;
	var billDetailsIpdId = 0;
	var patientDetails = {   
			listReg : []
		};
	patientDetails.listReg.push({
		patientId : patientId,
		prefix : prefix,
		fName : fName,
		mName : mName,
		lName : lName,
		gender : gender,
		mobile : mobile,
		dob : dob,
		age : age,
		ageMonths : ageMonths,
		ageDays : ageDays,
		talukaId : talukaId,
		townId : townId,
		districtId : districtId,
		stateId : stateId,
		countryId : countryId,
		areaCode : areaCode,
		unitId : unitId,
		adharcardNo:adharcardNo,
		transSMS:transSMS,
		transEmail:transEmail,
		pramoEmail:pramoEmail,
		pramoSMS:pramoSMS,
		emergency:emergency,
		external:external,
		mrnno : mrnno,
		address :address,
		imageName : imageName
	});
	
 	var treatDetails = {
			listTreatment : []
		};
	treatDetails.listTreatment.push({
		treatmentId : treatmentId,
		patientId   : patientId,
		departmentId : departmentId,
		tFlag : markvisitTflag,
		doctorIdList : doctorIdList,
		refDocId : refDocId,
		weight : weight,
		height : height
 	});
	
 	var billMaster = {
			listBill : []
		};
	billMaster.listBill.push({
		sourceTypeId:sponsorId,
		departmentId : departmentId,
		billId:billId,
	
		sponsorCatId : sponsorId,
		sponsorId    :sponsorCatId
 	});
 	var billDetails = null;
	if (departmentId == 2) {
		billDetails = {
			listBillDetailsIpd : []
		};
		billDetails.listBillDetailsIpd.push({
			billDetailsId : billDetailsIpdId,
			sourceTypeId : sponsorId,
			billId : billId,
			departmentId : departmentId,
			sponsorId : sponsorId,// sponsor id
			chargesSlaveId : sponsorCatId
		// charges slave id
 		});
	} else {
		billDetails = {
			listBillDetails : []
		};
		billDetails.listBillDetails.push({
			billDetailsId : billDetailsId,
			sourceTypeId : sponsorId,
			billId : billId,
			departmentId : departmentId,
			sponsorId : sourceTypeId,// sponsor id
			chargesSlaveId : sponsorId
		// charges slave id

		});
	}
	
	var paymentResponsibleDetails = {   
			listPayRes : []
		};
	paymentResponsibleDetails.listPayRes.push({
		payResId : payResId,
		prefix2 : prefix2,
		payResFName : payResFName,
		payResMName : payResMName,
		payResLName : payResLName,
		payResgender : payResgender,
		payResmobile : payResmobile,
		payResmobile : payResmobile,
		payResAddressText : payResAddressText,
		relation : relation,
		departmentId: departmentId,
		payResAdharNo: payResAdharNo
	});
	
	// added by Tarique aalam	
	var mlcDetails = {   
			listMlcDetails : []
		};
	mlcDetails.listMlcDetails.push({
		mlcId : mlcId,
		mlcNo : mlcNo,
		firNo : firNo,
		authorityName : authorityName,
		mlcFirstName : mlcFirstName,
		mlcLastName : mlcLastName,
		mlcCmoDoctor : mlcCmoDoctor,
		buccleNo : buccleNo,
		plStname : plStname,
		mlcGender : mlcGender,
		mlcMobile: mlcMobile,
		mlcEmail: mlcEmail,
		mlcPlAddess:mlcPlAddess,
		mlcAge:mlcAge,
		mlcRelation:mlcRelation,
		mlcAddressText:mlcAddressText,
		incidentDetails:incidentDetails,
		mlcDate:mlcDate,
		prefix3:prefix3
		
	});
	
 	patientDetails = JSON.stringify(patientDetails);
	treatDetails = JSON.stringify(treatDetails);
	billMaster = JSON.stringify(billMaster);
	billDetails = JSON.stringify(billDetails);
	paymentResponsibleDetails=JSON.stringify(paymentResponsibleDetails);  // added by tarique
	mlcDetails=JSON.stringify(mlcDetails); 
	
 	if(billDetails == null){
		alert("Bill details are Null!!!!");
		return false;
	}
 	var inputs = [];
	inputs.push("queryType="+ queryType);
	// patient details push
	inputs.push("patientDetails="+ encodeURIComponent(patientDetails));
	inputs.push("BMI="+ encodeURIComponent(BMI));
	inputs.push("BSA="+ encodeURIComponent(BSA));
	inputs.push("HCIM="+ encodeURIComponent(HCIM));
	 
	inputs.push("AppId="+ encodeURIComponent(AppId));
	// treatment details
	inputs.push("treatDetails="+ encodeURIComponent(treatDetails));
	// bill master push
	inputs.push("billMaster="+ encodeURIComponent(billMaster));
	// bill details
	inputs.push("billDetails="+ encodeURIComponent(billDetails));
	inputs.push("paymentResponsibleDetails="+ encodeURIComponent(paymentResponsibleDetails));
	inputs.push("mlcDetails="+ encodeURIComponent(mlcDetails));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/saveReg",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			if(queryType == "insert" && r > 0){
				alert("Registerd Successfully!!!");
				$('#queryType').val("insert");
				//generateBarcodePrint2(r,"reg");
				if(departmentId == 2){//for ipd
					
					window.location = "ehat_IPD_BedWardDashboard.jsp?";
				}else{//opd,er or diag
					window.location = "ehat_billing.jsp?" + "treatmentId=" + r;
				}
				
 				
			}else if(queryType == "update" && r > 0){
			
				if(markvisitTflag=="N"){
					alert("Updated Successfully!!!");
					window.location = "ehat_reg.jsp";
  				}
				//alert("Updated Successfully!!!");
				$('#queryType').val("insert");
				
				//generateBarcodePrint2(r,"reg");
				if(departmentId == 2){
					window.location = "ehat_ipd_billing.jsp?" + "treatmentId=" + r;
				}else{
					window.location = "ehat_billing.jsp?" + "treatmentId=" + r;
				}
			 
			}else if(queryType == "delete" && r > 0){
				alert("Deleted Successfully!!!");
				
			}else if(queryType == "markvisit" && r > 0){
				
				$('#queryType').val("insert");
				
				//generateBarcodePrint2(r,"reg");
				if(departmentId == 2){
					window.location = "ehat_IPD_BedWardDashboard.jsp?" + "treatmentId=" + r;
				}else{
					window.location = "ehat_billing.jsp?" + "treatmentId=" + r;
				}
				//generateBarcodePrint2(r,"reg");
			}
			
		}
	});
}
/*******
 * @author    :BILAL
 * @Date      :1-11-2017
 * @Code      :For Narration pop up on billing after edit from receipt
 * ******/
function setnarationpopup(){
	
	$("#modal-12").addClass("md-show");
}

function closePopupnarration(){
	$("#modal-12").removeClass("md-show");
}

function setNarration(){

	var receiptEditSponsor  = $("#receiptEditSponsor").val(); 	
	var narrationid =$('#narrationid').val();
	
    if (narrationid == "" || narrationid == null || narrationid == undefined) {
		$("#narrationid").focus();		
		return false;
	}
    
   /* var deletenarration =$('narration').val();
    if (deletenarration == "deletemaster") {
		
	}*/
    
    $("#narration").val('notnarration');
	if (receiptEditSponsor == "sponsor") {
		saveServiceToSponsorPatient('saveBillOpdSponsor');
	}else{
		saveServiceToPatient('general');
	}
	
	
}

// Sponsor list for search bulk data start

function getAllChargesl() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getSponsorList",

		success : function(response) {
			multiSelectchargesinfo(response);
		}
	});
}

function multiSelectchargesinfo(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName) + '</option>';
	}

	$("#listmstr_select_chargesinfo").html(list);	
	$("#listmstr_select_chargesinfo").select2();	
	
	$("#listmstr_select_payee").html(list);	
	$("#listmstr_select_payee").select2();	
}

function setDyanamicDivForChargesinfo(setDiv, getDiv) {
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();
	var htm= '<li class="select2-search-choice" id="liItmesH'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removech('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisH' + (count) + '" type="hidden" value="' + id
			+ '">';
		+'</li>';
		$('#' + setDiv).append(htm);
	
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesl();// for masters
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		if (liSize == 0) {
			
			fetchChargesSlaveinfo(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveinfo(masterid, selfId);
		}		
	}
	
	$("#compDiv").show();
}

function removech(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesH' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesl();
		fetchargesinfo();
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		
		if (liSize == 0) {
			fetchChargesSlaveinfo(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveinfo(masterid, selfId);
		}		
	}
}

function multiSelectSlavechargesinfo(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
	}
	
	$("#listmstr_select_chargesinfo").html(list);		
}

function fetchChargesSlaveinfo(masterId, selfId) {
	
	masterId =1;
	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/fetcatY",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)

		},
		success : function(response) {
			
			multiSelectSlavechargesinfo(response);
			
		}
	});
}

//Sponsor list for search bulk data end


//Sponsor list for select payee bulk data start

function getAllChargesl2() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getSponsorList",

		success : function(response) {
			multiSelectchargesinfo(response);
		}
	});
}

function multiSelectchargesinfo2(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName) + '</option>';
	}
	
	$("#listmstr_select_payee").html(list);	
	$("#listmstr_select_payee").select2();	
}

function setDyanamicDivForChargesinfo2(setDiv, getDiv) {
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();
	var htm= '<li class="select2-search-choice" id="liItmesH'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removech2('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisH' + (count) + '" type="hidden" value="' + id
			+ '">';
		+'</li>';
		$('#' + setDiv).append(htm);
	
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesl();// for masters
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		if (liSize == 0) {
			
			fetchChargesSlaveinfo2(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveinfo2(masterid, selfId);
		}		
	}
}

function removech2(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesH' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesl2();
		fetchargesinfo2();
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		
		if (liSize == 0) {
			fetchChargesSlaveinfo2(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveinfo2(masterid, selfId);
		}		
	}
}

function multiSelectSlavechargesinfo2(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
	}
	
	$("#listmstr_select_payee").html(list);	
	
}

function fetchChargesSlaveinfo2(masterId, selfId) {
	
	masterId =1;
	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/fetcatY",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)

		},
		success : function(response) {
			
			multiSelectSlavechargesinfo2(response);
			
		}
	});
}


//Sponsor list for select payee bulk data end



/************
* @author	: Vinod Udawant
* @date		: 08-Nov-2017
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


/***********
 * @author	: Vinod Udawant
 * @date	: 08-Nov-2016
 * @reason	: Authorised Users List 
 **********/
function fetchAuthorisedBy(callFrom){
	
	var inputs = [];
	inputs.push('unitId=1');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "ehat/users/fetchAuthorisedBy",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			
			setAuthorisedBy(r);
			//$("#discAuthSel").setTemplate(authorisedByListTemplate);
			//$("#discAuthSel").processTemplate(data);
			//$("#refAuthSel").setTemplate(authorisedByListTemplate);
			//$("#refAuthSel").processTemplate(data);			
		}
	});	
} 

function setAuthorisedBy(r){
	
	var htm="<option value=0>-- Select --</option>";
	for(var i=0; i<r.length; i++){
		
		htm = htm + "<option value="+r[i].doctor_ID+">"+r[i].doc_name+"</option>";
	}
	$("#discAuthSel").html(htm);
	$("#refAuthSel").html(htm);
}

//@Touheed Template authorised by @date 23-Aug-2016
var authorisedByListTemplate = "<option value='0'>-- Select --</option>{#foreach $T.listDoctor as dpl}" 
		+	"<option value='{$T.dpl.ui}'>{$T.dpl.dn}</option>{#/for}";

function myfun(){
	BankOnSelect();
	$("#modal-11").addClass("md-show");
	getBankMasterList();
	resetMultiPopup();
}

/************
* @author	: Vinod Udawant
* @date		: 08-Nov-2017
* @codeFor	: Get previous pending amount
 ************/
function fetchPrevPending(callFrom) {	
	
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
		url 	: "ehat/bill/fetchPrevPending",
		error 	: function() {
					alert('Network Issue!!!');
				  },
		success : function(r) {
			
			if(callFrom=="onload"){
				
				var totRemain=r.totalRemain;
				if(totRemain <= 0 || isNaN(totRemain)){
					
					totRemain=0.00;					
				}
				$("#previousRemainingValue").html(parseFloat(totRemain).toFixed(2));
				
			}else{
				
				setPendingRec(r);
			}				
		}
	});
}

function setPendingRec(res){
	
	$("#receiptUl").empty();
	
	var setreceiptUl=" <li class='active' id='pendingReceipt'>" 
				+" <a data-toggle='tab'><i class='fa fa-user-md'></i>"
				+" Previous Pending Receipts</a></li>" 
				+" <li id='curReceipt'>" 
				+" <a data-toggle='tab' onclick='window.location.reload(true);'><i class='fa fa-user-md'></i>"
				+" Current Receipts</a></li>" 
				+" <li style='float: right;'>"
				+" <a onclick='hideBillDetails()' id='forPending'><b><label id='billText'>  Show Receipts View   </label>" 
				+" <i id='shBillView' class='fa fa-chevron-up'></i></b></a></li>";
	
	$("#receiptUl").html(setreceiptUl);
	$("#forPending").trigger('onclick');
	
	var result= ' <table class="table table-hover" id="receipts"> '
	+ ' <thead> '
	+ '		<tr> '
	+ '			<th>#</th> '
	+ '			<th>Receipt Id</th> '
	+ '			<th>Amount</th> '
	+ '			<th>Paid</th> '
	+ '			<th>Discount</th> '
/*	+ '			<th>Refund</th> '*/
	+ '			<th>Remain</th> '
	+ '			<th>Date</th> '
	+ '			<th>Details</th> '
	+ '		</tr> '
	+ '	</thead> '
	+ '	<tbody> ';
		
	for(var i=0;i<res.listBillReceiptMaster.length;i++){
		
		var treatId=res.listBillReceiptMaster[i].treatmentId;
		var recId=res.listBillReceiptMaster[i].billReceiptId;
		//var againId=res.listBillReceiptMaster[i].againstId;
		var totalAmt=parseFloat(res.listBillReceiptMaster[i].actualAmt).toFixed(2);
		var totPaid=parseFloat(res.listBillReceiptMaster[i].totalPaid).toFixed(2);			
		//var refAmt=parseFloat(res.listBillReceiptMaster[i].refundAmt).toFixed(2);
		/*var totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);*/
		//var totDisc=parseFloat(res.listBillReceiptMaster[i].actualTotConcn).toFixed(2);
		var totDisc=parseFloat(res.listBillReceiptMaster[i].totalDisc).toFixed(2);
		var remainAmt=parseFloat(res.listBillReceiptMaster[i].totalRemain).toFixed(2);//parseFloat(Number(totalAmt)-(Number(totPaid)+Number(totDisc))).toFixed(2);
		var datetime= new Date(res.listBillReceiptMaster[i].createdDateTime).toLocaleDateString('en-GB');
		
		//prevPaid=prevPaid+totAmt;
		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '		 
		  + '	<td>'+recId+'</td> '
		  + '	<td>'+totalAmt+'</td> '
		  + '	<td>'+totPaid+'</td> '
		  + '	<td>'+totDisc+'</td> '
		 /* + '	<td>'+refAmt+'</td> '*/
		  + '	<td>'+remainAmt+'</td> '
		  + '	<td>'+datetime+'</td> '		 
		  + '   <td> '
		 /*<button onclick=receiptBillPrint("receiptPending",'+recId+') data-toggle="tooltip" title="Print Receipt" data-placement="left"><i class="fa fa-print"></i></button> '*/
		  + '   <button onclick="setCreditPayble('+remainAmt+','+recId+',\'pending\','+treatId+')"><i class="fa fa-credit-card"></i></button> '
		  + '	</td>'
		  + '</tr> ';
	}
		
	result=result
	+ '	</tbody> '
	+ '</table> ';	

	$("#cashReceipts").html(result);
}

function calRefundAmtOpd(){
	
	var payable=$("#payable").val();
	var ref=$("#refPer").val();
	var refAmt=(Number(payable)*Number(ref))/100;
	if(Number(refAmt)>Number(payable)){
		alert("Refund should not be greater than payable");
		$("#refPer").val(0);
		$("#payNow").val(0);
	}else{
		//var nowPay=Number(payable)-Number(refAmt);
		$("#payNow").val(parseFloat(refAmt).toFixed(2));
	}	
}


function calRefundPerOpd(){
	
	var payable=$("#payable").val();
	var refAmt=$("#payNow").val();
	var refPer=(Number(refAmt)/Number(payable))*100;
	if(Number(refAmt)>Number(payable)){
		alert("Refund should not be greater than payable");
		$("#refPer").val(0);		
		$("#payNow").val(0);
	}else{
		
		$("#refPer").val(parseFloat(refPer).toFixed(2));		
	}	
}

/************
* @author	: Tarikh Alam
* @date		: 14-12-2017
* @codeFor	: Get Payment mode list
 ************/
function getAllPayments() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/payment/fetchPayList",

		success : function(r) {
			setTempPaymode(r);//call template
		}
	});
}

function setTempPaymode(r) {
	var list = "<option value='0' class='un'>-- Select --</option>";      
    for ( var i = 0; i < r.listPay.length; i++) {  

        list = list + "<option value='"+r.listPay[i].payId+"' class='un'>" + (r.listPay[i].payName) + "</option>";    
    }  
    list = list + "<option value='-1' class='un'>Multiple</option>";  
    $("#payMode").html(list);
}


/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @date 14_DEC_2017 
 * @Code Fetching Narration Data 
 ******************************************************************************/

function getAllNarrations() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/narration/fetchNarrList",

		success : function(r) {
			setTempNarrations(r);//call template
		}
	});
}


function setTempNarrations(r) {
	var list = "<option value='0'>--Select Narration--</option>";    
    for ( var i = 0; i < r.listNarr.length; i++) {    
        
    	list = list + "<option value='"+r.listNarr[i].narrId+"' class='un'>" + (r.listNarr[i].narrName) + "</option>";    
    }  
    $("#narrSel").html(list);
}

/***********
 * @author	: Vinod Udawant
 * @date	: 06-jan-2018
 * @codeFor : Distribute concession & TDS for bulk settlement
 ***********/
function distributeConTds(id){
		
	resetBulkData();
	var rows= $('#bulkTbl tbody tr').length;
	var totTds=$('#totTDS').val();
	var totCon=$('#totConcn').val();	
	var gotPay=$('#gotPay').val();
	
	var totRemAmt=0;
	
	for(var i=0;i<rows;i++){
		
		var patId=$('#bulkTbl tr:eq('+i+') > td:eq(12)').text();
		
		if ($('#bulkSlave'+patId).is(':checked')) {
			
			totRemAmt=Number(totRemAmt)+Number($('#bulkTbl tr:eq('+i+') > td:eq(8)').text());
		}
	}
	
	$('#payable').val(totRemAmt);
	
	var totDeductions=Number(totTds)+Number(totCon)+Number(gotPay);
	
	if(totDeductions > totRemAmt){
		
		alert("Payable amount should be less than total amount");
		$("#"+id).val(0);
		distributeConTds();
		return false;
	}else{
		
		for(var i=0;i<rows;i++){
			
			var patId=$('#bulkTbl tr:eq('+i+') > td:eq(12)').text();
			
			if ($('#bulkSlave'+patId).is(':checked')) {
						
				var remAmt=Number($('#bulkTbl tr:eq('+i+') > td:eq(8)').text());			
				var incDecPer=remAmt*100/totRemAmt;
				
				var tdsAmt=incDecPer*totTds/100;			
				var conAmt=incDecPer*totCon/100;			
				var gotPayAmt=incDecPer*gotPay/100;
						
				$("#txtDisc"+patId).val(parseFloat(conAmt).toFixed(2));
				$("#txtTds"+patId).val(parseFloat(tdsAmt).toFixed(2));	
				$("#txtAmt"+patId).val(parseFloat(gotPayAmt).toFixed(2));			
			}
		}
		calBulkPayable(id);
	}
}

/***********
 * @author	: Vinod Udawant
 * @date	: 06-jan-2018
 * @codeFor : Calculate payable for bulk settlement
 ***********/
function calBulkPayable(id){
	
	resetBulkData(id);
	var rows= $('#bulkTbl tbody tr').length;
	var totAmt=$('#payable').val();
	var totCon=0,totTds=0,totRed=0,totChqAmt=0;
	var payable=0;
	
	for(var i=0;i<rows;i++){
		
		var patId=$('#bulkTbl tr:eq('+i+') > td:eq(12)').text();
		
		if ($('#bulkSlave'+patId).is(':checked')) {
			
			totChqAmt=Number(totChqAmt)+Number($("#txtAmt"+patId).val());
			totCon=Number(totCon)+Number($("#txtDisc"+patId).val());
			totTds=Number(totTds)+Number($("#txtTds"+patId).val());			
			//totRed=Number(totRed)+Number($("#txtRedn"+patId).val());
		}
	}
	
	payable=Number(totAmt)-(Number(totCon)+Number(totTds)+Number(totRed)+Number(totChqAmt));
	$("#payNow").val(parseFloat(payable).toFixed(2));
		
	var totRemAmt=$('#payable').val();
	var totPayable=Number(totCon)+Number(totTds)+Number(totRed)+Number(totChqAmt);
	if(totPayable > totRemAmt){
		
		alert("Payable amount should be less than total amount");
		$("#"+id).val(0);
		distributeConTds();
		return false;
	}else{
		
		payable=Number(totAmt)-(Number(totPayable));
		$("#payNow").val(parseFloat(payable).toFixed(2));
		
		/*if(id != "gotPay"){
			
			$("#gotPay").val(parseFloat(payable).toFixed(2));
		}*/
	}		
}

/***********
 * @author	: Vinod Udawant
 * @date	: 06-jan-2018
 * @codeFor : Calculate payable for bulk settlement
 ***********/
function resetBulkData(id){
	
	var rows= $('#bulkTbl tbody tr').length;
	
	for(var i=0;i<rows;i++){
		
		var patId=$('#bulkTbl tr:eq('+i+') > td:eq(12)').text();
				
		if (!($('#bulkSlave'+patId).is(':checked'))) {
			
			$("#txtAmt"+patId).val(0);
			$("#txtDisc"+patId).val(0);
			$("#txtTds"+patId).val(0);			
			/*$("#txtRedn"+patId).val(0);*/
		}
	}
}

/***********
 * @author	: Vinod Udawant
 * @date	: 06-jan-2018
 * @codeFor : Set UI Mode
 ***********/
function setUiMode(){

	var uiMode=$("#uiMode").val();
	
	if(uiMode=='S'){
		
		$('#servDiv').removeClass('col-md-12');
		$('#servDiv').addClass('col-md-9');
		$('#payDiv').show('');
		$('#receiptView').show('');
		$("#uiMode").val('P');
		var sponsorId=$("#chargesSlaveId").val();
		if(sponsorId>0){
					
			$("#sponsorOpd").trigger('click');			
			resetAll("sponsor");	
			$("#txtPayAmtSp").html("Bill Details");	
		}else{
				
			resetAll("general");
			$("#txtPayAmt").html("Bill Details");	
		}		
			
	}else{
		
		$('#servDiv').removeClass('col-md-9');
		$('#servDiv').addClass('col-md-12');
		$('#payDiv').hide('');
		$('#receiptView').hide('');
		$("#uiMode").val('S');
		var sponsorId=$("#chargesSlaveId").val();
		if(sponsorId>0){
					
			$("#sponsorOpd").trigger('click');			
			resetAll("sponsor");	
			$("#txtPayAmtSp").html("Pay Amount");	
		}else{
				
			resetAll("general");
			$("#txtPayAmt").html("Pay Amount");	
		}		
	}	
}



/***********
 * @author	: Kishor Lokhande
 * @date	: 08-feb-2018
 * @codeFor : This function use for access concession flow
 ***********/
function setConcessionWhenAccesOn(){

//return false;
		var concessionFlow=$('#concessionFlow').val();
		//var concessionFlow="off";
		if(concessionFlow=="on"){			
		//General
		$('#conDivG').show('');
		$('#conPerDivG').show('');				
		$('#conCoPayDivG').show('');
		$('#dateDiveG').hide('');
		
		$('#servIdDiv').removeClass('form-group col-md-2');
		$('#servIdDiv').addClass('form-group col-md-1');
		
		$('#doctorDiveG').removeClass('form-group col-md-2');
		$('#doctorDiveG').addClass('form-group col-md-1');
		
		$('#dateDiveG').removeClass('form-group col-md-1');
		$('#dateDiveG').addClass('form-group col-md-1');
		
		//Sponsor
		$('#conDivS').show('');
		$('#conPerDivS').show('');	
		$('#payDivS').show('');	
		$('#dateDiveS').hide('');
		
		$('#servIdOpdSponsorDiv').removeClass('form-group col-md-2');
		$('#servIdOpdSponsorDiv').addClass('form-group col-md-1');
		
		$('#doctorDiveS').removeClass('form-group col-md-2');
		$('#doctorDiveS').addClass('form-group col-md-1');
		
		$('#dateDiveG').removeClass('form-group col-md-1');
		$('#dateDiveG').addClass('form-group col-md-1');
		
	}else{		
		//General
		$('#conDivG').hide('');
		$('#conPerDivG').hide('');
		$('#conCoPayDivG').hide('');		
		$('#dateDiveG').show('');
		
		$('#servIdDiv').removeClass('form-group col-md-1');
		$('#servIdDiv').addClass('form-group col-md-2');
				
		$('#doctorDiveG').removeClass('form-group col-md-1');
		$('#doctorDiveG').addClass('form-group col-md-2');
		
		$('#dateDiveG').removeClass('form-group col-md-1');
		$('#dateDiveG').addClass('form-group col-md-1');
		
		//Sponsor
		$('#conDivS').hide('');
		$('#conPerDivS').hide('');
		$('#payDivS').hide('');		
		$('#dateDiveS').show('');
		
		$('#servIdOpdSponsorDiv').removeClass('form-group col-md-1');
		$('#servIdOpdSponsorDiv').addClass('form-group col-md-2');
		
		$('#doctorDiveS').removeClass('form-group col-md-1');
		$('#doctorDiveS').addClass('form-group col-md-2');
		
		$('#dateDiveS').removeClass('form-group col-md-1');
		$('#dateDiveS').addClass('form-group col-md-1');
		
	}	
}

function setSponser(){
	 
	var si=$("#sourceType").val();
	
	if(si==1){
		
		$("#sponserselect").show();
		getAllChargesl();
 	}else{
 	
 		$("#sponserselect").hide();
 	}
}

/************
* @author	: Vinod Udawant
* @date		: 15-Feb-2018
* @codeFor	: Fetch Bill Prefix
*************/
function getBillPrefixForBilling(callF,depId){
			
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	depId = 1;
	var inputs = [];	
	inputs.push("depId=" + depId);
	inputs.push("callFrom=" + callF);		
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/bill/getBillPrefix",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setBillPrefixForBilling(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 15-Feb-2018
* @codeFor	: Fetch Bill Prefix
*************/
function setBillPrefixForBilling(r){
	
	var len = r.listEhatBillPrefix.length;			
	for(var n=0;n<len;n++){
		
		var lst = r.listEhatBillPrefix[n];
		if(lst.depId==0){
			
			// For Patient Id	  			
		  	$("#patPrefix").val(lst.billPrefix);
		  	$("#patMiddle").val(lst.billMiddle);
		  	$("#patSufix").val(lst.billSuffix); 	  	
		  	// For Patient Id
			
			// For bill Id
		  	if((lst.billRecBoth==1 || lst.billRecBoth==3)){
		  			
		  		$("#billPrefix").val(lst.billPrefix);
		  		$("#billMiddle").val(lst.billMiddle);
		  		$("#billSufix").val(lst.billSuffix);  						  			
		  	}
		  	// For bill Id
		  	
		  	// For Rec Id
		  	if((lst.billRecBoth==2 || lst.billRecBoth==3)){
		  			
		  		$("#recPrefix").val(lst.billPrefix);
		  		$("#recMiddle").val(lst.billMiddle);
		  		$("#recSufix").val(lst.billSuffix);  						  			
		  	}
		  	// For Rec Id
		}
		
	  	// For Patient Id	  	
	  	if(lst.depId==4){
	  			
	  		$("#patPrefix").val(lst.billPrefix);
	  		$("#patMiddle").val(lst.billMiddle);
	  		$("#patSufix").val(lst.billSuffix);  		
	  	}
	  	// For Patient Id
	  		
	  	// For bill Id	  	
	  	if((lst.billRecBoth==1 || lst.billRecBoth==3)){
	  		
	  		$("#billPrefix").val(lst.billPrefix);
	  		$("#billMiddle").val(lst.billMiddle);
	  		$("#billSufix").val(lst.billSuffix);  						  			
	  	}
	  	// For bill Id
	  	
	  	// For Rec Id	  	
	  	if((lst.billRecBoth==2 || lst.billRecBoth==3)){
	  			
	  		$("#recPrefix").val(lst.billPrefix);
	  		$("#recMiddle").val(lst.billMiddle);
	  		$("#recSufix").val(lst.billSuffix);  						  			
	  	}
	  	// For Rec Id
	}		
}


function deleteNarration(callFrom,slaveId,recId){
	
	if(callFrom=="open"){
		
		$("#modal-18").addClass("md-show");
		$("#slaveId").val(slaveId);
		$("#recId").val(recId);		
		
	}else if(callFrom=="submit"){
		
		var delNarration=$("#delNarration").val();
		//var narrationid=$("#delNarrtn").val();
		if(delNarration==""){
			
			alert("Please fill narration");
			return false;
		}
		
		var sId=$("#slaveId").val();
		var rd=$("#recId").val();	
		
		deleteOnClickForReciept(sId, rd);
		$("#modal-18").removeClass("md-show");
		
	}else{
		
		$("#modal-18").removeClass("md-show");
	}	
}

function checkAll(callFrom){
	
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
	
	setTotalPaid(callFrom,-1);
}
 
function uncheckAll(){
	
	$("input[name='opdBillCheckboxReg']:checkbox").prop('checked',false);
	$("input[name='opdBillCheckbox']:checkbox").prop('checked',false);	
	
	var a = parseFloat(0).toFixed(2);
	
	$("#payable").val(a);
	$("#payNow").val(a);	
}

/************
* @author	: Laxman Nikam
* @date		: 07-March-2018
* @codeFor	: After Paid,Test Sent To Lab for OPD and Diagno only.
 ************/
function paidTestSendToLab(tretId){

		jQuery.ajax({
			type : "POST",
			url  : "ehat/bill/paidTestSendToLab",
			data : {
	   "treatmentId" : tretId
			},
	     timeout : 1000 * 60 * 5,
		   cache : false,
		   error : function() {
				    alert('error');
			},
		 success : function(r) {
			 if(parseInt(r)<0){
				 alert("Network error : Test can not send to lab..!");
			 }
		     		
			}
		});
}

//Added by sanjay.
function paidTestSendToRis(subservIdsChecked,treatmentId){
	subservIdsChecked=subservIdsChecked.slice(1);
	jQuery.ajax({
		type : "POST",
		url  : "ehat/bill/paidTestSendToRis",
		data : {
   "subservIdsChecked" : subservIdsChecked,
   "treatmentId" : treatmentId
		},
     timeout : 1000 * 60 * 5,
	   cache : false,
	   error : function() {
			    alert('error');
		},
	 success : function(r) {
		 
		 if(parseInt(r)<0){
		 alert("Network error : Test can not send to RIS..!");
		 }
	 }
	});
}

function paidTestSenToRadiation(subservIdsChecked,treatmentId){
	
subservIdsChecked=subservIdsChecked.slice(1);
jQuery.ajax({
	type : "POST",
	url  : "ehat/bill/paidTestSendToRadiation",
	data : {
			"subservIdsChecked" : subservIdsChecked,
			"treatmentId" : treatmentId
	},
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		    alert('error');
	},
	success : function(r) {
	 
	 if(parseInt(r)<0){
		 alert("Network error : Test can not be send to Radiation..!");
	 }
 }
	});
}

// Mohd Tarique Aalam
function getDailyCollectionPdf(){
	var isPharmacy="";
	
	if ($('#idPharmacy').is(':checked')) {
		isPharmacy="Yes";
	}else{
		isPharmacy="No";
	}
	
	var fromDate=$("#fromDate").val();
	var toDate=$("#lastDate").val();	
	var userId=$("#userId").val();
	var deptId=$("#deptId").val();
	window.open("ehat_daily_collection_report_pdf.jsp?fromDate="+fromDate+"&toDate="+toDate+"&userId="+userId+"&deptId="+deptId+"&isPharmacy="+isPharmacy);
}




/************
* @author	: Mohd Traique Aalam
* @date		: 03-07-2018
* @codeFor	: Search Daily Coleection
 ************/
function searchDailyCollectionReport(callF){
	
	var fromDate=$("#fromDate").val();
	var toDate=$("#lastDate").val();	
	var userId = parseInt($("#userId").val());
	var deptId=parseInt($("#deptId").val());	
	var unitId=1;	
		
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("deptId=" + deptId);
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/bill/getDailyCollection",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			if(callF=="hisab"){
				
				setHisabDailyCashReportTemp(r);
			}else if(callF=="hisabRefund"){
				
				setHisabDailyCashReportTemp(r);
			}else{
				
				setSearchDailyCashReportTemp(r);
				setSearchDailyCashReportRefundTemp(r);
			}										
		}
	});
}


/********
 * @author	Vinod Udawant
 * @base 	Add amt to ipd outstanding
 * @since	7-sept-2018
 ********/
function addAmtToOpdOutstanding(){
		
	var patientSaleAmt = $("#patientSaleAmt").val();
	var patientCheck = $('#patientCheck').is(':checked');
			  
	var narAmt = $("#narAmt").val();
	var narCheck = $('#narCheck').is(':checked');

	if(Number(patientSaleAmt) > 0 && patientCheck==false){
		
		alert("Please check intdent sale checkbox");
		return false;
	}
	
	if(Number(narAmt) > 0 && narCheck==false){
		
		alert("Please check Narcotics checkbox");
		return false;
	}
	
	var chargesConf=$("#chargesfromConfIpd").val();
	
	var emrPer=$('#emrPer').val();    // added by Tarique Aalam
	if (emrPer == "" || emrPer == null || emrPer == undefined) 
	{
		emrPer=0;
	}
	
	var billDetailsId=0;

	var narration = "";
	var narrationid = "-";
	var drdeskflag1 =$('#drdeskflag').val();
	var update = $('#queryType').val();
	if(update == "update"){		
		//alert("in  2977");
		if (drdeskflag1 == "" || drdeskflag1 == null || drdeskflag1 == undefined) {
			drdeskflag1="-";
		}
		
		var drdeskflag=drdeskflag1.trim();
	}

	var narrationBill = "";
	var narrationidBill = "-";

	var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	$("#sponsorid2").val(sponsorId);
	$("#chargesSlaveId2").val(chargesSlaveId);
	var serviceId = $("#serviceid").val();
	var sponsorid2=$("#sponsorid2").val();
	var chargesSlaveId2=$("#chargesSlaveId2").val();

	var callfrom = $('#saveServiceCallFrom').val();
	var masterReceiptId = $('#receiptMasterId').val();
	var iscombination="N";
	var receiptOf  = $("#receiptOf").val();
	var recSlaveIdIPD  =	$('#receiptSlaveIdIPD').val();	
	var hallId    =	$('#hallId').val();	

	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	if (recSlaveIdIPD == "" || recSlaveIdIPD == null || recSlaveIdIPD == undefined || isNaN(recSlaveIdIPD)) {
		recSlaveIdIPD = 0;
	}
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (masterReceiptId == "" || masterReceiptId == null || masterReceiptId == undefined || isNaN(masterReceiptId)) {
		masterReceiptId = 0;
	}

	var sndToLabFlag=$("#sndtolabflag").val().trim();		
	var ot_flag='N';
	var queryType = $('#queryType').val();
	var masterReceiptId = 0;
	var doctorId = 0;
	var patienttId = $("#pId").val();
	var treatmentId = $("#treatmentId").text();
	var departmentId = $("#depdocdeskid").val();		
	var billId = parseInt($("#billNo").html());
	var sourceTypeId = $("#sourceTypeId").val();		
	var rate = 0;
	var concession = 0;
	var concessionPer = 0;
	var quantity = 0;
	var amount = 0;
	var pay = 0;
	var coPay = 0;
	var createdDateTime = $("#finalDate").val();		
	var subServiceId = 0;
	
	var update = $('#queryType').val();
	if(update != "update"){
		
		var pharmacyInvname = $("#perticular").val();  //Pooja
		var  drdeskflag="-";
		if(subServiceId == -1 && (pharmacyInvname != "" || pharmacyInvname == null || pharmacyInvname == undefined || pharmacyInvname == 0 || isNaN(pharmacyInvname))){
			subServiceId = 9;
			serviceId =$("#pharmacyInvoice").val();//only for invoice 
			//serviceId =$("#servId").val();//only for invoice 
			drdeskflag =$("#perticular").val();
			
		}
	}
	
	var subservicesname = $("#perticular").val();
	//var servicename = $("#servicename").val();
	var perticularSName = $("#perticular").val();
	
	var unitId = $("#uId").val();
	
	var otherAmount=0;
	var otherCoPay=0;
	var otherPay=0;
	var otherRate=0;
	var otherConcession=0;
	
	var recSlaveIdIPD = 0;

	var tempDate = createdDateTime.split("/");
	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

	if (subservicesname == "" || subservicesname == null) {
		
		subservicesname="pharmacy";
	}
	if (unitId == 0) {
		unitid = $("#allunitid").val();
	}
	//Added by sanjay on ipd, service assign save button.send to ris
	var sendToRisIpdBill ='N';
	var recSlaveId = 0;
	
	var module 	 = "opd";
	
	var totalAmount = $("#pendingTot").val();	
	var discPer = $("#disc1").val();	
	var discAmt = $("#disc2").val();	
	var finalAmt = $("#fAmt").val();
	
	serviceId = -5;
	
	rate = totalAmount;
	concession = 0;
	concessionPer = discPer;
	quantity = 1;
	amount = finalAmt;
	pay = 0;
	coPay = finalAmt;		
	
	otherRate = totalAmount;
	otherConcession = 0;		
    otherAmount = finalAmt;
    otherCoPay = finalAmt;
    otherPay = finalAmt;       
	
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
		concessionOnPerc : concessionPer,
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
        //concessionOnPerc : concessionOnPerc,
        iscombination : iscombination,
        receiptOf  :  receiptOf,
        narrationid : narrationid,
        narrationidBill : narrationidBill,
        accountStatusOpdDiagno : "N",
   		emrPer          : emrPer,
        sndToLabFlag : sndToLabFlag,
		//sndToRisFlag:sendToRisId,
		drdeskflag : drdeskflag
  
	});

	serviceDetails = JSON.stringify(serviceDetails);
	var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());

	var inputs = [];
	
	// patient details push
	inputs.push("serviceDetails="+ encodeURIComponent(serviceDetails));
	inputs.push("queryType="+ queryType);
	inputs.push("module="+ module);
	inputs.push("callfrom="+ callfrom);
	inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
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
			
			alert("Pharmacy added in outstanding Successfully");		
			window.location.reload(true);
		}	
	});	
	
}

/************
* @author	: Vinod Udawant
* @date		: 10-09-2018
* @codeFor	: Get pharmecy added in billing or not
 ************/
function getPharmacyInBillOrNot(){
	
	var callF = "";
	var treatmentId = $('#treatmentId').text();
	var deptId=parseInt($("#deptId").val());	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
		
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("deptId=" + deptId);
	inputs.push("userId=" + userId);
	inputs.push("treatmentId=" + treatmentId);	
	inputs.push("chargesSlaveId=" + chargesSlaveId);	
	inputs.push("callFrom=" + callF);	
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/bill/getPharmacyInBillOrNot",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			if(r > 0){
				
				$("#outstandAmt").attr("disabled",true);
			}											
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 19-Sept-2018
* @codeFor	: Get Settled Bills 
 ************/
function getSettledBills(callFrom,pageNumber){
	var startIndex = 0;
	
 	var letter= $("#byName").val();
	var unitId=$("#bulkUnitId").val();
	var deptId=0;//$("#bulkDeptId").val();
	
	var fromDate=($("#fromDate").val()).split("/");
	var sDate = (fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);  // added by sandip
	var lastDate=($("#lastDate").val()).split("/");
	var eDate = (lastDate[2] + "-" + lastDate[1] + "-" + lastDate[0]);
	var sponId=0;	
	
	//For Hall Wise Id  
	var sponsorF = $("#lis1").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems li").length;
	sponsorL = $("#lis" + (liSizeHall - 1)).val();
	
	if(startIndex = 'NAN0')
	{
		startIndex='0';
	}
	else{
		
		startIndex= (pageNumber-1)+"0";
	}
	
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	
	if(sponsorF=="" || sponsorF==null || sponsorF=="" || sponsorF==undefined){
		
		sponsorF=0;
	}	
	if(sponsorL=="" || sponsorL==null || sponsorL=="" || sponsorL==undefined){
		
		sponsorL=0;
	}	
	if(unitId=="" || unitId==undefined){
		
		unitId=0;
	}
	/*if(deptId=="" || deptId==undefined){
		
		deptId=0;
	}*/
	if(sponId=="" || sponId==undefined){
		
		sponId=0;
	}
	if(letter=="" || letter==undefined){
		
		letter="0";
	}
	
	var inputs = [];		
	inputs.push("unitId=" + unitId);	
	inputs.push("deptId=" + deptId);	
	inputs.push("sponId=" + sponId);
	inputs.push("callFrom=" + callFrom);
	inputs.push("sponsorF=" + sponsorF);
	inputs.push("sponsorL=" + sponsorL);
	inputs.push("fromDate=" + sDate);
	inputs.push("lastDate=" + eDate);
	inputs.push('letter=' + letter);
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	jQuery.ajax({
	
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url		: "ehat/bill/getSettledBills",
		success : function(r) {
 			
			if(r.listBulkSettlementMst.length > 0){
				
				setSettledBills(r,callFrom,pageNumber);
			}else{
				
				alert("Record Not Found");
				$("#bulkData").html("");	
			}						
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 19-Sept-2018
* @codeFor	: Get Settled Bills 
 ************/
function setSettledBills(r,callFrom,pageNumber) {
	
	var countAuto = (pageNumber - 1) + '1';
	countAuto = Number(countAuto);
	
	var bulkTemp="";
	
	for(var i=0;i<r.listBulkSettlementMst.length;i++){
		
		var recId=r.listBulkSettlementMst[i].bulkMasterId;
		var totAmt=r.listBulkSettlementMst[i].totalAmt;		
		var concn=r.listBulkSettlementMst[i].totalConsn;
		var tds=r.listBulkSettlementMst[i].totalTds;		
		var totPaid=r.listBulkSettlementMst[i].totalPaid;
		var totRem=r.listBulkSettlementMst[i].totalRemain;
		var datetime= new Date(r.listBulkSettlementMst[i].createdDateTime).toLocaleDateString('en-GB');
		
		bulkTemp=bulkTemp+"<tr>"
		+ "<td class='TextFont' style='width: 8%;'>"+(i+1)+"</td>"
		+ "<td class='TextFont' style='width: 10%;'>"+recId+"</td>"
		+ "<td class='TextFont' style='width: 12%;'>"+datetime+"</td>"
		+ "<td class='center TextFont' style='width: 10%;'>"+parseFloat(totAmt).toFixed(2)+"</td>"
		+ "<td class='center TextFont' style='width: 10%;'>"+parseFloat(concn).toFixed(2)+"</td>"
		+ "<td class='center TextFont' style='width: 10%;'>"+parseFloat(tds).toFixed(2)+"</td>"
		+ "<td class='center TextFont' style='width: 10%;'>"+parseFloat(totPaid).toFixed(2)+"</td>"	
		+ "<td class='center TextFont' style='width: 10%;'>"+parseFloat(totRem).toFixed(2)+"</td>"			
		+ "<td class='center TextFont' style='width: 10%;text-align:center'>" 		
		+ "<button onclick='bulkReceiptPrint("+recId+")' title='Summary Bill Print' id='btnIpdPrint' data-placement='left' data-toggle='tooltip' type='button' class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"	
		+ "</tr>";	
	}
	
	var numberOfRows="";
	var indexopd=1;
	var opdcount = r.settledBillCount;
	var numberOfPages=(opdcount/10);
	var displayPagination=numberOfPages;            
	if(numberOfPages > 5){
	    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	    displayPagination=5;
	}
	for(var j=0;j<displayPagination;j++){
		 if(j == Number(pageNumber-1))
			{
		        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getSettledBills('onload',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

			}
			else
			{
		        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getSettledBills('onload',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
			}
			indexopd=indexopd+1;
	}
	if(numberOfPages>6){
	    numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	}

	$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
	$('#opdpagenation').html(numberOfRows);
	
	$("#bulkData").html(bulkTemp);	
}

function nextPagination(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getSettledBills('onload',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPagination(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getSettledBills('onload',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


/************
* @author	: Vinod Udawant
* @date		: 19-Sept-2018
* @codeFor	: Print Settled Receipts 
 ************/
function bulkReceiptPrint(recId) {

	window.open("ehat_bulksettled_receipt.jsp?ReceiptNo="+recId);
}

/************
* @author	: Vinod Udawant
* @date		: 17-Oct-2018
* @codeFor	: Set Service For Cash Payment 
 ************/
function setServiceForCashOpd() {
	
	var r = confirm("Are You Sure To Activate Paid Service In Cash");
	if (r == true) {
		
		var servIdsCheckedForCash=[];
		
		$('input[id=chkOpdBillReg1]:checked').each(function(){
			
			var regBillId = $("#regBillId").val();
			servIdsCheckedForCash.push(regBillId);
		});		
		
		$('input[name=opdBillCheckbox]:checked').each(function(){
			
			servIdsCheckedForCash.push($(this).val());
		});		
		
		if(servIdsCheckedForCash==""){
			
			alert("Please check services for cash payment");
			$(".openAllSlave").trigger('click');
			return false;
		}
		
		$("#paidByCashFlag").val("Y");
		$("#paidByCashServices").val(servIdsCheckedForCash);		
	}	
}
/************
* @author	: Laxman Nikam
* @date		: 14-Jan-2018
* @codeFor	: resetPayMode()
 ************/
function resetPayMode(){
	 $("#payMode").val(1);
}


/************
* @author	: Vinod Udawant
* @date		: 05-March-2019
* @codeFor	: Set BillMaster Totals
 ************/
function setOpdBillMaster(treatmentId){
	
	var userId = 0;
	var unitId = 0;
	var callFrom = ""; 
	
	var inputs = [];		
	inputs.push("userId=" + userId);	
	inputs.push("unitId=" + unitId);	
	inputs.push("treatmentId=" + treatmentId);	
	inputs.push("callFrom=" + callFrom);	
	
	var str = inputs.join('&');
	jQuery.ajax({
	
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url		: "ehat/bill/setOpdBillMaster",
		success : function(r) {
 											
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 24-March-2019
* @codeFor	: Print Settled Report 
 ************/
function bulkReportPdf() {

	var fromDate = ($("#fromDate").val()).split("/");
	var fDate = (fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);  // added by sandip
	var toDate = ($("#lastDate").val()).split("/");
	var tDate = (toDate[2] + "-" + toDate[1] + "-" + toDate[0]);
	window.open("ehat_bulksettled_pdf.jsp?fromDate="+fDate+"&toDate="+tDate);
}



//Added by Rohini for remark to delete receipt .

function setRemarkpopupToDeleteReceipts(){
	
	$('#idremarkdeletereceipt').val('1');
	$("#modal-20").addClass("md-show");
}

function submitRemarkDeleteReceipt(){
	
    var recId =	$('#recId').val();	
    deleteMasterReceiptOPD(recId);
}

function closeRemarkpopupDeleteReceipt(){	
	$("#modal-20").removeClass("md-show");	
	$('#remarkdeletereceipt').val('');
	$('#idremarkdeletereceipt').val('0');
}

function cancelRemarkpopupCancelTest(){
	$("#modal-20").removeClass("md-show");
	$('#remarkdeletereceipt').val('');
	$('#idremarkdeletereceipt').val('0');	
	$('#recId').val('0');
	return false;
}






/************
* @author	: Rohini Ambhore
* @date		: 18-jan-2024
* @codeFor	: Set calculation part for discount
 ************/
function calDiscountLimit() { // previous function calDiscount check

	var disCounttype = $("#disCountLimitType").val();
	var discount=$("#discount").val();
	if(discount <= 100){
	if (disCounttype =="rupee") {
		
		var payable = $("#payable").val();
		var disc = $("#discount").val();
		var discAmtLimit = $("#disCountLimit1").val();
		var discAmt = (Number(payable) * Number(disc)) / 100;
		
		var discountAmt= $("#discountAmt").val();
		var discountper= $("#discount").val();
		
		var hospitalName= $("#hospitalName").val();
		
		if(hospitalName=="Siddhivinayak"){
			$("#discountAmt").val(0);
			calAllAmtDiscount();
			
		}else{
			var r = confirm("Are You Sure Want To Give Discount Of "+ disc+" %");
			if (r == true) {
				$("#userNameandpasswordPopUp").show();
				$("#discountAmt").val(0);
				return false;
			}
			$("#discount").val(0);
			$("#payNow").val(0);
			$("#discountAmt").val(0);
		}

	}else

	{	
		var payable = $("#payable").val();
		var disc = $("#discount").val();
		var discAmtLimit = $("#disCountLimit1").val();
		var discAmt = (Number(payable) * Number(disc)) / 100;
		
		var discountAmt= $("#discountAmt").val();
		var discountper= $("#discount").val();
		
		var hospitalName= $("#hospitalName").val();
		
		if(hospitalName=="Siddhivinayak"){
			$("#discountAmt").val(0);
			calAllAmtDiscount();
			
		}else{
			var r = confirm("Are You Sure Want To Give Discount Of "+ disc+" %");
			if (r == true) {
				$("#userNameandpasswordPopUp").show();
				$("#discountAmt").val(0);
				return false;
			}
			$("#discount").val(0);
			$("#payNow").val(0);
			$("#discountAmt").val(0);
		}
			
		
		

	}
	}else{
		alert("Discount Percentage should be less than 100");
		$("#discount").val(0);
		$("#payNow").val(0);
		$("#discountAmt").val(0);
	}
}


function calDiscountPerLimit(){//previous function calDiscountPer check


	var disCounttype = $("#disCountLimitType").val();
	var discountAmt=$("#discountAmt").val();
	var payable123=$("#payable").val();
	
	if(parseInt(discountAmt) <= parseInt(payable123)){
	if (disCounttype =="rupee") {
		var payable=$("#payable").val();
		var discAmt=$("#disCountLimit1").val();
		var dis=$("#discountAmt").val();
		var discPer=(Number(dis)/Number(payable))*100;
		var amount = dis;
		
		if(hospitalName=="Siddhivinayak"){
			var discountAmt= $("#discountAmt").val();
			var discountper= $("#discount").val();
			$("#discountAmt").val(discountAmt);
			$("#discount").val(discountper);
			calAllAmtDiscount();
		}else{
			
			var r = confirm("Are You Sure Want To Give Discount On This Amount..!!");
			if (r == true) {
				 $("#userNameandpasswordPopUp").show();
				 $("#discount").val(0);
	        	 return false;
			}else{
			 $("#payable").val(payable);
			 $("#payNow").val(payable);
			 $("#payNow").val(0);
			 $("#discount").val(0);
			 $("#discountAmt").val(0);
			}
		}	
		

		
		
		   
	}else
		{
		
		var payable=$("#payable").val();
		var discAmt=$("#disCountLimit1").val();
		var dis=$("#discountAmt").val();
		var discPer=(Number(dis)/Number(payable))*100;
		
		var hospitalName= $("#hospitalName").val();
		
		if(hospitalName=="Siddhivinayak"){
			
			$("#discountAmt").val(discountAmt);
			$("#discount").val(discountper);
			calAllAmtDiscount();
			
		}else{
			var r = confirm("Are You Sure Want To Give Discount On This Amount..!!");
			if (r == true) {
				
				 $("#userNameandpasswordPopUp").show();
				 $("#discount").val(0);
	        	 return false;
			}else{
			 $("#payable").val(payable);
			 $("#payNow").val(payable);
			 $("#payNow").val(0);
			 $("#discount").val(0);
			 $("#discountAmt").val(0);
			}
			
		}
		
			
		    
		}
	}else{
			alert("Discount Amount should be less than Payable Amount");
			$("#discount").val(0);
			$("#payNow").val(0);
			$("#discountAmt").val(0);
		}
}


function checkUserNameandPasswordcalDiscountPerLimit() 
{
	
	 var userId = parseInt($("#discAuthSel").val());
	 var userName = $("#userName").val();
	 var userPassword = $("#userPassword").val();

	if (userName == "" || userPassword == "") {
		alert(" Please Fill All Details ");
		return false;
	}
	
	if (userId == "" || userId == undefined || userId == null ) {
		userId ==0;
		alert(" Please select Authorized Person ");
		return false;
	}
	var discountAmt = $("#discountAmt").val();
	var discountper = $("#discount").val();
	var inputs = [];
	inputs.push('userPassword=' + userPassword);
	inputs.push('userName=' + userName);
	inputs.push('userId=' + userId);

	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url  : "ehat/bill/checkUserNameandPasswordByRefundApproved",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			 var b = r.replace(/"/g, "");
			 if(b=="Invalid User Name or Password")
			 {
				alert("Invalid User Name or Password");
				return false;
				
			 }else
			 { 				
				 alert("Approved  Successfully");
				  
				    $("#userNameandpasswordPopUp").hide();
				    $("#userName").val('');
					$("#userPassword").val('');
					$('#userNameandpasswordPopUp').removeClass('fade');
					$('#userNameandpasswordPopUp').modal('hide');
				    $("#discountAmt").val(discountAmt);
					$("#discount").val(discountper);
					calAllAmtDiscount();
			 }   
		}
	});
}

function hideDispecedpopup1() {
	
	 $("#userNameandpasswordPopUp").hide();
	 $("#userName").val('');
	 $("#userPassword").val('');
	
	 $("#payNow").val(0);
	 $("#discount").val(0);
	 $("#discountAmt").val(0);
		 
}

function calAllAmtDiscount(){
	 var discountAmt = $("#discountAmt").val();
	 var discount = $("#discount").val();
	 var payable = $("#payable").val();
	 var payNow = 0;
	 if(discountAmt == 0){
		 var discAmt=(Number(payable)*Number(discount))/100;
		  payNow = payable - discAmt;
	/*	  alert(discAmt);*/
		 $("#payNow").val(payNow.toFixed(2));
		 $("#discountAmt").val(parseFloat(discAmt).toFixed(2));
	 }else if(discount == 0){
		 payNow = payable - discountAmt;
		 var discPer=(Number(discountAmt)/Number(payable))*100;
		 $("#payNow").val(payNow.toFixed(2));
		 $("#discount").val(parseFloat(discPer).toFixed(2));
	 }
}



//added by vishant @reason to distribute service wise amount for opd
function setOpdBillDetailsDistribute(){
	
	var treatmentId = $("#treatId").val();
	if(treatmentId!=null|| treatmentId!=""){
	
		jQuery.ajax({
			type : "POST",
			url : "ehat/bill/setOpdBillDetailsDistribute",
			data : {
				"treatmentId" : treatmentId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				
			}
		});
	}
}

//added by vishant @reason to distribute service wise amount for bulk settlement
function setBulkSettleDistributeOnload(){
	
	var treatmentId = $("#treatId").val();
	if(treatmentId!=null|| treatmentId!=""){
	
		jQuery.ajax({
			type : "POST",
			url : "ehat/bill/setBulkSettleDistributeOnload",
			data : {
				"treatmentId" : treatmentId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				
			}
		});
	}
}

/************
 * @author	: Vishant PAwar		
 * @date		: 1-April-2024
 * @codeFor	: save refund receipts // please check pre function  saveRefundBillDetails  if any changes for requriments 
  ************/
function saveRefundBillDetailscheck(callFrom){


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
	//var disNarrtn	= $("#narrSel").val(); 	
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
					
		}
	
	else if(payMode==4){
		
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
	
	var servIdsChecked=[]; 
	
	$('.slaveAddedRefund:checkbox:checked').each(function(){
		
		var id = $(this).attr("id");
		var splitId = id.replace( /^\D+/g, '');
		servIdsChecked.push(splitId);
	});
	
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
		url 	: "ehat/bill/saveRefundBillDetailsNew",
		error 	: function() {
					alert('Network Issue!!!');
				  },
		success : function(r) {
			
			if(r>0){
				
				alertify.success("Refund Receipt generated succesfully");
				
				receiptBillPrint("refund",r);
				window.location.reload(true);
			/*setTimeout(function() {
				var deptId= $("#deptId").val();
				if(deptId==1)
					sendMailToPatientIPD(treatmentId,"OPDRefund",r);
				else if(deptId==3){
					sendMailToPatientIPD(treatmentId,"DiagnosticRefund",r);
					}
				}, 2000);*/
			   
				
			}else if(r==-1){
				
				alertify.error("Amount should be less than paid");
			}else if(r==-2){
				
				alertify.error("Receipt is not generated to refund");
			}else{
				
				alertify.error("Network Issue");
			}
			
			resetAll(receiptOf);			
		}
	});
}

/************
 * @author	: Vishant Pawar		
  * @date		: 1-April-2024
 * @codeFor	: save refund receipts //modify approved  Authorized By username and password  
  ************/
 function saveRefundBillDetailsByApproved(callFrom) {

	var payNowConf = parseFloat($("#payNow").val());

	var r = confirm("Are You Sure You Want To Refund Amount :" + payNowConf);

	if (r == true) {

		$("#userNameandpasswordPopUpByRefund").show();
		return false;
	}
}
 
 

 /************
  * @author	: Vishant Pawar		
  * @date		: 1-April-2024
  * @codeFor	:  approved  Authorized By username and password  
   ************/ 
 
 function checkUserNameandPasswordByRefundApproved() 
 {
	var userId = parseInt($("#refAuthSel").val());
	var userName = $("#userNameref").val();
	var userPassword = $("#userPasswordref").val();

	if (userName == "" || userPassword == "") {
		alert(" Please Fill All Details ");
		return false;
	}

	if (userId == "" || userId == undefined || userId == null ) {
		userId ==0;
		alert(" Please select Authorized Person ");
		return false;
	}
	var inputs = [];
	inputs.push('userPassword=' + userPassword);
	inputs.push('userName=' + userName);
	inputs.push('userId=' + userId);

	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url  : "ehat/bill/checkUserNameandPasswordByRefundApproved",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			 var b = r.replace(/"/g, "");
			 if(b=="Invalid User Name or Password")
			 {
				alert("Invalid User Name or Password");
				return false;
				
			 }else
			 { 
					
				 alert("Approved  Successfully");
				 
				    $("#userNameandpasswordPopUpByRefund").hide();
				    $("#userNameref").val('');
					$("#userPasswordref").val('');
					$('#userNameandpasswordPopUpByRefund').removeClass('fade');
					$('#userNameandpasswordPopUpByRefund').modal('hide');
					saveRefundBillDetailscheck();
			 }
          
		}
	});
}
 
 /************
  * @author	: Vishant Pawar		
  * @date		: 1-April-2024
 * @codeFor	: Save total payble 
  ************/
 function checkAllRefundChk(mstId,callFrom){
 	
 	if(callFrom == "credit"){
 		
 		$("input[name='refundRd"+mstId+"']").each(function() {
 			
 			$(this).addClass("slaveAddedRefund");
 			$(this).removeClass("slaveNotAddedRefund");
 			$(this).prop('checked',true);
 	    	    	
 	    	mainRefundTotal(mstId,"master"); 	
 		});
 		
 	}else{
 		
 		if($("#chkForAllRefund"+mstId).prop("checked")){
 			
 			$("input[name='refundRd"+mstId+"']").each(function() {
 			
 				$(this).addClass("slaveAddedRefund");
 				$(this).removeClass("slaveNotAddedRefund");
 				$(this).prop('checked',true);
 		    	    	
 		    	mainRefundTotal(mstId,"master"); 	
 			});
 			
 		}else{
 			
 			$("input[name='refundRd"+mstId+"']").each(function() {
 				
 				$(this).addClass("slaveNotAddedRefund");
 				$(this).removeClass("slaveAddedRefund");				
 				$(this).prop('checked',false);
 				
 				$("#payNow").val(0.00);
 				$("#payable").val(0.00);
 			});
 		} 
 	}	
 }
 
 /************
  * @author	: Vishant Pawar		
  * @date		: 1-April-2024
  * @codeFor	:Hide pop_up username and password
   ************/
 function hideRefundpopup() {
		
	 $("#userNameandpasswordPopUpByRefund").hide();
	 $("#userName").val('');
	 $("#userPassword").val('');
	 
	 $("#payNow").val(0);
	 $("#refPer").val(0);
		 
	}
 
 
 /*******************************************************************************
  * @author : Vinod Udawant
  * @date : 23-oct-2017
  * @codeFor : Fetch Ipd bill discount
  ******************************************************************************/
 function fetchOpdbilDiscount(callFrom) {

 	// alert(callFrom);

 	var treatId = 0;

 	if (callFrom == "opdBill") {

 		treatId = $("#treatmentId").text();
 	}

 	/*
 	 * var unitId = parseInt($("#unitId").val()); var userId =
 	 * parseInt($("#userId").val()); var treatmentId =
 	 * parseInt($("#treatmentId").text()); var patientId =
 	 * $("#patientId").text();
 	 */

 	var inputs = [];

 	inputs.push("callFrom=" + callFrom);
 	inputs.push("treatmentId=" + treatId);
 	/*
 	 * inputs.push("unitId=" + unitId); inputs.push("userId=" + userId);
 	 * inputs.push("treatmentId=" + treatmentId); inputs.push("patientId=" +
 	 * patientId);
 	 */
 	var str = inputs.join('&');
 	jQuery.ajax({
 		async : false,
 		type : "POST",
 		data : str + "&reqType=AJAX",
 		url : "ehat/opdbill/fetchOpdbilDiscount",
 		success : function(r) {

 			if (callFrom == "Hospital") {

 				setOpdbilDiscount(r);

 			}else if (callFrom == "ApprovedDiscount") {
 				                   
 				setOpdbilApprovedDiscount(r);
 			} else {

 				setPatientTotalDiscOPD(r, treatId);
 			}
 		}
 	});
 }
 

 function setOpdbilDiscount(r) {	//alert(JSON.stringify(r));
  
 	var tdata = "";
 	var countH = 0;
 	
 	if(r.listBillReceiptMaster.length==0){
 		tdata += "<tr style='height:30px;  color:red; font-size:30px;'><th class='center' colspan='10'>Record Not Found...!!!</th></tr>";
 		$("#hospCount").text(r.listBillReceiptMaster.length);
 	}
 	for ( var i = 0; i < r.listBillReceiptMaster.length; i++) {

 		if (r.listBillReceiptMaster[i].approvedStat == "N") {			

 			tdata = tdata
 					+ "<tr>"
 					+ "<td class='col-md-1-1'>"
 					+ (i + 1)
 					+ "</td> "
 					+ "<td class='col-md-2-1'>"
 					+ r.listBillReceiptMaster[i].patientName
 					+ "</td>"
 					/*+ "<td class='col-md-1-1'>"
 					+ r.listBillReceiptMaster[i].patientId
 					+ "</td>"*/
 					+ "<td class='col-md-1-1'>"
 					+ r.listBillReceiptMaster[i].centerPatientId
 					+ "</td>"
 					
 					+ "<td class='col-md-1-1' id='totalPayble"
 					+ r.listBillReceiptMaster[i].totalAmt
 					+ "'>"
 					+ r.listBillReceiptMaster[i].totalAmt
 					+ "</td>"
 					+ "<td class='col-md-1-1' id='givenDisc"
 					+ r.listBillReceiptMaster[i].billReceiptId
 					+ "'>"
 					+ r.listBillReceiptMaster[i].discountApprovelAmt
 					+ "</td>"
 					+ "<td class='col-md-1-1'><input type='text' class='form-control' id='approved"
 					+ r.listBillReceiptMaster[i].billReceiptId
 					+ "' value='"
 					+ r.listBillReceiptMaster[i].discountApprovelAmt
 					+ "'></td>"
 					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' id='remark"
 					+ r.listBillReceiptMaster[i].billReceiptId
 					+ "' value='"
 					+ r.listBillReceiptMaster[i].discRemark
 					+ "'>"+r.listBillReceiptMaster[i].discRemark+"</textarea></td>"
 					//+ "'></textarea></td>"
 					/*+ "<td class='col-md-1-1'><input type='text' class='form-control' id='Authorized by"
 					+ r.listBillReceiptMaster[i].billDiscountId
 					+ "'></td>"*/
 					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' id='userName"+r.listBillReceiptMaster[i].billReceiptId+"' " +
 					"value='"+ r.listBillReceiptMaster[i].userName+ "' disabled>"+ r.listBillReceiptMaster[i].userName+ "</textarea></td>"
 					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' id='discRemark"+r.listBillReceiptMaster[i].billReceiptId+"' " +
 						"value='"+ r.listBillReceiptMaster[i].approvedRemark+ "'>"+ r.listBillReceiptMaster[i].approvedRemark+" </textarea></td>"
 					+ "<td class='col-md-2-1 center'><label class='TextFont'><button class='btn btn-xs btn-primary' onclick='saveApprovedDiscountOPD("
 					+ r.listBillReceiptMaster[i].billReceiptId
 					+ ")'>Approve</button></label></td>" + "</tr>";
 			
 			countH = countH + 1;
 		}
 	}
 	// tdata = tdata +"</tbody></table>";
 	$("#BillContainer").html(tdata);
 	$("#hospCount").text(countH);
 };

 //added by vishant
 function setOpdbilApprovedDiscount(r) {	//alert(JSON.stringify(r));
 	 
 	var tdata = "";
 	var countH = 0;
 	
 	if(r.listBillReceiptMaster.length==0){
 		tdata += "<tr style='height:30px;  color:red; font-size:30px;'><th class='center' colspan='10'>Record Not Found...!!!</th></tr>";
 		$("#hospCount").text(r.listBillReceiptMaster.length);
 	}
 	
 	for ( var i = 0; i < r.listBillReceiptMaster.length; i++) {

 		if (r.listBillReceiptMaster[i].approvedStat == "Y") {			

 			tdata = tdata
 					+ "<tr>"
 					+ "<td class='col-md-1-1'>"
 					+ (i + 1)
 					+ "</td> "
 					+ "<td class='col-md-2-1'>"
 					+ r.listBillReceiptMaster[i].patientName
 					+ "</td>"
 					/*+ "<td class='col-md-1-1'>"
 					+ r.listBillReceiptMaster[i].patientId
 					+ "</td>"*/
 					+ "<td class='col-md-1-1'>"
 					+ r.listBillReceiptMaster[i].centerPatientId
 					+ "</td>"
 					
 					+ "<td class='col-md-1-1'>"
 					+ r.listBillReceiptMaster[i].totalAmt
 					+ "</td>"
 					+ "<td class='col-md-1-1' disabled id='givenDisc" 
 					+ r.listBillReceiptMaster[i].billReceiptId
 					+ "'>"
 					+ r.listBillReceiptMaster[i].discountApprovelAmt
 					+ "</td>"
 					+ "<td class='col-md-1-1'><input type='text' disabled class='form-control' id='approved"
 					+ r.listBillReceiptMaster[i].bill_receipt_id
 					+ "' value='"
 					+ r.listBillReceiptMaster[i].discountApprovedAmt
 					+ "'></td>"
 					+ "<td class='col-md-1-1'><textarea type='text' disabled class='form-control' id='remark"
 					+ r.listBillReceiptMaster[i].billReceiptId
 					+ "' value='"
 					+ r.listBillReceiptMaster[i].discRemark
 					+ "'>"+r.listBillReceiptMaster[i].discRemark+"</textarea></td>"
 					/*+ "<td class='col-md-1-1'><input type='text' class='form-control' id='Authorized by"
 					+ r.listBillReceiptMaster[i].billDiscountId
 					+ "'></td>"*/
 					+ "<td class='col-md-1-1'><textarea type='text' class='form-control' id='discRemark"+r.listBillReceiptMaster[i].billReceiptId+"' " +
 					"value='"+ r.listBillReceiptMaster[i].userName+ "' disabled>"+ r.listBillReceiptMaster[i].userName+ "</textarea></td>"
 					+ "<td class='col-md-1-1'><textarea type='text' disabled class='form-control' id='discRemark"+r.listBillReceiptMaster[i].billReceiptId+"' " +
 						"value='"+ r.listBillReceiptMaster[i].approvedRemark+ "'>"+ r.listBillReceiptMaster[i].approvedRemark+" </textarea></td>"
 					/*+ "<td class='col-md-2-1 center'><label class='TextFont'><button class='btn btn-xs btn-primary' onclick='saveApprovedDiscountOPD("
 					+ r.listBillReceiptMaster[i].billReceiptId
 					+ ")'>Approve</button></label></td>"*/
 					+ "</tr>";
 			
 			countH = countH + 1;
 		}
 	}
 	// tdata = tdata +"</tbody></table>";
 	$("#ApprovedDiscountBill").html(tdata);
 	$("#hospCount").text(countH);
 };
 
 
 /*******************************************************************************
  * @author : Vishant Pawar
  * @date : 10-April-2024
  * @codeFor : Save ipdbill discount
  ******************************************************************************/
 function saveApprovedDiscountOPD(discId) {

 	var callFrom = "hospital";
 	var userId = parseInt($("#userId").val());
 	var approvedAmt = $("#approved" + discId).val();
 	var remark = $("#remark" + discId).val();
 	var discRemark = $("#discRemark" + discId).val();
 	var givenDisc = $("#givenDisc" + discId).html();

 	if (Number(approvedAmt) > Number(givenDisc)) {

 		alert("Approved amount should be less than given discount");
 		$("#approved" + discId).val(givenDisc);
 		$("#approved" + discId).focus();
 		return false;
 	}

 	var inputs = [];
 	inputs.push("discId=" + discId);
 	inputs.push("userId=" + userId);
 	inputs.push("approvedAmt=" + approvedAmt);
 	inputs.push("remark=" + remark);
 	inputs.push("discRemark=" + discRemark);
 	inputs.push("callFrom=" + callFrom);
 	var str = inputs.join('&');
 	jQuery.ajax({
 		async : true,
 		type : "POST",
 		data : str + "&reqType=AJAX",
 		url : "ehat/opdbill/saveApprovedDiscountOPD",
 		timeout : 1000 * 60 * 15,
 		cache : false,
 		error : function() {
 			alert('Network Issue');
 		},
 		success : function(r) {

 			if (r == 1) {

 				alert("Discount approved successfully");
 				setOpdBillDetailsDistribute();
 			} else {

 				alert("Network Issue");
 			}
 			

 			location.reload();
 		}
 	});
 }
 
 //added by vishant
 function setPatientTotalDiscOPD(r, treatId) {

		var totDisc = 0;
		var discTbl = "";
		for ( var i = 0; i < r.listBillReceiptMaster.length; i++) {

			var approvedAmt = r.listBillReceiptMaster[i].discountApprovedAmt;
			var totalDisc = r.listBillReceiptMaster[i].discountApprovedAmt;
			var approvelAmt = r.listBillReceiptMaster[i].discountApprovelAmt;
			var narrtn = r.listBillReceiptMaster[i].narrationName;

			if (r.listBillReceiptMaster[i].treatmentId == treatId
					&& r.listBillReceiptMaster[i].approvedStat == "Y") {

				totDisc = Number(totDisc) + Number(approvedAmt);

				if (narrtn == "null") {

					narrtn = "-";
				}

				discTbl = discTbl
						+ '<tr><td style="border-top: none;" class="numeric col-md-6-1">'
						+ narrtn
						+ '</td>'
						+ '<td style="border-top: none;" class="numeric col-md-0-1">'
						+ approvedAmt
						+ '</td> '
						/*
						 * + '<td style="border-top: none;" class="numeric col-md-0-1"> ' + '<button
						 * class="btn btn-xs btn-success editUserAccess"
						 * value="EDIT" onclick=""> ' + '<i class="fa fa-edit"></i></button></td> ' + '<td style="border-top:none ;" class="numeric col-md-0-1"> ' + '<button
						 * class="btn btn-xs btn-danger deleteUserAccess"
						 * value="DELETE" onclick=""> ' + '<i class="fa
						 * fa-trash-o"></i></button> ' + '<input type="hidden"
						 * value="Hospital" id="discStatus94"></td> '
						 */
						+ '<td style="border-top: none;color: green;" class="numeric col-md-0-1"> '
						+ '<i class="fa fa-thumbs-up"></i>	</td></tr>';

			} else if (r.listBillReceiptMaster[i].treatmentId == treatId
					&& r.listBillReceiptMaster[i].approvedStat == "N") {

				discTbl = discTbl
						+ '<tr><td style="border-top: none;" class="numeric col-md-6-1">'
						+ narrtn
						+ '</td>'
						+ '<td style="border-top: none;" class="numeric col-md-0-1">'
						+ approvelAmt
						+ '</td> '
						/*
						 * + '<td style="border-top: none;" class="numeric col-md-0-1"> ' + '<button
						 * class="btn btn-xs btn-success editUserAccess"
						 * value="EDIT" onclick=""> ' + '<i class="fa fa-edit"></i></button></td> ' + '<td style="border-top:none ;" class="numeric col-md-0-1"> ' + '<button
						 * class="btn btn-xs btn-danger deleteUserAccess"
						 * value="DELETE" onclick=""> ' + '<i class="fa
						 * fa-trash-o"></i></button> ' + '<input type="hidden"
						 * value="Hospital" id="discStatus94"></td> '
						 */
						+ '<td style="border-top: none;color: red;" class="numeric col-md-0-1"> '
						+ '<i class="fa fa-spinner fa-spin fa-0x fa-fw"></i></td></tr>';
			}
		}

		$("#finalDiscount").html(parseFloat(totDisc).toFixed(2));
		$("#overalldisount").val(parseFloat(totDisc).toFixed(2));

		var payable = $("#payable").val();
		var payNow = payable - totDisc;
		// $("#payNow").val(parseFloat(payNow).toFixed(2));
		$("#listDiscount").html(discTbl);
	}

 
 function autosuggesstionDiscApprovedOPD(input,callfrom){
	 	
	 	var usertype = "Y";
	 	var letter="";	 	
	 	 		 letter=    $("#byName2").val();
	 	 		
	 	 		
	    // var findingName = $("#" + inputId).val();
	         var inputs = [];
	         //inputs.push('findingName=' + findingName);
	         inputs.push('usertype=' + usertype);
	         inputs.push('callfrom=' + callfrom);
	         inputs.push('letter=' + letter);
	        
	         var str = inputs.join('&');
	 	jQuery.ajax({
	 		async 	: false,
	 		type 	: "POST",
	 		data 	: str + "&reqType=AJAX",
	  		url 	: "ehat/opdbill/autosuggesstionDiscApprovelOPD",
	 		 
	 		error 	: function() {
	 			alert('error');
	 		},
	 		success : function(r) {
	 			ajaxResponse = r;
	 			setOpdbilApprovedDiscount(r);
//	 			setIpdbilDiscount(r);
	   		// setpatientForTreatment(r);
	   		//autoCompTableforpreviousTreatment(r, inputId);
	 		}
	 	});
	 
}
