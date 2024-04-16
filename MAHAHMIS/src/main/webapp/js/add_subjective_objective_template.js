/************
* @author	:Rohini Ambhore
* @date		: O9-Dec-2021
***************/

function toggleEntryDivForSubjectiveTemp(){
	
	$("#divForSubjectiveObjectiveTemp").toggle('slow');
}

/************
* @author	:Rohini Ambhore
* @date		: O9-Dec-2021
* @codeFor	: Save Subjective Objective Template master
 **************/

function saveSubjectiveObj(){
	
	var subObjTempId = $("#subObjTempId").val();	
	var subTempName = $("#subTempName").val();
	var subBodyPart = $("#subBodyPart").val();
	var subSpeciality = $("#subSpeciality").val();
	var subTemplateType = $("#subTemplateType").val();
	
	//var subTemplateType_Name = $("#subTemplateType option:selected").text(); 
	
	

	if(subTempName =="" ||  subTempName == undefined || subTempName == null){
		
		$("#subTempName").focus();
		return false; 
	}
	else if(subBodyPart=="" || subBodyPart==undefined || subBodyPart== null)
	{
		$("#subBodyPart").focus();
		return false;
	}
	else if(subSpeciality=="" || subSpeciality==undefined || subSpeciality==null)
	{
		$("#subSpeciality").focus();
		return false;
	}
	
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	
	var inputs = [];

	inputs.push('subObjTempId=' + subObjTempId);
	inputs.push('subTempName=' + subTempName);
	inputs.push('subBodyPart=' + subBodyPart);
	
	inputs.push('subSpeciality=' + subSpeciality);
	inputs.push('subTemplateType=' + subTemplateType);
	
	inputs.push('userId=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('createdBy=' + userId);
	
	inputs.push('updatedBy=' + userId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subjectiveObject/saveSubjectiveObj",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error...');
		},
		success : function(r) {
			alert((r));
			
			alertify.success(r);
			
			
			}
	});

    refreshSubObjective();
	getAllSubObjective();
}

/************
* @author	:Rohini Ambhore
* @date		: O9-Dec-2021
* @codeFor	: Refresh Subjective Objective Template master
 **************/

function refreshSubObjective(){

	        $('#subTempName').val("");
			/*$('#subBodyPart').val("");
			$('#subSpeciality').val("");
			$('#subTemplateType').val("");*/
			
			$('#subBodyPart').html('<option value="0">SELECT</option>');
			$('#subSpeciality').html('<option value="0">SELECT</option>');
			$('#subTemplateType').html('<option value="0">SELECT</option>');
	
}

/************
* @author	:Rohini Ambhore
* @date		: O9-Dec-2021
* @codeFor	: To Get List Of Subjective Objective Template master
 **************/

function getAllSubObjective()
{
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subjectiveObject/getAllSubObjective",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllSubObjectiveMasterTemp(r,"All");		
			/*var subObjListTemp = "";
			subObjListTemp = subObjListTemp + "<option value='0'>--Select Organ--</option>";
			for ( var i = 0; i < r.lstSubjectiveObjectiveTempDto.length; i++) {
				subObjListTemp = subObjListTemp + "<option value=" +r.lstSubjectiveObjectiveTempDto[i].subObjTempId + " data-name="+r.lstSubjectiveObjectiveTempDto[i].subTempName+">"
					+ r.lstSubjectiveObjectiveTempDto[i].subTempName + "</option>";
			}
			
			$("#bodyPart").html(subObjListTemp);*/
			
			//setdatatocepTemp(r);
			//setdatatoaccessTemp(r);
		}
	});
	
}


/************
* @author	:Rohini Ambhore
* @date		: O9-Dec-2021
* @codeFor	: To set List Of Subjective Objective Template master
 **************/

function setAllSubObjectiveMasterTemp(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstSubjectiveObjectiveTempDto.length; i++) {	
			
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstSubjectiveObjectiveTempDto[i].subObjTempId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstSubjectiveObjectiveTempDto[i].subTempName+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstSubjectiveObjectiveTempDto[i].subBodyPart+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstSubjectiveObjectiveTempDto[i].subSpeciality+'</td>'	
		//	+ ' <td class="col-md-1 center">'+r.lstSubjectiveObjectiveTempDto[i].subTemplateType+'</td>'	
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editSubObjMaster('+r.lstSubjectiveObjectiveTempDto[i].subObjTempId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger editUserAccess" onclick=deleteSubObjMaster('+r.lstSubjectiveObjectiveTempDto[i].subObjTempId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.subObjTempId+'</td>'
			+ ' <td class="col-md-1 center">'+r.subTempName+'</td>'
			+ ' <td class="col-md-1 center">'+r.subBodyPart+'</td>'
			+ ' <td class="col-md-1 center">'+r.subSpeciality+'</td>'	
			//+ ' <td class="col-md-1 center">'+r.lstSubjectiveObjectiveTempDto[i].subTemplateType+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editSubObjMaster('+r.subObjTempId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger editUserAccess" onclick=deleteSubObjMaster('+r.subObjTempId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#subObjMasterDetails").html(htm);
	
}


/************
* @author	: Rohini Ambhore 
* @date		: O9-Dec-2021
* @codeFor	: Edit Subjective Objective Template master
 ************/
function editSubObjMaster(subObjTempId){
	
	var inputs = [];
	inputs.push('subObjTempId=' + subObjTempId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subjectiveObject/editSubObjMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {		
			
			$("#divForSubjectiveObjectiveTemp").show('slow');
			$('#searchId').val('');
			
			$('#subObjTempId').val(r.subObjTempId);	
			$('#subTempName').val(r.subTempName);	
			$('#subBodyPart').val(r.subBodyPart);	
			$('#subSpeciality').val(r.subSpeciality);	
			$('#subTemplateType').val(r.subTemplateType);	
		}
	});
}



/************
* @author	: Rohini Ambhore 
* @date		: O9-Dec-2021
* @codeFor	: Delete Subjective Objective Template master
 ************/

function deleteSubObjMaster(subObjTempId) {
	var r = confirm("Are You Sure You Want To Delete Subjective Objective Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subjectiveObject/deleteSubObjMaster",
			data : {
				"subObjTempId" : subObjTempId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				alertify.error(response);
				
				refreshSubObjective();
				getAllSubObjective();
			}
		});
	}
}


/************
* @author	: Rohini Ambhore 
* @date		: 10-Dec-2021
* @codeFor	: auttosuggestion for Subjective Objective Teplate Master
 ************/


function subjectiveObjAutoSuggestion(inputID) {
	
	var resultData = [];
	var SubTempName = $("#" + inputID).val();

	if (SubTempName == "" || SubTempName == null || SubTempName == "null"	|| SubTempName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllSubObjective();
		return false;
	}

	var inputs = [];
	inputs.push('SubTempName=' + SubTempName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subjectiveObject/subjectiveObjAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstSubjectiveObjectiveTempDto.length; j++) {
				 
				var arrValue = response.lstSubjectiveObjectiveTempDto[j].subObjTempId +"-"+response.lstSubjectiveObjectiveTempDto[j].subTempName;
			
				var idValue = response.lstSubjectiveObjectiveTempDto[j].subObjTempId;
				var subObjName = response.lstSubjectiveObjectiveTempDto[j].subTempName;
				
				resultData.push({
					ID : idValue,
					Name : subObjName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
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
		
		var res = item.text.split('-');
		var subObjTempId = res[0];
		var subObjName = res[1];	
				
		getSubObjMasterBysubObjTempId(subObjTempId);
		$("input#" + inputID).val(subTempName);
	}

}



/************
* @author	: Rohini Ambhore 
* @date		: 10-Dec-2021
* @codeFor	:  get getSubObjMaster Detail BysubObjTempId 
 ************/
function getSubObjMasterBysubObjTempId(subObjTempId){
	
	var inputs = [];
	inputs.push('subObjTempId=' + subObjTempId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subjectiveObject/editSubObjMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllSubObjectiveMasterTemp(r,"search");
			
		}
		
	});

}
	

/************
* @author	: Rohini Ambhore
* @date		: 10-Dec-2021
* @codeFor	:  get centersubjectiveObjMasterSearchById 
 ************/
function centersubjectiveObjMasterSearchById(){
	
	var subObjTempId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(subObjTempId)) {
		alert("Please Enter Number Only!");
		$("#subObjTempId").focus();
		return false;
	}
	getSubObjMasterBysubObjTempId(subObjTempId);	
}	
	
	
	
/************
* @author	: Rohini Ambhore 
* @date		: 10-Dec-2021
* @codeFor	:  get SubjectiveTypeMaster Details List 
 ************/

function fetchSubjectiveTypeMaster() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/subjectiveObject/fetchSubjectiveTypeMaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setSubjectiveTypeMaster(r);
		}
	});
}
function setSubjectiveTypeMaster(r) {
	
	var list = "";
	list = list
			+ "<select name=''  class='col-md-12' ><option value='0'>--Select--</option>";
	for (var i = 0; i < r.lstSubjectiveMaster.length; i++) {

		list = list + '<option  value="'
				+ (r.lstSubjectiveMaster[i].subjectiveId) + '" data-name="'
				+ r.lstSubjectiveMaster[i].subjectiveObjectivetempType + '" >'
				+ (r.lstSubjectiveMaster[i].subjectiveObjectivetempType) + '</option>';
	}
	
	$("#subTemplateType").html(list);
}

/**
 * @Author_aniket kanse
 * @since 30 DEC 21 
 * @for get all body parts from Organ Master
 */
function getAllBodyParts(){
	
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/subjectiveObject/getBodyParts",
			 timeout : 1000 * 60 * 5, 
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				setBodyPartsList(r);
			},
		});
	}

	function setBodyPartsList(r){
		
		var list = "";  
		list = list + "<option value='0'> - Select Body Part - </option>";
		
	    for ( var i = 0; i < r.lstOrganMaster.length; i++) {  

	        list = list + "<option value='"+r.lstOrganMaster[i].organId+"' class='un'>" + (r.lstOrganMaster[i].organName) + "</option>";    
	    }  
	//    list = list + "<option value='-1' class='un'></option>";  
	    $("#subBodyPart").html(list);
}
	
	/**
	 * @Author_aniket kanse
	 * @since 30 DEC 21
	 * @For get all specialities from Hospital Information 
	 */
	function getAllSpeciality(){
		
			jQuery.ajax({
				async : true,
				type : "GET",
				url : "ehat/subjectiveObject/getAllSpeciality",
				 timeout : 1000 * 60 * 5, 
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					
				//	alert(JSON.stringify(r));
					
					setAllSpeciality(r);
					
				},
			});
		}

		function setAllSpeciality(r){
			
			var list = "";  
			list = list + "<option value='0'> --Select Speciality-- </option>";
			
		    for ( var i = 0; i < r.hospitalspclgetlist.length; i++) {  

		        list = list + "<option value='"+r.hospitalspclgetlist[i].specialisationId+"' class='un'>" + (r.hospitalspclgetlist[i].specializationName) + "</option>";    
		    }  
		//    list = list + "<option value='-1' class='un'></option>";  
		    $("#subSpeciality").html(list);
	}	


