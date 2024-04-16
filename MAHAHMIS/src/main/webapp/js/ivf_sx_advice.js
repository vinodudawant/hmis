function getSexAdviceTemplate(id){
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	
	$("#diets").hide();
	$("#Prescription").hide();
	$("#ipdDoctorStationJSPHeadDiv").html(" ");
	


	var cancerOnOff = $("#cancerOnOff").val();
	
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="active" onclick=getSexAdviceTemplate("id"),getIVFSxAdviceListByTreatmentId(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationNameOnIvfSx();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices" style="background-color: rgb(248, 196, 113);">Surgery Advice</a>'
			+ '</li>';

	if (cancerOnOff == "on") {
		temp = temp
				
				
				+ '<li id="PalliativeCareList">'
				+ '<a data-toggle="tab" href="#PalliativeCare" onclick=temForCareAdvicesOPD("careAdvices");editOPDCareAdvice();setNewtempAdviceOPD(this.id);>Care Advices</a>'
				+ '</li>'
				;
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
			+ '<select id="department" class="form-control input-SmallText TextFont" onchange="getOperationNameOnIvfSx()" name="">'
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
			+ '<input class="btn btn-xs btn-success editUserAccess" type="button" onclick="saveIVFAdviceOPD()" value="Save">'
			+ '<input class="btn btn-xs btn-primary" type="button" onclick="newAdviceOPD()" value="New Surgery" style="margin-left: 10px;">'
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

	getIVFSxAdviceListByTreatmentId();
	fetchProcedureType();
	fetchProcedureGroup();


}


function temForRadioTherapyOPD(id) {
	var temp = '<div id="Advices" class="tab-pane active">'
			+ '<div id="row1" class="col-md-12-1" style="padding-top: 0px;">'
			+ '<div class="tabbable tabs-left col-md-12-1" style="margin-top: 0px; margin-left: 20px;">'
			+ '<ul id="adviceTabULID" class="nav nav-tabs colorChanges" style="height: 550px;">'
			+ '<li id="SurgeryAdvicesList" class="" onclick=getSexAdviceTemplate("id"),getIVFSxAdviceListByTreatmentId(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationNameOnIvfSx();setNewtempAdviceOPD(this.id);>'
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
			+ '<button class="btn btn-xs btn-primary" data-keyboard="false" data-backdrop="static" data-target="#iPackage" data-toggle="modal" onclick="getIndivisualInstructionListOnRadioTheropy();" type="button">Add Instruction</button>'
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
			+ '<input class="btn btn-xs btn-success editUserAccess" type="button" onclick=saveRadiotherapyOPD("ipd") value="Save">'
			+ '<input class="btn btn-xs btn-primary" type="button" onclick="refreshRadioTheropyData()" value="New" style="margin-left: 10px;">'
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
			+ '<li id="SurgeryAdvicesList" class="" onclick=getSexAdviceTemplate("id"),getIVFSxAdviceListByTreatmentId(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationNameOnIvfSx();setNewtempAdviceOPD(this.id);>'
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
			+ '<label id="" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" class="btn" onclick="allSetNew();"> <i class="fa fa-trash-o"></i> Remove </label> '
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
			+ '<button type="button" id="ichemoDate" onclick=saveOPDChemoTheropy(); class="btn btn-xs btn-success" style="margin-left: 515px">Save</button> '
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
			+ '<li id="SurgeryAdvicesList" class="" onclick=getSexAdviceTemplate("id"),getIVFSxAdviceListByTreatmentId(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationNameOnIvfSx();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#SurgeryAdvices">Surgery Advice</a>'
			+ '</li>'
			
			
			+ '<li id="PalliativeCareList" class="active" onclick=temForCareAdvicesOPD("careAdvices");editOPDCareAdvice();setNewtempAdviceOPD(this.id);>'
			+ '<a data-toggle="tab" href="#PalliativeCare" style="background-color: rgb(248, 196, 113);">Care Advices</a>'
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
			+ 'onclick="saveOPDCareAdvice()" id="iSaveSupportiveAdvice" type="button">Save</button>'
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
			+ '<li id="SurgeryAdvicesList" class="" onclick=getSexAdviceTemplate("id"),getIVFSxAdviceListByTreatmentId(),fetchPTNameForOtSchedule(),fetchDepartmentForOTSchedule(),getOperationNameOnIvfSx();setNewtempAdviceOPD(this.id);>'
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
			+ '<button style="margin-right: 20px;" class="btn btn-xs btn-success" onclick="saveOPDPlanOfTreatment()" title="Save Plan Of Treatment" data-placement="left" data-toggle="tooltip">'
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

function saveIVFAdviceOPD(){
	
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
	
	var userId = $("#userId").val();

	var unitId = $("#unitId").val();

	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();
	
	var ivftreatmentId = $("#ivfTreatId").val();
	
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
	
	inputs.push('ivftreatmentId=' + ivftreatmentId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfsxadvice/saveIVFSxAdvice",
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

			getIVFSxAdviceListByTreatmentId();
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

function getIVFSxAdviceListByTreatmentId(){
	var treatmentId = $("#ivfTreatId").val();

	var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('ivftreatmentId=' + treatmentId);

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfsxadvice/getIVFSxAdviceListByTreatmentId",
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
			+ "<button class='btn btn-xs btn-success editUserAccess' onclick=editIVFSxAdvice("+res.getListOfOPDSxAdviceDTO[i].sxAdviceMasterId+") > <i class='fa fa-edit'></i> </button>"
           + '</td> '

			+ '	<td class="col-md-1-1 center">' 
			+ "<button class='btn btn-xs btn-danger editUserAccess' onclick=deleteIVFSxAdvice("+res.getListOfOPDSxAdviceDTO[i].sxAdviceMasterId+") > <i class='fa fa-trash-o'></i> </button>"
           + '</td> '

			+ '</tr> ';
			rowCount++;

		}
		$("#viewAdvicesTemp").html(result);
	}
}

function editIVFSxAdvice(id){
	var inputs = [];

	inputs.push('id=' + id);

	//inputs.push('unitId=' + unitId);


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfsxadvice/editIVFSxAdvice",
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
			
			getOperationNameOnIvfSx();
			$("#selOTName").val(r.procedureNameId);
			
		}
	});
	
}

function deleteIVFSxAdvice(id){

	var inputs = [];
	var unitId = $("#unitId").val();
	inputs.push('id=' + id);

	inputs.push('userId=' + unitId);


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfsxadvice/deleteIVFSxAdvice",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			if( r==1){
				alert("Record Deleted Successfully");
				getIVFSxAdviceListByTreatmentId();
			}else{
				alert("Network Issue...");
			}
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

var unitId=$('#unitId').val();

var userId=$('#userId').val();
	
	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();
	var ivftreatmentId = $("#ivfTreatId").val();
	
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
	
	inputs.push('ivftreatmentId=' + ivftreatmentId);

	

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfsxadvice/saveIVFCareAdvice",
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

	var tr_Id = $("#ivfTreatId").val();
	

	inputs.push('id=' + tr_Id);

	//inputs.push('unitId=' + unitId);


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfsxadvice/editIVFCareAdvice",
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

function getOperationNameOnIvfSx(){
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























