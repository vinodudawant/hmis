function setNewtempDoctorDeskForIvf1(id) {
	 alert("id..iddddd..."+id); 
	/* alert('hi.....'); */
	// making active tag
	var todaysDefaultDate = $("#date").html();
	/* 30-12-2014 */
	var dateSplit = todaysDefaultDate.split('-');
	/* 30/12/2014 */
	todaysDefaultDate = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];

	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	var depid = $("#depdocdeskid").val();
	if (id == "cpoe") {
		temForCpoe(id, depid);
		if (depid == 1) {
			fetchipddetailsdrdesk();
			$('#muldelcp').removeAttr('onclick');
			$('#muldelcp').attr('onclick',
					'deleteCpoeServ(\'multiple\',\'IPD\')');
		} else {
			fetchbilldetails();
		}
		getAllUnitdrdesk();
		// unitMasterListOnLogin();
		var uid = $("#uids").val();
		setDocNamedrdesk();
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
		setDoctorPreRound();

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
	} else if (id == "IVF_Upload_Document") {
		showADNOTE(id);
		temForIVFuploaddoc(id);
		fetchDocOfIVF();
		var pid = $("#pt_Id").val();
		var trid = $("#tr_Id").val();
		$("#TRTiD").val(trid);
		$("#PiD").val(pid);

	} else if (id == "IVF_INDENT") {
	    //showADNOTE(id);
		temForIVFINDENT(id);
		getIvfIndentTemplateDetails('indent');
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
		temForNewHistory();                               //temForHistoryIVFOPD();
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
		// alert('in js '+id)
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
	} else if (id == "instructiontab") {
		/* Parent Child Treatment Instruction */
		fetchPCTreatmentInstruction();
		fetchReportInstruction();
		fetchSurgicalKitNm('instructions');
		fetchIndividualTreatmentInstruction();
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
	} else if (id == "ivfCalender") {

		new JsDatePick({
			useMode : 2,
			target : "lmpdtivf",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath : "../img/",
			weekStartDay : 1
		});
		temForIvfCalender();
		fetchStudyDataForIVF();
	}
	previousTreatmentDisable();

}

function temForHistoryIVFOPD() { 

	var temp = '<div id="HistoryGYN" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 10px;">'
			+ '<ul id="History" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="History" class="active">'
			+ '<a data-toggle="tab" href="#History" onclick=temForNewHistory(); style="background-color: rgb(248, 196, 113);"onclick=temForHistoryIVF();>History</a>'
			+ '</li>'

	temp = temp
			+ '<li id="Gynhistory" class="">'
			/*
			 * + '<a data-toggle="tab" href="#Gynhistory"
			 * onclick=temForHistoryIVF11(id);setNewtempAdvice(this.id);>Gynaecological
			 * History</a>'
			 */
			+ '<a data-toggle="tab" href="#Gynhistory" onclick="gynHistoryOpd(),fetchGynaecologicalHistory();">Gynaecological History</a>'
			+ '</li>'

	temp = temp
			+ '<li id="ObstetricsHistory" class="">'
			+ '<a data-toggle="tab" href="#ObstetricsHistory" onclick="">Obstetrics History</a>'
			+ '</li>'

	temp = temp
			+ '<li id="PrevFertiTreat" class="">'
			+ '<a data-toggle="tab" href="#PrevFertiTreat" onclick=previousfertilitytreatment(),fetchsavepreviousfertilitytreatment();>Previous Fertility Treatement</a>'
			+ '</li>'

	temp = temp
			+ '<li id="SurgicalHistory" class="">'
			+ '<a data-toggle="tab" href="#SurgicalHistory" onclick="newSurgical(),fetchSurgicalHistory()"> Surgical History</a>'
			+ '</li>'

	temp = temp
			+ '<li id="PreRepList" class="">'
			+ '<a data-toggle="tab" href="#PreRepList" onclick=""> Previous Reports List</a>'
			+ '</li>'

	temp = temp
			+ '<li id="GynExamHis" class="">'
			+ '<a data-toggle="tab" href="#GynExamHis" onclick="gynExamHis();fetchGynoExam();"> Gynacological Examination</a>'
			+ '</li>'

	temp = temp
			+ '</ul>'
			+ '<div class="tabbable tabs-left col-md-12-1" style="width: 900px;margin-top: 10px;margin-left: 5px;border: 1px solid #b8b8b8; height: 1750px;" id="History"> '

			+ '<div class="tab-pane active" id="History">'
			+ ' <div style="padding-top: 0px;" class="col-md-12-1" id="historyRow"></div>'
			+ '<div style="margin-top: 5px; margin-left: 5px;" class="tabbable tabs-left col-md-12-1">'

			/* +'<div style="margin-top: 0px;" class="tab-content col-md-2-1"></div>' */
			+ '<div style="margin-top: 0px;" class="tab-content col-md-12-1">'
			+ '<div class="tab-pane fade active in col-md-12-1" id="chiefComplaints">'
			+ '<div style="margin-top: 2px;" class="tab-content col-md-12-1">'
			+ '<div style="padding-left: 2%;padding-top: 0px;" class="col-sm-12-1">'
			+ '<div class="col-md-1-1"  style="margin-top: 15px;">	<label class="TextFont">Template List</label></div>'
			+ '<div class="col-md-3-1"  style="margin-top: 15px;">'
			+ '<select id="selCustomizeTemp" name="selCustomizeTemp" style="margin-top: 0px;" class="col-md-11-1 form-control input-SmallText" onchange=fetchTemplateIPDHistory(this.value)><option value="Dr" >NewTemplate</option>	</select></div>'
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
			+ '<div style="padding-left: 2%;"><label class="TextFont">CHIEF COMPLAINTS :</label><div>'
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
			+ '<label class="TextFont">GYNAC History :</label><textarea class="" cols="39" rows="2" id="gynac"></textarea>'
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

			+ '<div class="col-md-12-1" style="margin-top: 3%;">'
			+ '<div class="col-md-6-1" style="padding-left:0%;"><label class="TextFont">Past Medical History:</label>'
			+ '<textarea class="" cols="39" rows="2" id="pastMedicalHistory"></textarea>'
			+ '</div>'

			+ '<div class="col-md-6-1" style="padding-left:10%;"><label class="TextFont">OBS History:</label>'
			+ '<textarea class="" cols="39" rows="2" id="history_obs"></textarea></div>'
			+ '</div>'

			+ '</div>'
			+ '</div>'

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
			+ '</div>'

			+ '<div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">BP :</label> <input type="text" class="form-control input-SmallText" placeholder="BP" name="bp" id="bp">'

			+ '</div>'

			+ '<div style="margin-top: 5px;" class="form-group Remove-Padding col-md-12-1">'
			+ '<label class="TextFont">SPO2 :</label> <input type="text" class="form-control input-SmallText" placeholder="SPO2" name="spo2" id="spo2His">'

			+ '</div>'

			+ '</div>'

			+ '<div style="padding-left: 15px;" class="form-group Remove-Padding col-md-4-1"><div class="divide-10"></div>'
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

			+ '</div>'
			+

			'<div style="margin-top: 0px; margin-left: 0px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">PS:</label> <input type="text" class="form-control input-SmallText" placeholder="PS"  id="psIpdHis">'

			+ '</div>'
			+

			'<div style="margin-top: 0px; margin-left: 45px;" class="form-group Remove-Padding col-md-3-1">'
			+ '<label class="TextFont">PV:</label> <input type="text" class="form-control input-SmallText" placeholder="PV"  id="pvIpdHis">'

			+ '</div>'
			+

			'</div>'
			+ '<div style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">'
			+ '<div class="divide-10"></div><div class="col-md-6-1"><label class="TextFont">Local Examinations:</label>'
			+ '<textarea class="" cols="40" rows="3" id="localExm" style="margin-left: 3%;"></textarea></div>'
			+ '<div style="padding-left: 0.8%;" class="col-md-6-1"><label class="TextFont">Investigation Reports:</label>'
			+ '<textarea class="" cols="40" rows="3" id="invsRep" style="margin-left: 1%;"></textarea></div>'

			+ '<div style="padding-right: 8px; margin-top: 3%;" class="col-md-6-1"><label class="TextFont">Provisional Diagnosis:</label>'
			+ '<textarea class="" cols="40" rows="3" id="proplan" style="margin-left: 1%;"></textarea></div>'
			+ '</div>'

			+ '<div style="margin-top:-7%;margin-left:54%;" class="col-md-6-1"><label class="TextFont">Confirm Diagnosis:</label>'
			+ '<textarea class="" cols="40" rows="3" id="diagnoplan" style="margin-left: 1%;"></textarea></div>'
			+ '</div>'

			+ '</div>'

			+ '<div style="padding-right: 8px; margin-top: 3%;" class="col-md-12-1">'
			+ '<div class="divide-10"></div><div class="col-md-6-1" id="divtempProvId" style="display:none;">'
			+ '<label class="TextFont">Provisional Diagnosis:</label>'
			+ '<textarea class="" cols="40" rows="3" id="provDia" style="margin-left: 0%;"></textarea></div>'
			+ '<div style="padding-left: 0.8%;display:none" id="divtempTreatId"  class="col-md-6-1"><label class="TextFont">Treatment Plan:</label>'
			+ '<textarea class="" cols="40" rows="3" id="treatPlan" style="margin-left: 9%;"></textarea></div></div>'

			+ '<div class="tab-pane fade active in col-md-12-1 " id="history_investigation">'

			+ '<div style="margin-top: 15px;" class="col-sm-12-1" id="row_1"><hr style="height: 0px;border-top: 1px solid;margin: 1em 0;width:99%"></div>'
			+ '<div><label class="TextFont">Investigations:</label>'
			+ '</div>'
			+ '<div class="divide-20"></div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>Hb</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_hb">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>TLC</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_tlc">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>DLC</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_dlc">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>USG</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_usg">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>IVP</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_ivp">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>Urea</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_urea">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>Creatinine</label>'
			+ '<input type="text" class="form-control input-SmallText"id="his_crt">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>Na</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_na">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>K</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_k">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>PSA</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_psa">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>Blood Group</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_bigroup">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>Urine</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_rh">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>HIV</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_hiv">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>HBsAg</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_hbs">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>Xray Chest</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_xray">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>Xray Pelvis</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_pelvis">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>CT Scan</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_cts">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>CA 125</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_ca125">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>VDRL</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_vdrl">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>TSH</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_tsh">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>RBS</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_rbs">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>PT</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_pt">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>APTT</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_aptt">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>Histopathology</label>'
			+ '<input type="text" class="form-control input-SmallText" id="his_pathology">'
			+ '</div>'

			+ '<div class="col-md-3 form-group">'
			+ '<label>Others</label>'
			+ '<textarea class="" cols="39" rows="2" id="his_others"></textarea></div>'

			+ '</div>'

			+ '</div></div> </div></div></div>' + '</div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	$("#medOffName").val($("#docName").html());

	var ambaflow = $("#ambaflow").val();

	if (ambaflow == "off") {
		$("#history_investigation").hide();
	} else {
		$("#history_investigation").show();
	}
}

function gynHistoryOpd() {
	// alert("hiiiiiiiiiiiiiiiiiiiiiiiiii................amollll");
	var gtemp = '<div id="History" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 10px;">'
			+ '<ul id="History" class="nav nav-tabs colorChanges" style="height: 950px;">'
			+ '<li id="History" class="">'
			+ '<a data-toggle="tab" href="#History" onclick=temForNewHistory(); style="background-color: rgb(248, 196, 113);"onclick=temForHistoryIVF();>History</a>'
			+ '</li>';

	gtemp = gtemp
			+ '<li id="Gynhistory" class="active">'
			+ '<a data-toggle="tab" href="#Gynhistory" onclick="gynHistory(),fetchGynaecologicalHistory();">Gynaecological History</a>'
			+ '</li>'

	gtemp = gtemp
			+ '<li id="ObstetricsHistory" class="">'
			+ '<a data-toggle="tab" href="#ObstetricsHistory" onclick="">Obstetrics History</a>'
			+ '</li>'

	gtemp = gtemp
			+ '<li id="PrevFertiTreat" class="">'
			+ '<a data-toggle="tab" href="#PrevFertiTreat" onclick=previousfertilitytreatment(),fetchsavepreviousfertilitytreatment();>Previous Fertility Treatement</a>'
			+ '</li>'

	gtemp = gtemp
			+ '<li id="SurgicalHistory" class="">'
			+ '<a data-toggle="tab" href="#SurgicalHistory" onclick="newSurgical(),fetchSurgicalHistory()"> Surgical History</a>'
			+ '</li>'

	gtemp = gtemp
			+ '<li id="PreRepList" class="">'
			+ '<a data-toggle="tab" href="#PreRepList" onclick=""> Previous Reports List</a>'
			+ '</li>'

	gtemp = gtemp
			+ '<li id="GynExamHis" class="">'
			+ '<a data-toggle="tab" href="#GynExamHis" onclick="gynExamHis();fetchGynoExam();"> Gynacological Examination</a>'
			+ '</li>'

	gtemp = gtemp
			+ '</ul>'

			+ ' <div class="tabbable tabs-left col-md-12-1" style="width: 900px;margin-top: 10px;margin-left: 5px;border: 1px solid #b8b8b8; height: 1100px;" id="Gynhistory"> '

			+ '<div class="col-md-12-1" style="margin-top: 20px;margin-left: 2%;">			'
			+ '      <label>Menarche Age :  </label>'
			+ '          <input type="text" id="menarcheAge"  name="menarcheAge"   style="width: 5%;   "height: 20.5px;"> Years'

			// + '<input type="hidden" value="Dr. SUPER s USER"
			// readonly="readonly" name="name" id="medOffName"
			// class="form-control input-SmallText">'
			// + '<input type="hidden" value="MS16170000001483"
			// readonly="readonly" name="mrn" id="mrn" class="form-control
			// input-SmallText">'

			+ ' <!-- Print button -->  '
			+ ' <div class="pull-right">'
			+ '  <button onclick="printGynaecologicalHistory()" title="print Gynaecological History" data-placement="left" data-toggle="tooltip" '
			+ '     class="btn btn-xs btn-warning" data-original-title="Print Prescription"><i class="fa fa-print"></i>'
			+ '  </button>    &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp '
			+ '  </div>'

			+ ' <!-- save button -->'
			+ '<div class="pull-right">'
			+ '	<button  onclick="saveGynaecologicalHistory()" title="Save Gynaecological History" class="btn btn-xs btn-success editUserAccess"'
			+ '		data-toggle="tooltip" data-placement="left"	>'
			+ '      	<i class="fa fa-save"></i>'
			+ '	</button>  &nbsp&nbsp&nbsp'
			+ '</div>'

			+ '</div> '

			+ '  <div class="col-md-12-1" style="margin-top: 5px;margin-left: 2%;">'
			+ '         <label><b><h4>Menstrual History </b> </h4> </label>'
			+ '  </div>'

			+ ' <div class="col-md-12-1" style="margin-left: 2%;" >'
			+ '   <div class=""form-group>'
			+ '       <label>Amenorrhea  </label>    &nbsp&nbsp&nbsp '
			+ '       <input  type="radio" id="amenorria" name="amenorria"  value="yes"> Yes &nbsp&nbsp&nbsp    '
			+ '       <input type="radio" id="amenorria" name="amenorria" value="no"> No   &nbsp&nbsp&nbsp  '
			+ '       Since   <input type="text" id="amenorriaMonth" name="amenorriaMonth" style="width: 10%; " >  &nbsp&nbsp&nbsp Month '
			+ '       <input type="text" id="amenorriaDay" name="amenorriaDay" style="width: 10%; "> Days 	 &nbsp&nbsp&nbsp'
			+ '       <input type="radio" id="amenorriaPS" name="amenorriaPS" value="Primary">  Primary	  &nbsp&nbsp&nbsp'
			+ '       <input type="radio" id="amenorriaPS" name="amenorriaPS" value="Secondary">  Secondary     '
			+ '    </div>'
			+ '  </div>'

			+ '  <div class="col-md-12-1" style="margin-top: 10px;margin-left: 2%;">'
			+ '         <label>LMP  : </label>'
			+ '         <input type="date" id="lmd" name="lmd"  >  '
			+ '  </div>'

			+ '  <div class="form-group col-md-12-1" style="margin-top: 5px;  ">'
			+ '		<div class="form-group col-md-4" style="margin-top: 10px;">'
			+ '			<label>Duration Of Flow :</label>'
			+ '			 <textarea class="" id="durationOfFlow" name="durationOfFlow" cols="40" rows=2 ></textarea>'
			+ '		</div>'
			+ '		<div class="form-group col-md-4" style="margin-top: 10px; padding-left: 5% ">'
			+ '				<label>Intensity Of Flow :</label> '
			+ '				<textarea class=""  id="intensityOfFlow" name="intensityOfFlow" cols="40" rows=2 ></textarea>'
			+ '		</div>'
			+ '   </div>'

			+ '	<div class="col-md-12-1" style="margin-top: 0px;margin-left: 2%;">'
			+ '	   <div class="col-md-2-1" style="margin-top: 5px;">'
			+ '	     <label>Cycle Periodicity</label>'
			+ '		</div>'
			+ '	   <div ><input type="text" id="cyclePeriodicity" name="cyclePeriodicity" row=2 style="width: 10%; "> Days</div>'
			+ '	</div>	'

			+ '<div class="col-md-12-1" style="margin-top: 10px;margin-left: 2%;">'
			+ '    <label>Menstrual Cycle </label>  &nbsp&nbsp&nbsp  '
			+ '    <input type="radio" id="menstrualCycle" name="menstrualCycle" value="Regular">  Regular  &nbsp&nbsp&nbsp'
			+ '    <input type="radio" id="menstrualCycle" name="menstrualCycle" value="Irregular">  Irregular  &nbsp&nbsp&nbsp '
			+ '    <label>Duration Of Irregularity :</label> <input type="text" id="menstrualIrregularityDays" name="menstrualIrregularityDays" style="width: 10%; "> Days &nbsp&nbsp&nbsp'
			+ '    <input type="radio" id="menstrualIrregularity" name="menstrualIrregularity"value="before">  Before  &nbsp&nbsp&nbsp'
			+ '    <input type="radio" id="menstrualIrregularity" name="menstrualIrregularity" value="after"> After Expected Menstrual Period<br><br>'
			+ '</div> '

			+ '<div class="col-md-12-1" style="margin-top: 10px;margin-left: 2%;">'
			+ '	 <div class="col-md-2-1" style="margin-top: 10px;">'
			+ '	  <label><b>Treatement (If any) </b></label> '
			+ '	 </div>'
			+ '	 <div class="col-md-9-1">'
			+ '	 <textarea class="" id="treatementAny" name="treatementAny" cols="40" rows=2 ></textarea>'
			+ '	 </div>'
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 5px;margin-left: 2%;">'
			+ '	<div class="col-md-2-1" style="margin-top: 10px;">'
			+ '		<label><b>No. of Marriage</b></label>'
			+ '	</div>'
			+ '	<div><input type="text" id="noOfMarriage" name="noOfMarriage" row="2" style="width: 10%;margin-top: 5px " ></div>		'
			+ '</div>	'

			+ '<div class="col-md-12-1" style="margin-top: 10px;margin-left: 2%;">'
			+ '  <label>Consagunity </label> 	&nbsp&nbsp&nbsp'
			+ '   <input type="radio" id="consagunity" name="consagunity" value="yes"> Yes'
			+ '  <input type="radio" id="consagunity" name="consagunity" value="no"> No '
			+ '</div>'

			+ ' <div class="col-md-12-1" style="margin-top: 10px;margin-left: 2%;">'
			+ '  <div class="col-md-2-1" style="margin-top: 10px;">'
			+ '    <label class="control-label ">Married Since</label>'
			+ '  </div>'
			+ '  <div class="col-md-9-1" style="margin-top: 10px;">'
			+ '	 <input type="text" id="marriedSince" name="marriedSince" row=2 style="width: 13%;"> Years'
			+ '	</div>'
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 10px;margin-left: 2%;">'
			+ '	<div class="col-md-2-1" style="margin-top: 10px;">'
			+ '	  <label> <b>Trying to conceive Since</b></label>'
			+ '	 </div>'
			+ '	 <div class="col-md-9-1" style="margin-top: 10px;">'
			+ '	 <input type="text" id="tryToConceive" name="tryToConceive" style="width: 13%;" > Years'
			+ '	 </div>'
			+ '</div>  '

			+ '<div class="col-md-12-1" style="margin-top: 10px;margin-left: 2%;">'
			+ '	<div class="col-md-2-1" style="margin-top: 10px;">'
			+ '	  <label> <b>Sexually Active Since</b></label>'
			+ '   </div>'
			+ '	<div class="col-md-9-1" style="margin-top: 10px;">'
			+ '   <input type="text" id="sexuallyActive" name="sexuallyActive" row=2 style="width: 13%;"> Years'
			+ '   </div>'
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 10px;margin-left: 2%;">'
			+ '	<div class="col-md-2-1" style="margin-top: 10px;">'
			+ '	<label> <b>Periodicity of Intercource</b></label>'
			+ '   </div>'
			+ '   <div class="col-md-9-1" style="margin-top: 10px;">'
			+ '   <input type="text" id="periodicityOfInterCource" name="periodicityOfInterCource" row=2 style="width: 13%;" > Days</div>'
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 10px; margin-left: 2%;">'
			+ '    <label>Previous Pregnancy </label>'
			+ '</div> '

			+ '<div class="col-md-12-1" style="margin-top: 10px; margin-left: 2%;"> '
			+ '  Gravid [G]  <input type="text" id="prePregGravid" name="prePregGravid" row=2 > &nbsp&nbsp&nbsp '
			+ '   Parity [P] <input type="text" id="prePregParity" name="prePregParity" row=2  > &nbsp&nbsp&nbsp '
			+ '  Abortion [A]  <input type="text" id="prePregAbortion" name="prePregAbortion" row=2  > &nbsp&nbsp&nbsp '
			+ '  Live [L] <input type="text" id="prePregLive" name="prePregLive" row=2 > '
			+ '</div>'

			+ '<div class="col-md-12-1" style="margin-top: 10px;margin-left: 2%;">'
			+ '      <label><b><h4>Contraception History </b></h4> </label>'
			+ ' </div>'

			+ '	<div class="form-group col-md-12-1" style="margin-top: 0px; margin-left: 2%; ">' // <textarea
			// class=""
			// cols="40"
			+ '		<div class="form-group col-md-4" style="margin-top: 0px;">'
			+ '			<label>Pills : &nbsp&nbsp&nbsp </label>'
			+ '			<textarea class="" cols="40" id="contraceptionPills" name="contraceptionPills" rows=2 ></textarea>'
			+ '	    </div>'
			+ '	    <div class="form-group col-md-4" style="margin-top: 0px; padding-left: 0% ">'
			+ '			<label>Condom :  &nbsp&nbsp&nbsp </label> '
			+ '			<textarea class="" cols="40" id="contraceptionCondom" name="contraceptionCondom" rows=2 ></textarea>'
			+ '	    </div>'
			+ '	</div>'

			+ '	<div class="form-group col-md-12-1" style="margin-top: 0px; margin-left: 2%;">'
			+ '	  <div class="form-group col-md-4" style="margin-top: 0px;">'
			+ '		<label>IUD  : &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp </label>'
			+ '	    <textarea class="" cols="40" id="contraceptionIud" name="contraceptionIud" rows=2></textarea>'
			+ '	  </div>'
			+ '	  <div class="form-group col-md-4" style="margin-top: 0px; padding-left: 0% ">'
			+ '		<label>Diaphragm : &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp </label> '
			+ '		<textarea class="" cols="40" id="contraceptionDiaphragm" name="contraceptionDiaphragm" rows=2 ></textarea>'
			+ '	  </div>'
			+ '	</div>'

			+ '	<div class="form-group col-md-12-1" style="margin-top: 0px; margin-left: 2%;">'
			+ '	    <div class="form-group col-md-4" style="margin-top: 0px;">'
			+ '	      <label>Contraceptive Implant :</label>'
			+ '	      <textarea class="" cols="40" id="contraceptionImplant" name="contraceptionImplant" rows=2 ></textarea>'
			+ '	    </div>'
			+ '	    <div class="form-group col-md-4" style="margin-top: 0px; padding-left: 0% ">'
			+ '		 <label>Contraceptive Injectable :</label> '
			+ '	     <textarea class="" cols="40" id="contraceptionInjectable" name="contraceptionInjectable" rows=2 ></textarea>'
			+ '		</div>	' + '	 </div>'

			+ '<input type="hidden" id="idHidddenForGyn" value="0" />'

			+ '	 </div>  '

			+ '</div> </div> </div>  '

	$("#ipdDoctorStationJSPHeadDiv").html(gtemp);
}

function previousfertilitytreatment() {

	// alert('pppppppppppppppppppppppp');

	var ptemp = '<div id="HistoryGYN" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 10px;">'
			+ '<ul id="History" class="nav nav-tabs colorChanges" style="height: 950px;">'
			+ '<li id="History" class="">'
			+ '<a data-toggle="tab" href="#History" style="background-color: rgb(248, 196, 113);"onclick=temForNewHistory();>History</a>'
			+ '</li>';

	ptemp = ptemp
			+ '<li id="Gynhistory" class="active">'
			/*
			 * + '<a data-toggle="tab" href="#Gynhistory"
			 * onclick=temForHistoryIVF11(id);setNewtempAdvice(this.id);>Gynaecological
			 * History</a>'
			 */
			+ '<a data-toggle="tab" href="#Gynhistory" onclick="gynHistoryOpd();fetchGynaecologicalHistory();">Gynaecological History</a>'
			+ '</li>'
	// temp = temp

	ptemp = ptemp
			+ '<li id="ObstetricsHistory" class="">'
			+ '<a data-toggle="tab" href="#ObstetricsHistory" onclick="">Obstetrics History</a>'
			+ '</li>'

			+ '<li id="PrevFertiTreat" class="">'
			+ '<a data-toggle="tab" href="#PrevFertiTreat" onclick="previousfertilitytreatment();fetchsavepreviousfertilitytreatment();">Previous Fertility Treatement</a>'
			+ '</li>'
	ptemp = ptemp
			+ '<li id="SurgicalHistory" class="">'
			+ '<a data-toggle="tab" href="#SurgicalHistory" onclick="newSurgical(),fetchSurgicalHistory()"> Surgical History</a>'
			+ '</li>'

	ptemp = ptemp
			+ '<li id="PreRepList" class="">'
			+ '<a data-toggle="tab" href="#PreRepList" onclick=""> Previous Reports List</a>'
			+ '</li>'

			+ '<li id="GynExamHis" class="">'
			+ '<a data-toggle="tab" href="#GynExamHis" onclick="gynExamHis();fetchGynoExam();"> Gynacological Examination</a>'
			+ '</li>'

	// }
	ptemp = ptemp
			+ '</ul>'

			+ ' <div class="tabbable tabs-left col-md-12-1" style="width: 850px;margin-top: 10px;margin-left: 5px;border: 1px solid #b8b8b8; height: 950px;" id="PrevFertiTreat"> '
			+ '<input type="hidden" id="idHidddenForprvtreat" value="0" />'

			+ '<div class="panel-body">'

			+ '<div class="col-md-12-1">'

			+ '<table style="width:100%">'
			+ '<tr>'
			+ '<td>'
			+ '<div class="form-group">'
			+ '<label class="col-md-18 "style="margin-top: 5px;">Previous Fertility Treatment </label> </div></td>'
			+ '<td><label class="radio-inline"><input type="radio" name="previousfertilitytreatment"value="Yes">Yes</label></td>'
			+ '<td> <label class="radio-inline"><input type="radio"  name="previousfertilitytreatment"value="No">No</label></td>'
			+ '<td><div class="pull-right">'
			+ '<button id="savepreviousfertilitytreatmentId" class="btn btn-xs btn-success editUserAccess"data-toggle="tooltip" data-placement="left" title="Save Previous Fertility Information"onclick="savepreviousfertilitytreatment()"> <i class="fa fa-save"></i></button> &nbsp&nbsp&nbsp'

			+ '<button class="btn btn-xs btn-warning" data-toggle="tooltip"'
			+ 'data-toggle="tooltip" data-placement="left"'
			+ 'title="Print"'
			+ 'onclick="PreviousFertilityTreatprint()">'
			+ '<i class="fa fa-print"></i>'
			+ '</button>'
			+ '</td>'
			+ '</div>'
			+ '</tr>'

			+ '<tr>'
			+ '<td>'
			+ '<div class="form-group">'
			+ '<label class="col-md-1 center"disableUnderline: true>#</label></div>'
			+ '</td>'
			+ '<td><label class="">Date(MM/DD/YYYY)</td>'
			+ '<td><label class="">Remark</label></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td>'
			+ '<div class="col-md-18">'
			+ '<label class="control-label col-md-18">Time InterCourse(TI)</label>'
			+ '<div class="make-switch switch-small" data-on="info" data-off="success" data-on-label="<i class="fa fa-check icon-white"></i></div></div></td>'
			+ '<td><input type="date" id="timeintercoursedate" name="timeintercoursedate"></td>'
			+ '<td><textarea id="timeintercourseremark" name="timeintercourseremark" rows="4"cols="60"></textarea></td> '
			+ '</tr>'

			+ '<tr>'
			+ '<td>'
			+ '<div class="col-md-18">'
			+ '<label class="control-label col-md-18">Ovalution Induction(OT)</label>'
			+ '<div class="make-switch switch-small" data-on="info" data-off="success" data-on-label="<i class="fa fa-check icon-white"></i></div></div></td>'
			+ '<td><input type="date"id="ovalutioninductiondate" name="ovalutioninductiondate">'
			+ '<td>'
			+ '<textarea id="ovalutioninductionremark" name="ovalutioninductionremark" rows="4"cols="60"></textarea>'
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td>'
			+ '<div class="col-md-18">'
			+ ' <label class="control-label col-md-18">Intrauterine Inseminatin(IUI)</label>'
			+ '<div class="make-switch switch-small" data-on="info" data-off="success" data-on-label="<i class="fa fa-check icon-white"></i></div></div></td>'
			+ '<td>'
			+ '<input type="date"id="intrauterineinseminatindate" name="intrauterineinseminatindate">'
			+ '</td>'
			+ '<td><textarea id="intrauterineinseminatinremark" name="intrauterineinseminatinremark" rows="4"cols="60"></textarea></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td><div class="form-group"><label class="control-label col-md-18 ">&nbsp&nbsp&nbsp ART</label></div></td>'
			+ '<td><label class="radio-inline"><input  name="art"type="radio" value="Yes">Yes</label></td>'
			+ '<td> <label  class="radio-inline"><input  name="art" type="radio" value="No">No</label></td></tr>'

			+ '<tr>'
			+ '<td><div class="col-md-18">'
			+ '<label class="control-label col-md-18">IVF/ICSI Self</label>'
			+ '<div class="make-switch switch-small" data-on="info" data-off="success" data-on-label="<i class="fa fa-check icon-white"></i></div></div></td>'
			+ '<td><input type="date" id="ivficsiselfdate" name="ivficsiselfdate"></td>'
			+ '<td><textarea id="ivficsiselfremark" name="ivficsiselfremark" rows="4"cols="60"></textarea></td></tr>'

			+ '<tr><td><div class="col-md-18"><label class="control-label col-md-18">Donor Eggs</label>'
			+ '<div class="make-switch switch-small" data-on="info" data-off="success" data-on-label="<i class="fa fa-check icon-white"></i></div></div></td>'
			+ '<td><input type="date" id="donoreggsdate" name="donoreggsdate"></td>'
			+ '<td><textarea  id="donoreggsremark" name="donoreggsremark"  rows="4"cols="60"></textarea> </td> </tr>'

			+ '<tr><td><div class="col-md-18">'
			+ '<label class="control-label col-md-18">Donor Semen</label>'
			+ '<div class="make-switch switch-small" data-on="info"data-off="success" data-on-label="<i class="fa fa-check icon-white"></i></div></div></td>'
			+ '<td><input type="date" id="donorsemendate" name="donorsemendate"></td>'
			+ '<td><textarea id="donorsemenremark" name="donorsemenremark"  rows="4"cols="60"></textarea></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td><div class="col-md-18">'
			+ ' <label class="control-label col-md-18">ED Cycle</label>'
			+ '<div class="make-switch switch-small" data-on="info"	data-off="success"data-on-label="<i class="fa fa-check icon-white"></i></div>'
			+ '</div></td>'
			+ '<td><input type="date" id="edcycledate" name="edcycledate">'
			+ '</td>'
			+ '<td><textarea id="edcycleremark" name="edcycleremark" class="" rows="4"cols="60"></textarea></td>'
			+ '</tr>'

			+ '</table>'
			+ '<div class="col-md-18">'
			+ '	<div class="form-group">'

			+ '<p><label class="TextFont">Any Other Treatment/AlternateTreatment</label>'
			+ '</p>'
			+ '<textarea id="anyothertreatmentalternatetreatment" name="anyothertreatmentalternatetreatment" id="" class="" rows="4"cols="70"></textarea>'
			+ '</div>' + '</div>' + '</div>' + '</div>' + '</div>	' + '</div>'
			+ '</div>' + '</div>' + '</div>' + '</div>'

	$("#ipdDoctorStationJSPHeadDiv").html(ptemp);
	
	var prevtr = $("#prevtr").val();
	if(prevtr == "previousIvfTreatment"){
		//alert(prevtr);
		document.getElementById("savepreviousfertilitytreatmentId").disabled = "true";
	}

}

function gynExamHis() {
	var ttemp = '<div id="HistoryGYN" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 10px;">'
			+ '<ul id="History" class="nav nav-tabs colorChanges" style="height: 950px;">'
			+ '<li id="History" class="">'
			+ '<a data-toggle="tab" href="#History" style="background-color: rgb(248, 196, 113);"onclick=temForNewHistory();>History</a>'
			+ '</li>';

	ttemp = ttemp
			+ '<li id="Gynhistory" class="active">'
			/*
			 * + '<a data-toggle="tab" href="#Gynhistory"
			 * onclick=temForHistoryIVF11(id);setNewtempAdvice(this.id);>Gynaecological
			 * History</a>'
			 */
			+ '<a data-toggle="tab" href="#Gynhistory" onclick="gynHistoryOpd();fetchGynaecologicalHistory();">Gynaecological History</a>'
			+ '</li>'

	ttemp = ttemp
			+ '<li id="ObstetricsHistory" class="">'
			+ '<a data-toggle="tab" href="#ObstetricsHistory" onclick="">Obstetrics History</a>'
			+ '</li>'

			// temp = temp
			+ '<li id="PrevFertiTreat" class="">'
			+ '<a data-toggle="tab" href="#PrevFertiTreat" onclick="previousfertilitytreatment();fetchsavepreviousfertilitytreatment();">Previous Fertility Treatement</a>'
			+ '</li>'

	ttemp = ttemp
			+ '<li id="SurgicalHistory" class="">'
			+ '<a data-toggle="tab" href="#SurgicalHistory" onclick="newSurgical(),fetchSurgicalHistory()"> Surgical History</a>'
			+ '</li>'

	ttemp = ttemp
			+ '<li id="PreRepList" class="">'
			+ '<a data-toggle="tab" href="#PreRepList" onclick=""> Previous Reports List</a>'
			+ '</li>'

			// temp = temp
			+ '<li id="GynExamHis" class="">'
			+ '<a data-toggle="tab" href="#GynExamHis" onclick="gynExamHis();fetchGynoExam();"> Gynacological Examination</a>'
			+ '</li>'

	// }
	ttemp = ttemp
			+ '</ul>'

			+ ' <div class="tabbable tabs-left col-md-12-1" style="width: 900px;margin-top: 10px;margin-left: 5px;border: 1px solid #b8b8b8; height: 900px;" id="GynExamHis"> '
			+ '	<div id="HSTDiv" class="panel body col-md-12 "'
			+ '	style=" height: 500Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">'

			+ '   <div style="margin-top: 5px;">'
			+ ' <div class="panel-body" id="studyModalTableIVFF" style="margin-bottom: -5%;">'
			// + '  <div class="pull-right" style="margin-top: opx"><input
			// type="button" value="Delete"
			// onclick="toRmvStudyDivForGynStudy(rowCount)"()"
			// id="Gynsavebasicinfo" class="btn btn-xs btn-warning style" />
			// </div>'
			+ '<div class="pull-right" style="margin-top: opx">&nbsp&nbsp<input type="button" value="Print" onclick="GynExamprint()"id="deletebasicinfoF" class="btn btn-xs btn-warning style="margin-top: 40px" />&nbsp;&nbsp&nbsp&nbsp&nbsp</div>'
			+ ' <div  id="moveF">'
			// + '   <div style="margin-top: 10px;">'
			//  + ' <div class="panel-body" id="studyModalTableIVFF"
			// style="margin-bottom: -10%;">'
			+ '  <!-- <div class="pull-right"><input type="button" value="Save" onclick="saveGynaecologicalexamHistory()"  id="GyncreatedivF" class="btn btn-xs btn-success editUserAccess"  style="margin-top: 2px">&nbsp&nbsp&nbsp&nbsp&nbsp </div> -->'
			+ '  <div class="pull-right" style="margin-top: 0px"><input type="button" value="+" onclick="createRowForGynacologicalExamination()" id="Gynsavebasicinfo" class="btn btn-xs btn-success" /> <input type="button" value="-" onclick="deleteGynStudy()" id="deletebasicinfoF" class="btn btn-xs btn-danger" />&nbsp; <input id="saveGynaecologicalExamHistoryId" type="button" value="Save" onclick="saveGynaecologicalExamHistory()"  id="GyncreatedivF" class="btn btn-xs btn-success editUserAccess"&nbsp&nbsp&nbsp style="margin-top: 40px" /></div>'
			+ ' <div  id="moveF">'

			// + '  <div class="pull-right" style="margin-top: 1px"> <input
			// type="button" value="Delete"
			// onclick="toRmvStudyDivForGynStudy(rowCount)"  id="GyncreatedivF"
			// class="btn btn-xs btn-warning"  style="margin-top: 40px"
			// /></div>'
			// + ' <div  id="moveF">'

			// + '  <div class="pull-right" style="margin-top: 1px"> <input
			// type="button" value="Print"
			// onclick="toRmvStudyDivForGynStudy(rowCount)"  id="GyncreatedivF"
			// class="btn btn-xs btn-warning"  style="margin-top: 40px"
			// /></div>'
			//  + ' <div  id="moveF">'

			+ ' <div  class="col-sm-12-1 dynamicstructurescroll">'
			+ '<table border="1"'
			+ 'class="table table-bordered table-striped table-condensed"'
			+ 'id="GynStudyTabel">'
			+ '   <col>'

			+ ' <thead>'
			//    + ' <tr>'
			+ '<tr>  '
			+ '<th scope="col" width="5%" ></th>'
			+ '<th scope="col" width="5%" ></th>'
			+ '<th scope="col" width="5%" ></th>'
			+ '<th scope="col" width="5%" ></th>'
			+ '<th scope="col" width="5%" ></th>'
			+ '<th scope="col" width="5%" ></th>'
			// + '<th scope="col" width="5%" ></th>'
			// + '<th scope="col" width="5%" >&nbspTVS</th>'
			+ '<th colspan="3">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspTVS</th>'
			// + '<th scope="col" width="5%" ></th>'
			+ '</tr>  '

			//
			+ '<tr>  '
			+ '<th scope="col" width="5%" >#</th>'
			+ '<th scope="col" width="5%">Select</th>'

			+ ' <th scope="col"  width="15%">Date</th>'
			+ ' <th scope="col" width="10%" >P/A</th>'
			+ ' <th scope="col"  width="10%">P/S</th>'
			+ ' <th scope="col" width="10%">P/V</th>'
			+ ' <th scope="col" width="10%">AFCRO</th>'
			+ ' <th scope="col" width="10%">AFCLO</th>'
			+ ' <th scope="col" width="30%">ROD/REMARK</th>'
			//  +'<th width="20%" >CREATED BY</th>'
			//  +'<th width="40%" >CREATED DATE AND TIME</th>'
			//  +'<th >UPDATED BY</th>'
			//  +'<th >UPDATED DATE AND TIME</th>'
			+ '  <!-- <th ><input type="button" value="+" onclick="createRowForGynacologicalExamination()" id="Gynsavebasicinfo" class="editUserAccess" />&nbsp;<input type="button" value="+" onclick="createRowForGynacologicalExamination()" id="Gynsavebasicinfo" class="editUserAccess" />&nbsp;'
			+ ' </th> -->'

			+ ' </thead>'
			+ ' <tbody id="tableBodyForGynacologicalExamination" >'
			+ ' </tbody>' + '</tr>' + ' </table>'

			+ '</div>' + ' </div>' + ' </div>' + ' <!-- /panel-body -->'
			+ '</div>' + '</div>'
	$("#ipdDoctorStationJSPHeadDiv").html(ttemp);
	
	var prevtr = $("#prevtr").val();
	if(prevtr == "previousIvfTreatment"){
		//alert(prevtr);
		document.getElementById("saveGynaecologicalExamHistoryId").disabled = "true";
	}

}

function tabsetdepartmentwise123() {
	setTimeout(function() {

		var depid = $("#depdocdeskid").val();
		// var depid = 1;
		/* alert('....tabsetdepartmentwise123....depid ....'+depid) */
		if (depid == 1) {

			// $("#depdocdeskid").show();
			$("#coverSheet").show();
			// $("#Assessment").show();
			// $("#subObj").show();
			$("#prescription").show();
			$("#cpoe").show();
			$("#instructiontab").show();
			$("#SurgeryAdvices").show();
			$("#iStudy").show();
			$("#Cover_History_Opd").show();
			$("#hallnm").hide();
			$("#diet").show();
			// $("#Upload_Document").show();
			setNewtempDoctorDeskForIvf1('coverSheet');
			var risingFlow = $("#risingFlow").val();
			if (risingFlow == "on") {
				$("#staging").hide();
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
			$("#instructiontab").show();
			$("#IVF_INDENT").show();
			$("#ADNOTE2").show();
			$("#diet").show();
			$("#SurgeryAdvices").show();
			$("#finalAdvancediv").hide();// Pooja
			// $("#Cover_History_Opd").show();
			// $("#Upload_Document").show();
			setNewtempDoctorDeskForIvf1('History');
			var risingFlow = $("#risingFlow").val();

			if (risingFlow == "on") {
				$("#staging").hide();
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


function temForIVFINDENT(id) {

	var temp = '<div id="IVF_INDENT" class="tab-pane active">'
			+ '<form class="form-horizontal  col-md-12-1" method="get"><div class="form-group col-sm-1-1" style="margin-right: 2%;">'
			+ '<label for="exampleInputEmail1" class="TextFont">DocNo </label>'
			+ '<input type="text" class="form-control input-SmallText" required="true" name="first" id="first" placeholder="Doc No">'
			+ '</div><div class="form-group col-sm-1-1" style="margin-right: 2%;">'
			+ '<label for="exampleInputEmail1" class="TextFont">DocDate </label>'
			+ '<input type="text" id="popup_container2" onclick="displayCalendar(document.getElementById(\'popup_container2\'),\'dd-mm-yyyy\',this)" readonly="readonly" name="dob" placeholder="Date" value="" class="form-control input-SmallText"> <input type="hidden" name="receivedFrom" value="doctorstation" id="receivedFrom">'
			+ '</div><div class="form-group col-sm-1-1" style="margin-right: 2%;">'
			+ '<label for="exampleInputEmail1" class="TextFont">ItemShort Code</label> '
			+ '<input type="text" class="form-control input-SmallText" name="emailID" id="email" placeholder="Code"></div>'
			+ '<div class="form-group col-sm-1-1" style="margin-right: 2%; float: right;">'
			+ '<label for="exampleInputEmail1" class="TextFont">FetchFrom Stock</label>'
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
			+ '</div></div></div></div><div id="prevIndentPopUp" class="modal fade in">'

			+ '<div class="modal-dialog" style="width: 1120px;"><div class="modal-content">'
			+ '<div class="modal-header"><div class=""><h4><i class="fa fa-calendar"></i>Indent Information</h4></div></div>'
			+ '<div class="modal-body"><div style="margin-top: 00px;" class="box border primary">'
			+ '<div class="box-title"><h4><i class="fa fa-table"></i>Generated IndentInformation</h4>'
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
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>ProductName</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>BatchCode</div></th>'

			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>BatchExpiry</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Qty</div></th></tr>'
			+ '</thead><tbody id="preIndentSaleDataById"></tbody></table></div></div></div>'
			+ '<div class="modal-footer"><div class="form-group col-md-7-1" style="margin-top: 15px;">'
			+ '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div>'
			+ '</div></div><div style="margin-top: 0px; margin-left: 2px;" class="col-md-12-1">'

			+ '<div class="box border col-md-12-1"><div class="tabbable col-md-12-1"><ul class="nav nav-tabs">'
			+ '<li class="active"><a data-toggle="tab" href="#ItemInfo"><i class="fa fa-user"></i> <span class="hidden-inline-mobile">New Indent</span></a></li>'
			+ '<li class=""><a data-toggle="tab" href="#prevIndent"><i class="fa fa-user"></i> <span class="hidden-inline-mobile" onclick="previousIndentByTreatmentId()">Prev'
			+ 'Indent</span></a></li><li class=""><a data-toggle="tab" href="#divIndentMaster"><i class="fa fa-user"></i>'
			+ '<span class="hidden-inline-mobile" onclick="">IndentMaster</span></a></li>'
			+ '<li class=""><a data-toggle="tab" href="#divCancelIndentMaster"><i class="fa fa-user"></i> <span class="hidden-inline-mobile" onclick="cancelIndentByTreatmentId()">Cancel'
			+ 'Indent </span></a></li></ul>'
			+ '<div class="divide-10"></div><div class="divide-10"></div>'
			+ '<div class="tab-content col-md-12-1">	<div id="ItemInfo" class="tab-pane fade in active " style="overflow-x: auto;">'
			+ '<div class="panel-body col-md-12-1"><div style="padding-left: 12px;" class="col-sm-12-1">'
			+ '<div style="height: 85%; margin-left: 2%;"><div style="width: 95%; font-weight: bold; height: 200Px; overflow-y: scroll; border: 1px solid #436a9d;">'
			+ '<div class="col-md-12-1" style="margin-top: 15px;margin-left:0%;margin-bottom: 15px;">'
			+ '<div class="col-md-3-1">Select IndentTemplate</div>'
			+ '<div class="col-md-9-1" id="selectIndentTemplateDiv"><select name="selectIndentTemplate" id="selectIndentTemplate" onchange="setIndentRows()"><option>select</option></select></div>'
			+ '</div><button id="toManualIndent" onclick="toCreateManualIndent()" class="btn btn-xs btn-success" type="button">AddNew</button>'
			+ '<button value="_" class="btn btn-xs btn-danger" style="margin: 7px;" onclick="toRemoveRow()" type="button">-</button>'
			+ '<table cellspacing="0" cellpadding="0" border="1" id="ItemInfoTable" class="table table-bordered table-striped table-condensed" style="margin-top:1%">'
			+ '<thead><tr><th class="col-md-1 center">select</th><th class="col-md-1 ">#</th>'
			+ '<th class="col-md-4 center">ProductName</th>'
			+ '<th class="col-md-2 center">RequiredQuantity</th>'
			+ '<th class="col-md-2 center">Total Quantity</th></tr></thead>'
			+ '<tbody id="ItemInfoList" style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">'
			+ '</tbody></table></div></div></div><div class="form-group col-sm-2-1" style="margin-left: 2%;">'
			+ '<label for="exampleInputEmail1" class="TextFont">TotalDoc Qty </label><input type="text" class="form-control input-SmallText" name="totalDocQty" id="totalDocQty" placeholder="Total Doc Qty">'
			+ '</div><div class="form-group col-sm-2-1" style="margin-left: 2%;">'

			+ '<label for="exampleInputEmail1" class="TextFont">SelectStore </label> <select id="pharmaStoreId" class="form-control input-SmallText"><option value="0">Main Store</option></select>'
			+ '</div><div class=" col-sm-2-1" style="margin-left: 2%; margin-top: 2%"><input id="saveIVFPharmacyIndentId" type="button" onclick="saveIVFPharmacyIndent()" class="btn btn-xs btn-success editUserAccess" value="Generate Indent">'
			+ '</div></div></div><div id="prevIndent" class="tab-pane fade " style="overflow-x: auto;">'
			+ '<table style="margin-top: 10px; width: 100%;" class="table table-striped table-bordered header-fixed cf ">'
			+ '<thead style="background: white;" class="cf">'
			+ '<tr><th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>IndentDate</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Status</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>GeneratedFrom</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>StoreName</div></th>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>View</div></th>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>Cancel</div></th>'
			+ '</tr></thead><tbody id="preIndentData"></tbody></table></div>'
			+ '<div id="divCancelIndentMaster" class="tab-pane fade " style="overflow-x: auto;">'
			+ '<table style="margin-top: 10px; width: 100%;" class="table table-striped table-bordered header-fixed cf ">'
			+ '<thead style="background: white;" class="cf"><tr>'
			+ '<th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>IndentDate</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>Status</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>GeneratedFrom</div></th>'
			+ '<th class="col-md-2 center" style="height: 21.5px;"><div>StoreName</div></th>'
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
	
	var prevtr = $("#prevtr").val();
	if(prevtr == "previousIvfTreatment"){
		//alert(prevtr);
		document.getElementById("saveIVFPharmacyIndentId").disabled = "true";
		document.getElementById("toManualIndent").disabled = "true";
	}

}

function temForIVFuploaddoc(id) {

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
			+ '<button style=" margin-top: 3px; margin-left: 80px" class="btn btn-xs btn-success editUserAccess"  id="ifileUp" name="fileUp" onclick="uploadDocumentForIVF()" type="button">Upload Document</button>'
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

	var prevtr = $("#prevtr").val();
	if(prevtr == "previousIvfTreatment"){
		//alert(prevtr);
		document.getElementById("ifileUp").disabled = "true";
	}

}


function uploadDocumentForIVF() {  
	var doc = $("#ifile").val();             
	var note = $("#iNotes").val();               
	var Tid = $.trim($('#treatmentId').html());                
	var PatId = $.trim($('#patientId').html());   
	//Added by tarique aalam
	var files = $('#ifile').prop("files");
	var doc1 = $.map(files, function(val) { return val.name; });
	
	//var Tid = $("#TRTiD").val();    // added by paras
	//var PatId = $("#PiD").val();   // added by paras
	var ivfFlag="Y";
     var inputs = [];                
     if (doc == "") {   
    	 alert("Please select file first ");   
    	 return false;
     }   
     
 /*    var docs = doc.split("\\");               
     var doc1 = docs[0];  */   
      inputs.push('filePath=' + encodeURIComponent(doc1));                
     inputs.push('note=' + note);                
     inputs.push('tid=' + Tid);               
     inputs.push('patId=' + PatId);   
     inputs.push('ivfFlag=' + ivfFlag);
     var str = inputs.join('&');               
     jQuery.ajax({                   
    	 async : true,                   
    	 type : "POST",                   
    	 data : str + "&reqType=AJAX",                  
    	 url : "UploadDocServlet",                   
    	 timeout : 1000 * 60 * 5,                   
    	 catche : false,                    
    	 error : function() {                                            
    		 
    	 },                   
    	 success : function(r) {                      
    		 alert("Uploaded Successfully...");                     
    		 $("#ifile").val("");                       
    		 $("#iNotes").val("");                       
    		 fetchDocOfIVF();                    
    		 }               
    	 });
    }

function fetchDocOfIVF() {
	//alert("fetchdoc")
	//var Tid = $.trim($('#tid').val());  //added by sagar
	var Tid = $.trim($('#tid').val());  //added by sagar
	var patId = $.trim($('#pid').val());// added by sagar
	var inputs = [];
	inputs.push('action=fetchDocuments');
	inputs.push('tid=' + -123);
	inputs.push('patId=' + patId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PopulateDocuments",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setUploadDocList(r);
		}
	});
}