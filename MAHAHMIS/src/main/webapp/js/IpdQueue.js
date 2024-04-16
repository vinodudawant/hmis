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

function setIpdQueuePatientList(r,callFrom,pageNumber){
	var countAuto = (pageNumber - 1) + '1';
	countAuto = Number(countAuto);
	var htm = "";
	var cnt=0;
	
	var htm ="";
	//var index = 1;
	 if(callFrom === "All"){
				for ( var i = 0; i < r.lstIpdQueue.length; i++) {		
							htm = htm + '<tr> '
							+ ' <td class="col-md-1 center">'+countAuto+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstIpdQueue[i].patientName+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstIpdQueue[i].mobile+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstIpdQueue[i].mrnno+'</td>'	
							+ ' <td class="col-md-1 center">'+r.lstIpdQueue[i].centerPatientId+'</td>'	
							+ ' <td class="col-md-1 center">'+r.lstIpdQueue[i].opdipdno+'</td>'	
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=viewBedWard('+r.lstIpdQueue[i].treatId+')>Allot Bed</button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=reasonTocancell('+r.lstIpdQueue[i].treatId+')>Cancel Admission</button></td>'
							+ '</tr>';
						//	index++;
							countAuto++;
						}
				var numberOfRows="";
				var indexopd=1;
				var opdcount = r.ipdPatCount;
				var numberOfPages=(opdcount/10);
				var displayPagination=numberOfPages;
				var countopdpage=$("#countopdpage").val();
				if(countopdpage == null || countopdpage == undefined || countopdpage == ""){

				var numberOfPages=(opdcount/10);
				var displayPagination=numberOfPages;
				if(numberOfPages > 5){
				    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				    displayPagination=5;
				}
				for(var j=0;j<displayPagination;j++){
						if(j == 0)
						{
					        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getIpdQueue('-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

						}
						else
						{
					        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getIpdQueue('-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
						}
						indexopd=indexopd+1;
				}
				if(numberOfPages>6){
				    numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
				}

				$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
				$('#opdpagenation').html(numberOfRows);
				
				}
	 }else if(callFrom === "ById"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+countAuto+'</td>'
			+ ' <td class="col-md-1 center">'+r.patientName+'</td>'
			+ ' <td class="col-md-1 center">'+r.mobile+'</td>'
			+ ' <td class="col-md-1 center">'+r.mrnno+'</td>'	
			+ ' <td class="col-md-1 center">'+r.centerPatientId+'</td>'	
			+ ' <td class="col-md-1 center">'+r.opdipdno+'</td>'	
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editStateMaster('+r.treatId+')>ALLOT BED</button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=reasonTocancell('+r.treatId+')>Cancel Admission</td>'
			+ '</tr>';
			countAuto++;
	 }else if(callFrom === "0"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+countAuto+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].patient_name+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].mobile+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].mrnno+'</td>'	
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].center_patient_id+'</td>'	
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].opdipdno+'</td>'	
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=viewBedWard('+r.lstIpdQueue[0].treatment_id+')>ALLOT BED</button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=reasonTocancell('+r.lstIpdQueue[0].treatment_id+')>Cancel Admission</button></td>'
			+ '</tr>';
			countAuto++;
	 }
	 else if(callFrom === "4"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+countAuto+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].patient_name+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].mobile+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].mrnno+'</td>'	
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].center_patient_id+'</td>'	
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].opdipdno+'</td>'	
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=viewBedWard('+r.lstIpdQueue[0].treatment_id+')>ALLOT BED</button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=reasonTocancell('+r.lstIpdQueue[0].treatment_id+')>Cancel Admission</button></td>'
			+ '</tr>';
			countAuto++;
	 }
	 else if(callFrom === "2"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+countAuto+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].patient_name+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].mobile+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].mrnno+'</td>'	
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].center_patient_id+'</td>'	
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].opdipdno+'</td>'	
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=viewBedWard('+r.lstIpdQueue[0].treatment_id+')>ALLOT BED</button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=reasonTocancell('+r.lstIpdQueue[0].treatment_id+')>Cancel Admission</button></td>'
			+ '</tr>';
			countAuto++;
	 }
	 else{
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+countAuto+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].patient_name+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].mobile+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].mrnno+'</td>'	
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].center_patient_id+'</td>'	
			+ ' <td class="col-md-1 center">'+r.lstIpdQueue[0].opdipdno+'</td>'	
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=viewBedWard('+r.lstIpdQueue[0].treatment_id+')>ALLOT BED</button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=reasonTocancell('+r.lstIpdQueue[0].treatment_id+')>Cancel Admission</button></td>'
			+ '</tr>';
			countAuto++;
	 }
			
	$("#ipdQuepatientDeatilsDetails").html(htm);
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
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getIpdQueue('OPDLIST',"+j+")><a class='page-link'>"+j+"</a></li>";
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
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getIpdQueue('OPDLIST',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : setAutoPatientName
 ******************************************************************************/
function getHitOnEnter(inputID, e)
{
	var callFrom=$("#patSearchType").val();
	
	if(callFrom == 1 || callFrom == 3)
	{
		 var key = e.which;
		 if(key == 13) {
			 //alert("ENTER CLICKED!!!");
			 setAutoPatientName(inputID);
		 }
	}else{
		 setAutoPatientName(inputID);
	}

}

function setAutoPatientName(inputID) {
	
	//alert("DDDDDD")
	
	var callFrom=$("#patSearchType").val();
	
	var resultData = [];
var searchText = $("#" + inputID).val();

if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {

	alert("Please enter search value");
	$("#" + inputID).focus();
	getIpdQueue();
	return false;
}

var unit_id=$('#unitId').val();

var inputs = [];
inputs.push('unit_id=' + unit_id);
inputs.push('findText=' + searchText);

inputs.push('callFrom=' + callFrom);
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/ipdQueue/autoSuggestationIpdQueue",
	cache : false,
	success : function(response) {
		
		if(callFrom == 1 || callFrom == 3)
		{
			if(response.lstIpdQueue.length > 0)
			{
				var patId = response.lstIpdQueue[0].patient_id;
				
				getPatientInfoByPatientId(patId);
			}else{
				alert("No data found!!");
				return false;
			}
		}else{
			
			var template = "";
			
			for ( var j = 0; j < response.lstIpdQueue.length; j++) {
				var arrValue = response.lstIpdQueue[j].patient_id +"-"+response.lstIpdQueue[j].patient_name;
				var idValue = response.lstIpdQueue[j].patient_id;
				var stateName = response.lstIpdQueue[j].patient_name;
				resultData.push({
					ID : idValue,
					Name : stateName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
	
			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();
	
				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	}
});

function displayResult(item) {

	var res = item.text.split('-');
	var patId = res[0];
	var stateName = res[1];		
	getPatientInfoByPatientId(patId);
	$("input#" + inputID).val(patId);
}
}
/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : getPatientInfoByPatientId
 ******************************************************************************/
function getPatientInfoByPatientId(patId){

var unit_id=$('#unitId').val();

var inputs = [];
inputs.push('unit_id=' + unit_id);
inputs.push('findText=' + patId);
inputs.push('callFrom=' + 1);
inputs.push('startIndex=' + 0);
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/ipdQueue/autoSuggestationIpdQueue",
	cache : false,
	success : function(r) {
		setIpdQueuePatientList(r,"search",1);	
	}
});

}

function getIpdQueue(call,pageNumber){
	//alert(call);
	var startIndex = 0;
	var callFrom="All"
	if(call == "All"){
		callFrom="0"
	}else{
		 
		// callFrom= $("#patSearchType1 option:selected").text();
		callFrom= $("#patSearchType1").val();
	}
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var inputs = [];
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdQueue/viewIpdQueue",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setIpdQueuePatientList(r,"All",pageNumber);			
		}
	});
}
/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : getIpdQueuePatientByTreatmentId
 ******************************************************************************/
function getIpdQueuePatientByTreatmentId(treatId){
	var inputs = [];
	inputs.push('treatId=' + treatId);
	inputs.push('startIndex=' + 0);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdQueue/getIpdQueuePatientByTreatmentId",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setIpdQueuePatientList(r,"ById");			
		}
	});
}

function viewBedWard(treatId){
	//window.location.href = "ehat_IPD_BedWard.jsp?treatId=" + treatId;
	window.location.href = "ipd_bed_allocation.jsp?treatId=" + treatId;
}

/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : Get for Final ipd bill patients
 ******************************************************************************/

function autosuggesstionIpdBillPatTempFinalBill(inputId, callfrom) {
	// alert("hi..");
	var finalBill = "finalBill";
	var usertype = "";
	var letter = "";

	if (callfrom = "search") {
		letter = $("#byName").val();
		if ($("#byid").is(':checked')) {

			usertype = "Y";
		} else {
			usertype = "N";
		}
	}

	var findingName = $("#" + inputId).val();

	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('finalBill=' + finalBill);
	var str = inputs.join('&');
	// var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdQueue/autosuggesstionviewIpdbillPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			setIpdbillPatientsTempFinalBill(r);
			// setIpdbillPatTemp(r);
			// autoCompTemp(r,inputId);
		}
	});
}

/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : Get for ipd bill patients
 ******************************************************************************/

function autosuggesstionBillComparisonPatTemp(inputId, callfrom) {
	// alert("hi..");
	var finalBill = "generalBill";
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('finalBill=' + finalBill);
	var str = inputs.join('&');
	// var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdQueue/autosuggesstionviewIpdbillPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			if (letter == "" || letter == " ") {
				getIpdBillPatientsForComparison("ipd");
			} else {
				setIpdbillPatientsTempComparison(r);
			}

			// setIpdbillPatTemp(r);
			// autoCompTemp(r,inputId);
		}
	});
}

/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : Get for ipd bill patients
 ******************************************************************************/

function autosuggesstionIpdBillPatTemp(inputId, callfrom) {
	// alert("hi..");
	var finalBill = "generalBill";
	var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}
	var findingName = $("#" + inputId).val();

	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	inputs.push('finalBill=' + finalBill);
	var str = inputs.join('&');
	// var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdQueue/autosuggesstionviewIpdbillPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			if (letter == "" || letter == " ") {
				getIpdBillPatients("onload", 0);
			} else {
				setIpdbillPatientsTemp(r);
			}

			// setIpdbillPatTemp(r);
			// autoCompTemp(r,inputId);
		}
	});
}
/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : setAutoPatientName
 ******************************************************************************/

function setAutoPatientName_old(inputID) {
	
	var callFrom=$("#patSearchType").val();
	
	var resultData = [];
var searchText = $("#" + inputID).val();

if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {

	alert("Please enter search value");
	$("#" + inputID).focus();
	getIpdQueue();
	return false;
}

var unit_id=1;

var inputs = [];
inputs.push('unit_id=' + unit_id);
inputs.push('findText=' + searchText);

inputs.push('callFrom=' + callFrom);
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/ipdQueue/autosuggesstionviewIpdbillPatients",
	cache : false,
	success : function(response) {

		var template = "";
		
		for ( var j = 0; j < response.lstIpdQueue.length; j++) {
			var arrValue = response.lstIpdQueue[j].patient_id +"-"+response.lstIpdQueue[j].patient_name;
			var idValue = response.lstIpdQueue[j].patient_id;
			var stateName = response.lstIpdQueue[j].patient_name;
			resultData.push({
				ID : idValue,
				Name : stateName
			});
			template = template + '<li data-value="' + idValue
					+ '" class=""><a href="#">' + arrValue + '</a></li>';
		}

		setTimeout(function() {
			$("div#documentByName .typeahead").html(template);
			$("div#documentByName .typeahead").show();

			$("input#" + inputID).typeahead({
				source : resultData,
				displayField : 'Name',
				valueField : 'ID',
				onSelect : displayResult,
				scrollBar : true
			});
			$("input#" + inputID).data('typeahead').source = resultData;
		}, 500);
	}
});

function displayResult(item) {

	var res = item.text.split('-');
	var patId = res[0];
	var stateName = res[1];		
	getPatientInfoByPatientId(patId);
	$("input#" + inputID).val(patId);
}
}

function reasonTocancell(pId, treatId) {

	$("#cancellAdmissionPopUp").modal('show');
	$("#trid").val(pId);
	//$("#pid").val(pId);

}
//Addded By Badrinath Wagh
//For Cancell Admission
function cancelAdmission() {

	var patientId = $("#pid").val();
	var treatmentId = $("#trid").val();
	var narration = $("#narrationid").val();
	var inputs = [];

	inputs.push('patientId=' + 0);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('narration=' + narration);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/cancelAdmission",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			alert(r);
			$("#cancellAdmissionPopUp").hide();
			window.location.reload(true);
		}
	});

}