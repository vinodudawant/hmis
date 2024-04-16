package com.hms.doctordesk.controller;

import java.util.ArrayList;
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

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.doctordesk.dto.ClinicalEvaluationBMIDto;
import com.hms.doctordesk.dto.OPDAllergyAlertsDto;
import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.service.OPDClinicalEvaluationService;

import groovy.util.logging.Slf4j;


/**
 * @author Aniket Kanse
 */
@Controller
@RequestMapping(value = "/opdClinicalEvaluation")
@Slf4j
public class OPDClinicalEvaluationController {
	
	private static final Logger logger = LoggerFactory.getLogger(OPDClinicalEvaluationController.class);
	
	@Autowired
	private OPDClinicalEvaluationService opdClinicalEvaluationService;
	
	
	/**
	 * @author HM00052
	 * @Date 29-12-21
	 * @param ClinicalEvaluationBMIDto obj, request
	 * @return status
	 */
	@RequestMapping(value = "/saveBMIForClinicalEvaluation", method = RequestMethod.POST)
	@ResponseBody
	public int saveBMIForClinicalEvaluation(ClinicalEvaluationBMIDto obj, @RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		
		logger.info("In OPDClinicalEvaluationController saveBMIForClinicalEvaluation(); & object :: " + obj);
		
		int status = opdClinicalEvaluationService.saveBMIForClinicalEvaluation(obj, treatmentId, request);
		return status;
		
	}
	
	/**
	 * @author HM00052
	 * @Date 06-01-22
	 * @param ClinicalEvaluationBMIDto obj, request
	 * @return status
	 */
	@RequestMapping(value = "/saveOPDAllergyAlerts", method = RequestMethod.POST)
	@ResponseBody
	public int saveOPDAllergyAlerts(OPDAllergyAlertsDto obj, 
										@RequestParam("patientId") Integer patientId,
										@RequestParam("treatmentId") Integer treatmentId,
									HttpServletRequest request) {
		
		
		logger.info("In OPDClinicalEvaluationController saveOPDAllergyAlerts(); & object :: " + obj);
		
		int status = opdClinicalEvaluationService.saveOPDAllergyAlerts(obj, patientId, treatmentId, request);
		
		return status;
		
	}
	
	/******
	 * @author   : HM00052
	 * @Date     : 06 JAN 22
	 * @Code     : for getting all allergy and alerts.
	 * *****/
	@RequestMapping(value = "/fetchAllAllergyAlerts", method = RequestMethod.GET)
	@ResponseBody
	public OPDAllergyAlertsDto fetchAllAllergyAlerts(@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		
		logger.info("In OPDClinicalEvaluationController : fetchAllAllergyAlerts()  for:" + treatmentId);
		
		List<OPDAllergyAlertsDto> listOPDAllergyAlertsDto = new ArrayList<>();
		OPDAllergyAlertsDto obj = new OPDAllergyAlertsDto();
		listOPDAllergyAlertsDto = opdClinicalEvaluationService.fetchAllAllergyAlerts(treatmentId, request);
		obj.setListOPDAllergyAlertsDto(listOPDAllergyAlertsDto);
		
		logger.info("In OPDClinicalEvaluationController : fetchAllAllergyAlerts onload  for:" + obj);
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Date     : 06 JAN 22
	 * @Code     : for getting Allergy records by id
	 * *****/
	@RequestMapping(value = "/getAllergyAlertsById", method = RequestMethod.GET)
	@ResponseBody
	public OPDAllergyAlertsDto getAllergyAlertsById(@RequestParam("allergyAlertsId") Integer allergyAlertsId) {
		
		logger.info("In OPDClinicalEvaluationController : getAllergyAlertsById()  for:" + allergyAlertsId);
		
		OPDAllergyAlertsDto obj = new OPDAllergyAlertsDto();
		obj = opdClinicalEvaluationService.getAllergyAlertsById(allergyAlertsId);
	
		
		logger.info("In OPDClinicalEvaluationController : OPDAllergyAlertsDto onload  for: getAllergyAlertsById" + obj);
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Date     : 06 JAN 22
	 * @Code     : for deleting Allergy Alert
	 * *****/
	@RequestMapping(value = "/deleteOPDAllergyAlerts", method = RequestMethod.POST)
	@ResponseBody
	public String deleteOPDAllergyAlerts(@RequestParam("allergyAlertsId") Integer allergyAlertsId, HttpServletRequest request ) {
		
		logger.info("In OPDClinicalEvaluationController deleteOPDAllergyAlerts()");
		
		boolean response = opdClinicalEvaluationService.deleteOPDAllergyAlerts(allergyAlertsId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		
		logger.debug("Response---> " + msg);
		
		return msg;
	}
	
	/******
	 * @author   : HM00052
	 * @Date     : 08 JAN 22
	 * @Code     : for getting Custom templates by doctor specialization id
	 * *****/
	@RequestMapping(value = "/fetchCustomTemplatesBySpecializationId", method = RequestMethod.GET)
	@ResponseBody
	public CustomizeTemplate fetchCustomTemplatesBySpecializationId(@RequestParam("doctorSpecialization") String doctorSpecialization) {
		
		logger.info("In OPDClinicalEvaluationController : fetchCustomTemplatesBySpecializationId()  for:" + doctorSpecialization);
		List<CustomizeTemplate> listCustomizeTemplate = new ArrayList<>();
		
		CustomizeTemplate obj = new CustomizeTemplate();
		listCustomizeTemplate = opdClinicalEvaluationService.fetchCustomTemplatesBySpecializationId(doctorSpecialization);
		obj.setCustomizeTemplateList(listCustomizeTemplate);
		
		logger.info("In OPDClinicalEvaluationController : listCustomizeTemplate : " + obj.getCustomizeTemplateList());
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Date     : 08 JAN 22
	 * @Code     : for getting custom template data by id
	 * *****/
	@RequestMapping(value = "/getCustomTemplateData", method = RequestMethod.GET)
	@ResponseBody
	public CustomizeTemplate getCustomTemplateData(@RequestParam("idCustomizeTemplate") Integer idCustomizeTemplate) {
		
		logger.info("In OPDClinicalEvaluationController : getCustomTemplateData()  for:" + idCustomizeTemplate);
		
		CustomizeTemplate obj = new CustomizeTemplate();
		obj = opdClinicalEvaluationService.getCustomTemplateData(idCustomizeTemplate);
	
		logger.info("In OPDClinicalEvaluationController : getCustomTemplateData" + obj);
		
		return obj;
	}
	
	/**
	 * @author HM00052
	 * @Date 09 JAN 22
	 * @param OPDClinicalEvaluationDto obj, request
	 * @return status
	 */
	@RequestMapping(value = "/saveOPDClinicalEvaluation", method = RequestMethod.POST)
	@ResponseBody
	public int saveOPDClinicalEvaluation(OPDClinicalEvaluationDto obj, 
										@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		
		
		logger.info("In OPDClinicalEvaluationController saveOPDClinicalEvaluation(); & object :: " + obj);
		
		int status = opdClinicalEvaluationService.saveOPDClinicalEvaluation(obj, treatmentId, request);
		
		return status;
		
	}
	
	/******
	 * @author   : HM00052
	 * @Date     : 09 JAN 22
	 * @Code     : for getting clinical evaluation template data.
	 * *****/
	@RequestMapping(value = "/fetchClinicalEvalTempDataByTreatmentId", method = RequestMethod.GET)
	@ResponseBody
	public OPDClinicalEvaluationDto fetchClinicalEvalTempDataByTreatmentId(@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		
		logger.info("In OPDClinicalEvaluationController : fetchClinicalEvalTempDataByTreatmentId()  for:" + treatmentId);
		
		OPDClinicalEvaluationDto obj = new OPDClinicalEvaluationDto();
		obj = opdClinicalEvaluationService.fetchClinicalEvalTempDataByTreatmentId(treatmentId, request);
		
		logger.info("In OPDClinicalEvaluationController : fetchClinicalEvalTempDataByTreatmentId onload  for:" + obj);
		return obj;
	}
}
