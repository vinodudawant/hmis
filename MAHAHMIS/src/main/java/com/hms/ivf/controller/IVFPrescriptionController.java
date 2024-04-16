package com.hms.ivf.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.MedicationMaster;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OPDPrescriptionFolloUpDto;
import com.hms.doctordesk.dto.OPDPrescriptionTemplateMedicineDto;
import com.hms.doctordesk.dto.OPDPrescriptionTemplatesDTO;
import com.hms.doctordesk.dto.PresTemplateMaster;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.doctordesk.service.PrescriptionInstructionService;
import com.hms.doctordesk.service.PrescriptionService;
import com.hms.ivf.dto.IVFPrescriptionDtoSP;
import com.hms.ivf.dto.IVFPrescriptionFolloUpDto;
import com.hms.ivf.dto.IvfPrescriptionsDto;
import com.hms.ivf.service.IVFPrescriptionService;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.UomMaster;

import groovy.util.logging.Slf4j;

/**
 * @author Aniket kanse
 * @since 24 DEC 21
 *
 */
@Controller
@RequestMapping(value="/ivfPrescriptionController")
@Slf4j
public class IVFPrescriptionController {

	@Autowired
	IVFPrescriptionService IVFPrescriptionService;
	
	private static final org.slf4j.Logger logger =  LoggerFactory.getLogger(IVFPrescriptionController.class);

	
	/******
	 * @author   : HM00052
	 * @throws ParseException 
	 * @Code     : Method to save OPD Followup
	 * *****/
	@RequestMapping(value = "/savefollowUpForIVFPatient", method = RequestMethod.POST)
	@ResponseBody
	public int savefollowUpForIVFPatient(  
											@RequestParam("followUpId") Integer followUpId, 
											@RequestParam("radioValue") String radioValue, 
											@RequestParam("numberOf") Integer numberOf, 
											@RequestParam("docId") Integer docId, 
											@RequestParam("docName") String docName, 
											@RequestParam("patientId") Integer patientId, 
											@RequestParam("patientName") String patientName, 
											@RequestParam("treatmentId") Integer treatmentId, 
											@RequestParam("treatmentDocId") Integer treatmentDocId,
											@RequestParam("ivfTreatId") Integer ivfTreatId,
											HttpServletRequest request) throws ParseException {
		
		logger.info("In IVFPrescriptionController savefollowUpForIVFPatient()");
		
		String followUpDate;

		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Calendar c = Calendar.getInstance();
		c.setTime(new Date());

		if (radioValue.equalsIgnoreCase("DAY")) {
			c.add(Calendar.DATE, numberOf);
		} else if (radioValue.equalsIgnoreCase("WEEK")) {
			c.add(Calendar.WEEK_OF_MONTH, numberOf);
		} else if (radioValue.equalsIgnoreCase("MONTH")) {
			c.add(Calendar.MONTH, numberOf);
		}

		SimpleDateFormat sdf1 = new SimpleDateFormat("dd/MM/yyyy");
		followUpDate = sdf.format(c.getTime());
		
		 java.util.Date date = sdf1.parse(followUpDate);
		
	//	OPDPrescriptionFolloUpDto opdFolloUp = new OPDPrescriptionFolloUpDto();
		IVFPrescriptionFolloUpDto opdFolloUp = new IVFPrescriptionFolloUpDto();
		opdFolloUp.setIvfFollowUpId(followUpId);
		opdFolloUp.setRadioDayWeekMonth(radioValue);
		opdFolloUp.setValueDayWeekMonth(numberOf);
		opdFolloUp.setDoctorId(docId);
		opdFolloUp.setDoctorName(docName);
		opdFolloUp.setPatientId(patientId);
		opdFolloUp.setPatientName(patientName);
		opdFolloUp.setTreatmentDocId(treatmentDocId);
		opdFolloUp.setDate(new Date (date.getTime()));
		
		
		int status = IVFPrescriptionService.savefollowUpForIVFPatient(opdFolloUp, treatmentId, ivfTreatId, request);
		
		return status;
	}
	
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting IVF folloup
	 * *****/
	@RequestMapping(value = "/getfollowUpForIVFDoctorDesk", method = RequestMethod.GET)
	@ResponseBody
	public IVFPrescriptionFolloUpDto getfollowUpForIVFDoctorDesk(@RequestParam("unitId") Integer unitId, 
																  @RequestParam("treatmentId") Integer treatmentId,
																  @RequestParam("ivfTreatId") Integer ivfTreatId ) {
		
		logger.info("In PrescriptionController : getfollowUpForIVFDoctorDesk()  for:" + ivfTreatId);
		
		IVFPrescriptionFolloUpDto obj = new IVFPrescriptionFolloUpDto();
		obj = IVFPrescriptionService.getfollowUpForIVFDoctorDesk(unitId, treatmentId, ivfTreatId);
	
		
		logger.info("In PrescriptionController : IVFPrescriptionFolloUpDto for: getfollowUpForIVFDoctorDesk" + obj);
		return obj;
	}
	
	
	/******
	 * @author   : HM00052
	 * @Code     : Method to save IVF priscription
	 * *****/
	@RequestMapping(value = "/saveIVFPrescription", method = RequestMethod.POST)
	@ResponseBody
	public int saveIVFPrescription(IvfPrescriptionsDto obj, HttpServletRequest request, @RequestParam("medicineID") Integer productId) {
		int status = IVFPrescriptionService.saveIVFPrescription(obj, request, productId);
		return status;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting all IVF prescriptions 
	 * *****/
	@RequestMapping(value = "/getAllIVFPrescriptions", method = RequestMethod.GET)
	@ResponseBody
	public IVFPrescriptionDtoSP getAllIVFPrescriptions(@RequestParam("treatmentId") Integer treatmentId, 
														@RequestParam("unitId") Integer unitId,
														@RequestParam("ivfTreatId") Integer ivfTreatId) {
		
		logger.info("In IVF PrescriptionController : getAllIVFPrescriptions()  for:" + ivfTreatId);
		
		List<IVFPrescriptionDtoSP> listIVFPrescriptionsSP = new ArrayList<>();
		IVFPrescriptionDtoSP obj = new IVFPrescriptionDtoSP();
		listIVFPrescriptionsSP = IVFPrescriptionService.getAllIVFPrescriptions(treatmentId, unitId, ivfTreatId);
		obj.setListIVFPrescriptionDtoSP(listIVFPrescriptionsSP);
		
		logger.info("In PrescriptionController : OPDPrescriptionDto onload  for:" + obj);
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting IVF prescription by prescription id
	 * *****/
	@RequestMapping(value = "/getIVFPrescriptionById", method = RequestMethod.GET)
	@ResponseBody
	public IVFPrescriptionDtoSP getIVFPrescriptionById(@RequestParam("unitId") Integer unitId, @RequestParam("ivfPrescriptionId") Integer ivfPrescriptionId) {
		
		logger.info("In IVFPrescriptionController : getIVFPrescriptionById()  for:" + ivfPrescriptionId);
		
		IVFPrescriptionDtoSP obj = new IVFPrescriptionDtoSP();
		obj = IVFPrescriptionService.getIVFPrescriptionById(unitId, ivfPrescriptionId);
	
		
		logger.info("In IVFPrescriptionController : IVFPrescriptionDtoSP onload  for: getIVFPrescriptionById" + obj);
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : for deleting IVF prescription
	 * *****/
	@RequestMapping(value = "/deleteIVFPrescription", method = RequestMethod.POST)
	@ResponseBody
	public String deleteIVFPrescription(@RequestParam("unitId") Integer unitId, @RequestParam("ivfPrescriptionId") String ivfPrescriptionId, HttpServletRequest request ) {	
		
		logger.info("In IVFPrescriptionController deleteIVFPrescription()");
		
		boolean response = IVFPrescriptionService.deleteIVFPrescription(unitId, ivfPrescriptionId, request);

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