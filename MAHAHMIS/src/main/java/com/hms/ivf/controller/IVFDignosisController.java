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
import com.hms.ivf.dto.IVFDignosisDTO;
import com.hms.ivf.service.IVFDignosisService;

import groovy.util.logging.Slf4j;

@Slf4j
@Controller
@RequestMapping(value = "/ivfdiagnosis")
public class IVFDignosisController {
	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	 
	 @Autowired
	 IVFDignosisService ivfdservice;
	 
	 /******
		 * @author   :HM00054
		 * @Code     :this method used for saveIVFDignosis
		 * *****/
		@RequestMapping(value = "/saveIVFDignosis", method = RequestMethod.POST)
		@ResponseBody	
		public int saveIVFDignosis(IVFDignosisDTO obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId,@RequestParam("ivfTreatId") Integer ivfTreatId, HttpServletRequest request) {
			String msg = "";
			logger.info("inside saveIVFDignosis");
			int response = ivfdservice.saveIVFDignosis(obj, treatmentId, patientId, ivfTreatId);
			logger.debug("response saveIVFDignosis...."+response);
			return response;
		}
		
		
		 /******
		 * @author   :HM00054
		 * @Code     :this method used for getListOfIVFDignosis
		 * *****/
		@RequestMapping(value = "/getListOfIVFDignosis", method = RequestMethod.GET)
		@ResponseBody	
		public IVFDignosisDTO getListOfIVFDignosis(@RequestParam("ivfTreatId") Integer ivfTreatId,@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		IVFDignosisDTO obj=new IVFDignosisDTO();
			logger.info("inside getListOfIVFDignosis");
			List<IVFDignosisDTO> list = ivfdservice.getListOfIVFDignosis(ivfTreatId, unitId);
			System.err.println("list..."+list);
			logger.debug("response getListOfIVFDignosis...."+list);
			obj.setGetListOfIVFDignosisDTO(list);
			return obj;
		}
		
		 /******
		 * @author   :HM00054
		 * @Code     :this method used for editIVFDignosis
		 * *****/
		@RequestMapping(value = "/editIVFDignosis", method = RequestMethod.GET)
		@ResponseBody	
		public IVFDignosisDTO editIVFDignosis(@RequestParam("ivfdignoMasterId") Integer ivfdignoMasterId, HttpServletRequest request) {
		IVFDignosisDTO obj=new IVFDignosisDTO();
			logger.info("inside editIVFDignosis");
			obj = ivfdservice.editIVFDignosis(ivfdignoMasterId);
			logger.debug("response editIVFDignosis...."+obj);
			
			return obj;
		}
		
		
		 /******
		 * @author   :HM00054
		 * @Code     :this method used for deleteIVFDigno
		 * *****/
		@RequestMapping(value = "/deleteIVFDigno", method = RequestMethod.POST)
		@ResponseBody	
		public int deleteIVFDigno(@RequestParam("ivfdignoMasterId") String ivfdignoMasterId,@RequestParam("userId") Integer userId, HttpServletRequest request) {
		int res=0;
			logger.info("inside deleteIVFDigno");
			res = ivfdservice.deleteIVFDigno(ivfdignoMasterId, userId);
			logger.debug("response deleteIVFDigno...."+res);
			
			return res;
		}
		
		
		 /******
		 * @author   :HM00054
		 * @Code     :this method used for updateDignosisStatus
		 * *****/
		@RequestMapping(value = "/updateDignosisStatus", method = RequestMethod.POST)
		@ResponseBody	
		public int updateDignosisStatus(@RequestParam("ivfdignoMasterId") String ivfdignoMasterId,@RequestParam("userId") Integer userId,@RequestParam("callFrom") String callFrom, HttpServletRequest request) {
		int res=0;
			logger.info("inside updateDignosisStatus");
			res = ivfdservice.updateDignosisStatus(ivfdignoMasterId, userId, callFrom);
			logger.debug("response updateDignosisStatus...."+res);
			
			return res;
		}
}
