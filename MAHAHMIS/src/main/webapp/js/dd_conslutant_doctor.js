function viewOPDConsultationPopUP(){
		
	var pid = $("#pt_Id").val();//$("#patIDLoad").val();
	var fullName = $("#patNameLoad").val();
	$("#divConsDoc").modal('show');
	$("#patIDSpan").html(pid);
	$("#patNamSpan").html(fullName);	
	
	getSpecialization();
	getHospitalDepartmentlist();
	getlstOPDConsultantDoctor();
	
}

function closeOPDConsultationPopUP(){
	$("#divConsDoc").modal('hide');
	//setAppoTimeWatchesForOPD("load");
}

/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: Get Specialization For dropdown
 ************/
function getSpecialization() {
	var unitId=1;
	var userId=1;
	var callFrom="";
	var person = {
        unitId : unitId,
        userId : userId,
        callFrom : callFrom
    }
    $.ajax({
    	async 		: false,
        url			: 'ehat/opdconsultant/getSpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setSpecialization(r,"iConsSpec");
        }        
    });
}
/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: set Specialization For dropdown
 ************/
function setSpecialization(r,dropDownId){
	
	var htm = "<option value=0>--Select--</option>";
	for ( var i = 0; i < r.lstSpecialization.length; i++) {

		htm = htm + "<option value="+r.lstSpecialization[i].idhospital_Specialization+">"+r.lstSpecialization[i].specialization_name+"</option>";
	}
	$("#"+dropDownId).html(htm);
	$("#"+dropDownId).select2();
}

/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: Get Doctor List by specilization Id  For dropdown
 ************/
function getDoctorBySpecialization() {
	var unitId=1;
	var userId=1;
	var callFrom="";
	var doctorId = 0;

		doctorId = $("#iConsSpec").val();
	
	
	var person = {
		doctor_id : doctorId,
        unitId : unitId,
        userId : userId,
        callFrom : callFrom
    }
    $.ajax({
    	async 		: false,
        url			: 'ehat/opdconsultant/getDoctorBySpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setDoctorBySpecialization(r,"iConsDoc");
        }        
    });
}
/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: set  doctor list For dropdown
 ************/
function setDoctorBySpecialization(r,dropDownId){
	
	var htm = "<option value=0>--Select--</option>";
	for ( var i = 0; i < r.lstDoctorBySpecialization.length; i++) {

		htm = htm + "<option value="+r.lstDoctorBySpecialization[i].doctor_id+">"+r.lstDoctorBySpecialization[i].doc_name+"</option>";
	}
	$("#"+dropDownId).html(htm);
	$("#"+dropDownId).select2();
}

/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: hospital depat list For dropdown
 ************/
function getHospitalDepartmentlist() {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/admin/gethospitalhospitaldepartmentList",
		success : function(r) {
			//alert(r);
			//alert(json.stringify(r));
			setFetchSaveHospitalDepartment(r);
		}
	});
}

function setFetchSaveHospitalDepartment(r)
{
	
	//var listdepartment="";
	var listdepartment = "<option value=0>--Select--</option>";
	for(var i=0;i<r.listDepartments.length;i++)
	{
		listdepartment=listdepartment+'<option value="'+r.listDepartments[i].departmentId+'">'+r.listDepartments[i].departmentName+'</option>';
		}
	$("#iConsDept").html(listdepartment);
	//$('#iConsDept').attr("disabled","disabled");
}

/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: get  doctor specilization id For dropdown
 ************/
function getDepartNameByDoctorId(){


	var inputs = [];
	var doctorId = $("#iConsDoc").val();
	inputs.push('doctorId=' + doctorId);

	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdconsultant/getDepartNameByDoctorId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
		
			$("#iConsDept").val(r);
		}
	});
}


/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: get  doctor specilization id For dropdown
 ************/
function getLatestConsultantDoctorIdByTreatment(){


	var inputs = [];
	var treatmentId=$("#tr_Id").val();
	inputs.push('treatmentId=' + treatmentId);

	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdconsultant/getLatestConsultantDoctorIdByTreatment",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			if(r == null || r == undefined || r =="undefined" || r==undefined || r ==""){
				$("#doctorId").val(0);
			}
			$("#doctorId").val(r);
		}
	});
}


/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: save opd 
 ************/
function saveOPDConsultationDoctor(){
	
	 var queryType = $("#docQueryType").val(); 
	
	 
	 if(queryType == "insert"){
		 
		 var today = new Date();
		 var dd = today.getDate();
		 var mm = today.getMonth()+1; //January is 0!
		 var yyyy = today.getFullYear();
	
		 if(dd<10) {
		     dd='0'+dd;
		 } 
	
		 if(mm<10) {
		     mm='0'+mm;
		 } 
	
		today = dd+'/'+mm+'/'+yyyy;	
		var date = $('#iDate').val();
	    if (date < today) {
	    		alert("Date should not add before Date of current date.");
	    		return false;
	    	}
		/*var time = $('#iTime').val();*/
		
		var count =0;
		if (date == "") {
			alert("Please select date");
			$('#iDate').focas();
			return false;
		}
		/*if (time == "") {
			alert("Please select time");
			$('#iTime').focas();
			return false;
		}*/
		if (docId == 0) {
			alert("Please select Doctor");
			$('#iConsDoc').focas();
			return false;
		}
	}
	 
	var docId = $('#iConsDoc').val();
	var specId = $('#iConsSpec').val();
	var deptId = $('#iConsDept').val();
	var pid = $('#patIDLoad').val();
	var fullName= $('#patNameLoad').val();
	var trid = ($('#treatmentId').html()).trim();//$('#trId').val();
	var intRowId = $('#paid').val();
	var preDocId = $('#preDocId').val();
	
	if(pid == undefined || pid == null){
		pid = $('#patIDSpan').html();
	}
	
	
	var inputs = [];
	inputs.push('patientId=' + pid);
	inputs.push('treatmentId=' + trid);
	inputs.push('serviceDate=' + date);		
	inputs.push('doctorId=' + docId);
	inputs.push('queryType=' + queryType);
	/* inputs.push('specId=' + specId);
	inputs.push('deptId=' + deptId);
	inputs.push('intRowId=' + intRowId);
	inputs.push('preDocId=' + preDocId);
	inputs.push('time=' + time); */		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdconsultant/addNewConsultantOpd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			
			
			if(r==-5){
				
				alert("Doctor already exist");				
				return false;
			}else if(r > 0){
				alert("Doctor Added Sucessfully");
			}else{
				alert("Network Issue");
			}
			$("#iDate").val("");
			$("#iTime").val("");
			$("#iConsDoc").val(0);
			$("#iConsSpec").val(0);
			$("#iConsDept").val(0);
			$("#docQueryType").val("insert");
			getlstOPDConsultantDoctor();
			//changeConsDoc(docId,specId,deptId,count,date,intRowId,pid,trid,0,0,0,0);
		}
	});
}

/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: get  doctor specilization id For dropdown
 ************/
function cheUpDoneOrCancelOPD(callFrom){

	var inputs = [];
	var patientId = $('#pt_Id').val();
	var trid = $('#tr_Id').val(); 
	var narration = $('#cancelNarration').val();
	var doctorId = $('#doctorId').val();
	var unitId = $('#unitId').val();
	var userId = $('#userId').val();
	
	var doctorSpecilizationId = $('#doctorSpecilizationId').val();
	
	
	inputs.push('patientId=' + patientId);
	inputs.push('doctorId=' + doctorId);
	inputs.push('callFrom=' + callFrom);
	inputs.push('narration=' + narration);
	inputs.push('specialityId=' + doctorSpecilizationId);
	inputs.push('treatmentId=' + trid);
	inputs.push('unitId=' + unitId);
	inputs.push('userId=' + userId);
	inputs.push('tokenNo=' + userId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdconsultant/cheUpDoneOrCancelOPD",
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(r) {
		
			if(r==1){
				alert("OPD Cancel Sucessfully");
			}else if(r==2){
				alert("Check Up Done Successfully");
			}else if(r==3){
				//alert("Patient Send Form Queue Successfully");
			}else if(r==-1){
				
				//alert("Patient Send Form Queue Successfully");
			}
			else{
				//alert("Network Issues...");
			}
			
		}
	});
}


/************
* @author	:Dayanand Khandekar
* @date		: 12-1-2022
* @codeFor	: get  opd consultanat doctor list
 ************/
function getlstOPDConsultantDoctor(){


	var inputs = [];
	var patientId=$("#pt_Id").val();
	var treatmentId=$("#tr_Id").val();
	var unitId=$("#unitId").val();
	
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('unitId=' + unitId);

	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdconsultant/getlstOPDConsultantDoctor",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			setOPDConsultantDoctorList(r);
					}
	});
}

function setOPDConsultantDoctorList(res){
	var patientId=$("#pt_Id").val();
	var treatmentId=$("#tr_Id").val();
	var result = '';
	var rowCount = 1;

	if (res.lstOPDDoctorConsultantlist.length > 0) {

		for (var i = 0; i < res.lstOPDDoctorConsultantlist.length; i++) {

			result = result + '<tr> '

			+ '	<td >' + rowCount + '</td> '

			+ '	<td >' + res.lstOPDDoctorConsultantlist[i].doctor_name + '</td> '

			+ '	<td >' + res.lstOPDDoctorConsultantlist[i].specialisation + '</td> '

			+ '	<td >' + res.lstOPDDoctorConsultantlist[i].department + '</td> '

			+ '	<td >' + res.lstOPDDoctorConsultantlist[i].app_date + '</td> '

		
			
			+ '	<td >' 
			+ "<button class='btn btn-xs btn-danger deleteUserAccess' onclick=deleteOPDConsultantDoctor("+patientId+","+treatmentId+","+res.lstOPDDoctorConsultantlist[i].doctor_id+") > <i class='fa fa-trash-o'></i> </button>"
           + '</td> '

			+ '</tr> ';
			rowCount++;

		}
		$("#iConsDocTable").html(result);
	}
	
}

function deleteOPDConsultantDoctor(patientId,treatmentId,doctorId){
	var r = confirm("Are You Sure You Want To Delete Doctor ");
	if (r == true) {
		
		
		
		var inputs = [];
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('serviceDate=' + "");		
		inputs.push('doctorId=' + doctorId);
		inputs.push('queryType=' + "delete");
		/* inputs.push('specId=' + specId);
		inputs.push('deptId=' + deptId);
		inputs.push('intRowId=' + intRowId);
		inputs.push('preDocId=' + preDocId);
		inputs.push('time=' + time); */		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/opdconsultant/addNewConsultantOpd",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
			
				
				if(r==0){
					
					alert("Doctor Deleted Sucessfully");				
					return false;
				}else{
					alert("Network Issue...");
				}
				$("#iDate").val("");
				$("#iTime").val("");
				$("#iConsDoc").val(0);
				$("#iConsSpec").val(0);
				$("#iConsDept").val(0);
				$("#docQueryType").val("insert");
				getlstOPDConsultantDoctor();
				//changeConsDoc(docId,specId,deptId,count,date,intRowId,pid,trid,0,0,0,0);
			}
		});
	}	
}

function openCancelOPDPopUp(){
	$('#cancelNarration').val("");
	$('#narrationModal1').modal('show');
	//$('#saveNarration').attr("onclick","saveNarration()");
}

/************
* @author	:Vishant Pawar
* @date		: 09-08-2023
* @codeFor	: get  ipd consultanat doctor list
 ************/
function getlstIPDConsultantDoctor(){


	var inputs = [];
	var patientId=$("#pt_Id").val();
	var treatmentId=$("#tr_Id").val();
	var unitId=$("#unitId").val();
	
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('unitId=' + unitId);

	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdconsultant/getlstIPDConsultantDoctor",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			setIPDConsultantDoctorList(r);
					}
	});
}

function setIPDConsultantDoctorList(res){
	var patientId=$("#pt_Id").val();
	var treatmentId=$("#tr_Id").val();
	var result = '';
	var rowCount = 1;

	if (res.lstOPDDoctorConsultantlist.length > 0) {

		for (var i = 0; i < res.lstOPDDoctorConsultantlist.length; i++) {

			result = result + '<tr> '

			+ '	<td >' + rowCount + '</td> '

			+ '	<td >' + res.lstOPDDoctorConsultantlist[i].doctor_name + '</td> '

			+ '	<td >' + res.lstOPDDoctorConsultantlist[i].specialisation + '</td> '

			+ '	<td >' + res.lstOPDDoctorConsultantlist[i].department + '</td> '

			+ '	<td >' + res.lstOPDDoctorConsultantlist[i].app_date + '</td> '

		
			
			+ '	<td >' 
			+ "<button class='btn btn-xs btn-danger deleteUserAccess' onclick=deleteIPDConsultantDoctor("+patientId+","+treatmentId+","+res.lstOPDDoctorConsultantlist[i].doctor_id+") > <i class='fa fa-trash-o'></i> </button>"
           + '</td> '

			+ '</tr> ';
			rowCount++;

		}
		$("#iConsDocTable").html(result);
	}
	
}

function viewIPDConsultationPopUP(){
	
	var pid = $("#pt_Id").val();//$("#patIDLoad").val();
	var fullName = $("#patNameLoad").val();
	$("#divConsDoc").modal('show');
	$("#patIDSpan").html(pid);
	$("#patNamSpan").html(fullName);	
	
	getSpecialization();
	getHospitalDepartmentlist();
	getIPDConsultantDoctorNew()
;	//getlstIPDConsultantDoctor();
}

/************
* @author	:Vishant Pawar
* @date		: 09-08-2023
* @codeFor	: save ipd  Consultation Doctor
 ************/
function saveIPDConsultationDoctor(){
	
	 var queryType = $("#docQueryType").val(); 
	
	 
	 if(queryType == "insert"){
		 
		 var today = new Date();
		 var dd = today.getDate();
		 var mm = today.getMonth()+1; //January is 0!
		 var yyyy = today.getFullYear();
	
		 if(dd<10) {
		     dd='0'+dd;
		 } 
	
		 if(mm<10) {
		     mm='0'+mm;
		 } 
	
		today = dd+'/'+mm+'/'+yyyy;	
		var date = $('#iDate').val();
	    if (date < today) {
	    		alert("Date should not add before Date of current date.");
	    		return false;
	    	}
		/*var time = $('#iTime').val();*/
		
		var count =0;
		if (date == "") {
			alert("Please select date");
			$('#iDate').focas();
			return false;
		}
		/*if (time == "") {
			alert("Please select time");
			$('#iTime').focas();
			return false;
		}*/
		if (docId == 0) {
			alert("Please select Doctor");
			$('#iConsDoc').focas();
			return false;
		}
	}
	 
	var docId = $('#iConsDoc').val();
	var specId = $('#iConsSpec').val();
	var deptId = $('#iConsDept').val();
	var pid = $('#patIDLoad').val();
	var fullName= $("#pt_Id").val();		//$('#patNameLoad').val();
	var trid = $('#tr_Id').val();   //($('#treatmentId').html()).trim();//$('#trId').val();
	var intRowId = $('#paid').val();
	var preDocId = $('#preDocId').val();
	
	if(pid == undefined || pid == null){
		pid = $('#patIDSpan').html();
	}
	
	
	var inputs = [];
	inputs.push('patientId=' + pid);
	inputs.push('treatmentId=' + trid);
	inputs.push('serviceDate=' + date);		
	inputs.push('doctorId=' + docId);
	inputs.push('queryType=' + queryType);
	/* inputs.push('specId=' + specId);
	inputs.push('deptId=' + deptId);
	inputs.push('intRowId=' + intRowId);
	inputs.push('preDocId=' + preDocId);
	inputs.push('time=' + time); */		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdconsultant/addNewConsultantIpd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			
			
			if(r==-5){
				
				alert("Doctor already exist");				
				return false;
			}else if(r > 0){
				alert("Doctor Added Sucessfully");
			}else{
				alert("Network Issue");
			}
			$("#iDate").val("");
			$("#iTime").val("");
			$("#iConsDoc").val(0);
			$("#iConsSpec").val(0);
			$("#iConsDept").val(0);
			$("#docQueryType").val("insert");
//			getlstIPDConsultantDoctor();
			getIPDConsultantDoctorNew();
			//changeConsDoc(docId,specId,deptId,count,date,intRowId,pid,trid,0,0,0,0);
		}
	});
}

function deleteIPDConsultantDoctor(patientId,treatmentId,doctorId){
	var r = confirm("Are You Sure You Want To Delete Doctor ");
	if (r == true) {
		
		
		
		var inputs = [];
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('serviceDate=' + "");		
		inputs.push('doctorId=' + doctorId);
		inputs.push('queryType=' + "delete");
		/* inputs.push('specId=' + specId);
		inputs.push('deptId=' + deptId);
		inputs.push('intRowId=' + intRowId);
		inputs.push('preDocId=' + preDocId);
		inputs.push('time=' + time); */		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/opdconsultant/addNewConsultantIpd",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
			
				
				if(r==0){
					
					alert("Doctor Deleted Sucessfully");				
					//return false;
				}else{
					alert("Network Issue...");
				}
				$("#iDate").val("");
				$("#iTime").val("");
				$("#iConsDoc").val(0);
				$("#iConsSpec").val(0);
				$("#iConsDept").val(0);
				$("#docQueryType").val("insert");
//				getlstIPDConsultantDoctor();
				getIPDConsultantDoctorNew();
				//changeConsDoc(docId,specId,deptId,count,date,intRowId,pid,trid,0,0,0,0);
			}
		});
	}	
}


/************
* @author	:Vishant Pawar
* @date		: 27-11-2023
* @codeFor	: get  ipd consultanat doctor list
 ************/
function getIPDConsultantDoctorNew(){


	var inputs = [];
	var patientId=$("#pt_Id").val();
	var treatmentId=$("#tr_Id").val();
	var unitId=$("#unitId").val();
	
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('unitId=' + unitId);

	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdconsultant/getIPDConsultantDoctorNew",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			setIPDConsultantDoctorList(r);
					}
	});
}
