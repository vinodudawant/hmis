package com.hms.doctordesk.controller;

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
@RequestMapping(value="/prescriptionController")
@Slf4j
public class PrescriptionController {

	@Autowired
	PrescriptionService prescriptionService;
	
	private static final org.slf4j.Logger logger =  LoggerFactory.getLogger(PrescriptionController.class);

	
	@RequestMapping(value="/getIntsructionsForPrescriptions",method=RequestMethod.GET)
	@ResponseBody
	public PrescriptionInstructionDto getIntsructionsForPrescriptions(HttpServletRequest request){
		
		 PrescriptionInstructionDto obj = new PrescriptionInstructionDto();
		 List<PrescriptionInstructionDto> response = prescriptionService.getAllPreDetails(request);
		 obj.setListPrescriptionInstructionDto(response);
		 
		return obj;
	}
	
	@RequestMapping(value = "/fetchpreparationmaster", method = RequestMethod.GET)
	@ResponseBody
	public PreparationMaster fetchPreparationMaster() {
		logger.info("In ---- PrescriptionController fetchPreparationMaster()");
		PreparationMaster preparationmaster=new PreparationMaster();
		List<PreparationMaster> list = prescriptionService.fetchPreparationMaster();
		preparationmaster.setListpreparationmaster(list);
		logger.debug("Reponse----> "+list);
		return preparationmaster;
	}
	
	/**
	 * @author : HM00052
	 * @param 	: unit id, pharmacy preparation ID
	 * @return : route as per preparation id
	 */
	@RequestMapping(value = "/getRoutesByPreparationId", method = RequestMethod.GET)
	@ResponseBody
	public RouteMaster getRoutesByPreparationId( @RequestParam("prepID") Integer prepID,
												  @RequestParam("unitId") Integer unitId, 
												  HttpServletRequest request) {
		
		logger.info("In DoctorDesk : getRoutesByPreparationId()");
		
		List<RouteMaster> listRouteMaster = new ArrayList<RouteMaster>();
		RouteMaster obj = new RouteMaster();
		listRouteMaster = prescriptionService.getRoutesByPreparationId(prepID, unitId, request);
		
		System.out.println("list :  " + listRouteMaster);
		
		obj.setListroutemasters(listRouteMaster);
		logger.debug("Response----> " + obj);
		return obj;
	}
	
	/**
	 * @author : HM00052
	 * @param  : HTTP Request
	 * @return : routes list
	 */
	@RequestMapping(value = "/getAllRoutesForPrescription", method = RequestMethod.GET)
	@ResponseBody
	public RouteMaster getAllRoutesForPrescription(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		
		logger.info("In PrescriptionController : getAllRoutesForPrescription()");
		
		List<RouteMaster> listRouteMaster = new ArrayList<RouteMaster>();
		RouteMaster obj = new RouteMaster();
		listRouteMaster = prescriptionService.getAllRoutesForPrescription(unitId, request);
		
		System.out.println("list :  " + listRouteMaster);
		
		obj.setListroutemasters(listRouteMaster);
		logger.debug("Response----> " + obj);
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : Method to save OPD priscription
	 * *****/
	@RequestMapping(value = "/saveOPDPrescription", method = RequestMethod.POST)
	@ResponseBody
	public int saveOPDPrescription(OPDPrescriptionDto obj, HttpServletRequest request, @RequestParam("medicineID") Integer productId) {
		int status = prescriptionService.saveOPDPrescription(obj, request, productId);
		return status;
	}
	
	
	/******
	 * @author   : HM00052
	 * @Code     : For medicine auto suggest
	 * *****/
	@RequestMapping(value = "/autoSuggestMedicinelist", method = RequestMethod.GET)
	@ResponseBody
	public ProductMaster autoSuggestionProductlist( @RequestParam("letter") String letter, @RequestParam("prep") String prep) {
		
		List<ProductMaster> ListproductMasters = new ArrayList<ProductMaster>();
		
		ProductMaster productMasters = new ProductMaster();
		
		try {
			ListproductMasters = prescriptionService.autoSuggestionProductlist(letter, prep);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		productMasters.setLstprod(ListproductMasters);

		return productMasters;
	}
	
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting medicine by ID
	 * *****/
	@RequestMapping(value = "/getMedicineById", method = RequestMethod.GET)
	@ResponseBody
	public ProductMaster getMedicineById(@RequestParam("productId") Integer productId) {
		
		logger.info("In PrescriptionController : getMedicineById() :" + productId);
		
		ProductMaster productMasters = new ProductMaster();
		productMasters = prescriptionService.getMedicineById(productId);
		
		return productMasters;
	}
	
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting all units (pharmacy)
	 * *****/
	@RequestMapping(value="/fetchAllUnits",method=RequestMethod.GET)
	@ResponseBody
	public UomMaster fetchAllUnits(HttpServletRequest request){
		
		 UomMaster obj = new UomMaster();
		 List<UomMaster> response = prescriptionService.fetchAllUnits(request);
		 obj.setListUomMaster(response);
		 
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting all prescriptions against treatment ID
	 * *****/
	@RequestMapping(value = "/getAllPrescriptionsByTreatmentId", method = RequestMethod.GET)
	@ResponseBody
	public OPDPrescriptionDtoSP getAllPrescriptionsByTreatmentId(@RequestParam("treatmentId") Integer treatmentId, @RequestParam("unitId") Integer unitId) {
		
		logger.info("In PrescriptionController : getAllPrescriptionsByTreatmentId()  for:" + treatmentId);
		
		List<OPDPrescriptionDtoSP> listPrescriptionsSP = new ArrayList<>();
		OPDPrescriptionDtoSP obj = new OPDPrescriptionDtoSP();
		listPrescriptionsSP = prescriptionService.getAllPrescriptionsByTreatmentId(treatmentId, unitId);
		obj.setListOPDPrescriptionDtoSP(listPrescriptionsSP);
		
		logger.info("In PrescriptionController : OPDPrescriptionDto onload  for:" + obj);
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting prescription by prescription id
	 * *****/
	@RequestMapping(value = "/getPrescriptionById", method = RequestMethod.GET)
	@ResponseBody
	public OPDPrescriptionDtoSP getPrescriptionById(@RequestParam("unitId") Integer unitId, @RequestParam("prescriptionId") Integer prescriptionId) {
		
		logger.info("In PrescriptionController : getPrescriptionById()  for:" + prescriptionId);
		
		OPDPrescriptionDtoSP obj = new OPDPrescriptionDtoSP();
		obj = prescriptionService.getPrescriptionById(unitId, prescriptionId);
	
		
		logger.info("In PrescriptionController : OPDPrescriptionDto onload  for: getPrescriptionById" + obj);
		return obj;
	}
	
	
	/******
	 * @author   : HM00052
	 * @Code     : for deleting prescription
	 * *****/
	@RequestMapping(value = "/deleteOPDPrescription", method = RequestMethod.POST)
	@ResponseBody
	//public String deleteOPDPrescription(@RequestParam("unitId") Integer unitId, @RequestParam("prescriptionId") Integer prescriptionId, HttpServletRequest request ) {
	public String deleteOPDPrescription(@RequestParam("unitId") Integer unitId, @RequestParam("prescriptionId") String prescriptionId, HttpServletRequest request ) {	
		logger.info("In PrescriptionController deleteOPDPrescription()");
		
		boolean response = prescriptionService.deleteOPDPrescription(unitId, prescriptionId, request);

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
	 * @CodeFor     : Method to save OPD prescription Template
	 * *****/
	@RequestMapping(value = "/saveOPDPrescriptionTemplates", method = RequestMethod.POST)
	@ResponseBody
	public int saveOPDPrescriptionTemplates(OPDPrescriptionTemplatesDTO obj, HttpServletRequest request) {
		
		int status = prescriptionService.saveOPDPrescriptionTemplates(obj, request);
		
		return status;
	}
	
	/******
	 * @author   : HM00052
	 * @CodeFor  : Method to get all prescription templates
	 * *****/
	@RequestMapping(value = "/fetchOPDPrescriptionTemplatesByID", method = RequestMethod.GET)
	@ResponseBody
	public OPDPrescriptionTemplatesDTO fetchOPDPrescriptionTemplatesByID(@RequestParam("templateId") Integer templateId, HttpServletRequest request) {
		
		logger.info("In PrescriptionController fetchOPDPrescriptionTemplatesByID() for templateId : " + templateId);
		
		List<OPDPrescriptionTemplatesDTO> listOPDPrescriptionTemplatesDTO = new ArrayList<OPDPrescriptionTemplatesDTO>();
		listOPDPrescriptionTemplatesDTO= prescriptionService.fetchOPDPrescriptionTemplatesByID(templateId, request);
		OPDPrescriptionTemplatesDTO obj = new OPDPrescriptionTemplatesDTO();
		obj.setListOPDPrescriptionTemplatesDTO(listOPDPrescriptionTemplatesDTO);
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : Method to save OPD prescription template's medicines
	 * *****/
	@RequestMapping(value = "/saveUpdateOPDPrescTempMeds", method = RequestMethod.POST)
	@ResponseBody
	public int saveUpdateOPDPrescTempMeds(OPDPrescriptionTemplateMedicineDto obj, HttpServletRequest request, 
											@RequestParam("templateId") Integer templateId) {
		
		logger.info("In PrescriptionController saveUpdateOPDPrescTempMeds()");
		
		int status = prescriptionService.saveUpdateOPDPrescTempMeds(obj, request, templateId);
		return status;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting prescription template medicines by template medicine id
	 * *****/
	@RequestMapping(value = "/getOPDPrescriptionTemplateMedicineById", method = RequestMethod.GET)
	@ResponseBody
	public OPDPrescriptionTemplateMedicineDto getOPDPrescriptionTemplateMedicineById(@RequestParam("unitId") Integer unitId, 
			@RequestParam("templateMedicineId") Integer templateMedicineId) {
		
		logger.info("In PrescriptionController : getOPDPrescriptionTemplateMedicineById()  for:" + templateMedicineId);
		
		OPDPrescriptionTemplateMedicineDto obj = new OPDPrescriptionTemplateMedicineDto();
		obj = prescriptionService.getOPDPrescriptionTemplateMedicineById(unitId, templateMedicineId);
	
		
		logger.info("In PrescriptionController : OPDPrescriptionTemplateMedicineDto for: getOPDPrescriptionTemplateMedicineById" + obj);
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : for deleting OPDPrescriptionTemplateMedicine
	 * *****/
	@RequestMapping(value = "/deleteOPDPrescriptionTemplateMedicine", method = RequestMethod.POST)
	@ResponseBody
	public String deleteOPDPrescriptionTemplateMedicine(@RequestParam("unitId") Integer unitId, @RequestParam("templateMedicineId") Integer templateMedicineId, HttpServletRequest request ) {
		
		logger.info("In PrescriptionController deleteOPDPrescriptionTemplateMedicine()");
		
		boolean response = prescriptionService.deleteOPDPrescriptionTemplateMedicine(unitId, templateMedicineId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		
		logger.debug("Response---> " + msg);
		
		return msg;
		
	}
	
	
	// -------------------------------
	
	/******
	 * @author   : HM00052
	 * @Code     : for using opd template in prescription
	 * *****/
	@RequestMapping(value = "/usePrescriptionTemp", method = RequestMethod.POST)
	@ResponseBody
	public String usePrescriptionTemp(@RequestParam("treatmentId") Integer treatmentId, 
									   @RequestParam("patientId") Integer patientId,
									   @RequestParam("templateId") Integer templateId,
									   HttpServletRequest request ) {
		
		logger.info("In PrescriptionController usePrescriptionTemp()");
		
		boolean response = prescriptionService.usePrescriptionTemp(treatmentId, patientId, templateId, request);

		String msg = "";
		if (response == true) {
			msg = "Template contents added to prescription !";
		} else {
			msg = "Network issue";
		}
		
		logger.debug("Response---> " + msg);
		
		return msg;
		
	}
		
	
	/******
	 * @author   : HM00052
	 * @Code     : for deleting OPD Prescription Template.
	 * *****/
	@RequestMapping(value = "/deleteOPDPrescriptionTemplate", method = RequestMethod.POST)
	@ResponseBody
	public String deleteOPDPrescriptionTemplate(@RequestParam("unitId") Integer unitId, @RequestParam("templateId") Integer templateId, HttpServletRequest request ) {
		
		logger.info("In PrescriptionController deleteOPDPrescriptionTemplate()");
		
		boolean response = prescriptionService.deleteOPDPrescriptionTemplate(unitId, templateId, request);

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
	 * @Code     : for saving OPD prescription as OPD template
	 * *****/
	@RequestMapping(value = "/addPrescriptionAsOPDTemplate", method = RequestMethod.POST)
	@ResponseBody
	public String addPrescriptionAsOPDTemplate(@RequestParam("treatmentId") Integer treatmentId,
												@RequestParam("unitId") Integer unitId,
												@RequestParam("prescriptionIDArray") String prescIDArray,
												@RequestParam("newExistingRadio") String newExistingRadio,
												@RequestParam("templateId") Integer templateId,
												@RequestParam("templateName") String templateName,
												@RequestParam("myTemplateCheckBoxFlag") String myTemplateCheckBoxFlag,
												@RequestParam("orgTemplateCheckBoxFlag") String orgTemplateCheckBoxFlag,
												HttpServletRequest request ) {
		
		logger.info("In PrescriptionController addPrescriptionAsOPDTemplate()");
		
		String msg = "";
		
		String[] prescriptionIDArray = prescIDArray.split(",");
		
		if (newExistingRadio.equalsIgnoreCase("NEW")) {
			
			OPDPrescriptionTemplatesDTO newDto = new OPDPrescriptionTemplatesDTO();

			newDto.setTemplateId(0);
			newDto.setTemplateName(templateName);
			newDto.setMyTemplateCheckBoxFlag(myTemplateCheckBoxFlag);
			newDto.setOrgTemplateCheckBoxFlag(orgTemplateCheckBoxFlag);
			
			msg = prescriptionService.addPrescriptionAsNEWOPDTemplate(newDto, prescriptionIDArray, unitId, request);

		} else if (newExistingRadio.equalsIgnoreCase("EXISTING")) {

			msg = prescriptionService.updateOpdTemplateWithNewMedicines(templateId, prescriptionIDArray, unitId, request);

		}
		return msg;
	}
	
	
	/******
	 * @author   : HM00052
	 * @throws ParseException 
	 * @Code     : Method to save OPD Followup
	 * *****/
	@RequestMapping(value = "/savefollowUpForOPDPatient", method = RequestMethod.POST)
	@ResponseBody
	public int savefollowUpForOPDPatient(  @RequestParam("followUpId") Integer followUpId, 
											@RequestParam("radioValue") String radioValue, 
											@RequestParam("numberOf") Integer numberOf, 
											@RequestParam("docId") Integer docId, 
											@RequestParam("docName") String docName, 
											@RequestParam("patientId") Integer patientId, 
											@RequestParam("patientName") String patientName, 
											@RequestParam("treatmentId") Integer treatmentId, 
											@RequestParam("treatmentDocId") Integer treatmentDocId,
											HttpServletRequest request) throws ParseException {
		
		logger.info("In PrescriptionController savefollowUpForOPDPatient()");
		
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
		
		OPDPrescriptionFolloUpDto opdFolloUp = new OPDPrescriptionFolloUpDto();
		opdFolloUp.setFollowUpId(followUpId);
		opdFolloUp.setRadioDayWeekMonth(radioValue);
		opdFolloUp.setValueDayWeekMonth(numberOf);
		opdFolloUp.setDoctorId(docId);
		opdFolloUp.setDoctorName(docName);
		opdFolloUp.setPatientId(patientId);
		opdFolloUp.setPatientName(patientName);
		opdFolloUp.setTreatmentDocId(treatmentDocId);
		opdFolloUp.setDate(new Date (date.getTime()));
		
		
		int status = prescriptionService.savefollowUpForOPDPatient(opdFolloUp, treatmentId, request);
		
		return status;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting opd folloup
	 * *****/
	@RequestMapping(value = "/getfollowUpForOPDPatient", method = RequestMethod.GET)
	@ResponseBody
	public OPDPrescriptionFolloUpDto getfollowUpForOPDPatient(@RequestParam("unitId") Integer unitId, 
																@RequestParam("treatmentId") Integer treatmentId) {
		
		logger.info("In PrescriptionController : getfollowUpForOPDPatient()  for:" + treatmentId);
		
		OPDPrescriptionFolloUpDto obj = new OPDPrescriptionFolloUpDto();
		obj = prescriptionService.getfollowUpForOPDPatient(unitId, treatmentId);
	
		
		logger.info("In PrescriptionController : OPDPrescriptionFolloUpDto for: getfollowUpForOPDPatient" + obj);
		return obj;
	}
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting pediatrics medicine auto suggestions
	 * *****/
	@RequestMapping(value = "/paediatricsMedicineAutoSuggestList", method = RequestMethod.POST)
	@ResponseBody
	public MedicationMaster paediatricsMedicineAutoSuggestList(@RequestParam("prep") String prep, @RequestParam("letter") String letter) {
		
		logger.info("In PrescriptionController : paediatricsMedicineAutoSuggestList()  ");
		
		List<MedicationMaster> ListPaediatricsMedicines = new ArrayList<MedicationMaster>();
		MedicationMaster paediatricsMedicine = new MedicationMaster();
		
		try {
			ListPaediatricsMedicines = prescriptionService.paediatricsMedicineAutoSuggestList(prep, letter);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		paediatricsMedicine.setListMedication(ListPaediatricsMedicines);

		return paediatricsMedicine;

	}
	
	/******
	 * @author   : HM00052
	 * @Code     : for getting pediatrics medicine by ID
	 * *****/
	@RequestMapping(value = "/getPaediatricsMedicineById", method = RequestMethod.GET)
	@ResponseBody
	public MedicationMaster getPaediatricsMedicineById(@RequestParam("id") Integer id) {
		
		logger.info("In PrescriptionController : getPaediatricsMedicineById() :" + id);
		
		MedicationMaster medicationMaster = new MedicationMaster();
		medicationMaster = prescriptionService.getPaediatricsMedicineById(id);
		
		return medicationMaster;
	}
	
	/******
	 * @author   : HM00069
	 * @Code     : for getting medicine from pharmacy stock auto suggestions
	 * *****/
	@RequestMapping(value = "/getPharmacyStockMedicine", method = RequestMethod.POST)
	@ResponseBody
	public OPDPrescriptionDto getPharmacyStockMedicine(@RequestParam("prep") String prep, @RequestParam("letter") String letter) {
		
		logger.info("In PrescriptionController : getPharmacyStockMedicine()  ");
		
		List<OPDPrescriptionDto> listOPDPrescriptionDto = new ArrayList<OPDPrescriptionDto>();
		OPDPrescriptionDto stockMedicine = new OPDPrescriptionDto();
		
		try {
			listOPDPrescriptionDto = prescriptionService.getPharmacyStockMedicine(prep, letter);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		stockMedicine.setListOPDPrescriptionDto(listOPDPrescriptionDto);

		return stockMedicine;

	}
	
	/******
	 * @author   : HM00069
	 * @Code     : for getting pediatrics medicine by ID
	 * *****/
	@RequestMapping(value = "/getMedicineFromStockById", method = RequestMethod.GET)
	@ResponseBody
	public OPDPrescriptionDto getMedicineFromStockById(@RequestParam("id") Integer id) {
		
		logger.info("In PrescriptionController : getMedicineFromStockById() :" + id);
		
		OPDPrescriptionDto medicationMaster = new OPDPrescriptionDto();
		medicationMaster = prescriptionService.getMedicineFromStockById(id);
		
		return medicationMaster;
	}
	
	
	/******
	 * @author   : Vishant Pawar
	 * @Code     : for getting all prescriptions against treatment ID
	 * *****/
	@RequestMapping(value = "/getAllPrescriptionsNursingStation", method = RequestMethod.GET)
	@ResponseBody
	public OPDPrescriptionDtoSP getAllPrescriptionsNursingStation(@RequestParam("treatmentId") Integer treatmentId, 
			@RequestParam("unitId") Integer unitId,@RequestParam("date")String date) {
		
		logger.info("In PrescriptionController : getAllPrescriptionsByTreatmentId()  for:" + treatmentId);
		
		List<OPDPrescriptionDtoSP> listPrescriptionsSP = new ArrayList<>();
		OPDPrescriptionDtoSP obj = new OPDPrescriptionDtoSP();
		listPrescriptionsSP = prescriptionService.getAllPrescriptionsNursingStation(treatmentId, unitId,date);
		obj.setListOPDPrescriptionDtoSP(listPrescriptionsSP);
		
		logger.info("In PrescriptionController : OPDPrescriptionDto onload  for:" + obj);
		return obj;
	}
	
	/**
	 * @author : vishant pawar
	 * @param 	:  pharmacy preparation ID
	 * @return : route as per preparation id
	 */
	@RequestMapping(value = "/getPreparationById", method = RequestMethod.GET)
	@ResponseBody
	public PreparationMaster getPreparationById( @RequestParam("prepID") Integer prepID,
												  HttpServletRequest request) {
		
		logger.info("In DoctorDesk : getRoutesByPreparationId()");
		
		//List<RouteMaster> listRouteMaster = new ArrayList<RouteMaster>();
		//RouteMaster obj = new RouteMaster();
		PreparationMaster obj = prescriptionService.getPreparationById(prepID);
		
		//System.out.println("list :  " + listRouteMaster);
		
		//obj.setListroutemasters(listRouteMaster);
		logger.debug("Response----> " + obj);
		return obj;
	}
	
	/******
	 * @author   : Vishant Pawar
	 * @Code     : for getting all prescriptions against treatment ID
	 * *****/
	@RequestMapping(value = "/getAllPrescriptionsByTreatmentIdDateWise", method = RequestMethod.GET)
	@ResponseBody
	public OPDPrescriptionDtoSP getAllPrescriptionsByTreatmentIdDateWise(@RequestParam("treatmentId") Integer treatmentId, @RequestParam("unitId") Integer unitId,
			@RequestParam("prescriptionOrderDate") String prescriptionOrderDate) {
		
		logger.info("In PrescriptionController : getAllPrescriptionsByTreatmentId()  for:" + treatmentId);
		
		List<OPDPrescriptionDtoSP> listPrescriptionsSP = new ArrayList<>();
		OPDPrescriptionDtoSP obj = new OPDPrescriptionDtoSP();
		listPrescriptionsSP = prescriptionService.getAllPrescriptionsByTreatmentIdDateWise(treatmentId, unitId,prescriptionOrderDate);
		obj.setListOPDPrescriptionDtoSP(listPrescriptionsSP);
		
		logger.info("In PrescriptionController : OPDPrescriptionDto onload  for:" + obj);
		return obj;
	}
	
	/******
	 * @author   : Vishant Pawar
	 * @Code     : Method to save IPD priscription Sequence
	 * *****/
	@RequestMapping(value = "/updateIPDPrescriptionSequence", method = RequestMethod.POST)
	@ResponseBody
	public int updateIPDPrescriptionSequence(HttpServletRequest request, @RequestParam("treatmentId") Integer treatmentId
			,@RequestParam("list")String prescriptionIds) {
		int status = prescriptionService.updateIPDPrescriptionSequence(request, treatmentId,prescriptionIds);
		return status;
	}
	
}