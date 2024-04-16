package com.hms.ehat.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.PhysicalDischargeDao;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.IpdPhysicalDischargedPatientsDTO;

@Repository
public class PhysicalDischargeDaoImpl implements PhysicalDischargeDao {
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public synchronized int updatePhysicalDischarge(Integer tID, TreatmentDto teatDtoObj,BillDetailsIpdDto billDtoObj, HttpServletRequest request) {
		try{			
			/*Query beti = sessionFactory.getCurrentSession().createQuery
					("Select subServiceId From BillDetailsIpdDto WHERE  onBedFlag ='Y' and  treatmentId =:tid and serviceId=3");
			
			beti.setParameter("tid", tID);
			int  bedId = (Integer) bet.uniqueResult();
			
			Session session = sessionFactory.getCurrentSession();*/	
			
			
			/*String hql1 = "UPDATE BillDetailsIpdDto set phyDisFlag =:phyDisFlag,onBedFlag =:onBedFlag,phyDisDateTime= :phyDisDateTime  WHERE treatmentId =:tid and serviceId=:sid and billDetailsId =:billDetailsId" ;
			org.hibernate.Query q1 = session.createQuery(hql1);
			
			q1.setParameter("phyDisFlag","Y");  
			q1.setCharacter("onBedFlag",'N');  
			q1.setDate("phyDisDateTime", new Date(new java.util.Date().getTime()));
			
			q1.setParameter("sid", 3);
			q1.setParameter("tid", tID);
			q1.setParameter("billDetailsId",dbid);//Bed
			q1.executeUpdate();
			
			String hql2 = "UPDATE BillDetailsIpdDto set phyDisFlag =:phyDisFlag,onBedFlag =:onBedFlag,phyDisDateTime= :phyDisDateTime  WHERE treatmentId =:tid and serviceId=:sid and billDetailsId=:bid" ;
			org.hibernate.Query q2 = session.createQuery(hql2);
			
			q2.setParameter("phyDisFlag","Y");  
			q2.setCharacter("onBedFlag",'N');  
			q2.setDate("phyDisDateTime", new Date(new java.util.Date().getTime()));
			
			q2.setParameter("sid", 3);
			q2.setParameter("tid", tID);
			q2.setParameter("bid", dbid+1);//Nursing
			
			q2.executeUpdate();*/
			
			/*TreatmentDto subsobj = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, tID);				
			subsobj.setPhyDateTime(new Date(new java.util.Date().getTime()));
			subsobj.setPhyDisFlag("Y");
				
			Query bet = sessionFactory.getCurrentSession().createQuery("Select billDetailsId From BillDetailsIpdDto WHERE  onBedFlag ='Y' and  treatmentId =:tid and serviceId=3 and subServiceId != 0");
			bet.setParameter("tid", tID);
			int bedBillId = (Integer) bet.uniqueResult();
			
			Query betNurse = sessionFactory.getCurrentSession().createQuery("Select billDetailsId From BillDetailsIpdDto WHERE  onBedFlag ='Y' and  treatmentId =:tid and serviceId=3 and subServiceId = 0");
			betNurse.setParameter("tid", tID);
			int nurseBillId = (Integer) betNurse.uniqueResult();
			
			Query bedIdQuery = sessionFactory.getCurrentSession().createQuery("Select subServiceId From BillDetailsIpdDto WHERE  onBedFlag ='Y' and  treatmentId =:tid and serviceId=3 and subServiceId != 0");
			bedIdQuery.setParameter("tid", tID);
			int bedId1 = (Integer) bedIdQuery.uniqueResult();
			
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
			String todays_date_time = formatter.format(currentDate.getTime());
						
			String bedFlagQueuery = "update ehat_bill_details_ipd set on_bed_flag = 'N',phydis_flag ='Y',phydis_date_time='"+todays_date_time+"' where bill_details_id = "+bedBillId;
			SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(bedFlagQueuery);
			sqlQuery1.executeUpdate();
			
			String nurseFlagQueuery = "update ehat_bill_details_ipd set on_bed_flag = 'N',phydis_flag ='Y',phydis_date_time='"+todays_date_time+"' where bill_details_id = "+nurseBillId;
			SQLQuery sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery(nurseFlagQueuery);
			sqlQuery2.executeUpdate();
		
			String treatBedQueuery = "update beds b,treatment_beds tb set tb.status = 'N',b.idbedstate = 2 where tb.Bed_ID=b.Bed_ID and tb.Treatment_ID = "+tID;
			SQLQuery sqlQuery3 = sessionFactory.getCurrentSession().createSQLQuery(treatBedQueuery);
			sqlQuery3.executeUpdate();			
		
			String bedPhysicalFlagQueuery = "update treatment_beds tb set tb.phydis_flag = 'Y',tb.phydis_date_time='"+todays_date_time+"' where tb.Bed_ID="+bedId1+" and tb.Treatment_ID = "+tID;
			SQLQuery sqlQuery4 = sessionFactory.getCurrentSession().createSQLQuery(bedPhysicalFlagQueuery);
			sqlQuery4.executeUpdate();*/
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			Query prefixSp = sessionFactory.getCurrentSession().createSQLQuery("call sp_update_beds_details_for_phydis(:treatmentId,:userId)");
			prefixSp.setParameter("treatmentId", tID);
			prefixSp.setParameter("userId", userId);
			prefixSp.executeUpdate(); 
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public IpdPhysicalDischargedPatientsDTO getIpdDischargedPatients(String general, Integer unitId,Integer userId1, String userType,
			int hallTypeId, int hallId,String filter,String letter) {
		System.err.println("userType>>>"+userType);
		IpdPhysicalDischargedPatientsDTO obj=new IpdPhysicalDischargedPatientsDTO();
		//List<RegTreBillDto> ltPatientRecord = null;
		List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
		List<IpdPhysicalDischargedPatientsDTO> ltIpdbillPatients = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdPhysicalDischargedPatientsDTO.class);
			
			
			if(userType.equalsIgnoreCase("doctor")){
				System.err.println("InIf");
				Session session = sessionFactory.getCurrentSession();
				
				 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
					Query query = session.createSQLQuery(hql);
					query.setParameter("UserID", userId1);
					String docId = query.uniqueResult().toString();
					
					
					
					String all = "SELECT bill_id FROM ehat_ipdbill_patients_phydischarge WHERE"
							+ "(doctor_id = "
							+ docId
							+ " OR doctor_id LIKE '"
							+ docId
							+ ",%'"
							+ " OR doctor_id LIKE '%,"
							+ docId
							+ ",%' OR doctor_id LIKE '%,"
							+ docId
							+ "') and t_flag =:tFlag"
							+" and unit_id =:unitId and patient_id order by 'desc'";
							
					
					Query query2 = session.createSQLQuery(all);
					//query2.setParameter("deptId", deptId);
					query2.setParameter("tFlag", "Y");
					query2.setParameter("unitId", unitId);
					
	        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        		 List<Map<String, Object>> data1 = query2.list();
						
						ArrayList<Integer> billIdArr = new ArrayList<Integer>();
						
						for (Map<String, Object> row1 : data1) {
							int bId = (Integer) row1.get("bill_id");
							billIdArr.add(bId);
						}
	        		 
	        		 
	        		 if(unitId > 0){//get list unit wise.
							criteria.add(Restrictions.eq("unitId", unitId));
						}
						//criteria.add(Restrictions.eq("departmentId", deptId));
						/*criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.add(Restrictions.in("billId", billIdArr));
						//System.err.println("in daoIMPL=="+deptId);
						criteria.addOrder(Order.desc("patientId"));
		
						criteria.setMaxResults(10);
						ltIpdbillPatients = criteria.list();*/
						
						
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.in("billId", billIdArr));

						/*	if (general.equalsIgnoreCase("general")) {
							criteria.add(Restrictions.eq("invoiceFlag", "Y"));
						} else if (general.equalsIgnoreCase("ipd")) {

						} else {
							criteria.add(Restrictions.eq("invoiceFlag", "N"));
						}*/
						if(unitId > 0){//get unit wise patients
							criteria.add(Restrictions.eq("unitId", unitId));
						}
						
						if(hallTypeId>0){
							if (filter.equalsIgnoreCase("wardwise")){
							    
								criteria.add(Restrictions.eq("idhallType", hallTypeId));
						    	//criteria.addOrder(Order.asc("bedId"));
						    }else{
						    	criteria.add(Restrictions.eq("idhallType", hallTypeId));
						    	criteria.add(Restrictions.eq("hallID", hallId));
						    	criteria.addOrder(Order.asc("bedName"));
						    }
						}
						System.err.println("out-----"+letter);
						if(letter.equalsIgnoreCase("") || letter.equalsIgnoreCase(null)){
							System.err.println("if-----"+letter);	
						}else{
							System.err.println("else-----"+letter);
							Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
							Criterion rest2= Restrictions.like("pIdd", "%" + letter + "%");
							Criterion rest3= Restrictions.like("mrnno", "%" + letter + "%");
							Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
							Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
							criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
						}
						criteria.addOrder(Order.desc("pId"));
						ltIpdbillPatients = criteria.list();
						// for doctor names
						Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				  		ltDoctorDto=criteria2.list();
						
				  		//obj.setListRegTreBillDto(ltPatientRecord);
				  		obj.setLstIpdbillPatients(ltIpdbillPatients);
						obj.setLstDoctorDto(ltDoctorDto);					
		}
	else{
			
			criteria.add(Restrictions.eq("deleted", "N"));

			/*if (general.equalsIgnoreCase("general")) {
				criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			} else if (general.equalsIgnoreCase("ipd")) {

			} else {
				criteria.add(Restrictions.eq("invoiceFlag", "N"));
			}*/
			if(unitId > 0){//get unit wise patients
				criteria.add(Restrictions.eq("unitId", unitId));
			}
				if(hallTypeId>0){
				
				if (filter.equalsIgnoreCase("wardwise")){
				    
					criteria.add(Restrictions.eq("idhallType", hallTypeId));
			    	//criteria.addOrder(Order.asc("bedId"));
			    }else{
			    	criteria.add(Restrictions.eq("idhallType", hallTypeId));
			    	criteria.add(Restrictions.eq("hallID", hallId));
			    	criteria.addOrder(Order.asc("bedName"));
			    }
			}
				System.err.println("out-----"+letter);
			if(letter.equalsIgnoreCase("") || letter.equalsIgnoreCase(null)){
				System.err.println("if-----"+letter);	
			}else{
				System.err.println("else-----"+letter);
				Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
				Criterion rest2= Restrictions.like("pIdd", "%" + letter + "%");
				Criterion rest3= Restrictions.like("mrnno", "%" + letter + "%");
				Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
				Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
			}
			criteria.addOrder(Order.desc("pId"));
			ltIpdbillPatients = criteria.list();
			
			Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
	  		
			ltDoctorDto=criteria2.list();
	  		
			obj.setLstIpdbillPatients(ltIpdbillPatients);
			obj.setLstDoctorDto(ltDoctorDto);
	}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"+
                    e.getStackTrace()[0].getClassName()+" Method Name : "+
                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());
			return obj;
		}
		return obj;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<IpdPhysicalDischargedPatientsDTO> getIpdDischargedBillPatients(String general, Integer unitId,Integer userId1, String userType,int hallTypeId, int hallId,String filter) {
		List<IpdPhysicalDischargedPatientsDTO> ltIpdbillPatients = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdPhysicalDischargedPatientsDTO.class);
			
			
			if(userType.equalsIgnoreCase("doctor")){
				
				Session session = sessionFactory.getCurrentSession();
				
				 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
					Query query = session.createSQLQuery(hql);
					query.setParameter("UserID", userId1);
					String docId = query.uniqueResult().toString();
					
					
					
					String all = "SELECT bill_id FROM ehat_ipdbill_patients WHERE"
							+ "(doctor_id = "
							+ docId
							+ " OR doctor_id LIKE '"
							+ docId
							+ ",%'"
							+ " OR doctor_id LIKE '%,"
							+ docId
							+ ",%' OR doctor_id LIKE '%,"
							+ docId
							+ "') and t_flag =:tFlag"
							+" and unit_id =:unitId and patient_id order by 'desc'";
							
					
					Query query2 = session.createSQLQuery(all);
					//query2.setParameter("deptId", deptId);
					query2.setParameter("tFlag", "Y");
					query2.setParameter("unitId", unitId);
					
	        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        		 List<Map<String, Object>> data1 = query2.list();
						
						ArrayList<Integer> billIdArr = new ArrayList<Integer>();
						
						for (Map<String, Object> row1 : data1) {
							int bId = (Integer) row1.get("bill_id");
							billIdArr.add(bId);
						}
	        		 
	        		 
	        		 if(unitId > 0){//get list unit wise.
							criteria.add(Restrictions.eq("unitId", unitId));
						}
						//criteria.add(Restrictions.eq("departmentId", deptId));
						/*criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.add(Restrictions.in("billId", billIdArr));
						//System.err.println("in daoIMPL=="+deptId);
						criteria.addOrder(Order.desc("patientId"));
		
						criteria.setMaxResults(10);
						ltIpdbillPatients = criteria.list();*/
						
						
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.in("billId", billIdArr));
						if (general.equalsIgnoreCase("general")) {
							criteria.add(Restrictions.eq("invoiceFlag", "Y"));
						} else if (general.equalsIgnoreCase("ipd")) {

						} else {
							criteria.add(Restrictions.eq("invoiceFlag", "N"));
						}
						if(unitId > 0){//get unit wise patients
							criteria.add(Restrictions.eq("unitId", unitId));
						}
						
						if(hallTypeId>0){
							if (filter.equalsIgnoreCase("wardwise")){
							    
								criteria.add(Restrictions.eq("idhallType", hallTypeId));
						    	//criteria.addOrder(Order.asc("bedId"));
						    }else{
						    	criteria.add(Restrictions.eq("idhallType", hallTypeId));
						    	criteria.add(Restrictions.eq("hallID", hallId));
						    	criteria.addOrder(Order.asc("bedName"));
						    }
						}
						
						criteria.addOrder(Order.desc("pId"));
						ltIpdbillPatients = criteria.list();
			}else{
					
					criteria.add(Restrictions.eq("deleted", "N"));
					if (general.equalsIgnoreCase("general")) {
						criteria.add(Restrictions.eq("invoiceFlag", "Y"));
					} else if (general.equalsIgnoreCase("ipd")) {
		
					} else {
						criteria.add(Restrictions.eq("invoiceFlag", "N"));
					}
					if(unitId > 0){//get unit wise patients
						criteria.add(Restrictions.eq("unitId", unitId));
					}
					if(hallTypeId>0){
						
						if (filter.equalsIgnoreCase("wardwise")){
						    
							criteria.add(Restrictions.eq("idhallType", hallTypeId));
					    	//criteria.addOrder(Order.asc("bedId"));
					    }else{
					    	criteria.add(Restrictions.eq("idhallType", hallTypeId));
					    	criteria.add(Restrictions.eq("hallID", hallId));
					    	criteria.addOrder(Order.asc("bedName"));
					    }
					}			
					
					criteria.addOrder(Order.desc("pId"));
					ltIpdbillPatients = criteria.list();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"+
                    e.getStackTrace()[0].getClassName()+" Method Name : "+
                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());
			return ltIpdbillPatients;
		}
		return ltIpdbillPatients;
	}
	
	@Override
	public String phyDisflagForOt(Integer treatmentId) {
		// TODO Auto-generated method stub
		String phyDisFlag ="";
		try {
			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery("SELECT phydis_flag FROM ehat_treatment where  treatment_id='"+ treatmentId +"' and t_flag='Y'");	        
			phyDisFlag = (String) query1.uniqueResult();
			
				} catch (Exception e) {
					e.printStackTrace();
					
				}
		return phyDisFlag;
				
		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<IpdPhysicalDischargedPatientsDTO> autoIPDActivePhyDisPat(String letter,String finalBill,String usertype,HttpServletRequest request){
		List<IpdPhysicalDischargedPatientsDTO> ltIpdbillPatients = null;
		try {
			

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdPhysicalDischargedPatientsDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", +unitId));
			/*if(finalBill.equalsIgnoreCase("finalBill")){
				
				criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			}else{
				criteria.add(Restrictions.eq("invoiceFlag", "N"));
			}*/
			if(usertype.equalsIgnoreCase("Y")){
				
				criteria.add(Restrictions.like("inCount", "%" + letter + "%"));	
				
			}else{
			
			Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
			Criterion rest2= Restrictions.like("pIdd", "%" + letter + "%");
			Criterion rest3= Restrictions.like("mrnno", "%" + letter + "%");
			Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
			Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
			criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
			/*criteria.add(Restrictions
					.sqlRestriction("patient_name LIKE '%" + letter + "%' OR pIdd LIKE '%" + letter + "%'"));
			*/
			}
			criteria.addOrder(Order.desc("pId"));
			ltIpdbillPatients = criteria.list();
	
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltIpdbillPatients;
		}
		return ltIpdbillPatients;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<IpdPhysicalDischargedPatientsDTO> autoIPDBillPhyDisPat(String letter,String finalBill,String usertype,HttpServletRequest request){
		List<IpdPhysicalDischargedPatientsDTO> ltIpdbillPatients = null;
		try {
			

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdPhysicalDischargedPatientsDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", +unitId));
			if(finalBill.equalsIgnoreCase("finalBill")){
				
				criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			}else{
				criteria.add(Restrictions.eq("invoiceFlag", "N"));
			}
			if(usertype.equalsIgnoreCase("Y")){
				
				criteria.add(Restrictions.like("inCount", "%" + letter + "%"));	
				
			}else{
			
			Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
			Criterion rest2= Restrictions.like("pIdd", "%" + letter + "%");
			Criterion rest3= Restrictions.like("mrnno", "%" + letter + "%");
			Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
			Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
			criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
			
			}
			criteria.addOrder(Order.desc("pId"));
			ltIpdbillPatients = criteria.list();
	
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltIpdbillPatients;
		}
		return ltIpdbillPatients;
	}
	
}


