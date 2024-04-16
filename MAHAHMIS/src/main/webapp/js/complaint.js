function GetNextTicketID() {
	var inputs = [];
	inputs.push('action=getNextTicketID');
	inputs.push('tableName=complaintmaster');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ComplaintServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#TicketID").val(r);
			$("#SubjectID").val("");
			$("#priorityId").val(0);
			$("#rateOfInc").val(0);
			$('#urgent_id').removeAttr('checked');
		}
	});
}

function FunctionCheckedFrPriority() {
	var $urgent_id = $('input:checkbox[id=urgent_id]');
	if ($urgent_id.is(':checked') == true) {
		$("#priorityId").val("high");
	} else {
		$("#priorityId").val("0");
	}
}

function AfterSelectingHighfrUrgent()
{
	var priority= $("#priorityId").val();
	if (priority == 'high') {
		$("#urgent_id").prop('checked', true);
	} else {
		$("#urgent_id").prop('checked', false);
	}

}

function NewcomplaintSave() {
	// alert(ObjData.complaintMasterList[0].comment);
	var txtSubjectCompiant = $("#SubjectID").val();
	var txtPriorityName = $("#priorityId").val();
	var TicketID = $("#TicketID").val();
	var currentDate = $("#currentDateFrComplaints").val();
	var rateOfInc = $("#rateOfInc").val();

	if ($('#urgent_id').is(":checked")) {
		urgentFlag = 'Y';
	} else {
		urgentFlag = 'N';
	}

	var Type = $("#Type").val();

	// validation

	if (txtSubjectCompiant == "" || txtSubjectCompiant == null) {
		alert("Please enter complaint");
		$("#SubjectCompliantID").focus();
		return false;
	}
	if (txtPriorityName == "-SELECT-" || txtPriorityName == '0') {
		alert("Please select priority ");
		$("#priorityId").focus();
		return false;
	}
	if (rateOfInc == "-SELECT-" || rateOfInc == '0') {
		alert("Please select rate of inconvenience ");
		$("#rateOfInc").focus();
		return false;
	}

	var inputs = [];
	inputs.push('action=saveComplaint');
	inputs.push('txtSubjectCompiant=' + txtSubjectCompiant);
	inputs.push('txtPriorityName=' + txtPriorityName);
	inputs.push('TicketID=' + TicketID);
	inputs.push('rateOfInc=' + rateOfInc);
	inputs.push('urgentFlag=' + urgentFlag);
	inputs.push('currentDate=' + currentDate);
	inputs.push('Type=' + Type);
	// inputs.push('TicketID=' +TicketID);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ComplaintServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			alert(r);
			location.reload();
		}
	});
}
/** *************Fetch Data OnLoad on Complaint page**************** */

var comaplaintTempCounter = 1;
var comaplaintTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 100%;margin-top:7px;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Ticket Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Date</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-4'><div>Subject</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div >Ticket Status</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Priority</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1saveBtn center'><div>Rate</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1saveBtn center'><div>Urgency</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Check Status</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.ComplaintsDTOList as ComplaintsDTO}"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'open' || $T.ComplaintsDTO.ticketStatus == 'inprocess' || $T.ComplaintsDTO.ticketStatus == 'pending'}"
		+ "<tr class='center'>"
		+ "<td>{comaplaintTempCounter++}</td>"
		+ "<td id='tableTicketId{$T.ComplaintsDTO.idcomplaintMaser}'>{$T.ComplaintsDTO.idcomplaintMaser}</td>"
		+ "<td>{$T.ComplaintsDTO.DateOfRaise}</td>"
		+ "<td id='tableSubject{$T.ComplaintsDTO.idcomplaintMaser}' align=left>{$T.ComplaintsDTO.subject}</td>"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'open'}"
		+ "<td style='background-color:  #ccffcc'>{$T.ComplaintsDTO.ticketStatus}</td>{#/if}"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'inprocess'}"
		+ "<td style='background-color: #ffe0b3'>{$T.ComplaintsDTO.ticketStatus}</td>{#/if}"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'pending'}"
		+ "<td style='background-color: #ffcccc'>{$T.ComplaintsDTO.ticketStatus}</td>{#/if}"
		+ "<td id ='tablePriority{$T.ComplaintsDTO.idcomplaintMaser}'>{$T.ComplaintsDTO.priority}</td>"
		+ "<td>{$T.ComplaintsDTO.rateOfInc}</td>"
		+ "{#if $T.ComplaintsDTO.urgentFlag == 'Y'}"
		+ "<td><i class='fa fa-exclamation-triangle' style='color: red;'></i></td>{#/if}"
		+ "{#if $T.ComplaintsDTO.urgentFlag == 'N'}"
		+ "<td>  </td>{#/if}"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success' data-target='#New_Complaint_Form' data-toggle='modal' data-backdrop='static' data-keyboard='false' onclick='EditComplaints({$T.ComplaintsDTO.idcomplaintMaser})' value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='' class='btn btn-xs btn-success' type='button' data-target='#CheckStatusForm' data-backdrop='static' data-keyboard='false' data-toggle='modal' onclick='viewCheckStatus({$T.ComplaintsDTO.idcomplaintMaser})'><i class='fa fa-eye View-o'></i></button></td></tr>{#/if}{#/for}</table>";

function openComplaint() {
	$("#icloseComplaint").css("background-color", "");
	$("#iOpenComplaint").css("background-color", "#81A981");
	$("#icloseComplaint").css("color", "black");
	$("#iOpenComplaint").css("color", "white");
	$("#OpenComplaint").show();
	$("#closeComplaint").hide();
}
function closedComplaint() {
	$("#iOpenComplaint").css("background-color", "");
	$("#icloseComplaint").css("background-color", "#81A981");
	$("#iOpenComplaint").css("color", "black");
	$("#icloseComplaint").css("color", "white");
	$("#closeComplaint").show();
	$("#OpenComplaint").hide();
}

function FetchComplaints() {
	var inputs = [];
	inputs.push('action=FetchComplaints');
	// inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ComplaintServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			pobj1 = eval('(' + r + ')');
			$("#TktMangmntContentDiv").setTemplate(comaplaintTemp);
			$("#TktMangmntContentDiv").processTemplate(pobj1);
			$("#compalaintContentDivAjax").html(r);
		}
	});
}

var comaplaintTempCounter = 1;
var closedComplaintTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 100%; margin-top:7px;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Ticket Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Date</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-4'><div>Subject</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Ticket Status</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Priority</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Rate</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Urgency</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Check Status</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.ComplaintsDTOList as ComplaintsDTO}"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'closed'}"
		+ "<tr class='center'>"
		+ "<td>{comaplaintTempCounter++}</td>"
		+ "<td id='tableTicketId{$T.ComplaintsDTO.idcomplaintMaser}'>{$T.ComplaintsDTO.idcomplaintMaser}</td>"
		+ "<td>{$T.ComplaintsDTO.DateOfRaise}</td>"
		+ "<td id='tableSubject{$T.ComplaintsDTO.idcomplaintMaser}' align=left>{$T.ComplaintsDTO.subject}</td>"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'closed'}"
		+ "<td style='background-color:  #b3d9ff'>{$T.ComplaintsDTO.ticketStatus}</td>{#/if}"
		+ "<td id ='tablePriority{$T.ComplaintsDTO.idcomplaintMaser}'>{$T.ComplaintsDTO.priority}</td>"
		+ "<td>{$T.ComplaintsDTO.rateOfInc}</td>"
		+ "{#if $T.ComplaintsDTO.urgentFlag == 'Y'}"
		+ "<td><i class='fa fa-exclamation-triangle' style='color: red;'></i></td>{#/if}"
		+ "{#if $T.ComplaintsDTO.urgentFlag == 'N'}"
		+ "<td>  </td>{#/if}"
		+ "<td><button id='' class='btn btn-xs btn-success' type='button' data-target='#CheckStatusForm' data-backdrop='static' data-keyboard='false' data-toggle='modal' onclick='viewCheckStatusForClosedComplaint({$T.ComplaintsDTO.idcomplaintMaser})'><i class='fa fa-eye View-o'></i></button></td></tr>{#/if}{#/for}</table>";

function FetchCloseComplaints() {

	var complaintDivAjax = $('#compalaintContentDivAjax').html();
	/* myarray = JSON.parse(complaintDivAjax); */
	pobj1 = eval('(' + complaintDivAjax + ')');
	// alert(pobj1);
	comaplaintTempCounter = 1;
	for ( var i = 0; i < pobj1.ComplaintsDTOList.length; i++) {
		if (pobj1.ComplaintsDTOList[i].ticketStatus == "closed") {
			$("#closeComplaintDiv").setTemplate(closedComplaintTemp);
			$("#closeComplaintDiv").processTemplate(pobj1);
			// $("#compalaintContentDivAjax").html(r);
			break;
		}
	}
}

function viewCheckStatusForClosedComplaint(ID)
{
	var complaintDivAjax = $('#compalaintContentDivAjax').html();
	var myarrayList = eval('(' + complaintDivAjax + ')');
	// alert(complaintDivAjax);
	var ObjData = "";
	$("#userclosecomment").hide();
	$("#saveBtn").hide();

	// alert(myarrayList.ComplaintsDTOList[0].complaintMasterList[0].loginUserName);

	for ( var i = 0; i < myarrayList.ComplaintsDTOList.length; i++) {
		if (myarrayList.ComplaintsDTOList[i].idcomplaintMaser == ID) {
			ObjData = myarrayList.ComplaintsDTOList[i];
			actionId = ObjData.idcomplaintMaser;
			break;
		}
	}

	if (ObjData.complaintMasterList.length == 0) {
		$("#commentTableTemp").hide();

	} else {
		$("#commentTableTemp").show();
		if (ObjData.idcomplaintMaser == ID) {
			$("#UserDivInfo").setTemplate(commentTempleteFrComplaintJSP);
			$("#UserDivInfo").processTemplate(ObjData);
		}
	}
	$("#TktIdCheckStatus").val(ObjData.idcomplaintMaser);
	$("#CheckStatusDate").val(ObjData.DateOfRaise);
	$("#RaisedByID").val(ObjData.loginUserName);
	$("#CheckStatusPriority").val(ObjData.priority);
	$("#CheckStatusRate").val(ObjData.rateOfInc);
	$("#StatusSubject").val(ObjData.subject);
	
	var tktStatus1 = ObjData.ticketStatus;
	if(tktStatus1 == 'closed')
	{
		$("#IdOfCheckStatus").val(tktStatus1);
		document.getElementById("IdOfCheckStatus").style.backgroundColor = '#b3d9ff';
	}
	$("#DepartmentID").val(ObjData.department);
	var urgentFlag = ObjData.urgentFlag;
	if (urgentFlag == 'Y') {
		$("#urgentID").prop('checked', true);
	} else {
		$("#urgentID").prop('checked', false);
	}
}


function EditComplaints(ID) {
	/*
	 * var ticketId=$("#tableTicketId"+ID).html();
	 * $("#txtTicketID").val(ticketId); var sub =$("#tableSubject"+ID).html();
	 * $("#SubjectCompliantID").val(sub); var priority" + =
	 * $("#tablePriority"+ID).html(); $("#priorityID").val(priority);
	 */

	var complaintDivAjax = $('#compalaintContentDivAjax').html();
	myarray = JSON.parse(complaintDivAjax);
	var ObjData = "";

	for ( var i = 0; i < myarray.ComplaintsDTOList.length; i++) {
		if (myarray.ComplaintsDTOList[i].idcomplaintMaser == ID) {
			ObjData = myarray.ComplaintsDTOList[i];
			break;
		}
	}
	//$("#SubjectID").prop('readonly', true);

	var TicketID1 = ObjData.idcomplaintMaser;
	$("#TicketID").val(TicketID1);
	$("#SubjectID").val(ObjData.subject);
	$("#priorityId").val(ObjData.priority);
	$("#rateOfInc").val(ObjData.rateOfInc);
	var urgentFlag = ObjData.urgentFlag;
	if (urgentFlag == 'Y') {
		$("#urgent_id").prop('checked', true);
	} else {
		$("#urgent_id").prop('checked', false);
	}
	var value = "update";
	$("#Type").val(value);
}

/** ****************Check status On complaints jsp************ */

var commentCounter = 1;
var commentTempleteFrComplaintJSP = "<table class='table table-striped table-bordered header-fixed cf' style=''>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Raised By</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-7 center'><div>Comment</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-3 center'><div>Date</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.complaintMasterList as complaintMasterList}"
		+ "<tr class='center'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{commentCounter++}</td>"
		+ "{#if $T.complaintMasterList.commentType == 'UserType'}"
		+ "<td style='height: 21.5px;' class='col-md-1' align=left>{$T.complaintMasterList.loginUserName}</td>{#/if}"
		+ "{#if $T.complaintMasterList.commentType == 'MaintenanceType'}"
		+ "<td style='height: 21.5px;' class='col-md-1' align=left>{$T.complaintMasterList.maintenanceLoginUserName}</td>{#/if}"
		+ "<td style='height: 21.5px;' class='col-md-7' align=left>{$T.complaintMasterList.comment}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>{$T.complaintMasterList.Date}</td></tr>{#/for}</table>";

var actionId;
function viewCheckStatus(Id) {
	var complaintDivAjax = $('#compalaintContentDivAjax').html();
	var myarrayList = eval('(' + complaintDivAjax + ')');
	// alert(complaintDivAjax);
	var ObjData = "";

	// alert(myarrayList.ComplaintsDTOList[0].complaintMasterList[0].loginUserName);

	for ( var i = 0; i < myarrayList.ComplaintsDTOList.length; i++) {
		if (myarrayList.ComplaintsDTOList[i].idcomplaintMaser == Id) {
			
			if(myarrayList.ComplaintsDTOList[i].ticketStatus == "closed")
			{
			 $("#userclosecomment").hide();
			 $("#saveBtn").hide();
			 document.getElementById("IdOfCheckStatus").disabled = false;
			}
			
			ObjData = myarrayList.ComplaintsDTOList[i];
			actionId = ObjData.idcomplaintMaser;
			break;
		}
	}

	if (ObjData.complaintMasterList.length == 0) {
		$("#commentTableTemp").hide();

	} else {
		$("#commentTableTemp").show();
		if (ObjData.idcomplaintMaser == Id) {
			$("#UserDivInfo").setTemplate(commentTempleteFrComplaintJSP);
			$("#UserDivInfo").processTemplate(ObjData);
		}
	}

	$("#TktIdCheckStatus").val(ObjData.idcomplaintMaser);
	$("#CheckStatusDate").val(ObjData.DateOfRaise);
	$("#RaisedByID").val(ObjData.loginUserName);
	$("#CheckStatusPriority").val(ObjData.priority);
	$("#CheckStatusRate").val(ObjData.rateOfInc);
	$("#StatusSubject").val(ObjData.subject);
	$("#IdOfCheckStatus").val(ObjData.ticketStatus);
	
	var tktStatus1 = ObjData.ticketStatus;
	if(tktStatus1 == 'open')
	{
		$("#IdOfCheckStatus").val(tktStatus1);
		document.getElementById("IdOfCheckStatus").style.backgroundColor = '#ccffcc';
		
	}else if(tktStatus1 == 'inprocess')
	{
		$("#IdOfCheckStatus").val(tktStatus1);
		document.getElementById("IdOfCheckStatus").style.backgroundColor = '#ffe0b3';
	}else if(tktStatus1 == 'pending')
	{
		$("#IdOfCheckStatus").val(tktStatus1);
		document.getElementById("IdOfCheckStatus").style.backgroundColor = '#ffc2b3';
	}
	$("#DepartmentID").val(ObjData.department);
	var urgentFlag = ObjData.urgentFlag;
	if (urgentFlag == 'Y') {
		$("#urgentID").prop('checked', true);
	} else {
		$("#urgentID").prop('checked', false);
	}

}

function NewCommentSaveFrComplaints() {

	var TktIdCheckStatus = $("#TktIdCheckStatus").val();
	var txtUsercomment = $("#Usercomment").val();
	// var Time = $("#dateHMS").val();
	var txtCurrentDate = $("#currentdate").val();

	var inputs = [];
	inputs.push('action=saveCommentOnComplaints');
	inputs.push('TicketID=' + TktIdCheckStatus);
	inputs.push('txtComment=' + txtUsercomment);
	inputs.push('txtCurrentDate=' + txtCurrentDate);
	// inputs.push('Time=' + Time);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ComplaintServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			$("#Usercomment").val("");
			location.reload();
		}
	});
}

/** ********************Ticket Management********************* */

var complaintVarCounter = 1;
var complaintVar = "<table class='table table-striped table-bordered header-fixed cf' style='width: 100%;margin-top:5px;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Ticket Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Date</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Raised By</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-5'><div>Subject</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Ticket Status</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Priority</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Rate</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-0 center'><div>Urgency</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Action</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.complaintMasterList as ComplaintsDTO}"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'open' || $T.ComplaintsDTO.ticketStatus == 'inprocess' || $T.ComplaintsDTO.ticketStatus == 'pending'}"
		+ "<tr class='center'>"
		+ "<td>{complaintVarCounter++}</td>"
		+ "<td id='tableTicketId{$T.ComplaintsDTO.idcomplaintMaser}'>{$T.ComplaintsDTO.idcomplaintMaser}</td>"
		+ "<td >{$T.ComplaintsDTO.DateOfRaise}</td>"
		+ "<td id ='tablePriority{$T.ComplaintsDTO.idcomplaintMaser}' align=left>{$T.ComplaintsDTO.loginUserName}</td>"
		+ "<td  id='tableSubject{$T.ComplaintsDTO.idcomplaintMaser}'  align=left>{$T.ComplaintsDTO.subject}</td>"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'open'}"
		+ "<td style='background-color:  #ccffcc'>{$T.ComplaintsDTO.ticketStatus}</td>{#/if}" 
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'inprocess'}"
		+ "<td style='background-color: #ffe0b3'>{$T.ComplaintsDTO.ticketStatus}</td>{#/if}"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'pending'}"
		+ "<td style='background-color: #ffc2b3'>{$T.ComplaintsDTO.ticketStatus}</td>{#/if}"
		
		+ "<td id ='tablePriority{$T.ComplaintsDTO.idcomplaintMaser}'>{$T.ComplaintsDTO.priority}</td>"
		+ "<td>{$T.ComplaintsDTO.rateOfInc}</td>"
		+ "{#if $T.ComplaintsDTO.urgentFlag == 'Y'}"
		+ "<td><i class='fa fa-exclamation-triangle' style='color: red;'></i></td>{#/if}"
		+ "{#if $T.ComplaintsDTO.urgentFlag == 'N'}"
		+ "<td>  </td>{#/if}"
		+ "<td><button id='' class='btn btn-xs btn-success' type='button' height: 'auto'; data-target='#PerformAction' data-toggle='modal' data-backdrop='static' data-keyboard='false' onclick='ClickOnActionTktMngment({$T.ComplaintsDTO.idcomplaintMaser})'><i class='fa fa-eye View-o'></i></button></td>"
		+ "</td></tr>{#/if}{#/for}</table>";

/** *******************Fetch data on Ticket Management******************* */

function FetchComplaintsForTicketManagementOnLoad() {
	var inputs = [];
	inputs.push('action=FetchComplaintsFrTktManagementOnLoad');
	// inputs.push('isEdit=no');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ComplaintServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			obj1 = eval('(' + r + ')');
			$("#complaintContentDiv").setTemplate(complaintVar);
			$("#complaintContentDiv").processTemplate(obj1);
			$("#compalaintContentDivAjaxFrTktManagement").html(r);
		}
	});
}

var commentCounter = 1;
var s = "  ";
var commentTempleteForUser = "<table class='table table-striped table-bordered header-fixed cf' style=''>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Raised By</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-7 center'><div>Comment</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-3 center'><div>Date</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.complaintMasterList as complaintMasterList}"
		+ "<tr class='center'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{commentCounter++}</td>"
		+ "{#if $T.complaintMasterList.commentType == 'UserType'}"
		+ "<td style='height: 21.5px;' class='col-md-1' align=left>{$T.complaintMasterList.loginUserName}</td>{#/if}"
		+ "{#if $T.complaintMasterList.commentType == 'MaintenanceType'}"
		+ "<td style='height: 21.5px;' class='col-md-1' align=left>{$T.complaintMasterList.maintenanceLoginUserName}</td>{#/if}"
		+ "<td style='height: 21.5px;' class='col-md-7' align=left>{$T.complaintMasterList.comment}</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center'>{$T.complaintMasterList.Date} </td></tr>{#/for}</table>";

var aciotnid;
function ClickOnActionTktMngment(ID) {

	var complaintDivAjaxTktMngment = $(
			"#compalaintContentDivAjaxFrTktManagement").html();
	var myarray = JSON.parse(complaintDivAjaxTktMngment);
	var ObjData = "";

	for ( var i = 0; i < myarray.complaintMasterList.length; i++) {
		if (myarray.complaintMasterList[i].idcomplaintMaser == ID) 
		{
			if(myarray.complaintMasterList[i].ticketStatus == "closed")
				{
				 $("#MaintenanceCloseComment").hide();
				 $("#saveBtnFrTKT").hide();
				 document.getElementById("IdTktStatus").disabled = true;
				}
			else{
				 document.getElementById("IdTktStatus").disabled = false;
			}
			ObjData = myarray.complaintMasterList[i];
			aciotnid = ObjData.idcomplaintMaser;
			break;
		}
	}
	if (ObjData.complaintMasterList.length == 0) {
		
		$("#commentTableInfo").hide();

	} else {
		$("#commentTableInfo").show();
		if (ObjData.idcomplaintMaser == ID) {
			$("#UserDiv").setTemplate(commentTempleteForUser);
			$("#UserDiv").processTemplate(ObjData);
		}
	}

	var TicketID1 = ObjData.idcomplaintMaser;
	$("#TktIdAction").val(TicketID1);
	$("#CheckStatusSubject").val(ObjData.subject);
	$("#PriorityAction").val(ObjData.priority);
	$("#rateOfInc").val(ObjData.rateOfInc);
	$("#RaisedBy").val(ObjData.loginUserName);
	$("#DateAction").val(ObjData.DateOfRaise);
	$("#depID").val(ObjData.department);
	
	var tktStatus1 = ObjData.ticketStatus;
		if(tktStatus1 == 'open')
		{
			$("#IdTktStatus").val(tktStatus1);
			document.getElementById("IdTktStatus").style.backgroundColor = '#ccffcc';
			
		}else if(tktStatus1 == 'inprocess')
		{
			$("#IdTktStatus").val(tktStatus1);
			document.getElementById("IdTktStatus").style.backgroundColor = '#ffe0b3';
		}else if(tktStatus1 == 'pending')
		{
			$("#IdTktStatus").val(tktStatus1);
			document.getElementById("IdTktStatus").style.backgroundColor = '#ffc2b3';
		}
	var urgentFlag = ObjData.urgentFlag;
	if (urgentFlag == 'Y') {
		$("#IdUrgent").prop('checked', true);
	} else {
		$("#IdUrgent").prop('checked', false);
	}
}

var TktMngmentCounter = 1;
var TktMngMentSearchTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 100%;margin-top:5px;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Ticket Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Date</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Raised By</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-5 center'><div>Subject</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Ticket Status</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Priority</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Rate</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-0 center'><div>Urgency</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Action</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.ComplaintsDTOList as ComplaintsDTOList}"
		+ "<tr class='center'>"
		+ "<td>{TktMngmentCounter++}</td>"
		+ "<td id='tableTicketId{$T.ComplaintsDTOList.idcomplaintMaser}'>{$T.ComplaintsDTOList.idcomplaintMaser}</td>"
		+ "<td>{$T.ComplaintsDTOList.DateOfRaise}</td>"
		+ "<td id ='tablePriority{$T.ComplaintsDTOList.idcomplaintMaser}' align=left>{$T.ComplaintsDTOList.loginUserName}</td>"
		+ "<td id='tableSubject{$T.ComplaintsDTOList.idcomplaintMaser}' align=left>{$T.ComplaintsDTOList.subject}</td>"
		+ "<td>{$T.ComplaintsDTOList.ticketStatus}</td>"
		+ "<td id ='tablePriority{$T.ComplaintsDTOList.idcomplaintMaser}'>{$T.ComplaintsDTOList.priority}</td>"
		+ "<td>{$T.ComplaintsDTOList.rateOfInc}</td>"
		+ "{#if $T.ComplaintsDTOList.urgentFlag == 'Y'}"
		+ "<td><i class='fa fa-exclamation-triangle' style='color: red;'></i></td>{#/if}"
		+ "{#if $T.ComplaintsDTOList.urgentFlag == 'N'}"
		+ "<td>  </td>{#/if}"
		+ "<td><button id='' class='btn btn-xs btn-success' type='button' data-target='#PerformAction' data-toggle='modal' data-backdrop='static' data-keyboard='false' onclick='ClickOnActionTktMngment({$T.ComplaintsDTOList.idcomplaintMaser})' ><i class='fa fa-eye View-o'></i></button></td>"
		+ "</td></tr>{#/for}</table>";

function TicketManagementSearch() {
	var userName = $("#byName").val();
	var byDate = $("#txtPurchaseQuotationDate1").val();

	var inputs = [];
	inputs.push('action=fetchComplaintDetailFrTktMngmentSearch');
	inputs.push('userName=' + userName);
	inputs.push('byDate=' + byDate);
	// inputs.push('isEdit=yes');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ComplaintServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			TktMngmentCounter = 1;

			var pobj1 = eval('(' + r + ')');

			if (pobj1.ComplaintsDTOList.length > 0) {
				$("#complaintContentDiv").setTemplate(TktMngMentSearchTemp);
				$("#complaintContentDiv").processTemplate(pobj1);
				$("#closeComplaintDivFrTktMngmnt").setTemplate(TktMngMentSearchTemp);
				$("#closeComplaintDivFrTktMngmnt").processTemplate(pobj1);
				// $("#compalaintContentDivAjaxFrTktManagement").html(r);
			} else {
				alert("Record not found..!");
				$("#byName").val("");
				$("#txtPurchaseQuotationDate1").val("");
				FetchComplaintsForTicketManagementOnLoad();
			}
		}
	});
}

function NewCommentSaveFrTktMngMent() {

	var TicketID = $("#TktIdAction").val();
	var txtComment = $("#Idcomment").val();
	var txtTktStatus = $("#IdTktStatus").val();
	// var Time = $("#datewithHMS").val();
	var txtCurrentDate = $("#currentDate").val();

	var inputs = [];
	inputs.push('action=saveCommentOnTktMngMent');
	inputs.push('TicketID=' + TicketID);
	inputs.push('txtComment=' + txtComment);
	inputs.push('txtTktStatus=' + txtTktStatus);
	inputs.push('txtCurrentDate=' + txtCurrentDate);
	// inputs.push('Time=' + Time);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ComplaintServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			$("#Idcomment").val("");
			location.reload();
		}
	});
}

function openComplaintFrTktMngment() {
	$("#closeComplaintFrTktMngment").hide();
	$("#OpenComplaintFrTktMngment").show();
	$("#icloseComplaint").css("background-color", "");
	$("#iOpenComplaint").css("background-color", "#81A981");
	$("#icloseComplaint").css("color", "black");
	$("#iOpenComplaint").css("color", "white");
}
function closedComplaintFrTktMngment() {
	$("#closeComplaintFrTktMngment").show();
	$("#OpenComplaintFrTktMngment").hide();
	$("#iOpenComplaint").css("background-color", "");
	$("#icloseComplaint").css("background-color", "#81A981");
	$("#iOpenComplaint").css("color", "black");
	$("#icloseComplaint").css("color", "white");
}


var comaplaintTempCounter = 1;
var closedComplaintFrTKTMngmentTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 100%;margin-top:7px;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Ticket Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Date</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Raised By</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-4'><div>Subject</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Ticket Status</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Priority</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-0 center'><div>Rate</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-0 center'><div>Urgency</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Check Status</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.complaintMasterList as ComplaintsDTO}"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'closed'}"
		+ "<tr class='center'>"
		+ "<td>{comaplaintTempCounter++}</td>"
		+ "<td id='tableTicketId{$T.ComplaintsDTO.idcomplaintMaser}'>{$T.ComplaintsDTO.idcomplaintMaser}</td>"
		+ "<td>{$T.ComplaintsDTO.DateOfRaise}</td>"
		+ "<td id ='tablePriority{$T.ComplaintsDTOList.idcomplaintMaser}' align=left>{$T.ComplaintsDTO.loginUserName}</td>"
		+ "<td id='tableSubject{$T.ComplaintsDTO.idcomplaintMaser}' align=left>{$T.ComplaintsDTO.subject}</td>"
		+ "{#if $T.ComplaintsDTO.ticketStatus == 'closed'}"
		+ "<td style='background-color:  #b3d9ff'>{$T.ComplaintsDTO.ticketStatus}</td>{#/if}"
		+ "<td id ='tablePriority{$T.ComplaintsDTO.idcomplaintMaser}'>{$T.ComplaintsDTO.priority}</td>"
		+ "<td>{$T.ComplaintsDTO.rateOfInc}</td>"
		+ "{#if $T.ComplaintsDTO.urgentFlag == 'Y'}"
		+ "<td><i class='fa fa-exclamation-triangle' style='color: red;'></i></td>{#/if}"
		+ "{#if $T.ComplaintsDTO.urgentFlag == 'N'}"
		+ "<td>  </td>{#/if}"
		+ "<td><button id='' class='btn btn-xs btn-success' type='button' data-target='#PerformAction' data-backdrop='static' data-keyboard='false' data-toggle='modal' onclick='viewCheckStatusForClosedComplaintFrTktMngment({$T.ComplaintsDTO.idcomplaintMaser})'><i class='fa fa-eye View-o'></i></button></td></tr>{#/if}{#/for}</table>";

function FetchCloseComplaintsFrTktMngment() {
	comaplaintTempCounter = 1;
	var complaintDivAjaxTktMngment = $("#compalaintContentDivAjaxFrTktManagement").html();
     //var myarray = JSON.parse(complaintDivAjaxTktMngment);
	pobj1 = eval('(' + complaintDivAjaxTktMngment + ')');

	for ( var i = 0; i < pobj1.complaintMasterList.length; i++) {
		if (pobj1.complaintMasterList[i].ticketStatus == "closed") {
			$("#closeComplaintDivFrTktMngmnt").setTemplate(closedComplaintFrTKTMngmentTemp);
			$("#closeComplaintDivFrTktMngmnt").processTemplate(pobj1);
			// $("#compalaintContentDivAjax").html(r);
			break;
		}
	}
}
commentCounter = 1;
var commentTempleteFrComplaintTKT = "<table class='table table-striped table-bordered header-fixed cf' style=''>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Raised By</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-7 center'><div>Comment</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-3 center'><div>Date</div></th>"
		+ "</tr></thead>"
		+ "{#foreach $T.complaintMasterList as complaintMasterList}"
		+ "<tr class='center'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{commentCounter++}</td>"
		+ "{#if $T.complaintMasterList.commentType == 'UserType'}"
		+ "<td style='height: 21.5px;' class='col-md-1' align=left>{$T.complaintMasterList.loginUserName}</td>{#/if}"
		+ "{#if $T.complaintMasterList.commentType == 'MaintenanceType'}"
		+ "<td style='height: 21.5px;' class='col-md-1' align=left>{$T.complaintMasterList.maintenanceLoginUserName}</td>{#/if}"
		+ "<td style='height: 21.5px;' class='col-md-7' align=left>{$T.complaintMasterList.comment}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>{$T.complaintMasterList.Date}</td></tr>{#/for}</table>";

function viewCheckStatusForClosedComplaintFrTktMngment(ID)
{
	var complaintDivAjax = $('#compalaintContentDivAjaxFrTktManagement').html();
	var myarrayList = eval('(' + complaintDivAjax + ')');
	 
	var ObjData = "";
	$("#MaintenanceCloseComment").hide();
	$("#saveBtnFrTKT").hide();
	 document.getElementById("IdTktStatus").disabled = true;

	for ( var i = 0; i < myarrayList.complaintMasterList.length; i++) {
		if (myarrayList.complaintMasterList[i].idcomplaintMaser == ID) {
			ObjData = myarrayList.complaintMasterList[i];
			actionId = ObjData.idcomplaintMaser;
			break;
		}
	}

	if (ObjData.complaintMasterList.length == 0) {
		$("#commentTableInfo").hide();

	} else {
		$("#commentTableInfo").show();
		if (ObjData.idcomplaintMaser == ID) {
			$("#UserDiv").setTemplate(commentTempleteFrComplaintTKT);
			$("#UserDiv").processTemplate(ObjData);
		}
	}

	var TicketID1 = ObjData.idcomplaintMaser;
	$("#TktIdAction").val(TicketID1);
	$("#CheckStatusSubject").val(ObjData.subject);
	$("#PriorityAction").val(ObjData.priority);
	$("#rateOfInc").val(ObjData.rateOfInc);
	$("#RaisedBy").val(ObjData.loginUserName);
	$("#DateAction").val(ObjData.DateOfRaise);
	$("#depID").val(ObjData.department);
	
	var tktStatus1 = ObjData.ticketStatus;
	if(tktStatus1 == 'closed')
	{
		$("#IdTktStatus").val(tktStatus1);
		document.getElementById("IdTktStatus").style.backgroundColor = '#99c2ff';
	}
	var urgentFlag = ObjData.urgentFlag;
	if (urgentFlag == 'Y') {
		$("#IdUrgent").prop('checked', true);
	} else {
		$("#IdUrgent").prop('checked', false);
	}
}

function changeColorOfTkt()
{
	var value = $("#IdTktStatus").val();
	if(value == "open") {
		$("#IdTktStatus").css('background-color', '#ccffcc');
	}else if (value == 'inprocess') {
		$("#IdTktStatus").css('background', '#ffe0b3');
	} else if (value == 'pending') {
		$("#IdTktStatus").css('background', '#ffcccc');
	} else if (value == 'closed') {
		$("#IdTktStatus").css('background', '#99c2ff');
	}
}

function changeColorOfComplaint()
{
	var value = $("#IdOfCheckStatus").val();
	alert("value :"+value);
	if(value == "open") {
		$("#IdOfCheckStatus").css('background-color', '#ccffcc');
	}else if (value == 'inprocess') {
		$("#IdOfCheckStatus").css('background', '#ffe0b3');
	} else if (value == 'pending') {
		$("#IdOfCheckStatus").css('background', '#ffcccc');
	} else if (value == 'closed') {
		$("#IdOfCheckStatus").css('background', '#99c2ff');
	}
}

function closeComplaintPopUp(){
	$("#CheckStatusForm").model('hide');
}