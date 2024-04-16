package com.hms.doctordesk.controller;

import java.lang.invoke.MethodHandles;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.hms.doctordesk.dto.IPDHistoryTemplateMasterDTO;
import com.hms.doctordesk.service.IPDHistoryTemplateService;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/ipdhistorytemplate")
@Slf4j
public class IPDHistoryTemplateController {
	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	@Autowired
	IPDHistoryTemplateService ipdservice;
	
	

	/******
	 * @author   :HM00054
	 * @Date     :29-12-2021
	 * @Code     :this method used for save ipd template
	 * *****/
	@RequestMapping(value = "/saveIPDHistorytemplate", method = RequestMethod.POST)
	@ResponseBody	
	public int saveIPDHistorytemplate(IPDHistoryTemplateMasterDTO obj,@RequestParam("historySlaveList") String historySlaveList, HttpServletRequest request) {
		logger.info("inside saveIPDHistorytemplate");
		int response = ipdservice.saveIPDHistorytemplate(obj, historySlaveList);
		logger.debug("response saveIPDHistorytemplate...."+response);
		return response;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Date     :29-12-2021
	 * @Code     :this method used for getIPDHistorytemplateById
	 * *****/
	@RequestMapping(value = "/getIPDHistorytemplateById", method = RequestMethod.GET)
	@ResponseBody	
	public IPDHistoryTemplateMasterDTO getIPDHistorytemplateById(@RequestParam("id") int id, HttpServletRequest request) {
		logger.info("inside getIPDHistorytemplateById");
		IPDHistoryTemplateMasterDTO  response = ipdservice.getIPDHistorytemplateById(id);
		logger.debug("response getIPDHistorytemplateById...."+response);
		return response;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :29-12-2021
	 * @Code     :this method used for getIPDHistoryTemplateList
	 * *****/
	@RequestMapping(value = "/getIPDHistoryTemplateList", method = RequestMethod.GET)
	@ResponseBody	
	public IPDHistoryTemplateMasterDTO getIPDHistoryTemplateList(@RequestParam("unitId") int unitId, HttpServletRequest request) {
		logger.info("inside getIPDHistoryTemplateList");
		IPDHistoryTemplateMasterDTO  response = ipdservice.getIPDHistoryTemplateList(unitId);
		logger.debug("response getIPDHistoryTemplateList...."+response);
		return response;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :29-12-2021
	 * @Code     :this method used for deleteIPDHistorytemplateSalve
	 * *****/
	@RequestMapping(value = "/deleteIPDHistorytemplateSalve", method = RequestMethod.GET)
	@ResponseBody	
	public int deleteIPDHistorytemplateSalve(@RequestParam("historySlaveId") String  historySlaveId,@RequestParam("userId") int userId, HttpServletRequest request) {
		logger.info("inside deleteIPDHistorytemplateSalve");
		int   response = ipdservice.deleteIPDHistorytemplateSalve(historySlaveId, userId);
		logger.debug("response deleteIPDHistorytemplateSalve...."+response);
		return response;
	}

}
