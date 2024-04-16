package com.hms.ambulance.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ambulance.controller.AmbulancePatientController;
import com.hms.ambulance.dao.AmbulancePatientDao;
import com.hms.ambulance.dto.AmbulancePatientCountDto;
import com.hms.ambulance.dto.AmbulancePatientDto;
import com.hms.dto.Users;
import com.hms.ehat.dto.RegistrationDto;

@Repository
public class AmbulancePatientDaoImpl implements AmbulancePatientDao{
	
	@Autowired
	SessionFactory sessionFactory;
	
	static Logger Log = Logger.getLogger(AmbulancePatientController.class.getName());
	
	/**
	 * @author Sandip @date 20_JAN_2022 this method is used to save or update
	 *         records in db
	 * **/

	@Override
	public int saveAmbulancePatient(AmbulancePatientDto ambulancePatient, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

	try {
		ambulancePatient.setUnitId(unitId);
		ambulancePatient.setCreatedBy(userId);
		
		if(ambulancePatient.getId()==0) {
			sessionFactory.getCurrentSession().merge(ambulancePatient);
			return 1;
		}else {
			sessionFactory.getCurrentSession().saveOrUpdate(ambulancePatient);
			return 2;
		}
		
	} catch (Exception e) {
		Log.error("Exception--> ", e);
	}
		return 0;
	}
	
	/**
	 * @author Sandip @date 20_JAN_2022 this method is used to get all records from db
	 * **/
	@Override
	public List<AmbulancePatientDto> getAllAmbulancePatient(String status,HttpServletRequest request) {
		List<AmbulancePatientDto> ambulancePatient = new ArrayList<AmbulancePatientDto>();

		try {

			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			System.out.println("unitId"+unitId);
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AmbulancePatientDto.class);
			if(!status.equalsIgnoreCase("onload"))
			{
				criteria.add(Restrictions.eq("status", status));
			}
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.addOrder(Order.desc("id"));
			
			ambulancePatient =criteria.list();
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return ambulancePatient;
		
	}
	
	/**
	 * @author Sandip @date 20_JAN_2022 this method is used to edit records from db
	 * **/

	@Override
	public AmbulancePatientDto editAmbulancePatient(Integer id) {
		
		AmbulancePatientDto obj = new AmbulancePatientDto();

		try {
			
			  Criteria criteria =
			  sessionFactory.getCurrentSession().createCriteria(AmbulancePatientDto.class);
			  criteria.add(Restrictions.eq("id", id)); obj = (AmbulancePatientDto)
			  criteria.uniqueResult(); return obj;
			 
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return obj;
		
	}
	
	/**
	 * @author Sandip @date 20_JAN_2022 this method is used to delete records from db
	 * **/

	@Override
	public boolean deleteAmbulancePatient(Integer patientId, HttpServletRequest request) {

		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			AmbulancePatientDto obj = (AmbulancePatientDto) sessionFactory.getCurrentSession().get(AmbulancePatientDto.class,
					patientId);
			
			obj.setDeleted("Y");
			obj.setDeletedBy(userId);
			obj.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return false;
	}

	/**
	 * @author Sandip @date 20_JAN_2022 this method is used to get records by id
	 *         from db
	 **/
	@Override
	public List<RegistrationDto> getAmbulanceDetailsById(Integer patientId) {
		
		String sql = "";
		
		 List<RegistrationDto> listAmbulancePatientDto=new ArrayList<RegistrationDto>();
		 try{
				
			 
			    Criteria c=  sessionFactory.getCurrentSession().createCriteria(RegistrationDto.class);
                 c.add(Restrictions.eq("patientId", patientId));
                 listAmbulancePatientDto=c.list();
			 
		 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return listAmbulancePatientDto;
		
	}

	@Override
	public String getDoctorName(Integer patientId) {
		String doctorName="";
		
		try {
			
			  
			  String hql1="Select fn_get_doctor_name_by_patient_id("+patientId+") as doctorname";
			  SQLQuery q1= sessionFactory.getCurrentSession().createSQLQuery(hql1);
			  doctorName=(String) q1.uniqueResult();
			  

			  
		}catch (Exception e) {
			e.printStackTrace();
		}
		return doctorName;
	}

	@Override
	public List<Users> getDoctors(Integer user_ID) {

		List<Users> listuser=new ArrayList<>();
		 try{
			 Criteria c= sessionFactory.getCurrentSession().createCriteria(Users.class);
			 c.add(Restrictions.eq("user_Type", "doctor"));
			 listuser=c.list();
			 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return listuser;
	}
	
	
	@Override
	public List<Users> getNurse(Integer user_ID) {

		List<Users> listuser=new ArrayList<>();
		 try{
			 Criteria c= sessionFactory.getCurrentSession().createCriteria(Users.class);
			 c.add(Restrictions.eq("user_Type", "nurse"));
			 c.add(Restrictions.eq("deleted", "N"));
			 listuser=c.list();
			 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return listuser;
	}

	@Override
	public List<AmbulancePatientDto> autoSuggestion(int callFrom, String text) {
	
		List<AmbulancePatientDto>  list=new ArrayList<>();
		try {
		Session s = sessionFactory.getCurrentSession();
		 Criteria c=  s.createCriteria(AmbulancePatientDto.class);
		 if(callFrom==1) {
			 c.add(Restrictions.ilike("uHIDNumber", text, MatchMode.ANYWHERE));
		 	}else if(callFrom==2) {
		 		 c.add(Restrictions.ilike("patientName", text, MatchMode.ANYWHERE));
		 	}else if(callFrom==2) {
		 		 c.add(Restrictions.ilike("id", text, MatchMode.ANYWHERE));
		 	}else if(callFrom==3) {
		 		 c.add(Restrictions.ilike("mobileNo", text, MatchMode.ANYWHERE));
		 	}else if(callFrom==4) {
		 		// c.add(Restrictions.ilike("status", status, MatchMode.ANYWHERE));
		 	}
		
		 list= c.list();
		 
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}

	@Override
	public List<AmbulancePatientDto> getAmbulancePatientById(Integer patientId) {

		String sql = "";
		
		 List<AmbulancePatientDto> listAmbulancePatientDto=new ArrayList<AmbulancePatientDto>();
		 try{
				
			 
			    Criteria c=  sessionFactory.getCurrentSession().createCriteria(AmbulancePatientDto.class);
                c.add(Restrictions.eq("id", patientId));
                listAmbulancePatientDto=c.list();
			 
		 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return listAmbulancePatientDto;
	}
	
	
	@Override
	public int approveAmbulancePatient(String id, Integer userId) {
	
		try {
			
			String sql="Update AmbulancePatientDto set status='Approved',updatedBy="+userId+",updatedDate=now() where id in ("+id+") ";
			
			Query q=  sessionFactory.getCurrentSession().createQuery(sql);
			
			q.executeUpdate();
			
			return 1;
			
		}catch (Exception e) {
			
		}
		return 0;
	}

	@Override
	public int assignAmbulancePatient(Integer id, Integer userId) {

		try {
			
			String sql="Update AmbulancePatientDto set status='Assigned',updatedBy="+userId+",updatedDate=now() where id in ("+id+") ";
			
			Query q=  sessionFactory.getCurrentSession().createQuery(sql);
			
			q.executeUpdate();
			
			return 1;
			
		}catch (Exception e) {
			
		}
		return 0;
	}
	
	@Override
	public int completeAmbulancePatient(Integer id, Integer userId) {

		try {
			
			String sql="Update AmbulancePatientDto set status='Completed',updatedBy="+userId+",updatedDate=now() where id in ("+id+") ";
			
			Query q=  sessionFactory.getCurrentSession().createQuery(sql);
			
			q.executeUpdate();
			
			return 1;
			
		}catch (Exception e) {
			
		}
		return 0;
	}


	@Override
	public AmbulancePatientCountDto getAmbulancePatientCount(int id, HttpServletRequest request) {

		AmbulancePatientCountDto ambulancePatientCount = new AmbulancePatientCountDto();
		Integer approveCount=0;
		Integer cancelCount=0;
		Integer openCount=0;
		Integer assignCount=0;
		Integer completeCount=0;
		Integer emergencyCount=0;

		try {
				
			  String hql1="SELECT count(*) FROM ambulance_patient where status='Approved'";
			  SQLQuery q1= sessionFactory.getCurrentSession().createSQLQuery(hql1);
			  approveCount=((Number)q1.uniqueResult()).intValue();
			 // q1.executeUpdate();
			 
			  String hql2="SELECT count(*) FROM ambulance_patient where status='Completed'";
			  SQLQuery q2= sessionFactory.getCurrentSession().createSQLQuery(hql2);
			  completeCount=((Number)q2.uniqueResult()).intValue();
	
			  
			  String hql3="SELECT count(*) FROM ambulance_patient where status='Assigned'";
			  SQLQuery q3= sessionFactory.getCurrentSession().createSQLQuery(hql3);
			  assignCount=((Number)q3.uniqueResult()).intValue();
		
			  
			  String hql4="SELECT count(*) FROM ambulance_patient where status='Cancelled'";
			  SQLQuery q4= sessionFactory.getCurrentSession().createSQLQuery(hql4);
			  cancelCount=((Number)q4.uniqueResult()).intValue();
			  
			  String hql5="SELECT count(*) FROM ambulance_patient where emergency_patient='Y'";
			  SQLQuery q5= sessionFactory.getCurrentSession().createSQLQuery(hql5);
			  emergencyCount=((Number)q5.uniqueResult()).intValue();
			  
		
			  ambulancePatientCount.setApproveCount(approveCount);
			  ambulancePatientCount.setAssignCount(assignCount);
			  ambulancePatientCount.setOpenCount(openCount);
			  ambulancePatientCount.setCancelCount(cancelCount);
			  ambulancePatientCount.setCompleteCount(completeCount);
			  ambulancePatientCount.setEmergencyCount(emergencyCount);
			  
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		  return ambulancePatientCount;
		
	}

	@Override
	public int updateAmbulancePatient(AmbulancePatientDto obj, HttpServletRequest request) {

		int res=0;

		try {
				String hql="Update AmbulancePatientDto  set callerName='"+obj.getCallerName()+"',pickupLocation='"+obj.getPickupLocation()+"',dropLocation='"+obj.getDropLocation()+"',vehicleType='"+obj.getVehicleType()+"',callerNumber='"+obj.getCallerNumber()+"',status='"+obj.getStatus()+"',vehicleId='"+obj.getVehicleId()+"',vehicleNumber='"+obj.getVehicleNumber()+"',checklist='"+obj.getChecklist()+"',driver='"+obj.getDriver()+"',remark='"+obj.getRemark()+"',scheduleDate='"+obj.getScheduleDate()+"',scheduleTime='"+obj.getScheduleTime()+"',vehicleTypeId="+obj.getVehicleTypeId()+" where id="+obj.getId()+"  ";		
						
				Query q=  sessionFactory.getCurrentSession().createQuery(hql);
				
				q.executeUpdate();
				res=1;
				
				///
				String vhql="UPDATE VehicleMasterDto  set isAvailable='N'  where vehicleId=" +obj.getVehicleId()+" ";
				Query qv=  sessionFactory.getCurrentSession().createQuery(vhql);
				
				qv.executeUpdate();
			 
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return res;
	}
	
	@Override
	public int updateAmbulancePatientDetails(AmbulancePatientDto obj, HttpServletRequest request) {

		//AmbulancePatientDto obj = new AmbulancePatientDto();
		int res=0;

		try {
			
				String hql="Update AmbulancePatientDto  set callerName='"+obj.getCallerName()+"',callerNumber='"+obj.getCallerNumber()+"',vehicleId='"+obj.getVehicleId()+"',pickupLocation='"+obj.getPickupLocation()+"',vehicleType='"+obj.getVehicleType()+"',vehicleNumber='"+obj.getVehicleNumber()+"',dropLocation='"+obj.getDropLocation()+"',"
						+ "departureDate='"+obj.getDepartureDate()+"',departureTime='"+obj.getDepartureTime()+"',arrivalDate='"+obj.getArrivalDate()+"',arrivalTime='"+obj.getArrivalTime()+"',dropDate='"+obj.getDropDate()+"',dropTime='"+obj.getDropTime()+"' where id="+obj.getId()+"  ";		
				
				obj.setArrivalDate("arrivalDate"+obj.getArrivalDate());
				obj.setArrivalTime("arrivalTime"+obj.getArrivalTime());
				obj.setDropDate("dropDate"+obj.getDropDate());
				obj.setDropTime("dropTime"+obj.getDropTime());
				
				Query q=  sessionFactory.getCurrentSession().createQuery(hql);
				
				q.executeUpdate();
				res=1;
				
				///
				String vhql="UPDATE VehicleMasterDto  set isAvailable='Y'  where vehicleId=" +obj.getVehicleId()+" ";
				Query qv=  sessionFactory.getCurrentSession().createQuery(vhql);
				
				qv.executeUpdate();
			 
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return res;
	}
	
	@Override
	public List<AmbulancePatientDto> autoSuggestionforRID(int callFrom, Integer id) {

		List<AmbulancePatientDto>  list=new ArrayList<>();
		try {
			
		Session s = sessionFactory.getCurrentSession();
		 Criteria c=  s.createCriteria(AmbulancePatientDto.class);
		 if(callFrom==1) {
	 	
			 c.add(Restrictions.eq("id",id));
			 
		 	}else if(callFrom==2) {
		 		// c.add(Restrictions.ilike("status", status, MatchMode.ANYWHERE));
		 	}
		
		 list= c.list();
		 
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
		
	
	}


	@Override
	public List<AmbulancePatientDto> getfilterAmbulancePatientMasterWithDate(String status, String department,String requisitionDate,String toDate,String wardTypeSelect) {
	
		//Session s = sessionFactory.openSession();
		
		List<AmbulancePatientDto> listdata = new ArrayList<AmbulancePatientDto>();
		
		/*
		 * Query AmbualancePatientSP;
		 * 
		 * AmbualancePatientSP = s.
		 * createSQLQuery("call sp_get_ambulance_patient(:unitId,:requisitionDate,:toDate)"
		 * ); AmbualancePatientSP.setParameter("unitId",1);
		 * AmbualancePatientSP.setParameter("requisitionDate",requisitionDate);
		 * AmbualancePatientSP.setParameter("toDate",toDate);
		 */
		
		String sql = "";
		
		String status_validation_qry = "";
		String dept_validation_qry = "";
		String date_validation_qry = "";
		String ward_validation_qry = "";
		
		
		if(status.equalsIgnoreCase("0") || status.equalsIgnoreCase("-select-"))
		{
			status_validation_qry = " ";
		}else {
			status_validation_qry = " AND status = '"+status+"' ";
		}
		if(department.equalsIgnoreCase("0") || department.equalsIgnoreCase("Select"))
		{
			dept_validation_qry = " ";
		}else {
			dept_validation_qry = " AND department = '"+department+"' ";
		}
		if(requisitionDate.equalsIgnoreCase("") || requisitionDate.equalsIgnoreCase(null) || toDate.equalsIgnoreCase("") || toDate.equalsIgnoreCase(null))
		{
			date_validation_qry = " ";
		}else {
			date_validation_qry =  " AND SUBSTR(created_date_time, 1, 10) >= '"+requisitionDate+"' AND SUBSTR(created_date_time, 1, 10) <= '"+toDate+"' ";
		}
		if(wardTypeSelect.equalsIgnoreCase("0") || wardTypeSelect.equalsIgnoreCase("--select--"))
		{
			ward_validation_qry = " ";
		}else {
			ward_validation_qry = " AND ward_id = "+wardTypeSelect;
		}
		
		sql = "SELECT * FROM ambulance_patient WHERE deleted ='N' "+status_validation_qry+" "+dept_validation_qry+" "+date_validation_qry+" "+ward_validation_qry+" ORDER BY id DESC";
	
		SQLQuery qurey = sessionFactory.getCurrentSession().createSQLQuery(sql);
	
		qurey.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	
		List<Map<String, Object>> list = qurey.list();
	
		for (Map<String, Object> row : list) {
			
			AmbulancePatientDto obj = new AmbulancePatientDto();
			
			obj.setId((Integer) row.get("id"));
			obj.setuHIDNumber((String) row.get("UHID_number"));
			obj.setPatientName((String) row.get("patient_name"));
			obj.setDepartment((String) row.get("department"));
			obj.setRequisitionDate((String) row.get("requisition_date"));
			obj.setConsultantName((String) row.get("consultant_name"));
			obj.setPickupLocation((String) row.get("pickup_location"));
			obj.setDropLocation((String) row.get("drop_location"));
			obj.setPurpose((String) row.get("purpose"));
			obj.setCallerName((String) row.get("caller_name"));
			obj.setCallerNumber((String) row.get("caller_number"));
			obj.setStatus((String) row.get("status"));
			obj.setNurseName((String) row.get("nurse_name"));
			obj.setDoctorName((String) row.get("doctor_name"));
			obj.setStatusRemark((String) row.get("status_remark"));
			obj.setUpdatedBy((Integer) row.get("updatedBy"));
			obj.setCreatedBy((Integer) row.get("createdBy"));
	
			listdata.add(obj);
		}
	
		return listdata;
	}

}