var lengthofComplaint=0;
var lengthofClinical=0;
var lenghthofHistory=0;

/************
* @author	: Akshata Desai
* @date		: 17-Feb-2020
* @codeFor	: autosuggestion for Complaint Master
 ************/
function centerComplaintAutoSuggestion(inputID) {
	var resultData = [];
	var complaintName = $("#" + inputID).val();
	var complaintCode = $("#"+inputID).val();
	

	var inputs = [];
	inputs.push('complaintName=' + complaintName);
	inputs.push('complaintCode=' + complaintCode);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/complaint_master/centerComplaintAutoSuggestion",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.lstComplaintMaster.length; j++) {
				var arrValue = response.lstComplaintMaster[j].complaintCode+"-"+response.lstComplaintMaster[j].complaintName;
				var idValue = response.lstComplaintMaster[j].complaintId;
				var complaintName = response.lstComplaintMaster[j].complaintName;
				var complaintCode = response.lstComplaintMaster[j].complaintCode;
				resultData.push({
					ID : idValue,
					Name : complaintName,
					Code : complaintCode
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
			}

			setTimeout(function() {
				
				$("#div"+ inputID +" .typeahead").html(template);
				$("#div"+ inputID +" .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name'+"-"+'Code',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {
	$("#divEntry3").show();
	var count=$("#complaintcount").val();
	count++;
	$("#complaintcount").val(count);
		var res = item.text.split('-');
		var complaintId = res[0];
		var complaintName = res[1];	
		var complaintCode = res[2];
		$("#"+ inputID).val(complaintName);
		$("#"+ inputID).val(complaintCode);
		createNextComplaintInput(count);
		
	}
}

function createNextComplaintInput(inputID){
	var htm = '<tr><td><div class="col-sm-12" id="div'+inputID+'"> '
	+'<input type="hidden" id="complaintid'+inputID+'">'
	+'<input type="text" id="'+inputID+'" class="form-control typeahead" size="70" style="border: none; outline: none;width: 100%  placeholder="Complaint" onkeyup=centerComplaintAutoSuggestion(this.id);>'
	+'</div></td></tr>'
	$("#tblForAutosuggest").append(htm);
	$("#complaintcount").val(inputID);
	}

function refreshComplaints(){
	$("#complaint").val("");
}

/************
* @author	: Akshata Desai
* @date		: 17-Feb-2020
* @codeFor	: Save Complaint master
 ************/
/*function saveComplaintMaster(){
	var complaintcount= $("#complaintcount").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var complaintCode =$('#complaintCode').val();
	var complaintContent=$('#complaintContent').val();
	var treatmentId= $("#treatmentId").val();
	//var patientId = $("#patientId").val();
	var patientId = $.trim(($("#patientId").val()));
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
		///alert(treatmentId);
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
		//alert(treatmentId);
	}
	

	
	if(complaintContent==" "||complaintContent==null||complaintContent==undefined||complaintContent=="NULL"){
		alert("please enter Complaint & Symptoms Days");		
		//$("#complaintContent").focus();	
		//$("#divEntry3").show();
		return false;
	}
	
	var complaintDetails = {
			lstDdComplaintMaster :[]
	};
	
	//var rows= $('#tblForAutosuggest tbody tr').length;
	
	//for(var i=0;i<rows;i++){
	for(var i=0;i <= complaintcount;i++ )
	{
		var complaintName=$("#"+i).val();
		var complaintid=$("#complaint"+i).val();
		if(complaintid == null || complaintid == undefined || complaintid == "")
			{
			complaintid=0;
			}
		if(complaintName == null || complaintName == undefined || complaintName == "")
			{
			}
		
		else{
		var string=[];
		String =complaintName.split('-');
		//alert(String[2]);
		if(String[2] == null || String[2] == undefined || String[2] == "")
		{
			alert("please enter Complaint & Symptoms Days EX: 2Days");
			return false;
		}
		complaintDetails.lstDdComplaintMaster.push({
			complaintId:complaintid,
			complaintCode:String[0],
			complaintName:String[1],
			complaintContent:String[2],
			userId:userId,
			createdBy:userId,
			unitId:unitId,
			treatment_id :treatmentId,
			patientId:patientId
		});
		}
	}
	
	complaintDetails=JSON.stringify(complaintDetails);
	var inputs = [];
	
	inputs.push('complaintDetails='+complaintDetails);
	
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/dd_complaint_master/saveComplaint",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(r){
			if(r==1){
			alertify.success("Data Saved successfully");
			$("#divEntry3").hide();
			lengthofComplaint=r.length;
			//alert(lengthofComplaint);
			if (r.length == 0) {
				$("#collapseComplaints").slideUp('fast');
				$("#formComplaints").hide();
			} else {
				$("#collapseComplaints").slideDown('slow');
				$("#formComplaints").show();
			}
			}
		 else if(r==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(r==3){
			 alertify.success("Complaint name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			//clearComplaint();
		}		
	})
}
*/
/************
* @author	: Akshata Desai
* @date		: 20-Feb-2020
* @codeFor	: fetch complaint Details
 ************/
/*function fetchComplaint() {
	//var treatmentId= $("#treatmentId").val();
	
	var inputs = [];
	var treatmentId;

	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var patientId = $("#patientId").val();
	var unitId = $("#unitId").val();
	//alert(treatmentId);
	//var inputs = [];
	
	inputs.push('unitId=' + unitId);
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	inputs.push('pid=' + encodeURIComponent(patientId));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/dd_complaint_master/fetchComplaint",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var ccount=$("#complaintcount").val();
			for(var i=1;i<=ccount;i++)
				{
				$("#div"+i).remove();
				}
			if(r.lstDdComplaintMaster.length==0){
				$("#formComplaints").collpase('hide');
			}

			setAllComplaintMaster(r);
			
		}
	});
}*/
function setAllComplaintMaster(r) {
	var count=1; 
		for ( var i = 0; i < r.length; i++) {	
			createNextComplaintInput(count);
			$("#complaintid"+i).val(r[i].complaintId);
			$("#"+i).val(r[i].complaintCode+"-"+r[i].complaintName+"-"+r[i].complaintContent);
			count++;
			
		}
		
}

/************
* @author	: Akshata Desai
* @date		: 10-Feb-2020
* @codeFor	: autosuggestion for Clinical Evolution Master
 ************/
function centerClinicalEvolutionAutoSuggestion(inputID) {
	var resultData = [];
	var clinicalName = $("#" + inputID).val();
	var clinicalCode = $("#"+inputID).val();

	var inputs = [];
	inputs.push('clinicalName=' + clinicalName);
	inputs.push('clinicalCode=' + clinicalCode);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/clinical_evolution_master/centerClinicalEvolutionAutoSuggestion",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.lstclinicalevolutionMaster.length; j++) {
				var arrValue = response.lstclinicalevolutionMaster[j].clinicalCode+"-"+response.lstclinicalevolutionMaster[j].clinicalName;
				var idValue = response.lstclinicalevolutionMaster[j].clinicalId;
				var clinicalName = response.lstclinicalevolutionMaster[j].clinicalName;
				var clinicalCode = response.lstclinicalevolutionMaster[j].clinicalCode;
				resultData.push({
					ID : idValue,
					Name : clinicalName,
					Code : clinicalCode
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
			}

			setTimeout(function() {
				
				$("#divBy" + inputID + " .typeahead").html(template);
				$("#divBy" + inputID + " .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name'+"-"+'Code',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {
		$("#divEntry1").show();
		var count=$("#clinicalcount").val();
		count++;
		$("#clinicalcount").val(count);
		var res = item.text.split('-');
		var clinicalId = res[0];
		var clinicalName = res[1];	
		var clinicalCode = res[2];
		$("#"+ inputID).val(clinicalName);
		$("#"+inputID).val(clinicalCode);
		createNextInputForClinical(count);
	}
}
function createNextInputForClinical(inputID){
	
	var htm = '<tr><td><div class="col-sm-12 input-container" id="divBy1'+inputID+'"> '
	+'<input type="hidden" id="clinical1'+inputID+'">'
	+'<input type="text" id="1'+inputID+'" class="form-control typeahead " size="70" style="border: none; outline: none;width: 100%  placeholder="Cliniacl Evaluation" onkeyup=centerClinicalEvolutionAutoSuggestion(this.id);>'
	+'</div></td></tr>'
	$("#tblForAutosuggestForClinical").append(htm);
	$("#clinicalcount").val(inputID);
}

/************
* @author	: Akshata Desai
* @date		: 17-Feb-2020
* @codeFor	: Save Clinical Details
 ************/
function saveClinical(){
	var clinicalcount= $("#clinicalcount").val();
	var clinicalId = $("#clinicalId").val();
	var clinicalCode=$("#clinicalCode").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var treatmentId= $("#treatmentId").val();
	var patientId = $.trim(($("#patientId").val()));
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var clinicalDetails = {
			lstDdClinicalMaster :[]
	};
	//var rows= $('#tblForAutosuggestForClinical tbody tr').length;
	
	for(var i=0;i<clinicalcount;i++){
		
		
		var clinicalid=$("#clinical1"+i).val();
		if(clinicalid == null || clinicalid == undefined || clinicalid == "")
			{
			clinicalid=0;
			}
		var clinicalName=$("#1"+i).val();
		if(clinicalid!=0 && clinicalName == null || clinicalName == undefined || clinicalName == "")
		{
			jQuery.ajax({
				type : "POST",
				url : "ehat/dd_clinical_master/deleteDDClinical",
				data : {
					"clinicalid" : clinicalid
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
				}
			});
		}
		else if(clinicalid==0){
			
		var str=[];
		Str =clinicalName.split('-');
		clinicalDetails.lstDdClinicalMaster.push({
			clinicalId:clinicalid,
			clinicalCode:Str[0],
			clinicalName:Str[1],
			userId:userId,
			createdBy:userId,
			unitId:unitId,
			treatment_id:treatmentId,
			patientId:patientId
		});
		}
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
		success: function(r){
			if(r==1){
			alertify.success("Data Saved successfully");
			lengthofClinical=r.length;
			if (r.length == 0) {
				$("#collapseCilinic").slideUp('fast');
			} else {
				$("#collapseCilinic").slideDown('slow');
				$("#formClinical").show();
			}
			}
		 else if(r==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(r==3){
			 alertify.success("Clinical name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			fetchClinical(); 
		},		
	})
}

/************
* @author	: Akshata Desai
* @date		: 20-Feb-2020
* @codeFor	: fetch Clinical Details
 ************/
function fetchClinical() {
	var treatmentId= $("#treatmentId").val();
	var inputs = [];
	var callfrom="default";
	callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/dd_clinical_master/fetchClinical",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			clearClinical();
			var clicount=$("#clinicalcount").val();
			for(var i=1;i<=clicount;i++)
				{
				$("#divBy1"+i).remove();
				}
			lengthofClinical=r.lstDdClinicalMaster.length;
			if (r.lstDdClinicalMaster.length == 0) {
				$("#collapseCilinic").slideUp('fast');
			} else {
				$("#collapseCilinic").slideDown('slow');
				$("#formClinical").show();
			}
			setAllClinicalMaster(r);
		}
	});
}
function setAllClinicalMaster(r) {
	
	var count=1; 
	for ( var i = 0; i < r.lstDdClinicalMaster.length; i++) {	
		createNextInputForClinical(count);
		$("#clinical1"+i).val(r.lstDdClinicalMaster[i].clinicalId);
		$("#1"+i).val(r.lstDdClinicalMaster[i].clinicalCode+"-"+r.lstDdClinicalMaster[i].clinicalName);
		count++;
	}

}

function toggleEntryDivClinical(id) {
	
	if (id == "divForEdit") {

		$("#divForEntry2").show('slow');
	} else {

		$("#divForEntry2").toggle('slow');
	}
}
/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	: History Auto-suggestion Details
 ************/
/*function centerHistoryAutoSuggestion(inputID) {
	var resultData = [];
	var historyName = $("#" + inputID).val();
	var historyCode = $("#" + inputID).val();

	$("#personalhistoryFlag").val("P")
	var inputs = [];
	inputs.push('historyName=' + historyName);
	inputs.push('historyCode='+ historyCode);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/history_master/centerHistoryAutoSuggestion",
		cache : false,
		success : function(response) {
					//alert(response);
			var template = "";
			for ( var j = 0; j < response.lstHistoryMaster.length; j++) {
				var arrValue = response.lstHistoryMaster[j].historyId +"-"+response.lstHistoryMaster[j].historyName+"-"+response.lstHistoryMaster[j].historyCode;
				var idValue = response.lstHistoryMaster[j].historyId;
				var historyName = response.lstHistoryMaster[j].historyName;
				var historyCode = response.lstHistoryMaster[j].historyCode;
				resultData.push({
					ID : idValue,
					Name : historyName,
					Code : historyCode
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {
		$("#divEntry2").show();
		var count=$("#historycount").val();
		count++;
		$("#historycount").val(count);
		var res = item.text.split('-');
		var historyId = res[0];
		var historyName = res[1];	
		var historyCode = res[2];
		$("#"+ inputID).val(historyName);
		$("#"+ inputID).val(historyCode);
		createNextInputForHistory(count);
	}
}*/
function createNextInputForHistory(inputID){
	
	var htm = '<tr><td><div class="col-sm-12" id="documentByName2'+inputID+'"> '
	+'<input type="hidden" id="history2'+inputID+'">'
	+'<input type="text" id="2'+inputID+'" class="form-control typeahead" size="70" style="border: none; outline: none;width: 100%  placeholder="History" onkeyup=centerHistoryAutoSuggestion(this.id);>'
	+'</div></td></tr>'
	$("#tblForAutosuggestForHistory").append(htm);
	$("#historycount").val(inputID);
}

/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	: Family History Auto-suggestion Details
 ************/
function centerFamilyHistoryAutoSuggestion(inputID) {
	var resultData = [];
	var historyName = $("#" + inputID).val();
	var historyCode = $("#" + inputID).val();
	
    $("#historyFlag").val("F");
	var inputs = [];
	inputs.push('historyName=' + historyName);
	inputs.push('historyCode='+ historyCode);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/history_master/centerFamilyHistoryAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstHistoryMaster.length; j++) {
				var arrValue = response.lstHistoryMaster[j].historyCode +"-"+response.lstHistoryMaster[j].historyName;
				var idValue = response.lstHistoryMaster[j].historyId;
				var historyName = response.lstHistoryMaster[j].historyName;
				var historyCode = response.lstHistoryMaster[j].historyCode;
				resultData.push({
					ID : idValue,
					Name : historyName,
					Code : historyCode
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
			}

		
				$("div#documentByName3"+ inputID + ".typeahead").html(template);
				$("div#documentByName3"+ inputID + ".typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			
		}
	});
	function displayResult(item) {
		$("#divEntry2").show();
		var count=$("#familyhistorycount").val();
		count++;
		$("#familyhistorycount").val(count);
		var res = item.text.split('-');
		var historyId = res[0];
		var historyName = res[1];	
		var historyCode = res[2];
		$("#"+ inputID).val(historyName);
		$("#"+ inputID).val(historyCode);
		createNextInputForFamilyHistory(count);
	}
}
function createNextInputForFamilyHistory(inputID){
	
	var htm = '<tr><td><div class="col-sm-12" id="documentByName3'+inputID+'"> '
	+'<input type="hidden" id="familyhistoryid3'+inputID+'">'
	+'<input type="text" id="familyhistory3'+inputID+'" class="form-control typeahead" size="70" style="border: none; outline: none;width: 100%  placeholder="Family History" onkeyup=centerFamilyHistoryAutoSuggestion(this.id);>'
	+'</div></td></tr>'
	$("#tblForAutosuggestForFamilyHistory").append(htm);
	$("#familyhistorycount").val(inputID);
}
/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	: Save History Details
 ************/
function saveHistory(){
	var familyhistorycount=$("#familyhistorycount").val();
	var historycount= $("#historycount").val();
	//var his_Id = $("#his_Id").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var treatmentId= $("#treatmentId").val();
	var patientId = $("#patientId").val();
	var historyFlag=$("#historyFlag").val();
	var personalhistoryFlag=$("#personalhistoryFlag").val();
	var patientId = $.trim(($("#patientId").val()));
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var historyDetails = {
			lstddHistoryList :[]
	};
	var rows;
	if(historyFlag == "F" && personalhistoryFlag == "P"){			
		if(familyhistorycount > historycount){
			rows = historycount;
		}else{
			rows = familyhistorycount;
		}
	   // rows=$('#tblForAutosuggestForFamilyHistory tbody tr').length;
	    for(var i=0;i<rows;i++){
	    	var personalHistory=$("#2"+i).val();
			var familyHistoryContent=$("#familyHistoryContent").val();
			var his_Id=$("#history2"+i).val();
			var fname=$("#familyhistory3"+i).val();		
			//alert("his_Id:"+his_Id);
			
			if(his_Id == null || his_Id == undefined || his_Id == "")
				{
				his_Id=0;
				}
			if(his_Id!=0 && personalHistory=="" && fname==""){
				
				jQuery.ajax({
					type : "POST",
					url : "ehat/history_master/deleteDDHistory",
					data : {
						"his_Id" : his_Id
					},
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(response) {
						alertify.error(response);
						
					}
				});
			}
				var str=[];
				Str =fname.split('-');
				if(fname==""){
					fname="abc";
				}
				else if(Str[1] == null || Str[1] == undefined || Str[1] == "")
				{
					alert("please enter Family Relation  EX:Diabetes Mellitus-Father");
					return false;
				}
				if(fname!="abc"){
				historyDetails.lstddHistoryList.push({
					his_Id:his_Id,
					personalHistory:personalHistory,
					familyHistory:Str[0],
					familyHistoryContent:Str[1],
					userId:userId,
					createdBy:userId,
					unitId:unitId,
					treatment_id:treatmentId,
					patientId:patientId
				});		
	    }
				}	
	    }else if(historyFlag=="F"){
		$("#formPersonalHistory").hide();
		$("#FamilyDiHide").show();
		//rows=$('#tblForAutosuggestForFamilyHistory tbody tr').length;
	    for(var i=0;i<familyhistorycount;i++){
			var personalHistory= "";
			var familyHistoryContent=$("#familyHistoryContent").val();
			var his_Id=$("#history2"+i).val();
			var fname=$("#familyhistory3"+i).val();				
			if(his_Id == null || his_Id == undefined || his_Id == "")
				{
				his_Id=0;
				}
			if(his_Id!=0 && personalHistory=="" && fname==""){
				
				jQuery.ajax({
					type : "POST",
					url : "ehat/history_master/deleteDDHistory",
					data : {
						"his_Id" : his_Id
					},
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(response) {
						alertify.error(response);
					
					}
				});
			}
				var str=[];
				Str =fname.split('-');
				if(fname==""){
					fname="abc";
				}
				else if(Str[1] == null || Str[1] == undefined || Str[1] == "")
				{
					alert("please enter Family Relation  EX:Diabetes Mellitus-Father");
					return false;
				}
				if(fname!="abc"){
				historyDetails.lstddHistoryList.push({
					his_Id:his_Id,
					personalHistory:personalHistory,
					familyHistory:Str[0],
					familyHistoryContent:Str[1],
					userId:userId,
					createdBy:userId,
					unitId:unitId,
					treatment_id:treatmentId,
					patientId:patientId
				});	
				}
				}	
	    }else if(personalhistoryFlag=="P"){
	 $("#formFamilyhistory").hide();
	 $("#perosnalDiHide").show();
	 // rows=$('#tblForAutosuggestForHistory tbody tr').length;
	  for(var i=0;i<historycount;i++){
			var personalHistory=$("#2"+i).val();
			var his_Id=$("#history2"+i).val();
			var familyHistoryContent="";
			var his_Id=$("#history2"+i).val();
			var fname="";				
			if(his_Id == null || his_Id == undefined || his_Id == "")
				{
				his_Id=0;
				}	
			if(his_Id!=0 && personalHistory=="" && fname==""){
				
				jQuery.ajax({
					type : "POST",
					url : "ehat/history_master/deleteDDHistory",
					data : {
						"his_Id" : his_Id
					},
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(response) {
						alertify.error(response);
						
					}
				});
			}
				var str=[];
				Str =fname.split('-');
				historyDetails.lstddHistoryList.push({
					his_Id:his_Id,
					personalHistory:personalHistory,
					familyHistory:Str[0],
					familyHistoryContent:Str[1],
					userId:userId,
					createdBy:userId,
					unitId:unitId,
					treatment_id:treatmentId,
					patientId:patientId
				});		
		}
  }	
	
	historyDetails=JSON.stringify(historyDetails);
	var inputs = [];	
	inputs.push('historyDetails='+historyDetails);
	inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	jQuery.ajax({
		type :"POST",
		url :"ehat/history_master/saveHistoryMaster",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(r){
			if(r==1){
			alertify.success("Data Saved successfully");
			
			//$("#divEntry2").hide();
			lenghthofHistory=r.length;
			if (r.length== 0) {
				$("#collapseHistory").slideUp('fast');
				//$("#formHistory").hide();
			} else {
				$("#collapseHistory").slideDown('slow');
				$("#formHistory").show();
				
			}
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");		
			 }
		 else if(data==3){
			 alertify.success("History already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
			}
			fetchForHistory();
			clearFamilyHistory();
			clearHistory();
		},		
	})
}



/************
* @author	: Akshata Desai
* @date		: 20-Feb-2020
* @codeFor	: fetch History Details
 ************/
function fetchHistory() {
	//var treatmentId= $("#treatmentId").val();
	var patientId=$("#patientId").val();
	var unitId = $("#unitId").val();
	var treatmentId;

	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	inputs.push('pid=' +encodeURIComponent(patientId));
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
			clearFamilyHistory();
			clearHistory();
			/*if($("#formFamilyhistory").val() == "")
			{
				$("#formFamilyhistory").hide();
			}*/
			/*var fhistory=r.ddHistoryList.get(familyHistory);
			alert(fhistory);*/
			if(r.lstddHistoryList[0].personalHistory!=0){
				$("#formPersonalHistory").show();
				
			}else{
				$("#formFamilyhistory").hide();
			}
		
			if( r.lstddHistoryList.length==0){
				$("#formHistory").collpase('hide');
				
			}

			//setAllHistoryMaster(r);
			//setAllFamilyHistoryMaster(r);
		}
	});
}
function setAllHistoryMaster(r) {
	var count=1; 
	
	for ( var i = 0; i < r.lstddHistoryList.length; i++) {	
		createNextInputForHistory(count);
		//alert("1="+r.lstddHistoryList[i].personalHistory);
		
		if(r.lstddHistoryList[i].familyHistory != "" && r.lstddHistoryList[i].personalHistory != ""){
			$("#formPersonalHistory").show();
			$("#formFamilyhistory").show();
		}else if(r.lstddHistoryList[i].personalHistory != ""){
			$("#formFamilyhistory").hide();
			$("#formPersonalHistory").show();
			 $("#perosnalDiHide").show();
		}
		$("#history2"+i).val(r.lstddHistoryList[i].his_Id);
		$("#2"+i).val(r.lstddHistoryList[i].personalHistory);
		count++;
	}
	$("#formPersonalHistory").clone();
}
function setAllFamilyHistoryMaster(r){
	var count=1; 
	
	for ( var i = 0; i < r.lstddHistoryList.length; i++) {	
		createNextInputForFamilyHistory(count);
		//alert("2="+r.lstddHistoryList[i].familyHistory);
		if(r.lstddHistoryList[i].familyHistory != "" && r.lstddHistoryList[i].personalHistory != ""){
			$("#formPersonalHistory").show();
			$("#formFamilyhistory").show();
		}else if(r.lstddHistoryList[i].familyHistory != "") {
			$("#formPersonalHistory").hide();
			$("#formFamilyhistory").show();
			$("#FamilyDiHide").show();
		}
		/*if(r.lstddHistoryList[i].length!=0){
			$("#formFamilyhistory").show();
			$("#formPersonalHistory").show();
		}*/
		
		$("#familyhistory3"+i).val(r.lstddHistoryList[i].familyHistory+"-"+r.lstddHistoryList[i].familyHistoryContent);
		count++;
	}
	$("#formFamilyhistory").clone();
}

/************
* @author	: Akshata Desai
* @date		: 23-March-2020
* @codeFor	:  Get Notes Id details 
 ************/
function getNextNotesID(){
	var treatmentId= $("#treatmentId").val();
	var inputs = [];
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/notes/getNextNotesID",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#autonotes').val(r);
			
			refreshNotes();
		}
	});
}
/************
* @author	: Akshata Desai
* @date		: 23-March-2020
* @codeFor	:  Save Notes 
 ************/
function saveNotes(){
	var treatmentId= $("#treatmentId").val();
	//var patientId = $("#patientId").val();
	var notesData = $("#notesData").val();
	var notesId= $("#notesId").val();
	var date = $("#notesdate").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var patientId = $.trim(($("#patientId").val()));
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	if(notesId == null || notesId == undefined || notesId == "")
		{
		notesId=0;
		}
	
	if(notesData=="" || notesData==undefined || notesData==null || notesData=="null"  ){
		alert("please type here notes");		
		$("#notesData").focus();					
		return false;
	}	
	if(date=="" || date==undefined || date==null || date=="null"  ){
		alert("please select the date");		
		$("#notesdate").focus();					
		return false;
	}	
	var inputs = [];	
	inputs.push('notesData=' + notesData);
	inputs.push('notesId=' + notesId);
	inputs.push('treatment_id='+treatmentId);
	inputs.push('patientId='+patientId);
	inputs.push('date='+ date);
	inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/notes/saveNotes",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Notes Saved successfully");
			$("#ViewNotesPopDetails").modal('hide');
			//onCloseBtnRefrshPage();
			getAllNotesCount();

			}
		 else if(data==2){
			 alertify.success("Notes Updated successfully");
			 	$("#notesdate").val("");
				$("#notesData").val("");
				$("#notesId").val("0");
			 
			}
		 else if(data==3){
			 alertify.success("Notes already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			//getAllNotes();
			refreshNotes();
		},		
	})
}
function refreshNotes(){
	$('#autonotes').val(0);
	$('#notes').val('');
	$('#notesdate').val('');
	$('#notesData').val('');
	
}

function getAllNotes(){
	var treatmentId= $("#treatmentId").val();
	//var treatmentId;
	var patientId=$("#patientId").val();
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var inputs = [];
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	inputs.push('pid=' +encodeURIComponent(patientId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/notes/getAllNotes",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setAllNotes(r,"All");	
			refreshNotes();
			//setDataToViewTable(r, "All");
		
			//$("#countNotes").text(r.lstnotes.length);
		}
	});
}

function setAllNotes(r,CallFrom){
	//alert("aaaa");
	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstnotes.length; i++) {
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+r.lstnotes[i].date+'</td>'
			+ ' <td class="col-md-1 center">'+"Notes"+""+index+'</td>'
			+ ' <td class="col-md-1 center"  data-toggle="modal" data-target="#Notes_view" onClick="viewNotesById('+ r.lstnotes[i].notesId + ');"><button class="btn btn-success btn-xs"><i class="fa fa-eye View"></i></button></td>'
			+ '</tr>';
			index++;
			
		}
		
	}
	$("#tblForNotes").html(htm);
}
/************
* @author	: Akshata Desai
* @date		: 23-March-2020
* @codeFor	:  Edit Notes 
 ************/
function editNotes(notesId){
	$("#Notes_view").modal('hide');  
	//$("#Notes_view").hide();
	var inputs = [];
	inputs.push('notesId=' + notesId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/notes/editNotes",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {		
			$('#notesdate').val(r.date);
			$('#notesData').val(r.notesData);
			$('#notesId').val(r.notesId);	
			//refreshNotes();
		}
	});
}
/************
* @author	: Akshata Desai
* @date		: 23-March-2020
* @codeFor	: Delete Notes 
 ************/
function deleteNotes(notesId){
	
	//alert(notesId);
	var r = confirm("Are You Sure You Want To Delete Notes Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/notes/deleteNotes",
			data : {
				"notesId" : notesId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshNotes();
				viewNotesById(notesId);
				//getAllNotes();
				getAllNotesCount();
				$("#Notes_view").modal('hide');
			}
		});
	}
}
/************
* @author	: Akshata Desai
* @date		: 23-March-2020
* @codeFor	:  Count Notes 
 ************/
function notesCount()
{
	var unitId=$("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/notes/notesCount",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#unitCountNotes").text(r.countNotes);
			}
		});
}

/************
* @author	: Akshata Desai
* @date		: 23-March-2020
* @codeFor	:  Get History Details 
 ************/
function fetchForHistory() {
	var treatmentId= $("#treatmentId").val();
	var patientId=$("#patientId").val();
	var unitId = $("#unitId").val();
	//var treatmentId;

	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
		$("#formPersonalHistory").show();
		 $("#formFamilyhistory").show();
			$("#FamilyDiHide").hide();
			 $("#perosnalDiHide").hide();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	inputs.push('pid=' +encodeURIComponent(patientId));
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
			clearFamilyHistory();
			clearHistory();
			//$("#divEntry2").hide();
			var hcount=$("#historycount").val();
			for(var i=1;i<=hcount;i++)
				{
				$("#documentByName2"+i).remove();
				}
			
			var fcount=$("#familyhistorycount").val();
			for(var i=1;i<=fcount;i++)
				{
				$("#documentByName3"+i).remove();
				}
			lenghthofHistory=r.lstddHistoryList.length;
			if (r.lstddHistoryList.length== 0) {
				$("#collapseHistory").slideUp('fast');
				$("#formHistory").hide();
			} else {
				$("#collapseHistory").slideDown('slow');
				$("#formHistory").show();
				
			}
			/*var historyFlag=$("#historyFlag").val();
			if(historyFlag=='F'){
				
			}
			*/
			/*if( r.lstddHistoryList.length==0){
				$("#formHistory").collpase('hide');
				
			}*/
			

			setAllHistoryMaster(r);
			setAllFamilyHistoryMaster(r);
		}
	});
}


function fetchComplaint() {
	var inputs = [];
	var treatmentId=$("#treatmentId").val();

	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}else {
		if (callfrom == "" || callfrom == undefined) {
			callfrom = 'hometab';
		}
		treatmentId = $("#patientId").val();
	}
	inputs.push('callfrom=' + callfrom);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/dd_complaint_master/fetchComplaint",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			clearComplaint();
			//$("#divEntry3").hide();
			var ccount=$("#complaintcount").val();
			for(var i=1;i<=ccount;i++)
				{
				//$("#0"+i).val("");
				$("#div"+i).remove();
				}
			lengthofComplaint=r.length;
			if (r.length == 0) {
				$("#collapseComplaints").slideUp('fast');
				$("#formComplaints").hide();
			} else {
				$("#collapseComplaints").slideDown('slow');
				$("#formComplaints").show();
			}
			/*if(r.length==0){
				$("#formComplaints").collapse('hide');
			}*/

			setAllComplaintMaster(r);
			
		}
	});
}

function getAllNotesCount(){
	var treatmentId= $("#treatmentId").val();
	var patientId=$("#patientId").val();
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var inputs = [];
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	inputs.push('pid=' +encodeURIComponent(patientId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/notes/getAllNotesCount",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
	
		success : function(r) {
			setAllNotes(r,"All");	

			
			$("#countNotes").text(r.lstnotes.length);
		}
	});
}

function clearComplaint(){
	var countComplaint=0;
	var ccount=$("#complaintcount").val();
	for(var i=1;i<=ccount;i++)
		{
		$("#"+i).val("");
		$("#div"+i).remove();
		}
	$("#div"+countComplaint).remove();
	createNextComplaintInput('0');
}

function clearClinical(){
	var countClinical=0;
	var clicount=$("#clinicalcount").val();
	for(var i=1;i<=clicount;i++)
		{
		$("#divBy1"+i).remove();
		}
	$("#divBy1"+countClinical).remove();
	createNextInputForClinical('0');
}

function clearHistory(){
	var countHistory=0;
	var hcount=$("#historycount").val();
	for(var i=1;i<=hcount;i++)
	{
	$("#documentByName2"+i).remove();
	}
	$("#documentByName2"+countHistory).remove();
	createNextInputForHistory('0');
}

function clearFamilyHistory(){
	var countFamilyHistory=0;
	var fcount=$("#familyhistorycount").val();
	for(var i=1;i<=fcount;i++)
		{
		$("#documentByName3"+i).remove();
		}
	$("#documentByName3"+countFamilyHistory).remove();
	createNextInputForFamilyHistory('0');
}

function viewNotesById(notesId){
	var treatmentId= $("#treatmentId").val();
	var patientId=$("#patientId").val();
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var inputs = [];
	inputs.push('notesId=' + notesId);
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	inputs.push('pid=' +encodeURIComponent(patientId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/notes/viewNotesById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {

			setDataToViewTable(response, "All");
		}
	});
}

function setDataToViewTable(r,CallFrom){
	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstnotes.length; i++) {
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+r.lstnotes[i].date+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstnotes[i].notesData+'</td>'
			+ ' <td class="col-md-1 center"  data-toggle="modal" data-target="#ViewNotesPopDetails" onClick="editNotes('+ r.lstnotes[i].notesId + ');"><button class="btn btn-success btn-xs"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center"  data-toggle="modal" data-target="#Notes_view" onClick="deleteNotes('+ r.lstnotes[i].notesId + ');"><button class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
			
		}
		
	}
	$("#tblviewNotes").html(htm);
}

function emailReportingTestPatient(treatmentId)
{	
		//$("#treatmentId").val(treatmentId);
	   // $("#masterIdd").val(masterIdd);
	   // $("#patientgander1").val(gender);
    	var r = confirm("Are You Sure You Want To Email  ?");
    	if (r == true) {   		
    		$("#emailreportingPopUp").modal('show');  		   		
    	}  	
}

function emailSendingPatinetTest()
{
	//var treatmentId= $("#treatmentId").val();
	//var masterIdd = $("#masterIdd").val();
	//var gender = $("#patientgander1").val();
	
	var emailTo = $("#emailTo").val();
	var emailCC = $("#emailCC").val();
	var massageId = $("#massageId").val();
   /* var printtype="";
	if ($("#withheader").is(":checked")) {
		printtype="withheader";
	}
    if ($("#withoutheader").is(":checked")) {
    	printtype="withoutheader";
    }*/
	jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		//treatmentId : treatmentId,
    		//masterIdd : masterIdd,
    		//gender : gender,
    		emailTo : emailTo,
    		emailCC : emailCC,
    		massageId : massageId,
    		//printtype : printtype
		},
		url : "ehat/email/emailSendingPatinetTest",
        success : function(r) {
        	
        		alertify.success("Email Send Successfully");
    			$("#emailreportingPopUp").modal('hide');
        	
		
        }
    });
}

function followup(treatmentId)
{	
		//$("#treatmentId").val(treatmentId);
	   // $("#masterIdd").val(masterIdd);
	   // $("#patientgander1").val(gender);
    	var r = confirm("Please enter follow up here  ?");
    	if (r == true) {   		
    		$("#followupPopUp").modal('show');  		   		
    	}  	
}

function saveFollowup(){
	var treatmentId= $("#treatmentId").val();
	var patientId = $.trim(($("#patientId").val()));
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var followupdate = $("#ddDateFollwUp").val();
	var followuptime = $("#timeFrom2").val();
	var unitId = $("#unitId").val();
	var followupId= $("#followupId").val();
	var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var day =new Date(followupdate);
	var followupday =weekday[day.getDay()];
	var inputs = [];	
	inputs.push('unitId=' + unitId);
	inputs.push('followupId=' + followupId);
	inputs.push('followupdate='+followupdate);
	inputs.push('followuptime='+followuptime);
	inputs.push('followupday='+followupday);
	inputs.push('patientId='+patientId);
	inputs.push('treatment_id='+treatmentId);
	var str1 = inputs.join('&');
	jQuery.ajax({
		type :"POST",
		url :"ehat/followup/saveFollowup",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Followup Saved successfully");
			getFollowup();
			$("#followupPopUp").modal('hide');  
			}
		 else if(data==2){
			 alertify.success("Followup Updated successfully");
			 
			}
		 else if(data==3){
			 alertify.success("Followup already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			refreshFollowup();
		},		
	})
}

function refreshFollowup(){
	$("#followupId").val('0');
	$("#followupdate").val("");
	$("#followuptime").val("");
}

function getFollowup(){
	var treatmentId= $("#treatmentId").val();
	var patientId=$("#patientId").val();
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var inputs = [];
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	inputs.push('pid=' +encodeURIComponent(patientId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/followup/getFollowup",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setfollowup(r,"All");
			
			
		
		}
	});
}

function setfollowup(r,CallFrom){
	if(CallFrom=="All"){
	for(var i=0;i<r.lstFollowUp.length;i++){
		var fdate = GetFormattedDate(new Date(r.lstFollowUp[i].followupdate),"ddmmyyyy");
		$("#followupdate").text(fdate);
		fllowtimw=r.lstFollowUp[i].followuptime;
		var time = fllowtimw.toLowerCase().split(':');
		var hours = parseInt(time[0]);
		var _ampm = time[1];
		var h=hours;
		var dd="AM"
		if(hours>=12){
			 h=hours-12;
			 dd="PM";
		}if (h == 0) {
		    h = 12;
		  }
		  _ampm = _ampm < 10 ? "0" + _ampm : _ampm;
		  var pattern = new RegExp("0?" + hours + ":" + _ampm);
		  var replacement = h + ":" + _ampm;
		  replacement += " " + dd;
		  var follow=(replacement+ ": "+"["+r.lstFollowUp[i].followupday+"]");
		  $("#followupDayTime").text(follow);
	}
	}
}
function centerHistoryAutoSuggestion(inputID) {
	var resultData = [];
	var historyName = $("#" + inputID).val();
	var historyCode = $("#"+inputID).val();
	
	$("#personalhistoryFlag").val("P")
	var inputs = [];
	inputs.push('historyName=' + historyName);
	inputs.push('historyCode=' + historyCode);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/history_master/centerHistoryAutoSuggestion",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.lstHistoryMaster.length; j++) {
				var arrValue = response.lstHistoryMaster[j].historyCode +"-"+response.lstHistoryMaster[j].historyName;
				var idValue = response.lstHistoryMaster[j].historyId;
				var historyName = response.lstHistoryMaster[j].historyName;
				var historyCode = response.lstHistoryMaster[j].historyCode;
				resultData.push({
					ID : idValue,
					Name : historyName,
					Code : historyCode
				});
				template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue +  '</a></li>';
	}

			setTimeout(function() {
				
				$("div#documentByName"+ inputID +" .typeahead").html(template);
				$("div#documentByName"+ inputID +" .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
function displayResult(item) {
		$("#divEntry2").show();
		var count=$("#historycount").val();
		count++;
		$("#historycount").val(count);
		var res = item.text.split('-');
		var historyId = res[0];
		var historyName = res[1];	
		var historyCode = res[2];
		$("#"+ inputID).val(historyName);
		$("#"+ inputID).val(historyCode);
		createNextInputForHistory(count);
		
	}
}



function onCloseBtnRefrshPage() {
	window.location.replace("dd_main_dashboard.jsp");
}
var c_id=1;
function saveComplaintMaster()
{
	var complaintDetails = 0;
	complaintDetails = {
			lstDdComplaintMaster : []
	};
	
	var complaintcount= $("#complaintcount").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	var idcomplaint=$('#idcomplaint').val();
	var complaintCode =$('#complaintCode').val();
	var complaintContent=$('#complaintContent').val();
	var treatmentId="";
	var patientId = $.trim(($("#patientId").val()));
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	//var complaintFlagDelete =$("#complaintFlagDelete").val("delete");
	//var complaintFlagSave =$("#complaintFlagSave").val("save");
	for(var i=0;i <= complaintcount;i++ )
		{
		var complaintid=$("#complaintid"+i).val();
		if(complaintid == null || complaintid == undefined || complaintid == "")
			{
			complaintid=0;
			}
		
		var complaintName=$("#"+i).val();
		//if(complaintFlagDelete =="delete"){
		if(complaintid!=0 && complaintName == "")
		//if(complaintName == null || complaintName == undefined || complaintName == "")
			{
			
			jQuery.ajax({
				type : "POST",
				url : "ehat/dd_complaint_master/deleteDDComplaints",
				data : {
					"complaintid" : complaintid
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					lengthofComplaint=r.length;
					if (r.length == 0) {
						$("#collapseComplaints").slideUp('fast');
						$("#formComplaints").hide();
					} else {
						$("#collapseComplaints").slideDown('slow');
						$("#formComplaints").show();
					}
				}
			});
			}
	//	}
			else if(complaintid==0)
			{
				
				var res= complaintName.split('-');
				if(complaintName==""){
					complaintName="abc";
				}
				else if(res[2] == null || res[2] == undefined || res[2] == "")
				{
					alert("please enter Complaint & Symptoms Days EX: 2Days");
					return false;
				}
			if ((complaintName != undefined) && (complaintName != "undefined") &&(complaintName != "abc")) {
				complaintDetails.lstDdComplaintMaster.push({
					complaintId:complaintid,
					complaintCode:res[0],
					complaintName:res[1],
					complaintContent:res[2],
					userId:userId,
					createdBy:userId,
					unitId:unitId,
					treatment_id :treatmentId,
					patientId:patientId
				});
			}
			
			
		}
		}
	complaintDetails = JSON.stringify(complaintDetails);
	var inputs = [];
	inputs.push('complaintDetails=' + encodeURIComponent(complaintDetails));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/dd_complaint_master/saveComplaint",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Saved Sucessfully");	
				//$("#divEntry3").hide();
				lengthofComplaint=r.length;
				//alert(lengthofComplaint);
				if (r.length == 0) {
					$("#collapseComplaints").slideUp('fast');
					$("#formComplaints").hide();
				} else {
					$("#collapseComplaints").slideDown('slow');
					$("#formComplaints").show();
				}
			}
			else {
				alertify.error("Oops Some Problem Ocured");
			}
			 fetchComplaint();
			//clearComplaint();
		}
	});
}

function previousPatientHeaderListTreatmentWise(){
	var treatmentId= $("#treatmentId").val();
	var patientId=$("#patientId").val();
	var unitId = $("#unitId").val();
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	inputs.push('pid=' +encodeURIComponent(patientId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ddPreviousTreamentDetails/previousPatientHeaderListTreatmentWise",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			getConsultantDrNam(treatmentId);
			//$("#previousapp").text(r.docName);
			var prevdate = new Date(r.createdDateTime).toLocaleString();
			var previousdate=prevdate.split(',');
			var dateprev=GetFormattedDate(new Date(previousdate[0]),"ddmmyyyy").toLocaleString();
			var prevdate1=dateprev+","+previousdate[1];
			$("#previousDOA").text(prevdate1);
			$("#previousTreamentId").text(r.opdipdno);
			var res=prevdate.split(',');
			var timer=res[1].split(':');
			var timer2=timer[0]+":"+timer[1];
			var AmPM=timer[2].split('');
			var timeAMPM=timer2+" "+AmPM[3]+AmPM[4];
			$("#previousAppTime").text(timeAMPM);
			var res1=prevdate.split(',')[0];
			var date = new Date(res1);
			var months=["JAN","FEB","MAR","APR","MAY","JUN","JUL",
						"AUG","SEP","OCT","NOV","DEC"];
			var year=date.getFullYear();
			year=year.toString().substr(2,2);
			var val=months[date.getMonth()]+"'"+year;
			var value=date.getDate();
			$("#printMonth").text(val);
			$("#printDay").text(value);
		}
	});
}

function ongetAccessdropdowndata(){
	getAllOrganMaster();
	getListOfSpecialzationById();
	getoverallAccessTemplateList();
	//getListOfSpecialzation();
	//getAccessTemplateById();

}

function setdataspecalitytoaccessTemp(r){
	var alistaccessTemp="";
	alistaccessTemp = alistaccessTemp
	+ "<option value='0'>SPECIALITY</option>";
for ( var i = 0; i < r.length; i++) {
	alistaccessTemp = alistaccessTemp + "<option value=" + r[i].specialisationId
		+ " data-name='"+ r[i].specializationName+"'>"
		+ r[i].specializationName + "</option>";
}

$("#docspecialityaccessTemplate").html(alistaccessTemp);
$("#docspecialityaccessTemplate").select2();
}

function getAccessAllTemplate(inputID){
	 var resultData = [];
	 var templateName = $("#"+inputID).val();
	 var accesstype = $("input:radio[name=overall]:checked").val();
	 var accessdocspecialityName = $("#docspecialityaccessTemplate").find(':selected').attr('data-name');
	 var accessorgansName = $("#accessTemporgans").find(':selected').attr('data-name');
	 if(accessorgansName=="undefined"||accessorgansName==""||accessorgansName=="NULL"||accessorgansName==null){
		 accessorgansName="NULL";
	 }
	 if (templateName == "" || templateName == null || templateName == "null"	|| templateName == undefined) {

			alert("Please enter search value");
			$("#" + inputID).focus();
			getoverallAccessTemplateList();
			
			return false;
		}
	 var inputs = [];
	 inputs.push('spcName='+accessdocspecialityName);
	 inputs.push('templateName=' + templateName);
	 inputs.push('orgName='+accessorgansName);
	 inputs.push('type='+accesstype);
	var str = inputs.join('&');
	 jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/coversheet/accessTemplateAutoSuggestion",
			cache : false,
			success : function(response) {
				var template = "";
				for ( var j = 0; j < response.length; j++) {
					//if(response[j].favFlag==0){
					var arrValue = response[j].templateName;
					var idValue = response[j].id;
					var templateName = response[j].templateName;
					resultData.push({
						ID : idValue,
						Name : templateName,
						
					});
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue +  '</a></li>';
					
				//}
				}
				setTimeout(function() {
					$("div#accessByName"+ inputID +" .typeahead").html(template);
					$("div#accessByName"+ inputID +" .typeahead").show();

					$("input#" + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("input#" + inputID).data('typeahead').source = resultData;
				}, 500);

			}

		});
	 function displayResult(item) {
			//var id = item.value;
			var res = item.value.split('-');
			var id = res[0];
			$("#all_enteries").val(id);
			getTreatmentType(id);
			
		}
}

function getAccessFavTemplate(inputID){
	 var resultData = [];
	 var templateName = $("#"+inputID).val();
	 var accesstype = $("input:radio[name=overall]:checked").val();
	 var accessdocspecialityName = $("#docspecialityaccessTemplate").find(':selected').attr('data-name');
	 var accessorgansName = $("#accessTemporgans").find(':selected').attr('data-name');
	 if(accessorgansName=="undefined"||accessorgansName==""||accessorgansName=="NULL"||accessorgansName==null){
		 accessorgansName="NULL";
	 }
	 if (templateName == "" || templateName == null || templateName == "null"	|| templateName == undefined) {

			alert("Please enter search value");
			$("#" + inputID).focus();
			getoverallAccessTemplateList();
			
			return false;
		}
	 var inputs = [];
	 inputs.push('spcName='+accessdocspecialityName);
	 inputs.push('templateName=' + templateName);
	 inputs.push('orgName='+accessorgansName);
	 inputs.push('type='+accesstype);
	var str = inputs.join('&');
	 jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/coversheet/getAccessFavTemplate",
			cache : false,
			success : function(response) {
				var template = "";
				for ( var j = 0; j < response.length; j++) {
					var arrValue = response[j].templateName;
					var idValue = response[j].id;
					var templateName = response[j].templateName;
					resultData.push({
						ID : idValue,
						Name : templateName,
						
					});
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue +  '</a></li>';
				}
				setTimeout(function() {
					$("div#accessFavByName"+inputID+" .typeahead").html(template);
					$("div#accessFavByName"+inputID+" .typeahead").show();

					$("input#" + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("input#" + inputID).data('typeahead').source = resultData;
				}, 500);

			}

		});
	 function displayResult(item) {
			//var id = item.value;
			var res = item.value.split('-');
			var favid = res[0];
			$("#fav_enteries").val(favid);
			getTreatmentType(favid);
			
		}
}
function getoverallAccessTemplateList(){
	var accessdocspecialityName = $("#docspecialityaccessTemplate").find(':selected').attr('data-name');
	 var accessorgansName = $("#accessTemporgans").find(':selected').attr('data-name');
	 if(accessorgansName=="undefined"||accessorgansName==""||accessorgansName=="NULL"||accessorgansName==null){
		 accessorgansName="NULL";
	 }
	 var accesstype = $("input:radio[name=overall]:checked").val();
	 
	 var inputs=[];
	 inputs.push('spcName='+accessdocspecialityName);
	 inputs.push('orgName='+accessorgansName);
	 inputs.push('type='+accesstype);
	 var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/getoverallAccessTemplateList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			setdatatooverallaccessTemp(r);
			setdatatofavouriteaccessTemp(r);
			
		}
	});
}


function setdatatooverallaccessTemp(r){
	var overalllistaccessTemp="";
for ( var i = 0; i < r.length; i++) {
	if(r[i].favFlag==0){
	overalllistaccessTemp = overalllistaccessTemp + "<option value=" + r[i].id
		+ " data-name='"+ r[i].templateName+"'>"
		+ r[i].templateName + "</option>";
}
	}
$("#all_enteries").html(overalllistaccessTemp);
}

function setdatatofavouriteaccessTemp(r){
	var favouritelistaccessTemp="";
for ( var i = 0; i < r.length; i++) {
	if(r[i].favFlag==1){
	favouritelistaccessTemp = favouritelistaccessTemp + "<option value=" + r[i].id 
		+ " data-name='"+ r[i].templateName+"'>"
		+ r[i].templateName + "</option>";
}
}

$("#fav_enteries").html(favouritelistaccessTemp);
}


function rightShift(){
	var id=$("#all_enteries").val();
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/rightShift",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			getoverallAccessTemplateList();
		}
	});
	
}

function leftShift(){
	var id=$("#fav_enteries").val();
	var inputs=[];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/leftShift",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			getoverallAccessTemplateList();
		}
	});
}

function getAccessTemplateById(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/getAccessTemplateById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {


		}
	});
}
var a_favflag=0;
var a_tid=0;
var a_type=0;
 function getTreatmentType(id){
	var inputs=[];
	inputs.push('id='+id);
	var str= inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/getTreatmentType",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//for ( var i = 0; i < r.length; i++) {
			//	alert(r[i].favFlag);
				//alert(r[i].treatmentId);
				$("#accesstemplate_type").val(r[0].type);
				a_tid=r[0].treatmentId;
				a_type=r[0].type;
				//a_favflag[0].favFlag;
				$("#accesstemplate_treamentid").val(r[0].treatmentId);
				
				
				
			//}
		}

	});
}
 
function copyAccessTemplate() {
		var inputs = [];
		var callform="";
		var access_type=$("#accesstemplate_type").val();
		var access_tid=$("#accesstemplate_treamentid").val();
		if(a_type==1){
			callform="saveastemplate";
			
		}else{
			callform="prescription";
		}
			var treatmentId = $("#treatmentId").val();
			inputs.push('priviousTretamentId=' + a_tid);
			inputs.push('treatmentId=' + treatmentId);
			inputs.push('callfrom=' + callform);
			

	
		
		var str = inputs.join('&');
		var confirmation = confirm("Do You Want To Copy this Templatet To Current?");
		if (confirmation == true) {
			jQuery.ajax({
				async : false,
				type : "POST",
				url : "ehat/coversheet/copyfromlast",
				data : str + "&reqType=AJAX",
				catche : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					alertify.success(r);
					displayHideDiv("cepisode");
				}
			});
		}
	}
