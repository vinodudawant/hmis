package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.hms.ehat.dto.TreatmentTherapyDTO;
import com.hms.ehat.dao.RadiationDao;
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

@Service
public class RadiationServiceImpl implements RadiationService {

	@Autowired
	RadiationDao RDao;
	
	@Override
	@Transactional
	public MarkVisitDto AutoSuggestionForAllPatient(String letter){
		
		return RDao.AutoSuggestionForAllPatient(letter);
	}
	
	@Override
	@Transactional
	public int saveRadioTherapyChecklist(RadioTherapyChartDTO objDTO,HttpServletRequest request){
		
		return RDao.saveRadioTherapyChecklist(objDTO,request);
	}
	
	@Override
	@Transactional
	public List<RadioTherapyChartDTO> fetchRadioTherapyChartChecklist(int patientId){
		
		return RDao.fetchRadioTherapyChartChecklist(patientId);
	}
	
	@Override
	@Transactional
	public int savePatientClinicalData(PatientClinicalDataDTO objDTO,HttpServletRequest request){
		
		return RDao.savePatientClinicalData(objDTO,request);
	}
	
	@Override
	@Transactional
	public List<PatientClinicalDataDTO> fetchPatientClinicalData(int patientId,String date){
		
		return RDao.fetchPatientClinicalData(patientId,date);
	}
	
	@Override
	@Transactional
	public int saveExternalPrescription(TreatmentPrescriptionDTO objDTO,HttpServletRequest request){
		
		return RDao.saveExternalPrescription(objDTO,request);
	}
	
	@Override
	@Transactional
	public List<TreatmentPrescriptionDTO> fetchExternalPrescription(int patientId,String date){
		
		return RDao.fetchExternalPrescription(patientId,date);
	}
	
	@Override
	@Transactional
	public int saveTreatmentTherapy(TreatmentTherapyDTO objDTO,HttpServletRequest request){
		
		return RDao.saveTreatmentTherapy(objDTO,request);
	}
	
	@Override
	@Transactional
	public List<TreatmentTherapyDTO> fetchTreatmentTherapy(int patientId,String date){
		
		return RDao.fetchTreatmentTherapy(patientId,date);
	}	
	
	@Override
	@Transactional
	public int saveTechnologistCheckList(TechnologistCheckListDTO objDTO,HttpServletRequest request){
		
		return RDao.saveTechnologistCheckList(objDTO,request);
	}
	
	@Override
	@Transactional
	public List<TechnologistCheckListDTO> fetchTechnologistChecklist(int patientId,String date){
		
		return RDao.fetchTechnologistChecklist(patientId,date);
	}
	
	@Override
	@Transactional
	public int saveAudit(AuditDTO objDTO,HttpServletRequest request){
		
		return RDao.saveAudit(objDTO,request);
	}
	
	@Override
	@Transactional
	public List<AuditDTO> fetchAudit(int patientId,String date){
		
		return RDao.fetchAudit(patientId,date);
	}
	
	@Override
	@Transactional
	public int saveDailyTreatment(DailyTreatmentDTO objDTO,HttpServletRequest request){
		
		return RDao.saveDailyTreatment(objDTO,request);
	}
	
	@Override
	@Transactional
	public List<DailyTreatmentDTO> fetchDailyTreatment(int patientId,String date){
		
		return RDao.fetchDailyTreatment(patientId,date);
	}
	
	@Override
	@Transactional
	public int savePortalVerification(PortalVerificationDTO objDTO,HttpServletRequest request){
		
		return RDao.savePortalVerification(objDTO,request);
	}
	
	@Override
	@Transactional
	public List<PortalVerificationDTO> fetchPortalVerification(int patientId,String date){
		
		return RDao.fetchPortalVerification(patientId,date);
	}
	
	@Override
	@Transactional
	public int savePatientReview(PatientReviewDTO objDTO,HttpServletRequest request){
		
		return RDao.savePatientReview(objDTO,request);
	}
	
	@Override
	@Transactional
	public List<PatientReviewDTO> fetchPatientReview(int patientId,String date){
		
		return RDao.fetchPatientReview(patientId,date);
	}
	
	@Override
	@Transactional
	public int deleteTherapyRecord(int id,HttpServletRequest request){
		
		return RDao.deleteTherapyRecord(id,request);
	}
	
	@Override
	@Transactional
	public int deleteAuditRecord(int id,HttpServletRequest request){
		
		return RDao.deleteAuditRecord(id,request);
	}
	
	@Override
	@Transactional
	public int deleteDailyTreatmentRecord(int id,HttpServletRequest request){
		
		return RDao.deleteDailyTreatmentRecord(id,request);
	}
	
	@Override
	@Transactional
	public int deleteVerificationRecord(int id,HttpServletRequest request){
		
		return RDao.deleteVerificationRecord(id,request);
	}
	
	@Override
	@Transactional
	public int deleteReviewRecord(int id,HttpServletRequest request){
		
		return RDao.deleteReviewRecord(id,request);
	}
	
	@Override
	@Transactional
	public int savePhysicsCal(PhysicsCalculationDTO objDTO,HttpServletRequest request){
		
		return RDao.savePhysicsCal(objDTO,request);
	}	
	
	@Override
	@Transactional
	public List<PhysicsCalculationDTO> fetchPhysicsCal(int patientId,String date){
		
		return RDao.fetchPhysicsCal(patientId,date);
	}
	
	@Override
	@Transactional
	public int deleteCalculationRecord(int id,HttpServletRequest request){
		
		return RDao.deleteCalculationRecord(id,request);
	}	
	
	@Override
	@Transactional
	public int savePaymentDetails(PaymentDetailsDTO objDTO,HttpServletRequest request){
		
		return RDao.savePaymentDetails(objDTO,request);
	}		
	
	@Override
	@Transactional
	public List<PaymentDetailsDTO> fetchPaymentDetails(int patientId,String date){
		
		return RDao.fetchPaymentDetails(patientId,date);
	}	
	
	@Override
	@Transactional
	public int deletePaymentRecord(int id,HttpServletRequest request){
		
		return RDao.deletePaymentRecord(id,request);
	}
	
	@Override
	@Transactional
	public int savePaymentPackage(PaymentPackageDTO objDTO,HttpServletRequest request){
		
		return RDao.savePaymentPackage(objDTO,request);
	}
	
	@Override
	@Transactional
	public List<PaymentPackageDTO> fetchPaymentPackage(int patientId,String date){
		
		return RDao.fetchPaymentPackage(patientId,date);
	}
	
	@Override
	@Transactional
	public List<RadiationPatientViewDTO> getRadiationPatients(String patientName){
		
		return RDao.getRadiationPatients(patientName);
	}	
	
	@Override
	@Transactional
	public int saveConsentForm(RadiationConsentDTO objDTO,HttpServletRequest request){
		
		return RDao.saveConsentForm(objDTO,request);
	}	
	
	@Override
	@Transactional
	public List<RadiationConsentDTO> fetchAllConsentForm(int patientId){
		
		return RDao.fetchAllConsentForm(patientId);
	}	
	
	@Override
	@Transactional
	public List<RadiationConsentDTO> fetchConsentFormById(int consentFormId){
		
		return RDao.fetchConsentFormById(consentFormId);
	}
	
	@Override
	@Transactional
	public int sendToRadiation(String str,String callFrom,HttpServletRequest request){
		
		return RDao.sendToRadiation(str,callFrom,request);
	}
	
	
}