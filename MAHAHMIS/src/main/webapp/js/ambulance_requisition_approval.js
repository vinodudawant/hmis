function saveAmbulancePatient() {

	var id = $('#ambulanceMasterId').val();
	var patientName = $('#patientName').val();
	var requisitionDate = $('#requisitionDate').val();
	var department = $('#department').val();
	var uHIDNumber = $('#uHIDNumber').val();
	var callerNumber = $('#callerNumber').val();
	var pickupLocation = $('#pickupLocation').val();
	var dropLocation = $('#dropLocation').val();
	var purpose = $('#purpose').val();
	var statusRemark = $('#statusRemark').val();
	var consultantName = $('#consultantName').val();
	var callerName = $('#callerName').val();
	var status = $('#status option:selected').text();
	var doctorId = $('#doctor').val();
	var nurseId = $('#nurse').val();
	var wardName = $('#wardName').val();
	var nurseName = $('#nurse option:selected').text();
	var doctorName = $('#doctor option:selected').text();
	
	if (pickupLocation == "" || pickupLocation == undefined
			|| pickupLocation == null) {
		 alert("Please enter AmbulancePatient Details");
		return false;
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('patientName=' + patientName);
	//inputs.push('requisitionDate=' + requisitionDate);
	inputs.push('department=' + department);
	inputs.push('uHIDNumber=' + uHIDNumber);
	inputs.push('requisitionDate=' + requisitionDate);
	inputs.push('callerNumber=' + callerNumber);
	inputs.push('pickupLocation=' + pickupLocation);
	inputs.push('dropLocation=' + dropLocation);
	inputs.push('purpose=' + purpose);
	inputs.push('nurseName=' + nurseName);
	inputs.push('wardName=' + wardName);
	inputs.push('statusRemark=' + statusRemark);
	inputs.push('doctorName=' + doctorName);
	inputs.push('consultantName=' + consultantName);
	inputs.push('callerName=' + callerName);
	inputs.push('status=' + status);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/ambulancePatient/saveAmbulancePatient",
		data : str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			alert("consultantName"+consultantName);
			
			if (data == 1) {
				alertify.success("AmbulancePatient Saved Sucessfully");
				clearAmbulancePatient();
				//getAllAmbulancePatient();
			} else if (data == 2) {
				alertify.success("AmbulancePatient Updated Sucessfully");
				clearAmbulancePatient();
				//getAllAmbulancePatient();
			} else if (data == 3) {
				alertify.success("AmbulancePatient already present");
				clearAmbulancePatient();
				//getAllAmbulancePatient();
			}
		}
	});
}


function approveAmbulancePatient() {

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
		 alert("Plz Select At Least One Record to Approve");
		 return false;
	 }
	
	 inputs.push('id=' + docId);
		inputs.push('userId=' + userId);
	var str = inputs.join('&');
	

	jQuery.ajax({
		type : "GET",
		url : "ehat/ambulancePatient/approveAmbulancePatient",
		data : str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			
			if (data == 1) {
				alertify.success("Record Approved Sucessfully");
				clearAmbulancePatient();
				getAllAmbulancePatient();
			} else if (data == 2) {
				alertify.error("Network Issue");
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
				
				 $("#patientName").val(r.listAmbulancePatientDto[0].patientName);
				 $("#requisitionDate").val(r.listAmbulancePatientDto[0].requisitionDate);
				 $("#id").val(r.listAmbulancePatientDto[0].id);
				 $("#uHIDNumber").val(r.listAmbulancePatientDto[0].uHIDNumber);
				 $("#consultantName").val(r.listAmbulancePatientDto[0].consultantName);
				 $("#pickupLocation").val(r.listAmbulancePatientDto[0].pickupLocation);
				 $("#dropLocation").val(r.listAmbulancePatientDto[0].dropLocation);
				 $("#purpose").val(r.listAmbulancePatientDto[0].purpose);
				 $("#callerNumber").val(r.listAmbulancePatientDto[0].callerNumber);
				 $("#status").val(r.listAmbulancePatientDto[0].status);
				 $("#callerName").val(r.listAmbulancePatientDto[0].callerName);
				 $("#statusRemark").val(r.listAmbulancePatientDto[0].statusRemark);
				 $("#nurseName").val(r.listAmbulancePatientDto[0].nurseName);
				 $("#doctorName").val(r.listAmbulancePatientDto[0].doctorName);

			}
		});
	}
}

function toggleEntryDiv() {
	
	$("#divForEntryAmbulanceRequisitionType").toggle('slow');
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

function getAllAmbulancePatient(){
	
	var inputs = [];
	inputs.push('status=' + "OPEN");
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
						+' <td class="col-md-1 center">'
						+ '	<input type="checkbox" name="fmdocid" id="'+r.listAmbulancePatientDto[i].id+'"  value="'+(index)+'"></td>'
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].uHIDNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].patientName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].department
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].requisitionDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].consultantName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].pickupLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].dropLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].purpose
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
						+ r.listAmbulancePatientDto[i].nurseName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].doctorName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].statusRemark
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editAmbulancePatient('
						+ r.listAmbulancePatientDto[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						
						+ ' <td class="col-md-1 center">'
						+'<input type="hidden" id="masterId'+(index)+'" value="'+r.listAmbulancePatientDto[i].id+'"> '
						+ '</td>'
						
						+ '</tr>';
				index++;
			};
		} else if (CallFrom == "search") {
			for ( var i = 0; i < r.listAmbulancePatientDto.length; i++){
			htm = htm
						+ '<tr> '
						+' <td class="col-md-1 center">'
						+ '	<input type="checkbox" name="fmdocid" ></td>'
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].uHIDNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].patientName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].department
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].requisitionDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].consultantName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].pickupLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].dropLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].purpose
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
						+ r.listAmbulancePatientDto[i].nurseName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].doctorName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].statusRemark
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editAmbulancePatient('
						+ r.listAmbulancePatientDto[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						
						+ ' <td class="col-md-1 center" id="masterId" value="'+r.id+'" style="display:none">'
						
						+ '</td>'
						
						+ '</tr>';
			index++;
		};
	}
	}
	$("#ambulancePatientList").html(htm);
	
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
			$('#department').val(r.department);
			$('#wardName').val(r.wardName);
			$('#requisitionDate').val(date_created[0]);
			$('#uHIDNumber').val(r.uHIDNumber);
			$('#consultantName').val(r.consultantName);
			$('#pickupLocation').val(r.pickupLocation);
			$('#dropLocation').val(r.dropLocation);
			$('#purpose').val(r.purpose);
			$('#callerNumber').val(r.callerNumber);
			$('#status').select2('val',r.status);
			$('#callerName').val(r.callerName);
			$('#statusRemark').val(r.statusRemark);
			$('#nurse').select2('val',r.nurseId);
			$('#doctor').select2('val',r.doctorId);
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
	$('#statusRemark').val('');
	$('#nurseName').val('');
	$('#doctorName').val('');
	$('#patientName').val('');
	$('#requisitionDate').val('');
	$('#patientId').val('');
	$('#uHIDNumber').val('');
	$('#department').val('');
	$('#wardName').val('');
	$('#consultantName').val('');
	$('#status').val('');

}

function openAmbulanceRequisitionFormJsp()
{
	window.location = "ambulance_requisition_form.jsp?";
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

function getDoctorName(patientId){
	
    var inputs = [];
  
    inputs.push('id=' + patientId);  
   
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: false,
        type 	: "GET",
        data 	: str + "&reqType=AJAX",
      
        url 	: "ehat/ambulancePatient/getDoctorName",
        cache 	: true,
        success : function(r) {
        	
        $("#consultantName").val(r);
        	       	
        }
    });
}

function getDoctors(){

    var inputs = [];
  
    inputs.push('id=' + 1);  
   
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: false,
        type 	: "GET",
        data 	: str + "&reqType=AJAX",
        url 	: "ehat/ambulancePatient/getDoctors",
        cache 	: true,
        success : function(r) {
        	
      //  $("#doctors").val(r);  
        
        var divContent = "<option value='0'>select</option>";
        
        for ( var i = 0; i < r.usersList.length; i++){             
                divContent = divContent + "<option value='" + r.usersList[i].user_ID + "'  >"
                        + r.usersList[i].title +"-"+r.usersList[i].f_name+"-"+r.usersList[i].m_name+ "-"+r.usersList[i].l_name+   "</option>";
        }
       
        $("#doctor").html(divContent);
        $("#doctor").select2();
       
        }
    });
    
}

function getNurse(){

	var inputs = [];
	
	inputs.push('id=' + 1);  
	
	var str = inputs.join('&');
	jQuery.ajax({
		
	    async 	: false,
	    type 	: "GET",
	    data 	: str + "&reqType=AJAX",
	    url 	: "ehat/ambulancePatient/getNurse",
	    cache 	: true,
	    success : function(r) {
    
	    	var divContent = "<option value='0'>select</option>";
    
	    	for ( var i = 0; i < r.usersList.length; i++){             
	    		divContent = divContent + "<option value='" + r.usersList[i].user_ID + "'  >"
                    + r.usersList[i].title +"-"+r.usersList[i].f_name+"-"+r.usersList[i].m_name+ "-"+r.usersList[i].l_name+   "</option>";
	    		}
   
	    		$("#nurse").html(divContent);
	    		$("#nurse").select2();
	    	}
		});
}

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
									+ '<tr id="count'+(index)+'"   class="newStudyRowF"> '
									+' <td class="col-md-1 center">'
									+ '	<input type="checkbox" name="fmdocid" id="'+r.listAmbulancePatientDto[i].id+'"  value="'+(index)+'"></td>'
									+ ' <td class="col-md-1 center">'
									+ index
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].uHIDNumber
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].patientName
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].department
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].requisitionDate
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].consultantName
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].pickupLocation
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].dropLocation
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].purpose
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
									+ r.listAmbulancePatientDto[i].nurseName
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].doctorName
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].statusRemark
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

function goBack() {
	
	window.location = "ambulance_requisition_form.jsp?";
}

function closeWin()
{
	$("#patientInfoDiv").hide();
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