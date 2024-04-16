package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.hms.doctordesk.dto.DdComplaintDto;
import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.doctordesk.service.DdComplaintService;
@RestController
@RequestMapping(value="/dd_complaint_master")
public class DdComplaintController {

static Logger log=Logger.getLogger(DdComplaintController.class.getName());
	
	@Autowired
	DdComplaintService ddComplaintService;
	
	static {
		System.out.println("DdComplaintController Loaded...!");
	}

/*	@RequestMapping(value = "/fetchComplaint", method = RequestMethod.GET)
	@ResponseBody
	public List<DdComplaintDto> fetchComplaint(@RequestParam("tid") int treatmentId) {
		List<DdComplaintDto> response = ddComplaintService.fetchComplaint(treatmentId);
		return response;

	}
*/
	@RequestMapping(value = "/fetchComplaint", method = RequestMethod.POST)
	@ResponseBody
	public List<DdComplaintDto> getListOfDiagonosis(@RequestParam("treatmentId") int treatmentId,@RequestParam("callfrom")String callfrom) {
		List<DdComplaintDto> response = ddComplaintService.fetchComplaint(treatmentId,callfrom);
		return response;

	}
	/*@RequestMapping(value = "/fetchComplaint", method = RequestMethod.GET)
	public @ResponseBody
	DdComplaintDto getAllComplaintMaster(@RequestParam("tid") int treatmentId,HttpServletRequest request) {
		log.info("In DdComplaintController fetchComplaint()");
		List<DdComplaintDto> lstComplaintMaster = new ArrayList<DdComplaintDto>();
		lstComplaintMaster = ddComplaintService.fetchComplaint(treatmentId);
		DdComplaintDto obj = new DdComplaintDto();
		obj.setLstDdComplaintMaster(lstComplaintMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	*/
	@RequestMapping(value = "/saveComplaint", method = RequestMethod.POST)
	@ResponseBody	
	public  int savePatient(@RequestParam("complaintDetails") String complaintDetails,HttpServletRequest request) {
		int response = ddComplaintService.saveComplaint(complaintDetails, request);
		System.out.println("AAA:"+response);
		return response;
	}
	@RequestMapping(value = "/deleteDDComplaints", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDDComplaints(@RequestParam("complaintid") Integer complaintId,HttpServletRequest request) {
		log.info("In DdComplaintController deleteDDComplaints()");
		System.out.println("complaintId :"+complaintId);
		boolean response = ddComplaintService.deleteDDComplaints(complaintId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} /*else {
			msg = "Network issue";
		}*/
		log.debug("Response---> "+msg);
		return msg;
	}	
	
	
	
}
