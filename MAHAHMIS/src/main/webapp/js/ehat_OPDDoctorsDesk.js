function abcde() {
	$('#timeMorn').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});

	$('#timeAfter').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});

	$('#timeEven').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});

	$('#timeNight').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});

}

/*
 * jQuery(document).ready(function() { App.setPage("OPDDoctorsDesk2"); //Set
 * current page App.init(); //Initialise plugins and elements $(function () {
 * $('[data-toggle="tooltip"]').tooltip(); });
 * 
 * });
 */

$(function() {
	$('#toggle-event').change(function() {
	});
});

$(function() {
	$("#patSum").dialog({
		autoOpen : false,
		show : {
			effect : "blind",
			duration : 100,
		},
		hide : {
			effect : "explode",
			duration : 100
		},
		height : 430,
		width : 400
	});
	$("#viewPatSum1").click(function() {
		$("#patSum").dialog("open");
	});
	$("#viewPatSum2").click(function() {
		$("#patSum").dialog("open");
	});
	$("#dclose").click(function() {
		$("#patSum").dialog("close");
	});
});

// Second Dialog

$(function() {
	$("#allTreat").dialog({
		autoOpen : false,
		show : {
			effect : "blind",
			duration : 100,
		},
		hide : {
			effect : "explode",
			duration : 100
		},
		height : 400,
		width : 700
	});

	$("#viewAll").click(function() {
		$("#allTreat").dialog("open");
	});

	$("#vdclose").click(function() {
		$("#allTreat").dialog("close");
	});
});

$(function() {

	$("#subVitals").click(function() {
		$("#vitalEditDia").dialog("open");
	});

	$("#vitalEditclose").click(function() {
		$("#vitalEditDia").dialog("close");
	});
});

/*
 * function dilogboxvitals(){
 * 
 * 
 * 
 * $("#vitalEditDia").dialog("open"); vitalsUIDoctorDesk("VIEWALLDATE"); }
 * function dilogboxvitalsnew(){
 * 
 * 
 * 
 * $("#vitalEditDia").dialog("open"); vitalsUIDoctorDesk("VIEWALLDATE"); }
 */

function tabsetdepartmentwise() {
	setTimeout(function() {

		var depid = $("#depdocdeskid").val();

		if (depid == 1) {

			// $("#depdocdeskid").show();
			$("#coverSheet").show();
			// $("#Assessment").show();
			// $("#subObj").show();
			$("#prescription").show();
			$("#dialysisAdvice").show();
			$("#cpoe").show();
			$("#instructiontab").show();
			$("#SurgeryAdvices").show();
			$("#iStudy").show();
			$("#Cover_History_Opd").show();
			$("#hallnm").hide();
			$("#diet").show();
			
			// $("#Upload_Document").show();
			setNewtempDoctorDesk('coverSheet');
			var risingFlow = $("#risingFlow").val();
			if (risingFlow == "on") {
				//$("#staging").hide();
				// $("#ipdPrintBtn").hide();
			}
			getCommonAdvcdr();

		} else if (depid == 2) {

			$("#drround").show();
			$("#History").show();
			// $("#Assessment").show();
			// $("#subObj").show();
			$("#cpoe").show();
			$("#OrderForm").show();
			//$("#dialysisAdvice").show();
			$("#instructiontab").show();
			$("#INDENT").show();
			$("#ADNOTE2").show();
			$("#diet").show();
			$("#SurgeryAdvices").show();
			$("#finalAdvancediv").hide();// Pooja
			// $("#Cover_History_Opd").show();
			// $("#Upload_Document").show();
			//setNewtempDoctorDesk('drround');
			var risingFlow = $("#risingFlow").val();

			if (risingFlow == "on") {
				//$("#staging").hide();
				$("#ipdPrintBtn").hide();
			}
			/*
			 * $(".ehatList").removeClass("active");
			 * $("#drround").addClass("active");
			 * setNewtempDoctorDesk('drround');
			 */
		}

	}, 5);

}

/*******************************************************************************
 * 
 * 
 * 
 * @author : Touheed Khan
 * @date : 18/May/2017
 * @base : To Set New template on that div
 ******************************************************************************/
function setNewtempDoctorDesk(id) {
	// making active tag
	var todaysDefaultDate = $("#date").html();
	/* 30-12-2014 */
	var dateSplit = todaysDefaultDate.split('-');
	/* 30/12/2014 */
	todaysDefaultDate = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];

	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");

	//Added By Annapurna
	$("#diets").hide();
	$("#Prescription").hide();
	$("#ddInstructions").hide();
	$("#instruct").hide();
	$("#ADNOTE").hide();
	
	
	var depid = $("#depdocdeskid").val();
	
	
	if (id == "cpoe") {
		temForCpoe(id, depid);
		if (depid == 2) {
			fetchipddetailsdrdesk();
			$('#muldelcp').removeAttr('onclick');
			$('#muldelcp').attr('onclick',
					'deleteCpoeServ(\'multiple\',\'IPD\')');
		} else {
			//this is added by vishnu for opd 
			//fetchbilldetails();
			fetchBillDetails();
		}
		getAllUnitdrdesk();
		// unitMasterListOnLogin();
		var uid = $("#uids").val();
		//setDocNamedrdesk();
		// this is added by vishnu for doctor list in doctor desk service advise
		getAllDoctorsList();
		$("#uId").val(uid);

		// fetchDoctorHospital();
		showADNOTE(id);

	} else if (id == "coverSheet") {

		showADNOTE(id);
		temForcoversheet(id);
		var pathoMngmnt = $("#pathoMngmnt").val();
		if (pathoMngmnt == "on") {
			$(".lab_button").show();
			$(".b").hide();
		} else {
			$(".b").show();
			$(".lab_button").hide();
		}
		$(function() {

			$("#vitalEditDia").dialog(
					{

						open : function() {
							$(this).closest(".ui-dialog").find(
									".ui-dialog-titlebar-close").addClass(
									"btn btn-xs btn-danger").html(
									"<i class='fa fa-times'></i>");
						},

						autoOpen : false,
						show : {
							effect : "blind",
							duration : 100,
						},
						hide : {
							effect : "explode",
							duration : 100
						},
						height : 500,
						width : 800
					});

			$("#editVitals").click(function() {

				$("#vitalEditDia").dialog("open");
				vitalsUIDoctorDesk("VIEWALLDATE");
			});

			$("#vitalEditclose").click(function() {
				$("#vitalEditDia").dialog("close");
			});
			fetchPreviousTreatmentsByTreatmentID();
		});

		// add new vitals: START
		$(function() {
			$("#vitalNewDia").dialog(
					{

						open : function() {
							$(this).closest(".ui-dialog").find(
									".ui-dialog-titlebar-close").addClass(
									"btn btn-xs btn-danger").html(
									"<i class='fa fa-times'></i>");
						},

						autoOpen : false,
						show : {
							effect : "blind",
							duration : 100,
						},
						hide : {
							effect : "explode",
							duration : 100
						},
						height : 400,
						width : 500
					});

			$("#newVitals").click(function() {
				$("#vitalNewDia").dialog("open");
				vitalsUIDoctorDesk("EDIT");
			});

			$("#vitalNewclose").click(function() {
				$("#vitalNewDia").dialog("close");
			});
		});

		vitalsUIDoctorDesk("VIEW");// fetching details of vitals
		// add new vitals: END
		showPrescriptionTemp();

		fetchAllergyAlerts();

		fetchpato();
		fetchinvestigation();
	} else if (id == "drround") {
		var physicalDisFlag = $("#physicalDisFlag").val();
		showADNOTE(id);
		temForDoctorround(id, physicalDisFlag);
		//setDoctorPreRound();
		

	} else if (id == "Assessment") {
		showADNOTE(id);
		showAssessmentTemp();
		temForAssment(id);

	} else if (id == "OrderForm") {
		showADNOTE(id);
		temForOrderform(id);
		fetchPreperationsList("DoctorDesk");
		fetchUnitTypeList("DoctorDesk");
		fectchAllPrescriptionInstruction("IPD");
		showPrescriptionTemp();
		$("#OFdate-pick").val(todaysDefaultDate);
		var shraddhaFlow = $("#shraddhaFlow").val();
		if (shraddhaFlow == "off") {
			$("#shrdhaF").hide();
			$("#shrdhaH").hide();
		}
	} else if (id == "ADNOTE2") {
		// $("#ADNOTE").show();
		showADNOTE(id);
		// alert("12");
		// temForAdmmissionnote(id);
	} else if (id == "Upload_Document") {
		showADNOTE(id);
		temForuploaddoc(id);
		fetchDoc();
		var pid = $("#pt_Id").val();
		var trid = $("#tr_Id").val();
		$("#TRTiD").val(trid);
		$("#PiD").val(pid);

	} else if (id == "Indent") {
		showADNOTE(id);
		temForINDENT(id);
		getIndentTemplateDetails('indent');
		getStoreDetails();
		$("#popup_container2").val($("#date").html());
		// start:date picker on pop up
		new JsDatePick({
			useMode : 2,
			target : "txtMRNDate",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath : "../img/",
			weekStartDay : 1,
		});

	} else if (id == "History") {
		showADNOTE(id);

		fetchAddIPDHistory();
		temForHistory(id);
		fetchtemplatename('Dr');
		var mrnid = $("#mrnID").val();
		$("#mrn").val(mrnid);
	} else if (id == "subObj") {
		showADNOTE(id);
		temForSubObj(id);
		viewBMIDetailsFromDoctorDesk('onload');
		// fetchCKEditorDocterDesk1();
		fetchDoctorSpecilizations1('custTemp');
		getAllBodyPart();
		CKEDITOR.replace('editorSubObjTreatment', {
			height : "220px",
			skin : "v2"
		});
		$('#editorSubObjTreatment').show();

	} else if (id == "Cover_History_Opd") {
		// alert(id+" 325");
		showADNOTE(id);
	} else if (id == "iStudy") {
		new JsDatePick({
			useMode : 2,
			target : "lmpdt",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath : "../img/",
			weekStartDay : 1
		});
		showADNOTE(id);
		temForStudy(id);
		fetchStudyData();

	} else if (id == "SurgeryAdvices") {
		showADNOTE(id);
		fetchAdvice();
		temForSurgeryAdvice(id);
		fetchPTNameForOtSchedule();
		fetchDepartmentForOTSchedule();
		getOperationName();

		$("#adviceDate").val(todaysDefaultDate);

	} else if (id == "prescription") {
		
		showADNOTE(id);
		fetchPreperationsList("DoctorDesk");
		fetchUnitTypeList("DoctorDesk");
		fectchAllPrescriptionInstruction("OPD");
		showPrescriptionTemp();
	}		
	else if (id == "instructiontab") {
		/* Parent Child Treatment Instruction */
		fetchPCTreatmentInstructionIPD();//fetchPCTreatmentInstruction();
		getListOfIndivisualInstruction();//fetchReportInstruction();
		//fetchSurgicalKitNm('instructions');
		fetchIndividualTreatmentInstructionIPD();//fetchIndividualTreatmentInstruction();
		showADNOTE(id);

	} else if (id == "staging") {
		showADNOTE(id);
		var pid = $("#pt_Id").val();
		getAllBodyPart1();
		getTNMStageByPatientId(pid);
		temForStaging(id);
	} else if (id == "diet") {
		showADNOTE(id);
		setDietTemplate();
	} else if (id == "Cover_History_Opd") {
		setCoverHistoryOpdTemp();
	}else if (id == "dialysisAdvice") {		
		showADNOTE(id);		
	}
	previousTreatmentDisable();

}

function temForSubObj(id) {
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
				+ '<textarea class="ckeditor ui-widget-content" name="editorSubjective" title="Rich Text Editor, editorSubjective" placeholder="Content" id="editorSubObjTreatment"></textarea>'
				+ '<input type="hidden" id="idTreatmentCkeditor" value="0" style="display: none" /> <input type="hidden" id="keyValueCKEditorArrayDiv" value="" style="display: none" /></div>';
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
				+ '<label class="TextFont col-sm-2-1">Speciality</label> <select id="selDocSpec" style="margin-left: -10px;" class="col-sm-4-1" onchange="fetchCustomizeTemplates(this.value, \'opd\');">'
				+ '</select> <label class="TextFont col-sm-1">Template</label> <select id="customizeTemplates" class="col-sm-4-1" style="margin-left: 35px;" onchange="setCustomizeTemplatesID(this.value);">'
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
				+ '<button class="btn btn-block btn-primary" onclick=showPopUpDocterDesk1("s")>Save H & P (History & Physical)</button>'
				+ '<button class="btn btn-block btn-info" onclick=showPopUpDocterDesk1("o")>Save Physical Examination</button>'
				+ '</div> </div> ';
	}
	temp = temp
			+ '<div class="col-sm-10-1" style="margin-top: 15px;">'
			+ '<button class="btn btn-block btn-grey" type="button" id="AlertsAllergiesPopupButton" data-toggle="modal"'
			+ 'data-target="#Alerts_Allergies" onclick="fetchAllergyAlerts(),enableAllergyTextBoxes()">Alerts & Allergies</button>';
	if (subobjWithComplaintAndFinding == "off") {
		temp = temp
				+ '<button class="btn btn-block btn-success editUserAccess"'
				+ ' style="margin-left: 0px; margin-top: 5px;"'
				+ 'onclick="saveCKEditorDocterDesk1()" disabled="disabled">Save Data</button>';
	}

	temp = temp
			+ '</div> <div id="Alerts_Allergies" class="modal fade in">'
			+ '<div class="modal-dialog" style="margin-top: 45px;">'
			+ '<div class="modal-content" class="col-md-12" style="height: 430px;">'
			+ '<div class="modal-header" style="padding-bottom: 0px;"> <div class="box-title" style="margin-bottom: -1px;">'
			+ '<h4> <i class="fa fa-calendar"></i>Alerts & Allergies </h4>'
			+ '<div class="form-group col-md-2-1" style="float: right;">'
			+ '<button type="button" id="btnSaveAllergyAlerts" class="btn  btn-xs btn-primary" onclick="saveAllergyAlerts()">Save</button>'
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
			 * type="checkbox" onclick=saveAllergyAlerts("NA")
			 * id="notKnownAllergies" style="margin-left: 10px;"> </div>'
			 */
			+ '<div class="col-md-12-1" style="margin-top: 10px;"><div class="col-md-12-1">'
			+ '<div class="col-md-12-1" style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;">'
			+ '<label id="enableAllergyTextBoxesLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"><i class="fa fa-plus"></i> New </label>'
			+ '<label id="editAllergyAlertsLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;">'
			+ '<i class="fa fa-edit"></i> Edit </label>'
			+ '<label id="deleteAllergyAlertsLabel" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;">'
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
			+ '<div style="display: none;" class="popup modal fade in" id="popup1"	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"	aria-hidden="true">'
			+ '<div class="modal-dialog"><div class="modal-content" class="col-md-11">'
			+ '<div class="modal-body"><div id="MainTabs" class="tab-content">'
			+ '<form class="form-horizontal  col-md-12-1"><div class="form-group col-md-12-1" id="customizetemplateSubObj"></div>'
			+ '</form></div></div><div class="modal-footer">'
			+ '<div class="divide-10"></div><button type="button" class="btn btn-default exit" data-dismiss="modal" onclick="hidePopUpDocterDesk1()">Close</button>'
			+ '<button type="button" class="btn btn-default exit"	id="btnUseTemplateDDSubObj" value="" data-dismiss="modal" onclick="useTemplateDocterDesk1()">Use Template</button>'
			+ '</div></div></div></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);

}

function temForStaging(id) {

	var temp = '<div id="Clinical" class="tab-pane fade active in">'
			+ '<div id="row1" class="c	temForSubObj(id);ol-sm-12-1" style="margin-bottom: 9px;">'
			+ '<div id="col1" class="col-sm-2-1" style="margin-top: 10px; margin-left: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label class="TextFont">Body Part</label>'
			+ '<select onchange=getTNMByBodyPartId($("#bodyPartList").val()) name="body_part" id="bodyPartList" class="form-control input-SmallText"></select>'
			+ '</div></div>'
			+ '<div id="col2" class="col-sm-2-1" style="margin-top: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label class="TextFont">TNM Stage</label>'
			+ '<div id="tnm_stage">'
			+ '<input type="text" id="tnmStage" placeholder="TNM Stage" name="tnmStage" value="t0,n0,m0" class="typeahead form-control input-SmallText" />'
			+ '</div></div></div>'
			+ '<div id="col2" class="col-sm-2-1" style="margin-top: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label class="TextFont">Group Name</label>'
			+ '<div> <input type="text" id="tnmGroupStage" placeholder="Group Name" name="tnm_gr_stage" class="typeahead form-control input-SmallText" />'
			+ '</div></div></div>'
			+ '<div id="col3" class="col-sm-1-1" style="margin-top: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div> <label class="TextFont">Description</label>'
			+ '<textarea id="tnmDescription" class="form-control" style="width: 162px; height: 29px;" type="text" rows="2" cols="10" placeholder="Description"></textarea>'
			+ '</div> </div>'
			+ '<div id="col4" class="col-sm-1-1" style="margin-top: 10px; margin-left: 80px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div> <label class="TextFont">Date</label>'
			+ '<input type="text" placeholder="Date" name="date" readonly="readonly" id="clinicalStageDate" onclick=displayCalendar(document.getElementById("clinicalStageDate"),"dd/mm/yyyy",this) class="form-control input-SmallText" />'
			+ '</div> </div>'
			+ '<div id="col3" class="col-sm-1-1" style="margin-top: 10px; margin-left: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div> <label class="TextFont">Comment</label>'
			+ '<input type="text" placeholder="Comments" name="comments" id="commentClinicalstate" class="form-control input-SmallText" />'
			+ '</div> </div>'
			+ '<div id="col8" class="col-sm-1-1" style="margin-top: -31px; margin-left: 300px;"> <div class="divide-10"></div>'
			+ '<button id="btnSaveClinicalStage" class="btn btn-xs btn-success editUserAccess" onclick="saveClinicalStage()">Save</button>'
			+ '</div> </div>'
			+ '<div class="col-md-12-1" style="padding: 12px 10px 2px 12px;">'
			+ '<div class="col-md-4-1"> <div class="row"> <div class="col-md-8"> <h4>Tumor</h4> </div> </div>'
			+ '<div style="overflow-y: auto; max-height: 150px;">'
			+ '<table class="table table-responsive table-bordered">'
			+ '<tbody id="TMasterBodyDD"> </tbody>'
			+ '</table> </div> </div>'
			+ '<div class="col-md-4-1"> <div class="row"> <div class="col-md-8"> <h4>Lymph Nodes</h4> </div> </div>'
			+ '<div style="overflow-y: auto; max-height: 150px;">'
			+ '<table class="table table-responsive table-bordered">'
			+ '<tbody id="NMasterBodyDD"> </tbody>'
			+ '</table> </div> </div>'
			+ '<div class="col-md-4-1"> <div class="row">'
			+ '<div class="col-md-8">'
			+ '<h4>Metastasis</h4>'
			+ '</div> </div>'
			+ '<div style="overflow-y: auto; max-height: 150px;">'
			+ '<table class="table table-responsive table-bordered">'
			+ '<tbody id="MetaMasterBodyDD">'
			+ '</tbody>'
			+ '</table> </div> </div></div>'
			+ '<div id="row2" class="col-sm-12-1" style="margin-top: 9px;">'
			+ '<div class="col-md-12-1"> <div class="col-sm-12-1"></div>'
			+ '<div class="box-body col-md-12-1"><div class="form-group  box border col-md-12-1">'
			+ '<div class="col-md-12-1" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;">'
			+ '<label class="btn" onclick="resetTNMSatge()" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;">'
			+ '<i class="fa fa-plus"></i> New </label>'
			+ '<label class="btn" onclick="editClinicalStage()" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" id="editClinical"> '
			+ '<i class="fa fa-edit"></i> Edit </label>'
			+ '<label class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" id="deleteClinical" onclick="removeTNMStageById()">'
			+ '<i class="fa fa-trash-o"></i> Delete </label> </div>'
			+ '<div class="col-sm-12-1" style="margin-top: 0px;">'
			+ '<div id="flip-scroll" class="col-sm-12-1" style="overflow-y: scroll; height: 111px; maxheight: auto; margin-top: 0px;">'
			+ '<table class="table table-bordered table-striped table-condensed cf">'
			+ '<thead> <tr> <th class="center"><div class="TextFont">#</div></th>'
			+ '<th><div class="TextFont">Body Part</div></th><th><div class="TextFont">TNM Stage</div></th>'
			+ '<th><div class="TextFont">Group Name</div></th><th><div class="TextFont">Description</div></th>'
			+ '<th><div class="TextFont">Date</div></th><th><div class="TextFont">Comment</div></th>'
			+ '<th><div class="TextFont">Investigator</div></th><th><div class="TextFont">Action</div></th></tr></thead>'
			+ '<tbody id="clinicalStagesBody"></tbody></table>'
			+ '</div></div></div></div></div></div></div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);

}

function temForSurgeryAdvice(id) {
	var temp = '<div class="tab-pane fade active in" id="SurgeryAdvices">'
			+ '<div style="padding-top: 5px;" class="col-md-12-1">'
			+ '<div class="divide-10"></div><div class="panel-body">'
			+ '<div style="border: 1px solid #b8b8b8; height: 400px; padding-left: 5px;" class="col-md-4-1" id="addAdvicesTemp">'
			+ '<div class="col-md-12-1 center"><div class="divide-20"></div>'
			+ '<h4 id="testHead">Add Surgery Advices</h4></div>'
			+ '<div class="form-group Remove-Padding col-md-12-1" style="display: none;" id="testIDDiv">'
			+ '<div class="divide-20"></div><div class="col-md-4-1 ">'
			+ '<label>Advice ID:</label></div><div class="col-md-8-1 center">'
			+ '<input type="text" class="form-group form-control input-SmallText " readonly="readonly" id="adviceID">'
			+ '</div></div><div class="form-group Remove-Padding col-md-12-1">'
			+ '<div class="divide-20"></div><div class="col-md-4-1 ">'
			+ '<label>Procedure Type:<b style="color: red; padding-left: 2px;">*</b></label>'
			+ '</div><div class="col-md-8-1 center">'
			+ '<select class="form-control input-SmallText TextFont" id="selOTtype" name="">'

			+ '<option value="0">-SELECT-</option></select></div>'
			+ '</div>'
			+ '<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<div class="divide-20"></div>'
			+ '<div class="col-md-4-1 "><label>Procedure Group:<b style="color: red; padding-left: 2px;">*</b></label>'
			+ '</div><div class="col-md-8-1 center">'
			+ '<select class="form-control input-SmallText TextFont" onchange="getOperationName()" id="department" name="">'
			+ '<option value="0">-SELECT-</option></select></div></div>'
			+ '<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<div class="divide-20"></div><div class="col-md-4-1 ">'
			+ '<label> Name:<b style="color: red; padding-left: 2px;">*</b></label></div>'
			+ '<div class="col-md-8-1 center"><select class="form-control input-SmallText TextFont" id="selOTName" name="">'
			+ '<option value="0">-SELECT-</option></select></div></div>'
			+ '<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<div class="divide-20"></div><div class="col-md-4-1 ">'
			+ '<label>Indication of Surgery:</label></div>'
			+ '<div class="col-md-8-1 center"><textarea style="/* width: 240px; */ height: 58px;" type="text" class="form-control" rows="5" cols="10" id="indicationSurgery" placeholder="Indication Surgery"></textarea>'
			+ '</div></div><div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<div class="divide-20"></div><div class="col-md-4-1 ">'
			+ '<label>Risk Factor:</label></div>'

			+ '<div class="col-md-8-1 center">'
			+ '<textarea style="/* width: 240px; */ height: 58px;" type="text" class="form-control" rows="5" cols="10" id="riskFactor1" placeholder="Risk Factor"></textarea>'
			+ '</div></div><div class="form-group Remove-Padding col-md-12-1">'
			+ '<div class="divide-20"></div><div class="divide-10"></div>'
			+ '<div class="col-md-4-1 "><label>Advice Date:</label></div>'
			+ '<div class="col-md-8-1 center">'
			+ '<input type="text" onclick="displayCalendar(document.getElementById(\'adviceDate\'),\'dd/mm/yyyy\',this)" onchange="checkFutureDate(\'surgaryAdvice\')" class="form-control input-SmallText" readonly="readonly" placeholder="Date" id="adviceDate">'
			+ '</div></div><div class="col-md-12-1 center"><div class="divide-10"></div>'
			+ '<div class="divide-20"></div>'
			+ '<input id ="saveAdvice" type="button" onclick="saveAdvice()" value="Save" class="btn btn-xs btn-success editUserAccess"> <input type="button" onclick="newAdvice()" value="New Surgery" class="btn btn-xs btn-primary" style="margin-left: 10px;">'
			+ '</div><input type="hidden" value="insert" id="adviceQueryType">'
			+ '</div><div style="margin-left: 1%; margin-top: -9px; width: 646px;" class="col-md-8-1">'
			+ '<div class=""><table class="table table-bordered table-condensed"><thead>'
			+ '<tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-2-1 center"><div class="TextFont">Name</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Edit</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Delete</div></th>'
			+ '</tr></thead></table></div><div style="margin-top: -21px; height: 372px; max-height: auto; border: 1px solid #b8b8b8; overflow-y: scroll;" class="">'
			+ '<table class="table table-striped table-condensed cf">'
			+ '<tbody id="viewAdvicesTemp"></tbody></table>'
			+ '</div></div></div>	</div> </div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);

}
function temForStudy(id) {
	var temp = '<div class="tab-pane fade active in" id="Study"><form>'
			+ '<div class="centered"><div class="divide-10"></div>'
			+ '<div style="height: 50px;" class="col-md-1-1"><input type="button" onclick="setStudyTemp()" value="Initiate" name="Initiate">'
			+ '</div><div class="col-md-1-1 li pull-right">'
			+ '<button data-original-title="Save" class="btn btn-xs btn-success editUserAccess" data-toggle="tooltip" data-placement="left" onclick="saveStudy()" id="saveStudyid" type="button">'
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

}
function temForHistory(id) {
	var temp = '<div class="tab-pane active" id="History">'
			+ ' <div style="padding-top: 0px;" class="col-md-12-1" id="historyRow"></div>'
			+ '<div style="margin-top: -9px; margin-left: 5px;" class="tabbable tabs-left col-md-12-1">'
			/*
			 * +'<ul style="height: 380px;" class="nav nav-tabs">' +'<li class="active"><a
			 * data-toggle="tab" href="#chiefComplaints"> Chief Complaints and
			 * Duration </a></li>' +'<li class=""><a data-toggle="tab"
			 * href="#pastMedHistory"> Past Medical History </a></li>' +'<li class=""><a
			 * data-toggle="tab"
			 * href="#PastPresentFamilyHistory">Past/Present/Family History </a></li>' +'<li class=""><a
			 * data-toggle="tab" href="#OnExaminations"> On Examinations </a></li>' +'<li class=""><a
			 * data-toggle="tab" href="#SystematicExaminations"> Systematic
			 * Examinations </a></li></ul>'
			 */

			/* +'<div style="margin-top: 0px;" class="tab-content col-md-2-1"></div>' */
			+ '<div style="margin-top: 0px;" class="tab-content col-md-12-1">'
			+ '<div class="tab-pane fade active in col-md-12-1" id="chiefComplaints">'
			+ '<div style="margin-top: 8px;" class="tab-content col-md-12-1">'
			+ '<div style="padding-left: 1%;padding-top: 5px;" class="col-sm-12-1">'
			+ '<div class="col-md-1-1"  style="margin-top: 15px;">	<label class="TextFont">Template List</label></div>'
			+ '<div class="col-md-3-1"  style="margin-top: 15px;">'
			+ '<select id="selCustomizeTemp" name="selCustomizeTemp" style="margin-top: 0px;" class="col-md-11-1 form-control input-SmallText " onchange="fetchTemplateIPDHistory(this.value)"><option value="Dr" >NewTemplate</option>	</select></div>'
			+ '<div style="margin-top: 15px;" class="col-sm-2-1">'
			+ '<label class="TextFont">Medical Officer Name.</label></div>'
			+ '<div style="padding-left: -5%; margin-top: 15px;" class="col-sm-2-1">'
			+ '<input type="text" value="" readonly="readonly" name="name" id="medOffName" class="form-control input-SmallText">'
			+ '</div><div style="margin-top: 15px; padding-left: 0%;" class="col-sm-1-1">'
			+ '<label class="TextFont">MRN No.</label></div>'
			+ '<div style="margin-top: 15px;width:150px" class="col-sm-1-1">'
			+ '<input type="text" value="MS16170000001483" readonly="readonly" name="mrn" id="mrn" class="form-control input-SmallText">'
			+ '</div></div>'
			+ '<div style="margin-top: -32px; margin-left:94%;" class="col-sm-2-1"><div class="divide-10"></div>'
			+ '<button onclick="saveAddIpdHistory()" title="Save History " data-placement="left" data-toggle="tooltip" id="saveAddIpdHistory" class="btn btn-xs btn-success" style="margin-left: 2px;">'
			+ '<i class="fa fa-save"></i>'
			+ '</button><button onclick="IPDHistoryPrint();" title="Print " data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning coversheetBtn">'
			+ '<i class="fa fa-print"></i></button></div></div>'
			+ '<div><label class="TextFont">CHIEF COMPLAINTS :</label><div>'
			+ '<div style="margin-top: 25px;" class="col-sm-12-1" id="row_1"> </div>'
			+ ' <table style="margin-top: 25px; width: 100%;" class="table table-bordered"><thead><tr>'
			+ '<th style="height: 21.5px; font-size: &quot;103&quot;;" class="col-sm-1-1 center"><label class="TextFont">#</label></th>'
			+ '<th style="height: 21.5px; font-size: &quot;3&quot;;" class="col-sm-4-1 center"><label class="TextFont">Chief Complaints</label></th>'
			+ '<th style="height: 21.5px; font-size: &quot;3&quot;;" class="col-sm-6-1 center"><label class="TextFont"> Duration</label></th>'
			+ '<th style="height: 21.5px; width: 25px;"><input type="button" value="+" onclick="createDivIPDHistory()"> <input type="button" value="-" onclick="removeChifComp(\'RowCount\')">'
			+ '</th></tr></thead></table><div style="width: 100%; margin-top: -22px; height: 130px; overflow-y: scroll; border: 1px solid lightgrey;">'
			+ '<table class="table table-condensed table-bordered table-stripped cf">'
			+ '<tbody id="historyDiv"></tbody></table></div>'

			+ '<div style="padding-left: 1%; margin-top: 2%;" class="col-md-10-1"><label id="ibch1"class="TextFont">Chief Complaints:</label>'
			+ '<textarea class="" cols="52" rows="1" id="chiefComplaintsTxt"></textarea></div>'

			+ '<div style="padding-left: 1%; margin-top: 2%;" class="col-md-10-1"><label class="TextFont">Negative History:</label>'
			+ '<textarea class="" cols="52" rows="3" id="clinicalFinding"></textarea></div>'

			/* +'<div><label class="TextFont">Past Medical History :</label><div>' */
			+ '<div class="tab-pane fade active in col-md-12-1" id="pastMedHistory"><div style="margin-top: 8px;" class="tab-content col-md-12-1">'
			+ '</div><div style="margin-top: 10px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%">'
			+ ' </div><div style="font: bold; padding-bottom: 1%; padding-top: 2%; padding-left: 2%;" class="col-md-5-1 form-group">'
			+ '<label>PAST/PERSONAL/FAMILY HISTORY :</label><div style="width: 100%; height: 20%; font-family: Tahoma, Geneva, sans-serif; padding-top: 1%; font-size: 13px; float:;" id="tableContent">'

			+ '<table cellspacing="0" cellpadding="0" style="border: 1px solid lightgrey;">'
			+ '<tbody><tr>'
			+ '	<td align="center" style="height: 35px; border: 1px solid lightgrey;"></td>'
			+ '<td align="center" style="height: 35px; border: 1px solid lightgrey;">Yes/No</td>'
			+ '<td align="center" style="height: 35px; border: 1px solid lightgrey;">Duration</td>'
			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">DM</td>'
			+ '<td width="20%" ;="" style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkDm" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtDm" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>'

			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">HTN</td>'
			+ '<td style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkHtn" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtHtn" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">IHD</td>'
			+ '<td style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkIhd" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtIhd" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td></tr>'
			+ '<tr><td width="30%" align="center" style="border: 1px solid lightgrey;">BA/COPD</td>'
			+ '<td style="border: 0.2px solid lightgrey;"><input type="checkbox" id="chkBaco" style="width: 105%; border: 0.2px solid lightgrey;" name=""></td>'
			+ '<td><input type="text" id="txtBaco" style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>'

			+ '</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">OTHER</td>'
			+ '<td style="border: 0.2px solid lightgrey;">'
			+ '<input type="checkbox" id="chkOther" style="width: 105%; border: 0.2px solid lightgrey;" name="">'
			+ '</td>'
			// +'<td><input type="text" id="txtOther" style="width: 100%;
			// border: 0.2px solid lightgrey;"
			// name=""></td></tr></tbody></table>'
			+ '<td><textarea id="txtOther" style="width: 100%; border: 0.2px solid lightgrey;"></textarea></td></tr></tbody></table>'
			+ '</div></div>'

			+ '<div id="PastPresentFamilyHistory" class="col-md-6-1" style="padding-left: 0%; margin-top: 1%;">'
			+ '<div class="col-md-12-1">'
			+ '<div style="padding-left: 0%; margin-top: 2%;" class="col-md-6-1">'
			+ '<label class="TextFont">Past Surgical History:</label><textarea class="" cols="39" rows="2" id="pastSurgHistory"></textarea>'
			+ '</div>'
			+ '<div style="padding-left: 10%; margin-top: 2%;" class="col-md-6-1">'
			+ '<label class="TextFont">Medications:</label><textarea class="" cols="39" rows="2" id="medications"></textarea>'
			+ '</div>'
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 3%;">'
			+ '<div class="col-md-6-1" style="padding-left: 0%;">'
			+ '<label class="TextFont">GYNAE/OBS History :</label><textarea class="" cols="39" rows="2" id="gynac"></textarea>'
			+ '</div>'
			+ '<div class="col-md-6-1" style="padding-left: 10%;">'
			+ '<label class="TextFont">Any allergies or adversedrug reactions?:</label>'
			+ '<textarea class="" cols="39" rows="2" id="drugReaction"></textarea></div>'
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 3%;">'
			+ '<div class="col-md-6-1" style="padding-left: 0%;"><label class="TextFont">Family History:</label>'
			+ '<textarea class="" cols="39" rows="2" id="familyHis"></textarea></div>'
			+ '<div class="col-md-6-1" style="padding-left: 10%;"><label class="TextFont">Personal History:</label>'
			+ '<textarea class="" cols="39" rows="2" id="perHistory"></textarea></div>'
			+ '</div>'

			+ '</div>'
			+ '</div>'

			/*
			 * +'<div class="tab-pane fade active in col-md-12-1"
			 * id="PastPresentFamilyHistory">'
			 */
			/* +'<div><label class="TextFont">Past/Personal/Family History :</label><div>' */
			/*
			 * +'<div style="margin-top: 8px;" class="col-sm-12-1" id="row_1"></div>' +'<div
			 * class="col-md-4-1"><label class="TextFont">Past Reguler :</label>' +'<textarea
			 * class="" cols="40" rows="3" id="pastReguler"></textarea>' +'</div><div
			 * style="padding-left: 0.8%;" class="col-md-4-1">' +'<label
			 * class="TextFont">Present Reguler :</label><textarea class=""
			 * cols="40" rows="3" id="PresentReguler"></textarea>' +'</div>'
			 */

			+ '<div style="padding-right: 8px; margin-top: 1%;" class="col-md-12-1">'

			+ '<div class="divide-10"></div><div class="col-md-4-1" style="display:none;">'
			+ '<label class="TextFont">Habbits:</label>'
			+ '<textarea class="" cols="40" rows="3" id="habbits"></textarea></div>'
			+ '<div style="padding-left: 0.8%;display:none;" class="col-md-4-1">'
			+ '<label class="TextFont">Bowel:</label><textarea class="" cols="40" rows="3" id="bowel"></textarea>'
			+ '</div>'
			+ '<div style="padding-left: 1.6%;display:none;" class="col-md-4-1"><label class="TextFont">Blader:</label>'
			+ '<textarea class="" cols="40" rows="3" id="blader"></textarea></div>'
			+ '</div></div>'

			+ '<div class="tab-pane fade active in col-md-12-1" id="OnExaminations">'
			+ '<div style="margin-top: -17px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%"></div>'
			+ '<div><label class="TextFont">ON EXAMINATION :</label><div>'
			+ '<div style="padding-left: 15px;" class="form-group Remove-Padding col-md-4-1">'
			+ '<div class="divide-10"></div><label class="TextFont">VITALS:</label>'
			+ '<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Temperature:</label> <input type="text" class="form-control input-SmallText" placeholder="Temparature" name="temparature" id="temparature">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Pulse:</label> <input type="text" class="form-control input-SmallText" placeholder="Pulse" name="pulse" id="pulse">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">BP :</label> <input type="text" class="form-control input-SmallText" placeholder="BP" name="bp" id="bp">'

			+ '</div></div><div style="padding-left: 15px;" class="form-group Remove-Padding col-md-4-1"><div class="divide-10"></div>'
			+ '<label class="TextFont">General Exam:</label><div class="divide-10"></div><div class="col-md-12-1">'
			+ '<div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Pallor:</label> <input type="text" class="form-control input-SmallText" placeholder="Pallor" name="Pallor" id="pallor"></div>'
			+ '<div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Clubbing:</label> <input type="text" class="form-control input-SmallText" placeholder="Clubbing" name="Clubbing" id="clubbing">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Lymph Adenopathy:</label> <input type="text" class="form-control input-SmallText" placeholder="Lymph Adenopathy " name="Lymph Adenopathy" id="lymph">'
			+ '</div></div></div><div style="padding-left: 15px; padding-top: 20px;" class="form-group Remove-Padding col-md-4-1">'
			+ '<div class="divide-10"></div><div style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Icterus:</label> <input type="text" class="form-control input-SmallText" placeholder="Lcterus" name="Lcterus" id="lcterus">'
			+ '</div><div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">Oedema:</label> <input type="text" class="form-control input-SmallText" placeholder="Oedema" name="Oedema" id="oedema">'
			+ '</div></div></div>'

			+ '<div class="tab-pane fade active in col-md-12-1 " id="SystematicExaminations">'
			+ '<div style="margin-top: 15px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%"></div>'
			+ '<div><label class="TextFont">SYSTEMIC EXAMINATIONS :</label><div>'
			+ '<div style="left: 15px; margin-top: 1%;" class="col-md-12-1"><div style="margin-top: 0px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">CVS:</label> <input type="text" class="form-control input-SmallText" placeholder="CVS" name="CVS" id="cvs">'
			+ '</div><div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">R/S:</label> <input type="text" class="form-control input-SmallText" placeholder="R/S" name="R/S " id="rs">'
			+ '</div><div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">PA:</label> <input type="text" class="form-control input-SmallText" placeholder="PA" name="PA" id="pa">'
			+ '</div><div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">CNS:</label> <input type="text" class="form-control input-SmallText" placeholder="CNS" name="CNS" id="cns">'

			+ '</div></div> <div style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">'
			+ '<div class="divide-10"></div><div class="col-md-6-1"><label class="TextFont">Local Examinations:</label>'
			+ '<textarea class="" cols="40" rows="3" id="localExm" style="margin-left: 3%;"></textarea></div>'
			+ '<div style="padding-left: 0.8%;" class="col-md-6-1"><label class="TextFont">Investigation Reports:</label>'
			+ '<textarea class="" cols="40" rows="3" id="invsRep" style="margin-left: 1%;"></textarea></div>'
			+ '</div><div style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">'
			+ '<div class="divide-10"></div><div class="col-md-6-1" id="divtempProvId" style="">'
			+ '<label class="TextFont">Provisional Diagnosis:</label>'
			+ '<textarea class="" cols="40" rows="3" id="provDia" style="margin-left: 0%;"></textarea></div>'
			+ '<div style="padding-left: 0.8%;" id="divtempTreatId"  class="col-md-6-1"><label class="TextFont">Treatment Plan:</label>'
			+ '<textarea class="" cols="40" rows="3" id="treatPlan" style="margin-left: 9%;"></textarea></div></div>'
			+ '</div></div> </div></div></div>'

	;

	/*
	 * 
	 * var temp='<div class="tab-pane active" id="History">' +' <div
	 * style="padding-top: 0px;" class="col-md-12-1" id="historyRow"></div>' +'<div
	 * style="margin-top: -9px; margin-left: 5px;" class="tabbable tabs-left
	 * col-md-12-1">' +'<ul style="height: 380px;" class="nav nav-tabs"><li class="active"><a
	 * data-toggle="tab" href="#chiefComplaints"> Chief Complaints and Duration
	 * </a></li>' +'<li class=""><a data-toggle="tab"
	 * href="#pastMedHistory"> Past Medical History </a></li>' +'<li class=""><a
	 * data-toggle="tab" href="#PastPresentFamilyHistory">Past/Present/Family
	 * History </a></li>' +'<li class=""><a data-toggle="tab"
	 * href="#OnExaminations"> On Examinations </a></li>' +'<li class=""><a
	 * data-toggle="tab" href="#SystematicExaminations"> Systematic Examinations
	 * </a></li></ul>' +'<div style="margin-top: 0px;" class="tab-content
	 * col-md-9-1">' +'<div class="tab-pane fade active in col-md-12-1"
	 * id="chiefComplaints">' +'<div style="margin-top: 8px;"
	 * class="tab-content col-md-12-1">' +'<div style="padding-left:
	 * 30%;padding-top: 5px;" class="col-sm-12-1">' +'<div style="margin-top:
	 * 15px;" class="col-sm-3-1">' +'<label class="TextFont">Medical Officer
	 * Name.</label></div>' +'<div style="padding-left: -5%; margin-top:
	 * 15px;" class="col-sm-3-1">' +'<input type="text" value=""
	 * readonly="readonly" name="name" id="medOffName" class="form-control
	 * input-SmallText">' +'</div><div style="margin-top: 15px; padding-left:
	 * 3%;" class="col-sm-2-1">' +'<label class="TextFont">MRN No.</label></div>' +'<div
	 * style="margin-top: 15px;" class="col-sm-3-1">' +'<input type="text"
	 * value="MS16170000001483" readonly="readonly" name="mrn" id="mrn"
	 * class="form-control input-SmallText">' +'</div></div>' +'<div
	 * style="margin-top: -32px; margin-left:94%;" class="col-sm-1-1"><div
	 * class="divide-10"></div>' +'<button onclick="saveAddIpdHistory()"
	 * title="Save History " data-placement="left" data-toggle="tooltip"
	 * id="saveAddIpdHistory" class="btn btn-xs btn-success" style="margin-left:
	 * 2px;">' +'<i class="fa fa-save"></i>' +'</button><button
	 * onclick="IPDHistoryPrint();" title="Print " data-placement="left"
	 * data-toggle="tooltip" class="btn btn-xs btn-warning coversheetBtn">' +'<i
	 * class="fa fa-print"></i></button></div></div>' +'<div
	 * style="margin-top: 25px;" class="col-sm-12-1" id="row_1"> </div>' +'
	 * <table style="margin-top: 25px; width: 100%;" class="table
	 * table-bordered"><thead><tr>' +'<th style="height: 21.5px; font-size: &quot;103&quot;;" class="col-sm-1-1 center"><label
	 * class="TextFont">#</label></th>' +'<th style="height: 21.5px; font-size: &quot;3&quot;;" class="col-sm-4-1 center"><label
	 * class="TextFont">Chief Complaints</label></th>' +'<th style="height: 21.5px; font-size: &quot;3&quot;;" class="col-sm-6-1 center"><label
	 * class="TextFont"> Duration</label></th>' +'<th style="height: 21.5px; width: 25px;"><input
	 * type="button" value="+" onclick="createDivIPDHistory()"> <input
	 * type="button" value="-" onclick="removeChifComp(\'RowCount\')">' +'</th></tr></thead></table><div
	 * style="width: 100%; margin-top: -22px; height: 130px; overflow-y: scroll;
	 * border: 1px solid lightgrey;">' +'<table class="table table-condensed
	 * table-bordered table-stripped cf">' +'<tbody id="historyDiv"></tbody></table></div>' +'<div
	 * style="padding-left: 1%; margin-top: 5%;" class="col-md-10-1"><label
	 * class="TextFont">Clinical Findings:</label>' +'<textarea class=""
	 * cols="52" rows="3" id="clinicalFinding"></textarea></div></div>' +'<div
	 * class="col-md-12-1 tab-pane fade" id="pastMedHistory"><div
	 * style="margin-top: 8px;" class="tab-content col-md-12-1">' +'</div><div
	 * style="margin-top: 30px;" class="col-sm-12-1" id="row_1">' +' </div><div
	 * style="font: bold; padding-bottom: 1%; padding-top: 3%; padding-left:
	 * 2%;" class="col-md-5-1 form-group">' +'<label>Past Medical History</label><div
	 * style="width: 100%; height: 20%; font-family: Tahoma, Geneva, sans-serif;
	 * padding-top: 1%; font-size: 13px; float:;" id="tableContent">' +'<table
	 * cellspacing="0" cellpadding="0" style="border: 1px solid lightgrey;">' +'<tbody><tr>' +'
	 * <td align="center" style="height: 35px; border: 1px solid lightgrey;"></td>' +'<td align="center" style="height: 35px; border: 1px solid lightgrey;">Yes/No</td>' +'<td align="center" style="height: 35px; border: 1px solid lightgrey;">Duration(Hr.)</td>' +'</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">DM</td>' +'<td width="20%" ;="" style="border: 0.2px solid lightgrey;"><input
	 * type="checkbox" id="chkDm" style="width: 105%; border: 0.2px solid
	 * lightgrey;" name=""></td>' +'<td><input type="text" id="txtDm"
	 * style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>' +'</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">HTN</td>' +'<td style="border: 0.2px solid lightgrey;"><input
	 * type="checkbox" id="chkHtn" style="width: 105%; border: 0.2px solid
	 * lightgrey;" name=""></td>' +'<td><input type="text" id="txtHtn"
	 * style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>' +'</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">IHD</td>' +'<td style="border: 0.2px solid lightgrey;"><input
	 * type="checkbox" id="chkIhd" style="width: 105%; border: 0.2px solid
	 * lightgrey;" name=""></td>' +'<td><input type="text" id="txtIhd"
	 * style="width: 100%; border: 0.2px solid lightgrey;" name=""></td></tr>' +'<tr><td width="30%" align="center" style="border: 1px solid lightgrey;">BA/COPD</td>' +'<td style="border: 0.2px solid lightgrey;"><input
	 * type="checkbox" id="chkBaco" style="width: 105%; border: 0.2px solid
	 * lightgrey;" name=""></td>' +'<td><input type="text" id="txtBaco"
	 * style="width: 100%; border: 0.2px solid lightgrey;" name=""></td>' +'</tr><tr><td width="30%" align="center" style="border: 1px solid lightgrey;">OTHER</td>' +'<td style="border: 0.2px solid lightgrey;"><input
	 * type="checkbox" id="chkOther" style="width: 105%; border: 0.2px solid
	 * lightgrey;" name=""></td>' +'<td><input type="text" id="txtOther"
	 * style="width: 100%; border: 0.2px solid lightgrey;" name=""></td></tr></tbody></table>' +'</div></div><div
	 * style="padding-left: 10%; margin-top: 2%;" class="col-md-4-1">' +'<label
	 * class="TextFont">Past Surgical History:</label><textarea class=""
	 * cols="52" rows="3" id="pastSurgHistory"></textarea>' +'</div><div
	 * style="padding-left: 10%; margin-top: 2%;" class="col-md-4-1">' +'<label
	 * class="TextFont">Medications:</label><textarea class="" cols="52"
	 * rows="3" id="medications"></textarea>' +'</div></div> <div
	 * class="col-md-12-1 tab-pane fade" id="PastPresentFamilyHistory">' +'<div
	 * style="margin-top: 58px;" class="col-sm-12-1" id="row_1"> </div>' +'<div
	 * class="col-md-4-1"><label class="TextFont">Past Reguler :</label>' +'<textarea
	 * class="" cols="40" rows="3" id="pastReguler"></textarea>' +'</div><div
	 * style="padding-left: 0.8%;" class="col-md-4-1">' +'<label
	 * class="TextFont">Present Reguler :</label><textarea class="" cols="40"
	 * rows="3" id="PresentReguler"></textarea>' +'</div><div
	 * style="padding-left: 1.6%;" class="col-md-4-1">' +'<label
	 * class="TextFont">GYNAE/OBS History :</label><textarea class=""
	 * cols="40" rows="3" id="gynac"></textarea>' +'</div><div
	 * style="padding-right: 8px; margin-top: 1%;" class="col-md-12-1">' +'<div
	 * class="divide-10"></div><div class="col-md-4-1">' +'<label
	 * class="TextFont">Any allergies or adversedrug reactions?:</label>' +'<textarea
	 * class="" cols="40" rows="3" id="drugReaction"></textarea></div>' +'<div
	 * style="padding-left: 0.8%;" class="col-md-4-1"><label
	 * class="TextFont">Family History:</label>' +'<textarea class=""
	 * cols="40" rows="3" id="familyHis"></textarea></div>' +'<div
	 * style="padding-left: 1.6%;" class="col-md-4-1"><label
	 * class="TextFont">Personal History:</label>' +'<textarea class=""
	 * cols="40" rows="3" id="perHistory"></textarea></div>' +'</div><div
	 * style="padding-right: 8px; margin-top: 1%;" class="col-md-12-1">' +'<div
	 * class="divide-10"></div><div class="col-md-4-1">' +'<label
	 * class="TextFont">Habbits:</label>' +'<textarea class="" cols="40"
	 * rows="3" id="habbits"></textarea></div>' +'<div style="padding-left:
	 * 0.8%;" class="col-md-4-1">' +'<label class="TextFont">Bowel:</label><textarea
	 * class="" cols="40" rows="3" id="bowel"></textarea>' +'</div><div
	 * style="padding-left: 1.6%;" class="col-md-4-1"><label
	 * class="TextFont">Blader:</label>' +'<textarea class="" cols="40"
	 * rows="3" id="blader"></textarea></div>' +'</div></div><div
	 * class="col-md-12-1 tab-pane fade" id="OnExaminations">' +'<div
	 * style="margin-top: 58px;" class="col-sm-12-1" id="row_1"></div>' +'<div
	 * style="padding-left: 15px;" class="form-group Remove-Padding
	 * col-md-4-1">' +'<div class="divide-10"></div><label
	 * class="TextFont">VITALS:</label>' +'<div style="margin-top: 0px;"
	 * class="form-group Remove-Padding col-md-12-1">' +'<label
	 * class="TextFont">Temperature:</label> <input type="text"
	 * class="form-control input-SmallText" placeholder="Temparature"
	 * name="temparature" id="temparature">' +'</div><div style="margin-top:
	 * 5px;" class="form-group Remove-Padding col-md-12-1">' +'<label
	 * class="TextFont">Pulse:</label> <input type="text" class="form-control
	 * input-SmallText" placeholder="Pulse" name="pulse" id="pulse">' +'</div><div
	 * style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">' +'<label
	 * class="TextFont">BP :</label> <input type="text" class="form-control
	 * input-SmallText" placeholder="BP" name="bp" id="bp">' +'</div></div><div
	 * style="padding-left: 15px;" class="form-group Remove-Padding col-md-4-1"><div
	 * class="divide-10"></div>' +'<label class="TextFont">General Exam:</label><div
	 * class="divide-10"></div><div class="col-md-12-1">' +'<div
	 * style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">' +'<label
	 * class="TextFont">Pallor:</label> <input type="text" class="form-control
	 * input-SmallText" placeholder="Pallor" name="Pallor" id="pallor"></div>' +'<div
	 * style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">' +'<label
	 * class="TextFont">Clubbing:</label> <input type="text"
	 * class="form-control input-SmallText" placeholder="Clubbing"
	 * name="Clubbing" id="clubbing">' +'</div><div style="margin-top: 5px;"
	 * class="form-group Remove-Padding col-md-12-1">' +'<label
	 * class="TextFont">Lymph Adenopathy:</label> <input type="text"
	 * class="form-control input-SmallText" placeholder="Lymph Adenopathy "
	 * name="Lymph Adenopathy" id="lymph">' +'</div></div></div><div
	 * style="padding-left: 15px; padding-top: 20px;" class="form-group
	 * Remove-Padding col-md-4-1">' +'<div class="divide-10"></div><div
	 * style="margin-top: 0px;" class="form-group Remove-Padding col-md-12-1">' +'<label
	 * class="TextFont">Icterus:</label> <input type="text" class="form-control
	 * input-SmallText" placeholder="Lcterus" name="Lcterus" id="lcterus">' +'</div><div
	 * style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">' +'<label
	 * class="TextFont">Oedema:</label> <input type="text" class="form-control
	 * input-SmallText" placeholder="Oedema" name="Oedema" id="oedema">' +'</div></div></div><div
	 * class="col-md-12-1 tab-pane fade " id="SystematicExaminations">' +'<div
	 * style="margin-top: 58px;" class="col-sm-12-1" id="row_1"></div>' +'<div
	 * style="left: 15px; margin-top: 1%;" class="col-md-12-1"><div
	 * style="margin-top: 0px;" class="form-group Remove-Padding col-md-3-1">' +'<label
	 * class="TextFont">R/S:</label> <input type="text" class="form-control
	 * input-SmallText" placeholder="R/S" name="R/S " id="rs">' +'</div><div
	 * style="margin-top: 0px; margin-left: 45px;" class="form-group
	 * Remove-Padding col-md-3-1">' +'<label class="TextFont">CVS:</label>
	 * <input type="text" class="form-control input-SmallText" placeholder="CVS"
	 * name="CVS" id="cvs">' +'</div><div style="margin-top: 0px; margin-left:
	 * 45px;" class="form-group Remove-Padding col-md-3-1">' +'<label
	 * class="TextFont">CNS:</label> <input type="text" class="form-control
	 * input-SmallText" placeholder="CNS" name="CNS" id="cns">' +'</div><div
	 * style="margin-top: 0px; margin-left: 45px;" class="form-group
	 * Remove-Padding col-md-3-1"><label class="TextFont">PA:</label> <input
	 * type="text" class="form-control input-SmallText" placeholder="PA"
	 * name="PA" id="pa">' +'</div></div> <div style="padding-right: 8px;
	 * margin-top: 3%;" class="col-md-12-1">' +'<div class="divide-10"></div><div
	 * class="col-md-6-1"><label class="TextFont">Local Examinations:</label>' +'<textarea
	 * class="" cols="40" rows="3" id="localExm" style="margin-left: 3%;"></textarea></div>' +'<div
	 * style="padding-left: 0.8%;" class="col-md-6-1"><label
	 * class="TextFont">Investigation Reports:</label>' +'<textarea class=""
	 * cols="40" rows="3" id="invsRep" style="margin-left: 1%;"></textarea></div>' +'</div><div
	 * style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">' +'<div
	 * class="divide-10"></div><div class="col-md-6-1">' +'<label
	 * class="TextFont">Provisional Diagnosis:</label>' +'<textarea class=""
	 * cols="40" rows="3" id="provDia" style="margin-left: 0%;"></textarea></div>' +'<div
	 * style="padding-left: 0.8%;" class="col-md-6-1"><label
	 * class="TextFont">Treatment Plan:</label>' +'<textarea class=""
	 * cols="40" rows="3" id="treatPlan" style="margin-left: 9%;"></textarea></div></div>' +'</div></div>
	 * </div></div>' ;
	 * 
	 * $("#ipdDoctorStationJSPHeadDiv").html(temp);
	 * 
	 */
	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	$("#medOffName").val($("#docName").html());
}

function temForCpoe(id, depid) {
	var temp = '<div class="tab-pane fade in active" id="CPOE">'
			+ '<div style="padding-top: 0px;" class="col-md-12-1" id="row1">'
			+ '<div style="margin-top: 0px; margin-left: 5px;" class="tabbable tabs-left col-md-12-1">'
			+ '<div style="margin-top: 0px;" class="tab-content col-md-10-1">'
			+ '<div class="tab-pane fade active in col-md-12-1" id="Investigation">'
			+ '<div style="margin-top: 40px;" class="col-sm-12-1" id="Investigation_row_1"><div class="col-sm-4-1">'
			+ '<div style="padding-left:5%" class="form-group Remove-Padding col-sm-12-1">'
			+ '<label for="exampleInputEmail1" class="TextFont">Test Name </label>'
			+ '<div id="divInvestigationTestName"><input type="text" onkeyup="setallservautocomplete(this.id)" style="border: 1px solid orange;" class="typeahead form-control" id="txtautoserviceName" placeholder="Test Name">'
			+ '</div></div><input type="hidden" value="0" id="charges1"> <input type="hidden" value="0" id="investigationtestId">'
			+ '<input type="hidden" value="0" id="idTestSlave"></div>'
			+ '<div style="margin-left: 75px;" class="col-sm-5-1">'
			+ '<div style="padding-top: 15px;" class="col-sm-3-1"></div>'
			/*+ '<label for="exampleInputEmail1" class="TextFont">Select Reference</label>'*/
			+ '<div class="col-sm-4-1"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<label for="exampleInputEmail1" class="TextFont">Doctor</label>'
			+ '<select style="width:130px" class="input-SmallText" id="doctor2"></select></div>'
			+ '</div><div class="col-sm-4-1">'
			+ '<div class="form-group col-sm-12-1">'
			+ '<label for="exampleInputEmail1" class="TextFont">Hospital</label>'
			+ '<select class="form-control input-SmallText" id="hospital2"><option selected="selected" value="0">Select</option></select>'
			+ '</div></div></div>'
			+ '<div style="margin-top:-2%" class="col-sm-2-1">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<label class="TextFont">Unit</label> <select onchange="cleartexrfiled();" class="form-control input-SmallText" id="uId"></select>'
			+ '<input type="hidden" id="allunitid"></div></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-12-1" id="Investigation_row2">'
			+ '<div class="col-sm-6 select2-container select2-container-multi " style="margin-top: 2%;" >'
			+ '<ul id="dynamicItem" class="select2-choices" style="overflow-y: scroll;"></ul>'
			+ '<input type="hidden" id="subserviceid" value="0">'
			+ '<input type="hidden" id="iscombination" value="0">'
			+ '<input type="hidden" id="serviceid" value="0"></div>'
			+ '<div style="margin-top: 10px;padding-left:2%" class="col-sm-1-1" id="col11">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Charges </label> <input type="text" id="chargesubservice" onchange="setHiddenFieldOpdDokDesk(this.value),calculateEmerChrForDocDesskOpd()" class="form-control input-SmallText" placeholder="Charges" readonly="readonly"><input type="hidden" value="" id="cpoeCharges2">'
			+ '</div></div><div style="margin-top: 10px;padding-left:2%" class="col-sm-2-1" id="col9">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Instructions </label> <input type="text" id="cpoeIns" class="form-control input-SmallText" placeholder="Instructions">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-2-1" id="col10">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Clinical Notes </label><input type="text" id="cpoeClinicalNotes" class="form-control input-SmallText" placeholder="Clinical Notes">'
			+ '</div>'
			+ '</div>'

			+ '<div style="margin-top: 30px;padding-left:5px" class="col-sm-0-1" id="col11">'
			+ '<i><input type="button" style="margin-left:1%" value="Save" onclick="saveCpoe(\'DoctorStation\')" class="btn btn-xs btn-success editUserAccess"> </i>'
			+ '</div></div>'

			// Modify By Laxman on 03-March for add Send to Lab flag
			+ '<div class="col-sm-12-1" style="margin-top: 0px;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<input type="checkbox" id="cpoeUrgent">'
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -51px;"> Urgent </label>'
			+ '</div>'
			+ '<div id="cpoesndtolabdiv" style="display:none;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;margin-left: -64px;">';

	if (depid == 2) {
		temp = temp
				+ '<input id="cpoesndtolab" type="checkbox" name="cpoesndtolab" checked>';
	} else {
		temp = temp
				+ '<input id="cpoesndtolab" type="checkbox" name="cpoesndtolab">';
	}

	temp = temp
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -51px;"> Send To Lab </label>'
			+ '</div>'
			+ '</div>'
			// +'</div>'

			// Code by Sanjay on 06-03-018 to send Ris from IPD, OPD, Diagnosis
			+ '<div id="cpoeSendToRisdiv" style="display:none;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;margin-left: -54px;">';

	if (depid == 2) {
		temp = temp
				+ '<input id="cpoeSendToRis" type="checkbox" name="cpoeSendToRis" checked>';
	} else {
		temp = temp
				+ '<input id="cpoeSendToRis" type="checkbox" name="cpoeSendToRis">';
	}

	temp = temp
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -50px;"> Send To Ris </label>'
			+ '</div>'
			+ '</div>'

			+ '<div id="cpoeSendToRaddiv" style="display:none;">'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;margin-left: -64px;">';

	if (depid == 2) {
		temp = temp
				+ '<input id="cpoeSendToRad" type="checkbox" name="cpoeSendToRad" checked>';
	} else {
		temp = temp
				+ '<input id="cpoeSendToRad" type="checkbox" name="cpoeSendToRad">';
	}

	temp = temp
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 0px;">'
			+ '<label class="TextFont Remove-Padding" style="margin-top: 6px;margin-left: -51px;"> Send To Radiation </label>'
			+ '</div>'
			+ '</div>'

			+ '</div>'

			+ '<input type="hidden" value="insert" id="InvestigationQueryType"> <input type="hidden" value="0" id="billSlaveID"> <input type="hidden" value="0" id="investigationSlaveID">'
			+ '</div></div></div></div>'
			+ '<div style="margin-top: 28px" class="col-sm-12-1" id="row2">'
			+ '<div style="margin: 2px;" class="form-group col-md-12-1">'
			+ '<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<label style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="editCPOE_TestLabel1" onclick="editCPOE_Testnew()">'
			+ '<i class="fa fa-edit"></i> Edit</label> <label onclick="deleteCpoeServ(\'multiple\',\'DR\')" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;" id="muldelcp">'
			+ '<i class="fa fa-trash-o"></i> Multiple Delete </label></div>'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1"><table class="table table-condensed ">'
			+ '<thead><tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ '<th style="height: 21.5px; padding-left: 5px;" class="col-md-2-1 center"><div class="TextFont">Particulars/Details</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Consultant Name</div></th>'
			+ '<th style="height: 21.5px; padding-right: 23px;" class="col-md-3-1 center"><div class="TextFont">Type</div></th>'
			+ '<th style="height: 21.5px; padding-right: 29px;" class="col-md-1-1 center"><div class="TextFont">Status</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Action</div></th>'
			+ '<th style="height: 21.5px; padding-right: 31px;" class="col-md-1-1 center"><div class="TextFont">Delete</div></th>'
			+ '</tr></thead></table>'
			+ '<div style="overflow-y: scroll; height: 115px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">'
			+ '<table class="table table-striped table-condensed"><tbody id="tcpoeservices"></tbody>'
			+ '</table><input type="hidden" value="0" id="CPOErowCount"></div></div>'
			+ ' </div></div></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);

}

function temForDoctorround(id, flag) {

	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var today = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '')
			+ month + '/' + year;
	var temp1 = "";
	var temp = '<div class="tab-pane active" id="DailyRoundReport">'
			+ '<div style="padding-left: 30px;" class="col-sm-12-1">'
			+ '<div style="margin-top: 15px;" class="col-sm-2-1">'
			+ '<label class="TextFont">Previous Doctor RoundReport</label></div>'
			+ '<div style="margin-top: 15px;" class="col-sm-3-1">'
			+ '<input type="text" readonly="readonly" onclick="displayCalendar(document.getElementById(\'date-pick\'),\'dd/mm/yyyy\',this)" value='
			+ today
			+ ' onchange="fetchDoctorRoundsByDateOnchange()" name="date-pick" id="date-pick" class="form-control input-SmallText">'
			+ '</div><div style="margin-top: 5px;" class="col-sm-1-1">'
			+ '<div class="divide-10"></div>';
	if (flag == "Y") {
		//temp1 = '<input type="button" value="Save DRR" class="btn btn-xs btn-success " id="iddrr"  disabled="disabled">';
		temp1 = '<input type="button" value="Save DRR" class="btn btn-xs btn-success " id="iddrr"  onclick="getDoctorRounds()">';
	} else {
		//temp1 = '<input type="button" value="Save DRR" class="btn btn-xs btn-success editUserAccess" id="iddrr" onclick="saveDoctorRound()">';
		temp1 = '<input type="button" value="Save DRR" class="btn btn-xs btn-success editUserAccess" id="iddrr" onclick="getDoctorRounds()">';
	}

	temp = temp
			+ temp1
			// from and to date added by jitendra 10 april 2019
			+ '</div> <div style="margin-top: 15px;" class="col-sm-1-1">'
			+ '<label class="TextFont">From :</label></div>'
			+ '<div style="margin-top: 15px;" class="col-sm-1-1">'
			+ '<input type="text" class="form-control input-SmallText" id="fromDate" name="fromDate" onchange="" value='
			+ today
			+ ' onclick="displayCalendar(document.getElementById(\'fromDate\'),\'dd/mm/yyyy\',this)" readonly="readonly">'
			+ '</div>'
			+ '<div style="margin-top: 15px;" class="col-sm-1-1">'
			+ '<label class="TextFont">To :</label>'
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 15px;">'
			+ '<input type="text" class="form-control input-SmallText" id="toDate" name="toDate" onchange="" value='
			+ today
			+ ' onclick="displayCalendar(document.getElementById(\'toDate\'),\'dd/mm/yyyy\',this)" readonly="readonly">'
			+ '</div>'
			// print with header.
			+ '<div style="margin-top: 13px;" id="ipdPrintBtn" class="col-sm-1-1">'
			+ '<button data-original-title="Print " title="print with header" class="btn btn-xs btn-warning" data-toggle="tooltip" data-placement="left" title="" onclick="fetchDoctorRoundsByDate()">'
			+ '<i class="fa fa-print"></i></button>'
			// print without header.
			+ '<button style="margin-left:10px;" id="ipdWithoutHeader" title="print without header" data-original-title="Print " class="btn btn-xs btn-warning" data-toggle="tooltip" data-placement="left" title="" onclick="printWithoutHdrDrround()">'
			+ '<i class="fa fa-print"></i></button>'
			+ '</div>'

			+ '</div><div class="col-sm-12-1">'
			+ '<table style="margin-top: 20px; width: 99%;" class="table table-bordered">'
			+ '<thead><tr><th style="height: 21.5px; width: 15px;"><label class="TextFont">#</label></th>'
			+ '<th style="height: 21.5px; width: 15px;"><label class="TextFont">Time <span class="required text-danger">*</span> </label></th>'
			+ '<th style="height: 21.5px; width: 50px;"><label class="TextFont">Template Name <span class="required text-danger">*</span></label></th>'
			+ '<th style="height: 21.5px; width: 90px;"><label class="TextFont">Clinical Notes</label></th>'
			+ '<th style="height: 21.5px; width: 90px;"><label class="TextFont">Investigation Advice</label></th>'
			+ '<th style="height: 21.5px; width: 60px;"><label class="TextFont">RoundBy <span class="required text-danger">*</span></label></th>'
			+ '<th style="height: 21.5px; width: 25px;"><input type="button" class="editUserAccess" value="+" onclick="toCreateDiv(\'RowCount\');"> <input type="button" class="editUserAccess" value="-" onclick="deleteDoctorRoundIPD()"> '
			+ '</th></tr></thead></table></div>'
			+ '<div style="margin-top: -22px; overflow-y: scroll; height: 370px; max-height: auto;" class="col-md-12-1">'
			+ '<table class="table table-striped table-condensed">'
			+ '<tbody id="DRRDiv"><input type="hidden" id="addRowCount" value="0"><input type="hidden" id="RowCount" value="0"></tbody>	'
			+ '</table></div>' + '</div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);
}

function temForcoversheet(id) {

	var temp = '<div style="margin: 0px;" class="col-md-12-3" id="row1">'
			+ '	<div class="col-md-4-1">'
			+ '	<div style="margin-top: 0px;" class="col-md-12-1 box border default">'
			+ '<div style="margin-top: 0px; background-color: #f0ad4e;" class="box-title col-sm-12-1">'
			+ '<h4><i class="fa fa-bars"></i>Patient Summary</h4></div>'
			+ '<div style="margin-top: 3px;" class="col-sm-12-1">'
			+ '<table class="table table-condensed"><thead>'
			+ '<tr class="TextFont"><th class="col-md-1-1">#</th>'
			+ '<th class="col-md-3-1">Refered To</th> '
			+ '<th class="col-md-3-1">Start Date</th>'
			+ '<th class="col-md-6-1">Admission No</th>'
			+ '<th class="col-md-3-1">Action</th></tr>'
			+ '</thead></table></div>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="previousPatientSummaryTable">'
			+ '</tbody>	</table></div></div></div>'
			+ '<div class="col-md-4-1"><div style="margin: 0px;" class="box border default col-md-12-1">'
			+ '<div style="margin-top: 0px; background-color: #539fb8;" class="box-title col-sm-12-1"><h4>'
			+ '<i class="fa fa-bars"></i>Lab</h4>'
			// Added by Laxman on 22-Feb-2018 for Compare Test result.
			+ '<div class="pull-right">'
			+ '<button title="Compare Test Results" onclick="showComparePopUp(\'cmprbtn\')" type="button" style="margin-top: -4px;display:none;" id="labcmpbut" class="lab_button">'
			+ '<i class="fa fa-exchange"></i></button>'

			+ '<button title="View Lab Result" onclick="showPopUpTestResult(\'viewbtn\')" type="button" style="margin-top: -4px;display:none;" id="labbut" class="lab_button">'
			+ '<i class="fa fa-eye View"></i></button>'
			+ '<button title="View Lab Result" onclick="showreqPopUp()" type="button" style="margin-top: -4px;display:none;" id="labbut" class="b">'
			+ '<i class="fa fa-eye View"></i></button>'
			+ '</div></div>'
			+ '<div style="margin-top: 3px;" class="col-sm-12-1"><table class="table table-condensed"><thead>'
			+ '<tr><th class="col-md-1-1"><div class="TextFont">#</div></th>'
			+ '<th class="col-md-4-1"><div class="TextFont">Particulars</div></th>'
			+ '<th class="col-md-2-1"><div class="TextFont">Date</div></th>'
			+ '<th class="col-md-2-1"><div class="TextFont">Time</div></th></tr></thead>'
			+ '</table></div>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="coverSheetLabDashBoard">'
			+ '</tbody></table></div></div></div>'
			+ '<div class="col-md-4-1"><div style="margin: 0px;" class="box border default col-md-12-1">'
			+ '<div style="margin-top: 0px; background-color: #a696ce;" class="box-title col-sm-12-1">'
			+ '<h4><i class="fa fa-bars"></i>Vitals</h4>'
			+ '<div class="pull-right"><label style="cursor: pointer; margin-right: 20px;" id="editVitals" onclick="dilogboxvitals()">'
			+ '<i class="fa fa-eye View"></i>View All</label> <label style="cursor: pointer;" id="newVitals">'
			+ '<i class="fa fa-plus-square"></i>Todays Vitals</label></div></div>'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1">'
			+ '<table class="table table-condensed">'
			+ '	<thead><tr>'
			+ '<th class="col-md-1-1 TextFont">#</th><th class="col-md-6-1 TextFont">Particulars</th>'
			+ '<th class="col-md-2-1 TextFont">Date</th><th class="col-md-2-1 TextFont center">Report</th>'
			+ '</tr></thead></table></div>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="opdDD2ReadonlyHtmlVitals"></tbody></table></div>'
			+ '</div></div></div>'

			+ '<div style="margin-top: 0px;" class="col-md-12-1" id="row2">'

			+ '<div class="col-md-4-1">'
			+ '<div style="margin: 0px;" class="box border default col-sm-12-1">'
			+ '<div style="margin-top: 0px; background-color: #a8bc7b;" class="box-title col-sm-12-1">'
			+ '<h4><i class="fa fa-bars"></i>Investigation</h4></div><div style="margin-top: 3px;" class="col-sm-12-1">'
			+ '<table class="table table-condensed"><thead><tr>'
			+ '<th class="col-md-1-1"><div class="TextFont">#</div></th><th class="col-md-7-1"><div class="TextFont">Particulars</div></th>'
			+ '<th class="col-md-1-1"><div class="TextFont">Date</div></th>'
			+ '<th class="col-md-2-1"><div class="TextFont">Report</div></th></tr></thead></table>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="coverSheetInvestDashBoard">'
			+ '</tbody></table></div></div></div></div>'

			+ '<div class="col-md-4-1">'
			+ ' <div style="margin: 0px;" class="box border default col-sm-12-1">'
			+ '<div style="margin-top: 0px; background-color: #d9534f;" class="box-title col-sm-12-1"><h4>'
			+ '<i class="fa fa-bars"></i>Alerts &amp; Allergies</h4></div>'
			+ '<div style="margin-top: 3px;" class="col-sm-12-1"><table class="table table-condensed"><thead><tr>'
			+ '<th class="col-md-1-1"><div class="TextFont">#</div></th><th class="col-md-8-1"><div class="TextFont">Particulars</div></th>'
			+ '<th class="col-md-2-1"><div class="TextFont">Date</div></th>'
			+ '</tr></thead></table></div>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="allergyAlertsCoverSheetTemp"></tbody>'
			+ '</table></div></div></div>'

			+ '<div class="col-md-4-1"><div style="margin: 0px;" class="box border default col-sm-12-1">'
			+ '<div style="margin-top: 0px;" class="box-title col-sm-12-1">'
			+ '<h4><i class="fa fa-bars"></i>Medication</h4></div>'
			+ '<div style="margin-top: 3px;" class="col-sm-12-1"><table class="table table-condensed">'
			+ '<thead><tr>'
			+ '<th class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ '<th class="col-md-4-1"><div class="TextFont">Drugs</div></th>'
			+ '<th class="col-md-1-1 center"><div class="TextFont">Frequency</div></th>'
			+ '<th class="col-md-1-1 center"><div class="TextFont">Duration</div></th>'
			+ '<th style="padding-right: 20px;" class="col-md-1-1 center"><div class="TextFont">Status</div>'
			+ '</th></tr></thead></table></div>'
			+ '<div style="overflow-y: scroll; height: 150px; max-height: auto; margin-top: -20px;" class="col-md-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="prescriptionCoverSheetContent"></tbody>'
			+ '</table></div></div></div></div>'

			+ '<div id="vitalEditDia" style="diplay: none; width: 100%; overflow-x: scroll;" title="All Vitals">'
			+ '<table style="width: 100%" class="table table-condensed table-bordered table-stripped">'
			+ '<tbody id="vitalsVIEWALLDATE"></tbody></table></div>'
			+ '<div id="vitalNewDia" style="diplay: none; width: 70%" title="Vitals">'
			+ '<table style="width: 100%" id="vitalNewDiaTableUI"></table></div>'
			+ '</div>'

	;

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
}

function temForAssment(id) {

	var temp = '<div style="margin-bottom: 9px;" class="col-sm-12-1" id="row1">'
			+ '<div style="margin-top: 10px; margin-left: 10px;" class="col-sm-2-1" id="col1">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Diagnosis</label>'
			+ '<div id="divdiagnosis"><input type="text" class="typeahead form-control input-SmallText" onkeypress="setDiagnosisAutocompleteNameDescpID(\'diagnosis\', \'onkeypress\');" id="diagnosis" name="diagnosis" placeholder="diagnosis">'
			+ '</div><input type="hidden" value="0" id="EditFlag"></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col2">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Diagnosis & Description</label>'
			+ '<div id="divdiagno_description"><input type="text" class="typeahead form-control input-SmallText" onkeypress="setDiagnosisAutocompleteNameDescpID(\'diagno_description\',\'onkeypress\');" name="diagno_description" placeholder="Diagnosis &amp; Description" id="diagno_description">'
			+ '</div></div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col3">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">ICD10 Code</label> '
			+ '<div id="divicd10_code"><input type="text" class="typeahead form-control input-SmallText" id="icd10_code" onkeypress="setDiagnosisAutocompleteNameDescpID(\'icd10_code\',\'onkeypress\');" name="icd10_code" placeholder="ICD 10 Code"><input type="hidden" value="0" id="EditFlag"></div></div>'
			+ '</div><div style="margin-top: 10px;" class="col-sm-1-1" id="col4">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Date</label>'
			+ '<input type="text" class="form-control input-SmallText" onclick="displayCalendar(document.getElementById(\'assesmentDate\'),\'dd/mm/yyyy\',this)" readonly="readonly" name="date" placeholder="Date" onchange="checkCurrentDate(\'DoctorStation\')" id="assesmentDate">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col5">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '	<label for="exampleInputEmail1" class="TextFont">DiagnosisType</label>'
			+ ' <select class="form-control input-SmallText" id="diagno_type" name="diagno_type"><option value="Provisional">Provisional</option>'
			+ '<option value="Confirmed">Confirmed</option></select></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col6"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Comments</label>'
			+ '<input type="text" class="form-control input-SmallText" id="comment" name="comment" placeholder="Comments">'
			+ '</div></div>'
			+ '<div id="col7" class="col-sm-2-1" style="margin-top: 10px; margin-left: 80px; margin-bottom: -40px; z-index: 1000;"> <label style="margin-bottom: 0px">Search By: </label> <div class=divide-5></div> <label> <input type="radio" name="ICD" value="ICD10" id="ICD10" checked="checked">ICD10 </label> <label> <input type="radio" name="ICD"value="ICD0" id="ICDO">ICDO<br></label></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col8">'
			+ '<div class="divide-10"></div><button id="saveeditassesment1" onclick="saveEditAssesmentOPD(\'IPD\');" class="btn btn-xs btn-success">Save</button>'
			+ '<div class="btn-group"><button data-target="#ICD10ButtonPopup" onclick=setAddICDCodeTemp("ICD10"),fetchICD10Level1("onload","ICD10"); style="margin-left: 40px; margin-top: 14px;" data-toggle="modal" class="btn btn-xs btn-info">Add Update ICD10</button>'
			+ '<button data-target="#ICD10ButtonPopup" onclick=setAddICDCodeTemp("ICD0"),fetchICD10Level1("onload","ICDO"); style="margin-left: 159px; margin-top: -22px;" data-toggle="modal" class="btn btn-xs btn-info">Add Update ICDO</button></div></div></div>'

			+ '</div></div><div style="margin-top: 9px;" class="col-sm-12-1" id="row2">'
			+ '<div class="col-md-12-1"><div class="col-sm-12-1">'
			+ '<h6 style="margin-left: 10px;">ProvisionalDiagnosis</h6></div>'
			+ '<div style="padding-top: 10px; padding-bottom: 0px" class="box-body col-md-12-1">'
			+ '<div class="form-group  box border col-md-12-1"><div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<label value="New" id="enableAsmntTextBoxesProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"> <i class="fa fa-plus"></i> New</label>'
			+ '<label value="Edit" id="editAssesmentProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" > <i class="fa fa-edit"></i> Edit</label>'
			+ '<label value="Delete" id="deleteAssessmentProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" > <i class="fa fa-trash-o"></i>Delete</label>'
			+ '<label id="confirmDiagnosisProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: -5px;" >'
			+ '<i class="fa-check-square-o"></i> Confirm Diagnosis</label></div>'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1"><table class="table table-bordered table-condensed header-fixed cf" style="width : 1090px; margin-top: 10px;">'
			+ '<thead><tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ '<th style="height: 21.5px; padding-left: 50px;" class="col-md-2-1"><div class="TextFont">Diagnosis</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosis Description</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">ICD 10 Code</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Diagnosis Type</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosed By</div></th>'
			+ '	<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Comment</div></th>'
			+ '<th style="height: 21.5px; padding-left: 30px;" class="center"><div class="TextFont"></div></th></tr></thead>'
			+ '</table><div style="overflow-y: scroll; height: 111px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">'
			+ '<table class="table table-bordered table-striped table-condensed cf">'
			+ '<tbody id="assesmentContentProvisional"></tbody></table>'
			+ '</div></div></div></div></div></div>'

			+ '<div class="col-sm-12-1" id="row3"><div class="col-md-12-1"><div class="col-sm-12-1">'
			+ '<h6 style="margin-left: 10px;">Confirmed Diagnosis</h6></div>'
			+ '<div style="padding-top: 10px; padding-bottom: 0px" class="box-body col-md-12-1">'
			+ '<div style="padding-top: 0px; margin-bottom: 10px;" class="form-group box border col-md-12-1">'
			+ '<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<label value="New" id="enableAsmntTextBoxesConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" > <i class="fa fa-plus"></i> New'
			+ '</label> <label value="Edit" id="editAssesmentConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" > <i class="fa fa-edit"></i> Edit'
			+ '</label> <label value="Delete" id="deleteAssessmentConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" > <i class="fa fa-trash-o"></i>Delete'
			+ '</label> <label id="provisionalDiagnosisConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: -5px;" > <i class="fa-check-square-o"></i> Provisional Diagnosis'
			+ '	</label> </div>'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1">'
			+ '<table class="table table-bordered table-condensed header-fixed cf" style="width : 1090px; margin-top: 10px;"><thead>'
			+ '<tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'

			+ '<th style="height: 21.5px; padding-left: 5px;" class="col-md-2-1 center"><div class="TextFont">Diagnosis</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosis Description</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">ICD 10 Code</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Diagnosis Type</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosed By</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Comment</div></th>'
			+ '<th style="height: 21.5px; padding-left: 30px;" class="center"><div class="TextFont"></div></th></tr></thead></table>'
			+ '<div style="overflow-y: scroll; height: 111px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">'
			+ '<table class="table table-bordered table-striped table-condensed cf"><tbody id="assesmentContentConfirmaed"></tbody>'
			+ '</table></div></div></div></div></div></div></div>';

	/* userAccess(); */

	$("#ipdDoctorStationJSPHeadDiv").html(temp);

}
function temForOrderform(id) {

	var temp = '<div class="tab-pane active" id="OrderForm">'
			+ '<div style="padding-left: 30px;" class="col-sm-12-1">'
			+ '<div style="margin-top: 6px;" class="col-sm-1-1"><label class="TextFont">Prescription</label></div>'
			+ '<div style="margin-top: 15px;" class="col-sm-3-1">'
			+ '<input type="text" readonly="readonly" onclick="displayCalendar(document.getElementById(\'OFdate-pick\'),\'dd/mm/yyyy\',this)" onchange="checkDate(),setDoctorPreRound(),featchOrderFormByDate()" name="date-pick" id="OFdate-pick" class="form-control input-SmallText col-sm-6-1">'
			+ '<div style="margin-top: 2px; margin-left: 5px;" class="col-sm-5-1"><label class="TextFont col-sm-6-1">Order ID : </label>'
			+ '<div class="col-sm-6-1" id="divOmID"></div></div>'
			+ '</div>'
			/*
			 * +'<div style="margin-top: 16px;" class="col-md-3-1">' +'<button
			 * data-target="#AddUpdatePrescriptionTemplatePopup"
			 * onclick=refreshDocPrescriptionTemplate();disableDocPrescriptionTemplate();refreshDocPrescriptionTemplateMedicine();fetchDocPrescriptionTemplateByID("0")
			 * data-toggle="modal" class="btn btn-xs btn-warning"
			 * style="line-height: 1.2; margin-top: -13px;">' +'Create and View
			 * Temp.</button>' +'<button
			 * data-target="#AddTreatmentPrescriptionToTemplatePopup"
			 * onclick=fetchDocPrescriptionTemplateByID("0") data-toggle="modal"
			 * class="btn btn-xs btn-success" style="line-height: 1.2;
			 * margin-top: -13px;">' +'Save Temp.</button></div>'
			 */
			+ '<div style="margin-top: 6px;" class="col-sm-2-1" id="divCopyOrderForm">'
			+ '<a style="color: inherit; background-color: transparent;" onmouseover="this.style.color=\'black\'" onmouseout="this.style.backgroundColor=\'transparent\'; this.style.color=\'inherit\'" onclick="copyCurrentOrderForm(0)" href="#">Copy 	Prescription To Current Date</a></div>'
			+ '<div class="col-md-2-1"><button class="btn btn-xs btn-warning" data-toggle="modal"  style="margin-top: 10px;margin-left: -13px;"'
			+ 'onclick="showUpdateOrderTemp();refreshDocOrderformTemplate();disableDocOrderformTemplate1();refreshDocOrderformTemplateMedicine();fetchDocOrderformTemplateByID(0);">'
			+ 'Create and View Temp.</button></div>'
			+ '<div style="margin-top: 10px; float: right; margin-right: 0px;" class="col-sm-4-1">'
			+ '<div class="col-md-4-1"> General Medicine: <input type="checkbox" style="cursor: pointer;" id="medicineNotAvailableCheckbox"></div>'
			+ '<button id="ipdPrintPrRound" onclick="printPrepDataIPDOPD()" data-placement="left" data-toggle="tooltip"'
			+ '	class="btn btn-xs btn-warning col-md-1-1" data-original-title="Print "><i class="fa fa-print"></i></button>'
			+ '<div class="col-md-5-1"><button style="line-height: 1.2;float: right;" onclick="saveOrderFormDetails(\'OrderForm\')" class="btn btn-xs btn-success editUserAccess">'
			+ '<i class="fa fa-save"></i> Save Prescription</button>'
			+ '</div></div></div>'
			+ '<div style="height: 70px; margin-top: 0px;" class="col-md-12-1">'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1" id="row1">'

			+ '<div style="margin-top: 10px; padding-left: 3px;" class="col-sm-1-1" id="col2">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Preparation<b style="color: red; padding-left: 2px;">*</b></label> '
			+ '<select onchange="fetchRouteTypeList(\'afterLoad\')" class="form-control input-SmallText" id="prep"></select></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col3"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">'
			+ 'Medicine Name <b style="color: red; padding-left: 2px;">*</b></label><div id="divTagname">'
			+ '<input type="text" onkeypress="setPrescriptionAutocompleteNameID(this.id, \'afterLoad\');" class="typeahead form-control input-SmallText" autocomplete="off" name="name" id="name" placeholder="Name"></div>'
			+ '<input type="hidden" value="0" id="medicineID"><input type="hidden" value="N" id="paediatricsMedicineFlag"><input type="hidden" value="" id="paediatricsMedicineCapacity"> </div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-1-1" id="col4"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Strength</label>'
			+ '<input type="text" class="form-control input-SmallText" id="strength" name="strength" placeholder="Strength"></div></div>'

			+ '<div style="margin-top: 10px;" class="col-sm-1-1" id="col5"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">DoseType</label> <input type="text" class="form-control input-SmallText" onkeypress="return validateNumberMinusSign(event)" id="dose" name="dose" placeholder="Dose">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col4A"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label class="TextFont">Unit</label> <select class="form-control input-SmallText" id="unit" name="unit"></select>'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col11"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">MO - AN - EV - NT </label>'
			+ '<div style=" margin-top: -5px; margin-left:2px" class="col-sm-12-1">'
			+ '<input type="checkbox" style="cursor: pointer;" onclick="setFrequency()" value="Morning" name="timeslot" id="mo">'
			+ '<input type="checkbox" style="cursor: pointer;" onclick="setFrequency()" value="Afternoon" name="timeslot" id="an">'
			+ '<input type="checkbox" style="cursor: pointer;" onclick="setFrequency()" value="Evening" name="timeslot" id="ev">'
			+ '<input type="checkbox" style="cursor: pointer;" onclick="setFrequency()" value="Night" name="timeslot" id="nt">'
			+ '</div></div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col6"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Frequency</label>'
			+ '<input type="text" readonly="readonly" class="form-control input-SmallText" onkeypress="return validateNumbers(event)" onkeyup="calculateQuantity()" id="frequency" name="frequency" placeholder="Frequency">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col7"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Instructions</label>'
			+ '<select class="form-control input-SmallText" id="instruction"></select></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-1-1" id="col8"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Route</label>'
			+ '<select class="form-control input-SmallText" id="route" name="route"><option value="0">SELECT</option></select>'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col9">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Days<b style="color: red; padding-left: 2px;">*</b></label> <input type="text" onkeypress="return validateNumbers(event)" onkeyup="calculateQuantity()" class="form-control input-SmallText" id="days" name="days" placeholder="Days">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col10">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Quantity<b style="color: red; padding-left: 2px;">*</b></label> <input type="text" onkeypress="return validateNumbers(event)" class="form-control input-SmallText" id="qty" name="qty" placeholder="Qty">'
			+ '</div></div></div>'
			+ '<div class="divide-10"></div><div class="divide-10"></div>'
			+ '<div style="height: 70px; margin-top: 0px;" class="col-md-12-1"><div style="margin-top: 0px;" class="col-sm-12-1" id="row1"><div style="margin-top: 10px; padding-left: 3px;" class="col-sm-1-1" id="col2">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div> </div></div><div style="margin-top: 10px;" class="col-sm-2-1" id="col3">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> </div>'
			+ '</div><div style="margin-top: 10px;" class="col-sm-1-1" id="col4"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div></div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col5">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> '
			+ '</div></div><div id="col4A" class="col-sm-1-1" style="margin-top: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> </div></div>'
			+ '<div style="margin-top: 30px;margin-left:-42px" class="col-sm-3-1" id="col11">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div style=" margin-top: -5px; margin-left:2px" class="col-sm-12-1">'
			+ '<input id="timeMorn" disabled="disabled" onclick="abcde();" placeholder="Morning " style="width:40px" type="text" class="form-control input-SmallText col-sm-1-1" readonly="readonly">'
			+ '<input type="text" style="width:25px" value="1" id="tmo"  onkeypress="return validateNumbers(event)" onkeyup="calculateQuantity()" class="form-control input-SmallText  col-sm-1-1" readonly="">'
			+ '<input id="timeAfter"  disabled="disabled" onclick="abcde();" placeholder="Afternoon" style="width:40px" type="text" class="form-control input-SmallText col-sm-1-1" readonly="readonly">'
			+ '<input type="text" style="width:25px" value="1" id="tan"  onkeypress="return validateNumbers(event)" onkeyup="calculateQuantity()" class="form-control input-SmallText  col-sm-1-1" readonly="">'
			+ '<input id="timeEven"  disabled="disabled" onclick="abcde();" placeholder="Evening" style="width:40px" type="text" class="form-control input-SmallText col-sm-1-1" readonly="readonly">'
			+ '<input type="text" style="width:25px" value="1" id="tev" onkeypress="return validateNumbers(event)" onkeyup="calculateQuantity()" class="form-control input-SmallText col-sm-1-1" readonly="">'
			+ '<input id="timeNight"  disabled="disabled" onclick="abcde();" placeholder="Night" style="width:40px" type="text" class="form-control input-SmallText col-sm-1-1" readonly="readonly">'
			+ '<input type="text" style="width:25px" value="1" id="tnt" class="form-control input-SmallText col-sm-1-1" readonly="">'
			+ '</div></div></div></div></div>'
			+ '</div>'
			+ '<div style="margin-top: 46px;" class="col-md-12-1"><div class="col-md-12-1">'
			+ '<div style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;" class="col-md-12-1">'
			+ '<label value="New" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" id="enableTextBoxesLabel" class="btn" onclick="enableTextBoxes()"> <i class="fa fa-plus"></i> New	</label>'
			+ '<label value="Edit" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" id="editOrderFormLabel" class="btn" onclick="editOrderForm()"> <i class="fa fa-edit"></i> Edit</label>'
			+ '<label value="Delete" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" id="deleteOrderFormLabel" class="btn" onclick="deleteOrderForm()"> <i class="fa fa-trash-o"></i>Delete'
			+ '</label></div><div style="margin-top: 0px;" class="col-sm-12-1"><table class="table table-condensed">'
			+ '<thead><tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ '	<th style="height: 21.5px;" class="col-md-2-1 center"><div class="TextFont">Drug</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-2-1 center"><div class="TextFont">Prep.</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-3-1 center"><div class="TextFont">Instructions</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-2-1 center"><div class="TextFont">Duration</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont"></div></th>'
			+ '</tr></thead></table><div style="overflow-y: scroll; height: 290px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="orderFormContent"></tbody></table></div>'
			+ '<input type="hidden" value="insert" id="OFqueryType"><input type="hidden" value="0" id="OFSlaveID">'
			+ '</div></div></div></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);

	/*
	 * +'<div class="modal fade in" id="PrepPopup">' +'<div
	 * style="margin-left: 300px; margin-top: 150px;" class="modal-dialog
	 * col-md-8-1">' +'<div class="modal-content"><div style="border: 1px
	 * solid black;" class="modal-body">' +'<div class="col-md-12-1"><button
	 * type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button></div>' +'<div
	 * class="divide-10"></div><div class="col-md-12-1" id="popupRow1">' +'<div
	 * class="form-group Remove-Padding col-sm-2-1">' +'<div class="divide-10"></div>' +'<label
	 * class="TextFont"> Prep. </label> <input type="text" class="form-control"
	 * placeholder="Prep.">' +'</div><div class="form-group Remove-Padding
	 * col-sm-2-1"><div class="divide-10"></div>' +'<label class="TextFont">
	 * Name </label> <input type="text" class="form-control" placeholder="Name"></div>' +'<div
	 * class="form-group Remove-Padding col-sm-2-1"><div class="divide-10"></div>' +'<label
	 * class="TextFont"> Strength </label> <input type="text"
	 * class="form-control" placeholder="Strength">' +'</div><div
	 * class="form-group Remove-Padding col-sm-2-1"><div class="divide-10"></div>' +'<label
	 * class="TextFont"> Product Code </label> <input type="text"
	 * class="form-control" placeholder="Product Code">' +'</div><div
	 * class="form-group Remove-Padding col-sm-2-1"><div class="divide-40"></div>' +'<label
	 * style="padding-left: 45px; padding-top: 5px;" class="TextFont">Fetch from
	 * Stock </label></div>' +'<div class="form-group Remove-Padding"><div
	 * class="divide-40"></div>' +'<div data-off="danger" data-on="warning"
	 * class="make-switch switch-mini">' +'<input type="checkbox"></div></div></div>
	 * <div style="margin-top: 15px;" class="col-md-12-1" id="popupRow2">' +'<div
	 * class="form-group Remove-Padding col-sm-3-1"><div class="divide-10"></div>' +'<label
	 * class="TextFont"> Generic Name </label> <input type="text"
	 * class="form-control" placeholder="Generic Name">' +'</div><div
	 * class="form-group Remove-Padding col-sm-2-1"><div class="col-md-8-1">' +'<label
	 * style="margin-top: 19px;" class="TextFont">Search By </label></div>' +'<div
	 * style="padding-top: 5px;" class="col-md-9-1"><input type="radio">
	 * <label> ProductName </label></div>' +'<div class="col-md-0-1"><input
	 * type="radio"> <label> Generic Name </label> </div></div>' +'<div
	 * style="padding-top: 45px;" class="form-group col-md-2-1">' +'<button
	 * class="btn btn-primary col-md-9-1" type="submit">search</button></div></div>' +'<div
	 * class="col-md-12-1" id="popupRow3"><div style="margin-top: 7px;
	 * margin-left: 0px;" class="col-md-12-1">' +'<div style="height: 230px;"
	 * class="col-sm-6-1"><div style="margin-top: 0px;" class="col-sm-12-1"><h6 style="margin-left: 5px;">Search
	 * Results</h6></div>' +'<table style="border-top: 1px solid orange;
	 * border-right: 1px solid orange;" class="table table-condensed">' +'<thead>
	 * <tr><th class="col-md-1-1"><div class="TextFont">#</div></th>' +'<th class="col-md-2-1"><div
	 * class="TextFont">Prep.</div></th>' +'<th class="col-md-2-1"><div
	 * class="TextFont">Drug</div></th>' +'<th class="col-md-3-1"><div
	 * class="TextFont">Generic Name</div></th>' +'<th class="col-md-3-1"><div
	 * class="TextFont">Available Qty</div></th>' +'<th class="col-md-1-1"><div
	 * class="TextFont">Use</div></th></tr></thead></table>' +'<div
	 * style="border-top: 1px solid black; border-right: 1px solid orange;
	 * height: 170px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1"
	 * id="flip-scroll">' +'<table class="table table-condensed"><tbody><tr><td class="col-md-1-1">kbdfb</td><td class="col-md-2-1">dfbdg</td>' +'<td class="col-md-2-1">dfbdg</td><td class="col-md-3-1">kbdfb</td><td class="col-md-3-1">dfbdg</td>
	 * <td class="col-md-1-1 fa fa-plus-square"></td> </tr> <tr>
	 * <td class="col-md-1-1">kbdfb</td> <td class="col-md-3-1">dfbdg</td>
	 * <td class="col-md-3-1">dfbdg</td> <td class="col-md-3-1">kbdfb</td>
	 * <td class="col-md-1-1">dfbdg</td>
	 * <td class="col-md-1-1 fa fa-plus-square"></td> </tr> </tbody> </table>
	 * </div> </div> <div style="height: 230px; margin-top: 0px;"
	 * class="col-sm-6-1"> <div class="col-sm-12-1">
	 * <h6 style="margin-left: 5px;">Alternatives Available</h6> </div> <table
	 * style="border-top: 1px solid orange;" class="table table-condensed">
	 * <thead> <tr> <th class="col-md-1-1"><div class="TextFont">#</div></th>
	 * <th class="col-md-2-1"><div class="TextFont">Prep.</div></th>
	 * <th class="col-md-2-1"><div class="TextFont">Drug</div></th>
	 * <th class="col-md-3-1"><div class="TextFont">Generic Name</div></th>
	 * <th class="col-md-3-1"><div class="TextFont">Available Qty</div></th>
	 * <th class="col-md-1-1"><div class="TextFont">Use</div></th> </tr>
	 * </thead> </table> <div style="height: 170px; border-top: 1px solid black;
	 * maxheight: auto; margin-top: -21px;" class="col-sm-12-1"
	 * id="flip-scroll"> <table class="table table-condensed"> <tbody> <tr>
	 * <td class="col-md-1-1">kbdfb</td> <td class="col-md-2-1">dfbdg</td>
	 * <td class="col-md-2-1">dfbdg</td> <td class="col-md-3-1">kbdfb</td>
	 * <td class="col-md-3-1">dfbdg</td>
	 * <td class="col-md-1-1 fa fa-plus-square"></td> </tr> <tr>
	 * <td class="col-md-1-1">kbdfb</td> <td class="col-md-3-1">dfbdg</td>
	 * <td class="col-md-3-1">dfbdg</td> <td class="col-md-3-1">kbdfb</td>
	 * <td class="col-md-1-1">dfbdg</td>
	 * <td class="col-md-1-1 fa fa-plus-square"></td> </tr> </tbody> </table>
	 * </div> </div> </div>
	 * 
	 * </div>
	 * 
	 * </div> </div> </div> </div>
	 */

}

function temForAdmmissionnote(id) {

	var temp = '<div ID="ADNOTE"  class="tab-pane in active" style="width: 96%; margin-left: 2%;">'
			+ '<div class="box border red"><div class="box-title"><h4><i class="fa fa-pencil-square"></i>Bootstrap Markdown Editor'
			+ '</h4><div class="tools hidden-xs"><a id="updateAdmissionNote" class="">'
			+ '<i class="fa fa-floppy-o" title="Save Note"></i> </a>	<a href="#box-config" data-toggle="modal" class="config">'
			+ '<i class="fa fa-cog"></i></a> <a href="javascript:;" class="reload"> <i class="fa fa-refresh"></i>'
			+ '</a> <a href="javascript:;" class="collapse"> <i class="fa fa-chevron-up"></i></a> <a href="javascript:;" class="remove">'
			+ '<i class="fa fa-times"></i></a></div></div>'
			+ '<div class="box-body"><form><textarea name="content" id="ipd_adnote" data-provide="markdown" rows="10"></textarea>'
			+ '<div class="divide-10"></div></form></div></div></div>'

	;

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	// CKEDITOR.instances['adNote'];
}

function temForuploaddoc(id) {

	var temp = '<div class="tab-pane active" id="Upload_Document">'
			+ '<form method="post" enctype="multipart/form-data" name="fileUploadfrm" id="fileUploadfrm" action="UploadDoctordeskServlet">'
			+ ' <input type="hidden" value="0" name="TRTiD" id="TRTiD">'
			+ '<input type="hidden" value="0" name="PiD" id="PiD">'
			+ '<div class="centered"><div class="divide-10"></div>'
			+ '<div style="height: 50px;" class="col-md-12-1"><label style="margin-top: 3px; padding-left: 5px;" class="col-md-2-1">Select a File to Upload: </label>'
			+ '<input type="file" style="margin-top: 0px; cursor: pointer;" id="ifile" multiple name="file"><br></div>'
			+ '<div class="divide-10"></div><div style="height: 50px;" class="col-md-12-1">'
			+ '<label style="margin-top: 3px; padding-left: 5px;" class="col-md-2-1">Comment: </label>'
			+ '<textarea maxlength="120" id="iNotes" name="txtNotes" style="width: 236px; height: 48px;" cols="60" rows="2" class="col-md-4-1"></textarea>'
			+ '</div><div class="divide-10"></div><div style="height: 50px;" class="col-md-4-1">'
			+ '<label style="margin-top: 3px; padding-left: 5px;" class="col-md-12-1"></label>'
			+ '<button style=" margin-top: 3px; margin-left: 80px" class="btn btn-xs btn-success editUserAccess"  id="ifileUp" name="fileUp" onclick="uploadDocument()" type="button">Upload Document</button>'
			+ '</div></div></form><br><div class="divide-10"></div>'
			+ '<div class="box-body col-md-12-1" style="padding-top: 10px; padding-bottom: 0px">'
			+ '<div class="form-group  box border col-md-12-1">'
			+ '<div class="col-md-12-1" style="margin-top: 0px;  padding-left: 3px;">'
			+ '	<div class="col-sm-12-1" style="margin-top: 0px;margin-top: 0px; height: 250px; overflow-y: scroll;" id="divdocDispTable">'
			+ '<table class="table table-bordered table-condensed header-fixed cf" style="width : 1090px; margin-top: 10px;">'
			+ '<thead><tr><th class="col-md-1-1 center" style="height: 21.5px;"><div class="TextFont">#</div></th>'
			+ '<th class="col-md-2-1" style="height: 21.5px; padding-left: 50px;"><div class="TextFont">Document</div></th>'
			+ '<th class="col-md-2-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Note</div></th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Date</div></th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">View / Delete</div></th>'
			+ '</tr></thead><tbody id="docDispTable"><tr><td colspan="5">No Record Found</td></tr></tbody>'
			+ '</table></div></div></div></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);

}

function temForINDENT(id) {

	var temp = '<div id="INDENT" class="tab-pane active">'
			+ '<form class="form-horizontal  col-md-12-1" method="get"><div class="form-group col-sm-1-1" style="margin-right: 2%;">'
			+ '<label for="exampleInputEmail1" class="TextFont">Doc No </label>'
			+ '<input type="text" class="form-control input-SmallText" required="true" name="first" id="first" placeholder="Doc No">'
			+ '</div><div class="form-group col-sm-1-1" style="margin-right: 2%;">'
			+ '<label for="exampleInputEmail1" class="TextFont">Doc Date </label>'
			+ '<input type="text" id="popup_container2" onclick="displayCalendar(document.getElementById(\'popup_container2\'),\'dd-mm-yyyy\',this)" readonly="readonly" name="dob" placeholder="Date" value="" class="form-control input-SmallText"> <input type="hidden" name="receivedFrom" value="doctorstation" id="receivedFrom">'
			+ '</div><div class="form-group col-sm-1-1" style="margin-right: 2%;">'
			+ '<label for="exampleInputEmail1" class="TextFont">Item Short Code</label> '
			+ '<input type="text" class="form-control input-SmallText" name="emailID" id="email" placeholder="Code"></div>'
			+ '<div class="form-group col-sm-1-1" style="margin-right: 2%; float: right;">'
			+ '<label for="exampleInputEmail1" class="TextFont">Fetch From Stock</label>'
			+ ' <input type="checkbox" class="form-control input-SmallText" name="stockSelection" id="stockSelection" onclick="loadIndentPopUp()">'
			+ '</div><div id="Po_Pop_Up" class="modal fade " style="display: none;" aria-hidden="true">'
			+ '<div class="modal-dialog" style="width: 1120px;"><div class="modal-content">'
			+ '<div class="modal-header"><div class="box-title"><h4>'
			+ '<i class="fa fa-calendar"></i>Indent Information</h4></div></div>'
			+ '<div class="modal-body"><div class="tab-pane fade active in" id="OrderForm1">'
			+ '<div style="padding-left: 30px;" class="col-sm-12-1"><div class="form-group col-sm-1-1" style="margin-right: 2%;">'
			+ '<label for="exampleInputEmail1" class="TextFont">MrnDate<b style="color: red;">*</b></label>'
			+ '<span style="position: relative;"><input  class="form-control input-SmallText" name="" id="txtMRNDate" placeholder="Date">'
			+ '<button type="button" onclick="featchOrderFormByDate(\'indent\')">GetData</button></div></div>'
			+ '<div style="padding-top: 10px;" class="col-md-12-1"><div class="col-md-12-1">'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1"><table class="table table-condensed">'
			+ '<thead><tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-2-1 center"><div class="TextFont">Drug</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-2-1 center"><div class="TextFont">Prep.</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-2-1 center"><div class="TextFont">Duration</div></th>'
			+ '<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Select</div></th></tr>'
			+ '</thead></table><div style="overflow-y: scroll; height: 290px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">'
			+ '<table class="table table-condensed"><tbody id="orderFormContent1"></tbody></table></div>'
			+ '<input type="hidden" value="insert" id="OFqueryType1"> <input type="hidden" value="0" id="OFSlaveID1"></div>'
			+ '</div></div></div></div><div class="modal-footer">'
			+ '<div class="form-group col-md-7-1" style="margin-top: 15px;">'
			+ '<button type="button" class="btn btn-primary" id="btnSubContractingMaterialIssueSave" name="btnSubContractingMaterialIssueSave" onclick="setIndentDetails()">Ok</button>'
			+ '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div>'
			+ '</div></div></div></div>'
			
			+ '<div id="prevIndentPopUp" class="modal fade in">'

			+ '<div class="modal-dialog" style="width: 1120px;"><div class="modal-content">'
			+ '<div class="modal-header"><div class=""><h4><i class="fa fa-calendar"></i>Indent Information</h4></div></div>'
			+ '<div class="modal-body"><div style="margin-top: 00px;" class="box border primary">'
			+ '<div class="box-title"><h4><i class="fa fa-table"></i>Generated Indent Information</h4>'
			+ '<div class="tools">'
			+ '<a class="config" data-toggle="modal" href="#box-config"> <i class="fa fa-cog"></i>'
			+ '</a> <a class="reload" href="javascript:;"> <i class="fa fa-refresh"></i>'
			+ '</a> <a class="collapse" href="javascript:;"> <i class="fa fa-chevron-up"></i>'
			+ '</a> <a class="remove" href="javascript:;"> <i class="fa fa-times"></i></a></div></div>'
			+ '<div class="box-body"><div class="col-md-12-1" style="margin-top: 10px;">'
			+ '<div class="col-md-4-1"><i class="fa fa-star"></i><b>Indent No -<span id="divIndentNo"></span>'
			+ '</b></div><b></b><div class="col-md-4-1"><b>'
			+ '<i class="fa fa-calendar"></i>Indent Date -</b> <span id="divIndentDate"></span></div>'
			+ '<div class="col-md-4-1"><i class="fa fa-home"></i>Generated From - <span id="divIndentGenerateFrom"></span>'
			+ '</div></div>'
			+ '<table class="table table-striped" style="margin-top: 40px;">'
			+ '<tr><th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;">'
			+ '<div>Product Name</div></th><th class="col-md-2 center" style="height: 21.5px;">'
			+ '<div>RequiredQty</div></th></tr></thead><tbody id="preIndentDataById">'
			+ '</tbody></table></div></div><div style="margin-top: 00px;" class="box border primary">'
			+ '<div class="box-title"><h4><i class="fa fa-table"></i>Received IndentInformation</h4>'
			+ '<div class="tools"><a class="config" data-toggle="modal" href="#box-config"> <i class="fa fa-cog"></i>'
			+ '</a> <a class="reload" href="javascript:;"> <i class="fa fa-refresh"></i>'
			+ '</a> <a class="collapse" href="javascript:;"> <i class="fa fa-chevron-up"></i>'
			+ '</a> <a class="remove" href="javascript:;"> <i class="fa fa-times"></i></a></div>'
			+ '</div><div class="box-body"><div class="col-md-12-1" style="margin-top: 10px;">'
			+ '<div class="col-md-4-1"><i class="fa fa-star"></i><b>Indent Sale No -<span id="divIndentSaleNo"></span>'
			+ '</b></div><b></b><div class="col-md-4-1"><b><i class="fa fa-calendar"></i>Indent Received Date</b>'
			+ '<span id="divIndentReceiveDate"></span></div></div>'
			+ '<table class="table table-striped" style="margin-top: 40px;">'
			+ '<thead style="background: white;" class="cf"><tr>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Product Name</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Batch Code</div></th>'

			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Batch Expiry</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Qty</div></th></tr>'
			+ '</thead><tbody id="preIndentSaleDataById"></tbody></table></div></div></div>'
			+ '<div class="modal-footer"><div class="form-group col-md-7-1" style="margin-top: 15px;">'
			+ '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div>'
			+ '</div></div>'
			
			
			//edit indent start
			+ '<div id="editIndentPopUp" class="modal fade in">'

			+ '<div class="modal-dialog" style="width: 1120px;"><div class="modal-content">'
			+'<div class="modal-header form-group">'
			+'<h3 class="col-md-6">Edit Indent Information</h3>'
			+'<div class="ml-auto col-md-6 text-right">'
			+'    <button type="button" onclick="saveIndentSlave();" class="btn btn-info">Save Indent</button>'
			+'</div>'
			+'</div>'

			
			+ '<div class="modal-body"><div style="margin-top: 00px;" class="box border primary">'
			+ '<div class="box-title"><h4><i class="fa fa-table"></i>Generated Indent Information</h4>'
			+ '<div class="tools">'
			+ '<a class="config" data-toggle="modal" href="#box-config"> <i class="fa fa-cog"></i>'
			+ '</a> <a class="reload" href="javascript:;"> <i class="fa fa-refresh"></i>'
			+ '</a> <a class="collapse" href="javascript:;"> <i class="fa fa-chevron-up"></i>'
			+ '</a> <a class="remove" href="javascript:;"> <i class="fa fa-times"></i></a></div></div>'
			+ '<div class="box-body"><div class="col-md-12-1" style="margin-top: 10px;">'
			+ '<div class="col-md-4-1"><i class="fa fa-star"></i><b>Indent No -<span id="editdivIndentNo"></span>'
			+ '</b></div><b></b><div class="col-md-4-1"><b>'
			+ '<i class="fa fa-calendar"></i>Indent Date -</b> <span id="editdivIndentDate"></span></div>'
			+ '<div class="col-md-4-1"><i class="fa fa-home"></i>Generated From - <span id="editdivIndentGenerateFrom"></span>'
			+ '</div></div>'
			+ '<table id="editpreIndentTable" class="table table-striped" style="margin-top: 40px;">'
			+ '<tr><th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;">'
			+ '<div>Product Name</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>RequiredQty</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Total QTY</div></th>'
			+ '</tr></thead><tbody id="editpreIndentDataById">'
			+ '</tbody></table></div></div>'
			
			/*+' <div style="margin-top: 00px;" class="box border primary">'
			+ '<div class="box-title"><h4><i class="fa fa-table"></i>Received IndentInformation</h4>'
			+ '<div class="tools"><a class="config" data-toggle="modal" href="#box-config"> <i class="fa fa-cog"></i>'
			+ '</a> <a class="reload" href="javascript:;"> <i class="fa fa-refresh"></i>'
			+ '</a> <a class="collapse" href="javascript:;"> <i class="fa fa-chevron-up"></i>'
			+ '</a> <a class="remove" href="javascript:;"> <i class="fa fa-times"></i></a></div>'
			+ '</div><div class="box-body"><div class="col-md-12-1" style="margin-top: 10px;">'
			+ '<div class="col-md-4-1"><i class="fa fa-star"></i><b>Indent Sale No -<span id="divIndentSaleNo"></span>'
			+ '</b></div><b></b><div class="col-md-4-1"><b><i class="fa fa-calendar"></i>Indent Received Date</b>'
			+ '<span id="divIndentReceiveDate"></span></div></div>'
			+ '<table class="table table-striped" style="margin-top: 40px;">'
			+ '<thead style="background: white;" class="cf"><tr>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Product Name</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Batch Code</div></th>'

			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Batch Expiry</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Qty</div></th></tr>'
			+ '</thead><tbody id="editpreIndentSaleDataById"></tbody></table>
			+ '</div></div>'*/
			+ '</div><div class="modal-footer"><div class="form-group col-md-7-1" style="margin-top: 15px;">'
			+ '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div>'
			+ '</div></div>'
			
			//edit indent end
			
			+ '<div style="margin-top: 0px; margin-left: 2px;" class="col-md-12-1">'

			+ '<div class="box border col-md-12-1"><div class="tabbable col-md-12-1"><ul class="nav nav-tabs">'
			+ '<li class="active" ><a data-toggle="tab" href="#ItemInfo"><i class="fa fa-user"></i> <span class="hidden-inline-mobile">New Indent</span></a></li>'
			+ '<li class=""><a data-toggle="tab" href="#prevIndent"><i class="fa fa-user"></i> <span class="hidden-inline-mobile" onclick="previousIndentByTreatmentId()">Prev '
			+ 'Indent</span></a></li><li class=""><a data-toggle="tab" href="#divIndentMaster" style="display:none"><i class="fa fa-user"></i>'
			+ '<span class="hidden-inline-mobile" onclick="">Indent Master</span></a></li>'
			+ '<li class=""><a data-toggle="tab" href="#divCancelIndentMaster"><i class="fa fa-user"></i> <span class="hidden-inline-mobile" onclick="cancelIndentByTreatmentId()">Cancel '
			+ 'Indent </span></a></li></ul>'
			+ '<div class="divide-10"></div><div class="divide-10"></div>'
			+ '<div class="tab-content col-md-12-1">	<div id="ItemInfo" class="tab-pane fade in active " style="overflow-x: auto;">'
			+ '<div class="panel-body col-md-12-1"><div style="padding-left: 12px;" class="col-sm-12-1">'
			+ '<div style="height: 85%; margin-left: 2%;"><div style="width: 95%; font-weight: bold; height: 200Px; overflow-y: scroll; border: 1px solid #436a9d;">'
			+ '<div class="col-md-12-1" style="margin-top: 15px;margin-left:0%;margin-bottom: 15px;">'
			+ '<div class="col-md-3-1">Select Indent Template</div>'
			+ '<div class="col-md-9-1" id="selectIndentTemplateDiv"><select name="selectIndentTemplate" id="selectIndentTemplate" onchange="setIndentRows()"><option>select</option></select></div>'
			+ '</div><button id="addNewIndent" onclick="toCreateManualIndent()" class="btn btn-xs btn-success" type="button">AddNew</button>'
			+ '<button value="_" class="btn btn-xs btn-danger" style="margin: 7px;" onclick="toRemoveRow()" type="button">-</button>'
			+ '<table cellspacing="0" cellpadding="0" border="1" id="ItemInfoTable" class="table table-bordered table-striped table-condensed" style="margin-top:1%">'
			+ '<thead><tr><th class="col-md-1 center">select</th><th class="col-md-1 ">#</th>'
			+ '<th class="col-md-4 center">Product Name</th>'
			+ '<th class="col-md-2 center">Required Quantity</th>'
			+ '<th class="col-md-2 center">Total Quantity</th></tr></thead>'
			+ '<tbody id="ItemInfoList" style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">'
			+ '</tbody></table></div></div></div><div class="form-group col-sm-2-1" style="margin-left: 2%;">'
			+ '<label for="exampleInputEmail1" class="TextFont">Total Doc Qty </label><input type="text" class="form-control input-SmallText" name="totalDocQty" id="totalDocQty" placeholder="Total Doc Qty">'
			+ '</div><div class="form-group col-sm-2-1" style="margin-left: 2%;">'

			+ '<label for="exampleInputEmail1" class="TextFont">Select Store </label> <select id="pharmaStoreId" class="form-control input-SmallText"><option value="0">Main Store</option></select>'
			+ '</div><div class=" col-sm-2-1" style="margin-left: 2%; margin-top: 2%"><input type="button" id="generateIndent" onclick="savePharmacyIndent()" class="btn btn-xs btn-success editUserAccess" value="Generate Indent">'
			+ '</div></div></div><div id="prevIndent" class="tab-pane fade " style="overflow-x: auto;">'
			+ '<table style="margin-top: 10px; width: 100%;" id="preIndentDataTable" class="table table-striped table-bordered header-fixed cf ">'
			+ '<thead style="background: white;" class="cf">'
			+ '<tr><th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Indent Date</div></th>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>Status</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Store Name</div></th>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>Generated From</div></th>'
			
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>View</div></th>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>Edit</div></th>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>Print</div></th>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>Cancel</div></th>'
			+ '</tr></thead><tbody id="preIndentData"></tbody></table></div>'
			+ '<div id="divCancelIndentMaster" class="tab-pane fade " style="overflow-x: auto;">'
			+ '<table style="margin-top: 10px; width: 100%;" class="table table-striped table-bordered header-fixed cf ">'
			+ '<thead style="background: white;" class="cf"><tr>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Indent Date</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Status</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Generated From</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Store Name</div></th>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>View</div></th></tr></thead>'
			+ '<tbody id="cancelIndentData"></tbody></table></div>'
			+ '<div class="col-md-12" style="margin-top: 2%; display: none;" id="indentMasterListDiv">'
			+ '<table cellspacing="0" cellpadding="0" border="1" class="table table-bordered table-striped table-condensed">'
			+ '<thead>'
			+ '<tr><th class="col-md-2-2 center">select</th><th class="col-md-2-2 center">#</th>'
			+ '<th class="col-md-2-2 center">Template Name</th><th class="col-md-1 center">Description</th>'
			+ '<th class="col-md-2-2 center">Edit</th><th class="col-md-2-2 center">Delete</th><th class="col-md-2-2 center">View</th>'
			+ '</tr></thead><tbody style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;" id="indetTemplateList">'
			+ '</tbody></table></div></div></div></div>'
			+ '</div></form></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
}
/*
 * function temForCpoe(id){
 * 
 * var temp= '<div id="row_1" class=" box border blue col-md-12 "
 * style="padding-top: 1%;padding-left:2%;margin-top:2%">' +'<div
 * id="divstrValue" class="col-sm-4" style="padding-top: 28px;">' +' <input
 * class="typeahead form-control " type="text" id="byName"
 * placeholder="universal search" onkeyup="setallservautocomplete(this.id);"
 * style="border: 1px solid orange;"/></div>' +'<div class="col-sm-8"
 * style="padding-top:12px;padding-left: 3%;">' +'<div class="col-sm-3"
 * style="padding-top: 15px;"><label class="TextFont">Select Reference</label></div>' + '<div
 * class="col-sm-4"><div class="form-group Remove-Padding col-sm-12"><label
 * class="TextFont">Doctor</label>' +'<select id="doctor" name="doctor"
 * class="form-control input-SmallText"></select></div></div>' + '<div
 * class="col-sm-4"> <div class="form-group Remove-Padding col-sm-12"><label
 * class="TextFont">Hospital</label> ' + '<select id="hospital"
 * name="hospital" class="form-control input-SmallText"></select></div></div></div></div>' + '<div
 * id="Pathology_row2" class="col-md-10" style="padding-top: 10px;">' + '<div
 * class="form-group Remove-Padding col-sm-3">' + '<div class="divide-10"></div>' + '<label
 * class="TextFont"> Service Name </label>' + '<select id="heading"
 * name="heading" onchange="" class="form-control input-SmallText"
 * style="margin-left: 0%;" disabled="disabled"></select></div>' + '<div
 * class="form-group Remove-Padding col-sm-3">' + '<div class="divide-10"></div>' + '<label
 * class="TextFont"> Service category </label> <input type="text"
 * placeholder="Service category" id="pathologyTest_Code" class="form-control
 * input-SmallText" readonly="readonly" />' + '</div>' + '<div
 * class="form-group Remove-Padding col-sm-3">' + '<div class="divide-10"></div>' + '<label
 * class="TextFont">Sub Service </label> <input type="text" placeholder="Sub
 * Service" id="pathologyTest_Code" class="form-control input-SmallText"
 * readonly="readonly" />' + '</div>' + '<div style="margin-top: 30px;"
 * class="col-sm-0-1" id="col11"><i><input type="button" value="Save"
 * onclick="" class="btn btn-xs btn-success"> </i></div>' +'</div>' + '<div
 * class="divide-20"></div>' +'<div style="margin-top: 20%;">' + '<div
 * class="box border primary"><div class="box-title"><h4><i class="fa
 * fa-file-text-o"></i>Result</h4>' +'<label onclick="editCPOE_Test()"
 * style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left:
 * 20px; margin-bottom: 0px;">' +' <i class="fa fa-edit"></i> Edit</label>
 * <label onclick="deleteCPOE_Test()" style="cursor: pointer; padding-top: 0px;
 * margin-right: 20px; margin-left: 20px; margin-bottom: 0px;">' +'<i class="fa
 * fa-trash-o"></i> Delete </label>' + '</div><div class="box-body"
 * style="height: 200px;overflow: auto;">' + '<table cellspacing="0"
 * cellpadding="0" border="0" class="datatable table table-striped
 * table-bordered table-hover"><thead><tr><th class="col-md-1 center" style="height: 21.5px;"><div
 * class="TextFont">#</div></th>'
 *  + '<th class="col-md-1 center" >Particulars/Details</th>' + '<th class="col-md-1 center" >Date</th>' + '<th class="col-md-1 center" >Consultant
 * Name</th>' +' <th class="col-md-1 center" >Type</th>' + '<th class="col-md-1 center"	>Test</th>' + '<th class="col-md-1 center" >Status</th>' + '<th class="col-md-1 center" >Action</th>' + '</tr></thead></table>' + '<table
 * class="table table-striped table-condensed"><tbody id="testDash"></tbody></table><input
 * type="hidden" id="CPOErowCount" value="0" />' +'</div></div></div>' ;
 * $("#divEhatContent").html(temp); }
 */

/*
 * function setallservautocomplete(inputID) {
 * 
 * var resultData = []; var findingName = $("#" + inputID).val(); var auto =
 * 'allservices'; var inputs = []; inputs.push('auto=' + auto);
 * inputs.push('findingName=' + findingName); var str = inputs.join('&');
 * jQuery.ajax({ async : true, type : "POST", data : str + "&reqType=AJAX", url :
 * "ehat/autoallservicestest/getallservices",
 * 
 * success : function(r) { alert(r); console.log(r);
 * alert(r.lstService[0].categoryName); if(r.lstService.length > 0){
 * autoCompDoctorDesk(r,inputID); for ( var i = 0; i <
 * response.lstSubService.length; i++) {
 * 
 * $("#" + inputID).val(); }
 *  } } }); }
 *//***************************************************************************
	 * @author : paras suryawanshi
	 * @date : 18-May-2017
	 * @code :autosuggestion
	 **************************************************************************/
/*
 * function autoCompDoctorDesk(response,id) {
 * 
 * var qty = id.slice(0, -1); // for dyamic col getting id //alert("hi"); var
 * myArray = response;// parsing response in JSON format //alert(myArray);
 * //alert("b"); $ .widget( 'custom.mcautocomplete', $.ui.autocomplete, {
 * _create : function() { this._super(); this.widget().menu("option", "items", ">
 * :not(.ui-widget-header)"); }, _renderMenu : function(ul, items) { var self =
 * this, thead; if (this.options.showHeader) { table = $('<div
 * class="ui-widget-header" style="width:100%"></div>'); $ .each(
 * this.options.columns, function(index, item) { table .append('<span
 * style="padding:0 4px;float:left;width:' + item.width + ';">' + item.name + '</span>');
 * }); table .append('<div style="clear: both;"></div>'); ul.append(table); }
 * $.each(items, function(index, item) { self._renderItem(ul, item); }); },
 * _renderItem : function(ul, item) { var t = '', result = ''; $ .each(
 * this.options.columns, function(index, column) { t += '<span style="padding:0
 * 4px;float:left;width:' + column.width + ';">' + item[column.valueField ?
 * column.valueField : index] + '</span>'; }); result = $('<li></li>')
 * .data('ui-autocomplete-item', item) .append( '<a class="mcacAnchor">' + t + '<div
 * style="clear: both;"></div></a>') .appendTo(ul); return result; } }); //
 * Sets up the multicolumn autocomplete widget. $("#" + id).mcautocomplete( { //
 * These next two options are what this plugin adds to the // autocomplete
 * widget. showHeader : true, columns : [ { name : 'chargesId', width : '100px',
 * valueField : 'chargesId' }, { name : 'categoryName', width : '90px',
 * valueField : 'categoryName' }, { name : 'doctypeId', // width : '90px',
 * valueField : 'doctypeId' }], // Event handler for when a list item is
 * selected. select : function(event, ui) { console.log(ui); // this.value =
 * (ui.item ? ui.item.dn : ''); // this.value = (ui.item.spl = 'undefined' ? '' : //
 * ui.item.dn); var spl = (ui.item.spl = "" ? '' : ui.item.spl); if (ui.item.dn !=
 * 'No' && ui.item.spl != 'Record' && ui.item.specialisationName != 'Found' &&
 * ui.item.depNm != 'Match') { // $('#results').text(ui.item ? 'Selected: ' +
 * ui.item.dn + ', '+ spl + ', '+ ui.item.specialisationName + ', ' +
 * ui.item.depNm: 'Nothing selected, input was ' + this.value); //$('#' +
 * id).val(ui.item.dn);ipdWithoutHeader //$('#userDocId').val(ui.item.ui);
 * //$('#selectedObj').html(JSON.stringify(ui.item));
 * alert(ui.item.categoryName); $('#byName').val(ui.item.categoryName); }
 * 
 * setallservautocomplete(id); return false; }, // The rest of the options are
 * for configuring the ajax // webservice call. minLength : 1, source :
 * function(request, response) { var data = myArray; console.log(data);
 * console.log(data.lstSubService.length); var result; if (!data ||
 * data.lstSubService.length === 0 || !data.lstSubService ||
 * data.lstSubService.length === 0) {
 * 
 * result = [{ label: 'No match found.' }];
 * 
 * result = [ { 'dn' : 'No', 'categoryName' : 'Record', 'categoryName' :
 * 'Found', 'depNm' : 'Match' } ]; } else { result = data.lstSubService;//
 * Response List for All // Services } response(result);
 * $('#ui-id-1').css("z-index", "10000000000"); } }); }
 * 
 */

function fetchpato() {
	var deptId = $("#deptId").val();
	var tID = $("#tr_Id").val();
	// var servid = 11;
	var callform = "coversheet";
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/fetchlabbilldetails",
		data : {
			"tID" : tID,
			"callform" : callform,
			"deptId" : deptId,
		// "servid" :servid

		},
		// timeout : 1000 * 60 * 5,
		cache : true,

		success : function(response) {
			/* coverSheetLabDashBoard */
			/*
			 * testRwcnt = 1; $("#coverSheetLabDashBoard").setTemplate(
			 * coverSheetLabDashBoardVar);
			 * $("#coverSheetLabDashBoard").processTemplate(response);
			 */

			setlab(response);
		}

	});

}

// Modify by Laxman on 13-Feb-2018.
function setlab(response) {
	// alert("--->>>>"+JSON.stringify(response));
	var htm = "";
	var index = 1;
	var count = 1;
	$("#labBtnFlg").val("N");
	$("#labbut").prop('disabled', true);
	$("#labcmpbut").prop('disabled', true);
	for ( var i = 0; i < response.cpoeServdetails.length; i++) {
		// alert("--->>>>"+response.cpoeServdetails[i].inserted_date_time);
		var dateTime = new Date(response.cpoeServdetails[i].inserted_date_time)
				.toLocaleString();
		var date = dateTime.split(",")[0];
		var time = dateTime.split(",")[1];
		if (response.listLabRequest[i].postedResultFlag == "Y") {
			$("#labBtnFlg").val("Y");
			$("#labbut").prop('disabled', false);
			$("#labcmpbut").prop('disabled', false);
			var testmasterId = response.listLabRequest[i].labRequestId;
			var postDate = response.listLabRequest[i].postedDatetime;
			var labReqSlvId = response.listLabRequestSlave[i].labReqSlvId;
			// Profile Id.
			var subSerId = response.cpoeServdetails[i].categoryid;
			var isPackageFlag = "";
			isPackageFlag = response.listLabRequestSlave[i].isPackageFlag;
			htm = htm + "<tr id='labNmRow" + count
					+ "' class='btn-success' onClick='setLabTestId1(" + count
					+ "," + postDate + ")' ondblClick='setLabTestId(" + count
					+ "," + postDate + ")'>"
					+ "<td class='col-md-1-1 TextFont'>" + index + "</td>"
					+ "<td class='col-md-4-1 TextFont'  >"
					+ response.cpoeServdetails[i].categoryName + "</td>"
					+ "<td class='col-md-2-1 TextFont' >" + date + "</td>"
					+ "<td class='col-md-2-1 TextFont' >" + time + "</td>"
					// + "<td class='col-md-2-1 TextFont'></td>"
					+ "<input type='hidden' value='" + testmasterId
					+ "' id='labReqMstId" + (count) + "' />"
					+ "<input type='hidden' value='" + labReqSlvId
					+ "' id='labReqSlvId" + (count) + "' />"
					+ "<input type='hidden' value='" + postDate
					+ "' id='postDateId" + (count) + "' />"
					+ "<input type='hidden' value='" + subSerId
					+ "' id='subSerId" + (count) + "' />"
					+ "<input type='hidden' value='" + isPackageFlag
					+ "' id='isPackageFlag" + (count) + "' />" + "</tr>";
			count++;
			index++;
		} else {
			htm = htm + "<tr id='labNmRow" + count
					+ "' class=''><td class='col-md-1-1 TextFont'>" + index
					+ "</td>" + "<td class='col-md-4-1 TextFont'  >"
					+ response.cpoeServdetails[i].categoryName + "</td>"
					+ "<td class='col-md-2-1 TextFont' >" + date + "</td>"
					+ "<td class='col-md-2-1 TextFont' >" + time + "</td>"
					// + "<td class='col-md-2-1 TextFont'></td>"
					+ "</tr>";
			count++;
			index++;
		}

	}

	$("#coverSheetLabDashBoard").html(htm);

}

/*
 * var testRwcnt = 1; var coverSheetLabDashBoardVar = '{#foreach
 * $T.cpoeServdetails as cpoeservice}<tr>' + '<td class="col-md-1-1 center">{testRwcnt}.</td>' + '<td class="col-md-4-1 center">{$T.cpoeservice.categoryName}</td>' + '<td class="col-md-2-1 center">
 * {$T.cpoeservice.created_date_time}</td>' + '<td class="col-md-2-1 TextFont">45/5/46</td>' + '</tr>{testRwcnt++}{#/for}';
 * 
 */

function fetchinvestigation() {
	var tID = $("#tr_Id").val();
	var servid = 12;
	var callform = "coversheet";
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/fetchbilldetails",
		data : {
			"tID" : tID,
			"callform" : callform,
			"servid" : servid

		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(response) {
			/*
			 * testRwcntinv = 1; $("#coverSheetInvestDashBoard").setTemplate(
			 * coverSheetInvestDashBoardVar);
			 * $("#coverSheetInvestDashBoard").processTemplate(response);
			 */
			setinvestiDashboard(response);
		}

	});

}

function setinvestiDashboard(response) {

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.cpoeServdetails.length; i++) {
		htm = htm
				+ "<tr><<td class='col-md-1-1 TextFont'>"
				+ index
				+ "</td>"
				+ "<td class='col-md-4-1 TextFont'  >"
				+ response.cpoeServdetails[i].categoryName
				+ "</td>"
				+ "<td class='col-md-2-1 TextFont' >"
				+ response.cpoeServdetails[i].created_date_time
				+ "</td>"
				+ "<td class='col-md-2-1 TextFont' > "
				+ "<button id='xrayImg' class='b' title='View investigation image' onclick='displayXray("
				+ response.cpoeServdetails[i].billdetailsid
				+ ","
				+ response.cpoeServdetails[i].categoryid
				+ ")' type='button' style='margin-top: -4px;'><i class='fa fa-eye View'></i></button>"
				+ "<button id='risview' class='btn btn-xs btn-primary' data-target='#RisviewPopUp' data-toggle='modal' onclick='getTestRadilogyReports("
				+ response.cpoeServdetails[i].billdetailsid + ","
				+ response.cpoeServdetails[i].categoryid
				+ ")'><i class='fa fa-credit-card'></i></button>" + "</td>"
				+ "</tr>";
		index++;

	}

	$("#coverSheetInvestDashBoard").html(htm);

}
/*
 * var testRwcntinv = 1; var coverSheetInvestDashBoardVar = '{#foreach
 * $T.cpoeServdetails as cpoeservice}<tr>' + '<td class="col-md-1-1 TextFont">{testRwcntinv++}.</td>' + '<td class="col-md-4-1 TextFont">{$T.cpoeservice.categoryName}</td>' + '<td class="col-md-2-1 TextFont">{{$T.cpoeservice.created_date_time}</td>' + '<td class="col-md-2-1">' + '<button
 * class="btn btn-xs btn-success"><i class="fa fa-edit"></i></button> ' + '
 * <button class="btn btn-xs btn-primary"><i class="fa fa-credit-card"></i></button>' + '</td></tr>{testRwcntinv++}{#/for}';
 */

function showADNOTE(callFrom) {
	if (callFrom == "ADNOTE2") {
		$("#ipdDoctorStationJSPHeadDiv").html('');
		$("#ADNOTE").show();
		FetchAdmissionNote();
	} else {
		// $("#ipdDoctorStationJSPHeadDiv").html('');
		$("#ADNOTE").hide();
	}
	if (callFrom == "subObj") {
		$("#ipdDoctorStationJSPHeadDiv").html('');
		$("#Sub_Obj").show();
	} else {
		// $("#ipdDoctorStationJSPHeadDiv").html('');
		$("#Sub_Obj").hide();
	}
	if (callFrom == "prescription") {

		$("#ipdDoctorStationJSPHeadDiv").html('');
		$("#Prescription").show();

	} else {

		// $("#ipdDoctorStationJSPHeadDiv").html('');
		$("#Prescription").hide();
	}
	if (callFrom == "instructiontab") {

		//$("#ipdDoctorStationJSPHeadDiv").html('');
		//$("#InstructionTab").show();
		
		$(".ehatList").removeClass("active");
		$("#instructiontab").addClass("active");
		$("#ipdDoctorStationJSPHeadDiv").html($("#InstructionTab").html());
	} else {

		// $("#ipdDoctorStationJSPHeadDiv").html('');
		$("#InstructionTab").hide();
	}
	if (callFrom == "diet") {
		$("#ipdDoctorStationJSPHeadDiv").html('');
		$("#diets").show();
		setDietTemplate();
	} else {
		// $("#ipdDoctorStationJSPHeadDiv").html('');
		$("#diets").hide();
	}
	if (callFrom == "Cover_History_Opd") {
		$("#ipdDoctorStationJSPHeadDiv").html('');
		$("#Cover_History_Opds").show();
		setCoverHistoryOpdTemp();
	} else {
		// $("#ipdDoctorStationJSPHeadDiv").html('');
		$("#Cover_History_Opds").hide();
		$('#coverHistoryDetailsOpd').empty();
	}		
	if (callFrom == "dialysisAdvice") {      
		$("#ipdDoctorStationJSPHeadDiv").html('');
		$("#DialysisAdvice").show();

	} else {
		// $("#ipdDoctorStationJSPHeadDiv").html('');
		$("#DialysisAdvice").hide();
	}
	
	if (callFrom == "Indent") {
		$(".ehatList").removeClass("active");
		$("#Indent").addClass("active");
		$("#ipdDoctorStationJSPHeadDiv").html($("#INDENT").html());
	} else {

		// $("#ipdDoctorStationJSPHeadDiv").html('');
		$("#InstructionTab").hide();
	}
	
}

// Disable function for previous treatment ...@uthor-Sagar
function previousTreatmentDisable() {

	var prevtre = $('#prevtr').val();
	if (prevtre == "previousPatient") {
		//fetchAdvice("previous");
		setTimeout(function() {
			$("#btnSaveClinicalStage").prop('disabled', true);
			$("#selCustomizeTemp").prop('disabled', true);
			$("#col11").prop('disabled', true);
			$("#5").prop("disabled", true);
			$("#InstructionTab *").prop('disabled', true);
			$("#printPrescriptionNewOpd").prop('disabled', false);
			$("#btnSaveUpdateVaccinationPatientTreatment").prop('disabled',
					true);
		}, 300);
		/*
		 * $("#ipdDoctorStationJSPHeadDiv").find('input, button,
		 * select').attr('disabled', 'disabled'); $("#ipdDoctorStationJSPHeadDiv
		 * *").prop('disabled',true);
		 * 
		 * $("#row1 *").prop('disabled',true);
		 * 
		 */
		$("#diagnosis").prop('disabled',true);
		//$("#").prop('disabled',true);
		$("#diagno_description").prop('disabled',true);
		$("#icd10_code").prop('disabled',true);
		$("#diagno_type").prop('disabled',true);
		$("#comment").prop('disabled',true);
		
		
		
		
		$("#iConsDoc").prop('disabled', true);
		$("#iConsSpec").prop('disabled', true);
		$("#iConsDept").prop('disabled', true);
		$("#iSaveConsultationDoctor").button({disabled : true});
		
		$("#btnSaveClinicalStage").prop('disabled', true);
		$("#selCustomizeTemp").prop('disabled', 'disabled');
		$("#col11").prop('disabled', true);
		$("#5").prop("disabled", true);
		$("#InstructionTab *").prop('disabled', true);
		$("#printPrescriptionNewOpd").prop('disabled', false);
		$("#btnSaveUpdateVaccinationPatientTreatment").prop('disabled',
				true);
		$('#Sub_Obj').find('input, button, select')
				.attr('disabled', 'disabled');// to disable all fields of reg
		// page
		$('#cpoe').find('input, button, select').attr('disabled', 'disabled');// to
		// disable
		// all
		// fields
		// of
		// reg
		// page
		// $('#Investigation').find('input, button, select').attr('disabled',
		// 'disabled');//to disable all fields of reg page
		// $('#viewBMI').find('button').removeAttr("disabled");//to remove
		// disable attributes
		$("#viewBMI").button({
			disabled : false
		});
		$("#saveAdvice").button({
			disabled : true
		});
		$('#CPOE').find('input, button, select').attr('disabled', 'disabled');
		$('#Clinical').find('input, button, select').attr('disabled',
				'disabled');
		$("#closemodal").button({
			disabled : false
		});
		$("#GrowthChartButton").button({
			disabled : false
		});
		$("#ImmunizationButton").button({
			disabled : false
		});
		$("#closegrowthchart").button({
			disabled : false
		});
		$("#closeVaccin").button({
			disabled : false
		});

		$("#HEIGHT_WEIGHT_HEADCIM").find('input, button, select').removeAttr(
				"disabled");
		$("#HEIGHT_WEIGHT_BMI_GreaterThanFiveYears").find(
				'input, button, select').removeAttr("disabled");

		$('#VaccinationChart').find('input, button, select').removeAttr(
				"disabled"); // to disable all fields of reg page
		$("#VaccinationChartSave").find('input, button, select').attr(
				'disabled', 'disabled');

		$("#AlertsAllergiesPopupButton").button({
			disabled : false
		});

		$("#AllergyAlertsCloseButton").button({
			disabled : false
		});

		$("#Sub_Obj *").prop('disabled', true);
		$("#cpoe *").prop('disabled', true);
		// $("#Investigation *").prop('disabled',true);
		$("#Upload_Document *").prop('disabled', true);
		// $("#ipdDoctorStationJSPHeadDiv *").prop('disabled',true);
		$("#Prescription *").prop('disabled', true);
		// $("#ipdDoctorStationJSPHeadDiv *").prop('disabled',true);
		$("#ICDCodeTempDiv *").prop('disabled', true); // for assessment
		$("#SurgeryAdvices *").prop('disabled', true);
		$("#flip-scroll *").prop('disabled', false); // for assessment

		// $("#VaccinationChartSave *").prop('disabled',true);
		$("#closegrtfive").button({
			disabled : false
		});
		$("#saveeditassesment1").button({
			disabled : true
		});
		$("#divdiagnosis").button({
			disabled : true
		});
		// $("input.chekbox1").prop("disabled", true);

		$("#saveeditassesment").button({
			disabled : true
		});

		$("#updateAdmissionNoteDiv *").hide();
		$("#saveeditassesment1").hide();
		$("#deleteAssessmentProvisionalLabel").hide();
		$("#confirmDiagnosisProvisionalLabel").hide();
		$("#deleteAssessmentConfirmLabel").hide();
		$("#provisionalDiagnosisConfirmLabel").hide();

		// $(".fa fa-floppy-o *").prop('disabled',true); //To disable
		// updateAdmissionNoteDiv
		$("#Alerts_Allergies *").prop('disabled', true); // for
		// Alerts_Allergies
		// pop up
		$("#ADNOTE").find('input, button, select').attr('disabled', 'disabled');
		$("#newVitals").hide();
		$("#GrowthChartButtonPopup *").prop('disabled', false); // for
		// assessment
		// $( "#adviceTempButton" ).button({disabled:true});

		$("#adviceTempButton").button({
			disabled : true
		});
		// $( "#xrayImg" ).button({disabled:false});
		// $( "#risview" ).button({disabled:false});
		$("#ifileUp *").prop('disabled', false);
		// $("#ipdDoctorStationJSPHeadDiv *").prop('disabled',true);
		// document.getElementById("ipdDoctorStationJSPHeadDiv").disabled =
		// true;

		$("#RisviewPopUp").find('button').removeAttr("disabled");
		$("#coverSheetInvestDashBoard").find('button').removeAttr("disabled");

		setTimeout(function() {
			$("#prescriptionContent *").prop('disabled', true);
		}, 100);

		if ($("#labBtnFlg").val() == "Y") {
			$("#labbut").prop('disabled', false);
			$("#labcmpbut").prop('disabled', false);
		}

		$("#ViewBMIDetailsPopup *").prop('disabled', true);
		$("#chiefComplaints *").prop('disabled', true);
		$(".coversheetBtn").button({
			disabled : false
		});
		$("#Table1PCTreatmentInstructionNameID *").prop('disabled', true);

		var depid = $("#depdocdeskid").val();
		if (depid == 1) {
			$("#divtempProvId").show();
			$("#divtempTreatId").show();
		}
		if (depid == 2) {
			$("#OrderForm *").prop('disabled', true);
			$("#OFdate-pick").removeAttr("disabled");
			//$("#INDENT *").prop('disabled', true);
			//$("#newIndent *").prop('disabled', true);
			$("#generateIndent").prop('disabled', true);
			$("#addNewIndent").prop('disabled', true);
			
			//$("#").prop('disabled',true);
			//$("#btnCancel2").prop('disabled',true);
			//$("td[=td]").attr('data-disabled', 'true');
			//$('#btnCancel2').prop("disabled", true);
			
			
			$('#iddrr').removeAttr("class");
			$("#iddrr").prop('disabled', true);
			$('#ipdPrintPrRound').removeAttr("disabled");
			$('#ipdPrintBtn').find('input, button, select').removeAttr(
					"disabled");
			$('#tempdissum').removeAttr("class");
			$("#tempdissum").css('display', 'none');
			$('#bed').removeAttr("class");
			$("#bed").css('display', 'none');
			$('#autodissum').removeAttr("class");
			$("#autodissum").css('display', 'none');
			$('#disinv').removeAttr("class");
			$("#disinv").css('display', 'none');
			$('#pharmacyConsumptionIndent').removeAttr("class");
			$("#pharmacyConsumptionIndent").css('display', 'none');
			$("#curPreOPDPrint").hide();
			$("#divtempProvId").show();
			$("#divtempTreatId").show();

		}

		var risingFlow = $("#risingFlow").val();

		if (risingFlow == "on") {
			$("#ibch1").text("History of Present Iilness");
		} else {
			$("#lbch1").text("Chief Complaints");
		}

	} else {
		// $("#ipdDoctorStationJSPHeadDiv *").prop('disabled',false);
		// $('#ipdDoctorStationJSPHeadDiv').find('input, button,
		// select').removeAttr("disabled");//to disable all fields of reg page

		// $("#row1 *").prop('disabled',false);
		$('#Sub_Obj').find('input, button, select').removeAttr("disabled");// to
		// disable
		// all
		// fields
		// of
		// reg
		// page
		$('#cpoe').find('input, button, select').removeAttr("disabled");// to
		// disable
		// all
		// fields
		// of
		// reg
		// page
		$('#Investigation').find('input, button, select')
				.removeAttr("disabled");// to disable all fields of reg page
		// $('#viewBMI').find('button').removeAttr("disabled");//to remove
		// disable attributes
		$("#viewBMI").button({
			disabled : false
		});
		$("#saveAdvice").button({
			disabled : false
		});

		$("#closemodal").button({
			disabled : false
		});
		$("#GrowthChartButton").button({
			disabled : false
		});
		$("#ImmunizationButton").button({
			disabled : false
		});
		$("#closegrowthchart").button({
			disabled : false
		});
		$("#closeVaccin").button({
			disabled : false
		});

		$("#HEIGHT_WEIGHT_HEADCIM").find('input, button, select').removeAttr(
				"disabled");
		$("#HEIGHT_WEIGHT_BMI_GreaterThanFiveYears").find(
				'input, button, select').removeAttr("disabled");

		$('#VaccinationChart').find('input, button, select').removeAttr(
				"disabled"); // to disable all fields of reg page
		$("#VaccinationChartSave").find('input, button, select').removeAttr(
				"disabled");

		$("#AlertsAllergiesPopupButton").button({
			disabled : false
		});

		$("#AllergyAlertsCloseButton").button({
			disabled : false
		});

		$("#Sub_Obj *").prop('disabled', false);
		$("#Upload_Document *").prop('disabled', false);
		// $("#ipdDoctorStationJSPHeadDiv *").prop('disabled',true);
		$("#Prescription *").prop('disabled', false);
		// $("#ipdDoctorStationJSPHeadDiv *").prop('disabled',true);
		$("#ICDCodeTempDiv *").prop('disabled', false); // for assessment
		$("#InstructionTab *").prop('disabled', false);
		$("#SurgeryAdvices *").prop('disabled', false);
		$("#flip-scroll *").prop('disabled', false); // for assessment
		// $("#VaccinationChartSave *").prop('disabled',true);
		$("#closegrtfive").button({
			disabled : false
		});
		$("#saveeditassesment1").button({
			disabled : false
		});
		$("#divdiagnosis").button({
			disabled : false
		});
		// $("input.chekbox1").prop("disabled", true);

		$("#saveeditassesment").button({
			disabled : false
		});

		$("#HEIGHT_WEIGHT_HEADCIM *").prop('disabled', false);

		$("#Alerts_Allergies *").prop('disabled', false);
		$("#updateAdmissionNoteDiv *").show();
		$('#ADNOTE').find('input, button, select').removeAttr("disabled"); // to
		// disable
		// all
		// fields
		$("#newVitals").show();
		$("#saveeditassesment1").show();
		$("#deleteAssessmentProvisionalLabel").show();
		$("#confirmDiagnosisProvisionalLabel").show();
		$("#deleteAssessmentConfirmLabel").show();
		$("#provisionalDiagnosisConfirmLabel").show();

		var risingFlow = $("#risingFlow").val();

		if (risingFlow == "on") {
			// $("#staging").hide();
			$("#ipdWithoutHeader").hide();
			$("#divtempProvId").show();
			$("#divtempTreatId").show();
			$("#ibch1").text("History of Present Iilness");
		} else {

			$("#lbch1").text("Chief Complaints");
		}

	}

}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 14-Feb-2018
 * @codeFor : viewLabTestResult in DoctorDesk on Double Click..
 ******************************************************************************/
function setLabTestId(count, postDate) {
	// alert(testmaster+"****"+labReqSlvId+"****"+postDate);

	var postDtTm = new Date(postDate).toLocaleString();
	var postDt = postDtTm.split(",")[0];
	var postTm = postDtTm.split(" ")[1];

	if (postDtTm == "null") {
		postDt = " ";
		postTm = " ";
	}
	$("#testmasterId").val($("#labReqMstId" + count).val());
	$("#labReqSlvId").val($("#labReqSlvId" + count).val());
	$('#postDate').html(postDt);
	$('#postTime').html(postTm);
	$('#subSerId').val($("#subSerId" + count).val());
	$('#isPackageFlag').val($("#isPackageFlag" + count).val());
	// call viewLabResultDoctorDesk.
	showPopUpTestResult("labindiv");
}
/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 14-Feb-2018
 * @codeFor : viewLabTestResult and show popUp on DoctorDesk.
 ******************************************************************************/
function showPopUpTestResult(callfrom) {
	// set Template.
	OPDCoversheetTemp();
	if (callfrom == "labindiv") {
		$('#postDt').hide();
		$('#postTm').hide();
		// $('#pViewBtn').hide();
		// $('#pDvBtnOnClick').hide();
		// $('#pDvBtn').show();
		// Call viewTestResult1.
		fetchLabTestResult("labindiv");

		setTimeout(function() {
			$("#iPopupFormula").show();
		}, 500);

		setTimeout(function() {
			$('#testDivLab').find('input, text').attr("readonly", "readonly");
			$('#txtLabNote').attr("readonly", "readonly");
			// document.getElementById('btnSavelab').style.visibility =
			// 'hidden';

		}, 500);
	} else if (callfrom == "viewbtn") {
		// $('#pDvBtn').hide();
		// $('#pDvBtnOnClick').hide();
		// $('#pViewBtn').show();
		// Call viewTestResult.
		$('#postDt').hide();
		$('#postTm').hide();
		fetchLabTestResult("viewbtn");

		setTimeout(function() {
			$("#iPopupFormula").show();
		}, 500);

		setTimeout(function() {
			$('#testDivLab').find('input, text').attr("readonly", "readonly");
			$('#txtLabNote').attr("readonly", "readonly");
			// document.getElementById('btnSavelab').style.visibility =
			// 'hidden';

		}, 500);
	} else if (callfrom == "labonclick") {
		// $('#pDvBtn').hide();
		// $('#pViewBtn').hide();
		// $('#pDvBtnOnClick').show();

		$('#postDt').hide();
		$('#postTm').hide();
		// Call viewTestResult1.
		fetchLabTestResult("labonclick");

		setTimeout(function() {
			$("#iPopupFormula").show();
		}, 500);

		setTimeout(function() {
			$('#testDivLab').find('input, text').attr("readonly", "readonly");
			$('#txtLabNote').attr("readonly", "readonly");
			// document.getElementById('btnSavelab').style.visibility =
			// 'hidden';

		}, 500);
	}
}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 14-Feb-2018
 * @codeFor : view Lab Test Result of posted test.
 ******************************************************************************/
function fetchLabTestResult(callfrom) {
	var tretId = "";
	var testmasterId = "";
	var labReqSlvId = "";
	var subSerId = "";
	var isPackageFlag = "";
	if (callfrom == "labindiv") {
		var valTypeNR = "n";
		tretId = ($("#treatmentId").html()).trim();
		testmasterId = ($("#testmasterId").val()).trim();
		labReqSlvId = ($("#labReqSlvId").val()).trim();
		subSerId = ($("#subSerId").val()).trim();
		var ag = $("#age").html();
		var age = ag.split("Y")[0];
		var gender = $("#sex").html();

		if (age > 15) {
			if (gender == "Male") {
				valTypeNR = "m";
			} else if (gender == "Female") {
				valTypeNR = "f";
			}

		} else if (15 >= age && age >= 3) {
			valTypeNR = "c";
		} else if (age < 3) {
			valTypeNR = "n";
		}
	} else if (callfrom == "viewbtn") {

		var valTypeNR = "n";
		tretId = ($("#treatmentId").html()).trim();
		testmasterId = 0;
		labReqSlvId = 0;
		subSerId = 0;
		var ag = $("#age").html();
		var age = ag.split("Y")[0];
		var gender = $("#sex").html();

		if (age > 15) {
			if (gender == "Male") {
				valTypeNR = "m";
			} else if (gender == "Female") {
				valTypeNR = "f";
			}

		} else if (15 >= age && age >= 3) {
			valTypeNR = "c";
		} else if (age < 3) {
			valTypeNR = "n";
		}

	} else if (callfrom == "labonclick") {

		var valTypeNR = "n";
		tretId = ($("#treatmentId").html()).trim();
		testmasterId = ($("#testmasterId").val()).trim();
		labReqSlvId = ($("#labReqSlvId").val()).trim();
		subSerId = ($("#subSerId").val()).trim();
		isPackageFlag = ($("#isPackageFlag").val()).trim();
		var ag = $("#age").html();
		var age = ag.split("Y")[0];
		var gender = $("#sex").html();

		if (age > 15) {
			if (gender == "Male") {
				valTypeNR = "m";
			} else if (gender == "Female") {
				valTypeNR = "f";
			}

		} else if (15 >= age && age >= 3) {
			valTypeNR = "c";
		} else if (age < 3) {
			valTypeNR = "n";
		}
	}

	var inputs = [];
	inputs.push('testmasterId=' + testmasterId);
	inputs.push('labReqSlvId=' + labReqSlvId);
	inputs.push('subSerId=' + subSerId);
	inputs.push('tretId=' + tretId);
	inputs.push('isPackageFlag=' + isPackageFlag);
	inputs.push('callfrom=' + callfrom);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/doctordesk/fetchLabTestResult",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					// alert("****"+JSON.stringify(r));
					ajaxResponse = r;
					testcount = 1;
					count = 1;
					protestcount = 1;
					pkgcount = 1;
					pkgprocount = 1;
					pkgprotestcount = 1;
					pkgtestcount = 1;
					procount = 1;
					totalcount = 1;
					$("#testDetails").html(ajaxResponse);
					var pobj1 = ajaxResponse;

					var pid = "";
					var count = 1;

					// alert("pobj id ::"+pobj1.proLi[2][0].idlbpkg);
					console.log(pobj1);

					sr1 = 1;
					testcount1 = 1;
					count1 = 1;
					protestcount1 = 1;
					pkgcount1 = 1;
					pkgprocount1 = 1;
					pkgprotestcount1 = 1;
					pkgtestcount1 = 1;
					procount1 = 1;
					totalcount1 = 1;

					var html = "";
					for ( var pk = 0; pk < pobj1.proLi[2].length; pk++) {
						var packageID = pobj1.proLi[2][pk].idlbpkg;

						// alert(pobj1.proLi[2][pk].pkgnm);
						html = html
								+ "<div class='col-md-12-1' style='border-bottom: 1px solid #ddd;margin-top: -11px;'>";
						html = html + "<div class='divide-20'></div>";
						html = html
								+ "<div class='col-md-1-1' style='height: 28px; padding-left: 3%; border-top: 1px solid #ddd;border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"
								+ (sr1++) + "</div>";

						html = html
								+ "<div class='col-md-11-1' style='height: 28px; padding-left: 1%;padding-top: 2px; text-align: left; border-top: 1px solid #ddd;' id='pkgDiv"
								+ (pkgcount1) + "'>"
								+ (pobj1.proLi[2][pk].pkgnm) + "</div>";
						html = html
								+ "<input type='hidden' value='pk' id='type"
								+ testcount + "' />";
						html = html + "</div>";

						for ( var i = 0; i < myArray.lbpkgli.length; i++) {

							if (myArray.lbpkgli[i].idlbpkg == packageID) {
								myObj1 = myArray.lbpkgli[i];
								break;
							}
						}
						myObj = JSON.stringify(myObj1);
						userBean = eval('(' + myObj + ')');
						console.log(userBean);

						pid = userBean.idlbpkg;

						// Now If both contains same packageID
						if (packageID == pid) {

							// alert("Pckage id "+pid);

							for ( var pr = 0; pr < userBean.pkgprotstli.length; pr++) {

								var tType = userBean.pkgprotstli[pr].typeTP;
								// alert(tType);

								if (tType == "P") {
									var pid = userBean.pkgprotstli[pr].idprotst;
									// alert(pid);

									// profile from main list
									for ( var p = 0; p < pobj1.proLi[2][pk].lbproli.length; p++) {

										if (pobj1.proLi[2][pk].lbproli[p].proId == pid) {

											// alert(pobj1.proLi[2][pk].lbproli[p].proNm);
											html = html
													+ "<div class='col-md-12-1'";
											html = html
													+ "style='margin-top: -11px;'>";
											html = html
													+ "<div class='divide-20'></div>";
											html = html
													+ "<div class='col-md-1-1'";
											html = html
													+ "style='height: 28px; padding-left: 2%;border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>";
											html = html + "</div>";

											html = html
													+ "<div class='col-md-11-1'";
											html = html
													+ "style='height: 28px; padding-left: 4%; padding-top: 2px; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; text-align: left;'";
											html = html
													+ "id='pkgproDiv"
													+ (pkgcount1)
													+ (pkgprocount)
													+ "'>"
													+ (pobj1.proLi[2][pk].lbproli[p].proNm)
													+ "</div>";
											html = html
													+ "<input type='hidden' value='pkp' id='type"
													+ (testcount) + "' />";
											html = html + "</div>";
											// test in profile
											for ( var pt = 0; pt < pobj1.proLi[2][pk].lbproli[p].testli.length; pt++) {

												if (pobj1.proLi[2][pk].lbproli[p].testli[pt].tid != 0) {

													html = html
															+ "<div class='col-md-12-1'  style='margin-top: -11px;'";
													html = html
															+ "id='testDiv"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)
															+ "'>";
													html = html
															+ "<div class='divide-20'></div>";
													html = html
															+ "<input type='hidden' value='pkpt' id='type"
															+ (procount1)
															+ "' />";

													html = html
															+ "<div class='col-md-2-1'";
													html = html
															+ "style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>";
													html = html + "</div>";

													html = html
															+ "<div class='col-md-4-1'";
													html = html
															+ "style='height: 28px; padding-left: 2%; border-top: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
													html = html
															+ "id='testNM"
															+ (pkgcount1)
															+ (pkgprocount1)
															+ (pkgprotestcount1)
															+ "'>"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnm);
													html = html
															+ "<input type='hidden' value='"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnm)
															+ "' id='nameOfTest"
															+ (count1) + "' />";
													html = html
															+ "<input type='hidden' value='"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].objLbForm.extstid)
															+ "' id='formulaForTest"
															+ count1 + "' />";
													html = html + "</div>";

													if (pobj1.proLi[2][pk].lbproli[p].testli[pt].tstRe == undefined) {
														pobj1.proLi[2][pk].lbproli[p].testli[pt].tstRe = "";
													}
													var rowNum = count1;
													html = html
															+ "<div class='col-md-2-1'";
													html = html
															+ "style='height: 28px;border-top: 1px solid #ddd;border-right: 1px solid #ddd; padding-top: 2px;padding-left: 1%;padding-right: 1%;'";
													html = html
															+ "id='testRE"
															+ (pkgcount1)
															+ (pkgprocount1)
															+ (pkgprotestcount1)
															+ "'>";
													html = html
															+ "<input type='hidden' value='"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].idTstRe)
															+ "' id='idResultTest"
															+ (count1) + "' />";
													html = html
															+ "<input type='hidden' value='"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)
															+ "' id='idOfTest"
															+ (count1) + "' />";
													html = html
															+ "<input type='text' value='"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tstRe)
															+ "' onfocus='setFormulaToTestResult("
															+ count1
															+ ")' id='testvalue"
															+ (count1++)
															+ "' maxlength='100' style='width: 100%;' />";
													html = html + "</div>";

													html = html
															+ "<div class='col-md-2-1'";
													html = html
															+ "style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd; border-top: 1px solid #ddd; padding-top: 2px;text-align: center;'";
													html = html
															+ "id='testNR"
															+ (pkgcount1)
															+ (pkgprocount1)
															+ (pkgprotestcount1)
															+ "'>";

													if (pobj1.proLi[2][pk].lbproli[p].testli[pt].vt == "g") {

														html = html
																+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[0].nvlv);

													}

													if (pobj1.proLi[2][pk].lbproli[p].testli[pt].vt == "i") {

														/**
														 * ************lab*newindividual***@author:paras*
														 * for
														 * pakage-profile****************
														 */

														if (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli.length > 4) {

															if (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].oldandnew == 1) // for
															// new
															// records
															// age
															// vise.
															{

																var a = pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].oldandnew;
																// alert(a);
																var k = pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].male;
																// alert(k);
																html = html
																		+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].nvlv)
																		+ " - "
																		+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].nvuv)
																		+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].unitnm);

															} else {
																if (valTypeNR != "") { // for
																	// new
																	// records
																	// gendar
																	// vise.

																	for ( var k = 0; k < pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli.length; k++) {

																		if (valTypeNR == pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvsx) {

																			html = html
																					+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvlv)
																					+ " - "
																					+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvuv)
																					+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].unitnm);

																		}
																	}
																}
															}
														} else { // for new
															// records
															// gendar
															// vise.

															if (valTypeNR != "") {

																for ( var k = 0; k < pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli.length; k++) {

																	if (valTypeNR == pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvsx) {

																		html = html
																				+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvlv)
																				+ " - "
																				+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvuv)
																				+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].unitnm);

																	}
																}
															}
														}
													}

													html = html + "</div>";

													html = html
															+ "<div id='testMethod"
															+ (pkgcount)
															+ (pkgprocount)
															+ (pkgprotestcount)
															+ "' class='col-md-2-1'";
													html = html
															+ "style='height: 28px;border-top: 1px solid #ddd; padding-top: 2px;'>";
													html = html
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tmethd);

													// for popup to type value
													html = html
															+ "<button id='btnInsert"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)
															+ (rowNum)
															+ "' class='btn btn-xs btn-success' value='' name='btnInsert' onclick='openEditorForResult("
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].idTstRe)
															+ ","
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)
															+ ","
															+ (rowNum)
															+ ",\"pkgprots\")' title='Type Result'  style='float:right'>";
													html = html
															+ "<i class='fa fa-eye View'></i> </button>";
													/*
													 * if(callfrom == "labindiv" ||
													 * callfrom == "viewbtn"){
													 * html = html+"<i
													 * class='fa fa-eye View'></i>
													 * </button>"; }else{ html =
													 * html+"<i class='fa
													 * fa-edit'></i>
													 * </button>"; }
													 */

													// for popup to type value
													html = html + "</div>";
													html = html + "</div>";

													html = html
															+ "<input type='hidden' value='"
															+ (pkgprotestcount1++)
															+ "{}' />";
												}
											}
											html = html
													+ "<input type='hidden' value='"
													+ (pkgprotestcount1)
													+ "' id='reportpkgproTestCount"
													+ (pkgcount1)
													+ (pkgprocount1) + "' />";
											html = html
													+ "<input type='hidden' value='"
													+ (pkgprocount1++) + "' />";
											html = html
													+ "<input type='hidden' value='"
													+ (pkgprocount1)
													+ "' id='reportpkgproCount"
													+ (pkgcount1) + "' />";

											break;
										}
									}

								}// if Profile
								else {
									var tid = userBean.pkgprotstli[pr].idprotst;
									// alert(tid);
									// test from main list
									for ( var t = 0; t < pobj1.proLi[2][pk].lbtstli.length; t++) {

										if (pobj1.proLi[2][pk].lbtstli[t].tid == tid) {

											// alert(pobj1.proLi[2][pk].lbtstli[t].tnm);

											html = html
													+ "<div class='col-md-12-1' style='margin-top: -11px;' id='pkgtestDiv"
													+ (pkgcount1)
													+ (pkgtestcount1) + "'>";
											html = html
													+ "<div class='divide-20'></div>";
											html = html
													+ "<input type='hidden' value='pkt' id='type"
													+ (testcount1) + "' />";
											html = html
													+ "<div class='col-md-1-1' style='height: 28px;padding-left: 1%;border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'></div>";
											html = html
													+ "<div class='col-md-5-1' style='height: 28px; padding-left: 2%;border-top: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
											html = html
													+ "id='pkgtestNM"
													+ (pkgcount1)
													+ (pkgtestcount)
													+ "'>"
													+ (pobj1.proLi[2][pk].lbtstli[t].tnm);
											html = html
													+ "<input type='hidden' value='"
													+ (pobj1.proLi[2][pk].lbtstli[t].tnm)
													+ "' id='nameOfTest"
													+ (count1) + "' />";
											html = html
													+ "<input type='hidden' value='"
													+ (pobj1.proLi[2][pk].lbtstli[t].objLbForm.extstid)
													+ "' id='formulaForTest"
													+ count1 + "' />";
											html = html + "</div>";
											if (pobj1.proLi[2][pk].lbtstli[t].tstRe == undefined) {
												pobj1.proLi[2][pk].lbtstli[t].tstRe = "";
											}
											var rowNum = count1;
											html = html
													+ "<div class='col-md-2-1'";
											html = html
													+ "style='height: 28px; padding-left: 1%; padding-right: 1%; border-top: 1px solid #ddd;border-right: 1px solid #ddd; padding-top: 2px;'";
											html = html + "id='pkgtestRE"
													+ (pkgcount1)
													+ (pkgtestcount1) + "'>";
											html = html
													+ "<input type='hidden' value='"
													+ (pobj1.proLi[2][pk].lbtstli[t].idTstRe)
													+ "' id='idResultTest"
													+ (count1) + "' />";
											html = html
													+ "<input type='hidden' value='"
													+ (pobj1.proLi[2][pk].lbtstli[t].tid)
													+ "' id='idOfTest" + count1
													+ "' />";
											html = html
													+ "<input	type='text' value='"
													+ (pobj1.proLi[2][pk].lbtstli[t].tstRe)
													+ "' onfocus='setFormulaToTestResult("
													+ count1
													+ ")' onkeypress='return validateSpecialMoreChar(event)' id='testvalue"
													+ (count1++)
													+ "' maxlength='100' style='width: 100%;'/></div>";
											html = html
													+ "<div class='col-md-2-1'";
											html = html
													+ "style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd;border-top: 1px solid #ddd; padding-top: 2px;text-align: center;'";
											html = html + "id='pkgtestNR"
													+ (pkgcount1)
													+ (pkgtestcount1) + "'>";

											if (pobj1.proLi[2][pk].lbtstli[t].vt == "g") {

												html = html
														+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[0].nvlv);

											}

											if (pobj1.proLi[2][pk].lbtstli[t].vt == "i") {

												/**
												 * ************lab*newindividual***@author:paras*
												 * for
												 * pakage-test****************
												 */

												if (pobj1.proLi[2][pk].lbtstli[t].tnvli.length > 4) {

													if (pobj1.proLi[2][pk].lbtstli[t].tnvli[4].oldandnew == 1) // for
													// new
													// records
													// age
													// vise.
													{

														var a = pobj1.proLi[2][pk].lbtstli[t].tnvli[4].oldandnew;
														// alert(a);
														var k = pobj1.proLi[2][pk].lbtstli[t].tnvli[4].male;
														// alert(k);
														html = html
																+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[4].nvlv)
																+ " - "
																+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[4].nvuv)
																+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[4].unitnm);

													} else {

														if (valTypeNR != "") {

															for ( var tnv = 0; tnv < pobj1.proLi[2][pk].lbtstli[t].tnvli.length; tnv++) {

																if (valTypeNR == pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvsx) {
																	html = html
																			+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvlv)
																			+ " - "
																			+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvuv)
																			+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].unitnm);
																}
															}

														}
													}
												} else {

													if (valTypeNR != "") {

														for ( var tnv = 0; tnv < pobj1.proLi[2][pk].lbtstli[t].tnvli.length; tnv++) {

															if (valTypeNR == pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvsx) {
																html = html
																		+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvlv)
																		+ " - "
																		+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvuv)
																		+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].unitnm);
															}
														}

													}
												}
											}

											html = html + "</div>";

											html = html
													+ "<div class='col-md-2-1' id='pkgtestMethod"
													+ (pkgcount1)
													+ (pkgtestcount1) + "' ";
											html = html
													+ "style='height: 28px;border-top: 1px solid #ddd; padding-top: 2px;'>";
											html = html
													+ ((pobj1.proLi[2][pk].lbtstli[t].tmethd));
											// for popup to type value
											html = html
													+ "<button id='btnInsert"
													+ (pobj1.proLi[2][pk].lbtstli[t].tid)
													+ (rowNum)
													+ "' class='btn btn-xs btn-success' value='' name='btnInsert' onclick='openEditorForResult("
													+ (pobj1.proLi[2][pk].lbtstli[t].idTstRe)
													+ ","
													+ (pobj1.proLi[2][pk].lbtstli[t].tid)
													+ ","
													+ (rowNum)
													+ ",\"pkgts\")' title='Type Result'  style='float:right'>";
											html = html
													+ "<i class='fa fa-eye View'></i> </button>";
											/*
											 * if(callfrom == "labindiv" ||
											 * callfrom == "viewbtn"){ html =
											 * html+"<i class='fa fa-eye View'></i>
											 * </button>"; }else{ html = html+"<i
											 * class='fa fa-edit'></i>
											 * </button>"; }
											 */
											// for popup to type value
											html = html + "</div>";
											html = html + "</div>";

											html = html
													+ "<input type='hidden' value='"
													+ (pkgtestcount1++)
													+ "' />";

											break;

										}// if inner else

									}// else inner for loop

								}// else test

							}

						}// if for package id equal

					}// for main list proLi[2]

					// 2nd list inside main list

					for ( var pk = 0; pk < pobj1.proLi[0].length; pk++) {
						html = html + "<div class='col-md-12-1'";
						html = html
								+ "style='border-top: 1px solid #ddd; margin-top: -1px;'>";
						html = html + "<div class='divide-10'></div>";
						html = html + "<div class='col-md-1-1'";
						html = html
								+ "style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"
								+ (sr1++);
						html = html + "</div>";
						var postDtTm = new Date(pobj1.proLi[0][pk].postDtTm)
								.toLocaleString();
						html = html + "<div class='col-md-11-1'";
						html = html
								+ "style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;font-weight: bold;'";
						html = html + "id='proDiv" + (procount1) + "'>"
								+ pobj1.proLi[0][pk].proNm + "   [ "
								+ (pobj1.proLi[0][pk].refdocname).toUpperCase()
								+ " : " + postDtTm + " ]";
						if (pobj1.proLi[0][pk].pkgNm != "-"
								&& pobj1.proLi[0][pk].pkgNm != null
								&& pobj1.proLi[0][pk].pkgNm != "") {
							html = html + " - (" + pobj1.proLi[0][pk].pkgNm
									+ ")</div>";
						} else {
							html = html + "</div>";
						}

						html = html + "<input type='hidden' value='p' id='type"
								+ (testcount1) + "' />";
						html = html + "</div>";

						// {#foreach $T.proLi.testli as testli}

						for ( var ts = 0; ts < pobj1.proLi[0][pk].testli.length; ts++) {

							if (pobj1.proLi[0][pk].testli[ts].tid != 0) {

								html = html + "<div class='col-md-12-1'";
								html = html + "style='margin-top: -11px;'";
								html = html + "id='testDiv"
										+ (pobj1.proLi[0][pk].testli[ts].tid)
										+ "'>";
								html = html + "<div class='divide-20'></div>";
								html = html
										+ "<input type='hidden' value='pt' id='type"
										+ (procount1) + "' />";
								html = html + "<div class='col-md-2-1'";
								html = html
										+ "style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'></div>";
								html = html + "<div class='col-md-4-1'";
								html = html
										+ "style='height: 28px; padding-left: 2%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
								html = html + "id='testNM" + (procount1)
										+ (protestcount1) + "'>"
										+ (pobj1.proLi[0][pk].testli[ts].tnm);
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].tnm)
										+ "' id='nameOfTest" + (count1)
										+ "' />";
								html = html
										+ "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].objLbForm.extstid)
										+ "' id='formulaForTest" + count1
										+ "' />";
								html = html + "</div>";

								if (pobj1.proLi[0][pk].testli[ts].tstRe == undefined) {
									pobj1.proLi[0][pk].testli[ts].tstRe = "";
								}
								var rowNum = count1;

								// Added by Laxman on 01-Feb-2018.
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].serviceid)
										+ "' id='serviceId" + (count1) + "' />";
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].subserviceid)
										+ "' id='subserviceId" + (count1)
										+ "' />";
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].labreqid)
										+ "' id='labreqId" + (count1) + "' />";
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].labreqslvid)
										+ "' id='labreqslvId" + (count1)
										+ "' />";
								html = html
										+ "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].ndgnrl)
										+ "' id='narrationId" + (count1)
										+ "' />";
								html = html
										+ "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].idTstRe)
										+ "' id='idResultTest" + (count1)
										+ "' />";
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].tid)
										+ "' id='idOfTest" + (count1) + "' />";
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].vt)
										+ "' id='isTemplate" + (count1)
										+ "' />";

								if (pobj1.proLi[0][pk].testli[ts].vt == "t") {// for
									// template

									html = html + "<div class='col-md-2-1'";
									html = html
											+ "style='height: 28px; border-bottom: 1px solid #ddd; text-align: left; padding-left: 1%; padding-right: 1%; border-right: 1px solid #ddd; padding-top: 2px;'";
									html = html + "id='testRE" + (procount1)
											+ (protestcount1) + "'>";
									html = html
											+ "<input type='hidden' value='"
											+ (pobj1.proLi[0][pk].testli[ts].idTstRe)
											+ "' id='idTempResultTest"
											+ (count1) + "' />";
									html = html
											+ "<input type='hidden' value='"
											+ (pobj1.proLi[0][pk].testli[ts].tid)
											+ "' id='idOfTempTest" + (count1)
											+ "' />";

									html = html
											+ "<input	type='button' value='"
											+ (pobj1.proLi[0][pk].testli[ts].tnm)
											+ "' id='tempTestValue"
											+ count1
											+ "' onClick=viewTemplateForLabTest("
											+ count1
											+ "); maxlength='12' style='width: 100%;' /></div>";
									// $("#iTestTemplateName").val(pobj1.proLi[0][pk].testli[ts].tnm);
									$("#iImpression")
											.val(
													pobj1.proLi[0][pk].testli[ts].impressions);
									CKEDITOR.instances['iEditorTestTemplate']
											.setData((pobj1.proLi[0][pk].testli[ts].testTemplate));

									$("#idlabtest").val(
											pobj1.proLi[0][pk].testli[ts].tid);
									$("#hTestTemplateName").val(
											pobj1.proLi[0][pk].testli[ts].tnm);
									$("#hTestTemplate")
											.val(
													pobj1.proLi[0][pk].testli[ts].testTemplate);
									$("#hImpression")
											.val(
													pobj1.proLi[0][pk].testli[ts].impressions);
									$("#hID").val(count1);
									count1++;
								} else {

									html = html + "<div class='col-md-2-1'";
									html = html
											+ "style='height: 28px; border-bottom: 1px solid #ddd; text-align: left; padding-left: 1%; padding-right: 1%; border-right: 1px solid #ddd; padding-top: 2px;'";
									html = html + "id='testRE" + (procount1)
											+ (protestcount1) + "'>";

									html = html
											+ "<input	type='text' value='"
											+ (pobj1.proLi[0][pk].testli[ts].tstRe)
											+ "' onfocus='setFormulaToTestResult("
											+ count1
											+ ")' id='testvalue"
											+ (count1++)
											+ "' maxlength='100' style='width: 100%;'/></div>";

								}
								html = html + "<div class='col-md-2-1'";
								html = html
										+ "style='height: 28px; border-bottom: 1px solid #ddd; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px;text-align: center;'";
								html = html + "id='testNR" + (procount1)
										+ (protestcount1) + "'>";

								if (pobj1.proLi[0][pk].testli[ts].vt == "g") {
									html = html
											+ (pobj1.proLi[0][pk].testli[ts].tnvli[0].nvlv);
								}

								if (pobj1.proLi[0][pk].testli[ts].vt == "i") {

									/**
									 * ************lab*newindividual***@author:paras*
									 * for profile****************
									 */

									if (pobj1.proLi[0][pk].testli[ts].tnvli.length > 4) {

										if (pobj1.proLi[0][pk].testli[ts].tnvli[4].oldandnew == 1) // for
										// new
										// records
										// age
										// vise.
										{

											var a = pobj1.proLi[0][pk].testli[ts].tnvli[4].oldandnew;
											// alert(a);
											var k = pobj1.proLi[0][pk].testli[ts].tnvli[4].male;
											// alert(k);
											html = html
													+ (pobj1.proLi[0][pk].testli[ts].tnvli[4].nvlv)
													+ " - "
													+ (pobj1.proLi[0][pk].testli[ts].tnvli[4].nvuv)
													+ (pobj1.proLi[0][pk].testli[ts].tnvli[4].unitnm);

										} else {
											if (valTypeNR != "") {
												// {#foreach $T.testli.tnvli as
												// tnvli}
												for ( var j = 0; j < pobj1.proLi[0][pk].testli[ts].tnvli.length; j++) {
													if (valTypeNR == pobj1.proLi[0][pk].testli[ts].tnvli[j].nvsx) {
														html = html
																+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvlv)
																+ " - "
																+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvuv)
																+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].unitnm);
													}
												}
											}
										}
									} else { // for old records age vise.

										if (valTypeNR != "") {
											for ( var j = 0; j < pobj1.proLi[0][pk].testli[ts].tnvli.length; j++) {
												if (valTypeNR == pobj1.proLi[0][pk].testli[ts].tnvli[j].nvsx) {
													html = html
															+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvlv)
															+ " - "
															+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvuv)
															+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].unitnm);
												}
											}
										}
									}
								}
								/**
								 * ****end********lab*newindividual***@author:paras*
								 * for profile****************
								 */
								html = html + "</div>";

								html = html + "<div id='testMethod"
										+ (procount1) + (protestcount1)
										+ "' class='col-md-2-1'";
								html = html
										+ "style='height: 28px; border-bottom: 1px solid #ddd; padding-top: 2px;' title='"
										+ pobj1.proLi[0][pk].testli[ts].tmethd
										+ "'>";
								if (pobj1.proLi[0][pk].testli[ts].tmethd.length > 25) {
									html = html
											+ (pobj1.proLi[0][pk].testli[ts].tmethd
													.substring(0, 25)) + "...";
								} else {
									html = html
											+ (pobj1.proLi[0][pk].testli[ts].tmethd);
								}
								// Added by Laxman on for edit btnClass
								// narration 07-Feb-2018.
								var btnClass = "btn-success";
								if (pobj1.proLi[0][pk].testli[ts].ndgnrl != undefined
										&& pobj1.proLi[0][pk].testli[ts].ndgnrl != ""
										&& pobj1.proLi[0][pk].testli[ts].ndgnrl != "undefined"
										&& pobj1.proLi[0][pk].testli[ts].ndgnrl != "-") {
									btnClass = "btn-danger";
								}
								// for popup to type value
								html = html
										+ "<button id='btnInsert"
										+ (pobj1.proLi[0][pk].testli[ts].tid)
										+ (rowNum)
										+ "' class='btn btn-xs "
										+ btnClass
										+ "' value='' name='btnInsert' onclick='openEditorForResult("
										+ (pobj1.proLi[0][pk].testli[ts].idTstRe)
										+ ","
										+ (pobj1.proLi[0][pk].testli[ts].tid)
										+ ","
										+ (rowNum)
										+ ",\"prots\")' title='Type Result'  style='float:right'>";
								html = html
										+ "<i class='fa fa-eye View'></i> </button>";
								/*
								 * if(callfrom == "labindiv" || callfrom ==
								 * "viewbtn"){ html = html+"<i class='fa fa-eye
								 * View'></i> </button>"; }else{ html = html+"<i
								 * class='fa fa-edit'></i> </button>"; }
								 */
								// for popup to type value
								html = html + "</div>";

								html = html + "</div>";

								html = html + "<input type='hidden' value='"
										+ (protestcount1++) + "' />";

							}
						}

						html = html + "<input type='hidden' value='"
								+ (protestcount1++)
								+ "' id='reportproTestCount" + (procount1)
								+ "' />";
						html = html + "<input type='hidden' value='"
								+ (procount1++) + "' />";

					}
					html = html + "<input type='hidden' value='" + (procount1)
							+ "' id='reportproCount' />";

					// 3rd list @ first position
					for ( var pk = 0; pk < pobj1.proLi[1].length; pk++) {

						html = html + "<div class='col-md-12-1'";
						html = html + "style='margin-top: -11px;'";
						html = html + "id='testDiv" + (pobj1.proLi[1][pk].tid)
								+ "'>";
						html = html + "<div class='divide-20'></div>";
						html = html + "<input type='hidden' value='t' id='type"
								+ (testcount1) + "' />";

						html = html + "<div class='col-md-1-1'";
						html = html
								+ "style='height: 28px; padding-left: 1%;border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"
								+ (sr1++) + "</div>";

						html = html + "<div class='col-md-5-1'";
						html = html
								+ "style='height: 28px; padding-left: 1%;border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
						html = html + "id='testNM" + (count1) + "'>"
								+ (pobj1.proLi[1][pk].tnm);
						html = html + "<input type='hidden' value='"
								+ (pobj1.proLi[1][pk].tnm) + "' id='nameOfTest"
								+ (count1) + "' />";
						html = html + "<input type='hidden' value='"
								+ (pobj1.proLi[1][pk].objLbForm.extstid)
								+ "' id='formulaForTest" + count1 + "' />";
						html = html + "</div>";

						if (pobj1.proLi[1][pk].tstRe == undefined) {
							pobj1.proLi[1][pk].tstRe = "";
						}
						var rowNum = count1;
						html = html + "<div class='col-md-2-1'";
						html = html
								+ "style='height: 28px; text-align: left; padding-left: 1%; padding-right:1%; border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px;'";
						html = html + "id='testRE" + (count1) + "'>";
						html = html + "<input type='hidden' value='"
								+ (pobj1.proLi[1][pk].idTstRe)
								+ "' id='idResultTest" + (count1) + "' />";
						html = html + "<input type='hidden' value='"
								+ (pobj1.proLi[1][pk].tid) + "' id='idOfTest"
								+ (count1) + "' />";

						/*
						 * if(pobj1.proLi[1][pk].vt == "g"){
						 * 
						 * 
						 * html = html+"<input type='text' value='-'
						 * id='testvalue"+(count1++)+"' maxlength='12'
						 * style='width: 100%;' /></div>"; }else{
						 */

						html = html
								+ "<input	type='text' value='"
								+ (pobj1.proLi[1][pk].tstRe)
								+ "' onfocus='setFormulaToTestResult("
								+ count1
								+ ")' id='testvalue"
								+ (count1++)
								+ "' maxlength='100' style='width: 100%;'/></div>";

						// }

						html = html + "<div class='col-md-2-1'";
						html = html
								+ "style='height: 28px; padding-left: 1%;border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px;text-align: center;'";
						html = html + "id='testNR" + (count1) + "'>";

						if (pobj1.proLi[1][pk].vt == "g") {
							// {$T.testli.tnvli[0].nvlv}
							html = html + (pobj1.proLi[1][pk].tnvli[0].nvlv);
						}

						if (pobj1.proLi[1][pk].vt == "i") {

							/**
							 * ************lab*newindividual***@author:paras*
							 * for test****************
							 */
							if (pobj1.proLi[1][pk].tnvli.length > 4) {

								if (pobj1.proLi[1][pk].tnvli[4].oldandnew == 1) // for
								// new
								// records
								// age
								// vise.
								{

									var a = pobj1.proLi[1][pk].tnvli[4].oldandnew;
									// alert(a);
									var k = pobj1.proLi[1][pk].tnvli[4].male;
									// alert(k);
									html = html
											+ (pobj1.proLi[1][pk].tnvli[4].nvlv)
											+ " - "
											+ (pobj1.proLi[1][pk].tnvli[4].nvuv)
											+ (pobj1.proLi[1][pk].tnvli[4].unitnm);

								} else {
									if (valTypeNR != "") {
										// {#foreach $T.testli.tnvli as tnvli}
										for ( var i = 0; i < pobj1.proLi[1][pk].tnvli.length; i++) {
											// $T.tnvli.nvsx
											if (valTypeNR == pobj1.proLi[1][pk].tnvli[i].nvsx) {
												// {$T.tnvli.nvlv} -
												// {$T.tnvli.nvuv}{$T.tnvli.unitnm}
												html = html
														+ (pobj1.proLi[1][pk].tnvli[i].nvlv)
														+ " - "
														+ (pobj1.proLi[1][pk].tnvli[i].nvuv)
														+ (pobj1.proLi[1][pk].tnvli[i].unitnm);
											}
										}
									}
								}
							} else {

								if (valTypeNR != "") { // for old records
									// gender vise.
									// {#foreach $T.testli.tnvli as tnvli}
									for ( var i = 0; i < pobj1.proLi[1][pk].tnvli.length; i++) {
										// $T.tnvli.nvsx
										if (valTypeNR == pobj1.proLi[1][pk].tnvli[i].nvsx) {
											// {$T.tnvli.nvlv} -
											// {$T.tnvli.nvuv}{$T.tnvli.unitnm}
											html = html
													+ (pobj1.proLi[1][pk].tnvli[i].nvlv)
													+ " - "
													+ (pobj1.proLi[1][pk].tnvli[i].nvuv)
													+ (pobj1.proLi[1][pk].tnvli[i].unitnm);
										}
									}
								}

							}
						}

						/** ********end************************* */
						html = html + "</div>";

						html = html
								+ "<div id='testMethod{count}' class='col-md-2-1'";
						html = html
								+ "style='height: 28px; border-top: 1px solid #ddd;  text-align: left; padding-top: 2px;'>";
						html = html + (pobj1.proLi[1][pk].tmethd);

						// var tst ="ts";

						// if(pobj1.proLi[1][pk].vt == "g"){

						html = html
								+ "<button id='btnInsert"
								+ (pobj1.proLi[1][pk].tid)
								+ (rowNum)
								+ "' class='btn btn-xs btn-success' value='' name='btnInsert' onclick='openEditorForResult("
								+ (pobj1.proLi[1][pk].idTstRe)
								+ ","
								+ (pobj1.proLi[1][pk].tid)
								+ ","
								+ (rowNum)
								+ ",\"ts\")' title='Type Result'  style='float:right'>";
						html = html
								+ "<i class='fa fa-eye View'></i> </button>";
						/*
						 * if(callfrom == "labindiv" || callfrom == "viewbtn"){
						 * html = html+"<i class='fa fa-eye View'></i>
						 * </button>"; }else{ html = html+"<i class='fa
						 * fa-edit'></i> </button>"; }
						 */
						// }
						html = html + "</div>";

						html = html + "<div id='testNote" + (count1)
								+ "' style='display: none;'>"
								+ (pobj1.proLi[1][pk].tnote) + "</div>";
						html = html + "<div id='testClinicaluse" + (count1)
								+ "' style='display: none;'>"
								+ (pobj1.proLi[1][pk].tcliuse) + "</div>";
						html = html + "<div id='testIncreasedlevel" + (count1)
								+ "' style='display: none;'>";
						html = html + (pobj1.proLi[1][pk].tinrl) + "</div>";
						html = html + "<div id='testInterpretation" + (count1)
								+ "' style='display: none;'>"
								+ (pobj1.proLi[1][pk].tinter);
						html = html + "</div>";
						html = html + "<div id='testComments" + (count1++)
								+ "' style='display: none;'>"
								+ (pobj1.proLi[1][pk].tcommnt);
						html = html + "</div>";

						html = html + "</div>";

					}
					html = html + "<input type='hidden' value='" + (--count1)
							+ "' id='reportTestCount' />";

					$("#testDivLab").html(html);
				}
			});
}

function ShowPrint(callfrom) {
	labResultPrint(callfrom);
}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 15-Feb-2018
 * @codeFor : Print lab result
 ******************************************************************************/
function labResultPrint(callfrom) {
	// alert("***"+callfrom);
	var labReqSlvId = 0;
	var testmasterId = 0;
	var treatmentId = 0;
	var subSerId = 0;
	subSerId = $.trim($('#subSerId').val());
	treatmentId = ($("#treatmentId").html()).trim();
	testmasterId = ($("#testmasterId").val()).trim();
	labReqSlvId = ($("#labReqSlvId").val()).trim();

	// alert("****"+labReqSlvId);
	if (callfrom == "indivprint") {
		setTimeout(
				function() {
					// Print individual lab Result PDF of Patient
					window
							.open(("doctorDeskLabResultPDF.jsp?" + "&subSerId="
									+ subSerId + "&testmasterId="
									+ testmasterId + "&treatmentId="
									+ treatmentId + "&callfrom=" + encodeURIComponent(callfrom)));
				}, 300);
	} else if (callfrom == "labonclick") {
		setTimeout(
				function() {
					// Print labonclick lab Result PDF of Patient
					window.open(("doctorDeskLabResultPDF.jsp?"
							+ "&testmasterId=" + testmasterId + "&labReqSlvId="
							+ labReqSlvId + "&treatmentId=" + treatmentId
							+ "&callfrom=" + encodeURIComponent(callfrom)));
				}, 300);
	} else {
		setTimeout(function() {
			// Print All lab Result PDF of Patient
			window.open(("doctorDeskViewLabResultPDF.jsp?" + "&treatmentId="
					+ treatmentId + "&TechN=" + encodeURIComponent("withN")));
		}, 300);
	}
	return;
}

// Added by Laxman for IPD Coversheet Lab result PopUp. on 19-Feb-2018.
function OPDCoversheetTemp() {
	var temp = '<div class="modal-dialog">'
			+ '<div class="modal-content col-md-12-1" style="width:108%; margin-top: 7%; margin-left: 4%;">'
			+ '<div class="modal-header">'
			+ '<h4 id="testHead" style="margin-top: -3px;"><i class="fa fa-fw"><img width="19px;" height="19px;" src="images/science-512.png" alt=""></i> Lab Test Results :'
			+ '<button id="pDvBtn" class="btn btn-xs btn-warning" title="Print" onclick="ShowPrint(\'indivprint\')" style="margin-left: 75%;margin-right: 5px;display:none;"><i class="fa fa-print"></i></button>'
			+ '<button id="pViewBtn" class="btn btn-xs btn-warning" title="Print" onclick="ShowPrint(\'viewprint\')" style="margin-left: 75%;margin-right: 5px;display:none;"><i class="fa fa-print"></i></button>'
			+ '<button id="pDvBtnOnClick" class="btn btn-xs btn-warning" title="Print" onclick="ShowPrint(\'labonclick\')" style="margin-left: 75%;margin-right: 5px;display:none;"><i class="fa fa-print"></i></button>'
			+ '<button class="btn btn-xs btn-danger" title="Close" type="button" onclick="closeLabPop()" style="margin-left: 78%; margin-right: 6px;"><i class="fa fa-times"></i></button>'
			+ '</h4>'
			+ '</div>'
			+ '<div class="modal-body">'
			+ '<div class="divide-20"></div>'
			+ '<div class="col-sm-12-1">'
			+ '<div id="postDt" class="col-sm-6-1 center">'
			+ '<label class="TextFont col-md-3-1">Posted Date:</label><label id="postDate" class="TextFont col-md-3-1"></label></div>'
			+ '<div id="postTm" class="col-sm-6-1 center"><label class="TextFont col-md-3-1">Posted Time:</label> <label id="postTime" class="TextFont col-md-3-1"></label>'
			+ '</div></div>'
			+ '<div class="divide-10"></div>'
			+ '<div id="ratediv" class="col-sm-12-1">'
			+ '<table class="table table-bordered" style="margin-top: 0px; width: 98.70%;">'
			+ '<thead>'
			+ '<tr>'
			+ '<th class="col-sm-1 center">#</th>'
			+ '<th class="col-sm-5-1 center">Test Name</th>'
			+ '<th class="col-sm-2-1 center">Test Result</th>'
			+ '<th class="col-sm-2-1 center">Normal Values</th>'
			+ '<th class="col-sm-2-1 center">Method</th>'
			+ '</tr>'
			+ '</thead>'
			+ '</table>'
			+ '</div>'
			+ '<div id="testDivLab" class="col-md-12-1" style="width:100%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d; margin-top: -21px; margin-bottom: 10px;"></div>'
			+ '</div>' + '</div>' + '</div>';

	$("#iPopupFormula").html(temp);
}

// Added by Laxman for IPD Coversheet Compare Lab result PopUp. on 22-Feb-2018.
function CompareTestResultTemp() {
	var temp = '<div class="modal-dialog">'
			+ '<div class="modal-content col-md-12-1" style="width:108%; margin-top: 7%; margin-left: 4%;">'
			+ '<div class="modal-header">'
			+ '<h4 id="testHead" style="margin-top: -3px;"><i class="fa fa-fw"><img width="19px;" height="19px;" src="images/science-512.png" alt=""></i>Compare Lab Test Results :'
			+ '<button class="btn btn-xs btn-danger" title="Close" type="button" onclick="closeComparePop()" style="margin-left: 70%;margin-right: 5px;"><i class="fa fa-times"></i></button>'
			+ '</h4>'
			+ '</div>'
			+ '<div class="modal-body">'
			+ '<div id="testDivCompareLab" class="col-md-12-1" style="height: 400px; max-height: auto;  overflow-x: scroll; overflow-y: scroll;">'
			+ '<table id="labTestTable" class="table table-bordered table-condensed cf table-fixed"'
			+ 'style="margin-bottom: 9px;  overflow-x: scroll; overflow-y: scroll; max-width: 1000%; table-layout:fixed;">'
			+ '<thead  style="background-color: lightgray;" id="labTestHeader">'
			+ '</thead>' + '<tbody class="table-striped"  id="labTestDiv">'
			+ '</tbody>' + '</table>' + '</div>' + '</div>' + '</div>'
			+ '</div>';

	$("#iPopupCompare").html(temp);
}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 18-Feb-2016
 * @codeFor : Hide popup
 ******************************************************************************/
function closeComparePop() {
	$("#iPopupCompare").hide();
}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 22-Feb-2018
 * @codeFor : Compare Lab Test Result and show popUp on DoctorDesk.
 ******************************************************************************/
function showComparePopUp(callfrom) {
	// set Template.
	CompareTestResultTemp();

	if (callfrom == "cmprbtn") {
		// Call Compare TestResult.
		CompareLabTestResult("cmprbtn");

		setTimeout(function() {
			$("#iPopupCompare").show();
			$("#testDivCompareLab").animate({
				scrollTop : 0
			}, "fast");
			$("#testDivCompareLab").animate({
				scrollLeft : 0
			}, "fast");

		}, 500);

		setTimeout(function() {
			$('#testDivCompareLab').find('input, text').attr("readonly",
					"readonly");
			$('#txtLabNote').attr("readonly", "readonly");
			// document.getElementById('btnSavelab').style.visibility =
			// 'hidden';

		}, 500);
	}
}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 14-Feb-2018
 * @codeFor : view Lab Test Result of posted test.
 ******************************************************************************/
function CompareLabTestResult(callfrom) {
	var tretId = "";
	var PatientId = "";
	if (callfrom == "cmprbtn") {

		var valTypeNR = "n";
		tretId = ($("#treatmentId").html()).trim();
		PatientId = ($("#patientId").html()).trim();
		var ag = $("#age").html();
		var age = ag.split("Y")[0];
		var gender = $("#sex").html();

		if (age > 15) {
			if (gender == "Male") {
				valTypeNR = "m";
			} else if (gender == "Female") {
				valTypeNR = "f";
			}

		} else if (15 >= age && age >= 3) {
			valTypeNR = "c";
		} else if (age < 3) {
			valTypeNR = "n";
		}

	}

	var inputs = [];
	inputs.push('tretId=' + tretId);
	inputs.push('callfrom=' + callfrom);
	inputs.push('PatientId=' + PatientId);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/doctordesk/compareLabTestResult",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					// alert("****"+JSON.stringify(r));
					ajaxResponse = r;
					testcount = 1;
					count = 1;
					protestcount = 1;
					pkgcount = 1;
					pkgprocount = 1;
					pkgprotestcount = 1;
					pkgtestcount = 1;
					procount = 1;
					totalcount = 1;
					$("#testDetails").html(ajaxResponse);
					var pobj1 = ajaxResponse;
					var postDtTm = "";
					var pid = "";
					var count = 1;
					var cnt = 1;

					// alert("pobj id ::"+pobj1.proLi[2][0].idlbpkg);
					console.log(pobj1);
					sr1 = 1;
					testcount1 = 1;
					count1 = 1;
					protestcount1 = 1;
					pkgcount1 = 1;
					pkgprocount1 = 1;
					pkgprotestcount1 = 1;
					pkgtestcount1 = 1;
					procount1 = 1;
					totalcount1 = 1;
					var TestHeader = "";
					var htm = "";

					// 2nd list inside main list(for profile)
					var basketItems = [];
					var dateArr = [];
					for ( var pk = 0; pk < pobj1.proLi[0].length; pk++) {
						basketItems[pk] = pobj1.proLi[0][pk].subserviceid;
						dateArr[pk] = pobj1.proLi[0][pk].postDtTm;
					}
					basketItems = $.unique(basketItems);
					// dateArr=$.unique(dateArr);
					dateArr = dateArr.filter(function(item, i, ar) {
						return ar.indexOf(item) === i;
					});

					TestHeader = TestHeader
							+ '<tr><th style="width: 40px;">#</th>'
							+ '<th colspan="2" style="width: 400px; text-align: center;">Test Name</th>'
							+ '<th style="width: 150px;text-align: center;">Normal Values</th>';

					for ( var k = 0; k < dateArr.length; k++) {
						postDtTm = new Date(dateArr[k]).toLocaleString();
						TestHeader = TestHeader
								+ "<th style='height: 21.5px; width: 150px;text-align: center;font-weight:bold'>Test Result</th>";
					}
					TestHeader = TestHeader + "</tr>";
					$("#labTestHeader").html(TestHeader);

					// For No. of profile.
					for ( var pk = 0; pk < pobj1.proLi[0].length; pk++) {
						// alert("----->>"+pobj1.proLi[0][pk].subserviceid);
						if (jQuery.inArray((pobj1.proLi[0][pk].subserviceid),
								basketItems) != -1) {
							basketItems = jQuery
									.grep(
											basketItems,
											function(value) {
												return value != (pobj1.proLi[0][pk].subserviceid);
											});

							/**
							 * ****************Start count/Profile
							 * Name******************
							 */
							htm = htm
									+ "<tr id='profileTrId"
									+ cnt
									+ "'>"
									+ "<td style='height: 21.5px; width: 183px;text-align: center;font-weight:bold'>"
									+ (cnt++)
									+ "</td>"
									+ "<td colspan='2' style='height: 21.5px; width: 300px;word-wrap:break-word ;text-align: left;font-weight:bold'>"
									+ pobj1.proLi[0][pk].proNm
									+ "</td>"
									+ "<td style='height: 21.5px; width: 183px;text-align: center;'></td>"
									+ "</tr>";
							/**
							 * ****************End count/Profile
							 * Name******************
							 */
							// $("#labTestDiv").append(trProData);
							// For No. of Test inside profile.
							for ( var ts = 0; ts < pobj1.proLi[0][pk].testli.length; ts++) {

								if (pobj1.proLi[0][pk].testli[ts].tid != 0) {
									/**
									 * ********start test normal
									 * values****************
									 */
									var testNorVal = "";
									if (pobj1.proLi[0][pk].testli[ts].vt == "g") {
										testNorVal = pobj1.proLi[0][pk].testli[ts].tnvli[0].nvlv;
									}

									if (pobj1.proLi[0][pk].testli[ts].vt == "i") {

										if (pobj1.proLi[0][pk].testli[ts].tnvli.length > 4) {

											if (pobj1.proLi[0][pk].testli[ts].tnvli[4].oldandnew == 1) // for
											// new
											// records
											// age
											// vise.
											{

												var a = pobj1.proLi[0][pk].testli[ts].tnvli[4].oldandnew;
												// alert(a);
												var k = pobj1.proLi[0][pk].testli[ts].tnvli[4].male;
												// alert(k);
												testNorVal = (pobj1.proLi[0][pk].testli[ts].tnvli[4].nvlv)
														+ " - "
														+ (pobj1.proLi[0][pk].testli[ts].tnvli[4].nvuv)
														+ (pobj1.proLi[0][pk].testli[ts].tnvli[4].unitnm);
											} else {
												if (valTypeNR != "") {
													// {#foreach $T.testli.tnvli
													// as tnvli}
													for ( var j = 0; j < pobj1.proLi[0][pk].testli[ts].tnvli.length; j++) {
														if (valTypeNR == pobj1.proLi[0][pk].testli[ts].tnvli[j].nvsx) {
															testNorVal = (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvlv)
																	+ " - "
																	+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvuv)
																	+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].unitnm);
														}
													}
												}
											}
										} else { // for old records age vise.

											if (valTypeNR != "") {
												for ( var j = 0; j < pobj1.proLi[0][pk].testli[ts].tnvli.length; j++) {
													if (valTypeNR == pobj1.proLi[0][pk].testli[ts].tnvli[j].nvsx) {
														testNorVal = (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvlv)
																+ " - "
																+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvuv)
																+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].unitnm);
													}
												}
											}
										}
									}
									/**
									 * ****************Start Normal
									 * Values/TestResult******************
									 */
									htm = htm
											+ "<tr id='testTrId"
											+ count1
											+ "'>"
											+ "<td></td>"
											+ "<td style='width:100px;'></td>"
											+ "<td style='height: 21.5px; width: 200px;word-wrap:break-word; text-align: left;'>"
											+ (pobj1.proLi[0][pk].testli[ts].tnm)
											+ "</td>"
											+ "<td style='height: 21.5px; width: 183px;text-align: center;'>"
											+ testNorVal + "</td>";
									for ( var p = 0; p < dateArr.length; p++) {
										htm = htm
												+ "<td style='height: 21.5px; width: 183px;text-align: center;'>"
												+ "<input id='"
												+ dateArr[p]
												+ "_"
												+ pobj1.proLi[0][pk].testli[ts].tid
												+ "_"
												+ pobj1.proLi[0][pk].subserviceid
												+ "' type='text' value='-' maxlength='100' style='width:122px;text-align: center;'/>"
												+ "</td>";

									}
									// trTstData = trTstData + "</tr>";
									/**
									 * ****************End Normal
									 * Values/TestResult******************
									 */
									// $("#labTestDiv").append(html);
									count1++;
									htm = htm + "</tr>";
									/**
									 * ********End test normal
									 * values****************
									 */
								}
							}
						}
					}
					/** ****************Start For Date****************** */

					$("#labTestDiv").html(htm);

					for ( var k = 0; k < dateArr.length; k++) {
						postDtTm = new Date(dateArr[k]).toLocaleString();
						$("#profileTrId1").append(
								"<td style='height: 21.5px; width: 183px;text-align: center;font-weight:bold'>"
										+ postDtTm + "</td>");
					}
					for ( var kk = 1; kk <= cnt; kk++) {
						for ( var k = 0; k < dateArr.length; k++) {
							$("#profileTrId" + (kk + 1))
									.append(
											"<td style='height: 21.5px; width: 183px;text-align: center;'></td>");
						}
					}
					/** ****************End For Date****************** */
					/**
					 * ****************Start For TestResult
					 * values******************
					 */
					for ( var k = 0; k < pobj1.proLi[0].length; k++) {
						for ( var ts = 0; ts < pobj1.proLi[0][k].testli.length; ts++) {
							$(
									"#" + pobj1.proLi[0][k].postDtTm + "_"
											+ pobj1.proLi[0][k].testli[ts].tid
											+ "_"
											+ pobj1.proLi[0][k].subserviceid)
									.val(pobj1.proLi[0][k].testli[ts].tstRe);
						}

					}
					/**
					 * ****************End For TestResult
					 * values******************
					 */
				}
			});
}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 26-Feb-2018
 * @codeFor : viewLabTestResult in DoctorDesk on Single Click.
 ******************************************************************************/
function setLabTestId1(count, postDate) {
	// alert(testmaster+"****"+labReqSlvId+"****"+isPackageFlag);

	var postDtTm = new Date(postDate).toLocaleString();
	var postDt = postDtTm.split(",")[0];
	var postTm = postDtTm.split(" ")[1];

	if (postDtTm == "null") {
		postDt = " ";
		postTm = " ";
	}

	$("#testmasterId").val($("#labReqMstId" + count).val());
	$("#labReqSlvId").val($("#labReqSlvId" + count).val());
	$('#postDate').html(postDt);
	$('#postTime').html(postTm);
	$('#subSerId').val($("#subSerId" + count).val());
	$('#isPackageFlag').val($("#isPackageFlag" + count).val());
	// call viewLabResultDoctorDesk.
	showPopUpTestResult("labonclick");
}

/*
 * function emrComplaintPopUp(){ $('#viewEMRComplaintModal').modal(); }
 * 
 * function emrFindingPopUp(){ $('#viewEMRFindingModal').modal(); }
 * 
 * function emrQuePopUp(){ $('#viewEMRQueModal').modal(); }
 */

/*******************************************************************************
 * @author : Tushar
 * @date : 06-Mar-2018
 * @codeFor : Add Complaint to patient
 ******************************************************************************/
/*
 * function addComplaintToAssign(){ var id = $("#compId").val(); var testNm =
 * $("#complaint_byName").val();
 * 
 * var count = $("#cmpCount").val(); var divContent = "<tr>" + "<td class='col-md-1-1' style='height: 21.5px;'><div
 * class='TextFont'>"+(count)+".</div></td>" + "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='cmpNm"+(id)+"'><input
 * id='assignCmpVal_"+id+"' type='text' style='width: 100%;'
 * onClick='setIdForCompFind()' value='"+testNm+"' /></td>" + "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >" + "<input
 * type='checkbox' id='assignCmpId' value='"+id+"' ></td>" + "<input
 * type='hidden' id='CmpId"+(id)+"' value='"+id+"'></tr>";
 * 
 * $('#assignComplaintBody').append(divContent);
 * 
 * count++; $("#cmpCount").val(count);
 * $('input:checkbox[id=assignCmpId]').attr("checked", true);
 * 
 * $("#compId").val(""); $("#complaint_byName").val(""); }
 */
/*
 * function saveComplaintFinding(type){ var pId = 0; var treatId = 0; pId =
 * $("#patientId").text(); treatId= $("#tid").val(); if(pId == undefined || pId ==
 * null){ pId = 0; } if(treatId == undefined || treatId == null){ treatId = 0; }
 * var queryTypeforCmpFind = $("#queryTypeForComplaintFinding").val(); var
 * queryType = ""; if(queryTypeforCmpFind == "1"){ queryType = "insert"; }else{
 * queryType = "update"; }
 * 
 * var checkAnswer = []; if(type == 'complaint'){
 * $.each($('#assignCmpId:checked'), function() { var id = $(this).val(); var
 * name = $("#assignCmpVal_"+id).val(); var CmpId = $("#CmpId_"+id).val();
 * if(CmpId == "" || CmpId == undefined){ CmpId = 0; } var new_Cmp = id
 * +"#@#"+name+"#@#"+CmpId; checkAnswer.push(new_Cmp); }); if(checkAnswer ==
 * ""){ alert("Please Select Complaints to Add!"); return false; } }else{
 * $.each($('#assignFndId:checked'), function() { var id = $(this).val(); var
 * name = $("#assignFndVal_"+id).val(); var FndId = $("#FndId_"+id).val();
 * if(FndId == "" || FndId == undefined){ FndId = 0; } var new_Fnd = id
 * +"#@#"+name+"#@#"+FndId; checkAnswer.push(new_Fnd); }); if(checkAnswer ==
 * ""){ alert("Please Select Findings to Add!"); return false; } }
 * 
 * var complaint = ""; var comobj = { listComplaintFinding : [] };
 * 
 * for ( var i = 0; i < checkAnswer.length; i++) { if (checkAnswer[i] != "") {
 * var cmp_det = checkAnswer[i].split("#@#"); comobj.listComplaintFinding.push({
 * complaintFindingsId : cmp_det[0], complaintFindingsVal : cmp_det[1],
 * idEhatCompFindId : cmp_det[2], }); } } complaint = JSON.stringify(comobj);
 * 
 * var inputs = []; inputs.push('pId=' + pId); inputs.push('treatId=' +
 * treatId); inputs.push('checkAnswer=' + complaint); inputs.push('type='+
 * type); inputs.push('queryType='+ queryType); var str = inputs.join('&');
 * jQuery.ajax({ async : false, type : "POST", data : str + "&reqType=AJAX", url :
 * "ehat/doctordesk/saveComplaintFinding", error : function() { alert('Network
 * Issue!!!'); }, success : function(r) { if(type == 'complaint'){
 * $('#viewEMRComplaintModal').modal('hide'); }else{
 * $('#viewEMRFindingModal').modal('hide'); } if(r == 1){
 * alertify.success("Saved Successfully!"); }else{ alertify.success("Updated
 * Successfully!"); } FetchEMRAssignedCompFind(0); } }); }
 */

function FetchEMRAssignedCompFind(emrId) {
	// var emrId = 1;
	$("#emrQueBody").empty();
	var pId = 0;
	var treatId = 0;
	pId = $("#patientId").text();
	treatId = $("#tid").val();
	if (pId == undefined || pId == null) {
		pId = 0;
	}
	if (treatId == undefined || treatId == null) {
		treatId = 0;
	}

	var inputs = [];
	inputs.push('pId=' + pId);
	inputs.push('treatId=' + treatId);
	inputs.push('emrId=' + emrId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/doctordesk/fetchComplaintFinding",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					// alert(r);
					var ajaxResponse = r;
					var divContent = "";
					fetchEMRTempalets(0);
					for ( var i = 0; i < ajaxResponse.length; i++) {
						divContent = divContent
								+ "<div class='col-md-12-1' style='margin-top: 5px;'>Complaints & Clinical Findings:";
						+"<div class='col-md-12-1' id='divC" + (i + 1)
								+ "' style='border-bottom:1pt solid #ddd;'>";

						if (ajaxResponse[i].type == "complaint") {

							divContent = divContent
									+ "<textarea type='text' class='textComplaint"
									+ ajaxResponse[i].complaintFindingsId
									+ "' style='margin-top: 10px; margin-left: 50px; height: 100px; width: 610px;margin-bottom: 05px;' disabled='disabled'>";
							divContent = divContent + " "
									+ ajaxResponse[i].complaintFindingsVal
									+ "\n";
							divContent = divContent + "</textarea></div></div>";
						}
					}
					for ( var i = 0; i < ajaxResponse.length; i++) {
						divContent = divContent
								+ "<div class='col-md-12-1' style='margin-top: 5px;'> :";
						+"<div class='col-md-12-1' id='divC" + (i + 1)
								+ "' style='border-bottom:1pt solid #ddd;'>";

						if (ajaxResponse[i].type == "finding") {

							divContent = divContent
									+ "<textarea type='text' class='textComplaint"
									+ ajaxResponse[i].complaintFindingsId
									+ "' style='margin-top: 10px; margin-left: 50px; height: 100px; width: 610px;margin-bottom: 05px;' disabled='disabled'>";
							divContent = divContent + " "
									+ ajaxResponse[i].complaintFindingsVal
									+ "\n";
							divContent = divContent + "</textarea></div></div>";

						}
					}

					divContent = divContent
							+ "<input type='hidden' id='emrId' value='" + emrId
							+ "'>";

					var previousTemplate = $("#emrQueBody").html();
					divContent = divContent + previousTemplate;
					$("#emrQueBody").html(divContent);

				}
			});
}

/*
 * function addFindingToAssign(){ var id = $("#fingId").val(); var testNm =
 * $("#finding_byName").val();
 * 
 * var count = $("#fndCount").val(); var divContent = "<tr>" + "<td class='col-md-1-1' style='height: 21.5px;'><div
 * class='TextFont'>"+(count)+".</div></td>" + "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='fndNM"+(id)+"'><input
 * id='assignFndVal_"+id+"' type='text' style='width: 100%;'
 * onClick='setIdForCompFind()' value='"+testNm+"' /></td>" + "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >" + "<input
 * type='checkbox' id='assignFndId' value='"+id+"' ></td>" + "<input
 * type='hidden' id='FndId"+(id)+"' value='"+id+"'></tr>";
 * 
 * $('#assignFindingBody').append(divContent);
 * 
 * count++; $("#fndCount").val(count);
 * $('input:checkbox[id=assignFndId]').attr("checked", true);
 * 
 * $("#fingId").val(""); $("#finding_byName").val(""); }
 */

/*
 * function setIdForCompFind(){ $("#queryTypeForComplaintFinding").val(2); }
 */

// Finding master end
function setComplaitTemplates(type) {

	if (type == "complaint") {
		jQuery
				.ajax({
					async : true,
					type : "POST",
					url : "ehat/subObj/getAllComplaints",
					error : function() {
						alert('Network Issue!!!');
					},
					success : function(r) {
						$("#assignComplaintBody").empty();
						$("#emrComplaintBody").empty();
						var divContent = "";
						var textCount = 1;
						var ajaxResponse = r;
						for ( var i = 0; i < ajaxResponse.lstComplaints.length; i++) {
							divContent = divContent
									+ "<tr>"
									+ "<td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>"
									+ (i + 1)
									+ ".</div></td>"
									+ "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='cmpNm"
									+ (ajaxResponse.lstComplaints[i].complaintId)
									+ "'>"
									+ ajaxResponse.lstComplaints[i].complaintName
									+ "</td>"
									+ "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >"
									+ "<input type='checkbox' id='cmpId_"
									+ ajaxResponse.lstComplaints[i].complaintId
									+ "' value='"
									+ ajaxResponse.lstComplaints[i].complaintId
									+ "' onclick='sendComplaintToAssign("
									+ ajaxResponse.lstComplaints[i].complaintId
									+ ")'></td>"
									+ "<input type='hidden' id='CmpId"
									+ (i + 1) + "' value='"
									+ ajaxResponse.lstComplaints[i].complaintId
									+ "'></tr>";

						}
						$("#emrComplaintBody").append(divContent);
						assignComplaints();
						emrComplaintPopUp();
						if (ajaxResponse.length > 0) {
							$("#queryTypeForComplaintFinding").val(0);
						}

					}
				});
	} else {
		jQuery
				.ajax({
					async : true,
					type : "POST",
					url : "ehat/subObj/getAllFindings",
					error : function() {
						alert('Network Issue!!!');
					},
					success : function(r) {
						$("#assignFindingBody").empty();
						$("#emrFindingBody").empty();
						var divContent = "";
						var textCount = 1;
						var ajaxResponse = r;
						for ( var i = 0; i < ajaxResponse.lstFindings.length; i++) {
							divContent = divContent
									+ "<tr>"
									+ "<td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>"
									+ (i + 1)
									+ ".</div></td>"
									+ "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='fndNM"
									+ (ajaxResponse.lstFindings[i].findingId)
									+ "'>"
									+ ajaxResponse.lstFindings[i].findingName
									+ "</td>"
									+ "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >"
									+ "<input type='checkbox' id='fndId_"
									+ ajaxResponse.lstFindings[i].findingId
									+ "' value='"
									+ ajaxResponse.lstFindings[i].findingId
									+ "' onclick='sendFindingToAssign("
									+ ajaxResponse.lstFindings[i].findingId
									+ ")'></td>"
									+ "<input type='hidden' id='FndId"
									+ (i + 1) + "' value='"
									+ ajaxResponse.lstFindings[i].findingId
									+ "'></tr>";
						}
						$("#emrFindingBody").append(divContent);
						assignFindings();
						emrFindingPopUp();
						if (ajaxResponse.length > 0) {
							$("#queryTypeForComplaintFinding").val(0);
						}
					}
				});
	}
}
/*
 * function assignComplaints(){ var pId = 0; var treatId = 0; var emrId = 0; pId =
 * $("#patientId").text(); treatId= $("#tid").val(); if(pId == undefined || pId ==
 * null){ pId = 0; } if(treatId == undefined || treatId == null){ treatId = 0; }
 * 
 * var inputs = []; inputs.push('pId=' + pId); inputs.push('treatId=' +
 * treatId); inputs.push('emrId=' + emrId); var str = inputs.join('&');
 * jQuery.ajax({ async : false, type : "POST", data : str + "&reqType=AJAX", url :
 * "ehat/doctordesk/fetchComplaintFinding", error : function() { alert('Network
 * Issue!!!'); }, success : function(r) { var ajaxResponse = r; //var
 * result=JSON.parse(ajaxResponse); var divContent=""; var countc = 1; for(var
 * i=0;i<ajaxResponse.length;i++) { if(ajaxResponse[i].type == "complaint"){
 * divContent = "<tr>" + "<td class='col-md-1-1' style='height: 21.5px;'><div
 * class='TextFont'>"+countc+".</div></td>" + "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='cmpNM"+ajaxResponse[i].complaintFindingsId+"'><input
 * id='assignCmpVal_"+ajaxResponse[i].complaintFindingsId+"' type='text'
 * onClick='setIdForCompFind()' style='width: 100%;'
 * value='"+ajaxResponse[i].complaintFindingsVal+"' /></td>" + "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >" + "<input
 * type='checkbox' id='assignCmpId'
 * value='"+ajaxResponse[i].complaintFindingsId+"' onClick='setIdForCompFind()'></td>" + "<input
 * type='hidden' id='CmpId_"+(ajaxResponse[i].complaintFindingsId)+"'
 * value='"+ajaxResponse[i].complaintFindingsId+"'></tr>";
 * $('#assignComplaintBody').append(divContent); countc++; } }
 * $('input:checkbox[id=assignCmpId]').attr("checked", true); } }); }
 */
/*
 * function assignFindings(){ var pId = 0; var treatId = 0; var emrId = 0; pId =
 * $("#patientId").text(); treatId= $("#tid").val(); if(pId == undefined || pId ==
 * null){ pId = 0; } if(treatId == undefined || treatId == null){ treatId = 0; }
 * 
 * var inputs = []; inputs.push('pId=' + pId); inputs.push('treatId=' +
 * treatId); inputs.push('emrId=' + emrId); var str = inputs.join('&');
 * jQuery.ajax({ async : false, type : "POST", data : str + "&reqType=AJAX", url :
 * "ehat/doctordesk/fetchComplaintFinding", error : function() { alert('Network
 * Issue!!!'); }, success : function(r) { var ajaxResponse = r; //var
 * result=JSON.parse(ajaxResponse); var divContent=""; var countf = 1; for(var
 * i=0;i<ajaxResponse.length;i++) { if(ajaxResponse[i].type == "finding"){
 * divContent = "<tr>" + "<td class='col-md-1-1' style='height: 21.5px;'><div
 * class='TextFont'>"+countf+".</div></td>" + "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='fndNM"+ajaxResponse[i].complaintFindingsId+"'><input
 * id='assignFndVal_"+ajaxResponse[i].complaintFindingsId+"' type='text'
 * style='width: 100%;' value='"+ajaxResponse[i].complaintFindingsVal+"' /></td>" + "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >" + "<input
 * type='checkbox' id='assignFndId'
 * value='"+ajaxResponse[i].complaintFindingsId+"' ></td>" + "<input
 * type='hidden' id='FndId_"+(ajaxResponse[i].complaintFindingsId)+"'
 * value='"+ajaxResponse[i].complaintFindingsId+"' onClick='setIdForCompFind()'></tr>";
 * $('#assignFindingBody').append(divContent); countf++; } }
 * $('input:checkbox[id=assignFndId]').attr("checked", true); } }); }
 */

function fetchOncoEmrTemplates() {

	var idDocSpec = $("#selDocSpec").val();
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

/*
 * function setOncoEmrTemplates(type){ var emrId = 0; if(type=="sub"){ emrId =
 * 1; }else if(type=="obj"){ emrId = 2; } $("#subobjType").val(type); var tempId =
 * $("#iOncoEmrTemplates").val(); var selDocSpec = $("#selDocSpec").val(); var
 * iBodyPart = $("#iBodyPart").val(); var returnType = $("#pageName").val(); var
 * pId = $("#patientId").text(); var treatId = $("#tid").val();
 * 
 * var inputs = []; inputs.push('selDocSpec=' + selDocSpec);
 * inputs.push('iBodyPart=' + iBodyPart); inputs.push('tempId=' + tempId);
 * inputs.push('pId=' + pId); inputs.push('treatId=' + treatId);
 * inputs.push('emrId=' + emrId); var str = inputs.join('&'); jQuery.ajax({ type :
 * "POST", url : "ehat/doctordesk/setOncoEmrTemplates", data : str +
 * "&reqType=AJAX", error : function() { alert('Network Issue!!!'); }, success :
 * function(r) { var ajaxResponse = r; var divContent=""; var textCount = 1;
 * for(var i=0;i<ajaxResponse.lstQuestion.length;i++) { divContent=divContent+"<div
 * class='col-md-12-1' style='margin-top: 10px;'><div class='col-md-1-1'><h5>"+(i+1)+".</h5></div>" + "<div
 * class='col-md-11-1' id='divPi"+(i+1)+"'><h5>"+ajaxResponse.lstQuestion[i].question+"</h5></div></div><input
 * type='hidden' id='QueId"+(i+1)+"'
 * value='"+ajaxResponse.lstQuestion[i].question+"'>"
 * if(ajaxResponse.lstQuestion[i].questionType == "radio" ||
 * ajaxResponse.lstQuestion[i].questionType == "checkbox"){
 * 
 * divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>" + "<div
 * class='col-md-12-1' id='divCb"+(i)+"' style='border-bottom:1pt solid #ddd;'>"
 * var idque = ajaxResponse.lstQuestion[i].questionId; var a = 1; for ( var j =
 * 0; j < ajaxResponse.lstOption.length; j++) { var idopt =
 * ajaxResponse.lstOption[j].questionMasterId; if(idque == idopt){
 * if(ajaxResponse.lstQuestion[i].questionType == "radio"){
 * divContent=divContent+ "<label style='margin-top: 10px; margin-left:
 * 70px;'>"+a+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio'
 * class='radioAnswer "+a+"'
 * name='IdRadioAns"+ajaxResponse.lstQuestion[i].questionId+"'
 * id='IdRadioAns-"+ajaxResponse.lstOption[i].qsnOptionId+"' style='margin-top:
 * 10px; border-top:1pt solid
 * black;'>&nbsp;&nbsp;&nbsp;&nbsp;"+ajaxResponse.lstOption[j].optionName+"</input>&nbsp;&nbsp;" }
 * else{ divContent=divContent+ "<label style='margin-top: 10px; margin-left:
 * 70px;'>"+a+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox'
 * class='checkAnswer "+a+"'
 * name='IdCheckboxAns"+ajaxResponse.lstQuestion[i].questionId+"'
 * id='IdCheckboxAns-"+ajaxResponse.lstOption[i].qsnOptionId+"'
 * style='margin-top:
 * 10px;'>&nbsp;&nbsp;&nbsp;&nbsp;"+ajaxResponse.lstOption[j].optionName+"</input>&nbsp;&nbsp;" }
 * a++; } }
 * 
 * divContent=divContent+ "</div></div>"; } else
 * if(ajaxResponse.lstQuestion[i].questionType == "text"){
 * divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>" + "<div
 * class='col-md-12-1' id='divT"+(i+1)+"' style='border-bottom:1pt solid
 * #ddd;'>"; var idque = ajaxResponse.lstQuestion[i].questionId; for(var l=0;l<ajaxResponse.lstOption.length;l++){
 * var idopt = ajaxResponse.lstOption[l].questionMasterId; if(idque == idopt){
 * divContent=divContent+ "<textarea type='text' class='textAnswer
 * "+ajaxResponse.lstQuestion[i].questionId+"'
 * name='IdTextAns"+ajaxResponse.lstQuestion[i].questionId+"'
 * id='IdTextAns-"+textCount+"' value='' style='margin-top: 10px; margin-left:
 * 70px; height: 40px; width: 650px;'>"+ajaxResponse.lstOption[l].optionName+"</textarea><input
 * type='hidden' id ='ques_id"+textCount+"'
 * val="+ajaxResponse.lstQuestion[i].questionId+" /></div></div>"; } }
 * textCount++; } }
 * 
 * divContent=divContent+"<input type='hidden' id='emrId' value='"+tempId+"'><input
 * type='hidden' id='type' value='"+type+"'>";
 * $("#emrQuestionBody").html(divContent); emrQuePopUp(); } }); }
 */

/*
 * function sendComplaintToAssign(id){ var count = $("#cmpCount").val(); var
 * $radios = $('input:checkbox[id=cmpId_' +id+ ']'); if ($radios.is(':checked') ==
 * true) {
 * 
 * var testNm = $("#cmpNm" + id).html(); var divContent = "<tr>" + "<td class='col-md-1-1' style='height: 21.5px;'><div
 * class='TextFont'>"+(count)+".</div></td>" + "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='cmpNm"+(id)+"'><input
 * id='assignCmpVal_"+id+"' type='text' style='width: 100%;'
 * onClick='setIdForCompFind()' value='"+testNm+"' /></td>" + "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >" + "<input
 * type='checkbox' id='assignCmpId' value='"+id+"' ></td>" + "<input
 * type='hidden' id='CmpId"+(id)+"' value='"+id+"'></tr>";
 * 
 * $('#assignComplaintBody').append(divContent);
 * 
 * count++; $("#cmpCount").val(count); $('input:checkbox[id=cmpId_' + id +
 * ']').attr("checked", false);
 * $('input:checkbox[id=assignCmpId]').attr("checked", true); } }
 */

/*
 * function sendFindingToAssign(id){ var count = $("#fndCount").val(); var
 * $radios = $('input:checkbox[id=fndId_' +id+ ']'); if ($radios.is(':checked') ==
 * true) {
 * 
 * var testNm = $("#fndNM" + id).html(); var divContent = "<tr>" + "<td class='col-md-1-1' style='height: 21.5px;'><div
 * class='TextFont'>"+(count)+".</div></td>" + "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='fndNM"+(id)+"'><input
 * id='assignFndVal_"+id+"' type='text' style='width: 100%;'
 * onClick='setIdForCompFind()' value='"+testNm+"' /></td>" + "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >" + "<input
 * type='checkbox' id='assignFndId' value='"+id+"' ></td>" + "<input
 * type='hidden' id='FndId"+(id)+"' value='"+id+"'></tr>";
 * 
 * $('#assignFindingBody').append(divContent);
 * 
 * count++; $("#fndCount").val(count); $('input:checkbox[id=fndId_' + id +
 * ']').attr("checked", false);
 * $('input:checkbox[id=assignFndId]').attr("checked", true); } }
 */

/*
 * function saveEmrQueAns(){ var ehatEMRPatientTemplates = []; var pId =
 * $("#patientId").text(); var treatId= $("#tid").val(); var type =
 * $("#subobjType").val(); var emrId = 1; var optionChecked = [];
 * $('.radioAnswer:checked').map(function(){
 * optionChecked.push((this.id).split("-")[1]+"^"+$(this).attr('class').split("
 * ")[1]); var questionId = (this.id).split("-")[1]; var optionId =
 * $(this).attr('class').split(" ")[1]; var ehatEMRPatientTemplate = {
 * "patientId" : pId, "treatmentId" : treatId, "questionId" : questionId,
 * "textVal" : "-", "optionId" : optionId };
 * ehatEMRPatientTemplates.push(ehatEMRPatientTemplate); }); var checkAnswer =
 * []; $('.checkAnswer:checked').map(function(){
 * checkAnswer.push((this.id).split("-")[1]+"^"+$(this).attr('class').split("
 * ")[1]); var questionId = (this.id).split("-")[1]; var optionId =
 * $(this).attr('class').split(" ")[1]; var ehatEMRPatientTemplate = {
 * "patientId" : pId, "treatmentId" : treatId, "questionId" : questionId,
 * "textVal" : "-", "optionId" : optionId };
 * ehatEMRPatientTemplates.push(ehatEMRPatientTemplate); });
 * 
 * var textAnswerLength=$('.textAnswer').length+1; var textAnswer=[]; var
 * questionId = 0; for(var i=1;i<textAnswerLength;i++){ if(type == "sub"){
 * questionId=$('#IdTextAns-'+i).attr('class').split(" ")[1]; } var
 * text=$('#IdTextAns-'+i).val(); if(text!=null && text!="" && text!="-"){
 * textAnswer.push(questionId+"^"+text+"~"); var ehatEMRPatientTemplate = {
 * "patientId" : pId, "treatmentId" : treatId, "questionId" : questionId,
 * "textVal" : text, "optionId" : 0 };
 * ehatEMRPatientTemplates.push(ehatEMRPatientTemplate); } }
 * 
 * jQuery.ajax({ type : "POST", contentType : 'application/json; charset=utf-8',
 * url : "ehat/doctordesk/saveEmrQueAns", data :
 * JSON.stringify(ehatEMRPatientTemplates), //str + "&reqType=AJAX", error :
 * function() { alert('Network Issue!!!'); }, success : function(r) { if(r ==
 * 1){ alertify.success("Saved Successfully!"); }else{ alertify.success("Updated
 * Successfully!"); } $('#viewEMRQueModal').modal('hide');
 * fetchEMRTempalets(emrId); FetchEMRAssignedCompFind(0); } }); }
 */
/*******************************************************************************
 * function fetchEMRTempalets(emrId){ //var emrId = 1; $("#emrQueBody").empty();
 * var pId = $("#patientId").text(); var treatId= $("#tid").val();
 * 
 * var inputs = []; inputs.push('pId=' + pId); inputs.push('treatId=' +
 * treatId); inputs.push('emrId=' + emrId); var str = inputs.join('&');
 * jQuery.ajax({ type : "POST", url : "ehat/doctordesk/fetchEMRTemplate", data :
 * str + "&reqType=AJAX", error : function() { alert('Network Issue!!!'); },
 * success : function(r) { var ajaxResponse1 = r;
 * 
 * var ajaxResponse = JSON.stringify(ajaxResponse1); var divContent=""; var
 * textCount = 1; for(var i=0;i<ajaxResponse[i].length;i++) { for(var j=0;j<ajaxResponse.map[j].length;j++) {
 * divContent=divContent+"<div class='col-md-12-1' style='margin-top: 10px;'><div
 * class='col-md-1-1'>
 * <h5>"+(i)+".</h5>
 * </div>" + "<div class='col-md-11-1' id='divPi"+(i)+"'>
 * <h5>"+ajaxResponse.map[j].qname+"</h5>
 * </div>" + +"</div><input type='hidden' id='QueId"+(i)+"'
 * value='"+ajaxResponse.map[j].qname+"'>";
 * 
 * 
 * if(ajaxResponse.questionType == "radio" || ajaxResponse.questionType ==
 * "checkbox"){ divContent=divContent+ "<div class='col-md-12-1'
 * style='margin-top: 5px;'>" + "<div class='col-md-12-1' id='divCb"+(i)+"'
 * style='border-bottom:1pt solid #ddd;'>" var a = 1; for ( var j = 0; j <
 * ajaxResponse.listOption.length; j++) { if(ajaxResponse.questionId ==
 * ajaxResponse.listOption[j].qsnOptionId){ if(ajaxResponse.questionType ==
 * "radio"){ divContent=divContent+ "<label style='margin-top: 10px;
 * margin-left: 70px;'>"+a+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input
 * type='radio' class='radioAnswer "+a+"'
 * name='IdRadioAns"+ajaxResponse.questionId+"'
 * id='IdRadioAns-"+ajaxResponse.listOption[j].qsnOptionId+"' style='margin-top:
 * 10px; border-top:1pt solid
 * black;'>&nbsp;&nbsp;&nbsp;&nbsp;"+ajaxResponse.listOption[j].optionName+"</input>&nbsp;&nbsp;"; }
 * else{ divContent=divContent+ "<label style='margin-top: 10px; margin-left:
 * 70px;'>"+a+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox'
 * class='checkAnswer "+a+"' name='IdCheckboxAns"+ajaxResponse.questionId+"'
 * id='IdCheckboxAns-"+ajaxResponse.listOption[j].qsnOptionId+"'
 * style='margin-top:
 * 10px;'>&nbsp;&nbsp;&nbsp;&nbsp;"+ajaxResponse.listOption[j].optionName+"</input>&nbsp;&nbsp;"; }
 * a++; } }
 * 
 * divContent=divContent+ "</div></div>"; } else if(ajaxResponse.questionType ==
 * "text"){ divContent=divContent+ "<div class='col-md-12-1' style='margin-top:
 * 5px;'>" + "<div class='col-md-12-1' id='divT"+(i+1)+"'
 * style='border-bottom:1pt solid #ddd;'>"; for(var l=0;l<ajaxResponse.listOption.length;l++){
 * if(ajaxResponse.listOption[l].qsnOptionId == 0){ divContent=divContent+ "<textarea
 * type='text' class='textAnswer "+ajaxResponse.questionId+"'
 * name='IdTextAns"+ajaxResponse.questionId+"' id='IdTextAns-"+textCount+"'
 * value='' style='margin-top: 10px; margin-left: 70px; height: 40px; width:
 * 650px;'>"+ajaxResponse.listOption[l].optionName+"</textarea><input
 * type='hidden' id ='ques_id"+textCount+"' val="+ajaxResponse.questionId+" /></div></div>"; } }
 * textCount++; } } } divContent=divContent+"<input type='hidden' id='emrId'
 * value='"+emrId+"'><input type='hidden' id='type' value='"+type+"'>";
 * $("#emrQueBody").html(divContent); } }); }
 * 
 * /************
 * 
 * @author : Pooja SUkre
 * @date : 5-Mar-2018
 * @codeFor : Templates For Advice Tab.
 ******************************************************************************/
function setTime() {

	$('#advSimTime').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
	$('#advTrtTime').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});
}

function temForSurgeryAdvice(id) {
	var cancerOnOff = $("#cancerOnOff").val();
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="active" onclick=temForSurgeryAdvice("id"),fetchAdvice(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationName();setNewtempAdvice(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices" style="background-color: rgb(248, 196, 113);">Surgery Advice</a>'
			+ '</li>';

	if (cancerOnOff == "on") {
		temp = temp
				+ '<li id="RadioTherapyList" class="">'
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
				+ '</li>';
	}

	temp = temp
			+ '</ul>'
			+ '<div class="tab-content col-md-10-1" style="margin-top: 10px;">'
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
			+ '<input id="idRadical" type="checkbox" name="sergeryFlagChk">'
			+ '</label>'
			+ '<label>Palliative:'
			+ '<input id="idPalliative" type="checkbox" name="sergeryFlagChk">'
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
			+ '<input type="text" onclick="displayCalendar(document.getElementById(\'adviceDate\'),\'dd/mm/yyyy\',this)" onchange="checkFutureDate(\'surgaryAdvice\')" class="form-control input-SmallText" readonly="readonly" placeholder="Date" id="adviceDate">'
			+ '</div>'
			+ '</div>'
			+ '<div class="col-md-12-1 center">'
			+ '<div class="divide-10"></div>'
			+ '<div class="divide-20"></div>'
			+ '<input class="btn btn-xs btn-success editUserAccess" type="button" onclick="saveAdvice()" value="Save">'
			+ '<input class="btn btn-xs btn-primary" type="button" onclick="newAdvice()" value="New Surgery" style="margin-left: 10px;">'
			+ '</div>'
			+ '<input id="adviceQueryType" type="hidden" value="insert">'
			+ '</div>'
			+ '<div class="col-md-8-1" style="margin-left: 1%; margin-top: 0px; width: 600px;">'
			+ '<div class="">'
			+ '<table class="table table-bordered table-condensed">'
			+ '<thead>'
			+ '<tr>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont"># </div>'
			+ '</th>'
			+ '<th class="col-md-2-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont"> Name</div>'
			+ '</th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Date</div>'
			+ '</th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Edit</div>'
			+ '</th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Delete</div>'
			+ '</th>'
			+ '</tr>'
			+ '</thead>'
			+ '</table>'
			+ '</div>'
			+ '<div class="" style="margin-top: -21px; height: 372px; max-height: auto; border: 1px solid #b8b8b8; overflow-y: scroll;">'
			+ '<table class="table table-striped table-condensed cf">'
			+ '<tbody id="viewAdvicesTemp"></tbody>' + '</table>' + '</div>'
			+ '</div>' + '</div>' + '</div>' + '</div>'

			+ '</div>' + '</div>' + '</div>' + '</div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);

}

function temForRadioTherapy(id) {
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="" onclick=temForSurgeryAdvice("id"),fetchAdvice(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationName();setNewtempAdvice(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices">Surgery Advice</a>'
			+ '</li>'
			+ '<li id="RadioTherapyList" class="active" onclick=fectchRadiationMaster("IPDDoctorStation");fectchAllRadiotherapy("pageType");temForRadioTherapy("id");setNewtempAdvice(this.id);>'
			+ '<a data-toggle="tab" href="#RadioTherapy" style="background-color: rgb(248, 196, 113);">Radiotherapy</a>'
			+ '</li>'
			+ '<li id="ChemotherapyList">'
			+ '<a data-toggle="tab" href="#Chemotherapy" onclick=temForChemoTherapy("id"),fetchChemotherapyPatientDataMaster("onload");setNewtempAdvice(this.id);>Chemotherapy</a>'
			+ '</li>'
			+ '<li id="PalliativeCareList">'
			+ '<a data-toggle="tab" href="#PalliativeCare" onclick=fetchCareAdvices("Care");temForCareAdvices("careAdvices");setNewtempAdvice(this.id);>Care Advices</a>'
			+ '</li>'
			+ '<li id="PlanOFTreatmentList">'
			+ '<a data-toggle="tab" href="#PlanOFTreatment" onclick=temForPlanOfAdvice("id"),fetchPlanTreat();setNewtempAdvice(this.id);>Plan Of Treatment</a>'
			+ '</li>'
			+ '</ul>'
			+ '<div class="tab-content col-md-10-1" style="margin-top: 10px;">'
			+ '<div id="RadioTherapy" class="col-md-12-1 tab-pane fade">'
			+ '<div class="col-md-12-1" style="padding-top: 5px;">'
			+ '<div id="row1Radiotherapy" class="col-md-12-1" style="margin: 0px;">'
			+ '<input id="radiotherapyId" type="hidden" value="0">'
			+ '<div class="col-md-12-1" style="margin-left: 10px;">'
			+ '<div class="divide-10"></div>'
			+ '<h4 id="radioHead" align="center">Add Radiotherapy Advice</h4>'
			+ '<div class="divide-10"></div>'
			+ '<div class="col-md-12-1" style="margin-top: 8px;">'
			+ '<div class="col-md-6-1">'
			+ '<div class="col-md-4-1">'
			+ '<label>Serum Creatinine:'
			// +'<b style="color: red; padding-left: 2px;">*</b>'
			+ '</label>'
			+ '</div>'
			+ '<div class="col-md-7-1">'
			+ '<input id="serum_creatine" class="form-group form-control input-SmallText " type="text" placeholder="Serum Creatine">'
			+ '</div>'
			+ '</div>'
			+ '<div class="col-md-6-1">'
			+ '<div class="col-md-4-1">'
			+ '<label>Radiation Technique:'
			+ '<b style="color: red; padding-left: 2px;">*</b>'
			+ '</label>'
			+ '</div>'
			+ '<div class="col-md-8-1">'
			+ '<select id="radiationId" class="form-control input-SmallText TextFont" name="">'
			+ '</select>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '<div class="divide-10"></div>'
			+ '<div class="col-md-12-1" style="margin-top: 5px;">'
			+ '<div class="col-md-2-1">'
			+ '<label>Risk Factor:</label>'
			+ '</div>'
			+ '<div id="riskFactorDiv" class="col-md-4-1">'
			+ '<textarea id="riskFactor" class="form-control" style="width: 240px; height: 66px;" type="text" rows="2" cols="10" placeholder="Risk Factors"></textarea>'
			+ '</div>'
			+ '<div class="col-md-6-1" style="margin-left: 00px; margin-top: 00px;">'
			+ '<label>NeoAdjuvant:'
			+ '<input id="idNeoAdjv" type="checkbox" name="radiationFlagChk">'
			+ '</label>'
			+ '<label>Adjuvant:'
			+ '<input id="idAdjv" type="checkbox" name="radiationFlagChk">'
			+ '</label>'
			+ '<label>Radical :'
			+ '<input id="idRadInt" type="checkbox" name="radiationFlagChk">'
			+ '</label>'
			+ '<label>Palliative:'
			+ '<input id="idRadPall" type="checkbox" name="radiationFlagChk">'
			+ '</label>'
			+ '<label>BrachyTherapy:'
			+ '<input id="idBranchyTheropy" type="checkbox" name="radiationFlagChk">'
			+ '</label>'
			+ '<label>Concomitant Chemotherapy:'
			+ '<input id="idConChemo" type="checkbox" onclick="chemoPopUp();" name="radiationFlagChk">'
			+ '</label>'
			+ '</div>'
			+ '</div>'
			+ '<div class="divide-10"></div>'
			+ '<div class="col-md-12-1" style="margin-top: 25px;">'
			+ '<div class="col-md-2-1">'
			+ '<label>Instructions:</label>'
			+ '<button class="btn btn-xs btn-primary" data-keyboard="false" data-backdrop="static" data-target="#iPackage" data-toggle="modal" onclick="fetchReportInstruction();" type="button">Add Instruction</button>'
			+ '</div>'
			+ '<div id="instructions" class="col-md-10-1">'
			+ '<textarea id="instructionsRadio" class="form-control" type="text" rows="2" cols="10" placeholder="Instruction"></textarea>'
			+ '</div>'
			+ '</div>'
			+ '<div class="divide-10"></div>'
			+ '<div class="col-md-12-1" style="margin-top: 25px;">'
			+ '<div class="col-md-6-1">'
			+ '<div class="col-md-4-1">'
			+ '<label>Adviced Simulation Date:</label>'
			+ '</div>'
			+ '<div class="divide-10"></div>'
			+ '<div class="col-md-4-1">'
			+ '<input id="adviceDate2" class="form-control input-SmallText" type="text" onclick="displayCalendar(document.getElementById(\'adviceDate2\'),\'dd/mm/yyyy\',this)" onchange="checkPrevCurrDate(\'RadioTherapy\')" readonly="readonly" placeholder="Date">'
			+ '</div>'
			+ '<div class="divide-10"></div>'
			+ '<div class="col-md-4-1">'
			+ '<input id="advSimTime" class="form-control input-SmallText col-md-10-1" type="text" name="time" placeholder="Time" onclick="setTime()" readonly="readonly">'
			+ '</div>'
			+ '</div>'
			+ '<div class="col-md-6-1">'
			+ '<div class="col-md-4-1">'
			+ '<label>Adviced Treatment Date:</label>'
			+ '</div>'
			+ '<div class="divide-10"></div>'
			+ '<div class="col-md-4-1">'
			+ '<input id="adviceDateTreatment" class="form-control input-SmallText" type="text" onclick="displayCalendar(document.getElementById(\'adviceDateTreatment\'),\'dd/mm/yyyy\',this)" onchange="checkFutureDate(\'RadioTherapy\')" readonly="readonly" placeholder="Date">'
			+ '</div>'
			+ '<div class="divide-10"></div>'
			+ '<div class="col-md-4-1">'
			+ '<input id="advTrtTime" class="form-control input-SmallText col-md-10-1" type="text" name="time" placeholder="Time" onclick="setTime()" readonly="readonly">'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '<div class="col-md-12-1 center" style="margin-top: 10px;">'
			+ '<input class="btn btn-xs btn-success editUserAccess" type="button" onclick=saveRadiotherapy("ipd") value="Save">'
			+ '<input class="btn btn-xs btn-primary" type="button" onclick="newRadiotherapy()" value="New" style="margin-left: 10px;">'
			+ '</div>'
			+ '<input id="adviceQueryType" type="hidden" value="insert">'
			+ '</div>'
			+ '</div>'
			+ '<div id="iPackage" class="modal fade in" tabindex="-1">'
			+ '<div class="modal-dialog">'
			+ '<div class="modal-content col-md-12" style="margin-top: 0px; margin-left: 0px; margin-top: 25px;">'
			+ '<div class="modal-header">'
			+ '<h4 id="testHead">Add Instruction:</h4>'
			+ '<div style="margin-top: 0px;">'
			+ '<button id="cancel" class="btn btn-xs btn-default" onclick="" data-dismiss="modal" style="margin-left: 790px;">Cancel</button>'
			+ '</div>'
			+ '</div>'
			+ '<div class="divide-10"></div>'
			+ '<div id="instructionsHeaderRadio" class="col-sm-12-1">'
			+ '<table class="table table-bordered table-condensed">'
			+ '<thead>'
			+ '<tr>'
			+ '<th class="col-md-1-1 center">#</th>'
			+ '<th class="col-md-10-1 center">Instructions</th>'
			+ '<th class="col-md-1-1 center">'
			+ '<button class="btn btn-xs btn-success editUserAccess" onclick="saveToInstructionRadiotherapy()">Save</button>'
			+ '</th>'
			+ '</tr>'
			+ '</thead>'
			+ '</table>'
			+ '</div>'
			+ '<div id="instructionTableColumnsRadio" class="col-sm-12-1" style="margin-top: -21px; height: 372px; max-height: auto; border: 1px solid #b8b8b8; overflow-y: scroll;">'
			+ '<table class="table table-striped table-condensed">'
			+ '<tbody id="TreatmentInstructionTempRadio">'
			+ '</table>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 5px;">'
			/*
			 * +'<ul id="radiologyTab" class="nav nav-tabs" style="height: 40px;">' +'<li id="NewList" class="active">' +'<a
			 * data-toggle="tab" href="#row2Radiotherapy">New</a>' +'</li>' +'<li id="PreviousList">' +'<a
			 * data-toggle="tab" href="#PreviousRadiotherapyList">Previous</a>' +'</li>' +'</ul>'
			 */
			+ '<div class="tab-content col-md-12-1" style="margin-top: 0px;">'
			+ '<div id="row2Radiotherapy" class="col-md-12-1 tab-pane fade in active" style="margin-top: 40px; margin-left: 00px;">'
			+ '<div class="col-sm-12-1">'
			+ '<table class="table table-bordered table-condensed">'
			+ '<thead>'
			+ '<tr>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">#</div>'
			+ '</th>'
			+ '<th class="col-md-2-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Serum Creatine</div>'
			+ '</th>'
			+ '<th class="col-md-2-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Radiation Technique</div>'
			+ '</th>'
			+ '<th class="col-md-2-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Adviced Simulation Date & Time</div>'
			+ '</th>'
			+ '<th class="col-md-2-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Adviced Treatment Date & Time</div>'
			+ '</th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Edit</div>'
			+ '</th>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Delete</div>'
			+ '</th>'
			+ '</tr>'
			+ '</thead>'
			+ '</table>'
			+ '</div>'
			+ '<div class="col-sm-12-1" style="margin-top: -21px; height: 150px; max-height: auto; border: 1px solid #b8b8b8; overflow-y: scroll;">'
			+ '<table class="table table-striped table-condensed cf">'
			+ '<tbody id="viewRadioTemp">'
			+ '</tbody>'
			+ '</table>'
			+ '</div>'
			+ '</div>'
			+ '<div id="PreviousRadiotherapyList" class="col-md-12-1 tab-pane fade" style="margin-top: 40px; margin-left: 00px;">'
			+ '<div class="col-sm-12-1">'
			+ '<table class="table table-bordered table-condensed">'
			+ '<thead>'
			+ '<tr>'
			+ '<th class="col-md-1-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">#</div>'
			+ '</th>'
			+ '<th class="col-md-2-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Serum Creatine</div>'
			+ '</th>'
			+ '<th class="col-md-2-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Radiation Technique</div>'
			+ '</th>'
			+ '<th class="col-md-2-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Adviced Simulation Date & Time</div>'
			+ '</th>'
			+ '<th class="col-md-2-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Adviced Treatment Date & Time</div>'
			+ '</th>'
			+ '</tr>'
			+ '</thead>'
			+ '</table>'
			+ '</div>'
			+ '<div class="col-sm-12-1" style="margin-top: -21px; height: 150px; max-height: auto; border: 1px solid #b8b8b8; overflow-y: scroll;">'
			+ '<table class="table table-striped table-condensed cf">'
			+ '<tbody id="viewRadioTempPrev"> </tbody>'
			+ '</table>'
			+ '</div>'
			+ '</div>'
			+ '<div id="testIDDiv" class="form-group Remove-Padding col-md-12-1" style="display: none;">'
			+ '<div class="divide-20"></div>'
			+ '<div class="col-md-4-1 ">'
			+ '<label>Radiotherapy ID:</label>'
			+ '</div>'
			+ '<div class="col-md-8-1 center">'
			+ '<input id="radioId" class="form-group form-control input-SmallText " type="text" readonly="readonly">'
			+ '</div>' + '</div>' + '</div>'
			+ '<div id="iPackage" class="modal fade in" tabindex="-1"> </div>'
			+ '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);
}

function temForChemoTherapy(id) {
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="" onclick=temForSurgeryAdvice("id"),fetchAdvice(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationName();setNewtempAdvice(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices">Surgery Advice</a>'
			+ '</li>'
			+ '<li id="RadioTherapyList" onclick=fectchRadiationMaster("IPDDoctorStation");fectchAllRadiotherapy("pageType");temForRadioTherapy("id");setNewtempAdvice(this.id);>'
			+ '<a data-toggle="tab" href="#RadioTherapy" style="background-color: rgb(248, 196, 113);">Radiotherapy</a>'
			+ '</li>'
			+ '<li id="ChemotherapyList" class="active">'
			+ '<a data-toggle="tab" href="#Chemotherapy" onclick=temForChemoTherapy("id"),fetchChemotherapyPatientDataMaster("onload");setNewtempAdvice(this.id);>Chemotherapy</a>'
			+ '</li>'
			+ '<li id="PalliativeCareList">'
			+ '<a data-toggle="tab" href="#PalliativeCare" onclick=fetchCareAdvices("Care");temForCareAdvices("careAdvices");setNewtempAdvice(this.id);>Care Advices</a>'
			+ '</li>'
			+ '<li id="PlanOFTreatmentList">'
			+ '<a data-toggle="tab" href="#PlanOFTreatment" onclick=temForPlanOfAdvice("id"),fetchPlanTreat();setNewtempAdvice(this.id);>Plan Of Treatment</a>'
			+ '</li>'
			+ '</ul>'
			+ '<div id="Chemotherapy" class="col-md-10-1 tab-pane fade" style="margin-top: 10px;">'
			+ '<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<input id="chemoAuto"  style="margin-left: -40px" maxlength="120" name="chemoAuto" onkeypress=getChemoProtocol(this.id,"IPD"); onblur=addChemoToAssignOnAuto("Proto"); autocomplete="off" placeholder="Enter Chemotherapy"/>'
			+ '<label id="" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" class="btn" onclick="allSetNew();"> <i class="fa fa-trash-o"></i> Remove </label> '
			+ '<button type="button" id="HistoryChemo"onclick="fetchPatientChemoHistory()"class="btn btn-xs btn-warning">History</button> '
			// +'<label id="" style="padding-top: 0px; margin-right: 20px;
			// margin-bottom: -5px;" class="btn"
			// onclick=saveChemotherapy("chemoMaster");> <i class="fa
			// fa-save"></i> Save As New </label>'
			// +'<button type="button" id=""
			// onclick="fetchPatientChemoHistory()" class="btn btn-xs
			// btn-warning" style="margin-left: 00px">History</button>'
			+ '<div class="col-md-1-1" style="margin-top: 00px;">'
			// +'<input id="chemoAuto" style="margin-left: 300px"
			// maxlength="120" name="chemoAuto"
			// onkeypress=getChemoProtocol(this.id,"IPD");
			// onkeydown=addChemoToAssign("Proto"); autocomplete="off" ">'
			+ '<input id="chemoDate" style="margin-left: 700px" class="form-control input-SmallText" type="text" onclick=displayCalendar(document.getElementById("chemoDate"),"dd/mm/yyyy",this); onchange=fetchChemotherapyPatientDataMaster("date");fetchPatChemoOrderSheet("chemo") readonly="readonly" placeholder="Date"> </div>'
			+ '<button type="button" id="ichemoDate" onclick=savePatientChemotherapy("IPDDesk");savePatientOrderSheet("OrderSheet"); class="btn btn-xs btn-success" style="margin-left: 515px">Save</button> '
			+ '<button id="ipdChemoRound" onclick="printChem()" data-placement="left" data-toggle="tooltip"'
			+ '	class="btn btn-xs btn-warning" data-original-title="Print "><i class="fa fa-print"></i></button></div>'
			+ '<div class="col-md-12-1" style="margin-top: 10px; margin-left: 10px;">'
			+ '<div class="col-md-6-1" style="height: 10px; margin-left: 0px; margin-top: 30px;">'
			+ '<div class="col-md-4-1"> <label>Chemotherapy Protocol:</label> 	</div>'
			+ '<div class="col-md-8-1"> '
			+ '<input class="col-md-11-1" name="txtChemotherapyName" id="iChemotherapyName" maxlength="120" style="margin-top: -5px;" onkeypress=setAutoChemotherapy("iChemotherapyName", "onload", "Chemotherapy")></div> </div>'
			+ '<div class="col-md-6-1" style="height: 10px; margin-left: 0px; margin-top: 30px;">'
			+ '<div class="col-md-4-1"> <label>Indication:</label> </div>'
			+ '<div class="col-md-8-1"> <input class="col-md-11-1" name="txtIndication" id="iIndication" maxlength="120" style="margin-top: -5px;"> </div> </div>'
			+ '<div class="col-md-6-1" style="height: 10px; margin-left: 0px; margin-top: 30px;">'
			+ '<div class="col-md-3-1"> <label>Weight(Kg):</label> </div>'
			+ '<div class="col-md-3-1"> <input class="col-md-12-1" name="txtWeight" id="iWeight" style="margin-top: -5px;"> </div>'
			+ '<div class="col-md-3-1" style="margin-left: 90px;"> <label>Height(cm):</label> </div>'
			+ '<div class="col-md-3-1"> <input class="col-md-12-1" name="txtHeight" id="iHeight" style="margin-top: -5px;" onblur="calculateBSA()"> </div> </div>'
			+ '<div class="col-md-6-1" style="height: 10px; margin-left: 0px; margin-top: 30px;">'
			+ '<div class="col-md-3-1"> <label>BSA:</label> </div>'
			+ '<div class="col-md-3-1"> <input class="col-md-12-1" name="txtBSA" id="iBSA" style="margin-top: -5px;"> </div>'
			+ '<div class="col-md-3-1" style="margin-left: 90px;"> <label>Blood Orders:</label> </div>'
			+ '<div class="col-md-3-1"> <input class="col-md-12-1" name="txtBloodOrders" id="iBloodOrders" style="margin-top: -5px;"> </div> </div>'
			+ '<div class="col-md-6-1" style="height: 10px; margin-left: 0px; margin-top: 30px;">'
			+ '<div class="col-md-3-1"> <label>Allergies:</label> </div>'
			+ '<div class="col-md-3-1"> <input class="col-md-12-1" name="txtAllergies" id="iAllergies" style="margin-top: -5px;"> </div>'
			+ '<div class="col-md-3-1" style="margin-left: 90px;"> <label>History:</label> </div>'
			+ '<div class="col-md-3-1"> <input class="col-md-12-1" name="txtHistory" id="iHistory" style="margin-top: -5px;"> </div> </div>'
			+ '<div class="col-md-6-1" style="height: 10px; margin-left: 0px; margin-top: 30px;">'
			+ '<div class="col-md-3-1"> <label>Frequency:</label> </div>'
			+ '<div class="col-md-3-1"> <input class="col-md-12-1" name="txtFrequency" id="iFrequency" style="margin-top: -5px;"> </div>'
			+ '<div class="col-md-3-1" style="margin-left: 90px;"> <label>Number of Cycles:</label> </div>'
			+ '<div class="col-md-3-1"> <input class="col-md-12-1" name="txtNumberOfCycles" id="iNumberOfCycles" style="margin-top: -5px;"> </div> </div>'
			+ '<div class="col-md-6-1" style="height: 60px; margin-left: 0px; margin-top: 30px;">'
			+ '<div class="col-md-4-1"> <label>Dose:</label> </div>'
			+ '<div class="col-md-8-1"> <textarea class="col-md-11-1" name="txtDose" id="iDose" style="margin-top: -5px; height: 110px;"></textarea> </div> </div>'
			+ '<div class="col-md-6-1" style="height: 60px; margin-left: 0px; margin-top: 30px;">'
			+ '<div class="col-md-4-1"> <label>Investigations:</label> </div>'
			+ '<div class="col-md-8-1"> <textarea class="col-md-11-1" name="txtInvestigation" id="iInvestigation" style="margin-top: -5px; height: 110px;"></textarea> </div> </div>'
			+ '<div class="col-md-6-1" style="height: 60px; margin-left: 0px; margin-top: 60px;">'
			+ '<div class="col-md-4-1"> <label>Chemo Orders:</label> </div>'
			+ '<div class="col-md-8-1"> <textarea class="col-md-11-1" name="txtDrugOrder" id="iDrugOrder" style="margin-top: -5px; height: 110px;"></textarea> </div> </div>'
			+ '<div class="col-md-6-1" style="height: 60px; margin-left: 0px; margin-top: 60px;">'
			+ '<div class="col-md-4-1"> <label>Post-Medications:</label> </div>'
			+ '<div class="col-md-8-1"> <textarea class="col-md-11-1" name="txtPostMedications" id="iPostMedications" style="margin-top: -5px; height: 110px;"></textarea> </div> </div>'
			+ '<div class="col-md-6-1" style="height: 60px; margin-left: 0px; margin-top: 60px;">'
			+ '<div class="col-md-4-1"> <label>Post Chemo Advise:</label> </div>'
			+ '<div class="col-md-8-1"> <textarea class="col-md-11-1" name="txtPostChemoAdvice" id="iPostChemoAdvice" style="margin-top: -5px; height: 110px;"></textarea> </div> </div>'
			+ '<div class="col-md-6-1" style="height: 60px; margin-left: 0px; margin-top: 60px;">'
			+ '<div class="col-md-4-1" style="margin-top: -19px;"> <label>Next Blood Test Date:</label> </div>'
			+ '<div class="col-md-4-1" style="margin-top: -19px;"> <input id="nextBloodDate" class="form-control input-SmallText" type="text" onclick=displayCalendar(document.getElementById("nextBloodDate"),"dd/mm/yyyy",this); onchange=checkPrevCurrDate("Chemotherapy"); readonly="readonly" placeholder="Date"> </div>'
			+ '<div class="col-md-5-1" style="margin-top: 10px;"> </div>'
			+ '<div class="col-md-4-1" style="margin-top: 10px; margin-left:-42%;"> <label>Next Chemo Date:</label> </div>'
			+ '<div class="col-md-4-1" style="margin-top: 10px; margin-left:-9%;">'
			+ '<input id="nextChemoDate" class="form-control input-SmallText" type="text" onclick=displayCalendar(document.getElementById("nextChemoDate"),"dd/mm/yyyy",this); onchange=checkPrevCurrDate("Chemotherapy"); readonly="readonly" placeholder="Date"> </div>'
			+ '<div class="col-md-5-1" style="margin-top: 10px;"></div>'
			+ '<div class="col-md-4-1" style="margin-top: 10px; margin-left:-42%"> <label>Next Visit Date:</label> </div>'
			+ '<div class="col-md-4-1" style="margin-top: 10px; margin-left:-9%;"> <input id="nextVisitDate" class="form-control input-SmallText" type="text" onclick=displayCalendar(document.getElementById("nextVisitDate"),"dd/mm/yyyy",this); onchange=checkPrevCurrDate("Chemotherapy"); readonly="readonly" placeholder="Date"> </div>'
			+ '<div class="col-md-5-1" style="margin-top: 10px;"> </div>'
			+ '</div> <div class="divide-10"></div>'
			+ '</div></div></form><br>'
			+ '<input type="hidden" id="chemoId" value="0" />'
			+ '<input type="hidden" id="orderSheet" value="0" />'
			+ '<div class="divide-10"></div></div></div></div></div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);
}

function temForCareAdvices(id) {
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="" onclick=temForSurgeryAdvice("id"),fetchAdvice(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationName();setNewtempAdvice(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices">Surgery Advice</a>'
			+ '</li>'
			+ '<li id="RadioTherapyList" class="">'
			+ '<a data-toggle="tab" href="#RadioTherapy" onclick=fectchRadiationMaster("IPDDoctorStation");fectchAllRadiotherapy("pageType");temForRadioTherapy("id");setNewtempAdvice(this.id);>Radiotherapy</a>'
			+ '</li>'
			+ '<li id="ChemotherapyList">'
			+ '<a data-toggle="tab" href="#Chemotherapy" onclick=temForChemoTherapy("id"),fetchChemotherapyPatientDataMaster("onload");setNewtempAdvice(this.id);>Chemotherapy</a>'
			+ '</li>'
			+ '<li id="PalliativeCareList" class="active" onclick=fetchCareAdvices("Care");temForCareAdvices("careAdvices");setNewtempAdvice(this.id);>'
			+ '<a data-toggle="tab" href="#PalliativeCare" style="background-color: rgb(248, 196, 113);">Care Advices</a>'
			+ '</li>'
			+ '<li id="PlanOFTreatmentList">'
			+ '<a data-toggle="tab" href="#PlanOFTreatment" onclick=temForPlanOfAdvice("id"),fetchPlanTreat();setNewtempAdvice(this.id);>Plan Of Treatment</a>'
			+ '</li>'
			+ '</ul>'
			+ '<div class="tab-content col-md-10-1" style="margin-top: 10px;">'
			+ '<div id="PalliativeCare" class="col-md-12-1 tab-pane in">'
			+ '<div class="col-md-12-1" style="padding-top: 20px;">'
			+ '<div class="panel-body col-md-12-1">'
			+ '<div class="col-md-3-1" style="margin-top: 10px;">'
			+ '<label>Palliative Care Advice:</label>'
			+ '</div>'
			+ '<div>'
			+ '<textarea rows="5" cols="100" id="idPalliativeAdvice"></textarea>'
			+ '<button style="margin-top: 10px" class="btn btn-xs btn-success" '
			+ 'onclick="saveCareAdvices()" id="iSaveSupportiveAdvice" type="button">Save</button>'
			+ '</div>'
			+ '</div>'
			+ '<div class="panel-body col-md-12-1">'
			+ '<div class="col-md-3-1" style="margin-top: 10px;">'
			+ '<label>Supportive Care:</label>'
			+ '</div>'
			+ '<div>'
			+ '<textarea rows="5" cols="100" id="idSupportiveAdvice"></textarea>'
			+ '</div>'
			+ '</div>'
			+ '<div class="panel-body col-md-12-1">'
			+ '<div class="col-md-3-1" style="margin-top: 10px;">'
			+ '<label>Preventive Care:</label>'
			+ '</div>'
			+ '<div>'
			+ '<textarea rows="5" cols="100" id="idPreventiveAdvice"></textarea>'
			+ '</div>'
			+ '</div>'
			+ '<div class="panel-body col-md-12-1">'
			+ '<div class="col-md-3-1" style="margin-top: 10px;">'
			+ '<label>Rehabilitative Care:</label>'
			+ '</div>'
			+ '<div>'
			+ '<textarea rows="5" cols="100" id="idRehabilitativeAdvice"></textarea>'
			+ '</div>'
			+ '</div>'
			+ '<div class="panel-body col-md-12-1">'
			+ '<div class="col-md-3-1" style="margin-top: 10px;">'
			+ '<label>Other Services:</label>'
			+ '</div>'
			+ '<div>'
			+ '<textarea rows="5" cols="100" id="idOtherServices"></textarea>'
			+ '</div>'
			+ '</div>'
			+ '<input type="hidden" id="idHidddenSupportiveAdvice" value="0" />'
			+ '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);

}

function getTestRadilogyReports(billdetailsid, categoryid) {

	var patId = $("#patientId").text();
	var treatmentId = $("#treatmentId").html();

	var inputs = [];
	inputs.push('patientId=' + patId);
	inputs.push('testId=' + categoryid);
	inputs.push('billdetailsid=' + billdetailsid);
	inputs.push('treatmentId=' + treatmentId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/getTestRadilogyReports",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r.listRadiologyTempReportDTO.length > 0) {

				CKEDITOR.instances['viewckeditor1']
						.setData(r.listRadiologyTempReportDTO[0].templateData);

			}

		}
	});

}

function displayXray(billdetailsid, categoryid) {
	fetchXrayImage(billdetailsid, categoryid);
	$("#groupModal").modal();
}

//function added for RIS reflections in OPD doctorDesk, aniket kanse, 29 AUG 22
function risReflectedReportPrint(testid, patID, treatID, radiologyTestId,
		idRadiologyTestReport, pkViewRisRecordsDTO) {

	var pageType = "Ris";
	var callfrom= "receiptRisIpd";
	var isHeader="withHf";

	setTimeout(function() {
		 window.open(("ehat_risReportRecordPrint_new.jsp?" 
      		   + "testId=" +(testid) 
      		   + "&patID=" + encodeURIComponent(patID) 
      		   + "&treatID=" + encodeURIComponent(treatID)
      		   + "&radiologyTestId=" + encodeURIComponent(radiologyTestId)
      		   + "&idRadiologyTestReport=" + encodeURIComponent(idRadiologyTestReport)
      		   + "&pkViewRisRecordsDTO=" + encodeURIComponent(pkViewRisRecordsDTO)
      		   + "&pendFlag=" + "N"
      		   + "&callFrom=" +callfrom
               + "&pageType=" +pageType
               + "&isHeader=" +isHeader));
	}, 300);

}

// function added for RIS reflections in OPD doctorDesk, aniket kanse, 29 AUG 22
function displayXrayInvestigations(idRadiologyTest, testId){
	fetchXrayImage(idRadiologyTest, testId);
	$("#groupModal").modal();
}


//function fetchXrayImage(billdetailsid, categoryid) {
//	var treatmentId = $("#treatmentId").html();
//	count = 1;
//	var inputs = [];
//	inputs.push('testId=' + categoryid);
//	inputs.push('billdetailsid=' + billdetailsid);
//	inputs.push('treatmentId=' + treatmentId);
//	var str = inputs.join('&');
//	jQuery.ajax({
//		async : true,
//		type : "POST",
//		data : str + "&reqType=AJAX",
//		url : "ehat/doctordesk/fetchXrayImage",
//		timeout : 1000 * 60 * 5,
//		catche : false,
//		error : function() {
//			// alert("error");
//		},
//		success : function(r) {
//			ajaxResponse = JSON.stringify(r);
//
//			var obj = eval('(' + ajaxResponse + ')');
//			$("#totalX-ray").setTemplate(opdXrayImageTemp);
//			$("#totalX-ray").processTemplate(obj);
//		}
//	});
//}

// aniket kanse, 29 AUG 22, fetch Investigation documents 
function fetchXrayImage(idRadiologyTest, testId) {
	var treatmentId = $("#treatmentId").html();
	count = 1;
	var inputs = [];
	inputs.push('idRadiologyTest=' + idRadiologyTest);
	inputs.push('testId=' + testId);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		// url : "ehat/doctordesk/fetchXrayImage",
		url : "ehat/doctordesk/fetchXrayImageNew",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
	//		alert(JSON.stringify(r));
			
			// commented by aniket, 30 AUG 22
//			ajaxResponse = JSON.stringify(r);
//			var obj = eval('(' + ajaxResponse + ')');
//			$("#totalX-ray").setTemplate(opdXrayImageTemp);
//			$("#totalX-ray").processTemplate(obj);
			
			
			
			//----------------below code added by aniket kanse, 30 AUG 22
			
			var htmBody = "";
			if (r.lstRisImageUploadDTONew.length == 0 || r.lstRisImageUploadDTONew.length == null) {
				htmBody = htmBody + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>No Records Found</th></tr>";
				
			} else {
				
				for ( var i = 0; i < r.lstRisImageUploadDTONew.length; i++) {
					
					htmBody = htmBody + "<tr style='height:21px;'>"
					+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
			//		+ "<td class='col-md-3 center' >" + r.lstRisImageUploadDTONew[i].documentName + "</td>"
					+ "<td class='col-md-3 center' ><a href = 'ehat/ris/viewRISDocuments?idRadiologyTestReport="+r.lstRisImageUploadDTONew[i].idRadiologyTestReport+"&fileName="+r.lstRisImageUploadDTONew[i].risFile+"' target='_blank' style='color:black;'>"+r.lstRisImageUploadDTONew[i].documentName+"</a></td>"
			//		+ "<td class='col-md-3 center' >" + r.lstRisImageUploadDTONew[i].comment + "</td>"
					+ "<td class='col-md-3 center' >" + r.lstRisImageUploadDTONew[i].stringDate + "</td>"
			//		+ "<td class='col-md-1 center' ><button class='btn btn-xs btn-warning' onclick=viewRisReflectedDocument('"+r.lstRisImageUploadDTONew[i].risFile+"','"+r.lstRisImageUploadDTONew[i].idRadiologyTestReport+"')><i class='fa fa-eye'></i></button></td>"
			//		+ "<td class='col-md-1 center' >" + r.lstRisImageUploadDTONew[i].createdByUser + "</td>" 
			//		+ "<td class='col-md-1 center' ><button class='btn btn-xs btn-danger' onclick=deleteRisUpDocument('"+r.lstRisImageUploadDTONew[i].idRadiologyTestReport+"')> <i class='fa fa-times' aria-hidden='true'></i></button></td>"
					+'</tr>';
				}
			}
			$("#totalX-ray").html(htmBody);
		}
	});
}

function viewRisReflectedDocument(imageName, idRadiologyTestReport){
	
	 alert("imageName :  " + imageName + ", idRadiologyTestReport : " + idRadiologyTestReport);
	
	$('#ViewRISReflectedDocumemnt').attr("src","ehat/ris/viewRISDocuments?idRadiologyTestReport="+r.lstRisImageUploadDTONew[i].idRadiologyTestReport+"&fileName="+r.lstRisImageUploadDTONew[i].risFile+" target='_blank' style='color:black;'>"+r.lstRisImageUploadDTONew[i].documentName);
	$('#viewRISReflectedDocumemntModal').modal('show');
	$('#RISdocumentComment').html(imageName);
}

var opdXrayImageTemp = "<div class='col-sm-12-1 scroller' style='margin-top:-21px; height: 0px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='margin-left: 00px; width: 103.2%;'>"
		+ "<tbody>"
		+ "{#foreach $T.lstRisImageUploadDTO as img}"
		+ "<tr>"
		+ "<td class='col-md-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "<td class='col-md-3 center' style='height: 21.5px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='RisImageReadServlet?name={$T.img.imageName}' target='_blank' style='color:black; '>{$T.img.imageName}</a></td>"
		+ "<td class='col-md-3 center' style='height: 21.5px;'>{new Date($T.img.createdDate).toLocaleDateString()}</td>"
		+ "</tr>{#/for}</tbody></table></div>";

function printDoctorRound() {

	var callFrom = $("#pageType").val();
	var pid = parseInt($('#patientId').html());
	var tid = parseInt($('#treatmentId').html());
	var date = $("#regDate2").html();
	if (date == undefined || date == null || date == "") {
		date = $("#date-pick").val();
	}
	var instructionLanguage = $("input[name='prepInstructionPopup']:checked")
			.val();

	setTimeout(function() {
		window.open(("IPD_DoctorRoundPrintNew.jsp?patID=" + pid + "&callFrom="
				+ callFrom + "&treatID=" + tid + "&instructionLanguage="
				+ instructionLanguage + "&date=" + date));

		location.reload();
	}, 300);

}

function printPrepDataIPDOPD() {
	$("#iPrintBillNew").show();
}
function printPrescriptionNewCLOSE() {
	$("#iPrintBillNew").hide();
	$("#iPrintBillNewOPD").hide();
}
function printPrescriptionNewIPD(call) {

	var callFrom = $("#pageType").val();
	var pid = parseInt($('#patientId').html());
	var tid = parseInt($('#treatmentId').html());
	var date_pick = $("#OFdate-pick").val();
	var instructionLanguage = $("input[name='prepInstructionPopup']:checked")
			.val();

	setTimeout(function() {
		if (call == "NR") {

			window.open(("IPD_PrePrintNew.jsp?patID=" + pid + "&callFrom="
					+ callFrom + "&treatID=" + tid + "&instructionLanguage="
					+ instructionLanguage + "&date_pick=" + date_pick));

			location.reload();

		} else if (call == "ALL") {
			window.open(("print_order_form.jsp?patID=" + pid + "&callFrom="
					+ callFrom + "&tid=" + tid + "&lang=" + instructionLanguage
					+ "&date_pick=" + date_pick + "&call=" + call));

			location.reload();
		} else {
			window.open(("IPD_PrePrintPres.jsp?patID=" + pid + "&callFrom="
					+ callFrom + "&treatID=" + tid + "&instructionLanguage="
					+ instructionLanguage + "&date_pick=" + date_pick
					+ "&call=" + call));

			location.reload();
		}

	}, 300);

}

function printChem() {

	var callFrom = $("#pageType").val();
	var pid = parseInt($('#patientId').html());
	var tid = parseInt($('#treatmentId').html());
	var date_pick = $("#chemoDate").val();
	var instructionLanguage = $("input[name='prepInstructionPopup']:checked")
			.val();

	setTimeout(function() {
		window.open(("IPD_chmPrintNew.jsp?patID=" + pid + "&callFrom="
				+ callFrom + "&treatID=" + tid + "&instructionLanguage="
				+ instructionLanguage + "&date_pick=" + date_pick));

		location.reload();
	}, 300);

}

function refreshDocOrderformTemplate() {
	$("#docTemplateNameIDa").val("0");
	$("#docTemplateNameTexta").val("");
	$("#docOrgTemplateCheckboxa").prop("checked", false);
	$("#prescriptionTemplateContentDocTablea").html("");
	// $('#prescriptionContenta').html("");
	$("#prescriptionTemplateContentDocHiddenDiva").html("");

	// disable Paeditric checkbox
	$("#paediatricsDocCheckBoxa").prop("checked", false);

}

function disableDocOrderformTemplate1() {
	$("#prepDocTemplateMedicineIDa").val("0");
	$("#prepDoca").prop("disabled", true);
	$("#medicineNameDoca").prop("disabled", true);
	$("#medicineIDDoca").prop("disabled", true);
	$("#strengthDoca").prop("disabled", true);
	$("#unitDoca").prop("disabled", true);
	$("#doseDoca").prop("disabled", true);
	$("#frequencyDoca").prop("disabled", true);
	$("#instructionDoca").prop("disabled", true);
	$("#routeDoca").prop("disabled", true);
	$("#daysDoca").prop("disabled", true);
	$("#qtyDoca").prop("disabled", true);
	// $("#saveMedDoca").prop("disabled", false);
}

function refreshDocOrderformTemplateMedicine() {
	$("#prepDocTemplateMedicineIDa").val("0");
	$("#prepDoca").val("0");
	$("#medicineNameDoca").val("");
	$("#medicineIDDoca").val("0");
	$("#strengthDoca").val("");
	$("#unitDoca").val("0");
	$("#doseDoca").val("");
	$("#frequencyDoca").val("0");
	$("#instructionDoca").val("0");
	$("#routeDoca").val("0");
	$("#daysDoca").val("");
	$("#qtyDoca").val("");
	$("#moa1").prop('checked', false);
	$("#ana1").prop('checked', false);
	$("#eva1").prop('checked', false);
	$("#nta1").prop('checked', false);
	// $("#prescriptionTemplateContentDocTablea").html("");
}

var docOrderFormTemplateNameSelect = "<option value='0'>New Template</option>"
		+ "{#foreach $T.orderFormObjList as ptol}<option value={$T.ptol.templateID} onclick=fetchPreperationsList('DoctorDesk');fetchUnitTypeList('DoctorDesk');fectchAllPrescriptionInstruction('IPD');>{$T.ptol.templateName}</option>{#/for}";

function fetchDocOrderformTemplateByID(docTemplateNameSelectID) {
	var inputs = [];
	inputs.push('action=fetchDocOrderFormTemplateByID');
	inputs.push('docTemplateNameSelectID=' + docTemplateNameSelectID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PatientServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {

				},
				success : function(r) {
					var ajaxResponse = r;

					var obj = eval('(' + ajaxResponse + ')');

					if (docTemplateNameSelectID == 0) {

						$("#docTemplateNameSelecta").setTemplate(
								docOrderFormTemplateNameSelect);
						$("#docTemplateNameSelecta").processTemplate(obj);

						$("#docTemplateNameTexta").val("");
						$("#docTemplateNameIDa").val("0");
						$("#docMyTemplateCheckboxa").prop('checked', true);
						$("#docOrgTemplateCheckboxa").prop('checked', false);

						count = 1;
						$("#prepDocMyTemplateTablea").setTemplate(
								prepDocOrderFormMyTemplateTable);
						$("#prepDocMyTemplateTablea").processTemplate(obj);

						count = 1;
						$("#prepDocOrgTemplateTablea").setTemplate(
								prepDocOrderFormOrgTemplateTable);
						$("#prepDocOrgTemplateTablea").processTemplate(obj);

						// save Temp. button
						$("#existingAddReplaceTemplateNameSelecta")
								.setTemplate(docOrderFormTemplateNameSelect);
						$("#existingAddReplaceTemplateNameSelecta")
								.processTemplate(obj);

					} else {
						$('#prescriptionTemplateContentDocHiddenDiva').html(
								ajaxResponse);

						$("#docTemplateNameTexta").val(
								obj.orderFormObjList[0].templateName);
						$("#docTemplateNameIDa").val(
								obj.orderFormObjList[0].templateID);

						if ((obj.orderFormObjList[0].myTemplateFlag) == "Y")
							$("#docMyTemplateCheckboxa").prop('checked', true);
						else
							$("#docMyTemplateCheckboxa").prop('checked', false);

						if ((obj.orderFormObjList[0].orgTemplateFlag) == "Y")
							$("#docOrgTemplateCheckboxa").prop('checked', true);
						else
							$("#docOrgTemplateCheckboxa")
									.prop('checked', false);

						var prescriptionTemplateContentDocTablea = "";
						var instruction = "";
						var prep = "";
						var route = "";
						var unit = "";
						prepCount = 0;
						if ((obj.orderFormObjList[0].orderFormObjList.length) > 0) {

							for ( var int = 0; int < (obj.orderFormObjList[0].orderFormObjList.length); int++) {

								instruction = "";

								if ((obj.orderFormObjList[0].orderFormObjList[int].rmrk) != 0) {
									instruction = $(
											"#instructionDoca option[value='"
													+ (obj.orderFormObjList[0].orderFormObjList[int].rmrk)
													+ "']").text();
								}

								prep = $(
										"#prepDoca option[value='"
												+ (obj.orderFormObjList[0].orderFormObjList[int].prep)
												+ "']").text();

								// alert(obj.orderFormObjList[0].orderFormObjList[int].route);
								/*
								 * if
								 * ((obj.orderFormObjList[0].orderFormObjList[int].route) !=
								 * 0) {
								 * alert(obj.orderFormObjList[0].orderFormObjList[int].route);
								 * route = $( "#routeDoca option[value='" +
								 * (obj.orderFormObjList[0].orderFormObjList[int].route) +
								 * "']").text(); }
								 */

								prescriptionTemplateContentDocTablea = prescriptionTemplateContentDocTablea
										+ "<tr><td class='col-md-1-1 center'>"
										+ (++prepCount)
										+ ".</td>"
										+ "<td class='col-md-4-1'>"
										+ (prep)
										+ ". "
										+ obj.orderFormObjList[0].orderFormObjList[int].drdo
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ obj.orderFormObjList[0].orderFormObjList[int].strength
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ obj.orderFormObjList[0].orderFormObjList[int].doseType
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ obj.orderFormObjList[0].orderFormObjList[int].frequency
										+ "</td>"

										+ "<td class='col-md-2-1 center'>"
										+ instruction
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ (obj.orderFormObjList[0].orderFormObjList[int].route)
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ obj.orderFormObjList[0].orderFormObjList[int].days
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ obj.orderFormObjList[0].orderFormObjList[int].qty
										+ "</td>"

										+ "<td>"
										+ "<input type='checkbox' name='chkboxOrderformDocTempMedicinea' id='"
										+ (obj.orderFormObjList[0].orderFormObjList[int].ocdID)
										+ "'  value='"
										+ (obj.orderFormObjList[0].orderFormObjList[int].ocdID)
										+ "' style='cursor: pointer;' /></td>"
										+ "</tr>";
							}
						}

						$('#prescriptionTemplateContentDocTablea').html(
								prescriptionTemplateContentDocTablea);
						/*
						 * $('#prescriptionContenta').html(
						 * prescriptionTemplateContentDocTablea);
						 */
					}

					setTimeout(function() {
						userAccess();
					}, 100);
				}
			});
}

var prepDocOrderFormMyTemplateTable = "{#foreach $T.orderFormObjList as ul}"
		+ "{#if $T.ul.myTemplateFlag=='Y'}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' >{count++}.</td>"
		+ "<td class='col-sm-1-1 center' >{$T.ul.templateName}</td>"
		+ "<td class='col-sm-2-1 center' >{$T.ul.userFullName}</td>"
		+ "<td class='col-sm-1-1 center' >"
		+ "<button class='btn btn-xs btn-primary editUserAccess' value='Use' onclick='useOrderFormDocTempForTreatment({$T.ul.templateID})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' >"
		+ "<button class='btn btn-xs btn-danger deleteUserAccess' value='DELETE' onClick='deletePrepDocTempIpd({$T.ul.templateID})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i></button></td>" + "</tr>{#/if}{#/for}";

var prepDocOrderFormOrgTemplateTable = "{#foreach $T.orderFormObjList as ul}"
		+ "{#if $T.ul.orgTemplateFlag=='Y'}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' >{count++}.</td>"
		+ "<td class='col-sm-1-1 center' >{$T.ul.templateName}</td>"
		+ "<td class='col-sm-2-1 center' >{$T.ul.userFullName}</td>"
		+ "<td class='col-sm-1-1 center' >"
		+ "<button class='btn btn-xs btn-primary editUserAccess' value='Use' onclick='useOrderFormDocTempForTreatment({$T.ul.templateID})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' >"
		+ "<button class='btn btn-xs btn-danger deleteUserAccess' value='DELETE' onClick='deletePrepDocTempIpd({$T.ul.templateID})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i></button></td>" + "</tr>{#/if}{#/for}";

function showUpdateOrderTemp() {
	$("#AddUpdateOrderformTemplatePopupForIpda").modal("show");
	var temp = '<div class="modal-dialog col-md-11-1" '
			+ 'style="margin-top: 40px; margin-left: 65px;"> '
			+ '<div class="modal-content" class="col-md-12" '
			+ 'style="height: 580px;"> '
			+ '<div class="modal-header" style="padding-bottom: 0px;"> '
			+ '<div class="box-title" style="margin-bottom: 29px;"> '
			+ '<h4 class="col-md-8-1" style="margin-top:0px"> '
			+ '<i class="fa fa-calendar"></i>Add Update Prescription Templates '
			+ '</h4> '
			+ '<div style="width: 9%; float: left; padding-left: 3px;  "><button '
			+ 'class="btn btn-xs btn-success editUserAccess" id="saveMedDoca" onclick="saveOrderFormDetailsTemp(\'Template\')" '
			+ 'disabled="disabled">Save Medicine</button> '
			+ '<input type="hidden" id="orderDocTemplateMedicineIDa" value="0" /></div>'
			+ '<div style="float: right; padding-right: 6px;"> '
			+ '<button type="button" class="btn btn-xs btn-danger" '
			+ 'data-dismiss="modal" style="margin-top: -9px;"> '
			+ '<i class="fa fa-arrows"></i> Close '
			+ '</button></div></div></div> '
			+ '<div class="modal-body"><div class="form-group col-md-12-1"><div class="form-group Remove-Padding col-md-12-1" '
			+ 'style="margin-top: -8px;"><div style="background-color: #EEEEEE; padding: 5px; height: 34px;"> '
			+ '<div style="width: 20%; float: left;"><select onchange="refreshFetchDocOredrFormTemplate()" '
			+ 'id="docTemplateNameSelecta" style="cursor: pointer; width: 90%;"></select></div> '
			+ '<div style="width: 8%; float: left; padding-top: 5px;">Template Name: <b style="color: red; padding-left: 2px;">*</b> '
			+ '</div><div style="width: 25%; float: left;"><input type="text" id="docTemplateNameTexta" '
			+ 'style="width: 100%;" maxlength="500" placeholder="Enter Template Name..." /> <input '
			+ 'id="docTemplateNameIDa" type="hidden" value="0" /></div> '
			+ '<div style="width: 6%; float: left; padding-top: 5px; margin-left: 27px;"> General Medicine: </div> '
			+ '<div style="width: 3%; float: left;"><input type="checkbox" id="medicineNotAvailableCheckboxIPD" style="cursor: pointer;" /> '
			+ '</div>'
			+ '<div style="width: 6%; float: left; padding-top: 5px; margin-left: 8px;">My Template:</div> '
			+ '<div style="width: 3%; float: left;"><input type="checkbox" id="docMyTemplateCheckboxa" style="cursor: pointer;" /> '
			+ '</div><div style="width: 10%; float: left; padding-top: 5px;">Organization Template:</div> '
			+ '<div style="width: 3%; float: left;"><input type="checkbox" id="docOrgTemplateCheckboxa" '
			+ 'style="cursor: pointer;" /></div> '
			+ '<div><button class="btn btn-xs btn-success editUserAccess" onclick="saveUpdateDocOrderFormTemplateByID()" disabled="disabled"> '
			+ '<i class="fa fa-save"></i> Save Template </button></div> '
			+ '</div></div> '
			+ '<div class="col-md-12-1" style="height: 45px; margin-top: 0px;"> '
			+ '<div id="rowa1" class="col-sm-12-1" style="margin: 0px;"> <div id="cola2" class="col-sm-1-1" '
			+ 'style="margin-top: 10px;"><div class="form-group Remove-Padding col-sm-12-1"> '
			+ '<div class="divide-10"></div><label class="TextFont">Prep<b style="color: red; padding-left: 2px;">*</b></label> '
			+ '<select id="prepDoca" class="form-control input-SmallText" onchange="fetchRouteTypeList(\'ipd\')"> '
			+ '</select></div></div><div id="col3" class="col-sm-2-1" style="margin-top: 10px;"> <div class="form-group Remove-Padding col-sm-12-1"> '
			+ '<div class="divide-10"></div><label class="TextFont">Medicine Name <b style="color: red; padding-left: 2px;">*</b> '
			+ '</label><div id="divTagmedicineNameDoca"><input type="text" placeholder="Name" id="medicineNameDoca"class="typeahead form-control input-SmallText" '
			+ 'onkeypress="setPrescriptionAutocompleteNameID(this.id,\'ipd\');" /> </div> <input type="hidden" id="medicineIDDoca" '
			+ 'value="0" /></div></div><div id="col4" class="col-sm-1-1" style="margin-top: 10px;"> <div class="form-group Remove-Padding col-sm-12-1"> '
			+ '<div class="divide-10"></div><label class="TextFont">Strength</label> <input type="text" placeholder="Strength" '
			+ 'id="strengthDoca" class="form-control input-SmallText" /> </div></div><div id="col5" class="col-sm-1-1" '
			+ 'style="margin-top: 10px;"> <div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> '
			+ '<label class="TextFont">Dose Type</label> <input type="text" placeholder="Dose" id="doseDoca" onkeyup="calculateQuantity(\'prepDoca\')" '
			+ 'onkeypress="return validateNumberMinusSign(event)"class="form-control input-SmallText" /></div></div> '
			+ '<div id="col4A" class="col-sm-1-1" style="margin-top: 10px;"><div class="form-group Remove-Padding col-sm-12-1"> '
			+ '<div class="divide-10"></div><label class="TextFont">Unit</label> <select id="unitDoca" class="form-control input-SmallText"> '
			+ '</select></div></div><div id="col11" class="col-sm-1-1" style="margin-top: 10px;"> <div class="form-group Remove-Padding col-sm-12-1"> '
			+ '<div class="divide-10"></div><label class="TextFont" for="exampleInputEmail1">MO - AN - EV - NT </label><div class="col-sm-12-1" style=" margin-top: -5px; margin-left:2px"> '
			+ '<input id="moa1" name="timeslot"  value="Morning"  onclick ="setFrequency1()" type="checkbox" style="cursor: pointer;"><input id="ana1" name="timeslot" value="Afternoon" onclick ="setFrequency1()" type="checkbox" style="cursor: pointer;"> '
			+ '<input id="eva1" name="timeslot" value="Evening" onclick ="setFrequency1()" type="checkbox" style="cursor: pointer;"><input id="nta1"  name="timeslot" value="Night" onclick ="setFrequency1()" type="checkbox" style="cursor: pointer;"></div> '
			+ '</div></div><div id="col6" class="col-sm-1-1" style="margin-top: 10px;"><div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div><label class="TextFont">Frequency</label> <input type="text" placeholder="Frequency" '
			+ 'id="frequencyDoca" readonly="readonly" onkeyup="calculateQuantity(\'prepDoca\')" class="form-control input-SmallText" /></div></div><div id="col7" class="col-sm-1-1"style="margin-top: 10px;"><div class="form-group Remove-Padding col-sm-12-1"> '
			+ '<div class="divide-10"></div><label class="TextFont">Instructions</label> <select id="instructionDoca" class="form-control input-SmallText"></select></div></div><div id="col8" class="col-sm-1-1" '
			+ 'style="margin-top: 10px;"><div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div><label class="TextFont">Route</label> <select '
			+ 'name="routeDoca" id="routeDoca" class="form-control input-SmallText"></select></div></div><div id="col9" class="col-sm-1-1"style="margin-top: 10px;"><div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> '
			+ '<label class="TextFont">Days<b style="color: red; padding-left: 2px;">*</b></label> <input type="text" placeholder="Days" id="daysDoca" '
			+ 'class="form-control input-SmallText"onkeyup="calculateQuantity(\'prepDoca\')" onkeypress="return validateNumbers(event)" /></div></div><div id="col10" class="col-sm-1-1" style="margin-top: 10px;"><div '
			+ 'class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div><label class="TextFont">Quantity<b style="color: red; padding-left: 2px;">*</b></label> <input type="text" placeholder="Qty"Style ="width:70px;" id="qtyDoca"onkeypress="return validateNumbers(event)" /> '
			+ '</div></div></div></div> '

			+ '<div style="height: 70px; margin-top: 0px;" class="col-md-12-1"><div style="margin-top: 0px;" class="col-sm-12-1" id="row1"><div style="margin-top: 10px; padding-left: 3px;" class="col-sm-1-1" id="col2">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div> </div></div><div style="margin-top: 10px;" class="col-sm-2-1" id="col3">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> </div>'
			+ '</div><div style="margin-top: 10px;" class="col-sm-1-1" id="col4"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div></div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col5">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> '
			+ '</div></div><div id="col4A" class="col-sm-1-1" style="margin-top: 10px;">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div> </div></div>'
			+ '<div style="margin-top: 30px;margin-left:-42px" class="col-sm-2-1" id="col11">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div style=" margin-top: -5px; margin-left:2px" class="col-sm-12-1">'
			+ '<input type="text" style="width:47px" value="1" id="tmo11" class="form-control input-SmallText  col-sm-1-1"  onkeyup= "calculateQuantity(\'prepDoca\')" readonly=""  >'
			+ '<input type="text" style="width:47px" value="1" id="tan11" class="form-control input-SmallText  col-sm-1-1"  onkeyup= "calculateQuantity(\'prepDoca\')" readonly="">'
			+ '<input type="text" style="width:47px" value="1" id="tev11" class="form-control input-SmallText col-sm-1-1"  onkeyup= "calculateQuantity(\'prepDoca\')"  readonly="">'
			+ '<input type="text" style="width:47px" value="1" id="tnt11" class="form-control input-SmallText col-sm-1-1"   onkeyup= "calculateQuantity(\'prepDoca\')" readonly="">'
			+ '</div></div></div></div></div>'
			+ '</div>'
			+ '<div class="col-md-12-1" style="margin-top:  -51px;"> <div class="col-md-12-1" style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-top: 3px;"> '
			+ '<label style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"> '
			+ '<i class="fa fa-plus"></i> New </label> <label onclick="editDocOrderFormTemplateMedicine()" '
			+ 'style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"><i class="fa fa-edit"></i> Edit '
			+ '</label> <label onclick="deleteDocOrderFormTemplateMedicine()" style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-left: 20px; margin-bottom: 0px;"> '
			+ '<i class="fa fa-trash-o"></i> Delete </label> </div> <div class="col-sm-12-1" style="margin-top: 0px;"> '
			+ '<table class="table table-bordered table-condensed"> <thead> <tr> '
			+ '<td class="col-md-1-1 center">#</td><td class="col-md-4-1">Prep. Drug</td><td class="col-md-1-1 center">Strength</td> '
			+ '<td class="col-md-1-1 center">Dose</td> <td class="col-md-1-1 center">Frequency</td> <td class="col-md-2-1 center">Instruction</td> '
			+ '<td class="col-md-1-1 center">Route</td><td class="col-md-1-1 center">Days</td><td class="col-md-1-1">Quantity</td> '
			+ '<td class="col-md-1-1"></td></tr></thead></table><div id="flip-scroll" class="col-sm-12-1" style="overflow-y: scroll; height: 160px; maxheight: auto; margin-top: -21px;"> '
			+ '<table class="table table-striped table-condensed"> <tbody id="prescriptionTemplateContentDocTablea"> </tbody></table></div></div></div> '
			+ '<div class="col-md-12-1" style="margin-top: 3px; border: 2px solid orange;"> <div class="tabbable tabs-left col-md-12-1" '
			+ 'style="margin-top: 10px; margin-left: 5px;"> <ul class="nav nav-tabs col-md-1-1" style="margin: 0px;"> '
			+ '<li class="active" style="margin-top: -6px"><a data-toggle="tab" href="#prepDocMyTemplatea"> My Templates </a></li> '
			+ '<li><a data-toggle="tab"href="#prepDocOrgTemplatea"> Org.Temp </a></li></ul><div class="tab-content col-md-11-1"> '
			+ '<div id="prepDocMyTemplatea" class="tab-pane fade in active" style="margin: 0px; padding-right: 4px; padding-left: 0px;"> '
			+ '<div class="col-md-12-1" style="padding-right: 10px;"></div><div class="col-sm-12-1" style="margin-top: -1px;"> '
			+ '<table class="table table-condensed"><thead><tr><th class="col-sm-1-1 center"><div class="TextFont">#</div></th> '
			+ '<th class="col-sm-1-1 center"><div class="TextFont">Template Name</div></th><th class="col-sm-2-1 center" style="padding-left: 7px;"> '
			+ '<div class="TextFont">Owner</div></th> <th class="col-sm-1-1 center" style="padding-left: 15px;"><div class="TextFont">Use</div></th> '
			+ '<th class="col-sm-1-1 center" style="padding-left: 15px;"><div class="TextFont">Delete</div></th></tr></thead></table> '
			+ '<div id="flip-scroll" class="col-sm-12-1" style="overflow-y: scroll; height: 135px; maxheight: auto; margin-top: -21px;"> '
			+ '<table class="table table-striped table-condensed"><tbody id="prepDocMyTemplateTablea"></tbody></table></div></div></div> '
			+ '<div id="prepDocOrgTemplatea" class="tab-pane fade in" style="padding-right: 4px;"><div class="col-md-12-1" style="padding-right: 10px;"></div> '
			+ '<div class="col-sm-12-1"style="margin-top: -1px;"><table class="table table-condensed"><thead><tr><th class="col-sm-1-1 center"> '
			+ '<div class="TextFont">#</div></th><th class="col-sm-1-1 center"><div class="TextFont">Template Name</div></th> '
			+ '<th class="col-sm-2-1 center" style="padding-left: 7px;"><div class="TextFont">Owner</div></th> '
			+ '<th class="col-sm-1-1 center" style="padding-left: 15px;"><div class="TextFont">Use</div></th><th class="col-sm-1-1 center" style="padding-left: 15px;"> '
			+ '<div class="TextFont">Delete</div></th></tr></thead></table> '
			+ '<div id="flip-scroll" class="col-sm-12-1" style="overflow-y: scroll; height: 135px; maxheight: auto; margin-top: -21px;"> '
			+ '<table class="table table-condensed"><tbody id="prepDocOrgTemplateTablea"></tbody> '
			+ '</table></div></div></div></div></div></div></div></div></div></div>';
	// alert(temp);
	$("#AddUpdateOrderformTemplatePopupForIpda").html(temp);
}

function saveUpdateDocOrderFormTemplateByID() {
	var docTemplateNameTexta = $("#docTemplateNameTexta").val();

	if (docTemplateNameTexta == "") {
		alert("Please enter template name...");
		return false;
	}

	var docTemplateNameIDa = ($("#docTemplateNameIDa").val()).trim();
	var docMyTemplateCheckboxa = "N";
	if ($("#docMyTemplateCheckboxa").prop("checked"))
		docMyTemplateCheckboxa = "Y";

	var docOrgTemplateCheckboxa = "N";
	if ($("#docOrgTemplateCheckboxa").prop("checked"))
		docOrgTemplateCheckboxa = "Y";

	var inputs = [];
	inputs.push('action=saveUpdateDocOrderFormTemplateByID');
	inputs.push('docTemplateNameID=' + docTemplateNameIDa);
	inputs.push('docTemplateNameText='
			+ encodeURIComponent(docTemplateNameTexta));
	inputs.push('docMyTemplateCheckbox=' + docMyTemplateCheckboxa);
	inputs.push('docOrgTemplateCheckbox=' + docOrgTemplateCheckboxa);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			alert(r);
			fetchDocOrderformTemplateByID("0");

			// on update
			/*
			 * if (docTemplateNameIDa != 0) { setTimeout(function() {
			 * fetchDocPrescriptionTemplateByID(docTemplateNameIDa);
			 * $("#docTemplateNameSelecta").val(docTemplateNameIDa); }, 500); }
			 */
		}
	});
}

function saveOrderFormDetailsTemp(Page_Type) {
	var docTemplateNameID = $.trim($('#docTemplateNameID').val());
	var queryType = "";
	var medID = $("#orderDocTemplateMedicineIDa").val();
	if (medID == 0) {
		queryType = "insert";
	} else {
		queryType = "update";
	}
	// var queryType = $("#OFqueryType").val();
	var treatmentId = $.trim($('#tr_Id').val());
	var date = $("#OFdate-pick").val();
	var prep = $.trim($("#prepDoca :selected").val());
	var name = $.trim($("#medicineNameDoca").val());
	var medicineID = $.trim($("#medicineIDDoca").val());
	var strength = $.trim($("#strengthDoca").val());
	var unit = $.trim($("#unitDoca").val());
	var dose = $.trim($("#doseDoca").val());
	var frequency = $.trim($("#frequencyDoca").val());
	var instruction = $.trim($("#instructionDoca").val());
	var route = $.trim($("#routeDoca").val());
	var days = $.trim($("#daysDoca").val());
	var qty = $.trim($("#qtyDoca").val());
	// var statDose = $("#statDose").val();
	var ordefFormTemplateId = $("#docTemplateNameSelecta").val();
	var morning = "-";
	var afternoon = "-";
	var evening = "-";
	var night = "-";
	/*
	 * alert(queryType+"="+treatmentId+"="+date+"="+prep+"="+name+"="+medicineID+"="+strength+"="+unit+"="+dose+"="+frequency+"="+instruction+"="+route+"="+days+"="+qty+"="+statDose+"="+ordefFormTemplateId);
	 * return false;
	 */

	if ($("#medicineNotAvailableCheckboxIPD").prop("checked")) {
		// No need to show validation
	} else {
		if (prep == 0 || prep == "") {
			alert("Please Select Prep...");
			SetFocus("prepDoca");
			return false;
		}
		if (medicineID == "0" || medicineID == "undefined" || medicineID == "") {
			alert("Please enter proper medicine name");
			SetFocus("medicineNameDoca");
			return false;
		}
		if (name == "") {
			alert("Please enter proper medicine name");
			$("#medicineIDDoca").val("0");
			SetFocus("medicineNameDoca");
			return false;
		}
	}
	if (instruction == "0") {
		// alert("Please Select Instruction...");
		// SetFocus("instruction");
		// return false;
	}

	/*
	 * if (frequency == "0" || frequency == "undefined" || frequency == "") {
	 * alert("Please check at least one Time Slot for Frequency..!");
	 * SetFocus("mo"); return false; }
	 */

	if (days == "") {
		alert("Please Enter days...");
		SetFocus("daysDoca");
		return false;
	}

	if (qty == "") {
		alert("Please Select Quantity...");
		SetFocus("qtyDoca");
		return false;
	}
	var mor_flag = "0";
	var aft_flag = "0";
	var eve_flag = "0";
	var night_flag = "0";

	if (document.getElementById('moa1').checked) {
		morning = "Morning";
		mor_flag = $("#tmo11").val();
	}
	if (document.getElementById('ana1').checked) {
		afternoon = "Afternoon";
		aft_flag = $("#tan11").val();
	}
	if (document.getElementById('eva1').checked) {
		evening = "Evening";
		eve_flag = $("#tev11").val();
	}
	if (document.getElementById('nta1').checked) {
		night = "Night";
		night_flag = $("#tnt11").val();
	}
	var dayPrescription = mor_flag + "," + aft_flag + "," + eve_flag + ","
			+ night_flag;
	var inputs = [];
	inputs.push('action=saveOrderFormDetailsTemps');
	inputs.push('queryType=' + queryType);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('date=' + date);
	inputs.push('prep=' + prep);
	inputs.push('medicineID=' + medicineID);
	inputs.push('name=' + encodeURIComponent(name));
	inputs.push('strength=' + strength);
	inputs.push('unit=' + unit);
	inputs.push('dose=' + dose);
	inputs.push('frequency=' + frequency);
	inputs.push('instruction=' + instruction);
	inputs.push('route=' + route);
	inputs.push('days=' + days);
	inputs.push('qty=' + qty);
	inputs.push('morning=' + morning);
	inputs.push('afternoon=' + afternoon);
	inputs.push('evening=' + evening);
	inputs.push('night=' + night);
	inputs.push('Page_Type=' + Page_Type);
	inputs.push('medID=' + medID);
	// inputs.push('statDose=' + encodeURIComponent(statDose));
	inputs.push('ordefFormTemplateId=' + ordefFormTemplateId);
	inputs.push('dayPrescription=' + dayPrescription);
	/*
	 * if (queryType == 'update') { inputs.push('OFSlaveID=' +
	 * $.trim($('#OFSlaveID').val())); }
	 */

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			$("#prepDoca").val("0");
			$("#medicineNameDoca").val('');
			$("#medicineIDDoca").val('0');
			$("#prepDoca").attr("disabled", false);
			$("#medicineNameDoca").attr("disabled", false);
			$("#strengthDoca").val('');
			$("#doseDoca").val('');
			$("#unitDoca").val('0');
			$("#frequencyDoca").val('0');
			$("#instructionDoca").val('0');
			$("#routeDoca").html('<option value="0">SELECT</option>');
			$("#routeDoca").val('0');
			$("#daysDoca").val('');
			$("#qtyDoca").val('');
			$('#docTemplateNameSelecta').val('0');
			$('#OFSlaveID').val('0');
			$("#moa1").prop('checked', false);
			$("#ana1").prop('checked', false);
			$("#eva1").prop('checked', false);
			$("#nta1").prop('checked', false);
			$("#tmo1").val('1');
			$("#tan1").val('1');
			$("#tev1").val('1');
			$("#tnt1").val('1');
			$("#tmo1").attr('readonly', 'readonly');
			$("#tan1").attr('readonly', 'readonly');
			$("#tev1").attr('readonly', 'readonly');
			$("#tnt1").attr('readonly', 'readonly');
			$("#OFqueryType").val('insert');
			$("#prescriptionTemplateContentDocTablea").empty();
			fetchDocOrderformTemplateByID(docTemplateNameID);
			refreshFetchDocOredrFormTemplate();

		}
	});

}

function refreshFetchDocOredrFormTemplate() {
	var docTemplateNameSelectID = ($("#docTemplateNameSelecta").val()).trim();
	if (docTemplateNameSelectID == "") {
		disableDocOrderformTemplate();
		refreshDocOrderformTemplate();
		refreshDocOrderformTemplateMedicine();
	} else {
		// $("#prescriptionTemplateContentDocTablea").empty();
		enableDocOrderformTemplate();
		refreshDocOrderformTemplateMedicine();
		fetchPreperationsList('DoctorDesk');
		fetchUnitTypeList('DoctorDesk');
		fectchAllPrescriptionInstruction('IPD');
		fetchDocOrderformTemplateByID(docTemplateNameSelectID);
	}
}

function editDocOrderFormTemplateMedicine() {

	if (($("#prescriptionTemplateContentDocTablea").html()).trim() == "") {
		alert("No Data to Edit Template's Medicine...");
		return false;
	}

	var prescriptionTemplateContentDocTableArray = new Array();
	var prescription_idMedDocTemp = 0;
	// $('#prescriptionTemplateContentDocTablea tr').each(function() {
	$("input[name='chkboxOrderformDocTempMedicinea']:checked").each(function() {
		prescriptionTemplateContentDocTableArray.push($(this).val());
		prescription_idMedDocTemp = ($(this).attr('id')).trim();
	});
	// });

	if ((prescriptionTemplateContentDocTableArray.length) == 0) {
		alert("Please check the checkbox to edit Instructions...");
		return false;
	}

	if ((prescriptionTemplateContentDocTableArray.length) != 1) {
		alert("Please Select Single Checkbox...");
		return false;
	}

	var ajaxResponse = $("#prescriptionTemplateContentDocHiddenDiva").html();
	var obj = eval('(' + ajaxResponse + ')');

	for ( var i = 0; i < (obj.orderFormObjList[0].orderFormObjList.length); i++) {
		if ((obj.orderFormObjList[0].orderFormObjList[i].ocdID) == prescription_idMedDocTemp) {
			obj = (obj.orderFormObjList[0].orderFormObjList[i]);
			break;
		}
	}
	$("#orderDocTemplateMedicineIDa").val(obj.ocdID);
	$("#prepDoca").val(obj.prep);
	$("#medicineNameDoca").val(obj.drdo);
	// $("#medicineIDDoca").val(obj.medicineID);
	$("#medicineIDDoca").val(obj.invProdID);
	$("#strengthDoca").val(obj.strength);
	$("#unitDoca").val(obj.unit);
	$("#doseDoca").val(obj.doseType);
	$("#frequencyDoca").val(obj.frequency);
	$("#instructionDoca").val(obj.rmrk);
	// $("#routeDoca").val(obj.route);
	$("#daysDoca").val(obj.days);
	$("#qtyDoca").val(obj.qty);
	$("#moa1").prop('checked', false);
	$("#ana1").prop('checked', false);
	$("#eva1").prop('checked', false);
	$("#nta1").prop('checked', false);

	var route = "<option value='0'>-SELECT-</option><option value="
			+ obj.routeID + ">" + obj.route + "</option>";
	$("#routeDoca").html(route);
	$("#routeDoca").val(obj.routeID);
	/***************************************************************************
	 * @author : Touheed Khan
	 * @date : 03-June-2016
	 * @reason : For time slot setting
	 */
	var mor = obj.mor;
	var aft = obj.aft;
	var eve = obj.eve;
	var night = obj.night;

	if (mor == "Morning") {
		$("#moa1").prop('checked', true);
	}
	if (aft == "Afternoon") {
		$("#ana1").prop('checked', true);
	}
	if (eve == "Evening") {
		$("#eva1").prop('checked', true);
	}
	if (night == "Night") {
		$("#nta1").prop('checked', true);
	}
	/** **********End********** */
	var daypr = obj.dayPrescription;
	var dayprarr = daypr.split(",");

	if (dayprarr[0] != "0") {
		// $("#mo").prop('checked', true);
		$("#tmo11").removeAttr("readonly");
	}

	if (dayprarr[1] != "0") {
		// $("#an").prop('checked', true);
		$("#tan11").removeAttr("readonly");
	}

	if (dayprarr[2] != "0") {
		// $("#ev").prop('checked', true);
		$("#tev11").removeAttr("readonly");
	}

	if (dayprarr[3] != "0") {
		// $("#nt").prop('checked', true);
		$("#tnt11").removeAttr("readonly");
	}
	/*
	 * $("#tmo").val(arr[0]); $("#tan").val(arr[1]); $("#tev").val(arr[2]);
	 * $("#tnt").val(arr[3]);
	 */

	$("#tmo11").val(dayprarr[0]);
	$("#tan11").val(dayprarr[1]);
	$("#tev11").val(dayprarr[2]);
	$("#tnt11").val(dayprarr[3]);
	/*
	 * $("#tmo1").removeAttr("readonly"); $("#tan1").removeAttr("readonly");
	 * $("#tev1").removeAttr("readonly"); $("#tnt1").removeAttr("readonly");
	 */
	if (obj.medicineID == "0") {

		$("#medicineNotAvailableCheckboxIPD").prop('checked', true);
	}
}

function deleteDocOrderFormTemplateMedicine() {

	if (($("#prescriptionTemplateContentDocTablea").html()).trim() == "") {
		alert("No Data to Delete Template's Medicine...");
		return false;
	}

	var prepTempDocMedIDArray = new Array();
	$("input[name='chkboxOrderformDocTempMedicinea']:checked").each(function() {
		prepTempDocMedIDArray.push($(this).attr('id'));
	});

	if ((prepTempDocMedIDArray.length) == 0) {
		alert("Please check the checkbox to delete...");
		return false;
	}

	var r = confirm("Please confirm to Delete Record?");
	if (r) {
		var inputs = [];
		inputs.push('action=deleteDocOrderFormTemplateMedicine');
		inputs.push('prepTempDocMedIDArray=' + prepTempDocMedIDArray);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "IPDTreatmentServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {

			},
			success : function(r) {
				alert(r);
				fetchDocOrderformTemplateByID($.trim($(
						'#docTemplateNameSelecta').val()));
			}
		});
	}
}

function useOrderFormDocTempForTreatment(prepTemplateDocID) {
	var inputs = [];

	var treatmentId = $.trim($('#tr_Id').val());
	var pagetyp = $('#pagetypopd').val();
	inputs.push('action=useOrderFormDocTempForTreatment');
	inputs.push('prepTemplateDocID=' + prepTemplateDocID);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('pagetyp=' + pagetyp);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			var ajaxResponse = r;
			alert(ajaxResponse);
			// window.location.reload();
			if (pagetyp == 'Discharge') {
				featchTreatmentAtDischarge();
			} else {
				featchOrderFormByDate();
			}
		}
	});
}

/*
 * function deletePrepDocTemp(prepTemplateDocID) { var inputs = [];
 * inputs.push('action=deletePrepDocTemp'); inputs.push('prepTemplateDocID=' +
 * prepTemplateDocID); var str = inputs.join('&'); jQuery.ajax({ async : true,
 * type : "POST", data : str + "&reqType=AJAX", url : "IPDTreatmentServlet",
 * timeout : 1000 * 60 * 5, cache : false, error : function() { }, success :
 * function(r) { var ajaxResponse = r; alert(ajaxResponse);
 * fetchDocPrescriptionTemplateByID("0"); //window.location.reload(); } }); }
 */

function enableDocOrderformTemplate() {
	$("#prepDoca").prop("disabled", false);
	$("#medicineNameDoca").prop("disabled", false);
	$("#medicineIDDoca").prop("disabled", false);
	$("#strengthDoca").prop("disabled", false);
	$("#unitDoca").prop("disabled", false);
	$("#doseDoca").prop("disabled", false);
	$("#frequencyDoca").prop("disabled", true);
	$("#instructionDoca").prop("disabled", false);
	$("#routeDoca").prop("disabled", false);
	$("#daysDoca").prop("disabled", false);
	$("#qtyDoca").prop("disabled", false);
	$("#moa1").prop('checked', false);
	$("#ana1").prop('checked', false);
	$("#eva1").prop('checked', false);
	$("#nta1").prop('checked', false);
	// $("#saveMedDoc").prop("disabled", false);
}

function setFrequency1() {
	var frequency = 0;
	var count = 0;
	// mo an ev nt
	if (document.getElementById('moa1').checked) {
		count++;
		$("#tmo11").removeAttr("readonly");
	} else {
		$("#tmo11").attr('readonly', 'readonly');
		$("#tmo11").val(1);
	}
	if (document.getElementById('ana1').checked) {
		count++;
		$("#tan11").removeAttr("readonly");
	} else {
		$("#tan11").attr('readonly', 'readonly');
		$("#tan11").val(1);
	}
	if (document.getElementById('eva1').checked) {
		count++;
		$("#tev11").removeAttr("readonly");
	} else {
		$("#tev11").attr('readonly', 'readonly');
		$("#tev11").val(1);
	}
	if (document.getElementById('nta1').checked) {
		count++;
		$("#tnt11").removeAttr("readonly");
	} else {
		$("#tnt11").attr('readonly', 'readonly');
		$("#tnt11").val(1);
	}
	frequency = count;
	$("#frequencyDoca").val(frequency);
	calculateQuantity('prepDoca');
}

function fetchPatientChemoHistory() {

	var treatId = $.trim($('#tr_Id').val());
	var callfrom = "allChemo";
	var inputs = [];
	inputs.push('treatmentId=' + treatId);
	inputs.push('callFrom=' + callfrom);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/patientChemo/getPatientChemoAll",
				error : function() {
					alert('error');
				},
				success : function(r) {

					$("#divHistoryChemotherapy").show();
					count = 1;

					if (r.length != 0) {

						var htm = "<div class='col-sm-12-1' style='margin-top:20px; border: 1px solid #ddd;'>"
								+ "<table class='table table-striped table-condensed cf'>"
								+ "<tbody>";
						for ( var i = 0; i < r.length; i++) {
							var str = '"DataForPopUp_' + (i + 1) + '"';
							htm = htm
									+ "<tr>"
									+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>"
									+ (i + 1)
									+ "</td>"
									+ "<td class='col-sm-6-1 left' style='height: 21.5px;'>"
									+ r[i].chemoName
									+ "</td>"
									+ "<td class='col-sm-5-1 center' id ='PopUpChemoDate_"
									+ (i + 1)
									+ "' onclick = 'fetchChemotherapyPatientDataMaster("
									+ str + ")' style='height: 21.5px;'>"
									+ r[i].chemoDt + "</td>" + "</tr>";

						}
						htm = htm + "</tbody>" + "</table>" + "</div>";
						$("#tableHistoryChemotherapy").html(htm);
					}

				}
			});

}

function historyChemotherapyHide() {
	$("#divHistoryChemotherapy").hide();
}

function temForPlanOfAdvice(id) {
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="" onclick=temForSurgeryAdvice("id"),fetchAdvice(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationName();setNewtempAdvice(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices">Surgery Advice</a>'
			+ '</li>'
			+ '<li id="RadioTherapyList" class="">'
			+ '<a data-toggle="tab" href="#RadioTherapy" onclick=fectchRadiationMaster("IPDDoctorStation");fectchAllRadiotherapy("pageType");temForRadioTherapy("id");setNewtempAdvice(this.id);>Radiotherapy</a>'
			+ '</li>'
			+ '<li id="ChemotherapyList">'
			+ '<a data-toggle="tab" href="#Chemotherapy" onclick=temForChemoTherapy("id"),fetchChemotherapyPatientDataMaster("onload");setNewtempAdvice(this.id);>Chemotherapy</a>'
			+ '</li>'
			+ '<li id="PalliativeCareList">'
			+ '<a data-toggle="tab" href="#PalliativeCare" onclick=fetchCareAdvices("Care");temForCareAdvices("careAdvices");setNewtempAdvice(this.id);>Care Advices</a>'
			+ '</li>'
			+ '<li id="PlanOFTreatmentList" class="active" onclick=temForPlanOfAdvice("id"),fetchPlanTreat();setNewtempAdvice(this.id);>'
			+ '<a data-toggle="tab" href="#PlanOFTreatment" style="background-color: rgb(248, 196, 113);">Plan Of Treatment</a>'
			+ '</li>'
			+ '</ul>'
			+ '<div class="tab-content col-md-10-1" style="margin-top: 10px;">'
			+ '<div id="PlanOFTreatment" class="col-md-12-1 tab-pane in">'
			+ '<div class="col-md-12-1" style="padding-top: 20px;">'
			+ '<div class="panel-body col-md-12-1">'
			+ '<table style="background-color: #d9d9d9; table-layout: 2px;">'
			+ '<tr><th style="width: 100%;">'
			+ '<h6 style="margin-left:400px;" ><b>Plan Of Treatment</b></h6>'
			+ '</th>'
			+ '<th style="width: 20%;">'
			+ '<button style="margin-right: 20px;" class="btn btn-xs btn-success" onclick="SavePlanOfTreatment()" title="Save Plan Of Treatment" data-placement="left" data-toggle="tooltip">'
			+ 'Save'
			+ '</th></tr>'
			+ '</table>'
			+ '<table class="table table-bordered table-condensed cf">'
			+ '<tbody>'
			+ '<tr style="background-color: #fffcfc">'
			+ '<td>'
			+ '<input type="checkbox" id="chka">&nbsp;&nbsp;SURGERY '
			+ '</td>'
			+ '<td>'
			+ '<input type="checkbox" id="chkb">&nbsp;&nbsp;CHEMOTHERAPY '
			+ '</td>'
			+ '<td>'
			+ '<input type="checkbox" id="chkc">&nbsp;&nbsp;RADIOTHERAPY'
			+ '</td>'
			+ '</tr>'
			+ '<tr style="background-color: #fffcfc">'
			+ '<td>'
			+ '<input type="checkbox" id="chkd">&nbsp;&nbsp;HORMONE THERAPY '
			+ '</td>'
			+ '<td>'
			+ '<input type="checkbox" id="chke">&nbsp;&nbsp;TARGETED THERAPY '
			+ '</td>'
			+ '<td>'
			+ '<input type="checkbox" id="chkf">&nbsp;&nbsp;CONCOMITANT RADIOTHERAPY + CHEMOTHERAPY'
			+ '</td>' + '</tr>' + '<tr style="background-color: #fffcfc">'
			+ '<td>'
			+ '<input type="checkbox" id="chkg">&nbsp;&nbsp;FOLLOW UP '
			+ '</td>' + '<td>'
			+ '<input type="checkbox" id="chkh">&nbsp;&nbsp;PALLIATIVE CARE'
			+ '</td>' + '<td>'
			+ '<input type="checkbox" id="chki">&nbsp;&nbsp;SUPPORTIVE CARE'
			+ '</td>' + '</tr>' + '</tbody>' + '</table>' + '</div>' + '</div>'
			+ '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);
}

function SavePlanOfTreatment() {
	var pid = $("#patientId").html();
	var tid = $("#treatmentId").html();
	var idplan = $("#idForPlanofTreat").val();
	var chka = $('input:checkbox[id=chka]');
	var chkb = $('input:checkbox[id=chkb]');
	var chkc = $('input:checkbox[id=chkc]');
	var chkd = $('input:checkbox[id=chkd]');
	var chke = $('input:checkbox[id=chke]');
	var chkf = $('input:checkbox[id=chkf]');
	var chkg = $('input:checkbox[id=chkg]');
	var chkh = $('input:checkbox[id=chkh]');
	var chki = $('input:checkbox[id=chki]');

	if (chka.is(':checked') == true) {
		chka = 1;
	} else {
		chka = 0;
	}

	if (chkb.is(':checked') == true) {
		chkb = 1;
	} else {
		chkb = 0;
	}

	if (chkc.is(':checked') == true) {
		chkc = 1;
	} else {
		chkc = 0;
	}

	if (chkd.is(':checked') == true) {
		chkd = 1;
	} else {
		chkd = 0;
	}

	if (chke.is(':checked') == true) {
		chke = 1;
	} else {
		chke = 0;
	}

	if (chkf.is(':checked') == true) {
		chkf = 1;
	} else {
		chkf = 0;
	}

	if (chkg.is(':checked') == true) {
		chkg = 1;
	} else {
		chkg = 0;
	}

	if (chkh.is(':checked') == true) {
		chkh = 1;
	} else {
		chkh = 0;
	}

	if (chki.is(':checked') == true) {
		chki = 1;
	} else {
		chki = 0;
	}

	/*
	 * alert("hi>>>>"+pid+">>>>"+tid+">>>"+idplan+">>>"+chka+">>>"+chkb+">>>"+chkc+">>>"+chkd+">>>"+chke+">>>"
	 * +chkf+">>>"+chkg+">>>"+chkh+">>>"+chki);
	 */

	var planoftreatdetails = {
		planlist : []
	};
	planoftreatdetails.planlist.push({
		pid : pid,
		tid : tid,
		idplan : idplan,
		chka : chka,
		chkb : chkb,
		chkc : chkc,
		chkd : chkd,
		chke : chke,
		chkf : chkf,
		chkg : chkg,
		chkh : chkh,
		chki : chki,

	});

	planoftreatdetails = JSON.stringify(planoftreatdetails);
	var inputs = [];
	inputs.push('planoftreatdetails=' + planoftreatdetails);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/savePlanTreat",

		success : function(r) {
			alert(r);
			fetchPlanTreat();
		}
	});
}

function fetchPlanTreat() {
	var pid = $("#patientId").html();
	var tid1 = $("#treatmentId").html();
	var tid = tid1.split(" ");
	var inputs = [];
	inputs.push('pid=' + pid);
	inputs.push('tid=' + tid[1]);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/fetchPlanTreat",

		success : function(response) {
			// alert(JSON.stringify(response));
			$("#idForPlanofTreat").val(response.planlist[0].idplan);

			if (response.planlist[0].chka == 1) {
				$("#chka").prop("checked", "checked");
			}

			if (response.planlist[0].chkb == 1) {
				$("#chkb").prop("checked", "checked");
			}

			if (response.planlist[0].chkc == 1) {
				$("#chkc").prop("checked", "checked");
			}

			if (response.planlist[0].chkd == 1) {
				$("#chkd").prop("checked", "checked");
			}

			if (response.planlist[0].chke == 1) {
				$("#chke").prop("checked", "checked");
			}

			if (response.planlist[0].chkf == 1) {
				$("#chkf").prop("checked", "checked");
			}

			if (response.planlist[0].chkg == 1) {
				$("#chkg").prop("checked", "checked");
			}

			if (response.planlist[0].chkh == 1) {
				$("#chkh").prop("checked", "checked");
			}

			if (response.planlist[0].chki == 1) {
				$("#chki").prop("checked", "checked");
			}

		}
	});
}

function setFrequencyOpd() {
	var frequency = 0;
	var count = 0;
	// mo an ev nt
	if (document.getElementById('mo1').checked) {
		count++;
		$("#tmo1").removeAttr("readonly");
	} else {
		$("#tmo1").attr('readonly', 'readonly');
		$("#tmo1").val(1);
	}
	if (document.getElementById('an1').checked) {
		count++;
		$("#tan1").removeAttr("readonly");
	} else {
		$("#tan1").attr('readonly', 'readonly');
		$("#tan1").val(1);
	}
	if (document.getElementById('ev1').checked) {
		count++;
		$("#tev1").removeAttr("readonly");
	} else {
		$("#tev1").attr('readonly', 'readonly');
		$("#tev1").val(1);
	}
	if (document.getElementById('nt1').checked) {
		count++;
		$("#tnt1").removeAttr("readonly");
	} else {
		$("#tnt1").attr('readonly', 'readonly');
		$("#tnt1").val(1);
	}
	frequency = count;
	$("#frequencyDoc").val(frequency);
	calculateQuantity('prepDoc');
}

function setNewtempAdvice(id) {
	$("#" + id).addClass("active");
	var prevtret = $('#prevtr').val();
	if (prevtret == "previousTreatmentOPDER") {
		$("#SurgeryAdvices *").prop('disabled', true);
		$("#RadioTherapy *").prop('disabled', true);
		$("#Chemotherapy *").prop('disabled', true);
		$("#PalliativeCare *").prop('disabled', true);
		$("#PlanOFTreatment *").prop('disabled', true);
		$("#ipdChemoRound").button({
			disabled : false
		});
	} else {
		$("#SurgeryAdvices *").prop('disabled', false);
		$("#RadioTherapy *").prop('disabled', false);
		$("#Chemotherapy *").prop('disabled', false);
		$("#PalliativeCare *").prop('disabled', false);
		$("#PlanOFTreatment *").prop('disabled', false);
	}

}

function formulapopup() {

	var temp = '<div style="margin-top: 5%; margin-left: 10%; padding: 5px;" class="modal-dialog col-md-10-1">'
			+ '<div style="height: 535px;" class="modal-content">'
			+ '<div style="margin: 0px; padding: 10px;" class="col-md-12-1">'
			+ '<div style="float: right; padding-right: 6px;"><button type="button" data-dismiss="modal" class="btn btn-xs btn-danger">'
			+ '<i class="fa fa-arrows"></i> Close</button></div></div>'
			+ '<div style="background-color: #EEEEEE; padding: 5px; height: 34px;" class="col-md-12-1">'
			+ '<div style="margin-top: 20px" class="col-md-12-1"><div class="col-md-1" style="font-weight: bold;">Search'
			+ 'By:</div><div class="col-md-1-1">Formula Name:</div>'
			+ '<div class="col-md-3-1 ">'
			+ '<input type="text"  id="byNameIPH" onkeyup="calculateFormula(this.id,\'Search\');" class="form-control input-SmallText " autocomplete="off" style="width: 100%;">'
			+ '</div><div style="text-align: center;" class="col-md-1"><input type="button" onclick="calculateFormula(\'byNameIPH\',\'Search\')" class="btn btn-xs btn-primary" value="search">'
			+ '</div></div><div style="margin: 0px" class="col-md-12-1"><table style="margin-top: 10px;" class="table table-condensed"><thead>'
			+ '<tr style="background-color:silver"><th class="col-md-1-1 "><div class="TextFont">#</div></th>'
			+ '<th class="col-md-3-1 "><div class="TextFont">Formula Name</div></th>'
			+ '<th class="col-md-3-1 center"><div class="TextFont">Formula</div></th>'
			+ '<th class="col-md-2-1 center"><div class="TextFont">Answer</div></th>'
			+ '<th class="col-md-3-1 center"><div class="TextFont">Validation</div></th>'
			+ '</tr></thead></table></div>'
			+ '<div style="overflow-y: scroll; height: 375px; maxheight: auto; margin-top: -22px;" class="col-sm-12-1" id="flip-scroll">'
			+ '<table class="table table-bordered  cf"><tbody id="DRRDivformula"></tbody>'
			/*
			 * + '<tr >' +'<td class="col-sm-1-1 "><div class="TextFont">1</td>' +'<td class="col-sm-3-1 ">BMI</td>' +'<td class="col-sm-5-1 "><input
			 * type="text" id="txtformulaname" class="form-control
			 * input-SmallText"></td>' +'<td class="col-sm-3-1 "></td>' + '</tr >' + '<tr >' +'<td class="col-md-1-1 ">2</td>' +'<td class="col-md-3-1 ">ECG</td>' +'<td class="col-md-5-1 "><input
			 * type="text" id="txtformulaname" class="form-control
			 * input-SmallText"></td>' +'<td class="col-sm-3-1 "></td>' + '</tr >' + '<tr >' +'<td class="col-md-1-1 ">3</td>' +'<td class="col-md-3-1 ">XRAY</td>' +'<td class="col-md-5-1 "><input
			 * type="text" id="txtformulaname" class="form-control
			 * input-SmallText"></td>' +'<td class="col-sm-3-1 "></td>' + '</tr >' + '<tr >' +'<td class="col-md-1-1 ">4</td>' +'<td class="col-md-3-1 ">BSA</td>' +'<td class="col-md-5-1 "><input
			 * type="text" id="txtformulaname" class="form-control
			 * input-SmallText"></td>' +'<td class="col-sm-3-1 "></td>' + '</tr >'
			 */
			+ '</table></div></div></div></div></div>';
	$("#formulapopupdiv").html(temp);
	$('#formulapopupdiv').modal('show');

	calculateFormula("0", "onload");
}

function calculateFormula(id, callfrom) {

	var inputs = [];
	var pid = $("#pt_Id").val();
	var tid1 = $("#tr_Id").val();
	var letter = "";
	var formulaId = "0";
	if (callfrom == "Search") {
		letter = $("#" + id).val();
	}
	inputs.push('letter=' + letter);
	inputs.push('pid=' + pid);
	inputs.push('tid=' + tid1);
	// push the string to controller
	inputs.push("formulaId=" + formulaId);
	inputs.push("callfrom=" + callfrom);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/formula/calculateFormula",
		error : function() {
		//	alert('Network Issue!!!');
		},
		success : function(r) {
			// alert(r);
			if (callfrom == "onload") {
				setTemplateForFormulaDR(r);
			} else {
				setTemplateForFormulaDR(r);
				autoCompTableForFormulaDR(r, id);
			}
		}
	});
}

function setTemplateForFormulaDR(r) {

	var masterModuleBody = "";
	for ( var int = 0; int < r.listFormula.length; int++) {

		masterModuleBody = masterModuleBody
				+

				'<tr>'
				+ '<td id="row'
				+ (r.listFormula[int].formulaId)
				+ '" class="col-sm-1-1 ">'
				+ (int + 1)
				+ '</td>'
				+ '<td id="listFormulaName'
				+ (r.listFormula[int].formulaId)
				+ '" class="col-sm-3-1">'
				+ (r.listFormula[int].formulaName)
				+ ' </td>'
				+ '<td id="listFormula'
				+ (r.listFormula[int].formulaId)
				+ '" class="col-sm-3-1">'
				+ (r.listFormula[int].formula)
				+ ' </td>'
				+ '<td class="col-sm-2-1 "><input type="text" id="txtFormulaResult"  style="text-align: right"  class="form-control input-SmallText" value="'
				+ (r.listFormula[int].result)
				+ '"></td>'
				+ '<td class="col-md-3-1 " ><label   class=" control-label"><font color="red">'
				+ (r.listFormula[int].valdation) + ' </font></label></td>'
				+ '</tr>';
	}

	$("#DRRDivformula").html(masterModuleBody);
}
function autoCompTableForFormulaDR(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id
	var myArray = response;// parsing response in JSON format
	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to the
				// autocomplete widget.
				showHeader : true,
				columns : [ {
					name : 'Formula Name',
					width : '100px',
					valueField : 'formulaName'
				}, /*
					 * { name : 'TempCode', //width : '80px', valueField :
					 * 'TempCode' }
					 */],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != 'Match') {
						// $('#results').text(ui.item ? 'Selected: ' +
						// ui.item.dn + ', '+ spl + ', '+
						// ui.item.specialisationName + ', ' + ui.item.depNm:
						// 'Nothing selected, input was ' + this.value);
						// $('#' + id).val(ui.item.dn);
						// $('#userDocId').val(ui.item.ui);
						// $('#selectedObj').html(JSON.stringify(ui.item));
						$('#byNameIPH').val(ui.item.formulaName);
					}
					/*
					 * This function use for Enter keypress search
					 */
					calculateFormula(id, 'Search');

					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					// console.log(data.listFormula.length);
					var result;
					if (!data || data.listFormula.length === 0
							|| !data.listFormula
							|| data.listFormula.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/* 'dn' : 'No', */
							'formulaName' : 'Record Not Found',
							'Formula' : 'Found',
						/* 'depNm' : 'Match' */
						} ];
					} else {
						result = data.listFormula;// Response List for All
						// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

function deletePrepDocTemp(prepTemplateDocID) {

	var inputs = [];
	inputs.push('prepTemplateDocID=' + prepTemplateDocID);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/doctordesk/deleteOPDPrepDocTemp",

				success : function(r) {
					if (Number(r) > 0) {
						alertify
								.success("Doctor Prescription Deleted Successfully...");
					} else {
						alertify
								.error("Oops some problem occured while deleting...");
					}
					fetchDocPrescriptionTemplateByID("0");
					// window.location.reload();
				}
			});
}
function getCommonAdvcdr() {

	var callform = "opdBill";
	// var pId=$("#patientId").text();
	var pId = parseInt($("#treatmentId").text());
	// var treatmentId = parseInt($("#treatmentId").text());

	jQuery.ajax({
		type : "POST",
		url : "ehat/commanadv/getcommanadvMasterList",
		data : {
			"pID_cID" : pId,
			"callform" : callform
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(response) {

			var totalAdvc = 0;
			for ( var i = 0; i < response.lstCommonadv.length; i++) {

				totalAdvc = Number(totalAdvc)
						+ Number(response.lstCommonadv[i].commonadv_amnt);
			}

			$("#finalAdvance").html(parseFloat(totalAdvc).toFixed(2));
		}
	});
}