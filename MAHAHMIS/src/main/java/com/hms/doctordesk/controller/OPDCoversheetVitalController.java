package com.hms.doctordesk.controller;

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
import com.hms.doctordesk.dto.OPDCoverSheetVitalDTO;
import com.hms.doctordesk.service.OPDCoversheetVitalService;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/opdvital")
@Slf4j
public class OPDCoversheetVitalController {

	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
		@Autowired
		OPDCoversheetVitalService  coverservice;
		
		/******
		 * @author   :HM00054
		 * @Date     :06-1-2022
		 * @Code     :this method used for saveCoversheetVital
		 * *****/
		@RequestMapping(value = "/saveCoversheetVital", method = RequestMethod.POST)
		@ResponseBody	
		public int saveCoversheetVital(@RequestParam("coversheetDetails") String coversheetDetails,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
			
			logger.info("inside saveCoversheetVital");
			int response = coverservice.saveCoversheetVital(coversheetDetails, patientId, treatmentId);
			logger.debug("response saveCoversheetVital...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Date     :24-12-2021
		 * @Code     :this method used for getCoversheetTreatmentListByTreatmentId
		 * *****/
		@ResponseBody
		@RequestMapping(value="/getCoversheetTreatmentListByTreatmentId",method = RequestMethod.GET)
		public OPDCoverSheetVitalDTO  getCoversheetTreatmentListByTreatmentId(@RequestParam ("treatmentId")Integer treatmentId,@RequestParam ("unitId")Integer unitId,@RequestParam ("CallFrom")String CallFrom,@RequestParam ("userDate")String userDate)
		{
			OPDCoverSheetVitalDTO obj =new OPDCoverSheetVitalDTO ();
			logger.info("inside getCoversheetTreatmentListByTreatmentId");
			List<OPDCoverSheetVitalDTO> list=coverservice.getCoversheetTreatmentListByTreatmentId(treatmentId, unitId, CallFrom, userDate);
			logger.debug("response getCoversheetTreatmentListByTreatmentId...."+list);
			obj.setGetListOfOPDCoversheetVitalDTO(list);
			
			return obj;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Date     :24-12-2021
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
