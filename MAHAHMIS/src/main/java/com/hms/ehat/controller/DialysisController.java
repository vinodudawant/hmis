package com.hms.ehat.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.BloodTransfusionDTO;
import com.hms.ehat.dto.DialysisAdviceDto;
import com.hms.ehat.dto.DialysisDto;
import com.hms.ehat.dto.DialysisSchedulerDto;
import com.hms.ehat.dto.HaeRecordModialtsisDTO;
import com.hms.ehat.dto.HemodialysisCarePlanDto;
import com.hms.ehat.dto.InformedConsentFormDto;
import com.hms.ehat.dto.PostDialysisTableDTO;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.UploadDocumentDialysisDto;
import com.hms.ehat.dto.VirologyVaccinationDTO;
import com.hms.ehat.service.DialysisService;
import com.hms.ipdbill.dto.IpdBillPatientsBedsDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.upload.FilePath;


@Controller
@RequestMapping(value = "/dialysis")
public class DialysisController {
	static Logger log=Logger.getLogger(DialysisController.class.getName());
	
	@Autowired
	DialysisService dialysisService;
	

	// added by Ganesh :16/10/2019 : get dialysis patient
		@RequestMapping(value = "/getDialysisPatient", method = RequestMethod.POST)
		public @ResponseBody IpdQueueDTO getDialysisPatient() {
			log.info("In DialysisController getDialysisPatient()");
			List<IpdQueueDTO> dialysisList = new ArrayList<IpdQueueDTO>();
			dialysisList= dialysisService.getAlldialysisPatient();
			IpdQueueDTO t=new IpdQueueDTO();
			t.setLstIpdQueue(dialysisList);
			log.debug("Reponse----> "+t);
			return t;
		}
		
		
		@RequestMapping(value = "/getIpdBillPatientsWithDialysis", method = RequestMethod.POST)
		public @ResponseBody IpdBillPatientsBedsDTO viewIpdbillPatientsBedsWithDialysis() {
			log.info("In DialysisController viewIpdbillPatientsBedsWithDialysis()");	
			List<IpdBillPatientsBedsDTO> objIpdbill=null;
	        objIpdbill = dialysisService.viewIpdbillPatientsBedsWithDialysis();	
			IpdBillPatientsBedsDTO obj=new IpdBillPatientsBedsDTO();
			obj.setLstIpdbillPatientsBeds(objIpdbill);
			log.debug("Reponse----> "+obj);
			return obj;
		}
		
		// added by ajay :25/09/2019 : save Dialysis Advice
		@RequestMapping(value = "/saveDialysisAdvice", method = RequestMethod.POST)
		@ResponseBody
		public int saveDialysisAdvice(DialysisAdviceDto dialysisdto,HttpServletRequest request) {
			log.info("In DialysisController saveDialysisAdvice()");	
			int treatId = dialysisService.saveDialysisAdvice(dialysisdto, request);
			log.debug("Reponse----> "+treatId);
			return treatId;
		}
		
		@RequestMapping(value = "/getDialysisAdviceList", method = RequestMethod.POST)
		public @ResponseBody DialysisAdviceDto getDialysisAdviceList(@RequestParam("treatmentId") Integer treatmentId) {
			log.info("In DialysisController getDialysisAdviceList()");	
			List<DialysisAdviceDto> dialysisList = new ArrayList<DialysisAdviceDto>();
			dialysisList= dialysisService.getDialysisAdviceList(treatmentId);
			DialysisAdviceDto dialysis=new DialysisAdviceDto();
			dialysis.setListDialysis(dialysisList);
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
	
	// added by Ganesh :24/10/2019 : save preDialysis and postdialysis patient
	@RequestMapping(value = "/saveHaeRecordModialtsis", method = RequestMethod.POST)
	public @ResponseBody String saveHaeRecordModialtsis(@RequestParam("preDialysis") String preDialysis,@RequestParam("postDialysis") String postDialysis,
			HttpServletRequest request) {
		
		log.info("In DialysisController saveHaeRecordModialtsis()");	
		int response = dialysisService.saveHaeRecordModialtsis(preDialysis,postDialysis,request);
		String msg = "";
		
		if (response == 1)
		{
			msg = "Records Saved Sucessfully";
		}
		else if (response == 2)
		{	
			msg = "Records Updated Sucessfully";
		}
		else
		{
			msg = "Oops Some Problem Ocured";
		}
		log.debug("Reponse----> "+msg);
		return msg;
	}
	
	
	// added by Ganesh :24/10/2019 : save onDialysis Table patient
	@RequestMapping(value = "/saveOnDialysisTable", method = RequestMethod.POST)
	public @ResponseBody String saveOnDialysisTable(@RequestParam("tableDialysis") String tableDialysis ,
			HttpServletRequest request) {
		log.info("In DialysisController saveOnDialysisTable()");	
		int response = dialysisService.saveOnDialysisTable(tableDialysis,request);
		String msg = "";
		
		if (response == 1)
		{
			msg = "Records Saved Sucessfully";
		}
		else if (response == 2)
		{	
			msg = "Records Updated Sucessfully";
		}
		else
		{
			msg = "Oops Some Problem Ocured";
		}
		log.debug("Reponse----> "+msg);
		return msg;
	}
	
	
	
	// added by Ganesh :24/10/2019 : get dialysisList of particular patient
	@RequestMapping(value = "/getDialysisListById", method = RequestMethod.POST)
	public @ResponseBody HaeRecordModialtsisDTO getDialysisListById(Integer treatmentId) {
		log.info("In DialysisController getDialysisListById()");
		HaeRecordModialtsisDTO haeRecordModialtsis = dialysisService.getDialysisListById(treatmentId);
		log.debug("Reponse----> "+haeRecordModialtsis);
		return haeRecordModialtsis;
	}
	
	// added by Ganesh : get ondialysisList of particular patient
	@RequestMapping(value = "/getOnDialysisTableListById", method = RequestMethod.POST)
	public @ResponseBody PostDialysisTableDTO getOnDialysisTableListById(Integer treatmentId) {
		log.info("In DialysisController getOnDialysisTableListById()");
		PostDialysisTableDTO postDialysisTableDTO=new PostDialysisTableDTO();
		List<PostDialysisTableDTO> list=dialysisService.getOnDialysisTableListById(treatmentId);
		postDialysisTableDTO.setPostDialysisTableList(list);
		log.debug("Reponse----> "+postDialysisTableDTO);
		return postDialysisTableDTO;
	}
	// added by Ganesh: delete row of on dialysis table List of particular patient
	@RequestMapping(value = "/deleteTableRows", method=RequestMethod.POST)
	public @ResponseBody String deleteTableRows(@RequestParam("idTables")String idTables,HttpServletRequest request){
		log.info("In DialysisController on dialysis deleteTableRows()");
		boolean response =	dialysisService.deleteTableRows(idTables,request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		log.debug("Reponse----> "+msg);
		return msg;
	} 
	
	
	// added by Dnyaneshwar save care paln
	@RequestMapping(value = "/saveHemoDialysisCarePlan", method = RequestMethod.POST)
	@ResponseBody
	public int saveCarePlan(HemodialysisCarePlanDto hemodialysiscareplandto,HttpServletRequest request) {
		log.info("In DialysisController saveCarePlan()");
		int careplanId = dialysisService.saveCarePlan(hemodialysiscareplandto, request);
		log.debug("Reponse----> "+careplanId);
		return careplanId;
	}
	
	// added by Dnyaneshwar save care paln		
	@RequestMapping(value = "/getlistCarePlanDialysis", method = RequestMethod.POST)
	public @ResponseBody HemodialysisCarePlanDto getlistCarePlanDialysis(@RequestParam("treatmentId") Integer careplanId)  																	{
		log.info("In DialysisController getlistCarePlanDialysis()");
		HemodialysisCarePlanDto dialysis=new HemodialysisCarePlanDto();
		
		List<HemodialysisCarePlanDto> careplanList =dialysisService.getListCarePlanDialysis(careplanId);
		
		dialysis.setListCarePlanDialysis(careplanList);
		log.debug("Reponse----> "+dialysis);
		return dialysis;
	}
	
	@RequestMapping(value = "/getBloodTransfusionListById", method = RequestMethod.POST)
	public @ResponseBody BloodTransfusionDTO getBloodTransfusionListById(Integer treatmentId) {
		log.info("In DialysisController getBloodTransfusionListById()");
		BloodTransfusionDTO bloodTransfusionDTO=new BloodTransfusionDTO();
		List<BloodTransfusionDTO> list=dialysisService.getBloodTransfusionListById(treatmentId);
		bloodTransfusionDTO.setListBloodTransfusion(list);
		log.debug("Reponse----> "+bloodTransfusionDTO);
		return bloodTransfusionDTO;
	}
	
	
	@RequestMapping(value = "/getVirologyVaccninationListById", method = RequestMethod.POST)
	public @ResponseBody VirologyVaccinationDTO getVirologyVaccninationListById(Integer treatmentId) {
		log.info("In DialysisController getVirologyVaccninationListById()");
		VirologyVaccinationDTO virologyVaccinationDTO=new VirologyVaccinationDTO();
		List<VirologyVaccinationDTO> list=dialysisService.getVirologyVaccninationListById(treatmentId);
		virologyVaccinationDTO.setListVirologyVaccination(list);
		log.debug("Reponse----> "+virologyVaccinationDTO);
		return virologyVaccinationDTO;
	}
	

	
	// added by Dyanesh :24/10/2019 : save onDialysis Table patient
	@RequestMapping(value = "/saveBloodtransfusionList", method = RequestMethod.POST)
	@ResponseBody
	public String saveBloodtransfusionList(@RequestParam("bloodList") String bloodList ,
			HttpServletRequest request) {
		log.info("In DialysisController saveBloodtransfusionList()");
		int response = dialysisService.saveBloodtransfusionList(bloodList,request);
		
		String msg = "";
		
		if (response == 1)
		{
			msg = "Records Saved Sucessfully";
		}
		else if (response == 2)
		{	
			msg = "Records Updated Sucessfully";
		}
		else
		{
			msg = "Oops Some Problem Ocured";
		}
		log.debug("Reponse----> "+msg);
		return msg;
	}
	

	
	// added by Ganesh :24/10/2019 : save onDialysis Table patient
	@RequestMapping(value = "/savevirologyVaccinationList", method = RequestMethod.POST)
	@ResponseBody
	public String savevirologyVaccinationList(@RequestParam("virologyVaccinationList") String virologyVaccinationList ,
			HttpServletRequest request) {
		log.info("In DialysisController savevirologyVaccinationList()");		
		int response = dialysisService.savevirologyVaccinationList(virologyVaccinationList,request);
		
		String msg = "";
		
		if (response == 1)
		{
			msg = "Records Saved Sucessfully";
		}
		else if (response == 2)
		{	
			msg = "Records Updated Sucessfully";
		}
		else
		{
			msg = "Oops Some Problem Ocured";
		}
		log.debug("Reponse----> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/deleteForBloodTransfution", method=RequestMethod.POST)
	public @ResponseBody String deleteForBloodTransfution(@RequestParam("idTables")String idTables,HttpServletRequest request){
		log.info("In DialysisController deleteForBloodTransfution()");	
		boolean response =	dialysisService.deleteForBloodTransfution(idTables,request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		log.debug("Reponse----> "+msg);
		return msg;
	} 
	
    @RequestMapping(value = "/deleteForVirologyVaccination", method=RequestMethod.POST)
	public @ResponseBody String deleteForVirologyVaccination(@RequestParam("idTables")String idTables,HttpServletRequest request){
    	log.info("In DialysisController deleteForVirologyVaccination()");	
		boolean response =	dialysisService.deleteForVirologyVaccination(idTables,request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		log.debug("Reponse----> "+msg);
		return msg;
	} 
	
	
		
		/************************************************************************************
		 * @author Ajay khandare  @date 25_oct_2019 these methods are used to Save upload documets
		 * @throws IOException 
		 * ***********************************************************************************/
		@RequestMapping(value = "/uploadDocumentOnDialysis", method = RequestMethod.POST)
		@ResponseBody
		public String uploadDocumentOnDialysis(UploadDocumentDialysisDto outDto,
				HttpServletRequest request) throws IOException {
			log.info("In DialysisController uploadDocumentOnDialysis()");	
			
			 java.io.File uploadPath = new java.io.File(FilePath.getDialysispath());
	            if(!uploadPath.exists())
	            uploadPath.mkdirs();
	            
	            String fileName = outDto.getFilePath();
	            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
	            
	            BufferedOutputStream stream = null;
				try {
					stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				}             
	            stream.close();
		
			int response = dialysisService.uploadDocumentOnDialysis(outDto,
					request);
			log.debug("Reponse----> "+response);
			return response == 1 ? "Saved sucessfully"
					: response == 2 ? "Updated succesfully" : "error";

		}
		
		
		
		/************************************************************************************
		 * @author Ajay khandare  @date 25_oct_2019 these methods are used to fetch upload documets
		 * ***********************************************************************************/
		@RequestMapping(value = "/fetchuploadDocument", method = RequestMethod.POST)
		public @ResponseBody
		UploadDocumentDialysisDto fetchuploadDocument(@RequestParam("treatmentId") Integer treatmentId) {
			log.info("In DialysisController fetchuploadDocument()");	
			List<UploadDocumentDialysisDto> ltOutDto = new ArrayList<UploadDocumentDialysisDto>();
			ltOutDto = dialysisService.fetchuploadDocument(treatmentId);
			UploadDocumentDialysisDto obj = new UploadDocumentDialysisDto();
			obj.setListdocumentDialysis(ltOutDto);
			log.debug("Reponse----> "+obj);
			return obj;
		}

		/************************************************************************************
		 * @author Ajay khandare  @date 25_oct_2019 these methods are used to deleted 
		 * ***********************************************************************************/
		@RequestMapping(value = "/deleteuploadDocument", method = RequestMethod.POST)
		public @ResponseBody
		String deleteOutSourceMaster(@RequestParam("upid") Integer upid,HttpServletRequest request) {
			log.info("In DialysisController deleteOutSourceMaster()");	
			boolean response = dialysisService.deleteuploadDocument(upid, request);
			String msg = "";
			if (response == true) {
				msg = "Records Deleted Sucessfully";
			} else {
				msg = "Oops Some Problem Ocured";
			}
			log.debug("Reponse----> "+msg);
			return msg;
		}
		
		/************************************************************************************
		 * @author Ajay khandare  @date 04_11_2019 these methods are used get wardtype of name
		 * ***********************************************************************************/
		@RequestMapping(value = "/getwardtypeName", method = RequestMethod.POST)
		public @ResponseBody DialysisAdviceDto getwardtypeName() {
			log.info("In DialysisController getwardtypeName()");	
			List<DialysisAdviceDto> dialysisList = new ArrayList<DialysisAdviceDto>();
			dialysisList= dialysisService.getwardtypeName();
			DialysisAdviceDto dialysis=new DialysisAdviceDto();
			dialysis.setListDialysis(dialysisList);
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
		
		/************************************************************************************
		 * @author Ajay khandare  @date 04_11_2019 these methods are used get wardtype of name og bed no
		 * ***********************************************************************************/
		@RequestMapping(value = "/getwardtypeNameofBedNo", method = RequestMethod.POST)
		public @ResponseBody IpdBillPatientsBedsDTO getwardtypeNameofBedNo(@RequestParam("wardId") Integer wardId) {
			log.info("In DialysisController getwardtypeNameofBedNo()");	
			List<IpdBillPatientsBedsDTO> dialysisList = new ArrayList<IpdBillPatientsBedsDTO>();
			dialysisList= dialysisService.getwardtypeNameofBedNo(wardId);
			IpdBillPatientsBedsDTO dialysis=new IpdBillPatientsBedsDTO();
			dialysis.setLstIpdbillPatientsBeds(dialysisList);
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
		
		/************************************************************************************
		 * @author Ajay khandare  @date 05_11_2019 these methods are used get patient Name
		 * ***********************************************************************************/
		@RequestMapping(value = "/autoSuggestionPatientNameDialysis", method = RequestMethod.POST)
		public @ResponseBody
		DialysisAdviceDto autoSuggestionPatientNameDialysis(@RequestParam("patiename") String patiename,HttpServletResponse response) {
			log.info("In DialysisController autoSuggestionPatientNameDialysis()");	
			List<DialysisAdviceDto> ltPatient= new ArrayList<DialysisAdviceDto>();

			ltPatient = dialysisService.autoSuggestionPatientNameDialysis(patiename);

			DialysisAdviceDto  objUsersDTO = new DialysisAdviceDto();

	        objUsersDTO.setListDialysis(ltPatient);
	        log.debug("Reponse----> "+objUsersDTO);
			return objUsersDTO;
		}
		
		/************************************************************************************
		 * @author Ajay khandare  @date 05_11_2019 these methods are used get patient Name
		 * ***********************************************************************************/
		@RequestMapping(value = "/saveDialysisScheduler", method = RequestMethod.POST)
		@ResponseBody
		public int saveDialysisScheduler(@RequestParam("schedulerDialysisList") String SchedulerDialysisList, DialysisSchedulerDto dialysisdto,HttpServletRequest request) {
			log.info("In DialysisController saveDialysisScheduler()");	
			DialysisSchedulerDto	 dto=(DialysisSchedulerDto) ConfigUIJSONUtility.getObjectFromJSON(SchedulerDialysisList, DialysisSchedulerDto.class);
			int treatId = dialysisService.saveDialysisScheduler(dto.getListdialysis().get(0),request);
			log.debug("Reponse----> "+treatId);
			return treatId;
		}
		
		/************************************************************************************
		 * @author Ajay khandare  @date 04_11_2019 these methods are used get patient Name List
		 * ***********************************************************************************/
		@RequestMapping(value = "/getPatientNameListAlreadyPresent", method = RequestMethod.POST)
		public @ResponseBody DialysisSchedulerDto getPatientNameListAlreadyPresent(@RequestParam("schedulerDate") String schedulerDate,@RequestParam("wardId") String wardId,@RequestParam("wardBedId") String wardBedId) {
			log.info("In DialysisController getPatientNameListAlreadyPresent()");	
			List<DialysisSchedulerDto> dialysisList = new ArrayList<DialysisSchedulerDto>();
			
			dialysisList= dialysisService.getPatientNameListAlreadyPresent(schedulerDate,wardId,wardBedId);
			
			DialysisSchedulerDto dialysis=new DialysisSchedulerDto();
			dialysis.setListdialysis(dialysisList);
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
		
		
		
		/************************************************************************************
		 * @author Ajay khandare  @date 04_11_2019 these methods are used get patient Name List
		 * ***********************************************************************************/
		@RequestMapping(value = "/getPatientNameListDateWise", method = RequestMethod.POST)
		public @ResponseBody DialysisSchedulerDto getPatientNameListDateWise(@RequestParam("schedulerDate") String schedulerDate) {
			log.info("In DialysisController getPatientNameListDateWise()");	
			List<DialysisSchedulerDto> dialysisList = new ArrayList<DialysisSchedulerDto>();
			
			dialysisList= dialysisService.getPatientNameListDateWise(schedulerDate);
			
			DialysisSchedulerDto dialysis=new DialysisSchedulerDto();
			dialysis.setListdialysis(dialysisList);
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
		
		

		/************************************************************************************
		 * @author Ajay khandare  @date 04_11_2019 these methods are used get patient Name List
		 * ***********************************************************************************/
		@RequestMapping(value = "/getPatientNameListDateAndWardWise", method = RequestMethod.POST)
		public @ResponseBody DialysisSchedulerDto getPatientNameListDateAndWardWise(@RequestParam("schedulerDate") String schedulerDate,@RequestParam("wardId") String wardId) {
			log.info("In DialysisController getPatientNameListDateAndWardWise()");	
			List<DialysisSchedulerDto> dialysisList = new ArrayList<DialysisSchedulerDto>();
			
			dialysisList= dialysisService.getPatientNameListDateAndWardWise(schedulerDate, wardId);
			
			DialysisSchedulerDto dialysis=new DialysisSchedulerDto();
			
			dialysis.setListdialysis(dialysisList);
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
		
		/************************************************************************************
		 * @author Ajay khandare  @date 04_11_2019 these methods are used get patient Name List
		 * ***********************************************************************************/
		@RequestMapping(value = "/getPatientNameListDateAndWardWiseAndChairType", method = RequestMethod.POST)
		public @ResponseBody DialysisSchedulerDto getPatientNameListDateAndWardWiseAndChairType(@RequestParam("schedulerDate") String schedulerDate,@RequestParam("wardId") String wardId,@RequestParam("wardBedId") String wardBedId) {
			log.info("In DialysisController getPatientNameListDateAndWardWiseAndChairType()");	
			List<DialysisSchedulerDto> dialysisList = new ArrayList<DialysisSchedulerDto>();
			
			dialysisList= dialysisService.getPatientNameListDateAndWardAndChairWise(schedulerDate, wardId, wardBedId);
			
			DialysisSchedulerDto dialysis=new DialysisSchedulerDto();	
			dialysis.setListdialysis(dialysisList);
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
		
		

		/************************************************************************************
		 * @author Ajay khandare  @date 09_11_2019 these methods are used get doctor name and id
		 * ***********************************************************************************/
		@RequestMapping(value = "/getdoctorName", method = RequestMethod.POST)
		public @ResponseBody DialysisAdviceDto getdoctorName() {
			log.info("In DialysisController getdoctorName()");	
			List<DialysisAdviceDto> dialysisList = new ArrayList<DialysisAdviceDto>();
			dialysisList= dialysisService.getdoctorName();
			DialysisAdviceDto dialysis=new DialysisAdviceDto();
			dialysis.setListDialysis(dialysisList);
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
		
		/************************************************************************************
		 * @author Ajay khandare  @date 05_11_2019 these methods are used get Test Name
		 * ***********************************************************************************/
		@RequestMapping(value = "/autoSuggestionForTestNameDialysis", method = RequestMethod.POST)
		public @ResponseBody
		AutosugeestionDto autoSuggestionForTestNameDialysis(@RequestParam("testName") String testName,HttpServletResponse response) {
			log.info("In DialysisController autoSuggestionForTestNameDialysis()");	
			List<AutosugeestionDto> ltPatient= new ArrayList<AutosugeestionDto>();

			ltPatient = dialysisService.autoSuggestionForTestNameDialysis(testName);

			AutosugeestionDto  objUsersDTO = new AutosugeestionDto();

	        objUsersDTO.setLstService(ltPatient);
	        log.debug("Reponse----> "+objUsersDTO);
			return objUsersDTO;
		}
		/************************************************************************************
		 * @author Ajay khandare  @date 05_11_2019 these methods are used fetch Patients Record By On Dialysis TreatmentId
		 * ***********************************************************************************/
		@RequestMapping(value = "/fetchPatientsRecordByOnDialysisTreatmentId", method = RequestMethod.POST)
		public @ResponseBody
		RegTreBillDto fetchPatientsRecordByOnDialysisTreatmentId(@RequestParam("treatmentId") Integer treatmentId) {
			log.info("In DialysisController fetchPatientsRecordByOnDialysisTreatmentId()");	
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			ltRegMasterDto = dialysisService.fetchPatientsRecordByOnDialysisTreatmentId(treatmentId);		
			RegTreBillDto obj=new RegTreBillDto();
			obj.setListRegTreBillDto(ltRegMasterDto);
			log.debug("Reponse----> "+obj);
			return obj;
			
		}		
		/************************************************************************************
		 * @author Ajay khandare  @date 05_11_2019 these methods are used get get IpdBill Patients With Dialysis DateWise
		 * ***********************************************************************************/
		@RequestMapping(value = "/getDialysisPatinetDateWise", method = RequestMethod.POST)
		public @ResponseBody IpdBillPatientsBedsDTO getDialysisPatinetDateWise(@RequestParam("fromDate") String fromDate,@RequestParam("lastDate") String lastDate) {
			log.info("In DialysisController getDialysisPatinetDateWise()");		
			List<IpdBillPatientsBedsDTO> objIpdbill=null;
	        objIpdbill = dialysisService.getDialysisPatinetDateWise(fromDate,lastDate);	
			IpdBillPatientsBedsDTO obj=new IpdBillPatientsBedsDTO();
			obj.setLstIpdbillPatientsBeds(objIpdbill);
			log.debug("Reponse----> "+obj);
			return obj;
		}
	
		/************************************************************************************
		 * @author Ajay khandare  @date 18_11_2019 these methods are used save informed consent fromed
		 * ***********************************************************************************/
		@RequestMapping(value = "/saveinformedconsentForm", method = RequestMethod.POST)
		@ResponseBody
		public int saveinformedconsentForm(InformedConsentFormDto fromdto,HttpServletRequest request) {
			log.info("In DialysisController saveinformedconsentForm()");
			int fromId = dialysisService.saveinformedconsentForm(fromdto, request);
			log.debug("Reponse----> "+fromId);
			return fromId;
		}
		/************************************************************************************
		 * @author Ajay khandare  @date 18_11_2019 these methods are used save informed consent fromed
		 * ***********************************************************************************/
		@RequestMapping(value = "/getinformedconsentForm", method = RequestMethod.POST)
		public @ResponseBody InformedConsentFormDto getinformedconsentForm(@RequestParam("treatmentId") Integer treatmentId) {
			log.info("In DialysisController getinformedconsentForm()");
			List<InformedConsentFormDto> dialysisList = new ArrayList<InformedConsentFormDto>();
			dialysisList= dialysisService.getinformedconsentForm(treatmentId);
			InformedConsentFormDto dialysis=new InformedConsentFormDto();
			dialysis.setListinformedform(dialysisList);
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
		
		/************************************************************************************
		 * @author Ajay khandare  @date 19_11_2019 these methods are used get patient name and number
		 * ***********************************************************************************/
		@RequestMapping(value = "/getpatinetName", method = RequestMethod.POST)
		public @ResponseBody IpdBillPatientsBedsDTO getpatinetName(@RequestParam("patientId") Integer patientId) {
			log.info("In DialysisController getpatinetName()");
			List<IpdBillPatientsBedsDTO> dialysisList = new ArrayList<IpdBillPatientsBedsDTO>();
			dialysisList= dialysisService.getpatinetName(patientId);
			IpdBillPatientsBedsDTO dialysis=new IpdBillPatientsBedsDTO();
			dialysis.setLstIpdbillPatientsBeds(dialysisList);
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
		
	  @RequestMapping(value = "/readDailysisimage", method = RequestMethod.GET)
	  @ResponseBody
	  public void readDialysisImagess(@RequestParam("fileName") String fileName,HttpServletResponse response) {
		
		String filePath = FilePath.getMortuaryImagesPath();

		if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")|| fileName.endsWith(".png") || fileName.endsWith(".gif")) {
			
			try {
				java.io.File f = new java.io.File(filePath+ java.io.File.separator + "_" + java.io.File.separator + fileName);
				
				ImageInputStream iis = ImageIO.createImageInputStream(f);
         		java.util.Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(iis);

				BufferedImage bi = ImageIO.read(f);
				java.io.OutputStream out = response.getOutputStream();

				while (imageReaders.hasNext()) {
					ImageReader reader = (ImageReader) imageReaders.next();
					ImageIO.write(bi, reader.getFormatName(), out);
				}
				out.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (fileName.endsWith(".pdf")) {

			try {
				
				String reportDestination = filePath + java.io.File.separator + "_" + java.io.File.separator + fileName;			
				FileInputStream fis = new FileInputStream(new java.io.File(reportDestination));			
				org.apache.commons.io.IOUtils.copy(fis,response.getOutputStream());
				response.setContentType("application/pdf");
				response.setHeader("Content-Disposition","attachment; filename=" + reportDestination);
				response.flushBuffer();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			try {
				String reportDestination = filePath + java.io.File.separator + "_" +java.io.File.separator + fileName;			
				FileInputStream fis = new FileInputStream(new java.io.File(reportDestination));				
				org.apache.commons.io.IOUtils.copy(fis,response.getOutputStream());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	  
	  /************************************************************************************
		 * @author Ajay khandare  @date 17_12_2019 these methods are used get patient Name
		 * ***********************************************************************************/
	  @RequestMapping(value = "/autoSuggestionPatientNameByDialysis", method = RequestMethod.POST)
		public @ResponseBody
		DialysisAdviceDto autoSuggestionPatientNameByDialysis(@RequestParam("patiename") String patiename,HttpServletResponse response) {
			
		  log.info("In DialysisController autoSuggestionPatientNameDialysis()");	
			List<DialysisAdviceDto> ltPatient= new ArrayList<DialysisAdviceDto>();
			ltPatient = dialysisService.autoSuggestionPatientNameByDialysis(patiename);
			DialysisAdviceDto  objUsersDTO = new DialysisAdviceDto();

	        objUsersDTO.setListDialysis(ltPatient);
	        log.debug("Reponse----> "+objUsersDTO);
			return objUsersDTO;
		}
	  
	  
	     /************************************************************************************
		 * @author Ajay khandare  @date 17_12_2019 these methods are used get patient information about previous treatment 
		 * ***********************************************************************************/
		@RequestMapping(value = "/getDialysisPreviousPatienttDetails", method = RequestMethod.POST)
		public @ResponseBody DialysisDto getDialysisPreviousPatienttDetails(@RequestParam("patientId") Integer patientId) {
			
			log.info("In DialysisController getDialysisPreviousPatientDetails()");
			
			List<DialysisDto> dialysisList = new ArrayList<DialysisDto>();
			
			dialysisList= dialysisService.getDialysisPreviousPatienttDetails(patientId);
			
			DialysisDto dialysis=new DialysisDto();	
			dialysis.setDialysislist(dialysisList);
			
			log.debug("Reponse----> "+dialysis);
			return dialysis;
		}
}


