function addRouteMaster(id) {
	if (id == "divForEntry") {
		$("#divForEntry").toggle('slow');
	} 
}
function clearRouteMaster() {
	$("#route_id").val("");
	$("#routename").val("");
	$('#preparation').select2('val', "0");
	
	
}
function fetchPreparationMaster() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/doctordeskcontoller/fetchpreparationmaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setPreparationMaster(r);
		}
	});
}
function setPreparationMaster(r) {
	var list = "";
	list = list
			+ "<select name=''  class='col-md-12' ><option value='0'>--Select--</option>";
	for (var i = 0; i < r.listpreparationmaster.length; i++) {

		list = list + '<option  value="'
				+ (r.listpreparationmaster[i].preparationId) + '" data-name="'
				+ r.listpreparationmaster[i].preparationName + '" >'
				+ (r.listpreparationmaster[i].preparationName) + '</option>';
	}
	$("#preparation").html(list);
}
function saveRouteMaster() {
	var route_id = $("#route_id").val();
	if (route_id == null || route_id == undefined || route_id == "") {
		route_id = 0;
	}
	var name = $("#preparation").find(':selected').attr('data-name');
	var preparation = $("#preparation").val();
	// var preparation=$("#preparation").val();
	if (name == null || name == undefined || name == "") {
		alert("Please select Preparation");
		return false;
	}
	var routename = $("#routename").val();
	if (routename == null || routename == undefined || routename == "") {
		alert("Please Enter Route Name");
		return false;
	}
	
	var routeUnicode = $.trim($("#routeUnicode").val());
	if (routeUnicode == null || routeUnicode == undefined || routeUnicode == "") {
		//alert("Please Enter Route Unicode");
		//return false;
	}
	
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();

	var inputs = [];
	inputs.push('route_id=' + route_id);
	inputs.push('preparation_name=' + name);
	inputs.push('preparation_id=' + preparation);
	inputs.push('routename=' + routename);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('routeUnicode='+encodeURIComponent(routeUnicode));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/savesaveroutemaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Saved Sucessfully");

			} else if (r == 2) {
				alertify.success("Update Sucessfully");
			} else if (r == -1) {
				alertify.error("Already Save Route Name.");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			clearFiled();
			fetchRouteMaster();
		}

	});
}
function clearFiled() {
	$("#route_id").val("");
	$('#preparation').select2('val', "0");
	$("#routename").val("");
	$("#routeUnicode").val("");
}
function fetchRouteMaster() {

	var routename = "";

	routename = $("#search_route_name").val();

	var inputs = [];
	inputs.push('routename=' + routename);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/fetchroutemaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setFetchRouteMaster(r);
		
		}
	});
}
function setFetchRouteMaster(r) {
	var htm = "";
	var index = 1;

	for (var i = 0; i < r.listroutemasters.length; i++) {
		htm = htm
				+ '<tr> '
				+ " <td class='col-md-1-1 center'>"
				+ index
				+ '</td>'
				+ "<td class='col-md-5-1 center'>"
				+ r.listroutemasters[i].routename
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ r.listroutemasters[i].preparation_name
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ "<button onclick='editRouteMaster("
				+ r.listroutemasters[i].route_id
				+ ");'type='button' class='btn btn-xs btn-success editUserAccess'><i class='fa fa-edit'></i></button>"
				+ "</td>"
				+ " <td class='col-md-2-1 center'>"
				+ "<button onclick='deleteRouteMaster("
				+ r.listroutemasters[i].route_id
				+ ");'type='button' class='btn btn-xs btn-danger deleteUserAccess'><i class='fa fa-trash-o'></i></button>"
				+ "</td>" + '</tr>';
		index++;
	}
	$("#setfetchroutemastetable").html(htm);
}
function editRouteMaster(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/editroutemaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#divForEntry").show('slow');
			$("#route_id").val(r.route_id);
			$('#preparation').select2('val', r.preparation_id);
			$("#routename").val(r.routename);
			$("#search_route_name").val("");
			$("#routeUnicode").val(r.routeUnicode)
		}

	});
}
function deleteRouteMaster(id) {
	var userId = $("#userId").val();
	var inputs = [];
	inputs.push('route_id=' + id);
	inputs.push('deletedBy=' + userId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/deleteroutemaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Delete Sucessfully");

			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			fetchRouteMaster();
		}

	});

}