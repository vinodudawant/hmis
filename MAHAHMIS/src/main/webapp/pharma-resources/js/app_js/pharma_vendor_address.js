
/***@author    :Akshata Desai
 * @Code       :For fetching city list*****/

function fetchTalukaListForReg(TalukaType) {
	var inputs = [];
//	inputs.push('action=fetchTalukaList');
	inputs.push('TalukaType=' + encodeURIComponent(TalukaType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/vendor/fetchTalukaListForReg",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			/*var ajaxResponse = r;
			
			 $("#taluka").html(ajaxResponse);
			 
			var obj = eval('(' + ajaxResponse + ')');*/
			setTempAllForCity(r);
				
		}
	});
}
function setTempAllForCity(data) {
	var list = "<option value='0'>--Select City--</option>";    
     for(var i=0;i<data.cityList.length;i++) {    

        list = list + "<option value='"+data.cityList[i].taluka_name+"'>" + (data.cityList[i].taluka_name) + "</option>";    
        }  
    $("#talukaId").html(list);
  //  $("#taluka_id").val(data.talukaList[i].taluka_id);
    
    fetchDistrictListForReg('district');
}

/****@author     :Akshata Desai
 * @Code         :For fetching district list****/
function fetchDistrictListForReg(DistrictType) {
	
	var inputs = [];
	//inputs.push('action=fetchDistrictList');
	
	inputs.push('TalukaType=' + encodeURIComponent(DistrictType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/vendor/fetchDistrictListForReg",
	
		error : function() {
			alert('error');
		},
		success : function(r) {
			/*var ajaxResponse = r;
		
			 $("#district").html(ajaxResponse);
			 
			var obj = eval('(' + ajaxResponse + ')');*/
			setTempAllForDistrict(r);
				
		}
	});
}
function setTempAllForDistrict(data) {
	var list = "<option value='0'>--Select District--</option>";    
     for(var i=0;i<data.lstDistrictMaster.length;i++) {    
    	
    		 list = list + "<option value='"+data.lstDistrictMaster[i].district_name+"'>" + (data.lstDistrictMaster[i].district_name) + "</option>"; 
		
          
        }  
    $("#districtId").html(list);
}

/****@author     :Akshata Desai
 * @Code         :For fetching state list****/
function fetchStateListForReg(StateType) {
	var inputs = [];
	//inputs.push('action=fetchStateList');
	
	inputs.push('StateType=' + encodeURIComponent(StateType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/vendor/fetchStateListForReg",
		
		error : function() {
			alert('error');
		},
		success : function(r) {
			/*var ajaxResponse = r;
			
			 $("#state").html(ajaxResponse);
			
			var obj = eval('(' + ajaxResponse + ')');*/
			setTempAllForState(r);
	
		}
	});
}

function setTempAllForState(data) {
	//alert(data.length);
	var list = "<option value='0'>--Select State--</option>";    
     for(var i=0;i<data.lstStateMaster.length;i++) {    

        list = list + "<option value='"+data.lstStateMaster[i].state_id+"'>" + (data.lstStateMaster[i].state_name) + "</option>";    
        }  
    $("#stateId").html(list);
}
/****@author     :Akshata Desai
 * @Code         :For adding one by one TR*****/

var index=1;
function AddData(){
	var xyz=$('#rowcountAdd').val();
	var AddBTN =$('#AddBTN').val();
	if (AddBTN == 'Y') {
		setonAdd();
		return false;
	}
	var i=xyz;
	var talukaname             = $('#talukaId option:selected').text();
	var districaname           = $('#districtId option:selected').text();
	var stateId               = $('#stateId').val();
	var statename              = $('#stateId option:selected').text();
	
	var pincode                = $('#pincode').val();
	var address                = $('#txtAddress').val();
	var vendorArea             = $('#txtArea').val();
	var vendorLandline         = $('#txtLandline').val();
	var vendorMobileNumber     = $('#txtMobile').val();
	var vendorEmailId          = $('#txtEmailId').val();
	var gstNo                  = $('#gstNo').val();
    
	if (vendorArea == "" || vendorArea == null || vendorArea == undefined ) {
		alert("Enter Vendor Area");
		$('#txtArea').focus();
		return false;
	}
	if (vendorMobileNumber <= 0 && vendorLandline <= 0) {
		alert("Enter Vendor Mobile Number Else Enter Vendor LandLine Number");
		$('#txtMobile').focus();
		return false;
		
	
	}/*else if(landlinlength > 0){
		if (vendorLandline == "" || vendorLandline == null || vendorLandline == undefined || isNaN(vendorLandline)) {
			alert("Enter Vendor LandLine Number");
			$('#txtLandline').focus();
			return false;
		}
		if (vendorMobileNumber == "" || vendorMobileNumber == null || vendorMobileNumber == undefined || isNaN(vendorMobileNumber)) {
			alert("Enter Vendor Mobile Number");
			$('#txtMobile').focus();
			return false;
		}
	}*/

		
	if (gstNo == "" || gstNo == null || gstNo == undefined ) {
		alert("Enter Vendor GST No");
		$('#gstNo').focus();
		return false;
	}
	
	if (pincode == "" || pincode == null || pincode == undefined || isNaN(pincode)) {
		pincode = 0;
	}
	
    $('#addresstable').append('<tr><td id="count">'+index+'</td>'
    		+'<td  ><input id="txtAddress'+i+'" type="hidden" path="vendorAddresses['+i+'].vendorAddress" name="vendorAddresses['+i+'].vendorAddress" value="'+address+'"/>'+address+'</td>'
    		+'<td ><input id="talukaId'+i+'" type="hidden" path="vendorAddresses['+i+'].city" name="vendorAddresses['+i+'].city" value="'+talukaname+'"/>'+talukaname+'</td>'
    		+'<td ><input id="districtId'+i+'" type="hidden" path="vendorAddresses['+i+'].district" name="vendorAddresses['+i+'].district" value="'+districaname+'"/>'+districaname+'</td>'
    		+'<td ><input id="stateId'+i+'" type="hidden" path="vendorAddresses['+i+'].state" name="vendorAddresses['+i+'].state" value="'+statename+'"/>'+statename+'</td>'
    		+'<td ><input id="gstNo'+i+'" type="hidden" path="vendorAddresses['+i+'].gstNo" name="vendorAddresses['+i+'].gstNo" value="'+gstNo+'"/>'+gstNo+'</td>'
    		
    		
    		+'<td ><input id="txtMobile'+i+'" type="hidden" path="vendorAddresses['+i+'].vendorMobileNumber" name="vendorAddresses['+i+'].vendorMobileNumber" value="'+vendorMobileNumber+'"/>'+vendorMobileNumber+'</td>'
    		+'<td  ><input id="txtEmailId'+i+'" type="hidden" path="vendorAddresses['+i+'].vendorEmailId" name="vendorAddresses['+i+'].vendorEmailId" value="'+vendorEmailId+'"/>'+vendorEmailId+'</td>'
    		
    		+'<td  class="hide"><input id="pincode'+i+'" type="hidden" path="vendorAddresses['+i+'].pincode" name="vendorAddresses['+i+'].pincode" value="'+pincode+'"/>'+pincode+'</td>'
    		
    		+'<td  class="hide"><input id="txtArea'+i+'" type="hidden" path="vendorAddresses['+i+'].vendorArea" name="vendorAddresses['+i+'].vendorArea" value="'+vendorArea+'"/>'+vendorArea+'</td>'
    		+'<td  class="hide"><input  id="txtLandline'+i+'" type="hidden" path="vendorAddresses['+i+'].vendorLandline" name="vendorAddresses['+i+'].vendorLandline" value="'+vendorLandline+'"/>'+vendorLandline+'</td>'
    		
    		
    		+'<td  class="hide"><input id="stateId'+i+'" type="hidden" path="vendorAddresses['+i+'].stateId" name="vendorAddresses['+i+'].stateId" value="'+stateId+'"/>'+stateId+'</td>'
    		
    );
    
   
    xyz++;
    index++;
    
    $('#talukaId').val(0);
	$('#districtId').val(0);
	$('#stateId').val(0);
	$('#pincode').val('');
	$('#txtAddress').val('');
	$('#txtArea').val('');
	$('#txtLandline').val('');
	$('#txtMobile').val('');
	$('#txtEmailId').val('');
	$('#gstNo').val('');
    $('#txtLandline').val('');
}
