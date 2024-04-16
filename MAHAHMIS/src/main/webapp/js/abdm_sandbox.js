
/***********
  * @author	: Vishant Pawar
  * @date	: 23-11-2022
  * @reason	: search health id by mobile number
  **********/ 
function searchByMobile(){
	
	
	var mobile = $("#mobile").val();
	/*var fName = $.trim($("#fName").val());
	var mName = $.trim($("#mName").val());
	var lName = $.trim($("#lName").val());
	var gender = $("#gender").val();
	var yearOfBirth = $("#dob").val();
	
	var name = fName +" " +mName+ " "+lName;*/
 	
	if(mobile.length==9){
	
	var inputs = [];	
	inputs.push('mobile='+mobile);
	/*inputs.push('name='+name);
	inputs.push('yearOfBirth='+yearOfBirth);
	inputs.push('gender='+gender);*/
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/searchByMobile",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			//var obj = eval('(' + r + ')');
			var obj = r;
			
			//if(obj.)
			
			if(obj.healthId != null && obj.healthIdNumber != null)
				{
				
				
//				set data in hidden field
				$("#healthId").val(obj.healthId);
				$("#healthIdNumber").val(obj.healthIdNumber);
				//localStorage.setItem("healthId", obj.healthId);
				//localStorage.setItem("healthIdNumber", obj.healthIdNumber);
				
				
					/*$("#patientId").val();
					$("#fName").val(obj.firstName);
					$("#lName").val(obj.lastName);
					$("#mName").val(obj.middleName);
					$("#gender").val(obj.gender);
					$("#mobile").val(obj.mobile);
					$("#emailId").val(obj.email);*/
		//		 	$("#dob").val();
		//			
		//			$("#month").val();
					
					/*$("#talukaId").val();//taluka
					$("#townId").val();//town
					$("#districtId").val(obj.districtName);//district
					$("#stateId").val(obj.stateName);//state
					$("#country").val();
					$("#areaCode").val();*/
				}
				else
				{
						alert("Record Not Found..!")
				}
		},
	});
	
	}
}

/***********
 * @author	: Vishant Pawar
 * @date	: 23-11-2022
 * @reason	: search health id by health id
 **********/ 
function searchByHealthId(){
	
	var id="@sbx";
	var health = $("#health").val();
	var healthId= health+id;

	var inputs = [];	
	inputs.push('healthId='+healthId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/searchByHealthId",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			var resultError = JSON.parse(r.resultError);
			var obj = JSON.parse(r.resultData);
			alert(r);
			if(resultError!="" && resultError!=null){
				alertify.error(resultError.details[0].message);
				return 0;
			}
	
			if(obj.healthId != null && obj.healthIdNumber != null)
			{
				
				
//				localStorage.setItem("healthId", obj.healthId);
//				localStorage.setItem("healthIdNumber", obj.healthIdNumber);
				
//				instead of local storage we can use hidden field //added by vishant
				$("#healthId").val(obj.healthId);
				$("#healthIdNumber").val(obj.healthIdNumber);
				
				
				const fullName  = obj.name;
				const [first, middle, last] = fullName.split(' ');
				$("#fName").val(first);
				$("#lName").val(last);
				$("#mName").val(middle);
				
				$("#patientName2").val(first+" "+last);
				
			}
			
		},
	});
	
}

/***********
 * @author	: Vishant Pawar
 * @date	: 23-11-2022
 * @reason	: generate aadhar otp
 **********/ 
function generateAadharOTP(){
	
	
	var aadhaar = $("#aadharNumber").val();
	
	  if (aadhaar.length > 0) {
	var inputs = [];	
	inputs.push('aadhaar='+aadhaar);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/generateOtp",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			
			if(r.errorResult!="" && r.errorResult!=null){
				
				var error = JSON.parse(r.errorResult);
				if(error.details[0].message!=null){
					alertify.error(error.details[0].message);
				}
				else{
					alertify.error(error.code+"-"+error.message);
				}
				return 0;
			}
		//	var obj = eval('(' + r + ')');
			var txnId=r.txnId;
			if(txnId!=null || txnId!="" || txnId!=undefine){
				
				localStorage.setItem("txnId", txnId);
				alertify.success("aadhar otp has been send successfully");
			}
			else{
				var res = r.details[0].message
				alertify.error(res);
			}
//			alert(obj);
			
		},
	});
	
	}
	
}

/***********
 * @author	: Vishant Pawar
 * @date	: 23-11-2022
 * @reason	: verify aadhar otp
 **********/
function verifyAadharOTP(){
	
	
	var otp = $("#verifyOTP").val();
	
	//localStorage.setItem("txnId", obj.txnId);
	var tnxId = localStorage.getItem("txnId");
	
	var inputs = [];	
	inputs.push('otp='+otp);
	inputs.push('txnId='+tnxId)
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/verifyOTP",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			
			if(r.errorResult!="" && r.errorResult!=null){
				
				var error = JSON.parse(r.errorResult);
				alertify.error(error.details[0].message)
				//alertify.error(error.message+"-"+error.message);
				return 0;
			}
			//var obj = eval('(' + r + ')');
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

/***********
 * @author	: Vishant Pawar
 * @date	: 23-11-2022
 * @reason	: generate mobile otp
 **********/
function generateMobileOTP(){
	
	
	var mobileNumber = $("#mobileNumber").val()
	var txnId = localStorage.getItem("txnId");
	
	var inputs = [];	
	inputs.push('mobile='+mobileNumber);
	inputs.push('txnId='+txnId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/generateMobileOTP",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			
			if(r.errorResult!="" && r.errorResult!=null){
				
				var error = JSON.parse(r.errorResult);
				if(error.details[0].message!=null){
					alertify.error(error.details[0].message);
				}
				else{
					alertify.error(error.code+"-"+error.message);
				}
					
				return 0;
			}
			//var obj = eval('(' + r + ')');
			var txnId=r.txnId;
			if(txnId!=null || txnId!="" || txnId!=undefine){
				
				localStorage.setItem("txnId", txnId);
				alertify.success("mobile otp has been send successfully");
			}
			else{
				var res = r.details[0].message
				alertify.error(res);
			}
//			alert(obj);
			
		},
	});
	
}

/***********
 * @author	: Vishant Pawar
 * @date	: 23-11-2022
 * @reason	: verify mobile otp
 **********/
function verifyMobileOTP1(){
	
	
	var otp = $("#verifyMobileOTP").val();
	
	//localStorage.setItem("txnId", obj.txnId);
	var txnId = localStorage.getItem("txnId");
	
	var inputs = [];	
	inputs.push('otp='+otp);
	inputs.push('txnId='+txnId)
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/verifyMobileOTP",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			//var obj = eval('(' + r + ')');
			
			if(r.errorResult!="" && r.errorResult!=null){
				
				var error = JSON.parse(r.errorResult);
				if(error.details[0].message!=null){
					alertify.error(error.details[0].message);
				}
				else{
					alertify.error(error.code+"-"+error.message);
				}
					
				return 0;
			}
			var txnId=r.txnId;
			if(txnId!=null || txnId!="" || txnId!=undefine){
				
				localStorage.setItem("txnId", txnId);
				alertify.success("mobile otp has been verify successfully");
				
//				$("#firstName").val();
//				$("#verifyMobileOTP").val();
//				$("#verifyMobileOTP").val();
			}
			else{
				var res = r.details[0].message
				alertify.error(res);
			}
			
		},
	});
	
}


/***********
 * @author	: Vishant Pawar
 * @date	: 23-11-2022
 * @reason	: create health id
 **********/
function createHealthIdWithPreVerified(){
	
	var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
	
	
	//var id="@sbx";
	var health = $('#sbx').val();
	var healthId=health;
	
	
	var firstName = "";//$("#firstName").val();
	var middleName = "";//$("#middleName").val();
	var lastName = "";//$("#lastName").val();
	var emailId = "";//$("#sandboxEmailId").val();
//	var healthId = $("#healthId").val();
	var password = "";//$("#sandboxPassword").val();
	
	var inputs = [];	
	inputs.push('fName='+firstName);
	inputs.push('mName='+middleName);
	inputs.push('lName='+lastName);
	inputs.push('email='+emailId);
	inputs.push('healthId='+healthId);
	inputs.push('password='+password);
	
//	if(password.match(decimal)) 
//	{ 
//		inputs.push('password='+password);
//	}
//	else
//	{ 
//		alert('password should be 8 to 15 characters which contain at least one lowercase, one uppercase, one numeric , and one special character...!')
//		return false;
//	}
	
	
	
	//txnId="74b01665-dd9d-4368-99e3-ca3976456324";
	var txnId = localStorage.getItem("txnId");
	inputs.push('txnId='+txnId);
	
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/createHealthIdWithPreVerified",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			const obj = r;
			
			if(r.errorResult!="" && r.errorResult!=null){
				
				var error = JSON.parse(r.errorResult);
				if(error.details[0].message!=null){
					alertify.error(error.details[0].message);
				}
				else{
					alertify.error(error.code+"-"+error.message);
				}
					
				return 0;
			}
			else{
				alert("health id generated successfully ABHA Address= "+obj.healthId +"  and ABHA Number= "+obj.healthIdNumber);
			}
			
			//var obj = eval('(' + r + ')');
			txnId=obj.txnId;
			
			
//			if(obj.token!="" && obj.token!=null){
				
				//alert(obj);
//				localStorage.setItem("healthId", obj.healthId);
//				localStorage.setItem("healthIdNumber", obj.healthIdNumber);
				
//				instead of local storage we can use hidden field //added by vishant
				$("#healthId").val(obj.healthId);
				$("#healthIdNumber").val(obj.healthIdNumber);
				//alert("health id created successfully"+ obj.healthId)
		//		alertify.success("health id created successfully");
				$("#patientId").val();
				$("#fName").val(obj.firstName);
				$("#lName").val(obj.lastName);
				$("#mName").val(obj.middleName);
				//$("#gender").select2('val',obj.gender);
				
				if(obj.gender == "M"){
					$("#gender").val('Male').change();
				   $("#prefix").select2('val',"Mr.");
				}
				else if(obj.gender == "F"){
					$("#gender").val('Female').change();
					 $("#prefix").select2('val',"Miss");
				}
				
				$("#mobile").val(obj.mobile);
				$("#emailId").val(obj.email);


				var dob = obj.dayOfBirth+"/"+obj.monthOfBirth+"/"+obj.yearOfBirth;
				
				
				var birthDate= dob.split("/");
				if(birthDate[0]<10){
					birthDate[0]="0"+birthDate[0]											
					}

				if(birthDate[1]<10){
					birthDate[1]="0"+birthDate[1]										
					}
		
				var dob = birthDate[0]+"/"+birthDate[1]+"/"+birthDate[2];
			 	$("#dob").val(dob);
				
			 	if (dob != "") {
					var ageString = getAgeYMD(dob);
					// alert(ageString);
					var ageStringArray = ageString.split("___");
					// alert(ageStringArray);
					$("#year").val(ageStringArray[0]);
					$("#month").val(ageStringArray[1]);
					$("#days").val(ageStringArray[2]);
					// var ageString = Y___M___D
				}
			 	
			 	$("#addressText").text(obj.address);
				$("#talukaId").val();//taluka
				$("#townId").val();//town
				$("#districtId").select2('val',obj.districtName);//district
				$("#stateId").select2('val',obj.stateName);//state
				$("#country").val();
				$("#areaCode").val();
				
//			}
//			else{
//				var res = obj.details[0].message
//				alertify.error(res);
//			}
			//alert(obj);
			
		},
	});
	
}

/***********
 * @author	: Vishant Pawar
 * @date	: 23-11-2022
 * @reason	: generate mobile otp for authentication
 **********/
function generateMobileOTPAuth(){
	
	
	var healthIdNumberAuth = $("#healthIdNumberAuth").val();
	var authType = $("#authType").val();
	
	var inputs = [];	
	inputs.push('healthIdNumberAuth='+healthIdNumberAuth);
	inputs.push('authType='+authType);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/authInit1",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			
			var json=JSON.parse(r);
		//	var obj = eval('(' + r + ')');
			var txnId=json.txnId;
			if(txnId!=null || txnId!="" || txnId!=undefine){
				
				localStorage.setItem("authInitTxnId", txnId);
				alertify.success("aadhar otp has been send successfully");
			}
			else{
				var res = json.details[0].message
				alertify.error(res);
			}
//			alert(obj);
			
		},
	});
	
}

/***********
 * @author	: Vishant Pawar
 * @date	: 23-11-2022
 * @reason	: verify mobile otp for authentication
 **********/
function verifyAadharOTPAuth(){
	
	
	var otp = $("#verifyAuthOTP").val();
	
	//localStorage.setItem("txnId", obj.txnId);
	var tnxId = localStorage.getItem("authInitTxnId");
	
	var inputs = [];	
	inputs.push('otp='+otp);
	inputs.push('txnId='+tnxId)
	
	
	var str = inputs.join('&');
	
	var authType = $("#authType").val();
	
	if(authType=="MOBILE_OTP"){
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/sandbox/confirmWithMobileOTP5",
			timeout : 1000 * 60 * 5, 
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				//alert(r);
				var json=JSON.parse(r);
				//var obj = eval('(' + r + ')');
				txnId=json.txnId;
				if(txnId!=null || txnId!="" || txnId!=undefine){
					alertify.success("OTP has been verify successfully");
				}
				else{
					var res = json.details[0].message
					alertify.error(res);
				}
				
			},
		});
	}
	if(authType=="AADHAAR_OTP"){
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/sandbox/confirmWithAadharOTP5",
			timeout : 1000 * 60 * 5, 
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				//alert(r);
				var json=JSON.parse(r);
				//var obj = eval('(' + r + ')');
				txnId=json.txnId;
				if(txnId!=null || txnId!="" || txnId!=undefine){
					alertify.success("OTP has been verify successfully");
				}
				else{
					var res = json.details[0].message
					alertify.error(res);
				}
				
			},
		});
	}
	
}

/***********
 * @author	: Vishant Pawar
 * @date	: 23-11-2022
 * @reason	: get dob year calculate
 **********/
function getAgeYMDSandbox(dateString) {

	var now = new Date();
	var today = new Date(now.getYear(), now.getMonth(), now.getDate());

	var yearNow = now.getYear();
	var monthNow = now.getMonth();
	var dateNow = now.getDate();

	var dob = new Date(dateString.substring(6, 10),
			dateString.substring(3, 5) - 1, dateString.substring(0, 2));

	// alert("dob: " + dob);

	var yearDob = dob.getYear();
	var monthDob = dob.getMonth();
	var dateDob = dob.getDate();
	var age = {};
	var ageString = "0___0___0";
	var seperatorString = "___";

	yearAge = yearNow - yearDob;

	if (monthNow >= monthDob)
		var monthAge = monthNow - monthDob;
	else {
		yearAge--;
		var monthAge = 12 + monthNow - monthDob;
	}

	if (dateNow >= dateDob)
		var dateAge = dateNow - dateDob;
	else {
		monthAge--;
		var dateAge = 31 + dateNow - dateDob;

		if (monthAge < 0) {
			monthAge = 11;
			yearAge--;
		}
	}

	age = {
		years : yearAge,
		months : monthAge,
		days : dateAge
	};

	if ((age.years > 0) && (age.months > 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else
		ageString = "0___0___0";

	// alert("Y___M___D: " + ageString);

	return ageString;


}


/***********
 * @author	: Vishant Pawar
 * @date	: 23-11-2022
 * @reason	: all below HIU Consent Methods 
 **********/
function temForSentConsentRequest(){
	
//	var patientName="";
//	var doctorName="";
//	
//	$("#consent_request").show();
//	
//	var treatmentId = $('#tr_Id').val();
//	
//	jQuery.ajax({
//		async : false,
//		type : "POST",
//		/*data : {
//			"callform" : r
//		},
//		url : "ehat/registration/fetchPatientsRecordByTreatmentId",*/
//		data : {
//			"treatmentId" : treatmentId
//		},
//		url : "ehat/opdbill/getPatientInfoByTreatmentId",
//		success : function(r) {
//			
//			//alert(r)
//			
//		patientName = r.listRegTreBillDto[0].patientName;
//		doctorName = r.listRegTreBillDto[0].consultingDocName;
//		}
//});
//	
//	$(".ehatList").removeClass("active");
//	$("#" + id).addClass("active");
//	$("#diets").hide();
//	$("#ipdDoctorStationJSPHeadDiv").html(" ");

//	var temp=  
//		'<div style="margin-bottom: 9px;" id="consentRequest" class="col-sm-12-1" id="row1">'
//		+ '<div style="margin-top: 10px; margin-left: 10px;" class="col-sm-2-1" id="col1">'
//		+ '<div class="form-group Remove-Padding col-sm-12-1">'
//		+ '<div class="divide-10"></div><label for="exampleInputEmail1"  class="TextFont">Patient Name</label>'
//		+ '<div id="consentPatientName"><input type="text" readonly="readonly" class="typeahead form-control input-SmallText"id="consentPatient" name="diagnosis">'
//		+ '</div><input type="hidden" value="0" id="EditFlag"></div></div>'
//		+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col2">'
//		+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
//		+ '<label for="exampleInputEmail1" class="TextFont">Doctor Name</label>'
//		+ '<div id="consentDoctorName"><input type="text" readonly="readonly" class="typeahead form-control input-SmallText" name="doctorName" id="doctorName">'
//		+ '</div></div></div><div style="margin-top: 10px;" class="col-sm-1" id="col3"></div>'
//		
//		+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col5">'
//		
//		+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
//		+ '<label for="exampleInputEmail1" class="TextFont">Health Info From</label>'
//		+ '<input type="date" class="form-control input-SmallText"  name="date" id="formDate">'
//		+ '</div></div><div style="margin-top: 10px;" class="col-sm-2-1" id="col6">'
//		
//		+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
//		+ '<label for="exampleInputEmail2" class="TextFont">Health Info To</label>'
//		+ '<input type="date" class="form-control input-SmallText"  name="date" id="toDate">'
//		+ '</div></div><div style="margin-top: 10px;" class="col-sm-2-1" id="col5">'
//		
//		+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
//		+ '<label for="exampleInputEmail3" class="TextFont">Consent Expiry</label>'
//		+ '<input type="datetime-local" class="form-control input-SmallText" name="date" id="consentExpiryDate">'
//		+ '</div></div><div style="margin-top: 10px;" class="col-sm-2-1" id="col6">'
//		
//		+ '<div style="margin-left: 10px;" class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
//		+ '	<label for="exampleInputEmail1" class="TextFont">Purpose Of Request</label>'
//		+ ' <select class="form-control input-SmallText" id="reqType" name="purposeOfReq"><option value="Care Management">Care Management</option>'
//		+ '<option value="Self Request">Self Request</option></select></div></div>'
//		+ '<div style="margin-top: 10px; margin-left: 10px;" class="col-sm-2-1" id="col6"><div class="form-group Remove-Padding col-sm-12-1">'
//		+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Comments</label>'
//		+ '<input type="text" class="form-control input-SmallText" id="comment" name="comment" placeholder="Comments">'
//		+ '</div></div>'
//		
//		+ '<div id="col7" class="col-sm-6-1" style="margin-top: 10px; margin-left: 80px; margin-bottom: -40px; >'
//		+ '<label for="exampleInputEmail1" class="TextFont"> <b>Health Info Type</b> </label> <div class=divide-></div> ' 
//	//	+ '<label><input style="margin-left: 10px;"  type="checkbox" name="opConsultation" value="OPConsultation" id="opConsultation" >OPConsultation </label> '
//		+ '<label><input style="margin-left: 10px;"  type="checkbox" name="prescription"value="Prescription" id="prescription">Prescription<br></label>'
//	//	+ '<div id="col7" class="col-sm-2-1" style="margin-top: 10px; margin-left: 80px; margin-bottom: -40px; z-index: 1000;"><div class=divide-5></div> <label>' 
//	//	+ '<label><input style="margin-left: 10px;"  type="checkbox" name="diagnosticReport"value="DiagnosticReport" id="diagnosticReport">DiagnosticReport<br></label>'
//	//	+ '<label><input style="margin-left: 10px;"  type="checkbox" name="dischargeSummary"value="DischargeSummary" id="dischargeSummary">DischargeSummary<br></label>'
//		
//		
//		+ '</div><div style="margin-top: 50px;" class="col-sm-3-1" id="col10">'
//		+ '<div class="divide-10"></div><button id="saveeditassesment1" onclick="saveConsent();" class="btn btn-xs btn-success">Save</button>'
//		+ '<div class="btn-group">'
//		+ '</div></div></div>'
//		
//		+ '	<table class="table table-bordered table-condensed header-fixed cf" style="margin-top: 40px;">'
//		+ '	<thead><tr><th class="col-md-1-1 center" style="height: 21.5px;"><div class="TextFont">#</div></th>'
//		+ '	<th class="col-md-1-1" style="height: 21.5px; padding-left: 50px;"><div class="TextFont">Name</div></th>'
//		+ '	<th class="col-md-2-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Health Id</div></th>'
//		+ '	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Request Status</div></th>'
//		/*+ '	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Edit</div></th>'*/
//		+ '	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Consent created on</div></th>'
//		+ '	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Consent granted on</div></th>'
//		+ '	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Consent expiry on</div></th>'
//		+ '	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">View</div></th>'
//		+ '	</tr></thead><tbody id="docDispTable1"><tr><td colspan="5">No Record Found</td></tr></tbody>'
//		+ '</table> </div></div></div></div></div></div></div>';
//
//	$("#ipdDoctorStationJSPHeadDiv").html(temp);

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate()+1);
	var year = ''+tomorrow.getFullYear();
	var month = ''+(tomorrow.getMonth()+1);
	var day = ''+tomorrow.getDate();

	var hr = ''+tomorrow.getHours();
	var min = ''+tomorrow.getMinutes();

	if(month.length < 2)
		month = '0'+month;

	if(day.length < 2)
		day = '0'+day;

	if(hr.length < 2)
		hr = '0'+hr;

	if(min.length < 2)
		min = '0'+min;

	// value="2018-06-12T19:30"
	tomorrow = year+"-"+month+"-"+day+"T"+hr+":"+min; 

	$("#consentExpiryDate").val(tomorrow);


	$("#toDate").change(function () {
	    var startDate =  $('#formDate').val();
	    var endDate = $('#toDate').val();

	    if ((Date.parse(startDate) > Date.parse(endDate))) {
	        alert("End date should be greater than Start date");
	        $('#toDate').val(" ");
	    }
	    
	});

	$("#consentExpiryDate").change(function () {
	    var startDate =  $('#toDate').val();
	    var endDate = $('#consentExpiryDate').val();

	    if ((Date.parse(startDate) >= Date.parse(endDate))) {
	        alert("Expiry date should be greater than Start date");
	        $('#consentExpiryDate').val(" ");
	    }
	    
	});	
	
//	$("#doctorName").val(doctorName).html();
//	$("#consentPatient").val(patientName).html();
	
	//getAllOpdDocuments();
}

/**
 * @author :Vishant Pawar
 * @Date :28-09-2022
 * @Code :This method is save consent 
 * @return
 **/

function saveConsent(){
	
	
	var prefix="Dr."
	var userName = $('#userName').val();
	
	var doctorName = prefix+userName;
	
	//alert($('#userName').val())
	
	var prescription="";
	var opConsultation="";
	var diagnosticReport="";
	var dischargeSummary="";
	if($('[name="prescription"]').is(':checked')){ 
		prescription="Y";					
	} else { 
		prescription="N";
	};
	if($('[name="opConsultation"]').is(':checked')){ 
		opConsultation="Y";					
	} else { 
		opConsultation="N";
	};
	if($('[name="diagnosticReport"]').is(':checked')){ 
		diagnosticReport="Y";					
	} else { 
		diagnosticReport="N";
	};
	if($('[name="dischargeSummary"]').is(':checked')){ 
		dischargeSummary="Y";					
	} else { 
		dischargeSummary="N";
	};
	
	
	var patientName = $('#consentPatient').val();
//	var consentDoctorName = $('#doctorName').val();
	var formDate = $('#formDate').val();
	var toDate = $('#toDate').val();
	var consentExpiry = $('#consentExpiryDate').val();
	var patientId = $('#pt_Id').val();
	
	var type = $('#reqType').val();
//	var DiagnosticReport = $('#DiagnosticReport').val();
//	var DischargeSummary = $('#DischargeSummary').val();
//	var Prescription = $('#Prescription').val();
//	var OPConsultation = $('#OPConsultation').val();
	
	var id="@sbx";
	var health = $('#health').val();
	var healthId=health+id;
	
	var patientName = $("#patientName2").val();
	
	//let myuuid = uuidv4();
	var form = new Date(formDate).toISOString();
	var to = new Date(toDate).toISOString();
	
	var timestamp = new Date().toISOString();
	var consentExpiryDate = new Date(consentExpiry).toISOString();
	
	
	var jsonData={
		"patientId":patientId,
		"patientName":patientName,
		"code":type,
		"healthId":healthId,
		"consentDoctorName":doctorName,
		"formDate":form,
		"toDate":to,
		"consentExpiry":consentExpiryDate,
		"timestamp":timestamp,
		"prescription":prescription,
		"diagnosticReport":diagnosticReport,
		"dischargeSummary":dischargeSummary,
		"opConsultation":opConsultation
	
	}
	
	var data = JSON.stringify(jsonData);
	
	var inputs = [];
	inputs.push('json=' + data);
	//inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: false,
		type: "POST",
		url : "ehat/sandbox/consentRequest",
		data : str + "&reqType=AJAX",
		timeout: 1000 * 60 * 5,
	//	catche: false,
		error: function () {
			alert(r);
		},
		success: function (r) {
		//	alert(r)
			
		alertify.success("Request Send Successfully");
		getConsentData();
		}
	});
}


function getConsentData(){
	
	
	jQuery.ajax({
		async: false,
		type: "GET",
		url : "ehat/sandbox/getConsentData",
	//	data : str + "&reqType=AJAX",
		timeout: 1000 * 60 * 5,
	//	catche: false,
		error: function () {
			alert(r);
		},
		success: function (r) {
		//	alert(r)
			
	if (r.length > 0) {
		var divContent="";
		for (var i = 0; i < r.length; i++) {
			
			var obj = r[i];
			divContent = divContent
			+ "<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"
			+ (i + 1)
			+ "</div></td>"
			+ "<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"
			+ (i + 1)
			+ "' value='"
			+ r[i].patientName
			+ "'>"
			+ r[i].patientName
			+ "</td> "
			+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"
			+ (i + 1)
			+ "' value='"
			+ r[i].healthId
			+ "'>"
			+ r[i].healthId
			+ "</td> "
			+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"
			+ (i + 1)
			+ "' value='"
			+ r[i].requestStatus
			+ "'>"
			+ r[i].requestStatus
			+ "</td> "
			+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"
			+ (i + 1)
			+ "' value='"
			+ getDateWithTime(r[i].dateRangeFrom)
			+ "'>"
			+ getDateWithTime(r[i].dateRangeFrom)
			+ "</td> "
			+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"
			+ (i + 1)
			+ "' value='"
			+ getDateWithTime(r[i].dateRangeTo)
			+ "'>"
			+ getDateWithTime(r[i].dateRangeTo)
			+ "</td> "
			+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"
			+ (i + 1)
			+ "' value='"
			+ getDateWithTime(r[i].dataEraseAt)
			+ "'>"
			+ getDateWithTime(r[i].dataEraseAt)
			+ "</td> "
			
			if( r[i].requestStatus != "GRANTED" ){
				divContent = divContent		+ "<td  style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='viewBtn' type='button' disabled  onClick=redirectPage("+ r[i].id +"); class='btn btn-xs btn-success'"
	//		 "<button onclick=actionDashBoard('"+ r.listRegTreBillDto1[i].treatmentId+ "','"+ r.listRegTreBillDto1[i].patientId+"','IPDID') type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
			+ (i + 1)
			+ "' value='"
			
			+ "'>"
			+ "<i class='fa fa-eye View'></i></button>"
		//	+ getDateWithTime(r[i].dataEraseAt)
			+ "</td> "
			}else {
				divContent = divContent		+ "<td  style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='viewBtn' type='button' onClick=redirectPage("+ r[i].id +"); class='btn btn-xs btn-success'"
				//		 "<button onclick=actionDashBoard('"+ r.listRegTreBillDto1[i].treatmentId+ "','"+ r.listRegTreBillDto1[i].patientId+"','IPDID') type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
						+ (i + 1)
						+ "' value='"
						
						+ "'>"
						+ "<i class='fa fa-eye View'></i></button>"
					//	+ getDateWithTime(r[i].dataEraseAt)
						+ "</td> "
			}
//			"<td style='height: 21.5px; padding-left: 0px;'  class='col-md-1-1 center' >"
//			+ "<button type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
//			+ "</td>" 
			

			
		}
		$("#docDispTable1").html(divContent);
	}
			
		}
	});
   }

function redirectPage(id){
	
	//alert(id);
	//const obj = JSON.parse(decryptedData);
	
	var inputs = [];
	inputs.push('id=' + id);
	//inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: false,
		type: "POST",
		url : "ehat/sandbox/getDecryptedData",
		data : str + "&reqType=AJAX",
		timeout: 1000 * 60 * 5,
	//	catche: false,
		error: function () {
			alert("error");
		},
		
		success: function (r) {
			var a=r.decryptedData;
			//alert(a);
			//var b=JSON.stringify(r.decryptedData);
			var c= JSON.parse(a);
			//alert(c);
			//alert(c.entry[0].resource.status);
			$('#statusid').val(c.entry[0].resource.status);
		//	$('#dateT').text(c.entry[0].resource.date);
			var dates = c.entry[0].resource.date;
			var datefor = dates.split("T")[0];
			$('#spname').text(r.patientName);
			$('#dateT').val(datefor);
			$('#author').val(c.entry[0].resource.author[0].display);
			var pstatus = c.entry[3].resource.class.display+","+c.entry[3].resource.status+","+c.entry[3].resource.period.start.split("T")[0];
			$('#pstatus').val(pstatus);
			$('#digno').val("Diagnosis: Covid19");
			$('#DRdate').val(datefor);
			$('#DRstatus').val(c.entry[0].resource.status);
			$('#Cdate').text(datefor);
			
			//For Medication
			$('#Mstatusid').val(c.entry[0].resource.status);
			$('#MdateT').val(datefor);
			$('#Mauthor').val(c.entry[0].resource.author[0].display);
			
			
			/*
			
			*/
			
			for(var i=0;i<c.entry.length;i++){
				
				if(c.entry[i].resourceType == "Patient")
				{
					$('#pname1').val(c.entry[i].resource.name[0].text);
					
				}
				
				
			}
			
			var htm = "";
			
			htm += "<tr>";
			htm += "<td>"+c.entry[5].resource.authoredOn.split("T")[0];+"</td>";
			htm += "<td>"+c.entry[4].resource.code.coding[0].display+"</td>";
			htm += "<td>"+c.entry[5].resource.dosageInstruction[0].text+"</td>";
			htm += "<td>Addional Infor Details</td>";
			htm += "</tr>";
			
			$("#medicationTabledata").html(htm);

			$("#viewVersionTrends").modal("show");
			
		}
	});
	
	//alert("heloo")
	//window.open("consent_data.jsp?");
}

function searchByPatient(){
	
	var id="@sbx";
	var health = $('#health').val();
	var healthId=health+id;
	
	var inputs = [];	
	inputs.push('healthId='+healthId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/patientFind",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			
			//getData();
			alertify("sucess");
//			if(r=="" || r==null){
//				alert("Record Not Found..!");
//				getData();
//				return 0;
//			}
			
			
		},
	});
	
	
}

function getDateWithTime(date) {
	var date1;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	date1 = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	return date1;
	
}

function closeViewTrendsModal()
{
//	$('viewVersionTrends').hide();
	$("#viewVersionTrends").modal("hide");
}

function displayConsentBlocks(callfrom)
{
	if(callfrom == "diagnostic_report")
	{
		$("#mainBlock").show();
		$("#secondBlock").hide();
		
	} else if(callfrom == "medication") {
		
		$("#mainBlock").hide();
		$("#secondBlock").show();
		
	}
}

function notifyViaSMS(){
	
	
	var mobileNo = $('#mobileNo').val();
	var hospitalName = $('#hospitalName').val();
	
	
	var inputs = [];	
	inputs.push('mobileNo='+mobileNo);
	inputs.push('hospitalName='+hospitalName);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/notifyViaSMS",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			if(r=="" || r==null){
				alert("Record Not Found..!");
				return 0;
			}
			else{
				alert(r);
			}
			var obj = JSON.parse(r);
			if(obj.healthId != null && obj.healthIdNumber != null)
			{
				localStorage.setItem("healthId", obj.healthId);
				localStorage.setItem("healthIdNumber", obj.healthIdNumber);
				const fullName  = obj.name;
				const [first, middle, last] = fullName.split(' ');
				$("#fName").val(first);
				$("#lName").val(last);
				$("#mName").val(middle);
			}
			else
			{
			    alert("Record Not Found..!")
			}
			
		},
	});
	
}

function linkNewRecord(flag){
	
	if(flag=='Y'){
		$("#linkNewRecord").show();
		$("#notifyViaSMS").hide();
	}
	
}

function phrAddressScan(flag){
	
	
	
	
}

function scanHIP(data){
	
	if(data=='scanHIPQR'){
		
		$("#phrAddressQR").hide();
		$("#phrAddressHIPQR").show();
		
	}
	else if(data == 'scanPHRQR'){
		$("#phrAddressHIPQR").hide();
		$("#phrAddressQR").show();
		
		$('#authType1').val("DEMOGRAPHICS").change();
		$("#purpose").val("LINK");
		
	}
	else if(data =='sharePHRAddress'){
		$("#phrAddressHIPQR").hide();
		$("#phrAddressQR").show();
		
		$('#authType1').val("MOBILE_OTP").change();
		
		$("#purpose").val("KYC_AND_LINK");
	}
}

function changeFunc(){
	
	var authType = $('#authType').val();
	
	if(authType=='MOBILE_OTP'){
		
		$("#mobileOTP").show();
		$("#demographic").hide();
	}
	else if(authType=='DEMOGRAPHICS'){
		
		$("#mobileOTP").hide();
		$("#demographic").show();
	}
	
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
			
			var resultError = JSON.parse(r);
			//alert(obj);
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
				//alert(r);
				alertify.success("verify successfully");
				
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
				//alert(r)
				alertify.success("verify successfully");
				
			}
		});
		
	}	
}

function getData(){
	
	var inputs1 = [];	
	inputs1.push('healthId='+healthId);
	var str2 = inputs1.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/patientOnFind",
		timeout : 1000 * 60 * 5, 
		data : str2 + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			alertify.success("verify successfully");
			r.full
			if(r.patientFullNAme=="" || r.patientFullNAme==null ||r.patientFullNAme=="0"){
				alert("Record Not Found..!");
				
				return 0;
			}
			else{
				
				$('#sbx').val(patientFullNAme);
			}
			
			
		},
	});
	
}

function demoTest(){
	
	var demo= $('#patientName2').val();
	console.log(demo);
}

function refreshPage(){
	
//	var inputs1 = [];	
//	inputs1.push('healthId='+healthId);
//	var str2 = inputs1.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/sandbox/getData",
		timeout : 1000 * 60 * 5, 
//		data : str2 + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			
		var healthId= r.healthId;
		var data=healthId.split("@");
		var mydate = new Date(r.dob);
		$('#fullName').val(r.patientName);
		$('#sbx').val(data[0]);
		$('#gender').val(r.gender).change();
		$('#dateOfBirth').val(r.dob);
		
		
			
		},
	});
	
}

function addCareContextByMobileOTP1(){
	
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

function getSandboxPatient(patientId) {
	
	var inputs = [];	
	inputs.push('patientId='+patientId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/getSandboxPatient",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var id = r.helathId.split("@"); 
			
			$("#sbx").val(id[0]);

			
		},
	});
	
	
}

/***********
 * @author	: Vishant Pawar
 * @date	: 05-05-2023
 * @reason	: send otp for retrieval abha
 **********/

function sendForgetOTP(){
	
	var mobileAadhaarDropDown = $('#mobileAadhaarDropDown').val();
	var forgetMobileAadhaarNumber="";
	if(mobileAadhaarDropDown=="MOBILE_OTP"){
		
		forgetMobileAadhaarNumber	= $('#forgetMobileNumber').val();
	}
	else if(mobileAadhaarDropDown=="AADHAAR_OTP"){
		
		forgetMobileAadhaarNumber	= $('#forgetAadharNumber').val();
	}
	 
	
	var inputs = [];	
	inputs.push('callFrom='+mobileAadhaarDropDown);
	inputs.push('mobileNumber='+forgetMobileAadhaarNumber);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/retrieveAbha",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			
			if(r.txnId!=null){
				
				localStorage.setItem("txnId",r.txnId);
				alertify.success("OTP Send Successfully");
			}
			else{
				alertify.error(r.errorResult);
			}
			
			

			
		},
	});
}

/***********
 * @author	: Vishant Pawar
 * @date	: 05-05-2023
 * @reason	: verify otp for retrieval abha
 **********/

function verifyForgetOtp(){
	
	var abhaOtp = $('#abhaOtp').val();
	var mobileAadhaarDropDown = $('#mobileAadhaarDropDown').val();
	var abhaFirstName = $('#abhaFirstName').val();
	var abhaGender = $('#abhaGender').val();
	var yearOfBirth = $('#yearOfBirth').val();
	//var verifyForgetOTP = $('#verifyForgetOTP').val();
	
	var txnId = localStorage.getItem("txnId");
	
	
	if(abhaGender=='Male'){
		abhaGender="M";
	}
	else if(abhaGender=='Female'){
		abhaGender="F";
	}
	
	var inputs = [];
	
	inputs.push('callFrom='+mobileAadhaarDropDown);
	inputs.push('otp='+abhaOtp);
	inputs.push('firstName='+abhaFirstName);
	inputs.push('gender='+abhaGender);
	inputs.push('yearOfBirth='+yearOfBirth);
	//inputs.push('name='+abhaFirstName);
	inputs.push('txnId='+txnId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/verifyForgetOtp",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r.healthId!=null){
				
				//localStorage.setItem("txnId",r.txnId);
				alertify.success("success");
				
				var healthId = r.healthId;
				const health=healthId.split("@");
				$('#health').val(health[0]);
				
				alert("HealthId= "+r.healthId +"\nHealthId Number= "+r.healthIdNumber);
				
			}
			else{
				alertify.error(r.errorResult);
			}
			
		},
	});
}

function changeAuthType(){
	
	var authType = $('#mobileAadhaarDropDown').val();
	
	if(authType=='MOBILE_OTP'){
		
		$("#forgetMobileNumber").show();
		$("#forgetAadharNumber").hide();
	}
	else if(authType=='AADHAAR_OTP'){
		
		$("#forgetMobileNumber").hide();
		$("#forgetAadharNumber").show();
	}
	
}

/************
* @author	: Vishant Pawar
* @date		: 05-May-2023
* @codeFor	: retrieval abha number
 ************/

function viewForgetTab(){
	
	$("#healthIdForget").show();
	
	
	
}

function getProfileSendOtp(){
	
	
	var profileHealthIdNumber = $('#profileHealthIdNumber').val();	
	var	getProfileDropdown	= $('#getProfileDropdown').val();
	
	 
	
	var inputs = [];	
	inputs.push('healthIdNumber='+profileHealthIdNumber);
	inputs.push('authType='+getProfileDropdown);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/profileSendOtp",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			
			if(r.txnId!=null){
				
				localStorage.setItem("txnId",r.txnId);
				alertify.success("OTP Send Successfully");
			}
			else{
				alertify.error(r.errorResult);
			}
			
			

			
		},
	});
	
}


function getABHAProfile(){
	
	
	var profileVerifyOTP = $('#profileVerifyOTP').val();	
	
	var txnId = localStorage.getItem("txnId");
	 
	
	var inputs = [];	
	inputs.push('otp='+profileVerifyOTP);
	inputs.push('txnId='+txnId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sandbox/getABHAProfile",
		timeout : 1000 * 60 * 5, 
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ra) {
			
			var r = JSON.parse(ra);
			if(r!=null){
				
				//localStorage.setItem("txnId",r.txnId);
				alertify.success("Data Fetch Successfully");
				
				$('#fName').val(r.firstName);
				$('#mName').val(r.middleName);
				$('#lName').val(r.lastName);
				$('#mobile').val(r.mobile);
				$('#email').val(r.email);
				$('#addressText').val(r.address);
				
				if(r.gender == "M"){
					$("#gender").val("Male").change();
		  		    $("#prefix").select2('val',"Mr.");
				}
				else if(r.gender == "F"){
					$("#gender").val("Female").change();
				     $("#prefix").select2('val',"Miss");
				}
				
				
			 	
			 	if(r.dayOfBirth<10){
			 		r.dayOfBirth="0"+r.dayOfBirth;											
					}

				if(r.monthOfBirth<10){
					r.monthOfBirth="0"+r.monthOfBirth;											
					}
				
				var dob = r.dayOfBirth+"/"+r.monthOfBirth+"/" +r.yearOfBirth;
			 	$("#dob").val(dob);
				
			 	if (dob != "") {
					var ageString = getAgeYMDSandbox(dob);
					// alert(ageString);
					var ageStringArray = ageString.split("___");
					// alert(ageStringArray);
					$("#year").val(ageStringArray[0]);
					$("#month").val(ageStringArray[1]);
					$("#days").val(ageStringArray[2]);
					// var ageString = Y___M___D
				}
			 	
			 	$('#modal').modal('hide');
				
			}
			else{
				alertify.error(r.errorResult);
			}
			
			

			
		},
	});
	
}
	