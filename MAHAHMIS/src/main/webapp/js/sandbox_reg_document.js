/***********
 * @author	: Dayanand Khandekar
 * @reason	: generate mobile otp for document registration
 **********/ 
function generateOtpByMobile(){
	
	
	var mobileNo = $("#mobileNo").val();
	
	var inputs = [];	
	inputs.push('mobileNo='+mobileNo);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/generateOtpForDocument",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var txnId=r.txnId;
			if(txnId!=null || txnId!="" || txnId!=undefine){
				
				localStorage.setItem("txnIdDoc", txnId);
				alertify.success("mobile otp has been send successfully");
			}
			else{
				var res = r.details[0].message
				alertify.error(res);
			}

			
		},
	});
	
}


/***********
 * @author	: Dayanand khandekar
 * @reason	: verify mobile otp for document registration
 **********/
function verifyMobileOtp(){
	
	
	var otp = $("#mobileOtp").val();
	
	//localStorage.setItem("txnId", obj.txnId);
	var tnxId = localStorage.getItem("txnIdDoc");
	
	var inputs = [];	
	inputs.push('otp='+otp);
	inputs.push('txnId='+tnxId)
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/verifyMobileOTPForDocument",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			txnId=r.txnId;
			if(txnId!=null || txnId!="" || txnId!=undefine){
				alertify.success("OTP has been verify successfully");
			}
			else{
				var res = r.details[0].message
				alertify.error(res);
			}
			
		},
	});
	
}


function generateHealtIdByDocument(){
	var firstName = $("#firstName").val();
	var lastName = $("#lastName").val();
	var districtCode = $("#districtCode").val();
	var documentType = $("#documentType").val();
	var documentNumber = $("#documentNumber").val();
	var gender = $("#gender").val();
	var mobileNumber = $("#mobileNumber").val();
	var stateCode = $("#stateCode").val();
	var yearOfBirth = $("#yearOfBirth").val();
	var txnId = localStorage.getItem("txnIdDoc");
	
	var inputs = [];	
	inputs.push('firstName='+firstName);
	inputs.push('lastName='+lastName);
	inputs.push('districtCode='+districtCode);
	inputs.push('documentType='+documentType);
	inputs.push('documentNumber='+documentNumber);
	inputs.push('gender='+gender);
	inputs.push('mobileNumber='+mobileNumber);
	inputs.push('stateCode='+stateCode);
	inputs.push('yearOfBirth='+yearOfBirth);
	inputs.push('txnId='+txnId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/generateHealtIdByDocument",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var healthId=r.healthId;
			if(healthId!=null || healthId!="" || healthId!=undefined){
				alertify.success("healthId has been Generated successfully");
			}
			else{
				var res = r.details[0].message
				alertify.error(res);
			}
			
		},
	});
}


function verifyDocument(){
	
	var firstName = $("#firstName").val();
	var lastName = $("#lastName").val();
	var districtCode = $("#districtCode").val();
	var documentType = $("#documentType").val();
	var documentNumber = $("#documentNumber").val();
	var gender = $("#gender").val();
	var mobileNumber = $("#mobileNumber").val();
	var stateCode = $("#stateCode").val();
	var yearOfBirth = $("#yearOfBirth").val();
	//var txnId = localStorage.getItem("txnIdDoc");
	
	var inputs = [];	
	inputs.push('firstName='+firstName);
	inputs.push('lastName='+lastName);
	inputs.push('districtCode='+districtCode);
	inputs.push('documentType='+documentType);
	inputs.push('documentNumber='+documentNumber);
	inputs.push('gender='+gender);
	inputs.push('mobileNumber='+mobileNumber);
	inputs.push('stateCode='+stateCode);
	inputs.push('yearOfBirth='+yearOfBirth);
	//inputs.push('txnId='+txnId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/verifyDocument",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var healthIdNumber=r.healthIdNumber;
			if(healthIdNumber!=null || healthIdNumber!="" || healthIdNumber!=undefined){
				alertify.success("Document Verify  successfully");
			}
			else{
				var res = r.details[0].message
				alertify.error(res);
			}
			
		},
	});
}



/***********
 * @author	: Dayanand Khandekar
 * @reason	:to save the care context 
 **********/ 
function saveCareContext(){
	
	
	var healthId = $("#healthId").val();
	if(healthId == "" || healthId==null || healthId == "null" || healthId == undefined || healthId == "undefined"){
		alert("Please Enter HealthId First");
		return false;
	}
	
	
	var careContext = $("#careContext").val();
	
	if(careContext == "" || careContext==null || careContext == "null" || careContext == undefined || careContext == "undefined"){
		alert("Please Enter Care Context First");
		return false;
	}
	
	var inputs = [];	
	inputs.push('helathId='+healthId);
	inputs.push('careContext='+careContext);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/saveCareContext",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if( r > 0){
				alert("Care Context Added Successfully");
			}else{
				//alert("Network Issue");
			}

			
		},
	});
	
}

function authInit(){
	
	
	var id="@sbx";
	var health = $('#sbx').val();
	var healthId=health+id;
	
	//var healthId = $('#healthId').val();
	var authType = $('#authType1').val();
	var purpose = $('#purpose').val();
	
	
	var inputs = [];	
	inputs.push('healthId='+healthId);
	inputs.push('authType='+authType);
	inputs.push('purpose='+purpose);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/authInit",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
//			var resultError = JSON.parse(r);
//			if(resultError!="" && resultError!=null){
//				alertify.error(resultError.details[0].message);
//				return 0;
//			}
			alertify.success("Verify Successfully");
			
			
		}
	});
}

function authConfirm(){
	
	
	var id="@sbx";
	var health = $('#sbx').val();
	var healthId=health+id;
//	var healthId = $('#healthId').val();
	var authType = $('#authType1').val();
	
	if(authType=='MOBILE_OTP'){
		
		var otp = $('#otp').val();
		
		var inputs = [];	
		inputs.push('healthId='+healthId);
		inputs.push('otp='+otp);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/sandbox/authConfirmWithMobile",
			timeout : 1000 * 60 * 5, 
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alertify.success(" Verify  successfully");
				
				
			}
		});
		
	}
	
	else if(authType=='DEMOGRAPHICS'){
		
		var fullName = $('#fullName').val();
		var dob = $('#dateOfBirth').val();
		var gender = $('#gender').val();
		
		var inputs = [];	
		inputs.push('healthId='+healthId);
		inputs.push('fullName='+fullName);
		inputs.push('dob='+dob);
		inputs.push('gender='+gender);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/sandbox/authConfirmWithDemographic",
			timeout : 1000 * 60 * 5, 
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alertify.success(" Verify  successfully");
				
			}
		});
		
	}	
}


/***********
 * @author	: Dayanand Khandekar
 * @reason	:to save the care context 
 **********/ 
function addCareContextByMobileOTP(){
	
	var id="@sbx";
	var health = $('#sbx').val();
	var healthId=health+id;
	//var healthId = $("#healthId").val();
	if(healthId == "" || healthId==null || healthId == "null" || healthId == undefined || healthId == "undefined"){
		alert("Please Enter HealthId First");
		return false;
	}
	
	
	
	var careContext = $("#careContext").val();
	
	var today = new Date();                         
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();                            
   // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();                          
    var dateTime = date; 
    //alert(dateTime);
    careContext = careContext+"-"+dateTime;
	
	if(careContext == "" || careContext==null || careContext == "null" || careContext == undefined || careContext == "undefined"){
		alert("Please Enter Care Context First");
		return false;
	}
	
	var inputs = [];	
	inputs.push('helathId='+healthId);
	inputs.push('careContext='+careContext);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/addCareContextByMobileOTP",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if( r > 0){
				alertify.success(" Care Context Added Successfully");
				//alert("Care Context Added Successfully");
			}else{
				//alert("Network Issue");
			}

			
		},
	});
	
}

function changeFlowId(flowId){
	
	var inputs = [];	
	inputs.push('flowId='+flowId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/changeFlowId",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if( r > 0){
				alertify.success(" Record Updated Successfully");
				//alert("Care Context Added Successfully");
			}else{
				//alert("Network Issue");
			}

			
		},
	});
}
