//Irfan Khan @date: 13-July-2017 @reason : To fetch all department and services
function fetchDeptAndServices() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/profees/fetchDeptAndServices",
		success : function(r) {			
			var tHead = "";
			for(var i=0;i<r.lstDepts.length;i++){
				tHead = tHead + "<th>"+r.lstDepts[i].deptName+"<input type='hidden' id='th"+(i)+"' value='"
						+r.lstDepts[i].deptId+"'></th><td><input type='text' id='thDeptPer"
						+r.lstDepts[i].deptId+"' value='0' style='width: 70%;'></td>";
			}
			$("#tHeadDeptTable").html(tHead);
			
			var tBody = "";
			for(var j=0;j<r.listService.length;j++){
				tBody = tBody + "<tr id='tr"+j+"'>";
				for(var i=0;i<r.lstDepts.length;i++){
					tBody = tBody + "<td>"+r.listService[j].serviceName
							+"<input type='hidden' id='td"+(j)+r.lstDepts[i].deptId+"' value='"
							+r.listService[j].serviceId+"'></td><td><input type='text' id='tdServicePer"
							+r.lstDepts[i].deptId+r.listService[j].serviceId+"' value='0' style='width: 70%;'></td>";
				}
				tBody = tBody + "</tr>";
			}
			
			$("#tBodyServiceTable").html(tBody);
		}
	});
}

function savePercentMaster(){
	var unitId = $("#unitId").val();
	var doctorId = $("#txtDoctorId").val();
	var doctorName = $("#doctorName").val();
	var unitName = $("#unitId option:selected").text();
	var callFrom = $("#callFrom").val();
	var caseType = $("input[name=refByRadio]:checked").val();
	var drDeptId = $("#drDeptId").val();
	
	var parupy = $("input[name=refParentage]:checked").val();
	//For Charges Id
	var chargesId = $("#lisH0").val();// chargesId
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItemsinfo li").length;
	chargesSlaveId = $("#lisH" + (liSize - 1)).val();
	
	if(unitId == null || unitId == undefined || unitId == ""){
		unitId = 0;
	}
	
	if(doctorId == null || doctorId == undefined || doctorId == ""){
		doctorId=0;
	}
	
	if(chargesId == null || chargesId == undefined || chargesId == ""){
		chargesId=0;
	}
	
	if(chargesSlaveId == null || chargesSlaveId == undefined || chargesSlaveId == ""){
		chargesSlaveId=0;
	}
	
	if(drDeptId == null || drDeptId == undefined || drDeptId == ""){
		drDeptId = 0;
	}
	var tHeadLength=$('#tHeadDeptTable th').length;
	
	if(tHeadLength == 0 ){
		alert("Department is not present !!!");
		return false;
	}
	var percentMasterList = {
			listPerMaster : []
		};
	
	for(var i=0;i<tHeadLength;i++){
		
		var thDeptId= $("#th"+i).val();
		var thDeptPer = parseFloat($("#thDeptPer"+thDeptId).val());
		var tBodyLength=$('#tBodyServiceTable tr').length;
		if(parupy == "parentage")
			{
		if(thDeptPer > 100){
			alert("Percent can't be greater than 100.!!!");
			//setFocus("thDeptPer"+thDeptId);
			return false;
			}
		}
		percentMasterList.listPerMaster.push({
			serviceId : 0,
			deptId : thDeptId,
			unitId : unitId,
			//unitName : unitName,
			//doctorId : doctorId,
			hospPercent : thDeptPer,
			//doctorName : doctorName,
			caseType : caseType
			
		});
		
		for(var j=0 ; j < tBodyLength ; j++){
			var tdServiceId= $("#td"+j+thDeptId).val();
			var tdServicePer=parseFloat($("#tdServicePer"+thDeptId+tdServiceId).val());
			if (parupy == "parentage") {
				if(tdServicePer > 100){
					alert("Percent can't be greater than 100.!!!");
					setFocus("tdServicePer"+thDeptId+tdServiceId);
					return false;
				}
			}

			if(thDeptPer > 0){
				tdServicePer = thDeptPer;
			}
			
			percentMasterList.listPerMaster.push({
				serviceId : tdServiceId,
				deptId : thDeptId,
				unitId : unitId,
				unitName : unitName,
				doctorId : doctorId,
				hospPercent : tdServicePer,
				doctorName : doctorName,
				caseType : caseType
				
			});
		}
	}
	
	percentMasterList = JSON.stringify(percentMasterList);

	var inputs = [];
	inputs.push("percentMasterList=" + encodeURIComponent(percentMasterList));
	inputs.push("doctorId=" + doctorId);
	inputs.push("unitId=" + unitId);
	inputs.push("callFrom=" + callFrom);
	inputs.push("caseType=" + caseType);
	inputs.push("drDeptId=" + drDeptId);
	inputs.push("chargesId=" + chargesId);
	inputs.push("chargesSlaveId=" + chargesSlaveId);
	inputs.push("percentrupay=" + parupy);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/savePercentMaster",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			resetProfeesPercentMaster();
			fetchPercentRecords();
			$("#callFrom").val("insert");
		}
	});
}

function fetchPercentRecords(callFrom){
	var unitId = 0;
	var doctorId = 0;
	var caseType = 0;
	if(callFrom == "search"){
		doctorId = $("#doctorId").val();
	}else if(callFrom == "percentMaster"){
		doctorId = $("#txtDoctorId").val();
		unitId = $("#unitId").val();
		caseType = $("input[name=refByRadio]:checked").val();
	}
	var inputs = [];
	inputs.push("doctorId=" + doctorId);
	inputs.push("unitId=" + unitId);
	inputs.push("callFrom=" + callFrom);
	inputs.push("caseType=" + caseType);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/fetchPercentRecords",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			var tableString="";
			if(r.listPerMaster.length > 0 && callFrom == "percentMaster"){
				$("#listSize").val(1);
			}else{
				$("#listSize").val(0);
			}
			for(var i=0;i<r.listPerMaster.length;i++){
				tableString = tableString +"<tr>"
							+"<td class='col-md-1'>"+(i+1)+"</td>"
							+"<td class='col-md-3'>"+r.listPerMaster[i].doctorName
							+"</td>"
							+"<td class='col-md-1'>"+r.listPerMaster[i].doctorId
							+"</td>"
							+"<td class='col-md-3'>"+r.listPerMaster[i].unitName
							+"</td>"
							+"<td class='col-md-1'>"+r.listPerMaster[i].unitId
							+"</td>"
							+"<td class='col-md-1'>"+r.listPerMaster[i].caseType
							+"</td>"
							+"<td class='col-md-1'><button type='button' class='btn btn-xs btn-success' onclick=editPercentMaster('"+r.listPerMaster[i].doctorId+"','"+r.listPerMaster[i].unitId+"','"+r.listPerMaster[i].caseType+"','"+r.listPerMaster[i].drDeptId+"')><i class='fa fa-edit'></i></button></td>"
							+"<td class='col-md-1'><button type='button' class='btn btn-xs btn-success' onclick=deletePercentRecord('"+r.listPerMaster[i].doctorId+"','"+r.listPerMaster[i].unitId+"','"+r.listPerMaster[i].caseType+"')><i class='fa fa-trash-o'></i></button></td></tr>";
							
			}
			
			$("#listOfRecordsPerBody").html(tableString);
		}
	});
}

function resetProfeesPercentMaster(){
	$("#callFrom").val("insert");
	//$("#unitId").val(0);
	$("#drDeptId").val(0);
	$("#doctorName").val("");
	$("#txtDoctorId").val(0);
	$("#unitId").removeAttr("disabled");
	$("#drDeptId").removeAttr("disabled");
	$("#doctorName").removeAttr("disabled");
	$("#chkHospital").prop("checked", true);
	$("#chkHospital").removeAttr("disabled");
	$("#chkPrivate").removeAttr("disabled");
	$("#listSize").val(0);
	$("input[name=refParentage][value='parentage']").attr('checked', 'checked');
	//fetchDeptAndServices("onload");
	fetchAllService();
	getAllUnitForProfees();
	chargesSlaveHideShow();
	$("#dynamicItemsinfo").empty();
	getAllChargesl();
}

function editPercentMaster(doctorId,unitId,caseType,drDeptId){
	//alert("doctorId=="+doctorId+"  unitId=="+unitId);
	doctorName(doctorId);
	var inputs = [];
	inputs.push("doctorId=" + doctorId);
	inputs.push("unitId=" + unitId);
	inputs.push("caseType=" + caseType);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/editPercentMaster",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//var doctorId;
			var doctorName;
			var chargesId=0;
			var chargesSlaveId=0;
			var rupay = "";

			//var unitId;
			//var caseType;
	
			//alert(r.listPerMaster.length);
			for(var i=0;i<r.listPerMaster.length;i++){
				chargesId = r.listPerMaster[i].chargesId;
				chargesSlaveId = r.listPerMaster[i].chargesSlaveId;
			
				//if (r.listPerMaster[i].serviceId == 0) {
                 if (r.listPerMaster[i].serviceId != 0) {
					$("#thDeptPer_" + r.listPerMaster[i].deptId).val(r.listPerMaster[i].hospPercent);
					//tdServicePer_2_11
					$("#tdServicePer_" + r.listPerMaster[i].deptId+"_"+r.listPerMaster[i].serviceId).val(r.listPerMaster[i].hospPercent);			
					doctorId = r.listPerMaster[i].doctorId;
					doctorName = r.listPerMaster[i].doctorName;
					unitId = r.listPerMaster[i].unitId;
					caseType = r.listPerMaster[i].caseType;
					rupay = r.listPerMaster[i].percentrupay;
				} else {
					//$("#tdServicePer_" + r.listPerMaster[i].deptId + "_" + r.listPerMaster[i].serviceId).val(r.listPerMaster[i].hospPercent);
					$("#thDeptPer_" + r.listPerMaster[i].deptId).val(r.listPerMaster[i].hospPercent);
					rupay = r.listPerMaster[i].percentrupay;		
					//$("#r").val(r.listPerMaster[i].hospPercent);
				}
			}
			$("#unitId").val(unitId);
			//$("#doctorName").val(doctorName);
			$("#txtDoctorId").val(doctorId);
			$("#unitId").prop("disabled","true");
			$("#doctorName").prop("disabled","true");
			$("#callFrom").val("update");
			$("#drDeptId").val(drDeptId);
			$("#drDeptId").prop("disabled", "true");
			fetchSuperCatogoiresSlave(chargesSlaveId);
			$("#sponsor_select").select2("val", chargesSlaveId);
			$("#lisH0").val(chargesId);// chargesId
			$("#lisH" + (liSize - 1)).val(chargesSlaveId);
			if (rupay == "rupay") {
				$("input[name=refParentage][value=" + rupay + "]").attr('checked', 'checked');
			}
			else {
				$("input[name=refParentage][value=" + rupay + "]").attr('checked', 'checked');
			}
			if (caseType == 1) {
				$("#chkHospital").prop("checked", true);
				$("#chkPrivate").prop("disabled",true);
				$("#chkHospital").removeAttr("disabled");
				//$("#chkPrivate").prop("checked", false);
			}else{
				$("#chkPrivate").prop("checked",true);
				$("#chkHospital").prop("disabled",true);
				$("#chkPrivate").removeAttr("disabled");
			}
			chargesSlaveHideShow();
			//alert(chargesSlaveId +"==="+chargesId);
		}
	});
	
	//added by sandip for apply fees to all subservices
	var value = $("#thDeptPer_1").val();
	var value1 = $("#thDeptPer_2").val();
	var value2 = $("#thDeptPer_3").val();

	$(".dept").each(function() {
		
		//set values for service
		$(".dept1ServPer").map(function() {

			return $(this).val(value);
		}).get();

		//set values for sub-service
		$(".dept1SubPer").map(function() {
			return $(this).val(value);
		}).get();
		
		// 2
		//set values for service
		$(".dept2ServPer").map(function() {

			return $(this).val(value1);
		}).get();

		//set values for sub-service
		$(".dept2SubPer").map(function() {
			return $(this).val(value1);
		}).get();
		
		// 3
		//set values for service
		$(".dept3ServPer").map(function() {

			return $(this).val(value2);
		}).get();

		//set values for sub-service
		$(".dept3SubPer").map(function() {
			return $(this).val(value2);
		}).get();
	});
}
function doctorName(doctorId) {
	var inputs = [];
	inputs.push("doctorId=" + doctorId);


	var str = inputs.join('&');

	jQuery.ajax({
		async: false,
		type: "POST",
		data: str + "&reqType=AJAX",
		url: "ehat/profees/doctorname",
		error: function() {
			alert('Network Issue!!!');
		},
		success: function(r) {
			$("#doctorName").val(r.doc_name);
		}

	});
}



	
function deletePercentRecord(doctorId, unitId, caseType) {
	var r = confirm("Are You Sure You Want To Delete?");
	if (r == true) {
		var inputs = [];
		inputs.push("doctorId=" + doctorId);
		inputs.push("unitId=" + unitId);
		inputs.push("caseType=" + caseType);

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/profees/deletePercentRecord",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				alert(r);
				resetProfeesPercentMaster();
			}
		});
	}
}

function callForEdit(){
	var doctorId = $("#txtDoctorId").val();
	var unitId = $("#unitId").val();
	var caseType = $("input[name=refByRadio]:checked").val();
	var drDeptId = $("#drDeptId").val();
	
	fetchPercentRecords("percentMaster");
	var listSize = $("#listSize").val();
	if(listSize > 0){
		editPercentMaster(doctorId,unitId,caseType,drDeptId);
	}
	
}

//Irfan Khan @date: 21-July-2017 @reason : To get all units
function getAllUnitForProfees() {

    jQuery
            .ajax({
                async : true,
                type : "POST",
                url : "ehat/unit/fetchUnitList",

                success : function(r) {
                	setTempAllForProfees(r,"unit");//call template
                }
            });
}

//Irfan Khan @date: 21-July-2017 @reason : Set all fetched units
function setTempAllForProfees(r,callFrom) {   
	if(callFrom == "unit"){
		var list = "<option value='0'>Default</option>";    
	    for ( var i = 0; i < r.lstUnit.length; i++) {    

			list = list + "<option value='"+r.lstUnit[i].unitId+"'>" + (r.lstUnit[i].unitName) + "</option>";    
			}   
		$("#unitId").html(list);
		
		var uId =$("#uId").val();		
		$('#unitId').val(uId);
	}
}

function proFeesDoctorPayment() {


	var doctorName = $("#byName").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var doctorId = $("#txtDoctorId").val();
	var unitId = $("#unitId").val();
	var deptId = $("#deptId").val();
	var billTypeId = $("#billTypeId").val();
	var serviceId = $("#serviceId").val();
	if (serviceId == null || serviceId == "" || serviceId == undefined) {
		serviceId = "0";
	}
	var specialisationId = $("#drDeptId").val();
	
	if(specialisationId !="0" || specialisationId !=0)
	{
		if (specialisationId == "0" || specialisationId == 0) {
		alert("Please Select specialisation.");
		return false;
	}}
	
	if (specialisationId == 0 || specialisationId == null || specialisationId == "" || specialisationId == undefined) {
		specialisationId = 0;
	}
	
	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];
	// inputs.push('action=proFeesfetchReports');
	// inputs.push('callFrom=' + callFrom);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorId=' + doctorId);
	inputs.push('unitId=' + unitId);
	inputs.push('deptId=' + deptId);
	inputs.push('serviceId=' + serviceId);
	inputs.push('specialisationId=' + specialisationId);
	inputs.push('billTypeId=' + billTypeId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/proFeesDoctorPayment",
				//url : "ehat/profees/proFeesDoctorPayment",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {

					if (deptId == 2) {// for ipd

						var totalRate = 0;
						var totalAmount = 0;
						var totalPfAmount = 0;
						var totalReduction = 0;
						var totalAddition = 0;
						var totalPfPaid = 0;
						var totalPfUnpaid = 0;
						var totalHospAmount = 0;
						var totalRefDocAmount = 0;
						var totalBillAmount = 0;
						var totalPaid = 0;
						var totalPayablePf = 0;
						var totalConcessionAmt = 0;
						var totalConcessionPer = 0;
						var totalDiscountAmt = 0;
						var totalDiscountPer = 0;
						var totalRefundAmount = 0;
						var htm = "";
						var htmHead = "";

						htmHead = htmHead
								+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
								+ "</th><th class='col-md-1'>Treat.Id"
								/*+ "</th><th class='col-md-1'>Rec.No."*/
								+ "</th><th class='col-md-1'>Patient-Id"
								+ "</th><th class='col-md-1'>Patient-Name"
								+ "</th><th class='col-md-1'>Doctor-Name"
								+ "</th><th class='col-md-1'>Dept-Name"
								+ "</th><th class='col-md-1'>Patient-Category"
								+ "</th><th class='col-md-1'>Assign-Date"
								+ "</th><th class='col-md-1'>Total Bill"
								+ "</th><th class='col-md-1'>Comp-Name"
								+ "</th><th class='col-md-1'>Rate"
								+ "</th><th class='col-md-1'>Quantity"
								+ "</th><th class='col-md-1'>Amount"
								// + "</th><th
								// class='col-md-1'>HospAmountToShow"
								// + "</th><th class='col-md-1'>PfAmountToShow"
								+ "</th><th class='col-md-1'>Concession%"
								+ "</th><th class='col-md-1'>ConcessionInAmount"
								+ "</th><th class='col-md-1'>Discount %"// dicount%+concession%
								+ "</th><th class='col-md-1'>DiscountInAmount"// dicountAmt+concessionAmt
								+ "</th><th class='col-md-1'>Refunded-Amount"
								+ "</th><th class='col-md-1'>Payable"

								+ "</th><th class='col-md-1'>Hosp-Amount"
								+ "</th><th class='col-md-1'>RefDocId"
								+ "</th><th class='col-md-1'>RefDocPer"
								+ "</th><th class='col-md-1'>RefDocAmt"
								+ "</th><th class='col-md-1'>PfAmount"
								+ "</th><th class='col-md-1'>PfPaid"
								+ "</th><th class='col-md-1'>PfUnpaid"
								+ "</th><th class='col-md-1'>Final Payment"
								+ "</th><th class='col-md-1'>Reduction"
								+ "</th><th class='col-md-1'>Addition"
								+ "</th></tr>";
						if (r.listProFees.length == 0
								|| r.listProFees.length == null) {
							// no records.
							htm = htm
									+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='18'>Record Not Found...!!!</th></tr>";
						} else {

							for ( var i = 0; i < r.listProFees.length; i++) {
								
								var serviceAssignDate = new Date(r.listProFees[i].serviceAssignDate).toLocaleDateString('en-GB');
								
								htm = htm
										+ "<tr style='height:21px;'>"
										+ "<td class='col-md-1'>"
										+ (i + 1)
										+ "</td><td class='col-md-1' id='tdBillId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billId
										+ "</td>"
										+"<td class='col-md-1' style='display:none;' id='tdBillReceiptMasterId" 
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billReceiptMasterId
										+ "</td>"
										
										+"<td style='display:none;' id='tdBillDetailsId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billDetailsId
										+ "</td>"
										
										+"<td class='col-md-1'>"
										+ r.listProFees[i].patientId
										+ "</td><td class='col-md-1'>"
										+ r.listProFees[i].patientName
										+ "</td><td class='col-md-1' id='tdDocName"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].doctorName
										+ "</td><td class='col-md-1'>"
										+ r.listProFees[i].deptName
										+ "</td><td class='col-md-1' id='tdPatientCat"
										+ (i + 1)
                                        + "'>"
										+ r.listProFees[i].deptName
										+ "</td><td class='col-md-1'>"
										+ serviceAssignDate
										+ "</td><td class='col-md-1' align='right'>"
										+ r.listProFees[i].totalBillAmount
												.toFixed(2)
										+ "</td><td class='col-md-1'>"
										+ r.listProFees[i].componentName
										+ "</td><td class='col-md-1' align='right'>"
										+ r.listProFees[i].rate.toFixed(2)
										+ "</td><td class='col-md-1' align='right'>"
										+ r.listProFees[i].quantity.toFixed(2)
										+ "</td><td class='col-md-1' align='right'>"
										+ r.listProFees[i].amount.toFixed(2)

										+ "</td><td class='col-md-1' align='right' >"
										+ r.listProFees[i].concessionPer
												.toFixed(2)
										+ "</td><td class='col-md-1' align='right' >"
										+ r.listProFees[i].concession
												.toFixed(2)

										+ "</td><td class='col-md-1' align='right' >"
										+ r.listProFees[i].discountPer
												.toFixed(2)
										+ "</td><td class='col-md-1' align='right' >"
										+ r.listProFees[i].discount.toFixed(2)
										+ "</td><td class='col-md-1' align='right' id='tdRefundAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refundAmount
												.toFixed(2)
										+ "</td><td class='col-md-1' align='right' id='tdPatPaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].paid.toFixed(2)

										+ "</td><td class='col-md-1' align='right' id='tdHospPercentInAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].hospPercentInAmount
												.toFixed(2)

										+ "</td><td class='col-md-1' align='right' id='tdRefDocId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrId
										+ "</td><td class='col-md-1' align='right' id='tdRefDocPer"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrPercent
												.toFixed(2)
										+ "</td><td class='col-md-1' align='right' id='tdRefDocAmt"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrAmount
												.toFixed(2)

										+ "</td><td class='col-md-1' align='right' id='tdPfAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfAmount.toFixed(2)
										+ "</td><td class='col-md-1' align='right' id='tdPfPaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfPaid.toFixed(2)
										+ "</td><td class='col-md-1' align='right' id='tdPfUnpaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfUnpaid.toFixed(2)
										+ "</td><td class='col-md-1' align='right'><input type='text' onkeyup='setFinalPfAmount()' style='text-align: right;' id='tdPfPayable"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].pfUnpaid.toFixed(2)
										+ "'>"
										+ "</td><td class='col-md-1' align='right' id='tdPfReduction"
										+ (i + 1)
										+ "'>0.00"
										+ "</td><td class='col-md-1' align='right' id='tdPfAddition"
										+ (i + 1)
										+ "'>0.00"
										+ "</td><td class='hide'><input type='hidden' id='tdDeptId"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].deptId
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdDocId"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].doctorId
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdIscombination"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].iscombination
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdOtherBillDIdIpd"
										+ (i + 1) + "' value='"
										+ r.listProFees[i].otherBillDIdIpd
										+ "'></td>" + "</tr>";

								totalRate = totalRate + r.listProFees[i].rate;
								totalConcessionAmt = totalConcessionAmt
										+ r.listProFees[i].concession;
								totalConcessionPer = totalConcessionPer
										+ r.listProFees[i].concessionPer;
								totalAmount = totalAmount
										+ r.listProFees[i].amount;
								totalPfAmount = totalPfAmount
										+ r.listProFees[i].pfAmount;
								totalPfPaid = totalPfPaid
										+ r.listProFees[i].pfPaid;
								totalPfUnpaid = totalPfUnpaid
										+ r.listProFees[i].pfUnpaid;
								totalHospAmount = totalHospAmount
										+ r.listProFees[i].hospPercentInAmount;
								totalBillAmount = totalBillAmount
										+ r.listProFees[i].totalBillAmount;
								totalPaid = totalPaid + r.listProFees[i].paid;
								totalPayablePf = totalPayablePf
										+ r.listProFees[i].pfUnpaid;
								totalDiscountAmt = totalDiscountAmt
										+ r.listProFees[i].discount;
								totalDiscountPer = totalDiscountPer
										+ r.listProFees[i].discountPer;
								totalRefundAmount = totalRefundAmount
										+ r.listProFees[i].refundAmount;
								totalRefDocAmount = totalRefDocAmount
										+ r.listProFees[i].refDrAmount;

							}

						}
						htm = htm
								+ "<tr style = 'background-color:#EEEEEE;'><th colspan='8'></th><th>Total</th>"
								+ "<th class='col-md-1' align='right'>"
								+ totalRate.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ "</th><th class='col-md-1' align='right'>"
								+ totalAmount.toFixed(2)

								+ "</th><th class='col-md-1' align='center'>"
								// + totalConcessionPer.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalConcessionAmt.toFixed(2)

								+ "</th><th class='col-md-1' align='center'>"
								// + totalDiscountPer.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalDiscountAmt.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalRefundAmount.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalPaid.toFixed(2)

								+ "</th><th class='col-md-1' align='right'>"
								+ totalHospAmount.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ "</th><th class='col-md-1' align='right'>"
								+ "</th><th class='col-md-1' align='right'>"
								+ totalRefDocAmount.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalPfAmount.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalPfPaid.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalPfUnpaid.toFixed(2)
								+ "</th><th class='col-md-1' align='right' id='tblPfPayable'>"
								+ totalPayablePf.toFixed(2)
								+ "</th><th class='col-md-1' align='right' id='tblPfTotalReduction'>"
								+ totalReduction.toFixed(2)
								+ "</th><th class='col-md-1' align='right' id='tblPfTotalAddition'>"
								+ totalAddition.toFixed(2) + "</th></tr>";

						// set values in respected fields
						$("#txtTotalAmount").val(totalAmount.toFixed(2));
						$("#txtTotalConcession").val(
								(totalDiscountAmt + totalConcessionAmt)
										.toFixed(2));
						$("#txtTotalPaid").val(totalPaid.toFixed(2));

						$("#txtTotalHospAmount")
								.val(totalHospAmount.toFixed(2));
						$("#txtTotalPfAmount").val(totalPfAmount.toFixed(2));
						$("#txtTotalPayable").val(totalPayablePf.toFixed(2));

						$("#tableTestVoucherListHead").html(htmHead);
						$("#tableTestVoucherList").html(htm);

					} else {// opd,diago

						var totalRate = 0;
						var totalAmount = 0;
						var totalPfAmount = 0;
						var totalReduction = 0;
						var totalAddition = 0;
						var totalPfPaid = 0;
						var totalPfUnpaid = 0;
						var totalHospAmount = 0;
						var totalRefDocAmount = 0;
						var totalBillAmount = 0;
						var totalPaid = 0;
						var totalPayablePf = 0;
						var totalFinalPayable = 0;
						var totalConcessionAmt = 0;
						var totalConcessionPer = 0;
						var totalDiscountAmt = 0;
						var totalDiscountPer = 0;
						var totalRefundedAmount = 0;

						var htm = "";
						var htmHead = "";

						htmHead = htmHead
								+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
								+ "</th><th >Treat.Id"
								/*+ "</th><th class='col-md-1'>Bill-Details-Id"*/
								+ "</th><th style='display:none;'>Rec.No."
								/*+ "</th><th class='col-md-1'>Rec.SlaveId"*/
								+ "</th><th >Patient-Id"
								+ "</th><th>Patient-Name"
								+ "</th><th >Doctor-Name"
								+ "</th><th>Dept-Name"
								+ "</th><th>Patient-Category"
								+ "</th><th >Assign-Date"
								+ "</th><th >Total Bill"
								+ "</th><th>Comp-Name"
								+ "</th><th>Rate"
								+ "</th><th>Quantity"
								+ "</th><th >Amount"
								+ "</th><th >Concession%"
								+ "</th><th >ConcessionInAmount"
								+ "</th><th >Discount% "
								+ "</th><th >DiscountInAmount"
								+ "</th><th >Final-Payable"
								+ "</th><th>Paid"
								+ "</th><th >Refunded-Amount"
								+ "</th><th >Hosp-Amount"
								+ "</th><th>RefDocId"
								+ "</th><th >RefDocPer"
								+ "</th><th >RefDocAmount"
								+ "</th><th >PfAmount"
								+ "</th><th >PfPaid"
								+ "</th><th >PfUnpaid"
								+ "</th><th >Final Payment"
								+ "</th><th >Reduction"
								+ "</th><th >Addition"
								+ "</th></tr>";
						if (r.listProFees.length == 0
								|| r.listProFees.length == null) {
							// no records.
							htm = htm
									+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='18'>Record Not Found...!!!</th></tr>";
						} else {

							for ( var i = 0; i < r.listProFees.length; i++) {
									
								var serviceAssignDate = new Date(r.listProFees[i].serviceAssignDate).toLocaleDateString('en-GB');
								var discountamountcal = (r.listProFees[i].actualAmt *  r.listProFees[i].actualDiscPer / 100 );
								var actualFinalPayable = r.listProFees[i].actualAmt - (r.listProFees[i].actualAmt *  r.listProFees[i].actualDiscPer / 100); 
								//alert('.......discountamountcal......'+discountamountcal);
								//alert('...........actualFinalPayable......'+actualFinalPayable);
								htm = htm
										+ "<tr style='height:21px;'>"
										+ "<td >"
										+ (i + 1)
										+ "</td><td  id='tdBillId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billId
										+ "</td>" 
										+"<td style='display:none;' id='tdBillDetailsId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billDetailsId
										+ "</td>"
										+"<td style='display:none;' id='tdBillReceiptMasterId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billReceiptMasterId
										+ "</td>" 
										+"<td style='display:none;' id='tdBillReceiptSlaveId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billReceiptSlaveId
										+ "</td>"
										+"<td >"
										+ r.listProFees[i].patientId
										+ "</td><td >"
										+ r.listProFees[i].patientName
										+ "</td><td id='tdDocName"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].doctorName
										+ "</td><td >"
										+ r.listProFees[i].deptName
								        + "</td><td class='col-md-1' id='tdPatientCat"
										+ (i + 1)
                                        + "'>"
										+ r.listProFees[i].deptName
										+ "</td><td >"
										+ serviceAssignDate
										+ "</td><td  align='right'>"
										+ r.listProFees[i].totalBillAmount
												.toFixed(2)
										+ "</td><td >"
										+ r.listProFees[i].componentName
										+ "</td><td  align='right'>"
										+ r.listProFees[i].rate.toFixed(2)
										+ "</td><td  align='right'>"
										+ r.listProFees[i].quantity.toFixed(2)
										+ "</td><td  align='right'>"
										// + r.listProFees[i].amount.toFixed(2)
										+ r.listProFees[i].actualAmt.toFixed(2)

										+ "</td><td  align='right'>"
										+ r.listProFees[i].actualConcnPer
												.toFixed(2)
										+ "</td><td  align='right'>"
										// +
										// r.listProFees[i].concession.toFixed(2)
										+ r.listProFees[i].actualConcnAmt
												.toFixed(2)

										+ "</td><td  align='right' >"
										+ r.listProFees[i].actualDiscPer
												.toFixed(2)
										+ "</td><td align='right' >"
										//+ r.listProFees[i].actualDiscAmt.toFixed(2)
										+ discountamountcal.toFixed(2)
										+ "</td><td  align='right' id='tdPatPayable"
										+ (i + 1)
										+ "'>"
										//+ r.listProFees[i].actualFinalPayable.toFixed(2)
										+ actualFinalPayable.toFixed(2)
										+ "</td><td  align='right' id='tdPatPaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].actualFinalPaid
												.toFixed(2)
										+ "</td><td  align='right' id='tdRefundAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refundAmount
												.toFixed(2)
										+ "</td><td  align='right' id='tdHospPercentInAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].hospPercentInAmount
												.toFixed(2)

										+ "</td><td  align='right' id='tdRefDocId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrId
										+ "</td><td  align='right' id='tdRefDocPer"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrPercent
												.toFixed(2)
										+ "</td><td  align='right' id='tdRefDocAmt"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrAmount
												.toFixed(2)
										+ "</td><td  align='right' id='tdPfAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfAmount.toFixed(2)
										+ "</td><td  align='right' id='tdPfPaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfPaid.toFixed(2)
										+ "</td><td  align='right' id='tdPfUnpaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfUnpaid.toFixed(2)
										+ "</td><td  align='right'><input type='text' onkeyup='setFinalPfAmount()' style='text-align: right;' id='tdPfPayable"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].pfUnpaid.toFixed(2)
										+ "'>"
										+ "</td><td  align='right' id='tdPfReduction"
										+ (i + 1)
										+ "'>0.00"
										+ "</td><td  align='right' id='tdPfAddition"
										+ (i + 1)
										+ "'>0.00"
										+ "</td><td class='hide'><input type='hidden' id='tdDeptId"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].deptId
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdDocId"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].doctorId
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdIscombination"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].iscombination
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdOtherBillDIdOpd"
										+ (i + 1) + "' value='"
										+ r.listProFees[i].otherBillDIdOpd
										+ "'></td>" + "</tr>";

								totalRate = totalRate + r.listProFees[i].rate;
								totalConcessionAmt = totalConcessionAmt
										+ r.listProFees[i].actualConcnAmt;
								totalConcessionPer = totalConcessionPer
										+ r.listProFees[i].actualConcnPer;
								totalAmount = totalAmount
										+ r.listProFees[i].actualAmt;
								totalPfAmount = totalPfAmount
										+ r.listProFees[i].pfAmount;
								totalPfPaid = totalPfPaid
										+ r.listProFees[i].pfPaid;
								totalPfUnpaid = totalPfUnpaid
										+ r.listProFees[i].pfUnpaid;
								totalHospAmount = totalHospAmount
										+ r.listProFees[i].hospPercentInAmount;
								totalBillAmount = totalBillAmount
										+ r.listProFees[i].totalBillAmount;
								totalPaid = totalPaid
										+ r.listProFees[i].actualFinalPaid;
								totalPayablePf = totalPayablePf
										+ r.listProFees[i].pfUnpaid;
								totalDiscountAmt = totalDiscountAmt
									+ discountamountcal;	//+ r.listProFees[i].actualDiscAmt;
								totalDiscountPer = totalDiscountPer
										+ r.listProFees[i].actualDiscPer;
								totalFinalPayable = totalFinalPayable
								        + actualFinalPayable//+ r.listProFees[i].actualFinalPayable;
								totalRefDocAmount = totalRefDocAmount
										+ r.listProFees[i].refDrAmount;
								totalRefundedAmount = totalRefundedAmount
										+ r.listProFees[i].refundAmount;

							}

						}
						htm = htm
								// + "<tr><td style='height:
								// 11.5px;'></td></tr>"
								+ "<tr style = 'background-color:#EEEEEE;'><th colspan='8'></th><th>Total</th>"
								+ "<th  align='right'>"
								+ totalRate.toFixed(2)
								+ "</th><th  align='right'>"
								+ "</th><th   align='right'>"
								+ totalAmount.toFixed(2)

								+ "</th><th align='center'>-"
								// + totalConcessionPer.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalConcessionAmt.toFixed(2)

								+ "</th><th   align='center'>-"
								// + totalDiscountPer.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalDiscountAmt.toFixed(2)
								+ "</th><th  align='right'>"
								+ totalFinalPayable.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalPaid.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalRefundedAmount.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalHospAmount.toFixed(2)
								+ "</th><th   align='right'>"
								+ "</th><th   align='right'>"
								+ "</th><th    align='right'>"
								+ totalRefDocAmount.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalPfAmount.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalPfPaid.toFixed(2)
								+ "</th><th  align='right'>"
								+ totalPfUnpaid.toFixed(2)
								+ "</th><th    align='right' id='tblPfPayable'>"
								+ totalPayablePf.toFixed(2)
								+ "</th><th    align='right' id='tblPfTotalReduction'>"
								+ totalReduction.toFixed(2)
								+ "</th><th   align='right' id='tblPfTotalAddition'>"
								+ totalAddition.toFixed(2) + "</th></tr>";

						// set values in respected fields
						$("#txtTotalAmount").val(totalAmount.toFixed(2));
						$("#txtTotalConcession").val(
								(totalDiscountAmt + totalConcessionAmt)
										.toFixed(2));
						$("#txtTotalPaid").val(totalPaid.toFixed(2));

						$("#txtTotalHospAmount")
								.val(totalHospAmount.toFixed(2));
						$("#txtTotalPfAmount").val(totalPfAmount.toFixed(2));
						$("#txtTotalPayable").val(totalPayablePf.toFixed(2));

						$("#tableTestVoucherListHead").html(htmHead);
						$("#tableTestVoucherList").html(htm);
					}
					setOnExcel(r,deptId);  // added by sandip
				}
			});
        

}

//added by sandip
function setOnExcel(r,deptId){


	if (deptId == 2) {// for ipd

		var totalRate = 0;
		var totalAmount = 0;
		var totalPfAmount = 0;
		var totalAddition = 0;
		var totalPfPaid = 0;
		var totalPfUnpaid = 0;
		var totalHospAmount = 0;
		var totalReduction = 0;
		var totalRefDocAmount = 0;
		var totalBillAmount = 0;
		var totalPaid = 0;
		var totalPayablePf = 0;
		var totalConcessionAmt = 0;
		var totalConcessionPer = 0;
		var totalDiscountAmt = 0;
		var totalDiscountPer = 0;
		var totalRefundAmount = 0;
		var htm = "";
		var htmHead = "";

		htmHead = htmHead
				+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
				+ "</th><th class='col-md-1'>Treat.Id"
				/*+ "</th><th class='col-md-1'>Rec.No."*/
				+ "</th><th class='col-md-1'>Patient-Id"
				+ "</th><th class='col-md-1'>Patient-Name"
				+ "</th><th class='col-md-1'>Doctor-Name"
				+ "</th><th class='col-md-1'>Dept-Name"
				+ "</th><th class='col-md-1'>Assign-Date"
				+ "</th><th class='col-md-1'>Total Bill"
				+ "</th><th class='col-md-1'>Comp-Name"
				+ "</th><th class='col-md-1'>Rate"
				+ "</th><th class='col-md-1'>Quantity"
				+ "</th><th class='col-md-1'>Amount"
				// + "</th><th
				// class='col-md-1'>HospAmountToShow"
				// + "</th><th class='col-md-1'>PfAmountToShow"
				+ "</th><th class='col-md-1'>Concession%"
				+ "</th><th class='col-md-1'>ConcessionInAmount"
				+ "</th><th class='col-md-1'>Discount %"// dicount%+concession%
				+ "</th><th class='col-md-1'>DiscountInAmount"// dicountAmt+concessionAmt
				+ "</th><th class='col-md-1'>Refunded-Amount"
				+ "</th><th class='col-md-1'>Payable"

				+ "</th><th class='col-md-1'>Hosp-Amount"
				+ "</th><th class='col-md-1'>RefDocId"
				+ "</th><th class='col-md-1'>RefDocPer"
				+ "</th><th class='col-md-1'>RefDocAmt"
				+ "</th><th class='col-md-1'>PfAmount"
				+ "</th><th class='col-md-1'>PfPaid"
				+ "</th><th class='col-md-1'>PfUnpaid"
				+ "</th><th class='col-md-1'>Final Payment"
				+ "</th><th class='col-md-1'>Reduction"
				+ "</th><th class='col-md-1'>Addition"
				+ "</th></tr>";
		if (r.listProFees.length == 0
				|| r.listProFees.length == null) {
			// no records.
			htm = htm
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='18'>Record Not Found...!!!</th></tr>";
		} else {

			for ( var i = 0; i < r.listProFees.length; i++) {
				
				var serviceAssignDate = new Date(r.listProFees[i].serviceAssignDate).toLocaleDateString('en-GB');
				
				htm = htm
						+ "<tr style='height:21px;'>"
						+ "<td class='col-md-1'>"
						+ (i + 1)
						+ "</td><td class='col-md-1' id='tdBillId"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].billId
						+ "</td>"				
						+"<td class='col-md-1'>"
						+ r.listProFees[i].patientId
						+ "</td><td class='col-md-1'>"
						+ r.listProFees[i].patientName
						+ "</td><td class='col-md-1' id='tdDocName"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].doctorName
						+ "</td><td class='col-md-1'>"
						+ r.listProFees[i].deptName
						+ "</td><td class='col-md-1'>"
						+ serviceAssignDate
						+ "</td><td class='col-md-1' align='right'>"
						+ r.listProFees[i].totalBillAmount
								.toFixed(2)
						+ "</td><td class='col-md-1'>"
						+ r.listProFees[i].componentName
						+ "</td><td class='col-md-1' align='right'>"
						+ r.listProFees[i].rate.toFixed(2)
						+ "</td><td class='col-md-1' align='right'>"
						+ r.listProFees[i].quantity.toFixed(2)
						+ "</td><td class='col-md-1' align='right'>"
						+ r.listProFees[i].amount.toFixed(2)

						+ "</td><td class='col-md-1' align='right' >"
						+ r.listProFees[i].concessionPer
								.toFixed(2)
						+ "</td><td class='col-md-1' align='right' >"
						+ r.listProFees[i].concession
								.toFixed(2)

						+ "</td><td class='col-md-1' align='right' >"
						+ r.listProFees[i].discountPer
								.toFixed(2)
						+ "</td><td class='col-md-1' align='right' >"
						+ r.listProFees[i].discount.toFixed(2)
						+ "</td><td class='col-md-1' align='right' id='tdRefundAmount"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].refundAmount
								.toFixed(2)
						+ "</td><td class='col-md-1' align='right' id='tdPatPaid"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].paid.toFixed(2)

						+ "</td><td class='col-md-1' align='right' id='tdHospPercentInAmount"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].hospPercentInAmount
								.toFixed(2)

						+ "</td><td class='col-md-1' align='right' id='tdRefDocId"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].refDrId
						+ "</td><td class='col-md-1' align='right' id='tdRefDocPer"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].refDrPercent
								.toFixed(2)
						+ "</td><td class='col-md-1' align='right' id='tdRefDocAmt"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].refDrAmount
								.toFixed(2)

						+ "</td><td class='col-md-1' align='right' id='tdPfAmount"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].pfAmount.toFixed(2)
						+ "</td><td class='col-md-1' align='right' id='tdPfPaid"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].pfPaid.toFixed(2)
						+ "</td><td class='col-md-1' align='right' id='tdPfUnpaid"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].pfUnpaid.toFixed(2)
						+ "</td><td class='col-md-1' align='right'><input type='text' onkeyup='setFinalPfAmount()' style='text-align: right;' id='tdPfPayable"
						+ (i + 1)
						+ "' value='"
						+ r.listProFees[i].pfUnpaid.toFixed(2)
						+ "'>"
						+ "</td><td class='col-md-1' align='right' id='tdPfReduction"
						+ (i + 1)
						+ "'>0.00"
						+ "</td><td class='col-md-1' align='right' id='tdPfAddition"
						+ (i + 1)
						+ "'>0.00"
						+ "</td><td class='hide'><input type='hidden' id='tdDeptId"
						+ (i + 1)
						+ "' value='"
						+ r.listProFees[i].deptId
						+ "'></td>"
						+ "<td class='hide'><input type='hidden' id='tdDocId"
						+ (i + 1)
						+ "' value='"
						+ r.listProFees[i].doctorId
						+ "'></td>"
						+ "<td class='hide'><input type='hidden' id='tdIscombination"
						+ (i + 1)
						+ "' value='"
						+ r.listProFees[i].iscombination
						+ "'></td>"
						+ "<td class='hide'><input type='hidden' id='tdOtherBillDIdIpd"
						+ (i + 1) + "' value='"
						+ r.listProFees[i].otherBillDIdIpd
						+ "'></td>" + "</tr>";

				totalRate = totalRate + r.listProFees[i].rate;
				totalConcessionAmt = totalConcessionAmt
						+ r.listProFees[i].concession;
				totalConcessionPer = totalConcessionPer
						+ r.listProFees[i].concessionPer;
				totalAmount = totalAmount
						+ r.listProFees[i].amount;
				totalPfAmount = totalPfAmount
						+ r.listProFees[i].pfAmount;
				totalPfPaid = totalPfPaid
						+ r.listProFees[i].pfPaid;
				totalPfUnpaid = totalPfUnpaid
						+ r.listProFees[i].pfUnpaid;
				totalHospAmount = totalHospAmount
						+ r.listProFees[i].hospPercentInAmount;
				totalBillAmount = totalBillAmount
						+ r.listProFees[i].totalBillAmount;
				totalPaid = totalPaid + r.listProFees[i].paid;
				totalPayablePf = totalPayablePf
						+ r.listProFees[i].pfUnpaid;
				totalDiscountAmt = totalDiscountAmt
						+ r.listProFees[i].discount;
				totalDiscountPer = totalDiscountPer
						+ r.listProFees[i].discountPer;
				totalRefundAmount = totalRefundAmount
						+ r.listProFees[i].refundAmount;
				totalRefDocAmount = totalRefDocAmount
						+ r.listProFees[i].refDrAmount;

			}

		}
		htm = htm
				+ "<tr style = 'background-color:#EEEEEE;'><td colspan='8'></td><th>Total</th>"
				+ "<td class='col-md-1' align='right'>"
				+ totalRate.toFixed(2)
				+ "</td><td class='col-md-1' align='right'>"
				+ "</td><td class='col-md-1' align='right'>"
				+ totalAmount.toFixed(2)

				+ "</td><td class='col-md-1' align='center'>"
				// + totalConcessionPer.toFixed(2)
				+ "</td><td class='col-md-1' align='right'>"
				+ totalConcessionAmt.toFixed(2)

				+ "</td><td class='col-md-1' align='center'>"
				// + totalDiscountPer.toFixed(2)
				+ "</td><td class='col-md-1' align='right'>"
				+ totalDiscountAmt.toFixed(2)
				+ "</td><td class='col-md-1' align='right'>"
				+ totalRefundAmount.toFixed(2)
				+ "</td><td class='col-md-1' align='right'>"
				+ totalPaid.toFixed(2)

				+ "</td><td class='col-md-1' align='right'>"
				+ totalHospAmount.toFixed(2)
				+ "</td><td class='col-md-1' align='right'>"
				+ "</td><td class='col-md-1' align='right'>"
				+ "</td><td class='col-md-1' align='right'>"
				+ totalRefDocAmount.toFixed(2)
				+ "</td><td class='col-md-1' align='right'>"
				+ totalPfAmount.toFixed(2)
				+ "</td><td class='col-md-1' align='right'>"
				+ totalPfPaid.toFixed(2)
				+ "</td><td class='col-md-1' align='right'>"
				+ totalPfUnpaid.toFixed(2)
				+ "</td><td class='col-md-1' align='right' id='tblPfPayable'>"
				+ totalPayablePf.toFixed(2)
				+ "</td><td class='col-md-1' align='right' id='tblPfTotalReduction'>"
				+ totalReduction.toFixed(2)
				+ "</td><td class='col-md-1' align='right' id='tblPfTotalAddition'>"
				+ totalAddition.toFixed(2) + "</td></tr>";

		// set values in respected fields
		$("#txtTotalAmount").val(totalAmount.toFixed(2));
		$("#txtTotalConcession").val(
				(totalDiscountAmt + totalConcessionAmt)
						.toFixed(2));
		$("#txtTotalPaid").val(totalPaid.toFixed(2));

		$("#txtTotalHospAmount")
				.val(totalHospAmount.toFixed(2));
		$("#txtTotalPfAmount").val(totalPfAmount.toFixed(2));
		$("#txtTotalPayable").val(totalPayablePf.toFixed(2));

		$("#tableTestVoucherListHead1").html(htmHead);
		$("#tableTestVoucherList1").html(htm);

	} else {// opd,diago

		var totalRate = 0;
		var totalAmount = 0;
		var totalPfAmount = 0;
		var totalReduction = 0;
		var totalAddition = 0;
		var totalPfPaid = 0;
		var totalPfUnpaid = 0;
		var totalHospAmount = 0;
		var totalRefDocAmount = 0;
		var totalBillAmount = 0;
		var totalPaid = 0;
		var totalPayablePf = 0;
		var totalFinalPayable = 0;
		var totalConcessionAmt = 0;
		var totalConcessionPer = 0;
		var totalDiscountAmt = 0;
		var totalDiscountPer = 0;
		var totalRefundedAmount = 0;

		var htm = "";
		var htmHead = "";

		htmHead = htmHead
				+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
				+ "</th><th >Treat.Id"
				/*+ "</th><th class='col-md-1'>Bill-Details-Id"*/
				+ "</th><th >Rec.No."
				/*+ "</th><th class='col-md-1'>Rec.SlaveId"*/
				+ "</th><th >Patient-Id"
				+ "</th><th>Patient-Name"
				+ "</th><th >Doctor-Name"
				+ "</th><th>Dept-Name"
				+ "</th><th >Assign-Date"
				+ "</th><th >Total Bill"
				+ "</th><th>Comp-Name"
				+ "</th><th>Rate"
				+ "</th><th>Quantity"
				+ "</th><th >Amount"
				+ "</th><th >Concession%"
				+ "</th><th >ConcessionInAmount"
				+ "</th><th >Discount% "
				+ "</th><th >DiscountInAmount"
				+ "</th><th >Final-Payable"
				+ "</th><th>Paid"
				+ "</th><th >Refunded-Amount"
				+ "</th><th >Hosp-Amount"
				+ "</th><th>RefDocId"
				+ "</th><th >RefDocPer"
				+ "</th><th >RefDocAmount"
				+ "</th><th >PfAmount"
				+ "</th><th >PfPaid"
				+ "</th><th >PfUnpaid"
				+ "</th><th >Final Payment"
				+ "</th><th >Reduction"
				+ "</th><th >Addition"
				+ "</th></tr>";
		if (r.listProFees.length == 0
				|| r.listProFees.length == null) {
			// no records.
			htm = htm
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='18'>Record Not Found...!!!</th></tr>";
		} else {

			for ( var i = 0; i < r.listProFees.length; i++) {
					
				var serviceAssignDate = new Date(r.listProFees[i].serviceAssignDate).toLocaleDateString('en-GB');
				
				htm = htm
						+ "<tr style='height:21px;'>"
						+ "<td >"
						+ (i + 1)
						+ "</td><td  id='tdBillId"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].billId
						+ "</td>" 
						
						+"<td id='tdBillReceiptMasterId"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].billReceiptMasterId
						+ "</td>" 
						
						+"<td >"
						+ r.listProFees[i].patientId
						+ "</td><td >"
						+ r.listProFees[i].patientName
						+ "</td><td id='tdDocName"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].doctorName
						+ "</td><td >"
						+ r.listProFees[i].deptName
						+ "</td><td >"
						+ serviceAssignDate
						+ "</td><td  align='right'>"
						+ r.listProFees[i].totalBillAmount
								.toFixed(2)
						+ "</td><td >"
						+ r.listProFees[i].componentName
						+ "</td><td  align='right'>"
						+ r.listProFees[i].rate.toFixed(2)
						+ "</td><td  align='right'>"
						+ r.listProFees[i].quantity.toFixed(2)
						+ "</td><td  align='right'>"
						// + r.listProFees[i].amount.toFixed(2)
						+ r.listProFees[i].actualAmt.toFixed(2)

						+ "</td><td  align='right'>"
						+ r.listProFees[i].actualConcnPer
								.toFixed(2)
						+ "</td><td  align='right'>"
						// +
						// r.listProFees[i].concession.toFixed(2)
						+ r.listProFees[i].actualConcnAmt
								.toFixed(2)

						+ "</td><td  align='right' >"
						+ r.listProFees[i].actualDiscPer
								.toFixed(2)
						+ "</td><td align='right' >"
						+ r.listProFees[i].actualDiscAmt
								.toFixed(2)
						+ "</td><td  align='right' id='tdPatPayable"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].actualFinalPayable
								.toFixed(2)
						+ "</td><td  align='right' id='tdPatPaid"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].actualFinalPaid
								.toFixed(2)
						+ "</td><td  align='right' id='tdRefundAmount"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].refundAmount
								.toFixed(2)
						+ "</td><td  align='right' id='tdHospPercentInAmount"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].hospPercentInAmount
								.toFixed(2)

						+ "</td><td  align='right' id='tdRefDocId"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].refDrId
						+ "</td><td  align='right' id='tdRefDocPer"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].refDrPercent
								.toFixed(2)
						+ "</td><td  align='right' id='tdRefDocAmt"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].refDrAmount
								.toFixed(2)
						+ "</td><td  align='right' id='tdPfAmount"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].pfAmount.toFixed(2)
						+ "</td><td  align='right' id='tdPfPaid"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].pfPaid.toFixed(2)
						+ "</td><td  align='right' id='tdPfUnpaid"
						+ (i + 1)
						+ "'>"
						+ r.listProFees[i].pfUnpaid.toFixed(2)
						+ "</td><td  align='right'><input type='text' onkeyup='setFinalPfAmount()' style='text-align: right;' id='tdPfPayable"
						+ (i + 1)
						+ "' value='"
						+ r.listProFees[i].pfUnpaid.toFixed(2)
						+ "'>"
						+ "</td><td  align='right' id='tdPfReduction"
						+ (i + 1)
						+ "'>0.00"
						+ "</td><td  align='right' id='tdPfAddition"
						+ (i + 1)
						+ "'>0.00"
						+ "</td><td class='hide'><input type='hidden' id='tdDeptId"
						+ (i + 1)
						+ "' value='"
						+ r.listProFees[i].deptId
						+ "'></td>"
						+ "<td class='hide'><input type='hidden' id='tdDocId"
						+ (i + 1)
						+ "' value='"
						+ r.listProFees[i].doctorId
						+ "'></td>"
						+ "<td class='hide'><input type='hidden' id='tdIscombination"
						+ (i + 1)
						+ "' value='"
						+ r.listProFees[i].iscombination
						+ "'></td>"
						+ "<td class='hide'><input type='hidden' id='tdOtherBillDIdOpd"
						+ (i + 1) + "' value='"
						+ r.listProFees[i].otherBillDIdOpd
						+ "'></td>" + "</tr>";

				totalRate = totalRate + r.listProFees[i].rate;
				totalConcessionAmt = totalConcessionAmt
						+ r.listProFees[i].actualConcnAmt;
				totalConcessionPer = totalConcessionPer
						+ r.listProFees[i].actualConcnPer;
				totalAmount = totalAmount
						+ r.listProFees[i].actualAmt;
				totalPfAmount = totalPfAmount
						+ r.listProFees[i].pfAmount;
				totalPfPaid = totalPfPaid
						+ r.listProFees[i].pfPaid;
				totalPfUnpaid = totalPfUnpaid
						+ r.listProFees[i].pfUnpaid;
				totalHospAmount = totalHospAmount
						+ r.listProFees[i].hospPercentInAmount;
				totalBillAmount = totalBillAmount
						+ r.listProFees[i].totalBillAmount;
				totalPaid = totalPaid
						+ r.listProFees[i].actualFinalPaid;
				totalPayablePf = totalPayablePf
						+ r.listProFees[i].pfUnpaid;
				totalDiscountAmt = totalDiscountAmt
						+ r.listProFees[i].actualDiscAmt;
				totalDiscountPer = totalDiscountPer
						+ r.listProFees[i].actualDiscPer;
				totalFinalPayable = totalFinalPayable
						+ r.listProFees[i].actualFinalPayable;
				totalRefDocAmount = totalRefDocAmount
						+ r.listProFees[i].refDrAmount;
				totalRefundedAmount = totalRefundedAmount
						+ r.listProFees[i].refundAmount;

			}

		}
		htm = htm
				// + "<tr><td style='height:
				// 11.5px;'></td></tr>"
				+ "<tr style = 'background-color:#EEEEEE;'><td colspan='9'></td><td>Total</td>"
				+ "<td  align='right'>"
				+ totalRate.toFixed(2)
				+ "</td><td  align='right'>"
				+ "</td><td  align='right'>"
				+ totalAmount.toFixed(2)

				+ "</td><td  align='center'>-"
				// + totalConcessionPer.toFixed(2)
				+ "</td><td  align='right'>"
				+ totalConcessionAmt.toFixed(2)

				+ "</td><td  align='center'>-"
				// + totalDiscountPer.toFixed(2)
				+ "</td><td  align='right'>"
				+ totalDiscountAmt.toFixed(2)
				+ "</td><td align='right'>"
				+ totalFinalPayable.toFixed(2)
				+ "</td><td  align='right'>"
				+ totalPaid.toFixed(2)
				+ "</td><td   align='right'>"
				+ totalRefundedAmount.toFixed(2)
				+ "</td><td   align='right'>"
				+ totalHospAmount.toFixed(2)
				+ "</td><td   align='right'>"
				+ "</td><td   align='right'>"
				+ "</td><td   align='right'>"
				+ totalRefDocAmount.toFixed(2)
				+ "</td><td   align='right'>"
				+ totalPfAmount.toFixed(2)
				+ "</td><td   align='right'>"
				+ totalPfPaid.toFixed(2)
				+ "</td><td  align='right'>"
				+ totalPfUnpaid.toFixed(2)
				+ "</td><td   align='right' id='tblPfPayable'>"
				+ totalPayablePf.toFixed(2)
				+ "</td><td   align='right' id='tblPfTotalReduction'>"
				+ totalReduction.toFixed(2)
				+ "</td><td   align='right' id='tblPfTotalAddition'>"
				+ totalAddition.toFixed(2) + "</td></tr>";

		// set values in respected fields
		$("#txtTotalAmount").val(totalAmount.toFixed(2));
		$("#txtTotalConcession").val(
				(totalDiscountAmt + totalConcessionAmt)
						.toFixed(2));
		$("#txtTotalPaid").val(totalPaid.toFixed(2));

		$("#txtTotalHospAmount")
				.val(totalHospAmount.toFixed(2));
		$("#txtTotalPfAmount").val(totalPfAmount.toFixed(2));
		$("#txtTotalPayable").val(totalPayablePf.toFixed(2));

		$("#tableTestVoucherListHead1").html(htmHead);
		$("#tableTestVoucherList1").html(htm);
	}

}

function saveDrPaymentVoucher() {

	var voucherId = $("#voucherId").val();
	var deptId = $("#deptId").val();
	var deptName = $("#deptId option:selected").text();
	if(deptId == 0 || deptId == null || deptId == undefined){
		alert("Select Department!!!");
		SetFocus("deptId");
		return false;
	}
	var doctorId = $("#txtDoctorId").val();
	var doctorName = $("#byName").val();
	
	if(doctorId <= 0 || doctorId == "" || doctorId == undefined){
		doctorId = 0;
		doctorName = deptName + " Multiple Doctor's";
	}
	
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	var totalAmount = $("#txtTotalAmount").val();
	var totalConcession = $("#txtTotalConcession").val();
	var totalPatPaid = $("#txtTotalPaid").val();

	var totalHospAmount = $("#txtTotalHospAmount").val();
	var totalPfAmount = $("#txtTotalPfAmount").val();
	var totalPfPaid = $("#txtTotalPayable").val();
	var billTypeId = $("#billTypeId").val();
	var advanceFlag = "N";
	if(billTypeId == 2 || billTypeId == 3){
		advanceFlag = "Y";
	}
	var tableRows = $('#tableTestVoucherList tr').length;
	if (tableRows == undefined || tableRows == 0) {
		alert("There is no record to add in Voucher List!");
		return false;
	}
	
	var voucherDetails = {   
			listVoucher : []
		};
	
	voucherDetails.listVoucher.push({
		voucherId : voucherId,
		deptId : deptId,
		doctorId : doctorId,
		doctorName : doctorName,
		fromDate : fromDate,
		toDate : toDate,
		totalAmount : totalAmount,
		totalConcession : totalConcession,
		totalPatPaid : totalPatPaid,
		totalHospAmount : totalHospAmount,
		totalPfAmount : totalPfAmount,
		totalPfPaid : totalPfPaid
		
	});
	
	var profeesDetails = {
			listProFees : []
	};
	

		if (deptId == 2) {
		// ipd flow
		for ( var i = 1; i <= tableRows - 1; i++) {
			var billId = $("#tdBillId" + i).text();
			var billDetailsId = $("#tdBillDetailsId" + i).text();
			var billRecMasterId = 0;//$("#tdBillReceiptMasterId" + i).text();
			var billRecSlaveId = 0;//$("#tdBillReceiptSlaveId" + i).text();
			var departmentId = $("#tdDeptId" + i).val();
			var hospAmount = parseFloat($("#tdHospPercentInAmount" + i).text());
			var refDrId = parseFloat($("#tdRefDocId" + i).text());
			var refDrPer = parseFloat($("#tdRefDocPer" + i).text());
			var refDrAmt = parseFloat($("#tdRefDocAmt" + i).text());
			var pfAmount = parseFloat($("#tdPfAmount" + i).text());
			var pfPaid = parseFloat($("#tdPfPaid" + i).text());
			var pfPayable = parseFloat($("#tdPfPayable" + i).val());
			var pfUnpaid = 0;// pfAmount -
								// pfPayable//$("#tdPfUnpaid"+i).text();
			var patPaid = parseFloat($("#tdPatPaid" + i).text());
			var tdDocId = $("#tdDocId" + i).val();
			var tdIsCombination = $("#tdIscombination" + i).val();
			var tdOtherBillDIdIpd = $("#tdOtherBillDIdIpd" + i).val();
			var tdDocName = $("#tdDocName" + i).text();
			var tdReduction = parseFloat($("#tdPfReduction" + i).text());
			var tdAddition = parseFloat($("#tdPfAddition" + i).text());

			if (pfPayable > patPaid) {
				alert("You can't Pay more than received!!!");
				// setFocus("tdPfPayable"+i);
				return false;
			}
			// alert("1)="+billRecMasterId+" (2)="+billRecSlaveId+"
			// (3)="+hospAmount+" (4)="+pfAmount+" (5)="+pfUnpaid+"
			// (6)="+pfPayable);
			profeesDetails.listProFees.push({
				billId : billId,
				billDetailsId : billDetailsId,
				billReceiptMasterId : billRecMasterId,
				billReceiptSlaveId : billRecSlaveId,
				hospPercentInAmount : hospAmount,
				pfAmount : pfAmount,
				pfPaid : pfPayable,
				pfUnpaid : pfUnpaid,
				deptId : departmentId,
				doctorId : tdDocId,
				doctorName : tdDocName,
				pfReduction : tdReduction,
				pfAddition : tdAddition,
				advanceFlag : advanceFlag,
				actHospAmount : hospAmount,
				refDrId : refDrId,
				refDrPercent : refDrPer,
				refDrAmount :refDrAmt,
				iscombination : tdIsCombination,
				otherBillDIdIpd : tdOtherBillDIdIpd,
				paid : patPaid

			});
		}
	} else {
		for ( var i = 1; i <= tableRows - 1; i++) {
			var billId = $("#tdBillId" + i).text();
			var billDetailsId = $("#tdBillDetailsId" + i).text();
			var billRecMasterId = $("#tdBillReceiptMasterId" + i).text();
			var billRecSlaveId = $("#tdBillReceiptSlaveId" + i).text();
			var departmentId = $("#tdDeptId" + i).val();
			var hospAmount = $("#tdHospPercentInAmount" + i).text();
			var refDrId = parseFloat($("#tdRefDocId" + i).text());
			var refDrPer = parseFloat($("#tdRefDocPer" + i).text());
			var refDrAmt = parseFloat($("#tdRefDocAmt" + i).text());
			var pfAmount = $("#tdPfAmount" + i).text();
			var pfPaid = $("#tdPfPaid" + i).text();
			var pfPayable = $("#tdPfPayable" + i).val();
			var pfUnpaid = 0;// pfAmount -
								// pfPayable//$("#tdPfUnpaid"+i).text();
			var patPaid = parseFloat($("#tdPatPaid" + i).text());
			var tdDocId = $("#tdDocId" + i).val();
			var tdDocName = $("#tdDocName" + i).text();
			var tdIsCombination = $("#tdIscombination" + i).val();
			var tdOtherBillDIdOpd = $("#tdOtherBillDIdOpd" + i).val();
			var tdReduction = $("#tdPfReduction" + i).text();
			var tdAddition = $("#tdPfAddition" + i).text();

			if (pfPayable > patPaid) {
				alert("You can't Pay more than received!!!");
				// setFocus("tdPfPayable"+i);
				return false;
			}
			profeesDetails.listProFees.push({
				billId : billId,
				billDetailsId : billDetailsId,
				billReceiptMasterId : billRecMasterId,
				billReceiptSlaveId : billRecSlaveId,
				hospPercentInAmount : hospAmount,
				pfAmount : pfAmount,
				pfPaid : pfPayable,
				pfUnpaid : pfUnpaid,
				deptId : departmentId,
				doctorId : tdDocId,
				doctorName : tdDocName,
				pfReduction : tdReduction,
				pfAddition : tdAddition,
				advanceFlag : advanceFlag,
				actHospAmount : hospAmount,
				refDrId : refDrId,
				refDrPercent : refDrPer,
				refDrAmount :refDrAmt,
				iscombination : tdIsCombination,
				otherBillDIdOpd : tdOtherBillDIdOpd,
				paid : patPaid

			});
		}
	}
	

	voucherDetails = JSON.stringify(voucherDetails);
	profeesDetails = JSON.stringify(profeesDetails);
	
	if(voucherDetails == null || voucherDetails == undefined){
		alert("Fill Records!!!");
		return false;
	}
	
	if(profeesDetails == null || profeesDetails == undefined){
		alert("No Records!!!");
		return false;
	}
	//alert(profeesDetails);
	//return false;
	var inputs = [];
	
	//inputs.push('action=proFeesfetchReports');
	//inputs.push('callFrom=' + callFrom);	
	//inputs.push('voucherId=' + voucherId);
	inputs.push("voucherDetails="+ encodeURIComponent(voucherDetails));
	inputs.push("profeesDetails="+ encodeURIComponent(profeesDetails));
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/saveDrPaymentVoucher",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			proFeesDoctorPayment();
		}
	});

}


//irfan khan 9-aug-2017 To calculate pfPayable on keyup
function setFinalPfAmount() {
	var tableRows = $('#tableTestVoucherList tr').length;
	if (tableRows == undefined || tableRows == 0) {
		alert("There is no record to add in Voucher List!");
		return false;
	}
	var txtTotalPaid =$("#txtTotalPaid").val();
	var billTypeId =$("#billTypeId").val();
	var finalPfPayable = 0.0;
	var finalPfReduction = 0.0;
	var finalPfAddition = 0.0;
	for(var i=1;i <= tableRows-1;i++){
		var pfPayable = parseFloat($("#tdPfPayable"+i).val());
		if(isNaN(pfPayable)){
			pfPayable = 0.0;
		}
		var pfPatPaid = parseFloat($("#tdPatPaid"+i).text());
		var msg = "Can't be greater than received!!";
		if(billTypeId == 2){
			pfPatPaid = parseFloat($("#tdFinalPayable"+i).text());
			msg = "Can't be greater than payable!!";
		}
		
		var tdPfUnpaid = parseFloat($("#tdPfUnpaid"+i).text());
		if(pfPayable > pfPatPaid){
			alert(msg);
			$("#tdPfPayable"+i).val(tdPfUnpaid.toFixed(2));
			$("#tdPfReduction"+i).text(0.00);
			$("#tdPfAddition"+i).text(0.00);
			setFinalPfAmount();
			return false;
		}
		var pfAmount = parseFloat($("#tdPfAmount"+i).text());
		var reduction = 0.0;
		var addition = 0.0;
		if(pfAmount > pfPayable){
			reduction = pfAmount - pfPayable;
			addition = 0.0;
		}else if(pfAmount < pfPayable){
			reduction =  0.0 ;
			addition = pfPayable - pfAmount;
		}
		
		$("#tdPfReduction"+i).text(reduction.toFixed(2));
		$("#tdPfAddition"+i).text(addition.toFixed(2));
		finalPfPayable = finalPfPayable + pfPayable;
		finalPfReduction = finalPfReduction + reduction;
		finalPfAddition = finalPfAddition + addition;
	}
	
	$("#tblPfPayable").text(finalPfPayable.toFixed(2));
	$("#tblPfTotalReduction").text(finalPfReduction.toFixed(2));
	$("#tblPfTotalAddition").text(finalPfAddition.toFixed(2));
	$("#txtTotalPayable").val(finalPfPayable.toFixed(2));
	$("#txtTotalHospAmount").val((txtTotalPaid - finalPfPayable).toFixed(2));
}

function resetDoctorPaymentVoucher(){
	
	// reset values
	$("#txtTotalAmount").val(0);
	$("#txtTotalConcession").val(0);
	$("#txtTotalPaid").val(0);
	
	$("#txtTotalHospAmount").val(0);
	$("#txtTotalPfAmount").val(0);
	$("#txtTotalPayable").val(0);
	
	
	$("#byName").val("");
	$("#unitId").val(0);
	$("#txtDoctorId").val("");
	$("#inputFromDate").val("");
	$("#inputToDate").val("");
	$("#unitId").val(0);
	
	fetchDeptAndServices("onload");
}

function fetchDoctorsVouchers(callFrom) {
	var unitId = 0;
	var doctorId = 0;
	var deptId = 0;
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
   // var todays = yyyy +'-'+mm+'-'+dd;
	
	var fromDate = yyyy +'-'+mm+'-'+dd;
	var toDate = yyyy +'-'+mm+'-'+dd;
	if (callFrom == "search") {
		unitId = $("#unitId").val();
		doctorId = $("#txtDoctorId").val();
		deptId = $("#deptId").val();
		fromDate = $("#fromDate").val();
		toDate = $("#toDate").val();
		
		var str = getDateFormat(fromDate, toDate); //added by sandip
		var fromDate = str.split(':')[0];
		var toDate = str.split(':')[1];
		
		if(fromDate == '' || fromDate == null || fromDate == undefined){
			alert("Select From Date!!");
			return false;
		}
		if(toDate == '' || toDate == null || toDate == undefined){
			alert("Select To Date!!");
			return false;
		}
		if(doctorId == 0 || doctorId == null || doctorId == undefined){
			alert("Select To Doctor !!!");
			return false;
		}
	}
	
	var inputs = [];
	
	inputs.push("unitId=" + unitId);
	inputs.push("doctorId=" + doctorId);
	inputs.push("deptId=" + deptId);
	inputs.push("fromDate=" + fromDate);
	inputs.push("toDate=" + toDate);
	inputs.push("callFrom=" + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/fetchDoctorsVouchers",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r.listVoucher[0].totalPfPaid);
			var htm = "";
			
			if(callFrom == "cancel"){
				if(r.listVoucher.length > 0){
					for(var i = 0; i < r.listVoucher.length ; i++){
						
						var dateTime=new Date(r.listVoucher[i].createdDate).toLocaleString();
				    	var createdDate = (dateTime.split(",")[0]).split('/');
				    	var date = createdDate[0]+'/'+createdDate[1]+'/'+createdDate[2];
					
						htm = htm 
						+ "<tr><td class='col-md-1 center'>"+(i+1)
						+ "</td><td class='col-md-1 TextFont'>"+r.listVoucher[i].voucherId
						+ "</td><td class='col-md-6 TextFont'>"+r.listVoucher[i].doctorName
						+ "</td><td class='col-md-2 TextFont center'>"+r.listVoucher[i].deptId
						+ "</td><td class='col-md-1 TextFont'>"+date
						+ "</td><td class='col-md-1 TextFont' align=right>"+(r.listVoucher[i].totalPfPaid).toFixed(2)
						+ "</td></tr>" ;
						/*+"<td class='col-md-2 TextFont center'><button type='button' class='btn btn-xs btn-danger'"
						+ " onclick=cancelVoucher('"+r.listVoucher[i].voucherId+"','"+r.listVoucher[i].deptId+"')><i class='fa fa-trash-o'></i></button>"
						+ "</td></tr>";*/
					}
				}
				$("#tableCancelTestDash").html(htm);
			}else{
				if(r.listVoucher.length > 0){
					for(var i = 0; i < r.listVoucher.length ; i++){
						
						var dateTime=new Date(r.listVoucher[i].createdDate).toLocaleString('en-GB');
				    	var createdDate = (dateTime.split(",")[0]).split('/');
				    	var date = createdDate[0]+'/'+createdDate[1]+'/'+createdDate[2];
				    	
						htm = htm 
						+ "<tr><td class='col-md-1 center'>"+(i+1)
						+ "</td><td class='col-md-1 TextFont'>"+r.listVoucher[i].voucherId
						+ "</td><td class='col-md-5 TextFont'>"+r.listVoucher[i].doctorName
						+ "</td><td class='col-md-2 TextFont center'>"+r.listVoucher[i].deptId
						+ "</td><td class='col-md-1 TextFont'>"+date
						+ "</td><td class='col-md-1 TextFont' align=right>"+(r.listVoucher[i].totalPfPaid).toFixed(2)
						+ "</td><td class='col-md-1 TextFont center'><button type='button' class='btn btn-xs btn-danger'"
						+ " onclick=cancelVoucher('"+r.listVoucher[i].voucherId+"','"+r.listVoucher[i].deptId+"','"+date+"')><i class='fa fa-trash-o'></i></button>"
						+ "</td></tr>";
					}
				}
				$("#tableCurrentTestDash").html(htm);
			}
			
		}
	});

}

function cancelVoucher(voucherId, deptId, vDate) {
	
	//check for month if greater then dont delete
	var d1 = new Date(vDate);
	var today = new Date();
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const formattedToday = dd + '/' + mm + '/' + yyyy;
	
	//if (d2.getMonth() != d1.getMonth() || d2.getFullYear() > d1.getFullYear()) {
	 if(formattedToday != vDate){
		alert("Can't delete previous(old) records!!!");
		return false;
	} else {

		var r = confirm("Are You Sure to Cancel Voucher ?? ");
		if (r == true) {
			var inputs = [];

			inputs.push("voucherId=" + voucherId);
			inputs.push("deptId=" + deptId);
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/cancelVoucher",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					alert(r);
					fetchDoctorsVouchers("onload");
				}
			});
		}
	}
}

function proFeesDoctorsReport(callFrom) {
	//alert("in");
	var doctorName = null;
	var fromDate = null;
	var toDate = null;
	var doctorId = null;
	var unitId = null;
	var deptId = null;
	var serviceId = null;
	// var serviceType = null;

	if (callFrom == "doctor") {
		doctorName = $("#byName").val();
		fromDate = $("#inputFromDate").val();
		toDate = $("#inputToDate").val();
		doctorId = $("#txtDoctorId").val();
		unitId = $("#unitId").val();
		deptId = $("#deptId").val();
		serviceId = $("#serviceId").val();
		// serviceType = $("#txtSelectServiceReport").val();

		/*if (byName == "" || byName == undefined) {
			alert("Please Type Doctor Name!");
			$("#byName").val("");
			SetFocus("byName");
			return false;
		} else */
		if (doctorId == null || doctorId == "" || doctorId == undefined) {
			doctorId = 0;
		} 
		if (fromDate == "" || fromDate == undefined) {
			alert("Please Select From Date!");
			$("#inputFromDate").val("");
			SetFocus("inputFromDate");
			return false;
		} else if (toDate == "" || toDate == undefined) {
			alert("Please Select From Date!");
			$("#inputToDate").val("");
			SetFocus("inputToDate");
			return false;
		}

	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorId=' + doctorId);
	inputs.push('unitId=' + unitId);
	inputs.push('deptId=' + deptId);
	inputs.push('serviceId=' + serviceId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/proFeesDoctorsReport",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			var totalRate = 0;
			var totalConcession = 0;
			var totalDiscount = 0;
			var totalAmount = 0;
			var totalPfAmount = 0;
			var totalReduction = 0;
			var totalAddition = 0;
			var totalPatPaid = 0;
			var totalPfPaid = 0;
			var totalPfUnpaid = 0;
			var totalHospAmount = 0;
			var htmBody = "";
			var htm = "<tr style='background-color: #EEEEEE'><th colspan='3' left>"
				//+ "SHRADDHA HOSPITAL"
				+ "Doctors Payable Report<br>From  : <b>"
				+ fromDate
				+ "</b><br> To  : <b>"
				+ toDate
				//+ "</b><br>Doctor Name : <b>"
				//+ doctorName
				+ "</b></th></tr>";
				
				 htm=htm + "<tr style='background-color: #EEEEEE'><th>SR.NO</th><th class='col-md-1'>Unit Name"
				 		+"</th><th class='col-md-1'>Doctor Name"
				 		+"</th><th class='col-md-1'>Dept Name"
						+"</th><th class='col-md-1'>Servc Name"
						+"</th><th class='col-md-1'>Patient Id"
						+"</th><th class='col-md-1'>Patient Name"
						+"</th><th class='col-md-1'>Assign.Date"
						+"</th><th class='col-md-1'>Comp.Name"
						+"</th><th class='col-md-1'>Rate"
						+"</th><th class='col-md-1'>Quantity"
						+"</th><th class='col-md-1'>Amount"
						+"</th><th class='col-md-1'>Concession"
						+"</th><th class='col-md-1'>ConcessionPer"
						+"</th><th class='col-md-1'>Discount"
						+"</th><th class='col-md-1'>DiscountPer"
						+"</th><th class='col-md-1'>Pat-Paid"
						+"</th><th class='col-md-1'>HospAmount"
						+"</th><th class='col-md-1'>Pf.Amount"
						
						+"</th><th class='col-md-1'>Pf.Paid"
						+"</th><th class='col-md-1'>Pf.Unpaid"
						+"</th><th class='col-md-1'>Reduction"
						+"</th><th class='col-md-1'>Addition"
						
						+"</th></tr>";
				 
				 if(r.listProFees.length == 0 ){
						
					 htmBody = htmBody 
						+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='17' class='center'>No Record Found...!!!</th></tr>";
						
				} else{
				//console.log(r);
				for ( var i = 0; i < r.listProFees.length; i++) {
					
					/*if(r.listProFees[i].chargesId() > 0 || r.listProFees[i].chargesSlaveId() > 0){
						pflist.get(i).setAmount(pflist.get(i).getOtherAmount());
						pflist.get(i).setRate(pflist.get(i).getOtherRate());
					}*/
					var amountRtn = r.listProFees[i].amount;
					var rateRtn = r.listProFees[i].rate;
					var concessionRtn = r.listProFees[i].concession;
					if(r.listProFees[i].chargesId > 0 || r.listProFees[i].chargesSlaveId > 0){
						amountRtn = r.listProFees[i].otherAmount;
						rateRtn = r.listProFees[i].otherRate;
						concessionRtn = r.listProFees[i].otherConcession;
					}
					
					htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1'>"+(i+1)
						+"<td class='col-md-1'>"+r.listProFees[i].unitName
						+"<td class='col-md-1'>"+r.listProFees[i].doctorName
						+"<td class='col-md-1'>"+r.listProFees[i].deptName
						+"<td class='col-md-1'>"+r.listProFees[i].serviceName
						+"<td class='col-md-1'>"+r.listProFees[i].patientId
						+"<td class='col-md-1'>"+r.listProFees[i].patientName
						+"</td><td class='col-md-1'>"+r.listProFees[i].serviceAssignDate
						+"</td><td class='col-md-1'>"+r.listProFees[i].componentName
						+"</td><td class='col-md-1' align='right'>"+rateRtn.toFixed(2)
						+"</td><td class='col-md-1' >"+r.listProFees[i].quantity
						+"</td><td class='col-md-1' align='right'>"+amountRtn.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+concessionRtn.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].concessionPer.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].discount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].discountPer.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].paid.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].hospAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].pfAmount.toFixed(2)
						
						+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].pfPaid.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].pfUnpaid.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].pfReduction.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].pfAddition.toFixed(2)
						
						+"</td>"
						+"</tr>";
					
					 totalRate = totalRate + rateRtn;
					 totalConcession = totalConcession + concessionRtn;
					 totalAmount = totalAmount + amountRtn;
					 totalPfAmount = totalPfAmount + r.listProFees[i].pfAmount;
					 totalPatPaid = totalPatPaid + r.listProFees[i].paid;
					 totalReduction = totalReduction + r.listProFees[i].pfReduction;
					 totalAddition = totalAddition + r.listProFees[i].pfAddition;
					 totalPfPaid = totalPfPaid + r.listProFees[i].pfPaid;
					 totalPfUnpaid = totalPfUnpaid + r.listProFees[i].pfUnpaid;
					 totalHospAmount = totalHospAmount + r.listProFees[i].hospAmount;
					 totalDiscount = totalDiscount + r.listProFees[i].discount;
					
				}
				}	
				 htmBody = htmBody
					+ "<tr ><td style='height: 11.5px;'></td></tr>";
				 htmBody = htmBody
					+ "<tr style = 'background-color:#EEEEEE;'><td colspan='8'></td><th class='center'>Total"
					+ "</th><td class='col-md-1' align='right' >"+ totalRate.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >"
					+ "</td><td class='col-md-1' align='right' >" + totalAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalConcession.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" 
					+ "</td><td class='col-md-1' align='right' >" + totalDiscount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" 
					+ "</td><td class='col-md-1' align='right' >" + totalPatPaid.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalHospAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalPfAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalPfPaid.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalPfUnpaid.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalReduction.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalAddition.toFixed(2)
					+ "</td></tr>";
				
			$("#tableTestVoucherListHead").html(htm);
			$("#tableTestVoucherList").html(htmBody);
		}
	});
}

//Irfan khan @23-aug-2017 to add doctor in list
function addDoctorsInList() {
	var doctorId = $("#txtDoctorId").val();
	var doctorName = $("#doctorName").val();
	var doctorPercent = $("#doctorPercent").val();
	var trCnt = $('#addDoctorTbody tr').length;

	if (doctorId == 0 || doctorId == "" || doctorId == null
			|| doctorId == undefined) {
		alert("Select doctor!!!");
		return false;
	}
	if (doctorName == "" || doctorName == null || doctorName == undefined) {
		alert("Select doctor!!!");
		return false;
	}
	if (doctorPercent == "" || doctorPercent == null
			|| doctorPercent == undefined) {
		alert("Insert doctor percent!!!");
		return false;
	}
	
	for(var i=1;i<=trCnt;i++){
		//alert("DoctorId=="+doctorId+"   tdocId=="+$("#doctorId"+i).text());
		var tDocId = parseInt($("#doctorId"+i).text());
		if(doctorId == tDocId){
			alert("Already exist!!!");
			return false;
		}
	}
	trCnt++;
	$("#addDoctorTbody")
			.append("<tr id='tr" + trCnt + "'>"
					+ "<td id='tdSrno"+trCnt+"' class='col-md-1'>"+trCnt+"</td>"
					+ "<td id='tdDoctorId"+trCnt+"' class='col-md-1'>"+doctorId+"</td>"
					+ "<td id='tdDoctorName"+trCnt+"' class='col-md-6'>"+doctorName+"</td>"
					+ "<td id='tdDoctorPercent"+trCnt+"' contenteditable class='col-md-2'>"+doctorPercent+"</td>"
					+ "<td class='col-md-2'><button type='button' class='btn btn-xs btn-danger'"
					+ " onclick=removeDoctorForGroupMaster('"+trCnt+"')><i class='fa fa-trash-o'></i></button></td>"
					+ "</tr>");
	
	$("#txtDoctorId").val(0);
	$("#doctorName").val("");
	$("#doctorPercent").val("");
}

//Irfan khan @23-aug-2017 to save group details
function saveGroupDetails() {
	var groupId = $("#groupId").val();
	var groupName = $("#groupName").val();
	var equalPercent = parseFloat($("#equalPercent").val());
	var individualPercent = parseFloat($("#individualPercent").val());
	var trCnt = $('#addDoctorTbody tr').length;
	var callFrom = $("#callFrom").val();

	if(groupName == "" || groupName == null || groupName == undefined){
		alert("Enter Group Name!!!");
		SetFocus("groupName");
		return false;
	}
	if((equalPercent+individualPercent) != 100){
		alert("Shared % total should be 100%");
		SetFocus("equalPercent");
		return false;
	}
	
	var groupMasterDetails = {
			listGroupMaster : []
	};
	
	groupMasterDetails.listGroupMaster.push({
		groupMasterId : groupId,
		groupName : groupName,
		equalPercent : equalPercent,
		individualPercent : individualPercent

	});
	
	var groupSlaveDetails = {
		listGroupSlave : []
	};

	var totalDocPer = 0.0;
	for ( var i = 1; i <= trCnt; i++) {
		var doctorId = $("#tdDoctorId" + i).text();
		var doctorName = $("#tdDoctorName" + i).text();
		var doctorPercent = parseFloat($("#tdDoctorPercent" + i).text());
		totalDocPer = totalDocPer + doctorPercent;
		groupSlaveDetails.listGroupSlave.push({
			doctorId : doctorId,
			doctorName : doctorName,
			doctorPercent : doctorPercent

		});
	}
	//alert(individualPercent +"=="+totalDocPer);
	if(individualPercent != totalDocPer){
		alert("total Dr. % is not equal to individual %");
		SetFocus("individualPercent");
		return false;
	}
	groupSlaveDetails = JSON.stringify(groupSlaveDetails);
	groupMasterDetails = JSON.stringify(groupMasterDetails);

	var inputs = [];

	/*inputs.push('groupId=' + groupId);
	inputs.push('groupName=' + groupName);
	inputs.push('equalPercent=' + equalPercent);
	inputs.push('individualPercent=' + individualPercent);*/
	inputs.push("groupSlaveDetails=" + encodeURIComponent(groupSlaveDetails));
	inputs.push("groupMasterDetails=" + encodeURIComponent(groupMasterDetails));
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/saveGroupDetails",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			fetchGroupMasterList("save");
			//$("#callFrom").val("insert");
			resetGroupMaster();
			//proFeesDoctorPayment();
		}
	});
}

function fetchGroupMasterList(callFrom){

var letter="";
if(callFrom == "search"){
 letter= $("#byName3").val();
}else{
	$("#byName3").val("");
}	


	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callFrom" : callFrom,
			"letter" : letter
		},
		url : "ehat/profees/fetchGroupMasterList",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r.listGroupMaster.length);
			var htm="";
			for ( var i = 0; i < r.listGroupMaster.length; i++) {
				htm = htm + "<tr>"
				+"<td class='col-md-1'>"+(i+1)
				+"</td><td class='col-md-1' id='tdGroupId"+r.listGroupMaster[i].groupMasterId+"'>"+r.listGroupMaster[i].groupMasterId
				+"</td><td class='col-md-6' id='tdGroupName"+r.listGroupMaster[i].groupMasterId+"'>"+r.listGroupMaster[i].groupName
				+"</td><td class='col-md-2' id='tdEqualPercent"+r.listGroupMaster[i].groupMasterId+"'>"+r.listGroupMaster[i].equalPercent
				+"</td><td class='col-md-2' id='tdIndividualPercent"+r.listGroupMaster[i].groupMasterId+"'>"+r.listGroupMaster[i].individualPercent
				+"</td><td class='col-md-2'><button type='button' class='btn btn-xs btn-success'"
				+" onclick=editGroupMaster('"+r.listGroupMaster[i].groupMasterId+"')><i class='fa fa-edit'></i></button>"
				+"</td><td class='col-md-2'><button type='button' class='btn btn-xs btn-danger'"
				+" onclick=deleteGroupMaster('"+r.listGroupMaster[i].groupMasterId+"')><i class='fa fa-trash-o'></i></button>"
				+"</td></tr>";
			}
			$("#fetchGroupListBody").html(htm);
		}
	});
}
function editGroupMaster(gId){
	var tdGroupName = $("#tdGroupName"+gId).text();
	var tdEqualPercent = parseFloat($("#tdEqualPercent"+gId).text());
	var tdIndividualPercent = parseFloat($("#tdIndividualPercent"+gId).text());
	
	$("#groupId").val(gId);
	$("#groupName").val(tdGroupName);
	$("#equalPercent").val(tdEqualPercent);
	$("#individualPercent").val(tdIndividualPercent);
	
	var inputs = [];

	inputs.push('groupId=' + gId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/fetchGroupSlaveList",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r.listGroupSlave.length);
			var htm="";
			for ( var i = 0; i < r.listGroupSlave.length; i++) {
				htm = htm + "<tr id='tr" + (i+1) + "'>"
				+ "<td id='tdSrno"+(i+1)+"' class='col-md-1'>"+(i+1)+"</td>"
				+ "<td id='tdDoctorId"+(i+1)+"' class='col-md-1'>"+r.listGroupSlave[i].doctorId+"</td>"
				+ "<td id='tdDoctorName"+(i+1)+"' class='col-md-6'>"+r.listGroupSlave[i].doctorName+"</td>"
				+ "<td id='tdDoctorPercent"+(i+1)+"' contenteditable class='col-md-2'>"+r.listGroupSlave[i].doctorPercent+"</td>"
				+ "<td class='col-md-2'><button type='button' class='btn btn-xs btn-danger'"
				+ " onclick=removeDoctorForGroupMaster('"+(i+1)+"')><i class='fa fa-trash-o'></i></button></td>"
				+ "</tr>";
			}
			$("#addDoctorTbody").html(htm);
			$("#callFrom").val("update");
		}
	});
}

function deleteGroupMaster(gId) {
	var res = confirm("Are You Sure You Want To Delete?");
	if (res == true) {
		var inputs = [];

		inputs.push('groupId=' + gId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/profees/deleteGroupMaster",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				alert(r);
				fetchGroupMasterList("deleteMaster");
			}
		});
	}
}

function resetGroupMaster(){
	$("#callFrom").val("insert");
	$("#groupId").val(0);
	$("#groupName").val("");
	$("#equalPercent").val(0);
	$("#individualPercent").val(0);
	
	$("#txtDoctorId").val(0);
	$("#doctorName").val("");
	$("#doctorPercent").val("");
	
	$("#addDoctorTbody").empty();
	
	
	fetchGroupMasterList("onload");
}

function proFeesGroupDoctorsReport(callFrom) {
	var doctorName = null;
	var fromDate = null;
	var toDate = null;
	var doctorId = null;
	var unitId = null;
	var deptId = null;
	var serviceId = null;

	if (callFrom == "doctor") {
		doctorName = $("#byName").val();
		fromDate = $("#inputFromDate").val();
		toDate = $("#inputToDate").val();
		doctorId = $("#txtDoctorId").val();
		unitId = $("#unitId").val();
		deptId = $("#deptId").val();
		serviceId = $("#serviceId").val();
		// serviceType = $("#txtSelectServiceReport").val();

		if (byName == "" || byName == undefined) {
			alert("Please Type Doctor Name!");
			$("#byName").val("");
			SetFocus("byName");
			return false;
		} else if (doctorId == 0 || doctorId == "" || doctorId == undefined) {
			alert("Doctor Name is not Valid, Please Select Doctor Name Form Suggestion List!");
			$("#byName").val("");
			SetFocus("byName");
			return false;
		} else if (fromDate == "" || fromDate == undefined) {
			alert("Please Select From Date!");
			$("#inputFromDate").val("");
			SetFocus("inputFromDate");
			return false;
		} else if (toDate == "" || toDate == undefined) {
			alert("Please Select From Date!");
			$("#inputToDate").val("");
			SetFocus("inputToDate");
			return false;
		}

	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorId=' + doctorId);
	inputs.push('unitId=' + unitId);
	inputs.push('deptId=' + deptId);
	inputs.push('serviceId=' + serviceId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/proFeesGroupDoctorsReport",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			var totalRate = 0;
			var totalConcession = 0;
			var totalAmount = 0;
			var totalPfAmount = 0;
			var totalReduction = 0;
			var totalAddition = 0;
			var totalPatPaid = 0;
			var totalPfPaid = 0;
			var totalPfUnpaid = 0;
			var totalHospAmount = 0;
			var equalPercentAmount = 0;
			var individualPercentAmount = 0;
			var totalPercentAmount = 0;
			var htmBody = "";
			var htm = "<tr style='background-color: #EEEEEE'><th colspan='3' left>"
				+ "NOBLE HOSPITAL"
				+ "<br>Group Doctors Payable Report<br>From  : <b>"
				+ fromDate
				+ "</b><br> To  : <b>"
				+ toDate
				+ "</b><br>Doctor Name : <b>"
				+ doctorName
				+ "</b></th></tr>";
				
				 htm=htm + "<tr style='background-color: #EEEEEE'><th>SR.NO</th><th class='col-md-1'>Unit Name"
						+"</th><th class='col-md-1'>Dept Name"
						+"</th><th class='col-md-1'>Group Name"
						+"</th><th class='col-md-1'>Servc Name"
						+"</th><th class='col-md-1'>Patient Id"
						+"</th><th class='col-md-1'>Patient Name"
						+"</th><th class='col-md-1'>Assign.Date"
						+"</th><th class='col-md-1'>Comp.Name"
						+"</th><th class='col-md-1'>Rate"
						+"</th><th class='col-md-1'>Quantity"
						+"</th><th class='col-md-1'>Amount"
						+"</th><th class='col-md-1'>Concession"
						+"</th><th class='col-md-1'>Pat-Paid"
						+"</th><th class='col-md-1'>HospAmount"
						+"</th><th class='col-md-1'>Pf.Amount"
						
						+"</th><th class='col-md-1'>Pf.Paid"
						+"</th><th class='col-md-1'>Pf.Unpaid"
						+"</th><th class='col-md-1'>Reduction"
						+"</th><th class='col-md-1'>Addition"
						+"</th><th class='col-md-1'>EqualPercentAmount"
						+"</th><th class='col-md-1'>IndividualPercentAmount"
						+"</th><th class='col-md-1'>TotalPercentAmount"
						+"</th></tr>";
				 
				 if(r.listReceiptSlaveViewDto.length == 0 ){
						
					 htmBody = htmBody 
						+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='17' class='center'>No Record Found...!!!</th></tr>";
						
				} else{
				//console.log(r);
				for ( var i = 0; i < r.listReceiptSlaveViewDto.length; i++) {
					htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1'>"+(i+1)
						+"<td class='col-md-1'>"+r.listReceiptSlaveViewDto[i].unitName
						+"<td class='col-md-1'>"+r.listReceiptSlaveViewDto[i].deptName
						+"<td class='col-md-1'>"+r.listReceiptSlaveViewDto[i].groupName
						+"<td class='col-md-1'>"+r.listReceiptSlaveViewDto[i].serviceName
						+"<td class='col-md-1'>"+r.listReceiptSlaveViewDto[i].patientId
						+"<td class='col-md-1'>"+r.listReceiptSlaveViewDto[i].patientName
						+"</td><td class='col-md-1'>"+r.listReceiptSlaveViewDto[i].serviceAssignDate
						+"</td><td class='col-md-1'>"+r.listReceiptSlaveViewDto[i].compName
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].rate.toFixed(2)
						+"</td><td class='col-md-1' >"+r.listReceiptSlaveViewDto[i].quantity
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].amount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].concession.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].paid.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].hospAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].pfAmount.toFixed(2)
						
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].pfPaid.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].pfUnpaid.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].pfReduction.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].pfAddition.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].equalDrAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].individualDrAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].totalDrAmount.toFixed(2)
						
						+"</td>"
						+"</tr>";
					
					 totalRate = totalRate + r.listReceiptSlaveViewDto[i].rate;
					 totalConcession = totalConcession + r.listReceiptSlaveViewDto[i].concession;
					 totalAmount = totalAmount + r.listReceiptSlaveViewDto[i].amount;
					 totalPfAmount = totalPfAmount + r.listReceiptSlaveViewDto[i].pfAmount;
					 totalPatPaid = totalPatPaid + r.listReceiptSlaveViewDto[i].paid;
					 totalReduction = totalReduction + r.listReceiptSlaveViewDto[i].pfReduction;
					 totalAddition = totalAddition + r.listReceiptSlaveViewDto[i].pfAddition;
					 totalPfPaid = totalPfPaid + r.listReceiptSlaveViewDto[i].pfPaid;
					 totalPfUnpaid = totalPfUnpaid + r.listReceiptSlaveViewDto[i].pfUnpaid;
					 totalHospAmount = totalHospAmount + r.listReceiptSlaveViewDto[i].hospAmount;
					 equalPercentAmount = equalPercentAmount + r.listReceiptSlaveViewDto[i].equalDrAmount;
					 individualPercentAmount = individualPercentAmount + r.listReceiptSlaveViewDto[i].individualDrAmount;
					 totalPercentAmount = totalPercentAmount + r.listReceiptSlaveViewDto[i].totalDrAmount;
					
				}
				}	
				 htmBody = htmBody
					+ "<tr ><td style='height: 11.5px;'></td></tr>";
				 htmBody = htmBody
					+ "<tr style = 'background-color:#EEEEEE;'><td colspan='8'></td><th class='center'>Total"
					+ "</th><td class='col-md-1' align='right' >"+ totalRate.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >"
					+ "</td><td class='col-md-1' align='right' >" + totalAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalConcession.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalPatPaid.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalHospAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalPfAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalPfPaid.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalPfUnpaid.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalReduction.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalAddition.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + equalPercentAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + individualPercentAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalPercentAmount.toFixed(2)
					+ "</td></tr>";
				
			$("#tableTestVoucherListHead").html(htm);
			$("#tableTestVoucherList").html(htmBody);
		}
	});
}

//@author : Irfan Khan @date: 27-Sep-2017 @reason : Autosuggestion for doctor
function setAutoSugForDoctorList(inputId, callFrom) {

	//alert(callFrom);
	var letter = "";
	var specialisationId = 0;
	//var uId = $("#"+uniId).val();
	
	if (callFrom == "all") {
		letter = $("#"+inputId).val();
	}else if(callFrom == "profees"){
		letter = $("#"+inputId).val();//enterd letter 
		specialisationId = $("#drDeptId").val();//hosp specialisation id
	}

	var inputs = [];

	inputs.push('letter=' + letter);
	inputs.push('callFrom=' + callFrom);
	inputs.push('specialisationId=' + specialisationId);
	//inputs.push('unitId=' + uId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/setAutoSugForDoctorList",
		/*timeout : 1000 * 60 * 15,
		cache : false,*/
		success : function(r) {
			//setTempAllReq(r);
			//alert(r.lstDoctorDto.length);
			setTempAutoSugDocList(r, inputId,callFrom);
		}
	});
}

//@author : Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search function
function setTempAutoSugDocList(response, id,callFrom) {
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
						$('#txtDoctorId').val(ui.item.doctor_ID);//set doctor id
						
				if(ui.item.specialisation.includes(",")){
							//$('#isMultiple').val("Multiple");
							var specialisationArray = ui.item.specialisation.split(',');
							var namesArray = ui.item.specialisationName.split(',');

								var selectBox = $("#drDeptId");

								selectBox.empty();

								$.each(specialisationArray, function(index, value) {
								    selectBox.append($('<option>', {
								        value: value,
								        text: namesArray[index].trim() 
								    }));
								});

								selectBox.trigger('#drDeptId change.select2');
								selectBox.select2('val', specialisationArray[0]);
	                  }else{	              
						  $('#drDeptId').val(ui.item.specialisation);
						  
						  var specialisationArray = ui.item.specialisation.split(',');
							var namesArray = ui.item.specialisationName.split(',');

								var selectBox = $("#drDeptId");

								selectBox.empty();

								$.each(specialisationArray, function(index, value) {
								    selectBox.append($('<option>', {
								        value: value,
								        text: namesArray[index].trim() 
								    }));
								});

								selectBox.trigger('#drDeptId change.select2');
								selectBox.select2('val', specialisationArray[0]);
	                  }	
						
					}
					setAutoSugForDoctorList(id,callFrom);
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

//Irfan Khan @date: 11-oct-2017 @reason : To Fetch all hosp specialisation
function getHospSpecialization() {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/profees/getHospSpecialization",
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			setTempHospSpeacialisation(r);//call template
		}
	});
}

//Irfan Khan @date: 11-oct-2017 @reason : To Set hosp specialisation
function setTempHospSpeacialisation(r) {

	var list = "<option value='0'>--Select--</option>";//static value as 0
	for ( var i = 0; i < r.hospitalspclgetlist.length; i++) {

		list = list + "<option value='" + r.hospitalspclgetlist[i].specialisationId + "'>"
				+ (r.hospitalspclgetlist[i].specializationName) + "</option>";
	}
	$("#drDeptId").html(list);//setting list on selectbox id
}

//Irfan khan @date: 2-nov-2017 @reason: Clear table to avoid advance flag ambiguity
function clearTableRecordsFun(){
	$("#tableTestVoucherList").empty();
	//$("#tableTestVoucherList").empty();
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 8-Nov-2017
 * @reason : Reset report
 ******************************************************************************/
function resetDetailsProfees(callFrom) {

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
	var today = yyyy+'-'+mm+'-'+dd; 
	if (callFrom == "report") {
		$("#byName").val("");
		$("#txtDoctorId").val(0);
		$("#inputFromDate").val(today);
		$("#inputToDate").val(today);
		$("#unitId").val(0);
		$("#deptId").val(1);
		$("#serviceId").empty();
		$("#drDeptId").val(0);
		$("#billTypeId").val(1);
		$("#txtTotalAmount").val(0.00);
		$("#txtTotalConcession").val(0.00);
		$("#txtTotalPaid").val(0.00);
		$("#txtTotalHospAmount").val(0.00);
		$("#txtTotalPfAmount").val(0.00);
		$("#txtTotalPayable").val(0.00);
		$('#tableTestVoucherListHead').empty();
		$('#tableTestVoucherList').empty();

	} else {
		$("#byName").val("");
		$("#txtDoctorId").val(0);
		//$("#inputFromDate").val("");
		//$("#inputToDate").val("");
		$("#unitId").val(0);
		$("#deptId").val(1);
		$("#serviceId").empty();
		$("#drDeptId").val(0);
		$("#billTypeId").val(1);
		$("#txtTotalAmount").val(0.00);
		$("#txtTotalConcession").val(0.00);
		$("#txtTotalPaid").val(0.00);
		$("#txtTotalHospAmount").val(0.00);
		$("#txtTotalPfAmount").val(0.00);
		$("#txtTotalPayable").val(0.00);
		$('#tableTestVoucherListHead').empty();
		$('#tableTestVoucherList').empty();
	}
}

/*******
 * @author    :IRFAN KHAN
 * @Date      :8-DEC-2017
 * @Code      :To fetch configured list of doctor dept
 * ******/
function fetchConfgDrDeptList(callFrom) {

	resetProfeesPercentMasterNew();
	// $('#callfrom').val(callfrom);
	$("#tabNo").val(1);
	var id = 'confgDrDeptsListconfgDrDeptsList';

	var id2 = 'confgDrPersonalList';
	var id3 = 'confgDrPersonalListsp';
	var id4 = 'confgroupDrPersonalList';
	
	$("#" + id2).removeClass("active");
	$("#" + id3).removeClass("active");
	$("#" + id4).removeClass("active");
	$("#" + id).addClass("active");
	
	var letter="";
	if(callFrom == "search"){
	 letter= $("#byName2").val();
	}else{
		$("#byName2").val("");
	}	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callFrom" : callFrom,
			"letter" : letter
		},
		url : "ehat/profees/fetchConfgDrDeptList",

		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r.listPerMaster.length);
			//ConfigurationChargesTemplate(response);
			var htm = "";
		    
			htm= '<thead id="popupheader">'
				+'<tr>'
				+ '<th class="col-md-1 center" style="height : 21.5px;"><div class="TextFont">#</th>'
				+ '<th class="col-md-4 "  style="height: 21.5px;"><div class="TextFont">Dr.Dept Name</th>'
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Dr.Dept Id</th>'
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Unit Id</th>'
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Case Type</th>'
				+ '<th class="col-md-2 center"  style="height: 21.5px;"><div class="TextFont">Edit</th>'
				+ '<th class="col-md-2 center" 	style="height: 21.5px;"><div class="TextFont">Delete</th>'
				+ '</tr></thead>';
			
			for ( var i = 0; i < r.listPerMaster.length; i++) {
				htm = htm
				+ "<tr  id='trli"+(i + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (i+1)
				+ "</td>"
				+"<td class='col-md-4-1 ' id='drDeptName"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].drDeptName
				+ "</td><td col-md-1-1 center' id='drDeptId"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].drDeptId
				+ "</td>"
				
				+ "<td col-md-1-1 center' id='unitId"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].unitId
				+ "</td>"
				+ "<td col-md-1-1 center' id='caseType"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].caseType
				+ "</td>"
				
				+"<td class='col-md-2 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success' onclick='updateDrDeptPercentMaster("
				+ r.listPerMaster[i].drDeptId + ","+r.listPerMaster[i].unitId+","+r.listPerMaster[i].caseType
				+",\"D\"),fetchSuperCatPrcentMaster("+r.listPerMaster[i].chargesSlaveId+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-2 center' style='height: 21.5px;'><button class='btn btn-xs btn-success' onclick='deleteForDrDeps("
				+ r.listPerMaster[i].drDeptId + ","+r.listPerMaster[i].unitId+","+r.listPerMaster[i].caseType+")' ><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$("#popupDiv").html(htm);
		}
	});
}

/*******
 * @author    :IRFAN KHAN
 * @Date      :12-DEC-2017
 * @Code      :To fetch configured list of doctor personal
 * ******/
function fetchConfgDrPersonalList(callFrom,callSearch) {
   // $('#callfrom').val(callfrom);
	if (callFrom == "doctorPersonal") {
		$("#tabNo").val(2);
	} else if (callFrom == "doctorPersonalSponser") {
		$("#tabNo").val(3);
	}
	else if (callFrom == "groupPersonal") {
		$("#tabNo").val(4);
	}
	
	var letter="";
	if(callSearch == "search"){
	 letter= $("#byName2").val();
	}else{
		$("#byName2").val("");
	}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {"callFrom":callFrom,
			"callSearch":callSearch,
			"letter" : letter},
		url : "ehat/profees/fetchConfgDrPersonalList",
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r.listPerMaster.length);
			//ConfigurationChargesTemplate(response);
			var htm = "";
			
		    
			htm= '<thead id="popupheader">'
				+'<tr>'
				+ '<th class="col-md-1 center" style="height : 21.5px;"><div class="TextFont">#</th>'
				+ '<th class="col-md-3 "  style="height: 21.5px;"><div class="TextFont">Doctor Name</th>'
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Doctor Id</th>'
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">DrDept Id</th>'
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Sponser Name</th>'				
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Unit Id</th>'
				+ '<th class="col-md-1 center"  style="height: 21.5px;"><div class="TextFont">Case Type</th>'
				+ '<th class="col-md-2 center"  style="height: 21.5px;"><div class="TextFont">Edit</th>'
				+ '<th class="col-md-2 center" 	style="height: 21.5px;"><div class="TextFont">Delete</th>'
				+ '</tr></thead>';
			
			for ( var i = 0; i < r.listPerMaster.length; i++) {
				htm = htm
				+ "<tr  id='trli"+(i + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (i+1)
				+ "</td>"
				+"<td class='col-md-3-1 ' id='doctorName"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].doctorName
				+ "</td><td col-md-1-1 center' id='doctorId"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].doctorId
				+ "</td>"
				+ "<td col-md-1-1 center' id='drDeptId"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].drDeptId
				+ "</td>"
				
				+ "<td col-md-1-1 center' id='sponserName"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].sponserName
				+ "</td>"
				
				+ "<td col-md-1-1 center' id='unitId"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].unitId
				+ "</td>"
				+ "<td col-md-1-1 center' id='caseType"
				+ (i + 1)
				+ "' style='height: 21.5px;'>"
				+ r.listPerMaster[i].caseType
				+ "</td>"
				
				+"<td class='col-md-2 center'style='height: 21.5px;'>"
			/*	+ "<button class='btn btn-xs btn-success' onclick='editPercentMaster("
				+ r.listPerMaster[i].doctorId + ","+r.listPerMaster[i].unitId+","+r.listPerMaster[i].caseType
				+","+r.listPerMaster[i].drDeptId+"),fetchSuperCatPrcentMaster("+r.listPerMaster[i].chargesSlaveId+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"*/
				
				//updated Rohini on 09-02-2024
				+ "<button class='btn btn-xs btn-success' onclick=editPercentMasterNew("
				+ r.listPerMaster[i].doctorId + ","+r.listPerMaster[i].unitId+","+r.listPerMaster[i].caseType
				+","+r.listPerMaster[i].drDeptId+","+r.listPerMaster[i].chargesSlaveId+",'Edit'),fetchSuperCatPrcentMasterNew('Edit',"+r.listPerMaster[i].chargesSlaveId+")  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
			
				+"<td class='col-md-2 center' style='height: 21.5px;'><button class='btn btn-xs btn-success' onclick='deleteDoctAndGroup("
				+ r.listPerMaster[i].doctorId + ","+r.listPerMaster[i].unitId+","+r.listPerMaster[i].caseType+","+r.listPerMaster[i].chargesSlaveId+")' ><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$("#popupDiv").html(htm);
		}
	});
}

//@author : Irfan Khan @date: 11-Dec-2017 @reason : Autosuggestion for Group List
function setAutoSugForGroupList(inputId) {

	var letter = "";
	
	letter = $("#"+inputId).val();
	var inputs = [];

	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/setAutoSugForGroupList",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			setTempAutoSugGroupList(r, inputId);
		}
	});
}

//@author : Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search function
function setTempAutoSugGroupList(response, id) {
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
					name : 'Group Name',
					width : '100px',
					
					valueField : 'groupName'
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
						$('#'+id).val(ui.item.groupName);//set doctor name
						$('#groupId').val(ui.item.groupMasterId);//set doctor id
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
					console.log(data.listGroupMaster.length);
					var result;
					if (!data || data.listGroupMaster.length === 0
							|| !data.listGroupMaster
							|| data.listGroupMaster.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/* 'dn' : 'No', */
							'groupName' : 'No Record',
							//'Doctor_ID' : 'Found'
						/* 'depNm' : 'Match' */
						} ];
					} else {
						result = data.listGroupMaster;// Response List for
						// All
						// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

function profeesGroupWiseReport() {

	var	groupName = $("#byName").val();
	var	fromDate = $("#fromDate").val();
	var	toDate = $("#toDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var	groupId = $("#groupId").val();
	var	unitId = $("#unitId").val();
	var	deptId = $("#deptId").val();
	var	serviceId = $("#serviceId").val();

		if (groupName == "" || groupName == undefined) {
			alert("Please Type Group Name!");
			$("#byName").val("");
			SetFocus("byName");
			return false;
		} else if (groupId == 0 || groupId == "" || groupId == undefined) {
			alert("Group Name is not Valid, Please Select Group Name Form Suggestion List!");
			$("#byName").val("");
			SetFocus("byName");
			return false;
		} else if (fromDate == "" || fromDate == undefined) {
			alert("Please Select From Date!");
			$("#inputFromDate").val("");
			SetFocus("inputFromDate");
			return false;
		} else if (toDate == "" || toDate == undefined) {
			alert("Please Select From Date!");
			$("#inputToDate").val("");
			SetFocus("inputToDate");
			return false;
		}

	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('groupId=' + groupId);
	inputs.push('unitId=' + unitId);
	inputs.push('deptId=' + deptId);
	inputs.push('serviceId=' + serviceId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/profeesGroupWiseReport",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			//alert(r.listReceiptSlaveViewDto.length);
			var equalPercentAmount = 0;
			var individualPercentAmount = 0;
			var totalPercentAmount = 0;
			var htmBody = "";
			var htm = "<tr style='background-color: #EEEEEE'><th colspan='1' left>"
				//+ "SHRADDHA HOSPITAL<br>"
				+ "Group Wise Report<br>From  : <b>"
				+ fromDate
				+ "</b><br> To  : <b>"
				+ toDate
				+ "</b><br> Group Name  : <b>"
				+ groupName
				+ "</b></th></tr>";
				
				 htm=htm + "<tr style='background-color: #EEEEEE'><th>SR.NO</th><th class='col-md-1'>Doctor Name"
						+"</th><th class='col-md-1'>EqualPercentAmount"
						+"</th><th class='col-md-1'>IndividualPercentAmount"
						+"</th><th class='col-md-1'>TotalPercentAmount"
						+"</th></tr>";
				 
				 if(r.listReceiptSlaveViewDto.length == 0 ){
						
					 htmBody = htmBody 
						+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='17' class='center'>No Record Found...!!!</th></tr>";
						
				} else{
				//console.log(r);
				for ( var i = 0; i < r.listReceiptSlaveViewDto.length; i++) {
					htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1'>"+(i+1)
						+"<td class='col-md-1'>"+r.listReceiptSlaveViewDto[i].doctorName
						
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].equalDrAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].individualDrAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listReceiptSlaveViewDto[i].totalDrAmount.toFixed(2)
						
						+"</td>"
						+"</tr>";
					
					 
					 equalPercentAmount = equalPercentAmount + r.listReceiptSlaveViewDto[i].equalDrAmount;
					 individualPercentAmount = individualPercentAmount + r.listReceiptSlaveViewDto[i].individualDrAmount;
					 totalPercentAmount = totalPercentAmount + r.listReceiptSlaveViewDto[i].totalDrAmount;
					
				}
				}	
				 htmBody = htmBody
					+ "<tr ><td style='height: 11.5px;'></td></tr>";
				 htmBody = htmBody
					+ "<tr style = 'background-color:#EEEEEE;'><td colspan='1'></td><th class='center'>Total"
					+ "</th>"
					+ "</td><td class='col-md-1' align='right' >" + equalPercentAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + individualPercentAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + totalPercentAmount.toFixed(2)
					+ "</td></tr>";
				
			$("#tableTestVoucherListHead").html(htm);
			$("#tableTestVoucherList").html(htmBody);
		}
	});
}

function updateDrDeptPercentMaster(drDeptId, unitId, caseType, drDeptFlag) {
	
	var inputs = [];
	inputs.push("drDeptId=" + drDeptId);
	inputs.push("unitId=" + unitId);
	inputs.push("caseType=" + caseType);
	inputs.push("drDeptFlag=" + drDeptFlag);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/updateDrDeptPercentMaster",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			if (r.listPerMaster.length > 0)
				for ( var i = 0; i < r.listPerMaster.length; i++) {
					if (r.listPerMaster[i].serviceId == 0) {
						$("#thDeptPer_" + r.listPerMaster[i].deptId).val(
								r.listPerMaster[i].hospPercent);
						// doctorId = r.listPerMaster[i].doctorId;
						// doctorName = r.listPerMaster[i].doctorName;
						// unitId = r.listPerMaster[i].unitId;
						// caseType = r.listPerMaster[i].caseType;
					} else {
						$("#tdServicePer_" + r.listPerMaster[i].deptId+"_"+
										+ r.listPerMaster[i].serviceId).val(
												r.listPerMaster[i].hospPercent);
					}
				}
			$("#unitId").val(unitId);
			$("#doctorName").val("");
			$("#txtDoctorId").val(0);
			$("#drDeptId").val(drDeptId);
			$("#unitId").prop("disabled", "true");
			$("#drDeptId").prop("disabled", "true");
			$("#doctorName").prop("disabled", "true");
			$("#callFrom").val("update");
			if (caseType == 1) {
				$("#chkHospital").prop("checked", true);
				$("#chkPrivate").prop("disabled", true);
				$("#chkHospital").removeAttr("disabled");
				// $("#chkPrivate").prop("checked", false);
			} else {
				$("#chkPrivate").prop("checked", true);
				$("#chkHospital").prop("disabled", true);
				$("#chkPrivate").removeAttr("disabled");
			}
			chargesSlaveHideShow();
		}
	});
}

/*//Irfan khan 14-Dec-2017 All doctors summary report
function proFeesAllDocReport() {
	
	//var doctorName = $("#byName").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	var doctorId = $("#txtDoctorId").val();
	var unitId = $("#unitId").val();
	var deptId = $("#deptId").val();
	var serviceId = $("#serviceId").val();
	var drDeptId = $("#drDeptId").val();
	// serviceType = $("#txtSelectServiceReport").val();

	if (doctorId == null || doctorId == "" || doctorId == undefined) {
		doctorId = 0;
	}
	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorId=' + doctorId);
	inputs.push('unitId=' + unitId);
	inputs.push('deptId=' + deptId);
	inputs.push('serviceId=' + serviceId);
	inputs.push('drDeptId=' + drDeptId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/proFeesAllDocReport",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {

					var totalAmount = 0;
					var totalConcession = 0;
					var totalDiscount = 0;
					var totalPatPaid = 0;
					var totalActHospAmount = 0;
					var totalHospAmount = 0;
					var totalPfAmount = 0;
					var totalPfPaid = 0;
					var totalPfUnpaid = 0;
					var totalReduction = 0;
					var totalAddition = 0;
					
					
					
					var htmBody = "";
					var htm = "<tr style='background-color: #EEEEEE'><th colspan='3' left>"
							+ "NOBLE HOSPITAL"
							+ "<br>Doctors Summary<br>From  : <b>"
							+ fromDate
							+ "</b><br> To  : <b>"
							+ toDate
							+ "</b></th></tr>";

					htm = htm
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO</th><th class='col-md-1'>Unit Name"
							+ "</th><th class='col-md-1'>Unit Id"
							+ "</th><th class='col-md-1'>Dept Name"
							+ "</th><th class='col-md-1'>Dept Id"
							+ "</th><th class='col-md-1'>Doctor Name"
							+ "</th><th class='col-md-1'>Doctor Id"
							+ "</th><th class='col-md-1'>Amount"
							+ "</th><th class='col-md-1'>Concession"
							+ "</th><th class='col-md-1'>Discount"
							+ "</th><th class='col-md-1'>Pat-Paid"
							+ "</th><th class='col-md-1'>ActHospAmount"
							+ "</th><th class='col-md-1'>HospAmount"
							+ "</th><th class='col-md-1'>Pf.Amount"
							+ "</th><th class='col-md-1'>Pf.Paid"
							+ "</th><th class='col-md-1'>Pf.Unpaid"
							+ "</th><th class='col-md-1'>Reduction"
							+ "</th><th class='col-md-1'>Addition"

							+ "</th></tr>";

					if (r.listProFees.length == 0) {

						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='17' class='center'>No Record Found...!!!</th></tr>";

					} else {
						// console.log(r);
						for ( var i = 0; i < r.listProFees.length; i++) {
							htmBody = htmBody
									+ "<tr>"
									+ "<td class='col-md-1'>"
									+ (i + 1)
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].unitId
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].unitName
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].deptName
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].deptId
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].doctorName
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].doctorId
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].amount
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].concession
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].discount
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].paid.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].actHospAmount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].hospAmount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].pfAmount
											.toFixed(2)

									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].pfPaid
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].pfUnpaid
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].pfReduction
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].pfAddition
											.toFixed(2)

									+ "</td>" + "</tr>";

							
							totalConcession = totalConcession
									+ r.listProFees[i].concession;
							totalDiscount = totalDiscount
									+ r.listProFees[i].discount;
							totalAmount = totalAmount
									+ r.listProFees[i].amount;
							totalPfAmount = totalPfAmount
									+ r.listProFees[i].pfAmount;
							totalPatPaid = totalPatPaid
									+ r.listProFees[i].paid;
							totalReduction = totalReduction
									+ r.listProFees[i].pfReduction;
							totalAddition = totalAddition
									+ r.listProFees[i].pfAddition;
							totalPfPaid = totalPfPaid
									+ r.listProFees[i].pfPaid;
							totalPfUnpaid = totalPfUnpaid
									+ r.listProFees[i].pfUnpaid;
							totalHospAmount = totalHospAmount
									+ r.listProFees[i].hospAmount;
							totalActHospAmount = totalActHospAmount
							+ r.listProFees[i].actHospAmount;

						}
					}
					htmBody = htmBody
							+ "<tr ><td style='height: 11.5px;'></td></tr>";
					htmBody = htmBody
							+ "<tr style = 'background-color:#EEEEEE;'><td colspan='5'></td><th class='center'>Total"
							+ "</th><td class='col-md-1' align='right' >"
							+ "</td><td class='col-md-1' align='right' >"
							+ totalAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalConcession.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalDiscount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPatPaid.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalActHospAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalHospAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPfAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPfPaid.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPfUnpaid.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalReduction.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalAddition.toFixed(2) + "</td></tr>";

					$("#tableTestVoucherListHead").html(htm);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}*/
//irfan khan 22-feb-2018 to hide on default change pmaster
function chargesSlaveHideShow() {
	//alert("hell!!");
	var unitId = $("#unitId").val();
	if (unitId == 0) {
		// alert("hiurerer");
		
		$('#caseTypeDiv').hide();
		$('#chargesSlaveDiv').hide();
	} else {
		// alert("hiurerer");
		$('#caseTypeDiv').show();
		$('#chargesSlaveDiv').show();
		
	}
}

//Irfan khan 2-Jan-2018 Single doctors summary
function profeesSingleDocSummary() {

	var doctorName = $("#byName").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var doctorId = $("#txtDoctorId").val();

	if (doctorId == null || doctorId == "" || doctorId == undefined || doctorId == 0) {
		alert("Please Select Doctor!");
		SetFocus("byName");
		return false;
	} else if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorId=' + doctorId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/profeesSingleDocSummary",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			var htmBody = "";
			var htm = "<tr style='background-color: #EEEEEE'><th colspan='1' left>"
				//+ "SHRADDHA HOSPITAL"
				+ "Profees Doctor Summary<br>From  : <b>"
				+ fromDate
				+ "</b><br> To  : <b>"
				+ toDate
				+ "</b><br> Doctor Name  : <b>"
				+ doctorName
				+ "</b></th></tr>";
				
				 htm=htm + "<tr style='background-color: #EEEEEE'><th class='center'>SR.NO</th><th class='col-md-1'>Particular"
						+"</th><th class='col-md-1'>Total"
						+"</th><th class='col-md-1'>Concession"
						+"</th><th class='col-md-1'>Hospital Share"
						+"</th><th class='col-md-1'>Net"
						+"</th></tr>";
				 
				 if(r.listBillReceiptSlave.length == 0 && r.listBillDetailsIpd.length == 0){
						
					 htmBody = htmBody 
						+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='17' class='center'>No Record Found...!!!</th></tr>";
						
				} else{
						var counter=1;
						//OPD Cash
						htmBody=htmBody+"<tr>" 
							+"<td class='col-md-1 center'>"+(counter++)
							+"<td class='col-md-1'>OPD-Cash"
							+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlave[0].sumAmount + r.listOBDForOpdCash[0].sumAmount + r.listOBDForOpdMediclaimCash[0].sumAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlave[0].sumConcession + r.listBillReceiptSlave[0].actualDiscAmt + r.listBillReceiptSlave[0].refundAmt
									+ r.listOBDForOpdCash[0].sumConcession + r.listOBDForOpdCash[0].discount + r.listOBDForOpdCash[0].refund
									+r.listOBDForOpdMediclaimCash[0].sumConcession + r.listOBDForOpdMediclaimCash[0].discount + r.listOBDForOpdMediclaimCash[0].refund).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlave[0].sumHospAmount + r.listOBDForOpdCash[0].sumHospAmount + r.listOBDForOpdMediclaimCash[0].sumHospAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlave[0].sumNet + r.listOBDForOpdCash[0].sumNet + r.listOBDForOpdMediclaimCash[0].sumNet).toFixed(2)
							+"</td>"
							+"</tr>";
						
						
						
						//OPD Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>OPD-Credit"
						+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveCredit[0].sumAmount + r.listOBDForOpdCredit[0].sumAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveCredit[0].sumConcession + r.listBillReceiptSlaveCredit[0].actualDiscAmt + r.listBillReceiptSlaveCredit[0].refundAmt
								+ r.listOBDForOpdCredit[0].sumConcession + r.listOBDForOpdCredit[0].discount + r.listOBDForOpdCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveCredit[0].sumHospAmount + r.listOBDForOpdCredit[0].sumHospAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveCredit[0].sumNet + r.listOBDForOpdCredit[0].sumNet).toFixed(2)
						+"</td>"
						+"</tr>";
						
												
						//OPD Mediclaim Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>OPD-Mediclaim-Credit"
						+"</td><td class='col-md-1' align='right'>"+(r.listBillOpdMediclaimCredit[0].sumAmount + r.listOBDForOpdMediclaimCredit[0].sumAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillOpdMediclaimCredit[0].sumConcession + r.listBillOpdMediclaimCredit[0].actualDiscAmt + r.listBillOpdMediclaimCredit[0].refundAmt
								+ r.listOBDForOpdMediclaimCredit[0].sumConcession + r.listOBDForOpdMediclaimCredit[0].discount + r.listOBDForOpdMediclaimCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillOpdMediclaimCredit[0].sumHospAmount + r.listOBDForOpdMediclaimCredit[0].sumHospAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillOpdMediclaimCredit[0].sumNet + r.listOBDForOpdMediclaimCredit[0].sumNet).toFixed(2)
						+"</td>"
						+"</tr>";
						
																		
						//IPD Cash
						htmBody=htmBody+"<tr>" 
							+"<td class='col-md-1 center'>"+(counter++)
							+"<td class='col-md-1'>IPD-Cash"
							
							+"</td><td class='col-md-1' align='right'>"+(r.listBillDetailsIpd[0].sumAmount + r.listBillIpdMediclaimCash[0].sumAmount
									+ r.listOBDForIpdCash[0].sumAmount + r.listOBDForIpdMediclaimCash[0].sumAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listBillDetailsIpd[0].sumConcession + r.listBillDetailsIpd[0].discount //+ r.listBillDetailsIpd[0].refund
									+ r.listBillIpdMediclaimCash[0].sumConcession + r.listBillIpdMediclaimCash[0].discount
									+r.listOBDForIpdCash[0].sumConcession + r.listOBDForIpdCash[0].discount //+ r.listOBDForIpdCash[0].refund
									+ r.listOBDForIpdMediclaimCash[0].sumConcession + r.listOBDForIpdMediclaimCash[0].discount).toFixed(2) //+ r.listBillIpdMediclaimCash[0].refund).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listBillDetailsIpd[0].sumHospAmount + r.listBillIpdMediclaimCash[0].sumHospAmount
									+ r.listOBDForIpdCash[0].sumHospAmount + r.listOBDForIpdMediclaimCash[0].sumHospAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listBillDetailsIpd[0].sumNet+ r.listBillIpdMediclaimCash[0].sumNet
									+ r.listOBDForIpdCash[0].sumNet + r.listOBDForIpdMediclaimCash[0].sumNet).toFixed(2)
							
							+"</td>"
							+"</tr>";
						
						//IPD Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>IPD-Credit"
						
						+"</td><td class='col-md-1' align='right'>"+(r.listBillDetailsIpdCredit[0].sumAmount + r.listOBDForIpdCredit[0].sumAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillDetailsIpdCredit[0].sumConcession + r.listBillDetailsIpdCredit[0].discount
								+ r.listOBDForIpdCredit[0].sumConcession + r.listOBDForIpdCredit[0].discount).toFixed(2) //+ r.listBillDetailsIpdCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillDetailsIpdCredit[0].sumHospAmount + r.listOBDForIpdCredit[0].sumHospAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillDetailsIpdCredit[0].sumNet + r.listOBDForIpdCredit[0].sumNet).toFixed(2)
						
						+"</td>"
						+"</tr>";
						
						//IPD Mediclaim Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>IPD-Mediclaim-Credit"
						+"</td><td class='col-md-1' align='right'>"+(r.listBillIpdMediclaimCredit[0].sumAmount + r.listOBDForIpdMediclaimCredit[0].sumAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillIpdMediclaimCredit[0].sumConcession + r.listBillIpdMediclaimCredit[0].discount
								+ r.listOBDForIpdMediclaimCredit[0].sumConcession + r.listOBDForIpdMediclaimCredit[0].discount).toFixed(2) //+ r.listBillIpdMediclaimCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillIpdMediclaimCredit[0].sumHospAmount + r.listOBDForIpdMediclaimCredit[0].sumHospAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillIpdMediclaimCredit[0].sumNet + r.listOBDForIpdMediclaimCredit[0].sumNet).toFixed(2)
						+"</td>"
						+"</tr>";
						
						//Diago cash
						htmBody=htmBody+"<tr>" 
							+"<td class='col-md-1 center'>"+(counter++)
							+"<td class='col-md-1'>Diagnostic-Cash"
							
							+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveDiago[0].sumAmount
									+ r.listOBDForDiagoCash[0].sumAmount + r.listOBDForDiagoMediclaimCash[0].sumAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveDiago[0].sumConcession + r.listBillReceiptSlaveDiago[0].actualDiscAmt + r.listBillReceiptSlaveDiago[0].refundAmt
									+ r.listOBDForDiagoCash[0].sumConcession + r.listOBDForDiagoCash[0].discount + r.listOBDForDiagoCash[0].refund
									+ r.listOBDForDiagoMediclaimCash[0].sumConcession + r.listOBDForDiagoMediclaimCash[0].discount + r.listOBDForDiagoMediclaimCash[0].refund).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveDiago[0].sumHospAmount
									+ r.listOBDForDiagoCash[0].sumHospAmount + r.listOBDForDiagoMediclaimCash[0].sumHospAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveDiago[0].sumNet
									+ r.listOBDForDiagoCash[0].sumNet + r.listOBDForDiagoMediclaimCash[0].sumNet).toFixed(2)
							
							+"</td>"
							+"</tr>";
						
						//Diago Credit	
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>Diagnostic-Credit"
						
						+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveDiagoCredit[0].sumAmount + r.listOBDForDiagoCredit[0].sumAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveDiagoCredit[0].sumConcession + r.listBillReceiptSlaveDiagoCredit[0].actualDiscAmt + r.listBillReceiptSlaveDiagoCredit[0].refundAmt
								+ r.listOBDForDiagoCredit[0].sumConcession + r.listOBDForDiagoCredit[0].discount + r.listOBDForDiagoCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveDiagoCredit[0].sumHospAmount + r.listOBDForDiagoCredit[0].sumHospAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillReceiptSlaveDiagoCredit[0].sumNet + r.listOBDForDiagoCredit[0].sumNet).toFixed(2)
						
						+"</td>"
						+"</tr>";
						
						//Diago Mediclaim Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>Diago-Mediclaim-Credit"
						+"</td><td class='col-md-1' align='right'>"+(r.listBillDiagoMediclaimCredit[0].sumAmount + r.listOBDForDiagoMediclaimCredit[0].sumAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillDiagoMediclaimCredit[0].sumConcession + r.listBillDiagoMediclaimCredit[0].actualDiscAmt + r.listBillDiagoMediclaimCredit[0].refundAmt
								+ r.listOBDForDiagoMediclaimCredit[0].sumConcession + r.listOBDForDiagoMediclaimCredit[0].discount + r.listOBDForDiagoMediclaimCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillDiagoMediclaimCredit[0].sumHospAmount + r.listOBDForDiagoMediclaimCredit[0].sumHospAmount).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listBillDiagoMediclaimCredit[0].sumNet + r.listOBDForDiagoMediclaimCredit[0].sumNet).toFixed(2)
						+"</td>"
						+"</tr>";
												
						//---------Package start-------------
						/*//Package OPD Cash
						htmBody=htmBody+"<tr>" 
							+"<td class='col-md-1 center'>"+(counter++)
							+"<td class='col-md-1'>Package OPD-Cash"
							
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForOpdCash[0].sumAmount + r.listOBDForOpdMediclaimCash[0].sumAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForOpdCash[0].sumConcession + r.listOBDForOpdCash[0].discount + r.listOBDForOpdCash[0].refund
									+r.listOBDForOpdMediclaimCash[0].sumConcession + r.listOBDForOpdMediclaimCash[0].discount + r.listOBDForOpdMediclaimCash[0].refund).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForOpdCash[0].sumHospAmount + r.listOBDForOpdMediclaimCash[0].sumHospAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForOpdCash[0].sumNet + r.listOBDForOpdMediclaimCash[0].sumNet).toFixed(2)
							
							+"</td>"
							+"</tr>";*/
						
						/*//Package OPD Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>Package OPD-Credit"
						
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForOpdCredit[0].sumAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listOBDForOpdCredit[0].sumConcession + r.listOBDForOpdCredit[0].discount + r.listOBDForOpdCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForOpdCredit[0].sumHospAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForOpdCredit[0].sumNet.toFixed(2)
						
						+"</td>"
						+"</tr>";*/
						
						/*//Package OPD Mediclaim Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>Package OPD-Mediclaim-Credit"
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForOpdMediclaimCredit[0].sumAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listOBDForOpdMediclaimCredit[0].sumConcession + r.listOBDForOpdMediclaimCredit[0].discount + r.listOBDForOpdMediclaimCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForOpdMediclaimCredit[0].sumHospAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForOpdMediclaimCredit[0].sumNet.toFixed(2)
						+"</td>"
						+"</tr>";*/
												
						/*//Package IPD Cash
						htmBody=htmBody+"<tr>" 
							+"<td class='col-md-1 center'>"+(counter++)
							+"<td class='col-md-1'>Package IPD-Cash"
							
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForIpdCash[0].sumAmount + r.listOBDForIpdMediclaimCash[0].sumAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForIpdCash[0].sumConcession + r.listOBDForIpdCash[0].discount //+ r.listOBDForIpdCash[0].refund
									+ r.listOBDForIpdMediclaimCash[0].sumConcession + r.listOBDForIpdMediclaimCash[0].discount ).toFixed(2)//+ r.listOBDForIpdMediclaimCash[0].refund).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForIpdCash[0].sumHospAmount + r.listOBDForIpdMediclaimCash[0].sumHospAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForIpdCash[0].sumNet + r.listOBDForIpdMediclaimCash[0].sumNet).toFixed(2)
							
							+"</td>"
							+"</tr>";*/
						
						/*//Package IPD Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>Package IPD-Credit"
						
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForIpdCredit[0].sumAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listOBDForIpdCredit[0].sumConcession + r.listOBDForIpdCredit[0].discount).toFixed(2)// + r.listOBDForIpdCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForIpdCredit[0].sumHospAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForIpdCredit[0].sumNet.toFixed(2)
						
						+"</td>"
						+"</tr>";*/
						 
						/*//Package IPD Mediclaim Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>Package-IPD-Mediclaim-Credit"
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForIpdMediclaimCredit[0].sumAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listOBDForIpdMediclaimCredit[0].sumConcession + r.listOBDForIpdMediclaimCredit[0].discount).toFixed(2)// + r.listOBDForIpdMediclaimCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForIpdMediclaimCredit[0].sumHospAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForIpdMediclaimCredit[0].sumNet.toFixed(2)
						+"</td>"
						+"</tr>";*/
												
						/*//Package Diago Cash
						htmBody=htmBody+"<tr>" 
							+"<td class='col-md-1 center'>"+(counter++)
							+"<td class='col-md-1'>Package Diagnostic-Cash"
							
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForDiagoCash[0].sumAmount + r.listOBDForDiagoMediclaimCash[0].sumAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForDiagoCash[0].sumConcession + r.listOBDForDiagoCash[0].discount + r.listOBDForDiagoCash[0].refund
									+ r.listOBDForDiagoMediclaimCash[0].sumConcession + r.listOBDForDiagoMediclaimCash[0].discount + r.listOBDForDiagoMediclaimCash[0].refund).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForDiagoCash[0].sumHospAmount + r.listOBDForDiagoMediclaimCash[0].sumHospAmount).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listOBDForDiagoCash[0].sumNet + r.listOBDForDiagoMediclaimCash[0].sumNet).toFixed(2)
							
							+"</td>"
							+"</tr>";*/
						
						/*//Package Diago Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>Package Diagnostic-Credit"
						
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForDiagoCredit[0].sumAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listOBDForDiagoCredit[0].sumConcession + r.listOBDForDiagoCredit[0].discount + r.listOBDForDiagoCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForDiagoCredit[0].sumHospAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForDiagoCredit[0].sumNet.toFixed(2)
						
						+"</td>"
						+"</tr>";*/
						 
						/*//Package Diago Mediclaim Credit
						htmBody=htmBody+"<tr>" 
						+"<td class='col-md-1 center'>"+(counter++)
						+"<td class='col-md-1'>Package-Diago-Mediclaim-Credit"
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForDiagoMediclaimCredit[0].sumAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+(r.listOBDForDiagoMediclaimCredit[0].sumConcession + r.listOBDForDiagoMediclaimCredit[0].discount + r.listOBDForDiagoMediclaimCredit[0].refund).toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForDiagoMediclaimCredit[0].sumHospAmount.toFixed(2)
						+"</td><td class='col-md-1' align='right'>"+r.listOBDForDiagoMediclaimCredit[0].sumNet.toFixed(2)
						+"</td>"
						+"</tr>";*/
												
						//---------Package End---------------
						//Group Cash
						for(var i=0;i < r.listGroupReceiptSlave.length;i++){
							htmBody=htmBody+"<tr>" 
							+"<td class='col-md-1 center'>"+(counter++)
							+"<td class='col-md-1'>Group Cash-"+r.listGroupReceiptSlave[i].groupName
							
							+"</td><td class='col-md-1' align='right'>"+r.listGroupReceiptSlave[i].sumAmount.toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listGroupReceiptSlave[i].sumConcession + r.listGroupReceiptSlave[i].discount + r.listGroupReceiptSlave[i].refundAmt).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+r.listGroupReceiptSlave[i].sumHospAmount.toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+r.listGroupReceiptSlave[i].sumNet.toFixed(2)
							
							+"</td>"
							+"</tr>";
						}
						//Group Credit
						for(var i=0;i < r.listGroupReceiptSlaveCredit.length;i++){
							htmBody=htmBody+"<tr>" 
							+"<td class='col-md-1 center'>"+(counter++)
							+"<td class='col-md-1'>Group Credit-"+r.listGroupReceiptSlaveCredit[i].groupName
							
							+"</td><td class='col-md-1' align='right'>"+r.listGroupReceiptSlaveCredit[i].sumAmount.toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listGroupReceiptSlaveCredit[i].sumConcession + r.listGroupReceiptSlaveCredit[i].discount + r.listGroupReceiptSlaveCredit[i].refundAmt).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+r.listGroupReceiptSlaveCredit[i].sumHospAmount.toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+r.listGroupReceiptSlaveCredit[i].sumNet.toFixed(2)
							
							+"</td>"
							+"</tr>";
						}
						
						//Group Mediclaim Credit
						for(var i=0;i < r.listGroupReceiptSlaveCredit.length;i++){
							htmBody=htmBody+"<tr>" 
							+"<td class='col-md-1 center'>"+(counter++)
							+"<td class='col-md-1'>Group Credit-"+r.listGroupMediclaimCredit[i].groupName
							
							+"</td><td class='col-md-1' align='right'>"+r.listGroupMediclaimCredit[i].sumAmount.toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+(r.listGroupMediclaimCredit[i].sumConcession + r.listGroupMediclaimCredit[i].discount + r.listGroupMediclaimCredit[i].refundAmt).toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+r.listGroupMediclaimCredit[i].sumHospAmount.toFixed(2)
							+"</td><td class='col-md-1' align='right'>"+r.listGroupMediclaimCredit[i].sumNet.toFixed(2)
							
							+"</td>"
							+"</tr>";
							
						}
					
				}	
				 var fixedIncome = parseFloat(r.fixedIncome);
				 var payable = 0.0;
				 var difference = r.totalSumNet - fixedIncome;
				 if(r.totalSumNet > fixedIncome){
					 payable = r.totalSumNet;
				 }else{
					 payable = fixedIncome;
				 }
				 htmBody = htmBody
					
					+ "<tr ><td style='height: 11.5px;'></td></tr>"
					+ "<tr style = 'background-color:#EEEEEE;'><td colspan='1'></td>"
					+ "<th class='center'>Total</th>"
					+ "</td><td class='col-md-1' align='right' >" + r.totalSumAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + r.totalSumConcession.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + r.totalSumHospAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >" + r.totalSumNet.toFixed(2)
					+ "</td></tr>"
					
					+ "<tr><td colspan='4'></td>"
					+ "<td class='col-md-1 center' style = 'background-color:#EEEEEE;' ><b>Fixed Income</b></td>"
					+ "<td class='col-md-1' align='right' style = 'background-color:#EEEEEE;' >"+fixedIncome.toFixed(2)
					+ "</td></tr>"
					+ "<tr ><td colspan='4'></td>"
					+ "<td class='col-md-1 center' style = 'background-color:#EEEEEE;' ><b>Difference</b></td>"
					+ "<td class='col-md-1' align='right' style = 'background-color:#EEEEEE;'>"+difference.toFixed(2)
					+ "</td></tr>"
					+ "<tr ><td colspan='4'></td>"
					+ "<td class='col-md-1 center' style = 'background-color:#EEEEEE;' ><b>Payable</b></td>"
					+ "<td class='col-md-1' align='right' style = 'background-color:#EEEEEE;' >"+payable.toFixed(2)
					+ "</td></tr>";
					
				
			$("#tableTestVoucherListHead").html(htm);
			$("#tableTestVoucherList").html(htmBody);
		
		}
	});
}

//Irfan khan @8-Jan-2018 to add doctor in list
function addDocInListDynamic() {
	var doctorId = $("#txtDoctorId").val();
	var doctorName = $("#doctorName").val();
	var personalPercent = parseFloat($("#personalPercent").val());
	var distributePercent = parseFloat($("#distributePercent").val());
	var fromDistAmtPercent = parseFloat($("#fromDistAmtPercent").val());
	var trCnt = $('#addDoctorTbody tr').length;
	var valueDoc = 0;

	if (doctorId == 0 || doctorId == "" || doctorId == null
			|| doctorId == undefined) {
		alert("Select doctor!!!");
		return false;
	}
	if (doctorName == "" || doctorName == null || doctorName == undefined) {
		alert("Select doctor!!!");
		return false;
	}
	//to wheather doctor is already in another group?
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"doctorId" : doctorId			
		},
		url : "ehat/profees/checkDynamicDocAvailability",

		success : function(r) {
			valueDoc = r;
			
		}
	});
	if(valueDoc > 0){
		alert("doctor is already present in another group.");
		$("#txtDoctorId").val(0);
		$("#doctorName").val("");
		return false;
	}
	
	
	if (personalPercent == "" || personalPercent == null
			|| personalPercent == undefined) {
		alert("Insert personal percent!!!");
		return false;
	}
	if (distributePercent == "" || distributePercent == null
			|| distributePercent == undefined) {
		alert("Insert distribute percent!!!");
		return false;
	}
	if (fromDistAmtPercent == "" || fromDistAmtPercent == null
			|| fromDistAmtPercent == undefined) {
		alert("Insert from Dist Amt Percent!!!");
		return false;
	}
	if((personalPercent + distributePercent) != 100){
		alert("Addition of personal & distrubte should be 100%!!!");
		return false;
	}
	for(var i=1;i<=trCnt;i++){
		//alert("DoctorId=="+doctorId+"   tdocId=="+$("#doctorId"+i).text());
		var tDocId = parseInt($("#tdDoctorId"+i).text());
		if(doctorId == tDocId){
			alert("Already exist!!!");
			return false;
		}
	}
	trCnt++;
	$("#addDoctorTbody")
			.append("<tr id='tr" + trCnt + "'>"
					+ "<td id='tdSrno"+trCnt+"' class='col-md-1'>"+trCnt+"</td>"
					+ "<td id='tdDoctorId"+trCnt+"' class='col-md-1'>"+doctorId+"</td>"
					+ "<td id='tdDoctorName"+trCnt+"' class='col-md-2'>"+doctorName+"</td>"
					+ "<td id='tdPersonalPercent"+trCnt+"' class='col-md-2'>"+personalPercent+"</td>"
					+ "<td id='tdDistributePercent"+trCnt+"' class='col-md-2'>"+distributePercent+"</td>"
					+ "<td id='tdFromDistAmtPercent"+trCnt+"' class='col-md-2'>"+fromDistAmtPercent+"</td>"
					+ "<td class='col-md-2'><button type='button' class='btn btn-xs btn-danger'"
					+ " onclick=removeDoctorDynamic('"+trCnt+"')><i class='fa fa-trash-o'></i></button></td>"
					+ "</tr>");
	
	$("#txtDoctorId").val(0);
	$("#doctorName").val("");
	$("#personalPercent").val(0);
	$("#distributePercent").val(0);
	$("#fromDistAmtPercent").val(0);
}

//Irfan khan @9-Jan-2018 to save dynamic group details
function saveDynamicGroupDetails() {
	var groupId = $("#groupId").val();
	var groupName = $("#groupName").val();
	var trCnt = $('#addDoctorTbody tr').length;
	var callFrom = $("#callFrom").val();

	if(groupName == "" || groupName == null || groupName == undefined){
		alert("Enter Group Name!!!");
		SetFocus("groupName");
		return false;
	}
	
	var groupMasterDetails = {
			listDynamicGroupMaster : []
	};
	
	groupMasterDetails.listDynamicGroupMaster.push({
		dMasterId : groupId,
		dGroupName : groupName

	});
	
	var groupSlaveDetails = {
			listDynamicGroupSlave : []
	};

	var totalDocPer = 0.0;
	for ( var i = 1; i <= trCnt; i++) {
		var doctorId = $("#tdDoctorId" + i).text();
		var doctorName = $("#tdDoctorName" + i).text();
		var personalPercent = parseFloat($("#tdPersonalPercent" + i).text());
		var distributePercent = parseFloat($("#tdDistributePercent" + i).text());
		var fromDistAmtPercent = parseFloat($("#tdFromDistAmtPercent" + i).text());
		totalDocPer = totalDocPer + fromDistAmtPercent;
		groupSlaveDetails.listDynamicGroupSlave.push({
			doctorId : doctorId,
			doctorName : doctorName,
			personalPercent : personalPercent,
			distributePercent : distributePercent,
			fromDistAmtPercent : fromDistAmtPercent

		});
	}
	//alert(individualPercent +"=="+totalDocPer);
	if(totalDocPer != 100){
		alert("Total of From Dist Amt % is not equal 100 %");
		SetFocus("fromDistAmtPercent");
		return false;
	}
	groupSlaveDetails = JSON.stringify(groupSlaveDetails);
	groupMasterDetails = JSON.stringify(groupMasterDetails);

	var inputs = [];

	inputs.push("groupSlaveDetails=" + encodeURIComponent(groupSlaveDetails));
	inputs.push("groupMasterDetails=" + encodeURIComponent(groupMasterDetails));
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/saveDynamicGroupDetails",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			//fetchGroupMasterList("save")
			//$("#callFrom").val("insert");			
			resetGroupMaster();
			fetchDynamicGroupMasterList("onload");
			//proFeesDoctorPayment();
		}
	});
}

//Irfan khan @10-Jan-2018 to fetch dynamic group details
function fetchDynamicGroupMasterList(callFrom){
	var letter="";
	if(callFrom == "search"){
	 letter= $("#byName4").val();
	}else{
		$("#byName4").val("");
	}	
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callFrom" : callFrom,
			"letter" : letter
		},
		url : "ehat/profees/fetchDynamicGroupMasterList",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r.listGroupMaster.length);
			var htm="";
			for ( var i = 0; i < r.listDynamicGroupMaster.length; i++) {
				htm = htm + "<tr>"
				+"<td class='col-md-1'>"+(i+1)
				+"</td><td class='col-md-1' id='tdGroupId"+r.listDynamicGroupMaster[i].dMasterId+"'>"+r.listDynamicGroupMaster[i].dMasterId
				+"</td><td class='col-md-6' id='tdGroupName"+r.listDynamicGroupMaster[i].dMasterId+"'>"+r.listDynamicGroupMaster[i].dGroupName
				//+"</td><td class='col-md-2' id='tdEqualPercent"+r.listGroupMaster[i].groupMasterId+"'>"+r.listGroupMaster[i].equalPercent
				//+"</td><td class='col-md-2' id='tdIndividualPercent"+r.listGroupMaster[i].groupMasterId+"'>"+r.listGroupMaster[i].individualPercent
				+"</td><td class='col-md-4'><button type='button' class='btn btn-xs btn-success'"
				+" onclick=editDynamicGroupMaster('"+r.listDynamicGroupMaster[i].dMasterId+"')><i class='fa fa-edit'></i></button>"
				+"</td><td class='col-md-4'><button type='button' class='btn btn-xs btn-danger'"
				+" onclick=deleteDynamicGroupMaster('"+r.listDynamicGroupMaster[i].dMasterId+"')><i class='fa fa-trash-o'></i></button>"
				+"</td></tr>";
			}
			$("#fetchGroupListBody").html(htm);
		}
	});
}

//This function added by kishor for dynamic search for all tabs in Percentage master.
function dynamicSearch(call){
	var tabNo = parseInt($("#tabNo").val());
	if(tabNo == 1){
		fetchConfgDrDeptList(call);
	}else if(tabNo == 2){
		
		fetchConfgDrPersonalList("doctorPersonal", call);
	}else if(tabNo == 3){
		
		fetchConfgDrPersonalList("doctorPersonalSponser", call);
	}
	else if(tabNo == 4){
		
		fetchConfgDrPersonalList("groupPersonal", call);
	}
}

function deleteForDrDeps(drDeptId,unitId,caseType){
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Temp Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/profees/deleteForDrDeps",
			data : {
				"drDeptId" : drDeptId,
				"unitId" : unitId,
				"caseType" : caseType
			},
			error	: function() {
				alert('error');
			},
			success : function(response) {
				//alertify.error(response);
				fetchConfgDrDeptList("auto");
			}
		});
	}
}

function deleteDoctAndGroup(docId,unitId,caseType,chargesSlaveId){
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Temp Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			//url : "ehat/profees/deleteDoctAndGroup",
			url : "ehat/profees/deleteDoctAndGroupById",
			data : {
				"docId" : docId,
				"unitId" : unitId,
				"caseType" : caseType,
				"chargesSlaveId" : chargesSlaveId
			},
			error	: function() {
				alert('error');
			},
			success : function(response) {
				//alertify.error(response);
				fetchConfgDrPersonalList("doctorPersonal","auto");
			}
		});
	}
}

function deleteDynamicGroupMaster(dMasterId){
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Temp Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/profees/deleteDynamicGroupMaster",
			data : {
				"dMasterId" : dMasterId
			},
			error	: function() {
				alert('error');
			},
			success : function(response) {
				//alertify.error(response);
				fetchDynamicGroupMasterList("onload");
			}
		});
	}
}


function editDynamicGroupMaster(gId){
	var tdGroupName = $("#tdGroupName"+gId).text();
	//var tdEqualPercent = parseFloat($("#tdEqualPercent"+gId).text());
	//var tdIndividualPercent = parseFloat($("#tdIndividualPercent"+gId).text());
	
	$("#groupId").val(gId);
	$("#groupName").val(tdGroupName);
	//$("#equalPercent").val(tdEqualPercent);
	//$("#individualPercent").val(tdIndividualPercent);
	
	var inputs = [];

	inputs.push('groupId=' + gId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/editDynamicGroupMaster",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {			
		
			var htm="";
			for ( var i = 0; i < r.listDynamicGroupSlave.length; i++) {
				var trCnt= i+1;
				//alert(r.listDynamicGroupSlave.distributePercent);
				htm = htm + "<tr id='tr" + trCnt + "'>"
				+ "<td id='tdSrno"+trCnt+"' class='col-md-1'>"+trCnt+"</td>"
				+ "<td id='tdDoctorId"+trCnt+"' class='col-md-1'>"+r.listDynamicGroupSlave[i].dMasterId+"</td>"
				+ "<td id='tdDoctorName"+trCnt+"' class='col-md-2'>"+r.listDynamicGroupSlave[i].doctorName+"</td>"
				+ "<td id='tdPersonalPercent"+trCnt+"' class='col-md-2'>"+r.listDynamicGroupSlave[i].personalPercent+"</td>"
				+ "<td id='tdDistributePercent"+trCnt+"' class='col-md-2'>"+r.listDynamicGroupSlave[i].distributePercent+"</td>"
				+ "<td id='tdFromDistAmtPercent"+trCnt+"' class='col-md-2'>"+r.listDynamicGroupSlave[i].fromDistAmtPercent+"</td>"
				+ "<td class='col-md-2'><button type='button' class='btn btn-xs btn-danger'"
				+ " onclick=removeDoctorDynamic('"+trCnt+"')><i class='fa fa-trash-o'></i></button></td>"
				+ "</tr>";
			}
			$("#addDoctorTbody").html(htm);
			$("#callFrom").val("update");
		}
	});
}

function removeDoctorDynamic(id){
	
	var len = $("#addDoctorTbody tr").length;
	$("#tkb").empty();
	for(var i =1; i<=len;i++){
		//var tdSrno = $("#tdSrno"+i).text();
		var doctorId = $("#tdDoctorId"+i).text();
		var doctorName  = $("#tdDoctorName"+i).text() ;
		var personalPercent  = $("#tdPersonalPercent"+i).text();
		var distributePercent = $("#tdDistributePercent"+i).text();
		var fromDistAmtPercent = $("#tdFromDistAmtPercent"+i).text();
			
		
		if(i!=id){
			var trCnt = $("#tkb tr").length;
			trCnt++;
			$("#tkb").append("<tr id='tr" + trCnt + "'>"
					+ "<td id='tdSrno"+trCnt+"' class='col-md-1'>"+trCnt+"</td>"
					+ "<td id='tdDoctorId"+trCnt+"' class='col-md-1'>"+doctorId+"</td>"
					+ "<td id='tdDoctorName"+trCnt+"' class='col-md-2'>"+doctorName+"</td>"
					+ "<td id='tdPersonalPercent"+trCnt+"' class='col-md-2'>"+personalPercent+"</td>"
					+ "<td id='tdDistributePercent"+trCnt+"' class='col-md-2'>"+distributePercent+"</td>"
					+ "<td id='tdFromDistAmtPercent"+trCnt+"' class='col-md-2'>"+fromDistAmtPercent+"</td>"
					+ "<td class='col-md-2'><button type='button' class='btn btn-xs btn-danger'"
					+ " onclick=removeDoctorDynamic('"+trCnt+"')><i class='fa fa-trash-o'></i></button></td>"
					+ "</tr>");
			//$("#tkb").append(htm2);

		}		
	}
	
	$("#tr"+id).remove();
	var set1 = $("#tkb").html();
	$("#addDoctorTbody").empty();
	$("#addDoctorTbody").html(set1);
	
}

function removeDoctorForGroupMaster(id){
	var len = $("#addDoctorTbody tr").length;
	$("#tkbG").empty();
	for(var i =1; i<=len;i++){
		//var tdSrno = $("#tdSrno"+i).text();
		var doctorId = $("#tdDoctorId"+i).text();
		var doctorName  = $("#tdDoctorName"+i).text() ;
		var doctorPercent  = $("#tdDoctorPercent"+i).text();
		//var distributePercent = $("#tdDistributePercent"+i).text();
		//var fromDistAmtPercent = $("#tdFromDistAmtPercent"+i).text();
			
		
		if(i!=id){
			var trCnt = $("#tkbG tr").length;
			trCnt++;
			$("#tkbG").append("<tr id='tr" + trCnt + "'>"
					+ "<td id='tdSrno"+trCnt+"' class='col-md-1'>"+trCnt+"</td>"
					+ "<td id='tdDoctorId"+trCnt+"' class='col-md-1'>"+doctorId+"</td>"
					+ "<td id='tdDoctorName"+trCnt+"' class='col-md-6'>"+doctorName+"</td>"
					+ "<td id='tdDoctorPercent"+trCnt+"' contenteditable class='col-md-2'>"+doctorPercent+"</td>"
					+ "<td class='col-md-2'><button type='button' class='btn btn-xs btn-danger'"
					+ " onclick=removeDoctorForGroupMaster('"+trCnt+"')><i class='fa fa-trash-o'></i></button></td>"
					+ "</tr>");
			//$("#tkb").append(htm2);

		}		
	}
	
	$("#tr"+id).remove();
	var set1 = $("#tkbG").html();
	$("#addDoctorTbody").empty();
	$("#addDoctorTbody").html(set1);
}

//@author : Irfan Khan @date: 15-Feb-2018 @reason : Autosuggestion for doctor
//one function for all doctor auto suggesstion
function fetchDoctorListAutoSug(inputId, callFrom) {

	//alert(callFrom);
	var letter = $("#"+inputId).val();
	var specialisationId = 0;

	var inputs = [];

	inputs.push('letter=' + letter);
	inputs.push('callFrom=' + callFrom);
	inputs.push('specialisationId=' + specialisationId);
	//inputs.push('unitId=' + unitId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/fetchDoctorListAutoSug",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			//alert(r.lstDoctorDto.length);
			setTempFetchDoctorListAutoSug(r, inputId,callFrom);
		}
	});
}

//@author : Irfan Khan @date: 15-Feb-2018 @reason :Set temp Autosuggestion and search function
function setTempFetchDoctorListAutoSug(response, id,callFrom) {
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
				} */],

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
						$('#txtDoctorId').val(ui.item.doctor_ID);//set doctor id
						$('#drDeptId').val(ui.item.specialisation);//set specialisation
						
					}
					fetchDoctorListAutoSug(id,callFrom);
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

//Irfan khan 29-Mar-2018 All doctors profees posted records
function allPfPostedRecords() {
	
	//var doctorName = $("#byName").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	var doctorId = $("#txtDoctorId").val();
	var unitId = $("#unitId").val();
	var deptId = $("#deptId").val();
	var serviceId = $("#serviceId").val();
	var drDeptId = $("#drDeptId").val();
	// serviceType = $("#txtSelectServiceReport").val();

	if (doctorId == null || doctorId == "" || doctorId == undefined) {
		doctorId = 0;
	}
	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorId=' + doctorId);
	inputs.push('unitId=' + unitId);
	inputs.push('deptId=' + deptId);
	inputs.push('serviceId=' + serviceId);
	inputs.push('drDeptId=' + drDeptId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/allPfPostedRecords",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {

					var totalAmount = 0;
					var totalConcession = 0;
					var totalDiscount = 0;
					var totalPatPaid = 0;
					var totalActHospAmount = 0;
					var totalHospAmount = 0;
					var totalPfAmount = 0;
					var totalPfPaid = 0;
					var totalPfUnpaid = 0;
					var totalReduction = 0;
					var totalAddition = 0;
					
					
					
					var htmBody = "";
					var htm = "<tr style='background-color: #EEEEEE'><th colspan='3' left>"
							+ "NOBLE HOSPITAL"
							+ "<br>Doctors Summary<br>From  : <b>"
							+ fromDate
							+ "</b><br> To  : <b>"
							+ toDate
							+ "</b></th></tr>";

					htm = htm
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO</th><th class='col-md-1'>Unit Name"
							+ "</th><th class='col-md-1'>Unit Id"
							+ "</th><th class='col-md-1'>Dept Name"
							+ "</th><th class='col-md-1'>Dept Id"
							+ "</th><th class='col-md-1'>Doctor Name"
							+ "</th><th class='col-md-1'>Doctor Id"
							+ "</th><th class='col-md-1'>Amount"
							+ "</th><th class='col-md-1'>Concession"
							+ "</th><th class='col-md-1'>Discount"
							+ "</th><th class='col-md-1'>Pat-Paid"
							+ "</th><th class='col-md-1'>ActHospAmount"
							+ "</th><th class='col-md-1'>HospAmount"
							+ "</th><th class='col-md-1'>Pf.Amount"
							+ "</th><th class='col-md-1'>Pf.Paid"
							+ "</th><th class='col-md-1'>Pf.Unpaid"
							+ "</th><th class='col-md-1'>Reduction"
							+ "</th><th class='col-md-1'>Addition"

							+ "</th></tr>";

					if (r.listProFees.length == 0) {

						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='17' class='center'>No Record Found...!!!</th></tr>";

					} else {
						// console.log(r);
						for ( var i = 0; i < r.listProFees.length; i++) {
							htmBody = htmBody
									+ "<tr>"
									+ "<td class='col-md-1'>"
									+ (i + 1)
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].unitId
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].unitName
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].deptName
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].deptId
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].doctorName
									+ "</td><td class='col-md-1'>"
									+ r.listProFees[i].doctorId
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].amount
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].concession
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].discount
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].paid.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].actHospAmount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].hospAmount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].pfAmount
											.toFixed(2)

									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].pfPaid
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].pfUnpaid
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].pfReduction
											.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ r.listProFees[i].pfAddition
											.toFixed(2)

									+ "</td>" + "</tr>";

							
							totalConcession = totalConcession
									+ r.listProFees[i].concession;
							totalDiscount = totalDiscount
									+ r.listProFees[i].discount;
							totalAmount = totalAmount
									+ r.listProFees[i].amount;
							totalPfAmount = totalPfAmount
									+ r.listProFees[i].pfAmount;
							totalPatPaid = totalPatPaid
									+ r.listProFees[i].paid;
							totalReduction = totalReduction
									+ r.listProFees[i].pfReduction;
							totalAddition = totalAddition
									+ r.listProFees[i].pfAddition;
							totalPfPaid = totalPfPaid
									+ r.listProFees[i].pfPaid;
							totalPfUnpaid = totalPfUnpaid
									+ r.listProFees[i].pfUnpaid;
							totalHospAmount = totalHospAmount
									+ r.listProFees[i].hospAmount;
							totalActHospAmount = totalActHospAmount
							+ r.listProFees[i].actHospAmount;

						}
					}
					htmBody = htmBody
							+ "<tr ><td style='height: 11.5px;'></td></tr>";
					htmBody = htmBody
							+ "<tr style = 'background-color:#EEEEEE;'><td colspan='5'></td><th class='center'>Total"
							+ "</th><td class='col-md-1' align='right' >"
							+ "</td><td class='col-md-1' align='right' >"
							+ totalAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalConcession.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalDiscount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPatPaid.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalActHospAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalHospAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPfAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPfPaid.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPfUnpaid.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalReduction.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalAddition.toFixed(2) + "</td></tr>";

					$("#tableTestVoucherListHead").html(htm);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}

//Irfan khan 30-Mar-2018 records of profees voucher
function fetchProfeesVoucherReport() {

	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var voucherId = $("#voucherId").val();

	if (voucherId == null || voucherId == "" || voucherId == undefined) {
		voucherId = "0";
	}
	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('voucherId=' + voucherId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/fetchProfeesVoucherReport",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					var totalAmount = 0;
					var totalConcession = 0;
					var totalDiscount = 0;
					var totalPatPaid = 0;
					var totalActHospAmount = 0;
					var totalHospAmount = 0;
					var totalPfAmount = 0;
					var totalPfPaid = 0;
					var totalPfUnpaid = 0;
					var totalReduction = 0;
					var totalAddition = 0;
					var totalRefDocAmt = 0;
					var totalRefund = 0;

					var htmBody = "";
					var htm = "<tr style='background-color: #EEEEEE'><th colspan='3' left>"
							//+ "SHRADDHA HOSPITAL<br>"
							+ "Profees Voucher Details<br>";
					if(voucherId == "0"){
						htm = htm + "From  : <b>"+fromDate
						+ "</b><br> To  : <b>"
						+ toDate +"</b>";
					}else{
						htm = htm +"<b>Voucher Id Range :{"+voucherId+"}</b>";
					}
							
					htm = htm	+ "</th></tr>";

					htm = htm
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO</th><th class='col-md-1'>Voucher Id"
							+ "</th><th class='col-md-1'>Dept Id"
							+ "</th><th class='col-md-1'>Dept Name"
							+ "</th><th class='col-md-1'>Doctor Id"
							+ "</th><th class='col-md-1'>Doctor Name"
							+ "</th><th class='col-md-1'>Amount"
							+ "</th><th class='col-md-1'>Concession"
							+ "</th><th class='col-md-1'>Discount"
							+ "</th><th class='col-md-1'>Refund"
							+ "</th><th class='col-md-1'>ActHospAmount"
							+ "</th><th class='col-md-1'>Final HospAmount"
							+ "</th><th class='col-md-1'>RefDocAmount"
							+ "</th><th class='col-md-1'>Pf.Amount"
							+ "</th><th class='col-md-1'>Pf.Paid"
							+ "</th><th class='col-md-1'>Pf.Unpaid"
							+ "</th><th class='col-md-1'>Reduction"
							+ "</th><th class='col-md-1'>Addition"

							+ "</th></tr>";

					if (r.listAllPfRecords.length == 0) {

						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='17' class='center'>No Record Found...!!!</th></tr>";

					} else {
						// console.log(r);
						for ( var i = 0; i < r.listAllPfRecords.length; i++) {
							var list = r.listAllPfRecords[i];
							htmBody = htmBody
									+ "<tr>"
									+ "<td class='col-md-1'>"
									+ (i + 1)
									+ "</td><td class='col-md-1'>"
									+ list.pfVoucherId
									+ "</td><td class='col-md-1'>"
									+ list.departmentId
									+ "</td><td class='col-md-1'>"
									+ list.deptName
									+ "</td><td class='col-md-1'>"
									+ list.doctorId
									+ "</td><td class='col-md-1'>"
									+ list.doctorName
									+ "</td><td class='col-md-1' align='right'>"
									+ list.amount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.concession.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.discount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.refund.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.actHospAmount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.hospAmount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.refDrAmount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.pfAmount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.pfPaid.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.pfUnpaid.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.pfReduction.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.pfAddition.toFixed(2) + "</td>"
									+ "</tr>";

							totalConcession = totalConcession + list.concession;
							totalDiscount = totalDiscount + list.discount;
							totalAmount = totalAmount + list.amount;
							totalPfAmount = totalPfAmount + list.pfAmount;
							totalPatPaid = totalPatPaid + list.paid;
							totalReduction = totalReduction + list.pfReduction;
							totalAddition = totalAddition + list.pfAddition;
							totalPfPaid = totalPfPaid + list.pfPaid;
							totalPfUnpaid = totalPfUnpaid + list.pfUnpaid;
							totalHospAmount = totalHospAmount + list.hospAmount;
							totalActHospAmount = totalActHospAmount
									+ list.actHospAmount;
							totalRefDocAmt = totalRefDocAmt + list.refDrAmount;
							totalRefund = totalRefund + list.refund;

						}
					}

					htmBody = htmBody
							+ "<tr ><td style='height: 11.5px;'></td></tr>";
					htmBody = htmBody
							+ "<tr style = 'background-color:#EEEEEE;'><td colspan='4'></td><th class='center'>Total"
							+ "</th><td class='col-md-1' align='right' >"
							+ "</td><td class='col-md-1' align='right' >"
							+ totalAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalConcession.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalDiscount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalRefund.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalActHospAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalHospAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalRefDocAmt.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPfAmount.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPfPaid.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalPfUnpaid.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalReduction.toFixed(2)
							+ "</td><td class='col-md-1' align='right' >"
							+ totalAddition.toFixed(2) + "</td></tr>";

					$("#tableTestVoucherListHead").html(htm);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}

//Irfan Khan @date: 30-June-2018 @reason : get All VoucherId
function fetchAllVoucherIds() {

	jQuery.ajax({
		async	: true,
		type 	: "POST",
		url		: "ehat/profees/fetchAllVoucherIds",
		success : function(r) {
			setTempAllVouchers(r);
		}
	});
}

//Irfan Khan @date: 15-June-2017 @reason : Set all fetched units
function setTempAllVouchers(r) {   
	
		var list = "<option value='0'>--Select--</option>";    
	    for ( var i = 0; i < r.listVoucher.length; i++) {    

			list = list + "<option value='"+r.listVoucher[i].voucherId+"'>" + (r.listVoucher[i].voucherId) + "</option>";    
			}   
		$("#voucherId").html(list);   
		$("#voucherId").select2();
	
}

function disableDatesOnChange(){
	var voucherId = $("#voucherId").val();
	if (voucherId == null || voucherId == "" || voucherId == undefined) {
		voucherId = "0";
	}
	
	if(voucherId != "0"){
		$('#fromDateDiv').hide();
		$('#toDateDiv').hide();
	}else{
		$('#fromDateDiv').show();
		$('#toDateDiv').show();
	}
}

//Irfan khan 6-Apr-2018 Outstanding report
function fetchOutStandingReport() {

	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	var departmentId= parseInt($("#search_department").val());
	
	//var departmentId = 0;

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('departmentId=' + departmentId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "ehat/profees/fetchOutStandingReport",
				url : "ehat/profees/fetchOutPatientStandingReport",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					
					var totalRemain = 0.0;
					var totalBill = 0.0;
					var meeshaFlow=$("#meeshaFlow").val();
					var htmBody = "";
					var htm = "<tr style='background-color: #EEEEEE'><th colspan='3' left>"
							
							+ "<br>Patient Outstanding Report<br>";
					var fromDate = $("#inputFromDate").val();
					var toDate = $("#inputToDate").val();
					var str = getDateFormat(fromDate, toDate);
					htm = htm + "From  : <b>"+fromDate	+ "</b><br> To  : <b>"+ toDate +"</b>";
					htm = htm	+ "</th></tr>";

					htm = htm
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO</th><th >Bill No."
							/*+ "</th><th class='col-md-1'>Dept Id"*/
							+ "</th><th >Dept Name"
							+ "</th><th >Patient Id"
							+ "</th><th >Patient Name"
							+ "</th><th >Total Bill"
							+ "</th><th >Total Outstanding</th>"
							+ "<th>Outstanding Reason</th>"
							+ "<th>Outstanding Remark</th>"
							
							+ "</tr>";

					if (r.listProFees.length == 0) {

						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='8' class='center'>No Record Found...!!!</th></tr>";

					} else {
						// console.log(r);
						for ( var i = 0; i < r.listProFees.length; i++) {
							var list = r.listProFees[i];
							
							if(list.deptId==2){
								
								//Bill_ID=list.billId;
								if(meeshaFlow == "on"){
									
									Bill_ID=list.billId;
								}
								else{
										Bill_ID=list.billNo;
								}
								
							}else{
									if(meeshaFlow == "on"){
										
										Bill_ID=list.billId;
									}
									else{
											Bill_ID=list.billNo;
									}
							}
							
							htmBody = htmBody
									+ "<tr>"
									+ "<td >"
									+ (i + 1)
									+ "</td><td >"
									+ Bill_ID
									+ "</td>"/* +
											"<td class='col-md-1'>"
									+ list.deptId
									+ "</td>" */+
											"<td >"
									+ list.deptName
									+ "</td><td >"
									+ list.patientId
									+ "</td><td >"
									+ list.patientName
									
									+ "</td><td >"
									+ list.totalBill.toFixed(2)
									+ "</td><td >"
									+ list.totalRemain.toFixed(2)
									
									+ "</td><td >"
									+ list.outStandingReason
									+ "</td><td >"
									+ list.outStandingRemark
									
									+ "</tr>";

							totalRemain = totalRemain + list.totalRemain;
							totalBill = totalBill + list.totalBill;
							
						}
					}

					htmBody = htmBody
							+ "<tr ><td ></td></tr>";
					htmBody = htmBody
							+ "<tr style = 'background-color:#EEEEEE;'><td colspan='3'></td><th class='center'>Total"
							+ "</th><td align='right' >"
							+ "</td><td  align='right' style:bold>"
							+ totalBill.toFixed(2)
							+ "</td><td align='right' >"
							+ totalRemain.toFixed(2)
							 + "</td></tr>";

					$("#tableTestVoucherListHead").html(htm);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}


//Irfan khan 19-April-2018 Reference dr. records
function fetchProfeesReferenceDrReport() {

	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/fetchProfeesReferenceDrReport",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					var totalAmount = 0;
					var totalRefDocAmt = 0;

					var htmBody = "";
					var htm = "<tr style='background-color: #EEEEEE'><th colspan='2' left>"
							//+ "SHRADDHA HOSPITAL<br>"
							+ "Profees Reference Dr. Report<br>";
					htm = htm + "From  : <b>"+fromDate
					+ "</b><br> To  : <b>"
					+ toDate +"</b>";
				htm = htm	+ "</th></tr>";

					htm = htm
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO</th><th class='col-md-1'>Ref.Doc.Id"
							+ "</th><th class='col-md-5'>Doctor Name"
							+ "</th><th class='col-md-3'>Amount"
							+ "</th><th class='col-md-3'>RefDocAmount"

							+ "</th></tr>";

					if (r.listAllPfRecords.length == 0) {

						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='5' class='center'>No Record Found...!!!</th></tr>";

					} else {
						// console.log(r);
						for ( var i = 0; i < r.listAllPfRecords.length; i++) {
							var list = r.listAllPfRecords[i];
							htmBody = htmBody
									+ "<tr>"
									+ "<td class='col-md-1'>"
									+ (i + 1)
									+ "</td><td class='col-md-1'>"
									+ list.refDrId
									+ "</td><td class='col-md-5'>"
									+ list.doctorName
									+ "</td><td class='col-md-1' align='right'>"
									+ list.amount.toFixed(2)
									+ "</td><td class='col-md-1' align='right'>"
									+ list.refDrAmount.toFixed(2)
									+ "</td>"
									+ "</tr>";

							
							totalAmount = totalAmount + list.amount;
							
							totalRefDocAmt = totalRefDocAmt + list.refDrAmount;
							

						}
					}

					htmBody = htmBody
							+ "<tr ><td style='height: 11.5px;'></td></tr>";
					htmBody = htmBody
							+ "<tr style = 'background-color:#EEEEEE;'><td colspan='2'></td><th class='center'>Total"
							+ "</th><td class='col-md-1' align='right' >"
							+ totalAmount.toFixed(2)
							
							+ "</td><td class='col-md-1' align='right' >"
							+ totalRefDocAmt.toFixed(2)
							+ "</td></tr>";

					$("#tableTestVoucherListHead").html(htm);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}

//added by sandip for save Group Master
function saveGroupDetails1() {
	
	var empIdhr = "-";
	var pan = 0;//$("#pan").val();
	var ctc = 0;//$("#ctc").val();
	var plvp =0;// $("#plvp").val();
	//var doctorpercent = 0;//$("#doctorper").val();
	var signature = "-";
	var queryType = "-";
	var empId = "-";
	var usernamefor = "-";
	var password = "-";
	var userType = "-";
	var title ="-";
	
	//Added by Laxman on 02-Jan-2018.
	if(title =="select" || title=="" || title==null){
		alert("Please select Title!");
		return false;
	}else{
		title=title.toString();		
	}
	
	if(usernamefor =="select" || usernamefor=="" || usernamefor==null){
		alert("Please Enter UserName!");
		return false;
	}
	
	if(password =="select" || password=="" || password==null){
		alert("Please Enter Password!");
		return false;
	}
	
	//var doctorId = $("#doctorId").val();
	var ln = ' ';
	var fn =' ';
	var mn = ' ';
	//var docName = title + " " + fn + " " + mn + " " + ln;
	var popup_container2 ="";
	var strAdd = "";
	var apartUnit ="";
	var city = "";
	var state = "";
	var zip = "";
	var mob = "";
	var email = "";
	var dojoin = "";
	var schoolNm = "";
	var schoolAdd ="";
	var schoolFrm = "";
	var schoolTo = "";
	var schoolPercent = "";
	var colNm = "";
	var colAdd = "";
	var colFrm = "";
	var colTo ="";
	var colPercent = "";
	var colDegree = "";
	var pgNm = "";
	var pgAdd = "";
	var pgForm = "";
	var pgTo = "";
	var pgPercent = "";
	var pgDegree = "";
	var cmpnyNm = "-";//$("#compNm").val();
	var cmpnyPhone = "0";$("#compPhone").val();
	var cmpnyAdd = "-";//$("#compAdd").val();
	var cmpnyBoss ="-";// $("#compBoss").val();
	var jobTitle = "-";//$("#jobTitle").val();
	var jobResp = "-";//$("#jobResp").val();
	var jobForm = "-";//$("#jobFrm").val();
	var jobTo = "-";//$("#jobTo").val();
	var fess = 0;//$("#fees").val();
	var apLeaves = 0;//$("#apLeaves").val();
	//var followupFess = $("#followupFess").val();
	var department = "";
	
	var specialization = "";
	var selSpeciality ="";
	
	var doctorfee ="";
	var fixedIncome = "";
	var referalPercent = "";
	var folloupFees = "";
	var folloupWeekend = "";
	
	var qualification = "";
	var designation = "";
	var regNo ="";
	var motivatorAuthorisation = "";
	mob="";
	var docName1 = "";
	//alert(docName1);
	var techName1 ="";
	
	var signature1="";
	var signature2="";
	
	//@Name: irfan khan @date: 11-11-2016 @reason: clinic% and test shared flag
	var clinicPercent=0;//$("#txtClinicPercent").val();
	
	//@Name: paras suryawanshi @date: 18-5-2017 @reason: doctor type master
    var seldcTypeMaster = "";
    
    if(seldcTypeMaster == null || seldcTypeMaster == "null")
    {
    	seldcTypeMaster=0;
    } else {
    	if(userType=="doctor" || userType=="Doctor" ||userType=="DOCTOR"){
    	   if(seldcTypeMaster=="" || seldcTypeMaster==null || seldcTypeMaster==undefined  ){
    		   	seldcTypeMaster=0;
    	   }
    	}
    }
   
    var doctorTypeIdList = "";

	//added by kishor for referal doctor
	if(userType=="doctor" || userType=="Doctor" ||userType=="DOCTOR"){
		$('#seldcTypeMaster1 option:selected').each(function() {
			if(doctorTypeIdList != ""){
				doctorTypeIdList = doctorTypeIdList +","+ $(this).val();
			}else{
				doctorTypeIdList = $(this).val();
			}			
		});
	}

	if(doctorTypeIdList=="" || doctorTypeIdList==null || doctorTypeIdList==undefined  ){
	   doctorTypeIdList=0;
    }

	
    var mulSelunit ='1';
  
	if(mulSelunit!=null && mulSelunit!=""){
		mulSelunit = mulSelunit.toString();
	}else{
		
		alert("Please Enter Unit Name!");
		return false;
	}
 
	var mulDeptid ='0';
	if(mulDeptid!=null && mulDeptid!=""){
		mulDeptid = mulDeptid.toString();
	}else{
		
		alert("Please Enter Department Name!");
		return false;
	}
	
	var mulServiceid = '0';
	if(mulServiceid!=null && mulServiceid!=""){
		mulServiceid = mulServiceid.toString();
	}else{
		
		alert("Please Enter Service Name!");
		return false;
	}
	
	//Added by Laxman on 17-Jan-2018.
	var docIni ='0';
	
	if(docIni!=null && docIni!=""){
		docIni = docIni.toString();
		  //alert("unit id:"+mulSelunit);
	}else{
		docIni="-";
	}
	
	var chkOverrideCharges;
	if ($('#chkOverrideCharges').is(':checked')) {
		chkOverrideCharges = "Y";
	} else {
		chkOverrideCharges = "N";
	}
	 
	var sendSMSflag="N";
	var softwareUsed;
	if ($('#softwareUsed').is(':checked')) {
		softwareUsed = "Y";
	} else {
		softwareUsed = "N";
	}
	
	if (ln == "" || ln == null) {
		alert("Last Name Must Be Filled Out");
		SetFocus("ln");
		return false;
	} else if (fn == "" || fn == null) {
		alert("First Name Must Be Filled Out");
		SetFocus("fn");
		return false;
	} 
	else if (userType == null || userType == "") {
		alert("Please Select Employee Type");
		SetFocus("userType");
		return false;
	}
	
	
	if (apLeaves == "") {
		apLeaves=0;		
		
	} else if (fn == "" || fn == null) {
		alert("First Name Must Be Filled Out");
		SetFocus("ln");
		return false;
	} 
	 
	if (empIdhr == "" || empIdhr == null || empIdhr == undefined) {
		empIdhr=0;
	}
	if (fixedIncome == "" || fixedIncome == null || fixedIncome == undefined) {
		fixedIncome=0;
	}
	if (referalPercent == "" || referalPercent == null || referalPercent == undefined) {
		referalPercent = 0;
	}
	
	//Added By Tarique Aalam
	if(userType=="doctor" || userType=="Doctor" ||userType=="DOCTOR"){
		if(folloupFees=="" || folloupFees==null || folloupFees==undefined  ){
			alert("Please enter FollowUp Fees");
			return false;
		}
	
		if(folloupWeekend=="" || folloupWeekend==null || folloupWeekend==undefined  ){
			alert("Please enter FollowUp Weekend");
			return false;
		}
	}else {
		folloupFees=0.0;
		folloupWeekend=0.0;
	}
	
	//-------------------Added By Badrinath------------------------	
	var allServicesFlag="N";
	if($('#allServiceChk').is(':checked')){ 
		allServicesFlag="Y";
	} 
	
	var addUserSign="N";
	if($('#softwareUsedChk').is(':checked')){ 
		addUserSign="Y";
	} 
	//----------------------------------------------------------
	var user_ID = "";
	//var doctor_ID = $("#doctorIdForUpdate").val();
	var createdDate ="";
	

	var groupId = $("#groupId").val();
	var groupName = $("#groupName").val();
	var equalPercent = parseFloat($("#equalPercent").val());
	var individualPercent = parseFloat($("#individualPercent").val());
	var trCnt = $('#addDoctorTbody tr').length;
	var callFrom = $("#callFrom").val();

	if(groupName == "" || groupName == null || groupName == undefined){
		alert("Enter Group Name!!!");
		SetFocus("groupName");
		return false;
	}
	if((equalPercent+individualPercent) != 100){
		alert("Shared % total should be 100%");
		SetFocus("equalPercent");
		return false;
	}
	
	var groupMasterDetails = {
			listGroupMaster : []
	};
	
	groupMasterDetails.listGroupMaster.push({
		groupMasterId : groupId,
		groupName : groupName,
		equalPercent : equalPercent,
		individualPercent : individualPercent

	});
	
	var groupSlaveDetails = {
		listGroupSlave : []
	};

	var totalDocPer = 0.0;
	for ( var i = 1; i <= trCnt; i++) {
		var doctorId = $("#tdDoctorId" + i).text();
		var doctorName = $("#tdDoctorName" + i).text();
		var doctorPercent = parseFloat($("#tdDoctorPercent" + i).text());
		totalDocPer = totalDocPer + doctorPercent;
		groupSlaveDetails.listGroupSlave.push({
			doctorId : doctorId,
			doctorName : doctorName,
			doctorPercent : doctorPercent

		});
	}
	//alert(individualPercent +"=="+totalDocPer);
	if(individualPercent != totalDocPer){
		alert("total Dr. % is not equal to individual %");
		SetFocus("individualPercent");
		return false;
	}
	groupSlaveDetails = JSON.stringify(groupSlaveDetails);
	groupMasterDetails = JSON.stringify(groupMasterDetails);

	var inputs = [];	
	
	inputs.push('title=' + ' ');
    inputs.push('ctc=' + ctc);
	inputs.push('panCardNo=' + '0');
	inputs.push('plvp=' + '0');
	inputs.push('doctorpercent=' + doctorPercent);
	inputs.push('Docsign=' + '0');
	inputs.push('queryType=' + queryType);
	inputs.push('empId=' + '0');
	inputs.push('doctorName=' + groupName);
	inputs.push('dob=' + '0');
	inputs.push('strAdd=' + '0');
	inputs.push('apartUnit=' + '0');
	inputs.push('city=' + '0');
	inputs.push('state=' + '0');
	inputs.push('zip=' + '0');
	inputs.push('mobileNo=' + '0');
	inputs.push('email_Id=' + '0');
	inputs.push('doj=' + '0');
	inputs.push('schoolNm=' + '0');
	inputs.push('schoolAdd=' + '0');
	inputs.push('schoolForm=' + '0');
	inputs.push('schooTo=' + '0');
	inputs.push('schoolPercent=' + '0');
	inputs.push('colNm=' + '0');
	inputs.push('colAdd=' + '0');
	inputs.push('colFrm=' + '0');
	inputs.push('colTo=' + '0');
	inputs.push('colPercent=' + '0');
	inputs.push('colDegree=' + '0');
	inputs.push('pgNm=' + '0');
	inputs.push('pgAdd=' + '0');
	inputs.push('pgForm=' + '0');
	inputs.push('pgTo=' + '0');
	inputs.push('pgPercent=' + '0');
	inputs.push('pgDegree=' + '0');
	inputs.push('cmpnyNm=' + '0');
	inputs.push('cmpnyPhone=' + '0');
	inputs.push('cmpnyAdd=' + '0');
	inputs.push('cmpnyBoss=' + '0');
	inputs.push('jobTitle=' + '0');
	inputs.push('jobResp=' + '0');
	inputs.push('jobForm=' + '0');
	inputs.push('jobTo=' + '0');
	inputs.push('fess=' + 0);
	inputs.push('aplicableleaves=' + 0);
	inputs.push('department=' + '0');
	inputs.push('specialisation=' + '0');
	inputs.push('speciality=' + '0');
	inputs.push('chkOverrideCharges=' + chkOverrideCharges);
	inputs.push('sendSMSflag=' + '0');
	inputs.push('qualification=' + '0');
	inputs.push('designation=' + '0');
	inputs.push('regNo=' + '0');
	inputs.push('motivatorAuthorisation=' + '0');
	inputs.push('clinicPercent=' + 0);
	inputs.push('testSharedFlag=' + 0);	
	inputs.push('filePath=' + encodeURIComponent("-"));
	inputs.push('docIni=' + '0');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('seldcTypeMaster=' + '0');
	inputs.push('doctorTypeIdList=' + '0');
	inputs.push('mulSelunit=' + 1);
	inputs.push('mulDeptid=' + '0');
	inputs.push('mulServiceid=' + '0');    	
	inputs.push('empIdhr=' + '0');
	inputs.push('doctorfee=' + 0);
	inputs.push('fixedIncome=' + 0);
	inputs.push('referalPercent=' + 0);
	inputs.push('folloupfees=' + 0);
	inputs.push('folloupWeekend=' + 0);	
	inputs.push('user_ID=' + 0);
	inputs.push('tdDoctorId=' + doctorId);
	inputs.push('full_name=' + '0');
	inputs.push('f_name=' + groupName);
	inputs.push('m_name=' + ' ');
	inputs.push('l_name=' + ' ');
	inputs.push('user_Name=' + groupName);
	inputs.push('user_Type=' + 'DOCTOR');	
	inputs.push('doc_Type=' + 'DOCTOR');	
	inputs.push('password=' + '0');
	inputs.push('softwareUsed=' + '0');
	inputs.push('created_Date=' + '0');
	inputs.push('availability=' + 'Y');
	inputs.push('status=' + 'Y');
	inputs.push('sign_one_doctor=' + '');
	inputs.push('sign_two_doctor=' + '');
	inputs.push('sign_one=' + '');
	inputs.push('sign_two=' + '');
	inputs.push('allServicesFlag=' + 'N');
	inputs.push('addUserSign=' + 'Y');
	
	inputs.push("groupSlaveDetails=" + encodeURIComponent(groupSlaveDetails));
	inputs.push("groupMasterDetails=" + encodeURIComponent(groupMasterDetails));
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/saveGroupDetails1",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			fetchGroupMasterList("save");
			//$("#callFrom").val("insert");
			resetGroupMaster();
			//proFeesDoctorPayment();
		}
	});
}

//added by sandip for refDoc Report
function fetchProfeesReferenceDrReport1() {

	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
	var searchBy = $('#refBySelect option:selected').text().trim();
	var searchByDept = $('#deptId option:selected').val();
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('searchBy=' + searchBy);
	inputs.push('searchByDept=' + searchByDept);

	var str = inputs.join('&');

	jQuery
		.ajax({
			async: false,
			type: "POST",
			data: str + "&reqType=AJAX",
			url: "ehat/profees/fetchProfeesReferenceDrReport1",
			error: function() {
				alert('Network Issue!!!');
			},
			success: function(r) {
			
				var totalAmount = 0;
				var totalRefDocAmt = 0;

				var htmBody = "";
				var htm = "<tr style='background-color: #EEEEEE'><th colspan='2' left>"
					//+ "SHRADDHA HOSPITAL<br>"
					+ "Profees Reference Dr. Report<br>";
				var fromDate = $("#fromDate").val();
				var toDate = $("#toDate").val();
				var str = getDateFormat(fromDate, toDate); //added by sandip
				htm = htm + "From  : <b>" + fromDate
					+ "</b><br> To  : <b>"
					+ toDate + "</b>";
				htm = htm + "</th></tr>";

				htm = htm
					+ "<tr style='background-color: #EEEEEE'><th>Sr.no</th><th class='col-md-1'>UHID"
					+ "</th><th class='col-md-5'>Patient Name"
					+ "</th><th class='col-md-3'>Opd/Ipd No"
					+ "</th><th class='col-md-3'>Sponser Name"
					+ "</th><th class='col-md-3'>Date Of Admission"
					+ "</th><th class='col-md-3'>Date Of Discharge"
					+ "</th><th class='col-md-3'>Consultant Name"
					+ "</th><th class='col-md-5'>Ref Dr. Name"
					+ "</th><th class='col-md-3'>Ref Dr.Spl Name"
					+"</th>"
					//+ "<th class='col-md-2'>Mobile No"
					//+ "</th>"
					+ "<th class='col-md-2'>Ref fees"
					+ "</th><th class='col-md-2'>Ref % fees"
					+ "</th><th class='col-md-3'>Total Amount"
					+ "</th><th class='col-md-3'>Referred Source"
					+"</th><th class='col-md-3'>Source Dr. Name"
					+ "</th></tr>";

				if (r.listAllPfRecords.length == 0) {

				htmBody = htmBody
					+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='5' class='center'>No Record Found...!!!</th>"
					+ "<td>" + "</td>"
					+ "<td>" + "</td>"		 
					+ "<td>" + "</td>"		 
					+ "<td>" + "</td>"		 
					+ "<td>" + "</td>"		 
					+ "<td>" + "</td>"
					+ "<td>" + "</td>"		 
					+ "<td>" + "</td>"
					+"</tr>";

				} else {
					// console.log(r);
					for (var i = 0; i < r.listAllPfRecords.length; i++) {
						var list = r.listAllPfRecords[i];
						
						var  per  = list.totalbill * list.ref_doc_per /100;
						
						var date =new Date(r.listAllPfRecords[i].createdDateTime).toLocaleDateString('en-GB');
						
						htmBody = htmBody
							+ "<tr>"
							+ "<td class='col-md-1'>"
							+ (i + 1)
							+ "</td><td class='col-md-1'>"
							+ list.patientId
							+ "</td><td class='col-md-5'>"
							+ list.patientName
							//+ "</td><td class='col-md-1' align='right'>"
							//+ list.amount.toFixed(2)
							//+ "</td><td class='col-md-1' align='right'>"
							//+ list.refDrAmount.toFixed(2)
							//+ "</td>"
							+ "</td><td class='col-md-1'>"
							+ list.opdipdno
							+ "</td><td class='col-md-1'>"
							+ list.categoryname
							+ "</td><td class='col-md-5'>"
							+ date
							+ "</td><td class='col-md-5'>"
							+ list.dob
							+ "</td><td class='col-md-5'>"
							+ list.docName
							+ "</td><td class='col-md-5'>"
							+ list.docNameChan
							+ "</td><td class='col-md-5'>"
							+ list.specility
							+ "</td>"
							/*+ "<td class='col-md-5'>"
							+ list.mobile
							+ "</td>"*/ 
							+ "<td class='col-md-5'>"
							+ list.referFees
							+ "</td><td class='col-md-5'>"
							+ per
							+ "</td><td class='col-md-5'>"
							+ list.totalbill
							+ "<td class='col-md-3'>"
							+ list.referred_source
							+ "</td><td class='col-md-3'>"
							+ list.sourceDocName
							+ "</td>"
							 "</tr>";
						
						totalAmount = totalAmount + list.referFees;
						totalRefDocAmt = totalRefDocAmt + per;

					}
				}

				htmBody = htmBody
					+ "<tr ><td style='height: 11.5px;'></td></tr>";
				htmBody = htmBody
					+ "<tr style = 'background-color:#EEEEEE;'><td colspan='2'></td><th class='center'>"
					+ "</th><td class='col-md-1' align='right' >"
					+ "</td><td class='col-md-1' align='right' >"
					+ "</td>"+ "<td>" + "</td>"
					+ "<td>" + "</td>"		 
					+ "<td>" + "</td>"		 
					+ "<td>" + "</td>"	 
					//+ "<td>" + "</td>"
					+ "<td>Total</td>"
					+ "</td><td class='col-md-1' align='right' >"
					+ totalAmount.toFixed(2)
					+ "</td><td class='col-md-1' align='right' >"
					+ totalRefDocAmt.toFixed(2)
					+"</tr>";

				$("#tableTestVoucherListHead").html(htm);
				$("#tableTestVoucherList").html(htmBody);
			}
		});
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


// Rohini Ambhore added

function editPercentMasterNew(doctorId,unitId,caseType,drDeptId,chargesSlaveId,callFrom){
	//alert("doctorId=="+doctorId+"  unitId=="+unitId);
	getAllChargeslave();
	doctorName(doctorId);
	var inputs = [];
	inputs.push("doctorId=" + doctorId);
	inputs.push("unitId=" + unitId);
	inputs.push("caseType=" + caseType);
	inputs.push("chargesSlaveId=" + chargesSlaveId);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/editPercentMaster",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//var doctorId;
			var doctorName;
			var chargesId=0;
			var chargesSlaveId=0;
			var rupay = "";
			
			for(var i=0;i<r.listPerMaster.length;i++){
				chargesId = r.listPerMaster[i].chargesId;
				chargesSlaveId = r.listPerMaster[i].chargesSlaveId;
			
                 if (r.listPerMaster[i].serviceId != 0) {
					$("#thDeptPer_" + r.listPerMaster[i].deptId).val(r.listPerMaster[i].hospPercent);
					//tdServicePer_2_11
					$("#tdServicePer_" + r.listPerMaster[i].deptId+"_"+r.listPerMaster[i].serviceId).val(r.listPerMaster[i].hospPercent);			
					doctorId = r.listPerMaster[i].doctorId;
					doctorName = r.listPerMaster[i].doctorName;
					unitId = r.listPerMaster[i].unitId;
					caseType = r.listPerMaster[i].caseType;
					rupay = r.listPerMaster[i].percentrupay;
				} else {
					//$("#tdServicePer_" + r.listPerMaster[i].deptId + "_" + r.listPerMaster[i].serviceId).val(r.listPerMaster[i].hospPercent);
					$("#thDeptPer_" + r.listPerMaster[i].deptId).val(r.listPerMaster[i].hospPercent);
					rupay = r.listPerMaster[i].percentrupay;		
					//$("#r").val(r.listPerMaster[i].hospPercent);
				}
			}
			$("#unitId").val(unitId);
			//$("#doctorName").val(doctorName);
			$("#txtDoctorId").val(doctorId);
			$("#unitId").prop("disabled","true");
			$("#doctorName").prop("disabled","true");
			$("#callFrom").val("update");
			$("#drDeptId").val(drDeptId);
			$("#drDeptId").prop("disabled", "true");
			//fetchSuperCatogoiresSlave(chargesSlaveId);
			//$("#sponsor_select").select2("val", chargesId);			
			$("#listmstr_select_chargesinfo").select2("val", chargesId);
			
			//setDyanamicDivForChargesinfo('dynamicItemsinfo','listmstr_select_chargesinfo');

			   // change date 03-04-2024  //setDyanamicDivForPercentage('dynamicItemsinfo','listmstr_select_chargesinfo');
			
			setDyanamicDivForChargesinfoProfees('dynamicItemsinfo','listmstr_select_chargesinfo')
			
			
			$("#listmstr_select_chargesinfo").select2("val", chargesSlaveId);
			setDyanamicDivForChargesinfoProfees('dynamicItemsinfo','listmstr_select_chargesinfo')
			
			//$("#lisH0").val(chargesId);// chargesId
			//$("#lisH0").val(chargesId);
			//$("#lisH1").val(chargesSlaveId);
		//	$("#lisH" + (liSize - 1)).val(chargesSlaveId);
			if (rupay == "rupay") {
				$("input[name=refParentage][value=" + rupay + "]").attr('checked', 'checked');
			}
			else {
				$("input[name=refParentage][value=" + rupay + "]").attr('checked', 'checked');
			}
			if (caseType == 1) {
				$("#chkHospital").prop("checked", true);
				$("#chkPrivate").prop("disabled",true);
				$("#chkHospital").removeAttr("disabled");
				//$("#chkPrivate").prop("checked", false);
			}else{
				$("#chkPrivate").prop("checked",true);
				$("#chkHospital").prop("disabled",true);
				$("#chkPrivate").removeAttr("disabled");
			}
			chargesSlaveHideShow();
			//alert(chargesSlaveId +"==="+chargesId);
		}
	});
	
	//added by sandip for apply fees to all subservices
	var value = $("#thDeptPer_1").val();
	var value1 = $("#thDeptPer_2").val();
	var value2 = $("#thDeptPer_3").val();

	if(callFrom == 'Edit'){
		
	}else{
	
	$(".dept").each(function() {
		
		//set values for service
		$(".dept1ServPer").map(function() {

			return $(this).val(value);
		}).get();

		//set values for sub-service
		$(".dept1SubPer").map(function() {
			return $(this).val(value);
		}).get();
		
		// 2
		//set values for service
		$(".dept2ServPer").map(function() {

			return $(this).val(value1);
		}).get();

		//set values for sub-service
		$(".dept2SubPer").map(function() {
			return $(this).val(value1);
		}).get();
		
		// 3
		//set values for service
		$(".dept3ServPer").map(function() {

			return $(this).val(value2);
		}).get();

		//set values for sub-service
		$(".dept3SubPer").map(function() {
			return $(this).val(value2);
		}).get();
	});
   }
}

// Added By Rohini on 20-02-2024
function getAllChargeslave() {

	jQuery.ajax({
		type : "POST",
		//url : "ehat/chargesSlave/getSponsorList",
		url : "ehat/profees/getSponsorList",

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

function fetchSuperCatogoiresSlave(chargesMasterDto) {
	var selfId = $("#" + chargesMasterDto ).val();
	chargesMasterDto=	selfId;
	//if charges slave id is not equals or greter than zero 
	if (chargesMasterDto == "" || chargesMasterDto == null || chargesMasterDto == undefined || isNaN(chargesMasterDto)) {
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				"chargesMasterDto" : parseInt(chargesMasterDto)
			},
			
			url : "ehat/chargesSlave/fetchSuperCatogoires",
			error : function() {
				alert('Network Issue!');
			},
			success : function(response) {
			//	alert(response.lstChargesSlave.length);
				if(response.lstChargesSlave.length > 0){
				  var listlength =response.lstChargesSlave.length;	
				  if(listlength==1){
					  fetchChargesSlaveListById(response.lstChargesSlave[0].slaveId,response.lstChargesSlave[0].slaveId);
				  }else{
					 var listlengthnew =listlength -1;
					  fetchChargesSlaveListById(response.lstChargesSlave[listlengthnew].slaveId,response.lstChargesSlave[1].slaveId);

				  }
				}
				setDyanamicDivForList('mulDynamicItem',response);
			}
		});
	}
	
}
function setDyanamicDivForList(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
		 htm = htm+ '<li class="select2-search-choice" id="liItme'
			+ i
			
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
		 	
		 	//$('#disc').val(response.lstChargesSlave[i].discount);
	}
	$('#' + setDiv).html(htm);
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


//Irfan Khan @date: 11-oct-2017 @reason : To Fetch all hosp specialisation
function getHospDepartmentOfDoctor() {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/profees/getHospDepartmentOfDoctor",
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			setTempHospDeprtmentNameDoc(r);//call template
		}
	});
}

function setTempHospDeprtmentNameDoc(r) {

	var list = "<option value='0'>--Select--</option>";//static value as 0
	for ( var i = 0; i < r.listDepartments.length; i++) {

		list = list + "<option value='" + r.listDepartments[i].departmentId + "'>"
		+ (r.listDepartments[i].departmentName) + "</option>";
	}
	$("#drDeptId").html(list);//setting list on selectbox id
}


function resetProfeesPercentMasterNew(){
	$("#callFrom").val("insert");
	//$("#unitId").val(0);
	$("#drDeptId").val(0);
	$("#doctorName").val("");
	$("#txtDoctorId").val(0);
	$("#unitId").removeAttr("disabled");
	$("#drDeptId").removeAttr("disabled");
	$("#doctorName").removeAttr("disabled");
	$("#chkHospital").prop("checked", true);
	$("#chkHospital").removeAttr("disabled");
	$("#chkPrivate").removeAttr("disabled");
	$("#listSize").val(0);
	$("input[name=refParentage][value='parentage']").attr('checked', 'checked');
	//fetchDeptAndServices("onload");
	//fetchAllService();
	//getAllUnitForProfees();
	//chargesSlaveHideShow();
	
	$("#dynamicItemsinfo").empty();
	$("#tabNo").val(1);
	//getAllChargesl();
}


function setDyanamicDivForPercentage(setDiv, getDiv) {
	
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
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removechNewPer('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisH' + (count) + '" type="hidden" value="' + id
			+ '">';
		+'</li>';
		$('#' + setDiv).append(htm);
	
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
	   //	getAllChargesl();// for masters 
		getAllChargeslave();
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

function removechNewPer(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesH' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		//getAllChargesl();
		getAllChargeslave();
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

//Added Rohini on 27-03-2024
function setDyanamicDivForChargesinfoProfees(setDiv, getDiv) {
	
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
			
			fetchChargesSlaveinfoProfees(masterid, selfId,setDiv, getDiv);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveinfoProfees(masterid, selfId,setDiv, getDiv);
		}		
	}
	
	$("#compDiv").show();
}

function fetchChargesSlaveinfoProfees(masterId, selfId,setDiv, getDiv) {
	
	//masterId =1;
	
	var liSize = $("#" + setDiv + " li").length;
	var masterid ="";
	 masterid = $("#lisH" + 0).val();
	 selfId = $("#lisH" + (liSize - 1)).val();
	
	 var ids ="";
	 if (liSize >1) {
		 for(i=1;i<liSize; i++){
			 if(ids == ""){
				 ids = $("#lisH"+i).val();
			 }else{
			  ids = ids +","+ $("#lisH"+i).val();
			 }
		 }
		} 
	
	 
	jQuery.ajax({
		async : false,
		type : "POST",
		//url : "ehat/chargesSlave/fetcatY",
		url : "ehat/commanadv/getChragesSlaveByIddrNew",
		data : {
			//"masterId" : parseInt(masterId),
			//"selfId" : parseInt(selfId)
			"masterId" : parseInt(masterid),
			"selfIds" : ids

		},
		success : function(response) {
			
			multiSelectSlavechargesinfo(response);
			
		}
	});
}