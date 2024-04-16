package com.hms.doctordesk.controller;

import java.lang.invoke.MethodHandles;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.OPDCareAdviceDTO;
import com.hms.doctordesk.dto.OPDChemoTheropyDTO;
import com.hms.doctordesk.dto.OPDPlanOfTreatmentDTO;
import com.hms.doctordesk.dto.OPDRadioTheorapyMaster;
import com.hms.doctordesk.dto.OPDRadioTheropyCheckBox;
import com.hms.doctordesk.dto.OPDSxAdvicedDTO;
import com.hms.doctordesk.service.OPDSxAdviceService;
import com.hms.ot.dto.Operation;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/opdsxadvice")
@Slf4j
public class OPDSxAdviceController {
	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	@Autowired
	OPDSxAdviceService sxadservice;
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used saveOPDSxAdvice
	 * *****/
	
	@RequestMapping(value = "/saveOPDSxAdvice", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOPDSxAdvice(OPDSxAdvicedDTO obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		logger.info("inside saveOPDSxAdvice");
		int response = sxadservice.saveOPDSxAdvice(obj, patientId, treatmentId);
		logger.debug("response saveOPDSxAdvice...."+response);
		return response;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for getOPDSxAdviceListByTreatmentId
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getOPDSxAdviceListByTreatmentId",method = RequestMethod.GET)
	public OPDSxAdvicedDTO  getOPDSxAdviceListByTreatmentId(@RequestParam ("treatmentId")Integer treatmentId,@RequestParam ("unitId")Integer unitId)
	{
		OPDSxAdvicedDTO obj =new OPDSxAdvicedDTO ();
		logger.info("inside getOPDSxAdviceListByTreatmentId");
		List<OPDSxAdvicedDTO> list=sxadservice.getOPDSxAdviceListByTreatmentId(treatmentId, unitId);
		logger.debug("response getOPDSxAdviceListByTreatmentId...."+list);
		obj.setGetListOfOPDSxAdviceDTO(list);
		
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for editOPDSxAdvice
	 * *****/
	@ResponseBody
	@RequestMapping(value="/editOPDSxAdvice",method = RequestMethod.GET)
	public OPDSxAdvicedDTO  editOPDSxAdvice(@RequestParam ("id")Integer id)
	{
		OPDSxAdvicedDTO obj =new OPDSxAdvicedDTO ();
		logger.info("inside editOPDSxAdvice");
		obj=sxadservice.editOPDSxAdvice(id);
		logger.debug("response editOPDSxAdvice...."+obj);
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for deleteOPDSxAdvice
	 * *****/
	@ResponseBody
	@RequestMapping(value="/deleteOPDSxAdvice",method = RequestMethod.POST)
	public int  deleteOPDSxAdvice(@RequestParam ("id")Integer id,@RequestParam ("userId")Integer userId)
	{
		int res=0;
		logger.info("inside deleteOPDSxAdvice");
		res=sxadservice.deleteOPDSxAdvice(id,userId);
		logger.debug("response deleteOPDSxAdvice...."+res);
		return res;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for saveOPDRadioTheropy
	 * *****/
	@RequestMapping(value = "/saveOPDRadioTheropy", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOPDRadioTheropy( OPDRadioTheorapyMaster obj,@RequestParam("radioSlaveDetails") String radioSlaveDetails,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		logger.info("inside saveOPDRadioTheropy");
		int response = sxadservice.saveOPDRadioTheropy(obj,radioSlaveDetails, patientId, treatmentId);
		logger.debug("response saveOPDRadioTheropy...."+response);
		return response;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for getOPDRadioTheropyListByTreatmentId
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getOPDRadioTheropyListByTreatmentId",method = RequestMethod.GET)
	public OPDRadioTheorapyMaster  getOPDRadioTheropyListByTreatmentId(@RequestParam ("treatmentId")Integer treatmentId,@RequestParam ("unitId")Integer unitId)
	{
		OPDRadioTheorapyMaster obj =new OPDRadioTheorapyMaster ();
		logger.info("inside getOPDRadioTheropyListByTreatmentId");
		List<OPDRadioTheorapyMaster> list=sxadservice.getOPDRadioTheropyListByTreatmentId(treatmentId, unitId);
		logger.debug("response getOPDRadioTheropyListByTreatmentId...."+list);
		obj.setGetListOfOPDTheropyDTO(list);
		
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for editOPDRadioTheropy
	 * *****/
	@ResponseBody
	@RequestMapping(value="/editOPDRadioTheropy",method = RequestMethod.GET)
	public OPDRadioTheorapyMaster  editOPDRadioTheropy(@RequestParam ("id")Integer id)
	{
		OPDRadioTheorapyMaster obj =new OPDRadioTheorapyMaster ();
		logger.info("inside editOPDRadioTheropy");
		obj=sxadservice.editOPDRadioTheropy(id);
		logger.debug("response editOPDRadioTheropy...."+obj);
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for deleteOPDRadioTheropy
	 * *****/
	@ResponseBody
	@RequestMapping(value="/deleteOPDRadioTheropy",method = RequestMethod.POST)
	public int  deleteOPDRadioTheropy(@RequestParam ("id")Integer id,@RequestParam ("userId")Integer userId)
	{
		int res=0;
		logger.info("inside deleteOPDRadioTheropy");
		res=sxadservice.deleteOPDRadioTheropy(id,userId);
		logger.debug("response deleteOPDRadioTheropy...."+res);
		return res;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for saveOPDCareAdvice
	 * *****/
	@RequestMapping(value = "/saveOPDCareAdvice", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOPDCareAdvice(OPDCareAdviceDTO obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		
		logger.info("inside saveOPDCareAdvice");
		int response = sxadservice.saveOPDCareAdvice(obj, patientId, treatmentId);
		logger.debug("response saveOPDCareAdvice...."+response);
		return response;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for editOPDCareAdvice
	 * *****/
	@ResponseBody
	@RequestMapping(value="/editOPDCareAdvice",method = RequestMethod.GET)
	public OPDCareAdviceDTO  editOPDCareAdvice(@RequestParam ("id")Integer id)
	{
		OPDCareAdviceDTO obj =new OPDCareAdviceDTO ();
		logger.info("inside editOPDCareAdvice");
		obj=sxadservice.editOPDCareAdvice(id);
		logger.debug("response editOPDCareAdvice...."+obj);
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for getRadioTheropyCheckBoxList
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getRadioTheropyCheckBoxList",method = RequestMethod.GET)
	public OPDRadioTheropyCheckBox  getRadioTheropyCheckBoxList(@RequestParam ("prefixCode")String  prefixCode)
	{
		OPDRadioTheropyCheckBox obj =new OPDRadioTheropyCheckBox ();
		logger.info("inside getRadioTheropyCheckBoxList");
		List<OPDRadioTheropyCheckBox>  list=sxadservice.getRadioTheropyCheckBoxList(prefixCode);
		logger.debug("response getRadioTheropyCheckBoxList...."+list);
		obj.setLstOPDRadioTheropyCheckBox(list);
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for delteRadioTheropySlave
	 * *****/
	@ResponseBody
	@RequestMapping(value="/delteRadioTheropySlave",method = RequestMethod.POST)
	public int  delteRadioTheropySlave(@RequestParam ("id")Integer id,@RequestParam ("userId")Integer userId)
	{
		int res=0;
		logger.info("inside delteRadioTheropySlave");
		res=sxadservice.delteRadioTheropySlave(id, userId);
		logger.debug("response delteRadioTheropySlave...."+res);
		return res;
	}

	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for saveOPDPlanOfTreatment
	 * *****/
	@RequestMapping(value = "/saveOPDPlanOfTreatment", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOPDPlanOfTreatment(@RequestParam("planOfMasterDetails") String planOfMasterDetails,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		
		logger.info("inside saveOPDPlanOfTreatment");
		int response = sxadservice.saveOPDPlanOfTreatment(planOfMasterDetails, patientId, treatmentId);
		logger.debug("response saveOPDPlanOfTreatment...."+response);
		return response;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for getOPDPlanOfTreatmentListByTreatmentId
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getOPDPlanOfTreatmentListByTreatmentId",method = RequestMethod.GET)
	public OPDPlanOfTreatmentDTO  getOPDPlanOfTreatmentListByTreatmentId(@RequestParam ("treatmentId")Integer treatmentId,@RequestParam ("unitId")Integer unitId)
	{
		OPDPlanOfTreatmentDTO obj =new OPDPlanOfTreatmentDTO ();
		logger.info("inside getOPDPlanOfTreatmentListByTreatmentId");
		List<OPDPlanOfTreatmentDTO> list=sxadservice.getOPDPlanOfTreatmentListByTreatmentId(treatmentId, unitId);
		logger.debug("response getOPDPlanOfTreatmentListByTreatmentId...."+list);
		obj.setGetListOfPlanOfTreatmentDTO(list);
		
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for deltePlanOfTreatment
	 * *****/
	@ResponseBody
	@RequestMapping(value="/deltePlanOfTreatment",method = RequestMethod.POST)
	public int  deltePlanOfTreatment(@RequestParam ("id")Integer id,@RequestParam ("userId")Integer userId)
	{
		int res=0;
		logger.info("inside deltePlanOfTreatment");
		res=sxadservice.deltePlanOfTreatment(id, userId);
		logger.debug("response deltePlanOfTreatment...."+res);
		return res;
	}
	

	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for saveOPDChemoTheropy
	 * *****/
	@RequestMapping(value = "/saveOPDChemoTheropy", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOPDChemoTheropy(OPDChemoTheropyDTO obj  ,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId,@RequestParam("nextBloodTestDate1") String  nextBloodTestDate, @RequestParam("nextChemoDate1") String  nextChemoDate,@RequestParam("nextVisitDate1") String  nextVisitDate,HttpServletRequest request) {
		
		logger.info("inside saveOPDChemoTheropy");
		int response = sxadservice.saveOPDChemoTheropy(obj, patientId, treatmentId, nextBloodTestDate, nextChemoDate, nextVisitDate);
		logger.debug("response saveOPDChemoTheropy...."+response);
		return response;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for getOPDChemoListByTreatmentId
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getOPDChemoListByTreatmentId",method = RequestMethod.GET)
	public OPDChemoTheropyDTO  getOPDChemoListByTreatmentId(@RequestParam ("treatmentId")Integer treatmentId,@RequestParam ("unitId")Integer unitId)
	{
		OPDChemoTheropyDTO obj =new OPDChemoTheropyDTO ();
		logger.info("inside getOPDChemoListByTreatmentId");
		List<OPDChemoTheropyDTO> list=sxadservice.getOPDChemoListByTreatmentId(treatmentId, unitId);
		logger.debug("response getOPDChemoListByTreatmentId...."+list);
		obj.setGetListOfOPDChemoTheropyDTO(list);
		
		return obj;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for editOPDChemoByTreatmentIdAndDate
	 * *****/
	@ResponseBody
	@RequestMapping(value="/editOPDChemoByTreatmentIdAndDate",method = RequestMethod.GET)
	public OPDChemoTheropyDTO  editOPDChemoByTreatmentIdAndDate(@RequestParam ("treatmentId")Integer treatmentId,@RequestParam ("userDate")String  userDate)
	{
		OPDChemoTheropyDTO obj =new OPDChemoTheropyDTO ();
		logger.info("inside editOPDChemoByTreatmentIdAndDate");
		obj=sxadservice.editOPDChemoByTreatmentIdAndDate(treatmentId, userDate);
		logger.debug("response editOPDChemoByTreatmentIdAndDate...."+obj);
		
		
		return obj;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Date     :24-12-2021
	 * @Code     :this method used for getOpreationName
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getOpreationName",method = RequestMethod.GET)
	public Operation  getOpreationName(@RequestParam ("procedureType")Integer procedureType,@RequestParam ("procedureGroup")Integer  procedureGroup)
	{
		Operation obj =new Operation ();
		logger.info("inside getOpreationName");
		obj=sxadservice.getOpreationName(procedureType, procedureGroup);
		logger.debug("response getOpreationName...."+obj);
		
		
		return obj;
	}
	

	/******
	 * @author   :HM00054
	 * @Code     :this method used for get OPD ChemoByTreatmentId for header Print
	 * *****/
	@ResponseBody
	@RequestMapping(value="/getOPDChemoByTreatmentIdForPrint",method = RequestMethod.GET)
	public OPDChemoTheropyDTO  getOPDChemoByTreatmentIdForPrint(@RequestParam ("treatmentId")Integer treatmentId)
	{
		OPDChemoTheropyDTO obj =new OPDChemoTheropyDTO ();
		logger.info("inside editOPDChemoByTreatmentIdAndDate");
		obj=sxadservice.getOPDChemoByTreatmentIdForPrint(treatmentId);
		logger.debug("response editOPDChemoByTreatmentIdAndDate...."+obj);
		
		
		return obj;
	}
}
