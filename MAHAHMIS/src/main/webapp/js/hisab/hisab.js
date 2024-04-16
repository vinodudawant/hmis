
/************
* @author	: Vinod Udawant
* @date		: 27-Sept-2016
* @codeFor	: Fetching diagnosis Hisab
 ************/
function showDiagnosisHisab(operation) {

	$("#operation").val(operation);
	
	var selectService = $("#txtSelectService").val();
	var selectedDate = $("#txtcurrentDate").val();	
	var toDate = $("#toDate").val();
	
	var inputs = [];
	inputs.push('action=showDiagnosisHisab');
	inputs.push('selectService=' + selectService);
	inputs.push('operation=' + operation);
	inputs.push('selectedDate=' + selectedDate);
	inputs.push('toDate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "HisabServlet",
		timeout	: 1000 * 60 * 6,
		cache	: false,
		success	: function(r) {
			
			var data = eval('('+r+')');
			
			var templateForDiagnosis="<tr>";
			var templateForDiagnosisRefund="<tr>";
			var templateForTotalHisab="<tr>";
			var counterUp =1;
			var counterDown =1;
			var totalDiagnosisAmout=0,receiptCash=0,receiptNonCash=0;
			var totalDiagnosisRefund=0,refundCash=0,refundNonCash=0;
			var totalCash=0;
			var totalDiscount=0;
				
			for(var i=0;i<data.dList.length;i++)
			{					
				if(data.dList[i].refundFlag=="Y") // refundFlag='Y' means Receipt is generated
				{
					// Template for display receipt details
					templateForDiagnosis=templateForDiagnosis+"<td class='col-md-1 center'>"+counterUp+"</td>"
					+"<td class='col-md-4 center'>"+data.dList[i].patientName+"</td>"
					+"<td class='col-md-3 center'>"+data.dList[i].refundAgainstReceiptId+" &nbsp-&nbsp "+data.dList[i].refundAgainstComponentId+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].totalTestAmount+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].unpaidAmount+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].refundAmount+"</td>"
			        +"</tr>";							
					
					totalDiagnosisAmout=totalDiagnosisAmout+data.dList[i].refundAmount;
					
					if(data.dList[i].paymentMode=="Cash"){
						refundCash=refundCash+data.dList[i].refundAmount;
					}
					else{
						refundNonCash=refundNonCash+data.dList[i].refundAmount;
					}				
					counterUp++;
				}				
				else // refundFlag='N' means Refund Receipt is generated
				{
					// Template for display Refund details
					templateForDiagnosisRefund=templateForDiagnosisRefund+"<td class='col-md-1 center'>"+counterDown+"</td>"
					+"<td class='col-md-4 center'>"+data.dList[i].patientName+"</td>"
					+"<td class='col-md-3 center'>"+data.dList[i].receiptId+" &nbsp-&nbsp "+data.dList[i].componentId+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].totalTestAmount+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].discountAmount+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].paidAmount+"</td>"
					+"</tr>";
					
					totalDiagnosisRefund=totalDiagnosisRefund+data.dList[i].paidAmount;	
					totalDiscount=totalDiscount+data.dList[i].discountAmount;
					
					if(data.dList[i].paymentMode=="Cash"){
						receiptCash=receiptCash+data.dList[i].paidAmount;
					}
					else{
						receiptNonCash=receiptNonCash+data.dList[i].paidAmount;
					}						
					counterDown++;
				}	
								
				totalCash =totalDiagnosisRefund-totalDiagnosisAmout;														
			}
			
			// Template for display total receipt, total Refund & total Cast
			templateForTotalHisab="<td class='col-md-3 center'>"+totalDiagnosisRefund+"</td>"
			+"<td class='col-md-3 center'>"+totalDiagnosisAmout+"</td>"
			+"<td class='col-md-3 center'>"+totalDiscount+"</td>"
			+"<td class='col-md-3 center'>"+totalCash+"</td>"
			+"</tr>";
			
			// Set three templates in tables
			$("#tableTestDash").html(templateForDiagnosisRefund);
			$("#tableTestVoucharList").html(templateForDiagnosis);	
			$("#tableTestVouchar").html(templateForTotalHisab);	
			
			// set hidden fields for cash	
			$("#diagTotalReceipt").val(receiptCash);
			$("#diagTotalRefund").val(refundCash);
		
			// set hidden fields for non-cash			
			$("#diagNonCashReceipt").val(receiptNonCash);
			$("#diagNonCashRefund").val(refundNonCash);			
		}
	});	
}

/***********
* @author	: Vinod Udawant
* @date		: 10-Oct-2016
* @codeFor	: Close & Print diagnosis Hisab
************/
function printData()
{
	var didConfirm = confirm("Are you sure want to close hisab now?");
	if (didConfirm) 
	{		
		var selectService = $("#txtSelectService").val();
		var inputs = [];
		inputs.push('action=closeDiagnosisHisab');
		inputs.push('selectService=' + selectService);
		var str = inputs.join('&');
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "HisabServlet",
			timeout : 1000 * 60 * 6,
			cache	: false,
			success : function(r) {
				
				ajaxResponse = r;				
				alert(r);			
			}
		});	
	}
}

/************
* @author	: Vinod Udawant
* @date		: 13-Oct-2016
* @codeFor	: Clear diagnosis Hisab
*************/
function clearDiagnosisHisab()
{
	$("#tableTestDash").empty();
	$("#tableTestVoucharList").empty();
	$("#txtTotalAmount").val('');
	$("#txtTotalAmount1").val('');
	$("#txtTotalAmount2").val('');	
	$("#tableTestVouchar").empty();
}

/************
* @author	: Vinod Udawant
* @date		: 14-Oct-2016
* @codeFor	:Validate date before close diagnosis Hisab
*************/

function validateDateToCloseHisab()
{
	$("#btnPrint").removeAttr('disabled');
	var selDate= $("#txtcurrentDate").val();
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) // if date is single digit then add 0 to prior 
	{
	    dd='0'+dd;
	} 

	if(mm<10) // if month is single digit then add 0 to prior 
	{
	    mm='0'+mm;
	} 
	today = yyyy+'-'+mm+'-'+dd;
	
	if(today!=selDate) //if selected date != taday date then disable print button
	{
		$("#btnPrint").attr('disabled','true');
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 14-Oct-2016
* @codeFor	: Export to pdf & Print diagnosis Hisab
*************/
function exportToPdfDiag()
{	
	var selectService = $("#txtSelectService").val();
	var selectedDate = $("#txtcurrentDate").val();
	var operation=$("#operation").val();
	if(operation!="") // operation means onclick-(show current data button) or search(show button)
	{
		window.open("hisabDiagnosisPrint.jsp?selectService=" + selectService +"&selectedDate="+ selectedDate + "&operation="+operation );
	}
	else // if operation ="" then show alert
	{
		alert("Please click on show or show current data button");
	}
}

/************
* @author	: Vinod Udawant
* @date		: 24-Oct-2016
* @codeFor	: Fetching opd Hisab
*************/
function showOpdHisab(operation) {
	
	$("#operation").val(operation);
		
	var selectService = $("#txtSelectService").val();
	var selectedDate = $("#txtcurrentDate").val();
	var toDate = $("#toDate").val();
	
	var inputs = [];
	inputs.push('action=showOpdHisab');
	inputs.push('selectService=' + selectService);
	inputs.push('operation=' + operation);
	inputs.push('selectedDate=' + selectedDate);
	inputs.push('toDate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "HisabServlet",
		timeout : 1000 * 60 * 6,
		cache	: false,
		success : function(r) {
			
			var data = eval('('+r+')');
			
			var templateForDiagnosis="<tr>";
			var templateForDiagnosisRefund="<tr>";
			var templateForTotalHisab="<tr>";
			var counterUp =1;
			var counterDown =1;
			var totalDiagnosisAmout=0,receiptCash=0,receiptNonCash=0;
			var totalDiagnosisRefund=0,refundCash=0,refundNonCash=0;
			
			var totalCash=0;
			var totalDiscount=0;
				
			for(var i=0;i<data.dList.length;i++)
			{					
				if(data.dList[i].refundFlag=="Y") // refundFlag='Y' means Receipt is generated
				{
					// Template for display receipt details
					templateForDiagnosis=templateForDiagnosis+"<td class='col-md-1 center'>"+counterUp+"</td>"
					+"<td class='col-md-3 center'>"+data.dList[i].patientName+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].doctorName+"</td>"
					+"<td class='col-md-3 center'>"+data.dList[i].refundAgainstReceiptId+" &nbsp-&nbsp "+data.dList[i].refundAgainstComponentId+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].totalTestAmount+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].unpaidAmount+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].refundAmount+"</td>"
			        +"</tr>";
											
					totalDiagnosisAmout=totalDiagnosisAmout+data.dList[i].refundAmount;	
					
					if(data.dList[i].paymentMode=="Cash"){
						refundCash=refundCash+data.dList[i].refundAmount;
					}else{
						refundNonCash=refundNonCash+data.dList[i].refundAmount;
					}						
					counterUp++;
				}				
				else  // refundFlag='N' means Refund Receipt is generated
				{
					// Template for display Refund details
					templateForDiagnosisRefund=templateForDiagnosisRefund+"<td class='col-md-1 center'>"+counterDown+"</td>"
					+"<td class='col-md-3 center'>"+data.dList[i].patientName+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].doctorName+"</td>"
					+"<td class='col-md-3 center'>"+data.dList[i].receiptId+" &nbsp-&nbsp "+data.dList[i].componentId+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].totalTestAmount+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].discountAmount+"</td>"
					+"<td class='col-md-1 center'>"+data.dList[i].paidAmount+"</td>"
					+"</tr>";
					
					totalDiagnosisRefund=totalDiagnosisRefund+data.dList[i].paidAmount;		
					totalDiscount=totalDiscount+data.dList[i].discountAmount;
					
					if(data.dList[i].paymentMode=="Cash"){
						receiptCash=receiptCash+data.dList[i].paidAmount;
					}else{
						receiptNonCash=receiptNonCash+data.dList[i].paidAmount;
					}
					counterDown++;
				}					
				totalCash =totalDiagnosisRefund-totalDiagnosisAmout;															
			}			
			
			// Template for display total receipt, total Refund & total Cast
			templateForTotalHisab="<td class='col-md-3 center'>"+totalDiagnosisRefund+"</td>"
			+"<td class='col-md-3 center'>"+totalDiagnosisAmout+"</td>"
			+"<td class='col-md-3 center'>"+totalDiscount+"</td>"
			+"<td class='col-md-3 center'>"+totalCash+"</td>"
			+"</tr>";
			
			// Set three templates in tables
			$("#tableTestDash").html(templateForDiagnosisRefund);
			$("#tableTestVoucharList").html(templateForDiagnosis);	
			$("#tableTestVouchar").html(templateForTotalHisab);	
			
			// set hidden fields for cash		
			$("#opdTotalReceipt").val(receiptCash);
			$("#opdTotalRefund").val(refundCash);
		
			// set hidden fields for non-cash			
			$("#opdNonCashReceipt").val(receiptNonCash);
			$("#opdNonCashRefund").val(refundNonCash);	
		}
	});	
}

/************
* @author	: Vinod Udawant
* @date		: 24-Oct-2016
* @codeFor	: Close & Print Opd Hisab
*************/
function closeOpdHisab()
{
	var didConfirm = confirm("Are you sure want to close hisab now?");
	if (didConfirm) 
	{		
		var selectService = $("#txtSelectService").val();
		var inputs = [];
		inputs.push('action=closeOpdHisab');
		inputs.push('selectService=' + selectService);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "HisabServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			success : function(r) {
				
				ajaxResponse = r;				
				alert(r);			
			}
		});	
	}
}

/************
* @author	: Vinod Udawant
* @date		: 24-Oct-2016
* @codeFor	: Export to pdf & Print OPD Hisab
*************/
function exportToPdfOpd()
{	
	var selectService = $("#txtSelectService").val();
	var selectedDate = $("#txtcurrentDate").val();
	var operation=$("#operation").val();
	if(operation!="") // operation means onclick-(show current data button) or search(show button)
	{
		window.open("hisabOpdPrint.jsp?selectService=" + selectService +"&selectedDate="+ selectedDate + "&operation="+operation );
	}
	else // if operation="" then show alert
	{
		alert("Please click on show or show current data button");
	}
}

/************
* @author	: Vinod Udawant
* @date		: 11-Nov-2016
* @codeFor	: Fetching IPD Hisab
*************/
function showIPDHisab(operation) {
	
	$("#operation").val(operation);
	var selectedDate = $("#txtcurrentDate").val();
	var toDate = $("#toDate").val();
	
	var inputs = [];
	inputs.push('action=showIPDHisab');	
	inputs.push('operation=' + operation);
	inputs.push('selectedDate=' + selectedDate);
	inputs.push('toDate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "HisabServlet",
		timeout : 1000 * 60 * 6,
		cache : false,
		success : function(r) {
			
			var data = eval('('+r+')');
			
			var templateForIPDReceipt="<tr>";
			var templateForIPDRefund="<tr>";
			var templateForIPDDiscount="<tr>";
			var templateForTotalHisab="<tr>";
			var counterReceipt =1;
			var counterRefund =1;
			var counterDiscount =1;
			var totalIPDAmount=0;
			var totalIPDRefund=0;
			var totalIPDDiscount=0;
			var totalCash=0;
				
			for(var i=0;i<data.dList.length;i++)
			{
				// refundFlag='N' & discountFlag='N' means Receipt is generated
				if(data.dList[i].refundFlag=="N" && data.dList[i].discountFlag=="N")
				{
					// Template for display receipt details
					templateForIPDReceipt=templateForIPDReceipt+"<td class='col-md-1 center'>"+counterReceipt+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].receiptDate+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].receiptMRNo+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].receiptRegNo+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].billType+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].totalAmount+"</td>"						
			        +"</tr>";
					
					totalIPDAmount=totalIPDAmount+data.dList[i].totalAmount;						
					counterReceipt++;						
				}				
				if(data.dList[i].refundFlag=="Y") // refundFlag='Y' means Refund Receipt is generated
				{
					// Template for display Refund details
					templateForIPDRefund=templateForIPDRefund+"<td class='col-md-1 center'>"+counterRefund+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].receiptDate+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].refundMRNo+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].refundRegNo+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].refundAmount+"</td>"						
					+"</tr>";
					
					totalIPDRefund=totalIPDRefund+data.dList[i].refundAmount;
					counterRefund++;
				}
				if(data.dList[i].discountFlag=="Y") // discountFlag='Y' means discount Receipt is generated
				{
					templateForIPDDiscount=templateForIPDDiscount+"<td class='col-md-1 center'>"+counterDiscount+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].discountBillNo+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].discountAmount+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].discountRegId+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].totalAmount+"</td>"
					+"<td class='col-md-2 center'>"+data.dList[i].narration+"</td>"
					+"</tr>";
					
					totalIPDDiscount=totalIPDDiscount+data.dList[i].discountAmount;						
					counterDiscount++;						
				}				
				totalCash =totalIPDAmount-totalIPDRefund;													
			}
			
			// Template for display total receipt, total Refund & total Cash
			templateForTotalHisab="<td class='col-md-3 center'>"+totalIPDAmount+"</td>"
			+"<td class='col-md-3 center'>"+totalIPDDiscount+"</td>"
			+"<td class='col-md-3 center'>"+totalIPDRefund+"</td>"
			+"<td class='col-md-3 center'>"+totalCash+"</td>"
			+"</tr>";
			
			// Set data in four tables
			$("#tableReceiptDetails").html(templateForIPDReceipt);
			$("#tableDiscountDetails").html(templateForIPDDiscount);	
			$("#tableRefundDetails").html(templateForIPDRefund);	
			$("#tableTotalHisab").html(templateForTotalHisab);	
			
			// Set hidden fields
			$("#ipdTotalReceipt").val(totalIPDAmount);
			$("#ipdTotalRefund").val(totalIPDRefund);
			$("#ipdTotalDiscount").val(totalIPDDiscount);				
		}
	});	
}

/************
* @author	: Vinod Udawant
* @date		: 11-Nov-2016
* @codeFor	: Close & Print IPD Hisab
*************/
function closeIPDHisab()
{
	var didConfirm = confirm("Are you sure want to close hisab now?");
	if (didConfirm) 
	{
		var inputs = [];
		inputs.push('action=closeIPDHisab');		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "HisabServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			success : function(r) {				
				ajaxResponse = r;				
				alert(r);			
			}
		});	
	}
}

/************
* @author	: Vinod Udawant
* @date		: 15-Nov-2016
* @codeFor	: Export to pdf & Print IPD Hisab
*************/
function exportToPdfIPD()
{
	var selectedDate = $("#txtcurrentDate").val();
	var operation=$("#operation").val();
	if(operation!="") // operation means onclick-(show current data button) or search(show button)
	{
		window.open("hisabIPDPrint.jsp?selectedDate="+ selectedDate + "&operation="+operation );
	}
	else // if operation="" then show alert
	{
		alert("Please click on show or show current data button");
	}
}

/************
* @author	: Vinod Udawant
* @date		: 15-Nov-2016
* @codeFor	: Clear IPD Hisab
*************/
function clearIPDHisab()
{
	$("#tableReceiptDetails").empty();
	$("#tableDiscountDetails").empty();
	$("#tableRefundDetails").empty();
	$("#tableTotalHisab").empty();	
}

/************
* @author	: Vinod Udawant
* @date		: 21-Nov-2016
* @codeFor	: Get Last closed hisab
*************/
function lastClosedHisab()
{
	var currentDate=$("#currentDate").val();
	var inputs = [];
	inputs.push('action=lastClosedHisab');		
	inputs.push('currentDate='+currentDate);		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "HisabServlet",
		timeout : 1000 * 60 * 6,
		cache : false,
		success : function(r) {				
			
			$("#allDates").val(r);
		}
	});	
}

/************
* @author	: Vinod Udawant
* @date		: 24-Nov-2016
* @codeFor	: Fetching all/ByName vouchers 
 ************/
function defaultViewVoucher(actionFlag) 
{
	var inputs = [];
	inputs.push('action=fetchVouchers');	
	inputs.push('actionFlag=' + actionFlag);	
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache	: false,
		success : function(res) {

			var ajaxResponse = res;
			pobj1 = eval('(' + ajaxResponse + ')');
			//$("#voucherDetails").html(ajaxResponse); 			
			
			// Set voucher names in dropdown used for General Vouchers 
			$("#voucherType").setTemplate("{#foreach $T.voucherList as tl}<option value='{$T.tl.voucherID}' >{$T.tl.voucherName}</option>{#/for}<option value='Expense Voucher'>Expense Voucher</option><option value='Motivator Voucher'>Motivator Voucher</option>");
			$("#voucherType").processTemplate(pobj1);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 24-Nov-2016
* @codeFor	: Fetching vouchers Hisab
 ************/
function showVouchersHisab(callFrom) {

	$("#operation").val(callFrom);	
	var selectedDate = $("#txtcurrentDate").val();
	var toDate = $("#toDate").val();
	
	var inputs = [];
	inputs.push('action=showCashVoucherHisab');
	inputs.push('operation=' + callFrom);	
	inputs.push('selectedDate=' + selectedDate);
	inputs.push('toDate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "HisabServlet",
		timeout	: 1000 * 60 * 6,
		cache	: false,
		success	: function(r) {
			
			var data = eval('('+r+')');
			
			var templateForGeneratedVouchers="";
			var templateForCancelledVouchers="";
			var templateForTotalHisab="<tr>";
			var templateForVoucherDetailsPopup="";
			var templateForVoucherDetailsFromToPopup="";
			var counterUp =1;
			var counterDown =1;
			var totalGeneratedAmount=0,generated=0;
			var totalCancelledAmount=0,cancelled=0;
			var cash=0;
			var totalExpense=0;
			if(callFrom=="onclick") // Set following templates if callfrom="onclick"
			{
				$("#voucherType option").each(function()
				{
					var voucherTypeId=$(this).val();	
					counterUp=1;
					counterDown =1;
					generated=0;
					cancelled=0;
					for(var i=0;i<data.lstHisabVouchers.length;i++)
					{					
						if(data.lstHisabVouchers[i].voucherType==voucherTypeId && data.lstHisabVouchers[i].cancelFlag=="N") // fetch generated vouchers of current id 
						{
							// Template for display generated voucher details
							templateForGeneratedVouchers=templateForGeneratedVouchers+"<tr><td class='col-md-1 center'>"+counterUp+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].voucherId+"</td>"
							+"<td class='col-md-3 center'>"+data.lstHisabVouchers[i].payTo+"</td>"
							+"<td class='col-md-4 center'>"+data.lstHisabVouchers[i].narration+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].amount+"</td>"						
					        +"</tr>";												
							totalGeneratedAmount=totalGeneratedAmount+data.lstHisabVouchers[i].amount;	
							generated=generated+data.lstHisabVouchers[i].amount;
							counterUp++;
						}				
						else if(data.lstHisabVouchers[i].voucherType==$(this).val() && data.lstHisabVouchers[i].cancelFlag=="Y") // fetch cancelled vouchers of current id 
						{
							// Template for display cancelled voucher details
							templateForCancelledVouchers=templateForCancelledVouchers+"<tr><td class='col-md-1 center'>"+counterDown+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].voucherId+"</td>"
							+"<td class='col-md-3 center'>"+data.lstHisabVouchers[i].payTo+"</td>"
							+"<td class='col-md-4 center'>"+data.lstHisabVouchers[i].narration+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].amount+"</td>"							
					        +"</tr>";	
							totalCancelledAmount=totalCancelledAmount+data.lstHisabVouchers[i].amount;
							cancelled=cancelled+data.lstHisabVouchers[i].amount;
							counterDown++;
						}				
					}				
					
					if(counterUp>1){ // if vouchers is generated of any type then add blank row afer that 						
						templateForGeneratedVouchers=templateForGeneratedVouchers+"<tr class='blank_row' style='background-color: white !important;height: 60px'><td colspan='5' style='background-color: white !important;height: 60px'></td></tr>";
					}
					else{
						generated=0;
					}
					if(counterDown>1){ // if vouchers is cancelled of any type then add blank row afer that
						templateForCancelledVouchers=templateForCancelledVouchers+"<tr class='blank_row' style='background-color: white !important;height: 60px'><td colspan='5' style='background-color: white !important;height: 60px'></td></tr>";
					}else{
						cancelled=0;					
					}
					
					cash=Number(generated)-Number(cancelled);
					if(cash<0) // if cash < 0 then set it to 0
					{
						cash=0;
					}
					
					// Set template for voucher details popup in hisab dashboard
					templateForVoucherDetailsPopup=templateForVoucherDetailsPopup+"<tr>" 
					+"<td>"+$("#voucherType option[value='"+$(this).val()+"']").text()+"</td>"
					+"<td>"+generated+"</td>"
					+"<td>"+cancelled+"</td>"				
					+"<td>"+cash+"</td></tr>";
						
				});	
				
				totalExpense=totalGeneratedAmount-totalCancelledAmount;
				
				// Set template for total hisab of vouchers
				templateForTotalHisab="<tr>" +
						"<td class='col-md-3 center'>"+totalGeneratedAmount+"</td>" +
						"<td class='col-md-3 center'>"+totalCancelledAmount+"</td>" +
						"<td class='col-md-3 center'>"+totalExpense+"</td></tr>";
				
				// Set three templates in tables
				$("#generatedVouchers").html(templateForGeneratedVouchers);
				$("#cancelledVouchers").html(templateForCancelledVouchers);	
				$("#totalHisab").html(templateForTotalHisab);			
								
				//set hidden fields for graphs in hisab dashboard
				$("#vouchersTotalReceipt").val(totalGeneratedAmount);
				$("#vouchersTotalRefund").val(totalCancelledAmount);
				$("#vouchersTotalCash").val(totalExpense);	
				
				templateForVoucherDetailsPopup=templateForVoucherDetailsPopup+"<tr>" 
				+"<th>Total</th>"
				+"<th>"+totalGeneratedAmount+"</th>"
				+"<th>"+totalCancelledAmount+"</th>"				
				+"<th>"+totalExpense+"</th></tr>";
				
				// Set template for voucher details popup in hisab dashboard
				$("#vouchersDetails").html(templateForVoucherDetailsPopup);
			}
			else if(callFrom=="range") // Set following templates if callfrom="onclick"
			{
				$("#voucherType option").each(function()
				{
					var voucherTypeId=$(this).val();	
					counterUp=1;
					counterDown =1;
					generated=0;
					cancelled=0;
					for(var i=0;i<data.lstHisabVouchers.length;i++)
					{					
						if(data.lstHisabVouchers[i].voucherType==voucherTypeId && data.lstHisabVouchers[i].cancelFlag=="N") // fetch generated vouchers of current id 
						{
							// Template for display generated voucher details
							templateForGeneratedVouchers=templateForGeneratedVouchers+"<tr><td class='col-md-1 center'>"+counterUp+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].voucherId+"</td>"
							+"<td class='col-md-3 center'>"+data.lstHisabVouchers[i].payTo+"</td>"
							+"<td class='col-md-4 center'>"+data.lstHisabVouchers[i].narration+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].amount+"</td>"						
					        +"</tr>";												
							totalGeneratedAmount=totalGeneratedAmount+data.lstHisabVouchers[i].amount;	
							generated=generated+data.lstHisabVouchers[i].amount;
							counterUp++;
						}				
						else if(data.lstHisabVouchers[i].voucherType==$(this).val() && data.lstHisabVouchers[i].cancelFlag=="Y") // fetch cancelled vouchers of current id 
						{
							// Template for display cancelled voucher details
							templateForCancelledVouchers=templateForCancelledVouchers+"<tr><td class='col-md-1 center'>"+counterDown+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].voucherId+"</td>"
							+"<td class='col-md-3 center'>"+data.lstHisabVouchers[i].payTo+"</td>"
							+"<td class='col-md-4 center'>"+data.lstHisabVouchers[i].narration+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].amount+"</td>"							
					        +"</tr>";	
							totalCancelledAmount=totalCancelledAmount+data.lstHisabVouchers[i].amount;
							cancelled=cancelled+data.lstHisabVouchers[i].amount;
							counterDown++;
						}				
					}				
					
					if(counterUp>1){ // if vouchers is generated of any type then add blank row afer that 						
						templateForGeneratedVouchers=templateForGeneratedVouchers+"<tr class='blank_row' style='background-color: white !important;height: 60px'><td colspan='5' style='background-color: white !important;height: 60px'></td></tr>";
					}
					else{
						generated=0;
					}
					if(counterDown>1){ // if vouchers is cancelled of any type then add blank row afer that
						templateForCancelledVouchers=templateForCancelledVouchers+"<tr class='blank_row' style='background-color: white !important;height: 60px'><td colspan='5' style='background-color: white !important;height: 60px'></td></tr>";
					}else{
						cancelled=0;					
					}
					
					cash=Number(generated)-Number(cancelled);
					if(cash<0) // if cash < 0 then set it to 0
					{
						cash=0;
					}
					
					// Set template for voucher details popup in hisab dashboard
					templateForVoucherDetailsFromToPopup=templateForVoucherDetailsFromToPopup+"<tr>" 
					+"<td>"+$("#voucherType option[value='"+$(this).val()+"']").text()+"</td>"
					+"<td>"+generated+"</td>"
					+"<td>"+cancelled+"</td>"				
					+"<td>"+cash+"</td></tr>";
						
				});	
				
				totalExpense=totalGeneratedAmount-totalCancelledAmount;
				
				// Set template for total hisab of vouchers
				templateForTotalHisab="<tr>" +
						"<td class='col-md-3 center'>"+totalGeneratedAmount+"</td>" +
						"<td class='col-md-3 center'>"+totalCancelledAmount+"</td>" +
						"<td class='col-md-3 center'>"+totalExpense+"</td></tr>";
				
				// Set three templates in tables
				$("#generatedVouchers").html(templateForGeneratedVouchers);
				$("#cancelledVouchers").html(templateForCancelledVouchers);	
				$("#totalHisab").html(templateForTotalHisab);			
											
				//set hidden fields for graphs in hisab dashboard
				$("#vouchersTotalReceipt").val(totalGeneratedAmount);
				$("#vouchersTotalRefund").val(totalCancelledAmount);
				$("#vouchersTotalCash").val(totalExpense);					
				
				templateForVoucherDetailsFromToPopup=templateForVoucherDetailsFromToPopup+"<tr>" 
				+"<th>Total</th>"
				+"<th>"+totalGeneratedAmount+"</th>"
				+"<th>"+totalCancelledAmount+"</th>"				
				+"<th>"+totalExpense+"</th></tr>";
				
				// Set template for voucher details popup in hisab dashboard
				$("#vouchersDetailsFromTo").html(templateForVoucherDetailsFromToPopup);
				
			}
			else // If callfrom other than onclick
			{
				$("#voucherType option").each(function()
				{
					var voucherTypeId=$(this).val();	
					counterUp=1;
					counterDown =1;
					
					for(var i=0;i<data.lstHisabVouchers.length;i++)
					{					
						if(data.lstHisabVouchers[i].voucherType==voucherTypeId && data.lstHisabVouchers[i].cancelFlag=="N") // fetch generated vouchers of current id 
						{
							// Template for display generated voucher details
							templateForGeneratedVouchers=templateForGeneratedVouchers+"<tr><td class='col-md-1 center'>"+counterUp+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].voucherId+"</td>"
							+"<td class='col-md-3 center'>"+data.lstHisabVouchers[i].payTo+"</td>"
							+"<td class='col-md-4 center'>"+data.lstHisabVouchers[i].narration+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].amount+"</td>"						
					        +"</tr>";												
							totalGeneratedAmount=totalGeneratedAmount+data.lstHisabVouchers[i].amount;							
							counterUp++;
						}				
						else if(data.lstHisabVouchers[i].voucherType==$(this).val() && data.lstHisabVouchers[i].cancelFlag=="Y") // fetch cancelled vouchers of current id 
						{
							// Template for display cancelled voucher details
							templateForCancelledVouchers=templateForCancelledVouchers+"<tr><td class='col-md-1 center'>"+counterDown+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].voucherId+"</td>"
							+"<td class='col-md-3 center'>"+data.lstHisabVouchers[i].payTo+"</td>"
							+"<td class='col-md-4 center'>"+data.lstHisabVouchers[i].narration+"</td>"
							+"<td class='col-md-1 center'>"+data.lstHisabVouchers[i].amount+"</td>"							
					        +"</tr>";	
							totalCancelledAmount=totalCancelledAmount+data.lstHisabVouchers[i].amount;							
							counterDown++;
						}				
					}				
					
					if(counterUp>1){ // if vouchers is generated of any type then add blank row afer that 												
						templateForGeneratedVouchers=templateForGeneratedVouchers+"<tr class='blank_row' style='background-color: white !important;height: 60px'><td colspan='5' style='background-color: white !important;height: 60px'></td></tr>";
					}
					if(counterDown>1){ // if vouchers is cancelled of any type then add blank row afer that 						
						templateForCancelledVouchers=templateForCancelledVouchers+"<tr class='blank_row' style='background-color: white !important;height: 60px'><td colspan='5' style='background-color: white !important;height: 60px'></td></tr>";
					}
					
				});	
				
				totalExpense=totalGeneratedAmount-totalCancelledAmount;
				
				// Set total vouchers hisab in template
				templateForTotalHisab="<tr>" +
						"<td class='col-md-3 center'>"+totalGeneratedAmount+"</td>" +
						"<td class='col-md-3 center'>"+totalCancelledAmount+"</td>" +
						"<td class='col-md-3 center'>"+totalExpense+"</td></tr>";
				
				// Set three templates in tables
				$("#generatedVouchers").html(templateForGeneratedVouchers);
				$("#cancelledVouchers").html(templateForCancelledVouchers);	
				$("#totalHisab").html(templateForTotalHisab);			
				
				//set hidden fields for hisab dashboard
				$("#vouchersTotalReceipt").val(totalGeneratedAmount);
				$("#vouchersTotalRefund").val(totalCancelledAmount);
				$("#vouchersTotalCash").val(totalExpense);	
			}					
		}
	});	
}

/***********
* @author	: Vinod Udawant
* @date		:  24-Nov-2016
* @codeFor	: Close & Print Voucher Hisab
************/
function printVoucherHisab()
{
	var didConfirm = confirm("Are you sure want to close hisab now?");
	if (didConfirm) 
	{
		var inputs = [];
		inputs.push('action=closeVouchersHisab');		
		var str = inputs.join('&');
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "HisabServlet",
			timeout : 1000 * 60 * 6,
			cache	: false,
			success : function(r) {
				
				ajaxResponse = r;				
				alert(r);			
			}
		});	
	}
}

/************
* @author	: Vinod Udawant
* @date		:  24-Nov-2016
* @codeFor	: Clear Vouchers Hisab
*************/
function clearVoucherHisab()
{
	$("#generatedVouchers").empty();
	$("#cancelledVouchers").empty();
	$("#totalHisab").empty();
}

/************
* @author	: Vinod Udawant
* @date		:  24-Nov-2016
* @codeFor	:Validate date before close Vouchers Hisab
*************/
function validateDateToCloseHisab()
{
	$("#btnPrint").removeAttr('disabled');
	var selDate= $("#txtcurrentDate").val();
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) // if date is single digit then add 0 to prior 
	{
	    dd='0'+dd;
	} 

	if(mm<10) // if month is single digit then add 0 to prior 
	{
	    mm='0'+mm;
	} 
	today = yyyy+'-'+mm+'-'+dd;
	
	if(today!=selDate) //if selected date != taday date then disable print button
	{
		$("#btnPrint").attr('disabled','true');
	}	
}

/************
* @author	: Vinod Udawant
* @date		:  25-Nov-2016
* @codeFor	: Export to pdf & Print Vouchers Hisab
*************/
function exportToPdfVouchers()
{
	var selectedDate = $("#txtcurrentDate").val();
	var operation=$("#operation").val();
	if(operation!="") // operation means onclick-(show current data button) or search(show button)
	{
		var vouchers=[];
		$("#voucherType option").each(function(){
			vouchers.push($(this).val());
		});
		var f = document.getElementById('TheForm');
		f.selectedDatePrint.value = selectedDate;	
		f.operationPrint.value = operation;
		f.vouchersPrint.value = vouchers;
		
		window.open('', 'TheWindow');
		f.submit();	
		//window.open("hisabVouchersPrint.jsp?selectedDate="+ selectedDate + "&operation="+operation );
	}
	else // if operation ="" then show alert
	{
		alert("Please click on show or show current data button");
	}
}

/************
* @author	: Vinod Udawant
* @date		: 17-Dec-2016
* @codeFor	: Get total discount 
*************/
function getAllDiscount(callFrom)
{
	var selectedDate = $("#txtcurrentDate").val();
	var operation=$("#operation").val();
	var paymentMode=$("#paymentMode").val();
	var inputs = [];	
	inputs.push('action=getAllDiscount');		
	inputs.push('callFrom='+callFrom);		
	inputs.push('operation='+operation);	
	inputs.push('selectedDate='+selectedDate);	
	inputs.push('paymentMode='+paymentMode);	
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "HisabServlet",
		timeout : 1000 * 60 * 6,
		cache	: false,
		success : function(r) {
			
			ajaxResponse = r;				
			var data = eval('('+r+')');
			
			if(data.dList.length>0){
				if(callFrom=="diagnosis"){
					$("#diagnosisDiscount").val(data.dList[0].discountAmount);
				}else if(callFrom=="opd"){
					$("#opdDiscount").val(data.dList[0].discountAmount);
				}
			}						
		}
	});		
}

/************
* @author	: Vinod Udawant
* @date		: 17-Nov-2016
* @codeFor	: Set dynamic values for Hisab dashboard graphs
*************/
function showGraphs()
{		
	/*************************** Variable declaration start ****************************/
	var totalDiagReceipt=0,totalDiagRefund=0,totalDiagDiscount=0,totalDiagCash=0,preTotalDiagReceipt=0,preTotalDiagRefund=0,preTotalDiagDiscount=0,totalDiagNonCash=0,preTotalDiagNonCash=0;
	var totalOpdReceipt=0,totalOpdRefund=0,totalOpdDiscount=0,totalOpdCash=0,preTotalOpdReceipt=0,preTotalOpdRefund=0,preTotalOpdDiscount=0,totalOpdNonCash=0,preTotalOpdNonCash=0;
	var totalIpdReceipt=0,totalIpdRefund=0,totalIpdDiscount=0,totalIpdCash=0,preTotalIpdReceipt=0,preTotalIpdRefund=0,preTotalIpdDiscount=0,totalIpdNonCash=0,preTotalIpdNonCash=0;
	var totalVouchersReceipt=0,totalVouchersRefund=0,totalVouchersCash=0;
	var totalReceipt=0,totalRefund=0,totalDiscount=0,totalCash=0,preTotalReceipt=0,preTotalRefund=0,preTotalDiscount=0,preTotalCash=0,totalNonCash=0,preTotalNonCash=0;
	
	var diagDetails="";
	var opdDetails="";	
	var cash=0;
	var allDates="";
	var lastDateDiag=null;
	var lastDateOpd=null;
	var lastDateIpd=null;
	var lastDateVouchers=null;
	
	var diff=0;
	var perReceiptProfit=0;
	var perReceiptLoss=0;
	var perRefundProfit=0;
	var perRefundLoss=0;
	var perDiscountProfit=0;
	var perDiscountLoss=0;
	var perCashProfit=0;
	var perCashLoss=0;
	
	var divcontent="";
	
	/*************************** Variable declaration end ******************************/	
	
	/*************************** Get last closed hisab dates start *********************/		
	lastClosedHisab();	
	allDates=$("#allDates").val();	
	
	if(allDates!=null)
	{
		var a= allDates.split(",");
		lastDateDiag=a[0];
		lastDateOpd=a[1];
		lastDateIpd=a[2];
		lastDateVouchers=a[3];
	}
	/*************************** Get last closed hisab dates end **********************/		
	
	showDiagnosisHisab("onclick");
	totalDiagNonCash=Number($("#diagNonCashReceipt").val())-Number($("#diagNonCashRefund").val());
	
	showOpdHisab("onclick");
	totalOpdNonCash=Number($("#opdNonCashReceipt").val())-Number($("#opdNonCashRefund").val());
	
	$("#txtcurrentDate").val(lastDateDiag);		
	showDiagnosisHisab("search");	
	preTotalDiagNonCash=Number($("#diagNonCashReceipt").val())-Number($("#diagNonCashRefund").val());
	
	$("#txtcurrentDate").val(lastDateOpd);		
	showOpdHisab("search");	
	preTotalOpdNonCash=Number($("#opdNonCashReceipt").val())-Number($("#opdNonCashRefund").val());
	
	// Get all service wise details of Diagnosis & Opd 
	$("#drpSelectService option").each(function()
	{
		$("#txtSelectService").val($(this).val());
		
		showDiagnosisHisab("onclick");	// Get Diagnosis hisab service wise		
		totalDiagReceipt=Number(totalDiagReceipt)+Number($("#diagTotalReceipt").val()); // Get Diagnosis receipt total service wise	
		totalDiagRefund=Number(totalDiagRefund)+Number($("#diagTotalRefund").val()); // Get Diagnosis refund total service wise		
		cash=Number($("#diagTotalReceipt").val())-Number($("#diagTotalRefund").val());
				
		diagDetails=diagDetails+"<tr><td>"+$("#drpSelectService option[value='"+$(this).val()+"']").text()+"</td> <td>"+$("#diagTotalReceipt").val()+"</td> <td>"+$("#diagTotalRefund").val()+"</td> <td>"+cash+"</td></tr>";
				
		$("#txtcurrentDate").val(lastDateDiag);		
		showDiagnosisHisab("search");	// Get Last closed Diagnosis		
		preTotalDiagReceipt=Number(preTotalDiagReceipt)+Number($("#diagTotalReceipt").val()); // Get Diagnosis receipt total service wise	
		preTotalDiagRefund=Number(preTotalDiagRefund)+Number($("#diagTotalRefund").val()); // Get Diagnosis refund total service wise		
				
		showOpdHisab("onclick"); // Get Opd hisab service wise				
		totalOpdReceipt=Number(totalOpdReceipt)+Number($("#opdTotalReceipt").val()); // Get opd receipt total service wise	
		totalOpdRefund=Number(totalOpdRefund)+Number($("#opdTotalRefund").val());	 // Get opd refund total service wise			
		cash=Number($("#opdTotalReceipt").val())-Number($("#opdTotalRefund").val());
		
		opdDetails=opdDetails+"<tr><td>"+$("#drpSelectService option[value='"+$(this).val()+"']").text()+"</td> <td>"+$("#opdTotalReceipt").val()+"</td> <td>"+$("#opdTotalRefund").val()+"</td> <td>"+cash+"</td></tr>";
		
		$("#txtcurrentDate").val(lastDateOpd);		
		showOpdHisab("search");	// Get Last closed Opd hisab		
		preTotalOpdReceipt=Number(preTotalOpdReceipt)+Number($("#opdTotalReceipt").val()); // Get Diagnosis receipt total service wise	
		preTotalOpdRefund=Number(preTotalOpdRefund)+Number($("#opdTotalRefund").val()); // Get Diagnosis refund total service wise		

	});
	
	// Set Last row of totals in details of diagnosis & opd
	cash=Number(totalDiagReceipt)-Number(totalDiagRefund);
	diagDetails=diagDetails+"<tr><th>Total</th> <th>"+totalDiagReceipt+"</th> <th>"+totalDiagRefund+"</th> <th>"+cash+"</th></tr>";
	
	cash=Number(totalOpdReceipt)-Number(totalOpdRefund);
	opdDetails=opdDetails+"<tr><th>Total</th> <th>"+totalOpdReceipt+"</th> <th>"+totalOpdRefund+"</th> <th>"+cash+"</th></tr>";
		
	// Get all details of IPD & Vouchers 
	showIPDHisab("onclick"); // Get IPD Hisab 	
	totalIpdReceipt=$("#ipdTotalReceipt").val();
	totalIpdRefund=$("#ipdTotalRefund").val();	
	
	showVouchersHisab("onclick"); // Get Vouchers Hisab			
	totalVouchersReceipt=$("#vouchersTotalReceipt").val();
	totalVouchersRefund=$("#vouchersTotalRefund").val();
	
	//totalDiagNonCash=Number($("#diagNonCashReceipt").val())-Number($("#diagNonCashRefund").val());
	//totalOpdNonCash=Number($("#opdNonCashReceipt").val())-Number($("#opdNonCashRefund").val());
	
	/*************************** Get Discounts for current hisab start ******************************/	
	// Get discounts of diagnosis,Opd & IPD 
	var cashDiagDiscount=$("#diagnosisDiscount").val();
	var cashOpdDiscount=$("#opdDiscount").val();	
	/*************************** Get Discounts for current hisab end ******************************/		
	
	$("#operation").val('all');
	getAllDiscount("diagnosis");
	
	$("#operation").val('all');
	getAllDiscount("opd");	
	
	/*************************** Get Discounts for current hisab start ******************************/		
	
	// Get discounts of diagnosis,Opd & IPD 
	totalDiagDiscount=$("#diagnosisDiscount").val();
	totalOpdDiscount=$("#opdDiscount").val();
	totalIpdDiscount=$("#ipdTotalDiscount").val();	
	/*************************** Get Discounts for current hisab end ******************************/
	
	
	/*************************** calculate totals for current hisab start *************************/		
	// Calculate Total cash of Diagnosis Opd Ipd & Vouchers
	totalDiagCash=Number(totalDiagReceipt)-Number(totalDiagRefund)-Number(cashDiagDiscount);	
	totalOpdCash=Number(totalOpdReceipt)-Number(totalOpdRefund)-Number(cashOpdDiscount);
	totalIpdCash=Number(totalIpdReceipt)-Number(totalIpdRefund)-Number(totalIpdDiscount);	
	totalVouchersCash=Number(totalVouchersReceipt)-Number(totalVouchersRefund);		
	/*************************** calculate totals for current hisab end *************************/
	
	// Setting data to bar chart
	var barChartData = {
			labels : [ "Receipt Amount", "Refund Amount", "Cash Amount" ],
			datasets : [
			            
						{
							fillColor : "rgba(233, 78, 2, 0.9)",
							strokeColor : "rgba(233, 78, 2, 0.9)",
							highlightFill: "#e94e02",
							highlightStroke: "#e94e02",
							data : [ totalDiagReceipt, totalDiagRefund, totalDiagCash ]
						}, 
						
						{
							fillColor : "rgba(79, 82, 186, 0.9)",
							strokeColor : "rgba(79, 82, 186, 0.9)",
							highlightFill: "#4F52BA",
							highlightStroke: "#4F52BA",
							data : [ totalDiagReceipt, totalDiagRefund, totalDiagCash ]
						}, 
						
			       ]

		};
		// Setting data to line chart
		var lineChartData = {
			labels : [ "Receipt Amount", "Refund Amount", "Cash Amount" ],
			datasets : [
					{
						fillColor : "#6bb3ff",
						strokeColor : "#000000",
						pointColor : "#1d8348",
						pointStrokeColor : "#1d8348",
						data : [ totalOpdReceipt, totalOpdRefund, totalOpdCash ]
					},				
			]

		};
		// Setting data to Pie chart
		var pieData = [
				{
					value : totalIpdReceipt,
					color:"rgba(233, 78, 2, 1)",
					label : "Receipt Amount",					
				},
				{
					value : totalIpdRefund,
					color : "rgba(242, 179, 63, 1)",
					label : "Refund Amount"
				},				
				{
					value : totalIpdDiscount,
					color : " #1d8348",
					label : "Discount Amount"
				},
				{
					value : totalIpdCash,
					color : "rgba(79, 82, 186, 1)",
					label : "Cash Amount"
				}

		];
		// Setting data to doughnut chart
		var doughnutData = [
				{
					value: totalVouchersReceipt,
					color:"#4F52BA",
					label : "Generated Vouchers Amt"
				},
				{
					value : totalVouchersRefund,
					color : "#F2B33F",
					label : "Cancelled Vouchers Amt"
				},
				{
					value : totalVouchersCash,
					color : "#9358ac",
					label : "Expense Amt"
				},
					
		];	
				
		new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
		new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);
		new Chart(document.getElementById("pie").getContext("2d")).Pie(pieData);
		new Chart(document.getElementById("doughnut").getContext("2d")).Doughnut(doughnutData);			
				
		// Calculate totals of all sections
		totalReceipt=Number(totalDiagReceipt)+Number(totalOpdReceipt)+Number(totalIpdReceipt)+Number(totalVouchersReceipt);
		totalRefund=Number(totalDiagRefund)+Number(totalOpdRefund)+Number(totalIpdRefund)+Number(totalVouchersRefund);
		totalDiscount=Number(totalDiagDiscount)+Number(totalOpdDiscount)+Number(totalIpdDiscount);
		totalCash=Number(totalReceipt)-Number(totalRefund)-Number(totalDiscount);
				
		$("#txtcurrentDate").val(lastDateIpd);
		showIPDHisab("search"); // Get Last closed IPD Hisab	
			
		var voucherDetails=$("#vouchersDetails").html();
				
		$("#txtcurrentDate").val(lastDateVouchers);
		showVouchersHisab("search"); // Get Last closed vouchers Hisab		
				
		preTotalIpdReceipt=$("#ipdTotalReceipt").val();
		preTotalIpdRefund=$("#ipdTotalRefund").val();
		preTotalVouchersReceipt=$("#vouchersTotalReceipt").val();
		preTotalVouchersRefund=$("#vouchersTotalRefund").val();
		preTotalDiagDiscount=$("#diagnosisDiscount").val();
		preTotalOpdDiscount=$("#opdDiscount").val();
		preTotalIpdDiscount=$("#ipdTotalDiscount").val();
	
		// Calculate totals of all sections of Last closed Hisab
		preTotalReceipt=Number(preTotalDiagReceipt)+Number(preTotalOpdReceipt)+Number(preTotalIpdReceipt)+Number(preTotalVouchersReceipt);
		preTotalRefund=Number(preTotalDiagRefund)+Number(preTotalOpdRefund)+Number(preTotalIpdRefund)+Number(preTotalVouchersRefund);
		preTotalDiscount=Number(preTotalDiagDiscount)+Number(preTotalOpdDiscount)+Number(preTotalIpdDiscount);
		preTotalCash=Number(preTotalReceipt)-Number(preTotalRefund)-Number(preTotalDiscount);
		
		// Set table contents using fetched values 
		divcontent=divcontent+"<tr><th scope='row'>Total Receipt Amount</th>"
			   +"<td>"+totalDiagReceipt+" <button data-target='#servicewiseDiagHisab' data-toggle='modal'>Get Details</button></td>"
			   +"<td>"+totalOpdReceipt+" <button data-target='#servicewiseOpdHisab' data-toggle='modal'>Get Details</button></td>"
			   +"<td>"+totalIpdReceipt+"</td>"
			   +"<td>"+totalVouchersReceipt+" <button data-target='#servicewiseVouchersHisab' data-toggle='modal'>Get Details</button> </td>"
			   +"<td>"+totalReceipt+"</td>"		
			   +"<td>"+preTotalReceipt+"</td>";			   
			   if(((parseFloat(totalReceipt))>parseFloat(preTotalReceipt)))
			   {
				   diff=totalReceipt-preTotalReceipt;
				   perReceiptProfit=(diff/totalReceipt)*100;
				   divcontent=divcontent+"<td><span class='label label-success' style='font-size: 10px'>Profit</span></td>"
				   +"<td><h5>"+perReceiptProfit.toFixed(2)+"% <i class='fa fa-level-up'></i></h5></td>";
			   }
			   else
			   {
				   diff=preTotalReceipt-totalReceipt;
				   perReceiptLoss=(diff/preTotalReceipt)*100;
				   divcontent=divcontent+"<td><span class='label label-danger' style='font-size: 10px'>Loss</span></td>"
				   +"<td><h5  class='down'>"+perReceiptLoss.toFixed(2)+"% <i class='fa fa-level-down'></i></h5></td>"; 
			   }
			   
			   divcontent=divcontent +"<tr><th scope='row'>Total Refund Amount</th>"
			   +"<td>"+totalDiagRefund+"</td>"
			   +"<td>"+totalOpdRefund+"</td>"
			   +"<td>"+totalIpdRefund+"</td>"
			   +"<td>"+totalVouchersRefund+"</td>"
			   +"<td>"+totalRefund+"</td>"	
			   +"<td>"+preTotalRefund+"</td>";
			   if(((parseFloat(totalRefund))>parseFloat(preTotalRefund)))
			   {
				   diff=totalRefund-preTotalRefund;
				   perRefundProfit=(diff/totalRefund)*100;
				   divcontent=divcontent+"<td><span class='label label-success' style='font-size: 10px'>Profit</span></td>"
				   +"<td><h5>"+perRefundProfit.toFixed(2)+"% <i class='fa fa-level-up'></i></h5></td>" ;
			   }
			   else
			   {
				   diff=preTotalRefund-totalRefund;
				   perRefundLoss=(diff/preTotalRefund)*100;			
				   divcontent=divcontent+"<td><span class='label label-danger' style='font-size: 10px'>Loss</span></td>"
				   +"<td><h5  class='down'>"+perRefundLoss.toFixed(2)+"% <i class='fa fa-level-down'></i></h5></td>"; 
			   }
			  			   			   
			   divcontent=divcontent+"<tr><th scope='row'>Total Discount Amount</th>"
			   +"<td>"+totalDiagDiscount+"</td>"
			   +"<td>"+totalOpdDiscount+"</td>"
			   +"<td>"+totalIpdDiscount+"</td>"
			   +"<td>0</td>"
			   +"<td>"+totalDiscount+"</td>"
			   +"<td>"+preTotalDiscount+"</td>";
			   if(((parseFloat(totalDiscount))>parseFloat(preTotalDiscount)))
			   {
				   diff=totalDiscount-preTotalDiscount;
				   perDiscountProfit=(diff/totalDiscount)*100;
				   divcontent=divcontent+"<td><span class='label label-success' style='font-size: 10px'>Profit</span></td>"
				   +"<td><h5>"+perDiscountProfit.toFixed(2)+"% <i class='fa fa-level-up'></i></h5></td>";
			   }
			   else
			   {
				   diff=preTotalDiscount-totalDiscount;
				   perDiscountLoss=(diff/preTotalDiscount)*100;
				   divcontent=divcontent+"<td><span class='label label-danger' style='font-size: 10px'>Loss</span></td>"
				   +"<td><h5  class='down'>"+perDiscountLoss.toFixed(2)+"% <i class='fa fa-level-down'></i></h5></td>";
			   }
			   
			   divcontent=divcontent+"<tr><th scope='row'>Total Cash Amount</th>"
			   +"<td>"+totalDiagCash+"</td>"
			   +"<td>"+totalOpdCash+"</td>"
			   +"<td>"+totalIpdCash+"</td>"
			   +"<td>"+totalVouchersCash+"</td>"
			   +"<td>"+totalCash+"</td>"			  
			   +"<td>"+preTotalCash+"</td>";
			   if(((parseFloat(totalCash))>parseFloat(preTotalCash)))
			   {
				   diff=totalCash-preTotalCash;
				   perCashProfit=(diff/totalCash)*100;
				   divcontent=divcontent+"<td><span class='label label-success' style='font-size: 10px'>Profit</span></td>"
				   +"<td><h5>"+perCashProfit.toFixed(2)+"% <i class='fa fa-level-up'></i></h5></td>";
			   }
			   else
			   {
				   diff=preTotalCash-totalCash;
				   perCashLoss=(diff/preTotalCash)*100;
				   divcontent=divcontent+"<td><span class='label label-danger' style='font-size: 10px'>Loss</span></td>"
				   +"<td><h5  class='down'>"+perCashLoss.toFixed(2)+"% <i class='fa fa-level-down'></i></h5></td>"; 
			   }
			   
			   var nonCashDiscountDiag=Number(totalDiagDiscount)-Number(cashDiagDiscount);	  
			   var nonCashDiscountOpd=Number(totalOpdDiscount)-Number(cashOpdDiscount);	  
			   
			   totalDiagNonCash=Number(totalDiagNonCash)-Number(nonCashDiscountDiag);
			   totalOpdNonCash=Number(totalOpdNonCash)-Number(nonCashDiscountOpd);			   
			   totalNonCash=Number(totalDiagNonCash)+Number(totalOpdNonCash);				   
			   
			   $("#txtcurrentDate").val(lastDateDiag);		
			   $("#operation").val('allclosed');
			   getAllDiscount("diagnosis");
				
			   $("#txtcurrentDate").val(lastDateOpd);	
			   $("#operation").val('allclosed');
			   getAllDiscount("opd");			   
			   
			   //preTotalDiagNonCash=Number(preTotalDiagNonCash)-Number(preCashDiagDiscount);	 
			   //preTotalOpdNonCash=Number(preTotalOpdNonCash)-Number(preCashDiagDiscount);	 
			   
			   divcontent=divcontent+"<tr><th scope='row'>Total Non Cash Amount</th>"
			   +"<td>"+totalDiagNonCash+"</td>"
			   +"<td>"+totalOpdNonCash+"</td>"
			   +"<td>0</td>"
			   +"<td>0</td>"
			   +"<td>"+totalNonCash+"</td>"			  
			   +"<td>0</td>";
			   if(((parseFloat(totalCash))>parseFloat(preTotalCash)))
			   {
				   diff=totalCash-preTotalCash;
				   perCashProfit=(diff/totalCash)*100;
				   divcontent=divcontent+"<td><span class='label label-success' style='font-size: 10px'>Profit</span></td>"
				   +"<td><h5>"+perCashProfit.toFixed(2)+"% <i class='fa fa-level-up'></i></h5></td>";
			   }
			   else
			   {
				   diff=preTotalCash-totalCash;
				   perCashLoss=(diff/preTotalCash)*100;
				   divcontent=divcontent+"<td><span class='label label-danger' style='font-size: 10px'>Loss</span></td>"
				   +"<td><h5  class='down'>"+perCashLoss.toFixed(2)+"% <i class='fa fa-level-down'></i></h5></td>"; 
			   }			   
		
			   $("#hisabDetails").html(divcontent);
		
		// Set data in popups
		$("#diagDetails").html(diagDetails);
		$("#opdDetails").html(opdDetails);
		$("#vouchersDetails").html(voucherDetails); 
		
}

function getHisabFromTo(callFrom)
{
	var fromDate=$("#fromDate").val();
	var toDate=$("#lastDate").val();
	
	/*************************** Variable declaration start ****************************/
	var totalDiagReceipt=0,totalDiagRefund=0,totalDiagDiscount=0,totalDiagCash=0;
	var totalOpdReceipt=0,totalOpdRefund=0,totalOpdDiscount=0,totalOpdCash=0;
	var totalIpdReceipt=0,totalIpdRefund=0,totalIpdDiscount=0,totalIpdCash=0;
	var totalVouchersReceipt=0,totalVouchersRefund=0,totalVouchersCash=0;
	var totalReceipt=0,totalRefund=0,totalDiscount=0,totalCash=0;
	
	var diagDetails="";
	var opdDetails="";	
	var cash=0;	
	
	var divcontent="";
	
	/*************************** Variable declaration end ******************************/	
	
	$("#txtcurrentDate").val(fromDate);
	$("#toDate").val(toDate);
	
	// Get all service wise details of Diagnosis & Opd 
	$("#drpSelectService option").each(function()
	{
		$("#txtSelectService").val($(this).val());
		
		showDiagnosisHisab("range");	// Get Diagnosis hisab service wise		
		totalDiagReceipt=Number(totalDiagReceipt)+Number($("#diagTotalReceipt").val()); // Get Diagnosis receipt total service wise	
		totalDiagRefund=Number(totalDiagRefund)+Number($("#diagTotalRefund").val()); // Get Diagnosis refund total service wise		
		cash=Number($("#diagTotalReceipt").val())-Number($("#diagTotalRefund").val());
		diagDetails=diagDetails+"<tr><td>"+$("#drpSelectService option[value='"+$(this).val()+"']").text()+"</td> <td>"+$("#diagTotalReceipt").val()+"</td> <td>"+$("#diagTotalRefund").val()+"</td> <td>"+cash+"</td></tr>";
					
		showOpdHisab("range"); // Get Opd hisab service wise				
		totalOpdReceipt=Number(totalOpdReceipt)+Number($("#opdTotalReceipt").val()); // Get opd receipt total service wise	
		totalOpdRefund=Number(totalOpdRefund)+Number($("#opdTotalRefund").val());	 // Get opd refund total service wise			
		cash=Number($("#opdTotalReceipt").val())-Number($("#opdTotalRefund").val());
		opdDetails=opdDetails+"<tr><td>"+$("#drpSelectService option[value='"+$(this).val()+"']").text()+"</td> <td>"+$("#opdTotalReceipt").val()+"</td> <td>"+$("#opdTotalRefund").val()+"</td> <td>"+cash+"</td></tr>";
	});
	
	// Set Last row of totals in details of diagnosis & opd
	cash=Number(totalDiagReceipt)-Number(totalDiagRefund);
	diagDetails=diagDetails+"<tr><th>Total</th> <th>"+totalDiagReceipt+"</th> <th>"+totalDiagRefund+"</th> <th>"+cash+"</th></tr>";
	
	cash=Number(totalOpdReceipt)-Number(totalOpdRefund);
	opdDetails=opdDetails+"<tr><th>Total</th> <th>"+totalOpdReceipt+"</th> <th>"+totalOpdRefund+"</th> <th>"+cash+"</th></tr>";
			
	
	// Get all details of IPD & Vouchers 
	showIPDHisab("range"); // Get IPD Hisab 	
	totalIpdReceipt=$("#ipdTotalReceipt").val();
	totalIpdRefund=$("#ipdTotalRefund").val();	
		
	showVouchersHisab("range"); // Get Vouchers Hisab			
	totalVouchersReceipt=$("#vouchersTotalReceipt").val();
	totalVouchersRefund=$("#vouchersTotalRefund").val();
	
	var voucherDetails=$("#vouchersDetailsFromTo").html();
	
	/*************************** Get Discounts for current hisab start ******************************/		
	// Get discounts of diagnosis,Opd & IPD 
	totalDiagDiscount=$("#diagnosisDiscount").val();
	totalOpdDiscount=$("#opdDiscount").val();
	totalIpdDiscount=$("#ipdTotalDiscount").val();	
	/*************************** Get Discounts for current hisab end ******************************/		
	
	/*************************** calculate totals for current hisab start *************************/		
	// Calculate Total cash of Diagnosis Opd Ipd & Vouchers
	totalDiagCash=Number(totalDiagReceipt)-Number(totalDiagRefund)-Number(totalDiagDiscount);	
	totalOpdCash=Number(totalOpdReceipt)-Number(totalOpdRefund)-Number(totalOpdDiscount);
	totalIpdCash=Number(totalIpdReceipt)-Number(totalIpdRefund)-Number(totalIpdDiscount);	
	totalVouchersCash=Number(totalVouchersReceipt)-Number(totalVouchersRefund);		
	/*************************** calculate totals for current hisab end *************************/
		
	// Calculate totals of all sections
	totalReceipt=Number(totalDiagReceipt)+Number(totalOpdReceipt)+Number(totalIpdReceipt)+Number(totalVouchersReceipt);
	totalRefund=Number(totalDiagRefund)+Number(totalOpdRefund)+Number(totalIpdRefund)+Number(totalVouchersRefund);
	totalDiscount=Number(totalDiagDiscount)+Number(totalOpdDiscount)+Number(totalIpdDiscount);
	totalCash=Number(totalReceipt)-Number(totalRefund)-Number(totalDiscount);
	
	// Set table contents using fetched values 
	divcontent=divcontent+"<tr><th scope='row'>Total Receipt Amount</th>"
		   +"<td>"+totalDiagReceipt+" <button data-target='#servicewiseDiagHisabFromTo' data-toggle='modal'>Get Details</button></td>"
		   +"<td>"+totalOpdReceipt+" <button data-target='#servicewiseOpdHisabFromTo' data-toggle='modal'>Get Details</button></td>"
		   +"<td>"+totalIpdReceipt+"</td>"
		   +"<td>"+totalVouchersReceipt+" <button data-target='#servicewiseVouchersHisabFromTo' data-toggle='modal'>Get Details</button> </td>"
		   +"<td>"+totalReceipt+"</td>";		
		  
		   divcontent=divcontent +"<tr><th scope='row'>Total Refund Amount</th>"
		   +"<td>"+totalDiagRefund+"</td>"
		   +"<td>"+totalOpdRefund+"</td>"
		   +"<td>"+totalIpdRefund+"</td>"
		   +"<td>"+totalVouchersRefund+"</td>"
		   +"<td>"+totalRefund+"</td>";	
		  	   			   
		   divcontent=divcontent+"<tr><th scope='row'>Total Discount Amount</th>"
		   +"<td>"+totalDiagDiscount+"</td>"
		   +"<td>"+totalOpdDiscount+"</td>"
		   +"<td>"+totalIpdDiscount+"</td>"
		   +"<td>0</td>"
		   +"<td>"+totalDiscount+"</td>";
		  
		   divcontent=divcontent+"<tr><th scope='row'>Total Cash Amount</th>"
		  /* +"<td>"+Number(totalDiagCash)-Number($("#diagnosisDiscount").val())+"</td>"
		   +"<td>"+Number(totalOpdCash)-Number($("#opdDiscount").val())+"</td>"*/
		   +"<td>"+totalDiagCash+"</td>"
		   +"<td>"+totalOpdCash+"</td>"
		   +"<td>"+totalIpdCash+"</td>"
		   +"<td>"+totalVouchersCash+"</td>"
		   +"<td>"+totalCash+"</td>";			  
		  
		   $("#hisabDetails1").html(divcontent);
	
	// Set data in popups
	$("#diagDetailsFromTo").html(diagDetails);
	$("#opdDetailsFromTo").html(opdDetails);
	$("#vouchersDetailsFromTo").html(voucherDetails);					
}

/************
* @author	: Vinod Udawant
* @date		: 25-Oct-2017
* @codeFor	: Autosuggesion for doctor names
*************/
function setAutoSugForDoctorList(inputId, callFrom) {

	//alert(callFrom);
	var letter = "";
	var specialisationId = 0;
	
	if (callFrom == "all") {
		letter = $("#"+inputId).val();
	}else if(callFrom == "profees"){
		letter = $("#"+inputId).val();//enterd letter 
		specialisationId = 0;//$("#drDeptId").val();//hosp specialisation id
	}

	var inputs = [];

	inputs.push('letter=' + letter);
	inputs.push('callFrom=' + callFrom);
	inputs.push('specialisationId=' + specialisationId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/setAutoSugForDoctorList",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			//setTempAllReq(r);
			//alert(r.lstDoctorDto.length);
			setTempAutoSugDocList(r, inputId);
		}
	});
}

function setTempAutoSugDocList(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id
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
				// These next two options are what this plugin adds to
				// the
				// autocomplete widget.
				showHeader : true,
				columns : [ /*
							 * { name : 'chargesId', width : '100px', valueField :
							 * 'chargesId' },
							 */{
					name : 'Doctor Name',
					width : '100px',
					
					valueField : 'doc_name'
				}/*, {
					name : 'Doctor_ID',
					width : '68px',
					valueField : 'Doctor_ID'
				}*/ ],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					// console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != '!!!!') {
						// $('#results').text(ui.item ? 'Selected: ' +
						// ui.item.dn + ', '+ spl + ', '+
						// ui.item.specialisationName + ', ' +
						// ui.item.depNm: 'Nothing selected, input was '
						// + this.value);
						// $('#' + id).val(ui.item.dn);
						// $('#userDocId').val(ui.item.ui);
						// $('#selectedObj').html(JSON.stringify(ui.item));
						$('#'+id).val(ui.item.doc_name);//set doctor name
						$('#drId').val(ui.item.doctor_ID);//set doctor id
						//$('#drDeptId').val(ui.item.specialisation);//set specialisation
						
					}
					setAutoSugForDoctorList(id, 'profees');
					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstDoctorDto.length);
					var result;
					if (!data || data.lstDoctorDto.length === 0
							|| !data.lstDoctorDto
							|| data.lstDoctorDto.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/* 'dn' : 'No', */
							'doc_name' : 'No Record',
							//'Doctor_ID' : 'Found'
						/* 'depNm' : 'Match' */
						} ];
					} else {
						result = data.lstDoctorDto;// Response List for
						// All
						// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

/************
* @author	: Vinod Udawant
* @date		: 25-Oct-2017
* @codeFor	: Fetch profees hisab
*************/
function fetchProFeesHisab(callFrom) {

	var unitId = parseInt($("#unitId").val());
	var userId = parseInt($("#userId").val());	
	var deptId = $("#deptId").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var drId = $('#drId').val();
	
	var inputs = [];
	inputs.push("unitId=" + unitId);
	inputs.push("userId=" + userId);
	inputs.push('deptId=' + deptId);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('drId=' + drId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/fetchProFeesHisab",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			//setTempAllReq(r);
			//alert(r.lstDoctorDto.length);
			setProfeesHisabTemp(r);
		}
	});
}

function setProfeesHisabTemp(r){
		
	var temp="";
	var totHosp=0,totPf=0,totPfPaid=0;
	for(var i=0;i<r.listVoucher.length;i++){
		
		var hospAmt=r.listVoucher[i].totalHospAmount;
		var pfAmt=r.listVoucher[i].totalPfAmount;
		var pfPaid=r.listVoucher[i].totalPfPaid;
		
		temp=temp+'<tr>' 
		+ '<td class="col-md-1 center"><div class="TextFont">'+(i+1)+'</div></td>'
		+ '<td class="col-md-4 center"><div class="TextFont">'+r.listVoucher[i].doctorName+'</div></td>'
		+ '<td class="col-md-2 center"><div class="TextFont">'+pfAmt+'</div></td>'
		+ '<td class="col-md-2 center"><div class="TextFont">'+hospAmt+'</div></td>'		
		+ '<td class="col-md-2 center"><div class="TextFont">'+pfPaid+'</div></td>'
		+ '</tr>';
		
		totHosp=Number(totHosp)+Number(hospAmt);
		totPf=Number(totPf)+Number(pfAmt);
		totPfPaid=Number(totPfPaid)+Number(pfPaid);
		
	}

	$("#tableTestDash").html(temp);
	
	var totTemp='<tr>'
		
		+ '<td class="col-md-4 center"><div class="TextFont">'+totHosp+'</div></td>'
		+ '<td class="col-md-4 center"><div class="TextFont">'+totPf+'</div></td>'
		+ '<td class="col-md-4 center"><div class="TextFont">'+totPfPaid+'</div></td>'
		+ '</tr>';
	$("#tableTestVouchar").html(totTemp);		
}