function setPatientSearchType(){
	
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient UHID Here");
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


function setSearchedPatientPrevOpdTemp(patId) {
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
    var deptId = 1;

    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",		
		success : function(r) {
			 
			opdPrevRecordsTemp(r);  		
		}
	});
}

function setSearchedPatientPrevIpdTemp(patId) {
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
    var deptId = 2;

    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",		
		success : function(r) {
			 
			opdPrevRecordsTemp(r);  		
		}
	});
}

function setSearchedPatientPrevOpdDDTemp(patId) {
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
    var deptId = 1;

    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",		
		success : function(r) {
			 
			setpatientForTreatmentDD(r);  		
		}
	});
}


function setSearchedPatientPrevIpdDDTemp(patId){
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
    var deptId = 2;

    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",		
		success : function(r) {
			 
			setpatientForTreatmentDD(r);  		
		}
	});
}


/* =============
Code By  : Badrinath Wagh
Code For : autoSuggestation for Previous Bill Patients
================*/
function setAutoPatientNamePrev(inputID,callFrom,e) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	

	if(patSearchType == 1 || patSearchType == 3)
	{
		 var key = e.which;
		
		 if(key == 13) {
			
			 getPreviousBillInfo(inputID);
		 }
	}else{
		 getPreviousBillInfo(inputID);
	}
	
	
	
}
/* =============
Code By  : Badrinath Wagh
Code For : get Previous Bill Patients Info.
================*/

function getPreviousBillInfo(inputID){
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	var callFrom=patSearchType;
	var startIndex = 0;
	var inputs = [];	
	
	
	 inputs.push('unit_id=' + 1);
     inputs.push('findText=' + findingName);
     inputs.push('callFrom=' + patSearchType);
     inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdPreviousBill/autoSuggestationPreviousBillPatients",
		cache : false,		
		success : function(r) {
			
			if(patSearchType == 1 || patSearchType == 3 ){
				 if(r.lstRegviewDto.length > 0){
					 opdPrevRecordsTemp_updated(r,1);
				 }
			}
			
			var template = "";
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				var arrValue = r.lstRegviewDto[j].patient_id +"-"+r.lstRegviewDto[j].patient_name +"-"+r.lstRegviewDto[j].mobile;
				var idValue = r.lstRegviewDto[j].patient_id;
				var patName = r.lstRegviewDto[j].patient_name;
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
		getPatientInfoByPatientId(patId);
			
	}
}


function getPatientInfoByPatientId(patientId){
	var inputs = [];
	var startIndex = 0;
	 inputs.push('unit_id=' + 1);
     inputs.push('findText=' + patientId);
     inputs.push('callFrom=' + 1);
     inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdPreviousBill/autoSuggestationPreviousBillPatients",
		cache : false,		
		success : function(r) {
			 opdPrevRecordsTemp_updated(r,1);
		}
	});
	

	
}

function setSearchedPatientRegTemp(patId,mobile,addhar) {
	
	$("#container").addClass("loading");
    var inputs = [];
    inputs.push('patientId=' + patId);  
    inputs.push('mobileNo=' + mobile);  
    inputs.push('addharNo=' + addhar);  
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: true,
        type 	: "POST",
        data 	: str + "&reqType=AJAX",
        //url 	: "ehat/markvisit/autoSuggestionMarkVisit",
        url 	: "ehat/register/autoSuggestionMarkVisit",
        cache 	: true,
        success : function(r) {
        	
        	if(r.lstRegviewDto.length > 0){
        		
        		setTempMarkVisit(r);
        	}else{
        		
        		alertify.error("Patient not found !!!");
        	}
        	            	
        }
    });
}




function getAllPatientRecordsForPrevOPDIPDNEW_updated(callfrom, pageNumber) {
	
	var startIndex = 0;
	var deptId=2;
	var usertype = "all";
	var letter="";
	var unit_id = parseInt($("#unitId").val());
	
	$('#opdpagenation').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
        var inputs = [];
        inputs.push('unit_id=' + unit_id);
        inputs.push('findText=' + usertype);
        inputs.push('callFrom=' + callfrom);
        inputs.push('startIndex=' + startIndex);
        var str = inputs.join('&');
        
      //  alert("str... "+str)
        
	jQuery.ajax({
		async : true,
		type : "POST",
		data 	: str + "&reqType=AJAX",
		url : "ehat/ipdPreviousBill/autoSuggestationPreviousBillPatients",
		success : function(r) {
		//setTempPatientRecords(r);

			opdPrevRecordsTemp_updated(r,pageNumber);
			//autosuggestionTempForPrevOPD(r,inputId);
			//autoCompTablefoipdManualSummaryTempAuto(r,inputId);
		
		}
	});
}


function opdPrevRecordsTemp_updated(r,pageNumber){	

//	alert("r.lstRegviewDto.length... "+r.lstRegviewDto.length)
	var countAuto = (pageNumber - 1) + '0';
	countAuto = Number(countAuto) + 1;
	
	var htm = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mobile No</div></th>"

		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>UHID</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

		+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Treatment</div></th>"
		 
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>";

var index = 1;	

htm =htm+ "<tbody>"	;
for ( var i = 0; i < r.lstRegviewDto.length;i++) {

var datetime= new Date(r.lstRegviewDto[i].created_date_time).toLocaleDateString('en-GB');
	htm= htm
	+ "<tr id='div123"+ r.lstRegviewDto[i].countAuto+"'>"
	+ "<td style='height: 21.5px;' class='col-md-1 center'>"+countAuto+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.lstRegviewDto[i].patient_name+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 center'>"+ r.lstRegviewDto[i].mobile+"</td>"

	+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.lstRegviewDto[i].center_patient_id+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 center'>"+datetime+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBill123("+ r.lstRegviewDto[i].patient_id+")'>"
	+ "<img src='images/down.png' id='imgupdown"+ r.lstRegviewDto[i].patient_id+"' />"
	+ "<input type='hidden' id='hideShowStatus123"+ r.lstRegviewDto[i].patient_id+"' value='0' /><input type='hidden' id='patientDOB123' value='"+ r.lstRegviewDto[i].patient_id+"' /></td>"
		
	+ "</tr>"
	+ "</tbody></table>"
			+ "<tr id='patPreOPDBill123"+ r.lstRegviewDto[i].patient_id+"' style='width:0%;float:right'><td style='display:none' id='td123"+ r.lstRegviewDto[i].patient_id+"'>"
					+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
						+ "<tbody1 id='xyz"+ r.lstRegviewDto[i].patient_id+"'>"
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
		countAuto++;
}

var numberOfRows="";
var indexopd=1;
var opdcount = r.prevPatCount;
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
	        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getAllPatientRecordsForPrevOPDIPDNEW_updated('onload',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

		}
		else
		{
	        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getAllPatientRecordsForPrevOPDIPDNEW_updated('onload',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
		}
		indexopd=indexopd+1;
}
if(numberOfPages>5){
    numberOfRows +="<li class='next' onclick='nextPaginationNew("+indexopd+","+Math.round(numberOfPages+1)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
}
$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
$('#opdpagenation').html(numberOfRows);
// $("#countopdpage").val(indexopd);
}
$("#IpdGenPreBill").html(htm);
//$("#containerprevOpd").html(htm);
//$("#ehatTable").html(htm);
}

function nextPaginationNew(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPaginationNew("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getAllPatientRecordsForPrevOPDIPDNEW_updated('onload',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPaginationNew("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPaginationNew(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPaginationNew("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getAllPatientRecordsForPrevOPDIPDNEW_updated('onload',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPaginationNew("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}
