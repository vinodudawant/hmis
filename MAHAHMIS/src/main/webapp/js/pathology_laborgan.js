/* =========== Lab Organ =========== */
/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: Save Lab Organs
 ************/
function saveLabOrgans() {
	var labOrganName = $.trim($("#headNm").val());
	var labOrganId = $.trim($("#idHed").val());

	if (labOrganName == "" || labOrganName == undefined) {
		alertify.error("Please Enter Lab Organ Name!");
		SetFocus("headNm");
		return false;
	}

	var inputs = [];
	inputs.push('organName=' + encodeURIComponent(labOrganName));
	inputs.push('idlabOrgans=' + labOrganId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/laborgan/savelaborgan",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			resetLabOrganFrom();
			getLabOrgans("onload");
			alertify.success(r);
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: get Lab Organs
 ************/
function getLabOrgans(type) {

	var byName = $.trim($("#byName").val());
	if (byName == "" && type == "searchBtn") {
		alert("Please enter lab organ name to search");
		return false;
	}
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('type=' + type);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laborgan/getlaborgans",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$('#byName').val("");
			setLabOrgansTemp(r,'getLabOrgan');
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: Display Lab Organs
 ************/
function setLabOrgansTemp(response, callFrom){
	var divContent="";
	if(callFrom == 'autoSearch'){
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.idlabOrgans+"</td>"
		+ "<td class='col-md-1 center'>"+response.organName+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editLabOrgan("+response.idlabOrgans+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteLabOrgan("+response.idlabOrgans+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}else if(response.labOrgansList.length > 0){
		for(var i = 0; i < response.labOrgansList.length; i++){
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.labOrgansList[i].idlabOrgans+"</td>"
			+ "<td class='col-md-1 center'>"+response.labOrgansList[i].organName+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editLabOrgan("+response.labOrgansList[i].idlabOrgans+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteLabOrgan("+response.labOrgansList[i].idlabOrgans+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}else{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '5'>No records found...</td>"
	}
	$("#labOrganDetails").html(divContent);
}

/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: Edit Lab Organs
 ************/
function editLabOrgan(id){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/laborgan/getlaborganbyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#headNm").val(r.organName);
			$("#idHed").val(r.idlabOrgans);
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: Delete Lab Organs
 ************/
function deleteLabOrgan(id){
	var r = confirm("Are you sure you want to delete lab organ.");
	
	if(!r){
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/laborgan/deletelaborgan/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r){
					alertify.error("Lab organ deleted.");
				}
				resetLabOrganFrom();
				getLabOrgans("onload");
			}
		});
	}
}

/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: Auto-Suggestion for Lab Organs
 ************/
function labOrganAutoSuggestion(labOrganId, type) {
	var resultData = [];
	var labOrganName = $("input#" + labOrganId).val();

	if (labOrganName == "" || labOrganName == null || labOrganName == "null"
			|| labOrganName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + labOrganId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(labOrganName));
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/laborgan/getlaborgans",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.labOrgansList.length; j++) {

				var arrValue = response.labOrgansList[j].idlabOrgans +"-"+response.labOrgansList[j].organName;
				var idValue = response.labOrgansList[j].idlabOrgans;
				var organName = response.labOrgansList[j].organName;
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

				$("input#" + labOrganId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + labOrganId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var organid = res[0];
		var organName = res[1];
		getAllLabOrganById(organid);
		$("input#" + labOrganId).val(organName);
	}
}

/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: Get Lab Organ By ID.
 ************/
function getAllLabOrganById(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/laborgan/getlaborganbyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setLabOrgansTemp(response,"autoSearch");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 15-Jan-2020
* @codeFor	: Refresh Lab Organ Form
 ************/
function resetLabOrganFrom(){
	$('#byName').val("");
	$("#headNm").val("");
	$("#idHed").val("0");
}
