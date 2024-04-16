package com.hms.opdbill.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dto.FinanceReportAmtDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dao.BillDao;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.IpdBillDiscount;
import com.hms.opdbill.dao.OpdBillDao;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.registration.dto.PatientConsultationChargesDto;

@Repository
public class OpdBillDaoImpl implements OpdBillDao {

	static Logger log=Logger.getLogger(OpdBillDaoImpl.class.getName());
	static {
		System.out.println("OpdBillDaoImpl is Loaded...!");
	}
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	BillDao billDao;
	
	@Override
	public PatientHeaderInfoDto getPatientInfoByTreatmentId(PatientHeaderInfoDto objDto) {

		log.info("In OpdBillDaoImpl getPatientInfoByTreatmentId()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_bill_get_patient_info_by_treatment_id(:treatmentId)");
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

		log.info("In OpdBillDaoImpl getPatientServiceDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_bill_patient_service_detail(:treatmentFlag,:treatmentId)");
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

		log.info("In OpdBillDaoImpl getPatientSubServiceDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_bill_patient_sub_service_details(:treatmentFlag,:treatmentId,:serviceId)");
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

		log.info("In OpdBillDaoImpl getPatientPackageDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_bill_patient_package_details(:billDetailsId,:treatmentId)");
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

		log.info("In OpdBillDaoImpl getAllAmountDetails()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_bill_amount_details(:unitId,:depId,:userId,:treatmentId,:serviceId,:chargesSlaveId,:sponsorCatId,:pharmacyInvoice,:pharmacyServId,:callformComAdv,:callformRcptTot,:callformPrevPending)");
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
	public PatientConsultationChargesDto getDoctorConsultationCharges(PatientConsultationChargesDto objDto) {

		log.info("In OpdBillDaoImpl getDoctorConsultaiononCharges()");
		
		try {
			
			// SP for get consultation charges
			Query spQuery1 = sessionFactory.getCurrentSession().createSQLQuery("call sp_opd_bill_get_doctor_charges(:patient_id,:treatment_id,:unit_id,:department_id,:user_id,:charges_slave_id,:bill_id,:service_id,:query_type,:doctor_id_list)");
			spQuery1.setParameter("patient_id", objDto.getPatientId());
			spQuery1.setParameter("treatment_id", objDto.getTreatmentId());
			spQuery1.setParameter("unit_id", objDto.getUnitId());
			spQuery1.setParameter("department_id", objDto.getDepId());
			spQuery1.setParameter("user_id", objDto.getUserId());
			spQuery1.setParameter("charges_slave_id", objDto.getChargesSlaveId());
			spQuery1.setParameter("bill_id", objDto.getBillId());
			spQuery1.setParameter("service_id", 2);
			spQuery1.setParameter("query_type", "insert");
			spQuery1.setParameter("doctor_id_list", objDto.getDoctorId());
			spQuery1.setResultTransformer(new AliasToBeanResultTransformer(PatientConsultationChargesDto.class));
			@SuppressWarnings("unchecked")
			List<PatientConsultationChargesDto> ltConsultChargesDto = spQuery1.list();		
			objDto.setLstConstCharges(ltConsultChargesDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}

	@Override
	public String getSampleCollectionDateandTime(int masterId) {
		   String sampleDateTime="";
		   try {
			   
			   String sql="select concat( collection_date,'    ',collection_time) as sampleDateTime  from pathology_sample_wise_master where  id="+masterId+" ";
			   
			   SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			   
			   sampleDateTime=  (String) q.uniqueResult();
			   
		   }catch (Exception e) {
			e.printStackTrace();
		}
		return sampleDateTime;
	}

	@Override
	public List<BillReceiptMasterDTO> fetchOpdbillTreatDiscount(int treatmentId) {

		List<BillReceiptMasterDTO> lstOpdBill = new ArrayList<BillReceiptMasterDTO>();

//		HttpSession session = httpServlet.getSession();
//		Integer userId = (Integer) session.getAttribute("userId1");

		try {

			String sql1 = "SELECT r.bill_receipt_id,nm.narr_name,r.patient_id,r.treatment_id,r.total_amt,r.total_discount,IFNULL(r.discount_approved_status,'N') as discount_approved_status,IFNULL(r.discount_approved_remark,'-')as discount_approved_remark,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,r.discount_approvel_amt,r.discount_approved_amt,p.center_patient_id, ifnull(r.created_by, 1) created_by from" +
					" ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) LEFT JOIN narration_master nm ON(nm.narr_id=r.disc_narrarion) where r.deleted='N' and r.discount_status='Y' and r.treatment_id="+treatmentId;

			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> data1 = query1.list();

			for (Map<String, Object> row : data1) {

				BillReceiptMasterDTO objOpdbill = new BillReceiptMasterDTO();
				objOpdbill.setBillReceiptId((Integer) row.get("bill_receipt_id"));
				objOpdbill.setPatientId((Integer) row.get("patient_id"));
				objOpdbill.setTreatmentId((Integer) row.get("treatment_id"));
				objOpdbill.setPatientName((String) row.get("patient_name")); // for patient name
				objOpdbill.setTotalAmt((Double) row.get("total_amt"));
				objOpdbill.setTotalDisc((Double) row.get("total_discount"));
				objOpdbill.setApprovedStat((String) row.get("discount_approved_status"));
//				objOpdbill.setApproved((Double) row.get("approved_amt"));
				objOpdbill.setApprovedRemark((String) row.get("discount_approved_remark"));
				//objOpdbill.setDiscRemark((String) row.get("disc_remark"));
//				objOpdbill.setDiscFlag((String) row.get("disc_flag"));
				objOpdbill.setCenterPatientId((String) row.get("center_patient_id"));
				
				objOpdbill.setDiscountApprovelAmt((Double) row.get("discount_approvel_amt"));
				objOpdbill.setDiscountApprovedAmt((Double) row.get("discount_approved_amt"));
				
				objOpdbill.setNarrationName((String) row.get("narr_name"));
				
				Integer created_by = ((Number) row.get("created_by")).intValue();
				
				String userName = getUserNameForDisc(created_by);
				
				objOpdbill.setUserName(userName);
				
				lstOpdBill.add(objOpdbill);
				
				objOpdbill = null;
			}

		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}

		return lstOpdBill;
	}

	@Override
	public List<BillReceiptMasterDTO> fetchOpdbilllDiscount(HttpServletRequest httpServlet,String callFrom) {

		List<BillReceiptMasterDTO> lstOpdBill = new ArrayList<BillReceiptMasterDTO>();

		HttpSession session = httpServlet.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		try {
			
		if(callFrom.equalsIgnoreCase("Hospital")) {	

			String sql1 = "SELECT r.bill_receipt_id,r.patient_id,r.disc_remark,r.treatment_id,r.total_amt,r.total_discount,IFNULL(r.discount_approved_status,'N') as discount_approved_status,IFNULL(r.discount_approved_remark,'-')as discount_approved_remark,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,r.discount_approvel_amt,p.center_patient_id, ifnull(r.created_by, 1) created_by from" +
					" ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where r.deleted='N' and r.discount_status='Y' and discount_approved_status='N' order by r.bill_receipt_id desc";

			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> data1 = query1.list();

			for (Map<String, Object> row : data1) {

				BillReceiptMasterDTO objOpdbill = new BillReceiptMasterDTO();
				objOpdbill.setBillReceiptId((Integer) row.get("bill_receipt_id"));
				objOpdbill.setPatientId((Integer) row.get("patient_id"));
				objOpdbill.setTreatmentId((Integer) row.get("treatment_id"));
				objOpdbill.setPatientName((String) row.get("patient_name")); // for patient name
				objOpdbill.setTotalAmt((Double) row.get("total_amt"));
				objOpdbill.setTotalDisc((Double) row.get("total_discount"));
				objOpdbill.setApprovedStat((String) row.get("discount_approved_status"));
//				objOpdbill.setApproved((Double) row.get("approved_amt"));
				objOpdbill.setApprovedRemark((String) row.get("discount_approved_remark"));
				objOpdbill.setDiscRemark((String) row.get("disc_remark"));
//				objOpdbill.setDiscFlag((String) row.get("disc_flag"));
				objOpdbill.setCenterPatientId((String) row.get("center_patient_id"));
				
				objOpdbill.setDiscountApprovelAmt((Double) row.get("discount_approvel_amt"));
				
				Integer created_by = ((Number) row.get("created_by")).intValue();
				
				String userName = getUserNameForDisc(created_by);
				
				objOpdbill.setUserName(userName);
				
				lstOpdBill.add(objOpdbill);
				
				objOpdbill = null;
			}
			
		}else if(callFrom.equalsIgnoreCase("ApprovedDiscount")) {	

			String sql1 = "SELECT r.bill_receipt_id,r.disc_remark,r.discount_approved_amt,r.patient_id,r.treatment_id,r.total_amt,r.total_discount,IFNULL(r.discount_approved_status,'N') as discount_approved_status,IFNULL(r.discount_approved_remark,'-')as discount_approved_remark,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,r.discount_approvel_amt,p.center_patient_id, ifnull(r.created_by, 1) created_by from" +
					" ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where r.deleted='N' and r.discount_approved_status='Y' order by r.bill_receipt_id desc";

			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> data1 = query1.list();

			for (Map<String, Object> row : data1) {

				BillReceiptMasterDTO objOpdbill = new BillReceiptMasterDTO();
				objOpdbill.setBillReceiptId((Integer) row.get("bill_receipt_id"));
				objOpdbill.setPatientId((Integer) row.get("patient_id"));
				objOpdbill.setTreatmentId((Integer) row.get("treatment_id"));
				objOpdbill.setPatientName((String) row.get("patient_name")); // for patient name
				objOpdbill.setTotalAmt((Double) row.get("total_amt"));
				objOpdbill.setTotalDisc((Double) row.get("total_discount"));
				objOpdbill.setApprovedStat((String) row.get("discount_approved_status"));
//				objOpdbill.setApproved((Double) row.get("approved_amt"));
				objOpdbill.setApprovedRemark((String) row.get("discount_approved_remark"));
				objOpdbill.setDiscRemark((String) row.get("disc_remark"));
//				objOpdbill.setDiscFlag((String) row.get("disc_flag"));
				objOpdbill.setCenterPatientId((String) row.get("center_patient_id"));
				
				objOpdbill.setDiscountApprovedAmt((Double)row.get("discount_approved_amt"));
				objOpdbill.setDiscountApprovelAmt((Double) row.get("discount_approvel_amt"));
				
				Integer created_by = ((Number) row.get("created_by")).intValue();
				
				String userName = getUserNameForDisc(created_by);
				
				objOpdbill.setUserName(userName);
				
				lstOpdBill.add(objOpdbill);
				
				objOpdbill = null;
			}
			return lstOpdBill;
			
		}

		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}

		return lstOpdBill;
	}
	
	
		//for hospital and surgeon discount by using username
		public String getUserNameForDisc(Integer userId) {
			// TODO Auto-generated method stub
			
			String result = "";
			try {

				String sql = " SELECT concat(f_name,' ',m_name,' ',l_name) User_Name FROM users where deleted='N' and User_ID ="+userId;
				SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
				result = (String) sqlcount.uniqueResult();
				
			} catch(Exception e) {
				e.printStackTrace();
			}
			
			return result;
		}

		@Override
		public Integer saveApprovedDiscountOPD(BillReceiptMasterDTO billReceiptMasterDTO) {
			// TODO Auto-generated method stub
			BillReceiptMasterDTO billReceiptMasterDTO2 = new BillReceiptMasterDTO();
		if(billReceiptMasterDTO.getBillReceiptId()>0) {	
			BillReceiptMasterDTO object = (BillReceiptMasterDTO) sessionFactory.getCurrentSession().get(billReceiptMasterDTO.getClass(), 
					billReceiptMasterDTO.getBillReceiptId());
			
			
			object.setDiscountApprovedAmt(billReceiptMasterDTO.getDiscountApprovedAmt());
			object.setTotalDisc(billReceiptMasterDTO.getDiscountApprovedAmt());
			object.setApprovedBy(billReceiptMasterDTO.getApprovedBy());
			object.setApprovedStat("Y");
			object.setDiscRemark(billReceiptMasterDTO.getDiscRemark());
			object.setApprovedRemark(billReceiptMasterDTO.getApprovedRemark());
			object.setApprovedDateTime(new Date());
			object.setTotalRemain(object.getTotalRemain()+(object.getDiscountApprovelAmt()-billReceiptMasterDTO.getDiscountApprovedAmt()));
			object.setFirstRemain(object.getFirstRemain()+(object.getDiscountApprovelAmt()-billReceiptMasterDTO.getDiscountApprovedAmt()));
			object.setFirstDisc(billReceiptMasterDTO.getDiscountApprovedAmt());
			
			sessionFactory.getCurrentSession().merge(object);
			try {	
				BeanUtils.copyProperties(object, billReceiptMasterDTO2);
			}catch (Exception e) {
				e.printStackTrace();
			}
			
			if (billReceiptMasterDTO2.getAgainstId() > 0) {

				// Calling stored procedure for get super master of receipt
				Query query2 = sessionFactory.getCurrentSession()
						.createSQLQuery("CALL fetchSuperReceiptId (:receiptId)").setParameter("receiptId", billReceiptMasterDTO.getBillReceiptId());
				Integer masterRecId = (Integer) query2.uniqueResult();

				BillReceiptMasterDTO object2 = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
						.get(BillReceiptMasterDTO.class, masterRecId);
				object2.setApprovedStat("Y");
				object2.setTotalDisc(object2.getTotalDisc() + billReceiptMasterDTO2.getDiscountApprovedAmt());
				double totalRemain = object2.getTotalRemain();
				if(totalRemain>0) {
					object2.setTotalRemain((totalRemain-billReceiptMasterDTO2.getDiscountApprovedAmt()));
				}
				//object2.setTotalRemain(object.getDiscountApprovedAmt());
				sessionFactory.getCurrentSession().merge(object2);
			}
			
			
			setOPDBillDiscount(billReceiptMasterDTO2,sessionFactory.getCurrentSession(), object.getTreatmentId());
			
			
			
			return 1;
		}
			
			return 0;
		}
	
	
		/************
		* @author	: Vishant Pawar
		 * @param spId 
		 * @param session 
		 * @param treatId 
		* @date		: 08-April-2024
		* @codeFor	: to set hospital and ref doctor discount
		 ************/
		private void setOPDBillDiscount(BillReceiptMasterDTO objOpdbill, Session session, int treatId) {
			
			double mastTotAmt = 0, mastTotConcn = 0, mastConcnPer = 0, mastTotDisc = 0, mastDiscPer = 0,
					mastTotPaid = 0, mastPaidPer = 0;
			double slaveTotAmt = 0, slaveTotConcn = 0, slavePayable = 0, slaveTotDisc = 0, slaveTotPaid = 0,
					slavePaidPer = 0;
			
//			TreatmentDto object = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatId);
			
			String discountFrom =objOpdbill.getDiscountFrom();
			int spId=objOpdbill.getSponsorCatId();
			
//			FinanceReportAmtDto fobj = getTotalAmtsForDistribute(treatId, object.getDepartmentId(), object.getSponsorId());
			mastTotAmt = objOpdbill.getTotalAmt();
			mastTotDisc = objOpdbill.getDiscountApprovedAmt();//fobj.getTotalDiscountAMt();
//			mastTotConcn = objOpdbill.getto();
			mastTotPaid = objOpdbill.getTotalPaid();
			// mastTotRemain=(Double)row.get("total_remain");
			
			Integer billReceiptId=0;
			Integer againstId = objOpdbill.getAgainstId();
			if(againstId==0) {
				billReceiptId=objOpdbill.getBillReceiptId();
			}else {
			
				// Calling stored procedure for get super master of receipt
				Query query2 = sessionFactory.getCurrentSession()
						.createSQLQuery("CALL fetchSuperReceiptId (:receiptId)").setParameter("receiptId", objOpdbill.getBillReceiptId());
				Integer masterRecId = (Integer) query2.uniqueResult();
				billReceiptId=masterRecId;
				
			}
			
			
			Double totalNetAmount= mastTotAmt-(mastTotConcn+mastTotDisc);
			if(mastTotPaid>totalNetAmount) {
				mastTotPaid=totalNetAmount;
			}
			//Double totalAmtPaid= mastTotAmt-mastTotRefund;
			//Double totalNetAmt = mastTotAmt - (mastTotConcn);

			if(mastTotAmt  >0) {
			//mastConcnPer = (mastTotConcn * 100) / mastTotAmt;
			mastDiscPer = (mastTotDisc * 100) / mastTotAmt;
			}
			if(Double.isNaN(mastConcnPer)) {
				mastConcnPer=0.0;
	        }
			if(Double.isNaN(mastDiscPer)) {
				mastDiscPer=0.0;
	        }
			
			double hospitalDiscount=0;
			double refDoctorDiscount=0;
			double preDiscountTotal=0;
			double discountAmt=0;
			double paidAmt=0;
			String sql="select * from ehat_receipt_slave where bill_receipt_master_id="+billReceiptId;
            Query slaveQuery = session.createSQLQuery(sql);
            slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> listRecSlave = slaveQuery.list();
            for(Map<String, Object> row : listRecSlave){
                           	
            	int slaveId=(Integer)row.get("bill_rec_slave_id");
                slaveTotAmt=(Double)row.get("actual_amt");
                discountAmt=(Double)row.get("actual_disc_amt");
                paidAmt=(Double)row.get("actual_final_paid");
                slaveTotConcn=(Double)row.get("actual_concn_amt");                
                int billDetailsId=(Integer)row.get("bill_details_id"); 
                
                if(discountFrom.equalsIgnoreCase("Hospital")) {
					
					hospitalDiscount= (Double) row.get("hospital_disc");
					preDiscountTotal = (double) row.get("discount");
					
				}else if(discountFrom.equalsIgnoreCase("RefDoctor")) {
					refDoctorDiscount= (Double) row.get("ref_doctor_disc");
					preDiscountTotal = (double) row.get("discount");
				}
               
                slavePayable=slaveTotAmt-(slaveTotConcn);
//                slavePayable= 
                slaveTotDisc=(slavePayable*mastDiscPer)/100;
                
                if(discountFrom.equalsIgnoreCase("Hospital")) {
    				
    				slaveTotDisc=hospitalDiscount+slaveTotDisc;
    				preDiscountTotal=preDiscountTotal+slaveTotDisc;
    				
    				sql = "update ehat_receipt_slave set discount_from='" + discountFrom + "',hospital_disc=" + slaveTotDisc
    						//+" ,discount="+preDiscountTotal 
    						+", discount_status='Y' "
    						+ " where bill_rec_slave_id = " + slaveId;
    				
    				Query recSlaveQuery2 = session.createSQLQuery(sql);
    				recSlaveQuery2.executeUpdate();
    				
    				sql= "update ehat_bill_details set discount_from='" + discountFrom +
    	    				  "',hospital_disc=" + slaveTotDisc +" ,discount="+preDiscountTotal
    	    				 +", discount_status='Y' " + " where bill_details_id = " + billDetailsId;
    	    				
    	    				Query billQuery = session.createSQLQuery(sql);
    	    				billQuery.executeUpdate();
    				
    			}else if(discountFrom.equalsIgnoreCase("RefDoctor")) {
    				
    				slaveTotDisc=slaveTotDisc+refDoctorDiscount;
    				preDiscountTotal=preDiscountTotal+slaveTotDisc;
    				sql = "update ehat_receipt_slave set discount_from='" + discountFrom + "',ref_doctor_disc=" + slaveTotDisc
//    						+" ,discount="+preDiscountTotal 
    						+", discount_status='Y' "
    						+ " where bill_rec_slave_id = " + slaveId;
    				
    				Query recSlaveQuery2 = session.createSQLQuery(sql);
    				recSlaveQuery2.executeUpdate();
    				
    				
    				sql= "update ehat_bill_details set discount_from='" + discountFrom +
    				  "',ref_doctor_disc=" + slaveTotDisc +" ,discount="+preDiscountTotal
    				 +", discount_status='Y' " + " where bill_details_id = " + billDetailsId;
    				
    				Query billQuery = session.createSQLQuery(sql);
    				billQuery.executeUpdate();
    			}
                int servId=(Integer)row.get("service_id");
               
                sql="select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "+servId;
                Query billDetailsQuery = session.createSQLQuery(sql);					
                String isCombine = (String) billDetailsQuery.uniqueResult();
                
                if(isCombine.equals("Y")){
             	   
//             	   slavePaidPer = (slaveTotPaid * 100) / slaveTotAmt;
                	setOpdPkgMasterHospitalRefDiscount(servId, billDetailsId, session, discountFrom,
               			 slavePaidPer, spId,slaveTotDisc,slavePayable);
//             	   setOpdPkgMasterSlaveNew(servId, billDetailsId, session, callFrom, slaveTotPaid, spId,masterRecId,mastPaidPer);
 				
//             	   setOpdPkgMasterSlave(maxRecId,servId,billDetailsId,session,spId);
                }                   
               
               
            }
			
			
			//Get pkg slave receipt totals
			/*
			 * String sql =
			 * "select * from ehat_bill_details where deleted='N' and treatment_id=" +
			 * treatId + " and cancle='N' and discount_status='N'"; Query slaveQuery =
			 * session.createSQLQuery(sql);
			 * slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * 
			 * @SuppressWarnings("unchecked") List<Map<String, Object>> listRecSlave =
			 * slaveQuery.list(); for (Map<String, Object> row : listRecSlave) {
			 * 
			 * int sponsorId = (Integer) row.get("charges_slave_id"); int detailsId =
			 * (Integer) row.get("bill_details_id");
			 * 
			 * // double otherAmount=0.00; double amount=0.00;
			 * 
			 * double servNetamount=0; double servConamount=0;
			 * 
			 * if(discountFrom.equalsIgnoreCase("Hospital")) {
			 * 
			 * hospitalDiscount= (Double) row.get("hospital_disc"); preDiscountTotal =
			 * (double) row.get("discount");
			 * 
			 * }else if(discountFrom.equalsIgnoreCase("RefDoctor")) { refDoctorDiscount=
			 * (Double) row.get("ref_doctor_disc"); preDiscountTotal = (double)
			 * row.get("discount"); }
			 * 
			 * if (sponsorId > 0) {
			 * 
			 * slaveTotAmt = (Double) row.get("other_pay"); amount = (Double)
			 * row.get("other_amount"); servConamount = (Double)
			 * row.get("other_concession");
			 * 
			 * } else {
			 * 
			 * slaveTotAmt = (Double) row.get("co_pay"); amount = (Double)
			 * row.get("amount"); servConamount = (Double) row.get("concession"); }
			 * 
			 * slaveTotConcn = (slaveTotAmt * mastConcnPer) / 100; slavePayable =
			 * slaveTotAmt; slaveTotDisc = (amount * mastDiscPer) / 100;
			 * 
			 * if(discountFrom.equalsIgnoreCase("Hospital")) {
			 * 
			 * slaveTotDisc=slaveTotDisc+ hospitalDiscount;
			 * preDiscountTotal=preDiscountTotal+slaveTotDisc;
			 * 
			 * sql = "update ehat_bill_details set discount_from='" + discountFrom +
			 * "',hospital_disc=" + slaveTotDisc +" ,discount="+preDiscountTotal
			 * +", discount_status='Y' " + " where bill_details_id = " + detailsId;
			 * 
			 * Query recSlaveQuery2 = session.createSQLQuery(sql);
			 * recSlaveQuery2.executeUpdate(); }else
			 * if(discountFrom.equalsIgnoreCase("RefDoctor")) {
			 * 
			 * slaveTotDisc=slaveTotDisc+ refDoctorDiscount;
			 * preDiscountTotal=preDiscountTotal+slaveTotDisc; sql =
			 * "update ehat_bill_details set discount_from='" + discountFrom +
			 * "',ref_doctor_disc=" + slaveTotDisc +" ,discount="+preDiscountTotal
			 * +", discount_status='Y' " + " where bill_details_id = " + detailsId;
			 * 
			 * Query recSlaveQuery2 = session.createSQLQuery(sql);
			 * recSlaveQuery2.executeUpdate(); }
			 * 
			 * 
			 * 
			 * 
			 * 
			 * int servId = (Integer) row.get("service_id"); sql =
			 * "select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "
			 * + servId; Query billDetailsQuery =
			 * sessionFactory.getCurrentSession().createSQLQuery(sql); String isCombine =
			 * (String) billDetailsQuery.uniqueResult();
			 * 
			 * if (isCombine.equals("Y")) {
			 * 
			 * slavePaidPer = (slaveTotPaid * 100) / slaveTotAmt;
			 * setOpdPkgMasterHospitalRefDiscount(servId, detailsId, session, discountFrom,
			 * slavePaidPer, sponsorId,slaveTotDisc,slavePayable); }
			 * 
			 * }
			 */			
			//billDao.setOpdBillDetailsDistribute(treatId, null);
			
			// TODO Auto-generated method stub
			
		}
		
		public int setOpdPkgMasterHospitalRefDiscount(int servId, int billDetailsId, Session session, String discountFrom,
				double mastPaidPer, int spId,double totalServiceDiscount, double slavePayable2) {

			double mastConsnPer = 0, mastDiscPer = 0, mastRefPer = 0,mastTotDisc=0,mastTotAmt=0;
			double slaveTotAmt = 0, slaveTotConsn = 0, slavePayable = 0, slaveTotPaid = 0, slaveTotDisc = 0,
					slaveTotRef = 0;

			// Get slave receipt totals
			String sql = "select * from ehat_bill_details where service_id=" + servId + " and bill_details_id="
					+ billDetailsId;
			Query mastQuery = session.createSQLQuery(sql);
			mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRecMast = mastQuery.list();
			for (Map<String, Object> row : listRecMast) {

				int sponsorId = (Integer) row.get("charges_slave_id");
				int detailsId = (Integer) row.get("bill_details_id");
//				double otherAmount=0.00;
				
				if (sponsorId > 0) {

					slaveTotAmt = (Double) row.get("other_amount");
					slaveTotConsn = (Double) row.get("other_concession");

				} else {

					slaveTotAmt = (Double) row.get("amount");
					slaveTotConsn = (Double) row.get("concession");
				}
				
				if(discountFrom.equalsIgnoreCase("Hospital")) {
					mastTotDisc=(Double) row.get("hospital_disc");
				}else if(discountFrom.equalsIgnoreCase("RefDoctor")) {
					mastTotDisc = (Double) row.get("ref_doctor_disc");
				}
				
			}
			
			
			
			mastDiscPer = (mastTotDisc * 100) / slaveTotAmt;
			double hospitalDiscount=0;
			double RefDiscount=0;
			// Get pkg slave receipt totals
			sql = "select * from ehat_other_bill_detail_for_opd where deleted='N' and bill_details_id=" + billDetailsId;
			Query slaveQuery = session.createSQLQuery(sql);
			slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRecSlave = slaveQuery.list();
			for (Map<String, Object> row : listRecSlave) {

				// int sponsorId=(Integer)row.get("chargesSlave_id");
				int pkgSlaveId = (Integer) row.get("other_bill_details_id_for_Opd");

				if (spId > 0) {

					slaveTotAmt = (Double) row.get("other_amount");
					slaveTotConsn = (Double) row.get("other_concession");

				} else {

					slaveTotAmt = (Double) row.get("amount");
					slaveTotConsn = (Double) row.get("concession");
				}
				
				if(discountFrom.equalsIgnoreCase("Hospital")) {
					hospitalDiscount=(Double) row.get("hospital_disc");
				}else if(discountFrom.equalsIgnoreCase("RefDoctor")) {
					RefDiscount = (Double) row.get("ref_doctor_disc");
				}

				
				  slaveTotConsn=(slaveTotAmt*mastConsnPer)/100; 
				  slavePayable=slaveTotAmt -slaveTotConsn; 
				  slaveTotDisc=(slavePayable*mastDiscPer)/100;
				 
				//double totalAmount = slaveTotAmt;
				
				mastDiscPer = (totalServiceDiscount * 100) / slavePayable2;
				
				slaveTotPaid = (slavePayable * mastPaidPer) / 100;
				slaveTotDisc=(slavePayable*mastDiscPer)/100;


				if(discountFrom.equalsIgnoreCase("Hospital")) {
					slaveTotDisc= slaveTotDisc+hospitalDiscount;
					sql = "update ehat_other_bill_detail_for_opd set "
							+ " hospital_disc=" + slaveTotDisc + ",discount_from='" + discountFrom 
							+ "' where other_bill_details_id_for_Opd = " + pkgSlaveId;
				}else if(discountFrom.equalsIgnoreCase("RefDoctor")) {
					slaveTotDisc= slaveTotDisc+RefDiscount;
					sql = "update ehat_other_bill_detail_for_opd set "
							+ " ref_doctor_disc=" + slaveTotDisc + ",discount_from='" + discountFrom 
							+ "' where other_bill_details_id_for_Opd = " + pkgSlaveId;
				}
						

				

				Query recSlaveQuery2 = session.createSQLQuery(sql);
				recSlaveQuery2.executeUpdate();
			}
			return 1;
		}
		
		public FinanceReportAmtDto getTotalAmtsForDistribute(Integer treatmentId, Integer departmentId, Integer sponsorId) {

			FinanceReportAmtDto obj = new FinanceReportAmtDto();

			String sqlAMt = " select  fn_get_rpt_total_bill_amt(" + treatmentId + "," + departmentId + "," + sponsorId
					+ ") as totalBillAMt ";
			double totalAMt = (double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();

			sqlAMt = " select  fn_get_rpt_total_discount_amt(" + treatmentId + "," + departmentId
					+ ") as totalDiscountAmt ";
			double totalDiscountAMt = (double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();

			sqlAMt = " select  fn_get_sponsor_total_paid_amt_new(" + treatmentId + "," + departmentId + "," + sponsorId
					+ ") as totalPaidAmt ";
			double totalPaidAMt = (double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();

			sqlAMt = " select  fn_get_rpt_total_concession_amt(" + treatmentId + "," + departmentId + "," + sponsorId
					+ ") as totalConAmt ";
			double totalConAMt = (double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();

			sqlAMt = " select  fn_get_rpt_total_refund_amt(" + treatmentId + "," + departmentId + ") as totalRefundAmt ";
			double totalRefundAMt = (double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();

			obj.setTotalAMt(totalAMt);
			obj.setTotalDiscountAMt(totalDiscountAMt);
			obj.setTotalPaidAMt(totalPaidAMt);
			obj.setTotalConAMt(totalConAMt);
			obj.setTotalRefundAMt(totalRefundAMt);

			return obj;

		}

		@Override
		public List<BillReceiptMasterDTO> autosuggesstionDiscApprovelOPD(String letter, String usertype, Integer unitId,
				HttpServletRequest req,String callfrom) {

			List<BillReceiptMasterDTO> lstOpdBill = new ArrayList<BillReceiptMasterDTO>();

			HttpSession session = req.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			String sql1="";
			try {
	
			if(callfrom.equalsIgnoreCase("Hospital")) {
				sql1 = "SELECT r.bill_receipt_id,r.patient_id,r.treatment_id,r.total_amt,r.total_discount,IFNULL(r.discount_approved_status,'N') as discount_approved_status,IFNULL(r.discount_approved_remark,'-')as discount_approved_remark,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,r.discount_approvel_amt,r.discount_approved_amt,p.center_patient_id, ifnull(r.created_by, 1) created_by from" +
						" ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where r.deleted='N' and r.discount_approved_status='N' and r.discount_status='Y' and r.unit_id =:unitId AND r.patient_id like :letter or p.f_name like :letter order by r.patient_id asc";

			}else {
				sql1 = "SELECT r.bill_receipt_id,r.patient_id,r.treatment_id,r.total_amt,r.total_discount,IFNULL(r.discount_approved_status,'N') as discount_approved_status,IFNULL(r.discount_approved_remark,'-')as discount_approved_remark,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,r.discount_approvel_amt,r.discount_approved_amt,p.center_patient_id, ifnull(r.created_by, 1) created_by from" +
						" ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where r.deleted='N' and r.discount_approved_status='Y' and r.unit_id =:unitId AND r.patient_id like :letter or p.f_name like :letter order by r.patient_id asc";

			}
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				 
				query1.setParameter("unitId",unitId);
				query1.setParameter("letter","%" +letter+"%");
				
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> data1 = query1.list();

				for (Map<String, Object> row : data1) {

					BillReceiptMasterDTO objOpdbill = new BillReceiptMasterDTO();
					objOpdbill.setBillReceiptId((Integer) row.get("bill_receipt_id"));
					objOpdbill.setPatientId((Integer) row.get("patient_id"));
					objOpdbill.setTreatmentId((Integer) row.get("treatment_id"));
					objOpdbill.setPatientName((String) row.get("patient_name")); // for patient name
					objOpdbill.setTotalAmt((Double) row.get("total_amt"));
					objOpdbill.setTotalDisc((Double) row.get("total_discount"));
					objOpdbill.setApprovedStat((String) row.get("discount_approved_status"));
//					objOpdbill.setApproved((Double) row.get("approved_amt"));
					objOpdbill.setApprovedRemark((String) row.get("discount_approved_remark"));
					//objOpdbill.setDiscRemark((String) row.get("disc_remark"));
//					objOpdbill.setDiscFlag((String) row.get("disc_flag"));
					objOpdbill.setCenterPatientId((String) row.get("center_patient_id"));
					
					objOpdbill.setDiscountApprovelAmt((Double) row.get("discount_approvel_amt"));
					objOpdbill.setDiscountApprovedAmt((Double) row.get("discount_approved_amt"));
					
					Integer created_by = ((Number) row.get("created_by")).intValue();
					
					String userName = getUserNameForDisc(created_by);
					
					objOpdbill.setUserName(userName);
					
					lstOpdBill.add(objOpdbill);
					
					objOpdbill = null;
				}
				
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				//return ltRegistrationViewDto;
			}
			return lstOpdBill;
		}
		
	
}
