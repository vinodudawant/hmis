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
	removeInpuntFild(0, masterId, 'dynamicItem');

	$("#operator").val("");
	$("#deptIdForConfig").val("");
	$("#hallCharges").val("");
	$("#medicalCharges").val("");
	$("#totalcharges").val("");

	$("#rightDiv").empty();
	$('#fromDate').val("");// empty from date
	$('#toDate').val(""); // empty to date
	//window.location.reload(true);

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
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	
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
    //charges  validation
    if(liSize > 0){
    	if(liSize <= 1){ 
    		alert("Please Select Atleast One charges and two sub Charges! ");
    		SetFocus('dynamicItems');
    		return false;
    		
    	}
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

	var i;
	for (i = 0; i < serviceIDs.length; ++i) {
	   
		var charges =chargess[i];
		var serviceId =serviceIDs[i];
		var configId =configIds[i];
		
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
			iscatHall       : iscatHall
		});
	}
	// for each
	//$(".right_Charges  ").each(function() {
		
		// var charges = parseFloat($("#inCharges"+cmt).val()); $(this) subserviceIds "#subbId" + cmt
				//var charges = parseFloat($(this).val());		
			   // serviceId = $(".subserviceIds"+cmt).val();
			   
			    //var copay = parseFloat($("#rightcopay"+cmt).val());
			   // var configId =$("#idConfiguration"+cmt).val();
			   // var copay = 0;
			   /* if (copay == "" || copay == null || copay == undefined || isNaN(copay)) {
			    	copay = 0;
				}*/
			    
				/*if (serviceId == "" || serviceId == null || serviceId == undefined) {
					serviceId = 0;
				}*/		
			
				/*if (chargesId == "" || chargesId == null
						|| chargesId == undefined) {
					chargesId = 0;
				}

				if (chargesSlaveId == "" || chargesSlaveId == null
						|| chargesSlaveId == undefined) {
					chargesSlaveId = 0;
				}*/
				 /*if (configId == "" || configId == null || configId == undefined || isNaN(configId)) {
					 configId = 0;
				 }*/
				 //serviceId      : serviceId, configId        : configId 
		/*configurationDetails.lstConfigurService.push({
			charges        : charges,
			
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
			serviceLastId   : serviceLastId
			
			
		});
		cmt++;			
	});*/
	

	
    
    
	if (chargesSlaveId == 0 && HallSlaveId==0 && isComServlastId==0) {
		alert("please select any combination or hall or sponsor to save services!");
		return false;
	}
	
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
				
				+ "<tr  id='tr"+(index + 1)+"' class='trs'><td class='col-sm-10-1 center' id='chName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].categoryName + "</td> "
				/*+ "<td class='col-sm-5-1 center' id='charges" + (index + 1)+"' style='height: 21.5px;' >"
				+"<input type='text' class='left_Charges' readonly id='inCharges" + (index + 1)+"' name='charges" + (index + 1)+"' onkeyup='totalAmount()' value='"+ response.lstSubService[i].charges+"'"
				
			
				+ "</td>" */
				
				
				+  "<input type='hidden' class='subserviceId"+ (index + 1) + "' id='subbId"+ (index + 1) + "' value='"+ response.lstSubService[i].subId + "'>"
				

				+ "<td id='lastTd"+(index + 1)+"'><input type='button' class='"+response.lstSubService[i].subId+"' value='>>' id='inputCnt"+ (index + 1) + "' onclick='addTRtoRight("+(index + 1)+")'>" 
				
				
				+ "</tr>" ;
			
		index++;
	}

	$("#leftDiv").html(htm);

}
/***************************this is for masters informations part****************************************************/
/*******
 * @author    :BILAL
 * @Date      :31-05-2017
 * @Code      :For fetching sub services list
 * ******/
function fetchlistS() {

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/subservice/SubServiceListCatN",

		error : function() {
			alert('error');
		},
		success : function(response) {
			
			servicesInfoTemplate(response);
		}
	});
}
/**@author   :Bilal
 * @date     :31-08-2017
 * @code     :for setting template of services for master infor mations ***/
function servicesInfoTemplate(response) {

	var htm = "";
	htm= '<thead id="serviceHeader">'
		+'<tr>'
		+ '<th class="col-md-1 center">#</th>'
		+ '<th class="col-md-1 center">Sub Service Name</th>'
		+ '<th class="col-md-1 center">Sub Service Code Name</th>'
		+ '<th class="col-md-1 center">Charges</th>'
		
		+ '</tr></thead>';
	var index = 0;

	for ( var i = 0; i < response.lstSubService.length; i++) {
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td><td class='col-sm-1-1 center' id='serviceNames"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].categoryName
				+ "</td><td class='col-sm-1-1 center' id='servicecoName"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].codeName
				+ "</td><td class='col-sm-1-1 center' id='servicecharges"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].charges
				+ "</td>"
				+"</tr>";
		index++;

	}

	$("#servicesDiv").html(htm);
	
}

/*******
 * @author    :BILAL
 * @Date      :05-10-2017
 * @Code      :For Auto suggetion for master information
 * ******/
function setData(inputId) {

	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#setDatabyName").val();
	}
	var findingName = $("#" + inputId).val();
    if(findingName.length == 0){
    	var dynamicItem="dynamicItem";
    	var id="listmstr_select";
    	removeInpuntFild(dynamicItem,id,1);
    	//window.location.reload(true);
    }
	var inputs = [];

	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subservice/getAutoSuggestionSubServiceMaster",

		success : function(r) {

			servicesInfoTemplate(r);

		}
	});
} 
/***************************this is for masters informations part END****************************************************/
/*******
 * @author    :BILAL
 * @Date      :10-JUN-2017
 * @Code      :For Adding TR to right div
 * ******/
/*function addTRtoRight(trCnt) {
	
	var subIDs=$("#subbId"+trCnt).val();	
	var subValues = $("#subIDs").html().split(",");
	
	//if it gives -1 then add to right div other wise return flase
	var position =subValues.indexOf(subIDs);
	if(position>=0){
		return false;
	}
	var index = $("#rightDiv tr").length;
	
	//GETTING TR IN ONE VARIABLE AND REMOVING FROM LEFT DIV
	var trNew = $('#tr' + trCnt).html();
	$('#tr' + trCnt).remove();
	//alert(trNew);
	//trCnt =index+1;
	
	//APPENDING TR IN RIGHT DIV
	$("#rightDiv").append("<tr id='tr" + trCnt + "'>" + (trNew) + "</tr>");
	var htm = '<input id="inputCnt' + trCnt
			+ '" type="button" onclick="addTRtoLeft(' + trCnt
			+ ')" value="<<" >';

	//ADDING LAST TD AND SUBSERVICE IDS 
	$('#lastTd' + trCnt).html(htm);
	$('#subIDs').append(","+subIDs);
	
	//REMOVING LEFT DIV CLASSES AND ADDING NEW CLASSES 
	$('#inCharges' + trCnt).removeClass('left_Charges');
	$('#inCharges' + trCnt).addClass('right_Charges');
	
	$('#subbId' + trCnt).removeClass('subserviceId'+trCnt); 
	$('#subbId' + trCnt).addClass('subserviceIds');

	totalAmount();
	
}
*/
/**@author Bilal
 * @date 10-JUN-2017
 * @code For add tr to left div
 * **/
/*function addTRtoLeft(trCnt) {
	
	
	
	var trNew = $('#tr'+trCnt ).html();
	
	$('#tr'+trCnt).remove();
//	$('#rightcopay'+trCnt).remove();
	$("#leftDiv").append("<tr id='tr"+trCnt+"'>"+(trNew)+"</tr>");
	var htm = '<input id="inputCnt'+(trCnt)+'" type="button" onclick="addTRtoRight('+(trCnt)+')" value=">>">';
	
	$('#lastTd'+trCnt).html(htm);
	
	var subIDs=$("#subbId"+trCnt).val();
	
	// $("#subIDs").append(",");
	var subValues = $("#subIDs").html();
	var temp =  subValues+","; 
	
	var position =subValues.indexOf(subIDs);
	if(position >=0){
		subValues.splice(position, 1);
	}
	var myString = temp.replace(","+subIDs+",",',');
	var setVal = myString.slice(0,-1);
	//alert("position="+position+" before="+ subValues+"   temp="+temp + " last="+setVal );
	
	$('#subIDs').html(setVal);
	
	$('#inCharges'+trCnt).removeClass(
	'right_Charges');
	$('#inCharges'+trCnt).addClass(
	'left_Charges');

	$('#subbId' + trCnt).removeClass('subserviceIds'); 
	$('#subbId' + trCnt).addClass('subserviceId'+trCnt);
	
	$('#idConfiguration' + trCnt).removeClass('idc'); 
	$('#idConfiguration' + trCnt).addClass('idcs');
	
	 totalAmount();
}*/
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
    		+'<td id="chNamer'+(index+1) +'" class="col-sm-10-1 center" style="height: 21.5px;">'+chName+' '
    		/*+'<td id="chargesr'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'
    		+'<input id="inChargesr'+(index+1) +'" class="right_Charges" type="text"  value="'+inCharges+'" onkeyup="totalAmount()" name="charges'+(index+1) +'">'*/
    		+'<input id="subbIdr'+(index+1) +'" class="subserviceIds" type="hidden" value="'+subIDs+'"></td>'
    		+'<td id="lastTdr'+(index+1) +'">'
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
    		+'<td id="chName'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'+chName+' '
    		/*+'<td id="charges'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'
    		+'<input id="inCharges'+(index+1) +'" class="left_Charges" type="text"  value="'+inCharges+'" onkeyup="totalAmount()" name="charges'+(index+1) +'">'*/
    		+'<input id="subbId'+(index+1) +'" class="subserviceId" type="hidden" value="'+subIDs+'"></td>'
    		+'<td id="lastTd'+(index+1) +'">'
    		+'<input id="inputCnt'+(index+1) +'" class="'+subIDs+'" type="button" onclick="addTRtoRight('+(index+1) +')" value=">>"></td>'
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

/*$(document).ready(function() {
	App.setPage("wizards_validations"); // Set current page
	App.init(); // Initialise plugins and elements
	FormWizard.init();
});*/
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

// Touheed for multiselect Data
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
		// for masters
	} else {
		/*
		 * var masterid = $("#li" + 0).val(); var selfId = 0;
		 */
		// alert(liSize);
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// fetchSubServiceList();// for Sub master
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
		//fetchAllService();

	} else {
		/*
		 * var masterid = $("#li" + 0).val(); var selfId = 0;
		 */
		// alert(liSize);
		if (liSize == 1) {
			fetchSubServiceById(masterid, selfId);
		} else {
			selfId = $("#li" + (liSize - 1)).val();
			fetchSubServiceById(masterid, selfId);
		}
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// fetchSubServiceList();// for Sub master
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

//Added By Rahul  If issue in this function then use bellow function (showData)
function showData1(){
	var servicesInfo=$("#servicesInfo").val();
	masterId = $("#listmstr_select").val();
	selfId =0;
	var inputs = [];
	inputs.push('masterId=' + masterId);
	inputs.push('selfId=' + selfId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/subservice/getmultipleSubservice",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
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
function showData(){
	//For Service Id
	var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	var selfId  =0;
	if (liSizeForServices > 1) {
		selfId =$("#li" + (liSizeForServices - 1)).val();
	}
	// Now masterIds array contains all the masterId values, and selfIds array contains all the corresponding selfId values

	/* if (masterId == "" || masterId == null || masterId == undefined || isNaN(masterId)) {
		 masterId = 0;
	}
	 if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
		 selfId = 0;
	}*/
	 //if (masterId > 0 && selfId > 0) {
		 fetchSubServiceIsCat(masterId, selfId);
	//}
	
	
}
/*******************************************************************************
 * Touheed's Plugin for Multi select
 ******************************************************************************/
/*******
 * @author    :BILAL
 * @Date      :26-MAY-2017
 * @Code      :For fetching all  sub services by id with master and self id
 * ******/
function fetchSubServiceById(masterId, selfId) {
	var servicesInfo=$("#servicesInfo").val();
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			multiSelectSlave(response);
			if (servicesInfo == "servicesInform") {
			   fetchSubServiceIsCat(masterId, selfId);
			}
		}
	});
}
/*******
 * @author    :BILAL
 * @Date      :26-MAY-2017
 * @Code      :For fetching id of sub service name
 * ******/

function selectSubService() {
	// selectserviceName
	var masterId = $('#profileList').val();
	$('#ChargesIdHidden').val(masterId);

	var selfId = 0;
	// var subId = 2; , subId
	fetchSubServiceById(masterId, selfId);
}


/*******************************************************************************
 * Touheed's Plugin for Multi select for charges
 ******************************************************************************/

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
	// $("#e1").html(list);
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
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
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
		// alert(masterid);
		// etchChargesSlaveListById(masterid,0);
		// getChargesMasterSlaveList();// for Sub master
	}
}

//MULTI SELECT SUB LIST FOR HALL 
function multiSelectSlaveForCharges2(response) {

	var list = "<option></option>";
	
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
	if(queryType == "insert"){
		fetchconfigdataonclick();
	}
}
/*******************************************************************************
 * Touheed's Plugin for Multi select ForCharges
 ******************************************************************************/



/*******
 * @author    :BILAL
 * @Date      :27-MAY-2017
 * @Code      :Geting hall and sponsor list(charges master list) 
 * ******/
function getAllChargesMaster() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/charges/chargesMasterList",

		success : function(response) {
			multiSelectForCharges(response);
		}
	});

}

/*******
 * @author    :BILAL
 * @Date      :23-MAY-2017
 * @Code      :Geting hall and sponsor list(charges master list) 
 * ******/
function getAllChargesMaster2() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/charges/chargesMasterList",

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
	//$("#totalcharges").val(Math.ceil(parseFloat(total)));
	
	//Math.ceil($("#totalcharges").val()); 
	//refresh All Values after caculations
	
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
		inputs.push('letter=' + letter);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/subservice/autoSuggestionSubServiceNames",
			success : function(r) {
				
				SubServiceTemplatedemo(r);
				//autoCompTable1(r, inputId);

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
				//autoCompTable1(r, inputId);

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
function fetchConfigurationChargesList(callfrom) {
    $('#callfrom').val(callfrom);
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getConfigurationListFromView",

		error : function() {
			alert('error');
		},
		success : function(response) {
			
			ConfigurationChargesTemplate(response);
		}
	});
}


/*******
 * @author    :BILAL
 * @Date      :14-JUN-2017
 * @Code      :For fetching configuration list 
 * ******/
function fetchConfigurationChargesList2() {

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getConfigurationListFromView2",

		error : function() {
			alert('error');
		},
		success : function(response) {
			
			ConfigurationChargesTemplate(response);
		}
	});
}


/*******
 * @author    :BILAL
 * @Date      :14-JUN-2017
 * @Code      :For  configuration list charges and sub charges (template)
 * ******/
function ConfigurationChargesTemplate(response) {

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
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
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
    /*$("#search").html(ht);*/
	$("#popupDiv").html(htm);

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
	var chargesSlaveName = $("#chargesSlaveName" +(cnt)).html();
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	//is combination flag
	var isComServId = $("#isComServId"+(cnt)).val();
	var isComServlastId = $("#isComServlastId" +(cnt)).val();
    var subServicename =$("#subServicename" +(cnt)).val();
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }
	//Hall Id and Hall slave Id
	var hallId = $("#hall_id"+(cnt)).val();
	var hallSlaveId = $("#hallslave_id" +(cnt)).val();
	var hallSlaveName=$("#hallSlaveName"+(cnt)).html();
	 if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		 hallId = 0;
	}
		if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
	 }
	//Service ids
	var serviceId = $("#serviceId"+(cnt)).val();
	var subserviceId = $("#subserviceId" +(cnt)).val();
	
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
			//console.log(response);
			
			ConfigurationServiceTemplate(response);
			
			if (chargesSlaveId > 0 && chargesId > 0) {
				fetchSuperCatogoiresSlave2(chargesSlaveId); // fetch list on select box of
				// charges
			}
			
			if (hallSlaveId > 0 && hallId > 0) {
				fetchSuperCatogoiresForHall(hallSlaveId); // fetch list on select box
				// of charges for Hall
			}
			
			if (isComServId > 0 && isComServlastId > 0) {
				fetchSuperCatogoiresForCombination(isComServlastId);
				//setLastLiForCom(isComServlastId, subServicename);
			}
			
			/*if (serviceId > 0 && subserviceId > 0) {
				fetchSuperCatogoiresForSub(subserviceId);
			}*/
			
			//fetch all sub services on left div
			fetchSubServiceCategoryList();
			
			if (chargesSlaveId > 0 && chargesId > 0) {
				setLastLiChargesMaster(chargesSlaveId, chargesSlaveName);
			}
			
			if (hallSlaveId > 0 && hallId > 0) {
				setLastLiChargesMasterForHall(hallSlaveId, hallSlaveName);
			}
			if (isComServId > 0 && isComServlastId > 0) {
				
				setLastLiCom(isComServlastId, subServicename);
				getAmountofService();
			}
			
			
			
			
		/* $("#myModal").modal('hide'); */
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
	//var deptname='';
	var departMentID=0;
	var index = 0;
	//var cmt = $("#leftDiv tr").length;
	for ( var i = 0; i < response.lstServiceConfigurations.length; i++) {
	
		var categoryName = response.lstServiceConfigurations[i].categoryName;
		var charges = response.lstServiceConfigurations[i].charges;
	    var idConfiguration =response.lstServiceConfigurations[i].idConfigurations;
		var serviceId=response.lstServiceConfigurations[i].serviceId;
		//var copay = response.lstServiceConfigurations[i].copay;
	    number = response.lstServiceConfigurations[i].number;
		operator = response.lstServiceConfigurations[i].operator;
	//	distribute = response.lstServiceConfigurations[i].distribute;
		increaseordecrease = response.lstServiceConfigurations[i].increaseordecrease;
		fromDate = response.lstServiceConfigurations[i].fromDate;
		toDate = response.lstServiceConfigurations[i].toDate;
		hallCharges = response.lstServiceConfigurations[i].hallCharges;
		medicalCharges = response.lstServiceConfigurations[i].medicalCharges;
		deptname = response.lstServiceConfigurations[i].deptname;
		departMentID =response.lstServiceConfigurations[i].departMentID;

		
		htm = htm
		
				
			
				+'<tr id="trs'+(i + 1)+'">'
				+'<td id="chNamer'+(i + 1)+'" class="col-sm-5-1 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chargesr'+(i + 1)+'" class="col-sm-3-1 center" style="height: 21.5px;">'
				+'<input id="inChargesr'+(i + 1)+'" class="right_Charges" type="text"  value="'+charges+'" onkeyup="totalAmount()" name="charges'+(i + 1)+'">'
				+'</td>'
				
				
				
				
				
				+'<td id="lastTdr'+(i + 1)+'">'
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

/**
 * @author bilal
 * @date 14-JUN-2017 fetchSuperCatogoiresForHall(hallSlaveId)
 * @code for fetching data on select box**/
function fetchSuperCatogoiresSlave2(chargesMasterDto) {

	//alert(chargesMasterDto);
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
			setDyanamicDivForList2('dynamicItems',response);
		}
	});
}

/**
 * @author bilal
 * @date 17-JUN-2017 ()
 * @code for fetching data on select box**/
function fetchSuperCatogoiresForHall(chargesMasterDto) {

	//alert(chargesMasterDto);
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
			console.log(response);
			setDyanamicDivForList3('dynamicItems2',response);
		}
	});
}
/**
 * @author bilal
 * @date 14-JUN-2017 setDyanamicDivForList3
 * @code for setting data on select box master element**/
function setDyanamicDivForList2(setDiv,response) {
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

/**
 * @author bilal
 * @date 14-JUN-2017 
 * @code for setting data on select box master element**/
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
/**
 * @author bilal
 * @date 14-JUN-2017
 * @code for setting Last li character on select box**/
function setLastLiChargesMaster(id, name) {
	var len = $('#dynamicItems li').length;
	
	var html='<li id="liItmes'+(len)+'" class="select2-search-choice">'
			+'<div>'+(name+'(S)')+'</div>'	
			+'<a class="select2-search-choice-close" href="#" onclick="removeInpuntFildForCharges('+(len)+','+(id)+',\'dynamicItems\')" tabindex="-1"></a>'
			+'<input id="lis'+(len)+'" type="hidden" value="'+(id)+'">'
			+'</li>';

	$('#dynamicItems').append(html);
	
	//$("#lis0").val(chargesId);// chargesId
	/*var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;*/

	 //$("#lis" + (len - 1)).val(id);setLastLiChargesMasterForHall
	
}

/**
 * @author bilal
 * @date 17-JUN-2017
 * @code for setting Last li character on select box**/
function setLastLiChargesMasterForHall(id, name) {
	
	var len = $('#dynamicItems2 li').length;
	var html='<li id="liItmesH'+(len)+'" class="select2-search-choice">'
			+'<div>'+(name)+'</div>'	
			+'<a class="select2-search-choice-close" href="#" onclick="removeInpuntFildForCharges2('+(len)+','+(id)+',\'dynamicItems2\')" tabindex="-1"></a>'
			+'<input id="lisH'+(len)+'" type="hidden" value="'+(id)+'">'
			+'</li>';

	$('#dynamicItems2').append(html);
	
	//$("#lis0").val(chargesId);// chargesId
	/*var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;*/

	 //$("#lis" + (len - 1)).val(id);
	
}



/**
 * @author  :bilal
 * @date    :14-JUN-2017
 * @code    :for delete functionality of charges configuration**/
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
		//$("#myModal").removeClass("active");
		//$("#myModal").modal('hide');
		//$("#myModal").hide();
		//$(".popup").fadeOut().removeClass("active");
	}
	
	
}


/**
 * @author bilal
 * @date 16-JUN-2017
 * @code for setting From date to To date**/
function fromDateToDate() {
	
	//$('.open-datetimepicker').datepicker();
	 $('#fromDate').datepicker({
	      autoclose: true
	  });
	 $('#toDate').datepicker({
	      autoclose: true
	    });
	
	/* $('#toDate').datepicker({
	      autoclose: true
	    });*/
	
	 /*$('.open-datetimepicker').click(function(event) {
			event.preventDefault();
			$('#fromDate').click();
		});
*/
	
}


/**@author Bilal
 * @date 16-JUN-2017
 * @code For Getting List Of Department
 * ***/
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
/**@author Bilal
 * @date 16-JUN-2017
 * @code For setting Dept List on select box
 * ***/
function setTempAllForConfiguration(r) {
	var list = "<option value='0'>--Select Department--</option>";    
    for ( var i = 0; i < r.lstDepts.length; i++) {    

        list = list + "<option value='"+r.lstDepts[i].deptId+"'>" + (r.lstDepts[i].deptName) + "</option>";    
        }  
    $("#deptIdForConfig").html(list);
}

/**@author Bilal
 * @date 16-JUN-2017
 * @code For setting Dept List on select box
 * ***/
function handleConfigurationTooltips() {
	
	//Default tooltip (Top)
	$('.tip-focus').tooltip({
		trigger: 'focus'
	});
}



/**@author Bilal
 * @code For fetching records from database of charges configuration 
 * ****/
function fetchAllListForUpdateFromCOnfiguration() {
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/configurationservice/fetchAllListForUpdate",
		// chargesMasterList
		success : function(response) {
			console.log(response);
			
		}
	});
}



/**@author Bilal
 * @date 20-JUN-2017
 * @code For update the fields with id
 * ****/
function fetchAllListByHallIdAndByChargesId() {
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/configurationservice/fetchAllListByHallIdAndByChargesId",
		// chargesMasterList
		success : function(response) {
			
			//console.log(response);
			
		
			
		}
	});
}



/**
 * @author Bilal
 * @date 21-JUN-2017
 * @code For fetching Hall type id 
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
			//alert("hallId >>>>>>>>>>"+response);
			//console.log(response);
			
		}
	});
}


/**
 * @author Bilal
 * @date 24-JUN-2017
 * @code For fetching records from configuration based on sponsor id and hall id
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
		fetchconfigdataonclick();
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

	$("#distribute").val(charges);
    $("#iscombination").val(iscombination);
	
}
/*******************************************************************************
 * @author : Bilal
 * @date : 31-july-2017
 * @code : for fectch all services whose combination flag is Y services
 ******************************************************************************/
function fetchAllServicecom() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceListCom",
		
		success : function(response) {
			multiSelectcom(response);
			//fetchSubServiceCategoryList();
		}
	});

}

/**
 * @author : Bilal
 * @date   : 31-july-2017
 * @code   : for fectch all sub services whose combination flag is Y under services***/
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

/**@author bilal
 * @date   31-july-2017
 * @code   for update of sub service list**/
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

/**@author bilal
 * @date   31-july-2017
 * @code   for update of sub service list**/
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

/**@author bilal
 * @date   31-july-2017
 * @code   for update of Combination flag of service**/
function fetchSuperCatogoiresForCombination(serviceId) {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForCombination('dynamicItemcom', response);
		}
	});
}

/**@author bilal
 * @date   31-july-2017
 * @code   for update of Combination flag of service**/
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
 * @author bilal
 * @date 31-JUN-2017
 * @code for setting Last li of package**/
function setLastLiCom(id, name) {
	var len = $('#dynamicItemcom li').length;
	var html='<li id="liItmesHc'+(len)+'" class="select2-search-choice">'
			+'<div>'+(name)+'</div>'	
			+'<a class="select2-search-choice-close" href="#" onclick="removeInpuntFildcom('+(len)+','+(id)+',\'dynamicItemcom\')" tabindex="-1"></a>'
			+'<input id="lisHc'+(len)+'" type="hidden" value="'+(id)+'">'
			+'</li>';

	$('#dynamicItemcom').append(html);
	
	
	
}

/**
 * @author  bilal
 * @date    31-JUN-2017
 * @code    for getting configuration data from view to show on popup
 * fetchConfigurationChargesList**/
function getConfigurationdata(callfrom) {
	$('#callfrom').val(callfrom);
	
	if (callfrom == "combination") {
		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"callfrom" : callfrom
			},
			url : "ehat/configurationservice/getConfigurationdata",

			error : function() {
				alert('error');
			},
			success : function(response) {

				ConfigurationChargesTemplatecom(response);
			}
		});
	} else if (callfrom == "sponsor") {
		jQuery.ajax({
			async : false,
			type : "POST",
			
			url : "ehat/configurationservice/getConfigdataSponsor",

			error : function() {
				alert('error');
			},
			success : function(response) {

				ConfigurationChargesTemplateSponsor(response);
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

				ConfigurationChargesTemplateHall(response);
			}
		});
	}

}

/**@author   :Bilal
 * @Date     :4-Aug-2017
 * @code     :for fetching dynamic services on right div**/
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
		}
	});		
}

/**@author   :Bilal
 * @Date     :4-Aug-2017
 * @code     : for set dynamic services on right div**/
function setDynamicServicesOnright(response) {

	var htm = '';
	
	var index = 0;
	
	var cmt = $("#leftDiv tr").length;
	for ( var i = 0; i < response.lstServiceConfigurations.length; i++) {

		var categoryName     = response.lstServiceConfigurations[i].categoryName;
		var charges          = response.lstServiceConfigurations[i].charges;
		var serviceId        =response.lstServiceConfigurations[i].serviceId;
		var idConfigurations =response.lstServiceConfigurations[i].idConfigurations;
		
		htm = htm
		
				
			
				+'<tr id="trs'+(cmt + 1)+'">'
				+'<td id="chNamer'+(cmt + 1)+'" class="col-sm-5-1 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chargesr'+(cmt + 1)+'" class="col-sm-3-1 center" style="height: 21.5px;">'
				+'<input id="inChargesr'+(cmt + 1)+'" class="right_Charges" type="text" value="'+charges+'" onkeyup="totalAmount()" name="charges'+(cmt + 1)+'">'
				+'</td>'
				
				
				
				
				
				+'<td id="lastTdr'+(cmt + 1)+'">'
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
	}

	$("#rightDiv").html(htm);
	
	
	totalAmount();
}


/**@author   :Bilal
 * @date     :5-Aug-2017
 * @code     :for setting template for combination**/
function ConfigurationChargesTemplatecom(response) {

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
	
	
	var index = 0;
	for ( var i = 0; i < response.lstConfigurations.length; i++) {
	
		
		
		htm = htm
				
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
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
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
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
   // $("popupheader").html(htm);
	$("#popupDiv").html(htm);

}

/**@author   :Bilal
 * @date     :5-Aug-2017
 * @code     :for setting template for sponsor**/
function ConfigurationChargesTemplateSponsor(response) {

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
				+ response.lstConfigurations[i].hallName
				+ "</td>"
				+ "<td class='col-md-2-1 center' id='hallSlaveName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstConfigurations[i].hallSlaveName
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
   // $("popupheader").html(htm);
	$("#popupDiv").html(htm);

}

/**@author   :Bilal
 * @date     :5-Aug-2017
 * @code     :for setting template for hallWise**/
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
   // $("popupheader").html(htm);
	$("#popupDiv").html(htm);

}
/**@author   :Bilal
 * @date     :28-08-2017
 * @code     :for delete one service***/
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
/**@author   :Bilal
 * @date     :04-10-2017
 * @code     :for autosuggetion on popup with sponsor name sponsor slave,Hall,HallSlave,Combination,CombSlave ***/
function searchall(inputId) {
	var callfrom = $('#callfrom').val();
	
	if (callfrom == "combination") {
		searchcombination(inputId);
	} else if (callfrom == "sponsor") {
		searchsponsor(inputId);
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

		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + letter);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/configurationservice/searchall",

			success : function(r) {

				ConfigurationChargesTemplate(r);

			}
		});
	}
}
/**@author   :Bilal
 * @date     :05-10-2017
 * @code     :for autosuggetion on popup with Combination,CombSlave ***/
function searchcombination(inputId){
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
		url : "ehat/configurationservice/searchcombination",

		success : function(r) {

			ConfigurationChargesTemplatecom(r);

		}
	});
}

/**@author   :Bilal
 * @date     :05-10-2017
 * @code     :for autosuggetion on popup with Sponsor and sponsor slave ***/
function searchsponsor(inputId){
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
		url : "ehat/configurationservice/searchsponsor",

		success : function(r) {

			ConfigurationChargesTemplateSponsor(r);

		}
	});
}

/**@author   :Bilal
 * @date     :05-10-2017
 * @code     :for autosuggetion on popup with Hall and Hallslave ***/
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
	/*var $rows = $('#leftDiv tr');
	$('#searchk').keyup(function() {
	    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
	    
	    $rows.show().filter(function() {
	        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
	        return !~text.indexOf(val);
	    }).hide();
	});*/

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
	
	//var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	//var selfId  =0;
	
	if (liSizeForServices > 1) {
		selfId = $("#li" + (liSizeForServices - 1)).val();
	}
	if (liSizeForServices > 0) {
		
		addAllTRtoRight();
	    /*$('#pleaseWait').show();
		jQuery.ajax({
			type : "POST",
			url : "ehat/subservice/getSubServiceIsCat",
			data : {
				"masterId" : parseInt(masterId),
				"selfId" : parseInt(selfId)
			},
			success : function(response) {

				subtemplateonaddAll(response);

			}
		});*/
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
				+'<td id="chNamer'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="chargesr'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'
				+'<input id="inChargesr'+(index+1) +'" class="right_Charges" type="text"  value="'+charges+'" onkeyup="totalAmount()" name="charges'+(index+1) +'">'
				
				+'<td id="lastTdr'+(index+1) +'">'
				+'<input id="subbIdr'+(index + 1)+'" class="subserviceIds" type="hidden" value="'+serviceId+'">'
	    		+'<input id="inputCntr'+(index+1) +'" type="button" value="<<" onclick="addTRtoLeft('+(index+1) +')"></td>'
				
				+'</tr>';
		
		$('#subIDs').append(","+serviceId);
		$('#leftDiv tr').remove();
		//var selfId   =response.lstSubService[i].selfId;
		//$("#selfId").val(selfId);
		index++;
	}

	$("#rightDiv").html(htm);
	$('#pleaseWait').hide();
	totalAmount();
	
}


function setDyanamicDivNew(setDiv, getDiv) {
	
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

}
