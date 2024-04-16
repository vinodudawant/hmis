function saveUsrDoc(type){

	var empIdhr = $("#empIdhr").val();
	var pan = 0;//$("#pan").val();
	var ctc = 0;//$("#ctc").val();
	var plvp =0;// $("#plvp").val();
	var doctorpercent = 0;//$("#doctorper").val();
	//var signature = document.getElementById("signature").files[0].name;//$("#signature").val();
	var signature = $("#signature").val();
	var queryType = $("#queryType").val();	
	var empId = $("#empId").val();
	var usernamefor = $.trim($("#userNm").val());
	var password = $.trim($("#password").val());
	var userType = $("#userType").val();
	var title = $("#title").val();
	
	//Added by Laxman on 02-Jan-2018.
	if(title =="select" || title=="" || title==null){
		alert("Please select Title!");
		return false;
	}else{
		title=title.toString();		
	}
	
	if(usernamefor =="select" || usernamefor=="" || usernamefor==null){
		alert("Please Enter UserName!");
		return false;
	}
	
	if(password =="select" || password=="" || password==null){
		alert("Please Enter Password!");
		return false;
	}
	
	var doctorId = $("#doctorId").val();
	var ln = $("#ln").val();
	var fn = $("#fn").val();
	var mn = $("#mn").val();
	var docName = title + " " + fn + " " + mn + " " + ln;
	var popup_container2 = $("#popup_container2").val();
	var strAdd = $("#strAdd").val();
	var apartUnit = $("#apartUnit").val();
	var city = $("#city").val();
	var state = $("#state").val();
	var zip = $("#zip").val();
	var mob = $("#mob").val();
	var email = $("#email").val();
	var dojoin = $("#dojoin").val();
	var schoolNm = $("#schoolNm").val();
	var schoolAdd = $("#schoolAdd").val();
	var schoolFrm = $("#schoolFrm").val();
	var schoolTo = $("#schoolTo").val();
	var schoolPercent = $("#schoolPercent").val();
	var colNm = $("#colNm").val();
	var colAdd = $("#colAdd").val();
	var colFrm = $("#colFrm").val();
	var colTo = $("#colTo").val();
	var colPercent = $("#colPercent").val();
	var colDegree = $("#colDegree").val();
	var pgNm = $("#pgNm").val();
	var pgAdd = $("#pgAdd").val();
	var pgForm = $("#pgFrm").val();
	var pgTo = $("#pgTo").val();
	var pgPercent = $("#pgPercemt").val();
	var pgDegree = $("#pgDegree").val();
	var cmpnyNm = "-";//$("#compNm").val();
	var cmpnyPhone = "0";$("#compPhone").val();
	var cmpnyAdd = "-";//$("#compAdd").val();
	var cmpnyBoss ="-";// $("#compBoss").val();
	var jobTitle = "-";//$("#jobTitle").val();
	var jobResp = "-";//$("#jobResp").val();
	var jobForm = "-";//$("#jobFrm").val();
	var jobTo = "-";//$("#jobTo").val();
	var fess = 0;//$("#fees").val();
	var apLeaves = 0;//$("#apLeaves").val();
	//var followupFess = $("#followupFess").val();
	var department = $("#departments").val();
	
//	var specialization = $("#specialization").val();
	var selSpeciality = $("#selSpeciality").val();
	




					if (userType == "doctor" || userType == "Doctor" || userType == "DOCTOR") {

//		var multispecializationName = $("#specializationName li").length;
		var specializationIdsString = $("#specializationName").val().toString();
//		for (var i = 0; i < multispecializationName; i++) {
//			var specializationIds = $("#specializationIdHide" + i).val();
//			if (specializationIds !== undefined) {
//				specializationIdsString += specializationIds;
//				if (i < multispecializationName - 1) {
//					specializationIdsString += ",";
//				}
//			}
//		}

		/*var specializationNames = "";

		$("#specializationName li").each(function(index) {
			var currentSpecializationName = $(this).find("div").text().trim();
			specializationNames += currentSpecializationName;
			if (index < $("#specializationName li").length - 1) {
				specializationNames += ",";
			}
		});*/
		
		var specializationNames = "";

		$("#s2id_specializationName li.select2-search-choice").each(function(index) {
		    var currentSpecializationName = $(this).find("div").text().trim();
		    specializationNames += currentSpecializationName;
		    if (index < $("#s2id_specializationName li.select2-search-choice").length - 1) {
		        specializationNames += ",";
		    }
		});


	}
	if(fn =="" || fn==null){
		alert("Please Enter First Name!");
		return false;
	}
	
	if(ln =="" || ln==null){
		alert("Please Enter Last Name!");
		return false;
	}
	
	if (userType == "doctor" || userType == "Doctor" || userType == "DOCTOR") {
		/*if (specializationName == "") {
			alert("Please select specialization!");
			return false;
		}*/
		var selectElement = document.getElementById("specializationName");

		if (selectElement.childElementCount  === 0) {
		  alert("Please select specialization!");
		  return false;
		}

		if (department == '0' || department == "0" || department == null) {
			alert("Please select department!");
			return false;
		}

		if (selSpeciality == '0' || selSpeciality == "select" || selSpeciality == null) {
			alert("Please Select Speciality");
			focus("selSpeciality");
			return false;
		}
	}
	/*if(specialization == 0)
		specializationName = '';*/
	
	
	var doctorfee = $("#doctorfee").val();
	var fixedIncome = $("#fixedIncome").val();
	var referalPercent = $("#referalPercent").val();
	var folloupFees = $("#folloupFees").val();
	var folloupWeekend = $("#folloupWeekend").val();
	
	var qualification = ($("#qualification").val()).trim();
	var designation = ($("#designation").val()).trim();
	var regNo = ($("#regNo").val().trim());
	var motivatorAuthorisation = $("#motivatorAuthorisation").val();
	mob=$("#mobile").val();
	var docName1 = $("#docName1").val();
	//alert(docName1);
	var techName1 =$("#techName1").val();
	
	var signature1=$("#doctorSignName").text();
	var signature2=$("#technicianSignName").text();
	
	//@Name: irfan khan @date: 11-11-2016 @reason: clinic% and test shared flag
	var clinicPercent=0;//$("#txtClinicPercent").val();
	/*if(clinicPercent == undefined || clinicPercent == ""){
		clinicPercent=0;
	}*/
	
	//@Name: paras suryawanshi @date: 18-5-2017 @reason: doctor type master
    var seldcTypeMaster = $("#seldcTypeMaster").val();
    
    if(seldcTypeMaster == null || seldcTypeMaster == "null")
    {
    	seldcTypeMaster=0;
    } else {
    	if(userType=="doctor" || userType=="Doctor" ||userType=="DOCTOR"){
    	   if(seldcTypeMaster=="" || seldcTypeMaster==null || seldcTypeMaster==undefined  ){
    		   	seldcTypeMaster=0;
    	   }
    	}
    }
   
    var doctorTypeIdList = "";

	//added by kishor for referal doctor
	if(userType=="doctor" || userType=="Doctor" ||userType=="DOCTOR"){
		$('#seldcTypeMaster1 option:selected').each(function() {
			if(doctorTypeIdList != ""){
				doctorTypeIdList = doctorTypeIdList +","+ $(this).val();
			}else{
				doctorTypeIdList = $(this).val();
			}			
		});
	}

	if(doctorTypeIdList=="" || doctorTypeIdList==null || doctorTypeIdList==undefined  ){
	   doctorTypeIdList=0;
    }

	
    var mulSelunit = $('#mulSelunit').val();
  
	if(mulSelunit!=null && mulSelunit!=""){
		mulSelunit = mulSelunit.toString();
	}else{
		
		alert("Please Enter Unit Name!");
		return false;
	}
 
	var mulDeptid = $('#deptName').val();
	if(mulDeptid!=null && mulDeptid!=""){
		mulDeptid = mulDeptid.toString();
	}else{
		
		alert("Please Enter Department Name!");
		return false;
	}
	
	var mulServiceid = $('#serviceName').val();
	if(mulServiceid!=null && mulServiceid!=""){
		mulServiceid = mulServiceid.toString();
	}else{
		
		alert("Please Enter Service Name!");
		return false;
	}
	
	//Added by Laxman on 17-Jan-2018.
	var docIni = $("#docIni").val();
	
	if(docIni!=null && docIni!=""){
		docIni = docIni.toString();
		  //alert("unit id:"+mulSelunit);
	}else{
		docIni="-";
	}
	
	var chkOverrideCharges;
	if ($('#chkOverrideCharges').is(':checked')) {
		chkOverrideCharges = "Y";
	} else {
		chkOverrideCharges = "N";
	}
	 
	var sendSMSflag="N";
	/*if ($('#sendSMSflag').is(':checked')) {
		sendSMSflag = "Y";
	} else {
		sendSMSflag = "N";
	}
	*/
	var softwareUsed;
	if ($('#softwareUsed').is(':checked')) {
		softwareUsed = "Y";
	} else {
		softwareUsed = "N";
	}
	
	if (ln == "" || ln == null) {
		alert("Last Name Must Be Filled Out");
		SetFocus("ln");
		return false;
	} else if (fn == "" || fn == null) {
		alert("First Name Must Be Filled Out");
		SetFocus("fn");
		return false;
	} 
	/*else if (usernamefor == "" || usernamefor == null){
		alert("Please Enter User Name!");
		SetFocus("userNm");
		return false;
	}*/
	/*else if (password == "" || password == null){
		alert("Please Enter Password!");
		SetFocus("password");
		return false;
	}*/else if (userType == null || userType == "") {
		alert("Please Select Employee Type");
		SetFocus("userType");
		return false;
	}
	/*else if (mob == "") {
		alert("Please Enter Mobile No.");
		SetFocus("mob");
		return false;
	}*/
	/*if (userType == "doctor" || userType == "rmo" || userType == "visitingdoctor" || userType == "Pathologist") {
		if (specialization == "0" || specialization == null) {
			alert("Please Select Doctor Specialization");
			SetFocus("speName");
			return false;
		} else if (deptName == "0" || deptName == null) {
			alert("Please Select Doctor Department");
			SetFocus("deptName");
			return false;
		} else if (selSpeciality == "select" || selSpeciality == null) {
			alert("Please Select Speciality");
			SetFocus("selSpeciality");
			return false;
		}
	}*/
	
	//Added by Harshit.
	/*if(userType=="doctor" || userType=="Doctor" ||userType=="DOCTOR"){
		if (deptName == "0" || deptName == null) {
			alert("Please Select Doctor Department");
			SetFocus("deptName");
			return false;
		}
	}*/
	
	if (apLeaves == "") {
		apLeaves=0;		
		
	} else if (fn == "" || fn == null) {
		alert("First Name Must Be Filled Out");
		SetFocus("ln");
		return false;
	} 
	/*if (signature == "") {
		  alert("Please Select Signature.");
		  SetFocus("signature"); return false;
	  } */
	
	/*else if (mob == "") {
		alert("Please Enter Mobile No.");
		SetFocus("mob");
		return false;
	}*/
	/*else if (pan == "") {
		alert("Please Enter Pan No.");
		SetFocus("pan");
		return false;
	} else if (ctc == "") {
		alert("Please Enter CTC.");
		SetFocus("ctc");
		return false;
	}
	else if (plvp == "") {
		alert("Please Enter PLVP value.");
		SetFocus("plvp");
		return false;
	}
	else if (doctorpercent == "") {
		alert("Please Enter Doctor percentage.");
		SetFocus("doctorper");
		return false;
	}*/
	/*
	 * else if (signature == "") { alert("Please Select Signature.");
	 * SetFocus("signature"); return false; }
	 */
	/*
	 * else if (popup_container2 == "") { >>>>>>> .r5357 alert("Please Enter
	 * Date of Birth");
	 * 
	 * return false; }
	 */

	/*else if($('#usernameValidation').val()=="1"){
		alert("Sorry username already exist..!");
	}*/
	 
	if (empIdhr == "" || empIdhr == null || empIdhr == undefined) {
		empIdhr=0;
	}
	if (fixedIncome == "" || fixedIncome == null || fixedIncome == undefined) {
		fixedIncome=0;
	}
	if (referalPercent == "" || referalPercent == null || referalPercent == undefined) {
		referalPercent = 0;
	}
	
	//Added By Tarique Aalam
	if(userType=="doctor" || userType=="Doctor" ||userType=="DOCTOR"){
		if(folloupFees=="" || folloupFees==null || folloupFees==undefined  ){
			alert("Please enter FollowUp Fees");
			return false;
		}
	
		if(folloupWeekend=="" || folloupWeekend==null || folloupWeekend==undefined  ){
			alert("Please enter FollowUp Weekend");
			return false;
		}
	}else {
		folloupFees=0.0;
		folloupWeekend=0.0;
	}
	
	//-------------------Added By Badrinath------------------------	
	var allServicesFlag="N";
	if($('#allServiceChk').is(':checked')){ 
		allServicesFlag="Y";
	} 
	
	var addUserSign="N";
	if($('#softwareUsedChk').is(':checked')){ 
		addUserSign="Y";
	} 
	//----------------------------------------------------------
	var user_ID = $("#userIdForUpdate").val();
	var doctor_ID = $("#doctorIdForUpdate").val();
	var createdDate = $("#createdDate").val();
	
	var inputs = [];		
	inputs.push('title=' + title);
    inputs.push('ctc=' + ctc);
	inputs.push('panCardNo=' + pan);
	inputs.push('plvp=' + plvp);
	inputs.push('doctorpercent=' + doctorpercent);
	inputs.push('Docsign=' + encodeURIComponent(signature));
	inputs.push('queryType=' + queryType);
	inputs.push('empId=' + empId);
	inputs.push('doc_name=' + encodeURIComponent(docName));
	inputs.push('dob=' + popup_container2);
	inputs.push('strAdd=' + encodeURIComponent(strAdd));
	inputs.push('apartUnit=' + encodeURIComponent(apartUnit));
	inputs.push('city=' + encodeURIComponent(city));
	inputs.push('state=' + encodeURIComponent(state));
	inputs.push('zip=' + encodeURIComponent(zip));
	inputs.push('mobileNo=' + encodeURIComponent(mob));
	inputs.push('email_Id=' + encodeURIComponent(email));
	inputs.push('doj=' + dojoin);
	inputs.push('schoolNm=' + encodeURIComponent(schoolNm));
	inputs.push('schoolAdd=' + encodeURIComponent(schoolAdd));
	inputs.push('schoolForm=' + encodeURIComponent(schoolFrm));
	inputs.push('schooTo=' + encodeURIComponent(schoolTo));
	inputs.push('schoolPercent=' + encodeURIComponent(schoolPercent));
	inputs.push('colNm=' + encodeURIComponent(colNm));
	inputs.push('colAdd=' + colAdd);
	inputs.push('colFrm=' + colFrm);
	inputs.push('colTo=' + encodeURIComponent(colTo));
	inputs.push('colPercent=' + encodeURIComponent(colPercent));
	inputs.push('colDegree=' + encodeURIComponent(colDegree));
	inputs.push('pgNm=' + encodeURIComponent(pgNm));
	inputs.push('pgAdd=' + encodeURIComponent(pgAdd));
	inputs.push('pgForm=' + pgForm);
	inputs.push('pgTo=' + pgTo);
	inputs.push('pgPercent=' + encodeURIComponent(pgPercent));
	inputs.push('pgDegree=' + encodeURIComponent(pgDegree));
	inputs.push('cmpnyNm=' + encodeURIComponent(cmpnyNm));
	inputs.push('cmpnyPhone=' + encodeURIComponent(cmpnyPhone));
	inputs.push('cmpnyAdd=' + encodeURIComponent(cmpnyAdd));
	inputs.push('cmpnyBoss=' + encodeURIComponent(cmpnyBoss));
	inputs.push('jobTitle=' + encodeURIComponent(jobTitle));
	inputs.push('jobResp=' + encodeURIComponent(jobResp));
	inputs.push('jobForm=' + jobForm);
	inputs.push('jobTo=' + jobTo);
	inputs.push('fess=' + fess);
	inputs.push('aplicableleaves=' + encodeURIComponent(apLeaves));
	inputs.push('department=' + encodeURIComponent(department));
	inputs.push('specialisation=' + encodeURIComponent(specializationIdsString));
	inputs.push('speciality=' + encodeURIComponent(selSpeciality));
	inputs.push('chkOverrideCharges=' + chkOverrideCharges);
	inputs.push('sendSMSflag=' + sendSMSflag);
	inputs.push('qualification=' + encodeURIComponent(qualification));
	inputs.push('designation=' + encodeURIComponent(designation));
	inputs.push('regNo=' + encodeURIComponent(regNo));
	inputs.push('motivatorAuthorisation=' + encodeURIComponent(motivatorAuthorisation));
	inputs.push('clinicPercent=' + 0);
	inputs.push('testSharedFlag=' + 0);	
	inputs.push('filePath=' + encodeURIComponent("-"));
	inputs.push('docIni=' + encodeURIComponent(docIni));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('seldcTypeMaster=' + seldcTypeMaster);
	inputs.push('doctorTypeIdList=' + seldcTypeMaster);
	inputs.push('mulSelunit=' + mulSelunit);
	inputs.push('mulDeptid=' + mulDeptid);
	inputs.push('mulServiceid=' + mulServiceid);    	
	inputs.push('empIdhr=' + empIdhr);
	inputs.push('doctorfee=' + encodeURIComponent(doctorfee));
	inputs.push('fixedIncome=' + encodeURIComponent(fixedIncome));
	inputs.push('referalPercent=' + encodeURIComponent(referalPercent));
	inputs.push('folloupfees=' + encodeURIComponent(folloupFees));
	inputs.push('folloupWeekend=' + encodeURIComponent(folloupWeekend));	
	inputs.push('user_ID=' + user_ID);
	inputs.push('doctor_ID=' + doctor_ID);
	inputs.push('full_name=' + $("#fn").val());
	inputs.push('f_name=' + $("#fn").val());
	inputs.push('m_name=' + $("#mn").val());
	inputs.push('l_name=' + $("#ln").val());
	inputs.push('user_Name=' + encodeURIComponent(usernamefor));
	inputs.push('user_Type=' + userType);	
	inputs.push('doc_Type=' + userType);	
	inputs.push('password=' + encodeURIComponent(password));
	inputs.push('softwareUsed=' + softwareUsed);
	inputs.push('created_Date=' + createdDate);
	inputs.push('availability=' + 'Y');
	inputs.push('status=' + 'Y');
	inputs.push('sign_one_doctor=' + techName1);
	inputs.push('sign_two_doctor=' + docName1);
	inputs.push('sign_one=' + signature2);
	inputs.push('sign_two=' + signature1);
	inputs.push('allServicesFlag=' + allServicesFlag);
	inputs.push('addUserSign=' + addUserSign);
	inputs.push('specializationName=' + specializationNames);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,		
		type : "POST",
		url : "ehat/users/saveUser",
		data	: str + "&reqType=AJAX",		
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("Network Issue");
		},
		success : function(r) {
		
			if (r == 1){
				
				$("#userIdForUpdate").val(0);
				$("#doctorIdForUpdate").val(0);
				alert("Records Saved Sucessfully");
				
				window.location = "HRManagement.jsp";
				
			} else if(r == 2){
				alert( "Records Updated Sucessfully");
				
				window.location = "HRManagement.jsp";
			}
			else if(r==3){
				 alert("User name already exists");
				 window.reload = "user_management.jsp";
			 }
			else{
				alert("Oops Some Problem Ocured");
			}	
		    // confirm("Data saved successfully! ");
			//window.location = "HRManagement.jsp";
			/*
			if(document.getElementById("userId").innerHTML!=null ||document.getElementById("userId").innerHTML!=undefined){
				
				    confirm("Data Updated successfully! ");
					window.location = "HRManagementNew.jsp";
				
			}
			
			if(document.getElementById("userId").innerHTML==null ||document.getElementById("userId").innerHTML==undefined){
			
				    confirm("Data saved successfully! ");
					window.location = "HRManagementNew.jsp";
				
			}*/
			
			
			if (updateFrom == "admin") {
				
				window.location = "HRManagement.jsp";
			} else {
				
				window.location = "user_management.jsp";
			}
		}
	});		
}

function setQueryStatus(tk)
{
	if(tk=="update"){
		$("#queryType").val("update");
	}else{
		$("#queryType").val("insert");
	}
}


function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}


/************
 *@author	:  Laxman Nikam
 *@date		:  27-Nov-2018
 *@codeFor	:  For Select All Services.
 ***********/
function selectAllServices()
{
	if ($('#allServiceChk').is(':checked')) {
		var values =$.map(serviceName ,function(option) {
		    return option.value;
		});
		$('#serviceName').select2('val', values);
	}else{
		$('#serviceName').select2('val', '');
	}
	
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 28-May-2020
 * @codeFor : defaultViewDoctorSpeciality()
 ******************************************************************************/
function defaultViewDoctorSpeciality() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/defaultViewDoctorSpeciality",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
	            for ( var i = 0; i < r.listDoctorSpecility.length; i++){             
		                divContent = divContent + "<option value='" + r.listDoctorSpecility[i].idDoctorSpecilities + "'  >"
		                        + r.listDoctorSpecility[i].specialityName + "</option>";
	            }
            divContent = divContent + "</select>";
            $("#selSpeciality").html(divContent);
            //$("#selSpeciality").select2();
		}	
	});
}
//Added By Badrinath
function uploadDoctorSign() {
	
	 var form = $('#docSignUploadfrm')[0];
	// var form = $('#techSignUploadfrm1')[0];
	 
	 if( document.getElementById("signature1").files.length == 0 ){
	    alert("Please select file");
	    return false;
	 }
	 var fileName = document.getElementById("signature1").files[0].name;
	 
	
	 var data = new FormData(form);
     jQuery.ajax({                   
    	 async : true,                   
    	 type : "POST",
    	 enctype: 'multipart/form-data',
    	 processData: false,
         contentType: false,
    	 data : data,
    	 url : "ehat/uploadregdoc/uploadDoctorSign",                   
    	 timeout : 1000 * 60 * 5,                   
    	 catche : false,                    
    	 error : function() {                                            
    		 alert("error");
    	 },                   
    	 success : function(r) {                      

	    	alert("File uploaded successfully.");	
	    $("#doctorSignName").text(fileName);
	    	
    	}
	});
}
//Added By Badrinath
function uploadTechSign() {
	
	 var form = $('#docSignUploadfrm11')[0];
	// var form = $('#techSignUploadfrm1')[0];
	 
	 if( document.getElementById("signature2").files.length == 0 ){
	    alert("Please select file");
	    return false;
	 }
	 var fileName = document.getElementById("signature2").files[0].name;
	 var data = new FormData(form);
    jQuery.ajax({                   
   	 async : true,                   
   	 type : "POST",
   	 enctype: 'multipart/form-data',
   	 processData: false,
        contentType: false,
   	 data : data,
   	 url : "ehat/uploadregdoc/uploadDoctorSign",                   
   	 timeout : 1000 * 60 * 5,                   
   	 catche : false,                    
   	 error : function() {                                            
   		 alert("error");
   	 },                   
   	 success : function(r) {                      

	    	alert("File uploaded successfully.");	    
	    $("#technicianSignName").text(fileName);
   	}
	});
}
//Added By Badrinath
function checkbox(){
	if($('#softwareUsedChk').prop("checked") == true){
		$("#doc1").show();
	} else {
		$("#doc1").hide();
		$("#doctorSignName").text('');
		$("#technicianSignName").text('');
		$("#docName1").val('');
		$("#techName1").val('');
	}
}
