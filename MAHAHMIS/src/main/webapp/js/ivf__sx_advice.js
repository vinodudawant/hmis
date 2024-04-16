
/*******************************************************************************
 * @author Amol Jadhav
 * @since 25-3-2021
 * @comment set  template for ivf Surgery advice
 ******************************************************************************/

function setSXAdviceTemplateForAdvice(id) {
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	temForSurgeryAdviceforIvfDocStation();
	fetchsurgeryadviceforivf();
	fetchPTNameForOtSchedule();
	fetchDepartmentForOTSchedule();
	getOperationName();
	showADNOTE(id);
}
function temForSurgeryAdviceforIvfDocStation(id) {

	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var today = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '')
			+ month + '/' + year;
	
	
	var cancerOnOff = $("#cancerOnOff").val();
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="active" onclick=temForSurgeryAdviceforIvfDocStation("id"),fetchsurgeryadviceforivf(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationName();setNewtempAdvice(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices" style="background-color: rgb(248, 196, 113);">Surgery Advice</a>'
			+ '</li>';

	if (cancerOnOff == "on") {
		temp = temp
				/*+ '<li id="RadioTherapyList" class="">'
				+ '<a data-toggle="tab" href="#RadioTherapy" onclick=fectchRadiationMaster("IPDDoctorStation");fectchAllRadiotherapy("pageType");temForRadioTherapy("id");setNewtempAdvice(this.id);>Radiotherapy</a>'
				+ '</li>'
				+ '<li id="ChemotherapyList">'
				+ '<a data-toggle="tab" href="#Chemotherapy" onclick=temForChemoTherapy("id"),fetchChemotherapyPatientDataMaster("onload");setNewtempAdvice(this.id);>Chemotherapy</a>'
				+ '</li>'
				+ '<li id="PalliativeCareList">'
				+ '<a data-toggle="tab" href="#PalliativeCare" onclick=fetchCareAdvices("Care");temForCareAdvices("careAdvices");setNewtempAdvice(this.id);>Care Advices</a>'
				+ '</li>'
				+ '<li id="PlanOFTreatmentList">'
				+ '<a data-toggle="tab" href="#PlanOFTreatment" onclick=temForPlanOfAdvice("id"),fetchPlanTreat();setNewtempAdvice(this.id);>Plan Of Treatment</a>'
				+ '</li>';*/
	}

	temp = temp
			+ '</ul>'
			+ '<div class="tab-content col-md-10-1" style="margin-top: 10px;">'
			+ '<input type="hidden" id="adviceMasterId" value="0">'
			+ '<div id="SurgeryAdvices" class="col-md-12-1 tab-pane fade active in">'
			+ '<div class="col-md-12-1" style="padding-top: 20px;">'
			+ '<div class="panel-body col-md-12-1">'
			+ '<div id="addAdvicesTemp" class="col-md-4-1" style="border: 1px solid #b8b8b8; height: 450px; padding-left: 5px;">'
			+ '<div class="col-md-12-1 center">'
			+ '<div class="divide-20"></div>'
			+ '<h4 id="testHead">Add Surgery Advices</h4>'
			+ '</div>'
			+ '<div id="testIDDiv" class="form-group Remove-Padding col-md-12-1" style="display: none;">'
			+ '<div class="divide-20"></div>'
			+ '<div class="col-md-4-1 ">'
			+ '<label>Advice ID:</label>'
			+ '</div>'
			+ '<div class="col-md-8-1 center">'
			+ '<input id="adviceID" class="form-group form-control input-SmallText " type="text" readonly="readonly">'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group Remove-Padding col-md-12-1">'
			+ '<div class="divide-20"></div>'
			+ '<div class="col-md-4-1 ">'
			+ '<label>Procedure Type:'
			+ '<b style="color: red; padding-left: 2px;">*</b>'
			+ '</label>'
			+ '</div>'
			+ '<div class="col-md-8-1 center">'
			+ '<select id="selOTtype" class="form-control input-SmallText TextFont" name="">'
			+ '</select>'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group Remove-Padding col-md-12-1" style="margin-top: 0px;">'
			+ '<div class="divide-20"></div>'
			+ '<div class="col-md-4-1 ">'
			+ '<label>Procedure Group:'
			+ '<b style="color: red; padding-left: 2px;">*</b>'
			+ '</label>'
			+ '</div>'
			+ '<div class="col-md-8-1 center">'
			+ '<select id="department" class="form-control input-SmallText TextFont" onchange="getOperationName()" name="">'
			+ '</select>'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group Remove-Padding col-md-12-1" style="margin-top: 0px;">'
			+ '<div class="divide-20"></div>'
			+ '<div class="col-md-4-1 ">'
			+ '<label>Name:'
			+ '<b style="color: red; padding-left: 2px;">*</b>'
			+ '</label>'
			+ '</div>'
			+ '<div class="col-md-8-1 center">'
			+ '<select class="form-control input-SmallText TextFont" id="selOTName" name="">'
			+ '</select>'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group Remove-Padding col-md-12-1" style="margin-top: 0px;">'
			+ '<div class="divide-20"></div>'
			+ '<div class="col-md-4-1 ">'
			+ '<label> Surgery Advices:</label>'
			+ '</div>'
			+ '<div class="col-md-5-1 center">'
			+ '<label>Radical :'
			+ '<input id="idRadical" type="checkbox" name="sergeryFlagChk" value="radical">'
			+ '</label>'
			+ '<label>Palliative:'
			+ '<input id="idPalliative" type="checkbox" name="sergeryFlagChk" value="palliative">'
			+ '</label>'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group Remove-Padding col-md-12-1" style="margin-top: 0px;">'
			+ '<div class="divide-20"></div>'
			+ '<div class="col-md-4-1 ">'
			+ '<label>Note:</label>'
			+ '</div>'
			+ '<div class="col-md-8-1 center">'
			+ '<textarea id="indicationSurgery" class="form-control" style="width: 200px; height: 58px;" type="text" rows="5" cols="10" placeholder="Surgery Note"></textarea>'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group Remove-Padding col-md-12-1" style="margin-top: 0px;">'
			+ '<div class="divide-20"></div>'
			+ '<div class="col-md-4-1 ">'
			+ '<label>Risk Factor:</label>'
			+ '</div>'
			+ '<div class="col-md-8-1 center">'
			+ '<textarea id="riskFactor1" class="form-control" style="width: 200px; height: 58px;" type="text" rows="5" cols="10" placeholder="Risk Factor"></textarea>'
			+ '</div>'
			+ '</div>'
			+ '<div class="form-group Remove-Padding col-md-12-1">'
			+ '<div class="divide-20"></div>'
			+ '<div class="divide-10"></div>'
			+ '<div class="col-md-4-1 ">'
			+ '<label>Advice Date:</label>'
			+ '</div>'
			+ '<div class="col-md-8-1 center">'
			
			//+ '<input type="text" readonly="readonly" onclick="displayCalendar(document.getElementById(\'adviceDate\'),\'dd/mm/yyyy\',this)" value=today onchange="checkFutureDate(\'surgaryAdvice\')" class="form-control input-SmallText" readonly="readonly" placeholder="Date" id="adviceDate">'
			+ '<input type="text" readonly="readonly" onclick="displayCalendar(document.getElementById(\'adviceDate\'),\'dd/mm/yyyy\',this)" onchange="checkFutureDate(\'surgaryAdvice\')" value='
			+today
			
			+ '  id="adviceDate" class="form-control input-SmallText col-sm-6-1">'
			
			
			//+ '<input type="text" readonly="readonly" onclick="displayCalendar(document.getElementById(\'adviceDate\'),\'dd/mm/yyyy\',this)"   onchange="checkFutureDate(\'surgaryAdvice\')" class="form-control input-SmallText"  placeholder="Date" id="adviceDate">'
			+ '</div>'
			+ '</div>'
			+ '<div class="col-md-12-1 center">'
			+ '<div class="divide-10"></div>'
			+ '<div class="divide-20"></div>'
			+ '<input id ="saveAdviceForIvfDocStation" class="btn btn-xs btn-success editUserAccess" type="button" onclick="saveAdviceForIvfDocStation()" value="Save">'
			+ '<input class="btn btn-xs btn-primary" type="button" onclick="temForSurgeryAdviceforIvfDocStation(),fetchsurgeryadviceforivf(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationName();" value="New Surgery" style="margin-left: 10px;">'
			+ '</div>'
			+ '<input id="adviceQueryType" type="hidden" value="insert">'
			+ '</div>'
			+ '<div class="col-md-8-1" style="margin-left: 1%; margin-top: 0px; width: 600px;">'
			+ '<div class="col-sm-12-1"style="width:700px;overflow:auto;max-height:400px">'
			+ '<table class="table table-bordered responsive">' + '<thead>'
			+ '<tr>'

			+ '<th># </th>' + '<th>Name </th>' + '<th>Date </th>'
			+ '<th>Edit </th>' + '<th>Delete </th>'

			+ '</tr>' + '</thead>' + '<tbody id="sxadvicetempforivf">'
			+ '</tbody>' + '</table>' + '</div>'

			+ '</div>' + '</div>' + '</div>' + '</div>'

			+ '</div>' + '</div>' + '</div>' + '</div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);

	var prevtr = $("#prevtr").val();
	if(prevtr == "previousIvfTreatment"){
		//alert(prevtr);
		document.getElementById("saveAdviceForIvfDocStation").disabled = "true";
	}

}



/*******************************************************************************
 * @author Amol Jadhav
 * @since 25-3-2021
 * @comment set  Data for Ivf Surgery advice
 ******************************************************************************/

function saveAdviceForIvfDocStation() {  
	var adviceID = $("#adviceMasterId").val();

	var patientId = $("#patientId").text();

	var treatmentId = $("#tr_Id").val();
	
	var IVFTreatmentId = $("#IVFTreatmentId").val();
	

	var procedureType = $("#selOTtype").val();
	if (procedureType == 0 || procedureType == "0" || procedureType === null
			|| procedureType === undefined) {
		alert("Please Select Procedure Type..");
		return false;
	}

	var procedureName = $("#selOTtype option:selected").text();

	var procedureGroup = $("#department").val();

	if (procedureGroup == 0 || procedureGroup == "0" || procedureGroup === null
			|| procedureGroup === undefined) {
		alert("Please Select ProcedureGroup Type..");
		return false;
	}
	var procedureGroupName = $("#department option:selected").text();

	var operationId = $("#selOTName").val();
	if (operationId == 0 || operationId == "0" || operationId === null
			|| operationId === undefined) {
		alert("Please Select Operation Type..");
		return false;
	}
	var operationName = $("#selOTName option:selected").text();

	var indicationSurgery = $("#indicationSurgery").val();

	var riskFactor = $("#riskFactor1").val();

	var adviceDate = $("#adviceDate").val();

	var radical = "";

	var palliative = "";

	if ($('#idRadical').is(':checked')) {
		radical = "Y";
	} else {
		radical = "N";
	}

	if ($('#idPalliative').is(':checked')) {
		palliative = "Y";
	} else {
		palliative = "N";
	}

	

	/*var patientId=$("#patientId").text();
	
	var patientName=$("#patientName").text();
	
	var patient_age=$("#age").text();
	
	var patient_gender=$("#sex").text();
	 */

	//var coupleId=$("#ivfCoupleId").val();
	var batchCreationId = $("#ivfbatchCreationId").val();

	var userId = $("#userId").val();

	var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('adviceID=' + adviceID);

	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);

	//inputs.push('patientName=' + patientName);

	//inputs.push('patient_age=' + patient_age);

	//inputs.push('patient_gender=' + patient_gender);

	inputs.push('procedureType=' + procedureType);

	inputs.push('procedureGroup=' + procedureGroup);

	inputs.push('indicationSurgery=' + indicationSurgery);

	inputs.push('riskFactor=' + riskFactor);

	inputs.push('adviceDate=' + adviceDate);

	inputs.push('operationName=' + operationId);

	inputs.push('palliative=' + palliative);

	inputs.push('radical=' + radical);

	inputs.push('procedureName=' + procedureName);

	inputs.push('procedureGroupName=' + procedureGroupName);

	inputs.push('operationNameText=' + operationName);

	//inputs.push('couple_Id=' + coupleId);

	inputs.push('batch_creation_Id=' + batchCreationId);

	inputs.push('createdBy=' + userId);

	inputs.push('userId=' + userId);

	inputs.push('unitId=' + unitId);

	inputs.push('updatedBy=' + userId);
	
	inputs.push('ivftreatmentId=' + IVFTreatmentId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/saveSurgeryadviceService",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else if (r == 2) {
				alert("Record Updated Successfully");
			} else {
				alert("Network Issue..");
			}

			fetchsurgeryadviceforivf();
			
		}
	});

	
}

/*******************************************************************************
 * @author Amol Jadhav
 * @since 25-3-2021
 * @comment Fetch  Data for Ivf sx advice
 ******************************************************************************/
function fetchsurgeryadviceforivf() {

	//var treatmentId = $("#treatmentId").html();
	
	var IVFTreatmentId = $("#IVFTreatmentId").val();


	var inputs = [];

	inputs.push('treatmentId=' + IVFTreatmentId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ivf/fetchSurgeryAdviceInfoForIVF",

				error : function() {
					alert('Network Issue.......................!!!');
				},

				success : function(r) {

					$("#sxadvicetempforivf").html("");
					var htm = "";
					var rowCount = 0;

					if (r.lstSubServiceforSurgeryadvice.length > 0) {

						for (var i = 0; i < r.lstSubServiceforSurgeryadvice.length; i++) {
							rowCount++;

							htm = htm
									+ "<tr class='newSurgeryadviceRow' id='count"
									+ (rowCount)
									+ "'>"

									+ "<td>"
									+ rowCount
									+ "</td>"

									+ "<td>"
									+ r.lstSubServiceforSurgeryadvice[i].operationNameText
									+ "</td>"

									+ "<td>"
									+ r.lstSubServiceforSurgeryadvice[i].adviceDate
									+ "</td>"

									+ "<td >"
									+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' onclick='updaterecordforivfsurgeryadvice("
									+ r.lstSubServiceforSurgeryadvice[i].adviceID
									+ ")' >"
									+ "<i class='fa fa-edit'></i>"
									+ "</button>"

									+ "<td >"
									+ "<button id='adviceMasterId' class='btn btn-xs btn-success deleteUserAccess' value='DELETE' onClick='deletesxadvicebasicinfo("
									+ r.lstSubServiceforSurgeryadvice[i].adviceID
									+ ")' >" + "<i class='fa fa-trash-o'></i>"
									+ "</button>" + "</td>" + "</tr>" + "</tr>";
							//rowCount++;
						}

						$("#sxadvicetempforivf").append(htm);

					}

				}
			});

}
/*******************************************************************************
 * @author Amol Jadhav
 * @since 25-3-2021
 * @comment Delete  Data for Ivf Surgery advice
 ******************************************************************************/

function deletesxadvicebasicinfo(adviceMasterId) {

	var userId = parseInt($("#userId").val());

	var inputs = [];

	inputs.push('adviceMasterId=' + adviceMasterId);
	inputs.push('userId=' + userId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/deleteDataforsurgeryAdviceBasicInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function(r) {

		},
		success : function(r) {

			alert("Record Is Deleted");
			$("#viewAdvicesTemp111").html("");
			fetchsurgeryadviceforivf();

		}
	});
}

/*******************************************************************************
 * @author Amol Jadhav
 * @since 25-3-2021
 * @comment Update Data for Ivf Surgery advice
 ******************************************************************************/
function updaterecordforivfsurgeryadvice(adviceMasterId) {

	var inputs = [];
	inputs.push('adviceID=' + adviceMasterId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ivf/editsurgeryadvicerecord",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			

			$("#adviceMasterId").val(r.adviceID);
			$("#selOTtype").val(r.procedureType);
			$("#department").val(r.procedureGroup);
			$("#selOTName").val(r.operationName);
			$("#indicationSurgery").val(r.indicationSurgery);
			$("#riskFactor1").val(r.riskFactor);
			$("#adviceDate").val(r.adviceDate);
			if (r.palliative == "Y") {
				$("#idPalliative").prop('checked', true);
			}else
				{
				$("#idPalliative").prop('checked', false);
				}
			
			if (r.radical == "Y") {
				$("#idRadical").prop('checked', true);
			}else
				{
				$("#idRadical").prop('checked', false);
				}

		}
	});
}

/*******************************************************************************
 * @author Amol Jadhav
 * @since 29-3-2021
 * @comment Set  Data for Ivf Admission Note
 ******************************************************************************/

function ivfadmissionotetemp(id)
{
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");

	showADNOTE("ADNOTE2");
	}


/*******************************************************************************
 * @author Amol Jadhav
 * @since 25-3-2021
 * @comment Save  Data for Ivf Operation Note.
 ******************************************************************************/

function saveoperationnoteivf()
{
	var admissionNoteID = $("#admissionNoteIDIVF").val();

	var patientId = $("#patientId").text();
	
	var IVFTreatmentId = $("#IVFTreatmentId").val();

	var treatmentId = $("#tr_Id").val();
	
	var userId = $("#userId").val();

	var unitId = $("#unitId").val();


	var admissionNote = $("#ipd_adnote").val();

	//alert("------"+admissionNote);
	var inputs = [];
	
	
	inputs.push('admissionNoteID=' + admissionNoteID);

	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('admissionNote=' + admissionNote);
	
	inputs.push('createdBy=' + userId);

	inputs.push('userId=' + userId);

	inputs.push('unitId=' + unitId);

	inputs.push('updatedBy=' + userId);
	
	inputs.push('ivftreatmentId=' + IVFTreatmentId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/saveOrUpdateAdmissionNote",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else if (r == 2) {
				alert("Record Updated Successfully");
			} else {
				alert("Network Issue..");
			}
			
			fetchrecordadmissionnote();
			
		}
	});

	
}
/*******************************************************************************
 * @author Amol Jadhav
 * @since 25-3-2021
 * @comment Fetch Data for Ivf Operation Note
 ******************************************************************************/
	

function fetchrecordadmissionnote() {

	//var treatmentId = $("#treatmentId").html();
	var IVFTreatmentId = $("#IVFTreatmentId").val();
	var inputs = [];

	inputs.push('treatmentId=' + IVFTreatmentId);
	
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ivf/fetchRecordadmissionnoteForIVF",

				error : function() {
					alert('Network Issue!!!');
				},

				success : function(r) {
					
					
					 
					  $("#admissionNoteIDIVF").val(r.lstivfaddnote[0].admissionNoteID);
					  $("#ipd_admissionnote").val(r.lstivfaddnote[0].admissionNote); 
					  
				}
			});	
		
	}
/*******************************************************************************
 * @author Amol Jadhav
 * @since 25-3-2021
 * @comment Set Data For Clinical Evaluation
 ******************************************************************************/


function SettemForIvfClinicalEvaluation(id)
{
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active"); 
	
	temForIvfClinicalEvaluation();
	
	getAllBodyPart();
	
	FetchEMRAssignedCompFind(0);
	
	fetchDoctorSpecilizationsForIVF();
	
	
	fetchdataPregnancy() ;
	
	
	
	CKEDITOR.replace('editorSubObjTreatmentIvf', {
		height : "220px",
		skin : "v2"
	});
	$('#editorSubObjTreatmentIvf').show();
	fetchckEditor();
	//showADNOTE(id);
}


function temForIvfClinicalEvaluation(id) {  
	showADNOTE(id);
	var subobjWithComplaintAndFinding = $("#subobjWithComplaintAndFinding")
			.val();

	var temp = '<div id="Sub_Obj" class="tab-pane fade active in">';
	if (subobjWithComplaintAndFinding == "on") { 
	/*if (subobjWithComplaintAndFinding == "off") { */
		temp = temp
				+ '<div class="col-md-7-1" style="padding-left: 10px; margin-top: 0px; height: 600px;">'
				+ '<div class="" id="emrQueModal" style="max-height: 600px; overflow: auto;" role="dialog" aria-labelledby="myLargeModalLabel">'
				+ '<div class=""> <div class="modal-content"> <div class="modal-header">'
				+ '<div class="row"></div></div><div id="emrQueBody" class="modal-body" style="max-height: 600px; overflow: auto;"></div></div>'
				+ '</div></div></div>';
	} else {
		temp = temp
				+ '<div class="col-md-7-1" style="padding-left: 10px; margin-top: 0px;">'
				+ '<textarea class="ckeditor ui-widget-content" name="editorSubjective" title="Rich Text Editor, editorSubjective" placeholder="Content" id="editorSubObjTreatmentIvf"></textarea>'
				+ '<input type="hidden" id="idTreatmentCkeditorIvf" value="0" style="display: none" /> <input type="hidden" id="keyValueCKEditorArrayDivIvf" value="" style="display: none" /></div>';
	}

	temp = temp
			+ '<div class="col-md-1-1" style="margin-top: 0px; margin-left: 2%;">'
			+ '<button class="btn btn-xs btn-success" id="viewBMI" onclick=viewBMIDetailsFromDoctorDesk("onclick"); data-toggle="modal" data-target="#ViewBMIDetailsPopup">'
			+ 'BMI & BSA</button> </div>'
			+ '<div class="col-md-1-1" style="margin-top: 0px;">'
			+ '<button class="btn btn-xs btn-warning" id="GrowthChartButton" onclick=fetchStandardAndPatientBMIDetails("ALL") data-toggle="modal" data-target="#GrowthChartButtonPopup">Growth Chart</button> </div>'
			+ '<div id="GrowthChartButtonPopup" class="modal fade in"> <div class="modal-dialog col-md-12-1" style="margin-top: 1%;">'
			+ '<div class="modal-content" class="col-md-12-1" style="height: 637px;">'
			+ '<div class="tabbable col-md-12-1" style="margin: 0px; padding: 10px;">'
			+ '<ul class="nav nav-tabs" style="background-color: lightblue;">'
			+ '<li id="HEIGHT_WEIGHT_HEADCIM_LI_ID" class="active"><a data-toggle="tab" href="#HEIGHT_WEIGHT_HEADCIM"><span class="hidden-inline-mobile">HEIGHT WEIGHT HEADCIM (Less than 5 years) </span></a></li>'
			+ '<li id="HEIGHT_WEIGHT_BMI_GreaterThanFiveYears_LI_ID" class="active"><a data-toggle="tab" href="#HEIGHT_WEIGHT_BMI_GreaterThanFiveYears" onclick=fetchStandardAndPatientBMIDetailsUtilGreaterThanFiveYears("ALL")><span class="hidden-inline-mobile">HEIGHT WEIGHT BMI (Greater than 5 years upto 18 years) </span></a></li> </ul>'
			+ ' <div class="tab-content"> <div id="HEIGHT_WEIGHT_HEADCIM" class="tab-pane fade in active">'
			+ ' <div style="float: right; padding-right: 6px;"> <button class="btn btn-xs btn-danger cls" data-dismiss="modal" type="button">'
			+ ' <i class="fa fa-arrows"></i> Close </button> </div>'
			+ ' <div style="float: right; padding-right: 6px;">'
			+ ' <button class="btn btn-xs btn-primary" disabled="disabled" id="BTN_PRINT_HEIGHT_CHART" onclick=printCharts("HEIGHT_GROWTH_CHART_DIV");>'
			+ ' <i class="fa fa-print"></i> Print Height </button> </div>'
			+ ' <div style="float: right; padding-right: 6px;">'
			+ ' <button class="btn btn-xs btn-primary" disabled="disabled" id="BTN_PRINT_WEIGHT_CHART" onclick=printCharts("WEIGHT_GROWTH_CHART_DIV");>'
			+ ' <i class="fa fa-print"></i> Print Weight </button> </div>'
			+ ' <div style="float: right; padding-right: 6px;">'
			+ ' <button class="btn btn-xs btn-primary" disabled="disabled" id="BTN_PRINT_HEAD_CHART" onclick=printCharts("HEAD_GROWTH_CHART_DIV");>'
			+ ' <i class="fa fa-print"></i> Print Headcim </button> </div>'
			+ ' <div style="float: right; padding-right: 6px;">'
			+ ' <button class="btn btn-xs btn-info" disabled="disabled" id="BTN_PRINT_ALL_CHARTS" onclick=printCharts("PRINT_ALL");>'
			+ ' <i class="fa fa-print"></i> Print All Charts </button> </div>'
			+ ' <div class="col-md-12-1" style="overflow-y: scroll; height: 540px; maxheight: auto; margin-top: 10px;">'
			+ ' <div id="HEIGHT_GROWTH_CHART_DIV" class="col-md-12-1" style="height: 580px; margin-top: 0px;"></div>'
			+ ' <div id="WEIGHT_GROWTH_CHART_DIV" class="col-md-12-1" style="height: 580px; margin-top: 0px;"></div>'
			+ ' <div id="HEAD_GROWTH_CHART_DIV" class="col-md-12-1" style="height: 580px; margin-top: 0px;"></div> </div></div>'
			+ ' <div id="HEIGHT_WEIGHT_BMI_GreaterThanFiveYears" class="tab-pane fade">'
			+ ' <div style="float: right; padding-right: 6px;">'
			+ ' <button class="btn btn-xs btn-danger" data-dismiss="modal" type="button">'
			+ ' <i class="fa fa-arrows"></i> Close </button> </div>'
			+ ' <div style="float: right; padding-right: 6px;">'
			+ ' <button class="btn btn-xs btn-primary" disabled="disabled" id="BTN_PRINT_HEIGHT_CHART_GreaterThanFiveYears" onclick=printChartsGreaterThanFiveYears("HEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears");>'
			+ ' <i class="fa fa-print"></i> Print Height</button></div>'
			+ ' <div style="float: right; padding-right: 6px;">'
			+ ' <button class="btn btn-xs btn-primary" disabled="disabled" id="BTN_PRINT_WEIGHT_CHART_GreaterThanFiveYears" onclick=printChartsGreaterThanFiveYears("WEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears");>'
			+ ' <i class="fa fa-print"></i> Print Weight </button> </div>'
			+ ' <div style="float: right; padding-right: 6px;">'
			+ ' <button class="btn btn-xs btn-primary" disabled="disabled" id="BTN_PRINT_BMI_CHART_GreaterThanFiveYears" onclick=printChartsGreaterThanFiveYears("BMI_GROWTH_CHART_DIV_GreaterThanFiveYears");>'
			+ ' <i class="fa fa-print"></i> Print BMI </button> </div>'
			+ ' <div style="float: right; padding-right: 6px;">'
			+ ' <button class="btn btn-xs btn-info" disabled="disabled" id="BTN_PRINT_ALL_CHARTS_GreaterThanFiveYears" onclick=printChartsGreaterThanFiveYears("PRINT_ALL");>'
			+ ' <i class="fa fa-print"></i> Print All Charts </button> </div>'
			+ ' <div class="col-md-12-1" style="overflow-y: scroll; height: 540px; maxheight: auto; margin-top: 10px;">'
			+ ' <div class="col-md-12-1" id="HEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears" style="height: 580px; margin-top: 0px;"></div>'
			+ ' <div class="col-md-12-1" id="WEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears" style="height: 580px; margin-top: 0px;"></div>'
			+ ' <div class="col-md-12-1" id="BMI_GROWTH_CHART_DIV_GreaterThanFiveYears" style="height: 580px; margin-top: 0px;"></div>'
			+ ' </div> </div> </div> </div> </div> </div> </div>'
			+ ' <div class="col-md-1-1" style="margin-top: 0px; margin-left: 10px;">'
			+ ' <button class="btn btn-xs btn-info" id="ImmunizationButton" data-toggle="modal" onclick="generateImmunizationChartForPatient()" data-target="#ImmunizationButtonPopup">Immunization chart</button>'
			+ ' </div>'
			+ ' <div id="ImmunizationButtonPopup" class="modal fade in">'
			+ ' <div class="modal-dialog col-md-12-1" style="margin-top: 9%; margin-left: 0px; padding: 5px;">'
			+ ' <div class="modal-content" class="col-md-12-1" style="height: 505px;">'
			+ ' <div class="col-md-12-1" style="margin: 0px; padding: 10px;">'
			+ ' <div class="box-title TextFont col-md-12-1" style="margin-top: 0px; margin-bottom: 0px">'
			+ ' <h4>Vaccination Chart</h4> <div style="float: right; padding-right: 6px;">'
			+ ' <button class="btn btn-xs btn-danger cls coversheetBtn" data-dismiss="modal" type="button">'
			+ ' <i class="fa fa-arrows"></i> Close </button> </div>'
			+ ' <div style="float: right; padding-right: 6px;"> <button id="printimmunizationchartd" class="btn btn-xs btn-primary show" onclick="printImmunizationChart();"> <i class="fa fa-print"></i> Print </button> </div>'
			+ ' <div style="float: right; padding-right: 6px;"> <button id="printimmunizationchartalld" class="btn btn-xs btn-info show" onclick=printImmunizationChart("ALL");> <i class="fa fa-print"></i> Print Complete Chart </button> </div>'
			+ ' <div id="saveUpdateVaccinationPatientTreatBtn" style="float: right; padding-right: 6px;"> <button id="btnSaveUpdateVaccinationPatientTreatment" class="btn btn-xs btn-success" onclick="saveUpdateVaccinationPatientTreatment();"> <i class="fa fa-save"></i> Save </button> 	</div>'
			+ ' </div> </div>'
			+ ' <div class="col-md-12-1" style="margin: 0px">'
			+ ' <table class="table table-condensed" style="margin-top: 0px;">'
			+ ' <thead> <tr> <th class="col-md-1-1 center">#</th> <th class="col-md-1-1 center">Age</th>'
			+ ' <th class="col-md-2-1">Vaccine Name</th> <th class="col-md-1-1 center">From Date</th>'
			+ ' <th class="col-md-1-1 center">To Date</th> <th class="col-md-1-1 center">Given on</th>'
			+ ' <th class="col-md-1-1">Due Date</th> <th class="col-md-1-1">vaccine status</th>'
			+ ' </tr></thead></table></div>'
			+ ' <div id="flip-scroll" class="col-sm-12-1" style="overflow-y: scroll; height: 410px; maxheight: auto; margin-top: -22px;"><table class="table table-bordered table-striped table-condensed cf"><tbody id="ImmunizationChartTableOnPopup"></tbody></table></div>'
			+ ' </div></div></div>'		
			
			+ ' <div id="divANC" class="col-md-1-1" style="margin-top: 0px; margin-left: 40px;">'
			+ ' <button class="btn btn-xs btn-info" id="AncButton" data-toggle="modal" onclick=getHIMSReportHead() data-target="#ANCPopup">ANC</button>'
			+ ' </div>'
			
			+'<div id="ANCPopup" class="modal fade in" aria-hidden="false"> '
			+'	<div class="modal-dialog col-md-12-1" style="margin-top: 9%; margin-left: 0px; padding: 5px;"> '
			+'		<div class="modal-content" style="height: 505px;"> '
			+'			<div class="col-md-12-1" style="margin: 0px; padding: 10px;"> '
			+'				<div class="box-title TextFont col-md-12-1"	style="margin-top: 0px; margin-bottom: 0px"> '
			+'					<h4>ANC Record</h4> '
			+'					<div style="float: right; padding-right: 6px;"> '
			+'						<button id="btnANCClose" class="btn btn-xs btn-danger cls coversheetBtn" data-dismiss="modal" type="button"> '
			+'							<i class="fa fa-arrows"></i> Close '
			+'						</button> '
			+'					</div> '
			+'					<div id="saveUpdateANCBtn" style="float: right; padding-right: 6px;"> '
			+'						<button id="btnANCReportDetails" class="btn btn-xs btn-success" onclick="saveANCReportDetails();"> '
			+'							<i class="fa fa-save"></i> Save '
			+'						</button> '
			+'					</div> '
			+'				</div> '
			+'			</div> '
			+'			<div class="col-md-12-1" style="margin: 0px"> '
			+'				<table class="table table-condensed" style="margin-top: 0px;"> '
			+'					<thead> '
			+'						<tr> '
			+'							<th class="col-md-1-1 center">#</th> '
			+'							<th class="col-md-1-1 center">Head</th> '
			+'							<th class="col-md-7-1">Content</th> '
			+'							<th class="col-md-1-1 center">Date</th> '
			+'							<th class="col-md-2-1 center">Comment</th> '				
			+'						</tr> '
			+'					</thead> '
			+'				</table> '
			+'			</div> '
			+'			<div id="flip-scroll" class="col-sm-12-1" style="overflow-y: scroll; overflow-x: scroll; height: 410px; maxheight: auto; margin-top: -22px;"> '
			+'				<table class="table table-bordered table-striped table-condensed cf" style="margin-top: 5px;"> '
			+'					<tbody id="ANCData"> '			
			+'					</tbody> '
			+'				</table> '
			+'			</div> '
			+'		</div> '
			+'	</div> '
			+'</div> '
			
			
			/*-------------------------Amolls work here----------------------*/
			
			+ ' <div class="col-md-1-1" style="margin-top: 0px; margin-left: 40px;margin-top:1%">'
			+ ' <input type="checkbox" id="rdPregnancyIvf" onchange=calPOGIvf() value="pregnancy" onclick="showPregnancyDivForIvf(),getlmpAndExpectedDateIvf();"> Pregnancy'
			+ ' </div>'
			
			+ ' <div class="col-md-4-1" id="divPregnancyIvf" style="margin-top: 1%; margin-left: 40px;display:none">'
			+ ' <input type="text" id="txtLMPDateIvf" onchange="calExpDeliveryDateForIvf(),calPOGIvf();" placeholder="Select LMP Date For Ivf" onclick=displayCalendar(document.getElementById("txtLMPDateIvf"),"yyyy-mm-dd",this)>'
			+ ' <input type="text" id="txtExpDeliveryDateIvf"  placeholder="ExpectedDeliveryDateIVF" >'
			+ ' <input type="text" id="txtPOGIvf"  placeholder="POGIvf" >'
			+ '<input type="hidden" id="PregId" value="0"  /> '
			+ '	<button onclick="savedataforpregnancy()" title="Save Date" data-placement="left" data-toggle="tooltip" id="saveDate" class="btn btn-xs btn-success" style="margin-left: 2px;"><i class="fa fa-save"></i></button>' //temp
			+ ' </div>'			
			
			
			
			/*-------------------------Amolls work here----------------------*/
			
			+ ' <div class="col-md-1-1" style="margin-top: 10px; margin-left: 2px;"></div>'
			+ ' <div id="ViewBMIDetailsPopup" class="modal fade in" tabindex="-1">'
			+ ' <div class="modal-dialog col-md-10-1">'
			+ ' <div class="modal-content col-md-12-1" style="margin-top: 12%; margin-left: 15%;">'
			+ ' <div class="col-md-3-1 pull-right" style="margin-top: 5px;"><label>Patient DOB: </label><label id="pdob" style="padding-left: 15px;"></label></div>'
			+ ' <div class="modal-header" style="padding-top: 3%;">'
			+ ' <div class="col-md-10-1"><div class="col-md-2-1"><label class="TextFont">Weight (Kg)<b style="color: red; padding-left: 2px;">*</b></label>'
			+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
			+ ' <input id="weight" onkeyup="calculateBMI()" class="form-control input-SmallText col-md-9-1" type="text" placeholder="Weight" name="weight" onkeypress="return validateNumbers(event)" />'
			+ ' </div></div>'
			+ ' <div class="col-md-2-1">'
			+ ' <label class="TextFont">Height (Cm)<b style="color: red; padding-left: 2px;">*</b></label>'
			+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
			+ ' <input id="height" onkeyup="calculateBMI()" onkeypress="return validateNumbers(event)"'
			+ ' class="form-control input-SmallText col-md-9-1" type="text" placeholder="height" name="height" />'
			+ ' </div> </div>'
			+ ' <div class="col-md-2-1"><label class="TextFont">BMI (Kg/(M<sup>2</sup>))</label>'
			+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
			+ ' <input id="BMI" class="form-control input-SmallText col-md-9-1"'
			+ ' type="text" placeholder="BMI" name="BMI" readonly="readonly" />'
			+ ' </div> </div>'
			+ ' <div class="col-md-2-1"><label class="TextFont">BSA (M<sup>2</sup>)</label>'
			+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
			+ ' <input id="BSA" class="form-control input-SmallText col-md-9-1"'
			+ ' type="text" placeholder="BSA" name="BSA" readonly="readonly" />'
			+ ' </div></div>'
			+ ' <div class="col-md-2-1"><label class="TextFont">Head CIM (Cm/In)</label>'
			+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
			+ ' <input id="HCIM" onkeypress="return validateNumbers(event)" class="form-control input-SmallText col-md-9-1" type="text" placeholder="HCIM" name="HCIM" />'
			+ ' </div></div>'
			+ ' <div class="col-md-2-1"><label class="TextFont">BMI Date</label>'
			+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
			+ ' <input id="BMIDate" readonly="readonly" class="form-control input-SmallText col-md-9-1" type="text" placeholder="BMI Date" />'
			+ ' </div></div></div>'
			+ ' <div><div class="col-md-1-1" style="margin-top: 0px; line-height: 1.2">'
			+ ' <button class="btn btn-xs btn-success editUserAccess" onclick="saveBMIFromDoctorDesk();" disabled="disabled"> <i class="fa fa-save"></i></button>'
			+ ' <button onclick="refreshBMIBSA();" title="" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-danger" data-original-title="Refresh"><i class="fa fa-refresh"></i></button></div>'
			+ ' <button class="btn btn-xs btn-danger cls coversheetBtn" type="button" style="margin-top: 0px;" data-dismiss="modal"><i class="fa fa-arrows"></i> Close</button> </div></div>'
			+ ' <div class="modal-body"><div class="col-sm-12-1"><table class="table table-condensed">'
			+ ' <thead><tr><th class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ ' <th class="col-md-2-1 center"><div class="TextFont">Adm. no.</div></th>'
			+ ' <th class="col-md-1-1 center"><div class="TextFont">Weight (Kg)</div></th>'
			+ ' <th class="col-md-1-1 center"><div class="TextFont">Height (Cm)</div></th>'
			+ ' <th class="col-md-1-1 center"><div class="TextFont"> BMI (Kg/M<sup>2</sup>) </div></th>'
			+ ' <th class="col-md-1-1 center"><div class="TextFont">BSA (M<sup>2</sup>)</div></th>'
			+ ' <th class="col-md-1-1 center"><div class="TextFont">Head CIM (Cm/In)</div></th>'
			+ ' <th class="col-md-1-1"><div class="TextFont">BMI Date</div></th>'
			+ ' <th class="col-md-1-1 center"><div class="TextFont">Edit</div></th> </tr> </thead> </table> </div>'
			+ ' <div class="col-sm-12-1" style="margin-top: -21px; border: 1px solid #b8b8b8; overflow-y: scroll; height: 230px; max-height: auto;">'
			+ ' <table class="table table-striped table-condensed"> <tbody id="PatientBMIInfoTable"> </tbody> </table>'
			+ ' <input id="patBMI_BSA_ID" value="0" type="hidden" style="display: none;" />'
			//+ ' <div><input type="hidden" id="cidHidden" value="0" style="display: none" /></div>';
			+ ' </div></div></div></div></div>'
			
			+ ' <div class="col-md-5-1" style="padding-left: 20px; margin-top: 55px;">'
			+ ' <div class="col-sm-11-1">';
	if (subobjWithComplaintAndFinding == "on") {
	/*if (subobjWithComplaintAndFinding == "off") {*/
		temp = temp
				+ ' <div class="btn-group dropdown dropup btn-block">'
				+ ' <label class="TextFont col-sm-3-1">Speciality</label> <select id="selDocSpecIvf" style="margin-left: -27px;" class="col-sm-9-1" onchange="fetchOncoEmrTemplatesIvf()">'
				+ '</select> <label class="TextFont col-sm-2-1" style="margin-top: 10px;">Body Part</label> <select id="iBodyPart" class="col-sm-3-1" style="margin-left: 10px; margin-top: 10px;" onchange="fetchOncoEmrTemplatesIvf();">'
				+ '</select> <label class="TextFont col-sm-2-1" style="margin-left: 10px; margin-top: 10px;">Template</label>'
				+ '<select id="iOncoEmrTemplates" class="col-sm-3-1" style="margin-left: 35px; margin-top: 10px;" onchange="">'
				+ '</select> <input type="hidden" id="customizeTemplatesID" value="0" style="display: none" /> <input type="hidden" id="ipdOpdFlag" value="opd" style="display: none" />'
				+ '</div>';

	} else {
		temp = temp
				+ '<div class="btn-group dropdown dropup btn-block">'
				+ '<label class="TextFont col-sm-2-1">Speciality</label> <select id="selDocSpecIvf" style="margin-left: -10px;" class="col-sm-4-1" onchange="fetchCustomizeTemplatesIvf(this.value, \'opd\');">'
				+ '</select> <label class="TextFont col-sm-1">Template</label> <select id="customizeTemplatesIvf" class="col-sm-4-1" style="margin-left: 35px;" onchange="setCustomizeTemplatesIDIvf(this.value);">'
				+ '</select>  <input type="hidden" id="cidHidden" value="0" style="display: none" />;<input type="hidden" id="customizeTemplatesID" value="0" style="display: none" /> <input type="hidden" id="ipdOpdFlag" value="opd" style="display: none" /> </div>';
	}
	temp = temp + '</div>';
	if (subobjWithComplaintAndFinding == "on") {
	/*if (subobjWithComplaintAndFinding == "off") {*/
		temp = temp
				+ '<div class="col-sm-11-1" style="margin-top: 15px;">'
				+ '<div class="col-sm-11-1" style="margin-top: 15px;">'
				+ '<button class="btn btn-block btn-success" onclick=setComplaitTemplates("complaint")>Complaints</button>'
				+ '<button class="btn btn-block btn-primary" onclick=setOncoEmrTemplates("sub")>Save Past and Personal History</button>'
				+ '<button class="btn btn-block btn-success" onclick=setComplaitTemplates("finding")>Clinical Findings</button> </div>'
				+ '</div>';
	} else {
		temp = temp
				+ '<div class="col-sm-11-1" style="margin-top: 15px;"> <div class="col-sm-12-1" style="margin-top: 15px;">'
				+ '<button id = "showPopUpDocterDeskIvf" class="btn btn-block btn-primary" onclick=showPopUpDocterDeskIvf("s")>Save H & P (History & Physical)</button>'
				+ '<button id="savePhysicalExam" class="btn btn-block btn-info" onclick=showPopUpDocterDeskIvf("o")>Save Physical Examination</button>'
				+ '</div> </div> ';
	}
	temp = temp
			+ '<div class="col-sm-10-1" style="margin-top: 15px;">'
			+ '<button class="btn btn-block btn-grey" type="button" id="AlertsAllergiesPopupButton" data-toggle="modal"'
			+ 'data-target="#Alerts_Allergies" onclick="fetchIvfAllergyAlertData(),enableAllergyTextBoxesIvf()">Alerts & Allergies</button>';
	if (subobjWithComplaintAndFinding == "off") {
	/*if (subobjWithComplaintAndFinding == "on") {*/
		temp = temp
				+ '<button id="saveCKEditorDocterDeskIvf" class="btn btn-block btn-success editUserAccess"'
				+ ' style="margin-left: 0px; margin-top: 5px;"'
				+ 'onclick="saveCKEditorDocterDeskIvf()" >Save Data</button>';		
	}

	temp = temp
			
			+ '</div> <div id="Alerts_Allergies" class="modal fade in">'
			+ '<div class="modal-dialog" style="margin-top: 45px;">'
			+ '<div class="modal-content" class="col-md-12" style="height: 430px;">'
			+ '<div class="modal-header" style="padding-bottom: 0px;"> <div class="box-title" style="margin-bottom: -1px;">'
			+ '<h4> <i class="fa fa-calendar"></i>Alerts & Allergies </h4>'
			+ '<div class="form-group col-md-2-1" style="float: right;">'
			+ '<button type="button" id="btnSaveAllergyAlertsIvf" class="btn  btn-xs btn-primary" onclick="saveallergyalertforIvf()">Save</button>'
			+ '<button type="button" id="AlertsAllergiesCloseButtonIvf" class="btn btn-xs btn-default" data-dismiss="modal">Close</button>'
			+ '</div> </div> </div>'
			+ '<div class="modal-body"> <div class="form-group col-md-12-1"> <div class="form-group Remove-Padding col-sm-3-1">'
			+ '<div class="divide-10"></div>'
			+ '<label class="TextFont">Allergy Name<b style="color: red; padding-left: 2px;">*</b></label> <input type="text" id="allergyNameIvf" name="allergyName" placeholder="Allergy Name" class="form-control input-SmallText" />'
			+ '</div>'
			+ '<div class="form-group Remove-Padding col-sm-3-1">'
			+ '<div class="divide-10"></div> <label class="TextFont">Allergy Type</label> <select name="allergyTypeIvf" id="allergyTypeIvf" class="form-control input-SmallText">'
			+ '<option value="0">Select...</option> <option value="1">animal</option>'
			+ '<option value="2">environmental</option> <option value="3">food</option>'
			+ '<option value="4">medication</option> <option value="5">plant</option> </select> </div>'
			+ '<div class="form-group Remove-Padding col-sm-3-1">'
			+ '<div class="divide-10"></div> <label class="TextFont">Allergy Reaction</label> <select name="allergyReaction" id="allergyReactionIvf" class="form-control input-SmallText">'
			+ '<option value="0">Select...</option> <option value="789.0">abdominal pain and/or pain</option>'
			+ '<option value="789.3">abdominal swelling</option> <option value="790.92">abnormal blood clotting</option>'
			+ '<option value="796.1">abnormal reflexes</option> <option value="783.5">abnormal thirst</option>'
			+ '<option value="995.0">anaphylactic shock</option> <option value="300.00">anxiety and/or feeling of impending doom</option>'
			+ '<option value="790.7">blood infection</option> <option value="786.50">chest tightness and/or discomfort</option>'
			+ '<option value="787.7">constipation</option> <option value="786.2">cough</option>'
			+ '<option value="786.3">coughing up blood</option> <option value="787.91">diarrhea</option>'
			+ '<option value="787.2">difficulty swallowing</option> <option value="780.4">dizziness and/or light-headedness</option>'
			+ '<option value="782.7">easy bruising</option> <option value="790.4">elevated liver enzymes</option>'
			+ '<option value="785.6">enlarged glands</option> <option value="780.92">excessive crying of infant</option>'
			+ '<option value="780.54">excessive sleeping</option> <option value="781.94">facial weakness</option>'
			+ '<option value="780.2">fainting and/or loss of consciousness</option> <option value="786.06">fast breathing</option>'
			+ '<option value="785.0">fast heart rate</option> <option value="780.7">fatigue</option>'
			+ '<option value="780.6">fever</option> <option value="782.62">flushing</option>'
			+ '<option value="788.4">frequent urination</option> <option value="787.3">gas</option>'
			+ '<option value="786.4">green or yellow phlegm</option> <option value="783.4">growth problem</option>'
			+ '<option value="780.1">hallucinations</option> <option value="784.0">headache</option>'
			+ '<option value="794.15">hearing changes</option> <option value="785.2">heart murmur</option>'
			+ '<option value="785.1">heart palpitations</option> <option value="787.1">heartburn</option>'
			+ '<option value="786.8">hiccough</option> <option value="796.2">high blood pressure</option>'
			+ '<option value="708.9">hives (red, raised, itchy bumps)</option> <option value="786.01">hyperventilation</option>'
			+ '<option value="780.52">insomnia</option> <option value="782.0">itching or numbness or tingling</option>'
			+ '<option value="372.14">itchy, watery eyes</option> <option value="782.4">jaundice or yellow skin</option>'
			+ '<option value="781.3">lack of coordination</option> <option value="787.6">leakage of stool</option>'
			+ '<option value="788.30">leakage of urine</option><option value="783.0">loss of appetite</option>'
			+ '<option value="790.01">low blood count</option><option value="796.3">low blood pressure</option>'
			+ '<option value="780.93">memory loss</option><option value="781.99">muscle aches</option>'
			+ '<option value="477">nasal congestion / runny nose</option><option value="787.0">nausea and/or vomiting</option>'
			+ '<option value="787.02">nausea only</option><option value="786.1">noisy breathing</option>'
			+ '<option value="784.7">nosebleed</option><option value="786.52">painful breathing</option>'
			+ '<option value="788.1">painful urination</option><option value="782.61">paleness</option>'
			+ '<option value="781.4">paralysis</option><option value="781.2">problem walking</option>'
			+ '<option value="782.1">rash</option><option value="788.5">reduced urination</option>'
			+ '<option value="788.20">retention of urine</option><option value="780.3">seizures</option>'
			+ '<option value="785.50">shock</option><option value="786.05">shortness of breath</option>'
			+ '<option value="781.1">smell or taste disturbance</option><option value="784.99">sneezing</option>'
			+ '<option value="784.5">speech problem</option><option value="781.6">stiff neck</option>'
			+ '<option value="780.8">sweating</option><option value="782.3">swelling</option>'
			+ '<option value="784.1">throat pain</option><option value="781.0">twitching</option>'
			+ '<option value="780.0">unconsciousness</option><option value="794.14">visual changes</option>'
			+ '<option value="784.40">voice problem</option><option value="787.03">vomiting only</option>'
			+ '<option value="781.9">weakness</option><option value="783.1">weight gain</option>'
			+ '<option value="783.2">weight loss</option><option value="786.07">wheezing</option>'
			+ '</select></div>'
			+ '<div class="form-group Remove-Padding col-sm-3-1">'
			+ '<div class="divide-10"></div><label class="TextFont">First observed date:<span class="required-mark" style="color:red;" >*</span></label> <input type="text" id="allergyDateIvf" placeholder="date" name="allergyDateIvf" readonly="readonly" onclick=displayCalendar(document.getElementById("allergyDateIvf"),"dd/mm/yyyy",this);checkPrevCurrDate("doctorDesk"); class="form-group" /></div>'
			+ '<div class="form-group Remove-Padding col-md-3-1" style="margin-top: 0px;">'
			+ '<div class="divide-10"></div> <label class="TextFont">Notes :</label>'
			+ '<textarea id="allergyNotesIvf" class="field span12" placeholder="Allergy Notes" rows="4" cols="25"></textarea></div>'
			/*
			 * +'<div class="form-group Remove-Padding col-md-2-1"
			 * style="margin-top: 10px; margin-left: 30px;"> <div
			 * class="divide-10"></div> <label class="TextFont"
			 * style="margin-top: 10px;">Not Known :</label> <input
			 * type="checkbox" onclick=saveAllergyAlerts("NA")
			 * id="notKnownAllergies" style="margin-left: 10px;"> </div>'
			 */
			+ '<div class="col-md-12-1" style="margin-top: 10px;"><div class="col-md-12-1">'
			+ '<div class="col-md-12-1" style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;">'
			+ '<label id="enableAllergyTextBoxesLabelIvf" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;class="btn" onclick="enableAllergyTextBoxesIvf();"><i class="fa fa-plus"></i> New </label>'
			+ '<label id="editAllergyAlertsLabelIvf" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; class="btn" onclick="editIvfAllergyAlertData()">'
			+ '<i class="fa fa-edit"></i> Edit </label>'
			+ '<label id="deleteAllergyAlertsLabelIvf" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;class="btn" onclick="deleteIvfAllergyAlertData()">'
			+ '<i class="fa fa-trash-o"></i> Delete </label> </div>'
			+ '<div class="col-sm-12-1" style="margin-top: 0px;">'
			+ '<table class="table table-condensed table-bordered" id="IvfAllergyalertTabel">'
			+ '<thead> <tr> <th class="col-md-2-1 center"><div class="TextFont">#</div></th>'
			+ '<th class="col-md-2-1 center" ><div class="TextFont">Allergy Name</div></th>'
			+ '<th class="col-md-2-1 center" ><div class="TextFont">Allergy Type</div></th>'
			+ '<th class="col-md-2-1 center"><div class="TextFont">Allergy Reaction</div></th>'
			+ '<th class="col-md-3-1 center" ><div class="TextFont">Notes</div></th>'
			+ '<th class="col-md-2-1 center" ><div class="TextFont">Date</div></th>'
			+ '<th class="col-md-1-1 center" ><div class="TextFont">Select</div></th>'
			+ '</tr> </thead> </table>'
			+ '<div id="flip-scroll" class="col-sm-12-1" style="overflow-y: scroll; height: 150px; maxheight: auto; margin-top: -20px;">'
			+ '<table class="table table-condensed table-striped">'
			+ '<tbody id="allergyAlertsContentIvf"> </tbody> </table> </div>'
			+ '<input type="hidden" id="allergyAlertsHiddenId" value="0" /> </div> </div> </div>'
			+ '</div> </div> </div> </div> </div> </div> </div>';
	
	
	
	
	
	
	
	temp = temp
			+ '<div style="display: none;" class="popup modal fade in" id="popup1"	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"	aria-hidden="true">'
			+ '<div class="modal-dialog"><div class="modal-content" class="col-md-11">'
			+ '<div class="modal-body"><div id="MainTabs" class="tab-content">'
			+ '<form class="form-horizontal  col-md-12-1"><div class="form-group col-md-12-1" id="customizetemplateSubObj"></div>'
			+ '</form></div></div><div class="modal-footer">'
			+ '<div class="divide-10"></div><button type="button" class="btn btn-default exit" data-dismiss="modal" onclick="hidePopUpDocterDesk1()">Close</button>'
			+ '<button type="button" class="btn btn-default exit"	id="btnUseTemplateDDSubObjIvf" value="" data-dismiss="modal" onclick="useTemplateDocterDeskIvf()">Use Template</button>'
			+ '</div></div></div></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);

	
	var prevtr = $("#prevtr").val();
	if(prevtr == "previousIvfTreatment"){
		//alert(prevtr);
		document.getElementById("saveCKEditorDocterDeskIvf").disabled = "true";
		document.getElementById("AlertsAllergiesPopupButton").disabled = "true";
		document.getElementById("showPopUpDocterDeskIvf").disabled = "true";
		document.getElementById("savePhysicalExam").disabled = "true";
		document.getElementById("viewBMI").disabled = "true";
		document.getElementById("GrowthChartButton").disabled = "true";
		document.getElementById("ImmunizationButton").disabled = "true";
		document.getElementById("AncButton").disabled = "true";

	}
	
}
function saveallergyalertforIvf()
{


var allergyalertid = $('#allergyAlertsHiddenId').val();


	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#patientId").html();
	
	var userId = $("#userId").val();
	
	var unitId = $("#unitId").val();

	
	var allergyName = ($('#allergyNameIvf').val()).trim();
	
	
	if (allergyName == "") {
		alert("Please enter Allergy name...");
		
		return false;
	} 
	
	var allergyTypeName = $("#allergyTypeIvf option:selected").text();
	
	
	
	var allergyType = $('#allergyTypeIvf').val();
	
	
	var allergyReaction = $('#allergyReactionIvf').val();
	
	var allergyReactionName = $("#allergyReactionIvf option:selected").text();
	
	var firstobservedDdate = $('#allergyDateIvf').val();
	
	if (firstobservedDdate == "") {
		alert("please select fisrt observed date in the format:ex 'dd/mm/yyyy'");
		
		return false;
	}
	
	//var currentDate = $('#currentDate').val();
	
	
	var allergyNote = ($('#allergyNotesIvf').val()).trim();
	
	
	var inputs = [];

	inputs.push('allergyalertid=' + allergyalertid);

	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('allergyName=' + allergyName);
	
	inputs.push('allergyType=' + allergyType);
	
	inputs.push('allergyTypeName=' + allergyTypeName);
	
	inputs.push('allergyReaction=' + allergyReaction);
	
	inputs.push('allergyReactionName=' + allergyReactionName);
	
	inputs.push('firstobservedDdate=' + firstobservedDdate);
	
	inputs.push('allergyNote=' + allergyNote);
	
	
	inputs.push('createdBy=' + userId);

	inputs.push('userId=' + userId);

	inputs.push('unitId=' + unitId);

	inputs.push('updatedBy=' + userId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/saveOrUpdateClinicalEvaluationforAllergyAlert",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else if (r == 2) {
				alert("Record Updated Successfully");
			} else {
				alert("Network Issue..");
			}

			fetchIvfAllergyAlertData();
			
			enableAllergyTextBoxesIvf();
			
		}
	});	
	
}

function fetchIvfAllergyAlertData() {
	
	var treatmentId = $("#treatmentId").html();

	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ivf/fetchRecordClinicalEvaluationForIVF",

				error : function() {
					alert('Network Issue.......................!!!');
				},

				success : function(r) {
					
   ///alert('Success fetch'+JSON.stringify(r))
					$("#allergyAlertsContentIvf").html("");
					var htm = "";
					var rowCount = 0;

					if (r.lstclinicalevaluationallergyallert.length > 0) {
						
						for (var i = 0; i < r.lstclinicalevaluationallergyallert.length; i++) {  
							rowCount++;

							htm = htm
									+ "<tr  class='newIvfallergyAlertRow' id='count"
									+ (rowCount)
									+ "'>"

									+ "<td class='col-md-2-1 center TextFont'> <span id='snum"
									+ rowCount
									+ "'>"
									+ rowCount
									+ "</span><input type='hidden' id='allergyAlertsHiddenId"
									+ rowCount
									+ "' value="
									+ r.lstclinicalevaluationallergyallert[i].allergyalertid
									+ "></td>"

									+ "<td class='col-md-2-1 center TextFont' >"
									+ r.lstclinicalevaluationallergyallert[i].allergyName
									+ "</td>"

									+ "<td class='col-md-2-1 center TextFont'>"
									+ r.lstclinicalevaluationallergyallert[i].allergyTypeName
									+ "</td>"
									
									+ "<td class='col-md-2-1 center TextFont'>"
									+ r.lstclinicalevaluationallergyallert[i].allergyReactionName
									+ "</td>"

									+ "<td class='col-md-3-1 center TextFont' style='padding-left: 15px;'>"
									+ r.lstclinicalevaluationallergyallert[i].allergyNote
									+ "</td>"
									
									+ "<td class='col-md-3-1 center TextFont' style='padding-left: 15px;'>"
									+ r.lstclinicalevaluationallergyallert[i].firstobservedDdate
									+ "</td>"
																		
									+ "<td ><input type='checkbox' style='margin-top: 2px;  class='chkgyno'  value='"
									+ rowCount
									+ "'"
									+ " name='allergyalertdocid'   isNew='false' id="
									+ r.lstclinicalevaluationallergyallert[i].allergyalertid
									+ "></td>"
									+ "</tr>";
			
						}
						$("#allergyAlertsContentIvf").append(htm);
					}

				}
			});
	
}

function editIvfAllergyAlertData() {
	
	var docId = new Array();
	var userId = parseInt($("#userId").val());

	$("input[name='allergyalertdocid']:checked").each(function() {
         
		var slaveId = $("#allergyAlertsHiddenId" + $(this).val()).val();
		
		if (slaveId > 0) {

			docId.push($("#allergyAlertsHiddenId" + $(this).val()).val());      
		}
	});
	
	if ((docId.length) == 0) {
		alert("Please check the checkbox to edit...");
		return false;
	}

	if ((docId.length) != 1) {
		alert("Please Select Single Checkbox...");
		return false;
	}
	
	var inputs = [];
	inputs.push('allergyalertid=' + docId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ivf/editRecordClinicalEvaluationForIVFAllergyAlert",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {    
			
			
			$("#allergyAlertsHiddenId").val(r.allergyalertid);
			$("#allergyNameIvf").val(r.allergyName);
			
	        $("#allergyTypeIvf").val(r.allergyType);
			$("#allergyReactionIvf").val(r.allergyReaction);		
			$("#allergyDateIvf").val(r.firstobservedDdate);
			$("#allergyNotesIvf").val(r.allergyNote);
			
			
		}
	});
}
function enableAllergyTextBoxesIvf() {
	//alert("dddddddddd");
	$('#allergyNameIvf').val('');
	$('#allergyTypeIvf').val('0');
	$('#allergyReactionIvf').val('0');
	$('#allergyDateIvf').val('');
	$('#allergyNotesIvf').val('');
	$('#allergyAlertsHiddenId').val('0');
	$("#allergyNameIvf,#allergyTypeIvf,#allergyReactionIvf,#allergyDateIvf,#allergyNotesIvf")
			.removeAttr("disabled");
	
	for ( var i = 1; i <r. lstclinicalevaluationallergyallert.length; i++) {
		$('#checkbox' + i).prop('checked', false);
	}
	
	
}


function deleteIvfAllergyAlertData() {
	
	var tableId = "IvfAllergyalertTabel";	
	var checkboxClass = "chkgyno";
	
	var docId = new Array();
	var userId = parseInt($("#userId").val());

	$("input[name='allergyalertdocid']:checked").each(function() {
         
		var slaveId = $("#allergyAlertsHiddenId" + $(this).val()).val();
		
		if (slaveId > 0) {

			docId.push($("#allergyAlertsHiddenId" + $(this).val()).val());      
		}
	});
	
	if (docId.length > 0) {

		var inputs = [];
		inputs.push('allergyalertIdRow=' + docId);
		
		inputs.push('userId=' + userId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/ivf/deleterecordClinicalEvaluationForIVFAllergyAlert",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error.................');
			},
			success : function(response) {
              alert("Record Deleted Successfully")
              fetchIvfAllergyAlertData();
                
              
				$('.' + checkboxClass + ':checkbox:checked').parents("tr")
						.remove();
				
				checkForFreshListallergyalert(tableId);
				checkFreshListSequeneceForallergyalert(tableId);
				
			}
		});
	} else {
		$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
		checkForFreshListallergyalert(tableId);
		checkFreshListSequeneceForallergyalert(tableId);
	}	
}
function checkForFreshListallergyalert(tableId) {
	
	obj=$('#'+tableId+' tbody tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		$('#'+id).html(key+1);
	});
	
}
function checkFreshListSequeneceForallergyalert() {
	
	var trLength = $('#' + tableId).find("tr:first th").length;

trLength = trLength + 1;

obj = $('#' + tableId + ' tbody tr td').find('input,span,td,select');

var inx = 1;
var idIndex = 1;
$.each(obj, function(key, value) {

	if (inx == (trLength + 1)) {

		inx = 1;
		idIndex++;
	}
	id = value.id;

	var idText = (value.id).replace(/[0-9]/g, '');
	var replaceById = idText + idIndex;
	$('#' + id).attr('id', replaceById);

	inx++;
});	
}



function showPregnancyDivForIvf(){
	
	if($("#rdPregnancyIvf").is(":checked")){
		
		$("#divPregnancyIvf").show();
	}else{
		
		$("#divPregnancyIvf").hide();
	}
}




function calExpDeliveryDateForIvf(){
	
	var LMPDateIvf = new Date($("#txtLMPDateIvf").val());
	LMPDateIvf.setDate(LMPDateIvf.getDate()+280);
	var expDeliveryDateIvf = LMPDateIvf.getFullYear() + '-' +(LMPDateIvf.getMonth()+1) + '-' + LMPDateIvf.getDate()  ;
	$('#txtExpDeliveryDateIvf').val(expDeliveryDateIvf);
}

/************
* @author	: Amol Jadhav
* @date		: 04-01-2021
* @codeFor	: To Calculate POG for ivf
 ************/
function calPOGIvf(){
	
	
	var txtLMPDateIvf = $("#txtLMPDateIvf").val();
	
	var myDate = new Date();
	dt1 = new Date(txtLMPDateIvf);
	
	dt2 = new Date(myDate);
	
	var days= Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
	var weeks = parseInt(days/7);
	days = days - weeks * 7;
    var weeknddays=(weeks > 0 ? weeks + " week" + (weeks > 1 ? "s, " : ", ") : "") + (days > 0 ? days + " day" + (days > 1 ? "s" : "") : "");
	$('#txtPOGIvf').val(weeknddays);
	
}





function fetchDoctorSpecilizationsForIVF() {

	var inputs = [];
	inputs.push('action=fetchDoctorSpecilizations');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			
			pobj1 = eval('(' + ajaxResponse + ')');
			doctorBean = eval('(' + ajaxResponse + ')');
			for ( var i = 0; i < doctorBean.liSplz.length; i++) {

				

					var divDocSpec = eval('(' + ajaxResponse + ')');
					var doctorSpec = "<option value=''>--Select--</option>";

					for ( var int = 0; int < divDocSpec.liSplz.length; int++) {
						doctorSpec = doctorSpec + "<option value='"
								+ divDocSpec.liSplz[int].splzId + "'>"
								+ divDocSpec.liSplz[int].splzNm + "</option>";
						var array_element = divDocSpec.liSplz[int];

					}
					$('#selDocSpecIvf').html(doctorSpec);
					
				
			}
		}
	});
}
function fetchCustomizeTemplatesIvf(doctor_spl_id, ipdOpdFlag) {
	//alert("ggggggggggggg");
	var flag=$('#wardFlag').val();
	if(flag == undefined ||flag== null ||flag  == "null"|| flag == "" )
		{
		ipdOpdFlag="ipd";
		
		}
	else
		{
		ipdOpdFlag="opd";
		}
	if (doctor_spl_id == "") {
		$('#customizeTemplatesIvf').html("");
		
		
		$('#customizeTemplatesID').val("0");
		return;
	}
	

	var inputs = [];
	inputs.push('action=fetchCustomizeTemplates');
	inputs.push("doctor_spl_id=" + doctor_spl_id);
	inputs.push("ipdOpdFlag=" + ipdOpdFlag);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
				
					ajaxResponse = r;
				//alert("ajaxResponse..."+ajaxResponse);
		
					var customizeTemplateBean = eval('(' + ajaxResponse + ')');
				// var customizeTemplate = "";
					var customizeTemplatesID = "0";
					var customizeTemplateIvf = "<option value=''>--Select--</option>";
					if (customizeTemplateBean.pattemplist.length > 0) {
						for ( var int = 0; int < customizeTemplateBean.pattemplist.length; int++) {
							customizeTemplateIvf = customizeTemplateIvf
									+ "<option value='"
									+ customizeTemplateBean.pattemplist[int].idpattemp
									+ "'>"
									+ customizeTemplateBean.pattemplist[int].tempname
									+ "</option>";
						}
						// <div>
						$("#customizeTemplateIvf").html(
								encodeURIComponent(ajaxResponse));
						
						// <select>
						$('#customizeTemplatesIvf').html(customizeTemplateIvf);
						//alert("customizeTemplatesIvf"+customizeTemplateIvf)
						$('#customizeTemplatesID').val(
								customizeTemplateBean.pattemplist[0].idpattemp);
					} else {
						$("#customizeTemplateIvf").html("");
						$('#customizeTemplatesID').val(customizeTemplatesID);
						$('#customizeTemplatesIvf').html(customizeTemplateIvf);
						
					}
				}
			});
}


function setCustomizeTemplatesIDIvf(customizeTemplatesID) {
	
	$('#customizeTemplatesID').val(customizeTemplatesID);
}

function getlmpAndExpectedDateIvf(){
	var patientId = $("#patientId").html();
	//alert(patientId);
	var inputs = [];	
	inputs.push("patientId=" + patientId);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/getlmpAndExpectedDate",		
		success : function(r) {
			
			var ajaxResponse = JSON.stringify(r);
            
			//alert(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			
			$("#txtLMPDateIvf").val(obj.listTreatment[0].lmpDate);
			$("#txtExpDeliveryDateIvf").val(obj.listTreatment[0].expectedDeliveryDate);

		}
	});
}


function savedataforpregnancy()
{
	
	
	var pregnancyid = $("#PregId").val();
	//alert("pregnancyid"+pregnancyid);
	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#patientId").html();
	
	var userId = $("#userId").val();
	
	var unitId = $("#unitId").val();

	var txtLMPDateIvf = $("#txtLMPDateIvf").val();
	if(txtLMPDateIvf == null || txtLMPDateIvf == undefined || txtLMPDateIvf == "")
		{
		alert("Please Select LMP Date.");
		return false;
		}
	var txtExpDeliveryDateIvf = $("#txtExpDeliveryDateIvf").val();
	var txtPOGIvf= $("#txtPOGIvf").val();
	var pregnancyFlag="";
	
	if ($('#rdPregnancyIvf').is(':checked')) {
		pregnancyFlag = "Y";
	} else {
		pregnancyFlag = "N";
	}

	var inputs = [];	
	
	inputs.push('patientId=' + patientId);
	
	inputs.push('pregnancyid=' + pregnancyid);
	
	inputs.push('pregnancyFlag=' + pregnancyFlag);


	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('txtLMPDateIvf=' + txtLMPDateIvf);

	inputs.push('txtExpDeliveryDateIvf=' + txtExpDeliveryDateIvf);
	
	inputs.push('txtPOGIvf=' + txtPOGIvf);

	//inputs.push('pregnancy=' + pregnancy);
	
	inputs.push('createdBy=' + userId);

	inputs.push('userId=' + userId);

	inputs.push('unitId=' + unitId);

	inputs.push('updatedBy=' + userId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/saveOrUpdateInfoPreganacyData",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else if (r == 2) {
				alert("Record Updated Successfully");
			} else {
				alert("Network Issue..");
			}
			fetchdataPregnancy();
			
		}
	});	
	
}

function fetchdataPregnancy() {

	var treatmentId = $("#treatmentId").html();
	//alert("treatmentId"+treatmentId)
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	//alert("11111111111111treatmentId"+treatmentId)
	

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/fetchInfoPreganacyData",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			
			//alert("+++++++++++++++++JSON.stringify+++++++++++++++++++++++++"+JSON.stringify(r));
			$("#PregId").val(r.pregnancyid);
			
			$("#txtLMPDateIvf").val(r.txtLMPDateIvf);
			
			
			$("#txtExpDeliveryDateIvf").val(r.txtExpDeliveryDateIvf);		
			
			$("#txtPOGIvf").val(r.txtPOGIvf);
			
			if (r.pregnancyFlag == "Y") {
				$("#rdPregnancyIvf").prop('checked', true);
				$("#divPregnancyIvf").show();
			}
			else
			{
				$("#rdPregnancyIvf").prop('checked', false);
				$("#divPregnancyIvf").hide();
			}
			
			//alert("11+++++++++++++++++JSON.stringify+++++++++++++++++++++++++"+JSON.stringify(r));
		}
	});	
	

}


function showPopUpDocterDeskIvf(varSubObj) {

	var customizeTemplatesID = $("#customizeTemplatesID").val();
	//alert("customizeTemplatesID"+customizeTemplatesID);
	if (customizeTemplatesID == "" || customizeTemplatesID == undefined
			|| customizeTemplatesID == 0) {
		alert("Please select a customize template...");
		return;
	}
	var ajaxResponse = $("#customizeTemplateIvf").html();
	//alert("ajaxResponse"+ajaxResponse);
	ajaxResponse = decodeURIComponent(ajaxResponse);
	var customizeTemplateBean = eval('(' + ajaxResponse + ')');

	var myObj = "";
	if (customizeTemplateBean.pattemplist.length > 0) {

		for ( var int = 0; int < customizeTemplateBean.pattemplist.length; int++) {
			if (customizeTemplateBean.pattemplist[int].idpattemp == customizeTemplatesID) {
				myObj = customizeTemplateBean.pattemplist[int];
				break;
			}
		}

		if (myObj.type == "h") {
			if (varSubObj == "s") { 
				$("#popup1").show();
				$('#customizeTemplatesID').val(myObj.idpattemp);
				$('#customizetemplateSubObj').html(myObj.tempdata);
			} else if (varSubObj == "o") {
				$("#popup1").show();
				$('#customizeTemplatesID').val(myObj.idpattemp);
				$('#customizetemplateSubObj').html(myObj.objectiveTempData);
			}
			$('#btnUseTemplateDDSubObj').val(varSubObj);
		} else {
			$("#popup1").show();
			$('#customizeTemplatesID').val(myObj.idpattemp);
			$('#customizetemplateSubObj').html(myObj.tempdata);
		}
	}
}



function useTemplateDocterDeskIvf() {
  //alert("aauseTemplateDocterDeskIvfa");
	var keyValueCKEditorTemp = "";
	
	var subObjValue = $('#btnUseTemplateDDSubObjIvf').val();
	
	// combination of subObj_selDocSpec_customizeTemplates
	keyValueCKEditorTemp = subObjValue + "_" + ($('#selDocSpecIvf').val()) + "_" + ($('#customizeTemplatesIvf').val());
//	alert("keyValueCKEditorTemp"+keyValueCKEditorTemp);
	var templateAlreadyPresent = false;
	
	// check array for template present or not
	if (keyValueCKEditorArray.length > 0) {

		// iterate array, check template present or not
		for ( var int2 = 0; int2 < keyValueCKEditorArray.length; int2++) {
			// if yes set flag
			if (keyValueCKEditorTemp == keyValueCKEditorArray[int2]) {
				templateAlreadyPresent = true;
				// alert("Template Already present...");
				break;
				// return;
			}
		}
		// if no add to array
		if (!templateAlreadyPresent) {
			keyValueCKEditorArray.push(keyValueCKEditorTemp);
			$('#keyValueCKEditorArrayDivIvf').val(keyValueCKEditorArray);
		}
	} else {
		keyValueCKEditorArray.push(keyValueCKEditorTemp);
		$('#keyValueCKEditorArrayDivIvf').val(keyValueCKEditorArray);
	}

	var parentTagDIVID = ("parentTagDIVID_" + keyValueCKEditorTemp);
	
	// iterate over the pop up div
	$('#customizetemplateSubObj').each(function() {

		$(this).find('select').each(function() {

			var selectedText = [];

			// find the selected text
			$(this).find("option:selected").each(function(i) {
				selectedText[i] = $(this).text();
			});

			/* remove selected attribute */
			for ( var int = 0; int < selectedText.length; int++) {
				$(this).find('option').filter(function() {
					return $(this).text() != selectedText[int];
				}).attr('selected', false);
			}

			/* Add selected attribute */
			for ( var int = 0; int < selectedText.length; int++) {
				$(this).find('option').filter(function() {
					return $(this).text() == selectedText[int];
				}).attr('selected', true);
			}

		}); // End of Select list

		// Start of radio button list
		$(this).find('input[type=radio]').each(function() {
			var radioCheckedFlag = $(this).is(":checked");
			$(this).attr('checked', radioCheckedFlag);
		}); // End of radio button list

		// Start of checkbox button list
		$(this).find('input[type=checkbox]').each(function() {
			var checkboxCheckedFlag = $(this).is(":checked");
			$(this).attr('checked', checkboxCheckedFlag);
		}); // End of checkbox button list

	}); // End '#customizetemplateSubObj'

	var customizeTemplateSubObjInnerHTML = document.getElementById("customizetemplateSubObj").innerHTML;

	var customizeTemplateSubObjInnerHTMLDIV = ("<div id=" + parentTagDIVID + ">") + (customizeTemplateSubObjInnerHTML) + ("</div>");
	
	var isEditorSubObjTreatmentData = CKEDITOR.instances['editorSubObjTreatmentIvf'].getData();

	// ckeck for the data if present append
	if (isEditorSubObjTreatmentData == "") {
		CKEDITOR.instances['editorSubObjTreatmentIvf'].setData(customizeTemplateSubObjInnerHTMLDIV);
	} else {

		// if already present then update by id
		if (templateAlreadyPresent) {
			CKEDITOR.instances['editorSubObjTreatmentIvf'].setData(isEditorSubObjTreatmentData);
			
			setTimeout(function() {
				var element = CKEDITOR.instances['editorSubObjTreatmentIvf'].document.getById( parentTagDIVID );
				if (element) {
			        element.setHtml(customizeTemplateSubObjInnerHTML);
			    }
			}, 300);
		} else { // append
			var finalCustomizeTemplateSubObjInnerHTML = isEditorSubObjTreatmentData + customizeTemplateSubObjInnerHTMLDIV;
			CKEDITOR.instances['editorSubObjTreatmentIvf'].setData(finalCustomizeTemplateSubObjInnerHTML);
		}
	}
	hidePopUpDocterDesk1();
}

function fetchOncoEmrTemplatesIvf() {
//alert("ssssfetchOncoEmrTemplatesIvfsssss");
	var idDocSpec = $("#selDocSpecIvf").val();
	var idBodyPart = $("#iBodyPart").val();
	if (idDocSpec == "" || idDocSpec == undefined) {
		idDocSpec = 0;
	}
	if (idBodyPart == "" || idBodyPart == undefined) {
		idBodyPart = 0;
	}
	$("#iOncoEmrTemplates").val(0);
	var inputs = [];
	inputs.push('bodyPart=' + idBodyPart);
	inputs.push('speciality=' + idDocSpec);
	var str = inputs.join('&');
	jQuery
			.ajax({
				type : "POST",
				url : "ehat/doctordesk/fetchSubObjTemplate",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					var ajaxResponse = r;
					var Templates = "<option value='0'>--Select--</option>";
					for ( var int = 0; int < ajaxResponse.lstSubObjTemplate.length; int++) {
						Templates = Templates
								+ "<option value='"
								+ ajaxResponse.lstSubObjTemplate[int].oncoEmrTemplateId
								+ "'>"
								+ ajaxResponse.lstSubObjTemplate[int].templateName
								+ "</option>";
						var array_element = ajaxResponse.lstSubObjTemplate[int];
					}
					$('#iOncoEmrTemplates').html(Templates);

				}
			});
}
function saveCKEditorDocterDeskIvf() {
//alert("aaaaaaaaaaa");
var cid = $('#cidHidden').val();

var speciality = ($('#selDocSpecIvf').val()).trim();

var specialityName = $("#selDocSpecIvf option:selected").text();

var templateT = ($('#customizeTemplatesIvf').val()).trim();

var templateName = $("#customizeTemplatesIvf option:selected").text();
	// var treatmentId = ($("#treatmentId").val()).trim();
	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#patientId").html();
	
	var userId = $("#userId").val();
	
	var unitId = $("#unitId").val();

		//var treatmentId = ($("#tr_Id").val()).trim();
		var keyValueCKEditorArrayDivIvf = ($("#keyValueCKEditorArrayDivIvf").val())
				.trim();
		var editorSubObjTreatmentData = CKEDITOR.instances['editorSubObjTreatmentIvf']
				.getData();
		var idTreatmentCkeditorIvf = ($("#idTreatmentCkeditorIvf").val()).trim();

		// ckeck for the data if present save
		if (editorSubObjTreatmentData == "") {
			alert("No data to save...");
			return;
		}

		var inputs = [];
		
		
		
		inputs.push('cid=' + cid);
		
		inputs.push('idTreatmentCkeditorIvf=' + idTreatmentCkeditorIvf);
		
		inputs.push('treatmentId=' + treatmentId);
		
		inputs.push('patientId=' + patientId);
		
		inputs.push('speciality=' + speciality);
		
		inputs.push('specialityName=' + specialityName);
		
		inputs.push('templateT=' + templateT);
		
		inputs.push('templateName=' + templateName);
		
		inputs.push('keyValueCKEditorArrayDivIvf=' + keyValueCKEditorArrayDivIvf);
		
		inputs.push('editorSubObjTreatmentData='+ editorSubObjTreatmentData);
		
		inputs.push('createdBy=' + userId);

		inputs.push('userId=' + userId);

		inputs.push('unitId=' + unitId);

		inputs.push('updatedBy=' + userId);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ivf/saveOrUpdateCKEditorDocterDeskIvf",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				response = r;
				//alert("r"+r);
				if (r == 1) {
					alert("Record Saved Successfully");
				} else if (r == 2) {
					alert("Record Updated Successfully");
				} else {
					alert("Network Issue..");
				}
				fetchckEditor() ;
				
			}
		});	
		
	}
function fetchckEditor() {

	var treatmentId = $("#treatmentId").html();

	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/fetchClinicalInfo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			
		//	alert("JSON.stringify"+JSON.stringify(r));
			
			$("#keyValueCKEditorArrayDivIvf").val(r.keyValueCKEditorArrayDivIvf);
			
			$("#selDocSpecIvf").val(r.speciality);
			
			$("#customizeTemplatesIvf").val(r.templateT);
			
			
		
			
			$("#idTreatmentCkeditorIvf").val(r.idTreatmentCkeditorIvf);		
			//$("#allergyDateIvf").val(r.firstobservedDdate);
			
			$("#cidHidden").val(r.cid);
			
			CKEDITOR.instances['editorSubObjTreatmentIvf']
			.setData(r.editorSubObjTreatmentData);
			
		}
	});	
	

}
