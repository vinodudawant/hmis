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

import com.hms.ivf.dto.IVFCareAdviceDTO;
import com.hms.ivf.dto.IVFSxAdvicedDTO;
import com.hms.ivf.service.IvfSxService;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/ivfsxadvice")
@Slf4j
public class IVFSxAdviceController {
	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	 
	 @Autowired
	 IvfSxService ivfservice;
	 

		/******
		 * @author   :HM00054
		 * @Code     :this method used saveIVFSxAdvice
		 * *****/
		
		@RequestMapping(value = "/saveIVFSxAdvice", method = RequestMethod.POST)
		@ResponseBody	
		public int saveIVFSxAdvice(IVFSxAdvicedDTO obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId,@RequestParam("ivftreatmentId") Integer ivfTreatmentId, HttpServletRequest request) {
			logger.info("inside saveIVFSxAdvice");
			int response = ivfservice.saveIVFSxAdvice(obj, patientId, treatmentId, ivfTreatmentId);
			logger.debug("response saveIVFSxAdvice...."+response);
			return response;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for getIVFSxAdviceListByTreatmentId
		 * *****/
		@ResponseBody
		@RequestMapping(value="/getIVFSxAdviceListByTreatmentId",method = RequestMethod.GET)
		public IVFSxAdvicedDTO  getIVFSxAdviceListByTreatmentId(@RequestParam ("ivftreatmentId")Integer treatmentId,@RequestParam ("unitId")Integer unitId)
		{
			IVFSxAdvicedDTO obj =new IVFSxAdvicedDTO ();
			logger.info("inside getIVFSxAdviceListByTreatmentId");
			List<IVFSxAdvicedDTO> list=ivfservice.getIVFSxAdviceListByTreatmentId(treatmentId, unitId);
			logger.debug("response getIVFSxAdviceListByTreatmentId...."+list);
			obj.setGetListOfOPDSxAdviceDTO(list);
			
			return obj;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for editIVFSxAdvice
		 * *****/
		@ResponseBody
		@RequestMapping(value="/editIVFSxAdvice",method = RequestMethod.GET)
		public IVFSxAdvicedDTO  editOPDSxAdvice(@RequestParam ("id")Integer id)
		{
			IVFSxAdvicedDTO obj =new IVFSxAdvicedDTO ();
			logger.info("inside editIVFSxAdvice");
			obj=ivfservice.editIVFSxAdvice(id);
			logger.debug("response editIVFSxAdvice...."+obj);
			return obj;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for deleteIVFSxAdvice
		 * *****/
		@ResponseBody
		@RequestMapping(value="/deleteIVFSxAdvice",method = RequestMethod.POST)
		public int  deleteOPDSxAdvice(@RequestParam ("id")Integer id,@RequestParam ("userId")Integer userId)
		{
			int res=0;
			logger.info("inside deleteIVFSxAdvice");
			res=ivfservice.deleteIVFSxAdvice(id, userId);
			logger.debug("response deleteIVFSxAdvice...."+res);
			return res;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for saveIVFCareAdvice
		 * *****/
		@RequestMapping(value = "/saveIVFCareAdvice", method = RequestMethod.POST)
		@ResponseBody	
		public int saveIVFCareAdvice(IVFCareAdviceDTO obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId,@RequestParam("ivftreatmentId") Integer ivfTreatmentId, HttpServletRequest request) {
			
			logger.info("inside saveIVFCareAdvice");
			int response = ivfservice.saveIVFCareAdvice(obj, patientId, treatmentId, ivfTreatmentId);
			logger.debug("response saveIVFCareAdvice...."+response);
			return response;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for editOPDCareAdvice
		 * *****/
		@ResponseBody
		@RequestMapping(value="/editIVFCareAdvice",method = RequestMethod.GET)
		public IVFCareAdviceDTO  editOPDCareAdvice(@RequestParam ("id")Integer id)
		{
			IVFCareAdviceDTO obj =new IVFCareAdviceDTO ();
			logger.info("inside editIVFCareAdvice");
			obj=ivfservice.editIVFCareAdvice(id);
			logger.debug("response editIVFCareAdvice...."+obj);
			return obj;
		}

}
