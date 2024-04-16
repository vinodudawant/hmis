function validateContactNumOnly(evt) {
	evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    alert("Enter Number Only.!!!");
        return false;
    }
    return true;
}

function validateAlphabetsByRegExpression(id){
	var reg = /^[A-Za-z]+$/;
	var value = $('#' + id).val();
	
	if (value != "" && !reg.test(value)) {
		alert("Please Enter Only Alphabets!");
		$('#' + id).val("");
		return false;
	}
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
			$("#department_for_form").html(htm);
		}
	});
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
	$("#wardTypeSelect").select2();
	
	$("#wardTypeSelect_for_header1").html(list);
	$("#wardTypeSelect_for_header1").select2();
}

function wardName(id)
{
	var value = $("#wardTypeSelect").find(':selected').attr('data-name');
	$("#wardName").val(value);
	var  selfid = $("#wardTypeSelect").find(':selected').attr('data-selfid');
	$("#wardHallSelect").val(selfid);
	$('#wardHallSelect').attr("disabled", true); 
	
}

function getNurse(){
	
    var inputs = [];
  
    inputs.push('id=' + 1);  
   
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: false,
        type 	: "GET",
        data 	: str + "&reqType=AJAX",
        url 	: "ehat/bmwRequisition/getNurse",
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

function getbagtypes()
{	   
    jQuery.ajax({
        async 	: true,
        type 	: "GET",
        url 	: "ehat/typeOfBag/getbagtypes",
        success : function(r) {
        
        var divContent = "<option value='0'>--select--</option>";
        
        for ( var i = 0; i < r.typeOfbagdto.length; i++){   
        	divContent = divContent + "<option value='"+r.typeOfbagdto[i].bag_ID+"' >"+r.typeOfbagdto[i].bag_type+"</option>";
		}      
		$("#bag_ID").html(divContent);
		$("#bag_ID").select2();      	       	
        }
    });
}

function saveBmwRequisitionDetailsMaster() {
	
	var Id = $('#bmwMasterId').val();
	var bmwUserId = $('#bmwUserId').val();
	var Time = $('#Time').val();
	var Department = $('#department_form').val();
	var TypeOfBag = $('#bag_ID').val();
	var BagColour = $('#bag_ID option:selected').text();
	if(BagColour=="--select--")
	{
		BagColour ="-";
	}
	var PickupLocation = $('#PickupLocation').val();
	var CallerName = $('#CallerName').val();
	var WardId = $('#wardTypeSelect').val();
	
	var WardName = $('#wardTypeSelect option:selected').text();
	if(WardName=="--Select--")
		{
			WardName ="-";
		}
	var WeightOfBag = $('#WeightOfBag').val();
	var CallerNumber = $('#CallerNumber').val();
	var Drop_Location = $('#Drop_Location').val();
	var nurse = $('#nurse').val();
	var NurseInCharge = $('#nurse option:selected').text();
	if(NurseInCharge=="select")
	{
		NurseInCharge ="-";
	}
	var Remark = $('#Remark').val();
	
	if (Department == "" || Department == undefined ||
			Department == "0" || Department == null ||
			TypeOfBag == "" || TypeOfBag == undefined ||
			TypeOfBag == "0" || TypeOfBag == null ||
			WardName == "" || WardName == undefined
			|| WardName == null ||
			nurse == "" || nurse == undefined ||
			nurse == "0" || nurse == null ||
			PickupLocation == "" || PickupLocation == undefined
			|| PickupLocation == null ||
			Drop_Location == "" || Drop_Location == undefined
			|| Drop_Location == null ||
			WeightOfBag == "" || WeightOfBag == undefined
			|| WeightOfBag == null ||
			CallerName == "" || CallerName == undefined
			|| CallerName == null  ||
			CallerNumber == "" || CallerNumber == undefined
			|| CallerNumber == null
			) {
		 alert("Please Enter All BmwRequisition Details !");
		return false;
	}

	
	var inputs = [];
	inputs.push('Id=' + Id);
	inputs.push('bmwUserId=' + bmwUserId);
	inputs.push('Time=' + Time);
	inputs.push('Department=' + Department);
	inputs.push('TypeOfBag=' + TypeOfBag);
	inputs.push('BagColour=' + BagColour);
	inputs.push('PickupLocation=' + PickupLocation);
	inputs.push('CallerName=' + CallerName);
	inputs.push('WardId=' + WardId);
	inputs.push('WardName=' + WardName);
	inputs.push('WeightOfBag=' + WeightOfBag);
	inputs.push('CallerNumber=' + CallerNumber);
	inputs.push('Drop_Location=' + Drop_Location);
	inputs.push('nurseId=' + nurse);
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
			
			if (data == 1) {
				alertify.success("BmwRequisitionDetails Saved Sucessfully");
				closeBmwRequisitionForm();
				getBmwRequisitionDetailsMaster();
				
			} else if (data == 2) {
				alertify.success("BmwRequisitionDetails Updated Sucessfully");
				clearBmwRequisitionDetails();
				getBmwRequisitionDetailsMaster();
				
			} else if (data == 3) {
				alertify.success("BmwRequisitionDetails already present");
				clearBmwRequisitionDetailsMaster();
				
			}
		}
	});
}

function clearBmwRequisition(){
	
	$('#department').val("0");
	$('#department').attr('disabled', false);
	$('#bag_ID').val("0");
	$('#bag_ID').attr('disabled', false);
	$('#PickupLocation').val("");
	$('#PickupLocation').attr('disabled', false);
	$('#CallerName').val("");
	$('#CallerName').attr('disabled', false);
	$('#wardTypeSelect').val("0");
	$('#wardTypeSelect').attr('disabled', false);
	$('#WeightOfBag').val("");
	$('#WeightOfBag').attr('disabled', false);
	$('#CallerNumber').val("");
	$('#CallerNumber').attr('disabled', false);
	$('#Drop_Location').val("");
	$('#Drop_Location').attr('disabled', false);
	$('#nurse').val("");
	$('#nurse').attr('disabled', false);
	$('#Remark').val("");
	$('#Remark').attr('disabled', false);
}

function getNextAutoIncrement(){
	
	jQuery.ajax({
		type : "GET",
		url : "ehat/bmwRequisition/getNextAutoIncrement",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			//alertify.error(response);
			$("#bmwUserId").val(response);
			
		}
	});
}

function clearBmwRequisitionDetails() {
	
	$('#bmwuserId').val('');
	$('#bmwMasterId').val('');
	$('#Time').val('');
	$('#department_form').select2('val','0');
	$('#bag_ID').select2('val','0');
	$('#PickupLocation').val('');
	$('#CallerName').val('');
	$('#wardTypeSelect').select2('val','0');
	$('#WeightOfBag').val('');
	$('#CallerNumber').val('');
	$('#Drop_Location').val('');
	$('#nurse').select2('val','0');
	$('#Remark').val('');
	
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