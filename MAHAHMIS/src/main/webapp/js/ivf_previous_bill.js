function setPatientSearchType(){
	
	$("#patientopd").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#patientopd").attr("placeholder", "Type Patient Id Here");
		$("#patientopd").removeAttr("minlength");
		$("#patientopd").removeAttr("maxlength");
		
	}else if(patSearchType == 2){
		
		$("#patientopd").attr("placeholder", "Type Patient Name Here");
		$("#patientopd").removeAttr("minlength");
		$("#patientopd").removeAttr("maxlength");
		
	}else if(patSearchType == 3){
		
		$("#patientopd").attr("placeholder", "Type Patient Mobile Here");
		$("#patientopd").attr("minlength", "10");
		$("#patientopd").attr("maxlength", "10");
		
	}else if(patSearchType == 4){
		
		$("#patientopd").attr("placeholder", "Type Patient AddharNo Here");
		$("#patientopd").attr("minlength", "12");
		$("#patientopd").attr("maxlength", "12");
	}
}

function setAutoPatientName(inputID,callFrom,e) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var patientId = $("#patientopd").val();
			if(patientId == "")
				patientId = 0;
			fetchOpdQueuePatient(patientId,'-','-');
		 }
		 return false;  
		
	}else if(patSearchType == 3){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var mobile = $("#patientopd").val();
			fetchOpdQueuePatient(0,mobile,'-');
		 }
		 return false;  
		 
	}else if(patSearchType == 4){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var addhar = $("#patientopd").val();
			fetchOpdQueuePatient(0,'-',addhar);
		 }
		 return false;  
	}
	
	if(patSearchType == 2){
		
		if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
			
			alert("Please enter search value");
			$("#" + inputID).focus();
			return false;
		}
			
		var inputs = [];	
		inputs.push('findText=' + findingName);
		inputs.push('patSearchType=2');		
		inputs.push('callFrom=' + callFrom);		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/markvisit/autoSuggestionMarkVisit1",
			cache : false,		
			success : function(r) {
				
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
				
			fetchOpdQueuePatient(patId,'-','-');
			
			$("#patientopd").val("");
		}
	}
}

function fetchOpdQueuePatient(patientId,mobile,adharcardNo) {
	
	//var startIndex = 0;
	var patientName = "-";
	var specialityId = "-";
	var doctorId = "-";
	
	/*startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');*/
		
	/*var searchType = $("#selectsearchopd").val();
	if(searchType == 1){
		patientId = $("#patientopd").val();
	}else if(searchType == 2){
		patientName = $("#patientopd").val();
	}else{
		
	}*/
		
	var inputs = [];
	inputs.push('ptId=' + patientId);
	inputs.push('patientName=' + patientName);
	inputs.push('mobile=' + mobile);
	inputs.push('adharcardNo=' + adharcardNo);
	//inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfbill/getPreviousTreatmentPatient",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
				
			if(r.lstRegviewDto.length > 0){
				
				setOpdQueuePatient(r);
			}else{
				
				$("#containerprevOpd").html("");
				alertify.error("Record Not Found...");
			}
			
		}
	});
}
function setOpdQueuePatient(r) {
	
	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	
	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mobile No</div></th>"

			//+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>UHID</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Treatment</div></th>"
			 
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
var index = 1;	
 
htm =htm+ "<tbody>"	;
for ( var i = 0; i < r.lstRegviewDto.length;i++) {
	
	var patId= patPrefix + patMiddle + r.lstRegviewDto[i].ptId + patSufix;
	var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString(); 		
		htm= htm
		+ "<tr id='div123"+ r.lstRegviewDto[i].ptId+"'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.lstRegviewDto[i].patientName+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>"+ r.lstRegviewDto[i].mobile+"</td>"

		//+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ patId +"</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.lstRegviewDto[i].centerPatientId +"</td>"

		+ "<td style='height: 21.5px;' class='col-md-2 center'>"+datetime+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBillIVF("+ r.lstRegviewDto[i].ptId+")'>"
		+ "<img src='images/down.png' id='imgupdown"+ r.lstRegviewDto[i].ptId+"' />"
		+ "<input type='hidden' id='hideShowStatus123"+ r.lstRegviewDto[i].ptId+"' value='0' /><input type='hidden' id='patientDOB123' value='"+ r.lstRegviewDto[i].ptId+"' /></td>"
 		
		+ "</tr>"
		+ "</tbody></table>"
				+ "<tr id='patPreOPDBill123"+ r.lstRegviewDto[i].ptId+"' style='width:0%;float:right'><td style='display:none' id='td123"+ r.lstRegviewDto[i].ptId+"'>"
						+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
							+ "<tbody1 id='xyz"+ r.lstRegviewDto[i].ptId+"'>"
								+ "<tr>"
								+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
								+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
								+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
								+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
								+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
								+ "</tr>"
							+ "</tbody1>"
						+ "</table>"
					+ "</td></tr>";

 		index++;
 
 }
$("#containerprevOpd").html(htm);
}

function hideShowPreOPDBillIVF(count) {

	var hideShowStatus = $("#hideShowStatus123" + count).val();

	if (hideShowStatus == 0) {

		$("#imgupdown" + count).attr('src', "images/up.png");
		$("#patPreOPDBill123" + count).show();
		$("#hideShowStatus123" + count).val(1);
		closeTreatmentDetailsOfPatientIVF(count);

	} else {
		 
		$("#imgupdown" + count).attr('src', "images/down.png");
		$("#patPreOPDBill123" + count).hide();
		$("#hideShowStatus123" + count).val(0);
	}
}
function  closeTreatmentDetailsOfPatientIVF(patientId ) {
	
	var ajaxr="";
	jQuery.ajax({
		async 	: true,
		type : "POST",
		url  : "ehat/ivfbill/getPrevPatdetails",
		data : {"patientId" : patientId},
		timeout : 1000 * 60 * 5,
		cache : true,
		error : function() {
			    alert('error');
		},
		success : function(response) {
		  ajaxr = response;
		  setTempForInnerLoop123(response);
		}
	});
	return ajaxr;
}

 function setTempForInnerLoop123(r1){

	 var htm=" class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
	 + "<td style='height: 21.5px;' class='col-md-2 center' class=''>treatment Id</td>"
	 + "<td style='height: 21.5px;' class='col-md-2 ' class=''>Admission  No</td>"
	 + "<td style='height: 21.5px;' class='col-md-5 ' class=''>Date</td>"
	 + "<td style='height: 21.5px;' class='col-md-2 ' class=''>BIll No</td>"
	 + "<i class='fa fa-eye View'></i></button></td>> </tr>";
	 
	 for ( var j = 0; j < r1.listTreatment.length;j++) {
			
		 var datetime= new Date(r1.listTreatment[j].createdDateTime).toLocaleDateString('en-GB');

		 htm=htm+ "<tr id='div123"+ r1.listTreatment[j].patientId+"' class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.listTreatment[j].patientId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>"+ r1.listTreatment[j].opdipdno+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-5 ' class=''>"+ datetime+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>"+ r1.listTreatment[j].treatmentId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-1 '>";
		 htm=htm+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='sendingToPreviousBillIVF("+ r1.listTreatment[j].treatmentId+")'>";
		 htm=htm+ "<i class='fa fa-eye View'></i></button></td>";
		 htm=htm	+ "<input type='hidden' value='"+ r1.listTreatment[j].patientId+"' id='rowCount' /></tr>";
		
		 $("#patPreOPDBill123" + r1.listTreatment[j].patientId).html(htm);
		 $("#td123" + r1.listTreatment[j].patientId).show();
		 $("#xyz" + r1.listTreatment[j].patientId).html(htm);
	}
}
 
function sendingToPreviousBillIVF(r){
     
	var treatclose="treatclose";
    window.location = "ivf_ehat_billing.jsp?" + "treatmentId=" + r + "&treatclose="+ treatclose;
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
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=fetchDoctorDeskDeshboard('OPDLIST',"+j+")><a class='page-link'>"+j+"</a></li>";
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
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=fetchDoctorDeskDeshboard('OPDLIST',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}



function setPatientSearchType(){
	
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient Id Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 2){
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 3){
		
		$("#byName").attr("placeholder", "Type Patient Mobile Here");
		$("#byName").attr("minlength", "10");
		$("#byName").attr("maxlength", "10");
		
	}else if(patSearchType == 4){
		
		$("#byName").attr("placeholder", "Type Patient AddharNo Here");
		$("#byName").attr("minlength", "12");
		$("#byName").attr("maxlength", "12");
	}
}

function actionDashBoard(treatmentId){
	
	window.location.href = "ivf_ehat_billing.jsp?treatmentId="+treatmentId;
}

function doctorDeskPatientCount(){
	
	var unitId=$("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskqueuecontroller/doctordeskpatientcount",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#unitCountOpd").text(r.opdcount);
			$("#unitCountIpd").text(r.ipdcount);
			$("#unitCountEr").text(r.ercount);
			$("#unitCountClosed").text(r.closedcount);
		}
	});
}
function refreshDataQuque(id)
{
	$("#patientopd").val("");
	$("#fromopdDate").val("");
	$("#toopdDate").val("");
	
	$("#patientipd").val("");
	$("#ipdfromDate").val("");
	$("#ipdtoDate").val("");
	
	$("#patienter").val("");
	$("#fromerDate").val("");
	$("#toerDate").val("");
	
	$("#patientclosed").val("");
	$("#FormDate").val("");
	$("#ToDate").val("");

	
	
}
function clearFild()
{
	$("#selectsearchopd").val("0");
	$("#patientopd").val("");
	
	$("#selectsearchipd").val("0");
	$("#patientipd").val("");
	
	$("#selectsearcher").val("0");
	$("#patienter").val("");
	
	$("#selectsearchclosed").val("0");
	$("#patientclosed").val("");	
}

function setCurrantDate()
{
	
	$("#fromopdDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#toopdDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#ipdfromDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#ipdtoDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#fromerDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#toerDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#FormDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#ToDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
}
