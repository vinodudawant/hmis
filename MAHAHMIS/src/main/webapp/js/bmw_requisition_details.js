/*function saveBmwRequisitionDetailsMaster(){
	
	var Id = $("#Id").val();
	var bmwUserId = $("#bmwUserId").val();
	var Time= $("#Time").val();
	var Department= $("#Department").val();
	var TypeOfBag= $("#TypeOfBag").val();
	var PickupLocation= $("#PickupLocation").val();
	var CallerName= $("#CallerName").val();
	var WardName= $("#WardName").val();
	var WeightOfBag= $("#WeightOfBag").val();
	var CallerNumber= $("#CallerNumber").val();
	var Drop_Location= $("#Drop_Location").val();
	var NurseInCharge= $("#NurseInCharge").val();
	var Remark= $("#Remark").val();
	
	
}*/

function saveBmwRequisitionDetailsMaster() {
	
	var Id = $('#Id').val();
	var bmwUserId = $('#bmwUserId').val();
	var Time = $('#Time').val();
	var Department = $('#Department').val();
	var TypeOfBag = $('#TypeOfBag').val();
	var PickupLocation = $('#PickupLocation').val();
	var CallerName = $('#CallerName').val();
	var WardName = $('#WardName').val();
	var WeightOfBag = $('#WeightOfBag').val();
	var CallerNumber = $('#CallerNumber').val();
	var Drop_Location = $('#Drop_Location').val();
	var NurseInCharge = $('#NurseInCharge').val();
	var Remark = $('#Remark').val();
	
	if (PickupLocation == "" || PickupLocation == undefined
			|| PickupLocation == null) {
		 alert("Please enter BmwRequisition Details");
		return false;
	}

	
	var inputs = [];
	inputs.push('Id=' + Id);
	inputs.push('bmwUserId=' + bmwUserId);
	inputs.push('Time=' + Time);
	inputs.push('Department=' + Department);
	inputs.push('TypeOfBag=' + TypeOfBag);
	inputs.push('PickupLocation=' + PickupLocation);
	inputs.push('CallerName=' + CallerName);
	inputs.push('WardName=' + WardName);
	inputs.push('WeightOfBag=' + WeightOfBag);
	inputs.push('CallerNumber=' + CallerNumber);
	inputs.push('Drop_Location=' + Drop_Location);
	inputs.push('NurseInCharge=' + NurseInCharge);
	inputs.push('Remark=' + Remark);
	
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/bmwRequisition/saveBmwRequisitionDetailsMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			alert(patientId);
			if (data == 1) {
				alertify.success("BmwRequisitionDetails Saved Sucessfully");
				clearBmwRequisitionDetailsMaster();
				
			} else if (data == 2) {
				alertify.success("BmwRequisitionDetails Updated Sucessfully");
				clearBmwRequisitionDetailsMaster();
				
			} else if (data == 3) {
				alertify.success("BmwRequisitionDetails already present");
				clearBmwRequisitionDetailsMaster();
				
			}
		}
	});
}
