package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.hms.doctordesk.dto.OPDClinicalStagingDTO;
import com.hms.doctordesk.service.OPDClinicalStagingService;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import java.lang.invoke.MethodHandles;
import java.util.stream.IntStream;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/opdclinical")
@Slf4j
public class OPDClinicalStagingController {
	
	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	@Autowired
	OPDClinicalStagingService opdservice;
	
	/******
	 * @author   :HM00054
	 * @Date     :28-12-2021
	 * @Code     :this method used for store clinical info
	 * *****/
	@RequestMapping(value = "/saveOPDCinicalStaging", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOPDCinicalStaging(OPDClinicalStagingDTO obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		obj.setInvestigatorId(userId);
		logger.info("inside saveOPDCinicalStaging");
		int response = opdservice.saveOPDCinicalStaging(obj, patientId, treatmentId);
		logger.debug("response saveOPDCinicalStaging...."+response);
		return response;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Date     :28-12-2021
	 * @Code     :this method used for get list of  clinical info
	 * *****/
	@RequestMapping(value = "/getOPDClinicalStagingList", method = RequestMethod.GET)
	@ResponseBody	
	public OPDClinicalStagingDTO getOPDClinicalStagingList(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		
		List<OPDClinicalStagingDTO> list=new ArrayList<OPDClinicalStagingDTO>();
		
		OPDClinicalStagingDTO obj=new OPDClinicalStagingDTO();
		logger.info("inside getOPDClinicalStagingList");
		list = opdservice.getOPDClinicalStagingList(treatmentId, unitId);
		logger.debug("response getOPDClinicalStagingList...."+list);
		obj.setGetListOfOPDClinicalStagingDTO(list);
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :28-12-2021
	 * @Code     :this method used for edit clinical info
	 * *****/
	@RequestMapping(value = "/editOPDClinicalStaging", method = RequestMethod.GET)
	@ResponseBody	
	public OPDClinicalStagingDTO editOPDClinicalStaging(@RequestParam("id") Integer id, HttpServletRequest request) {
		OPDClinicalStagingDTO obj=new OPDClinicalStagingDTO();
		logger.info("inside editOPDClinicalStaging");
		obj = opdservice.editOPDClinicalStaging(id);
		logger.debug("response editOPDClinicalStaging...."+obj);
		return obj;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Date     :28-12-2021
	 * @Code     :this method used for delete clinical info
	 * *****/
	@RequestMapping(value = "/deleteOPDClinicalStaging", method = RequestMethod.GET)
	@ResponseBody	
	public int deleteOPDClinicalStaging(@RequestParam("id") String id, @RequestParam("userId") Integer userId,HttpServletRequest request) {
		int res=0;
		logger.info("inside deleteOPDClinicalStaging");
		res = opdservice.deleteOPDClinicalStaging(id, userId);
		logger.debug("response deleteOPDClinicalStaging...."+res);
		return res;
	}
	
	

}
