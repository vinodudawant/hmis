package com.hms.registration.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dto.OPDBmiMasterDTO;
import com.hms.dto.PatientBmiDTO;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.MultipleSponsorDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TokenDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.registration.dao.RegistrationDao;
import com.hms.registration.dto.MarkvisitPatientDetailsDto;
import com.hms.registration.dto.MrnNoCenterPatientIdDto;
import com.hms.registration.dto.OpdipdnoTokennoDto;
import com.hms.registration.dto.PatientConsultationChargesDto;
import com.hms.registration.dto.PatientDetailsDto;
import com.hms.registration.dto.PatientRegChargesDto;
import com.hms.registration.dto.PrefixDto;
import com.hms.registration.dto.RegistrationDataDto;
import com.hms.registration.dto.SpecialityWiseDoctorDto;
import com.hms.registration.dto.SpecializationDto;
import com.hms.sandbox.dto.SandBoxPatientInfo;
import com.hms.utility.SendSMSNoble;

@Repository
public class RegistrationDaoImpl implements RegistrationDao {

	static Logger log=Logger.getLogger(RegistrationDaoImpl.class.getName());
	static {
		System.out.println("RegistrationDaoImpl is Loaded...!");
	}
	
	@Autowired
	SessionFactory sessionFactory;
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	
	@Override
	public List<PrefixDto> getPrefixList(RegistrationDataDto regDto) {
		
		log.info("In RegistrationDaoImpl getPrefixList()");
		Session s = sessionFactory.getCurrentSession();
		try {
			
			Query prefixSp = s.createSQLQuery("call sp_get_dropdown_list_by_prefix_name(:prefixName)");//s.createStoredProcedureQuery("sp_get_dropdown_list_by_prefix_name", PrefixDto.class);
			prefixSp.setParameter("prefixName", regDto.getCallFrom());
			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(PrefixDto.class));
			@SuppressWarnings("unchecked")
			List<PrefixDto> lstPrefix = prefixSp.list();			
			log.debug("Response--------> "+lstPrefix);
			return lstPrefix;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<SpecializationDto> getSpecialization(SpecializationDto spDto) {
		
		log.info("In RegistrationDaoImpl getSpecialization()");
		Session s = sessionFactory.getCurrentSession();
		try {
			
			Query specialitySp = s.createSQLQuery("call sp_reg_get_hospital_specialization()");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(SpecializationDto.class));
			@SuppressWarnings("unchecked")
			List<SpecializationDto> lstSpecialization = specialitySp.list();			
			log.debug("Response--------> "+lstSpecialization);
			return lstSpecialization;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	} 	
	
	@Override
	public List<SpecialityWiseDoctorDto> getDoctorBySpecialization(SpecialityWiseDoctorDto doctorDto) {
		
		log.info("In RegistrationDaoImpl getDoctorBySpecialization()");
		Session s = sessionFactory.getCurrentSession();
		try {
			
			Query doctorSp;
			if(doctorDto.getDoctor_id() > 0) {
				
				doctorSp = s.createSQLQuery("call sp_reg_get_doctor_by_specialization(:specialityId)");
				doctorSp.setParameter("specialityId", doctorDto.getDoctor_id());
			}else {
				
				doctorSp = s.createSQLQuery("call sp_get_doctor_list()");
			}
			doctorSp.setResultTransformer(new AliasToBeanResultTransformer(SpecialityWiseDoctorDto.class));
			@SuppressWarnings("unchecked")
			List<SpecialityWiseDoctorDto> lstDoctor = doctorSp.list();			
			log.debug("Response--------> "+lstDoctor);
			return lstDoctor;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}		
	}	
	
	@Override
	public int savePatientDetails(RegistrationDto regDto) {
		
		log.info("In RegistrationDaoImpl savePatientDetails()");
		Session s = sessionFactory.openSession();
		Transaction tx = s.beginTransaction();
		int treatmentId = 0; 
		try {
			
			if(regDto.getQueryType().equalsIgnoreCase("insert") || regDto.getQueryType().equalsIgnoreCase("markvisit") || regDto.getListTreatment().get(0).getTreatmentId() == 0) {
				
				// SP for generate mrnno,centerpatientid,unitcount in patient object
				Query patientSp = s.createSQLQuery("call sp_reg_get_mrno_and_center_patient_id(:unitId,:departmentId)");
				patientSp.setParameter("unitId", regDto.getUnitId());
				patientSp.setParameter("departmentId", regDto.getListTreatment().get(0).getDepartmentId());
				patientSp.setResultTransformer(new AliasToBeanResultTransformer(MrnNoCenterPatientIdDto.class));
				@SuppressWarnings("unchecked")
				List<MrnNoCenterPatientIdDto> ltMrnDto = patientSp.list();	
				// Set generated numbers to patient dto
				regDto.setMrnno(ltMrnDto.get(0).getMrno());
				regDto.setCenterPatientId(ltMrnDto.get(0).getCenter_patient_id());
				regDto.setUnitCount(((Number)ltMrnDto.get(0).getUnitcount()).intValue());
				// Set generated numbers to billmaster dto
				regDto.getListBill().get(0).setCount(((Number)ltMrnDto.get(0).getBillcount()).intValue());
				
				
				// SP for generate opdipdno/treatmentcount/tokenno in treatment object
				Query treatSp = s.createSQLQuery("call sp_reg_get_opdipdno_treatcount_tokenno(:unitId,:deptId,:treatmentId,:spacialityId)");
				treatSp.setParameter("unitId", regDto.getUnitId());
				treatSp.setParameter("deptId", regDto.getListTreatment().get(0).getDepartmentId());
				treatSp.setParameter("treatmentId", 0);
				treatSp.setParameter("spacialityId", regDto.getListTreatment().get(0).getSpecialityId());
				treatSp.setResultTransformer(new AliasToBeanResultTransformer(OpdipdnoTokennoDto.class));
				@SuppressWarnings("unchecked")
				List<OpdipdnoTokennoDto> lstTokennoDto = treatSp.list();
				// Set generated numbers to treatment dto
				regDto.getListTreatment().get(0).setOpdipdno(lstTokennoDto.get(0).getOpdipdno());
				regDto.getListTreatment().get(0).setTrcount(lstTokennoDto.get(0).getTreatcount());
				regDto.getListTreatment().get(0).setTokenno(lstTokennoDto.get(0).getTokenno());
				if(regDto.getListTreatment().get(0).getDepartmentId() == 1 || regDto.getListTreatment().get(0).getDepartmentId() == 3) {
					
					regDto.getListBill().get(0).setInvoiceFlag("Y");
					regDto.getListBill().get(0).setInvCreatedBy(regDto.getCreatedBy());
					regDto.getListBill().get(0).setInvoiceCreatedDateTime(new Date());
					regDto.getListBill().get(0).setInvoiceCount(lstTokennoDto.get(0).getInvoiceCount().intValue());
				}
					
			}else if(regDto.getQueryType().equalsIgnoreCase("update")) {
				
				RegistrationDto obj = (RegistrationDto) s.get(RegistrationDto.class, regDto.getPatientId());
				regDto.setMrnno(obj.getMrnno());
				regDto.setCenterPatientId(obj.getCenterPatientId());
				regDto.setUnitCount(obj.getUnitCount());
				
				TreatmentDto tObj = (TreatmentDto) s.get(TreatmentDto.class, regDto.getListTreatment().get(0).getTreatmentId());
				regDto.getListTreatment().get(0).setOpdipdno(tObj.getOpdipdno());
				regDto.getListTreatment().get(0).setTrcount(tObj.getTrcount());
				//regDto.getListTreatment().get(0).setTokenno(tObj.getTokenno());
				
				BillMasterDto bObj = (BillMasterDto) s.get(BillMasterDto.class, regDto.getListBill().get(0).getBillId());
				regDto.getListBill().get(0).setCount(bObj.getCount());
				regDto.getListBill().get(0).setTotalBill(bObj.getTotalBill());
				regDto.getListBill().get(0).setTotalPaid(bObj.getTotalPaid());
				regDto.getListBill().get(0).setTotalRefund(bObj.getTotalRefund());
				regDto.getListBill().get(0).setTotalRemain(bObj.getTotalRemain());
				regDto.getListBill().get(0).setInvoiceCount(bObj.getInvoiceCount());
				regDto.getListBill().get(0).setBillSettledFlag(bObj.getBillSettledFlag());
				
				if(regDto.getListMultipleSponsor().size() > 0) {int mulSpId =  regDto.getListMultipleSponsor().get(0).getMulSponsorId();
					if(mulSpId > 0) {
						
						MultipleSponsorDto msObj = (MultipleSponsorDto) s.get(MultipleSponsorDto.class, regDto.getListMultipleSponsor().get(0).getMulSponsorId());
						regDto.getListMultipleSponsor().get(0).setTotalBill(msObj.getTotalBill());
						regDto.getListMultipleSponsor().get(0).setTotalPaid(msObj.getTotalPaid());
						regDto.getListMultipleSponsor().get(0).setTotalRefund(msObj.getTotalRefund());
						regDto.getListMultipleSponsor().get(0).setTotalRemain(msObj.getTotalRemain());
						regDto.getListMultipleSponsor().get(0).setDiscount(msObj.getDiscount());
						regDto.getListMultipleSponsor().get(0).setTotalConcn(msObj.getTotalConcn());
						regDto.getListMultipleSponsor().get(0).setTotalTds(msObj.getTotalTds());
					}
				
				}
			}
	        // Set all slave for registration
			setAllSlaveList(regDto);
	        
	        RegistrationDto savedObj = (RegistrationDto) s.merge(regDto);	
	        int patientId = savedObj.getPatientId();
	        treatmentId = savedObj.getListTreatment().get(0).getTreatmentId();
	        int billId = savedObj.getListBill().get(0).getBillId();
	        tx.commit();
	        s.flush();
			s.clear();
			s.close();
			
			// Save Token Details
			if(regDto.getQueryType().equalsIgnoreCase("insert") || regDto.getQueryType().equalsIgnoreCase("markvisit") || regDto.getListTreatment().get(0).getTreatmentId() == 0)
				saveTokenDetails(patientId,treatmentId,billId,regDto);
			
			//Save Registration and consultation charges
			if(regDto.getListTreatment().get(0).getDepartmentId() != 2)
				saveBillDetails(patientId,treatmentId,billId,regDto);
	        
	        // Save BMI details
	        savePatientBMIDetails(patientId,treatmentId,regDto);
	        
			log.debug("Response--------> "+treatmentId);
			if(regDto.getPatientApId() > 0) {
				updatePatientAppointment(patientId,regDto.getPatientApId());
			}
			
			//insert record in ehat_ivf_treatment
			saveIVFTreatment(regDto,patientId,treatmentId,billId);
			
			// save ehat sandbox patient data
			
			ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String abdmFlow = resourceBundleEha.getObject("abdmFlowOnOff").toString();
			
			if(abdmFlow.equalsIgnoreCase("on")) {
				saveSandBoxPatientInfo(regDto,patientId);
			}
			
			if (regDto.getQueryType().equalsIgnoreCase("update")) {
				if (regDto.getListTreatment().get(0).getDepartmentId() == 1
						|| regDto.getListTreatment().get(0).getDepartmentId() == 3) {
					String sqlOpd = "update ehat_bill_details set charges_slave_id="
							+ regDto.getListTreatment().get(0).getSponsorId() + " where treatment_id="
							+ regDto.getListTreatment().get(0).getTreatmentId() + " ";

					SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sqlOpd);
					q.executeUpdate();
				} else if (regDto.getListTreatment().get(0).getDepartmentId() == 2) {
					String sqlOpd = "update ehat_bill_details_ipd set charges_slave_id="
							+ regDto.getListTreatment().get(0).getSponsorId() + " where treatment_id="
							+ regDto.getListTreatment().get(0).getTreatmentId() + " ";

					SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sqlOpd);
					q.executeUpdate();
				}

			}
			
			return treatmentId;
			
		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
			return 0;
		}
	}
	
	public void setAllSlaveList(RegistrationDto regDto) {
		
		// Treatment slave
		regDto.getListTreatment().get(0).setListBill(regDto.getListBill());
		regDto.getListTreatment().get(0).setListMultipleSponsor(regDto.getListMultipleSponsor());
        regDto.getListTreatment().get(0).setListMlcDetails(regDto.getListMlcDetails());
        regDto.getListTreatment().get(0).setListPayRes(regDto.getListPayRes());
        
        // Bill slave
        regDto.getListTreatment().get(0).getListBill().get(0).setListMultipleSponsor(regDto.getListMultipleSponsor());
        regDto.getListTreatment().get(0).getListBill().get(0).setListMlcDetails(regDto.getListMlcDetails());
        regDto.getListTreatment().get(0).getListBill().get(0).setListPayRes(regDto.getListPayRes());
	}
	
	public int saveTokenDetails(int patientId, int treatmentId, int billId, RegistrationDto regDto) {
		
		log.info("In RegistrationDaoImpl saveTokenDetails()");
		int result = 0;
		try {
			
			TokenDto tn = new TokenDto();
			tn.setTreatmentId(treatmentId);
			tn.setPatientId(patientId);
			if(regDto.getListTreatment().get(0).getSpecialityId() != null)
				tn.setSpecialityId(Integer.parseInt(regDto.getListTreatment().get(0).getSpecialityId()));
			else
				tn.setSpecialityId(0);
			String docId = regDto.getListTreatment().get(0).getDoctorIdList();
			if(docId.equals("") || docId.length() == 0)
				docId = "0";
			tn.setDoctorIdList(docId);
			tn.setDepartmentId(regDto.getListTreatment().get(0).getDepartmentId());
			tn.setUnitId(regDto.getListTreatment().get(0).getUnitId());
			tn.setQueueStatus("unpaid");
			sessionFactory.getCurrentSession().merge(tn);
			
		}catch(Exception e) {
			
			e.printStackTrace();
		}
		return result;
	}
	
	// Function to save registration and consultation charges
	public int saveBillDetails(int patientId, int treatmentId, int billId, RegistrationDto regDto) {
		
		log.info("In RegistrationDaoImpl saveBillDetails()");
		int result = 0;
		try {
			
			String sql="";
			if(regDto.getListTreatment().get(0).getDepartmentId() == 3 && regDto.getListBill().get(0).getSponsorId()  == 0) {
			      
				sql = "call sp_reg_get_registration_charges_for_diagnostic(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)";
			}
			else if(regDto.getListBill().get(0).getSponsorId()  > 0) {
				if(regDto.getListTreatment().get(0).getDepartmentId() == 1) {
					
					sql = "call sp_reg_get_registration_charges_Sponser_opd(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)";
				}
				//else if(regDto.getListTreatment().get(0).getDepartmentId() == 2) {					
				//}
               else if(regDto.getListTreatment().get(0).getDepartmentId() == 3) {
            	            
            	   sql = "call sp_reg_get_registration_charges_Sponser_diagnostic(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)";
				
               }else {			       
				sql = "call sp_reg_get_registration_charges(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)";
				}
			}		
			else {
			      
				sql = "call sp_reg_get_registration_charges(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)";
			}
			// SP for get registration charges
			//Query spQuery = sessionFactory.getCurrentSession().createSQLQuery("call sp_reg_get_registration_charges(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)");
			
			// Updated by Rohini Ambhore for seperate registration charge for opd and diag
			Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			
			spQuery.setParameter("unit_id", regDto.getUnitId());
			spQuery.setParameter("department_id", regDto.getListTreatment().get(0).getDepartmentId());
			spQuery.setParameter("service_id", 1);
			spQuery.setParameter("patient_id", patientId);
			spQuery.setParameter("treatment_id", treatmentId);
			spQuery.setParameter("charges_slave_id", regDto.getListBill().get(0).getSponsorId());
			spQuery.setParameter("query_type", regDto.getQueryType());			
			spQuery.setResultTransformer(new AliasToBeanResultTransformer(PatientRegChargesDto.class));
			@SuppressWarnings("unchecked")
			List<PatientRegChargesDto> ltRegChargesDto = spQuery.list();
			for(PatientRegChargesDto obj : ltRegChargesDto) {
				
				double regCharges = 0;
				int chargesSlaveId = regDto.getListBill().get(0).getSponsorId();
				if(chargesSlaveId > 0) {
					
					regCharges = obj.getN_other_amount();
					//regCharges = obj.getN_confg_reg_charges();
				}else {
					
					regCharges = obj.getN_amount();
				}
				
				//if(regCharges > 0) {
				if(regCharges >= 0 && (regDto.getQueryType().equalsIgnoreCase("insert") || regDto.getQueryType().equalsIgnoreCase("markvisit")) ) {
					
					BillDetailsDto objBill = new BillDetailsDto();
					objBill.setPatienttId(patientId);
					objBill.setTreatmentId(treatmentId);
					objBill.setBillId(billId);
					objBill.setDepartmentId(regDto.getListBill().get(0).getDepartmentId());
					objBill.setChargesSlaveId(regDto.getListBill().get(0).getSponsorId());
					if(regDto.getQueryType().equalsIgnoreCase("insert"))
						objBill.setCreatedBy(regDto.getListBill().get(0).getCreatedBy());
					else
						objBill.setUpdatedBy(regDto.getListBill().get(0).getUpdatedBy());
					objBill.setUnitId(regDto.getListBill().get(0).getUnitId());
					objBill.setServiceId(1);
					objBill.setSubServiceId(obj.getN_sub_serv_id_reg());
					objBill.setRate(obj.getN_amount());
					objBill.setQuantity(1);
					objBill.setAmount(obj.getN_amount());
					objBill.setCoPay(obj.getN_amount());
					
					objBill.setOtherRate(obj.getN_other_amount());
					if(chargesSlaveId > 0) {
						
						objBill.setOtherAmount(obj.getN_confg_reg_charges());
						
					}else {
						
						objBill.setOtherAmount(obj.getN_other_amount());
					}
					//objBill.setOtherAmount(obj.getN_other_amount());
					//objBill.setOtherAmount(obj.getN_confg_reg_charges());
					objBill.setOtherPay(obj.getN_other_amount());
					objBill.setCreatedBy(regDto.getListBill().get(0).getCreatedBy());
					sessionFactory.getCurrentSession().merge(objBill);
				}
			}
			int freeFollowUpCount=0;
			if(regDto.getQueryType().equalsIgnoreCase("markvisit") && regDto.getListBill().get(0).getSponsorId() > 0) {
				
				String sqlCount=" select count(*) from ehat_treatment where patient_id="+patientId+" and charges_slave_id="+regDto.getListBill().get(0).getSponsorId()+" and department_id="+2+" ";
				SQLQuery CountQuery=sessionFactory.getCurrentSession().createSQLQuery(sqlCount);
			      int count=((Number) CountQuery.uniqueResult()).intValue();
			      if(count > 0) {
			       	String sqlF=" select ifnull(free_follow_up_count,0) as followup_count from ehat_treatment where patient_id="+patientId+" and charges_slave_id="+regDto.getListBill().get(0).getSponsorId()+" and department_id='2' order by treatment_id desc  limit 1 ";
			         SQLQuery sQuery=sessionFactory.getCurrentSession().createSQLQuery(sqlF);
			          freeFollowUpCount=((Number) sQuery.uniqueResult()).intValue();
			      }
			}
			
				if(freeFollowUpCount ==0) {
						String docId = regDto.getListTreatment().get(0).getDoctorIdList();
						if(!(docId.equals("") || docId.equals("0") || docId.length() == 0)) {
							
							// SP for get consultation charges
							Query spQuery1 = sessionFactory.getCurrentSession().createSQLQuery("call sp_reg_get_consultation_charges(:patient_id,:treatment_id,:unit_id,:department_id,:user_id,:charges_slave_id,:bill_id,:service_id,:query_type,:doctor_id_list,:speciality_id_list)");
							spQuery1.setParameter("patient_id", patientId);
							spQuery1.setParameter("treatment_id", treatmentId);
							spQuery1.setParameter("unit_id", regDto.getUnitId());
							spQuery1.setParameter("department_id", regDto.getListTreatment().get(0).getDepartmentId());
							spQuery1.setParameter("user_id", regDto.getCreatedBy());
							spQuery1.setParameter("charges_slave_id", regDto.getListBill().get(0).getSponsorId());
							spQuery1.setParameter("bill_id", billId);
							spQuery1.setParameter("service_id", 2);
							spQuery1.setParameter("query_type", regDto.getQueryType());
							spQuery1.setParameter("doctor_id_list", regDto.getListTreatment().get(0).getDoctorIdList());
							spQuery1.setParameter("speciality_id_list", regDto.getListTreatment().get(0).getSpecialityId());
							spQuery1.setResultTransformer(new AliasToBeanResultTransformer(PatientConsultationChargesDto.class));
							@SuppressWarnings("unchecked")
							List<PatientConsultationChargesDto> ltConsultChargesDto = spQuery1.list();
							for(PatientConsultationChargesDto obj : ltConsultChargesDto) {
								
								
								BillDetailsDto objBill = new BillDetailsDto();
								objBill.setPatienttId(patientId);
								objBill.setTreatmentId(treatmentId);
								objBill.setBillId(billId);
								objBill.setDepartmentId(regDto.getListBill().get(0).getDepartmentId());
								objBill.setChargesSlaveId(regDto.getListBill().get(0).getSponsorId());
								if(regDto.getQueryType().equalsIgnoreCase("insert") || regDto.getQueryType().equalsIgnoreCase("markvisit"))
									objBill.setCreatedBy(regDto.getListBill().get(0).getCreatedBy());
								else
									objBill.setUpdatedBy(regDto.getListBill().get(0).getUpdatedBy());
								objBill.setUnitId(regDto.getListBill().get(0).getUnitId());
								objBill.setSpecialityId(Integer.parseInt(regDto.getListTreatment().get(0).getSpecialityId()));
								objBill.setDoctorId(obj.getN_doctor_id());
								objBill.setServiceId(2);
								objBill.setSubServiceId(obj.getN_sub_service_id());
								objBill.setRate(obj.getN_amount());
								objBill.setQuantity(1);
								objBill.setAmount(obj.getN_amount());
								objBill.setCoPay(obj.getN_amount());
								
								objBill.setOtherRate(obj.getN_other_amount());
								objBill.setOtherAmount(obj.getN_other_amount());
								objBill.setOtherPay(obj.getN_other_amount());
								objBill.setCreatedBy(regDto.getListBill().get(0).getCreatedBy());
								sessionFactory.getCurrentSession().merge(objBill);
							}
						}
				}else {
					
					   ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
						String followUpId =(resourceBundle.getObject("followUpId").toString());
					
					if(freeFollowUpCount > 0) {
						freeFollowUpCount=freeFollowUpCount-1;
						String sqlUpdate=" update   ehat_treatment   set free_follow_up_count="+freeFollowUpCount+" where patient_id="+patientId+" and charges_slave_id="+regDto.getListBill().get(0).getSponsorId()+" and department_id='2' order by treatment_id desc limit 1  ";
						 SQLQuery updateQuery=sessionFactory.getCurrentSession().createSQLQuery(sqlUpdate);
						    updateQuery.executeUpdate();
						    
							String docId = regDto.getListTreatment().get(0).getDoctorIdList();
							if(!(docId.equals("") || docId.equals("0") || docId.length() == 0)) {
								
								// SP for get consultation charges
								Query spQuery1 = sessionFactory.getCurrentSession().createSQLQuery("call sp_reg_get_consultation_charges(:patient_id,:treatment_id,:unit_id,:department_id,:user_id,:charges_slave_id,:bill_id,:service_id,:query_type,:doctor_id_list,:speciality_id_list)");
								spQuery1.setParameter("patient_id", patientId);
								spQuery1.setParameter("treatment_id", treatmentId);
								spQuery1.setParameter("unit_id", regDto.getUnitId());
								spQuery1.setParameter("department_id", regDto.getListTreatment().get(0).getDepartmentId());
								spQuery1.setParameter("user_id", regDto.getCreatedBy());
								spQuery1.setParameter("charges_slave_id", regDto.getListBill().get(0).getSponsorId());
								spQuery1.setParameter("bill_id", billId);
								spQuery1.setParameter("service_id", 2);
								spQuery1.setParameter("query_type", regDto.getQueryType());
								spQuery1.setParameter("doctor_id_list", regDto.getListTreatment().get(0).getDoctorIdList());
								spQuery1.setParameter("speciality_id_list", regDto.getListTreatment().get(0).getSpecialityId());
								spQuery1.setResultTransformer(new AliasToBeanResultTransformer(PatientConsultationChargesDto.class));
								@SuppressWarnings("unchecked")
								List<PatientConsultationChargesDto> ltConsultChargesDto = spQuery1.list();
								for(PatientConsultationChargesDto obj : ltConsultChargesDto) {
									
									
									BillDetailsDto objBill = new BillDetailsDto();
									objBill.setPatienttId(patientId);
									objBill.setTreatmentId(treatmentId);
									objBill.setBillId(billId);
									objBill.setDepartmentId(regDto.getListBill().get(0).getDepartmentId());
									objBill.setChargesSlaveId(regDto.getListBill().get(0).getSponsorId());
									if(regDto.getQueryType().equalsIgnoreCase("insert") || regDto.getQueryType().equalsIgnoreCase("markvisit"))
										objBill.setCreatedBy(regDto.getListBill().get(0).getCreatedBy());
									else
										objBill.setUpdatedBy(regDto.getListBill().get(0).getUpdatedBy());
									objBill.setUnitId(regDto.getListBill().get(0).getUnitId());
									objBill.setSpecialityId(Integer.parseInt(regDto.getListTreatment().get(0).getSpecialityId()));
									objBill.setDoctorId(obj.getN_doctor_id());
									objBill.setServiceId(2);
									objBill.setSubServiceId(Integer.parseInt(followUpId));// added for Follow up
									objBill.setRate(0);
									objBill.setQuantity(1);
									objBill.setAmount(0);
									objBill.setCoPay(0);
									
									objBill.setOtherRate(0);
									objBill.setOtherAmount(0);
									objBill.setOtherPay(0);
									objBill.setCreatedBy(regDto.getListBill().get(0).getCreatedBy());
									sessionFactory.getCurrentSession().merge(objBill);
								}
							}
					
						    
						    
					}
				}
			
			// update sponsor id against registartion and consultation charges
			
			String sqlUpdate ="update ehat_bill_details set charges_slave_id="+regDto.getListBill().get(0).getSponsorId()+" where service_id="+1+" and treatment_id="+treatmentId+" ";
			 SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sqlUpdate);
			 q.executeUpdate();
			 //end update
			 
			result = 1;
			log.debug("Response--------> "+result);
			
		}catch(Exception e) {
			
			e.printStackTrace();
		}
		return result;
	}
	
	public int savePatientBMIDetails(int patientId,int treatmentId,RegistrationDto regDto) {
		
		int result=0;
		try {
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
			
			TreatmentDto treatObj =  regDto.getListTreatment().get(0);
			
			PatientBmiDTO obj = new PatientBmiDTO();
			obj.setPatient_id(patientId);
			obj.setPatient_treat_id(treatmentId);
			obj.setPatient_treat_count(treatObj.getTrcount());
			obj.setPatient_height(treatObj.getHeight());
			obj.setPatient_weight(treatObj.getWeight());
			obj.setPatient_bmi(treatObj.getBMI());
			obj.setPatient_bsa(treatObj.getBSA());
			obj.setPatient_headcim(treatObj.getHCIM());
			
			Date date = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		 String strDate= sdf.format(date);
		
			
			if(regDto.getQueryType().equalsIgnoreCase("insert")) {
				
				obj.setUserId(treatObj.getCreatedBy());
				obj.setCreatedBy(treatObj.getCreatedBy());
				String dt =	sdf.format(new Date());
				obj.setDate(dt);
			}else{
				obj.setUpdatedBy(treatObj.getUpdatedBy());
				String dt =	sdf.format(new Date());
				obj.setDate(dt);
				
				// update latest bmi in opd_bmi_master table
				String sqlCount="select count(*) from opd_bmi_master where treatment_id="+treatmentId+"";
			       SQLQuery q	=sessionFactory.getCurrentSession().createSQLQuery(sqlCount);
			         int count= ((Number) q.uniqueResult()).intValue();
			         if(count > 0) {
			        	 List<OPDBmiMasterDTO> list=new ArrayList<OPDBmiMasterDTO>();
			        	 TreatmentDto tobj=(TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
			        	 Criteria c=  sessionFactory.getCurrentSession().createCriteria(OPDBmiMasterDTO.class);
			 			c.add(Restrictions.eq("treatObj", tobj));
			 			c.add(Restrictions.eq("deleted", "N"));
			 			list=c.list();
			 			  if(list.size() > 0) {
			 				 OPDBmiMasterDTO bObj  =list.get(0);
			 				bObj.setWeight(treatObj.getWeight());
			 				bObj.setHeight(treatObj.getHeight());
			 				bObj.setBmi(treatObj.getBMI());
			 				bObj.setBsa(treatObj.getBSA());
			 				bObj.setHeadCM(Double.toString(treatObj.getHCIM()));
			 				bObj.setBmiDate(dt);
			 			  }
			         }
				
			}
				
			obj.setUnitId(treatObj.getUnitId());
			obj.setStatus("Y");
			obj.setCreatedBy(treatObj.getCreatedBy());
			obj.setUserId(treatObj.getCreatedBy());
			sessionFactory.getCurrentSession().merge(obj);
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return result;
	}
	
	@Override
	public int savePatientDemographicDetails(RegistrationDto regDto) {
		
		log.info("In RegistrationDaoImpl savePatientDemographicDetails()");
	
		int patientId = 0; 
		try {
			// SP for generate mrnno,centerpatientid,unitcount
			Query patientSp = sessionFactory.getCurrentSession().createSQLQuery("call sp_reg_get_mrno_and_center_patient_id(:unitId,:departmentId)");
			patientSp.setParameter("unitId", regDto.getUnitId());
			patientSp.setParameter("departmentId", 0);
			patientSp.setResultTransformer(new AliasToBeanResultTransformer(MrnNoCenterPatientIdDto.class));
			@SuppressWarnings("unchecked")
			List<MrnNoCenterPatientIdDto> ltMrnDto = patientSp.list();
			
			regDto.setMrnno(ltMrnDto.get(0).getMrno());
			regDto.setCenterPatientId(ltMrnDto.get(0).getCenter_patient_id());
			regDto.setUnitCount(((Number)ltMrnDto.get(0).getUnitcount()).intValue());
			
			//Save patient details
			
			RegistrationDto savedObj = (RegistrationDto) sessionFactory.getCurrentSession().merge(regDto);	
	        patientId = savedObj.getPatientId();
			log.debug("Response--------> "+patientId);
			return patientId;
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		

		
		/*log.info("In RegistrationDaoImpl savePatientDetails()");
		Session s = sessionFactory.getCurrentSession();
		//Transaction tx = s.beginTransaction();
		int treatmentId = 0; 
		int patientId = 0;
	    int billId = 0;
		
		try {
			
			
			
			if(regDto.getPatientId()==0) {
					
					Query patientSp = s.createSQLQuery("call sp_reg_save_patient_demographic_details("
							+ ":patientId,:aadharImageName,:address,:adharcardNo,:age,:ageDays,:ageMonths,:annualIncomeId,:areaCode,:blockFlag,"
							+ ":blockNarration1,:blockNarration2,:blockNarration3,:blockUserId1,:blockUserId2,:blockUserId3,:blockUserName1,:blockUserName2,:blockUserName3,:blockedDateTime,"
							+ ":bloodGroupId,:centerPatientId,:countryId,:createdBy,:createdDateTime,:deleted,:deletedBy,:deletedDateTime,:districtId,:dob,"
							+ ":education,:emailId,:emergency,:external,:fName,:gender,:identificationNumber,:identityProofId,:imageName,:lName,"
							+ ":languageId,:mName,:maritalStatusId,:mobile,:nationalityId,:occupation,:oldPatientId,:passport,:perAddress,:perareaCode,"
							+ ":percountryId,:perdistrictId,:perstateId,:pertalukaId,:pertownId,:pramoEmail,:pramoSMS,:prefix,:relationId,:relativeName,"
							+ ":religionId,:stateId,:talukaId,:townId,:transEmail,:transSMS,:unitCount,:unitId,:updatedBy,:updatedDateTime,"
							+ ":visa,:ivfTreatFlag,:relative_mb,:seropositive,:organDonarFlag,:healthId,:healthIdNumber ,:adharcardNo ,:pramoEmail ,:transEmail "
							+ " )"); 
					// patient Details
					patientSp.setParameter("patientId", regDto.getPatientId());
					patientSp.setParameter("aadharImageName", regDto.getAadharImageName());
					patientSp.setParameter("address", regDto.getAddress());
					patientSp.setParameter("adharcardNo", regDto.getAdharcardNo());
					patientSp.setParameter("age", regDto.getAge());
					patientSp.setParameter("ageDays", regDto.getAgeDays());
					patientSp.setParameter("ageMonths", regDto.getAgeMonths());
					patientSp.setParameter("annualIncomeId", regDto.getAnnualIncomeId());
					patientSp.setParameter("areaCode", regDto.getAreaCode());
					patientSp.setParameter("blockFlag", regDto.getBlockFlag());
					patientSp.setParameter("blockNarration1", regDto.getBlockNarration1());
					patientSp.setParameter("blockNarration2", regDto.getBlockNarration2());
					patientSp.setParameter("blockNarration3", regDto.getBlockNarration3());
					patientSp.setParameter("blockUserId1", regDto.getBlockUserId1());
					patientSp.setParameter("blockUserId2", regDto.getBlockUserId2());
					patientSp.setParameter("blockUserId3", regDto.getBlockUserId3());
					patientSp.setParameter("blockUserName1", regDto.getBlockUserName1());
					patientSp.setParameter("blockUserName2", regDto.getBlockUserName2());
					patientSp.setParameter("blockUserName3", regDto.getBlockUserName3());
					patientSp.setParameter("blockedDateTime", regDto.getBlockedDateTime());
					patientSp.setParameter("bloodGroupId", regDto.getBloodGroupId());
					patientSp.setParameter("centerPatientId", regDto.getCenterPatientId());
					patientSp.setParameter("countryId", regDto.getCountryId());
					patientSp.setParameter("createdBy", regDto.getCreatedBy());
					patientSp.setParameter("createdDateTime", new Date());
					patientSp.setParameter("deleted", regDto.getDeleted());
					patientSp.setParameter("deletedBy", regDto.getDeletedBy());
					patientSp.setParameter("deletedDateTime", regDto.getDeletedDateTime());
					patientSp.setParameter("districtId", regDto.getDistrictId());
					patientSp.setParameter("dob", regDto.getDob());
					patientSp.setParameter("education", regDto.getEducation());
					patientSp.setParameter("emailId", regDto.getEmailId());
					patientSp.setParameter("emergency", regDto.getEmergency());
					patientSp.setParameter("external", regDto.getExternal());
					patientSp.setParameter("fName", regDto.getfName());
					patientSp.setParameter("gender", regDto.getGender());
					patientSp.setParameter("identificationNumber", regDto.getIdentificationNumber());
					patientSp.setParameter("identityProofId", regDto.getIdentityProofId());
					patientSp.setParameter("imageName", regDto.getImageName());
					patientSp.setParameter("lName", regDto.getlName());
					patientSp.setParameter("languageId", regDto.getLanguageId());
					patientSp.setParameter("mName", regDto.getmName());
					patientSp.setParameter("maritalStatusId", regDto.getMaritalStatusId());
					patientSp.setParameter("mobile", regDto.getMobile());
					patientSp.setParameter("nationalityId", regDto.getNationalityId());
					patientSp.setParameter("occupation", regDto.getOccupation());
					patientSp.setParameter("oldPatientId", regDto.getOldPatientId());
					patientSp.setParameter("passport", regDto.getPassport());
					patientSp.setParameter("perAddress", regDto.getPerAddress());
					patientSp.setParameter("perareaCode", regDto.getPerareaCode());
					patientSp.setParameter("percountryId", regDto.getPercountryId());
					patientSp.setParameter("perdistrictId", regDto.getPerdistrictId());
					patientSp.setParameter("perstateId", regDto.getPerstateId());
					patientSp.setParameter("pertalukaId", regDto.getPertalukaId());
					patientSp.setParameter("pertownId", regDto.getPertownId());
					patientSp.setParameter("pramoEmail", regDto.getPramoEmail());
					patientSp.setParameter("pramoSMS", regDto.getPramoSMS());
					patientSp.setParameter("prefix", regDto.getPrefix());
					patientSp.setParameter("relationId", regDto.getRelationId());
					patientSp.setParameter("relativeName", regDto.getRelativeName());
					patientSp.setParameter("religionId", regDto.getReligionId());
					patientSp.setParameter("stateId", regDto.getStateId());
					patientSp.setParameter("talukaId", regDto.getTalukaId());
					patientSp.setParameter("townId", regDto.getTownId());
					patientSp.setParameter("transEmail", regDto.getTransEmail());
					patientSp.setParameter("transSMS", regDto.getTransSMS());
					patientSp.setParameter("unitCount", regDto.getUnitCount());
					patientSp.setParameter("unitId", regDto.getUnitId());
					patientSp.setParameter("updatedBy", regDto.getUpdatedBy());
					patientSp.setParameter("updatedDateTime", regDto.getUpdatedDateTime());
					patientSp.setParameter("visa", regDto.getVisa());
					patientSp.setParameter("ivfTreatFlag", regDto.getIvfTreatFlag());
					patientSp.setParameter("relative_mb", null);
					patientSp.setParameter("seropositive", null);
					patientSp.setParameter("organDonarFlag", regDto.getOrganDonarFlag());
					patientSp.setParameter("healthId", regDto.getHealthId());
					patientSp.setParameter("healthIdNumber",regDto.getHealthIdNumber());
					patientSp.setParameter("adharcardNo", regDto.getAdharcardNo());
					patientSp.setParameter("pramoEmail", regDto.getPramoEmail());
					patientSp.setParameter("transEmail", regDto.getTransEmail());
					
					patientSp.setResultTransformer(new AliasToBeanResultTransformer(BillMasterDto.class));
					List<BillMasterDto> ltPatDetailsDto = patientSp.list();
					for(BillMasterDto obj : ltPatDetailsDto) {
						
						patientId = obj.getPatienttId();
						treatmentId = obj.getTreatmentId();
						billId = obj.getBillId();
					}
					
			 }else if(regDto.getPatientId() > 0) {
                       // update demographic details
					
					Query patientSp = s.createSQLQuery("call sp_reg_update_patient_registration_details("
							+ ":patientId,:aadharImageName,:address,:adharcardNo,:age,:ageDays,:ageMonths,:annualIncomeId,:areaCode,:blockFlag,"
							+ ":blockNarration1,:blockNarration2,:blockNarration3,:blockUserId1,:blockUserId2,:blockUserId3,:blockUserName1,:blockUserName2,:blockUserName3,:blockedDateTime,"
							+ ":bloodGroupId,:centerPatientId,:countryId,:createdBy,:createdDateTime,:deleted,:deletedBy,:deletedDateTime,:districtId,:dob,"
							+ ":education,:emailId,:emergency,:external,:fName,:gender,:identificationNumber,:identityProofId,:imageName,:lName,"
							+ ":languageId,:mName,:maritalStatusId,:mobile,:nationalityId,:occupation,:oldPatientId,:passport,:perAddress,:perareaCode,"
							+ ":percountryId,:perdistrictId,:perstateId,:pertalukaId,:pertownId,:pramoEmail,:pramoSMS,:prefix,:relationId,:relativeName,"
							+ ":religionId,:stateId,:talukaId,:townId,:transEmail,:transSMS,:unitCount,:unitId,:updatedBy,:updatedDateTime,"
							+ ":visa,:ivfTreatFlag,:relative_mb,:seropositive,:organDonarFlag,:healthId,:healthIdNumber ,:adharcardNo ,:pramoEmail ,:transEmail "
							+ " )"); 
					// patient Details
					patientSp.setParameter("patientId", regDto.getPatientId());
					patientSp.setParameter("aadharImageName", regDto.getAadharImageName());
					patientSp.setParameter("address", regDto.getAddress());
					patientSp.setParameter("adharcardNo", regDto.getAdharcardNo());
					patientSp.setParameter("age", regDto.getAge());
					patientSp.setParameter("ageDays", regDto.getAgeDays());
					patientSp.setParameter("ageMonths", regDto.getAgeMonths());
					patientSp.setParameter("annualIncomeId", regDto.getAnnualIncomeId());
					patientSp.setParameter("areaCode", regDto.getAreaCode());
					patientSp.setParameter("blockFlag", regDto.getBlockFlag());
					patientSp.setParameter("blockNarration1", regDto.getBlockNarration1());
					patientSp.setParameter("blockNarration2", regDto.getBlockNarration2());
					patientSp.setParameter("blockNarration3", regDto.getBlockNarration3());
					patientSp.setParameter("blockUserId1", regDto.getBlockUserId1());
					patientSp.setParameter("blockUserId2", regDto.getBlockUserId2());
					patientSp.setParameter("blockUserId3", regDto.getBlockUserId3());
					patientSp.setParameter("blockUserName1", regDto.getBlockUserName1());
					patientSp.setParameter("blockUserName2", regDto.getBlockUserName2());
					patientSp.setParameter("blockUserName3", regDto.getBlockUserName3());
					patientSp.setParameter("blockedDateTime", regDto.getBlockedDateTime());
					patientSp.setParameter("bloodGroupId", regDto.getBloodGroupId());
					patientSp.setParameter("centerPatientId", regDto.getCenterPatientId());
					patientSp.setParameter("countryId", regDto.getCountryId());
					patientSp.setParameter("createdBy", regDto.getCreatedBy());
					patientSp.setParameter("createdDateTime", new Date());
					patientSp.setParameter("deleted", regDto.getDeleted());
					patientSp.setParameter("deletedBy", regDto.getDeletedBy());
					patientSp.setParameter("deletedDateTime", regDto.getDeletedDateTime());
					patientSp.setParameter("districtId", regDto.getDistrictId());
					patientSp.setParameter("dob", regDto.getDob());
					patientSp.setParameter("education", regDto.getEducation());
					patientSp.setParameter("emailId", regDto.getEmailId());
					patientSp.setParameter("emergency", regDto.getEmergency());
					patientSp.setParameter("external", regDto.getExternal());
					patientSp.setParameter("fName", regDto.getfName());
					patientSp.setParameter("gender", regDto.getGender());
					patientSp.setParameter("identificationNumber", regDto.getIdentificationNumber());
					patientSp.setParameter("identityProofId", regDto.getIdentityProofId());
					patientSp.setParameter("imageName", regDto.getImageName());
					patientSp.setParameter("lName", regDto.getlName());
					patientSp.setParameter("languageId", regDto.getLanguageId());
					patientSp.setParameter("mName", regDto.getmName());
					patientSp.setParameter("maritalStatusId", regDto.getMaritalStatusId());
					patientSp.setParameter("mobile", regDto.getMobile());
					patientSp.setParameter("nationalityId", regDto.getNationalityId());
					patientSp.setParameter("occupation", regDto.getOccupation());
					patientSp.setParameter("oldPatientId", regDto.getOldPatientId());
					patientSp.setParameter("passport", regDto.getPassport());
					patientSp.setParameter("perAddress", regDto.getPerAddress());
					patientSp.setParameter("perareaCode", regDto.getPerareaCode());
					patientSp.setParameter("percountryId", regDto.getPercountryId());
					patientSp.setParameter("perdistrictId", regDto.getPerdistrictId());
					patientSp.setParameter("perstateId", regDto.getPerstateId());
					patientSp.setParameter("pertalukaId", regDto.getPertalukaId());
					patientSp.setParameter("pertownId", regDto.getPertownId());
					patientSp.setParameter("pramoEmail", regDto.getPramoEmail());
					patientSp.setParameter("pramoSMS", regDto.getPramoSMS());
					patientSp.setParameter("prefix", regDto.getPrefix());
					patientSp.setParameter("relationId", regDto.getRelationId());
					patientSp.setParameter("relativeName", regDto.getRelativeName());
					patientSp.setParameter("religionId", regDto.getReligionId());
					patientSp.setParameter("stateId", regDto.getStateId());
					patientSp.setParameter("talukaId", regDto.getTalukaId());
					patientSp.setParameter("townId", regDto.getTownId());
					patientSp.setParameter("transEmail", regDto.getTransEmail());
					patientSp.setParameter("transSMS", regDto.getTransSMS());
					patientSp.setParameter("unitCount", regDto.getUnitCount());
					patientSp.setParameter("unitId", regDto.getUnitId());
					patientSp.setParameter("updatedBy", regDto.getUpdatedBy());
					patientSp.setParameter("updatedDateTime", regDto.getUpdatedDateTime());
					patientSp.setParameter("visa", regDto.getVisa());
					patientSp.setParameter("ivfTreatFlag", regDto.getIvfTreatFlag());
					patientSp.setParameter("relative_mb", null);
					patientSp.setParameter("seropositive", null);
					patientSp.setParameter("organDonarFlag", regDto.getOrganDonarFlag());
					patientSp.setParameter("healthId", regDto.getHealthId());
					patientSp.setParameter("healthIdNumber",regDto.getHealthIdNumber());
					patientSp.setParameter("adharcardNo", regDto.getAdharcardNo());
					patientSp.setParameter("pramoEmail", regDto.getPramoEmail());
					patientSp.setParameter("transEmail", regDto.getTransEmail());
					
					patientSp.setResultTransformer(new AliasToBeanResultTransformer(BillMasterDto.class));
					List<BillMasterDto> ltPatDetailsDto = patientSp.list();
					for(BillMasterDto obj : ltPatDetailsDto) {
						
						patientId = obj.getPatienttId();
						treatmentId = obj.getTreatmentId();
						billId = obj.getBillId();
					}
					
			 
		  }
			return patientId;
			
		} catch (Exception e) {
			e.printStackTrace();
			//tx.rollback();
			return patientId;
		}
	    */
		
	} 
	
	public List<PatientDetailsDto> getMarkVisitList(int unitId,Integer startIndex) {

		log.info("In RegistrationDaoImpl getMarkVisitList()");
		Session s = sessionFactory.getCurrentSession();
		try {
			int maxresult = 10;
			
			Query prefixSp = s.createSQLQuery("call sp_reg_get_patient_registration_details_pagination(:fDate,:tDate,:patientId,:treatmentId,:unitId,:startIndex,:maxresult)");
			
			prefixSp.setParameter("startIndex", startIndex);
			prefixSp.setParameter("maxresult", maxresult);
			prefixSp.setParameter("fDate", null);
			prefixSp.setParameter("tDate", null);
			prefixSp.setParameter("patientId", null);
			prefixSp.setParameter("treatmentId", null);
			prefixSp.setParameter("unitId", unitId);
			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(PatientDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientDetailsDto> ltRegistrationViewDto = prefixSp.list();			
			log.debug("Response--------> "+ltRegistrationViewDto);
			return ltRegistrationViewDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	} 
	
	public List<MarkvisitPatientDetailsDto> getMarkvisitPatientDetails(MarkvisitPatientDetailsDto obj) {

		log.info("In RegistrationDaoImpl getMarkvisitPatientDetails()");
		Session s = sessionFactory.getCurrentSession();
		try {
			
			if(obj.getTtId() == 0) {
				
				//Query prefixSp = s.createSQLQuery("call sp_reg_get_register_only_patient_details(:patientId,:unitId)");
				Query prefixSp = s.createSQLQuery("call sp_reg_get_register_only_patient_details(:patientId)");
				prefixSp.setParameter("patientId", obj.getPtId());
				//prefixSp.setParameter("unitId", obj.getUnitId());
				prefixSp.setResultTransformer(new AliasToBeanResultTransformer(MarkvisitPatientDetailsDto.class));
				@SuppressWarnings("unchecked")
				List<MarkvisitPatientDetailsDto> ltRegistrationViewDto = prefixSp.list();			
				//s.flush();
				//s.close();
				return ltRegistrationViewDto;
			}else {
				
				//Query prefixSp = s.createSQLQuery("call sp_reg_get_markvisitview_patient_details(:fDate,:tDate,:patientId,:treatmentId,:unitId)");
				Query prefixSp = s.createSQLQuery("call sp_reg_get_markvisitview_patient_details(:fDate,:tDate,:patientId,:treatmentId)");
				prefixSp.setParameter("fDate", null);
				prefixSp.setParameter("tDate", null);
				prefixSp.setParameter("patientId", obj.getPtId());
				prefixSp.setParameter("treatmentId", null);	
				//prefixSp.setParameter("unitId", obj.getUnitId());	
				prefixSp.setResultTransformer(new AliasToBeanResultTransformer(MarkvisitPatientDetailsDto.class));
				@SuppressWarnings("unchecked")
				List<MarkvisitPatientDetailsDto> ltRegistrationViewDto = prefixSp.list();			
				log.debug("Response--------> "+ltRegistrationViewDto);
				return ltRegistrationViewDto;
			}
						
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	} 
	
	public List<PatientDetailsDto> autoSuggestionMarkVisit(int patientId,String mobileNo,String addharNo, HttpServletRequest request) {

		log.info("In RegistrationDaoImpl autoSuggestionMarkVisit()");
		Session s = sessionFactory.getCurrentSession();
		try {
			HttpSession session = request.getSession();
			//Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			String uhPrefix = (String) session.getAttribute("UHPrefix");
			uhPrefix.concat(String.valueOf(patientId));
			
			//Query prefixSp = s.createSQLQuery("call sp_reg_get_search_patient(:patientId,:mobileNo,:addharNo,:unitId)");
			Query prefixSp = s.createSQLQuery("call sp_reg_get_search_patient(:patientId,:mobileNo,:addharNo)");
			if(patientId > 0)
				prefixSp.setParameter("patientId", patientId);
			else
				prefixSp.setParameter("patientId", null);
			
			if(!mobileNo.equals("0"))
				prefixSp.setParameter("mobileNo", mobileNo);
			else
				prefixSp.setParameter("mobileNo", null);
			
			if(!addharNo.equals("0"))
				prefixSp.setParameter("addharNo", addharNo);
			else
				prefixSp.setParameter("addharNo", null);
			//prefixSp.setParameter("unitId", unitId);
			
			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(PatientDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientDetailsDto> ltRegistrationViewDto = prefixSp.list();			
			log.debug("Response--------> "+ltRegistrationViewDto);
			return ltRegistrationViewDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	} 
	
	void updatePatientAppointment(int patientId,int patientApId) {
		
		log.info("In RegistrationDaoImpl updatePatientAppointment()");
		Session s = sessionFactory.getCurrentSession();
		try {
			
			String sql="Update ScheduleAppointmentsDTO set patientId="+patientId+",status='N' where apptId="+patientApId+" ";
			Query q=  s.createQuery(sql);
			int res = q.executeUpdate();
			log.debug("Response--------> "+res);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	void saveIVFTreatment(RegistrationDto regDto,Integer patientId,Integer treatmentId,Integer billId) {
		System.err.println("ivfflag.."+regDto.getIvfTreatFlag());
		IVFTreatmentDTO obj=new IVFTreatmentDTO();
		
		Query query = sessionFactory.getCurrentSession().createQuery(
		        "select count(*) from IVFTreatmentDTO e where e.patientId=:patientId and ivfStatus='Y'  ");
		query.setInteger("patientId", patientId);
		
		Long count = (Long)query.uniqueResult();
		
		if(regDto.getIvfTreatFlag().equalsIgnoreCase("Y")){
			if(count > 0){
				Criteria c=(Criteria) sessionFactory.getCurrentSession().createCriteria(IVFTreatmentDTO.class);
				c.add(Restrictions.eq("patientId", patientId));
				obj=(IVFTreatmentDTO) c.uniqueResult();
				//obj.setTreatmentId(treatmentId);
				obj.setBillId(billId);
				obj.setIvfStatus("Y");
				sessionFactory.getCurrentSession().merge(obj);
			}else{
				obj.setIvfTreatId(0);
				obj.setPatientId(patientId);
				obj.setTreatmentId(treatmentId);
				obj.setIvfStatus("Y");
				obj.setBillId(billId);
				sessionFactory.getCurrentSession().merge(obj);
			}
		
		}else{
			if(count > 0){
				Query query1 = sessionFactory.getCurrentSession().createQuery(
				        "Update IVFTreatmentDTO e set e.ivfStatus= :ivfStatus ,e.ivfTreatFlag= :ivfTreatFlag,  e.billId=:billId,updatedDateTime=now()  where e.patientId=:patientId ");
				//query1.setParameter("treatmentId", treatmentId);
				query1.setParameter("billId", billId);
				query1.setParameter("patientId", patientId);
				query1.setParameter("ivfStatus", "N");
				query1.setParameter("ivfTreatFlag", "N");
				
				query1.executeUpdate();
				
			}
		}
	}
	
	int saveSandBoxPatientInfo(RegistrationDto regDto,int patientId) {
		try {
		SandBoxPatientInfo obj=new SandBoxPatientInfo();
		obj.setPrefix(regDto.getPrefix());
		obj.setfName(regDto.getfName());
		obj.setmName(regDto.getmName());
		obj.setlName(regDto.getlName());
		obj.setGender(regDto.getGender());
		obj.setMobile(regDto.getMobile());
		obj.setAddress(regDto.getAddress());
		obj.setTownId(regDto.getTownId());
		obj.setTalukaId(regDto.getTalukaId());
		obj.setDistrictId(regDto.getDistrictId());
		obj.setPatientId(patientId);
		obj.setHelathId(regDto.getHealthId());
		obj.setHelathIdnumber(regDto.getHealthIdNumber());
		obj.setDob(regDto.getDob());
		 sessionFactory.getCurrentSession().merge(obj);
		 return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	
	
	public int savePatientDetails1(RegistrationDto regDto) {
		
		log.info("In RegistrationDaoImpl savePatientDetails()");
		Session s = sessionFactory.getCurrentSession();
		//Transaction tx = s.beginTransaction();
		int treatmentId = 0; 
		int patientId = 0;
	    int billId = 0;
	    String callFrom=regDto.getQueryType();
	    
	    ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String smsSendNewFlow =(resourceBundle.getObject("smsSendNewFlow").toString());
		System.err.println(smsSendNewFlow);
		try {
			
			TreatmentDto treatDto = regDto.getListTreatment().get(0);
			BillMasterDto billDto = regDto.getListBill().get(0);
			
		/*	Query patientSp = s.createSQLQuery("call sp_reg_save_patient_registration_details2("
					+ ":patientId,:aadharImageName,:address,:adharcardNo,:age,:ageDays,:ageMonths,:annualIncomeId,:areaCode,:blockFlag,"
					+ ":blockNarration1,:blockNarration2,:blockNarration3,:blockUserId1,:blockUserId2,:blockUserId3,:blockUserName1,:blockUserName2,:blockUserName3,:blockedDateTime,"
					+ ":bloodGroupId,:centerPatientId,:countryId,:createdBy,:createdDateTime,:deleted,:deletedBy,:deletedDateTime,:districtId,:dob,"
					+ ":education,:emailId,:emergency,:external,:fName,:gender,:identificationNumber,:identityProofId,:imageName,:lName,"
					+ ":languageId,:mName,:maritalStatusId,:mobile,:nationalityId,:occupation,:oldPatientId,:passport,:perAddress,:perareaCode,"
					+ ":percountryId,:perdistrictId,:perstateId,:pertalukaId,:pertownId,:pramoEmail,:pramoSMS,:prefix,:relationId,:relativeName,"
					+ ":religionId,:stateId,:talukaId,:townId,:transEmail,:transSMS,:unitCount,:unitId,:updatedBy,:updatedDateTime,"
					+ ":visa,:ivfTreatFlag,:relative_mb,:seropositive,:organDonarFlag,:healthId,:healthIdNumber ,:adharcardNo ,:pramoEmail ,:transEmail "
					+ " )"); */
			
			Query patientSp = s.createSQLQuery("call sp_reg_save_patient_registration_details("
					+ ":patientIdd,:aadharImageName,:address,:adharcardNo,:age,:ageDays,:ageMonths,:annualIncomeId,:areaCode,:blockFlag,"
					+ ":blockNarration1,:blockNarration2,:blockNarration3,:blockUserId1,:blockUserId2,:blockUserId3,:blockUserName1,:blockUserName2,:blockUserName3,:blockedDateTime,"
					+ ":bloodGroupId,:centerPatientId,:countryId,:createdBy,:createdDateTime,:deleted,:deletedBy,:deletedDateTime,:districtId,:dob,"
					+ ":education,:emailId,:emergency,:external,:fName,:gender,:identificationNumber,:identityProofId,:imageName,:lName,"
					+ ":languageId,:mName,:maritalStatusId,:mobile,:nationalityId,:occupation,:oldPatientId,:passport,:perAddress,:perareaCode,"
					+ ":percountryId,:perdistrictId,:perstateId,:pertalukaId,:pertownId,:pramoEmail,:pramoSMS,:prefix,:relationId,:relativeName,"
					+ ":religionId,:stateId,:talukaId,:townId,:transEmail,:transSMS,:unitCount,:unitId,:updatedBy,:updatedDateTime,"
					+ ":visa,:ivfTreatFlag,:relative_mb,:seropositive,:organDonarFlag,:healthId,:healthIdNumber ,:adharcardNo ,:pramoEmail ,:transEmail "
					+ ","
					+ ":treatmentId,:BMI,:BSA,:HCIM,:admCancelFlag,:admissionCanDateTime,:admissionCanceledBy,:admissionDateTime,:cancelNarration,:caseType,"
					+ ":centerPatientId,:count,:createdBy,:createdDateTime,:deleted,:deletedBy,:deletedDateTime,:departmentId,:diseToBeTreat,:doctorIdList,"
					+ ":empid,:emrHighrisk,:height,:ipdOrOpd,:neisNo,:notes,:opdipdno,:phyDateTime,:phyDisFlag,:reasonofvisit,"
					+ ":refDate,:refDocId,:referredBy,:referredSource,:referredSourceDocId,:referredSourceSlave,:reqGenFormId,:sactionOrdNo,:sanctionAmt,:tFlag,"
					+ ":token,:tokenno,:tpaid,:trcount,:treatPermited,:unitId,:updatedBy,:updatedDateTime,:validUpToDate,:visitNo,"
					+ ":weight,:patientId,:specialityIdInt,:ivfTreatFlag,:sum_assured_amt,:specialityId,:casualityFlag,:organDonarFlag,:refDocName,:businessType,"
					+ ":collectionDate,:collectionTime,:customerId,:customerType,:emergencyFlag,:registeredAt,:appointmentId,:special_Case,:ivfPayFlag,:sponsorId,"
					+ ":treatendDate,:outtime,:targetHeight,:firstHeight,:midlleHeight,:narration"
					+ ","
				    +" :billId,:billSettledFlag,:billType,:billTypeName,:billCount,:billCreatedBy,:billCreatedDateTime,:billDeleted,:billDeletedBy,:billDeletedDateTime,:billDepartmentId,:billDicount,"
				    + " :billInvoiceCreatedBy,:billInvoiceCount,:billInvoiceCreatedDateTime,:billInvoiceFlag,:billPatCatId,:billSourceTypeId,:billSponsorCatId,:billChargesMasterSlaveId,:totalBill,:totalPaid,:totalRefund,:totalRemain,"
				    + ":billUnitId,:billUpdatedBy,:billUpdatedDateTime,:billTreatmentid,:billPatientId,:totalConcention,:callFrom )"); 
			int patientIdd=  regDto.getPatientId(); 
			System.out.println("patientId===="+patientIdd);
			// patient Details
			patientSp.setParameter("patientIdd", patientIdd);
			patientSp.setParameter("aadharImageName", regDto.getAadharImageName());
			patientSp.setParameter("address", regDto.getAddress());
			patientSp.setParameter("adharcardNo", regDto.getAdharcardNo());
			patientSp.setParameter("age", regDto.getAge());
			patientSp.setParameter("ageDays", regDto.getAgeDays());
			patientSp.setParameter("ageMonths", regDto.getAgeMonths());
			patientSp.setParameter("annualIncomeId", regDto.getAnnualIncomeId());
			patientSp.setParameter("areaCode", regDto.getAreaCode());
			patientSp.setParameter("blockFlag", regDto.getBlockFlag());
			patientSp.setParameter("blockNarration1", regDto.getBlockNarration1());
			patientSp.setParameter("blockNarration2", regDto.getBlockNarration2());
			patientSp.setParameter("blockNarration3", regDto.getBlockNarration3());
			patientSp.setParameter("blockUserId1", regDto.getBlockUserId1());
			patientSp.setParameter("blockUserId2", regDto.getBlockUserId2());
			patientSp.setParameter("blockUserId3", regDto.getBlockUserId3());
			patientSp.setParameter("blockUserName1", regDto.getBlockUserName1());
			patientSp.setParameter("blockUserName2", regDto.getBlockUserName2());
			patientSp.setParameter("blockUserName3", regDto.getBlockUserName3());
			patientSp.setParameter("blockedDateTime", regDto.getBlockedDateTime());
			patientSp.setParameter("bloodGroupId", regDto.getBloodGroupId());
			patientSp.setParameter("centerPatientId", regDto.getCenterPatientId());
			patientSp.setParameter("countryId", regDto.getCountryId());
			patientSp.setParameter("createdBy", regDto.getCreatedBy());
			patientSp.setParameter("createdDateTime", new Date());
			patientSp.setParameter("deleted", regDto.getDeleted());
			patientSp.setParameter("deletedBy", regDto.getDeletedBy());
			patientSp.setParameter("deletedDateTime", regDto.getDeletedDateTime());
			patientSp.setParameter("districtId", regDto.getDistrictId());
			patientSp.setParameter("dob", regDto.getDob());
			patientSp.setParameter("education", regDto.getEducation());
			patientSp.setParameter("emailId", regDto.getEmailId());
			patientSp.setParameter("emergency", regDto.getEmergency());
			patientSp.setParameter("external", regDto.getExternal());
			patientSp.setParameter("fName", regDto.getfName());
			patientSp.setParameter("gender", regDto.getGender());
			patientSp.setParameter("identificationNumber", regDto.getIdentificationNumber());
			patientSp.setParameter("identityProofId", regDto.getIdentityProofId());
			patientSp.setParameter("imageName", regDto.getImageName());
			patientSp.setParameter("lName", regDto.getlName());
			patientSp.setParameter("languageId", regDto.getLanguageId());
			patientSp.setParameter("mName", regDto.getmName());
			patientSp.setParameter("maritalStatusId", regDto.getMaritalStatusId());
			patientSp.setParameter("mobile", regDto.getMobile());
			patientSp.setParameter("nationalityId", regDto.getNationalityId());
			patientSp.setParameter("occupation", regDto.getOccupation());
			patientSp.setParameter("oldPatientId", regDto.getOldPatientId());
			patientSp.setParameter("passport", regDto.getPassport());
			patientSp.setParameter("perAddress", regDto.getPerAddress());
			patientSp.setParameter("perareaCode", regDto.getPerareaCode());
			patientSp.setParameter("percountryId", regDto.getPercountryId());
			patientSp.setParameter("perdistrictId", regDto.getPerdistrictId());
			patientSp.setParameter("perstateId", regDto.getPerstateId());
			patientSp.setParameter("pertalukaId", regDto.getPertalukaId());
			patientSp.setParameter("pertownId", regDto.getPertownId());
			patientSp.setParameter("pramoEmail", regDto.getPramoEmail());
			patientSp.setParameter("pramoSMS", regDto.getPramoSMS());
			patientSp.setParameter("prefix", regDto.getPrefix());
			patientSp.setParameter("relationId", regDto.getRelationId());
			patientSp.setParameter("relativeName", regDto.getRelativeName());
			patientSp.setParameter("religionId", regDto.getReligionId());
			patientSp.setParameter("stateId", regDto.getStateId());
			patientSp.setParameter("talukaId", regDto.getTalukaId());
			patientSp.setParameter("townId", regDto.getTownId());
			patientSp.setParameter("transEmail", regDto.getTransEmail());
			patientSp.setParameter("transSMS", regDto.getTransSMS());
			patientSp.setParameter("unitCount", regDto.getUnitCount());
			patientSp.setParameter("unitId", regDto.getUnitId());
			patientSp.setParameter("updatedBy", regDto.getUpdatedBy());
			patientSp.setParameter("updatedDateTime", regDto.getUpdatedDateTime());
			patientSp.setParameter("visa", regDto.getVisa());
			patientSp.setParameter("ivfTreatFlag", regDto.getIvfTreatFlag());
			patientSp.setParameter("relative_mb", null);
			patientSp.setParameter("seropositive", null);
			patientSp.setParameter("organDonarFlag", regDto.getOrganDonarFlag());
			patientSp.setParameter("healthId", regDto.getHealthId());
			patientSp.setParameter("healthIdNumber",regDto.getHealthIdNumber());
			patientSp.setParameter("adharcardNo", regDto.getAdharcardNo());
			patientSp.setParameter("pramoEmail", regDto.getPramoEmail());
			patientSp.setParameter("transEmail", regDto.getTransEmail());
			
			
			// treatment Details
			patientSp.setParameter("treatmentId", treatDto.getTreatmentId());
			patientSp.setParameter("BMI", treatDto.getBMI());
			patientSp.setParameter("BSA", treatDto.getBSA());
			patientSp.setParameter("HCIM", treatDto.getHCIM());
			patientSp.setParameter("admCancelFlag", treatDto.getAdmCancelFlag());
			patientSp.setParameter("admissionCanDateTime", treatDto.getAdmissionCanDateTime());
			patientSp.setParameter("admissionCanceledBy", treatDto.getAdmissionCanceledBy());
			patientSp.setParameter("admissionDateTime", treatDto.getAdmissionDateTime());
			patientSp.setParameter("cancelNarration", treatDto.getCancelNarration());
			patientSp.setParameter("caseType", treatDto.getCaseType());
			patientSp.setParameter("centerPatientId", treatDto.getCenterPatientId());
			patientSp.setParameter("count", treatDto.getCount());
			patientSp.setParameter("createdBy", treatDto.getCreatedBy());
			patientSp.setParameter("createdDateTime", treatDto.getCreatedDateTime());
			patientSp.setParameter("deleted", treatDto.getDeleted());
			patientSp.setParameter("deletedBy", treatDto.getDeletedBy());
			patientSp.setParameter("deletedDateTime", treatDto.getDeletedDateTime());
			patientSp.setParameter("departmentId", treatDto.getDepartmentId());
			patientSp.setParameter("diseToBeTreat", treatDto.getDiseToBeTreat());
			patientSp.setParameter("doctorIdList", treatDto.getDoctorIdList());
			patientSp.setParameter("empid", treatDto.getEmpid());
			patientSp.setParameter("emrHighrisk", treatDto.getEmrHighrisk());
			patientSp.setParameter("height", treatDto.getHeight());
			patientSp.setParameter("ipdOrOpd", treatDto.getIpdOrOpd());
			patientSp.setParameter("neisNo", treatDto.getNeisNo());
			patientSp.setParameter("notes", treatDto.getNotes());
			patientSp.setParameter("opdipdno", treatDto.getOpdipdno());
			patientSp.setParameter("phyDateTime", treatDto.getPhyDateTime());
			patientSp.setParameter("phyDisFlag", treatDto.getPhyDisFlag());
			patientSp.setParameter("reasonofvisit", treatDto.getReasonofvisit());
			patientSp.setParameter("refDate", treatDto.getRefDate());
			patientSp.setParameter("refDocId", treatDto.getRefDocId());
			patientSp.setParameter("referredBy", treatDto.getReferredBy());
			patientSp.setParameter("referredSource", treatDto.getReferredSource());
			patientSp.setParameter("referredSourceDocId", treatDto.getReferredSourceDocId());
			patientSp.setParameter("referredSourceSlave", treatDto.getReferredSourceSlave());
			patientSp.setParameter("reqGenFormId", treatDto.getReqGenFormId());
			patientSp.setParameter("sactionOrdNo", treatDto.getSactionOrdNo());
			patientSp.setParameter("sanctionAmt", treatDto.getSanctionAmt());
			patientSp.setParameter("tFlag", treatDto.gettFlag());
			patientSp.setParameter("token", treatDto.getToken());
			patientSp.setParameter("tokenno", treatDto.getTokenno());
			patientSp.setParameter("tpaid", treatDto.getTpaid());
			patientSp.setParameter("trcount", treatDto.getTrcount());
			patientSp.setParameter("treatPermited", treatDto.getTreatPermited());
			patientSp.setParameter("unitId", treatDto.getUnitId());
			patientSp.setParameter("updatedBy", treatDto.getUpdatedBy());
			patientSp.setParameter("updatedDateTime", treatDto.getUpdatedDateTime());
			patientSp.setParameter("validUpToDate", treatDto.getValidUpToDate());
			patientSp.setParameter("visitNo", treatDto.getVisitNo());
			patientSp.setParameter("weight", treatDto.getWeight());
			patientSp.setParameter("patientId", treatDto.getPatientId());
			patientSp.setParameter("specialityIdInt", null);
			patientSp.setParameter("ivfTreatFlag", treatDto.getIvfTreatFlag());
			patientSp.setParameter("sum_assured_amt", null);
			patientSp.setParameter("specialityId", treatDto.getSpecialityId());
			patientSp.setParameter("casualityFlag", treatDto.getCasualityFlag());
			patientSp.setParameter("organDonarFlag", treatDto.getOrganDonarFlag());
			patientSp.setParameter("refDocName", treatDto.getRefDocName());
			patientSp.setParameter("businessType", treatDto.getBusinessType());
			patientSp.setParameter("collectionDate", treatDto.getCollectionDate());
			patientSp.setParameter("collectionTime", treatDto.getCollectionTime());
			patientSp.setParameter("customerId", treatDto.getCustomerId());
			patientSp.setParameter("customerType", treatDto.getCustomerType());
			patientSp.setParameter("emergencyFlag", treatDto.getEmergencyFlag());
			patientSp.setParameter("registeredAt", treatDto.getRegisteredAt());
			patientSp.setParameter("appointmentId", treatDto.getAppointmentId());
			patientSp.setParameter("special_Case", null);
			patientSp.setParameter("ivfPayFlag", treatDto.getIvfPayFlag());
			patientSp.setParameter("sponsorId", treatDto.getSponsorId());
			patientSp.setParameter("treatendDate", treatDto.getTreatendDate());
			patientSp.setParameter("outtime", treatDto.getOuttime());
			patientSp.setParameter("targetHeight", treatDto.getTARGET_HEIGHT());
			patientSp.setParameter("firstHeight", treatDto.getFheight());
			patientSp.setParameter("midlleHeight",treatDto.getMheight() );
			patientSp.setParameter("narration", treatDto.getNarration());
			
			// billMaster Details
			patientSp.setParameter("billId", billDto.getBillId());
			patientSp.setParameter("billSettledFlag", billDto.getBillSettledFlag());
			patientSp.setParameter("billType", billDto.getBillType());
			patientSp.setParameter("billTypeName", billDto.getBillTypeName());
			patientSp.setParameter("billCount", billDto.getCount());//
			patientSp.setParameter("billCreatedBy", billDto.getCreatedBy());
			patientSp.setParameter("billCreatedDateTime", billDto.getCreatedDateTime());//
			patientSp.setParameter("billDeleted", billDto.getDeleted());
			patientSp.setParameter("billDeletedBy", billDto.getDeletedBy());
			patientSp.setParameter("billDeletedDateTime", billDto.getDeletedDateTime());
			patientSp.setParameter("billDepartmentId", billDto.getDepartmentId());
			patientSp.setParameter("billDicount", billDto.getDiscount());//
			patientSp.setParameter("billInvoiceCreatedBy", billDto.getCreatedBy());
			patientSp.setParameter("billInvoiceCount", billDto.getInvoiceCount());//
			patientSp.setParameter("billInvoiceCreatedDateTime", billDto.getInvoiceCreatedDateTime());//
			patientSp.setParameter("billInvoiceFlag","Y");
			patientSp.setParameter("billPatCatId", billDto.getPatientCatId());//
			patientSp.setParameter("billSourceTypeId", billDto.getSourceTypeId());//
			patientSp.setParameter("billSponsorCatId", billDto.getSponsorCatId());
			patientSp.setParameter("billChargesMasterSlaveId", billDto.getSponsorId());
			patientSp.setParameter("totalBill", billDto.getTotalBill());
			patientSp.setParameter("totalPaid", billDto.getTotalPaid());
			patientSp.setParameter("totalRefund", billDto.getTotalRefund());
			patientSp.setParameter("totalRemain", billDto.getTotalRemain());
			patientSp.setParameter("billUnitId", billDto.getUnitId());
			patientSp.setParameter("billUpdatedBy", billDto.getUpdatedBy());//
			patientSp.setParameter("billUpdatedDateTime", billDto.getUpdatedDateTime());//
			patientSp.setParameter("billTreatmentid", billDto.getTreatmentId());//---
			patientSp.setParameter("billPatientId", billDto.getPatienttId());//-----
			patientSp.setParameter("totalConcention", billDto.getTotalConcn());	
			
			patientSp.setParameter("callFrom", callFrom);	
			
			patientSp.setResultTransformer(new AliasToBeanResultTransformer(BillMasterDto.class));
			List<BillMasterDto> ltPatDetailsDto = patientSp.list();
			for(BillMasterDto obj : ltPatDetailsDto) {
				
				patientId = obj.getPatienttId();
				treatmentId = obj.getTreatmentId();
				billId = obj.getBillId();
			}
			
			System.out.println("Ids ================================= : "+patientId + " ========= "+treatmentId+ " ==== "+billId);
			
		/*	@SuppressWarnings("unchecked")
			List<MrnNoCenterPatientIdDto> ltMrnDto = patientSp.list();	
			
			if(regDto.getQueryType().equalsIgnoreCase("insert") || regDto.getQueryType().equalsIgnoreCase("markvisit") || regDto.getListTreatment().get(0).getTreatmentId() == 0) {
				
				// SP for generate mrnno,centerpatientid,unitcount in patient object
				Query patientSp2 = s.createSQLQuery("call sp_reg_get_mrno_and_center_patient_id(:unitId,:departmentId)");
				patientSp.setParameter("unitId", regDto.getUnitId());
				patientSp.setParameter("departmentId", regDto.getListTreatment().get(0).getDepartmentId());
				patientSp.setResultTransformer(new AliasToBeanResultTransformer(MrnNoCenterPatientIdDto.class));
				@SuppressWarnings("unchecked")
				List<MrnNoCenterPatientIdDto> ltMrnDto2 = patientSp.list();	
				// Set generated numbers to patient dto
				regDto.setMrnno(ltMrnDto.get(0).getMrno());
				regDto.setCenterPatientId(ltMrnDto.get(0).getCenter_patient_id());
				regDto.setUnitCount(((Number)ltMrnDto.get(0).getUnitcount()).intValue());
				// Set generated numbers to billmaster dto
				regDto.getListBill().get(0).setCount(((Number)ltMrnDto.get(0).getBillcount()).intValue());
				
				// SP for generate opdipdno/treatmentcount/tokenno in treatment object
				Query treatSp = s.createSQLQuery("call sp_reg_get_opdipdno_treatcount_tokenno(:unitId,:deptId,:treatmentId,:spacialityId)");
				treatSp.setParameter("unitId", regDto.getUnitId());
				treatSp.setParameter("deptId", regDto.getListTreatment().get(0).getDepartmentId());
				treatSp.setParameter("treatmentId", 0);
				treatSp.setParameter("spacialityId", regDto.getListTreatment().get(0).getSpecialityId());
				treatSp.setResultTransformer(new AliasToBeanResultTransformer(OpdipdnoTokennoDto.class));
				@SuppressWarnings("unchecked")
				List<OpdipdnoTokennoDto> lstTokennoDto = treatSp.list();
				// Set generated numbers to treatment dto
				regDto.getListTreatment().get(0).setOpdipdno(lstTokennoDto.get(0).getOpdipdno());
				regDto.getListTreatment().get(0).setTrcount(lstTokennoDto.get(0).getTreatcount());
				regDto.getListTreatment().get(0).setTokenno(lstTokennoDto.get(0).getTokenno());
				if(regDto.getListTreatment().get(0).getDepartmentId() == 1 || regDto.getListTreatment().get(0).getDepartmentId() == 3) {
					
					regDto.getListBill().get(0).setInvoiceFlag("Y");
					regDto.getListBill().get(0).setInvCreatedBy(regDto.getCreatedBy());
					regDto.getListBill().get(0).setInvoiceCreatedDateTime(new Date());
					regDto.getListBill().get(0).setInvoiceCount(lstTokennoDto.get(0).getInvoiceCount().intValue());
				}
					
			}else if(regDto.getQueryType().equalsIgnoreCase("update")) {
				
				RegistrationDto obj = (RegistrationDto) s.get(RegistrationDto.class, regDto.getPatientId());
				regDto.setMrnno(obj.getMrnno());
				regDto.setCenterPatientId(obj.getCenterPatientId());
				regDto.setUnitCount(obj.getUnitCount());
				regDto.getListTreatment().get(0).setOpdipdno(obj.getListTreatment().get(0).getOpdipdno());
				regDto.getListTreatment().get(0).setTrcount(obj.getListTreatment().get(0).getTrcount());
				regDto.getListTreatment().get(0).setTokenno(obj.getListTreatment().get(0).getTokenno());
				regDto.getListBill().get(0).setCount(obj.getListBill().get(0).getCount());
			}
	        // Set all slave for registration
			setAllSlaveList(regDto);
	        
			RegistrationDto savedObj = (RegistrationDto) s.merge(regDto);	
	        int patientId = savedObj.getPatientId();
	        treatmentId = savedObj.getListTreatment().get(0).getTreatmentId();
	        int billId = savedObj.getListBill().get(0).getBillId();
	        tx.commit();
	        s.flush();
			s.clear();
			s.close(); */
			
			
			
			// Save Token Details
			if(regDto.getQueryType().equalsIgnoreCase("insert") || regDto.getQueryType().equalsIgnoreCase("markvisit") || regDto.getListTreatment().get(0).getTreatmentId() == 0) 
				saveTokenDetails(patientId,treatmentId,billId,regDto);
			 
			String pname = regDto.getPrefix()+" "+regDto.getfName()
					+" "+ regDto.getmName()+" "+regDto.getlName();
			
			System.err.println(pname);
			if(smsSendNewFlow.equalsIgnoreCase("on")){
				SendSMSNoble.sendSMS("Big Hospital", regDto.getMobile(), patientId, pname,regDto.getDepartment_id());
			}
			//Save Registration and consultation charges
			if(regDto.getListTreatment().get(0).getDepartmentId() != 2)
				saveBillDetails(patientId,treatmentId,billId,regDto);
	        
	        // Save BMI details
	        savePatientBMIDetails(patientId,treatmentId,regDto);
	        
			log.debug("Response--------> "+treatmentId);
			if(regDto.getPatientApId() > 0) {
				updatePatientAppointment(patientId,regDto.getPatientApId());
			}
			
			//insert record in ehat_ivf_treatment
			saveIVFTreatment(regDto,patientId,treatmentId,billId);
			
			// update sponsor info
			if (regDto.getQueryType().equalsIgnoreCase("update")) {
				if (regDto.getListTreatment().get(0).getDepartmentId() == 1
						|| regDto.getListTreatment().get(0).getDepartmentId() == 3) {
					String sqlOpd = "update ehat_bill_details set charges_slave_id="
							+ regDto.getListTreatment().get(0).getSponsorId() + " where treatment_id="
							+ regDto.getListTreatment().get(0).getTreatmentId() + " ";

					SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sqlOpd);
					q.executeUpdate();
				} else if (regDto.getListTreatment().get(0).getDepartmentId() == 2) {
					String sqlOpd = "update ehat_bill_details_ipd set charges_slave_id="
							+ regDto.getListTreatment().get(0).getSponsorId() + " where treatment_id="
							+ regDto.getListTreatment().get(0).getTreatmentId() + " ";

					SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sqlOpd);
					q.executeUpdate();
				}
           // end sponsor info
			}
			
			return treatmentId;
			
		} catch (Exception e) {
			e.printStackTrace();
			//tx.rollback();
			return 0;
		}
	}

	@Override
	public Integer getAllGetPatCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " select count(*) from ehat_patient where deleted='N';" + 
					"  "
					;
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}
