package com.hms.rostermanagement.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;

import com.hms.rostermanagement.dto.RosterSchedulerDto;
import com.hms.rostermanagement.dto.ShiftAllocationMaster;
import com.hms.rostermanagement.dto.ShiftMasterDto;


public interface RosterSchedulerDao {
	
	int saveRosterScheduler(String scheduleDetails,RosterSchedulerDto rosterdto,HttpServletRequest request);
	int saveShiftMaster(ShiftMasterDto shiftdto,HttpServletRequest request);
	List<ShiftMasterDto> getAllShiftMasterList();
	boolean deleteshiftMaster(Integer shiftId, Integer userid);
	List<RosterSchedulerDto> getAllRosterSchedulerList();
	JSONArray getUserListFromType(String userType);
	List<ShiftMasterDto> geShiftMasterRecordList(Integer shiftid);
	int saveShiftallocation(String employeeidList,ShiftAllocationMaster shiftdto,HttpServletRequest request);
	List<ShiftAllocationMaster> getShiftTypeallocation();
	List<RosterSchedulerDto> getRosterList();
	List<RosterSchedulerDto> getRosterScheduleListFromId(Integer rosterListId);
	List<ShiftAllocationMaster> getRosterListOfEmployee(Integer rosterListId,
			Integer employeeListId);
	List<ShiftMasterDto> autoSuggestionshiftMasterNames(String letter); 
	List<RosterSchedulerDto> autoSuggestionRosterScheduleNames(String letter); 
	
	List<ShiftAllocationMaster> editShiftallocation(Integer shiftallocationid);
	
	boolean deleteShiftAllocation(Integer shiftallocationid,Integer userid);
	
	int checkTimeDateExitingEmployee(Integer employeeid,String startTime,String endTime,String scheduleid,String selectedDates);
	
	List<ShiftAllocationMaster> getRosterListOfEmployeeTypeForDashboard(
			Integer rosterListId, Integer employeeListId,String userTypeNmae);
	
	List<RosterSchedulerDto> getrosterDate(Integer rosterListId,String employeeType, Integer employeeId);
	
	List<ShiftAllocationMaster> showPopUpOfShiftDashboard(Integer rosterListId,
			String resDate, String userTypeName);
	List<RosterSchedulerDto> getrosterDateinsertTime(Integer rosterListId);


}
