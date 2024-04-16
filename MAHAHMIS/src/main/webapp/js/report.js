var patSearchTemp = "<div style='width: 96%; padding: 2%;'><div style='width: 80px;'>Search By:</div><div style='width: 90px; padding-left: 10px;'>Patient Name</div><div style='width: 12%;'><input style='width: 100%;font-size: 14px; ' name='byName'	id='byName' type='text' /></div><div	style='padding-left: 10px; padding-right: 10px; width: 20px; text-align: center;'>or</div><div style='width: 70px; padding-left: 10px;'>Patient ID</div><div style='width: 12%;'><input style='width: 100%;font-size: 14px; ' name='byId'	id='byId' type='text' /></div><div style='width: 80px; padding-left: 10px;'><input type='button'	value='Search'  class='edit' onclick='dispIPDDICpatientSearch('IPD_DIC_Dashboard')' /></div></div>";
var repDocNameTemplate = "<select	class='form-control input-SmallText TextFont' style='width: 100%;font-size: 11px;'  name='selDocName' id='selDocName' >{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}</select>";
var repDistNameTemplate = "<select	style='width: 100%;font-size: 11px;'  name='selDistName' id='selDistName' >{#foreach $T.distributerList as dl}	<option value='{$T.dl.distributor_id}'>{$T.dl.dist_name}</option>{#/for}</select>";
var repDistNameTemplateForPO = "<div style='padding-right:5%;width: 55%;'><select	style='width: 100%;font-size: 11px;'  name='selDistName' id='selDistName' >{#foreach $T.distributerList as dl}	<option value='{$T.dl.distributor_id}'>{$T.dl.dist_name}</option>{#/for}</select></div><div style='width:40%;'><select style='font-size: 11px;'  name='selPOType' id='selPOType'><option value='Send'>Item Send</option><option value='Received'>Item Received</option></div>";

var corporatelisttemp = "<select	style='width: 35%;font-size: 11px; margin-top: 15px;'  name='corporatelist' id='corporatelist' >{#foreach $T.liCompAgg as dl}	"
		+ "<option value='{$T.dl.id}'>{$T.dl.compNm}</option>{#/for}</select>";

var operNameTemp = "<select style='width: 100%;font-size: 11px;' name='oname' id='oname'>{#foreach $T.ol as ol}<option value='{$T.ol.oi}'>{$T.ol.on}</option>{#/for}</select>";

var patientReportTemp = "<div class='ehat_subModule_164' style='display:none;width: 250px;'>"
		+ "<input type='radio'	name='RadioGroupPatient_2' value='total' id='RadioGroupPatient_2' onclick='hideTotal()'/>&nbsp;&nbsp;&nbsp; Total Patient  (No Need To Select Date)</div>"
		+ "<div style='width: 160px;'>"
		+ "<span class='ehat_subModule_165' style='display:none;'><input type='radio' name='RadioGroupPatient_2' value='OPD' id='RadioGroupPatient_2' onclick='hideOPD()'/>&nbsp;&nbsp;&nbsp;OPD &nbsp;&nbsp;&nbsp;</span><span class='ehat_subModule_166' style='display:none;'><input type='radio'	name='RadioGroupPatient_2' value='OPDRefund' id='RadioGroupPatient_2'	onclick='hideOPD()'/>&nbsp;&nbsp;&nbsp;OPD Refund</span></div>"
		+ "<div class='ehat_subModule_167' style='display:none;width: 60px;'>"
		+ "<input type='radio'	name='RadioGroupPatient_2' value='IPD' id='RadioGroupPatient_2'	onclick='hideIPD()'/>&nbsp;&nbsp;&nbsp;IPD &nbsp;&nbsp;&nbsp;<input type='radio'	name='RadioGroupPatient_2' value='ER' id='RadioGroupPatient_2'	onclick='hideIPD()' />&nbsp;&nbsp;&nbsp;ER</div>"
		+ "<div style='width: 330px; padding-right: 2%;'>"
		+ "<span class='ehat_subModule_168' style='display:none;'><input type='radio'	onclick=hideOPD(); name='RadioGroupPatient_2' value='opdtoipdconversion' id='RadioGroupPatient_2'/>&nbsp;&nbsp; OPD To IPD&nbsp;&nbsp;</span>"
		+ "<span class='ehat_subModule_169' style='display:none;'><input type='radio'	onclick='showRefDiv()' name='RadioGroupPatient_2' value='refBY' id='RadioGroupPatient_2' name='RadioGroupPatient_2'/>&nbsp;&nbsp; Ref By</span>"
		+ "<div style='width: 300px;'>"
		+ "<input type='radio'	id='RadioGroupPatient_2' name='RadioGroupPatient_2' value='DiagnosticAll' onclick='hideOPD()'/>&nbsp;&nbsp;&nbsp;Diagnostic&nbsp;&nbsp;&nbsp;"
		+ "<input type='radio'	id='RadioGroupPatient_2' name='RadioGroupPatient_2' value='DiagnosticRefund' onclick='hideOPD()'/>&nbsp;&nbsp;&nbsp;Diagnostic Refund</div>"
		+ "<div class='ehat_subModule_170' style='display:none;width: 150px;'>"
		+ "<input type='radio' onclick='hideIPD()' id='RadioGroupPatient_2' value='IPDRegister' name='RadioGroupPatient_2'>&nbsp;&nbsp;&nbsp;IPD Registered</div>"
		+ "<div class='ehat_subModule_171' style='display:none;width: 250px;'>"
		+ "<input type='radio'	name='RadioGroupPatient_2' value='totalDischargePatient' id='RadioGroupPatient_2' onclick='hideTotalDischargePatient()'/>&nbsp;&nbsp;&nbsp;Discharge Summary Saved Report</div>"
		+ "<div class='ehat_subModule_172' style='display:none;width: 150px;'>"
		+ "<input type='radio' name='RadioGroupPatient_2' value='totalradiationpatient' id='RadioGroupPatient_2' onclick='hideTotalDischargePatient()'/>&nbsp;&nbsp;&nbsp;Radiation Report</div>"
		+ "<div class='ehat_subModule_173' style='display:none;width: 450px;'>"
		+ "<input type='radio' name='RadioGroupPatient_2' value='patienttreatmenttype' id='RadioGroupPatient_2' onclick='hidePatienttreatmenttype()'/>&nbsp;&nbsp;&nbsp;Patient Bifurcation Report"
		+ "</div>"
		+ "<div class='ehat_subModule_174' style='display:none; width: 450px;'>"
		+ "<input type='radio' name='RadioGroupPatient_2' value='commonadvance' id='RadioGroupPatient_2' onclick='hideTotalDischargePatient()'/>&nbsp;&nbsp;&nbsp;Patient Common Advance Report"
		+ "</div>";

var patientReportTempDue = "<div class='ehat_subModule_195' style='display:none; width: 140px;'>"
		+ "<input type='radio'	name='RadioGroupPatient_2' value='OPDDue' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='SHOWBTNS()' />&nbsp;&nbsp;&nbsp;OPD"
		+ "</div>"
		+ "<div class='ehat_subModule_196' style='display:none; width: 140px;'>"
		+ "<input type='radio'	name='RadioGroupPatient_2' value='IPDallDue' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='SHOWBTNS()' />&nbsp;&nbsp;&nbsp;IPD"
		+ "</div>"
		+ "<div class='ehat_subModule_197' style='display:none; width: 100px;'><input type='radio' name='RadioGroupPatient_2' value='DiagonosisDue' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='SHOWBTNS()' />&nbsp;&nbsp;&nbsp;&nbsp;Diagonosis"
		+ "</div>"
		+ "</div><div class='ehat_subModule_198' style='display:none; width: 250px;'><input type='radio' name='RadioGroupPatient_2' value='IPDDue' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='SHOWBTNS()' />&nbsp;&nbsp;&nbsp;&nbsp;IPD&nbsp;(Only Sponsor Patients Report)"
		+ "</div>"
		+ "</div>"
		+ "</div><div class='ehat_subModule_199' style='display:none; width: 100px;'><input type='radio' name='RadioGroupPatient_2' value='TOTALDUE' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='SHOWBTNS()' />&nbsp;&nbsp;&nbsp;&nbsp;Total Dues"
		+ "</div>" + "</div>";

var patientReportTempIPDRegisterNew = "<div class='ehat_subModule_200' style='display:none; width: 240px;'>"
		+ "<input type='radio'	name='RadioGroupPatient_2' value='OPDRegisterNew' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;OPD Registered Patients Speciality basis"
		+ "</div><div class='ehat_subModule_201' style='display:none; width: 300px;'><input type='radio' name='RadioGroupPatient_2' value='IPDRegisterNew1' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp;IPD Total Inactive Patients With Ward Details"
		+ "</div>"
		+ "</div><div class='ehat_subModule_201' style='display:none; width: 230px;'><input type='radio' name='RadioGroupPatient_2' value='ipdInactivePatient' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp;IPD Total Inactive Patients"
		+ "</div>"
		+ "</div><div class='ehat_subModule_202' style='display:none; width: 260px;'><input type='radio' name='RadioGroupPatient_2' value='PhysicalDischarge' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp;IPD Physical discharge patient"
		+ "</div>"
		+ "</div><div class='ehat_subModule_203' style='display:none; width: 260px;'><input type='radio' name='RadioGroupPatient_2' value='IPDRegisterNew2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp;IPD Total Admitted Patients Speciality basis"
		+ "</div>"
		+ "<div class='ehat_subModule_204' style='display:none; width: 260px;'><input type='radio' name='RadioGroupPatient_2' value='ipdactive' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='DateField()' />&nbsp;&nbsp;&nbsp;&nbsp;IPD Current Admitted Patients"
		+ "</div>" + "</div>";

var CorporateReport = "<div class='ehat_subModule_182' style='display:none;width: 240px;'>"
		+ "<input type='radio'	name='RadioGroupPatient_2' value='CorporateALL' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp;Corporate Patient Collection (ALL)"
		+ "</div>"
		+ "<div class='ehat_subModule_183' style='display:none;width: 300px;'><input type='radio' name='RadioGroupPatient_2' value='CorporateParticular' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick=corporatelist1('company') />&nbsp;&nbsp;&nbsp;&nbsp;Corporate Patient Collection (Company Wise)"
		+ "</div>"
		+ "<div class='ehat_subModule_184' style='display:none;width: 300px;'><input type='radio' name='RadioGroupPatient_2' value='CorporatePolicy' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick=corporatelist1('policy') />&nbsp;&nbsp;&nbsp;&nbsp;Corporate Patient Collection (Policy Wise)"
		+ "</div>" + "</div>" + "</div>";

var CorporateDueReport = "<div class='ehat_subModule_185' style='display:none;width: 240px;'>"
		+ "<input type='radio'	name='RadioGroupPatient_2' value='CorporateDueALL' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp;Corporate Due (ALL)"
		+ "</div>"
		+ "<div class='ehat_subModule_186' style='display:none;width: 300px;'><input type='radio' name='RadioGroupPatient_2' value='CorporateDueParticular' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick=corporatelist1('company') />&nbsp;&nbsp;&nbsp;&nbsp;Corporate Due (Company Wise)"
		+ "</div>"
		+ "<div class='ehat_subModule_187' style='display:none;width: 300px;'><input type='radio' name='RadioGroupPatient_2' value='CorporateDuePolicy' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick=corporatelist1('policy') />&nbsp;&nbsp;&nbsp;&nbsp;Corporate Due (Policy Wise)"
		+ "</div>" + "</div>" + "</div>";

var SchedulerReport = "<div style='width: 240px;'>"
		+ "<input type='radio'	name='RadioGroupPatient_2' value='SchedulerReport' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp;Scheduler Report"
		+ "</div>" +
		/*
		 * "<div style='width: 300px;'><input type='radio'
		 * name='RadioGroupPatient_2' value='CorporateDueParticular'
		 * id='RadioGroupPatient_2' name='RadioGroupPatient_2'
		 * onclick=corporatelist1('company') />&nbsp;&nbsp;&nbsp;&nbsp;Corporate
		 * Due (Company Wise)" + "</div>" + "<div style='width: 300px;'><input
		 * type='radio' name='RadioGroupPatient_2' value='CorporateDuePolicy'
		 * id='RadioGroupPatient_2' name='RadioGroupPatient_2'
		 * onclick=corporatelist1('policy') />&nbsp;&nbsp;&nbsp;&nbsp;Corporate
		 * Due (Policy Wise)" + "</div>" + "</div>" +
		 */
		"</div>";

function SHOWBTNS(callBTN) {
	var reportType = ($('input:radio[name=RadioGroupPatient_2]:checked').val());
	if (reportType === 'TOTALDUE') {
		$("#totalreportDIV").show();
		$("#firstdate").hide();
		$("#seconddate").hide();
	} else {
		$("#totalreportDIV").hide();
		$("#firstdate").show();
		$("#seconddate").show();
	}
}
function selectOptions() {
	var reportType = ($('input:radio[name=RadioGroupPatient_2]:checked').val());
	// alert(reportType);
	if (reportType == "DoctorOverallReport") {
		$("#divtxtDoctorName").show();
		$("#divSearchBox").hide();
	} else if (reportType == "DiagnosticAll" || reportType == "DiagnosticRefund") {
		$("#divSearchBox").hide();
		$("#divtxtDoctorName").hide();
		$("#pdfbutton").html("");
	}
}

var doctorReportTemp = "<div class='ehat_subModule_175' style='display:none;width: 200px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   value='DoctorsPatientReport' onclick=setRepDocName('doc') />&nbsp;&nbsp;&nbsp;OPD Consultation Payment Report</div><div class='ehat_subModule_176' style='display:none;width: 180px;'><input type='radio'	id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   value='VisitingDoctorsReport' onclick=setRepDocName('doc') />&nbsp;&nbsp;&nbsp;IPD Consultation Report</div><div class='ehat_subModule_177' style='display:none;width: 180px;'><input type='radio'	id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   value='DiagnosticAll' onclick='selectOptions()'/>&nbsp;&nbsp;&nbsp;Diagnostic Collection</div><div class='ehat_subModule_178' style='display:none;width: 180px;'><input type='radio'	id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   value='DiagnosticRefund' onclick='selectOptions()'/>&nbsp;&nbsp;&nbsp;Diagnostic Refund</div><div class='ehat_subModule_179' style='display:none;width: 180px;'><input type='radio'	id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   value='DoctorOverallReport' onclick='selectOptions()' />&nbsp;&nbsp;&nbsp;Doctor Overall Report</div><div class='ehat_subModule_179' style='display:none;width: 200px;'><input type='radio'	id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   value='IPDRefDocBillReport' onclick='selectChannlingDoc()' />&nbsp;&nbsp;&nbsp;IPD Refered Doctor Billing Report</div>";
var operationReportTemp = "<div class='ehat_subModule_188' style='display:none;width: 150px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' value='All Procedure' onclick=clearDivReportCommonOption(),ShowSurgeonType('charge') />&nbsp;&nbsp;&nbsp;Procedure Report</div><div class='ehat_subModule_189' style='display:none;width: 140px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick=ShowSurgeonType('charge'),clearDivReportCommonOption() value='Doctorsoperation'  />&nbsp;&nbsp;&nbsp;Schedule Operations</div><div class='ehat_subModule_190' style='display:none;width: 140px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   onclick=setOprChkBox(),ShowSurgeonType('charge') value='OperationsType' />&nbsp;&nbsp;&nbsp;Procedure's Type</div><h4>OT Billing Report's</h4><div class='ehat_subModule_190' style='display:none;width: 140px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   onclick=ShowSurgeonType('surgeonwise'),getSurgeonList('surgeon'),clearDivReportCommonOption() value='SurgeonWise' />&nbsp;&nbsp;&nbsp;Surgeon-Wise</div><div class='ehat_subModule_190' style='display:none;width: 140px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   onclick=ShowSurgeonType('anaesthe'),getSurgeonList('anaesthe'),clearDivReportCommonOption() value='AnaesthetistWise' />&nbsp;&nbsp;&nbsp;Anaesthetist-Wise</div><div class='ehat_subModule_190' style='display:none;width: 150px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   onclick=ShowSurgeonType('assSurgeon'),getSurgeonList('assSurgeon'),clearDivReportCommonOption() value='AssistantWise' />&nbsp;&nbsp;&nbsp;Assistant Surgeon Wise</div><div class='ehat_subModule_190' style='display:none;width: 140px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'   onclick=ShowSurgeonType('chargewise'),clearDivReportCommonOption() value='ChargesWise' />&nbsp;&nbsp;&nbsp;OT Charges-Wise</div>";

var distReportTemp = "<div style='width: 140px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' value='Distributersitems' onclick='setDistName()' />&nbsp;&nbsp;&nbsp;Distributer's Item's</div><div style='width: 140px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' value='DistributersPO' onclick='setDistNameForPO()' />&nbsp;&nbsp;&nbsp;Distributer's PO</div>";
var treatmentClosedReportTemp = "<div class='ehat_subModule_193' style='display:none;width: 140px;'><input type='radio'	name='RadioGroupPatient_2' value='opdClose' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  />&nbsp;&nbsp;&nbsp;OPD Patients</div>"
		+ "<div class='ehat_subModule_194' style='display:none;width: 140px;'><input type='radio'	name='RadioGroupPatient_2' value='ipdClose' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  />&nbsp;&nbsp;&nbsp;IPD Patients</div>";

var hospCollectionReport = "<div style='width: 180px;'><input type='radio'	name='RadioGroupPatient_2' value='Hospital' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  />&nbsp;&nbsp;&nbsp;Hospital Total Report</div>";

var deadPatientReportTemp = "<div style='width: 400px;'><input type='radio'	name='RadioGroupPatient_2' value='DeadPatient' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  />&nbsp;&nbsp;&nbsp;Dead Patients</div>";
var channelingReportTemp = "<!--<div style='width: 150px;'><input type='radio'	name='RadioGroupPatient_2' value='Channeling' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' />&nbsp;&nbsp;&nbsp;Procedure Prices</div>--><!--<div style='width: 169px;'><input type='radio'	name='RadioGroupPatient_2' value='AnesthetistDoctorsReport' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' />&nbsp;&nbsp;&nbsp;Catagory Wise Surgeon Charges</div>--><div class='ehat_subModule_191' style='display:none;width: 185px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' value='AllDistributer' onclick='showTestDiv()'/>&nbsp;&nbsp;&nbsp;General Billing Prices</div><div class='ehat_subModule_192' style='display:none;width: 185px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' value='Distributersitems' onclick='setTestType()'/>&nbsp;&nbsp;&nbsp;Test and Services</div>";
var setWardTemp = "<div>Select Ward Type:<select id='bedType'>{#foreach $T.bl as bl}<option value='{$T.bl.bt}'>{$T.bl.bt}</option>{#/for}</select></div>";
var wardReportTemp = "<div style='width: 125px;'><input type='radio' name='RadioGroupPatient_2' value='Ward' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick=hideHallType('ALL'),showDateType('nodate') />&nbsp;&nbsp;&nbsp;Ward &nbsp;Charges</div><div style='width: 300px;'><input type='radio'	name='RadioGroupPatient_2' value='BedOccupancyReport' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick=hideHallType('ALL'),showDateType('nodate') />&nbsp;&nbsp;&nbsp;Active Patient's Bed Occupancy Report</div><div style='width: 300px;'><input type='radio'	name='RadioGroupPatient_2' value='BedOccupancyReportHallTypewise' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick=hideHallType('hallwise'),showDateType('nodate') />&nbsp;&nbsp;&nbsp;Active Patient's Bed Occupancy Report Hall Type Wise</div><div style='width: 300px;'><input type='radio'	name='RadioGroupPatient_2' value='BedOccupancyReportHallwise' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick=showDateType('nodate'),hideHallType('hallwise') />&nbsp;&nbsp;&nbsp;Active Patient's Bed Occupancy Report Hall Wise</div><div style='width: 200px;'><input type='radio'	name='RadioGroupPatient_2' value='OverallBedOccupancyReport' id='RadioGroupPatient_2' name='RadioGroupPatient_2' onclick=showDateType('date'),hideHallType('ALL') />&nbsp;&nbsp;&nbsp;Overall Bed Occupancy Report</div><div style='width: 260px;'><input type='radio'	name='RadioGroupPatient_2' value='OverallBedOccupancyReportHallTypewise' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick=showDateType('date'),hideHallType('halltype') />&nbsp;&nbsp;&nbsp;Overall Bed Occupancy Report Ward Wise</div><div style='width: 260px;'><input type='radio' name='RadioGroupPatient_2' value='OverallBedOccupancyReportHallwise' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick=showDateType('date'),hideHallType('hallwise') />&nbsp;&nbsp;&nbsp;Overall Bed Occupancy Report Hall Wise</div><div style='width: 260px;'><input type='radio' name='RadioGroupPatient_2' value='BedOccupancyTrendReport' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick=showDateType('date'),hideHallType('hallwise') />&nbsp;&nbsp;&nbsp;Bed Occupancy Trend Report</div><div style='width: 260px;'><input type='radio' name='RadioGroupPatient_2' value='WardOccupancyTrendReport' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick=showDateType('date'),hideHallType('hallwise') />&nbsp;&nbsp;&nbsp;Ward Occupancy Trend Report</div>";

var setPatientNameTemp = "<div  style='width: 100%;padding-left: 8%'> <select style='width: 100%;font-size: 11px;' name='selDisType' id='selTreatRepType'><option value='select'>-Select-</option><option value='Test'>Test</option><option value='Chart'>Chart</option><option value='Doctor'>Doctor</option><option value='DoctorRoundReport'>DoctorRoundReport</option></select></div>";

var setMaterialUsedReportTemp = "<div><input type='radio' name='RadioGroupPatient_2' value='MatPatient' id='RadioGroupPatient_2' name='RadioGroupPatient_2' onclick=setBillRepType('patientForMaterialUsed') />&nbsp;&nbsp;&nbsp;Patient </div>";
var operationDisTemp = "<div style='width: 15%;'>Select Operation</div><div style='width: 13%;'><select name='oname' id='oname'><option value='select'>-Select-</option>{#foreach $T.ol as ol}<option value='{$T.ol.on}'>{$T.ol.on}</option>{#/for}</select></div><div style='width 8%;  padding-left: 8%'><input type='button' id='ViewDisRep' name='ViewDisRep' value='View Report' onclick='getReoprtForDiscount()'/></div><div style='width: 5%; padding-left: 20% padding-top:5%'>Total Discounts: &nbsp;&nbsp;&nbsp;<input type='radio' name='RadioGroupPatient_2' value='Discounts' id='RadioGroupPatient_2' name='RadioGroupPatient_2' onclick=''/></div>";

var disNameTemp = "<div  style='width: 40%;'><select style='width: 100%;font-size: 11px;' name='oname' id='oname'>{#foreach $T.sl as sl}<option value='{$T.sl.si}'>{$T.sl.sn}</option>{#/for}</select></div><div style='width: 32%;padding-left:7%;'><select style='width: 120%;font-size: 11px;' name='selDisType' id='selDisType'><option value='Operation'>Operation</option><option value='Test'>Test</option><option value='Fees'>Fees</option></select></div>";
var disNameTemp1 = "<div  style='width: 40%;'><select style='width: 100%;font-size: 11px;' name='oname' id='oname'>{#foreach $T.sl as sl}<option value='{$T.sl.si}'>{$T.sl.sn}</option>{#/for}</select></div><div style='width: 32%;padding-left:7%;'></div>";
var disRepTemp = "<div style='width: 170px;'><input type='radio' name='RadioGroupPatient_2' value='SelDiscount' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick='setDisChkBox()' />&nbsp;&nbsp;&nbsp;Discount</div></div><div style='width: 170px;'><input type='radio' name='RadioGroupPatient_2' value='PatientDiscount' id='RadioGroupPatient_2'	name='RadioGroupPatient_2' onclick='setDisChkBox2()' />&nbsp;&nbsp;&nbsp;Patient Discount</div></div>";

var setBillReportTemp = "<div style='width:110px'><input type='radio' name='RadioGroupPatient_2' value='BillPatient' id='RadioGroupPatient_2' name='RadioGroupPatient_2' onclick=setBillRepType('patient'),setBillTypeTemp() />&nbsp;&nbsp;&nbsp;Patient </div><div style='width:110px'><input type='radio' name='RadioGroupPatient_2' value='DiscountPatient' id='RadioGroupPatient_2' name='RadioGroupPatient_2' onclick=setDisChkBox() />&nbsp;&nbsp;&nbsp;Pending </div><div style='width: 150px'>	<input type='radio' name='RadioGroupPatient_2' value='BillIPDPatient'	id='RadioGroupPatient_2' name='RadioGroupPatient_2'	onclick=setBillRepType('ipd'),setBillTypeTemp()>&nbsp;&nbsp;&nbsp;Patient IPD Bill</div>";
var searchBoxTemp = "<br><div style='width: 100%; padding: 0%;'><div style='width: 80px;'>Search By:</div><div style='width: 90px; padding-left: 10px;'>Patient Name</div><div style='width: 12%;'><input style='width: 100%;' name='byName'	id='byName' type='text' /></div><div	style='padding-left: 10px; padding-right: 10px; width: 20px; text-align: center;'>or</div><div style='width: 70px; padding-left: 10px;'>Patient ID</div><div style='width: 12%;'><input style='width: 100%;' name='byId'	id='byId' type='text' /></div><div style='width: 80px; padding-left: 10px;'><input type='button'	value='Search'  class='edit' onclick=dispReportpatSearch('ForBilling') /></div></div>";
var searchBoxTempIPD = "<br><div style='width: 100%; padding: 0%;'><div style='width: 80px;'>Search By:</div><div style='width: 90px; padding-left: 10px;'>Patient Name</div><div style='width: 12%;'><input style='width: 100%;' name='byName'	id='byName' type='text' /></div><div	style='padding-left: 10px; padding-right: 10px; width: 20px; text-align: center;'>or</div><div style='width: 70px; padding-left: 10px;'>Patient ID</div><div style='width: 12%;'><input style='width: 100%;' name='byId'	id='byId' type='text' /></div><div style='width: 80px; padding-left: 10px;'><input type='button'	value='Search'  class='edit' onclick=dispReportpatSearch('ForIPD') /></div></div>";

var searchBoxTempForMatUse = "<br><div style='width: 100%; padding: 0%;'><div style='width: 80px;'>Search By:</div><div style='width: 90px; padding-left: 10px;'>Patient Name</div><div style='width: 12%;'><input style='width: 100%;' name='byName'	id='byName' type='text' /></div><div	style='padding-left: 10px; padding-right: 10px; width: 20px; text-align: center;'>or</div><div style='width: 70px; padding-left: 10px;'>Patient ID</div><div style='width: 12%;'><input style='width: 100%;' name='byId'	id='byId' type='text' /></div><div style='width: 80px; padding-left: 10px;'><input type='button'	value='Search'  class='edit' onclick=dispReportpatSearch('forMatUse') /></div></div>";

var searchBoxTempForPatTrt = "<br><div style='width: 100%; padding: 0%;'><div style='width: 80px;'>Search By:</div><div style='width: 90px; padding-left: 10px;'>Patient Name</div><div style='width: 12%;'><input style='width: 100%;' name='byName'	id='byName' type='text' /></div><div	style='padding-left: 10px; padding-right: 10px; width: 20px; text-align: center;'>or</div><div style='width: 70px; padding-left: 10px;'>Patient ID</div><div style='width: 12%;'><input style='width: 100%;' name='byId'	id='byId' type='text' /></div><div style='width: 80px; padding-left: 10px;'><input type='button'	value='Search'  class='edit' onclick=dispReportpatSearch('forPatTreat') /></div></div>";

var searchPatResultInfo = "<div	style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 32%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>PatientName</div><div	style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>PatientID</div><div	style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>TreatmentID</div><div	style='width: 19%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Get Reoprt</div></div></div><div	style='width: 99.80%; height: 75%; overflow-y: scroll; border: 1px solid #436a9d;'	id='container'></div>";
var containerTemplateForBillIPDReport = "{#foreach $T.lip as lip} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 33%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.lip.fn} {$T.lip.mn} {$T.lip.ln}</div><div id='divPi{count}' style='width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.lip.pi}</div><div style='width: 15.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.lip.trid}</div><div style='width: 20%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='GETREPORT' id='btnDelete{count}' onclick='viewIPDBill({$T.lip.trid})' /></div></div>{#/for}";

var containerTemplateForBillReport = "{#foreach $T.lip as lip} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 33%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.lip.fn} {$T.lip.mn} {$T.lip.ln}</div><div id='divPi{count}' style='width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.lip.pi}</div><div style='width: 15.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.lip.trid}</div><div style='width: 20%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='GETREPORT' id='btnDelete{count}' onclick='viewBill({$T.lip.trid})' /></div></div>{#/for}";
var containerTemplateForMatUseReport = "{#foreach $T.lip as lip} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 33%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.lip.fn} {$T.lip.mn} {$T.lip.ln}</div><div id='divPi{count}' style='width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.lip.pi}</div><div style='width: 15.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.lip.trid}</div><div style='width: 20%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='GETREPORT' id='btnDelete{count}' onclick=getReportForMatUse('{$T.lip.trid}','{$T.lip.fn}','{$T.lip.ln}') /></div></div>{#/for}";

var pdfButtonTemp = "&nbsp;&nbsp;<a href='sss' style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='eee' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>";

var containerTemplateForPatTreatReport = "{#foreach $T.lip as lip} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 33%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.lip.fn} {$T.lip.mn} {$T.lip.ln}</div><div id='divPi{count}' style='width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.lip.pi}</div><div style='width: 15.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.lip.trid}</div><div style='width: 20%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='GETREPORT' id='btnDelete{count}' onclick=getReportForPatTreat('{$T.lip.trid}','{$T.lip.pi}','{$T.lip.fn}','{$T.lip.ln}') /></div></div>{#/for}";
var sr = 1;
var SRcaseRegister = "<tr><td width='49'></td><td width='299'></td><td width='200' align='center'><strong>Consulting/Follow-up</strong></td><td width='200' align='center'><strong>ECG</strong></td><td width='75'></td><td width='75'></td><td width='100'></td></tr>{#foreach $T.bl as bl}<tr><td width='49' align='center'>{sr}</td><td width='289' style='padding-left:10px'>{$T.bl.bt}</td><td width='200' align='center'><img src='images/Accept.png' width='10%' height='10%' /></td><td width='200' align='center'><img src=' ' id='ecg{sr++}' width='10%' height='10%' /></td><td width='75' align='right' id='{$T.bl.id}'>{$T.bl.ta}</td><td width='75' align='center'>{$T.bl.id}</td><td width='100'></td></tr>{#/for}<tr><td width='49' align='center'></td><td width='299' align='center'>Total</td><td width='200'></td><td width='200'></td><td width='75' align='right' id='total'></td><td width='75' align='center'></td><td width='100'></td></tr>";
var KRcaseRegister = "<tr><td width='48'></td><td width='188'></td><td width='98' align='center'><strong>Con/F.up</strong></td><td width='98' align='center'><strong>ECG</strong></td><td width='98' align='center'><strong>CST</strong></td><td width='98' align='center'><strong>ECHO</strong></td><td width='98' align='center'><strong>USG/Per</strong></td><td width='75'></td><td width='75'></td><td width='100'></td></tr>{#foreach $T.bl as bl}<tr><td width='48' align='center'>{sr++}</td><td width='188' style='padding-left:10px' >{$T.bl.bt}</td><td width='98' align='center'></td><td width='98' align='center'><img src=' ' id='ecg{sr}' width='20%' height='20%' /></td><td width='98' align='center'><img src=' ' id='cst{sr}' width='20%' height='20%' /></td><td width='98' align='center'><img src=' ' id='echo{sr}' width='20%' height='20%' /></td><td width='98' align='center'><img src=' ' id='usg{sr}' width='20%' height='20%' /></td><td width='75' align='right' id='{$T.bl.id}'>{$T.bl.ta}</td><td width='75' align='center'>{$T.bl.id}</td><td width='82'></td></tr>{#/for}<tr><td width='48' align='center'></td><td width='188' align='center'>Total</td><td width='98' align='center'></td><td width='98' align='center'></td><td width='98' align='center'></td><td width='98' align='center'></td><td width='98' align='center'></td><td width='75' align='right' id='total'></td><td width='75'></td>	<td width='75'></td></tr>";
var OPcaseRegister = "<tr><td width='49'></td><td width='280'></td><td width='400' align='center'><strong>Operation</strong></td><td width='75'></td><td width='75'></td><td width='100'></td></tr>{#foreach $T.bl as bl}<tr><td width='49' align='center'>{sr++}</td><td width='290' style='padding-left:10px'>{$T.bl.bt}</td><td width='400' align='center'><img src='images/Accept.png' width='5%' height='5%' /></td><td width='75' align='right' id='{$T.bl.id}'>{$T.bl.ta}</td><td width='75' align='center'>{$T.bl.id}</td><td width='100'></td></tr>{#/for}<tr><td width='49' align='center'></td><td width='299' align='center'>Total</td><td width='400'></td><td width='70'   align='right' id='total'></td><td width='75'></td></tr>";

var getRepBtnTemp = "<input onclick='getCommonPatientReport()' style=''	type='button' value='Get Report' class='btn btn-xs btn-success' />";

var count = 1;
// present in patient.js also
var feedbackPatTemplate = "{#foreach $T.pl as pl}<tr><td class='col-md-1-1'>{count}.</td>"
		+ "<td class='numeric col-md-4-1'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		//+ "<td class='col-md-1-1 center'>{$T.pl.pi}</td>"
		+ "<td class='col-md-1-1 center'>{$T.pl.centerPatientId}</td>"
		+ "<td class='numeric col-md-1-1 center'>{$T.pl.ag}Y/{$T.pl.month}M/{$T.pl.days}D</td>"
		/*+ "<td class='numeric col-md-1-1 center'>{$T.pl.bg}</td>"
		+ "<td class='numeric col-md-2-1 center'>{$T.pl.mrNo}</td>"*/
		+ "<td class='numeric col-md-1-1 center'>"
		+ "<button class='btn btn-xs btn-success' id='btnSteaker{count}' "
		+ "style='font-size: 12px;' onClick=printFeedbackFormEnglish({count})>English</button></td>"
		+ "<td class='numeric col-md-1-1 center'>"
		+ "<button class='btn btn-xs btn-success' id='btnSteaker{count}' "
		+ "onClick=printFeedbackFormMarathi({count++}) style='font-size: 12px;'>Marathi</button></td>"
		+ "</tr>{#/for}";

/** *********************** Generate Certificates start ********************** */

var viewCertDashPatTemp = "{#foreach $T.lstRegviewDto as lrd}<tr class='TextFont'>"
		+ "<td class='col-md-1-1 center'>{count++}</td>	"
		+ "<td class='numeric col-md-3-1'>{$T.lrd.patientName}</td>"
		+ '{#if $T.lrd.department_id=="1"}'
		+ "<td class='numeric col-md-2-1 center'>OPD</td>"
		+ '{#elseif $T.lrd.department_id=="2"}'
		+ "<td class='numeric col-md-2-1 center'>IPD</td>"
		+ '{#elseif $T.lrd.department_id=="3"}'
		+ "<td class='numeric col-md-2-1 center'>Diagnostic</td>"
		+ '{#/if}'
		+ "<td class='col-md-2-1 center' style='display:none'>{$T.lrd.ptId}</td>	"
		+ "<td class='col-md-2-1 center'>{$T.lrd.centerPatientId}</td>	"
		+ "<td class='numeric col-md-2-1 center'>{$T.lrd.age}</td>	"
		+ "<td class='numeric col-md-2-1 center'><input style='font-size: 10px; width: 80%;' type='button' value='GET CERTIFICATE' id='btnSteaker{count}' onClick=printCertificate({$T.lrd.ptId},{$T.lrd.ttId}) class='edit' /></td></tr>{#/for}";
function setTestType() {

	$("#divTestCharges").show();
	$("#divDues").hide();

}
function viewCertDashboardPat(callFrom) {
	if(callFrom=="onload"){
		$("#searchFrom").val("all");
	}else{
		$("#searchFrom").val("death");
	}
	
	var inputs = [];
	inputs.push("callFrom=" + callFrom);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/certificate/viewCertDashboardPat",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			count=1;
			$("#container").setTemplate(viewCertDashPatTemp);
			$("#container").processTemplate(ajaxResponse);
			myObj = JSON.stringify(ajaxResponse);
			$("#patObj").val(myObj.decodeSpecialChars());
		}
	});
	
	
	
	/*count = 1;
	var inputs = [];
	inputs.push('action=ShowTopPat');
	inputs.push('showFun=' + 'showTopPat');
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
			ajaxResponse = r;
			// alert(ajaxResponse);

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(viewCertDashPatTemp);
			$("#container").processTemplate(pobj1);
			myObj = JSON.stringify(pobj1);
			$("#patObj").val(myObj.decodeSpecialChars());
		}
	});*/
}

function showRefDiv() {
	$("#divrefBy").show();
	// $("#empidDiv").hide();
	$("#divDues").hide();
	$("#patient_type").hide();
}

function showTestDiv() {
	$("#divTestCharges").hide();
	$("#divDues").hide();
	// $("#empidDiv").hide();
}
function searchCertDashboardPat() {
	count = 1;
	var byName = $("#byName").val();
	byName = $.trim(byName);
	var byId = $("#byId").val();
	byId = $.trim(byId);
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("please search either by patient Id or by Patient Name");
	} else if (byName == "" && byId == "") {
		alert("Pease Enter Patient Name Or Patient Id");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;
		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}
		var inputs = [];
		inputs.push('action=ShowTopPat');
		inputs.push('page_name=certificateDashboard');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('showFun=showSearchPat');
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
				ajaxResponse = r;
				// alert(ajaxResponse);
				patientBean = eval('(' + ajaxResponse + ')');
				if (patientBean.pl.length == 0) {
					alert("Patient details not found.");
				} else {

					$("#container").setTemplate(viewCertDashPatTemp);
					$("#container").processTemplate(patientBean);

					myObj = JSON.stringify(patientBean);

					$("#patObj").val(myObj.decodeSpecialChars());
				}
			}
		});
	}
}

function printCertificate(ptId,treatmentId) {

	var selCertTyp = $("#selCertTyp").val();

	var divPi = $("#patObj").val();

	myArray = JSON.parse(divPi);

	for ( var i = 0; i < myArray.lstRegviewDto.length; i++) {

		if (myArray.lstRegviewDto[i].ptId == ptId) {

			myObj = myArray.lstRegviewDto[i];
			break;
		}
	}
	
	//alert(selCertTyp);
	
	if (selCertTyp == 'Birth') {
		window.location = "Repost_feedback.jsp?" + "myObj=" + myObj;
	} else if (selCertTyp == 'Death') {
		window.location = "Cert_death.jsp?" + "treatmentId=" + treatmentId+"&cert=" + selCertTyp;
	} else if (selCertTyp == 'Fitness') {

		window.location = "SickLeaveCert.jsp?" + "treatmentId=" + treatmentId+"&cert=" + selCertTyp;
	} else if (selCertTyp == 'Sick') {

		window.location = "SickLeaveCert.jsp?" + "treatmentId=" + treatmentId+"&cert=" + selCertTyp;

	} else if(selCertTyp == 'ETC'){
		
		window.location = "EstimationCertificate.jsp?" +"treatmentId=" + treatmentId+"&patientId=" + ptId+"&cert=" + selCertTyp;
	} else if(selCertTyp == 'Utilization'){
		
	window.location = "UtilizationCertificate.jsp?" +"treatmentId=" + treatmentId+"&patientId=" + ptId+"&cert=" + selCertTyp;
	}

}

function setDethCertDate() {

	var divPi = $("#myObj").html();

	myArray = JSON.parse(divPi);

}

/** ***********myObj*****myObjnerate Certificates end ********************** */

function setFeedbackFrm() {

	var obj123 = $("#myObj").html();
	alert(obj123);

	var feedobj = JSON.parse(obj123);

	alert(feedobj);

}

function printFeedbackFormEnglish(arrayCount) {

	var pobj = $("#patientDetailsFeedback").html();
	pobj = eval('(' + pobj + ')');

	var plObj = pobj.pl[(arrayCount - 1)];
	var patNm = (plObj.tit + " " + plObj.fn + " " + plObj.mn + " " + plObj.ln);
	var hallNm = (plObj.objHall.hn);
	var halltype = (plObj.objHall.ht);
	var BedId = (plObj.otrBed.trBed);
	var strDate = (plObj.otrBed.strDate);
	var mrNo = (plObj.mrNo);
	var rgDt = plObj.rgDt;
	var treEnd = plObj.treEnd;

	str = [];
	str = strDate.split(" ");
	var treatStDt = str[0];
	
	window.open("FeedBackFormEnglish.jsp?" + "patNm=" + patNm + "&hallNm=" + hallNm 
			+ "&halltype=" + halltype + "&BedId=" + BedId + "&mrNo=" + mrNo
			+ "&treatStDt=" + treatStDt + "&treEnd=" + treEnd + "&rgDt=" + rgDt);
}

function printFeedbackFormMarathi(arrayCount) {

	var pobj = $("#patientDetailsFeedback").html();
	pobj = eval('(' + pobj + ')');

	var plObj = pobj.pl[(arrayCount - 1)];
	var patNm = (plObj.tit + " " + plObj.fn + " " + plObj.mn + " " + plObj.ln);
	var hallNm = (plObj.objHall.hn);
	var halltype = (plObj.objHall.ht);
	var BedId = (plObj.otrBed.trBed);
	var strDate = (plObj.otrBed.strDate);
	var mrNo = (plObj.mrNo);
	var rgDt = plObj.rgDt;
	var treEnd = plObj.treEnd;

	str = [];
	str = strDate.split(" ");
	var treatStDt = str[0];

	window.open("FeedBackFormMarathi.jsp?"+ "patNm=" + patNm + "&hallNm=" + hallNm 
			+ "&halltype=" + halltype + "&BedId=" + BedId + "&mrNo=" + mrNo
			+ "&treatStDt=" + treatStDt + "&treEnd=" + treEnd + "&rgDt=" + rgDt);
}

function viewFeedbackPat() {
	var searchBy="onload";
	var inputs = [];
	inputs.push('action=fetchPatBedDetails');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=');
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
			var ajaxResponse = r;
			$("#patientDetailsFeedback").html(ajaxResponse);
			count=1;
			var pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(feedbackPatTemplate);
			$("#container").processTemplate(pobj1);
		}
	});
}

function setDailyCaseRegisterTemp() {
	$("#getRepBtn").html("");
	$("#date").hide();

	var sample;
	$("#caseReg").setTemplate(setCaseRegisterTemp);
	$("#caseReg").processTemplate(sample);
}
function setCaseRegister(casetype) {
	var caseType = casetype.value;
	var date = $("#date-pick").val();
	if (caseType == "SR") {
		window.location = "SRcaseRegister.jsp?date-pick=" + date;
	} else if (caseType == "KR") {
		window.location = "KRCaseRegister.jsp?date-pick=" + date;
	} else if (caseType == "OP") {
		window.location = "OPcaseRegister.jsp?date-pick=" + date;
	}
}
function setPdfButtonTemp() {
	var pobj1;
	
	
	$("#pdfbutton").setTemplate(pdfButtonTemp);
	$("#pdfbutton").processTemplate(pobj1);
	
}

var regType = '';
function getCaseRegister(caseType) {
	var inputs = [];
	var date = $("#date-pick").val();
	// alert(date);
	if (date == undefined) {
		date = 0;
	}

	inputs.push('action=getCaseRegister');
	inputs.push('caseType=' + caseType);
	inputs.push('date=' + date);
	regType = caseType;
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			// alert(ajaxResponse);
			billBean = eval('(' + ajaxResponse + ')');
			var total = 0;
			for ( var i = 0; i < billBean.bl.length; i++) {
				total = total + billBean.bl[i].ta;
			}

			// location.reload();
			if (caseType == "SR") {
				$("#caseRegister").setTemplate(SRcaseRegister);
				$("#caseRegister").processTemplate(billBean);
			} else if (caseType == "KR") {
				$("#caseRegister").setTemplate(KRcaseRegister);
				$("#caseRegister").processTemplate(billBean);
			} else if (caseType == "OP") {
				$("#caseRegister").setTemplate(OPcaseRegister);
				$("#caseRegister").processTemplate(billBean);
			}
			$("#total").html(total);
			var w = 1;
			for ( var z = 0; z < billBean.bl.length; z++) {

				if (billBean.bl[z].ta == 0) {
					$("#" + billBean.bl[z].id).html("BAL");
				}
				if (regType == "KR") {
					w++;
					if (billBean.bl[z].df == "1") {
						$("#echo" + w).attr('src', "images/Accept.png");
					}
					if (billBean.bl[z].sp_dic_master_id == "1") {
						$("#cst" + w).attr('src', "images/Accept.png");
					}
				} else {
					if (billBean.bl[z].ub == "1") {
						$("#ecg" + w).attr('src', "images/Accept.png");
					}
					w++;
				}
			}
		}
	});
};

function hideTotal() {
	$("#getRepBtn").show();
	$("#ItemManage1").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	$("#divDues").hide();
	$("#patient_type").hide();
}

function hideOPD() {
	$("#getRepBtn").show();
	$("#ItemManage1").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	$("#divDues").hide();
	$("#patient_type").hide();
}

function hideIPD() {
	$("#getRepBtn").show();
	$("#ItemManage1").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	$("#divDues").hide();
	$("#patient_type").hide();
}

function hideTotalDischargePatient() {
	$("#getRepBtn").show();
	$("#ItemManage1").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	$("#divDues").hide();
	$("#patient_type").hide();
}

function hidePatienttreatmenttype() {
	$("#getRepBtn").show();
	$("#ItemManage1").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	$("#divDues").hide();
	$("#patient_type").show();
	setreasonofvisitforpatient();
}

var reasonOfVisitTemplate = "<option value = '0'>-Select-</option>{#foreach $T.ReasonOfVisitDetails as rvl}<option value = '{$T.rvl.ReasonOfVisit_id}'>{$T.rvl.ReasonOfVisit}</option>{#/for}";
function setreasonofvisitforpatient(pageName) {
	var inputs = [];
	inputs.push('action=getReasonOfVisitForPatientReport');
	inputs.push('pageName=' + encodeURIComponent(pageName));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			var patientBean = eval('(' + ajaxResponse + ')');
			$("#pat_type").setTemplate(reasonOfVisitTemplate);
			$("#pat_type").processTemplate(patientBean);

		}
	});
}

function hideHospital() {
	$("#getRepBtn").show();
	$("#ItemManage1").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	$("#divDues").hide();
}

function setBillTypeTemp() {

	$("#getRepBtn").html("");
	$("#caseReg").html("");
	var pobj1;
	$("#divReportCommonOption").setTemplate(billTypeTemp);
	$("#divReportCommonOption").processTemplate(pobj1);
}

function getReportForPatTreat(trid, patId, fn, ln) {
	setPdfButtonTemp();
	var repotType = $("#selTreatRepType").val();
	var patName = fn + " " + ln;
	// var from = $("#popup_container3").val();
	//
	// var to = $("#popup_container2").val();
	//
	// if (from == "" || from == null || to == '' || to == null) {
	// alert("Please Select The Date First");
	// } else

	if (repotType == "select") {
		alert("Please Select The Treatment Type");
	}

	else {

		var inputs = [];
		inputs.push('action=getReportForPatTre');
		inputs.push('patName=' + encodeURIComponent(patName));
		// inputs.push('to=' + to);
		inputs.push('patientId=' + patId);
		inputs.push('treatmentId=' + trid);
		inputs.push('repotType=' + repotType);
		var str = inputs.join('&');
		// alert(str);
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});

	}
};

function getReportForMatUse(trid, fName, lName) {
	setPdfButtonTemp();
	var patName = fName + " " + lName;
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {

		var inputs = [];
		inputs.push('action=getReportForMatPatient');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('patientName=' + encodeURIComponent(patName));
		inputs.push('treatment_id=' + trid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
};

function clearDivReportCommonOption() {
	$("#divtxtDoctorName").hide();
	$("#divReportCommonOption").html("");
	$("#divTestCharges").hide();
	GetRepBtn();
}
function setBillRepType(type) {
	$("#divReportCommonOption").html("");
	if (type == "patient") {
		var sample;
		$("#divSearchBox").setTemplate(searchBoxTemp);
		$("#divSearchBox").processTemplate(sample);
	} else if (type == "patientForMaterialUsed") {
		var sample;
		$("#divSearchBox").setTemplate(searchBoxTempForMatUse);
		$("#divSearchBox").processTemplate(sample);

	} else if (type == "patientForTreatment") {
		var sample;
		$("#divSearchBox").setTemplate(searchBoxTempForPatTrt);
		$("#divSearchBox").processTemplate(sample);

	} else if (type == "ipd") {
		var sample;
		$("#divSearchBox").setTemplate(searchBoxTempIPD);
		$("#divSearchBox").processTemplate(sample);
	}
}

function setBillRepTemp() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#date").show();
	var sample;
	$("#ItemManage").setTemplate(setBillReportTemp);
	$("#ItemManage").processTemplate(sample);
}
function dispReportpatSearch(type) {
	// alert(page_name)
	count = 1;

	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("please search either by patient Id or by Patient Name");
	} else if (byName == "" && byId == "") {
		alert("please inserst something for search");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];

		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('action=showSearchPatReport');

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ReportServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						
					},
					success : function(r) {
						ajaxResponse = r;
						// alert(ajaxResponse);
						patientBean = eval('(' + ajaxResponse + ')');
						var sample;
						$("#divSearchResult").setTemplate(searchPatResultInfo);
						$("#divSearchResult").processTemplate(sample);
						if (type == "ForBilling") {
							$("#container").setTemplate(
									containerTemplateForBillReport);
							$("#container").processTemplate(patientBean);
						} else if (type == "forMatUse") {
							$("#container").setTemplate(
									containerTemplateForMatUseReport);
							$("#container").processTemplate(patientBean);
						} else if (type == "forPatTreat") {
							$("#container").setTemplate(
									containerTemplateForPatTreatReport);
							$("#container").processTemplate(patientBean);
						} else {
							if (type == "ForIPD") {
								$("#container").setTemplate(
										containerTemplateForBillIPDReport);
								$("#container").processTemplate(patientBean);
							}
						}
					}
				});
	}
};

function getReportForBill(trid, x, y) {

	var selBillType = $("#selBillType").val();

	var pname = x + " " + y;
	alert(pname);
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);

		var inputs = [];
		inputs.push('action=getReportForBill');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('trid=' + trid);
		inputs.push('pname=' + pname);
		inputs.push('selBillType=' + selBillType);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;

				alert(ajaxResponse);
				// location.reload();
			}
		});

	}
};

function setMaterialUsedReport() {
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#getRepBtn").html("");
	$("#caseReg").html("");
	$("#date").show();
	// alert ("hiiiiiiiiiii");
	var a = "";
	$("#ItemManage").setTemplate(setMaterialUsedReportTemp);
	$("#ItemManage").processTemplate(a);
}

function setPatientName() {
	$("#getRepBtn").hide();
	var pobj = "";
	$("#ItemManage1").setTemplate(setPatientNameTemp);
	$("#ItemManage1").processTemplate(pobj);
	$(".auto").autocomplete("AutoSuggetionServlet?auto=PatientName");
}

function setChannelingReportTemp() {
	GetRepBtn();
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#caseReg").html("");
	$("#date").show();
	$("#divrefBy").hide();
	// $("#datepart").hide();
	// $("#popup_container2").attr('readonly', true);
	// $("#popup_container3").attr('readonly', true);
	$("#popup_container2").hide();
	$("#popup_container3").hide();
	$("#from").hide();
	$("#to").hide();
	var sample;
	$("#ItemManage").setTemplate(channelingReportTemp);
	$("#ItemManage").processTemplate(sample);
}
function setdisRepTemp() {
	GetRepBtn();

	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#date").show();
	$("#caseReg").html("");
	var sample;
	$("#ItemManage").setTemplate(disRepTemp);
	$("#ItemManage").processTemplate(sample);
}
function GetRepBtn() {
	var sample;
	$("#getRepBtn").setTemplate(getRepBtnTemp);
	$("#getRepBtn").processTemplate(sample);

}
function setDistReportTemp() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#date").show();
	var sample;
	$("#ItemManage").setTemplate(distReportTemp);
	$("#ItemManage").processTemplate(sample);
}
function setdeadPatientReportTemp() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#date").show();
	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#from").show();
	$("#divTestCharges").hide();
	$("#to").show();
	$("#divrefBy").hide();
	$("#from").html("From");
	var sample;
	$("#ItemManage").setTemplate(deadPatientReportTemp);
	$("#ItemManage").processTemplate(sample);
}
function setTreatmentClosedReportTemp() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#date").show();
	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#from").show();
	$("#to").show();
	$("#divrefBy").hide();
	$("#divTestCharges").hide();
	$("#from").html("From");
	var sample;
	$("#ItemManage").setTemplate(treatmentClosedReportTemp);
	$("#ItemManage").processTemplate(sample);
}

function setHosCollectionTemp() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#date").show();
	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#divrefBy").hide();
	$("#divTestCharges").hide();
	$("#from").html("From");
	$("#from").show();
	$("#to").show();
	var sample;
	$("#ItemManage").setTemplate(hospCollectionReport);
	$("#ItemManage").processTemplate(sample);

}
function setPatientReport() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#ItemManage2").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#date").show();
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	var sample;
	$("#divTestCharges").hide();
	$("#ItemManage").setTemplate(patientReportTemp);
	$("#ItemManage").processTemplate(sample);
	$("#ItemManage2").setTemplate(patientReportTempDue);
	$("#ItemManage2").processTemplate(sample);

	$("#ItemManage3").setTemplate(patientReportTempIPDRegisterNew);
	$("#ItemManage3").processTemplate(sample);

	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#from").html("From");
	$("#from").show();
	$("#to").show();
}

function setCorporateReport() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#ItemManage2").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#date").show();
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	var sample;
	$("#divTestCharges").hide();
	$("#ItemManage").setTemplate(CorporateReport);
	$("#ItemManage").processTemplate(sample);
	$("#ItemManage2").setTemplate(patientReportTempDue);
	$("#ItemManage2").processTemplate(sample);

	$("#ItemManage3").setTemplate(patientReportTempIPDRegisterNew);
	$("#ItemManage3").processTemplate(sample);

	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#from").html("From");
	$("#from").show();
	$("#to").show();
}

function setCorporateDueReport() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#ItemManage2").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#date").show();
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	var sample;
	$("#divTestCharges").hide();
	$("#ItemManage").setTemplate(CorporateDueReport);
	$("#ItemManage").processTemplate(sample);
	$("#ItemManage2").setTemplate(patientReportTempDue);
	$("#ItemManage2").processTemplate(sample);

	$("#ItemManage3").setTemplate(patientReportTempIPDRegisterNew);
	$("#ItemManage3").processTemplate(sample);

	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#from").html("From");
	$("#from").show();
	$("#to").show();
}

function setSchedulerReport() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#ItemManage2").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#date").show();
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	var sample;
	$("#divTestCharges").hide();
	$("#ItemManage").setTemplate(SchedulerReport);
	$("#ItemManage").processTemplate(sample);
	$("#ItemManage2").setTemplate(patientReportTempDue);
	$("#ItemManage2").processTemplate(sample);

	$("#ItemManage3").setTemplate(patientReportTempIPDRegisterNew);
	$("#ItemManage3").processTemplate(sample);

	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#from").html("From");
	$("#from").show();
	$("#to").show();
}

function setDoctorReport() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	var sample;
	$("#date").show();
	$("#divrefBy").hide();
	$("#divTestCharges").hide();
	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#from").show();
	$("#to").show();
	$("#from").html("From");
	$("#ItemManage").setTemplate(doctorReportTemp);
	$("#ItemManage").processTemplate(sample);
}

function setOperationReportTemp() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#date").show();
	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#divrefBy").hide();
	$("#from").show();
	$("#to").show();
	$("#from").html("From");
	$("#divTestCharges").hide();
	var sample;
	$("#ItemManage").setTemplate(operationReportTemp);
	$("#ItemManage").processTemplate(sample);
}
function setWardReportTemp() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	$("#date").show();
	$("#popup_container2").hide();
	$("#popup_container3").hide();
	$("#divrefBy").hide();
	$("#from").hide();
	$("#to").hide();
	$("#divTestCharges").hide();
	var sample;
	$("#ItemManage").setTemplate(wardReportTemp);
	$("#ItemManage").processTemplate(sample);
}
function setWard() {
	var inputs = [];
	inputs.push('action=setWard');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			// alert(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');

			$("#divReportCommonOption").setTemplate(setWardTemp);
			$("#divReportCommonOption").processTemplate(pobj);

			// location.reload();
		}
	});

}
function getReportForWard() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	var bedType = $("#bedType").val();
	/*
	 * if (from == "" || from == null || to == '' || to == null) { alert("Please
	 * Select The Date First"); } else {
	 */

	// alert("from = " + from + " to =" + to + " bedType = " + bedType);
	var inputs = [];
	inputs.push('action=getReportForWard');
	inputs.push('from=' + from);
	inputs.push('to=' + to);
	inputs.push('bedType=' + bedType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns(ajaxResponse);
		}
	});

	// }
};
function setOprChkBox() {
	var inputs = [];
	inputs.push('action=fetchOperation');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(r);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#divReportCommonOption").setTemplate(operNameTemp);
			$("#divReportCommonOption").processTemplate(pobj1);

		}
	});

}
function setDiscountReport() {
	// alert("Hi");
	var inputs = [];
	inputs.push('action=fetchOperation');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#divReportCommonOption").setTemplate(operNameTemp);
			$("#divReportCommonOption").processTemplate(pobj1);

		}
	});

}

function setDistNameForPO() {
	// alert("Hi");
	var inputs = [];
	inputs.push('action=fetchDistributer');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#divReportCommonOption").setTemplate(repDistNameTemplateForPO);
			$("#divReportCommonOption").processTemplate(pobj1);
		}
	});

}

function setDistName() {
	// alert("Hi");
	var inputs = [];
	inputs.push('action=fetchDistributer');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#divReportCommonOption").setTemplate(repDistNameTemplate);
			$("#divReportCommonOption").processTemplate(pobj1);
		}
	});

}

function getReportForDistributersPO(callFrom) {

	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();

	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('popup_container3=' + popup_container3);
		inputs.push('popup_container2=' + popup_container2);
		inputs.push('callFrom=' + callFrom);
		inputs.push('action=getReportForRecItems');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;

				if (callFrom === "DashboardJSP") {
					// alert("DashboardJSP_IPD: " + ajaxResponse);
					$("#diagnosticCollection").html(
							(ajaxResponse.substring(1,
									(ajaxResponse.length) - 1)));

				} else {
					setViewBtns(ajaxResponse);
				}
			}
		});
	}
}

function getReportForDist() {

	var selDistName = $("#testType").val();
	// alert(selDistName);
	var inputs = [];
	inputs.push('selDistName=' + encodeURIComponent(selDistName));
	inputs.push('action=getReportForDist');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns(ajaxResponse);
		}
	});
}
function getReportForAllPatient() {
	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();

	var inputs = [];
	inputs.push('popup_container3=' + popup_container3);
	inputs.push('popup_container2=' + popup_container2);
	inputs.push('action=getReportForAllPatient');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			setViewBtns(ajaxResponse);

		}
	});

}

var visitingDocReportTemp = "<select	style='width: 40%;font-size: 11px;float:left;font-size: 11px;'  name='selDocName' id='selDocName' >{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}</select><div style='width: 60%' id='visitingDocReport'><div style='width: 70px; '><input type='radio' name='RadioGroupVisitingDoctor' checked='checked' id='RadioGroupVisitingDoctor' value='OPD' />&nbsp;&nbsp;&nbsp;OPD</div><div style='width: 100px;'><input type='radio' id='RadioGroupVisitingDoctor'	name='RadioGroupVisitingDoctor' value='Procedure' />&nbsp;&nbsp;&nbsp;Procedure	</div></div>";

var anesthetistDocReportTemp = "<select	style='font-size: 11px;float:left;font-size: 11px;'  name='selDocName' id='selDocName' >{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}</select>";

function setRepDocName(docType) {
	$("#divtxtDoctorName").hide();
	$("#pdfbutton").html("");
	$("#divIPDRefDoc").hide();
	$("#divSearchBox").show();
	var onload = "onload";

	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('docType=' + docType);
	inputs.push('date=' + onload);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			doctorBean = eval('(' + ajaxResponse + ')');

			$("#divSearchBox").setTemplate(repDocNameTemplate);
			$("#divSearchBox").processTemplate(doctorBean);

			// setAppoType();
		}
	});
	// window.reload();
};

function corporatelist1(type) {
	$("#divtxtDoctorName").hide();
	// var onload = "onload";

	// alert(type);

	var inputs = [];
	inputs.push('action=getcorporatelist');
	inputs.push('type=' + type);
	// inputs.push('date=' + onload);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(r);
			doctorBean = eval('(' + ajaxResponse + ')');

			$("#divSearchBox").setTemplate(corporatelisttemp);
			$("#divSearchBox").processTemplate(doctorBean);

			// setAppoType();
		}
	});
	// window.reload();
};

function setPatSearchTemp() {
	var sampleBean = "";
	$("#divReportCommonOption").setTemplate(patSearchTemp);
	$("#divReportCommonOption").processTemplate(sampleBean);
}

function getCommonPatientReport() {

	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();

	var frommonthfield = fromDate.split("/")[1];
	var fromdayfield = fromDate.split("/")[0];
	var fromyearfield = fromDate.split("/")[2];

	var tomonthfield = toDate.split("/")[1];
	var todayfield = toDate.split("/")[0];
	var toyearfield = toDate.split("/")[2];

	var fromDate = new Date(fromyearfield, frommonthfield - 1, fromdayfield);
	var toDate = new Date(toyearfield, tomonthfield - 1, todayfield);

	if (fromDate > toDate) {
		alert("from date should be less than to date");
		$("#popup_container3").val("");
		$("#popup_container2").val("");
		return false;
	}
	var reportType = ($('input:radio[name=RadioGroupPatient_2]:checked').val());

	/*
	 * var $urgent_id = $('input:checkbox[id=registration]'); if
	 * ($urgent_id.is(':checked') == true) { }
	 */
	if (reportType == "" || undefined == reportType || null == reportType) {
		alert("Please Select Report Type ...");
	} else {
		if (reportType == "total") {
			setPdfButtonTemp();
			getReportForTotalPatient();
		} else if (reportType == "OPDDue") {
			setPdfButtonTemp();
			getReportForOPDPatientDue();
		} else if (reportType == "IPDallDue") {
			setPdfButtonTemp();
			getReportForIPDPatientallDue();
		} else if (reportType == "DiagonosisDue") {
			setPdfButtonTemp();
			getReportForDiagonosisPatientDue();
		} else if (reportType == "IPDDue") {
			setPdfButtonTemp();
			getReportForIPDPatientDue();
		} else if (reportType == "TOTALDUE") {
			// setPdfButtonTemp();
			totaldueReportPDF();
		} else if (reportType == "IPDRegisterNew1") {
			setPdfButtonTemp();
			getReportForIPDRegisterNew();

		} else if (reportType == "PhysicalDischarge") {
			setPdfButtonTemp();
			getReportForphysicaldischarge();

		} else if (reportType == "IPDRegisterNew2") {
			setPdfButtonTemp();
			getReportForIPDRegisterNewSpecialityBasis();
		} else if (reportType == "OPDRegisterNew") {
			setPdfButtonTemp();
			getReportForOPDRegPatientSpecialityBasis();

		} else if (reportType == "CorporateALL") {
			setPdfButtonTemp();
			getReportForCorporateALL();

		} else if (reportType == "CorporateParticular") {
			setPdfButtonTemp();
			getReportForCorporateParticular();

		} else if (reportType == "CorporatePolicy") {
			setPdfButtonTemp();
			getReportForCorporatePolicy();

		} else if (reportType == "CorporateDueALL") {
			setPdfButtonTemp();
			getReportForCorporateDueALL();

		} else if (reportType == "CorporateDueParticular") {
			setPdfButtonTemp();
			getReportForCorporateDueParticular();

		} else if (reportType == "CorporateDuePolicy") {
			setPdfButtonTemp();
			getReportForCorporateDuePolicy();

		} else if (reportType == "SchedulerReport") {
			setPdfButtonTemp();
			getschedulerReport();
		} else if (reportType == "total_collection_all") {
			setPdfButtonTemp();
			getReportForTotalCollectionForPatients();
		} else if (reportType == "OPD") {
			setPdfButtonTemp();
			getReportForOPDPatient();
		} else if (reportType == "OPDRefund") {
			setPdfButtonTemp();
			getReportForOPDRefundReceipt();
		} else if (reportType == "DiagnosticRefund") {
			setPdfButtonTemp();
			getReportForDiagnosisRefundReceipt();
		} else if (reportType == "patienttreatmenttype") {
			setPdfButtonTemp();
			getReportForPatientTreatmentType();
		} else if (reportType == "IPD") {
			setPdfButtonTemp();
			getReportForIPDPatient();
		} else if (reportType == "Alldoctorreport") {
			setPdfButtonTemp();
			getReportForDoctorInfo();
		} else if (reportType == "DoctorsPatientReport") {
			setPdfButtonTemp();
			getReportForDoctor();
		} else if (reportType == "Doctorsoperation") {
			getReportForOperDoctor();
			setPdfButtonTemp();
		} else if (reportType == "Distributersitems") { //@ik
			setPdfButtonTemp();
			getReportForDist();
		} else if (reportType == "DiagnosticAll") {
			setPdfButtonTemp();
			getReportForDistributersPO('DiagnosticAll');
		} else if (reportType == "AllDistributer") {
			setPdfButtonTemp();
			getReportForDistInfo();
		} else if (reportType == "All Procedure") {
			getReportForoperationInfo();
			setPdfButtonTemp();
		} else if (reportType == "OperationsType") {
			setPdfButtonTemp();
			getReportForOperationType();
		} else if (reportType == "DeadPatient") {
			setPdfButtonTemp();
			getDeadPatientReport();
		} else if (reportType == "Channeling") {
			setPdfButtonTemp();
			getChannelingReport();
		} else if (reportType == "MatPatient") {
			setPdfButtonTemp();
			getReportForMatPatient();
		} else if (reportType == "Ward") {
			setPdfButtonTemp();
			getReportForWard();
		} else if (reportType == "Inventory") {
			setPdfButtonTemp();
			getReportForOpInventory();
		} else if (reportType == "Discounts") {
			setPdfButtonTemp();
			getReportForTotalDiscount();
		} else if (reportType == "Hospital") {
			setPdfButtonTemp();
			getReportForAllPatient();
		} else if (reportType == "OpInventory") {
			setPdfButtonTemp();
			getReportForInventory();
		} else if (reportType == "SelDiscount") {
			setPdfButtonTemp();
			getReoprtForDiscount();
		} else if (reportType == "DiscountPatient") {
			setPdfButtonTemp();
			getDiscountPatient();
		} else if (reportType == "PatientDiscount") {
			setPdfButtonTemp();
			getReportForCorpAcc();
		} else if (reportType == "opdtoipdconversion") {
			setPdfButtonTemp();
			getReportForOpdtoipdconversion();
			$("#divrefBy").hide();
		} else if (reportType == "refBY") {
			setPdfButtonTemp();
			// showRefDiv();
			// getRefDoctors();
			getReportForRefByReport();
		} else if (reportType == "VisitingDoctorsReport") {
			setPdfButtonTemp();
			getReportForVisitingDoctorsReport();
		} else if (reportType == "AnesthetistDoctorsReport") {
			setPdfButtonTemp();
			getReportForAnesthetistDoctors();
		} else if (reportType == "OwnerIpdBilling") {
			setPdfButtonTemp();
			getReportForOwnerIpdBilling();
		} else if (reportType == "opdClose") {
			setPdfButtonTemp();
			getReportForTreatmentClosed(reportType);
		} else if (reportType == "ipdClose") {
			setPdfButtonTemp();
			getReportForTreatmentClosed(reportType);

		} else if (reportType == "ipdactive") {
			/* setPdfButtonTemp(); */
			// getReportForIpdActive();
			getCurrentIpdPatient();

		} else if (reportType == "patientReport") {
			getPatientReport(reportType);
			setPdfButtonTemp();
		} else if (reportType == "IPDRegister") {
			getReoprtForPatTre('Test');
			setPdfButtonTemp();
		} else if (reportType == "totalDischargePatient") {
			getReportForTotalDischargePatient(reportType);
			setPdfButtonTemp();
		} else if (reportType == "DoctorOverallReport") {
			getDoctorOverallReport('excel');
			setExcelButtonTemp();
		} 
		// Code by Kavita
		else if (reportType == "totalradiationpatient") {
			// setPdfButtonTemp();
			getTotalRadiationPatientReport();
		} 
		// Code by Kavita
		else if (reportType == "commonadvance") {
			setPdfButtonTemp();
			getTotalCommonAdvancePatientReport();
		} 
		// Code by Kavita Date: 05/10/2016 
		else if (reportType == "ExpenseVoucher") {
			setPdfButtonTemp();
			getReportForExpenseVoucher();
			
		// Code by Manisha Date: 18/11/2016 
		} else if (reportType == "ER") {
			setPdfButtonTemp();
			getReportForERPatient();
	    }
		// Code by Kavita Date: 22/11/2016 
		else if (reportType == "BedOccupancyReport") {
			setPdfButtonTemp();
			var halltype = "ALL";
			var hallwise = "0";
			getReportForAllBedOccupancy(halltype,hallwise);
	    }
		else if (reportType == "BedOccupancyReportHallTypewise") {
			setPdfButtonTemp();
			var halltype = $("#halltype").val();
			var hallwise = "0";
			getReportForAllBedOccupancy(halltype,hallwise);
	    }
		else if (reportType == "BedOccupancyReportHallwise") {
			setPdfButtonTemp();
			var halltype = "0";
			var hallwise = $("#hallwise").val();
			getReportForAllBedOccupancy(halltype,hallwise);
	    }
		// Code by Tushar Date: 11/01/2017 
		else if (reportType == "OverallBedOccupancyReport") {
			setPdfButtonTemp();
			getReportForOverallBedOccupancy();
	    }
		else if (reportType == "OverallBedOccupancyReportHallTypewise") {
			setPdfButtonTemp();
			var halltype = $("#halltype").val();
			getReportForOverallBedOccupancyHallTypewise(halltype);
	    }
		else if (reportType == "OverallBedOccupancyReportHallwise") {
			setPdfButtonTemp();
			var halltype = $("#halltype").val();
			var hallwise = $("#hallwise").val();
			OverallBedOccupancyReportHallwise(halltype,hallwise);
	    }
		else if (reportType == "SurgeonWise") {
			setPdfButtonTemp();
			var UserID = $("#surgeonWise").val();
			BillingReportSurgeonWise(UserID);
	    }else if (reportType == "AnaesthetistWise") {
			setPdfButtonTemp();
			var UserID = $("#anaesthetistWise").val();
			BillingReportAnaesthetistWise(UserID);
	    }
	    else if (reportType == "AssistantWise") {
			setPdfButtonTemp();
			var UserID = $("#assisWise").val();
			BillingReportAssistantWise(UserID);
	    }
	    else if (reportType == "ChargesWise") {
			setPdfButtonTemp();
			var OTID = $("#chargeWise").val();
			BillingReportOTChargesWise(OTID);
	    }
	    else if (reportType == "IPDRefDocBillReport") {
			setPdfButtonTemp();
			var channlingDoc = $("#channlingDoc").val();
			IPDReferenceDoctorBillingReport(channlingDoc);
	    }
	    else if (reportType == "BedOccupancyTrendReport") {
			printBedOccupancyTrendReport();
	    }
	    else if (reportType == "WardOccupancyTrendReport") {
			printWardOccupancyTrendReport();
	    } else if (reportType == "ipdInactivePatient") {
			setPdfButtonTemp();
			getReportForIPDInactivePatient(); 
		}
  }
}

var setRefByTemp = '<option value="select">select</option>{#foreach $T.cdl as cdl}<option value="{$T.cdl.cid}">{$T.cdl.cdn}</option>{#/for}';

function getRefDoctors() {

	var inputs = [];
	inputs.push('action=getRefDoctors');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			var pobj = eval('(' + ajaxResponse + ')');
			$("#refBy").setTemplate(setRefByTemp);
			$("#refBy").processTemplate(pobj);
			$("#channlingDoc").setTemplate(setRefByTemp);
			$("#channlingDoc").processTemplate(pobj);
		}
	});

}
function getReportForTreatmentClosed(reportType) {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if ((from == "" || from == null || to == '' || to == null)
			&& reportType == 'opdClose') {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForTreatmentClosed');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('reportType=' + reportType);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
function getReportForOpdtoipdconversion() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForOpdtoipdconversion');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}

}

function DateField() {

	$("#popup_container2").hide();
	$("#popup_container3").hide();
	$("#from").hide();
	$("#to").hide();

}

function getReportForIpdActive() {
	/*
	 * var from = $("#popup_container3").val(); var to =
	 * $("#popup_container2").val();
	 */

	var x = $("#popup_container2").hide();
	var y = $("#popup_container3").hide();

	var inputs = [];
	inputs.push('action=getReportForIpdActive');
	// inputs.push('from=' + from);
	// inputs.push('to=' + to);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns(ajaxResponse);
		}
	});

}
function getReportForRefByReport() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	var chnid = $("#refBy").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForRefBy');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('chnid=' + chnid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}

}
function getReportForCorpAcc() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	var oname = $("#selDocName").val();

	if (from == "" || from == null || to == "" || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForCorpAcc');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('oname=' + oname);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;

				if (oname === "DashboardJSP") {
					// alert("DashboardJSP_IPD: " + ajaxResponse);
					$("#ipdCollection").html(
							(ajaxResponse.substring(1,
									(ajaxResponse.length) - 1)));

				} else {
					setViewBtns(ajaxResponse);
				}
			}
		});
	}
}

function getDiscountPatient() {

	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	var oname = $("#oname").val();
	var selDisTypeFor = $("#selDisType").val();
	// alert(selDisType);
	var oname = $("#oname").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else if (oname == "select") {
		alert("Please Select Discount Type First");
	} else {

		var inputs = [];
		inputs.push('action=getReportDiscountPatientBill');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('oname=' + oname);
		inputs.push('selDisTypeFor=' + selDisTypeFor);
		alert(selDisType);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				alert("Report Generated Successfully");

				var i = ajaxResponse;

				var z = [];

				z = i.split('"');

				var t = z[1];

				$("a[href='sss']").attr('href', '/hms/HMS_Reports' + t);
			}
		});
	}
};
function getReportForMatPatient() {

	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	var patientName = $("#PatientName").val();
	if (patientName == "" || patientName == undefined || patientName == null) {
		alert("Please Enter Patient Name...");
	}
	// alert(" patientName = " + patientName);
	else {

		var inputs = [];
		inputs.push('action=getReportForMatPatient');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('patientName=' + encodeURIComponent(patientName));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
};

function getChannelingReport() {
	/*
	 * var from = $("#popup_container3").val(); var to =
	 * $("#popup_container2").val();
	 */
	// alert("from"+from);
	// alert("to"+to);
	var inputs = [];
	inputs.push('action=getReportForChanneling');
	inputs.push('from=null');
	inputs.push('to=null');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns(ajaxResponse);
		}
	});

}

function getDeadPatientReport() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert("from"+from);
	// alert("to"+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForDeadPatient');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
function getReportForOperationType() {

	var oname = $("#oname").val();
	// alert(selDocName);
	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();
	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('popup_container3=' + popup_container3);
		inputs.push('popup_container2=' + popup_container2);
		inputs.push('oname=' + oname);
		inputs.push('action=getReportForOperationType');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForoperationInfo() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	var inputs = [];
	inputs.push('action=getReportForOperInfo');
	inputs.push('from=' + from);
	inputs.push('to=' + to);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns(ajaxResponse);
		}
	});

}

function getReportForDistInfo() {
	var inputs = [];
	inputs.push('action=getReportForDistInfo');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns(ajaxResponse);
		}
	});

}

function getReportForDoctorInfo() {
	// $("#divReportCommonOption").html("");

	var inputs = [];
	inputs.push('action=getReportForDoctorInfo');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns(ajaxResponse);
		}
	});

}

function getReportForIPDPatient() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForIPDPatient');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForOperDoctor() {
	var selDocName = $("#selDocName").val();
	// alert(selDocName);
	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();
	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('popup_container3=' + popup_container3);
		inputs.push('popup_container2=' + popup_container2);
		inputs.push('selDocName=' + selDocName);
		inputs.push('action=getReportForOperDoctor');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;

				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForInventory() {

	// alert("outgoing");
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert("from"+from);
	// alert("to"+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForInventory');
		inputs.push('from=' + from);
		inputs.push('to=' + to);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;

				alert(ajaxResponse);
				// location.reload();
			}
		});
	}
}
function getReportForOpInventory() {
	// alert("incoming");
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert("from"+from);
	// alert("to"+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForOpInventory');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;

				alert(ajaxResponse);
				// location.reload();
			}
		});
	}
}
function getReoprtForPatTre(reportType) {

	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
		return false;
	}

	var fromDate = new Date((from.split("/")[2]), ((from.split("/")[1]) - 1),
			(from.split("/")[0]));
	var toDate = new Date((to.split("/")[2]), ((to.split("/")[1]) - 1), to
			.split("/")[0]);

	if (fromDate > toDate) {
		alert("from date should be less than to date");
		$("#popup_container3").val("");
		$("#popup_container2").val("");
		return false;
	}

	var inputs = [];
	inputs.push('action=getReportForPatTre');
	inputs.push('from=' + from);
	inputs.push('to=' + to);
	inputs.push('reportType=' + reportType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns(ajaxResponse);
		}
	});

}
function getReoprtForDiscount() {
	// alert("sd");
	var disId = $("#oname").val();
	var selDisType = $("#selDisType").val();
	var disName = $("#oname option:selected").text();
	// alert(disId);
	var inputs = [];
	inputs.push('action=getReportForDiscount');
	inputs.push('disId=' + disId);
	inputs.push('selDisType=' + selDisType);

	inputs.push('disName=' + disName);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns(ajaxResponse);
		}
	});

}
function getReportForDoctor() {

	var selDocName = $("#selDocName").val();
	// alert(selDocName);
	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();
	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('popup_container3=' + popup_container3);
		inputs.push('popup_container2=' + popup_container2);
		inputs.push('selDocName=' + selDocName);
		inputs.push('action=getReportForDoctor');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function setDisChkBox() {
	// alert("Discout");
	GetRepBtn();
	$("#divSearchBox").html("");
	$("#container").html("");
	$("#divSearchResult").html("");
	var inputs = [];
	inputs.push('action=fetchDiscount');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			var sampleBean = "";

			$("#divReportCommonOption").setTemplate(disNameTemp);
			$("#divReportCommonOption").processTemplate(pobj1);

		}
	});
}
function setDisChkBox2() {
	GetRepBtn();
	$("#divSearchBox").html("");
	$("#container").html("");
	$("#divSearchResult").html("");
	var inputs = [];
	inputs.push('action=fetchDiscount');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			var sampleBean = "";

			$("#divReportCommonOption").setTemplate(disNameTemp1);
			$("#divReportCommonOption").processTemplate(pobj1);

		}
	});
}

function getReportForOPDPatient() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForOPDPatient');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForOPDRefundReceipt() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForOPDRefundReceipt');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForDiagnosisRefundReceipt() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForDiagnosisRefundReceipt');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForPatientTreatmentType() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	var pat_type = $("#pat_type").val();

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
		return false;
	} else if (pat_type == 0) {
		alert("Please Select The Reason of Visit");
		return false;
	} else {
		var inputs = [];
		inputs.push('action=getReportForPatientTreatmentType');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('pat_type=' + pat_type);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForTotalPatient() {
	// alert("12345");
	// var from = $("#popup_container3").val();
	// var to = $("#popup_container2").val();
	/*
	 * if (from == "" || from == null || to == '' || to == null) {
	 * //alert("Please Select The Date First"); } else {
	 */
	var inputs = [];
	inputs.push('action=getReportForTotalPatient');
	// inputs.push('from=' + from);
	// inputs.push('to=' + to);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert("ajaxResponse =="+ajaxResponse);

			setViewBtns(ajaxResponse);
		}
	});
}

function getReportForTotalCollectionForPatients() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForTotalCollectionForPatients');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;

				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForOPDPatientDue() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForOPDPatientDue');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForIPDPatientallDue() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForIPDPatientallDue');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

/*
 * function getDoctorOverallReport() { var from = $("#popup_container3").val();
 * var to = $("#popup_container2").val(); var doctorId = $("#DoctorId").val();
 * alert(doctorId); if (from == "" || from == null || to == '' || to == null) {
 * alert("Please Select The Date First"); } else { var inputs = [];
 * inputs.push('action=getDoctorOverallReport'); inputs.push('from=' + from);
 * inputs.push('to=' + to); inputs.push('to=' + doctorId); var str =
 * inputs.join('&'); jQuery.ajax({ async : true, type : "POST", data : str +
 * "&reqType=AJAX", url : "ReportServlet", timeout : 1000 * 60 * 5, catche :
 * false, error : function() {  }, success : function(r) {
 * ajaxResponse = r; // alert(r); setViewBtns(ajaxResponse); } }); } }
 */
function getDoctorOverallReport(callfrom) {

	var fromDate = ($("#popup_container3").val()).trim();
	var toDate = ($("#popup_container2").val()).trim();
	var doctorId = $("#DoctorId").val();
	if (fromDate == "") {
		alert("Please enter from date.");
		return false;
	}
	if (toDate == "") {
		alert("Please enter to date.");
		return false;
	}
	if (doctorId == "") {
		alert("Please select Doctor Name.");
		return false;
	}

	var frommonthfield = fromDate.split("/")[1];
	var fromdayfield = fromDate.split("/")[0];
	var fromyearfield = fromDate.split("/")[2];

	var tomonthfield = toDate.split("/")[1];
	var todayfield = toDate.split("/")[0];
	var toyearfield = toDate.split("/")[2];

	var fromDateValidate = new Date(fromyearfield, frommonthfield - 1,
			fromdayfield);
	var toDateValidate = new Date(toyearfield, tomonthfield - 1, todayfield);

	if (fromDateValidate > toDateValidate) {
		alert("from date should be less than to date");
		$("#popup_container3").val("");
		$("#popup_container2").val("");
		return false;
	}

	var reportType = ($('input:radio[name=RadioGroupPatient_2]:checked').val());
	if (reportType == "" || undefined == reportType || null == reportType) {
		alert("Please Select Report Type...");
	} else {
		if (callfrom == "pdf") {
			window.open("doctor_overall_report.jsp?fromDMY=" + fromDate
					+ "&toDMY=" + toDate + "&doctorId=" + doctorId);
		}else{
			/*window.open("doctor_overall_report_excelsheet.jsp?fromDMY=" + fromDate
					+ "&toDMY=" + toDate + "&doctorId=" + doctorId);
			*/
			//alert("dfgfhfgh");
			var inputs = [];
			inputs.push('action=getExcelSheetForDoctorOverallReport');
			inputs.push('from=' + fromDate);
			inputs.push('to=' + toDate);
			inputs.push('doctorId=' + doctorId);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ReportServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					setExcelButtonTemp();
					setViewExcelBtn(ajaxResponse);
				}
			});
			
		}
	}
}

function getReportForDiagonosisPatientDue() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForDiagonosisPatientDue');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;

				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}
function getReportForIPDPatientDue() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForIPDPatientDue');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;

				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForIPDRegisterNew() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForIPDRegisterNew');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

// for physical discharge report by akshay...........

function getReportForphysicaldischarge() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForphysicaldischarge');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForIPDRegisterNewSpecialityBasis() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForIPDRegisterNewSpecialityBasis');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForOPDRegPatientSpecialityBasis() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForOPDRegPatientSpecialityBasis');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForCorporateALL() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForCorporateALL');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForCorporateParticular() {

	var id = $("#corporatelist").val();
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForCorporateParticular');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('id=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForCorporatePolicy() {

	var id = $("#corporatelist").val();
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForCorporatePolicy');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('id=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForCorporateDueALL() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForCorporateDueALL');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForCorporateDueParticular() {

	var id = $("#corporatelist").val();
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForCorporateDueParticular');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('id=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function getReportForCorporateDuePolicy() {

	var id = $("#corporatelist").val();
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForCorporateDuePolicy');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('id=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function setViewBtns(ajaxResponse) {

	alert("Report Generated Successfully");
	var i = ajaxResponse;

	var z = [];
	z = i.split('"');

	var t = z[1];

	var o = [];

	o = t.split('$');
	$("a[href='sss']").attr('href', '/EhatEnterprise/ehat_Reports' + o[0]);
	$("a[href='eee']").attr('href', '/EhatEnterprise/ehat_Reports' + o[1]);
}

function getReportForTotalDiscount() {
	var inputs = [];
	inputs.push('action=getReportForTotalDiscount');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			alert(ajaxResponse);
			// location.reload();
		}
	});
}

function getReportForAnesthetistDoctors() {

	/*
	 * var popup_container3 = $("#popup_container3").val(); var popup_container2 =
	 * $("#popup_container2").val();
	 * 
	 * if (popup_container3 == "" || popup_container3 == null ||
	 * popup_container2 == '' || popup_container2 == null) { alert("Please
	 * Select The Date First"); } else {
	 */
	var inputs = [];
	inputs.push('action=GetReportForAnesthetistDoctors');
	inputs.push('popup_container3=null');
	inputs.push('popup_container2=null');
	inputs.push('selDocName=temp');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns(ajaxResponse);
		}
	});

}

function getReportForVisitingDoctorsReport() {
	var selDocName = $("#selDocName").val();
	var reportFor = ($('input:radio[name=RadioGroupVisitingDoctor]:checked')
			.val());
	// alert(selDocName);
	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();
	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('popup_container3=' + popup_container3);
		inputs.push('popup_container2=' + popup_container2);
		inputs.push('selDocName=' + selDocName);
		inputs.push('reportFor=' + reportFor);

		inputs.push('action=getReportForVisitingDoctors');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}

var hospitalOwnerReportTemp = "<div class='ehat_subModule_180' style='display:none;width: 180px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	onclick=getReceptionistList('recp') value='OwnerIpdBilling'  />&nbsp;&nbsp;&nbsp;Receptionist Collection</div><div class='ehat_subModule_181' style='display:none;width: 180px;'><input type='radio'	name='RadioGroupPatient_2' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick=getReceptionistList('recp') value='PatientDiscount' />&nbsp;&nbsp;&nbsp;IPD Advance Collection</div>";

function setHospitalOwnerReport() {
	GetRepBtn();
	$("#caseReg").html("");
	$("#ItemManage1").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#divSearchResult").html("");
	var sample;
	$("#date").show();
	$("#divrefBy").hide();
	$("#divTestCharges").hide();
	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#from").html("From");
	$("#from").show();
	$("#to").show();
	var pageName = $("#pageName").val();
	var userName = $("#userName").val();
	$("#ItemManage").setTemplate(hospitalOwnerReportTemp);
	$("#ItemManage").processTemplate(sample);
}

function getReportForOwnerIpdBilling() {

	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();
	var pageName = $("#pageName").val();
	var selDocName = "";

	// for "Dashboard.jsp: selDocName='DashboardJSP'"
	if (pageName == "helpDesk") {
		selDocName = $("#userId").val();
	} else {
		selDocName = $("#selDocName").val();
	}
	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('from=' + popup_container3);
		inputs.push('to=' + popup_container2);
		inputs.push('selDocName=' + selDocName);

		inputs.push('action=getReportForOwnerIpdBilling');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;

				if (selDocName === "DashboardJSP") {
					// "totalAmount__paidAmount"
					// alert(ajaxResponse);
					var total = (ajaxResponse.split("__")[0]).substring(1);
					$("#opdCollection").html(total);

				} else {
					setViewBtns(ajaxResponse);
				}

			}
		});
	}
}

var receptionTemplate = "<select	style='width: 25%;font-size: 11px;'  name='selDocName' id='selDocName' >{#foreach $T.listDoctor as listDoctor}	<option value='{$T.listDoctor.Doctor_ID}'>{$T.listDoctor.doc_name}</option>{#/for}</select>";
function getReceptionistList(callFrom) {
	var inputs = [];
	inputs.push('action=getReceptionistList');
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			doctorBean = eval('(' + ajaxResponse + ')');

			$("#divSearchBox").setTemplate(receptionTemplate);
			$("#divSearchBox").processTemplate(doctorBean);
			$("#docDetails").html(ajaxResponse);

		}
	});
}
$(document).ready(function() {
	try {
		$("body").css("cursor", 'default');
		$(document).css("cursor", 'default');
	} catch (e) {
	}

	try {
		$.unblockUI();
	} catch (e) {
	}
	if (window.initLogOut)
		initLogOut();
});

function initTemplate() {

}

function checkGreaterDate() {

	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();

	var frommonthfield = fromDate.split("/")[1];
	var fromdayfield = fromDate.split("/")[0];
	var fromyearfield = fromDate.split("/")[2];

	var tomonthfield = toDate.split("/")[1];
	var todayfield = toDate.split("/")[0];
	var toyearfield = toDate.split("/")[2];

	var fromDate = new Date(fromyearfield, frommonthfield - 1, fromdayfield);
	var toDate = new Date(toyearfield, tomonthfield - 1, todayfield);

	if (fromDate > toDate) {
		alert("from date should be less than to date")
		// $("#popup_container3").val("");
		// $("#popup_container2").val("");
		return false;
	}

}

function getPatientReport() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getPatientReport');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;

				setViewBtns(ajaxResponse);
			}
		});
	}
}

// Suraj Code For Pharmacy Report

function getReportForPharmacyPatient() {
	/*
	 * var from = $("#popup_container3").val(); var to =
	 * $("#popup_container2").val(); var bedType = $("#bedType").val();
	 */
	/*
	 * if (from == "" || from == null || to == '' || to == null) { alert("Please
	 * Select The Date First"); } else {
	 */

	// alert("from = " + from + " to =" + to + " bedType = " + bedType);
	var inputs = [];
	/*
	 * inputs.push('from=' + from); inputs.push('to=' + to);
	 * inputs.push('bedType=' + bedType);
	 */
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "getPatientReport",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setViewBtns1(ajaxResponse);
		}
	});

	// }
}

function getPharmacyCompanyWiseProductReport() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var companyId = $("#companyId").val();

	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('companyId=' + companyId);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getProductCompanyList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				alert("report generated successfully");
				ajaxResponse = r;
				setResult(r);
			}
		});

	}
}

function getReportForPharmacyAllProductList() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getAllProductList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				alert("report generated successfully");
				ajaxResponse = r;
				setResult(r);
			}
		});

	}
}

function setResult(result) {
	var splitResult = result.split('$');

	$('#template')
			.html(
					"<button onclick='getDeletedPurchaseReport()' class='btn btn-xs btn-success' type='button'>Get"
							+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/MAHAHMIS/ehat_Reports/"
							+ splitResult[0]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/MAHAHMIS/ehat_Reports/"
							+ splitResult[1]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "");

}

function getReportForPharmacyCompanyList() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getCompanyList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				alert("report generated successfully");
				ajaxResponse = r;
				setResult(r);
			}
		});

	}
}

function setResultCashRecipt(result) {
	
	var r = result;
	var divContent = "";
	total=0;
divContent = divContent
			+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
	for ( var i = 0; i < r.length; i++) 
	{
		
		divContent = divContent + "<tr><td class='col-md-1'>" + r[i].cash_receipt_doc_id + "</td><td class='col-md-1'>" + r[i].vendor_name + "</td>"
		+ "<td class='col-md-1'>"
				+ r[i].cash_receipt_amt + "</td><td class='col-md-1'>" + r[i].cash_receipt_made_by + "</td></tr>";
			
		 
		
	}
	$("#currentstockdetails").html(divContent);
	/*var splitResult = result.split('$');

	$('#template')
			.html(
					"<button onclick='getDeletedPurchaseReport()' class='btn btn-xs btn-success' type='button'>Get"
							+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/"
							+ splitResult[0]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/"
							+ splitResult[1]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "");*/

}
//Added By Badrinath Wagh
//For Cash Receipt List Report 
function getReportForPharmacyCashReceiptListNew() {
	var fdate = $("#popup_container2").val();
	var tdate = $("#popup_container3").val();
			
		farr = fdate.split('/');
		tarr = tdate.split('/');
		
		from = farr[2]+'-'+farr[1]+'-'+farr[0];
		to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('unitId=' + 1);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getCashReceiptList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				//alert("report generated successfully");
				ajaxResponse = r;
				setResultCashRecipt(r);
			}
		});

	}
}
//Added By Badrinath Wagh
//For cash Paid List Report
function getReportForPharmacyCashPaidListNew() {
	var fromd = $("#popup_container2").val();
	var tod = $("#popup_container3").val();
	
	farr = fromd.split('/');
	tarr = tod.split('/');
	
	from = farr[2]+'-'+farr[1]+'-'+farr[0];
	to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('unitId=' + 1);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getCashPaidList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				alert("report generated successfully");
				ajaxResponse = r;
				setResultCashPaidReport(r);
			}
		});

	}
}

function setResultCashPaidReport(result) {
	
	var r = result;
	var divContent = "";
	total=0;
divContent = divContent
			+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
	for ( var i = 0; i < r.length; i++) 
	{
		
		divContent = divContent + 
					"<tr>" +
						"<td class='col-md-1'>" + r[i].debit_note_id + "</td>" +
						"<td class='col-md-1'>" + r[i].debit_note_date + "</td>"+ 
						"<td class='col-md-1'>"+ r[i].vendor_name + "</td>" +
						"<td class='col-md-1'>" + r[i].vendor_gstn + "</td>"+ 
						"<td class='col-md-1'>" +r[i].debit_note_narration + "</td>" +
						"<td class='col-md-1'>" + r[i].debit_note_net_amt + "</td>" +
					"</tr>";
		
	}
	$("#currentstockdetails").html(divContent);
	/*var splitResult = result.split('$');

	$('#template')
			.html(
					"<button onclick='getDeletedPurchaseReport()' class='btn btn-xs btn-success' type='button'>Get"
							+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/"
							+ splitResult[0]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/"
							+ splitResult[1]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "");*/

}
//Added By Badrinath Wagh
//For Cheque Paid List Report
function getReportForPharmacyChequePaidListNew() {
	var fromd = $("#popup_container2").val();
	var tod = $("#popup_container3").val();
	
	farr = fromd.split('/');
	tarr = tod.split('/');
	
	from = farr[2]+'-'+farr[1]+'-'+farr[0];
	to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('unitId=' + 1);
		
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getChequePaidList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				alert("report generated successfully");
				ajaxResponse = r;
				setResultChequePaidReport(r);
			}
		});

	}
}

function setResultChequePaidReport(result) {
	
	var r = result;
	var divContent = "";
	total=0;
divContent = divContent
			+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
	for ( var i = 0; i < r.length; i++) 
	{
		
		divContent = divContent + 
					"<tr>" +
						"<td class='col-md-1'>" + r[i].debit_note_id + "</td>" +
						"<td class='col-md-1'>" + r[i].debit_note_date + "</td>"+ 
						"<td class='col-md-1'>"+ r[i].vendor_name + "</td>" +
						"<td class='col-md-1'>" + r[i].vendor_gstn + "</td>"+ 
						"<td class='col-md-1'>" +r[i].debit_note_narration + "</td>" +
						"<td class='col-md-1'>" + r[i].debit_note_net_amt + "</td>" +
					"</tr>";
		
	}
	$("#currentstockdetails").html(divContent);
	/*var splitResult = result.split('$');

	$('#template')
			.html(
					"<button onclick='getDeletedPurchaseReport()' class='btn btn-xs btn-success' type='button'>Get"
							+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/"
							+ splitResult[0]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/"
							+ splitResult[1]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "");*/

}
function getReportDeletedChequePaidList() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getDeletedChequePaidList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				alert("report generated successfully");
				ajaxResponse = r;
				setViewBtns1(ajaxResponse);
			}
		});

	}
}

function getReportForPharmacyChequeReceiptListNew() {
	var fromd = $("#popup_container2").val();
	var tod = $("#popup_container3").val();
	
	farr = fromd.split('/');
	tarr = tod.split('/');
	
	from = farr[2]+'-'+farr[1]+'-'+farr[0];
	to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('unitId=' + 1);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getChequeReceiptList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
			//	alert("report generated successfully");
				ajaxResponse = r;
				setResultChequeReceiptList(r);
			}
		});

	}
}

function setResultChequeReceiptList(result) {
	
	var r = result;
	var divContent = "";
	total=0;
divContent = divContent
			+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
	for ( var i = 0; i < r.length; i++) 
	{
		
		divContent = divContent + 
					"<tr>" +
						"<td class='col-md-1'>" + r[i].cheque_receipt_cheque_no + "</td>" +
						"<td class='col-md-1'>" + r[i].vendor_name + "</td>"+ 
						"<td class='col-md-1'>"+ r[i].vendorBank + "</td>" +
						"<td class='col-md-1'>" + r[i].pharmacyBank + "</td>"+ 
						"<td class='col-md-1'>" +r[i].cheque_receipt_amt + "</td>" +
						"<td class='col-md-1'>" + r[i].cheque_receipt_made_by + "</td>" +
					"</tr>";
		
	}
	$("#currentstockdetails").html(divContent);
	/*var splitResult = result.split('$');

	$('#template')
			.html(
					"<button onclick='getDeletedPurchaseReport()' class='btn btn-xs btn-success' type='button'>Get"
							+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/"
							+ splitResult[0]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/"
							+ splitResult[1]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "");*/

}

function getReportDeletedChequeReceiptList() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getDeletedChequeReceiptList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				alert("report generated successfully");
				ajaxResponse = r;
				setViewBtns1(ajaxResponse);
			}
		});

	}
}

function getReportForPharmacyCreditNoteList() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getCreditNoteList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				alert("report generated successfully");
				ajaxResponse = r;
				setResult(r);
			}
		});

	}
}
//Added By Badrinath Wagh
//For Debit Note List Report
function getDebitNoteListData() {
	//var from = $("#popup_container2").val();
	//var to = $("#popup_container3").val();
	
	 var fdate = $("#popup_container2").val();
		var tdate = $("#popup_container3").val();
		
		farr = fdate.split('/');
		tarr = tdate.split('/');
		
		from = farr[2]+'-'+farr[1]+'-'+farr[0];
		to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];

	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		//alert("from... "+from)
	//	alert("to... "+to)
		
		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('unitId=' + 1);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/report/getDebitNoteList",
			/*timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},*/
			success : function(r) {
				//alert(r.length)
				//alert("report generated successfully");
				ajaxResponse = r;
				setResultDbNote(r);
				
			}
		});

	}
}
function setResultDbNote(result) {
	
	var r = result;
	var divContent = "";
	total=0;
divContent = divContent
			+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
	for ( var i = 0; i < r.length; i++) 
	{
		
		divContent = divContent + 
					"<tr>" +
						"<td class='col-md-1'>" + r[i].debit_note_id + "</td>" +
						"<td class='col-md-1'>" + r[i].debit_note_date + "</td>"+ 
						"<td class='col-md-1'>"+ r[i].vendor_name + "</td>" +
						"<td class='col-md-1'>" + r[i].vendor_gstn + "</td>"+ 
						"<td class='col-md-1'>" +r[i].debit_note_narration + "</td>" +
						"<td class='col-md-1'>" + r[i].debit_note_net_amt + "</td>" +
					"</tr>";
		
	}
	$("#currentstockdetails").html(divContent);
	/*var splitResult = result.split('$');

	$('#template')
			.html(
					"<button onclick='getDeletedPurchaseReport()' class='btn btn-xs btn-success' type='button'>Get"
							+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/"
							+ splitResult[0]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/"
							+ splitResult[1]
							+ "'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "");*/

}
function getReportForPharmacyDrugList() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		/* inputs.push('bedType=' + bedType); */
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "getDrugList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				alert("report generated successfully");
				ajaxResponse = r;
				setResult(r);
			}
		});

	}
}

function setViewBtns1(ajaxResponse) {

	alert("Report Generated Successfully");
	$('#template')
			.append(
					"&nbsp;&nbsp;<a href='sss' style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='eee' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");
	/*
	 * var i = ajaxResponse;
	 * 
	 * var z = []; z = i.split('"');
	 * 
	 * var t = z[1];
	 */

	var o = [];

	o = ajaxResponse.split('$');
	$("a[href='sss']").attr('href', '/EhatEnterprise/ehat_Reports' + o[0]);
	$("a[href='eee']").attr('href', '/EhatEnterprise/ehat_Reports' + o[1]);

}

/*
 * function setReceptionistHelpDeskReport() {
 * 
 * var userName=$("#userName").val(); userName=$.trim(userName);
 * $("#selReceptionName").val(userName); var docDetails =
 * $("#docDetails").html(); myArray = JSON.parse(docDetails); for ( var i = 0; i <
 * myArray.listDoctor.length; i++) { if (myArray.listDoctor[i].doc_name ==
 * userName) { myObj = myArray.listDoctor[i]; break; } } //myObj =
 * JSON.stringify(myObj); var Doc_ID=myObj.Doctor_ID; $("#userid").html(Doc_ID); }
 */

function addCommas(number) {
	var x = number;
	x = x.toString();
	var lastThree = x.substring(x.length - 3);
	var otherNumbers = x.substring(0, x.length - 3);
	if (otherNumbers != '')
		lastThree = ',' + lastThree;
	var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
	// alert(res);
	return res + ".00";
}

function getAllReportForCollectionSummary() {

	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();

	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getAllReportForCollectionSummary');
		inputs.push('from=' + popup_container3);
		inputs.push('to=' + popup_container2);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ReportServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						
					},
					success : function(r) {
						ajaxResponse = r;
						// alert(ajaxResponse);
						var myobj = eval('(' + ajaxResponse + ')');
						var total_opd_collection = addCommas(myobj.total_opd_collection);
						var cash_opd_collection = addCommas(myobj.cash_opd_collection);
						var cheque_card_opd_collection = addCommas(myobj.cheque_card_opd_collection);

						var total_ipd_collection = addCommas(myobj.total_ipd_collection);
						var cash_ipd_collection = addCommas(myobj.cash_ipd_collection);
						var cheque_card_ipd_collection = addCommas(myobj.cheque_card_ipd_collection);

						var total_ph_collection = addCommas(myobj.total_ph_collection);
						var cash_ph_collection = addCommas(myobj.cash_ph_collection);
						var cheque_card_ph_collection = addCommas(myobj.cheque_card_ph_collection);

						var total_diag_collection = addCommas(myobj.total_diag_collection);
						var cash_diag_collection = addCommas(myobj.cash_diag_collection);
						var cheque_card_diag_collection = addCommas(myobj.cheque_card_diag_collection);

						var cash_patient_credit_count = myobj.cash_patient_credit_count;
						var cash_patient_credit_amt = addCommas(myobj.cash_patient_credit_amt);
						var sponsored_patient_count = myobj.sponsored_patient_count;
						var sponsored_patient_amt = addCommas(myobj.sponsored_patient_amt);

						$("#total_opd_collection").html(total_opd_collection);
						$("#cash_opd_collection").html(cash_opd_collection);
						$("#cheque_card_opd_collection").html(
								cheque_card_opd_collection);

						$("#total_ipd_collection").html(total_ipd_collection);
						$("#cash_ipd_collection").html(cash_ipd_collection);
						$("#cheque_card_ipd_collection").html(
								cheque_card_ipd_collection);

						$("#total_ph_collection").html(total_ph_collection);
						$("#cash_ph_collection").html(cash_ph_collection);
						$("#cheque_card_ph_collection").html(
								cheque_card_ph_collection);

						$("#total_diag_collection").html(total_diag_collection);
						$("#cash_diag_collection").html(cash_diag_collection);
						$("#cheque_card_diag_collection").html(
								cheque_card_diag_collection);

						$("#cpcount").text(cash_patient_credit_count);
						$("#cpamount").html(cash_patient_credit_amt);
						$("#spcount").html(sponsored_patient_count);
						$("#spamount").html(sponsored_patient_amt);

					}
				});
	}

}

function getAllReportForPatientDetails() {
	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();

	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getAllReportForPatientDetails');
		inputs.push('from=' + popup_container3);
		inputs.push('to=' + popup_container2);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				var myobj = eval('(' + ajaxResponse + ')');

				$("#total_opd_patients").html(myobj.total_opd_patients);
				$("#cash_opd_patients").html(myobj.cash_opd_patients);
				$("#cheque_card_opd_patients").html(
						myobj.cheque_card_opd_patients);
				$("#credit_opd_patients").html(myobj.credit_opd_patients);

				$("#total_ipd_patients").html(myobj.total_ipd_patients);
				$("#cash_ipd_patients").html(myobj.cash_ipd_patients);
				$("#cheque_card_ipd_patients").html(
						myobj.cheque_card_ipd_patients);
				$("#credit_ipd_patients").html(myobj.credit_ipd_patients);

				$("#total_ph_patients").html(myobj.total_ph_patients);
				$("#cash_ph_patients").html(myobj.cash_ph_patients);
				$("#cheque_card_ph_patients").html(
						myobj.cheque_card_ph_patients);
				$("#credit_ph_patients").html(myobj.credit_ph_patients);

				$("#total_diag_patients").html(myobj.total_diag_patients);
				$("#cash_diag_patients").html(myobj.cash_diag_patients);
				$("#cheque_card_diag_patients").html(
						myobj.cheque_card_diag_patients);
				$("#credit_diag_patients").html(myobj.credit_diag_patients);

			}
		});
	}
}

function getAllReportForPatientDischargeSummary() {
	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();

	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getAllReportForPatientDischargeSummary');
		inputs.push('from=' + popup_container3);
		inputs.push('to=' + popup_container2);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				var myobj = eval('(' + ajaxResponse + ')');
				$("#discharge_coz_death").html(myobj.total_opd_patients);
				$("#discharge_coz_dama").html(myobj.total_ipd_patients);
				$("#discharge_coz_transfer").html(myobj.total_ph_patients);
				$("#discharge_coz_absconded").html(myobj.total_diag_patients);
				$("#totaldischargepatients").html(
						"Discharge(" + myobj.cash_opd_patients + ")");
			}
		});
	}
}

function getAllReportForDiagnosticSummary() {
	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();

	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getAllReportForDiagnosticSummary');
		inputs.push('from=' + popup_container3);
		inputs.push('to=' + popup_container2);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				var myobj = eval('(' + ajaxResponse + ')');
				$("#total_radio_patient").html(myobj.total_ipd_patients);
				$("#ipd_radio_patient").html(myobj.cash_ipd_patients);
				$("#opd_radio_patient").html(myobj.cash_opd_patients);
				$("#diag_radio_patient").html(myobj.cash_diag_patients);

				$("#total_patho_patient").html(myobj.total_opd_patients);
				$("#ipd_patho_patient").html(myobj.cheque_card_ipd_patients);
				$("#opd_patho_patient").html(myobj.cheque_card_opd_patients);
				$("#diag_patho_patient").html(myobj.cheque_card_diag_patients);

				$("#total_other_patient").html(myobj.total_diag_patients);
				$("#ipd_other_patient").html(myobj.credit_ipd_patients);
				$("#opd_other_patient").html(myobj.credit_opd_patients);
				$("#diag_other_patient").html(myobj.credit_diag_patients);

			}
		});
	}
}

function getAllReportForRefundSummary() {

	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();

	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getAllReportForRefundSummary');
		inputs.push('from=' + popup_container3);
		inputs.push('to=' + popup_container2);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ReportServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						
					},
					success : function(r) {
						ajaxResponse = r;
						// alert(ajaxResponse);
						var myobj = eval('(' + ajaxResponse + ')');
						var total_opd_collection = addCommas(myobj.total_opd_collection);
						var cash_opd_collection = addCommas(myobj.cash_opd_collection);
						var cheque_card_opd_collection = addCommas(myobj.cheque_card_opd_collection);

						var total_ipd_collection = addCommas(myobj.total_ipd_collection);
						var cash_ipd_collection = addCommas(myobj.cash_ipd_collection);
						var cheque_card_ipd_collection = addCommas(myobj.cheque_card_ipd_collection);

						var total_ph_collection = addCommas(myobj.total_ph_collection);
						var cash_ph_collection = addCommas(myobj.cash_ph_collection);
						var cheque_card_ph_collection = addCommas(myobj.cheque_card_ph_collection);

						var total_diag_collection = addCommas(myobj.total_diag_collection);
						var cash_diag_collection = addCommas(myobj.cash_diag_collection);
						var cheque_card_diag_collection = addCommas(myobj.cheque_card_diag_collection);

						var cash_patient_credit_count = myobj.cash_patient_credit_count;
						var cash_patient_credit_amt = addCommas(myobj.cash_patient_credit_amt);
						var sponsored_patient_count = myobj.sponsored_patient_count;
						var sponsored_patient_amt = addCommas(myobj.sponsored_patient_amt);

						$("#total_opd_refund_amt").html(total_opd_collection);
						$("#cash_opd_refund_amt").html(cash_opd_collection);
						$("#card_opd_refund_amt").html(
								cheque_card_opd_collection);

						$("#total_ipd_refund_amt").html(total_ipd_collection);
						$("#cash_ipd_refund_amt").html(cash_ipd_collection);
						$("#card_ipd_refund_amt").html(
								cheque_card_ipd_collection);

						$("#total_ph_refund_amt").html(total_ph_collection);
						$("#cash_ph_refund_amt").html(cash_ph_collection);
						$("#card_ph_refund_amt")
								.html(cheque_card_ph_collection);

						$("#total_diag_refund_amt").html(total_diag_collection);
						$("#cash_diag_refund_amt").html(cash_diag_collection);
						$("#card_diag_refund_amt").html(
								cheque_card_diag_collection);

					}
				});
	}
}

function getReportForTotalDischargePatient(reportType) {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForTotalDischargePatient');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('reportType=' + reportType);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function FetchAdmissionCount() {
	var today_Date = $("#admsnCount").val();
	var inputs = [];
	inputs.push('action=FetchAdmissionCount');
	inputs.push('today_Date=' + today_Date);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var b = r.replace(/"/g, "");
			var z = [];
			z = b.split('-');

			var t = z[0];
			var u = z[1];
			var v = z[2];

			$("#admisnCount").text(t);
			$("#cashCount").text(u);
			$("#SponsoredCount").text(v);
		}
	});
}

function FetchAdmissionPercentageCount() {
	var today_Date = $("#admsnCount").val();
	var yesterDay_date = $("#admsnCount1").val();
	var dayBeforeYesterday = $("#admsnCount2").val();
	var inputs = [];
	inputs.push('action=FetchAdmissionPercentageCount');
	inputs.push('today_Date=' + today_Date);
	inputs.push('yesterDay_date=' + yesterDay_date);
	inputs.push('dayBeforeYesterday=' + dayBeforeYesterday);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var b = r.replace(/"/g, "");
			z = b.split('-');
			var t = z[0];
			var u = z[1];
			var v = z[2];
			var w = z[3];

			$("#cashCountPercentage").text(t + '%');
			$("#sponsCountPercentage").text(v + '%');

			if (u == 'strCashHigherY') {
				$("#arrowCash").addClass('fa fa-arrow-down');
			} else if (u == 'strCashHigherT') {
				$("#arrowCash").addClass('fa fa-arrow-up');
			} else if (u == 'strCashEqualCount') {
				$("#arrowCash").removeClass('fa fa-arrow-up');
			} else if (u == 'strCashCountY&TEqualToZero') {
				$("#arrowCash").removeClass('fa fa-arrow-up');
			} else if (u == 'strCashYEqualToZero') {
				$("#arrowCash").addClass('fa fa-arrow-up');

			}
			if (w == 'strSponsHigherY') {
				$("#arrowSpons").addClass('fa fa-arrow-down');

			} else if (w == 'strSponsHigherT') {
				$("#arrowSpons").addClass('fa fa-arrow-up');

			} else if (w == 'strSponsEqualCount') {
				$("#arrowSpons").removeClass('fa fa-arrow-up');

			} else if (w == 'strSponsCountY&TEqualToZero') {
				$("#arrowSpons").removeClass('fa fa-arrow-up');

			} else if (w == 'strSponsYEqualToZero') {
				$("#arrowSpons").addClass('fa fa-arrow-up');
			}
		}
	});
}

function totaldueReportPDF() {

	var date = ($("#totaldueDATE").val()).trim();
	var toDate = ($("#hiddenDATE").val()).trim();

	if (date == "") {
		alert("Please enter to date.");
		return false;
	}
	if (date > toDate) {
		alert("To date should not be greater than today's date");
		return false;
	}

	var reportType = ($('input:radio[name=RadioGroupPatient_2]:checked').val());
	// alert(reportType);
	if (reportType == "" || undefined == reportType || null == reportType) {
		alert("Please Select Report Type...");
	} else {

		if (reportType == "TOTALDUE") {
			// alert("123");
			window.open("overall_dues_report.jsp?date=" + date);
		}
	}
}

function hideButton() {
	$("#pdfbutton").html("&nbsp;");
}

function generateOnlyPDF() {

	var fromDate = ($("#popup_container3").val()).trim();
	var toDate = ($("#popup_container2").val()).trim();

	if (fromDate == "") {
		alert("Please enter from date.");
		return false;
	}

	if (toDate == "") {
		alert("Please enter to date.");
		return false;
	}

	var frommonthfield = fromDate.split("/")[1];
	var fromdayfield = fromDate.split("/")[0];
	var fromyearfield = fromDate.split("/")[2];

	var tomonthfield = toDate.split("/")[1];
	var todayfield = toDate.split("/")[0];
	var toyearfield = toDate.split("/")[2];

	var fromDateValidate = new Date(fromyearfield, frommonthfield - 1,
			fromdayfield);
	var toDateValidate = new Date(toyearfield, tomonthfield - 1, todayfield);

	if (fromDateValidate > toDateValidate) {
		alert("from date should be less than to date");
		$("#popup_container3").val("");
		$("#popup_container2").val("");
		return false;
	}

	var reportType = ($('input:radio[name=radioButton]:checked').val());
	if (reportType == "" || undefined == reportType || null == reportType) {
		alert("Please Select Report Type...");
	} else {

		if (reportType == "TOTAL_COLLECTION") {
			window.open("collection_report.jsp?fromDMY=" + fromDate + "&toDMY="
					+ toDate);
		} else if (reportType == "TOTAL_COLLECTION_WITHOUT_PHARMACY") {

			window.open("collection_report_without_pharmacy.jsp?fromDMY="
					+ fromDate + "&toDMY=" + toDate);
		} else if (reportType == "RTGS_COLLECTION_FOR_IPD") {
			setPdfButtonTemp();
			getReportForIPDPatientRTGSCollection();
		}
	}
}

function getReportForIPDPatientRTGSCollection() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForIPDPatientRTGSCollection');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);

			}
		});
	}
}

/** auto suggestion code UOM * PARAMETERS******husenbadsha* */
function getDoctorNames(inputId, type) {
	var resultData = [];
	$("#DoctorId").val("");
	var txtVal = $('#' + inputId).val();
	// alert(txtVal);

	if ((type == "onload") || (txtVal != null && txtVal != "")) {
		var inputs = [];
		inputs.push('action=FetchDoctorForReport');
		inputs.push('txtVal=' + txtVal);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "DoctorServlet",
			timeout : 1000 * 60 * 15,
			cache : true,
			error : function() {
				
			},
			success : function(r) {
				// alert(r);
				if (r.length == 20) {
					alert("NO MATCHING FOUND");

				} else {
					ajaxResponse = r;
					bean = eval('(' + ajaxResponse + ')');

					var template = "";
					for ( var j = 0; j < bean.dl.length; j++) {
						resultData.push({
							ID : bean.dl[j].di,
							Name : bean.dl[j].dn

						});

						template = template + '<li data-value="'
								+ (bean.dl[j].di) + '" class=""><a href="#">'
								+ bean.dl[j].dn + '</a></li>';

					}

					setTimeout(function() {

						$("#div" + inputId + " .typeahead").html(template);
						if (type != 'onload') {
							$("#div" + inputId + " .typeahead").show();
						}

						$("#" + inputId).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputId).data('typeahead').source = resultData;
					}, 500);
				}
			}
		});

		function displayResult(item) {
			var doc_Id = item.value;
			$("#DoctorId").val(doc_Id);
			$("#" + inputId).val((item.text).trim());
		}
	}
}

function getTotalRadiationPatientReport() {

	var fromDate = ($("#popup_container3").val()).trim();
	var toDate = ($("#popup_container2").val()).trim();
	var doctorId = $("#DoctorId").val();
	if (fromDate == "") {
		alert("Please enter from date.");
		return false;
	}

	if (toDate == "") {
		alert("Please enter to date.");
		return false;
	}

	var frommonthfield = fromDate.split("/")[1];
	var fromdayfield = fromDate.split("/")[0];
	var fromyearfield = fromDate.split("/")[2];

	var tomonthfield = toDate.split("/")[1];
	var todayfield = toDate.split("/")[0];
	var toyearfield = toDate.split("/")[2];

	var fromDateValidate = new Date(fromyearfield, frommonthfield - 1,
			fromdayfield);
	var toDateValidate = new Date(toyearfield, tomonthfield - 1, todayfield);

	if (fromDateValidate > toDateValidate) {
		alert("from date should be less than to date");
		$("#popup_container3").val("");
		$("#popup_container2").val("");
		return false;
	}

	var reportType = ($('input:radio[name=RadioGroupPatient_2]:checked').val());
	if (reportType == "" || undefined == reportType || null == reportType) {
		alert("Please Select Report Type...");
	} else {

		if (reportType == "totalradiationpatient") {
			window.open("radiation_report.jsp?fromDMY=" + fromDate + "&toDMY="
					+ toDate);
		}

	}
}

function getCashReport() {

	var fromDate = ($("#popup_container3").val()).trim();
	var toDate = ($("#popup_container2").val()).trim();
	var doctorId = $("#DoctorId").val();
	if (fromDate == "") {
		alert("Please enter from date.");
		return false;
	}

	if (toDate == "") {
		alert("Please enter to date.");
		return false;
	}

	var frommonthfield = fromDate.split("/")[1];
	var fromdayfield = fromDate.split("/")[0];
	var fromyearfield = fromDate.split("/")[2];

	var tomonthfield = toDate.split("/")[1];
	var todayfield = toDate.split("/")[0];
	var toyearfield = toDate.split("/")[2];

	var fromDateValidate = new Date(fromyearfield, frommonthfield - 1,
			fromdayfield);
	var toDateValidate = new Date(toyearfield, tomonthfield - 1, todayfield);

	if (fromDateValidate > toDateValidate) {
		alert("from date should be less than to date");
		$("#popup_container3").val("");
		$("#popup_container2").val("");
		return false;
	}

	var reportType = ($('input:radio[name=radioButton]:checked').val());
	if (reportType == "" || undefined == reportType || null == reportType) {
		alert("Please Select Report Type...");
	} else {

		if (reportType == "BUSINESS_REPORT") {
			window.open("daily_business_report.jsp?fromDMY=" + fromDate
					+ "&toDMY=" + toDate);
		} else if (reportType == "DAILY_CASH_REPORT") {
			window.open("daily_cash_collection_report.jsp?fromDMY=" + fromDate
					+ "&toDMY=" + toDate);
		}

	}
}

function getCurrentIpdPatient() {

	var reportType = ($('input:radio[name=RadioGroupPatient_2]:checked').val());
	// alert(reportType);
	if (reportType == "" || undefined == reportType || null == reportType) {
		alert("Please Select Report Type...");
	} else {

		if (reportType == "ipdactive") {
			// alert("123");
			window.open("current_admitted_patient_report.jsp?");
		}

	}

}

function getschedulerReport() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getschedulerReport');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

// Amrut Patil for Service Report( Date: 31-Aug-2016 )
// ....Start
var getRepBtnTemplate = "<input onclick=getServicesReport('excel') style=''	type='button' value='Get Report' class='btn btn-xs btn-success' />";

var PdfExcelButton ="&nbsp;&nbsp;<input	type='button' value='View PDF' class='btn btn-xs btn-warning' onclick=getServicesReport('pdf') /></a>&nbsp;<a href='excel' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	type='button' value='View Excel' class='btn btn-xs btn-warning' /></a>";
function getReportButton() {
	var sampleReport;
	$("#getReportButton").setTemplate(getRepBtnTemplate);
	$("#getReportButton").processTemplate(sampleReport);
}
function setPdfExcelButton(){
	var sample;
	$("#pdfbutton").setTemplate(PdfExcelButton);
	$("#pdfbutton").processTemplate(sample);
	
}

var tempReport;
function setServicesReport() {
	getReportButton();
	$("#popup_container2").show();
	$("#popup_container3").show();
	// $("#from").html("From :");
	$("#from").show();
	$("#to").show();
}

function getServicesReport(callTo) {
	var objOpdBillParticular = {
		liOpd : []
	};
	var investigationHiddenID;
	var physiotherapyHiddenID;
	var pathologyHiddenID;
	var otherServicesHiddenID;
	var casualityHiddenID;
	var ipdConsumableHiddenID;
	var gasesAndMonitorsHiddenID;
	var bedSideHiddenID;
	var instrumntHiddenID;
	var SelectTestGrupID = 0;

	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();
	
	var frommonthfield = fromDate.split("/")[1];
	var fromdayfield = fromDate.split("/")[0];
	var fromyearfield = fromDate.split("/")[2];

	var tomonthfield = toDate.split("/")[1];
	var todayfield = toDate.split("/")[0];
	var toyearfield = toDate.split("/")[2];

	var fromDateValidate = new Date(fromyearfield, frommonthfield - 1,
			fromdayfield);
	var toDateValidate = new Date(toyearfield, tomonthfield - 1, todayfield);

	if (fromDateValidate > toDateValidate) {
		alert("from date should be less than to date");
		$("#popup_container3").val("");
		$("#popup_container2").val("");
		return false;
	}
	
	 SelectTestGrupID = $("#IdForSelectTestGrupOfCostEst").val();
	if(SelectTestGrupID == "select"){
		SelectTestGrupID = 0;
	}
	var serviceReportType = $("input:radio[name='serviceReportType']:checked")
			.val();
	var serviceReportTypeForMultiple = $(
			"input:radio[name='serviceReportTypeForMultiple']:checked").val();

	var selectedServiceCheckboxGroup = new Array();
	$("input[name='checkBoxNameForServiceReport']:checked").each(function() {
		selectedServiceCheckboxGroup.push($(this).val());
	});

	investigationHiddenID = $('#investigationHiddenID').val();
	physiotherapyHiddenID = $('#physiotherapyHiddenID').val();
	pathologyHiddenID = $('#pathologyHiddenID').val();
	pathologyHiddenIDForTestType = $('#pathologyHiddenIDForTestType').val();
	otherServicesHiddenID = $('#otherServicesHiddenID').val();
	casualityHiddenID = $('#casualityHiddenID').val();
	ipdConsumableHiddenID = $('#ipdConsumableHiddenID').val();
	gasesAndMonitorsHiddenID = $('#gasesAndMonitorsHiddenID').val();
	bedSideHiddenID = $('#bedSideHiddenID').val();
	instrumntHiddenID = $('#instrumntHiddenID').val();

	if ($('#multiple').is(':unchecked')) {
		if (selectedServiceCheckboxGroup.length >= 1) {

			for ( var k = 0; k < selectedServiceCheckboxGroup.length; k++) {

				if (selectedServiceCheckboxGroup[k] == "registrationValue") {
					if (serviceReportType == "diagnosis"
							|| serviceReportTypeForMultiple == "changeRadioButton") {
						alert("Registration Report Is Not Available In This Option,So Please Select Other Service Report Type");
						return false;
					}
					objOpdBillParticular.liOpd.push({
						"id_opd_bill" : 0,
						"test_name" : "registrationValue"
					});
				} else if (selectedServiceCheckboxGroup[k] == "investigationValue") {
					objOpdBillParticular.liOpd.push({
						"id_opd_bill" : investigationHiddenID,
						"test_name" : "investigationValue"
					});
				} else if (selectedServiceCheckboxGroup[k] == "physiotherapyValue") {
					objOpdBillParticular.liOpd.push({
						"id_opd_bill" : physiotherapyHiddenID,
						"test_name" : "physiotherapyValue"
					});
				} else if (selectedServiceCheckboxGroup[k] == "pathologyValue") {
					objOpdBillParticular.liOpd.push({
						"id_opd_bill" : pathologyHiddenID,
						"test_name" : "pathologyValue",
						"test_type" : pathologyHiddenIDForTestType
					});
				} else if (selectedServiceCheckboxGroup[k] == "OtherServicesValue") {
					objOpdBillParticular.liOpd.push({
						"id_opd_bill" : otherServicesHiddenID,
						"test_name" : "OtherServicesValue"
					});
				} else if (selectedServiceCheckboxGroup[k] == "causalityValue") {
					if (serviceReportType == "ipd") {
						alert("Causality Services Report Is Not Available In The IPD,So Please Select Other Service Report Type");
						return false;
					}
					if (serviceReportType == "diagnosis") {
						alert("Causality Services Report Is Not Available In The Diagnosis,So Please Select Other Service Report Type");
						return false;
					}
					objOpdBillParticular.liOpd.push({
						"id_opd_bill" : casualityHiddenID,
						"test_name" : "causalityValue"
					});
				} else if (selectedServiceCheckboxGroup[k] == "consumablesValue") {
					if (serviceReportType == "diagnosis") {
						alert("Consumables Services Report Is Not Available In The Diagnosis,So Please Select Other Service Report Type");
						return false;
					}
					objOpdBillParticular.liOpd.push({
						"id_opd_bill" : ipdConsumableHiddenID,
						"test_name" : "consumablesValue"
					});
				} else if (selectedServiceCheckboxGroup[k] == "gasesAndMonitorsValue") {
					if (serviceReportType == "opd") {
						alert("Gases and Monitors Services Report Is Not Available In The OPD,So Please Select Other Service Report Type");
						return false;
					}
					if (serviceReportType == "diagnosis") {
						alert("Gases and Monitors Services Report Is Not Available In The Diagnosis,So Please Select Other Service Report Type");
						return false;
					}
					objOpdBillParticular.liOpd.push({
						"id_opd_bill" : gasesAndMonitorsHiddenID,
						"test_name" : "gasesAndMonitorsValue"
					});
				} else if (selectedServiceCheckboxGroup[k] == "bedSideProValue") {
					if (serviceReportType == "opd") {
						alert("Bed Side Procedures Services Report Is Not Available In The OPD,So Please Select Other Service Report Type");
						return false;
					}
					if (serviceReportType == "diagnosis") {
						alert("Bed Side Procedures Services Report Is Not Available In The Diagnosis,So Please Select Other Service Report Type");
						return false;
					}
					objOpdBillParticular.liOpd.push({
						"id_opd_bill" : bedSideHiddenID,
						"test_name" : "bedSideProValue"
					});
				} else if (selectedServiceCheckboxGroup[k] == "instrumntValue") {
					if (serviceReportType == "opd") {
						alert("Instruments and Equipments Services Report Is Not Available In The OPD,So please select Other Service Report Type");
						return false;
					}
					if (serviceReportType == "diagnosis") {
						alert("Instruments and Equipments Services Report Is Not Available In The Diagnosis,So Please Select Other Service Report Type");
						return false;
					}
					objOpdBillParticular.liOpd.push({
						"id_opd_bill" : instrumntHiddenID,
						"test_name" : "instrumntValue"
					});
				}
			}

			if (serviceReportType != "opd" && serviceReportType != "ipd"
					&& serviceReportType != "diagnosis"
					&& serviceReportType != "all"
					&& serviceReportTypeForMultiple != "changeRadioButton") {
				alert("Please Select Which Services Report Do You Want");
				return false;
			} else if (serviceReportType == "all") {
				objOpdBillParticular = JSON.stringify(objOpdBillParticular);
		
				if(callTo == "pdf")
					{
				window.open("ServicesReportForAll.jsp?fromDate=" + fromDate
						+ "&toDate=" + toDate + "&SelectTestGrupID=" + SelectTestGrupID + "&all=" + all
						+ "&objOpdBillParticular="
						+ encodeURIComponent(objOpdBillParticular));
					}else {
						
						var inputs = [];
						inputs.push('action=getServiceReportExcelForAll');
						inputs.push('from=' + fromDate);
						inputs.push('to=' + toDate);
						inputs.push('testGrupID=' + SelectTestGrupID);
						inputs.push('serviceReportType=' + serviceReportType);
						inputs.push('objOpdBillParticular=' + encodeURIComponent(objOpdBillParticular));
						var str = inputs.join('&');
						jQuery.ajax({
							async : true,
							type : "POST",
							data : str + "&reqType=AJAX",
							url : "ReportServlet",
							timeout : 1000 * 60 * 5,
							catche : false,
							error : function() {
								alert("error");
							},
							success : function(r) {
								ajaxResponse = r;
								setPdfExcelButton();
								setViewExcelBtn(ajaxResponse);
							}
						});
						
					}
			} else {
				objOpdBillParticular = JSON.stringify(objOpdBillParticular);
				if(callTo == "pdf")
				{
				window.open("ReportForServices.jsp?fromDate=" + fromDate
						+ "&toDate=" + toDate + "&SelectTestGrupID=" + SelectTestGrupID + "&serviceReportType="
						+ serviceReportType + "&objOpdBillParticular="
						+ encodeURIComponent(objOpdBillParticular));
				}else{
					
					var inputs = [];
					inputs.push('action=getServiceReportExcel');
					inputs.push('from=' + fromDate);
					inputs.push('to=' + toDate);
					inputs.push('serviceReportType=' + serviceReportType);
					inputs.push('testGrupID=' + SelectTestGrupID);
					inputs.push('objOpdBillParticular=' + encodeURIComponent(objOpdBillParticular));
					var str = inputs.join('&');
					jQuery.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "ReportServlet",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							alert("error");
						},
						success : function(r) {
							ajaxResponse = r;
							setPdfExcelButton();
							setViewExcelBtn(ajaxResponse);
						}
					});
					
					
				}
			}
		} else {
			alert("Please Select Which Services Report Do You Want");
			return false;
		}
	}
	
	if ($('#multiple').is(':checked')) {
		var invName = $("#investigationTextID").val();
		if (invName != "") {
			alert("Please Firstly Add The Investigation Test");
			return false;
		}
		var phyName = $("#physiotherapyTextID").val();
		if (phyName != "") {
			alert("Please Firstly Add The Physiotherapy Test");
			return false;
		}
		var pathoName = $("#pathologyTextID").val();
		if (pathoName != "") {
			alert("Please Firstly Add The Pathology Test");
			return false;
		}
		var othrSerName = $("#otherServicesTextID").val();
		if (othrSerName != "") {
			alert("Please Firstly Add The Other Services Test");
			return false;
		}
		var casualityName = $("#casualityTextID").val();
		if (casualityName != "") {
			alert("Please Firstly Add The Casuality Test");
			return false;
		}
		var ConsumableName = $("#ipdConsumableTextID").val();
		if (ConsumableName != "") {
			alert("Please Firstly Add The Consumable Services");
			return false;
		}
		var gAndMName = $("#gasesAndMonitorsTextID").val();
		if (gAndMName != "") {
			alert("Please Firstly Add The Gases And Monitors Services");
			return false;
		}
		var bedSideName = $("#bedSideTextID").val();
		if (bedSideName != "") {
			alert("Please Firstly Add The Bed Side Services");
			return false;
		}
		var instrName = $("#instrumntTextID").val();
		if (instrName != "") {
			alert("Please Firstly Add The Instrument Services");
			return false;
		}

		var textName = "";
		$('#multipleTestSelectBox').find('option').each(function() {
			textName = textName + $(this).val();
		});
		if(textName == ""){
			alert("Please ,Add The Test First");
			return false ;
		}
		var textArr = [];
		textArr = textName.split("\n");
		for ( var i = 0; i < textArr.length; i++) {
			var arr = textArr[i].split("_");
			if (textArr[i] != "") {
				objOpdBillParticular.liOpd.push({
					"id_opd_bill" : arr[0],
					"test_name" : arr[1],
					"test_type" : arr[2]
				});
			}
		}

		if (serviceReportType != "opd" && serviceReportType != "ipd"
				&& serviceReportType != "diagnosis") {
			serviceReportType = "all";
		}
		objOpdBillParticular = JSON.stringify(objOpdBillParticular);
		
		if(callTo == "pdf")
			{
		window.open("ServicesReportForMultiple.jsp?fromDate=" + fromDate
				+ "&toDate=" + toDate + "&serviceReportType="
				+ serviceReportType + "&objOpdBillParticular="
				+ encodeURIComponent(objOpdBillParticular));
			}else{
				var inputs = [];
				inputs.push('action=getServiceReportExcelForMult');
				inputs.push('from=' + fromDate);
				inputs.push('to=' + toDate);
				inputs.push('serviceReportType=' + serviceReportType);
				inputs.push('objOpdBillParticular=' + encodeURIComponent(objOpdBillParticular));
				var str = inputs.join('&');
				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ReportServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						ajaxResponse = r;
						setPdfExcelButton();
						setViewExcelBtn(ajaxResponse);
					}
				});
			}
	}

}

function showDivOfInvestTest() {
	$("#investigationHiddenID").val(0);
	var $checkBoxInvestId = $('input:checkbox[id=checkBoxInvestId]');
	if ($checkBoxInvestId.is(':checked') == true) {
		$("#investigationTextID").show('show');
		$("#IdForSelectTestGrupOfCostEst").show('show');
		if ($('#multiple').is(':checked')) {
			$("#invPlusImg").show('show');
		}
	} else {
		$("#investigationTextID").val("");
		$("#investigationTextID").hide();
		$("#invPlusImg").hide();
		$("#IdForSelectTestGrupOfCostEst").hide();
	}
	//showTestByAutosuggestion('investigation', 'onload');
}

function showDivOfPhysioTest() {
	$("#physiotherapyHiddenID").val(0);
	var $checkBoxPhysiotherapyId = $('input:checkbox[id=checkBoxPhysiotherapyId]');
	if ($checkBoxPhysiotherapyId.is(':checked') == true) {
		$("#physiotherapyTextID").show('show');
		if ($('#multiple').is(':checked')) {
			$("#phyPlusImg").show('show');
		}
	} else {
		$("#physiotherapyTextID").val("");
		$("#physiotherapyTextID").hide();
		$("#phyPlusImg").hide();
	}
	showTestByAutosuggestion('physiotherapy', 'onload');
}

function showDivOfPathoTest() {
	$("#pathologyHiddenID").val(0);
	var $checkBoxPathologyId = $('input:checkbox[id=checkBoxPathologyId]');
	if ($checkBoxPathologyId.is(':checked') == true) {
		$("#pathologyTextID").show('show');
		if ($('#multiple').is(':checked')) {
			$("#pathPlusImg").show('show');
		}
	} else {
		$("#pathologyTextID").val("");
		$("#pathologyTextID").hide();
		$("#pathPlusImg").hide();
	}
	showTestByAutosuggestion('pathology', 'onload');
}

function showDivOfOtherServicesTest() {
	$("#otherServicesHiddenID").val(0);
	var $checkBoxOtherServicesId = $('input:checkbox[id=checkBoxOtherServicesId]');
	if ($checkBoxOtherServicesId.is(':checked') == true) {
		$("#otherServicesTextID").show('show');
		if ($('#multiple').is(':checked')) {
			$("#othrPlusImg").show('show');
		}
	} else {
		$("#otherServicesTextID").val("");
		$("#otherServicesTextID").hide();
		$("#othrPlusImg").hide();
	}
	showTestByAutosuggestion('otherServices', 'onload');
}

function showDivOfCausalityTest() {
	$("#casualityHiddenID").val(0);
	var $checkBoxCausalityId = $('input:checkbox[id=checkBoxCausalityId]');
	if ($checkBoxCausalityId.is(':checked') == true) {
		$("#casualityTextID").show('show');
		if ($('#multiple').is(':checked')) {
			$("#causPlusImg").show('show');
		}
	} else {
		$("#casualityTextID").val("");
		$("#casualityTextID").hide();
		$("#causPlusImg").hide();
	}
	showTestByAutosuggestion('causality', 'onload');
}

function showDivOfIpdConsumable() {
	$("#ipdConsumableHiddenID").val(0);
	var $checkBoxIpdConsumableId = $('input:checkbox[id=checkBoxIpdConsumableId]');
	if ($checkBoxIpdConsumableId.is(':checked') == true) {
		$("#ipdConsumableTextID").show('show');
		if ($('#multiple').is(':checked')) {
			$("#consumPlusImg").show('show');
		}
	} else {
		$("#ipdConsumableTextID").val("");
		$("#ipdConsumableTextID").hide();
		$("#consumPlusImg").hide();
	}
	showTestByAutosuggestion('consumables', 'onload');
}

function showDivOfGasesAndMonitors() {
	$("#gasesAndMonitorsHiddenID").val(0);
	var $checkBoxGasesAndMonitorsId = $('input:checkbox[id=checkBoxGasesAndMonitorsId]');
	if ($checkBoxGasesAndMonitorsId.is(':checked') == true) {
		$("#gasesAndMonitorsTextID").show('show');
		if ($('#multiple').is(':checked')) {
			$("#gasPlusImg").show('show');
		}
	} else {
		$("#gasesAndMonitorsTextID").val("");
		$("#gasesAndMonitorsTextID").hide();
		$("#gasPlusImg").hide();
	}
	showTestByAutosuggestion('gasesAndMonitors', 'onload');
}

function showDivOfBedSide() {
	$("#bedSideHiddenID").val(0);
	var $checkBoxBedSideId = $('input:checkbox[id=checkBoxBedSideId]');
	if ($checkBoxBedSideId.is(':checked') == true) {
		$("#bedSideTextID").show('show');
		if ($('#multiple').is(':checked')) {
			$("#bedPlusImg").show('show');
		}
	} else {
		$("#bedSideTextID").val("");
		$("#bedSideTextID").hide();
		$("#bedPlusImg").hide();
	}
	showTestByAutosuggestion('bedSide', 'onload');
}

function showDivOfInstrument() {
	$("#instrumntHiddenID").val(0);
	var $checkBoxInstrumentId = $('input:checkbox[id=checkBoxInstrumentId]');
	if ($checkBoxInstrumentId.is(':checked') == true) {
		$("#instrumntTextID").show('show');
		if ($('#multiple').is(':checked')) {
			$("#instruPlusImg").show('show');
		}
	} else {
		$("#instrumntTextID").val("");
		$("#instrumntTextID").hide();
		$("#instruPlusImg").hide();
	}
	showTestByAutosuggestion('instrumnt', 'onload');
}

function showTestByAutosuggestion(type, callfrom) {
	var SelectTestGrupID = $("#IdForSelectTestGrupOfCostEst").val();
	if(SelectTestGrupID == "select"){
		SelectTestGrupID = 0;
	}
	var resultData = [];
	var autoTextLetter;
	var inputId = "";
	if (type == "investigation") {
		autoTextLetter = $("#investigationTextID").val();
		inputId = 'investigationTextID';
	} else if (type == "physiotherapy") {
		autoTextLetter = $("#physiotherapyTextID").val();
		inputId = 'physiotherapyTextID';
	} else if (type == "pathology") {
		autoTextLetter = $("#pathologyTextID").val();
		inputId = 'pathologyTextID';
	} else if (type == "otherServices") {
		autoTextLetter = $("#otherServicesTextID").val();
		inputId = 'otherServicesTextID';
	} else if (type == "causality") {
		autoTextLetter = $("#casualityTextID").val();
		inputId = 'casualityTextID';
	} else if (type == "consumables") {
		autoTextLetter = $("#ipdConsumableTextID").val();
		inputId = 'ipdConsumableTextID';
	} else if (type == "gasesAndMonitors") {
		autoTextLetter = $("#gasesAndMonitorsTextID").val();
		inputId = 'gasesAndMonitorsTextID';
	} else if (type == "bedSide") {
		autoTextLetter = $("#bedSideTextID").val();
		inputId = 'bedSideTextID';
	} else if (type == "instrumnt") {
		autoTextLetter = $("#instrumntTextID").val();
		inputId = 'instrumntTextID';
	}
	var auto = 'servicesReport';
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('letter=' + autoTextLetter);
	inputs.push('SelectTestGrupID=' + SelectTestGrupID);
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					var availableTags = [];
					var template = "";
					var idValue;
					availableTags = ajaxResponse.split("\n");
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						if (type == "pathology") {
							idValue = arrValue[1] + "@#@" + arrValue[2];
						} else {
							idValue = arrValue[1];
						}

						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + (idValue)
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					setTimeout(function() {
						$("#div" + inputId + " .typeahead").html(template);
						if (callfrom != "onload") {
							$("#div" + inputId + " .typeahead").show();
						}

						$('#' + inputId).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputId).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		if (type == "investigation") {
			$('#investigationHiddenID').val(item.value);
		} else if (type == "physiotherapy") {
			$('#physiotherapyHiddenID').val(item.value);
		} else if (type == "pathology") {
			var arrValue = (item.value).split("@#@");
			$('#pathologyHiddenID').val(arrValue[0]);
			$('#pathologyHiddenIDForTestType').val(arrValue[1]);
		} else if (type == "otherServices") {
			$('#otherServicesHiddenID').val(item.value);
		} else if (type == "causality") {
			$('#casualityHiddenID').val(item.value);
		} else if (type == "consumables") {
			$('#ipdConsumableHiddenID').val(item.value);
		} else if (type == "gasesAndMonitors") {
			$('#gasesAndMonitorsHiddenID').val(item.value);
		} else if (type == "bedSide") {
			$('#bedSideHiddenID').val(item.value);
		} else if (type == "instrumnt") {
			$('#instrumntHiddenID').val(item.value);
		}
		$("#" + inputId).val((item.text).trim());
	}
}

function multipleSelectingTest() {
	var multipleRadioButtonValue = $("#multiple").val();
	if ($("#multiple").prop("checked")) {
		$("#multiple").val("changeRadioButton");
		$("#minusID").show('show');
		$('#multipleTestSelectBox').find('option').remove().end();
		$("#multipleTestSelectBox").show('show');
		$('input:checkbox[name=checkBoxNameForServiceReport]').attr('checked',
				false);

		$("#invPlusImg").show('show');
		$("#invMinusImg").show('show');
		$("#phyPlusImg").show('show');
		$("#phyMinusImg").show('show');
		$("#pathPlusImg").show('show');
		$("#pathMinusImg").show('show');
		$("#othrPlusImg").show('show');
		$("#othrMinusImg").show('show');
		$("#causPlusImg").show('show');
		$("#causMinusImg").show('show');
		$("#consumPlusImg").show('show');
		$("#consumMinusImg").show('show');
		$("#gasPlusImg").show('show');
		$("#gasMinusImg").show('show');
		$("#bedPlusImg").show('show');
		$("#bedMinusImg").show('show');
		$("#instruPlusImg").show('show');
		$("#instruMinusImg").show('show');

		$("#investigationTextID").show('show');
		$("#physiotherapyTextID").show('show');
		$("#pathologyTextID").show('show');
		$("#otherServicesTextID").show('show');
		$("#casualityTextID").show('show');
		$("#ipdConsumableTextID").show('show');
		$("#gasesAndMonitorsTextID").show('show');
		$("#bedSideTextID").show('show');
		$("#instrumntTextID").show('show');

		$("#investigationTextID").val("");
		$("#physiotherapyTextID").val("");
		$("#pathologyTextID").val("");
		$("#otherServicesTextID").val("");
		$("#casualityTextID").val("");
		$("#ipdConsumableTextID").val("");
		$("#gasesAndMonitorsTextID").val("");
		$("#bedSideTextID").val("");
		$("#instrumntTextID").val("");
	}
	if (multipleRadioButtonValue == "changeRadioButton") {
		$("#multiple").prop('checked', false);
		$("#multiple").val("multiple");
		$("#minusID").hide();
		$("#multipleTestSelectBox").hide();

		$("#invPlusImg").hide();
		$("#invMinusImg").hide();
		$("#phyPlusImg").hide();
		$("#phyMinusImg").hide();
		$("#pathPlusImg").hide();
		$("#pathMinusImg").hide();
		$("#othrPlusImg").hide();
		$("#othrMinusImg").hide();
		$("#causPlusImg").hide();
		$("#causMinusImg").hide();
		$("#consumPlusImg").hide();
		$("#consumMinusImg").hide();
		$("#gasPlusImg").hide();
		$("#gasMinusImg").hide();
		$("#bedPlusImg").hide();
		$("#bedMinusImg").hide();
		$("#instruPlusImg").hide();
		$("#instruMinusImg").hide();

		$("#investigationTextID").hide();
		$("#physiotherapyTextID").hide();
		$("#pathologyTextID").hide();
		$("#otherServicesTextID").hide();
		$("#casualityTextID").hide();
		$("#ipdConsumableTextID").hide();
		$("#gasesAndMonitorsTextID").hide();
		$("#bedSideTextID").hide();
		$("#instrumntTextID").hide();
	}
}

function HideTextAndButtonsFromServiceReport() {
	$("#minusID").hide();
	$("#multipleTestSelectBox").hide();
	$("#investigationTextID").hide();
	$("#pathologyTextID").hide();
	$("#otherServicesTextID").hide();
	$("#physiotherapyTextID").hide();
	$("#casualityTextID").hide();
	$("#ipdConsumableTextID").hide();
	$("#gasesAndMonitorsTextID").hide();
	$("#bedSideTextID").hide();
	$("#instrumntTextID").hide();

	$("#invPlusImg").hide();
	$("#invMinusImg").hide();
	$("#phyPlusImg").hide();
	$("#phyMinusImg").hide();
	$("#pathPlusImg").hide();
	$("#pathMinusImg").hide();
	$("#othrPlusImg").hide();
	$("#othrMinusImg").hide();
	$("#causPlusImg").hide();
	$("#causMinusImg").hide();
	$("#consumPlusImg").hide();
	$("#consumMinusImg").hide();
	$("#gasPlusImg").hide();
	$("#gasMinusImg").hide();
	$("#bedPlusImg").hide();
	$("#bedMinusImg").hide();
	$("#instruPlusImg").hide();
	$("#instruMinusImg").hide();
	$("#IdForSelectTestGrupOfCostEst").hide();
}

function addServiceReportMultipleTest(type) {
	var textName = "";
	var textID = '0';
	if (type == "investigationValue") {
		var textName = $("#investigationTextID").val();
		if (textName == "") {
			alert("Please Select Investigation Test");
			return false;
		}
		var investigationTestID = $("#investigationHiddenID").val();
		textID = investigationTestID + "_" + type + '\n';
	} else if (type == "physiotherapyValue") {
		var textName = $("#physiotherapyTextID").val();
		if (textName == "") {
			alert("Please Select Physiotherapy Test");
			return false;
		}
		var physiotherapyTestID = $("#physiotherapyHiddenID").val();
		textID = physiotherapyTestID + "_" + type + '\n';
	} else if (type == "pathologyValue") {
		var textName = $("#pathologyTextID").val();
		if (textName == "") {
			alert("Please Select Pathology Test");
			return false;
		}
		var pathologyTestID = $("#pathologyHiddenID").val();
		var pathologyHiddenIDForTest = $("#pathologyHiddenIDForTestType").val();
		textID = pathologyTestID + "_" + type + "_" +pathologyHiddenIDForTest + '\n';
	} else if (type == "OtherServicesValue") {
		var textName = $("#otherServicesTextID").val();
		if (textName == "") {
			alert("Please Select Other Test");
			return false;
		}
		var otherServicesTestID = $("#otherServicesHiddenID").val();
		textID = otherServicesTestID + "_" + type + '\n';
	} else if (type == "causalityValue") {
		var textName = $("#casualityTextID").val();
		if (textName == "") {
			alert("Please Select Causality Test");
			return false;
		}
		var causalityTestID = $("#casualityHiddenID").val();
		textID = causalityTestID + "_" + type + '\n';
	} else if (type == "consumablesValue") {
		var textName = $("#ipdConsumableTextID").val();
		if (textName == "") {
			alert("Please Select Consumables Services");
			return false;
		}
		var consumablesTestID = $("#ipdConsumableHiddenID").val();
		textID = consumablesTestID + "_" + type + '\n';
	} else if (type == "gasesAndMonitorsValue") {
		var textName = $("#gasesAndMonitorsTextID").val();
		if (textName == "") {
			alert("Please Select Gases And Monitors Services");
			return false;
		}
		var gasesAndMonitorsTestID = $("#gasesAndMonitorsHiddenID").val();
		textID = gasesAndMonitorsTestID + "_" + type + '\n';
	} else if (type == "bedSideProValue") {
		var textName = $("#bedSideTextID").val();
		if (textName == "") {
			alert("Please Select Bed Side Services");
			return false;
		}
		var bedSideTestID = $("#bedSideHiddenID").val();
		textID = bedSideTestID + "_" + type + '\n';
	} else if (type == "instrumntValue") {
		var textName = $("#instrumntTextID").val();
		if (textName == "") {
			alert("Please Select Instrument Services");
			return false;
		}
		var instrumntTestID = $("#instrumntHiddenID").val();
		textID = instrumntTestID + "_" + type + '\n';
	}
	var flag = 0;
	$('#multipleTestSelectBox').find('option').each(function() {
		if ($(this).html() == textName) {
			alert("Test Is Present In List");
			flag = 1;
		}else if(textName == ""){
			alert("Test Is Present In List");
			alert("aaa");
			return false;
		}
	});

	if (flag == 0) {
		var o = new Option("option text", "value");
		//  jquerify the DOM object 'o' so we can use the html method
		$(o).html(textName);
		$(o).val(textID);
		// $(0).val();
		$("#multipleTestSelectBox").append(o);
		$("#investigationTextID").val("");
		$("#physiotherapyTextID").val("");
		$("#otherServicesTextID").val("");
		$("#pathologyTextID").val("");
		$("#casualityTextID").val("");
		$("#ipdConsumableTextID").val("");
		$("#gasesAndMonitorsTextID").val("");
		$("#bedSideTextID").val("");
		$("#instrumntTextID").val("");
	}
}

function removeSelectedTest() {
	var TestValueToRemove = $("#multipleTestSelectBox option:selected").val();
	TestToClear = [];
	TestToClear = TestValueToRemove.split('_');
	if (TestToClear[1].match("investigationValue")) {
		$("#investigationHiddenID").val(0);
	} else if (TestToClear[1].match("physiotherapyValue")) {
		$("#physiotherapyHiddenID").val(0);
	} else if (TestToClear[1].match("pathologyValue")) {
		$("#pathologyHiddenID").val(0);
	} else if (TestToClear[1].match("OtherServicesValue")) {
		$("#otherServicesHiddenID").val(0);
	} else if (TestToClear[1].match("causalityValue")) {
		$("#casualityHiddenID").val(0);
	} else if (TestToClear[1].match("consumablesValue")) {
		$("#ipdConsumableHiddenID").val(0);
	} else if (TestToClear[1].match("gasesAndMonitorsValue")) {
		$("#gasesAndMonitorsHiddenID").val(0);
	} else if (TestToClear[1].match("bedSideProValue")) {
		$("#bedSideHiddenID").val(0);
	} else if (TestToClear[1].match("instrumntValue")) {
		$("#instrumntHiddenID").val(0);
	}
	$('#multipleTestSelectBox option:selected').remove();
}

// ....End Service Report

function getTotalCommonAdvancePatientReport(){

	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getTotalCommonAdvancePatientReport');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}

// Code by Kavita Date : 05/10/2016
function setExpenseVoucherReport(){
	GetRepBtn();
}

function getReportForExpenseVoucher() {

	var popup_container3 = $("#popup_container3").val();
	var popup_container2 = $("#popup_container2").val();
	var grpid = $("#selectVoucherGrp").val();
	var ledgerHeadid = $("#selectLedgerHead").val();
	
	var refTo = $("#refTo").val();
	var selDocName = "";
	var userId = 0;
	
	if (pageName == "helpDesk") {
		userId = $("#userId").val();
	} else {
		userId = $("#selDocName").val();
	}
	if (popup_container3 == "" || popup_container3 == null
			|| popup_container2 == '' || popup_container2 == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('from=' + popup_container3);
		inputs.push('to=' + popup_container2);
		inputs.push('refTo=' + refTo);
		inputs.push('userId=' + userId);
		inputs.push('grpid=' + grpid);
		inputs.push('ledgerHeadid=' + ledgerHeadid);
		inputs.push('action=getReportForExpenseVoucher');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("Sorry, Something Wrong !!!!");
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
// End code Kavita



//Code by Manisha Date: 14 Nov 2016

function getDailyServiceswiseReport(){
	
	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();

	var frommonthfield = fromDate.split("/")[1];
	var fromdayfield = fromDate.split("/")[0];
	var fromyearfield = fromDate.split("/")[2];

	var tomonthfield = toDate.split("/")[1];
	var todayfield = toDate.split("/")[0];
	var toyearfield = toDate.split("/")[2];

	var fromDate = new Date(fromyearfield, frommonthfield - 1, fromdayfield);
	var toDate = new Date(toyearfield, tomonthfield - 1, todayfield);

	if (fromDate > toDate) {
		alert("from date should be less than to date");
		$("#popup_container3").val("");
		$("#popup_container2").val("");
		return false;
	}
	var reportType = ($('input:radio[name=RadioGroupPatient_2]:checked').val());
	if (reportType == "" || undefined == reportType || null == reportType) {
		alert("Please Select Report Type...");
	} else {

		if (reportType == "CTScan_Report") {
			setPdfButtonTemp();
			getReportForCTScanServiceswise();
		} else if (reportType == "X_ray_Report") {
			setPdfButtonTemp();
			getReportForX_RayServiceswise();
		} else if (reportType == "USG_Report") {
			setPdfButtonTemp();
			getReportForUSGServiceswise();  
		}else if (reportType == "Pathology_Report") {
			setPdfButtonTemp();
			getReportForPathologyTest();  
		}
	}
}


function getReportForCTScanServiceswise() {
	
	setPdfButtonTemp();
	 var from = $("#popup_container3").val();
	 var to = $("#popup_container2").val();
	 
	
	var inputs = [];
	inputs.push('action=getReportForCTScanServiceswise');
	 inputs.push('from=' + from);
	 inputs.push('to=' + to);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
            setViewBtns(ajaxResponse);
		}
	});
}



function setDailyServiceswiseReport() {
	GetServiceswiseRepBtn();
	$("#caseReg").html("");
	$("#dailyServiceswiseReport").html("");
	$("#ItemManage2").html("");
	$("#divReportCommonOption").html("");
	$("#divSearchBox").html("");
	$("#date").show();
	$("#divSearchResult").html("");
	$("#divrefBy").hide();
	var sample;
	$("#divTestCharges").hide();
	$("#dailyServiceswiseReport").setTemplate(DailyServicesWiseReport);
	$("#dailyServiceswiseReport").processTemplate(sample);
    
	$("#popup_container2").show();
	$("#popup_container3").show();
	$("#from").html("From");
	$("#from").show();
	$("#to").show();
}


var DailyServicesWiseReport = "<div style='width: 240px;'>"
	+ "<input type='radio'	name='RadioGroupPatient_2' value='CTScan_Report' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp; CT Scan"
	+ "</div><div style='width: 100px;'>"
	+ "<input type='radio'	name='RadioGroupPatient_2' value='X_ray_Report' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp;X-Ray"
	+ "</div><div style='width: 100px;'>"
	+ "<input type='radio'	name='RadioGroupPatient_2' value='USG_Report' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp;USG"
	+ "</div><div style='width: 150px;'>"
	+ "<input type='radio'	name='RadioGroupPatient_2' value='Pathology_Report' id='RadioGroupPatient_2'	name='RadioGroupPatient_2'  onclick='' />&nbsp;&nbsp;&nbsp;&nbsp;Pathology Test"
	+ "</div>"
    + "</div>";


function GetServiceswiseRepBtn() {
	var sample;
	$("#getRepBtn").setTemplate(getServiceswiseRepBtnTemp);
	$("#getRepBtn").processTemplate(sample);

}

var getServiceswiseRepBtnTemp = "<input onclick='getDailyServiceswiseReport()' style=''	type='button' value='Get Report' class='btn btn-xs btn-success' />";



function getReportForX_RayServiceswise() {
	
	setPdfButtonTemp();
	 var from = $("#popup_container3").val();
	 var to = $("#popup_container2").val();
	 
	
	var inputs = [];
	inputs.push('action=getReportForX_RayServiceswise');
	 inputs.push('from=' + from);
	 inputs.push('to=' + to);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
            setViewBtns(ajaxResponse);
		}
	});
}


function getReportForUSGServiceswise() {
	
	setPdfButtonTemp();
	 var from = $("#popup_container3").val();
	 var to = $("#popup_container2").val();
	 
	
	var inputs = [];
	inputs.push('action=getReportForUSGServiceswise');
	 inputs.push('from=' + from);
	 inputs.push('to=' + to);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
            setViewBtns(ajaxResponse);
		}
	});
}


function getReportForPathologyTest() {
	
	setPdfButtonTemp();
	 var from = $("#popup_container3").val();
	 var to = $("#popup_container2").val();
	 
	
	var inputs = [];
	inputs.push('action=getReportForPathologyTest');
	 inputs.push('from=' + from);
	 inputs.push('to=' + to);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ReportServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
            setViewBtns(ajaxResponse);
		}
	});
}

//Code by Kavita Date : 10/11/2016  @Function for creating excelsheet through java coding
var pdf = "pdf";
var excelButtonTemp = "&nbsp;&nbsp;<input	type='button' value='View PDF' class='btn btn-xs btn-warning' onclick='getDoctorOverallReport("+pdf+")' /></a>&nbsp;<a href='excel' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	type='button' value='View Excel' class='btn btn-xs btn-warning' /></a>";

//var excelButtonTemp = "&nbsp;&nbsp;<a href='excel' style='text-decoration: none;'  name='getExcelFile' id='getExcelFile' target=\ '_blank\'  title=\'\'> <input onclick='getExcelReportInJava()' type='button' value='View Excel' class='btn btn-xs btn-primary' style='margin-left: 20%;' /></a>";

function setExcelButtonTemp() {
	var pobj1;
	$("#pdfbutton").setTemplate(excelButtonTemp);
	$("#pdfbutton").processTemplate(pobj1);
}

function getExcelReportInJava() {

	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();

	var frommonthfield = fromDate.split("/")[1];
	var fromdayfield = fromDate.split("/")[0];
	var fromyearfield = fromDate.split("/")[2];

	var tomonthfield = toDate.split("/")[1];
	var todayfield = toDate.split("/")[0];
	var toyearfield = toDate.split("/")[2];

	var fromDate = new Date(fromyearfield, frommonthfield - 1, fromdayfield);
	var toDate = new Date(toyearfield, tomonthfield - 1, todayfield);

	if (fromDate > toDate) {
		alert("from date should be less than to date");
		$("#popup_container3").val("");
		$("#popup_container2").val("");
		return false;
	}
	var reportType = ($('input:radio[name=RadioGroupPatient_2]:checked').val());

	if (reportType == "" || undefined == reportType || null == reportType) {
		alert("Please Select Report Type ...");
	} else {
		if (reportType == "DoctorOverallReport") {
			getDoctorOverallReport('excel');
		}
		// Code by Kavita
		else if (reportType == "totalradiationpatient") {
			// setPdfButtonTemp();
			getTotalRadiationPatientReport();
		}
		// Code by Kavita
		else if (reportType == "commonadvance") {
			setPdfButtonTemp();
			getTotalCommonAdvancePatientReport();
		}
		// Code by Kavita Date: 05/10/2016 
		else if (reportType == "ExpenseVoucher") {
			setPdfButtonTemp();
			getReportForExpenseVoucher();
		}
	}
}
// End Kavita

//Code by Kavita Date : 10/11/2016  @Function for creating excelsheet through java coding
function setViewExcelBtn(ajaxResponse) {

	alert("Report Generated Successfully");
	var i = ajaxResponse;
	var z = [];
	z = i.split('"');
	var t = z[1];
	$("a[href='excel']").attr('href', '/EhatEnterprise/ehat_Reports' + t);
}// End Kavita

function getReportForERPatient() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForERPatient');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

//Code by Kavita Date-- 22-Nov-2016 @Function For Bed occupancy Report
function getReportForAllBedOccupancy(halltype,hallwise) {
	if (halltype == "select") {
		alert("Please select hall type name");
		return false;
	} else if(hallwise == "select"){
		alert("Please select hall name");
		return false;
	} {
		var inputs = [];
		inputs.push('action=getReportForAllBedOccupancy');
		inputs.push('halltype=' + halltype);
		inputs.push('hallwise=' + hallwise);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
function showDateType(callfrom){
	if(callfrom == "date"){
		$("#from").show();
		$("#popup_container3").show();
		$("#to").show();
		$("#popup_container2").show();
	}else{
		$("#from").hide();
		$("#popup_container3").hide();
		$("#to").hide();
		$("#popup_container2").hide();
	}
}
function hideHallType(callfrom){
	if(callfrom == "halltype"){
		$("#divhalltype").show();
		$("#divhallwise").hide();
		$("#halltype").val("select");
	}else if(callfrom == "hallwise"){
		$("#divhalltype").show();
		$("#divhallwise").hide();
		$("#halltype").val("select");
	}else{
		$("#divhalltype").hide();
		$("#divhallwise").hide();
	}
}
function getReportForOverallBedOccupancy() {
	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();
	
	if ((fromDate == "" || fromDate == undefined) || (toDate == "" || toDate == undefined)) {
		alert("Please select Proper Date's");
		return false;
	} else {
		var inputs = [];
		inputs.push('action=getReportForOverallBedOccupancy');
		inputs.push('fromDate=' + fromDate);
		inputs.push('toDate=' + toDate);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
function getReportForOverallBedOccupancyHallTypewise() {
	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();
	var halltype = $("#halltype").val();
	
	if ((fromDate == "" || fromDate == undefined) || (toDate == "" || toDate == undefined)) {
		alert("Please select Date's");
		return false;
	}else if((halltype == "" || halltype == undefined)){
		alert("Please select Hall Type");
		return false;
	}else {
	
		var inputs = [];
		inputs.push('action=getReportForOverallBedOccupancyHalltype');
		inputs.push('fromDate=' + fromDate);
		inputs.push('toDate=' + toDate);
		inputs.push('halltype=' + halltype);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
function OverallBedOccupancyReportHallwise() {
	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();
	var hallwise = $("#hallwise").val();
	
	if ((fromDate == "" || fromDate == undefined) || (toDate == "" || toDate == undefined)) {
		alert("Please select Date's");
		return false;
	}else if((hallwise == "" || hallwise == undefined)){
		alert("Please select Hall Wise");
		return false;
	}else {
	
		var inputs = [];
		inputs.push('action=getReportForOverallBedOccupancyHallwise');
		inputs.push('fromDate=' + fromDate);
		inputs.push('toDate=' + toDate);
		inputs.push('hallwise=' + hallwise);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}

function ShowSurgeonType(callfrom){
	if(callfrom == "surgeonwise"){
		$("#divOTBillsur").show();
		$("#divOTBillane").hide();
		$("#divOTBillassis").hide();
		$("#divOTCharges").hide();
	}else if(callfrom == "anaesthe"){
		$("#divOTBillane").show();
		$("#divOTBillsur").hide();
		$("#divOTBillassis").hide();
		$("#divOTCharges").hide();
	}else if(callfrom == "assSurgeon"){
		$("#divOTBillane").hide();
		$("#divOTBillsur").hide();
		$("#divOTCharges").hide();
		$("#divOTBillassis").show();
	}else if(callfrom == "chargewise"){
		$("#divOTBillane").hide();
		$("#divOTBillsur").hide();
		$("#divOTCharges").show();
		$("#divOTBillassis").hide();
	}else{
		$("#divOTBillane").hide();
		$("#divOTBillsur").hide();
		$("#divOTBillassis").hide();
		$("#divOTCharges").hide();
	}
}
function BillingReportSurgeonWise(UserID){
	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();
	
	if ((fromDate == "" || fromDate == undefined) || (toDate == "" || toDate == undefined)) {
		alert("Please select Date's");
		return false;
	}else {
		var inputs = [];
		inputs.push('action=BillingReportSurgeonWise');
		inputs.push('fromDate=' + fromDate);
		inputs.push('toDate=' + toDate);
		inputs.push('UserID=' + UserID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
function BillingReportAnaesthetistWise(UserID){
	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();
	
	if ((fromDate == "" || fromDate == undefined) || (toDate == "" || toDate == undefined)) {
		alert("Please select Date's");
		return false;
	}else {
		var inputs = [];
		inputs.push('action=BillingReportAnaesthetistWise');
		inputs.push('fromDate=' + fromDate);
		inputs.push('toDate=' + toDate);
		inputs.push('UserID=' + UserID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
function BillingReportAssistantWise(UserID){
	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();
	
	if ((fromDate == "" || fromDate == undefined) || (toDate == "" || toDate == undefined)) {
		alert("Please select Date's");
		return false;
	}else {
		var inputs = [];
		inputs.push('action=BillingReportAssistantWise');
		inputs.push('fromDate=' + fromDate);
		inputs.push('toDate=' + toDate);
		inputs.push('UserID=' + UserID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
function BillingReportOTChargesWise(OTID){
	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();
	
	if ((fromDate == "" || fromDate == undefined) || (toDate == "" || toDate == undefined)) {
		alert("Please select Date's");
		return false;
	}else {
		var inputs = [];
		inputs.push('action=BillingReportOTChargesWise');
		inputs.push('fromDate=' + fromDate);
		inputs.push('toDate=' + toDate);
		inputs.push('OTID=' + OTID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
function selectChannlingDoc(){
	$("#divtxtDoctorName").hide();
	$("#pdfbutton").html("");
	$("#divIPDRefDoc").show();
	$("#divSearchBox").hide();
	getRefDoctors();
}
function IPDReferenceDoctorBillingReport(channlingDoc){
	var fromDate = $("#popup_container3").val();
	var toDate = $("#popup_container2").val();
	
	if ((fromDate == "" || fromDate == undefined) || (toDate == "" || toDate == undefined)) {
		alert("Please select Date's");
		return false;
	}else {
		var inputs = [];
		inputs.push('action=IPDReferenceDoctorBillingReport');
		inputs.push('fromDate=' + fromDate);
		inputs.push('toDate=' + toDate);
		inputs.push('channlingDoc=' + channlingDoc);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				setViewBtns(ajaxResponse);
			}
		});
	}
}
//@Author: Tushar @1Mar2017

function getDataObj(str){
	var arr= str.split("/");
	return new Date(arr[2], arr[1], arr[0]);
}

function printBedOccupancyTrendReport(){

		var sDate = $.trim($("#popup_container3").val());
		var eDate = $.trim($('#popup_container2').val());
		var halltype = $.trim($("#halltype").val());
		var hallwise = $.trim($("#hallwise").val());
		var pageSize = "standard";
		var d1= getDataObj(sDate);
		var d2= getDataObj(eDate);
		var dateDiff = (d2-d1)/86400000;
		
		setTimeout(
				function() {
						window.open(("BedOccupancyTrendReportPrint.jsp?sDate=" + sDate + "&eDate=" + eDate 
									+ "&halltype=" + halltype + "&hallwise=" + hallwise+"&dateDiff=" + dateDiff
									+ "&pageSize=" + pageSize));

				}, 300);
}
//@Author: Tushar @2Mar2017
function printWardOccupancyTrendReport(){
	
	var sDate = $.trim($("#popup_container3").val());
	var eDate = $.trim($('#popup_container2').val());
	var halltype = $.trim($("#halltype").val());
	var pageSize = "standard";
	var d1= getDataObj(sDate);
	var d2= getDataObj(eDate);
	var dateDiff = (d2-d1)/86400000;
	//alert("sDate="+sDate+" eDate="+eDate+" halltype="+halltype+" dateDiff="+dateDiff);
	setTimeout(
			function() {
					window.open(("WardOccupancyTrendReportPrint.jsp?sDate=" + sDate + "&eDate=" + eDate 
								+ "&halltype=" + halltype +"&dateDiff=" + dateDiff
								+ "&pageSize=" + pageSize));

			}, 300);
}

function getReportForIPDInactivePatient() {
	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	// alert(from+" and "+to);
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please Select The Date First");
	} else {
		var inputs = [];
		inputs.push('action=getReportForIPDInactivePatient');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ReportServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(r);
				setViewBtns(ajaxResponse);
			}
		});
	}
}

/*******************************************************************************
 * @author Laxman Nikam
 * @Code autoSuggCertDashboardPat
 ******************************************************************************/
function autoSuggCertDashboardPat(inputId, callfrom) {
	var letter = "";
	var call = $("#searchFrom").val();
	letter = $("#byName").val();
	
	if(letter=="" && callfrom == "search"){
		alertify.error("please enter patient Name,Id,Mob No or Adhar No.");
		return false;
	}
	var findingName = $("#" + inputId).val();
	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('letter=' + letter);
	inputs.push('call=' + encodeURIComponent(call));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/certificate/autoSuggCertDashboardPat",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			if(callfrom == "search"){
				$("#byName").val("");
				if(ajaxResponse.lstRegviewDto.length==0){
					alertify.error("Patient Not found...");
					return false;
				}
			}
			count=1;
			$("#container").setTemplate(viewCertDashPatTemp);
			$("#container").processTemplate(ajaxResponse);
			/*myObj = JSON.stringify(ajaxResponse);
			$("#patObj").val(myObj.decodeSpecialChars());*/

		}
	});
}

/*******************************************************************************
 * @author Laxman Nikam
 * @Code getPatientWardDet
 ******************************************************************************/
function getPatientWardDet(r) {
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/registration/fetchPatientsBedRecords",
		success : function(r) {
			$("#txtWardNo").val((r.hl[0].hn)+"("+r.hl[0].htnm+")");
		
 		}
	});
}

/*******************************************************************************
 * @author Laxman Nikam
 * @Code getPateintDetails
 ******************************************************************************/
function getPateintDetails(r,callFrom) {
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"treatmentId" : r
		},
		url : "ehat/certificate/getPateintDetails",
		success : function(r) {
			$("#txtDeathPatNm").html(r.lstRegviewDto[0].patientName);
			$("#deathPatSx").html(r.lstRegviewDto[0].gender);
			$("#txtPatNm").val(r.lstRegviewDto[0].patientName);
			var len=(r.lstRegviewDto[0].patientName).toString().split(" ")[0];
			var par_name=(r.lstRegviewDto[0].patientName).toString().substring(len.toString().length);
			par_name="Mr."+par_name;
			$("#txtPatParNm").val(par_name);
			$("#patParNm").html(par_name);
			
			if(callFrom=="Death"){
				var deathDate=new Date(r.lstRegviewDto[0].deathDate).toLocaleString();
				$("#txtDateOfDeth").val(deathDate.split(",")[0]);
				$("#txtDateOfVeryFy").val(deathDate.split(",")[0]);
				$("#txtDateOfExpired").val(deathDate.split(",")[0]);
				var timeString = r.lstRegviewDto[0].deathTime;
				var H = +timeString.substr(0, 2);
				var h = H % 12 || 12;
				var ampm = (H < 12 || H === 24) ? "AM" : "PM";
				timeString = h + timeString.substr(2, 3);
				
				$("#txtTimeOfDeth").val(timeString);
				
				$("#selTmDeth").val(ampm);
				
				$("#txtDocNm").val(r.lstRegviewDto[0].doctorName);
			}
			
			var p_age=(r.lstRegviewDto[0].patientAge).toString().split("/");
			
			if(p_age[0]!=0){
				$("#txtAgeInYear").val(p_age[0]);
				$("#txtAgeInMonth").val("-");
				$("#txtAgeInDays").val("-");
			}else if(p_age[1]!=0){
				$("#txtAgeInMonth").val(p_age[1]);
				$("#txtAgeInYear").val("-");
				$("#txtAgeInDays").val("-");
			}else{
				$("#txtAgeInDays").val(p_age[2]);
				$("#txtAgeInYear").val("-");
				$("#txtAgeInMonth").val("-");
			}
			
			$("#txtDateOfAdmit").val(new Date(r.lstRegviewDto[0].patientRegDate).toLocaleString().split(",")[0]);
			
			//for SickLeaveCert
			$("#pName").html(r.lstRegviewDto[0].patientName);
			$("#age").html(p_age[0]);
			$("#sex").html(r.lstRegviewDto[0].gender);
			
			var address="";
			if(r.lstRegviewDto[0].address!="" && r.lstRegviewDto[0].address!=null && r.lstRegviewDto[0].address!="-"){
				address=address+" "+r.lstRegviewDto[0].address+",";
			}
			if(r.lstRegviewDto[0].cityName!="-"){
				address=address+" "+r.lstRegviewDto[0].cityName;
			}
			if(r.lstRegviewDto[0].talukaName!="-"){
				address=address+" "+r.lstRegviewDto[0].talukaName;
			}
			if(r.lstRegviewDto[0].disName!="-"){
				address=address+" "+r.lstRegviewDto[0].disName;
			}
			if(r.lstRegviewDto[0].stateName!="-"){
				address=address+","+r.lstRegviewDto[0].stateName;
			}
			
			$("#add").html(address);
			
 		}
	});
}

/*******************************************************************************
 * @author Laxman Nikam
 * @Code getPatDischargeSmry
 ******************************************************************************/
function getPatDischargeSmry(r) {
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/certificate/getPatDischargeSmry",
		success : function(r) {
			$("#txtCauseA").val(r.dsl[0].primaryCOD);
			$("#txtCauseB").val(r.dsl[0].secondaryCOD);
			$("#txtCauseC").val(r.dsl[0].significantCondition);
 		}
	});
}

/*******************************************************************************
 * @author Laxman Nikam
 * @Code getConsDrName
 ******************************************************************************/
function getConsDrName(treatmentId) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatmentId" : treatmentId
		},
		url : "ehat/registration/getConsultantDrName",
		success : function(r) {
			var doc_name="";
			if(r.lstDoctorDto!=null){
			for ( var i = 0; i < r.lstDoctorDto.length; i++) {
					//alert("----------->>>>"+r.lstDoctorDto[i].doc_name);
					doc_name=doc_name+","+r.lstDoctorDto[i].doc_name;
				}
			}
			if(doc_name!=""){         
			$("#DocName").val(doc_name.slice(1));
			}
		}
	});
}

function getDignosisInfo(treatmentId) {

	var inputs = [];
	inputs.push('action=fetchAssessment');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			
		},
		success : function(res) {
			var ajaxResponse = res;
			var content="";
			var r = eval('(' + ajaxResponse + ')');
			
			for ( var i = 0; i < r.assessmentList.length; i++) {
				content = content+","+r.assessmentList[i].diagnosis+"-"+r.assessmentList[i].icd10_code;
			}
			if(content!=""){         
				$("#dia").html(content.slice(1));
			}
		}
	});
}

function getTNMStageInfo(patientId) {
	jQuery
			.ajax({
				type : "POST",
				data : {
					"patientId" : patientId
				},
				url : "useraccess/getTNMStageByPatientId",
				error : function() {
					alert("error");
				},
				success : function(r) {
					var content = "";
					for ( var i = 0; i < r.length; i++) {
						content = content+", "+r[i].tnmStage;
								
					}
					if(content!=""){         
						$("#stage").html(content.slice(1));
					}
				}
			});
}

function getPlanOfTreatInfo(patientId,treatmentId){
	 var inputs = [];
    inputs.push('pid=' + patientId);
    inputs.push('tid=' + treatmentId);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingstation/fetchPlanTreat",

		success : function(response) {
				//alert(JSON.stringify(response));
				
				var temp="";
				
				if(response.planlist[0].chka==1){
					temp=temp+", "+"SURGERY";
				}

				if(response.planlist[0].chkb==1){
					temp=temp+", "+"CHEMOTHERAPY";
				}

				if(response.planlist[0].chkc==1){
					temp=temp+", "+"RADIOTHERAPY";
				}

				if(response.planlist[0].chkd==1){
					temp=temp+", "+"HORMONE THERAPY";
				}

				if(response.planlist[0].chke==1){
					temp=temp+","+"TARGETED THERAPY";
				}

				if(response.planlist[0].chkf==1){
					temp=temp+", "+"CONCOMITANT RADIOTHERAPY + CHEMOTHERAPY";
				}

				if(response.planlist[0].chkg==1){
					temp=temp+","+"FOLLOW UP";
				}

				if(response.planlist[0].chkh==1){
					temp=temp+", "+"PALLIATIVE CARE";
				}

				if(response.planlist[0].chki==1){
					temp=temp+", "+"SUPPORTIVE CARE";
				}
				
				if(temp!=""){         
					$("#plan").html(temp.slice(1));
					}
			}
		});
}

function getSurgeryAdviceInfo(treatmentId) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatmentId" : treatmentId
		},
		url : "ehat/certificate/getSurgeryAdviceInfo",
		success : function(r) {
			var SurgeryInfo="";
			var procedureName="";
			var temp="";
			if(r.adviceDTOList!=null){
				
			for ( var i = 0; i < r.adviceDTOList.length; i++) {
				
				SurgeryInfo=SurgeryInfo+", "+r.adviceDTOList[i].procedureName+"-";
				procedureName=procedureName+", "+r.adviceDTOList[i].procedureName;
				
				if(r.adviceDTOList[i].palliative=="Y"){
					temp=",";
				}
				if(r.adviceDTOList[i].radical=="Y"){
					SurgeryInfo=SurgeryInfo + "radical"+temp;
				}
				
				if(r.adviceDTOList[i].palliative=="Y"){
					SurgeryInfo=SurgeryInfo + "palliative";
				}
				
				}
			}
			if(SurgeryInfo!=""){         
				$("#cur_pall").html(SurgeryInfo.slice(1));
				$("#treat_cur_pall").html(SurgeryInfo.slice(1));
			}
			
			if(procedureName!=""){         
				$("#surgeryNm").html(procedureName.slice(1));
			}
		}
	});
}

function getChemotherapyInfo(patientId,treatmentId){
	
	var inputs = [];
	inputs.push('patId=' + patientId);
	inputs.push('treatId=' + treatmentId);
	inputs.push('chemoDt=' + "");
	inputs.push('Type=' + "onload");
	inputs.push('callFrom=' + "onload");
	var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/patientChemo/getPatientChemo",
			error : function() {
				alert('error');
			},
			success : function(r) {
				var ajaxResponse = r;
				if (ajaxResponse != "") {
					$("#regimeNm").html(ajaxResponse[0].chemoName);
					$("#noOfCycles").html(ajaxResponse[0].noOfCycle);
				}
			}
		});
}

function getRadiotherapyInfo(patientId,treatmentId) {

	var inputs = [];
	inputs.push('action=fectchAllRadiotherapy');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('pagetype=' + "pageType");
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(res) {
			var content = "";
			var cur_pall="";
			pobj1 = eval('(' + res + ')');
			
			for( var i = 0; i < pobj1.radioList.length; i++){
				content = content +", "+pobj1.radioList[i].radiationName;
				cur_pall = cur_pall +", "+pobj1.radioList[i].radiationName+"- ";
				
				if(pobj1.radioList[i].neoAdjuvant=="Y"){
					cur_pall = cur_pall +"NeoAdjuvant ";
				}
				if(pobj1.radioList[i].adjuvant=="Y"){
					cur_pall = cur_pall +"Adjuvant ";
				}
				if(pobj1.radioList[i].radicalIntent=="Y"){
					cur_pall = cur_pall +"Radical ";
				}
				if(pobj1.radioList[i].radicalPalliative=="Y"){
					cur_pall = cur_pall +"Palliative ";
				}
				if(pobj1.radioList[i].branchyTherapy=="Y"){
					cur_pall = cur_pall +"BrachyTherapy ";
				}
				if(pobj1.radioList[i].concomitantChemo=="Y"){
					cur_pall = cur_pall +"Concomitant Chemotherapy ";
				}
			}
			if(content!=""){         
				$("#rtNm").html(content.slice(1));
			}
			if(cur_pall!=""){         
				
				$("#radio_cur_pall").html(cur_pall.slice(1));
			}
			
		}
	});
	}

function calAmount(){
	
	var costOfsurgryTr = $("#costOfsurgryTr").val();	
	var costOfChemo = $("#costOfChemo").val();	
	var costOfRT = $("#costOfRT").val();	
	var costOfPallTr = $("#costOfPallTr").val();
	var estimateCost = $("#estimateCost").val();
	
	if(costOfsurgryTr==null || costOfsurgryTr==undefined || costOfsurgryTr=="" || isNaN(costOfsurgryTr)){
		costOfsurgryTr = 0;
	}
	
	if(costOfChemo==null || costOfChemo==undefined || costOfChemo=="" || isNaN(costOfChemo)){
		costOfChemo = 0;
	}
	
	if(costOfsurgryTr==null || costOfRT==undefined || costOfRT=="" || isNaN(costOfRT)){
		costOfRT = 0;
	}
	
	if(costOfPallTr==null || costOfPallTr==undefined || costOfPallTr=="" || isNaN(costOfPallTr)){
		costOfPallTr = 0;
	}
	
	if(estimateCost==null || estimateCost==undefined || estimateCost=="" || isNaN(estimateCost)){
		estimateCost = 0;
	}
	
	var totalRupees = parseFloat(costOfsurgryTr)+parseFloat(costOfChemo)+parseFloat(costOfRT)+parseFloat(costOfPallTr)+parseFloat(estimateCost);
	
	if(totalRupees==null || totalRupees==undefined || totalRupees=="" || isNaN(totalRupees)){
		totalRupees = 0;
	}
	$("#totalRupees").val(totalRupees);
	
	inWords(totalRupees);
}

function validatedNumOnly(evt) {
	evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    alertify.error("Enter Number Only.!!!");
        return false;
    }
    return true;
}

var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    $("#ruppeInWrd").val(str);
}

function dateToEpoch(thedate) {
    var time = thedate.getTime();
    time= time - (time % 86400000);
     var dateTime=new Date(time).toLocaleString();
     $("#date").val((dateTime.split(",")[0]));
     
}

function showIPDDICpatientSearch(){
	var byName = $("#byName").val().trim();
	var byId = $("#byId").val();
	
	var searchBy = "";
	var value = "";
	if (byName != "" && byId != "") {
		alert("Please search either by Patient Id or by Patient Name");
		return false;
	} /*else if (byName == "" && byId == "") {
		alert("Please enter Patient Name or Patient Id for search");
		return false;
	} else if (byName.charAt(0) == " ") {
		alert("Please select Patient Name for search");
		return false;
	}*/ else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}
	}
		
	var inputs = [];
	inputs.push('action=fetchPatBedDetails');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
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
			var ajaxResponse = r;
			$("#patientDetailsFeedback").html(ajaxResponse);
			$("#byName").val("");
			$("#byId").val("");

			count=1;
			var pobj1 = eval('(' + ajaxResponse + ')');
			
			if(pobj1.pl.length<1){
				alert("Patient not found..!!!");
				return false;
			}
			$("#container").setTemplate(feedbackPatTemplate);
			$("#container").processTemplate(pobj1);
		}
	});

}

function clearText(callFrom){
	if(callFrom=="byName"){
		$("#byId").val("");
	}else{
		$("#byName").val("");

	}
}



function autoSuggestionForPateintNameIndentSale12(inputID, typeauto) {
	
	var typeOfpatient = 'diagnosis';
	var inputs = [];

	if (typeOfpatient == "diagnosis") {
		inputs.push('isEdit=yes');
	} else {
		inputs.push('isEdit=no');
	}

	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {

		inputs.push('action=fetchPharmaPateintNameReportAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {

						// alert(r.length);
						var availableTags = [];

						ajaxResponse = eval('(' + r + ')');

						for ( var i = 0; i < ajaxResponse.ltInventoryFetchPateintNameDTO.length; i++) {

							availableTags
									.push(ajaxResponse.ltInventoryFetchPateintNameDTO[i].fName
											+ " "
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].mName
											+ " "
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].lName
											+ "__"
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Patient_ID
											+ "_"
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Treatment_ID
											+ "_"
											+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].referedTo);
						}

						var template = "";
						for ( var j = 0; j < availableTags.length; j++) {
							var arrValue = (availableTags[j])
									.split("__");
							var idValue = (arrValue[1]);
							resultData.push({
								ID : idValue,
								Name : arrValue[0]
							});

							template = template + '<li data-value="'
									+ (arrValue[1])
									+ '" class=""><a href="#">'
									+ arrValue[0] + '</a></li>';

						}

						$("#div" + inputID + " .typeahead").html(
								template);

						setTimeout(
								function() {
									$('#' + inputID).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult1,
										scrollBar : true,

									});
									$("#txtPatientName").data(
											'typeahead').source = resultData;
								}, 500);

					}
				});

	}

}

function hidePopUp() {
	$('#patient_productwise_report').hide();
	location.reload(true);
}

function displayResult1(item) {

	var content = item.value.split("_");
	$('#hiddenPatientId').val(content[0]);

}



/************
 *@author	: Ajay Khandare
 *@date		:  07-feb-2019
 *@code		: onload
 ********/

function hidePatientDoctor() {
	$("#divPatientName").hide();
	$("#divUserName").show();
	$("#divDoctorName").hide();
}

function hidePatientUser() {
	$("#divPatientName").hide();
	$("#divUserName").hide();
	$("#divDoctorName").show();
}

function hideUserDoctor() {
	$("#divPatientName").show();
	$("#divUserName").hide();
	$("#divDoctorName").hide();
}


function autoSuggestionForUserSale(inputID, typeauto) {
	
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	// alert("text value is:"+txtVal1);

	var inputs = [];

	inputs.push('patiename=' + txtVal1);
	inputs.push('callfrom=' + typeauto);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/report/fetchuser",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
			// alert(r);
			// alert(r.length);
			var availableTags = [];
			if (r.length == 20) {
				alert("NO MATCHING FOUND");

			} else {
				//ajaxResponse = eval('(' + r + ')');
				ajaxResponse = JSON.stringify(r);
				ajaxResponse = eval('(' + ajaxResponse + ')');
				for ( var i = 0; i < ajaxResponse.ul.length; i++) {
					availableTags.push(ajaxResponse.ul[i].un + "_"
							+ ajaxResponse.ul[i].ui);
				}

				// availableTags = ajaxResponse.split("\n");

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template = template + '<li data-value= "'
							+ (arrValue[1]) + '" class=""><a href="#">'
							+ arrValue[0] + '</a></li>';

				}

				$("#div" + inputID + " .typeahead").html(template);
				if (typeauto != 'onload') {
					$("#div" + inputID + " .typeahead").show();
				}

				setTimeout(function() {
					$('#' + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult1,
						scrollBar : true

					});

				}, 500);
			}
		}
	});

	function displayResult1(item) {
		$('#' + inputID).val(item.text);
		$("#hiddenUserId").val(item.value);
	}
}

function autoSuggestionForDoctorSale(inputID, typeauto) {
	
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

	var inputs = [];

	inputs.push('doctorname=' + txtVal1);
	inputs.push('callfrom=' + typeauto);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/EhatEnterprise/pharmacy/report/fetchDoctor",
				timeout : 1000 * 60 * 15,
				cache : true,
				error : function() {
					alert('error');
				},
				success : function(r) {
					//alert(r);
					// alert(r.length);
					var availableTags = [];
					if (r.length == 50) {
						alert("NO MATCHING FOUND");

					} else {
						//ajaxResponse = r;
						ajaxResponse = JSON.stringify(r);
						ajaxResponse = eval('(' + ajaxResponse + ')');
						for ( var i = 0; i < ajaxResponse.doctorList.length; i++) {
							availableTags
									.push(ajaxResponse.doctorList[i].status
											+ "_"
											+ ajaxResponse.doctorList[i].idDoc);
						}

						// availableTags = ajaxResponse.split("\n");
                        
						var template = "";
						for ( var j = 0; j < availableTags.length; j++) {
							var arrValue = (availableTags[j])
									.split("_");
							var idValue = (arrValue[1]);
							
							resultData.push({
								ID : idValue,
								Name : arrValue[0]
							});

							template = template + '<li data-value= "'
									+ (arrValue[1])
									+ '" class=""><a href="#">'
									+ arrValue[0] + '</a></li>';

						}

						$("#div" + inputID + " .typeahead").html(
								template);

						if (typeauto != 'onload') {
							$("#div" + inputID + " .typeahead").show();
						}

						setTimeout(function() {
							$('#' + inputID).typeahead({
								source : resultData,
								displayField : 'Name',
								valueField : 'ID',
								onSelect : displayResult2,
								scrollBar : true

							});

						}, 500);
					}
				}
			});

	function displayResult2(item) {
		
		$('#' + inputID).val(item.text);
		$("#hiddenDoctorId").val(item.value);
		$("#rb").val(item.value);
		$("#NSDocName").val(item.value);
		$("#DocName").val(item.value);
	}

}


function getPrtywiseDBNoteListDataNew() {

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	  $("#patient_productwise_report").show();
	var saletype = $("input:radio[name='saletype']:checked").val();
	var patientId = $('#hiddenPatientId').val();
	var userId = $("#hiddenUserId").val();
	var doctorId = $("#hiddenDoctorId").val();
	
	var total=0;
	$('#totalAmount').val('');

	if (patientId == "" || patientId == null || patientId == undefined) {
		patientId = 0;
	}

	if (userId == "" || userId == null || userId == undefined) {
		userId = 0;
	}

	if (doctorId == "" || doctorId == null || doctorId == undefined) {
		doctorId = 0;
	}

		if (from == "" || from == null || to == '' || to == null) {
			alert("Please  Select The Date First");
		} else {

			var inputs = [];
			inputs.push('from=' + encodeURIComponent(from));
			inputs.push('to=' + encodeURIComponent(to));
			inputs.push('patientId=' + encodeURIComponent(patientId));
			inputs.push('userId=' + encodeURIComponent(userId));
			inputs.push('doctorId=' + encodeURIComponent(doctorId));
			inputs.push('saletype=' + encodeURIComponent(saletype));
			inputs.push('unitId=' + 1);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getBillwiseSaleReport",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					setBillWiseSaleResult(r);
				}
			});

		}
}

/************
 *@author	: Ajay Khandare
 *@date		:  12-feb-2019
 *@code		:loadPopup1 function
 ********/

function loadPopUp1() {

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	$("#patient_productwise_report").show();
	var saletype = $("input:radio[name='saletype']:checked").val();
	var patientId = $('#hiddenPatientId').val();
	var userId = $("#hiddenUserId").val();


	if (patientId == "" || patientId == null || patientId == undefined) {
		patientId = 0;
	}

	if (userId == "" || userId == null || userId == undefined) {
		userId = 0;
	}

		if (from == "" || from == null || to == '' || to == null) {
			alert("Please  Select The Date First");
		} else {

			var inputs = [];
			inputs.push('from=' + encodeURIComponent(from));
			inputs.push('to=' + encodeURIComponent(to));
			inputs.push('patientId=' + encodeURIComponent(patientId));
			inputs.push('userId=' + encodeURIComponent(userId));
			inputs.push('saletype=' + encodeURIComponent(saletype));

			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getBillwiseSaleReportReturn",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					setBillWiseSaleResultReturn(r);
				}
			});

		}
}




/************
 *@author	: Ajay Khandare
 *@date		:  12-feb-2019
 *@code		:set 
 ********/

function setBillWiseSaleResult(result) {
	var r = result;
	var divContent = "";
	total = 0;
	var j = 1;

	divContent = divContent
			+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";

	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + "<tr><td>" + j + "</td><td>"
				+ r[i].patientId + "</td><td>" + r[i].patientName
				+ "</td><td>" + r[i].patientSaleBillId + "</td><td>"
				+ r[i].productName + "</td><td>" + r[i].patientBillDate
				+ "</td><td>" + r[i].patientSaleForTime + "</td><td>"
				+ r[i].patientSlaveAmt.toFixed(2) + "</td><td>"
				+ r[i].patientSaleSlaveDiscAmt.toFixed(2) + "</td><td>"
				+ r[i].patientSaleSlaveRecAmt.toFixed(2) + "</td><td>"
				+ r[i].patientSaleSlaveRemAmt.toFixed(2) + "</td><td>"
				+ r[i].salesBillNarration + "</td><td>"
				+ r[i].saleUserName + "</td></tr>";
		
		total=total+parseFloat(r[i].patientSaleSlaveRecAmt);
		
		j++;

	}

	$("#patientSaleData").html(divContent);
	$('#totalAmount').val(total.toFixed(2));
}

function setBillWiseSaleResultReturn(result) {
	var r = result;
	var divContent = "";
	total = 0;

	divContent = divContent
			+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";

	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + "<tr><td>" + i + "</td><td>"
				+ r[i].patientId + "</td><td>" + r[i].patientName
				+ "</td><td>" + r[i].patientSaleBillId + "</td><td>"
				+ r[i].productName + "</td><td>" + r[i].patientBillDate
				+ "</td><td>" + r[i].patientSaleForTime + "</td><td>"
				+ r[i].patientSlaveAmt.toFixed(2) + "</td><td>"
				+ r[i].salesBillNarration + "</td><td>"
				+ r[i].saleUserName + "</td><td>"
				+ r[i].creditReturn + "</td></tr>";

	}

	$("#patientSaleData").html(divContent);
}
