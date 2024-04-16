function goBack() {
	
	window.location = "BMW_requisition_from1.jsp?";
}

function approveBmwRequisition() {

	//alert($("input[name='fmdocid']:checked").length);
	//return false;	
	
	var docId = new Array();
	//var userId		= parseInt($("#userId").val());
	var userId1;
	$("input[name='fmdocid']:checked").each(function() {	
		
		currentId = $("#" + this.id).val();
		
	//	alert("currentId:: "+currentId)
		
		/*var slaveId=$("#bmwUserId"+$(this).val()).val();
		var slaveId=$("#masterId1").val();*/
		
		if(currentId >0){
			docId.push(currentId);
			/*docId.push($(this).attr('id'));
			
			docId.push($("#bmwUserId"+$(this).val()).val());*/
		}
	});
	
	var inputs = [];

	alert("Are You Sure Want To Approve BMW Requisition... ");
	
	 if($("input[name='fmdocid']:checked").length == 0){
		 alert("Plz Select At Least One Record to Approve");
		 return false;
	 }
	 
	 var userId = 0;
	
	 inputs.push('id=' + docId);
	 inputs.push('userId=' + userId);
	 var str = inputs.join('&');
	

	jQuery.ajax({
		type : "GET",
		url : "ehat/bmwRequisition/approveBmwRequisition",
		data : str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			
			if (data==1) {
				alertify.success("Record Approved Sucessfully");
			
				getBmwRequisitionDetailsMaster();
			} else if (data==2) {
				alertify.error("Network Issue");
			
				getBmwRequisitionDetailsMaster();
			} 
		}
	});
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
			
			
			var htm = "<option id=0>--Select--</option>";
			for ( var i = 0; i < r.lstDepts.length; i++) {
		
				htm = htm + "<option id="+r.lstDepts[i].deptId+">"+r.lstDepts[i].deptName+"</option>";
			}
			$("#department").html(htm);
		}
	});
}

function open_BMW_requisition_approval_Jsp()
{
	window.location = "BMW_requisition_approval.jsp?";
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

function getBmwRequisitionDetailsMaster(){
	
	var inputs = [];
	inputs.push('status='+"OPEN");
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bmwRequisition/getBmwRequisitionDetailsMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			setBmwRequisitionDetailsMaster(r, "All");
			
		}
	});
}

function searchbyFileters()
{
	var fdate = $("#fdate").val();
	var tdate = $("#tdate").val();

	var department = $("#department").val();
	var wardTypeSelect = $("#wardTypeSelect").val();
	var typeOfBag = $("#typeOfBag").val();
	var bag_Status = $("#bag_Status option:selected").text();
	
	
	var inputs = [];
	inputs.push('fdate=' + fdate);
	inputs.push('tdate=' + tdate);
    inputs.push('department=' + department);
	inputs.push('wardTypeSelect=' + wardTypeSelect);
	inputs.push('typeOfBag=' + typeOfBag);
	inputs.push('bag_Status=' + bag_Status);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bmwRequisition/getfilterBmwRequisitionDetailsMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setBmwRequisitionDetailsMaster(r, "search");			
		}
			
	});
}

function setBmwRequisitionDetailsMaster(r, CallFrom){
	
 var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		if (CallFrom == "All") {
			for ( var i = 0; i < r.lstBmwRequisitionDetails.length; i++) {
				
				var datetime= new Date(r.lstBmwRequisitionDetails[i].createdDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});
                var splitData = datetime.split(",");
                var formatDate = splitData[0].split("/");
                var finalDate = formatDate[1]+"-"+formatDate[0]+"-"+formatDate[2]+","+splitData[1];
				
				htm = htm
						+ '<tr> '
						+' <td class="col-md-1 center">'
						+ '	<input type="checkbox" name="fmdocid" id="bmwUserId'+index+'"  value="'+(r.lstBmwRequisitionDetails[i].id)+'"></td>'
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].bmwUserId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ finalDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].department
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].bagColour
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].weightOfBag
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].pickupLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].drop_Location
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].nurseInCharge	
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].callerName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].callerNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].bag_Status
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].remark
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+'<input type="hidden" id="bmwUserId'+(index)+'" value="'+r.lstBmwRequisitionDetails[i].id+'"> '
						+ '</td>'
						
						/*+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editBmwRequisitionDetails('
						+ r.lstBmwRequisitionDetails[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteBmwRequisitionDetails('
						+ r.lstBmwRequisitionDetails[i].id
						+ ')><i class="fa fa-trash-o"></i></button></td>'*/
						+ '</tr>';
				index++;
			};
		} else if (CallFrom == "search") {
			for ( var i = 0; i < r.lstBmwRequisitionDetails.length; i++) {
			var datetime= new Date(r.lstBmwRequisitionDetails[i].createdDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});
            var splitData = datetime.split(",");
            var formatDate = splitData[0].split("/");
            var finalDate = formatDate[1]+"-"+formatDate[0]+"-"+formatDate[2]+","+splitData[1];
			
			htm = htm
						+ '<tr> '
						+ '<tr> '
						+' <td class="col-md-1 center">'
						+ '	<input type="checkbox" name="fmdocid" id="bmwUserId'+index+'"  value="'+(r.lstBmwRequisitionDetails[i].id)+'"></td>'
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].bmwUserId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ finalDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].department
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].bagColour
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].weightOfBag
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].pickupLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].drop_Location
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].nurseInCharge	
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].callerName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].callerNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].bag_Status
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].remark
						+ '</td>'
				/*		+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editBmwRequisitionDetails('
						+ r.lstBmwRequisitionDetails[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteBmwRequisitionDetails('
						+ r.lstBmwRequisitionDetails[i].id
						+ ')><i class="fa fa-trash-o"></i></button></td>'*/
                        + ' <td class="col-md-1 center" id="bmwUserId" value="'+r.id+'" style="display:none">'
						+ '</td>'
						+ '</tr>';
			index++;
		}
	}
	$("#bmwRequisitionDetails").html(htm);
	}
}

function saveBmwRequisitionDetailsMaster() {
	
	var Id = $('#bmwMasterId').val();
	var bmwUserId = $('#bmwUserId').val();
	var createdDate = $('#createdDate').val();
	var bag_ID = $('#bag_ID').val();
	var WeightOfBag = $('#WeightOfBag').val();
	var PickupLocation = $('#PickupLocation').val();
	var Drop_Location = $('#Drop_Location').val();
	var nurse = $('#nurse').val();
	var CallerName = $('#CallerName').val();
	var CallerNumber = $('#CallerNumber').val();
	var bag_status = $('#bag_status').val();
	//var nurse = $('#nurse').val();
	//NurseInCharge=0;
	var Remark = $('#Remark').val();
	
	if (PickupLocation == "" || PickupLocation == undefined
			|| PickupLocation == null) {
		 alert("Please enter BmwRequisition Details");
		return false;
	}

	
	var inputs = [];
	inputs.push('Id=' + Id);
	inputs.push('bmwUserId=' + bmwUserId);
	inputs.push('createdDate=' + createdDate);
	inputs.push('bag_ID=' + bag_ID);
	inputs.push('WeightOfBag=' + WeightOfBag);
	inputs.push('PickupLocation=' + PickupLocation);
	inputs.push('Drop_Location=' + Drop_Location);
	inputs.push('nurseId=' + nurseId);
	inputs.push('CallerName=' + CallerName);
	inputs.push('CallerNumber=' + CallerNumber);
	inputs.push('bag_status=' + bag_status);
	//inputs.push('nurseId=' + nurse);
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
			alert(PickupLocation);
			if (data == 1) {
				alertify.success("BmwRequisitionDetails Saved Sucessfully");
				clearBmwRequisitionDetailsMaster();
				//getAllAmbulancePatient();
			} else if (data == 2) {
				alertify.success("BmwRequisitionDetails Updated Sucessfully");
				clearBmwRequisitionDetailsMaster();
				//getAllAmbulancePatient();
			} else if (data == 3) {
				alertify.success("BmwRequisitionDetails already present");
				clearBmwRequisitionDetailsMaster();
				//getAllAmbulancePatient();
			}
		}
	});
}

function getstatustypes()
{	   
    jQuery.ajax({
        async 	: true,
        type 	: "GET",
        url 	: "ehat/bmwStatus/getstatustypes",
        success : function(r) {
        
        var divContent = "<option value='0'>--Select--</option>";
        
        for ( var i = 0; i < r.bmwStatusDto.length; i++){   
        	divContent = divContent + "<option value='"+r.bmwStatusDto[i].statusID+"' >"+r.bmwStatusDto[i].bag_Status+"</option>";
		}      
		$("#bag_Status").html(divContent);
        	       	
        }
    });
}