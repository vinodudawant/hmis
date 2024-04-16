 package com.hms.rostermanagement.dao.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaQuery;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.rostermanagement.controller.RosterSchedulerController;
import com.hms.rostermanagement.dao.RosterSchedulerDao;
import com.hms.rostermanagement.dto.RosterSchedulerDto;
import com.hms.rostermanagement.dto.ShiftAllocationMaster;
import com.hms.rostermanagement.dto.ShiftMasterDto;
@Repository
public class RosterSchedulerDaoImpl  implements RosterSchedulerDao{
	@Autowired
	SessionFactory sessionFactory;
	static Logger log=Logger.getLogger(RosterSchedulerController.class.getName());
	
	
	
	@Override
	public int saveRosterScheduler(String scheduleDetails,RosterSchedulerDto rosterdto,HttpServletRequest request) 
	{
		try {
		
			String query=null;
			int isAvailable=0;
			String query1=null;
			int isAvailable1=0;
		
			query = "select COALESCE(MAX(count_id),0)  from ehat_roster_scheduler ";
			isAvailable = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(query).uniqueResult()).intValue();
		    isAvailable = isAvailable+1;
			RosterSchedulerDto dto1=(RosterSchedulerDto) ConfigUIJSONUtility.getObjectFromJSON(scheduleDetails, RosterSchedulerDto.class);
			RosterSchedulerDto obj1 = new RosterSchedulerDto();
			   
			query1 = "select count(name) from ehat_roster_scheduler where name='"+dto1.getSchedulerList().get(0).getNameSchedule()+"'";
			isAvailable1 = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(query1).uniqueResult()).intValue();
			if(isAvailable1>0)
			{
			 
				return 3;
			 }else{
				 
				 for (int i = 0; i < dto1.getSchedulerList().size(); i++) {
				    	obj1.setCountid(isAvailable);
					    obj1.setScheduleStardate(dto1.getSchedulerList().get(i).getScheduleStardate());
					    obj1.setNameSchedule(dto1.getSchedulerList().get(i).getNameSchedule());
					    obj1.setMaxDuration(dto1.getSchedulerList().get(i).getMaxDuration());
					    obj1.setDatechecked(dto1.getSchedulerList().get(i).getDatechecked());	
					    obj1.setResDay(dto1.getSchedulerList().get(i).getResDay());
						obj1.setResDate(dto1.getSchedulerList().get(i).getResDate());
						
						HttpSession session = request.getSession();
						Integer userId = (Integer) session.getAttribute("userId1");
						obj1.setCreatedBy(userId);
						obj1.setCreatedBy(obj1.getCreatedBy());
						obj1.setDeleted("N");
						obj1.setCreatedDate(new Date(new java.util.Date().getTime()));
						sessionFactory.getCurrentSession().merge(obj1);
						
					}	
				   obj1=null;
			 }

		} catch (Exception e) {
		//	e.printStackTrace();
			log.error("error for  saveRosterScheduler....",e);
			return 0;
		}
		return 1;
	}


	@Override
    public int saveShiftMaster(ShiftMasterDto shiftdto,
            HttpServletRequest request) {
      try {
           
    	  
         
			/*
			 * String query1=null; int isAvailable1=0; query1 =
			 * "select count(shift_name) from ehat_shift_master where shift_name='"+shiftdto
			 * .getShiftname()+"'"; System.out.println(query1); isAvailable1 = ((BigInteger)
			 * sessionFactory.getCurrentSession().createSQLQuery(query1).uniqueResult()).
			 * intValue(); if(isAvailable1>0) {
			 * 
			 * return 2; } else { shiftdto.setCreatedDate(new Date(new
			 * java.util.Date().getTime()));
			 * sessionFactory.getCurrentSession().merge(shiftdto); }
			 */
    	  
    	     if(shiftdto.getShiftId()==0) {
    	    	 sessionFactory.getCurrentSession().merge(shiftdto);
    	    	 return 1;
    	     }else {
    	    	 sessionFactory.getCurrentSession().merge(shiftdto);
    	    	 return 2;
    	     }
    	  
    	  
    	  
            } catch (Exception e) {
                e.printStackTrace();
                log.error("error for  saveShiftMaster....",e);
                return 0;
            }
          
        }


	@Override
	public List<ShiftMasterDto> getAllShiftMasterList() {
		List<ShiftMasterDto> ltoutsource = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ShiftMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("shiftId"));// ShiftMasterDto id mapping 
			ltoutsource = criteria.list();

		} catch (Exception e) {
			//e.printStackTrace();
			log.error("error for  getAllShiftMasterList....",e);

		}
		return ltoutsource;
	}


	@Override
	public boolean deleteshiftMaster(Integer shiftId, Integer userid) {
		try {

			ShiftMasterDto outSourceDto = (ShiftMasterDto) sessionFactory.getCurrentSession().get(ShiftMasterDto.class,shiftId);
			outSourceDto.setDeleted("Y");
			outSourceDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			outSourceDto.setDeletedBy(userid);

		} catch (Exception e) {
			//e.printStackTrace();
			log.error("error for  deleteshiftMaster....",e);
			return false;
		}
		return true;
	}


	@Override
	public List<RosterSchedulerDto> getAllRosterSchedulerList() {
		List<RosterSchedulerDto> ltoutsource = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RosterSchedulerDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("schedulerId"));// RosterSchedulerDto id mapping 
			ltoutsource = criteria.list();

		} catch (Exception e) {
			//e.printStackTrace();
			log.error("error for  getAllRosterSchedulerList....",e);

		}
		return ltoutsource;
	}
	
	
	@Override
	public List<RosterSchedulerDto> getRosterScheduleListFromId(Integer rosterListId) {
		List<RosterSchedulerDto> ltoutsource = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RosterSchedulerDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("countid", rosterListId));//id mapping with roaster count
			criteria.addOrder(Order.asc("schedulerId"));// RosterSchedulerDto id mapping 
			ltoutsource = criteria.list();

		} catch (Exception e) {
			log.error("error for  getRosterScheduleListFromId....",e);
			//e.printStackTrace();
		}
		return ltoutsource;
	}
	
	@Override
	public JSONArray getUserListFromType(String userType) {
		JSONArray roleArray=new JSONArray();
		try{
			String sql = "";
			if(userType.equalsIgnoreCase("select") || userType.equalsIgnoreCase("") || userType.equalsIgnoreCase(null)){
				 sql = "SELECT User_ID,concat(f_name,' ',l_name) as User_Name FROM users ";
			}else{
				 sql = "SELECT User_ID,concat(f_name,' ',l_name) as User_Name FROM users where user_Type = '"+userType+"' ";
			}
			 
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 
	        	  JSONObject jsonObject=new JSONObject();
	   	       jsonObject.put("userId", row.get("User_ID").toString());
	   	       jsonObject.put("userName", row.get("User_Name").toString());
	   		   roleArray.add(jsonObject);
	        	 
	         }
			  

	} catch (Exception e) {
		//e.printStackTrace();
		log.error("error for  getUserListFromType....",e);

	}
		return roleArray;
	}
	

	@Override
	public List<ShiftMasterDto> geShiftMasterRecordList(Integer shiftid) {
		List<ShiftMasterDto> ltoutsource = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ShiftMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("shiftId", shiftid));// RosterSchedulerDto id mapping 
			ltoutsource = criteria.list();

		} catch (Exception e) {
			//e.printStackTrace();
			log.error("error for  getShiftMasterRecordList....",e);
		}
		return ltoutsource;
	}


	@Override
	public int saveShiftallocation(String employeeidList,ShiftAllocationMaster shiftdto,
 HttpServletRequest request) {
		try {

			ShiftAllocationMaster dto1 = (ShiftAllocationMaster) ConfigUIJSONUtility.getObjectFromJSON(employeeidList,ShiftAllocationMaster.class);
		
			String employeelist2 = (String) dto1.getShiftallocationlist().get(0).getEmployeeidList();

			String epmlist[] = employeelist2.split(",");
			
			ShiftAllocationMaster sm = new ShiftAllocationMaster();
			int i=0;
			if(dto1.getShiftallocationlist().get(0).getShiftallocationId()==0)
		    {
				for ( i = 0; i < epmlist.length; i++) {
			    sm.setShiftid(dto1.getShiftallocationlist().get(0).getShiftid());
				sm.setName(dto1.getShiftallocationlist().get(0).getName());
				sm.setDate(dto1.getShiftallocationlist().get(0).getDate());
				sm.setLocation(dto1.getShiftallocationlist().get(0).getLocation());
				sm.setStartTime(dto1.getShiftallocationlist().get(0).getStartTime());
				sm.setEndTime(dto1.getShiftallocationlist().get(0).getEndTime());
				sm.setSameDay(dto1.getShiftallocationlist().get(0).getSameDay());
				sm.setColourId(dto1.getShiftallocationlist().get(0).getColourId());
				sm.setSelectedDates(dto1.getShiftallocationlist().get(0).getSelectedDates());
				sm.setSelecteddays(dto1.getShiftallocationlist().get(0).getSelecteddays());
				sm.setEmployeetype(dto1.getShiftallocationlist().get(0).getEmployeetype());
				sm.setScheduleid(dto1.getShiftallocationlist().get(0).getScheduleid());
				sm.setCountOfDate(dto1.getShiftallocationlist().get(0).getCountOfDate());
				sm.setEmployeeidList(epmlist[i]);

				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				sm.setCreatedBy(userId);
				sm.setCreatedBy(shiftdto.getCreatedBy());
				sm.setDeleted("N");
				sm.setCreatedDate(new Date(new java.util.Date().getTime()));
				sessionFactory.getCurrentSession().merge(sm);

			}
	
        }else
        {      
        	    sm.setShiftallocationId(dto1.getShiftallocationlist().get(0).getShiftallocationId());
        	    sm.setShiftid(dto1.getShiftallocationlist().get(0).getShiftid());
				sm.setName(dto1.getShiftallocationlist().get(0).getName());
				sm.setDate(dto1.getShiftallocationlist().get(0).getDate());
				sm.setLocation(dto1.getShiftallocationlist().get(0).getLocation());
				sm.setStartTime(dto1.getShiftallocationlist().get(0).getStartTime());
				sm.setEndTime(dto1.getShiftallocationlist().get(0).getEndTime());
				sm.setSameDay(dto1.getShiftallocationlist().get(0).getSameDay());
				sm.setColourId(dto1.getShiftallocationlist().get(0).getColourId());
				sm.setSelectedDates(dto1.getShiftallocationlist().get(0).getSelectedDates());
				sm.setSelecteddays(dto1.getShiftallocationlist().get(0).getSelecteddays());
				sm.setEmployeetype(dto1.getShiftallocationlist().get(0).getEmployeetype());
				sm.setScheduleid(dto1.getShiftallocationlist().get(0).getScheduleid());
				sm.setEmployeeidList(dto1.getShiftallocationlist().get(0).getEmployeeidList());
				sm.setCountOfDate(dto1.getShiftallocationlist().get(0).getCountOfDate());

				HttpSession session = request.getSession();
				int userId = (int) session.getAttribute("userId1");
				sm.setUpdatedBy(shiftdto.getUpdatedBy());
				sm.setUpdatedBy(userId);
				sm.setUpdatedDate(new Date(new java.util.Date().getTime()));
				sessionFactory.getCurrentSession().merge(sm);
        	
        }
			
			dto1 = null;

		} catch (Exception e) {
			//e.printStackTrace();
			log.error("error for in  saveShiftallocation method ....",e);
			return 0;
		}
		return 1;
	}


	@Override
	public List<ShiftAllocationMaster> getShiftTypeallocation() {
		List<ShiftAllocationMaster> ltoutsource = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ShiftAllocationMaster.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("shiftid"));// RosterSchedulerDto id mapping 
			ltoutsource = criteria.list();

		} catch (Exception e) {
			//e.printStackTrace();
			log.error("error for in  getShiftTypeallocation method ....",e);

		}
		return ltoutsource;
	}


	@Override
	public List<RosterSchedulerDto> getRosterList() {
		List<RosterSchedulerDto> listroster = new ArrayList<RosterSchedulerDto>();
		List<RosterSchedulerDto> listroster1 = new ArrayList<RosterSchedulerDto>();
		Set<RosterSchedulerDto> list=new HashSet<>();

		SQLQuery query = null;

		try {
			/*query = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT rs.count_id as countid,rs.name as name FROM ehat_roster_scheduler rs group by rs.name ");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				RosterSchedulerDto rsobj = new RosterSchedulerDto();
				if (row[0] != null)
					rsobj.setCountid(Integer.parseInt(row[0].toString()));
				else
					rsobj.setCountid(0);

				if (row[1] != null)
					rsobj.setNameSchedule((row[1].toString()));
				else
					rsobj.setNameSchedule("-");

				listroster.add(rsobj);
			
		  
			

			}*/
			
			 Criteria c= 	sessionFactory.getCurrentSession().createCriteria(RosterSchedulerDto.class);
			 c.addOrder(Order.desc("schedulerId"));
			 //c.setProjection(Projections.groupProperty("nameSchedule"));
			 
			   		listroster= c.list();
				  list=new  HashSet<>(listroster);
				  listroster1.addAll(list);

		} catch (Exception e) {
			log.error("error for in  getRosterList method ....",e);
			//e.printStackTrace();
		}
		return listroster1;

	}


	@Override
	public List<ShiftAllocationMaster> getRosterListOfEmployee(Integer rosterListId, Integer employeeListId) {
		List<ShiftAllocationMaster> ltoutsource = null;
		try {
			
			String employeeListIdd =employeeListId.toString();
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ShiftAllocationMaster.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("scheduleid", rosterListId));
			criteria.add(Restrictions.eq("employeeidList", employeeListIdd));
     		criteria.addOrder(Order.asc("shiftid"));// RosterSchedulerDto id mapping 
			ltoutsource = criteria.list();

		} catch (Exception e) {			
			log.error("error for in  getRosterListOfEmployee method ....",e);
			//e.printStackTrace();
		}
		return ltoutsource;
	}
	

	@Override
	public List<ShiftAllocationMaster> getRosterListOfEmployeeTypeForDashboard(Integer rosterListId, Integer employeeListId,String userTypeNmae) {
	
			List<ShiftAllocationMaster> ltPatientRecord = new ArrayList<ShiftAllocationMaster>();
			
			String dates ="";
			try {
				
				String quey="";
				if(employeeListId == 1){
					quey="SELECT *,GROUP_CONCAT(selected_Dates) as dates FROM ehat_roster_shift_allocation where employee_type ='"+userTypeNmae+"' and schedule_id = "+rosterListId+" and deleted = 'N' group by employee_type ";
				}else{
					quey="SELECT *,GROUP_CONCAT(selected_Dates) as dates FROM ehat_roster_shift_allocation where schedule_id = "+rosterListId+" and deleted = 'N' group by employee_type ";

				}
				// String sql = "SELECT * FROM ehat_roster_shift_allocation where schedule_id = "+rosterListId+" and deleted = 'N' and count_of_date=(select MAX(count_of_date) as max_count FROM ehat_roster_shift_allocation) limit 1";
				// String sql = "SELECT * FROM ehat_roster_shift_allocation where schedule_id = "+rosterListId+" and deleted = 'N' group by employee_type ORDER BY MAX(count_of_date) desc ";
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(quey);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 ShiftAllocationMaster objDTO= new ShiftAllocationMaster();
		        	 
		        	 
						 dates = (String) row.get("dates");
					
					
					String datesarray[] = dates.split(",");
			      	StringBuilder uniqueDates = new StringBuilder();
					
					for (int i = 0; i < datesarray.length; i++) {
					   
						boolean found = false;
					   
						for (int j = i+1; j < datesarray.length; j++) {
					       
							if (datesarray[j].equals(datesarray[i])) {
					           
								found = true;
					            break;
					        }
					    }
					    if (!found) {
					        if (uniqueDates.length() > 0)
					            
					        	uniqueDates.append(',');
					        
					        uniqueDates.append(datesarray[i]);
					    }
					}
					String uniqueD=uniqueDates.toString();
		        	 
		        	 
		        	 objDTO.setShiftallocationId((Integer)row.get("shift_allocation_Id"));
		        	 objDTO.setColourId((String)row.get("colour_Id"));
		        	 objDTO.setScheduleid((Integer)row.get("schedule_id"));
		        	 objDTO.setEmployeetype((String)row.get("employee_type"));
		        	 //objDTO.setSelectedDates((String)row.get("selected_Dates"));
		        	 objDTO.setSelectedDates(uniqueD);
		        	 objDTO.setSelecteddays((String)row.get("selected_days"));
		        	 objDTO.setCountOfDate((Integer)row.get("count_of_date"));
		        	 
		        	 ltPatientRecord.add(objDTO);
		        	 objDTO=null;
		         }
		         
		         
			} catch (Exception e) {
				log.error("error for in  getRosterListOfEmployeeTypeForDashboard method ....",e);
				//return ltPatientRecord;
			}
			return ltPatientRecord;
		
		
	}


	@Override
	public List<ShiftMasterDto> autoSuggestionshiftMasterNames(String letter) {
		List<ShiftMasterDto> ltshiftMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ShiftMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("shiftId"));
			criteria.add(Restrictions.like("shiftname", letter + "%"));
			criteria.setMaxResults(10);
			ltshiftMasters = criteria.list();

		} catch (Exception e) {
			log.error("error for in  autoSuggestionshiftMasterNames method ....",e);
			//	e.printStackTrace();
		}
		return ltshiftMasters;
	}


	@Override
	public List<RosterSchedulerDto> autoSuggestionRosterScheduleNames(
			String letter) {
		List<RosterSchedulerDto> ltrosterMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RosterSchedulerDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("schedulerId"));
			criteria.add(Restrictions.like("nameSchedule", letter + "%"));
			criteria.setMaxResults(10);
			ltrosterMasters = criteria.list();

		} catch (Exception e) {
			log.error("error for in  autoSuggestionRosterScheduleNames method ....",e);
			//e.printStackTrace();
		}
		return ltrosterMasters;
	}


	@Override
	public List<ShiftAllocationMaster> editShiftallocation(
			Integer shiftallocationid) {
		List<ShiftAllocationMaster> ltoutsource = null;
		try {		
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ShiftAllocationMaster.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("shiftallocationId", shiftallocationid));
			criteria.addOrder(Order.asc("shiftid"));// RosterSchedulerDto id mapping 
			ltoutsource = criteria.list();

		} catch (Exception e) {
			log.error("error for in  editShiftallocation method ....",e);
			//	e.printStackTrace();
		}
		return ltoutsource;
	}


	@Override
	public boolean deleteShiftAllocation(Integer shiftallocationid,
			Integer userid) {
		try {

			ShiftAllocationMaster shiftDto = (ShiftAllocationMaster) sessionFactory.getCurrentSession().get(ShiftAllocationMaster.class,shiftallocationid);
			shiftDto.setDeleted("Y");
			shiftDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			shiftDto.setDeletedBy(userid);

		} catch (Exception e) {
			log.error("error for in  deleteShiftAllocation method ....",e);
			//e.printStackTrace();
			return false;
		}
		return true;
	}


	@Override
	public int checkTimeDateExitingEmployee(Integer employeeid,
			String startTime,String endTime, String scheduleid ,String selectedDates) {
		String query = null;
		int isAvailable = 0;
		
		String labReqId[] = selectedDates.split(",");

		try {
			
			for (int j = 0; j < labReqId.length; j++) {
			
		    query = "select count(es.schedule_id) from ehat_roster_shift_allocation es where  es.employee_id = "+ employeeid+ " and es.deleted='N' and es.selected_Dates like '%"+labReqId[j]+"%' and es.schedule_id="	+ scheduleid ;    
			
			isAvailable = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(query).uniqueResult()).intValue();
			
			}
			
			if(isAvailable>0)
			{
				query = "select count(*) from ehat_roster_shift_allocation es where  es.employee_id = "+ employeeid+ " and es.deleted='N' and es.schedule_id="	+ scheduleid +"  AND es.startTime < '"+endTime+"' AND es.endTime > '"+startTime+"'" ;
              
				isAvailable = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(query).uniqueResult()).intValue();

			}else
			{
				isAvailable=0;
			}

		} catch (Exception e) {
			log.error("error for in  checkTimeDateExitingEmployee method ....",e);
			e.printStackTrace();
			return isAvailable;
		}
		return isAvailable;
	}


	@Override
	public List<RosterSchedulerDto> getrosterDate(Integer rosterListId,String employeeType, Integer employeeId) {
		List<RosterSchedulerDto> ltoutsource = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RosterSchedulerDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("countid", rosterListId));//id mapping with roaster count
			criteria.add(Restrictions.eq("datechecked", "Y"));
			criteria.addOrder(Order.asc("schedulerId"));// RosterSchedulerDto id mapping 
			ltoutsource = criteria.list();
			
			List<ShiftAllocationMaster> listShiftAllocationMaster = getShiftallocationmaster( rosterListId, employeeType,  employeeId);
			String selectedDates = "";
			
			if(listShiftAllocationMaster.size()>0)
			{
			 selectedDates = listShiftAllocationMaster.get(0).getSelectedDates();
			
			}
			
			if(ltoutsource.size()>0)
			{
				ltoutsource.get(0).setSelectedDates(selectedDates);
			}

		} catch (Exception e) {		
			log.error("error for in  getrosterDate method ....",e);
			//e.printStackTrace();
		}
		return ltoutsource;
	}

	
	
	
	public List<ShiftAllocationMaster> getShiftallocationmaster(Integer rosterListId,String employeeType, Integer employeeId) {
		List<ShiftAllocationMaster> ltoutsource = null;
		try {		
			
			
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ShiftAllocationMaster.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("scheduleid", rosterListId));
			criteria.add(Restrictions.eq("employeetype", employeeType));
			criteria.add(Restrictions.eq("employeeidList",  employeeId.toString()));
			criteria.addOrder(Order.asc("shiftid"));// RosterSchedulerDto id mapping 
			ltoutsource = criteria.list();

		} catch (Exception e) {
			log.error("error for in  getShiftallocationmaster method ....",e);
			//e.printStackTrace();
		}
		return ltoutsource;
	}

	@Override
	public List<ShiftAllocationMaster> showPopUpOfShiftDashboard(
			Integer rosterListId, String resDate, String userTypeName) {

		List<ShiftAllocationMaster> shiftlist = new ArrayList<ShiftAllocationMaster>();
		
	
		try {
			
			String quey="";
			
			 quey="SELECT rs.shift_allocation_Id as shiftAllocationId,concat(ifnull(u.f_name,''), ' ', ifnull(u.m_name,''), ' ', ifnull(u.l_name,'')) as userName,u.user_Type as userType,rs.startTime,rs.endTime,rs.schedule_id,rs.selected_days,rs.selected_Dates FROM  ehat_roster_shift_allocation rs inner join users u On u.User_ID = rs.employee_id where rs.deleted ='N' and rs.employee_type='"+ userTypeName+ "' and rs.schedule_id='"+ rosterListId+ "' and rs.selected_Dates like '%"+ resDate + "%'";
			
			 //System.out.println(quey);
			 
			 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(quey);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 
	        	 ShiftAllocationMaster objDTO= new ShiftAllocationMaster();
	        	 
	             objDTO.setShiftallocationId((Integer)row.get("shiftAllocationId"));
	        	 objDTO.setUserName((String)row.get("userName"));
	        	 objDTO.setUserType((String)row.get("userType"));
	        	 objDTO.setStartTime((String)row.get("startTime"));
	        	 objDTO.setEndTime((String)row.get("endTime"));
	        	 objDTO.setScheduleid((Integer)row.get("schedule_id"));
	        	 objDTO.setSelecteddays((String)row.get("selected_days"));
	        	 objDTO.setSelectedDates((String)row.get("selected_Dates"));
	        	 shiftlist.add(objDTO);
	        	 objDTO=null;
	         }
	         
	         
		} catch (Exception e) {
			log.error("error for in  showPopUpOfShiftDashboard method ....",e);			
		}
		return shiftlist;
	
		

	}


	@Override
	public List<RosterSchedulerDto> getrosterDateinsertTime(Integer rosterListId) {
		List<RosterSchedulerDto> ltoutsource = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RosterSchedulerDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("countid", rosterListId));//id mapping with roaster count
			criteria.add(Restrictions.eq("datechecked", "Y"));
			criteria.addOrder(Order.asc("schedulerId"));// RosterSchedulerDto id mapping 
			ltoutsource = criteria.list();	

		} catch (Exception e) {
			log.error("error for in  getrosterDateinsertTime method ....",e);			
			//e.printStackTrace();
		}
		return ltoutsource;
	}

}


