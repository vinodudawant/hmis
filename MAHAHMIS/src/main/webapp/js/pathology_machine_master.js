/* =========== Machine Master =========== */

/*******************************************************************************
 * @author : Kishor Lokhande
 * @date : 04-Feb-2020
 * @codeFor : Save Machine Master
 ******************************************************************************/
function saveMachineName() {
	var idMachine = $("#idMachine").val();
	var machineName = $.trim($("#machineName").val());
	var machineSerialNo = $.trim($("#machineSerialNo").val());
	var departmentId = $("#departmentId").val();
	if (machineName == "") {
		alertify.error("Please Enter Machine Name.");
		SetFocus("machineName");
	} else if (machineSerialNo == "") {
		alertify.error("Please Enter Machine Serial No.");
		SetFocus("machineSerialNo");
	}else if (departmentId == "" || departmentId== 0) {
		alertify.error("Please Select Department Name.");
		SetFocus("departmentId");
	} else {

		var inputs = [];
		inputs.push('machineId=' + idMachine);
		inputs.push('machineName=' + encodeURIComponent(machineName));
		inputs.push('machineSerialNo=' + encodeURIComponent(machineSerialNo));
		inputs.push('departmentId=' + encodeURIComponent(departmentId));
		var str = inputs.join('&');


		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/labMachineMasterController/saveMachineName",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alertify.success(r);
				resetMachineFrom();
				ViewMachineList("onload");
			}
		});
	}
}

function ViewMachineList(callFrom) {

	var byName = $("#byName").val();
	if (byName == "" && callFrom == "search") {
		alertify.error("Please Enter Machine Name for Search");
		return false;
	}
	if (byName == " " || byName == null) {
		alertify.error("Please Enter Machine Name Type Name");
		return false;
	}
	var headingId=0;
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('callFrom=' + callFrom);
	inputs.push('headingId=' + headingId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labMachineMasterController/getallMachines",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#byName').val("");
			setMachineNameTemp(r, 'ViewUnitList');
		}
	});
}

function setMachineNameTemp(response, callFrom) {

	var divContent = "";
	if (callFrom == 'autoSearch') {
		for ( var i = 0; i < response.machineNameList.length; i++) {
		divContent = divContent
				+ "<tr>"
				+ "<td class='col-md-1 center'>"
				+ 1
				+ ".</td>"
				+ "<td id='machineIdTxt"+response.machineNameList[i].machineId+"' class='col-md-1 center'>"
				+ response.machineNameList[0].machineId
				+ "</td>"
				+ "<td id='machineNameTxt"+response.machineNameList[i].machineId+"' class='col-md-1 center'>"
				+ response.machineNameList[0].machineName
				+ "</td>"
				+ "<td id='machineSerialNoTxt"+response.machineNameList[i].machineId+"' class='col-md-1 center'>"
				+ response.machineNameList[0].machineSerialNo
				+ "</td>"
				+ "<td class='col-md-1 center'>"
				+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editMachineName("
				+ response.machineNameList[0].machineId
				+ ")'>"
				+ "<i class='fa fa-edit'></i></button></td>"
				+ "<td class='col-md-1 center'>"
				+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteMachineName("
				+ response.machineNameList[0].machineId + ")'>"
				+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	} else if (response.machineNameList.length > 0) {
		for ( var i = 0; i < response.machineNameList.length; i++) {
			divContent = divContent
					+ "<tr>"
					+ "<td class='col-md-1 center'>"
					+ (i + 1)
					+ ".</td>"
					+ "<td id='machineIdTxt"+response.machineNameList[i].machineId+"' class='col-md-1 center'>"
					+ response.machineNameList[i].machineId
					+ "</td>"
					
					+ "<td id='machineNameTxt"+response.machineNameList[i].machineId+"' class='col-md-1 center'>"
					+ response.machineNameList[i].machineName
					+ "</td>"
					
					+ "<td id='machineSerialNoTxt"+response.machineNameList[i].machineId+"' class='col-md-1 center'>"
					+ response.machineNameList[i].machineSerialNo
					+ "</td>"
					
					+ "<td id='departmentIdTxt"+response.machineNameList[i].machineId+"' class='col-md-1 center' style='display:none'>"
					+ response.machineNameList[i].departmentId
					+ "</td>"
					
					+ "<td class='col-md-1 center' >"
					+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editMachineName("
					+ response.machineNameList[i].machineId
					+ ")'>"
					+ "<i class='fa fa-edit'></i></button></td>"
					
					+ "<td class='col-md-1 center'>"
					+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteMachineName("
					+ response.machineNameList[i].machineId + ")'>"
					+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	} else {
		divContent = divContent
				+ "<tr>"
				+ "<td class='col-md-1 center' colspan = '5'>No record found...</td>";
	}
	$("#machineNameDetails").html(divContent);
}

function editMachineName(id) {

	$("#idMachine").val($("#machineIdTxt"+id).text());
	$("#machineName").val($("#machineNameTxt"+id).text());
	$("#machineSerialNo").val($("#machineSerialNoTxt"+id).text());
	$("#departmentId").val($("#departmentIdTxt"+id).text());
	
	
	/*jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labMachineMasterController/editMachineName/" + id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {

			if (response.machineNameList.length > 0) {
				for ( var i = 0; i < response.machineNameList.length; i++) {
					$("#idMachine").val(response.machineNameList[i].machineId);
					$("#machineName").val(
							response.machineNameList[i].machineName);
					$("#machineSerialNo").val(
							response.machineNameList[i].machineSerialNo);
				}
			}
			//ViewMachineList("onload");
		}

	});*/
}

function deleteMachineName(id) {
	var r = confirm("Are you sure you want to delete Machine.");

	if (!r) {
		return false;
	} else {
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/labMachineMasterController/deleteMachine/" + id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if (r) {
					alertify.error("Machine deleted.");
				}
				ViewMachineList("onload");
			}
		});
	}
}

function unitTypeAutoSuggestion(machineId,type) {
	var resultData = [];
	var machineName = $("input#" + machineId).val();

	if (machineName == "" || machineName == null || machineName == "null"
			|| machineName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + machineId).focus();
		return false;
	}
   var headingId="";
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(machineName));
	inputs.push('callFrom=' + type);
		inputs.push('headingId=' + headingId); // Added By Annapurna
		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labMachineMasterController/getallMachines",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.machineNameList.length; j++) {

				var arrValue = response.machineNameList[j].machineId + "-"
						+ response.machineNameList[j].machineName;
				var idValue = response.machineNameList[j].machineId;
				var unitName = response.machineNameList[j].machineName;
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

				$("input#" + machineId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + machineId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var machineId = res[0];
		var machineName = res[1];
		getAllMachineById(machineId);
		$("input#" + machineId).val(machineName);
	}
}

function getAllMachineById(id) {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labMachineMasterController/editMachineName/" + id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setMachineNameTemp(response, "autoSearch");
			resetMachineFrom();
		}
	});
}

function resetMachineFrom() {
	$("#idMachine").val('0');
	$("#machineName").val('');
	$("#machineSerialNo").val('');
}

/****************************************************************************************************
 * @author Ajay khandare
 * @since 14-04-2020
 * @comment get All Sub-Service(Heading) List
******************************************************************************************************/	
function getAllHeadingList(){
	var pathologyId = $("#pathologyId").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			pathologyId : pathologyId
		},
		url : "ehat/labtest/getAllHeadingList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList = "<option value='0'>Select Heading</option>";
			for ( var i = 0; i < r.lstSubService.length; i++) {
				dropdownList = dropdownList + "<option value="+r.lstSubService[i].subId+">"+r.lstSubService[i].codeName+" - "+r.lstSubService[i].categoryName+"</option>";	
			}	
			$("#departmentId").html(dropdownList);
		}
	});
}
