package com.hms.ivf.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;
import com.hms.ivf.dto.IVFClinicalEvalNewDTO;
import com.hms.ivf.service.IvfClinicalEvaluationService;
import groovy.util.logging.Slf4j;

/**
 * @author HM00053
 *
 */
@Controller
@RequestMapping(value="/ivfClinicalEvaluation")
@Slf4j
public class IvfClinicalEvaluationController {
	
	private static final org.slf4j.Logger logger =  LoggerFactory.getLogger(IvfClinicalEvaluationController.class);
	
	@Autowired
	private IvfClinicalEvaluationService ivfClinicalEvaluationService;
	
	
	/**
	 * @author HM00053
	 * @param  obj, request
	 * @return status
	 */
	@RequestMapping(value = "/saveIVFClinicalEvaluation", method = RequestMethod.POST)
	@ResponseBody
	public int saveIVFClinicalEvaluation(IVFClinicalEvalNewDTO obj, 
										@RequestParam("ivfTreatId") Integer ivfTreatId, HttpServletRequest request) {
		
		
		logger.info("In IvfClinicalEvaluationController saveIVFClinicalEvaluation(); & object :: " + obj);
		
		int status = ivfClinicalEvaluationService.saveIVFClinicalEvaluation(obj, ivfTreatId, request);
		
		return status;
		
	}
	
	
	/******
	 * @author   : HM00052
	 * @Date     : 09 JAN 22
	 * @Code     : for getting clinical evaluation template data.
	 * *****/
	@RequestMapping(value = "/fetchClinicalEvalTempDataByTreatmentId", method = RequestMethod.GET)
	@ResponseBody
	public OPDClinicalEvaluationDto fetchClinicalEvalTempDataByTreatmentId(@RequestParam("ivfTreatId") Integer treatmentId, HttpServletRequest request) {
		
		logger.info("In OPDClinicalEvaluationController : fetchClinicalEvalTempDataByTreatmentId()  for:" + treatmentId);
		
		OPDClinicalEvaluationDto obj = new OPDClinicalEvaluationDto();
		
		// start from here: AK180522
		obj = ivfClinicalEvaluationService.fetchClinicalEvalTempDataByTreatmentId(treatmentId, request);
		
		logger.info("In OPDClinicalEvaluationController : fetchClinicalEvalTempDataByTreatmentId onload  for:" + obj);
		return obj;
	}
	
}
