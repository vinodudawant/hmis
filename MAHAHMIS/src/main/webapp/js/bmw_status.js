function savebmwStatusMaster() {
		
		var statusID = $('#statusID').val();
		if (statusID == "") {
			statusID = 0;
		}
		var statusID = $('#statusID').val();
		var bag_Status = $('#bag_Status').val();

		if (bag_Status == "" || bag_Status == undefined || bag_Status == null) {
			alert("Please enter BMW Status type");
			return false;
		}

		var inputs = [];
		inputs.push('statusID=' + statusID);
		inputs.push('bag_Status=' + bag_Status);
		var str = inputs.join('&');

		jQuery.ajax({
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/bmwStatus/savebmwStatusMaster",
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(data) {
				if (data == 1) {
					alertify.success("BMW_Status Saved Sucessfully");
					getstatustypes();
				} else if (data == 2) {
					alertify.success("BMW_Status Updated Sucessfully");
					getstatustypes();
				} else if (data == 3) {
					alertify.success("BMW_Status already present");
					getstatustypes();
				}
			}
		});
}
	
function getstatustypes() {
		
		var inputs = [];
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/bmwStatus/getstatustypes",
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
				for (var i = 0; i < r.bmwStatusDto.length; i++) {
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.bmwStatusDto[i].bag_Status
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=editBmwStatus('
							+ r.bmwStatusDto[i].statusID
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deleteBmwStatus('
							+ r.bmwStatusDto[i].statusID
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
						+ r.bag_Status
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editBmwStatus('
						+ r.statusID
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteBmwStatus('
						+ r.statusId
						+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				index++;
			}
		}
		$("#statusMasterList").html(htm);

}

function editBmwStatus(statusID) {
	
		var inputs = [];
		inputs.push('statusID=' + statusID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/bmwStatus/editBmwStatus",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				$('#searchId').val('');
				$('#statusID').val(r.statusID);
				$('#bag_Status').val(r.bag_Status);

			}
		});
}

function getStatusMasterList() {

		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/bmwStatus/getStatusMasterList",
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

function deleteBmwStatus(statusID) {

		if (statusID != undefined && statusID != null && statusID != ""
				&& statusID != "null") {
			var r = confirm("Are You Sure You Want To Delete Status Master Details ? ");
			if (r == true) {
				jQuery.ajax({
					type : "POST",
					url : "ehat/bmwStatus/deleteBmwStatus",
					data : {
						"statusID" : statusID
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
	
function clearStatusTypeMaster() {
		
	$('#bag_Status').val('');
		
}
	
