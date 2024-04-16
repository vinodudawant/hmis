function assignAmbulancePatient() {

	var docId = new Array();
	//var userId		= parseInt($("#userId").val());
	var userId	=1;
	$("input[name='fmdocid']:checked").each(function() {	
		
		var slaveId=$("#masterId"+$(this).val()).val();
		//var slaveId=$("#masterId1").val();
		
		if(slaveId >0){
	//	docId.push(slaveId);
	//	docId.push($(this).attr('id'));
			
			docId.push($("#masterId"+$(this).val()).val());
		}
	});
	
	var inputs = [];
	
	 if(docId.length <0){
		 alert("Plz Select One Record to Assign");
		 return false;
	 }
	
	 inputs.push('id=' + docId);
		inputs.push('userId=' + userId);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "GET",
		url : "ehat/ambulancePatient/assignAmbulancePatient",
		data : str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('"Please Select Only One Record"');
		},
		success : function(data) {
			
			if (data == 1) {
				alertify.success("Record Assigned Sucessfully");
				clearAmbulancePatient();
				getAllAmbulancePatient();
			} else if (data == 2) {
				alertify.error("Please Select Only One Record");
				clearAmbulancePatient();
				getAllAmbulancePatient();
			} 
		}
	});
}

function getAmbulanceDetailsById(patientId) {

	if(patientId !=undefined && patientId!=null && patientId!="" && patientId!="null"){
		
		var inputs = [];
		inputs.push('id=' + patientId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/ambulancePatient/getAmbulanceDetailsById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				 $("#ambulanceMasterId").val(r.listAmbulancePatientDto[0].id);
				 $("#patientName").val(r.listAmbulancePatientDto[0].patientName);
				 $("#patientId").val(r.listAmbulancePatientDto[0].patientId);
				 $("#uHIDNumber").val(r.listAmbulancePatientDto[0].uHIDNumber);
				 $("#deparment").val(r.listAmbulancePatientDto[0].department);
				 $("#ward").val(r.listAmbulancePatientDto[0].ward);
				 $("#pickupLocation").val(r.listAmbulancePatientDto[0].pickupLocation);
				 $("#dropLocation").val(r.listAmbulancePatientDto[0].dropLocation);
				 $("#callerNumber").val(r.listAmbulancePatientDto[0].callerNumber);
				 $("#status").val(r.listAmbulancePatientDto[0].status);
				 $("#callerName").val(r.listAmbulancePatientDto[0].callerName);
				 $("#statusRemark").val(r.listAmbulancePatientDto[0].statusRemark);
			}
		});
	}
}

function fetchWardName()
{
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/wardtypecontroller/fetchwardname",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	        		setFetchWardName(r);
			}
	});	
}

function setFetchWardName(r)
{
	
	var list="";
	list=list+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		list=list+'<option  value="'+(r.lstChargesSlave[int].slaveId)+'"  data-selfid="'+r.lstChargesSlave[int].selfId+'" data-name="'+r.lstChargesSlave[int].categoryName+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		}	
	$("#wardTypeSelect").html(list);
}

function wardName(id)
{
	var value = $("#wardTypeSelect").find(':selected').attr('data-name');
	$("#wardName").val(value);
	var  selfid = $("#wardTypeSelect").find(':selected').attr('data-selfid');
	$("#wardHallSelect").val(selfid);
	$('#wardHallSelect').attr("disabled", true); 
	
}

function toggleEntryDiv() {
	$("#divForEntryAmbulanceRequisitionType").toggle('slow');
}

function getAllAmbulancePatient(){
	
	var inputs = [];
	inputs.push('status=' + "Approved");
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ambulancePatient/getAllAmbulancePatient",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllPatient(r, "All");
		}
	});
}

function searchbyFilters()
{
	var status = $("#statusMaster option:selected").text();
	var department = $("#department_for_header option:selected").text();
	var requisitionDate=$("#txtFdate").val();
	var aa=requisitionDate.split("/");
	var toDate = $("#txtTdate").val();
	
	var fromDate=aa[2]+"-"+aa[1]+"-"+aa[0];
	var bb=toDate.split("/");
	
	var toDate1=bb[2]+"-"+bb[1]+"-"+bb[0];
	var wardTypeSelect = $("#wardTypeSelect").val();
	
    var inputs = [];
    inputs.push('status=' + status);
    inputs.push('department=' + department);
    inputs.push('requisitionDate=' + fromDate);
    inputs.push('toDate=' + toDate1); 
	inputs.push('wardTypeSelect=' + wardTypeSelect);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ambulancePatient/getfilterAmbulancePatientMasterWithDate",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllPatient(r, "search");			
		}
			
	});
}

function setAllPatient(r, CallFrom){
	
 var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		if (CallFrom == "All") {
			for ( var i = 0; i < r.listAmbulancePatientDto.length; i++) {
				htm = htm
				+ '<tr id="count'+(index)+'"   class="newStudyRowF"> '
				+' <td class="col-md-1 center">';
			if(r.listAmbulancePatientDto[i].vehicleNumber == "" || r.listAmbulancePatientDto[i].vehicleNumber == '')
				htm = htm + '	<input type="checkbox" disabled name="fmdocid" id="'+r.listAmbulancePatientDto[i].id+'"  value="'+(index)+'"></td>}';
			else		
				htm = htm  + '	<input type="checkbox"  name="fmdocid" id="'+r.listAmbulancePatientDto[i].id+'"  value="'+(index)+'"></td>';

				htm = htm +' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].id
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].uHIDNumber
						+ '</td>'
						+' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].requisitionDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].patientName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].department
						+ '</td>'
					/*	+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].ward
						+ '</td>'*/
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].pickupLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].dropLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].callerName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].callerNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].status
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].statusRemark
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].vehicleNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].vehicleType
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].checklist
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].driver
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].scheduleDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].remark
						+ '</td>'
						+' <td class="col-md-1 center">'
						+ '	<type="button" value="view" class="btn btn-xs btn-success" onclick=editAmbulancePatient('
						+ r.listAmbulancePatientDto[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+'<input type="hidden" id="masterId'+(index)+'" value="'+r.listAmbulancePatientDto[i].id+'"> '
						+ '</td>'
						+ '</tr>';
				index++;
			};
		} else if (CallFrom == "search") {
			
			for ( var i = 0; i < r.listAmbulancePatientDto.length; i++) {
/*					htm = htm
					+ '<tr id="count'+(index)+'"   class="newStudyRowF"> '
					+' <td class="col-md-1 center">';
				if(r.listAmbulancePatientDto[i].vehicleNumber == "" || r.listAmbulancePatientDto[i].vehicleNumber == '')
					htm = htm + '	<input type="checkbox" disabled name="fmdocid" id="'+r.listAmbulancePatientDto[i].id+'"  value="'+(index)+'"></td>}';
				else		
					htm = htm  + '	<input type="checkbox"  name="fmdocid" id="'+r.listAmbulancePatientDto[i].id+'"  value="'+(index)+'"></td>';*/

				
			htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ '	<input type="checkbox" onclick=editAmbulancePatient('
						+ r.listAmbulancePatientDto[i].id
						+ ')></td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].id
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].uHIDNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].requisitionDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].patientName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].department
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].pickupLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].dropLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].callerName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].callerNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].status
						+ '</td>'		
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].statusRemark
						+ '</td>'	
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].vehicleNumber
						+ '</td>'	
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].vehicleType
						+ '</td>'	
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].checklist
						+ '</td>'	
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].driver
						+ '</td>'	
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].scheduleDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].remark
						+ '</td>'	
						+ ' <td class="col-md-1 center">'
						+ '	<type="button" value="view" class="btn btn-xs btn-success" onclick=editAmbulancePatient('
						+ r.listAmbulancePatientDto[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ '</tr>';
			index++;
		}
	}
	$("#ambulancePatientList").html(htm);
  }
}

function editAmbulancePatient(id) {

	$("#patientInfoDiv").show();
	
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ambulancePatient/editAmbulancePatient",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var req_date = r.requisitionDate;
			var date_created = req_date.split(" ");
			
			$('#searchId').val('');
			$("#divForEntryAmbulanceRequisitionType").show('slow');
			$('#ambulanceMasterId').val(r.id);
			$('#patientName').val(r.patientName);
			$('#uHIDNumber').val(r.uHIDNumber);
			$('#department').val(r.department);
			$('#requisitionDate').val(date_created[0]);
			$('#wardName').val(r.wardName);
			$('#pickupLocation').val(r.pickupLocation);
			$('#dropLocation').val(r.dropLocation);
			$('#callerNumber').val(r.callerNumber);
			$('#status').val(r.status);
			$('#callerName').val(r.callerName);
			$('#vehicleType').val(r.vehicleTypeId);
			$('#emergencyPatient').val(r.emergencyPatient);
			
			getVehicleNumberByTypeId();
			$('#vehicleNumber').val(r.vehicleId);
			//$('#vehicleType').val(r.vehicleType);
			$('#checklist').val(r.checklist);
			$('#driver').val(r.driver);
			$('#reamrk').val(r.reamrk);
			$('#statusRemark').val(r.statusRemark);
			$('#scheduleDate').val(r.scheduleDate);
			
		}
	});
}

function getAmbulancePatientList(){

jQuery.ajax({
	async : true,
	type : "GET",
	url : "ehat/ambulancePatient/getAmbulancePatientList",
	 timeout : 1000 * 60 * 5, 
	cache : false,
	error : function() {
		alert('error');
	},
	success : function(r) {
		setAmbulancePatientList(r);
	},
});
}

function deleteAmbulancePatient(patientId){

	if(patientId !=undefined && patientId!=null && patientId!="" && patientId!="null"){
	
		var r = confirm("Are You Sure You Want To Delete Ambulance Patient Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/ambulancePatient/deleteAmbulancePatient",
				data : {
					"id" : patientId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllAmbulancePatient();
				}
			});
		}
	}
	
}

function AmbulancePatientSearchById() {
	
	var patientId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(patientId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getAmbulanceDetailsById(patientId);
}

function clearAmbulancePatient() {

	$('#dropLocation').val('');
	$('#pickupLocation').val('');
	$('#callerNumber').val('');
	$('#callerName').val('');
	$('#purpose').val('');
	$('#reamrk').val('');
	$('#statusRemark').val('');
	$('#vehicleType').val('');
	$('#vehicleNumber').val('');
	$('#checklist').val('');
	$('#driver').val('');
	$('#scheduleDate').val('');
	$('#scheduleTime').val('');
	$('#ambulanceMasterId').val('');
	$('#patientName').val('');
	$('#uHIDNumber').val('');
	$('#department').val('');
	$('#requisitionDate').val('');
	$('#wardName').val('');
	$('#status').val('');
	$('#callerName').val('');
	$('#emergencyPatient').val('');
}

function openAmbulanceRequisitionFormJsp()
{
	window.location = "ambulance_requisition_form.jsp?";
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
			//setVehicleTypeMaster(r);
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
						+ r.vehicleId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteVehicleMaster('
						+ r.vehicleId
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
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteVehicleMaster('
						+ r.vehicleId
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
			index++;
		}
	}
	$("#vehicleMasterList").html(htm);
}

function getDriver(){
	
    var inputs = [];
  
    inputs.push('id=' + 1);  
   
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: false,
        type 	: "GET",
        data 	: str + "&reqType=AJAX",
        url 	: "ehat/vehicleMaster/getDriver",
        cache 	: true,
        success : function(r) {
        	
        var divContent = "<option value='0'>select</option>";
        
        for ( var i = 0; i < r.usersList.length; i++){             
                divContent = divContent + "<option value='" + r.usersList[i].user_ID + "'  >"
                        + r.usersList[i].title +"-"+r.usersList[i].f_name+"-"+r.usersList[i].m_name+ "-"+r.usersList[i].l_name+   "</option>";
        	}
       
        $("#driver").html(divContent);
        $("#driver").select2();
       
        }
    });
}

/*function setVehicleMaster(r){
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listVehicleMasterDto.length; int++) {
		
		list=list+'<option value="'+(r.listVehicleMasterDto[int].vehicleId)+'">'+(r.listVehicleMasterDto[int].vehicleType)+'</option>';
		
	}
	$("#vehicleType").html(list);
}*/

function autoSuggestion(inputID)
{	
	var resultData = [];
	
	var id=1;
	var uHIDNumber = "";
	var patientName="";
	
		var patSearchType=$("#patSearchType").val();
		var findingName = $("#" + inputID).val();
	
        var inputs = [];
        inputs.push('callFrom=' + patSearchType);
        inputs.push('text=' + findingName);
       
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : false,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/ambulancePatient/autoSuggestion",
	success : function(r) {
		
		var template = "";
		for ( var j = 0; j < r.listAmbulancePatientDto.length; j++) {
			
			var arrValue = r.listAmbulancePatientDto[j].id +"-"+r.listAmbulancePatientDto[j].patientName +"-"+r.listAmbulancePatientDto[j].mobileNo ;
			var idValue = r.listAmbulancePatientDto[j].id;
			var patName = r.listAmbulancePatientDto[j].patientName;
			resultData.push({
				ID : idValue,
				Name : patName
			});
			template = template + '<li data-value="' + idValue
					+ '" class=""><a href="#">' + arrValue
					+ '</a></li>';
		}
		
		setTimeout(function() {

			$("#div" + inputID + " .typeahead").html(template);
			$("#div" + inputID + " .typeahead").show();
			
			$("#" + inputID).typeahead({
				source : resultData,
				displayField : 'Name',
				valueField : 'ID',
				onSelect : displayResult,
				scrollBar : true
			});
			$("#" + inputID).data('typeahead').source = resultData;
		}, 500);
	}
});	
		
	
	function displayResult(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		getAmbulancePatientById(patId);
		
	}

}

function showPatientInfoForm(){

	$("#patientInfoDiv").show();
}

function getVehicleTypeById(vehicleTypeId)
{
	if(vehicleTypeId !=undefined && vehicleTypeId!=null && vehicleTypeId!="" && vehicleTypeId!="null"){

		var inputs = [];
		inputs.push('vehicleTypeId=' + vehicleTypeId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/vehicleTypeMaster/getVehicleTypeById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				 $("#vehicleId").val(r.listVehicleMasterDto[0].vehicleId);
				 $("#vehicleName").val(r.listVehicleMasterDto[0].vehicleName);
				 $("#vehicleNumber").val(r.listVehicleMasterDto[0].vehicleNumber);
				 $("#vehicleTypeId").val(r.listVehicleMasterDto[0].vehicleTypeId);
				 $("#vehicleType").val(r.listVehicleMasterDto[0].vehicleType);
				 $("#vehicleStatus").val(r.listVehicleMasterDto[0].vehicleStatus);
			}
		});
	}
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
			setChecklistMaster(r);
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
			}
			;
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

function setChecklistMaster(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listChecklistMasterDto.length; int++) {
		
		list=list+'<option value="'+(r.listChecklistMasterDto[int].checklistId)+'">'+(r.listChecklistMasterDto[int].checklistType)+'</option>';
		
	}
	$("#checklist").html(list);
}

function getAmbulancePatientById(patientId) {
	
	if(patientId !=undefined && patientId!=null && patientId!="" && patientId!="null"){
		
		var inputs = [];
		inputs.push('id=' + patientId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/ambulancePatient/getAmbulancePatientById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				var htm = "";
				var index = 1;
				if(r.listAmbulancePatientDto.length > 0){
					
						for ( var i = 0; i < r.listAmbulancePatientDto.length; i++) {
							htm = htm
									+ '<tr> '
									+ ' <td class="col-md-1 center">'
									+ index
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].id
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].uHIDNumber
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].requisitionDate
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].patientName
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].department
									+ '</td>'
								/*	+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].ward
									+ '</td>'*/
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].pickupLocation
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].dropLocation
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].callerName
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].callerNumber
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].status
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].statusRemark
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].vehicleNumber
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].vehicleType
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].checklist
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].driver
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].scheduleDate
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].remark
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ '	<button class="btn btn-xs btn-success" onclick=editAmbulancePatient('
									+ r.listAmbulancePatientDto[i].id
									+ ')><i class="fa fa-edit"></i></button></td>'
									+ '</tr>';
							index++;
						};
						
						$("#ambulancePatientList").html(htm);
				}
			}
		});
	}
}

function getVehicleNumberByTypeId(){
		
		var vehicleTypeId=	$("#vehicleType").val();
			
			var inputs = [];
			inputs.push('vehicleTypeId=' + vehicleTypeId);
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "GET",
				url : "ehat/vehicleMaster/getVehicleTypeById",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					
					var list="<option value='0'>-select-</option>";
					
					for ( var int = 0; int < r.length; int++) {
						
						list=list+'<option value="'+(r[int].vehicleId)+'">'+(r[int].vehicleNumber)+'</option>';
						
					}
					$("#vehicleNumber").html(list);
					
				}
		});
}

function showVehicleInfoForm(){
	
	$("#vehicleInfoDiv").show();
}

function goBack() {
	
	window.location = "ambulance_requisition_approval.jsp?";
}

function closeWin()
{
	$("#patientInfoDiv").hide();
}

function getDepts() {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dept/viewAllDeptListAll",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var htm = "<option id=0>Select</option>";
			for ( var i = 0; i < r.lstDepts.length; i++) {
		
				htm = htm + "<option value="+r.lstDepts[i].deptId+">"+r.lstDepts[i].deptName+"</option>";
			}
			$("#department").html(htm);
			
			$("#department_for_header").html(htm);
			$("#department_for_header").select2();
		}
	});
}

function updateAmbulancePatient() {
	
	 var id = $('#ambulanceMasterId').val();
	 var pickupLocation = $('#pickupLocation').val();
	 var dropLocation = $('#dropLocation').val();
	 var callerName = $('#callerName').val();
	 var callerNumber = $('#callerNumber').val();
	 var status  =  $('#status option:selected').text();
	 var vehicleTypeId = $('#vehicleType').val();
	 var vehicleType = $('#vehicleType option:selected').text();
	 var vehicleNumber = $('#vehicleNumber option:selected').text();
	 var vehicleId =$('#vehicleNumber').val();
	 var checklist = $('#checklist option:selected').text();
	 var driver = $('#driver option:selected').text();
	 var scheduleDate = $('#scheduleDate').val();
	 var scheduleTime = $('#scheduleTime').val();
	 var remark = $('#remark').val();
	 var regex = /^[a-zA-Z\s]*$/;
	  if (!regex.test(callerName)) {
		  alert("Please only enter alphabates!");
		  ("#callerName").focus();
	      return false;
	  }
	  
	  if (patientName == "" || patientName == undefined
			|| patientName == null) {
		 alert("Please enter AmbulancePatient Details");
		return false;
	  }
	
		var inputs = [];
		inputs.push('id=' + id);
		inputs.push('pickupLocation=' + pickupLocation);
		inputs.push('dropLocation=' + dropLocation);
		inputs.push('callerName=' + callerName);
		inputs.push('callerNumber=' + callerNumber);
		inputs.push('status=' + status);
		inputs.push('vehicleType=' +vehicleType);
		inputs.push('vehicleNumber=' +vehicleNumber);
		inputs.push('checklist=' +checklist);
		inputs.push('driver=' +driver);
		inputs.push('scheduleDate=' +scheduleDate);
		inputs.push('scheduleTime=' +scheduleTime);
		inputs.push('vehicleId=' +vehicleId);
		inputs.push('vehicleTypeId=' +vehicleTypeId);
		inputs.push('remark=' +remark);
		
		var str = inputs.join('&');

		jQuery.ajax({
			type : "POST",
			url : "ehat/ambulancePatient/updateAmbulancePatient",
			data : str + "&reqType=AJAX",
			error : function() {
				
				alertify.error('Network Issue');
			},
			success : function(data) {
					if (data == 1) {
					alert("AmbulancePatient Saved Sucessfully");
					clearAmbulancePatient();
					getAllAmbulancePatient();
				} else if (data == 2) {
					alert("AmbulancePatient Updated Sucessfully");
					clearAmbulancePatient();
					getAllAmbulancePatient();
				} else if (data == 3) {
					alert("AmbulancePatient already present");
					clearAmbulancePatient();
					getAllAmbulancePatient();
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

function setVehicleTypeMaster(r){
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listVehicleTypeMasterDto.length; int++) {
		//alert("Length-----:"+r.listVehicleTypeMasterDto.length);
		list=list+'<option value="'+(r.listVehicleTypeMasterDto[int].vehicleTypeId)+'">'+(r.listVehicleTypeMasterDto[int].vehicleType)+'</option>';
		
	}
	$("#vehicleType").html(list);
}

function autoSuggestionforRID(inputID)
{	
	var resultData = [];
	
	var id=1;
	var id = "";
	var patientName="";
	
		var patSearchType=$("#patSearchType").val();
		var findingName = $("#" + inputID).val();
   
        var inputs = [];
        inputs.push('callFrom=' + patSearchType);
        inputs.push('id=' + findingName);
       
        var str = inputs.join('&');
	
		jQuery.ajax({
		async : false,
		type : "POST",
		data 	: str + "&reqType=AJAX",
		url : "ehat/ambulancePatient/autoSuggestionforRID",
		success : function(r) {
			
			var template = "";
			for ( var j = 0; j < r.listAmbulancePatientDto.length; j++) {
				
				var arrValue = r.listAmbulancePatientDto[j].id ;
				var idValue = r.listAmbulancePatientDto[j].id;
				var patName = r.listAmbulancePatientDto[j].patientName;
				resultData.push({
					ID : idValue,
					Name : patName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
		
		setTimeout(function() {

			$("#div" + inputID + " .typeahead").html(template);
			$("#div" + inputID + " .typeahead").show();
			
			$("#" + inputID).typeahead({
				source : resultData,
				displayField : 'Name',
				valueField : 'ID',
				onSelect : displayResult,
				scrollBar : true
			});
			$("#" + inputID).data('typeahead').source = resultData;
		}, 500);
	}
})	
		
	
	function displayResult(item) {
		
		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		getAmbulancePatientById(patId);
		
	}
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
			setStatusMaster(r);
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

function setStatusMaster(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listStatusMasterDto.length; int++) {
		
		list=list+'<option value="'+(r.listStatusMasterDto[int].statusId)+'">'+(r.listStatusMasterDto[int].statusType)+'</option>';
	}
	$("#statusMaster").html(list);
}