/****************************
 * @author  : Vinod Udawant
 * @codeFor : Save Consultation charges hall/sponsor wise
 ****************************/
function saveConsultationCharges(callFrom) {

	var DrchargesId = 0;
	var totalcharges = parseFloat($("#rate").val());
	var Drid = $("#doctorNameOT").val();
	var drSpecialityId = $("#doctorSpeciality").val();
	var drflag = "H";
	var sponserId = 0;
	var sponserSlaveId = 0;
	
	if(callFrom == "hall"){
		
		drflag = "H";
	}else{
		
		drflag = "S";
		// For sponser Charges Id
		sponserId = $("#li0").val();// chargesId	
		var liSize = $("#dynamicItems li").length;
		sponserSlaveId = $("#listmstr_select_service").val();//$("#li" + (liSize - 1)).val();
	}
	
	if (Drid == 0) {
		alertify.error("Please Select Doctor!!!");
		return false;
	}
	
	if (sponserId == "" || sponserId == null || sponserId == undefined) {
		sponserId = 0;
	}

	if (sponserSlaveId == "" || sponserSlaveId == null
			|| sponserSlaveId == undefined) {
		sponserSlaveId = 0;
	}
	
	var tHeadLength = $('#serviceHeader th').length;
	var tBodyLength = $('#servicesDiv td').length;
	
	var DocroundDetails = {
		lstDocroundDetails : []
	};
	
	for ( var j = 0; j < tHeadLength - 1; j++) {

		var HallSlaveId = $("#thallid" + j).val();
		DrchargesId = $("#txthDrid" + j).val();
		
		var consultCharges = parseFloat($("#txtConsultCharge" + j).val());
		var consultWeekendCharges = parseFloat($("#txtConWeekCharge" + j).val());
		var followupCharges = parseFloat($("#txtFollowCharge" + j).val());
		var followWeekendCharges = parseFloat($("#txtWeekendCharge" + j).val());
		
		if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined || isNaN(HallSlaveId)) {
			HallSlaveId = 0;
		}

		DocroundDetails.lstDocroundDetails.push({
			drchargesid : DrchargesId,
			dr_id : Drid,
			drSpecialityId : drSpecialityId,
			consultAmnt : consultCharges,
			consultWeekendAmnt : consultWeekendCharges,
			followupAmnt : followupCharges,
			followWeekendAmnt : followWeekendCharges,
			hall_id : 0,
			hallslave_id : HallSlaveId,
			sponser_id : sponserId,
			sponserslave_id : sponserSlaveId,
			drflag : drflag
		});
	}

	// Json List
	DocroundDetails = JSON.stringify(DocroundDetails);

	var inputs = [];
	inputs.push("consultationChargesDetails="+ encodeURIComponent(DocroundDetails));
	var str = inputs.join('&');
	jQuery.ajax({

		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/commanadv/saveConsultationCharges",
		error : function() {
			alert('Network Error');
		},
		success : function(r) {

			alertify.success(r);
			$("#rate").val(0);
			setTimeout(function() {
				window.location.reload();
				
				$("#chkno").prop("checked", true);
			}, 400);
		}
	});
}
/****************************
 * @author  : Vinod Udawant
 * @codeFor : Get Consultation charges hall/sponsor wise
 ****************************/
function getConsulthallSponsercharg(callform) {

	var Drid = $("#doctorNameOT").val();
	var Spid = $("#listmstr_select_service").val();
	
	if(Drid == "" || Drid == undefined || Drid == "undefined"){
		
		Drid = 0;
	}
	
	if(Spid == "" || Spid == undefined || Spid == "undefined"){
		
		Spid = 0;
	}
	
	

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/commanadv/getConsulthallcharg",
		data : {
			"Drid" : Drid,
			"callform" : callform,
			"SpId" : Spid
		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(response) {
			sethallwiserecord(response,Spid);
		}
	});
}
/****************************
 * @author  : Vinod Udawant
 * @codeFor : Set Consultation charges hall/sponsor wise
 ****************************/
function sethallwiserecord(response,Spid) {
	
	var tHead = "";
	var tHead1 = "";
	// ================== Set table header start ================
	
	tHead = tHead + "<tr><th style='width: 183px;'>Type</th>";
	
	for ( var i = 0; i < response.lstDocroundDetails.length; i++) {

		tHead = tHead + "<th  style='width: 183px;'>"+ response.lstDocroundDetails[i].categoryName +"</th>";
	}
	tHead = tHead + "</tr>";
				
	$("#serviceHeader").html(tHead);
	// ================== Set table header end ================
	
	// ================== Set table body start ================
	for (var k = 0; k <= 3; k++) {
		
		var chargeType = "";
		var chargeId = "";		
		var charges = 0;		
		
		if(k==0){
			
			chargeType = "Consultation";
			chargeId = "txtConsultCharge";				
			
		}else if(k==1){
			
			chargeType = "Consultation weekend";			
			chargeId = "txtConWeekCharge";				
			
		}else if(k==2){
			
			chargeType = "Follow up";
			chargeId = "txtFollowCharge";			
			
		}else if(k==3){
			
			chargeType = "Follow up weekend";	
			chargeId = "txtWeekendCharge";				
		}
	
		tHead1 = tHead1 +"<tr><td style='width: 183px;'>"+chargeType+"</td>";
		
		for(var i = 0; i < (response.lstDocroundDetails.length); i++) {
			
			if(k==0){
			
				charges = response.lstDocroundDetails[i].consultAmnt;
				
			}else if(k==1){
				
				charges = response.lstDocroundDetails[i].consultWeekendAmnt;
				
			}else if(k==2){
				
				charges = response.lstDocroundDetails[i].followupAmnt;
				
			}else if(k==3){
				
				charges = response.lstDocroundDetails[i].followWeekendAmnt;
			}
			 if( $("#chksp").prop("checked") && Spid == 0){
			tHead1 = tHead1
					+ " <td style='width: 183px;'>"
					+ "		<input type='hidden' class='hallid' id='thallid"+i+"' value='0'>"
					+ "		<input type='hidden' class='hallid' id='txthDrid"+i+"' value='0'>"
					
					+ "		<input style='text-align:right' type='text' class='hallid' id='"+chargeId+""+i+"' value='"+0+"' "
					+ " 		onkeypress='return validateNumbers(event)'>"
					+ " </td>";
			 }else{
				 tHead1 = tHead1
					+ " <td style='width: 183px;'>"
					+ "		<input type='hidden' class='hallid' id='thallid"+i+"' value='"+ response.lstDocroundDetails[i].hallslave_id + "'>"
					+ "		<input type='hidden' class='hallid' id='txthDrid"+i+"' value='" + response.lstDocroundDetails[i].drchargesid+ "'>"
					
					+ "		<input style='text-align:right' type='text' class='hallid' id='"+chargeId+""+i+"' value='"+ charges +"' "
					+ " 		onkeypress='return validateNumbers(event)'>"
					+ " </td>";
			 }
		}
	}		
	
	tHead1 = tHead1 + "</tr>";
	
	$("#servicesDiv").html(tHead1);
	
	// ================== Set table body end ================
	
	$("#txtConsultCharge0").css("background-color", "lightblue");
	$("#txtConsultCharge0").attr('onkeyup', 'rowwisefixrate()');
	$("#txtConsultCharge0").css('height', '27px');
	
	$("#txtConWeekCharge0").css("background-color", "lightblue");
	$("#txtConWeekCharge0").attr('onkeyup', 'rowwisefixrate()');
	$("#txtConWeekCharge0").css('height', '27px');
	
	$("#txtFollowCharge0").css("background-color", "lightblue");
	$("#txtFollowCharge0").attr('onkeyup', 'rowwisefixrate()');
	$("#txtFollowCharge0").css('height', '27px');
	
	$("#txtWeekendCharge0").css("background-color", "lightblue");
	$("#txtWeekendCharge0").attr('onkeyup', 'rowwisefixrate()');
	$("#txtWeekendCharge0").css('height', '27px');
}

function rowwisefixrate() {
	
	var tBodyLength = $('#servicesDiv td').length;
	var consultCharges = $("#txtConsultCharge0").val();
	var consultWeekCharges = $("#txtConWeekCharge0").val();
	var followCharges = $("#txtFollowCharge0").val();
	var weekendCharges = $("#txtWeekendCharge0").val();
	for ( var j = 1; j < tBodyLength; j++) {
		
		$("#txtConsultCharge" + j).val(consultCharges);
		$("#txtConWeekCharge" + j).val(consultWeekCharges);
		$("#txtFollowCharge" + j).val(followCharges);
		$("#txtWeekendCharge" + j).val(weekendCharges);
	}
}

function setDocNameOT() {
	
	var inputs = [];
	inputs.push('date=onload');
	inputs.push('docType=doc');
	inputs.push('drDeptId=' + 0);
	var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
		url 	: "ehat/commanadv/getDocList",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		error 	: function() {
			alert("error");
		},
		success : function(r) {
		
			ajaxResponse = r;
			doctorlist(r);
 		}
	});
}

function doctorlist(response) {

	var list = "<option value='0'>--- Select Doctor ----</option>";

	for ( var i = 0; i < response.length; i++) {

		list = list + '<option value="' + (response[i].doctor_ID) + '">' + (response[i].doc_name) + '</option>';
	}
	$("#doctorNameOT").html(list);
	$("#doctorNameOT").select2('val','0');
}

function setsponsor() {

	$("#divsp").css("display", "block");
	$("#btnsp").css("display", "block");
	$("#btnhall").css("display", "none");
	$("#mulDynamicItemDiv").css("display", "block");
	$("#doctorNameOT").select2('val', '0');

	getSponsorRecords("sourceid", "1");
	getConsulthallSponsercharg("Sponsor");
}

function setnormal() {
	
	$("#divsp").css("display", "none");
	$("#btnsp").css("display", "none");
	$("#btnhall").css("display", "block");
	$("#mulDynamicItemDiv").css("display", "none");
	$("#doctorNameOT").select2('val', '0');

	getSponsorRecords("sourceid", "1");
	getConsulthallSponsercharg("Hall");
}

function applytoall() {

	var rate = $("#rate").val();

	if ($("#chksp").is(":checked")) {
		var doctorNameOT = $("#doctorNameOT").val();
		if (doctorNameOT == 0) {
			alertify.error("Please Select Doctor!!");
			return false;
		}
		var sponser = $("#listmstr_select_service").val();
		if (sponser == 0) {
			alertify.error("Please Select Sponser!!");
			return false;
		}
		
		var tBodyLength = $('#servicesDiv td').length;

		for ( var j = 0; j < tBodyLength; j++) {
				
			$("#txtConsultCharge" + j).val(rate);
			$("#txtConWeekCharge" + j).val(rate);
			$("#txtFollowCharge" + j).val(rate);
			$("#txtWeekendCharge" + j).val(rate);
		}

	} else {

		var doctorNameOT = $("#doctorNameOT").val();
		if (doctorNameOT == 0) {
			alertify.error("Please Select Doctor!!");
			return false;
		}

		var tBodyLength = $('#servicesDiv td').length;

		for ( var j = 0; j < tBodyLength; j++) {
				
			$("#txtConsultCharge" + j).val(rate);
			$("#txtConWeekCharge" + j).val(rate);
			$("#txtFollowCharge" + j).val(rate);
			$("#txtWeekendCharge" + j).val(rate);
		}
	}
}

function getSponsorRecords(callFrom, sourceTypeId) {

	var chargesMasterDto;
	if (callFrom == "sourceid") {
		chargesMasterDto = 1;
	} else {
		chargesMasterDto = sourceTypeId;
	}
	jQuery.ajax({

		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : chargesMasterDto
		},
		//url : "ehat/registration/fetchSponsorRecords",
		//updated Rohini... 
		url : "ehat/registration/fetchSponsorRecordsRegMaster",
		success : function(r) {

			setTemplateForSponsorSelectList(r, callFrom);
		}
	});
}

function setTemplateForSponsorSelectList(r, callFrom) {

	var list = "<option value='0'>-- Select Sponsor --</option>";

	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		list = list + '<option value="' + (r.lstChargesSlave[int].slaveId)
				+ '">' + (r.lstChargesSlave[int].categoryName) + '</option>';
	}
	$("#listmstr_select_service").html(list);
	$("#listmstr_select_service").select2('val','0');
}

function fetchSuperCatogoiresSlave(chargesMasterDto) {
	
	var selfId = $("#" + chargesMasterDto).val();
	chargesMasterDto = selfId;
	// if charges slave id is not equals or greter than zero
	if (chargesMasterDto == "" || chargesMasterDto == null
			|| chargesMasterDto == undefined || isNaN(chargesMasterDto)) {
		return false;
	} else {
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

				setDyanamicDivForList('mulDynamicItem', response);
			}
		});
	}
}

function setDyanamicDivForList(setDiv, response) {
	var htm = "";
	for ( var i = 0; i < response.lstChargesSlave.length; i++) {
		var count = i;
		var name = response.lstChargesSlave[i].categoryName;
		var id = response.lstChargesSlave[i].slaveId;
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

function refereshSonsorData(){
	$("#divsp").css("display","block");
	$("#divsp").animate({left: '90px'});
	$("#btnsp").css("display","block");
	$("#btnhall").css("display","none");
	$("#mulDynamicItemDiv").css("display","block");
	$("#doctorNameOT").select2('val','0');
	$("#mulDynamicItem").html('');
}


// Rohini Added 21-03-2024

//function fetchSuperCatogoiresSlaveConsultation(chargesMasterDto) {
function fetchSuperCatogoiresSlaveConsultation	(setDiv, getDiv,callform){
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItmesHc'
			+ count
			+ '">'
			+ '<div>' + name
			+ '</div>'
			/*+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcom('
			+ count + ',' + id + ',\'' +  callform + '\',\'' + setDiv + '\')" href="#"></a>'*/
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisHcpe' + (count) + '" type="hidden" value="' + id
			+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);
	
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		fetchAllServicecom(callform , setDiv);// for masters
	} else {
		var masterid ="";
			 masterid = $("#lisHcpe" + 0).val();
			 selfId = $("#lisHcpe" + (liSize - 1)).val();
			// fetchSubServiceByIdcom(masterid, selfId,callform, setDiv);
	
		var selfId = 0;
		if (liSize == 1) {
			//fetchSubServiceByIdcom(masterid, selfId,callform, setDiv);
			fetchChargesSlaveListByIdConsultation(masterid, selfId,callform,setDiv);
		} else {			
				selfId = $("#lisHcpe" + (liSize - 1)).val();		
		//	fetchSubServiceByIdcom(masterid, selfId,callform,setDiv);
				fetchChargesSlaveListByIdConsultation(masterid, selfId,callform,setDiv);
		}		
	}// now inside submaster catagories
	var lisHc="";
	
		lisHc=$("#lisHcat"+count).val();	
		
}

function fetchChargesSlaveListByIdConsultation(masterid, selfId,callform,setDiv) {
	
	var liSize = $("#" + setDiv + " li").length;
	var masterid ="";
	 masterid = $("#lisHcpe" + 0).val();
	 selfId = $("#lisHcpe" + (liSize - 1)).val();
	
	 var ids ="";
	 if (liSize >1) {
		 for(i=1;i<liSize; i++){
			 if(ids == ""){
				 ids = $("#lisHcpe"+i).val();
			 }else{
			  ids = ids +","+ $("#lisHcpe"+i).val();
			 }
		 }
		} 
	
	jQuery.ajax({
			type : "POST",
		
			//url : "ehat/commanadv/getChragesSlaveByIddrNew",
			url : "ehat/commanadv/getChragesSlaveByIddrConsultation",
			data : {
				//"masterId" : parseInt(1),
				"masterId" : parseInt(masterid),
				//"selfId" : parseInt(selfId)
				"selfIds" : ids
			},
			success : function(response) {
				
				//setsponser2RegNew(response,selfId,masterid,setDiv);
				setTemplateForSponsorSelectList(response, callform);
				$("#splistdiv").html(JSON.stringify(response));

				//setConsultsponser(response,Id,masterid);
				//fetchSuperCatogoiresSlave(selfId);
				
			}
		});
	}
function setsponser2RegNew(response,id,masterid,setDiv) {
		
	var liSize = $("#" + setDiv + " li").length;
	var masterid ="";
	 masterid = $("#lisHcpe" + 0).val();
	 selfId = $("#lisHcpe" + (liSize - 1)).val();
	
	 var ids ="";
	 if (liSize >1) {
		 for(i=1;i<liSize; i++){
			 if(ids == ""){
				 ids = $("#lisHcpe"+i).val();
			 }else{
			  ids = ids +","+ $("#lisHcpe"+i).val();
			 }
		 }
		} 
	
	 
	var Drid  = 1;
	Spid = ids;	
		$('#pleaseWait').show();
	jQuery.ajax({
		async : false,
		type 	: "POST",
	   // url 	: "ehat/commanadv/getReghallcharg",
		url 	: "ehat/commanadv/getRegistrationMasterhallcharg",
		data	: {
			"sponserid"       : masterid,
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
			}			
			$('#pleaseWait').hide();		
		}
	});
 }

/****************************
 * @author  : Rohini Ambhore 
 * date : 21-03-2024
 *  * @codeFor : Save Consultation charges hall/sponsor wise and sponser child wise 
 ****************************/
function saveConsultationChargesNew(callFrom) {

	var DrchargesId = 0;
	var totalcharges = parseFloat($("#rate").val());
	var Drid = $("#doctorNameOT").val();
	var drSpecialityId = $("#doctorSpeciality").val();
	var drflag = "H";
	var sponserId = 0;
	var sponserSlaveId = 0;
	
	if(callFrom == "hall"){
		
		drflag = "H";
	}else{
		
		drflag = "S";
		// For sponser Charges Id
		sponserId = $("#li0").val();// chargesId	
		var liSize = $("#dynamicItems li").length;
		sponserSlaveId = $("#listmstr_select_service").val();//$("#li" + (liSize - 1)).val();
		
		var sponser = $("#lisHcpe" + 0).val();
		alert('....sponser.......'+sponser);
	}
	
	if (Drid == 0) {
		alertify.error("Please Select Doctor!!!");
		return false;
	}
	
	if (sponserId == "" || sponserId == null || sponserId == undefined) {
		sponserId = 0;
	}

	if (sponserSlaveId == "" || sponserSlaveId == null
			|| sponserSlaveId == undefined) {
		sponserSlaveId = 0;
	}
	
	var tHeadLength = $('#serviceHeader th').length;
	var tBodyLength = $('#servicesDiv td').length;
	
	var DocroundDetails = {
		lstDocroundDetails : []
	};
	
	for ( var j = 0; j < tHeadLength - 1; j++) {

		var HallSlaveId = $("#thallid" + j).val();
		DrchargesId = $("#txthDrid" + j).val();
		
		var consultCharges = parseFloat($("#txtConsultCharge" + j).val());
		var consultWeekendCharges = parseFloat($("#txtConWeekCharge" + j).val());
		var followupCharges = parseFloat($("#txtFollowCharge" + j).val());
		var followWeekendCharges = parseFloat($("#txtWeekendCharge" + j).val());
		
		if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined || isNaN(HallSlaveId)) {
			HallSlaveId = 0;
		}

		DocroundDetails.lstDocroundDetails.push({
			drchargesid : DrchargesId,
			dr_id : Drid,
			drSpecialityId : drSpecialityId,
			consultAmnt : consultCharges,
			consultWeekendAmnt : consultWeekendCharges,
			followupAmnt : followupCharges,
			followWeekendAmnt : followWeekendCharges,
			hall_id : 0,
			hallslave_id : HallSlaveId,
			sponser_id : sponserId,
			sponserslave_id : sponserSlaveId,
			drflag : drflag
		});
	}

	// Json List
	DocroundDetails = JSON.stringify(DocroundDetails);

	var inputs = [];
	inputs.push("consultationChargesDetails="+ encodeURIComponent(DocroundDetails));
	var str = inputs.join('&');
	jQuery.ajax({

		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/commanadv/saveConsultationCharges",
		error : function() {
			alert('Network Error');
		},
		success : function(r) {

			alertify.success(r);
			$("#rate").val(0);
			setTimeout(function() {
				window.location.reload();
				
				$("#chkno").prop("checked", true);
			}, 400);
		}
	});
}
