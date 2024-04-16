function getFMStudy(id){
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#diets").hide();
	$("#Prescription").hide();
	$("#ipdDoctorStationJSPHeadDiv").html(" ");
	 temForStudy(id);
}
function temForStudy(id) {
	var temp = '<div class="tab-pane fade active in" id="Study"><form>'
			+ '<div class="centered"><div class="divide-10"></div>'
			+ '<div style="height: 50px;" class="col-md-1-1"><input id="setStudyTempId" type="button" onclick="setStudyTemp()" value="Initiate" name="Initiate">'
			+ '</div><div class="col-md-1-1 li pull-right">'
			+ '<button id="saveStudyId" data-original-title="Save" class="btn btn-xs btn-success editUserAccess" data-toggle="tooltip" data-placement="left" onclick="saveStudy()" id="saveStudyid" type="button">'
			+ '	<i class="fa fa-save"></i></button>'
			+ '</div></div></form><br>'
			+ '<div class="divide-10"></div><div class="box-body col-md-12-1" style="padding-top: 10px; padding-bottom: 0px">'
			+ '<div class="form-group  box border col-md-12-1">'
			+ '<div class="col-md-12-1" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid; padding-left: 3px;">'
			+ '</div>'

			+ '<div class="col-sm-12-1" style="margin-top: 0px;margin-top: 0px; height: 250px; overflow-y: scroll;" id="divStudyDispTable">'
			+ '<table class="table table-bordered table-condensed header-fixed cf" style="width : 1090px; margin-top: 10px;">'
			+ '<thead><tr>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px;"><div class="TextFont">#</div></th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Start Date</div></th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">End Date</div></th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Status</div></th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">View</div></th>'
			+ '</tr></thead><tbody id="StudyDispTable"></tbody></table>'
			+ '</div></div></div></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	
	var prevtr = $("#prevtr").val();
	if(prevtr == "previousIvfTreatment"){
		//alert(prevtr);
		document.getElementById("saveStudyId").disabled = "true";
		document.getElementById("setStudyTempId").disabled = "true";
	}
	fetchStudyData();

}

function saveStudy(){
	

	
	var rowId = $("#rowId").val();
	var studyid = $("#studyid").val();
	if(rowId != 0){
	rowId--;
	}
	var study_status = $("#stdstatus"+(rowId)).val();
	var hiddenstatus = $("#studyQueryType").val();
	var iniproc = $("#iniproc").val();
	
	
	/*if(iniproc == 0){
		alert("Please initiate new process first.");
		return false;
	}*/
	
	
	
	if(hiddenstatus == "Running" && iniproc == 0){
		alert("Please Complete Current Running Study First..");
		return false;
	}else if(hiddenstatus == "Stop" && iniproc == 0){
		alert("Please Complete Current Stoped Study First..");
		return false;
		}

	
	var patId =  $("#pt_Id").val();//added by paras
	var start_date = $("#stdt"+(rowId)).val();
	if (start_date == "" || start_date == undefined) {
		alert("Please Select Start Date...");
		return false;
	}
	
	var end_date = $("#endt"+(rowId)).val();
	if (end_date == undefined ) {
		alert("Please Select End Date...");
		return false;
	}
	
	
	if(study_status == "Completed"){
		var saveFrom = $("#saveFrom").val();

		if(saveFrom !="fm"){
			alert("Please Close From IVF..");
			return false;
		}
		
		if(end_date==""){
		alert("Please Select End Date First...");
		return false;
		}
		
	}
	
	if(study_status == "Canceled"){
		alert("You Can Not Cancel Study From Here...");
		return false;
	}
	
	if (end_date != "") {
		var temp = end_date.split("/");
		var disDate = new Date(temp[2], temp[1] - 1, temp[0]);
		//var start_date = $("#stdt").html();
		var addt = start_date.split("/");
		var addDate = new Date(addt[2],addt[1]-1,addt[0]); 
		if (disDate< addDate) {
			alert("End Date Should be Greater than Start Date...");
			return false;
		}
	}
	
	var study_status = $("#stdstatus"+(rowId)).val();
	
	var ivfCoupleId = $("#ivfCoupleId").val();
	
	
	var inputs = [];
	//inputs.push('action=saveUpdateStudyByID');
	inputs.push('start_date=' + start_date);
	inputs.push('end_date=' + end_date);
	inputs.push('study_status=' + study_status);
	inputs.push('patientId=' + patId);
	inputs.push('studyid=' + studyid);
	inputs.push('saveFrom=' + "fm");
	inputs.push('ivfCoupleId=' + ivfCoupleId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivffm/saveFmStudy",
		//url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(r) {
			if(r==1){
			alert("Study Saved Successfully...");
			}else if(r==2){
				alert("Study updated Successfully...");
			}else{
				alert("Network Issue");
			}
			$("#iStudy").attr("class","active");
			fetchStudyData();
			$("#iniproc").val(0);
		}
	});

	
}

function fetchStudyData() {
	
	//var patId = $('#pid').text();
	var patId =  $("#pt_Id").val(); //added by paras

	var inputs = [];
	//inputs.push('action=fetchFollicularAll');
	inputs.push('patientId=' + patId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
	//	url : "TreatmentServlet",
		url : "ehat/ivffm/lstIVFFolicularStudy",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			
			$("#follicularDetails").html(r);
			setStudyList(r);
		}
	});
}
function setStudyList(testObj)
{
	
	//var testObj = eval('(' + data + ')');
	$("#rowId").val(testObj.studyList.length+1);
	$("#StudyDispTable").empty();
	if(testObj.studyList.length>0){
		
		for(var i=0;i<testObj.studyList.length;i++)
		{
			if(testObj.studyList[i].study_status == "Completed" || testObj.studyList[i].study_status == "Canceled" ){
				$("#StudyDispTable").append("<tr id='count"+(i+1)+"'><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' type='hidden' id='rowCount"+(i+1)+"' >"+(i+1)+"</div></td>" +
						"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input disabled='disabled' id='stdt"+(i+1)+"' onclick=displayCalendar(document.getElementById(\'stdt" + (i+1) + "\'),\'dd/mm/yyyy\',this) placeholder='Start Date' onchange='setQueryType("+(i+1)+")' /></td> " +
						"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input disabled='disabled' id='endt"+(i+1)+"' onclick=displayCalendar(document.getElementById(\'endt" + (i+1) + "\'),\'dd/mm/yyyy\',this) placeholder='End Date' onchange='setQueryType("+(i+1)+")'/></td> " +
						"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><select disabled='disabled' style='width: 100%;' id='stdstatus"+(i+1)+"' onchange='setQueryType("+(i+1)+")'><option id='1' value='Running'>Running</option><option id='2' value='Completed'>Completed</option><option id='3' value='Stop'>Stop</option><option id='4' value='Canceled'>Canceled</option></select></td> " +
						"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddenRv"+(i+1)+"' class='btn btn-xs btn-success viewStudyBtn' style='margin-left: 6px;cursor: pointer;' onclick='setQueryType("+(i+1)+"),viewStudyTable("+(i+1)+"),setbasicStudyData("+(testObj.studyList[i].studyid)+")' onchange='setQueryType("+(i+1)+")'><i class='fa fa-eye'></i></button></td>" +
						"<input type='hidden' value='"+(testObj.studyList[i].studyid)+"' id='studyid"+(i+1)+"' /></tr>"
					);
					$('#stdt'+(i+1)).val(testObj.studyList[i].start_date);
					$('#endt'+(i+1)).val(testObj.studyList[i].end_date);
					$('#stdstatus'+(i+1)).val(testObj.studyList[i].study_status).attr('selected','selected');
					$("#saveFromCall").val(testObj.studyList[i].study_status);
			}
			else{
			
			$("#StudyDispTable").append("<tr id='count"+(i+1)+"'><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' type='hidden' id='rowCount"+(i+1)+"' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='stdt"+(i+1)+"' onclick=displayCalendar(document.getElementById(\'stdt" + (i+1) + "\'),\'dd/mm/yyyy\',this) onchange='setQueryType("+(i+1)+"),validateNumberWithSlashByRegEx(stdt"+(i+1)+")'/></td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='endt"+(i+1)+"' onclick=displayCalendar(document.getElementById(\'endt" + (i+1) + "\'),\'dd/mm/yyyy\',this) placeholder='End Date' onchange='setQueryType("+(i+1)+"),validateNumberWithSlashByRegEx(endt"+(i+1)+")'/></td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><select style='width: 100%;' id='stdstatus"+(i+1)+"' onchange='setQueryType("+(i+1)+")'><option id='1' value='Running'>Running</option><option id='2' value='Completed'>Completed</option><option id='3' value='Stop'>Stop</option><option id='4' value='Canceled'>Canceled</option></select></td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddenRv"+(i+1)+"' class='btn btn-xs btn-success viewStudyBtn' style='margin-left: 6px;cursor: pointer;' onclick='setQueryType("+(i+1)+"),viewStudyTable("+(i+1)+"),setbasicStudyData("+(testObj.studyList[i].studyid)+")' type='button' onchange='setQueryType("+(i+1)+")'><i class='fa fa-eye'></i></button></td>"+
				"<input type='hidden' value='"+(testObj.studyList[i].studyid)+"' id='studyid"+(i+1)+"' /></tr>"
			);
			$('#stdt'+(i+1)).val(testObj.studyList[i].start_date);
			$('#endt'+(i+1)).val(testObj.studyList[i].end_date);
			$('#stdstatus'+(i+1)).val(testObj.studyList[i].study_status).attr('selected','selected');
			$("#saveFrom").val(testObj.studyList[i].saveFrom);
			
			$("#saveFromCall").val(testObj.studyList[i].study_status);
			}
		}
		//var callFrom = $("#callFrom").val().trim();
		var callFrom="";
		
		if (callFrom == "previousTreatmentOPDER") {
			$("#allTabDivID *").prop("disabled", true);
			$(".viewStudyBtn").prop("disabled", false);
		}
		}
	/*else
	{
		$("#StudyDispTable").append("<th colspan = 5>No Record Found</th>");
	}*/
}

function addComment(follicularstudyReportId)
{
	$("#follicularstudyReportId").val(follicularstudyReportId);
	$("#txtComment").val("");
	$("#iCommentBox").modal('show');
	$("#txtComment").addClass("newStudyRow");
	getStudyCommitByReportId(follicularstudyReportId);
}
function HideCommentPopUp() {
	$("#iCommentBox").modal('hide');
	$("#txtComment").removeClass("newStudyRow");
}
function closePopUpbtn(){
	$("#viewStudyTablePopup").modal('hide');
	$("#tableBodyForFollicularInfo").html("");
	$('#savebasicinfoF').prop('disabled',false);
		$('#createdivF').prop('disabled',false);
		$('#saveStudyRecordbtn').prop('disabled',false);
		$('#closeStudyRecordtbn').prop('disabled',false);
	fetchStudyData();
}

function viewStudyTable(rowCount)
{	
	
	var inidate = $('#stdt'+(rowCount)).val();
	$("#inidate").val(inidate);
	
	$("#cycleNo").val(rowCount);
	
	
	
	
	
/*	var patId = $('#pt_Id').val();

	var Tid = $('#tr_Id').val();
	var inputs = [];
	
	inputs.push('patientId=' + patId);
	inputs.push('inidate=' + inidate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
	//	url : "TreatmentServlet",
		url : "ehat/ivffm/fetchStudyRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			
			$("#follicularDetails").html(r);
			setStudyTable(r);
			
		}
	});*/
	
}


function fetchStudyStudyRecord(){
		var patId = $('#pt_Id').val();

	var Tid = $('#tr_Id').val();
	
	var inidate = $('#inidate').val();
	
	var inputs = [];
	
	inputs.push('patientId=' + patId);
	inputs.push('inidate=' + inidate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
	//	url : "TreatmentServlet",
		url : "ehat/ivffm/fetchStudyRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			
			$("#follicularDetails").html(r);
			setStudyTable(r);
			
		}
	});
}


function setStudyTable(testObj)
{
	
	$("#studydata").html(testObj);
	var studyQueryType = $('#studyQueryType').val();
	
	
	//var testObj=jQuery.parseJSON(data);
	
	$("#testTable").empty();
	
	if(testObj.follicularReportList.length>0){
		
		for(var i=0;i<testObj.follicularReportList.length;i++)
		{
			if(studyQueryType == "Completed" || studyQueryType=="Canceled"){
			$("#testTable").append("<tr id='count"+(i+1)+"'  class='newStudyRow' ><td >"+(i+1)+"</td>" +
				"<td ><input disabled='disabled' onclick=displayCalendar(document.getElementById(\'date" +(i+1)+ "\'),\'dd/mm/yyyy\',this) class='form-control input-SmallText TextFont' id='date"+(i+1)+"' value='"+testObj.follicularReportList[i].study_date+"' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td ><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='days"+(i+1)+"' value='"+testObj.follicularReportList[i].days+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td ><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='rtov"+(i+1)+"' value='"+testObj.follicularReportList[i].rtov+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td ><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='ltov"+(i+1)+"' value='"+testObj.follicularReportList[i].ltov+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td ><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='endo"+(i+1)+"' value='"+testObj.follicularReportList[i].endo+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td ><input type='text' class='form-control input-SmallText TextFont' id='drug"+(i+1)+"' value='"+testObj.follicularReportList[i].drug+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td ><input type='text' class='form-control input-SmallText TextFont' id='dose"+(i+1)+"' value='"+testObj.follicularReportList[i].dose+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td ><input type='text' class='form-control input-SmallText TextFont' id='pod"+(i+1)+"' value='"+testObj.follicularReportList[i].pod+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td ><button type='button' disabled='disabled' id='hiddenstd"+(i+1)+"' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='setQueryType1("+(i+1)+"),toRmvStudyDiv("+(i+1)+")' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;" +
				"<button type='button' disabled='disabled' id='hiddencmd11"+(i+1)+"' class='btn btn-xs btn-success editUserAccess' style='margin-center: 6px;cursor: pointer;margin-left:38px; ' onclick='setQueryType1("+(i+1)+"),saveStudyReportRecord("+(testObj.follicularReportList[i].studyid)+")' type='button'><i class='fa fa-save'></i></button> "+
				"<button type='button' disabled='disabled' id='hiddencmd"+(i+1)+"' class='btn btn-xs btn-warning' style='margin-center: 6px;cursor: pointer;margin-left:38px;margin-top: -34px;' onclick='setQueryType1("+(i+1)+"),addComment("+(testObj.follicularReportList[i].studyid)+")' type='button'><i class='fa fa-edit'></i></button></td> "+
				"<input type='hidden' id='studyidR"+(i+1)+"' value='"+(testObj.follicularReportList[i].studyid)+"' /><input type='hidden' id='lmpdateid"+(i+1)+"' value='"+(testObj.follicularReportList[i].lmpdate)+"' /></tr>");
			$('#lmpdt').val(testObj.follicularReportList[i].lmpdate);
			$('#stdyCount').val(i+1);
			$('#stdRowCnt').val(i+1);
			$('#saveStudyRecordbtn').prop('disabled',true);
			$('#closeStudyRecordtbn').prop('disabled',true);
			}
			else{
				$("#testTable").append("<tr id='count"+(i+1)+"' class='newStudyRow'><td >"+(i+1)+"</td>" +
						"<td ><input disabled='disabled' onclick=displayCalendar(document.getElementById(\'date" +(i+1)+ "\'),\'dd/mm/yyyy\',this) class='form-control input-SmallText TextFont' id='date"+(i+1)+"' value='"+testObj.follicularReportList[i].study_date+"' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td ><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='days"+(i+1)+"' value='"+testObj.follicularReportList[i].days+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td ><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='rtov"+(i+1)+"' value='"+testObj.follicularReportList[i].rtov+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td ><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='ltov"+(i+1)+"' value='"+testObj.follicularReportList[i].ltov+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td ><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='endo"+(i+1)+"' value='"+testObj.follicularReportList[i].endo+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td ><input type='text' class='form-control input-SmallText TextFont' id='drug"+(i+1)+"' value='"+testObj.follicularReportList[i].drug+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td ><input type='text' class='form-control input-SmallText TextFont' id='dose"+(i+1)+"' value='"+testObj.follicularReportList[i].dose+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td ><input type='text' class='form-control input-SmallText TextFont' id='pod"+(i+1)+"' value='"+testObj.follicularReportList[i].pod+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td ><button type='button' id='hiddenstd"+(i+1)+"' class='btn btn-xs btn-danger deleteBtn ' style='margin-center: 6px;cursor: pointer;' onclick='setQueryType1("+(i+1)+"),toRmvStudyDiv("+(i+1)+")' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;" +
						"<button type='button'  id='hiddencmd11"+(i+1)+"' class='btn btn-xs btn-success editUserAccess' style='margin-center: 6px;cursor: pointer;margin-left:38px;disabled =true; ' onclick='setQueryType1("+(i+1)+"),saveStudyReportRecord("+(testObj.follicularReportList[i].studyid)+")' type='button'><i class='fa fa-save'></i></button> "+
						"<button type='button' id='hiddencmd"+(i+1)+"' class='btn btn-xs btn-warning' style='margin-center: 6px;cursor: pointer;margin-left:38px;margin-top: -34px;' onclick='setQueryType1("+(i+1)+"),addComment("+(testObj.follicularReportList[i].studyid)+")' type='button'><i class='fa fa-edit'></i></button> </td>"+
						
						"<input type='hidden' id='studyidR"+(i+1)+"' value='"+(testObj.follicularReportList[i].studyid)+"' /><input type='hidden' id='lmpdateid"+(i+1)+"' value='"+(testObj.follicularReportList[i].lmpdate)+"' /></tr>");
					$('#lmpdt').val(testObj.follicularReportList[i].lmpdate);
					$('#stdRowCnt').val(i+1);
					$('#stdyCount').val(i+1);
			}
		}
		
	//	var callFrom = ($("#callFrom").val()).trim();
		var callFrom = $("#callFrom").val();
		
		if (callFrom == "previousTreatmentOPDER") {
			$('#viewStudyTablePopup .btn').prop("disabled",true);
			$("#studyPrintBtn").prop("disabled", false);
			$("#closePopUpbtn").prop("disabled", false);
		}
	}
	
	setStudyRecordGraph1(testObj);
}

function setStudyTemp()
{		
/*	var gender = $("#patGender").val();
 * 
*/	
	var gender = $("#sex").text().trim();
	
	if(gender == "Male" ||gender == 'male'){
		alert("You can not initiate process for Male Patient..");
		return false;
	}
	var currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	var dd = currentDate.getDate();
	var mm = currentDate.getMonth() + 1; // January is 0!
	var yyyy = currentDate.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var date = dd + '/' + mm + '/' + yyyy;
	
			var rowId = $("#rowId").val();
			
			$('#studyid').val(0);
			if(rowId != 0)
				{
					var rw=rowId -1;
					
					var hiddenstatus = $("#stdstatus"+(rw)).val();
					
					if(hiddenstatus == "Running"){
						alert("Please Complete Current Running Study First..");
						return false;
					}else if(hiddenstatus == "Stop"){
						alert("Please Complete Current Stoped Study First..");
						return false;
					}
				}
			$("#StudyDispTable").append(
					"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont'>"+(rowId)+"</div></td>" +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='stdt"+(rowId)+"' onclick=displayCalendar(document.getElementById(\'stdt" + (rowId) + "\'),\'dd/mm/yyyy\',this) value='"+date+"' onchange='setQueryType("+(rowId)+"),validateNumberWithSlashByRegEx(stdt"+(rowId)+")'/></td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='endt"+(rowId)+"' onclick=displayCalendar(document.getElementById(\'endt" + (rowId) + "\'),\'dd/mm/yyyy\',this) placeholder='End Date' onchange='setQueryType("+(rowId)+"),validateNumberWithSlashByRegEx(endt"+(rowId)+")'/></td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><select style='width: 100%;' id='stdstatus"+(rowId)+"' ><option value='Running' selected='selected'>Running</option><option value='Completed'>Completed</option><option value='Stop'>Stop</option><option value='Canceled'>Canceled</option></select></td>" +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddensid"+(rowId)+"' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='setQueryType("+(rowId)+"),checkMaterMollicularId("+0+")'><i class='fa fa-eye'></i></button></td></tr>"
			);
			rowId++;
			$('#stdt'+(rowId)).val(date);
			$('#rowId').val(rowId);
			$('#iniproc').val(1);
}

function setQueryType(rowId){
	var queryType = $("#stdstatus"+(rowId)).val();
	$('#studyQueryType').val(queryType);
	var queryType = $("#stdt"+(rowId)).val();
	$('#stdt').val(queryType);
	var studyid = $("#studyid"+(rowId)).val();
	$('#studyid').val(studyid);
	$('#cnt').val(rowId);
	
}
function setQueryType1(rowId){
	var queryType = $("#stdt"+(rowId)).val();
	$('#stdt').val(queryType);
	var studyidR = $("#studyidR"+(rowId)).val();
	$('#studyidR').val(studyidR);
	var date = $("#date"+(rowId)).val();
	$('#date').val(date);
	var days = $("#days"+(rowId)).val();
	$('#days').val(days);
	var rtov = $("#rtov"+(rowId)).val();
	$('#rtov').val(rtov);
	var ltov = $("#ltov"+(rowId)).val();
	$('#ltov').val(ltov);
	var endo = $("#endo"+(rowId)).val();
	$('#endo').val(endo);
	$('#stdRowCnt').val(rowId);
}

/*function saveStudy(){
	var rowId = $("#rowId").val();
	var studyid = $("#studyid").val();
	if(rowId != 0){
	rowId--;
	}
	var iniproc =$("#iniproc").val();
	if(iniproc == 0){
		alert("Please initiate new process first.");
		return false;
		}
	//var patId = $('#pid').text();
	
	var patId =  $("#pt_Id").val();//added by paras
	
	var start_date = $("#stdt"+(rowId)).val();
	if (start_date == "" || start_date == undefined) {
		alert("Please Select Start Date...");
		return false;
	}
	 
	 
	var end_date = $("#endt"+(rowId)).val();
	if (end_date == undefined) {
		alert("Please Select End Date...");
		return false;
	}
	var strdt=new Date(start_date);
	 var d2=new Date(end_date);
	// alert(d2);
	  
	 var curr_date = d2.getDate();
	 curr_date=curr_date-2;
	 var curr_month = d2.getMonth();
	 curr_month=curr_month+3;
	 var curr_year = d2.getFullYear();
//alert(curr_year);
	 //curr_year = curr_year.toString().substr(2,2);

	//alert(curr_year+"/"+curr_month+"/"+curr_date);
	//d2=curr_year+"/"+curr_month+"/"+curr_date;
 	 // alert(d2);
	  //return false;
	    var month = d.getMonth() + 1;
	    var day = d.getDate();
 	    alert("day-"+day+"month-"+month+"yr-"+d.getFullYear());
	   var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/'
	            + (day < 10 ? '0' : '') + day; 
	    
	     //var output =  (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear() ;
//alert("alert op-"+output+"alert d2-"+d2);
	    if (d2 < strdt) {
	    	alert("End Date Should be Greater than Start Date...");
	        return false;
	    }
	end_date=end_date.replace(/\//g, '-');
	start_date=start_date.replace(/\//g, '-');
	//end_date=b.reverse();
  	//comparing to date not be past means it should show future
    var d = start_date;
    var month = start_date.getMonth() + 1;
    var day = start_date.getDate();

   var output = start_date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-'
            + (day < 10 ? '0' : '') + day;
    
   // var output =  (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + start_date.getFullYear() ;

    if (new Date(end_date) < new Date(output)) {
    	alert("End Date Should be Greater than Start Date...");
        return false;
    }
	
	
		if(end_date < start_date){
		alert("End Date Should be Greater than Start Date...");
		return false;
		}
	var firstValue = start_date.split('/');
	var secondValue = end_date.split('/');
    alert(firstValue);
	 var firstDate=new Date();
	 firstDate.setFullYear(firstValue[0],(firstValue[1] - 1 ),firstValue[2]);

	 var secondDate=new Date();
	 secondDate.setFullYear(secondValue[0],(secondValue[1] - 1 ),secondValue[2]);     

	  if (secondDate<firstDate)
	  {
	 alert("End Date Should be Greater than Start Date...");
	   return false;
	  }
	 else
	  {
	    alert("Second Date  is greater than First Date");
	    return false;
	  }
	
	var study_status = $("#stdstatus"+(rowId)).val();
	
	var inputs = [];
	inputs.push('action=saveUpdateStudyByID');
	inputs.push('start_date=' + start_date);
	inputs.push('end_date=' + end_date);
	inputs.push('study_status=' + study_status);
	inputs.push('patId=' + patId);
	inputs.push('studyid=' + studyid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(r) {
			alert("Study Saved Successfully...");
			$("#iStudy").attr("class","active");
			fetchStudyData();
			
		}
	});
}
*/
					
/*function saveStudy(){
	
	var rowId = $("#rowId").val();
	var studyid = $("#studyid").val();
	if(rowId != 0){
	rowId--;
	}
	var study_status = $("#stdstatus"+(rowId)).val();
	var hiddenstatus = $("#studyQueryType").val();
	var iniproc = $("#iniproc").val();
	
	
	if(iniproc == 0){
		alert("Please initiate new process first.");
		return false;
	}
	
	
	
	if(hiddenstatus == "Running" && iniproc == 0){
		alert("Please Complete Current Running Study First..");
		return false;
	}else if(hiddenstatus == "Stop" && iniproc == 0){
		alert("Please Complete Current Stoped Study First..");
		return false;
		}
//var patId = $('#pid').text();
	
	var patId =  $("#pt_Id").val();//added by paras
	var start_date = $("#stdt"+(rowId)).val();
	if (start_date == "" || start_date == undefined) {
		alert("Please Select Start Date...");
		return false;
	}
	
	var end_date = $("#endt"+(rowId)).val();
	if (end_date == undefined ) {
		alert("Please Select End Date...");
		return false;
	}
	
	
	if(study_status == "Completed"){
		var saveFrom = $("#saveFrom").val();

		if(saveFrom !="fm"){
			alert("Please Close From IVF..");
			return false;
		}
		
		if(end_date==""){
		alert("Please Select End Date First...");
		return false;
		}
		
	}
	
	if(study_status == "Canceled"){
		alert("You Can Not Cancel Study From Here...");
		return false;
	}
	
	if (end_date != "") {
		var temp = end_date.split("/");
		var disDate = new Date(temp[2], temp[1] - 1, temp[0]);
		//var start_date = $("#stdt").html();
		var addt = start_date.split("/");
		var addDate = new Date(addt[2],addt[1]-1,addt[0]); 
		if (disDate< addDate) {
			alert("End Date Should be Greater than Start Date...");
			return false;
		}
	}
	if(end_date != ""){
		if(end_date < start_date){
		alert("End Date Should be Greater than Start Date...");
		return false;
		}
	}
	
	var study_status = $("#stdstatus"+(rowId)).val();
	
	var ivfCoupleId = $("#ivfCoupleId").val();
	
	var inputs = [];
	inputs.push('action=saveUpdateStudyByID');
	inputs.push('start_date=' + start_date);
	inputs.push('end_date=' + end_date);
	inputs.push('study_status=' + study_status);
	inputs.push('patId=' + patId);
	inputs.push('studyid=' + studyid);
	inputs.push('saveFrom=' + "fm");
	inputs.push('ivfCoupleId=' + ivfCoupleId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(r) {
			alert("Study Saved Successfully...");
			$("#iStudy").attr("class","active");
			fetchStudyData();
			$("#iniproc").val(0);
		}
	});
}
*/

function saveStudyRecord() {
	
	
	var age = $('#ageF').val();
	var pWeight = $('#pWeight').val();
	var pHeight = $('#pHeight').val();
	var bmi = $('#bmi').val();
	var afc = $('#afc').val();
	var rx = $('#Rx').val();
	var hsg = $('#hsg').val();
	var hsa = $('#hsa').val();
	
	var protocoloF = $('#protocoloF').val();
	var masterFollicularStudyId = $('#masterFollicularStudyId').val();
	
	
var lmpdate = $("#lmpdt").val();
	
	if(lmpdate == ""){
		alert("Please Select Lmp Date First..");
		return false;
	}
	
	
	var inputs = [];
	
	
	inputs.push('studyid=' + masterFollicularStudyId);
	inputs.push('age=' + age);
	inputs.push('weight=' + pWeight);
	inputs.push('height=' + pHeight);
	inputs.push('bmi=' + bmi);
	inputs.push('afc=' + afc);
	inputs.push('rx=' + rx);
	inputs.push('hsg=' + hsg);
	inputs.push('hsa=' + hsa);
	inputs.push('protocoloF=' + protocoloF);
	
	
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "TreatmentServlet",
		url : "ehat/ivfcalender/saveIvfCalender",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error:');
		},
		success : function(r) {
			if(r==1){
				alert("Study Record Saved Successfully...");
				saveFollicularData();
			}else if(r==2){
				alert("Study Record Updated Successfully...");
				saveFollicularData();
			}else{
				alert("Network Issue..");
			}
			
			//HideCommentPopUp();\
			getBasicStudyDataForFollucularStudy();
		
			//viewStudyTable(cnt);
		}
	});
	
	
	
	
	
}

function saveStudyReportRecord(){
	var RowCount = $("#stdRowCnt").val();
	//var inidate = $('#stdt').val();
	var inidate = $('#inidate').val();
	
	
	
	var Tid = $('#tr_Id').val();  
	var patId = $('#pt_Id').val();   
	
	var date = $('#date'+(RowCount)).val();
	var days = $('#days'+(RowCount)).val();
	var rtov = $('#rtov'+(RowCount)).val();
	var ltov = $('#ltov'+(RowCount)).val();
	var endo = $('#endo'+(RowCount)).val();
	var pod = $('#pod'+(RowCount)).val();
	var drug = $('#drug'+(RowCount)).val();
	var dose = $('#dose'+(RowCount)).val();	
	var lmpdate = $("#lmpdt").val();
	
	
	
	var inputs = [];
	//inputs.push('action=saveStudyRecord');
	inputs.push('reportId=' + 0);
	inputs.push('initiate_date=' + inidate);
	inputs.push('study_date=' + date);
	inputs.push('days=' + days);
	inputs.push('rtov=' + rtov);
	inputs.push('ltov=' + ltov);
	inputs.push('endo=' + endo);
	inputs.push('treatmentId=' + Tid);
	inputs.push('patientId=' + patId);
	inputs.push('lmpdate=' + lmpdate);
	inputs.push('drug=' + drug);
	inputs.push('dose=' + dose);
	inputs.push('pod=' + pod);
	

	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "TreatmentServlet",
		url : "ehat/ivffm/saveStudyReportRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error:');
		},
		success : function(r) {
			if(r==1){
				alert("Study Record Saved Successfully...");
				getBasicStudyDataForFollucularStudyF();
			}else if(r==2){
				alert("Study Record Updated Successfully...");
				getBasicStudyDataForFollucularStudyF();
			}else{
				alert("Network Issue..");
			}
			
			//HideCommentPopUp();
			//viewStudyTable(cnt);
			
			fetchStudyStudyRecord();
		}
	});

	

}


function addCommentsInStudyRecord(){

	var follicularstudyReportId=$("#follicularstudyReportId").val();
	
	var studycmt = $("#txtComment").val();
	
	
	var inputs = [];
	
	
	
	inputs.push('recordId=' + follicularstudyReportId);
	
	inputs.push('comments=' + studycmt);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "TreatmentServlet",
		url : "ehat/ivffm/addCommentsInStudyRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error:');
		},
		success : function(r) {
			if(r==1){
			alert("Study Record Saved Successfully...");
			}else{
				alert("Network Issue");
			}
			//HideCommentPopUp();
			//viewStudyTable(cnt);
		}
	});

	


	
}


function closeStudyRecord(){
	var saveFrom = $("#saveFrom").val();
	
	
	if(saveFrom !="fm"){
		alert("Please Close From IVF..");
		return false;
	}
	var currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	var dd = currentDate.getDate();
	var mm = currentDate.getMonth() + 1; // January is 0!
	var yyyy = currentDate.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var date = dd + '/' + mm + '/' + yyyy;
	
	var rowId = $("#rowId").val();
	//var studyid = $("#studyid").val();
	var studyid = $("#masterFollicularStudyId").val();
	
	if(studyid != 0){
	rowId--;

	}
//old	
//	var patId = $('#pid').text();
	
	var patId = $('#pt_Id').val();	
 	var start_date = $("#stdt"+(rowId)).val();
 	var ivfCoupleId = $("#ivfCoupleId").val();
 	
 
 	
	if (start_date == "") {
		alert("Please Select Start Date...");
		return false;
	}
	var end_date = date;
	var study_status = "Completed";
	
	var inputs = [];
	//inputs.push('action=saveUpdateStudyByID');
	//inputs.push('start_date=' + start_date);
	inputs.push('endDate=' + end_date);
	//inputs.push('study_status=' + study_status);
	//inputs.push('patId=' + patId);
	//inputs.push('ivfCoupleId=' + ivfCoupleId);
	inputs.push('cycleStatus=' + study_status);
	inputs.push('masterFollicularStudyId=' + studyid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "TreatmentServlet",
		url : "ehat/ivffm/cancelOrCloseCycle",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error:');
		},
		success : function(r) {
			if(r==1){
				alert("Study Closed Successfully...");
				}else{
					alert("Network Issue");
				}
			//closePopUpbtn();
		}
	});
}


function toCreateStudyDiv() {
	
	var currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	var dd = currentDate.getDate();
	var mm = currentDate.getMonth() + 1; // January is 0!
	var yyyy = currentDate.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var tdate = dd + '/' + mm + '/' + yyyy;
	
	var studyQueryType = $('#studyQueryType').val();
	if(studyQueryType == "Completed"){
		alert("This Study is Completed, Please Initiate New Process...");
		return false;
	}
	var rowCount = $("#stdRowCnt").val();
	
	if(rowCount == 0){
		$("#testTable").empty();
	}
	rowCount++;
	var days = "";
	var lmpdate = $("#lmpdt").val();
	
	
	
	if(lmpdate === ""){
		alert("Please Select LMP date First.....");
		return false;
	}
	
	
	if(tdate < lmpdate ){
		alert("please Select LMP Date Less Than Or Equal To Current Date...");
		return false;
	}

	
	
	if(lmpdate != 0 && lmpdate != "" && lmpdate != "0")
	{	
	var d1= getDataObj(tdate);
	var d2= getDataObj(lmpdate);
	days = (d1-d2)/86400000;
	}else if(days == "NaN"){
		days = "0";
	}
	//$('#studyidR').val(0);
	var tabelLength = $('#follicularbasicinfotabel tbody tr.newStudyRow').length;
	
	var fmid=$('#studyidR'+tabelLength).val();
	
	if(fmid == 0){
		alert("Please Save Previous Record First..");
		return false;
	}
	
	$("#testTable").append("<tr class='newStudyRow' id='count"+(rowCount)+"'><td >"+(rowCount)+"</td>" +
			"<td ><input onclick=' getFollicularDate(this.id)' class='form-control input-SmallText TextFont' id='date"+(rowCount)+"' value='"+tdate+"'></td> " +
			"<td ><input type='text' class='form-control input-SmallText TextFont' id='days"+(rowCount)+"' value='"+days+"' onkeypress='return validateNumbers(event)'></td> " +
			"<td ><input type='text' class='form-control input-SmallText TextFont' id='rtov"+(rowCount)+"' onkeypress='return validateNumbers(event)'></td> " +
			"<td ><input type='text' class='form-control input-SmallText TextFont' id='ltov"+(rowCount)+"' onkeypress='return validateNumbers(event)'></td> " +
			"<td ><input type='text' class='form-control input-SmallText TextFont' id='endo"+(rowCount)+"' onkeypress='return validateNumbers(event)'></td> " +
			"<td ><input type='text' class='form-control input-SmallText TextFont' id='drug"+(rowCount)+"' onkeypress=''></td> " +
			"<td ><input type='text' class='form-control input-SmallText TextFont' id='dose"+(rowCount)+"' onkeypress=''></td> " +
			"<td ><input type='text' class='form-control input-SmallText TextFont' id='pod"+(rowCount)+"' onkeypress=''></td> " +
			"<td ><button type='button' id='hiddenstd"+(rowCount)+"' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='toRmvStudyDiv("+(rowCount)+")' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;" +
			"<button type='button' id='hiddencmd"+(rowCount)+"' class='btn btn-xs btn-success editUserAccess' style='margin-center: 6px;cursor: pointer;margin-left:38px;' onclick='saveStudyReportRecord("+(rowCount)+")' type='button'><i class='fa fa-save'></i></button>" +
			"<button type='button' id='hiddencmd"+(rowCount)+"' class='btn btn-xs btn-warning' style='margin-center: 6px;cursor: pointer;margin-left:38px;margin-top: -34px;' onclick='addComment("+(rowCount)+")' type='button'><i class='fa fa-edit'></i></button> </td>" +
		
			"<td ><input type='hidden' class='form-control input-SmallText TextFont' id='studyidR"+(rowCount)+"' value="+0+"></td> " +
			+"</tr>");
	
	new JsDatePick({
		useMode : 2,
		target : "date"+(rowCount),
		/* dateFormat:"%d-%M-%Y", */
		yearsRange : [ 1920, 2099 ],
		limitToToday : false,
		/* cellColorScheme:"beige", */
		dateFormat : "%d/%m/%Y",
		imgPath : "../img/",
		weekStartDay : 1,
	});
	
	$('#stdRowCnt').val(rowCount);
	
}

function toRmvStudyDiv(RowCount) {

	
	var hr = $('#hiddenstd').val();
	var date = $('#date'+RowCount).val();
	/*var Tid = $('#treatmentId').val();
	var patid = $('#pid').text();*/
	
	var Tid = $('#tr_Id').val();  //added bya paras
	var patId = $('#pt_Id').val();   //added bya paras
	
	var studyidR = $('#studyidR'+RowCount).val();
	
	
	var cnt = $("#cnt").val();
	var inputs = [];
	var r = confirm("Are you sure to Delete Study of Date="+date+" ?");
	if (r == false) {
		return false;
	}
	
	var userId=1;
	
	//inputs.push('action=DeleteStudyRec');
	//inputs.push('hr=' + hr);
	//inputs.push('date=' + date);
	//inputs.push('Tid=' + Tid);
	//inputs.push('patid=' + patId);
	//inputs.push('studyidR=' + studyidR);
	
	inputs.push('userId=' + userId);
	inputs.push('recordId=' + studyidR);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "TreatmentServlet",
		url : "ehat/ivffm/deleteStudyRecord",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			 
		},
		success : function(r) {
			if(r==1){
			alert("Deleted Successfully...");
			}else{
				alert("Network Issue.");
			}
			//viewStudyTable(cnt);
			fetchStudyStudyRecord();
		}
	});
}

function printStudyData(paramPopupOrPrint) {
	
		
	
	
		var pid = $("#pt_Id").val();
		var tid = $('#tr_Id').val();
		var inidate = $('#inidate').val();
		var IVFTreatmentId = $('#IVFTreatmentId').val();
		var masterFollicularStudyId =   $('#masterFollicularStudyId').val();
		
		var pageSize = "standard"; 
		var billId=0;
		var recId=0;
		 var pendFlag="N"; 
		

	
		
		
		 window.open("follicularStudyPrint.jsp?billId="+billId+"&treatId="+tid+"&patId="+pid+"&recId="+recId+"&pendFlag="+pendFlag+"&cycleNo="+0+"&inidate="+inidate+"&IVFTreatmentId="+IVFTreatmentId+"&masterFollicularStudyId="+masterFollicularStudyId);
	 
}

function setbasicStudyData(id){
	
	
	var ajaxResponse = $("#follicularDetails").html();
	$("#masterFollicularStudyId").val(id);
	openFMModal();	
	//getBasicStudyDataForFollucularStudy();
	//getBasicStudyDataForFollucularStudyF();
	
	
	
}
/************
* @author	: Dayanand  khandekar
* @date		: 15-Dec-2020
* @codeFor	: get basic follicular study data from ehat_follicular_study_slave table for follicular pop up
 ************/

function getBasicStudyDataForFollucularStudy(){
	var inputs = [];
	var masterFollicularStudyId=$("#masterFollicularStudyId").val();
	
   	inputs.push('masterFollicularStudyId=' + masterFollicularStudyId);
   

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getBasicStudyDataForFollucularStudy",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			
				 $("#ageF").val(r.age);
				 $("#pWeight").val(r.weight);
				 $("#pHeight").val(r.height);
				 $("#bmi").val(r.bmi);
				 $("#afc").val(r.afc);
				 $("#Rx").val(r.rx);
				 $("#hsg").val(r.hsg);
				 $("#hsa").val(r.hsa);
				
				 $("#protocoloF").val(r.protocoloF);
				 $("#lmpdt").val(r.lmpdate);
				 $("#saveFrom").val(r.saveFrom);

	}
	});
}




/********************************************************************************
 * @author Dayanand Khandekar
 * @since 17-12-2020
 * @comment for create row for Follicular basic info  table
*******************************************************************************/
function createRowForFollicular(){

	var rowCount = $('#tableBodyForFollicularInfo tr').length;
	
	//rowCount++;

var currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);
var dd = currentDate.getDate();
var mm = currentDate.getMonth() + 1; // January is 0!
var yyyy = currentDate.getFullYear();
if (dd < 10) {
	dd = '0' + dd;
}
if (mm < 10) {
	mm = '0' + mm;
}
var tdate = dd + '/' + mm + '/' + yyyy;
	if(rowCount == 0){
		$("#tableBodyForFollicularInfo").empty();
	}
	rowCount++;
	
	
	
	$("#tableBodyForFollicularInfo").append("<tr class='newStudyRowF' id='count"+(rowCount)+"'>"
			
			/*+"<td >"+(rowCount)+"</td>" */
			
			+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='studyidRF" + rowCount + "' value='"
			+ 0 + "' ></td>"
			
			+ "<td><input type='checkbox' class='chkfm' id='checkbox" 
			+ parseInt(rowCount)
			+ "' name='checkbox'  value='"+parseInt(rowCount)+"'></td>"
			
			+"<td ><input  type='text' onclick='getFollicularDate(this.id," + rowCount +	")' class='form-control input-SmallText TextFont'    id='dateF"+(rowCount)+"' value='"+tdate+"'></td> " 
			
			+"<td ><input type='text'  class='form-control input-SmallText TextFont'  id='amhF"+(rowCount)+"' ></td> "
			
			+"<td ><input type='text' class='form-control input-SmallText TextFont' id='fshF"+(rowCount)+"' ></td> " 
			
			+"<td ><input type='text' class='form-control input-SmallText TextFont' id='tshF"+(rowCount)+"' ></td> "
			
			+"<td ><input type='text' class='form-control input-SmallText TextFont' id='prlF"+(rowCount)+"' ></td> " 
			
			+"<td ><input type='text' class='form-control input-SmallText TextFont' id='e2F"+(rowCount)+"' ></td> " 
			
			+"<td ><input type='text' class='form-control input-SmallText TextFont' id='p4F"+(rowCount)+"' ></td> "
			
			+"<td ><input type='text' class='form-control input-SmallText TextFont' id='lhF"+(rowCount)+"' ></td> " 
			
			/*+"<td ><button type='button' id='hiddenstdF"+(rowCount)+"' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='toRmvStudyDivForFollicular("+(rowCount)+")' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;"*/
			
		/*	+"<input type='hidden' id='studyidRF"+(rowCount)+"' value='"+0+"' />"*/ 
			
			+"</tr>");
	
	/*new JsDatePick({
		useMode : 2,
		target : "dateF"+(rowCount),
		 dateFormat:"%d-%M-%Y", 
		yearsRange : [ 1920, 2099 ],
		limitToToday : false,
		 cellColorScheme:"beige", 
		dateFormat : "%d/%m/%Y",
		imgPath : "../img/",
		weekStartDay : 1,
	});*/
	
	$('#stdRowCntF').val(rowCount);
	
	
	
}


/********************************************************************************
 * @author Dayanand Khandekar
 * @since 17-12-2020
 * @comment Save Basic Follicular Info
*******************************************************************************/

function saveFollicualrStudyBasicInfo(){
	var Tid = $('#tr_Id').val();  
	var patId = $('#pt_Id').val(); 
	var unitId		= parseInt($("#unitId").val());
 	var userId		= parseInt($("#userId").val());
 	var masterFollicularStudyId = $("#masterFollicularStudyId").val();
 	
 	
 	
 // this is for contact details
 	var follicularInfo =  $('#follicularStudyTabel tbody tr.newStudyRowF').length;
 	  if (follicularInfo == "" || follicularInfo == null || follicularInfo == 0 ) { 
 		  alert("Enter at least One Record In Follicular Info tab "); return false; 
 	  }

	var follicularBasicinfoDetails = {
			getListForFollicularStudy : []
	};
	var rows = $('#follicularStudyTabel tbody tr.newStudyRowF').length;
	for ( var i = 1; i <= rows; i++) {
		
		
		var follicularId = $("#studyidRF" + i).val();
		
		var dateF = $("#dateF" + i).val();
		var amhF = $("#amhF" + i).val();
		var fshF = $("#fshF" + i).val();
		var tshF = $("#tshF" + i).val();
		var prlF = $("#prlF" + i).val();
		var e2F = $("#e2F" + i).val();
		var p4F = $("#p4F" + i).val();
		var lhF = $("#lhF" + i).val();
		setFollicularStudyInfoList(follicularBasicinfoDetails, follicularId,
				dateF, amhF, fshF,tshF,prlF,e2F,p4F,lhF,patId,Tid,masterFollicularStudyId,userId,unitId);
	}

	follicularBasicinfoDetails = JSON
			.stringify(follicularBasicinfoDetails);
	
	
	var inputs = [];
	inputs.push("follicularBasicinfoDetails="+ encodeURIComponent(follicularBasicinfoDetails));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/saveFollicualrStudyBasicInfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if(r==1){
				alert("Record Saved Successfully");
			}else{
				alert("Network Issue..");
			}
			
			
			$("#tableBodyForFollicularInfo").html(" ");
			getBasicStudyDataForFollucularStudyF();
			
		}
	});
 	
 	
}


function setFollicularStudyInfoList(follicularBasicinfoDetails, follicularId,
		dateF, amhF, fshF,tshF,prlF,e2F,p4F,lhF,patId,Tid,masterFollicularStudyId,userId,unitId){
	follicularBasicinfoDetails.getListForFollicularStudy.push({
		follicularId:		follicularId,
		dateF : dateF,
		amhF : amhF,
		fshF : fshF,
		tshF : tshF,
		prlF : prlF,
		e2F : e2F,
		p4F : p4F,
		lhF : lhF,
		patientId : patId,
		treatmentId : Tid,
		masterMollicularId:masterFollicularStudyId,
		createdBy:userId,
		unitId:unitId,
		updatedBy:userId,
	});
}


/************
* @author	: Dayanand  khandekar
* @date		: 15-Dec-2020
* @codeFor	: get basic follicular study data from follicular_basic_info table for follicular pop up
 ************/

function getBasicStudyDataForFollucularStudyF(){
	var inputs = [];
	var masterFollicularStudyId=$("#masterFollicularStudyId").val();
	
   	inputs.push('masterFollicularStudyId=' + masterFollicularStudyId);
   	var studyQueryType = $('#studyQueryType').val();
  

   
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getListForFollicularStudy",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			$("#tableBodyForFollicularInfo").html(" ");
			
			if(r.getListForFollicularStudy.length>0){
				
				for(var rowCount=0;rowCount<r.getListForFollicularStudy.length;rowCount++)
				{
					
					if(studyQueryType == "Completed"){
					
					$("#tableBodyForFollicularInfo").append("<tr class='newStudyRowF' id='count"+(rowCount+1)+"'>" 
							
							/*+"<td >"+(i+1)+"</td>"*/ 
							
							+ "<td> <span id='snum"+(rowCount+1)+"'>"+(rowCount+1)+"</span><input type='hidden' id='studyidRF"+(rowCount+1)+"' value="+r.getListForFollicularStudy[rowCount].follicularId+"></td>"
							
							
							+ "<td><input type='checkbox' class='chkfm'   value='"+(rowCount+1)+"'"
							
							+ " name='fmdocid'   isNew='false' id="+r.getListForFollicularStudy[rowCount].follicularId+"></td>"
							
							
							+"<td ><input type='text' class='form-control input-SmallText TextFont'  onclick=getFollicularDate(this.id)    id='dateF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].dateF+"'></td> "
							
							+"<td ><input type='text' class='form-control input-SmallText TextFont' id='amhF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].amhF+"'></td> "
							
							+"<td ><input type='text' class='form-control input-SmallText TextFont' id='fshF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].fshF+"'></td> "
							
							+"<td ><input type='text' class='form-control input-SmallText TextFont' id='tshF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].tshF+"'></td> "
							
							+"<td ><input type='text' class='form-control input-SmallText TextFont' id='prlF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].prlF+"'></td> " 
							
							+"<td ><input type='text' class='form-control input-SmallText TextFont' id='e2F"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].e2F+"'></td> "
							
							+"<td ><input type='text' class='form-control input-SmallText TextFont' id='p4F"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].p4F+"'></td> "
							
							+"<td ><input type='text' class='form-control input-SmallText TextFont' id='lhF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].lhF+"'></td> "
							
							/*+"<td ><button type='button' id='hiddenstdF"+(rowCount+1)+"' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='toRmvStudyDivForFollicular("+(rowCount+1)+")' disabled='disabled' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;" 
							
							+"<button type='button' id='hiddencmdF"+(rowCount+1)+"' style='display:none' class='btn btn-xs btn-warning' style='margin-center: 6px;cursor: pointer;margin-left:38px;margin-top: -34px;' onclick='addComment("+(rowCount+1)+")' type='button'><i class='fa fa-edit'></i></button></td>" +
							"<input type='hidden' id='studyidRF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].follicularId+"' />" +
									"" */
							
							+"</tr>");
							
							$('#stdRowCntF').val(rowCount+1);
							$('#savebasicinfoF').prop('disabled',true);
					   		$('#createdivF').prop('disabled',true);
					   		/*new JsDatePick({
					   			useMode : 2,
					   			target : "dateF"+(rowCount+1),
					   			 dateFormat:"%d-%M-%Y", 
					   			yearsRange : [ 1920, 2099 ],
					   			limitToToday : false,
					   			 cellColorScheme:"beige", 
					   			dateFormat : "%d/%m/%Y",
					   			imgPath : "../img/",
					   			weekStartDay : 1,
					   		});*/
					}else{
						$("#tableBodyForFollicularInfo").append("<tr class='newStudyRowF' id='count"+(rowCount+1)+"'>" 
								
								/*+"<td >"+(i+1)+"</td>"*/ 
								
								+ "<td> <span id='snum"+(rowCount+1)+"'>"+(rowCount+1)+"</span><input type='hidden' id='studyidRF"+(rowCount+1)+"' value="+r.getListForFollicularStudy[rowCount].follicularId+"></td>"
								
								
								+ "<td><input type='checkbox' class='chkfm'   value='"+(rowCount+1)+"' "
								+ (rowCount+1)
								+ " name='fmdocid'   isNew='false' id="+r.getListForFollicularStudy[rowCount].follicularId+"></td>"
								
								
								+"<td ><input type='text' class='form-control input-SmallText TextFont'  onclick=getFollicularDate(this.id)    id='dateF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].dateF+"'></td> "
								
								+"<td ><input type='text' class='form-control input-SmallText TextFont' id='amhF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].amhF+"'></td> "
								
								+"<td ><input type='text' class='form-control input-SmallText TextFont' id='fshF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].fshF+"'></td> "
								
								+"<td ><input type='text' class='form-control input-SmallText TextFont' id='tshF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].tshF+"'></td> "
								
								+"<td ><input type='text' class='form-control input-SmallText TextFont' id='prlF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].prlF+"'></td> " 
								
								+"<td ><input type='text' class='form-control input-SmallText TextFont' id='e2F"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].e2F+"'></td> "
								
								+"<td ><input type='text' class='form-control input-SmallText TextFont' id='p4F"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].p4F+"'></td> "
								
								+"<td ><input type='text' class='form-control input-SmallText TextFont' id='lhF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].lhF+"'></td> "
								
								/*+"<td ><button type='button' id='hiddenstdF"+(rowCount+1)+"' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='toRmvStudyDivForFollicular("+(rowCount+1)+")' disabled='disabled' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;" 
								
								+"<button type='button' id='hiddencmdF"+(rowCount+1)+"' style='display:none' class='btn btn-xs btn-warning' style='margin-center: 6px;cursor: pointer;margin-left:38px;margin-top: -34px;' onclick='addComment("+(rowCount+1)+")' type='button'><i class='fa fa-edit'></i></button></td>" +
								"<input type='hidden' id='studyidRF"+(rowCount+1)+"' value='"+r.getListForFollicularStudy[rowCount].follicularId+"' />" +
										"" */
								
								+"</tr>");
								
								$('#stdRowCntF').val(rowCount+1);
								$('#savebasicinfoF').prop('disabled',false);
						   		$('#createdivF').prop('disabled',false);
						   		/*new JsDatePick({
						   			useMode : 2,
						   			target : "dateF"+(rowCount+1),
						   			 dateFormat:"%d-%M-%Y", 
						   			yearsRange : [ 1920, 2099 ],
						   			limitToToday : false,
						   			 cellColorScheme:"beige", 
						   			dateFormat : "%d/%m/%Y",
						   			imgPath : "../img/",
						   			weekStartDay : 1,
						   		});*/
					}
							
					
				}
				
			
			}
				
			

	}
	});
}
/********************************************************************************
 * @author Dayanand Khandekar
 * @since 17-12-2020
 * @comment for remove row for Follicular basic info  table
*******************************************************************************/
function toRmvStudyDivForFollicular(rowCount){
	var studyidRF = $("#studyidRF"+(rowCount)).val();
	var userId		= parseInt($("#userId").val());
	
	var masterFollicularStudyId=$("#masterFollicularStudyId").val();
	
	var r = confirm("Are you sure to Delete Study  ?");
	if (r == false) {
		return false;
	}
	
	var inputs = [];
	
	inputs.push('studyidRF=' + studyidRF);
	inputs.push('userId=' + userId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/deleteFollicularBasicInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
				alert(r);
				$("#tableBodyForFollicularInfo").html("");
				getBasicStudyDataForFollucularStudyF();

	}
	});
}


function getFollicularDate(inputID,id) {
	

	new JsDatePick({
		useMode : 2,
		target : inputID,
		
		yearsRange : [ 1920, 2099 ],
		limitToToday : false,
		dateFormat : "%d/%m/%Y", 
		imgPath : "../img/",
		weekStartDay : 1,
	});

	
	
	/*new JsDatePick({
	useMode : 2,
	target : "dateF"+(rowCount),
	 dateFormat:"%d-%M-%Y", 
	yearsRange : [ 1920, 2099 ],
	limitToToday : false,
	 cellColorScheme:"beige", 
	dateFormat : "%d/%m/%Y",
	imgPath : "../img/",
	weekStartDay : 1,
});*/

}

function checkMaterMollicularId(id){
	alert("Please save FM Study");
	return false;
}

function finalCalculatedBMIForFM() {
	var weight = $("#pWeight").val();
	var height = $("#pHeight").val();
	
	if(height==""){
		 $("#bmi").val("");
		 return false;
	}
	
	var BMI = 0;
	var heightInCM = (height / 100);
	BMI = weight / Math.pow(heightInCM, 2);

	if (BMI == "Infinity")
		BMI = 0;

	if (isNaN(BMI))
		BMI = 0;
	
	 $("#bmi").val(BMI.toFixed(2));
	
	return (BMI.toFixed(2));

}

function getStudyCommitByReportId(follicularstudyReportId){
var inputs = [];
	
	inputs.push('follicularstudyReportId=' + follicularstudyReportId);
		
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getStudyCommitByReportId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
				
				$("#txtComment").val(r);
				

	}
	});
	
}



/************
* @author	:Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: delete multiple rows from fm basic info info
 ************/

function deleteBasicInfoOfFollicular(tableId,checkboxClass){
	var docId = new Array();
	var userId		= parseInt($("#userId").val());
	$("input[name='fmdocid']:checked").each(function() {	
		
		
		var slaveId=$("#studyidRF"+$(this).val()).val();
		
		
		if(slaveId >0){
	//	docId.push(slaveId);
	//	docId.push($(this).attr('id'));
			
			docId.push($("#studyidRF"+$(this).val()).val());
		}
	});


	
   if(docId.length>0){

	 var inputs = [];
		inputs.push('fmIds=' + docId);
		inputs.push('userId=' + userId);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/shelfsponser/deleteBasicInfoOfFollicular",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(response) {
				$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
				alert(response);
				checkForFM(tableId);
				checkFMSequence(tableId);
				//getIvfCalenderInfo();
				//getBasicStudyDataForFollucularStudyF();
				
				 
			}
		}); 
   } else{
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	checkForFM(tableId);
	checkFMSequence(tableId);	 
	
   }
	
}


/************
* @author	:Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: For reorder srno after delete
 ************/
function checkForFM(tableId){
	
	obj=$('#'+tableId+' tbody tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		$('#'+id).html(key+1);
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: For reorder index ids of componant after delete
 ************/
function checkFMSequence(tableId){

	var trLength = $('#'+tableId).find("tr:first th").length;
	
	obj=$('#'+tableId+' tbody tr td').find('input,select,span,td');
	var inx = 1;
	var idIndex = 1;
	$.each( obj, function( key, value ) {		
		
		if(inx == (trLength+1)){
			
			inx = 1;
			idIndex++;
		}		
		id=value.id;	
		
		var idText = (value.id).replace(/[0-9]/g, '');
		
		var replaceById = idText + idIndex;
		$('#'+id).attr('id',replaceById);
		
		
		inx++;
	});
}

function openFMModal(){
	
	var masterFollicularStudyId=$("#masterFollicularStudyId").val();
	var patientId=$("#pt_Id").val();
	var cycleNo=$("#cycleNo").val();
	var ivfCoupleId=$("#ivfCoupleId").val();
	var treatmentId = $("#tr_Id").val();
	var ivfTreatId = $("#ivfTreatId").val();
	var inidate = $("#inidate").val();
	var studyQueryType = $('#studyQueryType').val();
	var stdRowCnt = $("#stdRowCnt").val();
	var saveFrom= $("#saveFrom").val();
	
		setTimeout(function() {
			window.open(("ivf_fm.jsp?" + "&masterFollicularStudyId="+ masterFollicularStudyId + "&patientId=" + patientId + "&cycleNo=" + cycleNo + "&ivfCoupleId=" + ivfCoupleId+"&treatmentId=" + treatmentId+"&ivfTreatId=" + ivfTreatId+"&inidate=" + inidate+"&studyQueryType=" + studyQueryType+"&stdRowCnt=" + stdRowCnt+"&saveFrom=" + saveFrom));
		}, 300);
	
}


function getDataObj(str){
	var arr= str.split("/");
	return new Date(arr[2], arr[1], arr[0]);
}


function saveFollicularData(){

	
	var fmFollicularDataMasterId = $('#fmFollicularDataMasterId').val();
	var masterFollicularStudyId = $('#masterFollicularStudyId').val();
	
	var age = $('#ageF').val();
	var pWeight = $('#pWeight').val();
	var pHeight = $('#pHeight').val();
	var bmi = $('#bmi').val();
	var afc = $('#afc').val();
	var rx = $('#Rx').val();
	var hsg = $('#hsg').val();
	var hsa = $('#hsa').val();
	var Tid = $('#tr_Id').val();  
	var patId = $('#pt_Id').val();   
	
	
	var lmpdate = $("#lmpdt").val();
	
	if(lmpdate == ""){
		alert("Please Select Lmp Date First..");
		return false;
	}
	
	
	
	
	var inputs = [];
	

	
	inputs.push('follicylarMasterId=' + fmFollicularDataMasterId);
	inputs.push('masterFollicularStudyId=' + masterFollicularStudyId);
	inputs.push('treatmentId=' + Tid);
	inputs.push('patientId=' + patId);
	inputs.push('lmpDate=' + lmpdate);
	inputs.push('age=' + age);
	inputs.push('weight=' + pWeight);
	inputs.push('height=' + pHeight);
	inputs.push('bmi=' + bmi);
	inputs.push('afc=' + afc);
	inputs.push('rx=' + rx);
	inputs.push('hsg=' + hsg);
	inputs.push('hsa=' + hsa);
	
	
	
	
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
	//	url : "TreatmentServlet",
		
		url : "ehat/ivffm/saveFollicularData",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error:');
		},
		success : function(r) {
			
			getLisOfFmData();
		}
	});


}

function  getLisOfFmData(){
	
	var masterFollicularStudyId = $('#masterFollicularStudyId').val();
	var patId = $('#pt_Id').val();   
	
	var inputs = [];
	
	inputs.push('masterFollicularStudyId=' + masterFollicularStudyId);
	
	inputs.push('patientId=' + patId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
	//	url : "TreatmentServlet",
		
		url : "ehat/ivffm/getLisOfFmData",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error:');
		},
		success : function(r) {
			
			setFMData(r);
			
			
			
		}
	});



	
}



function setFMData(r){
	
	$("#tableBody").html("");
	var htm = "";
	var rowCount = 0;

	
	if (r.getListOfFMDTO.length > 0) {

		for ( var i = 0; i < r.getListOfFMDTO.length; i++) {
			rowCount++;
			
			htm = htm
					+ "<tr class='newStudyRowOvamPickUp1' id='count"
					+ (rowCount)
					+ "'>"
					
					+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden' id='ovamPickUpSlave"+rowCount+"' value="+r.getListOfFMDTO[i].follicylarMasterId+"></td>"
					
					
					+"<td><input type='text'  class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfFMDTO[i].lmpDate
					+ "'  id='appearance"
					+ (rowCount)
					+ "' style='width:65px'  ></td> "
					

					+"<td><input type='text'  class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfFMDTO[i].age
					+ "'  id='appearance"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont' value='"
					+ r.getListOfFMDTO[i].weight
					+ "' onclick='getDateForOvamPickUpSlave(this.id)'  style='width:79px'   id='ovampickupslavedate"
					+ (rowCount)
					+ "' ></td> "
					
					
					
					+ "<td ><input type='text' class='form-control input-SmallText TextFont'   value='"
					+ r.getListOfFMDTO[i].height
					+ "'    id='maturity"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'    value='"
					+ r.getListOfFMDTO[i].bmi
					+ "' id='pbappearance"
					+ (rowCount)
					+ "' style='width:65px'  ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'    value='"
					+ r.getListOfFMDTO[i].afc
					+ "' id='pbappearance"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'    value='"
					+ r.getListOfFMDTO[i].rx
					+ "' id='pbappearance"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'    value='"
					+ r.getListOfFMDTO[i].hsg
					+ "' id='pbappearance"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'    value='"
					+ r.getListOfFMDTO[i].hsa
					+ "' id='pbappearance"
					+ (rowCount)
					+ "' ></td> "
					
					
					
					
					+ "</tr>";
			//rowCount++;
		}
		
		
		$("#tableBody").append(htm);
	}
}

function getPatientInfoByTreatIdOnFM(){
	
	var treatmentId = $("#tr_Id").val();
	if (treatmentId == null || treatmentId == undefined || treatmentId == "") {
		alert("Please select patient");
		return false;
	}
	var dpid = 1;

	
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
	inputs.push('dpid=' + encodeURIComponent(dpid));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/opdhistory/getPatientInfoByTreatmentId",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					
					
					if (r.listOpdPatientDetailsDto[0].weight != null ) {
						$("#pWeight").val(r.listOpdPatientDetailsDto[0].weight);
					} 
					if ( r.listOpdPatientDetailsDto[0].height != null) {
						
						$("#pHeight").val(r.listOpdPatientDetailsDto[0].height);
					}
					
					var age="";
					var dob = r.listOpdPatientDetailsDto[0].dob;
					if (dob != "") {
						var ageString = getAgeYMD(dob);
						var ageStringArray = ageString.split("___");
						$("#year").val(ageStringArray[0]);
						$("#month").val(ageStringArray[1]);
						$("#days").val(ageStringArray[2]);
						
						age=ageStringArray[0]+"Y_"+ageStringArray[1]+"M_"+ageStringArray[2]+"D";
						
					}
					
					$("#ageF").val(age);
					
				}
			});
				
					
	
}