/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: get Lab Organs
 ************/
function getLabProfiles(type) {
	var byName = $.trim($("#byName").val());

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('type=' + type);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labprofile/getlabprofiles",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$('#byName').val("");
			setLabProfilesTemp(r, "onLoad");
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: Display Lab Organs
 ************/
function setLabProfilesTemp(response, callFrom){
	var divContent="";
	if(callFrom == "autoSearch"){
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.idprofile+"</td>"
		+ "<td class='col-md-1 center'>"+response.profileName+"</td>"
		+ "<td class='col-md-1 center'>"+response.profileCode+"</td>"
		+ "<td class='col-md-1 center'>"+response.labProfileTestCompDTO.length+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button class='fa fa-eye btn-success' onclick='getLabProfilesTests("+response.idprofile+")'>"
		+ "</button></td></tr>";
	}else if(callFrom == "onLoad"){
		if(response.profileli.length > 0){
			for(var i = 0; i < response.profileli.length; i++){
				divContent=divContent+"<tr>"
				+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
				+ "<td class='col-md-1 center'>"+response.profileli[i].idprofile+"</td>"
				+ "<td class='col-md-1 center'>"+response.profileli[i].profileName+"</td>"
				+ "<td class='col-md-1 center'>"+response.profileli[i].profileCode+"</td>"
				+ "<td class='col-md-1 center'>"+response.profileli[i].labProfileTestCompDTO.length+"</td>"
				+ "<td class='col-md-1 center'>"
				+ "<button class='fa fa-eye btn-success' onclick='getLabProfilesTests("+response.profileli[i].idprofile+")'>"
				+ "</button></td></tr>";
			}
		}else{
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center' colspan = '5'>No records found...</td>"
		}
	}
	$("#labProfileDetails").html(divContent);
}


/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: Auto-Suggestion for Lab Organs
 ************/
function labProfileAutoSuggestion(labProfileId, type) {
	var resultData = [];
	var labProfileName = $("input#" + labProfileId).val();
	if (labProfileName == "" || labProfileName == null || labProfileName == "null"
			|| labProfileName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + labProfileId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(labProfileName));
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labprofile/getlabprofiles",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.profileli.length; j++) {
				var arrValue = response.profileli[j].idprofile +"-"+response.profileli[j].profileName;
				var idValue = response.profileli[j].idprofile;
				var organName = response.profileli[j].profileName;
				resultData.push({
					ID : idValue,
					Name : organName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + labProfileId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + labProfileId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var profileId = res[0];
		var profileName = res[1];
		getLabProfileById(profileId);
		$("input#" + labProfileId).val(profileName);
	}
}

/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: Get Lab Organ By ID.
 ************/
function getLabProfileById(id) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labprofile/getprofilebyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setLabProfilesTemp(response, "autoSearch");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

function getLabProfilesTests(id){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labprofile/getprofilebyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setLabProfilesTests(response);
			$('#profileId').val(id);
			$('#testCount').val(response.labProfileTestCompDTO.length);
		}
	});
}

function setLabProfilesTests(response){
	var divContent = "";
	var testIds = [];
	if(response.labProfileTestCompDTO.length > 0){
		for(var i = 0; i < response.labProfileTestCompDTO.length; i++){
			var id = response.labProfileTestCompDTO[i].idlabProfileTestComp;
			testIds.push(id);
			
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.labProfileTestCompDTO[i].labTestDTO.testName+"</td>"
			+ "<td class='col-md-1 center'>"+response.labProfileTestCompDTO[i].labTestDTO.testCode+"</td>"
			+ "<td class='col-md-1 center'><input type='text' style='text-align:center;' onkeypress='return validateNumber(event)' id='sequence"+id+"' value="+response.labProfileTestCompDTO[i].sequence+"></td>"
			+ "</tr>";
		}
	}
	$("#testIds").val(JSON.stringify(testIds));
	$("#profileTestsTableBody").html(divContent);
	$("#profileTests").modal('show');
}

function closePopup(){
	$("#profileTests").modal('hide');
}

function saveSequence(){
	var list = [];
	var profileId = $("#profileId").val();
	var data = $("#testIds").val();
	var response = JSON.parse(data)
	
	for(var i = 0; i < response.length; i++){
		var id = response[i];
		var seq = $("#sequence"+id).val();
		list.push(id+"-"+seq);
	}
	var inputs = [];
	inputs.push('list=' + encodeURIComponent(list));
	inputs.push('profileId=' + encodeURIComponent(profileId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labprofile/updateSequence",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			if(r == 1){
				alertify.success("Sequence Updated Successfully.");
			}else{
				alertify.error("Something went wrong.");
			}
			closePopup();
		}
	});
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 3-09-2020
 * @comment To validate number.
 ******************************************************************************/
function validateNumber(evt){
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 32 && (charCode < 48 || charCode > 57)) {
		alert("Enter only numbers");
	    return false;
	}
	return true;
}