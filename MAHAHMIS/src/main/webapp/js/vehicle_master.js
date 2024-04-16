function saveVehicleMaster() {

	var vehicleId = $('#vehicleId').val();
	if(vehicleId==""){
			vehicleId=0;
	}
	var vehicleName = $('#vehicleName').val();
	var vehicleNumber= $('#vehicleNumber').val();
	var vehicleTypeId= $('#vehicleType').val();
	var vehicleType= $('#vehicleType option:selected').text();
	var vehicleStatus= $('#vehicleStatus').val();
	
	if (vehicleName == "" || vehicleName == undefined
			|| vehicleName == null) {
		alert("Please enter Vehicle Master type");
		return false;
	}

	var inputs = [];
	inputs.push('vehicleId=' + vehicleId);
	inputs.push('vehicleName=' + vehicleName);
	inputs.push('vehicleNumber=' + vehicleNumber);
	inputs.push('vehicleType=' + vehicleType);
	inputs.push('vehicleTypeId=' + vehicleTypeId);
	inputs.push('vehicleStatus=' + vehicleStatus);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/vehicleMaster/saveVehicle",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			
			if (data == 1) {
				alertify.success("Vehicle_Master Saved Sucessfully");
				getAllVehicleMaster();
			} else if (data == 2) {
				alertify.success("Vehicle_Master Updated Sucessfully");
				getAllVehicleMaster();
			} else if (data == 3) {
				alertify.success("Vehicle_Master already present");
				getAllVehicleMaster();
				
			}
		}
	});
}

function getVehicleMasterList(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/vehicleMaster/getVehicleMasterList",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setVehicleMasterList(r);
		},
	});
}

function getAllVehicleMaster(){

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/vehicleMaster/getAllVehicleMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			setAllVehicleMaster(r, "All");
		}
	});
}

function setAllVehicleMaster(r, CallFrom){
	
 var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		if (CallFrom == "All") {
			for ( var i = 0; i < r.listVehicleMasterDto.length; i++) {
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listVehicleMasterDto[i].vehicleName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listVehicleMasterDto[i].vehicleType
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listVehicleMasterDto[i].vehicleNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listVehicleMasterDto[i].vehicleStatus
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editVehicleMaster('
						+ r.listVehicleMasterDto[i].vehicleId
						+ ')><i class="fa fa-edit"></i></button></td>'
						/*		+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteVehicleMaster('
						+ r.listVehicleMasterDto[i].vehicleId
						+ ')><i class="fa fa-trash-o"></i></button></td>'*/
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
						+ r.vehicleName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.vehicleType
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.vehicleNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.vehicleStatus
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editVehicleMaster('
						+ r.vehicleId
						+ ')><i class="fa fa-edit"></i></button></td>'
						/*+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteVehicleMaster('
						+ r.vehicleId
						+ ')><i class="fa fa-trash-o"></i></button></td>'*/
						+ '</tr>';
			index++;
		}
	}
	$("#vehicleMasterList").html(htm);
	
}

function editVehicleMaster(vehicleId) {

	var inputs = [];
	inputs.push('vehicleId=' + vehicleId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/vehicleMaster/editVehicleMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			$('#searchId').val('');
			$("#divForEntryVehicleMater").show('slow');
			$('#vehicleId').val(r.vehicleId);
			$('#vehicleName').val(r.vehicleName);
			$('#vehicleNumber').val(r.vehicleNumber);
			$('#vehicleType').select2('val',r.vehicleTypeId);
			$('#vehicleStatus').val(r.vehicleStatus);
		}
	});
}

function deleteVehicleMaster(vehicleId){
	
	if(vehicleId !=undefined && vehicleId!=null && vehicleId!="" && vehicleId!="null"){
		var r = confirm("Are You Sure You Want To Delete Vehicle Master Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/vehicleMaster/deleteVehicleMaster",
				data : {
					"vehicle_Id" : vehicleId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllVehicleMaster();
				}
			});
		}
	}
	
}

function clearVehicleMasterDetails() {
	$('#vehicleId').val('');
	$('#vehicleName').val('');
	$('#vehicleNumber').val('');
	$('#vehicleStatus').val('');
	
}


function openAssignJsp()
{
	window.location = "ambulance_assign.jsp?";
	

}

function openAmbulanceApproval()
{
	window.location = "ambulance_requisition_approval.jsp?";

}

function openAmbulanceUpdateTrip()
{
	window.location = "ambulance_updatetrip_details.jsp?";

}

function getAmbulancePatientCount(){
	
	var id="id";
	var count=[];
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ambulancePatient/getAmbulancePatientCount",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(JSON.stringify(r));

			$('#openCount').text(r.openCount);
			$('#approveCount').text(r.approveCount); 
			$('#assignCount').text(r.assignCount); 
			$('#cancelCount').text(r.cancelCount);
			$('#completeCount').text(r.completeCount);
			$('#emergencyCount').text(r.emergencyCount);
		}
	});
}


