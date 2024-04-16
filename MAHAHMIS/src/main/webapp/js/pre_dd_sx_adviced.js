function getSexAdviceTemplate(id){
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	
	$("#diets").hide();
	$("#Prescription").hide();
	 $("#ddInstructions").hide();
	 $("#instructionTableHeader").hide();
		$("#instructionTableColumns").hide();
	$("#instruct").hide();
	$("#ipdDoctorStationJSPHeadDiv").html(" ");
	


	var cancerOnOff = $("#cancerOnOff").val();
	
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="active" onclick=getSexAdviceTemplate("id"),getOPDSxAdviceListByTreatmentId(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationNameOnSX();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices" style="background-color: rgb(248, 196, 113);">Surgery Advice</a>'
			+ '</li>';

	if (cancerOnOff == "on") {
		temp = temp
				+ '<li id="RadioTherapyList" class="">'
				+ '<a data-toggle="tab" href="#RadioTherapy" onclick=temForRadioTherapyOPD("id");getOPDRadioTheropyListByTreatmentId();getRadionTechnique();getRadioTheropyCheckBox();setNewtempAdviceOPD(this.id);>Radiotherapy</a>'
				+ '</li>'
				+ '<li id="ChemotherapyList">'
				+ '<a data-toggle="tab" href="#Chemotherapy" onclick=temForChemoTherapyOPD("id"),editOPDChemoByTreatmentIdAndDate("onload");setNewtempAdviceOPD(this.id);>Chemotherapy</a>'
				+ '</li>'
				+ '<li id="PalliativeCareList">'
				+ '<a data-toggle="tab" href="#PalliativeCare" onclick=temForCareAdvicesOPD("careAdvices");editOPDCareAdvice();setNewtempAdviceOPD(this.id);>Care Advices</a>'
				+ '</li>'
				+ '<li id="PlanOFTreatmentList">'
				+ '<a data-toggle="tab" href="#PlanOFTreatment" onclick=temForPlanOfAdviceOPD("id"),getPlanOfTreatmentCheckBox();getOPDPlanOfTreatmentListByTreatmentId();setNewtempAdviceOPD(this.id);>Plan Of Treatment</a>'
				+ '</li>';
	}

	temp = temp
			+ '</ul>'
			+ '<div class="tab-content col-md-10-1" style="margin-top: 10px;">'
			+ '<div id="SurgeryAdvices" class="col-md-12-1 tab-pane fade active in">'
			+ '<div class="col-md-12-1" style="padding-top: 20px;">'
			+'<input type="hidden" value="0" id="sxAdviceMasterId">'
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
			+ '<select id="department" class="form-control input-SmallText TextFont" onchange="getOperationNameOnSX()" name="">'
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
		
			+ '</div>'
			+ '<input id="adviceQueryType" type="hidden" value="insert">'
			+ '</div>'
			+ '<div class="col-md-8-1" style="margin-left: 1%; margin-top: 0px; width: 600px;">'
			+ '<div class="">'
			+ '<table class="table table-bordered table-condensed">'
			+ '<thead>'
			+ '<tr>'
			+ '<th class="col-md-1-1 center" >'
			+ '#'
			+ '</th>'
			+ '<th class="col-md-2-1 center" >'
			+ ' Name'
			+ '</th>'
			+ '<th class="col-md-1-1 center" >'
			+ 'Date'
			+ '</th>'
			+ '<th class="col-md-1-1 center" >'
			+ 'Edit'
			+ '</th>'
			+ '<th class="col-md-1-1 center" >'
			+ 'Delete'
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

	getOPDSxAdviceListByTreatmentId();
	fetchProcedureType();
	fetchProcedureGroup();


}


function temForRadioTherapyOPD(id) {
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="" onclick=getSexAdviceTemplate("id"),getOPDSxAdviceListByTreatmentId(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationNameOnSX();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices">Surgery Advice</a>'
			+ '</li>'
			+ '<li id="RadioTherapyList" class="active" onclick=temForRadioTherapyOPD("id");getOPDRadioTheropyListByTreatmentId();getRadionTechnique();getRadioTheropyCheckBox();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#RadioTherapy" style="background-color: rgb(248, 196, 113);">Radiotherapy</a>'
			+ '</li>'
			+ '<li id="ChemotherapyList">'
			+ '<a data-toggle="tab" href="#Chemotherapy" onclick=temForChemoTherapyOPD("id"),editOPDChemoByTreatmentIdAndDate("onload");setNewtempAdviceOPD(this.id);>Chemotherapy</a>'
			+ '</li>'
			+ '<li id="PalliativeCareList">'
			+ '<a data-toggle="tab" href="#PalliativeCare" onclick=temForCareAdvicesOPD("careAdvices");editOPDCareAdvice();setNewtempAdviceOPD(this.id);>Care Advices</a>'
			+ '</li>'
			+ '<li id="PlanOFTreatmentList">'
			+ '<a data-toggle="tab" href="#PlanOFTreatment" onclick=temForPlanOfAdviceOPD("id"),getPlanOfTreatmentCheckBox();getOPDPlanOfTreatmentListByTreatmentId();setNewtempAdviceOPD(this.id);>Plan Of Treatment</a>'
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
			+'<input type="hidden" value="0" id="radioTheropyMasterId">'
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
			+ '<div class="col-md-6-1" style="margin-left: 00px; margin-top: 00px;" id="radioCheckBoxId">'
			/*+ '<label>NeoAdjuvant:'
			+ '<input id="idNeoAdjv" type="checkbox" name="radiationFlagChk" value="0_1">'
			+ '</label>'
			+ '<label>Adjuvant:'
			+ '<input id="idAdjv" type="checkbox" name="radiationFlagChk" value="0_2">'
			+ '</label>'
			+ '<label>Radical :'
			+ '<input id="idRadInt"  type="checkbox" name="radiationFlagChk" value="0_3">'
			+ '</label>'
			+ '<label>Palliative:'
			+ '<input id="idRadPall" type="checkbox" name="radiationFlagChk" value="0_4">'
			+ '</label>'
			+ '<label>BrachyTherapy:'
			+ '<input id="idBranchyTheropy" type="checkbox" name="radiationFlagChk" value="0_5">'
			+ '</label>'
			+ '<label>Concomitant Chemotherapy:'
			+ '<input id="idConChemo" type="checkbox" onclick="chemoPopUp();" name="radiationFlagChk" value="0_6">'
			+ '</label>'*/
			+ '</div>'
			+ '</div>'
			+ '<div class="divide-10"></div>'
			+ '<div class="col-md-12-1" style="margin-top: 25px;">'
			+ '<div class="col-md-2-1">'
			+ '<label>Instructions:</label>'
			+ '<button class="btn btn-xs btn-primary" data-keyboard="false" data-backdrop="static" data-target="#iPackage" data-toggle="modal" onclick="getIndivisualInstructionListOnRadioTheropy();"  disabled="disabled" type="button">Add Instruction</button>'
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
			+ '<input class="btn btn-xs btn-success editUserAccess" type="button" onclick=saveRadiotherapyOPD("ipd") value="Save" disabled="disabled">'
			+ '<input class="btn btn-xs btn-primary" type="button" onclick="refreshRadioTheropyData()" value="New" style="margin-left: 10px;" disabled>'
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
			//+ '<button class="btn btn-xs btn-success editUserAccess" onclick="saveToInstructionRadiotherapy()">Save</button>'
			+'Use Instruction'
			+ '</th>'
			+ '</tr>'
			+ '</thead>'
			+ '</table>'
			+ '</div>'
			+ '<div id="instructionTableColumnsRadio" class="col-sm-12-1" style="margin-top: -21px; height: 372px; max-height: auto; border: 1px solid #b8b8b8; overflow-y: scroll;">'
			+ '<table class="table table-striped table-condensed">'
			+ '<tbody id="TreatmentInstructionTempRadioTheropy">'
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
			+ '<th class="col-md-1-1 center" >'
			+ '#'
			+ '</th>'
			+ '<th class="col-md-2-1 center" >'
			+ 'Serum Creatine'
			+ '</th>'
			+ '<th class="col-md-2-1 center" >'
			+ 'Radiation Technique'
			+ '</th>'
			+ '<th class="col-md-2-1 center" >'
			+ 'Adviced Simulation Date & Time'
			+ '</th>'
			+ '<th class="col-md-2-1 center" >'
			+ 'Adviced Treatment Date & Time'
			+ '</th>'
			+ '<th class="col-md-1-1 center">'
			+ 'Edit'
			+ '</th>'
			+ '<th class="col-md-1-1 center" >'
			+ 'Delete'
			+ '</th>'
			+ '</tr>'
			+ '</thead>'
			
			+ '</table>'
			+ '</div>'
			+ '<div class="col-sm-12-1" style="margin-top: -21px; height: 150px; max-height: auto; border: 1px solid #b8b8b8; overflow-y: scroll;">'
			+ '<table class="table table-striped table-condensed cf">'
			+ '<tbody id="viewRadioTempOPD">'
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
			+ '<div class="TextFont">Radiation Technique11</div>'
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

function temForChemoTherapyOPD(id) {
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="" onclick=getSexAdviceTemplate("id"),getOPDSxAdviceListByTreatmentId(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationNameOnSX();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices">Surgery Advice</a>'
			+ '</li>'
			+ '<li id="RadioTherapyList" onclick=temForRadioTherapyOPD("id");getOPDRadioTheropyListByTreatmentId();getRadionTechnique();getRadioTheropyCheckBox();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#RadioTherapy" style="background-color: rgb(248, 196, 113);">Radiotherapy</a>'
			+ '</li>'
			+ '<li id="ChemotherapyList" class="active">'
			+ '<a data-toggle="tab" href="#Chemotherapy" onclick=temForChemoTherapyOPD("id"),editOPDChemoByTreatmentIdAndDate("onload");setNewtempAdviceOPD(this.id);>Chemotherapy</a>'
			+ '</li>'
			+ '<li id="PalliativeCareList">'
			+ '<a data-toggle="tab" href="#PalliativeCare" onclick=temForCareAdvicesOPD("careAdvices");editOPDCareAdvice();setNewtempAdviceOPD(this.id);>Care Advices</a>'
			+ '</li>'
			+ '<li id="PlanOFTreatmentList">'
			+ '<a data-toggle="tab" href="#PlanOFTreatment" onclick=temForPlanOfAdviceOPD("id"),getPlanOfTreatmentCheckBox();getOPDPlanOfTreatmentListByTreatmentId();setNewtempAdviceOPD(this.id);>Plan Of Treatment</a>'
			+ '</li>'
			+ '</ul>'
			+ '<div id="Chemotherapy" class="col-md-10-1 tab-pane fade" style="margin-top: 10px;">'
			+ '<div id="documentByName" style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<input id="chemoAuto"  style="margin-left: -40px" maxlength="120" name="chemoAuto" onkeypress=getautosuggestionOfChemoTheropy(this.id); onblur=addChemoToAssignOnAuto("Proto"); autocomplete="off" placeholder="Enter Chemotherapy"/>'
			+ '<label id="" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" class="btn" onclick="allSetNew();" disabled="true"> <i class="fa fa-trash-o"></i> Remove </label> '
			+ '<button type="button" id="HistoryChemo"onclick="getOPDChemoListByTreatmentId()"class="btn btn-xs btn-warning">History</button> '
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
			+'<input type="hidden" value="0" id="chemoTheropyMasterId">'
			+ '<input id="chemoDate" style="margin-left: 700px" class="form-control input-SmallText" type="text" onclick=displayCalendar(document.getElementById("chemoDate"),"yyyy-mm-dd",this); onchange=editOPDChemoByTreatmentIdAndDate();fetchPatChemoOrderSheet("chemo") readonly="readonly" placeholder="Date"> </div>'
			+ '<button type="button" id="ichemoDate" onclick=saveOPDChemoTheropy(); disabled="disabled" class="btn btn-xs btn-success" style="margin-left: 515px">Save</button> '
			+ '<button id="ipdChemoRound" onclick="printOPDChemoTheropy()" data-placement="left" data-toggle="tooltip"'
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
			+ '<div class="col-md-4-1" style="margin-top: -19px;"> <input id="nextBloodDate" class="form-control input-SmallText" type="text" onclick=displayCalendar(document.getElementById("nextBloodDate"),"yyyy-mm-dd",this); onchange=checkPrevCurrDate("Chemotherapy"); readonly="readonly" placeholder="Date"> </div>'
			+ '<div class="col-md-5-1" style="margin-top: 10px;"> </div>'
			+ '<div class="col-md-4-1" style="margin-top: 10px; margin-left:-42%;"> <label> Chemo Date:</label> </div>'
			+ '<div class="col-md-4-1" style="margin-top: 10px; margin-left:-9%;">'
			+ '<input id="nextChemoDate" class="form-control input-SmallText" type="text" onclick=displayCalendar(document.getElementById("nextChemoDate"),"yyyy-mm-dd",this); onchange=checkPrevCurrDate("Chemotherapy"); readonly="readonly" placeholder="Date"> </div>'
			+ '<div class="col-md-5-1" style="margin-top: 10px;"></div>'
			+ '<div class="col-md-4-1" style="margin-top: 10px; margin-left:-42%"> <label>Next Visit Date:</label> </div>'
			+ '<div class="col-md-4-1" style="margin-top: 10px; margin-left:-9%;"> <input id="nextVisitDate" class="form-control input-SmallText" type="text" onclick=displayCalendar(document.getElementById("nextVisitDate"),"yyyy-mm-dd",this); onchange=checkPrevCurrDate("Chemotherapy"); readonly="readonly" placeholder="Date"> </div>'
			+ '<div class="col-md-5-1" style="margin-top: 10px;"> </div>'
			+ '</div> <div class="divide-10"></div>'
			+ '</div></div></form><br>'
			+ '<input type="hidden" id="chemoId" value="0" />'
			+ '<input type="hidden" id="orderSheet" value="0" />'
			+ '<div class="divide-10"></div></div></div></div></div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);
}

function temForCareAdvicesOPD(id) {
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="" onclick=getSexAdviceTemplate("id"),getOPDSxAdviceListByTreatmentId(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationNameOnSX();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices">Surgery Advice</a>'
			+ '</li>'
			+ '<li id="RadioTherapyList" class="">'
			+ '<a data-toggle="tab" href="#RadioTherapy" onclick=temForRadioTherapyOPD("id");getOPDRadioTheropyListByTreatmentId();getRadionTechnique();getRadioTheropyCheckBox();setNewtempAdviceOPD(this.id);>Radiotherapy</a>'
			+ '</li>'
			+ '<li id="ChemotherapyList">'
			+ '<a data-toggle="tab" href="#Chemotherapy" onclick=temForChemoTherapyOPD("id"),editOPDChemoByTreatmentIdAndDate("onload");setNewtempAdviceOPD(this.id);>Chemotherapy</a>'
			+ '</li>'
			+ '<li id="PalliativeCareList" class="active" onclick=temForCareAdvicesOPD("careAdvices");editOPDCareAdvice();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#PalliativeCare" style="background-color: rgb(248, 196, 113);">Care Advices</a>'
			+ '</li>'
			+ '<li id="PlanOFTreatmentList">'
			+ '<a data-toggle="tab" href="#PlanOFTreatment" onclick=temForPlanOfAdviceOPD("id"),getPlanOfTreatmentCheckBox();getOPDPlanOfTreatmentListByTreatmentId();setNewtempAdviceOPD(this.id);>Plan Of Treatment</a>'
			+ '</li>'
			+ '</ul>'
			+ '<div class="tab-content col-md-10-1" style="margin-top: 10px;">'
			+ '<div id="PalliativeCare" class="col-md-12-1 tab-pane in">'
			+ '<div class="col-md-12-1" style="padding-top: 20px;">'
			+ '<div class="panel-body col-md-12-1">'
			+'<input type="hidden" value="0" id="careAdviceMasterId">'
			+ '<div class="col-md-3-1" style="margin-top: 10px;">'
			+ '<label>Palliative Care Advice:</label>'
			+ '</div>'
			+ '<div>'
			+ '<textarea rows="5" cols="100" id="idPalliativeAdvice"></textarea>'
			+ '<button style="margin-top: 10px" class="btn btn-xs btn-success" '
			+ 'onclick="saveOPDCareAdvice()" id="iSaveSupportiveAdvice" type="button" disabled="disabled">Save</button>'
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

function temForPlanOfAdviceOPD(id) {
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="" onclick=getSexAdviceTemplate("id"),getOPDSxAdviceListByTreatmentId(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationNameOnSX();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices">Surgery Advice</a>'
			+ '</li>'
			+ '<li id="RadioTherapyList" class="">'
			+ '<a data-toggle="tab" href="#RadioTherapy" onclick=temForRadioTherapyOPD("id");getOPDRadioTheropyListByTreatmentId();getRadionTechnique();getRadioTheropyCheckBox();setNewtempAdviceOPD(this.id);>Radiotherapy</a>'
			+ '</li>'
			+ '<li id="ChemotherapyList">'
			+ '<a data-toggle="tab" href="#Chemotherapy" onclick=temForChemoTherapyOPD("id"),editOPDChemoByTreatmentIdAndDate("onload");setNewtempAdviceOPD(this.id);>Chemotherapy</a>'
			+ '</li>'
			+ '<li id="PalliativeCareList">'
			+ '<a data-toggle="tab" href="#PalliativeCare" onclick=temForCareAdvicesOPD("careAdvices");editOPDCareAdvice();setNewtempAdviceOPD(this.id);>Care Advices</a>'
			+ '</li>'
			+ '<li id="PlanOFTreatmentList" class="active" onclick=temForPlanOfAdviceOPD("id"),getPlanOfTreatmentCheckBox();getOPDPlanOfTreatmentListByTreatmentId();setNewtempAdviceOPD(this.id);>'
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
			+ '<button style="margin-right: 20px;" class="btn btn-xs btn-success" onclick="saveOPDPlanOfTreatment()" disabled="disabled" title="Save Plan Of Treatment" data-placement="left" data-toggle="tooltip">'
			+ 'Save'
			+ '</th></tr>'
			+ '</table>'
			+ '<table class="table table-bordered table-condensed cf" id="planOfTreatmentCheckBoxId">'
			+ '<tbody >'
			+ '<tr style="background-color: #fffcfc">'
			/* '<td>'
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
			+ '</td>' */
			+ '</tr>'
			+ '</tbody>' 
			+ '</table>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '</div>' 
			+ '</div>'
			+ '</div>'
			+ '</div>';
	$("#ipdDoctorStationJSPHeadDiv").html(temp);
}


function setNewtempAdviceOPD(id) {
	
	$("#" + id).addClass("active");
	var prevtret = $('#prevtr').val();
	
	if (prevtret == "previousTreatmentOPDER") {
	//	$("#SurgeryAdvices *").prop('disabled', true);
	//	$("#RadioTherapy *").prop('disabled', true);
		//$("#Chemotherapy *").prop('disabled', true);
		//$("#PalliativeCare *").prop('disabled', true);
	//	$("#PlanOFTreatment *").prop('disabled', true);
		$("#ipdChemoRound").button({
			disabled : false
		});
	} else {
		//$("#SurgeryAdvices *").prop('disabled', false);
		//$("#RadioTherapy *").prop('disabled', false);
		//$("#Chemotherapy *").prop('disabled', false);
		//$("#PalliativeCare *").prop('disabled', false);
		//$("#PlanOFTreatment *").prop('disabled', false);
	}

}

function saveAdviceOPD(){
	
	var sxAdviceMasterId = $("#sxAdviceMasterId").val();
	
	var procedureTypeId = $("#selOTtype").val();
	//procedureTypeId=0;
	
	if(procedureTypeId == 0){
		alert("Please Select Procedure Type First...");
		return false;
	}
	
	var procedureGroupId = $("#department").val();
	//procedureGroupId=0;

	if(procedureGroupId == 0){
		alert("Please Select Procedure Group First...");
		return false;
	}
	
	var procedureNameId = $("#selOTName").val();
	//procedureNameId=0;
	
	if(procedureNameId == 0){
		alert("Please Select Operation Name First...");
		return false;
	}
	
	var procedureName=$("#selOTName option:selected").text();
	
	var radicalFlag="N";
	if($('#idRadical').is(':checked')){ 
		radicalFlag="Y";
	} 
	
	var palliativeFlag="N";
	if($('#idPalliative').is(':checked')){ 
		palliativeFlag="Y";
	} 
	
	var indicationOfSurgery = $("#indicationSurgery").val();
	
	var riskFactor = $("#riskFactor1").val();
	
	var adviceDate = $("#adviceDate").val();
	
	//var userId = $("#userId").val();
	var userId=1;

	//var unitId = $("#unitId").val();
	var unitId=1;

	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();
	
	var inputs = [];

	inputs.push('sxAdviceMasterId=' + sxAdviceMasterId);
	inputs.push('procedureTypeId=' + procedureTypeId);
	inputs.push('procedureGroupId=' + procedureGroupId);
	inputs.push('procedureNameId=' + procedureNameId);
	inputs.push('radicalFlag=' + radicalFlag);
	inputs.push('palliativeFlag=' + palliativeFlag);
	inputs.push('indicationOfSurgery=' + indicationOfSurgery);
	inputs.push('riskFactor=' + riskFactor);
	inputs.push('adviceDate=' + adviceDate);
	inputs.push('unitId=' + unitId);
	inputs.push('userId=' + userId);
	inputs.push('procedureName=' + procedureName);
	
	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('patientId=' + patientId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/saveOPDSxAdvice",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
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

			getOPDSxAdviceListByTreatmentId();
			newAdviceOPD();
		}
	});

}

function newAdviceOPD() {

	$("#sxAdviceMasterId").val(0);
	$("#testIDDiv").hide();
	$("#adviceID").val("");
	$("#selOTtype").val("0");
	$("#department").val("0");
	$("#selOTName").val("0");
	$("#indicationSurgery").val("");
	$("#riskFactor1").val("");
	$("#idRadical").prop('checked', false);
    $("#idPalliative").prop('checked', false);
	$("#adviceDate").val($("#currentDateForwardSlash2").val());

	
}

function getOPDSxAdviceListByTreatmentId(){
	var treatmentId = $("#tr_Id").val();

	//var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);

	inputs.push('unitId=' + 1);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/getOPDSxAdviceListByTreatmentId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			
			setSxAdviceListForOPDDoctorStation(r);

		}
	});
	
}

function setSxAdviceListForOPDDoctorStation(res){

	var result = '';
	var rowCount = 1;

	if (res.getListOfOPDSxAdviceDTO.length > 0) {

		for (var i = 0; i < res.getListOfOPDSxAdviceDTO.length; i++) {

			result = result + '<tr> '

			+ '	<td class="col-md-1-1 center">' + rowCount + '</td> '

			+ '	<td class="col-md-2-1 center">' + res.getListOfOPDSxAdviceDTO[i].procedureName + '</td> '

			+ '	<td class="col-md-1-1 center">' + res.getListOfOPDSxAdviceDTO[i].adviceDate + '</td> '
			
			+ '	<td class="col-md-1-1 center">' 
			+ "<button class='btn btn-xs btn-success editUserAccess' onclick=editOPDSxAdvice("+res.getListOfOPDSxAdviceDTO[i].sxAdviceMasterId+") disabled='disabled'> <i class='fa fa-edit'></i> </button>"
           + '</td> '

			+ '	<td class="col-md-1-1 center">' 
			+ "<button class='btn btn-xs btn-danger editUserAccess' onclick=deleteOPDSxAdvice("+res.getListOfOPDSxAdviceDTO[i].sxAdviceMasterId+") disabled='disabled'> <i class='fa fa-trash-o'></i> </button>"
           + '</td> '

			+ '</tr> ';
			rowCount++;

		}
		$("#viewAdvicesTemp").html(result);
	}
}

function editOPDSxAdvice(id){
	var inputs = [];

	inputs.push('id=' + id);

	//inputs.push('unitId=' + unitId);


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/editOPDSxAdvice",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			$("#sxAdviceMasterId").val(r.sxAdviceMasterId);
			//$("#testIDDiv").hide();
			//$("#adviceID").val("");
			$("#selOTtype").val(r.procedureTypeId);
			$("#department").val(r.procedureGroupId);
			$("#indicationSurgery").val(r.indicationOfSurgery);
			$("#riskFactor1").val(r.riskFactor);
			
			$("#adviceDate").val(r.adviceDate);
			
			if(r.radicalFlag == "Y"){
			$("#idRadical").prop('checked', true);
			}else{
				$("#idRadical").prop('checked', false);
			}
			
			if(r.palliativeFlag == "Y"){
		    $("#idPalliative").prop('checked', true);
			}else{
				$("#idPalliative").prop('checked', false);
			}
			
			getOperationNameOnSX();
			$("#selOTName").val(r.procedureNameId);
			
			
		}
	});
	
}

function deleteOPDSxAdvice(id){

	var inputs = [];

	inputs.push('id=' + id);

	inputs.push('userId=' + 1);


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/deleteOPDSxAdvice",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			if( r==1){
				alert("Record Deleted Successfully");
				getOPDSxAdviceListByTreatmentId();
			}else{
				alert("Network Issue...");
			}
		}
	});
	

	
}

function saveRadiotherapyOPD(){
	
	
	var radioTheropyMasterId = $("#radioTheropyMasterId").val();
	
	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();
	
	var serumCreatinine = $("#serum_creatine").val();
	
	var radiationTechniqueId = $("#radiationId").val();
	radiationTechniqueId=1;

	var radiationTechniqueName=$("#radiationId option:selected").text();
	var riskFactor = $("#riskFactor").val();
	
	var instruction = $("#instructionsRadio").val();
	
	var advicedSimulationDate = $("#adviceDate2").val();
	
	var advicedSimulationTime = $("#advSimTime").val();
	
	var advicedTreatmentDate = $("#adviceDateTreatment").val();
	
	var advicedTreatmentTime = $("#advTrtTime").val();
	
	var UHID="123";
	 var unitId=1;
	 var userId=1;
	
	
	var radioSlaveDetails = {   
			getListOfTheropySlaveDTO : []
		};
	
	var radioMasterDetails = {   
			getListOfOPDTheropyDTO : []
		};
	
	
	
	
	
	
	$('[name="radiationFlagChk"]:checked').each(function () {
	   
		var ids= $(this).val()
		var idArray=ids.split("_");
		var radioTheropySlaveId=idArray[0];
		var radioValue=idArray[1];
		
	
	     
		radioSlaveDetails.getListOfTheropySlaveDTO.push({
			radioTheropySlaveId:radioTheropySlaveId,
			radioValue:radioValue,
			unitId:unitId,
			userId:userId
	       })
	});
	
	
	radioMasterDetails.getListOfOPDTheropyDTO.push({
		radioTheropyMasterId:radioTheropyMasterId,
		UHID:UHID,
		serumCreatinine:serumCreatinine,
		radiationTechniqueId:radiationTechniqueId,
		riskFactor:riskFactor,
		instruction:instruction,
		advicedSimulationDate:advicedSimulationDate,
		advicedSimulationTime:advicedSimulationTime,
		advicedTreatmentDate:advicedTreatmentDate,
		advicedTreatmentTime:advicedTreatmentTime,
		unitId:unitId,
		userId:userId,
		getListOfTheropySlaveDTO:radioSlaveDetails.getListOfTheropySlaveDTO
       })

	
	//var json = JSON.parse(radioSlaveDetails);
	//json.getListOfTheropySlaveDTO
	
	var obj={
			radioTheropyMasterId:radioTheropyMasterId,
			UHID:UHID,
			serumCreatinine:serumCreatinine,
			radiationTechniqueId:radiationTechniqueId,
			riskFactor:riskFactor,
			instruction:instruction,
			advicedSimulationDate:advicedSimulationDate,
			advicedSimulationTime:advicedSimulationTime,
			advicedTreatmentDate:advicedTreatmentDate,
			advicedTreatmentTime:advicedTreatmentTime,
			unitId:unitId,
			userId:userId,
			//getListOfTheropySlaveDTO:json.getListOfTheropySlaveDTO
			getListOfTheropySlaveDTO :[ {
				radioTheropySlaveId:0,
			radioValue:1,
			unitId:1,
			userId:1
	       }]
	}
	
	var inputs = [];
		
    //alert(JSON.stringify(radioSlaveDetails));
    //inputs.push("obj=" +obj);
    
	//inputs.push("radioMasterDetails=" +	radioMasterDetails);
	
	
	inputs.push('radioTheropyMasterId=' + radioTheropyMasterId);
	
	inputs.push('UHID=' + UHID);
	inputs.push('serumCreatinine=' + serumCreatinine);
	inputs.push('radiationTechniqueId=' + radiationTechniqueId);
	inputs.push('radiationTechniqueName=' + radiationTechniqueName);
	inputs.push('riskFactor=' + riskFactor);
	inputs.push('instruction=' + instruction);
	
	inputs.push('advicedSimulationDate=' + advicedSimulationDate);
	inputs.push('advicedSimulationTime=' + advicedSimulationTime);
	inputs.push('advicedTreatmentDate=' + advicedTreatmentDate);
	inputs.push('advicedTreatmentTime=' + advicedTreatmentTime);
	
	
	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push("radioSlaveDetails=" +	encodeURIComponent(JSON.stringify(radioSlaveDetails)));
    
	var str = inputs.join('&');
	jQuery.ajax({
		 
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//data: JSON.stringify(obj),
		 
		url : "ehat/opdsxadvice/saveOPDRadioTheropy",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
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

			getOPDRadioTheropyListByTreatmentId();
			getRadioTheropyCheckBox();
			refreshRadioTheropyData();
		}
	});

}



function getOPDRadioTheropyListByTreatmentId(){
	var treatmentId = $("#tr_Id").val();

	//var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);

	inputs.push('unitId=' + 1);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/getOPDRadioTheropyListByTreatmentId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			
			setRadioTheropyListForOPDDoctorStation(r);

		}
	});
	
}


function setRadioTheropyListForOPDDoctorStation(res){

	var result = '';
	var rowCount = 1;
	

	if (res.getListOfOPDTheropyDTO.length > 0) {

		for (var i = 0; i < res.getListOfOPDTheropyDTO.length; i++) {

			
			result = result + '<tr> '

			+ '	<td class="col-md-1-1 center">' + rowCount + '</td> '

			+ '	<td class="col-md-2-1 center">' + res.getListOfOPDTheropyDTO[i].serumCreatinine +'</td> '
			
			+ '	<td class="col-md-2-1 center">' + res.getListOfOPDTheropyDTO[i].radiationTechniqueName +'</td> '

			+ '	<td class="col-md-2-1 center">' + res.getListOfOPDTheropyDTO[i].advicedSimulationDate +"  "+ res.getListOfOPDTheropyDTO[i].advicedSimulationTime+ '</td> '
			
			+ '	<td class="col-md-2-1 center">' + res.getListOfOPDTheropyDTO[i].advicedTreatmentDate + " "+res.getListOfOPDTheropyDTO[i].advicedTreatmentTime+ '</td> '
			
			
			
			+ '	<td class="col-md-1-1 center">' 
			+ "<button class='btn btn-xs btn-success editUserAccess' onclick=editOPDRadioTheropy("+res.getListOfOPDTheropyDTO[i].radioTheropyMasterId+")  disabled='disabled'> <i class='fa fa-edit'></i> </button>"
           + '</td> '

			+ '	<td class="col-md-1-1 center">' 
			+ "<button class='btn btn-xs btn-danger editUserAccess' onclick=deleteOPDRadioTheropy("+res.getListOfOPDTheropyDTO[i].radioTheropyMasterId+") disabled='disabled'> <i class='fa fa-trash-o'></i> </button>"
           + '</td> '

			+ '</tr> ';
			rowCount++;
		
		}
		$("#viewRadioTempOPD").html(result);
	}
}


function refreshRadioTheropyData() {
	$("#radioTheropyMasterId").val(0);
	$("#serum_creatine").val("");
	$("#serum_creatine").val("");
	$("#radiationId").val(0);
	$("#radiotherapyId").val("0");
	$("#instructionsRadio").val("");
	$("#indicationSurgery2").val("");
	$("#riskFactor").val("");
	$("#adviceDate2").val(" ");
	$("#adviceDateTreatment").val(" ");
	$("#radioHead").html("Add Radiotherapy");
	$("#advSimTime").val("");
	$("#advTrtTime").val("");
	$("#idNeoAdjv").prop('checked', false);
	$("#idAdjv").prop('checked', false);
	$("#idRadInt").prop('checked', false);
	$("#idRadPall").prop('checked', false);
	$("#idBranchyTheropy").prop('checked', false);
	$("#idConChemo").prop('checked', false);
	}

function editOPDRadioTheropy(id){

	var inputs = [];

	inputs.push('id=' + id);

	//inputs.push('unitId=' + unitId);


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/editOPDRadioTheropy",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			$("#radioTheropyMasterId").val(r.radioTheropyMasterId);
			$("#serum_creatine").val(r.serumCreatinine);
			
			$("#radiationId").select2('val',r.radiationTechniqueId);
			
			$("#instructionsRadio").val(r.instruction);
			//$("#indicationSurgery2").val("");
			$("#riskFactor").val(r.riskFactor);
			$("#adviceDate2").val(r.advicedSimulationDate);
			$("#adviceDateTreatment").val(r.advicedTreatmentDate);
			
			$("#advSimTime").val(r.advicedSimulationTime);
			$("#advTrtTime").val(r.advicedTreatmentTime);
			
			//editRadio
			getRadioTheropyCheckBox();
			
			for(var i=0; i< r.getListOfTheropySlaveDTO.length;i++){
				var neo_id = r.getListOfTheropySlaveDTO[i].radioValue;
				
				$("#radio"+neo_id).prop('checked',true);
				
				 $("#radio"+neo_id).val(r.getListOfTheropySlaveDTO[i].radioTheropySlaveId+"_"+r.getListOfTheropySlaveDTO[i].radioValue);
				
				
			}
			
			
			//endedit radio
		}
	});
	

	
	
}


function deleteOPDRadioTheropy(id){


	var inputs = [];

	inputs.push('id=' + id);

	inputs.push('userId=' + 1);


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/deleteOPDRadioTheropy",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			if( r==1){
				alert("Record Deleted Successfully");
				getOPDRadioTheropyListByTreatmentId();
			}else{
				alert("Network Issue...");
			}
		}
	});
	

	

	
}


function getRadionTechnique(){
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/radiation_master/getAllRadiationMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "<option value='0'>select</option>";
	           
            for ( var i = 0; i < r.lstradiationMaster.length; i++){             
	                divContent = divContent + "<option value='" + r.lstradiationMaster[i].radiationId + "'  >"
	                        + r.lstradiationMaster[i].radiationName + "</option>";
            }
           
            $("#radiationId").html(divContent);
            $("#radiationId").select2();
          
		}
	});
}


function saveOPDCareAdvice(){
	
var careAdviceMasterId = $("#careAdviceMasterId").val();

var palliativeCareAdvice = $("#idPalliativeAdvice").val();

var supportiveCare = $("#idSupportiveAdvice").val();

var preventiveCare = $("#idPreventiveAdvice").val();

var rehabilitativeCare = $("#idRehabilitativeAdvice").val();

var otherServices = $("#idOtherServices").val();


var UHID="";

var unitId=1;

var userId=1;
	
	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();
	
	var inputs = [];
	
	inputs.push('careAdviceMasterId=' + careAdviceMasterId);
	
	inputs.push('palliativeCareAdvice=' + palliativeCareAdvice);
	
	inputs.push('supportiveCare=' + supportiveCare);
	
	inputs.push('preventiveCare=' + preventiveCare);
	
	inputs.push('rehabilitativeCare=' + rehabilitativeCare);
	
	inputs.push('otherServices=' + otherServices);
	
	inputs.push('UHID=' + UHID);
	
	
	
	inputs.push('unitId=' + unitId);
	
	inputs.push('userId=' + userId);

	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('patientId=' + patientId);

	

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/saveOPDCareAdvice",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			if(r==1){
				alert("Record Saved Suucessfully");
				editOPDCareAdvice();
			}else if(r ==2){
				alert("Record Updated Successfully");
				editOPDCareAdvice();
			}else{
				alert("Network Issue");
			}

		}
	});
	
	
}


function editOPDCareAdvice(){

	var inputs = [];

	var tr_Id = $("#tr_Id").val();
	

	inputs.push('id=' + tr_Id);

	//inputs.push('unitId=' + unitId);


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/editOPDCareAdvice",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

		 $("#careAdviceMasterId").val(r.careAdviceMasterId);

			$("#idPalliativeAdvice").val(r.palliativeCareAdvice);

			$("#idSupportiveAdvice").val(r.supportiveCare);

			$("#idPreventiveAdvice").val(r.preventiveCare);

			$("#idRehabilitativeAdvice").val(r.rehabilitativeCare);

			$("#idOtherServices").val(r.otherServices);
		}
	});
	

	
	
}


function getRadioTheropyCheckBox(){
	
	var inputs = [];

	var prefixCode = "RADO";
	

	inputs.push('prefixCode=' + prefixCode);

	


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/getRadioTheropyCheckBoxList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			 var temp="";
			 
			
			
		for(var i=0; i< r.lstOPDRadioTheropyCheckBox.length;i++){
			temp = temp +'<label>'+r.lstOPDRadioTheropyCheckBox[i].name+':'
			+'<input id=radio'+r.lstOPDRadioTheropyCheckBox[i].id+' type="checkbox" name="radiationFlagChk" value="0_' +r.lstOPDRadioTheropyCheckBox[i].id+'" onclick="delteRadioTheropySlave('+r.lstOPDRadioTheropyCheckBox[i].id+')">'
			+ '</label>'
			
			
		}
		
		$("#radioCheckBoxId").html(temp);
		
		}
	});
	
	
}


function delteRadioTheropySlave(id){
	var radioTheropySlaveId=0;
	var radioValue=0;
	
	/*$('[name="radiationFlagChk"]').each(function () {
		   
		var ids= $(this).val()
		var idArray=ids.split("_");
		alert("idArray.."+idArray);
		 radioTheropySlaveId=idArray[0];
		 radioValue=idArray[1];
		
	});*/
	var ids=$("#radio"+id).val();
	var idArray=ids.split("_");
	
	 radioTheropySlaveId=idArray[0];
	 radioValue=idArray[1];
	
	
	if( radioTheropySlaveId > 0) {
	var r = confirm("Please confirm to Delete Record?");
	if (r) {


		var inputs = [];

		inputs.push('id=' + radioTheropySlaveId);

		inputs.push('userId=' + 1);


		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/opdsxadvice/delteRadioTheropySlave",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				// 
			},
			success : function(r) {

				if( r==1){
					alert("Record Deleted Successfully");
					 $("#radio"+id).val("0_"+radioValue);
					getOPDRadioTheropyListByTreatmentId();
					getRadioTheropyCheckBox();
				}else{
					alert("Network Issue...");
				}
			}
		});
		
}
}
	
}


function getPlanOfTreatmentCheckBox(){
	
	var inputs = [];

	var prefixCode = "POT";
	

	inputs.push('prefixCode=' + prefixCode);

	


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/getRadioTheropyCheckBoxList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			 var temp="";
			
		for(var i=0; i< r.lstOPDRadioTheropyCheckBox.length;i++){
			temp = temp +'<label>'+r.lstOPDRadioTheropyCheckBox[i].name+':'
			+'<input id=radioPlan'+r.lstOPDRadioTheropyCheckBox[i].id+' type="checkbox" name="planoftreatmentFlagChk" value="0_' +r.lstOPDRadioTheropyCheckBox[i].id+'" onclick="deltePlanOfTreatment('+r.lstOPDRadioTheropyCheckBox[i].id+')">'
			+ '</label>'
			
			
		}
		
		$("#planOfTreatmentCheckBoxId").html(temp);
		
		}
	});
	
	
}

function saveOPDPlanOfTreatment(){
	
var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();
	
	var unitId=1;
	
	var userId=1;
	
	var UHID="";
	
	var planOfMasterDetails = {   
			getListOfPlanOfTreatmentDTO : []
		};
	
	$('[name="planoftreatmentFlagChk"]:checked').each(function () {
		   
		var ids= $(this).val()
		var idArray=ids.split("_");
		var planOfTreatMasterId=idArray[0];
		var radioValue=idArray[1];
		
	
	     
		planOfMasterDetails.getListOfPlanOfTreatmentDTO.push({
			planOfTreatMasterId:planOfTreatMasterId,
			radioValue:radioValue,
			unitId:unitId,
			userId:userId,
			uhId:UHID
	       })
	});
	
	
	var inputs = [];
	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push("planOfMasterDetails=" +	encodeURIComponent(JSON.stringify(planOfMasterDetails)));
    
	var str = inputs.join('&');
	jQuery.ajax({
		 
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//data: JSON.stringify(obj),
		 
		url : "ehat/opdsxadvice/saveOPDPlanOfTreatment",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
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
			//getPlanOfTreatmentCheckBox();
			getOPDPlanOfTreatmentListByTreatmentId();
			
			
		}
	});

	
}


function getOPDPlanOfTreatmentListByTreatmentId(){
	var treatmentId = $("#tr_Id").val();

	//var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);

	inputs.push('unitId=' + 1);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/getOPDPlanOfTreatmentListByTreatmentId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			getPlanOfTreatmentCheckBox();
			for(var i=0; i< r.getListOfPlanOfTreatmentDTO.length;i++){
				var neo_id = r.getListOfPlanOfTreatmentDTO[i].radioValue;
				
				$("#radioPlan"+neo_id).prop('checked',true);
				
				 $("#radioPlan"+neo_id).val(r.getListOfPlanOfTreatmentDTO[i].planOfTreatMasterId+"_"+r.getListOfPlanOfTreatmentDTO[i].radioValue);
				
				
			}
			
		

		}
	});
	
}




function deltePlanOfTreatment(id){
	var planOfTreatMasterId=0;
	var radioValue=0;
	
	/*$('[name="radiationFlagChk"]').each(function () {
		   
		var ids= $(this).val()
		var idArray=ids.split("_");
		alert("idArray.."+idArray);
		 radioTheropySlaveId=idArray[0];
		 radioValue=idArray[1];
		
	});*/
	var ids=$("#radioPlan"+id).val();
	var idArray=ids.split("_");
	
	planOfTreatMasterId=idArray[0];
	 radioValue=idArray[1];
	
	
	if( planOfTreatMasterId > 0) {
	var r = confirm("Please confirm to Delete Record?");
	if (r) {


		var inputs = [];

		inputs.push('id=' + planOfTreatMasterId);

		inputs.push('userId=' + 1);


		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/opdsxadvice/deltePlanOfTreatment",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				// 
			},
			success : function(r) {

				if( r==1){
					alert("Record Deleted Successfully");
					 $("#radioPlan"+id).val("0_"+radioValue);
					 getOPDPlanOfTreatmentListByTreatmentId();
					
				}else{
					alert("Network Issue...");
				}
			}
		});
		
}
}
	
}


function saveOPDChemoTheropy(){
	var chemoTheropyMasterId = $("#chemoTheropyMasterId").val();
	
	var chemotherapyProtocol = $("#iChemotherapyName").val();
	
	var location = $("#iIndication").val();
	
	var weight = $("#iWeight").val();
	
	var height = $("#iHeight").val();
	
	var bsa = $("#iBSA").val();
	
	var bloodOrder = $("#iBloodOrders").val();
	
	var allergies = $("#iAllergies").val();
	
	var history = $("#iHistory").val();
	
	var frequency = $("#iFrequency").val();
	
	var numberofCycles = $("#iNumberOfCycles").val();
	
	var dose = $("#iDose").val();
	
	var investigations = $("#iInvestigation").val();
	
	var chemoOrders = $("#iDrugOrder").val();
	
	var postMedications = $("#iPostMedications").val();
	
	var postChemoAdvice = $("#iPostChemoAdvice").val();
	
	var nextBloodTestDate = $("#nextBloodDate").val();
	if(nextBloodTestDate == ""){
		alert("Plz Select  Next Blood Test date..");
		return false;
	}else{
		nextBloodTestDate=nextBloodTestDate;
	}
	
	
	var nextChemoDate = $("#nextChemoDate").val();
	if(nextChemoDate == ""){
		alert("Plz Select  Next Chemo  date..");
		return false;
	}else{
		nextChemoDate=nextChemoDate;
	}
	
	
	var nextVisitDate = $("#nextVisitDate").val();
	if(nextVisitDate == ""){
		alert("Plz Select  Visit   date..");
		return false;
	}else{
		nextVisitDate=nextVisitDate;
	}
	
	
	
	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();
	
	var UHID="";
	
	var inputs = [];

	inputs.push('chemoTheropyMasterId=' + chemoTheropyMasterId);
	
	inputs.push('chemotherapyProtocol=' + chemotherapyProtocol);
	
	inputs.push('location=' + location);
	
	inputs.push('weight=' + weight);
	
	inputs.push('height=' + height);
	
	inputs.push('bsa=' + bsa);
	
	inputs.push('bloodOrder=' + bloodOrder);
	
	inputs.push('allergies=' + allergies);
	
	inputs.push('history=' + history);
	
	inputs.push('frequency=' + frequency);
	
	inputs.push('numberofCycles=' + numberofCycles);
	
	inputs.push('dose=' + dose);
	
	inputs.push('investigations=' + investigations);
	
	inputs.push('chemoOrders=' + chemoOrders);
	
	inputs.push('postMedications=' + postMedications);
	
	inputs.push('postChemoAdvice=' + postChemoAdvice);
	
	inputs.push('nextBloodTestDate=' + nextBloodTestDate);
	
	inputs.push('nextChemoDate=' + nextChemoDate);
	
	inputs.push('nextVisitDate=' + nextVisitDate);
	
	inputs.push('UHID=' + UHID);
	
	inputs.push('userId=' + 1);
	
inputs.push('patientId=' + patientId);
	
	inputs.push('treatmentId=' + treatmentId);
	
inputs.push('nextBloodTestDate1=' + nextBloodTestDate);
	
	inputs.push('nextChemoDate1=' + nextChemoDate);
	
	inputs.push('nextVisitDate1=' + nextVisitDate);


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/saveOPDChemoTheropy",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			if( r==1){
				alert("Record Saved Successfully");
				editOPDChemoByTreatmentIdAndDate();
				
			}else if(r==2){
				alert("Record Updated Successfully");
				editOPDChemoByTreatmentIdAndDate();
			}
			else{
				alert("Network Issue...");
			}
		}
	});
}

function getOPDChemoListByTreatmentId(){
	var treatmentId = $("#tr_Id").val();

	
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);

	inputs.push('unitId=' + 1);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/getOPDChemoListByTreatmentId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
		

			if (r.getListOfOPDChemoTheropyDTO.length > 0) {

				var htm = "<div class='col-sm-12-1' style='margin-top:20px; border: 1px solid #ddd;'>"
						+ "<table class='table table-striped table-condensed cf'>"
						+ "<tbody>";
				for ( var i = 0; i < r.getListOfOPDChemoTheropyDTO.length; i++) {
					
					
					var createdDate = new Date(r.getListOfOPDChemoTheropyDTO[i].createdDateTime);
	              //  var    displayCreatedDate = createdDate.getDate().toString() + "-" + createdDate.getUTCMonth().toString() + "-" + createdDate.getFullYear();
					var displayCreatedDate= new Date(r.getListOfOPDChemoTheropyDTO[i].createdDateTime).toLocaleDateString('en-GB');
					var str = '"DataForPopUp_' + (i + 1) + '"';
					htm = htm
							+ "<tr>"
							+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>"
							+ (i + 1)
							+ "</td>"
							+ "<td class='col-sm-6-1 left' style='height: 21.5px;'>"
							+ r.getListOfOPDChemoTheropyDTO[i].chemotherapyProtocol
							+ "</td>"
							+ "<td class='col-sm-5-1 center' id ='PopUpChemoDate_"
							+ (i + 1)
							+ "' onclick = 'editOPDChemoByTreatmentIdAndDate("
							+ str + ")' style='height: 21.5px;'>"
							+ displayCreatedDate + "</td>" + "</tr>";

				}
				
				htm = htm + "</tbody>" + "</table>" + "</div>";
				$("#tableHistoryChemotherapy").html(htm);
			}
			$("#divHistoryChemotherapy").show();
		

		}
	});
	
	
}

function editOPDChemoByTreatmentIdAndDate(callFrom){
	var treatmentId = $("#tr_Id").val();

var chemoDate = $("#chemoDate").val();
var date = $("#todays_date").val();
 var date1=date.split("-");


if(callFrom == "onload"){
	chemoDate=date1[2]+"-"+date1[1]+"-"+date1[0];
}


	
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);

	inputs.push('userDate=' + chemoDate);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdsxadvice/editOPDChemoByTreatmentIdAndDate",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
			
		 $("#chemoTheropyMasterId").val(r.chemoTheropyMasterId);
			
			 $("#iChemotherapyName").val(r.chemotherapyProtocol);
			
		 $("#iIndication").val(r.location);
			
			 $("#iWeight").val(r.weight);
			
			 $("#iHeight").val(r.height);
			
			 $("#iBSA").val(r.bsa);
			
			 $("#iBloodOrders").val(r.bloodOrder);
			
			 $("#iAllergies").val(r.allergies);
			
			 $("#iHistory").val(r.history);
			
			 $("#iFrequency").val(r.frequency);
			
			$("#iNumberOfCycles").val(r.numberofCycles);
			
			 $("#iDose").val(r.dose);
			
			 $("#iInvestigation").val(r.investigations);
			
			 $("#iDrugOrder").val(r.chemoOrders);
			
			 $("#iPostMedications").val(r.postMedications);
			
			 $("#nextBloodDate").val(r.nextBloodTestDate);
			 $("#nextChemoDate").val(r.nextChemoDate);
			 $("#nextVisitDate").val(r.nextVisitDate);
			
			
		}
	});
	
	
}

function printOPDChemoTheropy(){

	
//	var billId=$("#billNo").text();    
	var billId=0;
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	var chemoDate = $("#chemoDate").val();

	
	
	if(chemoDate.trim()== ""){
		alert("Please Select Chemo Date");
		
		return false;
	}

   // var deptId = $("#deptid").val();
	var deptId=1;
  ///  var pendFlag = $("#pendingFlag").val();
	 var pendFlag="N"; 
	 var recId=0;
    
	
		
    
    window.open("opd_chemotheropy_print.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&chemoDate="+chemoDate);
	

	
}



/************
* @author	: HM00054
* @date		: 28-12-2021
* @codeFor	:  Auto suggestion search Detail
 ************/
function getautosuggestionOfChemoTheropy(inputID) {
	var resultData = [];
	var chemotherapyName = $("#" + inputID).val();

	if (chemotherapyName == "" || chemotherapyName == null || chemotherapyName == "null"	|| chemotherapyName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		
		return false;
	}

	var inputs = [];
	inputs.push('chemotherapyName=' + chemotherapyName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/chemotherapy_master/centerChemoAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstchemotherapyMaster.length; j++) {
				var arrValue = response.lstchemotherapyMaster[j].chemotherapyId +"-"+response.lstchemotherapyMaster[j].chemotherapyName;
				var idValue = response.lstchemotherapyMaster[j].chemotherapyId;
				var chemotherapyName = response.lstchemotherapyMaster[j].chemotherapyName;
				resultData.push({
					ID : idValue,
					Name : chemotherapyName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var chemotherapyId = res[0];
		var chemotherapyName = res[1];		
		getChemoBychemotherapyId(chemotherapyId);
		$("input#" + inputID).val(chemotherapyName);
	}
}



/************
* @author	: HM0054
* @date		: 28-12-2021
* @codeFor	:  get getChemoMasterBychemotherapyId Detail
 ************/
function getChemoBychemotherapyId(chemotherapyId){
	var inputs = [];
	inputs.push('chemotherapyId=' + chemotherapyId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/chemotherapy_master/editChemoMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			$("#iChemotherapyName").val(r.chemotherapyName);
			
			$("#iIndication").val(r.indication);
			
			$("#iWeight").val(r.weight);
			
			$("#iHeight").val(r.height);
			
			$("#iBSA").val(r.bsa);
			
			$("#iBloodOrders").val(r.blood_orders);
			
			$("#iAllergies").val(r.allergies);
			
			$("#iHistory").val(r.history);
			
			$("#iFrequency").val(r.frequency);
			
			$("#iNumberOfCycles").val(r.noOfCycle);
			
			$("#iDose").val(r.dose);
			
			$("#iInvestigation").val(r.investigation);
			
			$("#iDrugOrder").val(r.drugOrders);
			
			$("#iPostMedications").val(r.postMedication);
			
			$("#iPostChemoAdvice").val(r.advice);
		}
		
	});
}



/************
* @author	: HM0054
* @date		: 05-01-2022
* @codeFor	:  get indivisual instruction list on radio theropy pop up
 ************/
function getIndivisualInstructionListOnRadioTheropy(){
	var inputs = [];
	inputs.push('unitId=' + 1);
	var str = inputs.join('&');
	
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ddinstruction/getListOfIndivisualInstruction",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(res) {
			
			var result='';
			var rowCount=1;
			
			if(res.getListOfOPDInstructionDTO.length > 0){
				
			for ( var i = 0; i < res.getListOfOPDInstructionDTO.length; i++) {
				
				var dietId  = res.getListOfOPDInstructionDTO[i].reportInstructionID;
				
				result = result
						+ '<tr> '
						
						+ "<td class='col-md-1-1 center'> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='instructionSlaveId" + rowCount + "' value='"
						+ dietId + "' ></td>"
					
						
						+ '	<td class="col-md-10-1 center">'
						+res.getListOfOPDInstructionDTO[i].reportInstruction
						+ '</td> '
						
						+ '	<td class="col-md-1-1 center">' 
						+ "<button class='btn btn-xs btn-success editUserAccess' onclick=getIndivisualInstructionOnRadioTheropy("+res.getListOfOPDInstructionDTO[i].reportInstructionID+") > <i class='fa fa-edit'></i> </button>"
			           + '</td> '
						
						+ '</tr> ';
				rowCount++;
						
			}
			$("#TreatmentInstructionTempRadioTheropy").html(result);
			}
			
		}
	});
//	
}

/************
* @author	: HM0054
* @date		: 05-01-2022
* @codeFor	:  get indivisual instruction info by instruction id  on radio theropy 
 ************/
function getIndivisualInstructionOnRadioTheropy(id){
	
	 var inputs = [];
		inputs.push('instructionId=' + id);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/ddinstruction/editIndivisualInstruction",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				var data="";
				
				data=$("#instructionsRadio").val();
				
				if(data != ""){
					
					data=data+", "+r.reportInstruction;
				}else{
					data=r.reportInstruction;
				}
				
				$("#instructionsRadio").val(data);
				
			}
		});
}


function fetchProcedureType() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchPTName');

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchPTName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			

			 var htm="<option value='0'>--Select--</option>";
			    for ( var i = 0; i < r.lipt.length; i++){    
			        htm = htm + "<option value='"+r.lipt[i].idpt+"'> "+r.lipt[i].ptnm+" </option>";
			    }
			    $("#selOTtype").html(htm);
			
			
		}
	});
}


function fetchProcedureGroup() {
	count = 1;
	var searhFlag ="";
	var searchText = "";
	
	var inputs = [];
	inputs.push('action=fetchGroupDetails');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + searchText);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchGroupDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			

			 var htm="<option value='0'>--Select--</option>";
			    for ( var i = 0; i < r.grpli.length; i++){    
			        htm = htm + "<option value='"+r.grpli[i].grpid+"'> "+r.grpli[i].grpNm+" </option>";
			    }
			    $("#department").html(htm);
			
		}
	});
}

function getOperationNameOnSX(){
	 var inputs = [];
	   var procedureType=  $("#selOTtype").val();
	   var procedureGroup=  $("#department").val();
		inputs.push('procedureType=' + procedureType);
		inputs.push('procedureGroup=' + procedureGroup);
		var str = inputs.join('&');
		
		
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/opdsxadvice/getOpreationName",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				 var htm="<option value='0'>--Select--</option>";
				    for ( var i = 0; i < r.ol.length; i++){    
				        htm = htm + "<option value='"+r.ol[i].oi+"'> "+r.ol[i].on+" </option>";
				    }
				    $("#selOTName").html(htm);
				
				
			}
		});
	
}
