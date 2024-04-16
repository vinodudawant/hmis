function ConvertAmountInWords(callFrom)
{
	if(callFrom == "ExpVoucher")
		{
		var reg = /^[0-9]+$/;
		var amount = $("#amountPaid").val();
		
		if (amount != "" && !reg.test(amount)) {
			alert("Please Enter Only number!");
			$("#amountPaid").val("");
			return false;
		}
		if(amount != "")
			{
			var inputs = [];
			inputs.push('amount=' + amount);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/vouchers/convertAmountIntoString",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
				
					if(r != "")
						{
						$("#amountInWords").val(r);
						}
					else{
						$("#amountInWords").val("");
					}
				}
			});
			} else{
			$("#amountInWords").val("");
		}
		}
}

function fetchVoucherList(callFrom){
	var inputs = [];
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/getallvouchers",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(callFrom == "ledgerHead") {
				setVoucherList(r);
			} 
		}
	});
}

function setVoucherList(r){
	var divContent = "";
    divContent = divContent
            + "<select name='vouchername' class='col-md-12'><option value='0'>---Select---</option>";
    for (var i = 0; i < r.voucherList.length; i++) {            
	 			divContent = divContent + "<option value='" + r.voucherList[i].voucher_id + "'  >"
                + r.voucherList[i].voucher_name + "</option>";
    }
    divContent = divContent + "</select>";
    $("#selectVoucherGrp").html(divContent);
}


function selectVoucherGrppp(str1){
	//var str1 = $('#selectVoucherGrp :selected').val();
		setLedgerHead(str1);
};

var headListTemp = "<option value='0'>-Select-</option>{#foreach $T.ledgerHeadList as ledgerHeadList"
	+ "}<option value='{$T.ledgerHeadList.lhID}'>{$T.ledgerHeadList.lhName}</option>{#/for}";

function setLedgerHead(str){
	var inputs = [];
	inputs.push('action=setLedgerHead');
	inputs.push('str=' + str);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			$("#ledgerHead").html(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				$("#selectLedgerHead").setTemplate(headListTemp);
				$("#selectLedgerHead").processTemplate(obj);
				
			}, 5);
		}
	});
}



function saveExpenseVoucher()
{
	var companyName = $("#companyName").val();
	var bdate = $("#bdate").val();
	var paymentTo = $("#paymentTo").val();
	var amountPaid = $("#amountPaid").val();
	var amountInWords = $("#amountInWords").val();
	var selAmountType = $("#selAmountType").val();
	var selRefTo = $("#selRefTo").val();
	var chequeNumber = $("#chequeNumber").val();
	var txtAmount = $("#txtAmount").val();
	var txtRemark = $("#txtRemark").val();
	var queryType = $("#queryType").val();
	var idipd = $("#ipdID").val();
	var grpid = $("#vouchername").val();
	var ledgerHeadid = $("#leadgerHeadsId").val();
	var grpName = $("#selectVoucherGrp option:selected").val();
	var ledgerHead =  $("#selectLedgerHead option:selected").val();
	var pattern = /^([a-z-A-Z])*$/;
	
	var idipdExpenceVoucher=$("#idipdExpenceVoucher").val();
/*
 * if(amountInWords.match()) { alert("Amount in words allow characters only..");
 * $("#amountInWords").focus(); return false; }
 */

	if(paymentTo == 0){
		alert("Please Enter Payment-To Field!!");
		SetFocus("paymentTo");
		return false;
	}else if(grpid == 0){
		alert("Please select Group Name!!");
		SetFocus("selectVoucherGrp");
		return false;
	}else if(amountPaid == 0){
		alert("Please Enter Total Amount to Paid!!");
		SetFocus("amountPaid");
		return false;
	}else if(txtAmount == 0){
		alert("Please Enter Amount Paid!!");
		SetFocus("txtAmount");
		return false;
	}else if(selAmountType == "select"){
		alert("Please select Payment Mode!!");
		SetFocus("selAmountType");
		return false;
	}else if(ledgerHeadid == null){
		ledgerHeadid = "0";
	}
	
	if(txtAmount==0)
		{
		alert("Please fill in all fields!!");
	return false;
		}
	
	
	var VoucherDetails = {
			ipdExpenseLi : []
        };
    VoucherDetails.ipdExpenseLi.push({
        
    	idipdExpense:idipdExpenceVoucher,
    	ipdCompName : companyName,
    	//bdate : bdate,
    	ipdPayTo : paymentTo,
    	idgrp : grpid,
    	idlh : ledgerHeadid,
    	refTo : selRefTo,   
    	amount : txtAmount,
    	ipdPaidAmt : amountPaid,
    	ipdAmtInWords : amountInWords,
    	paymode : selAmountType,    	 	
    	chequeNumber : chequeNumber,    	
    	remark : txtRemark	
    });
    
    VoucherDetails = JSON.stringify(VoucherDetails);
	
	var inputs = [];
	inputs.push('queryType=' + queryType);
	inputs.push("voucherDetails="+ encodeURIComponent(VoucherDetails));
	
	var str = inputs.join('&');
	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "IPDTreatmentServlet",
		url : "ehat/vouchers/saveExpenseVoucher",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			if (r == "Voucher Saved sucessfully") {
				alertify.success("Voucher Saved sucessfully");
			} else if (r = "Voucher Updated succesfully") {
				alertify.success("Voucher Updated sucessfully");
			} else {
				alertify.error("Network Issue");
			}
			clearVoucher();
			getExpenceVoucher("onload");
		}
		});
}


function getExpenceVoucher(page_name) {
    
	count=1;
	var byType = $("#byType").val();
	var idvoucher=$("#ipdID").val();
	/**
	 * *MODIFIED BY
	 * 
	 * @HUSEN*******
	 */
	var regexp = /^([a-zA-Z ])*$/;
	if(!byType.match(regexp))
		{
		 alert("Company name should be of digits only with a space.");
		 $("#byType").focus();
		 return false;
		}
	 var temp = 0;
	 if(byType != "")
		 {
		   var arr = new Array();
		   arr = byType.split("");
		   if(arr[0] == " ")
			   {
			    temp = 1;
			   }
		 }
	   if(temp == 1)
	   {
	    alert("Please provide valid company name.");
	    $("#byType").focus();
	    return false;
	   }
	
	if(page_name=="byType")
		{
		 if (byType == "") {
			alert("Please enter Company name.");
			return false;
	       }
		}
	var inputs = [];
	inputs.push('page_name=' + page_name);
	inputs.push('idvoucher=' + idvoucher);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/vouchers/fetchExpenceVoucher",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r.ipdExpenceVoucherLi.length > 0)
				{				
				setTempGetExpenceVoucher(r);
				}
			else{
				 alert("Record not found");				
			}
		}
	});
}

function editExpenseVoucher(id){/*

	$('#divForEntry').show();
	$("#queryType").val("Update");
	$("#idipdExpenceVoucher").val(id);
	
	$('#selectVoucherGrp').val($('#idgrp' + id).text());
	
	selectVoucherGrppp($('#idgrp' + id).text());
	
	if ($('#chequeNumber' + id).text() > 0) {
		$('#chequeNo').show();
	} else {
		$('#chequeNo').hide();
	}
	$('#companyName').val($('#ipdCompName' + id).text());
	$('#paymentTo').val($('#ipdPayTo' + id).text());
	$('#selRefTo').val($('#refToId' + id).text());
	$('#txtAmount').val($('#amount' + id).text());
	$('#amountPaid').val($('#ipdPaidAmt' + id).text());
	$('#amountInWords').val($('#ipdAmtInWords' + id).text());
	$('#selAmountType').val($('#paymode' + id).text());
	$('#chequeNumber').val($('#chequeNumber' + id).text());
	$('#txtRemark').val($('#remark' + id).text());

	setTimeout(function() {
		$('#selectLedgerHead').val($('#idlh' + id).text());
	}, 50);*/
	
	var voucherId = id;
	var inputs = [];
	inputs.push('idipdExpenceVoucher=' + voucherId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		 url : "ehat/vouchers/editExpenseVoucher",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

				var refTo="";
				if(r.refTo == 1){
					refTo="OPD";
				}else if(r.refTo == 2){
					refTo="IPD";
				}else if(r.refTo == 3){
					refTo="Diagnostic";
				}
 				
				var paymentMode="";
				if(r.paymentMode == 1){
					paymentMode="Cash";
				}else if(r.paymentMode == 2){
					paymentMode="Cheque";
				}
					alert("r.expenseVoucherGroup.voucher_name"+r.expenseVoucherGroup.voucher_name);
			
						$('#companyName').val(r.companyName);
						$('#paymentTo').val(r.paymentTo);
						$('#selAmountType').select2('val',r.paymentMode);
						$('#vouchername').select2('val',r.grpid);
						$('#leadgerHeadsId').select2('val',r.ledgerHeadid);
						$('#selRefTo').select2('val',r.refTo);
						$('#txtAmount').val(r.amount);
						$('#amountPaid').val(r.paidAmount);
						$('#amountInWords').val(r.amountInWords);
						$('#txtRemark').val(r.remark);
						$('#chequeNo').val(r.chequeNumber);
															
		}
	});
}

function setTempGetExpenceVoucher(r){
	
	var expenceVoucherTemplate="";
	for ( var i = 0; i < r.ipdExpenceVoucherLi.length; i++) {

		//if(r.ipdExpenseLi[i].serviceId==1){
		var refTo="";
		if(r.ipdExpenceVoucherLi[i].refTo == 1){
			refTo="OPD";
		}else if(r.ipdExpenceVoucherLi[i].refTo == 2){
			refTo="IPD";
		}else if(r.ipdExpenceVoucherLi[i].refTo == 3){
			refTo="Diagnostic";
		}
		
		
		var paymentMode="";
		if(r.ipdExpenceVoucherLi[i].paymentMode == 1){
			paymentMode="Cash";
		}else if(r.ipdExpenceVoucherLi[i].paymentMode == 2){
			paymentMode="Cheque";
		}
		

		expenceVoucherTemplate = expenceVoucherTemplate

				+ '<tr>' 
				+ '<td class="center">'+(i+1)+'</td>'
				+ '<td class="col-md-1 center"id="voucherDate'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].voucherDate+'</td>'
				+ '<td class="col-md-2 center"id="ipdCompName'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].companyName+'</td>'
				+ '<td class="col-md-1 center"id="paymode'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].paymentMode+'</td>'
				+ '<td class="col-md-1 center"id="voucher_name'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].grpname+'</td>'
				+ '<td class="col-md-2 center"id="lhName'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].ledgerHeadname+'</td>'
				+ '<td class="col-md-1 center"id="refTo'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+refTo+'</td>'
				+ '<td class="col-md-2 center"id="ipdPayTo'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].paymentTo+'</td>'
				+ '<td class="col-md-1 center"id="amount'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].amount+'</td>'
				+ '<td class="col-md-2 center"id="ipdPaidAmt'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].paidAmount+'</td>'	
				
				+ '<td class="col-md-1 center" style="display:none;" id="chequeNumber'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].chequeNumber+'</td>'
				+ '<td class="col-md-1 center" style="display:none;" id="ipdAmtInWords'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].ipdAmtInWords+'</td>'
				+ '<td class="col-md-1 center" style="display:none;" id="remark'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].remark+'</td>'
				+ '<td class="col-md-1 center" style="display:none;" id="idgrp'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].idgrp+'</td>'
				+ '<td class="col-md-1 center" style="display:none;" id="idlh'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].idlh+'</td>'
				+ '<td class="col-md-1 center" style="display:none;" id="refToId'+(r.ipdExpenceVoucherLi[i].idipdExpense)+'">'+r.ipdExpenceVoucherLi[i].refTo+'</td>'
				
				+'<td class="col-md-1 center" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit onclick="editExpenseVoucher('+r.ipdExpenceVoucherLi[i].idipdExpenceVoucher+')"><i class="fa fa-edit"></i></button></td>'
				+ '<td class="col-md-1 center"><button class="btn btn-xs btn-success deleteUserAccess" value="DELETE" id=btnDelete '+r.ipdExpenceVoucherLi[i].idipdExpense+' onclick=deleteExpenceVoucher('+r.ipdExpenceVoucherLi[i].idipdExpenceVoucher+') > <i class="fa fa-trash-o"></i></button> </td>' 
				+ '<td class="col-md-1 center"><button class="btn btn-xs btn-success " value="DELETE" id=btnPrintrint '+r.ipdExpenceVoucherLi[i].idipdExpense+' onclick=printExpenceVoucher('+r.ipdExpenceVoucherLi[i].idipdExpenceVoucher+') > <i class="fa fa-print"></i></button> </td>'
				+ '</tr>';
	}
	$("#container").html(expenceVoucherTemplate);
}



function clearVoucher(){

	$("#queryType").val("insert");
	$("#idipdExpenceVoucher").val(0);
	$('#selectVoucherGrp').val(0);
	$('#chequeNo').hide();
	$('#selectLedgerHead').val(0);
	$('#receivedFrom').val("");
	$('#companyName').val("");
	$('#paymentTo').val("");
	$('#selRefTo').val(0);
	$('#txtAmount').val(0);
	$('#amountPaid').val("");
	$('#amountInWords').val("");
	$('#selAmountType').val("select");
	$('#chequeNumber').val(0);
	$('#txtRemark').val("");
	
}

function deleteExpenceVoucher(id){
	var inputs = [];
	inputs.push('idipdExpenceVoucher=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		 url : "ehat/vouchers/deleteExpenceVoucher",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			if(r==1){
				alertify.error("Voucher deleted successfully");
			}else{
				alertify.error("Network Issue");
			}
			getExpenceVoucher();
		}
	});
	
}

function setLedgerHead(id){
	var inputs = [];
	inputs.push('idLedgerHead=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		 url : "ehat/vouchers/setLedgerHead",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			var divContent = "";
		    divContent = divContent
		            + "<select name='vouchername' class='col-md-12'><option value='0'>---Select---</option>";
		    for (var i = 0; i < r.ledgerHeadList.length; i++) {            
			 			divContent = divContent + "<option value='" + r.ledgerHeadList[i].lhID + "'  >"
		                + r.ledgerHeadList[i].lhName + "</option>";
		    }
		    divContent = divContent + "</select>";
		    $("#selectLedgerHead").html(divContent);

		}
	});
	
}


function printExpenceVoucher(idipdExpense)
{
	var eid = idipdExpense.toString();
	window.open("ExpenseVoucherPrint.jsp?idipdExpense="+ eid);
    
	/*var inputs = [];
	inputs.push('idipdExpense=' + idipdExpense);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "IPDTreatmentServlet",
		 url : "ehat/vouchers/printExpenceVoucher",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r.ipdExpenseLi.length > 0)
				{				
				//setTempGetExpenceVoucher(r);
				}
			else{
				 alert("Record not found");				
			}
		}
	});*/

	
	}	