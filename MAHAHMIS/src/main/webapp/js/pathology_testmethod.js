/* =============== Test Method =============== */

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Save Test Method
 ************/
function saveTestMethod() {
	var idmethod = $("#methodId").val();
	var methodName = $("#methodName").val().trim();
	var methodCode = $("#methodCode").val().trim();

	if (methodName == "" || methodName.length == 0 || methodName == null) {
		alert("Please Enter Test Method Name.");
		SetFocus("methodName");
		$("#methodName").val("");
	} else if (methodCode == "" || methodCode.length == 0 || methodCode == null) {
		alert("Please Enter Test Method Code.");
		SetFocus("methodCode");
		$("#methodCode").val("");
	} else {

		var inputs = [];
		inputs.push('idtestMethod=' + idmethod);
		inputs.push('methodCode=' + encodeURIComponent(methodCode));
		inputs.push('methodName=' + encodeURIComponent(methodName));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/labmethod/savetestmethod",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				resetTestMethodFrom();
				ViewTestMethodList("onload");
			}
		});
	}
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Get Test Methods
 ************/
function ViewTestMethodList(callFrom) {

	var byName = $("#byName").val();
	if (byName == "" && callFrom == "search") {
		alert("Please enter test method name for search");
		return false;
	}
	if (byName == " " || byName == null) {
		alert("Please enter valid test method name");
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
		url : "ehat/labmethod/getalltestmethods",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			resetTestMethodFrom();
			setTestMethodTemp(r,'ViewTestMethodList');
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Display Test Method
 ************/
function setTestMethodTemp(response, callFrom) {
	
	var divContent="";
	if(callFrom == 'autoSearch'){
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.idtestMethod+"</td>"
		+ "<td class='col-md-1 center'>"+response.methodName+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editTestMethod("+response.idtestMethod+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteTestMethod("+response.idtestMethod+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}else if(response.testMethodlist.length > 0){
		for(var i = 0; i < response.testMethodlist.length; i++){
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.testMethodlist[i].idtestMethod+"</td>"
			+ "<td class='col-md-1 center'>"+response.testMethodlist[i].methodName+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editTestMethod("+response.testMethodlist[i].idtestMethod+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteTestMethod("+response.testMethodlist[i].idtestMethod+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}else {
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '5'>No record found...</td>"
	}
	$("#testMethodDetails").html(divContent);
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Edit Test Method
 ************/
function editTestMethod(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labmethod/edittestmethod/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#methodName").val(r.methodName);
			$("#methodCode").val(r.methodCode);
			$("#methodId").val(r.idtestMethod);
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Delete Test Method
 ************/
function deleteTestMethod(id)
{
	var r = confirm("Are you sure you want to delete test method.");
	
	if(!r){
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/labmethod/deletetestmethod/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r){
					alert("Test method deleted.");
				}
				resetTestMethodFrom();
				ViewTestMethodList("onload");
			}
		});
	}
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Auto Suggestion For Test Method
 ************/
function SearchPathologyOnEnter(testMethodId, type) {
	var resultData = [];
	var testMethodName = $("input#" + testMethodId).val();

	if (testMethodName == "" || testMethodName == null || testMethodName == "null"
			|| testMethodName == undefined) {

		alert("Please enter search value");
		$("input#" + testMethodId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(testMethodName));
	inputs.push('callFrom=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labmethod/getalltestmethods",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.testMethodlist.length; j++) {

				var arrValue = response.testMethodlist[j].idtestMethod +"-"+response.testMethodlist[j].methodName;
				var idValue = response.testMethodlist[j].idtestMethod;
				var testMethodName = response.testMethodlist[j].methodName;
				resultData.push({
					ID : idValue,
					Name : testMethodName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

				$("input#" + testMethodId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + testMethodId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var testMethodId = res[0];
		var testMethodName = res[1];
		getAllTestMethodsById(testMethodId);
		$("input#" + testMethodId).val(testMethodName);
	}
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Get Test Method By ID
 ************/
function getAllTestMethodsById(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labmethod/edittestmethod/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setTestMethodTemp(response,"autoSearch");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Refresh Test Method Form
 ************/
function resetTestMethodFrom() {
	$('#byName').val("");
	$('#methodName').val("");
	$('#methodCode').val("");
	$('#methodId').val("0");
}
