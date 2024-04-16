

/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Check uncheck all checkbox in table
 ************/
function toggleEntryDiv(id){
	
	/*$("#"+id).slideToggle('slow', function() {
	});*/
	if(id=="divForEdit"){
		
		$("#divForEntry").show('slow');
	}else{
		
		$("#divForEntry").toggle('slow');
	}	
}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 23-Dec-2019
 * @codeFor : saveEditTest
 ******************************************************************************/
function saveEditTest(){
	
	var id = $("#id").val();
	var groupName = $("#rgname").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	
	if(groupName=="" || groupName==undefined || groupName==null || groupName=="null"  ){
		alert("please enter group name");		
		$("#rgname").focus();					
		return false;
	}	
	
	var inputs = [];
	inputs.push("test_ID=" + id);
	inputs.push("tName=" + groupName);
	inputs.push("createdBy=" + userId);
	inputs.push("unitId=" + unitId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiology/saveradiologytestgroup",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alertify.success("Record saved successfully..!");
			} else if (response == 2) {
				alertify.success("Record Updated successfully..!");
			}else if (response == 3) {
				alertify.error("Group Name is Already Present..!");
			}
			else {
				alertify.error("Network Issue");
			}
			
			defaultViewTest();
			refershRadiologyTestGroup();
			
			
		}
	});

}




/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 16-jan-2020
 * @codeFor : defaultViewTest()
 ******************************************************************************/
function defaultViewTest() {
	
	
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/radiology/getallradiologytestgroup",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
		
			setRadiologyTestGroupTemplate(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 16-jan-2020
 * @codeFor : setRadiologyTestGroupTemplate()
 ******************************************************************************/

function setRadiologyTestGroupTemplate(response) {
	
	
	var htm = "";
	var index = 1;
			
				for ( var i = 0; i < response.testList.length; i++) {
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.testList[i].test_ID
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.testList[i].tName
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editRadiologyTestGroup('
							+ response.testList[i].test_ID
							+ ')><i class="fa fa-edit"></i></button></td>'
							
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteRadiologyTestGroup('
							+ response.testList[i].test_ID
							+ ')><i class="fa fa-trash-o"></i></button></td>'				
								
							+ '</tr>';
					
					index++;
					
				
				
			} 
				$("#radiologyTestGroupBody").html(htm);
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 16-jan-2020
 * @codeFor : editRadiologyTestGroup()
 ******************************************************************************/
function editRadiologyTestGroup(id){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/radiology/editradiologytestgroup",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#id").val(r.test_ID);
			$("#rgname").val(r.tName);
			
				
			
		}
	});
	
	
}


/************
* @author	: Dayanand Khandekar
* @date		: 16-jan-2020
* @codeFor	: deleteRadiologyTestGroup
 ************/

	function  deleteRadiologyTestGroup(id){
	
		var r = confirm("Are You Sure You Want To Delete Mrn Master Detail");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/radiology/deleteradiologytestgroup",
				data : {
					"id" : id
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					
					defaultViewTest();
				}
			});
		}
	}
	




/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 16-jan-2020
 * @codeFor : radiologyTestGroupAutoSuggestion()
 ******************************************************************************/
 
function radiologyTestGroupAutoSuggestion(inputID) {
	var unitId = $("#unitId").val();
	
		var resultData = [];
	var groupName = $("input#" + inputID).val();
	if(groupName == "" || groupName == null || groupName == "null" || groupName == undefined){
		alert("Please enter search value");
		$("input#" + inputID).focus();
		defaultViewTest();
		return false;
	}
	var inputs = [];	
	inputs.push('groupName=' + groupName);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/radiology/radiologytestgroupautosuggestion",
		cache : false,		
		success : function(response) {
			
			var template = "";
			for ( var j = 0; j < response.testList.length; j++){
				
				var arrValue = response.testList[j].test_ID +"-"+response.testList[j].tName;
				var idValue = response.testList[j].test_ID;
				var docName = response.testList[j].tName;
				
				resultData.push({
					ID : idValue,
					Name : docName
				});
				template = template + '<li data-value="' + id
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();
				
				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displaySubInventorySearchResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	//below function to set the search value to search text feild and calling getPackingDetailsById function
	function displaySubInventorySearchResult(item) {
		var res = item.text.split('-');
		var id = res[0];
		var subInventoryName = res[1];
		getRadiologyTestGroupById(id);
		$("#" + inputID).val(subInventoryName);		
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 16-jan-2020
 * @codeFor : refershRadiologyTestGroup()
 ******************************************************************************/
function  refershRadiologyTestGroup(){
	$("#id").val(0);
	 $("#rgname").val("");
	
	
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 16-Jan-2020
* @codeFor	:  getRadiologyTestGroupById 
 ************/
function	getRadiologyTestGroupById(id){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/radiology/editradiologytestgroup",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setRadiologyTestGroupTemplateAfterAuto(r);
			
		}
	});
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 16-Jan-2020
* @codeFor	:  getRadiologyTestGroupByIdOnClick
 ************/
function getRadiologyTestGroupByIdOnClick(){
	var id=$("#invistgroupId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(id)) {
		alert("Please Enter Number Only!");
		$("#invistgroupId").focus();
		return false;
	}
	getRadiologyTestGroupById(id);
}
/************
* @author	: Dayanand Khandekar
* @date		: 16-Jan-2020
* @codeFor	:  setRadiologyTestGroupTemplateAfterAuto
 ************/
function setRadiologyTestGroupTemplateAfterAuto(response) {
	if(response.tName==null||response.tName==""||response.tName=="null"){
		alert("Record Not Found");
		return false;
	}
	
	var htm = "";
	var index = 1;
			
				
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.test_ID
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.tName
							+ '</td>'
							
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editRadiologyTestGroup('
							+ response.test_ID
							+ ')><i class="fa fa-edit"></i></button></td>'
							
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteRadiologyTestGroup('
							+ response.test_ID
							+ ')><i class="fa fa-trash-o"></i></button></td>'				
								
							+ '</tr>';
					
					index++;
					
				
				
		
				$("#radiologyTestGroupBody").html(htm);
}
