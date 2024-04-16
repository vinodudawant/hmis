
// HM00053
function getIVFClinicalEvalTemp(id){
	// alert("id :  " +  id);
	
	var todaysDefaultDate = $("#date").html();
	var dateSplit = todaysDefaultDate.split('-');
	todaysDefaultDate = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];
	var depid = $("#depdocdeskid").val();
	
	// alert("todaysDefaultDate : " + todaysDefaultDate);
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	
	$("#diets").hide();
	$("#Prescription").hide();
	//Added By Akshata
	$("#ddInstructions").hide();
	$("#instruct").hide();
	
	$("#ipdDoctorStationJSPHeadDiv").html('');
	$("#Sub_Obj").show();
	
	setIVFClinicalEvalTemp();
	
	CKEDITOR.replace('editorSubObjOPDTreatment', {
		height : "220px",
		skin : "v2"
	});
	$('#editorSubObjOPDTreatment').show();
	
	getAllCustomTemplatesIVF();
	
	fetchIVFClinicalEvalTempDataByIvfTreatId();
}

function setIVFClinicalEvalTemp(){
		
	
	var subobjWithComplaintAndFinding = $("#subobjWithComplaintAndFinding").val();

var temp = '<div id="Sub_Obj" class="tab-pane fade active in">';
if (subobjWithComplaintAndFinding == "on") {
temp = temp
		+ '<div class="col-md-7-1" style="padding-left: 10px; margin-top: 0px; height: 600px;">'
		+ '<div class="" id="emrQueModal" style="max-height: 600px; overflow: auto;" role="dialog" aria-labelledby="myLargeModalLabel">'
		+ '<div class=""> <div class="modal-content"> <div class="modal-header">'
		+ '<div class="row"></div></div><div id="emrQueBody" class="modal-body" style="max-height: 600px; overflow: auto;"></div></div>'
		+ '</div></div></div>';
} else {
temp = temp
		+ '<div class="col-md-7-1" style="padding-left: 10px; margin-top: 0px;">'
		+ '<textarea class="ckeditor ui-widget-content" name="editorSubjective" title="Rich Text Editor, editorSubjective" placeholder="Content" id="editorSubObjOPDTreatment"></textarea>'
		+ '<input type="hidden" id="idTreatmentCkeditor" value="0" style="display: none" /> <input type="hidden" id="keyValueCKEditorArrayDiv" value="" style="display: none" /></div>';
}

temp = temp
	+ '<div class="col-md-1-1" style="margin-top: 0px; margin-left: 2%;">'
	+ '<button class="btn btn-xs btn-success" id="viewBMI" onclick=viewBMIDetailsOfDoctorDesk(); data-toggle="modal" data-target="#ViewBMIDetailsPopup">'
	+ 'BMI & BSA</button> </div>'
	+ '<div class="col-md-1-1" style="margin-top: 0px;">'
	+ '<button class="btn btn-xs btn-warning" id="GrowthChartButton" onclick="fetchStandardAndPatientBMIDetailsNew();" data-toggle="modal" data-target="#GrowthChartButtonPopup">Growth Chart</button> </div>'
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
	
	// commented, aniket kanse, 10 JAN 22
//	+ ' <button class="btn btn-xs btn-info" id="ImmunizationButton" data-toggle="modal" onclick="generateImmunizationChartForPatient()" data-target="#ImmunizationButtonPopup">Immunization chart</button>'
	
	+ ' <button class="btn btn-xs btn-info" id="ImmunizationButton" data-toggle="modal" onclick="immunizationCharts()">Immunization chart</button>'
	+ ' </div>'
	+ ' <div id="ImmunizationButtonPopup" class="modal fade in">'
	+ ' <div class="modal-dialog col-md-12-1" style="margin-top: 9%; margin-left: 0px; padding: 5px;">'
	+ ' <div class="modal-content" class="col-md-12-1" style="height: 505px;">'
	+ ' <div class="col-md-12-1" style="margin: 0px; padding: 10px;">'
	+ ' <div class="box-title TextFont col-md-12-1" style="margin-top: 0px; margin-bottom: 0px">'
	+ ' <h4>Vaccination Chart</h4> <div style="float: right; padding-right: 6px;">'
	+ ' <button class="btn btn-xs btn-danger cls coversheetBtn" data-dismiss="modal" type="button">'
	+ ' <i class="fa fa-arrows"></i> Close </button> </div>'
	+ ' <div style="float: right; padding-right: 6px;"> <button class="btn btn-xs btn-primary show" onclick="printImmunizationChart();"> <i class="fa fa-print"></i> Print </button> </div>'
	+ ' <div style="float: right; padding-right: 6px;"> <button class="btn btn-xs btn-info show" onclick=printImmunizationChart("ALL");> <i class="fa fa-print"></i> Print Complete Chart </button> </div>'
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
	+ ' <button class="btn btn-xs btn-success" onclick="saveBMIForClinicalEvaluation();"> <i class="fa fa-save"></i></button>'
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
	+ ' </div></div></div></div></div>'
	+ ' <div class="col-md-5-1" style="padding-left: 20px; margin-top: 55px;">'
	+ ' <div class="col-sm-11-1">';
if (subobjWithComplaintAndFinding == "on") {
temp = temp
		+ ' <div class="btn-group dropdown dropup btn-block">'
		+ ' <label class="TextFont col-sm-3-1">Speciality</label> <select id="selDocSpec" style="margin-left: -27px;" class="col-sm-9-1" onchange="fetchOncoEmrTemplates()">'
		+ '</select> <label class="TextFont col-sm-2-1" style="margin-top: 10px;">Body Part</label> <select id="iBodyPart" class="col-sm-3-1" style="margin-left: 10px; margin-top: 10px;" onchange="fetchOncoEmrTemplates();">'
		+ '</select> <label class="TextFont col-sm-2-1" style="margin-left: 10px; margin-top: 10px;">Template</label>'
		+ '<select id="iOncoEmrTemplates" class="col-sm-3-1" style="margin-left: 35px; margin-top: 10px;" onchange="">'
		+ '</select> <input type="hidden" id="customizeTemplatesID" value="0" style="display: none" /> <input type="hidden" id="ipdOpdFlag" value="opd" style="display: none" />'
		+ '</div>';

} else {
temp = temp
		+ '<div class="btn-group dropdown dropup btn-block">'
		
		// commented by aniket kanse / 07 JAN 22
	//	+ '<label class="TextFont col-sm-2-1">Speciality</label> <select id="selDocSpec" style="margin-left: -10px;" class="col-sm-4-1" onchange="fetchCustomizeTemplates(this.value, \'opd\');">'
		+ '<label class="TextFont col-sm-2-1">Speciality</label> <select id="selDocSpec" style="margin-left: -10px;" class="col-sm-4-1" onchange="fetchCustomTemplatesBySpecializationId(this.value);">'
		
	//	+ '</select> <label class="TextFont col-sm-1">Template</label> <select id="customizeTemplates" class="col-sm-4-1" style="margin-left: 35px;" onchange="setCustomizeTemplatesID(this.value);">'
		+ '</select> <label class="TextFont col-sm-1">Template</label> <select id="customizeTemplates" class="col-sm-4-1" style="margin-left: 35px;" onchange="getCustomTemplateDataIVF(this.value);">'
		+ '</select> <input type="hidden" id="customizeTemplatesID" value="0" style="display: none" /> <input type="hidden" id="ipdOpdFlag" value="opd" style="display: none" /> </div>';
}
temp = temp + '</div>';
if (subobjWithComplaintAndFinding == "on") {
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
//		+ '<button class="btn btn-block btn-primary" onclick=showPopUpDocterDesk1("s")>Save H & P (History & Physical)</button>'	// commented, aniket kanse / 08 JAN 22
//		+ '<button class="btn btn-block btn-info" onclick=showPopUpDocterDesk1("o")>Save Physical Examination</button>'
		
		+ '<button class="btn btn-block btn-primary" onclick = showPopUpOPDTemplateIVF("s")>Save H & P (History & Physical)</button>'
		+ '<button class="btn btn-block btn-info" onclick = showPopUpOPDTemplateIVF("o")>Save Physical Examination</button>'
		+ '</div> </div> ';
}
temp = temp
	+ '<div class="col-sm-10-1" style="margin-top: 15px;">'
	+ '<button class="btn btn-block btn-grey" type="button" id="AlertsAllergiesPopupButton" data-toggle="modal"'
	+ 'data-target="#Alerts_Allergies" onclick="fetchAllAllergyAlerts(),enableAllergyTextBoxes()">Alerts & Allergies</button>';
if (subobjWithComplaintAndFinding == "off") {
temp = temp
		+ '<button class="btn btn-block btn-success editUserAccess"'
		+ ' style="margin-left: 0px; margin-top: 5px;"'
//		+ 'onclick="saveCKEditorDocterDesk1()" disabled="disabled">Save Data</button>';		//commented, aniket kanse, 09 JAN 22
		+ 'onclick="saveOPDClinicalEvalIVF()">Save Data</button>';
}

temp = temp
	+ '</div> <div id="Alerts_Allergies" class="modal fade in">'
	+ '<div class="modal-dialog" style="margin-top: 45px;">'
	+ '<div class="modal-content" class="col-md-12" style="height: 430px;">'
	+ '<div class="modal-header" style="padding-bottom: 0px;"> <div class="box-title" style="margin-bottom: -1px;">'
	+ '<h4> <i class="fa fa-calendar"></i>Alerts & Allergies </h4>'
	+ '<div class="form-group col-md-2-1" style="float: right;">'
	+ '<button type="button" id="btnSaveAllergyAlerts" class="btn  btn-xs btn-primary" onclick="saveOPDAllergyAlerts()">Save</button>'
	+ '<button type="button" id="AlertsAllergiesCloseButton" class="btn btn-xs btn-default" data-dismiss="modal">Close</button>'
	+ '</div> </div> </div>'
	+ '<div class="modal-body"> <div class="form-group col-md-12-1"> <div class="form-group Remove-Padding col-sm-3-1">'
	+ '<div class="divide-10"></div>'
	+ '<label class="TextFont">Allergy Name<b style="color: red; padding-left: 2px;">*</b></label> <input type="text" id="allergyName" name="allergyName" placeholder="Allergy Name" class="form-control input-SmallText" />'
	+ '</div>'
	+ '<div class="form-group Remove-Padding col-sm-3-1">'
	+ '<div class="divide-10"></div> <label class="TextFont">Allergy Type</label> <select name="allergyType" id="allergyType" class="form-control input-SmallText">'
	+ '<option value="0">Select...</option> <option value="1">animal</option>'
	+ '<option value="2">environmental</option> <option value="3">food</option>'
	+ '<option value="4">medication</option> <option value="5">plant</option> </select> </div>'
	+ '<div class="form-group Remove-Padding col-sm-3-1">'
	+ '<div class="divide-10"></div> <label class="TextFont">Allergy Reaction</label> <select name="allergyReaction" id="allergyReaction" class="form-control input-SmallText">'
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
	+ '<div class="divide-10"></div><label class="TextFont">First observed date:</label> <input type="text" id="allergyDate" placeholder="date" name="allergyDate" readonly="readonly" onclick=displayCalendar(document.getElementById("allergyDate"),"dd/mm/yyyy",this);checkPrevCurrDate("doctorDesk"); class="form-group" /></div>'
	+ '<div class="form-group Remove-Padding col-md-3-1" style="margin-top: 0px;">'
	+ '<div class="divide-10"></div> <label class="TextFont">Notes :</label>'
	+ '<textarea id="allergyNotes" class="field span12" placeholder="Allergy Notes" rows="4" cols="25"></textarea></div>'
	/*
	 * +'<div class="form-group Remove-Padding col-md-2-1"
	 * style="margin-top: 10px; margin-left: 30px;"> <div
	 * class="divide-10"></div> <label class="TextFont"
	 * style="margin-top: 10px;">Not Known :</label> <input
	 * type="checkbox" onclick=saveOPDAllergyAlerts("NA")
	 * id="notKnownAllergies" style="margin-left: 10px;"> </div>'
	 */
	+ '<div class="col-md-12-1" style="margin-top: 10px;"><div class="col-md-12-1">'
	+ '<div class="col-md-12-1" style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;">'
	+ '<label id="enableAllergyTextBoxesLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"><i class="fa fa-plus"></i> New </label>'
	+ '<label id="editAllergyAlertsLabel" onclick="editOPDAllergyAlerts();" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;">'
	+ '<i class="fa fa-edit"></i> Edit </label>'
	+ '<label id="deleteAllergyAlertsLabel" onclick="deleteOPDAllergyAlerts();" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;">'
	+ '<i class="fa fa-trash-o"></i> Delete </label> </div>'
	+ '<div class="col-sm-12-1" style="margin-top: 0px;">'
	+ '<table class="table table-condensed table-bordered">'
	+ '<thead> <tr> <th class="col-md-1-1 center" style="height: 21.5px;"><div class="TextFont">#</div></th>'
	+ '<th class="col-md-2-1 center" style="height: 21.5px;"><div class="TextFont">Allergy Name</div></th>'
	+ '<th class="col-md-2-1 center" style="height: 21.5px;"><div class="TextFont">Allergy Type</div></th>'
	+ '<th class="col-md-2-1 center" style="height: 21.5px;"><div class="TextFont">Allergy Reaction</div></th>'
	+ '<th class="col-md-3-1 center" style="height: 21.5px;"><div class="TextFont">Notes</div></th>'
	+ '<th class="col-md-2-1 center" style="height: 21.5px;"><div class="TextFont">Date</div></th>'
	+ '<th class="col-md-1-1 center" style="height: 21.5px;"><div class="TextFont"></div></th>'
	+ '</tr> </thead> </table>'
	+ '<div id="flip-scroll" class="col-sm-12-1" style="overflow-y: scroll; height: 150px; maxheight: auto; margin-top: -20px;">'
	+ '<table class="table table-condensed table-striped">'
	+ '<tbody id="allergyAlertsContent"> </tbody> </table> </div>'
	+ '<input type="hidden" id="allergyAlertsSlaveID" value="0" /> </div> </div> </div>'
	+ '</div> </div> </div> </div> </div> </div> </div>';
temp = temp
//	+ '<div style="display: none;" class="popup modal fade in" id="popup1"	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"	aria-hidden="true">'
	+ '<div style="display: none;" class="popup modal fade in" id="customTemplatePopUpSub"	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"	aria-hidden="true">'
	+ '<div class="modal-dialog"><div class="modal-content" class="col-md-11">'
	+ '<div class="modal-body"><div id="MainTabs" class="tab-content">'
	+ '<form class="form-horizontal  col-md-12-1"><div class="form-group col-md-12-1" id="customizetemplateSub"></div>'
	+ '</form></div></div><div class="modal-footer">'
//	+ '<div class="divide-10"></div><button type="button" class="btn btn-default exit" data-dismiss="modal" onclick="hidePopUpDocterDesk1()">Close</button>'
	+ '<div class="divide-10"></div><button type="button" class="btn btn-default exit" data-dismiss="modal" onclick="hidePopUpOPDTemplateSubIVF();">Close</button>'
	+ '<button type="button" class="btn btn-default exit"	id="btnUseTemplateDDSubObj" value="" data-dismiss="modal" onclick="useOPDTemplateSubIVF()">Use Template</button>'
	+ '</div></div></div></div>';

temp = temp
//+ '<div style="display: none;" class="popup modal fade in" id="popup1"	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"	aria-hidden="true">'
+ '<div style="display: none;" class="popup modal fade in" id="customTemplatePopUpObj" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"	aria-hidden="true">'
+ '<div class="modal-dialog"><div class="modal-content" class="col-md-11">'
+ '<div class="modal-body"><div id="MainTabs" class="tab-content">'
+ '<form class="form-horizontal  col-md-12-1"><div class="form-group col-md-12-1" id="customizetemplateObj"></div>'
+ '</form></div></div><div class="modal-footer">'
//+ '<div class="divide-10"></div><button type="button" class="btn btn-default exit" data-dismiss="modal" onclick="hidePopUpDocterDesk1()">Close</button>'
+ '<div class="divide-10"></div><button type="button" class="btn btn-default exit" data-dismiss="modal" onclick="hidePopUpOPDTemplateObjIVF();">Close</button>'
+ '<button type="button" class="btn btn-default exit"	id="btnUseTemplateDDSubObj" value="" data-dismiss="modal" onclick="useOPDTemplateObjIVF()">Use Template</button>'
+ '</div></div></div></div>';

$("#ipdDoctorStationJSPHeadDiv").html(temp);

}

// 

function getAllCustomTemplatesIVF(){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/gethospitalspcializationList",
		success : function(r) {
			
			setspcializationListIVF(r);
		}
	});
}

function setspcializationListIVF(r)
{
	var listspec="";	
	
	listspec = listspec + "<option value='0'> SELECT SPECIALITY </option>";
	
	for(var i=0;i<r.hospitalspclgetlist	.length;i++)
	{
		listspec=listspec+'<option value="'+r.hospitalspclgetlist[i].specialisationId+'">'+r.hospitalspclgetlist[i].specializationName+'</option>';
	}
	$("#selDocSpec").html(listspec);

}

function getCustomTemplateDataIVF(id){
	
//	alert(id);
	
	var inputs = [];
	
	inputs.push('idCustomizeTemplate=' + id);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/opdClinicalEvaluation/getCustomTemplateData",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setCustomTemplateDataIVF(r);
		}
	});
}

function setCustomTemplateDataIVF(r){
	
//	alert("---setCustomTemplateData----:"+JSON.stringify(r));
	
	$('#opdCustomTemplateId').val(r.idCustomizeTemplate);		// PK of "CustomizeTemplate", hidden field on UI, default 0.
	
	$('#varCustomTemplateData').val(r);			// custom template object set to hidden field on UI.
}


function showPopUpOPDTemplateIVF(callfrom){
	
	var opdCustomTemplateId = $('#opdCustomTemplateId').val();
	
	if(opdCustomTemplateId == "0" || opdCustomTemplateId == "" || opdCustomTemplateId == null || opdCustomTemplateId == undefined){
		
		alert("Please select a custom template !");
	}
	
	var customTemplateObject = $("#varCustomTemplateData").val();
//	alert("customTemplateObject : " + JSON.stringify(customTemplateObject));
	
	if (callfrom == "s") {
		$("#customTemplatePopUpSub").show();
	//	$('#customizeTemplatesID').val(myObj.idpattemp);
		$('#customizetemplateSub').html(customTemplateObject.temp_data);
		var subjectiveData = document.getElementById("customizetemplateSub").innerHTML;
		$('#opdCustomTemplateSubjectiveData').val(subjectiveData);
		
	} else if (callfrom == "o") {
		$("#customTemplatePopUpObj").show();
	//	$('#customizeTemplatesID').val(myObj.idpattemp);
		$('#customizetemplateObj').html(customTemplateObject.objectiveTempData);
		var ojectiveData = document.getElementById("customizetemplateObj").innerHTML;
		$('#opdCustomTemplateOjectiveData').val(ojectiveData);
	}
	
}


function hidePopUpOPDTemplateSubIVF() {
	$("#customTemplatePopUpSub").hide();
}

function hidePopUpOPDTemplateObjIVF() {
	$("#customTemplatePopUpObj").hide();
}

function useOPDTemplateSubIVF(){
	
	var sbj = $('#opdCustomTemplateSubjectiveData').val();

	
	if(sbj == "0" || sbj == "" || sbj == null || sbj == undefined){
		
		return false;
	}else {
		
		CKEDITOR.instances['editorSubObjOPDTreatment'].setData(sbj);
	}
	
	hidePopUpOPDTemplateSubIVF();
	
}

function useOPDTemplateObjIVF(){
	
	
	var obj = $('#opdCustomTemplateOjectiveData').val();
	
	if(obj == "0" || obj == "" || obj == null || obj == undefined){
		
		return false;
	} else {
		
		var existingData = CKEDITOR.instances['editorSubObjOPDTreatment'].getData();
		
//		alert( "existingData " + existingData);
		
		CKEDITOR.instances['editorSubObjOPDTreatment'].setData(existingData + obj);
	}
	
	hidePopUpOPDTemplateObjIVF();
	
}


function saveOPDClinicalEvalIVF(){
	
//	alert(" -- save clinical evaluation : ");
	
	var clinicalEvalId = $('#clinicalEvalId').val();						// hidden field on UI, set to 0 default.
	var unitId = $("#unitId").val();
	var patientId = $.trim($('#pt_Id').val());
	var treatmentId = $.trim($('#tr_Id').val()); 
	
	var ivfTreatId =$("#ivfTreatId").val();
	
		
	
	var clinicalEvaltemplateData = CKEDITOR.instances['editorSubObjOPDTreatment'].getData();
	
	if (clinicalEvaltemplateData == "") {
		alert("No data to save !");
		return false;
	}
	
	var inputs = [];
	
	inputs.push('clinicalEvalId=' + clinicalEvalId);
	inputs.push('unitId=' + unitId);
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('clinicalEvaltemplateData=' + encodeURIComponent(clinicalEvaltemplateData));			//string
	inputs.push('ivfTreatId=' + ivfTreatId);	
	
	var str = inputs.join('&');
	
			jQuery.ajax({
			type : "POST",
			url : "ehat/ivfClinicalEvaluation/saveIVFClinicalEvaluation",
			data	: str + "&reqType=AJAX",
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(data) {
				if (data == 1) {
					alert("Records Saved Sucessfully");
				}else if (data == 2) {
					alert( "Records Updated Sucessfully");
				}
			}
		});	
}

function fetchIVFClinicalEvalTempDataByIvfTreatId(){
	
	var ivfTreatId =$("#ivfTreatId").val();
	
//	alert(" ivfTreatId : " + ivfTreatId);
	
//	return; 
	
	
	if(ivfTreatId != undefined && ivfTreatId != null && ivfTreatId != "" && ivfTreatId != "null"){
		
		var inputs = [];
		
		inputs.push('ivfTreatId=' + ivfTreatId);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/ivfClinicalEvaluation/fetchClinicalEvalTempDataByTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				if(r != null ){
					$('#clinicalEvalId').val(r.clinicalEvalId);		// hidden field on UI, default always set to 0.
					CKEDITOR.instances['editorSubObjOPDTreatment'].setData(r.clinicalEvaltemplateData);
				}
				
				
			}
		});
	}

	
}