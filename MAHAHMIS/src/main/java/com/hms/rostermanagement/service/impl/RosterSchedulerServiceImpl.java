package com.hms.rostermanagement.service.impl;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.rostermanagement.dao.RosterSchedulerDao;
import com.hms.rostermanagement.service.RosterSchedulerService;
import com.hms.rostermanagement.dto.ConsultingRoomMaterDTO;
import com.hms.rostermanagement.dto.RosterSchedulerDto;
import com.hms.rostermanagement.dto.ShiftAllocationMaster;
import com.hms.rostermanagement.dto.ShiftMasterDto;
@Service
public class RosterSchedulerServiceImpl implements RosterSchedulerService{
   
	@Autowired
	RosterSchedulerDao rosterSchedulerdao;
	
	@Autowired
	   SessionFactory sf;
	
	@Override
	@Transactional
	public int saveRosterScheduler(String scheduleDetails,RosterSchedulerDto rosterdto,HttpServletRequest request) {
	
		if (rosterdto.getSchedulerId() == 0) {
			
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			rosterdto.setCreatedBy(userId);
			rosterdto.setCreatedBy(rosterdto.getCreatedBy());
			rosterdto.setDeleted("N");
			

		} else {

			HttpSession session = request.getSession();
			int userId = (int) session.getAttribute("userId1");
			rosterdto.setScheduleStardate(rosterdto.getScheduleStardate());
			rosterdto.setUpdatedBy(rosterdto.getUpdatedBy());
			rosterdto.setDeleted("N");
			rosterdto.setUpdatedBy(userId);
		}

		
		if (rosterSchedulerdao.saveRosterScheduler(scheduleDetails,rosterdto,request)==1) 
		{
			if(rosterdto.getSchedulerId() == 0)
			{
				return 1;
			}else{
				return 2;
			}
		} else 
		{
			return 2;
		}
	}

	@Override
	@Transactional
	public int saveShiftMaster(ShiftMasterDto shiftdto,
			HttpServletRequest request) {
	
		if (shiftdto.getShiftId() == 0) {
			
			
			
			
			shiftdto.setShiftname(shiftdto.getShiftname());	
			shiftdto.setAbbrevation(shiftdto.getAbbrevation());
			shiftdto.setLocation(shiftdto.getLocation());
			shiftdto.setStartTime(shiftdto.getStartTime());
			shiftdto.setBreakTime(shiftdto.getBreakTime());
			shiftdto.setEndTime(shiftdto.getEndTime());
			shiftdto.setSameDay(shiftdto.getSameDay());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			shiftdto.setCreatedBy(userId);
			shiftdto.setCreatedBy(shiftdto.getCreatedBy());
			shiftdto.setDeleted("N");
			
			
			Criteria crit = sf.getCurrentSession().createCriteria(ShiftMasterDto.class);
			
			crit.add( Restrictions.eq("shiftname", shiftdto.getShiftname()));
			crit.add( Restrictions.eq("deleted", "N"));
			crit.setProjection(Projections.rowCount());
			Integer count = ((Number)crit.uniqueResult()).intValue();
				
						  if(count==0) {
							  return rosterSchedulerdao.saveShiftMaster(shiftdto,request);
						  }else {
							  return 3;
						  }
			

		} else {

			List<Integer> nlist=new ArrayList<>();
			nlist.add(shiftdto.getShiftId());
			
			shiftdto.setShiftname(shiftdto.getShiftname());	
			shiftdto.setAbbrevation(shiftdto.getAbbrevation());
			shiftdto.setLocation(shiftdto.getLocation());
			shiftdto.setStartTime(shiftdto.getStartTime());
			shiftdto.setBreakTime(shiftdto.getBreakTime());
			shiftdto.setEndTime(shiftdto.getEndTime());
			shiftdto.setSameDay(shiftdto.getSameDay());
			HttpSession session = request.getSession();
			int userId = (int) session.getAttribute("userId1");
			shiftdto.setUpdatedBy(shiftdto.getUpdatedBy());
			shiftdto.setDeleted("N");
			shiftdto.setUpdatedBy(userId);
			shiftdto.setUpdatedDate(new Date(new java.util.Date().getTime()));
			

			Criteria crit = sf.getCurrentSession().createCriteria(ShiftMasterDto.class);
			
			crit.add( Restrictions.eq("shiftname", shiftdto.getShiftname()));
			crit.add(Restrictions.not(Restrictions.in("shiftId",nlist)));
			crit.add( Restrictions.eq("deleted", "N"));
			crit.setProjection(Projections.rowCount());
			Integer count = ((Number)crit.uniqueResult()).intValue();
				
						  if(count==0) {
							  return rosterSchedulerdao.saveShiftMaster(shiftdto,request);
						  }else {
							  return 3;
						  }
		}

		
		
		
	}
	@Override
	@Transactional
	public List<ShiftMasterDto> getAllShiftMasterList() {
		
		return rosterSchedulerdao.getAllShiftMasterList();
	}

	@Override
	@Transactional
	public boolean deleteshiftMaster(Integer shiftId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		rosterSchedulerdao.deleteshiftMaster(shiftId, userId);
		
		return true;
	}

	@Override
	@Transactional
	public List<RosterSchedulerDto> getRosterScheduleList() {
		return rosterSchedulerdao.getAllRosterSchedulerList();
	}
	
	@Override
	@Transactional
	public List<RosterSchedulerDto> getRosterScheduleListFromId(Integer rosterListId) {
		return rosterSchedulerdao.getRosterScheduleListFromId(rosterListId);
	}
	
	@Override
	@Transactional
	public JSONArray getUserListFromType(String userType) {
		return rosterSchedulerdao.getUserListFromType(userType);
	}

	@Override
	@Transactional
	public List<ShiftMasterDto> geShiftMasterRecordList(Integer shiftid) {
		
		return rosterSchedulerdao.geShiftMasterRecordList(shiftid);
	}

	@Override
	@Transactional
	public int saveShiftTypemaster(String employeeidList ,ShiftAllocationMaster shiftdto,
 HttpServletRequest request) {


		return rosterSchedulerdao.saveShiftallocation(employeeidList, shiftdto,request) ;
		
	}

	@Override
	@Transactional
	public List<ShiftAllocationMaster> getShiftTypeallocation() {
		
		return rosterSchedulerdao.getShiftTypeallocation();
	}

	@Override
	@Transactional
	public List<RosterSchedulerDto> getRosterList() {
		
		return rosterSchedulerdao.getRosterList();
	}
	
	@Override
	@Transactional
	public List<ShiftAllocationMaster> getRosterListOfEmployee(Integer rosterListId,Integer employeeListId) {
		
		return rosterSchedulerdao.getRosterListOfEmployee(rosterListId,employeeListId);
	}
	
	@Override
	@Transactional
	public List<ShiftAllocationMaster> getRosterListOfEmployeeTypeForDashboard(Integer rosterListId,Integer employeeListId,String userTypeNmae) {
		
		return rosterSchedulerdao.getRosterListOfEmployeeTypeForDashboard(rosterListId,employeeListId,userTypeNmae);
	}
	
	@Override
	@Transactional
	public List<ShiftMasterDto> autoSuggestionshiftMasterNames(String letter) {
		
		return rosterSchedulerdao.autoSuggestionshiftMasterNames(letter);
	}

	@Override
	@Transactional
	public List<RosterSchedulerDto> autoSuggestionRosterScheduleNames(
			String letter) {
		return rosterSchedulerdao.autoSuggestionRosterScheduleNames(letter);
	}

	@Override
	@Transactional
	public List<ShiftAllocationMaster> editShiftallocation(
			Integer shiftallocationid) {
		
		return rosterSchedulerdao.editShiftallocation(shiftallocationid);
	}

	@Override
	@Transactional
	public boolean deleteShiftAllocation(Integer shiftallocationid,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		rosterSchedulerdao.deleteShiftAllocation(shiftallocationid, userId);
		
		return true;
	}

	@Override
	@Transactional
	public int checkTimeDateExitingEmployee(Integer employeeid,
			String startTime,String endTime,String scheduleid,String selectedDates,
			HttpServletRequest request) {
         
		return rosterSchedulerdao.checkTimeDateExitingEmployee(employeeid,startTime,endTime,scheduleid,selectedDates);
		
		
	}

	@Override
	@Transactional
	public List<RosterSchedulerDto> getrosterDate(Integer rosterListId,String employeeType,Integer employeeId) {
		
		return rosterSchedulerdao.getrosterDate(rosterListId,employeeType,employeeId);
	}

	@Override
	@Transactional
	public List<ShiftAllocationMaster> showPopUpOfShiftDashboard(
			Integer rosterListId, String resDate, String userTypeName) {
		
		return rosterSchedulerdao.showPopUpOfShiftDashboard(rosterListId,resDate,userTypeName);
	}

	@Override
	@Transactional
	public List<RosterSchedulerDto> getrosterDateinsertTime(Integer rosterListId) {
		return rosterSchedulerdao.getrosterDateinsertTime(rosterListId);
	}


	

}
