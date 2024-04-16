/************
* @author	: Akshata Desai
* @date		: 20-Feb-2020
* @codeFor	: toggleEntryDiv Details
 ************/
function toggleEntryDiv(id) {
	
	if (id == "divForEdit") {

		$("#divForEntry").show('slow');
	} else {

		$("#divForEntry").toggle('slow');
	}
}

/************
* @author	: Akshata Desai
* @date		: 20-Feb-2020
* @codeFor	: toggleEntryDiv Details
 ************/
function toggleEntryDivHistory(id) {
	
	if (id == "divForEdit") {

		$("#divForEntry5").show('slow');
	} else {

		$("#divForEntry5").toggle('slow');
	}
}
/************
* @author	: Akshata Desai
* @date		: 20-Feb-2020
* @codeFor	: fetch History Details
 ************/
function fetchHistory() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/history_master/fetchHistory",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			setAllHistoryMaster(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}
function setAllHistoryMaster(response) {

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.lstddHistoryList.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.lstddHistoryList[i].dm_Flag
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ response.lstddHistoryList[i].htn_Flag
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.lstddHistoryList[i].ihd_Flag
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.lstddHistoryList[i].ba_Flag
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.lstddHistoryList[i].other_Flag
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editIcd10CodeMgmt('
				+ response.lstddHistoryList[i].historyId
				+ ')><i class="fa fa-edit"></i></button></td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteIcd10CodeMgmt('
				+ response.lstddHistoryList[i].historyId
				+ ')><i class="fa fa-trash-o"></i></button></td>'

				+ '</tr>';

		index++;

	}
	$("#historyDetails").html(htm);
}
/************
* @author	: Akshata Desai
* @date		: 17-Feb-2020
* @codeFor	: Save History Details
 ************/
function saveHistory(){
	var historyId = $("#historyId").val();
	var familyHistory = $("#familyHistory").val();
	var surgicalHistory = $("#surgicalHistory").val();
	var dm_Flag = $("#dm_Flag").val();
	var htn_flag=$("#htn_flag").val();
	var ihd_flag=$("#ihd_flag").val();
	var ba_Flag=$("#ba_Flag").val();
	var other_Flag=$("#other_Flag").val();
	var txtDm=$("#txtDm").val();
	var txtHtn=$("#txtHtn").val();
	var txtIhd=$("#txtIhd").val();
	var txtBaco=$("#txtBaco").val();
	var txtOther=$("#txtOther").val();
	
	if(txtDm==" "||txtDm==null||txtHtn==" "||txtHtn==null||txtIhd==" "||txtIhd==null||txtBaco==" "||txtBaco==null||txtOther==" "||txtOther==null ){
		txtDm=null;
		txtHtn=null;
		txtIhd=null;
		txtBaco=null;
		txtOther=null;
	}
	var inputs = [];	
	inputs.push('familyHistory=' + familyHistory);
	inputs.push('surgicalHistory=' + surgicalHistory);
	inputs.push('historyId=' + historyId);
	
	
	var dm_Flag = $("#dm_Flag").is(":checked") ? 1:0;
	//dm_Flag = dm_Flag + "-"+ $("#txtDm").val();
	
	var htn_flag = $("#htn_flag").is(":checked") ? 1:0 ;
	//htn_flag =  htn_flag +"-"+ $("#txtHtn").val();
	
	var ihd_flag = $("#ihd_flag").is(":checked") ? 1:0 ;
	//ihd_flag = ihd_flag +"-"+ $("#txtIhd").val();
	
	var ba_Flag = $("#ba_Flag").is(":checked") ? 1:0 ;
	//ba_Flag = ba_Flag +"-"+ $("#txtBaco").val();
	
	var other_Flag = $("#other_Flag").is(":checked") ? 1:0;
	//other_Flag = other_Flag +"-"+ $("#txtOther").val();
	

	inputs.push('dm_Flag='+dm_Flag);
	inputs.push('htn_flag='+htn_flag);
	inputs.push('ihd_flag='+ihd_flag);
	inputs.push('ba_Flag='+ba_Flag);
	inputs.push('other_Flag='+other_Flag);
	inputs.push('txtDm='+txtDm);
	inputs.push('txtHtn='+txtHtn);
	inputs.push('txtIhd='+txtIhd);
	inputs.push('txtBaco='+txtBaco);
	inputs.push('txtOther='+txtOther);
	var str1 = inputs.join('&');
	jQuery.ajax({
		type :"POST",
		url :"ehat/history_master/saveHistory",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(data==3){
			 alertify.success("Complaint name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			fetchHistory();
		},		
	})
}
/************
* @author	: Akshata Desai
* @date		: 20-Feb-2020
* @codeFor	: toggleEntryDiv Details
 ************/
function toggleEntryDivClinical(id) {
	
	if (id == "divForEdit") {

		$("#divForEntry1").show('slow');
	} else {

		$("#divForEntry1").toggle('slow');
	}
}


/************
* @author	: Akshata Desai
* @date		: 17-Feb-2020
* @codeFor	: Save Clinical Details
 ************//*
function saveClinical(){
	var clinicalId = $("#clinicalId").val();
	var clinicalCode=$("#clinicalCode").val();
	var cvs = $("#cvs").val();
	var rs = $("#rs").val();
	var pa = $("#pa").val();
	var cns=$("#cns").val();
	var other=$("#other").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	var clinicalDetails = {
			lstDdClinicalMaster :[]
	};
	var rows= $('#tblForAutosuggestForClinical tbody tr').length;
	
	for(var i=1;i<rows;i++){
		
		var clinicalName=$("#1"+i).val();
		alert(clinicalName);
		var str=[];
		Str =clinicalName.split('-');
		//alert(Str[0]);
		//alert(Str[1]);
		clinicalDetails.lstDdClinicalMaster.push({
			clinicalCode:Str[0],
			clinicalName:Str[1],
			cvs:cvs,
			rs:rs,
			pa:pa,
			cns:cns,
			other:other,
			userId:userId,
			createdBy:userId,
			unitId:unitId
		});
	}
	clinicalDetails=JSON.stringify(clinicalDetails);
	var inputs = [];	
	inputs.push('clinicalDetails='+clinicalDetails);
	var str1 = inputs.join('&');
	jQuery.ajax({
		type :"POST",
		url :"ehat/dd_clinical_master/saveClinical",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(data==3){
			 alertify.success("Clinical name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			fetchClinical();
		},		
	})
}*/

/************
* @author	: Akshata Desai
* @date		: 21-Feb-2020
* @codeFor	: toggleEntryDiv Details
 ************/
function toggleEntryDivService(id) {
	onclickServiceAdvice();
	if (id == "divForEdit") {

		$("#divForEntry3").show('slow');
	} else {

		$("#divForEntry3").toggle('slow');
	}
}
/************
* @author	: Akshata Desai
* @date		: 21-Feb-2020
* @codeFor	: unit Details
 ************/
function fetchUnit() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/unit/fetchUnitList",

				success : function(r) {
					setTemplateForLoginUnitSelectList(r);
					
				//	var unitiddr=$("#uids").val();
					$("#uId").val();
				}
			});
}

var listofunit ="";
function setTemplateForLoginUnitSelectList(r){
	
	var list="<option value='0'>All</option>";
	
	for ( var int = 0; int < r.lstUnit.length; int++) {
		list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
	}	
	
	$("#uId").html(list);
}
/************
* @author	: Akshata Desai
* @date		: 21-Feb-2020
* @codeFor	: unit Details
 ************/
function fetchDoctor(){
	
	var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dd_service_advised/fetchDoctor",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setAlldoctorMaster(r);
			
			//var doctor=$("#doctornameDetails").val();
			$("#doctorDetails").val();
			
			/*setTimeout(function() {
				userAccess();
			}, 100);*/
		}
	});
}
var listofDoctor="";
function setAlldoctorMaster(r){
//	var myJSON = JSON.stringify(r); 
//	alert(myJSON);
var list="<option value='0'>select</option>";

//alert(r.listDoctor.length);
	
	for ( var int = 0; int < r.listDoctor.length; int++) {
		list=list+'<option value="'+(r.listDoctor[int].Doctor_ID)+'">'+(r.listDoctor[int].dn)+'</option>';
		//listofDoctor= listofDoctor+","+(r.listDoctor[int].Doctor_ID);
	}	
	
	$("#doctorDetails").html(list);
}

/************
* @author	: Akshata Desai
* @date		: 27-Feb-2020
* @codeFor	: Service Advised Details
 ************/
function saveService(){
	var serviceId = $("#serviceId").val();
	var serviceName = $("#txtautoserviceName").val();
	 var type = $("#servicename").val();
	//var type = $("#dynamicItem").val();
	var charges = $("#chargesubservice").val();
	var instruction=$("#instruction").val();
	var clinicalNotes=$("#clinicalNotes").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var serviceId = $("#serviceid" ).val();
	var urgentflag='N';
	var radiationFlag='N';
	var sendToRisFlag='N';
	var sndToLabFlag='N';
	
	if (clinicalNotes == "" ||  clinicalNotes ==null) {
		clinicalNotes="-";
	}
	if (instruction == "" ||  instruction ==null) {
		instruction="-";
	}

	if($("#cpoeUrgent").is(':checked')){
	    	urgentflag='Y';
	    }
	
	if(serviceId=="11" || serviceId=="13"){
   	 if($("#cpoesndtolab").is(':checked')){
   	    	sndToLabFlag='Y';
   	    	sendToRisFlag = 'N';
   	    }
   }else if(serviceId=="12"){
   	if($("#cpoeSendToRis").prop("checked")==true){
   		sendToRisFlag = 'Y';
   		sndToLabFlag='N';
   		
   	}
   }else if(serviceId=="18"){
   	 if($("#cpoeSendToRad").is(':checked')){
          radiationFlag='Y';
      }
   }

	var inputs = [];	
	inputs.push('serviceId=' + serviceId);
	inputs.push('serviceName=' + serviceName);
	inputs.push('type=' + type);
	alert(type);
	inputs.push('charges='+charges);
	inputs.push('instruction='+instruction);
	inputs.push('clinicalNotes='+clinicalNotes);
	inputs.push('urgentflag='+urgentflag);
	inputs.push('radiationFlag='+radiationFlag);
	inputs.push('sendToRisFlag='+sendToRisFlag);
	inputs.push('sndToLabFlag='+sndToLabFlag);
	inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	jQuery.ajax({
		type :"POST",
		url :"ehat/dd_service_advised/saveService",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(data==3){
			 alertify.success("Service name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			fetchService();
		},		
	})
}

/*function fetchService() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/dd_service_advised/fetchService",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			setAllServiceMaster(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}

function setAllServiceMaster(r) {

	var htm = "";
	var index = 1;
	
	for ( var i = 0; i < r.lstddServiceList.length; i++) {
		
		//var datetime= r.lstddServiceList[i].createdDate;
		
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ r.lstddServiceList[i].serviceName
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ datetime.split(",")[0]
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ r.lstddServiceList[i].type
				+ '</td>'

				+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+index+'" style="width:60px; background-color: green;" disabled></input></td>'
				+ '<td class="col-md-1-1 center">';

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editIcd10CodeMgmt('
				+ r.lstddServiceList[i].serviceId
				+ ')><i class="fa fa-edit"></i></button></td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteIcd10CodeMgmt('
				+ r.lstddServiceList[i].serviceId
				+ ')><i class="fa fa-trash-o"></i></button></td>'

				+ '</tr>';

		index++;

	}
	$("#servieDetails").html(htm);
}
*/
function onResetPres() {
	$("#drugs").val("");
	$("#mron").val("");
	$("#after").val("");
	$("#night").val("");
	$("#eve").val("");
	$("#instruction").val(0);
	$("#route").val(0);
	$("#duration").val("");
	$("#qty").val("");
	getInst();
	$("#prepMasterId").val(0);
	$("#callform").val("");
	getPrescriptionList('onload');
	showHideDiv();
}
