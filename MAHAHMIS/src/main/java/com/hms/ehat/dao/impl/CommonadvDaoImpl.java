package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.Set;import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.common.base.Functions;
import com.hms.dto.Blockdoctorappointment;
import com.hms.dto.Doctor;
import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dao.CommonadvDao;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.CommanAdvRefund;
import com.hms.ehat.dto.CommanadvrecordDTO;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.ConsultationChargesDto;
import com.hms.ehat.dto.DoctorRoundCharg;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationCharges;
import com.hms.registration.dto.PrefixDto;
import com.hms.utility.ApplicationContextUtils;
@Repository
public class CommonadvDaoImpl implements CommonadvDao {
	@Autowired
	SessionFactory sessionFactory;

	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");

	Integer autoLimit = Integer.parseInt(autoLimitStr);

	@Override
	public int saveCommonadvMaster(CommonadvDto commonadv , HttpServletRequest request) {
		int records=0;
		Double cAdvc=0.0,totCAdvc=0.0;
		try {
			// sessionFactory.getCurrentSession().merge(commonadv);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			for (CommonadvDto  obj : commonadv.getLstCommonadv()) {
			/*	String sql="select common_adv_amnt,total_common_amnt from ehat_common_advance_master " +
						   "where patient_id="+commonadv.getPatient_ID()+" and deleted='N' and post_flag='N' ";
			    SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        @SuppressWarnings("unchecked")
		    	List<Map<String, Object>> listCadvc = query.list();*/
		        
		        if(obj.getCommonadv_id()==0){
		        	obj.setPaidflag("N");
		        	obj.setDeduct_amnt(0.0);
		        	obj.setCreatedBy(userId);
			        obj.setDeleted("N");
			        obj.setCreatedDate(new Date(new java.util.Date()
							.getTime()));
		        	/*if(listCadvc.size()>0){
	    		        		        	
		        		records=-5;
			        }else{
			        	
			        	sessionFactory.getCurrentSession().merge(commonadv);
				        records=1;	        	
			        }*/
		        }else{
		        	if(obj.getRefundStatus().equals("Y")){
		        		if(obj.getRefundid() == 0){
			        		CommanAdvRefund cadv =new CommanAdvRefund();
			        		cadv.setCommonadv_id(obj.getCommonadv_id());
			        		cadv.setTreatmentId(obj.getTreatmentId());
			        		cadv.setCommon_adv_refund_amnt(obj.getActualrefund_amnt());
			        		cadv.setCreatedDate(new Date(new java.util.Date().getTime()));
			        		cadv.setCommon_adv_balnce_amnt(obj.getRemaining_amnt());
			        		cadv.setCreatedBy(userId);
			        		 sessionFactory.getCurrentSession().merge(cadv );
			        	}else if(obj.getRefundid() > 0){

			        		CommanAdvRefund cadv =new CommanAdvRefund();
			        		cadv.setCommon_adv_refund_id(obj.getRefundid());
			        		cadv.setCommonadv_id(obj.getCommonadv_id());
			        		cadv.setTreatmentId(obj.getTreatmentId());
			        		cadv.setCommon_adv_refund_amnt(obj.getActualrefund_amnt());
			        		cadv.setUpdatedBy(userId);
			        		cadv.setCommon_adv_balnce_amnt(obj.getRemaining_amnt());
                            cadv.setUpdatedDate(new Date(new java.util.Date().getTime()));
			        		 sessionFactory.getCurrentSession().merge(cadv );
			        	
			        	}
		        	}
		        	
		        	
		        	obj.setPaidflag("N");
		        	obj.setUpdatedBy(userId);
		        	obj.setDeleted("N");
		        	obj.setUpdatedDate(new Date(new java.util.Date()
							.getTime()));
		        //	obj.setDeduct_amnt(0.0);
		        	/*for(Map<String, Object> row : listCadvc){
			    		
			        	cAdvc=(Double)row.get("common_adv_amnt");
			        	totCAdvc=(Double)row.get("total_common_amnt");	        	
					}        
			       
			        cAdvc=cAdvc+commonadv.getCommonadv_amnt();
			        totCAdvc=totCAdvc+commonadv.getTotal_amnt();
			        
			        commonadv.setCommonadv_amnt(cAdvc); 
			        commonadv.setTotal_amnt(totCAdvc);*/
			        
			}
		        sessionFactory.getCurrentSession().merge(obj);
		        records=1;	
	        }	        
        
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return records;
	}

	@Override
	public List<CommonadvDto> getCommonadv(Integer pID_cID,String callform) {
		
		int pIDcID= pID_cID;
		List<CommonadvDto> listCadv = null;
		List<CommanAdvRefund> listrefund = null;
		try {
			
			RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
            RegTreBillDto rtd = new RegTreBillDto();            
           // int patId=0;
            if(regCon != null){
               
            	rtd=regCon.fetchPatientsRecordByTreatmentId(pID_cID);
               // rtd=rtd.getListRegTreBillDto().get(0);
               // patId=rtd.getPatientId();              
            }	
			
			if(callform.equalsIgnoreCase("printcadv")){
				/*String squery="insert into ehat_common_advance_master(post_flag='Y') ";*/
				//SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
				//query.executeUpdate();
				CommonadvDto commonMaster = (CommonadvDto) sessionFactory
						.getCurrentSession().get(CommonadvDto.class, pID_cID);

				commonMaster.setPostflag("Y");
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(CommonadvDto.class);
				
				
				criteria.add(Restrictions.eq("commonadv_id", pIDcID));
	        	criteria.add(Restrictions.eq("deleted", "N"));
	        	
				criteria.setMaxResults(10);
				listCadv = criteria.list();
				
			}else if(callform.equalsIgnoreCase("opdBill")){
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(CommonadvDto.class);			
				
				criteria.add(Restrictions.eq("patient_ID", pID_cID));
				//criteria.add(Restrictions.eq("treatmentId", pIDcID));
	        	criteria.add(Restrictions.eq("deleted", "N"));
				criteria.setMaxResults(20);
				listCadv = criteria.list();
				
			}else{
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CommonadvDto.class);
			if(pIDcID>0){
				
				criteria.add(Restrictions.eq("patient_ID", pIDcID));
			}
			
        	criteria.add(Restrictions.eq("deleted", "N"));
			criteria.setMaxResults(20);
			listCadv = criteria.list();
			}
			if(!callform.equalsIgnoreCase("opdBill")){
				if(listCadv.size() > 0 ){
					for(CommonadvDto cd : listCadv){
						
						Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(CommanAdvRefund.class);
								criteria.add(Restrictions.eq("treatmentId", cd.getTreatmentId()));
								criteria.add(Restrictions.eq("commonadv_id", cd.getCommonadv_id()));
						       	criteria.add(Restrictions.eq("deleted", "N"));
						listrefund = criteria.list();
						
					}	
				}
			
				
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return listCadv;
		}
		return listCadv;

	}

	@Override
	public int deletecadvmaster(int cadvId,CommonadvDto comm_adv) {
		
		try {
			CommonadvDto cdelete = (CommonadvDto) sessionFactory
					.getCurrentSession().get(CommonadvDto.class, cadvId);
			System.out.println("fdelected iss===="+ cdelete.getDeletedBy());
			cdelete.setDeleted("Y");
			cdelete.setDeletedBy(cdelete.getDeletedBy());
			cdelete.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			cdelete.setDeletedDate(cdelete.getDeletedDate());
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public List<RegTreBillDto> getAllForAutoSummary(String findingName, Integer pid, String callfrom) {
		 
		List<RegTreBillDto> ltPatientRecord = new ArrayList<RegTreBillDto>();
		try {
			/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                   .get(RegistrationDto.class, patientId);*/
			System.err.println("callfrom========"+ callfrom);
			if(callfrom.equals("byname")){
			if(!findingName.equals(null) || !findingName.equals("")){
				SQLQuery que = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT patient_id ,patient_name,department_id,treatment_id FROM patient_records_details where " +
					    		"  patient_name like" + "'%"+ findingName + "%'"+"    group by patient_id  order by patient_id ");
				
				que.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> result = que.list();
				/*Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RegTreBillDto.class);*/
			/*	ProjectionList projectionList = Projections.projectionList();
			    projectionList.add(Projections.groupProperty("patientName"));
			    projectionList.add(Projections.property("patientId"));
			    projectionList.add(Projections.property("treatmentId"));
			    projectionList.add(Projections.property("departmentId"));
			    criteria.setProjection(projectionList);*/
				//criteria.add(Restrictions.like("patientName", "%" + findingName + "%"));
				//	criteria.add(Restrictions.eq("tFlag", "Y"));
				//criteria.addOrder(Order.desc("patientId"));
				//criteria.setMaxResults(autoLimit);
				
					for(Map rs :result ){
						RegTreBillDto obj =new RegTreBillDto();
						obj.setPatientId((Integer)rs.get("patient_id"));
						obj.setPatientName((String)rs.get("patient_name"));
						obj.setTreatmentId((Integer)rs.get("treatment_id"));
						obj.setDepartmentId((Integer)rs.get("department_id"));
						ltPatientRecord.add(obj);
					}
				
			}
			}else{
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RegTreBillDto.class);
					criteria.add(Restrictions.eq("patientId", pid));
				//	criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.addOrder(Order.desc("patientId"));
					criteria.setMaxResults(autoLimit);

				 
					ltPatientRecord = criteria.list();	
				
			}
			
			 
			 

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<CommanadvrecordDTO> getCommonadvrecord(Integer treatmentId,
			String callform) {
		
		int pIDcID= treatmentId;
		List<CommanadvrecordDTO> listCadv = null;
		try {
			
			if(callform.equalsIgnoreCase("printcadv")){ 				
				CommanadvrecordDTO commonMaster = (CommanadvrecordDTO) sessionFactory
						.getCurrentSession().get(CommanadvrecordDTO.class, pIDcID);
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(CommanadvrecordDTO.class);
				
				
				criteria.add(Restrictions.eq("commonadv_id", pIDcID));
	        	criteria.add(Restrictions.eq("deleted", "N"));	        	
				criteria.setMaxResults(10);
				listCadv = criteria.list();
				
			}else if(callform.equalsIgnoreCase("opdBill")){
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(CommanadvrecordDTO.class);			
					
				criteria.add(Restrictions.eq("treatmentId", pIDcID));			
	        	criteria.add(Restrictions.eq("deleted", "N"));
				criteria.setMaxResults(20);
				listCadv = criteria.list();
				
			}else{
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CommanadvrecordDTO.class);
			if(pIDcID>0){
				
				criteria.add(Restrictions.eq("patient_ID", pIDcID));
			}
			
        	criteria.add(Restrictions.eq("deleted", "N"));
			criteria.setMaxResults(20);
			listCadv = criteria.list();
			}

		} catch (Exception e) {
			e.printStackTrace();
			return listCadv;
		}
		return listCadv;

	}

	@Override
	public int saveDoctorRoundCharg(DoctorRoundCharg drround,
			HttpServletRequest request) {int records=0;
			Double cAdvc=0.0,totCAdvc=0.0;
			System.err.println("hiiii............"+drround.getLstDocroundDetails());
			try {
				// sessionFactory.getCurrentSession().merge(commonadv);
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				for (DoctorRoundCharg  obj : drround.getLstDocroundDetails()) {
					DoctorRoundCharg  obj1 =new  DoctorRoundCharg();
					obj1.setCreatedBy(userId);
					obj.setCreatedDate(new Date(new java.util.Date()
					.getTime()));
					sessionFactory.getCurrentSession().merge(obj);
			        records=1;	
				}	        
	        
			}catch (Exception e) {
				e.printStackTrace();
				return 0;
			}
			return records;
			
	}
	
	@Override
	public List<DoctorRoundCharg> getDrhallcharg(Integer drid, String callform, Integer spId) {
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");

		String hallIdss    =(String) resourceBundleEhat.getString("hallId");
		Integer hallIdEhat = Integer.parseInt(hallIdss);
		List<DoctorRoundCharg> listDoctorRoundCharg = new ArrayList<DoctorRoundCharg>();
		try {
			
			if(callform.equalsIgnoreCase("Hall")){
				/*String squery="insert into ehat_common_advance_master(post_flag='Y') ";*/
				//SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
				//query.executeUpdate();
				
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(DoctorRoundCharg.class);			
				criteria.add(Restrictions.eq("dr_id", drid));
				criteria.add(Restrictions.eq("drflag", "H"));
	        //	criteria.setMaxResults(10);
	        	listDoctorRoundCharg = criteria.list();
				
			}else{

				/*String squery="insert into ehat_common_advance_master(post_flag='Y') ";*/
				//SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
				//query.executeUpdate();
				
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(DoctorRoundCharg.class);
				criteria.add(Restrictions.eq("dr_id", drid));
				criteria.add(Restrictions.eq("sponser_id", spId));
				criteria.add(Restrictions.eq("drflag", "S"));
	        //	criteria.setMaxResults(10);
				List<DoctorRoundCharg> 	listDoctorRound =(List<DoctorRoundCharg>) criteria.list();
				for(DoctorRoundCharg drr : listDoctorRound){
					DoctorRoundCharg drr1 =new DoctorRoundCharg();
					Integer sponserid= drr.getSponser_id();
					
					SQLQuery que = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT category_name FROM ehat_charges_master_slave where " +
						    		"  deleted='N'  and  selfId ="+ sponserid +" and id="+ drr.getSponserslave_id() + " "
							);
					String sponsername =  (String) que.uniqueResult();
					drr1.setSponsername(sponsername);
					drr1.setDr_id(drr.getDr_id());
					drr1.setDr_amnt(drr.getDr_amnt());
					drr1.setSponser_id(sponserid);
					drr1.setDrchargesid(drr.getDrchargesid());
					drr1.setSponserslave_id(drr.getSponserslave_id());
					if(drr.getHallslave_id() > 0){

						SQLQuery que1 = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT id FROM ehat_charges_master_slave where  " +
							    		"  deleted='N'  and  charges_master_id ="+ hallIdEhat +" and selfId="+ 0 + " and isCategory='Y' and id="+ drr.getHallslave_id() +""
								);
					
						Integer hallsalveid	=  (Integer) que1.uniqueResult();	
					
						drr1.setHallslave_id(hallsalveid);
					}else{
						
						drr1.setHallslave_id(drr.getHallslave_id());
					}
					drr1.setHall_id(drr.getHall_id());
					listDoctorRoundCharg.add(drr1);
				}
			
			}
		} catch (Exception e) {
			e.printStackTrace();
			return listDoctorRoundCharg;
		}
		return listDoctorRoundCharg;

	}

	@Override
	public List<DoctorRoundCharg> getDrhallchargNew(Integer drid, String callform, Integer spId) {
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");

		String hallIdss = (String) resourceBundleEhat.getString("hallId");
		Integer hallIdEhat = Integer.parseInt(hallIdss);
		List<DoctorRoundCharg> listDoctorRoundCharg = new ArrayList<DoctorRoundCharg>();
		List<DoctorRoundCharg> newList =new ArrayList<DoctorRoundCharg>();
		try {

			if (callform.equalsIgnoreCase("Hall")) {
				/* String squery="insert into ehat_common_advance_master(post_flag='Y') "; */
				// SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
				// query.executeUpdate();

				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundCharg.class);
				criteria.add(Restrictions.eq("dr_id", drid));
				criteria.add(Restrictions.eq("drflag", "H"));
				// criteria.setMaxResults(10);
				listDoctorRoundCharg = criteria.list();
				return listDoctorRoundCharg;

			} else {

				/* String squery="insert into ehat_common_advance_master(post_flag='Y') "; */
				// SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
				// query.executeUpdate();

				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundCharg.class);
				criteria.add(Restrictions.eq("dr_id", drid));
				criteria.add(Restrictions.eq("sponser_id", spId));
				criteria.add(Restrictions.eq("drflag", "S"));
				criteria.addOrder(Order.asc("drchargesid"));
				// criteria.setMaxResults(10);
				List<DoctorRoundCharg> listDoctorRound = (List<DoctorRoundCharg>) criteria.list();
				List<ChargesMasterSlave> chargesMasterSlavesList = new ArrayList<ChargesMasterSlave>();
				int hallSize = 0;
				try {
					criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
					criteria.add(Restrictions.eq("deleted", "N"));
					criteria.add(Restrictions.eq("selfId", 0));
					criteria.add(Restrictions.eq("isCategory", "Y"));
					criteria.add(Restrictions.eq("chargesMasterDto", hallIdEhat));
					criteria.addOrder(Order.asc("slaveId"));
					chargesMasterSlavesList = criteria.list();
					hallSize = chargesMasterSlavesList.size();
					

				} catch (Exception e) {
					e.printStackTrace();
					// return ltChargesSlave;
				}
				
				criteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundCharg.class);
				criteria.add(Restrictions.eq("dr_id", drid));
				criteria.add(Restrictions.eq("sponser_id", spId));
				criteria.add(Restrictions.eq("drflag", "S"))
				.setProjection(Projections.groupProperty("hallslave_id"));
				// criteria.setMaxResults(10);
				int size = criteria.list().size();
				
				
				
				

				for (DoctorRoundCharg drr : listDoctorRound) {
					DoctorRoundCharg drr1 = new DoctorRoundCharg();
					Integer sponserid = drr.getSponser_id();

					SQLQuery que = sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT category_name FROM ehat_charges_master_slave where "
									+ "  deleted='N'  and  selfId =" + sponserid + " and id=" + drr.getSponserslave_id()
									+ " ");
					String sponsername = (String) que.uniqueResult();
					drr1.setSponsername(sponsername);
					drr1.setDr_id(drr.getDr_id());
					drr1.setDr_amnt(drr.getDr_amnt());
					drr1.setSponser_id(sponserid);
					drr1.setDrchargesid(drr.getDrchargesid());
					drr1.setSponserslave_id(drr.getSponserslave_id());
					if (drr.getHallslave_id() > 0) {

						SQLQuery que1 = sessionFactory.getCurrentSession()
								.createSQLQuery("SELECT id FROM ehat_charges_master_slave where  "
										+ "  deleted='N'  and  charges_master_id =" + hallIdEhat + " and selfId=" + 0
										+ " and isCategory='Y' and id=" + drr.getHallslave_id() + "");

						Integer hallsalveid = (Integer) que1.uniqueResult();

						drr1.setHallslave_id(hallsalveid);
					} else {

						drr1.setHallslave_id(drr.getHallslave_id());
					}
					drr1.setHall_id(drr.getHall_id());
					listDoctorRoundCharg.add(drr1);
				}

				hallSize = hallSize + 3;
				List<List<DoctorRoundCharg>> partitionObjects = partitionArrayList(listDoctorRound, size);
				
				for (int k=0;k<partitionObjects.size();k++) {
						
				if(hallSize>size) {
					
					List<ChargesMasterSlave> collect = chargesMasterSlavesList.stream().skip(size-3).collect(Collectors.toList());
					int remainingSize = hallSize-size;
					for (int i = 0; i < collect.size(); i++) {
						
						DoctorRoundCharg drr1 = new DoctorRoundCharg();
						drr1.setDr_id(partitionObjects.get(k).get(0).getDr_id());
						drr1.setDr_amnt(0);
						drr1.setSponser_id(partitionObjects.get(k).get(0).getSponser_id());
						drr1.setDrchargesid(0);
						
						drr1.setSponserslave_id(partitionObjects.get(k).get(0).getSponserslave_id());
						drr1.setHallslave_id(collect.get(i).getSlaveId());
						partitionObjects.get(k).add(drr1);
						
					}
					newList.addAll(partitionObjects.get(k));
				}
				else {
					
					return listDoctorRoundCharg;
				}
					
					
					//
					
				}
				System.out.println(partitionObjects);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return listDoctorRoundCharg;
		}
		return newList;

	}
	
	public static <T> List<List<T>> partitionArrayList(List<T> inputList, int partitionSize) {
        if (inputList == null || inputList.isEmpty() || partitionSize <= 0) {
            throw new IllegalArgumentException("Invalid input");
        }

        List<List<T>> partitions = new ArrayList<>();
        int size = inputList.size();

        for (int i = 0; i < size; i += partitionSize) {
            int end = Math.min(size, i + partitionSize);
            partitions.add(new ArrayList<>(inputList.subList(i, end)));
        }

        return partitions;
    }
	
	private static <T> List<List<T>> partitionObjects(List<T> inputList, int partitionSize) {
        List<List<T>> partitions = new ArrayList<>();
        Set<T> distinctSet = new HashSet<>();

        for (T obj : inputList) {
            if (distinctSet.size() < partitionSize) {
                distinctSet.add(obj);
            }

            if (distinctSet.size() == partitionSize) {
                partitions.add(new ArrayList<>(distinctSet));
                distinctSet.clear();
            }
        }

        return partitions;
    }

	@Override
	public List<CommanAdvRefund> getCommonadvrefund(
			List<CommanadvrecordDTO> lstCommonadv) {
		
		List<CommanAdvRefund> listrefund = new ArrayList<CommanAdvRefund>();
		List<CommanAdvRefund> listrefundall = null;
		try {
			
	
				if(lstCommonadv.size() > 0 ){
					for(CommanadvrecordDTO cd : lstCommonadv){
						
						Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(CommanAdvRefund.class);
								criteria.add(Restrictions.eq("treatmentId", cd.getTreatmentId()));
								criteria.add(Restrictions.eq("commonadv_id", cd.getCommonadv_id()));
						       	criteria.add(Restrictions.eq("deleted", "N"));
						       	listrefundall = criteria.list();
						       	for(CommanAdvRefund cdr:listrefundall){
						       		CommanAdvRefund obj = new CommanAdvRefund();
						       		obj.setCommon_adv_refund_id(cdr.getCommon_adv_refund_id());
						       		obj.setCommon_adv_refund_amnt(cdr.getCommon_adv_refund_amnt());
						       		obj.setCommonadv_id(cdr.getCommonadv_id());
						       		listrefund.add(obj);
						       		
						       	}
					}	
				}
				
		} catch (Exception e) {
			e.printStackTrace();
			return listrefund;
		}
		return listrefund;

	}

	@Override
	public int deletecadvrefund(Integer cadvId, Integer refundid,
			Double cdammunt, Double blamnt,Double totalrefund,HttpServletRequest request) {
		int result=0;
		Double refundamount=0.0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			if(cdammunt!=null  ){
				refundamount = cdammunt + blamnt;
				System.err.println("cdammunt=====" + cdammunt);
			}
			if(totalrefund !=null){
				totalrefund =totalrefund - cdammunt;
			}
			 Query update = sessionFactory
						.getCurrentSession()
						.createQuery("update CommanAdvRefund c set c.deleted=?,c.deletedBy=?,c.deletedDate=? where c.common_adv_refund_id=?");
			 update.setParameter(0, "Y");
			 update.setParameter(1, userId);
			 update.setParameter(2, new Date(new java.util.Date().getTime()));
			 update.setParameter(3, refundid);
			 result = update.executeUpdate();
			 Query updatecdav = sessionFactory	.getCurrentSession().createQuery("update CommonadvDto c set c.remaining_amnt=? ,c.refund_amnt=?,c.updatedBy=? ,updatedDate=?  where c.commonadv_id=?");
			 updatecdav.setParameter(0, refundamount);
			 updatecdav.setParameter(1, totalrefund);
			 updatecdav.setParameter(2, userId);
			 updatecdav.setParameter(3, new Date(new java.util.Date().getTime()));
			 updatecdav.setParameter(4, cadvId);
			 updatecdav.executeUpdate();
		
		} catch (Exception e) {
			e.printStackTrace();
			return result;
		}
		return result;
	}

	@Override
	public List<CommanAdvRefund> getcommanadvrefundlist(Integer refundID) {
		
	
		List<CommanAdvRefund> listrefundall = null;
		try {
			
	
				if(refundID > 0 ){
				
						
						Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(CommanAdvRefund.class);
								criteria.add(Restrictions.eq("common_adv_refund_id",refundID));
						       	criteria.add(Restrictions.eq("deleted", "N"));
						       	listrefundall = criteria.list();
						   
					
				}
				
		} catch (Exception e) {
			e.printStackTrace();
			return listrefundall;
		}
		return listrefundall;

	}
	
	@Override
	public int saveConsultationCharges(ConsultationChargesDto drround,HttpServletRequest request) {
		
		int records=0;
		Double cAdvc=0.0,totCAdvc=0.0;
		try {
			// sessionFactory.getCurrentSession().merge(commonadv);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer uId = (Integer) session.getAttribute("uId");
			BigInteger unitId = BigInteger.valueOf(uId);
			for (ConsultationChargesDto  obj : drround.getLstDocroundDetails()) {
				
				obj.setDeleted("N");
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				obj.setCreatedDate(new Date(new java.util.Date().getTime()));
				sessionFactory.getCurrentSession().merge(obj);
		        records=1;	
			}	        
        
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return records;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ConsultationChargesDto> getConsulthallcharg(Integer drid, String callform,Integer spId,HttpServletRequest request) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String hallIdss = (String) resourceBundleEhat.getString("hallId");
		Integer hallIdEhat = Integer.parseInt(hallIdss);
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			
			Session s = sessionFactory.getCurrentSession();				
			Query consultSp = s.createSQLQuery("call sp_get_consulation_charges_master(:p_unit_id, :p_doctor_id, :p_sponsor_id, :p_dr_flag, :hallId)");//s.createStoredProcedureQuery("sp_get_dropdown_list_by_prefix_name", PrefixDto.class);
			consultSp.setParameter("p_unit_id", unitId);
			if(spId > 0)
				consultSp.setParameter("p_dr_flag", "S");
			else
				consultSp.setParameter("p_dr_flag", "H");
			consultSp.setParameter("p_doctor_id", drid);
			consultSp.setParameter("p_sponsor_id", spId);
			consultSp.setParameter("hallId", hallIdEhat);
			consultSp.setResultTransformer(new AliasToBeanResultTransformer(ConsultationChargesDto.class));
			@SuppressWarnings("unchecked")
			List<ConsultationChargesDto> listDoctorRoundCharg = consultSp.list();	
			
			
			 
			for (ConsultationChargesDto consultationChargesDto : listDoctorRoundCharg) {
				
				int slaveId = consultationChargesDto.getHallslave_id().intValue();
				if((!consultationChargesDto.getCategoryName().equalsIgnoreCase("Default Charges")) && slaveId==0) {
					
					List<ChargesMasterSlave> list = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class)
					.add(Restrictions.eq("categoryName", consultationChargesDto.getCategoryName()))
					.add(Restrictions.eq("selfId", 0))
					.add(Restrictions.eq("deleted", "N")).list();
					
					if(list.size()==1) {
						
						BigInteger hallSlaveId = BigInteger.valueOf(list.get(0).getSlaveId());
						consultationChargesDto.setHallslave_id(hallSlaveId);
					}
					
				}
			}
			
			return listDoctorRoundCharg;
			
			/* if(callform.equalsIgnoreCase("Hall")){
				//String squery="insert into ehat_common_advance_master(post_flag='Y') ";
				//SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
				//query.executeUpdate();
				
				
				Criteria criteria = sessionFactory.getCurrentSession() 
						.createCriteria(ConsultationChargesDto.class);			
				criteria.add(Restrictions.eq("dr_id", drid)); 
				criteria.add(Restrictions.eq("drflag", "H")); 
	        //	criteria.setMaxResults(10);
	        	listDoctorRoundCharg = criteria.list();
				
			}else{

				//String squery="insert into ehat_common_advance_master(post_flag='Y') ";
				//SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
				//query.executeUpdate();
				
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ConsultationChargesDto.class);
				criteria.add(Restrictions.eq("dr_id", drid));
				criteria.add(Restrictions.eq("sponser_id", spId));
				criteria.add(Restrictions.eq("drflag", "S"));
	        //	criteria.setMaxResults(10);
				List<ConsultationChargesDto> 	listDoctorRound =(List<ConsultationChargesDto>) criteria.list();
				for(ConsultationChargesDto drr : listDoctorRound){
					ConsultationChargesDto drr1 =new ConsultationChargesDto();
					Integer sponserid= drr.getSponser_id();
					
					SQLQuery que = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT category_name FROM ehat_charges_master_slave where " +
						    		"  deleted='N'  and  selfId ="+ sponserid +" and id="+ drr.getSponserslave_id() + " "
							);
					String sponsername =  (String) que.uniqueResult();
					drr1.setSponsername(sponsername);
					drr1.setDr_id(drr.getDr_id());
					drr1.setConsultAmnt(drr.getConsultAmnt());
					drr1.setConsultWeekendAmnt(drr.getConsultWeekendAmnt());
					drr1.setFollowupAmnt(drr.getFollowupAmnt());
					drr1.setFollowWeekendAmnt(drr.getFollowWeekendAmnt());
					drr1.setSponser_id(sponserid);
					drr1.setDrchargesid(drr.getDrchargesid());
					drr1.setSponserslave_id(drr.getSponserslave_id());
					if(drr.getHallslave_id() > 0){

						SQLQuery que1 = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT id FROM ehat_charges_master_slave where  " +
							    		"  deleted='N'  and  charges_master_id ="+ hallIdEhat +" and selfId="+ 0 + " and isCategory='Y' and id="+ drr.getHallslave_id() +""
								);
					
						Integer hallsalveid	=  (Integer) que1.uniqueResult();	
					
						drr1.setHallslave_id(hallsalveid);
					}else{
						
						drr1.setHallslave_id(drr.getHallslave_id());
					}
					drr1.setHall_id(drr.getHall_id());
					listDoctorRoundCharg.add(drr1);
				} */
			
			//}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	@Transactional
	public List<Doctor> viewDoctors(String date, String docType,
			Integer drDeptId) {
		// TODO Auto-generated method stub
		
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String todays_date = formatter.format(currentDate.getTime());
		List<Doctor> arrDoctor = null;		
		String doctype = "";		
		if(docType.equals("doc")){
			doctype = "'doctor'";
			
		}
		/*else if(docType.equals("rmo")){
			doctype = "'rmo','visitingdoctor'";
			
		}else if(docType.equals("visitingdoctor")){
			doctype = "'visitingdoctor'";
			
		}else if(docType.equals("anesthetist")){
			doctype = "'anesthetist'";
			
		}
		*/else{
			doctype = "'doctor'";
		}
		
		String hql = "from Doctor where status='Y' and doc_Type in("+doctype+")";		
		Query query = sessionFactory.getCurrentSession().createQuery(hql);		
		
		if(drDeptId > 0){
			String drDeptIdStr = String.valueOf(drDeptId);
			hql += " and specialisation=:drDeptId";
			query = sessionFactory.getCurrentSession().createQuery(hql);
			query.setParameter("doctype", doctype);
			query.setParameter("status", "Y");
			query.setParameter("drDeptId", String.valueOf(drDeptId));
		}

		List<Doctor> doctorList = query.list();
		
		String hqlbday = "from Blockdoctorappointment  where date=:date";
		Query queryForhqlbday = sessionFactory.getCurrentSession().createQuery(hqlbday);
		queryForhqlbday.setParameter("date",date);
		List<Blockdoctorappointment> bdayList = queryForhqlbday.list();
		
		arrDoctor = fetchdoctorDetails1(doctorList, bdayList);
		
		return arrDoctor;
	}
	public List<Doctor> fetchdoctorDetails1(
			List<Doctor> doctorList,
			List<Blockdoctorappointment> bdayList) {

		List<Doctor> arrDoctor = new ArrayList<Doctor>();
		for (Doctor rs : doctorList) {
			int flag = 0;
			Doctor objdoctorDetails = new Doctor();
			for (Blockdoctorappointment rs2 : bdayList) {
				if ( rs.getDoctor_ID()==  rs2.getDoctor_id()) {
					flag = 1;
					break;

				} else {

				}
			}
			if (flag != 1) {
				objdoctorDetails.setAddress(rs.getAddress());
				objdoctorDetails.setDoc_name(rs.getDoc_name());
				objdoctorDetails.setDoc_Type(rs.getDoc_Type());
				objdoctorDetails.setDepartment(rs.getDepartment());
				objdoctorDetails.setDoctor_ID(rs.getDoctor_ID());
				objdoctorDetails.setEducation(rs.getEducation());
				objdoctorDetails.setEmail_Id(rs.getEmail_Id());
				objdoctorDetails.setMobileNo(rs.getMobileNo());
				objdoctorDetails.setSpecialisation(rs.getSpecialisation());
				objdoctorDetails.setQualification(rs.getQualification());
				objdoctorDetails.setDesignation(rs.getDesignation());
				objdoctorDetails.setRegNo(rs.getRegNo());
				objdoctorDetails.setUser_ID(rs.getUser_ID());
				arrDoctor.add(objdoctorDetails);
			}

		}

		return arrDoctor;

	}
	
	
	@Override
	public List<RegistrationCharges> getReghallchargNew(Integer drid, String callform, Integer spId) {
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");

		String hallIdss = (String) resourceBundleEhat.getString("hallId");
		Integer hallIdEhat = Integer.parseInt(hallIdss);
		List<RegistrationCharges> listDoctorRoundCharg = new ArrayList<RegistrationCharges>();
		List<RegistrationCharges> newList =new ArrayList<RegistrationCharges>();
		try {

			if (callform.equalsIgnoreCase("Hall")) {
				/* String squery="insert into ehat_common_advance_master(post_flag='Y') "; */
				// SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
				// query.executeUpdate();

				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegistrationCharges.class);
				//    criteria.add(Restrictions.eq("dr_id", drid));
				criteria.add(Restrictions.eq("drflag", "H"));
				// criteria.setMaxResults(10);
				listDoctorRoundCharg = criteria.list();
				return listDoctorRoundCharg;

			} else {

				/* String squery="insert into ehat_common_advance_master(post_flag='Y') "; */
				// SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
				// query.executeUpdate();

				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegistrationCharges.class);
				       //criteria.add(Restrictions.eq("dr_id", drid));
				criteria.add(Restrictions.eq("sponser_id", spId));
				criteria.add(Restrictions.eq("drflag", "S"));
				criteria.addOrder(Order.asc("drchargesid"));
				// criteria.setMaxResults(10);
				List<RegistrationCharges> listDoctorRound = (List<RegistrationCharges>) criteria.list();
				List<ChargesMasterSlave> chargesMasterSlavesList = new ArrayList<ChargesMasterSlave>();
				int hallSize = 0;
				try {
					criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
					criteria.add(Restrictions.eq("deleted", "N"));
					criteria.add(Restrictions.eq("selfId", 0));
					criteria.add(Restrictions.eq("isCategory", "Y"));
					criteria.add(Restrictions.eq("chargesMasterDto", hallIdEhat));
					criteria.addOrder(Order.asc("slaveId"));
					chargesMasterSlavesList = criteria.list();
					hallSize = chargesMasterSlavesList.size();
					

				} catch (Exception e) {
					e.printStackTrace();
					// return ltChargesSlave;
				}
				
				criteria = sessionFactory.getCurrentSession().createCriteria(RegistrationCharges.class);
				            //criteria.add(Restrictions.eq("dr_id", drid));
				criteria.add(Restrictions.eq("sponser_id", spId));
				criteria.add(Restrictions.eq("drflag", "S"))
				.setProjection(Projections.groupProperty("hallslave_id"));
				// criteria.setMaxResults(10);
				int size = criteria.list().size();
				
				
				
				

				for (RegistrationCharges drr : listDoctorRound) {
					RegistrationCharges drr1 = new RegistrationCharges();
					Integer sponserid = drr.getSponser_id();

					SQLQuery que = sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT category_name FROM ehat_charges_master_slave where "
									+ "  deleted='N'  and  selfId =" + sponserid + " and id=" + drr.getSponserslave_id()
									+ " ");
					String sponsername = (String) que.uniqueResult();
					drr1.setSponsername(sponsername);
					drr1.setDr_id(drr.getDr_id());
					drr1.setDr_amnt(drr.getDr_amnt());
					drr1.setSponser_id(sponserid);
					drr1.setDrchargesid(drr.getDrchargesid());
					drr1.setSponserslave_id(drr.getSponserslave_id());
					if (drr.getHallslave_id() > 0) {

						SQLQuery que1 = sessionFactory.getCurrentSession()
								.createSQLQuery("SELECT id FROM ehat_charges_master_slave where  "
										+ "  deleted='N'  and  charges_master_id =" + hallIdEhat + " and selfId=" + 0
										+ " and isCategory='Y' and id=" + drr.getHallslave_id() + "");

						Integer hallsalveid = (Integer) que1.uniqueResult();

						drr1.setHallslave_id(hallsalveid);
					} else {

						drr1.setHallslave_id(drr.getHallslave_id());
					}
					drr1.setHall_id(drr.getHall_id());
					listDoctorRoundCharg.add(drr1);
				}

				hallSize = hallSize + 3;
				List<List<RegistrationCharges>> partitionObjects = partitionArrayList(listDoctorRound, size);
				
				for (int k=0;k<partitionObjects.size();k++) {
						
				if(hallSize>size) {
					
					List<ChargesMasterSlave> collect = chargesMasterSlavesList.stream().skip(size-3).collect(Collectors.toList());
					int remainingSize = hallSize-size;
					for (int i = 0; i < collect.size(); i++) {
						
						RegistrationCharges drr1 = new RegistrationCharges();
						drr1.setDr_id(partitionObjects.get(k).get(0).getDr_id());
						drr1.setDr_amnt(0);
						drr1.setSponser_id(partitionObjects.get(k).get(0).getSponser_id());
						drr1.setDrchargesid(0);
						
						drr1.setSponserslave_id(partitionObjects.get(k).get(0).getSponserslave_id());
						drr1.setHallslave_id(collect.get(i).getSlaveId());
						partitionObjects.get(k).add(drr1);
						
					}
					newList.addAll(partitionObjects.get(k));
				}
				else {
					
					return listDoctorRoundCharg;
				}
					
					
					//
					
				}
				System.out.println(partitionObjects);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return listDoctorRoundCharg;
		}
		return newList;

	}

	
	@Override
	public int saveDoctorRoundChargReg(RegistrationCharges drround,
			HttpServletRequest request) {int records=0;
			Double cAdvc=0.0,totCAdvc=0.0;
			System.err.println("hiiii............"+drround.getLstDocroundDetails());
			try {
				// sessionFactory.getCurrentSession().merge(commonadv);
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				for (RegistrationCharges  obj : drround.getLstDocroundDetails()) {
					
					
					Query update = sessionFactory
							.getCurrentSession()
							.createQuery(
									"delete from RegistrationCharges where sponser_id= :sponser_id  and sponserslave_id= :sponserslave_id and hallslave_id= :hallslave_id ");

					update.setParameter("sponser_id", obj.getSponser_id());
					update.setParameter("sponserslave_id", obj.getSponserslave_id());

					update.setParameter("hallslave_id", obj.getHallslave_id());

					update.executeUpdate();
					
					RegistrationCharges  obj1 =new  RegistrationCharges();
					obj.setCreatedBy(userId);
					obj.setCreatedDate(new Date(new java.util.Date()
					.getTime()));
					sessionFactory.getCurrentSession().merge(obj);
			        records=1;	
				}	        
	        
			}catch (Exception e) {
				e.printStackTrace();
				return 0;
			}
			return records;
			
	}
	@Override
	public List<CommanadvrecordDTO> getcommanadvrecordPost(Integer commanAdvId,
			String callform) {
		
		int pIDcID= commanAdvId;
		List<CommanadvrecordDTO> listCadv = null;
		try {
			
			if(callform.equalsIgnoreCase("postCadv")){ 				
				CommanadvrecordDTO commonMaster = (CommanadvrecordDTO) sessionFactory
						.getCurrentSession().get(CommanadvrecordDTO.class, pIDcID);
				
				String squery="UPDATE ehat_common_advance_master SET `post_flag`='Y' WHERE `common_adv_id`='"+pIDcID+"'";
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
				query.executeUpdate();
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(CommanadvrecordDTO.class);
				
				
				criteria.add(Restrictions.eq("commonadv_id", pIDcID));
	        	criteria.add(Restrictions.eq("deleted", "N"));	        	
				criteria.setMaxResults(10);
				listCadv = criteria.list();
			
			}
		} catch (Exception e) {
			e.printStackTrace();
			return listCadv;
		}
		return listCadv;

	}
	
	

@Override
public List<ChargesMasterSlave> getChragesSlaveByIddr(Integer masterId,
		String selfIds) {
	List<ChargesMasterSlave> ltChargesSlave = null;

	try {
		//Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
		//criteria.add(Restrictions.eq("deleted", "N"));

		// conditions check with criteria for fetching proper list
		//criteria.add(Restrictions.eq("chargesMasterDto", masterId));
		//criteria.add(Restrictions.eq("selfId", selfIds));
		//criteria.add(Restrictions.eq("slaveId", selfId));
	//	criteria.add(Restrictions.eq("isCategory", "N"));
		/*if(selfId == 0){
			criteria.add(Restrictions.eq("isCategory", "Y"));
		}*/
		//ltChargesSlave = criteria.list();
		
		String sql = "select id AS slaveId, category_name AS categoryName,charges_master_id as chargesMasterDto,code_name as codeName,deleted as deleted,\n" + 
				" isCategory as isCategory,selfId as selfId from ehat_charges_master_slave "
				+" where  deleted='N' " ;
       
		if(selfIds.equals("")) {
			sql = sql + " and isCategory='N' and selfId ="+masterId;
		}else {
		    sql = sql + " and isCategory='N' and id in ("+selfIds+") ";
		}
		
		Query querySp =  sessionFactory.getCurrentSession().createSQLQuery(sql);
		
		querySp.setResultTransformer(new AliasToBeanResultTransformer(ChargesMasterSlave.class));
		
		@SuppressWarnings("unchecked")
		List<ChargesMasterSlave> ltChargesSlave1 = querySp.list();	
		
		ltChargesSlave = ltChargesSlave1;
		//objReg.setLstChargesSlave(ltCMSlave);
		

	} catch (Exception e) {
		e.printStackTrace();
		return ltChargesSlave;
	}
	return ltChargesSlave;
}

@Override
public List<RegistrationCharges> getRegistrationMasterhallcharg(Integer sponserid, String callform, String spId) {
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");

	String hallIdss = (String) resourceBundleEhat.getString("hallId");
	Integer hallIdEhat = Integer.parseInt(hallIdss);
	List<RegistrationCharges> listDoctorRoundCharg = new ArrayList<RegistrationCharges>();
	List<RegistrationCharges> newList =new ArrayList<RegistrationCharges>();
	try {

		if (callform.equalsIgnoreCase("Hall")) {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegistrationCharges.class);
			criteria.add(Restrictions.eq("drflag", "H"));
			listDoctorRoundCharg = criteria.list();
			return listDoctorRoundCharg;

		} else {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegistrationCharges.class);
			criteria.add(Restrictions.eq("sponser_id", sponserid));
			criteria.add(Restrictions.eq("drflag", "S"));
			criteria.addOrder(Order.asc("drchargesid"));
			List<RegistrationCharges> listDoctorRound = (List<RegistrationCharges>) criteria.list();
			List<ChargesMasterSlave> chargesMasterSlavesList = new ArrayList<ChargesMasterSlave>();
			int hallSize = 0;
			try {
				criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("selfId", 0));
				criteria.add(Restrictions.eq("isCategory", "Y"));
				criteria.add(Restrictions.eq("chargesMasterDto", hallIdEhat));
				criteria.addOrder(Order.asc("slaveId"));
				chargesMasterSlavesList = criteria.list();
				hallSize = chargesMasterSlavesList.size();
				

			} catch (Exception e) {
				e.printStackTrace();
				// return ltChargesSlave;
			}
			
			criteria = sessionFactory.getCurrentSession().createCriteria(RegistrationCharges.class);
			criteria.add(Restrictions.eq("sponser_id", sponserid));
			criteria.add(Restrictions.eq("drflag", "S"))
			.setProjection(Projections.groupProperty("hallslave_id"));
			int size = criteria.list().size();
			
			for (RegistrationCharges drr : listDoctorRound) {
				RegistrationCharges drr1 = new RegistrationCharges();
				Integer sponserid1 = drr.getSponser_id();

				SQLQuery que = sessionFactory.getCurrentSession()
						.createSQLQuery("SELECT category_name FROM ehat_charges_master_slave where "
								+ "  deleted='N'  and  selfId =" + sponserid1 + " and id=" + drr.getSponserslave_id()
								+ " ");
				String sponsername = (String) que.uniqueResult();
				drr1.setSponsername(sponsername);
				drr1.setDr_id(drr.getDr_id());
				drr1.setDr_amnt(drr.getDr_amnt());
				drr1.setSponser_id(sponserid1);
				drr1.setDrchargesid(drr.getDrchargesid());
				drr1.setSponserslave_id(drr.getSponserslave_id());
				if (drr.getHallslave_id() > 0) {

					SQLQuery que1 = sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT id FROM ehat_charges_master_slave where  "
									+ "  deleted='N'  and  charges_master_id =" + hallIdEhat + " and selfId=" + 0
									+ " and isCategory='Y' and id=" + drr.getHallslave_id() + "");

					Integer hallsalveid = (Integer) que1.uniqueResult();

					drr1.setHallslave_id(hallsalveid);
				} else {

					drr1.setHallslave_id(drr.getHallslave_id());
				}
				drr1.setHall_id(drr.getHall_id());
				listDoctorRoundCharg.add(drr1);
			}

			hallSize = hallSize + 3;
			List<List<RegistrationCharges>> partitionObjects = partitionArrayList(listDoctorRound, size);
			
			for (int k=0;k<partitionObjects.size();k++) {
					
			if(hallSize>size) {
				
				List<ChargesMasterSlave> collect = chargesMasterSlavesList.stream().skip(size-3).collect(Collectors.toList());
				int remainingSize = hallSize-size;
				for (int i = 0; i < collect.size(); i++) {
					
					RegistrationCharges drr1 = new RegistrationCharges();
					drr1.setDr_id(partitionObjects.get(k).get(0).getDr_id());
					drr1.setDr_amnt(0);
					drr1.setSponser_id(partitionObjects.get(k).get(0).getSponser_id());
					drr1.setDrchargesid(0);
					
					drr1.setSponserslave_id(partitionObjects.get(k).get(0).getSponserslave_id());
					drr1.setHallslave_id(collect.get(i).getSlaveId());
					partitionObjects.get(k).add(drr1);
					
				}
				newList.addAll(partitionObjects.get(k));
			}
			else {
				
				return listDoctorRoundCharg;
			}	
		 }
			System.out.println(partitionObjects);
		}
	} catch (Exception e) {
		e.printStackTrace();
		return listDoctorRoundCharg;
	}
	return newList;

}

@Override
public List<ChargesMasterSlave> getChragesSlaveByIddrConsultation(Integer masterId,
		String selfIds) {
	List<ChargesMasterSlave> ltChargesSlave = null;

	try {
		String sql = "select id AS slaveId, category_name AS categoryName,charges_master_id as chargesMasterDto,code_name as codeName,deleted as deleted,\n" + 
				" isCategory as isCategory,selfId as selfId from ehat_charges_master_slave "
				+" where  deleted='N' " ;
       
		//if(selfIds.equals("")) {
			sql = sql + " and isCategory='N' and selfId ="+masterId;
		/*}else {
		    sql = sql + " and isCategory='N' and id in ("+selfIds+") ";
		}*/
		
		Query querySp =  sessionFactory.getCurrentSession().createSQLQuery(sql);
		
		querySp.setResultTransformer(new AliasToBeanResultTransformer(ChargesMasterSlave.class));
		
		@SuppressWarnings("unchecked")
		List<ChargesMasterSlave> ltChargesSlave1 = querySp.list();	
		
		ltChargesSlave = ltChargesSlave1;
		//objReg.setLstChargesSlave(ltCMSlave);
		

	} catch (Exception e) {
		e.printStackTrace();
		return ltChargesSlave;
	}
	return ltChargesSlave;
}

}
