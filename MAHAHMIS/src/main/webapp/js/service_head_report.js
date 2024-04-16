/**
 * @author:Vishant Pawar
 * @date : 24-Jan-24
 * 
 */


function fetchServiceWiseHeadReport(){
	
	var fromDate = ($("#fromDate").val()).split("/");
	//var fromDate = $("#inputromDate").val();
	
	var fdate =(fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);
	
	var toDate = ($("#toDate").val()).split("/"); //added by sandip
	//var toDate = $("#inputToDate").val();
	
	var tdate =(toDate[2] + "-" + toDate[1] + "-" + toDate[0]);
	
	var deptId = $("#deptId").val();
	var serviceId = $("#multiservicesIds").val();
	if(serviceId==null){
		serviceId=0;
	}
	
	var isPackage="0";
	if(serviceId==13){
		isPackage="1";
	}
	
	var subServiceId = $("#multiSubServicesIds").val();
	if(subServiceId==null){
		subServiceId=0;
	}
	
	var multiSchemeParent = $("#multiSchemeParent").val();
	if(multiSchemeParent==null || multiSchemeParent==""){
		multiSchemeParent=0;
	}
	
	var multiSchemeChild = $("#multiSchemeChild").val();
	if(multiSchemeChild==null || multiSchemeChild==""){
		multiSchemeChild=0;
		
		multiSchemeChild =  $("#multiSchemeChildIds").val();
	}
	
	var checkType2="";
	//var checkType = $('input[name=checkTypeRadio].checked').val();
	
	if($("#chkRquisitionDate").is(":checked")){
		checkType2="rquisitionDate";
	}
	else if($("#chkBillDate").is(":checked")){
		checkType2="billDate";
		
	}
	//var demo = $("#chkBillDate").prop('checked').val();
	
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
	inputs.push('serviceId=' + serviceId.toString());
	inputs.push('deptId=' + deptId);
	inputs.push('checkType=' + checkType2);
	inputs.push('subServiceId=' + subServiceId.toString());
	inputs.push('multiSchemeParent=' + multiSchemeParent.toString());
	inputs.push('multiSchemeChild=' + multiSchemeChild.toString());
	inputs.push('isPackage='+ isPackage)
	
	

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/finance/fetchServiceWiseHeadReport",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {var htm = "";
				var serviceGroups = {}; // To store service groups using serviceId as keys
				var specialEntries = []; // To store entries where serviceId is "1" and subServiceName is "-"

				// Check if there are no records
				if (r.serviceWiseReportList == null || r.serviceWiseReportList.length == 0) {
				    htm += "<tr style='height:30px;  color:red; font-size:30px;'><th class='center' colspan='6'>Record Not Found...!!!</th></tr>";

				    $("#tableServiceHeadReport").html(htm);

				    $("#totalRecord").text(r.serviceWiseReportList.length);

				    var fromDateValue = document.getElementById('fromDate').value;
				    var toDateValue = document.getElementById('toDate').value;

				    document.getElementById('dynamicFromDate').textContent = fromDateValue;
				    document.getElementById('dynamicToDate').textContent = toDateValue;
				} else {
				    // Iterate through the serviceWiseReportList
				    for (var i = 0; i < r.serviceWiseReportList.length; i++) {
				        var list = r.serviceWiseReportList[i];
				        var serviceId = list.serviceId;
				        
				        if ((list.serviceId !== "1" && list.serviceId !== "3") && list.subServiceName === "-") {
						    // if (list.serviceId != "1" || list.serviceId != "3" && list.subServiceId == "0") {
						        continue; // Skip further modifications for this list item
						  }

				        // If the serviceId is "1" and subServiceName is "-"
				        if (serviceId === "1" && list.subServiceName === "-") {
				            // Add the entry to the specialEntries list
				            specialEntries.push(list);
				        } else {
				            // If the serviceId is encountered for the first time
				            if (!serviceGroups.hasOwnProperty(serviceId)) {
				                // Initialize a new service group
				                serviceGroups[serviceId] = {
				                    serviceName: list.serviceName,
				                    totalAmountForService: 0,
				                    totalNetAmount: 0,
				                    totalConcesion: 0,
				                    totalDiscount: 0,
				                    totalCount: 0,
				                    entries: []
				                };
				            }

				            // Update total values for the current service group
				            serviceGroups[serviceId].totalAmountForService += parseFloat(list.amount);
				            serviceGroups[serviceId].totalNetAmount += parseFloat(list.amount) -(parseFloat(list.concession)+parseFloat(list.discount));
				            serviceGroups[serviceId].totalConcesion += parseFloat(list.concession);
				            serviceGroups[serviceId].totalDiscount += parseFloat(list.discount); // Add discount to total discount
				            serviceGroups[serviceId].totalCount += parseInt(list.count);

				            // Add current entry to the service group's entries
				            serviceGroups[serviceId].entries.push(list);
				        }
				    }

				    // Combine special entries with serviceId "1" entries
				    if (serviceGroups.hasOwnProperty("1")) {
				        // Add specialEntries to the serviceId "1" entries
				        //serviceGroups["1"].entries["0"].count += parseInt(specialEntries["0"].count);
					    if(specialEntries.length>0){
					    	
					   	
					    	serviceGroups["1"].totalAmountForService += parseFloat(specialEntries["0"].amount);
					        serviceGroups["1"].totalConcesion += parseFloat(specialEntries["0"].concession);
					        serviceGroups["1"].totalDiscount += parseFloat(specialEntries["0"].discount);
					        serviceGroups["1"].totalCount += parseInt(specialEntries["0"].count);
					    }
				    } else {
				        // If serviceId "1" entries don't exist, create a new service group
				        serviceGroups["1"] = {
				            serviceName: "", // Add the service name if needed
				            totalAmountForService: 0,
				            totalNetAmount: 0,
				            totalConcesion: 0,
				            totalDiscount: 0,
				            totalCount: 0,
				            
				            entries: specialEntries
				        };
				    }

				    var totalServiceCount = 0;
				    var totalAmount = 0;
				    var totalConcession = 0;
				    var totalDiscount = 0;
				    var totalNetAmount = 0;
				    var srNoCount=1;
				    // Display results for each service group
				    for (var serviceId in serviceGroups) {
				        if (serviceGroups.hasOwnProperty(serviceId)) {
				            var serviceGroup = serviceGroups[serviceId];
				            totalServiceCount += serviceGroup.totalCount;
				            totalAmount += serviceGroup.totalAmountForService;
				            totalConcession += serviceGroup.totalConcesion;
				            totalDiscount += serviceGroup.totalDiscount;
				            totalNetAmount += serviceGroup.totalNetAmount;

				            if(serviceId=="1"){
					        	  
					        	  if(serviceGroup.entries.length>0){
				            // Display header for the service group
				            htm += "<tr style='height:25px; color:black; background-color:#9BB7D4; font-size:15px;'><th colspan='7' style='text-align: left;'>Service Name:" + serviceGroup.serviceName + "</th></tr>";
					        	  }
					       }else{
					    	   htm += "<tr style='height:25px; color:black; background-color:#9BB7D4; font-size:15px;'><th colspan='7' style='text-align: left;'>Service Name:" + serviceGroup.serviceName + "</th></tr>";
					       }
				            
				            
				            // Display data for each entry in the service group
				            serviceGroup.entries.forEach(function(entry, index) {
				            	
				            	var serviceConcession=parseFloat(entry.concession);
				            	var serviceDiscount=parseFloat(entry.discount);
				            	var serviceAmount=parseFloat(entry.amount);
				            	var serviceNetAmount=serviceAmount-(serviceConcession+serviceDiscount);
				            	
				            	
				                htm += "<tr style='height:21px;'>"
				                    + "<td class='col-md-1'>" + srNoCount + "</td>";

				                if (entry.serviceName == "Bed") {
				                    if (entry.subServiceName == "-")
				                        htm += "<td class='col-md-1'>Nursing</td>";
				                    else
				                        htm += "<td class='col-md-1'>" + entry.subServiceName + "</td>";
				                } else {
				                    htm += "<td class='col-md-1'>" + entry.subServiceName + "</td>";
				                }

					            if (serviceId=="1") { 
					                htm += "<td class='col-md-1'>" + serviceGroup.totalCount + "</td>"
					              //  htm += "<td class='col-md-1'>" + entry.count + "</td>"
				                    + "<td class='col-md-1'>" + serviceAmount.toFixed(2) + "</td>"
				                    + "<td class='col-md-2'>" + serviceConcession.toFixed(2) + "</td>"
				                    + "<td class='col-md-2'>" + serviceDiscount.toFixed(2) + "</td>"
				                    + "<td class='col-md-3'>" + serviceNetAmount.toFixed(2) + "</td>"
				                    + "</tr>";
					                
					            }
					            else{
					            	htm += "<td class='col-md-1'>" + entry.count + "</td>"
				                    + "<td class='col-md-1'>" + serviceAmount.toFixed(2) + "</td>"
				                    + "<td class='col-md-2'>" + serviceConcession.toFixed(2) + "</td>"
				                    + "<td class='col-md-2'>" + serviceDiscount.toFixed(2) + "</td>"
				                    + "<td class='col-md-3'>" + serviceNetAmount.toFixed(2) + "</td>"
				                    + "</tr>";
					            	
					            	srNoCount++;
					            }
					            
					            
					            
				            });
				            

				          if(serviceId=="1"){
				        	  
				        	  if(serviceGroup.entries.length>0){
				        	  // Display total row for the service group
					            htm += "<tr style='height:21px; background-color:#D3D3D3; font-weight:bold;'>"
					                + "<td class='col-md-1'></td>"
					                + "<td class='col-md-1'>Service Total:</td>"
					                + "<td class='col-md-1'>" + serviceGroup.totalCount + "</td>"
					                + "<td class='col-md-1'>" + serviceGroup.totalAmountForService.toFixed(2) + "</td>"
					                + "<td class='col-md-2'>" + serviceGroup.totalConcesion.toFixed(2) + "</td>"
					                + "<td class='col-md-2'>" + serviceGroup.totalDiscount.toFixed(2) + "</td>"
					                + "<td class='col-md-3'>" + serviceGroup.totalNetAmount.toFixed(2) + "</td>"
					                + "</tr>";
				        	  }
				          }else{ 
				            // Display total row for the service group
				            htm += "<tr style='height:21px; background-color:#D3D3D3; font-weight:bold;'>"
				                + "<td class='col-md-1'></td>"
				                + "<td class='col-md-1'>Service Total:</td>"
				                + "<td class='col-md-1'>" + serviceGroup.totalCount + "</td>"
				                + "<td class='col-md-1'>" + serviceGroup.totalAmountForService.toFixed(2) + "</td>"
				                + "<td class='col-md-2'>" + serviceGroup.totalConcesion.toFixed(2) + "</td>"
				                + "<td class='col-md-2'>" + serviceGroup.totalDiscount.toFixed(2) + "</td>"
				                + "<td class='col-md-3'>" + serviceGroup.totalNetAmount.toFixed(2) + "</td>"
				                + "</tr>";
				          }
				        }
				    }
				    
				 // Display the total row
				    htm += "<tr style='height:21px; background-color:#ADFF2F; font-weight:bold;'>"
				        + "<td class='col-md-1'></td>"
				        + "<td class='col-md-1'>Grand Total:</td>"
				        + "<td class='col-md-1'>" + totalServiceCount + "</td>"
				        + "<td class='col-md-1'>" + totalAmount.toFixed(2) + "</td>"
				        + "<td class='col-md-3'>" + totalConcession.toFixed(2) + "</td>"
				        + "<td class='col-md-3'>" + totalDiscount.toFixed(2) + "</td>"
				        + "<td class='col-md-1'>" + totalNetAmount.toFixed(2) + "</td>"
				        + "</tr>";

				    $("#tableServiceHeadReport").html(htm);

				    $("#totalRecord").text(r.serviceWiseReportList.length);

				    var fromDateValue = document.getElementById('fromDate').value;
				    var toDateValue = document.getElementById('toDate').value;

				    document.getElementById('dynamicFromDate').textContent = fromDateValue;
				    document.getElementById('dynamicToDate').textContent = toDateValue;
				}
}
			});
}


function getAllDept() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dept/viewAllDeptList",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTempAllForDept(r,"dept");//call template
		}
	});
}

//Vishant  Pawar @date: 24-Jan-2024 @reason : Set all fetched Dept
function setTempAllForDept(r,callFrom) {   
	if(callFrom == "unit"){
		var list = "<option value='0'>--All Dept--</option>";    
	    for ( var i = 0; i < r.lstUnit.length; i++) {    

			list = list + "<option value='"+r.lstUnit[i].unitId+"'>" + (r.lstUnit[i].unitName) + "</option>";    
			}   
		$("#unitId").html(list);
		var uId =$("#uId").val();		
		$('#unitId').val(uId);
	}
	if(callFrom == "dept"){
		var list = "<option value='0'>--All Dept--</option>";
		//var list = "";
	    for ( var i = 0; i < r.lstDepts.length; i++) {    

			list = list + "<option value='"+r.lstDepts[i].deptId+"'>" + (r.lstDepts[i].deptName) + "</option>";    
			}   
		$("#deptId").html(list);   
	}
	if(callFrom == "service"){
		var list = "<option value='0'>--All Dept--</option>";    
	    for ( var i = 0; i < r.listService.length; i++) {    

			list = list + "<option value='"+r.listService[i].serviceId+"'>" + (r.listService[i].serviceName) + "</option>";    
			}   
		$("#serviceId").html(list);   
		$("#serviceId").select2();
	}
	
	
	
}

function fetchServiceWiseBusinessReport(type){
	
	var fromDate = ($("#fromDate").val()).split("/");
	//var fromDate = $("#inputromDate").val();
	
	var fdate =(fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);
	
	var toDate = ($("#toDate").val()).split("/"); //added by sandip
	//var toDate = $("#inputToDate").val();
	
	var tdate =(toDate[2] + "-" + toDate[1] + "-" + toDate[0]);
	
	var deptId = $("#deptId").val();
	var serviceId = $("#multiservicesIds").val();
	if(serviceId==null){
		serviceId=0;
	}
	var isPackage="0";
	if(serviceId==13){
		isPackage="1";
	}
	
	var subServiceId = $("#multiSubServicesIds").val();
	if(subServiceId==null){
		subServiceId=0;
	}
	
	var multiSchemeParent = $("#multiSchemeParent").val();
	if(multiSchemeParent==null || multiSchemeParent==""){
		multiSchemeParent=0;
	}
	
	var multiSchemeChild = $("#multiSchemeChild").val();
	if(multiSchemeChild==null || multiSchemeChild==""){
		multiSchemeChild=0;
		
		multiSchemeChild = $("#multiSchemeChildIds").val();

	}
	
	var checkType2="";
	//var checkType = $('input[name=checkTypeRadio].checked').val();
	
	if($("#chkRquisitionDate").is(":checked")){
		checkType2="rquisitionDate";
	}
	else if($("#chkBillDate").is(":checked")){
		checkType2="billDate";
		
	}
	//var demo = $("#chkBillDate").prop('checked').val();
	
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
	inputs.push('isPackage='+ isPackage)
	inputs.push('toDate=' + tdate);
	inputs.push('unitId=' + 1);
	inputs.push('serviceId=' + serviceId);
	inputs.push('deptId=' + deptId);
	inputs.push('checkType=' + checkType2);
	inputs.push('type=' + type);
	inputs.push('subServiceId=' + subServiceId);
	inputs.push('multiSchemeParent=' + multiSchemeParent.toString());
	inputs.push('multiSchemeChild=' + multiSchemeChild.toString());
	
	

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/finance/fetchServiceWiseHeadReport2",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					//alert(r.list[0].admitTime);
					
					
				var htm="";
					
				//var allHall= getHallList();	
					if (r.list.length == 0
							|| r.list.length == null) {
						// no records.
						htm = htm
								+ "<tr style='height:30px;  color:red; font-size:30px;'><th class='center' colspan='14'>Record Not Found...!!!</th></tr>";
						
						//$("#tableTestVoucherListHead").html(htmHead);
						$("#tableServiceHeadReport").html(htm);
						
						$("#totalRecord").text(r.list.length);
						
						var fromDateValue = document.getElementById('fromDate').value;
					    var toDateValue = document.getElementById('toDate').value;

					    document.getElementById('dynamicFromDate').textContent = fromDateValue;
					    document.getElementById('dynamicToDate').textContent = toDateValue;
					} else {
						
						// Sort the r.list array by serviceName and then by subServiceName
						r.list.sort(function(a, b) {
						    // Compare by serviceName
						    if (a.serviceName < b.serviceName) return -1;
						    if (a.serviceName > b.serviceName) return 1;

						    // If serviceName is the same, compare by subServiceName
						    if (a.subServiceName < b.subServiceName) return -1;
						    if (a.subServiceName > b.subServiceName) return 1;

						    return 0; // If both serviceName and subServiceName are the same
						});
						
						var uniqueServiceNamesNew = {};
						
						var uniqueServiceNames = [];  // To store unique serviceName values
						var uniqueSubServiceNames = [];  // To store unique subServiceName values
						var previousService = null; // To track the previous service name
						var previousSubService = null; // To track the previous subService name

						var grandTotalAmount=0.0;
						var grandTotalConcession=0.0;
						var grandTotalDis=0.0;
						var grandTotalPaidAmt=0.0;
						var grandTotalDues=0.0;
					for (var i = 0; i < r.list.length; i++) {
					    var list = r.list[i];
					    
					    if ((list.serviceId !== "1" && list.serviceId !== "3") && list.subServiceName === "-") {
					    // if (list.serviceId != "1" || list.serviceId != "3" && list.subServiceId == "0") {
					        continue; // Skip further modifications for this list item
					    }
					   
					   // if (!uniqueServiceNames.includes(list.serviceName) || !uniqueSubServiceNames.includes(list.subServiceName)) {
					    if (!uniqueServiceNames.includes(list.serviceName) || !uniqueSubServiceNames.includes(list.serviceId+list.subServiceName)) {
					        // Display total row for the previous service and subService (if applicable)
					        if (previousService !== null && previousSubService !== null) {
					            // Add your code here to display total row for the previous service and subService
					            // You can use the existing logic for displaying total row and adjust it as needed
					       
					    // Check if hallName is not in the uniqueHallNames array
					  //  if (!uniqueHallNames.includes(list.serviceName+list.subServiceName)) {
					        // Display total row for the previous service (if applicable)
					    //    if (previousService !== null) {
					        	 htm += "<tr style='height:21px; background-color:#D3D3D3; font-weight:bold; '>"
								        + "<td class='col-md-1'></td>"
								        + "<td class='col-md-1'></td>"
								        + "<td class='col-md-1'>Service Total:</td>"
								        + "<td class='col-md-1'></td>"
								        + "<td class='col-md-1'></td>"
								        + "<td class='col-md-1'></td>"
								        + "<td class='col-md-1'></td>"
								        + "<td class='col-md-1'>" + totalNetAmount.toFixed(2) + "</td>"
								        + "<td class='col-md-3'>"+totalConcesion.toFixed(2)+ "</td>"
								        + "<td class='col-md-3'>"+totalDiscount.toFixed(2)+ "</td>"
								        + "<td class='col-md-3'>"+totalCollectedAmount.toFixed(2)+ "</td>"
						                + "<td class='col-md-1'>"+totalDuesAmount.toFixed(2)+"</td>"
								        
								       // + "<td class='col-md-1'>0</td>"
								        + "<td class='col-md-1'></td>"
								        + "<td class='col-md-1'></td>"
								        + "</tr>";
					        	 
					        	 grandTotalAmount +=totalNetAmount;
								  grandTotalConcession +=totalConcesion;
								  grandTotalDis +=totalDiscount;
								  grandTotalPaidAmt +=totalCollectedAmount;
								  grandTotalDues +=totalDuesAmount;
					        }

					        // Display header for the unique hallName
					        if (!uniqueServiceNamesNew[list.serviceName]) {
					            // Mark the service name as encountered
					        	uniqueServiceNamesNew[list.serviceName] = true;

					            // Add HTML for this unique service name
					            htm += "<tr style='height:18px; color:black; background-color:#9e9de0; font-size:15px;'><th colspan='14' style='text-align: left;'>Service Name:" + list.serviceName + "</th></tr>";
					        }
					        //htm += "<tr style='height:15px; color:black; background-color:#9e9de0; font-size:15px;'><th colspan='12'>Service Name:" + list.serviceName + "</th></tr>";
					      if(list.serviceName=="Bed"){
					    	  
					    	 if(list.subServiceName=="-") 
					    		 htm += "<tr style='height:18px; color:black; background-color:#9BB7D4; font-size:12px;'><th colspan='14' style='text-align: left;'>Sub Service Name: Nursing</th></tr>";
					    	 else
					    		 htm += "<tr style='height:18px; color:black; background-color:#9BB7D4; font-size:12px;'><th colspan='14' style='text-align: left;'>Sub Service Name:" + list.subServiceName + "</th></tr>";
					      }
					      else{
					    	 if(list.subServiceName!="-")  
					    	  htm += "<tr style='height:18px; color:black; background-color:#9BB7D4; font-size:12px;'><th colspan='14' style='text-align: left;'>Sub Service Name:" + list.subServiceName + "</th></tr>";
					      }
					        

					     // Add the serviceName and subServiceName to the uniqueServiceNames and uniqueSubServiceNames arrays to avoid displaying them again
					        uniqueServiceNames.push(list.serviceName);
					       // uniqueSubServiceNames.push(list.subServiceName);
					        uniqueSubServiceNames.push(list.serviceId+list.subServiceName);

					        // Reset total amount for the current service
					        var totalAmountForService = 0;
					        var totalNetAmount = 0;
					        var totalConcesion = 0;
					        var totalCount = 0;
					        var totalDuesAmount =0;
					        var totalCollectedAmount =0;
					        var totalDiscount =0;
					        // Update previousService with the current service
					        previousService = list.serviceName;
					        previousSubService = list.subServiceName;
					    }

					    // Update total amount for the current service
					    totalAmountForService += parseFloat(list.amount);
					    totalNetAmount += parseFloat(list.amount);
					    totalConcesion += parseFloat(list.concession);
					    totalDiscount += parseFloat(list.serviceWiseDiscountDistributed);
					    totalCount += parseInt(list.count);
					    
					    var totalNetAmountNew= parseFloat(list.amount)+(parseFloat(list.concession)+parseFloat(list.serviceWiseDiscountDistributed));
					    var serviceWiseAmtDistributed = 0.0;
					    var serviceWiseDiscountDistributed =0;
					    //var financeReportAmtDto2 = 0;
					    //var totalPaidAMt = 0;
					    var totalAmt=0.0;
					    var duesAmt =0;
					  if(list.deptId==2){  
					     serviceWiseAmtDistributed = parseFloat(list.serviceWiseAmtDistributed);
					     serviceWiseDiscountDistributed = list.serviceWiseDiscountDistributed;
					     financeReportAmtDto2 = list.financeReportAmtDto;
					     //totalPaidAMt = financeReportAmtDto2.totalPaidAMt;
					     if(parseFloat(list.amount)>=serviceWiseAmtDistributed){
					    	 
					    	 totalAmt= parseFloat(list.amount)-(parseFloat(list.concession)+serviceWiseDiscountDistributed);
					    	 duesAmt =totalAmt-serviceWiseAmtDistributed;
					     }else{
					    	 totalAmt = parseFloat(list.amount)-(parseFloat(list.concession)+serviceWiseDiscountDistributed);
					    	 duesAmt =totalAmt-serviceWiseAmtDistributed; 
					     }
					    	 
					  }
					  else if(list.deptId==1){
						  serviceWiseAmtDistributed = list.serviceWiseAmtDistributed;
						  serviceWiseDiscountDistributed = list.serviceWiseDiscountDistributed
						  totalAmt = parseFloat(list.amount)-(parseFloat(list.concession)+serviceWiseDiscountDistributed);
						  duesAmt = totalAmt-serviceWiseAmtDistributed;
						  
					  }
					  else if(list.deptId==3){
						  serviceWiseAmtDistributed = list.serviceWiseAmtDistributed;
						  serviceWiseDiscountDistributed = list.serviceWiseDiscountDistributed;
						  totalAmt = parseFloat(list.amount)-(parseFloat(list.concession)+serviceWiseDiscountDistributed);
						  duesAmt = totalAmt-serviceWiseAmtDistributed;
						  
					  }
					  
					  if(duesAmt<0){
						  duesAmt=0; 
					  }
					  
					  totalCollectedAmount +=serviceWiseAmtDistributed;
					  totalDuesAmount +=duesAmt;
					  
					  
					    
					   var date2 = list.billDate.split(" ");
					   var dateSplit = date2[0].split("-");
					   var newDate = dateSplit[2]+"/"+dateSplit[1]+"/"+dateSplit[0];
					   
				   

					    // Display data for each iteration
					    htm += "<tr style='height:21px;'>"
					        + "<td class='col-md-1'>" + (i + 1) + "</td>"
					        + "<td class='col-md-1'>" + newDate + "</td>"
					        + "<td class='col-md-1'>" + list.billNo + "</td>"
					        + "<td class='col-md-2'>" + list.patientId + "</td>"
					        + "<td class='col-md-2'>" + list.patientName + "</td>"
					        + "<td class='col-md-2'>" + list.consultantDoctor + "</td>"
					        + "<td class='col-md-2'>" + list.refDoctorName + "</td>"
					        + "<td class='col-md-1'>" + parseFloat(list.amount).toFixed(2) + "</td>"
					        + "<td class='col-md-1'>" + parseFloat(list.concession).toFixed(2) + "</td>"
					        + "<td class='col-md-1'>" + (serviceWiseDiscountDistributed).toFixed(2) + "</td>"
					     /*if($("#chkRquisitionDate").is(":checked")){    
					    	 
					     }*/
					     if(list.deptId==1 || list.deptId==2 || list.deptId==3){
					    	 htm += "<td class='col-md-1'>" + serviceWiseAmtDistributed.toFixed(2) + "</td>"
					    	 + "<td class='col-md-1'>" + duesAmt.toFixed(2) + "</td>"

					    	 //+ "<td class='col-md-1'>" + duesAmt + "</td>"
					     }
					     else{
					    	 
					    	 htm += "<td class='col-md-1'>-</td>"
							        + "<td class='col-md-1'>-</td>"
					    	/* htm += "<td class='col-md-1'>" + serviceWiseAmtDistributed.toFixed(2) + "</td>"
					    	 + "<td class='col-md-1'>" + duesAmt.toFixed(2) + "</td>"*/
					     }
					        
					    htm += "<td class='col-md-3'>" + list.patientType + "</td>"
					    htm += "<td class='col-md-3'>" + list.testType + "</td>"
					        
					        + "</tr>";
					}
				

					// Display total row for the last service (if applicable)
					if (previousService !== null && previousSubService !== null) {
					//if (previousService !== null) {
						 htm += "<tr style='height:21px; background-color:#D3D3D3; font-weight:bold; '>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'>Service Total:</td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'>" + totalNetAmount.toFixed(2) + "</td>"
						        + "<td class='col-md-3'>"+totalConcesion.toFixed(2)+ "</td>"
						        + "<td class='col-md-3'>"+totalDiscount.toFixed(2)+ "</td>"
						        + "<td class='col-md-3'>"+totalCollectedAmount.toFixed(2)+ "</td>"
				                + "<td class='col-md-1'>"+totalDuesAmount.toFixed(2)+"</td>"
						        
						       // + "<td class='col-md-1'>0</td>"
						        + "<td class='col-md-1'></td>"
						        + "<td class='col-md-1'></td>"
						        + "</tr>";
						 
						 grandTotalAmount +=totalNetAmount;
						  grandTotalConcession +=totalConcesion;
						  grandTotalDis +=totalDiscount;
						  grandTotalPaidAmt +=totalCollectedAmount;
						  grandTotalDues +=totalDuesAmount;
					}
					 
					htm += "<tr style='height:21px; background-color:#ADFF2F; font-weight:bold; '>"
				        + "<td class='col-md-1'></td>"
				        + "<td class='col-md-1'></td>"
				        + "<td class='col-md-1'>Grand Total:</td>"
				        + "<td class='col-md-1'></td>"
				        + "<td class='col-md-1'></td>"
				        + "<td class='col-md-1'></td>"
				        + "<td class='col-md-1'></td>"
				        + "<td class='col-md-1'>" + grandTotalAmount.toFixed(2) + "</td>"
				        + "<td class='col-md-3'>"+grandTotalConcession.toFixed(2)+ "</td>"
				        + "<td class='col-md-3'>"+grandTotalDis.toFixed(2)+ "</td>"
				        + "<td class='col-md-3'>"+grandTotalPaidAmt.toFixed(2)+ "</td>"
		                + "<td class='col-md-1'>"+grandTotalDues.toFixed(2)+"</td>"
				        
				       // + "<td class='col-md-1'>0</td>"
				        + "<td class='col-md-1'></td>"
				        + "<td class='col-md-1'></td>"
				        + "</tr>";
					//$("#tableTestPatientListHead").html(htmHead);
					$("#tableServiceHeadReport").html(htm);

					$("#totalRecord").text(r.list.length);
					
					 

					var fromDateValue = document.getElementById('fromDate').value;
					var toDateValue = document.getElementById('toDate').value;

					document.getElementById('dynamicFromDate').textContent = fromDateValue;
					document.getElementById('dynamicToDate').textContent = toDateValue;

}
				}
			});
}

function checkDepartmentShowHide(id){
	
	//alert(id)
	if(id==1 || id==3){
		$("#mediclaimTypeDiv").hide();
	}
	else if(id==2 || id==0){
		$("#mediclaimTypeDiv").show();
	}
	
	
}

function getAllServices() {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/totalcollection/getallserviceslist",
		success : function(r) {
			
			var alistTemp = "";
			//alistTemp = alistTemp
				//	+ "<option value='0'>--Select Services--</option>";
			for ( var i = 0; i < r.length; i++) {
				alistTemp = alistTemp + "<option value="
						+ r[i].serviceId + " data-name='"
						+r[i].serviceName + "'>"
						+ r[i].serviceName + "</option>";
			}
			$("#multiservicesIds").html(alistTemp);
			$("#multiservicesIds").select2();

			
		}
	});
}




/*******************************************************************************
 * @author : Vishant Pawar
 * @date : 12-FEB-24
 * @reason : Fetching list of Sub Service by id
 ******************************************************************************/
function getAllSubServices(callfrom) {
	
	var inputs = [];
	var url = "";
	if (callfrom == 'single') {
		var serviceId = $("#multiservicesIds").val();
		
		if (serviceId == "" || serviceId == undefined) {
			serviceId = 0;
		}
		inputs.push("serviceId=" + serviceId);

		url = "ehat/finance/fetchSubServices";

	} else {
		var serviceId = $("#multiservicesIds").val();
		if (serviceId == "" || serviceId == undefined) {
			serviceId = 0;
		}
		inputs.push("serviceId=" + serviceId.toString());
		url = "ehat/finance/fetchMultipleServices";
	}

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : url,
		error : function() {
			//alert('Network Issue!!!');
		},
		success : function(r) {
			// alert(r.lstSubService.length);
			var list = "<option value='0'>--Select Subservice--</option>";

			if (callfrom == "single") {
				for ( var i = 0; i < r.lstSubService.length; i++) {
					list = list + "<option value='" + r.lstSubService[i].subId
							+ "'>" + (r.lstSubService[i].categoryName)
							+ "</option>";
				}
				$("#multiSubServicesIds").html(list);
				$("#multiSubServicesIds").select2();
			} else {
				for ( var i = 0; i < r.length; i++) {
					list = list + "<option value='" + r[i].subId + "'>"
							+ (r[i].categoryName) + "</option>";
				}
				$("#multiSubServicesIds").html(list);
				$("#multiSubServicesIds").select2();
			}
		}
	});
}

/*******
 * @author    :Vishant
 * @Date      :`12-FEB-2023
 * @Code      :Geting sponsor list(charges master list) 
 * ******/
function fetchChargesSlave() {
	
	var inputs = [];
	// inputs.push('action=proFeesfetchReports');
	
	inputs.push('selfId=' + 0);
	inputs.push('masterId=' + 1);
	inputs.push('name=' + "parent");
	var str = inputs.join('&');
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/finance/getChragesSlaveList",
		data : str + "&reqType=AJAX",
		success : function(response) {
			
			var parentList = "<option value='0'>Select Scheme</option>";
			var childList = "<option value='0'>Select Scheme</option>";
			
			for ( var i = 0; i < response.lstChargesSlave.length; i++) {
				var isCategory = response.lstChargesSlave[i].isCategory;
				
				if (isCategory == "Y") {
					
					parentList = parentList 
					+ '<option value="'
							+ (response.lstChargesSlave[i].slaveId) + '">'
							+ (response.lstChargesSlave[i].categoryName +'(C)') 
							+ '</option>';
					
				} else {
					childList = childList + '<option value="'
							+ (response.lstChargesSlave[i].slaveId) + '">'
							+ (response.lstChargesSlave[i].categoryName +"(S)") + '</option>';
				}

			}
			
			//$("#multiScheme").html(parentList);
			//$("#multiScheme").select2();
			
			$("#multiSchemeParent").html(parentList);
			$("#multiSchemeParent").select2();
			
			$("#multiSchemeChild").html(childList);
			$("#multiSchemeChild").select2();
		
		}
	
	});

	/*var list = "<option value='0'>Select Scheme</option>";
	list += "<option value='parent'>Parent</option>";
	list += "<option value='child'>Child</option>";
	$("#multiScheme").html(list);
	$("#multiScheme").select2();
	$("#multiSchemeIds").html(list);
	$("#multiSchemeIds").select2();*/
}

/*******
 * @author    :Vishant
 * @Date      :`12-FEB-2023
 * @Code      :Geting sponsor list(charges master list) 
 * ******//*
function fetchChargesSlaveListById(value) {

	var selfId=0;
	if(value=="parent"){
		selfId=$("#multiSchemeParent").val();
		$("#mutlischeme").val("parent");
	}
	else if(value=="child"){
		selfId=0;
		$("#mutlischeme").val("child");
	}
	else{
		return true;
	}
	
	
	var inputs = [];
	// inputs.push('action=proFeesfetchReports');
	
	inputs.push('selfId=' + selfId);
	inputs.push('masterId=' + 1);
	inputs.push('name=' + value);
	var str = inputs.join('&');
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/finance/getChragesSlaveList",
		data : str + "&reqType=AJAX",
		success : function(response) {
			
		var parentList = "<option value='0'>Select Scheme</option>";
		var childList = "<option value='0'>Select Scheme</option>";
		
		for ( var i = 0; i < response.lstChargesSlave.length; i++) {
			var isCategory = response.lstChargesSlave[i].isCategory;
			
			if (isCategory == "Y") {
				
				parentList = parentList 
				+ '<option value="'
						+ (response.lstChargesSlave[i].slaveId) + '">'
						+ (response.lstChargesSlave[i].categoryName +'(C)') 
						+ '</option>';
				
			} else {
				childList = childList + '<option value="'
						+ (response.lstChargesSlave[i].slaveId) + '">'
						+ (response.lstChargesSlave[i].categoryName +"(S)") + '</option>';
			}

		}
		
		//$("#multiScheme").html(parentList);
		//$("#multiScheme").select2();
		
		$("#multiSchemeParent").html(parentList);
		$("#multiSchemeParent").select2();
		
		$("#multiSchemeChild").html(childList);
		$("#multiSchemeChild").select2();
		
		}
	});
}

*//*******
 * @author    :Vishant
 * @Date      :15-FEB-24
 * @Code      :Multi select sub list of sponsor 
 * ******//*
function multiSelectSlaveForChargesList(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var isCategory = response.lstChargesSlave[i].isCategory;
		
		if (isCategory == "Y") {
			
			list = list 
			+ '<option value="'
					+ (response.lstChargesSlave[i].slaveId) + '">'
					+ (response.lstChargesSlave[i].categoryName +'(C)') 
					+ '</option>';
			
		} else {
			list = list + '<option value="'
					+ (response.lstChargesSlave[i].slaveId) + '">'
					+ (response.lstChargesSlave[i].categoryName +"(S)") + '</option>';
		}

	}
	
	$("#multiSchemeChild").html("");
	$("#multiSchemeChild").html(list);
	$("#multiSchemeChild").select2();
	//$("#listmstr_select_service").html(list);
	
}*/

/*******
 * @author    :Vishant
 * @Date      :`12-FEB-2023
 * @Code      :Geting sponsor list(charges master list) 
 * ******/
function fetchChargesSlaveList(value) {
	
	var selfId=0;
	var masterId=0;
	if(value=="parent"){
		selfId=$("#multiSchemeParent").val();
		$("#mutlischeme").val("parent");
	}
	else if(value=="child"){
		masterId=$("#multiSchemeParent").val();
		selfId=0;
		$("#mutlischemeChild").val("child");
	}
	else{
		return true;
	}
	
	
	var inputs = [];
	// inputs.push('action=proFeesfetchReports');
	
	inputs.push('selfId=' + selfId);
	inputs.push('masterId=' + masterId);
	inputs.push('name=' + value);
	var str = inputs.join('&');
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/finance/getChragesSlaveList",
		data : str + "&reqType=AJAX",
		success : function(response) {
			
		var parentList = "<option value='0'>Select Scheme</option>";
		var childList = "<option value='0'>Select Scheme</option>";
		
		var childIds = [];
		var parentIds = [];
		
		for ( var i = 0; i < response.lstChargesSlave.length; i++) {
			var isCategory = response.lstChargesSlave[i].isCategory;
			
			if (isCategory == "Y") {
				
				parentList = parentList 
				+ '<option value="'
						+ (response.lstChargesSlave[i].slaveId) + '">'
						+ (response.lstChargesSlave[i].categoryName +'(C)') 
						+ '</option>';
				
				parentIds.push(response.lstChargesSlave[i].slaveId);
				
			} else {
				childList = childList + '<option value="'
						+ (response.lstChargesSlave[i].slaveId) + '">'
						+ (response.lstChargesSlave[i].categoryName +"(S)") + '</option>';
				
				childIds.push(response.lstChargesSlave[i].slaveId);
			}

		}
	if(childIds !=null){
		$("#multiSchemeChildIds").val(childIds.toString());
	}
	if(parentIds !=null){
		$("#multiSchemeParentIds").val(parentIds.toString());
	}
		
		
		//$("#multiScheme").html(parentList);
		//$("#multiScheme").select2();
	if(value=="parent")	{
		$("#multiSchemeParent").html(parentList);
		$("#multiSchemeParent").select2();
	}else if(value == "child"){
		$("#multiSchemeChild").html(childList);
		$("#multiSchemeChild").select2();
	}
		
		
		
		
		}
	});
}