/* =========== Unit Type =========== */

/************
* @author	: Akshay Mache
* @date		: 16-Jan-2020
* @codeFor	: Save Unit Type
 ************/
function saveUnitType() {
	var idunit = $("#idunit").val();
	var unitname = $.trim($("#unitName").val());
	
	if (unitname == "") {
		alertify.error("Please Enter Unit Type.");
		SetFocus("unitName");
	} else {

		var inputs = [];
		inputs.push('idunitType=' + idunit);
		inputs.push('unitName=' + encodeURIComponent(unitname));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/unittype/saveunittype",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alertify.success(r);
				$("#idunit").val('0');
			//	window.location = "pathology_unittype.jsp";
			}
		});
	}
}

/************
* @author	: Akshay Mache
* @date		: 16-Jan-2020
* @codeFor	: Get Unit Type
 ************/
function ViewUnitList(callFrom) {

	var byName = $("#byName").val();
	if (byName == "" && callFrom == "search") {
		alertify.error("Please Enter Unit Type Name for Search");
		return false;
	}
	if (byName == " " || byName == null) {
		alertify.error("Please Enter Valid Unit Type Name");
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
		url : "ehat/unittype/getallunittypes",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#byName').val("");
			setUnitTypeTemp(r,'ViewUnitList');
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 16-Jan-2020
* @codeFor	: Display Unit Type
 ************/
function setUnitTypeTemp(response, callFrom) {
	
	var divContent="";
	if(callFrom == 'autoSearch')
	{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.idunitType+"</td>"
		+ "<td class='col-md-1 center'>"+response.unitName+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editUnitType("+response.idunitType+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteUnitType("+response.idunitType+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}
	else if(response.unitTypeList.length > 0)
	{
		for(var i = 0; i < response.unitTypeList.length; i++)
		{
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.unitTypeList[i].idunitType+"</td>"
			+ "<td class='col-md-1 center'>"+response.unitTypeList[i].unitName+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editUnitType("+response.unitTypeList[i].idunitType+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteUnitType("+response.unitTypeList[i].idunitType+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}
	else
	{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '5'>No record found...</td>";
	}
	$("#unitTypeDetails").html(divContent);
}

/************
* @author	: Akshay Mache
* @date		: 16-Jan-2020
* @codeFor	: Edit Unit Type
 ************/
function editUnitType(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/unittype/editunittype/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#unitName").val(r.unitName);
			$("#idunit").val(r.idunitType);
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 16-Jan-2020
* @codeFor	: Delete Unit Type
 ************/
function deleteUnitType(id)
{
	var r = confirm("Are you sure you want to delete unit.");
	
	if(!r)
	{
		return false;
	}
	else
	{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/unittype/deleteunittype/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r)
				{
					alertify.error("Unit deleted.");
				}
				window.location = "pathology_unittype.jsp";
			}
		});
	}
}

/************
* @author	: Akshay Mache
* @date		: 16-Jan-2020
* @codeFor	: Auto Suggestion For Unit Type
 ************/
function unitTypeAutoSuggestion(unitId, type) {
	var resultData = [];
	var unitName = $("input#" + unitId).val();

	if (unitName == "" || unitName == null || unitName == "null"
			|| unitName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + unitId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(unitName));
	inputs.push('callFrom=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/unittype/getallunittypes",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.unitTypeList.length; j++) {

				var arrValue = response.unitTypeList[j].idunitType +"-"+response.unitTypeList[j].unitName;
				var idValue = response.unitTypeList[j].idunitType;
				var unitName = response.unitTypeList[j].unitName;
				resultData.push({
					ID : idValue,
					Name : unitName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

				$("input#" + unitId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + unitId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var unitId = res[0];
		var unitName = res[1];
		getAllUnitsById(unitId);
		$("input#" + unitId).val(unitName);
	}
}

/************
* @author	: Akshay Mache
* @date		: 16-Jan-2020
* @codeFor	: Get Unit Type By ID
 ************/
function getAllUnitsById(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/unittype/editunittype/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setUnitTypeTemp(response,"autoSearch");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 16-Jan-2020
* @codeFor	: Refresh Unit Type Form
 ************/
function resetUnitTypeFrom()
{
	$('#byName').val("");
	$('#unitName').val("");
	$('#idunit').val("0");
}
