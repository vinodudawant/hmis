function getDepts_for_header() {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dept/viewAllDeptListAll",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var htm = "<option value='0'>--Select--</option>";
			for ( var i = 0; i < r.lstDepts.length; i++) {
		
				htm = htm + "<option id="+r.lstDepts[i].deptId+">"+r.lstDepts[i].deptName+"</option>";
			}
			$("#department").html(htm);
			$("#department").select2();

			$("#department_form").html(htm);
			$("#department_form").select2();
			
		}
	});
}

function openBmwForm()
{
	$("#add-edit-form").show();
	
	//window.location = "BMW_requisition_from1.jsp?";
}

function closeBmwRequisitionForm()
{
	window.location = "BMW_requisition_from1.jsp?";
	$("#add-edit-form").hide();
}

function fetchWardName_for_header()
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
				fetchWardName_for_header1(r);
			}
	});	
}

function fetchWardName_for_header1(r)
{
	var list="";
	list=list+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		list=list+'<option  value="'+(r.lstChargesSlave[int].slaveId)+'"  data-selfid="'+r.lstChargesSlave[int].selfId+'" data-name="'+r.lstChargesSlave[int].categoryName+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		}	
	$("#wardTypeSelect_for_header").html(list);
}

function wardName(id)
{
	var value = $("#wardTypeSelect").find(':selected').attr('data-name');
	$("#wardName").val(value);
	var  selfid = $("#wardTypeSelect").find(':selected').attr('data-selfid');
	$("#wardHallSelect").val(selfid);
	$('#wardHallSelect').attr("disabled", true); 
	
}

function getBmwRequisitionDetailsMaster(callfrom){
	
	var inputs = [];
	inputs.push('status='+callfrom);
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
						+ r.lstBmwRequisitionDetails[i].pickupLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].callerName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].wardName	
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].weightOfBag
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].drop_Location
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].callerNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].nurseInCharge
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].bag_Status
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].remark
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editBmwRequisitionDetails('
						+ r.lstBmwRequisitionDetails[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteBmwRequisitionDetails('
						+ r.lstBmwRequisitionDetails[i].id
						+ ')><i class="fa fa-trash-o"></i></button></td>'
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
						+ r.lstBmwRequisitionDetails[i].pickupLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].callerName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].wardName	
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].weightOfBag
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].drop_Location
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].callerNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].nurseInCharge
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].bag_Status
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].remark
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editBmwRequisitionDetails('
						+ r.lstBmwRequisitionDetails[i].bmwUserId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteBmwRequisitionDetails('
						+ r.lstBmwRequisitionDetails[i].bmwUserId
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				index++;
			};
	}
	$("#bmwRequisitionDetails").html(htm);
  }
}
function editBmwRequisitionDetails(bmwUserId){	
	//openBMWJSP();
	$("#add-edit-form").show();
	var inputs = [];
	inputs.push('bmwUserId=' + bmwUserId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bmwRequisition/editBmwRequisitionDetailsMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
				
					$('#bmwMasterId').val(r.id);
					$('#bmwUserId').val(r.bmwUserId);
					$('#department_form').select2('val',r.department);
					$('#bag_ID').select2('val',r.typeOfBag);
					$('#PickupLocation').val(r.pickupLocation);
					$('#CallerName').val(r.callerName);
					$('#wardTypeSelect').select2('val',r.wardId);
					$('#WeightOfBag').val(r.weightOfBag);
					$('#Drop_Location').val(r.drop_Location);
					$('#CallerNumber').val(r.callerNumber);
					$('#nurse').select2('val',r.nurseId);
					$('#Remark').val(r.remark);

		}
	});
}

function getBmwRequisitionDetailsList(){

jQuery.ajax({
	async : true,
	type : "GET",
	url : "ehat/bmwRequisition/getBmwRequisitionDetailsList",
	 timeout : 1000 * 60 * 5, 
	cache : false,
	error : function() {
		alert('error');
	},
	success : function(r) {
		setBmwRequisitionDetailsMaster(r);
	},
});
}

function deleteBmwRequisitionDetails(bmwUserId){
	
	if(bmwUserId !=undefined && bmwUserId!=null && bmwUserId!="" && bmwUserId!="null"){
	
		var r = confirm("Are You Sure You Want To Delete Bmw Requisition Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/bmwRequisition/deleteBmwRequisitionDetailsMaster",
				data : {
					"id" : bmwUserId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getBmwRequisitionDetailsMaster("onload");
				}
			});
		}
	}
	
}

function getallbagtypes_header()
{	   
    jQuery.ajax({
        async 	: true,
        type 	: "GET",
        url 	: "ehat/typeOfBag/getbagtypes",
        success : function(r) {
        
        var divContent = "<option value='0'>--Select--</option>";
        
        for ( var i = 0; i < r.typeOfbagdto.length; i++){   
        	divContent = divContent + "<option value='"+r.typeOfbagdto[i].bag_ID+"' >"+r.typeOfbagdto[i].bag_type+"</option>";
		}      
		$("#typeOfBag").html(divContent);
        	       	
        }
    });
}

function openBMWJSP(){
	
	window.location = "BMW_requisition_from2.jsp?";

}

function searchbyFileters()
{
	var fdate = $("#fdate").val();
	var tdate = $("#tdate").val();

	var department = $("#department").val();
	var wardTypeSelect = $("#wardTypeSelect_for_header1").val();
	var typeOfBag = $("#typeOfBag").val();
	var bag_Status = $("#bag_Status option:selected").text();
	
	if(typeOfBag == null || typeOfBag == "null" || typeOfBag == "")
	{
		typeOfBag = 0;
	}

	
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

function validateNumberLenght(id)
{
	var val_id = $("#"+id).val();
	var length = val_id.length;
	
	//alert("lenght:: "+length)
	
	if(length >= 10)
	{
		alert("Mobile number must be 10 digits!");
		return false;
	}
}