package com.hms.rostermanagement.dao.impl;

import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.hms.administrator.dto.HospitalAccDetails;
import com.hms.dto.Doctor;
import com.hms.dto.DoctorDetail;
import com.hms.ehat.dto.FollowUpDTO;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.registration.dto.SpecialityWiseDoctorDto;
import com.hms.rostermanagement.dao.SchedulerDao;
import com.hms.rostermanagement.dto.AppointPatientResponseDTO;
import com.hms.rostermanagement.dto.AppointmentParameterDTO;
import com.hms.rostermanagement.dto.FollowUpResponseDTO;
import com.hms.rostermanagement.dto.NA;
import com.hms.rostermanagement.dto.SchedularDoctorTimeSlotDto;
import com.hms.rostermanagement.dto.SchedularExistingPatientDTO;
import com.hms.rostermanagement.dto.ScheduleAppointmentsDTO;
import com.hms.rostermanagement.dto.SchedulerRoomMasterDto;
import com.hms.utility.SendSMSAllFormat;

@Repository
public class SchedulerDaoImpl implements SchedulerDao{

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveRoom(SchedulerRoomMasterDto schedulerRoomMasterDto) {
		// TODO Auto-generated method stub
		try {
			sessionFactory.getCurrentSession().merge(schedulerRoomMasterDto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public List<SchedulerRoomMasterDto> getAllRoom() {
		List<SchedulerRoomMasterDto> ltRoomMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SchedulerRoomMasterDto.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.addOrder(Order.asc("roomId"));
			//criteria.setMaxResults(10);
			ltRoomMasters = criteria.list();		
			

		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltRoomMasters;
	}

	@Override
	public boolean deleteRoom(Integer roomId, HttpServletRequest request) {
		try {

			Calendar calendar = Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
			String todaysDate = formatter.format(calendar.getTime());
			HttpSession session = request.getSession();
			String remoteAddress = request.getRemoteHost();
			
			Integer userId = (Integer) session.getAttribute("userId1");
			String uId=userId.toString();
			
			SchedulerRoomMasterDto roomDto = (SchedulerRoomMasterDto) sessionFactory
					.getCurrentSession().get(SchedulerRoomMasterDto.class, roomId);
			roomDto.setStatus("N");
			roomDto.setModifyBy(uId);
			roomDto.setModifyOn((todaysDate));
			roomDto.setRemoteAddress((remoteAddress));

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	

	@Override
	public List<Doctor> getAllDoctorList(String date, String docType) {
		List<Doctor> ltDoctor = null;
		try {
			
			if(docType.equalsIgnoreCase("all")){
				Session session = sessionFactory.getCurrentSession();
				String hql = ("from Doctor WHERE status =:status order by doc_name asc");
				Query query = session.createQuery(hql);
				//query.setParameter("doc_Type", docType); 
				query.setParameter("status", "Y");			
				
				Criteria c= sessionFactory.getCurrentSession().createCriteria(Doctor.class);
				c.add(Restrictions.eq("status", "Y"));
				c.add(Restrictions.eq("doc_Type", "doctor"));
				
				 
				ltDoctor=c.list();
			}else{
				Session session = sessionFactory.getCurrentSession();
				String hql = ("from Doctor WHERE status =:status and doc_Type =:doc_Type order by doc_name asc");
				Query query = session.createQuery(hql);
				query.setParameter("doc_Type", docType);
				query.setParameter("status", "Y");			
				 
				ltDoctor=query.list();
			}
			

		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltDoctor;
	}
	

	@Override
	public List<DoctorDetail> getAllDoctorListfromSpec(String date, String docType) {
		List<DoctorDetail> ltDoctor = null;
		try {
			
			Session session = sessionFactory.getCurrentSession();
			String hql = ("from DoctorDetail WHERE status =:status and doc_Type =:doc_Type and specialisation =:specId");
			Query query = session.createQuery(hql);
			query.setParameter("doc_Type", docType);
			query.setParameter("specId", date);
			query.setParameter("status", "Y");			
			 
			ltDoctor=query.list();
			

		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltDoctor;
	}

	@Override
	public int saveDoctorSlotTime(SchedularDoctorTimeSlotDto schedularDoctorTimeSlotDto) {

		Integer result = 0;
		Session s = sessionFactory.getCurrentSession();
		try { 
			
			if(schedularDoctorTimeSlotDto.getDoctor_ID() == 0 && schedularDoctorTimeSlotDto.getSpecializationId() != 0) {
				
				Query doctorSp = s.createSQLQuery("call sp_reg_get_doctor_by_specialization(:specialityId)");
				doctorSp.setResultTransformer(new AliasToBeanResultTransformer(SpecialityWiseDoctorDto.class));

				doctorSp.setParameter("specialityId", schedularDoctorTimeSlotDto.getSpecializationId());
				@SuppressWarnings("unchecked")
				List<SpecialityWiseDoctorDto> lstDoctor = doctorSp.list();	
				
				for(SpecialityWiseDoctorDto rs : lstDoctor)
				{
					if(schedularDoctorTimeSlotDto.getIdschedularDoctorTimeSlot()==0) {
						
						schedularDoctorTimeSlotDto.setDoctor_ID(rs.getDoctor_id());
						sessionFactory.getCurrentSession().merge(schedularDoctorTimeSlotDto);
						result = 1;
					} else {
						schedularDoctorTimeSlotDto.setDoctor_ID(rs.getDoctor_id());
					    sessionFactory.getCurrentSession().merge(schedularDoctorTimeSlotDto);
					    result = 2;	
					}
				}
				
			} else {

				if(schedularDoctorTimeSlotDto.getIdschedularDoctorTimeSlot()==0) {
					
					sessionFactory.getCurrentSession().merge(schedularDoctorTimeSlotDto);
					result = 1;
				}else {
				    sessionFactory.getCurrentSession().merge(schedularDoctorTimeSlotDto);
				    result = 2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return result;
		}
		return result;
	}

	@Override
	public List<SchedularDoctorTimeSlotDto> getDoctorTimeSlotDetails(
			Integer doctorId, String pageName ,Integer specializationId) {
		List<SchedularDoctorTimeSlotDto> ltRoomMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SchedularDoctorTimeSlotDto.class);
			if(doctorId>0) {
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("Doctor_ID", doctorId));
			//criteria.setMaxResults(10);
			ltRoomMasters = criteria.list();	
			}
			else{
				criteria.add(Restrictions.eq("status", "Y"));
			//	criteria.add(Restrictions.eq("Doctor_ID", doctorId));
				 	criteria.add(Restrictions.eq("specializationId", specializationId));
				//criteria.setMaxResults(10);
				ltRoomMasters = criteria.list();	
				}
		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltRoomMasters;
	}
	
	@Override
	public List<SchedularDoctorTimeSlotDto> getDoctorTimeSlotDetailsFromDoc(
			Integer doctorId, String pageName, String appointmentDate,Integer specializationId) {
		List<SchedularDoctorTimeSlotDto> ltRoomMasters = new ArrayList<SchedularDoctorTimeSlotDto>();
		SchedularDoctorTimeSlotDto objDoctorTimeSlot = new SchedularDoctorTimeSlotDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SchedularDoctorTimeSlotDto.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("Doctor_ID", doctorId));
			//criteria.setMaxResults(10);
			List<SchedularDoctorTimeSlotDto> ltGetRoomMasters = criteria.list();	
			objDoctorTimeSlot.setListSchedularDoctorTimeSlotDto(ltGetRoomMasters);
			
			int user_id = 0;
			
			String sql= "Select User_ID from doctor where Doctor_ID =:docId";
	        Query query= sessionFactory.getCurrentSession().createSQLQuery(sql)
	        	 .setParameter("docId", doctorId);
	         user_id = ((Number)query.uniqueResult()).intValue(); 
	         
	         DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
				Calendar c = Calendar.getInstance();
				c.setTime(new Date());
				String todays_date = (dateFormat.format(c.getTime()));
				
				int naCount = 0;
				String sqlForNACount = "Select count(*) from na where User_ID = "+user_id+" and date = '"+appointmentDate+"' and na_status = 'Y'";
		        Query query1= sessionFactory.getCurrentSession().createSQLQuery(sqlForNACount);
		        naCount = ((Number)query1.uniqueResult()).intValue();
		        
		        List<NA> listDoctorNA = new ArrayList<NA>();
				if(naCount > 0){
					String sql2="Select * from na where User_ID = "+user_id+" and date = '"+appointmentDate+"' and na_status = 'Y'";
			         SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
			         query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         List<Map<String, Object>> data = query2.list();
			         
			         for(Map<String, Object> rs1 : data){
							NA objNa = new NA();
							objNa.setNa_id((Integer) rs1.get("na_id"));
							objNa.setDate((String) rs1.get("date"));
							objNa.setFrom_time(((Time) rs1.get("from_time")).toString());
							objNa.setTo_time(((Time) rs1.get("to_time")).toString());
							objNa.setNote((String) rs1.get("note"));
							objNa.setUser_id((Integer) rs1.get("User_ID"));
							listDoctorNA.add(objNa);
						}
				}
				objDoctorTimeSlot.setListDoctorNA(listDoctorNA);
				//ltRoomMasters.get(0).setListDoctorNA(listDoctorNA);
				//objDoctorTimeSlot.setListDoctorNA(listDoctorNA);
				

				int Count = 0;
				String sqlForCount = "Select count(*) from doctor_availability where User_ID = "+user_id+" and date = '"+appointmentDate+"' and status = 'Y'";
				 Query query3= sessionFactory.getCurrentSession().createSQLQuery(sqlForCount);
				 Count = ((Number)query3.uniqueResult()).intValue();
				
				List<NA> listForDoctorAvailable = new ArrayList<NA>();
				if(Count > 0){
					String sqlForDoctor = "Select * from doctor_availability where User_ID = "+user_id+" and date = '"+appointmentDate+"' and status = 'Y'";
					 SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sqlForDoctor);
			         query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         List<Map<String, Object>> mapDoctor = query4.list();
					for (Map<String, Object> rs1 : mapDoctor) {
						NA objNa = new NA();
						objNa.setNa_id((Integer) rs1.get("iddoctor_availability"));
						objNa.setDate((String) rs1.get("date"));
						objNa.setFrom_time(((Time) rs1.get("from_time")).toString());
						objNa.setTo_time(((Time) rs1.get("to_time")).toString());
						objNa.setNote((String) rs1.get("note"));
						objNa.setUser_id((Integer) rs1.get("User_ID"));
						listForDoctorAvailable.add(objNa);
					}
				}
				objDoctorTimeSlot.setListForDoctorAvailable(listForDoctorAvailable);
				//ltRoomMasters.get(0).setListForDoctorAvailable(listForDoctorAvailable);	
				//objDoctorTimeSlot.setListForDoctorAvailable(listForDoctorAvailable);	
				ltRoomMasters.add(objDoctorTimeSlot);
			
				objDoctorTimeSlot=null;
		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltRoomMasters;
	}

	
	@Override
	public List<ScheduleAppointmentsDTO> fetchListOfNewExistingPatient(HttpServletRequest request) {
		List<ScheduleAppointmentsDTO> listSchedulee =  new ArrayList<ScheduleAppointmentsDTO>();
		List<ScheduleAppointmentsDTO> scheduleAppointList = new ArrayList<ScheduleAppointmentsDTO>();
		
		
		
		try {
			
			String todays_date = request.getParameter("txtAppoDate");
			if (todays_date.equals(null) || todays_date.equals("")) {
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
				todays_date = formatter.format(currentDate.getTime());
			}
			
			
			//String sql5 = "select * from appointment where appt_date='"+todays_date+"' and Status='Y' and mvrflag='N' and RegFlag='N'";
			
			//String sql5="From ScheduleAppointmentsDTO where apptDate="+todays_date+" and status='Y' and mvrflag='N' and RegFlag='N' ";
			//Query query5=sessionFactory.getCurrentSession().createQuery(sql5);
		//	query5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			//List<Map<String, Object>> listSchedule = query5.list();
			
			 SimpleDateFormat sdf2 = new SimpleDateFormat("dd/MM/yyyy");
			
			String sNewDate[]=todays_date.split("-");
	        
	        String dateNew=sNewDate[2]+"/"+sNewDate[1]+"/"+sNewDate[0];
	       
	        
	        java.util.Date dd = sdf2.parse(dateNew);
			
			Criteria c=sessionFactory.getCurrentSession().createCriteria(ScheduleAppointmentsDTO.class);
			c.add(Restrictions.eq("apptDate", dd));
			c.add(Restrictions.eq("status", "Y"));
			c.add(Restrictions.eq("mvrflag", "N"));
			c.add(Restrictions.eq("RegFlag", "N"));
			
			List<ScheduleAppointmentsDTO> listSchedule =c.list();
			
			
			for (ScheduleAppointmentsDTO rs : listSchedule) {
				
				
				//Date dateF=(Date) rs.get("appt_date");
				Date dateF=(Date) rs.getApptDate();
				 
				 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");  
			        String mydate = dateFormat.format(dateF);  
			      
				SimpleDateFormat parseFormat1 = new SimpleDateFormat("dd/MM/yyyy");
				Calendar cal = Calendar.getInstance();
				cal.setTime(parseFormat1.parse(mydate));
				
				String todayDate = parseFormat1.format(new Date());
				
				Date date11 = parseFormat1.parse(mydate);
				
				Date date22 = parseFormat1.parse(todayDate);
				
				int j = date11.compareTo(date22);
				if(j >= 0){
					boolean isPresent = false;
					//Date d=(Date) rs.get("appt_date");
					Date d=(Date) rs.getApptDate();
					//String sql="SELECT * FROM na WHERE date = '"+d+"' AND User_ID = (SELECT User_ID FROM doctor WHERE Doctor_ID = "+(Integer)rs.get("Doctor_Id")+ ")";
				
					String sql="SELECT * FROM na WHERE date = '"+d+"' AND User_ID = (SELECT User_ID FROM doctor WHERE Doctor_ID = "+(Integer)rs.getDoctorId()+ ")";
					
					SQLQuery query=sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> naList = query.list();
					
					for (Map<String, Object> rs1 : naList) {
						String naDate = (String) rs1.get("date");
						Time naStartTime = (Time) rs1.get("from_time");
						Time naEndTime = (Time) rs1.get("to_time");
						
						DateFormat df = new SimpleDateFormat("HH:mm:ss");
						String naFromTime = df.format(naStartTime);
						String naToTime = df.format(naEndTime);
				
						String naStartDate = naDate + " " + naFromTime;
						Calendar cal1 = Calendar.getInstance();
					
						cal1.setTime(parseFormat1.parse(naStartDate));
						String naEndDate = naDate + " " + naToTime;
						
						Calendar cal2 = Calendar.getInstance();
						cal2.setTime(parseFormat1.parse(naEndDate));
						System.err.println(cal+" after "+cal1 +" && "+cal+" before "+cal2);
						if(cal.after(cal1) && cal.before(cal2)){
							isPresent = true;
							break;
						}
					}
					
					if(!isPresent){
						
						ScheduleAppointmentsDTO scheduleAppointments = new ScheduleAppointmentsDTO();
						//Appointment objTempAppointment = new Appointment();
						scheduleAppointments.setDoctorId((Integer) rs.getDoctorId());
						scheduleAppointments.setBranchId((Integer) rs.getBranchId());
						scheduleAppointments.setPatientId((Integer) rs.getPatientId());
						scheduleAppointments.setApptId((Integer) rs.getApptId());
						//scheduleAppointments.setApptDate((String) rs.get("appt_date"));
						scheduleAppointments.setApptDate((Date) rs.getApptDate());
						scheduleAppointments.setTitle((String) rs.getTitle());
						scheduleAppointments.setLastName((String) rs.getLastName());
						scheduleAppointments.setPatientName((String) rs.getPatientName());
						scheduleAppointments.setDocname((String) rs.getDocname());
						scheduleAppointments.setPatient_hosp_status((String) rs.getPatient_hosp_status());
						scheduleAppointments.setApptTimeFrom((String) rs.getApptTimeFrom());
						scheduleAppointments.setNote((String) rs.getNote());
						scheduleAppointments.setApptTypeId((String) rs.getApptTypeId());
						scheduleAppointments.setMobNo((String) rs.getMobNo());
						scheduleAppointments.setDetails((String) rs.getDetails());
						scheduleAppointments.setRegType((String) rs.getRegType());
						scheduleAppointList.add(scheduleAppointments);
						
						
						}
					
					}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return scheduleAppointList;
	}


	
	@Override
	public List<ScheduleAppointmentsDTO> fetchListOfReschedulePatient(HttpServletRequest request) {
		String todays_date = request.getParameter("txtAppoDate");
		
		if (todays_date.equals(null) || todays_date.equals("")) {
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
			todays_date = formatter.format(currentDate.getTime());
		}
		
		String next_date = "";
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date d;
		try {
			d = sdf.parse(todays_date);
			sdf.applyPattern("yyyy-MM-dd");
			next_date = sdf.format(d);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		
		List<ScheduleAppointmentsDTO> listscheduleAppointment = new ArrayList<ScheduleAppointmentsDTO>();
		try {
			SimpleDateFormat parseFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date dateobj = new Date();
			Calendar calobj = Calendar.getInstance();
			String stringDRRTime = parseFormat.format(calobj.getTime());
			
			String sql2 = "SELECT * FROM appointment WHERE  Status='Y' AND mvrflag='N' and RegFlag='N'";
			SQLQuery query2=sessionFactory.getCurrentSession().createSQLQuery(sql2);
			query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listSchedule=query2.list();
			
			for (Map<String, Object> rs : listSchedule) {
				
				Date dateF=(Date) rs.get("appt_date");
				 System.out.println("dateF : " + dateF);
				
				 
				 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");  
			        String mydate = dateFormat.format(dateF);  
			        System.out.println("Converted mydate: " + mydate);
				
				//String mydate = (String) rs.get("appt_date") + " " + (String) rs.get("appt_time_to");
			        mydate=mydate+" "+(String) rs.get("appt_time_to");
				SimpleDateFormat parseFormat1 = new SimpleDateFormat("dd/MM/yyyy");
				Calendar cal = Calendar.getInstance();
				cal.setTime(parseFormat1.parse(mydate));
								
				String todayDate = parseFormat1.format(new Date());
				
				Date date11 = parseFormat1.parse(mydate);
				Date date22 = parseFormat1.parse(todayDate);				
				
				int j = date11.compareTo(date22);
	
				if(j < 0){
					ScheduleAppointmentsDTO scheduleAppointments = new ScheduleAppointmentsDTO();
					scheduleAppointments.setApptId((Integer) rs.get("Appt_ID"));
					scheduleAppointments.setBranchId((Integer) rs.get("Branch_id"));
					scheduleAppointments.setDoctorId((Integer) rs.get("Doctor_id"));
					scheduleAppointments.setTreatmentId((Integer) rs.get("Treatment_id"));

					scheduleAppointments.setNote((String) rs.get("Note"));
					scheduleAppointments.setDetails((String) rs.get("Details"));
					scheduleAppointments.setStatus((String) rs.get("status"));

					scheduleAppointments.setApptTypeId((String) rs.get("appt_type_id"));
					//scheduleAppointments.setApptDate((String) rs.get("appt_date"));
					scheduleAppointments.setApptDate((Date) rs.get("appt_date"));
					scheduleAppointments.setApptTimeFrom((String) rs
							.get("appt_time_from"));
					scheduleAppointments.setApptTimeTo((String) rs.get("appt_time_to"));

					scheduleAppointments.setPatientId((Integer) rs.get("Patient_ID"));
					scheduleAppointments.setTitle((String) rs.get("patient_title"));
					scheduleAppointments.setPatientName((String) rs.get("Patient_Name"));
					scheduleAppointments
							.setLastName((String) rs.get("patient_last_name"));

					scheduleAppointments.setDocname((String) rs.get("Doc_Name"));
					scheduleAppointments.setMobNo((String) rs.get("Mobile_No"));
					scheduleAppointments.setPatient_hosp_status((String) rs
							.get("patient_hosp_status"));
					scheduleAppointments.setCommonTokenNo((String) rs
							.get("common_Token_number"));
					scheduleAppointments.setMvrflag((String) rs.get("mvrflag"));
					scheduleAppointments.setRegType((String) rs.get("regType"));
					//listSchedule.add((Map<String, Object>) scheduleAppointments);
					listscheduleAppointment.add(scheduleAppointments);
				}else{
					Date dateF1=(Date) rs.get("appt_date");
					 System.out.println("dateF : " + dateF1);
					 DateFormat dateFormat1 = new SimpleDateFormat("dd/MM/yyyy");  
				        String mydate1 = dateFormat1.format(dateF);  
				        System.out.println("Converted mydate: " + mydate);
					boolean isPresent = false;
					
					String sql = "Select * from na where date = '"+mydate1+"' and User_ID = (Select User_ID from doctor where Doctor_ID = "+(Integer)rs.get("Doctor_Id") + ")";
					SQLQuery query=sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> naDTO=query.list();
					
					for(Map<String, Object> l: naDTO){
						String naDate = (String) l.get("date");
						Time naStartTime = (Time) l.get("from_time");
						Time naEndTime = (Time) l.get("to_time");
						
						DateFormat df = new SimpleDateFormat("HH:mm:ss");
						String naFromTime = df.format(naStartTime);
						String naToTime = df.format(naEndTime);
				
						String naStartDate = naDate + " " + naFromTime;
						Calendar cal1 = Calendar.getInstance();
					
						cal1.setTime(parseFormat1.parse(naStartDate));
						String naEndDate = naDate + " " + naToTime;
						
						Calendar cal2 = Calendar.getInstance();
						cal2.setTime(parseFormat1.parse(naEndDate));
						
						if(cal.after(cal1) && cal.before(cal2)){
							isPresent = true;
							break;
						}
					}		
					if(isPresent){
						ScheduleAppointmentsDTO scheduleAppointments = new ScheduleAppointmentsDTO();
						scheduleAppointments.setApptId((Integer) rs.get("Appt_ID"));
						scheduleAppointments.setBranchId((Integer) rs.get("Branch_id"));
						scheduleAppointments.setDoctorId((Integer) rs.get("Doctor_id"));
						scheduleAppointments.setTreatmentId((Integer) rs.get("Treatment_id"));

						scheduleAppointments.setNote((String) rs.get("Note"));
						scheduleAppointments.setDetails((String) rs.get("Details"));
						scheduleAppointments.setStatus((String) rs.get("status"));

						scheduleAppointments.setApptTypeId((String) rs.get("appt_type_id"));
						//scheduleAppointments.setApptDate((String) rs.get("appt_date"));
						scheduleAppointments.setApptDate((Date) rs.get("appt_date"));
						scheduleAppointments.setApptTimeFrom((String) rs
								.get("appt_time_from"));
						scheduleAppointments.setApptTimeTo((String) rs.get("appt_time_to"));

						scheduleAppointments.setPatientId((Integer) rs.get("Patient_ID"));
						scheduleAppointments.setTitle((String) rs.get("patient_title"));
						scheduleAppointments.setPatientName((String) rs.get("Patient_Name"));
						scheduleAppointments
								.setLastName((String) rs.get("patient_last_name"));

						scheduleAppointments.setDocname((String) rs.get("Doc_Name"));
						scheduleAppointments.setMobNo((String) rs.get("Mobile_No"));
						scheduleAppointments.setPatient_hosp_status((String) rs.get("patient_hosp_status"));
						scheduleAppointments.setCommonTokenNo((String) rs.get("common_Token_number"));
						scheduleAppointments.setMvrflag((String) rs.get("mvrflag"));
						scheduleAppointments.setRegType((String) rs.get("regType"));
						//listSchedule.add((Map<String, Object>) scheduleAppointments);
						listscheduleAppointment.add(scheduleAppointments);
					}
					
				}
			
			}
			return listscheduleAppointment;
		} catch (Exception e) {
			System.out.println("In fetch Rescheduling Patient list catch"+ e.getMessage());
			e.printStackTrace();
		}
		return listscheduleAppointment;
	}
	
	
	@Override
	public List<ScheduleAppointmentsDTO> fetchListOfFollowUPPatient(
			HttpServletRequest request) {
		List<ScheduleAppointmentsDTO> liFollowUp = new ArrayList<ScheduleAppointmentsDTO>();
		String todays_date = request.getParameter("txtAppoDate");
		
		if (todays_date.equals(null) || todays_date.equals("")) {
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
			todays_date = formatter.format(currentDate.getTime());
		}
		
		int isInserted = 0;
		String next_date = "";

		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date d;
		try {
			d = sdf.parse(todays_date);
			sdf.applyPattern("yyyy-MM-dd");
			next_date = sdf.format(d);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		try {
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			Calendar c = Calendar.getInstance();
			c.setTime(new Date());
			String date2 = (dateFormat.format(c.getTime()));
			c.add(Calendar.DATE, -1);
			String date1 = (dateFormat.format(c.getTime()));
			c.add(Calendar.DATE, 2);
			String date3 = (dateFormat.format(c.getTime()));
			
			/*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(FollowUpDTO.class);
			Disjunction or = Restrictions.disjunction();
			or.add(Restrictions.eq("date", date1));
			or.add(Restrictions.eq("date", date2));
			or.add(Restrictions.eq("date", date3));
			criteria.add(or);
			criteria.add(Restrictions.eq("status", "Y"));
			followUpList = criteria.list();*/
			
			String sqlForSelectFollowUp = "SELECT * FROM follow_up WHERE  (date='"+date1+"'  OR  date='"+date2+"' OR  date='"+date3+"') AND status='Y'";
			SQLQuery query1=sessionFactory.getCurrentSession().createSQLQuery(sqlForSelectFollowUp);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> followUpDetails=query1.list();
			
			/*for (Map<String, Object> rs : followUpDetails) {

				ScheduleAppointmentsDTO objAppointment = new ScheduleAppointmentsDTO();
				objAppointment.setApptId((Integer) rs.get("follow_up_id"));
				objAppointment.setApptDate((String) rs.get("date"));
				objAppointment.setDoctorId((Integer) rs.get("Doctor_id"));
				objAppointment.setBranchId((Integer) rs.get("Branch_id"));
				objAppointment.setPatientId((Integer) rs.get("Patient_ID"));
				objAppointment.setTitle((String) rs.get("patient_title"));
				objAppointment.setLastName((String) rs.get("patient_last_name"));
				objAppointment.setPatientName((String) rs.get("Patient_Name"));
				objAppointment.setDocname((String) rs.get("Doc_Name"));
				objAppointment.setTreatmentId((Integer) rs.get("Treatment_id"));
				objAppointment.setStatus((String) rs.get("status"));
				objAppointment.setApptTimeFrom("00:00");
				liFollowUp.add(objAppointment);
			}
			
			System.err.println("kishor===== "+liFollowUp.size());*/
			
			liFollowUp = setFollowUpDetailsMap(followUpDetails);
			return liFollowUp;
			
			
		}
		catch (Exception e) {
			System.out.println("In fetchListOfFollowUPPatient "+ e.getMessage());
			return null;
		}	
	}

	private List<ScheduleAppointmentsDTO> setFollowUpDetailsMap(
			List<Map<String, Object>> followUpDetails) {

		List<ScheduleAppointmentsDTO> liAppointment = new ArrayList<ScheduleAppointmentsDTO>();
		for (Map<String, Object> rs : followUpDetails) {

			ScheduleAppointmentsDTO objAppointment = new ScheduleAppointmentsDTO();
			objAppointment.setApptId((Integer) rs.get("follow_up_id"));
			//objAppointment.setApptDate((String) rs.get("date"));
			objAppointment.setApptDate((Date) rs.get("date"));
			objAppointment.setDoctorId((Integer) rs.get("Doctor_id"));
			objAppointment.setBranchId((Integer) rs.get("Branch_id"));
			objAppointment.setPatientId((Integer) rs.get("Patient_ID"));
			objAppointment.setTitle((String) rs.get("patient_title"));
			objAppointment.setLastName((String) rs.get("patient_last_name"));
			objAppointment.setPatientName((String) rs.get("Patient_Name"));
			objAppointment.setDocname((String) rs.get("Doc_Name"));
			objAppointment.setTreatmentId((Integer) rs.get("Treatment_id"));
			objAppointment.setStatus((String) rs.get("status"));
			objAppointment.setApptTimeFrom("00:00");
			liAppointment.add(objAppointment);
		}

		return liAppointment;

	}

	@Override
	public int removeAppointment(HttpServletRequest request) {

		String patientMobNo="",drMobNo="";
		int apptId=Integer.parseInt(request.getParameter("appId"));
		
		TransactionDefinition def = new DefaultTransactionDefinition();
	//	TransactionStatus status = transactionManager.getTransaction(def);
		try {

			List<ScheduleAppointmentsDTO> liAppointment = new ArrayList<ScheduleAppointmentsDTO>();

			String sql = "SELECT * FROM appointment where Appt_ID='"+apptId+"' ";

			try {
				SQLQuery query1=sessionFactory.getCurrentSession().createSQLQuery(sql);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> appointmentDetails=query1.list();
				System.err.println("apptId--- -- "+apptId);
				liAppointment = setAppointmentsDetailsMap(appointmentDetails);
				System.err.println("appointmentDetails--- -- "+liAppointment.size());
				//List<ScheduleAppointmentsDTO> liAppointment = new ArrayList<ScheduleAppointmentsDTO>();
				
				
				List<DoctorDetail> doctorList = new ArrayList<DoctorDetail>();
				Criteria criteria1 = sessionFactory.getCurrentSession().createCriteria(DoctorDetail.class);
				criteria1.add(Restrictions.eq("doctor_ID",liAppointment.get(0).getDoctorId()));
				doctorList = criteria1.list();
				drMobNo=doctorList.get(0).getMobileNo();
				if(liAppointment!=null && liAppointment.get(0)!=null){
					patientMobNo = liAppointment.get(0).getMobNo();
				}
				
			} catch (Exception ex) {
				ex.printStackTrace();

			}
			ScheduleAppointmentsDTO appointment =(ScheduleAppointmentsDTO) sessionFactory.getCurrentSession().get(ScheduleAppointmentsDTO.class,apptId);
			appointment.setStatus("N");

			if (liAppointment.get(0).getApptTypeId().equals("FollowUp")) {

				/*int treatment_id=liAppointment.get(0).getTreatmentId();
				TreatmentDto treatmentDto =(TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class,treatment_id);
				treatmentDto.settFlag("N");*/

				String q = "select MAX(follow_up_id) from  follow_up where Patient_ID='"+liAppointment.get(0).getPatientId()+"'";
				SQLQuery sQuery=sessionFactory.getCurrentSession().createSQLQuery(q);
				//int maxIDFollowUp=sQuery.getMaxResults();
				int maxIDFollowUp = ((Number)sQuery.uniqueResult()).intValue(); 

				FollowUpDTO followUpdto =(FollowUpDTO) sessionFactory.getCurrentSession().get(FollowUpDTO.class,maxIDFollowUp);
				followUpdto.setStatus("Y");
				

			}

			//transactionManager.commit(status);
			//send message to doctor and patient
			ResourceBundle chkSMSFlag = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			if (chkSMSFlag.getObject("sendSMS").toString().equalsIgnoreCase("on") && 
					chkSMSFlag.getObject("appointmentScheduleSms").toString().equalsIgnoreCase("on")) {
			ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
			String hospitalName = bundle.getObject("hospitalname").toString();
			if(hospitalName.equalsIgnoreCase("MITR")){
				try {
						System.out.println(drMobNo +"***"+ patientMobNo);
						if (drMobNo.length() == 10) {
							//SendSMSAllFormat.sendSMS("", "", "", "",drMobNo, msgForDoctor);
						}
						if (patientMobNo.length() == 10) {
							//SendSMSAllFormat.sendSMS("", "", "", "",patientMobNo, msgForDoctor);
						}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			}
			return 1;
			
		} catch (Exception e) {
			System.out.println("database error...could not insert: "
					+ e.getMessage());
			e.printStackTrace();
			//transactionManager.rollback(status);
			return 0;
		}

	
	}

	private List<ScheduleAppointmentsDTO> setAppointmentsDetailsMap(
			List<Map<String, Object>> appointmentDetails) {

		List<ScheduleAppointmentsDTO> liAppointment = new ArrayList<ScheduleAppointmentsDTO>();
		for (Map<String, Object> rs : appointmentDetails) {

			ScheduleAppointmentsDTO objAppointment = new ScheduleAppointmentsDTO();
			objAppointment.setApptId((Integer) rs.get("Appt_ID"));
			objAppointment.setBranchId((Integer) rs.get("Branch_id"));
			objAppointment.setDoctorId((Integer) rs.get("Doctor_id"));
			objAppointment.setTreatmentId((Integer) rs.get("Treatment_id"));
			objAppointment.setStatus((String) rs.get("Status"));
			//objAppointment.setApptDate((String) rs.get("appt_Date"));
			objAppointment.setApptDate((Date) rs.get("appt_Date"));
			objAppointment.setApptTimeFrom((String) rs.get("appt_Time_From"));
			objAppointment.setApptTimeTo((String) rs.get("appt_Time_to"));
			objAppointment.setPatientId((Integer) rs.get("Patient_ID"));
			if (null != rs.get("patient_title"))
				objAppointment.setTitle((String) rs.get("patient_title"));
			else
				objAppointment.setTitle("");
			if (null != rs.get("patient_last_name"))
				objAppointment
						.setLastName((String) rs.get("patient_last_name"));
			else
				objAppointment.setLastName("");
			objAppointment.setPatientName((String) rs.get("Patient_Name"));
			objAppointment.setDocname((String) rs.get("Doc_Name"));
			objAppointment.setCommonTokenNo((String) rs
					.get("common_Token_number"));
			if (null != rs.get("Mobile_No")) {
				objAppointment.setMobNo((String) rs.get("Mobile_No"));
			} else {
				objAppointment.setMobNo("");
			}
			objAppointment.setApptTypeId((String) rs.get("appt_type_id"));
			objAppointment.setMvrflag((String) rs.get("mvrflag"));
			liAppointment.add(objAppointment);
		}
System.err.println("leaffffv--- -- "+liAppointment.size());
		return liAppointment;

	}

	@Override
	public List<RegistrationDto> getPatientDetailsNew(HttpServletRequest request) {
		List<RegistrationDto> ltpatDetails =new ArrayList<RegistrationDto>();
		List<ScheduleAppointmentsDTO> ltpatappDetails =new ArrayList<ScheduleAppointmentsDTO>();
		int patientId=Integer.parseInt(request.getParameter("patientId"));
		try {
			/*
			 * Criteria criteria = sessionFactory.getCurrentSession()
			 * .createCriteria(RegistrationDto.class);
			 * criteria.add(Restrictions.eq("patientId", patientId));
			 * criteria.add(Restrictions.eq("deleted","N"));
			 * 
			 * ltpatDetails = criteria.list();
			 */
			
			//get data from ScheduleAppointmentsDTO
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ScheduleAppointmentsDTO.class);
			criteria.add(Restrictions.eq("apptId", patientId));
			//criteria.add(Restrictions.eq("deleted","N"));
			//criteria.setMaxResults(10);
			ltpatappDetails = criteria.list();	
			if(ltpatappDetails.size() > 0) {
			RegistrationDto obj=new RegistrationDto();
			obj.setPatientId(ltpatappDetails.get(0).getPatientId());
			obj.setPrefix(ltpatappDetails.get(0).getTitle());
			obj.setfName(ltpatappDetails.get(0).getPatientName());
			obj.setlName(ltpatappDetails.get(0).getLastName());
			obj.setMobile(ltpatappDetails.get(0).getMobNo());
			ltpatDetails.add(obj);
			}
			

		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltpatDetails;
	}

	@Override
	public String getPatientNameFromId(Integer patientId,String callfrom) {
		// TODO Auto-generated method stub
		String patientFullName = "";
		
        try {
        	if(callfrom.equalsIgnoreCase("name")){
        		
        		String name = "SELECT concat(prefix,' ',f_name,' ',l_name) FROM ehat_patient where patient_id="+patientId+"";
                Query query1= sessionFactory.getCurrentSession().createSQLQuery(name);
                patientFullName = ((String)query1.uniqueResult());
                
        	}else if(callfrom.equalsIgnoreCase("mobile")){
        		
        		 String sql1 = "SELECT mobile FROM ehat_patient where patient_id="+patientId+"";
                 Query query2= sessionFactory.getCurrentSession().createSQLQuery(sql1);
                 patientFullName = ((String)query2.uniqueResult());
                 
        	}else if(callfrom.equalsIgnoreCase("doctor")){
        		
        		 String sql1 = "select doc_name from doctor where Doctor_ID ="+patientId+"";
                 Query query2= sessionFactory.getCurrentSession().createSQLQuery(sql1);
                 patientFullName = ((String)query2.uniqueResult());

        	}
    
		} catch (Exception e) {
			e.printStackTrace();			
		}
        return patientFullName;
	}

	@Override
	public int getPatientNameFromId(List<ScheduleAppointmentsDTO> liTotalTimeslices, String appoType,int userid) {
		
		int isInserted = 0;
		String patientMobNo="",drMobNo="";
		String msgForPatient = "";
		
		 //String sqlForDocType = "Select doc_Type from doctor where Doctor_ID = "+userid;
		  String sqlForDocType = "Select doc_Type from Doctor where Doctor_ID = "+userid;
		 Query query3= sessionFactory.getCurrentSession().createQuery(sqlForDocType);
		 String doc_Type = ((String)query3.uniqueResult());
		
		
		
		try {
			for (ScheduleAppointmentsDTO objAppointment : liTotalTimeslices) {
				int intTokenNo = 0;
				
				//For fetching doctor mobile number by Amol Saware
				patientMobNo = objAppointment.getMobNo();
				
				
				
			//	String docMobNo = "SELECT mobileNo FROM doctor where Doctor_id = '"+objAppointment.getDoctorId()+"' ";
				String docMobNo = "SELECT mobileNo FROM Doctor where Doctor_ID = '"+objAppointment.getDoctorId()+"' ";
				 Query query4= sessionFactory.getCurrentSession().createQuery(docMobNo);
				 drMobNo = ((String)query4.uniqueResult()).toString();
				
				
				
			//	String apptdate = objAppointment.getApptDate();
					Date apptdate = objAppointment.getApptDate();

				String sql4 = "SELECT ifnull(MAX(common_Token_number),0) FROM patient_opd where  app_date="+objAppointment.getApptDate()+"  ";
				try {
					
					
					 Query query5= sessionFactory.getCurrentSession().createSQLQuery(sql4);
					 String tokenNo = ((String)query5.uniqueResult()).toString();

					if (!tokenNo.equals(null) || !tokenNo.equals("")) {
						intTokenNo = Integer.parseInt(tokenNo);
					}

				} catch (Exception ex) {
					ex.printStackTrace();
					isInserted = 0;
				}
				
				int CountForHospitalHoliday = 0;
				String sqlCountForHospitalHoliday = "select count(*) from hospital_holiday where "
						+ "(DATE_FORMAT(str_to_date(date, '%Y-%m-%d'), '%Y-%m-%d') = "
						+ "DATE_FORMAT(str_to_date('"
						+ apptdate
						+ "', '%d/%m/%Y'), '%Y-%m-%d')) and status = 'Y' ";
				
				//CountForHospitalHoliday = getJdbcTemplate().queryForInt(sqlCountForHospitalHoliday);
				 Query query6= sessionFactory.getCurrentSession().createSQLQuery(sqlCountForHospitalHoliday);
				 CountForHospitalHoliday = ((Number)query6.uniqueResult()).intValue();
				
				if(CountForHospitalHoliday > 0){
					if(doc_Type.equals("admin")){

						if (objAppointment.getApptTypeId().equals("FollowUp")) {
							
							//updateFollowUpTableStatusToN(objAppointment.getApptId());
							String updateFollowupFlag ="UPDATE follow_up SET status='N' WHERE follow_up_id='"+objAppointment.getApptId()+"' ";
							SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(updateFollowupFlag);
			    			sqlQuery1.executeUpdate();
							
			    			
			    			ScheduleAppointmentsDTO obj=new ScheduleAppointmentsDTO();
							obj.setTitle(objAppointment.getTitle());
							obj.setLastName(objAppointment.getLastName());
							obj.setDoctorId(objAppointment.getDoctorId());
							obj.setTreatmentId(objAppointment.getTreatmentId());
							obj.setStatus(objAppointment.getStatus());
							obj.setApptDate(objAppointment.getApptDate());
							obj.setApptTimeFrom(objAppointment.getApptTimeFrom());
							obj.setApptTimeTo(objAppointment.getApptTimeTo());
							obj.setPatientId(objAppointment.getPatientId());
							obj.setPatientName(objAppointment.getPatientName());
							obj.setDocname(objAppointment.getDocname());
							obj.setMobNo(objAppointment.getMobNo());
							obj.setDetails(objAppointment.getDetails());
							obj.setApptTypeId("Existing");
							obj.setCommonTokenNo(Integer.toString(intTokenNo));
							obj.setNote(objAppointment.getNote());
							obj.setMvrflag("N");
							obj.setRegFlag("N");
							obj.setBranchId(objAppointment.getBranchId());
							obj.setRegType(objAppointment.getRegType());
							
							sessionFactory.getCurrentSession().merge(obj);
							isInserted = 1;
			    			
							
							
						} else {
							if (objAppointment.getApptId() == 0) {
								
								ScheduleAppointmentsDTO obj=new ScheduleAppointmentsDTO();
								obj.setTitle(objAppointment.getTitle());
								obj.setLastName(objAppointment.getLastName());
								
								obj.setDoctorId(objAppointment.getDoctorId());
								obj.setTreatmentId(objAppointment.getTreatmentId());
								obj.setStatus(objAppointment.getStatus());
								obj.setApptDate(objAppointment.getApptDate());
								obj.setApptTimeFrom(objAppointment.getApptTimeFrom());
								obj.setApptTimeTo(objAppointment.getApptTimeTo());
								obj.setPatientId(objAppointment.getPatientId());
								obj.setPatientName(objAppointment.getPatientName());
								obj.setDocname(objAppointment.getDocname());
								obj.setMobNo(objAppointment.getMobNo());
								obj.setDetails(objAppointment.getDetails());
								obj.setApptTypeId(objAppointment.getApptTypeId());
								obj.setCommonTokenNo(Integer.toString(intTokenNo));
								obj.setNote(objAppointment.getNote());
								obj.setMvrflag("N");
								obj.setRegFlag("N");
								obj.setBranchId(objAppointment.getBranchId());
								obj.setRegType(objAppointment.getRegType());
								
								sessionFactory.getCurrentSession().merge(obj);
								isInserted = 1;
								
							} else {
								
								ScheduleAppointmentsDTO obj=new ScheduleAppointmentsDTO();
								obj.setTitle(objAppointment.getTitle());
								obj.setLastName(objAppointment.getLastName());
								obj.setApptId(objAppointment.getApptId());
								obj.setDoctorId(objAppointment.getDoctorId());
								obj.setTreatmentId(objAppointment.getTreatmentId());
								obj.setStatus(objAppointment.getStatus());
								obj.setApptDate(objAppointment.getApptDate());
								obj.setApptTimeFrom(objAppointment.getApptTimeFrom());
								obj.setApptTimeTo(objAppointment.getApptTimeTo());
								obj.setPatientId(objAppointment.getPatientId());
								obj.setPatientName(objAppointment.getPatientName());
								obj.setDocname(objAppointment.getDocname());
								obj.setMobNo(objAppointment.getMobNo());
								obj.setDetails(objAppointment.getDetails());
								obj.setApptTypeId(objAppointment.getApptTypeId());
								obj.setCommonTokenNo(Integer.toString(intTokenNo));
								obj.setNote(objAppointment.getNote());
								obj.setMvrflag("N");
								obj.setRegFlag("N");
								obj.setBranchId(objAppointment.getBranchId());
								obj.setRegType(objAppointment.getRegType());
								
								sessionFactory.getCurrentSession().merge(obj);
								isInserted = 2;
								
							}
						}
					}else{
						isInserted = 3;
					}
					
				} else {

					if (objAppointment.getApptTypeId().equals(
							"FollowUp")) {
						//updateFollowUpTableStatusToN(objAppointment.getApptId());
						String updateFollowupFlag ="UPDATE follow_up SET status='N' WHERE follow_up_id='"+objAppointment.getApptId()+"' ";
						SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(updateFollowupFlag);
		    			sqlQuery1.executeUpdate();
						

		    			ScheduleAppointmentsDTO obj=new ScheduleAppointmentsDTO();
						obj.setTitle(objAppointment.getTitle());
						obj.setLastName(objAppointment.getLastName());
						obj.setDoctorId(objAppointment.getDoctorId());
						obj.setTreatmentId(objAppointment.getTreatmentId());
						obj.setStatus(objAppointment.getStatus());
						obj.setApptDate(objAppointment.getApptDate());
						obj.setApptTimeFrom(objAppointment.getApptTimeFrom());
						obj.setApptTimeTo(objAppointment.getApptTimeTo());
						obj.setPatientId(objAppointment.getPatientId());
						obj.setPatientName(objAppointment.getPatientName());
						obj.setDocname(objAppointment.getDocname());
						obj.setMobNo(objAppointment.getMobNo());
						obj.setDetails(objAppointment.getDetails());
						obj.setApptTypeId("Existing");
						obj.setCommonTokenNo(Integer.toString(intTokenNo));
						obj.setNote(objAppointment.getNote());
						obj.setMvrflag("N");
						obj.setRegFlag("N");
						obj.setBranchId(objAppointment.getBranchId());
						obj.setRegType(objAppointment.getRegType());
						
						sessionFactory.getCurrentSession().merge(obj);
						isInserted = 1;
		    			
		    			
								isInserted = 1;
						
					} else {
						if (objAppointment.getApptId() == 0) {
						
									ScheduleAppointmentsDTO obj=new ScheduleAppointmentsDTO();
									obj.setTitle(objAppointment.getTitle());
									obj.setLastName(objAppointment.getLastName());
									//obj.setApptId(maxx);
									obj.setDoctorId(objAppointment.getDoctorId());
									obj.setTreatmentId(objAppointment.getTreatmentId());
									obj.setStatus(objAppointment.getStatus());
									obj.setApptDate(objAppointment.getApptDate());
									obj.setApptTimeFrom(objAppointment.getApptTimeFrom());
									obj.setApptTimeTo(objAppointment.getApptTimeTo());
									obj.setPatientId(objAppointment.getPatientId());
									obj.setPatientName(objAppointment.getPatientName());
									obj.setDocname(objAppointment.getDocname());
									obj.setMobNo(objAppointment.getMobNo());
									obj.setDetails(objAppointment.getDetails());
									obj.setApptTypeId(objAppointment.getApptTypeId());
									obj.setCommonTokenNo(Integer.toString(intTokenNo));
									obj.setNote(objAppointment.getNote());
									obj.setMvrflag("N");
									obj.setRegFlag("N");
									obj.setBranchId(objAppointment.getBranchId());
									obj.setRegType(objAppointment.getRegType());
									
									sessionFactory.getCurrentSession().merge(obj);
									isInserted = 1;
									
									
						} else {
						
							ScheduleAppointmentsDTO obj=new ScheduleAppointmentsDTO();
							obj.setTitle(objAppointment.getTitle());
							obj.setLastName(objAppointment.getLastName());
							obj.setApptId(objAppointment.getApptId());
							obj.setDoctorId(objAppointment.getDoctorId());
							obj.setTreatmentId(objAppointment.getTreatmentId());
							obj.setStatus(objAppointment.getStatus());
							obj.setApptDate(objAppointment.getApptDate());
							obj.setApptTimeFrom(objAppointment.getApptTimeFrom());
							obj.setApptTimeTo(objAppointment.getApptTimeTo());
							obj.setPatientId(objAppointment.getPatientId());
							obj.setPatientName(objAppointment.getPatientName());
							obj.setDocname(objAppointment.getDocname());
							obj.setMobNo(objAppointment.getMobNo());
							obj.setDetails(objAppointment.getDetails());
							obj.setApptTypeId(objAppointment.getApptTypeId());
							obj.setCommonTokenNo(Integer.toString(intTokenNo));
							obj.setNote(objAppointment.getNote());
							obj.setMvrflag("N");
							obj.setRegFlag("N");
							obj.setBranchId(objAppointment.getBranchId());
							obj.setRegType(objAppointment.getRegType());
							
							sessionFactory.getCurrentSession().merge(obj);
							isInserted = 2;
					    			
					    			
						}
					}
				}
				if(isInserted==1 || isInserted==2){
					msgForPatient = "Hi,"
							+ "Your appointment is booked with " + objAppointment.getDocname()
							+ " on "+objAppointment.getApptDate()
							+ " in Rising Medicare,Pune";
				}
			}

		} catch (Exception e) {
			System.out.println("database error...could not insert: "
					+ e.getMessage());
			e.printStackTrace();
			isInserted = 0;
		}
		
		if(isInserted==1 || isInserted==2){
			ResourceBundle chkSMSFlag = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			if (chkSMSFlag.getObject("sendSMS").toString().equalsIgnoreCase("on") && 
					chkSMSFlag.getObject("appointmentScheduleSms").toString().equalsIgnoreCase("on")) {
			ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
			String hospitalName = bundle.getObject("hospitalname").toString();
			if(hospitalName.equalsIgnoreCase("MITR")){
				//send message to doctor and patient
				try {
						System.out.println(drMobNo +"***"+ patientMobNo);
						if (drMobNo.length() == 10) {
							//SendSMSAllFormat.sendSMS("", "", "", "",drMobNo, msgForDoctor);
						}
						if (patientMobNo.length() == 10) {
							//SendSMSAllFormat.sendSMS("", "", "", "",patientMobNo, msgForDoctor);
						}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}else if(hospitalName.equalsIgnoreCase("rising")){
				if (patientMobNo.length() == 10) {
					SendSMSAllFormat.sendSMS("", "", "", "",patientMobNo, msgForPatient);
				}
			}
			}
		}
		//Added by Vikas Godse for sending email
/*		if(isInserted==1 || isInserted==2){
			
			if(liTotalTimeslices.size()>=0){
				for (Appointment objAppointment : liFinalAppo) {
					if(objAppointment.getEmail()!=null && !(objAppointment.getEmail().equals(""))){
							ResourceBundle bundle1 = ResourceBundle.getBundle("hospitalaccess");
							String hospName = bundle1.getObject("hospitalname").toString();
								if(hospName.equals("rising")){
									ResourceBundle bundle = ResourceBundle.getBundle("appointmentMail");
									String appoData = bundle.getObject("appomail").toString();
									String RoomName = "";
									try{
									SimpleDateFormat parser = new SimpleDateFormat("HH:mm:ss");
									String strDate = objAppointment.getApptDate();
									DateFormat format = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
									Date date = format.parse(strDate);
									
									String strTime=objAppointment.getApptTimeFrom();
									Date currentTime = parser.parse(strTime);
									String todaysRoom = "";
									
									
									SimpleDateFormat format1=new SimpleDateFormat("dd/MM/yyyy");
									Date dt1=format1.parse(strDate);
									DateFormat format2=new SimpleDateFormat("EE"); 
									String selectedDay=format2.format(dt1);
									String day=selectedDay.split(" ")[0].toLowerCase();
									
									
									Date twelveAM = parser.parse("00:00:00");
									Date twelvePM = parser.parse("12:00:00");
									Date fourPM = parser.parse("16:00:00");
									if(currentTime.after(twelveAM) && currentTime.before(twelvePM)){
										todaysRoom = day+"_mor_room";
										
									}else if(currentTime.after(twelvePM) && currentTime.before(fourPM)){
										todaysRoom = day+"_aft_room";
										
									}else if(currentTime.after(fourPM)){
										todaysRoom = day+"_eve_room";
									}
									
									String query="select room_name from schedular_doctor_timeslot sdt left join ehat_scheduler_room_master rm on sdt."+todaysRoom+"= rm.room_id where Doctor_id='"+objAppointment.getDoctorId()+"'";
									List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
									for (Map rs : rows) {
										RoomName = (String) rs.get("room_name");
									}
									
								} catch (ParseException e1) {
									e1.printStackTrace();
								}
									String replacePatientName = appoData
											.replaceAll(
													"Patient",
													objAppointment.getTitle()+""+objAppointment.getPatientName()+" "+objAppointment.getLastName());
									String doctorName=replacePatientName
											.replaceAll(
													"DoctorName",objAppointment.getDocname());
									String docTime=doctorName
											.replaceAll(
													"AppoTime",objAppointment.getApptTimeFrom());
									String roomName=docTime
											.replaceAll(
													"roomName",RoomName);
				
									try {
										//for sending mail
										String mailSubject = "Appointment";
										//String mailData = "mailData";
										SSLEmail sendMail = new SSLEmail();
										sendMail.sendMail(objAppointment.getEmail(), roomName, mailSubject);
									} catch (Exception e) {
										e.printStackTrace();
									}
								}
			
					}
				}
				}
			}*///End
		
		//int insertedMaxid = objTreatmentModel.maxColumnId("Appt_ID", "appointment");
		
		return isInserted;
	}

	@Override
	public List<AppointPatientResponseDTO> getPatientAppointListData(AppointmentParameterDTO obj) {
		
		
		List<AppointPatientResponseDTO> lstappointment = new ArrayList<AppointPatientResponseDTO>();
		 Query q=null;
		 try {
		 //new patient
		if(obj.getAppointmentType().equalsIgnoreCase("New")) {
			
			   if(obj.getActionType().equalsIgnoreCase("L")) {
				    q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_load_search_appointment_patient_doctor_data(:appDate,:appType,:actionType,:searchType,:searchNme)");
				   
					q.setParameter("appDate", obj.getAppointmentDate());
					q.setParameter("appType", obj.getAppointmentType());
					q.setParameter("actionType", obj.getActionType());
					q.setParameter("searchType", null);
					q.setParameter("searchNme", null);
					
				   
			   }
			   if(obj.getActionType().equalsIgnoreCase("S")) {
				   
				   if(obj.getSearchType().equalsIgnoreCase("P")) {
				    q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_load_search_appointment_patient_doctor_data(:appDate,:appType,:actionType,:searchType,:searchNme)");
				   
					q.setParameter("appDate", obj.getAppointmentDate());
					q.setParameter("appType", obj.getAppointmentType());
					q.setParameter("actionType",'S');
					q.setParameter("searchType", 'P');
					q.setParameter("searchNme", obj.getSearchName());
					
				   }
				   
				   if(obj.getSearchType().equalsIgnoreCase("D")) {
					    q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_load_search_appointment_patient_doctor_data(:appDate,:appType,:actionType,:searchType,:searchNme)");
					   
						q.setParameter("appDate", obj.getAppointmentDate());
						q.setParameter("appType", obj.getAppointmentType());
						q.setParameter("actionType",'S');
						q.setParameter("searchType", 'D');
						q.setParameter("searchNme", obj.getSearchName());
						
					   }
				   
			   }
			        
		}
		
		//existing patient
		if(obj.getAppointmentType().equalsIgnoreCase("Existing")) {
			
			   if(obj.getActionType().equalsIgnoreCase("L")) {
				    q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_load_search_appointment_patient_doctor_data(:appDate,:appType,:actionType,:searchType,:searchNme)");
				   
					q.setParameter("appDate", obj.getAppointmentDate());
					q.setParameter("appType", obj.getAppointmentType());
					q.setParameter("actionType", obj.getActionType());
					q.setParameter("searchType", null);
					q.setParameter("searchNme", null);
					
				   
			   }
			   if(obj.getActionType().equalsIgnoreCase("S")) {
				   
				   if(obj.getSearchType().equalsIgnoreCase("P")) {
				    q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_load_search_appointment_patient_doctor_data(:appDate,:appType,:actionType,:searchType,:searchNme)");
				   
					q.setParameter("appDate", obj.getAppointmentDate());
					q.setParameter("appType", obj.getAppointmentType());
					q.setParameter("actionType",'S');
					q.setParameter("searchType", 'P');
					q.setParameter("searchNme", obj.getSearchName());
					
				   }
				   
				   if(obj.getSearchType().equalsIgnoreCase("D")) {
					    q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_load_search_appointment_patient_doctor_data(:appDate,:appType,:actionType,:searchType,:searchNme)");
					   
						q.setParameter("appDate", obj.getAppointmentDate());
						q.setParameter("appType", obj.getAppointmentType());
						q.setParameter("actionType",'S');
						q.setParameter("searchType", 'D');
						q.setParameter("searchNme", obj.getSearchName());
						
					   }
				   
			   }
			        
		}
		
		//reschedule  patient
		
		if(obj.getAppointmentType().equalsIgnoreCase("Reschedule")) {
			
			   if(obj.getActionType().equalsIgnoreCase("L")) {
				    q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_load_search_appointment_patient_doctor_data(:appDate,:appType,:actionType,:searchType,:searchNme)");
				   
					q.setParameter("appDate", obj.getAppointmentDate());
					q.setParameter("appType", null);
					q.setParameter("actionType", obj.getActionType());
					q.setParameter("searchType", null);
					q.setParameter("searchNme", null);
					
				   
			   }
			   if(obj.getActionType().equalsIgnoreCase("S")) {
				   
				   if(obj.getSearchType().equalsIgnoreCase("P")) {
				    q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_load_search_appointment_patient_doctor_data(:appDate,:appType,:actionType,:searchType,:searchNme)");
				   
					q.setParameter("appDate", obj.getAppointmentDate());
					q.setParameter("appType", null);
					q.setParameter("actionType",'S');
					q.setParameter("searchType", 'P');
					q.setParameter("searchNme", obj.getSearchName());
					
				   }
				   
				   if(obj.getSearchType().equalsIgnoreCase("D")) {
					    q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_load_search_appointment_patient_doctor_data(:appDate,:appType,:actionType,:searchType,:searchNme)");
					   
						q.setParameter("appDate", obj.getAppointmentDate());
						q.setParameter("appType", null);
						q.setParameter("actionType",'S');
						q.setParameter("searchType", 'D');
						q.setParameter("searchNme", obj.getSearchName());
						
					   }
				   
			   }
			        
		}
		 }catch (Exception e) {
			e.printStackTrace();
		}
		
		q.setResultTransformer(Transformers.aliasToBean(AppointPatientResponseDTO.class));
		
		lstappointment=q.list();
		
		return lstappointment;
	}

	@Override
	public List<SchedularExistingPatientDTO> getGetSchedularExistingPatientDTOList(String searchType,String searchText) {
		List<SchedularExistingPatientDTO> lstExistingPatient = new ArrayList<SchedularExistingPatientDTO>();
		 Query q=null;
		 try {
			 if(searchType.equalsIgnoreCase("1")) {
				 q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_search_patient_by_id_name_mobile(:patientId,:patientname,:mobileNo)");
				 q.setParameter("patientId", searchText);
				 q.setParameter("patientname", null);
				 q.setParameter("mobileNo", null);
			 }else if(searchType.equalsIgnoreCase("2")) {
				 q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_search_patient_by_id_name_mobile(:patientId,:patientname,:mobileNo)");
				 q.setParameter("patientId", null);
				 q.setParameter("patientname", searchText);
				 q.setParameter("mobileNo", null);
			 }else if(searchType.equalsIgnoreCase("3")) {
				 q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_search_patient_by_id_name_mobile(:patientId,:patientname,:mobileNo)");
				 q.setParameter("patientId", null);
				 q.setParameter("patientname", null);
				 q.setParameter("mobileNo", searchText);
			 }
			 
			 q.setResultTransformer(Transformers.aliasToBean(SchedularExistingPatientDTO.class));
				
			 lstExistingPatient=q.list();
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return lstExistingPatient;
	}

	@Override
	public List<FollowUpResponseDTO> getFolloupPatientList() {
		List<FollowUpResponseDTO> lstfollowupPatient = new ArrayList<FollowUpResponseDTO>();
		 Query q=null;
		try {
			
			 q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_get_patient_followup()");
			 q.setResultTransformer(Transformers.aliasToBean(FollowUpResponseDTO.class));
				
			 lstfollowupPatient=q.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lstfollowupPatient;
	}

	@Override
	public List<FollowUpResponseDTO> searchFolloupPatientList(String serachType, String serachText) {
		List<FollowUpResponseDTO> lstfollowupPatient = new ArrayList<FollowUpResponseDTO>();
		 Query q=null;
		try {
			
			 q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_get_patient_followup_search(:serachType,:serachText)");
			 q.setParameter("serachType", serachType);
			 q.setParameter("serachText", serachText);
			 q.setResultTransformer(Transformers.aliasToBean(FollowUpResponseDTO.class));
				
			 lstfollowupPatient=q.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lstfollowupPatient;
	}

	@Override
	public int cancelPatientFollowUp(Integer followupId) {
		try {
			     String sql="UPDATE OPDPrescriptionFolloUpDto set status='N' ,deletedDate=now() where followUpId="+followupId+"";
			      Query q=  sessionFactory.getCurrentSession().createQuery(sql);
			      q.executeUpdate();
			      return 1;
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}


	
}
