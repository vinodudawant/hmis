function saveStatus() {

	var statusId = $('#statusId').val();
	if (statusId == "") {
		statusId = 0;
	}
	var statusId = $('#statusId').val();
	var statusType = $('#statusType').val();

	if (statusType == "" || statusType == undefined || statusType == null) {
		alert("Please enter Status Master type");
		return false;
	}

	var inputs = [];
	inputs.push('statusId=' + statusId);
	inputs.push('statusType=' + statusType);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/statusMaster/saveStatus",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			
			if (data == 1) {
				alertify.success("Status_Maaster Saved Sucessfully");
				getAllStatusMaster();
			} else if (data == 2) {
				alertify.success("Status_Maaster Updated Sucessfully");
				getAllStatusMaster();
			} else if (data == 3) {
				alertify.success("Status_Maaster already present");
				getAllStatusMaster();

			}
		}
	});
}

function getAllStatusMaster() {

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/statusMaster/getAllStatusMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			setAllStatusMaster(r, "All");
		}
	});
}

function setAllStatusMaster(r, CallFrom) {

	var htm = "";
	var index = 1;
	if (r != "" && r != undefined) {
		if (CallFrom == "All") {
			for (var i = 0; i < r.listStatusMasterDto.length; i++) {
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listStatusMasterDto[i].statusType
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editStatusMaster('
						+ r.listStatusMasterDto[i].statusId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteStatusMaster('
						+ r.listStatusMasterDto[i].statusId
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				index++;
			}
			;
		} else if (CallFrom == "search") {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.statusType
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editStatusMaster('
					+ r.statusId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteStatusMaster('
					+ r.statusId
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			index++;
		}
	}
	$("#statusMasterList").html(htm);
}

function editStatusMaster(statusId) {
	
	var inputs = [];
	inputs.push('statusId=' + statusId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/statusMaster/editStatusMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#searchId').val('');
			$('#statusId').val(r.statusId);
			$('#statusType').val(r.statusType);

		}
	});
}

function getStatusMasterList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/statusMaster/getStatusMasterList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setStatusMasterList(r);
		},
	});
}

function deleteStatusMaster(statusId) {

	if (statusId != undefined && statusId != null && statusId != ""
			&& statusId != "null") {
		var r = confirm("Are You Sure You Want To Delete Status Master Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/statusMaster/deleteStatusMaster",
				data : {
					"status_Id" : statusId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllStatusMaster();
				}
			});
		}
	}
}

function clearStatusMasterDetails() {
	
	$('#statusId').val('');
	$('#statusType').val('');
}