/************
* @author	: Amol Jadhav
* @date		: 28-05-2021
* @codeFor	: Save Group Master Record
 ************/

function saveGroupMaster() {
	var idgroup = $("#groupId").val();
	var groupName = $("#groupName").val().trim();
	var groupCode = $("#groupCode").val().trim();

	if (groupName == "" || groupName.length == 0 || groupName == null) {
		alert("Please Enter Group Name.");
		SetFocus("groupName");
		$("#groupName").val("");
	} else if (groupCode == "" || groupCode.length == 0 || groupCode == null) {
		alert("Please Enter Group Code.");
		SetFocus("groupCode");
		$("#groupCode").val("");
	} else {

		var inputs = [];
		inputs.push('idgroupMaster=' + idgroup);
		inputs.push('groupCode=' + encodeURIComponent(groupCode));
		inputs.push('groupName=' + encodeURIComponent(groupName));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/groupmastermethod/savegroupmasterrecord",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				resetGroupMethodFrom();
				ViewGroupMasterList("onload");
			}
		});
	}
}
/************
* @author	: Amol Jadhav
* @date		: 28-05-2021
* @codeFor	: Get All Group Master Record.
 ************/
function ViewGroupMasterList(callFrom) {

	var byName = $("#byName").val();
	if (byName == "" && callFrom == "search") {
		alert("Please enter group name for search");
		return false;
	}
	if (byName == " " || byName == null) {
		alert("Please enter valid group name");
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
		url : "ehat/groupmastermethod/getallgroupmaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			resetGroupMethodFrom();
			setGroupMasterTemp(r,'ViewGroupMasterList');
		}
	});
}
/************
* @author	: Amol Jadhav
* @date		: 28-05-2021
* @codeFor	: Set Group Master Temp...
 ************/
function setGroupMasterTemp(response, callFrom) {
	
	var divContent="";
	if(callFrom == 'autoSearch'){
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.idgroupMaster+"</td>"
		+ "<td class='col-md-1 center'>"+response.groupName+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editTestMethod("+response.idgroupMaster+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteTestMethod("+response.idgroupMaster+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}else if(response.groupmasterlist.length > 0){
		for(var i = 0; i < response.groupmasterlist.length; i++){
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.groupmasterlist[i].idgroupMaster+"</td>"
			+ "<td class='col-md-1 center'>"+response.groupmasterlist[i].groupName+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editGroupMasterDetail("+response.groupmasterlist[i].idgroupMaster+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteGroupMasterRecord("+response.groupmasterlist[i].idgroupMaster+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}else {
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '5'>No record found...</td>"
	}
	$("#groupMasterDetails").html(divContent);
}
/************
* @author	: Amol Jadhav
* @date		: 28-05-2021
* @codeFor	: Edit Group Master Records.
 ************/
function editGroupMasterDetail(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/groupmastermethod/editgroupmasterrecord/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#groupName").val(r.groupName);
			$("#groupCode").val(r.groupCode);
			$("#groupId").val(r.idgroupMaster);
		}
	});
}
/************
* @author	: Amol Jadhav
* @date		: 28-05-2021
* @codeFor	: Delete Group Master Record
 ************/
function deleteGroupMasterRecord(id)
{
	var r = confirm("Are you sure you want to delete Group Master Record.");
	
	
	if(!r){
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/groupmastermethod/deletegroupmasterrecord/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r){
					alert("Group Master Record Deleted.");
				}
				resetGroupMethodFrom();
				ViewGroupMasterList("onload");
			}
		});
	}
}
/************
* @author	: Amol Jadhav
* @date		: 28-05-2021
* @codeFor	: AutoSuggestion for Group Master Record
 ************/
function SearchPathologyOnEnterGroupName(groupNameId, type) {
	var resultData = [];
	var groupName = $("input#" + groupNameId).val();

	if (groupName == "" || groupName == null || groupName == "null"
			|| groupName == undefined) {

		alert("Please enter search value");
		$("input#" + groupNameId).focus();
		return false;
	}
	
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(groupName));
	inputs.push('callFrom=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/groupmastermethod/getallgroupmaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(response) {
			//alert("JSON.stringifyJSON.stringify"+JSON.stringify(response))
			var template = "";
			for ( var j = 0; j < response.groupmasterlist.length; j++) {
				
				var arrValue = response.groupmasterlist[j].idgroupMaster +"-"+response.groupmasterlist[j].groupName;
				var idValue = response.groupmasterlist[j].idgroupMaster;
				var groupName = response.groupmasterlist[j].groupName;
				resultData.push({
					ID : idValue,
					Name : groupName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}		
			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

				$("input#" + groupNameId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + groupNameId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var groupNameId = res[0];
		var groupName = res[1];
		getAllRecordById(groupNameId);
		$("input#" + groupNameId).val(groupName);
	}
}
/************
* @author	: Amol Jadhav
* @date		: 31-05-2021
* @codeFor	: Get Group Name By ID
 ************/
function getAllRecordById(id) {
	alert
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/groupmastermethod/editgroupmasterrecord/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setGroupMasterTemp(response,"autoSearch");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

function resetGroupMethodFrom() {
	$('#byName').val("");
	$('#groupName').val("");
	$('#groupCode').val("");
	$('#groupId').val("0");
}
/************
* @author	: Amol Jadhav
* @date		: 31-05-2021
* @codeFor	: Get Group Name fetching list lab profile..
 ************/

function getAllHeadingListGroupMaster(){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/groupmastermethod/getAllHeadingList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r){
			var dropdownList = "<option value='0'>Select Heading</option>";
			for ( var i = 0; i < r.groupmasterlist.length; i++) {
				
				dropdownList = dropdownList + "<option value="
				+ r.groupmasterlist[i].idgroupMaster + " ' data-name=" + r.groupmasterlist[i].groupName + "'>"
				+  r.groupmasterlist[i].groupName + "</option>";
				
			}
			
			$("#heading1").html(dropdownList);
		}
	});
}
function validateAlphaNumberic(key) {
	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 47 && keycode < 58) || (keycode > 64 && keycode < 91)
			|| (keycode > 96 && keycode < 123) || keycode == 8 || keycode == 9
			|| keycode == 127 || keycode == 13 || keycode == 46
			|| (keycode > 34 && keycode < 41)) {

		return true;
	} else {
		alert("Please Enter Alphabets And Numbers Only!");
		return false;
	}
};
$(document).ready(function(){
    $('[id^=groupName]').keypress(validateAlphaNumberic);
});

