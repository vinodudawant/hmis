package com.hms.ipd.controller;

import java.lang.invoke.MethodHandles;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ipd.dto.PatientBedInfoDTO;
import com.hms.ipd.service.BedMgtService;
import com.hms.opdbill.dto.PatientHeaderInfoDto;

@Controller
@RequestMapping(value = "/bedmgt")
public class BedMgtController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	private @Autowired
	BedMgtService bedMgtService;
	
	@ResponseBody
	@RequestMapping(value = "/getIpdPatientHeaderInfo", method = RequestMethod.POST)
	public PatientHeaderInfoDto getIpdPatientHeaderInfo(@RequestParam("treatmentId") int treatmentId,
			@RequestParam("unitId") int unitId) {
		
		LOGGER.info("BedMasterController method getIpdPatientHeaderInfo called");
		return bedMgtService.getIpdPatientHeaderInfo(treatmentId,unitId);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getWardTypeList", method = RequestMethod.POST)
	public ChargesMasterSlave getWardTypeList(@RequestParam("hallTypeId") int hallTypeId) {
 
		LOGGER.info("BedMasterController method getWardTypeList called");
		return bedMgtService.getWardTypeList(hallTypeId);	
	}
	
	@ResponseBody
	@RequestMapping(value = "/getPatientBedDetails", method = RequestMethod.POST)
	public PatientBedInfoDTO getPatientBedDetails(@RequestParam("chargesSlaveId") Integer chargesSlaveId,@RequestParam("hallId") Integer hallId,
			@RequestParam("callFrom") String callFrom, HttpServletRequest request) {
 
		LOGGER.info("BedMasterController method getPatientBedDetails called");
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		
		return bedMgtService.getPatientBedDetails(chargesSlaveId, hallId, callFrom,unitId);	
	}
	
	@ResponseBody
	@RequestMapping(value = "/getAdminChargesIpd", method = RequestMethod.POST)
	public double getAdminCharges(@RequestParam("unitId") int unitId,
			@RequestParam("deptId") int deptId) {
 
		LOGGER.info("BedMasterController method getAdminCharges called");
		return bedMgtService.getAdminChargesIpd(unitId, deptId);	
	}
	
	@ResponseBody
	@RequestMapping(value = "/allocateBedToPatient", method = RequestMethod.POST)
	public int allocateBedToPatient(@RequestBody TreatMentBeds treatmentBeds) {

		LOGGER.info("BedMasterController method allocateBedToPatient called");
		int response = bedMgtService.allocateBedToPatient(treatmentBeds);
		return response;
	}
	//Added By Rahul Patil
	@ResponseBody
	@RequestMapping(value = "/sendSMSDoctorCK", method = RequestMethod.POST)
	public void sendSMSDoctorCK(@RequestParam("treatmentId") int treatmentId) {
 
		LOGGER.info("BedMasterController method sms called");
	    bedMgtService.sendSMSDoctorCK(treatmentId);	
	}
	
	@ResponseBody
	@RequestMapping(value = "/getBillableBedCharges", method = RequestMethod.POST)
	public PatientBedInfoDTO getBillableBedCharges(@RequestParam("chargesSlaveId") Integer chargesSlaveId,@RequestParam("hallId") Integer hallId,
			@RequestParam("callFrom") String callFrom) {
 
		LOGGER.info("BedMasterController method getBillableBedCharges called");
		return bedMgtService.getBillableBedCharges(chargesSlaveId, hallId, callFrom);	
	}
	
	@ResponseBody
	@RequestMapping(value = "/checkBedIsFree", method = RequestMethod.POST)
	public int checkBedIsFree(TreatMentBeds treatmentBeds) {

		return bedMgtService.checkBedIsFree(treatmentBeds);
	}
}
