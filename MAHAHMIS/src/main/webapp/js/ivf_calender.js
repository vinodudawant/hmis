function getIvfCalender(id){
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#diets").hide();
	$("#Prescription").hide();
	$("#ipdDoctorStationJSPHeadDiv").html(" ");
	temForIvfCalender(id);
}
function temForIvfCalender(id) {
	var temp = '<div class="tab-pane fade active in" id="Study"><form>'
			+ '<div class="centered"><div class="divide-10"></div>'
			+ '<div style="height: 50px;" class="col-md-1-1"><input type="button" onclick="setIvfTemp()" value="Initiate" name="Initiate">'
			+ '</div><div class="col-md-1-1 li pull-right">'
			+ '<button id="saveStudyForIVFId" data-original-title="Save" class="btn btn-xs btn-success editUserAccess" data-toggle="tooltip" data-placement="left" onclick="saveStudyForIVF()" id="saveStudyid" type="button">'
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
			+ '<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Ovum Pickup</div></th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Embryo Transfar</div></th>'
			+ '</tr></thead><tbody id="ivfCalenderBody"></tbody></table>'
			+ '</div></div></div></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);

	var prevtr = $("#prevtr").val();
	if(prevtr == "previousIvfTreatment"){
		//alert(prevtr);
		document.getElementById("saveStudyForIVFId").disabled = "true";
	}

	fetchStudyDataForIVF();
	
}

function setIvfTemp() {
	/*
	 * var gender = $("#patGender").val();
	 * 
	 */var ivfCoupleId = $("#ivfCoupleId").val();
	// ivfCoupleId=1;
	 
	if (ivfCoupleId == 0 || ivfCoupleId == "") {
		alert("Please First Generate Couple id...");
		return false;
	}
	var gender = $("#sex").text().trim();
	if (gender == "Male" || gender == 'male') {
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

	var rowId = $("#rowIdIVF").val();

	$('#studyid').val(0);
	if (rowId != 0) {

		var rw = rowId - 1;

		var hiddenstatus = $("#stdstatus" + (rw)).val();

		if (hiddenstatus == "Running") {
			alert("Please Complete Current Running Study First..");
			return false;
		} else if (hiddenstatus == "Stop") {
			alert("Please Complete Current Stoped Study First..");
			return false;
		}
	}
	fetchStudyData();

	var saveFromCall = $("#saveFromCall").val();
	
	if ( saveFromCall == "Running") {
		alert("Please Complete Current Running Study First IN FM..");
		return false;
	}
	
	$("#ivfCalenderBody")
			.append(
					"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont'>"
							+ (rowId)
							+ "</div></td>"
							+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='stdt"
							+ (rowId)
							+ "' onclick=displayCalendar(document.getElementById(\'stdt"
							+ (rowId)
							+ "\'),\'dd/mm/yyyy\',this) value='"
							+ date
							+ "' onchange='setQueryType("
							+ (rowId)
							+ "),validateNumberWithSlashByRegEx(stdt"
							+ (rowId)
							+ ")'/></td> "
							+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='endt"
							+ (rowId)
							+ "' onclick=displayCalendar(document.getElementById(\'endt"
							+ (rowId)
							+ "\'),\'dd/mm/yyyy\',this) placeholder='End Date' onchange='setQueryType("
							+ (rowId)
							+ "),validateNumberWithSlashByRegEx(endt"
							+ (rowId)
							+ ")'/></td> "
							+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><select style='width: 100%;' id='stdstatus"
							+ (rowId)
							+ "' ><option value='Running' selected='selected'>Running</option><option value='Completed'>Completed</option><option value='Stop'>Stop</option></option><option value='Canceled'>Canceled</option></select></td>"
							+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddensid"
							+ (rowId)
							+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='setQueryType("
							+ (rowId)
							+ "),chekMasterIdForIvf()'><i class='fa fa-eye'></i></button></td></tr>");
	rowId++;
	$('#stdt' + (rowId)).val(date);
	$('#rowIdIVF').val(rowId);
	$('#iniproc').val(1);
}

function fetchStudyDataForIVF() {

	// var patId = $('#pid').text();
	var patId = $("#pt_Id").val(); // added by paras

	var inputs = [];
	inputs.push('action=fetchFollicularAll');
	inputs.push('patId=' + patId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/fetchFollicularStudyInfoForIVF",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;

			$("#follicularDetails").html(r);
			setStudyListForIVF(r);
		}
	});
}
function setStudyListForIVF(testObj) {
	// var testObj = eval('(' + data + ')');

	$("#ivfCalenderBody").empty();
	// $("#rowIdIVF").val(testObj.studyList.length+1);
	var count = 1;

	if (testObj.studyList.length > 0) {

		for ( var i = 0; i < testObj.studyList.length; i++) {

			if (testObj.studyList[i].status == "Completed" ||  testObj.studyList[i].status == "Canceled") {
				$("#ivfCalenderBody")
						.append(
								"<tr id='count"
										+ (i + 1)
										+ "'><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' type='hidden' id='rowCount"
										+ (i + 1)
										+ "' >"
										+ count
										+ "</div></td>"
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input disabled='disabled' id='stdt"
										+ (i + 1)
										+ "' onclick=displayCalendar(document.getElementById(\'stdt"
										+ (i + 1)
										+ "\'),\'dd/mm/yyyy\',this) placeholder='Start Date' onchange='setQueryType("
										+ (i + 1)
										+ ")' /></td> "
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input disabled='disabled' id='endt"
										+ (i + 1)
										+ "' onclick=displayCalendar(document.getElementById(\'endt"
										+ (i + 1)
										+ "\'),\'dd/mm/yyyy\',this) placeholder='End Date' onchange='setQueryType("
										+ (i + 1)
										+ ")'/></td> "
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><select disabled='disabled' style='width: 100%;' id='stdstatus"
										+ (i + 1)
										+ "' onchange='setQueryType("
										+ (i + 1)
										+ ")'><option id='1' value='Running'>Running</option><option id='2' value='Completed'>Completed</option><option id='3' value='Stop'>Stop</option><option id='4' value='Canceled'>Canceled</option></select></td> "
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddenRv"
										+ (i + 1)
										+ "' class='btn btn-xs btn-success viewStudyBtn' style='margin-left: 6px;cursor: pointer;' onclick='setCycleNo("+(i+1)+"),setbasicStudyDataForIVF("
										+ (testObj.studyList[i].studyid)
										+ ")' onchange='setQueryType("
										+ (i + 1)
										+ ")'><i class='fa fa-eye'></i></button></td>"
										
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddenRv"
										+ (i + 1)
										+ "' class='btn btn-xs viewStudyBtn' style='margin-left: 6px;cursor: pointer;background: #7dcea0' onclick='setCycleNo("+(i+1)+"),goToOvamPickup("
										+ ")' onchange='setQueryType("
										+ (i + 1)
										+ ")'><i class='fa fa-arrow-right' style='color: #FFF'></i></button></td>"
										
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddenRv"
										+ (i + 1)
										+ "' class='btn btn-xs viewStudyBtn' style='margin-left: 6px;cursor: pointer;background: #5dade2' onclick='setCycleNo("+(i+1)+"),goToEmbryoTransfer("
										+ ")' onchange='setQueryType("
										+ (i + 1)
										+ ")'><i class='fa fa-arrow-right' style='color: #FFF'></i></button></td>"
										
										
										+ "<input type='hidden' value='"
										+ (testObj.studyList[i].studyid)
										+ "' id='studyid" + (i + 1)
										+ "' /></tr>");
				$('#stdt' + (i + 1)).val(testObj.studyList[i].start_date);
				$('#endt' + (i + 1)).val(testObj.studyList[i].end_date);
				$('#stdstatus' + (i + 1)).val(testObj.studyList[i].status).attr('selected', 'selected');
			} else {

				$("#ivfCalenderBody")
						.append(
								"<tr id='count"
										+ (i + 1)
										+ "'><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' type='hidden' id='rowCount"
										+ (i + 1)
										+ "' >"
										+ count
										+ "</div></td>"
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='stdt"
										+ (i + 1)
										+ "' onclick=displayCalendar(document.getElementById(\'stdt"
										+ (i + 1)
										+ "\'),\'dd/mm/yyyy\',this) onchange='setQueryType("
										+ (i + 1)
										+ "),validateNumberWithSlashByRegEx(stdt"
										+ (i + 1)
										+ ")'/></td> "
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='endt"
										+ (i + 1)
										+ "' onclick=displayCalendar(document.getElementById(\'endt"
										+ (i + 1)
										+ "\'),\'dd/mm/yyyy\',this) placeholder='End Date' onchange='setQueryType("
										+ (i + 1)
										+ "),validateNumberWithSlashByRegEx(endt"
										+ (i + 1)
										+ ")'/></td> "
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><select style='width: 100%;' id='stdstatus"
										+ (i + 1)
										+ "' onchange='setQueryType("
										+ (i + 1)
										+ ")'><option id='1' value='Running'>Running</option><option id='2' value='Completed'>Completed</option><option id='3' value='Stop'>Stop</option><option id='4' value='Canceled'>Canceled</option></select></td> "
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddenRv"
										+ (i + 1)
										+ "' class='btn btn-xs btn-success viewStudyBtn' style='margin-left: 6px;cursor: pointer;' onclick='setCycleNo("+(i+1)+"),setbasicStudyDataForIVF("
										+ (testObj.studyList[i].studyid)
										+ ")' type='button' onchange='setQueryType("
										+ (i + 1)
										+ ")'><i class='fa fa-eye'></i></button></td>"
										
										
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddenRv"
										+ (i + 1)
										+ "' class='btn btn-xs viewStudyBtn' style='margin-left: 6px;cursor: pointer;background: #7dcea0' onclick='setCycleNo("+(i+1)+"),goToOvamPickup("
										+ ")' onchange='setQueryType("
										+ (i + 1)
										+ ")'><i class='fa fa-arrow-right' style='color: #FFF'></i></button></td>"
										
										+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddenRv"
										+ (i + 1)
										+ "' class='btn btn-xs viewStudyBtn' style='margin-left: 6px;cursor: pointer;background: #5dade2' onclick='setCycleNo("+(i+1)+"),goToEmbryoTransfer("
										+ ")' onchange='setQueryType("
										+ (i + 1)
										+ ")'><i class='fa fa-arrow-right' style='color: #FFF'></i></button></td>"
										
										
										
										+ "<input type='hidden' value='"
										+ (testObj.studyList[i].studyid)
										+ "' id='studyid" + (i + 1)
										+ "' /></tr>");
				$('#stdt' + (i + 1)).val(testObj.studyList[i].start_date);
				$('#endt' + (i + 1)).val(testObj.studyList[i].end_date);
				$('#stdstatus' + (i + 1)).val(testObj.studyList[i].status)
						.attr('selected', 'selected');
				
				$("#saveFrom").val(testObj.studyList[i].saveFrom);
			}
			count++;

			$("#rowIdIVF").val(count);
		}
		// getCoupleIdForIVF();
		/*var callFrom = ($("#callFrom").val()).trim();
		if (callFrom == "previousTreatmentOPDER") {
			$("#allTabDivID *").prop("disabled", true);
			$(".viewStudyBtn").prop("disabled", false);
		}*/
	}

}

function saveStudyForIVF() {

	var rowId = $("#rowIdIVF").val();
	var studyid = $("#studyid").val();
	if (rowId != 0) {
		rowId--;
	}
	var study_status = $("#stdstatus" + (rowId)).val();
	var hiddenstatus = $("#studyQueryType").val();
	var iniproc = $("#iniproc").val();

	/*
	 * if(iniproc == 0){ alert("Please initiate new process first."); return
	 * false; }
	 */

	if (hiddenstatus == "Running" && iniproc == 0) {
		alert("Please Complete Current Running Study First..");
		return false;
	} else if (hiddenstatus == "Stop" && iniproc == 0) {
		alert("Please Complete Current Stoped Study First..");
		return false;
	}
	// var patId = $('#pid').text();

	var patId = $("#pt_Id").val();// added by paras
	var start_date = $("#stdt" + (rowId)).val();
	if (start_date == "" || start_date == undefined) {
		alert("Please Select Start Date...");
		return false;
	}

	var end_date = $("#endt" + (rowId)).val();
	if (end_date == undefined) {
		alert("Please Select End Date...");
		return false;
	}

	if (study_status == "Completed") {
		var saveFrom = $("#saveFrom").val();
		
		if(saveFrom !="ivf"){
			alert("Please Close From FM..");
			return false;
		}
		
		if (end_date == "") {
			alert("Please Select End Date First...");
			return false;
		}

	}

	if (end_date != "") {
		var temp = end_date.split("/");
		var disDate = new Date(temp[2], temp[1] - 1, temp[0]);
		// var start_date = $("#stdt").html();
		var addt = start_date.split("/");
		var addDate = new Date(addt[2], addt[1] - 1, addt[0]);
		if (disDate < addDate) {
			alert("End Date Should be Greater than Start Date...");
			return false;
		}
	}
	/*
	 * if(end_date != ""){ if(end_date < start_date){ alert("End Date Should be
	 * Greater than Start Date..."); return false; } }
	 */
	var study_status = $("#stdstatus" + (rowId)).val();
	var ivfCoupleId = $("#ivfCoupleId").val();

	
	var inputs = [];
	//inputs.push('action=saveUpdateStudyByID');
	inputs.push('start_date=' + start_date);
	inputs.push('end_date=' + end_date);
	inputs.push('study_status=' + study_status);
	inputs.push('patientId=' + patId);
	inputs.push('studyid=' + studyid);
	inputs.push('saveFrom=' + "ivf");
	inputs.push('coupleId=' + ivfCoupleId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "TreatmentServlet",
		url : "ehat/ivffm/saveFmStudy",
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
			$("#ivfCalender").attr("class", "active");
			fetchStudyDataForIVF();
			$("#iniproc").val(0);
		}
	});
}

/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 1-1-2021
 * @comment for getCoupleIdForIVF
 ******************************************************************************/
function getCoupleIdForIVF() {

	var patId = $("#pt_Id").val();
	
	
	var inputs = [];

	inputs.push('patId=' + patId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getCoupleId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

		
			if(r=="" || r==undefined || r==null || r=="null" || r=="undefined"){
				$("#ivfCoupleId").val(0);
			}else{
			$("#ivfCoupleId").val(r);
			}
			
		}
	});
}

function setbasicStudyDataForIVF(id) {
	$("#masterFollicularStudyId").val(id);
	//$('#viewStudyTablePopupIVF').modal();
	//getBasicStudyDataForIVFCalender();
	//getIvfCalenderInfo();
	openIvfCalendar();
	
	
}

function saveStudyRecordForIVF() {

	var inserFlag = "N";

	var studyid = 0;

	var Tid = $('#tr_Id').val(); // added bya paras
	var patId = $('#pt_Id').val(); // added bya paras

	

	var lmpdate = $("#lmpdtivf").val();
	
	if(lmpdate === " "){
		alert("Please Enter LMP Date...");
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
	var tdate = dd + '/' + mm + '/' + yyyy;
	
	if(tdate < lmpdate ){
		alert("please Select LMP Date Less Than Or Equal To Current Date...");
		return false;
	}

	var age = $('#ageivf').val();
	var pWeight = $('#pWeightivf').val();
	var pHeight = $('#pHeightivf').val();
	var bmi = $('#bmiivf').val();
	var afc = $('#afcivf').val();
	var rx = $('#Rxivf').val();
	var hsg = $('#hsgivf').val();
	var hsa = $('#hsaivf').val();

	var protocoloF = $('#protocoloivf').val();
	var ivfCoupleId = $("#ivfCoupleId").val();

	

	var masterFollicularStudyId = $('#masterFollicularStudyId').val();

	var inputs = [];
	//inputs.push('action=saveStudyRecord');
	
	
	
	inputs.push('studyid=' + masterFollicularStudyId);//primary key in ehat_follicular_study_slave
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
			
					if(r == 1){
						var follicularInfo = $('#follicularStudyTabelivf tbody tr.newStudyRowF').length;
						if ( follicularInfo > 0) {
							saveCalenderInfoIVF();
						}
					
					}
			
			
			

		}
	});

}
function getBasicStudyDataForIVFCalender() {
	var inputs = [];

	var masterFollicularStudyId = $("#masterFollicularStudyId").val();

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
			
			
			
			$("#ageivf").val(r.age);
			$("#pWeightivf").val(r.weight);
			$("#pHeightivf").val(r.height);
			$("#bmiivf").val(r.bmi);
			$("#afcivf").val(r.afc);
			$("#Rxivf").val(r.rx);
			$("#hsgivf").val(r.hsg);
			$("#hsaivf").val(r.hsa);
			$("#protocoloivf").val(r.protocoloF);
			$("#lmpdtivf").val(r.lmpdate);
			$("#saveFrom").val(r.saveFrom);
			

			

		}
	});
}

function closeStudyRecordForIVF() {

	var saveFrom = $("#saveFrom").val();

	if (saveFrom != "ivf") {
		alert("Please Close From FM..");
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

	var rowId = $("#rowIdIVF").val();
	// var studyid = $("#studyid").val();
	var studyid = $("#masterFollicularStudyId").val();
	var ivfCoupleId = $("#ivfCoupleId").val();

	if (studyid != 0) {
		rowId--;

	}
	// old
	// var patId = $('#pid').text();

	var patId = $('#pt_Id').val();
	var start_date = $("#stdt" + (rowId)).val();
	if (start_date == "") {
		alert("Please Select Start Date...");
		return false;
	}
	var end_date = date;
	var study_status = "Completed";

	var inputs = [];
	/*inputs.push('action=saveUpdateStudyByID');
	inputs.push('start_date=' + start_date);
	inputs.push('end_date=' + end_date);
	inputs.push('study_status=' + study_status);
	inputs.push('patId=' + patId);
	inputs.push('studyid=' + studyid);
	inputs.push('ivfCoupleId=' + ivfCoupleId);
	inputs.push('saveFrom=' + "ivf");
*/	
	
	inputs.push('cycleStatus=' + study_status);
	inputs.push('masterFollicularStudyId=' + studyid);
	inputs.push('endDate=' + end_date);
	
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
			//closePopUpbtnForIVF();
		}
	});
}

function closePopUpbtnForIVF() {
	$("#viewStudyTablePopupIVF").modal('hide');
	$("#ivfbasicinfo1").html("");
	$("#ivfbasicinfo").html("");
	$("#ivfbasicinfo2").html("");
	$("#tableBodyForFollicularInfoIVF").html("");
	$("#tableBodyForFollicularInfoIVFC").html("");
	fetchStudyDataForIVF();
}
function getDateandDayForIvfCalender() {

	//alert("1");
	// var lmpdtivf=$("#lmpdtivf").val();
	var lmpdtivf = $("#lmpdtivf").val();

	// alert(lmpdtivf);
	// var lmpdtivf="2021/01/11";
	var lmpdtivfnew = lmpdtivf.split("/").reverse().join("/");
	var startDate = new Date(lmpdtivfnew);

	console.log(startDate);

	// Making lastDate equal to 4 more days
	// from startDate
	var endDate = startDate.addDay(30);

	getDates(startDate, endDate);
}

function getDates(date1, date2) {

	var _1Day = 24 * 3600 * 1000;
	var htm = "";
	var htm2 = "";
	var htm3 = "";
	
	var date = [];
var countday=1;
	var ms = date1 * 1;

	// Date[] keeps all the dates
	var month1 = new Date(date1).getMonth();
	var month2 = new Date(date2).getMonth();
	

	htm = htm + "<th>#</th>";
	htm2 = htm2 + "<th></th>";
	htm3 = htm3 + "<th></th>";
	
	if (month1 == month2) {
		var count = 0;
		for ( var last = date2 * 1; ms < last; ms += _1Day) {

			// Adding ms to the date and ms+= _1Day
			// increments the date by 1 day
			if (count == 0) {
				htm = htm + "<th class='TextFont  col-md-1-1'>"
						+ new Date(ms).getDate() + " "
						+ getMonthNameByMonthNumber(month1) + "</th>";
				count++;
			} else {
				htm = htm + "<th class='TextFont  col-md-1-1'>"
						+ new Date(ms).getDate() + "</th>";
			}

			htm2 = htm2 + "<th class='TextFont  col-md-1-1'>"
					+ new Date(ms).toString().split(' ')[0] + "</th>";
			
			htm3 = htm3 + "<th class='TextFont  col-md-1-1'>"
			+ countday + "</th>";
			console.log(ms);
			countday++;
			date.push(new Date(ms));
		}
	} else {
		var count = 0;
		var count1 = 0;
		var status = false;
		for ( var last = date2 * 1; ms < last; ms += _1Day) {
			// Adding ms to the date and ms+= _1Day
			// increments the date by 1 day

			var m = new Date(ms).getMonth();
			if (month1 == m) {

			} else {
				status = true;
			}

			if (count == 0) {
				htm = htm + "<th class='TextFont  col-md-1-1'>"
						+ new Date(ms).getDate() + " "
						+ getMonthNameByMonthNumber(month1) + "</th>";
				count++;
			} else if (status) {
				if (count1 == 0) {
					htm = htm + "<th class='TextFont  col-md-1-1'>"
							+ new Date(ms).getDate() + " "
							+ getMonthNameByMonthNumber(m) + "</th>";
					count1++;
				} else {
					htm = htm + "<th class='TextFont  col-md-1-1'>"
							+ new Date(ms).getDate() + "</th>";
				}
				/*
				 * htm = htm + "<th class='TextFont  col-md-1-1'>" + date+" "+
				 * getMonthNameByMonthNumber(m)+"</th>";
				 */
			} else {
				htm = htm + "<th class='TextFont  col-md-1-1'>"
						+ new Date(ms).getDate() + "</th>";
			}

			htm2 = htm2 + "<th class='TextFont  col-md-1-1'>"
					+ new Date(ms).toString().split(' ')[0] + "</th>";
			console.log(ms);
			
			htm3 = htm3 + "<th class='TextFont  col-md-1-1'>"
			+ countday + "</th>";
			console.log(ms);
			countday++;

			date.push(new Date(ms));
		}
	}

	$("#ivfbasicinfo1").append(htm2);
	$("#ivfbasicinfo").append(htm);
	$("#ivfbasicinfo2").append(htm3);

	return date;
}

Date.prototype.addDay = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

function getMonthNameByMonthNumber(number) {
	

	var monthName = "";
	if (number == 0) {
		monthName = "Jan";
	} else if (number == 1) {
		monthName = "Feb";
	} else if (number == 2) {
		monthName = "March";
	} else if (number == 3) {
		monthName = "April";
	} else if (number == 4) {
		monthName = "May";
	} else if (number == 5) {
		monthName = "June";
	} else if (number == 6) {
		monthName = "July";
	} else if (number == 7) {
		monthName = "Aug";
	} else if (number == 8) {
		monthName = "Sep";
	} else if (number == 9) {
		monthName = "Oct";
	} else if (number == 10) {
		monthName = "Nov";
	} else if (number == 11) {
		monthName = "Dec";
	}

	return monthName;
}

function createRowForFollicularIVF() {

	
	var rowCount = $('#follicularStudyTabelivf tbody tr').length;
	
	
	// var lmpdtivf="2021/01/11";
	var days = "";
	var lmpdate = $("#lmpdtivf").val();

	// alert(lmpdate=="");

	if (lmpdate == " ") {
		alert("Please Select LMP date First.....");
		return false;
	}

	// rowCount++;

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
	//start Compaire lmp date and curret date
	var currentdatenew= yyyy + "-" + mm + "-" + dd;
	
	
	var arrSceduleDate = ($("#lmpdtivf").val()).split("/");
	var selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]
			+ "/" + arrSceduleDate[2]);
	
	
		var lmpdatenew= new Date(selectedDate);
		lmpdatenew.setHours(0, 0, 0, 0);
			
		var dd1=lmpdatenew.getDate();
		var mm1 = lmpdatenew.getMonth() + 1; // January is 0!
		var yyyy1 = lmpdatenew.getFullYear();
		
		if (dd1 < 10) {
			dd1 = '0' + dd1;
		}
		if (mm1 < 10) {
			mm1 = '0' + mm1;
		}
		var lmpdatedate =  yyyy1 + '-'+ mm1 + '-' + dd1; 

		var date1= new Date(lmpdatedate);
		var date2= new Date(currentdatenew);
	
	if(date1 > date2 ){
		alert("please Select LMP Date Less Than Or Equal To Current Date...");
		return false;
	}
	
	//End Comparison Between Current Date And Lmp date

	if (lmpdate != 0 && lmpdate != "" && lmpdate != "0") {
		var d1 = getDataObj(tdate);
		var d2 = getDataObj(lmpdate);
		days = (d1 - d2) / 86400000;
	} else if (days == "NaN") {
		days = "0";
	}

	if (rowCount == 0) {
		$("#tableBodyForFollicularInfoIVF").empty();
	}
	rowCount=parseInt(rowCount+1);
	
	
	var htm = "";

	htm = htm
			+ "<tr class='newStudyRowF' id='count"+ rowCount+ "'>"
			
			+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='studyidIvF" + rowCount + "' value='"
			+ 0 + "' ></td>"
			/*+ "<td> <input type='checkbox' class='chkIvf' id='checkbox'  value='"+rowCount+"' "
			+ rowCount
			+ " name='ivfcalenderdocid'   </td>"*/
			
			
			+ "<td><input type='checkbox' class='chkIvf' id='checkbox" 
			+ parseInt(rowCount)
			+ "' name='checkbox'  value='"+parseInt(rowCount)+"'></td>"
			
			+
			"<td><input type='text'  class='form-control input-SmallText TextFont'  value='"
			+ days
			+ "'  id='dayscount"
			+parseInt(rowCount)
			+ "' ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' onclick='getDateForIvf(this.id)' id='startdate"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont'    onkeyup='getEndDateIvf("+parseInt(rowCount)+");'    id='days"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='enddate"
			+ rowCount
			+ "' ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='drug"
			+ parseInt(rowCount)
			+ "' ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText TextFont' id='dose"
			+ parseInt(rowCount)
			+ "' ></td> "
		/*	+ "<td ><button type='button' id='hiddenstdF"
			+ (rowCount)
			+ "' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='toRmvStudyDivForIvFCalender("
			+ (rowCount)
			+ ")' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;</td>"*/
			
			+ "</tr>";
	
	$("#tableBodyForFollicularInfoIVF").append(htm);

	
}

function getDateForIvf(inputID) {
	
	
	new JsDatePick({
		useMode : 2,
		target : inputID,

		yearsRange : [ 1920, 2099 ],
		limitToToday : false,
		dateFormat : "%Y/%m/%d",
		imgPath : "../img/",
		weekStartDay : 1,
	});

}

function saveCalenderInfoIVF() {
	var Tid = $('#tr_Id').val();
	var patId = $('#pt_Id').val();
	var unitId = parseInt($("#unitId").val());
	var userId = parseInt($("#userId").val());
	var masterFollicularStudyId = $("#masterFollicularStudyId").val();
	var lmpdtivf = $("#lmpdtivf").val();

	// this is for contact details
	var follicularInfo = $('#follicularStudyTabelivf tbody tr.newStudyRowF').length;
	if (follicularInfo == "" || follicularInfo == null || follicularInfo == 0) {
		alert("Enter at least One Record In IVF Calender  Info tab ");
		return false;
	}

	var ivfCalenderBasicInfo = {
		getListOfIvfCalenderInfo : []
	};
	var rows = $('#follicularStudyTabelivf tbody tr.newStudyRowF').length;
	for ( var i = 1; i <= rows; i++) {

		var ivfCalenderId = $("#studyidIvF" + i).val();

		var dayCount = $("#dayscount" + i).val();
		var startDate = $("#startdate" + i).val();
		var days = $("#days" + i).val();
		var endDate = $("#enddate" + i).val();
		var drug = $("#drug" + i).val();
		var dose = $("#dose" + i).val();
		
		var formattedDate = new Date(startDate);
		var year = formattedDate.getFullYear();
		var mm = formattedDate.getMonth() + 1;
		var dd = formattedDate.getDate();
		
		var startDatenew = ('0' + dd).slice(-2) + "/" + ('0' + mm).slice(-2) + "/" + year;
		
		
		
		if(startDatenew < lmpdtivf || startDate == "" ){
			$("#days" + i).val("");
			$("#enddate" + i).val("");
			alert("Start Date Should be Greater Than Or Equal to LMP date In Row"+i);
			return false;
		}
		
		if(endDate == "" ){
			
			alert("End Date Should Not Be Blank In Row ...."+i);
			return false;
		}
		
		
		
		

		setIvfCalenderBasicInfoInfoList(ivfCalenderBasicInfo, ivfCalenderId,
				dayCount, startDate, days, endDate, drug, dose, patId, Tid,
				masterFollicularStudyId, userId, unitId, lmpdtivf);
	}

	ivfCalenderBasicInfo = JSON.stringify(ivfCalenderBasicInfo);

	var inputs = [];
	inputs.push("ivfCalenderBasicInfoDetails="
			+ encodeURIComponent(ivfCalenderBasicInfo));

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/saveCalenderInfoIVF",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else {
				alert("Network Issue..");
			}

			$("#tableBodyForFollicularInfoIVF").html("");
			$("#tableBodyForFollicularInfoIVFC").html("");
			$("#ivfbasicinfo1").html("");
			$("#ivfbasicinfo").html("");
			$("#ivfbasicinfo2").html("");
			getIvfCalenderInfo();

		}
	});

}

function setIvfCalenderBasicInfoInfoList(ivfCalenderBasicInfo, ivfCalenderId,
		dayCount, startDate, days, endDate, drug, dose, patId, Tid,
		masterFollicularStudyId, userId, unitId, lmpdtivf) {
	ivfCalenderBasicInfo.getListOfIvfCalenderInfo.push({
		ivfCalenderId : ivfCalenderId,
		dayCount : dayCount,
		startDate : startDate,
		days : days,
		endDate : endDate,
		drug : drug,
		dose : dose,

		patientId : patId,
		treatmentId : Tid,
		masterMollicularId : masterFollicularStudyId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,
		lmpdtIvf : lmpdtivf,
	});
}

function getIvfCalenderInfo() {
	var inputs = [];
	var masterFollicularStudyId = $("#masterFollicularStudyId").val();

	inputs.push('masterFollicularStudyId=' + masterFollicularStudyId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getIvfCalenderInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
		//	$("#tableBodyForFollicularInfoIVF").html("");
			$("#tableBodyForFollicularInfoIVFC").html("");
			$("#ivfbasicinfo1").html("");
			$("#ivfbasicinfo").html("");
			$("#ivfbasicinfo2").html("");
			setCalenderBasicInfoList(r);

			//setcalenderBasicInfo(r);
			
			setCalenderOnLoad(r);
		}
	});
}

function setCalenderBasicInfoList(r) {
	var htm = "";
	var rowCount = 0;

	if (r.getListOfIvfCalenderInfo.length > 0) {

		for ( var i = 0; i < r.getListOfIvfCalenderInfo.length; i++) {
			$("#lmpdtivf").val(r.getListOfIvfCalenderInfo[i].lmpdtIvf);
			rowCount++;
			
			htm = htm
					+ "<tr class='newStudyRowF' id='count"
					+ (rowCount)
					+ "'>"
					
					/*+ "<td > <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'  id='studyidIvF"+ (rowCount) + "' value="
					+ r.getListOfIvfCalenderInfo[i].ivfCalenderId + " ></td>"*/
					
			
					+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden' id='studyidIvF"+rowCount+"' value="+r.getListOfIvfCalenderInfo[i].ivfCalenderId+"></td>"
					
					
					/*	+ "<td> <input type='checkbox' checked='checked'   class='chkIvf' id="+r.getListOfIvfCalenderInfo[i].ivfCalenderId+"  value="+rowCount+" "
					+ rowCount
					+ " name='ivfcalenderdocid'   </td>"*/
					
					
					+ "<td><input type='checkbox' class='chkIvf'   value='"+rowCount+"'"
				
					+ " name='ivfcalenderdocid'   isNew='false' id="+r.getListOfIvfCalenderInfo[i].ivfCalenderId+"></td>"
					
					+"<td><input type='text'  class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfIvfCalenderInfo[i].dayCount
					+ "'  id='dayscount"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont' value='"
					+ r.getListOfIvfCalenderInfo[i].startDate
					+ "' onclick='getDateForIvf(this.id)' id='startdate"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'  onkeyup='getEndDateIvf("+rowCount+")' value='"
					+ r.getListOfIvfCalenderInfo[i].days
					+ "'     id='days"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td ><input type='text' class='form-control input-SmallText TextFont'   value='"
					+ r.getListOfIvfCalenderInfo[i].endDate
					+ "'    id='enddate"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'    value='"
					+ r.getListOfIvfCalenderInfo[i].drug
					+ "' id='drug"
					+ (rowCount)
					+ "' ></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText TextFont'  value='"
					+ r.getListOfIvfCalenderInfo[i].dose
					+ "'   id='dose"
					+ (rowCount)
					+ "' ></td> "
					/*+ "<td ><button type='button' id='hiddenstdF"
					+ (rowCount)
					+ "' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='toRmvStudyDivForIvFCalender("
					+ rowCount
					+ ")' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;</td>"
					+ "<input type='hidden' id='studyidIvF" + (rowCount)
					+ "' value='" + r.getListOfIvfCalenderInfo[i].ivfCalenderId
					+ "' />"*/
					+ "</tr>";
			//rowCount++;
		}
		
		
		$("#tableBodyForFollicularInfoIVF").append(htm);
	}

}
function setcalenderBasicInfo(r) {
	var htm = "";
	var lmpdate="";
  if(r.getListOfIvfCalenderInfo.length  > 0){
	  $("#lmpdtivf").val(r.getListOfIvfCalenderInfo[0].lmpdtIvf);
	  lmpdate = $("#lmpdtivf").val();
  }
	
 
	
	if(lmpdate === " "){
		return false;
	}
	var newdate1 = lmpdate.split("/").reverse().join("/");
	

	getDateandDayForIvfCalender(lmpdate);
	var startDate = new Date(newdate1);
	console.log(startDate);

	// Making lastDate equal to 4 more days
	// from startDate
	var endDate = startDate.addDay(30);
	var date1 = startDate;
	var date2 = endDate;

	
	
	var rowCount = 1;
	if (r.getListOfIvfCalenderInfo.length > 0) {
		for ( var i = 0; i < r.getListOfIvfCalenderInfo.length; i++) {
			htm = htm + "<tr class='newStudyRowF' id='count" + (rowCount)
					+ "'><td >" + (rowCount) + "</td>";

			var startivf = r.getListOfIvfCalenderInfo[i].startDate;
			var endivf = r.getListOfIvfCalenderInfo[i].endDate;

			var _1Day = 24 * 3600 * 1000;

			var ms = date1 * 1;

			// Date[] keeps all the dates
			var newdate = "";

			for ( var last = date2 * 1; ms < last; ms += _1Day) {
				// htm=htm+htm
				// Adding ms to the date and ms+= _1Day
				// increments the date by 1 day

				var dateObj = new Date(ms);
				// var month = dateObj.getUTCMonth() + 1; //months from 1-12
				// var day = dateObj.getUTCDate();
				var day = dateObj.getDate();
				var month = dateObj.getMonth() + 1
				// var year = dateObj.getUTCFullYear();
				var year = dateObj.getFullYear();
				// newdate = year + "/" + month + "/" + day;
				newdate = year + "/" + ('0' + month).slice(-2) + "/"
						+ ('0' + day).slice(-2);
				if (newdate >= startivf && newdate <= endivf) {
                  
					if(r.getListOfIvfCalenderInfo[i].drug == ""){
						htm = htm
						+ "<td ><input type='text'  class='form-control input-SmallText TextFont''  style='background-color:#b3b3ff'  ></td> ";
					}else{
						htm = htm
						+ "<td ><input type='text' title=' "+ r.getListOfIvfCalenderInfo[i].drug+"'  class='form-control input-SmallText TextFont''  style='background-color:#b3b3ff' value="
						+ r.getListOfIvfCalenderInfo[i].drug + " ></td> ";
					}
				} else {

					//htm = htm+ "<td ></td> ";
					htm = htm+  "<td ><input type='text' class='form-control input-SmallText TextFont''   ></td> ";
				}

			}
			rowCount++;
		}
		"</tr>";
		$("#tableBodyForFollicularInfoIVFC").append(htm);
	}

}

function getEndDateIvf(id) {
	
	
	var startdate = $("#startdate" + id).val();
	var days = $("#days" + id).val();
	
	
	if(days==""){
		$("#enddate" + id).val("");
		return false;
	}
	var oneYearFromNow = new Date(startdate);
	var day1 = oneYearFromNow
			.setDate(oneYearFromNow.getDate() + parseInt(days-1));
	$("#enddate" + id).val(getDateEndDateForIVf(day1));
}

function getDateEndDateForIVf(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	datee = year + "/" + ('0' + mm).slice(-2) + "/" + ('0' + dd).slice(-2);
	console.log("Datee >> " + datee);
	return datee;
}


function printStudyDataForIVF(paramPopupOrPrint) {
	var pid = $("#pt_Id").val();
	var tid = $('#tr_Id').val();
	var inidate = $('#inidate').val();
	var IVFTreatmentId = $('#IVFTreatmentId').val();
	var masterFollicularStudyId =   $('#masterFollicularStudyId').val();
	
	var pageSize = "standard"; 
	var billId=0;
	var recId=0;
	 var pendFlag="N"; 
	
	
	 window.open("ivf_calender_print.jsp?billId="+billId+"&treatId="+tid+"&patId="+pid+"&recId="+recId+"&pendFlag="+pendFlag+"&cycleNo="+0+"&inidate="+inidate+"&IVFTreatmentId="+IVFTreatmentId+"&masterFollicularStudyId="+masterFollicularStudyId);
 
	
	
	
}


/********************************************************************************
 * @author Dayanand Khandekar
 * @since 17-12-2020
 * @comment for remove row for IVF basic info  table
*******************************************************************************/
function toRmvStudyDivForIvFCalender(rowCount){
	var studyidIvF = $("#studyidIvF"+(rowCount)).val();
	var userId		= parseInt($("#userId").val());
	
	var masterFollicularStudyId=$("#masterFollicularStudyId").val();
	
	var r = confirm("Are you sure to Delete Study  ?");
	if (r == false) {
		return false;
	}
	
	var inputs = [];
	
	inputs.push('studyidIvF=' + studyidIvF);
	inputs.push('userId=' + userId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/deleteIvfCalenderBasicInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
				alert(r);
				$("#tableBodyForFollicularInfoIVF").html("");
				$("#tableBodyForFollicularInfoIVFC").html("");
				$("#ivfbasicinfo1").html("");
				$("#ivfbasicinfo").html("");
				$("#ivfbasicinfo2").html("");
				getIvfCalenderInfo();

	}
	});
}

function chekMasterIdForIvf(){
	alert("Please save IVF Study");
	return false;
}

function finalCalculatedBMIForIVF(){
	var weight = $("#pWeightivf").val();
	var height = $("#pHeightivf").val();
	
	if(height==""){
		 $("#bmiivf").val("");
		 return false;
	}
	
	var BMI = 0;
	var heightInCM = (height / 100);
	BMI = weight / Math.pow(heightInCM, 2);

	if (BMI == "Infinity")
		BMI = 0;

	if (isNaN(BMI))
		BMI = 0;
	
	 $("#bmiivf").val(BMI.toFixed(2));
	
	return (BMI.toFixed(2));
	
}

function cancelIVFCycle(){
	 //$("#narrationIVF").val(" ");
	//$("#ivfCancelPopUp").modal('show');
	
	
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
	//inputs.push('end_date=' + end_date);
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
function HideNarrationPopUpIVF(){
	$("#narrationIVF").val(" ");
	$("#ivfCancelPopUp").modal('hide');
}

function cancelStudyRecordForIVF(){
	
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
	var enddate = dd + '/' + mm + '/' + yyyy;
	
	var userId		= parseInt($("#userId").val());
	
	var masterFollicularStudyId=$("#masterFollicularStudyId").val();
	
	var narration=$("#narrationIVF").val();
	
	
	var inputs = [];
	
	inputs.push('masterFollicularStudyId=' + masterFollicularStudyId);
	inputs.push('userId=' + userId);
	inputs.push('narration=' + narration);
	inputs.push('enddate=' + enddate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/cancelStudyRecordForIVF",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
				alert(r);
				HideNarrationPopUpIVF();
				$('#viewStudyTablePopupIVF').modal('hide');
				fetchStudyDataForIVF();

	}
	});
}

/************
* @author	:Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: delete multiple rows from ibf calender info
 ************/

function deleteBasicInfoIVFCalender(tableId,checkboxClass){
	var docId = new Array();
	var userId		= parseInt($("#userId").val());
	$("input[name='ivfcalenderdocid']:checked").each(function() {	
		
		
		var slaveId=$("#studyidIvF"+$(this).val()).val();
		
		
		if(slaveId >0){
	//	docId.push(slaveId);
		//docId.push($(this).attr('id'));
			docId.push($("#studyidIvF"+$(this).val()).val());
		}
	});

	

	
   if(docId.length>0){

	 var inputs = [];
		inputs.push('ivfcalenderIds=' + docId);
		inputs.push('userId=' + userId);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/shelfsponser/deleteBasicInfoIVFCalender",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(response) {
				$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
				alert(response);
				checkForIvf(tableId);
				checkIvfSequence(tableId);
				//getIvfCalenderInfo();
				getIVfCalenderRecordAfterDelete();
				
				 
			}
		}); 
   } else{
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	checkForIvf(tableId);
	checkIvfSequence(tableId);	 
	
   }
	
}


/************
* @author	:Dayanand Khandekar
* @date		: 28-Jan-2021
* @codeFor	: For reorder srno after delete
 ************/
function checkForIvf(tableId){
	
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
function checkIvfSequence(tableId){

	var trLength = $('#'+tableId).find("tr:first th").length;
	trLength=trLength+1;
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
		
		
		//alert(idText);
		if(idText == "days"){
			
			$('#'+replaceById).attr('onkeyup','getEndDateIvf('+idIndex+')');
		}
		
		inx++;
	});
}

function getIVfCalenderRecordAfterDelete() {
	var inputs = [];
	var masterFollicularStudyId = $("#masterFollicularStudyId").val();

	inputs.push('masterFollicularStudyId=' + masterFollicularStudyId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getIvfCalenderInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
		//	$("#tableBodyForFollicularInfoIVF").html("");
			$("#tableBodyForFollicularInfoIVFC").html("");
			$("#ivfbasicinfo1").html("");
			$("#ivfbasicinfo").html("");
			$("#ivfbasicinfo2").html("");
			

			setcalenderBasicInfo(r);
		}
	});
}

function openOvamPickUpForm(){
	var treatmentId=$("#tr_Id").val();
	var patientId=$("#pt_Id").val();
	var cycleNo=$("#cycleNo").val();
	var IVFTreatmentId=$("#IVFTreatmentId").val();
	
		setTimeout(function() {
			window.open(("ovam_pickup.jsp?" + "&treatmentId="+ treatmentId + "&patientId=" + patientId + "&cycleNo=" + cycleNo +" &IVFTreatmentId=" + IVFTreatmentId));
		}, 300);
}

function setCycleNo(cyclceNo){
	$("#cycleNo").val(cyclceNo);
}

function openIvfCalendar(){
	
	var masterFollicularStudyId=$("#masterFollicularStudyId").val();
	var patientId=$("#pt_Id").val();
	var cycleNo=$("#cycleNo").val();
	var ivfCoupleId=$("#ivfCoupleId").val();
	var treatmentId = $("#tr_Id").val();
	var ivfTreatId = $("#ivfTreatId").val();
	var saveFrom= $("#saveFrom").val();
	
		setTimeout(function() {
			window.open(("ivf_calender.jsp?" + "&masterFollicularStudyId="+ masterFollicularStudyId + "&patientId=" + patientId + "&cycleNo=" + cycleNo + "&ivfCoupleId=" + ivfCoupleId+"&treatmentId=" + treatmentId+"&ivfTreatId=" + ivfTreatId+"&saveFrom=" + saveFrom));
		}, 300);
	
}

function getDataObj(str){
	var arr= str.split("/");
	return new Date(arr[2], arr[1], arr[0]);
}



function goToOvamPickup(){
	var treatmentId=$("#tr_Id").val();
	var patientId=$("#pt_Id").val();
	var cycleNo=$("#cycleNo").val();
	var IVFTreatmentId=$("#ivfTreatId").val();
	
		setTimeout(function() {
			window.open(("ovam_pickup.jsp?" + "&treatmentId="+ treatmentId + "&patientId=" + patientId + "&cycleNo=" + cycleNo +" &IVFTreatmentId=" + IVFTreatmentId));
		}, 300);
}


function goToEmbryoTransfer(){
	var treatmentId=$("#tr_Id").val();
	var patientId=$("#pt_Id").val();
	var cycleNo=$("#cycleNo").val();
	var IVFTreatmentId=$("#ivfTreatId").val();
	
	
	
		setTimeout(function() {
			/*window.open(("embryo_transper.jsp?" + "&treatmentId="+ treatmentId + "&patientId=" + patientId + "&cycleNo=" + cycleNo + "&IVFTreatmentId=" + IVFTreatmentId));*/
			window.open(("embryo_transper.jsp?" + "&treatmentId="+ treatmentId + "&patientId=" + patientId + "&cycleNo=" + cycleNo +" &IVFTreatmentId=" + IVFTreatmentId));
		}, 300);
}


function setCalenderOnLoad(r) {

	$("#calendar").fullCalendar('').html(" ");
	//$("#calendar").fullCalendar('');
	
	var todays_date = $("#todays_date").val();
	var arrDate = todays_date.split("-");
	var eventsUser = new Array();
	
	
	
	for ( var i = 0; i < r.getListOfIvfCalenderInfo.length; i++) {
		
		var appStartDate = r.getListOfIvfCalenderInfo[i].startDate;
		var appEndDate = r.getListOfIvfCalenderInfo[i].endDate;
		var DrugName = r.getListOfIvfCalenderInfo[i].drug;

		var date_start = appStartDate.split("/");//new Date();
		var d_start = date_start[2];
		var m_start = date_start[1]-1;
		var y_start = date_start[0];
		
		var date_end = appEndDate.split("/");//new Date();
		var d_end = date_end[2];
		var m_end = date_end[1]-1;
		var y_end = date_end[0];
		
		event = new Object();
		event.title = DrugName;
		event.start = new Date(y_start, m_start, d_start);// its a
		event.end = new Date(y_end, m_end, d_end);// its a
		// date string.
		/*if (color == "yellow") {
			event.backgroundColor = Theme.colors.yellow;
			event.color = Theme.colors.yellow;
		} else if (color == "red") {
			event.backgroundColor = Theme.colors.red;
			event.color = Theme.colors.red;
		} else if (color == "orange") {
			event.backgroundColor = Theme.colors.orange;
			event.color = Theme.colors.orange;
		} else if (color == "pink") {
			event.backgroundColor = Theme.colors.pink;
			event.color = Theme.colors.pink;
		} else if (color == "green") {
			event.backgroundColor = Theme.colors.green;
			event.color = Theme.colors.green;
		}*/

		event.allDay = true;
		eventsUser.push(event);
	}
	$('#calendar').fullCalendar({
		events: eventsUser
	});
	
	$('#viewStudyTablePopupIVF').on('shown.bs.modal', function () {
	   $("#calendar").fullCalendar('render');
	});
	//$('#calendar').fullCalendar({});
	//$('#calendar').fullCalendar('gotoDate', arrDate[2], arrDate[1]-1, arrDate[0]);
	//$('#calendar').fullCalendar('renderEvent', event, true);
	//alert(JSON.stringify(eventsUser));
	
	//$('#calendar').fullCalendar('render');
	
	/*var calendarEl = document.getElementById('calendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {

	    initialView: 'dayGridMonth',
	    height: 650,
	    headerToolbar: {
	      left: 'prev,next today',
	      center: 'title',
	      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
	    },
	    navLinks: true,
	    nowIndicator: true,
	    selectable: true,
	    dayMaxEvents: true,
	    events: [
	        	         {title: 'Frank',
	        		         start: '2022-03-30',
	        		         end: '2022-04-10',
	        		       }
	        		       ]
	  });
	  calendar.render();*/

	//$('#calendar').html("");
	/*$('#calendar').fullCalendar({
		header : {
			left : '',
			center : 'title',
			right : '',
			allDaySlot : false,
		},
		allDaySlot : !0,
		allDayText : "all-day",
		firstHour : "0:0:0",
		slotMinutes : 15,
		defaultEventMinutes : 120,
		axisFormat : "h(:mm)tt",
		timeFormat : {
			agenda : "h:mm{ - h:mm}"
		},
		dragOpacity : {
			agenda : .5
		},
		minTime : "0:0:0",
		maxTime : "23:59:0",
		slotEventOverlap : !0,
		selectable : true,
		selectHelper : true,
		select : function(start, end, allDay) {

			$(".popup").show();
			$(".title").focus();
			calendar.fullCalendar('renderEvent', {
					title : title,
					start : start,
					end : end,
					allDay : allDay
				}, true // make the event "stick"
			);
			
			//$(".popup").hide();

			$(".exit").click(function() {
				// clear all info, unselect events and...
				$(".popup").hide();
			});
			// calendar.fullCalendar('unselect');
		},
		droppable : true
	});*/
	/*events: [
	         {title: 'Frank',
	         start: '2021-09-17',
	         end: '2021-09-21',
	       },
	       ]*/
	
	//$('#calendar').fullCalendar({});
}


function getOvamPickupDate(){
	var inputs = [];
	var patientId=$("#pt_Id").val();
	var cycleNo=$("#cycleNo").val();
	
	

	inputs.push('patientId=' + patientId);
	inputs.push('cycleNo=' + cycleNo);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getOvamPickupDate",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
				$("#pickUpDate").val(r);
				
		}
	});
	
}

function getEmbryoTransperDate(){
	var inputs = [];
	var patientId=$("#pt_Id").val();
	var cycleNo=$("#cycleNo").val();

	inputs.push('patientId=' + patientId);
	inputs.push('cycleNo=' + cycleNo);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/shelfsponser/getEmbryoTransperDate",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
				$("#embrioTDate").val(r);
				
		}
	});
	
}

function getPatientInfoByTreatIdOnIvfCalendar(){
	
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
						$("#pWeightivf").val(r.listOpdPatientDetailsDto[0].weight);
					} 
					if ( r.listOpdPatientDetailsDto[0].height != null) {
						
						$("#pHeightivf").val(r.listOpdPatientDetailsDto[0].height);
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
					
					$("#ageivf").val(age);
					
				}
			});
				
					
	
}
