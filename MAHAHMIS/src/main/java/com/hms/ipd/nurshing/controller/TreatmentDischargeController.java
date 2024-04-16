package com.hms.ipd.nurshing.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.controller.PrescriptionController;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OPDPrescriptionTemplateMedicineDto;
import com.hms.ipd.nurshing.dto.NursingDocumentDTO;
import com.hms.ipd.nurshing.dto.TreatmentDischargeDto;
import com.hms.ipd.nurshing.service.TreatmentDischargeService;

@Controller
@RequestMapping(value="/treatmentDischargeController")
public class TreatmentDischargeController {

	@Autowired
	TreatmentDischargeService TDService;
	
	private static final org.slf4j.Logger logger =  LoggerFactory.getLogger(TreatmentDischargeController.class);
	
	@RequestMapping(value = "/savetreatmentDischarge", method = RequestMethod.POST)
	@ResponseBody
	public int savetreatmentDischarge(TreatmentDischargeDto obj, HttpServletRequest request, @RequestParam("medicineID") Integer productId) {
		int status = TDService.savetreatmentDischarge(obj, request, productId);
		return status;
	}
	
	@RequestMapping(value = "/getAllPrescriptionsByTreatmentId", method = RequestMethod.GET)
	
	public @ResponseBody TreatmentDischargeDto getAllPrescriptionsByTreatmentId(@RequestParam("treatmentId") Integer treatmentId, @RequestParam("unitId") Integer unitId) {
		
		logger.info("In PrescriptionController : getAllPrescriptionsByTreatmentId()  for:" + treatmentId);
		
		/*
		 * List<TreatmentDischargeDto> listPrescriptionsSP = new ArrayList<>();
		 * TreatmentDischargeDto obj = new TreatmentDischargeDto(); listPrescriptionsSP
		 * = TDService.getAllPrescriptionsByTreatmentId(treatmentId, unitId);
		 * obj.setListtreatmentdischarge(listPrescriptionsSP);
		 */
		TreatmentDischargeDto listPrescriptionsSP = new TreatmentDischargeDto();
		List<TreatmentDischargeDto> list =  TDService.getAllPrescriptionsByTreatmentId(treatmentId, unitId);
		listPrescriptionsSP.setListtreatmentdischarge(list);
		return listPrescriptionsSP;
	
		
		
	}
	
	
	  @RequestMapping(value = "/usePrescriptionTemp", method = RequestMethod.POST)
	  
	  @ResponseBody public String usePrescriptionTemp(@RequestParam("treatmentId")
	  Integer treatmentId,
	  
	  @RequestParam("patientId") Integer patientId,
	  
	  @RequestParam("templateId") Integer templateId, HttpServletRequest request )
	  {
	  
	  logger.info("In PrescriptionController usePrescriptionTemp()");
	  
	  boolean response = TDService.usePrescriptionTemp(treatmentId, patientId,
	  templateId, request);
	  
	  String msg = ""; if (response == true) { msg =
	  "Template contents added to prescription !"; } else { msg = "Network issue";
	  }
	  
	  logger.debug("Response---> " + msg);
	  
	  return msg;
	  
	  }
	  /**
		 * @author : HM00098 Vishant Pawar
		 * @param 	: editIPDTreatmentAtDicharge
		 * @return : TreatmentDischargeDto
		 * @serialData: 18/07/2023
		 */
	  
		@RequestMapping(value = "/editIPDTreatmentAtDicharge", method = RequestMethod.POST)
		@ResponseBody
		public TreatmentDischargeDto editIPDTreatmentAtDicharge(@RequestParam("prescriptionId") Integer prescriptionId,
				HttpServletRequest request) {
			TreatmentDischargeDto dischargeDto = TDService.editIPDTreatmentAtDicharge(prescriptionId, request);
			return dischargeDto;
		}

		/**
		 * @author : HM00098 Vishant Pawar
		 * @param 	: deleteIPDTreatmentAtDicharge
		 * @return : delete IPD Treatment Dicharge
		 * @serialData: 18/07/2023
		 */
		
		@RequestMapping(value = "/deleteIPDTreatmentAtDicharge", method = RequestMethod.POST)
		@ResponseBody
		public String deleteIPDTreatmentAtDicharge(@RequestParam("unitId") Integer unitId,@RequestParam("prescriptionId") String prescriptionId,
				HttpServletRequest request) {
			boolean response = TDService.deleteIPDTreatmentAtDicharge(unitId,prescriptionId, request);
			
			String msg = "";
			if (response == true) {
				msg = "Records Deleted Sucessfully";
			} else {
				msg = "Network issue";
			}
			
			logger.debug("Response---> " + msg);
			return msg;
		}
}
