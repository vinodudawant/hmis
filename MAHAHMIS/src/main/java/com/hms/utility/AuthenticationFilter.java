package com.hms.utility;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ResourceBundle;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter("/*")
public class AuthenticationFilter implements Filter {

	private ServletContext context;

	public void init(FilterConfig fConfig) throws ServletException {
		this.context = fConfig.getServletContext();
		this.context.log("AuthenticationFilter initialized");
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		HttpSession session = httpServletRequest.getSession();
		String url = httpServletRequest.getRequestURI();
		
		//Dashboard Changes for HealthBay Hospital Only(on/off)
		ResourceBundle resourceBundleEhat = ResourceBundle
				.getBundle("EhatEnterpriseConfigurationFile");
		String onlyForHealthBayFlow = resourceBundleEhat.getObject(
				"onlyForHealthBayFlow").toString();
		if(url.equals("/MAHAHMIS/Dashboard.jsp") && onlyForHealthBayFlow.equalsIgnoreCase("on")){
			httpServletResponse.sendRedirect("/MAHAHMIS/Dashboard1.jsp");
			return;
		}
		//End Dashboard Changes for HealthBay Hospital
		
		String action = request.getParameter("action");
		String checkUrl = "";
		if(httpServletRequest.getQueryString()!=null){
			checkUrl = httpServletRequest.getRequestURL()+"?"+httpServletRequest.getQueryString();
		}
		else{
			checkUrl = httpServletRequest.getRequestURL().toString();
		}
		if(checkUrl.contains("otandipdservices.jsp?pagename=bed") || checkUrl.contains("otandipdservices.jsp?pagename=gas")
			|| checkUrl.contains("otandipdservices.jsp?pagename=instrument") || checkUrl.contains("Sponsor_Type.jsp?pagename=company")
			|| checkUrl.contains("SponserorAgreement.jsp?pagename=company") || checkUrl.contains("Corporate_Account.jsp?pagename=company")
			|| checkUrl.contains("HallwisePolicyAC.jsp?pagename=company")	
		){
			checkUrl = checkUrl.substring(checkUrl.lastIndexOf('/')+1,checkUrl.length());
		}
		else if(checkUrl.contains(".jsp")){
			if(checkUrl.lastIndexOf(".jsp")>checkUrl.lastIndexOf('/')){
				checkUrl = checkUrl.substring(checkUrl.lastIndexOf('/')+1,checkUrl.lastIndexOf(".jsp"));
			}
		}
		else{
			checkUrl = checkUrl.substring(checkUrl.lastIndexOf('/')+1,checkUrl.length());
		}
		String currentPageId = EhatUserAccessControl.getCurrentPageId(checkUrl,session);
		if(!currentPageId.equals("0")){
			session.setAttribute("currentPageId", currentPageId);
		}
		//System.err.println("in filter before action:"+action + "***url: " + url + "**currentPageId:" + session.getAttribute("currentPageId"));
		if(url.endsWith("/") || url.contains("index.jsp")){
			session.invalidate();
			chain.doFilter(httpServletRequest, httpServletResponse);
			return;
		}
		if(url.contains("resources") || url.contains("images") || url.contains("Dashboard") || url.contains("setModuleId")
				|| url.contains("setCurrentPageId") || url.contains("UserServlet") || url.contains("setUrl")
				|| url.contains("user_access_not_access") || url.endsWith("/") || url.contains("IPD_OPD_Database") || url.contains("hospital_info")) {
			chain.doFilter(httpServletRequest, httpServletResponse);
			return;
		}
		if(action==null && ( currentPageId.equals(null) || currentPageId.equals("0"))) {
			chain.doFilter(httpServletRequest, httpServletResponse);
			return;
		}
		else {
			String isUserAccess = EhatUserAccessControl.isUserAccess(
					httpServletRequest, (String)session.getAttribute("currentPageId"));
		//	System.err.println((String)session.getAttribute("currentPageId")+"**in filter after action:"+action + "**isUserAccess:" + isUserAccess);
			if (isUserAccess == "" && (String)session.getAttribute("currentPageId")==null) {
				chain.doFilter(httpServletRequest, httpServletResponse);
				return;
			}
			if (isUserAccess == "" && action != null) {
				System.err.println("Sorry you dont have access");
				return;
			}
			if (isUserAccess == "") {
				System.err.println("Sorry you dont have access");
				httpServletResponse.sendRedirect("/MAHAHMIS/user_access_not_access.jsp");
				return;
			}
			else {
				if (isUserAccess.equals("delete")) {
					chain.doFilter(httpServletRequest, httpServletResponse);
					return;
				}
				else if (isUserAccess.equals("edit")) {
					if (action != null && action != "") {
						if (action.equals("DeleteNA") || action.equals("DeleteDoctorAvailable") || action.equals("deleteDoctor") 
							|| action.equals("deleteExpenseVoucher") || action.equals("deleteState") || action.equals("deleteDistrict") 
							|| action.equals("deleteTaluka") || action.equals("deleteCity") || action.equals("deleteReasonOfVisitDetails")
							|| action.equals("deleteAllergyAlerts") || action.equals("deleteAssessment") || action.equals("deleteDocPrescriptionTemplateMedicine")
							|| action.equals("deletePrepDocTemp") || action.equals("deletePrescription") || action.equals("deleteIcdCode")
							|| action.equals("deleteCPOE_Test") || action.equals("deletePCTreatmentInstruction") || action.equals("deleteReportInstruction")
							|| action.equals("deleteAdvice") || action.equals("deleteRadiotherapy") || action.equals("DeleteStudyRec")
							|| action.equals("deleteRouteType") || action.equals("deletePMedicineMaster") || action.equals("deletePrescriptionInstruction")
							|| action.equals("deleteRadiation") || action.equals("deleteOrderForm") || action.equals("DeleteMaterialUsed")
							|| action.equals("deleteIPDServices") || action.equals("deleteNursingNotes") || action.equals("deletePerticular")
							|| action.equals("deleteIPDDiscount") || action.equals("DeleteMedBillRec") || action.equals("deletePackageMaster")
							|| action.equals("DeleteHallType") || action.equals("DeleteSpecBed") || action.equals("DeleteHall") || action.equals("deleteChartName")
							|| action.equals("deletePatientTitle") || action.equals("deleteSymptoms") || action.equals("deleteInvstTest")
							|| action.equals("deleteTest") || action.equals("deleteBodyPart") || action.equals("deleteSponsoredDetails")
							|| action.equals("deleteCompanyAgreement") || action.equals("deleteDiscount") || action.equals("deleteChannelHospital")
							|| action.equals("deleteDocumentDetail") || action.equals("deleteFinancialDetail") || action.equals("deleteDocumentNumberDetail")
							|| action.equals("deleteTaxDetail") || action.equals("deleteCategoryDetail") || action.equals("deleteFormDetail")
							|| action.equals("deleteIngredientDetails") || action.equals("deleteManufacturerDetails") || action.equals("deleteWarehouseDetails")
							|| action.equals("deletePackingDetails") || action.equals("deleteShelfDetail") || action.equals("deleteUOMDetail")
							|| action.equals("deleteItemMasterDetail") || action.equals("deletePartyFormDetail")
							) {
							System.err.println("Sorry you dont have access to delete");
							httpServletResponse.setContentType("text/html;charset=UTF-8");
							PrintWriter out = response.getWriter();
							out.println("Sorry you don't have access");
							return;
						} else {
							chain.doFilter(httpServletRequest,
									httpServletResponse);
							return;
						}
					} 
					else if(url.contains("deleteIndent") || url.contains("deleteIndentTemplateDetails") || url.contains("deleteModule")
							|| url.contains("deleteSubModule") || url.contains("deleteRole") || url.contains("deleteProfile")
							){
						System.err.println("Sorry you dont have access");
						httpServletResponse.sendRedirect("/MAHAHMIS/user_access_not_access.jsp");
						return;
					}
					else {
						chain.doFilter(httpServletRequest, httpServletResponse);
						return;
					}
				}
				else if (isUserAccess.equals("view")) {
					if (action != null && action != "") {
						if (action.equals("saveCommonAdvanceAmount") || action.equals("Save_Now") || action.equals("saveSponsredDetails")
							|| action.equals("saveVisitingPatients") || action.equals("updateRecOPD") || action.equals("SaveOpdBillParticular") || action.equals("saveopdBillDetails")
							|| action.equals("saveRefundReceiptDetails") || action.equals("closeTreatment") || action.equals("saveReasonofCancel") || action.equals("saveAdvanceReceipt")
							|| action.equals("convertAdvanceInSecurityDeposit") || action.equals("convertSecurityDepositToAdvance") || action.equals("saveDoctorAvailability")
							|| action.equals("saveNA") || action.equals("DeleteNA") || action.equals("DeleteDoctorAvailable") || action.equals("saveConsentForm")
							|| action.equals("SaveReferToDoc") || action.equals("deleteDoctor") || action.equals("saveExpenseVoucher") || action.equals("deleteExpenseVoucher")
							|| action.equals("UpdateState") || action.equals("deleteState") || action.equals("UpdateDistrict") || action.equals("deleteDistrict")
							|| action.equals("UpdateTaluka") || action.equals("deleteTaluka") || action.equals("UpdateCity") || action.equals("deleteCity")
							|| action.equals("UpdateReasonOfVisit") || action.equals("deleteReasonOfVisitDetails")
							|| action.equals("saveBMIFromDoctorDesk") || action.equals("saveUpdateVaccinationPatientTreatment")
							|| action.equals("saveAllergyAlerts") || action.equals("deleteAllergyAlerts") || action.equals("saveCKEditorDocterDesk1")
							|| action.equals("saveAssessmentOpd") || action.equals("deleteAssessment") || action.equals("saveUpdateDocPrescriptionTemplateByID")
							|| action.equals("saveUpdatePrescriptionDocTemplateMed") || action.equals("deleteDocPrescriptionTemplateMedicine") || action.equals("deletePrepDocTemp")
							|| action.equals("savePrescription") || action.equals("deletePrescription") || action.equals("saveICDDiagnosisLevel1") || action.equals("deleteIcdCode")
							|| action.equals("SaveAssignTests") || action.equals("saveRadiologyAssignedTests") || action.equals("deleteCPOE_Test") || action.equals("saveCasualityAssignedTests")
							|| action.equals("savePhysiotherapyAssignedTests") || action.equals("saveOtherServicesAssignedTests") || action.equals("saveSKDetail")
							|| action.equals("savePCTreatmentInstruction") || action.equals("deletePCTreatmentInstruction") || action.equals("saveReportInstruction")
							|| action.equals("deleteReportInstruction") || action.equals("saveIndividualTreatmentInstruction") || action.equals("saveAdvice") || action.equals("deleteAdvice")
							|| action.equals("saveRadiotherapy") || action.equals("deleteRadiotherapy") || action.equals("saveUpdateStudyByID") || action.equals("saveStudyRecord")
							|| action.equals("saveChartReport") || action.equals("DeleteStudyRec") || action.equals("saveRouteType") || action.equals("deleteRouteType")
							|| action.equals("savePeadiatricMedicine") || action.equals("deletePMedicineMaster") || action.equals("savePrescriptionInstruction")
							|| action.equals("deletePrescriptionInstruction") || action.equals("saveRadiation") || action.equals("deleteRadiation") || action.equals("saveUpdateFetchDeleteImmunization")
							|| action.equals("ChangeBedState") || action.equals("saveDoctorRound") || action.equals("DeleteDRR") || action.equals("saveOrderFormDetails")
							|| action.equals("deleteOrderForm") || action.equals("updateAdmissionNote") || action.equals("UpdateDIC") || action.equals("SaveDIC") || action.equals("saveMaterialUsed")
							|| action.equals("DeleteMaterialUsed") || action.equals("saveIPDServices") || action.equals("deleteIPDServices") || action.equals("saveIPDDischargePlan")
							|| action.equals("saveDischargeProcess") || action.equals("saveIPDDischargeSummaryTemplate") || action.equals("saveAutoDischargeSummary")
							|| action.equals("saveNursingNotes") || action.equals("deleteNursingNotes") || action.equals("saveIpdBillParticular") || action.equals("editIpdBillParticular")
							|| action.equals("deletePerticular") || action.equals("saveAdvanceReceipt") || action.equals("saveEditIPDDiscount") || action.equals("deleteIPDDiscount")
							|| action.equals("saveIPDDoctorDiscount") || action.equals("GenerateInvoiceNo") || action.equals("SaveMedClinicDetail") || action.equals("DeleteMedBillRec")
							|| action.equals("insertPackageDetails") || action.equals("deletePackageMaster") || action.equals("saveHospitalDetails") || action.equals("saveHospitalAccDetails")
							|| action.equals("saveHospitalHoliday") || action.equals("deleteHospitalHoliday") || action.equals("saveDoctorSpeciality") || action.equals("saveHospitalOwnerDetails")
							|| action.equals("deleteHospitalOwner") || action.equals("InsertTaxDetails") || action.equals("DeleteTax") || action.equals("SaveHallTypeDetails")
							|| action.equals("DeleteHallType") || action.equals("SaveHallDetails") || action.equals("AddBeds") || action.equals("DeleteSpecBed")
							|| action.equals("DeleteHall") || action.equals("saveChartName") || action.equals("deleteChartName") || action.equals("savePatientTitle")
							|| action.equals("deletePatientTitle") || action.equals("saveSymDetail") || action.equals("deleteSymptoms") || action.equals("saveEditInvstTest")
							|| action.equals("deleteInvstTest") || action.equals("saveGroup") || action.equals("deleteTest") || action.equals("UpdateBodyPart")
							|| action.equals("deleteBodyPart") || action.equals("saveInvTestHallWiseCharges") || action.equals("UpdateTest") || action.equals("saveServicesHallWiseCharges")
							|| action.equals("SaveGrpCatWiseProCharge") || action.equals("saveSponsoredDetails") || action.equals("editSponsoredDetails") || action.equals("deleteSponsoredDetails")
							|| action.equals("saveAgreement") || action.equals("deleteCompanyAgreement") || action.equals("saveCorporateAccount") || action.equals("deleteDiscount")
							|| action.equals("saveBedCharges") || action.equals("SaveOtherItem") || action.equals("saveCustomizeTemplate") || action.equals("saveChannelHospitaldetails")
							|| action.equals("deleteChannelHospital") || action.equals("DeadPatient") || action.equals("UpdateVisitingDocFee") || action.equals("UpdateAnesthetistDocFee")
							|| action.equals("saveMotivatorVoucherList") || action.equals("payAllMotivatorFromToDate") || action.equals("saveDocumentDetail") || action.equals("deleteDocumentDetail")
							|| action.equals("saveFinacncialYearDetail") || action.equals("deleteFinancialDetail") || action.equals("saveDocumentnumberDetail") || action.equals("deleteDocumentNumberDetail")
							|| action.equals("saveTaxDetail") || action.equals("deleteTaxDetail") || action.equals("saveCategoryDetail") || action.equals("deleteCategoryDetail")
							|| action.equals("saveFormDetail") || action.equals("deleteFormDetail") || action.equals("SaveIngredientDetails") || action.equals("deleteIngredientDetails")
							|| action.equals("SaveManufacturerDetails") || action.equals("deleteManufacturerDetails") || action.equals("SaveWarehouseDetails") || action.equals("deleteWarehouseDetails")
							|| action.equals("SavePackingDetails") || action.equals("deletePackingDetails") || action.equals("saveSubInventoryDetail") || action.equals("deleteShelfDetail")
							|| action.equals("saveUOMMaster") || action.equals("deleteUOMDetail") || action.equals("saveABCRangeDetails") || action.equals("saveChargesDetail")
							|| action.equals("saveHospitalDetailsforInventory") || action.equals("saveTermsandConditionsMaster") || action.equals("SaveItemMasterDetails") || action.equals("deleteItemMasterDetail")
							|| action.equals("savePartyDetail") || action.equals("deletePartyFormDetail")
 							) { 
							System.err.println("Sorry you dont have access");
							httpServletResponse.setContentType("text/html;charset=UTF-8");
							PrintWriter out = response.getWriter();
							out.println("Sorry you don't have access");
						} 
						else {
							chain.doFilter(httpServletRequest,
									httpServletResponse);
							return;
						}
					} 
					else if(url.contains("UploadFileServlet") || url.contains("IPD_BedWard.jsp") || url.contains("UploadDocServlet") || url.contains("saveIndent")
							|| url.contains("deleteIndent") || url.contains("saveIndentTemplate") || url.contains("deleteIndentTemplateDetails")
							|| url.contains("saveWardConsumption") || url.contains("savePrint") || url.contains("deletePrint") || url.contains("savePrintAccess")
							|| url.contains("saveUserAccess") || url.contains("saveModule") || url.contains("updateModule") || url.contains("deleteModule")
							|| url.contains("saveSubModule") || url.contains("updateSubModule") || url.contains("deleteSubModule") || url.contains("saveRole")
							|| url.contains("updateRole") || url.contains("deleteRole") || url.contains("saveProfile") || url.contains("updateProfile")
							|| url.contains("deleteProfile")
						){
						System.err.println("Sorry you dont have access");
						httpServletResponse.sendRedirect("/MAHAHMIS/user_access_not_access.jsp");
						return;
					}
					else {
						chain.doFilter(httpServletRequest, httpServletResponse);
						return;
					}
				} else {
					chain.doFilter(httpServletRequest, httpServletResponse);
					return;
				}
			}
		}
		
	}

	public void destroy() {
		// close any resources here
	}

}
