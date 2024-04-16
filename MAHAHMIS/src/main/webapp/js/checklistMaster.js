function saveChecklist() {
	
	var checklistId = $('#checklistId').val();
	if (checklistId == "") {
		checklistId = 0;
	}
	var checklistId = $('#checklistId').val();
	var checklistType = $('#checklistType').val();

	if (checklistType == "" || checklistType == undefined || checklistType == null) {
		alert("Please enter Checklist Master type");
		return false;
	}
	
	var inputs = [];
	inputs.push('checklistId=' + checklistId);
	inputs.push('checklistType=' + checklistType);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/checklistMaster/saveChecklist",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Checklist_Maaster Saved Sucessfully");
				getAllChecklistMaster();
			} else if (data == 2) {
				alertify.success("Checklist_Maaster Updated Sucessfully");
				getAllChecklistMaster();
			} else if (data == 3) {
				alertify.success("Checklist_Maaster already present");
				getAllChecklistMaster();
			}
		}
	});
}

function getAllChecklistMaster() {

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/checklistMaster/getAllChecklistMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			setAllChecklistMaster(r, "All");
		}
	});
}

function setAllChecklistMaster(r, CallFrom) {

	var htm = "";
	var index = 1;
	if (r != "" && r != undefined) {
		if (CallFrom == "All") {
			for (var i = 0; i < r.listChecklistMasterDto.length; i++) {
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listChecklistMasterDto[i].checklistType
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editChecklistMaster('
						+ r.listChecklistMasterDto[i].checklistId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteChecklistMaster('
						+ r.listChecklistMasterDto[i].checklistId
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				index++;
			};
		} else if (CallFrom == "search") {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.checklistType
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editChecklistMaster('
					+ r.checklistId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteChecklistMaster('
					+ r.checklistId
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			index++;
		}
	}
	$("#checklistMaster").html(htm);

}

function editChecklistMaster(checklistId) {
	
	var inputs = [];
	inputs.push('checklistId=' + checklistId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/checklistMaster/editChecklistMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#searchId').val('');
			$('#checklistId').val(r.checklistId);
			$('#checklistType').val(r.checklistType);

		}
	});
}

function getChecklistMaster() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/checklistMaster/getChecklistMaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setChecklistMaster(r);
		},
	});
}

function deleteChecklistMaster(checklistId) {

	if (checklistId != undefined && checklistId != null && checklistId != ""
			&& checklistId != "null") {
		var r = confirm("Are You Sure You Want To Delete Checklist Master Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/checklistMaster/deleteChecklistMaster",
				data : {
					"checklist_Id" : checklistId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllChecklistMaster();
				}
			});
		}
	}

}

function clearChecklistMasterDetails() {
	$('#checklistId').val('');
	$('#checklistType').val('');
	
}