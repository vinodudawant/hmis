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
	
	var htm = "<option value=0>--Select--</option>";
	for ( var i = 0; i < r.lstPrefix.length; i++) {

		htm = htm + "<option value="+r.lstPrefix[i].prefix_dropdown_id+">"+r.lstPrefix[i].prefix_dropdown_description+"</option>";
	}
	$("#"+dropDownId).html(htm);
	$("#"+dropDownId).select2();
}

/************
* @author	: Vinod Udawant
* @date		: 24-Dec-2021
* @codeFor	: Get Specialization For dropdown
 ************/
function getSpecialization(callFrom,dropDownId) {
	
	var person = {
        unitId : $("#unitId").val(),
        userId : $("#userId").val(),
        callFrom : callFrom
    }
    $.ajax({
        url			: 'ehat/register/getSpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setSpecialization(r,dropDownId);
        }        
    });
}
/************
* @author	: Vinod Udawant
* @date		: 24-Dec-2021
* @codeFor	: Set all prefix dropdown
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
* @author	: Vinod Udawant
* @date		: 24-Dec-2021
* @codeFor	: Get all prefix dropdown
 ************/
function getDoctorBySpecialization(callFrom,dropDownId) {
	
	var doctorId = 0;
	if(callFrom == "speciality"){
		doctorId = $("#drDeptId").val();
	}
	
	var person = {
		doctor_id : doctorId,
        unitId : $("#unitId").val(),
        userId : $("#userId").val(),
        callFrom : callFrom
    }
    $.ajax({
        url			: 'ehat/register/getDoctorBySpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setDoctorBySpecialization(r,dropDownId);
        }        
    });
}
/************
* @author	: Vinod Udawant
* @date		: 24-Dec-2021
* @codeFor	: Set all prefix dropdown
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
* @author	: Vinod Udawant
* @date		: 24-Dec-2021
* @codeFor	: Get markvisit patient list
 ************/
function fetchMarkVisitPatient() {
	
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
 		url 	: "ehat/register/getMarkVisitList",
		/*timeout : 1000 * 60 * 5,*/
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
			
			ajaxResponse = r;	
			setTempMarkVisit(r);	
 		},
	});	
}
/************
* @author	: Vinod Udawant
* @date		: 24-Dec-2021
* @codeFor	: Set markvisit patient list temp
 ************/
function setTempMarkVisit(r) {
	
	var htm="";
	var index = 1;	
	for ( var i = 0; i < r.lstRegviewDto.length;i++) {
	
		var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
		var centerPatientId = r.lstRegviewDto[i].centerPatientId;
		 
		var a="";
		var appoint="";
		var edit1="";
	
		if (r.lstRegviewDto[i].blockFlag == "T") {
			if (r.lstRegviewDto[i].tFlag == "Y") { // setting dynamic td on ui

				a = a
						+ " class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ "<button id='blockPatMV"
						+ r.lstRegviewDto[i].ptId
						+ "' class='btn btn-xs btn-primary ' data-target='' type='button' data-toggle='modal' value='MARK' disabled='disabled' ><i class='fa fa-times'></i></button>"
							
				appoint = appoint 			
				+ "class='col-sm-1-1 center' style='height: 21.5px;'> " 
				+ "<button disabled id='appoint"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' type='button' id='btnVisit' value='view'><i class='fa fa-times'></i></button>"
			
			}
			if (r.lstRegviewDto[i].tFlag == "N") // setting dynamic td on ui
			{
				a = a
						+ "class='col-sm-1-1 center'><button id='blockPatMV"
						+ r.lstRegviewDto[i].ptId
						+ "' data-toggle='modal' data-target='#ICDCodePopUp' type='button' onclick='setVisitingPatientDetails1("
						+ r.lstRegviewDto[i].ptId
						+ ",\"mark\")' value='MARK' class='btn btn-xs btn-success ' disabled='disabled'><i class='fa fa-check'></i></button>"
						
				appoint = appoint 			
				+ "class='col-sm-1-1 center' style='height: 21.5px;'> " 
				+ "<button id='appoint"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"appoint\")' type='button' id='btnVisit' value='view'><i class='fa-calendar'></i></button>"
			}
			if (r.lstRegviewDto[i].sponsorchargesSlaveId == ""
					|| r.lstRegviewDto[i].sponsorchargesSlaveId == null
					|| r.lstRegviewDto[i].sponsorchargesSlaveId == undefined
					|| r.lstRegviewDto[i].sponsorchargesSlaveId == 0) {
				edit1 = edit1
						+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' type='button' id='btnEdit"
						+ r.lstRegviewDto[i].ptId
						+ "' onclick='setVisitingPatientDetails1("
						+ r.lstRegviewDto[i].ptId + ",\"edit\")' disabled='disabled'>"
						+ "<i class='fa fa-edit'></i>" + "</button>"

			} else {
				edit1 = edit1
						+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ "<button class='btn btn-xs btn-success' disabled='disabled' data-target='' data-toggle='modal' type='button' value='EDIT' id='btnEdit"
						+ r.lstRegviewDto[i].ptId
						+ "' onclick='setVisitingPatientDetails1("
						+ r.lstRegviewDto[i].ptId
						+ ",\"edit\"),updateChargesMasterSlave("
						+ r.lstRegviewDto[i].sponsorchargesSlaveId
						+ "),fetchSuperCatogoiresSlave("
						+ r.lstRegviewDto[i].sponsorchargesSlaveId + ")'>"
						+ "<i class='fa fa-edit'></i>" + "</button>"
			}

		} else {
			if (r.lstRegviewDto[i].tFlag == "Y") { // setting dynamic td on ui

				appoint = appoint 			
				+ "class='col-sm-1-1 center' style='height: 21.5px;'> " 
				+ "<button disabled='disabled' id='appoint"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' type='button' id='btnVisit' value='view'><i class='fa fa-times'></i></button>"
								
				a = a
						+ " class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ "<button id='blockPatMV"
						+ r.lstRegviewDto[i].ptId
						+ "' class='btn btn-xs btn-primary editUserAccess' data-target='' type='button' data-toggle='modal' value='MARK'  ><i class='fa fa-times'></i></button>"
				
			}
			if (r.lstRegviewDto[i].tFlag == "N") // setting dynamic td on ui
			{
				appoint = appoint 			
				+ "class='col-sm-1-1 center' style='height: 21.5px;'> " 
				+ "<button id='appoint"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"appoint\")' type='button' id='btnVisit' value='view'><i class='fa-calendar'></i></button>"
							
				a = a
						+ "class='col-sm-1-1 center'><button id='blockPatMV"
						+ r.lstRegviewDto[i].ptId
						+ "' data-toggle='modal' data-target='#ICDCodePopUp' type='button' onclick='setVisitingPatientDetails1("
						+ r.lstRegviewDto[i].ptId
						+ ",\"mark\")' value='MARK' class='btn btn-xs btn-success editUserAccess'><i class='fa fa-check'></i></button>"
						
			}
			if (r.lstRegviewDto[i].sponsorchargesSlaveId == ""
					|| r.lstRegviewDto[i].sponsorchargesSlaveId == null
					|| r.lstRegviewDto[i].sponsorchargesSlaveId == undefined
					|| r.lstRegviewDto[i].sponsorchargesSlaveId == 0) {
				edit1 = edit1
						+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' type='button' id='btnEdit"
						+ r.lstRegviewDto[i].ptId
						+ "' onclick='setVisitingPatientDetails1("
						+ r.lstRegviewDto[i].ptId + ",\"edit\")'>"
						+ "<i class='fa fa-edit'></i>" + "</button>"

			} else {
				edit1 = edit1
						+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' type='button' value='EDIT' id='btnEdit"
						+ r.lstRegviewDto[i].ptId
						+ "' onclick='setVisitingPatientDetails1("
						+ r.lstRegviewDto[i].ptId
						+ ",\"edit\"),updateChargesMasterSlave("
						+ r.lstRegviewDto[i].sponsorchargesSlaveId
						+ "),fetchSuperCatogoiresSlave("
						+ r.lstRegviewDto[i].sponsorchargesSlaveId + ")'>"
						+ "<i class='fa fa-edit'></i>" + "</button>"
			}

		}
		
		htm=htm+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
		+ "<table class='table table-condensed cf'>"
		+ "<tbody>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.lstRegviewDto[i].patientName+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+datetime+"</td>"
		/* + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ patIdPrefix +"</td>" */
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ centerPatientId +"</td>"		
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button id='blockPatView"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"view\")' type='button' id='btnVisit' value='view'><i class='fa fa-eye View'></i></button>"	
		+ "</td>"	
		+ "<td "+edit1+"</td>"		
		+ "<td style='height: 21.5px;' class='col-sm-1-1 center hide'><button onclick='passToAdmissionPrint2("+ r.lstRegviewDto[i].ttId+")' id='btnEdit1' type='button' value='EDIT' class='btn btn-xs btn-success editUserAccess'><i class='fa fa-print'></i></button> "
		+ "</td> "		
		+ "<td class='col-sm-1-1 center hide' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-info ' type='button' onclick='viewBillHistory("+ r.lstRegviewDto[i].ptId+")'>"
		+ "<i class='fa fa-file-text-o'></i>"
		+ "</button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center hide' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-danger ' value='DELETE' type='button' id='btnDelete'  onclick='deletePatientReg("+ r.lstRegviewDto[i].ptId+","+ r.lstRegviewDto[i].ttId+")'>"
		+ "<i class='fa fa-trash-o'></i>"
		+ "</button>"
		+ "</td>"		
		+ "<td "+a+"</td>"
		
		+ "<td "+appoint+"</td>"
		
	    + "<td style='height: 21.5px;' class='col-sm-1-1 center'><input type='button' onclick='PrintCardFunction2("+ r.lstRegviewDto[i].ttId+")' value='PRINT' class='btn btn-xs btn-primary'/></td> "
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' title='Print' type='button'  value='PRINT' onclick='PrintBarcodePopUp("+ r.lstRegviewDto[i].ttId+")'><i class='fa fa-print' class='edit'></button>"
		+ "</td>" 
		+ "<td class='col-sm-1-1 center hide' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-primary ' type='button' value='COMMONAD' onclick='printCard("+ r.lstRegviewDto[i].ptId+")'><i class='fa fa-print' class='edit'></button>"
		+ "</td>";
		
		
		if(r.lstRegviewDto[i].blockFlag == "F"){//Patient with one warning = F
	
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"registration\")' data-toggle='tooltip' title='1]"+r.lstRegviewDto[i].blockNarration1+" -By("+r.lstRegviewDto[i].blockUserName1+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
		}else if(r.lstRegviewDto[i].blockFlag == "S"){//Patient with two warning = S
	
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"registration\")' data-toggle='tooltip' title='1]"+r.lstRegviewDto[i].blockNarration1+" -By("+r.lstRegviewDto[i].blockUserName1+")\n2]"+r.lstRegviewDto[i].blockNarration2+" -By("+r.lstRegviewDto[i].blockUserName2+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
		}else if(r.lstRegviewDto[i].blockFlag == "T"){//Blocked patient list = T
	
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"registration\")' data-toggle='tooltip' title='1]"+r.lstRegviewDto[i].blockNarration1+" -By("+r.lstRegviewDto[i].blockUserName1+")\n2]"+r.lstRegviewDto[i].blockNarration2+" -By("+r.lstRegviewDto[i].blockUserName2+")\n3]"+r.lstRegviewDto[i].blockNarration3+" -By("+r.lstRegviewDto[i].blockUserName3+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
		}else{//Active patient = N
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"registration\")' ><i class='fa fa-circle-o' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
		}
		
		htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' title='admPrint' type='button'  value='PRINT' onclick='AdmissionPrint("+ r.lstRegviewDto[i].ttId+")'><i class='fa fa-print' class='edit'></button>"  //Added By Pooja
		+ "</td>";
		
		htm=htm+ "</tr>" + "</tbody>" + "</table>" + "</div>";
		index++;
		Mrn++;
	}
	$("#container").html(htm);
	$("#CamPatId").val(r.lstRegviewDto[0].ptId);
	$("#container").html(htm);
	$("#allPatInfo").html(r);
	//$("#ehatTable").html(htm);
	var maxPatId=Number(r.lstRegviewDto[0].ptId)+Number(1);
	$("#maxPatId").val(maxPatId);
	$("#container").removeClass("loading");
}