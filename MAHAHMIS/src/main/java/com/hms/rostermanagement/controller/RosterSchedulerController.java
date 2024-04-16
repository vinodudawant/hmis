package com.hms.rostermanagement.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.rostermanagement.dto.RosterSchedulerDto;
import com.hms.rostermanagement.dto.ShiftAllocationMaster;
import com.hms.rostermanagement.dto.ShiftMasterDto;
import com.hms.rostermanagement.service.RosterSchedulerService;
@Controller
@RequestMapping(value = "/rosterschedule")
public class RosterSchedulerController {
	@Autowired
	RosterSchedulerService rosterService;

	static Logger log=Logger.getLogger(RosterSchedulerController.class.getName());
	
	// added by ajay :25/09/2019 : save Roster Scheduler
	@RequestMapping(value = "/saveRosterschedule", method = RequestMethod.POST)
	@ResponseBody
	public int saveRosterschedule(@RequestParam("scheduleDetails") String scheduleDetails,RosterSchedulerDto rosterdto, HttpServletRequest request) {

		log.info("saveRosterschedule..");
		int treatId = rosterService.saveRosterScheduler(scheduleDetails,rosterdto, request);
	    log.debug("reponse....."+treatId);
		
	    return treatId;
	}

	// added by ajay :25/09/2019 : save Shift master
	@RequestMapping(value = "/saveShiftmaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveShiftMaster(ShiftMasterDto shiftdto,HttpServletRequest request) {
		
		log.info("saveShiftmaster..");
		int treatId = rosterService.saveShiftMaster(shiftdto, request);
	    log.debug("reponse....."+treatId);
		
	    return treatId;
	}
	// added by ajay :25/09/2019 : get Shift master
	@RequestMapping(value = "/getShiftmasterList", method = RequestMethod.POST)
	public @ResponseBody ShiftMasterDto getShiftmasterList() {
		List<ShiftMasterDto> ltOutDto = new ArrayList<ShiftMasterDto>();
	
		log.info("getShiftmasterList..");
		ltOutDto = rosterService.getAllShiftMasterList();
	    log.debug("reponse....."+ltOutDto);
		
	    ShiftMasterDto obj = new ShiftMasterDto();
		obj.setShiftmasterList(ltOutDto);
		
		return obj;
	}
	
	// added by ajay :25/09/2019 : delete Shift master
	@RequestMapping(value = "/deleteshiftMaster", method = RequestMethod.POST)
	public @ResponseBody String deleteshiftMaster(@RequestParam("shiftId") Integer shiftId,HttpServletRequest request) {
	
		log.info("deleteshiftMaster..");
		boolean response = rosterService.deleteshiftMaster(shiftId, request);
	    log.debug("reponse....."+response);	
		
	    String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	
	// added by ajay :25/09/2019 : getRosterScheduleList
	@RequestMapping(value = "/getRosterScheduleList", method = RequestMethod.POST)
	public @ResponseBody RosterSchedulerDto getRosterScheduleList() {
			List<RosterSchedulerDto> ltOutDto = new ArrayList<RosterSchedulerDto>();
			
			log.info("deleteshiftMaster..");
			ltOutDto = rosterService.getRosterScheduleList();
		    log.debug("reponse....."+ltOutDto);	
			
		    RosterSchedulerDto obj = new RosterSchedulerDto();
			obj.setSchedulerList(ltOutDto);
			return obj;
		}
	
	// added by Kishor :25/09/2019 : getRosterScheduleListFromId
		@RequestMapping(value = "/getRosterScheduleListFromId", method = RequestMethod.POST)
		public @ResponseBody RosterSchedulerDto getRosterScheduleList(@RequestParam("rosterListId") Integer rosterListId) {
			
				List<RosterSchedulerDto> ltOutDto = new ArrayList<RosterSchedulerDto>();
				
				log.info("getRosterScheduleListFromId..");
				ltOutDto = rosterService.getRosterScheduleListFromId(rosterListId);
			    log.debug("reponse....."+ltOutDto);	
				
			    RosterSchedulerDto obj = new RosterSchedulerDto();
				obj.setSchedulerList(ltOutDto);
				return obj;
			}

	@RequestMapping(value = "/getUserListFromType", method = RequestMethod.POST)
	public @ResponseBody
	JSONArray getUserListFromType(@RequestParam("userType") String userType) {
		
		log.info("getUserListFromType..");
		JSONArray roleArray = rosterService.getUserListFromType(userType);
	    log.debug("reponse....."+roleArray);	
		
	    return roleArray;
	}

	@RequestMapping(value = "/geShiftMasterRecordList", method = RequestMethod.POST)
	public @ResponseBody
	ShiftMasterDto geShiftMasterRecordList(
			@RequestParam("shiftid") Integer shiftid,
			HttpServletRequest request, HttpServletResponse response) {
		
		List<ShiftMasterDto> ltOutDto = new ArrayList<ShiftMasterDto>();
		
		log.info("geShiftMasterRecordList..");
		ltOutDto = rosterService.geShiftMasterRecordList(shiftid);
	    log.debug("reponse....."+ltOutDto);	
		
	    ShiftMasterDto obj = new ShiftMasterDto();
		obj.setShiftmasterList(ltOutDto);
		return obj;
	}
	
	    // added by ajay :25/09/2019 : save Shift master
		@RequestMapping(value = "/saveShiftTypeallocationmaster", method = RequestMethod.POST)
		@ResponseBody
		public int saveShiftTypeallocationmaster(@RequestParam("shiftDetails") String shiftDetails, ShiftAllocationMaster shiftdto,HttpServletRequest request) {
			
			log.info("saveShiftTypeallocationmaster..");
			int treatId = rosterService.saveShiftTypemaster(shiftDetails,shiftdto, request);
		    log.debug("reponse....."+treatId);	
			
		    return treatId;
		}
		
		// added by ajay :25/09/2019 : get Shift master
		@RequestMapping(value = "/getShiftTypeallocation", method = RequestMethod.POST)
		public @ResponseBody ShiftAllocationMaster getShiftTypeallocation() {
			List<ShiftAllocationMaster> ltOutDto = new ArrayList<ShiftAllocationMaster>();	
			
			log.info("getShiftTypeallocation..");
			ltOutDto = rosterService.getShiftTypeallocation();
		    log.debug("reponse....."+ltOutDto);				
		   
		    ShiftAllocationMaster obj = new ShiftAllocationMaster();
			obj.setShiftallocationlist(ltOutDto);
			return obj;
		}	
		
		// added by ajay :25/09/2019 : getRosterScheduleList
		@RequestMapping(value = "/getRosterList", method = RequestMethod.POST)
		public @ResponseBody RosterSchedulerDto getRosterList() {
				List<RosterSchedulerDto> ltOutDto = new ArrayList<RosterSchedulerDto>();
				
				log.info("getRosterList..");
				ltOutDto = rosterService.getRosterList();
			    log.debug("reponse....."+ltOutDto);				

				RosterSchedulerDto obj = new RosterSchedulerDto();
				obj.setSchedulerList(ltOutDto);
				return obj;
			}
		
		// added by Kishor :25/09/2019 : getRosterScheduleListFromId
				@RequestMapping(value = "/getRosterListOfEmployee", method = RequestMethod.POST)
				public @ResponseBody ShiftAllocationMaster getRosterListOfEmployee(@RequestParam("rosterListId") Integer rosterListId,@RequestParam("employeeListId") Integer employeeListId) {
						
					   List<ShiftAllocationMaster> ltOutDto = new ArrayList<ShiftAllocationMaster>();
						
					    log.info("getRosterListOfEmployee..");
						ltOutDto = rosterService.getRosterListOfEmployee(rosterListId,employeeListId);
					    log.debug("reponse....."+ltOutDto);				
						
					    ShiftAllocationMaster obj = new ShiftAllocationMaster();
						obj.setShiftallocationlist(ltOutDto);
						return obj;
					}
				
		// added by Kishor :25/09/2019 : getRosterListOfEmployeeTypeForDashboard
		@RequestMapping(value = "/getRosterListOfEmployeeTypeForDashboard", method = RequestMethod.POST)
		public @ResponseBody ShiftAllocationMaster getRosterListOfEmployeeTypeForDashboard(
				@RequestParam("rosterListId") Integer rosterListId,
				@RequestParam("employeeListId") Integer employeeListId,
				@RequestParam("userTypeNmae") String userTypeNmae) {
				
			    List<ShiftAllocationMaster> ltOutDto = new ArrayList<ShiftAllocationMaster>();
				
			    log.info("getRosterListOfEmployeeTypeForDashboard..");
				ltOutDto = rosterService.getRosterListOfEmployeeTypeForDashboard(rosterListId,employeeListId,userTypeNmae);
			    log.debug("reponse....."+ltOutDto);				
			
			    ShiftAllocationMaster obj = new ShiftAllocationMaster();
				obj.setShiftallocationlist(ltOutDto);
				return obj;
			}
	
		// added by ajay :30/09/2019 : auto Suggestion shift Master Names
		@RequestMapping(value = "/autoSuggestionshiftMasterNames", method = RequestMethod.POST)
		public @ResponseBody ShiftMasterDto autoSuggestionshiftMasterNames(
				@RequestParam String letter) {
		 
			List<ShiftMasterDto> ltshit = new ArrayList<ShiftMasterDto>();
			
			log.info("autoSuggestionshiftMasterNames..");
            ltshit = rosterService.autoSuggestionshiftMasterNames(letter);
		    log.debug("reponse....."+ltshit);				
          
		    ShiftMasterDto obj = new ShiftMasterDto();
			obj.setShiftmasterList(ltshit);
			return obj;
		}

	
		// added by ajay :30/09/2019 : auto Suggestion Roster Schedule Master Names
		@RequestMapping(value = "/autoSuggestionRosterScheduleNames", method = RequestMethod.POST)
		public @ResponseBody RosterSchedulerDto autoSuggestionRosterScheduleNames(
				@RequestParam String letter) {
		List<RosterSchedulerDto> ltroster = new ArrayList<RosterSchedulerDto>();
	
		log.info("autoSuggestionRosterScheduleNames..");
		ltroster = rosterService.autoSuggestionRosterScheduleNames(letter);
	    log.debug("reponse....."+ltroster);				
	
	    RosterSchedulerDto obj = new RosterSchedulerDto();
		obj.setSchedulerList(ltroster);
		return obj;
				
		}
		// added by ajay :1/10/2019 : edit Shift master
		@RequestMapping(value = "/editShiftallocation", method = RequestMethod.POST)
		public @ResponseBody ShiftAllocationMaster editShiftallocation(@RequestParam("shiftallocationid") Integer shiftallocationid,HttpServletRequest request, HttpServletResponse response) {
			
			List<ShiftAllocationMaster> ltOutDto = new ArrayList<ShiftAllocationMaster>();
			
			log.info("editShiftallocation..");
			ltOutDto = rosterService.editShiftallocation(shiftallocationid);	  
			log.debug("reponse....."+ltOutDto);				
		
			ShiftAllocationMaster obj = new ShiftAllocationMaster();
			obj.setShiftallocationlist(ltOutDto);
			return obj;
		}
		
		
		// added by ajay :1/10/2019 : delete Shift master
		@RequestMapping(value = "/deleteShiftAllocation", method = RequestMethod.POST)
		public @ResponseBody String deleteShiftAllocation(@RequestParam("shiftallocationid") Integer shiftallocationid,HttpServletRequest request) {
			
			log.info("deleteShiftAllocation..");
			boolean response = rosterService.deleteShiftAllocation(shiftallocationid, request);
		    log.debug("reponse....."+response);				
			
		    String msg = "";
			if (response == true) {
				msg = "Records Deleted Sucessfully";
			} else {
				msg = "Oops Some Problem Ocured";
			}
			return msg;
		}
		
	// added by ajay :5/10/2019 : check availble time if already assign start time between to end time that time not accepted shift assign
	@RequestMapping(value = "/checkTimeDateExitingEmployee", method = RequestMethod.POST)
	public @ResponseBody
	int checkTimeDateExitingEmployee(@RequestParam("employeeid") Integer employeeid,@RequestParam("startTime") String startTime,
			@RequestParam("endTime") String endTime,
			@RequestParam("scheduleid") String scheduleid,@RequestParam("selectedDates") String selectedDates,
			HttpServletRequest request) {
	
		log.info("checkTimeDateExitingEmployee..");
		int response = rosterService.checkTimeDateExitingEmployee(employeeid,startTime, endTime, scheduleid,selectedDates, request);
	    log.debug("reponse....."+response);				

		return response;
	}
	
	
	// added by ajay :07/10/2019 : getRosterScheduleListFromId
			@RequestMapping(value = "/getrosterDate", method = RequestMethod.POST)
			public @ResponseBody RosterSchedulerDto getrosterDate(@RequestParam("rosterListId") Integer rosterListId,@RequestParam("employeeType") String employeeType,@RequestParam("employeeId") Integer employeeId) {
					List<RosterSchedulerDto> ltOutDto = new ArrayList<RosterSchedulerDto>();
				
					log.info("getrosterDate..");
					ltOutDto = rosterService.getrosterDate(rosterListId,employeeType,employeeId);
				    log.debug("reponse....."+ltOutDto);				
					
				    RosterSchedulerDto obj = new RosterSchedulerDto();
					obj.setSchedulerList(ltOutDto);
					return obj;
				}
			
			// added by Kishor :10/10/2019 : getRosterListOfEmployeeTypeForDashboard
			@RequestMapping(value = "/showPopUpOfShiftDashboard", method = RequestMethod.POST)
			public @ResponseBody ShiftAllocationMaster showPopUpOfShiftDashboard(
					@RequestParam("rosterListId") Integer rosterListId,
					@RequestParam("resDate") String resDate,
					@RequestParam("userTypeName") String userTypeName) {
				
				    List<ShiftAllocationMaster> ltOutDto = new ArrayList<ShiftAllocationMaster>();
					
				    log.info("showPopUpOfShiftDashboard..");
				    ltOutDto = rosterService.showPopUpOfShiftDashboard(rosterListId,resDate,userTypeName);
				    log.debug("reponse....."+ltOutDto);				
				  
				    ShiftAllocationMaster obj = new ShiftAllocationMaster();
					obj.setShiftallocationlist(ltOutDto);
					return obj;
				}
			
			
	// added by ajay :07/10/2019 : getRosterScheduleListFromId
	@RequestMapping(value = "/getrosterDateinsertTime", method = RequestMethod.POST)
	public @ResponseBody
	RosterSchedulerDto getrosterDateinsertTime(@RequestParam("rosterListId") Integer rosterListId) {
		List<RosterSchedulerDto> ltOutDto = new ArrayList<RosterSchedulerDto>();
	   
		log.info("getrosterDateinsertTime..");
		ltOutDto = rosterService.getrosterDateinsertTime(rosterListId);
	    log.debug("reponse....."+ltOutDto);				

		RosterSchedulerDto obj = new RosterSchedulerDto();
		obj.setSchedulerList(ltOutDto);
		return obj;
	}
	
	
}
