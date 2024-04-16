package com.hms.ivf.controller;

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

import com.hms.ivf.dto.IvfHistoryTempMasterDto;
import com.hms.ivf.service.IvfHistoryService;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/ivfhistory")
@Slf4j
public class IvfHistoryController {
	
	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
		@Autowired
		IvfHistoryService opdservice;
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for save ivf patient history
		 * *****/
		@RequestMapping(value = "/saveIVFHistory", method = RequestMethod.POST)
		@ResponseBody	
		public int saveOPDHistory(IvfHistoryTempMasterDto obj,@RequestParam("historySlaveList") String historySlaveList,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId,@RequestParam("ivftreatmentId") Integer ivftreatmentId, HttpServletRequest request) {
			String msg = "";
			logger.info("inside saveOPDHistory");
			int response = opdservice.saveIVFHistory(obj, historySlaveList, patientId, treatmentId, ivftreatmentId);
			logger.debug("response saveIVFHistory...."+response);
			return response;
		}
		
		

		/******
		 * @author   :HM00054
		 * @Code     :this method used for get ivf history obj
		 * *****/
		@RequestMapping(value = "/getIVFHistory", method = RequestMethod.POST)
		@ResponseBody	
		public IvfHistoryTempMasterDto getIVFHistory(@RequestParam("ivftreatmentId") Integer ivftreatmentId, HttpServletRequest request) {
			String msg = "";
			logger.info("inside getIVFHistory");
			IvfHistoryTempMasterDto obj = opdservice.getIVFHistory(ivftreatmentId);
			logger.debug("response getIVFHistory...."+obj);
			return obj;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for delete ivf history slave
		 * *****/
		@RequestMapping(value = "/deleteHistorySalve", method = RequestMethod.GET)
		public @ResponseBody int deleteHistorySalve(@RequestParam("historySlaveId") String historySlaveId,@RequestParam("userId") Integer userId){
				
			int res=0;
			logger.info("inside deleteHistorySalve");
			res = opdservice.deleteHistorySalve(historySlaveId, userId);
			logger.debug("response deleteHistorySalve...."+res);
			return res;
		}

}
