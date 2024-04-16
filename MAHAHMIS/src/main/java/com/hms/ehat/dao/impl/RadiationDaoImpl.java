package com.hms.ehat.dao.impl;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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


@Repository
@SuppressWarnings("unchecked")
public class RadiationDaoImpl implements RadiationDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date todaysDate = new Date(new java.util.Date().getTime());
	
	ResourceBundle resourceBundleEhat = ResourceBundle
			.getBundle("Ehat");
	
	@Override
	public MarkVisitDto AutoSuggestionForAllPatient(String letter){
		MarkVisitDto objDTO = new MarkVisitDto();
		List<MarkVisitDto> patientList = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MarkVisitDto.class);
			
			criteria.addOrder(Order.desc("ptId"));
						
			Criterion rest1= Restrictions.like("fName", "%" + letter + "%");
			Criterion rest2= Restrictions.like("mName", "%" + letter + "%");
			Criterion rest3= Restrictions.like("lName", "%" + letter + "%");
			
			criteria.add(Restrictions.or(rest1, rest2, rest3));
			 
			 criteria.setMaxResults(10); 
			 patientList = criteria.list();
			 
			 objDTO.setLstMarkVisit(patientList);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objDTO;
	}
	

	public int getTreatmentIdThroughPatientId(int patientId){
		
		int treatmentId=0;
		try {
			String sql = "select max(treatment_id) from ehat_treatment where patient_id="+patientId;
			
			treatmentId = ((Integer)sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return treatmentId;
	}
	
	@Override
	public int saveRadioTherapyChecklist(RadioTherapyChartDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(RadioTherapyChartDTO objDTO1 : objDTO.getChartList()){
					
					int id = objDTO1.getRadioTherapyChartId();
					
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					objDTO1.setTreatmentId(treatmentId);
					if(treatmentId==0){
						result=3;
					}else{
						if(id==0){
							objDTO1.setAddedBy(UserId);
							objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
							sessionFactory.getCurrentSession().save(objDTO1);
							result=1;
						}else{
							objDTO1.setUpdatedBy(UserId);
							objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
							sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
							result=2;
						}
					}
				}
				
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
			
		return result;
	}
	
	@Override
	public List<RadioTherapyChartDTO> fetchRadioTherapyChartChecklist(int patientId){
		
		List<RadioTherapyChartDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RadioTherapyChartDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	@Override
	public int savePatientClinicalData(PatientClinicalDataDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(PatientClinicalDataDTO objDTO1 : objDTO.getClinicalList()){
					
					int id = objDTO1.getPatientClinicalId();
					
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0){
						result=3;
					}else{
						objDTO1.setTreatmentId(treatmentId);
					
						if(id==0){
							objDTO1.setAddedBy(UserId);
							objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
							sessionFactory.getCurrentSession().save(objDTO1);
							result=1;
						}else{
							objDTO1.setUpdatedBy(UserId);
							objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
							sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
							result=2;
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
		return result;
	}
	
	@Override
	public List<PatientClinicalDataDTO> fetchPatientClinicalData(int patientId,String date){
		
		List<PatientClinicalDataDTO> list = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientClinicalDataDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@Override
	public int saveExternalPrescription(TreatmentPrescriptionDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(TreatmentPrescriptionDTO objDTO1 : objDTO.getSetupList()){
					
					int id = objDTO1.getTreatmentPrescriptionId();
					
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						objDTO1.setTreatmentId(treatmentId);
					
						if(id==0){
							objDTO1.setAddedBy(UserId);
							objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
							sessionFactory.getCurrentSession().save(objDTO1);
							result=1;
						}else{
							objDTO1.setUpdatedBy(UserId);
							objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
							sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
							result=2;
						}
					}
				}
				
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
			
		return result;
	}
	
	@Override
	public List<TreatmentPrescriptionDTO> fetchExternalPrescription(int patientId,String date){

		
		List<TreatmentPrescriptionDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TreatmentPrescriptionDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	@Override
	public int saveTreatmentTherapy(TreatmentTherapyDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(TreatmentTherapyDTO objDTO1 : objDTO.getTherapyList()){
				
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						int id = objDTO1.getTreatmentTherapyId();
						objDTO1.setTreatmentId(treatmentId);
					
							if(id==0){
								objDTO1.setAddedBy(UserId);
								objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().save(objDTO1);
								result=1;
							}else{
								objDTO1.setUpdatedBy(UserId);
								objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
								result=2;
							}
						}
					}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
			
		return result;
	}
	
	@Override
	public List<TreatmentTherapyDTO> fetchTreatmentTherapy(int patientId,String date){

		List<TreatmentTherapyDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TreatmentTherapyDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	@Override
	public int saveTechnologistCheckList(TechnologistCheckListDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(TechnologistCheckListDTO objDTO1 : objDTO.getCheckList()){
				
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						int id = objDTO1.getTechnoChecklistId();
						objDTO1.setTreatmentId(treatmentId);
					
							if(id==0){
								objDTO1.setAddedBy(UserId);
								objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().save(objDTO1);
								result=1;
							}else{
								objDTO1.setUpdatedBy(UserId);
								objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
								result=2;
							}
						}
					}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
			
		return result;
	}
	
	@Override
	public List<TechnologistCheckListDTO> fetchTechnologistChecklist(int patientId,String date){

		List<TechnologistCheckListDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TechnologistCheckListDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	@Override
	public int saveAudit(AuditDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(AuditDTO objDTO1 : objDTO.getAuditList()){
				
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						int id = objDTO1.getAuditId();
						objDTO1.setTreatmentId(treatmentId);
					
							if(id==0){
								objDTO1.setAddedBy(UserId);
								objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().save(objDTO1);
								result=1;
							}else{
								objDTO1.setUpdatedBy(UserId);
								objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
								result=2;
							}
						}
					}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
			
		return result;
	}
	
	@Override
	public List<AuditDTO> fetchAudit(int patientId,String date){

		List<AuditDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(AuditDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	@Override
	public int saveDailyTreatment(DailyTreatmentDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(DailyTreatmentDTO objDTO1 : objDTO.getTreatmentList()){
				
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						int id = objDTO1.getDailyTreatmentId();
						objDTO1.setTreatmentId(treatmentId);
					
							if(id==0){
								objDTO1.setAddedBy(UserId);
								objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().save(objDTO1);
								result=1;
							}else{
								objDTO1.setUpdatedBy(UserId);
								objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
								result=2;
							}
						}
					}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
		return result;
	}	
	
	@Override
	public List<DailyTreatmentDTO> fetchDailyTreatment(int patientId,String date){

		List<DailyTreatmentDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DailyTreatmentDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	
	@Override
	public int savePortalVerification(PortalVerificationDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(PortalVerificationDTO objDTO1 : objDTO.getVerificationList()){
				
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						int id = objDTO1.getPortalVerificationId();
						objDTO1.setTreatmentId(treatmentId);
					
							if(id==0){
								objDTO1.setAddedBy(UserId);
								objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().save(objDTO1);
								result=1;
							}else{
								objDTO1.setUpdatedBy(UserId);
								objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
								result=2;
							}
						}
					}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
		return result;
	}
	
	@Override
	public List<PortalVerificationDTO> fetchPortalVerification(int patientId,String date){

		List<PortalVerificationDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PortalVerificationDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	@Override
	public int savePatientReview(PatientReviewDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(PatientReviewDTO objDTO1 : objDTO.getReviewList()){
				
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						int id = objDTO1.getPatientReviewId();
						objDTO1.setTreatmentId(treatmentId);
					
							if(id==0){
								objDTO1.setAddedBy(UserId);
								objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().save(objDTO1);
								result=1;
							}else{
								objDTO1.setUpdatedBy(UserId);
								objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
								result=2;
							}
						}
					}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
		return result;
	}	
	
	@Override
	public List<PatientReviewDTO> fetchPatientReview(int patientId,String date){

		List<PatientReviewDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientReviewDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	@Override
	public int deleteTherapyRecord(int id,HttpServletRequest request){
		
		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
				if(id!=0){
					String sql = "update ehat_radiation_treatment_therapy set status ='N',updated_by="+
									UserId+" where treatment_therapy_id="+id;                    
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
		
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	
}		
	
	@Override
	public int deleteAuditRecord(int id,HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
				if(id!=0){
					String sql = "update ehat_radiation_audit set status ='N',updated_by="+
									UserId+" where audit_id="+id;                    
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
		
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	
	}
	
	@Override
	public int deleteDailyTreatmentRecord(int id,HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			System.err.println("todaysDate :"+todaysDate);
				if(id!=0){
					String sql = "update ehat_radiation_daily_treatment set status ='N',updated_by="+
									UserId+" where daily_treatment_id="+id;                    
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
		
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	
	}
	
	@Override
	public int deleteVerificationRecord(int id,HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
				if(id!=0){
					String sql = "update ehat_radiation_portal_verification set status ='N',updated_by="+
									UserId+" where portal_verification_id="+id;  
					System.err.println("SQL verification :"+sql);
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
		
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	
	}
	
	@Override
	public int deleteReviewRecord(int id,HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
				if(id!=0){
					String sql = "update ehat_radiation_patient_review set status ='N',updated_by="+
									UserId+" where patient_review_id="+id;    
					System.err.println("SQL :"+sql);
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
		
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	
	}
	
	@Override
	public int savePhysicsCal(PhysicsCalculationDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(PhysicsCalculationDTO objDTO1 : objDTO.getCalculationList()){
				
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						int id = objDTO1.getPhysicsCalculationId();
						objDTO1.setTreatmentId(treatmentId);
					
							if(id==0){
								objDTO1.setAddedBy(UserId);
								objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().save(objDTO1);
								result=1;
							}else{
								objDTO1.setUpdatedBy(UserId);
								objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
								result=2;
							}
						}
					}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
		return result;
	
	}
	
	@Override
	public List<PhysicsCalculationDTO> fetchPhysicsCal(int patientId,String date){

		List<PhysicsCalculationDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PhysicsCalculationDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}	
	
	@Override
	public int deleteCalculationRecord(int id,HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
				if(id!=0){
					String sql = "update ehat_radiation_physics_calculation set status ='N',updated_by="+
									UserId+" where physics_calculation_id="+id;    
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
		
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	
	}	
	
	@Override
	public int savePaymentDetails(PaymentDetailsDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(PaymentDetailsDTO objDTO1 : objDTO.getPaymentList()){
				
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						int id = objDTO1.getPaymentDetailId();
						objDTO1.setTreatmentId(treatmentId);
					
							if(id==0){
								objDTO1.setAddedBy(UserId);
								objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().save(objDTO1);
								result=1;
							}else{
								objDTO1.setUpdatedBy(UserId);
								objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
								result=2;
							}
						}
					}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
		return result;
	}
	
	@Override
	public List<PaymentDetailsDTO> fetchPaymentDetails(int patientId,String date){

		List<PaymentDetailsDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PaymentDetailsDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	@Override
	public int deletePaymentRecord(int id,HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
				if(id!=0){
					String sql = "update ehat_radiation_payment_details set status ='N',updated_by="+
									UserId+" where payment_details_id="+id;    
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
		
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	}	

	@Override
	public int savePaymentPackage(PaymentPackageDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(PaymentPackageDTO objDTO1 : objDTO.getPackageList()){
				
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						int id = objDTO1.getPaymentPackageId();
						objDTO1.setTreatmentId(treatmentId);
					
							if(id==0){
								objDTO1.setAddedBy(UserId);
								objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().save(objDTO1);
								result=1;
							}else{
								objDTO1.setUpdatedBy(UserId);
								objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
								result=2;
							}
						}
					}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
		return result;
	}
	
	@Override
	public List<PaymentPackageDTO> fetchPaymentPackage(int patientId,String date){

		List<PaymentPackageDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PaymentPackageDTO.class);
			
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("date", date));
					criteria.add(Restrictions.eq("status", "Y"));
					
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	@Override
	public List<RadiationPatientViewDTO> getRadiationPatients(String patientName){

		String radId = resourceBundleEhat.getObject("radiationId").toString();
		int radiationId = Integer.parseInt(radId);
		List<RadiationPatientViewDTO> list = null;
		
		
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RadiationPatientViewDTO.class);
				criteria.add(Restrictions.eq("serviceId", radiationId));
					if(!patientName.equals("")){
						criteria.add(Restrictions.like("patientName", "%" + patientName + "%"));
					}
				criteria.addOrder(Order.desc("billDate"));
				criteria.setMaxResults(20);
				list = criteria.list();
				
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}	
	
	@Override
	public int saveConsentForm(RadiationConsentDTO objDTO,HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId1");
				System.err.println("objDTO.getConsentList()"+objDTO.getConsentList());
				for(RadiationConsentDTO objDTO1 : objDTO.getConsentList()){
				
					int treatmentId = getTreatmentIdThroughPatientId(objDTO1.getPatientId());
					if(treatmentId==0)
					{
						result=3;
					}else{
						String queryType = objDTO1.getQueryType();
						objDTO1.setTreatmentId(treatmentId);
					
							if(queryType.equalsIgnoreCase("insert")){
								objDTO1.setAddedBy(UserId);
								objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().save(objDTO1);
								result=1;
							}else{
								objDTO1.setUpdatedBy(UserId);
								objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
								sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
								result=2;
							}
						}
					}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
		return result;
	}
	
	@Override
	public List<RadiationConsentDTO> fetchAllConsentForm(int patientId){

		int treatmentId = getTreatmentIdThroughPatientId(patientId);
		
		List<RadiationConsentDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RadiationConsentDTO.class);
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	@Override
	public List<RadiationConsentDTO> fetchConsentFormById(int consentFormId){

		List<RadiationConsentDTO> list = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RadiationConsentDTO.class);
			criteria.add(Restrictions.eq("consentFormId", consentFormId));
				list = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}	
	
	@Override
	public int sendToRadiation(String str,String callFrom,HttpServletRequest request){
		
		String radId = resourceBundleEhat.getObject(
				"radiationId").toString();
		int radiationId = Integer.parseInt(radId);
		String sql="";
		int result =0;
			try {

				String strArr [] = str.split(",");
				
				for(String s : strArr){
					
					int id = Integer.parseInt(s);
					
					if(callFrom.equalsIgnoreCase("ipdBill")){
						sql = "update ehat_bill_details_ipd set r_flag ='Y' where service_id="+radiationId+" AND bill_details_id="+id;	
					}else{
					sql = "update ehat_bill_details set r_flag ='Y' where service_id="+radiationId+" AND bill_details_id="+id;
					}
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
		return result;
	}
	
	
}