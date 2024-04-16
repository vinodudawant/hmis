/************
* @author	: Dayanand Khandekar
* @date		: 2-oct-2019
* @codeFor	: get All Self Master Detail
 ************/
function  getAllShelfDoc(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/shelfdoc/getAllShelfDoc",
		error : function() {
			alert('error');
		},
		success : function(r){				
			var divContent = "";
            divContent = divContent
                    + "<select name='Shelf Name' class='col-md-12'><option value='0'>---Select---</option>";
         for ( var i = 0; i < r.lstShelfDoc.length; i++) {            
        	 			divContent = divContent + "<option value='" + r.lstShelfDoc[i].selfDocId + "'  >"
                        + r.lstShelfDoc[i].shelDocName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#shelfID").html(divContent);
        
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 2-oct-2019
* @codeFor	: get PatientDetailsByTreatment
 ************/
function getPatientDetailsByTreatment(treatmentId){		 
	if(treatmentId==""||treatmentId==undefined||treatmentId==null){		 
		refreshPatientDoc();
	       }
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/documentmaster/getPatientDetailsByTreatment",
		data : {
			"treatmentId" : treatmentId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {			
			setViewPatientDocTemp(response);		
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 2-oct-2019
* @codeFor	: set Patient Doc Detail
 ************/
function setPatientDocTemp(r) {	
	$("#patientViewDetails").show();
	$("#patientViewDetails1").hide();
	var htm ="";
	var index = 1;
	
	$("#patientName").val(r.lstDocUpload[0].patientName);
	//alert(r.lstDocUpload.length );
	if(r.lstDocUpload.length > 0)
		{
			for ( var i = 0; i < r.lstDocUpload.length; i++) {				
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'				
				+ "<td class='col-md-1 center'>"+ "<input name='patientdocid' id='"+ (r.lstDocUpload[i].docId)+ "' type='checkbox' class='clsCheckAll'/></td>"		
				+ ' <td class="col-md-1 center" >'+r.lstDocUpload[i].docId+'</td>'
				+ ' <td class="col-md-1 center" id="docname">'+r.lstDocUpload[i].docName+'</td>'	
				+ ' <td class="col-md-1 center">'+r.lstDocUpload[i].folderName+'</td>'	
			/*	+ ' <td class="col-md-1 center">'
				+ '		<button class="btn btn-xs btn-success " onclick=showPatientfDoc('+r.lstDocUpload[i].docId+')><i class="fa fa-eye View"></i></button></td>'*/
				+ '</tr>';
				index++;
				}
		}
	$("#patientDocDetails").html(htm);
}
/************
* @author	: Dayanand Khandekar
* @date		: 3-oct-2019
* @codeFor	: save Patient Doc Detail
 ************/
function savePatientDoc(){
	
	var patientId=$("#patientId").val();
	var patientName=$("#patientName").val();
	var treatmentId="";
	var barcodeId=$("#barcodeId").val();
	var roomID=$("#roomID").val();
	var rackId=$("#rackId").val();
	var shelfID=$("#shelfID").val();
	var filetype=$("#filetype").val();
	var duration=$("#duration").val();
	var userId=$("#userId").val();
	var unitId=$("#unitId").val();	
	var docId = new Array();
	
	if(patientId=="" || patientId==undefined || patientId==null){
		alert("please enter patientId  ");
		
		$("#patientId").focus();					
		return false;
	}	
	if(patientName=="" || patientName==undefined || patientName==null){
		alert("please enter patientName  ");
		
		$("#patientName").focus();					
		return false;
	}		
	if(barcodeId=="" || barcodeId==undefined || barcodeId==null){
		alert("please enter barcode Id ");		
		$("#barcodeId").focus();					
		return false;
	}	
	if(roomID=="" || roomID==undefined || roomID==null ||roomID=='0'){
		alert("please Select roomName  ");
		
		$("#roomID").focus();					
		return false;
	}	
	if(rackId=="" || rackId==undefined || rackId==null ||rackId=='0'){
		alert("Please  Select rackName  ");
		
		$("#rackId").focus();					
		return false;
	}	
	if(shelfID=="" || shelfID==undefined || shelfID==null ||shelfID=='0'){
		alert("Please  Select shelfName ");
		
		$("#shelfID").focus();					
		return false;
	}
	if(filetype=="" || filetype==undefined || filetype==null ||filetype=='0'){
		alert("please enter filetype  ");
		
		$("#filetype").focus();					
		return false;
	}
	if(duration=="" || duration==undefined || duration==null){
		alert("please enter duration  ");
		
		$("#duration").focus();					
		return false;
	}	
	$("input[name='rdTreat']:checked").each(function() {		
		treatmentId=$(this).attr('value');		
	});
		
	if(treatmentId=="" || treatmentId==undefined || treatmentId==null){
		alert("please enter treatmentId  ");		
		$("#treatmentId").focus();					
		return false;
	}
	
	$("input[name='patientdocid']:checked").each(function() {
		docId.push($(this).attr('id'));
	});

	if ((docId.length) == 0) {
		alert("Please check the checkbox to Save Document...");
		return false;
	}
	
	var patientDocId= patientDocId=$("#patientDocId").val();
	//alert("patientDocId..."+patientDocId);
	var requestedBy="";
	var handoverTo="";
	var note="";
	if(patientDocId >0)
    {
				 requestedBy=$("#requestedBy").val();
				 handoverTo=$("#handoverTo").val();
				 var note=$("#note").val();
			 if(requestedBy=="" || requestedBy==undefined || requestedBy==null){
					alert("please enter requestedBy  ");			
					$("#requestedBy").focus();					
					return false;
				}
			 if(handoverTo=="" || handoverTo==undefined || handoverTo==null){
					alert("please enter handoverTo  ");
					
					$("#handoverTo").focus();					
					return false;
				}
			 if(note=="" || note==undefined || note==null){
					alert("please enter note  ");
					
					$("#note").focus();					
					return false;
				}	 
	 }
	
	var inputs = [];
	inputs.push('patientDocId=' + patientDocId);	
	inputs.push('patientId=' + patientId);	
	inputs.push('treatmentId=' +treatmentId );		
	inputs.push('patientName=' + patientName);	
	inputs.push('barcode=' + barcodeId);
	inputs.push('roomID=' + roomID);
	inputs.push('rackId=' + rackId);
	inputs.push('filetype=' + filetype);
	inputs.push('duration=' + duration);
	inputs.push('shelfId=' + shelfID);
	inputs.push('unitId=' + unitId);
	inputs.push('createdBy=' + userId);
	inputs.push('docId=' + docId);	
	inputs.push('requestedBy=' + requestedBy);
	inputs.push('handoverTo=' + handoverTo);
	inputs.push('note=' + note);
   	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/patientdoc/savePatientDoc",
		cache : false,		
		success : function(r) {				
			
			if (r == 1){
				alertify.success("Records Saved Sucessfully");				
			} else if(r == 2){
				alertify.success( "Records Updated Sucessfully");				
			}else if(r == 3){				
				alertify.error("Shelf Size is full");				
			}else if(r == 4){				
				alertify.error("File Is Already Created");				
			}
			else{
				alertify.error("Oops Some Problem Ocured");
			}	
			refreshPatientDoc();
			closeFileUpdationPopUp();
			window.location.href = "dms_file_management.jsp?callFrom='edit'";			
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 10-oct-2019
* @codeFor	: view Patient Doc Detail useing patientId
 ************/
function viewPatientDocDetails(patId,callFrom){
		jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/patientdoc/viewPatientDocDetails",
		data : {
			"patId" : patId,
			"callFrom" : callFrom
			
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response){			
			setViewTreatmentTemp(response);			
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 4-oct-2019
* @codeFor	: set Patient Doc Detail useing patientdocid
 ************/
function viewPatientDocumentTemp(r){
	
		$("#patientViewDetails1").show();
		$("#patientViewDetails").hide();
		$("#patientId").attr('readonly', true);
		$("#treatmentId").attr('readonly', true);
		$("#patientName").attr('readonly', true);
		$("#barcodeId").attr('readonly', true);
		$("#patientId").val( r.lstPatintSalve[0].patientId);
		$("#patientName").val( r.lstPatintSalve[0].patientName);
		var divContent = divContent + "<option value="+r.lstPatintSalve[0].treatmentId+">"+r.lstPatintSalve[0].treatmentId+ "</option>";
		//alert(r.lstPatintSalve[0].treatmentId);
		$("#treatmentId").html(divContent);
		$("#barcodeId").val(r.lstPatintSalve[0].barcode);
		$("#shelfID").val(r.lstPatintSalve[0].shelFId);
	
	var htm ="";
	var index = 1;
	
for ( var i = 0; i < r.lstPatintSalve.length; i++){		
	if(r.lstPatintSalve[i].docId > 0)
	{
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'				
				+ "<td class='col-md-1 center'>"+ "<input name='patientdocid' id='"+ (r.lstPatintSalve[i].docId)+ "' type='checkbox' class='clsCheckAll' checked/></td>"
				+ ' <td class="col-md-1 center" >'+r.lstPatintSalve[i].docId+'</td>'
				+ ' <td class="col-md-1 center" id="docname">'+r.lstPatintSalve[i].docName+'</td>'	
				+ ' <td class="col-md-1 center">'+r.lstPatintSalve[i].folderName+'</td>'	
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success " onclick=deletePatientfDocDetailByDocID('+r.lstPatintSalve[i].docId+')><i class="fa fa-trash-o"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success " onclick=viewPatientfDocDetailByDocID('+r.lstPatintSalve[i].docId+')><i class="fa fa-eye View""></i></button></td>'
				+ '</tr>';
				index++;
	}
	}				
	$("#patientDocDetails1").html(htm);

}
/************
* @author	: Dayanand Khandekar
* @date		: 16-oct-2019
* @codeFor	: check All CheckBoxes
 ************/
function checkAll(){
	
	if($("#chkAll").prop('checked')){
		
		$(".clsCheckAll").prop('checked',true);
	}else{
		
		$(".clsCheckAll").prop('checked',false);
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 4-oct-2019
* @codeFor	: get only Document Upload Treatments Useing Patient Id
 ************/
function getAllPatientTreatmentByPatientId(){
  var patientId=$("#patientId").val(); 
  jQuery.ajax({
		type : "GET",
		url : "ehat/patientdoc/getAllPatientTreatmentByPatientId",
		data : {
			"patientId" : patientId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
             + "<select name='Treatment Name' class='col-md-12'><option value='0'>---Select---</option>";
        for ( var i = 0; i < r.treatlist.length; i++) {                            
                divContent = divContent + "<option value='" + r.treatlist[i]+ "'>"+ r.treatlist[i] + "</option>";
            }
            divContent = divContent + "</select>";
            $("#treatmentId").html(divContent);        
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 5-oct-2019
* @codeFor	: get Patient Doc Detail useing patientId
 ************/
function getAllTreatmentDetailsByPatientId(){
	
	var patientId=$("#patientId").val(); 
	if(patientId==null||patientId==undefined||patientId==""){		 
		refreshPatientDoc();
	}
	jQuery.ajax({
		type : "GET",
		url : "ehat/documentmaster/getAllTreatmentDetailsByPatientId",
		data : {
			"patientId" : patientId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {			
			setPatientDocTemp(r);		
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 7-oct-2019
* @codeFor	: dlete Patient Doc Detail useing docid
 ************/
function deletePatientfDocDetailByDocID(docId){
	
	jQuery.ajax({
		type : "GET",
		url : "ehat/patientdoc/deletePatientfDocDetailByDocID",
		data : {
			"docId" : docId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {			
			alertify.error(r);			
			var patientDocId=$("#patientDocId").val();
			viewPatientDocDetails(patientDocId);			
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 14-oct-2019
* @codeFor	: show DocDetail Pop UP
 ************/
function viewPatientfDocDetailByDocID(docId){
	
	$("#myModal").modal('show');
}
/************
* @author	: Dayanand Khandekar
* @date		: 8-oct-2019
* @codeFor	: set All room Master Detail
 ************/
function  getAllRoomMasterDoc(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/roommsater/getAllRoomMasterDoc",
		error : function() {
			alert('error');
		},
		success : function(r) {
					
			var divContent = "";
            divContent = divContent
             + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
            for ( var i = 0; i < r.lstroomMaster.length; i++){          
               
            	divContent = divContent + "<option value='" + r.lstroomMaster[i].roomId + "' >"+ r.lstroomMaster[i].roomName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#roomID").html(divContent);
            $("#roomID").select2();
		}		
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 8-oct-2019
* @codeFor	: get All rack Master Detail
 ************/
function getAllRackByRoomId(){
	var roomID=$('#roomID').val();	
	jQuery.ajax({
		type : "GET",
		url : "ehat/shelfdoc/getAllRackByRoomId",
		data : {
			"roomID" : roomID
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
           + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
      for ( var i = 0; i < r.lstrackMaster.length; i++){             
                 divContent = divContent + "<option value='" + r.lstrackMaster[i].rackId + "'  >"+ r.lstrackMaster[i].rackName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#rackId").html(divContent);
            $("#rackId").select2();
		}	
	});
  }
/************
* @author	: Dayanand Khandekar
* @date		: 14-oct-2019
* @codeFor	: get All Shelf By  Useing Rack Id
 ************/
function getAllShelfByRackId(){
	
	var rackId=$('#rackId').val();	
	
	jQuery.ajax({
		type : "GET",
		url : "ehat/shelfdoc/getAllShelfByRackId",
		data : {
			"rackId" : rackId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
            for ( var i = 0; i < r.lstShelfDoc.length; i++) {             
               
              divContent = divContent + "<option value='" + r.lstShelfDoc[i].selfDocId + "' >"+ r.lstShelfDoc[i].shelDocName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#shelfID").html(divContent);
            $("#shelfID").select2();
		}	
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 26-Sept-2019
* @codeFor	: set perticular searching pattern
 ************/
function setPatientSearchTypeFM(){
	
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
function setAutoPatientNameFM(inputID,callFrom) {
	
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
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile+"-"+r.lstRegviewDto[j].centerPatientId;
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
					onSelect : displayResultFM,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResultFM(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var centerPatientId = res[3];
		var patName = res[1];
		//var patMobile = res[2];
		$("#patId").html(patId);	
		$("#centerPatientId").html(centerPatientId);	
		$("#patName").html(patName);
		$("#patientId").val(patId);
		$("#patientName").val(patName);
		getAllTreatMentByPatientIdFM(patId);
		$("#" + inputID).val(patName);		
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 26-Sept-2019
* @codeFor	: Get all treatments of patient
 ************/
function getAllTreatMentByPatientIdFM(patId){
	
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
		url : "ehat/patientdoc/getAllTreatMentByPatientId",
		cache : false,		
		success : function(r) {
			
			setTreatmentTemp(r,patId);
		}
	});
}
/************
* @author	: Vinod Udawant
* @date		: 26-Sept-2019
* @codeFor	: Set all treatments of patient
 ************/
function setTreatmentTemp(r,patId){
		if(r.lstDocmaster.length > 0){
	
		var htm ="";
		var index = 1;
		for ( var i = 0; i < r.lstDocmaster.length; i++) {
			
			if(r.lstDocmaster[i].fileStatus=='Y'){
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center" >'+r.lstDocmaster[i].treatmentId+'</td>'
				
				+ ' <td class="col-md-1 center" ><input type="radio" disabled name="rdTreat" onclick="getPatientDetailsByTreatment1('+r.lstDocmaster[i].treatmentId+')" value="'+r.lstDocmaster[i].treatmentId+'"></td>'
				+ ' <td class="col-md-1 center" >File Created</td>'
	
				+ '</tr>';
				index++;
			}else{
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center" >'+r.lstDocmaster[i].treatmentId+'</td>'
				
				+ ' <td class="col-md-1 center" ><input type="radio"  name="rdTreat" onclick="getPatientDetailsByTreatment1('+r.lstDocmaster[i].treatmentId+')" value="'+r.lstDocmaster[i].treatmentId+'"></td>'
				+ ' <td class="col-md-1 center" >Not Yet</td>'
	
				+ '</tr>';
				index++;
			}
		}
		$("#showDocByTeratment").html(htm);			
	}	
}
/************
* @author	: Dayanand Khandekar
* @date		: 15-oct-2019
* @codeFor	: get All Patient Details Using Treatment
 ************/

function getPatientDetailsByTreatment1(treatmentId){
	
	$("#treatmentId").val(treatmentId);
	if(treatmentId==""||treatmentId==undefined||treatmentId==null){
		 refreshPatientDoc();
	}
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/documentmaster/getPatientDetailsByTreatment1",
		data : {
			"treatmentId" : treatmentId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
				
		    setPatientDocTemp1(response);	
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 15-oct-2019
* @codeFor	: set Patient Doc Details
 ************/
function setPatientDocTemp1(r) {
	
	$("#patientViewDetails").show();	
	var htm ="";
	var index = 1;
	
	if(r.lstChecklistDoc.length > 0){
		for ( var i = 0; i < r.lstChecklistDoc.length; i++) {
			
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			
			+ "<td class='col-md-1 center'>"
			+ "<input name='patientdocid' id='"
			+ (r.lstChecklistDoc[i].docId)
			+ "' type='checkbox' class='clsCheckAll'/></td>"
	
			+ ' <td class="col-md-1 center" >'+r.lstChecklistDoc[i].docId+'</td>'
			+ ' <td class="col-md-1 center" id="docname">'+r.lstChecklistDoc[i].docName+'</td>'	
			
			+ '</tr>';
			index++;
		}
		$("#patientDocDetails").html(htm);
	}	
}
/************
* @author	: Dayanand Khandekar
* @date		: 15-oct-2019
* @codeFor	: set Uploaded Doc Details 
 ************/
function setViewTreatmentTemp(r){
		
	//$("#rackId").select2('val',3);
	$("#patientDocId").val(r.lstPatintSalve[0].patientDocId);
	$("#patientId").val(r.lstPatintSalve[0].patientId);
	$("#patientName").val(r.lstPatintSalve[0].patientName);
	$("#treatmentId").val(r.lstPatintSalve[0].treatmentId);
	$("#barcodeId").val(r.lstPatintSalve[0].barcode);
	$("#roomID").select2('val',r.lstPatintSalve[0].roomID);	
	getAllViewRackMasterDoc(r.lstPatintSalve[0].roomID);
	$("#rackId").select2('val',r.lstPatintSalve[0].rackId);
	getAllviewShelfDoc(r.lstPatintSalve[0].rackId);
	$("#shelfID").select2('val',r.lstPatintSalve[0].shelFId);
	$("#filetype").select2('val',r.lstPatintSalve[0].filetype);
	$("#duration").val(r.lstPatintSalve[0].duration);
	
	if(r.lstPatintSalve.length > 0){
		
		var htm ="";
		var index = 1;
		for ( var i = 0; i < r.lstPatintSalve[0].lstPatintMast.length; i++) {
			
			var datetime = new Date(r.lstPatintSalve[0].lstPatintMast[i].createdDate).toLocaleString();
			
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center" >'+r.lstPatintSalve[0].lstPatintMast[i].treatmentId+'</td>'
			+ ' <td class="col-md-1 center" >'+datetime+'</td>';
			if(i==0){
				
				htm = htm + ' <td class="col-md-1 center" ><input type="radio" checked name="rdTreat" onclick="getAllUploadDocDetailBytreatment('+r.lstPatintSalve[0].lstPatintMast[i].treatmentId+')"  value="'+r.lstPatintSalve[0].lstPatintMast[i].treatmentId+'" ></td>';
			}else{
				
				htm = htm + ' <td class="col-md-1 center" ><input type="radio" name="rdTreat" onclick="getAllUploadDocDetailBytreatment('+r.lstPatintSalve[0].lstPatintMast[i].treatmentId+')" value="'+r.lstPatintSalve[0].lstPatintMast[i].treatmentId+'" ></td>';
			}
			htm = htm + '</tr>';
			index++;
		}
		$("#showDocByTeratment").html(htm);	
		$("input[name='rdTreat']:checked").each(function() {
			
			$(this).trigger('click');			
		});
	}	
}

/************
* @author	: Dayanand Khandekar
* @date		: 10-oct-2019
* @codeFor	: show Uploaded Recent Files
 ************/
function showRecentFiles(){
	
	$('#mainDiv').toggle('slow',function() {
		
		var lblButton = $("#lblButton").html();
		
		if(lblButton == "View Recent Files"){
			
			$('#listDiv').show();
			$("#lblButton").html("View File Section");	
			getAllPatientDocumentDetails();
			$('#patSearch').hide();
			$('#fromToDt').show();
			$('#saveFile').hide();
			
		}else{
			
			$('#listDiv').hide();
			$("#lblButton").html("View Recent Files");
			//$("#lblButton").html('data-original-title', "View File Section").tooltip('show');
			$('#patSearch').show();
			$('#fromToDt').hide();
			$('#saveFile').show();
		}				
	});	
}
/************
* @author	: Dayanand Khandekar
* @date		: 10-oct-2019
* @codeFor	: get Patient Doc Details From Date to Date
 ************/
function getAllPatientDocumentDetails(){
   	
	var fdate=	$("#fromDate").val();
	var todate=	$("#toDate").val();	
	
	var str = getDateFormat(fdate, todate); //added by Ajinkya
	var fdate = str.split(':')[0];
	var todate = str.split(':')[1];
	
	var findingName = $("#byName1").val();
	var patSearchType = $("#patSearchType1").val();
	
	var inputs = [];	
	inputs.push('fdate=' + fdate);	
	inputs.push('todate=' + todate);
	
    inputs.push('findText=' + findingName);
    inputs.push('callFrom=' + patSearchType);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/documentmaster/getAllPatientDocDeatil",
		cache : false,		
		success : function(r) {
						
			setPatientDocDetailTemp(r);
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 10-oct-2019
* @codeFor	: set Patient Doc Details From Date to Date
 ************/
function setPatientDocDetailTemp(r) {
	
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstPatintMaster.length; i++) {
		
		var datetime = new Date(r.lstPatintMaster[i].createdDate).toLocaleString();
		htm = htm + '<tr> '
		+ ' <td class="col-md-1 center">'+index+'</td>'
		+ ' <td class="col-md-1 center hidden">'+r.lstPatintMaster[i].patientId+'</td>'
		+ ' <td class="col-md-1 center">'+r.lstPatintMaster[i].centerPatientId+'</td>'
/*		+ ' <td class="col-md-1 center">'+r.lstPatintMaster[i].treatmentId+'</td>'	
*/		+ ' <td class="col-md-2">'+r.lstPatintMaster[i].patientName+'</td>'
		+ ' <td class="col-md-1 center">'+datetime+'</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success editBodyPartMaster" onclick=editPatientDoc('+r.lstPatintMaster[i].patientId+',"onload")><i class="fa fa-eye View"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success editBodyPartMaster" onclick=deletePatientDocByPatientDocId('+r.lstPatintMaster[i].patientDocId+')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;
	}
	$("#viewDocDetails").html(htm);
}
/************
* @author	: Dayanand Khandekar
* @date		: 10-oct-2019
* @codeFor	: edit patient Doc
 ************/
function editPatientDoc(patientId,CallFrom){
	
	window.location.href = "dms_file_management_details.jsp?"+"patientId=" +encodeURIComponent(patientId)+"&CallFrom=" +encodeURIComponent(CallFrom); 
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 10-oct-2019
* @codeFor	: getAllRackMasterDoc
 ************/
function  getAllRackMasterDoc(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/rackmsater/getAllRackMasterDoc",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
            for ( var i = 0; i < r.lstrackMaster.length; i++) {
             
               
                divContent = divContent + "<option value='" + r.lstrackMaster[i].rackId + "'  >"
                        + r.lstrackMaster[i].rackName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#rackId").html(divContent);
            $("#rackId").select2();
		}	
	});
}
function  getAllShelfDoc(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/shelfdoc/getAllShelfDoc",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
            for ( var i = 0; i < r.lstShelfDoc.length; i++) {
             
               
                divContent = divContent + "<option value='" + r.lstShelfDoc[i].selfDocId + "'  >"
                        + r.lstShelfDoc[i].shelDocName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#shelfID").html(divContent);
            $("#shelfID").select2();
		}	
	});
}
function createStoreLocation(){
	
	var storeLoac = $("#roomID option:selected").text()+"/"+$("#rackId option:selected").text()+"/"+$("#shelfID option:selected").text();
	$("#storeLocId").val(storeLoac);
}

/************
* @author	: Dayanand Khandekar
* @date		: 11-oct-2019
* @codeFor	: get All DocCheklist and uploaded doc by perticular treatment  id 
 ************/
function getAllUploadDocDetailBytreatment(treatmentId)
{
		
		$("#treatmentId").val(treatmentId);
		if(treatmentId==""||treatmentId==undefined||treatmentId==null){
			 refreshPatientDoc();
		}
		
		jQuery.ajax({
			type : "POST",
			url : "ehat/documentmaster/getAllUploadDocDetailBytreatment",
			data : {
				"treatmentId" : treatmentId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				
			  setViewPatientDocTemp(r);
			  setViewTreatmentTempDoc(r);
			}
		});
	}

function setViewPatientDocTemp(r) {
	
	$("#patientViewDetails").show();
	
	var htm ="";
	var index = 1;	
	
	for ( var i = 0; i < r.lstChecklistDoc.length; i++) {
		 
		  htm = htm + '<tr> '
	    	 		+ ' <td class="col-md-1 center">'+index+'</td>'		
					+ "<td class='col-md-1 center'>"
					+ "<input name='patientdocid' id='"+ (r.lstChecklistDoc[i].docId)+ "' type='checkbox' class='clsCheckAll'/></td>"
					+ ' <td class="col-md-1 center" >'+r.lstChecklistDoc[i].docId+'</td>'
					+ ' <td class="col-md-1 center" id="docname">'+r.lstChecklistDoc[i].docName+'</td>'	
					+ '</tr>';
					index++;
	 	
	}	
	$("#patientDocDetails").html(htm);
	for( var j = 0; j < r.lstSalve.length; j++){
		 
		$("#"+r.lstSalve[j].docId).prop("checked",true);		
	}
}

function setViewTreatmentTempDoc(r){
	
	$("#patientDocId").val(r.lstSalve[0].patientDocId);
	$("#patientName").val(r.lstSalve[0].patientName);
	//$("#treatmentId").val(r.lstSalve[0].treatmentId);
	$("#barcodeId").val(r.lstSalve[0].barcode);
	$("#roomID").select2('val',r.lstSalve[0].roomID);
	getAllViewRackMasterDoc(r.lstSalve[0].roomID);
	$("#rackId").select2('val',r.lstSalve[0].rackId);
	getAllviewShelfDoc(r.lstSalve[0].rackId);
	$("#shelfID").select2('val',r.lstSalve[0].shelFId);
	$("#filetype").val(r.lstSalve[0].filetype);
	$("#duration").val(r.lstSalve[0].duration);
}
function viewFileUpdation()
{
	$("#fileUpdationDetails").modal('show');

}
function getAllViewRackMasterDoc(roomID){
	
	jQuery.ajax({
		async	: false,
		type : "GET",
		url : "ehat/shelfdoc/getAllRackByRoomId",
		data : {
			"roomID" : roomID
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
            for ( var i = 0; i < r.lstrackMaster.length; i++) {
             
               
                divContent = divContent + "<option value='" + r.lstrackMaster[i].rackId + "'  >"
                        + r.lstrackMaster[i].rackName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#rackId").html(divContent);
            $("#rackId").select2();
		}	
	});
	}
function getAllviewShelfDoc(rackId){	
	jQuery.ajax({
		async	: false,
		type : "GET",
		url : "ehat/shelfdoc/getAllShelfByRackId",
		data : {
			"rackId" : rackId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
            for ( var i = 0; i < r.lstShelfDoc.length; i++) {
             
               
                divContent = divContent + "<option value='" + r.lstShelfDoc[i].selfDocId + "'  >"
                        + r.lstShelfDoc[i].shelDocName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#shelfID").html(divContent);
            $("#shelfID").select2();
		}	
	});
	

}

/************
* @author	: Dayanand Khandekar
* @date		: 2-oct-2019
* @codeFor	: clear All Field After Refresh
 ************/
function refreshPatientDoc(){
	
	$("#treatmentId").val("");
	$("#patientId").val("");
	$("#patId").html("");
	$("#patName").html("");
	$("#byName").val("");
	$("#patientName").val("");
	$("#requestedBy").val("");
	$("#handoverTo").val("");
	$("#note").val("");	
	$("#storeLocId").val("");	
	$("#barcodeId").val("");	
	$("#roomID").select2('val',"0");
	$("#rackId").select2('val',"0");
	$("#shelfID").select2('val',"0");
	$("#filetype").select2('val',"0");
	$("#duration").val("");
	$("#showDocByTeratment").html("");
	$("#patientDocDetails").html("");
}
function closeFileUpdationPopUp()
{
	$("#fileUpdationDetails").modal('hide');

}
function deletePatientDocByPatientDocId(patientDocId)
{
	var r = confirm("Are You Sure You Want To Delete Folder");
	if (r == true) {
		jQuery.ajax({
			type : "GET",
			url : "ehat/documentmaster/deletePatientDocByPatientDocId",
			data : {
				"patientDocId" : patientDocId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				//refreshFolderDoc();
				getAllPatientDocumentDetails();
			}
		});
	}

}
function mrdBarcodePopUp(){
	
	var patIdVal = $("#byName").val();
	if(patIdVal=='' || patIdVal == undefined || patIdVal == null || patIdVal =="null" || patIdVal == "undefined"){
			
		alert("Please Select Patient First");
		return false;
		
	}else{
		
		var treatId = $("input[name='rdTreat']:checked").val()
		if(treatId=='' || treatId == undefined || treatId == null || treatId =="null" || treatId == "undefined"){
			
			alert("Please Select Treatment First");
			return false;
		}else{
			
			$("#iPopUp2").modal('show');
		}	
	}	
}

function barcodePrintCard(){
	
	var treatmentId=0;
	$("input[name='rdTreat']:checked").each(function() {
		
		treatmentId=$(this).attr('value');		
	});
	
	var noOfBarcode=$("#noOfBarCode").val();
	
	if(noOfBarcode==0 || noOfBarcode==""){
			
		alert("please enter atleast one barcode");
		return false;
	}	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : {
			"treatmentId" : treatmentId
		},
		url : "ehat/documentmaster/fetchPatientsRecordByTreatmentIdForBarcode",
		success : function(r) {			
			var ptName=r.lstDocmaster[0].patientName;
 			var OpdIpdNo=r.lstDocmaster[0].opdipdno;	 			
 			var age=r.lstDocmaster[0].patientAge;
 			var patientId =r.lstDocmaster[0].patId;
 			var treatId=r.lstDocmaster[0].treatmentId;	 			
 			var type="hori";
 			$("#barcodeId").val(treatId);	
 			window.open("ehat_mrd_barcode.jsp?masterId="+patientId+"&count="+noOfBarcode+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo+"&age="+age+"&type="+type );
 			closePrintBarcodePopUp();
		}
	});
}
function closePrintBarcodePopUp(){
	
	$("#iPopUp2").modal('hide');
	$("#noOfBarCode").val("");	
}
function getCountDetailOfDMSAndMRD()
{
	var fdate=	$("#fromDate").val();
	var todate=	$("#lastDate").val();	
	var inputs = [];	
	inputs.push('fdate=' + fdate);	
	inputs.push('todate=' + todate);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/patientdoc/getCountDetailOfDMSAndMRD",
		cache : false,		
		success : function(r) {
			
			 showGraphs(r);			
		}
	});

}
/************
* @author	: Vinod Udawant
* @date		: 16-oct-2019
* @codeFor	: Create Finance Graphs
*************/
function showGraphs(r){
		
	var fileCreatedCount = r.lstCount[0];
	var fileDeletedCount = r.lstCount[1];
	var fileEditedCount = r.lstCount[2];
	
	var barChartData = {
		labels : ["File Created","File Edited","File Deleted"],
		datasets : [
			{
				fillColor : "rgba(233, 78, 2, 0.9)",
				strokeColor : "rgba(233, 78, 2, 0.9)",
				highlightFill: "#e94e02",
				highlightStroke: "#e94e02",
				data : [fileCreatedCount,fileEditedCount,fileDeletedCount]
			},
			{
				fillColor : "rgba(79, 82, 186, 0.9)",
				strokeColor : "rgba(79, 82, 186, 0.9)",
				highlightFill: "#4F52BA",
				highlightStroke: "#4F52BA",
				data : [fileCreatedCount,fileEditedCount,fileDeletedCount]
			},
			{
				fillColor : "rgba(242, 179, 63, 1)",
				strokeColor : "rgba(242, 179, 63, 1)",
				highlightFill: "#F2B33F",
				highlightStroke: "#F2B33F",
				data : [fileCreatedCount,fileEditedCount,fileDeletedCount]
			}
		]			
	};
		
	var uploadedDocCount=r.lstCount[3];
	var deletedDocCount=r.lstCount[4];
	
	var lineChartData = {
		labels : ["Document Uploaded","Document Deleted"],
		datasets : [
			{
				fillColor : "rgba(242, 179, 63, 1)",
				strokeColor : "#F2B33F",
				pointColor : "rgba(242, 179, 63, 1)",
				pointStrokeColor : "#fff",
				data : [uploadedDocCount,0]

			},
			{
				fillColor : "rgba(97, 100, 193, 1)",
				strokeColor : "#6164C1",
				pointColor : "rgba(97, 100, 193,1)",
				pointStrokeColor : "#9358ac",
				data : [0,deletedDocCount]
			}
		]			
	};
	
	new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);
	new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
	
	var htm="<tr>" 
		   + "<td>"+r.lstCount[0]+"</td>" 
			+ "<td>"+r.lstCount[2]+"</td> "
			+ "<td>"+r.lstCount[1]+"</td> "
			+ "<td>"+r.lstCount[3]+"</td> "
			+ "<td>"+r.lstCount[4]+"</td> "
			+ "</tr> " ;
	
	$("#hisabDetails").html(htm);	
}
function getTreatMentCount(){
	
	var treatmentId = 0;
	$("input[name='rdTreat']:checked").each(function() {		
		treatmentId=$(this).attr('value');		
	});
	
	if(treatmentId=="" || treatmentId==undefined || treatmentId==null){
		alert("please enter treatmentId  ");		
		$("#treatmentId").focus();					
		return false;
	}
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : {
			"treatmentId" : treatmentId
		},
		url : "ehat/patientdoc/getTreatMentCount",
		success : function(r) {
			
			if(r==0){
				savePatientDoc();
			}else{
				alertify.error("File already created");
			}
		}
	});
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
			
			 getAllPatientDocumentDetails();
		 }
	}else{
		getAllPatientDocumentDetails();
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