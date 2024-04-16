
/************
 * @author	: Vinod Udawant
 * @date		: 18-Nov-2019
 * @codeFor	: Check uncheck all checkbox in table
 ************/
function toggleEntryDiv(id) {

	/*$("#"+id).slideToggle('slow', function() {
	});*/
	if (id == "divForEdit") {

		$("#divForEntry").show('slow');
	} else {

		$("#divForEntry").toggle('slow');
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 21-jan-2020
 * @codeFor : saveCustomizeTemplateForOT
 ******************************************************************************/
function saveCustomizeTemplateForOT() {
	var idCustomizeTemplate = $("#idCustomizeTemplate").val();
	var tempNameId = $("#selCustomizeTemp").val();
	var templateName = $("#customizeTemplateName").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	var templateData = "";
	
	

	templateData= encodeURIComponent(CKEDITOR.instances['editorSubjective'].getData());
	if(templateData == null || templateData == "null" || templateData == "" ||  templateData == undefined)
	{
		alert("Please Write Template.");
		return false;
		
	}
	
	var inputs = [];
	inputs.push("idCustomizeTemplate=" + idCustomizeTemplate);
	inputs.push("tempNameId=" + tempNameId);
	inputs.push("temp_name=" + templateName);
	inputs.push("temp_data=" + templateData);
	inputs.push("type=" + "o");
	inputs.push("createdBy=" + userId);
	inputs.push("unitId=" + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savecustomizetemplate",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alertify.success("Record saved successfully..!");
			} else if (response == 2) {
				alertify.success("Record Updated successfully..!");
			} else if (response == 3) {
				alertify.error("OT Template Name is Already Present..!");
			} else {
				alertify.error("Network Issue");
			}

			fetchCustomizeTemplateListForOT();
			resetCustomizeTemplateForOT();

		}
	});

}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : fetchICD10Level1()
 ******************************************************************************/
function fetchCustomizeTemplateListForOT() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('type=' + "o");
	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytype",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			var divContent = "<option value='0'>select</option>";
           
            for ( var i = 0; i < r.pattemplist.length; i++){             
	                divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "'  >"
	                        + r.pattemplist[i].tempname + "</option>";
            }
           
            $("#selCustomizeTemp").html(divContent);
            $("#selCustomizeTemp").select2();
            $("#selCustomizeTemp").on("change", function () { 
            	getTemplateDataById(); 
            });
		}		
	});
}


function getTemplateDataById(){
	
	var id = $("#selCustomizeTemp").val();
	if(id==null||id==""||id=="null"||id==0){
		 $("#idCustomizeTemplate").val(0);
		 resetCustomizeTemplateForOT();
		 return false;
		
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytemplateid",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			
			$("#idCustomizeTemplate").val(r.idpattemp);
			$('#customizeTemplateName').val(r.tempname);
			CKEDITOR.instances['editorSubjective'].setData(r.tempdata);
			
		}
	});
	
}

function resetCustomizeTemplateForOT(){
	
	$('#customizeTemplateName').val("");
	
	CKEDITOR.instances['editorSubjective'].setData("");
	//$('#editorSubjective').val(" ");
	
	 $("#idCustomizeTemplate").val(0);
	 $("#selCustomizeTemp").val(0);
	
	
}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 27-jan-2020
 * @codeFor : saveCustomizeTemplateForDischarge
 ******************************************************************************/
function saveCustomizeTemplateForDischarge() {
	var idCustomizeTemplate = $("#idCustomizeTemplated").val();
	var tempNameId = $("#selCustomizeTempd").val();
	var templateName = $("#customizeTemplateNamed").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	var templateData = "";
	
	
	if(templateName==null||templateName=="null"||templateName==""){
		alert("Please Enter Template Name");
		return false;
	}

	templateData= encodeURIComponent(CKEDITOR.instances['editorSubjective'].getData());
	if(templateData == null || templateData == "null" || templateData == "" ||  templateData == undefined)
	{
		alert("Please Write Template.");
		return false;
		
	}
	
	var inputs = [];
	inputs.push("idCustomizeTemplate=" + idCustomizeTemplate);
	inputs.push("tempNameId=" + tempNameId);
	inputs.push("temp_name=" + templateName);
	inputs.push("temp_data=" + templateData);
	inputs.push("type=" + "d");
	inputs.push("createdBy=" + userId);
	inputs.push("unitId=" + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savecustomizetemplate",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alertify.success("Record saved successfully..!");
			} else if (response == 2) {
				alertify.success("Record Updated successfully..!");
			} else if (response == 3) {
				alertify.error("Discharge Template Name is Already Present..!");
			} else {
				alertify.error("Network Issue");
			}

			fetchCustomizeTemplateListForDischarge();
			resetCustomizeTemplateForDischarge();

		}
	});

}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 27-jan-2020
 * @codeFor : fetchCustomizeTemplateListForDischarge()
 ******************************************************************************/
function fetchCustomizeTemplateListForDischarge() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('type=' + "d");
	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytype",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
		
			var divContent = "<option value='0'>select</option>";
           
            for ( var i = 0; i < r.pattemplist.length; i++){             
	                divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "'  >"
	                        + r.pattemplist[i].tempname + "</option>";
            }
           
            $("#selCustomizeTempd").html(divContent);
            $("#selCustomizeTempd").select2();
            $("#selCustomizeTempd").on("change", function () { 
            	getTemplateDataByIdForDischarge(); 
            });
		}		
	});
}


function getTemplateDataByIdForDischarge(){
	
	var id = $("#selCustomizeTempd").val();
	if(id==""||id==null||id=="null"){
		$("#idCustomizeTemplated").val(0);
		resetCustomizeTemplateForDischarge();
		return false;
		id=0;
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytemplateid",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			
			$("#idCustomizeTemplate").val(r.idpattemp);
			$('#customizeTemplateName').val(r.tempname);
			CKEDITOR.instances['editorSubjectived'].setData(r.tempdata);
			
		}
	});
	
}

function resetCustomizeTemplateForDischarge(){
	
	$('#customizeTemplateNamed').val("");
	
	CKEDITOR.instances['editorSubjectived'].setData("");
	//$('#editorSubjective').val(" ");
	
	 $("#idCustomizeTemplated").val(0);
	 $("#selCustomizeTempd").val(0);
	
	
}

//Startt For Consent IPD


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 27-jan-2020
 * @codeFor : saveCustomizeTemplateForConsentIPD
 ******************************************************************************/
function saveCustomizeTemplateForConsentIPD() {
	
	var idCustomizeTemplate = $("#idCustomizeTemplateci").val();		// id (PK)
	
	var tempNameId = $("#selCustomizeTempci").val();					// 1
	
	var selectTemplateType = $("#selTemplateType").val();				// 2
	
	var doctorSpecialization = "";										// 3
	if (selectTemplateType == "h") {
		doctorSpecialization = $('#doctorSpeci').val();
		if (doctorSpecialization == "") {
			alert("Please select Specilaization");
			return;
		}
		
	}
	
	var templateName = $("#customizeTemplateNameci").val();				// 4
	
	var departName = $("#departName").val();							// 5
	
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	var templateData = "";
	var objectiveTempData = "";
	
	
//	departName=1;
	
	if(templateName==null||templateName=="null"||templateName==""){
		alert("Please Enter Template Name");
		return false;
	}
	
	

	templateData = encodeURIComponent(CKEDITOR.instances['editorSubjectiveci'].getData());
	
	if(templateData == null || templateData == "null" || templateData == "" ||  templateData == undefined)
	{
		alert("Please Write Template.");
		return false;
		
	}
	
	// aniket kanse 07 JAN 22
	objectiveTempData = encodeURIComponent(CKEDITOR.instances['editorObjective'].getData());
	
	if(departName==null||departName=="null"||departName=="" || departName == 0){
		alert("Please Select DepartName First !");
		return false;
	}
	
	/*alert("idCustomizeTemplate=" + idCustomizeTemplate);
	
	alert("tempNameId=" + tempNameId);
	alert("selectTemplateType=" + selectTemplateType);
	alert("doctorSpecialization=" + doctorSpecialization);
	
	
	
	alert("temp_name=" + templateName);
	alert("temp_data=" + templateData);
	
	alert("objectiveTempData=" + objectiveTempData);
	
	alert("departmentId=" + departName);
	
	return false;*/
	
	var inputs = [];
	inputs.push("idCustomizeTemplate=" + idCustomizeTemplate);
	
	inputs.push("tempNameId=" + tempNameId);
	inputs.push("selectTemplateType=" + selectTemplateType);
	inputs.push("doctorSpecialization=" + doctorSpecialization);
	
	
	
	inputs.push("temp_name=" + templateName);
	inputs.push("temp_data=" + templateData);
	
	inputs.push("objectiveTempData=" + objectiveTempData);
	
	inputs.push("departmentId=" + departName);
	
	
	inputs.push("type=" + "c");
	inputs.push("ipd_opd_flag=" + "ipd");
	inputs.push("createdBy=" + userId);
	inputs.push("unitId=" + unitId);
	

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savecustomizetemplate",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alertify.success("Record saved successfully..!");
			} else if (response == 2) {
				alertify.success("Record Updated successfully..!");
			} else if (response == 3) {
				alertify.error("Consent Template Name is Already Present..!");
			} else {
				alertify.error("Network Issue");
			}

			fetchCustomizeTemplateListForConsentIPD();
			resetCustomizeTemplateForConsentIPD();

		}
	});

}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 27-jan-2020
 * @codeFor : fetchCustomizeTemplateListForConsentIPD()
 ******************************************************************************/
function fetchCustomizeTemplateListForConsentIPD() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('type=' + "c");
	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytype",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
	
			var divContent = "<option value='0'>select</option>";
           
            for ( var i = 0; i < r.pattemplist.length; i++){             
	               /* divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "'  >"
	                        + r.pattemplist[i].tempname + "</option>";*/
	                divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "' style='font-size: 12px;'>"
                    + r.pattemplist[i].tempname + "</option>";
            }
           
            $("#selCustomizeTempci").html(divContent);
           // $("#selCustomizeTempci").select2();
            $("#selCustomizeTempci").on("change", function () { 
            	getTemplateDataByIdForConsentIPD(); 
            });
		}		
	});
}


function getTemplateDataByIdForConsentIPD(){
	
	var id = $("#selCustomizeTempci").val();
	if(id==""||id==null||id=="null"){
		$("#idCustomizeTemplateci").val(0);
		resetCustomizeTemplateForConsentIPD();
		return false;
		id=0;
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytemplateid",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			
		
			$("#idCustomizeTemplateci").val(r.idpattemp);
			$('#customizeTemplateNameci').val(r.tempname);
			CKEDITOR.instances['editorSubjectiveci'].setData(r.tempdata);
			$("#selTemplateType").val(r.selectTemplateType);
			$("#departName").val(r.departmentId);
			if(r.selectTemplateType == "h"){
				$("#doctorSpeci").val(r.doctorSpecialization);
				$("#specializationDiv").show();
			}else{
				$("#specializationDiv").hide();
				$("#doctorSpeci").val("0");
			}
			
		}
	});
	
}

function resetCustomizeTemplateForConsentIPD(){
	
	$('#customizeTemplateNameci').val("");
	
	CKEDITOR.instances['editorSubjectiveci'].setData("");
	//$('#editorSubjective').val(" ");
	
	 $("#idCustomizeTemplateci").val(0);
	 $("#selCustomizeTempci").val(0);
	 $("#selTemplateType").val(0);
	 $("#doctorSpeci").val(0);
	 $("#departName").val(0);
	
	
}

//End Of Consent IPD

//Start For Diet IPD
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 27-jan-2020
 * @codeFor : saveCustomizeTemplateForDietIPD
 ******************************************************************************/
function saveCustomizeTemplateForDietIPD() {
	var idCustomizeTemplate = $("#idCustomizeTemplatedi").val();
	var tempNameId = $("#selCustomizeTempdi").val();
	var templateName = $("#customizeTemplateNamedi").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	var templateData = "";
	
	
	if(templateName==null||templateName=="null"||templateName==""){
		alert("Please Enter Template Name");
		return false;
	}
	

	templateData= encodeURIComponent(CKEDITOR.instances['editorSubjectivedi'].getData());
	if(templateData == null || templateData == "null" || templateData == "" ||  templateData == undefined)
	{
		alert("Please Write Template.");
		return false;
		
	}
	
	var inputs = [];
	inputs.push("idCustomizeTemplate=" + idCustomizeTemplate);
	inputs.push("tempNameId=" + tempNameId);
	inputs.push("temp_name=" + templateName);
	inputs.push("temp_data=" + templateData);
	
	inputs.push("type=" + "di");
	inputs.push("ipd_opd_flag=" + "ipd");
	inputs.push("dietflag=" + "Y");
	inputs.push("createdBy=" + userId);
	inputs.push("unitId=" + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savecustomizetemplate",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alertify.success("Record saved successfully..!");
			} else if (response == 2) {
				alertify.success("Record Updated successfully..!");
			} else if (response == 3) {
				alertify.error("Diet IPD Template Name is Already Present..!");
			} else {
				alertify.error("Network Issue");
			}

			fetchCustomizeTemplateListForDietIPD();
			resetCustomizeTemplateForDietIPD();

		}
	});

}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 27-jan-2020
 * @codeFor : fetchCustomizeTemplateListForDietIPD()
 ******************************************************************************/
function fetchCustomizeTemplateListForDietIPD() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('type=' + "di");//diet->diet ipd
	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytype",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
		
			var divContent = "<option value='0'>select</option>";
           
            for ( var i = 0; i < r.pattemplist.length; i++){             
	                divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "'  >"
	                        + r.pattemplist[i].tempname + "</option>";
            }
           
            $("#selCustomizeTempdi").html(divContent);
            $("#selCustomizeTempdi").select2();
            $("#selCustomizeTempdi").on("change", function () { 
            	getTemplateDataByIdForDietIPD(); 
            });
		}		
	});
}


function getTemplateDataByIdForDietIPD(){
	
	var id = $("#selCustomizeTempdi").val();
	if(id==""||id==null||id=="null" ||id==0){
		$("#idCustomizeTemplatedi").val("0");
		resetCustomizeTemplateForDietIPD();
		id=0;
		return false;
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytemplateid",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			
			$("#idCustomizeTemplatedi").val(r.idpattemp);
			$('#customizeTemplateNamedi').val(r.tempname);
			CKEDITOR.instances['editorSubjectivedi'].setData(r.tempdata);
			
		}
	});
	
}

function resetCustomizeTemplateForDietIPD(){
	
	$('#customizeTemplateNamedi').val("");
	
	CKEDITOR.instances['editorSubjectivedi'].setData("");
	//$('#editorSubjective').val(" ");
	
	 $("#idCustomizeTemplatedi").val(0);
	 $("#selCustomizeTempdi").val(0);
	
	
}

//End Of Diet IPD


//Start of Diet OPD


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 27-jan-2020
 * @codeFor : saveCustomizeTemplateForDietOPD
 ******************************************************************************/
function saveCustomizeTemplateForDietOPD() {
	
	
	var idCustomizeTemplate = $("#idCustomizeTemplatedo").val();
	
	
	var tempNameId = $("#selCustomizeTempdo").val();
	var templateName = $("#customizeTemplateNamedo").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	var templateData = "";
	
	
	if(templateName==null||templateName=="null"||templateName==""){
		alert("Please Enter Template Name");
		return false;
	}
	

	templateData= encodeURIComponent(CKEDITOR.instances['editorSubjectivedo'].getData());
	if(templateData == null || templateData == "null" || templateData == "" ||  templateData == undefined)
	{
		alert("Please Write Template.");
		return false;
		
	}
	
	var inputs = [];
	inputs.push("idCustomizeTemplate=" + idCustomizeTemplate);
	inputs.push("tempNameId=" + tempNameId);
	inputs.push("temp_name=" + templateName);
	inputs.push("temp_data=" + templateData);
	
	inputs.push("type=" + "do");
	inputs.push("ipd_opd_flag=" + "opd");
	inputs.push("dietflag=" + "Y");
	inputs.push("createdBy=" + userId);
	inputs.push("unitId=" + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savecustomizetemplate",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alertify.success("Record saved successfully..!");
			} else if (response == 2) {
				alertify.success("Record Updated successfully..!");
			} else if (response == 3) {
				alertify.error("Diet OPD Template Name is Already Present..!");
			} else {
				alertify.error("Network Issue");
			}

			fetchCustomizeTemplateListForDietOPD();
			resetCustomizeTemplateForDietOPD();

		}
	});

}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 27-jan-2020
 * @codeFor : fetchCustomizeTemplateListForDietOPD()
 ******************************************************************************/
function fetchCustomizeTemplateListForDietOPD() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('type=' + "do");//diet->diet opd
	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytype",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			var divContent = "<option value='0'>select</option>";
           
            for ( var i = 0; i < r.pattemplist.length; i++){             
	                divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "'  >"
	                        + r.pattemplist[i].tempname + "</option>";
            }
           
            $("#selCustomizeTempdo").html(divContent);
            $("#selCustomizeTempdo").select2();
            $("#selCustomizeTempdo").on("change", function () { 
            	getTemplateDataByIdForDietOPD(); 
            });
		}		
	});
}


function getTemplateDataByIdForDietOPD(){
	
	var id = $("#selCustomizeTempdo").val();
	if(id==""||id==null||id=="null"){
		$("#idCustomizeTemplatedo").val(0);
		resetCustomizeTemplateForDietOPD();
		return false;
		id=0;
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytemplateid",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			
			$("#idCustomizeTemplatedo").val(r.idpattemp);
			$('#customizeTemplateNamedo').val(r.tempname);
			CKEDITOR.instances['editorSubjectivedo'].setData(r.tempdata);
			
		}
	});
	
}

function resetCustomizeTemplateForDietOPD(){
	
	$('#customizeTemplateNamedo').val("");
	
	CKEDITOR.instances['editorSubjectivedo'].setData("");
	//$('#editorSubjective').val(" ");
	
	 $("#idCustomizeTemplatedo").val(0);
	 $("#selCustomizeTempdo").val(0);
	
	
}

function showSpecilationList(){
	var selTemplateType = $("#selTemplateType").val();
	if(selTemplateType == "h"){
		$("#specializationDiv").show();
	}else{
		$("#specializationDiv").hide();
	}
}


function getSpecializationInfo() {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/admin/gethospitalspcializationList",
		success : function(r) {
			
			setspcializationList(r);
		}
	});
}

function setspcializationList(r)
{
	var listspec="";
	listspec = listspec + "<select class='col-md-12'><option value='0'>--Select --</option>";
	for(var i=0;i<r.hospitalspclgetlist	.length;i++)
	{
		listspec=listspec+'<option value="'+r.hospitalspclgetlist[i].specialisationId+'">'+r.hospitalspclgetlist[i].specializationName+'</option>';
	}
	$("#doctorSpeci").html(listspec);
}


/************
 * @author	: Vinod Udawant
* @date		: 24-Dec-2021
* @codeFor	: Get all prefix dropdown
 ************/
function getDropDownListData(callFrom,dropDownId) {
	
	var person = {
        unitId : $("#unitId").val(),
        userId : $("#userId").val(),
        callFrom : callFrom
    }
    $.ajax({
        url			: 'ehat/register/getregdata',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setDropDownListData(r,dropDownId);
        }        
    });
}
/************
* @author	: Vinod Udawant
* @date		: 24-Dec-2021
* @codeFor	: Set all prefix dropdown
 ************/
function setDropDownListData(r,dropDownId){
	var value = 4; // Manually set the value
	var text = "ALL"; // Manually set the text

	var htm = "<option value=0>--Select--</option>";
	for ( var i = 0; i < r.lstPrefix.length; i++) {

/*		htm = htm + "<option value="+r.lstPrefix[i].prefix_dropdown_id+">"+r.lstPrefix[i].prefix_dropdown_description+"</option>";
*/	
		htm = htm + "<option value='" + r.lstPrefix[i].prefix_dropdown_id + "' style='font-size: 12px;'>"
        + r.lstPrefix[i].prefix_dropdown_description + "</option>";
	
	}
	
//	htm = htm + "<option value='" + value + "'>" + text + "</option>";
	htm = htm + "<option value='" + value + "' style='font-size: 12px;'>" + text + "</option>";


	$("#"+dropDownId).html(htm);
	//$("#"+dropDownId).select2();
}
