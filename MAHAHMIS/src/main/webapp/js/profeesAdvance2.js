/*******************************************************************************
 * @author :BILAL
 * @Date :18-01-2017
 * @Code :For fetching all services on load
 ******************************************************************************/
function fetchAllService() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/profees/fetchDeptAndServices",

				success : function(r) {

					var tHead = "";
					tHead = tHead + "<th>Services(For Hospital)</th>";
					for ( var i = 0; i < r.lstDepts.length; i++) {
						tHead = tHead
								+ "<th>"
								+ r.lstDepts[i].deptName
								+ "<input type='text' class='deptPer' id='thDeptPer_"
								+ r.lstDepts[i].deptId
								+ "' value='0' style='width: 50%; text-align:right;'" 
								+ " maxlength=5 onkeypress='return isPercentKey(event,\"thDeptPer_"
								+ r.lstDepts[i].deptId +"\")' "	
								+ " onkeyup='return isGTHundred(\"thDeptPer_"
								+ r.lstDepts[i].deptId +"\"),chkClickFillAll("+r.lstDepts[i].deptId+")'>"
								//+ "<input type='checkbox' value='"+r.lstDepts[i].deptId+"' "
								//+ "style='width: 10%;' class='form-control' id='chkDept"+r.lstDepts[i].deptId+"' onclick='chkClickFillAll("+r.lstDepts[i].deptId+")'>"
								+ "<input type='hidden' id='th"
								+ (r.lstDepts[i].deptId)
								+ "' value='"
								+ r.lstDepts[i].deptId
								+ "' class='dept'>"
								+"</th>";
					}

					tHead = tHead + "<th>Sub-Services</th>";
					$("#tHeadDeptTable").html(tHead);
					setServices(r);
				}
			});

}
/*******************************************************************************
 * @author :BILAL
 * @Date :18-01-2017
 * @Code :For setting all services on load
 ******************************************************************************/
function setServices(response) {

	var moduleBody = "";
	var subId = 0;
	for ( var i = 0; i < response.listService.length; i++) {
		
		//we dont set registration percent its 100% hospital
		if(response.listService[i].serviceId != 1){
		
		// for Services body
		moduleBody = moduleBody + "<tr id='module_"
				+ response.listService[i].serviceId + "'>" + "<td>"
				+ response.listService[i].serviceName + "</td>";
		for ( var j = 0; j < response.lstDepts.length; j++) {
			
			moduleBody = moduleBody + "<td><input id='tdServicePer_"
					+ response.lstDepts[j].deptId + "_"
					+ response.listService[i].serviceId
					+ "' class='moduleView viewAll dept"
					+ response.lstDepts[j].deptId
					+ "ServPer' value='0' style='text-align:right;' type='text' "
					+" maxlength=5 onkeypress='return isPercentKey(event,\"tdServicePer_"
					+response.lstDepts[j].deptId + "_"+response.listService[i].serviceId+"\")'"
					+" onkeyup='return isGTHundred(\"tdServicePer_"
					//change by Rohini on 13-04-2023
					//+response.lstDepts[j].deptId + "_"+response.listService[i].serviceId+"\"),chkClickFillAllUpdated("+response.lstDepts[j].deptId+","+response.listService[i].serviceId+")'>"				
					
					+response.lstDepts[j].deptId + "_"+response.listService[i].serviceId+"\"),setSubServPer("+response.lstDepts[j].deptId+","+response.listService[i].serviceId+")'>"

					+ "<input id='service_" + response.lstDepts[j].deptId // +"_"+
																			// response.listService[i].serviceId
					+ "' class='moduleView viewAll dept"
					+ response.lstDepts[j].deptId + "ServId' value='"
					+ response.listService[i].serviceId + "' type='hidden'>"

					+ "<input id='dept_" + response.lstDepts[j].deptId + "_"
					+ response.listService[i].serviceId
					+ "' class='moduleView viewAll dept"
					+ response.lstDepts[j].deptId + "' value='"
					+ response.lstDepts[j].deptId + "' type='hidden'></td>";
		}

		if (response.listService[i].serviceId == 1) {
			moduleBody = moduleBody
					+ "<td><button id='showmodule_"
					+ response.listService[i].serviceId
					+ "' onclick=toggle('module_"
					+ response.listService[i].serviceId
					+ "_"
					+ subId
					+ "') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down' style='display:none;'></i></button></td></tr>";

		} else {
			
			moduleBody = moduleBody
					+ "<td><button id='showmodule_"
					+ response.listService[i].serviceId
					+ "' onclick=toggle('module_"
					+ response.listService[i].serviceId
					+ "_"
					+ subId
					+ "'),setServicesonclick("
					+ response.listService[i].serviceId
					+ "),fetchAndSetSubServiceOnEdit("
					+ response.listService[i].serviceId
					+ "),subserviceHiddenIdvalue() "
					+ "style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>";

		}
		moduleBody = moduleBody
				+ "<tr style='display:none;' class='module_"
				+ response.listService[i].serviceId
				+ "_"
				+ subId
				+ "'><td style='padding-left: 20px; padding-right: 20px;' colspan='5'>"
				+ "<div class='box border blue'><div class='box-body'><table class='table table-striped'>"

				+ "<tbody id='subserviceBody_"
				+ response.listService[i].serviceId + "_" + subId
				+ "'></tbody></table></div></div></td></tr>";

		}
	}
	$('#moduleBody').html(moduleBody);
}
/*******************************************************************************
 * @author :BILAL
 * @Date :18-01-2017
 * @Code :For setting all services on load
 ******************************************************************************/
function setServicesonclick(serviceId) {

	var selfId = 0;
	var serviceIdeach = 0;
	var callFrom = 'super';
	if (serviceId == 0) {
		fetchAllService();
	} else {

		if (serviceId > 0) {
			fetchSubServiceById(serviceId, selfId, serviceIdeach, callFrom);
		} else {
			fetchSubServiceById(serviceId, selfId, serviceIdeach, callFrom);
		}

	}

}
/*******************************************************************************
 * @author :BILAL
 * @Date :18-01-2017
 * @Code :For fetching all sub services under services on click
 ******************************************************************************/
function fetchSubServiceById(masterId, selfId, serviceIdeach, callfrom) {

	jQuery.ajax({
		type : "POST",
		async : false,
		url : "ehat/subservice/getSubServicesFoprofees",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(r) {
			console.log(r);
			
		//	setTimeout(function() {
				setSubIdHidden(selfId);
				setSubServices(r, masterId, serviceIdeach, callfrom, selfId);
				
				if(callfrom == 'super'){
				  fetchAndSetSubServiceOnEdit(masterId);
				}else if(callfrom == 'sub'){
				    //fetchAndSetSubServiceOnEdit(selfId);
					 fetchAndSetSubServiceOnEdit(masterId);
				}
				
			//}, 150);
		}
	});
}
/*******************************************************************************
 * @author :BILAL
 * @Date :18-01-2017
 * @Code :For setting all sub services under services on click
 ******************************************************************************/
function setSubServices(response, masterId, serviceIdeach, callfrom, selfId) {
	var serviceId = 0;

	var subHiddenId = $("#subHiddenId").val();
	
	if (callfrom == 'sub') {
		serviceId = serviceIdeach + "_" + selfId;
	} else {
		serviceId = masterId + "_" + 0;
	}

	var moduleBody = "";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		var isCategory = response.lstSubService[i].isCategory;
		// for Services body
		moduleBody = moduleBody + "<tr id='module_"
				+ response.lstSubService[i].serviceId + "'>" + "<td>"
				+ response.lstSubService[i].categoryName + "</td>";

		for ( var j = 0; j < response.lstDepts.length; j++) {
			
			if (isCategory == "N") {
				
				moduleBody = moduleBody + "<td><input id='tdSubServicePer_" + response.lstDepts[j].deptId +"_"+response.lstSubService[i].subId+ "' "
				// + response.lstDepts[j].deptId
				+ " class='moduleView viewAll dept" + response.lstDepts[j].deptId
						+ "SubPer mstService_"+response.lstDepts[j].deptId+"_"+response.lstSubService[i].serviceId+" mstSubService_"+response.lstDepts[j].deptId+"_"+subHiddenId+"' value='0'  type='text' style='text-align:right;' "
						+ " maxlength=5 onkeypress='return isPercentKey(event,\"tdSubServicePer_"
						+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\")' "
						+ "onkeyup='return isGTHundred(\"tdSubServicePer_"
						+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\")'>";
			}else{
				
				moduleBody = moduleBody + "<td><input id='tdSubServicePer_" + response.lstDepts[j].deptId +"_"+response.lstSubService[i].subId+ "' "
				// + response.lstDepts[j].deptId
				+ " class='moduleView viewAll dept" + response.lstDepts[j].deptId
						+ "SubPer mstService_"+response.lstDepts[j].deptId+"_"+response.lstSubService[i].serviceId+" mstSubService_"+response.lstDepts[j].deptId+"_"+subHiddenId+"' value='0'  type='text' style='text-align:right;' "
						+ " maxlength=5 onkeypress='return isPercentKey(event,\"tdSubServicePer_"
						+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\")' "
						+ "onkeyup='return isGTHundred(\"tdSubServicePer_"
						//+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\"),setSubLeafServPer("+response.lstDepts[j].deptId+","+subHiddenId+")'>"
						+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\"),setSubLeafServPer("+response.lstDepts[j].deptId+","+response.lstSubService[i].subId+")'>"
						//+ response.lstDepts[j].deptId + "_"+response.lstSubService[i].subId+"\")'>";
			}
			
			// Sub Service percentage			
			// SubService Id
			moduleBody = moduleBody + "<input id='dept" + response.lstDepts[j].deptId
					+ "SubId' "
					// + response.lstDepts[j].deptId +"_"+
					// response.lstSubService[i].subId
					+ " class='moduleView viewAll dept"
					+ response.lstDepts[j].deptId + "SubId' value='"
					+ response.lstSubService[i].subId + "' type='hidden'>"

					// Service Id
					+ "<input id='dept" + response.lstDepts[j].deptId
					+ "SrvId' "
					// + response.lstDepts[j].deptId +"_"+
					// response.lstSubService[i].serviceId
					+ " class='moduleView viewAll dept"
					+ response.lstDepts[j].deptId + "SubSerId' value='"
					+ response.lstSubService[i].serviceId + "' type='hidden'>"

					// Department id
					+ "<input id='dept" + response.lstDepts[j].deptId + "Id'"
					// + response.lstDepts[j].deptId +"_"+
					// response.lstSubService[i].serviceId
					+ " class='moduleView viewAll deptIdSub' value='"
					+ response.lstDepts[j].deptId + "' type='hidden'></td>";
		}

		if (isCategory == "N") {
			moduleBody = moduleBody
					+ "<td><button id='showmodule_"
					+ response.lstSubService[i].serviceId
					+ "' onclick=toggle('module_"
					+ response.lstSubService[i].serviceId
					+ "_"
					+ response.lstSubService[i].subId
					+ "') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down' style='display:none;'></i></button></td></tr>";

		} else {
			moduleBody = moduleBody
					/*+ "<td><button id='showmodule_"
					+ response.lstSubService[i].subId
					+ "' onclick=toggle('module_"
					+ response.lstSubService[i].serviceId
					+ "_"
					+ response.lstSubService[i].subId
					+ "'),fetchSubServiceById("
					+ masterId
					+ ","
					+ response.lstSubService[i].subId
					+ ","
					+ response.lstSubService[i].serviceId
					+ ",'sub'),fetchAndSetSubServiceOnEdit("
					+ response.lstSubService[i].serviceId
					+ "),setSubIdHidden("+response.lstSubService[i].subId+") style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>";*/

			+ "<td><button id='showmodule_"
			+ response.lstSubService[i].subId
			+ "' onclick=toggle('module_"
			+ response.lstSubService[i].serviceId
			+ "_"
			+ response.lstSubService[i].subId
			+ "'),fetchSubServiceById("
			+ masterId
			+ ","
			+ response.lstSubService[i].subId
			+ ","
			+ response.lstSubService[i].serviceId
			+ ",'sub') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>";
		}
		moduleBody = moduleBody
				+ "<tr style='display:none;' class='module_"
				+ response.lstSubService[i].serviceId
				+ "_"
				+ response.lstSubService[i].subId
				+ "'><td style='padding-left: 20px; padding-right: 20px;' colspan='5'>"
				+ "<div class='box border blue'><div class='box-body'><table class='table table-striped'>"

				+ "<tbody id='subserviceBody_"
				+ response.lstSubService[i].serviceId + "_"
				+ response.lstSubService[i].subId
				+ "'></tbody></table></div></div></td></tr>";

	}

	$('#subserviceBody_' + serviceId).html(moduleBody);
	
	//added by sandip for apply fees to all subservices
	var value = $("#thDeptPer_1").val();
	var value1 = $("#thDeptPer_2").val();
	var value2 = $("#thDeptPer_3").val();
    var subserviceHiddenIdvalue = $("#subserviceHiddenIdvalue").val();
  
    
    if(callfrom == 'super'){
    	
    	var valueService = $("#tdServicePer_1_"+masterId).val();
    	var valueService1 = $("#tdServicePer_2_"+masterId).val();
    	var valueService2 = $("#tdServicePer_3_"+masterId).val();
    	
    }
    
    if(callfrom == 'sub' && selfId !=0){
    	var valueSubService = $("#tdSubServicePer_1_"+selfId).val();
    	var valueSubService1 = $("#tdSubServicePer_2_"+selfId).val();
    	var valueSubService2 = $("#tdSubServicePer_3_"+selfId).val();	
    }
    var callFromCheck = $("#callFrom").val(); 
    
    // start For sub Services
    if(callfrom == 'super'){
	   $(".dept").each(function() {
			
			//set values for service
		  
			$(".mstService_1_"+masterId).map(function() {

				return $(this).val(valueService);
			}).get();
			

			//set values for sub-service
			$(".mstSubService_1_"+masterId).map(function() {
				return $(this).val(valueService);
			}).get();
			
			// 2
			//set values for service
			$(".mstService_2_"+masterId).map(function() {

				return $(this).val(valueService1);
			}).get();

			//set values for sub-service
			$(".mstSubService_2_"+masterId).map(function() {
				return $(this).val(valueService1);
			}).get();
			
			// 3
			//set values for service
			$(".mstService_3_"+masterId).map(function() {

				return $(this).val(valueService2);
			}).get();

			//set values for sub-service
			$(".mstSubService_3_"+masterId).map(function() {
				return $(this).val(valueService2);
			}).get();
		});	
     
	   // end For sub Services
	
  
	   
   }
    else if(callfrom == 'sub'){
 	   $(".dept").each(function() {
 			
 			//set values for service
 		
 			$(".mstSubService_1_"+selfId).map(function() {

 				return $(this).val(valueSubService);
 			}).get();
 			

 			//set values for sub-service
 			$(".mstSubService_1_"+selfId).map(function() {
 				return $(this).val(valueSubService);
 			}).get();
 			
 			// 2
 			//set values for service
 			$(".mstSubService_2_"+selfId).map(function() {

 				return $(this).val(valueSubService1);
 			}).get();

 			//set values for sub-service
 			$(".mstSubService_2_"+selfId).map(function() {
 				return $(this).val(valueSubService1);
 			}).get();
 			
 			// 3
 			//set values for service
 			$(".mstSubService_3_"+selfId).map(function() {

 				return $(this).val(valueSubService2);
 			}).get();

 			//set values for sub-service
 			$(".mstSubService_3_"+selfId).map(function() {
 				return $(this).val(valueSubService2);
 			}).get();
 		});	
      
 	   // end For sub Services
 	
   
 	   
    }
    
    else{
    	
  //if(subserviceHiddenIdvalue == off){
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

/*******************************************************************************
 * @author :IRFAN KHAN
 * @Date :19-01-2017
 * @Code :To save percentage from new UI
 ******************************************************************************/
function savePercentMaster2() {
	var unitId = $("#unitId").val();
	var doctorId = $("#txtDoctorId").val();
	// var doctorName = $("#doctorName").val();
	// var unitName = $("#unitId option:selected").text();
	var callFrom = $("#callFrom").val();
	var caseType = $("input[name=refByRadio]:checked").val();
	var drDeptId = $("#drDeptId").val();

	// For Charges Id
	var chargesId = $("#lisH0").val();// chargesId
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItemsinfo li").length;
	chargesSlaveId = $("#lisH" + (liSize - 1)).val();

	if (unitId == null || unitId == undefined || unitId == "") {
		unitId = 0;
	}

	if (doctorId == null || doctorId == undefined || doctorId == "") {
		doctorId = 0;
	}

	if (chargesId == null || chargesId == undefined || chargesId == "") {
		chargesId = 0;
	}

	if (chargesSlaveId == null || chargesSlaveId == undefined
			|| chargesSlaveId == "") {
		chargesSlaveId = 0;
	}

	if (drDeptId == null || drDeptId == undefined || drDeptId == "") {
		drDeptId = 0;
	}

	if(unitId == 0){
		chargesId = 0;
		chargesSlaveId = 0;
		caseType = 0;
	}
	var percentMasterList = {
		listPerMaster : []
	};

	$(".dept").each(function() {
		var deptid = parseInt($(this).val());
		// console.log("-------------Dept Start"+deptid+"---------------");

		var serIdList = $(".dept" + deptid + "ServId").map(function() {
	
			return $(this).val();
		}).get();

		// console.log(seridLis);

		var serIdListPer = $(".dept" + deptid + "ServPer").map(function() {
			
			if($(this).val() == ""  || $(this).val() == null || $(this).val() == undefined){
				$(this).val(0);
			}
			return $(this).val();
		}).get();

		// console.log(seridLisPer);

		var subSerIdList = $(".dept" + deptid + "SubId").map(function() {

			return $(this).val();
		}).get();

		// console.log(subidLis);
		console.log("a====="+subSerIdList);
		var subSerIdListPer = $(".dept" + deptid + "SubPer").map(function() {

			if($(this).val() == ""  || $(this).val() == null || $(this).val() == undefined){
				$(this).val(0);
			}
			return $(this).val();
		}).get();

		percentMasterList.listPerMaster.push({
			deptId : deptid,
			unitId : unitId,
			doctorId : doctorId,
			caseType : caseType,
			chargesId : chargesId,
			chargesSlaveId : chargesSlaveId,
			drDeptId : drDeptId,
			// srvList : [ {
			serIdList : serIdList,
			serIdListPer : serIdListPer,
			// } ],
			// subSrvList : [ {
			subSerIdList : subSerIdList,
			subSerIdListPer : subSerIdListPer
		// } ]
		});

	});

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

	var str = inputs.join('&');

	$('#pleaseWait').show();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/savePercentMaster2",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			$('#pleaseWait').hide();
			resetProfeesPercentMaster();
			// fetchPercentRecords();
			$("#callFrom").val("insert");
			window.location.reload(true);
		}
	});
}

/*******************************************************************************
 * @author :IRFAN KHAN
 * @Date :13-02-2018
 * @Code :To fetch all sub services under services on click edit mode
 ******************************************************************************/
function fetchAndSetSubServiceOnEdit(serviceId) {

	var callFrom = $("#callFrom").val();
	if(callFrom == "update"){
		var doctorId = $("#txtDoctorId").val();
		var drDeptId = $("#drDeptId").val();
		var unitId = $("#unitId").val();
		var caseType = $("input[name=refByRadio]:checked").val();

		// For Charges Id
		var chargesId = $("#lisH0").val();// chargesId
		var chargesSlaveId = 0;// static chargesSlaveId
		var liSize = $("#dynamicItemsinfo li").length;
		chargesSlaveId = $("#lisH" + (liSize - 1)).val();
		
		if (unitId == null || unitId == undefined || unitId == "") {
			unitId = 0;
		}

		if (doctorId == null || doctorId == undefined || doctorId == "") {
			doctorId = 0;
		}

		if (chargesId == null || chargesId == undefined || chargesId == "") {
			chargesId = 0;
		}

		if (chargesSlaveId == null || chargesSlaveId == undefined
				|| chargesSlaveId == "") {
			chargesSlaveId = 0;
		}

		if (drDeptId == null || drDeptId == undefined || drDeptId == "") {
			drDeptId = 0;
		}
		
		if(unitId == 0){
			chargesId = 0;
			chargesSlaveId = 0;
			caseType = 0;
		}
		/*var subSerIdList;
		$(".dept").each(function() {
			var deptid = parseInt($(this).val());
			// console.log("-------------Dept Start"+deptid+"---------------");

			subSerIdList = $(".dept" + deptid + "SubId").map(function() {

				return $(this).val();
			}).get();
		});*/
		/*alert("Service="+ServiceId+"==doctorId=="+doctorId+"==drDeptId=="+drDeptId+"==unitId=="+unitId+"==caseType=="+caseType
		+"==chargesId=="+chargesId+"==chargesSlaveId=="+chargesSlaveId);
		return false;*/
		
		jQuery.ajax({
			type : "POST",
			async : false,
			
			url : "ehat/profees/fetchAndSetSubServiceOnEdit",
			data : {
				"serviceId" : parseInt(serviceId),
				"doctorId" : parseInt(doctorId),
				"drDeptId" : parseInt(drDeptId),
				"unitId" : parseInt(unitId),
				"caseType" : parseInt(caseType),
				"chargesId" : parseInt(chargesId),
				"chargesSlaveId" : parseInt(chargesSlaveId)
				
			},
			success : function(r) {
				
				//alert(r.listPerSlave.length);
				//console.log(r);
				//setSubServices(r, masterId, serviceIdeach, callfrom, selfId);
				//setTimeout(() => {   
					for(var i=0;i<r.listPerSlave.length;i++){
						
						$("#tdSubServicePer_"+r.listPerSlave[i].deptId+"_"+r.listPerSlave[i].subServiceId).val(r.listPerSlave[i].hospPercent);
						
					}
				//}, 100);
				//}, 300); // rrrrrrrrrrrr 09-02-2024
				
			}
		});
	
	}
}

//Irfan khan-- Fetching super master of service based on there id 12-Mar-2018
function fetchSuperCatPrcentMaster(chargesMasterDto) {

	//alert(chargesMasterDto);
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : parseInt(chargesMasterDto)
		},
		
		url : "ehat/profees/fetchSuperCatPrcentMaster",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
		//	setDynamicDivSuperCat('dynamicItemsinfo',response);
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

//Irfan khan-- for setting data on select box master elemen- 12-Mar-2018
function setDynamicDivSuperCat(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
        var isCategory = response.lstChargesSlave[i].isCategory;
		
		if (isCategory == "Y") {
		 htm = htm+ '<li class="select2-search-choice" id="liItmes'
			+ i
			+ '">'
			+ '<div>'
			+ name+'(C)'
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInputSponsorLeaf('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lis' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
	}else{
		 htm = htm+ '<li class="select2-search-choice" id="liItmes'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInputSponsorLeaf('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lis' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
	}
		}
	$('#' + setDiv).html(htm);
}

function removeInputSponsorLeaf(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmes' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster();
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

//Irfan khan 15-mar-2018 onkeyup = fill all service percentage
function chkClickFillAll(deptid){
	
	//accept value to set in all field
	var value = $("#thDeptPer_" + deptid).val();
	
	$(".dept").each(function() {
		
		//set values for service
		$(".dept" + deptid + "ServPer").map(function() {

			return $(this).val(value);
		}).get();

		//set values for sub-service
		$(".dept" + deptid + "SubPer").map(function() {

			return $(this).val(value);
		}).get();
	});
}

//irfan khan 28-june-2019 AreaWise patient report
function areaWisePatientReport() {
	//alert("in");
	
	var townId = $("#townId").val();
	var talukaId = $("#talukaId").val();
	var districtId = $("#districtId").val();
	var stateId = $("#stateId").val();
	
	if(townId == null || townId == "" || townId == undefined){
		townId = 0;
	}
	if(talukaId == null || talukaId == "" || talukaId == undefined){
		talukaId = 0;
	}
	if(districtId == null || districtId == "" || districtId == undefined){
		districtId = 0;
	}
	if(stateId == null || stateId == "" || stateId == undefined){
		stateId = 0;
	}

	var inputs = [];
	
	inputs.push('townId=' + townId);
	inputs.push('talukaId=' + talukaId);
	inputs.push('districtId=' + districtId);
	inputs.push('stateId=' + stateId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/areaWisePatientReport",
		error : function() {
			alert('Network Issue!!!');
		},
				success : function(r) {

					// alert(r.listAreaWisePatientView.length);
					var list = r.listAreaWisePatientView;

					var htmBody = "";
					var htm = "<tr style='background-color: #EEEEEE'><th colspan='3' left>"
							+ "SHRADDHA HOSPITAL"
							+ "<br><br>PATIENT REPORT AREA WISE<br><br>"
							// + fromDate
							// + "</b><br> To : <b>"
							// + toDate
							// + "</b><br>Doctor Name : <b>"
							// + doctorName
							+ "</th></tr>";

					htm = htm
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th class='col-md-1'>Patient Id"
							+ "</th><th class='col-md-2'>Patient Name"
							+ "</th><th class='col-md-1'>DOB"
							+ "</th><th class='col-md-2'>Age"
							+ "</th><th class='col-md-1'>Gender"
							+ "</th><th class='col-md-1'>Mobile"
							+ "</th><th class='col-md-1'>Mrn.No."
							+ "</th><th class='col-md-1'>Address"
							+ "</th><th class='col-md-1'>Town"
							+ "</th><th class='col-md-1'>Taluka"
							+ "</th><th class='col-md-1'>District"
							+ "</th><th class='col-md-1'>State"
							+ "</th><th class='col-md-1'>Area Code"
							

							+ "</th></tr>";

					if (list.length == 0) {

						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='17' class='center'>No Record Found...!!!</th></tr>";

					} else {
						// console.log(r);
						for ( var i = 0; i < list.length; i++) {

							htmBody = htmBody + "<tr>"
									+ "<td class='col-md-1'>" + (i + 1)
									+ "<td class='col-md-1'>"
									+ list[i].patientId
									+ "<td class='col-md-2'>" + list[i].prefix
									+ " " + list[i].fName + " " + list[i].mName + " " + list[i].lName
									+ "<td class='col-md-1'>" + list[i].dob
									+ "<td class='col-md-2'>" + list[i].age +" Y / "+ list[i].ageMonths +" M / "+ list[i].ageDays +" D"
									+ "<td class='col-md-1'>" + list[i].gender 
									+ "<td class='col-md-1'>" + list[i].mobile 
									+ "<td class='col-md-1'>" + list[i].mrnno 
									+ "<td class='col-md-1'>" + list[i].address 
									+ "<td class='col-md-1'>" + list[i].cityName 
									+ "<td class='col-md-1'>" + list[i].talukaName 
									+ "<td class='col-md-1'>" + list[i].distName
									+ "<td class='col-md-1'>" + list[i].stateName
									+ "<td class='col-md-1'>" + list[i].areaCode

									// +"</td><td class='col-md-1'
									// align='right'>"+rateRtn.toFixed(2)

									+ "</td>" + "</tr>";
						}
					}

					$("#tableTestVoucherListHead").html(htm);
					$("#tableTestVoucherList").html(htmBody);
				}
	});
}





//Mohd Tarique Aalam 6-july-2018 AreaWise patient report2
function areaWisePatientReport2() {
	//alert("in");
	
	var townId = $("#townId").val();
	var talukaId = $("#talukaId").val();
	var districtId = $("#districtId").val();
	var stateId = $("#stateId").val();
	var diagnosis=$("#diagnosis").val();
	
	if(townId == null || townId == "" || townId == undefined){
		townId = 0;
	}
	if(talukaId == null || talukaId == "" || talukaId == undefined){
		talukaId = 0;
	}
	if(districtId == null || districtId == "" || districtId == undefined){
		districtId = 0;
	}
	if(stateId == null || stateId == "" || stateId == undefined){
		stateId = 0;
	}if(diagnosis == null || diagnosis == "" || diagnosis == undefined){
		diagnosis="withoutDiagnosis";
	}

	var inputs = [];
	
	inputs.push('townId=' + townId);
	inputs.push('talukaId=' + talukaId);
	inputs.push('districtId=' + districtId);
	inputs.push('stateId=' + stateId);
	inputs.push('diagnosis=' + diagnosis);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/areaWisePatientReport2",
		error : function() {
			alert('Network Issue!!!');
		},
				success : function(r) {

					// alert(r.listAreaWisePatientView.length);
					var list = r.listAreaWisePatientView;

					var htmBody = "";
					var htm = "<tr style='background-color: #EEEEEE'><th colspan='3' left>"
							+ "<br>PATIENT REPORT AREA WISE<br><br>"
							// + fromDate
							// + "</b><br> To : <b>"
							// + toDate
							// + "</b><br>Doctor Name : <b>"
							// + doctorName
							+ "</th></tr>";

					htm = htm
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th class='col-md-1' style='display:none'>Patient Id"
							+ "</th><th class='col-md-1' id='thCenterPatientId'>UHID"
							+ "</th><th class='col-md-2'>Patient Name"
							+ "</th><th class='col-md-1'>DOB"
							+ "</th><th class='col-md-2'>Age"
							+ "</th><th class='col-md-1'>Gender"
							+ "</th><th class='col-md-1'>Mobile"
							+ "</th><th class='col-md-1'>Mrn.No."
							+ "</th><th class='col-md-1'>Address"
							+ "</th><th class='col-md-1'>Town"
							+ "</th><th class='col-md-1'>Taluka"
							+ "</th><th class='col-md-1'>District"
							+ "</th><th class='col-md-1'>State"
							+ "</th><th class='col-md-1'>Area Code"
							

							+ "</th></tr>";

					if (list.length == 0) {

						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='17' class='center'>No Record Found...!!!</th></tr>";

					} else {
						// console.log(r);
						for ( var i = 0; i < list.length; i++) {

							htmBody = htmBody + "<tr>"
									+ "<td class='col-md-1'>" + (i + 1)
									+ "<td class='col-md-1' style='display:none;'>"
									+ list[i].patientId
									+ "<td class='col-md-1'>"
									+ list[i].centerPatientId
									+ "<td class='col-md-2'>" + list[i].prefix
									+ " " + list[i].fName + " " + list[i].mName + " " + list[i].lName
									+ "<td class='col-md-1'>" + list[i].dob
									+ "<td class='col-md-2'>" + list[i].age +"Y/"+list[i].ageMonths +"M/"+ list[i].ageDays +"D"
									+ "<td class='col-md-1'>" + list[i].gender 
									+ "<td class='col-md-1'>" + list[i].mobile 
									+ "<td class='col-md-1'>" + list[i].mrnno 
									+ "<td class='col-md-1'>" + list[i].address 
									+ "<td class='col-md-1'>" + list[i].cityName 
									+ "<td class='col-md-1'>" + list[i].talukaName 
									+ "<td class='col-md-1'>" + list[i].distName
									+ "<td class='col-md-1'>" + list[i].stateName
									+ "<td class='col-md-1'>" + list[i].areaCode

									// +"</td><td class='col-md-1'
									// align='right'>"+rateRtn.toFixed(2)

									+ "</td>" + "</tr>";
						}
					}

					$("#tableTestVoucherListHead").html(htm);
					$("#tableTestVoucherList").html(htmBody);
				}
	});
}



/* Mohd Tarique Aalam Mohd Rasool */
function setDiagnosisAutocompleteAreaWise(inputID, onload) {
	var resultData = [];
	var auto = "DiagnosisForAssessment2";
	var findingName = $("#" + inputID).val();
	var data; // 'data=' + 'diagno_description'
	var radio = $("input:radio[name=ICD]:checked").val();  //Added By Pooja @Date:19 Apr 2018
	if (inputID == "diagnosis") {
		data = 'diagnosisName';
	} else {
		data = 'diagno_description';
	}

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('data=' + data);
	inputs.push('q=' + findingName);
	inputs.push('radio=' + radio);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AutoSuggetionServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			var availableTags = [];
			availableTags = ajaxResponse.split("\n");
			if (availableTags.length == 0) {
				$("#EditFlag").val(0);
			}
			var template = "";
			for ( var j = 0; j < availableTags.length; j++) {
				var arrValue = (availableTags[j]).split("__");
				var idValue = (arrValue[2]);
				resultData.push({
					ID : idValue,
					Name : arrValue[0]
				});

				if (inputID == "diagnosis") { // Diagnosis name
					template = template + '<li data-value="' + arrValue[1]
							+ "_" + arrValue[2] + '" class=""><a href="#">'
							+ arrValue[0] + '</a></li>';
				} else { // Diagnosis Description
					template = template + '<li data-value="' + arrValue[0]
							+ "_" + arrValue[2] + '" class=""><a href="#">'
							+ arrValue[1] + '</a></li>';
				}
			}

			setTimeout(function() {

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
	});

	function displayResult(item) {
		// var arrItem = ((item.value).trim()).split("_");
		// var inputID = (arrItem[2]).trim();

		if (inputID == "diagnosis") {
			$("#diagnosis").val((item.text).trim());
			/*$("#diagno_description").val((item.value).trim().split("_")[0]);
			$("#icd10_code").val((item.value).trim().split("_")[1]);
			$("#EditFlag").val(1);*/
		} else {
/*			$("#diagno_description").val((item.text).trim());
			$("#diagnosis").val((item.value).trim().split("_")[0]);
			$("#icd10_code").val((item.value).trim().split("_")[1]);
			$("#EditFlag").val(1);*/
		}
		// $("#icd10_code").val((arrItem[1]).trim());

	}
}

//Irfan khan 21-Sep-2018 Canceled Admission records
function canceledAdmissionRecords() {
	var fromDate = ($("#inputFromDate").val()).split("/");
	var fDate = (fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);  // added by sandip
	var toDate = ($("#inputToDate").val()).split("/");
	var tDate = (toDate[2] + "-" + toDate[1] + "-" + toDate[0]);

	if (fDate == "" || fDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (tDate == "" || tDate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	
	var inputs = [];

	inputs.push('fromDate=' + fDate);
	inputs.push('toDate=' + tDate);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/canceledAdmissionRecords",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					
					
					var htmBody = "";
					var htm = "<tr style='background-color: #EEEEEE'><th colspan='2' left>"
							//+ "SHRADDHA HOSPITAL<br>"
							+ "Canceled Admission Report<br>";
					htm = htm + "From  : <b>"+fDate
					+ "</b><br> To  : <b>"
					+ tDate +"</b>";
				htm = htm	+ "</th></tr>";

					htm = htm
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO</th>"
							+ "<th class='col-md-1' style='display:none;'>Patient Id"
							+ "<th class='col-md-1' id='thCenterPatientId'>UHID"
							+ "</th><th class='col-md-3'>Patient Name"
							+ "</th><th class='col-md-1'>Admission No."
							+ "</th><th class='col-md-3'>Canceled By"
							+ "</th><th class='col-md-1'>Canceled Date Time"
							+ "</th><th class='col-md-1'>Canceled Narration"

							+ "</th></tr>";

					if (r.listTreatment.length == 0) {

						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='7' class='center'>No Record Found...!!!</th></tr>";

					} else {
						// console.log(r);
						for ( var i = 0; i < r.listTreatment.length; i++) {
							var list = r.listTreatment[i];
							var cancelDate = new Date(list.cancelDate).toLocaleDateString();
							htmBody = htmBody
									+ "<tr>"
									+ "<td class='col-md-1'>"
									+ (i + 1)
									+ "</td><td class='col-md-1'>"
									+ list.centerPatientId
									+ "</td><td class='col-md-1'  style='display:none;'>"
									+ list.patientId
									+ "</td><td class='col-md-3'>"
									+ list.patientName
									+ "</td><td class='col-md-1'>"
									+ list.opdipdno
									+ "</td><td class='col-md-3'>"
									+ list.userName
									+ "</td><td class='col-md-3'>"
									+ cancelDate+" "+list.cancelTime
									+ "</td><td class='col-md-3'>"
									+ list.cancelNarration
									+ "</td>"
									+ "</tr>";
						}
					}

					$("#tableTestVoucherListHead").html(htm);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}

function setSubServPer(deptId,servId){
		
	var perVal = $("#tdServicePer_"+deptId+"_"+servId).val();		
	$(".mstService_"+deptId+"_"+servId).val(perVal);
}

function setSubLeafServPer(deptId,servId){
	
	//var subHiddenId = $("#subHiddenId").val();
	var subHiddenId = servId;
	var perVal = $("#tdSubServicePer_"+deptId+"_"+subHiddenId).val();			
	$(".mstSubService_"+deptId+"_"+subHiddenId).val(perVal);
}

function setSubIdHidden(subId){
	
	$("#subHiddenId").val(subId);
}

//Ajay khandare 1-july-2019 getMonthyHospitalActivitiesReport
function getMonthyHospitalActivitiesReport() {

	var fromYear = $("#FromYear").val();
	var fromMonth = $("#FromMonth").val();


         	var inputs = [];
			inputs.push('fromYear=' + encodeURIComponent(fromYear));
			inputs.push('fromMonth=' + encodeURIComponent(fromMonth));


			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/getMonthyHospitalReport",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					
					var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th class='col-md-1'>Indicator"
							+ "</th><th class='col-md-1'>During Month"
							+ "</th><th class='col-md-1'>Prog"
							+ "</th></tr>";

					if (r.listTreatment.length == 0 || r.listTreatment.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {

						for ( var i = 0; i < r.listTreatment.length; i++) {

							htmBody = htmBody + "<tr style='height:21px;'>"
									+ "<td class='col-md-1'>" + (i + 1)
									+ "</td>";
									if(i==0){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " OPD"
										+ "</td>";
									}else if(i==1){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " IPD"
										+ "</td>";
									}else if(i==2){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Minor"
										+ "</td>";
									}else if(i==3){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Major+Supramajor"
										+ "</td>";
									}else if(i==4){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " X-Ray"
										+ "</td>";
									}else if(i==5){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Sonography"
										+ "</td>";
									}else if(i==6){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " ECG"
										+ "</td>";
									}
									htmBody = htmBody + "<td class='col-md-1'>"
									+ r.listTreatment[i].monthlycount
									+ "</td>";
								   htmBody = htmBody + "<td class='col-md-1'>"
									+ r.listTreatment[i].progressivecount
									+ "</td></tr>";
						}
					}
					
					
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}
//Ajay khandare 3-july-2019 getYearWiseAndFundInformationReport
function getYearWiseAndFundInformationReport() {

	var fromYear = $("#FromYear").val();
	var fromMonth = $("#ToYear").val();


         	var inputs = [];
			inputs.push('fromYear=' + encodeURIComponent(fromYear));
			inputs.push('ToYear=' + encodeURIComponent(fromMonth));


			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/getyearWiseAndFundInfomationHospitalReport",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					
					var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th class='col-md-1'>Activity"
							+ "</th><th class='col-md-1'>Years"
							+ "</th></tr>";

					if (r.listTreatment.length == 0 || r.listTreatment.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {

						for ( var i = 0; i < r.listTreatment.length; i++) {
						var sum = parseInt(r.listTreatment[5].monthlycount)+parseInt(r.listTreatment[6].monthlycount);
						var sumrevenue = parseInt(r.listTreatment[8].monthlycount)+parseInt(r.listTreatment[9].monthlycount);
						
						
							htmBody = htmBody + "<tr style='height:21px;'>"
									+ "<td class='col-md-1'>" + (i + 1)
									+ "</td>";
							
									if(i==0){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " OPD"
										+ "</td>";
									}else if(i==1){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " IPD"
										+ "</td>";
									}else if(i==2){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " UroSurgery"
										+ "</td>";
									}else if(i==3){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Predatic Surgery"
										+ "</td>";
									}else if(i==4){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Plastic Surgery"
										+ "</td>";
									}else if(i==5){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Total Revenue Generation"
										+ "</td>";
									}else if(i==6){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Total Cases under Mahatma J. Fule Jan Arogya Yojna"
										+ "</td>";
									}else if(i==7){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ "Total Revenue under Mahatma J. Fule Jan Arogya Yojna"
										+ "</td>";
								    }
							
						     if (i == 0) {
								htmBody = htmBody + "<td class='col-md-1'>"
										+ r.listTreatment[i].monthlycount
										+ "</td>";
							} else if (i == 1) {
								htmBody = htmBody + "<td class='col-md-1'>"
										+ r.listTreatment[i].monthlycount
										+ "</td>";
							} else if (i == 2) {
								htmBody = htmBody + "<td class='col-md-1'>"
										+ r.listTreatment[i].monthlycount
										+ "</td>";
							} else if (i == 3) {
								htmBody = htmBody + "<td class='col-md-1'>"
										+ r.listTreatment[i].monthlycount
										+ "</td>";
							} else if (i == 4) {
								htmBody = htmBody + "<td class='col-md-1'>"
										+ r.listTreatment[i].monthlycount
										+ "</td>";
							} else if (i == 5) {
								htmBody = htmBody + "<td class='col-md-1'>"
										+ sum + " Rs.</td>";
							} else if (i == 6) {
								htmBody = htmBody + "<td class='col-md-1'>"
										+ r.listTreatment[7].monthlycount
										+ "</td>";

							} else if (i == 7) {
								htmBody = htmBody + "<td class='col-md-1'>"
										+ sumrevenue + " Rs.</td>";

							}
								   
						}
					}
					
					
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}
//Ajay khandare 22-july-2019 getPerformanceReport
function getMonthyHospitalActivitiesPerformanceReport() {
	
	var fromYear = $("#FromYear").val();
	var fromMonth = $("#FromMonth").val();


         	var inputs = [];
			inputs.push('fromYear=' + encodeURIComponent(fromYear));
			inputs.push('fromMonth=' + encodeURIComponent(fromMonth));


			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/getMonthyHospitalActivitiesPerformanceReport",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					
					var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th class='col-md-1'>Indicator"
							+ "</th><th class='col-md-1'>During Month"
							+ "</th><th class='col-md-1'>Prog"
							+ "</th></tr>";

					if (r.listTreatment.length == 0 || r.listTreatment.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {

						for ( var i = 0; i < r.listTreatment.length; i++) {

							htmBody = htmBody + "<tr style='height:21px;'>"
									+ "<td class='col-md-1'>" + (i + 1)
									+ "</td>";
									if(i==0){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " OPD"
										+ "</td>";
									}else if(i==1){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " IPD"
										+ "</td>";
									}else if(i==2){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ "ICU Admissions"
										+ "</td>";
									}else if(i==3){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " NICU Admissions"
										+ "</td>";
									}else if(i==4){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Lithoripsy"
										+ "</td>";
									}else if(i==5){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " X-RAY + IVP"
										+ "</td>";
									}else if(i==6){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Sonography"
										+ "</td>";
									}else if(i==7){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Colour Dopper Study"
										+ "</td>";
									}else if(i==8){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ "Labs Investigations"
										+ "</td>";
									}else if(i==9){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ "M.J Phule Jan Arogya Scheme Camp"
										+ "</td>";
									}else if(i==10){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Operation(total)"
										+ "</td>";
									}else if(i==11){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Uro Surgery "
										+ "</td>";
									}else if(i==12){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Uro SupraMajor"
										+ "</td>";
									}else if(i==13){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Uro major"
										+ "</td>";
									}else if(i==14){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Uro Minor"
										+ "</td>";
									}else if(i==15){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Paediatric Surgery"
										+ "</td>";
									}else if(i==16){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Paediatric SupraMajor"
										+ "</td>";
									}else if(i==17){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Paediatric Major"
										+ "</td>";
									}else if(i==18){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Paediatric Minor"
										+ "</td>";
									}else if(i==19){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Plastic Surgery"
										+ "</td>";
									}else if(i==20){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ "Plastic SupraMajor"
										+ "</td>";
									}else if(i==21){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Plastic Major"
										+ "</td>";
									}else if(i==22){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ "Plastic Minor"
										+ "</td>";
									}else if(i==23){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Total SupraMajor "
										+ "</td>";
									}else if(i==24){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ "Total Major"
										+ "</td>";
									}else if(i==25){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ "Total Minor"
										+ "</td>";
									}
									htmBody = htmBody + "<td class='col-md-1'>"
									+ r.listTreatment[i].monthlycount + "</td>";
							        htmBody = htmBody + "<td class='col-md-1'>"
									+ r.listTreatment[i].progressivecount
									+ "</td></tr>";
								 
						}
					}
					
					
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}



//Ajay khandare 23-july-2019 getMonthyAndprogresiveHospitalActivitiesReport
function getMonthyHospitalAndProgresiveActivities1() {

	var fromYear = $("#FromYear").val();
	var fromMonth = $("#FromMonth").val();


       	var inputs = [];
			inputs.push('fromYear=' + encodeURIComponent(fromYear));
			inputs.push('fromMonth=' + encodeURIComponent(fromMonth));


			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/getMonthyAndProgresiveHospitalReport1",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					
					var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th class='col-md-1'>Indicator"
							+ "</th><th class='col-md-1'>During Month"
							+ "</th><th class='col-md-1'>Prog"
							+ "</th></tr>";

					if (r.listTreatment.length == 0 || r.listTreatment.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {

						for ( var i = 0; i < r.listTreatment.length; i++) {
							
							
						
							htmBody = htmBody + "<tr style='height:21px;'>"
									+ "<td class='col-md-1'>" + (i + 1)
									+ "</td>";
							          if(i==0){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " New OPD"
										+ "</td>";
									}else if(i==1){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " OLD OPD"
										+ "</td>";
									}else if(i==2){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ "Total OPD "
										+ "</td>";
									}else if(i==3){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ "Avg.OPD per day"
										+ "</td>";
									}else if(i==4){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " IPD"
										+ "</td>";
									}else if(i==5){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " minor"
										+ "</td>";
									}else if(i==6){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Major+Supramajor"
										+ "</td>";
									}else if(i==7){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " X-ray"
										+ "</td>";
									}else if(i==8){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " Lab Test Performed"
										+ "</td>";
									}else if(i==9){
										htmBody = htmBody +	"<td class='col-md-1'>" 
										+ " LAMA"
										+ "</td>";
									}
							          
							          if (i == 0) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].monthlycount
													+ "</td>";
										} else if (i == 1) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].oldpatient
													+ "</td>";
										} else if (i == 2) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].monthlycount
													+ "</td>";
										} else if (i == 3) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].avgpatientopd
													+ "</td>";
										} else if (i == 4) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].monthlycount
													+ "</td>";
										} else if (i == 5) {
											htmBody = htmBody + "<td class='col-md-1'>"
											           + r.listTreatment[i].monthlycount
											           + "</td>";
										} else if (i == 6) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].monthlycount
													+ "</td>";

										} else if (i == 7) {
											htmBody = htmBody + "<td class='col-md-1'>"
											         + r.listTreatment[i].monthlycount
											         +  "</td>";
	   
										}else if (i == 8) {
										htmBody = htmBody + "<td class='col-md-1'>"
								         + r.listTreatment[i].monthlycount
								         +  "</td>";
						                }else if (i == 9) {
											htmBody = htmBody + "<td class='col-md-1'>"
									         + r.listTreatment[i].monthlycount
									         +  "</td>";
							                }
							          
							          
							        
							          if (i == 0) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].progressivecount
													+ "</td>";
										} else if (i == 1) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].oldpatientprogresive
													+ "</td>";
										} else if (i == 2) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].progressivecount
													+ "</td>";
										} else if (i == 3) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].avgpatientopdprogresive
													+ "</td>";
										} else if (i == 4) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].progressivecount
													+ "</td>";
										} else if (i == 5) {
											htmBody = htmBody + "<td class='col-md-1'>"
											           + r.listTreatment[i].progressivecount
											           + "</td>";
										} else if (i == 6) {
											htmBody = htmBody + "<td class='col-md-1'>"
													+ r.listTreatment[i].progressivecount
													+ "</td>";

										} else if (i == 7) {
											htmBody = htmBody + "<td class='col-md-1'>"
											         + r.listTreatment[i].progressivecount
											         +  "</td>";
	   
										}else if (i == 8) {
										htmBody = htmBody + "<td class='col-md-1'>"
								         + r.listTreatment[i].progressivecount
								         +  "</td>";
						                } else if (i == 9) {
											htmBody = htmBody + "<td class='col-md-1'>"
									         + r.listTreatment[i].progressivecount
									         +  "</td>";
							                }   
							          
							    
						}
					}
					
					
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}
function proFeesResetRep(){
	$("#byName").val("");
	$("#txtDoctorId").val("0");
	$("#groupId").val("0");
	$("#inputFromDate").val("");
	$("#inputToDate").val("");
	$("#txtSelectServiceReport").val("all");
	$("#inputTotalamt").val("");
	$('#tableTestVoucherListHead').empty();
	$('#tableTestVoucherList').empty();
	$("#radioAll").prop("checked", true);
}

//Ajay khandare 3-july-2019 getOPDIPDOperationSpecilitywiseReport
function getOPDIPDOperationSpecilitywiseReport1() {

	var fromMonth = $("#FromMonth").val();
	var fromYear = $("#FromYear").val();


         	var inputs = [];
			inputs.push('fromMonth=' + encodeURIComponent(fromMonth));
			inputs.push('fromYear=' + encodeURIComponent(fromYear));


			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/getOPDIPDOperationSpecilitywiseReport1",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					
					var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th colspan='1' class='col-md-1'>Indicator"
						    + "</th><th colspan='1' class='col-md-1'>"
							+ "</th><th colspan='3' class='col-md-1'>OPD"
							+ "</th><th colspan='3' class='col-md-1'>IPD"
							+ "</th><th colspan='4' class='col-md-1'>OPERATION"
							+ "</th></tr>";
					
					htmHead = htmHead
					+ "<tr style='background-color: #EEEEEE'><th>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
				
					+ "</th><th  class='col-md-1'>Male"
					+ "</th><th  class='col-md-1'>Female"
					+ "</th><th  class='col-md-1'>Total"
					+ "</th><th  class='col-md-1'>Male"
					+ "</th><th  class='col-md-1'>Female"
					+ "</th><th  class='col-md-1'>Total"
					+ "</th><th  class='col-md-1'>SupraMajor"
					+ "</th><th  class='col-md-1'>Major"
					+ "</th><th  class='col-md-1'>Minor"
					+ "</th><th  class='col-md-1'>Total"
					+ "</th></tr>";

					if (r.listTreatment.length == 0 || r.listTreatment.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {
						
						htmBody = htmBody + "<tr style='height:21px;'>"
								+ "<td  rowspan='2'  class='col-md-1'>1</td>"
								+ "<td rowspan='2' class='col-md-1'>Nephrology & Urology</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].monthlycount+"</td><td class='col-md-1'> "+r.listTreatment[1].monthlycount+"</td><td class='col-md-1'>"+r.listTreatment[2].monthlycount+" </td><td class='col-md-1'>"+r.listTreatment[3].monthlycount+"</td><td class='col-md-1'>"+r.listTreatment[4].monthlycount+"</td><td class='col-md-1'>"+r.listTreatment[5].monthlycount+"</td><td class='col-md-1'>"+r.listTreatment[6].monthlycount+" </td><td class='col-md-1'>"+r.listTreatment[7].monthlycount+" </td><td class='col-md-1'>"+r.listTreatment[8].monthlycount+" </td><td class='col-md-1'>"+r.listTreatment[9].monthlycount+" </td></tr>" 
							                                                       	+ "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[1].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[2].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[3].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[4].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[5].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[6].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[7].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[8].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[9].progressivecount+"</td></tr>";
							
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>2</td>"
						+ "<td rowspan='2' class='col-md-1'>Plastic Surgery</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].deptMonthCountplastic+"</td><td class='col-md-1'> "+r.listTreatment[1].deptMonthCountplastic+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthCountplastic+" </td><td class='col-md-1'>"+r.listTreatment[3].deptMonthCountplastic+"</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthCountplastic+"</td><td class='col-md-1'>"+r.listTreatment[5].deptMonthCountplastic+"</td><td class='col-md-1'>"+r.listTreatment[6].deptMonthCountplastic+" </td><td class='col-md-1'>"+r.listTreatment[7].deptMonthCountplastic+" </td><td class='col-md-1'>"+r.listTreatment[8].deptMonthCountplastic+" </td><td class='col-md-1'>"+r.listTreatment[9].deptMonthCountplastic+" </td></tr>" 
						                                                 + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[5].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[6].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[7].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[8].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[9].deptPrgCountPlastic+"</td></tr>";
						
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>3</td>"
						+ "<td rowspan='2' class='col-md-1'>Paediatric & NICU Surgery </td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].deptMonthCountPaediatric+"</td><td class='col-md-1'> "+r.listTreatment[1].deptMonthCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthCountPaediatric+" </td><td class='col-md-1'>"+r.listTreatment[3].deptMonthCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[5].deptMonthCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[6].deptMonthCountPaediatric+" </td><td class='col-md-1'>"+r.listTreatment[7].deptMonthCountPaediatric+" </td><td class='col-md-1'>"+r.listTreatment[8].deptMonthCountPaediatric+" </td><td class='col-md-1'>"+r.listTreatment[9].deptMonthCountPaediatric+" </td></tr>" 
						                                                            + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[5].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[6].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[7].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[8].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[9].deptPrgCountPaediatric+"</td></tr>";
						
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>4</td>"
						+ "<td rowspan='2' class='col-md-1'>NCD</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].deptMonthCountNCD+"</td><td class='col-md-1'> "+r.listTreatment[1].deptMonthCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthCountNCD+" </td><td class='col-md-1'>"+r.listTreatment[3].deptMonthCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[5].deptMonthCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[6].deptMonthCountNCD+" </td><td class='col-md-1'>"+r.listTreatment[7].deptMonthCountNCD+" </td><td class='col-md-1'>"+r.listTreatment[8].deptMonthCountNCD+" </td><td class='col-md-1'>"+r.listTreatment[9].deptMonthCountNCD+" </td></tr>" 
						                                     + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[5].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[6].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[7].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[8].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[9].deptPrgCountNCD+"</td></tr>";
						
						
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>5</td>"
						+ "<td rowspan='2' class='col-md-1'>Lithotripsy</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].lithomonthCount+"</td></tr>" 
						                                     + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].lithoprogcount+"</td></tr>";
						
						
						
					}
						
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}



//Ajay khandare 3-july-2019 getOPDIPDOperationSpecilitywiseReport
function getMonthlyOutPutFormatSpecilitywiseReport() {

	var fromMonth = $("#FromMonth").val();
	var fromYear = $("#FromYear").val();


         	var inputs = [];
			inputs.push('fromMonth=' + encodeURIComponent(fromMonth));
			inputs.push('fromYear=' + encodeURIComponent(fromYear));


			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/getMonthlyOutPutFormatSpecilitywiseReport",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					
					var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th colspan='1' class='col-md-1'>Speciality"
						    + "</th><th colspan='1' class='col-md-1'>"
							+ "</th><th colspan='3' class='col-md-1'>OPD Patient"
							+ "</th><th colspan='1' class='col-md-1'>IPD Patient"
						    + "</th><th colspan='1' class='col-md-1'>"
						    + "</th><th colspan='3' class='col-md-1'>OPERATION"
						    + "</th><th colspan='1' class='col-md-1'>"
						    + "</th><th colspan='8' class='col-md-1'>Revenue Generated (IPD)"
							
							+ "</th></tr>";
					
					htmHead = htmHead
					+ "<tr style='background-color: #EEEEEE'><th>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
				
					+ "</th><th  class='col-md-1'>New"
					+ "</th><th  class='col-md-1'>Old"
					+ "</th><th  class='col-md-1'>Total"
					+ "</th><th  class='col-md-1'>Total"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>Speciality"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>Major + Surpa Major"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>Speciality"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>Dailysis"
					+ "</th><th  class='col-md-1'>Urology"
					+ "</th><th  class='col-md-1'>Peadiatrics And NICU Surgeries"
					+ "</th><th  class='col-md-1'>ICU"
					+ "</th><th  class='col-md-1'>Plastic Surgeries"
				
		
					
					
					+ "</th></tr>";
					var totalmonthynew = r.listTreatment[0].monthlycount+r.listTreatment[0].deptMonthUrology+r.listTreatment[0].deptMonthCountPaediatric+r.listTreatment[0].deptMonthCountplastic+r.listTreatment[0].deptMonthCountNCD;
					var totalProgresivenew = r.listTreatment[0].progressivecount+r.listTreatment[0].deptPrgCountUrology+r.listTreatment[0].deptPrgCountPaediatric+r.listTreatment[0].deptPrgCountPlastic+r.listTreatment[0].deptPrgCountNCD;

					var totalmonthyold = r.listTreatment[1].monthlycount+r.listTreatment[1].deptMonthUrology+r.listTreatment[1].deptMonthCountPaediatric+r.listTreatment[1].deptMonthCountplastic+r.listTreatment[1].deptMonthCountNCD;
					var totalProgresiveold = r.listTreatment[1].progressivecount+r.listTreatment[1].deptPrgCountUrology+r.listTreatment[1].deptPrgCountPaediatric+r.listTreatment[1].deptPrgCountPlastic+r.listTreatment[1].deptPrgCountNCD;

				    var totalopdmonth = totalmonthynew +totalmonthyold;
				    var totalopdprog = totalProgresivenew + totalProgresiveold;
				   
				    var totalmonthyipd = r.listTreatment[3].monthlycount+r.listTreatment[3].deptMonthUrology+r.listTreatment[3].deptMonthCountPaediatric+r.listTreatment[3].deptMonthCountplastic+r.listTreatment[3].deptMonthCountNCD;
					var totalProgresiveipd = r.listTreatment[3].progressivecount+r.listTreatment[3].deptPrgCountUrology+r.listTreatment[3].deptPrgCountPaediatric+r.listTreatment[3].deptPrgCountPlastic+r.listTreatment[3].deptPrgCountNCD;

				
					var totalrevenuDailaysismonth = r.listTreatment[0].montDialysisnephor+r.listTreatment[0].montDialysisUro+r.listTreatment[0].montDialysisPedia+r.listTreatment[0].montDialysisPlastic;
					var totalrevenuDailaysisprogresive = r.listTreatment[0].progresiveDialysisnephro+r.listTreatment[0].progresiveDialysisUro+r.listTreatment[0].progresiveDialysisPedia+r.listTreatment[0].progresiveDialysisPlastic;

					var totalrevenuUROmonth = r.listTreatment[0].montUroNephor+r.listTreatment[0].montUroUro+r.listTreatment[0].montUroPedia+r.listTreatment[0].montUroPlastic;
					var totalrevenuURoprogresive = r.listTreatment[0].progresiveUroNephro+r.listTreatment[0].progresiveUroUro+r.listTreatment[0].progresiveUroPedia+r.listTreatment[0].progresiveUroPlastic;

					var totalrevenuPediamonth = r.listTreatment[0].montPeadiNephor+r.listTreatment[0].montPeadiUro+r.listTreatment[0].montPeadiPedia+r.listTreatment[0].montPeadiPlastic;
					var totalrevenuPeDiaprogresive = r.listTreatment[0].progresivePeadiNephro+r.listTreatment[0].progresivePeadiUro+r.listTreatment[0].progresivePeadiPedia+r.listTreatment[0].progresivePeadiPlastic;

					
					var totalrevenuICUmonth = r.listTreatment[0].montICUNephor+r.listTreatment[0].montICUUro+r.listTreatment[0].montICUPedia+r.listTreatment[0].montICUPlastic;
					var totalrevenuICuprogresive = r.listTreatment[0].progresiveICUNephro+r.listTreatment[0].progresiveICUUro+r.listTreatment[0].progresiveICUPedia+r.listTreatment[0].progresiveICUPlastic;

					var totalrevenuPlasticmonth = r.listTreatment[0].montPlasticNephor+r.listTreatment[0].montPlasticUro+r.listTreatment[0].montPlasticPedia+r.listTreatment[0].montPlasticPlastic;
					var totalrevenuPlasticprogresive = r.listTreatment[0].progresivePlasticNephro+r.listTreatment[0].progresivePlasticUro+r.listTreatment[0].progresivePlasticPedia+r.listTreatment[0].progresivePlasticPlastic;

					
					if (r.listTreatment.length == 0 || r.listTreatment.length == null || r.listTreatment.length == undefined) {
						// no records.
						
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {
						
						htmBody = htmBody + "<tr style='height:21px;'>"
								+ "<td  rowspan='2'  class='col-md-1'>1</td>"
								+ "<td rowspan='2' class='col-md-1'>Nephrology</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].monthlycount+"</td><td class='col-md-1'> "+r.listTreatment[1].monthlycount+"</td><td class='col-md-1'>"+r.listTreatment[2].monthlycount+" </td><td class='col-md-1'>"+r.listTreatment[3].monthlycount+"</td><td  class='col-md-1'></td><td rowspan='2' class='col-md-1'>Nephrology</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[4].monthlycount+"</td><td class='col-md-1'></td><td rowspan='2' class='col-md-1'> Nephrology</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].montDialysisnephor+"</td><td class='col-md-1'>"+r.listTreatment[0].montUroNephor+"</td><td class='col-md-1'>"+r.listTreatment[0].montPeadiNephor+"</td><td class='col-md-1'>"+r.listTreatment[0].montICUNephor+"</td><td class='col-md-1'>"+r.listTreatment[0].montPlasticNephor+"</td></tr>" 
							                                                       	+ "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[1].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[2].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[3].progressivecount+"</td><td class='col-md-1'></td><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[4].progressivecount+"</td><td class='col-md-1'></td><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].progresiveDialysisnephro+"</td><td class='col-md-1'>"+r.listTreatment[0].progresiveUroNephro+"</td><td class='col-md-1'>"+r.listTreatment[0].progresivePeadiNephro+"</td><td class='col-md-1'>"+r.listTreatment[0].progresiveICUNephro+"</td><td class='col-md-1'>"+r.listTreatment[0].progresivePlasticNephro+"</td></tr>";
							
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>2</td>"
						+ "<td rowspan='2' class='col-md-1'>Urology</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].deptMonthUrology+"</td><td class='col-md-1'> "+r.listTreatment[1].deptMonthUrology+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthUrology+" </td><td class='col-md-1'>"+r.listTreatment[3].deptMonthUrology+"</td><td class='col-md-1'></td><td rowspan='2'  class='col-md-1'>Urology</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthUrology+"</td><td class='col-md-1'></td><td  rowspan='2' class='col-md-1'>Urology</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].montDialysisUro+"</td><td class='col-md-1'>"+r.listTreatment[0].montUroUro+"</td><td class='col-md-1'>"+r.listTreatment[0].montPeadiUro+"</td><td class='col-md-1'>"+r.listTreatment[0].montICUUro+"</td><td class='col-md-1'>"+r.listTreatment[0].montPlasticUro+"</td><</tr>" 
					                                                       	+ "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountUrology+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountUrology+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountUrology+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountUrology+"</td><td class='col-md-1'></td><td  class='col-md-1'>Progresive</td>><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountUrology+"</td><td class='col-md-1'></td><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].progresiveDialysisUro+"</td><td class='col-md-1'>"+r.listTreatment[0].progresiveUroUro+"</td><td class='col-md-1'>"+r.listTreatment[0].progresivePeadiUro+"</td><td class='col-md-1'>"+r.listTreatment[0].progresiveICUUro+"</td><td class='col-md-1'>"+r.listTreatment[0].progresivePlasticUro+"</td></tr>";
				
						
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>3</td>"
						+ "<td rowspan='2' class='col-md-1'>Paediatric & NICU Surgery </td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].deptMonthCountPaediatric+"</td><td class='col-md-1'> "+r.listTreatment[1].deptMonthCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthCountPaediatric+" </td><td class='col-md-1'>"+r.listTreatment[3].deptMonthCountPaediatric+"</td><td class='col-md-1'></td> <td  rowspan='2' class='col-md-1'>Peadiatrics & NICU Surgeries </td> <td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthCountPaediatric+"</td><td class='col-md-1'></td><td  rowspan='2' class='col-md-1'>Peadiatrics & NICU Surgeries</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].montDialysisPedia+"</td><td class='col-md-1'>"+r.listTreatment[0].montUroPedia+"</td><td class='col-md-1'>"+r.listTreatment[0].montPeadiPedia+"</td><td class='col-md-1'>"+r.listTreatment[0].montICUPedia+"</td><td class='col-md-1'>"+r.listTreatment[0].montPlasticPedia+"</td></tr>" 
						                                                            + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountPaediatric+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountPaediatric+"</td><td class='col-md-1'></td><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountPaediatric+"</td><td class='col-md-1'></td><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].progresiveDialysisPedia+"</td><td class='col-md-1'>"+r.listTreatment[0].progresiveUroPedia+"</td><td class='col-md-1'>"+r.listTreatment[0].progresivePeadiPedia+"</td><td class='col-md-1'>"+r.listTreatment[0].progresiveICUPedia+"</td><td class='col-md-1'>"+r.listTreatment[0].progresivePlasticPedia+"</td></tr>";
						
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>4</td>"
						+ "<td rowspan='2' class='col-md-1'>Plastic Surgery</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].deptMonthCountplastic+"</td><td class='col-md-1'> "+r.listTreatment[1].deptMonthCountplastic+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthCountplastic+" </td><td class='col-md-1'>"+r.listTreatment[3].deptMonthCountplastic+"</td><td class='col-md-1'></td><td rowspan='2' class='col-md-1'> Plastic Surgeries</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthCountplastic+"</td><td class='col-md-1'></td><td  rowspan='2' class='col-md-1'> Plastic Surgeries </td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].montDialysisPlastic+"</td><td class='col-md-1'>"+r.listTreatment[0].montUroPlastic+"</td><td class='col-md-1'>"+r.listTreatment[0].montPeadiPlastic+"</td><td class='col-md-1'>"+r.listTreatment[0].montICUPlastic+"</td><td class='col-md-1'>"+r.listTreatment[0].montPlasticPlastic+"</td></tr>" 
						                                                 + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountPlastic+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountPlastic+"</td><td class='col-md-1'></td><td  class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountPlastic+"</td><td class='col-md-1'></td><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].progresiveDialysisPlastic+"</td><td class='col-md-1'>"+r.listTreatment[0].progresiveUroPlastic+"</td><td class='col-md-1'>"+r.listTreatment[0].progresivePeadiPlastic+"</td><td class='col-md-1'>"+r.listTreatment[0].progresiveICUPlastic+"</td><td class='col-md-1'>"+r.listTreatment[0].progresivePlasticPlastic+"</td></tr>";
						
						
						
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>5</td>"
						+ "<td rowspan='2' class='col-md-1'>NCD</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].deptMonthCountNCD+"</td><td class='col-md-1'> "+r.listTreatment[1].deptMonthCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthCountNCD+" </td><td class='col-md-1'>"+r.listTreatment[3].deptMonthCountNCD+"</td><td class='col-md-1'></td><td rowspan='2' class='col-md-1'>NCD</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthCountNCD+"</td><td class='col-md-1'></td></tr>" 
						                                     + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountNCD+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountNCD+"</td><td class='col-md-1'></td><td  class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountNCD+"</td><td class='col-md-1'></td></tr>";
		
						
						htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td  rowspan='2'  class='col-md-1'>6</td>"
						+ "<td rowspan='2' class='col-md-1'>Total</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+totalmonthynew+"</td><td class='col-md-1'>"+totalmonthyold+"</td><td class='col-md-1'>"+totalopdmonth+"</td><td class='col-md-1'>"+totalmonthyipd+"</td><td  class='col-md-1'></td><td rowspan='2' class='col-md-1'>Lithotripsy</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+r.listTreatment[0].lithomonthCount+"</td><td class='col-md-1'></td><td rowspan='2' class='col-md-1'> Total</td><td class='col-md-1'>Monthly</td><td class='col-md-1'>"+totalrevenuDailaysismonth+"</td><td class='col-md-1'>"+totalrevenuUROmonth+"</td><td class='col-md-1'>"+totalrevenuPediamonth+"</td><td class='col-md-1'>"+totalrevenuICUmonth+"</td><td class='col-md-1'>"+totalrevenuPlasticmonth+"</td></tr>" 
						                                       + "<tr><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+totalProgresivenew+"</td><td class='col-md-1'>"+totalProgresiveold+"</td><td class='col-md-1'>"+totalopdprog+"</td><td class='col-md-1'>"+totalProgresiveipd+"</td><td class='col-md-1'></td><td  class='col-md-1'>Progresive</td><td class='col-md-1'>"+r.listTreatment[0].lithoprogcount+"</td><td class='col-md-1'></td><td class='col-md-1'>Progresive</td><td class='col-md-1'>"+totalrevenuDailaysisprogresive+"</td><td class='col-md-1'>"+totalrevenuURoprogresive+"</td><td class='col-md-1'>"+totalrevenuPeDiaprogresive+"</td><td class='col-md-1'>"+totalrevenuICuprogresive+"</td><td class='col-md-1'>"+totalrevenuPlasticprogresive+"</td></tr>";
						
						
						
					}
						
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}

//Ajay khandare 3-july-2019 getOPDIPDOperationSpecilitywiseReport
function getDeathInformationSexwiseReport() {

	var fromMonth = $("#FromMonth").val();
	var fromYear = $("#FromYear").val();


         	var inputs = [];
			inputs.push('fromMonth=' + encodeURIComponent(fromMonth));
			inputs.push('fromYear=' + encodeURIComponent(fromYear));


			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/getDeathInformationSexwiseReport",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					

			        var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'>"
							+ "<th colspan='1' class='col-md-1'>Year"
							+ "</th><th colspan='1' class='col-md-1'>"
							+ "</th><th colspan='1' class='col-md-1'>"
							+ "</th><th colspan='5' class='col-md-1'>Child Death"
							+ "</th><th colspan='1' class='col-md-1'>Adult Death"
							+ "</th><th colspan='1' class='col-md-1'>Total Death(Child Death + Adult Death)"
							+ "</th></tr>";
					
					htmHead = htmHead
					+ "<tr style='background-color: #EEEEEE'><th>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>0 to 7 Days "
					+ "</th><th  class='col-md-1'>8 to 29 Days"
					+ "</th><th  class='col-md-1'>30 Days to 1 Years"
					+ "</th><th  class='col-md-1'>1 to 5 Years"
					+ "</th><th  class='col-md-1'>Total"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th></tr>";
					/// Statring Monthly count
					
					var total0to7=r.listTreatment[0].monthlycount+r.listTreatment[0].deptMonthCountFemale;
					var total8to29=r.listTreatment[1].monthlycount+r.listTreatment[1].deptMonthCountFemale;
					var total30to1years=r.listTreatment[2].monthlycount+r.listTreatment[2].deptMonthCountFemale;
					var total1to5years=r.listTreatment[3].monthlycount+r.listTreatment[3].deptMonthCountFemale;
					
					
					var totalmonthlymale=r.listTreatment[0].monthlycount+r.listTreatment[1].monthlycount+r.listTreatment[2].monthlycount+r.listTreatment[3].monthlycount;

					var totalmonthlyFemale=r.listTreatment[0].deptMonthCountFemale+r.listTreatment[1].deptMonthCountFemale+r.listTreatment[2].deptMonthCountFemale+r.listTreatment[3].deptMonthCountFemale;

					var totalmonthly=total0to7+total8to29+total30to1years+total1to5years;
					
					var totaladult=r.listTreatment[4].monthlycount+r.listTreatment[4].deptMonthCountFemale;
					
					var totalchildandtotaladultDeathmale=totalmonthlymale+r.listTreatment[4].monthlycount;
					
					var totalchildandtotaladultDeathFemale=totalmonthlyFemale+r.listTreatment[4].deptMonthCountFemale;
					
					var totalchildandtotaladultDeath=totalchildandtotaladultDeathmale+totalchildandtotaladultDeathFemale;
					
					/// Statring progresive count
					var totalpro0to7=r.listTreatment[0].progressivecount+r.listTreatment[0].deptPrgCountFemale;
					
					var totalpro8to29=r.listTreatment[1].progressivecount+r.listTreatment[1].deptPrgCountFemale;
				
					var totalpro30to1years=r.listTreatment[2].progressivecount+r.listTreatment[2].deptPrgCountFemale;
				
					var totalpro1to5years=r.listTreatment[3].progressivecount+r.listTreatment[3].deptPrgCountFemale;
					
					
					
					var totalpromale=r.listTreatment[0].progressivecount+r.listTreatment[1].progressivecount+r.listTreatment[2].progressivecount+r.listTreatment[3].progressivecount;
	
					var totalproFemale=r.listTreatment[0].deptPrgCountFemale+r.listTreatment[1].deptPrgCountFemale+r.listTreatment[2].deptPrgCountFemale+r.listTreatment[3].deptPrgCountFemale;

					var totalpro=totalpro0to7+totalpro8to29+totalpro30to1years+totalpro1to5years;
					
					var totaladultpro=r.listTreatment[4].progressivecount+r.listTreatment[4].deptPrgCountFemale;
					
					
                    var totalchildandtotaladultProDeathmale=totalpromale+r.listTreatment[4].progressivecount;
					
					var totalchildandtotaladultProDeathFemale=totalproFemale+r.listTreatment[4].deptPrgCountFemale;
					
					var totalchildandtotaladultProDeath=totalchildandtotaladultProDeathmale+totalchildandtotaladultProDeathFemale;
					
					
					
					if (r.listTreatment.length == 0 || r.listTreatment.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {
						
						htmBody = htmBody + "<tr style='height:21px;'>"
								+ "<td  rowspan='3' class='col-md-1'>Monthly</td>"
								+ "<td class='col-md-1'>Male</td><td class='col-md-1'></td><td class='col-md-1'>"+r.listTreatment[0].monthlycount+"</td><td class='col-md-1'> "+r.listTreatment[1].monthlycount+"</td><td class='col-md-1'>"+r.listTreatment[2].monthlycount+" </td><td class='col-md-1'>"+r.listTreatment[3].monthlycount+"</td><td class='col-md-1'>"+totalmonthlymale+"</td><td class='col-md-1'>"+r.listTreatment[4].monthlycount+"</td><td class='col-md-1'>"+totalchildandtotaladultDeathmale+"</td></tr>"
							  	+ "<td class='col-md-1'>Female</td><td class='col-md-1'></td><td class='col-md-1'>"+r.listTreatment[0].deptMonthCountFemale+"</td><td class='col-md-1'>"+r.listTreatment[1].deptMonthCountFemale+"</td><td class='col-md-1'>"+r.listTreatment[2].deptMonthCountFemale+"</td><td class='col-md-1'>"+r.listTreatment[3].deptMonthCountFemale+"</td><td class='col-md-1'>"+totalmonthlyFemale+"</td><td class='col-md-1'>"+r.listTreatment[4].deptMonthCountFemale+"</td><td class='col-md-1'>"+totalchildandtotaladultDeathFemale+"</td></tr>"
							    + "<td class='col-md-1'>Total</td><td class='col-md-1'></td><td class='col-md-1'>"+total0to7+"</td><td class='col-md-1'>"+total8to29+"</td><td class='col-md-1'>"+total30to1years+"</td><td class='col-md-1'>"+total1to5years+"</td><td class='col-md-1'>"+totalmonthly+"</td><td class='col-md-1'>"+totaladult+"</td><td class='col-md-1'>"+totalchildandtotaladultDeath+"</td></tr>";

					  	    
							    
							    htmBody = htmBody + "<tr style='height:21px;'>"
								+ "<td  rowspan='3' class='col-md-1'>Progresive</td>"
								+ "<td class='col-md-1'>Male</td><td class='col-md-1'></td><td class='col-md-1'>"+r.listTreatment[0].progressivecount+"</td><td class='col-md-1'> "+r.listTreatment[1].progressivecount+"</td><td class='col-md-1'>"+r.listTreatment[2].progressivecount+" </td><td class='col-md-1'>"+r.listTreatment[3].progressivecount+"</td><td class='col-md-1'>"+totalpromale+"</td><td class='col-md-1'>"+r.listTreatment[4].progressivecount+"</td><td class='col-md-1'>"+totalchildandtotaladultProDeathmale+"</td></tr>" 
							  	+ "<tr><td class='col-md-1'>Female</td><td class='col-md-1'></td><td class='col-md-1'>"+r.listTreatment[0].deptPrgCountFemale+"</td><td class='col-md-1'>"+r.listTreatment[1].deptPrgCountFemale+"</td><td class='col-md-1'>"+r.listTreatment[2].deptPrgCountFemale+"</td><td class='col-md-1'>"+r.listTreatment[3].deptPrgCountFemale+"</td><td class='col-md-1'>"+totalproFemale+"</td><td class='col-md-1'>"+r.listTreatment[4].deptPrgCountFemale+"</td><td class='col-md-1'>"+totalchildandtotaladultProDeathFemale+"</td></tr>"
					  	        + "<tr><td class='col-md-1'>Total</td><td class='col-md-1'></td><td class='col-md-1'>"+totalpro0to7+"</td><td class='col-md-1'>"+totalpro8to29+"</td><td class='col-md-1'>"+totalpro30to1years+"</td><td class='col-md-1'>"+totalpro1to5years+"</td><td class='col-md-1'>"+totalpro+"</td><td class='col-md-1'>"+totaladultpro+"</td><td class='col-md-1'>"+totalchildandtotaladultProDeath+"</td></tr>";

					
						
					}
						
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}



//Ajay khandare 20-aug-2019 getYearWiseActivitiesReport2

function getYearWiseActivitiesReport2() {

	var fromDate1 = $("#fromDate").val();
	var ToDate1=  $("#ToDate").val();


         	var inputs = [];
			inputs.push('fromDate1=' + encodeURIComponent(fromDate1));
			inputs.push('ToDate1=' + encodeURIComponent(ToDate1));


			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/getYearWiseActivitiesReport2",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					

			        var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'>"
							+ "<th colspan='1' class='col-md-1'>Year"
							+ "</th><th colspan='4' class='col-md-1'>Nephrology & UroLogy"
							+ "</th><th colspan='4' class='col-md-1'>Plastic Surgery"
							+ "</th><th colspan='4' class='col-md-1'>Peadiatric & NICU surgery"
							+ "</th><th colspan='4' class='col-md-1'>NCD"
							+ "</th><th colspan='4' class='col-md-1'>Total"
						
							+ "</th><th colspan='1' class='col-md-1'>Lithotripsy"
							+ "</th><th colspan='1' class='col-md-1'>X-ray"
							+ "</th><th colspan='1' class='col-md-1'>ECG"
							+ "</th><th colspan='1' class='col-md-1'>Sonography"
							+ "</th><th colspan='1' class='col-md-1'>Blood test"
							+ "</th><th colspan='1' class='col-md-1'>Urine test"
							+ "</th><th colspan='1' class='col-md-1'>Physiotheraphy"
							+ "</th></tr>";
					
					htmHead = htmHead
					+ "<tr style='background-color: #EEEEEE'><th>"
				
					+ "</th><th  class='col-md-1'>OPD"
					+ "</th><th  class='col-md-1'>IDP "
					+ "</th><th  class='col-md-1'>Major Surgery"
					+ "</th><th  class='col-md-1'>Minor Surgery"
					
					+ "</th><th  class='col-md-1'>OPD"
					+ "</th><th  class='col-md-1'>IDP "
					+ "</th><th  class='col-md-1'>Major Surgery"
					+ "</th><th  class='col-md-1'>Minor Surgery"
					
					+ "</th><th  class='col-md-1'>OPD"
					+ "</th><th  class='col-md-1'>IDP "
					+ "</th><th  class='col-md-1'>Major Surgery"
					+ "</th><th  class='col-md-1'>Minor Surgery"
					
					+ "</th><th  class='col-md-1'>OPD"
					+ "</th><th  class='col-md-1'>IDP "
					+ "</th><th  class='col-md-1'>Major Surgery"
					+ "</th><th  class='col-md-1'>Minor Surgery"
					
					
					+ "</th><th  class='col-md-1'>OPD"
					+ "</th><th  class='col-md-1'>IDP "
					+ "</th><th  class='col-md-1'>Major Surgery"
					+ "</th><th  class='col-md-1'>Minor Surgery"
					
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					
					
					+ "</th></tr>";
				
					var totalopd =r.listTreatment[0].monthlycount+r.listTreatment[0].deptMonthCountplastic+r.listTreatment[0].deptMonthCountPaediatric+ r.listTreatment[0].deptMonthCountNCD;
					var totalipd =r.listTreatment[1].monthlycount+r.listTreatment[1].deptMonthCountplastic+r.listTreatment[1].deptMonthCountPaediatric+ r.listTreatment[1].deptMonthCountNCD;
					var majorsuergry =r.listTreatment[2].monthlycount+r.listTreatment[2].deptMonthCountplastic+r.listTreatment[2].deptMonthCountPaediatric+ r.listTreatment[2].deptMonthCountNCD;
					var minorsuergry =r.listTreatment[3].monthlycount+r.listTreatment[3].deptMonthCountplastic+r.listTreatment[3].deptMonthCountPaediatric+ r.listTreatment[3].deptMonthCountNCD;
					
					if (r.listTreatment.length == 0 || r.listTreatment.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {
						

							   htmBody = htmBody
								+ "<tr style='height:21px;'>"
								+ "<td  rowspan='1' class='col-md-1'>"+fromDate1+" To "+ToDate1+"</td>"
								+ "<td class='col-md-1'>"
								+ r.listTreatment[0].monthlycount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[1].monthlycount
								+ "</td><td class='col-md-1'> "
								+ r.listTreatment[2].monthlycount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[3].monthlycount
								+ " </td><td class='col-md-1'>"
								
								+ r.listTreatment[0].deptMonthCountplastic
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[1].deptMonthCountplastic
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[2].deptMonthCountplastic
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[3].deptMonthCountplastic
							
								
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[0].deptMonthCountPaediatric
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[1].deptMonthCountPaediatric
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[2].deptMonthCountPaediatric
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[3].deptMonthCountPaediatric
								
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[0].deptMonthCountNCD
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[1].deptMonthCountNCD
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[2].deptMonthCountNCD
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[3].deptMonthCountNCD
								
								+ "</td><td class='col-md-1'>"
								+totalopd
								+ "</td><td class='col-md-1'>"
								+ totalipd
								+ "</td><td class='col-md-1'>"
								+ majorsuergry
								+ "</td><td class='col-md-1'>"
								+ minorsuergry
								
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[0].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[1].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[2].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[3].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[4].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[5].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[5].progressivecount
								+ "</td></tr>";
						
						
					}
						
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}


//Ajay khandare 26-july-2019 getYearWiseActivitiesReport3

function getYearWiseActivitiesReport3() {

	var FromYear = $("#FromYear").val();
	var FromMonth=  $("#FromMonth").val();


         	var inputs = [];
			inputs.push('fromYear=' + encodeURIComponent(FromYear));
			inputs.push('fromMonth=' + encodeURIComponent(FromMonth));


			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/getYearWiseActivitiesReport3",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					

			        var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'>"
							+ "<th colspan='1' class='col-md-1'>Year"
							+ "</th><th colspan='4' class='col-md-1'>Nephrology & UroLogy"
							+ "</th><th colspan='4' class='col-md-1'>Plastic Surgery"
							+ "</th><th colspan='4' class='col-md-1'>Peadiatric & NICU surgery"
							+ "</th><th colspan='4' class='col-md-1'>NCD"
							+ "</th><th colspan='4' class='col-md-1'>Total"
						
							+ "</th><th colspan='1' class='col-md-1'>Lithotripsy"
							+ "</th><th colspan='1' class='col-md-1'>X-ray"
							+ "</th><th colspan='1' class='col-md-1'>ECG"
							+ "</th><th colspan='1' class='col-md-1'>Sonography"
							+ "</th><th colspan='1' class='col-md-1'>Blood test"
							+ "</th><th colspan='1' class='col-md-1'>Urine test"
							+ "</th><th colspan='1' class='col-md-1'>Physiotheraphy"
							+ "</th></tr>";
					
					htmHead = htmHead
					+ "<tr style='background-color: #EEEEEE'><th>"
				
					+ "</th><th  class='col-md-1'>OPD"
					+ "</th><th  class='col-md-1'>IDP "
					+ "</th><th  class='col-md-1'>Major Surgery"
					+ "</th><th  class='col-md-1'>Minor Surgery"
					
					+ "</th><th  class='col-md-1'>OPD"
					+ "</th><th  class='col-md-1'>IDP "
					+ "</th><th  class='col-md-1'>Major Surgery"
					+ "</th><th  class='col-md-1'>Minor Surgery"
					
					+ "</th><th  class='col-md-1'>OPD"
					+ "</th><th  class='col-md-1'>IDP "
					+ "</th><th  class='col-md-1'>Major Surgery"
					+ "</th><th  class='col-md-1'>Minor Surgery"
					
					+ "</th><th  class='col-md-1'>OPD"
					+ "</th><th  class='col-md-1'>IDP "
					+ "</th><th  class='col-md-1'>Major Surgery"
					+ "</th><th  class='col-md-1'>Minor Surgery"
					
					
					+ "</th><th  class='col-md-1'>OPD"
					+ "</th><th  class='col-md-1'>IDP "
					+ "</th><th  class='col-md-1'>Major Surgery"
					+ "</th><th  class='col-md-1'>Minor Surgery"
					
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					+ "</th><th  class='col-md-1'>"
					
					
					+ "</th></tr>";
				
					var totalopd =r.listTreatment[0].monthlycount+r.listTreatment[0].deptMonthCountplastic+r.listTreatment[0].deptMonthCountPaediatric+ r.listTreatment[0].deptMonthCountNCD;
					var totalipd =r.listTreatment[1].monthlycount+r.listTreatment[1].deptMonthCountplastic+r.listTreatment[1].deptMonthCountPaediatric+ r.listTreatment[1].deptMonthCountNCD;
					var majorsuergry =r.listTreatment[2].monthlycount+r.listTreatment[2].deptMonthCountplastic+r.listTreatment[2].deptMonthCountPaediatric+ r.listTreatment[2].deptMonthCountNCD;
					var minorsuergry =r.listTreatment[3].monthlycount+r.listTreatment[3].deptMonthCountplastic+r.listTreatment[3].deptMonthCountPaediatric+ r.listTreatment[3].deptMonthCountNCD;
					
					if (r.listTreatment.length == 0 || r.listTreatment.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {
						

							   htmBody = htmBody
								+ "<tr style='height:21px;'>"
								+ "<td  rowspan='1' class='col-md-1'>"+fromDate1+" To "+ToDate1+"</td>"
								+ "<td class='col-md-1'>"
								+ r.listTreatment[0].monthlycount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[1].monthlycount
								+ "</td><td class='col-md-1'> "
								+ r.listTreatment[2].monthlycount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[3].monthlycount
								+ " </td><td class='col-md-1'>"
								
								+ r.listTreatment[0].deptMonthCountplastic
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[1].deptMonthCountplastic
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[2].deptMonthCountplastic
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[3].deptMonthCountplastic
							
								
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[0].deptMonthCountPaediatric
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[1].deptMonthCountPaediatric
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[2].deptMonthCountPaediatric
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[3].deptMonthCountPaediatric
								
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[0].deptMonthCountNCD
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[1].deptMonthCountNCD
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[2].deptMonthCountNCD
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[3].deptMonthCountNCD
								
								+ "</td><td class='col-md-1'>"
								+totalopd
								+ "</td><td class='col-md-1'>"
								+ totalipd
								+ "</td><td class='col-md-1'>"
								+ majorsuergry
								+ "</td><td class='col-md-1'>"
								+ minorsuergry
								
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[0].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[1].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[2].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[3].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[4].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[5].progressivecount
								+ "</td><td class='col-md-1'>"
								+ r.listTreatment[5].progressivecount
								+ "</td></tr>";
						
						
					}
						
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}
function subserviceHiddenIdvalue()
{
	
	$("#subserviceHiddenIdvalue").val("on");
	var aa = $("#subserviceHiddenIdvalue").val();
	
}

//Added Rohini Ambhore on 09-02-2024
function fetchSuperCatPrcentMasterNew(callFrom,chargesMasterDto) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : parseInt(chargesMasterDto)
		},
		
		url : "ehat/profees/fetchSuperCatPrcentMaster",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
		//	setDynamicDivSuperCat('dynamicItemsinfo',response);
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
