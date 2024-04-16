/************
* @author	: Dayanand Khandekar
* @date		: 26-Sept-2019
* @codeFor	: show Pop up message
 ************/
function showInformation(patientId,treatmentId,folderId,folderName){		
	$("#ifile").val('');
	$('#prgBar').text('');
	$('#prgBar').css('width','0%');
	$("#hdPatientId").val(patientId);
	$("#hdTreatmentId").val(treatmentId);
	$("#hdFolderId").val(folderId);
	$("#hdFolderName").val(decodeURI(folderName));
	$("#myModal").modal('show');
	getPatientDocumentDetails("byFolder");	
}
/************
* @author	: Dayanand Khandekar
* @date		: 26-Sept-2019
* @codeFor	: set perticular searching pattern
 ************/
function setPatientSearchType1(){	
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
/************
* @author	: Dayanand Khandekar
* @date		: 26-Sept-2019
* @codeFor	: autosuggestion for getting Registration People
 ************/
function setAutoPatientName1(inputID,callFrom) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var patDeptType =  $("input[name='rdDept']:checked").val();
	
	if(patDeptType == 1){
		
		callFrom = "opd";
	}else if(patDeptType == 2){
		
		callFrom = "ipd";
	}else{
		
		callFrom = "reg";
	}
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('patSearchType=' + patSearchType);		
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
			for ( var j = 0; j < r.lstRegviewDto.length; j++){
				
				var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile+"-"+r.lstRegviewDto[j].centerPatientId;
				var idValue = r.lstRegviewDto[j].ptId;
				//var idValue = r.lstRegviewDto[j].centerPatientId;
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
					onSelect : displayResult11,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult11(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		var centerPatientId = res[3];
		//var patMobile = res[2];
		$("#patId").html(patId);	
		$("#centerPatientId").html(centerPatientId);		
		$("#patName").html(patName);
		getAllTreatMentByPatientId(patId);
		$("#" + inputID).val(patName);		
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 26-Sept-2019
* @codeFor	: Get all treatments of patient
 ************/
function getAllTreatMentByPatientId(patId){	
	var callFrom="all";
	var deparId =  $("input[name='rdDept']:checked").val();	
	var inputs = [];	
	inputs.push('deparId=' + deparId);	
	inputs.push('patId=' + patId);		
	inputs.push('callFrom=' + callFrom);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/documentmaster/getAllTreatMentByPatientId",
		cache : false,		
		success : function(r) {			
			setTreeTemp(r,patId);
		}
	});
}
/************
* @author	: Vinod Udawant
* @date		: 26-Sept-2019
* @codeFor	: Set all treatments of patient
 ************/
function setTreeTemp(r,patId){
	
	if(r.lstDocmaster.length > 0){

		var htm = '';
		for(var i = 0; i < r.lstDocmaster.length; i++){
			
			var treatId = "Treatment - "+r.lstDocmaster[i].treatmentId;
			var deptId = r.lstDocmaster[i].departmentId;
			
			htm = htm +' <li><span class="drop"><b>'+treatId+'</b></span>'			
		    		  +'	<ul class="nested"> ';
		 for(var k=0; k < r.lstDocmaster[0].lstFoldermaster.length; k++){
					
				 var folderDeptId = r.lstDocmaster[0].lstFoldermaster[k].departMent;
				 if(deptId == folderDeptId){					 
					 var folderId = r.lstDocmaster[0].lstFoldermaster[k].folderId;
					 var folderName = r.lstDocmaster[0].lstFoldermaster[k].folderName;
					 var viewBtn = '<button style="padding:2px 6px" type="button" class="btn btn-success pull-right editUserAccess" id="btnView'+i+'" onclick=setPatTreatId('+r.lstDocmaster[i].treatmentId+','+patId+','+folderId+')><i class="fa fa-eye view" style="font-size:12px;color:white"></i></button>&nbsp&nbsp&nbsp&nbsp';
					 var addBtn = '<button style="padding:2px 6px;margin-right:2px" type="button" class="btn btn-success pull-right editUserAccess" id="btnAdd'+i+'" onclick=showInformation('+patId+','+r.lstDocmaster[i].treatmentId+','+folderId+',"'+encodeURIComponent(folderName)+'")><i class="fa fa-plus" style="font-size:12px;color:white"></i></button>&nbsp&nbsp&nbsp&nbsp';
						
					 htm = htm +' <li>'+r.lstDocmaster[0].lstFoldermaster[k].folderName+' '+viewBtn+' '+addBtn+'</li> ';
				 }				 
			 }
			htm = htm +'	</ul>'
					  +'</li> ';					
		}
		$("#folderTree").html(htm);
		
		var toggler = document.getElementsByClassName("drop");
		var i;		
		for (i = 0; i < toggler.length; i++) {
		  toggler[i].addEventListener("click", function(){
		    this.parentElement.querySelector(".nested").classList.toggle("active");
		    this.classList.toggle("drop-down");
		  });
		}
	}
}
/************
* @author	: Vinod Udawant
* @date		: 28-Sept-2017
* @codeFor	: Set patient & treatment id in hidden
 ************/
function setPatTreatId(treatId,patId,folderId){	
	$("#hdPatientId").val(patId);
	$("#hdTreatmentId").val(treatId);
	$("#hdFolderId").val(folderId);
	getPatientDocumentDetails("byFolder");		
}
/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Set preview of file
 ************/
//changed by Akshata
function setPreviewDoc(docPath){	
	$("#preview").attr("border","1px solid lightgray");
	$("#preview").attr("src","ehat/documentmaster/readDocPath?docPath="+docPath);
	/*$("#preview").attr("src",
	"");
	$("#preview").attr("border", "1px solid lightgray");
	$("#preview").attr("src",
			"ehat/documentmaster/readDocPath?docPath=" + docPath);
	
	if(docPath.split("%")[1]!='docx' && docPath.split("%")[1]!='xls' && docPath.split("%")[1]!='exe'){
		$("#md3").modal('show');
	}*/
}
/************
* @author	: Dayanand Khandekar
* @date		: 27-Sept-2019
* @codeFor	: get PatientDocumentDetails 
 ************/
function getPatientDocumentDetails(callform){   	
	var fdate=	$("#fromDate").val();
	var todate=	$("#toDate").val();	
	
	var str = getDateFormat(fdate, todate); //added by Ajinkya
	var fdate = str.split(':')[0];
	var todate = str.split(':')[1];
	
	var patId=0;
	var treatId=0;
	var folderId=0;	
	if(callform=="bytreatment" || callform=="byFolder"){		
		patId = $("#hdPatientId").val();
		treatId = $("#hdTreatmentId").val();
		folderId = $("#hdFolderId").val();;
	}	
	var userId = $("#userId").val(); 
	var unitId = $("#unitId").val();
	
	var findingName = $("#byName1").val();
	var patSearchType = $("#patSearchType1").val();
	
	var inputs = [];	
	inputs.push('fdate=' + fdate);	
	inputs.push('todate=' + todate);
	inputs.push('patientId=' + patId);	
    inputs.push('treatmentId=' + treatId);
    inputs.push('folderId=' + folderId);
    inputs.push('createdBy=' + userId);	
	inputs.push('unitId=' + unitId);
	inputs.push('callform=' + callform);
	
    inputs.push('findText=' + findingName);
    inputs.push('callFrom=' + patSearchType);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/documentmaster/getPatientDocDeatil",
		cache : false,		
		success : function(r) {
			
			if(callform=="recent"){				
				setPatientDocDeatil(r);
			}else{				
				setTrementWiseDocTemonPopUp(r);
				showDocTempByTreatMent(r);				
			}		
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 27-Sept-2019
* @codeFor	: set PatientDocumentDetails 
 ************/
/*function setPatientDocDeatil(response){	
	var index = 1;
	var htm = "";
	for ( var i = 0; i < response.lstDocUpload.length; i++) {		
				var datetime = new Date(response.lstDocUpload[i].createdDateTime).toLocaleString();
				htm = htm
						+'<tr>'
						+'	<td class="col-md-1 center">'+index+'</td>'
						+'	<td class="col-md-1 center hidden">'+response.lstDocUpload[i].patientId+'</td>'
						+'	<td class="col-md-1 center">'+response.lstDocUpload[i].centerPatientId+'</td>'
						+'	<td class="col-md-2">'+response.lstDocUpload[i].patientName+'</td>'																	
						+'	<td class="col-md-1 center">'+datetime+'</td>'
						+'	<td class="col-md-1 center">'+response.lstDocUpload[i].docName+'</td>'
						+"<td class='col-sm-1-1 center'style='height: 21.5px;'>"
						+ "<button class='btn btn-xs btn-success deleteChargesMaster' onclick='deleteDocDetailsByDocId("
						+ response.lstDocUpload[i].docId
						+ ")' ><i class='fa fa-trash-o fa-1x deleteBtn'></i></button></td>"
						+'</tr>';
				index++;
	}
	$("#viewDocDetails").html(htm);	
}*/


function setPatientDocDeatil(response) {
    // Group entries by patientId
    var groupedByPatient = {};
    for (var i = 0; i < response.lstDocUpload.length; i++) {
        var patientId = response.lstDocUpload[i].patientId;
        if (!groupedByPatient[patientId]) {
            groupedByPatient[patientId] = [];
        }
        groupedByPatient[patientId].push(response.lstDocUpload[i]);
    }

    // Process grouped entries
    var htm = "";
    var index =0;
    for (var patientId in groupedByPatient) {
        if (groupedByPatient.hasOwnProperty(patientId)) {
            var entries = groupedByPatient[patientId];
 
            // Create a table for other columns
            index++;
            var tableHtml = '<table>'
                + '<tr>'
                + '    <td class="col-md-1 center">' + index + '</td>'
                + '    <td class="col-md-1 center hidden">' + entries[0].patientId + '</td>'
                + '    <td class="col-md-1 center">' + entries[0].centerPatientId + '</td>'
                + '    <td class="col-md-2">' + entries[0].patientName + '</td>'
                + '    <td class="col-md-1 center">'
                + '        <select class="form-control">';
            
            // Create dropdown options for docName column
            for (var j = 0; j < entries.length; j++) {
                var optionText = generateOptionText(entries[j]);
                tableHtml += '<option value="' + entries[j].docId + '">' + optionText + '</option>';
            }
            
            tableHtml += '</select>'
                + '    </td>'
                + '    <td class="col-sm-1-1 center" style="height: 21.5px;">'
                + '        <button class="btn btn-xs btn-success deleteChargesMaster" onclick="deleteDocDetailsByDocId('
                + entries[0].docId
                + ')">'
                + '            <i class="fa fa-trash-o fa-1x deleteBtn"></i>'
                + '        </button>'
                + '    </td>'
                + '</tr>'
                + '</table>';
            
            htm += tableHtml;
        }
    }

    $("#viewDocDetails").html(htm);
}

function generateOptionText(entry) {
    return new Date(entry.createdDateTime).toLocaleString() + ' - ' + entry.docName;
}    
/************
* @author	: Dayanand Khandekar
* @date		: 27-Sept-2019
* @codeFor	: save PatientDocumentDetails 
 ************/
function savePatientDocument(){
	
	var doc = $("#ifile").val(); 
	var patId = $("#hdPatientId").val();
	var tid = $("#hdTreatmentId").val();
	var folderId = $("#hdFolderId").val();
	var folderName = $("#hdFolderName").val();
	var userId = $("#userId").val(); 
	var unitId = $("#unitId").val();	
	var files = $('#ifile').prop("files");
	var docPath = "";
	
	if (doc == "") {   
		alert("Please select file first ");   
		return false;
	} 
	var docDetails = {   
		lstDocUpload : []
	};
    for (var i = 0; i < files.length; ++i) {        
    	docPath = folderName+"\\PatId-"+patId+"\\TreatId-"+tid+"\\" + files[i].name;

    	docDetails.lstDocUpload.push({
    		patientId:patId,
    		treatmentId:tid,
    		unitId:unitId,
    		deleted : "N",
    		docName : files[i].name,
    		folderId :folderId,
    		docPath :docPath,
    		createdBy:userId    		
    	});    	
    }
    docDetails = JSON.stringify(docDetails);
	var inputs = [];	
	inputs.push('docDetails=' + encodeURIComponent(docDetails));	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/documentmaster/savePatientDocument",
		cache : false,		
		success : function(r) {			
			if(r>0){				
				alertify.success("document saved successfully");
				$("#ifile").val(''); 
				$('#prgBar').text('');
				$('#prgBar').css('width','0%');
				getPatientDocumentDetails("byFolder");	
			}					
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 30-Sept-2019
* @codeFor	: set PatientDocumentDetails  on pop up
 ************/
function setTrementWiseDocTemonPopUp(response){	
	var index = 1;
	var htm = "";	
	for ( var i = 0; i < response.lstDocUpload.length; i++){		
				 htm=htm
						+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ index
						+ "</td>"
						+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'>"
						+ response.lstDocUpload[i].docName
						+ "</td>"
						
						/*+"<td class='col-sm-1-1 center'style='height: 21.5px;'>"
						+ "<button class='btn btn-xs btn-success editUserAccess' onclick='viewDocDetails("
						+ response.lstDocUpload[i].docId
						+ ")' ><i class='fa fa-eye View'></i></button></td>"*/
						
						+"<td class='col-sm-1-1 center'style='height: 21.5px;'>"
						+ "<button class='btn btn-xs btn-success deleteChargesMaster' onclick='deleteDocDetails("
						+ response.lstDocUpload[i].docId
						+ ")' ><i class='fa fa-trash-o fa-1x deleteBtn'></i></button></td>"
					
				index++;
	}

	$("#viewDoctratment").html(htm);	
}

/************
* @author	: Dayanand Khandekar
* @date		: 30-Sept-2019
* @codeFor	: show recent PatientDocumentDetails 
 ************/
function showRecentDoc(){	
	$('#mainDiv').toggle('slow',function(){		
		var lblButton = $("#lblButton").html();		
		if(lblButton == "View Recent Upload"){			
			$('#listDiv').show();
			$("#lblButton").html("View Upload Section");
			getPatientDocumentDetails("recent");
			$('#patSearch').hide();
			$('#fromToDt').show();
			
		}else{			
			$('#listDiv').hide();
			$("#lblButton").html("View Recent Upload");
			$('#patSearch').show();
			$('#fromToDt').hide();
		}				
	});	
}

/************
* @author	: Dayanand Khandekar
* @date		: 30-Sept-2019
* @codeFor	: show PatientDocumentDetails  treatmentwise
 ************/
function showDocTempByTreatMent(response){

	var index = 1;
	var htm = "";	
	for ( var i = 0; i < response.lstDocUpload.length; i++){		
				var datetime = new Date(response.lstDocUpload[i].createdDateTime).toLocaleString();
				htm=htm	+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
						+ index
						+ "</td>"
						+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'><a style='cursor:pointer' data-original-title='Click For Preview' class='tip-focus' onclick=setPreviewDoc('"+encodeURIComponent(response.lstDocUpload[i].docPath)+"')>"
						+ response.lstDocUpload[i].docName+ "</td>"				
						+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'>"+ datetime+ "</td>"				
						+"<td class='col-sm-1-1 center'style='height: 21.5px;'>"
						+ "<button class='btn btn-xs btn-success editUserAccess' onclick='deleteDocDetails("
						+ response.lstDocUpload[i].docId+ ")' ><i class='fa fa-trash-o fa-1x deleteBtn'></i></button></td>"
				index++;
	}
	$("#showDocByTeratment").html(htm);
}
/************
* @author	: Dayanand Khandekar
* @date		: 30-Sept-2019
* @codeFor	: delete Document By Doc Id
 ************/
function deleteDocDetails(docId){   	
   	var r = confirm("Are You Sure You Want To Delete Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/documentmaster/deleteDocDetails",
			data : {
				"docId" : docId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response){
				alertify.error(response);				
				getPatientDocumentDetails("byFolder");				
			}
		});
	}   	
}

function uploadFile() {
	
	var folderName = $("#hdFolderName").val()+"\\PatId-"+$("#hdPatientId").val()+"\\TreatId-"+$("#hdTreatmentId").val();
	
	/*var data = new FormData();
	data.append('folderName', folderName);
	jQuery.each(jQuery('#ifile')[0].files, function(i, file) {
	    data.append('file-'+i, file);
	});
	
	$.ajax({
      url : 'UplodDocMasterServlet',
      type : 'POST',
      data : data,
      enctype: 'multipart/form-data',
      method: 'POST',
      cache : false,
      contentType : false,
      processData : false,
      xhr: function(){
        //Get XmlHttpRequest object
         var xhr = $.ajaxSettings.xhr() ;
        
        //Set onprogress event handler 
         xhr.upload.onprogress = function(event){
          	var perc = Math.round((event.loaded / event.total) * 100);
          	$('#prgBar').text(perc + '%');
          	$('#prgBar').css('width',perc + '%');
         };
         return xhr ;
    	},
    	beforeSend: function( xhr ) {
    		//Reset alert message and progress bar
    		$('#alertMsg').text('');
    		$('#progressBar').text('');
    		$('#progressBar').css('width','0%');
        }
    });*/
	
	var form = $('#dcfileUploadfrm')[0];	 
	if( document.getElementById("ifile").files.length == 0 ){
	    alert("Please select file");
	    return false;
	}	
	var data = new FormData(form);
	data.append("folderName", folderName);
		
	jQuery.ajax({                   
		async 		: false,                   
		type 		: "POST",
		enctype		: 'multipart/form-data',
		processData	: false,
	    contentType	: false,
		data 		: data,
		url 		: "ehat/uploadDoc/uploadDmsDoc",                   
		timeout 	: 1000 * 60 * 5,                   
		catche 		: false,                    
		error 		: function() {                                            
			 alert("Network Issue");
		},                   
		xhr			: function(){
			//Get XmlHttpRequest object
			var xhr = $.ajaxSettings.xhr();	        
	        //Set onprogress event handler 
	        xhr.upload.onprogress = function(event){
	          	var perc = Math.round((event.loaded / event.total) * 100);
	          	$('#prgBar').text(perc + '%');
	          	$('#prgBar').css('width',perc + '%');
	        };
	        return xhr;
	    },
	    beforeSend: function( xhr ){
    		//Reset alert message and progress bar
    		$('#alertMsg').text('');
    		$('#progressBar').text('');
    		$('#progressBar').css('width','0%');
        }                  
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 30-Sept-2019
* @codeFor	: delete Document By Doc Id
 ************/
function deleteDocDetailsByDocId(docId){
   	
   	var r = confirm("Are You Sure You Want To Delete Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/documentmaster/deleteDocDetails",
			data : {
				"docId" : docId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);				
				getPatientDocumentDetails("recent");				
			}
		});
	}   	
}

function setAutoPatientMrd(inputID,callFrom,e) {
	
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
			
			 getPatientDocumentDetails('recent');
		 }
	}else{
		getPatientDocumentDetails('recent');
	}
	
}



function setPatientSearchType(){
	
	$("#byName1").val("");
	var patSearchType = $("#patSearchType1").val();
	
	if(patSearchType == 1){
		
		$("#byName1").attr("placeholder", "Type Patient UHID Here");
		$("#byName1").removeAttr("minlength");
		$("#byName1").removeAttr("maxlength");
		
	}else if(patSearchType == 2){
		
		$("#byName1").attr("placeholder", "Type Patient Name Here");
		$("#byName1").removeAttr("minlength");
		$("#byName1").removeAttr("maxlength");
		
	}else if(patSearchType == 3){
		
		$("#byName1").attr("placeholder", "Type Patient Mobile Here");
		$("#byName1").attr("minlength", "10");
		$("#byName1").attr("maxlength", "10");
		
	}else if(patSearchType == 4){
		
		$("#byName1").attr("placeholder", "Type Patient AddharNo Here");
		$("#byName1").attr("minlength", "12");
		$("#byName1").attr("maxlength", "12");
	}
}

//Add By Ajinkya
function getDateFormat(fdate, tdate)
{
	farr = fdate.split('/');
	tarr = tdate.split('/');
	
	fdate = farr[2]+'-'+farr[1]+'-'+farr[0];
	tdate = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	return fdate+':'+tdate;
}