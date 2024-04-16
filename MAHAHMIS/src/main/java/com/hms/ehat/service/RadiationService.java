package com.hms.ehat.service;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

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


public interface RadiationService {

	//@author Sufiyan @date 16-March-2018 @code for autoSuggestion for Radiation patient
	public MarkVisitDto AutoSuggestionForAllPatient(String letter);
	
	//@author Sufiyan @date 19-March-2018 @code for Saving CheckList 
	public int saveRadioTherapyChecklist(RadioTherapyChartDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 19-March-2018 @code for Fetching CheckList 
	public List<RadioTherapyChartDTO> fetchRadioTherapyChartChecklist(int patientId);
	
	//@author Sufiyan @date 19-March-2018 @code for Saving Patient Clinical Data 
	public int savePatientClinicalData(PatientClinicalDataDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 19-March-2018 @code for Fetching Clinical Data 
	public List<PatientClinicalDataDTO> fetchPatientClinicalData(int patientId,String date);
		
	//@author Sufiyan @date 19-March-2018 @code for Saving Patient Clinical Data 
	public int saveExternalPrescription(TreatmentPrescriptionDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 19-March-2018 @code for Fetching External Treatment Prescription
	public List<TreatmentPrescriptionDTO> fetchExternalPrescription(int patientId,String date);
	
	//@author Sufiyan @date 20-March-2018 @code for Saving Treatment Therapy
	public int saveTreatmentTherapy(TreatmentTherapyDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 20-March-2018 @code for Fetching Treatment Therapy
	public List<TreatmentTherapyDTO> fetchTreatmentTherapy(int patientId,String date);
	
	//@author Sufiyan @date 20-March-2018 @code for Saving Technologist CheckList
	public int saveTechnologistCheckList(TechnologistCheckListDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 20-March-2018 @code for Fetching Technologist CheckList
	public List<TechnologistCheckListDTO> fetchTechnologistChecklist(int patientId,String date);
	
	//@author Sufiyan @date 20-March-2018 @code for Saving Audit Information
	public int saveAudit(AuditDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 20-March-2018 @code for Fetching Audit Information
	public List<AuditDTO> fetchAudit(int patientId,String date);
	
	//@author Sufiyan @date 20-March-2018 @code for Saving Daily Treatment Record
	public int saveDailyTreatment(DailyTreatmentDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 20-March-2018 @code for Fetching Daily Treatment Record
	public List<DailyTreatmentDTO> fetchDailyTreatment(int patientId,String date);
	
	//@author Sufiyan @date 20-March-2018 @code for Saving Portal Verification
	public int savePortalVerification(PortalVerificationDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 20-March-2018 @code for Fetching Portal Verification
	public List<PortalVerificationDTO> fetchPortalVerification(int patientId,String date);
	
	//@author Sufiyan @date 20-March-2018 @code for Saving Patient Review 
	public int savePatientReview(PatientReviewDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 20-March-2018 @code for Fetching Patient Review 
	public List<PatientReviewDTO> fetchPatientReview(int patientId,String date);
	
	//@author Sufiyan @date 21-March-2018 @code for Deleting Therapy Record  
	public int deleteTherapyRecord(int id,HttpServletRequest request);
	
	//@author Sufiyan @date 21-March-2018 @code for Deleting Audit Record  
	public int deleteAuditRecord(int id,HttpServletRequest request);	
	
	//@author Sufiyan @date 21-March-2018 @code for Deleting Daily Treatment Record  
	public int deleteDailyTreatmentRecord(int id,HttpServletRequest request);
	
	//@author Sufiyan @date 21-March-2018 @code for Deleting Portal Verification Record  
	public int deleteVerificationRecord(int id,HttpServletRequest request);
	
	//@author Sufiyan @date 21-March-2018 @code for Deleting Patient Review Record  
	public int deleteReviewRecord(int id,HttpServletRequest request);
	
	//@author Sufiyan @date 21-March-2018 @code for Saving Physics Calculation 
	public int savePhysicsCal(PhysicsCalculationDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 21-March-2018 @code for Fetching Physics Calculation
	public List<PhysicsCalculationDTO> fetchPhysicsCal(int patientId,String date);
	
	//@author Sufiyan @date 21-March-2018 @code for Deleting Physics Calculation Record  
	public int deleteCalculationRecord(int id,HttpServletRequest request);
	
	//@author Sufiyan @date 22-March-2018 @code for Saving Payment Details
	public int savePaymentDetails(PaymentDetailsDTO objDTO,HttpServletRequest request);	
	
	//@author Sufiyan @date 22-March-2018 @code for Fetching Payment Details
	public List<PaymentDetailsDTO> fetchPaymentDetails(int patientId,String date);
	
	//@author Sufiyan @date 22-March-2018 @code for Deleting Payment Details Record
	public int deletePaymentRecord(int id,HttpServletRequest request);
	
	//@author Sufiyan @date 22-March-2018 @code for Saving Payment Package
	public int savePaymentPackage(PaymentPackageDTO objDTO,HttpServletRequest request);	
	
	//@author Sufiyan @date 22-March-2018 @code for Fetching Payment Package
	public List<PaymentPackageDTO> fetchPaymentPackage(int patientId,String date);
	
	//@author Sufiyan @date 25-March-2018 @code for Fetching Radiation Patients
	public List<RadiationPatientViewDTO> getRadiationPatients(String patientName);
	
	//@author Sufiyan @date 27-March-2018 @code for Saving Consent Form
	public int saveConsentForm(RadiationConsentDTO objDTO,HttpServletRequest request);	
	
	//@author Sufiyan @date 27-March-2018 @code for Fetching Consent Form
	public List<RadiationConsentDTO> fetchAllConsentForm(int patientId);
	
	//@author Sufiyan @date 27-March-2018 @code for Fetching Consent Form By Id
	public List<RadiationConsentDTO> fetchConsentFormById(int consentFormId);
	
	//@author Sufiyan @date 28-March-2018 @code for Send to Radiation
	public int sendToRadiation(String str,String callFrom,HttpServletRequest request);	
	
}