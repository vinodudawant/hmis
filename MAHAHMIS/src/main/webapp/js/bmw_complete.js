function goBack() {
	
	window.location = "BMW_assign.jsp?";
}

function completeBmwRequisition() {

	//alert($("input[name='fmdocid']:checked").length);
	//return false;	
	
	var docId = new Array();
	//var userId		= parseInt($("#userId").val());
	var userId1;
	$("input[name='fmdocid']:checked").each(function() {	
		
		currentId = $("#" + this.id).val();
		
		//alert("currentId:: "+currentId)
		
		/*var slaveId=$("#bmwUserId"+$(this).val()).val();
		var slaveId=$("#masterId1").val();*/
		
		if(currentId >0){
			docId.push(currentId);
			/*docId.push($(this).attr('id'));
			
			docId.push($("#bmwUserId"+$(this).val()).val());*/
		}
	});
	
	var inputs = [];

	alert("Are You Sure Want To Complete Requisition..");
	
	 if($("input[name='fmdocid']:checked").length == 0){
		 alert("Plz Select At Least One Record to Complete");
		 return false;
	 }
	 
	 var userId = 0;
	
	 inputs.push('id=' + docId);
	 inputs.push('userId=' + userId);
	 var str = inputs.join('&');
	
	jQuery.ajax({
		type : "GET",
		url : "ehat/bmwRequisition/completeBmwRequisition",
		data : str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			
			if (data==1) {
				alertify.success("Record Completed Sucessfully");
				
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

function openBmwCompleteJsp()
{
	window.location = "BMW_complete.jsp?";
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
	inputs.push('status='+"Assigned");
	
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
	
	getBMWusers(r.lstBmwRequisitionDetails.length);
	
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
						+ r.lstBmwRequisitionDetails[i].wardName
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
						+' <td class="col-md-1 center">'
						+ '	<input type="checkbox" id="bmwUserId'+index+'" name="fmdocid" value="'+r.lstBmwRequisitionDetails[i].id+'"></td>'
					//	+ ' <td class="col-md-1 center">'
						+r.lstBmwRequisitionDetails[i].collect
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '<div class="form-group">'
						+ '<select class="form-select" name="assign_to" id="assign'+i+'" ></select>' 
						+ '</div>'		
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].remark
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
						+ r.lstBmwRequisitionDetails[i].wardName
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
						+ r.lstBmwRequisitionDetails[i].collect
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '<div class="form-group">'
						+ '<select class="form-select" name="assign_to" id="assign" ></select>' 
						+ '</div>'	
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstBmwRequisitionDetails[i].remark
						+ '</td>'
						/*+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editBmwRequisitionDetails('+r.lstBmwRequisitionDetails[i].bmwUserId+')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteBmwRequisitionDetails('+r.lstBmwRequisitionDetails[i].bmwUserId+')><i class="fa fa-trash-o"></i></button></td>'*/
						+ '</tr>';
						index++;
			index++;
		}
	}
	$("#bmwRequisitionDetails").html(htm);
	}
}

function getallbagtypes()
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

function getBMWusers(count)
{	   
	
    jQuery.ajax({
        async 	: true,
        type 	: "GET",
        url 	: "ehat/bmwRequisition/getBMWusers",
        success : function(r) {
        
        var divContent = "<option value='0'>--Select--</option>";
        
        for ( var i = 0; i < r.usersList.length; i++){   
        	divContent = divContent + "<option value='"+r.usersList[i].user_ID+"' >"+r.usersList[i].f_name+" "+r.usersList[i].l_name+"</option>";
		}    
        
        for(var j=0; j < count;j++)
        {
    		$("#assign"+j).html(divContent);
        }
        	       	
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