package com.hms.ivf.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.controller.CpoeIPDdetails;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ivf.service.IvfServicesAdvisedService;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value = "ivfServicesAdvised")
public class IvfServicesAdvisedController {


	@Autowired
	IvfServicesAdvisedService opdServicesAdvisedService;
	static Logger log = Logger.getLogger(IvfServicesAdvisedController.class.getName());

	/**
	 * @author :Vishnu Thorat
	 * @Date :31-12-2021
	 * @Code :This method is save services advised
	 * @return
	 **/

	@RequestMapping(value = "/saveOpdServicesAdvised", method = RequestMethod.POST)
	@ResponseBody
	public int saveOpdServicesAdvised(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request,@RequestParam("queryType") String queryType,@RequestParam("module") String module
			,@RequestParam("callfrom") String callfrom) {
		log.info("In OpdServicesAdvisedController saveOpdServicesAdvised()");
		int response = 0;

		BillDetailsDto billDetailsDto = (BillDetailsDto) ConfigUIJSONUtility.getObjectFromJSON(serviceDetails,
				BillDetailsDto.class);
		response = opdServicesAdvisedService.saveOpdServicesAdvised(billDetailsDto
				.getListBillDetails().get(0),request, queryType);
		log.info("In response"+response);
		return response;
	}
	
	/**
	 * @author :HM00066
	 * @Date :24-12-2021
	 * @Code :This method is fetch doctor list
	 * @return
	 **/
	@RequestMapping(value = "/getAllDoctorsList", method = RequestMethod.POST)
	@ResponseBody
	public DoctorDto getAllDoctorsList() {
		log.info("In OpdServicesAdvisedController getAllDoctorsList()");
		DoctorDto doctorDto = new DoctorDto();
		String doctorType= "doctor";
		List<DoctorDto> list=opdServicesAdvisedService.fetchDoctorList(doctorType);
		doctorDto.setLstDoctorDto(list);
		log.debug("Reponse----> "+list);
		return doctorDto;
	}
	
	/**
	 * @author :HM00066
	 * @Date :31-12-2021
	 * @Code :This method is fetch getAllOpdServicesAdvised
	 * @return
	 **/
	@RequestMapping(value = "/getAllOpdServicesAdvised", method = RequestMethod.POST)
	@ResponseBody
	public CpoeIPDdetails getAllOpdServicesAdvised(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("callform") String callform,HttpServletRequest request) {
		log.info("In OpdServicesAdvisedController getAllOpdServicesAdvised()");
		List<CpoeIPDdetails> lstbilldetails = new ArrayList<CpoeIPDdetails>();
		lstbilldetails = opdServicesAdvisedService.getAllOpdServicesAdvised(treatmentId,callform,request);
		CpoeIPDdetails obj = new CpoeIPDdetails();
		obj.setCpoeServdetails(lstbilldetails);
		log.debug("Reponse----> "+lstbilldetails);
		return obj;
	}
	
	/**
	 * @author :HM00066
	 * @Date :31-12-2021
	 * @Code :This method is delete OpdServicesAdvised
	 * @return
	 **/
	@RequestMapping(value = "/deleteOpdServicesAdvised", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOpdServicesAdvised(@RequestParam("labservicelist") String labservicelist,@RequestParam("callform") String callform, HttpServletRequest request) {
		log.info("In OpdServicesAdvisedController deleteOpdServicesAdvised()");
		String msg = "";
		if (opdServicesAdvisedService.deleteOpdServicesAdvised(labservicelist, callform,request)==1) {
			msg = "Delete Successfully!";
		}else{
			
			msg="Network Issues!";	
			
		}
		log.debug("Reponse----> "+msg);
		return msg;
	}
	
	/**
	 * @author :HM00066
	 * @Date :31-12-2021
	 * @Code :This method is fetchBillDetails
	 * @return
	 **/
	
	@RequestMapping(value = "/fetchBillDetails", method = RequestMethod.POST)
	 @ResponseBody
	 public	CpoeServdetails fetchBillDetails(@RequestParam("tID") Integer tID,@RequestParam("callform") String callform,@RequestParam("servid") Integer servid,	HttpServletRequest request) {
		log.info("In OpdServicesAdvisedController deleteOpdServicesAdvised()");
		List<CpoeServdetails> lstbilldetails = new ArrayList<CpoeServdetails>();
		lstbilldetails = opdServicesAdvisedService.getListBill(tID,callform,servid,request);
	
		CpoeServdetails obj = new CpoeServdetails();
		obj.setCpoeServdetails(lstbilldetails);
		log.debug("Reponse----> "+lstbilldetails);
		return obj;
	}
	
	/**
	 * @author :HM00066
	 * @Date :10-01-2022
	 * @Code :This method is cancelInvestigationTest
	 * @return
	 **/
	
	@RequestMapping(value = "/cancelInvestigationTest", method = RequestMethod.POST)
	@ResponseBody
	public int cancelInvestigationTest(@RequestParam("billDetId") String billDetId, 
			@RequestParam("cancleType") String cancleType,
			@RequestParam("callform") String callform,
			HttpServletRequest request ) {

		return opdServicesAdvisedService.cancelInvestigationTest(billDetId,cancleType,callform,request);
	}
	
	@RequestMapping(value = "/cancelLabTest", method = RequestMethod.POST)
	@ResponseBody
	public int cancelLabTest(@RequestParam("billDetId") String billDetId, 
			@RequestParam("cancleType") String cancleType,
			@RequestParam("deptId") Integer deptId,
			HttpServletRequest request ) {

		return opdServicesAdvisedService.cancelLabTest(billDetId,cancleType,deptId,request);
	}
	

	@ResponseBody
	@RequestMapping(value = "/getPatientServiceBill", method = RequestMethod.POST)
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(@RequestParam("treatmentId")  Integer treatmentId) {
		
		System.err.println("controller treatmentId======="+treatmentId);
		
		log.info("In OpdBillController getPatientSubServiceDetails()");
		return opdServicesAdvisedService.getPatientSubServiceDetails(treatmentId);
	}


}
