package com.hms.ehat.dao;

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

public interface RadiationDao {

	public MarkVisitDto AutoSuggestionForAllPatient(String letter);

	public int saveRadioTherapyChecklist(RadioTherapyChartDTO objDTO,HttpServletRequest request);
	
	public List<RadioTherapyChartDTO> fetchRadioTherapyChartChecklist(int patientId);
	
	public int savePatientClinicalData(PatientClinicalDataDTO objDTO,HttpServletRequest request);
	
	public List<PatientClinicalDataDTO> fetchPatientClinicalData(int patientId,String date);
	
	public int saveExternalPrescription(TreatmentPrescriptionDTO objDTO,HttpServletRequest request);
	
	public List<TreatmentPrescriptionDTO> fetchExternalPrescription(int patientId,String date);
	
	public int saveTreatmentTherapy(TreatmentTherapyDTO objDTO,HttpServletRequest request);
	
	public List<TreatmentTherapyDTO> fetchTreatmentTherapy(int patientId,String date);
	
	public int deleteTherapyRecord(int id,HttpServletRequest request);
	
	public int saveTechnologistCheckList(TechnologistCheckListDTO objDTO,HttpServletRequest request);
	
	public List<TechnologistCheckListDTO> fetchTechnologistChecklist(int patientId,String date);
	
	public int saveAudit(AuditDTO objDTO,HttpServletRequest request);
	
	public List<AuditDTO> fetchAudit(int patientId,String date);
	
	public int deleteAuditRecord(int id,HttpServletRequest request);	
	
	public int saveDailyTreatment(DailyTreatmentDTO objDTO,HttpServletRequest request);
	
	public List<DailyTreatmentDTO> fetchDailyTreatment(int patientId,String date);
	
	public int deleteDailyTreatmentRecord(int id,HttpServletRequest request);
	
	public int savePortalVerification(PortalVerificationDTO objDTO,HttpServletRequest request);
	
	public List<PortalVerificationDTO> fetchPortalVerification(int patientId,String date);
	
	public int deleteVerificationRecord(int id,HttpServletRequest request);
	
	public int savePatientReview(PatientReviewDTO objDTO,HttpServletRequest request);
	
	public List<PatientReviewDTO> fetchPatientReview(int patientId,String date);
	
	public int deleteReviewRecord(int id,HttpServletRequest request);
	
	public int savePhysicsCal(PhysicsCalculationDTO objDTO,HttpServletRequest request);
	
	public List<PhysicsCalculationDTO> fetchPhysicsCal(int patientId,String date);
	
	public int deleteCalculationRecord(int id,HttpServletRequest request);

	public int savePaymentDetails(PaymentDetailsDTO objDTO,HttpServletRequest request);
	
	public List<PaymentDetailsDTO> fetchPaymentDetails(int patientId,String date);
	
	public int deletePaymentRecord(int id,HttpServletRequest request);
	
	public int savePaymentPackage(PaymentPackageDTO objDTO,HttpServletRequest request);
	
	public List<PaymentPackageDTO> fetchPaymentPackage(int patientId,String date);
	
	public List<RadiationPatientViewDTO> getRadiationPatients(String patientName);
	
	public int saveConsentForm(RadiationConsentDTO objDTO,HttpServletRequest request);
	
	public List<RadiationConsentDTO> fetchAllConsentForm(int patientId);
	
	public List<RadiationConsentDTO> fetchConsentFormById(int consentFormId);
	
	public int sendToRadiation(String str,String callFrom,HttpServletRequest request);	
	
	
}