/**
 * @author_aniket kanse
 * @date 28 DEC 21
 * @for_Doctor_Desk - Clinical Evaluation
 * 
 */

function getClinicalEvaluationTemplate(id){
	
//	 alert(" ID : " + id);
	
	var todaysDefaultDate = $("#date").html();
	var dateSplit = todaysDefaultDate.split('-');
	todaysDefaultDate = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];
	var depid = $("#depdocdeskid").val();
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#diets").hide();
	$("#Prescription").hide();
	//Added By Akshata
	$("#ddInstructions").hide();
	$("#instruct").hide();
	$("#ipdDoctorStationJSPHeadDiv").html(" ");
	$("#ADNOTE").hide();
	$("#Sub_Obj").show();
	
	setClinicalEvalTemplate();
	
	CKEDITOR.replace('editorSubObjOPDTreatment', {
		height : "220px",
		skin : "v2"
	});
	$('#editorSubObjOPDTreatment').show();
	
	viewBMIDetailsOfDoctorDesk();
	
	getAllCustomTemplates();
	
	fetchClinicalEvalTempDataByTreatmentId();
	
	
	var prevtre = $('#prevtr').val();
	if(prevtre=='previousPatient'){
	    previousTreatmentDisable();
	}
}



/**
 * @author : Aniket Kanse, 29 DEC 21.
 */
function saveBMIForClinicalEvaluation(){
	
	var dob = $("#dbirth").val(); 
	
	if ((dob == "") || (dob == "undefined")) {
		alert("Please save DOB first...");
		var booleanFlag = confirm("Do you wish to go to patient edit page?");
		if (booleanFlag) {
			window.location.href = "ehat_reg.jsp?bmiPatID="
					+ ($("#pt_Id").val());
		}

		return false;
	}

	// ageString = Y___M___D
	var ageString = getAgeYMD(dob);

	var finalAgeInMonths = 0.00;
	finalAgeInMonths = getAgeInMonths(ageString);
	
	var pid = $("#pt_Id").val(); 
//	var tid = $("#tid").val();
	var tid = $("#tr_Id").val();
	var trcount = $("#trcountBMI").val();   // NOTE : trcount yet to be fetched from SP (With Vishnu), value is 0 as hidden field on JSP
	var weight = ($("#weight").val()).trim();
	var height = ($("#height").val()).trim();
	var HCIM = ($("#HCIM").val()).trim();
	var BMIDate = ($("#BMIDate").val()).trim();
	var patBMI_BSA_ID = ($("#patBMI_BSA_ID").val()).trim();

	if (HCIM == "") {
		HCIM = "0.0";
	}

	var pattern = /^[0-9]+\.?[0-9]*$/;

	if (weight == "" || weight == null || weight == undefined) {
		alert("Please enter patient weight.");
		$("#weight").focus();
		return false;
	}

	if (!pattern.test(weight)) {
		alert("Weight should be of digits or a decimal point Only.");
		$("#weight").focus();
		return false;
	}

	if (height == "" || height == null || weight == undefined) {
		alert("Please enter patient weight.");
		$("#height").focus();
		return false;
	}

	if (!pattern.test(height)) {
		alert("Height should be of digits or a decimal point Only!");
		$("#height").focus();
		return false;
	}

	var BMI = finalCalculatedBMI(height, weight);

	var BSA = finalCalculatedBSA(height, weight);
	
	var id = $("#clinicalEvalBMIPK").val();

	
	var inputs = [];
	inputs.push('id=' + encodeURIComponent(id));
	inputs.push('patientId=' + encodeURIComponent(pid));
	inputs.push('treatmentId=' + encodeURIComponent(tid));
	inputs.push('patientTreatmentCount=' + encodeURIComponent(trcount));
	inputs.push('weight=' + encodeURIComponent(weight));
	inputs.push('height=' + encodeURIComponent(height));
//	inputs.push('patBMI_BSA_ID=' + encodeURIComponent(patBMI_BSA_ID));
	inputs.push('bmi=' + encodeURIComponent(BMI));
	inputs.push('bsa=' + encodeURIComponent(BSA));
	inputs.push('headCIM=' + encodeURIComponent(HCIM));
	inputs.push('dateOfBMI=' + encodeURIComponent(BMIDate));
	inputs.push('finalAgeInMonths=' + encodeURIComponent(finalAgeInMonths));
	var str = inputs.join('&');
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/opdClinicalEvaluation/saveBMIForClinicalEvaluation",
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

// aniket kanse / 28 DEC 21.
// note : using hardcoded values for DOB.
function viewBMIDetailsOfDoctorDesk(){
	
	getOPDBMIListByTreatmentId();
	
	return false;
	
	//alert("in bmi");
	var todays_date = $("#todays_date").val();
    var arrDate = todays_date.split("-");
    var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
//    alert("date "+date);
    $("#BMIDate").val(date);
	var pid = $("#pt_Id").val();
	
	var dob = "05/07/1945";
	$("#dbirth").val(dob);
	
//	$("#pdob").text($("#dbirth").val()); //set dob on modal pop up for BMI
	
	
//	$("#pdob").val("05/07/1945");	//	USING HARDCODED VALUE, aniket kanse, 28 DEC 21
	$("#pdob").text($("#dbirth").val());
	
	//alert("hi dob-"+$("#dbirth").val());
	//alert(pid);
	//var pid =  $("#pid").val();
	//alert("iin view bmi"+pid);
//	alert("in bmi pid -" + pid + "DOB--> " + $("#dbirth").val());
	
	return false;
	
	var inputs = [];
//  inputs.push('action=saveBMIFromDoctorDesk');
	inputs.push('pid=' + pid);
// 	inputs.push('Callfrom=fetchFun');
	var str = inputs.join('&');
	

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdClinicalEvaluation/getBMIDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			console.log(r);
			var objbmi = JSON.parse(r);
			$("#PatientBMIInfoTableAjaxResp").html(ajaxResponse);

			// refresh bmi bsa fields.
			refreshBMIBSA();
			

			// if (loadParam != "onload") {
			if (objbmi.lsPatientBmi.length > 0) {
				bmiCount = 1;
				$("#trcountBMI").val(objbmi.lsPatientBmi[0].patient_treat_count);
				$("#PatientBMIInfoTable").setTemplate(PatientBMIInfo);
				$("#PatientBMIInfoTable").processTemplate(objbmi);
			}/*
				 * else { $('#ViewBMIDetailsPopup').removeClass('fade');
				 * $('#ViewBMIDetailsPopup').modal('hide'); alert("No Record
				 * Found...!"); }
				 */
			// }
			
			setTimeout(function(){userAccess();},100);
		}
	});

	
}

function setClinicalEvalTemplate(){
	
	
	var subobjWithComplaintAndFinding = $("#subobjWithComplaintAndFinding")
	.val();

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
	+ ' <div id="ViewBMIDetailsPopup1" class="modal fade in" tabindex="-1">'
	+ ' <div class="modal-dialog col-md-10-1">'
	+ ' <div class="modal-content col-md-12-1" style="margin-top: 12%; margin-left: 15%;">'
	+ ' <div class="col-md-3-1 pull-right" style="margin-top: 5px;"><label>Patient DOB: </label><label id="pdob" style="padding-left: 15px;"></label></div>'
	+ ' <div class="modal-header" style="padding-top: 3%;">'
	+ ' <div class="col-md-10-1"><div class="col-md-2-1"><label class="TextFont">Weight (Kg)<b style="color: red; padding-left: 2px;">*</b></label>'
	+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
	+ ' <input id="weight1" onkeyup="calculateBMI()" class="form-control input-SmallText col-md-9-1" type="text" placeholder="Weight" name="weight" onkeypress="return validateNumbers(event)" />'
	+ ' </div></div>'
	+ ' <div class="col-md-2-1">'
	+ ' <label class="TextFont">Height (Cm)<b style="color: red; padding-left: 2px;">*</b></label>'
	+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
	+ ' <input id="height1" onkeyup="calculateBMI()" onkeypress="return validateNumbers(event)"'
	+ ' class="form-control input-SmallText col-md-9-1" type="text" placeholder="height" name="height" />'
	+ ' </div> </div>'
	+ ' <div class="col-md-2-1"><label class="TextFont">BMI (Kg/(M<sup>2</sup>))</label>'
	+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
	+ ' <input id="BMI1" class="form-control input-SmallText col-md-9-1"'
	+ ' type="text" placeholder="BMI" name="BMI" readonly="readonly" />'
	+ ' </div> </div>'
	+ ' <div class="col-md-2-1"><label class="TextFont">BSA (M<sup>2</sup>)</label>'
	+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
	+ ' <input id="BSA1" class="form-control input-SmallText col-md-9-1"'
	+ ' type="text" placeholder="BSA" name="BSA" readonly="readonly" />'
	+ ' </div></div>'
	+ ' <div class="col-md-2-1"><label class="TextFont">Head CIM (Cm/In)</label>'
	+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
	+ ' <input id="HCIM1" onkeypress="return validateNumbers(event)" class="form-control input-SmallText col-md-9-1" type="text" placeholder="HCIM" name="HCIM" />'
	+ ' </div></div>'
	+ ' <div class="col-md-2-1"><label class="TextFont">BMI Date</label>'
	+ ' <div class="col-md-12-1" style="margin-top: 10px;">'
	+ ' <input id="BMIDate1" readonly="readonly" class="form-control input-SmallText col-md-9-1" type="text" placeholder="BMI Date" />'
	+ ' </div></div></div>'
	+ ' <div><div class="col-md-1-1" style="margin-top: 0px; line-height: 1.2">'
	+ ' <button class="btn btn-xs btn-success" onclick="saveBMIOPDPatient();"> <i class="fa fa-save"></i></button>'
	+ ' <button onclick="refreshBMIBSA();" title="" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-danger" data-original-title="Refresh"><i class="fa fa-refresh"></i></button></div>'
	+ ' <button class="btn btn-xs btn-danger cls coversheetBtn" type="button" style="margin-top: 0px;" data-dismiss="modal"><i class="fa fa-arrows"></i> Close</button> </div></div>'
	+ ' <div class="modal-body"><div class="col-sm-12-1"><table class="table table-condensed">'
	+ ' <thead><tr><th class="col-md-1-1 center"><div class="TextFont">#</div></th>'
	+ ' <th class="col-md-1-1 center"><div class="TextFont">Weight (Kg)</div></th>'
	+ ' <th class="col-md-1-1 center"><div class="TextFont">Height (Cm)</div></th>'
	+ ' <th class="col-md-1-1 center"><div class="TextFont"> BMI (Kg/M<sup>2</sup>) </div></th>'
	+ ' <th class="col-md-1-1 center"><div class="TextFont">BSA (M<sup>2</sup>)</div></th>'
	+ ' <th class="col-md-1-1 center"><div class="TextFont">Head CIM (Cm/In)</div></th>'
	+ ' <th class="col-md-1-1"><div class="TextFont">BMI Date</div></th>'
	+ ' <th class="col-md-1-1 center"><div class="TextFont">Edit</div></th> </tr> </thead> </table> </div>'
	+ ' <div class="col-sm-12-1" style="margin-top: -21px; border: 1px solid #b8b8b8; overflow-y: scroll; height: 230px; max-height: auto;">'
	+ ' <table class="table table-striped table-condensed"> <tbody id="PatientBMIInfoTable1"> </tbody> </table>'
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
		+ '</select> <input type="hidden" id="selDocSpec" value="0" style="display: none"'   //added by sandip
		
	//	+ '</select> <label class="TextFont col-sm-1">Template</label> <select id="customizeTemplates" class="col-sm-4-1" style="margin-left: 35px;" onchange="setCustomizeTemplatesID(this.value);">'
		+ '</select> <label class="TextFont col-sm-1">Template</label> <select id="customizeTemplates" class="col-sm-4-1" style="margin-left: 35px;" onchange="getCustomTemplateData(this.value);">'
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
		
		+ '<button class="btn btn-block btn-primary" onclick = showPopUpOPDTemplate("s")>Save H & P (History & Physical)</button>'
		+ '<button class="btn btn-block btn-info" onclick = showPopUpOPDTemplate("o")>Save Physical Examination</button>'
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
		+ 'onclick="saveOPDClinicalEval()">Save Data</button>';
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
	+ '<div class="divide-10"></div><button type="button" class="btn btn-default exit" data-dismiss="modal" onclick="hidePopUpOPDTemplateSub();">Close</button>'
	+ '<button type="button" class="btn btn-default exit"	id="btnUseTemplateDDSubObj" value="" data-dismiss="modal" onclick="useOPDTemplateSub()">Use Template</button>'
	+ '</div></div></div></div>';

temp = temp
//+ '<div style="display: none;" class="popup modal fade in" id="popup1"	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"	aria-hidden="true">'
+ '<div style="display: none;" class="popup modal fade in" id="customTemplatePopUpObj" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"	aria-hidden="true">'
+ '<div class="modal-dialog"><div class="modal-content" class="col-md-11">'
+ '<div class="modal-body"><div id="MainTabs" class="tab-content">'
+ '<form class="form-horizontal  col-md-12-1"><div class="form-group col-md-12-1" id="customizetemplateObj"></div>'
+ '</form></div></div><div class="modal-footer">'
//+ '<div class="divide-10"></div><button type="button" class="btn btn-default exit" data-dismiss="modal" onclick="hidePopUpDocterDesk1()">Close</button>'
+ '<div class="divide-10"></div><button type="button" class="btn btn-default exit" data-dismiss="modal" onclick="hidePopUpOPDTemplateObj();">Close</button>'
+ '<button type="button" class="btn btn-default exit"	id="btnUseTemplateDDSubObj" value="" data-dismiss="modal" onclick="useOPDTemplateObj()">Use Template</button>'
+ '</div></div></div></div>';

$("#ipdDoctorStationJSPHeadDiv").html(temp);
}


function saveOPDAllergyAlerts(){
	
	var unitId = $("#unitId").val();
	var patientId = $.trim($('#pt_Id').val());
	var treatmentId = $.trim($('#tr_Id').val()); 
	
	var allergyName = ($('#allergyName').val()).trim();
	var allergyType = $('#allergyType').val();
	var allergyReaction = $('#allergyReaction').val();
	var allergyDate = $('#allergyDate').val();				// first obeserved date : ON UI
	var currentDate = $('#currentDate').val();
	var allergyNotes = ($('#allergyNotes').val()).trim();
	
	
	if (patientId == "" || patientId == undefined || patientId == "undefined") {

		alert("Patient id not fetched properly...");
		return false;
	}

	if (allergyName == "") {
		alert("Please enter Allergy name...");
		SetFocus("allergyName");
		return false;
	}

	if (allergyDate == "") {
		alert("please select fisrt observed date in the format:ex 'dd/mm/yyyy'");
		$('#allergyName').focus();
		return false;
	}
	

	if (allergyDate != "") {
		// var booleanValue = ValidateDateFormat(allergyDate);
		var booleanValue = checkPrevCurrDate('doctorDesk');
		// if booleanValue = false;
		if (!booleanValue) {
			alert("First observe date should be less than todays!!!");
			return false;
		}
	}
	
	var allergyAlertsId = $('#allergyAlertsId').val();						// hidden field on UI, set to 0 default.
	
	var inputs = [];
	
	inputs.push('allergyAlertsId=' + allergyAlertsId);
	inputs.push('unitId=' + unitId);
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('allergyName=' + encodeURIComponent(allergyName));			//string
	inputs.push('allergyType=' + allergyType);								//int
	inputs.push('allergyReaction=' + allergyReaction);						//string
	inputs.push('allergyDate=' + allergyDate);								//string
	inputs.push('allergyNotes=' + allergyNotes);							//string
	
	
	var str = inputs.join('&');
	
			jQuery.ajax({
			type : "POST",
			url : "ehat/opdClinicalEvaluation/saveOPDAllergyAlerts",
			data	: str + "&reqType=AJAX",
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(data) {
				if (data == 1) {
					alert("Records Saved Sucessfully");
					fetchAllAllergyAlerts();						
					clearAllergyAllerts();										
				}else if (data == 2) {
					alert( "Records Updated Sucessfully");
					fetchAllAllergyAlerts();						
					clearAllergyAllerts()
				}
			}
		});	
}

function clearAllergyAllerts(){
	
	$('#allergyName').val('');
	$('#allergyType').val('0');
	$('#allergyReaction').val('0');
	$('#allergyDate').val('');
	$('#allergyNotes').val('');
}

function fetchAllAllergyAlerts(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		
		inputs.push('treatmentId=' + treatmentId);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/opdClinicalEvaluation/fetchAllAllergyAlerts",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
		//	alert(JSON.stringify(r));
		//	setAllAllergyAlerts(r);
				
				var testObj = r;
				var allergyAlertsCount = 1;
				var allergyTypeText = "";
				var allergyReactionText = "";
				
				var AllergyAlertsPrescriptionTempHtml = "";  // added for prescription tab, 16 JAN 22
				
				var AllergyAlertsTempHtml = "";
				
				if (testObj.listOPDAllergyAlertsDto.length > 0) {
					
					for ( var int = 0; int < testObj.listOPDAllergyAlertsDto.length; int++) {
						
						if ((testObj.listOPDAllergyAlertsDto[int].allergyType) == 0) {
							allergyTypeText = "---";
						} else {
							allergyTypeText = $(
									"#allergyType option[value='"
											+ testObj.listOPDAllergyAlertsDto[int].allergyType
											+ "']").text();
											
						}
						
						if ((testObj.listOPDAllergyAlertsDto[int].allergyReaction) == "0") {
							allergyReactionText = "---";
						} else {
							allergyReactionText = $(
									"#allergyReaction option[value='"
											+ testObj.listOPDAllergyAlertsDto[int].allergyReaction
											+ "']").text();
						}
						
						AllergyAlertsTempHtml = AllergyAlertsTempHtml
								
								+ "<tr><td class='col-md-1-1 center TextFont'>"
								+ allergyAlertsCount
								+ "</td>"
								+ "<td class='col-md-2-1 center TextFont'>"
								+ testObj.listOPDAllergyAlertsDto[int].allergyName
								+ "</td>"
								+ "<td class='col-md-2-1 center TextFont'>"
								+ allergyTypeText
								+ "</td>"
								+ "<td class='col-md-2-1 center TextFont'>"
								+ allergyReactionText
								+ "</td>"
								+ "<td class='col-md-3-1 center TextFont' style='padding-left: 15px;'>"
								+ testObj.listOPDAllergyAlertsDto[int].allergyNotes
								+ "</td>"
								+ "<td class='col-md-2-1 center TextFont' style='padding-left: 15px;'>"
								+ testObj.listOPDAllergyAlertsDto[int].allergyDate
								+ "</td>"
								+ "<td class='col-md-1-1 center'>"
								+ "<input name='opdAllergyAlertsCheckbox' id='"
								+ (testObj.listOPDAllergyAlertsDto[int].allergyAlertsId)
								+ "' type='checkbox' style='cursor: pointer; margin-top: 2px;' /></td>"
								+ "</tr>";
								

						AllergyAlertsPrescriptionTempHtml = AllergyAlertsPrescriptionTempHtml
						+ "<tr><td class='col-md-1-1 TextFont'>"
						+ allergyAlertsCount
						+ "</td>"
						+ "<td class='col-md-3-1 TextFont'>"
						+ testObj.listOPDAllergyAlertsDto[int].allergyName
						+ "</td>"
						+ "<td class='col-md-2-1 TextFont'>"
						+ allergyTypeText + "</td></tr>";
								
								
							}
				}
				
			//	 allergyAlertsCount++;
				
			$('#allergyAlertsContent').html(AllergyAlertsTempHtml);
			
			$('#allergyAlertsPrescriptionContent').html(AllergyAlertsPrescriptionTempHtml);
				
			}
		});
	}
}

function editOPDAllergyAlerts(){
	
	if (($("#allergyAlertsContent").html()) == "") {
		alert("No Data to Edit Allergy Alerts !");
		return false;
	}
	
	$("#allergyName,#allergyType,#allergyReaction,#allergyDate,#allergyNotes").removeAttr("disabled");
	
	var array = new Array();
	var allergyAlertsId = 0;
	
	$("input[name='opdAllergyAlertsCheckbox']:checked").each(function() {
		array.push($(this).val());
		allergyAlertsId = ($(this).attr('id')).trim();
		
	});
	
	if ((array.length) == 0) {
		alert("Please check the checkbox to edit !");
		return false;
	}

	if ((array.length) != 1) {
		alert("Please Select Single Checkbox !");
		return false;
	}

	if (allergyAlertsId == "0" || allergyAlertsId == "") {
		alert("Please check the checkbox !");
		return false;
	}
	
	$("#allergyAlertsId").val(allergyAlertsId);
	
	if(allergyAlertsId != undefined && allergyAlertsId != null && allergyAlertsId != "" && allergyAlertsId !="null"){
		
		var inputs = [];
		
	//	inputs.push('unitId=' + unitId);
		inputs.push('allergyAlertsId=' + allergyAlertsId);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/opdClinicalEvaluation/getAllergyAlertsById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setOPDAllergyAlertsForEditing(r);
			}
		});
	}
}

function setOPDAllergyAlertsForEditing(r){
	
	$("#allergyAlertsId").val(r.allergyAlertsId);		// hidden field on UI, default always set to 0.
	
	$('#allergyName').val(r.allergyName);
	$('#allergyType').val(r.allergyType);
	$('#allergyReaction').val(r.allergyReaction);
	$('#allergyDate').val(r.allergyDate);
	$('#allergyNotes').val(r.allergyNotes);
	
}

function deleteOPDAllergyAlerts(){
	
	if (($("#allergyAlertsContent").html()) == "") {
		alert("No Data to Delete !");
		return false;
	}
	
	var allergyAlertsId = 0;
	
	$("input[name='opdAllergyAlertsCheckbox']:checked").each(function() {
		allergyAlertsId = ($(this).attr('id')).trim();
		
	});
	
	if (allergyAlertsId == "0" || allergyAlertsId == "") {
		alert("Please check the checkbox !");
		return false;
	}
	
	var r = confirm("Delete Record ?");
	if (r) {
		var inputs = [];
		
	//	inputs.push('unitId=' + unitId);
		inputs.push('allergyAlertsId=' + allergyAlertsId);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/opdClinicalEvaluation/deleteOPDAllergyAlerts",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				alert(r);
				fetchAllAllergyAlerts();
			}
		});
	}
	
}

function getAllCustomTemplates(){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/gethospitalspcializationList",
		success : function(r) {
			
			setspcializationList(r);
		}
	});
}

function setspcializationList(r)
{
	var listspec="";	
	
	listspec = listspec + "<option value='0'>--Select Speciality--</option>";
	
	for(var i=0;i<r.hospitalspclgetlist	.length;i++)
	{
		listspec=listspec+'<option value="'+r.hospitalspclgetlist[i].specialisationId+'">'+r.hospitalspclgetlist[i].specializationName+'</option>';
	}
	$("#selDocSpec").html(listspec);
	$("#selDocSpec").select2();   // added by sandip

}

// aniket kanse 07 JAN 22
function fetchCustomTemplatesBySpecializationId(id){
	
	var inputs = [];
	
		inputs.push('doctorSpecialization=' + id);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/opdClinicalEvaluation/fetchCustomTemplatesBySpecializationId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
		//		alert(JSON.stringify(r));
				setCustomTemplatesForClinicalEvaluation(r);
				
			}
		});
}

function setCustomTemplatesForClinicalEvaluation(r){
	
	var list = "";  
	list = list + "<option value='0'> SELECT TEMPLATE </option>";
	
	/*if(r.customizeTemplateList.length > 0){
		
		
		for(var i=0; i<r.customizeTemplateList.length; i++)
		{
	
			list = list +  "<option value='"+r.customizeTemplateList[0].idCustomizeTemplate+"'>" + (r.customizeTemplateList[0].temp_name) + "</option>";
		}
		
	    $("#customizeTemplates").html(list);
		
	} else {
		
		alert(" No Templates found for selected speciality !");
		return false;
		
	}*/
	
if(r.pattemplist.length > 0){
		
		
		for(var i=0; i<r.pattemplist.length; i++)
		{
	
			list = list +  "<option value='"+r.pattemplist[i].idpattemp+"'>" + (r.pattemplist[i].tempname) + "</option>";
		}
		
	    $("#customizeTemplates").html(list);
		
	} else {
		
		alert(" No Templates found for selected speciality !");
		return false;
		
	}
	
}

function getCustomTemplateData(id){
	
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
			setCustomTemplateData(r);
		}
	});
}

function setCustomTemplateData(r){
	
	//$('#opdCustomTemplateId').val(r.idCustomizeTemplate);		// PK of "CustomizeTemplate", hidden field on UI, default 0.
	
	$('#varCustomTemplateData').val(r);			// custom template object set to hidden field on UI.
	
	$('#opdCustomTemplateId').val(r.idpattemp);	
	$('#opdCustomTemplateSubjectiveData').val(r.tempdata);	
	//$('#editorSubObjOPDTreatment').val(r.tempdata);	
	CKEDITOR.instances['editorSubObjOPDTreatment'].setData(r.tempdata);
	
}

function showPopUpOPDTemplate(callfrom){
	
	var opdCustomTemplateId = $('#opdCustomTemplateId').val();
	
	if(opdCustomTemplateId == "0" || opdCustomTemplateId == "" || opdCustomTemplateId == null || opdCustomTemplateId == undefined){
		
		alert("Please select a custom template !");
	}
	
	var customTemplateObject = $("#varCustomTemplateData").val();
	
	
	if (callfrom == "s") {
		$("#customTemplatePopUpSub").show();
	//	$('#customizeTemplatesID').val(myObj.idpattemp);
		$('#customizetemplateSub').html(customTemplateObject.tempdata);
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
	
function hidePopUpOPDTemplateSub() {
	$("#customTemplatePopUpSub").hide();
}

function hidePopUpOPDTemplateObj() {
	$("#customTemplatePopUpObj").hide();
}

function useOPDTemplateSub(){
	
	var sbj = $('#opdCustomTemplateSubjectiveData').val();

	
	if(sbj == "0" || sbj == "" || sbj == null || sbj == undefined){
		
		return false;
	}else {
		
		CKEDITOR.instances['editorSubObjOPDTreatment'].setData(sbj);
	}
	
	hidePopUpOPDTemplateSub();
	
}

function useOPDTemplateObj(){
	
	
	var obj = $('#opdCustomTemplateOjectiveData').val();
	
	if(obj == "0" || obj == "" || obj == null || obj == undefined){
		
		return false;
	} else {
		
		var existingData = CKEDITOR.instances['editorSubObjOPDTreatment'].getData();
		
//		alert( "existingData " + existingData);
		
		CKEDITOR.instances['editorSubObjOPDTreatment'].setData(existingData + obj);
	}
	
	hidePopUpOPDTemplateObj();
	
}

function saveOPDClinicalEval(){
	
//	alert(" -- save clinical evaluation : ");
	
	var clinicalEvalId = $('#clinicalEvalId').val();						// hidden field on UI, set to 0 default.
	var unitId = $("#unitId").val();
	var patientId = $.trim($('#pt_Id').val());
	var treatmentId = $.trim($('#tr_Id').val()); 
	
	
	
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
	
	var str = inputs.join('&');
	
			jQuery.ajax({
			type : "POST",
			url : "ehat/opdClinicalEvaluation/saveOPDClinicalEvaluation",
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


function fetchClinicalEvalTempDataByTreatmentId(){
//		alert(" fetchClinicalEvalTempDataByTreatmentId");
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		
		inputs.push('treatmentId=' + treatmentId);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/opdClinicalEvaluation/fetchClinicalEvalTempDataByTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
		//		alert( JSON.stringify(r) );
				if(r != null ){
					$('#clinicalEvalId').val(r.clinicalEvalId);		// hidden field on UI, default always set to 0.
					CKEDITOR.instances['editorSubObjOPDTreatment'].setData(r.clinicalEvaltemplateData);
				}
				
				
			}
		});
	}

}


// ------------------- below code for growth chart-------------------------

/*function fetchStandardAndPatientBMIDetailsNew() {
	alert("Hello");
	$("#GrowthChartButtonPopup *").prop('disabled',false);
	$('#HEIGHT_WEIGHT_HEADCIM_LI_ID').addClass('active');
	$('#HEIGHT_WEIGHT_HEADCIM').addClass('active in');

	$('#HEIGHT_WEIGHT_BMI_GreaterThanFiveYears_LI_ID').removeClass('active');
	$('#HEIGHT_WEIGHT_BMI_GreaterThanFiveYears').removeClass('active in');

//	var pid = $('#patientId').val();
	
	var pid = $.trim($('#pt_Id').val());
	
	if(pid == "" || pid == null){
		pid = $('#patId').html();
	}
	
	var inputs = [];
	inputs.push('perform=LESS_THAN_FIVE_YEARS');
	inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/growthchart/getgrowthchartdetails",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("unable to fetch chart details");
				},
				success : function(r) {
					var sampleData = [];
					
					if ((r.standardAndPatientBMIDetailsDTOList.length) == 0) {

					} else {
						for ( var int = 0; int < (r.standardAndPatientBMIDetailsDTOList.length); int++) {
							sampleData
									.push(r.standardAndPatientBMIDetailsDTOList[int]);
						}
						setTimeout(
								function() {

									if (invokeChartParam == "HEIGHT") {
										// age-height

										standardPatientHeightChart(sampleData);
										$('#BTN_PRINT_HEIGHT_CHART').prop(
												'disabled', false);
									} else if (invokeChartParam == "WEIGHT") {
										// age-weight
										standardPatientWeightChart(sampleData);
										$('#BTN_PRINT_WEIGHT_CHART').prop(
												'disabled', false);
									} else if (invokeChartParam == "HEADCIM") {
										// age-headcim
										standardPatientHeadCIMChart(sampleData);
										$('#BTN_PRINT_HEAD_CHART').prop(
												'disabled', false);
									} else if (invokeChartParam == "ALL") {

										// age-headcim
										standardPatientHeightChart(sampleData);
										$('#BTN_PRINT_HEIGHT_CHART').prop(
												'disabled', false);

										setTimeout(
												function() {

													// age-weight
													standardPatientWeightChart(sampleData);
													$('#BTN_PRINT_WEIGHT_CHART')
															.prop('disabled',
																	false);

													setTimeout(
															function() {

																// age-headcim
																standardPatientHeadCIMChart(sampleData);

																$(
																		'#BTN_PRINT_HEAD_CHART')
																		.prop(
																				'disabled',
																				false);
																$(
																		'#BTN_PRINT_ALL_CHARTS')
																		.prop(
																				'disabled',
																				false);
															}, 1000);

												}, 2000);

									}

								}, 300);

					}

				}
			});
}

function standardPatientHeightChart(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;
	//alert(sampleData.length);
	var newSampleData = [];
	for (var i = 0; i < sampleData.length; i++) {
		// alert(sampleData[i].Pt_Ht_CM);
		if (i == 0) {
			newSampleData.push(sampleData[i]);
		} else {
			if (sampleData[i - 1].Pt_Ht_CM == ""
					&& sampleData[i].Pt_Ht_CM == "0.0"
					&& (sampleData[i + 1].Pt_Ht_CM != "" && sampleData[i + 1].Pt_Ht_CM != "0.0")) {
				newSampleData.push(sampleData[i]);
			} else if (sampleData[i - 1].Pt_Ht_CM != ""
					&& sampleData[i].Pt_Ht_CM == "0.0") {
				sampleData[i].Pt_Ht_CM = "";
				newSampleData.push(sampleData[i]);
			} else {
				newSampleData.push(sampleData[i]);
			}
		}
	}

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per. Height(cm): '
				+ (dataItem.Ht_P3) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per. Height(cm): '
				+ (dataItem.Ht_P15) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per. Height(cm): '
				+ (dataItem.Ht_P50) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per. Height(cm): '
				+ (dataItem.Ht_P85) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per. Height(cm): '
				+ (dataItem.Ht_P97) + '<br /> </div>';
	};

	// ///////////////////////////////////////////
	// custom tool tip function for Max_Height_CM
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />Height(cm): '
				+ (dataItem.Pt_Ht_CM)
				+ '<br /> </div>';

	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Months) v/s Height(Cm) Graph plot.",
		description : "",
		// description : "Age at x-axis and Height at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : newSampleData,
		colorScheme : 'scheme01',
		xAxis : {
			dataField : 'Pt_Age_In_Months',
			unitInterval : 2,
			minValue : 0,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 5,
			minValue : 30,
			maxValue : 120,
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			title : {
				text : 'Height in cm.<br><br>'
			},
			labels : {
				horizontalAlignment : 'right',
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				dataField : 'Pt_Ht_CM',
				// displayText : 'displayTextABC',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				Padding : {
					left : 5,
					top : 5,
					right : 5,
					bottom : 5
				},
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'red',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Ht_P3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Ht_P15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Ht_P50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Ht_P85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Ht_P97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}

			]
		} ]
	};

	// setup the chart
	$('#HEIGHT_GROWTH_CHART_DIV').jqxChart(settings);

}

function standardPatientWeightChart(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;
	var newSampleData = [];
	for (var i = 0; i < sampleData.length; i++) {
		if (i == 0) {
			newSampleData.push(sampleData[i]);
		} else {
			if (sampleData[i - 1].Pt_Wt_KG == ""
					&& sampleData[i].Pt_Wt_KG == "0.0"
					&& (sampleData[i + 1].Pt_Wt_KG != "" && sampleData[i + 1].Pt_Wt_KG != "0.0")) {
				newSampleData.push(sampleData[i]);
			} else if (sampleData[i - 1].Pt_Wt_KG != ""
					&& sampleData[i].Pt_Wt_KG == "0.0") {
				sampleData[i].Pt_Wt_KG = "";
				newSampleData.push(sampleData[i]);
			} else {
				newSampleData.push(sampleData[i]);
			}
		}
	}
	// custom tool tip function for Max_Height_CM
	var toolTipValueFn_W_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per.  Weight(kg): '
				+ (dataItem.Wt_P3) + '<br /> </div>';
	};

	var toolTipValueFn_W_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per.  Weight(kg): '
				+ (dataItem.Wt_P15) + '<br /> </div>';
	};

	var toolTipValueFn_W_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per.  Weight(kg): '
				+ (dataItem.Wt_P50) + '<br /> </div>';
	};

	var toolTipValueFn_W_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per.  Weight(kg): '
				+ (dataItem.Wt_P85) + '<br /> </div>';
	};

	var toolTipValueFn_W_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per.  Weight(kg): '
				+ (dataItem.Wt_P97) + '<br /> </div>';
	};

	// custom tool tip function for Max_Weight_KG
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = newSampleData[itemIndex];
		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />Weight(kg): '
				+ (dataItem.Pt_Wt_KG)
				+ '<br /> </div>';
	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Months) v/s Weight(Kg) Graph plot.",
		description : "",
		// description : "Age at x-axis and Weight at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : newSampleData,
		colorScheme : 'scheme01',
		xAxis : {
			dataField : 'Pt_Age_In_Months',
			unitInterval : 2,
			minValue : 0,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 2,
			minValue : 1,
			maxValue : 25,
			title : {
				text : 'Weight in kg.<br><br>'
			},
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			labels : {
				horizontalAlignment : 'right'
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				dataField : 'Pt_Wt_KG',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'brown',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Wt_P3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Wt_P15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Wt_P50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Wt_P85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Wt_P97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			} ]
		} ]
	};

	// setup the chart
	$('#WEIGHT_GROWTH_CHART_DIV').jqxChart(settings);

}

function standardPatientHeadCIMChart(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;
	var newSampleData = [];
	for (var i = 0; i < sampleData.length; i++) {
		if (i == 0) {
			newSampleData.push(sampleData[i]);
		} else {
			if (sampleData[i - 1].Pt_Hd_CIM == ""
					&& sampleData[i].Pt_Hd_CIM == "0.0"
					&& (sampleData[i + 1].Pt_Hd_CIM != "" && sampleData[i + 1].Pt_Hd_CIM != "0.0")) {
				newSampleData.push(sampleData[i]);
			} else if (sampleData[i - 1].Pt_Hd_CIM != ""
					&& sampleData[i].Pt_Hd_CIM == "0.0") {
				sampleData[i].Pt_Hd_CIM = "";
				newSampleData.push(sampleData[i]);
			} else {
				newSampleData.push(sampleData[i]);
			}
		}
	}
	
	// custom tool tip function for Max_Head_CIM
	var toolTipValueFn_HD_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per. Head(cm): '
				+ (dataItem.Hd_P3) + '<br /> </div>';
	};

	var toolTipValueFn_HD_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per. Head(cm): '
				+ (dataItem.Hd_P15) + '<br /> </div>';
	};

	var toolTipValueFn_HD_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per. Head(cm): '
				+ (dataItem.Hd_P50) + '<br /> </div>';
	};

	var toolTipValueFn_HD_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per. Head(cm): '
				+ (dataItem.Hd_P85) + '<br /> </div>';
	};

	var toolTipValueFn_HD_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = newSampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per. Head(cm): '
				+ (dataItem.Hd_P97) + '<br /> </div>';
	};

	// custom tool tip function for Max_Head_CIM
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = newSampleData[itemIndex];
		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />Head(cm): '
				+ (dataItem.Pt_Hd_CIM)
				+ '<br /> </div>';
	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Months) v/s Head CIM(Cm) Graph plot.",
		description : "",
		// description : "Age at x-axis and Head CIM at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : newSampleData,
		colorScheme : 'scheme01',
		xAxis : {
			dataField : 'Pt_Age_In_Months',
			unitInterval : 2,
			minValue : 0,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 2,
			minValue : 25,
			maxValue : 55,
			title : {
				text : 'Head CIM in cm.<br><br>'
			},
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			labels : {
				horizontalAlignment : 'right'
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				dataField : 'Pt_Hd_CIM',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'brown',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Hd_P3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_HD_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Hd_P15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_HD_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Hd_P50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_HD_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Hd_P85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_HD_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Hd_P97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_HD_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			} ]
		} ]
	};

	// setup the chart
	$('#HEAD_GROWTH_CHART_DIV').jqxChart(settings);

}

function printCharts(chartDivID) {
	var patientDetailsHTML = "<br><br><br><br><br><br><hr>";
	var deptId = $("#deptId").val();
	var deptNm="";

	if(deptId == 1){
		deptNm="OPD. no.";
	}else{
		deptNm="IPD. no.";
	}
	
    var patientID = $("#patientId").val();
    var name = $("#patientname").text();
    var age = $("#age").text();
    	age = (age + "/" + $("#gender").text());
    var cDoc = $.trim($("#doctor_id").text());

    	patientDetailsHTML = patientDetailsHTML
    			+ ("Pat. ID: " + patientID + "&nbsp;&nbsp;&nbsp;&nbsp;"
    			+ "Pat. Name: " + name + "&nbsp;&nbsp;&nbsp;&nbsp;"
    			+ "Pat. Age/Gender: " + age + "&nbsp;&nbsp;&nbsp;&nbsp;"
    			//+ deptNm+": " + admissionNo + "&nbsp;&nbsp;&nbsp;&nbsp;"
    			+ "Cons. Doc.: " + cDoc);

    	patientDetailsHTML = patientDetailsHTML
    			+ ("<br><hr><h3 style='text-align: center;'>SOURCE: WHO CHILD GROWTH STANDARDS.</h3>");
   	var content = "";

	if (chartDivID == "PRINT_ALL") {

		content += $('#HEIGHT_GROWTH_CHART_DIV')[0].outerHTML;

		content += "<br><br>" + ($('#WEIGHT_GROWTH_CHART_DIV')[0].outerHTML);

		content += "<br><br>" + ($('#HEAD_GROWTH_CHART_DIV')[0].outerHTML);

	} else {
		content += $('#' + chartDivID)[0].outerHTML;
	}

	// newWindow, document, pageContent: defined in single var.
	var newWindow = window.open('', '', 'width=1000, height=500'), document = newWindow.document
			.open(), pageContent = '<!DOCTYPE html>'
			+ '<html>'
			+ '<head>'
			+ '<link rel="stylesheet" href="js/ExtraJs/jqx-widgets/jqx.base.css" type="text/css" />'
			+ '<style type="text/css">'
			+ '.jqx-chart-axis-text,.jqx-chart-legend-text,.jqx-chart-axis-description'
			+ ',.jqx-chart-title-text,.jqx-chart-title-description,.jqx-chart-label-text {'
			+ 'font-size: 16px}' + '</style>'
			+ '<meta charset="utf-8" /><title>Chart</title>' + '</head><body>'
			+ patientDetailsHTML + content + '</body></html>';

	document.write(pageContent);
	document.close();
	newWindow.print();
}

function fetchStandardAndPatientBMIDetailsUtilGreaterThanFiveYears(invokeChartParam) {
	
	var pid = $('#patientId').val();
	if(pid == "" || pid == null){
		pid = $('#patId').html();
	}
	
	var inputs = [];
	inputs.push('perform=GREATER_THAN_FIVE_YEARS');
	inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/growthchart/getgrowthchartdetails",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("unable to fetch chart details");
				},
				success : function(r) {
					var sampleData = [];
					if ((r.standardAndPatientBMIDetailsDTOList.length) == 0) {

					} else {

						for ( var int = 0; int < (r.standardAndPatientBMIDetailsDTOList.length); int++) {
							sampleData
									.push(r.standardAndPatientBMIDetailsDTOList[int]);
						}

						setTimeout(
								function() {

									if (invokeChartParam == "ALL") {

										// age-height
										standardPatientHeightChartGreaterThanFiveYears(sampleData);
										$(
												'#BTN_PRINT_HEIGHT_CHART_GreaterThanFiveYears')
												.prop('disabled', false);

										setTimeout(
												function() {

													// age-weight
													standardPatientWeightChartGreaterThanFiveYears(sampleData);
													$(
															'#BTN_PRINT_WEIGHT_CHART_GreaterThanFiveYears')
															.prop('disabled',
																	false);

													setTimeout(
															function() {

																// age-bmi
																standardPatientMBIChartGreaterThanFiveYears(sampleData);

																$(
																		'#BTN_PRINT_BMI_CHART_GreaterThanFiveYears')
																		.prop(
																				'disabled',
																				false);
																$(
																		'#BTN_PRINT_ALL_CHARTS_GreaterThanFiveYears')
																		.prop(
																				'disabled',
																				false);

															}, 1000);

												}, 2000);

									}

								}, 300);

					}

				}
			});
}

// height GreaterThanFiveYears
function standardPatientHeightChartGreaterThanFiveYears(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per. Height(cm): '
				+ (dataItem.Ht_P3) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per. Height(cm): '
				+ (dataItem.Ht_P15) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per. Height(cm): '
				+ (dataItem.Ht_P50) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per. Height(cm): '
				+ (dataItem.Ht_P85) + '<br /> </div>';
	};

	// custom tool tip function for Height_CM
	var toolTipValueFn_H_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per. Height(cm): '
				+ (dataItem.Ht_P97) + '<br /> </div>';
	};

	// custom tool tip function for Max_Height_CM
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />Height(cm): '
				+ (dataItem.Pt_Ht_CM)
				+ '<br /> </div>';
	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Years) v/s Height(Cm) Graph plot.",
		description : "",
		// description : "Age at x-axis and Height at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : sampleData,
		colorScheme : 'scheme01',
		xAxis : {
			dataField : 'Pt_Age_In_Years',
			unitInterval : 1,
			minValue : 5,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 20,
			minValue : 80,
			maxValue : 200,
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			title : {
				text : 'Height in cm.<br><br>'
			},
			labels : {
				horizontalAlignment : 'right',
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				dataField : 'Pt_Ht_CM',
				// displayText : 'displayTextABC',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				Padding : {
					left : 5,
					top : 5,
					right : 5,
					bottom : 5
				},
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'red',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Ht_P3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Ht_P15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Ht_P50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Ht_P85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Ht_P97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_H_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}

			]
		} ]
	};

	// setup the chart
	$('#HEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears').jqxChart(settings);

}

// weight GreaterThanFiveYear
function standardPatientWeightChartGreaterThanFiveYears(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;

	// custom tool tip function for Max_Height_CM
	var toolTipValueFn_W_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per.  Weight(kg): '
				+ (dataItem.Wt_P3) + '<br /> </div>';
	};

	var toolTipValueFn_W_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per.  Weight(kg): '
				+ (dataItem.Wt_P15) + '<br /> </div>';
	};

	var toolTipValueFn_W_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per.  Weight(kg): '
				+ (dataItem.Wt_P50) + '<br /> </div>';
	};

	var toolTipValueFn_W_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per.  Weight(kg): '
				+ (dataItem.Wt_P85) + '<br /> </div>';
	};

	var toolTipValueFn_W_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per.  Weight(kg): '
				+ (dataItem.Wt_P97) + '<br /> </div>';
	};

	// custom tool tip function for Max_Weight_KG
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = sampleData[itemIndex];
		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />Weight(kg): '
				+ (dataItem.Pt_Wt_KG)
				+ '<br /> </div>';
	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Years) v/s Weight(Kg) Graph plot.",
		description : "",
		// description : "Age at x-axis and Weight at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : sampleData,
		colorScheme : 'scheme01',
		xAxis : {
			dataField : 'Pt_Age_In_Years',
			unitInterval : 1,
			minValue : 1,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 5,
			minValue : 10,
			maxValue : 50,
			title : {
				text : 'Weight in kg.<br><br>'
			},
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			labels : {
				horizontalAlignment : 'right'
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				dataField : 'Pt_Wt_KG',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'brown',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Wt_P3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Wt_P15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Wt_P50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Wt_P85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'Wt_P97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_W_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					offset : {
						x : -0,
						y : 35
					},
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			} ]
		} ]
	};

	// setup the chart
	$('#WEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears').jqxChart(settings);

}

// Head CIM GreaterThanFiveYear
function standardPatientMBIChartGreaterThanFiveYears(sampleDataParam) {

	var sampleData = [];
	sampleData = sampleDataParam;

	// custom tool tip function for Max_Head_CIM
	var toolTipValueFn_bmi_3 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />3rd Per. BMI : '
				+ (dataItem.bmi_P3)
				+ '<br /> </div>';

	};

	var toolTipValueFn_bmi_15 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />15th Per. BMI : '
				+ (dataItem.bmi_P15)
				+ '<br /> </div>';
	};

	var toolTipValueFn_bmi_50 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />50th Per. BMI : '
				+ (dataItem.bmi_P50)
				+ '<br /> </div>';
	};

	var toolTipValueFn_bmi_85 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />85th Per. BMI : '
				+ (dataItem.bmi_P85)
				+ '<br /> </div>';
	};

	var toolTipValueFn_bmi_97 = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {

		var dataItem = sampleData[itemIndex];

		return '<div style="text-align:left; width: 130px;"><b>Standard Max. Value</b><br />Age (Months): '
				+ categoryValue
				+ '<br />97th Per. BMI : '
				+ (dataItem.bmi_P97)
				+ '<br /> </div>';
	};

	// custom tool tip function for Max_Head_CIM
	var toolTipPatientFn = function(value, itemIndex, serie, group,
			categoryValue, categoryAxis) {
		var dataItem = sampleData[itemIndex];
		return '<div style="text-align:left; width: 130px;"><b>Patient</b><br />Age (Months): '
				+ categoryValue
				+ '<br />BMI : '
				+ (dataItem.Pt_bmi)
				+ '<br /> </div>';
	};

	// prepare jqxChart settings
	var settings = {
		title : "Standard Age(Years) v/s BMI Graph plot.",
		description : "",
		// description : "Age at x-axis and Head CIM at y-axis.",
		enableAnimations : true,
		showLegend : true,
		padding : {
			left : 10,
			top : 10,
			right : 15,
			bottom : 10
		},
		titlePadding : {
			left : 90,
			top : 0,
			right : 0,
			bottom : 10
		},
		source : sampleData,
		colorScheme : 'scheme01',
		xAxis : {
			dataField : 'Pt_Age_In_Years',
			unitInterval : 1,
			minValue : 5,
			tickMarks : {
				visible : true,
				interval : 1
			},
			gridLinesInterval : {
				visible : true,
				interval : 1
			},
			valuesOnTicks : false,
			padding : {
				left : 0,
				top : 1,
				right : 0,
				bottom : 5
			}
		},
		valueAxis : {
			unitInterval : 2,
			minValue : 10,
			maxValue : 30,
			title : {
				text : 'BMI <br><br>'
			},
			padding : {
				left : 0,
				top : 0,
				right : 1,
				bottom : 0
			},
			labels : {
				horizontalAlignment : 'right'
			}
		},
		seriesGroups : [ {
			type : 'spline',
			series : [ {
				dataField : 'Pt_bmi',
				symbolType : 'circle',
				toolTipFormatFunction : toolTipPatientFn,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : true,
					offset : {
						x : -15,
						y : 8
					},
					backgroundColor : 'brown',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'bmi_P3',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_bmi_3,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'bmi_P15',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_bmi_15,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'bmi_P50',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_bmi_50,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'bmi_P85',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_bmi_85,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			}, {
				dataField : 'bmi_P97',
				// symbolType : 'square',
				toolTipFormatFunction : toolTipValueFn_bmi_97,
				emptyPointsDisplay : 'connect',
				labels : {
					visible : false,
					backgroundColor : '#FEFEFE',
					backgroundOpacity : 0.2,
					borderColor : '#7FC4EF',
					borderOpacity : 0.7,
					padding : {
						left : 5,
						right : 5,
						top : 0,
						bottom : 0
					}
				}
			} ]
		} ]
	};

	// setup the chart
	$('#BMI_GROWTH_CHART_DIV_GreaterThanFiveYears').jqxChart(settings);

}

function printChartsGreaterThanFiveYears(chartDivID) {
	var patientDetailsHTML = "<br><br><br><br><br><br><hr>";
   	var patientID = $("#patientId").val();
   	var name = $("#patientname").text();
   	var age = $("#age").text();
    	age = (age + "/" + $("#gender").text());
   	var cDoc = $.trim($("#doctor_id").text());

   		patientDetailsHTML = patientDetailsHTML
   			+ ("Pat. ID: " + patientID + "&nbsp;&nbsp;&nbsp;&nbsp;"
    		+ "Pat. Name: " + name + "&nbsp;&nbsp;&nbsp;&nbsp;"
    		+ "Pat. Age/Gender: " + age + "&nbsp;&nbsp;&nbsp;&nbsp;"
    		//+ "OPD. no.: " + admissionNo + "&nbsp;&nbsp;&nbsp;&nbsp;"
    		+ "Cons. Doc.: " + cDoc);

    	patientDetailsHTML = patientDetailsHTML
    		+ ("<br><hr><h3 style='text-align: center;'>SOURCE: WHO CHILD GROWTH STANDARDS.</h3>");
    
    var content = "";

	if (chartDivID == "PRINT_ALL") {

		content += $('#HEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears')[0].outerHTML;

		content += "<br><br>"
				+ ($('#WEIGHT_GROWTH_CHART_DIV_GreaterThanFiveYears')[0].outerHTML);

		content += "<br><br>"
				+ ($('#BMI_GROWTH_CHART_DIV_GreaterThanFiveYears')[0].outerHTML);

	} else {
		content += $('#' + chartDivID)[0].outerHTML;
	}

	// newWindow, document, pageContent: defined in single var.
	var newWindow = window.open('', '', 'width=1000, height=500'), document = newWindow.document
			.open(), pageContent = '<!DOCTYPE html>'
			+ '<html>'
			+ '<head>'
			+ '<link rel="stylesheet" href="js/ExtraJs/jqx-widgets/jqx.base.css" type="text/css" />'
			+ '<style type="text/css">'
			+ '.jqx-chart-axis-text,.jqx-chart-legend-text,.jqx-chart-axis-description'
			+ ',.jqx-chart-title-text,.jqx-chart-title-description,.jqx-chart-label-text {'
			+ 'font-size: 16px}' + '</style>'
			+ '<meta charset="utf-8" /><title>Chart</title>' + '</head><body>'
			+ patientDetailsHTML + content + '</body></html>';

	document.write(pageContent);
	document.close();
	newWindow.print();
}*/