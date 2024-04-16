package com.hms.doctordesk.controller;

import java.lang.invoke.MethodHandles;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.dto.OPDBmiMasterDTO;
import com.hms.doctordesk.dto.OPDDietMasterDTO;
import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;
import com.hms.doctordesk.service.OPDHistoryService;

import groovy.util.logging.Slf4j;
@Controller
@RequestMapping(value = "/opdhistory")
@Slf4j
public class OPDHistoryController {
	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	@Autowired
	OPDHistoryService opdservice;
	
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for save opd history
	 * *****/
	@RequestMapping(value = "/saveOPDHistory", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOPDHistory(OPDHistoryMasterDTO obj,@RequestParam("historySlaveList") String historySlaveList,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		String msg = "";
		logger.info("inside saveOPDHistory");
		int response = opdservice.saveOPDHistory(obj,historySlaveList, patientId, treatmentId);
		logger.debug("response saveOPDHistory...."+response);
		return response;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for get opd history obj
	 * *****/
	@RequestMapping(value = "/getOPDHistory", method = RequestMethod.POST)
	@ResponseBody	
	public OPDHistoryMasterDTO getOPDHistory(@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		String msg = "";
		logger.info("inside getOPDHistory");
		OPDHistoryMasterDTO obj = opdservice.getOPDHistory(treatmentId);
		logger.debug("response getOPDHistory...."+obj);
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for get opd history obj
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getPatientInfoByTreatmentId")
	public OpdPatientDetailsDto  getPatientInfoByTreatmentId(@RequestParam ("treatmentId")Integer treatmentId,@RequestParam ("dpid")Integer dpid, HttpServletRequest request)
	{
		logger.info("inside getPatientInfoByTreatmentId");
		OpdPatientDetailsDto obj=opdservice.getPatientInfoByTreatmentId(treatmentId);
		logger.debug("response getPatientInfoByTreatmentId...."+obj);
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String doctorName=opdservice.getConsultantName(treatmentId, userId, dpid);
		if(!doctorName.equalsIgnoreCase("")) {
			 
			obj.getListOpdPatientDetailsDto().get(0).setDoc_name(doctorName);   
		}
		return obj;
	}
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for delete opd history slave
	 * *****/
	@RequestMapping(value = "/deleteHistorySalve", method = RequestMethod.GET)
	public @ResponseBody int deleteHistorySalve(@RequestParam("historySlaveId") String historySlaveId,@RequestParam("userId") Integer userId){
			
		int res=0;
		logger.info("inside deleteHistorySalve");
		res = opdservice.deleteHistorySalve(historySlaveId, userId);
		logger.debug("response deleteHistorySalve...."+res);
		return res;
	}
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for save opd diet
	 * *****/
	@RequestMapping(value = "/saveOPDiet", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOPDiet(OPDDietMasterDTO obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		logger.info("inside saveOPDiet");
		int response = opdservice.saveOPDiet(obj, patientId, treatmentId);
		logger.debug("response saveOPDiet...."+response);
		
		return response;
	}
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for edit opd diet
	 * *****/
	@RequestMapping(value = "/editOPDDiet", method = RequestMethod.POST)
	@ResponseBody	
	public OPDDietMasterDTO editOPDDiet(@RequestParam("dietMasterId") Integer dietMasterId, HttpServletRequest request) {
		logger.info("inside editOPDDiet");
		OPDDietMasterDTO obj = opdservice.editOPDDiet(dietMasterId);
		logger.debug("response editOPDDiet...."+obj);
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for getOPDDietListByTreatmentId
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getOPDDietListByTreatmentId")
	public OPDDietMasterDTO  getOPDDietListByTreatmentId(@RequestParam ("treatmentId")Integer treatmentId)
	{
		OPDDietMasterDTO obj=new OPDDietMasterDTO();
		logger.info("inside getOPDDietListByTreatmentId");
		List<OPDDietMasterDTO>  list=opdservice.getOPDDietListByTreatmentId(treatmentId);
		logger.debug("response getOPDDietListByTreatmentId...."+list);
		obj.setGetListOfOPDDietDTO(list);
		
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for deleteOPDDiet
	 * *****/
	@RequestMapping(value = "/deleteOPDDiet", method = RequestMethod.GET)
	public @ResponseBody int deleteOPDDiet(@RequestParam("dietMasterIds") String dietMasterIds,@RequestParam("userId") Integer userId){
			
		int res=0;
		logger.info("inside deleteOPDDiet");
		res = opdservice.deleteOPDDiet(dietMasterIds, userId);
		logger.debug("response deleteOPDDiet...."+res);
		return res;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for saveOPDPatientBMI
	 * *****/
	@RequestMapping(value = "/saveOPDPatientBMI", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOPDPatientBMI(OPDBmiMasterDTO obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		logger.info("inside saveOPDPatientBMI");
		int response = opdservice.saveOPDPatientBMI(obj, patientId, treatmentId);
		logger.debug("response saveOPDPatientBMI...."+response);
		return response;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for getOPDBMIListByTreatmentId
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getOPDBMIListByTreatmentId")
	public OPDBmiMasterDTO  getOPDBMIListByTreatmentId(@RequestParam ("treatmentId")Integer treatmentId)
	{
		OPDBmiMasterDTO obj=new OPDBmiMasterDTO();
		logger.info("inside getOPDBMIListByTreatmentId");
		List<OPDBmiMasterDTO>  list=opdservice.getOPDBMIListByTreatmentId(treatmentId);
		logger.debug("response getOPDBMIListByTreatmentId...."+list);
		obj.setGetListOfOPDBmiDTO(list);
		
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for editOPDBMI
	 * *****/
	@RequestMapping(value = "/editOPDBMI", method = RequestMethod.POST)
	@ResponseBody	
	public OPDBmiMasterDTO editOPDBMI(@RequestParam("opdBmiMasterId") Integer opdBmiMasterId, HttpServletRequest request) {
		logger.info("inside editOPDBMI");
		OPDBmiMasterDTO obj = opdservice.editOPDBMI(opdBmiMasterId);
		logger.debug("response editOPDBMI...."+obj);
		return obj;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for getPrefixIdByValue
	 * *****/
	@RequestMapping(value = "/getPrefixIdByValue", method = RequestMethod.GET)
	@ResponseBody	
	public int getPrefixIdByValue(@RequestParam("deptName") String  deptName,@RequestParam("value") String  value, HttpServletRequest request) {
		logger.info("inside getPrefixIdByValue");
		int res=opdservice.getPrefixIdByValue(deptName, value);
		logger.debug("response getPrefixIdByValue...."+res);
		return res;
	}
	//Added By Annapurna
	@RequestMapping(value = "/getMrnno", method = RequestMethod.POST)
	@ResponseBody	
	public String getMrnno(@RequestParam("treatment_id") Integer treatment_id, HttpServletRequest request) {
		logger.info("inside getMrnno");
		
		String res=opdservice.getMrnno(treatment_id, request);
		
		logger.debug("response getMrnno...."+res);
		
		return res;
	}
	
	/******
	 * @author   :HM00098 Vishant Pawar
	 * @Date     :07-08-2023
	 * @Code     :this method used for get opd history obj
	 * *****/
	/*
	 * @RequestMapping(value = "/getPatientHistoryByTemplateId", method =
	 * RequestMethod.POST)
	 * 
	 * @ResponseBody public OPDHistoryMasterDTO
	 * getPatientHistoryByTemplateId(@RequestParam("id") Integer
	 * id,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest
	 * request) { String msg = ""; logger.info("inside getOPDHistory");
	 * OPDHistoryMasterDTO obj =
	 * opdservice.getPatientHistoryByTemplateId(id,treatmentId,request);
	 * logger.debug("response getOPDHistory...."+obj); return obj; }
	 */
	
	
}
