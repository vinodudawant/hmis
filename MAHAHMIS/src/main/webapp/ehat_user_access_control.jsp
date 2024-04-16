 <style>
#pleaseWait {
			width:100%;
			height:100%;
			position:fixed;
			z-index:10000000;
			top:0;
			left:0;
			right:0;
			bottom:0;
			margin:auto;
			background-color: #272424;
			opacity: 0.7;
}
</style>
<!--<div id="pleaseWait" style="text-align: center;">
        <img style="margin-top: 250px;" height="43px" src="images/loading_black.gif"/>
        <div style="margin-top: 10px; color: white">
            <b>Please wait...</b>
        </div>
</div> -->

<%
HttpSession userAccesSession = request.getSession();
String ehatUserModuleAccessView = "";
if(userAccesSession.getAttribute("moduleViewHashSet")!=null){
	ehatUserModuleAccessView = userAccesSession.getAttribute("moduleViewHashSet").toString().replaceAll("\\[|\\]", "");
}
String ehatUserModuleAccessEdit = "";
if(userAccesSession.getAttribute("moduleEditHashSet")!=null){
	ehatUserModuleAccessEdit = userAccesSession.getAttribute("moduleEditHashSet").toString().replaceAll("\\[|\\]", "");
}
String ehatUserModuleAccessDelete = "";
if(userAccesSession.getAttribute("moduleDeleteHashSet")!=null){
	ehatUserModuleAccessDelete = userAccesSession.getAttribute("moduleDeleteHashSet").toString().replaceAll("\\[|\\]", "");
}
String ehatUserSubModuleAccessView = "";
if(userAccesSession.getAttribute("subModuleViewHashSet")!=null){
	ehatUserSubModuleAccessView = userAccesSession.getAttribute("subModuleViewHashSet").toString().replaceAll("\\[|\\]", "");
}
String ehatUserSubModuleAccessEdit = "";
if(userAccesSession.getAttribute("subModuleEditHashSet")!=null){
	ehatUserSubModuleAccessEdit = userAccesSession.getAttribute("subModuleEditHashSet").toString().replaceAll("\\[|\\]", "");
}
String ehatUserSubModuleAccessDelete = "";
if(userAccesSession.getAttribute("subModuleDeleteHashSet")!=null){
	ehatUserSubModuleAccessDelete = userAccesSession.getAttribute("subModuleDeleteHashSet").toString().replaceAll("\\[|\\]", "");
}
String ehatUserSubModuleOnOff = "";
if(userAccesSession.getAttribute("subModuleOnOffHashSet")!=null){
	ehatUserSubModuleOnOff = userAccesSession.getAttribute("subModuleOnOffHashSet").toString().replaceAll("\\[|\\]", "");
}
%>
<script>
//set Current page Id on page load 

function setPageURL(){

	var pageId=0;
	jQuery.ajax({
		async : false,
		type : "POST",
		data :{
			"url" : window.location.href
		},
		url : "useraccess/setUrl",
		catche : false,
		success : function(r) {
			pageId = r;
		}
	});
	return pageId;
}

//set Current page Id on browser tab change
var vis = (function(){
	var stateKey, eventKey, keys = {
		hidden: "visibilitychange",
		webkitHidden: "webkitvisibilitychange",
		mozHidden: "mozvisibilitychange",
		msHidden: "msvisibilitychange"
	};
	for (stateKey in keys) {
		if (stateKey in document) {
			eventKey = keys[stateKey];
			break;
		}
	}
	return function(c) {
		if (c) {
			document.addEventListener(eventKey, c);
			//document.addEventListener("blur", c);
			//document.addEventListener("focus", c);
		}
		return !document[stateKey];
	}
})();

vis(function(){
	var title = vis() ? true : false;
	if(title){
		jQuery.ajax({
			async : true,
			type : "POST",
			data :{
				"url" : window.location.href
			},
			url : "useraccess/setUrl",
			catche : false,
			success : function(r) {

			}
		});
	}
});

//set Current page Id on sub module click
/* $(document).on('click', '.sidebar-menu .ehatSubModule', function () {
	var currentPageId = $(this).attr('class').split("_")[2];
	setCurrentPageId(currentPageId);
}); */

//set Current page Id on sub module click
/* $(document).on('click', '.btn .ehatSubModule', function () {
	var currentPageId = $(this).attr('class').split("_")[2];
	alert("onclick :"+currentPageId);
	setCurrentPageId(currentPageId);
}); */

//set Current page Id on module click
$(document).on('click', '.ehatModule', function () {
	var currentPageId = $(this).attr('value');
	var moduleId = $(this).attr('id').split("_")[2];
	jQuery.ajax({
		async : true,
		type : "POST",
		data :{
			"currentPageId" : currentPageId,
			"moduleId" : moduleId
		},
		url : "useraccess/setModuleId",
		catche : false,
		success : function(r) {
			
		}
	});
});

//for setting current page id
function setCurrentPageId(currentPageId){
	jQuery.ajax({
		async : true,
		type : "POST",
		data :{
			"currentPageId" : currentPageId.split(" ")[0]
		},
		url : "useraccess/setCurrentPageId",
		catche : false,
		success : function(r) {
			
		}
	});
}

$(document).ready(function(){

	setPageURL();
	setTimeout(function(){userAccess();},300);
});

function userAccess() {
	var currentPageId = setPageURL(); <%-- "<%=userAccesSession.getAttribute("currentPageId")%>"; --%>
	var userModuleAccessView = "<%=ehatUserModuleAccessView%>";
  	var userModuleAccessEdit = "<%=ehatUserModuleAccessEdit%>";
   	var userModuleAccessDelete = "<%=ehatUserModuleAccessDelete%>";
   	var userSubModuleAccessView = "<%=ehatUserSubModuleAccessView%>";
   	var userSubModuleAccessEdit = "<%=ehatUserSubModuleAccessEdit%>";
   	var userSubModuleAccessDelete = "<%=ehatUserSubModuleAccessDelete%>";
   	var userSubModuleOnOff = "<%=ehatUserSubModuleOnOff%>";
    /* console.log("userModuleAccessView:"+userModuleAccessView);
    console.log("userModuleAccessEdit:"+userModuleAccessEdit);
    console.log("userModuleAccessDelete:"+userModuleAccessDelete);
    console.log("userSubModuleAccessView:"+userSubModuleAccessView);
    console.log("userSubModuleAccessEdit:"+userSubModuleAccessEdit);
    console.log("userSubModuleAccessDelete:"+userSubModuleAccessDelete);
    console.log("userSubModuleOnOff:"+userSubModuleOnOff);
    console.log("currentPageId:"+currentPageId); */ 
		if(userModuleAccessView!=null && userModuleAccessView!=""){
			var moduleViewAccess=userModuleAccessView.split(",");
			for(var i=0;i<moduleViewAccess.length;i++){
				$('#ehat_module_'+moduleViewAccess[i].trim()).show();
			}
		}
		if(userModuleAccessEdit!=null && userModuleAccessEdit!=""){
			var moduleEditAccess=userModuleAccessEdit.split(",");
			for(var i=0;i<moduleEditAccess.length;i++){
				$('#ehat_module_'+moduleEditAccess[i].trim()).show();
			}
		}
		if(userModuleAccessDelete!=null && userModuleAccessDelete!=""){
			var moduleDeleteAccess=userModuleAccessDelete.split(",");
			for(var i=0;i<moduleDeleteAccess.length;i++){
				$('#ehat_module_'+moduleDeleteAccess[i].trim()).show();
			}
		}
		if(userSubModuleAccessView!=null && userSubModuleAccessView!=""){
			var subModuleViewAccess=userSubModuleAccessView.split(",");
			for(var i=0;i<subModuleViewAccess.length;i++){
				$('.ehat_subModule_'+subModuleViewAccess[i].trim()).show();
				
				$('.editUserAccess').attr('disabled','disabled');
				$('.deleteUserAccess').attr('disabled','disabled');
				
				if(subModuleViewAccess[i].trim()=="1"){
					$('#addnewCommonAdvanceLabel').removeAttr('onclick');
					$('#updateCommonAdvanceAmountLabel').removeAttr('onclick');
					$('#refundCommonAdvanceAmountLabel').removeAttr('onclick');
				}
				
				if(subModuleViewAccess[i].trim()=="4"){
					$('#saveParticularBtn').removeAttr('onclick');
					$('#editRefundReceiptLabel').removeAttr('onclick');
					$('#editRefundReceiptLabel').removeAttr('data-toggle');
				}
				
				if(subModuleViewAccess[i].trim()=="9" || subModuleViewAccess[i].trim()=="43"){
					$('#createDivNA').removeAttr('onclick');
					$('#removeDivNA').removeAttr('onclick');
					$('#createDivForDoctorAvailable').removeAttr('onclick');
					$('#removeDivForDoctorAvailable').removeAttr('onclick');
				}
				
				if(subModuleViewAccess[i].trim()=="26"){
					$('#newIPDReceiptLabel').removeAttr('onclick');
					$('#showEditReceiptPopupLabel').removeAttr('onclick');
					$('#convertAdvanceInSecurityDepositLabel').removeAttr('onclick');
					$('#convertSecurityDepositToAdvanceLabel').removeAttr('onclick');
					$('#newPerticularLabel').removeAttr('onclick');
					$('#editPerticularLabel').removeAttr('onclick');
					$('#deletePerticularLabel').removeAttr('onclick');
				}
				
				if(subModuleViewAccess[i].trim()=="27"){
					$('#newIPDReceiptLabel').removeAttr('onclick');
					$('#editIPDReceiptLabel').removeAttr('onclick');
					$('#newPerticularLabel').removeAttr('onclick');
					$('#editPerticularLabel').removeAttr('onclick');
					$('#deletePerticularLabel').removeAttr('onclick');
				}
				
				if(subModuleViewAccess[i].trim()=="29" || subModuleViewAccess[i].trim()=="7"){
					$('#newIPDReceiptLabel').removeAttr('onclick');
					$('#convertAdvanceInSecurityDepositLabel').removeAttr('onclick');
					$('#convertSecurityDepositToAdvanceLabel').removeAttr('onclick');
				}
				
				if(subModuleViewAccess[i].trim()=="41" || subModuleViewAccess[i].trim()=="225"){
					$('#enableAllergyTextBoxesLabel').removeAttr('onclick');
				//	$('#editAllergyAlertsLabel').removeAttr('onclick');
				//	$('#deleteAllergyAlertsLabel').removeAttr('onclick');
					$('#editAllergyAlertsLabel').attr('onclick');
					$('#deleteAllergyAlertsLabel').attr('onclick');
				
					$('#setAddICDCodeTempLabel').removeAttr('onclick');
					$('#deleteIcd10LCodeLabel').removeAttr('onclick');
					
					$('#enableAsmntTextBoxesProvisionalLabel').removeAttr('onclick');
					$('#editAssesmentProvisionalLabel').removeAttr('onclick');
					$('#deleteAssessmentProvisionalLabel').removeAttr('onclick');
					$('#confirmDiagnosisProvisionalLabel').removeAttr('onclick');
					$('#enableAsmntTextBoxesConfirmLabel').removeAttr('onclick');
					$('#editAssesmentConfirmLabel').removeAttr('onclick');
					$('#deleteAssessmentConfirmLabel').removeAttr('onclick');
					$('#provisionalDiagnosisConfirmLabel').removeAttr('onclick');
					
					$('#refreshDocPrescriptionTemplateMedicineLabel').removeAttr('onclick');
					$('#editDocPrescriptionTemplateMedicinelabel').removeAttr('onclick');
					$('#deleteDocPrescriptionTemplateMedicineLabel').removeAttr('onclick');
					
					$('#enableTextBoxesLabel').removeAttr('onclick');
					$('#editPrescriptionLabel').removeAttr('onclick');
					$('#deletePrescriptionLabel').removeAttr('onclick');
					
					$('#editCPOE_TestLabel').removeAttr('onclick');
					$('#deleteCPOE_TestLabel').removeAttr('onclick');
					
					$('#enableAddUpdateReportInstructionLabel').removeAttr('onclick');
					$('#editReportInstructionLabel').removeAttr('onclick');
					$('#deleteReportInstructionLabel').removeAttr('onclick');
					
					//Order Form
					$('#enableTextBoxesLabel').removeAttr('onclick');
					$('#editOrderFormLabel').removeAttr('onclick');
					$('#deleteOrderFormLabel').removeAttr('onclick');
					
					//Admission Note
					$('#updateAdmissionNote').removeAttr('href');
				}
				
				if(subModuleViewAccess[i].trim()=="47"){
					$('#enableAddUpdatePrescriptionInstructionLabel').removeAttr('onclick');
					$('#editPrescriptionInstructionLabel').removeAttr('onclick');
					$('#deletePrescriptionInstructionLabel').removeAttr('onclick');
				}
				
				if(subModuleViewAccess[i].trim()=="51"){
					$('#enableAddUpdateReportInstructionLabel').removeAttr('onclick');
					$('#editReportInstructionLabel').removeAttr('onclick');
					$('#deleteReportInstructionLabel').removeAttr('onclick');
				}
				
				if(subModuleViewAccess[i].trim()=="227"){
					$('#administrateMedication').removeAttr('onclick');
					$('#reverseMedication').removeAttr('onclick');
				}
				
				if(subModuleViewAccess[i].trim()=="228"){
					//IPD services
					$('#refreshIPDServicesLabel').removeAttr('onclick');
					$('#editIPDServicesLabel').removeAttr('onclick');
					$('#deleteIPDServicesLabel').removeAttr('onclick');
				}
				
				if(subModuleViewAccess[i].trim()=="233"){
					//Order Form
					$('#enableTextBoxesLabel').removeAttr('onclick');
					$('#editOrderFormLabel').removeAttr('onclick');
					$('#deleteOrderFormLabel').removeAttr('onclick');
				}
				
				if(subModuleViewAccess[i].trim()=="238"){
					$('#btnAddDept').removeAttr('onclick');
					$('#btnRemoveDept').removeAttr('onclick');
					$('#btnAddSpeciality').removeAttr('onclick');
					$('#btnRemoveSpeciality').removeAttr('onclick');
				}
				
			}
		}
		if(userSubModuleAccessEdit!=null && userSubModuleAccessEdit!=""){
			var subModuleEditAccess=userSubModuleAccessEdit.split(",");
			for(var i=0;i<subModuleEditAccess.length;i++){
				$('.ehat_subModule_'+subModuleEditAccess[i].trim()).show();
				$('.deleteUserAccess').attr('disabled','disabled');
				var page = currentPageId.split(",");
				for(var j=0;j<page.length;j++){
				if(page[j]==subModuleEditAccess[i].trim() || page[j]=="0"){
					$('.editUserAccess').removeAttr('disabled');
				
				if(subModuleEditAccess[i].trim()=="1"){
					$('#addnewCommonAdvanceLabel').attr('onclick','addnewCommonAdvance()');
					$('#updateCommonAdvanceAmountLabel').attr('onclick','updateCommonAdvanceAmount()');
					$('#refundCommonAdvanceAmountLabel').attr('onclick','refundCommonAdvanceAmount()');
					// Patient View,  Edit
					var CallFor = $("#CallFor").html();
					if (CallFor == "View") {
						$('.editUserAccess').attr('disabled','disabled');
					}
				}
				
				if(subModuleEditAccess[i].trim()=="4"){
					$('#saveParticularBtn').attr('onclick','saveOpdBillParticular()');
					$('#editRefundReceiptLabel').attr('onclick','editRefundReceiptDetails("OPD")');
					$('#editRefundReceiptLabel').attr('data-toggle','modal');
				}
				
				if(subModuleEditAccess[i].trim()=="9" || subModuleEditAccess[i].trim()=="43"){
					$('#createDivNA').attr('onclick','createDivNA()');
					$('#removeDivNA').attr('onclick','removeDivNA()');
					$('#createDivForDoctorAvailable').attr('onclick','createDivForDoctorAvailable()');
					$('#removeDivForDoctorAvailable').attr('onclick','removeDivForDoctorAvailable()');
				}
				
				if(subModuleEditAccess[i].trim()=="26"){
					$('#newIPDReceiptLabel').attr('onclick','newIPDReceipt()');
					$('#showEditReceiptPopupLabel').attr('onclick','showEditReceiptPopup()');
					$('#convertAdvanceInSecurityDepositLabel').attr('onclick','convertAdvanceInSecurityDeposit()');
					$('#convertSecurityDepositToAdvanceLabel').attr('onclick','convertSecurityDepositToAdvance()');
					$('#newPerticularLabel').attr('onclick','newPerticular()');
					$('#editPerticularLabel').attr('onclick','editPerticular()');
					$('#deletePerticularLabel').removeAttr('onclick');
				}
				
				if(subModuleEditAccess[i].trim()=="27"){
					$('#newIPDReceiptLabel').attr('onclick','newIPDReceipt()');
					$('#editIPDReceiptLabel').attr('onclick','editIPDReceipt()');
					$('#newPerticularLabel').attr('onclick','newPerticular()');
					$('#editPerticularLabel').attr('onclick','editPerticular()');
					$('#deletePerticularLabel').removeAttr('onclick');
				}
				
				if(subModuleEditAccess[i].trim()=="29" || subModuleEditAccess[i].trim()=="7"){
					$('#newIPDReceiptLabel').attr('onclick','newIPDReceipt()');
					$('#convertAdvanceInSecurityDepositLabel').attr('onclick','convertAdvanceInSecurityDeposit()');
					$('#convertSecurityDepositToAdvanceLabel').attr('onclick','convertSecurityDepositToAdvance()');
				}
				
				if(subModuleEditAccess[i].trim()=="41" || subModuleEditAccess[i].trim()=="225"){
					$('#enableAllergyTextBoxesLabel').attr('onclick','enableAllergyTextBoxes()');

					// commented by aniket kanse / for new OPD flow, 06/01/2022
					//$('#editAllergyAlertsLabel').attr('onclick','editAllergyAlerts()');
					$('#editAllergyAlertsLabel').attr('onclick','editOPDAllergyAlerts()');
					
					//$('#deleteAllergyAlertsLabel').removeAttr('onclick');
					$('#deleteAllergyAlertsLabel').attr('onclick','deleteOPDAllergyAlerts()');

					$('#setAddICDCodeTempLabel').attr('onclick','setAddICDCodeTemp()');
					$('#deleteIcd10LCodeLabel').removeAttr('onclick');
					
					$('#enableAsmntTextBoxesProvisionalLabel').attr('onclick','enableAsmntTextBoxes("Provisional");');
					$('#editAssesmentProvisionalLabel').attr('onclick','editAssesment("Provisional");');
					$('#deleteAssessmentProvisionalLabel').removeAttr('onclick');
					$('#confirmDiagnosisProvisionalLabel').attr('onclick','setDiagnosisType("Confirmed");');
					$('#enableAsmntTextBoxesConfirmLabel').attr('onclick','enableAsmntTextBoxes("Confirmed");');
					$('#editAssesmentConfirmLabel').attr('onclick','editAssesment("Confirmed");');
					$('#deleteAssessmentConfirmLabel').removeAttr('onclick');
					$('#provisionalDiagnosisConfirmLabel').attr('onclick','setDiagnosisType("Provisional");');
					
					$('#refreshDocPrescriptionTemplateMedicineLabel').attr('onclick','refreshDocPrescriptionTemplateMedicine()');

					// commented by aniket kanse, for new OPD flow, 14 JAN 22
					/* $('#editDocPrescriptionTemplateMedicinelabel').attr('onclick','editDocPrescriptionTemplateMedicine()'); */
					$('#editDocPrescriptionTemplateMedicinelabel').attr('onclick','editOPDPrescriptionTemplateMedicine()');
					
					$('#deleteDocPrescriptionTemplateMedicineLabel').removeAttr('onclick');
					
					$('#enableTextBoxesLabel').attr('onclick','enableTextBoxes()');
					// commented by aniket kanse, for new OPD flow, 05 JAN 2022
					/* $('#editPrescriptionLabel').attr('onclick','editPrescription()'); */
					$('#editPrescriptionLabel').attr('onclick','editOPDPrescriptions()');
					$('#deletePrescriptionLabel').removeAttr('onclick');
					
					$('#editCPOE_TestLabel').attr('onclick','editCPOE_Test()');
					$('#deleteCPOE_TestLabel').removeAttr('onclick');
					
					$('#enableAddUpdateReportInstructionLabel').attr('onclick','enableAddUpdateReportInstruction()');
					$('#editReportInstructionLabel').attr('onclick','editReportInstruction()');
					$('#deleteReportInstructionLabel').removeAttr('onclick');
					
					//Order Form
					$('#enableTextBoxesLabel').attr('onclick','enableTextBoxes()');
					$('#editOrderFormLabel').attr('onclick','editOrderForm()');
					$('#deleteOrderFormLabel').removeAttr('onclick');
					
					//Admission Note
					$('#updateAdmissionNote').attr('onclick','javascript:updateAdmissionNote();');
				}
				
				if(subModuleEditAccess[i].trim()=="47"){
					$('#enableAddUpdatePrescriptionInstructionLabel').attr('onclick','enableAddUpdatePrescriptionInstruction()');
					$('#editPrescriptionInstructionLabel').attr('onclick','editPrescriptionInstruction()');
					$('#deletePrescriptionInstructionLabel').removeAttr('onclick');
				}
				
				if(subModuleEditAccess[i].trim()=="51"){
					$('#enableAddUpdateReportInstructionLabel').attr('onclick','enableAddUpdateReportInstruction()');
					$('#editReportInstructionLabel').attr('onclick','editReportInstruction()');
					$('#deleteReportInstructionLabel').removeAttr('onclick');
				}
				
				if(subModuleEditAccess[i].trim()=="227"){
					$('#administrateMedication').attr('onclick','administratedDoneReverse("Done")');
					$('#reverseMedication').attr('onclick','administratedDoneReverse("Reverse")');
				}
				
				if(subModuleEditAccess[i].trim()=="228"){
					//IPD services
					$('#refreshIPDServicesLabel').attr('onclick','refreshIPDServices()');
					$('#editIPDServicesLabel').attr('onclick','editIPDServices()');
					$('#deleteIPDServicesLabel').removeAttr('onclick');
				}
				
				if(subModuleEditAccess[i].trim()=="233"){
					//Order Form
					$('#enableTextBoxesLabel').attr('onclick','enableTextBoxes()');
					$('#editOrderFormLabel').attr('onclick','editOrderForm()');
					$('#deleteOrderFormLabel').removeAttr('onclick');
				}
				
				if(subModuleEditAccess[i].trim()=="238"){
					$('#btnAddDept').attr('onclick','addThemDept()');
					$('#btnRemoveDept').removeAttr('onclick');
					$('#btnAddSpeciality').attr('onclick','addThemSpe()');
					$('#btnRemoveSpeciality').removeAttr('onclick');
				}
				}
				}
			}
		}
		if(userSubModuleAccessDelete!=null && userSubModuleAccessDelete!=""){
			var subModuleDeleteAccess=userSubModuleAccessDelete.split(",");
			for(var i=0;i<subModuleDeleteAccess.length;i++){
				$('.ehat_subModule_'+subModuleDeleteAccess[i].trim()).show();
				var page = currentPageId.split(",");
				for(var j=0;j<page.length;j++){
				if(page[j]==subModuleDeleteAccess[i].trim() || page[j]=="0"){
					$('.editUserAccess').removeAttr('disabled');
					$('.deleteUserAccess').removeAttr('disabled');
				
				if(subModuleDeleteAccess[i].trim()=="1"){
					$('#addnewCommonAdvanceLabel').attr('onclick','addnewCommonAdvance()');
					$('#updateCommonAdvanceAmountLabel').attr('onclick','updateCommonAdvanceAmount()');
					$('#refundCommonAdvanceAmountLabel').attr('onclick','refundCommonAdvanceAmount()');
					// Patient View,  Edit
					var CallFor = $("#CallFor").html();
					if (CallFor == "View") {
						$('.editUserAccess').attr('disabled','disabled');
					} 
				}
				
				if(subModuleDeleteAccess[i].trim()=="4"){
					$('#saveParticularBtn').attr('onclick','saveOpdBillParticular()');
					$('#editRefundReceiptLabel').attr('onclick','editRefundReceiptDetails("OPD")');
					$('#editRefundReceiptLabel').attr('data-toggle','modal');
				}
				
				if(subModuleDeleteAccess[i].trim()=="9" || subModuleDeleteAccess[i].trim()=="43"){
					$('#createDivNA').attr('onclick','createDivNA()');
					$('#removeDivNA').attr('onclick','removeDivNA()');
					$('.NACheckbox').removeAttr('disabled');
					$('#createDivForDoctorAvailable').attr('onclick','createDivForDoctorAvailable()');
					$('#removeDivForDoctorAvailable').attr('onclick','removeDivForDoctorAvailable()');
					$('.doctorAvailableCheckbox').removeAttr('disabled');
				}
				
				if(subModuleDeleteAccess[i].trim()=="26"){
					$('#newIPDReceiptLabel').attr('onclick','newIPDReceipt()');
					$('#showEditReceiptPopupLabel').attr('onclick','showEditReceiptPopup()');
					$('#convertAdvanceInSecurityDepositLabel').attr('onclick','convertAdvanceInSecurityDeposit()');
					$('#convertSecurityDepositToAdvanceLabel').attr('onclick','convertSecurityDepositToAdvance()');
					$('#newPerticularLabel').attr('onclick','newPerticular()');
					$('#editPerticularLabel').attr('onclick','editPerticular()');
					$('#deletePerticularLabel').attr('onclick','deletePerticular()');
				}
				
				if(subModuleDeleteAccess[i].trim()=="27"){
					$('#newIPDReceiptLabel').attr('onclick','newIPDReceipt()');
					$('#editIPDReceiptLabel').attr('onclick','editIPDReceipt()');
					$('#newPerticularLabel').attr('onclick','newPerticular()');
					$('#editPerticularLabel').attr('onclick','editPerticular()');
					$('#deletePerticularLabel').attr('onclick','deletePerticular()');
				}
				
				if(subModuleDeleteAccess[i].trim()=="29" || subModuleDeleteAccess[i].trim()=="7"){
					$('#newIPDReceiptLabel').attr('onclick','newIPDReceipt()');
					$('#convertAdvanceInSecurityDepositLabel').attr('onclick','convertAdvanceInSecurityDeposit()');
					$('#convertSecurityDepositToAdvanceLabel').attr('onclick','convertSecurityDepositToAdvance()');
				}
				
				if(subModuleDeleteAccess[i].trim()=="41" || subModuleDeleteAccess[i].trim()=="225"){
					$('#enableAllergyTextBoxesLabel').attr('onclick','enableAllergyTextBoxes()');

					// commented by aniket kanse / for new OPD flow, 06/01/2022
 					//$('#editAllergyAlertsLabel').attr('onclick','editAllergyAlerts()');
 					//$('#deleteAllergyAlertsLabel').attr('onclick','deleteAllergyAlerts()');

					$('#editAllergyAlertsLabel').attr('onclick','editOPDAllergyAlerts()');
					$('#deleteAllergyAlertsLabel').attr('onclick','deleteOPDAllergyAlerts()');

					
					$('#setAddICDCodeTempLabel').attr('onclick','setAddICDCodeTemp()');
					$('#deleteIcd10LCodeLabel').attr('onclick','deleteIcd10LCode()');
					
					$('#enableAsmntTextBoxesProvisionalLabel').attr('onclick','enableAsmntTextBoxes("Provisional");');
					$('#editAssesmentProvisionalLabel').attr('onclick','editAssesment("Provisional");');
					$('#deleteAssessmentProvisionalLabel').attr('onclick','deleteAssessment("Provisional");');
					$('#confirmDiagnosisProvisionalLabel').attr('onclick','setDiagnosisType("Confirmed");');
					$('#enableAsmntTextBoxesConfirmLabel').attr('onclick','enableAsmntTextBoxes("Confirmed");');
					$('#editAssesmentConfirmLabel').attr('onclick','editAssesment("Confirmed");');
					$('#deleteAssessmentConfirmLabel').attr('onclick','deleteAssessment("Confirmed");');
					$('#provisionalDiagnosisConfirmLabel').attr('onclick','setDiagnosisType("Provisional");');
					
					$('#refreshDocPrescriptionTemplateMedicineLabel').attr('onclick','refreshDocPrescriptionTemplateMedicine()');

					// commented by aniket kanse, for new OPD flow, 14 JAN 22
					/* $('#editDocPrescriptionTemplateMedicinelabel').attr('onclick','editDocPrescriptionTemplateMedicine()'); */
					$('#editDocPrescriptionTemplateMedicinelabel').attr('onclick','editOPDPrescriptionTemplateMedicine()');

					// commented by aniket kanse, for new OPD flow, 14 JAN 22
					/* $('#deleteDocPrescriptionTemplateMedicineLabel').attr('onclick','deleteDocPrescriptionTemplateMedicine()'); */
					$('#deleteDocPrescriptionTemplateMedicineLabel').attr('onclick','deleteOPDPrescriptionTemplateMedicine()');

					// commented by aniket kanse, for new OPD flow, 05 JAN 2022
 					//$('#enableTextBoxesLabel').attr('onclick','enableTextBoxes()');
					/* $('#editPrescriptionLabel').attr('onclick','editPrescription()'); */
 					//$('#deletePrescriptionLabel').attr('onclick','deletePrescription()');
					
					// added below by aniket kanse, for new OPD flow, 05 JAN 2022
					$('#enableTextBoxesLabel').attr('onclick','enableTextBoxes()');
					$('#editPrescriptionLabel').attr('onclick','editOPDPrescriptions()');
					$('#deletePrescriptionLabel').attr('onclick','deleteOPDPrescriptions()');

					// added below by aniket kanse, for new IVF flow, 06 MAY 2022
					$('#enableTextBoxesLabelIVF').attr('onclick','enableTextBoxesIVF()');
					$('#editPrescriptionLabelIVF').attr('onclick','editOPDPrescriptionsIVF()');
					$('#deletePrescriptionLabelIVF').attr('onclick','deleteOPDPrescriptionsIVF()');
					
					$('#editCPOE_TestLabel').attr('onclick','editCPOE_Test()');
					$('#deleteCPOE_TestLabel').attr('onclick','deleteCPOE_Test()');
					
					$('.groupInstructionCheckbox').removeAttr('disabled');
					
					$('#enableAddUpdateReportInstructionLabel').attr('onclick','enableAddUpdateReportInstruction()');
					$('#editReportInstructionLabel').attr('onclick','editReportInstruction()');
					$('#deleteReportInstructionLabel').attr('onclick','deleteReportInstruction()');
					
					//Order Form
					$('#enableTextBoxesLabel').attr('onclick','enableTextBoxes()');
					$('#editOrderFormLabel').attr('onclick','editIPDTreatmentAtDicharge()');
					$('#deleteOrderFormLabel').attr('onclick','deleteIPDTreatmentAtDicharge()');
					
					//Admission Note
					$('#updateAdmissionNote').attr('onclick','javascript:updateAdmissionNote();');
					
				}
				
				if(subModuleDeleteAccess[i].trim()=="47"){
					$('#enableAddUpdatePrescriptionInstructionLabel').attr('onclick','enableAddUpdatePrescriptionInstruction()');
					$('#editPrescriptionInstructionLabel').attr('onclick','editPrescriptionInstruction()');
					$('#deletePrescriptionInstructionLabel').attr('onclick','deletePrescriptionInstruction()');
				}
				
				if(subModuleDeleteAccess[i].trim()=="50"){
					$('.groupInstructionCheckbox').removeAttr('disabled');
				}
				
				if(subModuleDeleteAccess[i].trim()=="51"){
					$('#enableAddUpdateReportInstructionLabel').attr('onclick','enableAddUpdateReportInstruction()');
					$('#editReportInstructionLabel').attr('onclick','editReportInstruction()');
					$('#deleteReportInstructionLabel').attr('onclick','deleteReportInstruction()');
				}
				
				if(subModuleDeleteAccess[i].trim()=="227"){
					$('#administrateMedication').attr('onclick','administratedDoneReverse("Done")');
					$('#reverseMedication').attr('onclick','administratedDoneReverse("Reverse")');
				}
				
				if(subModuleDeleteAccess[i].trim()=="228"){
					$('.nursingChartCheckbox').removeAttr('disabled');
					$('.ipdMaterialCheckbox').removeAttr('disabled');
					
					//IPD services
					$('#refreshIPDServicesLabel').attr('onclick','refreshIPDServices()');
					$('#editIPDServicesLabel').attr('onclick','editIPDServices()');
					$('#deleteIPDServicesLabel').attr('onclick','deleteIPDServices()');
					
				}
				
				if(subModuleDeleteAccess[i].trim()=="233"){
					//Order Form
					$('#enableTextBoxesLabel').attr('onclick','enableTextBoxes()');
					$('#editOrderFormLabel').attr('onclick','editOrderForm()');
					$('#deleteOrderFormLabel').attr('onclick','deleteOrderForm()');
				}
				
				if(subModuleDeleteAccess[i].trim()=="238"){
					$('#btnAddDept').attr('onclick','addThemDept()');
					$('#btnRemoveDept').attr('onclick','RemoveThemDept()');
					$('#btnAddSpeciality').attr('onclick','addThemSpe()');
					$('#btnRemoveSpeciality').attr('onclick','RemoveThemSpl()');
				}
				
				if(subModuleDeleteAccess[i].trim()=="240"){
					$('.holidayCheckbox').removeAttr('disabled');
				}
				
				if(subModuleDeleteAccess[i].trim()=="256"){
					$('.chartViewCheckbox').removeAttr('disabled');
				}
				
				if(subModuleDeleteAccess[i].trim()=="260"){
					$('.symptomsCheckbox').removeAttr('disabled');
				}
				
				if(subModuleDeleteAccess[i].trim()=="284"){
					$('.billComponentCheckbox').removeAttr('disabled');
				}
				}
				}
			}
		}
		if(userSubModuleOnOff!=null && userSubModuleOnOff!=""){
			var subModuleOnOffAccess=userSubModuleOnOff.split(",");
			for(var i=0;i<subModuleOnOffAccess.length;i++){
				$('.ehat_subModule_'+subModuleOnOffAccess[i].trim()).show();
				var page = currentPageId.split(",");
				for(var j=0;j<page.length;j++){
				if(page[j]==subModuleOnOffAccess[i].trim() || page[j]=="0"){
					$('.editUserAccess').removeAttr('disabled');
					$('.deleteUserAccess').removeAttr('disabled');
				}
				}
			}
		}
		$("body").removeClass("loading");
		$('#pleaseWait').hide();
}
</script>