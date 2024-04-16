/**
 /* @Bilal 30_May_2017
 *********************For configuration**/

/*******************************************************************************
 * @Bilal
 * @date 5_jun_2017 this method is used to refersh the fields after save update
 *       and delete
 ******************************************************************************/
function reload(){
	window.location.reload(true);
}

function refreshConfig() {

	$('#number').val("");
	$('#configId').val("");
	$('#distribute').val("");
	$('#operator').val("0");
	$('#hallCharges').val("0");
	$('#medicalCharges').val("0");
	$('#isoHallCharges').val("0");
	$('#isoMedicalCharges').val("0");
	$('#deptIdForConfig').val("0");

	// radio button to un check
	$('input[name="incdecType"][value="+"]').prop('checked', false);
	$('input[name="incdecType"][value="-"]').prop('checked', false);

	var chargesId = $("#lis0").val();
	var HallId = $("#lisH0").val();
	var isComServId = $("#lisHc0").val();
	var masterId = $("#li0").val();
	removeInpuntFildForCharges(0, chargesId, 'dynamicItems');
	removeInpuntFildForCharges2(0, HallId, 'dynamicItems2');
	removeInpuntFildcom(0, isComServId, 'dynamicItemcom');
	removeInpuntFild(0, masterId, 'dynamicItems');
	
	removeSponserInpuntFild(0,masterId,'dynamicItems');

	$("#operator").val("");
	$("#deptIdForConfig").val("");
	$("#hallCharges").val("");
	$("#medicalCharges").val("");
	$("#totalcharges").val("");

	$("#rightDiv").empty();
	$('#fromDate').val("");// empty from date
	$('#toDate').val(""); // empty to date
	//window.location.reload(true);
	
	$('#divLine1').show();
	$('#fromYear').val('N');
	$('#yearwise').attr('checked', false);
	$("#subIDs").empty();
	$('#queryType').val("insert");
	$('#countDates').val(0);
	
	$('#listmstr_select_service').select2('val',"0");
	$('#listmstr_select_combination').select2('val',"0");
	
	
	
}
/*******
 * @author    :BILAL
 * @Date      :05-06-2017
 * @Code      :When we click on apply button the calculations will happen auto
 * ******/
function apply() {
	var cmt = 1;
	var operator = $("#operator").val();
	var increaseordecrease = $("input:radio[name='incdecType']:checked").val();
	var number = parseFloat($("#number").val());
	var distribute= parseFloat($("#distribute").val());
	var totalcharges= parseFloat($("#totalcharges").val());
	
	if (distribute == "" || distribute == null || distribute == undefined || isNaN(distribute)) {
		distribute = 0;
	}
	
	//FOR EACH LOOP TO GET ALL CHARGES FROM RIGHT DIV
	$(".right_Charges").each(function() {

		
		var charges = parseFloat($(this).val());
		
		if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
			charges = 0;
		}
		//formulas for distribute the values 

		
		var rightDivLength = $("#rightDiv tr").length;
		if(number > 0 ){
			if (rightDivLength == 0) {
				alert("Please Take Atleast One Charges To Save Or Update!");
				
				return false;
				

		}else if ((operator != "+") && (operator != "-") && (operator != "%")) { // operator validation
			alert("Please Select One Operator To Perform Calculations!");
			
			return false;
		  }
		}

		
		if (operator == "%") {

			if (increaseordecrease == "+") {
				var incdec = charges * number / 100;
				charges = (charges + incdec);
				if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
					charges = 0;
				}
			} else if(increaseordecrease == "-"){
				var incdec = charges * number / 100;
				charges = (charges - incdec);
				if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
					charges = 0;
				}
			}else{
				alert("Please check increase or decrease! ");
				return false;
				
			}

		} else if (operator == "+") {

			charges = (charges + number);
			if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
				charges = 0;
			}
		} else if(operator == "-"){
			charges = (charges - number);
			if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
				charges = 0;
			}
		}else{
			//Formulas for Distributed value
			if(distribute >0){
				var IncDecP=charges*100/totalcharges;
				charges=(IncDecP*distribute/100).toFixed(2);
			}
			
			
			if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
				charges = 0;
			}
			
		}
		if (charges < 0) {
			charges =0;
		}
		$(this).val(parseFloat(charges).toFixed(2));
		
		cmt++;
		totalAmount();
		
		//AFTER FIRST APPLY DISABALING THE APPLY BUTTON
	    var button = $('#apply');

	    // Disable the apply button while evaluating if the condition should be apply
	    button.prop('disabled', true);

	    var valid = true;    

	   
	    // "valid" to false if the validation fails

	    if (!valid) { 
	        // Prevent form from applying  if validation failed
	        e.preventDefault();

	        // Reactivate the button if the apply was not applied
	        button.prop('disabled', false);
	    }

	});
	
	
	    
}
/*******
 * @author    :BILAL
 * @Date      :06-06-2017
 * @Code      :For saving multiple records in charges configuration  
 * ******/
function saveConfigurationService() {
    var fromYear =$('#fromYear').val();
    if (fromYear == 'Y') {
		saveYearWise();
		return false;
	}
	var configIdf = $("#configId").val();
	var operator = $("#operator").val();
	var increaseordecrease = $("input:radio[name='incdecType']:checked").val();
	var number = parseFloat($("#number").val());
	var distribute= parseFloat($("#distribute").val());
	var queryType = $("#queryType").val();
	var totalcharges= parseFloat($("#totalcharges").val());
	var copay = 0;
	var selfId =$("#selfId").val();
	var iscatHall =$("#iscatHall").val();
	
	//For Service Id
	var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	var serviceLastId  = $("#li" + (liSizeForServices - 1)).val();
	
	//For Charges Id
	var chargesId = $("#lis0").val();// chargesId

	/*  
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	 //charges  validation
    if(liSize > 0){
    	if(liSize <= 1){ 
    		alert("Please Select Atleast One charges and two sub Charges! ");
    		SetFocus('dynamicItems');
    		return false;
    		
    	}
    }*/
	
	var chargesSlaveId = 0;
	chargesSlaveId = $("#listmstr_select_service").val();
	
	if(chargesSlaveId > 0){
		chargesId=1;
	}
	
	
	//For Hall Wise Id  
	var HallId = $("#lisH0").val();// chargesId
	var HallSlaveId = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems2 li").length;
	HallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
	
	//For Is combination service id
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();
	
	//From Date To Date
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
    
    //Department Id To save in DataBase
    var departMentID=$("#deptIdForConfig").val();
    
    //hallCharges to save based on hallID and slave Id
    var hallCharges=$("#hallCharges").val();
    var iscombination =$('#iscombination').val();
   
    var medicalCharges=$("#medicalCharges").val();
    
    var rightDivLength = $("#rightDiv tr").length;
    if (rightDivLength == 0) {
		alert("Please Take Atleast One Service Charges To Save Or Update!");
		// SetFocus('rightDiv');
		return false;

	}
   
		
	//charges Hall validation liSizeForServices
    if(liSizeHall > 0){
    	if(liSizeHall <= 1){
    		alert("Please Select Atleast One Hall and one sub Hall! ");
    		SetFocus('dynamicItems2');
    		return false;
    	}
    	
    }
	
	//rightDiv validation	
	if(number > 0 ){
		if (rightDivLength == 0) {
			alert("Please Take Atleast One Service Charges To Save Or Update!");
			return false;

		} else if ((operator != "+") && (operator != "-") && (operator != "%")) { // operator validation
			alert("Please Select One Operator To Perform Calculations!");
			SetFocus('operator');
			return false;
		}
	}
	
	//department validation
	if(departMentID < 0){
		alert("Please Select One departMent!");
		SetFocus('deptIdForConfig');
		return false;
	}
	
	
    if (copay == "" || copay == null || copay == undefined || isNaN(copay)) {
    	copay = 0;
	}
	if (configIdf == "" || configIdf == null || configIdf == undefined) {
		configIdf = 0;
	}
	
	
	if (masterId == "" || masterId == null || masterId == undefined) {
		masterId = 0;
	}
	
	if (totalcharges == "" || totalcharges == null || totalcharges == undefined || isNaN(totalcharges)) {
		totalcharges = 0;
	}
	
	if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
		 isComServId = 0;
	}
	 
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		 isComServlastId = 0;
	}
	 
	if (serviceLastId == "" || serviceLastId == null || serviceLastId == undefined || isNaN(serviceLastId)) {
		 serviceLastId = 0;
	}
	 
	if (hallCharges == "" || hallCharges == null || hallCharges == undefined || isNaN(hallCharges)) {
		 hallCharges = 0;
	}
	 
	if (medicalCharges == "" || medicalCharges == null || medicalCharges == undefined || isNaN(medicalCharges)) {
		 medicalCharges = 0;
	}
	 
    if (masterId == "" || masterId == null || masterId == undefined) {
			masterId = 0;
    }
		

	if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined) {
		HallSlaveId = 0;
	}

	if (HallId == "" || HallId == null || HallId == undefined) {
			HallId = 0;
	}
	
	if (iscombination == "" || iscombination == null || iscombination == undefined) {
		iscombination = 'N';
	}
	
	if (departMentID == "" || departMentID == null || departMentID == undefined) {
		departMentID = 0;
	}
	
	if (number == "" || number == null || number == undefined || isNaN(number)) {
		number = 0;
	}
	
	if (distribute == "" || distribute == null || distribute == undefined || isNaN(distribute)) {
		distribute = 0;
	}
	if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
		selfId = 0;
	}
	if (iscatHall == "" || iscatHall == null || iscatHall == undefined || isNaN(iscatHall)) {
		iscatHall = "N";
	}
	
	/****comparing to date not be past means it should show future ****/
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();

	var output = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-'
			+ (day < 10 ? '0' : '') + day;

	if (new Date(toDate) < new Date(output)) {
		alert("Todate  must be in the future!");
		return false;
	}
	
	if (Date.parse(fromDate) > Date.parse(toDate)) {
        //$("txttodate").val('');
        alert("Start date should not be greater than end date");
        return false;
    }
	/****comparing to date not be past means it should show future ****/
	
	/*if (fromDate == "" || fromDate == null || fromDate == undefined) {
		fromDate = "0000-00-00";
	}
	
	if (toDate == "" || toDate == null || toDate == undefined) {
		toDate = "0000-00-00";
	}*/
	
	// defined array to save list of records
	//var cmt = 1;
	var configurationDetails = {
		lstConfigurService : []
	};
	
	//geting all config ids  
	var configIds=new Array();
	 $(".idc").each(function() {
		 configIds.push($(this).val());
	 });	
	
	//geting all service ids  
	var serviceIDs=new Array();
	$(".subserviceIds").each(function() {
			 serviceIDs.push($(this).val());
	});
	
	//geting All charges  
	var chargess=new Array();
	$(".right_Charges").each(function() {
		chargess.push($(this).val());
	});

	//getting all code name ch 
	var codenamech=new Array();
	$(".right_Codename").each(function() {
		codenamech.push($(this).val());
	});
	
	var i;
	for (i = 0; i < serviceIDs.length; ++i) {
	   
		var charges =chargess[i];
		var serviceId =serviceIDs[i];
		var configId =configIds[i];
		var codename =codenamech[i];
		
		if (configId == "" || configId == null || configId == undefined) {
			configId = 0;
		}
		
		if (chargesId == "" || chargesId == null
				|| chargesId == undefined) {
			chargesId = 0;
		}

		if (chargesSlaveId == "" || chargesSlaveId == null
				|| chargesSlaveId == undefined) {
			chargesSlaveId = 0;
		}
		
		configurationDetails.lstConfigurService.push({
			charges        : charges,
			serviceId	   : serviceId,
			operator       : operator,
			number         : number,
			increaseordecrease : increaseordecrease,
			chargesId       : chargesId,
			chargesSlaveId  : chargesSlaveId,			
			distribute      : distribute,
			fromDate        : fromDate,
			toDate          : toDate,
			departMentID    :departMentID,
			copay           : copay,
			totalcharges    : totalcharges,
			isComServId     : isComServId,
			isComServlastId : isComServlastId,
			serviceLastId   : serviceLastId,
			configId        : configId,
			iscombination   : iscombination,
			selfId          : selfId,
			iscatHall       : iscatHall,
			codenamech      : codename
		});
	}

	if (chargesSlaveId == 0 && HallSlaveId==0 && isComServlastId==0) {
		alert("please select any combination or hall or sponsor to save services!");
		return false;
	}
	
	var isoHallCharges = $("#isoHallCharges").val();
	var isoMedicalCharges = $("#isoMedicalCharges").val();
	
	//Json List 
	configurationDetails = JSON.stringify(configurationDetails);
	
	var inputs = [];
	inputs.push("configurationDetails="
			+ encodeURIComponent(configurationDetails));
	inputs.push('configId=' + configIdf);
	inputs.push('operator=' + encodeURIComponent(operator));
	inputs.push('queryType=' + queryType);
	inputs.push('chargesId=' + encodeURIComponent(chargesId));
	inputs.push('chargesSlaveId=' + encodeURIComponent(chargesSlaveId));
	inputs.push('masterId=' + encodeURIComponent(masterId));
	inputs.push('HallId=' + encodeURIComponent(HallId));
	inputs.push('HallSlaveId=' + encodeURIComponent(HallSlaveId));
	inputs.push('hallCharges=' + encodeURIComponent(hallCharges));
	inputs.push('medicalCharges=' + encodeURIComponent(medicalCharges));
	inputs.push('isoHallCharges=' + encodeURIComponent(isoHallCharges));
	inputs.push('isoMedicalCharges=' + encodeURIComponent(isoMedicalCharges));
	inputs.push('isComServId=' + encodeURIComponent(isComServId));
	inputs.push('isComServlastId=' + encodeURIComponent(isComServlastId));
	var str = inputs.join('&');
	
	$('#pleaseWait').show();
	jQuery.ajax({
		
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/saveConfiguration",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			
			alertify.success(r);
			$('#pleaseWait').hide();
			refreshConfig();
			
		}
	});
	
	//total to be refresh after save and update 
	//$("#totalcharges").val("");
	 var button = $('#apply');

	    //able the apply button while evaluating if the condition should be apply
	    button.prop('disabled', false);

	    var valid = true;    

	   
	    // "valid" to false if the validation fails

	    if (!valid) { 
	        // Prevent form from applying  if validation failed
	        e.preventDefault();

	        // Reactivate the button if the apply was not applied
	        button.prop('disabled', true);
	    }
	    
	    
}

/*******
 * @author    :BILAL
 * @Date      :31-05-2017
 * @Code      :For fetching sub services on load
 * ******/
function fetchSubServiceCategoryList() {
var servicesInfo=$("#servicesInfo").val();
    $('#pleaseWait').show();
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subservice/SubServiceCategoryList",

		error : function() {
			alert('error');
		},
		success : function(response) {

			divId = response;
			if (servicesInfo == "servicesInform") {
				fetchlistS();
				
			}else{
				SubServiceTemplatedemo(response) ;
				
			}
			
		}
	});
}
/*******
 * @author    :BILAL
 * @Date      :31-05-2017
 * @Code      :For setting template for sub services on load
 * ******/
function SubServiceTemplatedemo(response) {
	
	var htm = "";
	var index = $("#rightDiv tr").length;
	for ( var i = 0; i < response.lstSubService.length; i++) {
		htm = htm
				
				+ "<tr  id='tr"+(index + 1)+"' class='trs'><td class='col-sm-7 center' id='chName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].categoryName
				+ "</td><td class='col-sm-3 center' id='charges" + (index + 1)+"' style='height: 21.5px;' >"
				+"<input type='text' class='left_Charges form-control' readonly id='inCharges" + (index + 1)+"' name='charges" + (index + 1)+"' onkeyup='totalAmount()' value='"+ response.lstSubService[i].charges+"'"
				
			
				+ "</td>" 
				
				//+ "<td id='codenamech"+(index + 1)+"' style='display:none'><input type='text' value='0' id='incodenamech"+ (index + 1) + "' >"  
				
				+  "<input type='hidden' class='subserviceId"+ (index + 1) + "' id='subbId"+ (index + 1) + "' value='"+ response.lstSubService[i].subId + "'>"
				
				
				+ "<td class='col-sm-2 center' id='lastTd"+(index + 1)+"'><input type='button' value='>>' id='inputCnt"+ (index + 1) + "' onclick='addTRtoRight("+(index + 1)+")'>" 
				
				
				+ "</tr>" ;
			
		index++;
	}

	$("#leftDiv").html(htm);
	$('#pleaseWait').hide();
}


/*******
 * @author    :BILAL
 * @Date      :10-JUN-2017
 * @Code      :For Adding TR to right div
 * ******/
function addTRtoRight(trCnt) {
	
	var subIDs=$("#subbId"+trCnt).val();	
	 var subValues = $("#subIDs").html().split(",");

		var position =subValues.indexOf(subIDs);
		if(position>=0){
			return false;
		}
	var chName     = $("#chName"+trCnt).text();
	//var charges    = $("#charges"+trCnt).val();
	var inCharges  = $("#inCharges"+trCnt).val();
	var index = $("#rightDiv tr").length;
	
	
	$('#rightDiv').append('<tr id="trs'+(index+1) +'">'
    		+'<td id="chNamer'+(index+1) +'" class="col-sm-5 center" style="height: 21.5px;">'+chName+'</td>'
    		+'<td id="chargesr'+(index+1) +'" class="col-sm-3 center" style="height: 21.5px;">'
    		+'<input id="inChargesr'+(index+1) +'" class="right_Charges form-control" type="text"  value="'+inCharges+'" onkeyup="totalAmount()" name="charges'+(index+1) +'">'
    		+'<input id="subbIdr'+(index+1) +'" class="subserviceIds" type="hidden" value="'+subIDs+'"></td>'
    		
    		+'<td id="codenamech'+(index+1) +'" class="col-sm-2 center" style="height: 21.5px;" >'
    		+'<input id="inChargesr'+(index+1) +'" class="right_Codename form-control" type="text"  value="0">'
    		+'</td>'
    		
    		+'<td class="col-sm-2 center" id="lastTdr'+(index+1) +'">'
    		+'<input id="inputCntr'+(index+1) +'" type="button" value="<<" onclick="addTRtoLeft('+(index+1) +')"></td>'
    		+'</tr>');  

	$('#tr' + trCnt).remove();	
	$('#subIDs').append(","+subIDs);

	totalAmount();
	
}
/*******
 * @author    :BILAL
 * @Date      :10-JUN-2017
 * @Code      :For Adding TR to left div
 * ******/
function addTRtoLeft(trCnt) {

	var subIDs=$("#subbIdr"+trCnt).val();	
	var subValues = $("#subIDs").html();
	var temp =  subValues+","; 
	var myString = temp.replace(","+subIDs+",",',');
	var setVal = myString.slice(0,-1);
	$('#subIDs').html(setVal);
	
	var chName     = $("#chNamer"+trCnt).text();
	//var charges    = $("#chargesr"+trCnt).val();
	var inCharges  = $("#inChargesr"+trCnt).val();
	var index = $("#leftDiv tr").length;
	
	
	$('#leftDiv').append('<tr id="tr'+(index+1) +'">'
    		+'<td id="chName'+(index+1) +'" class="col-sm-7 center" style="height: 21.5px;">'+chName+'</td>'
    		+'<td id="charges'+(index+1) +'" class="col-sm-3 center" style="height: 21.5px;">'
    		+'<input id="inCharges'+(index+1) +'" class="left_Charges form-control" type="text"  value="'+inCharges+'" onkeyup="totalAmount()" name="charges'+(index+1) +'">'
    		+'<input id="subbId'+(index+1) +'" class="subserviceId" type="hidden" value="'+subIDs+'"></td>'
    		+'<td class="col-sm-2 center" id="lastTd'+(index+1) +'">'
    		+'<input id="inputCnt'+(index+1) +'" type="button" onclick="addTRtoRight('+(index+1) +')" value=">>"></td>'
    		+'</tr>');
	
	
	
	$('#trs'+trCnt).remove();
	
	 totalAmount();
}
/*******
 * @author    :BILAL
 * @Date      :10-JUN-2017
 * @Code      :For Adding All TR to right div
 * ******/

function addAllTRtoRight() {
	/*$('#pleaseWait').show(function(){
		
		$("#leftDiv tr").each(function() {
			var tk=$(this).attr('id').toString();
			var id = tk.slice(2);
			addTRtoRight(id);		
		});
		$('#pleaseWait').hide();
	});*/
	
		$("#leftDiv tr").each(function() {
			var tk=$(this).attr('id').toString();
			var id = tk.slice(2);
			addTRtoRight(id);		
		});
		
	//var index = $("#rightDiv tr").length;
	
	totalAmount();
}

/*******
 * @author    :BILAL
 * @Date      :10-JUN-2017
 * @Code      :For Adding All TR to left div
 * ******//*
function addAllTRtoLeft() {

	//var index = $("#rightDiv tr").length;
	$("#rightDiv tr").each(function() {
		var tk=$(this).attr('id').toString();
		var id = tk.slice(2);
		addTRtoLeft(id);
	});
	
	 
}*/

/*******
 * @author    :BILAL
 * @Date      :26-MAY-2017
 * @Code      :For fetching all servies on load and sub services
 * ******/
function fetchAllService() {
	
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceList2",
		
		success : function(response) {
			multiSelect(response);
			fetchSubServiceCategoryList();
		}
	});

}

/*******
 * @author    :BILAL
 * @Date      :26-MAY-2017
 * @Code      :For fetching all  sub services with master and self id
 * ******/
function fetchSubServiceIsCat(masterId, selfId) {
	var servicesInfo=$("#servicesInfo").val();
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceIsCat",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			if (servicesInfo == "servicesInform") {
				servicesInfoTemplate(response) ;
			}else{
			SubServiceTemplatedemo(response);			
			//setTemplateForBedView(response);
			}

		}
	});
}

/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/


// multiselect ui
function multiSelect(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		list = list + '<option value="' + (response.listService[i].serviceId)
				+ '">' + (response.listService[i].serviceName) + '</option>';

	}
	
	$("#listmstr_select").html(list);
	$("#listmstr_select").select2();	

}


function setDyanamicDiv(setDiv, getDiv) {
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItme'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#li" + 0).val();
	var selfId = 0;
	if (liSize == 0) {

		fetchAllService();
		
	} else {
		
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		
	}// now inside submaster catagories

}

function removeInpuntFild(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItme' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#li" + 0).val();
	var selfId = 0;
	if (liSize == 0) {
		fetchAllService();

	} else {
		
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		
	}
}

// fo slave demo
// multiselect ui
function multiSelectSlave(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		list = list + '<option value="' + (response.lstSubService[i].subId)
				+ '">' + (response.lstSubService[i].categoryName) + '</option>';
	}
	// $("#e1").html(list);
	$("#listmstr_select").html(list);
}

function showData(){
	//For Service Id
	var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	var selfId  =0;
	
	if (liSizeForServices > 1) {
		selfId =$("#li" + (liSizeForServices - 1)).val();
	}
	
	
		 fetchSubServiceIsCat(masterId, selfId);

	
	
}

/*******
 * @author    :BILAL
 * @Date      :26-MAY-2017
 * @Code      :For fetching all  sub services by id with master and self id
 * ******/
function fetchSubServiceById(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			multiSelectSlave(response);
			
		}
	});
}
/*******
 * @author    :BILAL
 * @Date      :26-MAY-2017
 * @Code      :For fetching id of sub service name
 * ******/

function selectSubService() {
	
	var masterId = $('#profileList').val();
	$('#ChargesIdHidden').val(masterId);

	var selfId = 0;
	fetchSubServiceById(masterId, selfId);
}



/*******
 * @author    :BILAL
 * @Date      :27-MAY-2017
 * @Code      :Multi select list of sponsor 
 * ******/
function multiSelectForCharges(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}

	$("#listmstr_select_service").html(list);
	
}
/*******
 * @author    :BILAL
 * @Date      :27-MAY-2017
 * @Code      :Multi select list of sponsor here setting sponsor list
 * ******/
function setDyanamicDivForCharges(setDiv, getDiv) {

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
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lis' + (count) + '" type="hidden" value="' + id
			+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster();// for masters
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
		
	}

}

/*******
 * @author    :BILAL
 * @Date      :27-MAY-2017
 * @Code      :Multi select list of sponsor Here removing one one services 
 * ******/
function removeInpuntFildForCharges(count, id, setDiv) {
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
		
	}
}
/*******
 * @author    :BILAL
 * @Date      :27-MAY-2017
 * @Code      :Multi select sub list of sponsor 
 * ******/
function multiSelectSlaveForCharges(response) {

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
	
	$("#listmstr_select_service").html(list);
	
	//dynamically setting data on right div when query type is insert
	var queryType = $("#queryType").val();
	if(queryType == "insert"){
		fetchconfigdataonclick();
	}
	
}


/*******************************************************************************
 * Touheed's Plugin for Multi select for Hall wise charges 
 ******************************************************************************/

// MULTI SELECT UI LIST FOR HALL 
function multiSelectForCharges2(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstCharges.length; i++) {

		list = list + '<option value="' + (response.lstCharges[i].chargesId)
				+ '">' + (response.lstCharges[i].chargesName) + '</option>';
	}
	$("#listmstr_select_Hall").html(list);
}

// Touheed for multiselect Data
//SETTING DYNAMIC DIV OF HALL
function setDyanamicDivForCharges2(setDiv, getDiv) {
	// listmstr_select

	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItmesH'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges2('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisH' + (count) + '" type="hidden" value="' + id
			+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster2();// for masters
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById2(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveListById2(masterid, selfId);
		}
		
	}// now inside submaster catagories

}
//MULTI REMOVE OF HALL 
function removeInpuntFildForCharges2(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesH' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesMaster2();
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		// alert(liSize);
		if (liSize == 1) {
			fetchChargesSlaveListById2(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveListById2(masterid, selfId);
		}
		
	}
}

//MULTI SELECT SUB LIST FOR HALL 
function multiSelectSlaveForCharges2(response) {

	var list = "<option></option>";
	
	if( response.lstChargesSlave.length > 0){
	
		for ( var i = 0; i < response.lstChargesSlave.length; i++) {
			
			list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
					+ '">' + (response.lstChargesSlave[i].categoryName)
					+ '</option>';
			var selfId   =response.lstChargesSlave[i].selfId;
			var iscatHall=response.lstChargesSlave[i].isCategory;
			$("#selfId").val(selfId);
			$("#iscatHall").val(iscatHall);
		}
		
		$("#listmstr_select_Hall").html(list);
		//dynamically setting data on right div when query type is insert
		var queryType = $("#queryType").val();
		/*if(queryType == "insert"){
			fetchconfigdataonclick();
		}*/
	}else{
           $("#listmstr_select_Hall").html(list);
		var isBedAllocationScreen = $("#isBedAllocationScreen").val();
		if(isBedAllocationScreen == "Y")
			getPatientBedDetails();
	}
}




/*******
 * @author    :BILAL
 * @Date      :27-MAY-2017
 * @Code      :Geting hall and sponsor list(charges master list) 
 * ******/
function getAllChargesMaster() {
	var callfrom="sponsor";
	jQuery.ajax({
		type : "GET",
		url : "ehat/charges/sponsorandhallList",
		data : {
			"callfrom" : callfrom
			
		},
		success : function(response) {
			multiSelectForCharges(response);
		}
	});

}

/*******
 * @author    :BILAL
 * @Date      :23-MAY-2017
 * @Code      :Geting hall and sponsor list(charges master list) //
 * ******/
function getAllChargesMaster2() {
	var callfrom="hall";
	jQuery.ajax({
		type : "GET",
		url : "ehat/charges/sponsorandhallList",
		data : {
			"callfrom" : callfrom
			
	},
		success : function(response) {
			multiSelectForCharges2(response);
		}
	});

}
/*******
 * @author    :BILAL
 * @Date      :24-MAY-2017
 * @Code      :Geting hall and sponsor list(charges master list) 
 * ******/
function fetchChargesSlaveListById(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getChragesSlaveById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		
		},
		success : function(response) {
			
			multiSelectSlaveForCharges(response);
			
		}
	});
}

/*******
 * @author    :BILAL
 * @Date      :24-MAY-2017
 * @Code      :Geting sub hall and sub sponsor list(charges slave list) 
 * ******/
function fetchChargesSlaveListById2(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getChragesSlaveById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		
		},
		success : function(response) {
			multiSelectSlaveForCharges2(response);
		}
	});
}
/*******
 * @author    :BILAL
 * @Date      :09-JUN-2017
 * @Code      :For performing alculations on services
 * ******/
function totalAmount() {

	var total = 0;
	var cmt = 1;
	
	$(".right_Charges").each(function() {
		
		var charges  = parseFloat($(this).val());
		if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
			charges = 0;
		}
		total = total + charges;
		

	});
	
	cmt++;
	

	$("#totalcharges").val(parseFloat(total).toFixed(2));
	
	//$("#distribute").val(parseFloat(total).toFixed(2));// added by dayanand
	
	
}

/*******
 * @author    :BILAL
 * @Date      :12-JUN-2017
 * @Code      :For performing auto suggesstion on left div
 * ******/
function setAutoCompleteForConfiguration(inputId, callfrom) {

	var masterId =0; 
	var selfId =0;// self id
	var liSize = $("#dynamicItem li").length;
	
	var findingName = $("#" + inputId).val();
    if(findingName.length == 0){
    	var dynamicItem="dynamicItem";
    	var id="listmstr_select";
    	removeInpuntFild(dynamicItem,id,1);
    }
	
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}
	var inputs = [];
    if (liSize == 0 ) {
		
		inputs.push('selfId=' + selfId);
		inputs.push('serviceId=' + masterId);
		inputs.push('letter=' + encodeURIComponent(letter));
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/subservice/autoSuggestionSubServiceNames",
			success : function(r) {
				
				SubServiceTemplatedemo(r);
				

			}
		});
	} else {
		masterId= $("#li0").val();
		
		if (liSize > 1 ) {
		selfId = $("#li" + (liSize - 1)).val();
		}
		
		inputs.push('selfId=' + selfId);
		inputs.push('serviceId=' + masterId);
		
		inputs.push('letter=' + letter);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/subservice/getSubServiceIsCatForSearch",
			success : function(r) {
				
				SubServiceTemplatedemo(r);
				

			}
		});
	}

}
/*******
 * @author    :BILAL
 * @Date      :09-JUN-2017
 * @Code      :For setting list which comes from auto suggesstion
 * ******/
function autoCompTable1(response, id) {
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
	$("#" + id)
			.mcautocomplete(
					{
						
						showHeader : true,
						columns : [ {
							name : 'Category Name',
							width : '100px',
							valueField : 'categoryName'
						} ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {
							//var spl = (ui.item.spl = "" ? '' : ui.item.spl);
							console.log(ui.item);
								
								$('#byName').val(ui.item.categoryName);
							

							return false;
						},

						// The rest of the options are for configuring the ajax
						// webservice call.
						minLength : 1,
						source : function(request, response) {
							var data = myArray;
						
							console.log(data);
							console.log(data.lstSubService.length);
							var result;
							if (!data) {
								
								result = [ {
									/* 'dn' : 'No', */
									/*'categoryName' : 'Record',*/
								
								} ];
							} else {
								result = data.lstSubService;// Response List for
															// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");
						}
					});
}



/*******
 * @author    :BILAL
 * @Date      :14-JUN-2017
 * @Code      :For fetching configuration list 
 * ******/
function fetchConfigurationChargesList(callfrom,pageNumber) {
	
	if($('#byName2').val().trim() != '')
	{
		searchall('byName2',pageNumber)
		return false
	}
	
	var startIndex = 0;
    $('#callfrom').val(callfrom);
	$('#opdpagenation').show()
	$('#totalNumberOfPagesOpd').show()
    	
	$('#opdpagenation').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var inputs = [];
	inputs.push('startIndex=' + startIndex);
    
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getConfigurationListFromView",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			ConfigurationChargesTemplate(response,pageNumber);
		}
	});
}


/*******
 * @author    :BILAL
 * @Date      :14-JUN-2017
 * @Code      :For fetching configuration list 
 * ******/
function fetchConfigurationChargesList2(pageNumber) {
	var startIndex = 0;
	
	var inputs = [];
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getConfigurationListFromView2",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			ConfigurationChargesTemplate(response,pageNumber);
		}
	});
}


/*******
 * @author    :BILAL
 * @Date      :14-JUN-2017
 * @Code      :For  configuration list charges and sub charges (template)
 * ******/
function ConfigurationChargesTemplate(response,pageNumber) {
	var index = (pageNumber - 1) + '1';
	index = Number(index);

	/*var ht ="";
	ht= '<input class="form-control input-sm" id="byName" onkeyup="searchall(this.id)" '
		+' type="text" placeholder="Search" aria-controls="datatable1">';*/
	var htm = "";
    
	htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">#</th>'
		
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">SponsorName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">SponsorSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">HallName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">HallSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Combination</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Combination Slave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	//var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
		
		
	
		htm = htm
				
				+ "<tr  id='trli"+(index)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index)
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='chargesName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].chargesName
				+ "</td><td col-md-2-1 center center' id='chargesSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].categoryName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='comName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].combinationName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='comSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].subServicename
				+ "</td>"
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ response.lstConfigurations[i].idConfiguration + ","+(index )+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].idConfiguration + ", "+(index)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				+ "<input type='hidden' id='isComServId"+ (index) + "' value='"+ response.lstConfigurations[i].isComServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index) + "' value='"+ response.lstConfigurations[i].isComServlastId + "'>"
				
				+ "<input type='hidden' id='serviceId"+ (index) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
	var numberOfRows="";
	var indexopd=1;
	var opdcount = 0;
	var textVal = $('#byName2').val();
	
	if(textVal.trim() == '')
		opdcount = response.allChargesCount;
	else
		opdcount = response.lstConfigurations[0].allChargesCount;
	
	//alert('opdcount**** '+opdcount)
	
	var numberOfPages=(opdcount/10);
	var displayPagination=numberOfPages;    
	
	if(pageNumber == 1)
		{
	if(numberOfPages > 5){
	    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	    displayPagination=5;
	}
	for(var j=0;j<displayPagination;j++){
		 if(j == Number(pageNumber-1))
			{
		        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=fetchConfigurationChargesList('all',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

			}
			else
			{
		        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=fetchConfigurationChargesList('all',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
			}
			indexopd=indexopd+1;
	}
	if(numberOfPages>6){
	    numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	}

	$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
	$('#opdpagenation').html(numberOfRows);
}
	
    /*$("#search").html(ht);*/
	$("#popupDiv").html(htm);

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
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=fetchConfigurationChargesList('all',"+j+")><a class='page-link'>"+j+"</a></li>";
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
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=fetchConfigurationChargesList('all',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

/*******
 * @author    :BILAL
 * @Date      :15-JUN-2017
 * @Code      :For updating records from configuration list with sponsor, hall and combinations 
 * ******/
function updateConfiguration(configId,cnt) {
	
	//charges Id and Charges Slave Id
	var chargesId = $("#charges_id"+(cnt)).val();
	var chargesSlaveId = $("#chargesslave_id" +(cnt)).val();
	//var chargesSlaveName = $("#chargesSlaveName" +(cnt)).html();
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	//is combination flag
	var isComServId = $("#isComServId"+(cnt)).val();
	var isComServlastId = $("#isComServlastId" +(cnt)).val();
    //var subServicename =$("#subServicename" +(cnt)).val();
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }
	//Hall Id and Hall slave Id
	var hallId = $("#hall_id"+(cnt)).val();
	var hallSlaveId = $("#hallslave_id" +(cnt)).val();
	//var hallSlaveName=$("#hallSlaveName"+(cnt)).html();
	 if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		 hallId = 0;
	}
		if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
	 }
	//Service ids
	//var serviceId = $("#serviceId"+(cnt)).val();
	//var subserviceId = $("#subserviceId" +(cnt)).val();
	
	//var configIds=$("#configIds"+(cnt)).val();
	$('#queryType').val("update");
	
	$("#leftDiv tr").remove();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getConfigurationListFromViewForSub",
		data : {
			"chargesId"      : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			
			"hallId"         : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			
			"isComServId"      : parseInt(isComServId),
			"isComServlastId" : parseInt(isComServlastId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			if(chargesSlaveId ==0){// added by dayanand
			   $('#listmstr_select_service').select2('val',"0");
			    $('#dynamicItems').html(" ");
			}
			ConfigurationServiceTemplate(response);
			
			if (chargesSlaveId > 0 && chargesId > 0) {
				//fetchSuperCatogoiresSlave2(chargesSlaveId); // fetch list on select box of
				fetchMulSuperSlaveOnChargesConfiguration(chargesSlaveId);// added by dayanand to get sponsor details
			}else{
				//refreshConfig();
			}
			
			if (hallSlaveId > 0 && hallId > 0) {
				fetchSuperCatogoiresForHall(hallSlaveId); // fetch list on select box
				// of charges for Hall
			}
			
			if (isComServId > 0 && isComServlastId > 0) {
				fetchSuperCatogoiresForCombination(isComServlastId);
				getAmountofConfiguredPkg(configId);
			}
			
			/*if (serviceId > 0 && subserviceId > 0) {
				fetchSuperCatogoiresForSub(subserviceId);
			}*/
			
			//fetch all sub services on left div
			fetchSubServiceCategoryList();
			
			
		}
	});	
}

function getAmountofConfiguredPkg(configId){//is combination flag
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getAmountofConfiguredPkg",
		data : {
			"configureId" : parseInt(configId)
		
		},
		success : function(response) {
		
			setAmountofService(response);
		}
	});
}

/*******
 * @author    :BILAL
 * @Date      :15-JUN-2017
 * @Code      :For updating records from configuration list with sponsor, hall and combinations (setting template)
 * ******/
function ConfigurationServiceTemplate(response) {

	var htm = '';
	var number=0;
	var operator='';
	var increaseordecrease='';
	//var distribute=0;
	var fromDate='';
	var toDate='';
	var hallCharges=0;
	var medicalCharges=0;
	var isoHallCharges=0;
	var isoMedicalCharges=0;
	//var deptname='';
	var departMentID=0;
	var index = 0;
	//var cmt = $("#leftDiv tr").length;
	for ( var i = 0; i < response.lstServiceConfigurations.length; i++) {
	
		var categoryName = response.lstServiceConfigurations[i].categoryName;
		var charges = response.lstServiceConfigurations[i].charges;
	    var idConfiguration =response.lstServiceConfigurations[i].idConfigurations;
		var serviceId=response.lstServiceConfigurations[i].serviceId;
		var codenamech = response.lstServiceConfigurations[i].codenamech;
	    number = response.lstServiceConfigurations[i].number;
		operator = response.lstServiceConfigurations[i].operator;
	//	distribute = response.lstServiceConfigurations[i].distribute;
		increaseordecrease = response.lstServiceConfigurations[i].increaseordecrease;
		fromDate = response.lstServiceConfigurations[i].fromDate;
		toDate = response.lstServiceConfigurations[i].toDate;
		hallCharges = response.lstServiceConfigurations[i].hallCharges;
		medicalCharges = response.lstServiceConfigurations[i].medicalCharges;
		isoHallCharges = response.lstServiceConfigurations[i].isoHallCharges;
		isoMedicalCharges = response.lstServiceConfigurations[i].isoMedicalCharges;
		deptname = response.lstServiceConfigurations[i].deptname;
		departMentID =response.lstServiceConfigurations[i].departMentID;

		
		htm = htm
		
				
			
				+'<tr id="trs'+(i + 1)+'">'
				+'<td id="chNamer'+(i + 1)+'" class="col-sm-5 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chargesr'+(i + 1)+'" class="col-sm-3 center" style="height: 21.5px;">'
				+'<input id="inChargesr'+(i + 1)+'" class="right_Charges" type="text"  value="'+charges+'" onkeyup="totalAmount()" name="charges'+(i + 1)+'">'
				+'</td>'
				
				
				
				+'<td id="codenamech'+(index+1) +'" class="col-sm-2 center" style="height: 21.5px;" >'
	    		+'<input id="inChargesr'+(index+1) +'" class="right_Codename" type="text"  value="'+codenamech+'">'
	    		+'</td>'
				
				+'<td class="col-sm-2 center" id="lastTdr'+(i + 1)+'">'
				+'<input id="inputCntr'+(i + 1)+'" type="button" value="<<" onclick="addTRtoLeft('+(i + 1)+')"></td>'
				+'<input type="hidden" id="idservices'+ (index + 1) +'"  value="'+ serviceId + '">'
				+'<input type="hidden" id="idConfiguration'+ (index + 1) +'" class="idc" value="'+ idConfiguration + '">'
				+'<input id="subbIdr'+(i + 1)+'" class="subserviceIds" type="hidden" value="'+serviceId+'">'
				
				+'</tr>';
		
		//,newdelete('+idConfiguration+') ,newdelete('+idConfiguration+')
		$('#subIDs').append(","+serviceId);
		index++;
		
		var selfId   =response.lstServiceConfigurations[i].selfId;
		var iscatHall=response.lstServiceConfigurations[i].iscatHall;
		$("#selfId").val(selfId);
		$("#iscatHall").val(iscatHall);
		
	}

	
	$("#number").val(number);
	$("#operator").val(operator);
	//$("#distribute").val(distribute);
	$("#fromDate").val(fromDate);
	$("#toDate").val(toDate);
	$("#hallCharges").val(hallCharges);
	$("#medicalCharges").val(medicalCharges);
	
	$("#isoHallCharges").val(isoHallCharges);
	$("#isoMedicalCharges").val(isoMedicalCharges);
	
	$("#deptIdForConfig").val(departMentID);
	//$("#configId").val(idConfiguration); 
	
	if (increaseordecrease == "+") {
		$('input[name="incdecType"][value="+"]').prop('checked', true);
		$('input[name="incdecType"][value="-"]').prop('checked', false);
	} else {
		$('input[name="incdecType"][value="+"]').prop('checked', false);
		$('input[name="incdecType"][value="-"]').prop('checked', true);
	}
	
	$("#rightDiv").html(htm);
	totalAmount();
	

}


/*******
 * @author    :BILAL
 * @Date      :14-JUN-2017
 * @Code      :for fetching data on select box 
 * ******/
function fetchSuperCatogoiresSlave2(chargesMasterDto) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : parseInt(chargesMasterDto)
		},
		
		url : "ehat/chargesSlave/fetchsup",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForList2('dynamicItems',response);
		}
	});
}

/*******
 * @author    :BILAL
 * @Date      :17-JUN-2017
 * @Code      :for fetching data on select box 
 * ******/
function fetchSuperCatogoiresForHall(chargesMasterDto) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : parseInt(chargesMasterDto)
		},
		
		url : "ehat/chargesSlave/fetchsup",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForList3('dynamicItems2',response);
		}
	});
}
/*******
 * @author    :BILAL
 * @Date      :14-JUN-2017
 * @Code      :for fetching data on select box on edit
 * ******/
function setDyanamicDivForList2(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id   = response.lstChargesSlave[i].slaveId;
        var isCategory = response.lstChargesSlave[i].isCategory;
		
		if (isCategory == "Y") {
		 htm = htm+ '<li class="select2-search-choice" id="liItmes'
			+ i
			+ '">'
			+ '<div>'
			+ name+'(C)'
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges('
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
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lis' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
	}
		}
	$('#' + setDiv).html(htm);
}

/*******
 * @author    :BILAL
 * @Date      :14-JUN-2017
 * @Code      :for fetching data on select box on eit
 * ******/
function setDyanamicDivForList3(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
		 htm = htm+ '<li class="select2-search-choice" id="liItmesH'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildForCharges2('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisH' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
	}
	$('#' + setDiv).html(htm);
}


/*******
 * @author    :BILAL
 * @Date      :14-JUN-2017
 * @Code      :for deleting configuration data 
 * ******/
function deleteConfiguration(idConfiguration ,cnt ) {
	//charges Id and Charges Slave Id
	var chargesId = $("#charges_id" + (cnt)).val();
	var chargesSlaveId = $("#chargesslave_id" + (cnt)).val();

	if (chargesId == "" || chargesId == null || chargesId == undefined
			|| isNaN(chargesId)) {
		chargesId = 0;
	}

	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesId = 0;
	}

	// is combination flag
	var isComServId = $("#isComServId" + (cnt)).val();
	var isComServlastId = $("#isComServlastId" + (cnt)).val();

	if (isComServId == "" || isComServId == null || isComServId == undefined
			|| isNaN(isComServId)) {
		isComServId = 0;
	}
	if (isComServlastId == "" || isComServlastId == null
			|| isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	}
	
	// Hall Id and Hall slave Id
	var hallId = $("#hall_id" + (cnt)).val();
	var hallSlaveId = $("#hallslave_id" + (cnt)).val();

	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined
			|| isNaN(hallSlaveId)) {
		hallSlaveId = 0;
	}
	
	var r = confirm("Are You Sure You Want To Delete?");
	if (r == true) {
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/configurationservice/deleteConfigurationList",
			data : {
				"idConfiguration" : parseInt(idConfiguration),
				"chargesId"       : chargesId,
				"chargesSlaveId"  : chargesSlaveId,
				
				"hallId"          : parseInt(hallId),
				"hallSlaveId"     : parseInt(hallSlaveId),
				
				"isComServId"     : parseInt(isComServId),
				"isComServlastId" : parseInt(isComServlastId)
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				alert(response);
				reload();
			}
			
		});
		
	}
	
	
}


/*******
 * @author    :BILAL
 * @Date      :16-JUN-2017
 * @Code      :for setting from date and to date 
 * ******/
function fromDateToDate() {
	
	//$('.open-datetimepicker').datepicker();
	 $('#fromDate').datepicker({
	      autoclose: true
	  });
	 $('#toDate').datepicker({
	      autoclose: true
	    });
	
}


/*******
 * @author    :BILAL
 * @Date      :16-JUN-2017
 * @Code      :for getting list of department 
 * ******/
function getAllDeptForConfiguration() {
    jQuery.ajax({
        async : true,
        type : "POST",
        url : "ehat/dept/viewAllDeptList",
        error : function() {
            alert('error');
        },
        success : function(r) {
            setTempAllForConfiguration(r);//call template
        }
    });
}
/*******
 * @author    :BILAL
 * @Date      :16-JUN-2017
 * @Code      :for setting list of department 
 * ******/
function setTempAllForConfiguration(r) {
	var list = "<option value='0'>--Select Department--</option>";    
    for ( var i = 0; i < r.lstDepts.length; i++) {    

        list = list + "<option value='"+r.lstDepts[i].deptId+"'>" + (r.lstDepts[i].deptName) + "</option>";    
        }  
    $("#deptIdForConfig").html(list);
}

/*******
 * @author    :BILAL
 * @Date      :16-JUN-2017
 * @Code      :for tooltip 
 * ******/
function handleConfigurationTooltips() {
	
	$('.tip-focus').tooltip({
		trigger: 'focus'
	});
}



/**
 * @author  Bilal
 * @code    For fetching records from database of charges configuration 
 * ****/
function fetchAllListForUpdateFromCOnfiguration() {
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/configurationservice/fetchAllListForUpdate",
		
		success : function(response) {
			
			
		}
	});
}



/**
 * @author   Bilal
 * @date     20-JUN-2017
 * @code     For update the fields with id
 * ****/
function fetchAllListByHallIdAndByChargesId() {
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/configurationservice/fetchAllListByHallIdAndByChargesId",
		
		success : function(response) {
			
		}
	});
}



/**
 * @author  Bilal
 * @date    21-JUN-2017
 * @code    For fetching Hall type id 
 * **/
function fetchehatHallTypeId() {
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
			
			
		}
	});
}


/**
 * @author    Bilal
 * @date      21-JUN-2017
 * @code      For fetching Hall id 
 * **/
function fetchehatHallNmaeId() {
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
			
		}
	});
}


/**
 * @author    Bilal
 * @date      24-JUN-2017
 * @code      For fetching records from configuration based on sponsor id and hall id
 * **/
function fetchehatConfiguration() {
	var hallId = 2;
	var hallSlaveId = 4;
	var chargesId = 0;
	var chargesSlaveId = 0;
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/fetchAllListForUpdate",
		data : {
			"hallId" : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			"chargesId" : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			console.log(response);
			
		}
	});
}


/**
 * @author : Bilal
 * @date   : 31-july-2017
 * @code   : for multi select of combination of services***/

function multiSelectcom(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		list = list + '<option value="' + (response.listService[i].serviceId)
				+ '">' + (response.listService[i].serviceName) + '</option>';

	}
	$("#distribute").val(0);
	$("#listmstr_select_combination").html(list);

}

function setDyanamicDivcom(setDiv, getDiv) {
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItmesHc'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcom('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisHc' + (count) + '" type="hidden" value="' + id
			+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	
	if (liSize == 0) {
		fetchAllServicecom();// for masters
	} else {
		var masterid = $("#lisHc" + 0).val();
		var selfId = 0;
		if (liSize == 1) {
			fetchSubServiceByIdcom(masterid, selfId);
		} else {
			selfId = $("#lisHc" + (liSize - 1)).val();
			fetchSubServiceByIdcom(masterid, selfId);
		}
		
	}// now inside submaster catagories

   
}

function removeInpuntFildcom(count, id, setDiv) {

	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesHc' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#lisHc" + 0).val();
	var selfId = 0;
	
	if (masterid == "" || masterid == null || masterid == undefined || isNaN(masterid)) {
		masterid = 0;
	}
	if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
		selfId = 0;
	}
	if (liSize == 0) {
		fetchAllServicecom();

	} else {
		
		if (liSize == 1) {
			fetchSubServiceByIdcom(masterid, selfId);
		} else {
			selfId = $("#lisHc" + (liSize - 1)).val();
			
			if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
				selfId = 0;
			}
			fetchSubServiceByIdcom(masterid, selfId);
		}
		
	}
	$('distribute').val(0);
}


function multiSelectSlavecom(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		list = list + '<option value="' + (response.lstSubService[i].subId)
				+ '">' + (response.lstSubService[i].categoryName) + '</option>';

	}
	$("#distribute").val(0);
	/*$("#distribute").val(response.lstSubService.charges);*/
	$("#listmstr_select_combination").html(list);

	// dynamically setting data on right div when query type is insert
	var queryType = $("#queryType").val();
	if (queryType == "insert") {
		//fetchconfigdataonclick();// committed by dayanand
		getAmountofService();
	}
}
/**@author  :Bilal
 * @date    :14-aug-2017
 * @code    :getting amount of services**/
function getAmountofService() {

	//is combination flag
	var isComServId     = $("#lisHc0").val();
	var isComServlastId = 0;
	var liSizeCom       = $("#dynamicItemcom li").length;
	isComServlastId     =$("#lisHc" + (liSizeCom - 1)).val();
    
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getAmountofService",
		data : {
			"isComServlastId" : parseInt(isComServlastId)
		
		},
		success : function(response) {
		
			setAmountofService(response);
		}
	});
}

function setAmountofService(response) {

	var index = 0;
	var charges =0;
	var iscombination ='N';
	for ( var i = 0; i < response.lstSubService.length; i++) {

		 charges = response.lstSubService[i].charges;
		 iscombination = response.lstSubService[i].iscombination;
		index++;
		

	}
	var query=$('#queryType').val();
	//if(query == "insert")
	 $("#distribute").val(charges);// committed by dayanand
    $("#iscombination").val(iscombination);
	
}
/*******
 * @author    :BILAL
 * @Date      :16-JUly-2017
 * @Code      :for fetching list of combinations 
 * ******/
function fetchAllServicecom() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceListCom",
		
		success : function(response) {
			multiSelectcom(response);
			
		}
	});

}

/**
 * @author : Bilal
 * @date   : 31-july-2017
 * @code   : for fectch all sub services whose combination flag is Y under services
 * ***/
function fetchSubServiceByIdcom(masterId, selfId) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceByIdcom",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
		
			multiSelectSlavecom(response);
		}
	});
}

/**
 * @author bilal
 * @date   31-july-2017
 * @code   for update of sub service list
 * **/
function fetchSuperCatogoiresForSub(serviceId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForSub('dynamicItem', response);
		}
	});
}

/**
 * @author bilal
 * @date   31-july-2017
 * @code   for update of sub service list
 * **/
function setDyanamicDivForSub(setDiv, response) {
	var htm = "";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count = i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
		htm = htm
				+ '<li class="select2-search-choice" id="liItme'
				+ i
				+ '">'
				+ '<div>'
				+ name
				+ '</div>'
				+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
				+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
				+ '<input id="li' + (count) + '" type="hidden" value="' + id
				+ '">';
		+'</li>';
	}
	$('#' + setDiv).html(htm);
}

/**
 * @author bilal
 * @date   31-july-2017
 * @code   for update of Combination flag of service
 * **/
function fetchSuperCatogoiresForCombination(serviceId) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchsup",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForCombination('dynamicItemcom', response);
		}
	});
}

/**
 * @author bilal
 * @date   31-july-2017
 * @code   for update of Combination flag of service
 * **/
function setDyanamicDivForCombination(setDiv, response) {
	var htm = "";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count = i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
		htm = htm
				+ '<li class="select2-search-choice" id="liItmesHc'
				+ i
				+ '">'
				+ '<div>'
				+ name
				+ '</div>'
				+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcom('
				+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
				+ '<input id="lisHc' + (count) + '" type="hidden" value="' + id
				+ '">';
		+'</li>';
	}
	$('#' + setDiv).html(htm);
}



/**
 * @author  bilal
 * @date    31-JUN-2017
 * @code    for getting configuration data from view to show on popup
 * 
 **/
function getConfigurationdata(callfrom,pageNumber) {
	$('#callfrom').val(callfrom);
	//$('#opdpagenation').hide()
	//$('#totalNumberOfPagesOpd').hide()
	
    var startIndex = 0;
	
	$('#opdpagenation').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var inputs = [];
	inputs.push('startIndex=' + startIndex);
	inputs.push('callfrom=' + callfrom);
	
	if (callfrom == "combination") {
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			//data : str + "&reqType=AJAX",
			data : {
				"callfrom" : callfrom
			},
			url : "ehat/configurationservice/getConfigurationdata",
			data	: str + "&reqType=AJAX",

			error : function() {
				alert('error');
			},
			success : function(response) {

				ConfigurationChargesTemplatecom(response,pageNumber);
			}
		});
	} else if (callfrom == "sponsor") {
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			
			url : "ehat/configurationservice/getConfigdataSponsor",
			data	: str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(response) {

				ConfigurationChargesTemplateSponsor(response,pageNumber);
			}
		});
	} else {
		jQuery.ajax({
			async : false,
			type : "POST",
			
			url : "ehat/configurationservice/getConfigdataHallWise",

			error : function() {
				alert('error');
			},
			success : function(response) {

				ConfigurationChargesTemplateHall(response,pageNumber);
			}
		});
	}
	

}

/**
 * @author   :Bilal
 * @Date     :4-Aug-2017
 * @code     :for fetching dynamic services on right div
 * **/
function fetchconfigdataonclick() {
	
	var length = $("#rightDiv tr").length;
	if(length > 0){
		$("#subIDs").text('');
		
	}
	//charges Id and Charges Slave Id
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	//is combination flag
	var isComServId = $("#lisHc0").val();
	var isComServlastId = 0;
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId =$("#lisHc" + (liSizeCom - 1)).val();
    
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }
	//Hall Id and Hall slave Id
	var hallId = $("#lisH0").val();
	var hallSlaveId =0;
	var liSizeHall = $("#dynamicItems2 li").length;
    hallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
	
	 if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		 hallId = 0;
	}
		if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
	 }
	
	//$('#queryType').val("update");
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getConfigurationListFromViewForSub",
		data : {
			"chargesId"      : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			
			"hallId"         : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			
			"isComServId"      : parseInt(isComServId),
			"isComServlastId" : parseInt(isComServlastId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
		
			setDynamicServicesOnright(response);
			//getTotServConfigTemp(response);
		}
	});		
}

/**
 * @author   :Bilal
 * @Date     :4-Aug-2017
 * @code     : for set dynamic services on right div
 * **/
function setDynamicServicesOnright(response) {

	var htm = '';
	
	var index = 0;
	
	var cmt = $("#leftDiv tr").length;
	for ( var i = 0; i < response.lstServiceConfigurations.length; i++) {

		var categoryName     = response.lstServiceConfigurations[i].categoryName;
		var charges          = response.lstServiceConfigurations[i].charges;
		var serviceId        =response.lstServiceConfigurations[i].serviceId;
		var idConfigurations =response.lstServiceConfigurations[i].idConfigurations;
		var codenamech       =response.lstServiceConfigurations[i].codenamech;
		htm = htm
		
				
			
				+'<tr id="trs'+(cmt + 1)+'">'
				+'<td id="chNamer'+(cmt + 1)+'" class="col-sm-5 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chargesr'+(cmt + 1)+'" class="col-sm-3 center" style="height: 21.5px;">'
				+'<input id="inChargesr'+(cmt + 1)+'" class="right_Charges form-control" type="text" value="'+charges+'" onkeyup="totalAmount()" name="charges'+(cmt + 1)+'">'
				+'</td>'
				
				
				
				+'<td id="codenamech'+(index+1) +'" class="col-sm-2 center" style="height: 21.5px;" >'
	    		+'<input id="inChargesr'+(index+1) +'" class="right_Codename form-control" type="text"  value="'+codenamech+'">'
	    		+'</td>'
				
				+'<td class="col-sm-2 center" id="lastTdr'+(cmt + 1)+'">'
				+'<input id="inputCntr'+(cmt + 1)+'" type="button" value="<<" onclick="addTRtoLeft('+(cmt + 1)+')"></td>'
				
				+'<input id="subbIdr'+(cmt + 1)+'" class="subserviceIds" type="hidden" value="'+serviceId+'">'
				+'<input type="hidden" id="idservices'+ (index + 1) +'"  value="'+ serviceId + '">'
				+'<input type="hidden" id="idConfiguration'+ (index + 1) +'" class="idc"  value="'+ idConfigurations + '">'
				+'</tr>';
		
		//,newdelete('+idConfigurations+')
		$('#subIDs').append(","+serviceId);
		index++;
		cmt++;
		
		var selfId   =response.lstServiceConfigurations[i].selfId;
		var iscatHall=response.lstServiceConfigurations[i].iscatHall;
		$("#selfId").val(selfId);
		$("#iscatHall").val(iscatHall);
		$("#hallCharges").val(response.lstServiceConfigurations[i].hallCharges);
	}

	$("#rightDiv").html(htm);
	
	
	totalAmount();
}


/**
 * @author   :Bilal
 * @date     :5-Aug-2017
 * @code     :for setting template for combination
 * **/
function ConfigurationChargesTemplatecom(response,pageNumber) {
	var index = (pageNumber - 1) + '1';
	index = Number(index);

	var htm = "";
	 htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">#</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Combination</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Combination Slave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">SponsorName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">SponsorSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">HallName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">HallSlave</th>'
		
	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	
	//var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
	
		
		
		htm = htm
				
				+ "<tr  id='trli"+(index)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index)
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='comName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].combinationName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='comSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].subServicename
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='chargesName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].chargesName
				+ "</td><td col-md-2-1 center center' id='chargesSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].categoryName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
				+ "</td>"
				
				
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ response.lstConfigurations[i].idConfiguration + ","+(index)+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].idConfiguration + ", "+(index)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				+ "<input type='hidden' id='isComServId"+ (index) + "' value='"+ response.lstConfigurations[i].isComServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index) + "' value='"+ response.lstConfigurations[i].isComServlastId + "'>"
				
				+ "<input type='hidden' id='serviceId"+ (index) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
	
	var numberOfRows="";
	var indexopd=1;
	var opdcount = 0;
	var textVal = $('#byName2').val();
	
	if(textVal.trim() == '')
		opdcount = response.combinationCount;
	else
		opdcount = response.combinationCntSearch;
	
	//alert('opdcount**** '+opdcount)
	
	var numberOfPages=(opdcount/10);
	var displayPagination=numberOfPages;    
	
	if(pageNumber == 1)
		{
	if(numberOfPages > 5){
	    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	    displayPagination=5;
	}
	for(var j=0;j<displayPagination;j++){
		 if(j == Number(pageNumber-1))
			{
		        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getConfigurationdata('combination',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

			}
			else
			{
		        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getConfigurationdata('combination',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
			}
			indexopd=indexopd+1;
	}
	if(numberOfPages>6){
	    numberOfRows +="<li class='next' onclick='nextPaginationForComb("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	}

	$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
	$('#opdpagenation').html(numberOfRows);
}
   
	$("#popupDiv").html(htm);

}

function nextPaginationForComb(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPaginationForComb("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getConfigurationdata('combination',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPaginationForComb("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPaginationForComb(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPaginationForComb("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getConfigurationdata('combination',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPaginationForComb("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

/**
 * @author   :Bilal
 * @date     :5-Aug-2017
 * @code     :for setting template for sponsor
 * **/
function ConfigurationChargesTemplateSponsor(response,pageNumber) {

	var index = (pageNumber - 1) + '1';
	index = Number(index);
	
	var htm = "";
	 htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">#</th>'
		
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">SponsorName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">SponsorSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">HallName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">HallSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Combination</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Combination Slave</th>'
	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	
	//var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
	
		
		
		htm = htm
				
				+ "<tr  id='trli"+(index)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index)
				+ "</td>"
				
				
				
				+"<td class='col-md-2-1 center' id='chargesName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].chargesName
				+ "</td><td col-md-2-1 center center' id='chargesSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].categoryName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='comName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].combinationName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='comSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].subServicename
				+ "</td>"
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ response.lstConfigurations[i].idConfiguration + ","+(index)+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].idConfiguration + ", "+(index)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				+ "<input type='hidden' id='isComServId"+ (index) + "' value='"+ response.lstConfigurations[i].isComServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index) + "' value='"+ response.lstConfigurations[i].isComServlastId + "'>"
				
				+ "<input type='hidden' id='serviceId"+ (index) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
	
	var numberOfRows="";
	var indexopd=1;
	var opdcount = 0;
	//var textVal = $('#byName2').val();
	
	//if(textVal.trim() == '')
		opdcount = response.sponsorWiseCount;
    //	else
	//	opdcount = response.sponCountSearch;
	
	//alert('opdcount**** '+opdcount)
	
	var numberOfPages=(opdcount/10);
	var displayPagination=numberOfPages;    
	
	if(pageNumber == 1)
		{
	if(numberOfPages > 5){
	    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	    displayPagination=5;
	}
	for(var j=0;j<displayPagination;j++){
		 if(j == Number(pageNumber-1))
			{
		        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getConfigurationdata('sponsor',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

			}
			else
			{
		        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getConfigurationdata('sponsor',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
			}
			indexopd=indexopd+1;
	}
	if(numberOfPages>6){
	    numberOfRows +="<li class='next' onclick='nextPaginationForSponsor("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	}

	$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
	$('#opdpagenation').html(numberOfRows);
}
   
	$("#popupDiv").html(htm);

}

function nextPaginationForSponsor(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPaginationForSponsor("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getConfigurationdata('sponsor',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPaginationForSponsor("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPaginationForSponsor(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPaginationForSponsor("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getConfigurationdata('sponsor',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPaginationForSponsor("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


/**
 * @author   :Bilal
 * @date     :5-Aug-2017
 * @code     :for setting template for hallWise
 * **/
function ConfigurationChargesTemplateHall(response) {

	var htm = "";
	 htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">#</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">HallName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">HallSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">SponsorName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">SponsorSlave</th>'
		
		
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Combination</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Combination Slave</th>'
	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	
	var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
	
		
		
		htm = htm
				
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='chargesName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].chargesName
				+ "</td><td col-md-2-1 center center' id='chargesSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].categoryName
				+ "</td>"
				
				
				
				+ "<td class='col-md-2-1 center' id='comName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].combinationName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='comSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].subServicename
				+ "</td>"
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ response.lstConfigurations[i].idConfiguration + ","+(index + 1)+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].idConfiguration + ", "+(index + 1)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index + 1) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				+ "<input type='hidden' id='isComServId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].isComServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].isComServlastId + "'>"
				
				+ "<input type='hidden' id='serviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
  
	$("#popupDiv").html(htm);

}
/**
 * @author   :Bilal
 * @date     :28-08-2017
 * @code     :for delete one service
 * ***/
function newdelete(id) {
	if (id == "" || id == null || id == undefined || isNaN(id)) {
		id = 0;
	}
	if (id > 0) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/configurationservice/newdelete",
			data : {
				"id" : id
			},
			error : function() {
				alert('error');
			},
			success : function(response) {

			}
		});
	}

}
/**
 * @author   :Bilal
 * @date     :04-10-2017
 * @code     :for autosuggetion on popup with sponsor name sponsor slave,Hall,HallSlave,Combination,CombSlave
 *  ***/
function searchall(inputId,pageNumber) {
	var startIndex = 0;
	
$('#opdpagenation').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var callfrom = $('#callfrom').val();
	
	if (callfrom == "combination") {
		searchcombination(inputId,pageNumber);
	} else if (callfrom == "sponsor") {
		searchsponsor(inputId,pageNumber);
	} else if (callfrom == "hallwise") {
		searchhallwise(inputId);
	} else {
		var usertype = "";
		var letter = "";
		if (callfrom = "search") {
			letter = $("#byName2").val();
		}
		var findingName = $("#" + inputId).val();

		var inputs = [];

		inputs.push('findingName=' +encodeURIComponent(findingName));
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + encodeURIComponent(letter));
		inputs.push('startIndex=' + startIndex);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/configurationservice/searchall",
		//	body:JSON.stringify(dataToSend),
			success : function(r) {

				ConfigurationChargesTemplate(r,pageNumber);

			}
		});
	}
}

/**
 * @author   :Bilal
 * @date     :05-10-2017
 * @code     :for autosuggetion on popup with Combination,CombSlave 
 * ***/
function searchcombination(inputId,pageNumber){
	 var startIndex = 0;
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName2").val();
	}
	var findingName = $("#" + inputId).val();

	 $('#opdpagenation').find('.active').removeClass('active');
		
		startIndex= (pageNumber-1)+"0";
		var countpage=$("#countopdpage").val();
		var countp=countpage-6;
		for(var k=countp;k <= countpage;k++){
			$("#liopd"+k).removeClass('active').addClass('notActive');
		}
		$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + encodeURIComponent(letter));
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/searchcombination",

		success : function(r) {

			ConfigurationChargesTemplatecomForSearch(r,pageNumber);

		}
	});
}

function ConfigurationChargesTemplatecomForSearch(response,pageNumber) {
	var index = (pageNumber - 1) + '1';
	index = Number(index);

	var htm = "";
	 htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">#</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Combination</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Combination Slave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">SponsorName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">SponsorSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">HallName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">HallSlave</th>'
		
	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	
	//var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
	
		
		
		htm = htm
				
				+ "<tr  id='trli"+(index)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index)
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='comName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].combinationName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='comSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].subServicename
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='chargesName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].chargesName
				+ "</td><td col-md-2-1 center center' id='chargesSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].categoryName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
				+ "</td>"
				
				
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ response.lstConfigurations[i].idConfiguration + ","+(index)+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].idConfiguration + ", "+(index)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				+ "<input type='hidden' id='isComServId"+ (index) + "' value='"+ response.lstConfigurations[i].isComServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index) + "' value='"+ response.lstConfigurations[i].isComServlastId + "'>"
				
				+ "<input type='hidden' id='serviceId"+ (index) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
	
	var numberOfRows="";
	var indexopd=1;
	var opdcount = 0;
	//var textVal = $('#byName2').val();
	
	/*if(textVal.trim() == '')
		opdcount = response.combinationCount;
	else*/
		opdcount = response.combinationCntSearch;
	
	//alert('opdcount**** '+opdcount)
	
	var numberOfPages=(opdcount/10);
	var displayPagination=numberOfPages;    
	
	if(pageNumber == 1)
		{
	if(numberOfPages > 5){
	    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	    displayPagination=5;
	}
	for(var j=0;j<displayPagination;j++){
		 if(j == Number(pageNumber-1))
			{
		        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=searchcombination('combination',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

			}
			else
			{
		        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=searchcombination('combination',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
			}
			indexopd=indexopd+1;
	}
	if(numberOfPages>6){
	    numberOfRows +="<li class='next' onclick='nextPaginationForCombSearch("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	}

	$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
	$('#opdpagenation').html(numberOfRows);
}
   
	$("#popupDiv").html(htm);

}

function nextPaginationForCombSearch(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPaginationForCombSearch("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=searchcombination('combination',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPaginationForCombSearch("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPaginationForCombSearch(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPaginationForCombSearch("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=searchcombination('combination',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPaginationForCombSearch("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

/**
 * @author   :Bilal
 * @date     :05-10-2017
 * @code     :for autosuggetion on popup with Sponsor and sponsor slave
 *  ***/
function searchsponsor(inputId,pageNumber){
	 var startIndex = 0;
	
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName2").val();
	}
	var findingName = $("#" + inputId).val();
	
    $('#opdpagenation').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');

	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/searchsponsor",

		success : function(r) {

			ConfigurationChargesTemplateSponsorForSearch(r,pageNumber);

		}
	});
}

function ConfigurationChargesTemplateSponsorForSearch(response,pageNumber) {

	var index = (pageNumber - 1) + '1';
	index = Number(index);
	
	var htm = "";
	 htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">#</th>'
		
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">SponsorName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">SponsorSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">HallName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">HallSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Combination</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Combination Slave</th>'
	
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	
	//var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
	
		
		
		htm = htm
				
				+ "<tr  id='trli"+(index)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index)
				+ "</td>"
				
				
				
				+"<td class='col-md-2-1 center' id='chargesName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].chargesName
				+ "</td><td col-md-2-1 center center' id='chargesSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].categoryName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='comName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].combinationName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='comSlaveName"
				+ (index)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].subServicename
				+ "</td>"
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfiguration("+ response.lstConfigurations[i].idConfiguration + ","+(index)+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].idConfiguration + ", "+(index)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				+ "<input type='hidden' id='isComServId"+ (index) + "' value='"+ response.lstConfigurations[i].isComServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index) + "' value='"+ response.lstConfigurations[i].isComServlastId + "'>"
				
				+ "<input type='hidden' id='serviceId"+ (index) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
	
	var numberOfRows="";
	var indexopd=1;
	var opdcount = 0;
	/*var textVal = $('#byName2').val();
	
	if(textVal.trim() == '')
		opdcount = response.sponsorWiseCount;
	else*/
		opdcount = response.sponCountSearch;
	
	//alert('opdcount**** '+opdcount)
	
	var numberOfPages=(opdcount/10);
	var displayPagination=numberOfPages;    
	
	if(pageNumber == 1)
		{
	if(numberOfPages > 5){
	    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	    displayPagination=5;
	}
	for(var j=0;j<displayPagination;j++){
		 if(j == Number(pageNumber-1))
			{
		        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=searchsponsor('sponsor',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

			}
			else
			{
		        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=searchsponsor('sponsor',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
			}
			indexopd=indexopd+1;
	}
	if(numberOfPages>6){
	    numberOfRows +="<li class='next' onclick='nextPaginationForSponsorSearch("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	}

	$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
	$('#opdpagenation').html(numberOfRows);
}
   
	$("#popupDiv").html(htm);

}

function nextPaginationForSponsorSearch(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPaginationForSponsorSearch("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=searchsponsor('sponsor',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPaginationForSponsorSearch("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPaginationForSponsorSearch(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPaginationForSponsorSearch("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=searchsponsor('sponsor',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPaginationForSponsorSearch("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

/**
 * @author   :Bilal
 * @date     :05-10-2017
 * @code     :for autosuggetion on popup with Hall and Hallslave 
 * ***/
function searchhallwise(inputId){
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName2").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/searchhallwise",

		success : function(r) {

			ConfigurationChargesTemplateHall(r);

		}
	});
}
/********
 * @author   :Bilal
 * @date     :05-10-2017
 * @code     :for autosuggetion on right Div For Services
 ********/
function searchservicesonui(){
	

	var input, filter, table, tr, td, i;
	  input = document.getElementById("byName4");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("rightDiv");
	  tr = table.getElementsByTagName("tr");
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }       
	  }
}
/*******
 * @author    :BILAL
 * @Date      :09-11-2017
 * @Code      :For validation of number and distributed amount
 * ******/
function validationsonkeyup(){
	var number     =$('#number').val();
	var distribute =$('#distribute').val();
	if(number > 0 ){
		if (distribute > 0) {
			alert("Please Distribute other wise apply using percentage");
			$('#distribute').val(0);
			return false;
		}

	}
	
	if(distribute > 0 ){
		if (number > 0) {
			alert("Please apply changes with distribute ! we can't perform two operation at the same time");
			$('#number').val(0);
			return false;
		}

	}
}
/*****
 * @author      :BILAL
 * @Date        :27-11-2017
 * @Code        :For Fetching data on add all 
 * ******/
function addAllTrFromBackend(){
	
	
	var liSizeForServices = $("#dynamicItem li").length;
	
	
	if (liSizeForServices > 1) {
		selfId = $("#li" + (liSizeForServices - 1)).val();
	}
	if (liSizeForServices > 0) {
		
		addAllTRtoRight();
	    
	}else{
		$('#pleaseWait').show();
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/subservice/SubServiceCategoryList",

			error : function() {
				alert('error');
			},
			success : function(response) {
				subtemplateonaddAll(response) ;
				
			}
		});
	}
	
}

function subtemplateonaddAll(response){

	var htm = '';
	
	var index = 0;
	
	for ( var i = 0; i < response.lstSubService.length; i++) {
	
		var categoryName = response.lstSubService[i].categoryName;
		var charges = response.lstSubService[i].charges;
		var serviceId=response.lstSubService[i].subId;
		
		htm = htm
		
				+'<tr id="trs'+(index + 1)+'">'
				+'<td id="chNamer'+(index+1) +'" class="col-sm-5 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chargesr'+(index+1) +'" class="col-sm-3 center" style="height: 21.5px;">'
				+'<input id="inChargesr'+(index+1) +'" class="right_Charges form-control" type="text"  value="'+charges+'" onkeyup="totalAmount()" name="charges'+(index+1) +'">'
				
				+'<td id="codenamech'+(index+1) +'" class="col-sm-2 center" style="height: 21.5px;" >'
	    		+'<input id="inChargesr'+(index+1) +'" class="right_Codename form-control" type="text"  value="0">'
	    		+'</td>'
	    		
				+'<td class="col-sm-2 center" id="lastTdr'+(index+1) +'">'
				+'<input id="subbIdr'+(index + 1)+'" class="subserviceIds" type="hidden" value="'+serviceId+'">'
	    		+'<input id="inputCntr'+(index+1) +'" type="button" value="<<" onclick="addTRtoLeft('+(index+1) +')"></td>'
				
				+'</tr>';
		
		$('#subIDs').append(","+serviceId);
		$('#leftDiv tr').remove();
		
		index++;
	}

	$("#rightDiv").html(htm);
	$('#pleaseWait').hide();
	totalAmount();
	
}

/**
 * @author   :Bilal
 * @Date     :4-Aug-2017
 * @code     :for fetching dynamic services on right div
 * **/
function fetchmcharges() {
	
	var chargesId = 1;// Sponser id
	var chargesSlaveId = 57;// Sponser S
	
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	//is combination flag
	var isComServId = 0; //is combination
	var isComServlastId = 0;//is combination slave
	
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }
	//Hall Id and Hall slave Id
	var hallId = 2;//hallid
	var hallSlaveId =655;//hallslaveid
	
	 if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		 hallId = 0;
	}
		if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
	 }
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/configurationservice/fetchMedicalTeamCharges",
		data : {
			"chargesId"      : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			
			"hallId"         : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			
			"isComServId"      : parseInt(isComServId),
			"isComServlastId" : parseInt(isComServlastId)
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
			console.log(r);
			//setDynamicServicesOnright(response);
		}
	});		
}

/***********
 * @author	: Vinod Udawant
 * @date	: 08-05-2019
 * @base	: For Import Configuration excel dynamically 
 ***********/
function importConfigurationExcel(dynamicUrl){
	
	var dynamicUrl ="ehat/configurationservice/importConfiguration";
	
	$('#importConfigurationForm').submit(function(event){
			 
		event.preventDefault();
		var fileName=$('#importFile').val();
		if(fileName!="" && fileName!=null){
		
			var formData = new FormData($(this)[0]);
			$('#pleaseWait').show();
			$.ajax({
				  url: ''+dynamicUrl+'',
				  type: 'POST',
				  data: formData,
				  async: false,
				  cache: false,
				  contentType: false,
				  processData: false,
				  success: function (returndata) {
					  
					  alert(returndata);			     
				      $('#pleaseWait').hide();
				  }
			});
			return false;
		  
		}else{
		  alert("Please select file first");
		}		
	});
}


function getSponsorRecordsOnChargesConfiguration() {

	var chargesMasterDto=1;
	
	jQuery.ajax({
	
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : chargesMasterDto
		},
		url : "ehat/registration/fetchSponsorRecords",
		success : function(r) {
 			
 			console.log(r);
			setTemplateForSponsorSelectListOnChargesConfiguration(r);
		
		}
	});
}

//@author :Dayanand khandekar @reason : To set Charges master Slave sponsors

function setTemplateForSponsorSelectListOnChargesConfiguration(r){

	var list="<option></option>";
	

	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

	
			list=list+'<option value="'+(r.lstChargesSlave[int].slaveId)+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		 	
	}	
	//alert(list);
	setTimeout(function() {
		$("#listmstr_select_service").html(list);
		$("#listmstr_select_service").select2();
	}, 500);	
	
	}

function fetchMulSuperSlaveOnChargesConfiguration(chargesMasterDto) {
	//if charges slave id is not equals or greter than zero 
	
	if (chargesMasterDto == "" || chargesMasterDto == null || chargesMasterDto == undefined || isNaN(chargesMasterDto)) {
		return false;
	}else{
		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"chargesMasterDto" : parseInt(chargesMasterDto)
			},
			
			url : "ehat/chargesSlave/fetchSuperCatogoires",
			error : function() {
				alert('Network Issue!');
			},
			success : function(response) {
				
				
				//$("#listmstr_select_service").select2();
				setMulDyanamicDivForListOnChargesConfiguration('dynamicItems',response);
				$("#listmstr_select_service").select2('val',chargesMasterDto);

				
			}
		});
	}
	
}

function setMulDyanamicDivForListOnChargesConfiguration(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count =i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
		 htm = htm+ '<li class="select2-search-choice" id="liItmesponser'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeSponserInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisponser' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
		 	
		 	//$('#disc').val(response.lstChargesSlave[i].discount);
	}
	$('#' + setDiv).html(htm);
}


//added by vishant


function removeSponserInpuntFild(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesponser' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	var masterid = $("#lisponser" + 0).val();
	var selfId = 0;
	if (liSize == 0) {
		fetchAllService();

	} else {
		
		if (liSize == 1) {
			//fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		
	}
}


/*******
 * @author    :Rohini Ambhore
 * @Date      :17-01-2024
 * @Code      :For saving Registration charges configuration  for sponser
 * ******/
function saveConfigurationRegistrationService() {
    var fromYear =$('#fromYear').val();
    if (fromYear == 'Y') {
		saveYearWise();
		return false;
	}
	var configIdf = $("#configId").val();
	var operator = $("#operator").val();
	var increaseordecrease = $("input:radio[name='incdecType']:checked").val();
	var number = parseFloat($("#number").val());
	var distribute= parseFloat($("#distribute").val());
	var queryType = $("#queryType").val();
	var totalcharges= parseFloat($("#totalcharges").val());
	var copay = 0;
	var selfId =$("#selfId").val();
	var iscatHall =$("#iscatHall").val();
	
	//For Service Id
	var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	var serviceLastId  = $("#li" + (liSizeForServices - 1)).val();
	
	//For Charges Id
	var chargesId = $("#lis0").val();// chargesId

	/*  
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	 //charges  validation
    if(liSize > 0){
    	if(liSize <= 1){ 
    		alert("Please Select Atleast One charges and two sub Charges! ");
    		SetFocus('dynamicItems');
    		return false;
    		
    	}
    }*/
	
	var chargesSlaveId = 0;
	chargesSlaveId = $("#listmstr_select_service").val();
	
	if(chargesSlaveId > 0){
		chargesId=1;
	}
	
	
	//For Hall Wise Id  
	var HallId = $("#lisH0").val();// chargesId
	var HallSlaveId = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems2 li").length;
	HallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
	
	//For Is combination service id
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();
	
	//From Date To Date
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
    
    //Department Id To save in DataBase
    var departMentID=$("#deptIdForConfig").val();
    
    //hallCharges to save based on hallID and slave Id
    var hallCharges=$("#hallCharges").val();
    var iscombination =$('#iscombination').val();
   
    var medicalCharges=$("#medicalCharges").val();
    
   /* var rightDivLength = $("#rightDiv tr").length;
    if (rightDivLength == 0) {
		alert("Please Take Atleast One Service Charges To Save Or Update!");
		// SetFocus('rightDiv');
		return false;

	}*/
   
		
	//charges Hall validation liSizeForServices
    if(liSizeHall > 0){
    	if(liSizeHall <= 1){
    		alert("Please Select Atleast One Hall and one sub Hall! ");
    		SetFocus('dynamicItems2');
    		return false;
    	}
    	
    }
	
	//rightDiv validation	
	/*if(number > 0 ){
		if (rightDivLength == 0) {
			alert("Please Take Atleast One Service Charges To Save Or Update!");
			return false;

		} else if ((operator != "+") && (operator != "-") && (operator != "%")) { // operator validation
			alert("Please Select One Operator To Perform Calculations!");
			SetFocus('operator');
			return false;
		}
	}*/
	
	//department validation
	if(departMentID < 0){
		alert("Please Select One departMent!");
		SetFocus('deptIdForConfig');
		return false;
	}
	
	
    if (copay == "" || copay == null || copay == undefined || isNaN(copay)) {
    	copay = 0;
	}
	if (configIdf == "" || configIdf == null || configIdf == undefined) {
		configIdf = 0;
	}
	
	
	if (masterId == "" || masterId == null || masterId == undefined) {
		masterId = 0;
	}
	
	if (totalcharges == "" || totalcharges == null || totalcharges == undefined || isNaN(totalcharges)) {
		totalcharges = 0;
	}
	
	if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
		 isComServId = 0;
	}
	 
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		 isComServlastId = 0;
	}
	 
	if (serviceLastId == "" || serviceLastId == null || serviceLastId == undefined || isNaN(serviceLastId)) {
		 serviceLastId = 0;
	}
	 
	if (hallCharges == "" || hallCharges == null || hallCharges == undefined || isNaN(hallCharges)) {
		 hallCharges = 0;
	}
	 
	if (medicalCharges == "" || medicalCharges == null || medicalCharges == undefined || isNaN(medicalCharges)) {
		 medicalCharges = 0;
	}
	 
    if (masterId == "" || masterId == null || masterId == undefined) {
			masterId = 0;
    }
		

	if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined) {
		HallSlaveId = 0;
	}

	if (HallId == "" || HallId == null || HallId == undefined) {
			HallId = 0;
	}
	
	if (iscombination == "" || iscombination == null || iscombination == undefined) {
		iscombination = 'N';
	}
	
	if (departMentID == "" || departMentID == null || departMentID == undefined) {
		departMentID = 0;
	}
	
	if (number == "" || number == null || number == undefined || isNaN(number)) {
		number = 0;
	}
	
	if (distribute == "" || distribute == null || distribute == undefined || isNaN(distribute)) {
		distribute = 0;
	}
	if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
		selfId = 0;
	}
	if (iscatHall == "" || iscatHall == null || iscatHall == undefined || isNaN(iscatHall)) {
		iscatHall = "N";
	}
	
	/****comparing to date not be past means it should show future ****/
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();

	var output = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-'
			+ (day < 10 ? '0' : '') + day;

	if (new Date(toDate) < new Date(output)) {
		alert("Todate  must be in the future!");
		return false;
	}
	
	if (Date.parse(fromDate) > Date.parse(toDate)) {
        //$("txttodate").val('');
        alert("Start date should not be greater than end date");
        return false;
    }
	/****comparing to date not be past means it should show future ****/
	
	/*if (fromDate == "" || fromDate == null || fromDate == undefined) {
		fromDate = "0000-00-00";
	}
	
	if (toDate == "" || toDate == null || toDate == undefined) {
		toDate = "0000-00-00";
	}*/
	
	// defined array to save list of records
	//var cmt = 1;
	var configurationDetails = {
		lstConfigurService : []
	};
	
	//geting all config ids  
	var configIds=new Array();
	 $(".idc").each(function() {
		 configIds.push($(this).val());
	 });	
	
	//geting all service ids  
	var serviceIDs=new Array();
	$(".subserviceIds").each(function() {
			 serviceIDs.push($(this).val());
	});
	
	//geting All charges  
	var chargess=new Array();
	$(".right_Charges").each(function() {
		chargess.push($(this).val());
	});

	//getting all code name ch 
	var codenamech=new Array();
	$(".right_Codename").each(function() {
		codenamech.push($(this).val());
	});
	
	var i;
	for (i = 0; i < serviceIDs.length; ++i) {
	   
		var charges =chargess[i];
		var serviceId =serviceIDs[i];
		var configId =configIds[i];
		var codename =codenamech[i];
		
		if (configId == "" || configId == null || configId == undefined) {
			configId = 0;
		}
		
		if (chargesId == "" || chargesId == null
				|| chargesId == undefined) {
			chargesId = 0;
		}

		if (chargesSlaveId == "" || chargesSlaveId == null
				|| chargesSlaveId == undefined) {
			chargesSlaveId = 0;
		}
		
		/*configurationDetails.lstConfigurService.push({
			charges        : charges,
			serviceId	   : serviceId,
			operator       : operator,
			number         : number,
			increaseordecrease : increaseordecrease,
			chargesId       : chargesId,
			chargesSlaveId  : chargesSlaveId,			
			distribute      : distribute,
			fromDate        : fromDate,
			toDate          : toDate,
			departMentID    :departMentID,
			copay           : copay,
			totalcharges    : totalcharges,
			isComServId     : isComServId,
			isComServlastId : isComServlastId,
			serviceLastId   : serviceLastId,
			configId        : configId,
			iscombination   : iscombination,
			selfId          : selfId,
			iscatHall       : iscatHall,
			codenamech      : codename
		});*/
	}

	/*if (chargesSlaveId == 0 && HallSlaveId==0 && isComServlastId==0) {
		alert("please select any combination or hall or sponsor to save services!");
		return false;
	}*/
	
	var isoHallCharges = $("#isoHallCharges").val();
	var isoMedicalCharges = $("#isoMedicalCharges").val();
	
	var opdCharges = $("#opdChargesConfig").val();
	var ipdCharges = $("#ipdChargesConfig").val();
	var diagCharges = $("#diagnoChargeConfig").val();
	
	//Json List 
	//configurationDetails = JSON.stringify(configurationDetails);
	
	var inputs = [];
	//inputs.push("configurationDetails="+ encodeURIComponent(configurationDetails));
	inputs.push('configId=' + configIdf);
	inputs.push('operator=' + encodeURIComponent(operator));
	inputs.push('queryType=' + queryType);
	inputs.push('chargesId=' + encodeURIComponent(chargesId));
	inputs.push('chargesSlaveId=' + encodeURIComponent(chargesSlaveId));
	inputs.push('masterId=' + encodeURIComponent(masterId));
	inputs.push('HallId=' + encodeURIComponent(HallId));
	inputs.push('HallSlaveId=' + encodeURIComponent(HallSlaveId));
	inputs.push('hallCharges=' + encodeURIComponent(hallCharges));
	inputs.push('medicalCharges=' + encodeURIComponent(medicalCharges));
	inputs.push('isoHallCharges=' + encodeURIComponent(isoHallCharges));
	inputs.push('isoMedicalCharges=' + encodeURIComponent(isoMedicalCharges));
	inputs.push('isComServId=' + encodeURIComponent(isComServId));
	inputs.push('isComServlastId=' + encodeURIComponent(isComServlastId));		
	inputs.push('opdCharges=' + encodeURIComponent(opdCharges));
	inputs.push('ipdCharges=' + encodeURIComponent(ipdCharges));
	inputs.push('diagCharges=' + encodeURIComponent(diagCharges));
	var str = inputs.join('&');
	
	$('#pleaseWait').show();
	jQuery.ajax({
		
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/configurationservice/saveOrUpdateRegistrationConfigCharges",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			
			alertify.success(r);
			$('#pleaseWait').hide();
			refreshRegistrationConfig();
			
		}
	});
	
	//total to be refresh after save and update 
	//$("#totalcharges").val("");
	 var button = $('#apply');

	    //able the apply button while evaluating if the condition should be apply
	    button.prop('disabled', false);

	    var valid = true;    

	   
	    // "valid" to false if the validation fails

	    if (!valid) { 
	        // Prevent form from applying  if validation failed
	        e.preventDefault();

	        // Reactivate the button if the apply was not applied
	        button.prop('disabled', true);
	    }
	    
	    
}



function refreshRegistrationConfig() {

	$('#configId').val("");
	
	$('#hallCharges').val("0");
	$('#medicalCharges').val("0");
	$('#isoHallCharges').val("0");	
	$('#opdChargesConfig').val("0");
	$('#ipdChargesConfig').val("0");
	$('#diagnoChargeConfig').val("0");

	var chargesId = $("#lis0").val();
	var HallId = $("#lisH0").val();
	//var isComServId = $("#lisHc0").val();
	var masterId = $("#li0").val();
	removeInpuntFildForCharges(0, 1, 'dynamicItems');//removeInpuntFildForCharges(0, chargesId, 'dynamicItems');
	//removeInpuntFildForCharges2(0, HallId, 'dynamicItems2');
	//removeInpuntFildcom(0, isComServId, 'dynamicItemcom');
	//removeInpuntFild(0, masterId, 'dynamicItems');
	
	//removeSponserInpuntFild(0,masterId,'dynamicItems');

	$("#operator").val("");
	$("#deptIdForConfig").val("");
	$("#hallCharges").val("");
	$("#medicalCharges").val("");
	$("#totalcharges").val("");
	$("#subIDs").empty();
	$('#queryType').val("insert");
	$('#countDates').val(0);	
	$('#listmstr_select_service').select2('val',"0");
	$('#listmstr_select_combination').select2('val',"0");
	
}

/*******
 * @author    :Rohini Ambhore
 * @Date      :19-jan-2017
 * @Code      :For fetching Registration configuration charge list 
 * ******/
function fetchRegistrationConfigurationChargesList(callfrom) {
    $('#callfrom').val(callfrom);
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getConfigurationRegistrationChargeList",

		error : function() {
			alert('error');
		},
		success : function(response) {
			
			ConfigurRegistrationChargesTemplate(response);
		}
	});
}

/*******
 * @author    :Rohini Ambhore
 * @Date      :19-jan-2017
 * @Code     :For  configuration list chargesfor Registration (template)
 * ******/

function ConfigurRegistrationChargesTemplate(response) {

	var htm = "";
    
	htm= '<thead id="popupheader">'
		+'<tr>'
		+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">#</th>'
		
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">SponsorName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">SponsorSlave</th>'
		
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">HallName</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">HallSlave</th>'
		
		/*+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Combination</th>'
		+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Combination Slave</th>'
		*/
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
		+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
		+ '</tr></thead>';
	
	var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
		
		
	
		htm = htm
				
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				+"<td class='col-md-2-1 center' id='chargesName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].chargesName
				+ "</td><td col-md-2-1 center center' id='chargesSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].categoryName
				+ "</td>"
				
				+ "<td class='col-md-2-1 center' id='hallName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				//+ response.lstConfigurations[i].hallName
				+ " - </td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				//+ response.lstConfigurations[i].hallSlaveName
				+ " - </td>"
				
				/*+ "<td class='col-md-2-1 center' id='comName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].combinationName
				+ "</td>"*/
				/*+ "<td class='col-md-2-1 center' id='comSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].subServicename
				+ "</td>"*/
				
				+"<td class='col-md-1 center'style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success editConfiguration' onclick='updateConfigurationRegistration("+ response.lstConfigurations[i].idConfiguration + ","+(index + 1)+")'  class='close' data-dismiss='modal'><i class='fa fa-edit'></i></button></td>"
			
				+"<td class='col-md-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteConfiguration' onclick='deleteConfiguration("
				+ response.lstConfigurations[i].idConfiguration + ", "+(index + 1)+")' ><i class='fa fa-trash-o'></i></button></td>"
				
				+ "<input type='hidden' id='idConfiguration"+ (index + 1) + "' value='"+ response.lstConfigurations[i].idConfiguration + "'>"
				
				+ "<input type='hidden' id='charges_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesId + "'>"
				+ "<input type='hidden' id='chargesslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='hall_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallId + "'>"
				+ "<input type='hidden' id='hallslave_id"+ (index + 1) + "' value='"+ response.lstConfigurations[i].hallSlaveId + "'>"
				
				/*+ "<input type='hidden' id='isComServId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].isComServId + "'>"
				+ "<input type='hidden' id='isComServlastId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].isComServlastId + "'>"
				*/
				+ "<input type='hidden' id='serviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].serviceId + "'>"
				+ "<input type='hidden' id='subserviceId"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subserviceId + "'>"
				
				+ "<input type='hidden' id='subServicename"+ (index + 1) + "' value='"+ response.lstConfigurations[i].subServicename + "'>"
				
				+ "</tr>" 
				;
			
		index++;
	}
   
	$("#popupDiv").html(htm);

}

/*******
 * @author    :Rohini Ambhore
 * @Date      :19-Jan-2024
 * @Code      :For updating records from Registration configuration list with sponsor, hall and combinations 
 * ******/
function updateConfigurationRegistration(configId,cnt) {
	
	//charges Id and Charges Slave Id
	var chargesId = $("#charges_id"+(cnt)).val();
	var chargesSlaveId = $("#chargesslave_id" +(cnt)).val();
	//var chargesSlaveName = $("#chargesSlaveName" +(cnt)).html();
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	//is combination flag
	/*var isComServId = $("#isComServId"+(cnt)).val();
	var isComServlastId = $("#isComServlastId" +(cnt)).val();
    //var subServicename =$("#subServicename" +(cnt)).val();
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }*/
	//Hall Id and Hall slave Id
	var hallId = $("#hall_id"+(cnt)).val();
	var hallSlaveId = $("#hallslave_id" +(cnt)).val();
	//var hallSlaveName=$("#hallSlaveName"+(cnt)).html();
	 if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		 hallId = 0;
	}
		if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
	 }
	
	$('#queryType').val("update");
	
	$("#leftDiv tr").remove();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getupdateConfigurationRegCharge",
		data : {
			"chargesId"      : configId ,  //  parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			
			"hallId"         : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			
			//"isComServId"      : parseInt(isComServId),
			//"isComServlastId" : parseInt(isComServlastId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			if(chargesSlaveId ==0){
			   $('#listmstr_select_service').select2('val',"0");
			    $('#dynamicItems').html(" ");
			}
			
			//ConfigurationServiceTemplate(response);
			
			chargesId =1;
			if (chargesSlaveId > 0 && chargesId > 0) {
				
				fetchMulSuperSlaveOnChargesConfiguration(chargesSlaveId);
			}else{
				
			}
			
			/*if (hallSlaveId > 0 && hallId > 0) {
				fetchSuperCatogoiresForHall(hallSlaveId); 				
			}			
			if (isComServId > 0 && isComServlastId > 0) {
				fetchSuperCatogoiresForCombination(isComServlastId);
				getAmountofConfiguredPkg(configId);
			}		
			fetchSubServiceCategoryList();*/
			
			$("#opdChargesConfig").val(response.lstConfigurService[0].opdCharges);
			$("#ipdChargesConfig").val(response.lstConfigurService[0].ipdCharges);
			$("#diagnoChargeConfig").val(response.lstConfigurService[0].diagCharges);
			
		}
	});	
}


// Rohini Ambhore 23-01-2024


function setsponsor(){
	
$("#divsp").css("display","block");
$("#divsp").animate({left: '90px'});
$("#btnsp").css("display","block");
$("#btnhall").css("display","none");
$("#mulDynamicItemDiv").css("display","block");
$("#doctorNameOT").select2('val','0');

fetchHeaderList();
}

function fetchHeaderList() {
	$('#pleaseWait').show();
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/commanadv/SubServiceListCatN",

		error : function() {
			alert('error');
		},
		success : function(response) {
		
			$("#hallistdiv").html(JSON.stringify(response));
			servicesHeaders(response);
			$('#pleaseWait').hide();
		}
	});
}

function servicesHeaders(response) {
	var tHead1 = "<tr><td  style='width: 183px;'>1</td>";
	var tHead = "<tr><th  style='width: 183px;'>#</th>";
	for(var i=0; i<response.lstsubcharges.length; i++){
		tHead = tHead + "<th  style='width: 183px;'>"+ response.lstsubcharges[i].categoryName 
				+"<input type='hidden' class='hallid' id='th"+(i)+"' value='"
				+response.lstsubcharges[i].slaveId+"'>" 
				
				+"<input type='hidden' class='hallid' id='thselfid"+(i)+"' value='"
				+response.lstsubcharges[i].selfId+"'>" 
				
				+"<input type='hidden' class='hallid' id='thisCategory"+(i)+"' value='"
				+response.lstsubcharges[i].isCategory+"'></th>"
				;
	}
	for(var i=0; i<response.lstsubcharges.length; i++){
		tHead1 = tHead1 + "<td  style='width: 183px;'>"
		        + "<input type='hidden' class='hallid' id='thallid"+(i)+"' value='"
				+response.lstsubcharges[i].slaveId+"'>"  
				+"<input  style='text-align:right;'   type='text' class='hallid' id='txthcharge"+(i)+"' value='"
				+ 0 +"' onkeypress='return validateNumbers(event)'>"
				+ "<input type='hidden' class='hallid' id='txthDrid"+(i)+"' value='"
				+ 0 +"'>"
				+"</td>"
				;
	}

	tHead  =  tHead  +"</tr>";
	tHead1 =  tHead1 + "</tr>";
	$("#serviceHeader").html(tHead);
	$("#servicesDiv").html(tHead1);
	$("#txthcharge0").css("background-color","lightblue");
	$("#txthcharge0").attr('onkeyup','rowwisefixrate()');
	$("#txthcharge0").css('height','27px');
	//fetchHeaderList();
	}

function fetchSuperCatogoiresSlaveReg(chargesMasterDto) {
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
					  fetchChargesSlaveListByIdReg(response.lstChargesSlave[0].slaveId,response.lstChargesSlave[0].slaveId);
				  }else{
					 var listlengthnew =listlength -1;
					  fetchChargesSlaveListByIdReg(response.lstChargesSlave[listlengthnew].slaveId,response.lstChargesSlave[1].slaveId);

				  }
				}
				setDyanamicDivForList('mulDynamicItem',response);
			}
		});
	}
	
}

function fetchChargesSlaveListByIdReg( Id,masterid) {
	//var selfId = $("#" + Id ).val();
		jQuery.ajax({
			type : "POST",
			url : "ehat/chargesSlave/getChragesSlaveByIddr",
			data : {
				"masterId" : parseInt(1),
				//"selfId" : parseInt(selfId)
				"selfId" : parseInt(Id)
				
			
			},
			success : function(response) {
				
				setsponser2Reg(response,Id,masterid);
				$("#splistdiv").html(JSON.stringify(response));

				//setConsultsponser(response,Id,masterid);
				//fetchSuperCatogoiresSlave(selfId);
				
			}
		});
	}

function setsponser2Reg(response,id,masterid) {
	
	

	//var Drid =$("#doctorNameOT").val();	
	var Drid  = 1;
	/*if(Drid==0){
		alertify.error("Please Select Doctor!!!");
		return false;
	}*/
	//	Spid = $("#listmstr_select_service").val();	
	Spid = id;	
		$('#pleaseWait').show();
	jQuery.ajax({
		async : false,
		type 	: "POST",
		//url 	: "ehat/commanadv/getDrhallcharg",
		url 	: "ehat/commanadv/getReghallcharg",
		data	: {
			"Drid"       : Drid,
			"callform"   :"sp",
			"SpId"       :Spid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response1) {
			
			var ajaxResponse = $("#hallistdiv").html();
		    var	ajaxResponse1 = JSON.parse(ajaxResponse);
		    var lengthhead = ajaxResponse1.lstsubcharges.length;
		    var lengthsp   = response.lstChargesSlave.length;
		    var chk=0;
		    $("#lengthhead").val(lengthhead);
		    $("#lengthsp").val(lengthsp);
			if(response1.lstDocroundDetails.length > 0){
				var tHead1 = "";
				var tHead = "<tr><th  style='width: 50px;'>#</th><th  style='width: 200px;'>Sponser</th>";
				for(var i=0; i<ajaxResponse1.lstsubcharges.length; i++){
					tHead = tHead + "<th  style='width: 183px;'>"+ ajaxResponse1.lstsubcharges[i].categoryName 
							+"<input type='hidden' class='hallid' id='th"+(i)+"' value='"
							+ajaxResponse1.lstsubcharges[i].slaveId+"'>" 
							
							+"<input type='hidden' class='hallid' id='thselfid"+(i)+"' value='"
							+ajaxResponse1.lstsubcharges[i].selfId+"'>" 
							
							+"<input type='hidden' class='hallid' id='thisCategory"+(i)+"' value='"
							+ajaxResponse1.lstsubcharges[i].isCategory+"'></th>"
							;
				}
				tHead  =  tHead  +"</tr>";
				
				$("#serviceHeader").html(tHead);
		for(var j=0; j< (response.lstChargesSlave.length) ; j++){

					tHead1 = tHead1 + "<tr  style='width: 183px;'>"
					+ "<td  style='width: 50px;'>"
					+ (j + 1)
					+ "</td>"
					+ "<td  style='width: 200px;'>"
				    + "<input type='hidden' class='hallid' id='thselfId"+(j)+"' value='"
					+ response.lstChargesSlave[j].selfId+"'>" 
					+ "<input type='hidden' class='hallid' id='txthslaveId"+(j)+"' value='"
					+ response.lstChargesSlave[j].slaveId +"'>"
					+ response.lstChargesSlave[j].categoryName
					+ "</td>";
					
					breakout="N";
					chk=0;
			for(var i=0; i< (response1.lstDocroundDetails.length) ; i++){

					
					if(response.lstChargesSlave[j].slaveId  == response1.lstDocroundDetails[i].sponserslave_id){
						//if(response1.lstDocroundDetails[i].hallslave_id < 0){
						if(response1.lstDocroundDetails[i].hallslave_id == 0){
							var a= j +'_'+ response1.lstDocroundDetails[i].hallslave_id + '_' + response.lstChargesSlave[j].slaveId ;
								tHead1 = tHead1 + "<td  style='width: 183px;'>"
								        + "<input type='hidden' class='hallid' id='thallid"+(j)+""+(response1.lstDocroundDetails[i].hallslave_id)+""+(response1.lstDocroundDetails[i].sponserslave_id)+"' value='"
										+ response1.lstDocroundDetails[i].hallslave_id+"'>"  
										+"<input  style='text-align:right;background-color : lightblue'   type='text' class='hallidch' id='txthcharge"+(j)+""+(response1.lstDocroundDetails[i].hallslave_id)+""+(response1.lstDocroundDetails[i].sponserslave_id)+"' value='"
										+  response1.lstDocroundDetails[i].dr_amnt +"' onkeypress='return validateNumbers(event)'  onkeyup=rowwisefixratesponser(\'"+ a + "'\)>"
										+ "<input type='hidden' class='hallid' id='txthDrid"+(j)+""+(response1.lstDocroundDetails[i].hallslave_id)+""+(response1.lstDocroundDetails[i].sponserslave_id)+"' value='"
										+ response1.lstDocroundDetails[i].drchargesid +"'>"
									    + "<input type='hidden' class='hallid' id='tdselfId"+(j)+""+(response1.lstDocroundDetails[i].hallslave_id)+""+(response1.lstDocroundDetails[i].sponserslave_id)+"' value='"
										+ response1.lstDocroundDetails[i].sponser_id+"'>" 
										+ "<input type='hidden' class='hallid' id='tdslaveIdsp"+(j)+""+(response1.lstDocroundDetails[i].hallslave_id)+""+(response1.lstDocroundDetails[i].sponserslave_id)+"' value='"
										+ response1.lstDocroundDetails[i].sponserslave_id +"'>"
									
										+"</td>";
										
							}else{
								tHead1 = tHead1 + "<td  style='width: 183px;'>"
								 + "<input type='hidden' class='hallid' id='thallid"+(j)+""+(response1.lstDocroundDetails[i].hallslave_id)+""+(response1.lstDocroundDetails[i].sponserslave_id)+"' value='"
									+ response1.lstDocroundDetails[i].hallslave_id+"'>"  
									+"<input  style='text-align:right;'   type='text' class='hallidch' id='txthcharge"+(j)+""+(response1.lstDocroundDetails[i].hallslave_id)+""+(response1.lstDocroundDetails[i].sponserslave_id)+"' value='"
									+  response1.lstDocroundDetails[i].dr_amnt +"' onkeypress='return validateNumbers(event)'  >"
									+ "<input type='hidden' class='hallid' id='txthDrid"+(j)+""+(response1.lstDocroundDetails[i].hallslave_id)+""+(response1.lstDocroundDetails[i].sponserslave_id)+"' value='"
									+ response1.lstDocroundDetails[i].drchargesid +"'>"
								    + "<input type='hidden' class='hallid' id='tdselfId"+(j)+""+(response1.lstDocroundDetails[i].hallslave_id)+""+(response1.lstDocroundDetails[i].sponserslave_id)+"' value='"
									+ response1.lstDocroundDetails[i].sponser_id+"'>" 
									+ "<input type='hidden' class='hallid' id='tdslaveIdsp"+(j)+""+(response1.lstDocroundDetails[i].hallslave_id)+""+(response1.lstDocroundDetails[i].sponserslave_id)+"' value='"
									+ response1.lstDocroundDetails[i].sponserslave_id +"'>"
							
								+"</td>";
							}
							
					}else{
						if(breakout="N"){
							
							for(var d=0; d< (response1.lstDocroundDetails.length) ; d++){
								if(response.lstChargesSlave[j].slaveId  == response1.lstDocroundDetails[d].sponserslave_id){
									breakout="N";
									break;
								}else{
									breakout="Y";
									
								}
							}
						}
						if(breakout=="Y"){
							//alert( response.lstChargesSlave[j].categoryName);
						for(var k=0; k< ajaxResponse1.lstsubcharges.length; k++){

						if(ajaxResponse1.lstsubcharges[k].slaveId < 0){
					var a= j +'_'+ ajaxResponse1.lstsubcharges[k].slaveId +'_'+ response.lstChargesSlave[j].slaveId ;
						tHead1 = tHead1 + "<td  style='width: 183px;'>"
						        + "<input type='hidden' class='hallid' id='thallid"+(j)+""+(ajaxResponse1.lstsubcharges[k].slaveId)+""+ response.lstChargesSlave[j].slaveId  +"' value='"
								+ajaxResponse1.lstsubcharges[k].slaveId+"'>"  
								+"<input  style='text-align:right;background-color : lightblue'   type='text' class='hallidch' id='txthcharge"+(j)+""+(ajaxResponse1.lstsubcharges[k].slaveId)+""+ response.lstChargesSlave[j].slaveId  +"' value='"
								+ 0 +"' onkeypress='return validateNumbers(event)'  onkeyup=rowwisefixratesponser(\'"+ a + "'\)>"
								+ "<input type='hidden' class='hallid' id='txthDrid"+(j)+""+(ajaxResponse1.lstsubcharges[k].slaveId)+""+ response.lstChargesSlave[j].slaveId  +"' value='"
								+ 0 +"'>"
							    + "<input type='hidden' class='hallid' id='tdselfId"+(j)+""+(ajaxResponse1.lstsubcharges[k].slaveId)+""+ response.lstChargesSlave[j].slaveId  +"' value='"
								+ response.lstChargesSlave[j].selfId+"'>" 
								+ "<input type='hidden' class='hallid' id='tdslaveIdsp"+(j)+""+(ajaxResponse1.lstsubcharges[k].slaveId)+""+ response.lstChargesSlave[j].slaveId  +"' value='"
								+ response.lstChargesSlave[j].slaveId +"'>"
							
								+"</td>";
								
					}else{
						// console.log(ajaxResponse1.lstsubcharges[k].slaveId ); 
						//alert(j+ "==" + response.lstChargesSlave[j].categoryName );
						tHead1 = tHead1 + "<td  style='width: 183px;'>"
				        + "<input type='hidden' class='hallid' id='thallid"+(j)+""+(ajaxResponse1.lstsubcharges[k].slaveId)+""+ response.lstChargesSlave[j].slaveId  +"' value='"
						+ajaxResponse1.lstsubcharges[k].slaveId+"'>"  
						+"<input  style='text-align:right;'   type='text' class='hallidch' id='txthcharge"+(j)+""+(ajaxResponse1.lstsubcharges[k].slaveId)+""+ response.lstChargesSlave[j].slaveId  +"' value='"
						+ 0 +"' onkeypress='return validateNumbers(event)'>"
						+ "<input type='hidden' class='hallid' id='txthDrid"+(j)+""+(ajaxResponse1.lstsubcharges[k].slaveId)+""+ response.lstChargesSlave[j].slaveId  +"' value='"
						+ 0 +"'>"
					    + "<input type='hidden' class='hallid' id='tdselfId"+(j)+""+(ajaxResponse1.lstsubcharges[k].slaveId)+""+ response.lstChargesSlave[j].slaveId  +"' value='"
						+ response.lstChargesSlave[j].selfId+"'>" 
						+ "<input type='hidden' class='hallid' id='tdslaveIdsp"+(j)+""+(ajaxResponse1.lstsubcharges[k].slaveId)+""+ response.lstChargesSlave[j].slaveId  +"' value='"
						+ response.lstChargesSlave[j].slaveId +"'>"
					
						+"</td>";
					}
					}
					}
					}
						if(breakout=="Y"){
							break;
						}
					}
			tHead1 =tHead1  + "</tr>";
			}
					$("#servicesDiv").html(tHead1);

					$("#divdrr").css('height','-moz-available');
					
				
					
				
				
			}else{
				var tHead1 = "";
				var tHead = "<tr><th  style='width: 50px;'>#</th><th  style='width: 200px;'>Sponser</th>";
				
			    
				for(var i=0; i<ajaxResponse1.lstsubcharges.length; i++){
					tHead = tHead + "<th  style='width: 183px;'>"+ ajaxResponse1.lstsubcharges[i].categoryName 
							+"<input type='hidden' class='hallid' id='th"+(i)+"' value='"
							+ajaxResponse1.lstsubcharges[i].slaveId+"'>" 
							
							+"<input type='hidden' class='hallid' id='thselfid"+(i)+"' value='"
							+ajaxResponse1.lstsubcharges[i].selfId+"'>" 
							
							+"<input type='hidden' class='hallid' id='thisCategory"+(i)+"' value='"
							+ajaxResponse1.lstsubcharges[i].isCategory+"'></th>"
							;
				}
				tHead  =  tHead  +"</tr>";
				
				$("#serviceHeader").html(tHead);
				

				if(response.lstChargesSlave.length > 0){
					 tHead1 = "";
					var tHead2 = "";

				
					for(var i=0; i< (response.lstChargesSlave.length) ; i++){

						tHead1 = tHead1 + "<tr  style='width: 183px;'>"
						+ "<td  style='width: 50px;'>"
						+ (i + 1)
						+ "</td>"
						+ "<td  style='width: 200px;'>"
					    + "<input type='hidden' class='hallid' id='thselfId"+(i)+"' value='"
						+ response.lstChargesSlave[i].selfId+"'>" 
						+ "<input type='hidden' class='hallid' id='txthslaveId"+(i)+"' value='"
						+ response.lstChargesSlave[i].slaveId +"'>"
						+ response.lstChargesSlave[i].categoryName
						+ "</td>";
						
					
					for(var j=0; j< ajaxResponse1.lstsubcharges.length; j++){
						//if(ajaxResponse1.lstsubcharges[j].slaveId < 0){
						if(ajaxResponse1.lstsubcharges[j].slaveId == 0){
					var a= i +'_'+ ajaxResponse1.lstsubcharges[j].slaveId +'_'+ response.lstChargesSlave[i].slaveId ;
					
						tHead1 = tHead1 + "<td  style='width: 183px;'>"
						        + "<input type='hidden' class='hallid' id='thallid"+(i)+""+(ajaxResponse1.lstsubcharges[j].slaveId)+""+ response.lstChargesSlave[i].slaveId  +"' value='"
								+ajaxResponse1.lstsubcharges[j].slaveId+"'>"  
								+"<input  style='text-align:right;background-color : lightblue'   type='text' class='hallidch' id='txthcharge"+(i)+""+(ajaxResponse1.lstsubcharges[j].slaveId)+""+ response.lstChargesSlave[i].slaveId  +"' value='"
								+ 0 +"' onkeypress='return validateNumbers(event)'  onkeyup=rowwisefixratesponser(\'"+ a + "'\)>"
								+ "<input type='hidden' class='hallid' id='txthDrid"+(i)+""+(ajaxResponse1.lstsubcharges[j].slaveId)+""+ response.lstChargesSlave[i].slaveId  +"' value='"
								+ 0 +"'>"
							    + "<input type='hidden' class='hallid' id='tdselfId"+(i)+""+(ajaxResponse1.lstsubcharges[j].slaveId)+""+ response.lstChargesSlave[i].slaveId  +"' value='"
								+ response.lstChargesSlave[i].selfId+"'>" 
								+ "<input type='hidden' class='hallid' id='tdslaveIdsp"+(i)+""+(ajaxResponse1.lstsubcharges[j].slaveId)+""+ response.lstChargesSlave[i].slaveId  +"' value='"
								+ response.lstChargesSlave[i].slaveId +"'>"
							
								+"</td>";
								
					}else{
						tHead1 = tHead1 + "<td  style='width: 183px;'>"
				        + "<input type='hidden' class='hallid' id='thallid"+(i)+""+(ajaxResponse1.lstsubcharges[j].slaveId)+""+ response.lstChargesSlave[i].slaveId  +"' value='"
						+ajaxResponse1.lstsubcharges[j].slaveId+"'>"  
						+"<input  style='text-align:right;'   type='text' class='hallidch' id='txthcharge"+(i)+""+(ajaxResponse1.lstsubcharges[j].slaveId)+""+ response.lstChargesSlave[i].slaveId  +"' value='"
						+ 0 +"' onkeypress='return validateNumbers(event)'>"
						+ "<input type='hidden' class='hallid' id='txthDrid"+(i)+""+(ajaxResponse1.lstsubcharges[j].slaveId)+""+ response.lstChargesSlave[i].slaveId  +"' value='"
						+ 0 +"'>"
					    + "<input type='hidden' class='hallid' id='tdselfId"+(i)+""+(ajaxResponse1.lstsubcharges[j].slaveId)+""+ response.lstChargesSlave[i].slaveId  +"' value='"
						+ response.lstChargesSlave[i].selfId+"'>" 
						+ "<input type='hidden' class='hallid' id='tdslaveIdsp"+(i)+""+(ajaxResponse1.lstsubcharges[j].slaveId)+""+ response.lstChargesSlave[i].slaveId  +"' value='"
						+ response.lstChargesSlave[i].slaveId +"'>"
					
						+"</td>";
					}
					}
					tHead1 =tHead1  + "</tr>";
					}


					$("#servicesDiv").html(tHead1);

					$("#divdrr").css('height','-moz-available');
			
				}
				
				
				
				
				/*

			    var tHead1 = "";
				var tHead = "<tr><th  style='width: 50px;'>#</th><th  style='width: 200px;'>Sponser</th>";
				var ajaxResponse = $("#hallistdiv").html();
			    var	ajaxResponse1 = JSON.parse(ajaxResponse);
			    var lengthhead = ajaxResponse1.lstsubcharges.length;
			    var lengthsp   = response.lstChargesSlave.length;
			    $("#lengthhead").val(lengthhead);
			    $("#lengthsp").val(lengthsp);
				for(var i=0; i<ajaxResponse1.lstsubcharges.length; i++){
					tHead = tHead + "<th  style='width: 183px;'>"+ ajaxResponse1.lstsubcharges[i].categoryName 
							+"<input type='hidden' class='hallid' id='th"+(i)+"' value='"
							+ajaxResponse1.lstsubcharges[i].slaveId+"'>" 
							
							+"<input type='hidden' class='hallid' id='thselfid"+(i)+"' value='"
							+ajaxResponse1.lstsubcharges[i].selfId+"'>" 
							
							+"<input type='hidden' class='hallid' id='thisCategory"+(i)+"' value='"
							+ajaxResponse1.lstsubcharges[i].isCategory+"'></th>"
							;
				}
				tHead  =  tHead  +"</tr>";
				
				$("#serviceHeader").html(tHead);
				

				if(response.lstChargesSlave.length > 0){
					 tHead1 = "";
					var tHead2 = "";

				
					for(var i=0; i< (response.lstChargesSlave.length) ; i++){

						tHead1 = tHead1 + "<tr  style='width: 183px;'>"
						+ "<td  style='width: 50px;'>"
						+ (i + 1)
						+ "</td>"
						+ "<td  style='width: 200px;'>"
					    + "<input type='hidden' class='hallid' id='thselfId"+(i)+"' value='"
						+ response.lstChargesSlave[i].selfId+"'>" 
						+ "<input type='hidden' class='hallid' id='txthslaveId"+(i)+"' value='"
						+ response.lstChargesSlave[i].slaveId +"'>"
						+ response.lstChargesSlave[i].codeName
						+ "</td>";
						
					
					for(var j=0; j< ajaxResponse1.lstsubcharges.length; j++){
						if(ajaxResponse1.lstsubcharges[j].slaveId < 0){
					var a= i +'_'+ j;
						tHead1 = tHead1 + "<td  style='width: 183px;'>"
						        + "<input type='hidden' class='hallid' id='thallid"+(i)+""+(j)+"' value='"
								+ajaxResponse1.lstsubcharges[j].slaveId+"'>"  
								+"<input  style='text-align:right;background-color : lightblue'   type='text' class='hallidch"+(i)+"' id='txthcharge"+(i)+""+(j)+"' value='"
								+ 0 +"' onkeypress='return validateNumbers(event)'  onkeyup=rowwisefixratesponser(\'"+ a + "'\)>"
								+ "<input type='hidden' class='hallid' id='txthDrid"+(i)+""+(j)+"' value='"
								+ 0 +"'>"
							    + "<input type='hidden' class='hallid' id='tdselfId"+(i)+""+(j)+"' value='"
								+ response.lstChargesSlave[i].selfId+"'>" 
								+ "<input type='hidden' class='hallid' id='tdslaveIdsp"+(i)+""+(j)+"' value='"
								+ response.lstChargesSlave[i].slaveId +"'>"
							
								+"</td>";
								
					}else{
						tHead1 = tHead1 + "<td  style='width: 183px;'>"
				        + "<input type='hidden' class='hallid' id='thallid"+(i)+""+(j)+"' value='"
						+ajaxResponse1.lstsubcharges[j].slaveId+"'>"  
						+"<input  style='text-align:right;'   type='text' class='hallidch"+(i)+"' id='txthcharge"+(i)+""+(j)+"' value='"
						+ 0 +"' onkeypress='return validateNumbers(event)'>"
						+ "<input type='hidden' class='hallid' id='txthDrid"+(i)+""+(j)+"' value='"
						+ 0 +"'>"
					    + "<input type='hidden' class='hallid' id='tdselfId"+(i)+""+(j)+"' value='"
						+ response.lstChargesSlave[i].selfId+"'>" 
						+ "<input type='hidden' class='hallid' id='tdslaveIdsp"+(i)+""+(j)+"' value='"
						+ response.lstChargesSlave[i].slaveId +"'>"
					
						+"</td>";
					}
					}
					tHead1 =tHead1  + "</tr>";
					}


					$("#servicesDiv").html(tHead1);

					$("#divdrr").css('height','-moz-available');
					$("#btnsp").css("display","block");
					$("#btnhall").css("display","none");
				}
				
			*/}
			
			$('#pleaseWait').hide();
		
		}
	});
 }


function getSponsorRecords(callFrom,sourceTypeId) {
	//alert("hi sponsor...");
	var chargesMasterDto;
	if(callFrom=="sourceid") {
	//	chargesMasterDto=$("#sourceType").val();
		chargesMasterDto=1;
	}else{
		chargesMasterDto=sourceTypeId;
		//chargesMasterDto=0;
	}
	//alert(chargesMasterDto);
	jQuery.ajax({
	
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : chargesMasterDto
		},
		url : "ehat/registration/fetchSponsorRecords",
		success : function(r) {
 			
 			console.log(r);
			setTemplateForSponsorSelectList(r,callFrom);
		//	$('#dynamicItem').html(" ");
			
			//alert(r);
			//setTempAllRecords(r);
		}
	});
}


function setTemplateForSponsorSelectList(r,callFrom){

	var list="<option></option>";
	

	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

	/*	if(callFrom==r.lstChargesSlave[int].slaveId){
  			$("#corporate").text(r.lstChargesSlave[int].categoryName);

		} */
			list=list+'<option value="'+(r.lstChargesSlave[int].slaveId)+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		 	//alert(r.lstChargesSlave[int].categoryName);
	}	
	
	$("#listmstr_select_service").html(list);
	
	}



function applytoallReg(){
	
	var rate=$("#rate").val();

	if($("#chksp").is(":checked")){
		var doctorNameOT=$("#doctorNameOT").val();
		/*if(doctorNameOT==0){
			alertify.error("Please Select Doctor!!");
			return false;
		}*/
		var sponser =$("#listmstr_select_service").val();
		if(sponser==0){
			alertify.error("Please Select Sponser!!");
			return false;
		}
		var tBodyLength =   $("#lengthsp").val();
    	var ajaxResponse = $("#hallistdiv").html();
	    var	ajaxResponse1 = JSON.parse(ajaxResponse);
         $('.hallidch').val(rate);
         // Added By Annapurna 
         $('#txthcharge0').val(rate);
			
	}else{

		var doctorNameOT=$("#doctorNameOT").val();
		if(doctorNameOT==0){
			alertify.error("Please Select Doctor!!");
			return false;
		}

		var tBodyLength = $('#servicesDiv td').length;
		
		for ( var j = 1; j < tBodyLength  ; j++) {
			 $("#txthcharge" + j).val(rate);	
			 //added by Annapurna
			 $('#txthcharge0').val(rate);

		}
		
	}
	
	
}


function savedrroundchargespReg(){
    var totalcharges= parseFloat($("#rate").val());
    
	var Drid =$("#doctorNameOT").val();
	var DrchargesId =0;
	/*if(Drid==0){
		alertify.error("Please Select Doctor!!!");
		return false;
	}*/
	var sponser =$("#listmstr_select_service").val();
	if(sponser==0){
		alertify.error("Please Select Sponser!!!");
		return false;
	}
	//For sponser Charges Id
	var sponserId = 0;// chargesId
	var sponserSlaveId = 0;// static chargesSlaveId
	var DocroundDetails = {
			lstDocroundDetails : []
		};
	var tHeadLength =     $("#lengthhead").val();
	
	var tBodyLength =   $("#splistdiv").html();
	var	spajaxResponse1 = JSON.parse(tBodyLength);
	var ajaxResponse = $("#hallistdiv").html();
    var	ajaxResponse1 = JSON.parse(ajaxResponse);
		for ( var i = 0; i < spajaxResponse1.lstChargesSlave.length  ; i++) {
		for ( var j = 0; j < ajaxResponse1.lstsubcharges.length  ; j++) {
				var HallSlaveId = $("#thallid"+i+ajaxResponse1.lstsubcharges[j].slaveId + spajaxResponse1.lstChargesSlave[i].slaveId).val();
				DrchargesId = $("#txthDrid"+i+ajaxResponse1.lstsubcharges[j].slaveId + spajaxResponse1.lstChargesSlave[i].slaveId).val();
				sponserId   =  $("#tdselfId"+i+ajaxResponse1.lstsubcharges[j].slaveId + spajaxResponse1.lstChargesSlave[i].slaveId).val();
				sponserSlaveId =  $("#tdslaveIdsp"+i+ajaxResponse1.lstsubcharges[j].slaveId + spajaxResponse1.lstChargesSlave[i].slaveId).val();
					//var charges = parseFloat($("#td"+ j+"td"+HallSlaveId ).val());
					var charges = parseFloat($("#txthcharge"+i+ajaxResponse1.lstsubcharges[j].slaveId + spajaxResponse1.lstChargesSlave[i].slaveId).val());
					
					if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
						charges = 0;
					}
					
					if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined || isNaN(HallSlaveId)) {
						HallSlaveId = 0;
					}
					
					
					if (sponserId == "" || sponserId == null
							|| sponserId == undefined) {
						sponserId = 0;
					}

					if (sponserSlaveId == "" || sponserSlaveId == null
							|| sponserSlaveId == undefined) {
						sponserSlaveId = 0;
					}
					
					if (DrchargesId == "" || DrchargesId == null
							|| DrchargesId == undefined) {
						DrchargesId = 0;
					}
					
					DocroundDetails.lstDocroundDetails.push({
						drchargesid        : DrchargesId,
						dr_id              : Drid,
				        dr_amnt            : charges,
				        hall_id            : 0,			
				        hallslave_id       : HallSlaveId,
				        sponser_id         :sponserId,
				        sponserslave_id    :sponserSlaveId,
				        drflag             :"S"
					});
			}
					
		}		
	
	DocroundDetails = JSON.stringify(DocroundDetails);
	console.log(DocroundDetails);
	
	var inputs = [];
	inputs.push("DocroundDetails="+ encodeURIComponent(DocroundDetails));
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		
		async : false,
		type : "POST",
		data :  str + "&reqType=AJAX",
		//url : "ehat/commanadv/saveDrround",
		url : "ehat/commanadv/saveDrroundReg",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);			
		}
	});
	
}
