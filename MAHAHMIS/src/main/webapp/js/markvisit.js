
 /***********
 * @author	: Sagar Kadam // modify by ajay s khandare
 * @date	: 9-jun-2017 // :02-08-2019
 * @reason	: fetching all patient details from markvisit view // modify adding by pagination 
 **********/ 

function fetchVisitingPatient1() {
	
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
 		url 	: "ehat/markvisit/getMarkVisitList",
		/*timeout : 1000 * 60 * 5,*/
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		
		success : function(r) {
			
			ajaxResponse = r;	
		 
			//  added by ajay: 02-08-2019 statring pagination //
			var numberOfRows="";
			var index=1;
			var count=ajaxResponse.countpatient;
			var numberOfPages=(count/10);
			var displayPagination=numberOfPages;
			
			if(numberOfPages>5){
				numberOfRows +="<li class='disabled previous'><a><i class='ti-angle-double-left'></i></a></li>";
				displayPagination=5;
			}
			for(var j=0;j<displayPagination;j++){
				numberOfRows +="<li onclick='pagination("+index+")'><a>"+index+"</a></li>";
				index=index+1;
			}
			if(numberOfPages>6){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.round(numberOfPages)+")'><a><i class='ti-angle-double-right' value='Next'></i></a></li>";
			}
			$('#totalNumberOfPages').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
			$('#patientRecordPagination').html(numberOfRows);
			
			//  added by ajay: 02-08-2019 ending pagination //
  			
			setTempMarkVisit(r);	
 		},
		
	});	
}
 

//added by ajay: 02-08-2019  pagination //
function pagination(pageNumber){
	
	var startIndex = (pageNumber-1)+"0";
	var inputs = [];
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		data : str + "&reqType=AJAX",
		url  : "ehat/markvisit/getMarkVisitListpagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        	ajaxResponse = r;	
		
  		        setTempMarkVisit(r);
 		},
		
	});	

}

//added by ajay: 02-08-2019  nextPagination //
function nextPagination(currentIndex,numberOfPages){
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='ti-angle-double-left'></i></a></li>";
	if(numberOfPages<displayPagination){
		displayPagination=numberOfPages+1;
		//numberOfRows +="<li class='next disabled' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='ti-angle-right'></i></a></li>";
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='pagination("+j+")'><a>"+j+"</a></li>";
	}
	if(numberOfPages>displayPagination){
		numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='ti-angle-double-right'></i></a></li>";
	}
		$('#patientRecordPagination').html(numberOfRows);
}

//added by ajay: 02-08-2019  previousPagination //
function previousPagination(currentIndex,numberOfPages){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex>6){
		numberOfRows +="<li class='previous' onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='ti-angle-left'></i></a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='pagination("+j+")'><a>"+j+"</a></li>";
	}
		numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='ti-angle-right'></i></a></li>";
		$('#patientRecordPagination').html(numberOfRows);
}


/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: setting  details on tempelate
 **********/ 
function setTempMarkVisit(r) {
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();	 
	
	/*var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-3-1' style='height: 21.5px;padding-right: 40px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>View</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Edit</div></th>"
			+ "<th class='col-md-1-1 center hide' style='height: 21.5px;'><div class='TextFont'>Admission Print</div></th>"
			+ "<th class='col-md-1-1 center hide' style='height: 21.5px;'><div class='TextFont'>Bill History</div></th>"
 			+ "<th class='col-md-1-1 center hide' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Delete</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Mark Visit</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Print Card</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Print Barcodes</div></th>"
			+ "<th class='col-md-1-1 center hide' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Common Advance</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Block Patient</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Print</div></th>"
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";*/
	var htm="";
 
var index = 1;	
var Mrn= 1010101111;
for ( var i = 0; i < r.lstRegviewDto.length;i++) {
	
	var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
	var patIdPrefix=patPrefix+patMiddle+r.lstRegviewDto[i].ptId+patSufix;
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
						+ "<button class='btn btn-xs btn-success editUserAccess'  data-target='' data-toggle='modal' value='EDIT' type='button' id='btnEdit"
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
						+ "<button class='btn btn-xs btn-success editUserAccess'  data-target='' data-toggle='modal' value='EDIT' type='button' id='btnEdit"
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
//Added by @Author-Sagar ...Date-30/08/2017
function PrintCardFunction2(pid)
{
	//alert("hi");
	$("#trid").val(pid);
	$("#iPopUp").show('show');
	$("#pid11").val(pid);
	//$("#trid24").val(pid);
}

/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: get details based on patient id  
 **********/ 
function setVisitingPatientDetails1(pi,callFrom,ttId) {
	
	/*jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: {
		 "ptid" : pi,
 			},
		url 	: "ehat/markvisit/getPatientDetails",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			//alert('error');
		},
		success : function(r) {*/
	if(ttId != 0){
		
		ttId = -1;
	}
	
	var person = {
		"ptId" : pi ,
		"ttId" : ttId
    }
	
	$.ajax({
        url			: 'ehat/register/getMarkvisitPatientDetails',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
	
 			ajaxResponse = r;
 			
 			if(Number(r.lstMarkVisit[0].ttId) == 0){
 				
 				setRegisterOnlyPatientDetails(r,callFrom);
 				
 			}else if(callFrom == "appointment"){
 				setAppointmentDetails(r);
 			}else{
 				
 				if(callFrom == "appoint"){
 	 				
 	 				setAppointCal("appoint");
 	 				$("#regType").val("markVisit");
 	 				$("#getPatDiv").removeClass("col-md-12");
 	 				$("#getPatDiv").addClass("col-md-9");
 	 				$("#patPhotoDiv").show();
 	 				$("#personalDetails2").hide();
 	 				$("#appointmentType").val("Existing");
 	 				callFrom = "mark";
 	 			}
 	 			
 	   			setRegDetails(r,callFrom);
 	  			setSponser();
 	  			//getPayResp(pi);
 	  			getMlcDetails(pi);
 			}
		
  			$("#getPatDiv").removeClass("col-md-12");
			$("#getPatDiv").addClass("col-md-9");
			$("#patPhotoDiv").show();
			
			getFollowUpCount(r.lstMarkVisit[0].sponsorchargesSlaveId);
		}
	
	});
	
	
}

function setRegisterOnlyPatientDetails(r,clfrom){
	
	$('#rdRegOnly').prop('checked',true);
	$('#e1').select2('val', r.lstMarkVisit[0].unitId);
 	$('#prefix').select2('val',r.lstMarkVisit[0].prefix);
	$('#fName').val(r.lstMarkVisit[0].fName);
	$('#mName').val(r.lstMarkVisit[0].mName);
	$('#lName').val(r.lstMarkVisit[0].lName);
	$('#gender').select2('val',r.lstMarkVisit[0].gender);	
	$('#dob').datepicker("setDate", r.lstMarkVisit[0].dob );
	$('#year').val(r.lstMarkVisit[0].age);
	$('#month').val(r.lstMarkVisit[0].ageMonths);
	$('#days').val(r.lstMarkVisit[0].ageDays);
  	$('#talukaId').val(r.lstMarkVisit[0].talukaId);//locality
	$('#townId').val(r.lstMarkVisit[0].twnId);
	$('#districtId').val(r.lstMarkVisit[0].districtId);//district
	$('#stateId').val(r.lstMarkVisit[0].stateId);
	$('#country').val(r.lstMarkVisit[0].countryId);
	$('#areaCode').val(r.lstMarkVisit[0].areaCode);
	$('#addressText').val(r.lstMarkVisit[0].address);
	
	autoAgeMonthDays();
	
	$('#department').select2('val',r.lstMarkVisit[0].deptId);
	$('#drDeptId').select2('val',r.lstMarkVisit[0].specialityId);
	
	$('#mobile').val(r.lstMarkVisit[0].mobile);
 	$('#token').val(r.lstMarkVisit[0].token);
  	$('#sourceType').val(r.lstMarkVisit[0].sourceTypeId);
	$('#sponsorCatId').val(r.lstMarkVisit[0].sponsorCatId);
 	$('#patientCatId').val(r.lstMarkVisit[0].patientCatId);
 	$('#patientId').val(r.lstMarkVisit[0].ptId);
 	//$('#patientIdText').val(r.lstMarkVisit[0].ptId);
 	$("#patientIdText").text(r.lstMarkVisit[0].centerPatientId);
 	$('#count').val(r.lstMarkVisit[0].count);
 	$('#mrnnoHidden').val(r.lstMarkVisit[0].mrnno);
	$('#reqGenFormId').val(r.lstMarkVisit[0].reqGenFormId);
	$('#invoiceCount').val(r.lstMarkVisit[0].invoiceCount);
	$('#passport').val(r.lstMarkVisit[0].passport);
	$('#visa').val(r.lstMarkVisit[0].visa);
	$('#invoiceFlag').val(r.lstMarkVisit[0].invoiceFlag);
	$('#reasonofvisit').val(r.lstMarkVisit[0].reason_of_visit);
	
	//later added additional info
	$('#peraddressText').val(r.lstMarkVisit[0].perAddress);
  	$('#pertalukaId').val(r.lstMarkVisit[0].pertalukaId);
	$('#pertownId').val(r.lstMarkVisit[0].pertownId);
 	$('#perdistrictId').val(r.lstMarkVisit[0].perdistrictId);
 	
 	$('#perstateId').val(r.lstMarkVisit[0].perstateId);
 	$('#percountry').val(r.lstMarkVisit[0].percountryId);
 	$('#perareaCode').val(r.lstMarkVisit[0].perareaCode);
	$('#oldPatientId').val(r.lstMarkVisit[0].oldPatientId);
	
	$('#emailId').val(r.lstMarkVisit[0].emailId);
	$('#maritalStatusId').val(r.lstMarkVisit[0].maritalStatusId);
	$('#nationalityId').val(r.lstMarkVisit[0].nationalityId);
	$('#religionId').val(r.lstMarkVisit[0].religionId);
	
	$('#languageId').val(r.lstMarkVisit[0].languageId);
	$('#bloodGroupId').val(r.lstMarkVisit[0].bloodGroupId);
	$('#idProof').val(r.lstMarkVisit[0].identityProofId);
	$('#identificationNum').val(r.lstMarkVisit[0].identificationNumber);
	
	$('#annualIncome').val(r.lstMarkVisit[0].annualIncomeId);
	$('#occupation').val(r.lstMarkVisit[0].occupation);
	$('#education').val(r.lstMarkVisit[0].education);
	
	var referredBy = r.lstMarkVisit[0].referredBy;
	$('#selReferredBy').val(r.lstMarkVisit[0].referredSource);
	$('#txtReferredBy').val(r.lstMarkVisit[0].referredSourceSlave);
	
	
	if(referredBy == "walkin"){
		$("#chkWalkin").prop("checked", true);
		$("#chkSource").prop("checked", false);
		sourceDivHide();
		
	}else if(referredBy == "source"){
		$("#chkWalkin").prop("checked", false);
		$("#chkSource").prop("checked", true);
		sourceDivShow();
		//chkRefDocDivHide();
		setReferredBySource2();
	}
	setTimeout(function() {
		$('#refByInHouse').val(r.lstMarkVisit[0].referredSourceDocId);
		$("#sponsor_select").select2("val", r.lstMarkVisit[0].sponsorchargesSlaveId);
	}, 50);
	
	
	var fileName=r.lstMarkVisit[0].imageName;	
	//alert("mark"+fileName);
	$("#curPatImg").val(fileName);
	$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
	
	var aadharFileName=r.lstMarkVisit[0].aadharImageName;	
	//alert("mark"+fileName);
	$("#curAadharImg").val(aadharFileName);
	$('#aadharImg').attr('src','pharmacy/pharmacy/readAadharImage?url='+ aadharFileName);
	
 	//hidden set on reg page for mark visit update patient 
	if(r.lstMarkVisit[0].tFlag == "null" || r.lstMarkVisit[0].tFlag == null || r.lstMarkVisit[0].tFlag == ""){
		$('#markvisitTflag').val("Y");
	}else{
		$('#markvisitTflag').val(r.lstMarkVisit[0].tFlag);
	}
	if(clfrom !="mark"){  //rahul
  	if(r.lstMarkVisit[0].caseType==1){
 		$("#chkHospital").prop('checked',true);
 	}else{
 		$("#chkPrivate").prop('checked',true);
  	}
	}
  	getSponsorRecords("sourceid","slaveid");
	//$('#sponsor_select').select2('val', r.lstMarkVisit[0].sponsorchargesSlaveId);  
  	//alert(r.lstMarkVisit[0].sponsorchargesSlaveId);
  	
  	
	//$("#sponsor_select").select2("val", r.lstMarkVisit[0].sponsorchargesSlaveId).trigger('change.select2');
	$("#refBy").select2("val",r.lstMarkVisit[0].refdocid);
	$("#height").val(r.lstMarkVisit[0].height);
	$("#weight").val(r.lstMarkVisit[0].weight);
	$("#Mheight").val(r.lstMarkVisit[0].m_height);
	$("#Fheight").val(r.lstMarkVisit[0].f_height);
	$("#empid").val(r.lstMarkVisit[0].empid);
	$("#tpaid").val(r.lstMarkVisit[0].tpaid);
	
	if(r.lstMarkVisit[0].refDate!=null){
		var refDate=new Date(r.lstMarkVisit[0].refDate).toLocaleString();
		$("#refDate").val(refDate.split(",")[0]);
	}else{
		$("#refDate").val("");
	}
	
	$("#sanctionAmt").val(r.lstMarkVisit[0].sanctionAmt);
	$("#sactionOrdNo").val(r.lstMarkVisit[0].sactionOrdNo);
	$("#neisNo").val(r.lstMarkVisit[0].neisNo);
	
	if(r.lstMarkVisit[0].validUpToDate!=null){
		var validUpToDate=new Date(r.lstMarkVisit[0].validUpToDate).toLocaleString();
		$("#validUpToDate").val(validUpToDate.split(",")[0]);
	}else{
		$("#validUpToDate").val("");
	}
	
	$("#visitNo").val(r.lstMarkVisit[0].visitNo);
	
	$("#ipdOrOpd").val(r.lstMarkVisit[0].ipdOrOpd);
	$("#treatPermited").val(r.lstMarkVisit[0].treatPermited);
	$("#diseToBeTreat").val(r.lstMarkVisit[0].diseToBeTreat);
	$("#relativeName").val(r.lstMarkVisit[0].relativeName);
 	//$("#createdBy").text(r.lstMarkVisit[1].userNmae);
 	var regDate= new Date(r.lstMarkVisit[0].createdDateTime).toLocaleString();
    	if(r.lstMarkVisit[0].updatedBy!=null ){
  	var editedDate= new Date(r.lstMarkVisit[0].updatedDateTime).toLocaleString();	
    //getUserNameByUserid(r.lstMarkVisit[0].updatedBy,"edit");
  	$("#editedBy").text(r.lstMarkVisit[0].updatedByUser);
    $("#dateTime").text(editedDate);
 	}
 	$("#regDate").text(regDate);
  	//getUserNameByUserid(r.lstMarkVisit[0].createdBy);
 	$("#createdBy").text(r.lstMarkVisit[0].createdByUser);
 	$("#adharcardNo").val(r.lstMarkVisit[0].adharcardNo);
 	var transSMS=r.lstMarkVisit[0].transSMS;
 	var transEmail=r.lstMarkVisit[0].transEmail;
	var pramoEmail=r.lstMarkVisit[0].pramoEmail;
	var pramoSMS=r.lstMarkVisit[0].pramoSMS;
	var external=r.lstMarkVisit[0].external;
	var emergency=r.lstMarkVisit[0].emergency;

	//irfan khan changes
	if(transSMS=="Y"){
		$('#transSMS').prop('checked',true);
	}else{
		$('#transSMS').prop('checked', false);
	}
	
	if(transEmail=="Y"){
		$('#transEmail').prop('checked',true);
	}else{
		$('#transEmail').prop('checked', false);	
	}
	
	if(pramoEmail=="Y"){
		$('#pramoEmail').prop('checked',true);
	}else{
		$('#pramoEmail').prop('checked', false);
	}
	
	if(pramoSMS=="Y"){
		$('#pramoSMS').prop('checked',true);
	}else{
		$('#pramoSMS').prop('checked', false);
	}
	
	if(emergency=="Y"){
		$('#emergency').prop('checked',true);
	}else{
		$('#emergency').prop('checked', false);
	}
	
	if(external=="Y"){
		$('#external').prop('checked',true);
	}else{
		$('#external').prop('checked', false);
	}
	
 	$('#tabs a[href="#account"]').tab('show');//to switch reg tags 
 
  	$("#Otherid").prop("disabled", true);
	 	if (clfrom == "view") {
	 		$('#account').find('input, button, select, textarea').attr('disabled', 'disabled');//to disable all fields of reg page 
	 		$(".btn-table-add-row").hide();
	 		$('select').select2("enable",false);
	 		$('#mulSponsorDetail').fadeIn();
	 		$("#mulSponsorDetail").find('input, button, textarea').attr('disabled', 'disabled');
	 		$("#mulSponsorDetail" ).find('select').removeAttr("disabled");
	 		$('#treatmentId').val(r.lstMarkVisit[0].ttId);
	 	}
	 	if (clfrom == "mark") {
	 	 		
 			$('#queryType').val("markvisit");
 			$("#markvisitTflag").val("Y");
 				
 	 	}
	 	if (clfrom == "edit") {
 	 		
	 		$('#queryType').val("update");
	 		
	 		
	 		//remove disable attribute for reg page
	 		$("#sponsor_select").select2("val", r.lstMarkVisit[0].sponsorchargesSlaveId).trigger('change.select2');
	 		$('#account').find('input, button, select').removeAttr("disabled");//to disable all fields of reg page 
	 		$(".btn-table-add-row").show();
	 		$('select').select2("enable",true);
	 		$('#mulSponsorDetail').fadeIn();
	 		$("#mulSponsorDetail").find('input, button, textarea').attr('disabled', 'disabled');
	 		$("#mulSponsorDetail" ).find('select').removeAttr("disabled");
	 		$('#treatmentId').val(r.lstMarkVisit[0].ttId);
	 	} 
	 	
		$("#demoPtNm").prop("disabled", true);
	 	$("#demoPtSearch").prop("disabled", true);

	 	$('#treatmentId').val(r.lstMarkVisit[0].ttId);
		$('#billId').val(r.lstMarkVisit[0].billId);
		$('#PiD').val(r.lstMarkVisit[0].ptId);
		$('#TRTiD').val(r.lstMarkVisit[0].ttId);
		
	 	refGenFormHideShow();
	 	temForuploaddocuments();
	 	//fetchDocOnReg1();
	 	
	 	if(clfrom == "view"){
	 		$("#savebuton").hide();
	 	}else{
	 		$("#savebuton").show();
	 	}
}
 
/*//@author :Sagar Kadam @date: 17-Jun-2017 @reason :
function setSponser(){
	var si=$("#sourceType").val();
 	if(si>0){
  		$('#sponserselectDiv').fadeIn();
  	}else{
   		$('#sponserselectDiv').fadeOut();
  	}
}*/


/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: to get doctor name from db
 **********/ 
function getDoctorname(drid) {
	//alert("hi");
	var strVale = drid;
	
	var strArr = strVale.split(',');
	for(var i=0; i<strArr.length; i++) 
	{ strArr[i] = parseInt(strArr[i], 10);
	
	drid=strArr[i];}
	
	//alert(drid);
	
	
	var docName="";
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
			//$('#doctorId').val(r.lstDoctorDto[0].doc_name);
			
			
			$("#dynamicItem2").select2(r.lstDoctorDto[0].doc_name);
			
			//$("#dynamicItem2").html(r.lstDoctorDto[0].doc_name);
			
			//alert(r.lstDoctorDto[0].doc_name);
			
			/* 
 			var docTemp="";
			docTemp=docTemp		
			+ '<li class="select2-search-choice">' 
			+ '<div>'+docName+'</div>'
			+ '<a tabindex="-1"class="select2-search-choice-close" onclick="return false;" href="#"></a>'
			+ '</li>';
			
			$(".select2-choices").append(docTemp);		*/
		}
	});
	return docName;
}

function getUserNameByUserid(userid,callfrom){
	//alert("hi");
		var inputs = [];
		inputs.push('userid=' + userid);
		var str = inputs.join('&');
		
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/getUserNameByUserid",
		success : function(r) {
			 console.log(r);
 			 $("#createdBy").text(r);
 			 if(callfrom=="edit"){
				 $("#editedBy").text(r);
 			 }
  		},
		error :function(r){
			alert("Network Issue!");
			console.log(r);
		}
	});

	}

/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: setting  details on tempelate to show on reg ui
 **********/ 
function setRegDetails(r,clfrom) {
	//$('#sponserselectDiv').fadeOut();
	//var si=$("#sourceType").val();
	$('#Patientid').prop('checked',true);
  	$('#e1').select2('val', r.lstMarkVisit[0].unitId);
 	$('#prefix').select2('val',r.lstMarkVisit[0].prefix);
	$('#fName').val(r.lstMarkVisit[0].fName);
	$('#mName').val(r.lstMarkVisit[0].mName);
	$('#lName').val(r.lstMarkVisit[0].lName);
	$('#gender').select2('val',r.lstMarkVisit[0].gender);
	//$('#dob').val(r.lstMarkVisit[0].dob);
	$('#dob').datepicker("setDate", r.lstMarkVisit[0].dob );
	
	$('#year').val(r.lstMarkVisit[0].age);
	$('#month').val(r.lstMarkVisit[0].ageMonths);
	$('#days').val(r.lstMarkVisit[0].ageDays);
	
	
  	/*$('#talukaId').val(r.lstMarkVisit[0].talukaId);//locality
	$('#townId').val(r.lstMarkVisit[0].twnId);
	$('#districtId').val(r.lstMarkVisit[0].districtId);//district
	$('#stateId').val(r.lstMarkVisit[0].stateId);
	$('#country').val(r.lstMarkVisit[0].countryId);*/
	
	$('#talukaId').select2('val', r.lstMarkVisit[0].talukaId);
	$('#townId').select2('val', r.lstMarkVisit[0].twnId);
	$('#districtId').select2('val',r.lstMarkVisit[0].districtId);
	$('#stateId').select2('val', r.lstMarkVisit[0].stateId);
	$('#country').select2('val', r.lstMarkVisit[0].countryId);
	
	$('#areaCode').val(r.lstMarkVisit[0].areaCode);
	$('#addressText').val(r.lstMarkVisit[0].address);
	if(clfrom =="mark"){  //rahul
		$('#sourceType').select2('val', 0);
	
	}else{$('#sourceType').select2('val', r.lstMarkVisit[0].sourceTypeId);}
	autoAgeMonthDays();
	
	var casualityFlag = r.lstMarkVisit[0].casualityFlag;
	if(clfrom !='mark'){  //rahul
	if(casualityFlag == 'Y'){
		
		$('#department').select2('val',4);
	}else{
		
		$('#department').select2('val',r.lstMarkVisit[0].deptId);
	}
	 $('#drDeptId').select2('val',r.lstMarkVisit[0].specialityId);
	}else
	{
		$('#department').select2('val',r.lstMarkVisit[0].deptId);
		$('#drDeptId').select2('val',r.lstMarkVisit[0].specialityId);
	}
	//$('#drDeptId').select2('val',r.lstMarkVisit[0].specialityId);
	
	$('#mobile').val(r.lstMarkVisit[0].mobile);
 	$('#token').val(r.lstMarkVisit[0].token);
  //	$('#sourceType').val(r.lstMarkVisit[0].sourceTypeId);
	$('#sponsorCatId').val(r.lstMarkVisit[0].sponsorCatId);
 	$('#patientCatId').val(r.lstMarkVisit[0].patientCatId);
 	$('#patientId').val(r.lstMarkVisit[0].ptId);
 	//$('#patientIdText').val(r.lstMarkVisit[0].ptId);
 	$("#patientIdText").text(r.lstMarkVisit[0].centerPatientId);
 	$('#count').val(r.lstMarkVisit[0].count);
 	$('#mrnnoHidden').val(r.lstMarkVisit[0].mrnno);
	$('#reqGenFormId').val(r.lstMarkVisit[0].reqGenFormId);
	$('#invoiceCount').val(r.lstMarkVisit[0].invoiceCount);
	$('#passport').val(r.lstMarkVisit[0].passport);
	$('#visa').val(r.lstMarkVisit[0].visa);
	$('#invoiceFlag').val(r.lstMarkVisit[0].invoiceFlag);
//	$('#reasonofvisit').val(r.lstMarkVisit[0].reason_of_visit);
	
	$('#reasonofvisit').select2('val',r.lstMarkVisit[0].reason_of_visit);
	
	//later added additional info
	$('#peraddressText').val(r.lstMarkVisit[0].perAddress);
  	/*$('#pertalukaId').val(r.lstMarkVisit[0].pertalukaId);
	$('#pertownId').val(r.lstMarkVisit[0].pertownId);
 	$('#perdistrictId').val(r.lstMarkVisit[0].perdistrictId);
 	
 	$('#perstateId').val(r.lstMarkVisit[0].perstateId);
 	$('#percountry').val(r.lstMarkVisit[0].percountryId);*/
	
	$('#pertalukaId').select2('val',r.lstMarkVisit[0].pertalukaId);
	$('#pertownId').select2('val',r.lstMarkVisit[0].pertownId);
 	$('#perdistrictId').select2('val',r.lstMarkVisit[0].perdistrictId);
 	
 	$('#perstateId').select2('val',r.lstMarkVisit[0].perstateId);
 	$('#percountry').select2('val',r.lstMarkVisit[0].percountryId);
 	
 	$('#perareaCode').val(r.lstMarkVisit[0].perareaCode);
	$('#oldPatientId').val(r.lstMarkVisit[0].oldPatientId);
	
	$('#emailId').val(r.lstMarkVisit[0].emailId);
	$('#maritalStatusId').val(r.lstMarkVisit[0].maritalStatusId);
	$('#nationalityId').val(r.lstMarkVisit[0].nationalityId);
	$('#religionId').val(r.lstMarkVisit[0].religionId);
	
	$('#languageId').val(r.lstMarkVisit[0].languageId);
	$('#bloodGroupId').val(r.lstMarkVisit[0].bloodGroupId);
	$('#idProof').val(r.lstMarkVisit[0].identityProofId);
	$('#identificationNum').val(r.lstMarkVisit[0].identificationNumber);
	
	$('#annualIncome').val(r.lstMarkVisit[0].annualIncomeId);
	$('#occupation').val(r.lstMarkVisit[0].occupation);
	$('#education').val(r.lstMarkVisit[0].education);
	
	
	$('#txtReferredBy').val(r.lstMarkVisit[0].referredSourceSlave);
	
	if(clfrom !='mark'){//rahul
	var referredBy = r.lstMarkVisit[0].referredBy;
	$('#selReferredBy').val(r.lstMarkVisit[0].referredSource);
	$('#custTypeForRegPage').select2('val',r.lstMarkVisit[0].customerType);
	$('#custNameRegPage').select2('val',r.lstMarkVisit[0].customerId);
	
	  
	if(referredBy == "walkin"){
		$("#chkWalkin").prop("checked", true);
		$("#chkSource").prop("checked", false);
		sourceDivHide();
		
	}else if(referredBy == "source"){
		$("#chkWalkin").prop("checked", false);
		$("#chkSource").prop("checked", true);
		sourceDivShow();
		//chkRefDocDivHide();
		setReferredBySource2();
	}
	setTimeout(function() {
		$('#refByInHouse').select2('val',r.lstMarkVisit[0].referredSourceDocId);
		$("#sponsor_select").select2("val", r.lstMarkVisit[0].sponsorchargesSlaveId);
	}, 50);
	}
	
	var fileName=r.lstMarkVisit[0].imageName;	
	//alert("mark"+fileName);
	$("#curPatImg").val(fileName);
	$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
	
	var aadharFileName=r.lstMarkVisit[0].aadharImageName;	
	//alert("mark"+fileName);
	$("#curAadharImg").val(aadharFileName);
	$('#aadharImg').attr('src','pharmacy/pharmacy/readAadharImage?url='+ aadharFileName);
	
 	//hidden set on reg page for mark visit update patient 
 	$('#markvisitTflag').val(r.lstMarkVisit[0].tFlag);
  	if(r.lstMarkVisit[0].caseType==1){
 		$("#chkHospital").prop('checked',true);
 	}else{
 		$("#chkPrivate").prop('checked',true);
  	}
  	if(clfrom !='mark'){//rahul
  	getSponsorRecords("sourceid","slaveid");
	//$('#sponsor_select').select2('val', r.lstMarkVisit[0].sponsorchargesSlaveId);  
  	//alert(r.lstMarkVisit[0].sponsorchargesSlaveId);
  	
  	
	//$("#sponsor_select").select2("val", r.lstMarkVisit[0].sponsorchargesSlaveId).trigger('change.select2');
  	
  	$("#refBy").select2("val",r.lstMarkVisit[0].refdocid);
  	}
	$("#height").val(r.lstMarkVisit[0].height);
	$("#weight").val(r.lstMarkVisit[0].weight);
	$("#Mheight").val(r.lstMarkVisit[0].m_height);
	$("#Fheight").val(r.lstMarkVisit[0].f_height);
	$("#empid").val(r.lstMarkVisit[0].empid);
	$("#tpaid").val(r.lstMarkVisit[0].tpaid);
	
	/*if(r.lstMarkVisit[0].refDate!=null){
		var refDate=new Date(r.lstMarkVisit[0].refDate).toLocaleString();
		$("#refDate").val(refDate.split(",")[0]);
	}else{
		$("#refDate").val("");
	}
	
	$("#sanctionAmt").val(r.lstMarkVisit[0].sanctionAmt);
	$("#sactionOrdNo").val(r.lstMarkVisit[0].sactionOrdNo);
	$("#neisNo").val(r.lstMarkVisit[0].neisNo);
	
	if(r.lstMarkVisit[0].validUpToDate!=null){
		var validUpToDate=new Date(r.lstMarkVisit[0].validUpToDate).toLocaleString();
		$("#validUpToDate").val(validUpToDate.split(",")[0]);
	}else{
		$("#validUpToDate").val("");
	}
	
	$("#visitNo").val(r.lstMarkVisit[0].visitNo);
	
	$("#ipdOrOpd").val(r.lstMarkVisit[0].ipdOrOpd);
	$("#treatPermited").val(r.lstMarkVisit[0].treatPermited);
	$("#diseToBeTreat").val(r.lstMarkVisit[0].diseToBeTreat);*/
	$("#relativeName").val(r.lstMarkVisit[0].relativeName);
 	//$("#createdBy").text(r.lstMarkVisit[1].userNmae);
 	var regDate= new Date(r.lstMarkVisit[0].createdDateTime).toLocaleString();
    	if(r.lstMarkVisit[0].updatedBy!=null ){
  	var editedDate= new Date(r.lstMarkVisit[0].updatedDateTime).toLocaleString();	
    //getUserNameByUserid(r.lstMarkVisit[0].updatedBy,"edit");
  	$("#editedBy").text(r.lstMarkVisit[0].updatedByUser);
    $("#dateTime").text(editedDate);
 	}
 	$("#regDate").text(regDate);
  	//getUserNameByUserid(r.lstMarkVisit[0].createdBy);
 	$("#createdBy").text(r.lstMarkVisit[0].createdByUser);
 	$("#adharcardNo").val(r.lstMarkVisit[0].adharcardNo);
 	var transSMS=r.lstMarkVisit[0].transSMS;
 	var transEmail=r.lstMarkVisit[0].transEmail;
	var pramoEmail=r.lstMarkVisit[0].pramoEmail;
	var pramoSMS=r.lstMarkVisit[0].pramoSMS;
	var external=r.lstMarkVisit[0].external;
	var emergency=r.lstMarkVisit[0].emergency;
	var ivfTreatFlag = r.lstMarkVisit[0].ivfTreatFlag;
	//alert("adhr-"+r.lstMarkVisit[0].adharcardNo+"tem-"+transEmail+"tsm-"+transSMS+"pem-"+pramoEmail+"psm-"+pramoSMS+"ext-"+external+"emr-"+emergency);
	/*if(transSMS=="Y" || transEmail=="Y" ||pramoEmail=="Y" || pramoSMS=="Y" || emergency=="Y" || external=="Y"){
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

     }*/
	//alert(r.lstMarkVisit[0].admissionDateTime);
	if(r.lstMarkVisit[0].admissionDateTime!="-" && r.lstMarkVisit[0].admissionDateTime!="" &&  r.lstMarkVisit[0].admissionDateTime!=null){
		//var admissionDateTime=new Date(r.lstMarkVisit[0].admissionDateTime).toLocaleString();
		//$("#doa").val(admissionDateTime.split(",")[0]);
		var admissionDateTime=new Date(r.lstMarkVisit[0].admissionDateTime).toLocaleDateString('en-GB');
		$("#doa").val(admissionDateTime);
	}else{
		$("#dao").val("");
	}

	if(r.lstMarkVisit[0].admissionDateTime!="-" && r.lstMarkVisit[0].admissionDateTime!="" && r.lstMarkVisit[0].admissionDateTime!=null){
		var admissionDateTime=new Date(r.lstMarkVisit[0].admissionDateTime).toLocaleString();
		//$("#toa").val((admissionDateTime.split(",")[1]).split(":")[0]+":"+(admissionDateTime.split(",")[1]).split(":")[1]);
		var HH = (admissionDateTime.split(",")[1]).split(":")[0];
		var MM = (admissionDateTime.split(",")[1]).split(":")[1];
		HH = HH.trim();
		MM = MM.trim();
		if(HH.trim().length == 1){
			
			HH = "0"+ HH;
		}
		if(MM.trim().length == 1){
			
			MM = "0"+ MM;
		}
		$("#toa").val(HH+":"+MM);
	}else{
		$("#tao").val("");
	}

	
	//irfan khan changes
	if(transSMS=="Y"){
		$('#transSMS').prop('checked',true);
	}else{
		$('#transSMS').prop('checked', false);
	}
	
	if(transEmail=="Y"){
		$('#transEmail').prop('checked',true);
	}else{
		$('#transEmail').prop('checked', false);	
	}
	
	if(pramoEmail=="Y"){
		$('#pramoEmail').prop('checked',true);
	}else{
		$('#pramoEmail').prop('checked', false);
	}
	
	if(pramoSMS=="Y"){
		$('#pramoSMS').prop('checked',true);
	}else{
		$('#pramoSMS').prop('checked', false);
	}
	
	if(emergency=="Y"){
		$('#emergency').prop('checked',true);
	}else{
		$('#emergency').prop('checked', false);
	}
	
	if(external=="Y"){
		$('#external').prop('checked',true);
	}else{
		$('#external').prop('checked', false);
	}
	
	if(ivfTreatFlag=="Y"){
		$('#ivfFlag').prop('checked',true);
	}else{
		$('#ivfFlag').prop('checked', false);
	}
	
	if(clfrom !='mark'){//rahul
	getDoctorBySpecialization('speciality','doctorName');
	}
	 
	var strVale = r.lstMarkVisit[0].drId;

	var strArr = strVale.split(',');
	if(clfrom !='mark'){//rahul
 	$('#doctorName').select2('val', strArr);
 	//$('#doctorNameProxy').select2('val', strArr);
	}else
	{
		$('#doctorName').select2('val', strArr);	
		}
  	$('#tabs a[href="#account"]').tab('show');//to switch reg tags 
 
  	$("#Otherid").prop("disabled", true);
	//$("#Patientid").prop("disabled",true);
	 	if (clfrom == "view") {
	 		$("#sponsor_select").select2("val", r.lstMarkVisit[0].sponsorchargesSlaveId).trigger('change.select2');
  	 		$('#account').find('input, button, select, textarea').attr('disabled', 'disabled');//to disable all fields of reg page 
  	 	//$('#s2id_doctorName').find('input, button, select').attr('disabled', 'disabled');//to disable all fields of reg page 
  	 		//$('button').prop('disabled', true);
	 		//$('#savebuton').find('input, button, select').attr('disabled','disabled');//to disable only personal tag of reg page 
	 		//$( "#savebuton" ).prop( "disabled", true );
	 		//$( "#savebuton" ).button({disabled:true});
	 		$(".btn-table-add-row").hide();
	 		$('select').select2("enable",false);
  	 		//$('#doctorName').attr('disabled', 'disabled');
	 		
	 		$('#mulSponsorDetail').fadeIn();
	 		$("#mulSponsorDetail").find('input, button, textarea').attr('disabled', 'disabled');
	 		$("#mulSponsorDetail" ).find('select').removeAttr("disabled");
	 		$('#treatmentId').val(r.lstMarkVisit[0].ttId);
	 	}
	 	if (clfrom == "mark") {
	 	 		
	 			$("#sponsor_select").select2("val", r.lstMarkVisit[0].sponsorchargesSlaveId).trigger('change.select2');
	 			$('#queryType').val("markvisit");
 				$('#account').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
 				

 	 			//$('#personalDetails').find('input, button, select').attr('disabled','disabled');//to disable only personal tag of reg page
 	 			$(".btn-table-add-row").show();
 	 			$("#markvisitTflag").val("Y");
 				//$('#account').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
 	 			//$("#savebuton").button({disabled:false});
 	 			
 	 			$('#mulSponsorDetail').fadeIn();
 		 		$("#mulSponsorDetail").find('input, button, textarea').removeAttr("disabled");
 		 		$("#mulSponsorDetail" ).find('select').attr("disabled");
 		 		$("#saveMultiSpnsr").prop("disabled", true);
 		 		$("#deleteMultiSpnsr").prop("disabled", true);
 		 		$('#treatmentId').val(r.lstMarkVisit[0].ttId);
 	 	}
	 	if (clfrom == "edit") {
 	 		
	 				$("#sponsor_select").select2("val", r.lstMarkVisit[0].sponsorchargesSlaveId).trigger('change.select2');
	 				$('#queryType').val("update");
	 				$('#account').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
	 				//$('#department').find('input, button, select').attr('disabled','disabled');//to remove disable attributes 
	 				$('#treatmentId').val(r.lstMarkVisit[0].ttId);
	 			 	$('#billId').val(r.lstMarkVisit[0].billId);
	 			 	$(".btn-table-add-row").show();
	 				$('#selectdept').find('input, button, select').attr('disabled','disabled');
	 				//$("#savebuton").button({disabled:false});
	 				
	 				if(r.lstMarkVisit[0].tFlag=="Y"){
	 					$('#mulSponsorDetail').fadeIn();
		 		 		$("#mulSponsorDetail").find('input, button, textarea').removeAttr("disabled");
		 		 		$("#mulSponsorDetail" ).find('select').removeAttr("disabled");	
		 		 		$("#saveMultiSpnsr").prop("disabled", false);
		 		 		$("#deleteMultiSpnsr").prop("disabled", false);
	 				}else{
	 					$('#mulSponsorDetail').fadeIn();
	 			 		$("#mulSponsorDetail").find('input, button, textarea').attr('disabled', 'disabled');
	 			 		$("#mulSponsorDetail" ).find('select').removeAttr("disabled");
	 			 		$("#saveMultiSpnsr").prop("disabled", true);
	 			 		$("#deleteMultiSpnsr").prop("disabled", true);
	 				}
	 	} 
	 	
		$("#demoPtNm").prop("disabled", true);
	 	$("#demoPtSearch").prop("disabled", true);
	 	
	 	/*if(clfrom != "appoint"){
	 		
	 		$("#getPatDiv").removeClass("col-md-12");
			$("#getPatDiv").addClass("col-md-9");
			$("#patPhotoDiv").show();
	 	}*/
		
		$('#PiD').val(r.lstMarkVisit[0].ptId);
		$('#TRTiD').val(r.lstMarkVisit[0].ttId);
		
	 	refGenFormHideShow();
	 	temForuploaddocuments();
	 	//fetchDocOnReg1();
	 	
	 	if(clfrom == "view"){
	 		$("#savebuton").hide();
	 	}else{
	 		$("#savebuton").show();
	 	}
	 	
	 	autoAgeMonthDays();
	 	
	 	if(r.lstMarkVisit[0].refDate!=null){
			var refDate=new Date(r.lstMarkVisit[0].refDate).toLocaleDateString('en-GB');
			//$("#refDate").val(refDate.split(",")[0]);
			$("#refDate").val(refDate);
		}else{
			$("#refDate").val("");
		}
	 	
	 	$("#sanctionAmt").val(r.lstMarkVisit[0].sanctionAmt);
		$("#sactionOrdNo").val(r.lstMarkVisit[0].sactionOrdNo);
		$("#neisNo").val(r.lstMarkVisit[0].neisNo);
		
		if(r.lstMarkVisit[0].validUpToDate!=null){
			var validUpToDate=new Date(r.lstMarkVisit[0].validUpToDate).toLocaleDateString('en-GB');
			//$("#validUpToDate").val(validUpToDate.split(",")[0]);
			$("#validUpToDate").val(validUpToDate);
		}else{
			$("#validUpToDate").val("");
		}
		
		$("#visitNo").val(r.lstMarkVisit[0].visitNo);
		
		$("#ipdOrOpd").val(r.lstMarkVisit[0].ipdOrOpd);
		$("#treatPermited").val(r.lstMarkVisit[0].treatPermited);
		$("#diseToBeTreat").val(r.lstMarkVisit[0].diseToBeTreat);
		
		if(clfrom == 'edit'){
				$('#department').select2('disable', true);
		}
}

/************
* @author	: Sagar Kadam
* @date		: 05-June-2017
* @codeFor	: Autosuggestion for Markvisit  
 ************/

function setAutoCompleteMarkVisit(inputId, callfrom) {
	

	$("#container").addClass("loading");
    var inputFromDate = $("#inputFromDate").val();
    var inputToDate = $("#inputToDate").val();
    if (callfrom == "auto"){
        $("#inputFromDate").val("");
        $("#inputToDate").val("");
	}

    if (callfrom == "search" && inputFromDate != "" && inputFromDate != null
            && inputFromDate != undefined && inputToDate != ""
                && inputToDate != null && inputToDate != undefined) {
        fetchVisitingPatientDateWise();

         }
    else
    	{
    	var usertype = "";
    	var letter="";
    	if (callfrom ="search") {
    		letter=$("#byName").val();
    		if($("#byid").is(':checked')){
    			
    			usertype="Y";				
    		}else{
    			usertype="N";
    		}
    	}
    	
        var findingName = $("#" + inputId).val();
           var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async 	: true,
            type 	: "POST",
            data 	: str + "&reqType=AJAX",
            url 	: "ehat/markvisit/autoSuggestionMarkVisit",
            /*timeout : 1000 * 60 * 15,*/
            cache 	: true,
            success : function(r) {
            	 
            	
               if(callfrom=="search"){
            	  //fetchVisitingPatient1();
            	  setTempMarkVisit(r);
            	   //autoCompTableforMarkVisit(r, inputId);    
                }else{
                	//autoCompTableforMarkVisit(r, inputId);
                }
             }
        });
    	}
    
}

/************
* @author	: Sagar Kadam
* @date		: 05-June-2017
* @codeFor	: Autosuggestion for Markvisit  
 ************/

function setAutoCompleteMarkVisitForList(inputId, callfrom) {
	
    var inputFromDate = $("#inputFromDate").val();
    var inputToDate = $("#inputToDate").val();
    if (callfrom == "auto"){
        $("#inputFromDate").val("");
        $("#inputToDate").val("");
	}

    if (callfrom == "search" && inputFromDate != "" && inputFromDate != null
            && inputFromDate != undefined && inputToDate != ""
                && inputToDate != null && inputToDate != undefined) 
    {
        fetchVisitingPatientDateWise();

         }
    else
    	{
    	var usertype = "";
    	var letter="";
    	if (callfrom ="search") {
    		letter=$("#byName").val();
    		if($("#byid").is(':checked')){
    			
    			usertype="Y";				
    		}else{
    			usertype="N";
    		}
    	}
    	 //var findingName ="";
        var findingName = $("#" + inputId).val();
           var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async 	: true,
            type 	: "POST",
            data 	: str + "&reqType=AJAX",
            url 	: "ehat/markvisit/autoSuggestionMarkVisit1",
           // timeout : 1000 * 60 * 15,
            cache 	: true,
            success : function(r) {
            	
            	 
            	
               if(callfrom=="search"){
            	  //fetchVisitingPatient1();
            	   autoCompTableforMarkVisit(r, inputId);
            	  //setTempMarkVisit(r);
            	       
                }else{
                	
                	autoCompTableforMarkVisit(r, inputId);
                }
             }
        });
    	}

}

//jitendra 18 April 2019
function setAutoCompleteMarkVisitForList1(inputId, callfrom) {
    var inputFromDate = $("#inputFromDate").val();
    var inputToDate = $("#inputToDate").val();
    if (callfrom == "auto"){
        $("#inputFromDate").val("");
        $("#inputToDate").val("");
	}

    if (callfrom == "search" && inputFromDate != "" && inputFromDate != null
            && inputFromDate != undefined && inputToDate != ""
                && inputToDate != null && inputToDate != undefined) {
        fetchVisitingPatientDateWise();

         }
    else
    	{
    	var usertype = "";
    	var letter="";
    	if (callfrom ="search") {
    		letter=$("#byName").val();
    		if($("#byid").is(':checked')){
    			
    			usertype="Y";				
    		}
    		else
    		{
    			usertype="N";
    		}
    	}
    	
        var findingName = $("#" + inputId).val();
           var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async 	: true,
            type 	: "POST",
            data 	: str + "&reqType=AJAX",
            url 	: "ehat/markvisit/autoSuggestionMarkVisit1",
            /*timeout : 1000 * 60 * 15,*/
            cache 	: true,
            success : function(r) {
            	 
            	
               if(callfrom=="search"){
            	  //fetchVisitingPatient1();
            	   autoCompTableforMarkVisit(r, inputId);
            	  //setTempMarkVisit(r);
            	       
                }else{
                	autoCompTableforMarkVisit(r, inputId);
                }
             }
        });
    	}

}
 
/************
* @author	: Sagar Kadam
* @date		: 05-June-2017
* @codeFor	: Autosuggestion Template for Markvisit  
 ************/

function autoCompTableforMarkVisit(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id

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
					&& ui.item.fName != 'Match') {
			
				 
				$('#'+id).val(ui.item.patientName);
			}
			/*
			 * This function use for Enter keypress search
			 */
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
			console.log(data.lstRegviewDto.length);
			var result;
			if (!data || data.lstRegviewDto.length === 0 || !data.lstRegviewDto
					|| data.lstRegviewDto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'fName' : 'Record',
					'ptId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.lstRegviewDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}
 
function commonFuntionForSearch(inputId, callfrom) {
	 
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#txtPName").val();
	}
     var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async 	: false,
            type 	: "POST",
            data 	: str + "&reqType=AJAX",
            url 	: "ehat/markvisit/commonFuntionForSearch",
            timeout : 1000 * 60 * 15,
            cache 	: false,
            success : function(r) {
            	alert(r);
               if(callfrom=="search"){
            	   console.log(r);
             	    setTempMarkVisit(r);
                    autoCompTable(r, inputId);    
                }else{
                    autoCompTable(r, inputId);
                }
             }
        });
    }


/*******************************************************************************
 * @author Sagar Kadam
 * @date 12_July_2017
 * @Code Get all Patient records.
 ******************************************************************************/
//Modify by Laxman on 15-Jan-2018.
function getAllPatient(r) {
 //alert("in js");		
	var deptId = 1;
	 $("#depId").val(deptId);
	//alert(deptId);
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"deptId" : deptId
		},
		
		url : "ehat/registration/getAllRecordsForOPDqueue1",
		success : function(r) {
			
			//alert("=====>>>>"+JSON.stringify(r));			
			$("#appointedpatientDiv").html(r);
			setTempPatientForOPDque1(r);

			 
			 
		}
	});
}


function getAllPatient12() {
	 //alert("in js");		
		var deptId = 1;
		 $("#depId").val(deptId);
		 var invoiceCount=$("#invcount").val();
		// alert(invoiceCount);
		
		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"deptId" : deptId,
				"invoiceCount" : invoiceCount
				
			},
			
			url : "ehat/registration/getAllRecordsForOPDqueue12",
			success : function(r) {
				
				//alert("=====>>>>"+JSON.stringify(r));	
				//alert(r.listOpdQueManagmentViewDto.length);
				$("#appointedpatientDiv").html(r);
				setTempPatientForOPDque12(r);

				 
				 
			}
		});
	}





function setTempPatientForOPDque12(r) {
	var d_id="";
	var htm = '';
	var count = 0;
	var dept = "";
	dept = "OPD";
	var cnt=0;
	var test="";
	
	
	//alert(r.listOpdQueManagmentViewDto.length);
		
	/*var len = r.listEhatBillPrefix.length;		
	var prefix="";
	var middle="";
	var sufix="";
	for(var n=0;n<len;n++){
	
  		var lst = r.listEhatBillPrefix[n];
  		// For Patient Id  		
  		if(lst.depId==4){
  			
  			prefix=lst.billPrefix;
  			middle=lst.billMiddle;
  			sufix=lst.billSuffix;  			  					  			
  		}
  		// For Patient Id  			
  	}*/
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	
	//alert(r.listOpdQueManagmentViewDto[0].invoiceCountt);
	
	var rowCount = $('#myTable >tbody >tr').length;
	
	/*if(rowCount>=0){
		if(rowCount++)
	       $("#myTable").hide(); 
	     
	   }else{
	        $("#myTable").show();
	   }
	
	alert(rowCount);*/
	
	if(r.listOpdQueManagmentViewDto.length==0)
		{
		alert("No More Records");
		return false;
		}
	
	for ( var i = 0; i < r.listOpdQueManagmentViewDto.length; i++) {
		var strVale = r.listOpdQueManagmentViewDto[i].doctorId;
		var array = strVale.split(",");
		
		$("#invcount").val(r.listOpdQueManagmentViewDto[i].invoiceCountt);
		
		
		//To generate Tooltip
		for ( var k in array) {
		for ( var g = 0; g < r.lstDoctorDto.length; g++) {
			if (array[k] == r.lstDoctorDto[g].doctor_ID) {
			test=test+" "+r.lstDoctorDto[g].doc_name;
			
			}
		}
		}
		var patId= patPrefix + patMiddle + r.listOpdQueManagmentViewDto[i].patientId + patSufix; 	
		
  		var datetime= new Date(r.listOpdQueManagmentViewDto[i].createdDateTime).toLocaleString();
 		htm = htm   + '<tr>'
			 
					+ '<td  class="" id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (++rowCount)
					+ ' <span class="tiptipClass" title="your tooltip text here"> </td>'

					+ '<td  class="col-md-2" id="name '
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].patientName) + ' </td>'

					+ '<td class="col-md-1" id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (patId) + '</td>'

					+ '<td class="col-md-1" id="mobile'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].mobile) + ' </td>'

					+ '<td class="" id="AppDate'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (datetime)
					+ ' </td>'
					//Added by Laxman on 28-Dec-2017
					+ '<td class="col-md-1" id="tokanNo'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' 
					+ (r.listOpdQueManagmentViewDto[i].tokenno)
					+ ' </td>'
						
					+ '<td id="toptip"  data-toggle="tooltip" data-placement="top" title="'+test+'" animation: true class="col-md-2" id="token'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].opdipdno) + ' </td>'
					
					 
				
 					/*+'<td class="col-md-1-1 center" id="departmentId'
					+ r.listOpdQueManagmentViewDto[i].patientId
					+ '">'
					+ (dept)
					+ ' </td>'*/;
 			
		if(array.length>1){
		htm = htm
					+ '<td class="col-md-2" style="padding:5px"><button style="font-size:10px" onclick="showDoctors('+i+');">'
					+ ' Show Doctors <i  style="font-size:10px;color:SteelBlue ;"  id="shBillView'+i+'" class="fa fa-chevron-circle-down" ></i></button>  <div id="'+i+'" class="box border" style="display:none;overflow-y: scroll;padding:5px;"> '
					+ ' <table > ' + '<tr> ' + '<th width="505Px"> Doctor Name  </th> '
					+ ' <th> Select   </th>' + '</tr>';

					for ( var k in array) {	

						for ( var g = 0; g < r.lstDoctorDto.length; g++) {
		
							if (array[k] == r.lstDoctorDto[g].doctor_ID) {
								d_id = r.lstDoctorDto[g].doctor_ID;
															
								if(d_id == r.listOpdQueManagmentViewDto[i].inQueueDocId){
									
									htm = htm + '<tr><td>' + r.lstDoctorDto[g].doc_name	+ '</td>'
									+ '<td> <input type="radio" checked name="drname' + cnt	+ '" value="' + r.lstDoctorDto[g].doctor_ID	+ '"> ' + '</td> ' + '</tr> '
									+ '<input type="hidden"  id="opddrid'+ r.lstDoctorDto[g].doctor_ID + '" value="' + r.lstDoctorDto[g].doctor_ID + '"> ';
								}else{
									
									htm = htm + '<tr><td>' + r.lstDoctorDto[g].doc_name	+ '</td>'
									+ '<td> <input type="radio" name="drname' + cnt	+ '" value="' + r.lstDoctorDto[g].doctor_ID	+ '"> ' + '</td> ' + '</tr> '
									+ '<input type="hidden"  id="opddrid'+ r.lstDoctorDto[g].doctor_ID + '" value="' + r.lstDoctorDto[g].doctor_ID + '"> ';
								}								
							}
						}
					}
					
					test="";
				htm = htm + '</table> ' + '</div> </td> '

				+ "<td class='numeric col-md-1'>"
				+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView"
				+ cnt
				+ "' onClick=sendTODoc("
				+ r.listOpdQueManagmentViewDto[i].patientId
				+ ","
				+ cnt
				+ ",'send',"
				+d_id+") /></td> "

					+ "<td class='numeric '>"
				+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
				+ r.listOpdQueManagmentViewDto[i].patientId
				+ ","
				+ cnt
				+ ") /></td> "
					 
				+ '<td class="col-md-1 center" style="" >'
				+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToBill( '
				+ r.listOpdQueManagmentViewDto[i].treatmentId
				+ ')" type="button"  ></button>' + '</td>'
				
				+'<td class="col-md-1" style="padding-top: 14px;" id="divCD'+cnt+'">'
				+ '<button data-toggle="tooltip" data-placement="left" title="Cancel" class="btn btn-xs btn-warning" style="font-size: 7px;margin-right: 2%;width: 49%;" id="btnCancel'+cnt+'" onClick=cancelSendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"cancel",'+d_id+') disabled="disabled"> <i class="fa fa-times"></i></button>'
				+ '<button data-toggle="tooltip" data-placement="left" title="Check up done" class="btn btn-xs btn-success" style="font-size: 7px;width: 49%;" id="btnDone'+cnt+'" onClick=sendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"out",'+r.lstDoctorDto[i].doctor_ID+') disabled="disabled"> <i class="fa fa-check"></i></button>&nbsp;'
				+ "<button data-toggle='tooltip' data-placement='left' title='Change Consultation Doctor' class='btn btn-xs btn-info' style='font-size: 7px;' id='btnChangeConsultation' onClick=setPatientId("+r.listOpdQueManagmentViewDto[i].patientId+","+r.listOpdQueManagmentViewDto[i].treatmentId+") ><i class='fa fa-stethoscope fa-fw'></i></button>"
				+ '</td>'
				+ '</tr>';

		count++;
		cnt++;
		}else{
			htm = htm
			+ ' <td class=" " style="padding:5px"> '
			+ ' <div id="" > '
			+ ' <table > ' + '<tr> ' + '<th width="505Px">  </th> '
			+ ' <th width="505x"> </th>' + '</tr>';

				for ( var k in array) {
					
				for ( var g = 0; g < r.lstDoctorDto.length; g++) {
					
				if (array[k] == r.lstDoctorDto[g].doctor_ID) {
					 d_id=r.lstDoctorDto[g].doctor_ID;
		htm = htm + '<tr><td width="70%">' + r.lstDoctorDto[g].doc_name
					+ '</td>' + '<td> <input type="radio" style="display:none" name="drname'+i+'"  value="'+r.lstDoctorDto[g].doctor_ID+'"checked="checked"> ' + '</td> '
					+ '</tr> '
					+ '<input type="hidden"  id="opddrid'+r.lstDoctorDto[g].doctor_ID+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ';
								}
							}
						}
				test="";
		htm = htm + '</table> ' + '</div> </td> '
		

		+ "<td class='numeric col-md-1-1'>"
		+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView"
		+ count
		+ "' onClick=sendTODoc("
		+ r.listOpdQueManagmentViewDto[i].patientId
		+ ","
		+ cnt
		+ ",'send',"
		+d_id+") /></td> "

			+ "<td class='numeric '>"
		+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
		+ r.listOpdQueManagmentViewDto[i].patientId
		+ ","
		+ cnt
		+ ","
		+ r.listOpdQueManagmentViewDto[i].treatmentId 
		+ ") /></td> "
			 
		+ '<td class="col-md-1" style="height: 21.5px;" >'
		+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToBill( '
		+ r.listOpdQueManagmentViewDto[i].treatmentId
		+ ')" type="button"  ></button>' + '</td>'
		+'<td class="col-md-1" style="height: 21.5px;padding-top: 14px;" id="divCD'+cnt+'">'
		+ '<button data-toggle="tooltip" data-placement="left" title="Cancel" class="btn btn-xs btn-warning" style="font-size: 7px;margin-right: 2%;width: 49%;" id="btnCancel'+cnt+'" onClick=cancelSendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"cancel",'+d_id+') disabled="disabled"> <i class="fa fa-times"></i></button>'
		+ '<button data-toggle="tooltip" data-placement="left" title="Check up done" class="btn btn-xs btn-success" style="font-size: 7px;width: 49%;" id="btnDone'+cnt+'" onClick=sendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"out",'+d_id+') disabled="disabled"> <i class="fa fa-check"></i></button>&nbsp;'
		+ "<button data-toggle='tooltip' data-placement='left' title='Change Consultation Doctor' class='btn btn-xs btn-info' style='font-size: 7px;' id='btnChangeConsultation' onClick=setPatientId("+r.listOpdQueManagmentViewDto[i].patientId+","+r.listOpdQueManagmentViewDto[i].treatmentId+") ><i class='fa fa-stethoscope fa-fw'></i></button>"
		+ '</td>'
		+ '</tr>';

count++;
cnt++;
test="";
		}
			 
 	}

//	$("#container12").html(htm);
	
	$('#myTable').append(htm);
	

	for ( var i = 0; i < r.listOpdQueManagmentViewDto.length; i++) {
		
		
		var qStatus=r.listOpdQueManagmentViewDto[i].queue_status;
		if(qStatus!=null){
		//if(qStatus.contains("in"))
		if(/in/.test(qStatus)){
			$('#btnView' + i).addClass('btn btn-xs btn-primary');
			$('#btnView' + i).css({
				'width' : '80%',
				'border-radius' : '5px',
				'margin-top' : '3px'
			});
			$('#btnView' + i).attr("disabled","disabled");
			$('#btnView' + i).removeClass("editUserAccess");
			
			$('#btnCancel' + i).removeAttr("disabled");
			$('#btnDone' + i).removeAttr("disabled");
		}
		}
	/*if(r.listOpdQueManagmentViewDto[i].queue_status=="in"){
		$('#btnView' + i).addClass('btn btn-xs btn-primary');
		$('#btnView' + i).css({
			'width' : '80%',
			'border-radius' : '5px',
			'margin-top' : '3px'
		});
		$('#btnView' + i).attr("disabled","disabled");
		$('#btnView' + i).removeClass("editUserAccess");
		
		$('#btnCancel' + i).removeAttr("disabled");
		$('#btnDone' + i).removeAttr("disabled");
	}*/
	}

}




/*******************************************************************************
 * @author Sagar Kadam
 * @date 12_July_2017
 * @Code Template for fetching Patient data.
 ******************************************************************************/
//Modify by Laxman on 29-Dec-2017.
function setTempPatientForOPDque1(r) {
	var d_id="";
	var htm = '';
	var count = 0;
	var dept = "";
	dept = "OPD";
	var cnt=0;
	var test="";
	
	
	//alert(r.listOpdQueManagmentViewDto.length);
		
	/*var len = r.listEhatBillPrefix.length;		
	var prefix="";
	var middle="";
	var sufix="";
	for(var n=0;n<len;n++){
	
  		var lst = r.listEhatBillPrefix[n];
  		// For Patient Id  		
  		if(lst.depId==4){
  			
  			prefix=lst.billPrefix;
  			middle=lst.billMiddle;
  			sufix=lst.billSuffix;  			  					  			
  		}
  		// For Patient Id  			
  	}*/
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	
	//alert(r.listOpdQueManagmentViewDto[0].invoiceCountt);
	
	
	
	for ( var i = 0; i < r.listOpdQueManagmentViewDto.length; i++) {
		var strVale = r.listOpdQueManagmentViewDto[i].doctorId;
		var array = strVale.split(",");
		
		$("#invcount").val(r.listOpdQueManagmentViewDto[i].invoiceCountt);
		//To generate Tooltip
		for ( var k in array) {
		for ( var g = 0; g < r.lstDoctorDto.length; g++) {
			if (array[k] == r.lstDoctorDto[g].doctor_ID) {
			test=test+" "+r.lstDoctorDto[g].doc_name;
			}
		}
		}
		var patId= patPrefix + patMiddle + r.listOpdQueManagmentViewDto[i].patientId + patSufix; 	
		
  		var datetime= new Date(r.listOpdQueManagmentViewDto[i].createdDateTime).toLocaleString();
 		htm = htm   + '<tr>'
			 
					+ '<td  class="" id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (i + 1)
					+ ' <span class="tiptipClass" title="your tooltip text here"> </td>'

					+ '<td  class="col-md-2" id="name '
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].patientName) + ' </td>'

					/*+ '<td class="col-md-1" id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (patId) + '</td>'*/
					
					+ '<td class="col-md-1" id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].centerPatientId) + '</td>'
					

					+ '<td class="col-md-1" id="mobile'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].mobile) + ' </td>'

					+ '<td class="" id="AppDate'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (datetime)
					+ ' </td>'
					//Added by Laxman on 28-Dec-2017
					+ '<td class="col-md-1" id="tokanNo'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' 
					+ (r.listOpdQueManagmentViewDto[i].tokenno)
					+ ' </td>'
						
					+ '<td id="toptip"  data-toggle="tooltip" data-placement="top" title="'+test+'" animation: true class="col-md-2" id="token'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].opdipdno) + ' </td>'
					
					 
				
 					/*+'<td class="col-md-1-1 center" id="departmentId'
					+ r.listOpdQueManagmentViewDto[i].patientId
					+ '">'
					+ (dept)
					+ ' </td>'*/;
 			
		if(array.length>1){
		htm = htm
					+ '<td class="col-md-2" style="padding:5px"><button style="font-size:10px" onclick="showDoctors('+i+');">'
					+ ' Show Doctors <i  style="font-size:10px;color:SteelBlue ;"  id="shBillView'+i+'" class="fa fa-chevron-circle-down" ></i></button>  <div id="'+i+'" class="box border" style="display:none;overflow-y: scroll;padding:5px;"> '
					+ ' <table > ' + '<tr> ' + '<th width="505Px"> Doctor Name  </th> '
					+ ' <th> Select   </th>' + '</tr>';

					for ( var k in array) {	

						for ( var g = 0; g < r.lstDoctorDto.length; g++) {
		
							if (array[k] == r.lstDoctorDto[g].doctor_ID) {
								d_id = r.lstDoctorDto[g].doctor_ID;
															
								if(d_id == r.listOpdQueManagmentViewDto[i].inQueueDocId){
									
									htm = htm + '<tr><td>' + r.lstDoctorDto[g].doc_name	+ '</td>'
									+ '<td> <input type="radio" checked name="drname' + cnt	+ '" value="' + r.lstDoctorDto[g].doctor_ID	+ '"> ' + '</td> ' + '</tr> '
									+ '<input type="hidden"  id="opddrid'+ r.lstDoctorDto[g].doctor_ID + '" value="' + r.lstDoctorDto[g].doctor_ID + '"> ';
								}else{
									
									htm = htm + '<tr><td>' + r.lstDoctorDto[g].doc_name	+ '</td>'
									+ '<td> <input type="radio" name="drname' + cnt	+ '" value="' + r.lstDoctorDto[g].doctor_ID	+ '"> ' + '</td> ' + '</tr> '
									+ '<input type="hidden"  id="opddrid'+ r.lstDoctorDto[g].doctor_ID + '" value="' + r.lstDoctorDto[g].doctor_ID + '"> ';
								}								
							}
						}
					}
					
					test="";
				htm = htm + '</table> ' + '</div> </td> '

				+ "<td class='numeric col-md-1'>"
				+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView"
				+ cnt
				+ "' onClick=sendTODoc("
				+ r.listOpdQueManagmentViewDto[i].patientId
				+ ","
				+ cnt
				+ ",'send',"
				+d_id+") /></td> "

					+ "<td class='numeric '>"
				+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
				+ r.listOpdQueManagmentViewDto[i].patientId
				+ ","
				+ cnt
				+ ") /></td> "
					 
				+ '<td class="col-md-1 center" style="" >'
				+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToBill('
				+ r.listOpdQueManagmentViewDto[i].treatmentId
				+ ')" type="button"  ></button>' + '</td>'
				
				+'<td class="col-md-1" style="padding-top: 14px;" id="divCD'+cnt+'">'
				+ '<button data-toggle="tooltip" data-placement="left" title="Cancel" class="btn btn-xs btn-warning" style="font-size: 7px;margin-right: 2%;width: 49%;" id="btnCancel'+cnt+'" onClick=cancelSendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"cancel",'+d_id+') disabled="disabled"> <i class="fa fa-times"></i></button>'
/*				+ '<button data-toggle="tooltip" data-placement="left" title="Check up done" class="btn btn-xs btn-success" style="font-size: 7px;width: 49%;" id="btnDone'+cnt+'" onClick=sendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"out",'+r.lstDoctorDto[i].doctor_ID+') disabled="disabled"> <i class="fa fa-check"></i></button>&nbsp;'
*/
				+ '<button data-toggle="tooltip" data-placement="left" title="Check up done" class="btn btn-xs btn-success" style="font-size: 7px;width: 49%;" id="btnDone'+cnt+'" onClick=sendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"out",'+d_id+') disabled="disabled"> <i class="fa fa-check"></i></button>&nbsp;'
	
				+ "<button data-toggle='tooltip' data-placement='left' title='Change Consultation Doctor' class='btn btn-xs btn-info' style='font-size: 7px;' id='btnChangeConsultation' onClick=setPatientId("+r.listOpdQueManagmentViewDto[i].patientId+","+r.listOpdQueManagmentViewDto[i].treatmentId+") ><i class='fa fa-stethoscope fa-fw'></i></button>"
				+ '</td>'
				+ '</tr>';

		count++;
		cnt++;
		}else{
			htm = htm
			+ ' <td class=" " style="padding:5px"> '
			+ ' <div id="" > '
			+ ' <table > ' + '<tr> ' + '<th width="505Px">  </th> '
			+ ' <th width="505x"> </th>' + '</tr>';

				for ( var k in array) {
					
				for ( var g = 0; g < r.lstDoctorDto.length; g++) {
					
				if (array[k] == r.lstDoctorDto[g].doctor_ID) {
					 d_id=r.lstDoctorDto[g].doctor_ID;
		htm = htm + '<tr><td width="70%">' + r.lstDoctorDto[g].doc_name
					+ '</td>' + '<td> <input type="radio" style="display:none" name="drname'+i+'"  value="'+r.lstDoctorDto[g].doctor_ID+'"checked="checked"> ' + '</td> '
					+ '</tr> '
					+ '<input type="hidden"  id="opddrid'+r.lstDoctorDto[g].doctor_ID+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ';
								}
							}
						}
				test="";
		htm = htm + '</table> ' + '</div> </td> '
		

		+ "<td class='numeric col-md-1-1'>"
		+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView"
		+ count
		+ "' onClick=sendTODoc("
		+ r.listOpdQueManagmentViewDto[i].patientId
		+ ","
		+ cnt
		+ ",'send',"
		+d_id+") /></td> "

			+ "<td class='numeric '>"
		+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
		+ r.listOpdQueManagmentViewDto[i].patientId
		+ ","
		+ cnt
		+ ","
		+ r.listOpdQueManagmentViewDto[i].treatmentId 
		+ ") /></td> "
			 
		+ '<td class="col-md-1" style="height: 21.5px;" >'
		+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToBill( '
		+ r.listOpdQueManagmentViewDto[i].treatmentId
		+ ')" type="button"  ></button>' + '</td>'
		+'<td class="col-md-1" style="height: 21.5px;padding-top: 14px;" id="divCD'+cnt+'">'
		+ '<button data-toggle="tooltip" data-placement="left" title="Cancel" class="btn btn-xs btn-warning" style="font-size: 7px;margin-right: 2%;width: 49%;" id="btnCancel'+cnt+'" onClick=cancelSendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"cancel",'+d_id+') disabled="disabled"> <i class="fa fa-times"></i></button>'
		+ '<button data-toggle="tooltip" data-placement="left" title="Check up done" class="btn btn-xs btn-success" style="font-size: 7px;width: 49%;" id="btnDone'+cnt+'" onClick=sendTODoc('+r.listOpdQueManagmentViewDto[i].patientId+','+cnt+',"out",'+d_id+') disabled="disabled"> <i class="fa fa-check"></i></button>&nbsp;'
		+ "<button data-toggle='tooltip' data-placement='left' title='Change Consultation Doctor' class='btn btn-xs btn-info' style='font-size: 7px;' id='btnChangeConsultation' onClick=setPatientId("+r.listOpdQueManagmentViewDto[i].patientId+","+r.listOpdQueManagmentViewDto[i].treatmentId+") ><i class='fa fa-stethoscope fa-fw'></i></button>"
		+ '</td>'
		+ '</tr>';

count++;
cnt++;
test="";
		}
			 
 	}

	$("#container12").html(htm);
	

	for ( var i = 0; i < r.listOpdQueManagmentViewDto.length; i++) {
		
		
		var qStatus=r.listOpdQueManagmentViewDto[i].queue_status;
		if(qStatus!=null){
		//if(qStatus.contains("in"))
		if(/in/.test(qStatus)){
			$('#btnView' + i).addClass('btn btn-xs btn-primary');
			$('#btnView' + i).css({
				'width' : '80%',
				'border-radius' : '5px',
				'margin-top' : '3px'
			});
			$('#btnView' + i).attr("disabled","disabled");
			$('#btnView' + i).removeClass("editUserAccess");
			
			$('#btnCancel' + i).removeAttr("disabled");
			$('#btnDone' + i).removeAttr("disabled");
		}
		}
	/*if(r.listOpdQueManagmentViewDto[i].queue_status=="in"){
		$('#btnView' + i).addClass('btn btn-xs btn-primary');
		$('#btnView' + i).css({
			'width' : '80%',
			'border-radius' : '5px',
			'margin-top' : '3px'
		});
		$('#btnView' + i).attr("disabled","disabled");
		$('#btnView' + i).removeClass("editUserAccess");
		
		$('#btnCancel' + i).removeAttr("disabled");
		$('#btnDone' + i).removeAttr("disabled");
	}*/
	}

}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});


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
 
/*******************************************************************************
 * @author Sagar kadam
 * @date 14-july_2017
 * @Code for autosuggestion 
 ******************************************************************************/
//Modify by Laxman on 15-Jan-2018 for OPDQueue Patients and Queue Management.
function AutosuggestionForOPDque1(inputId,callfrom) {
	
	var deptId=1;
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		
	var sridname = $("#sridname").val();
      if(sridname=='N'){
    	  usertype=sridname; 
    	  letter=$("#byName").val();
    	  
      }else{
    	  letter=$("#byId").val();
    	  usertype=sridname; 
    	  
      }
	}
	
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
  ///   inputs.push('callfrom=' + callfrom);
        
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/registration/getAllOpdRecordsDeptwiseWithAuto",
	success : function(r) {
		//setTempPatientRecords(r);
		$("#byId").val("");
		$("#OPDPatientList").html(r);
		 
			setTempPatientForOPDque1(r);
			AllPatientRecordsAutosuggestioTemp(r,inputId);
		
	}
});}


/************
* @author	: Sagar Kadam
* @date		: 14-july-2017
* @codeFor	: Autosuggestion Template for patient Records
 ************/
//Modify by Laxman on 12-Jan-2018 for OPDQueue Patients and Queue Management.
function  AutosuggestionForOPDque1Temp(response, id) {
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
			 
 			AutosuggestionForOPDque1(id,'search');
 			//$("#mrnNo").val(101);
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listOpdQueManagmentViewDto.length);
			var result;
			if (!data || data.listOpdQueManagmentViewDto.length === 0 || !data.listOpdQueManagmentViewDto
					|| data.listOpdQueManagmentViewDto.length === 0) {
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
				result = data.listOpdQueManagmentViewDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}


/*******************************************************************************
 * @author : Sagar Kadam
 * @date : 9-jun-2017
 * @reason : to get doctor name from db
 ******************************************************************************/ 
function getDoctorname22(drid) {
	//alert("hi");
	var strVale = drid;
	
	var strArr = strVale.split(',');
	for(var i=0; i<strArr.length; i++) 
	{ strArr[i] = parseInt(strArr[i], 10);
	
	drid=strArr[i];}
	 
	var docName="";
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
			 
			$("#dynamicItem2").select2(r.lstDoctorDto[0].doc_name);
			 
		}
	});
	return docName;
}
 
function clerpi(){
	
	$("#byId").val("");
	$("#sridname").val("N");
	
}
function clerpn(){
	
	$("#byName").val("");
	$("#sridname").val("Y");
	
}
function accurate(callfrom){
	
	if($("#byid").is(':checked')){
		
		$("#byName").val("");
		$('#byName').attr('onkeypress','return validateNumOnly(event)');
		$("#byName").attr("placeholder", "Patient Id");
		$("#inputFromDate").val("");
		$("#inputToDate").val("");
	}else{
		$("#byName").val("");
		$('#byName').removeAttr('onkeypress','return validateNumOnly(event)');
		
		if(callfrom=='registration')
		{
			//$('#byName').attr('onkeyup','setAutoCompleteMarkVisit(this.id,"auto")');
			//$('#byName').removeAttr('onkeyup','setAutoCompleteMarkVisit(this.id,"auto")');
			$('#byName').removeAttr('onkeyup','setAutoCompleteMarkVisitForList(this.id,"auto")');
			
		}else
			{
				$('#byName').attr('onkeyup','setAutoCompleteBlockPatsList(this.id,"auto")');
			//$('#byName').removeAttr('onkeyup','setAutoCompleteBlockPatsList(this.id,"auto")');
			}
		$("#byName").attr("placeholder", "Name, Mobileno , Adharno");
		$('#byName').attr('onkeyup','setAutoCompleteMarkVisitForList(this.id,"auto")');
	}
	
	if($("#byid").is(':checked')){
		$("#byName1").val("");
		$('#byName1').attr('onkeypress','return validateNumOnly(event)');
		$('#byName').removeAttr('onkeyup','setAutoCompleteMarkVisit(this.id,"auto")');
		$("#byName1").attr("placeholder", "Patient Id");
	}else{
		$("#byName1").val("");
		$('#byName1').removeAttr('onkeypress','return validateNumOnly(event)');
		$('#byName1').attr('onkeyup','autosuggesstionForOtherRecords(this.id,auto)');
		$("#byName1").attr("placeholder", "Patient Name");
	}
	
}






/*******************************************************************************
 * @author Kishor Lokhande
 * @date 29_March_2018
 * @Code Get all Patient records.
 ******************************************************************************/
//Modify by Laxman on 15-Jan-2018.
function getAllPatientForQuotation(r) {
	// alert("in js");		
	var deptId = -11;
	 $("#depId").val(deptId);
	//alert(deptId);
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"deptId" : deptId
		},
		
		url : "ehat/registration/getAllRecordsForOPDqueue1",
		success : function(r) {
			
			$("#appointedpatientDiv").html(r);
			setTempPatientForOPDqueForQuotation(r);

			 
			 
		}
	});
}
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 29_March_2018
 * @Code Template for fetching Patient data.
 ******************************************************************************/
function setTempPatientForOPDqueForQuotation(r) {
	var d_id="";
	var htm = '';
	var count = 0;
	var dept = "";
	dept = "OPD";
	var cnt=0;
	var test="";
		
	
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	
	for ( var i = 0; i < r.listOpdQueManagmentViewDto.length; i++) {
		var strVale = r.listOpdQueManagmentViewDto[i].doctorId;
		var array = strVale.split(",");
		//To generate Tooltip
		for ( var k in array) {
		for ( var g = 0; g < r.lstDoctorDto.length; g++) {
			if (array[k] == r.lstDoctorDto[g].doctor_ID) {
			test=test+" "+r.lstDoctorDto[g].doc_name;
			}
		}
		}
		var patId= patPrefix + patMiddle + r.listOpdQueManagmentViewDto[i].patientId + patSufix; 	
		
  		var datetime= new Date(r.listOpdQueManagmentViewDto[i].createdDateTime).toLocaleString();
 		htm = htm   + '<tr>'
			 
					+ '<td  class="col-md-1-1 center"  id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (i + 1)
					+ ' <span class="tiptipClass" title="your tooltip text here"> </td>'

					+ '<td  class="col-md-2-1 " id="name '
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].patientName) + ' </td>'

					+ '<td class="col-md-1-1 center" id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (patId) + '</td>'

					+ '<td class="col-md-1-1 center" id="mobile'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].mobile) + ' </td>'

					+ '<td class="col-md-2-1 center" id="AppDate'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (datetime)
					+ ' </td>'
					
						
					+ '<td id="toptip"  data-toggle="tooltip" data-placement="top" title="'+test+'" animation: true class="col-md-2-1 center" id="token'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].opdipdno) + ' </td>'	;
 			
		if(array.length>1){
		htm = htm
					+ '<td class="col-md-2-1" style="padding:5px"><button style="font-size:10px" onclick="showDoctors('+i+');">'
					+ ' Show Doctors <i  style="font-size:10px;color:SteelBlue ;"  id="shBillView'+i+'" class="fa fa-chevron-circle-down" ></i></button>  <div id="'+i+'" class="box border" style="display:none;overflow-y: scroll;padding:5px;"> '
					+ ' <table > ' + '<tr> ' + '<th width="505Px"> Doctor Name  </th> '
					+ ' <th> Select   </th>' + '</tr>';

						for ( var k in array) {
							
						for ( var g = 0; g < r.lstDoctorDto.length; g++) {
							
						if (array[k] == r.lstDoctorDto[g].doctor_ID) {
							d_id=r.lstDoctorDto[g].doctor_ID;
				htm = htm + '<tr><td>' + r.lstDoctorDto[g].doc_name
							+ '</td>' + '<td> <input type="radio" name="drname'+cnt+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ' + '</td> '
							+ '</tr> '
							+ '<input type="hidden"  id="opddrid'+r.lstDoctorDto[g].doctor_ID+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ';
										}
									}
								}
						test="";
				htm = htm + '</table> ' + '</div> </td> '

				
					 
				+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
				+ '<input id="btnBill2" style="font-size: 10px;" value="Estimate" onclick="sendingToEstimate( '
				+ r.listOpdQueManagmentViewDto[i].treatmentId +' ,'+  r.listOpdQueManagmentViewDto[i].patientId+ ')" type="button"  ></button>' + '</td>'
				
				+ '</tr>';

		count++;
		cnt++;
		}else{
			htm = htm
			+ ' <td class=" " style="padding:5px"> '
			+ ' <div id="" > '
			+ ' <table > ' + '<tr> ' + '<th width="505Px">  </th> '
			+ ' <th width="505x"> </th>' + '</tr>';

				for ( var k in array) {
					
				for ( var g = 0; g < r.lstDoctorDto.length; g++) {
					
				if (array[k] == r.lstDoctorDto[g].doctor_ID) {
					 d_id=r.lstDoctorDto[g].doctor_ID;
		htm = htm + '<tr><td width="70%">' + r.lstDoctorDto[g].doc_name
					+ '</td>' + '<td> <input type="radio" style="display:none" name="drname'+i+'"  value="'+r.lstDoctorDto[g].doctor_ID+'"checked="checked"> ' + '</td> '
					+ '</tr> '
					+ '<input type="hidden"  id="opddrid'+r.lstDoctorDto[g].doctor_ID+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ';
								}
							}
						}
				test="";
		htm = htm + '</table> ' + '</div> </td> '
		

		
			 
		+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
		+ '<input id="btnBill2" style="font-size: 10px;" value="Estimate" onclick="sendingToEstimate( '
		+ r.listOpdQueManagmentViewDto[i].treatmentId +' ,'+  r.listOpdQueManagmentViewDto[i].patientId+ ')" type="button"  ></button>' + '</td>'
		
		+ '</tr>';

count++;
cnt++;
test="";
		}
			 
 	}

	$("#container12").html(htm);
	

	for ( var i = 0; i < r.listOpdQueManagmentViewDto.length; i++) {
		
		
		var qStatus=r.listOpdQueManagmentViewDto[i].queue_status;
		if(qStatus!=null){
		if(/in/.test(qStatus)){
			$('#btnView' + i).addClass('btn btn-xs btn-primary');
			$('#btnView' + i).css({
				'width' : '80%',
				'border-radius' : '5px',
				'margin-top' : '3px'
			});
			$('#btnView' + i).attr("disabled","disabled");
			$('#btnView' + i).removeClass("editUserAccess");
			
			$('#btnCancel' + i).removeAttr("disabled");
			$('#btnDone' + i).removeAttr("disabled");
		}
		}

	}

}

function sendingToEstimate(tId,pId) {
	
	//window.location = "ehat_quotation_againNew.jsp?" + "treatmentId=" + tId;
	
	window.location.href = "ehat_quotation_againNew.jsp?" + "treatmentId="
	+ encodeURIComponent(tId)+ "&pId=" + encodeURIComponent(pId);

}


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 29-March_2018
 * @Code for autosuggestion quotaion
 ******************************************************************************/
//Modify by Laxman on 15-Jan-2018 for OPDQueue Patients and Queue Management.
function AutosuggestionForQuotationque1(inputId,callfrom) {
	
	var deptId= -11;
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		
	var sridname = $("#sridname").val();
      if(sridname=='N'){
    	  usertype=sridname; 
    	  letter=$("#byName").val();
    	  
      }else{
    	  letter=$("#byId").val();
    	  usertype=sridname; 
    	  
      }
	}
	
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
  ///   inputs.push('callfrom=' + callfrom);
        
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/registration/getAllOpdRecordsDeptwiseWithAuto",
	success : function(r) {
		//setTempPatientRecords(r);

		$("#OPDPatientList").html(r);
		 
		setTempPatientForQuotatoinque1(r);
			//AllPatientRecordsAutosuggestioTemp(r,inputId);
		
	}
});}

/*******************************************************************************
 * @author Sagar Kadam
 * @date 12_July_2017
 * @Code Template for fetching Patient data.
 ******************************************************************************/
//Modify by Laxman on 29-Dec-2017.
function setTempPatientForQuotatoinque1(r) {
	var d_id="";
	var htm = '';
	var count = 0;
	var dept = "";
	dept = "OPD";
	var cnt=0;
	var test="";
		

	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	
	for ( var i = 0; i < r.listOpdQueManagmentViewDto.length; i++) {
		var strVale = r.listOpdQueManagmentViewDto[i].doctorId;
		var array = strVale.split(",");
		//To generate Tooltip
		for ( var k in array) {
		for ( var g = 0; g < r.lstDoctorDto.length; g++) {
			if (array[k] == r.lstDoctorDto[g].doctor_ID) {
			test=test+" "+r.lstDoctorDto[g].doc_name;
			}
		}
		}
		var patId= patPrefix + patMiddle + r.listOpdQueManagmentViewDto[i].patientId + patSufix; 	
		
  		var datetime= new Date(r.listOpdQueManagmentViewDto[i].createdDateTime).toLocaleString();
 		htm = htm   + '<tr>'
			 
					+ '<td  class="col-md-1-1 center"  id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (i + 1)
					+ ' <span class="tiptipClass" title="your tooltip text here"> </td>'

					+ '<td  class="col-md-2-1 center" id="name '
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].patientName) + ' </td>'

					+ '<td class="col-md-1-1 center" id="patientId'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (patId) + '</td>'

					+ '<td class="col-md-1-1 center" id="mobile'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].mobile) + ' </td>'

					+ '<td class="col-md-2-1 center" id="AppDate'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (datetime)
					+ ' </td>'
					
						
					+ '<td id="toptip"  data-toggle="tooltip" data-placement="top" title="'+test+'" animation: true class="col-md-2-1 center" id="token'
					+ r.listOpdQueManagmentViewDto[i].patientId + '">'
					+ (r.listOpdQueManagmentViewDto[i].opdipdno) + ' </td>'
 
					 
					 
 					/*+'<td class="col-md-1-1 center" id="departmentId'
					+ r.listOpdQueManagmentViewDto[i].patientId
					+ '">'
					+ (dept)
					+ ' </td>'*/;
 			
		if(array.length>1){
		htm = htm
					+ '<td class="col-md-2-1" style="padding:5px"><button style="font-size:10px" onclick="showDoctors('+i+');">'
					+ ' Show Doctors <i  style="font-size:10px;color:SteelBlue ;"  id="shBillView'+i+'" class="fa fa-chevron-circle-down" ></i></button>  <div id="'+i+'" class="box border" style="display:none;overflow-y: scroll;padding:5px;"> '
					+ ' <table > ' + '<tr> ' + '<th width="505Px"> Doctor Name  </th> '
					+ ' <th> Select   </th>' + '</tr>';

						for ( var k in array) {
							
						for ( var g = 0; g < r.lstDoctorDto.length; g++) {
							
						if (array[k] == r.lstDoctorDto[g].doctor_ID) {
							d_id=r.lstDoctorDto[g].doctor_ID;
				htm = htm + '<tr><td>' + r.lstDoctorDto[g].doc_name
							+ '</td>' + '<td> <input type="radio" name="drname'+cnt+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ' + '</td> '
							+ '</tr> '
							+ '<input type="hidden"  id="opddrid'+r.lstDoctorDto[g].doctor_ID+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ';
										}
									}
								}
						test="";
				htm = htm + '</table> ' + '</div> </td> '

			
					 
				+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
				+ '<input id="btnBill2" style="font-size: 10px;" value="Estimate" onclick="sendingToEstimate( '
				+ r.listOpdQueManagmentViewDto[i].treatmentId
				+ ')" type="button"  ></button>' + '</td>'
				
				

		count++;
		cnt++;
		}else{
			htm = htm
			+ ' <td class=" " style="padding:5px"> '
			+ ' <div id="" > '
			+ ' <table > ' + '<tr> ' + '<th width="505Px">  </th> '
			+ ' <th width="505x"> </th>' + '</tr>';

				for ( var k in array) {
					
				for ( var g = 0; g < r.lstDoctorDto.length; g++) {
					
				if (array[k] == r.lstDoctorDto[g].doctor_ID) {
					 d_id=r.lstDoctorDto[g].doctor_ID;
		htm = htm + '<tr><td width="70%">' + r.lstDoctorDto[g].doc_name
					+ '</td>' + '<td> <input type="radio" style="display:none" name="drname'+i+'"  value="'+r.lstDoctorDto[g].doctor_ID+'"checked="checked"> ' + '</td> '
					+ '</tr> '
					+ '<input type="hidden"  id="opddrid'+r.lstDoctorDto[g].doctor_ID+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ';
								}
							}
						}
				test="";
		htm = htm + '</table> ' + '</div> </td> '
		

		
			 
		+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
		+ '<input id="btnBill2" style="font-size: 10px;" value="Estimate" onclick="sendingToEstimate( '
		+ r.listOpdQueManagmentViewDto[i].treatmentId
		+ ')" type="button"  ></button>' + '</td>'
	

count++;
cnt++;
test="";
		}
			 
 	}

	$("#container12").html(htm);
}


function getPatientList(){
	
	var len=$("#patListLen").val();
	
	$("#patPhotoDiv").hide();
	$("#getPatDiv").removeClass("col-md-9");
	$("#getPatDiv").addClass("col-md-12");
	
	$("#headerforsave").show();
	$("#appointHeader").hide();
}

function getApptList(){
	
	$("#patPhotoDiv").hide();
	$("#getPatDiv").removeClass("col-md-9");
	$("#getPatDiv").addClass("col-md-12");
	
	$("#headerforsave").hide();
	$("#appointHeader").show();	
	
	setAppointmentType('New');
	getAppointedListOfPatient('New');
}

function getRegUi(){
	
	$("#patPhotoDiv").show();
	$("#getPatDiv").removeClass("col-md-12");
	$("#getPatDiv").addClass("col-md-9");
	
	$("#headerforsave").show();
	$("#appointHeader").hide();
	
	$("#personalDetails").removeClass("col-md-5");
	$("#personalDetails").addClass("col-md-7");
	
	$("#consultDiv").show();
	$("#calander1Div").hide();
	
	/*$("#addessDiv").show();
	$("#appointDiv").hide();*/	
		
	$("#appointDtTab").hide();
	$("#appointChangeDtTab").hide();
	$("#appointDtTab").removeClass("active");
	$("#appointChangeDtTab").removeClass("active");
	$("#resAddressTab").addClass("active");
	$("#tab_2_1").hide();
	$("#tab_2_1_change").hide();	
	$("#tab_2_1").removeClass("fade in active");
	$("#tab_2_1_change").removeClass("fade in active");
	$("#tab_2_2").addClass("fade in active");
	
	$("#personalDetails2").show();
	
	$("#Patientid").prop("checked",true);
	
	var uri = window.location.toString();
	if (uri.indexOf("?") > 0) {
	    var clean_uri = uri.substring(0, uri.indexOf("?"));
	    window.history.replaceState({}, document.title, clean_uri);
	}
	
	$("#healthIdForget").hide();
	$("#forgetMobileNumber").show();
	$("#forgetAadharNumber").hide();
}

function setAppointCal(callFrom){
	
	$("#patPhotoDiv").hide();
	
	if(callFrom == "appoint"){
		
		$("#patPhotoDiv").hide();		
	}
		
	$("#getPatDiv").removeClass("col-md-9");
	$("#getPatDiv").addClass("col-md-12");
	
	$("#personalDetails").removeClass("col-md-7");
	$("#personalDetails").addClass("col-md-5");	
			
	$("#appointDtTab").show();
	$("#appointChangeDtTab").hide();
	$("#tab_2_1").show();
	$("#tab_2_1_change").hide();
	$("#appointDtTab").addClass("active");
	$("#resAddressTab").removeClass("active");
	$("#tab_2_1").addClass("fade in active");
	$("#tab_2_2").removeClass("fade in active");
	
	/*$("#addessDiv").hide();
	$("#appointDiv").show();*/
	
	$("#consultDiv").hide();
	$("#calanderDiv").hide();
	$("#calander1Div").show();
		
	$("#personalDetails2").hide();
	
	var todays_date = $("#todays_date").val();	
	$("#idTourDateDetails").val(todays_date);
	$("#idNewAppointment").val(todays_date);
	$("#byName").val("");
	
	//Code for autosuggestion by Amol Saware
	autoCompTableForOPDAppointment("[]","byName");	
	fetchDoctorSpecilizationsForPatientRegistration("scheduler");
	getAppointedListOfPatient();
	getAllPatientRecordsForScheduler(); //added by sagar
	getCountForFollowUpAndReschedule();
	
	changeTabToNew();
	$("#existingPatientDiv").hide();
	$("#queryType").val("update");
	clearValuesNewPatient();
	clearValuesExitPatient();
	setCalenderOnLoad();
}

function setAppointCalOnChange(){
	
	$('a[href="#account"]').click();
	$("#idNewApp").hide();
	$("#idTourApp").show();
	
	$("#patPhotoDiv").hide();
	$("#getPatDiv").removeClass("col-md-9");
	$("#getPatDiv").addClass("col-md-12");
		
	$("#personalDetails").removeClass("col-md-7"); 
	$("#personalDetails").addClass("col-md-5");
	
	/*$("#addessDiv").hide();
	$("#appointDiv").show();*/	
	
	/*$("#deptblock").hide();
	$("#changeAppblock").show();*/
	
	$("#appointDtTab").hide();
	$("#appointChangeDtTab").show();
	$("#tab_2_1").hide();
	$("#tab_2_1_change").show();
	$("#appointChangeDtTab").addClass("active");
	$("#resAddressTab").removeClass("active");	
	$("#tab_2_1_change").addClass("fade in active");
	$("#tab_2_2").removeClass("fade in active");
	
	$("#consultDiv").hide();
	$("#calanderDiv").show();
	
	$("#personalDetails2").hide();
	
	var todays_date = $("#todays_date").val();	
	$("#idTourDateDetails").val(todays_date);
	$("#idNewAppointment").val(todays_date);
	$("#byName").val("");
	fetchDoctorSpecilizationsForPatientRegistration("scheduler");
}

function getRegView(){
	
	$("#patPhotoDiv").show();
	$("#getPatDiv").removeClass("col-md-12");
	$("#getPatDiv").addClass("col-md-9");
	
	$("#headerforsave").show();
	$("#appointHeader").hide();
}


/*******************************************************************************
 * @author Mohd tarique Aalam
 * @date 19_April_2018
 * @Code Autosuggetion
 ******************************************************************************/

function fetchVisitingPatientDateWise() {
	var inputFromDate = $("#inputFromDate").val();
	var inputToDate = $("#inputToDate").val();
	if (inputFromDate == "")
	{
		alert("Enter From Date");
		return false;
	}
	if (inputToDate == "")
	{
		alert("Enter To Date");
		return false;

	}
	
	date1 = new Date(inputFromDate);
	date2 = new Date(inputToDate);
	
	if(date1>date2)
		{
			alert("FromDate is greater than ToDate");
			return false;
		}
	
	if(date2<date1)
	{
		alert(" ToDate is less than FromDate");
		return false;
	}

	var part1 = inputFromDate.split('/');
	inputFromDate = part1[2] + "-" + part1[1] + "-" + part1[0];
	var part2 = inputToDate.split('/');
	inputToDate = part2[2] + "-" + part2[1] + "-" + part2[0];
	

	
	
	var inputs = [];
	inputs.push('inputFromDate=' + encodeURIComponent(inputFromDate));
	inputs.push('inputToDate=' + encodeURIComponent(inputToDate));
	var str = inputs.join('&');

	// alert("hi");

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/markvisit/getMarkVisitListDateWise",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

			alert('error');

		},
		success : function(r) {
			ajaxResponse = r;
			console.log(r);
			setTempMarkVisit(r);
		}
	});
}

// Mohd Tarique Aalam
function PrintBarcodePopUp(pid)
{
	$("#trid").val(pid);
	$("#iPopUp2").show('show');
}

function closePrintBarcodePopUp()
{
	$("#iPopUp2").hide('show');
	$("#noOfBarCode").val("");
	
}




/***********
* @author	: Irfan Khan
* @date	: 10-Oct-2018
* @reason	: fetching all patient details from Patient table
**********/ 

function fetchVisitingPatientForBlockList() {
	
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		url 	: "ehat/markvisit/getListBlockPat",
		cache 	: true,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;	
			
			setTempPatBlockList(r);
		},
		
	});	
}







/************
* @author	: Tarique Alam
* @date		: 05-June-2017
* @codeFor	: Autosuggestion for Markvisit  
 ************/

function setAutoCompleteMarkVisitBlokList(inputId, callfrom) {
    var inputFromDate = $("#inputFromDate").val();
    var inputToDate = $("#inputToDate").val();
    if (callfrom == "auto"){
        $("#inputFromDate").val("");
        $("#inputToDate").val("");
	}

    if (callfrom == "search" && inputFromDate != "" && inputFromDate != null
            && inputFromDate != undefined && inputToDate != ""
                && inputToDate != null && inputToDate != undefined) {
    	fetchBlockPatientDateWise();

         }
    else
    	{
    	var usertype = "";
    	var letter="";
    	if (callfrom ="search") {
    		letter=$("#byName").val();
    		if($("#byid").is(':checked')){
    			
    			usertype="Y";				
    		}else{
    			usertype="N";
    		}
    	}
    	
        var findingName = $("#" + inputId).val();
           var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async 	: true,
            type 	: "POST",
            data 	: str + "&reqType=AJAX",
            url 	: "ehat/markvisit/autoSuggestionMarkVisit",
            /*timeout : 1000 * 60 * 15,*/
            cache 	: true,
            success : function(r) {
            	 
            	
               if(callfrom=="search"){
            	  //fetchVisitingPatient1();
            	   setTempMarkVisitBlockListForOther(r);
            	   //autoCompTableforMarkVisit(r, inputId);    
                }else{
                	//autoCompTableforMarkVisit(r, inputId);
                }
             }
        });
    	}

}




/*******************************************************************************
 * @author Mohd tarique Aalam
 * @date 5_july_2018
 * @Code Autosuggetion
 ******************************************************************************/

function fetchBlockPatientDateWise() {
	var inputFromDate = $("#inputFromDate").val();
	var inputToDate = $("#inputToDate").val();
	if (inputFromDate == "")
	{
		alert("Enter From Date");
		return false;
	}
	if (inputToDate == "")
	{
		alert("Enter To Date");
		return false;

	}
	
	date1 = new Date(inputFromDate);
	date2 = new Date(inputToDate);
	
	if(date1>date2)
		{
			alert("FromDate is greater than ToDate");
			return false;
		}
	
	if(date2<date1)
	{
		alert(" ToDate is less than FromDate");
		return false;
	}

	var part1 = inputFromDate.split('/');
	inputFromDate = part1[2] + "-" + part1[1] + "-" + part1[0];
	var part2 = inputToDate.split('/');
	inputToDate = part2[2] + "-" + part2[1] + "-" + part2[0];
	

	
	
	var inputs = [];
	inputs.push('inputFromDate=' + encodeURIComponent(inputFromDate));
	inputs.push('inputToDate=' + encodeURIComponent(inputToDate));
	var str = inputs.join('&');

	// alert("hi");

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/markvisit/getMarkVisitListDateWise",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

			alert('error');

		},
		success : function(r) {
			ajaxResponse = r;
			console.log(r);
			setTempMarkVisitBlockListForOther(r);
		}
	});
}

/***********
 * @author	: Tarique Alam
 * @date	: 5-july-2018
 * @reason	: Set patient details on other pages
 **********/ 
function setTempMarkVisitBlockListForOther(r) {
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();	 
	
	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-3-1' style='height: 21.5px;padding-right: 40px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
/*			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>View</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='col-md-1-1 center hide' style='height: 21.5px;'><div class='TextFont'>Admission Print</div></th>"
		+ "<th class='col-md-1-1 center hide' style='height: 21.5px;'><div class='TextFont'>Bill History</div></th>"
 		+ "<th class='col-md-1-1 center hide' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Delete</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Mark Visit</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Print Card</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Print Barcodes</div></th>"*/
			+ "<th class='col-md-1-1 center hide' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Common Advance</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Block Patient</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>UnBlock Patient</div></th>"
			//+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Print</div></th>"
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
var index = 1;	
var Mrn= 1010101111;
for ( var i = 0; i < r.lstRegviewDto.length;i++) {
	
	var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
	 var patIdPrefix=patPrefix+patMiddle+r.lstRegviewDto[i].ptId+patSufix;	
	 
	var a="";
	var edit1="";
	

			if (r.lstRegviewDto[i].blockFlag == "T") {
			if (r.lstRegviewDto[i].tFlag == "Y") { // setting dynamic td on ui

				a = a
						+ " class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ "<button id='blockPatMV"
						+ r.lstRegviewDto[i].ptId
						+ "' class='btn btn-xs btn-primary ' data-target='' type='button' data-toggle='modal' value='MARK' disabled='disabled' ><i class='fa fa-times'></i></button>"

			}
			if (r.lstRegviewDto[i].tFlag == "N") // setting dynamic td on ui
			{
				a = a
						+ "class='col-sm-1-1 center'><button id='blockPatMV"
						+ r.lstRegviewDto[i].ptId
						+ "' data-toggle='modal' data-target='#ICDCodePopUp' type='button' onclick='setVisitingPatientDetails1("
						+ r.lstRegviewDto[i].ptId
						+ ",\"mark\")' value='MARK' class='btn btn-xs btn-success ' disabled='disabled'><i class='fa fa-check'></i></button>"
			}
			if (r.lstRegviewDto[i].sponsorchargesSlaveId == ""
					|| r.lstRegviewDto[i].sponsorchargesSlaveId == null
					|| r.lstRegviewDto[i].sponsorchargesSlaveId == undefined
					|| r.lstRegviewDto[i].sponsorchargesSlaveId == 0) {
				edit1 = edit1
						+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ "<button class='btn btn-xs btn-success editUserAccess'  data-target='' data-toggle='modal' value='EDIT' type='button' id='btnEdit"
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

				a = a
						+ " class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ "<button id='blockPatMV"
						+ r.lstRegviewDto[i].ptId
						+ "' class='btn btn-xs btn-primary editUserAccess' data-target='' type='button' data-toggle='modal' value='MARK'  ><i class='fa fa-times'></i></button>"

			}
			if (r.lstRegviewDto[i].tFlag == "N") // setting dynamic td on ui
			{
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
						+ "<button class='btn btn-xs btn-success editUserAccess'  data-target='' data-toggle='modal' value='EDIT' type='button' id='btnEdit"
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
	
	
		htm=htm
		+ "<table class='table table-condensed cf'>"
		+ "<tbody>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.lstRegviewDto[i].patientName+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+datetime+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.lstRegviewDto[i].ptId +"</td>"
		

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
		+ "<td class='col-sm-1-1 center hide' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-primary ' type='button' value='COMMONAD' onclick='printCard("+ r.lstRegviewDto[i].ptId+")'><i class='fa fa-print' class='edit'></button>"
		+ "</td>";
		
		
		if(r.lstRegviewDto[i].blockFlag == "F"){//Patient with one warning = F
	
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"other\")' data-toggle='tooltip' title='1]"+r.lstRegviewDto[i].blockNarration1+" -By("+r.lstRegviewDto[i].blockUserName1+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
			
		}else if(r.lstRegviewDto[i].blockFlag == "S"){//Patient with two warning = S
	
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"other\")' data-toggle='tooltip' title='1]"+r.lstRegviewDto[i].blockNarration1+" -By("+r.lstRegviewDto[i].blockUserName1+")\n2]"+r.lstRegviewDto[i].blockNarration2+" -By("+r.lstRegviewDto[i].blockUserName2+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
			
		}else if(r.lstRegviewDto[i].blockFlag == "T"){//Blocked patient list = T
	
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"other\")' data-toggle='tooltip' title='1]"+r.lstRegviewDto[i].blockNarration1+" -By("+r.lstRegviewDto[i].blockUserName1+")\n2]"+r.lstRegviewDto[i].blockNarration2+" -By("+r.lstRegviewDto[i].blockUserName2+")\n3]"+r.lstRegviewDto[i].blockNarration3+" -By("+r.lstRegviewDto[i].blockUserName3+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
			
		}else{//Active patient = N
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"other\")' ><i class='fa fa-circle-o' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
		}
		
		
		
/*	htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' title='admPrint' type='button'  value='PRINT' onclick='AdmissionPrint("+ r.lstRegviewDto[i].ttId+")'><i class='fa fa-print' class='edit'></button>"  //Added By Pooja
		+ "</td>";*/
		
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
}

//irfan khan 6-oct-2018 search and set block patients
function setAutoCompleteBlockPatsList(inputId, callfrom) {
    var inputFromDate = $("#inputFromDate").val();
    var inputToDate = $("#inputToDate").val();
    if (callfrom == "auto"){
        $("#inputFromDate").val("");
        $("#inputToDate").val("");
	}

    if (callfrom == "search" && inputFromDate != "" && inputFromDate != null
            && inputFromDate != undefined && inputToDate != ""
                && inputToDate != null && inputToDate != undefined) {
    	fetchBlockPatientByDateRange();

         }
    else
    	{
    	var usertype = "";
    	var letter="";
    	if (callfrom ="search") {
    		letter=$("#byName").val();
    		if($("#byid").is(':checked')){
    			
    			usertype="Y";				
    		}else{
    			usertype="N";
    		}
    	}
    	
        var findingName = $("#" + inputId).val();
           var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async 	: true,
            type 	: "POST",
            data 	: str + "&reqType=AJAX",
            url 	: "ehat/markvisit/setAutoCompleteBlockPatsList",
            /*timeout : 1000 * 60 * 15,*/
            cache 	: true,
            success : function(r) {
            	 
            	
               if(callfrom=="search"){
            	  //fetchVisitingPatient1();
            	   setTempPatBlockList(r);
            	   //autoCompTableforMarkVisit(r, inputId);    
                }else{
                	//autoCompTableforMarkVisit(r, inputId);
                }
             }
        });
    	}

}

function setTempPatBlockList(r) {
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();	 
	
	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-3-1' style='height: 21.5px;padding-right: 40px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Blocked Date</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mobile</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Aadhar No</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>Block Patient</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 5px;'><div class='TextFont'>UnBlock Patient</div></th>"
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
var index = 1;	
var Mrn= 1010101111;
for ( var i = 0; i < r.listReg.length;i++) {
	
	var blockedDateTime="";
	var datetime= new Date(r.listReg[i].createdDateTime).toLocaleString();
if(r.listReg[i].blockedDateTime!=null)
	{
	 blockedDateTime=new Date(r.listReg[i].blockedDateTime).toLocaleString();
	}
	 var patIdPrefix=patPrefix+patMiddle+r.listReg[i].patientId+patSufix;	
	 var patientName = r.listReg[i].prefix+""+ r.listReg[i].fName+" "+ r.listReg[i].mName+" "+ r.listReg[i].lName ;
	 
	var a="";
	var edit1="";
	
	
	//removed block functionality
	//onclick='preBlockPatient("+ r.listReg[i].patientId+",\""+ patientName+"\",\"other\")'
			
		htm=htm
		+ "<table class='table table-condensed cf'>"
		+ "<tbody>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.listReg[i].prefix+"  "+ r.listReg[i].fName+" "+ r.listReg[i].mName+" "+ r.listReg[i].lName+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+datetime+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+blockedDateTime+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].patientId +"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].mobile +"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.listReg[i].adharcardNo +"</td>";
		
		
		if(r.listReg[i].blockFlag == "F"){//Patient with one warning = F
	
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs ' value='"
			+ r.listReg[i].blockFlag+"' type='button' data-toggle='tooltip' title='1]"+r.listReg[i].blockNarration1+" -By("+r.listReg[i].blockUserName1+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs btn-success' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
			
		}else if(r.listReg[i].blockFlag == "S"){//Patient with two warning = S
	
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs ' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")' data-toggle='tooltip' title='1]"+r.listReg[i].blockNarration1+" -By("+r.listReg[i].blockUserName1+")\n2]"+r.listReg[i].blockNarration2+" -By("+r.listReg[i].blockUserName2+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs btn-success' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
			
		}else if(r.listReg[i].blockFlag == "T"){//Blocked patient list = T
	
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs btn-success' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")' data-toggle='tooltip' title='1]"+r.listReg[i].blockNarration1+" -By("+r.listReg[i].blockUserName1+")\n2]"+r.listReg[i].blockNarration2+" -By("+r.listReg[i].blockUserName2+")\n3]"+r.listReg[i].blockNarration3+" -By("+r.listReg[i].blockUserName3+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-times-circle' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs ' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
			
		}else{//Active patient = N
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs ' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")' ><i class='fa fa-circle-o' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='unBlockBtn"+ r.listReg[i].patientId+"' class='btn btn-xs btn-success' value='"
			+ r.listReg[i].blockFlag+"' type='button'  onclick='unBlockPatient("
			+ r.listReg[i].patientId+",\""+ patientName
			+"\",\"other\")'>UnBlock</button>"
			+ "</td>";
		}
		
		
		
/*	htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' title='admPrint' type='button'  value='PRINT' onclick='AdmissionPrint("+ r.listReg[i].ttId+")'><i class='fa fa-print' class='edit'></button>"  //Added By Pooja
		+ "</td>";*/
		
		htm=htm+ "</tr>" + "</tbody>" + "</table>" + "</div>";
 index++;
Mrn++;
}
$("#container").html(htm);
$("#CamPatId").val(r.listReg[0].patientId);
$("#container").html(htm);
$("#allPatInfo").html(r);
//$("#ehatTable").html(htm);
var maxPatId=Number(r.listReg[0].ptId)+Number(1);
$("#maxPatId").val(maxPatId);
}


function fetchBlockPatientByDateRange() {
	var inputFromDate = $("#inputFromDate").val();
	var inputToDate = $("#inputToDate").val();
	if (inputFromDate == "")
	{
		alert("Enter From Date");
		return false;
	}
	if (inputToDate == "")
	{
		alert("Enter To Date");
		return false;

	}
	
	date1 = new Date(inputFromDate);
	date2 = new Date(inputToDate);
	
	if(date1>date2)
		{
			alert("FromDate is greater than ToDate");
			return false;
		}
	
	if(date2<date1)
	{
		alert(" ToDate is less than FromDate");
		return false;
	}

	var part1 = inputFromDate.split('/');
	inputFromDate = part1[2] + "-" + part1[1] + "-" + part1[0];
	var part2 = inputToDate.split('/');
	inputToDate = part2[2] + "-" + part2[1] + "-" + part2[0];
	

	
	
	var inputs = [];
	inputs.push('inputFromDate=' + encodeURIComponent(inputFromDate));
	inputs.push('inputToDate=' + encodeURIComponent(inputToDate));
	var str = inputs.join('&');

	// alert("hi");
	//$('#pleaseWait').show();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/markvisit/fetchBlockPatientByDateRange",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

			alert('error');

		},
		success : function(r) {
			//ajaxResponse = r;
			//console.log(r);
			setTempPatBlockList(r);
			$('#pleaseWait').hide();
		}
	});
}



function AdvanceSearchForOPDque1(inputId,callfrom) {
	
	var deptId=1;
	var usertype = "";
	var letter="";
	
	var byAge = $("#iSrchAge").val();
	var byGender = $("#iSrchGender").val();
	var byDoctor = $("#iAdvanceConsDoc").val();
	var byName = $("#byName").val();
	
	if (callfrom ="advanceSerach") {
		
	var sridname = $("#sridname").val();
	//	var sridname = "Y";
 if(byName != ""){
	if(sridname=='N'){
  	  usertype=sridname; 
  	  letter=$("#byName").val();
  	  
    }
 }else if(byDoctor != "0"){
  	  letter= byDoctor;
  	  usertype="doctor"; 
  	  
    }else if(byAge != ""){
  	  letter= byAge;
  	  usertype="age"; 
  	  
    }else if(byGender != ""){
  	  letter= byGender;
  	  usertype="gender"; 
  	  
    }else{
  	 usertype=sridname; 
 	 letter=$("#byId").val();
   }
}
	
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
       // inputs.push('callfrom=' + callfrom);
        
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/registration/getAllOpdRecordsDeptwiseWithAuto",
	success : function(r) {
		//setTempPatientRecords(r);
		$("#byId").val("");
		$("#OPDPatientList").html(r);
		
		    hideAdvSearch();
		 
			setTempPatientForOPDque1(r);
			AllPatientRecordsAutosuggestioTemp(r,inputId);
			
			$("#iAdvanceConsDoc").val("0");
			$("#iAdvanceConsSpec").val("0");
			$("#iAdvanceConsDept").val("0");
			$("#iSrchGender").val("0");
			$("#iSrchAge").val("");
		
	}
});	

}

//Added by @Author-Abhishek Kumbhar ...Reason-For 24/48 Stickers Printing..Date-16/08/2019
function showPrintsticker(){
	var trid=$("#trid").val();
	//alert(trid);
	//$("#trid").val(pid);
	$("#iPopUp24").show('show');
	var pid = $("#pid11").val();
	//alert(pid);
}


function setAutoPatientName(inputID) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	//alert(findingName);
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('patSearchType=' + patSearchType);		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/markvisit/autoSuggestionMarkVisit1",
		cache : false,		
		success : function(r) {
			
			/*var template = "<option value='0'>----- Search Patient -----</option>";
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				template = template + '<option value="'+ r.lstRegviewDto[j].ptId +'" >' + r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile + '</option>';
			}
			$("#" + inputID).html(template);
			$("#" + inputID).select2();*/
			var template = "";
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile;
				var idValue = r.lstRegviewDto[j].ptId;
				var patName = r.lstRegviewDto[j].patientName;
				resultData.push({
					ID : idValue,
					Name : patName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			
			setTimeout(function() {

				$("#div" + inputID + " .typeahead").html(template);
				$("#div" + inputID + " .typeahead").show();
				
				$("#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		setSearchedPatientTemp(patId);
	}
}

function setSearchedPatientTemp(patId) {
	
	//var patId = $("#byName").val();
	$("#container").addClass("loading");
	
    var inputs = [];
    inputs.push('patientId=' + patId);   
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: true,
        type 	: "POST",
        data 	: str + "&reqType=AJAX",
        url 	: "ehat/markvisit/autoSuggestionMarkVisit",
        cache 	: true,
        success : function(r) {
        	
        	setTempMarkVisit(r);            	
        }
    });
}

function setPatientSearchType(){
	
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient Id Here");
		
	}else if(patSearchType == 2){
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		
	}else if(patSearchType == 3){
		
		$("#byName").attr("placeholder", "Type Patient Mobile Here");
	}
}

function setAppointmentDetails(r){

	//$('#sponserselectDiv').fadeOut();
	//var si=$("#sourceType").val();
	$('#Patientid').prop('checked',true);
  	$('#e1').select2('val', r.lstMarkVisit[0].unitId);
 	$('#prefix').select2('val',r.lstMarkVisit[0].prefix);
	$('#fName').val(r.lstMarkVisit[0].fName);
	$('#mName').val(r.lstMarkVisit[0].mName);
	$('#lName').val(r.lstMarkVisit[0].lName);
	$('#gender').select2('val',r.lstMarkVisit[0].gender);
	$('#dob').val(r.lstMarkVisit[0].dob);
	$('#year').val(r.lstMarkVisit[0].age);
	$('#month').val(r.lstMarkVisit[0].ageMonths);
	$('#days').val(r.lstMarkVisit[0].ageDays);
  	$('#talukaId').val(r.lstMarkVisit[0].talukaId);//locality
	$('#townId').val(r.lstMarkVisit[0].twnId);
	$('#districtId').val(r.lstMarkVisit[0].districtId);//district
	$('#stateId').val(r.lstMarkVisit[0].stateId);
	$('#country').val(r.lstMarkVisit[0].countryId);
	$('#areaCode').val(r.lstMarkVisit[0].areaCode);
	$('#addressText').val(r.lstMarkVisit[0].address);
	
	$('#department').select2('val',r.lstMarkVisit[0].deptId);
	$('#drDeptId').select2('val',r.lstMarkVisit[0].specialityId);
	
	$('#mobile').val(r.lstMarkVisit[0].mobile);
 	$('#token').val(r.lstMarkVisit[0].token);
  	$('#sourceType').val(r.lstMarkVisit[0].sourceTypeId);
	$('#sponsorCatId').val(r.lstMarkVisit[0].sponsorCatId);
 	$('#patientCatId').val(r.lstMarkVisit[0].patientCatId);
 	$('#patientId').val(r.lstMarkVisit[0].ptId);
 	//$('#patientIdText').val(r.lstMarkVisit[0].ptId);
 	$("#patientIdText").text(r.lstMarkVisit[0].centerPatientId);
 	$('#count').val(r.lstMarkVisit[0].count);
 	$('#mrnnoHidden').val(r.lstMarkVisit[0].mrnno);
	$('#reqGenFormId').val(r.lstMarkVisit[0].reqGenFormId);
	$('#invoiceCount').val(r.lstMarkVisit[0].invoiceCount);
	$('#passport').val(r.lstMarkVisit[0].passport);
	$('#visa').val(r.lstMarkVisit[0].visa);
	$('#invoiceFlag').val(r.lstMarkVisit[0].invoiceFlag);
	$('#reasonofvisit').val(r.lstMarkVisit[0].reason_of_visit);
	
	//later added additional info
	$('#peraddressText').val(r.lstMarkVisit[0].perAddress);
  	$('#pertalukaId').val(r.lstMarkVisit[0].pertalukaId);
	$('#pertownId').val(r.lstMarkVisit[0].pertownId);
 	$('#perdistrictId').val(r.lstMarkVisit[0].perdistrictId);
 	
 	$('#perstateId').val(r.lstMarkVisit[0].perstateId);
 	$('#percountry').val(r.lstMarkVisit[0].percountryId);
 	$('#perareaCode').val(r.lstMarkVisit[0].perareaCode);
	$('#oldPatientId').val(r.lstMarkVisit[0].oldPatientId);
	
	$('#emailId').val(r.lstMarkVisit[0].emailId);
	$('#maritalStatusId').val(r.lstMarkVisit[0].maritalStatusId);
	$('#nationalityId').val(r.lstMarkVisit[0].nationalityId);
	$('#religionId').val(r.lstMarkVisit[0].religionId);
	
	$('#languageId').val(r.lstMarkVisit[0].languageId);
	$('#bloodGroupId').val(r.lstMarkVisit[0].bloodGroupId);
	$('#idProof').val(r.lstMarkVisit[0].identityProofId);
	$('#identificationNum').val(r.lstMarkVisit[0].identificationNumber);
	
	$('#annualIncome').val(r.lstMarkVisit[0].annualIncomeId);
	$('#occupation').val(r.lstMarkVisit[0].occupation);
	$('#education').val(r.lstMarkVisit[0].education);
	
	var referredBy = r.lstMarkVisit[0].referredBy;
	$('#selReferredBy').val(r.lstMarkVisit[0].referredSource);
	$('#txtReferredBy').val(r.lstMarkVisit[0].referredSourceSlave);
	
	
	if(referredBy == "walkin"){
		$("#chkWalkin").prop("checked", true);
		$("#chkSource").prop("checked", false);
		sourceDivHide();
		
	}else if(referredBy == "source"){
		$("#chkWalkin").prop("checked", false);
		$("#chkSource").prop("checked", true);
		sourceDivShow();
		//chkRefDocDivHide();
		setReferredBySource2();
	}
	setTimeout(function() {
		$('#refByInHouse').val(r.lstMarkVisit[0].referredSourceDocId);
		$("#sponsor_select").select2("val", r.lstMarkVisit[0].sponsorchargesSlaveId);
	}, 50);
	
	
	var fileName=r.lstMarkVisit[0].imageName;	
	//alert("mark"+fileName);
	$("#curPatImg").val(fileName);
	$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
	
	var aadharFileName=r.lstMarkVisit[0].aadharImageName;	
	//alert("mark"+fileName);
	$("#curAadharImg").val(aadharFileName);
	$('#aadharImg').attr('src','pharmacy/pharmacy/readAadharImage?url='+ aadharFileName);
	
 	//hidden set on reg page for mark visit update patient 
 	//$('#markvisitTflag').val(r.lstMarkVisit[0].tFlag);
	 $("#queryType").val("markvisit");

	$('#markvisitTflag').val('Y');
  	if(r.lstMarkVisit[0].caseType==1){
 		$("#chkHospital").prop('checked',true);
 	}else{
 		$("#chkPrivate").prop('checked',true);
  	}
  	getSponsorRecords("sourceid","slaveid");
	//$('#sponsor_select').select2('val', r.lstMarkVisit[0].sponsorchargesSlaveId);  
  	//alert(r.lstMarkVisit[0].sponsorchargesSlaveId);
  	
  	
	//$("#sponsor_select").select2("val", r.lstMarkVisit[0].sponsorchargesSlaveId).trigger('change.select2');
	$("#refBy").select2("val",r.lstMarkVisit[0].refdocid);
	$("#height").val(r.lstMarkVisit[0].height);
	$("#weight").val(r.lstMarkVisit[0].weight);
	$("#height").val(r.lstMarkVisit[0].height);
	$("#weight").val(r.lstMarkVisit[0].weight);
	$("#Mheight").val(r.lstMarkVisit[0].m_height);
	$("#Fheight").val(r.lstMarkVisit[0].f_height);
	$("#empid").val(r.lstMarkVisit[0].empid);
	$("#tpaid").val(r.lstMarkVisit[0].tpaid);
	
	
	$("#relativeName").val(r.lstMarkVisit[0].relativeName);
 	//$("#createdBy").text(r.lstMarkVisit[1].userNmae);
 	var regDate= new Date(r.lstMarkVisit[0].createdDateTime).toLocaleString();
    	if(r.lstMarkVisit[0].updatedBy!=null ){
  	var editedDate= new Date(r.lstMarkVisit[0].updatedDateTime).toLocaleString();	
    //getUserNameByUserid(r.lstMarkVisit[0].updatedBy,"edit");
  	$("#editedBy").text(r.lstMarkVisit[0].updatedByUser);
    $("#dateTime").text(editedDate);
 	}
 	$("#regDate").text(regDate);
  	//getUserNameByUserid(r.lstMarkVisit[0].createdBy);
 	$("#createdBy").text(r.lstMarkVisit[0].createdByUser);
 	$("#adharcardNo").val(r.lstMarkVisit[0].adharcardNo);
 	var transSMS=r.lstMarkVisit[0].transSMS;
 	var transEmail=r.lstMarkVisit[0].transEmail;
	var pramoEmail=r.lstMarkVisit[0].pramoEmail;
	var pramoSMS=r.lstMarkVisit[0].pramoSMS;
	var external=r.lstMarkVisit[0].external;
	var emergency=r.lstMarkVisit[0].emergency;
	
	if(r.lstMarkVisit[0].admissionDateTime!="-" && r.lstMarkVisit[0].admissionDateTime!="" &&  r.lstMarkVisit[0].admissionDateTime!=null){
		//var admissionDateTime=new Date(r.lstMarkVisit[0].admissionDateTime).toLocaleString();
		//$("#doa").val(admissionDateTime.split(",")[0]);
		var admissionDateTime=new Date(r.lstMarkVisit[0].admissionDateTime).toLocaleDateString('en-GB');
		$("#doa").val(admissionDateTime);
	}else{
		$("#dao").val("");
	}

	if(r.lstMarkVisit[0].admissionDateTime!="-" && r.lstMarkVisit[0].admissionDateTime!="" && r.lstMarkVisit[0].admissionDateTime!=null){
		var admissionDateTime=new Date(r.lstMarkVisit[0].admissionDateTime).toLocaleString();
		//$("#toa").val((admissionDateTime.split(",")[1]).split(":")[0]+":"+(admissionDateTime.split(",")[1]).split(":")[1]);
		var HH = (admissionDateTime.split(",")[1]).split(":")[0];
		var MM = (admissionDateTime.split(",")[1]).split(":")[1];
		HH = HH.trim();
		MM = MM.trim();
		if(HH.trim().length == 1){
			
			HH = "0"+ HH;
		}
		if(MM.trim().length == 1){
			
			MM = "0"+ MM;
		}
		$("#toa").val(HH+":"+MM);
	}else{
		$("#tao").val("");
	}

	
	//irfan khan changes
	if(transSMS=="Y"){
		$('#transSMS').prop('checked',true);
	}else{
		$('#transSMS').prop('checked', false);
	}
	
	if(transEmail=="Y"){
		$('#transEmail').prop('checked',true);
	}else{
		$('#transEmail').prop('checked', false);	
	}
	
	if(pramoEmail=="Y"){
		$('#pramoEmail').prop('checked',true);
	}else{
		$('#pramoEmail').prop('checked', false);
	}
	
	if(pramoSMS=="Y"){
		$('#pramoSMS').prop('checked',true);
	}else{
		$('#pramoSMS').prop('checked', false);
	}
	
	if(emergency=="Y"){
		$('#emergency').prop('checked',true);
	}else{
		$('#emergency').prop('checked', false);
	}
	
	if(external=="Y"){
		$('#external').prop('checked',true);
	}else{
		$('#external').prop('checked', false);
	}
	
	getDoctorBySpecialization('speciality','doctorName');
	 
	var strVale = r.lstMarkVisit[0].drId;

	var strArr = strVale.split(',');
	
 	$('#doctorName').select2('val', strArr);
 	//$('#doctorNameProxy').select2('val', strArr);
	
  	$('#tabs a[href="#account"]').tab('show');//to switch reg tags 
 
  	$("#Otherid").prop("disabled", true);
	
	 	
		$("#demoPtNm").prop("disabled", true);
	 	$("#demoPtSearch").prop("disabled", true);
	 	
	 	
		
		$('#PiD').val(r.lstMarkVisit[0].ptId);
		$('#TRTiD').val(r.lstMarkVisit[0].ttId);
		
	 	refGenFormHideShow();
	 	temForuploaddocuments();
	 	//fetchDocOnReg1();
	 	
	 	
	 	
	 	autoAgeMonthDays();
	 	
	 	if(r.lstMarkVisit[0].refDate!=null){
			var refDate=new Date(r.lstMarkVisit[0].refDate).toLocaleDateString('en-GB');
			//$("#refDate").val(refDate.split(",")[0]);
			$("#refDate").val(refDate);
		}else{
			$("#refDate").val("");
		}
	 	
	 	$("#sanctionAmt").val(r.lstMarkVisit[0].sanctionAmt);
		$("#sactionOrdNo").val(r.lstMarkVisit[0].sactionOrdNo);
		$("#neisNo").val(r.lstMarkVisit[0].neisNo);
		
		if(r.lstMarkVisit[0].validUpToDate!=null){
			var validUpToDate=new Date(r.lstMarkVisit[0].validUpToDate).toLocaleDateString('en-GB');
			//$("#validUpToDate").val(validUpToDate.split(",")[0]);
			$("#validUpToDate").val(validUpToDate);
		}else{
			$("#validUpToDate").val("");
		}
		
		$("#visitNo").val(r.lstMarkVisit[0].visitNo);
		
		$("#ipdOrOpd").val(r.lstMarkVisit[0].ipdOrOpd);
		$("#treatPermited").val(r.lstMarkVisit[0].treatPermited);
		$("#diseToBeTreat").val(r.lstMarkVisit[0].diseToBeTreat);

		setDoctorDetails();
	
}

function setDoctorDetails(){
	
	var appoid=$("#patientApId").val();
	
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: {
			 "appoid" : appoid,
				 
				}, 
		url 	: "ehat/markvisit/getappointmentList",
		timeout : 1000 * 60 * 5,
		cache	: false,
		error	: function() {
			//alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
		
			$('#drDeptId').select2('val',r.lstAppointment[0].branchId);
		  	getDoctorBySpecialization('speciality','doctorName');
		  	$('#doctorName').select2('val',r.lstAppointment[0].doctorId);
 		}
	});
}

function getFollowUpCount(sponsorId){

	$("#followUpCount").text(0);
	var patientId = $('#patientId').val(); 
   var sourceType = $("#sourceType").val();
   //var sponsorId = $("#sponsor_select").val();

  if(sourceType == 0){
	  return false;
  }
	
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('sponsorId=' + sponsorId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/register/getfollowUpCount",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#followUpCount").text(r);
		}
	});


}