package com.hms.ivf.controller;

import java.lang.invoke.MethodHandles;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ivf.dto.FmFollicularData;
import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.dto.IVFFollicularSutdyRecord;
import com.hms.ivf.service.IvfFmStudyService;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/ivffm")
@Slf4j
public class IvfFmStudyController {

	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	 
	 @Autowired
	 IvfFmStudyService fmservice;
	 
	 /******
		 * @author   :HM00054
		 * @Code     :this method used for saveFmStudy
		 * *****/
		@RequestMapping(value = "/saveFmStudy", method = RequestMethod.POST)
		@ResponseBody	
		public int saveFmStudy(IVFFollicularStudy obj, HttpServletRequest request) {
			logger.info("inside saveFmStudy");
			int response = fmservice.saveFmStudy(obj);
			logger.debug("response saveFmStudy...."+response);
			return response;
		}
		
		 /******
		 * @author   :HM00054
		 * @Code     :this method used for lstIVFFolicularStudy
		 * *****/
		@RequestMapping(value = "/lstIVFFolicularStudy", method = RequestMethod.POST)
		@ResponseBody	
		public IVFFollicularStudy lstIVFFolicularStudy(@RequestParam("patientId") Integer patientId, HttpServletRequest request) {
			IVFFollicularStudy obj=new IVFFollicularStudy();
			logger.info("inside lstIVFFolicularStudy");
			List<IVFFollicularStudy> list= fmservice.lstIVFFolicularStudy(patientId);
			logger.debug("response lstIVFFolicularStudy...."+list);
			obj.setStudyList(list);
			return obj;
		}
		
		 /******
		 * @author   :HM00054
		 * @Code     :this method used for fetchStudyRecord
		 * *****/
		@RequestMapping(value = "/fetchStudyRecord", method = RequestMethod.POST)
		@ResponseBody	
		public IVFFollicularSutdyRecord fetchStudyRecord(@RequestParam("inidate") String inidate,@RequestParam("patientId") Integer patientId, HttpServletRequest request) {
			IVFFollicularSutdyRecord obj=new IVFFollicularSutdyRecord();
			logger.info("inside fetchStudyRecord");
			List<IVFFollicularSutdyRecord> list= fmservice.fetchStudyRecord(inidate, patientId);
			logger.debug("response fetchStudyRecord...."+list);
			obj.setFollicularReportList(list);
			return obj;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for saveStudyReportRecord
		 * *****/
		@RequestMapping(value = "/saveStudyReportRecord", method = RequestMethod.POST)
		@ResponseBody	
		public int saveStudyReportRecord(IVFFollicularSutdyRecord obj, HttpServletRequest request) {
			logger.info("inside saveStudyReportRecord");
			int response = fmservice.saveFmStudyRecordData(obj);
			logger.debug("response saveStudyReportRecord...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for addCommentsInStudyRecord
		 * *****/
		@RequestMapping(value = "/addCommentsInStudyRecord", method = RequestMethod.POST)
		@ResponseBody	
		public int addCommentsInStudyRecord(@RequestParam("recordId") Integer recordId,@RequestParam("comments") String comments , HttpServletRequest request) {
			logger.info("inside addCommentsInStudyRecord");
			int response = fmservice.addCommentsInStudyRecord(recordId, comments);
			logger.debug("response addCommentsInStudyRecord...."+response);
			return response;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for deleteStudyRecord
		 * *****/
		@RequestMapping(value = "/deleteStudyRecord", method = RequestMethod.POST)
		@ResponseBody	
		public int deleteStudyRecord(@RequestParam("userId") Integer userId,@RequestParam("recordId") Integer recordId , HttpServletRequest request) {
			logger.info("inside deleteStudyRecord");
			int response = fmservice.deleteStudyRecord(userId, recordId);
			logger.debug("response deleteStudyRecord...."+response);
			return response;
		}
		

		/******
		 * @author   :HM00054
		 * @Code     :this method used for cancelOrCloseCycle
		 * *****/
		@RequestMapping(value = "/cancelOrCloseCycle", method = RequestMethod.POST)
		@ResponseBody	
		public int cancelOrCloseCycle(@RequestParam("masterFollicularStudyId") Integer masterFollicularStudyId,@RequestParam("cycleStatus") String cycleStatus ,@RequestParam("endDate") String endDate, HttpServletRequest request) {
			logger.info("inside cancelOrCloseCycle");
			int response = fmservice.cancelOrCloseCycle(masterFollicularStudyId, cycleStatus,endDate);
			logger.debug("response cancelOrCloseCycle...."+response);
			return response;
		}
		
		
		@RequestMapping(value = "/saveFollicularData", method = RequestMethod.POST)
		@ResponseBody	
		public int saveFollicularData(FmFollicularData obj) {
			
			int  res = fmservice.saveFollicularData(obj);
					
					return res;
		}
		
		@RequestMapping(value = "/getLisOfFmData", method = RequestMethod.POST)
		@ResponseBody	
		public FmFollicularData getLisOfFmData(@RequestParam("patientId") Integer patientId,@RequestParam("masterFollicularStudyId") String masterFollicularStudyId) {
			FmFollicularData obj=new FmFollicularData();
			List<FmFollicularData>  list= fmservice.getLisOfFmData(patientId, masterFollicularStudyId);
			
			obj.setGetListOfFMDTO(list);
			
					return obj;
		}
		
		
}
