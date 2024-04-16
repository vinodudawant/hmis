package com.hms.ehat.controller;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.TreatmentTherapyDTO;
import com.hms.ehat.dto.AuditDTO;
import com.hms.ehat.dto.DailyTreatmentDTO;
import com.hms.ehat.dto.MarkVisitDto;
import com.hms.ehat.dto.PatientClinicalDataDTO;
import com.hms.ehat.dto.PatientReviewDTO;
import com.hms.ehat.dto.PaymentDetailsDTO;
import com.hms.ehat.dto.PaymentPackageDTO;
import com.hms.ehat.dto.PhysicsCalculationDTO;
import com.hms.ehat.dto.PortalVerificationDTO;
import com.hms.ehat.dto.RadiationConsentDTO;
import com.hms.ehat.dto.RadiationPatientViewDTO;
import com.hms.ehat.dto.RadioTherapyChartDTO;
import com.hms.ehat.dto.TechnologistCheckListDTO;
import com.hms.ehat.dto.TreatmentPrescriptionDTO;
import com.hms.ehat.service.RadiationService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.utility.EnglishNumberToWords;


@Controller
@RequestMapping(value = "/radiation")
public class RadiationController {

	
	@Autowired
	RadiationService RService ;
	
	
	/**@author     :Sufiyan
	 * @Date       :15-March-2018
	 * @code       :for AutoSuggestion for Radiation  ***/
	@RequestMapping(value = "/AutoSuggestionForAllPatient", method = RequestMethod.POST)
	@ResponseBody
	public MarkVisitDto AutoSuggestionForAllPatient(@RequestParam("letter") String letter) {
		 
		MarkVisitDto objDTO = new  MarkVisitDto();
		objDTO = RService.AutoSuggestionForAllPatient(letter);	
		return objDTO;
	}
	
	
	/**@author     :Sufiyan
	 * @Date       :16-March-2018
	 * @code       :for saving RadioTherapy Chart CheckList  ***/
	@RequestMapping(value = "/saveRadioTherapyChartChecklist", method = RequestMethod.POST)
	@ResponseBody
	public String saveRadioTherapyChartChecklist(@RequestParam("RadioTherapyChart") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		RadioTherapyChartDTO objDto = (RadioTherapyChartDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, RadioTherapyChartDTO.class);
		
		result =RService.saveRadioTherapyChecklist(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this Patient might not be active..!";
		}else{
			response="Network Error..!";
		}
		return response;
		
	}
	
	/************
	 *@author	: Sufiyan
	 *@date		:  19-Mar-2018
	 *@code		:for fetching RadioTherapy Chart CheckList 
	 ***********/
	@RequestMapping(value = "/fetchRadioTherapyChartChecklist", method = RequestMethod.POST)
	 @ResponseBody
	 public	RadioTherapyChartDTO fetchRadioTherapyChartChecklist(@RequestParam("patientId") String patId) {
		
		int patientId=Integer.parseInt(patId);
		List<RadioTherapyChartDTO> chartList = new ArrayList<RadioTherapyChartDTO>();
		chartList = RService.fetchRadioTherapyChartChecklist(patientId);
	
		RadioTherapyChartDTO obj = new RadioTherapyChartDTO();
		obj.setChartList(chartList);
		return obj;
		
	}
	
	/**@author     :Sufiyan
	 * @Date       :16-March-2018
	 * @code       :for saving Patient Clinical Data  ***/
	@RequestMapping(value = "/savePatientClinicalData", method = RequestMethod.POST)
	@ResponseBody
	public String savePatientClinicalData(@RequestParam("PatientClinicalData") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		PatientClinicalDataDTO objDto = (PatientClinicalDataDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, PatientClinicalDataDTO.class);
		
		result =RService.savePatientClinicalData(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/************
	 *@author	: Sufiyan
	 *@date		:  19-Mar-2018
	 *@code		:for fetching Patient Clinical Data
	 ***********/
	@RequestMapping(value = "/fetchPatientClinicalData", method = RequestMethod.POST)
	 @ResponseBody
	 public	PatientClinicalDataDTO fetchPatientClinicalData(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<PatientClinicalDataDTO> clinicalList = new ArrayList<PatientClinicalDataDTO>();
		clinicalList = RService.fetchPatientClinicalData(patientId,date);
	
		PatientClinicalDataDTO obj = new PatientClinicalDataDTO();
		obj.setClinicalList(clinicalList);
		return obj;
	}
	
	/**@author     :Sufiyan
	 * @Date       :19-March-2018
	 * @code       :for saving External Treatment Prescription ***/
	@RequestMapping(value = "/saveExternalPrescription", method = RequestMethod.POST)
	@ResponseBody
	public String saveExternalPrescription(@RequestParam("TreatmentPrescription") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		TreatmentPrescriptionDTO objDto = (TreatmentPrescriptionDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, TreatmentPrescriptionDTO.class);
		
		result =RService.saveExternalPrescription(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	/************
	 *@author	: Sufiyan
	 *@date		:  19-Mar-2018
	 *@code		:for fetching External Treatment Prescription
	 ***********/
	@RequestMapping(value = "/fetchExternalPrescription", method = RequestMethod.POST)
	 @ResponseBody
	 public	TreatmentPrescriptionDTO fetchExternalPrescription(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<TreatmentPrescriptionDTO> setupList = new ArrayList<TreatmentPrescriptionDTO>();
		setupList = RService.fetchExternalPrescription(patientId,date);
	
		TreatmentPrescriptionDTO obj = new TreatmentPrescriptionDTO();
		obj.setSetupList(setupList);
		return obj;
	}
	
	/**@author     :Sufiyan
	 * @Date       :19-March-2018
	 * @code       :for saving Treatment Therapy ***/
	@RequestMapping(value = "/saveTreatmentTherapy", method = RequestMethod.POST)
	@ResponseBody
	public String saveTreatmentTherapy(@RequestParam("TreatmentTherapy") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		TreatmentTherapyDTO objDto = (TreatmentTherapyDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, TreatmentTherapyDTO.class);
		
		result =RService.saveTreatmentTherapy(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/************
	 *@author	: Sufiyan
	 *@date		:  19-Mar-2018
	 *@code		:for fetching Treatment Therapy 
	 ***********/
	@RequestMapping(value = "/fetchTreatmentTherapy", method = RequestMethod.POST)
	 @ResponseBody
	 public	TreatmentTherapyDTO fetchTreatmentTherapy(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<TreatmentTherapyDTO> therapyList = new ArrayList<TreatmentTherapyDTO>();
		therapyList = RService.fetchTreatmentTherapy(patientId,date);
	
		TreatmentTherapyDTO obj = new TreatmentTherapyDTO();
		obj.setTherapyList(therapyList);
		return obj;
	}
	
	/**@author     :Sufiyan
	 * @Date       :20-March-2018
	 * @code       :for saving Technologist Checklist ***/
	@RequestMapping(value = "/saveChecklistForTechnologist", method = RequestMethod.POST)
	@ResponseBody
	public String saveChecklistForTechnologist(@RequestParam("TechnologistChecklist") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		TechnologistCheckListDTO objDto = (TechnologistCheckListDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, TechnologistCheckListDTO.class);
		
		result =RService.saveTechnologistCheckList(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/************
	 *@author	: Sufiyan
	 *@date		:  20-Mar-2018
	 *@code		:for fetching Technologist Checklist
	 ***********/
	@RequestMapping(value = "/fetchChecklistForTechnologist", method = RequestMethod.POST)
	 @ResponseBody
	 public	TechnologistCheckListDTO fetchChecklistForTechnologist(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<TechnologistCheckListDTO> checkList = new ArrayList<TechnologistCheckListDTO>();
		checkList = RService.fetchTechnologistChecklist(patientId,date);
	
		TechnologistCheckListDTO obj = new TechnologistCheckListDTO();
		obj.setCheckList(checkList);
		return obj;
	}	
	
	/**@author     :Sufiyan
	 * @Date       :20-March-2018
	 * @code       :for saving Audit Information ***/
	@RequestMapping(value = "/saveAudit", method = RequestMethod.POST)
	@ResponseBody
	public String saveAudit(@RequestParam("Audit") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		AuditDTO objDto = (AuditDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, AuditDTO.class);
		
		result =RService.saveAudit(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	
	/************
	 *@author	: Sufiyan
	 *@date		:  20-Mar-2018
	 *@code		:for fetching Audit Information
	 ***********/
	@RequestMapping(value = "/fetchAudit", method = RequestMethod.POST)
	 @ResponseBody
	 public	AuditDTO fetchAudit(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<AuditDTO> auditList = new ArrayList<AuditDTO>();
		auditList = RService.fetchAudit(patientId,date);
	
		AuditDTO obj = new AuditDTO();
		obj.setAuditList(auditList);
		return obj;
	}
	
	
	/**@author     :Sufiyan
	 * @Date       :20-March-2018
	 * @code       :for saving Daily Treatment Record ***/
	@RequestMapping(value = "/saveDailyTreatment", method = RequestMethod.POST)
	@ResponseBody
	public String saveDailyTreatment(@RequestParam("DailyTreatment") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		DailyTreatmentDTO objDto = (DailyTreatmentDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, DailyTreatmentDTO.class);
		
		result =RService.saveDailyTreatment(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	
	/************
	 *@author	: Sufiyan
	 *@date		:  20-Mar-2018
	 *@code		:for fetching Daily Treatment Record 
	 ***********/
	@RequestMapping(value = "/fetchDailyTreatment", method = RequestMethod.POST)
	 @ResponseBody
	 public	DailyTreatmentDTO fetchDailyTreatment(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<DailyTreatmentDTO> treatmentList = new ArrayList<DailyTreatmentDTO>();
		treatmentList = RService.fetchDailyTreatment(patientId,date);
	
		DailyTreatmentDTO obj = new DailyTreatmentDTO();
		obj.setTreatmentList(treatmentList);
		return obj;
	}
	
	
	/**@author     :Sufiyan
	 * @Date       :20-March-2018
	 * @code       :for saving Daily Treatment Record ***/
	@RequestMapping(value = "/savePortalVerification", method = RequestMethod.POST)
	@ResponseBody
	public String savePortalVerification(@RequestParam("PortalVerification") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		PortalVerificationDTO objDto = (PortalVerificationDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, PortalVerificationDTO.class);
		
		result =RService.savePortalVerification(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	
	/************
	 *@author	: Sufiyan
	 *@date		:  20-Mar-2018
	 *@code		:for fetching Daily Treatment Record 
	 ***********/
	@RequestMapping(value = "/fetchPortalVerification", method = RequestMethod.POST)
	 @ResponseBody
	 public	PortalVerificationDTO fetchPortalVerification(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<PortalVerificationDTO> verificationList = new ArrayList<PortalVerificationDTO>();
		verificationList = RService.fetchPortalVerification(patientId,date);
	
		PortalVerificationDTO obj = new PortalVerificationDTO();
		obj.setVerificationList(verificationList);
		return obj;
	}
	
	/**@author     :Sufiyan
	 * @Date       :20-March-2018
	 * @code       :for saving Patient Review Details ***/
	@RequestMapping(value = "/savePatientReview", method = RequestMethod.POST)
	@ResponseBody
	public String savePatientReview(@RequestParam("PatientReview") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		System.err.println("PatientReview :"+str);
		PatientReviewDTO objDto = (PatientReviewDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, PatientReviewDTO.class);
		
		result =RService.savePatientReview(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/************
	 *@author	: Sufiyan
	 *@date		:  20-Mar-2018
	 *@code		:for fetching Patient Review Details 
	 ***********/
	@RequestMapping(value = "/fetchPatientReview", method = RequestMethod.POST)
	 @ResponseBody
	 public	PatientReviewDTO fetchPatientReview(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<PatientReviewDTO> reviewList = new ArrayList<PatientReviewDTO>();
		reviewList = RService.fetchPatientReview(patientId,date);
	
		PatientReviewDTO obj = new PatientReviewDTO();
		obj.setReviewList(reviewList);
		return obj;
	}
	
	/**@author     :Sufiyan
	 * @Date       :21-March-2018
	 * @code       :for deleting therapy Record ***/
	@RequestMapping(value = "/deleteTherapyRecord", method = RequestMethod.POST)
	@ResponseBody
	public String deleteTherapyRecord(@RequestParam("id") int id,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		result =RService.deleteTherapyRecord(id, request);
		
		if(result==1){
			response="Record deleted successfully..!";
		}else if(result==2){
			response="Could not delete Record..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/**@author     :Sufiyan
	 * @Date       :21-March-2018
	 * @code       :for deleting Verification Record ***/
	@RequestMapping(value = "/deleteVerificationRecord", method = RequestMethod.POST)
	@ResponseBody
	public String deleteVerificationRecord(@RequestParam("id") int id,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		result =RService.deleteVerificationRecord(id, request);
		
		if(result==1){
			response="Record deleted successfully..!";
		}else if(result==2){
			response="Could not delete Record..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/**@author     :Sufiyan
	 * @Date       :21-March-2018
	 * @code       :for deleting Audit Record ***/
	@RequestMapping(value = "/deleteAuditRecord", method = RequestMethod.POST)
	@ResponseBody
	public String deleteAuditRecord(@RequestParam("id") int id,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		result =RService.deleteAuditRecord(id, request);
		
		if(result==1){
			response="Record deleted successfully..!";
		}else if(result==2){
			response="Could not delete Record..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/**@author     :Sufiyan
	 * @Date       :21-March-2018
	 * @code       :for deleting Daily Treatment Record ***/
	@RequestMapping(value = "/deleteDailyTreatmentRecord", method = RequestMethod.POST)
	@ResponseBody
	public String deleteDailyTreatmentRecord(@RequestParam("id") int id,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		result =RService.deleteDailyTreatmentRecord(id, request);
		
		if(result==1){
			response="Record deleted successfully..!";
		}else if(result==2){
			response="Could not delete Record..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/**@author     :Sufiyan
	 * @Date       :21-March-2018
	 * @code       :for deleting Revew Record ***/
	@RequestMapping(value = "/deleteReviewRecord", method = RequestMethod.POST)
	@ResponseBody
	public String deleteReviewRecord(@RequestParam("id") int id,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		result =RService.deleteReviewRecord(id, request);
		
		if(result==1){
			response="Record deleted successfully..!";
		}else if(result==2){
			response="Could not delete Record..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/**@author     :Sufiyan
	 * @Date       :21-March-2018
	 * @code       :for saving Physics Calculation  ***/
	@RequestMapping(value = "/savePhysicsCal", method = RequestMethod.POST)
	@ResponseBody
	public String savePhysicsCal(@RequestParam("PhysicsCalculation") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		PhysicsCalculationDTO objDto = (PhysicsCalculationDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, PhysicsCalculationDTO.class);
		
		result =RService.savePhysicsCal(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/************
	 *@author	: Sufiyan
	 *@date		:  21-Mar-2018
	 *@code		:for fetching Patient Review Details 
	 ***********/
	@RequestMapping(value = "/fetchPhysicsCal", method = RequestMethod.POST)
	 @ResponseBody
	 public	PhysicsCalculationDTO fetchPhysicsCal(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<PhysicsCalculationDTO> calculationList = new ArrayList<PhysicsCalculationDTO>();
		calculationList = RService.fetchPhysicsCal(patientId,date);
	
		PhysicsCalculationDTO obj = new PhysicsCalculationDTO();
		obj.setCalculationList(calculationList);
		return obj;
		
	}
	
	/**@author     :Sufiyan
	 * @Date       :21-March-2018
	 * @code       :for deleting Physics Calculation ***/
	@RequestMapping(value = "/deleteCalculationRecord", method = RequestMethod.POST)
	@ResponseBody
	public String deleteCalculationRecord(@RequestParam("id") int id,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		result =RService.deleteCalculationRecord(id, request);
		
		if(result==1){
			response="Record deleted successfully..!";
		}else if(result==2){
			response="Could not delete Record..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	

	/**@author     :Sufiyan
	 * @Date       :22-March-2018
	 * @code       :for saving Payment Details  ***/
	@RequestMapping(value = "/savePaymentDetails", method = RequestMethod.POST)
	@ResponseBody
	public String savePaymentDetails(@RequestParam("PaymentDetails") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		PaymentDetailsDTO objDto = (PaymentDetailsDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, PaymentDetailsDTO.class);
		
		result =RService.savePaymentDetails(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/************
	 *@author	: Sufiyan
	 *@date		:  21-Mar-2018
	 *@code		:for fetching Payment Details
	 ***********/
	@RequestMapping(value = "/fetchPaymentDetails", method = RequestMethod.POST)
	 @ResponseBody
	 public	PaymentDetailsDTO fetchPaymentDetails(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<PaymentDetailsDTO> paymentList = new ArrayList<PaymentDetailsDTO>();
		paymentList = RService.fetchPaymentDetails(patientId,date);
	
		PaymentDetailsDTO obj = new PaymentDetailsDTO();
		obj.setPaymentList(paymentList);
		return obj;
		
	}
	
	/**@author     :Sufiyan
	 * @Date       :22-March-2018
	 * @code       :for deleting Payment Details ***/
	@RequestMapping(value = "/deletePaymentRecord", method = RequestMethod.POST)
	@ResponseBody
	public String deletePaymentRecord(@RequestParam("id") int id,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		result =RService.deletePaymentRecord(id, request);
		
		if(result==1){
			response="Record deleted successfully..!";
		}else if(result==2){
			response="Could not delete Record..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}

	/**@author     :Sufiyan
	 * @Date       :22-March-2018
	 * @code       :for saving Payment Package  ***/
	@RequestMapping(value = "/savePaymentPackage", method = RequestMethod.POST)
	@ResponseBody
	public String savePaymentPackage(@RequestParam("PaymentPackage") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		PaymentPackageDTO objDto = (PaymentPackageDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, PaymentPackageDTO.class);
		
		result =RService.savePaymentPackage(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}
	
	/************
	 *@author	: Sufiyan
	 *@date		:  21-Mar-2018
	 *@code		:for fetching Payment Package
	 ***********/
	@RequestMapping(value = "/fetchPaymentPackage", method = RequestMethod.POST)
	 @ResponseBody
	 public	PaymentPackageDTO fetchPaymentPackage(@RequestParam("patientId") String patId,
			 @RequestParam("date") String date) {
		
		int patientId=Integer.parseInt(patId);
		List<PaymentPackageDTO> packageList = new ArrayList<PaymentPackageDTO>();
		packageList = RService.fetchPaymentPackage(patientId,date);
	
		PaymentPackageDTO obj = new PaymentPackageDTO();
		
		long amount = Math.round(packageList.get(0).getPackageAmt());
		String packageAmtInWords =EnglishNumberToWords.convert(amount);
		
		packageList.get(0).setPackageAmtInWords(packageAmtInWords.toUpperCase());
		obj.setPackageAmtInWords(packageAmtInWords);
		obj.setPackageList(packageList);
		return obj;
		
	}

	
	/************
	 *@author	: Sufiyan
	 *@date		:  26-Mar-2018
	 *@code		:for fetching Radiation Patient List 
	 ***********/
	@RequestMapping(value = "/getRadiationPatients", method = RequestMethod.POST)
	 @ResponseBody
	 public	RadiationPatientViewDTO getRadiationPatients(@RequestParam("patientName") String patientName) {
		
		List<RadiationPatientViewDTO> patientList = new ArrayList<RadiationPatientViewDTO>();
		patientList = RService.getRadiationPatients(patientName);
	
		RadiationPatientViewDTO obj = new RadiationPatientViewDTO();
		
		obj.setPatientList(patientList);
		return obj;
		
	}

	/**@author     :Sufiyan
	 * @Date       :27-March-2018
	 * @code       :for saving Consent Form ***/
	@RequestMapping(value = "/saveRadiationConsentForm", method = RequestMethod.POST)
	@ResponseBody
	public String saveRadiationConsentForm(@RequestParam("RadiationConsent") String str,
			HttpServletRequest request) {
		int result=0;
		String response="";
		
		RadiationConsentDTO objDto = (RadiationConsentDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str, RadiationConsentDTO.class);
		result =RService.saveConsentForm(objDto, request);
		
		if(result==1){
			response="Record saved successfully..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}

	/************
	 *@author	: Sufiyan
	 *@date		:  27-Mar-2018
	 *@code		:for fetching Radiation Consent Form 
	 ***********/
	@RequestMapping(value = "/fetchAllRadiationConsentForm", method = RequestMethod.POST)
	 @ResponseBody
	 public	RadiationConsentDTO fetchAllRadiationConsentForm(@RequestParam("patientId") String patient) {
		
		int patientId = Integer.parseInt(patient);
		List<RadiationConsentDTO> consentList = new ArrayList<RadiationConsentDTO>();
		consentList = RService.fetchAllConsentForm(patientId);
	
		RadiationConsentDTO obj = new RadiationConsentDTO();
		
		obj.setConsentList(consentList);
		return obj;
		
	}
	
	/************
	 *@author	: Sufiyan
	 *@date		:  27-Mar-2018
	 *@code		:for fetching Radiation Consent Form 
	 ***********/
	@RequestMapping(value = "/fetchRadiationConsentFormById", method = RequestMethod.POST)
	 @ResponseBody
	 public	RadiationConsentDTO fetchRadiationConsentFormById(@RequestParam("consentFormId") String consentForm) {
		
		int consentFormId = Integer.parseInt(consentForm);
		List<RadiationConsentDTO> consentList = new ArrayList<RadiationConsentDTO>();
		consentList = RService.fetchConsentFormById(consentFormId);
	
		RadiationConsentDTO obj = new RadiationConsentDTO();
		
		obj.setConsentList(consentList);
		return obj;
		
	}
	

	/**@author     :Sufiyan
	 * @Date       :27-March-2018
	 * @code       :for saving send To Radiation***/
	@RequestMapping(value = "/sendToRadiation", method = RequestMethod.POST)
	@ResponseBody
	public String sendToRadiation(@RequestParam("billDetailsIds") String str,
			@RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		int result=0;
		String response="";
		
		result =RService.sendToRadiation(str,callFrom, request);
		
		if(result==1){
			response="Record successfully send to Radiation..!";
		}else if(result==2){
			response="Record updated successfully..!";
		}else if(result==3){
			response="Treatment for this patient might not be Active..!";
		}else{
			response="Network Error..!";
		}
		return response;
	}	
	
}
