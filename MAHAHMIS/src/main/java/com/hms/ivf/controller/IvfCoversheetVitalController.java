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

import com.hms.doctordesk.dto.CoversheetVitalInfo;
import com.hms.ivf.dto.IvfCoverSheetVitalDTO;
import com.hms.ivf.service.IvfCoversheetVitalService;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/ivfvital")
@Slf4j
public class IvfCoversheetVitalController {
	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	 
	 @Autowired
		IvfCoversheetVitalService  coverservice;
	 
	 /******
		 * @author   :HM00054
		 * @Code     :this method used for saveCoversheetVital
		 * *****/
		@RequestMapping(value = "/saveCoversheetVital", method = RequestMethod.POST)
		@ResponseBody	
		public int saveCoversheetVital(@RequestParam("coversheetDetails") String coversheetDetails,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, @RequestParam("ivftreatmentId") Integer ivftreatmentId,HttpServletRequest request) {
			
			logger.info("inside saveCoversheetVital");
			int response = coverservice.saveCoversheetVital(coversheetDetails, patientId, treatmentId,ivftreatmentId);
			logger.debug("response saveCoversheetVital...."+response);
			return response;
		}
		

		/******
		 * @author   :HM00054
		 * @Code     :this method used for getCoversheetTreatmentListByTreatmentId
		 * *****/
		@ResponseBody
		@RequestMapping(value="/getCoversheetTreatmentListByTreatmentId",method = RequestMethod.GET)
		public IvfCoverSheetVitalDTO  getCoversheetTreatmentListByTreatmentId(@RequestParam ("treatmentId")Integer treatmentId,@RequestParam ("unitId")Integer unitId,@RequestParam ("CallFrom")String CallFrom,@RequestParam ("userDate")String userDate)
		{
			IvfCoverSheetVitalDTO obj =new IvfCoverSheetVitalDTO ();
			logger.info("inside getCoversheetTreatmentListByTreatmentId");
			List<IvfCoverSheetVitalDTO> list=coverservice.getCoversheetTreatmentListByTreatmentId(treatmentId, unitId, CallFrom, userDate);
			logger.debug("response getCoversheetTreatmentListByTreatmentId...."+list);
			obj.setGetListOfOPDCoversheetVitalDTO(list);
			
			return obj;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for lstCoversheetVitalInfo
		 * *****/
		@ResponseBody
		@RequestMapping(value="/lstCoversheetVitalInfo",method = RequestMethod.GET)
		public CoversheetVitalInfo  lstCoversheetVitalInfo(@RequestParam ("patientId")Integer patientId)
		{
			CoversheetVitalInfo obj =new CoversheetVitalInfo ();
			logger.info("inside getCoversheetTreatmentListByTreatmentId");
			List<CoversheetVitalInfo> list=coverservice.lstCoversheetVitalInfo(patientId);
			logger.debug("response getCoversheetTreatmentListByTreatmentId...."+list);
			obj.setLstCoversheetVitalInfo(list);
			
			return obj;
		}
		
		

}
