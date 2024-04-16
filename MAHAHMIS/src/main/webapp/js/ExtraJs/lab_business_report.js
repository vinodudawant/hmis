/*
* @author:Vishant Pawar
* @date : 19-Feb-24
* 
*/
function fetchAllCustomerTypes2(){
	
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getalltype',
		type : 'GET',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select Type-</option>';
			
			for(var i=0; i<r.tmCmLookupDetLookupList.length; i++)
				htm += '<option value="'+r.tmCmLookupDetLookupList[i].lookup_det_id+'">'+r.tmCmLookupDetLookupList[i].lookup_det_desc_rg+"</option>";
			
			$('#custType').html(htm);
			$('#custType').select2();
		}
	
	});
}
/*
* @author:Vishant Pawar
* @date : 24-Jan-24
* 
*/
function fetchCustomerTypeByUnitId(id, name){
	
	var val = $('#'+id).val();
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getCustomersFromTypeByIds',
		data : { 'type' : val.toString() },
		type : 'POST',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			
			var htm = '<option value="0">-Select Name-</option>';
			
			for(var i=0; i<r.businessMasterDto.length; i++)
				htm += '<option value="'+r.businessMasterDto[i].id+'">'+r.businessMasterDto[i].name+"</option>";
			
			$('#custTypeForRegPage2').html(htm);
			$('#custTypeForRegPage2').select2();
			/*$('#'+name).html(htm);
			$('#'+name).select2();*/
		}	
	});
}
/*
* @author:Vishant Pawar
* @date : 19-Feb-24
* 
*/
function fetchCustomerType(){
	
	
	var startIndex=0;
    var type=2;
    var radioValue1 = "ACTIVE";//$("input[name='state']:checked").val();
	var inputs = [];
	inputs.push('type=' + type);
	inputs.push('startIndex=' +startIndex);
	inputs.push('radioval=' + radioValue1);
	var str = inputs.join('&');
	//var val = $('#'+id).val();
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getAllBusinessLabMaster',
		data : str + "&reqType=AJAX",
		type : 'GET',
		error() {
			alert('something went wrong....')
		},
		success(r) {

			var htm = '<option value="0">-Select Type-</option>';
			
			for(var i=0; i<r.businessMasterDto.length; i++)
				htm += '<option value="'+r.businessMasterDto[i].id+'">'+r.businessMasterDto[i].name+"</option>";
			
			$('#custTypeForRegPage2').html(htm);
			$('#custTypeForRegPage2').select2();
		}	
	});
}
/*
* @author:Vishant Pawar
* @date : 19-Feb-24
* 
*/
function fetchLabBusinessReport(){
	
	var fromDate = ($("#fromDate").val()).split("/");
	//var fromDate = $("#inputromDate").val();
	
	var fdate =(fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);
	
	var toDate = ($("#toDate").val()).split("/"); //added by sandip
	var organizationIds = $("#custTypeForRegPage2").val();
	
	if(organizationIds==null){
		organizationIds=0;
	}
	
	var custType = $("#custType").val();
	
	if(custType==null){
		custType=0;
	}
	
	var labType=$("#labType").val();
	
	var tdate =(toDate[2] + "-" + toDate[1] + "-" + toDate[0]);
	
	var duesType = $("#duesType").val();
	
	
	if (fdate == "" || fdate == undefined) {
		alert("Please Select From Date!");
		$("#fromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (tdate == "" || tdate == undefined) {
		alert("Please Select To Date!");
		$("#toDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];
	// inputs.push('action=proFeesfetchReports');
	
	inputs.push('fromDate=' + fdate);
	inputs.push('toDate=' + tdate);
	inputs.push('unitId=' + 1);
	inputs.push('organizationIds=' + organizationIds.toString());
	inputs.push('duesType=' + duesType);
	inputs.push('custType=' + custType.toString());
	inputs.push('labType=' + labType);
	
	

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/finance/fetchLabBusinessReport",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					//alert(r.admissionReportSiddhi[0].admitTime);
					
					
					var htm="";	
					
					
						if (r.length == 0
								|| r.length == null) {
							// no records.
							htm = htm
									+ "<tr style='height:30px;  color:red; font-size:30px;'><th class='center' colspan='19'>Record Not Found...!!!</th></tr>";
							
							//$("#tableTestPatientListHead").html(htmHead);
							$("#container").html(htm);
							 } else {

								 var totalGrossAmt = 0;
								 var totalDiscountAmt = 0;
								 var totalConcessionAmt = 0;
								 var totalNetAmt = 0;
								 var totalPaidAmt = 0;
								 var totalDuesAmt = 0;

							for (var i = 0; i < r.length; i++) {
							    var list = r[i];
							    var admdate = new Date(list.createdDateTime).toLocaleDateString('en-GB');

							    var totalgrossAmt = parseFloat(list.grossAmt);
							    var totaldiscountAmt = parseFloat(list.discountAmt)+parseFloat(list.concessionAmt);
							    var netAmt = totalgrossAmt-totaldiscountAmt;
							    
							    var totalpaidAmt = parseFloat(list.paidAmt).toFixed(2);
							    var totalDues = (netAmt.toFixed(2))-parseFloat(totalpaidAmt);
							    var duesType = $("#duesType").val();
							    
							 
							    
							  if(duesType=="FullPaid"){
								  
								  if(totalDues==0){
									  
									// Update totals
									    totalGrossAmt += totalgrossAmt;
									    totalDiscountAmt += parseFloat(list.discountAmt);
									    totalConcessionAmt += parseFloat(list.concessionAmt);
									    totalNetAmt += netAmt;
									    totalPaidAmt += parseFloat(list.paidAmt);
									    totalDuesAmt += totalDues;
							    // Display data for each iteration
							    htm = htm + "<tr style='height:21px;'>"
							        + "<td class='col-md-1'>" + (i + 1) + "</td>"
							        + "<td class='col-md-1'>" + list.billId + "</td>"
							        + "<td class='col-md-1'>" + list.patientId + "</td>"
							        
							        + "<td class='col-md-3'>" + admdate + "</td>"
							        + "<td class='col-md-3'>" + list.patientName + "</td>"
							        + "<td class='col-md-1'>" + list.testName + "</td>"
							        + "<td class='col-md-1'>" + list.patientType + "</td>"
							        + "<td class='col-md-1'>" + list.paymentType + "</td>"
							        + "<td class='col-md-1'>" + list.inoutlab + "</td>"
							        + "<td class='col-md-3'>" + list.organizationName + "</td>"
							        + "<td class='col-md-1'>" + list.testHeadingName + "</td>"
							        + "<td class='col-md-1'>" + parseFloat(list.grossAmt).toFixed(2) + "</td>"
							        + "<td class='col-md-1'>" + parseFloat(list.discountAmt).toFixed(2) + "</td>"
							        + "<td class='col-md-1'>" + parseFloat(list.concessionAmt).toFixed(2) + "</td>"
							        + "<td class='col-md-1'>" + netAmt.toFixed(2) + "</td>"
							        + "<td class='col-md-1'>" + parseFloat(list.paidAmt).toFixed(2) + "</td>"
							        + "<td class='col-md-1'>" + totalDues.toFixed(2) + "</td>"
							        + "<td class='col-md-1'>" + list.remark + "</td>"
							        + "<td class='col-md-1'>" + list.refDoctorName + "</td>"
							        + "</tr>";
								  }
								  
								 }
							  else if(duesType=="PartialPaid"){
								  
								  if(totalDues!=0){
									  
									// Update totals
									    totalGrossAmt += totalgrossAmt;
									    totalDiscountAmt += parseFloat(list.discountAmt);
									    totalConcessionAmt += parseFloat(list.concessionAmt);
									    totalNetAmt += netAmt;
									    totalPaidAmt += parseFloat(list.paidAmt);
									    totalDuesAmt += totalDues;
									    // Display data for each iteration
									    htm = htm + "<tr style='height:21px;'>"
									        + "<td class='col-md-1'>" + (i + 1) + "</td>"
									        + "<td class='col-md-1'>" + list.billId + "</td>"
									        + "<td class='col-md-1'>" + list.patientId + "</td>"
									        
									        + "<td class='col-md-3'>" + admdate + "</td>"
									        + "<td class='col-md-3'>" + list.patientName + "</td>"
									        + "<td class='col-md-1'>" + list.testName + "</td>"
									        + "<td class='col-md-1'>" + list.patientType + "</td>"
									        + "<td class='col-md-1'>" + list.paymentType + "</td>"
									        + "<td class='col-md-1'>" + list.inoutlab + "</td>"
									        + "<td class='col-md-3'>" + list.organizationName + "</td>"
									        + "<td class='col-md-1'>" + list.testHeadingName + "</td>"
									        + "<td class='col-md-1'>" + parseFloat(list.grossAmt).toFixed() + "</td>"
									        + "<td class='col-md-1'>" + parseFloat(list.discountAmt).toFixed(2) + "</td>"
									        + "<td class='col-md-1'>" + parseFloat(list.concessionAmt).toFixed() + "</td>"
									        + "<td class='col-md-1'>" + netAmt.toFixed(2) + "</td>"
									        + "<td class='col-md-1'>" + parseFloat(list.paidAmt).toFixed(2) + "</td>"
									        + "<td class='col-md-1'>" + totalDues.toFixed(2) + "</td>"
									        + "<td class='col-md-1'>" + list.remark + "</td>"
									        + "<td class='col-md-1'>" + list.refDoctorName + "</td>"
									        + "</tr>";
										  }
							  }else{
								  
								// Update totals
								    totalGrossAmt += totalgrossAmt;
								    totalDiscountAmt += parseFloat(list.discountAmt);
								    totalConcessionAmt += parseFloat(list.concessionAmt);
								    totalNetAmt += netAmt;
								    totalPaidAmt += parseFloat(list.paidAmt);
								    totalDuesAmt += totalDues;
								// Display data for each iteration
								    htm = htm + "<tr style='height:21px;'>"
								        + "<td class='col-md-1'>" + (i + 1) + "</td>"
								        + "<td class='col-md-1'>" + list.billId + "</td>"
								        + "<td class='col-md-1'>" + list.patientId + "</td>"
								        
								        + "<td class='col-md-3'>" + admdate + "</td>"
								        + "<td class='col-md-3'>" + list.patientName + "</td>"
								        + "<td class='col-md-1'>" + list.testName + "</td>"
								        + "<td class='col-md-1'>" + list.patientType + "</td>"
								        + "<td class='col-md-1'>" + list.paymentType + "</td>"
								        + "<td class='col-md-1'>" + list.inoutlab + "</td>"
								        + "<td class='col-md-3'>" + list.organizationName + "</td>"
								        + "<td class='col-md-1'>" + list.testHeadingName + "</td>"
								        + "<td class='col-md-1'>" + parseFloat(list.grossAmt).toFixed(2) + "</td>"
								        + "<td class='col-md-1'>" + parseFloat(list.discountAmt).toFixed(2) + "</td>"
								        + "<td class='col-md-1'>" + parseFloat(list.concessionAmt).toFixed(2) + "</td>"
								        + "<td class='col-md-1'>" + netAmt.toFixed(2) + "</td>"
								        + "<td class='col-md-1'>" + parseFloat(list.paidAmt).toFixed(2) + "</td>"
								        + "<td class='col-md-1'>" + totalDues.toFixed(2) + "</td>"
								        + "<td class='col-md-1'>" + list.remark + "</td>"
								        + "<td class='col-md-1'>" + list.refDoctorName + "</td>"
								        + "</tr>";  
								  
							  }
							}
							

							// After the loop, add a row for the totals
							htm += "<tr style='height:21px; background-color:#ADFF2F; font-weight:bold;'>"
							    
								+ "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        
								+ "<td class='col-md-1'>Total:</td>"
							    
						        
							    + "<td>" + totalGrossAmt.toFixed(2) + "</td>"
							    + "<td>" + totalDiscountAmt.toFixed(2) + "</td>"
							    + "<td>" + totalConcessionAmt.toFixed(2) + "</td>"
							    + "<td>" + totalNetAmt.toFixed(2) + "</td>"
							    + "<td>" + totalPaidAmt.toFixed(2) + "</td>"
							    + "<td>" + totalDuesAmt.toFixed(2) + "</td>"
							    + "<td></td>"
							    + "<td></td>"
							    
							    + "</tr>";
							
							$("#container").html(htm);
							
							
						    
						}
					}
			});
}