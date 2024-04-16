function getLedgerHeads11(id){
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
	        divContent = divContent + "<select name='Ledger Head Name' class='col-md-12'><option value='0'>--Select Ledger Head Name--</option>";
	         for ( var i = 0; i < r.ledger_headList.length; i++) {          
	        	 divContent = divContent + "<option value='" + r.ledger_headList[i].ledger_head_ID + "'>"+ r.ledger_headList[i].ledger_head_name + "</option>";
	            }
	            divContent = divContent + "</select>";
	            $("#leadgerHeadsId").html(divContent);
		}
	});
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Ledger Heads
******************************************************************************************************/
function getLedgerHeads(id){
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
	        divContent = divContent + "<select name='Ledger Head Name' class='col-md-12'><option value='0'>--Select Ledger Head Name--</option>";
	         for ( var i = 0; i < r.ledger_headList.length; i++) {          
	        	 divContent = divContent + "<option value='" + r.ledger_headList[i].ledger_head_ID + "'>"+ r.ledger_headList[i].ledger_head_name + "</option>";
	            }
	            divContent = divContent + "</select>";
	            $("#leadgerHeadsId").html(divContent);
		}
	});
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Authorised Doctor List
******************************************************************************************************/
/*function getAuthorisedDoctorList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/cashvoucher/getAllAuthorisedDoctor",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
	        divContent = divContent + "<select class='col-md-12'><option value='0'>--Select authorised doctor--</option>";
	         for ( var i = 0; i < r.listDoctorDetailsDto.length; i++) {          
	        	 divContent = divContent + "<option value='" + r.listDoctorDetailsDto[i].doctor_ID + "'>"+ r.listDoctorDetailsDto[i].doc_name + "</option>";
	            }
	            divContent = divContent + "</select>";
	            $("#authorisedById").html(divContent);
		}
		});
}*/


function fetchAuthorisedBy(callFrom) {
	callFrom = "onload";

	var inputs = [];
	inputs.push('action=fetchAuthorisedBy');
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/admindata/fetchAuthorisedBy",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			/*var data = eval('(' + r + ')');
			$("#discAuthSel").setTemplate(authorisedByListTemplate);
			$("#discAuthSel").processTemplate(data);

			$("#docDiscAuthSel").setTemplate(authorisedByListTemplate);
			$("#docDiscAuthSel").processTemplate(data);*/
			setAuthorisedBy(r);
		}
	});
}

function setAuthorisedBy(r){
	
	/*var htm = "<option value=0>-- Select Authorised By --</option>";
	for(var i=0;i<r.doctorList.length;i++){
		
		htm = htm + "<option value="+r.doctorList[i].doctor_ID+">"+r.doctorList[i].doc_name+"</option>";
	}
	$("#discAuthSel").html(htm);
	$("#docDiscAuthSel").html(htm);
	$("#discAuthSel").select2();
	$("#docDiscAuthSel").select2();
	*/
	

	var divContent = "";
    divContent = divContent + "<select class='col-md-12'><option value='0'>--Select authorised doctor--</option>";
     for ( var i = 0; i < r.doctorList.length; i++) {          
    	 divContent = divContent + "<option value='" + r.doctorList[i].doctor_ID + "'>"+ r.doctorList[i].doc_name + "</option>";
        }
        divContent = divContent + "</select>";
        $("#authorisedById").html(divContent);

}
	
/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for Validate only numbers
******************************************************************************************************/
function validateNumber(evt){
	 evt = (evt) ? evt : window.event;
	   var charCode = (evt.which) ? evt.which : evt.keyCode;
	   if (charCode > 32 && (charCode < 48 || charCode > 57)) {
		   alert("Enter only numbers");
	      return false;
	    }
	    return true;
}



/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get General Vouchers
******************************************************************************************************/
function getGeneralVouchers(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/generalvoucher/getAllGeneralVoucher",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
	        divContent = divContent + "<select class='col-md-12'><option value='0'>--Select Voucher--</option>";
	         for ( var i = 0; i < r.voucherList.length; i++) {          
	        	 divContent = divContent + "<option value='" + r.voucherList[i].voucherID + "'>"+ r.voucherList[i].voucherName + "</option>";
	            }
	            divContent = divContent + "</select>";
	            $("#voucherTypeId").html(divContent);

		}
		});
	
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for set title of General Vouchers
******************************************************************************************************/
	function setTitle() {
		var voucherType=$("#voucherTypeId option:selected").text();	
		$("#title").html(voucherType);
	}

	
/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for set title of General Vouchers
******************************************************************************************************/
	function clearCashVoucherForm() {
		$('#idCashVoucher').val('0');
		$('#voucherTypeId').val();
		$('#payTo').val('');
		$('#amount').val('');
		$('#vouchername').val('0');
		$('#leadgerHeadsId').val('0');
		$('#authorisedById').val('0');
		$('#narration').val('');
		$('#dateCashVoucher').val('');
		$('#voucherTypeId').val('');
		
		}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for save Cash Voucher
******************************************************************************************************/
function saveCashVoucher(){
	var cashVoucher={cashVouchersList:[]};
	
	var voucherTypeId = $('#voucherTypeId').val();
	if (voucherTypeId == "" || voucherTypeId == '0' || voucherTypeId==null) {
		alert("please select voucher Type");
		$("#voucherTypeId").focus();
		return false;
	}	
	
	var authorisedById = $('#authorisedById').val();
	if (authorisedById == "" || authorisedById == 0) {
		alert("please select authorised By");
		$("#authorisedById").focus();
		return false;
	}	
	
	var dateCashVoucher = $('#dateCashVoucher').val();
	if(dateCashVoucher=="" || dateCashVoucher==undefined || dateCashVoucher==null){
		alert("please enter date");		
		$("#dateCashVoucher").focus();					
		return false;
	}	
	
	var amount = $('#amount').val();
	if(amount=="" || amount==undefined || amount==null){
		alert("please enter amount");		
		$("#amount").focus();					
		return false;
	}
	
	var narration = $('#narration').val();
	if(narration=="" || narration==undefined || narration==null){
		alert("please enter narration");		
		$("#narration").focus();					
		return false;
	}
	
	var payTo = $('#payTo').val();
	if(payTo=="" || payTo==undefined || payTo==null){
		alert("please enter pay To");		
		$("#payTo").focus();					
		return false;
	}
	
	var idCashVoucher = $('#idCashVoucher').val();
	var voucherTypeId = $('#voucherTypeId').val();
	var payTo = $('#payTo').val();
	var amount = $('#amount').val();
	var groupVouchername =$("#vouchername option:selected").text();	
	var groupVoucherId = $('#vouchername').val();
	var leadgerHeadsId =0;// $('#leadgerHeadsId').val();
	var leadgerHeadsName = $("#leadgerHeadsId option:selected").text();	
	var authorisedById = $('#authorisedById').val();
	var referedTo="";
	var narration = $('#narration').val();
	var unitId = $('#unitId').val();
	
	cashVoucher.cashVouchersList.push({
		voucherId : idCashVoucher,
		voucherType : voucherTypeId,
		payTo : payTo,
		amount : amount,
		groupName : groupVouchername,
		groupNameId :groupVoucherId, 
		ledgerHeadId : leadgerHeadsId,
		ledgerHead : leadgerHeadsName,
		authorisedBy : authorisedById,
		referedTo : referedTo,
		narration : narration,
		unitId : unitId
	});
	// Added JSON String in Input array
	var inputs = [];
	inputs.push("cashVoucher=" + encodeURIComponent(JSON.stringify(cashVoucher)));

	// Ajax Call
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/cashvoucher/saveCashVoucher",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Record Saved Sucessfully");				
			} else if (r == 2) {
				alertify.success( "Record Updated Sucessfully");				
			}else {
				alertify.error("Oops Some Problem Ocured");
			}
			getAllCashVouchers();
		}
	});
}

function getAllCashVouchers(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/cashvoucher/getAllCashVoucher",
		cache : false,
//		error : function() {
//			alertify.error('Network Issue');
//		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.cashVouchersList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cashVouchersList[i].voucherId+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cashVouchersList[i].payTo+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cashVouchersList[i].amount+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=printVoucher('"+r.cashVouchersList[i].voucherId+"')><i class='fa fa-print'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=cancelCashVoucher('"+r.cashVouchersList[i].voucherId+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#cashVoucherDetailsBody').html(divContent);
		}
		});
}

function cancelCashVoucher(id){
	var r = confirm("Are You Sure You Want To Cancel this Voucher ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/cashvoucher/cancelCashVoucher",
		data : {
			voucherId : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(res) {
			if(res==true){
				alertify.success( "Voucher Cancel Sucessfully");		
			}
			getAllCashVouchers();
			}
		});
 	}
}


function refreshSearch(){
	$('#searchVoucherById').val('0');
	$('#searchByName').val("");
}


function searchVoucherBy(){
	var value = $('#searchVoucherById').val();
	if(value==0 || value==''){
		alert("please Select Search By");
		return false;
	}
	
	var name = $('#searchByName').val();
	if(name=="" || name==undefined || name==null){
		alert("please enter name");		
		$("#searchByName").focus();					
		return false;
	}
	
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/cashvoucher/searchVoucherBy",
			data :{
				name : name
			},
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(r) {
				var divContent = "";
				for ( var i = 0; i < r.cashVouchersList.length; i++) {
					divContent = divContent
							+ '<tr>'
							+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ r.cashVouchersList[i].voucherId+"</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ r.cashVouchersList[i].payTo+"</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ r.cashVouchersList[i].amount+"</td>";
					divContent = divContent+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-success' onclick=printVoucher('"+r.cashVouchersList[i].voucherId+"')><i class='fa fa-print'></i></button></td>";
					divContent = divContent
							+ " <td class='col-md-1 center'>"
							+ "	<button class='btn btn-xs btn-danger' onclick=cancelCashVoucher('"+r.cashVouchersList[i].voucherId+"')><i class='fa fa-trash-o'></i></button></td></tr>";
				}

				$('#cashVoucherDetailsBody').html(divContent);
			}
			});
}

function getAllcancelCashVoucher(){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/cashvoucher/getAllCancelCashVoucher",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.cashVouchersList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cashVouchersList[i].voucherId+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cashVouchersList[i].payTo+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.cashVouchersList[i].amount+"</td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=printVoucher('"+r.cashVouchersList[i].voucherId+"')><i class='fa fa-print'></i></button></td></tr>";
			}

			$('#cancelCashVoucherDetailsBody').html(divContent);
		}
		});
}

function printVoucher(voucherId)
{
	window.open("generalVoucherPrint.jsp?&voucherID=" + voucherId);
}