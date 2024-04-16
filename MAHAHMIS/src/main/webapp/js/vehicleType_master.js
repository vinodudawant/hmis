function saveVehicleTypeMaster() {

	var vehicleTypeId = $('#vehicleTypeId').val();
	if(vehicleTypeId==""){
			vehicleTypeId=0;
	}
	var vehicleTypeId = $('#vehicleTypeId').val();
	var vehicleType= $('#vehicleType').val();
	
	if (vehicleType == "" || vehicleType == undefined
			|| vehicleType == null) {
		alert("Please enter VehicleType Master ");
		return false;
	}
	
	var inputs = [];
	inputs.push('vehicleTypeId=' + vehicleTypeId);
	inputs.push('vehicleType=' + vehicleType);
	var str = inputs.join('&');
	
	jQuery.ajax({
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/vehicleTypeMaster/saveVehicleType",
		error : function() {
			alertify.error('Network Issue');
		},
		
		success : function(s) {
			if (data == 1) {
				alertify.success("VehicleType_Master Saved Sucessfully");
				getAllVehicleTypeMaster();
			} else if (data == 2) {
				alertify.success("VehicleType_Master Updated Sucessfully");
				getAllVehicleTypeMaster();
			} else if (data == 3) {
				alertify.success("VehicleType_Master already present");
				getAllVehicleTypeMaster();
				
			}
		}
	});
}

function getAllVehicleTypeMaster(){

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/vehicleTypeMaster/getAllVehicleTypeMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			setAllVehicleTypeMaster(r, "All");
			setVehicleTypeMaster(r);
		}
	});
}

function setAllVehicleTypeMaster(r, CallFrom){
	
 var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		if (CallFrom == "All") {
			for ( var i = 0; i < r.listVehicleTypeMasterDto.length; i++) {
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listVehicleTypeMasterDto[i].vehicleType
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editVehicleTypeMaster('
						+ r.listVehicleTypeMasterDto[i].vehicleTypeId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteVehicleTypeMaster('
						+ r.listVehicleTypeMasterDto[i].vehicleTypeId
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
						+ r.vehicleType
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editVehicleTypeMaster('
						+ r.vehicleTypeId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteVehicleTypeMaster('
						+ r.vehicleTypeId
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
			index++;
		}
	}
	$("#vehicleTypeMasterList").html(htm);
	
}

function editVehicleTypeMaster(vehicleTypeId) {

	var inputs = [];
	inputs.push('vehicleTypeId=' + vehicleTypeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/vehicleTypeMaster/editVehicleTypeMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#searchId').val('');
			$("#divForEntryVehicleMater").show('slow');
			$('#vehicleTypeId').val(r.vehicleTypeId);
			$('#vehicleType').val(r.vehicleType);
			
		}
	});
}

function deleteVehicleTypeMaster(vehicleTypeId){
	
	if(vehicleTypeId !=undefined && vehicleTypeId!=null && vehicleTypeId!="" && vehicleTypeId!="null"){
		var r = confirm("Are You Sure You Want To Delete VehicleType Master Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/vehicleTypeMaster/deleteVehicleTypeMaster",
				data : {
					"vehicleType_Id" : vehicleTypeId
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

function clearVehicleTypeMasterDetails() {
	$('#vehicleTypeId').val('');
	$('#vehicleType').val('');
	
}

function setVehicleTypeMaster(r){
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listVehicleTypeMasterDto.length; int++) {
		//alert("Length-----:"+r.listVehicleTypeMasterDto.length);
		list=list+'<option value="'+(r.listVehicleTypeMasterDto[int].vehicleTypeId)+'">'+(r.listVehicleTypeMasterDto[int].vehicleType)+'</option>';
		
	}
	$("#vehicleType").html(list);
}


