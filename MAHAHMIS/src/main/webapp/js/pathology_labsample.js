/* =============== Test Sample =============== */

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Save Test Sample
 ************/
function saveTestSample() {
	var sampleId = $("#sampleId").val();
	var sampleName = $("#sampleName").val().trim();

	if (sampleName == ' ' || sampleName == null || sampleName.length == 0) {
		alert("Please Enter test sample name.");
		SetFocus("sampleName");
		$("#sampleName").val("");

	} else {
		var inputs = [];
		inputs.push('idTestSample=' + sampleId);
		inputs.push('sampleName=' + encodeURIComponent(sampleName));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/testsample/savetestsample",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				resetTestSampleFrom();
				ViewTestSampleList("onload");
			}
		});
	}
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Get Test Sample
 ************/
function ViewTestSampleList(callFrom) {

	var byName = $("#byName").val();
	if (byName == "" && callFrom == "search") {
		alert("Please enter test sample for search");
		return false;
	}
	if (byName == " " || byName == null) {
		alert("Please enter valid test sample");
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/testsample/getalltestsamples",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			resetTestSampleFrom();
			setTestSampleTemp(r,'ViewTestMethodList');
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Display Test Sample
 ************/
function setTestSampleTemp(response, callFrom) {
	
	var divContent="";
	if(callFrom == 'autoSearch'){
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.idTestSample+"</td>"
		+ "<td class='col-md-1 center'>"+response.sampleName+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editTestSample("+response.idTestSample+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteTestSample("+response.idTestSample+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}else if(response.testSamplelist.length > 0){
		for(var i = 0; i < response.testSamplelist.length; i++){
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.testSamplelist[i].idTestSample+"</td>"
			+ "<td class='col-md-1 center'>"+response.testSamplelist[i].sampleName+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editTestSample("+response.testSamplelist[i].idTestSample+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteTestSample("+response.testSamplelist[i].idTestSample+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}else {
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '5'>No record found...</td>"
	}
	$("#TestSampleList").html(divContent);
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Edit Test Sample
 ************/
function editTestSample(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/testsample/edittestsample/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#sampleName").val(r.sampleName);
			$("#sampleId").val(r.idTestSample);
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Delete Test Sample
 ************/
function deleteTestSample(id)
{
	var r = confirm("Are you sure you want to delete test sample.");
	
	if(!r){
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/testsample/deletetestsample/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r){
					alert("Test sample deleted.");
				}
				resetTestSampleFrom();
				ViewTestSampleList("onload");
			}
		});
	}
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Auto Suggestion For Test Sample
 ************/
function labOrganAutoSuggestion(testSampleId, type) {
	var resultData = [];
	var testSample = $("input#" + testSampleId).val();

	if (testSample == "" || testSample == null || testSample == "null" || testSample == undefined) {
		alert("Please enter search value");
		$("input#" + testSampleId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(testSample));
	inputs.push('callFrom=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/testsample/getalltestsamples",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.testSamplelist.length; j++) {

				var arrValue = response.testSamplelist[j].idTestSample +"-"+response.testSamplelist[j].sampleName;
				var idValue = response.testSamplelist[j].idTestSample;
				var testSample = response.testSamplelist[j].sampleName;
				resultData.push({
					ID : idValue,
					Name : testSample
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

				$("input#" + testSampleId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + testSampleId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var testSampleId = res[0];
		var testSampleName = res[1];
		getAllTestSamplesById(testSampleId);
		$("input#" + testSampleId).val(testSampleName);
	}
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Get Test Sample By ID
 ************/
function getAllTestSamplesById(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/testsample/edittestsample/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setTestSampleTemp(response,"autoSearch");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Refresh Test Sample Form
 ************/
function resetTestSampleFrom() {
	$('#byName').val("");
	$('#sampleName').val("");
	$('#sampleId').val("0");
}