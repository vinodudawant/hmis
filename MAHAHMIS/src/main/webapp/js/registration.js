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
    	async 		: false,
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
	
	var htm = "";
	if(r.lstSpecialization.length > 1)
	htm = "<option value=0>--Select--</option>";
	
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
		var isMultispeciality = $("#isMultiple").val();
		if(isMultispeciality == "Multiple")
		{
			return true;
			}
		doctorId = $("#drDeptId").val();
		
	}else if(callFrom == "generalOpdBill"){
		var isMultispeciality = $("#isMultiple").val();
		if(isMultispeciality == "Multiple")
		{
			return true;
			}
		doctorId = $("#specialityId").val();
		
	}else if(callFrom == "sponsorOpdBill"){
		var isMultispeciality = $("#isMultiple").val();
		if(isMultispeciality == "Multiple")
		{
			return true;
			}
		doctorId = $("#specialityIdSponsor").val();
	}
	
	var person = {
		doctor_id : doctorId,
        unitId : $("#unitId").val(),
        userId : $("#userId").val(),
        callFrom : callFrom
    }
    $.ajax({
    	async 		: false,
        url			: 'ehat/register/getDoctorBySpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
        	   if(doctorId == 0)
                   getDocListUnitWise();
               else
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
	
	var htm = "";
	if(r.lstDoctorBySpecialization.length > 1)
	htm = "<option value=0>--Select--</option>";
	
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
function fetchMarkVisitPatient(pageNumber) {
	var startIndex = 0;
	//var len=$("#patListLen").val();
	
	$('#opdpagenation').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	  var inputs = [];
	  inputs.push('startIndex=' + startIndex);
	
	$("#patPhotoDiv").hide();
	$("#getPatDiv").removeClass("col-md-9");
	$("#getPatDiv").addClass("col-md-12");
	
	$("#headerforsave").show();
	$("#appointHeader").hide();
	
	 var str = inputs.join('&');
	jQuery.ajax({
		/*async 	: false,
		type 	: "POST",
 		url 	: "ehat/register/getMarkVisitList",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('error');
		},*/
		async : true,
		type : "POST",
		data 	: str + "&reqType=AJAX",
		url : "ehat/register/getMarkVisitList",
		success : function(r) {
			
			ajaxResponse = r;	
			if(r.lstRegviewDto.length > 0){
				setTempMarkVisit(r,pageNumber);
			}else{
				alertify.error("Data not found");
			}
				
 		},
	});	
}
/************
* @author	: Vinod Udawant
* @date		: 24-Dec-2021
* @codeFor	: Set markvisit patient list temp
 ************/
function setTempMarkVisit(r,pageNumber) {
	var countAuto = (pageNumber - 1) + '0';
	countAuto = Number(countAuto) + 1;
	
	var htm="";
	var index = 1;	
	for ( var i = 0; i < r.lstRegviewDto.length;i++) {
	
		var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
		var centerPatientId = r.lstRegviewDto[i].centerPatientId;
		
		var a="";
		var appoint="";
		var edit1="";
	
		if(Number(r.lstRegviewDto[i].ttId) == 0){
			
			edit1 = edit1
			+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' type='button' id='btnEdit"
			+ r.lstRegviewDto[i].ptId
			+ "' onclick='setVisitingPatientDetails1("
			+ r.lstRegviewDto[i].ptId + ",\"edit\",0)'>"
			+ "<i class='fa fa-edit'></i>" + "</button>"
		}else{
			
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
		}
		
		
		
		htm=htm+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
		+ "<table class='table table-condensed cf'>"
		+ "<tbody>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+countAuto+"</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.lstRegviewDto[i].patientName+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+datetime+"</td>"
		/* + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ patIdPrefix +"</td>" */
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ centerPatientId +"</td>"		
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>";
		
		if(Number(r.lstRegviewDto[i].ttId) == 0){
			
			htm = htm + "<button id='blockPatView"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"view\",0)' type='button' id='btnVisit' value='view'><i class='fa fa-eye View'></i></button>";
		}else{
			
			htm = htm + "<button id='blockPatView"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"view\")' type='button' id='btnVisit' value='view'><i class='fa fa-eye View'></i></button>";
		}
			
		htm = htm + "</td>"	
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
		
		//+ "<td "+appoint+"</td>"
		
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
		countAuto++;
		//Mrn++;
	}
	
	var numberOfRows="";
	var indexopd=1;
	var opdcount = r.getPatientCount;
	var numberOfPages=(opdcount/10);
	var displayPagination=numberOfPages;            
	
	if(pageNumber == 1)
	{
		if(numberOfPages > 5){
		    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		    displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			 if(j == Number(pageNumber-1))
				{
			        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=fetchMarkVisitPatient("+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

				}
				else
				{
			        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=fetchMarkVisitPatient("+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
				}
				indexopd=indexopd+1;
		}
		if(numberOfPages>6){
		    numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}

		$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
		$('#opdpagenation').html(numberOfRows);
		// $("#countopdpage").val(indexopd);
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

function nextPagination(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=fetchMarkVisitPatient("+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPagination(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=fetchMarkVisitPatient("+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

function checkDuplicatePatientName(){
	
	var response = 0;
	var queryType = $("#queryType").val();
	
	if(queryType == "insert"){
		
		var prefix = $("#prefix").val();
		var fName = $.trim($("#fName").val());
		var mName = $.trim($("#mName").val());
		var lName = $.trim($("#lName").val());
		var mobile = $("#mobile").val();
		
		if(prefix == "select"){
			alert("Select Prefix!!!");
			return false;
		}else if(fName == ""){
			alert("Enter First Name!!!");
			return false;
		}else if(lName == ""){
			alert("Enter Last Name!!!");
			return false;
		}else if(mobile == "" || mobile == 0){
			alert("Enter Mobile Number!!!");
			return false;
		}else if(mobile.length!=10){
			alert("Length of Mobile Number Should 10 Digit !!!");
			return false;
		}
		
		var inputs = [];	
		inputs.push("prefix=" + prefix);
		inputs.push("fName=" + fName.toUpperCase());
		inputs.push("mName=" + mName.toUpperCase());
		inputs.push("lName=" + lName.toUpperCase());	
		inputs.push("mobile=" + mobile);	
		//inputs.push("queryType=" + queryType);	
		var str = inputs.join('&');	
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data 	: str + "&reqType=AJAX",		
			url 	: "ehat/registration/checkDuplicatePatientName",
			error 	: function() {
						
				alert('Network Issue!!!');
				response = 0;
			},
			success : function(r) {
				
				response = r;			
			}
		});
	}
	
 	return response;
}


/************
* @author	: Vinod Udawant
* @date		: 25-Dec-2021
* @codeFor	: Register/markvisit/update/delete patient
 ************/
function savePatientRegDetails() {
	
	var isDuplicate = checkDuplicatePatientName();
	
	if(isDuplicate > 0){
		
		alert("Patient name already exist.");
		return false;
	}
	
	var userId = $("#userId").val();
	var oldPatientId = 0;//$('#oldPatientId').val();
	var res=0;
	if(oldPatientId!=0 && ($("#queryType").val())=="insert"){
		res=checkIsOldPatientAvilable(oldPatientId);		
	}
	if(res!=0){
		alert("This Patient Already Exist...!");
		return false;
	}
	
	if($('#Otherid').is(':checked')){ 
		saveOtherPatientRegDetails();
  		return false;
	} 
	 
 	if($('[name="transSMS"]').is(':checked')){ 
 		transSMS="Y";
	} else { 
		transSMS="N";
	};
	
	if($('[name="transEmail"]').is(':checked')){ 
		transEmail="Y";
	} else { 
		transEmail="N";
	};
	
	if($('[name="pramoEmail"]').is(':checked')){ 
		pramoEmail="Y";
	} else { 
		pramoEmail="N";
	};
	
	if($('[name="pramoSMS"]').is(':checked')){ 
		pramoSMS="Y";					
	} else { 
		pramoSMS="N";
	};					 

	if ($('#external').is(":checked")) {
		external ="Y";// it is checked
	}else{
		external="N";
	}

	if ($('#emergency').is(":checked")) {
		emergency ="Y";// it is checked
	}else{
		emergency ="N";
	}
		
	var adharcardNo=$("#adharcardNo").val();
//	if(adharcardNo != ""){
//		if(adharcardNo.length != 12){
//			alert("Aadhaar No should be 12 digit.");
//			return false;
//		}
//	}
		 
	var ivfFlag="N";
	
	if($('[name="ivfFlag"]').is(':checked')){ 
		ivfFlag="Y";
		} 
		else { 
			ivfFlag="N";
		};	
	
		
	// patient details
	var patientId = $("#patientId").val();
 	var queryType = $("#queryType").val();
	var prefix = $("#prefix").val();
	var fName = $.trim($("#fName").val());
	var mName = $.trim($("#mName").val());
	var lName = $.trim($("#lName").val());
	var gender = $("#gender").val();
	var mobile = $("#mobile").val();
 	var dob = $("#dob").val();
	var age = $("#year").val();
	var ageMonths = $("#month").val();
	var ageDays = $("#days").val();
	var ageMm = $("#month").val();
	var ageDd = $("#days").val();
	var unitId = $("#e1").val();
	var mrnno = $("#mrnno").val();//var mrnno = $("#mrnnoHidden").val();
	var address = $.trim($("#addressText").val());
	var passport = $("#passport").val();
	var visa = $("#visa").val();
	var reasonofvst = $("#reasonofvisit").val();
	var relationId = $("#Prelation").val();//var relationId = $("#relation").val();
	var relativeName = $("#relativeName").val();
	var queryType = $("#queryType").val();
	var imageName = "";
	var aadharImageName = "";
	
	var patientApId=$("#patientApId").val();
	
	 
	if(queryType != "insert"){		
		var imageName1 = $("#curPatImg").val();
		var imagenew = $("#imageName").val();
		
		if(imagenew == imageName1 || imagenew == ""){
			imageName = $("#curPatImg").val();
		}else{
			imageName = $("#imageName").val();
		}
		 
		if(imageName==""){				
			imageName="patientPhoto.jpg";
		}		
		
		var aadharImageName1 = $("#curAadharImg").val();
		var aadharImagenew = $("#aadharImageName").val();
		
		if(aadharImagenew == aadharImageName1 || aadharImagenew == ""){
			aadharImageName = $("#curAadharImg").val();
		}else{
			aadharImageName = $("#aadharImageName").val();
		}
		 
		if(aadharImageName==""){				
			aadharImageName="aadhar.jpg";
		}		
		
	}else{
		 imageName = $("#imageName").val();
		 if(imageName==""){				
			 imageName="patientPhoto.jpg";
		 }
		 
		 aadharImageName = $("#aadharImageName").val();
		 if(aadharImageName==""){				
			 aadharImageName="aadhar.jpg";
		 }
	}
	
	if(prefix == "select"){
		alert("Select Prefix!!!");
		return false;
	}else if(fName == ""){
		alert("Enter First Name!!!");
		return false;
	}else if(lName == ""){
		alert("Enter Last Name!!!");
		return false;
	}else if(gender == ""){
		alert("Select Gender!!!");
		return false;
	}else if(mobile == "" || mobile == 0){
		alert("Enter Mobile Number!!!");
		return false;
	}else if(mobile.length!=10){
		alert("Length of Mobile Number Should 10 Digit !!!");
		return false;
	}else if(age == 0 && ageMm == 0 && ageDd == 0){
		alert("Enter Age!!!");
		return false;
	}	
	 
	var talukaId = $("#talukaId").val();//taluka
	var townId = $("#townId").val();//town
	var districtId = $("#districtId").val();//district
	var stateId = $("#stateId").val();//state
	var countryId = $("#country").val();
	var areaCode = $("#areaCode").val();
	if(areaCode == "" || areaCode == null || areaCode == undefined){
		areaCode=0;
	}

	//Added on 07-May-2018 For Permanant Address.
	var peraddress = "";
	var pertalukaId = "";
	var pertownId =  "";
	var perdistrictId =  "";
	var perstateId =  "";
	var percountryId =  "";
	var perareaCode =  "";
	
	if($("#perFlag").is(':checked')){
		 perAddress = address;
		 pertalukaId = talukaId;//taluka
		 pertownId = townId;//town
		 perdistrictId = districtId;//district
		 perstateId = stateId;//state
		 percountryId = countryId;
		 perareaCode = areaCode ;
	}else{
		 perAddress = $.trim($("#peraddressText").val());
		 pertalukaId = $("#pertalukaId").val();//taluka
		 pertownId = $("#pertownId").val();//town
		 perdistrictId = $("#perdistrictId").val();//district
		 perstateId = $("#perstateId").val();//state
		 percountryId = $("#percountry").val();
		 perareaCode = $("#perareaCode").val();
	}
	
	if (patientId == "" || patientId == null || patientId == undefined) {
		patientId = 0;
	}
	 
	//additional infoermation variables
	var oldPatientId = $("#oldPatientId").val();
	var emailId = $("#emailId").val();
	var maritalStatusId = $("#maritalStatusId").val();
	var nationalityId = $("#nationalityId").val();
	var religionId = $("#religionId").val();
	var languageId = $("#languageId").val();
	var bloodGroupId = $("#bloodGroupId").val();
	if(bloodGroupId==null || bloodGroupId =="undefined" ||  bloodGroupId==undefined || bloodGroupId== "null"){
		bloodGroupId=0;
	}
	
	var identityProofId = $("#idProof").val();
	var indentificationNumber = $("#identificationNum").val();
	var occupation = $("#occupation").val();
	var education = $("#education").val();
	var annualIncomeId = $("#annualIncome").val();
	
	if(identityProofId == 1){
		
		adharcardNo = indentificationNumber;
	}
	
	if(oldPatientId == "" || oldPatientId == null || oldPatientId == undefined){
		oldPatientId =0;
	}
	
	//***code for appointment patient reg...@sagar***// 
	var AppId=$("#AppId").val();  
  	if (AppId == "" || AppId == null || AppId == undefined || AppId =="null") {
  		AppId =0;  
 	}
	 
	//var ptid=$("#ptid").val();
	  
  	// treatment details
	var treatmentId = $("#treatmentId").val();
	var multiSponsorId = $("#multiSponsorId").val();
	var departmentId = $("#department").val();
	var caseType = $("input[name=caseByRadio]:checked").val();
	//12-09-2017 irfan req.gen form
	var reqGenFormId = $("#reqGenFormId").val();
	var refDocId=$("#refBy").val();//ref doctor id
	
	if(departmentId == 0 && ($('#rdRegOnly').is(':checked') == false)){
		alert("Select Department!!!");
		return false;
	}
	
	//var doctorIdArr = $('#doctorName').select2("val");;
	//var doctorIdList = JSON.stringify(doctorIdArr);
	var doctorIdList = "";
	var specialityId = 0;
	
	if(departmentId != 3){
		
		$('#doctorName option:selected').each(function() {
			if(!doctorIdList == ""){
				doctorIdList = doctorIdList + "," + $(this).val();
			}else{
				doctorIdList = $(this).val();
			}	    
		});
		
		if(doctorIdList == "" || doctorIdList == null || doctorIdList == "null" || doctorIdList==undefined || doctorIdList == "0"){
			alert("Please Select Doctor!");
			return false;
	 }
		
		specialityId = $("#drDeptId").val();
		
		 if(specialityId == "" || specialityId == "undefined" || specialityId == null || specialityId == "null" || specialityId==undefined || specialityId == "0"){
				alert("Please Select Doctor Speciality!");
				return false;
				specialityId = 0;
		 }
		 
	}
	
	 if(specialityId == "" || specialityId == "undefined" || specialityId == null || specialityId == "null" || specialityId==undefined || specialityId == "0"){
			specialityId = 0;
	 }
	
	
	 var meeshaFlow= $("#meeshaFlow").val();
	 if(meeshaFlow == "off"){
		 if(doctorIdList == "" || doctorIdList == "undefined" || doctorIdList == null || doctorIdList == "null"){
			// alert("Please Select Doctor First..");
			/// return false;
			 
		 }
	 }
	 
	var token = $("#token").val();
 	var height = $("#height").val();
	var weight = $("#weight").val();
	var Fheight = $("#Fheight").val();
	var Mheight = $("#Mheight").val();
	if(height == null || height == "" || height == undefined){
		height = 0;
	}
	if(weight == null || weight == "" || weight == undefined){
		weight = 0;
	}
	if(Fheight == null || Fheight == "" || Fheight == undefined){
		Fheight = 0;
	}
	if(Mheight == null || Mheight == "" || Mheight == undefined){
		Mheight = 0;
	}
	
	var BMI = finalCalculatedBMI(height, weight);
	var BSA = finalCalculatedBSA(height, weight);
	var HCIM = (height / 100);
	var TARGET_HEIGHT = finalCalculatedTARGET_HEIGHT(Fheight,Mheight,gender);
 	
	var referredBy = $("input[name=refByRadio]:checked").val();
	var referredSource = $("#selReferredBy option:selected").val();
	var referredSourceSlave = $("#txtReferredBy").val();
	var referredSourceDocId = $("#refByInHouse").val();
	if (referredBy == "source") {
		if ($("#selReferredBy").val() == "0") {
		 var res =	confirm("Do you want to Select Referred By ?");
		 if(res)
		{
			 return false;
			 
			}
		}
	}
	if(referredBy == "walkin"){
		referredSource = 0;
		referredSourceSlave = "";
		referredSourceDocId = 0;
		
	}
	if(referredSource == 9){
		referredSourceSlave = "";
	}
	
	var markvisitTflag=$("#markvisitTflag").val(); //Added by Sagar
 	 
	// bill master
	var billId = $("#billId").val();
	var sourceTypeId = $("#sourceType").val();
 	
	var sponsorId = $("#sponsor_select").val();//added by sagar
    if(sponsorId == "" || sponsorId == null || sponsorId == undefined){
        sponsorId = 0;
    }
    
    if(sourceTypeId > 0 && sponsorId == 0){
    	
    	alert("Please select sponsor name");
    	return false;
    }
    
    var empid = $("#empid").val();
    var tpaid = $("#tpaid").val();
  	$('#sponsor_select').prop('disabled', 'disabled');
 	var patientCatId = $("#patientCatId").val();
	var sponsorCatId = $("#sponsorCatId").val();
	var count = $("#count").val();
	var invoiceCount = $("#invoiceCount").val();
	
	// responsible for payment 
	var userResFlag=$("#userResFlag").val();	
	var payResId =$('#payResId').val();
	var prefix2 = $("#prefix2").val();
	var payResFName = $("#payResFName").val();
	var payResMName = $("#payResMName").val();
	var payResLName = $("#payResLName").val();
	var payResgender = $("#payResgender").val();
	var payResmobile = $("#payResmobile").val();
	var payResAdharNo = $("#payResAdharNo").val();
	var payResAddressText=$("#payResAddressText").val();	
	var relation = $("#relation").val();
	
	var refDt=$("#refDate").val();
	var refDate="";
	var validUpToDt=$("#validUpToDate").val();
	var validUpToDate="";
	var sanctionAmt=$("#sanctionAmt").val();
	var sactionOrdNo=$("#sactionOrdNo").val();
	var neisNo=$("#neisNo").val();
	var visitNo=$("#visitNo").val();
	var ipdOrOpd=$("#ipdOrOpd").val();
	var treatPermited=$("#treatPermited").val();
	var diseToBeTreat=$("#diseToBeTreat").val();
	var doa=$("#doa").val();
	var toa=$("#toa").val();
	var admissionDateTime="";
	
	//validation 
	if (doa != "") {
		if (toa == "") {
			alertify.error("Please Select Addmission Time.");
			SetFocus("toa");
			return false;
		}else{
			doa = doa.split("/").reverse().join("-");// Date:>> "2013-05-03"
			admissionDateTime=doa.trim()+" "+toa+":00";
		}
	}	
		
	if(refDt == null || refDt == "" || refDt == undefined){
		refDt=0;
	}
	if(refDt!=0){
		var dd=refDt.split("/")[0];
		var mm=refDt.split("/")[1];
		var yyyy=refDt.split("/")[2];
		refDt=dd+"/"+mm+"/"+yyyy;
		refDate=new Date(refDt);
	}else{
		refDate=null;
	}
	
	if(sanctionAmt == null || sanctionAmt == "" || sanctionAmt == undefined){
		sanctionAmt = 0;
	}
	if(sactionOrdNo == null || sactionOrdNo == "" || sactionOrdNo == undefined){
		sactionOrdNo = 0;
	}
	if(neisNo == null || neisNo == "" || neisNo == undefined){
		neisNo = 0;
	}
	if(visitNo == null || visitNo == "" || visitNo == undefined){
		visitNo = 0;
	}
	if(ipdOrOpd == null || ipdOrOpd == "" || ipdOrOpd == undefined){
		ipdOrOpd = 0;
	}
	
	if(validUpToDt == null || validUpToDt == "" || validUpToDt == undefined){
		validUpToDt=0;
	}
	if(validUpToDt!=0){
		var dd=validUpToDt.split("/")[0];
		var mm=validUpToDt.split("/")[1];
		var yyyy=validUpToDt.split("/")[2];
		validUpToDt=mm+"/"+dd+"/"+yyyy;
		validUpToDate=new Date(validUpToDt);
	}else{
		validUpToDate=null;
	}
	
	if(treatPermited == null || treatPermited == "" || treatPermited == undefined){
		treatPermited = 0;
	}
	if(diseToBeTreat == null || diseToBeTreat == "" || diseToBeTreat == undefined){
		diseToBeTreat = 0;
	}
	
	if(userResFlag=="Y"){
		if(sponsorId ==0){
			if(prefix2 == "select"){
				alert("Select Prefix of user responsible payment Section!!!");
				return false;
			}else if(payResFName == ""){
				alert("Enter First Name of user responsible payment Section!!!");
				return false;
			}else if(payResLName == ""){
				alert("Enter Last Name of user responsible payment Section!!!");
				return false;
			}
			else if(payResgender == ""){
				alert("Select Gender!!!");
				return false;
			}else if(payResmobile == "" || payResmobile == 0){
				alert("Enter Mobile Number of user responsible payment Section !!!");
				return false;
			}
			 else if(payResmobile.length!=10){
				alert("Length of Mobile Number Should 10 Digit !!!");
				return false;
			} 
			 else if(relation == "select"){
					alert("Select Relation!!!");
					return false;
			} 
		}
	}

	var mlcId=$('#mlcId').val();
	if(mlcId=="" || mlcId==undefined || mlcId==null){
		mlcId=0;
	}
	
	var mlc_flag="";
	var mlcNo=$('#mlcNo').val();
	if(mlcNo=="" || mlcNo==undefined || mlcNo==null){
		mlcNo="";
		mlc_flag="N";
	}else{
		mlc_flag="Y";
	}
	
	var firNo=$('#firNo').val();
	if(firNo=="" || firNo==undefined || firNo==null){
		firNo="";
	}	
	
	var authorityName=$('#authorityName').val();
	if(authorityName=="" || authorityName==undefined || authorityName==null){
		authorityName="";
	}
	
	var prefix3=$('#prefix3').val();
	if(prefix3=="" || prefix3==undefined || prefix3==null){
		prefix3="select";
	}
		
	var mlcFirstName=$('#mlcFirstName').val();
	if(mlcFirstName=="" || mlcFirstName==undefined || mlcFirstName==null){
		mlcFirstName="";
	}
	
	var mlcLastName=$('#mlcLastName').val();
	if(mlcLastName=="" || mlcLastName==undefined || mlcLastName==null){
		mlcLastName="";
	}
	
	var mlcCmoDoctor2=$('#mlcCmoDoctor2').val();
	if(mlcCmoDoctor2=="" || mlcCmoDoctor2==undefined || mlcCmoDoctor2==null){
		mlcCmoDoctor2=0;
	}
	
	var buccleNo=$('#buccleNo').val();
	if(buccleNo=="" || buccleNo==undefined || buccleNo==null){
		buccleNo="";
	}
	
	var plStname=$('#plStname').val();
	if(plStname=="" || plStname==undefined || plStname==null){
		plStname="";
	}
	
	var mlcGender=$('#mlcGender').val();
	if(mlcGender=="" || mlcGender==undefined || mlcGender==null){
		mlcGender="";
	}
	
	var mlcMobile=$('#mlcMobile').val();
	if(mlcMobile=="" || mlcMobile==undefined || mlcMobile==null){
		mlcMobile=0;
	}
	
	var mlcEmail=$('#mlcEmail').val();
	if(mlcEmail=="" || mlcEmail==undefined || mlcEmail==null){
		mlcEmail="";
	}
	
	var mlcPlAddess=$('#mlcPlAddess').val();
	if(mlcPlAddess=="" || mlcPlAddess==undefined || mlcPlAddess==null){
		mlcPlAddess="";
	}
	
	var mlcAge=$('#mlcAge').val();
	if(mlcAge=="" || mlcAge==undefined || mlcAge==null){
		mlcAge=0;
	}
	
	var mlcRelation=$('#mlcRelation').val();
	if(mlcRelation=="" || mlcRelation==undefined || mlcRelation==null){
		mlcRelation=0;
	}
	
	var mlcAddressText=$('#mlcAddressText').val();
	if(mlcAddressText=="" || mlcAddressText==undefined || mlcAddressText==null){
		mlcAddressText="";
	}
	
	var incidentDetails=$('#incidentDetails').val();
	if(incidentDetails=="" || incidentDetails==undefined || incidentDetails==null){
		incidentDetails="";
	}
	
	var mlcDate=$('#mlcDate').val();
	mlcDate = mlcDate.split("/").reverse().join("-");
	if(mlcDate==""  ||  mlcDate==undefined  || mlcDate==null){
		mlcDate=null;
	}
	
	// bill details
	var billDetailsId = $("#billDetailsId").val();
	var billDetailsIpdId = $("#billDetailsIpdId").val();
	var invoiceFlag = $("#invoiceFlag").val();
	
	if(invoiceFlag == "" || invoiceFlag == undefined || invoiceFlag == "undefined" || invoiceFlag == null || invoiceFlag == "null"){
		
		invoiceFlag = "N";
	}
	
	if(queryType == "markvisit"){
		treatmentId=0;
		invoiceFlag='N';
	}
		
	var casualityFlag = "N";
	var organDonarFlag = "N";
	
	if(departmentId == 4){ // Code to add patient in casuality
		
		departmentId = 2;
		casualityFlag = "Y";
	}
	
	if(reasonofvst == 1){ // code for organ donation registration
		
		organDonarFlag = "D";
		
	}else if(reasonofvst == 2){
		
		organDonarFlag = "R";
	}
	
	//Healthid details
//	var healthId = localStorage.getItem("healthId");
//	var healthIdNumber = localStorage.getItem("healthIdNumber");
	
	var healthId = $("#healthId").val();
	var healthIdNumber = $("#healthIdNumber").val();
	
	$("#savebuton").prop('disabled', true);
	
	if($('#rdRegOnly').is(':checked')){ 
		
		var patientObj = {
			patientId : patientId,
			prefix : prefix,
			fName : fName.toUpperCase(),
			mName : mName.toUpperCase(),
			lName : lName.toUpperCase(),
			gender : gender,
			mobile : mobile,
			dob : dob,
			age : age,
			ageMonths : ageMonths,
			ageDays : ageDays,
			talukaId : talukaId,
			townId : townId,
			districtId : districtId,
			stateId : stateId,
			countryId : countryId,
			areaCode : areaCode,
			address : address,
			perAddress : perAddress,
			pertalukaId : pertalukaId,
			pertownId : pertownId,
			perdistrictId : perdistrictId,
			perstateId : perstateId,
			percountryId : percountryId,
			perareaCode : perareaCode,
			unitId : unitId,
			adharcardNo:adharcardNo,
			transSMS:transSMS,
			transEmail:transEmail,
			pramoEmail:pramoEmail,
			pramoSMS:pramoSMS,
			emergency:emergency,
			external:external,
			mrnno : mrnno,
			address : address,
			imageName : imageName,
			aadharImageName : aadharImageName,
			passport : passport,
			visa : visa,
			relationId : relationId,
			relativeName : relativeName,
			perAddress : perAddress,
			pertalukaId : pertalukaId,
			pertownId : pertownId,
			perdistrictId : perdistrictId,
			perstateId : perstateId,
			percountryId : percountryId,
			perareaCode : perareaCode,
			oldPatientId : oldPatientId,
			emailId : emailId,
			maritalStatusId : maritalStatusId,
			nationalityId : nationalityId,
			religionId : religionId,
			languageId : languageId,
			bloodGroupId : bloodGroupId,
			identityProofId : identityProofId,
			identificationNumber : indentificationNumber,
			annualIncomeId : annualIncomeId,
			occupation : occupation,
			education : education,
			createdBy : userId,
			updatedBy : userId,
			queryType : queryType,
			organDonarFlag : organDonarFlag,
			patientApId : patientApId,
			ivfTreatFlag:ivfFlag,
			healthId:healthId,
			healthIdNumber:healthIdNumber
		};
		savePatientDemographicDetails(patientObj);
  		return false;
	} 
	
	var multipleSponsor = null;
	if(sourceTypeId > 0){
		
		multipleSponsor = {
				mulSponsorId : multiSponsorId,
			departmentId : departmentId,
			diseToBeTreat : diseToBeTreat,
			empid : empid,
			ipdOrOpd : ipdOrOpd,
			neisNo : neisNo,
			sactionOrdNo : sactionOrdNo,
			sanctionAmt : sanctionAmt,
			sponsorId : 1,
			chargesSlaveId : sponsorId,
			tpaid : empid,
			treatPermited : treatPermited,
			validUpToDate : validUpToDate,
			visitNo : visitNo,
			remSanctionAmt : 0,
			refDate : refDate,
			createdBy:userId,
			updatedBy:userId,
			unitId : unitId
		}
	}
	var payResObj = null;
	if($("#userResCheck").is(":checked")){
		
		payResObj = {

			payResId : payResId,
			prefix2 : prefix2,
			payResFName : payResFName,
			payResMName : payResMName,
			payResLName : payResLName,
			payResgender : payResgender,
			payResmobile : payResmobile,
			payResmobile : payResmobile,
			payResAddressText : payResAddressText,
			relation : relation,
			departmentId: departmentId,
			payResAdharNo: payResAdharNo,
			createdBy : userId,
			updatedBy : userId,
			unitId : unitId
		};
	}
	
	var mlcDetailsObj = null;
	if(mlc_flag == "Y"){
		
		mlcDetailsObj = {
				
			mlcId : mlcId,
			mlcNo : mlcNo,
			firNo : firNo,
			authorityName : authorityName,
			mlcFirstName : mlcFirstName,
			mlcLastName : mlcLastName,
			mlcCmoDoctor : mlcCmoDoctor2,
			buccleNo : buccleNo,
			plStname : plStname,
			mlcGender : mlcGender,
			mlcMobile: mlcMobile,
			mlcEmail: mlcEmail,
			mlcPlAddess:mlcPlAddess,
			mlcAge:mlcAge,
			mlcRelation:mlcRelation,
			mlcAddressText:mlcAddressText,
			incidentDetails:incidentDetails,
			mlcDate:mlcDate,
			prefix3:prefix3,
			mlc_flag:mlc_flag,
			createdBy : userId,
			updatedBy : userId,
			unitId : unitId
		};
	}
	
	var collectionDate = $("#collectionDate").val();
	var collectionTime = $("#collectionTime").val();
	
	var customerType = $("#custTypeForRegPage").val();
	var customerId = $("#custNameRegPage").val();
	
	if(customerType == "" || customerType == undefined || customerType == "undefined" || customerType == null || customerType == "null" || customerType == "0"){
		
		customerType = 1;
	}
	
	if(customerId == "" || customerId == undefined || customerId == "undefined" || customerId == null || customerId == "null" || customerId == "0"){
		
		customerId = 1;
	}
	
	
	
	var treatmentObj = {

		treatmentId : treatmentId,
		departmentId : departmentId,
		token : token,
		tFlag : markvisitTflag,
		doctorIdList : doctorIdList,
		specialityId : specialityId,
		unitId : unitId,
		refDocId : refDocId,
		refDocName : refDocId,
		weight : weight,
		height : height,
		BMI : parseFloat(BMI),
		BSA : parseFloat(BSA),
		HCIM : parseFloat(HCIM),
		TARGET_HEIGHT : parseFloat(TARGET_HEIGHT),
		empid:empid,
		tpaid:tpaid,
		caseType : caseType,
		reqGenFormId : reqGenFormId,
		referredBy : referredBy,
		referredSource : referredSource,
		referredSourceSlave : referredSourceSlave,
		referredSourceDocId : referredSourceDocId,
		refDate:refDate,
		sponsorId:sponsorId,
		sanctionAmt:sanctionAmt,
		sactionOrdNo:sactionOrdNo,
		neisNo:neisNo,
		visitNo:visitNo,
		ipdOrOpd:ipdOrOpd,
		validUpToDate:validUpToDate,
		treatPermited:treatPermited,
		diseToBeTreat:diseToBeTreat,
		admissionDateTime:admissionDateTime,
		reasonofvisit:reasonofvst,
		createdBy:userId,
		updatedBy:userId,
		casualityFlag : casualityFlag,
		organDonarFlag : organDonarFlag,
		collectionDate : collectionDate,
		collectionTime : collectionTime,
		ivfTreatFlag:ivfFlag,
		fheight : Fheight,
		mheight : Mheight,
		customerType : customerType,
		customerId : customerId
		//listPayRes : [payResObj],
		//listMlcDetails : [mlcDetailsObj]
	};
		
	var billObj = {
		
		billId:billId,
		sourceTypeId:sourceTypeId,
		departmentId : departmentId,
		unitId : unitId,
		patientCatId : patientCatId,
		sponsorCatId : sponsorCatId,
		count : count,
		sponsorId:sponsorId,
		invoiceCount : invoiceCount,
		invoiceFlag : invoiceFlag,
		createdBy : userId,
		updatedBy : userId
		
		//listPayRes : [payResObj],
		//listMlcDetails : [mlcDetailsObj]
	};
	
	//Healthid details
//	var healthId = localStorage.getItem("healthId");
//	var healthIdNumber = localStorage.getItem("healthIdNumber");
	
	//======= Set Master Object For Registration ======//
	var patientObj = {
		patientId : patientId,
		prefix : prefix,
		fName : fName.toUpperCase(),
		mName : mName.toUpperCase(),
		lName : lName.toUpperCase(),
		gender : gender,
		mobile : mobile,
		dob : dob,
		age : age,
		ageMonths : ageMonths,
		ageDays : ageDays,
		talukaId : talukaId,
		townId : townId,
		districtId : districtId,
		stateId : stateId,
		countryId : countryId,
		areaCode : areaCode,
		address : address,
		perAddress : perAddress,
		pertalukaId : pertalukaId,
		pertownId : pertownId,
		perdistrictId : perdistrictId,
		perstateId : perstateId,
		percountryId : percountryId,
		perareaCode : perareaCode,
		unitId : unitId,
		adharcardNo:adharcardNo,
		transSMS:transSMS,
		transEmail:transEmail,
		pramoEmail:pramoEmail,
		pramoSMS:pramoSMS,
		emergency:emergency,
		external:external,
		mrnno : mrnno,
		address : address,
		imageName : imageName,
		aadharImageName : aadharImageName,
		passport : passport,
		visa : visa,
		relationId : relationId,
		relativeName : relativeName,
		perAddress : perAddress,
		pertalukaId : pertalukaId,
		pertownId : pertownId,
		perdistrictId : perdistrictId,
		perstateId : perstateId,
		percountryId : percountryId,
		perareaCode : perareaCode,
		oldPatientId : oldPatientId,
		emailId : emailId,
		maritalStatusId : maritalStatusId,
		nationalityId : nationalityId,
		religionId : religionId,
		languageId : languageId,
		bloodGroupId : bloodGroupId,
		identityProofId : identityProofId,
		identificationNumber : indentificationNumber,
		annualIncomeId : annualIncomeId,
		occupation : occupation,
		education : education,
		createdBy : userId,
		updatedBy : userId,
		queryType : queryType,
		organDonarFlag : organDonarFlag,
		patientApId : patientApId,
		ivfTreatFlag:ivfFlag,
		listTreatment : [treatmentObj],
		listBill : [billObj],
		listMultipleSponsor : [],
		listPayRes : [],
		listMlcDetails : [],
		healthId:healthId,
		healthIdNumber:healthIdNumber,
		
		blockUserId1 : 0,
		blockUserId2 : 0,
		blockUserId3 : 0,		
	};
	
	if(sourceTypeId > 0){
		
		patientObj['listMultipleSponsor'].push(multipleSponsor);
	}
	
	if($("#userResCheck").is(":checked")){
	
		patientObj['listPayRes'].push(payResObj);
	}
	
	if(mlc_flag == "Y"){
		
		patientObj['listMlcDetails'].push(mlcDetailsObj);
	}
	//======= Set Master Object For Registration ======//
 	
	$.ajax({
		async 		: false,
        //url			: 'ehat/register/savePatientDetails',
		url			: 'ehat/register/savePatientDetails1',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(patientObj),
        contentType	: 'application/json',
        error 		: function() { alertify.error('Network Issue!!!'); },
        success		: function (r) {
			//alert("hi");
			$('#pleaseWait').hide();
			if(queryType == "insert" && r > 0){
				
				
				alertify.success("Registered Successfully!!!");
				$('#queryType').val("insert");
				//$("#savebuton").prop('disabled', true);
				//To Generate BarCode
				generateBarcodePrint2(r,"reg");
				if(departmentId == 2){//for ipd
					window.location = "ipd_queue.jsp";
				}else if(departmentId == 4){//added by akshata for dialysis
					window.location = "ehat_DialysisPatientRecordsDetails.jsp";
				}else{//opd,er or diag
					//$("#savebuton").prop('disabled', false);
					window.location = "ehat_opd_billing.jsp?" + "treatmentId=" + r;
				}				
 				
			}else if(queryType == "update" && r > 0){
				
				// To Regenarate reg page for inactive patient 
				if(markvisitTflag=="N"){
					alertify.success("Updated Successfully!!!");
					window.location = "ehat_reg.jsp";
  				}
				alertify.success("Updated Successfully!!!");
				$('#queryType').val("insert");
				// To Generate BarCode
				generateBarcodePrint2(r,"reg");
				
				var checkUrl = window.location.href; 
				checkUrl = checkUrl.substring(checkUrl.lastIndexOf('/')+1,checkUrl.lastIndexOf(".jsp"));
				window.location = checkUrl+".jsp";
				/*if(departmentId == 2){
					window.location = "ehat_reg.jsp";
				}else{
					window.location = "ehat_reg.jsp";
				}*/
			 
			}else if(queryType == "delete" && r > 0){
				
				alertify.error("Deleted Successfully!!!");	
				
			}else if(queryType == "markvisit"){
				
				if(r > 0){
					alertify.success("Registered from Markvisit Successfully!!!");
				    
					$('#queryType').val("insert");							
					if(departmentId==2 && specialityId== 71){
						window.location = "ehat_DialysisPatientRecordsDetails.jsp?";
						
					}else if(departmentId == 2){
						window.location = "ipd_queue.jsp";
					
					}else{
						window.location = "ehat_opd_billing.jsp?" + "treatmentId=" + r;
					}					
				}else{					
					alertify.error("Patient treatment is already active!!!");
				}
			}
			else if(queryType == "insert" && r == 0){
				alertify.error("Patient already exist...");
			}
			$('#mrnno').val("xyz");//$('#mrnnoHidden').val("xyz");
		}
	});
}


function savePatientDemographicDetails(patientDetails){
	
	$('#pleaseWait').show();
    $.ajax({
        url			: 'ehat/register/savePatientDemographicDetails',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(patientDetails),
        contentType	: 'application/json',
        error 		: function() {
			alertify.error('Network Issue!!!');
		},
        success		: function (r) {
            
        	$('#pleaseWait').hide();
        	if(r != null){
        		
        		alertify.success("Registered Successfully!!!");
    			$('#queryType').val("insert");
    			window.location = "ehat_reg.jsp";
        	}else{
        		
        		alertify.error('Network Issue!!!');
        	}
        }        
    });
}

function finalCalculatedBMI(height, weight) {

	var BMI = 0;
	var heightInCM = (height / 100);
	BMI = weight / Math.pow(heightInCM, 2);

	if (BMI == "Infinity")
		BMI = 0;

	if (isNaN(BMI))
		BMI = 0;

	return (BMI.toFixed(2));

}

function finalCalculatedBSA(heightInCm, weightInKg) {

	var BSA = 0;
	BSA = ((Math.sqrt((heightInCm * weightInKg))) / 60);

	if (BSA == "Infinity")
		BSA = 0;

	if (isNaN(BSA))
		BSA = 0;

	return (BSA.toFixed(2));

}

function finalCalculatedTARGET_HEIGHT(Fheight,Mheight,gender){

	var TARGET_HEIGHT = 0;
	
	if(gender == 'Male')
	{
			 TARGET_HEIGHT = ( parseInt(Mheight) + parseInt(Fheight) )
			 TARGET_HEIGHT = TARGET_HEIGHT/2 
			 TARGET_HEIGHT =  TARGET_HEIGHT + 6.5;
	}else
	{
		 TARGET_HEIGHT = ( parseInt(Mheight) + parseInt(Fheight) )
		 TARGET_HEIGHT = TARGET_HEIGHT/2 
		 TARGET_HEIGHT =  TARGET_HEIGHT - 6.5;

	}
	
	

	return TARGET_HEIGHT;

}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 3_June_2017
 * @Code Getting Patient Data By Id
 ******************************************************************************/
function getPatientDataByTreatmentId(r) {
	var deptID=0;
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform" : r
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",*/
		data : {
			"treatmentId" : r
		},
		url : "ehat/opdbill/getPatientInfoByTreatmentId",
		success : function(r) {
			
			
			// setTempPatientRecords(r);
			//console.log(r);
 			if(r.listRegTreBillDto[0]!=undefined || r.listRegTreBillDto[0]!=null){
			 /*****Added By Sagar******/
			var date=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString('en-GB');
			//set hidden date +
			var dd=date.split(',');
  			$("#dtofadmission").text(dd[0]);
  			//set hidden for print +
  			$("#OpdIpdNo").val(r.listRegTreBillDto[0].trcount);
  			$("#ptName").val(r.listRegTreBillDto[0].patientName);
  			$("#corporate").text(r.listRegTreBillDto[0].categoryName);
  			$("#hallName").text(r.listRegTreBillDto[0].hallName);  // added by sandip 14/02/2023
  			$("#idForDisc").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
  			$("#isPpn").val(r.listRegTreBillDto[0].isPpn);
  			$("#numbr").val(r.listRegTreBillDto[0].numbr);
  			
  			if(r.listRegTreBillDto[0].isPpn == "Y"){
  				$('#ppn').show();
  				
  				//$("#txtnumber").html(r.listRegTreBillDto[0].numbr);
  				$("#ppnNumber").html(r.listRegTreBillDto[0].numbr);
  				$('#ppnNumber').show();
  			}
  			
			
			$("#genInvoiceFlag").val(r.listRegTreBillDto[0].invoiceFlag);
			
			var fileName=r.listRegTreBillDto[0].imageName;	
			$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
			   			  
   			getSponsorRecords(r.listRegTreBillDto[0].chargesMasterSlaveId,r.listRegTreBillDto[0].sourceTypeId);
 			
			$("#age").text(r.listRegTreBillDto[0].age);
			$("#patientName").text(r.listRegTreBillDto[0].patientName );
			$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
		    $("#billNo").text(r.listRegTreBillDto[0].billId);
		    //alert(r.listRegTreBillDto[0].departmentId);
		    $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
		    //hidden set 
		    $("#deptid").val(r.listRegTreBillDto[0].departmentId);
		    
		    $("#consultingDoctorr").text(r.listRegTreBillDto[0].consultingDocName);
			 
		    dept=r.listRegTreBillDto[0].departmentId;
		    $("#drid").val(r.listRegTreBillDto[0].doctorId);
		    $("#pid").val(r.listRegTreBillDto[0].patientId);
		    
		    //****hidden set for bmi****//
 		   $("#dbirth").val(r.listRegTreBillDto[0].dob) ;
 		   $("#weight1").val(r.listRegTreBillDto[0].weight) ;
		   $("#height1").val(r.listRegTreBillDto[0].height) ;
 
			$("#sex").text(r.listRegTreBillDto[0].gender);
			deptID =r.listRegTreBillDto[0].departmentId;
			$("#deptId").val(r.listRegTreBillDto[0].departmentId);
			$("#pId").val(r.listRegTreBillDto[0].patientId);
			$("#PiD").val(r.listRegTreBillDto[0].patientId);			
			$("#bId").val(r.listRegTreBillDto[0].billId);
			$("#tId").val(r.listRegTreBillDto[0].treatmentId);
			$("#treatmentId").html(r.listRegTreBillDto[0].treatmentId);
			$("#sId").val(r.listRegTreBillDto[0].serviceId);
			//$("#ipdNo").text(r.listRegTreBillDto[0].fName);
			
  			if(r.listRegTreBillDto[0].sourceTypeId>0){
 				sponsorTypeList(r.listRegTreBillDto[0].sourceTypeId);
 			}else{
				$("#billCategoty").text("Self");
				$("#corporate").text("-");
			}
  			  $("#ipdNo").text(r.listRegTreBillDto[0].trcount);
  			$("#ipdNumber").val(r.listRegTreBillDto[0].trcount);
 			  $("#doa").text(date);
 			  $("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
			  $("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
 			  //hidden field set 
			  $("#pt_Id").val(r.listRegTreBillDto[0].patientId);
			  $("#bill_Id").val(r.listRegTreBillDto[0].billId);
			  $("#refDocId").val(r.listRegTreBillDto[0].refDocId);
			  $("#patientId").text(r.listRegTreBillDto[0].patientId);	
			  //$("#consultingDoctor").text('');//r.listRegTreBillDto[0].invoiceCount			  
			  $("#consultingDoctor").text(r.listRegTreBillDto[0].invoiceCount);
			  
			  $("#prnId").text(r.listRegTreBillDto[0].patientId);	
			  $("#preBillId").text(r.listRegTreBillDto[0].invoiceCount);			  
			  
			 var patPrefix=$("#patPrefix").val();
			 var patMiddle=$("#patMiddle").val();
			 var patSufix=$("#patSufix").val();
			 var patIdPrefix=patPrefix+patMiddle+r.listRegTreBillDto[0].patientId+patSufix;				
	  		 //$("#prnId").text(patIdPrefix);
			 $("#prnId").text(r.listRegTreBillDto[0].patientId);
			 $("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
			 $("#centeripdID").text(r.listRegTreBillDto[0].centerPatientId);

			 
			 var billPrefix=$("#billPrefix").val();
		  	 var billMiddle=$("#billMiddle").val();
		  	 var billSufix=$("#billSufix").val();
		  	 var billIdPrefix=billPrefix+billMiddle+r.listRegTreBillDto[0].invoiceCount+billSufix;
		  	 $("#preBillId").text(billIdPrefix);
		  	 $("#refDoctor").text(r.listRegTreBillDto[0].docNameChan);
		  	//$("#refDoctor").text(r.listRegTreBillDto[0].refDocName);
		  	
		  	$("#tFlag").val(r.listRegTreBillDto[0].tFlag);

		  	
		  	if(r.listRegTreBillDto[0].dischargeDate!="-" && r.listRegTreBillDto[0].dischargeDate!=null && r.listRegTreBillDto[0].dischargeDate!=""){
		  		var dischargeDate= new Date(r.listRegTreBillDto[0].dischargeDate).toLocaleString();
			  	$("#dod").text((dischargeDate).split(",")[0]+", "+r.listRegTreBillDto[0].dischargeTime);
		  	}else{
		  		$("#dod").text("-");
		  	}
		  	$("#physicalDisFlag").val(r.listRegTreBillDto[0].physicalDisFlag);
		  	$("#mrn").val(r.listRegTreBillDto[0].mrnno );
		  	$("#customerType").val(r.listRegTreBillDto[0].customerType);
		  	$("#customerId").val(r.listRegTreBillDto[0].customerId);
			  /*var len = r.listRegTreBillDto[0].listEhatBillPrefix.length;		
			  for(var n=0;n<len;n++){
				
			  		var lst = r.listRegTreBillDto[0].listEhatBillPrefix[n];
			  		// For Patient Id
			  		var patId=r.listRegTreBillDto[0].patientId;
			  		if(lst.depId==4){
			  			
			  			var prefix=lst.billPrefix;
			  			var middle=lst.billMiddle;
			  			var sufix=lst.billSuffix;
			  			var patIdPrefix=prefix+middle+patId+sufix;
			  			$("#prnId").text(patIdPrefix);			  			
			  		}
			  		// For Patient Id
			  		
			  		// For bill Id
			  		var invoiceCount=r.listRegTreBillDto[0].invoiceCount;
			  		if((lst.billRecBoth==1 || lst.billRecBoth==3)){
			  			
			  			var prefix=lst.billPrefix;
			  			var middle=lst.billMiddle;
			  			var sufix=lst.billSuffix;
			  			var billIdPrefix=prefix+middle+invoiceCount+sufix;
			  			$("#preBillId").text(billIdPrefix);			  			
			  		}
			  		// For Patient Id
			  		
			  	}*/		  
 			}
 		}
	});
	return deptID;
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 3_June_2017
 * @Code sending to bill page.
 ******************************************************************************/
function sendingToBill(r) {
	//alert("in bill");
	//alert("Treatment Id =" + r);
	window.location = "ehat_billing.jsp?" + "treatmentId=" + r;
	
	 /*$.ajax({
         type: "POST",
         url: "ehat_billing.jsp",
         data: {
        	 treatmentId: r
         },
         success: function(data) {
           
         }
     });*/

	/*
	 * window.location = "ehat_billing.jsp?" + "myObj=" +
	 * encodeURIComponent(myObj) + "&pageType=" + pageType;
	 */
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 2_June_2017
 * @Code Get all Patient records.
 ******************************************************************************/
function getAllPatientRecords(r) {
	// alert("in js");
	var deptId = 1;
	//alert(deptId);
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"deptId" : deptId
		},
		
		url : "ehat/registration/getAllRecordsDeptwise",
		success : function(r) {
			setTempPatientRecords(r);
			$("#appointedpatientDiv").html(r);

			console.log(r);
			
			setTimeout(function() {
				setDoctor(r);
			}, 0);
			
			
			

			
			// alert(r);
		}
	});
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 2_June_2017
 * @Code Template for fetching Patient data.
 ******************************************************************************/

function setTempPatientRecords(r) {
	// alert(r.listRegTreBillDto.length);
	var htm = '';
	var AppDate="22/06/2017";
	var count=2;
	var dept="";
	 
	for ( var i = 0; i < r.listRegTreBillDto.length; i++) {
		 
		 
		if(r.listRegTreBillDto[i].departmentId==2){
			
			dept="IPD";
		}else{
			dept="OPD";
		}
		
		 
			
		htm = htm
				+ '<tr>'

				/*
				 * + '<td id="row'+(r.lstUnit[int].unitId) +'" class="col-md-1 center">'+
				 * (int + 1) + '</td>'
				 */
				+ '<td class="col-md-1-1 center" id="patientId'
				+ r.listRegTreBillDto[i].patientId
				+ '">'
				+ (i + 1)
				+ '</td>'

				+ '<td class="col-md-2-1 center" id="name'+ r.listRegTreBillDto[i].patientId+'">'+ (r.listRegTreBillDto[i].patientName)+' </td>'

				+ '<td class="col-md-1-1 center" id="patientId'
				+ r.listRegTreBillDto[i].patientId
				+ '">'
				+ (r.listRegTreBillDto[i].patientId)
				+ '</td>'

				+ '<td class="col-md-1-1 center" id="mobile'
				+ r.listRegTreBillDto[i].patientId
				+ '">'
				+ (r.listRegTreBillDto[i].mobile)
				+ ' </td>'
				
				
				+ '<td class="col-md-1-1 center" id="AppDate'
				+ r.listRegTreBillDto[i].patientId
				+ '">'
				+ (AppDate)
				+ ' </td>'

				+ '<td class="col-md-1-1 center" id="token'
				+ r.listRegTreBillDto[i].patientId
				+ '">'
				+ (r.listRegTreBillDto[i].token)
				+ ' </td>'
				
				
				+ '<td class="col-md-1-1 center" id="doctorId'
				+ r.listRegTreBillDto[i].patientId
				+ '">'
				+ (r.listRegTreBillDto[i].doctorId)
				+ ' </td>'
				
				 
				 
				+ ' <td class="col-md-1-1 center"> '
				+ ' <div class="colmd-12"> '
				+ ' <div class="form-group"> '  
				+ ' <label class="col-md-4 control-label" for="doctorName"></label> ' 
			    + ' <div class="col-md-12"> ' 
			    + ' <select multiple id="doctorName'+i+'" name="eml" class="col-md-12" style="width:100%" ' 
			    + ' onchange="setSpecilizationAndDepartmentForRegistration()"> '
			    + ' </select> '
			    + ' </div> '
			    + ' </div> '
			    + ' </div> '  
			    + ' </td> '
			     			     
			      
				/*+ "<td id='divP{count}' class='numeric center'>"
				+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange=setSpecilizationAndDepartment({count}),sendTODoc({$T.al.paid},{count},'bill') class='editUserAccess' disabled='disabled'></select></td> "
				*/
				
				
				/*
				+ "<td id='divPii"+count+"' class='numeric center'>"
				+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsFromSpecilization("+count+")' class='editUserAccess' disabled='disabled'></select></td> "
				*/
				
				+ '<td class="col-md-1-1 center" id="departmentId'
				+ r.listRegTreBillDto[i].patientId
				+ '">'
				+ (dept)
				+ ' </td>'
				
				
				+ "<td class='numeric '>"
				+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("+r.listRegTreBillDto[i].patientId+") /></td> "
				
				
				+ "<td class='numeric '>"
				+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView"+count+"' onClick=sendTODoc("+r.listRegTreBillDto[i].patientId+","+count+") class='editUserAccess' disabled='disabled'/></td> "

				/*+ '<td class="col-md-1-1 center" id="billId'
				+ r.listRegTreBillDto[i].patientId
				+ '">'
				+ (r.listRegTreBillDto[i].billId)
				+ ' </td>'
*/
				
/*
				+ '<td class="col-md-1-1 center" id="treatmentId'
				+ r.listRegTreBillDto[i].patientId
				+ '">'
				+ (r.listRegTreBillDto[i].treatmentId)
				+ ' </td>'
*/
				

				+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
				+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToBill( '
				+ r.listRegTreBillDto[i].treatmentId
				+ ')" type="button"  ></button>'
				+ '</td>';
				+ '</tr>';
				
				count++;			
 
	 
	}
	 
	$("#container1").html(htm);	
}
 



/*******************************************************************************
 * @author Sagar kadam
 * @date 27_June_2017
 * @Code for autosuggestion 
 ******************************************************************************/
function getAllPatientRecordsAutosuggestion(inputId,callfrom) {
	
	var deptId=1;
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
	
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/registration/getAllRecordsDeptwiseWithAuto",
	success : function(r) {
		//setTempPatientRecords(r);

		$("#OPDPatientList").html(r);
		
		
			//$("#containerIPD").setTemplate(tabipdtempalte);
			//$("#containerIPD").processTemplate(r);
			//getAllPatientRecords();
			setTempPatientRecords(r);
			AllPatientRecordsAutosuggestioTemp(r,inputId);
		
	}
});}


/************
* @author	: Sagar Kadam
* @date		: 27-June-2017
* @codeFor	: Autosuggestion Template for patient Records
 ************/
function  AllPatientRecordsAutosuggestioTemp(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
		'custom.mcautocomplete',
		$.ui.autocomplete,
		{
			_create : function() {
				this._super();
				this.widget().menu("option", "items",
						"> :not(.ui-widget-header)");
			},
			_renderMenu : function(ul, items) {
				var self = this, thead;
				if (this.options.showHeader) {
					table = $('<div class="ui-widget-header" style="width:100%"></div>');
					$
							.each(
									this.options.columns,
									function(index, item) {
										table
												.append('<span style="padding:0 4px;float:left;width:'
														+ item.width
														+ ';">'
														+ item.name
														+ '</span>');
									});
					table
							.append('<div style="clear: both;"></div>');
					ul.append(table);
				}
				$.each(items, function(index, item) {
					self._renderItem(ul, item);
				});
			},
			_renderItem : function(ul, item) {
				var t = '', result = '';
				$
						.each(
								this.options.columns,
								function(index, column) {
									t += '<span style="padding:0 4px;float:left;width:'
											+ column.width
											+ ';">'
											+ item[column.valueField ? column.valueField
													: index]
											+ '</span>';
								});
				result = $('<li></li>')
						.data('ui-autocomplete-item', item)
						.append(
								'<a class="mcacAnchor">'
										+ t
										+ '<div style="clear: both;"></div></a>')
						.appendTo(ul);
				return result;
			}
	});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
	{
		// These next two options are what this plugin adds to the
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Patient Name',
			width : '100px',
			valueField : 'patientName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.patientName != 'Match') {
			
				 
				$('#'+id).val(ui.item.patientName);
			}
			/*
			 * This function use for Enter keypress search
			 */
			
		 
			//getAllPatientRecords2(id,'search');
			getAllPatientRecordsAutosuggestion(id,'search');
			//setAutoCompleteMarkVisit(id, 'search');
			//$("#mrnNo").val(101);
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listRegTreBillDto.length);
			var result;
			if (!data || data.listRegTreBillDto.length === 0 || !data.listRegTreBillDto
					|| data.listRegTreBillDto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'patientName' : 'Record',
					'patientId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.listRegTreBillDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}
 

/*******************************************************************************
 * @author Sagar kadam
 * @date 22_June_2017
 * @Code To set doctors 
 ******************************************************************************/

function setDoctor(r){
			
 	for ( var i = 0; i < r.listRegTreBillDto.length; i++) {
		//alert("hi");
		var strVale = r.listRegTreBillDto[i].doctorId;
		
		var strArr = strVale.split(',');
		//alert(strArr);
		$("#doctorName"+i).select2('val',strArr);
 	}
}
 

// @author : Irfan Khan @date: 24-May-2017 @reason : To Fetch All record onload
function getAllRecords() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/registration/fetchAllRecords",
		success : function(r) {
			alert(r);
			//setTempAllRecords(r);
		}
	});
}

// @author : Irfan Khan @date: 17-May-2017 @reason : Template use to set onload
// all services
function setTempAllRecords(r) {

	var htm = '';

	for ( var i = 0; i < r.listReg.length; i++) {
		htm = htm

				+ '<tr>'
				+ '<td class="col-md-1-1 center" id="regId'
				+ r.listReg[i].regId
				+ '">'
				+ (r.listReg[i].regId)
				+ '</td>'
				+ '<td class="col-md-3-1 center" id="name'
				+ r.listReg[i].regId
				+ '">'
				+ (r.listReg[i].fName)
				+ ' '
				+ (r.listReg[i].lName)
				+ ' </td>'
				+ '<td class="col-md-4-1 center" id="address'
				+ r.listReg[i].regId
				+ '">'
				+ (r.listReg[i].address)
				+ ' </td>'
				+ '<td class="col-md-2-1 center" id="mobile'
				+ r.listReg[i].regId
				+ '">'
				+ (r.listReg[i].mobile)
				+ ' </td>'
				+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
				+ '<button class="btn btn-xs btn-success " onclick="editRegRecords('
				+ r.listReg[i].regId
				+ ')" ><i class="fa fa-edit"></i></button>'
				+ '</td>'
				+ '<td class="col-md-1-1 center" >'
				+ '<button class="btn btn-xs btn-success " onclick="deleteRegRecords('
				+ r.listReg[i].regId
				+ ')" ><i class="fa fa-trash-o"></i></button>' + '</td>'
				+ '</tr>' + '<input type="hidden" id="fName'
				+ r.listReg[i].regId + '" value="' + r.listReg[i].fName + '">'
				+ '<input type="hidden" id="lName' + r.listReg[i].regId
				+ '" value="' + r.listReg[i].lName + '">'
				+ '<input type="hidden" id="address' + r.listReg[i].regId
				+ '" value="' + r.listReg[i].address + '">'
				+ '<input type="hidden" id="dob' + r.listReg[i].regId
				+ '" value="' + r.listReg[i].dob + '">'
				+ '<input type="hidden" id="prefix' + r.listReg[i].regId
				+ '" value="' + r.listReg[i].prefix + '">'
				+ '<input type="hidden" id="age' + r.listReg[i].regId
				+ '" value="' + r.listReg[i].age + '">'
				+ '<input type="hidden" id="gender' + r.listReg[i].regId
				+ '" value="' + r.listReg[i].gender + '">';

	}
	$("#dTableBodyAllReg").html(htm);
	// $("#ehatTable").html(htm);
}

 
// @author : Irfan Khan @date: 17-May-2017 @reason : Edit and Set data in fields
function editRegRecords(regId) {
	$('#prefix').val($('#prefix' + regId).val());
	$('#fName').val($('#fName' + regId).val());
	$('#lName').val($('#lName' + regId).val());
	$('#address').val($('#address' + regId).html());
	$('#gender').val($('#gender' + regId).val());
	$('#dob').val($('#dob' + regId).val());
	$('#mobile').val($('#mobile' + regId).html());
	$('#age').val($('#age' + regId).val());

	$('#queryType').val("update");

}

function deleteRegRecords(regId) {

	var r = confirm("Are You Sure You Want To Delete ?");
	if (r == true) {
		var inputs = [];
		inputs.push('regId=' + regId);
		inputs.push('queryType=' + "delete");
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/registration/save",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				alert(r);
				getAllRecords();
			}
		});
	}
}

function saveUpdatePrefix() {
	var prefixId = $("#prefixId").val();
	var prefixName = $("#prefixName").val();
	var prefixGender = $("#prefixGender").val();
	var queryType = $("#queryType").val();

	var inputs = [];
	inputs.push('prefixId=' + prefixId);
	inputs.push('prefixName=' + prefixName);
	inputs.push('prefixGender=' + prefixGender);
	inputs.push('queryType=' + queryType);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/saveUpdatePrefix",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			getAllRecords();
		}
	});
}

function fetchPatientDetails(billDetailsId) {

	var inputs = [];
	inputs.push('queryType=' + billDetailsId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/fetchPatientDetails",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r);
			//getAllRecords();
		}
	});
}



//@author : Sagar @date: 2-jun-2017 @reason : to fetch town,city,district,state  details on ui 

var CityListTemp = "<option value='0'>-SELECT-</option>{#foreach $T.cityList as cityList"
	+ "}<option value='{$T.cityList.city_id}'>{$T.cityList.city_name}</option>{#/for}";

function fetchCityListForReg(CityType) {
	var inputs = [];
	//inputs.push('action=fetchCityList');
	// inputs.push('CityType=' + encodeURIComponent(CityType));
	//var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "GET",
		//data 	: "&reqType=AJAX",
		url 	: "ehat/city/getAllCityList",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
			
			var ajaxResponse = JSON.stringify(r);
			 
			$("#city").html(ajaxResponse);		
			
			var obj = r;//eval('(' + ajaxResponse + ')');
			setTimeout(function() {
			 
				$("#perAdd3").setTemplate(CityListTemp);
				$("#perAdd3").processTemplate(obj);

				$("#townId").setTemplate(CityListTemp);
				$("#townId").processTemplate(obj);
				
				$("#pertownId").setTemplate(CityListTemp);
				$("#pertownId").processTemplate(obj);

			}, 5);

		}
	});
}


var TalukaListTemp = "<option value='0'>-SELECT-</option>{#foreach $T.talukaList as talukaList"
		+ "}<option value='{$T.talukaList.taluka_id}'>{$T.talukaList.taluka_name}</option>{#/for}";

function fetchTalukaListForReg(TalukaType) {
	var inputs = [];
	//inputs.push('action=fetchTalukaList');
	//inputs.push('TalukaType=' + encodeURIComponent(TalukaType));
	//var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		//data : "&reqType=AJAX",
		url : "ehat/taluka/getAllTalukaList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = JSON.stringify(r);
			
			 $("#taluka").html(ajaxResponse);
			 
			var obj = r;//eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				// alert(r);
				$("#talukaname").setTemplate(TalukaListTemp);
				$("#talukaname").processTemplate(obj);

				$("#perAdd8").setTemplate(TalukaListTemp);
				$("#perAdd8").processTemplate(obj);
				
				$("#talukaId").setTemplate(TalukaListTemp);
				$("#talukaId").processTemplate(obj);
				
				$("#pertalukaId").setTemplate(TalukaListTemp);
				$("#pertalukaId").processTemplate(obj);

			}, 5);

		}
	});
}



var DistrictListTemp = "<option value='0'>-SELECT-</option>{#foreach $T.districtList as districtList"
		+ "}<option value='{$T.districtList.district_id}'>{$T.districtList.district_name}</option>{#/for}";
function fetchDistrictListForReg(DistrictType) {
	
	
	var inputs = [];
	//inputs.push('action=fetchDistrictList');
	
	//inputs.push('TalukaType=' + encodeURIComponent(DistrictType));
	//var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		//data : "&reqType=AJAX",
		url : "ehat/district/getAllDistrict",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = JSON.stringify(r);
			//alert(r);
			
			 $("#district").html(ajaxResponse);
			 
			var obj = r;//eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				$("#disname").setTemplate(DistrictListTemp);
				$("#disname").processTemplate(obj);

				$("#perAdd4").setTemplate(DistrictListTemp);
				$("#perAdd4").processTemplate(obj);

				$("#districtId").setTemplate(DistrictListTemp);
				$("#districtId").processTemplate(obj);
				
				$("#perdistrictId").setTemplate(DistrictListTemp);
				$("#perdistrictId").processTemplate(obj);

			}, 5);
			setTimeout(function(){userAccess();},300);
		}
	});
}



var StateListTemp = "<option value='0'>-SELECT-</option>{#foreach $T.stateList as stateList"
	+ "}<option value='{$T.stateList.state_id}'>{$T.stateList.state_name}</option>{#/for}";
function fetchStateListForReg(StateType) {
	var inputs = [];
	//inputs.push('action=fetchStateList');
	
	//inputs.push('StateType=' + encodeURIComponent(StateType));
	//var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		//data : "&reqType=AJAX",
		url : "ehat/state/getAllState",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = JSON.stringify(r);
			
			 $("#state").html(ajaxResponse);
			
			var obj = r;//eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				$("#statename").setTemplate(StateListTemp);
				$("#statename").processTemplate(obj);

				$("#stateId").setTemplate(StateListTemp);
				$("#stateId").processTemplate(obj);
				
				$("#perstateId").setTemplate(StateListTemp);
				$("#perstateId").processTemplate(obj);

				$("#perAdd5").setTemplate(StateListTemp);
				$("#perAdd5").processTemplate(obj);

			}, 5);
			setTimeout(function(){userAccess();},300);
		}
	});
}


/*****************New(4 Feb 2016) *****************/
function setTalukaAndDistrictAndStateForRegistration(TownId,callfrom) {

	//alert(callfrom);
	if(callfrom=='local'){
		
		ajaxResponse = $("#city").html();
		json = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.cityList.length; i++) {
			if (json.cityList[i].city_id == TownId) {
				//$('#talukaId').val(json.cityList[i].taluka_ID);
				$('#talukaId').select2('val',json.cityList[i].taluka_ID);

				var talukaId = $("#talukaId").val();

				ajaxResponse = $("#taluka").html();
				json1 = JSON.parse(ajaxResponse);

				for ( var i = 0; i < json1.talukaList.length; i++) {
					if (json1.talukaList[i].taluka_id == talukaId) {
						//$('#districtId').val(json1.talukaList[i].district_ID);
						$('#districtId').select2('val',json1.talukaList[i].district_ID);

						var districtId = $("#districtId").val();

						//alert(districtId);
						ajaxResponse = $("#district").html();
						json2 = JSON.parse(ajaxResponse);

						for ( var i = 0; i < json2.districtList.length; i++) {
							if (json2.districtList[i].district_id == districtId) {
								//$('#stateId').val(json2.districtList[i].state_id);
								$('#stateId').select2('val',json2.districtList[i].state_id);
								break;
							}
						}
						break;
					}
				}
				break;
			}

		}
		
	}else if(callfrom=='permanant'){
		//alert(callfrom);
		ajaxResponse = $("#city").html();

		json = JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.cityList.length; i++) {
			if (json.cityList[i].city_id == TownId) {
				//$('#pertalukaId').val(json.cityList[i].taluka_ID);
				$('#pertalukaId').select2('val',json.cityList[i].taluka_ID);

				var talukaId = $("#pertalukaId").val();

				ajaxResponse = $("#taluka").html();
				json1 = JSON.parse(ajaxResponse);

				for ( var i = 0; i < json1.talukaList.length; i++) {
					if (json1.talukaList[i].taluka_id == talukaId) {
						//$('#perdistrictId').val(json1.talukaList[i].district_ID);
						$('#perdistrictId').select2('val',json1.talukaList[i].district_ID);
						var districtId = $("#perdistrictId").val();

						//alert(districtId);
						ajaxResponse = $("#district").html();
						json2 = JSON.parse(ajaxResponse);

						for ( var i = 0; i < json2.districtList.length; i++) {
							if (json2.districtList[i].district_id == districtId) {
								//$('#perstateId').val(json2.districtList[i].state_id);
								$('#perstateId').select2('val',json2.districtList[i].state_id);
								break;
							}
						}
						break;
					}
				}
				break;
			}

		}
		
	}
	else {
		ajaxResponse = $("#city").html();

		json = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.cityList.length; i++) {
			if (json.cityList[i].city_id == TownId) {
				$('#perAdd8').val(json.cityList[i].taluka_id);

				var talukaId = $("#perAdd8").val();

				ajaxResponse = $("#taluka").html();
				json1 = JSON.parse(ajaxResponse);

				for ( var i = 0; i < json1.talukaList.length; i++) {
					if (json1.talukaList[i].taluka_id == talukaId) {
						$('#perAdd4').val(json1.talukaList[i].district_id);

						var districtId = $("#perAdd4").val();

						//alert(districtId);
						ajaxResponse = $("#district").html();
						json2 = JSON.parse(ajaxResponse);

						for ( var i = 0; i < json2.districtList.length; i++) {
							if (json2.districtList[i].district_id == districtId) {
								$('#perAdd5').val(json2.districtList[i].state_id);
								break;
							}
						}
						break;
					}
				}
				break;
			}
		}
	}
}

function setCityAndDistrictAndStateForRegistration(TalukaId,callfrom) {
	if(callfrom=='local'){
		ajaxResponse = $("#taluka").html();
		json = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.talukaList.length; i++) {
			if (json.talukaList[i].taluka_id == TalukaId) {

				$('#districtId').val(json.talukaList[i].district_id);

				var districtId = $("#districtId").val();

				// alert(districtId);
				ajaxResponse = $("#district").html();
				json2 = JSON.parse(ajaxResponse);

				for ( var i = 0; i < json2.districtList.length; i++) {
					if (json2.districtList[i].district_id == districtId) {
						$('#stateId').val(json2.districtList[i].state_id);
						break;
					}
				}
				break;
			}
		}
		cityObjects = {

			cityList : []

		}
		ajaxResponse = $("#city").html();

		json1 = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json1.cityList.length; i++) {
			if (json1.cityList[i].taluka_id == TalukaId) {
				cityObjects.cityList.push(json1.cityList[i]);
			}
		}
		$("#townId").setTemplate(CityListTemp);
		$("#townId").processTemplate(cityObjects);
}
	else if(callfrom=='permanant'){

	ajaxResponse = $("#taluka").html();
	json = ajaxResponse;//JSON.parse(ajaxResponse);

	for ( var i = 0; i < json.talukaList.length; i++) {
		if (json.talukaList[i].taluka_id == TalukaId) {

			$('#perdistrictId').val(json.talukaList[i].district_id);

			var districtId = $("#perdistrictId").val();

			// alert(districtId);
			ajaxResponse = $("#district").html();
			json2 = ajaxResponse;//JSON.parse(ajaxResponse);

			for ( var i = 0; i < json2.districtList.length; i++) {
				if (json2.districtList[i].district_id == districtId) {
					$('#perstateId').val(json2.districtList[i].state_id);
					break;
				}
			}
			break;
		}
	}
	cityObjects = {

		cityList : []

	}
	ajaxResponse = $("#city").html();

	json1 = ajaxResponse;//JSON.parse(ajaxResponse);

	for ( var i = 0; i < json1.cityList.length; i++) {
		if (json1.cityList[i].taluka_id == TalukaId) {
			cityObjects.cityList.push(json1.cityList[i]);
		}
	}
	$("#pertownId").setTemplate(CityListTemp);
	$("#pertownId").processTemplate(cityObjects);

}
	
	else{
		ajaxResponse = $("#taluka").html();
		json = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.talukaList.length; i++) {
			if (json.talukaList[i].taluka_id == TalukaId) {

				$('#perAdd4').val(json.talukaList[i].district_id);

				var districtId = $("#perAdd4").val();

				// alert(districtId);
				ajaxResponse = $("#district").html();
				json2 = ajaxResponse;//JSON.parse(ajaxResponse);

				for ( var i = 0; i < json2.districtList.length; i++) {
					if (json2.districtList[i].district_id == districtId) {
						$('#perAdd5').val(json2.districtList[i].state_id);
						break;
						/*****************New(4 Feb 2016) *****************/
						function setTalukaAndDistrictAndStateForRegistration(TownId,callfrom) {

							//alert(callfrom);
							if(callfrom=='local'){
								
								ajaxResponse = $("#city").html();

								json = ajaxResponse;//JSON.parse(ajaxResponse);

								for ( var i = 0; i < json.cityList.length; i++) {
									if (json.cityList[i].city_id == TownId) {
										$('#talukaId').val(json.cityList[i].taluka_id);

										var talukaId = $("#talukaId").val();

										ajaxResponse = $("#taluka").html();
										json1 = ajaxResponse;//JSON.parse(ajaxResponse);

										for ( var i = 0; i < json1.talukaList.length; i++) {
											if (json1.talukaList[i].taluka_id == talukaId) {
												$('#districtId').val(json1.talukaList[i].district_id);

												var districtId = $("#districtId").val();

												//alert(districtId);
												ajaxResponse = $("#district").html();
												json2 = ajaxResponse;//JSON.parse(ajaxResponse);

												for ( var i = 0; i < json2.districtList.length; i++) {
													if (json2.districtList[i].district_id == districtId) {
														$('#stateId').val(json2.districtList[i].state_id);
														break;
													}
												}
												break;
											}
										}
										break;
									}

								}
								
							}
							else {
								ajaxResponse = $("#city").html();

								json = ajaxResponse;//JSON.parse(ajaxResponse);

								for ( var i = 0; i < json.cityList.length; i++) {
									if (json.cityList[i].city_id == TownId) {
										$('#perAdd8').val(json.cityList[i].taluka_id);

										var talukaId = $("#perAdd8").val();

										ajaxResponse = $("#taluka").html();
										json1 = ajaxResponse;//JSON.parse(ajaxResponse);

										for ( var i = 0; i < json1.talukaList.length; i++) {
											if (json1.talukaList[i].taluka_id == talukaId) {
												$('#perAdd4').val(json1.talukaList[i].district_id);

												var districtId = $("#perAdd4").val();

												//alert(districtId);
												ajaxResponse = $("#district").html();
												json2 = ajaxResponse;//JSON.parse(ajaxResponse);

												for ( var i = 0; i < json2.districtList.length; i++) {
													if (json2.districtList[i].district_id == districtId) {
														$('#perAdd5').val(json2.districtList[i].state_id);
														break;
													}
												}
												break;
											}
										}
										break;
									}
								}
							}
						}

						function setCityAndDistrictAndStateForRegistration(TalukaId,callfrom) {
							if(callfrom=='local'){
								ajaxResponse = $("#taluka").html();
								json = ajaxResponse;//JSON.parse(ajaxResponse);

								for ( var i = 0; i < json.talukaList.length; i++) {
									if (json.talukaList[i].taluka_id == TalukaId) {

										$('#districtId').val(json.talukaList[i].district_id);

										var districtId = $("#districtId").val();

										// alert(districtId);
										ajaxResponse = $("#district").html();
										json2 = ajaxResponse;//JSON.parse(ajaxResponse);

										for ( var i = 0; i < json2.districtList.length; i++) {
											if (json2.districtList[i].district_id == districtId) {
												$('#stateId').val(json2.districtList[i].state_id);
												break;
											}
										}
										break;
									}
								}
								cityObjects = {

									cityList : []

								}
								ajaxResponse = $("#city").html();

								json1 = ajaxResponse;//JSON.parse(ajaxResponse);

								for ( var i = 0; i < json1.cityList.length; i++) {
									if (json1.cityList[i].taluka_id == TalukaId) {
										cityObjects.cityList.push(json1.cityList[i]);
									}
								}
								$("#townId").setTemplate(CityListTemp);
								$("#townId").processTemplate(cityObjects);
						}
							
							else{
								ajaxResponse = $("#taluka").html();
								json = ajaxResponse;//JSON.parse(ajaxResponse);

								for ( var i = 0; i < json.talukaList.length; i++) {
									if (json.talukaList[i].taluka_id == TalukaId) {

										$('#perAdd4').val(json.talukaList[i].district_id);

										var districtId = $("#perAdd4").val();

										// alert(districtId);
										ajaxResponse = $("#district").html();
										json2 = ajaxResponse;//JSON.parse(ajaxResponse);

										for ( var i = 0; i < json2.districtList.length; i++) {
											if (json2.districtList[i].district_id == districtId) {
												$('#perAdd5').val(json2.districtList[i].state_id);
												break;
											}
										}
										break;
									}
								}
								cityObjects = {

									cityList : []

								}
								ajaxResponse = $("#city").html();

								json1 = ajaxResponse;//JSON.parse(ajaxResponse);

								for ( var i = 0; i < json1.cityList.length; i++) {
									if (json1.cityList[i].taluka_id == TalukaId) {
										cityObjects.cityList.push(json1.cityList[i]);
									}
								}
								$("#perAdd3").setTemplate(CityListTemp);
								$("#perAdd3").processTemplate(cityObjects);

							}
							
						}



						function setTalukaAndCityAndStateForRegistration(DistrictId,callfrom) {
							
							if(callfrom=="local"){
								ajaxResponse = $("#district").html();
								json = ajaxResponse;//JSON.parse(ajaxResponse);

								for ( var i = 0; i < json.districtList.length; i++) {
									if (json.districtList[i].district_id == DistrictId) {
										$('#stateId').val(json.districtList[i].state_id);
										break;
									}
								}
								
								talukaObjects = {
										talukaList : []
										
								}
								
								ajaxResponse = $("#taluka").html();

								json1 = ajaxResponse;//JSON.parse(ajaxResponse);

								for ( var i = 0; i < json1.talukaList.length; i++) {
									if (json1.talukaList[i].district_id == DistrictId) {
										talukaObjects.talukaList.push(json1.talukaList[i]);
									}
								}
								$("#talukaId").setTemplate(TalukaListTemp);
								$("#talukaId").processTemplate(talukaObjects);

								$("#townId").setTemplate(CityListTemp);
								$("#townId").processTemplate(talukaObjects);
							}
							else{
								ajaxResponse = $("#district").html();
								json = ajaxResponse;//JSON.parse(ajaxResponse);

								for ( var i = 0; i < json.districtList.length; i++) {
									if (json.districtList[i].district_id == DistrictId) {
										$('#perAdd5').val(json.districtList[i].state_id);
										break;
									}
								}
								
								talukaObjects = {
										talukaList : []
										
								}
								
								ajaxResponse = $("#taluka").html();

								json1 = ajaxResponse;//JSON.parse(ajaxResponse);

								for ( var i = 0; i < json1.talukaList.length; i++) {
									if (json1.talukaList[i].district_id == DistrictId) {
										talukaObjects.talukaList.push(json1.talukaList[i]);
									}
								}
								$("#perAdd8").setTemplate(TalukaListTemp);
								$("#perAdd8").processTemplate(talukaObjects);

								$("#perAdd3").setTemplate(CityListTemp);
								$("#perAdd3").processTemplate(talukaObjects);
							}
							
						}

								
								
						function setTalukaAndCityAndDistrictForRegistration(StateId,callfrom) {
							
							if(callfrom=="local"){

								var stateObjects = {
									districtList : []
								};
								var OBJ = $("#district").html();

							    //alert(OBJ);
								json = ajaxResponse;//JSON.parse(OBJ);
								//json = eval('(' + ajaxResponse + ')');
								//alert(json);
								
								for ( var i = 0; i < json.districtList.length; i++) {

									//alert(json.districtList[i].state_id);
									
									if (json.districtList[i].state_id == StateId) {
										stateObjects.districtList.push(json.districtList[i]);
									}
								}

								$("#districtId").setTemplate(DistrictListTemp);
								$("#districtId").processTemplate(stateObjects);
								
								$("#talukaId").setTemplate(TalukaListTemp);
								$("#talukaId").processTemplate(stateObjects);
								
							    $("#townId").setTemplate(CityListTemp);
								$("#townId").processTemplate(stateObjects);
							}

							else{

								var stateObjects = {
									districtList : []
								};
								ajaxResponse = $("#district").html();

								//alert(ajaxResponse);
								json = ajaxResponse;//JSON.parse(ajaxResponse);

								
								for ( var i = 0; i < json.districtList.length; i++) {

									//alert(json.districtList[i].state_id);
									
									if (json.districtList[i].state_id == StateId) {
										stateObjects.districtList.push(json.districtList[i]);
									}
								}

								$("#perAdd4").setTemplate(DistrictListTemp);
								$("#perAdd4").processTemplate(stateObjects);
								
								$("#perAdd8").setTemplate(TalukaListTemp);
								$("#perAdd8").processTemplate(stateObjects);
								
							    $("#perAdd3").setTemplate(CityListTemp);
								$("#perAdd3").processTemplate(stateObjects);
							}
						}

					}
				}
				break;
			}
		}
		cityObjects = {

			cityList : []

		}
		ajaxResponse = $("#city").html();

		json1 = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json1.cityList.length; i++) {
			if (json1.cityList[i].taluka_id == TalukaId) {
				cityObjects.cityList.push(json1.cityList[i]);
			}
		}
		$("#perAdd3").setTemplate(CityListTemp);
		$("#perAdd3").processTemplate(cityObjects);

	}
	
}

function setTalukaAndCityAndStateForRegistration(DistrictId,callfrom) {
	
	if(callfrom=="local"){
		ajaxResponse = $("#district").html();
		json = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.districtList.length; i++) {
			if (json.districtList[i].district_id == DistrictId) {
				$('#stateId').val(json.districtList[i].state_id);
				break;
			}
		}
		
		talukaObjects = {
				talukaList : []
				
		}
		
		ajaxResponse = $("#taluka").html();

		json1 = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json1.talukaList.length; i++) {
			if (json1.talukaList[i].district_id == DistrictId) {
				talukaObjects.talukaList.push(json1.talukaList[i]);
			}
		}
		$("#talukaId").setTemplate(TalukaListTemp);
		$("#talukaId").processTemplate(talukaObjects);

		$("#townId").setTemplate(CityListTemp);
		$("#townId").processTemplate(talukaObjects);
	}
	else if(callfrom=="permanant"){

		ajaxResponse = $("#district").html();
		json = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.districtList.length; i++) {
			if (json.districtList[i].district_id == DistrictId) {
				$('#perstateId').val(json.districtList[i].state_id);
				break;
			}
		}
		
		talukaObjects = {
				talukaList : []
				
		}
		
		ajaxResponse = $("#taluka").html();

		json1 = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json1.talukaList.length; i++) {
			if (json1.talukaList[i].district_id == DistrictId) {
				talukaObjects.talukaList.push(json1.talukaList[i]);
			}
		}
		$("#pertalukaId").setTemplate(TalukaListTemp);
		$("#pertalukaId").processTemplate(talukaObjects);

		$("#pertownId").setTemplate(CityListTemp);
		$("#pertownId").processTemplate(talukaObjects);
	
	}
	else{
		ajaxResponse = $("#district").html();
		json = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json.districtList.length; i++) {
			if (json.districtList[i].district_id == DistrictId) {
				$('#perAdd5').val(json.districtList[i].state_id);
				break;
			}
		}
		
		talukaObjects = {
				talukaList : []
				
		}
		
		ajaxResponse = $("#taluka").html();

		json1 = ajaxResponse;//JSON.parse(ajaxResponse);

		for ( var i = 0; i < json1.talukaList.length; i++) {
			if (json1.talukaList[i].district_id == DistrictId) {
				talukaObjects.talukaList.push(json1.talukaList[i]);
			}
		}
		$("#perAdd8").setTemplate(TalukaListTemp);
		$("#perAdd8").processTemplate(talukaObjects);

		$("#perAdd3").setTemplate(CityListTemp);
		$("#perAdd3").processTemplate(talukaObjects);
	}
	
}
	
function setTalukaAndCityAndDistrictForRegistration(StateId,callfrom) {
	
	if(callfrom=="local"){

		var stateObjects = {
			districtList : []
		};
		var OBJ = $("#district").html();

	    //alert(OBJ);
		json = OBJ;//JSON.parse(OBJ);
		//json = eval('(' + ajaxResponse + ')');
		//alert(json);
		
		for ( var i = 0; i < json.districtList.length; i++) {

			//alert(json.districtList[i].state_id);
			
			if (json.districtList[i].state_id == StateId) {
				stateObjects.districtList.push(json.districtList[i]);
			}
		}

		$("#districtId").setTemplate(DistrictListTemp);
		$("#districtId").processTemplate(stateObjects);
		
		$("#talukaId").setTemplate(TalukaListTemp);
		$("#talukaId").processTemplate(stateObjects);
		
	    $("#townId").setTemplate(CityListTemp);
		$("#townId").processTemplate(stateObjects);
	}
	else if(callfrom=="permanant"){


		var stateObjects = {
			districtList : []
		};
		var OBJ = $("#district").html();

	    //alert(OBJ);
		json = OBJ;//JSON.parse(OBJ);
		//json = eval('(' + ajaxResponse + ')');
		//alert(json);
		
		for ( var i = 0; i < json.districtList.length; i++) {

			//alert(json.districtList[i].state_id);
			
			if (json.districtList[i].state_id == StateId) {
				stateObjects.districtList.push(json.districtList[i]);
			}
		}

		$("#perdistrictId").setTemplate(DistrictListTemp);
		$("#perdistrictId").processTemplate(stateObjects);
		
		$("#pertalukaId").setTemplate(TalukaListTemp);
		$("#pertalukaId").processTemplate(stateObjects);
		
	    $("#pertownId").setTemplate(CityListTemp);
		$("#pertownId").processTemplate(stateObjects);
	
	}

	else{

		var stateObjects = {
			districtList : []
		};
		ajaxResponse = $("#district").html();

		//alert(ajaxResponse);
		json = ajaxResponse;//JSON.parse(ajaxResponse);

		
		for ( var i = 0; i < json.districtList.length; i++) {

			//alert(json.districtList[i].state_id);
			
			if (json.districtList[i].state_id == StateId) {
				stateObjects.districtList.push(json.districtList[i]);
			}
		}

		$("#perAdd4").setTemplate(DistrictListTemp);
		$("#perAdd4").processTemplate(stateObjects);
		
		$("#perAdd8").setTemplate(TalukaListTemp);
		$("#perAdd8").processTemplate(stateObjects);
		
	    $("#perAdd3").setTemplate(CityListTemp);
		$("#perAdd3").processTemplate(stateObjects);
	}
}

//for selecting doctor  list on reg page 

function setSpecilizationAndDepartmentForRegistration() {

	var docId = 0;
	ajaxResponse = $("#doctorObject").val();

	doctorBean = eval('(' + ajaxResponse + ')');

	var admittedUnder = $("#refTo").val();

	if (admittedUnder == "select") {
		alert("Please select patient category");
		return false;
	}
	if (admittedUnder == "opd") {
		docId = $("#doctorName").val();
	} else if (admittedUnder == "ipd") {
		docId = $("#ipdDoctorName").val();
	} else if (admittedUnder == "er") {
		docId = $("#erCMOConsultant").val();
	} else if (admittedUnder == "room") {
		docId = $("#ReserveDoctorName").val();
	}

	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].di == docId) {
			if (admittedUnder == "opd") {
				$('#doctorSpecilization').val(doctorBean.dl[i].sp);
				$('#doctorDepartments').val(doctorBean.dl[i].dept);
			}
			if (admittedUnder == "ipd") {
				$('#ipdDoctorSpecilization').val(doctorBean.dl[i].sp);
				$('#ipdDoctorDepartments').val(doctorBean.dl[i].dept);
			}
			if (admittedUnder == "er") {
				$('#erdoctorSpecilization').val(doctorBean.dl[i].sp);
				$('#erdoctorDepartments').val(doctorBean.dl[i].dept);
			}
			if (admittedUnder == "room") {
				$('#ReserveDoctorSpecilization').val(doctorBean.dl[i].sp);
				$('#ReserveDoctorDepartments').val(doctorBean.dl[i].dept);
			}
		}
		if (docId == 0) {
			if (admittedUnder == "opd") {
				$('#doctorSpecilization').val(0);
				$('#doctorDepartments').val(0);
			}
			if (admittedUnder == "ipd") {
				$('#ipdDoctorSpecilization').val(0);
				$('#ipdDoctorDepartments').val(0);
			}
			if (admittedUnder == "er") {
				$('#erdoctorSpecilization').val(0);
				$('#erdoctorDepartments').val(0);
			}
			if (admittedUnder == "room") {
				$('#ReserveDoctorSpecilization').val(doctorBean.dl[i].sp);
				$('#ReserveDoctorDepartments').val(doctorBean.dl[i].dept);
			}
		}
	}		
}

function setConsultDocIds(){
	
	var conDocIds = $("#doctorName").val();
	var conDocIdsExist = $("#doctorNameProxy").val();
	if(conDocIdsExist == null || conDocIdsExist == 'null'){
		
		$('#doctorNameProxy').select2('val',conDocIds);	
	}else{
		
		$('#doctorNameProxy').select2('val',conDocIdsExist.concat(conDocIds));	
	}	
}

function setDoctorsForDepartmentsForRegistration() {
	var doctorObjects = {
		dl : []
	};
	ajaxResponse = $("#doctorObject").val();
	doctorBean = eval('(' + ajaxResponse + ')');
	var admittedUnder = $("#refTo").val();
	if (admittedUnder == "select") {
		alert("Please select patient category");
		return false;
	}
	var departmentId;
	if (admittedUnder == "opd") {
		departmentId = $("#doctorDepartments").val();
	} else if (admittedUnder == "ipd") {
		departmentId = $("#ipdDoctorDepartments").val();
	} else if (admittedUnder == "er") {
		departmentId = $("#erdoctorDepartments").val();
	} else if (admittedUnder == "room") {
		departmentId = $("#ReserveDoctorDepartments").val();
	}

	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].dept == departmentId) {
			doctorObjects.dl.push(doctorBean.dl[i]);
		}
	}
	if (admittedUnder == "opd") {
		$("#doctorName").setTemplate(docNameTemplateForOPD);
		$("#doctorName").processTemplate(doctorObjects);
	} else if (admittedUnder == "ipd") {
		$("#ipdDoctorName").setTemplate(docNameTemplateForOPD);
		$("#ipdDoctorName").processTemplate(doctorObjects);
	} else if (admittedUnder == "er") {
		$("#erCMOConsultant").setTemplate(docNameTemplateForOPD);
		$("#erCMOConsultant").processTemplate(doctorObjects);
	} else if (admittedUnder == "room") {
		$("#ReserveDoctorName").setTemplate(docNameTemplateForOPD);
		$("#ReserveDoctorName").processTemplate(doctorObjects);
	}
}

function setDoctorsFromSpecilizationForRegistration() {
	var doctorObjects = {
		dl : []
	};

	ajaxResponse = $("#doctorObject").val();
	doctorBean = eval('(' + ajaxResponse + ')');
	var admittedUnder = $("#refTo").val();
	var specializationId;
	if (admittedUnder == "opd") {
		specializationId = $("#doctorSpecilization").val();
	} else if (admittedUnder == "ipd") {
		specializationId = $("#ipdDoctorSpecilization").val();
	} else if (admittedUnder == "er") {
		specializationId = $("#erdoctorSpecilization").val();
	} else if (admittedUnder == "room") {
		specializationId = $("#ReserveDoctorSpecilization").val();
	}

	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].sp == specializationId) {
			doctorObjects.dl.push(doctorBean.dl[i]);
		}
	}
	if (admittedUnder == "opd") {
		$("#doctorName").setTemplate(docNameTemplateForOPD);
		$("#doctorName").processTemplate(doctorObjects);
	} else if (admittedUnder == "ipd") {
		$("#ipdDoctorName").setTemplate(docNameTemplateForOPD);
		$("#ipdDoctorName").processTemplate(doctorObjects);
	} else if (admittedUnder == "er") {
		$("#erCMOConsultant").setTemplate(docNameTemplateForOPD);
		$("#erCMOConsultant").processTemplate(doctorObjects);
	} else if (admittedUnder == "room") {
		$("#ReserveDoctorName").setTemplate(docNameTemplateForOPD);
		$("#ReserveDoctorName").processTemplate(doctorObjects);
	}

}

function featchDignoPatBill(type, pageName) {
	count = 1;
	var searchBy = "";
	var value = "";
	if (type == "search") {
		var byName = $("#byName").val().trim();
		var byId = $("#byId").val().trim();
		if (byName != "" && byId != "") {
			alert("Please Search  By Either Patient Id OR Patient Name!");
			return false;
		} else if (byName == " " && byId == " ") {
			alert("Please Enter Patient Name Or Patient Id");
			return false;
		} else if (byName == null && byId == null) {
			alert("Please Enter Patient Name Or Patient Id");
			return false;
		} else if (byName.length == 0 && byId.length == 0) {
			alert("Please Enter Patient Name Or Patient Id");
			return false;
		} else {
			if (byName != "") {
				searchBy = "byName";
				value = byName;
			} else if (byId != "") {
				searchBy = "byId";
				value = byId;
			}
		}
	}

	var inputs = [];
	inputs.push('action=featchDignoPatBill');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	inputs.push('type=' + type);
	inputs.push('pageName=' + pageName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#appointedpatientDiv").html(ajaxResponse);
			$("#registeredPatientDiv").html(ajaxResponse);
			PatientAppointmentsBean = eval('(' + ajaxResponse + ')');

			if (PatientAppointmentsBean.pl.length > 0) {
				if (pageName == "dignoAssigntest") {
					$("#container").setTemplate(featchDignoPatTemp);
					$("#container").processTemplate(PatientAppointmentsBean);
				} else {
					$("#container").setTemplate(featchDignoPatBillTemp_var);
					$("#container").processTemplate(PatientAppointmentsBean);
				}
			} else {
				if (type == "search") {
					alert("Patient Not Found");
				}
			}
		}
	});
};

var doctorDepartmentTemp = "<option value='0'>-select-</option>{#foreach $T.liDep as dpl}<option value='{$T.dpl.depId}'>{$T.dpl.depNm}</option>{#/for}";

function fetchHospitalDepartmentsForPatientRegistration() {
	var admittedUnder = $("#refTo").val();
	var inputs = [];
	inputs.push('action=fetchHospitalDepartments');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "PatientServlet",
		url : "ehat/inventoryAssetMaintenance/fetchHospitalDepartments",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
		
		//	pobj1 = eval('(' + ajaxResponse + ')');
		//	doctorBean = eval('(' + ajaxResponse + ')');

			$("#doctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#doctorDepartments").processTemplate(ajaxResponse);

			$("#ipdDoctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#ipdDoctorDepartments").processTemplate(ajaxResponse);

			$("#erdoctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#erdoctorDepartments").processTemplate(ajaxResponse);
			
			$("#ReserveDoctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#ReserveDoctorDepartments").processTemplate(ajaxResponse);
			
			$("#igetDept").setTemplate(doctorDepartmentTemp);
			$("#igetDept").processTemplate(ajaxResponse);
			
			$("#iConsDept").setTemplate(doctorDepartmentTemp);
			$("#iConsDept").processTemplate(ajaxResponse);
			
		}
	});
}

var docNameTemplateForOPD = "<option value='0'>-select-</option>{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";

//@author :Sagar Kadam @date: 17-Jun-2017 @reason : fetch doctors for registartion
/*function setDocNameForEhatRegistration() {

	var drDeptId = $("#drDeptId").val();
	if(drDeptId == null || drDeptId == undefined){
		drDeptId = 0;
	}
	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('date=onload');
	inputs.push('docType=doc');
	inputs.push('drDeptId='+drDeptId);
	var str = inputs.join('&');
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
		url 	: "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		error 	: function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			$("#doctorObject").val(ajaxResponse);
			$("#doctorObject").html(ajaxResponse);
			var doctorBean = eval('(' + ajaxResponse + ')');
			
			$("#doctorName").setTemplate(docNameTemplateForOPD); 						
			$("#doctorName").processTemplate(doctorBean);	
			$("#doctorName").select2();	
 						
			//Added By kishor 
			$("#doctorNameIpdSponsor").setTemplate(docNameTemplateForOPD);
			$("#doctorNameIpdSponsor").processTemplate(doctorBean);
			
			$("#doctorNameOpdSponsor").setTemplate(docNameTemplateForOPD);
			$("#doctorNameOpdSponsor").processTemplate(doctorBean);
			$('#doctorNamePackage').select2();
			$("#doctorNamePackage").select2('val',0);	
			
			$("#doctorNamePackage").setTemplate(docNameTemplateForOPD);
			$("#doctorNamePackage").processTemplate(doctorBean);
			
			$("#doctorNamePackageIpd").setTemplate(docNameTemplateForOPD);
			$("#doctorNamePackageIpd").processTemplate(doctorBean);
			
			$('[name=eml]').setTemplate(docNameTemplateForOPD);
			$('[name=eml]').processTemplate(doctorBean);
			$('[name=eml]').select2();
 		}
	});	
}*/

/************
* @author	: Vinod Udawant
* @date		: 15-May-2020
* @codeFor	: Get doctor list
 ************/
function setDocNameForEhatRegistration() {

	var callF = "";
	var drDeptId = $("#drDeptId").val();
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	
	if(drDeptId == null || drDeptId == undefined){
		drDeptId = 0;
	}
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("drDeptId=" + drDeptId);
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "GET",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/users/fetchAllDoctorNS",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
	
			var temp = "";
			for(var i=0; i<r.length; i++){
				
				temp = temp + "<option value='"+r[i].doctor_ID+"'>"+r[i].doc_name+"</option>";				
			}
			$("#doctorName").html(temp);	
		}
	});
}

//@author :Sagar Kadam @date: 17-Jun-2017 @reason : fetch doctors for registartion
function setDocNameProxy() {

	var drDeptId = $("#drDeptId").val();
	if(drDeptId == null || drDeptId == undefined){
		drDeptId = 0;
	}
	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('date=onload');
	inputs.push('docType=doc');
	inputs.push('drDeptId='+drDeptId);
	var str = inputs.join('&');
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
		url 	: "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		error 	: function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			var doctorBean = eval('(' + ajaxResponse + ')');
			
			$("#spclwiseDoc").setTemplate(docNameTemplateForOPD); 						
			$("#spclwiseDoc").processTemplate(doctorBean);
			$('#spclwiseDoc').select2();					
 		}
	});	
}


//@author :Sagar Kadam @date: 17-Jun-2017 @reason : To Fetch Charges master Slave sponsors
function getSponsorRecords(callFrom,sourceTypeId) {
	//alert("hi sponsor...");
	var chargesMasterDto;
	if(callFrom=="sourceid") {
		chargesMasterDto=$("#sourceType").val();
	}else{
		chargesMasterDto=sourceTypeId;
		//chargesMasterDto=0;
	}
	//alert(chargesMasterDto);
	jQuery.ajax({
	
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : chargesMasterDto
		},
		url : "ehat/registration/fetchSponsorRecords",
		success : function(r) {
 			
 			console.log(r);
			setTemplateForSponsorSelectList(r,callFrom);
		//	$('#dynamicItem').html(" ");
			
			//alert(r);
			//setTempAllRecords(r);
		}
	});
}

//@author :Sagar Kadam @date: 17-Jun-2017 @reason : To set Charges master Slave sponsors

function setTemplateForSponsorSelectList(r,callFrom){
	
	if(r.lstChargesSlave.length == 0){
	
		$("#sponsor_select").select2('val',"");
		$("#dynamicItem").html("");
	}

	var list="<option></option>";
	

	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

	/*	if(callFrom==r.lstChargesSlave[int].slaveId){
  			$("#corporate").text(r.lstChargesSlave[int].categoryName);

		} */
			list=list+'<option value="'+(r.lstChargesSlave[int].slaveId)+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		 	//alert(r.lstChargesSlave[int].categoryName);
	}	
	
	$("#sponsor_select").html(list);
	
	}

//@author :Sagar Kadam @date: 17-Jun-2017 @reason :
function setSponser(){
	 
	var si=$("#sourceType").val();
	
	if(si>0){
		 
 		/*$('#sponsor_select').select2('enable');
 		
 		$('#sponsor_select').html('');
 		//$('.select2-chosen').text(" ");
 		$('#dynamicItem').html('');
 		 $( "#empid" ).prop( "disabled", false );*/
 		//$('#empid').select2('enable');
		//$('#empid').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
 		//$('#sponserselectDiv').show();
 		//$('#sponserselectDiv').slideDown();
		getSponsorRecords('sourceid','slaveid');
		
		$('#sponserselectDiv').fadeIn();
 		 $( "#dynamicItemDiv" ).prop( "disabled", true );
 		$('#dynamicItemDiv').find('input, button, select').attr('disabled','disabled');
		$("#personalDetails2").css( "display","none");
		$('.refClass').fadeIn();
  		//$('#sponserselectDiv').fadeOut();
 		//$('#dynamicItemDiv').show();
 		
 	}else{
 		
 	//	$('#sponserselectDiv').hide();
  		//$('#sponserselectDiv').slideUp();
 		$("#dynamicItemDiv" ).prop( "disabled", true );
  		$('#sponserselectDiv').fadeOut();
  		$('#dynamicItemDiv').find('input, button, select').attr('disabled','disabled');
  		$("#personalDetails2").css( "display","inline");
  		$('.refClass').fadeOut();
  		//$('#sponserselectDiv').fadeOut();
 		//$('#dynamicItemDiv').hide();
 		
 		/*$('#sponsor_select').text(" ");
  	//	$('.select2-chosen').text(" ");
 		$('#dynamicItem').html('');
 		
 		$('#sponsor_select').select2('disable');
		 $( "#empid" ).prop( "disabled", true );
*/
 		//$('#empid').select2('disable');
 
 	}
}


function refDivHide(){
	$("#chkRefDocDiv").hide();
	$("#txtDoctorDiv").hide();
}
function refDivShow(){
	$("#chkRefDocDiv").show();
}

function sourceDivShow() {
	$("#sourceDiv").show();
	$("#referredByDiv").hide();
	$("#doctorDiv").hide();
}

function sourceDivHide() {
	$("#sourceDiv").hide();
}

function setReferredBySource2() {
	var selReferredBy = $("#selReferredBy").val();
	/*if (selReferredBy == "8") {//Ref doctor
		getRefDoctors2();
		$("#referredByDiv").hide();
		$("#doctorDiv").show();
	} else*/ if (selReferredBy == "9") {//inHouse doctor
		//getInHouseDoctors2();
		getDoctorBySpecialization('forInhouse','refByInHouse');
		getSorceDoc();
		$("#referredByDiv").hide();
		$("#doctorDiv").show();
		$("#refByInHouseDiv").show();
	} else {
		$("#doctorDiv").hide();
		$("#referredByDiv").show();
		$("#refByInHouseDiv").hide();
		//$("#refBy").val(0);
		//hideChkRefDocDiv();
	}
	if(selReferredBy == "10" || selReferredBy == "11")
	{
		getSorceDoc();
		$("#referredByDiv").hide();
		$("#doctorDiv").show();
		$("#refByInHouseDiv").show();
	}
}
 
/*var setRefByTemp2 = '<option value="0">select</option>{#foreach $T.cdl as cdl}<option value="{$T.cdl.cid}">{$T.cdl.prefix}{$T.cdl.cdn}</option>{#/for}';

function getRefDoctors2() {

	var inputs = [];
	inputs.push('action=getRefDoctors');

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			prjobj = eval('(' + ajaxResponse + ')');
			$("#refBy").setTemplate(setRefByTemp2);
			$("#refBy").processTemplate(prjobj);
			$("#refBy").select2();
		}
	});
}*/

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : setExistingDoctorTemp()
 ******************************************************************************/
function getRefDoctors2() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/setexistingedctortemp",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			setchanneldoctorMgmtTemplate(r);
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : seticd10CodeMgmtTemplate()
 ******************************************************************************/
function setchanneldoctorMgmtTemplate(response) {

	var htm = "<option value='0'>---Select---</option>";

	for ( var i = 0; i < response.chann_docList.length; i++) {
		
		htm = htm + '<option value='+response.chann_docList[i].channDocId+'>'+response.chann_docList[i].prefix+' '+response.chann_docList[i].docName+'</option>';
	}
	$("#refBy").html(htm);
	$("#refBy").select2();
}

function getIpdBedDetailsForTid(tid){

		var inputs = [];
		inputs.push('tid=' + tid);
		var str = inputs.join('&');
		
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/getIpdBedDetailsForTid",
		success : function(r) {
			var myObj = JSON.stringify(r);
			$("#divPatId2").html(myObj);
		},
		error :function(r){
			alert("Network Issue!");
			console.log(r);
		}
	});

}


var setInHouseDocTemp2 = '<option value="0">select</option>{#foreach $T.dl as dl}<option value="{$T.dl.di}">{$T.dl.dn}</option>{#/for}';

function getInHouseDoctors2() {

	var inputs = [];
	inputs.push('action=getInHouseDoctors');

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			prjobj = eval('(' + ajaxResponse + ')');
			$("#refByInHouse").setTemplate(setInHouseDocTemp2);
			$("#refByInHouse").processTemplate(prjobj);
		}
	});
}


/************
* @author	: Sagar
* @date		: 30-June-2017
* @codeFor	: Get for ipd bill patients
 ************/
/*function getIpdBillPatients2(callform) {
//alert("hi..");
	var inputs = [];
	 inputs.push("callform="+ callform);
	 inputs.push("wardType="+ 0);
	 inputs.push("hallTypeSelectId="+ 0);
	 inputs.push("ward="+ "-");
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdbill/viewIpdbillPatients",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {

			setIpdbillPatientsTemp2(r);
		}
	});
}*/

/************
* @author	: Sagar
* @date		: 30-June-2017
* @codeFor	: Set ipd queue template
 ************/
/*function setIpdbillPatientsTemp2(res){
	
	var count=1;
	var ipdqueueTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed table-stripped cf'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-sm-1-1' style=''><label class='TextFont'>#</label></th>"
		+ "<th class='col-sm-2-1' style=''><label class='TextFont'>Mrn No</label></th>"

		+ "<th class='col-sm-2-1' style=''><label class='TextFont'>Patient Name</label></th>"
		+ "<th class='col-sm-1-1' style=''><label class='TextFont''>Patient ID</label></th>"
		+ "<th class='col-sm-1-1' style=''><label class='TextFont''>Mobile No</label></th>"

		+ "<th class='col-sm-1-1' style=''><label class='TextFont''>Age</label></th>"
		+ "<th class='col-sm-1-1' style=''><label class='TextFont''>Weight</label></th>"

		+ "<th class='col-sm-2-1' style=''><label class='TextFont''>Admission No</label></th>"
		+ "<th class='col-sm-2-1' style=''><label class='TextFont''>Admission Date/Time</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission Ward</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Bed No</label></th>"
		+ "<th class='col-sm-2-1' style=''><label class='TextFont''>Action</label></th>"




		+ "<th class='col-md-2-1' style=''><label class='TextFont''>Print</label></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
		+ "	<table class='table table-condensed table-stripped cf'>"
		+ "<tbody class='cf'>";
	
	for(var indx=0;indx<res.lstIpdbillPatients.length;indx++){
		
		var fullName=res.lstIpdbillPatients[indx].patientName;
		var datetime= new Date(res.lstIpdbillPatients[indx].createdDateTime).toLocaleString('en-GB');
		ipdqueueTemp=ipdqueueTemp+"<tr>"
		+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"+count+"</td>"
		+ "	<td class='col-sm-2-1' id='mrnno"+count+"' style='height: 21.5px;'>"+res.lstIpdbillPatients[indx].mrnno+"</td>"

		+ "	<td class='col-sm-2-1' id='divPi"+count+"' style='height: 21.5px;'>"+fullName+"</td>"
		+ "	<td class='col-sm-1-1' id='divPi"+count+"' style='height: 21.5px;'>"+res.lstIpdbillPatients[indx].pId+"</td>"
		+ "	<td class='col-sm-1-1' id='divPi"+count+"' style='height: 21.5px;'>"+res.lstIpdbillPatients[indx].mobile+"</td>"

		
		+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"+res.lstIpdbillPatients[indx].age+"</td>"

		+ "	<td class='col-sm-1-1'  style='height: 21.5px;'>"+res.lstIpdbillPatients[indx].weight+"</td>"
		+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"+res.lstIpdbillPatients[indx].opdipdno+"</td>"

		+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"+datetime+"</td>"
		+ "	<td class='col-sm-1-1' style='height: 21.5px;'>--</td>"
		+ "	<td class='col-sm-1-1' style='height: 21.5px;'>--</td>"




		
		+ "<td class='center' style='width: 7%;'>"

		+ "<button onclick=viewBedWard("+res.lstIpdbillPatients[indx].treatId+") type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		+ "</td>"
		+ "<td class='center' style='width: 7%;'>"
		+ "<button onclick=printIPDFormJsp("+res.lstIpdbillPatients[indx].pId+") class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"
		
		
		
		 +"</tr>";		
		
		count=count+1;
	}
	ipdqueueTemp=ipdqueueTemp+"</tbody></table></div>";
	$("#ipdBillPatients").html(ipdqueueTemp);
}*/

function showDoctors(count){
	
	//$("#"+count).toggle("toggle");
	
	$("#"+count).toggle('toggle');    
    var curClass=$("#shBillView"+count).attr('class');
    
    if(curClass=="fa fa-chevron-circle-up"){
        
        $("#shBillView"+count).removeClass('fa fa-chevron-circle-up');
        $("#shBillView"+count).addClass('fa fa-chevron-circle-down');
      //  $("#billText").text('Show Bill View');
        
    }else{
        
        $("#shBillView"+count).removeClass('fa fa-chevron-circle-down');
        $("#shBillView"+count).addClass('fa fa-chevron-circle-up');
       // $("#billText").text('Show Receipt View');        
    }    
}


/************
* @author	: Sagar
* @date		: 30-June-2017
* @codeFor	: Autosuggestion for ipd queue 
 ************/
function setAutoCompleteForIpdQueue2(inputId, callfrom) {

	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
	var findingName = $("#" + inputId).val();
	
	var inputs = [];	
	 
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdbill/autoSuggestionIpdQueue",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {
			
			if(callfrom=="search"){
				setIpdbillPatientsTemp2(r);
				autoCompTable2(r, inputId);
				
			}else{
				autoCompTable2(r, inputId);
			}			
		}
	});
}

/************
* @author	: Sagar
* @date		: 30-June-2017
* @codeFor	: Autosuggestion for ipd queue 
 ************/
function autoCompTable2(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
		'custom.mcautocomplete',
		$.ui.autocomplete,
		{
			_create : function() {
				this._super();
				this.widget().menu("option", "items",
						"> :not(.ui-widget-header)");
			},
			_renderMenu : function(ul, items) {
				var self = this, thead;
				if (this.options.showHeader) {
					table = $('<div class="ui-widget-header" style="width:100%"></div>');
					$
							.each(
									this.options.columns,
									function(index, item) {
										table
												.append('<span style="padding:0 4px;float:left;width:'
														+ item.width
														+ ';">'
														+ item.name
														+ '</span>');
									});
					table
							.append('<div style="clear: both;"></div>');
					ul.append(table);
				}
				$.each(items, function(index, item) {
					self._renderItem(ul, item);
				});
			},
			_renderItem : function(ul, item) {
				var t = '', result = '';
				$
						.each(
								this.options.columns,
								function(index, column) {
									t += '<span style="padding:0 4px;float:left;width:'
											+ column.width
											+ ';">'
											+ item[column.valueField ? column.valueField
													: index]
											+ '</span>';
								});
				result = $('<li></li>')
						.data('ui-autocomplete-item', item)
						.append(
								'<a class="mcacAnchor">'
										+ t
										+ '<div style="clear: both;"></div></a>')
						.appendTo(ul);
				return result;
			}
	});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
	{
		// These next two options are what this plugin adds to the
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Patient Name',
			width : '100px',
			valueField : 'patientName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.depNm != 'Match') {
			
				$('#byName').val(ui.item.patientName);
				var nm = ui.item.patientName;
				console.log(nm);
				setAutoCompleteForIpdQueue('byName','search');
				$('#byName').val('');
			}
			/*
			 * This function use for Enter keypress search
			 */
			//setAutoCompleteForIpdQueue2(id, 'search');
			autosuggesstionIpdBillPatients2(id, 'search');

			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.lstIpdbillPatients.length);
			var result;
			if (!data || data.lstIpdbillPatients.length === 0 || !data.lstIpdbillPatients
					|| data.lstIpdbillPatients.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'patientName' : 'Not Found',
					'pId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.lstIpdbillPatients;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}


/************
* @author	: Sagar
* @date		: 1-July-2017
* @codeFor	: Get for ipd bill patients
 ************/
function autosuggesstionIpdBillPatients2(inputId,callfrom) {
//alert("hi..");
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
	var findingName = $("#" + inputId).val();
	
	var inputs = [];	
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('finalBill=' + "all");
	inputs.push('letter=' + letter);
	//var str = inputs.join('&');
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdbill/autosuggesstionviewIpdbillPatients",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {

			if(letter=="" || letter==" " ){
				getIpdBillPatients2("ipd");
			}else{
				setIpdbillPatientsTemp2(r);
			}
			//getIpdBillPatients2("ipd");
			
			//autoCompTable2(r,id);
		}
	});
}


/**@author Sagar
 * @date 20-july-2017
 * @code get charges master for sponser/package type on reg on ui***/
function sponsorTypeList(callfrom)
{

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/registration/getSponsorTypeList",
				error:function(r){
					alert(r);
 				},
		    	success : function(r) {
		    		 console.log(r);
		    		setTemplateForSponsorTypeList(r,callfrom);
		    	 
		    		
				}
			});
	

}


//@author :Sagar Kadam @date: 17-Jun-2017 @reason : To set Charges master   list
function setTemplateForSponsorTypeList(r,callFrom){

	var list="<option value='0'>Self</option>";
	

	for ( var int = 0; int < r.lstCharges.length; int++) {
		
		if(callFrom==r.lstCharges[int].chargesId){
			$("#billCategoty").text(r.lstCharges[int].chargesName);
 		}
		
		
			list=list+'<option value="'+(r.lstCharges[int].chargesId)+'">'+(r.lstCharges[int].chargesName)+'</option>';
		 	
	}	
	$("#sourceType").html(list);
	}
function OtherRecord(){
	//alert("hi");
		//$('#deptblock').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
			//$('#deptblock').find('input, button, select').attr('disabled','disabled');//to disable only personal tag of reg page
 			getOthetPatient();
 		    $("#divbyName").hide();
  			 $("#otherDiv").show();
  			$("#otherDiv1").show();
  			$("#patientDiv1").hide();
  			
}
function OtherRecord2(){
 	
	$("#addessDiv").show();
	$("#appointDiv").hide();
	
	fetchVisitingPatient1();
  	 $("#divbyName").show();
 	 $("#otherDiv").hide();
 	$("#otherDiv1").hide();
 	$("#patientDiv1").show();
  }

function getOthetPatient() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/registration/getOthetPatient",
		success : function(r) {
			//alert(r);
			console.log(r);
			setOtherRecords(r);
			//setTempAllRecords(r);
		}
	});
}

 
 /***********
  * @author	: Sagar Kadam
  * @date	: 9-jun-2017
  * @reason	: setting  details on tempelate
  **********/ 
 function setOtherRecords(r) {
 	
 	var htm = "<div class='col-sm-12-1'>"
 			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
 			+ "<thead>"
 			+ "<tr>"
 			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
 			+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
 			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"
 			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
 			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View</div></th>"
 			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Edit</div></th>"

 		//	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Bill History</div></th>"

 			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Delete</div></th>"
 			//+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Mark Visit</div></th>"
 			//+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Print Card</div></th>"
 		//	+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Common Advance</div></th>"
 			+ "</tr>"
 			+ "</thead>	"
 			+ "</table></div>";
  
 var index = 1;	
 var Mrn= 1010101111;
 for ( var i = 0; i < r.listReg.length;i++) {
 	
 	var datetime= new Date(r.listReg[i].createdDateTime).toLocaleString('en-GB');
 	 
 	 
 	var edit1="";
 	
 	//if(r.listReg[i].tFlag=="Y"){				//setting dynamic td on ui
 		 
 		   /* a=a+" class='col-sm-1-1 center' style='height: 21.5px;'>"
 			+ "<button class='btn btn-xs btn-primary editUserAccess' data-target='' data-toggle='modal' onclick='setOthetRecords("+ r.listReg[i].patientId+",\"mark\")'  value='MARK'  ><i class='fa fa-times'></i></button>"
  		  */
 	//}if(r.lstRegviewDto[i].tFlag=="N")				//setting dynamic td on ui
 	//	{
  	//	a=a+"class='col-sm-1-1 center'><button data-toggle='modal' data-target='#ICDCodePopUp' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"mark\")' value='MARK' class='btn btn-xs btn-success editUserAccess'><i class='fa fa-check'></i></button>"
  		//}
 	//if(r.lstRegviewDto[i].sponsorchargesSlaveId=="" ||r.lstRegviewDto[i].sponsorchargesSlaveId==null || r.lstRegviewDto[i].sponsorchargesSlaveId==undefined ||r.lstRegviewDto[i].sponsorchargesSlaveId==0){
   		edit1=edit1+"class='col-sm-1-1 center' style='height: 21.5px;'>"
 		+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' id='btnEdit' onclick='viewOthetRecords("+ r.listReg[i].patientId+",\"edit\")'>"
 		+ "<i class='fa fa-edit'></i>"
 		+ "</button>";
 		
  //	}else{
   	//	edit1=edit1+"class='col-sm-1-1 center' style='height: 21.5px;'>"
 	//	+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' id='btnEdit' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"edit\"),updateChargesMasterSlave("+r.lstRegviewDto[i].sponsorchargesSlaveId+"),fetchSuperCatogoiresSlave("+r.lstRegviewDto[i].sponsorchargesSlaveId+")'>"
 	//	+ "<i class='fa fa-edit'></i>"
 	//	+ "</button>"
  	//}
 		
 		htm=htm+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
 		+ "<table class='table table-condensed cf'>"
 		+ "<tbody>"
 		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>"
 		+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.listReg[i].fName+" "+r.listReg[i].mName+" "+r.listReg[i].lName+"</td>"
 		+ "<td class='col-sm-1-1 center' style='heisetAutoCompleteMarkVisitght: 21.5px;'>"+datetime+"</td>"
 		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ r.listReg[i].patientId+"</td>"
 		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
 		+ "<button class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='viewOthetRecords("+ r.listReg[i].patientId+",\"view\")'  id='btnVisit' value='view'><i class='fa fa-eye View'></i></button>"	
 		+ "</td>"
 		+ "<td "+edit1+"</td>"
 		
 		/*+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
 		+ "<button class='btn btn-xs btn-info' onclick='viewBillHistory("+ r.listReg[i].patientId+")'>"
 		+ "<i class='fa fa-file-text-o'></i>"
 		+ "</button>"
 		+ "</td>"*/
 		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
 		+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete'  onclick='deletePatientReg("+ r.listReg[i].patientId+","+ r.listReg[i].ttId+")'>"
 		+ "<i class='fa fa-trash-o'></i>"
 		+ "</button>"
 		+ "</td>"
 	/*	+ "<td "+a+"</td>"
 		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
 		+ "<button class='btn btn-xs btn-success' title='Print'  value='PRINT' onclick='PrintCardFunction("+ r.listReg[i].patientId+")'><i class='fa fa-print' class='edit'></button>"
 		+ "</td>" 
 		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
 		+ "<button class='btn btn-xs btn-primary' value='COMMONAD' onclick='printCard("+ r.listReg[i].patientId+")'><i class='fa fa-print' class='edit'></button>"
 		+ "</td>"*/
 		+ "</tr>" + "</tbody>" + "</table>" + "</div>";
  index++;
 Mrn++;
 }

 $("#container").html(htm);
 $("#allPatInfo").html(r);
 //$("#ehatTable").html(htm);setAutoCompleteMarkVisit
 }

function saveOtherPatientRegDetails() {
	
	var treatmentId = 0;
	
	if ($('[name="transSMS"]').is(':checked')) {
		transSMS = "Y";
	} else {
		transSMS = "N";
	}
	
	if ($('[name="transEmail"]').is(':checked')) {
		transEmail = "Y";
	} else {
		transEmail = "N";
	}
	
	if ($('[name="pramoEmail"]').is(':checked')) {
		pramoEmail = "Y";
	} else {
		pramoEmail = "N";
	}
	
	if ($('[name="pramoSMS"]').is(':checked')) {
		pramoSMS = "Y";
	} else {
		pramoSMS = "N";
	}
	
	if ($('#external').is(":checked")) {
		external = "Y";// it is checked
	} else {
		external = "N";
	}

	if ($('#emergency').is(":checked")) {
		emergency = "Y";// it is checked
	} else {
		emergency = "N";
	}
		
	var adharcardNo=$("#adharcardNo").val();
			 
	// patient details
	var patientId = $("#patientId").val();
	var queryType = $("#queryType").val();	
	var prefix = $("#prefix").val();
	var fName = $("#fName").val();
	var mName = $("#mName").val();
	var lName = $("#lName").val();
	var gender = $("#gender").val();
	var mobile = $("#mobile").val();
	
	var dob = $("#dob").val();
	var age = $("#year").val();
	var ageMonths = $("#month").val();
	var ageDays = $("#days").val();
	var ageMm = $("#month").val();
	var ageDd = $("#days").val();
	var unitId = $("#e1").val();

	if(fName == ""){
		alert("Enter First Name!!!");
		return false;
	}	

	if(prefix == "select"){
		alert("Select Prefix!!!");
		return false;
	}
	
	var address = $.trim($("#addressText").val());
	var talukaId = $("#talukaId").val();//taluka
	var townId = $("#townId").val();//town
	var districtId = $("#districtId").val();//district
	var stateId = $("#stateId").val();//state
	var countryId = $("#country").val();
	var areaCode = $("#areaCode").val();

	//Added on 07-May-2018 For Permanant Address.
	var perAddress = "";
	var pertalukaId = "";
	var pertownId =  "";
	var perdistrictId =  "";
	var perstateId =  "";
	var percountryId =  "";
	var perareaCode =  "";
	
	if($("#perFlag").is(':checked')){
		 perAddress = address;
		 pertalukaId = talukaId;//taluka
		 pertownId = townId;//town
		 perdistrictId = districtId;//district
		 perstateId = stateId;//state
		 percountryId = countryId;
		 perareaCode = areaCode ;
	}else{
		 perAddress = $.trim($("#peraddressText").val());
		 pertalukaId = $("#pertalukaId").val();//taluka
		 pertownId = $("#pertownId").val();//town
		 perdistrictId = $("#perdistrictId").val();//district
		 perstateId = $("#perstateId").val();//state
		 percountryId = $("#percountry").val();
		 perareaCode = $("#perareaCode").val();
	}

	if (patientId == "" || patientId == null || patientId == undefined) {
		patientId = 0;
	}
	
	var departmentId = 1;//$("#department option:selected").val();	
	var doctorIdList = "";
	doctorIdList = $("#selDoctorNameNew").val();
	
	var token = $("#token").val();
 	var height = $("#height").val();
	var weight = $("#weight").val();
	
	if(height == null || height == "" || height == undefined){
		height = 0;
	}
	if(weight == null || weight == "" || weight == undefined){
		weight = 0;
	}
	var chkSource = $("input[name=refByRadio]:checked").val();
	
	var refDocId=0;
	if($("#selReferredBy").val() == "8"){//refDoctor
		refDocId = $("#refBy").val();//ref doctor id
	}
	if(refDocId == null || refDocId == "" || refDocId == undefined){
		refDocId = 0;
	}
	// bill master
	var billId = $("#billId").val();
	var sourceTypeId = 0;//$("#sourceType").val();
 	
	/*var sponsorId = $("#sponsor_select").val();//added by sagar
    if(sponsorId == "" || sponsorId == null || sponsorId == undefined){
        sponsorId = 0;
    }*/
	
	var sponsorId = 0;
	
    var empid = $("#empid").val();
    var tpaid = $("#tpaid").val();
   	$('#sponsor_select').prop('disabled', 'disabled');
 	var patientCatId = $("#patientCatId").val();
	var sponsorCatId = $("#sponsorCatId").val();
	var count = $("#count").val();

	// bill details
	var billDetailsId = $("#billDetailsId").val();
	//var billDetailsIpdId = $("#billDetailsIpdId").val();
	var patientDetails = {   
			listReg : []
	};
	
	patientDetails.listReg.push({
		patientId : patientId,
		prefix : prefix,
		fName : fName,
		mName : mName,
		lName : lName,
		gender : gender,
		mobile : mobile,
		dob : dob,
		age : age,
		ageMonths : ageMonths,
		ageDays : ageDays,
		talukaId : talukaId,
		townId : townId,
		districtId : districtId,
		stateId : stateId,
		countryId : countryId,
		areaCode : areaCode,
		address : address,
		perAddress : perAddress,
		pertalukaId : pertalukaId,
		pertownId : pertownId,
		perdistrictId : perdistrictId,
		perstateId : perstateId,
		percountryId : percountryId,
		perareaCode : perareaCode,
		unitId : unitId,
		adharcardNo:adharcardNo,
		transSMS:transSMS,
		transEmail:transEmail,
		pramoEmail:pramoEmail,
		pramoSMS:pramoSMS,
		emergency:emergency,
		external:external,
		treatmentId : treatmentId,
		departmentId : departmentId,
		token : token,
		tFlag : "Y",
		doctorIdList : doctorIdList,
		refDocId : refDocId,
		weight : weight,
		height : height,
		empid:empid,
		tpaid:tpaid,
		sourceTypeId:sourceTypeId,
		sponsorId:sponsorId//sponsor id
 	});
	
	var billDetails = null;
	
		billDetails = {listBillDetailsOther : []};
		billDetails.listBillDetailsOther.push({
			billDetailsId : billDetailsId,
			sourceTypeId:sourceTypeId,
			billId:billId,
			unitId : unitId,
			departmentId : departmentId,
			sponsorId : sponsorId,//sponsor id
			chargesSlaveId : sponsorId,//charges slave id	
			doctorId : parseInt(doctorIdList)			
	});
	
	patientDetails = JSON.stringify(patientDetails);
	billDetails = JSON.stringify(billDetails);
	
	queryType = "insert";
	
	var inputs = [];
	inputs.push("queryType="+ queryType);
	// patient details push
	inputs.push("patientDetails="+ encodeURIComponent(patientDetails));
	inputs.push("billDetails="+ encodeURIComponent(billDetails));
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/saveotherReg",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
		
			if(queryType == "insert" && r > 0){
				
				$('#queryType').val("insert");
				window.location = "ehat_other_billing.jsp?" + "patientId=" + r;				
			}
			else if(queryType == "update" && r > 0){
				alert("Updated Successfully!!!");
				$('#queryType').val("insert");
				
			}else if(queryType == "delete" && r > 0){
				alert("Deleted Successfully!!!");
				
			}else if(queryType == "markvisit" && r > 0){
				alert("Registerd from Markvisit Successfully!!!");
				$('#queryType').val("insert");				
			}
			getOthetPatient();
			refreshReg();
		}
	});
}


function viewOthetRecords(pi,callFrom) {
	  
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
		 "ptid" : pi,
 			},
		url 	: "ehat/registration/getOthetRecordsById",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			//alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			console.log(r);
 			editOtherRecords(r,callFrom);
 	}
	});
}
 
function editOtherRecords(r,clfrom) {
	
	$('#e1').select2('val', r.listReg[0].unitId);
 	$('#prefix').val(r.listReg[0].prefix);
	$('#fName').val(r.listReg[0].fName);
	$('#mName').val(r.listReg[0].mName);
	$('#lName').val(r.listReg[0].lName);
	$('#gender').val(r.listReg[0].gender);
	$('#dob').val(r.listReg[0].dob);
	$('#year').val(r.listReg[0].age);
	$('#month').val(r.listReg[0].ageMonths);
	$('#days').val(r.listReg[0].ageDays);
  	$('#talukaId').val(r.listReg[0].talukaId);//locality
	$('#townId').val(r.listReg[0].twnId);
	$('#districtId').val(r.listReg[0].districtId);//district
	$('#stateId').val(r.listReg[0].stateId);
	$('#country').val(r.listReg[0].countryId);
	$('#areaCode').val(r.listReg[0].areaCode);
	$('#department').val(r.listReg[0].deptId);
	$('#mobile').val(r.listReg[0].mobile);
 	$('#token').val(r.listReg[0].token);
  	$('#sourceType').val(r.listReg[0].sourceTypeId);
	$('#sponsorCatId').val(r.listReg[0].sponsorCatId);
 	$('#patientCatId').val(r.listReg[0].patientCatId);
 	$('#patientId').val(r.listReg[0].patientId);
 	$('#count').val(r.listReg[0].count);
  	getSponsorRecords("sourceid","slaveid");
	$('#sponsor_select').select2('val', r.listReg[0].sponsorchargesSlaveId);
 	//$("#refBy").val(r.lstMarkVisit[0].refdocid);
	//$("#height").val(r.lstMarkVisit[0].height);
	//$("#weight").val(r.lstMarkVisit[0].weight);
	$("#empid").val(r.listReg[0].empid);
	$("#tpaid").val(r.listReg[0].tpaid);
 	//$("#createdBy").text(r.lstMarkVisit[1].userNmae);
 	var regDate= new Date(r.listReg[0].createdDateTime).toLocaleString('en-GB');
    	if(r.listReg[0].updatedBy!=null ){
  	var editedDate= new Date(r.listReg[0].updatedDateTime).toLocaleString('en-GB');	
    getUserNameByUserid(r.listReg[0].updatedBy,"edit");
    $("#dateTime").text(editedDate);
 	}
 	$("#regDate").text(regDate);
  	getUserNameByUserid(r.listReg[0].createdBy);
 	$("#adharcardNo").val(r.listReg[0].adharcardNo);
 	var transSMS=r.listReg[0].transSMS;
 	var transEmail=r.listReg[0].transEmail;
	var pramoEmail=r.listReg[0].pramoEmail;
	var pramoSMS=r.listReg[0].pramoSMS;
	var external=r.listReg[0].external;
	var emergency=r.listReg[0].emergency;
 //alert("adhr-"+r.lstMarkVisit[0].adharcardNo+"tem-"+transEmail+"tsm-"+transSMS+"pem-"+pramoEmail+"psm-"+pramoSMS+"ext-"+external+"emr-"+emergency);
if(transSMS=="Y" || transEmail=="Y" ||pramoEmail=="Y" || pramoSMS=="Y" || emergency=="Y" || external=="Y"){
      	$('#transEmail').prop('checked',true);	
    	$('#transSMS').prop('checked',true);	
     	$('#pramoSMS').prop('checked', true);
     	$('#pramoEmail').prop('checked',true);
     	$('#external').prop('checked', true);
     	$('#emergency').prop('checked', true);
        
    }else{
    	$('#transSMS').prop('checked', false);
    	$('#transEmail').prop('checked', false);	
    	$('#pramoSMS').prop('checked', false);
     	$('#pramoEmail').prop('checked', false);
     	$('#emergency').prop('checked', false);
     	$('#external').prop('checked', false);

     }
	 
	/*var strVale = r.lstMarkVisit[0].drId;

	var strArr = strVale.split(',');
	
 	$('#doctorName').select2('val', strArr);
	*/

  	$('#tabs a[href="#account"]').tab('show');//to switch reg tags 
  	$("#Patientid").prop("disabled",true);
	 	if (clfrom == "view") {
  	 		$('#account').find('input, button, select').attr('disabled', 'disabled');//to disable all fields of reg page 
  	 	 	$( "#savebuton" ).button({disabled:true});
  	 		
	 		$(".btn-table-add-row").hide();
	 		$('select').select2("enable",false);
 	 	
	 	}
	 	if (clfrom == "mark") {
	 	 		$('#queryType').val("markvisit");
 				$('#account').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
 				

 	 			$('#personalDetails').find('input, button, select').attr('disabled','disabled');//to disable only personal tag of reg page
 	 			$(".btn-table-add-row").show();
 	 			$( "#savebuton" ).button({disabled:false});
  	 	}
	 	if (clfrom == "edit") {
 	 				$('#queryType').val("update");
	 				$('#account').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
 	 				//$('#treatmentId').val(r.listReg[0].ttId);
	 			 //	$('#billId').val(r.listReg[0].billId);
	 			 	$(".btn-table-add-row").show();
	 			 	$( "#savebuton" ).button({disabled:false});
 	 					} 
	 		 
}

/***********
 * @author	: Sagar Kadam
 * @date	: 7-aug-2017
 * @reason	: to get doctor name from db
 **********/ 
function getDoctornameForCommonTemp2() {
	 
	var drid=$("#drid").val();
	if(drid==undefined || drid==null || drid==""){
		return false;
		drid="0";
 	} 
	var docName=null;
 		var strArr = drid.split(',');
	for(var i=0; i<strArr.length; i++) 
	{  
		drid=parseInt(strArr[i]);
	
 	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
		 "drid" : drid,
 			},
		url 	: "ehat/markvisit/getDoctorName",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
 		},
		success : function(r) {
			ajaxResponse = r;
			if(r.lstDoctorDto[0]!=undefined || r.lstDoctorDto[0]!=null){
			if(r.lstDoctorDto[0].doc_name!=undefined || r.lstDoctorDto[0].doc_name!=null){
			 
			//$("#consultingDoctor").text(r.lstDoctorDto[0].doc_name);
			
			docName=r.lstDoctorDto[0].doc_name;
			}else{
				return false;
			}
			}
		}
	});
 	
	}
	if(docName!=null){
	return docName;
	}
}

/************
* @author	: Sagar
* @date		: 1-July-2017
* @codeFor	: Get for ipd bill patients
 ************/
function autosuggesstionForOtherRecords(inputId,callfrom) {

	var usertype = "";
	var letter="";
	 

		
		if (callfrom ="search") {
			letter=$("#byName1").val();
			if($("#byid").is(':checked')){
				usertype="Y";
				
			}else{
				usertype="N";
				
			}
		}
	
 	var inputs = [];	
 	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url : "ehat/registration/autosuggesstionForOtherRecords",
 		cache	: false,
		success : function(r) {
			//alert(r);
			console.log(r);
			//setIpdbillPatientsTemp2(r);
			//autoCompTable2(r,id);
			setOtherRecords(r);
			
			 
			autoForOtherRecord(r, inputId);
		}
	});
}

/************
* @author	: Sagar
* @date		: 08-Aug-2017
* @codeFor	: Autosuggestion for Other Records
 ************/
function autoForOtherRecord(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
		'custom.mcautocomplete',
		$.ui.autocomplete,
		{
			_create : function() {
				this._super();
				this.widget().menu("option", "items",
						"> :not(.ui-widget-header)");
			},
			_renderMenu : function(ul, items) {
				var self = this, thead;
				if (this.options.showHeader) {
					table = $('<div class="ui-widget-header" style="width:100%"></div>');
					$
							.each(
									this.options.columns,
									function(index, item) {
										table
												.append('<span style="padding:0 4px;float:left;width:'
														+ item.width
														+ ';">'
														+ item.name
														+ '</span>');
									});
					table
							.append('<div style="clear: both;"></div>');
					ul.append(table);
				}
				$.each(items, function(index, item) {
					self._renderItem(ul, item);
				});
			},
			_renderItem : function(ul, item) {
				var t = '', result = '';
				$
						.each(
								this.options.columns,
								function(index, column) {
									t += '<span style="padding:0 4px;float:left;width:'
											+ column.width
											+ ';">'
											+ item[column.valueField ? column.valueField
													: index]
											+ '</span>';
								});
				result = $('<li></li>')
						.data('ui-autocomplete-item', item)
						.append(
								'<a class="mcacAnchor">'
										+ t
										+ '<div style="clear: both;"></div></a>')
						.appendTo(ul);
				return result;
			}
	});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
	{
		// These next two options are what this plugin adds to the
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Patient Name',
			width : '100px',
			valueField : 'fName',
		//	valueField : 'lName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.fName != 'Found'
					&& ui.item.fName != 'Match') {
 				//console.log(nm);
				//setAutoCompleteForIpdQueue('byName','search');
			 
			}
			/*
			 * This function use for Enter keypress search
			 */
			//setAutoCompleteForIpdQueue2(id, 'search');
			//autosuggesstionIpdBillPatients2(id, 'search');
			autosuggesstionForOtherRecords(id, 'search1');
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listReg.length);
			var result;
			if (!data || data.listReg.length === 0 || !data.listReg
					|| data.listReg.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'fName' : 'Not Found',
					'fName' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.listReg;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}

function refreshReg(){
	$('#fName').val("");
	$('#mName').val("");
	$('#lName').val("");
	$('#gender').val("");
	$('#dob').val("");
	$('#year').val("");
	$('#month').val("");
	$('#days').val("");
	$('#addressText').val("");
  	$('#talukaId').val("");//locality
	$('#townId').val("");
	$('#districtId').val("");//district
	$('#stateId').val("");
	$('#country').val("");
	$('#areaCode').val("");
	$('#department').val("");
	$('#mobile').val("");
 	$('#token').val("");
  	$('#sourceType').val("");
	$('#sponsorCatId').val("");
 	$('#patientCatId').val("");
 	//$('#patientId').val("");
 	//$('#count').val(r.listReg[0].count);
  	//getSponsorRecords("sourceid","slaveid");
	$('#sponsor_select').select2('val', "");
	$('#dynamicItem').html("");

	
 	//$("#refBy").val(r.lstMarkVisit[0].refdocid);
	//$("#height").val(r.lstMarkVisit[0].height);
	//$("#weight").val(r.lstMarkVisit[0].weight);
	$("#empid").val("");
	$("#tpaid").val("");
 	//$("#createdBy").text(r.lstMarkVisit[1].userNmae);
 	//var regDate= new Date(r.listReg[0].createdDateTime).toLocaleString('en-GB');
    	//if(r.listReg[0].updatedBy!=null ){
  	//var editedDate= new Date(r.listReg[0].updatedDateTime).toLocaleString('en-GB');	
    //getUserNameByUserid(r.listReg[0].updatedBy,"edit");
    $("#dateTime").text("");
 	 
 	$("#regDate").text("");
  	//getUserNameByUserid(r.listReg[0].createdBy);
 	$("#adharcardNo").val("");
 	
	$('#refDate').val("");
	$('#sanctionAmt').val("");
	$('#sactionOrdNo').val("");
	$('#neisNo').val("");
	
	$('#visitNo').val("");
	$('#ipdOrOpd').val("");
	$('#validUpToDate').val("");
	$('#treatPermited').val("");
	$('#diseToBeTreat').val("");
	$('#demoPtNm').val("");
	$('#oldPatientId').val(0);
	
	$('#peraddressText').val("");
	$('#pertownId').val(0);
	$('#pertalukaId').val(0);
	$('#perdistrictId').val(0);
	$('#perstateId').val(0);
	$('#perareaCode').val(0);
	$('#percountry').val(1);

	$('#townId').val(0);
	$('#talukaId').val(0);
	$('#districtId').val(0);
	$('#stateId').val(0);
	$('#areaCode').val(0);
	$('#country').val(1);
 }


//@uthor -Sagar-Modal pop up for Bar Code...
 function generateBarcode2(callFrom,labTestResultMasterId){
	
	$('#Counter_Batch_Pop_Up').modal("show");
	$('#Counter_Batch_Pop_Up').modal();	
};

//@uthor -Sagar-To generate Barcode 
//@Date-28-Aug-2017
function generateBarcodePrint2(masterId,callfrom)
{
 	if(callfrom=="reg"){
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : masterId
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			count=70;
 			var ptName=r.listRegTreBillDto[0].patientName;
 			var OpdIpdNo=r.listRegTreBillDto[0].trcount;
 			var gender=r.listRegTreBillDto[0].gender;
 			var totalage=r.listRegTreBillDto[0].age;
 			var age=totalage+"/"+gender;
 			window.open("ehat_lab_barcode.jsp?masterId="+masterId+"&count="+count+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo+"&age="+age);
}
	});
	}
 	
}

//Added for Common temp ipd name change dinamicaly ...@Author-Sagar
function setIPDnameForCommonTemp(){
	var did=$("#deptid").val();
 	if(did==3){
	$("#billipdlable").text("Diag No:");
	}
	if(did==1){
		$("#billipdlable").text("OPD No:");
		}
	if(did==2){
 		$("#billipdlable").text("IPD No:");
	}
	
	
}

function refGenFormHideShow() {
	var deptId = $("#department").val();
	$('#chkHospital').prop('checked',true); 
	if (deptId == 3) {
		// alert("hiurerer");
		$('#specialityDiv').hide();
		$('#docConsultingDiv').hide();
		$('#regGenFormDiv').show();
		$('#casTypeDiv').hide();
	} else if (deptId == 2) {
		// alert("hiurerer");
		$('#specialityDiv').show();
		$('#docConsultingDiv').show();
		$('#casTypeDiv').show();
		$('#regGenFormDiv').hide();
	}else{
		$('#casTypeDiv').hide();
		$("#casTypeDiv").val(0);
		$('#regGenFormDiv').hide();
		$("#reqGenFormId").val(0);
		$('#docConsultingDiv').show();
		$('#specialityDiv').show();
	}
}

//irfan khan 28-sep-2017 reason : delete patient
function deletePatientReg(pi, ti) {

	var r = confirm("Are You Confirm To Delete Patient Record? ");
	if (r == true) {
		var inputs = [];
		//inputs.push('action=DeletePatient');
		inputs.push('pId=' + pi);
		inputs.push('tId=' + ti);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/registration/deletePatientReg",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				deletePayResponse(pi, ti);
				alert(r);
				location.reload();
			}
		});
	}
}

//irfan khan 8-Nov-2017 reason : to set registration access
function getRegAccessAuth() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/registration/getRegAccessAuth",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// alert('error');
		},
		success : function(r) {
			if (r == true) {
				$("#savebuton").removeAttr("disabled", "disabled");
			} else {
				$("#savebuton").attr("disabled", "disabled");
			}
		}
	});
}

/*function validateBirthMonth(id){
	var month = $('#' + id).val();
	//alert(month);
	if(month >12 || month < 0){
		alert("Month range is 0 to 12.!!!");
		$('#' + id).val(0);
		return false();
	}
}
*/
/*function validateBirthDays(id){
	var days = $('#' + id).val();
	//alert(month);
	if(days >31 || month < 0){
		alert("Days range is 0 to 31.!!!");
		$('#' + id).val(0);
		return false();
	}
}*/


function getDocListUnitWise(){
	var callfrom="doctor";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		data : {
			"callfrom" : callfrom
		},
		url		: "ehat/registration/getDocListUnitWise",
		success : function(r) {
			setTemplateForgetDocListUnitWise(r);
		}
	});
}

function setTemplateForgetDocListUnitWise(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.lstDoctorDto.length; int++) {
		list=list+'<option value="'+(r.lstDoctorDto[int].doctor_ID)+'">'+(r.lstDoctorDto[int].doc_name)+'</option>';
		
	}	
	$("#doctorName").html(list);
	$("#doctorNameIpdSponsor").html(list);		
	$("#doctorNameOpdSponsor").html(list);
	$("#doctorNamePackage").html(list);		
	$("#doctorNamePackageIpd").html(list);
	
}

function getAllRefDocNew() {
	var callfrom="doctor";
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : {
					"callfrom" : callfrom
				},
				url : "ehat/registration/getAllRefDocNew",

				success : function(r) {
					setTemplateForRefDocNew(r);//call template
				}
			});
}
function setTemplateForRefDocNew(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.lstRefDoctorDto.length; int++) {
		list=list+'<option value="'+(r.lstRefDoctorDto[int].doctor_ID)+'">'+(r.lstRefDoctorDto[int].doc_name)+'</option>';
		
	}	
	/*$("#doctorName").html(list);
	$("#doctorNameIpdSponsor").html(list);		
	$("#doctorNameOpdSponsor").html(list);
	$("#doctorNamePackage").html(list);		
	$("#doctorNamePackageIpd").html(list);
	$("#refBy").setTemplate(setRefByTemp2);*/
	$("#refBy").html(list);
	$("#refBy").select2();
	
}


function blockPatient(pid, pname) {
	var blockFlag = $("#blockBtn" + pid).val();

	if (blockFlag == "Y") {

		var r = confirm("Do you want to UnBlock '" + pname + "' ?");
		if (r == true) {
			jQuery.ajax({
				async : true,
				type : "POST",
				data : {
					"pid" : parseInt(pid),
					"blockFlag" : "N"
				},
				url : "ehat/registration/blockPatient",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					alert(r);
					fetchVisitingPatient1();
				}
			});
		}

	} else {
		var r = confirm("Are You Sure You Want To Block '" + pname + "' ?");
		if (r == true) {
			jQuery.ajax({
				async : false,
				type : "POST",
				data : {
					"pid" : parseInt(pid),
					"blockFlag" : "Y"
				},
				url : "ehat/registration/blockPatient",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					alert(r);
					fetchVisitingPatient1();
					//$('.blockPat').prop('disabled', true);
				}
			});
		}
	}
}

function fetchAdmissionReport(){
	
	var fromDate = ($("#fromDate").val()).split("/");
	//var fromDate = $("#inputromDate").val();
	
	var fdate =(fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);
	
	var toDate = ($("#toDate").val()).split("/"); //added by sandip
	//var toDate = $("#inputToDate").val();
	
	var tdate =(toDate[2] + "-" + toDate[1] + "-" + toDate[0]);
	
	var doctorId = $("#doctorName").val();
	
	if(refDocId==null){
		var refDocId = 0;
	}
	else{
		var refDocId = $("#refBy").val();
	}
	var caseTypeId = $("#patientType").val();
	var mediclaimType = $("input[name=mediclaimByRadio]:checked").val();
	
	if (fdate == "" || fdate == undefined) {
		alert("Please Select From Date!");
		$("#fromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (tdate == "" || tdate == undefined) {
		alert("Please Select To Date!");
		$("#toDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];
	// inputs.push('action=proFeesfetchReports');
	
	inputs.push('fromDate=' + fdate);
	inputs.push('toDate=' + tdate);
	inputs.push('doctorId=' + doctorId);
	inputs.push('refDocId=' + refDocId);
	inputs.push('caseTypeId=' + caseTypeId);
	inputs.push('mediclaimType=' + mediclaimType);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/registration/fetchAdmissionReport",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					//alert(r.admissionReportSiddhi[0].admitTime);
					
				var htm="";	
				var	htmHead = "";
				htmHead = htmHead
					+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
					+ "</th><th class='col-md-1'>PRN"
					+ "</th><th class='col-md-1'>IPD No."
					+ "</th><th class='col-md-1'>Admit-Date"
					//+ "</th><th class='col-md-3'>Registration Date"
					+ "</th><th class='col-md-3'>Patient-Name"
					+ "</th><th class='col-md-1'>MediClaim"
					+ "</th><th class='col-md-1'>Sponsor Type"
					+ "</th><th class='col-md-1'>Ward"
					+ "</th><th class='col-md-3'>Admitted Under"
					+ "</th><th class='col-md-1'>Ref.Doctor"
					+ "</th><th class='col-md-1'>Patient Type"
					+ "</th><th class='col-md-1'>Address"
					+ "</th><th class='col-md-1'>Admit"
					+ "</th><th class='col-md-1'>Contact"
					+ "</th><th class='col-md-1'>Dept.Name"
					+ "</th></tr>";
					
					if (r.listAdmsnReportViewDto.length == 0
							|| r.listAdmsnReportViewDto.length == null) {
						// no records.
						htm = htm
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='18'>Record Not Found...!!!</th></tr>";
					} else {

						for ( var i = 0; i < r.listAdmsnReportViewDto.length; i++) {
							var list = r.listAdmsnReportViewDto[i];
							
							var admdate= new Date(list.admitDate).toLocaleDateString('en-GB');
							
							htm = htm
									+ "<tr style='height:21px;'>"
									+ "<td class='col-md-1'>"
									+ (i + 1)
									+ "</td><td class='col-md-1'>"
									+ list.patientId
									//+ "</td><td class='col-md-1'>"
									//+ list.prn
									+ "</td><td class='col-md-1'>"
									+ list.ipdNo
									+ "</td><td class='col-md-1'>"
									+ admdate
									+ "</td><td class='col-md-3'>"
									+ list.patientName
									+ "</td><td class='col-md-1'>"
									+ list.mediclaim
									+ "</td><td class='col-md-1'>"
									+ list.sposorType
									+ "</td><td class='col-md-1'>"
									+ list.wardName
									+ "</td><td class='col-md-3'>"
									+ list.doctorName
									+ "</td><td class='col-md-1'>"
									+ list.refDocName
									+ "</td><td class='col-md-1'>"
									+ list.patientType
									+ "</td><td class='col-md-1'>"
									+ list.address
									+ "</td><td class='col-md-1'>"
									+ list.admitTime
									+ "</td><td class='col-md-1'>"
									+ list.contact
									+ "</td><td class='col-md-1'>"
									+ list.departmentName
									+ "</td></tr>";
									
						}
					}
					
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htm);
				}
			});
}

/*var htm = "<marquee id='advertisementMarquee' class='col-md-12' behavior='scroll' Height='600px' direction='up'"
	+ "scrollamount='5' onmouseover='this.setAttribute(\'scrollamount\',0);' onmouseout='this.setAttribute(\'scrollamount\',5);'>";
for(var i=0; i < r.length ; i++){
	htm = htm + "<img src='images/Advertisement/"+r[i]+"' width='100%' height='300'alt='No Add' >";
}
htm = htm + "</marquee>";
$("#divMarquee").html(htm);*/

//irfan khan - 4-april-2018// advertisement set images
function fetchAdvertisementImgNames() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/registration/fetchAdvertisementImgNames",

				success : function(r) {
					// alert(r.length);

					if(r.length > 0){
						
						$("#divTokenNumber").removeClass('col-md-12');
						$("#divTokenNumber").addClass('col-md-6');
						$("#divMarquee").removeClass('hide');
						
						
						var htm = "<marquee id='advertisementMarquee' class='col-md-12' behavior='scroll' Height='600px' direction='up'"
							+ "scrollamount='5' onmouseover='this.setAttribute(\"scrollamount\",0);' onmouseout='this.setAttribute(\"scrollamount\",5);'>";
					for ( var i = 0; i < r.length; i++) {
					//	htm = htm + "<img src='images/Advertisement/" + r[i]
						htm = htm + "<img src='images/Advertisement/" + r[i]
								+ "' width='100%' height='500'alt='No Add' >";
					}
					htm = htm + "</marquee>";
					$("#divMarquee").html(htm);
					}else{
						$("#divTokenNumber").removeClass('col-md-6');
						$("#divTokenNumber").addClass('col-md-12');
						$("#divMarquee").addClass('hide');
					}
					
				}
			});
}

//irfan khan 18-may-2018 fetch the difference between 2 dates in days
function fetchDifferenceInDays() {
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"fromDate" : fromDate,
			"toDate" : toDate
		},
		url : "ehat/registration/fetchDifferenceInDays",

		success : function(r) {
			alert(r);
		}
	});
}



/*****
 * @author   :TARIQUE
 * @Date     :29-12-2017
 * @Code     :For Payment response edit 
 * *******/
function getPayResp(patientId) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data 	: {
			"patientId" : patientId
				},
		url : "ehat/registration/fetchPayResp",
		success : function(r) {
			
			
			setPaymentResponse(r);
			
		}
	});
}
/*****
 * @author   :TARIQUE
 * @Date     :29-12-2017
 * @Code     :For Payment response edit 
 * *******/
function setPaymentResponse(r){
	$("#userResCheck").prop("checked",true);
	$("#userResStatus").css("display","block");
	$('#payResFName').val(r.listPayRes[0].payResFName);
	$('#payResMName').val(r.listPayRes[0].payResMName);
	$('#payResLName').val(r.listPayRes[0].payResLName);
	$('#payResmobile').val(r.listPayRes[0].payResmobile);
	$('#payResgender').val(r.listPayRes[0].payResgender);
	$('#payResAddressText').val(r.listPayRes[0].payResAddressText);
	$('#relation').val(r.listPayRes[0].relation);
	$('#prefix2').val(r.listPayRes[0].prefix2);
	$('#payResId').val(r.listPayRes[0].payResId);
	$('#payResAdharNo').val(r.listPayRes[0].payResAdharNo);
	
	
}


function deletePayResponse(pi, ti)
{
	var inputs = [];
	//inputs.push('action=DeletePatient');
	inputs.push('pId=' + pi);
	inputs.push('tId=' + ti);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/deletePayResponse",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r);
			//location.reload();
			
		}
	});
}

function setUserResStatus()
{
	if($("#userResCheck").is(":checked"))
		{
			//alert("checked");
			$("#userResStatus").css("display","block");
			$("#userResFlag").val("Y");
		}
	else{
		//alert("unchecked");
		$("#userResStatus").css("display","none");
		$("#userResFlag").val("N");
		}
}


function showDoctors2(count){
	
	//$("#"+count).toggle("toggle");
	$("#ipdList"+count).toggle('toggle');    
    var curClass=$("#shBillView"+count).attr('class');
    
    if(curClass=="fa fa-chevron-circle-up"){
        
        $("#shBillView"+count).removeClass('fa fa-chevron-circle-up');
        $("#shBillView"+count).addClass('fa fa-chevron-circle-down');
      //  $("#billText").text('Show Bill View');
        
    }else{
        
        $("#shBillView"+count).removeClass('fa fa-chevron-circle-down');
        $("#shBillView"+count).addClass('fa fa-chevron-circle-up');
       // $("#billText").text('Show Receipt View');        
    }    
}



function hideTabPermanant() {
	if ($("#perFlag").is(':checked'))
        $("#perAddressTab").hide(); // checked
    else
        $("#perAddressTab").show();
}

/************
 *@author	: Laxman Nikam
 *@date		: 31-May-2018
 *@code		: autoSuggForPatientNm
 ***********/
function autoSuggForPatientNm(inputID) {
	
	var letter = $("#"+inputID).val();
	var call="all";
	
	var inputs = [];
	inputs.push('letter=' + letter);
	inputs.push('call=' + call);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/fetchDemoPatientName",
	
		success : function(r) {
		// console.log(r);
			autoCompOnPatientName(r,inputID);
		}
	});
}

/************
 *@author	: Laxman Nikam
 *@date		: 31-May-2018
 *@code		: autoCompOnPatientName
 ***********/
function autoCompOnPatientName(response,id) {
	var myArray = response;// parsing response in JSON format
	$.widget('custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:104%"></div>');
								$.each(this.options.columns,
										function(index, item) {
											table.append('<span style="padding:0 4px;float:left;width:'
															+ item.width
															+ ';">'
															+ item.name
															+ '</span>');
										});
								table.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$.each(this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to the
				// autocomplete widget.
				showHeader : true,
				columns : [ {
					name : 'patientName',
					width : '150px',
					valueField : 'patientName'
				},{
					name : 'regNo',
					width : '50px',
					valueField : 'regNo'
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					
					//console.log(ui);
					
						$('#demoPtNm').val(ui.item.patientName);
						$('#idDemoPt').val(ui.item.patientId);
						
					//SetFocus("strValue1");
					return false;
					/*setallservautocomplete(id);
					return false;*/
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					//alert(JSON.stringify(myArray));
					console.log(data);
					console.log(data.listDemographicPatientDto.length);
					var result;
					if (!data || data.listDemographicPatientDto.length === 0 || !data.listDemographicPatientDto
							|| data.listDemographicPatientDto.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'patientName' : 'Patient Not Found',
							/*'serviceName' : 'Match',*/
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.listDemographicPatientDto;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					$('#ui-id-1').css("width", "385px");
					
					
				}
			});
}

/************
 *@author	: Laxman Nikam
 *@date		: 31-May-2018
 *@code		: setToRegitration
 ***********/
function setToRegitration(inputID) {
	refreshReg();
	var patientId=$('#idDemoPt').val();
	if(patientId==0){
		alert("Please Enter Patient Name Or Reg No.");
		return false;
	}
	var inputs = [];
	inputs.push('patientId=' + patientId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/getDemoPatientDetails",
	
		success : function(r) {
			 //console.log(r);
			 //alert(JSON.stringify(r));
			$('#idDemoPt').val(0);
			if((r.listDemographicPatientDto[0].prefix)=="Master"){
				$('#prefix').val("Mast.");
			}else{
				$('#prefix').val(r.listDemographicPatientDto[0].prefix);
			}
			
			var arr=((r.listDemographicPatientDto[0].patientName).split(" ")).length;
			if(arr==1){
				$('#fName').val((r.listDemographicPatientDto[0].patientName));
			}else if(arr==2){
				$('#fName').val((r.listDemographicPatientDto[0].patientName).split(" ")[0]);
				$('#lName').val((r.listDemographicPatientDto[0].patientName).split(" ")[1]);
			}else if(arr==3){
				$('#fName').val((r.listDemographicPatientDto[0].patientName).split(" ")[0]);
				$('#mName').val((r.listDemographicPatientDto[0].patientName).split(" ")[1]);
				$('#lName').val((r.listDemographicPatientDto[0].patientName).split(" ")[2]);
			}
			
			if((r.listDemographicPatientDto[0].gender)=="M"){
				$('#gender').val("Male");
			}else{
				$('#gender').val("Female");
			}
				$('#mobile').val(((r.listDemographicPatientDto[0].mobile).split("-")[0]).trim());
				
				$('#year').val(r.listDemographicPatientDto[0].age);
				$('#month').val(0);
				$('#days').val(0);
				
				var resAddress=(r.listDemographicPatientDto[0].resAdd1)
				+" "+(r.listDemographicPatientDto[0].resAdd2)
				+" "+(r.listDemographicPatientDto[0].resAdd3);
				$('#addressText').val(resAddress);
				
				var perAddress=(r.listDemographicPatientDto[0].perAdd1)
				+" "+(r.listDemographicPatientDto[0].perAdd2)
				+" "+(r.listDemographicPatientDto[0].perAdd3);
				$('#peraddressText').val(perAddress);
				
				var ralation=(r.listDemographicPatientDto[0].relationPrefix).toUpperCase();

				if(ralation=="S/O"){
					$('#relation').val(1);
				}else if(ralation=="W/O"){
					$('#relation').val(2);
				}else if(ralation=="D/O"){
					$('#relation').val(3);
				}else if(ralation=="F/O"){
					$('#relation').val(4);
				}else if(ralation=="Late S/O"){
					$('#relation').val(5);
				}else if(ralation=="Late W/O"){
					$('#relation').val(6);
				}else if(ralation=="Late D/O"){
					$('#relation').val(7);
				}else if(ralation=="OWNER"){
					$('#relation').val(8);
				}
				$('#relativeName').val(r.listDemographicPatientDto[0].relativeName);
				$('#oldPatientId').val(r.listDemographicPatientDto[0].regNo);
				$('#department').val(0);
				
				$("#talukaId").val(0);//taluka
				$("#townId").val(0);//town
				$("#districtId").val(0);//district
				$("#stateId").val(0);//state
				$("#country").val(1);
				$("#areaCode").val(0);

				$("#pertalukaId").val(0);//taluka
				$("#pertownId").val(0);//town
				$("#perdistrictId").val(0);//district
				$("#perstateId").val(0);//state
				$("#percountry").val(1);
				$("#perareaCode").val(0);
			 
		}
	});
}



/************
 *@author	: Laxman Nikam
 *@date		: 01-June-2018
 *@code		: checkOldPatient are already exist in DB or not.
 ***********/
function checkIsOldPatientAvilable(oldPatientId) {
	var result=0;
	var inputs = [];
	inputs.push('oldPatientId=' + oldPatientId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/checkIsOldPatientAvilable",
	
		success : function(r) {
			result=r;
		}
	});
	return result;
	
}


/************
* @author	: Manisha
* @date		: 13-March-2018
* @codeFor	: Print for ipd Patient 
 ************/
function printForIPD(treatmentId){
	
	setTimeout(function() {
		window.open(("printForIpd.jsp?" + "treatmentId=" + encodeURIComponent(treatmentId)));
	}, 300);

	return;
}

/************
* @author	: Pooja Sukre
* @date		: 26-March-2018
* @codeFor	: Hall And HallType On UI
 ************/
function getPatientBedHall(r) {
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/registration/fetchPatientsBedRecords",
		success : function(r) {
			//$("#hallName").text((r.hl[0].hn)+"("+r.hl[0].htnm+")");
			$("#hallName").text((r.hl[0].hn));
		
 		}
	});
}


function getPatientDischargeDateByTreatmentId(r)
{
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},

		url : "ehat/registration/fetchPatientsDischargeDateTreatmentId",
		success : function(r) {
			console.log(r);
			$("#dod").html(r);	

		}

	});

}

// added by kishor for upload documents

function temForuploaddocuments(){
	
	var temp=
		
		
		
		/*'<form action="UploadDoctordeskServlet"'
			+'id="fileUploadfrm" name="fileUploadfrm"'
			+'enctype="multipart/form-data" method="post">'
			+'<input type="hidden" id="TRTiD" name="TRTiD"'
			+'value="0"><input type="hidden" id="PiD"'
			+'name="PiD" value="0">'
			+'<div class="centered">'
			+'<div class="divide-10"></div>'
			+'<div class="col-md-4" style="height: 50px;">'
			+'	<label class="col-md-2-1"'
			+'		style="margin-top: 3px; padding-left: 5px;">Select'
			+'		a File to Upload: </label><input type="file" name="file"'
			+'		id="ifile"'
			+'		style="margin-top: 0px; cursor: pointer;"><br>'
			+'</div>'
			
			+'	<div class="col-md-5" style="height: 50px;">'
			+'	<label class="col-md-2-1"'
			+'		style="margin-top: 3px; padding-left: 5px;">Comment:'
			+'	</label>'
			+'	<textarea class="col-md-4-1" rows="2" cols="60"'
			+'		style="width: 236px; height: 48px;"'
			+'		name="txtNotes" id="iNotes" maxlength="120"></textarea>'
			+'</div>'
				
			+'	<div class="col-md-4-1" style="height: 50px;">'
			+'	<label class="col-md-12-1"'
			+'		style="margin-top: 3px; padding-left: 5px;"></label>'
			+'	<button type="button" onclick="uploadDocumentOnReg()"'
			+'		name="fileUp" id="ifileUp"'
			+'		class="btn btn-xs btn-success editUserAccess"'
			+'		style="margin-top: 3px; margin-left: 80px">Upload'
			+'		Document</button>'
			+'	</div>'
			+'</div>'
			+'</form>'*/
		
		
		
		'<br><div class="divide-10"></div>'
	     +'<div class="box-body col-md-12-1" style="padding-top: 10px; padding-bottom: 0px">'
	     +'<div class="form-group  box border col-md-12-1">'
	     +'<div class="col-md-12-1" style="margin-top: 0px;  padding-left: 3px;">'
	     +'	<div class="col-sm-12-1" style="margin-top: 0px;margin-top: 0px; height: 160px; overflow-y: scroll;" id="divdocDispTable">'
	     +'<table class="table table-bordered table-condensed header-fixed cf" style="width : 1090px; margin-top: 10px;">'
	     +'<thead><tr><th class="col-md-1-1 center" style="height: 21.5px;"><div class="TextFont">#</div></th>'
	     +'<th class="col-md-2-1" style="height: 21.5px; padding-left: 50px;"><div class="TextFont">Document</div></th>'
	     +'<th class="col-md-2-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Note</div></th>'
	     +'<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Date</div></th>'
	     +'<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">View / Delete</div></th>'
	     +'</tr></thead><tbody id="docDispTable"><tr><td colspan="5">No Record Found</td></tr></tbody>'
	     +'</table></div></div></div></div>'
	     ;
	
	$("#fileUploadfrm").show();
	$("#uploadDocumentsBody").html(temp);
	
	
	
}


function uploadDocumentOnReg1() {  
/*function uploadDocumentOnReg() {  */
	var doc = $("#ifile").val();             
	var note = $("#iNotes").val();  
	
	var files = $('#ifile').prop("files");
	var doc1 = $.map(files, function(val) { return val.name; });
	
	var Tid = $('#treatmentId').val();                
	var PatId = $('#patientId').val();      
	//alert(Tid);
	//alert(PatId);
	//var Tid = $("#tr_Id").val();    // added by paras
	//var PatId = $("#pt_Id").val();   // added by paras
	
     var inputs = [];                
     if (doc == "") {   
    	 alert("Please select file first ");   
    	 return false;
     }   
     
     //var docs = doc.split("\\");               
     //var doc1 = docs[0];     
      inputs.push('filePath=' + encodeURIComponent(doc1));                
     inputs.push('note=' + note);                
     inputs.push('tid=' + Tid);               
     inputs.push('patId=' + PatId);               
     var str = inputs.join('&');               
     jQuery.ajax({                   
    	 async : true,                   
    	 type : "POST",                   
    	 data : str + "&reqType=AJAX",                  
    	 url : "UploadDocServlet",                   
    	 timeout : 1000 * 60 * 5,                   
    	 catche : false,                    
    	 error : function() {                                            
    		 
    	 },                   
    	 success : function(r) {                      
    		 alert("Uploaded Successfully...");                     
    		 $("#ifile").val("");                       
    		 $("#iNotes").val("");  
    		// alert("hi");
    		 fetchDocOnReg1();                    
    		 }               
    	 });}



/* End Uploadfile Code */

/*Fetching Data*/
function fetchDocOnReg1() {
	//alert("fetchdoc")
	//var Tid = $.trim($('#tid').val());  //added by sagar
//	var patId = $.trim($('#pid').val());// added by sagar
	var Tid = $('#treatmentId').val();                
	var PatId=  $('#patientId').val();
	//alert(Tid);
	//alert(PatId);
	var inputs = [];
	inputs.push('action=fetchDocuments');
	inputs.push('tid=' + -123);
	inputs.push('patId=' + PatId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PopulateDocuments",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setUploadDocListOnReg1(r);
		}
	});
}


function setUploadDocListOnReg1(data)
{
	var result=jQuery.parseJSON(data);
	var divContent="";
	var prevtre= $('#prevtr').val();
	if(result.length>0){
		//var callFrom = $("#callFrom").val();
		for(var i=0;i<result.length;i++)
		{
			if (prevtre == "previousTreatmentOPDER") {
				divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"+(i+1)+"' value='"+result[i].document+"'>"+result[i].document+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"+(i+1)+"' value='"+result[i].notes+"'>"+result[i].notes+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"+(i+1)+"' value='"+result[i].date+"'>"+result[i].date+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='ReadDocumentsOnReg1("+(i+1)+")' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
				"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x hidden' style='margin-center: 6px;cursor: pointer;' onclick='delDocumentOnReg("+(i+1)+")' type='button' disabled=''>  </i></td></tr>";
			}
			else{
			divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
					"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"+(i+1)+"' value='"+result[i].document+"'>"+result[i].document+"</td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"+(i+1)+"' value='"+result[i].notes+"'>"+result[i].notes+"</td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"+(i+1)+"' value='"+result[i].date+"'>"+result[i].date+"</td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='ReadDocumentsOnReg1("+(i+1)+")' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
					"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='delDocumentOnReg("+(i+1)+")' type='button'>  </i></td></tr>"; 
			}
			}
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#docDispTable").html(divContent);
}


/*Delete Rows*/
function delDocumentOnReg(rowNumber) {

	var hr = $('#hiddenR').val();
	var Tid = $('#treatmentId').val();
	//alert(Tid);
	var doc = $('#hiddenDocid'+rowNumber).val();
	var date = $('#hiddenDate'+rowNumber).val();
	var inputs = [];
	var r = confirm("Are you sure to delete "+doc+" ?");
	if (r == false) {
		return false;
	}
	inputs.push('hr=' + hr);
	inputs.push('tid=' + Tid);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DelDocServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			 
		},
		success : function(r) {
			alert("Deleted Successfully...");
			fetchDocOnReg1();
		}
	});

}

/*Reading Data*/
function ReadDocumentsOnReg1(rowNumber) {
	var doc = $("#hiddenDocid"+rowNumber).val();
	var note = $("#hiddenDocnote"+rowNumber).val();
	
	setTimeout(function() {
		$('#ViewDocumemnt123').attr("src","ReadDocOnReg?fileName="+doc);
	}, 200);
	$('#viewDocModal123').modal('show');
	$('#documentComment').html(note);
}
function setDocPopUp(data)
{
	var result=jQuery.parseJSON(data);
	var divContent="";

	if(!result.length == ""){
		divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont'>"+(i+1)+"</div></td>" +
			"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><iframe src='ReadDocServlet?fileName="+result[i].document+"' ></iframe></td>" +
			"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'>"+result[i].notes+"</td></tr>"; 
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#ViewDocumemnt123").html(divContent);			
}

//irfan khan 27-june-2018 block patient
function preBlockPatient(pid, pname,callFrom) {
	
	var blockFlag = $("#blockBtn" + pid).val();
	var userName = $("#userName").val();
	
	var person = "";

	if (blockFlag == "N" || blockFlag == null) {
		person = prompt("1st warning to '" + pname + "'.Please type narration",
				"");
		if (person == null || person == "" || person == undefined) {
			alertify.error("User Cancelled / Narration compulsory.");
			//alert("User Cancelled / Narration compulsory.");
			return false;
		} else {
			jQuery.ajax({
				async : true,
				type : "POST",
				data : {
					"pid" : parseInt(pid),
					"blockFlag" : "F",
					"narration" : person

				},
				url : "ehat/registration/blockPatient",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					alertify.success(r);
					if(callFrom == "registration"){
						fetchVisitingPatient1();
					}else{
						fetchVisitingPatientForBlockList();
					}
				}
			});
		}
	} else if (blockFlag == "F") {
		person = prompt("2nd warning to '" + pname + "'.Please type narration",
				"");
		if (person == null || person == "" || person == undefined) {
			alertify.error("User Cancelled / Narration compulsory.");
			//alert("User Cancelled / Narration compulsory.");
			return false;
		} else {
			jQuery.ajax({
				async : true,
				type : "POST",
				data : {
					"pid" : parseInt(pid),
					"blockFlag" : "S",
					"narration" : person

				},
				url : "ehat/registration/blockPatient",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					alertify.success(r);
					if(callFrom == "registration"){
						fetchVisitingPatient1();
					}else{
						fetchVisitingPatientForBlockList();
					}
				}
			});
		}
	} else if (blockFlag == "S") {

		if (userName == "admin") {
			person = prompt("Do you want to block '" + pname
					+ "'? Please type narration", "");
			if (person == null || person == "" || person == undefined) {
				alertify.error("User Cancelled / Narration compulsory.");
				//alert("User Cancelled / Narration compulsory.");
				return false;
			} else {
				jQuery.ajax({
					async : true,
					type : "POST",
					data : {
						"pid" : parseInt(pid),
						"blockFlag" : "T",
						"narration" : person

					},
					url : "ehat/registration/blockPatient",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						// alert('error');
					},
					success : function(r) {
						alertify.success(r);
						//alert(r);
						if(callFrom == "registration"){
							fetchVisitingPatient1();
						}else{
							fetchVisitingPatientForBlockList();
						}
					}
				});
			}
		} else {
			alert("You don't have permission to block.");
			return false;
		}

	} else if (blockFlag == "T") {
		
		alertify.success("Patient is Already Blocked!!!");
		/*

		if (userName == "admin") {
			var r = confirm("Do you want to UnBlock '" + pname + "' ?");
			if (r == true) {
				jQuery.ajax({
					async : true,
					type : "POST",
					data : {
						"pid" : parseInt(pid),
						"blockFlag" : "N",
						"narration" : "-"
					},
					url : "ehat/registration/blockPatient",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						// alert('error');
					},
					success : function(r) {
						alertify.success(r);
						if(callFrom == "registration"){
							fetchVisitingPatient1();
						}else{
							fetchVisitingPatientForBlockList();
						}
					}
				});
			}
		} else {
			alertify.error("You don't have permission to UnBlock.");
			//alert("You don't have permission to UnBlock.");
			return false;
		}

	*/}

}



// added By Tarique Aalam
// date 23/07/2018
/*Reading Data*/
function openMlcPopUp(rowNumber) {
	//var doc = $("#hiddenDocid"+rowNumber).val();
	//var note = $("#hiddenDocnote"+rowNumber).val();
	//setDoctorListForMlcDetails();
	getDoctorBySpecialization('mlc','mlcCmoDoctor2');
	var docId = parseInt($('#mlcCmoDoctorhidden').val());
	$("#mlcCmoDoctor2").select2('val',docId);
	$('#mlcDetails').modal('show');
	//setTimeout(function() {
		//$('#ViewDocumemnt123').attr("src","ReadDocOnReg?fileName="+doc);
	//}, 100);
}


/************
* @author	: Mohd Tarique Aalam
* @date		: 23/07/2018
* @codeFor	: To set Doctor Names for Mlc Details
 ************/
function setDoctorListForMlcDetails() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/death/setDoctorList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('Network Issue');
		},
		success : function(r) {
			console.log();
			setTempDoctorListMlc(r);
		}
	});
}

function setTempDoctorListMlc(r) {
	var docList = "<option value='0'>-select-</option>";
	for ( var i = 0; i < r.dl.length; i++) {

		docList = docList + "<option value=" + r.dl[i].di + ">"+r.dl[i].dn+"</option>";

	}
	$("#mlcCmoDoctor2").html(docList);
	
/*	$("#mlcCmoDoctor").select2();
	$("#mlcCmoDoctor").select2('val',0);*/
	$("#mlcCmoDoctor2").val($('#mlcCmoDoctorhidden').val());
	//$("#mlcCmoDoctor").select2();
	//$('#mlcCmoDoctor').select2({dropdownParent: $('#mlcDetails')});
	//$("#mlcCmoDoctor2").select2();
}



/*****
 * @author   :TARIQUE
 * @Date     :23-07-2018
 * @Code     :For Mlc response edit 
 * *******/
function getMlcDetails(patientId) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data 	: {
			"patientId" : patientId
				},
		url : "ehat/registration/fetchMlcDetails",
		success : function(r) {
			console.log(r);
			if(r.listMlcDetails.length > 0){
				
				setMlcDetails(r);
			}
		}
	});
}
/*****
 * @author   :TARIQUE
 * @Date     :23-07-2018
 * @Code     :For Mlc response edit 
 * *******/
function setMlcDetails(r){
/*	$("#userResCheck").prop("checked",true);
	$("#mlcNo").css("display","block");*/
	//getDoctorBySpecialization('speciality','mlcCmoDoctor2');
	
	$('#mlcId').val(r.listMlcDetails[0].mlcId);
	$('#mlcNo').val(r.listMlcDetails[0].mlcNo);
	$('#firNo').val(r.listMlcDetails[0].firNo);
	$('#authorityName').val(r.listMlcDetails[0].authorityName);
	$('#mlcFirstName').val(r.listMlcDetails[0].mlcFirstName);
	$('#mlcLastName').val(r.listMlcDetails[0].mlcLastName);
	$("#mlcCmoDoctor2").select2('val',r.listMlcDetails[0].mlcCmoDoctor);
	$('#mlcCmoDoctorhidden').val(r.listMlcDetails[0].mlcCmoDoctor);
	$('#buccleNo').val(r.listMlcDetails[0].buccleNo);
	$('#plStname').val(r.listMlcDetails[0].plStname);
	$('#mlcGender').val(r.listMlcDetails[0].mlcGender);
	$('#mlcMobile').val(r.listMlcDetails[0].mlcMobile);
	$('#mlcEmail').val(r.listMlcDetails[0].mlcEmail);
	$('#mlcPlAddess').val(r.listMlcDetails[0].mlcPlAddess);
	$('#mlcAge').val(r.listMlcDetails[0].mlcAge);
	$('#mlcRelation').val(r.listMlcDetails[0].mlcRelation);
	$('#mlcAddressText').val(r.listMlcDetails[0].mlcAddressText);
	$('#incidentDetails').val(r.listMlcDetails[0].incidentDetails);
	var d=new Date(r.listMlcDetails[0].mlcDate);
	var date=d.toLocaleDateString('en-GB');
	if(date=="01/01/1970")
		{
			$('#mlcDate').val("");
		}
	else
		{
			$('#mlcDate').val(date);
		}
	
	$('#prefix3').val(r.listMlcDetails[0].prefix3);
		
}





//added by kishor for upload documents

function temForuploaddocumentsForBilling(){
	
	var temp=
		
		'<br><div class="divide-10"></div>'
	     +'<div class="box-body col-md-12-1" style="padding-top: 10px; padding-bottom: 0px">'
	     +'<div class="form-group  box border col-md-12-1">'
	     +'<div class="col-md-12-1" style="margin-top: 0px;  padding-left: 3px;">'
	     +'	<div class="col-sm-12-1" style="margin-top: 0px;margin-top: 0px; height: 160px; overflow-y: scroll;" id="divdocDispTable">'
	     +'<table class="table table-bordered table-condensed header-fixed cf" style="width : 1090px; margin-top: 10px;">'
	     +'<thead><tr><th class="col-md-1-1 center" style="height: 21.5px;"><div class="TextFont">#</div></th>'
	     +'<th class="col-md-2-1" style="height: 21.5px; padding-left: 50px;"><div class="TextFont">Document</div></th>'
	     +'<th class="col-md-2-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Note</div></th>'
	     +'<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Date</div></th>'
	     +'<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">View / Delete</div></th>'
	     +'</tr></thead><tbody id="docDispTable"><tr><td colspan="5">No Record Found</td></tr></tbody>'
	     +'</table></div></div></div></div>'
	     ;
	
	$("#fileUploadfrm").show();
	$("#uploadDocumentsBody").html(temp);
	
	
	
}


function uploadDocumentOnRegForBilling() {  
/*function uploadDocumentOnReg() {  */
	var doc = $("#ifile").val();             
	var note = $("#iNotes").val();  
	
	var files = $('#ifile').prop("files");
	var doc1 = $.map(files, function(val) { return val.name; });
	
	var Tid = $('#treatmentId').text();                
	var PatId = $('#patientId').text();      
	//alert(Tid);
	//alert(PatId);
	//return false;
	//var Tid = $("#tr_Id").val();    // added by paras
	//var PatId = $("#pt_Id").val();   // added by paras
	
  var inputs = [];                
  if (doc == "") {   
 	 alert("Please select file first ");   
 	 return false;
  }   
  
  //var docs = doc.split("\\");               
  //var doc1 = docs[0];     
   inputs.push('filePath=' + encodeURIComponent(doc1));                
  inputs.push('note=' + note);                
  inputs.push('tid=' + Tid);               
  inputs.push('patId=' + PatId);               
  var str = inputs.join('&');               
  jQuery.ajax({                   
 	 async : true,                   
 	 type : "POST",                   
 	 data : str + "&reqType=AJAX",                  
 	 url : "UploadDocServlet",                   
 	 timeout : 1000 * 60 * 5,                   
 	 catche : false,                    
 	 error : function() {                                            
 		 
 	 },                   
 	 success : function(r) {                      
 		 alert("Uploaded Successfully...");                     
 		 $("#ifile").val("");                       
 		 $("#iNotes").val("");  
 		// alert("hi");
 		 fetchDocOnRegForBilling();                    
 		 }               
 	 });}



/* End Uploadfile Code */

/*Fetching Data*/
function fetchDocOnRegForBilling() {
	//alert("fetchdoc")
	//var Tid = $.trim($('#tid').val());  //added by sagar
//	var patId = $.trim($('#pid').val());// added by sagar
	var Tid = $('#treatmentId').text();                
	var PatId=  $('#patientId').text();
	//alert(Tid);
	//alert(PatId);
	var inputs = [];
	inputs.push('action=fetchDocuments');
	inputs.push('tid=' + -123);
	inputs.push('patId=' + PatId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PopulateDocuments",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setUploadDocListOnRegForBilling(r);
		}
	});
}


function setUploadDocListOnRegForBilling(data)
{
	var result=jQuery.parseJSON(data);
	var divContent="";
	var prevtre= $('#prevtr').val();
	if(result.length>0){
		//var callFrom = $("#callFrom").val();
		for(var i=0;i<result.length;i++)
		{
			if (prevtre == "previousTreatmentOPDER") {
				divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"+(i+1)+"' value='"+result[i].document+"'>"+result[i].document+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"+(i+1)+"' value='"+result[i].notes+"'>"+result[i].notes+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"+(i+1)+"' value='"+result[i].date+"'>"+result[i].date+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='ReadDocumentsOnRegForBilling("+(i+1)+")' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
				"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x hidden' style='margin-center: 6px;cursor: pointer;' onclick='delDocumentOnRegForBilling("+(i+1)+")' type='button' disabled=''>  </i></td></tr>";
			}
			else{
			divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
					"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"+(i+1)+"' value='"+result[i].document+"'>"+result[i].document+"</td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"+(i+1)+"' value='"+result[i].notes+"'>"+result[i].notes+"</td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"+(i+1)+"' value='"+result[i].date+"'>"+result[i].date+"</td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='ReadDocumentsOnRegForBilling("+(i+1)+")' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
					"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='delDocumentOnRegForBilling("+(i+1)+")' type='button'>  </i></td></tr>"; 
			}
			}
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#docDispTable").html(divContent);
}


/*Delete Rows*/
function delDocumentOnRegForBilling(rowNumber) {

	var hr = $('#hiddenR').val();
	var Tid = $('#treatmentId').text();
	//alert(Tid);
	var doc = $('#hiddenDocid'+rowNumber).val();
	var date = $('#hiddenDate'+rowNumber).val();
	var inputs = [];
	var r = confirm("Are you sure to delete "+doc+" ?");
	if (r == false) {
		return false;
	}
	inputs.push('hr=' + hr);
	inputs.push('tid=' + Tid);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DelDocServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			 
		},
		success : function(r) {
			alert("Deleted Successfully...");
			fetchDocOnRegForBilling();
		}
	});

}

/*Reading Data*/
function ReadDocumentsOnRegForBilling(rowNumber) {
	var doc = $("#hiddenDocid"+rowNumber).val();
	var note = $("#hiddenDocnote"+rowNumber).val();
	$('#viewDocModal123').modal('show');
	//setTimeout(function() {
		$('#ViewDocumemnt123').attr("src","ReadDocOnReg?fileName="+doc);
	//}, 100);
	
	$('#documentComment').html(note);
}
function setDocPopUp(data)
{
	var result=jQuery.parseJSON(data);
	var divContent="";

	if(!result.length == ""){
		divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont'>"+(i+1)+"</div></td>" +
			"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><iframe src='ReadDocServlet?fileName="+result[i].document+"' ></iframe></td>" +
			"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'>"+result[i].notes+"</td></tr>"; 
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#ViewDocumemnt123").html(divContent);			
}



/***************************************
code by PArikshit
**************************************/
var indentFlag=0,patientFlag=0,otFlag=0,narFlag=0;
function checkFun(val){
	   var pending=0.0;
	   if($("#pendingTot").val()!="")
		   pending=parseFloat($("#pendingTot").val());
	   if(val=='1'){
		   var tmp=0.0;
		   if ($("#pendingAmount")
					.val() != "No Pending Balance"
					&& $(
							"#iPatientAMT")
							.val() != "No Pending Balance") {
			   tmp=parseFloat($("#iPatientAMT").val());
		   
			   if($('#indentCheck:checkbox:checked').length > 0){
				   $("#pendingTot").val(pending + tmp);
				   indentFlag=1;
			   }
			   else{
				   $("#pendingTot").val(pending - tmp);
				   indentFlag=0;
			   }
		   }
		   else{
			   $('#indentCheck').prop('checked',false);
			   alertify.success("No amount Pending...!");
			   return;
		   }
	   }
	   
	   if(val=='2'){
		   
		   if(!(parseFloat($("#patientSaleAmt").val())>0)){
			   $('#patientCheck').prop('checked',false);
			   alertify.success("No amount Pending...!");
			   return;
		   }
		   
		   if($('#patientCheck:checkbox:checked').length > 0){
			   $("#pendingTot").val(+pending + +parseFloat($("#patientSaleAmt").val()));
			   patientFlag=1;
		   }
		   else{
			   $("#pendingTot").val(pending - parseFloat($("#patientSaleAmt").val()));
			   patientFlag=0;
		   }
	   }
	   
	   if(val=='3'){
		   
		   if(!(parseFloat($("#otAmt").val())>0)){
			   $('#otCheck').prop('checked',false);
			   alertify.success("No amount Pending...!");
			   return;
		   }
		   
		   if($('#otCheck:checkbox:checked').length > 0){
			   $("#pendingTot").val(+pending + +parseFloat($("#otAmt").val()));
			   otFlag=1;
		   }
		   else{
			   $("#pendingTot").val(pending - parseFloat($("#otAmt").val()));
			   otFlag=0;
		   }
	   }
	   
		if(val=='4'){
		   
		   if(!(parseFloat($("#narAmt").val())>0)){
			   $('#narCheck').prop('checked',false);
			   alertify.success("No amount Pending...!");
			   return;
		   }
		   
		   if($('#narCheck:checkbox:checked').length > 0){
			   $("#pendingTot").val(+pending + +parseFloat($("#narAmt").val()));
			   narFlag=1;
		   }
		   else{
			   $("#pendingTot").val(pending - parseFloat($("#narAmt").val()));
			   narFlag=0;
		   }
	   }
	   if($("#pendingTot").val()==0){
		   $("#fAmt").val(0.0);
		   $("#disc2").val(0.0);
		   return;
	   }
	   	funDisc1();
}

function funDisc1(){
	   var pending=0.0;
	   if($("#pendingTot").val()!="")
		   pending=parseFloat($("#pendingTot").val());
	   var tmp=$("#disc1").val();
	   if(tmp>100){
		   alertify.success("Discount % is greter than 100...!");
		   //$("#disc1").val(0);
		   $("#disc2").val(0.0);
		   return;
	   }
	   $("#disc2").val((pending*(tmp/100)).toFixed(2));
	   $("#fAmt").val((pending-(pending*(tmp/100))).toFixed(2));
}

function funDisc2(){
	   var pending=0.0;
	   if($("#pendingTot").val()!="")
		   pending=parseFloat($("#pendingTot").val());
	   var tmp=$("#disc2").val();
	   var tmp1=pending;
	   if(parseFloat(tmp)>parseFloat(tmp1)){
		   alertify.success("Discount Amount is greter than pending amount...!");
		   $("#disc2").val(0.0);
		  // $("#disc1").val(0);
		   return;
	   }
		   
	   $("#disc1").val(((tmp*100)/pending).toFixed(2));
	   $("#fAmt").val((pending-tmp).toFixed(2));
}

function giveDisc(){
	   if($("#genInvoiceFlag").val()!="Y"){
		   alertify.success("Bill is not Final...!");
		   return;
	   }
	   if(!($('#indentCheck:checkbox:checked').length > 0 || $('#patientCheck:checkbox:checked').length > 0 || $('#otCheck:checkbox:checked').length > 0)){
		   alertify.success("Select Sale for Discount...!");
		   return;
	   }
	   
	   if(!($("#disc2").val()>0)){
		   alertify.success("Zero Discount...!");
		   return;
	   }
	   
	   var treatmentId=parseInt($("#treatmentId").text());
	   var disc=$("#disc1").val();
	   var discBy=$("#discBy").val();
	   var narration=$("#narration").val();
	   var billId=parseInt($("#consultingDoctor").text());
	   jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				"treatmentId":treatmentId,
				"billId":billId,
				"disc":disc,
				"discBy":discBy,
				"indentFlag":indentFlag,
				"patientFlag":patientFlag,
				"otFlag" : otFlag,
				"narration" :narration
			},
			url : "ehat/billNoble/giveDiscountInBilling",
			success : function(r) {
				alertify.success("Success...!");
			}
		});
}


function getDiscOfSponser(no){
	var chargesSlaveId = $("#idForDisc").val();

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"chargesSlaveId" : chargesSlaveId
		},
		/*url : "ehat/ipdbill/getPatientServiceBillSponsorForIpd",*/
		url : "ehat/ipdbill/getSponcerDisc",
		success : function(r) {
			$("#disc1").val(r);
			$('#patientCheck').prop('checked', true);
			$('#narCheck').prop('checked', true);
			
			$("#pendingTot").val(0);
			
			if(no==0){
				$('#otCheck').prop('checked', true);
				$('#indentCheck').prop('checked', true);
				checkFun(1);
				checkFun(3);
			}
			checkFun(2);
			checkFun(4);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function getSubServiceDetails1ForSponsor11(s) {
	// var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var t=$('#treatmentId').text();
	// var chargesSlaveId =8;
	// alert(chargesSlaveId);

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s,
			"chargesSlaveId" : chargesSlaveId
		},
		/*url : "ehat/ipdbill/getPatientServiceBillSponsorForIpd",*/
		url : "ehat/ipdbill/getIpdPatientServiceBill2",
		success : function(r) {

			getSubServiceDetailsTemp1ForSponsor11(r, s);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}


function getSubServiceDetails1ForSponsorForNarco(s) {
	// var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var t=$('#treatmentId').text();
	// var chargesSlaveId =8;
	// alert(chargesSlaveId);

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : s,
			"chargesSlaveId" : chargesSlaveId
		},
		/*url : "ehat/ipdbill/getPatientServiceBillSponsorForIpd",*/
		url : "ehat/ipdbill/getIpdPatientServiceBillForNarco",
		success : function(r) {

			getSubServiceDetailsTemp1ForSponsor11(r, s);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}


function getSubServiceDetailsTemp1ForSponsor11( t, s) {
	
	

	// alert(t.listSubServiceIpdDto.length);
	var setService = "";
	// var treatmentId=$('#treatmentId').text();

	var netTot=0.0;
	for ( var i = 0; i < t.listSubServiceIpdDto.length; i++) {
		var a = 1 + i;
		var datetime12 = new Date(t.listSubServiceIpdDto[i].createdDate)
				.toLocaleDateString('en-GB');
		var dname = t.listSubServiceIpdDto[i].docName;

		var netAmt = Number(t.listSubServiceIpdDto[i].coPay);
		
		netTot=+netTot + netAmt;
		ssid = t.listSubServiceIpdDto[i].serviceId;
		var cghsCode = "("+t.listSubServiceIpdDto[i].cghsCode+")";
		if(cghsCode == "" || cghsCode == "-" || cghsCode=="()" || cghsCode=="(-)" || cghsCode=="(null)"){
			cghsCode="";
		}
		if (dname == null) {
			dname = "-";
		}
		

				if (t.listSubServiceIpdDto[i].cancle == "Y") {
			setService = setService + '<tr id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';
		} else {
			setService = setService + '<tr onclick="editSponsorOnClick('
					+ t.listSubServiceIpdDto[i].billDetailsId + ')" id="tr'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '">';

		}
			
		
		setService = setService

		// + '<tr id="tr' + (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<td style="display:none;" id="row'
				+ (t.listSubServiceIpdDto[i].billDetailsId)
				+ '"> class="col-md-1 center">' + (i + 1) + '</td>'

				+ '<td> ' + a + ' </td>' + '<td style="display:none;" id="bdId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].billDetailsId + ' </td>';
		
		
		
			if (ssid == 14) {

				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].inventoryName + ' </td>';
			}else if (ssid==16) {			

				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].pharmaName + ' </td>';
			}else if (ssid==11 || ssid==13) {//Added by laxman for sended lab test coloe change. 
				
				if((t.listSubServiceIpdDto[i].sndtolabflag)=="Y"){
				setService = setService + '<td id="catName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '" style="color: green;"> '
				+ t.listSubServiceIpdDto[i].categoryName +cghsCode+ ' </td>';
				}else{
					setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].categoryName +cghsCode+ ' </td>';
				}
			}//code By Sanjay on 26-03-2018 for changes the testname color when it sent to RIS
			else if (ssid==12) {
				
				if((t.listSubServiceIpdDto[i].sndtorisflag)=="Y"){
				setService = setService + '<td id="catName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '" style="color: #00bfff;"> '
				+ t.listSubServiceIpdDto[i].categoryName +cghsCode+ ' </td>';
				}else{
					setService = setService + '<td id="catName'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ t.listSubServiceIpdDto[i].categoryName +cghsCode+ ' </td>';
				}
			}
			else {

				setService = setService + '<td id="catName'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
						+ t.listSubServiceIpdDto[i].categoryName +cghsCode+ ' </td>';
			}

		setService = setService
				
				
				+ '<td id="doccName'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> ' + dname
				+ ' </td>'

				+ '<td style="display:none;" id="subserviceid'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].subServiceId + ' </td>'

				+ '<td style="display:none;" id="dId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].docId + ' </td>'

				+ '<td style="display:none;" id="sId'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].serviceId + ' </td>'

				+ '<td style="display:none;" id="amt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].otherAmount + ' </td>'
				
				+ '<td style="display:none;" id="genRate'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].rate + ' </td>'
				
				+ '<td style="display:none;" id="sponGenAmt'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].amount + ' </td>'
				
				+ '<td style="display:none;" id="emrPerSpon'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].emrPer + ' </td>'
									
				+ '<td style="display:none;" id="drdeskflagSpon'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>'
		
				+ '<td style="display:none;" id="sndtolabflag'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].sndtolabflag + ' </td>'

				+ '<td style="display:none;" id="drdeskflagSpon'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
				+ t.listSubServiceIpdDto[i].drdeskflag + ' </td>';

		// added by vinod
		if (t.listSubServiceIpdDto[i].cancle == "Y") {

			setService = setService + '<td id="char'
					+ (t.listSubServiceIpdDto[i].billDetailsId) + '"> '
					+ '<div class="text-center">'
					+ (t.listSubServiceIpdDto[i].otherRate).toFixed(2) + '</div>' + '</td>';

		} else {

			if (t.listSubServiceIpdDto[i].paidFlag == "N") {

				setService = setService
						+ '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2)
						+ '</div>'
						+ '</td>'
						+ '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s + '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			} else {

				setService = setService + '<td id="char'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ '<div class="text-center" id="tAmt'
						+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
						+ (t.listSubServiceIpdDto[i].rate).toFixed(2) + '</div>' + '</td>';
				+'<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'
						+ s
						+ '" id="tAmtSlave'
						+ (t.listSubServiceIpdDto[i].billDetailsId)
						+ '" value="' + netAmt + '"></td>';
			}

		}// added by vinod

		
		setService = setService + '<td id="q'
				+ (t.listSubServiceIpdDto[i].billDetailsId) + '">'
				+ '<div class="text-center">'
				+ t.listSubServiceIpdDto[i].quantity + '</div>' + '</td>'

				

				+ '<td id="char' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ ((t.listSubServiceIpdDto[i].coPay==0) ? (t.listSubServiceIpdDto[i].otherRate) : (t.listSubServiceIpdDto[i].coPay)).toFixed(2) + '</div>' + '</td>';
		
var concessionFlow=$('#concessionFlow').val();			
		
		if(concessionFlow == "on"){
			setService = setService
			+ '<td id="con' + (t.listSubServiceIpdDto[i].billDetailsId)
			+ '">' + '<div class="text-center">'
			+ (t.listSubServiceIpdDto[i].otherConcession).toFixed(2) + '</div>' + '</td>'
			
			+ '<td id="conSponPer' + (t.listSubServiceIpdDto[i].billDetailsId)
			+ '">' + '<div class="text-center">'
			+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2) + '</div>' + '</td>';
		}else{
			setService = setService
			+ '<td style="display: none;" id="con' + (t.listSubServiceIpdDto[i].billDetailsId)
			+ '">' + '<div class="text-center">'
			+ (t.listSubServiceIpdDto[i].otherConcession).toFixed(2) + '</div>' + '</td>'
			
			+ '<td style="display: none;" id="conSponPer' + (t.listSubServiceIpdDto[i].billDetailsId)
			+ '">' + '<div class="text-center">'
			+ (t.listSubServiceIpdDto[i].concessionPer).toFixed(2) + '</div>' + '</td>';
		}
		setService = setService
				+ '<td id="p' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ ((t.listSubServiceIpdDto[i].coPay==0) ? (t.listSubServiceIpdDto[i].otherRate) : (t.listSubServiceIpdDto[i].coPay)).toFixed(2) + '</div>' + '</td>'

				/*+ '<td id="cP' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-center">'
				+ (t.listSubServiceIpdDto[i].otherCoPay).toFixed(2) + '</div>' + '</td>'*/

				+ '<td id="dateSub' + (t.listSubServiceIpdDto[i].billDetailsId)
				+ '">' + '<div class="text-right" id="dateSubservice">'
				+ datetime12 + '</div>';
		setService = setService + '</td>';


		setService = setService + '</tr>';
	}

	$("#naroticDiv").html(setService);
	
	$("#narAmt").val(netTot.toFixed(2));

	}



function getSubServiceDetailsForSponsor11(s)
{
	//alert("hii");
	var t=$('#treatmentId').text();
	var chargesSlaveId = $("#chargesSlaveId").val();
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s,
			"chargesSlaveId" : chargesSlaveId
		},
		url : "ehat/billNoble/getPatientServiceBill",
		success : function(r) {
			if(chargesSlaveId > 0){
				getSubServiceDetailsForSponsorTemp11123(r,s);
			}else{
				getSubServiceDetailsForSponsorTemp111(r,s);
			}
		}
	});
}



/**
 * @code for sponsor charges in billing on sponsor tab
 * @date 30-JUN-2017**/
function getSubServiceDetailsForSponsorTemp111(t,s)
{
	var setService="";
	var netTot=0.0;
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		var a=1+i;
		
		var datetime12= new Date(t.listBillNobleServiceDto[i].createdDate).toLocaleDateString('en-GB');
		var dname= t.listBillNobleServiceDto[i].docName;
		
		var netAmt=Number(t.listBillNobleServiceDto[i].coPay);
		netTot=+netTot + netAmt;
		var osidd=t.listBillNobleServiceDto[i].serviceId;
		var cghsCode = "("+t.listBillNobleServiceDto[i].cghsCode+")";
		if(cghsCode == "" || cghsCode == "-" || cghsCode=="()" || cghsCode=="(-)" || cghsCode=="(null)"){
			cghsCode="";
		}
		if(dname==null){
			
			dname="-";
		}
		if ((t.listBillNobleServiceDto[i].paidFlag == "Y")
				|| (t.listBillNobleServiceDto[i].cancle == "Y")
				|| (t.listBillNobleServiceDto[i].isModify == "N")) {
			setService = setService + '<tr id="tr'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';
		} else {
			setService = setService + '<tr onclick="editSponsorOnClick('
					+ t.listBillNobleServiceDto[i].billDetailsId + ')" id="tr'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';
		}
				
		
		setService=setService
		
		+ '<td style="display:none;" id="row'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'
			
		
		+	'<td> '+ a +' </td>'
		+	'<td style="display:none;" id="bdId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>';

		
		
			
			if (osidd == 14) {

				setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ t.listBillNobleServiceDto[i].invName +cghsCode+' </td>';
			}else if (osidd==11 || osidd==13){//Added by laxman for sended lab test coloe change. 
				
				if((t.listBillNobleServiceDto[i].sndtolabflag)=="Y"){
					setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: green;"> '
					+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
				}else{
				setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
				}
				
				}//code By Sanjay on 26-03-2018 for changes the testname color when it sent to RIS
			else if (osidd==12){
					
					if((t.listBillNobleServiceDto[i].sndtorisflag)=="Y"){
						setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: #00bfff;"> '
						+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
					}else{
					setService = setService + '<td id="catName'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
							+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
					}
					
				}else {

					setService = setService + '<td id="catName'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
							+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
				
			}	
		

		setService = setService

		
		+	'<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ dname+' </td>'
		
		+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].subServiceId+' </td>'
		
		+	'<td style="display:none;" id="dId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'
		
		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
				
		+	'<td style="display:none;" id="amt'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherAmount+' </td>'
		
		+	'<td style="display:none;" id="genRate'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].rate+' </td>'
		
		+	'<td style="display:none;" id="oCon'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherConcession+' </td>'

		+	'<td style="display:none;" id="oPay'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherPay+' </td>'
		
		+	'<td style="display:none;" id="emrPerSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].emrPer+' </td>'
		
		+	'<td style="display:none;" id="isCombinationSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isCombination+' </td>'
 
		
		+	'<td style="display:none;" id="oCoPay'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherCoPay+' </td>'
		
		+	'<td style="display:none;" id="sndtolabflag'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtolabflag+' </td>'

		// added by vinod
		+	'<td style="display:none;" id="sendToRisId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtorisflag +' </td>';
		//Code  by Sanjay
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService +'<td style="display:none;"> '
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
			+	'</td>'
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].otherRate.toFixed(2) +'</div>'
			+	'</td>';
		
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
				+	'</td>';
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}			
			
		}// added by vinod
						
		setService = setService + '<td id="q'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].quantity +'</div>'
		+	'</td>'
		
		+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ ((t.listBillNobleServiceDto[i].coPay==0) ? t.listBillNobleServiceDto[i].otherRate : t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
		+	'</td>';
		
		var concessionFlow=$('#concessionFlow').val();			
		
		if(concessionFlow == "on"){
			setService = setService
		+	'<td id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td id="consPercSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
		+	'</td>';
			}else{
				setService = setService
				+	'<td style="display: none; id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
				+	'</td>'
				
				+	'<td style="display: none; id="consPercSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
				+	'</td>';
			
		}
		setService = setService
		
		
		+	'<td id="p'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ ((t.listBillNobleServiceDto[i].coPay==0) ? t.listBillNobleServiceDto[i].otherRate : t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td id="dateSub'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-right" id="dateSubservice">'+ datetime12 +'</div>';
		setService = setService +	'</td>';
		
		
		setService = setService +	'</tr>';
	}
	
	$("#naroticDiv").html(setService);
	$("#narAmt").val(netTot.toFixed(2));

}



/**
 * @code for sponsor charges in billing on sponsor tab
 * @date 30-JUN-2017**/
function getSubServiceDetailsForSponsorTemp11123(t,s)
{
	var setService="";
	var chargesSlaveId = $("#chargesSlaveId").val();
	var netTot=0.0;
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {		
		if(t.listBillNobleServiceDto[i].chargesSlaveId == chargesSlaveId){
		var a=1+i;
		
		var datetime12= new Date(t.listBillNobleServiceDto[i].createdDate).toLocaleDateString('en-GB');
		var dname= t.listBillNobleServiceDto[i].docName;
		
		var netAmt=Number(t.listBillNobleServiceDto[i].otherPay);
		netTot=+netTot + netAmt;
		var osidd=t.listBillNobleServiceDto[i].serviceId;
		var cghsCode = "("+t.listBillNobleServiceDto[i].cghsCode+")";
		if(cghsCode == "" || cghsCode == "-" || cghsCode=="()" || cghsCode=="(-)" || cghsCode=="(null)"){
			cghsCode="";
		}
		if(dname==null){
			
			dname="-";
		}
		if ((t.listBillNobleServiceDto[i].paidFlag == "Y")
				|| (t.listBillNobleServiceDto[i].cancle == "Y")
				|| (t.listBillNobleServiceDto[i].isModify == "N")) {
			setService = setService + '<tr id="tr'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';
		} else {
			setService = setService + '<tr onclick="editSponsorOnClick('
					+ t.listBillNobleServiceDto[i].billDetailsId + ')" id="tr'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '">';
		}
				
		
		setService=setService
		
		+ '<td style="display:none;" id="row'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'
			
		
		+	'<td> '+ a +' </td>'
		+	'<td style="display:none;" id="bdId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>';

		
		
			
			if (osidd == 14) {

				setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ t.listBillNobleServiceDto[i].invName +cghsCode+' </td>';
			}else if (osidd==11 || osidd==13){//Added by laxman for sended lab test coloe change. 
				
				if((t.listBillNobleServiceDto[i].sndtolabflag)=="Y"){
					setService = setService + '<td id="catName'
					+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: green;"> '
					+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
				}else{
				setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
						+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
				}
				
				}//code By Sanjay on 26-03-2018 for changes the testname color when it sent to RIS
			else if (osidd==12){
					
					if((t.listBillNobleServiceDto[i].sndtorisflag)=="Y"){
						setService = setService + '<td id="catName'
						+ (t.listBillNobleServiceDto[i].billDetailsId) + '" style="color: #00bfff;"> '
						+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
					}else{
					setService = setService + '<td id="catName'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
							+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
					}
					
				}else {

					setService = setService + '<td id="catName'
							+ (t.listBillNobleServiceDto[i].billDetailsId) + '"> '
							+ t.listBillNobleServiceDto[i].categoryName +cghsCode+' </td>';
				
			}	
		

		setService = setService

		
		+	'<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ dname+' </td>'
		
		+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].subServiceId+' </td>'
		
		+	'<td style="display:none;" id="dId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'
		
		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
				
		+	'<td style="display:none;" id="amt'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherAmount+' </td>'
		
		+	'<td style="display:none;" id="genRate'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].rate+' </td>'
		
		+	'<td style="display:none;" id="oCon'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherConcession+' </td>'

		+	'<td style="display:none;" id="oPay'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherPay+' </td>'
		
		+	'<td style="display:none;" id="emrPerSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].emrPer+' </td>'
		
		+	'<td style="display:none;" id="isCombinationSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isCombination+' </td>'
 
		
		+	'<td style="display:none;" id="oCoPay'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherCoPay+' </td>'
		
		+	'<td style="display:none;" id="sndtolabflag'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtolabflag+' </td>'

		// added by vinod
		+	'<td style="display:none;" id="sendToRisId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].sndtorisflag +' </td>';
		//Code  by Sanjay
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService +'<td style="display:none;"> '
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
			+	'</td>'
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].otherRate.toFixed(2) +'</div>'
			+	'</td>';
		
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
				+	'</td>';
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}			
			
		}// added by vinod
						
		setService = setService + '<td id="q'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].quantity +'</div>'
		+	'</td>'
		
		+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ ((t.listBillNobleServiceDto[i].coPay==0) ? t.listBillNobleServiceDto[i].otherRate : t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
		+	'</td>';
		
		var concessionFlow=$('#concessionFlow').val();			
		
		if(concessionFlow == "on"){
			setService = setService
		+	'<td id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td id="consPercSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
		+	'</td>';
			}else{
				setService = setService
				+	'<td style="display: none; id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
				+	'</td>'
				
				+	'<td style="display: none; id="consPercSpon'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
				+	'</td>';
			
		}
		setService = setService
		
		
		+	'<td id="p'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ ((t.listBillNobleServiceDto[i].coPay==0) ? t.listBillNobleServiceDto[i].otherRate : t.listBillNobleServiceDto[i].coPay).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td id="dateSub'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-right" id="dateSubservice">'+ datetime12 +'</div>';
		setService = setService +	'</td>';
		
		
		setService = setService +	'</tr>';
	}
		}
	
	$("#naroticDiv").html(setService);
	$("#narAmt").val(netTot.toFixed(2));

}

//irfan khan 27-june-2018 block patient
function unBlockPatient(pid, pname,callFrom) {
	
	var blockFlag = $("#blockBtn" + pid).val();
	var userName = $("#userName").val();
	
	var person = "";

	if (blockFlag == "N" || blockFlag == null) {
		
		alertify.success(pname+" is Not Blocked!!!");
		
	} else if (blockFlag == "F") {

		if (userName == "admin") {
			
			var r = confirm("Are You Sure To Remove 1st Warning of "+pname+" ?");
			
			if(r==true){
				person = "-";
				
		if (person == null || person == "" || person == undefined) {
			alertify.error("User Cancelled");
			//alert("User Cancelled / Narration compulsory.");
			return false;
		} else {
			jQuery.ajax({
				async : true,
				type : "POST",
				data : {
					"pid" : parseInt(pid),
					"blockFlag" : "N",
					"narration" : person

				},
				url : "ehat/registration/unBlockPatient",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					alertify.success(r);
					if(callFrom == "registration"){
						fetchVisitingPatient1();
					}else{
						fetchVisitingPatientForBlockList();
					}
				}
			});
			}
			
			}
		} else {
			alert("You don't have permission to Remove 1st warning");
			return false;
		}

	} else if (blockFlag == "S") {

		if (userName == "admin") {
			
			var r = confirm("Are You Sure To Remove 2nd Warning of "+pname+" ?");
			
			if(r==true){
				person = "-";
				
		if (person == null || person == "" || person == undefined) {
			alertify.error("User Cancelled");
			//alert("User Cancelled / Narration compulsory.");
			return false;
		} else {
			jQuery.ajax({
				async : true,
				type : "POST",
				data : {
					"pid" : parseInt(pid),
					"blockFlag" : "F",
					"narration" : person

				},
				url : "ehat/registration/unBlockPatient",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					alertify.success(r);
					if(callFrom == "registration"){
						fetchVisitingPatient1();
					}else{
						fetchVisitingPatientForBlockList();
					}
				}
			});
			}
			
			}
		} else {
			alert("You don't have permission to Remove 2nd warning.");
			return false;
		}

	} else if (blockFlag == "T") {

		if (userName == "Admin") {
			
			var r = confirm("Do you want to UnBlock "+pname+" ?");
			
			if(r==true){
				person = "-";
				
		if (person == null || person == "" || person == undefined) {
			alertify.error("User Cancelled");
			//alert("User Cancelled / Narration compulsory.");
			return false;
		} else {
			jQuery.ajax({
				async : true,
				type : "POST",
				data : {
					"pid" : parseInt(pid),
					"blockFlag" : "S",
					"narration" : person

				},
				url : "ehat/registration/unBlockPatient",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					alertify.success(r);
					if(callFrom == "registration"){
						fetchVisitingPatient1();
					}else{
						fetchVisitingPatientForBlockList();
					}
				}
			});
			}
			
			}
		} else {
			alert("You don't have permission to UnBlock.");
			return false;
		}

	}

}

// Abhishek Kumbhar code for reason of visit on registration page Date-22 March 2019.
function setAddReasonOfVisitreg() {
	var inputs = [];	
	inputs.push('callFrom=masterForm');
	inputs.push('searchText=');	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/getallreasons",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;		
			pobj1 = r;//eval('(' + ajaxResponse + ')');
			var html="<option value='0'>-Select-</option>";			
			for(var i=0; i< pobj1.reasonOfVisitDetails.length ;i++){
			html= html +"<option value="+pobj1.reasonOfVisitDetails[i].reasonOfVisit_ID+">"+pobj1.reasonOfVisitDetails[i].reasonOfVisit+"</option>";
		}
			$("#reasonofvisit").html(html);
		}
	});
}

function setDocNameInMultiSelect(){
	
	var docId = $('#spclwiseDoc').val();	
	$("#doctorName").select2("val", $("#doctorName").select2("val").concat(docId));	
}

function disableDocNameInMultiSelect(){
	
	$('#spclwiseDoc').select2('open');
}

/************
 *@author	: Kishor Lokhande
 *@date		: 23-May-2017
 *@code		: Display unit list on reg page
 ***********/
function getUnitList(){
	
	var ulogin =$("#userName").val();
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/unit/unitMasterListOnLogin",
		data : {
			"ulogin" : ulogin
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},		
		success : function(r){
			
			setUnitList(r);	
		}
	});	
}

function setUnitList(r){
	
	var list="";
	
	for ( var int = 0; int < r.lstUnit.length; int++) {
		
		list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
	}	
	
	$("#e1").html(list);
	var unitId =$("#unitId").val();
	$('#e1').select2('val',unitId);
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


function getBloodGroupListOnReg(){
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/organdonor/getBloodGroupList",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setBloodGroupListOnReg(r);
		},
	});
}

function setBloodGroupListOnReg(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select Blood Group - </option>";
	
    for ( var i = 0; i < r.lstBloodGroupMaster.length; i++) {  

        list = list + "<option value='"+r.lstBloodGroupMaster[i].bloodGroupId+"' class='un'>" + (r.lstBloodGroupMaster[i].bloodGrouptName) + "</option>";    
    }  
    $("#bloodGroupId").html(list);
   
}

//=============================================================================
//Code added by Badrinath Wagh for the date fetching
//=============================================================================
function getBirthDate(){
	var dob=$("#dob").val();
	var age = $("#year").val();
	
	var date = new Date();
	var date4=date.toLocaleDateString();
	var res=date4.split('/');
		
	var month=res[0];
	if(month.length == 1){
		month="0"+month;
	}
	var days=res[1];
	if(days.length == 1){
		days="0"+days;
	}
	var year=res[2];
	var date2=date.setDate(date.getDate() -(365 * age));
	var date1=new Date(date2);
	var date5=days+"/"+month+"/"+date1.getFullYear();
	$("#dob").val(date5);
	$('#dob').datepicker("setDate", date5);
}

function validateBirthMonth(id){
	/*var dob=$("#dob").val();
	alert(dob)
	var age = $("#month").val();
	
	var date = new Date();
	var date4=date.toLocaleDateString();
	var res=date4.split('/');
		
	var month=res[0];
	if(month.length == 1){
		month="0"+month;
	}
	var days=res[1];
	if(days.length == 1){
		days="0"+days;
	}
	var year=res[2];
	//var date2=date.setDate(date.getDate() -(365 * age));
	
	var date2=date.setDate(date.getMonth() -(12 * age));
	var date1=new Date(date2);
	var date5=days+"/"+month+"/"+date1.getFullYear();
	$("#dob").val(date5);
	*/
	
	var month =$("#month").val();
	
	if(month >12 || month < 0){
		//alert("Month range is 0 to 12.!!!");
		alert("Month should not greater than 12.!!!");
		$('#' + id).val(0);
		return false();
	}
	
	var days = $("#days").val();
	var age = $("#year").val();

	var date = new Date();

	// newly added code
	  date.setFullYear(date.getFullYear() - age);
	  date.setMonth(date.getMonth() - month);
	  date.setDate(date.getDate() - days);
	  
	  var yy = date.getFullYear();
	  var mm = date.getMonth()+1;
	  var dd = date.getDate();
	  
	  var finalDate = dd+'/'+mm+'/'+yy;
	 // alert(finalDate)
	// ======================================
	/*var date4=date.toLocaleDateString(); 

  

   if(age != 0 || age != "" && month !=0 || month != "" &&  days == 0 || days == ""){
	
	var ageindays = 365 * age;
	var monthindays = 30 * month
	var total = ageindays + monthindays ;
	
	 var date2=date.setDate(date.getDate() - (365 * age + 30 * month + days * 1) );
	}
	
	
	
  var date1=new Date(date2);
	//  var date5=days+"/"+month+"/"+date1.getFullYear();
  var day = date1.getDate();

   if(day < 10){
	day ="0"+day;
    }
   var month = date1.getMonth()+1;

   if(month < 10){
	month ="0"+month;
    }
   var year = date1.getFullYear();
  //var date5=date1.getDate()+"/"+date1.getMonth()+"/"+date1.getFullYear();
   var date5 = day+"/" +month+"/"+year;*/
	 $("#dob").val(finalDate);
	
}

function validateBirthDays(id){
	var days = $('#' + id).val();
	
	//alert(month);
	if(days >31 || month < 0){
		alert("Days range is 0 to 31.!!!");
		$('#' + id).val(0);
		return false();
	}
	
	var month = $("#month").val();
	var age = $("#year").val();
		
	var date = new Date();
	
	//const date = new Date();
	  date.setFullYear(date.getFullYear() - age);
	  date.setMonth(date.getMonth() - month);
	  date.setDate(date.getDate() - days);
	  
	  var yy = date.getFullYear();
	  var mm = date.getMonth()+1;
	  var dd = date.getDate();
	  
	  var finalDate = dd+'/'+mm+'/'+yy;
	 // alert(finalDate)
	  
	/*var date4=date.toLocaleDateString(); 

  
	if(age != 0 || age != "" || month !=0 || month != "" ||  days == 0 || days == ""){
	
	var ageindays = 365 * age;
	var monthindays = 30 * month
	var total = ageindays + monthindays ;
	var date2=date.setDate(date.getDate() - (365 * age + 30 * month + days * 1) );
	}

   var date1=new Date(date2);
	
   var day = date1.getDate();
   var month = date1.getMonth()+1;
   var year = date1.getFullYear();
  
   var date5 = day+"/" +month+"/"+year;
	alert(date5)*/
 
	 $("#dob").val(finalDate);
	 
	 $('#dob').datepicker("setDate", finalDate);
}

function setIdProofType(){
	
	var proofId = $("#idProof").val();
	
	if(proofId == 1){
		
		$("#identificationNum").attr("onkeypress", "return validateNumOnly(event)"); 
		$("#identificationNum").attr("minlength", "12");
		$("#identificationNum").attr("maxlength", "12");
	}else if(proofId == 2){
		
		$("#identificationNum").removeAttr("onkeypress"); 
		$("#identificationNum").attr("minlength", "10");
		$("#identificationNum").attr("maxlength", "10");
	}else if(proofId == 3){
		
		$("#identificationNum").removeAttr("onkeypress"); 
		$("#identificationNum").attr("minlength", "8");
		$("#identificationNum").attr("maxlength", "8");
	}else if(proofId == 4){
		
		$("#identificationNum").removeAttr("onkeypress"); 
		$("#identificationNum").attr("minlength", "15");
		$("#identificationNum").attr("maxlength", "15");
	}else if(proofId == 5){
		
		$("#identificationNum").removeAttr("onkeypress"); 
		$("#identificationNum").attr("minlength", "");
		$("#identificationNum").attr("maxlength", "");
	}
}

function getAllDoctorListForRegistartion(){
	
	var callfrom="doctor";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		data : {
			"callfrom" : callfrom
		},
		url		: "ehat/registration/getDocListUnitWise",
		success : function(r) {
			var list="<option value='0'>-select-</option>";
			
			for ( var int = 0; int < r.lstDoctorDto.length; int++) {
				list=list+'<option value="'+(r.lstDoctorDto[int].doctor_ID)+'">'+(r.lstDoctorDto[int].doc_name)+'</option>';
				
			}	
			/*if(meeshaFlow == "on"){
				$("#doctorName").html(list);
			}*/			
			
			$("#doctorName").html(list);
			$("#selDoctorName").html(list);		
			$("#selDoctorName").select2();	
			$("#doctorNameIpdSponsor").html(list);	
			$("#selDoctorNameNew").html(list);		
			$("#selDoctorNameNew").select2();				
		}
	});
}


function getSpecilizationByDoctorId(){
	
	
	
	 var doctorID = $("#doctorName").val();
	 if(doctorID == null || doctorID == ""){
			return false;
		}else{
			var inputs = [];
			inputs.push('doctorId=' + doctorID);
			var str = inputs.join('&');
			
			jQuery.ajax({
				async : false,
				type : "POST",
				data :str+"&reqType=AJAX",
				url : "ehat/users/getDoctorDetailsByDoctorId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					
					if(r.specialisation.includes(","))
					{
						$('#isMultiple').val("Multiple");
						var specialisationArray = r.specialisation.split(',');
						var namesArray = r.specializationName.split(',');

							var selectBox = $("#drDeptId");

							selectBox.empty();
							
							// Add a default option as the first option
							selectBox.append($('<option>', {
							    value: '0',
							    text: 'Select'
							}));

							$.each(specialisationArray, function(index, value) {
							    selectBox.append($('<option>', {
							        value: value,
							        text: namesArray[index].trim() 
							    }));
							});

							selectBox.trigger('#drDeptId change.select2');
							selectBox.select2('val', specialisationArray[0]);
}
					else
					{
						getSpecialization("reg","drDeptId");
						$('#isMultiple').val("Single");
						$("#drDeptId").select2('val',r.specialisation);
						
					}
				}
			});
		}

}

function getAllDoctorListForBilling(){

	 var meeshaFlow= $("#meeshaFlow").val();
	var callfrom="doctor";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		data : {
			"callfrom" : callfrom
		},
		url		: "ehat/registration/getDocListUnitWise",
		success : function(r) {
			var list="<option value='0'>-select-</option>";
			
			for ( var int = 0; int < r.lstDoctorDto.length; int++) {
				list=list+'<option value="'+(r.lstDoctorDto[int].doctor_ID)+'">'+(r.lstDoctorDto[int].doc_name)+'</option>';
				
			}	
			/*if(meeshaFlow == "on"){
				$("#doctorName").html(list);
			}*/
			    $("#radioDoctorList").html(list);
				$("#doctorName").html(list);
				$("#doctorNameOpdSponsor").html(list);
				
		}
	});

	
}

function getSpecilizationByDoctorIdOnBilling(){
	
	
	 var doctorID = 0;
	 var sponsorId=$("#chargesSlaveId").val();
	 
	 if(sponsorId > 0){
		 doctorID = $("#doctorNameOpdSponsor").val();
		 if(doctorID == undefined)
		{
			 doctorID = $("#doctorNameIpdSponsor").val();
		}
	 }else{
		 doctorID = $("#doctorName").val();
	 }
	 
	 if(doctorID == null || doctorID == ""){
			return false;
		}else{
			var inputs = [];
			inputs.push('doctorId=' + doctorID);
			var str = inputs.join('&');
			
			jQuery.ajax({
				async : false,
				type : "POST",
				data :str+"&reqType=AJAX",
				url : "ehat/users/getDoctorDetailsByDoctorId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					
				
					
					
					if(sponsorId>0){
						
						
						if(r.specialisation.includes(","))
						{
							$('#isMultiple').val("Multiple");
							var specialisationArray = r.specialisation.split(',');
							var namesArray = r.specializationName.split(',');

								var selectBox = $("#specialityIdSponsor");

								selectBox.empty();
								
								// Add a default option as the first option
								selectBox.append($('<option>', {
								    value: '0',
								    text: 'Select'
								}));

								$.each(specialisationArray, function(index, value) {
								    selectBox.append($('<option>', {
								        value: value,
								        text: namesArray[index].trim() 
								    }));
								});

								selectBox.trigger('#specialityIdSponsor change.select2');
							}
						else
						{
							getSpecialization("reg","specialityIdSponsor");
							$('#isMultiple').val("Single");
							$("#specialityIdSponsor").select2('val',r.specialisation);
							
						}
						
					}else{
						if(r.specialisation.includes(","))
						{
							$('#isMultiple').val("Multiple");
							var specialisationArray = r.specialisation.split(',');
							var namesArray = r.specializationName.split(',');

								var selectBox = $("#specialityId");

								selectBox.empty();
								
								// Add a default option as the first option
								selectBox.append($('<option>', {
								    value: '0',
								    text: 'Select'
								}));

								$.each(specialisationArray, function(index, value) {
								    selectBox.append($('<option>', {
								        value: value,
								        text: namesArray[index].trim() 
								    }));
								});

								selectBox.trigger('#specialityId change.select2');
							}
						else
						{
							getSpecialization("reg","specialityId");
							$('#isMultiple').val("Single");
							$("#specialityId").select2('val',r.specialisation);
							
						}
					}
				}
			});
		}

}

/************
* @author	: Vishant Pawar
* @date		: 24-July-2023
* @codeFor	: Hall And HallType On UI
 ************/
function getIpdPatientHeaderInfoOnIPD2(r){
	


	var unitId = $("#unitId").val();
		
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(r));
	inputs.push('unitId=' + encodeURIComponent(unitId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getIpdPatientHeaderInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
	 		if(r.listRegTreBillDto[0]!=undefined || r.listRegTreBillDto[0]!=null){
			  	$("#hallName").text(r.listRegTreBillDto[0].hallName);
			  
	 		}
 		}
	});

	
}

/************
* @author	: Rohini Ambhore
* @date		: 15-Sep-2023
* @codeFor	: DOB Year
 ************/
function getBirthDateNew(){
/*	var dob=$("#dob").val();
	var age = $("#year").val();
	
		var date = new Date();
		var date4=date.toLocaleDateString();
		var res=date4.split('/');
		var month=res[0];
		if(month.length == 1)
			{
			month="0"+month;
			}
		var days=res[1];
		if(days.length == 1)
			{
			days="0"+days;
			}
		var year=res[2];
	  var date2=date.setDate(date.getDate() -(365 * age));
	  var date1=new Date(date2);
	 // var date5=days+"/"+month+"/"+date1.getFullYear();
	  var date5=days+"/"+month+"/"+date1.getFullYear();
	 $("#dob").val(date5);*/
	
	var dob=$("#dob").val();
	var age = $("#year").val();
	
	
	const today = new Date();
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const formattedToday = dd + '/' + mm + '/' + yyyy;
	
	  var date2=today.setDate(today.getDate() -(365 * age));
	  var date1=new Date(date2);
	//  var date5=days+"/"+month+"/"+date1.getFullYear();
 var date5=dd+"/"+mm+"/"+date1.getFullYear();
	 $("#dob").val(date5);
	
}


function getDate()
{
	var dob=$("#dob").val();
	var age = $("#year").val();
	
	
	const today = new Date();
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const formattedToday = dd + '/' + mm + '/' + yyyy;
	
	/*	var date = new Date();
		var date4=date.toLocaleDateString();
		var res=date4.split('/');
		var month=res[0];
		if(month.length == 1)
			{
			month="0"+month;
			}
		var days=res[1];
		if(days.length == 1)
			{
			days="0"+days;
			}
		var year=res[2];*/
	
	  var date2=today.setDate(today.getDate() -(365 * age));
	  var date1=new Date(date2);
	//  var date5=days+"/"+month+"/"+date1.getFullYear();
 var date5=dd+"/"+mm+"/"+date1.getFullYear();
	 $("#dob").val(date5);
	
}

function validateNumberforName(){
	
	// var reg = /^[0-9]+$/;
	var reg = /^[a-z A-Z]+$/;
		var id = $("#fName").val();
	
		if (id != "" && !reg.test(id)) {
			alert("Please Enter Only alphabet..!");
			$("#fName").val("");
			return false;
		}
}


/************
* @author	: Rohini Ambhore
* @date		: 22 April 2022
* @codeFor	: Get dob from month
 ************/
function validateBirthMonth(id){
	var month = $('#' + id).val();
	
	if(month >12 || month < 0){
		//alert("Month range is 0 to 12.!!!");
		alert("Month should not greater than 12.!!!");
		$('#' + id).val(0);
		return false();
	}
	
	var days = $("#days").val();
	var age = $("#year").val();

	var date = new Date();
	var date4=date.toLocaleDateString(); 

   /* if( days == 0 || days == ""){
	alert('...........111111.........');
	   var date2=date.setDate(date.getDate() -(30 * month));
    }
    else if( days != 0 || days != ""){
	alert('...........2222222222222.........');
	   var date2=date.setDate(date.getDate() -(30 * month + 1 * days));
    }
    else{
	alert('..........3333333333.......');
	    var date2=date.setDate(date.getDate() -(30 * month));
    }*/

   if(age != 0 || age != "" && month !=0 || month != "" &&  days == 0 || days == ""){
	
	/*var ageindays = 365 * age;
	var monthindays = 30 * month
	var total = ageindays + monthindays ;
	
	 var date2=date.setDate(date.getDate() - (365 * age + 30 * month + days * 1) );*/
	   
	   var ageindays = 365 * age;
		var monthindays = 30.417 * month
		var totalday = days * 1;
		var total = ageindays + monthindays ;
		
		var totaldays = ageindays + monthindays + totalday;
	
		//let date = new Date();
		date.setDate(date.getDate() - days);
		date.setMonth(date.getMonth() - month);
		date.setFullYear(date.getFullYear() - age);
		
		
		 var date2= date ;// date.setDate(date.getDate() - (totaldays) );
	}
	
	
	
  var date1=new Date(date2);
	//  var date5=days+"/"+month+"/"+date1.getFullYear();
  var day = date1.getDate();

   if(day < 10){
	day ="0"+day;
    }
   var month = date1.getMonth()+1;

   if(month < 10){
	month ="0"+month;
    }
   var year = date1.getFullYear();
  //var date5=date1.getDate()+"/"+date1.getMonth()+"/"+date1.getFullYear();
   var date5 = day+"/" +month+"/"+year;
	 $("#dob").val(date5);
}

/************
* @author	: Rohini Ambhore
* @date		: 22 April 2022
* @codeFor	: Get dob from days
 ************/

function validateBirthDays(id){
	var days = $('#' + id).val();
	
	//alert(month);
	if(days >31 || month < 0){
		alert("Days range is 0 to 31.!!!");
		$('#' + id).val(0);
		return false();
	}
	
	var month = $("#month").val();
	var age = $("#year").val();
		
	var date = new Date();
	var date4=date.toLocaleDateString(); 

  /* if(month == 0 || month == ""){
	var date2=date.setDate(date.getDate() -(1 * days));
	}
	else if(month != 0 || month != "")
	{
		var date2=date.setDate(date.getDate() -(30 * month + 1 * days));
	}else{
		var date2=date.setDate(date.getDate() -(1 * days));
	}*/
	
	if(age != 0 || age != "" || month !=0 || month != "" ||  days == 0 || days == ""){
	
/*	var ageindays = 365 * age;
	var monthindays = 30 * month
	var total = ageindays + monthindays ;
	var date2=date.setDate(date.getDate() - (365 * age + 30 * month + days * 1) );*/
	
		date.setDate(date.getDate() - days);
		date.setMonth(date.getMonth() - month);
		date.setFullYear(date.getFullYear() - age);
		var date2=date;
	}
	
   var date1=new Date(date2);
	//  var date5=days+"/"+month+"/"+date1.getFullYear();
   var day = date1.getDate();
   var month = date1.getMonth()+1;
   var year = date1.getFullYear();
  //var date5=date1.getDate()+"/"+date1.getMonth()+"/"+date1.getFullYear();
   var date5 = day+"/" +month+"/"+year;
 
	 $("#dob").val(date5);
}

//added by vishant

function fetchAdmissionReportSiddhivinayak(){
	
	var fromDate = ($("#fromDate").val()).split("/");
	//var fromDate = $("#inputromDate").val();
	
	var fdate =(fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);
	
	var toDate = fdate;//($("#toDate").val()).split("/"); //added by sandip
	//var toDate = $("#inputToDate").val();
	
	var tdate = fdate;//(toDate[2] + "-" + toDate[1] + "-" + toDate[0]);
	
	var doctorId = $("#doctorName").val();
	
	if(refDocId==null){
		var refDocId = 0;
	}
	else{
		var refDocId = $("#refBy").val();
	}
	var caseTypeId = $("#patientType").val();
	var mediclaimType = $("input[name=mediclaimByRadio]:checked").val();
	
	if (fdate == "" || fdate == undefined) {
		alert("Please Select From Date!");
		$("#fromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} /*else if (tdate == "" || tdate == undefined) {
		alert("Please Select To Date!");
		$("#toDate").val("");
		SetFocus("inputToDate");
		return false;
	}*/
	
	//for searching sponsor
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	

	var inputs = [];
	// inputs.push('action=proFeesfetchReports');
	
	inputs.push('fromDate=' + fdate);
	inputs.push('toDate=' + tdate);
	inputs.push('doctorId=' + 0);
	inputs.push('refDocId=' + 0);
	inputs.push('caseTypeId=' + 0);
	inputs.push('mediclaimType=' + 0);
	inputs.push('chargesId=' + chargesId);
	inputs.push('chargesSlaveId='+chargesSlaveId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/registration/fetchAdmissionReportSiddhivinayak",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					//alert(r.admissionReportSiddhi[0].admitTime);
					
					
				var htm="";	
				var	htmHead = "";
				htmHead = htmHead
					+ "<tr style='background-color: #EEEEEE; position: sticky;'><th>SR.NO"
					+ "</th><th class='col-md-1'>Admit-Date"
					+ "</th><th class='col-md-1'>MRN No"
					
					+ "</th><th class='col-md-3'>Bed-Name"
					+ "</th><th class='col-md-3'>Patient-Name"
					+ "</th><th class='col-md-1'>Patient Contact"
					+ "</th><th class='col-md-1'>Diagnosis"
					
					+ "</th><th class='col-md-3'>Department"
					+ "</th><th class='col-md-1'>Days"
					+ "</th><th class='col-md-3'>Scheme"
					+ "</th><th class='col-md-3'>Consulting Doctor"
					+ "</th><th class='col-md-1'>Ref.Doctor"
					+ "</th><th class='col-md-1'>Contact No"
					+ "</th></tr>";
					
				//var allHall= getHallList();	
					if (r.admissionReportSiddhi.length == 0
							|| r.admissionReportSiddhi.length == null) {
						// no records.
						htm = htm
								+ "<tr style='height:30px;  color:red; font-size:30px;'><th class='center' colspan='13'>Record Not Found...!!!</th></tr>";
						
						$("#tableTestPatientListHead").html(htmHead);
						$("#tablePatientList").html(htm);
						
						
						
						$("#totalRecord").text(r.admissionReportSiddhi.length);
						
						var fromDateValue = document.getElementById('fromDate').value;
					    //var toDateValue = document.getElementById('toDate').value;

					    document.getElementById('dynamicFromDate').textContent = fromDateValue;
					   // document.getElementById('dynamicToDate').textContent = toDateValue;
					} else {

						var uniqueHallNames = [];  // To store unique hallName values

						/*for (var i = 0; i < r.admissionReportSiddhi.length; i++) {
						    var list = r.admissionReportSiddhi[i];
						    var admdate = new Date(list.admitDate).toLocaleDateString('en-GB');

						    // Check if hallName is not in the uniqueHallNames array
						    if (!uniqueHallNames.includes(list.hallName)) {
						        // Display header for the unique hallName
						        htm = htm + "<tr style='height:18px; color:black; background-color:#9BB7D4; font-size:18px;'><th class='center' colspan='13'>" + list.hallName + "</th></tr>";
						        // Add the hallName to the uniqueHallNames array to avoid displaying it again
						        uniqueHallNames.push(list.hallName);
						    }

						    // Display data for each iteration
						    htm = htm + "<tr style='height:21px;'>"
						        + "<td class='col-md-1'>" + (i + 1) + "</td>"
						        + "<td class='col-md-1'>" + admdate + "</td>"
						        + "<td class='col-md-1'>" + list.mrnno + "</td>"
						        + "<td class='col-md-1'>" + list.bedName + "</td>"
						        + "<td class='col-md-3'>" + list.patientName + "</td>"
						        + "<td class='col-md-1'>" + list.patientMobile + "</td>"
						        + "<td class='col-md-1'>" + list.diagnosisName + "</td>"
						        + "<td class='col-md-1'>" + list.departmentName + "</td>"
						        + "<td class='col-md-3'>" + list.admitDays + "</td>"
						        + "<td class='col-md-1'>" + list.scheme + "</td>"
						        + "<td class='col-md-1'>" + list.consultantDoctor + "</td>"
						        + "<td class='col-md-1'>" + list.refDoctorName + "</td>"
						        + "<td class='col-md-1'>" + list.contactNo + "</td>"
						        + "</tr>";
						}*/
						
						
						r.admissionReportSiddhi.sort(function(a, b) {
						    // Compare by serviceName
						    if (a.hallName < b.hallName) return -1; 
						    if (a.hallName > b.hallName) return 1; 
  
						    // If serviceName is the same, compare by subServiceName
						    

						    return 0;  // If both serviceName and subServiceName are the same
						});
						
						for (var i = 0; i < r.admissionReportSiddhi.length; i++) {
						    var list = r.admissionReportSiddhi[i];
						    var admdate = new Date(list.admitDate).toLocaleDateString('en-GB');

						    if (!uniqueHallNames.includes(list.hallName)) {
						        htm += "<tr style='height:18px; color:black; background-color:#9BB7D4; font-size:18px;'><th class='center' colspan='13'>" + list.hallName + "</th></tr>";
						        uniqueHallNames.push(list.hallName);
						    }

						    htm += "<tr style='height:21px;'>"
						        + "<td class='col-md-1'>" + (i + 1) + "</td>"
						        + "<td class='col-md-1'>" + admdate + "</td>"
						        + "<td class='col-md-1'>" + list.mrnno + "</td>"
						        + "<td class='col-md-1'>" + list.bedName + "</td>"
						        + "<td class='col-md-3'>" + list.patientName + "</td>"
						        + "<td class='col-md-1'>" + list.patientMobile + "</td>"
						        + "<td class='col-md-1'>" + list.diagnosisName + "</td>"
						        + "<td class='col-md-1'>" + list.departmentName + "</td>"
						        + "<td class='col-md-3'>" + list.admitDays + "</td>"
						        + "<td class='col-md-1'>" + list.scheme + "</td>"
						        + "<td class='col-md-1'>" + list.consultantDoctor + "</td>"
						        + "<td class='col-md-1'>" + list.refDoctorName + "</td>"
						        + "<td class='col-md-1'>" + list.contactNo + "</td>"
						        + "</tr>";
						}


						$("#tableTestPatientListHead").html(htmHead);
						$("#tablePatientList").html(htm);
						
						$("#totalRecord").text(r.admissionReportSiddhi.length);
						
						var fromDateValue = document.getElementById('fromDate').value;
					   // var toDateValue = document.getElementById('toDate').value;

					    document.getElementById('dynamicFromDate').textContent = fromDateValue;
					   // document.getElementById('dynamicToDate').textContent = toDateValue;
					    
					}
				}
			});
}

function myCallback({ quantity }) {
	
	return quantity > 5 ? "ok" : "restock";
}

function fetchAllCustomerTypes(){
	
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getalltype',
		type : 'GET',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select Type-</option>';
			
			for(var i=0; i<r.tmCmLookupDetLookupList.length; i++)
				htm += '<option value="'+r.tmCmLookupDetLookupList[i].lookup_det_id+'">'+r.tmCmLookupDetLookupList[i].lookup_det_desc_rg+"</option>";
			
			$('#custTypeForRegPage').html(htm);
			$('#custTypeForRegPage').select2();
		}
	
	});
}

function fetchCustomerTypeByUnitId(id, name){
	
	var val = $('#'+id).val();
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getCustomersFromType',
		data : { 'type' : val },
		type : 'POST',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select Name-</option>';
			
			for(var i=0; i<r.businessMasterDto.length; i++)
				htm += '<option value="'+r.businessMasterDto[i].id+'" data-name="' + r.businessMasterDto[i].type + '">'+r.businessMasterDto[i].name+"</option>";
			
			$('#'+name).html(htm);
			$('#'+name).select2();
		}	
	});
}
//Added Bya Rahul
function getSorceDoc(){
	//alert("hii")
	var isSourceType = $("#selReferredBy option:selected").text();
	var input = [];
	input.push('isSourceType='+isSourceType);
	var str = input.join('&');
	jQuery.ajax({
		async	: false,
		type 	: "GET",
		data  	: str + "&reqType=AJAX",
		url		: "ehat/registration/getSorceDoc",
		success : function(r) {		
			var list="<option value='0'>-select-</option>";
			
			for ( var int = 0; int < r.lstDoctorDto.length; int++) {
				
				list=list+'<option value="'+(r.lstDoctorDto[int].doctor_ID)+'">'+(r.lstDoctorDto[int].doc_name)+'</option>';
				
			}	
 
				$("#refByInHouse").html(list);
				
				
		}
	});
}

function fetchCustomerNameByUnitId(unitId) {
	
	//var unitId = $("#unitList").val();
	var unitId		= parseInt($("#unitId").val());
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		type    : "POST",
		url     : "ehat/businessCustMaster/getCustomerNameByUnitId",
		data    :  str + "&reqType=AJAX",
		success : function(r) {
		
			//var custListTemp="";
			var custListTemp = custListTemp	+ "<option value='0'>--Select Name--</option>";
			var custTypeTemp = custTypeTemp	+ "<option value='0'>--Select Type--</option>";
			
			for (var i = 0; i < r.businessMasterDto.length; i++) {
				
				custListTemp = custListTemp + "<option value="
						+ r.businessMasterDto[i].id + " data-name=" + r.businessMasterDto[i].type + ">"
						+ r.businessMasterDto[i].name+ "</option>";
			}
			$("#custNameRegPage").html(custListTemp);
			$("#custNameRegPage").select2();
					
		}
	});
}

function fetchCustomerTypeByName(){
	
	var typeId = $("#custNameRegPage").select2().find(":selected").data("name");
	$("#custTypeForRegPage").select2('val',typeId);
}