package com.hms.ehat.controller;

import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hms.administrator.dto.Test;
import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.doctordesk.dto.OpdDocumentUploadDto;
import com.hms.dto.Doctor;
import com.hms.dto.RadiologyAssisgnTestDTO;
import com.hms.dto.RadiologyDTO;
import com.hms.dto.RadiologyTemplateReportDTO;
import com.hms.dto.RadiologyTestDto;
import com.hms.dto.RisImageUploadDTO;
import com.hms.dto.RisImageUploadDTONew;
import com.hms.dto.TestDTO;
import com.hms.dto.ViewRisRecordsDTO;
import com.hms.ehat.dto.AnswerDR;
import com.hms.ehat.dto.PatientInvestigationsDTO;
import com.hms.ehat.dto.QuestionDR;
import com.hms.ehat.dto.QuestionMaster;
import com.hms.ehat.dto.RisTempateDto;
import com.hms.ehat.dto.TemplateIPDHistory;
import com.hms.ehat.dto.TemplateIPDHistoryDto;
import com.hms.ehat.dto.TemplateIPDHistorySlaveDto;
import com.hms.ehat.service.RadiologyDetailService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value = "/ris")
public class RisController {

	@Autowired
	RadiologyDetailService radiologyDetailService;
	
	@RequestMapping(value = "/getAllRadiologyDetail", method = RequestMethod.POST)
	@ResponseBody
	public RadiologyDTO getAllRadiologyDetail(HttpServletRequest request, @RequestParam("tid") String tId, 
												@RequestParam("type") String type, @RequestParam("flag") String flag,@RequestParam("doctorId") int doctorId) {

		// return radiologyDetailService.getAllRadiologyDetail(request,tId,type,flag);
		
		// changed, aniket:
		
		RadiologyDTO radio = new RadiologyDTO();
		List<RadiologyDTO> radiologyDtoList = new ArrayList<>();
		radio = radiologyDetailService.getAllRadiologyDetail(request,tId,type,flag,doctorId);
		radiologyDtoList = radio.getListRadiologyDTO();
		
		for(RadiologyDTO rd : radiologyDtoList){
			Date d = rd.getAssignDate();
			rd.setAssignedDate(convertDates(d));
		}
		
		RadiologyDTO radiologyDTO = new RadiologyDTO();
		radiologyDTO.setListRadiologyDTO(radiologyDtoList);
		return 	radiologyDTO;

	}
	
	//Added By Annapurna
	@RequestMapping(value = "/getAllFromBegining", method = RequestMethod.POST)
	@ResponseBody
	public RadiologyDTO getAllFromBegining(HttpServletRequest request, @RequestParam("tid") String tId, 
												@RequestParam("type") String type, @RequestParam("flag") String flag) {

		RadiologyDTO radio = new RadiologyDTO();
		List<RadiologyDTO> radiologyDtoList = new ArrayList<>();
		radio = radiologyDetailService.getAllFromBegining(request,tId,type,flag);
		radiologyDtoList = radio.getListRadiologyDTO();
		
		for(RadiologyDTO rd : radiologyDtoList){
			Date d = rd.getAssignDate();
			rd.setAssignedDate(convertDates(d));
		}
		
		RadiologyDTO radiologyDTO = new RadiologyDTO();
		radiologyDTO.setListRadiologyDTO(radiologyDtoList);
		return 	radiologyDTO;

	}
	
	@RequestMapping(value = "/getAllRadiologyDetailByDate", method = RequestMethod.POST)
	@ResponseBody
	public RadiologyDTO getAllRadiologyDetailByDate(HttpServletRequest request,@RequestParam("todays_date") String todays_date,@RequestParam("type") String type,@RequestParam("flag") String flag) {

		// return radiologyDetailService.getAllRadiologyDetailByDate(request,todays_date,type,flag);			
		
		// changed, aniket: 2 SEP 22
		
		RadiologyDTO radio = new RadiologyDTO();
		List<RadiologyDTO> radiologyDtoList = new ArrayList<>();
		radio = radiologyDetailService.getAllRadiologyDetailByDate(request,todays_date,type,flag);	
		radiologyDtoList = radio.getListRadiologyDTO();
		
		for(RadiologyDTO rd : radiologyDtoList){
			Date d = rd.getAssignDate();
			rd.setAssignedDate(convertDates(d));
		}
		
		RadiologyDTO radiologyDTO = new RadiologyDTO();
		radiologyDTO.setListRadiologyDTO(radiologyDtoList);
		return 	radiologyDTO;

	}
	
	@RequestMapping(value = "/searchPatienByName", method = RequestMethod.POST)
	@ResponseBody
	public RadiologyDTO searchPatienByName(HttpServletRequest request,@RequestParam("patName") String patName,@RequestParam("patientId") int patientId,@RequestParam("type") String type,@RequestParam("flag") String flag,@RequestParam("textType") String textType) {

		// return radiologyDetailService.searchPatienByName(request,patName,type,flag,textType);
		
		// changed, aniket: on 02/09/22
		
				RadiologyDTO radio = new RadiologyDTO();
				List<RadiologyDTO> radiologyDtoList = new ArrayList<>();
				radio = radiologyDetailService.searchPatienByName(request,patName,type,flag,textType,patientId);
				radiologyDtoList = radio.getListRadiologyDTO();
				
				for(RadiologyDTO rd : radiologyDtoList){
					Date d = rd.getAssignDate();
					rd.setAssignedDate(convertDates(d));
				}
				
				RadiologyDTO radiologyDTO = new RadiologyDTO();
				radiologyDTO.setListRadiologyDTO(radiologyDtoList);
				return 	radiologyDTO;
	}
	
	@RequestMapping(value = "/searchPatienBetweenDate", method = RequestMethod.POST)
	@ResponseBody
	public RadiologyDTO searchPatienBetweenDate(HttpServletRequest request,@RequestParam("date1") String date1,@RequestParam("date2") String date2,@RequestParam("type") String type,@RequestParam("flag") String flag) {

		// return radiologyDetailService.searchPatienBetweenDate(request,date1,date2,type,flag);
		
		RadiologyDTO radio = new RadiologyDTO();
		List<RadiologyDTO> radiologyDtoList = new ArrayList<>();			//aniket kanse / 10/DEC/2020
		radio = radiologyDetailService.searchPatienBetweenDate(request,date1,date2,type,flag);
		radiologyDtoList = radio.getListRadiologyDTO();
		
		for(RadiologyDTO rd : radiologyDtoList){
			Date d = rd.getAssignDate();
			rd.setAssignedDate(convertDates(d));
		}
		
		RadiologyDTO radiologyDTO = new RadiologyDTO();
		radiologyDTO.setListRadiologyDTO(radiologyDtoList);
		return 	radiologyDTO;
	}
	
	@RequestMapping(value = "/getAllRadiologyDetailByyestrDay", method = RequestMethod.POST)
	@ResponseBody
	public RadiologyDTO getAllRadiologyDetailByyestrDay(HttpServletRequest request,@RequestParam("yestrDay") String yestrDay,@RequestParam("type") String type,@RequestParam("flag") String flag) {

		// return radiologyDetailService.getAllRadiologyDetailByyestrDay(request,yestrDay,type,flag);
		
		RadiologyDTO radio = new RadiologyDTO();
		List<RadiologyDTO> radiologyDtoList = new ArrayList<>();			//aniket kanse / 10/DEC/2020
		radio = radiologyDetailService.getAllRadiologyDetailByyestrDay(request,yestrDay,type,flag);
		radiologyDtoList = radio.getListRadiologyDTO();
		
		for(RadiologyDTO rd : radiologyDtoList){
			Date d = rd.getAssignDate();
			rd.setAssignedDate(convertDates(d));
		}
		
		RadiologyDTO radiologyDTO = new RadiologyDTO();
		radiologyDTO.setListRadiologyDTO(radiologyDtoList);
		return 	radiologyDTO;
	}
	@RequestMapping(value = "/sendToRis", method = RequestMethod.POST)
	@ResponseBody
	public  int sendToRis(HttpServletRequest request,
			@RequestParam("treatmentId") int treatmentId,
			@RequestParam("patientId") int patientId,
			@RequestParam("subList") String subList,
			@RequestParam("invesTestFlag") String invesTestFlag) {
		
	int risRes = radiologyDetailService.sendToRis(request,treatmentId,patientId,subList,invesTestFlag);	
	return 	risRes;

	}
	
	@RequestMapping(value = "/setArrivalTime", method = RequestMethod.POST)
	@ResponseBody
	public String setArrivalTime(HttpServletRequest request,
			@RequestParam("tid") int treatmentId,
			@RequestParam("pid") int patientId,
			@RequestParam("idRadiology") int idRadiology,
			@RequestParam("idMasterRadioAssignTest") int idMasterRadioAssignTest,
			@RequestParam("isSelected") int isSelected) {
		
	int result = radiologyDetailService.setArrivalTime(request,treatmentId,patientId,idRadiology,idMasterRadioAssignTest,isSelected);	
	String response = "";
		if (result == 1) {
			response = "Arrival Time Saved successfully...";
		} else if (result == 2) {
			response = "Arrival Time Updated successfully...";
		} else {
			response = "Oops some problem occured while saving..";
		}
		return response;
	}
	
	@RequestMapping(value = "/setTakenTime", method = RequestMethod.POST)
	@ResponseBody
	public String setTakenTime(HttpServletRequest request,
			@RequestParam("tid") int treatmentId,
			@RequestParam("pid") int patientId,
			@RequestParam("idRadiology") int idRadiology,
			@RequestParam("idMasterRadioAssignTest") int idMasterRadioAssignTest,
			@RequestParam("isSelected") int isSelected) {
		
	int result = radiologyDetailService.setTakenTime(request,treatmentId,patientId,idRadiology,idMasterRadioAssignTest,isSelected);	
	String response = "";
		if (result == 1) {
			response = "TakenTime Time Saved successfully...";
		} else if (result == 2) {
			response = "TakenTime Time Updated successfully...";
		} else {
			response = "Oops some problem occured while saving..";
		}
		return response;
	}
	
	@RequestMapping(value = "/fetchPatientsRecordByTreatmentId", method = RequestMethod.POST)
	@ResponseBody
	public List<TestDTO> fetchPatientsRecordByTreatmentId(HttpServletRequest request,
				@RequestParam("testType") String testType) {

		
		return radiologyDetailService.fetchPatientsRecordByTreatmentId(request,testType);			

	}
	
	@RequestMapping(value = "/fetchradiotest", method = RequestMethod.POST)
	@ResponseBody
	public TestDTO fetchradiotest(HttpServletRequest request,
				@RequestParam("tid") String tId) {
		
		List<TestDTO> ltFindings = new ArrayList<TestDTO>();
		ltFindings=radiologyDetailService.fetchradiotest(request,tId);	
		TestDTO obj=new TestDTO();
		obj.setTestList(ltFindings);
		return obj;

	}
	
	@RequestMapping(value = "/fetchtestrisdetails", method = RequestMethod.POST)
	@ResponseBody
	public List<TestDTO> fetchtestrisdetails(HttpServletRequest request,
				@RequestParam("testID") int testId) {
		return radiologyDetailService.fetchtestrisdetails(request,testId);			

	}
	
	/**
	 * @author Vikas @date 10_March-2018 these methods are used to map request
	 *         with services for Saving Ris Template data 
	 * **/
	
	@RequestMapping(value = "/saveRisTemplate", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateRisTemplates(RisTempateDto risTempateDto,
			HttpServletRequest request) {
		int response = radiologyDetailService.saveOrUpdateRisTemplate(risTempateDto, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Saved Sucessfully";
		} else if (response == 2) {
			msg = "Records Updated Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	
	}
	
	/**
	 * @author Vikas @date 10_March-2018 these methods are used to map request
	 *         with services for Getting  Ris Template data 
	 * **/
	
	@RequestMapping(value = "/getRisTemplateData", method = RequestMethod.GET)
	public @ResponseBody
	RisTempateDto getRisTempDetails(HttpServletRequest request) {
		List<RisTempateDto> ltRisTemplates = new ArrayList<RisTempateDto>();
		ltRisTemplates = radiologyDetailService.getRisTemplateData(request);
		RisTempateDto obj = new RisTempateDto();
		obj.setLstRisTemplate(ltRisTemplates);
		return obj;
	}
	
	/**
	 * @author Sanjay @date 10_March-2018 these methods are used to map request
	 *         with services for Getting  Ris Template data 
	 * **/
	
	@RequestMapping(value = "/getRisTemplateDataforID", method = RequestMethod.GET)
	public @ResponseBody
	RisTempateDto getRisTemplateDataforID(HttpServletRequest request,@RequestParam("templateId") Integer templateId) {
		List<RisTempateDto> ltRisTemplates = new ArrayList<RisTempateDto>();
		ltRisTemplates = radiologyDetailService.getRisTemplateDataforID(request,templateId);
		RisTempateDto obj = new RisTempateDto();
		obj.setLstRisTemplate(ltRisTemplates);
		return obj;
	}
	/**
	 * 
	 * @author 	Sanjay Kr Shah
	 * @purpose save or update TestDetails of Q-indicator
	 * @return
	 */
	@RequestMapping(value = "/savetTestDetails", method = RequestMethod.POST)
	@ResponseBody
	public String setTestDetails(@RequestParam("coRelationVal") String coRelationVal,
			@RequestParam("redoScanVal") String redoScanVal,
			@RequestParam("relatedReactionVal") String relatedReactionVal,
			@RequestParam("errorVal") String errorVal,
			@RequestParam("history") String history,
			@RequestParam("testId") Integer testId,
			@RequestParam("treatId") Integer treatId,
			@RequestParam("patId") Integer patId,
			HttpServletRequest request) {
		
		System.err.println("coRelationVal vikas "+coRelationVal);
		int response = radiologyDetailService.saveOrUpdateTestDetails(coRelationVal,redoScanVal,relatedReactionVal,errorVal,history,testId,treatId,patId,request);
		String msg = "";
		if (response == 1) {
			msg = "Records Saved Sucessfully";
		} else if (response == 2) {
			msg = "Records Updated Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	
	}
	
	@RequestMapping(value = "/getRisTemplateType", method = RequestMethod.POST)
	@ResponseBody
	public Test getRisTemplateTypeData(HttpServletRequest request) {
		
		List<Test> ltRadiologyGroup = new ArrayList<Test>();
		ltRadiologyGroup=radiologyDetailService.getRisTemplateTypes(request);	
		Test obj=new Test();
		obj.setTestList(ltRadiologyGroup);
		return obj;

	}
	
	@RequestMapping(value = "/saveCrtTemplateReport", method = RequestMethod.POST)
	@ResponseBody
	public int saveCrtTemplateReport(RadiologyTemplateReportDTO radiologyTemplateReportDTO,HttpServletRequest request) {
		int response = radiologyDetailService.saveCrtTemplateReport(radiologyTemplateReportDTO,request);
		/*String msg = "";
		if (response == 1) {
			msg = "Records Saved Sucessfully";
		} else if (response == 2) {
			msg = "Records Updated Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}*/
		return response;	
	}
	
	@RequestMapping(value = "/saveUploadedPhotoRis", method = RequestMethod.POST)
	@ResponseBody
	public String saveUploadedPhotoRis(@RequestParam("testid") Integer testid,
	@RequestParam("uploadedphoto") String uploadedphoto,
	@RequestParam("trID") Integer tretId,
	@RequestParam("idRadiologyTest") Integer radiologyTestId,
	@RequestParam("patientId") Integer patientId,
	@RequestParam("documentName") String documentName,
	@RequestParam("comment") String comment,
	HttpServletRequest request) {
		int response = radiologyDetailService.saveUploadedPhotoRis(testid,uploadedphoto,tretId,radiologyTestId,patientId,documentName,comment,request);
		String msg = "";
		if (response == 1) {
			msg = "Ris Image Uploaded Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	
	}
	
	
	// aniket, added JAN 22
	@RequestMapping(value = "/uploadRisDocs", method = RequestMethod.POST)
	public @ResponseBody String uploadRisDocs(RisImageUploadDTONew obj,
			@RequestParam("uploadRISDocs") MultipartFile[] uploadRisDocument, 
			@RequestParam("patientId") Integer patientId,
			@RequestParam("treatmentId")Integer treatmentId,
			HttpServletRequest request){
		
		System.err.println("Upload RIS Docs --> controller :: uploadRisDocument: " + uploadRisDocument);
		
		int response = radiologyDetailService.uploadRisDocs(obj,patientId,treatmentId, uploadRisDocument, request);
		
		String msg="";
		return msg = (response==1) ? "1" : (response==2) ? "2" : "0";
	}
	
	
	@RequestMapping(value = "/fetchTestDetails", method = RequestMethod.POST)
	@ResponseBody
	public RadiologyTestDto fetchTestDetails(HttpServletRequest request,
				@RequestParam("treatId") Integer treatId,
				@RequestParam("testId") Integer testId,
				@RequestParam("patId") Integer patId) {
		
		List<RadiologyTestDto> ltFindings = new ArrayList<RadiologyTestDto>();
		ltFindings=radiologyDetailService.fetchTestDetails(request,treatId,testId,patId);	
		RadiologyTestDto obj=new RadiologyTestDto();
		obj.setLstRadiologyTestDto(ltFindings);
		return obj;
	}
	
	@RequestMapping(value = "/fetchImageTest", method = RequestMethod.POST)
	@ResponseBody
	public RisImageUploadDTO fetchImageTest(HttpServletRequest request,
			@RequestParam("tid") Integer treatId,
			@RequestParam("testID") Integer testId,
			@RequestParam("idRadiologyTest") Integer idRadiologyTest) {
		
		List<RisImageUploadDTO> ltRadisImage = new ArrayList<RisImageUploadDTO>();
		ltRadisImage=radiologyDetailService.fetchImageTest(treatId,testId,idRadiologyTest,request);	
		
		for(RisImageUploadDTO rd : ltRadisImage){
			rd.setStringDate(convertDate(rd.getCreatedDate()));
		}
		
		RisImageUploadDTO obj=new RisImageUploadDTO();
		obj.setLstRisImageUploadDTO(ltRadisImage);
		return obj;

	}
	
	// new method for fetching RIS documents
	@RequestMapping(value = "/fetchRISDocuments", method = RequestMethod.POST)
	@ResponseBody
	public RisImageUploadDTONew fetchRISDocuments(
													@RequestParam("tid") Integer treatmentId,
													@RequestParam("testID") Integer testId,
													@RequestParam("idRadiologyTest") Integer idRadiologyTest,
													HttpServletRequest request) {
		
		System.out.println("In RIS controller fetchRISDocuments()");
		
		RisImageUploadDTONew risImageUploadDTONew = new RisImageUploadDTONew();
		List<RisImageUploadDTONew> list = radiologyDetailService.fetchRISDocuments(testId,treatmentId,idRadiologyTest,request);
		
		for(RisImageUploadDTONew rd : list){
			rd.setStringDate(convertDate(rd.getCreatedDate()));
		}
		
		risImageUploadDTONew.setLstRisImageUploadDTONew(list);
		System.out.println("Reponse----> "+list);
		return risImageUploadDTONew;
	}
	
	@RequestMapping(value = "/viewRISDocuments", method = RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName,
			@RequestParam("idRadiologyTestReport") Integer idRadiologyTestReport, 
			HttpServletResponse response) {
		
		String filePath = FilePath.getRisUploadFilesPath();
		try {

			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".gif")) {
				
				java.io.File file = new java.io.File(filePath + java.io.File.separator + idRadiologyTestReport + java.io.File.separator + fileName);
				ImageInputStream inputStream = ImageIO.createImageInputStream(file);
				java.util.Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(inputStream);
				BufferedImage bufferedImage = ImageIO.read(file);
				java.io.OutputStream out = response.getOutputStream();
				while (imageReaders.hasNext()) {
					ImageReader reader = (ImageReader) imageReaders.next();
					ImageIO.write(bufferedImage, reader.getFormatName(), out);
				}
				out.close();
			} else if (fileName.endsWith(".pdf")) {
				String reportDestination = filePath + java.io.File.separator + idRadiologyTestReport + java.io.File.separator
						+ fileName;
				FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
				org.apache.commons.io.IOUtils.copy(fileInputStream, response.getOutputStream());
				response.setContentType("application/pdf");
				response.setHeader("Content-Disposition", "attachment; filename=" + reportDestination);
				response.flushBuffer();
				System.out.println("reponse viewRISDocuments....." + reportDestination);

			} else {

				String reportDestination = filePath + java.io.File.separator + idRadiologyTestReport + java.io.File.separator
						+ fileName;
				FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
				org.apache.commons.io.IOUtils.copy(fileInputStream, response.getOutputStream());
				System.out.println("reponse viewRISDocuments....." + reportDestination);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/getTestRadilogyReportsData", method = RequestMethod.POST)
	public @ResponseBody
	RadiologyTemplateReportDTO getRadiologyTestDetails(@RequestParam("patientId") Integer patientId,
			@RequestParam("testId") Integer testId,
			@RequestParam("radiologyTestId") Integer radiologyTestId,
			@RequestParam("treatmentId") Integer treatmentId) {
		
		return radiologyDetailService.getRadiologyTestReports(patientId,testId,radiologyTestId,treatmentId);
		/*List<RadiologyTemplateReportDTO> ltRadilogyReports = new ArrayList<RadiologyTemplateReportDTO>();
		ltRadilogyReports = radiologyDetailService.getRadiologyTestReports(patientId,testId,radiologyTestId,treatmentId);
		RadiologyTemplateReportDTO obj = new RadiologyTemplateReportDTO();
		obj.setListRadiologyTempReportDTO(ltRadilogyReports);
		return obj;*/
	}
	
	@RequestMapping(value = "/getTemplateListById", method = RequestMethod.POST)
	public @ResponseBody
	RisTempateDto getTemplateListById(@RequestParam("templateId") Integer templateId) {
		
		List<RisTempateDto> ltRadilogyTemplate = new ArrayList<RisTempateDto>();
		ltRadilogyTemplate = radiologyDetailService.getTemplateListById(templateId);
		RisTempateDto obj = new RisTempateDto();
		obj.setLstRisTemplate(ltRadilogyTemplate);
		return obj;
	}
	
	//Added By Pooja @Date:20 Mar 2018
	@RequestMapping(value = "/getTestRadilogyReportsData1", method = RequestMethod.POST)
	public @ResponseBody
	RadiologyTemplateReportDTO getPatientAllRisTestReport(int treatmentId) {
		
		List<RadiologyTemplateReportDTO> ltRadilogyReports = new ArrayList<RadiologyTemplateReportDTO>();
		ltRadilogyReports = radiologyDetailService.getRisTestReportAll(treatmentId);
		RadiologyTemplateReportDTO obj = new RadiologyTemplateReportDTO();
		obj.setListRadiologyTempReportDTO(ltRadilogyReports);
		return obj;
	}

	@RequestMapping(value = "/getAllRadiologyDetailForCoversheet", method = RequestMethod.POST)
	public @ResponseBody
	RadiologyTemplateReportDTO getRadiologyTestDetails1(@RequestParam("patientId") Integer patientId,
			@RequestParam("treatmentId") Integer treatmentId) {
		
		List<RadiologyTemplateReportDTO> ltRadilogyReports = new ArrayList<RadiologyTemplateReportDTO>();
		ltRadilogyReports = radiologyDetailService.getRadiologyTestReports1(patientId,treatmentId);
		RadiologyTemplateReportDTO obj = new RadiologyTemplateReportDTO();
		obj.setListRadiologyTempReportDTO(ltRadilogyReports);
		return obj;
	}

	@RequestMapping(value = "/risTestgroupBy", method = RequestMethod.POST)
	@ResponseBody
	public TestDTO risTestgroupBy() {
		List<TestDTO> ltFindings = new ArrayList<TestDTO>();
		ltFindings = radiologyDetailService.risTestgroupBy();
		TestDTO obj = new TestDTO();
		obj.setTestList(ltFindings);
		return obj;
	}
	
	@RequestMapping(value = "/searchByGropuName", method = RequestMethod.POST)
	@ResponseBody
	public RadiologyDTO searchByGropuName(HttpServletRequest request,@RequestParam("groupTestName") String groupTestName,@RequestParam("type") String type,@RequestParam("flag") String flag) {
		RadiologyDTO radio = new RadiologyDTO();
		List<RadiologyDTO> radiologyDtoList = new ArrayList<>();
		radio = radiologyDetailService.searchByGropuName(request,groupTestName,type,flag);
		radiologyDtoList = radio.getListRadiologyDTO();
		
		for(RadiologyDTO rd : radiologyDtoList){
			Date d = rd.getAssignDate();
			rd.setAssignedDate(convertDates(d));
		}
		
		RadiologyDTO radiologyDTO = new RadiologyDTO();
		radiologyDTO.setListRadiologyDTO(radiologyDtoList);
		return 	radiologyDTO;
	
	}

@RequestMapping(value = "/autoSuggestionNuclearTest", method = RequestMethod.POST)
	@ResponseBody
	public RadiologyDTO getautoSuggestionNuclearTest(@RequestParam("letter") String letter) {

		RadiologyDTO ltRadiologyDTO = new  RadiologyDTO();
		ltRadiologyDTO= radiologyDetailService.getautoSuggestionNuclearTest(letter);
		return ltRadiologyDTO;
	}

@RequestMapping(value = "/clinicalInstructionNote", method = RequestMethod.POST)
@ResponseBody
public TestDTO getClinicalInstructionNote(HttpServletRequest request,@RequestParam("idRadiologyTest") int idRadiologyTest) {
	
	List<TestDTO> clinicalInstructionNote = new ArrayList<TestDTO>();
	clinicalInstructionNote = radiologyDetailService.getClinicalInstructionNote(request,idRadiologyTest);	
	TestDTO obj=new TestDTO();
	obj.setTestList(clinicalInstructionNote);
	return obj;
}
@RequestMapping(value = "/Saveipdhistorytemp", method = RequestMethod.POST)
public @ResponseBody Map<String, String> Saveipdhistorytemp(HttpServletRequest request) throws ParseException {
	
	
	Map<String, String> result=new HashMap<String, String>();
	
			
	String list[]= request.getParameterValues("listIpdHisCompObj");
	String list1[]= request.getParameterValues("listIpdHisObj");
	TemplateIPDHistory master=new TemplateIPDHistory();
	TemplateIPDHistory salve=new TemplateIPDHistory();
	String str = list[0].substring(0, list[0].length());
	str=str.replaceAll("null","1");
	master = (TemplateIPDHistory) ConfigUIJSONUtility
			.getObjectFromJSON(str,
					TemplateIPDHistory.class);//our dto
	String str1 = list1[0].substring(0, list1[0].length());
	str1=str1.replaceAll("null","1");
	salve = (TemplateIPDHistory) ConfigUIJSONUtility
			.getObjectFromJSON(str1,
					TemplateIPDHistory.class);//our dto
	
	SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
	Date date = new Date();

	
	result=radiologyDetailService.Saveipdhistorytemp(master ,salve, request);
	return result;
	
}
@RequestMapping(value = "/fetchTemplateIPDHistory", method = RequestMethod.POST)
public @ResponseBody TemplateIPDHistory fetchTemplateIPDHistory(@RequestParam("value")  String value,@RequestParam("callform")  String callform,HttpServletRequest request)
{
	List<TemplateIPDHistory> ltfetfetchTemplateIPDHistory = new ArrayList<TemplateIPDHistory>();
	ltfetfetchTemplateIPDHistory = radiologyDetailService.fetchTemplateIPDHistory(callform,value);
	TemplateIPDHistory obj =new TemplateIPDHistory();
    obj.setLtiTemplateIPDHistory(ltfetfetchTemplateIPDHistory);
	return obj;
}
@RequestMapping(value = "/fetchtemplatename", method = RequestMethod.POST)
public @ResponseBody Map<String, String> fetchtemplatename(  @RequestParam("customizeTemplateName")  String  customizeTemplateName,HttpServletRequest request) throws ParseException {
	
	Map<String, String> result=new HashMap<String, String>();
	result =radiologyDetailService.fetchTemplateIPD(customizeTemplateName);
	return result;
	
}

@RequestMapping(value = "/Savequestionmaster", method = RequestMethod.POST)
public @ResponseBody Map<String, String> Savequestionmaster(HttpServletRequest request) throws ParseException {
	
	
	Map<String, String> result=new HashMap<String, String>();
	String list[]= request.getParameterValues("listQuestionMaster");
	String list1[]= request.getParameterValues("listQuestionDR");
//	String list2[]= request.getParameterValues("listAnswer");

	QuestionMaster master=new QuestionMaster();
	QuestionDR question=new QuestionDR();
	AnswerDR salve=new AnswerDR();
	String str = list[0].substring(0, list[0].length());
	str=str.replaceAll("null","1");
	master = (QuestionMaster) ConfigUIJSONUtility
			.getObjectFromJSON(str,
					QuestionMaster.class);//our dto
	
	String str1 = list1[0].substring(0, list1[0].length());
	str1=str1.replaceAll("null","1");
	question = (QuestionDR) ConfigUIJSONUtility
			.getObjectFromJSON(str1,
					QuestionDR.class);//our dto
	
/*	String str2 = list2[0].substring(0, list2[0].length());
	str2=str2.replaceAll("null","1");
	salve = (AnswerDR) ConfigUIJSONUtility
			.getObjectFromJSON(str2,
					AnswerDR.class);*///our dto

    master.setListQuestion(question.getListQuestionDR());
    master.setListAnswerDR(salve.getListAnswerDR());
	SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
	Date date = new Date();

	
	result=radiologyDetailService.Savequestionmaster(master , request);
	return result;
	
}
@RequestMapping(value = "/fetchQuestionMaster", method = RequestMethod.POST)

public @ResponseBody QuestionMaster  fetchQuestionMaster( @RequestParam("callfrom")  String  callfrom,@RequestParam("letter")  String  letter,HttpServletRequest request) throws ParseException {
	QuestionMaster master=new QuestionMaster();
	try {
		
		master=radiologyDetailService.fetchQuestionMaster(callfrom,letter);

		
	} catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
		return null;
	}	
	return master;
}
@RequestMapping(value = "/deletequestionmaster", method = RequestMethod.POST)

public @ResponseBody int  deletequestionmaster( @RequestParam("callfrom")  String  callfrom,@RequestParam("id")  String  id,HttpServletRequest request) throws ParseException {
	int result=0;
	try {
		
	 result=radiologyDetailService.deletequestionmaster(callfrom,id,request);

		
	} catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
		return 0;
	}	
	return result;
}

	
//aniket/20/01/2020
	@RequestMapping(value = "/searchPatientByTest", method = RequestMethod.POST)
	@ResponseBody
	public RadiologyDTO searchPatientByTest(HttpServletRequest request,@RequestParam("testName") String testName,@RequestParam("type") String type,@RequestParam("flag") String flag,@RequestParam("textType") String textType) {
	
		//return radiologyDetailService.searchPatientByTest(request,testName,type,flag,textType);
		
		RadiologyDTO radio = new RadiologyDTO(); 				//aniket kanse / 10/DEC/2020
		List<RadiologyDTO> radiologyDtoList = new ArrayList<>();
		radio = radiologyDetailService.searchPatientByTest(request,testName,type,flag,textType);
		radiologyDtoList = radio.getListRadiologyDTO();
		
		for(RadiologyDTO rd : radiologyDtoList){
			Date d = rd.getAssignDate();
			rd.setAssignedDate(convertDates(d));
		}
		
		RadiologyDTO radiologyDTO = new RadiologyDTO();
		radiologyDTO.setListRadiologyDTO(radiologyDtoList);
		return 	radiologyDTO;
	}
	
	
	/**
	 * @author aniket kanse
	 * @since 28/10/2020
	 */
	@ResponseBody
	@RequestMapping(value="/getAllRadiologistsList", method = RequestMethod.GET)
	public Doctor getAllRadiologistsList(){
		List<Doctor> listDoctors = new ArrayList<Doctor>();
		listDoctors = radiologyDetailService.getAllRadiologistsList();
		Doctor doc = new Doctor();
		doc.setListDoctor(listDoctors);
		return doc;
	}

	/**
	 * @author Aniket Kanse
	 * @since 04/11/2020
	 */
	@ResponseBody
	@RequestMapping(value="/getTakenArrivalDateTime", method = RequestMethod.GET)
	public List<RadiologyAssisgnTestDTO> getTakenArrivalDateTime(@RequestParam("idTestRadiology") Integer idTestRadiology, @RequestParam("idRadiologyTest") Integer idRadiologyTest){

		List<RadiologyAssisgnTestDTO> rdAssignTestList = new ArrayList<RadiologyAssisgnTestDTO>();
		RadiologyAssisgnTestDTO radio = new RadiologyAssisgnTestDTO();
		radio = radiologyDetailService.getTakenArrivalDateTime(idTestRadiology, idRadiologyTest);
		rdAssignTestList.add(radio);
		return rdAssignTestList;
	}
	
	@ResponseBody
	@RequestMapping(value="/saveRisReportRecords", method = RequestMethod.POST)
	public String saveRisReportRecords(ViewRisRecordsDTO viewRisRecordsDTO, HttpServletRequest request){
		
		int status = radiologyDetailService.saveRisReportRecords(viewRisRecordsDTO, request);
		
		return status == 1 ? "Saved sucessfully !"
				: status == 2 ? "Updated succesfully !" : "Error Occurred";
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchRisReportRecordByPatientId", method = RequestMethod.GET)
	public ViewRisRecordsDTO fetchRisReportRecordByPatientId(@RequestParam("idradTestName") Integer idRadiologyTest){
		List<ViewRisRecordsDTO> listRisReportRecords = new ArrayList<>();
		listRisReportRecords = radiologyDetailService.fetchRisReportRecordByPatientId(idRadiologyTest);
		
		for(ViewRisRecordsDTO vr : listRisReportRecords){
			Date cDate = vr.getCreatedDateTime();
			vr.setCreatedDate(convertDate(cDate));
		}
		
		ViewRisRecordsDTO risReport = new ViewRisRecordsDTO();
		risReport.setListViewRisRecordsDTO(listRisReportRecords);
		return risReport;
	}

	public String convertDate(Date cDate) {
		
		String pattern = "dd/MM/yyyy HH:mm:ss";
		DateFormat df = new SimpleDateFormat(pattern);
		String dateAsString = df.format(cDate);

		return dateAsString;
	}
	
	private String convertDates(Date cDate) {
		
		String pattern = "dd/MM/yyyy";
		DateFormat df = new SimpleDateFormat(pattern);
		String dateAsString = df.format(cDate);

		return dateAsString;
	}
	
	/**
	 * @author aniket kanse
	 * @param id
	 * @return 
	 * @since 10/11/2020
	 */
	@ResponseBody
	@RequestMapping(value = "/verifyRisReportRecord", method = RequestMethod.POST)
	public Integer verifyRisReportRecord(@RequestParam("id") Integer id){
		
		Integer response = radiologyDetailService.verifyRisReportRecord(id);
		
		return response;
	}
	
	/**
	 * @author aniket kanse
	 * @param id
	 * @return 
	 * @since 10/11/2020
	 */
	@ResponseBody
	@RequestMapping(value = "/deleteRisReportRecord", method = RequestMethod.POST)
	public Integer deleteRisReportRecord(@RequestParam("id") Integer id){
		
		Integer response = radiologyDetailService.deleteRisReportRecord(id);
		
		return response;
	}
	
	/**
	 * @author aniket kanse
	 * @since 10/11/2020
	 * @param patientId
	 * @param testId
	 * @param radiologyTestId
	 * @param treatmentId
	 * @return
	 */
	@RequestMapping(value = "/getRisReportRecordForPrint", method = RequestMethod.POST)
	public @ResponseBody
	RadiologyTemplateReportDTO getRisReportRecordForPrint(@RequestParam("patientId") Integer patientId,
			@RequestParam("testId") Integer testId,
			@RequestParam("radiologyTestId") Integer radiologyTestId,
			@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("idRadiologyTestReport") Integer idRadiologyTestReport) {
		
		return radiologyDetailService.getRisReportRecordForPrint(patientId,testId,radiologyTestId,treatmentId,idRadiologyTestReport);
		
	}
	
	@RequestMapping(value = "/sendRisReportEmail", method = RequestMethod.POST)
	@ResponseBody
	public String sendRisReportEmail(
			@RequestParam("fromEmailAddress")String fromEmailAddress,
			@RequestParam("idRadiologyTestReport")Integer idRadiologyTestReport,
			@RequestParam("patientsEmailId")String patientsEmailId,
			@RequestParam("emailRISCallFrom")String emailRISCallFrom,
			@RequestParam("pageType") String pageType,
			@RequestParam("testid") Integer testid,
			@RequestParam("patID") Integer patID,
			@RequestParam("treatID") Integer treatID, 
			@RequestParam("radiologyTestId") Integer radiologyTestId,
			@RequestParam("emailTo") String emailTo,
			@RequestParam("emailCC") String emailCC,
			@RequestParam("mailBody") String mailBody,
			@RequestParam("pkViewRisRecordsDTO") String pkViewRisRecordsDTO,
			HttpServletRequest request,HttpServletResponse res){
		
	String msg="";
  RequestDispatcher rd = null;
  
	     rd = request.getRequestDispatcher("/ehat_risReportRecordEmailPrint.jsp?" + "&fromEmailAddress="+ fromEmailAddress + 
	    		 "&idRadiologyTestReport="+ idRadiologyTestReport + "&patientsEmailId="+ patientsEmailId + 
	    		 "&emailRISCallFrom="+ emailRISCallFrom + "&pageType="+pageType +  "&testid="+testid+ "&patID="+ patID+ 
	    		 "&treatID="+treatID+ "&radiologyTestId="+ radiologyTestId+ 
	    		 "&emailTo="+emailTo+ "&emailCC="+ emailCC+ "&mailBody="+mailBody+ "&pkViewRisRecordsDTO="+pkViewRisRecordsDTO);
	    		 
	try {
		rd.forward(request, res);
		
		// changed, aniket kanse, 02 NOV 21
		
//		String risEMailStatus = autoEmailSendService.sendRISEmailToPatient(fromEmailAddress,idRadiologyTestReport, patientsEmailId,
//														emailRISCallFrom, pageType, testid, patID, treatID, radiologyTestId,
//														emailTo, emailCC, mailBody, pkViewRisRecordsDTO);
//		
//		System.err.println("this is RIS email status --> "+risEMailStatus);
		
	} catch (ServletException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	} catch (Exception e) {
		e.printStackTrace();
	}
	
  msg="Email Send  Successfully";	  	  
	return msg;
}	
	
	@RequestMapping(value = "/saveCreatedRISReport", method = RequestMethod.POST)
	@ResponseBody
	public int saveCreatedRISReport(@RequestParam("idRadiologyTestReport") Integer idRadiologyTestReport, RadiologyTemplateReportDTO radiologyTemplateReportDTO, HttpServletRequest request) {
		
		System.err.println("this is RIS save repart : ID --> "+idRadiologyTestReport);
		radiologyTemplateReportDTO.setIdRadiologyTestReport(idRadiologyTestReport);
		int response = radiologyDetailService.saveUpdateCreatedRISReport(radiologyTemplateReportDTO, request);
		
		return response;
		
	}
	
	/**
	 * @author aniket kanse
	 * @param id
	 * @return 
	 * @since 12/11/2020
	 */
	@ResponseBody
	@RequestMapping(value = "/viewRisReportRecord", method = RequestMethod.POST)
	public RadiologyTemplateReportDTO viewRisReportRecord(@RequestParam("idRadiologyTestReport") Integer idRadiologyTestReport){
		
		return radiologyDetailService.viewRisReportRecord(idRadiologyTestReport);
	}
	
	@RequestMapping(value = "/getSingleRISRecord", method = RequestMethod.GET)
	@ResponseBody
	public List<ViewRisRecordsDTO> getSingleRISRecord(@RequestParam("id") Integer id){
		
		List<ViewRisRecordsDTO> risList = new ArrayList<ViewRisRecordsDTO>();
		ViewRisRecordsDTO risRecord = new ViewRisRecordsDTO();
		risRecord = radiologyDetailService.getSingleRISRecord(id);
		risList.add(risRecord);
		
		return risList;
	}
	
	/**
	 * @author aniket kanse
	 * @param id
	 * @return 
	 * @since 26/11/2020
	 */
	@ResponseBody
	@RequestMapping(value = "/deleteRisDocuments", method = RequestMethod.POST)
	public Integer deleteRisDocuments(@RequestParam("idRadiologyTestReport") Integer idRadiologyTestReport){
		
		Integer response = radiologyDetailService.deleteRisDocuments(idRadiologyTestReport);
		
		return response;
	}
	
	/**
	 * @author aniket kanse
	 * @param testReportId
	 * @return 
	 * @since 30/11/2020
	 */
	@ResponseBody
	@RequestMapping(value = "/setPostFlag", method = RequestMethod.POST)
	public Integer setPostFlag(@RequestParam("testReportId") Integer testReportId){
		
		Integer response = radiologyDetailService.setPostFlag(testReportId);
		
		return response;
	}
	
	@RequestMapping(value = "/SaveipdhistorytempNew", method = RequestMethod.POST)
	public @ResponseBody int SaveipdhistorytempNew(TemplateIPDHistoryDto templateIPDHistoryDto,@RequestParam("listIpdHisCompObj") String listIpdHisCompObj, HttpServletRequest request) throws ParseException {
		
		
		Map<String, String> result=new HashMap<String, String>();
		
		int status = 0;

		TemplateIPDHistorySlaveDto templateIPDHistorySlaveDto = (TemplateIPDHistorySlaveDto) ConfigUIJSONUtility
				.getObjectFromJSON(listIpdHisCompObj,
						TemplateIPDHistorySlaveDto.class);
		
		templateIPDHistoryDto.setLtITemplateIPDHistorySlaveDto(templateIPDHistorySlaveDto.getListTemplateIPDHistorySlaveDto());
		status=radiologyDetailService.Saveipdhistorytemp(templateIPDHistoryDto, request);
		return status;
		
	}
	
	
	@RequestMapping(value = "/fetchTemplateIPDHistoryNew", method = RequestMethod.POST)
	public @ResponseBody TemplateIPDHistoryDto fetchTemplateIPDHistoryNew(@RequestParam("value")  String value,@RequestParam("callform")  String callform,HttpServletRequest request)
	{
		List<TemplateIPDHistoryDto> ltfetfetchTemplateIPDHistory = new ArrayList<TemplateIPDHistoryDto>();
		ltfetfetchTemplateIPDHistory = radiologyDetailService.fetchTemplateIPDHistoryNew(callform,value);
		TemplateIPDHistoryDto obj =new TemplateIPDHistoryDto();
		obj.setLtITemplateIPDHistoryDto(ltfetfetchTemplateIPDHistory);
		return obj;
	}

	// aniket 25 JAN 22, NEW METHOD
	@RequestMapping(value = "/fetchRisTemplateTypeList", method = RequestMethod.GET)
    @ResponseBody
	public Test fetchRisTemplateTypeList(HttpServletRequest request) {
		
		List<Test> listTestTypes = new ArrayList<Test>();
		listTestTypes = radiologyDetailService.fetchRisTemplateTypeList(request);
		Test obj = new Test();
		obj.setTestList(listTestTypes);
		
		return obj;
	}
	
	/**
	 * @author aniket kanse
	 * @since 03 DEC 2020
	 * @return
	 */
	@RequestMapping(value = "/fetchInvestigations", method = RequestMethod.POST)
	 @ResponseBody
	 public	 PatientInvestigationsDTO fetchInvestigations(@RequestParam("tID") Integer tID, 
			 											  @RequestParam("patientId") Integer patientId,	
			 											  @RequestParam("callform") String callform,
			 											  @RequestParam("servid") Integer servid,	
			 											  HttpServletRequest request) {
		
		List<PatientInvestigationsDTO> listPatientInvestigations = new ArrayList<PatientInvestigationsDTO>();
		listPatientInvestigations = radiologyDetailService.fetchInvestigations(tID, patientId, callform,servid,request);
		
		for(PatientInvestigationsDTO pd : listPatientInvestigations){
			System.out.println(" RisController  -- coversheet fetchInvestigations-- PatientInvestigationsDTO " + pd);
			System.out.println(" -END- ");
		}
	
		PatientInvestigationsDTO obj = new PatientInvestigationsDTO();
		obj.setListPatientInvestigations(listPatientInvestigations);
		return obj;
	}


}