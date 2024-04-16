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

import com.hms.doctordesk.dto.OPDBmiMasterDTO;
import com.hms.ivf.dto.IVFBmiMasterDTO;
import com.hms.ivf.dto.IVFDietDTO;
import com.hms.ivf.service.IvfDietService;

@Controller
@RequestMapping(value = "/ivfdiet")
public class IvfDietController {
	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	 
	 @Autowired
	 IvfDietService ivfService;
	 
	/******
	 * @author   :HM00054
	 * @Code     :this method used for save saveIVFDiet 
	 * *****/
	@RequestMapping(value = "/saveIVFDiet", method = RequestMethod.POST)
	@ResponseBody	
	public int saveIVFDiet(IVFDietDTO obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, @RequestParam("ivftreatmentId") Integer ivftreatmentId,HttpServletRequest request) {
		logger.info("inside saveIVFDiet");
		int response = ivfService.saveIVFDiet(obj, patientId, treatmentId, ivftreatmentId);
		logger.debug("response saveIVFDiet...."+response);
		return response;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for edit ivf diet
	 * *****/
	@RequestMapping(value = "/editIVFDiet", method = RequestMethod.POST)
	@ResponseBody	
	public IVFDietDTO editIVFDiet(@RequestParam("dietMasterId") Integer dietMasterId, HttpServletRequest request) {
		logger.info("inside editIVFDiet");
		IVFDietDTO obj = ivfService.editIVFDiet(dietMasterId);
		logger.debug("response editIVFDiet...."+obj);
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for getIVFDietListByTreatmentId
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getIVFDietListByTreatmentId")
	public IVFDietDTO  getIVFDietListByTreatmentId(@RequestParam ("ivftreatmentId")Integer ivftreatmentId)
	{
		IVFDietDTO obj=new IVFDietDTO();
		logger.info("inside getIVFDietListByTreatmentId");
		List<IVFDietDTO>  list=ivfService.getIVFDietListByTreatmentId(ivftreatmentId);
		logger.debug("response getIVFDietListByTreatmentId...."+list);
		obj.setGetListOfIVFDietDTO(list);
		
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for deleteIVFDiet
	 * *****/
	@RequestMapping(value = "/deleteIVFDiet", method = RequestMethod.GET)
	public @ResponseBody int deleteIVFDiet(@RequestParam("dietMasterIds") String dietMasterIds,@RequestParam("userId") Integer userId){
			
		int res=0;
		logger.info("inside deleteIVFDiet");
		res = ivfService.deleteIVFDiet(dietMasterIds, userId);
		logger.debug("response deleteIVFDiet...."+res);
		return res;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for saveIVFPatientBMI
	 * *****/
	@RequestMapping(value = "/saveIVFPatientBMI", method = RequestMethod.POST)
	@ResponseBody	
	public int saveIVFPatientBMI(IVFBmiMasterDTO obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId,@RequestParam ("ivftreatmentId")Integer ivftreatmentId, HttpServletRequest request) {
		logger.info("inside saveIVFPatientBMI");
		int response = ivfService.saveIVFPatientBMI(obj, patientId, treatmentId, ivftreatmentId);
		logger.debug("response saveIVFPatientBMI...."+response);
		return response;
	}
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for getOPDBMIListByTreatmentId
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getIVFBMIListByTreatmentId")
	public IVFBmiMasterDTO  getIVFBMIListByTreatmentId(@RequestParam ("ivftreatmentId")Integer treatmentId)
	{
		IVFBmiMasterDTO obj=new IVFBmiMasterDTO();
		logger.info("inside getIVFBMIListByTreatmentId");
		List<IVFBmiMasterDTO>  list=ivfService.getIVFBMIListByTreatmentId(treatmentId);
		logger.debug("response getIVFBMIListByTreatmentId...."+list);
		obj.setGetListOfOPDBmiDTO(list);
		
		return obj;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for editIVFBMI
	 * *****/
	@RequestMapping(value = "/editIVFBMI", method = RequestMethod.POST)
	@ResponseBody	
	public IVFBmiMasterDTO editOPDBMI(@RequestParam("opdBmiMasterId") Integer opdBmiMasterId, HttpServletRequest request) {
		logger.info("inside editIVFBMI");
		IVFBmiMasterDTO obj = ivfService.editIVFBMI(opdBmiMasterId);
		logger.debug("response editIVFBMI...."+obj);
		return obj;
	}
	
	

}
