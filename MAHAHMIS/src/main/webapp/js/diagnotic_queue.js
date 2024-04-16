function setPatientSearchType(){
	
	$("#patientopd").val("");
	var patSearchType = $("#selectsearchopd").val();
	
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
	var patSearchType = $("#selectsearchopd").val();
	
	if(patSearchType == 1){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var patientId = $("#patientopd").val();
			if(patientId == "")
				patientId = 0;
			fetchOpdQueuePatient(patientId,'-','-',1);
		 }
		 return false;  
		
	}else if(patSearchType == 3){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var mobile = $("#patientopd").val();
			fetchOpdQueuePatient(0,mobile,'-',1);
		 }
		 return false;  
		 
	}else if(patSearchType == 4){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var addhar = $("#patientopd").val();
			fetchOpdQueuePatient(0,'-',addhar,1);
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
				
			fetchOpdQueuePatient(patId,'-','-',1);
			
			$("#patientopd").val("");
		}
	}
}

function fetchOpdQueuePatient(patientId,mobile,adharcardNo,pageNumber) {
	
	var startIndex = 0;
	var patientName = "-";
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
		
	/*var searchType = $("#selectsearchopd").val();
	if(searchType == 1){
		patientId = $("#patientopd").val();
	}else if(searchType == 2){
		patientName = $("#patientopd").val();
	}else{
		
	}*/
		
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('patientName=' + patientName);
	inputs.push('mobile=' + mobile);
	inputs.push('adharcardNo=' + adharcardNo);
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdqueue/getAllDiagQueuePatient",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r.listOpdQueManagmentViewDto.length > 0){
				
				setOpdQueuePatient(r,pageNumber);
				$("#unitCountOpd").text(r.listOpdQueManagmentViewDto[0].opdQueueCount);
			}else{
				
				$("#tbodyOpdQueuePatient").html("");
				alertify.error("Record Not Found...");
			}			
		}
	});
}
function setOpdQueuePatient(r,pageNumber) {
	var countAuto = (pageNumber - 1) + '1';
	countAuto = Number(countAuto);
	var htm = "";
	var cnt=0;
	//var opdcount=$("#unitCountOpd").text();
	
	var meeshaFlow=$("#meeshaFlow").val();
		
	for (var i = 0; i < r.listOpdQueManagmentViewDto.length; i++) {
		var datetime= new Date(r.listOpdQueManagmentViewDto[i].createdDateTime).toLocaleString();
 		htm = htm   
 			+ '<tr>'
			 
			+ '<td  class="" id="patientId'
			+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (countAuto)
			+ ' <span class="tiptipClass" title="your tooltip text here"> </td>'

			+ '<td  class="" id="name '
			+ r.listOpdQueManagmentViewDto[i].patientId + '">'
			+ (r.listOpdQueManagmentViewDto[i].patientName) + ' </td>'

			/*+ '<td class="col-md-1" id="patientId'
			+ r.listOpdQueManagmentViewDto[i].patientId + '">'
			+ (patId) + '</td>'*/
			
			+ '<td class="" id="patientId'
			+ r.listOpdQueManagmentViewDto[i].patientId + '">'
			+ (r.listOpdQueManagmentViewDto[i].centerPatientId) + '</td>'

			+ '<td class="" id="mobile'
			+ r.listOpdQueManagmentViewDto[i].patientId + '">'
			+ (r.listOpdQueManagmentViewDto[i].mobile) + ' </td>'

			+ '<td class="" id="AppDate'
			+ r.listOpdQueManagmentViewDto[i].patientId + '">' + (datetime)
			+ ' </td>'
			
			+ '<td id="toptip"  data-toggle="tooltip" data-placement="top" title="'+r.listOpdQueManagmentViewDto[i].doctorName+'" animation: true class="col-md-2" id="token'
			+ r.listOpdQueManagmentViewDto[i].patientId + '">'
			+ (r.listOpdQueManagmentViewDto[i].opdipdno) + ' </td>'
			
			/*+ "<td class='numeric '>"
			+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
			+ r.listOpdQueManagmentViewDto[i].patientId
			+ ","
			+ cnt
			+ ","
			+ r.listOpdQueManagmentViewDto[i].treatmentId 
			+ ") /></td> "*/
				 
			+ '<td class="" style="height: 21.5px;" >'
			+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="actionDashBoard('
			+ r.listOpdQueManagmentViewDto[i].treatmentId
			+ ')" type="button"  ></button>' + '</td>'
			
			+ '<td style="display:none"> '
			+ '<input type="hidden" id="patientId'+r.listOpdQueManagmentViewDto[i].treatmentId+'" value="'+r.listOpdQueManagmentViewDto[i].patientId+'"> '
			+ '<input type="hidden" id="treatmentId'+r.listOpdQueManagmentViewDto[i].treatmentId+'" value="'+r.listOpdQueManagmentViewDto[i].treatmentId+'"> '
			+ '</td>'
			+ '</tr>';
				
		cnt++;
		countAuto++;
	}
    var numberOfRows="";
    var indexopd=1;
    var opdcount = r.diagCount;
    var numberOfPages=(opdcount/10);
    var displayPagination=numberOfPages;
    var countopdpage=$("#countopdpage").val();
    if(countopdpage == null || countopdpage == undefined || countopdpage == "")
    	{
    var numberOfPages=(opdcount/10);
    var displayPagination=numberOfPages;            
    if(numberOfPages > 5){
        numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
        displayPagination=5;
    }
    for(var j=0;j<displayPagination;j++){
    		if(j == 0)
    		{
    	        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=fetchOpdQueuePatient(0,'-','-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

    		}
    		else
    		{
    	        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=fetchOpdQueuePatient(0,'-','-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
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
	$("#tbodyOpdQueuePatient").html(htm);
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

function actionDashBoard(treatmentId){
	
	window.location.href = "ehat_opd_billing.jsp?treatmentId="+treatmentId;
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

function opdLEDScreen(){
	
	var specialityId = $("#drDeptId").val();
	var data = $("#drDeptId").select2('data');
	var specialityName = data.text;
	if(specialityId == "undefined" || specialityId == undefined || specialityId == undefined || specialityId == 0){
		alert("Please select speciality"); 
		return false;
	}
	window.open("help_desk_opd_queue.jsp?specialityId="+specialityId+"&specialityName="+specialityName);
}

function opdQueueStatusUpdate(callFrom,trId){

	var inputs = [];
	var patientId = $('#patientId'+trId).val();
	var narration = "";
	var treatmentId = $('#treatmentId'+trId).val();
	var specialityId = $('#specialityId'+trId).val();
	var doctorId = $('#doctorId'+trId).val();
	var unitId = $('#unitId').val();
	var userId = $('#userId').val();
	
	/*if(callFrom == "cancel"){
		
		narration = $('#cancelNarration'+trId).val();
	}*/
	
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('specialityId=' + specialityId);
	inputs.push('doctorId=' + doctorId);
	inputs.push('callFrom=' + callFrom);
	inputs.push('narration=' + narration);
	inputs.push('unitId=' + unitId);
	inputs.push('userId=' + userId);
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
				alert("Patient Send Form Queue Successfully");
			}else{
				alert("Network Issues...");
			}
			fetchOpdQueuePatient(0,'-','-',1);
		}
	});
}
