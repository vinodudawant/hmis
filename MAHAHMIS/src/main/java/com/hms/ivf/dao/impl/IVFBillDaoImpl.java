package com.hms.ivf.dao.impl;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.common.base.Joiner;
import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.ComAdvbifergationDto;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.OpdQueManagmentViewDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TokenDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.MultiBillReceiptMasterDTO;
import com.hms.ipdbill.dto.ServicewiseBillDTO;
import com.hms.ivf.dao.IVFBillDao;
import com.hms.ivf.dto.EhatViewPatientBedDetailsIvfDto;
import com.hms.ivf.dto.IvfBillDetailsDto;
import com.hms.ivf.dto.IvfBillNobleDto;
import com.hms.ivf.dto.IvfBillNobleServiceDto;
import com.hms.ivf.dto.IvfBillReceiptMasterDTO;
import com.hms.ivf.dto.IvfBillReceiptSlaveDTO;
import com.hms.ivf.dto.IvfBillRefundMasterDTO;
import com.hms.ivf.dto.IvfBillRefundSlaveDTO;
import com.hms.ivf.dto.PreviousTreatmentBillDto;
import com.hms.opdbill.dao.impl.OpdQueueDaoImpl;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.OpdQueueDto;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.utility.ApplicationContextUtils;

@Repository
public class IVFBillDaoImpl implements IVFBillDao{

	@Autowired
	SessionFactory sessionFactory;
	
	static Logger log=Logger.getLogger(OpdQueueDaoImpl.class.getName());
	static {
		System.out.println("IVFBillDaoImpl is Loaded...!");
	}
	
	ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String cmnAdvcPaymodeId = (String) resourceBundle.getString("cmnAdvcPaymodeId");
	Integer commonAdv = Integer.parseInt(cmnAdvcPaymodeId);
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	
	@Override
	public OpdQueueDto getAllIvfQueuePatient(OpdQueueDto objDto) {

		log.info("In IVFBillDaoImpl getAllIvfQueuePatient()");
		Session s = sessionFactory.getCurrentSession();
		//int startIndex = objDto.getStartIndex();
		int PatientId = objDto.getPatientId();
		String patientName = objDto.getPatientName();
		String mobile = objDto.getMobile();
		String adharcardNo = objDto.getAdharcardNo();
		Integer unitId = objDto.getUnitId();
		try {
			
			Query prefixSp = s.createSQLQuery("call sp_reg_get_ivf_queue(:patientId,:patientName,:mobile,:adharcardNo,:unitId)");
			//prefixSp.setParameter("startIndex", startIndex);
			if(PatientId > 0)
				prefixSp.setParameter("patientId", PatientId);
			else
				prefixSp.setParameter("patientId", null);
			if(!patientName.equalsIgnoreCase("-"))
				prefixSp.setParameter("patientName", patientName);
			else
				prefixSp.setParameter("patientName", null);
			if(!mobile.equalsIgnoreCase("-"))
				prefixSp.setParameter("mobile", mobile);
			else
				prefixSp.setParameter("mobile", null);
			if(!adharcardNo.equalsIgnoreCase("-"))
				prefixSp.setParameter("adharcardNo", adharcardNo);
			else
				prefixSp.setParameter("adharcardNo", null);
			if(!(unitId==null))
				prefixSp.setParameter("unitId", unitId);
			else
				prefixSp.setParameter("unitId", unitId);
			
			prefixSp.setFirstResult(objDto.getStartIndex());
			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(OpdQueueDto.class));
			@SuppressWarnings("unchecked")
			List<OpdQueueDto> lstOpdQueueDto = prefixSp.list();		
			objDto.setListOpdQueManagmentViewDto(lstOpdQueueDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}
	
	@Override
	public PatientHeaderInfoDto getPatientInfoByTreatmentId(PatientHeaderInfoDto objDto) {

		log.info("In IVFBillDaoImpl getPatientInfoByTreatmentId()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_ivf_bill_get_patient_info_by_treatment_id(:treatmentId)");
			querySp.setParameter("treatmentId", objDto.getTreatmentId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientHeaderInfoDto.class));
			@SuppressWarnings("unchecked")
			List<PatientHeaderInfoDto> lstOpdQueueDto = querySp.list();		
			objDto.setListRegTreBillDto(lstOpdQueueDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto) {

		log.info("In IVFBillDaoImpl getPatientServiceDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_ivf_bill_patient_service_detail(:treatmentFlag,:treatmentId)");
			querySp.setParameter("treatmentFlag", objDto.gettFlag());//here 'AT' for active treatment
			querySp.setParameter("treatmentId", objDto.getTreatmentId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientServiceDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientServiceDetailsDto> lstServiceDetailsDto = querySp.list();		
			objDto.setListBillNobleDto(lstServiceDetailsDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto) {

		log.info("In IVFBillDaoImpl getPatientSubServiceDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_ivf_bill_patient_sub_service_details(:treatmentFlag,:treatmentId,:serviceId)");
			querySp.setParameter("treatmentFlag", "AT");//here 'AT' for active treatment
			querySp.setParameter("treatmentId", objDto.getTreatmentId());
			querySp.setParameter("serviceId", objDto.getServiceId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientSubServiceDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientSubServiceDetailsDto> lstSubServiceDetailsDto = querySp.list();		
			objDto.setListBillNobleServiceDto(lstSubServiceDetailsDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}

	@Override
	public PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto) {

		log.info("In IVFBillDaoImpl getPatientPackageDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_ivf_bill_patient_package_details(:billDetailsId,:treatmentId)");
			querySp.setParameter("billDetailsId", objDto.getBillDetailsId());
			querySp.setParameter("treatmentId", objDto.getTreatmentId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientPackageDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientPackageDetailsDto> lstSubServiceDetailsDto = querySp.list();		
			objDto.setListOpdPackageDto(lstSubServiceDetailsDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}

	@Override
	public BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto) {

		log.info("In IVFBillDaoImpl getAllAmountDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_ivf_bill_amount_details(:unitId,:depId,:userId,:treatmentId,:serviceId,:chargesSlaveId,:sponsorCatId,:pharmacyInvoice,:pharmacyServId,:callformComAdv,:callformRcptTot,:callformPrevPending)");
			querySp.setParameter("unitId", objDto.getUnitId());
			querySp.setParameter("depId", objDto.getDepId());
			querySp.setParameter("userId", objDto.getUserId());
			querySp.setParameter("treatmentId", objDto.getTreatmentId());
			querySp.setParameter("serviceId", objDto.getServiceId());
			querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
			querySp.setParameter("sponsorCatId", objDto.getSponsorCatId());
			querySp.setParameter("pharmacyInvoice", objDto.getPharmacyInvoice());
			querySp.setParameter("pharmacyServId", objDto.getPharmacyServId());
			querySp.setParameter("callformComAdv", objDto.getCallformComAdv());//opdBill
			querySp.setParameter("callformRcptTot", objDto.getCallformRcptTot());//opd
			querySp.setParameter("callformPrevPending", objDto.getCallformPrevPending());//onload
			querySp.setResultTransformer(new AliasToBeanResultTransformer(BillAmountDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<BillAmountDetailsDto> lstAmountDetails = querySp.list();		
			objDto.setLstAmountDetails(lstAmountDetails);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}
	@Override
	public PreviousTreatmentBillDto getPreviousTreatmentPatient(PreviousTreatmentBillDto objDto) {

		log.info("In IVFBillDaoImpl getPreviousTreatmentPatient()");
		Session s = sessionFactory.getCurrentSession();
		int PatientId = objDto.getPtId();
		String patientName = objDto.getPatientName();
		String mobile = objDto.getMobile();
		String adharcardNo = objDto.getAdharcardNo();
		try {
			
			Query querySp = s.createSQLQuery("call sp_ivf_previous_bill_queue(:patientId,:patientName,:mobile,:adharcardNo)");
			if(PatientId > 0)
				querySp.setParameter("patientId", PatientId);
			else
				querySp.setParameter("patientId", null);
			if(!patientName.equalsIgnoreCase("-"))
				querySp.setParameter("patientName", patientName);
			else
				querySp.setParameter("patientName", null);
			if(!mobile.equalsIgnoreCase("-"))
				querySp.setParameter("mobile", mobile);
			else
				querySp.setParameter("mobile", null);
			if(!adharcardNo.equalsIgnoreCase("-"))
				querySp.setParameter("adharcardNo", adharcardNo);
			else
				querySp.setParameter("adharcardNo", null);
			
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PreviousTreatmentBillDto.class));
			@SuppressWarnings("unchecked")
			List<PreviousTreatmentBillDto> lstPreviousDetails = querySp.list();		
			objDto.setLstRegviewDto(lstPreviousDetails);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}
	
	@Override
	public TreatmentDto getPrevPatdetails(Integer patientId) {
		
		TreatmentDto objTreat = new TreatmentDto();
		List<TreatmentDto> ltPatientRecord = new ArrayList<TreatmentDto>();
		try {
			
			String sql = "select t.treatment_id,t.opdipdno,t.created_date_time from ehat_treatment t join ehat_ivf_treatment it ON (it.treatment_id = t.treatment_id) WHERE t.patient_id = "+patientId+" and it.ivf_treat_flag = 'N' ";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
	    		
		    	TreatmentDto obj = new TreatmentDto();
		    	obj.setPatientId(patientId);
		    	obj.setTreatmentId((Integer)row.get("treatment_id"));
		    	obj.setOpdipdno((String)row.get("opdipdno"));
		    	obj.setCreatedDateTime((Date)row.get("created_date_time"));
		    	ltPatientRecord.add(obj);	
		    	obj = null;
	    	}	
				
		    objTreat.setListTreatment(ltPatientRecord);
		    
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltPatientRecord;
		}
		return objTreat;
	}
	
	//Modify by Vinod Udawant on 31-march-2021 for IVF OPDQueue Patients and Queue Management.
	@Override
	public OpdQueManagmentViewDto getAllOpdRecordsDeptwiseWithAuto(Integer deptId,String letter,String usertype, Integer unitId) {
		List<OpdQueManagmentViewDto> ltPatientRecord = null;
		OpdQueManagmentViewDto obj=new OpdQueManagmentViewDto();
		List<DoctorDto> ltDoctorDto=null;
			
		try {
			
			if(deptId == 1 || deptId==3 ) {
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OpdQueManagmentViewDto.class);
				
				if(usertype.equals("Y")) {					
					criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
				}else if(usertype.equals("age")){
					Criterion rest1= Restrictions.like("age", letter + "%");
					criteria.add(Restrictions.or(rest1));
				}else if(usertype.equals("gender")){
					criteria.add(Restrictions.eq("gender", letter));
				}else if(usertype.equals("doctor")){
					criteria.add(Restrictions.eq("doctorId", letter));
				}else{
					Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
					Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
					Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
					Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
					Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
					
					criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
				}
				if(unitId > 0){//get list unit wise.
					criteria.add(Restrictions.eq("unitId", unitId));
				}
				criteria.add(Restrictions.eq("departmentId", deptId));
				criteria.add(Restrictions.eq("tFlag", "Y"));
				criteria.add(Restrictions.eq("ivfTreatFlag", "Y"));				
				criteria.addOrder(Order.desc("patientId"));
				ltPatientRecord = criteria.list();
				
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				ltDoctorDto=criteria2.list();
				obj.setListOpdQueManagmentViewDto(ltPatientRecord);
				obj.setLstDoctorDto(ltDoctorDto);
				
			}else if(deptId == -11)	{
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegTreBillDto.class);
				if(usertype.equals("Y")) {
					criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
				}else{
					Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
					Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
					Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
					Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
					Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
					
					criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
				}
				if(unitId > 0){//get list unit wise.
					criteria.add(Restrictions.eq("unitId", unitId));
				}
				criteria.addOrder(Order.desc("patientId"));
				ltPatientRecord = criteria.list();
				
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				ltDoctorDto=criteria2.list();
				obj.setListOpdQueManagmentViewDto(ltPatientRecord);
				obj.setLstDoctorDto(ltDoctorDto);
				
			}else {
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OpdQueManagmentViewDto.class);
				if(usertype.equals("Y")) {
					criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
				}else{
					Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
					Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
					Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
					Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
					Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
					criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
				}
				if(unitId > 0){//get list unit wise.
					criteria.add(Restrictions.eq("unitId", unitId));
				}
				criteria.add(Restrictions.eq("departmentId", deptId));
				criteria.add(Restrictions.eq("tFlag", "Y"));
				criteria.addOrder(Order.desc("patientId"));
				ltPatientRecord = criteria.list();
				obj.setListOpdQueManagmentViewDto(ltPatientRecord);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return obj;
		}
		return obj;
	}
	
	@Override
	public int savecpoe(IvfBillDetailsDto billDetailsDto, String queryType) {
			
		String radId = resourceBundleEhat.getObject("radiationId").toString();
		int radiationId = Integer.parseInt(radId);
		int records=0;
		try {
			
			 int treatmentId     = billDetailsDto.getTreatmentId();
		     int patientId       = billDetailsDto.getPatienttId();
			 int sponsorid       = billDetailsDto.getSponsorId();
			 int chargesSid      = billDetailsDto.getChargesSlaveId();
			 String receiptOf    = billDetailsDto.getReceiptOf();
			 int subserviceid    = 0;
			 double  charges     = 0.0;
			 double  calDec      = 0;
			 double  copycalc    = 0;
			 int recSlaveId      = billDetailsDto.getRecSlaveId();
			 subserviceid        = billDetailsDto.getSubServiceId();
			 int billDetailsId   = billDetailsDto.getBillDetailsId();
			 
			 if (sponsorid >0 && chargesSid>0 && receiptOf.equals("sponsor") && recSlaveId > 0 && subserviceid != -1) {
				 
				//GETTING CHARGES OF SERVICE
				 SubServiceDto subsobj = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class, subserviceid);
				 charges      = subsobj.getCharges();
				 billDetailsDto.setRate(charges);				 
				 charges      =	charges * billDetailsDto.getQuantity();				 
				 calDec       =	(charges * billDetailsDto.getConcessionOnPerc()/100);
				 copycalc     = charges - calDec;
				 
				 billDetailsDto.setConcession(calDec);
				 billDetailsDto.setAmount(charges);
				 billDetailsDto.setCoPay(copycalc);
				 
			 }else if(sponsorid > 0 && chargesSid > 0 && receiptOf.equals("general") && recSlaveId > 0 && subserviceid != -1){
				 
				 int iscomser    = 0;
				 int iscomserl   = 0;
				 int hallId      = 0;
				 int hallSlaveId = 0;
				 subserviceid    =billDetailsDto.getSubServiceId();
				 
				//GETTING CHARGES OF SERVICE
				 String query1="SELECT ifnull(charges, 0) FROM ehat_configuration_services where charges_id="
							+ sponsorid
							+ " and chargesSlave_id="
							+ chargesSid
							+ " and is_com_servId=" + iscomser
							+ " and is_com_servlastId=" + iscomserl
							+ " and hall_id=" + hallId
							+ " and hallSlave_id=" + hallSlaveId
							+ " and service_id=" + subserviceid
							+ " and deleted='N'";
	
	            SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);   
	            charges =(Double) query.uniqueResult();
	            billDetailsDto.setOtherRate(charges);
	            
	            if (charges > 0) {
	            	
	            	charges      = charges * billDetailsDto.getQuantity();
					calDec       =( charges * billDetailsDto.getConcessionOnPerc()/100 );
					copycalc     = charges - calDec;
				} else {
					 
					charges      = billDetailsDto.getOtherRate() * billDetailsDto.getQuantity();
					calDec       =( charges * billDetailsDto.getConcessionOnPerc()/100 );
					copycalc     = charges - calDec;
				}
                 
				billDetailsDto.setOtherConcession(calDec);
				billDetailsDto.setOtherAmount(charges);
				billDetailsDto.setOtherPay(copycalc);
			 }
	
			 boolean radExist = false;
		         
			 List<IvfBillDetailsDto> listCheck = new ArrayList<IvfBillDetailsDto>();
			 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfBillDetailsDto.class);
			 criteria.add(Restrictions.eq("serviceId", radiationId));
			 criteria.add(Restrictions.eq("deleted", "N"));
			 criteria.add(Restrictions.eq("treatmentId", billDetailsDto.getTreatmentId()));
			 criteria.add(Restrictions.eq("subServiceId", billDetailsDto.getSubServiceId()));
			 listCheck = criteria.list();	
			 if(listCheck.size()>0){
				radExist=true;
				records = 21;
			 }
		         
			if(radExist==false || queryType.equalsIgnoreCase("update")){
				
				 //FOR SEPERATING AMOUNT OF SPONSOR AND GENERAL WHEN EDITING FROM RECEIPT END
				 sessionFactory.getCurrentSession().merge(billDetailsDto);
				 
				 //@codeBy : Vinod @codeDate : 25-July-2016 @codeFor : Generate service wise bill id  // start here
				 Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(ServicewiseBillDTO.class);			
				 criteriaRec.add(Restrictions.eq("treatId", billDetailsDto.getTreatmentId()));	
				 criteriaRec.add(Restrictions.eq("patientId", billDetailsDto.getPatienttId()));
				 criteriaRec.add(Restrictions.eq("serviceId", billDetailsDto.getServiceId()));
				 criteriaRec.add(Restrictions.eq("unitId", billDetailsDto.getUnitId()));
				 criteriaRec.add(Restrictions.eq("deptId", billDetailsDto.getDepartmentId()));
				 criteriaRec.setProjection(Projections.rowCount());
				 long count = (Long)criteriaRec.uniqueResult();
				 if(count==0){
					 
					 Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(IvfBillDetailsDto.class);
					 criteriaMax.setProjection(Projections.max("billDetailsId"));
					 Integer maxBillDetailsId = (Integer)criteriaMax.uniqueResult();
					 
					 ServicewiseBillDTO obj=new ServicewiseBillDTO();
					 obj.setBillMasterId(billDetailsDto.getBillId());
					 obj.setBillDetailsId(maxBillDetailsId);				
					 obj.setUnitId(billDetailsDto.getUnitId());
					 obj.setPatientId(billDetailsDto.getPatienttId());
					 obj.setDeptId(billDetailsDto.getDepartmentId());
					 obj.setTreatId(billDetailsDto.getTreatmentId());
					 obj.setServiceId(billDetailsDto.getServiceId());
					 obj.setCreatedBy(billDetailsDto.getCreatedBy());
					 obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
					 
					 sessionFactory.getCurrentSession().merge(obj);				  
				 }	
			} 
			
			if (billDetailsId > 0) {
				 
				 //Added By Bilal 01-02-2018
				 SubServiceDto subsobj = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class, subserviceid);
				 String isCombination = subsobj.getIscombination();
				 if (isCombination.equals("Y")) {
					 
					Query update = sessionFactory.getCurrentSession().createQuery("update EhatOtherBillDetailForOpdDto set doctorId = :doctorId where billDetailsId= :billDetailsId  and subServiceId= :subServiceId and deleted='N' ");
				    update.setParameter("doctorId", billDetailsDto.getDoctorId());
					update.setParameter("billDetailsId", billDetailsId);
					update.setParameter("subServiceId", subserviceid);
					update.executeUpdate();
				 }
                 records=2;
                 
            } else {
            	if(listCheck.size()>0 && queryType.equalsIgnoreCase("insert"))
            		records=21;
            	else
                 records=1;
            }if(sponsorid > 0 && chargesSid > 0){
				//ipdBillDaoImpl.setRemainSanctionAmountForOpd(sponsorid, chargesSid, treatmentId, patientId);
			}
			 
			// Set bill master totals					 	
			setBillMasterTotalsForOpd(billDetailsDto.getTreatmentId());
			
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}
	
	@Override
	public int saveToOtherBilling(IvfBillDetailsDto billDetailsDto,String queryType, Integer sponsorId,
			 Integer chargesSlaveId,String a, HttpServletRequest request) {

		int records = 0;
		
		String iscombination = billDetailsDto.getIscombination();
		Integer hallId       =0;
		Integer hallSlaveId  =0;
		int subServId        = billDetailsDto.getSubServiceId();
		int serviceId        = billDetailsDto.getServiceId();
		
		//if count greater than zero then package will be assign 
		if (iscombination.equals("Y") && sponsorId == 0 && chargesSlaveId == 0) {
			try {
				int count = count(sponsorId,chargesSlaveId,hallId,hallSlaveId,subServId,serviceId);
				if (count > 0) {
					
					//From And To date from charges configuration to check package date wise calling to different methods 
					java.sql.Date fromd = fromDatePackage( sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId);
					java.sql.Date todate= toDatePackage( sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId);
					
					//If From And To date not null then this condition will execute other it is available till date not configured  
					if (todate != null && fromd != null) {
						
						//getting count of date if count greater then zero then save other can't save  
						long count2 = countDate(sponsorId,chargesSlaveId,hallId,hallSlaveId,subServId,serviceId,fromd,todate);
						
						if (count2 > 0) {
							 
							records = saveOpdPackageForGeneral(sponsorId, chargesSlaveId,billDetailsDto, queryType, iscombination, a,request);
						}else{
							
							records =6;
						}
					}else{
						 
						records = saveOpdPackageForGeneral(sponsorId, chargesSlaveId, billDetailsDto, queryType, iscombination, a,request);
					}
				  
				}else{
					
					records =3;
				}
				
			} catch (Exception e) {
				e.printStackTrace();
				records = 0;
			}
			return records;
			//&& receiptOf.equals("sponsor")
		} else if (iscombination.equals("Y") && sponsorId > 0 && chargesSlaveId > 0 ) {

			try {
				int count = count(sponsorId,chargesSlaveId,hallId,hallSlaveId,subServId,serviceId);
				if (count > 0) {
					
					//From And To date from charges configuration to check package date wise calling to different methods 
					java.sql.Date fromd =fromDatePackage( sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId);
					java.sql.Date todate=toDatePackage( sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId);
					
					//If From And To date not null then this condition will execute other it is available till date not configured 
					if (todate != null && fromd != null) {
						
						//getting count of date if count greater then zero then save other can't save  
						long count2 = countDate(sponsorId,chargesSlaveId,hallId,hallSlaveId, subServId,serviceId,fromd,todate);
						if (count2 > 0) {
							records = saveOpdPackageForSponsor(sponsorId, chargesSlaveId, billDetailsDto, queryType, iscombination, a,request);
						}else{
							records=6;
						}
					}else{
						records = saveOpdPackageForSponsor(sponsorId, chargesSlaveId, billDetailsDto, queryType, iscombination, a,request);
					}
					
				}else{
				
					records =4;
				}
				
			} catch (Exception e) {
				e.printStackTrace();
				records =0;
			}
			return records;
		} else {
			try {
				sessionFactory.getCurrentSession().merge(billDetailsDto);
				records = 1;
			} catch (Exception e) {
				e.printStackTrace();
				return records;
			}
		}

		return records;
	}
	
	public java.sql.Date fromDatePackage(int sponsorId,int chargesSlaveId,int hallId,
    		int hallSlaveId,int subServId,int serviceId) {
    	java.sql.Date fromd= null;
    	try {
    		Query fromdate = sessionFactory.getCurrentSession().createQuery
					("SELECT fromDate FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId");
			
			
			fromdate.setParameter("sponsorId", sponsorId);
			fromdate.setParameter("chargesSlaveId", chargesSlaveId);
			
			fromdate.setParameter("hallId", hallId);
			fromdate.setParameter("hallSlaveId", hallSlaveId);
			
			fromdate.setParameter("isComServId", serviceId);
			fromdate.setParameter("isComServlastId", subServId);
			
			
			fromd= (java.sql.Date) fromdate.setMaxResults(1).uniqueResult();
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return fromd;
		}
		return fromd;
		
	}
	
	public java.sql.Date toDatePackage(int sponsorId,int chargesSlaveId,int hallId,
    		int hallSlaveId,int subServId,int serviceId) {
    	java.sql.Date todate= null;
    	try {
    		Query date = sessionFactory.getCurrentSession().createQuery
					("SELECT toDate FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId");
			
			
    		date.setParameter("sponsorId", sponsorId);
			date.setParameter("chargesSlaveId", chargesSlaveId);
			
			date.setParameter("hallId", hallId);
			date.setParameter("hallSlaveId", hallSlaveId);
			
			date.setParameter("isComServId", serviceId);
			date.setParameter("isComServlastId", subServId);
			
			
			todate= (java.sql.Date) date.setMaxResults(1).uniqueResult();
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return todate;
		}
		return todate;
		
	}
    
    private long countDate(Integer sponsorId, Integer chargesSlaveId,
			Integer hallId, Integer hallSlaveId, int subServId, int serviceId, java.sql.Date fromd, java.sql.Date todate) {
    	long count=0;
    	try {
    		//getting charges from Auto suggestion date wise
    		Query bet = sessionFactory.getCurrentSession().createQuery
    				("SELECT count(*) FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND current_date() BETWEEN  DATE_FORMAT(:stDate, '%Y-%m-%d')  AND DATE_FORMAT(:edDate, '%Y-%m-%d')");
    		
    		bet.setParameter("sponsorId", sponsorId);
    		bet.setParameter("chargesSlaveId", chargesSlaveId);
    		
    		bet.setParameter("hallId", hallId);
    		bet.setParameter("hallSlaveId", hallSlaveId);
    		
    		bet.setParameter("isComServId", serviceId);
    		bet.setParameter("isComServlastId", subServId);
    		
    		
    		bet.setDate("stDate", fromd);
    		bet.setDate("edDate", todate);
    		
    		count =(Long) bet.setMaxResults(1).uniqueResult();
    		
		} catch (Exception e) {
			e.printStackTrace();
		}
    	
		return count;
	}
    
	private int count(Integer sponsorId, Integer chargesSlaveId,
			Integer hallId, Integer hallSlaveId, int subServId, int serviceId) {
		
				Query q = sessionFactory.getCurrentSession().createSQLQuery(
				                    "SELECT count(*) as count FROM ehat_configuration_services where deleted='N' "
				                     +" and charges_id="+sponsorId+" and chargesSlave_id="
				                     +chargesSlaveId+" and hall_id="+hallId+" and hallSlave_id="+hallSlaveId+" and is_com_servId="
				                     +serviceId+" and is_com_servlastId="+subServId );

				Integer count = ((Number) q.uniqueResult()).intValue();
		return count;
	}

	public int saveOpdPackageForGeneral( Integer sponsorId, Integer chargesSlaveId
			, IvfBillDetailsDto billDetailsDto, String queryType, String iscombination, String a, HttpServletRequest request) {
		int records =0;
		try {
			
			if (queryType.equals("update")) {
				
				if ( a.equals("addToOPDreciept")) {
					
					//Add package from receipt 
					addpackagefromreceipt(sponsorId,chargesSlaveId,billDetailsDto,queryType,iscombination,a,request);
					
				
	            }else{
					sessionFactory.getCurrentSession().merge(billDetailsDto);
				}
			} else {
				
				   //Add package from Billing
				   addpackagefromBilling(sponsorId,chargesSlaveId,billDetailsDto,queryType,iscombination,a,request);
				
            }				
			
			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			records = 0;
		}
		return records;
	}
	
	private void addpackagefromBilling(Integer sponsorId,
			Integer chargesSlaveId, IvfBillDetailsDto billDetailsDto,
			String queryType, String iscombination, String a, HttpServletRequest request) {// saving records in bill details
		
		int billidd     = billDetailsDto.getBillId();
		
		String billmasterr="SELECT source_type_id,charges_master_slave_id FROM ehat_bill_master where deleted='N' and bill_id="
				+ billidd
				;
         SQLQuery billmasterqueryy = sessionFactory.getCurrentSession().createSQLQuery(billmasterr);    
         billmasterqueryy.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);


         List<Map<String, Object>> databillmasterr = billmasterqueryy.list();
         int chidd=0;
         int chslavidd=0;
         for (Map<String, Object> rowbillmaster : databillmasterr) {
        	 chidd =(Integer)rowbillmaster.get("source_type_id");
        	 chslavidd=(Integer)rowbillmaster.get("charges_master_slave_id");
        	 
         }
         billDetailsDto.setSponsorId(chidd);
         billDetailsDto.setChargesSlaveId(chslavidd);
		sessionFactory.getCurrentSession().merge(billDetailsDto);
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId =(Integer) session.getAttribute("uId");
		
		int subServId = billDetailsDto.getSubServiceId();
		int serviceId = billDetailsDto.getServiceId();
		
		int quantity = 1;
		
		int hallId = 0;
		int hallSlaveId = 0;
		//String receitpof      =billDetailsDto.getReceiptOf();
	    double amount         =billDetailsDto.getAmount();
		double con            =billDetailsDto.getConcession();
		double otheramt       =billDetailsDto.getOtherAmount();
		double othercon       =billDetailsDto.getOtherConcession();
		double actualam       =amount -con;
		double actualotheramt =otheramt -othercon;
		
		// max count of bill details id
		Criteria criteriaMax = sessionFactory.getCurrentSession()
				.createCriteria(IvfBillDetailsDto.class);
		criteriaMax.setProjection(Projections.max("billDetailsId"));
		Integer maxBillId = (Integer) criteriaMax.uniqueResult();

		if(maxBillId == null){
			maxBillId = 0;
		}
		// bill details id from other OPD bill table
		//Integer otherbillDetailsId = 0;
				
		String query1="SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where charges_id="
								+ sponsorId
								+ " and chargesSlave_id="
								+ chargesSlaveId
								+ " and is_com_servId=" + serviceId
								+ " and is_com_servlastId=" + subServId
								+ " and hall_id=" + hallId
								+ " and hallSlave_id=" + hallSlaveId
								+ " and deleted='N'";
		
		 
		
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);    
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        
   
        List<Map<String, Object>> data = query.list();
        
		for (Map<String, Object> row : data) {

			EhatOtherBillDetailForOpdDto obj = new EhatOtherBillDetailForOpdDto();

			
			
			double copay = 0;
			double pay = 0;
			double concession = 0;
			double charges = (Double) row.get("charges");
			double chargessposor = (Double) row.get("charges");
			double amountofcon = 0;
			double amountofconsponsor = 0;
			double otherpay     = 0;
			double othercopay     = 0;
			String iscombinationflag = (String) row.get("iscombination");
			double totalcharges = (Double) row.get("totalcharges");
			
			int billid     = billDetailsDto.getBillId();
			
			String billmaster="SELECT source_type_id,charges_master_slave_id FROM ehat_bill_master where deleted='N' and bill_id="
					+ billid
					;
             SQLQuery billmasterquery = sessionFactory.getCurrentSession().createSQLQuery(billmaster);    
             billmasterquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);


             List<Map<String, Object>> databillmaster = billmasterquery.list();
             int chid=0;
             int chslavid=0;
             for (Map<String, Object> rowbillmaster : databillmaster) {
            	 chid =(Integer)rowbillmaster.get("source_type_id");
            	 chslavid=(Integer)rowbillmaster.get("charges_master_slave_id");
            	 
             }
			
			
			//Integer subserviceId = (Integer) row.get("service_id");
			
			//distributed amount formula
			double IncDecp = charges*100/totalcharges;
			charges        =  IncDecp * actualam/100;	
			obj.setRate(charges);
			
			//distributed amount formula for sponsor charges
			double IncDecp2 = chargessposor*100/totalcharges;
			chargessposor        =  IncDecp2 * actualotheramt/100;
			obj.setOtherRate(chargessposor);
			
			amountofconsponsor = chargessposor * quantity;
			otherpay = chargessposor * quantity - concession;
			othercopay = amountofconsponsor - otherpay;

			obj.setOtherAmount(amountofconsponsor);
			obj.setOtherPay(otherpay);
			obj.setOtherCoPay(othercopay);
			obj.setOtherConcession(concession);
			
			obj.setChildSubServiceId((Integer) row.get("service_id"));
           
            
			obj.setSubServiceId(billDetailsDto.getSubServiceId());

			obj.setServiceId(billDetailsDto.getServiceId());
			obj.setBillId(billDetailsDto.getBillId());
			obj.setBillDetailsId(maxBillId);
			obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
			obj.setCreatedBy(userId);
			obj.setCreatedDateTime(new Date(new java.util.Date()
					.getTime()));

			obj.setCancle("N");
			obj.setDeleted("N");

			obj.setUnitId(unitId);
			obj.setDepartmentId(billDetailsDto.getDepartmentId());
			obj.setDoctorId(billDetailsDto.getDoctorId());

			obj.setTreatmentId(billDetailsDto.getTreatmentId());
			obj.setPatienttId(billDetailsDto.getPatienttId());

			obj.setChargesId(chid);
			obj.setChargesSlaveId(chslavid);

			amountofcon = charges * quantity;
			copay = charges * quantity - concession;
			pay = amountofcon - copay;

			obj.setAmount(amountofcon);
			obj.setCoPay(copay);
			obj.setPay(pay);
			obj.setConcession(concession);

			obj.setQuantity(quantity);
			obj.setIscombination(iscombinationflag);

			//setting service id in other bill details table
			Integer subId=(Integer) row.get("service_id");
			SubServiceDto obje = (SubServiceDto) sessionFactory
					.getCurrentSession().get(SubServiceDto.class,
							subId);
			obj.setChildServiceId(obje.getServiceId());
			obj.setSelfid(0);
			sessionFactory.getCurrentSession().merge(obj);
			
			//for package of package 
			/*if (iscombinationflag.equals("Y")) {
				packofpack(sponsorId,chargesSlaveId,billDetailsDto,serviceId,subserviceId,hallId,hallSlaveId,maxBillId,quantity,charges);
			} */

			
		}
	}

	/****
	 * @author  :BILAL
	 * @param request 
	 * @Date    :15-11-2017
	 * @Code    :For Adding or saving package from receipt
	 * *****/
	private void addpackagefromreceipt(Integer sponsorId,
			Integer chargesSlaveId, IvfBillDetailsDto billDetailsDto,
			String queryType, String iscombination, String a, HttpServletRequest request) {// saving records in bill details
		sessionFactory.getCurrentSession().merge(billDetailsDto);

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId =(Integer) session.getAttribute("uId");
		
		int subServId = billDetailsDto.getSubServiceId();
		int serviceId = billDetailsDto.getServiceId();
		
		//String receitpof      =billDetailsDto.getReceiptOf();
		double amount         =billDetailsDto.getAmount();
		double con            =billDetailsDto.getConcession();
		double otheramt       =billDetailsDto.getOtherAmount();
		double othercon       =billDetailsDto.getOtherConcession();
		double actualam       =amount -con;
	    double actualotheramt =otheramt -othercon;
	    
		int quantity = 1;

		int hallId = 0;
		int hallSlaveId = 0;

		String query1="SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where charges_id="
								+ sponsorId
								+ " and chargesSlave_id="
								+ chargesSlaveId
								+ " and is_com_servId=" + serviceId
								+ " and is_com_servlastId=" + subServId
								+ " and hall_id=" + hallId
								+ " and hallSlave_id=" + hallSlaveId
								+ " and deleted='N'";
		
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);    
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
               
        List<Map<String, Object>> data = query.list();
       
		for (Map<String, Object> row : data) {

			EhatOtherBillDetailForOpdDto obj = new EhatOtherBillDetailForOpdDto();

			double copay = 0;
			double pay = 0;
			double concession = 0;
			double charges       = (Double) row.get("charges");
			double chargessposor = (Double) row.get("charges");
			double amountofcon = 0;
			double amountofconsponsor = 0;
			double otherpay     = 0;
			double othercopay     = 0;
			String iscombinationflag = (String) row.get("iscombination");
			double totalcharges = (Double) row.get("totalcharges");
			
            int billid     = billDetailsDto.getBillId();
			
			String billmaster="SELECT source_type_id,charges_master_slave_id FROM ehat_bill_master where deleted='N' and bill_id="
					+ billid
					;
             SQLQuery billmasterquery = sessionFactory.getCurrentSession().createSQLQuery(billmaster);    
             billmasterquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);


             List<Map<String, Object>> databillmaster = billmasterquery.list();
             int chid=0;
             int chslavid=0;
             for (Map<String, Object> rowbillmaster : databillmaster) {
            	 chid =(Integer)rowbillmaster.get("source_type_id");
            	 chslavid=(Integer)rowbillmaster.get("charges_master_slave_id");
            	 
             }
			//distributed amount formula for general charges
			double IncDecp = charges*100/totalcharges;
			charges        =  IncDecp * actualam/100;
			obj.setRate(charges);

			//distributed amount formula for sponsor charges
			double IncDecp2 = chargessposor*100/totalcharges;
			chargessposor        =  IncDecp2 * actualotheramt/100;
			obj.setOtherRate(chargessposor);
			
			amountofconsponsor = chargessposor * quantity;
			otherpay = chargessposor * quantity - concession;
			othercopay = amountofconsponsor - otherpay;

			obj.setOtherAmount(amountofconsponsor);
			obj.setOtherPay(otherpay);
			obj.setOtherCoPay(othercopay);
			obj.setOtherConcession(concession);
			
			
			obj.setChildSubServiceId((Integer) row
					.get("service_id"));

			obj.setSubServiceId(billDetailsDto.getSubServiceId());

			obj.setServiceId(billDetailsDto.getServiceId());
			obj.setBillId(billDetailsDto.getBillId());
			obj.setBillDetailsId(billDetailsDto.getBillDetailsId());
			obj.setCreatedDateTime(billDetailsDto
					.getCreatedDateTime());
			obj.setCreatedBy(userId);
			obj.setCreatedDateTime(new Date(new java.util.Date()
					.getTime()));

			obj.setCancle("N");
			obj.setDeleted("N");

			obj.setUnitId(unitId);
			obj.setDepartmentId(billDetailsDto.getDepartmentId());
			obj.setDoctorId(billDetailsDto.getDoctorId());

			obj.setTreatmentId(billDetailsDto.getTreatmentId());
			obj.setPatienttId(billDetailsDto.getPatienttId());

			obj.setChargesId(chid);
			obj.setChargesSlaveId(chslavid);

			amountofcon = charges * quantity;
			copay = charges * quantity - concession;
			pay = amountofcon - copay;

			obj.setAmount(amountofcon);
			obj.setCoPay(copay);
			obj.setPay(pay);
			obj.setConcession(concession);

			obj.setQuantity(quantity);
			obj.setIscombination(iscombinationflag);

			// setting service id in other bill details table
			Integer subId = (Integer) row.get("service_id");
			SubServiceDto obje = (SubServiceDto) sessionFactory
					.getCurrentSession().get(SubServiceDto.class,
							subId);
			obj.setChildServiceId(obje.getServiceId());

			sessionFactory.getCurrentSession().merge(obj);

		}
	}
	
	public int saveOpdPackageForSponsor( Integer sponsorId, Integer chargesSlaveId
            , IvfBillDetailsDto billDetailsDto,
		String queryType, String iscombination, String a, HttpServletRequest request) {	
		int records=0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			
			if (queryType.equals("update")) {
	
				sessionFactory.getCurrentSession().merge(billDetailsDto);
	
			} else {
			// saving records in bill details
			sessionFactory.getCurrentSession().merge(billDetailsDto);
			
			int subServId = billDetailsDto.getSubServiceId();
			int serviceId = billDetailsDto.getServiceId();
			
			int quantity = 1;
			
			int hallId = 0;
			int hallSlaveId = 0;
			
			    //String receitpof      =billDetailsDto.getReceiptOf();
				double amount         =billDetailsDto.getAmount();
				double con            =billDetailsDto.getConcession();
				double otheramt       =billDetailsDto.getOtherAmount();
				double othercon       =billDetailsDto.getOtherConcession();
				double actualam       =amount -con;
			    double actualotheramt =otheramt -othercon;
	
			// max count of bill details id
			Criteria criteriaMax = sessionFactory.getCurrentSession()
					.createCriteria(IvfBillDetailsDto.class);
			criteriaMax.setProjection(Projections.max("billDetailsId"));
			Integer maxBillId = (Integer) criteriaMax.uniqueResult();
	
			if(maxBillId == null){
				maxBillId = 0;
			}
			
			String query1="SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where charges_id="
									+ sponsorId
									+ " and chargesSlave_id="
									+ chargesSlaveId
									+ " and is_com_servId=" + serviceId
									+ " and is_com_servlastId=" + subServId
									+ " and hall_id=" + hallId
									+ " and hallSlave_id=" + hallSlaveId
									+ " and deleted='N'";
			
			
			
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);    
	        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        
	   
	        List<Map<String, Object>> data = query.list();
	        for(Map<String, Object> row : data){
	        	
	        	  EhatOtherBillDetailForOpdDto obj = new EhatOtherBillDetailForOpdDto();
	        	  double copay      = 0;
					  double pay        = 0;
					  double concession = 0;
					  
					  
					  double charges= (Double)row.get("charges");
					  double chargessposor = (Double) row.get("charges");
				  double amountofcon = 0;
				  double amountofconsponsor = 0;
				  double otherpay     = 0;
				  double othercopay     = 0;
				  
					  String iscombinationflag = (String) row.get("iscombination");
					  double totalcharges =(Double)row.get("totalcharges");
					  
					 
					  //distributed amount formula
					  double IncDecp = charges*100/totalcharges;
					  charges        =  IncDecp * actualam/100;
					  
					  obj.setRate(charges);
					  
					  //distributed amount formula for sponsor charges
					  double IncDecp2 = chargessposor*100/totalcharges;
					  chargessposor        =  IncDecp2 * actualotheramt/100;
					  obj.setOtherRate(chargessposor);
					
					  amountofconsponsor = chargessposor * quantity;
					  otherpay = chargessposor * quantity - concession;
					  othercopay = amountofconsponsor - otherpay;
	
					  obj.setOtherAmount(amountofconsponsor);
					  obj.setOtherPay(otherpay);
					  obj.setOtherCoPay(othercopay);
					  obj.setOtherConcession(concession);
				 // obj.setSubServiceId((Integer)row.get("service_id"));
					  
					  obj.setChildSubServiceId((Integer)row.get("service_id"));
				  
				  obj.setSubServiceId(billDetailsDto.getSubServiceId());
				  obj.setServiceId(billDetailsDto.getServiceId());
				  obj.setBillId(billDetailsDto.getBillId());
				  obj.setBillDetailsId(maxBillId);
				  obj.setCreatedDateTime(billDetailsDto
							.getCreatedDateTime());
				  obj.setCreatedBy(userId);
				  obj.setCreatedDateTime(new Date(new java.util.Date()
							.getTime()));
				  
				  obj.setCancle("N");
				  obj.setDeleted("N");
					
				  obj.setUnitId(unitId);
				  obj.setDepartmentId(billDetailsDto.getDepartmentId());
				  obj.setDoctorId(billDetailsDto.getDoctorId());
	
				  obj.setTreatmentId(billDetailsDto.getTreatmentId());
				  obj.setPatienttId(billDetailsDto.getPatienttId());
				  
				  obj.setChargesId(sponsorId);
				  obj.setChargesSlaveId(chargesSlaveId);
				  
				  amountofcon = charges * quantity;
				  pay = charges * quantity - concession;
				  copay = amountofcon - pay;
	
				 obj.setAmount(amountofcon);
				 obj.setCoPay(copay);
				 obj.setPay(pay);
				 obj.setConcession(concession);
				 
				 obj.setQuantity(quantity);
				 obj.setIscombination(iscombinationflag);
				 
				 Integer subId=(Integer) row.get("service_id");
					SubServiceDto obje = (SubServiceDto) sessionFactory
							.getCurrentSession().get(SubServiceDto.class,
									subId);
					obj.setChildServiceId(obje.getServiceId());
				 
				  sessionFactory.getCurrentSession().merge(obj);
	        }
		}  
					
			
			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			records = 0;
		}
		return records;
	}
	
	public int setBillMasterTotalsForOpd(int treatmentId) {
		
		int result=0;
		try {
			
			// Update amount in bill master start
			double totalAmt=0;				
			double totPaid=0;
			double totRemain=0;
			double totRefund=0;
			double totDisc=0;
			double totConcn=0;		
			String callFrom = "opd";
			
			BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
			obj.setTreatmentId(treatmentId);
			BillReceiptMasterDTO objRec = fetchAllReceiptTotals(obj,callFrom);
			
			totalAmt = objRec.getActualAmt();
			totConcn = objRec.getActualTotConcn();
			totDisc = objRec.getTotalDisc();
			totPaid = objRec.getTotalPaid();		
			totRefund = objRec.getRefundAmt();
			totRemain = totalAmt - (totConcn + totDisc + totPaid);		
			
			SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date(System.currentTimeMillis());
			String hql = "UPDATE BillMasterDto set updatedDateTime =:updatedDateTime, totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn WHERE treatmentId =:treatmentId";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			//query.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
			query.setDate("updatedDateTime",date);
			query.setParameter("totalBill",totalAmt);  
			query.setParameter("totalPaid",totPaid);  
			query.setParameter("remaining",totRemain);  
			query.setParameter("totalRefund",totRefund);  
			query.setParameter("discount",totDisc);  
			query.setParameter("totalConcn",totConcn);  
			query.setParameter("treatmentId",treatmentId);  
			query.executeUpdate();
			// Update amount in bill master end
					
			result=1;
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}
		return result;
	}

	public BillReceiptMasterDTO fetchAllReceiptTotals(BillReceiptMasterDTO obj,String callFrom) {
		
		BillReceiptMasterDTO masterObj=new BillReceiptMasterDTO();
		
		try {			
			
			RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
	        RegTreBillDto rtd = new RegTreBillDto();            
	        
	        if(regCon != null){
	           
	        	rtd=regCon.fetchPatientsRecordByTreatmentId(obj.getTreatmentId());
	            rtd=rtd.getListRegTreBillDto().get(0);
	            rtd.getPatientName();
	            
	            obj.setSponsorCatId(rtd.getSourceTypeId()); 
	        }		                
			
			String sql="";
			double ipdRefund=0;
			double totAmt=0,totConcn=0,totDisc=0,totPaid=0,totRemain=0,totRefund=0;
			
			if(callFrom.equals("opd")){
				
				if(obj.getSponsorCatId()>0){
					
					sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn FROM ivf_ehat_bill_details where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and service_id != 21 ";
				}else{
					
					sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn FROM ivf_ehat_bill_details where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and service_id != 21 ";
				}
			}else{
				
				if(obj.getSponsorCatId()>0){
					
					sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn,service_id FROM ivf_ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and service_id != 21 and service_id != 16 ";
				}else{
					
					sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn,service_id FROM ivf_ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and service_id != 21 and service_id != 16 ";
				}
			}					
			
			Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
			for(Map<String, Object> row : listBillDetails){
				
				totAmt=(Double)row.get("totAmt");
				totConcn=(Double)row.get("totConcn");					
			}
			
			if(callFrom.equals("opd")){
				
				sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
						"ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ivf_ehat_receipt_master where deleted='N' and treatment_id="+obj.getTreatmentId()+" and against_id=0 ";
				
			}else{
				
				sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
						"ifnull(sum(total_remain),0) as totRemain FROM ivf_ehat_receipt_master_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and against_id=0 ";
				
				String sqlRef="select ifnull(sum(total_paid),0) from ivf_ehat_refund_master_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" ";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				ipdRefund =(Double) refQuery.uniqueResult();
			}
				
			
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			for(Map<String, Object> row : listRec){
				
				totDisc=(Double)row.get("totDisc");
				totPaid=(Double)row.get("totPaid");			
				totRemain=(Double)row.get("totRemain");	
				
				if(callFrom.equals("opd")){
					
					totRefund=(Double)row.get("totRefund");	
				
				}else{
					
					totRefund=ipdRefund;					
				}
			}
			
			masterObj.setActualAmt(totAmt);
			masterObj.setActualTotConcn(totConcn);
			masterObj.setTotalDisc(totDisc);
			masterObj.setTotalPaid(totPaid);
			masterObj.setTotalRemain(totRemain);
			masterObj.setRefundAmt(totRefund);
					
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		return masterObj;
	}
	
	@Override
	public List<IvfBillNobleDto> getPatientBillAmount(Integer treatmentId) {
		
		List<IvfBillNobleDto> ltPatientRecord = new ArrayList<IvfBillNobleDto>();
		try {
			
			 String sql = "SELECT * FROM ivf_patient_service_detail where treatment_id = '"+treatmentId+"'";
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 
	        	 IvfBillNobleDto objDTO= new IvfBillNobleDto();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	
	        	 objDTO.setServiceName((String)row.get("service_name"));
	        	 objDTO.setAmount((Double)row.get("amount"));
	        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
	        	 objDTO.setIsCombination((String)row.get("iscombination"));

	        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
	        	
	        	 ltPatientRecord.add(objDTO);
	        	 objDTO=null;
	         }
	         
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}
		return ltPatientRecord;
	}
	
	@Override
	public List<IvfBillNobleDto> getPatientBillAmount(Integer treatmentId,	int userId) {
		List<IvfBillNobleDto> ltPatientRecord = new ArrayList<IvfBillNobleDto>();
		try {
		
			String tflag="";
		    String sqlflag="Select t_flag from ehat_treatment where treatment_id="+treatmentId;
		    SQLQuery tflagquery = sessionFactory.getCurrentSession().createSQLQuery(sqlflag);
		    tflag= (String) tflagquery.uniqueResult();
			   
			if(tflag.equalsIgnoreCase("Y")){
				
				 String sql = "SELECT * FROM ivf_patient_service_detail where treatment_id = "+treatmentId+"";
				 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 IvfBillNobleDto objDTO= new IvfBillNobleDto();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setAmount((Double)row.get("amount"));
		        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
		        	 objDTO.setIsCombination((String)row.get("iscombination"));

		        	
		        	 ltPatientRecord.add(objDTO);
		        	 objDTO=null;
		         }
			}else{
				
				 String sql = "SELECT * FROM ivf_patient_service_detail2 where treatment_id = "+treatmentId+"";
				 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 IvfBillNobleDto objDTO= new IvfBillNobleDto();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setAmount((Double)row.get("amount"));
		        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
		        	 objDTO.setIsCombination((String)row.get("iscombination"));

		        	
		        	 ltPatientRecord.add(objDTO);
		        	 objDTO=null;
		         }
			}
				         
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	@SuppressWarnings("null")
	@Override
	public List<IvfBillNobleServiceDto> getPatientServiceBill(Integer treatmentId,Integer serviceId) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");    
		int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
		List<IvfBillNobleServiceDto> ltPatientRecord1 = new ArrayList<IvfBillNobleServiceDto>();
		ArrayList<String> tokenlist = new ArrayList<String>();
		try {
			if(serviceId==14) {					
				String sql1 = "SELECT * FROM ivf_ehat_bill_details where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' ";
										
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         
		        @SuppressWarnings("unchecked")
				List<Map<String, Object>> data1 = query1.list();
		         		         
		         
		         for(Map<String, Object> row : data1){
		        	 
		        	 IvfBillNobleServiceDto objDTO1= new IvfBillNobleServiceDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aa=(Integer)row.get("service_id");
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setDocId((Integer)row.get("doctor_id"));
		        	 
		        	 String sql= "SELECT doc_name FROM doctor where Doctor_ID=:docId";
			         Query query= sessionFactory.getCurrentSession().createSQLQuery(sql).setParameter("docId", objDTO1.getDocId());
			         String docName = (String) query.uniqueResult();
		        
			         objDTO1.setDocName(docName);
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setConcessionOnPerc((Double)row.get("concession_in_Perc"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setIsModify((String)row.get("isModify"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
		        	 objDTO1.setCreatedDate((Date)row.get("created_date_time"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));
		        	 int bb=(Integer)row.get("sub_service_id");
		        	 
		        	 if(aa==14) {		
							
		        		String sql3 = "SELECT inv_consumption_info_slave_item_name AS IName FROM inv_consumption_item_info_slave where inv_consumption_item_info_slave_item_code = "+bb+";";

						SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
						query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> data3 = query3.list();
						
						for (Map<String, Object> row3 : data3) {
								
							objDTO1.setInvName((String) row3.get("IName"));
						}						
					 }		       			
		        	
		        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
		        	 ltPatientRecord1.add(objDTO1);
		        	 objDTO1=null;
		         
		         }
		          						
			}else if(serviceId==16)
			{
				
				//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
					String sql1 = "SELECT *,date(created_date_time) as created_date FROM ivf_ehat_bill_details where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' ";
				
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         
		        @SuppressWarnings("unchecked")
				List<Map<String, Object>> data1 = query1.list();
		         
		         
		         
		         for(Map<String, Object> row : data1){
		        	 
		        	 IvfBillNobleServiceDto objDTO1= new IvfBillNobleServiceDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aa=(Integer)row.get("service_id");
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 
		        	 objDTO1.setDocId((Integer)row.get("doctor_id"));
		        	 
		        	String sql= "SELECT doc_name FROM doctor where Doctor_ID=:docId";
		        Query query= sessionFactory.getCurrentSession().createSQLQuery(sql)
		        	 .setParameter("docId", objDTO1.getDocId());
		        String docName = (String) query.uniqueResult();
		        
		             objDTO1.setDocName(docName);
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setIsModify((String)row.get("isModify"));
		        	 objDTO1.setCghsCode((String)row.get("cgscode"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
		        	 
		        	 objDTO1.setCreatedDate((Date)row.get("created_date_time"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 objDTO1.setDrdeskflag((String) row.get("drdesk_flag"));
		        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));
		        	 int bb=(Integer)row.get("sub_service_id");
		        	 
		        	 if(aa==16)
		        	 {		
							String sql3 = "SELECT product_name as productName FROM pharma_product_master where product_id = "+bb+" ";
										

							SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
							query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data3 = query3.list();
							//System.err.println("ot len-----------------------"+data1.size());
							for (Map<String, Object> row3 : data3) {
									
								objDTO1.setPharmaName((String) row3.get("productName"));
							}									
					}
		       		
		        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
		        	 ltPatientRecord1.add(objDTO1);
		        	 objDTO1=null;
		         
			}
		          						
		}else{
	         
				String sql1 = "SELECT * FROM ivf_patient_sub_service_details where treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"'";
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        List<Map<String, Object>> data1 = query1.list();
		         
		        for(Map<String, Object> row : data1){
		        	 
		        	 IvfBillNobleServiceDto objDTO1= new IvfBillNobleServiceDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aaa=(Integer)row.get("service_id");
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setDocName((String)row.get("doc_name"));
		        	 int drrId = ((Number)row.get("Doctor_ID")).intValue();		        	 
		        	 objDTO1.setDocId(drrId);	
		        	 objDTO1.setCharges((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setConcessionOnPerc((Double)row.get("concession_in_Perc"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setIsModify((String)row.get("isModify"));
		        	 objDTO1.setCghsCode((String)row.get("cgscode"));
		        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 int bbb=(Integer)row.get("sub_service_id");
		        	 objDTO1.setPaidFlag((String)row.get("paid_flag"));
		        	 objDTO1.setIsCombination((String)row.get("iscombination"));
		        	 objDTO1.setEmrPer((Double)row.get("emrPer"));
		        	 objDTO1.setSndtolabflag((String)row.get("sndtolabflag"));
		        	 objDTO1.setSndtorisflag((String)row.get("sndtorisflag"));
		        	 objDTO1.setChargesSlaveId((Integer)row.get("charges_slave_id"));
		        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));

		        	 if(aaa == 2){
		        		if(bbb > 0){
		        			 objDTO1.setCategoryName((String)row.get("category_name"));
		        		}else{
		        			 objDTO1.setCategoryName("-");
		        		}		        				        		
		        		
		        		String doc_initial="-";
		        		if((String)row.get("doc_initial")!=null){
		        			doc_initial =(String)row.get("doc_initial");
		        		}
			        	 if(doc_initial.equalsIgnoreCase("0") || doc_initial.equalsIgnoreCase("") || doc_initial.equalsIgnoreCase(null)){
			        		 doc_initial="-";
			        	 }
			        	 Integer drId=0;
			        	 drId=objDTO1.getDocId();
			        	 
			        	 if(drId!=0 && drId!=null){
		  	        	 String tk= getTokenNumber(doc_initial,treatmentId,objDTO1.getDocId());
		        	 	 tokenlist.add(tk);
		        	 	 
		        	 	String final1= Joiner.on(",").join(tokenlist);
			        	
			        	Session session = sessionFactory.getCurrentSession();
			        	String hql = "UPDATE TreatmentDto set tokenno =:tkn WHERE treatmentId =:tid";
						Query qry = session.createQuery(hql);
						qry.setParameter("tkn",final1);  
						qry.setParameter("tid", treatmentId);
						qry.executeUpdate();
			        	 }
		        		
		        		
		        	}else{
		        		 objDTO1.setCategoryName((String)row.get("category_name"));
		        	}
		        	//added by pooja
	        		
	        		if(aaa == pharmacyInvoice &&  bbb == 9){		        			 
		        		 
	        			objDTO1.setCategoryName((String)row.get("drdesk_flag"));	
		        		
		        	}else {
		        		
		        		objDTO1.setCategoryName((String)row.get("category_name"));	
		        	}
		        	ltPatientRecord1.add(objDTO1);
		        	objDTO1=null;
		         }	         
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltPatientRecord1;
		}
		return ltPatientRecord1;
	}
	
	public String getTokenNumber(String d,int trid,int drid){
 		
		String s1=String.valueOf(drid);
		Criteria criteriatoken = sessionFactory.getCurrentSession().createCriteria(TokenDto.class);
		criteriatoken.setProjection(Projections.max("token")); 
		criteriatoken.add(Restrictions.eq("doctorIdList",s1));
		criteriatoken.add(Restrictions.eq("treatmentId",trid));
		criteriatoken.add(Restrictions.sqlRestriction("DATE(created_date_time)=CURDATE()"));
		Integer unid = (Integer) criteriatoken.uniqueResult();
		if(unid==null){
			
			unid=0; 
		}
 		d=unid+" "+d;
		return d;
 	}
	
public BillDetailsDto getTotalPayable(BillDetailsDto billRecMaster,String callFrom){	
		
		int unitId=billRecMaster.getUnitId();
		int depId=billRecMaster.getDepartmentId();
		try {
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
			String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
			String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
			int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
			int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
			
			//service  list by user
          	ArrayList<Integer> sIds11=new ArrayList<Integer>();
          	String[] servIds1 = null;
 			String servIds2=null;
            String sql2="select IFEMPTY(service_id, '0') as service_id from users where User_ID="+billRecMaster.getCreatedBy()+" and " 
 			+ "(dept_id = "+depId+" OR dept_id LIKE '"+depId+",%' OR dept_id LIKE '%,"+depId+",%' OR dept_id LIKE '%,"+depId+"') and " 
 			+ "(unitmaster_id = "+unitId+" OR unitmaster_id LIKE '"+unitId+",%' OR unitmaster_id LIKE '%,"+unitId+",%' OR unitmaster_id LIKE '%,"+unitId+"')"; 
            SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
            query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
			List<Map<String, Object>> data2 = query2.list();
          
            if(query2.list().isEmpty()){
                	
            }else{
                	
	        	for(Map<String, Object> row : data2){
	        		servIds2=(String)row.get("service_id");
	        	}
             
	        	if(servIds2.length()>0){
	        		servIds1=servIds2.split(",");
	        		for(String id:servIds1){
	        			sIds11.add(Integer.parseInt(id));
	        		}
	        	}  
            }
			
            BillDetailsDto billObj=new BillDetailsDto();
            List<BillDetailsDto> blist = new ArrayList<BillDetailsDto>();
			            
           if(billRecMaster.getChargesSlaveId() > 0){
        	   
        	   if(billRecMaster.getServiceId()>0){
	            	
	            	sql2="select amount,concession,other_amount,other_concession,service_id from ivf_ehat_bill_details where treatment_id="+billRecMaster.getTreatmentId()+" and charges_slave_id="+billRecMaster.getChargesSlaveId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id="+billRecMaster.getServiceId()+" ";
	            	
	            }else if(servIds2!=null){
	            					
	            	sql2="select amount,concession,other_amount,other_concession,service_id from ivf_ehat_bill_details where treatment_id="+billRecMaster.getTreatmentId()+" and charges_slave_id="+billRecMaster.getChargesSlaveId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id in("+servIds2+") and service_id !="+pharmacyInvoice+" ";
				
	            }else{
					
					sql2="select amount,concession,other_amount,other_concession,service_id from ivf_ehat_bill_details where treatment_id="+billRecMaster.getTreatmentId()+" and charges_slave_id="+billRecMaster.getChargesSlaveId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id !="+pharmacyInvoice+" ";
				}
	            
	            SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
	            query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	            @SuppressWarnings("unchecked")
	        	List<Map<String, Object>> listBillMaster = query3.list();
				
	            for(Map<String, Object> row : listBillMaster){
	        		
	            	BillDetailsDto billMaster=new BillDetailsDto();
	            	billMaster.setAmount((Double)row.get("amount"));
	            	billMaster.setConcession((Double)row.get("concession"));
	            	billMaster.setOtherAmount((Double)row.get("other_amount"));
	            	billMaster.setOtherConcession((Double)row.get("other_concession"));    
	            	billMaster.setServiceId((Integer)row.get("service_id"));    
	            	blist.add(billMaster);
	        	}
        	   
	       }else{
				
				if(billRecMaster.getServiceId()>0){
	            	
	            	sql2="select amount,concession,other_amount,other_concession,service_id from ivf_ehat_bill_details where treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id="+billRecMaster.getServiceId()+" ";
	            	
	            }else if(servIds2!=null){
	            					
	            	sql2="select amount,concession,other_amount,other_concession,service_id from ivf_ehat_bill_details where treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id in("+servIds2+") and service_id !="+pharmacyInvoice+" ";
				
	            }else{
					
					sql2="select amount,concession,other_amount,other_concession,service_id from ivf_ehat_bill_details where treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id !="+pharmacyInvoice+" ";
				}
	            
	            SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
	            query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	            @SuppressWarnings("unchecked")
	        	List<Map<String, Object>> listBillMaster = query3.list();
				
	            for(Map<String, Object> row : listBillMaster){
	        		
	            	BillDetailsDto billMaster=new BillDetailsDto();
	            	billMaster.setAmount((Double)row.get("amount"));
	            	billMaster.setConcession((Double)row.get("concession"));
	            	billMaster.setOtherAmount((Double)row.get("other_amount"));
	            	billMaster.setOtherConcession((Double)row.get("other_concession"));    
	            	billMaster.setServiceId((Integer)row.get("service_id"));    
	            	blist.add(billMaster);
	        	}        
	        }
			billObj.setListBillDetails(blist);		
			return billObj;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}
	
	@Override
	public BillReceiptMasterDTO fetchAllIvfReceiptTotals(BillReceiptMasterDTO obj,String callFrom) {
		
		BillReceiptMasterDTO masterObj=new BillReceiptMasterDTO();
		
		try {			
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
			String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
			String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
			int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
			int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
						
			if(callFrom.equals("sponsorWiseOpd") || callFrom.equals("sponsorWiseIpd")){
				
				String sql="";
				double ipdRefund=0;
				double totAmt=0,totConcn=0,totDisc=0,totPaid=0,totRemain=0,totRefund=0;
				
				if(callFrom.equals("sponsorWiseOpd")){
						
					sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn FROM ivf_ehat_bill_details where deleted='N' and treatment_id="+obj.getTreatmentId()+" and charges_slave_id="+obj.getSponsorCatId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" ";
					
				}else{
						
					sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn,service_id FROM ivf_ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and charges_slave_id="+obj.getSponsorCatId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" and service_id != "+pharmacyServId+" ";
				}					
				
				Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
				for(Map<String, Object> row : listBillDetails){
					
					totAmt=(Double)row.get("totAmt");
					totConcn=(Double)row.get("totConcn");					
				}
				
				if(callFrom.equals("sponsorWiseOpd")){
					
					sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
							"ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ivf_ehat_receipt_master where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and sponsor_cat_id="+obj.getSponsorCatId()+" and against_id=0 ";
					
				}else{
					
					sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
							"ifnull(sum(total_remain),0) as totRemain FROM ivf_ehat_receipt_master_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and sponsor_cat_id="+obj.getSponsorCatId()+" and against_id=0 ";
					
					String sqlRef="select ifnull(sum(total_paid),0) from ivf_ehat_refund_master_ipd where deleted='N' and sponsor_cat_id="+obj.getSponsorCatId()+" and treatment_id="+obj.getTreatmentId()+" ";
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
					ipdRefund =(Double) refQuery.uniqueResult();
				}
				
				Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listRec = recQuery.list();
				for(Map<String, Object> row : listRec){
					
					totDisc=(Double)row.get("totDisc");
					totPaid=(Double)row.get("totPaid");			
					totRemain=(Double)row.get("totRemain");	
					
					if(callFrom.equals("sponsorWiseOpd")){
						
						totRefund=(Double)row.get("totRefund");	
					
					}else{
						
						totRefund=ipdRefund;					
					}
				}
				
				/* sql="select ifnull(sum(paid_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrpaid =(Double) spQuery.uniqueResult();
				
				sql="select ifnull(sum(concession),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrCon =(Double) conQuery.uniqueResult();
				
				sql="select ifnull(sum(tds_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query tdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrTds =(Double) tdsQuery.uniqueResult();
					
				totalSpnsrpaid = totalSpnsrpaid + totalSpnsrCon + totalSpnsrTds; */
				
				masterObj.setActualAmt(totAmt);
				masterObj.setActualTotConcn(totConcn);
				masterObj.setTotalDisc(totDisc);
				masterObj.setTotalPaid(totPaid);
				masterObj.setTotalRemain(totRemain);
				masterObj.setRefundAmt(totRefund);
				//masterObj.setTotalSonsorAmt(totalSpnsrpaid);
				masterObj.setTotalSonsorAmt(0);
					
			}else{
				
				RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
	            RegTreBillDto rtd = new RegTreBillDto();            
	            
	            if(regCon != null){
	               
	            	rtd=regCon.fetchPatientsRecordByTreatmentId(obj.getTreatmentId());
	                rtd=rtd.getListRegTreBillDto().get(0);
	                rtd.getPatientName();
	                
	                obj.setSponsorCatId(rtd.getSourceTypeId()); 
	            }			                
				
				String sql="";
				double ipdRefund=0;
				double totAmt=0,totConcn=0,totDisc=0,totPaid=0,totRemain=0,totRefund=0;
				
				if(callFrom.equals("opd")){
					
					if(obj.getSponsorCatId()>0){
						
						sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn FROM ivf_ehat_bill_details where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" ";
					}else{
						
						sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn FROM ivf_ehat_bill_details where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" ";
					}
				}else{
					
					if(obj.getSponsorCatId()>0){
						
						sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn,service_id FROM ivf_ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+"  ";
					}else{
						
						sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn,service_id FROM ivf_ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+"  ";
					}
				}					
				
				Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
				for(Map<String, Object> row : listBillDetails){
					
					totAmt=(Double)row.get("totAmt");
					totConcn=(Double)row.get("totConcn");					
				}
				
				if(callFrom.equals("opd")){
					
					sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
							"ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ivf_ehat_receipt_master where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and against_id=0 ";
					
				}else{
					
					sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
							"ifnull(sum(total_remain),0) as totRemain FROM ivf_ehat_receipt_master_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and against_id=0 ";
					
					String sqlRef="select ifnull(sum(total_paid),0) from ivf_ehat_refund_master_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" ";
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
					ipdRefund =(Double) refQuery.uniqueResult();
				}
					
				
				Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listRec = recQuery.list();
				for(Map<String, Object> row : listRec){
					
					totDisc=(Double)row.get("totDisc");
					totPaid=(Double)row.get("totPaid");			
					totRemain=(Double)row.get("totRemain");	
					
					if(callFrom.equals("opd")){
						
						totRefund=(Double)row.get("totRefund");	
					
					}else{
						
						totRefund=ipdRefund;					
					}
				}
				
				double totalSpnsrpaid = 0;
				/*sql="select ifnull(sum(total_paid),0) FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrpaid =(Double) spQuery.uniqueResult();
				
				sql="select ifnull(sum(discount),0) FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrCon =(Double) conQuery.uniqueResult();
				
				sql="select ifnull(sum(total_tds),0) FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query tdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrTds =(Double) tdsQuery.uniqueResult();
				
				sql="select ifnull(sum(paid_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrpaid =(Double) spQuery.uniqueResult();
				
				sql="select ifnull(sum(concession),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrCon =(Double) conQuery.uniqueResult();
				
				sql="select ifnull(sum(tds_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query tdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrTds =(Double) tdsQuery.uniqueResult(); */
							
				//totalSpnsrpaid = totalSpnsrpaid - totPaid;
				//totalSpnsrCon = totalSpnsrCon - totDisc;
				
				//totalSpnsrpaid = totalSpnsrpaid + totalSpnsrCon + totalSpnsrTds;
				
				double remain=(totAmt)-(totDisc+totPaid+totConcn+totalSpnsrpaid);	
				
				masterObj.setActualAmt(totAmt);
				masterObj.setActualTotConcn(totConcn);
				masterObj.setTotalDisc(totDisc);
				masterObj.setTotalPaid(totPaid);
				masterObj.setTotalRemain(remain);
				masterObj.setRefundAmt(totRefund);
				//masterObj.setTotalSonsorAmt(totalSpnsrpaid);
			}			
					
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return masterObj;
	}
	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	public synchronized int getCurrentRecId(String tblName,Session session,Integer deptId){
			
		int maxId=0;
		
		try {
			
			String sqlRef="select ifnull(max(receipt_count),0) from "+tblName+" where department_id="+deptId;
			Query refQuery = session.createSQLQuery(sqlRef);
			maxId = ((Number)refQuery.uniqueResult()).intValue();
		}catch (Exception e) {
			
			e.printStackTrace();			
			return 0;
		}
		return (maxId+1);
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@SuppressWarnings("unchecked")
	public synchronized int saveBillDetails(String masterIdsChecked,String servIdsChecked,Integer refDocId,IvfBillReceiptMasterDTO billRecMaster,String multiPayDetails){	
		
		Integer maxReceiptId=0;		
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
		
		String sqlBill="select department_id FROM ehat_treatment where treatment_id="+billRecMaster.getTreatmentId();
		Query deptQuery = session.createSQLQuery(sqlBill);		
		Integer deptId = (Integer) deptQuery.uniqueResult();
		
		int curRecId=getCurrentRecId("ivf_ehat_receipt_master",session,deptId);
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		int cmnAdvcPaymodeId =Integer.parseInt(resourceBundle.getObject("cmnAdvcPaymodeId").toString());
		int creditPaymodeId =Integer.parseInt(resourceBundle.getObject("creditPaymodeId").toString());
				
		int cmdchk=0;
		Double totComAdvcNew =0.0;
		try {
			MultiBillReceiptMasterDTO billDto = (MultiBillReceiptMasterDTO) ConfigUIJSONUtility
		            .getObjectFromJSON(multiPayDetails, MultiBillReceiptMasterDTO.class);		
					
			int billId=0,patientId=0,departId=0,sourceTypeId=0,lastCredit=0,distributeFlag=0;
			double totAmt=0,totDisc=0,totQty=0;	
			
			String doctorIds="",compName="";
			List<IvfBillReceiptSlaveDTO> listBillReceiptSlave=new ArrayList<IvfBillReceiptSlaveDTO>();
			
			IvfBillReceiptMasterDTO billMaster = new IvfBillReceiptMasterDTO();
			
			ArrayList<Integer> masterChecked=new ArrayList<Integer>();			
			String[] mstIds;
			ArrayList<Integer> slaveChecked=new ArrayList<Integer>();			
			String[] servIds;
						
			// get checked service masters
			if(masterIdsChecked.length()>0){
				
				mstIds=masterIdsChecked.split(",");
				for(String id:mstIds){
					
					masterChecked.add(Integer.parseInt(id));					
				}
			}
			// get checked service slaves
			if(servIdsChecked.length()>0){
				
				servIds=servIdsChecked.split(",");
				for(String id:servIds){
					
					slaveChecked.add(Integer.parseInt(id));					
				}
			}			
		
			Criteria criteriaRec = session.createCriteria(IvfBillReceiptMasterDTO.class);			
			criteriaRec.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));	
			criteriaRec.setProjection(Projections.rowCount());			
			
			long count = (Long)criteriaRec.uniqueResult();
			
			Integer pid=0;
			if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
				pid =(Integer) sessionFactory.getCurrentSession().createSQLQuery("SELECT patient_id FROM patient_records_details where treatment_id='"+ billRecMaster.getTreatmentId()+"'").uniqueResult();
           if (pid==null){
        	   pid=0;
           }
				Criteria criteria = session.createCriteria(CommonadvDto.class);
				criteria.add(Restrictions.eq("patient_ID", pid));

		    	criteria.add(Restrictions.eq("deleted", "N"));
		    	criteria.setProjection(Projections.sum("remaining_amnt"));
		    	totComAdvcNew	 = (Double) criteria.uniqueResult();
		    	 //chk by cadvacned for patien is null or noamount 	
		    	if( totComAdvcNew==null   ){
		    		cmdchk =-2;//no amount
		    		maxReceiptId  =-2;//no amount
			}else if(totComAdvcNew==0.0 ){

	    		cmdchk =-2;//no amount
	    		maxReceiptId  =-2;//no amount
		
			}else if(totComAdvcNew==0){

	    		cmdchk =-2;//no amount
	    		maxReceiptId  =-2;//no amount
		
			}else
		//end
		    	if(totComAdvcNew<billRecMaster.getTotalPaid()){
		    		
		    		cmdchk =-2;//no amount
		    		maxReceiptId  =-2;//no amount
		    		
		    	}
			}			
			
			if(billRecMaster.getPayMode() == creditPaymodeId){
				
				billRecMaster.setTotalRemain(billRecMaster.getTotalPaid());
				billRecMaster.setTotalPaid(0);
			}
			
			
		//chk coomanadv is applible or not	
			if(cmdchk != -2){
				if(count > 0 && billRecMaster.getAgainstId() > 0){
					
					Criteria criteriaRecDetails = session.createCriteria(IvfBillReceiptMasterDTO.class);			
					criteriaRecDetails.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));					
					criteriaRecDetails.add(Restrictions.eq("billReceiptId", billRecMaster.getAgainstId()));	
					
					List<IvfBillReceiptMasterDTO> listRecDetails = (List<IvfBillReceiptMasterDTO>) criteriaRecDetails.list();
					for(IvfBillReceiptMasterDTO obj:listRecDetails){
											
						// set receipt master 	
						billMaster.setReceiptCount(curRecId);
						billMaster.setUnitId(obj.getUnitId());
						billMaster.setTreatmentId(obj.getTreatmentId());
						billMaster.setPatientId(obj.getPatientId());
						billMaster.setBillId(obj.getBillId());				
						billMaster.setDepartmentId(obj.getDepartmentId());
						billMaster.setReceiptOf(billRecMaster.getReceiptOf());
						billMaster.setCreatedBy(billRecMaster.getCreatedBy());
						billMaster.setCreatedDateTime(new Date());
						billMaster.setSourceTypeId(sourceTypeId);
						billMaster.setDeleted("N");
						billMaster.setPayMode(billRecMaster.getPayMode());
						billMaster.setbNumber(billRecMaster.getbNumber());
						billMaster.setbName(billRecMaster.getbName());	
						billMaster.setBatchNumber(billRecMaster.getBatchNumber());
												
						billMaster.setTotalAmt(billRecMaster.getTotalAmt());							
						billMaster.setDiscGivenBy(billRecMaster.getDiscGivenBy());
						billMaster.setDiscNarrtn(billRecMaster.getDiscNarrtn());
						billMaster.setDiscRemark(billRecMaster.getDiscRemark());
						billMaster.setTotalQty(1);
						billMaster.setTotalPaid(billRecMaster.getTotalPaid());// payable
						billMaster.setAccountStatusOpdDiagno("N");		
						// for profees
						totAmt=billRecMaster.getTotalAmt();
						billMaster.setActualAmt(totAmt);
						billMaster.setActualTotConcn(totDisc);
						if(totDisc>0){
							
							billMaster.setActualConPer((totDisc*100)/totAmt);
						}else{
							
							billMaster.setActualConPer(0);
						}
						
						billMaster.setActualPayable(totAmt-totDisc);
						billMaster.setActualDiscPer(billRecMaster.getTotalDisc());
						
						double payable=0;
						double amt=0;
						if(billRecMaster.getTotalDisc()>0){
							
							/*amt=((totAmt-totDisc)*billRecMaster.getTotalDisc())/100;
							payable=totAmt-(totDisc+amt);*/
							payable=totAmt-(totDisc+billRecMaster.getFirstDisc());
							billMaster.setTotalDisc(billRecMaster.getFirstDisc());
						}else{
							
							payable=(totAmt-totDisc);
							billMaster.setTotalDisc(0);
						}								
						billMaster.setPayable(payable);							
						billMaster.setTotalRemain(payable-(billRecMaster.getTotalPaid()));
							
						billMaster.setAgainstId(obj.getBillReceiptId());
						billMaster.setSourceTypeId(billRecMaster.getSourceTypeId());
						billMaster.setSponsorCatId(billRecMaster.getSponsorCatId());
						
						billMaster.setPayeeTypeId(billRecMaster.getPayeeTypeId());
						billMaster.setPayeeMainId(billRecMaster.getPayeeMainId());
						billMaster.setPayeeLeafId(billRecMaster.getPayeeLeafId());
						
						if(billMaster.getTotalRemain()>0){
							
							billMaster.setReceiptStatus("unpaid");
														
						}else{
							
							billMaster.setReceiptStatus("paid");
							lastCredit=1;
						
						}
						
						billMaster.setFirstPaid(billRecMaster.getTotalPaid());
						billMaster.setFirstDisc(billRecMaster.getFirstDisc());
						billMaster.setFirstRemain(payable-billRecMaster.getTotalPaid());
												
						// update credit flag of receipt which is against id
						IvfBillReceiptMasterDTO objectToUpdate = (IvfBillReceiptMasterDTO) session.get(IvfBillReceiptMasterDTO.class, billRecMaster.getAgainstId());
						objectToUpdate.setCreditFlag("Y");
												
						// Save Master list
						session.merge(billMaster);
											 
						// set receipt slave
						IvfBillReceiptSlaveDTO slave = new IvfBillReceiptSlaveDTO();
						slave.setUnitId(billRecMaster.getUnitId());				
						slave.setTreatmentId(billRecMaster.getTreatmentId());
						slave.setPatientId(obj.getPatientId());
						slave.setBillId(obj.getBillId());						
						slave.setDepartmentId(obj.getDepartmentId());
						slave.setCreatedBy(billRecMaster.getCreatedBy());
						slave.setCreatedDateTime(new Date());
						
						// to get only date from dateTime
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
						Date assignDate = sdf.parse(sdf.format(new Date()));
						patientId = obj.getPatientId();
						slave.setServiceAssignDate(assignDate);					
						slave.setSourceTypeId(billRecMaster.getSponsorCatId());
						slave.setDoctorId(0);
						slave.setServiceId(0);
						slave.setSubServiceId(0);						
						slave.setRate(obj.getTotalRemain());
						slave.setAmount(obj.getTotalRemain());
						slave.setDiscount(billRecMaster.getTotalDisc());
						slave.setQuantity(1);
						slave.setPaid(billRecMaster.getTotalPaid());
						slave.setRemain(0);
											
						// for profees						
						slave.setActualDiscPer(billRecMaster.getTotalDisc());	
						slave.setActualAmt(obj.getTotalRemain());
						slave.setActualPayable(obj.getTotalRemain());
						double disc=((obj.getTotalRemain())*billRecMaster.getTotalDisc())/100;
						slave.setActualDiscAmt(disc);
						slave.setActualFinalPayable((obj.getTotalRemain())-disc);
						slave.setActualFinalPaid((obj.getTotalRemain())-disc);
						// for profees											
					
						slave.setCompName(obj.getReceiptCount().toString());	
						slave.setAgainstId(obj.getReceiptCount());	
						listBillReceiptSlave.add(slave);					
					}
									
					// Get max master id
					Criteria criteriaMax = session.createCriteria(IvfBillReceiptMasterDTO.class).setProjection(Projections.max("billReceiptId"));
					maxReceiptId = (Integer) criteriaMax.uniqueResult();
					
					if (maxReceiptId == null) {
			
						maxReceiptId = 0;
					}				
				
					// Calling stored procedure for get super master of receipt
					Query query2 = session.createSQLQuery("CALL fetchIvfSuperReceiptId (:receiptId)").setParameter("receiptId", maxReceiptId);
					Integer superRecId = (Integer) query2.uniqueResult();
												
					// Set all credit receipts status paid if remain 0
					if(lastCredit==1){
											
						// Calling stored procedure
						Query query = session.createSQLQuery("CALL fetchIvfCreditReceiptIds (:receiptId)").setParameter("receiptId", maxReceiptId);
						String result = (String) query.uniqueResult();
						String[] creditIds = result.split(",");
			
						for (int i = 0; i < creditIds.length; i++) {
							
							IvfBillReceiptMasterDTO objectToUp = (IvfBillReceiptMasterDTO) session.get(IvfBillReceiptMasterDTO.class, Integer.parseInt(creditIds[i]));
							objectToUp.setReceiptStatus("paid");								
						}										
			
						IvfBillReceiptMasterDTO objectToUp = (IvfBillReceiptMasterDTO) session.get(IvfBillReceiptMasterDTO.class, superRecId);
						objectToUp.setTotalRemain(0);				
						objectToUp.setTotalPaid(objectToUp.getTotalAmt());		
						
					}				
						
					// Query for get details amounts of super master
					double actualTotalAmt=0;
					double actualTotalPaid=0;
					double actualTotalDisc=0;
					double actualTotalCon=0;
					double actualTotalRefund=0;
					List<IvfBillReceiptSlaveDTO> lstRecSlave=new ArrayList<IvfBillReceiptSlaveDTO>();
					String sql2="select actual_amt,total_paid,total_discount,actual_tot_concn from ivf_ehat_receipt_master where bill_receipt_id="+superRecId+" "; 
					SQLQuery getMaster = session.createSQLQuery(sql2);
					getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
					List<Map<String, Object>> masterRow = getMaster.list();
				          
				    for(Map<String, Object> row : masterRow){
			    		
				    	actualTotalAmt=(Double)row.get("actual_amt");
				    	actualTotalPaid=(Double)row.get("total_paid");
				    	actualTotalDisc=(Double)row.get("total_discount");
				    	actualTotalCon=(Double)row.get("actual_tot_concn");
				    	//actualTotalRefund=(Double)row.get("refund_amt");
			    	}
				    				    
				    String sql3="select bill_details_id,actual_amt from ivf_ehat_receipt_slave where bill_receipt_master_id="+superRecId+" "; 
					SQLQuery getSlave = session.createSQLQuery(sql3);
					getSlave.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			  
					List<Map<String, Object>> lstSlave = getSlave.list();
				          
				    for(Map<String, Object> row : lstSlave){
			    		
				    	IvfBillReceiptSlaveDTO obj=new IvfBillReceiptSlaveDTO();
				    	obj.setBillDetailsId((Integer)row.get("bill_details_id"));
				    	obj.setActualAmt((Double)row.get("actual_amt"));			    	
				    	lstRecSlave.add(obj);
				    	obj=null;
			    	}			    
				   	    
				    double actualTotRemain=actualTotalAmt-(actualTotalPaid+billRecMaster.getTotalPaid()+actualTotalDisc+billMaster.getTotalDisc()+actualTotalCon);
				    
					IvfBillReceiptMasterDTO objectToUp = (IvfBillReceiptMasterDTO) session.get(IvfBillReceiptMasterDTO.class, superRecId);
					objectToUp.setTotalDisc(actualTotalDisc+billMaster.getTotalDisc());			
					objectToUp.setTotalRemain(actualTotRemain);				
					objectToUp.setTotalPaid(actualTotalPaid+billRecMaster.getTotalPaid());	
					
					distributeFlag=1;
					
				}else{			
					
					int depId=1;
					int unitId=billRecMaster.getUnitId();
					
					ArrayList<Integer> sIds11=new ArrayList<Integer>();
			      	String[] servIds1 = null;
					String servIds2=null;
					String sql2="select IFEMPTY(service_id, '0') as service_id from users where User_ID="+billRecMaster.getCreatedBy()+" and " 
				 			+ "(dept_id = "+depId+" OR dept_id LIKE '"+depId+",%' OR dept_id LIKE '%,"+depId+",%' OR dept_id LIKE '%,"+depId+"') and " 
				 			+ "(unitmaster_id = "+unitId+" OR unitmaster_id LIKE '"+unitId+",%' OR unitmaster_id LIKE '%,"+unitId+",%' OR unitmaster_id LIKE '%,"+unitId+"')"; 
			        SQLQuery query2 = session.createSQLQuery(sql2);
			        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);	           
					List<Map<String, Object>> data2 = query2.list();
			      
			        if(query2.list().isEmpty()){
			            	
			        }else{
			            	
			        	for(Map<String, Object> row : data2){
			        		servIds2=(String)row.get("service_id");
			        	}
			         
			        	if(servIds2.length()>0){
			        		servIds1=servIds2.split(",");
			        		for(String id:servIds1){
			        			
			        			if(masterChecked.contains(Integer.parseInt(id))){
			        				
			        				sIds11.add(Integer.parseInt(id));
			        			}			        			
			        		}
			        	}  
			        }   
					
			        ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
					String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
					String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
					int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
					int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
					
			        ArrayList<Integer> excludeServicesIds = new ArrayList<Integer>();
			        excludeServicesIds.add(-5);
			        excludeServicesIds.add(pharmacyInvoice);
			        excludeServicesIds.add(pharmacyServId);
			        
					Criteria criteria = session.createCriteria(BillDetailsDto.class);			
					criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));	
					criteria.add(Restrictions.eq("cancle", "N"));
					criteria.add(Restrictions.eq("ivfTreatFlag", "Y"));
					criteria.add(Restrictions.eq("deleted", "N"));
					criteria.add(Restrictions.eq("paidFlag", "N"));
					criteria.add(Restrictions.not(Restrictions.in("serviceId", excludeServicesIds)));
										
					if(billRecMaster.getPaidByCashFlag().equals("Y")){
						
						if(sIds11.size()==0){
							
							slaveChecked.add(billRecMaster.getBulkMstId());
							
						}else{
							
							if(!sIds11.contains(1)){
								
								slaveChecked.add(billRecMaster.getBulkMstId());											
							}
						}	
						
						if(slaveChecked.size()!=0){
							
							criteria.add(Restrictions.in("billDetailsId", slaveChecked));
						}
						
					}else{
						
						if(sIds11.size()==0){
							
							slaveChecked.add(billRecMaster.getBulkMstId());
							
						}else{
							
							if(!sIds11.contains(1)){
								
								slaveChecked.add(billRecMaster.getBulkMstId());											
							}
						}				
											
						if(slaveChecked.size()!=0){
							
							criteria.add(Restrictions.not(Restrictions.in("billDetailsId", slaveChecked)));
						}
					}
						
					
					List<BillDetailsDto> listBillDetails = (List<BillDetailsDto>) criteria.list();		
					
					int mstChrgSlaveId=billRecMaster.getSponsorCatId();
										
					for(BillDetailsDto billSlave:listBillDetails){
						
						int slaveChrgSlaveId = billSlave.getChargesSlaveId();
						
						if(mstChrgSlaveId == slaveChrgSlaveId){
				
							departId	= billSlave.getDepartmentId();
							billId		= billSlave.getBillId();
							patientId	= billSlave.getPatienttId();
							if(billRecMaster.getReceiptOf().equals("sponsor")){
								
								totAmt		= totAmt+billSlave.getOtherAmount();
								totDisc		= totDisc+billSlave.getOtherConcession();
								
							}else{
								
								totAmt		= totAmt+billSlave.getAmount();
								totDisc		= totDisc+billSlave.getConcession();						
							}
							totQty		= totQty+billSlave.getQuantity();			
							sourceTypeId= billSlave.getSourceTypeId();
							if(billSlave.getServiceId()==2){
								
								doctorIds 	= doctorIds+billSlave.getDoctorId()+",";
							}		
							
							// set receipt slave 
							IvfBillReceiptSlaveDTO slave=new IvfBillReceiptSlaveDTO();
							slave.setUnitId(billRecMaster.getUnitId());				
							slave.setTreatmentId(billRecMaster.getTreatmentId());
							slave.setPatientId(patientId);
							slave.setBillId(billId);						
							slave.setDepartmentId(departId);
							slave.setSourceTypeId(billSlave.getChargesSlaveId());
							
							// for profees
							slave.setActualConcnPer(billSlave.getConcessionOnPerc());
							slave.setActualDiscPer(billRecMaster.getTotalDisc());				
							// for profees
							
							if(billRecMaster.getReceiptOf().equals("sponsor")){
																	
								slave.setRate(billSlave.getOtherRate());
								slave.setAmount(billSlave.getOtherAmount());
								slave.setConcession(billSlave.getOtherConcession());	
								slave.setPaid(billSlave.getOtherAmount()-billSlave.getOtherConcession());
								
								// for profees
								slave.setActualAmt(billSlave.getOtherAmount());			
								slave.setActualConcnAmt(billSlave.getOtherConcession());
								slave.setActualPayable(billSlave.getOtherAmount()-billSlave.getOtherConcession());	
								double disc=((billSlave.getOtherAmount()-billSlave.getOtherConcession())*billRecMaster.getTotalDisc())/100;
								slave.setActualDiscAmt(disc);
								slave.setActualFinalPayable((billSlave.getOtherAmount()-billSlave.getOtherConcession())-disc);
								slave.setActualFinalPaid((billSlave.getOtherAmount()-billSlave.getOtherConcession())-disc);
								// for profees
							}else{
														
								slave.setRate(billSlave.getRate());
								slave.setAmount(billSlave.getAmount());
								slave.setConcession(billSlave.getConcession());						
								slave.setPaid(billSlave.getAmount()-billSlave.getConcession());							
								
								// for profees
								slave.setActualAmt(billSlave.getAmount());
								slave.setActualConcnAmt(billSlave.getConcession());	
								slave.setActualPayable(billSlave.getAmount()-billSlave.getConcession());
								double disc=((billSlave.getAmount()-billSlave.getConcession())*billRecMaster.getTotalDisc())/100;
								slave.setActualDiscAmt(disc);
								slave.setActualFinalPayable((billSlave.getAmount()-billSlave.getConcession())-disc);
								slave.setActualFinalPaid((billSlave.getAmount()-billSlave.getConcession())-disc);
								// for profees
							}
											
							slave.setQuantity(billSlave.getQuantity());
							//slave.setRemain(0);
							slave.setCreatedBy(billRecMaster.getCreatedBy());
							slave.setCreatedDateTime(new Date());
							
							// to get only date from dateTime
							SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
							Date assignDate = sdf.parse(sdf.format(billSlave.getCreatedDateTime()));
				
							slave.setServiceAssignDate(assignDate);
							//slave.setSourceTypeId(billRecMaster.getSourceTypeId());					
							slave.setDoctorId(billSlave.getDoctorId());
							slave.setServiceId(billSlave.getServiceId());
							slave.setSubServiceId(billSlave.getSubServiceId());
							slave.setConcession(billSlave.getConcession());
							slave.setBillDetailsId(billSlave.getBillDetailsId());
							
							if(slave.getServiceId()==1){
								
								compName="Registration Charges";
								
							}else{
								
								Criteria criteriaCompName = session.createCriteria(SubServiceDto.class);			
								criteriaCompName.add(Restrictions.eq("subId", billSlave.getSubServiceId()));	
								criteriaCompName.add(Restrictions.eq("deleted", "N"));
								List<SubServiceDto> listCompNames = (List<SubServiceDto>) criteriaCompName.list();
								for(SubServiceDto bojComp:listCompNames){
									
									compName=bojComp.getCategoryName();
								}
							}
							
							slave.setCompName(compName);
							listBillReceiptSlave.add(slave);
							slave=null;	
							
						}
					}
					
					// set receipt master 		
					billMaster.setReceiptCount(curRecId);
					billMaster.setUnitId(billRecMaster.getUnitId());
					billMaster.setTreatmentId(billRecMaster.getTreatmentId());
					billMaster.setPatientId(patientId);
					billMaster.setBillId(billId);				
					billMaster.setDepartmentId(departId);
					billMaster.setReceiptOf(billRecMaster.getReceiptOf());				
					billMaster.setTotalAmt(totAmt-totDisc);				
					billMaster.setDiscGivenBy(billRecMaster.getDiscGivenBy());
					billMaster.setDiscNarrtn(billRecMaster.getDiscNarrtn());
					billMaster.setDiscRemark(billRecMaster.getDiscRemark());
					billMaster.setTotalQty(totQty);
					billMaster.setTotalPaid(billRecMaster.getTotalPaid());								
					billMaster.setCreatedBy(billRecMaster.getCreatedBy());
					billMaster.setCreatedDateTime(new Date());			
					billMaster.setDeleted("N");
					billMaster.setPayMode(billRecMaster.getPayMode());
					billMaster.setbNumber(billRecMaster.getbNumber());
					billMaster.setbName(billRecMaster.getbName());
					billMaster.setBatchNumber(billRecMaster.getBatchNumber());	
					billMaster.setSourceTypeId(billRecMaster.getSourceTypeId());
					billMaster.setSponsorCatId(billRecMaster.getSponsorCatId());
					
					billMaster.setPayeeTypeId(billRecMaster.getPayeeTypeId());
					billMaster.setPayeeMainId(billRecMaster.getPayeeMainId());
					billMaster.setPayeeLeafId(billRecMaster.getPayeeLeafId());
					
					// for profees
					billMaster.setActualAmt(totAmt);
					billMaster.setActualTotConcn(totDisc);
					if(totDisc>0){
						
						billMaster.setActualConPer((totDisc*100)/totAmt);
					}else{
						
						billMaster.setActualConPer(0);
					}
					
					billMaster.setActualPayable(totAmt-totDisc);
					billMaster.setActualDiscPer(billRecMaster.getTotalDisc());
					
					double payable=0;
					double amt=0;
					if(billRecMaster.getTotalDisc()>0){
						
						/*amt=((totAmt-totDisc)*billRecMaster.getTotalDisc())/100;
						payable=totAmt-(totDisc+amt);*/
						payable=totAmt-(totDisc+billRecMaster.getFirstDisc());
						billMaster.setTotalDisc(billRecMaster.getFirstDisc());
					}else{
						
						payable=(totAmt-totDisc);
						billMaster.setTotalDisc(0);
					}								
					billMaster.setPayable(payable);
					
					billMaster.setTotalRemain(payable-billRecMaster.getTotalPaid());
					// for profees				
					
					if(billMaster.getTotalRemain()>0){
						
						billMaster.setReceiptStatus("unpaid");
						distributeFlag=1;
					}else{
						
						billMaster.setReceiptStatus("paid");
					}	
					
					billMaster.setFirstPaid(billRecMaster.getTotalPaid());
					billMaster.setFirstDisc(billRecMaster.getFirstDisc());
					billMaster.setFirstRemain(payable-billRecMaster.getTotalPaid());
					
					billMaster.setPaidByCashFlag(billRecMaster.getPaidByCashFlag());		
					billMaster.setPaidByCashServices(billRecMaster.getPaidByCashServices());
					
					// Save Master list
					session.merge(billMaster);	
												
				}
				
				// Get max master id
				Criteria criteriaMax = session.createCriteria(IvfBillReceiptMasterDTO.class)
						.setProjection(Projections.max("billReceiptId"));
				maxReceiptId = (Integer) criteriaMax.uniqueResult();
				if (maxReceiptId == null) {
			
					maxReceiptId = 0;
				}		
				
				
				int multiPaymodeId =Integer.parseInt(resourceBundle.getObject("multiPaymodeId").toString());
				
				// Save Multiple pay mode list
				if(billRecMaster.getPayMode()==multiPaymodeId){
					
					saveMultiPayMode(maxReceiptId,billMaster,billDto.getListMultiBillReceiptMaster(),session);
				}			
			
				// Save Multiple pay mode list
				if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
									
						if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
							Criteria criteria1 = session.createCriteria(CommonadvDto.class);
							criteria1.add(Restrictions.eq("patient_ID", patientId));
							criteria1.add(Restrictions.eq("paidflag", "N"));
					    	criteria1.add(Restrictions.eq("deleted", "N"));
					    	criteria1.addOrder(Order.asc("commonadv_id"));
					    	List<CommonadvDto> listcdav	 = criteria1.list();
							String hql = "UPDATE CommonadvDto set  deduct_amnt  =:deamt ,remaining_amnt  =:reamt ,paidflag =:paidflag WHERE patient_ID =:pid and  commonadv_id =:cadid ";

					    	Query query = session.createQuery(hql);
							int pay=0;
							double paodamount=billRecMaster.getTotalPaid();
					    	for(CommonadvDto cd: listcdav){
					    		
					    	double camunt =	cd.getRemaining_amnt();
					    	
					    	if(camunt != 0.0 || camunt != 0){

					    		if(camunt < paodamount){
					    			ComAdvbifergationDto cadvbi = new ComAdvbifergationDto();
										
					    			paodamount =	paodamount - camunt;//00
					    			double deamt = camunt + cd.getDeduct_amnt();
					    			query.setParameter("deamt",deamt); 
					    			query.setParameter("reamt",0.0); 
					    			query.setParameter("paidflag", "Y");
								//	query.setParameter("trid",billRecMaster.getTreatmentId());
					    			query.setParameter("pid",patientId);
                        			query.setParameter("cadid", cd.getCommonadv_id());
									
									query.executeUpdate();
									
									cadvbi.setAmount(camunt);
									cadvbi.setCadvid( cd.getCommonadv_id());
									cadvbi.setReceipt_id(maxReceiptId);
									
									session.merge(cadvbi);
					    		}else{
					    			if(pay==0){
					    				ComAdvbifergationDto cadvbi = new ComAdvbifergationDto();
										
						    			double deamt=paodamount;
						    			paodamount = camunt - paodamount;//
						    			
						    			query.setParameter("deamt",(deamt + cd.getDeduct_amnt())); 
						    			query.setParameter("reamt",paodamount);
						    			query.setParameter("paidflag", "N");  
									//	query.setParameter("trid",billRecMaster.getTreatmentId());  
						    			query.setParameter("pid",patientId);
						    			query.setParameter("cadid", cd.getCommonadv_id());
										query.executeUpdate();
										cadvbi.setAmount(deamt);
										cadvbi.setCadvid(cd.getCommonadv_id());
										cadvbi.setReceipt_id(maxReceiptId);
										
								    	session.merge(cadvbi);
								    	pay=1;
								    //	break;
					    			}
					    		}
					    	}
					    }
					}
				}						
				
				// Save Slave list
				getSlaveList(maxReceiptId,billRecMaster.getAgainstId(),listBillReceiptSlave,session,billRecMaster.getSponsorCatId());
				
				// Distrubute paid amount of slave of remain > 0
				//if(distributeFlag==1){
							
				if(billRecMaster.getPaidByCashFlag().equals("N")){
				
					//setOpdRecMasterSlave(maxReceiptId,billRecMaster.getAgainstId(),"paid",session);
				}
					
					//distributePaidBySlave(maxReceiptId, listBillReceiptSlave, totAmt, billRecMaster.getTotalPaid(),session);
				//}	
			}
				
			session.getTransaction().commit(); // commit the transaction
			session.close();
			
			// Set bill master totals
			if(billRecMaster.getPaidByCashFlag().equals("N")){
				
				//setBillMasterTotalsForOpd(billRecMaster.getTreatmentId());
				//setMultiSponsorTotalsForOpd(billRecMaster);
			}else{
				
				if(billRecMaster.getPaidByCashFlag().equals("Y")){
					
					ArrayList<Integer> alPaid=new ArrayList<Integer>();
					String[] cashIds = null;
					// get checked service masters
					if(billRecMaster.getPaidByCashServices().length()>0){
						
						if(billRecMaster.getPaidByCashServices().contains(",")){
							
							cashIds=billRecMaster.getPaidByCashServices().split(",");
							for(String id:cashIds){
								
								alPaid.add(Integer.parseInt(id));
								// Update amount in multiSponsor start
								String hqlForMultiSponsr = "UPDATE BillDetailsDto set paidByCashFlag =:paidByCashFlag WHERE billDetailsId =:billDetailsId";
								Query queryForMultiSponsr = sessionFactory.getCurrentSession().createQuery(hqlForMultiSponsr);
								queryForMultiSponsr.setParameter("paidByCashFlag","Y");  
								queryForMultiSponsr.setParameter("billDetailsId",Integer.parseInt(id));  						
								queryForMultiSponsr.executeUpdate();	
							}
						}else{
							
							alPaid.add(Integer.parseInt(billRecMaster.getPaidByCashServices()));
							// Update amount in multiSponsor start
							String hqlForMultiSponsr = "UPDATE BillDetailsDto set paidByCashFlag =:paidByCashFlag WHERE billDetailsId =:billDetailsId";
							Query queryForMultiSponsr = sessionFactory.getCurrentSession().createQuery(hqlForMultiSponsr);
							queryForMultiSponsr.setParameter("paidByCashFlag","Y");  
							queryForMultiSponsr.setParameter("billDetailsId",Integer.parseInt(billRecMaster.getPaidByCashServices()));  						
							queryForMultiSponsr.executeUpdate();	
						}							
					}										
				}
			}			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			session.getTransaction().rollback();
			return 0;
		}
		
		return maxReceiptId;		
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 12-July-2017
	* @codeFor	: Save Refund bill details
	 ************/
	@SuppressWarnings("unchecked")
	public int saveRefundBillDetails(String servIdsChecked,Integer refDocId,IvfBillReceiptMasterDTO billRecMaster){	
			
		Integer result=0;
		int againstId=billRecMaster.getAgainstId();
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
		
		String sqlBill="select department_id FROM ehat_treatment where treatment_id="+billRecMaster.getTreatmentId();
		Query deptQuery = session.createSQLQuery(sqlBill);		
		Integer deptId = (Integer) deptQuery.uniqueResult();
		
		int curRecId=getCurrentRecId("ivf_ehat_refund_master",session,deptId);
		try {
				
			int billId=0,patientId=0,departId=0,sourceTypeId=0;			
			
			Criteria criteriaRec = session.createCriteria(IvfBillReceiptMasterDTO.class);			
			criteriaRec.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));			
			criteriaRec.setProjection(Projections.rowCount());
			long count = (Long)criteriaRec.uniqueResult();
			IvfBillRefundMasterDTO billMaster = new IvfBillRefundMasterDTO();
			if(count>0){
								
				double totalPaid=0,recPaid=0,recRefund=0,totalPayable=0,recPayable=0;
				Criteria criteriaAllDetails = session.createCriteria(IvfBillReceiptMasterDTO.class);			
				criteriaAllDetails.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));	
				List<IvfBillReceiptMasterDTO> listAllDetails = (List<IvfBillReceiptMasterDTO>) criteriaAllDetails.list();
				for(IvfBillReceiptMasterDTO obj:listAllDetails){
					
					billId=obj.getBillId();
					departId=obj.getDepartmentId();
					patientId=obj.getPatientId();
					int recId=obj.getReceiptCount();
					
					// Total paid & refund for overall
					totalPaid=totalPaid+obj.getTotalPaid();
									
					if(againstId==recId){
						
						recPaid=recPaid+obj.getTotalPaid();
					}
					
					if(againstId==recId && obj.getRefundFlag().equals("Y")){
						
						recRefund=recRefund+obj.getRefundAmt();
					}
						
					recPayable=recPaid-recRefund; // receipt wise payable
				}
				
				Criteria criteriaRef = session.createCriteria(IvfBillRefundMasterDTO.class);			
				criteriaRef.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));			
				criteriaRef.setProjection(Projections.rowCount());
				long countRef = (Long)criteriaRef.uniqueResult();
				
				if(countRef>0){
					
					Criteria criteriaSum = session.createCriteria(IvfBillRefundMasterDTO.class);			
					criteriaSum.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
					criteriaSum.setProjection(Projections.sum("totalPaid"));	
					double sumOfRefund = (Double)criteriaSum.uniqueResult();
					totalPayable=totalPaid-sumOfRefund;
				}else{
					
					totalPayable=totalPaid-0;
				}
				
				
				// Total paid & refund for receipt wise
				if(billRecMaster.getAgainstId()!=0){
					
					if(billRecMaster.getTotalPaid()<=totalPayable && billRecMaster.getTotalPaid()<=recPayable){
						
						String sql="update ivf_ehat_receipt_master set refund_flag='Y',refund_amt="+(recRefund+billRecMaster.getTotalPaid())+",reduction="+(billRecMaster.getTotalAmt()-billRecMaster.getTotalPaid())+",actual_ref_amt="+(recRefund+billRecMaster.getTotalPaid())+" where receipt_count = "+againstId;   
			            Query recMastQuery = session.createSQLQuery(sql);
			            recMastQuery.executeUpdate();  						
						
						// Make entry in refund master						
						billMaster.setRefundCount(curRecId);
						billMaster.setUnitId(billRecMaster.getUnitId());
						billMaster.setTreatmentId(billRecMaster.getTreatmentId());
						billMaster.setPatientId(patientId);
						billMaster.setBillId(billId);				
						billMaster.setDepartmentId(departId);
						billMaster.setReceiptOf(billRecMaster.getReceiptOf());
						billMaster.setCreatedBy(billRecMaster.getCreatedBy());
						billMaster.setCreatedDateTime(new Date());
						billMaster.setSourceTypeId(sourceTypeId);
						
						billMaster.setPayeeTypeId(billRecMaster.getPayeeTypeId());
						billMaster.setPayeeMainId(billRecMaster.getPayeeMainId());
						billMaster.setPayeeLeafId(billRecMaster.getPayeeLeafId());
						
						billMaster.setDeleted("N");
						billMaster.setRefundFlag("Y");
						billMaster.setPayMode(billRecMaster.getPayMode());
						billMaster.setbNumber(billRecMaster.getbNumber());
						billMaster.setBatchNumber(billRecMaster.getBatchNumber());
						billMaster.setbName(billRecMaster.getbName());
						billMaster.setTotalAmt(billRecMaster.getTotalAmt());
						billMaster.setTotalDisc(billRecMaster.getTotalDisc());
						billMaster.setTotalQty(1);
						billMaster.setTotalPaid(billRecMaster.getTotalPaid());// payable
						billMaster.setTotalRemain(billRecMaster.getTotalAmt()-(billRecMaster.getTotalPaid()+billRecMaster.getTotalDisc()));
						billMaster.setAgainstId(billRecMaster.getAgainstId());		
						
						billMaster.setRefGivenBy(billRecMaster.getRefGivenBy());		
						billMaster.setRefRemark(billRecMaster.getRefRemark());		
												
						// Save Refund Master list
						session.merge(billMaster);	
						
						// Get max master id
						Criteria criteriaMax = session.createCriteria(IvfBillRefundMasterDTO.class)
								.setProjection(Projections.max("billRefundId"));
						result = (Integer) criteriaMax.uniqueResult();
						if (result == null) {

							result = -3;
						}
						
						
					}else{
						
						result=-1;
					}					
					
				}else{
					
					if(billRecMaster.getTotalPaid()<=totalPayable){
						
						// Make entry in refund master
						billMaster.setRefundCount(curRecId);
						billMaster.setUnitId(billRecMaster.getUnitId());
						billMaster.setTreatmentId(billRecMaster.getTreatmentId());
						billMaster.setPatientId(patientId);
						billMaster.setBillId(billId);				
						billMaster.setDepartmentId(departId);
						billMaster.setReceiptOf(billRecMaster.getReceiptOf());
						billMaster.setCreatedBy(billRecMaster.getCreatedBy());
						billMaster.setCreatedDateTime(new Date());
						billMaster.setSourceTypeId(sourceTypeId);
						
						billMaster.setPayeeTypeId(billRecMaster.getPayeeTypeId());
						billMaster.setPayeeMainId(billRecMaster.getPayeeMainId());
						billMaster.setPayeeLeafId(billRecMaster.getPayeeLeafId());
						
						billMaster.setDeleted("N");
						billMaster.setRefundFlag("Y");
						billMaster.setPayMode(billRecMaster.getPayMode());
						billMaster.setbNumber(billRecMaster.getbNumber());
						billMaster.setBatchNumber(billRecMaster.getBatchNumber());
						billMaster.setbName(billRecMaster.getbName());
						billMaster.setTotalAmt(billRecMaster.getTotalAmt());
						billMaster.setTotalDisc(billRecMaster.getTotalDisc());
						billMaster.setTotalQty(1);
						billMaster.setTotalPaid(billRecMaster.getTotalPaid());// payable
						billMaster.setTotalRemain(billRecMaster.getTotalAmt()-(billRecMaster.getTotalPaid()+billRecMaster.getTotalDisc()));
						billMaster.setAgainstId(billRecMaster.getAgainstId());	
						
						billMaster.setRefGivenBy(billRecMaster.getRefGivenBy());		
						billMaster.setRefRemark(billRecMaster.getRefRemark());		
						
						// Save Refund Master list
						session.merge(billMaster);
						
						// Get max master id
						Criteria criteriaMax = session.createCriteria(IvfBillRefundMasterDTO.class)
								.setProjection(Projections.max("billRefundId"));
						result = (Integer) criteriaMax.uniqueResult();
						if (result == null) {

							result = -3;
						}
						
					}else{
						
						result=-1;
					}
				}
					
				ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				int cmnAdvcPaymodeId =Integer.parseInt(resourceBundle.getObject("cmnAdvcPaymodeId").toString());
				// Save Multiple pay mode list
				if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
					
					Criteria criteria = session.createCriteria(CommonadvDto.class);
					criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
		        	criteria.add(Restrictions.eq("deleted", "N"));
		        	criteria.setProjection(Projections.sum("commonadv_amnt"));
		        	double totComAdvc = (Double) criteria.uniqueResult();
					
					//Session session = session;
					String hql = "UPDATE CommonadvDto set commonadv_amnt =:amt WHERE treatmentId =:trid";
					Query query = session.createQuery(hql);
					
					totComAdvc=totComAdvc-billRecMaster.getTotalPaid();
					query.setParameter("amt",totComAdvc);  
					query.setParameter("trid",billRecMaster.getTreatmentId());  
					query.executeUpdate();
				}
				
			}else{
				
				result=-2;
			}	
			
			//setOpdRefMasterSlave(againstId,"refund",session);
			
			session.getTransaction().commit(); // commit the transaction					
			session.close();
			
			// Set bill master totals
			setBillMasterTotalsForOpd(billRecMaster.getTreatmentId());
			
		} catch (Exception e) {
			
			e.printStackTrace();
			session.getTransaction().rollback();
			return 0;
		}
		
		return result;		
	}
	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	public int getSlaveList(int maxId,int againstId,List<IvfBillReceiptSlaveDTO> lstSlave,Session session,int chargesSlaveId){
		try{
			List<Integer> al=new ArrayList<Integer>();
			int billId=0,treatId=0;
			String docIds="";
			
			String sqlBill="select receipt_count FROM ivf_ehat_receipt_master where bill_receipt_id="+maxId;
			Query conQuery = session.createSQLQuery(sqlBill);		
			int receiptMasterCount = (Integer) conQuery.uniqueResult();
					
			for(IvfBillReceiptSlaveDTO slave:lstSlave){
				
				int spsrId = slave.getSourceTypeId();
				if(spsrId == chargesSlaveId){
					
					slave.setBillReceiptMasterId(maxId);
					slave.setReceiptMasterCount(receiptMasterCount);
					al.add(slave.getBillDetailsId());
					session.merge(slave);		
				}						
				
				billId=slave.getBillId();
				treatId=slave.getTreatmentId();
			}	
			
			if(againstId==0){	
			
				//doctor id in opd receipt master
				Criteria criteria = session.createCriteria(IvfBillReceiptSlaveDTO.class);
				criteria.add(Restrictions.eq("treatmentId", treatId));
				criteria.add(Restrictions.eq("billId", billId));		
				criteria.add(Restrictions.eq("billReceiptMasterId", maxId));
				criteria.setProjection( Projections.distinct( Projections.property("doctorId")));			
				@SuppressWarnings("unchecked")
				List<Integer> listDocs = (List<Integer>) criteria.list();
				for(Integer id:listDocs){
					
					docIds=docIds+id+",";
				}
				
				String exactDoctIds=docIds.substring(0,docIds.length());
				
				IvfBillReceiptMasterDTO objMaster = (IvfBillReceiptMasterDTO) session.get(IvfBillReceiptMasterDTO.class, maxId);
				objMaster.setDoctorIds(exactDoctIds);
				
				for(int id:al){
					
					BillDetailsDto objectToUpdate = (BillDetailsDto) session.get(BillDetailsDto.class, id);
					objectToUpdate.setPaidFlag("Y");				
				}
			}
			
		}catch (Exception e) {
			
			e.printStackTrace();
			return 0;
		}				
		return 1;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Get bill receipt details
	 ************/
	public IvfBillReceiptMasterDTO getBillReceiptDetails(IvfBillReceiptMasterDTO billRecMaster,String callFrom){	
					
		try {
			IvfBillReceiptMasterDTO billReceiptMasterObj=new IvfBillReceiptMasterDTO();
			List<IvfBillReceiptMasterDTO> blist = new ArrayList<IvfBillReceiptMasterDTO>();
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfBillReceiptMasterDTO.class);			

			if(callFrom.equals("console")){
				
				List<TreatmentDto> lstTreatDto = billRecMaster.getListTreatDto();
				List<Integer> treatIds=new ArrayList<Integer>();
				treatIds.add(0);
				int cashPaidSpId=0;
				for(TreatmentDto dto:lstTreatDto){
					
					treatIds.add(dto.getTreatmentId());
					cashPaidSpId =  dto.getCount();
				}
								
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.in("treatmentId", treatIds));
				if(cashPaidSpId == -10){
					
					criteria.add(Restrictions.eq("paidByCashFlag", "Y"));
				}else{
					
					criteria.add(Restrictions.eq("paidByCashFlag", "N"));
				}				
				criteria.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));
				if(billRecMaster.getSponsorCatId() > 0){
					
					criteria.add(Restrictions.eq("sponsorCatId", billRecMaster.getSponsorCatId()));	
				}
				
			}else{
				
				criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				if(billRecMaster.getSponsorCatId() > 0){
					
					criteria.add(Restrictions.eq("sponsorCatId", billRecMaster.getSponsorCatId()));	
				}
				//Added by Vinod 
				int userId=billRecMaster.getCreatedBy();
				
				if(callFrom.equals("allForChk")){
					
					criteria.add(Restrictions.eq("deleted", "N"));
					criteria.add(Restrictions.eq("paidByCashFlag", "N"));
					
				}else{
								
					if(callFrom.equals("cash")){
						
						criteria.add(Restrictions.eq("totalRemain", 0.0));
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						
					}else if(callFrom.equals("refundable")){
						
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("againstId", 0));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
					}
					
					else if(callFrom.equals("credit")){
						
						criteria.add(Restrictions.gt("totalRemain", 0.0));
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						
					}else if(callFrom.equals("refund")){
						
						criteria.add(Restrictions.eq("refundFlag", "Y"));
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						
					}else if(callFrom.equals("deleted")){
						
						criteria.add(Restrictions.eq("deleted", "Y"));
						criteria.add(Restrictions.not(Restrictions.eq("totalAmt", 0.0)));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						
					}else if(callFrom.equals("cashPaid")){
						
						criteria.add(Restrictions.eq("paidByCashFlag", "Y"));
						criteria.add(Restrictions.eq("deleted", "N"));
						
					}else{
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
					}				
				}	
				
			}
			
			
			@SuppressWarnings("unchecked")
			List<IvfBillReceiptMasterDTO> listBillMaster = (List<IvfBillReceiptMasterDTO>) criteria.list();		
			
			for(IvfBillReceiptMasterDTO billMaster:listBillMaster){
									
				Criteria criteriaSlave = sessionFactory.getCurrentSession().createCriteria(IvfBillReceiptSlaveDTO.class);			
				criteriaSlave.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				criteriaSlave.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
				criteriaSlave.add(Restrictions.eq("billReceiptMasterId", billMaster.getBillReceiptId()));
				if(!callFrom.equals("deleted")){
					
					criteriaSlave.add(Restrictions.eq("deleted", "N"));
				}
								
				@SuppressWarnings("unchecked")
				List<IvfBillReceiptSlaveDTO> listBillReceiptSlave  = criteriaSlave.list();					
				billMaster.setListBillReceiptSlave(listBillReceiptSlave);
				blist.add(billMaster);
			} 
			billReceiptMasterObj.setListBillReceiptMaster(blist);
						
			return billReceiptMasterObj;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}
		
	/************
	* @author	: Vinod Udawant
	* @date		: 14-July-2017
	* @codeFor	: Get bill receipt details
	 ************/
	public IvfBillRefundMasterDTO getBillRefundDetails(IvfBillRefundMasterDTO billRecMaster,String callFrom){	
					
		try {
			IvfBillRefundMasterDTO billReceiptMasterObj=new IvfBillRefundMasterDTO();
			List<IvfBillRefundMasterDTO> blist = new ArrayList<IvfBillRefundMasterDTO>();
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfBillRefundMasterDTO.class);			
			criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
			criteria.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
			criteria.add(Restrictions.eq("deleted", "N"));	
			criteria.add(Restrictions.eq("createdBy", billRecMaster.getCreatedBy()));	
			
			@SuppressWarnings("unchecked")
			List<IvfBillRefundMasterDTO> listBillMaster = (List<IvfBillRefundMasterDTO>) criteria.list();		
			
			for(IvfBillRefundMasterDTO billMaster:listBillMaster){
									
				Criteria criteriaSlave = sessionFactory.getCurrentSession().createCriteria(IvfBillReceiptSlaveDTO.class);			
				criteriaSlave.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				criteriaSlave.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
				criteriaSlave.add(Restrictions.eq("billReceiptMasterId", billMaster.getBillRefundId()));
				criteriaSlave.add(Restrictions.eq("deleted", "N"));
				
				@SuppressWarnings("unchecked")
				List<IvfBillRefundSlaveDTO> listBillReceiptSlave  = criteriaSlave.list();					
				billMaster.setListBillRefundSlave(listBillReceiptSlave);
				blist.add(billMaster);
			} 
			billReceiptMasterObj.setListBillRefundMaster(blist);
						
			return billReceiptMasterObj;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}	
	
	public int saveMultiPayMode(int maxId,IvfBillReceiptMasterDTO obj,List<MultiBillReceiptMasterDTO> lst,Session session){
		
		int result=0;
		try{
			for(MultiBillReceiptMasterDTO multiObj:lst){
				
				multiObj.setBillReceiptId(maxId);
				multiObj.setUnitId(obj.getUnitId());
				multiObj.setTreatmentId(obj.getTreatmentId());
				multiObj.setPatientId(obj.getPatientId());
				multiObj.setBillId(obj.getBillId());				
				multiObj.setDepartmentId(obj.getDepartmentId());			
				multiObj.setTotalAmt(obj.getTotalAmt());
				multiObj.setTotalDisc(obj.getTotalDisc());
				multiObj.setTotalQty(obj.getTotalQty());		
				multiObj.setTotalRemain(obj.getTotalAmt()-multiObj.getTotalPaid());	
				multiObj.setCreatedBy(obj.getCreatedBy());
				multiObj.setCreatedDateTime(new Date());			
				multiObj.setDeleted("N");
				/*multiObj.setTotalPaid(obj.getTotalPaid());
				multiObj.setPayMode(billRecMaster.getPayMode());
				multiObj.setbNumber(billRecMaster.getbNumber());
				multiObj.setbName(billRecMaster.getbName());*/
				multiObj.setSourceTypeId(obj.getSourceTypeId());
				multiObj.setSponsorCatId(obj.getSponsorCatId());
				multiObj.setReceiptStatus("unpaid");
				
				// Save multi paymode list
				session.merge(multiObj);			
				result=1;		
			}	
		}catch (Exception e) {
			
			e.printStackTrace();
			return 0;
		}		
		return result;
	}
	
	@Override
	public int deleteMasterReceiptOPD(Integer recId, HttpServletRequest request) {
		
		int records = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
					
			// Get receipt master start
			IvfBillReceiptMasterDTO obje = (IvfBillReceiptMasterDTO) sessionFactory.getCurrentSession().get(IvfBillReceiptMasterDTO.class,recId);
			obje.setDeleted("Y");
			obje.setDeletedBy(userId);
			obje.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			Integer payMode = obje.getPayMode();
			double totalPaid=obje.getTotalPaid();
			
			if(obje.getAgainstId()>0){
				
				IvfBillReceiptMasterDTO objToUpdate = (IvfBillReceiptMasterDTO) sessionFactory.getCurrentSession().get(IvfBillReceiptMasterDTO.class, obje.getAgainstId());
				objToUpdate.setCreditFlag("N");
			}
			
			// Calling stored procedure for get super master of receipt
            Query query2 = sessionFactory.getCurrentSession().createSQLQuery("CALL fetchIvfSuperReceiptId (:receiptId)").setParameter("receiptId", recId);
            int masterRecId = (Integer) query2.uniqueResult();
            
            IvfBillReceiptMasterDTO objToUpdate = (IvfBillReceiptMasterDTO) sessionFactory.getCurrentSession().get(IvfBillReceiptMasterDTO.class, masterRecId);
            objToUpdate.setTotalPaid(objToUpdate.getTotalPaid() - totalPaid);
            objToUpdate.setTotalRemain(objToUpdate.getTotalRemain() + totalPaid);
			
			Integer patientId=obje.getPatientId();
			Integer treatmentId=obje.getTreatmentId();
			String  refundFlag =obje.getRefundFlag();
			double refundAmt=obje.getRefundAmt();
			if (payMode == commonAdv) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ComAdvbifergationDto.class);		
				criteria.add(Restrictions.eq("receipt_id", recId));
				criteria.add(Restrictions.eq("bifergation_flag", "N"));
				//criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<ComAdvbifergationDto> listComandavbifgratin = criteria.list();
				for(ComAdvbifergationDto row : listComandavbifgratin){
					
			         Integer reciptid = row.getReceipt_id();
			         Integer caid     = row.getCadvid();	
			         Double amount    =  row.getAmount();
			         
			         
			     	Query update1 = sessionFactory
							.getCurrentSession()
							.createQuery(
									"update ComAdvbifergationDto set bifergation_flag= 'Y'  where receipt_id= :receipt_id  ");

					update1.setParameter("receipt_id", reciptid);
				
					update1.executeUpdate(); 
			         String   sql="select ifnull(deduct_common_amnt,0) from ehat_common_advance_master where common_adv_id = "+caid;
						Query billDetailsIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
						Double deduct_common_amnt = (Double) ( billDetailsIdQuery.uniqueResult());
			         if(deduct_common_amnt.equals(amount)){
			        	  	
			        	 Query update = sessionFactory.getCurrentSession()
									.createQuery("update CommonadvDto set remaining_amnt= remaining_amnt+ "+amount+" ,deduct_common_amnt= "+ 0 +"  where treatmentId= :treatmentId  and patient_ID= :patient_ID and  commonadv_id =:commonadv_id   and deleted='N'");

						 update.setParameter("treatmentId", treatmentId);
						 update.setParameter("patient_ID", patientId);
						 update.setParameter("commonadv_id", caid);
						 update.executeUpdate(); 
			         }else{
			        	  	Query update = sessionFactory.getCurrentSession()
									.createQuery("update CommonadvDto set remaining_amnt= remaining_amnt+ "+amount+" where treatmentId= :treatmentId  and patient_ID= :patient_ID and  commonadv_id =:commonadv_id  and deleted='N'");

							update.setParameter("treatmentId", treatmentId);
							update.setParameter("patient_ID", patientId);
							update.setParameter("commonadv_id", caid);
							
							update.executeUpdate();
			         }
				}
			}
			if (refundFlag.equals("Y") && refundAmt > 0) {
				
				Query update = sessionFactory.getCurrentSession()
						.createQuery("update IvfBillRefundMasterDTO set deleted='Y' , deletedBy= :deletedBy , deletedDateTime= :deletedDateTime where againstId= :againstId  ");

				update.setParameter("againstId", recId);
				update.setParameter("deletedBy", userId);
				update.setDate("deletedDateTime",new Date(new java.util.Date().getTime()));
				
				update.executeUpdate();
				
			}
			//selecting other bill details id where billdetail's id 
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfBillReceiptSlaveDTO.class);		
			criteria.add(Restrictions.eq("billReceiptMasterId", recId));
			criteria.setProjection( Projections.distinct( Projections.property("billDetailsId")));			
			
			List<Integer> listDocs = (List<Integer>) criteria.list();
			for(Integer id:listDocs){
				if (id > 0) {
					BillDetailsDto objectToUpdate = (BillDetailsDto) sessionFactory.getCurrentSession().get(BillDetailsDto.class, id);
					objectToUpdate.setPaidFlag("N");
				}
			}
						
			java.util.Date date=new java.util.Date();            
            java.sql.Date sqlDate=new java.sql.Date(date.getTime());
			
			String sql="update ivf_ehat_receipt_slave set deleted='Y',deleted_by ="+userId+",deleted_date_time='"+sqlDate+"' "
                    + " where bill_receipt_master_id = "+recId;   
            Query recSlaveDelQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
            recSlaveDelQuery.executeUpdate();  
            
            records =1;
			
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}
		return records;
	}

	@Override
	public List<EhatViewPatientBedDetailsIvfDto> getIvfPatientBedBill(
			Integer treatmentId, Integer serviceId) {
		List<EhatViewPatientBedDetailsIvfDto> listBedIvfDto = new ArrayList<EhatViewPatientBedDetailsIvfDto>();
		try {
			
			String sql1 = "SELECT *,date(created_date) as bed_date FROM ehat_view_ivf_patient_bed_details where treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"' and deleted='N' ";
			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
	         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         @SuppressWarnings("unchecked")
			List<Map<String, Object>> data1 = query1.list();
	         
	         for(Map<String, Object> row : data1){
	        	 
	        	 EhatViewPatientBedDetailsIvfDto objDTO1= new EhatViewPatientBedDetailsIvfDto();
	        	 
	        	 objDTO1.setServiceId((Integer)row.get("service_id"));
	        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO1.setCategoryName((String)row.get("category_name"));
	        	 objDTO1.setIsCategory((String)row.get("isCategory"));
	        	 
	        	 objDTO1.setBedDate((Date)row.get("bed_date"));
	        	 objDTO1.setBedHall((String)row.get("BedHall"));
	        	 objDTO1.setRate((Double)row.get("rate"));
	        	 objDTO1.setAmount((Double)row.get("amount"));
	        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	 objDTO1.setQuantity((Double)row.get("quantity"));
	        	 objDTO1.setConcession((Double)row.get("concession"));
                 objDTO1.setPay((Double)row.get("pay"));
	        	 objDTO1.setCoPay((Double)row.get("co_pay"));
	        	 objDTO1.setCancle((String)row.get("cancle"));
	        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
	        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
	        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
	        	 objDTO1.setOtherPay((Double)row.get("other_pay"));
	        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
	             objDTO1.setCreatedDate((Date)row.get("created_date"));
	        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
	        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
	        	 objDTO1.setEhatHallId((BigInteger) row.get("ehat_hallid"));
	        	 objDTO1.setHallID((BigInteger) row.get("Hall_ID"));
	        	 objDTO1.setIdHallType((BigInteger) row.get("idhall_type"));
	        	 objDTO1.setEhatHalltypeId((BigInteger) row.get("ehat_halltype_id"));
	        	 objDTO1.sethName((String) row.get("hall_type_name"));
	        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));
	        	 listBedIvfDto.add(objDTO1);
	        	 objDTO1=null;
	         
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return listBedIvfDto;
		}
		return listBedIvfDto;
	}
	
	@Override
	public int closeIVFPatientTreatment(Integer treatmentId, Integer userId,Integer ivfTreatId,Integer patientId) {
		try {
			 Date d=new Date(new java.util.Date().getTime());
			 String hql = "UPDATE TreatmentDto set ivfTreatFlag =:flag,updatedDateTime=:date,updatedBy=:user WHERE treatmentId =:treatmentId";
				Query query =sessionFactory.getCurrentSession().createQuery(hql);
				query.setParameter("flag","N");  
				query.setParameter("date", d);
				query.setParameter("user", userId);
				

				query.setParameter("treatmentId",treatmentId);  
				query.executeUpdate();
			
			 String hql1 = "UPDATE IVFTreatmentDTO set ivfTreatFlag =:flag,updatedDateTime=:date,updatedBy=:user,ivfStatus=:status WHERE ivfTreatId =:ivfTreatIdd";
				Query query1 =sessionFactory.getCurrentSession().createQuery(hql1);
				query1.setParameter("flag","N");  
				query1.setParameter("date", d);
				query1.setParameter("user", userId);
				query1.setParameter("status", "N");
				

				query1.setParameter("ivfTreatIdd",ivfTreatId);  
			 query1.executeUpdate();
			 
			 
			 String hql2 = "UPDATE IVFCoupleDTO set ivfCoupleStatus ='Y'where femalePatientId="+patientId+" ";
			 Query query2 =sessionFactory.getCurrentSession().createQuery(hql2);
			 query2.executeUpdate();
			 
			 
			 
			 
			 return 1;
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int getIvfTreatIdByNormalTreatmentId(Integer treatmentId) {
		int ivfTreatId=0;
		String hql="";
		  try {
			  
			  hql="Select ivfTreatId from IVFTreatmentDTO where treatmentId="+treatmentId+" and ivfStatus='Y'   ";
			  
			 Query q= sessionFactory.getCurrentSession().createQuery(hql);
			 ivfTreatId= (int) q.uniqueResult();
			  
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return ivfTreatId;
	}
}
