package com.hms.pathology.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.ResourceBundle;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.hibernate.Query;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import javax.transaction.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hms.api.controller.WhatsAppApi;
import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dto.LabGradingsDto;
import com.hms.ehat.dto.LabMicroorganismsDto;
import com.hms.ehat.dto.LabPhlebotomyMaster;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.pathology.dto.FilePathPathology;
import com.hms.pathology.dto.LabTestDTO;
import com.hms.pathology.dto.LabTestGeneralValueDto;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.dto.PathologyTemplateMasterDTO;
import com.hms.pathology.dto.PathologyTemplateRotineValueDTO;
import com.hms.pathology.dto.PathologyTestReasonDto;
import com.hms.pathology.dto.SendToOutSourceDocumentDto;
import com.hms.pathology.service.Phlebotomyservice;
import com.hms.pharmacy.upload.FilePath;
import com.sun.mail.smtp.SMTPTransport;


@Controller
@RequestMapping(value = "/phlebotomy")
public class PhlebotomyController {
	
	static Logger log=Logger.getLogger(PhlebotomyController.class);
	
	@Autowired
	Phlebotomyservice phelbotomyService;
	
	@Autowired
	SessionFactory sessionfactory;
	
	ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");	  
    String CovidReportProfileId = resourceBundle.getObject("CovidReportProfileId").toString();
  	String SARSCOV2ANTIGEN = resourceBundle.getObject("SARSCOV2ANTIGEN").toString();
  	String COVID19RNAAMPLIFICATION = resourceBundle.getObject("COVID19RNAAMPLIFICATION").toString();
  	String REALTIMEHEPATITISCVIRUSHCV = resourceBundle.getObject("REALTIMEHEPATITISCVIRUSHCV").toString();
  	String REALTIMETRUENAT = resourceBundle.getObject("REALTIMETRUENAT").toString();
  	
  	
  	Integer covidReportId=Integer.parseInt(CovidReportProfileId);		
	Integer SARSCOV2ANTIGENID=Integer.parseInt(SARSCOV2ANTIGEN);			
	Integer COVID19RNAAMPLIID = Integer.parseInt(COVID19RNAAMPLIFICATION);
	Integer REALTIMEHEPATITISCVIRUSHCVID = Integer.parseInt(REALTIMEHEPATITISCVIRUSHCV);
	Integer REALTIMETRUENATID = Integer.parseInt(REALTIMETRUENAT);
       
	/********************************************************************
	 * @author Ajay Khandare
	 * @since 03-03-2020
	 * @comment This method is to get list lab test process area test
	 * @param request
	 * @return
	 **********************************************************************/	
	@RequestMapping(value = "/getphlebotomyRecord", method = RequestMethod.POST)
	public @ResponseBody PathologySampleWiseMaster getProcessAreaRecordTab(@RequestParam("patientType") String patientType,@RequestParam("callFrom") String callFrom,@RequestParam("emergencyFlag") String emergencyFlag,HttpServletRequest request) {
		    log.info("getProcessAreaRecordTab()...start");		
		    List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
			String rowCount = phelbotomyService.getPageCount("phelbotomyPageCount", null, emergencyFlag, request);
			listsample = phelbotomyService.getphlebotomyRecord(patientType,callFrom,emergencyFlag,request);
			PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
			obj.setLabSampleWiseMasterDtoList(listsample);
			obj.setRowCount(rowCount);
			log.info("getProcessAreaRecordTab()...end");
			return obj;
	}
	
	/********************************************************************
	 * @author Ajay Khandare
	 * @since 03-03-2020
	 * @comment This method is to get list lab test process area test
	 * @param request
	 * @return
	 **********************************************************************/	
	@RequestMapping(value = "/getPhlebotomyRecordWithSamplyWise", method = RequestMethod.POST)
	public @ResponseBody PathologySampleWiseMaster getPhlebotomyRecordWithSamplyWise(@RequestParam("pId") Integer pId,@RequestParam("tId") Integer tId,HttpServletRequest request) {
		    log.info("getPhlebotomyRecordWithSamplyWise()...start");	
		    List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
			listsample = phelbotomyService.getPhlebotomyRecordWithSamplyWise(pId,tId,request);
			PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
			obj.setLabSampleWiseMasterDtoList(listsample);
			log.info("getPhlebotomyRecordWithSamplyWise()...end");	
			return obj;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @since 03-03-2020
	 * @comment This method is to send test to lab.
	 * @param request
	 * @return
	 **********************************************************************/	
	@RequestMapping(value = "/sendtolab", method = RequestMethod.POST)
	public @ResponseBody Integer sendToLab(PathologySampleWiseMaster master, @RequestParam("subList") String subList,@RequestParam("histoList") String histoList, @RequestParam("registeredAt") String registeredAt, HttpServletRequest request) {
		log.info("sendToLab()...start");
		Date currentDateTime = new Date(new java.util.Date().getTime());
		Integer result = phelbotomyService.sendToLab(master, subList, histoList, registeredAt, request);
		//List<PathologySampleWiseMaster> listsample = phelbotomyService.getBarcodeWiseTestIds(master.getPatientId(), master.getTreatmentId(), currentDateTime, request);
		log.info("sendToLab()...end");
		return result;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @since 03-03-2020
	 * @comment This method is to check test status before send to lab.
	 * @param request
	 * @return
	 **********************************************************************/
	@RequestMapping(value = "/getpathologypredetails", method = RequestMethod.GET)
	public @ResponseBody LabTestDTO getPathologyPreDetails(PathologySampleWiseMaster master, @RequestParam("callfrom") String callFrom,HttpServletRequest request) {
		log.info("getPathologyPreDetails()...start");
		LabTestDTO dto = phelbotomyService.getPathologyPreDetails(master, callFrom,request);
		log.info("getPathologyPreDetails()...end");
			return dto;
	}
	
	/**************************************************************************
	  * @author Ajay Khandare
	  * @since 05-03-2020
	  * @comment This method is to Collection Test record
	 ****************************************************************************/
	 @RequestMapping(value = "/collectionRecord", method = RequestMethod.POST)
	 public @ResponseBody String collectionRecord(@RequestParam("id")String idList,@RequestParam("callform")String callform,@RequestParam("meesha")String meesha,@RequestParam("collectionTime")String collectionTime,@RequestParam("sampleCollectedAt")String sampleCollectedAt,HttpServletRequest request){
		        log.info("collectionRecord()...start");
		        boolean response=phelbotomyService.collectionRecord(idList,callform,request,meesha,collectionTime,sampleCollectedAt);
	  			String msg="";
	  			if(response==true){
	  				msg="Collection Successfully";
	  			}
	  		    log.info("collectionRecord()...end");
	    		return msg;
	    	}	
	  	
	  	
	 /**************************************************************************
      * @author Ajay Khandare
	  * @since 05-03-2020
	  * @comment This method is to Hold Test record
	 ****************************************************************************/
	@RequestMapping(value = "/patientTestHold", method = RequestMethod.POST)
	public @ResponseBody String patientTestHold(@RequestParam("id") String id,@RequestParam("phlebotype") String phlebotype,HttpServletRequest request){
		        log.info("patientTestHold()...start");
		        boolean response=phelbotomyService.patientTestHold(id,phlebotype,request);
		  		String msg="";
		  		if(response==true){
		  				msg="Hold Successfully";
		  		}
		  		log.info("patientTestHold()...end");
		    return msg;
		  }	
		  	
	  	
	 /********************************************************************
	  * @author Ajay Khandare
	  * @since 03-03-2020
	  * @comment This method is to get list lab test process area test
	  * @param request
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/getAccessionRecord", method = RequestMethod.POST)
	public @ResponseBody PathologySampleWiseMaster getAccessionRecord(@RequestParam("callfrom") String callfrom,@RequestParam("emergencyFlag") String emergencyFlag,HttpServletRequest request) {
	List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
	            log.info("getAccessionRecord()...start");
	            String pageCountCallFrom = "";
				if(callfrom.equalsIgnoreCase("All")) {
					pageCountCallFrom = "accessionPageCount";
				}else if(callfrom.equalsIgnoreCase("AP")){
					pageCountCallFrom = "accessionPendingPageCount";
				}else if(callfrom.equalsIgnoreCase("AC")) {
					pageCountCallFrom = "collectionPendingPageCount";
				}else if(callfrom.equalsIgnoreCase("AD")){
					pageCountCallFrom = "accessionDonePageCount";
				}else if(callfrom.equalsIgnoreCase("AR")){
					pageCountCallFrom = "rejectedSamplePageCount";
				}else if(callfrom.equalsIgnoreCase("AA")){
					pageCountCallFrom = "authorizationPageCount";
				}else if(callfrom.equalsIgnoreCase("AAP")){
					pageCountCallFrom = "reportingPageCount";
				}else if(callfrom.equalsIgnoreCase("AO")){
					pageCountCallFrom = "outSourcePageCount";
				}else if(callfrom.equalsIgnoreCase("AAprocessing")){
					pageCountCallFrom = "accessionPathologiestPageCount";
				}
				String rowCount = phelbotomyService.getPageCount(pageCountCallFrom, null, emergencyFlag, request);
				
				listsample = phelbotomyService.getAccessionRecord(callfrom,emergencyFlag, request);
				PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setLabSampleWiseMasterDtoList(listsample);
				obj.setRowCount(rowCount);
				log.info("getAccessionRecord()...end");
				return obj;
		}	
		
		
		/********************************************************************
		 * @author Ajay Khandare
		 * @since 03-03-2020
		 * @comment This method is to get list lab test process area test
		 * @param request
		 * @return
		 **********************************************************************/	
		@RequestMapping(value = "/getProfileAndTestRecord", method = RequestMethod.POST)
		public @ResponseBody PathologySampleWiseMaster getProfileAndTestRecord(@RequestParam("Id") String id,@RequestParam("outlabId") String outlabId,
				HttpServletRequest request) {
			    log.info("getProfileAndTestRecord()...start");
				List<PathologySampleWiseMaster> listunit=new ArrayList<>();
				listunit = phelbotomyService.getProfileAndTestRecord(id,outlabId,request);
				PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setProLi(listunit);
				log.info("getProfileAndTestRecord()...end");
			    return obj;
		}
		
		@RequestMapping(value = "/getCountOfTabs", method = RequestMethod.POST)
		public @ResponseBody String getCountOfTabs(HttpServletRequest request) {
			 log.info("getCountOfTabs()...start");
			String count= phelbotomyService.getCountOfTabs(request);
			 log.info("getCountOfTabs()...end");
				return count;
		}

	  	
		/**************************************************************************
		  * @author Ajay Khandare
		  * @since 05-03-2020
		  * @comment This method is to Reject Test record
		  * @param request
		  * @return
		 ****************************************************************************/
		 @RequestMapping(value = "/rejectedInprofiletest", method = RequestMethod.POST)
		 public @ResponseBody String rejectedInprofiletest(@RequestParam("masterid")Integer masterid,@RequestParam("profileid")Integer profileid,@RequestParam("testid")Integer testid,@RequestParam("testflag")String testflag,@RequestParam("rejectedResion") Integer rejectedResion,@RequestParam("callfrom") String  callfrom,HttpServletRequest request){
			 log.info("rejectedInprofiletest()...start");		
			 boolean response=phelbotomyService.rejectedInprofiletest(masterid,profileid,testid,testflag,rejectedResion,callfrom,request);
		  			String msg="";
		  			if(response==true){
		  				msg="Collection Successfully";
		  			}
		      log.info("rejectedInprofiletest()...end");		
		    		return msg;
		   }	
		  	
		/**************************************************************************
		 * @author Ajay Khandare
		 * @since 05-03-2020
		 * @comment This method is to Collection Test record
	     * @param request
		 * @return
		****************************************************************************/
		@RequestMapping(value = "/AccessionpatientTestRejectAndAcccepted", method = RequestMethod.POST)
		public @ResponseBody String AccessionpatientTestReject(@RequestParam("id")String idList,@RequestParam("remarks") String remarks,@RequestParam("callfrom") String callfrom,HttpServletRequest request){
		log.info("AccessionpatientTestReject()...start");	
		boolean response=phelbotomyService.AccessionpatientTestReject(idList,remarks,callfrom,request);
		String msg="";
	    if(response==true)
	    {
		   msg="ReCollection Successfully";
	    }
	    log.info("AccessionpatientTestReject()...end");		
	     return msg;
	    }	
	
	/*************************************************************************
	  * @author Ajay Khandare
	  * @since 12-02-2020
      * @comment This method is to get list lab test Result in Routine Area
	  * @param request
	  * @return
     *************************************************************************/	
	 @RequestMapping(value = "/getRoutinevalueResutl", method = RequestMethod.POST)
	 public @ResponseBody PathologySampleWiseMaster getRoutinevalueResutl(String masterid, Integer treatmentid, String patientType,HttpServletRequest request) {	  
		    log.info("getRoutinevalueResutl()...start");	 
		    List<PathologySampleWiseMaster> listunit=new ArrayList<>();
			listunit = phelbotomyService.getRoutinevalueResutl(masterid,treatmentid,patientType,request);
			PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
			obj.setProLi(listunit);
		    log.info("getRoutinevalueResutl()...end");	
		    return obj;
	}
	 
	 /*************************************************************************
	  * @author KishoR LokhandE
	  * @since 08-03-2020
      * @comment This method is use to save save Prerequisite In Treatment Table
	  * @param request
	  * @return
     *************************************************************************/	 
	 @RequestMapping(value = "/savePrerequisiteInTreatment", method = RequestMethod.POST)
	 public @ResponseBody Integer savePrerequisiteInTreatment( 
				 @RequestParam("hieghtPupUp") String hieghtPupUp,
				 @RequestParam("weightPupUp") String weightPupUp,
				 @RequestParam("urineValumePupUp") String urineValumePupUp,
				 @RequestParam("lmpDatePupUp") String lmpDatePupUp,
				 @RequestParam("tId") Integer tId,
			@RequestParam("pId") Integer pId) {
		 
		log.info("savePrerequisiteInTreatment..");

		Integer result = phelbotomyService.savePrerequisiteInTreatment(hieghtPupUp, weightPupUp, urineValumePupUp,lmpDatePupUp, tId,
				pId);

		log.debug("save Prerequisite In Treatment....." + result);
		return result;
	}	 
	 
	 /*************************************************************************
	  * @author KishoR LokhandE
	  * @since 10-03-2020
      * @comment This method is use to Fetch sample wise barcode
     *************************************************************************/		 
	 @RequestMapping(value = "/getBarcodeIdFromSampleWise", method = RequestMethod.GET)
		public @ResponseBody String getBarcodeIdFromSampleWise( 
				 @RequestParam("patientId") Integer patientId,
				 @RequestParam("treatmentId") Integer treatmentId,
				 @RequestParam("sampleTypeId") Integer sampleTypeId,
				 @RequestParam("inOutHouse") Integer inOutHouse,
				 HttpServletRequest request
				 ) {
		 
		log.info("getBarcodeIdFromSampleWise..");

		String result = phelbotomyService.getBarcodeIdFromSampleWise(patientId, treatmentId, sampleTypeId,inOutHouse, request);

		log.debug("get BarcodeId From Sample Wise....." + result);
		return result;
	}
	 
	  /*****************************************************************************************************
	   * @author  Ajay Khandare
	   * @since 11-03-2020
	   * @comment This method is to get list pathologist
	   * @param request
	   * @return
	   ****************************************************************************************************/
	  @RequestMapping(value = "/getpathologistname", method = RequestMethod.POST)
	  public @ResponseBody LabPhlebotomyMaster getpathologistname(HttpServletRequest request) {
		    log.info("getpathologistname()...start");	
		    List<LabPhlebotomyMaster> listsample=new ArrayList<LabPhlebotomyMaster>();
	    	listsample = phelbotomyService.getpathologistname(request);
	    	LabPhlebotomyMaster obj =new LabPhlebotomyMaster();
	    	obj.setPhlebotomytableList(listsample);
	    	 log.info("getpathologistname()...end");	
	    	return obj;
	   }
	  /*************************************************************************
	   * @author Ajay Khandare
	   * @since 11-03-2020
	   * @comment This method is to save Lab test Routine Value 
	   * @param request
       * @return
	  *************************************************************************/	
	  @RequestMapping(value = "/saveLabTestRoutineValueResult", method = RequestMethod.POST)
	  public @ResponseBody boolean saveLabTestRoutineValueResult(@RequestParam("id")String id,@RequestParam("statusFlag")String statusFlag,@RequestParam("idPathologist")Integer idPathologist,@RequestParam("kitSpecId")String kitSpecId, @RequestParam("machineId")Integer machineId, @RequestParam("SerialNo")String SerialNo,@RequestParam("phlebotomyListTestsalve") String phlebotomyListTestsalve,@RequestParam("pIdReporting") Integer pIdReporting,@RequestParam("profileIdcomments") String profileIdcomments, @RequestParam("phlebotomysamplemastertable") String phlebotomysamplemastertable,HttpServletRequest request,HttpServletResponse res) {
		  log.info("saveLabTestRoutineValueResult()...start");
		     boolean response=
		      phelbotomyService.saveLabTestRoutineValueResult(id,statusFlag,idPathologist,kitSpecId,machineId,SerialNo,phlebotomyListTestsalve,profileIdcomments,request,res,phlebotomysamplemastertable);
    	
				/*if(statusFlag.equals("AAP")){
					List<PathologySampleWiseMaster> listemailFlied=new ArrayList<PathologySampleWiseMaster>();
				    	
			    	    listemailFlied = phelbotomyService.getemailFileds(id, request);
			    	    
			    	    StringBuffer treatmentId = new StringBuffer();
			    	    StringBuffer masterId = new StringBuffer();
			    	    StringBuffer emailId = new StringBuffer();
			    	    StringBuffer patientType = new StringBuffer();
			    	    StringBuffer patientName = new StringBuffer();
			    	    StringBuffer patientId = new StringBuffer();
			    	 
			    	    int count = 0;
						for(PathologySampleWiseMaster pathologySampleWiseMaster : listemailFlied) {
			    		   if(count == 0){
			    			    treatmentId.append(pathologySampleWiseMaster.getTreatmentId());
			    			    masterId.append(pathologySampleWiseMaster.getMasterId());
			    			    emailId.append(pathologySampleWiseMaster.getEmailId());
								patientType.append(pathologySampleWiseMaster.getGender());
								patientName.append(pathologySampleWiseMaster.getPatientname());
								patientId.append(pathologySampleWiseMaster.getPatientId());
			    		   }else{
			    			    treatmentId.append(","+pathologySampleWiseMaster.getTreatmentId());
			    			    masterId.append("-"+pathologySampleWiseMaster.getMasterId());
			    			    emailId.append(","+pathologySampleWiseMaster.getEmailId());
								patientType.append(","+pathologySampleWiseMaster.getGender());
								patientName.append(","+pathologySampleWiseMaster.getPatientname());
								patientId.append(","+pathologySampleWiseMaster.getPatientId());
			    		   }
			    		   count++;
			    	  }
				if(covidReportId.equals(pIdReporting) ||SARSCOV2ANTIGENID.equals(pIdReporting) || COVID19RNAAMPLIID.equals(pIdReporting) || REALTIMEHEPATITISCVIRUSHCVID.equals(pIdReporting) || REALTIMETRUENATID.equals(pIdReporting) ||
				   covidReportId==pIdReporting || SARSCOV2ANTIGENID== pIdReporting || COVID19RNAAMPLIID == pIdReporting || REALTIMEHEPATITISCVIRUSHCVID == pIdReporting || REALTIMETRUENATID == pIdReporting){ 		    
					RequestDispatcher rd = null;
					//rd = request.getRequestDispatcher("/pathology_routinevalueResultGenratedbyPost.jsp?" + "&treatmentId="
						//+ treatmentId + "&masterIdd=" + masterId + "&gender=" + patientType + "&emailTo=" + emailId
						//+ "&patientName=" + patientName+"&patientId=" + patientId);
					//rd = request.getRequestDispatcher("/pathology_routinevalueResultGenratedbyPost.jsp?" + "&treatmentId="
					//		+ treatmentId + "&masterIdd=" + masterId + "&gender=" + patientType + "&patientName=" + patientName+"&mobileAuth=" + 0);
					rd = request.getRequestDispatcher("/pathology_patientwise_report_meesha_by_post.jsp?" + "&treatmentId="
							+ treatmentId+ "&masterIdd=" +masterId + "&gender=" +  patientType+ "&patientName=" +patientName);
					
					try {
						rd.forward(request, res);
					} catch (ServletException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}else {
					RequestDispatcher rd = null;
					//rd = request.getRequestDispatcher("/pathology_routinevalueResultGenratedbyPost_Lab.jsp?" + "&treatmentId="
					//	+ treatmentId + "&masterIdd=" + masterId + "&gender=" + patientType + "&emailTo=" + emailId
					//	+ "&patientName=" + patientName+"&patientId=" + patientId);
					rd = request.getRequestDispatcher("/pathology_patientwise_report_meesha_by_post.jsp?" + "&treatmentId="
							+ treatmentId+ "&masterIdd=" +masterId + "&gender=" +  patientType+ "&patientName=" +patientName);

					try {
						HttpSession session = request.getSession();
						Integer unitId = (Integer) session.getAttribute("uId");
						rd.forward(request, res);
					}  catch (Exception e) {
						e.printStackTrace();
					}
			}
		}*/
			
		      
	   log.info("saveLabTestRoutineValueResult()...end");
		return response;
	}
	    
	    
	  /**************************************************************************
	   * @author Ajay Khandare
	   * @since 05-03-2020
	   * @comment This method is to change Status Of Test record
	   * @param request
	   * @return
	  ****************************************************************************/
	  @RequestMapping(value = "/changeStatusOfTest", method = RequestMethod.POST)
	  public @ResponseBody String changeStatusOfTest(@RequestParam("masterIdd")String idList,@RequestParam("statusFlag") String statusFlag,HttpServletRequest request){
		log.info("changeStatusOfTest()...start");
		boolean response=phelbotomyService.changeStatusOfTest(idList,statusFlag,request);
		String msg = "";
		if (response == true) {
			msg = "Back To Accession Successfully";
		}
		log.info("changeStatusOfTest()...end");
		return msg;
	   }	  
	    
	    /**************************************************************************
		   * @author Kishor Lokhande
		   * @since 09-06-2020
		   * @comment This method is used to Get count of Normal, AbNormal, Critically AbNormal in Authorized Patient records.
		   * @param request
		   * @return
		  ****************************************************************************/
		    @RequestMapping(value = "/getRecordCountForAuthorizeTabIndicator", method = RequestMethod.GET)
			public @ResponseBody String getRecordCountForAuthorizeTabIndicator(@RequestParam("statusCode") Integer statusCode, @RequestParam("txtFdate") String txtFdate,
																				@RequestParam("txtTdate") String txtTdate, HttpServletRequest request) {
		    	log.info("getRecordCountForAuthorizeTabIndicator()...start");
				String count = phelbotomyService.getRecordCountForAuthorizeTabIndicator(statusCode, txtFdate, txtTdate, request);
				log.info("getRecordCountForAuthorizeTabIndicator()...end");
				return count;
			}
	    
	    /**************************************************************************
	     * @author Ajay Khandare
	     * @since 12-03-2020
	  	 * @comment This method used to email sending functionality with header and without header print in lab test result
	     * @param request
	  	 * @return
	  	****************************************************************************/
	  	@RequestMapping(value = "/emailSendingPatinetTest", method = RequestMethod.POST)
	  	public @ResponseBody String emailSendingPatinetTest(@RequestParam("treatmentId")Integer treatmentId,@RequestParam("masterIdd") String masterIdd,@RequestParam("gender") String gender,@RequestParam("emailTo") String emailTo,@RequestParam("emailCC") String emailCC,@RequestParam("massageId") String massageId,@RequestParam("printtype") String printtype,@RequestParam("patientName") String patientName,@RequestParam("reportingPid") Integer reportingPid,HttpServletRequest request,HttpServletResponse res){
	  	String msg="";
	    RequestDispatcher rd=null;
	    log.info("emailSendingPatinetTest()...start");	 
	    
	    if(covidReportId.equals(reportingPid) ||SARSCOV2ANTIGENID.equals(reportingPid) || COVID19RNAAMPLIID.equals(reportingPid) || REALTIMEHEPATITISCVIRUSHCVID.equals(reportingPid) || REALTIMETRUENATID.equals(reportingPid) ||
				   covidReportId==reportingPid || SARSCOV2ANTIGENID== reportingPid || COVID19RNAAMPLIID == reportingPid || REALTIMEHEPATITISCVIRUSHCVID == reportingPid || REALTIMETRUENATID == reportingPid){
	    
	    	if(printtype.equals("withheader"))
		  	{
		  		rd = request.getRequestDispatcher("/pathology_routinevalueResultEmailWithheader.jsp?" + "&treatmentId="+ treatmentId + "&masterIdd="+masterIdd + "&gender="+gender+ "&emailTo="+ emailTo+ "&emailCC="+ emailCC + "&massageId="+ massageId+ "&patientName="+ patientName); 
		  	}else if(printtype.equals("withoutheader"))
		  	{
		  		rd = request.getRequestDispatcher("/pathology_routinevalueResultEmailWithOutheader.jsp?" + "&treatmentId="+ treatmentId + "&masterIdd="+masterIdd + "&gender="+gender+ "&emailTo="+ emailTo+ "&emailCC="+ emailCC + "&massageId="+ massageId +"&patientName="+ patientName); 
		  	}
		}else
		{
			if(printtype.equals("withheader"))
		  	{
		  		rd = request.getRequestDispatcher("/pathology_routinevalueResultEmailWithheader_Lab.jsp?" + "&treatmentId="+ treatmentId + "&masterIdd="+masterIdd + "&gender="+gender+ "&emailTo="+ emailTo+ "&emailCC="+ emailCC + "&massageId="+ massageId+ "&patientName="+ patientName); 
		  	}else if(printtype.equals("withoutheader"))
		  	{
		  		rd = request.getRequestDispatcher("/pathology_routinevalueResultEmailWithOutheader_Lab.jsp?" + "&treatmentId="+ treatmentId + "&masterIdd="+masterIdd + "&gender="+gender+ "&emailTo="+ emailTo+ "&emailCC="+ emailCC + "&massageId="+ massageId +"&patientName="+ patientName); 
		  	}
		}	
	    
	    
	  	try {
			rd.forward(request, res);
		} catch (ServletException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	    msg="Email Send  Successfully";	  	
	    log.info("emailSendingPatinetTest()...end");
	  	return msg;
	  }
	 
	    /*****************************************************************************************************
	     * @author  Ajay Khandare
	     * @since 24-03-2020
	     * @comment This method is to get list pathologist
	     * @param request* @return
	     ****************************************************************************************************/
	    @RequestMapping(value = "/getdepartmentname", method = RequestMethod.POST)
	    public @ResponseBody
	    PathologySampleWiseMaster getdepartmentname(HttpServletRequest request) {
	    	log.info("getdepartmentname()...start");	    
	    	List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
	    	listsample = phelbotomyService.getdepartmentname(request);
	    	PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
	    	obj.setLabSampleWiseMasterDtoList(listsample);
	    	log.info("getdepartmentname()...end");	    
	    	return obj;
	    }  	
	  	
	    /*************************************************************************
		  * @author Ajay Khandare
		  * @since 26-02-2020
	      * @comment This method is to get list lab test Result in Routine Area
		  * @param request
		  * @return
	     *************************************************************************/	
		 @RequestMapping(value = "/getdepartmentWiseWorkList", method = RequestMethod.POST)
		 public @ResponseBody PathologySampleWiseMaster getdepartmentWiseWorkList(Integer Iddepartment,HttpServletRequest request) {	  
			     log.info("getdepartmentWiseWorkList()...start");	
			    List<PathologySampleWiseMaster> listunit=new ArrayList<>();
				listunit = phelbotomyService.getdepartmentWiseWorkList(Iddepartment,request);
				PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setLabSampleWiseMasterDtoList(listunit);
				 log.info("getdepartmentWiseWorkList()...end");	
			    return obj;
		}  
		 
		 /*************************************************************************
		  * @author Ajay Khandare
		  * @since 26-02-2020
	      * @comment This method is to get list lab test Result in Routine Area
		  * @param request
		  * @return
	     *************************************************************************/	
		 @RequestMapping(value = "/getTreatmentIdList", method = RequestMethod.POST)
		 public @ResponseBody PathologySampleWiseMaster getTreatmentIdList(Integer patientId,HttpServletRequest request) {	  
			    log.info("getTreatmentIdList()...start");	
			    List<PathologySampleWiseMaster> listunit=new ArrayList<>();
				listunit = phelbotomyService.getTreatmentIdList(patientId,request);
				PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setLabSampleWiseMasterDtoList(listunit);
				log.info("getTreatmentIdList()...end");	
			    return obj;
		}   
		 
		/*************************************************************************
		 * @author Ajay Khandare
		 * @since 26-02-2020
	     * @comment This method is to get list lab test Result in Routine Area
	    *************************************************************************/	
		 @RequestMapping(value = "/getTreatmentIdwiseRoutineValueResult", method = RequestMethod.POST)
		 public @ResponseBody PathologySampleWiseMaster getTreatmentIdwiseRoutineValueResult(Integer tId,HttpServletRequest request) {	  
			    log.info("getTreatmentIdwiseRoutineValueResult()...start");	
			    List<PathologySampleWiseMaster> listunit=new ArrayList<>();
				listunit = phelbotomyService.getTreatmentIdwiseRoutineValueResult(tId,request);
				PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setProLi(listunit);
				log.info("getTreatmentIdwiseRoutineValueResult()...end");	
			    return obj;
		}   
		 
	   /*************************************************************************
		* @author Ajay Khandare
		* @since 26-02-2020
		* @comment This method is to get list get All Recollection Request BToB And BToC
	    *************************************************************************/	
		@RequestMapping(value = "/getAllRecollectionRequestBToBAndBToC", method = RequestMethod.POST)
		public @ResponseBody PathologySampleWiseMaster getAllRecollectionRequestBToB(@RequestParam("callfrom") String callfrom, String emergencyFlag, HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("getAllRecollectionRequestBToB()...start");	
		String pageCountCallFrom = "";
		if (callfrom.equalsIgnoreCase("AllBToB")) {
			pageCountCallFrom = "allRecordBToB";
		} else if (callfrom.equalsIgnoreCase("ARBToB")) {
			pageCountCallFrom = "rejectrecordBToB";
		} else if (callfrom.equalsIgnoreCase("PRBToB")) {
			pageCountCallFrom = "pathologyrecollectionBToB";
		} else if (callfrom.equalsIgnoreCase("allBToC")) {
			pageCountCallFrom = "allRecordBToC";
		} else if (callfrom.equalsIgnoreCase("PRBToC")) {
			pageCountCallFrom = "rejectrecordBToC";
		} else if (callfrom.equalsIgnoreCase("ARBToC")) {
			pageCountCallFrom = "pathologyrecollectionBToC";
		}
		String rowCount = phelbotomyService.getPageCountRecollection(pageCountCallFrom, null, emergencyFlag, request);
		listsample = phelbotomyService.getAllRecollectionRequestBToBAndBToC(
				callfrom, emergencyFlag, request);
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		obj.setRowCount(rowCount);
		log.info("getAllRecollectionRequestBToB()...end");	
		return obj;
			}	
		
	  /*************************************************************************
	   * @author Ajay Khandare
	   * @since 12-02-2020
	   * @comment This method is to get test View RecollectionRequest
	  *************************************************************************/	
	  @RequestMapping(value = "/gettestViewRecollectionRequest", method = RequestMethod.POST)
	  public @ResponseBody PathologySampleWiseMaster gettestViewRecollectionRequest(String masterid, Integer treatmentid, String patientType,String recollectionType,String tabType,HttpServletRequest request) {	  
		log.info("gettestViewRecollectionRequest()...start");	
		List<PathologySampleWiseMaster> listunit = new ArrayList<>();
		listunit = phelbotomyService.gettestViewRecollectionRequest(masterid,
				treatmentid, patientType, recollectionType, tabType, request);
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
		obj.setProLi(listunit);
		log.info("gettestViewRecollectionRequest()...end");	
		return obj;
		}	
				
	 /*****************************************************************************************************
	  * @author  Ajay Khandare
	  * @since 11-03-2020
	  * @comment This method is to get list TestReason Name
	 ****************************************************************************************************/
	 @RequestMapping(value = "/getTestReasonName", method = RequestMethod.POST)
     public @ResponseBody PathologyTestReasonDto getTestReasonName(@RequestParam("callform") String callform, @RequestParam("sampleTypeId") String sampleTypeId,
    		 														HttpServletRequest request) {
		 log.info("getTestReasonName()...start");	
		List<PathologyTestReasonDto> testReasonlist = new ArrayList<PathologyTestReasonDto>();
		testReasonlist = phelbotomyService.getTestReasonName(callform, sampleTypeId, request);
		PathologyTestReasonDto obj = new PathologyTestReasonDto();
		obj.setTestReasonlist(testReasonlist);
		log.info("getTestReasonName()...end");	
		return obj;
	}
	 
	 /**************************************************************************
	  * @author Ajay Khandare
	  * @since 05-03-2020
	  * @comment This method is to Collection Test record
	 ****************************************************************************/
	@RequestMapping(value = "/processingAreaRecollectionTest", method = RequestMethod.POST)
	public @ResponseBody String processingAreaRecollectionTest(@RequestParam("recollectionList")String recollectionList,@RequestParam("recollectionReason") String recollectionReason,HttpServletRequest request){
	log.info("processingAreaRecollectionTest()...start");
    boolean response=phelbotomyService.processingAreaRecollectionTest(recollectionList,recollectionReason,request);
	String msg="";
	if(response==true)
    {
	   msg="ReCollection Successfully";
	}
	log.info("processingAreaRecollectionTest()...end");
	return msg;
	}	 
	    
	/**************************************************************************
	 * @author Ajay Khandare
	 * @since 05-03-2020
	 * @comment This method is to Collection Test record
	 * @param request
	 * @return
	 ****************************************************************************/
	@RequestMapping(value = "/unjectsampleAccessionTab", method = RequestMethod.POST)
	public @ResponseBody
	String unjectsampleAccessionTab(@RequestParam("id") String masterId,@RequestParam("callform") String callform,HttpServletRequest request) {
		log.info("unjectsampleAccessionTab()...start");
		boolean response = phelbotomyService.unjectsampleAccessionTab(masterId, callform,request);
		String msg = "";
		if (response == true) {
			msg = "UnRejct Successfully";
		}
		log.info("unjectsampleAccessionTab()...end");
		return msg;
	}

	 /********************************************************************
	 * @author Kishor Lokhande
	   * @since 12-06-2020
	   * @comment This method is used to Get Details of Normal, AbNormal, Critically AbNormal in Authorized Patient records.
	   * @param request
	   * @return
	 **********************************************************************/	
	@RequestMapping(value = "/getRecordAgainstIndicator", method = RequestMethod.POST)
	public @ResponseBody PathologySampleWiseMaster getRecordAgainstIndicator(@RequestParam("indicatorType") String indicatorType, @RequestParam("startIndex") Integer startIndex,@RequestParam("statusCode")Integer statusCode, 
			@RequestParam("fromDate")String fromDate,@RequestParam("toDate")String toDate, HttpServletRequest request) {
	List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
	 /*String pageCountCallFrom = "";
		if(callfrom.equalsIgnoreCase("All")) {
			pageCountCallFrom = "accessionPageCount";
		}else if(callfrom.equalsIgnoreCase("AP")){
			pageCountCallFrom = "accessionPendingPageCount";
		}else if(callfrom.equalsIgnoreCase("AC")) {
			pageCountCallFrom = "collectionPendingPageCount";
		}else if(callfrom.equalsIgnoreCase("AD")){
			pageCountCallFrom = "accessionDonePageCount";
		}else if(callfrom.equalsIgnoreCase("AR")){
			pageCountCallFrom = "rejectedSamplePageCount";
		}else if(callfrom.equalsIgnoreCase("AA")){
			pageCountCallFrom = "authorizationPageCount";
		}else if(callfrom.equalsIgnoreCase("AAP")){
			pageCountCallFrom = "reportingPageCount";
		}else if(callfrom.equalsIgnoreCase("AO")){
			pageCountCallFrom = "outSourcePageCount";
		}else if(callfrom.equalsIgnoreCase("AAprocessing")){
			pageCountCallFrom = "accessionPathologiestPageCount";
		}
	           
				String rowCount = phelbotomyService.getPageCount(pageCountCallFrom, null, request);*/
				
				listsample = phelbotomyService.getRecordAgainstIndicator(indicatorType, startIndex, statusCode,fromDate,toDate, request);
				PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setLabSampleWiseMasterDtoList(listsample);
				//obj.setRowCount(rowCount);
				return obj;
		}	
	
	/**************************************************************************
	 * @author Ajay Khandare
	 * @since 05-03-2020
	 * @comment This method is to Collection Test record
	 * @param request
	 * @return
	 ****************************************************************************/
	@RequestMapping(value = "/sendtooutsourcetestphlebo", method = RequestMethod.POST)
	@ResponseBody
	public String sendToOutSourceTest(@RequestParam("id") String idList,@RequestParam("labCenterId") Integer labCenterId,@RequestParam("dispatchDate") String dispatchDate,@RequestParam("dispatchTime") String dispatchTime,@RequestParam("carrierName") String carrierName,@RequestParam("comment") String comment,@RequestParam("inouthouse") Integer inouthouse,HttpServletRequest request) {
		log.info("sendToOutSourceTest()...start");
		boolean response = phelbotomyService.sendToOutSourceTest(idList, labCenterId,dispatchDate,dispatchTime,carrierName,comment,inouthouse,request);
		log.info("sendToOutSourceTest()...end");
		String msg = "";
		if (response == true) {
			msg = "Send OutSource Test Successfully";
		}
		return msg;
	}
		 
	   

	/********************************************************************
	 * @author Ajay Khandare
	 * @since 03-03-2020
	 * @comment This method is to get forced OutSorce Record List
	 * @param request
	 **********************************************************************/
	@RequestMapping(value = "/getForcedOutSourcedRecord", method = RequestMethod.POST)
	public @ResponseBody PathologySampleWiseMaster getForcedOutSourcedRecord(@RequestParam("emergencyFlag") String emergencyFlag, HttpServletRequest request) {
		log.info("getForcedOutSourcedRecord()...start");
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();
		listsample = phelbotomyService.getForcedOutSourcedRecord(emergencyFlag, request);
		String rowCount = phelbotomyService.getPageCount("forcedOutSourcePageCount", null, emergencyFlag, request);
		
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		obj.setRowCount(rowCount);
		log.info("getForcedOutSourcedRecord()...end");
		return obj;
	}

	/**************************************************************************
	* @author Ajay Khandare
	* @since 17-06-2020
	* @comment This method is to Auto-Suggest the patient record.
	****************************************************************************/
	@RequestMapping(value = "/outSourcedPatientAutoSuggestion", method = RequestMethod.GET)
	public @ResponseBody PathologySampleWiseMaster outSourcedPatientAutoSuggestion(@RequestParam("searchText") String searchText, @RequestParam("tabId") String tabId, HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("outSourcedPatientAutoSuggestion()...start");
		listsample = phelbotomyService.outSourcedPatientAutoSuggestion(searchText,tabId, request);
		log.info("outSourcedPatientAutoSuggestion()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}
	

	/**************************************************************************
	 * @author Ajay Khandare
	* @since 17-06-2020
	* @comment This method is to get the patient record by patientId.
	****************************************************************************/
	@RequestMapping(value = "/getoutsourcepatientbyId", method = RequestMethod.GET)
	public @ResponseBody PathologySampleWiseMaster getOutSourceTypeById(@RequestParam("outSourceType") Integer outSourceType,@RequestParam("outSourceTypeId") Integer outSourceTypeId,@RequestParam("tabId") String tabId, HttpServletRequest request){
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("getOutSourceTypeById()...start");
		listsample = phelbotomyService.getOutSourceTypeById(outSourceType,outSourceTypeId, tabId,request);
		
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		log.info("getOutSourceTypeById()...end");
		return obj;
	}
	
	/**************************************************************************
	 * @author Ajay Khandare
	 * @since 17-06-2020
	 * @comment This method is to fetch  by outSource Type.
	 ****************************************************************************/
	@RequestMapping(value = "/fetchlabnamebytype", method = RequestMethod.GET)
	public @ResponseBody PathologySampleWiseMaster fetchLabNameByType(@RequestParam("outSourceType") Integer outSourceType, HttpServletRequest request){
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("fetchLabNameByType()...start");
		listsample = phelbotomyService.fetchLabNameByType(outSourceType,request);
		
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		log.info("fetchLabNameByType()...end");
		return obj;
	}
	
	/**************************************************************************
	  * @author Ajay Khandare
	  * @since 05-03-2020
	  * @comment This method is to send To Phlebotomy Recollection Test record
	 ****************************************************************************/
	 @RequestMapping(value = "/sendToPhlebotomyRecollection", method = RequestMethod.POST)
	 public @ResponseBody String sendToPhlebotomyRecollection(@RequestParam("id")String idList,HttpServletRequest request){
		        log.info("sendToPhlebotomyRecollection()...start");
		        boolean response=phelbotomyService.sendToPhlebotomyRecollection(idList,request);
	  			String msg="";
	  			if(response==true){
	  				msg="ReCollection Successfully";
	  			}
	  			log.info("sendToPhlebotomyRecollection()...end");
	    		return msg;
	    }	
	 
		
	/**************************************************************************
	 * @author Ajay Khandare
	 * @since 05-03-2020
	 * @comment This method is to reject Sample From  Recollection Test record
	 ****************************************************************************/
	@RequestMapping(value = "/rejectSampleFromRecollection", method = RequestMethod.POST)
	public @ResponseBody
	String rejectSampleFromRecollection(@RequestParam("id") String idList,HttpServletRequest request) {
		log.info("rejectSampleFromRecollection()...start");
		boolean response = phelbotomyService.rejectSampleFromRecollection(idList, request);
		String msg = "";
		if (response == true) {
			msg = "Reject Sample Successfully";
		}
		log.info("rejectSampleFromRecollection()...end");
		return msg;
	}
	
	/**************************************************************************
	 * @author Ajay Khandare
	 * @since 05-03-2020
	 * @comment This method is to reject Sample From  Recollection Test record
	 ****************************************************************************/
	@RequestMapping(value = "/dropSampleFromRecollection", method = RequestMethod.POST)
	public @ResponseBody
	String dropSampleFromRecollection(@RequestParam("id") String idList,HttpServletRequest request) {
		log.info("dropSampleFromRecollection()...start");
		boolean response = phelbotomyService.dropSampleFromRecollection(idList, request);
		String msg = "";
		if (response == true) {
			msg = "Drop Sample Successfully";
		}
		log.info("dropSampleFromRecollection()...end");
		return msg;
	}
	
	/**************************************************************************
	 * @author Ajay Khandare
	 * @since 05-03-2020
	 * @comment This method is to send To Processing Test
	 ****************************************************************************/
	@RequestMapping(value = "/sendToProcessingTest", method = RequestMethod.POST)
	public @ResponseBody
	String sendToProcessingTest(@RequestParam("phlebotomyListTestsalve") String phlebotomyListTestsalve,@RequestParam("callfrom") String callfrom,HttpServletRequest request) {
		log.info("sendToProcessingTest()...start");
		boolean response = phelbotomyService.sendToProcessingTest(phlebotomyListTestsalve, callfrom, request);
		String msg = "";
		if (response == true) {
			msg = "Send To Processing Successfully";
		}
		log.info("sendToProcessingTest()...end");
		return msg;
	}
	
	/**************************************************************************
	 * @author Ajay Khandare
	 * @since 05-03-2020
	 * @comment This method is to Reject Test In pathologist Tab (recollection Request)
	 ****************************************************************************/
	@RequestMapping(value = "/rejectTestRequestInPathologistTab", method = RequestMethod.POST)
	public @ResponseBody
	String rejectTestRequestInPathologistTab(@RequestParam("phlebotomyListTestsalve") String phlebotomyListTestsalve,@RequestParam("callfrom") String callfrom,HttpServletRequest request) {
		log.info("rejectTestRequestInPathologistTab()...start");
		boolean response = phelbotomyService.rejectTestRequestInPathologistTab(phlebotomyListTestsalve, callfrom, request);
		String msg = "";
		if (response == true) {
			msg = "Reject Test Successfully";
		}
		log.info("rejectTestRequestInPathologistTab()...end");
		return msg;
	}

	/**************************************************************************
	* @author Ajay Khandare
	* @since 17-06-2020
	* @comment This method is to get Testwise Trendanalysis.
	****************************************************************************/
	@RequestMapping(value = "/getTestwiseTrendanalysis", method = RequestMethod.POST)
	public @ResponseBody PathologySampleWiseMaster getTestwiseTrendanalysis(@RequestParam("patientId") Integer patientId,@RequestParam("testId") Integer testId,HttpServletRequest request){
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("getTestwiseTrendanalysis()...start");
		listsample = phelbotomyService.getTestwiseTrendanalysis(patientId,testId,request);
		
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		log.info("getTestwiseTrendanalysis()...end");
		return obj;
	}
	
	/*****************************************************************************************************
	   * @author  Ajay Khandare
	   * @since 11-03-2020
	   * @comment This method is to get list pathologist
	   * @param request
	   * @return
	   ****************************************************************************************************/
	  @RequestMapping(value = "/getmachinename", method = RequestMethod.POST)
	  public @ResponseBody LabPhlebotomyMaster getmachinename(HttpServletRequest request) {
		     log.info("getmachinename()...start");
	    	List<LabPhlebotomyMaster> listsample=new ArrayList<LabPhlebotomyMaster>();
	    	listsample = phelbotomyService.getmachinename(request);
	    	LabPhlebotomyMaster obj =new LabPhlebotomyMaster();
	    	obj.setPhlebotomytableList(listsample);
	    	log.info("getmachinename()...end");
	    	return obj;
	   }
	  
	/**************************************************************************
	 * @author Ajay Khandare
	 * @since 12-09-2020
	 * @comment This method is to bulk Post Record 
	 * @param request
	 * @return
	 ****************************************************************************/
	@RequestMapping(value = "/bulkPostRecord", method = RequestMethod.POST)
	public @ResponseBody
			boolean bulkPostRecord(@RequestParam("id") String idList, HttpServletRequest request,
					HttpServletResponse res) {
		 log.info("bulkPostRecord()...start");
		boolean response = phelbotomyService.bulkPostRecord(idList, request, res);

		List<PathologySampleWiseMaster> generalValuesList = new ArrayList<PathologySampleWiseMaster>();
		generalValuesList = phelbotomyService.getemailFileds(idList, request);

		StringBuffer treatmentId = new StringBuffer();
		StringBuffer masterId = new StringBuffer();
		StringBuffer emailId = new StringBuffer();
		StringBuffer patientType = new StringBuffer();
		StringBuffer patientName = new StringBuffer();
		StringBuffer patientId = new StringBuffer();

		int count = 0;
		for (PathologySampleWiseMaster pathologySampleWiseMaster : generalValuesList) {
			if (count == 0) {
				treatmentId.append(pathologySampleWiseMaster.getTreatmentId());
				masterId.append(pathologySampleWiseMaster.getMasterId());
				emailId.append(pathologySampleWiseMaster.getEmailId());
				patientType.append(pathologySampleWiseMaster.getGender());
				patientName.append(pathologySampleWiseMaster.getPatientname());
				patientId.append(pathologySampleWiseMaster.getPatientId());
			} else {
				treatmentId.append("," + pathologySampleWiseMaster.getTreatmentId());
				masterId.append("-" + pathologySampleWiseMaster.getMasterId());
				emailId.append("," + pathologySampleWiseMaster.getEmailId());
				patientType.append("," + pathologySampleWiseMaster.getGender());
				patientName.append("," + pathologySampleWiseMaster.getPatientname());
				patientId.append("," + pathologySampleWiseMaster.getPatientId());
			}
			count++;
		}

		RequestDispatcher rd = null;
		rd = request.getRequestDispatcher(
				"/pathology_routinevalueResultGenratedbyPost.jsp?" + "&treatmentId=" + treatmentId + "&masterIdd="
						+ masterId + "&gender=" + patientType + "&emailTo=" + emailId + "&patientName=" + patientName+"&patientId=" + patientId);
		try {
			rd.forward(request, res);
		} catch (ServletException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		 log.info("bulkPostRecord()...end");
		return response;
	}
	
	@RequestMapping(value = "/updateReportOnServer", method = RequestMethod.POST)
	public @ResponseBody boolean updateReportOnServer(@RequestParam("id") String idList, HttpServletRequest request,
					HttpServletResponse res) {
		 log.info("bulkPostRecord()...start");
		 boolean response = true;
		//boolean response = phelbotomyService.bulkPostRecord(idList, request, res);

		List<PathologySampleWiseMaster> generalValuesList = new ArrayList<PathologySampleWiseMaster>();
		generalValuesList = phelbotomyService.getemailFileds(idList, request);

		StringBuffer treatmentId = new StringBuffer();
		StringBuffer masterId = new StringBuffer();
		StringBuffer emailId = new StringBuffer();
		StringBuffer patientType = new StringBuffer();
		StringBuffer patientName = new StringBuffer();
		StringBuffer patientId = new StringBuffer();

		int count = 0;
		for (PathologySampleWiseMaster pathologySampleWiseMaster : generalValuesList) {
			if (count == 0) {
				treatmentId.append(pathologySampleWiseMaster.getTreatmentId());
				masterId.append(pathologySampleWiseMaster.getMasterId());
				emailId.append(pathologySampleWiseMaster.getEmailId());
				patientType.append(pathologySampleWiseMaster.getGender());
				patientName.append(pathologySampleWiseMaster.getPatientname());
				patientId.append(pathologySampleWiseMaster.getPatientId());
			} else {
				treatmentId.append("," + pathologySampleWiseMaster.getTreatmentId());
				masterId.append("-" + pathologySampleWiseMaster.getMasterId());
				emailId.append("," + pathologySampleWiseMaster.getEmailId());
				patientType.append("," + pathologySampleWiseMaster.getGender());
				patientName.append("," + pathologySampleWiseMaster.getPatientname());
				patientId.append("," + pathologySampleWiseMaster.getPatientId());
			}
			count++;
		}

		//RequestDispatcher rd = null;
		//rd = request.getRequestDispatcher(
		//		"/pathology_routinevalueResultGenratedbyPost.jsp?" + "&treatmentId=" + treatmentId + "&masterIdd="
		//				+ masterId + "&gender=" + patientType + "&emailTo=" + emailId + "&patientName=" + patientName+"&patientId=" + patientId);
		try {
			//rd.forward(request, res);
			res.sendRedirect(request.getContextPath() + "/pathology_routinevalueResultGenratedbyPost.jsp?" + "&treatmentId=" + treatmentId + "&masterIdd="+ masterId + "&gender=" + patientType + "&emailTo=" + emailId + "&patientName=" + patientName+"&patientId=" + patientId);
		} catch (IOException e) {
			e.printStackTrace();
		}
		 log.info("bulkPostRecord()...end");
		return response;
	}
	
	/*************************************************************************
	 * @author Ajay Khandare
	 * @since 13-sep-2020
	 * @comment This method is to save Lab test Routine Value to Outsource
	 *************************************************************************/
	  	@RequestMapping(value = "/saveOutsourceDocument", method = RequestMethod.POST)
		public @ResponseBody int saveOutsourceDocument(@RequestParam("documentUpload") String documentName,
				@RequestParam("outsourceDocs") MultipartFile[] uploadOutsourceDocument,
				@RequestParam("treatmentId") Integer treatmentId,
				@RequestParam("id") String id,
				HttpServletRequest request) throws IOException {
	  		
	  		HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			log.info("saveOutsourceDocument()...start");
	  		boolean isDuplicateFile = phelbotomyService.checkDuplicateFile(documentName, id);
	  		
	  		if(isDuplicateFile)
	  			return 1;
	  		else{
	  			List<SendToOutSourceDocumentDto> docList = new ArrayList<>();
	  			
	  			for (MultipartFile file : uploadOutsourceDocument) {
	  				if (file.isEmpty()) { continue; }
	  					java.io.File uploadPath = new java.io.File(FilePathPathology.getOutsourceFilesPath() + id);
	  					
	  					if(!uploadPath.exists())
	  						uploadPath.mkdirs();
	  					String fileName = file.getOriginalFilename();
	  					String filepath = Paths.get(uploadPath.toString(), fileName).toString();
	  					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
	  					stream.write(file.getBytes());
	  					stream.close();
	  					
	  					SendToOutSourceDocumentDto dto = new SendToOutSourceDocumentDto();
	  											   dto.setCreatedBy(userId);
	  											   dto.setDocumentpath(fileName);
	  											   dto.setTreatmentId(treatmentId);
	  											   dto.setOutmasterId(id);
	  											   dto.setCreatedDate(new Date());
	  					docList.add(dto);
	  			}
	  			//int response = diagnosticsService.saveOutsourceDocument(documentName,treatmentId,id,request);
	  			int response = phelbotomyService.saveOutsourceDocument(docList);
	  			log.info("saveOutsourceDocument()...end");
	  			return response;
	  		}
		}	
	  	
	/*********************************************************************************************************
	 * @author Ajay Khandare
	 * @since 13-sep-2020
	 * @comment This method is to read perticular Patient document by document  id and treatment id
	 ********************************************************************************************************/
	@RequestMapping(value = "/readDocuments", method = RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName,@RequestParam("treatmentId") String treatmentId,
			HttpServletResponse response) {
		log.info("readCertificate()...start");
		String filePath = FilePathPathology.getOutsourceFilesPath();
		try {
			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")|| fileName.endsWith(".png") || fileName.endsWith(".gif")) {
				// System.out.println(" image  "+fileName);
				java.io.File file = new java.io.File(filePath+ java.io.File.separator + treatmentId+ java.io.File.separator + fileName);
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
				String reportDestination = filePath + java.io.File.separator+ treatmentId + java.io.File.separator + fileName;
				// System.out.println(" image  "+reportDestination);
				FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
				org.apache.commons.io.IOUtils.copy(fileInputStream,response.getOutputStream());
				response.setContentType("application/pdf");
				response.setHeader("Content-Disposition","attachment; filename=" + reportDestination);
				response.flushBuffer();
			} else {

				String reportDestination = filePath + java.io.File.separator+ treatmentId + java.io.File.separator + fileName;				
				FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
				org.apache.commons.io.IOUtils.copy(fileInputStream,response.getOutputStream());
			}
			
		log.info("readCertificate()...end");	
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/*********************************************************************************************************
	 * @author Ajay Khandare
	 * @since 13-sep-2020
	 * @comment This method is to read perticular Patient document by document id and treatment id
	 ********************************************************************************************************/
	@RequestMapping(value = "/getOutsourceDocumentsById", method = RequestMethod.POST)
	public @ResponseBody
	SendToOutSourceDocumentDto getOutsourceDocumentsById(
			@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("id") Integer id) {
		log.info("getOutsourceDocumentsById()...start");
		List<SendToOutSourceDocumentDto> listupload = new ArrayList<SendToOutSourceDocumentDto>();
		listupload = phelbotomyService.getOutsourceDocumentsById(treatmentId,
				id);
		SendToOutSourceDocumentDto obj = new SendToOutSourceDocumentDto();
		obj.setSendToOutSourceDocumentDtoList(listupload);
		log.info("getOutsourceDocumentsById()...end");
		return obj;
	}
	
	/*************************************************************************
     * @author Ajay Khandare
     * @since 13-sep-2020
     * @comment This method is to get delete OutSource Uploaded Document
     *************************************************************************/	
	@RequestMapping(value = "/deleteOutSourceUploadedDocument", method = RequestMethod.POST)
	public @ResponseBody String deleteOutSourceUploadedDocument(@RequestParam("outmasterId") Integer outmasterId,HttpServletRequest request) {
		log.info("deleteOutSourceUploadedDocument()...start");
		boolean response = phelbotomyService.deleteOutSourceUploadedDocument(outmasterId, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		log.info("deleteOutSourceUploadedDocument()...end");
		return msg;
	}
	
	/*****************************************************************************************************
     * @author  Ajay Khandare
     * @since 24-03-2020
     * @comment This method is to  get micro organism Name
     ****************************************************************************************************/
    @RequestMapping(value = "/getmicroorganismName", method = RequestMethod.POST)
    public @ResponseBody LabMicroorganismsDto getmicroorganismName(@RequestParam("testId") Integer testId,HttpServletRequest request) {
    	log.info("getmicroorganismName()...start");
    	List<LabMicroorganismsDto> listmicro=new ArrayList<LabMicroorganismsDto>();
    	listmicro = phelbotomyService.getmicroorganismName(testId,request);
    	LabMicroorganismsDto obj =new LabMicroorganismsDto();
    	obj.setMicroorganismsList(listmicro);
    	log.info("getmicroorganismName()...end");
    	return obj;
    } 
    
    /*****************************************************************************************************
     * @author  Ajay Khandare
     * @since 24-03-2020
     * @comment This method is to  get micro organism Name
     ****************************************************************************************************/
    @RequestMapping(value = "/getgradingName", method = RequestMethod.POST)
    public @ResponseBody LabGradingsDto getgradingName(@RequestParam("testId") Integer testId,HttpServletRequest request) {
    	log.info("getgradingName()...start");
    	List<LabGradingsDto> gradingsList=new ArrayList<LabGradingsDto>();
    	gradingsList = phelbotomyService.getgradingName(testId,request);
    	LabGradingsDto obj =new LabGradingsDto();
    	obj.setGradingsList(gradingsList);
    	log.info("getgradingName()...end");
    	return obj;
    }  	
  	
	/**************************************************************************
	 * @author Ajay Khandare
	 * @since 05-03-2020
	 * @comment This method is to Collection Test record
	 ****************************************************************************/
	@RequestMapping(value = "/reRunTestResult", method = RequestMethod.POST)
	public @ResponseBody
	String reRunTestResult(@RequestParam("reRunTestResultList") String reRunTestResultList,
			HttpServletRequest request) {
		log.info("reRunTestResult()...start");
		boolean response = phelbotomyService.reRunTestResult(reRunTestResultList, request);
		String msg = "";
		if (response == true) {
			msg = "ReCollection Successfully";
		}
		log.info("reRunTestResult()...end");
		return msg;
	}

	/**************************************************************************
	 * @author Ajay Khandare
	 * @since 17-06-2020
	 * @comment This method is to fetch  by outSource Type.
	 ****************************************************************************/
	@RequestMapping(value = "/showPatientPreviousHistory", method = RequestMethod.GET)
	public @ResponseBody TreatmentDto showPatientPreviousHistory(@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request){
		log.info("showPatientPreviousHistory()...start");
		TreatmentDto obj = phelbotomyService.showPatientPreviousHistory(treatmentId, request);
		log.info("showPatientPreviousHistory()...end");
		return obj;
	}
	

	/********************************************************************
	 * @author Akshay Mache
	 * @since 04-09-2020
	 * @comment This method is to get patient types
	 * @throws JsonProcessingException 
	 * @throws JSONException 
	 **********************************************************************/	
	@RequestMapping(value = "/getLisRecordsCount", method = RequestMethod.GET)
	public @ResponseBody String getLisRecordsCount(HttpServletRequest request) throws JsonProcessingException, JSONException {

		log.info("getLisRecordsCount()...start");
		
		String bToBAllRecords = phelbotomyService.getPageCountRecollection("allRecordBToB", null, "All", request);
		String bToBRejectedRecords = phelbotomyService.getPageCountRecollection("rejectrecordBToB", null, "All", request);
		String bToBPathologiestRecollectionRecords = phelbotomyService.getPageCountRecollection("pathologyrecollectionBToB", null, "All", request);
		
		String bToCAllRecords = phelbotomyService.getPageCountRecollection("allRecordBToC", null, "All", request);
		String bToCRejectedRecords = phelbotomyService.getPageCountRecollection("rejectrecordBToC", null, "All", request);
		String bToCPathologiestRecollectionRecords = phelbotomyService.getPageCountRecollection("pathologyrecollectionBToC", null, "All", request);
		
		String accessionAllRecords = phelbotomyService.getPageCount("accessionPageCount", null, "All", request);
		String accessionPendingRecords = phelbotomyService.getPageCount("accessionPendingPageCount", null, "All", request);
		String collectionPendingRecords = phelbotomyService.getPageCount("collectionPendingPageCount", null, "All", request);
		String accessionDoneRecords = phelbotomyService.getPageCount("accessionDonePageCount", null, "All", request);
		String rejectedSampleRecords = phelbotomyService.getPageCount("rejectedSamplePageCount", null, "All", request);
		
		String authorizationRecords = phelbotomyService.getPageCount("authorizationPageCount", null, "All", request);
		String reportingRecords = phelbotomyService.getPageCount("reportingPageCount", null, "All", request);
		String outsourceRecords = phelbotomyService.getPageCount("outSourcePageCount", null, "All", request);
		String accessionPathologiestRecords = phelbotomyService.getPageCount("accessionPathologiestPageCount", null, "All", request);
		String forcedOutsourcedRecords = phelbotomyService.getPageCount("forcedOutSourcePageCount", null, "All", request);
		String phelbotomyRecords = phelbotomyService.getPageCount("phelbotomyPageCount", null, "All", request);
		
		JSONObject obj = new JSONObject();
		 		   obj.put("bToBAllRecords", bToBAllRecords);
		           obj.put("bToBRejectedRecords", bToBRejectedRecords);
		           obj.put("bToBPathologiestRecollectionRecords", bToBPathologiestRecollectionRecords);
		           
		           obj.put("bToCAllRecords", bToCAllRecords);
		           obj.put("bToCRejectedRecords", bToCRejectedRecords);
		           obj.put("bToCPathologiestRecollectionRecords", bToCPathologiestRecollectionRecords);

		           obj.put("phelbotomyRecords", phelbotomyRecords);
		           
		 		   obj.put("accessionAllRecords", accessionAllRecords);
		           obj.put("accessionPendingRecords", accessionPendingRecords);
		           obj.put("collectionPendingRecords", collectionPendingRecords);
		           obj.put("accessionDoneRecords", accessionDoneRecords);
		           obj.put("rejectedSampleRecords", rejectedSampleRecords);
		           
		           obj.put("processingRecords", accessionDoneRecords);
		           obj.put("accessionPathologiestRecords", accessionPathologiestRecords);
		           
		           obj.put("authorizationRecords", authorizationRecords);
		           
		 		   obj.put("outsourceRecords", outsourceRecords);
		           obj.put("forcedOutsourcedRecords", forcedOutsourcedRecords);
		           
		           obj.put("reportingRecords", reportingRecords);
		           
		log.info("getLisRecordsCount()...end");
		return obj.toString();
	}
	
	/*****************************************************************************************************
     * @author  Ajay Khandare
     * @since 24-03-2020
     * @comment This method is to  get micro organism Name
     ****************************************************************************************************/
    @RequestMapping(value = "/getGenralValueName", method = RequestMethod.POST)
    public @ResponseBody LabTestGeneralValueDto getGenralValueName(@RequestParam("testId") Integer testId,HttpServletRequest request) {
    	log.info("getGenralValueName()...start");
    	List<LabTestGeneralValueDto> generalValuesList=new ArrayList<LabTestGeneralValueDto>();
    	generalValuesList = phelbotomyService.getGenralValueName(testId,request);
    	LabTestGeneralValueDto obj =new LabTestGeneralValueDto();
    	obj.setGeneralValuesList(generalValuesList);
    	log.info("getGenralValueName()...end");
    	return obj;
    }  	
    
    /**************************************************************************
	 * @author Ajay Khandare
	 * @since 12-09-2020
	 * @comment This method is to bulk Post Record 
	 * @param request
	 * @return
	 ****************************************************************************/
	@RequestMapping(value = "/bulkAuthoriseRecord", method = RequestMethod.POST)
	public @ResponseBody
	String bulkAuthoriseRecord(@RequestParam("id") String idList,HttpServletRequest request) {
		log.info("bulkAuthoriseRecord()...start");
		boolean response = phelbotomyService.bulkAuthoriseRecord(idList, request);
		String msg = "";
		if (response == true) {
			msg = "Bulk Post Successfully";
		}
		log.info("bulkAuthoriseRecord()...end");
		return msg;
	} 
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 05-02-2021
	 * @comment This method is to check assigned tests to a patient. 
	 ****************************************************************************/
	@RequestMapping(value = "/checkTestAssignedToPatient", method = RequestMethod.GET)
	public boolean checkTestAssignedToPatient(Integer patientId, Integer treatmentId, String masterId, HttpServletRequest request) {
		return phelbotomyService.checkTestAssignedToPatient(patientId, treatmentId, masterId, request);

	}
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 05-02-2021
	 * @comment This method is to get merged lab report path. 
	 ****************************************************************************/
	@RequestMapping(value = "/getMergedReportPath", method = RequestMethod.GET)
	public String getMergedReportPath(Integer patientId, Integer treatmentId, Integer unitId, HttpServletRequest request) {
		return phelbotomyService.getMergedReportPath(patientId, treatmentId, unitId, request);
	}
	
	@RequestMapping(value = "/bulkPostingOfRecords", method = RequestMethod.POST)
	public boolean bulkPostingOfRecords(String idList, HttpServletRequest request, HttpServletResponse response) {
		return phelbotomyService.bulkPostRecord(idList, request, response);
	}
	
	
	@RequestMapping(value = "/reportingEmail1", method = RequestMethod.POST)
	public @ResponseBody String reportingEmail1(@RequestParam("id") String idList, @RequestParam("emailTo") String emailTo, @RequestParam("emailCC") String emailCC,@RequestParam("callFrom") String callFrom, HttpServletRequest request,HttpServletResponse res) 
	{

		try {
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");	
		    Integer userId = (Integer) httpSession.getAttribute("userId1");//This is User Id 
			
			List<PathologySampleWiseMaster> emailList = phelbotomyService.getemailFileds(idList, request);
			
			ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String ReportUrlSmsLink = (String) resource.getObject("ReportUrlSmsLink").toString();
			ResourceBundle resourceBundle = ResourceBundle.getBundle("SMSFormat");
            String host = resourceBundle.getObject("host").toString();
            String port = resourceBundle.getObject("port").toString();
            final String mailFrom = resourceBundle.getObject("mailFrom").toString();
            final String password = resourceBundle.getObject("password").toString();
            String labName = resourceBundle.getObject("labName").toString();
            String regards = resourceBundle.getObject("regards").toString();
            ResourceBundle resourceEhat = ResourceBundle.getBundle("Ehat");
            String meesha = resourceEhat.getObject("meesha").toString();
			/*String host = "smtp.gmail.com";
			String port = "587";//"465";
			final String mailFrom = "reports.lifenity@gmail.com";
	        final String password ="cexraedexyrhahgl";*/

            // sets SMTP server properties
			Properties properties = new Properties();
			properties.put("mail.smtp.host", host);
			properties.put("mail.smtp.port", port);
			properties.put("mail.smtp.auth", "true");
			properties.put("mail.smtp.starttls.enable", "true");
			properties.put("mail.user", mailFrom);
			properties.put("mail.password", password);

			// creates a new session with an authenticator
			Authenticator auth = new Authenticator() {
				public PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(mailFrom, password);
				}
			};

			Session mailSession = Session.getInstance(properties, auth);
			
			for(PathologySampleWiseMaster dto : emailList) {
				
				if(callFrom.equalsIgnoreCase(" ")) {
					String pName = dto.getPatientname().replaceAll("\\s", "");
					String pNamee = dto.getPatientname().replaceAll("  ", " ");
					
					
					
					final String labReportPath = ReportUrlSmsLink+FilePath.getLabReportPath() + File.separator +
							dto.getMasterId() + File.separator + pName + File.separator +pName+".pdf";
					String filePath = labReportPath.replace("\\", "/");
					
					if(ReportUrlSmsLink.equalsIgnoreCase("https://disha.lifenitywellness.com") || ReportUrlSmsLink.equalsIgnoreCase("https://disha.pluscare.org") || ReportUrlSmsLink.equalsIgnoreCase("https://nashik.pluscare.org")) {
						filePath = WhatsAppApi.convertUrlIntoTinyUrl(filePath);
					}
					
					// To send Lab Report through whatsapp.
					//RegistrationController.sendSmsForDishaUrl(labReportPath, pNamee, dto.getMobile());
					
					String mail = null;
					if(!((emailTo.replaceAll("\\s", "")).equalsIgnoreCase(""))){
						mail = emailTo;
					}else {
						mail = dto.getEmailId();
					}
					
					/*String host = "smtp.gmail.com";
					String port = "587";//"465";
					final String mailFrom = "reports.lifenity@gmail.com";
			        final String password ="cexraedexyrhahgl";*/
					// message info
					String subject = labName+" Report";
					String message = "Dear <b>" + dto.getPatientname() + "</b>," + "<br>" + "<br>" +
							"Thank you for registering with us." + "<br>"
							+ " Please find your  <b>Lab Test Report</b>  click on this link : <br>"+filePath+ "<br>"
							+ "<br>"
							
							//+ " Please find your attached <b>Lab Test Report</b><br><br>"

							+ " Conditions on reporting" + "<br>" 
							+ "1.This is a computer generated report." + "<br>"
							+ "2.Partial reproduction of this report is not permitted." + "<br>" + "" + "<br>"
							
							+ "<i>This is an auto-generated email. Do not reply to this email id.<i><br><br>"
							
							+ "<b>Regards</b>," + "<br>" + "<b>"+regards+"</b>" + "<br>" + "<br>"

							
							+ "<b>Disclaimer -</b>" + "<br>"
							+ "<i>This e-mail may contain confidential information which is the property of "+labName+". It is intended only for the use of the individual or entity to which it is addressed. If you are not "
							+ " the intended recipient, you are not authorized to read,retain,copy, print,distribute or use the contents of this e-mail. If you have received this communication in error please notify the "
							+ " sender & delete all copies of this message. "+labName+" does not accept any liability for virus infected mails</i>.";
					
						String mailSendFrom = resourceBundle.getObject("mailSendFrom").toString();
						
						String mailStatus = WhatsAppApi.sendEmailUsingMsg91Domain(mail, subject, message, "", "", "1", emailCC);
					//	String mailStatus = WhatsAppApi.emailSendFromGmailWithAttachment(mail, subject, message, filePath, "", "1",emailCC);
						phelbotomyService.updateEmailStatus(dto.getMasterId(), dto.getTreatmentId(), dto.getGender(), unitId, mailStatus, userId);
					
						/*if(mailSendFrom.equalsIgnoreCase("Lifenity") || mailSendFrom.equalsIgnoreCase("Plus Care")){
							String mailStatus = WhatsAppApi.sendEmailUsingMsg91Domain(mail, subject, message, "", "", "1", emailCC);
							phelbotomyService.updateEmailStatus(dto.getMasterId(), dto.getTreatmentId(), dto.getGender(), unitId, mailStatus, userId);
						}else{
					
					// sets SMTP server properties
					Properties properties = new Properties();
					properties.put("mail.smtp.host", host);
					properties.put("mail.smtp.port", port);
					properties.put("mail.smtp.auth", "true");
					properties.put("mail.smtp.starttls.enable", "true");
					properties.put("mail.user", mailFrom);
					properties.put("mail.password", password);

					// creates a new session with an authenticator
					Authenticator auth = new Authenticator() {
						public PasswordAuthentication getPasswordAuthentication() {
							return new PasswordAuthentication(mailFrom, password);
						}
					};
					Session mailSession = Session.getInstance(properties, auth);
					//creates a new e-mail message
					Message msg = new MimeMessage(mailSession);
					msg.setFrom(new InternetAddress(mailFrom));
					//InternetAddress[] toAddresses = { new InternetAddress(mail) };
					//InternetAddress[] CCAddresses = { new InternetAddress(mailCC) };
					msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mail));
					msg.setRecipients(Message.RecipientType.CC,InternetAddress.parse(emailCC));
					//msg.setRecipients(Message.RecipientType.CC, CCAddresses );
					msg.setSubject(subject);
					msg.setSentDate(new Date());
					msg.setContent(message, "text/html");
					
					SMTPTransport transport = (SMTPTransport) mailSession.getTransport("smtp");
					transport.connect(host, 587, mailFrom, password);
					
					transport.sendMessage(msg, msg.getAllRecipients());
					// you can get SMTP return code here
					int responseCode = transport.getLastReturnCode();
					String lastServerResponse = transport.getLastServerResponse();

					String mailStatus="";
					//250 � Requested action taken and completed. This is the best message for a sender to receive because it indicates that the SMTP communication was successful. SMTP response code 250 is also the most common response code in SMTP since it is issued in response to every accepted command (likely 4 to 6 times per message).
					if(responseCode == 250){
						mailStatus="Success";
					}else{
						mailStatus="Fail";
					}
					//Added by kishor for Function for update mail status.
					phelbotomyService.updateEmailStatus(dto.getMasterId(), dto.getTreatmentId(), dto.getGender(), unitId, mailStatus, userId);
				}*/
				}else if(callFrom.equalsIgnoreCase("patientWise")) {
					
					if(meesha.equalsIgnoreCase("on")) {


						String pName = dto.getPatientname().replaceAll("\\s", "");
						String pNamee = dto.getPatientname().replaceAll("  ", " ");
						
						
						RequestDispatcher rd = null;
					
						rd = request.getRequestDispatcher("/pathology_patientwise_report_meesha_by_post.jsp?" + "&treatmentId="
								+ dto.getTreatmentId() + "&masterIdd=" +idList + "&gender=" +  dto.getGender()+ "&patientName=" + dto.getPatientname());
						System.err.println("covideeeeeeeeee");
						try {
							rd.forward(request, res);
						} catch (ServletException e) {
							e.printStackTrace();
						} catch (IOException e) {
							e.printStackTrace();
						}
						
						
						/*
						final String labReportPath = ReportUrlSmsLink+FilePath.getLabReportPathForMeesha() + File.separator +
								dto.getMasterId() + File.separator + pName + File.separator +pName+".pdf";
						String filePath = labReportPath.replace("\\", "/");
						*/
						
						final String labReportPath = ReportUrlSmsLink+"/"+"ehat"+"/"+"sendpathoreport"+"/"+"sendPathologyReport"+"/"+dto.getMasterId() +"/" + pName ;
						String filePath=labReportPath;
						
						String mail = null;
						if(!((emailTo.replaceAll("\\s", "")).equalsIgnoreCase(""))){
							mail = emailTo;
						}else {
							mail = dto.getEmailId();
						}
						
					
						// message info
						String subject = labName+" Report";
						String message = "Dear <b>" + dto.getPatientname() + "</b>," + "<br>" + "<br>" +
								"Thank you for registering with us." + "<br>"
					         	+ " Please find your  <b>Lab Test Report</b>  click on this link : <br>"+filePath+ "<br>"
							  + "<br>"
								
								//+ " Please find your attached <b>Lab Test Report</b><br><br>"

								+ " Conditions on reporting" + "<br>" 
								+ "1.This is a computer generated report." + "<br>"
								+ "2.Partial reproduction of this report is not permitted." + "<br>" + "" + "<br>"
								
								+ "<i>This is an auto-generated email. Do not reply to this email id.<i><br><br>"
								
								+ "<b>Regards</b>," + "<br>" + "<b>"+regards+"</b>" + "<br>" + "<br>"

								
								+ "<b>Disclaimer -</b>" + "<br>"
								+ "<i>This e-mail may contain confidential information which is the property of "+labName+". It is intended only for the use of the individual or entity to which it is addressed. If you are not "
								+ " the intended recipient, you are not authorized to read,retain,copy, print,distribute or use the contents of this e-mail. If you have received this communication in error please notify the "
								+ " sender & delete all copies of this message. "+labName+" does not accept any liability for virus infected mails</i>.";
						
							String mailSendFrom = resourceBundle.getObject("mailSendFrom").toString();
							
							//String mailStatus = WhatsAppApi.sendEmailUsingMsg91Domain(mail, subject, message, "", "", "1", emailCC);
							String mailStatus = WhatsAppApi.emailSendFromGmail(mail, subject, message, filePath, "", "1",emailCC);
							phelbotomyService.updateEmailStatus(dto.getMasterId(), dto.getTreatmentId(), dto.getGender(), unitId, mailStatus, userId);
						
					}else {

					String pName = dto.getPatientname().replaceAll("\\s", "");
					String pNamee = dto.getPatientname().replaceAll("  ", " ");
					
					
					RequestDispatcher rd = null;
					//rd = request.getRequestDispatcher("/pathology_template_generatedpost.jsp?" + "&treatmentId="
					//	+ obj.getTreatmentId() + "&masterIdd=" + obj.getMasterId() + "&gender=" + obj.getGender() + "&emailTo=" + emailId
					//	+ "&patientName=" + obj.getPatientName()+"&patientId=" + obj.getPatientId());
					rd = request.getRequestDispatcher("/pathology_patientwise_report_mail_print_by_post.jsp?" + "&treatmentId="
							+ dto.getTreatmentId() + "&masterIdd=" +idList + "&gender=" +  dto.getGender()+ "&patientName=" + dto.getPatientname());
					System.err.println("covideeeeeeeeee");
					try {
						rd.forward(request, res);
					} catch (ServletException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
					
					
					final String labReportPath = FilePath.getLabReportPath() + File.separator +
							dto.getMasterId() + File.separator + pName + File.separator +pName+".pdf";
					String filePath = labReportPath.replace("\\", "/");
					
					/*final String labReportPath = ReportUrlSmsLink+FilePath.getLabReportPath() + File.separator +
							dto.getMasterId() + File.separator + pName + File.separator +pName+".pdf";
					String filePath = labReportPath.replace("\\", "/");
					
					if(ReportUrlSmsLink.equalsIgnoreCase("https://disha.lifenitywellness.com") || ReportUrlSmsLink.equalsIgnoreCase("https://disha.pluscare.org") || ReportUrlSmsLink.equalsIgnoreCase("https://nashik.pluscare.org")) {
						filePath = WhatsAppApi.convertUrlIntoTinyUrl(filePath);
					}*/
					
					// To send Lab Report through whatsapp.
					//RegistrationController.sendSmsForDishaUrl(labReportPath, pNamee, dto.getMobile());
					
					String mail = null;
					if(!((emailTo.replaceAll("\\s", "")).equalsIgnoreCase(""))){
						mail = emailTo;
					}else {
						mail = dto.getEmailId();
					}
					
				
					// message info
					String subject = labName+" Report";
					String message = "Dear <b>" + dto.getPatientname() + "</b>," + "<br>" + "<br>" +
							"Thank you for registering with us." + "<br>"
							//+ " Please find your  <b>Lab Test Report</b>  click on this link : <br>"+filePath+ "<br>"
							//+ "<br>"
							
							+ " Please find your attached <b>Lab Test Report</b><br><br>"

							+ " Conditions on reporting" + "<br>" 
							+ "1.This is a computer generated report." + "<br>"
							+ "2.Partial reproduction of this report is not permitted." + "<br>" + "" + "<br>"
							
							+ "<i>This is an auto-generated email. Do not reply to this email id.<i><br><br>"
							
							+ "<b>Regards</b>," + "<br>" + "<b>"+regards+"</b>" + "<br>" + "<br>"

							
							+ "<b>Disclaimer -</b>" + "<br>"
							+ "<i>This e-mail may contain confidential information which is the property of "+labName+". It is intended only for the use of the individual or entity to which it is addressed. If you are not "
							+ " the intended recipient, you are not authorized to read,retain,copy, print,distribute or use the contents of this e-mail. If you have received this communication in error please notify the "
							+ " sender & delete all copies of this message. "+labName+" does not accept any liability for virus infected mails</i>.";
					
						String mailSendFrom = resourceBundle.getObject("mailSendFrom").toString();
						
						//String mailStatus = WhatsAppApi.sendEmailUsingMsg91Domain(mail, subject, message, "", "", "1", emailCC);
						String mailStatus = WhatsAppApi.emailSendFromGmailWithAttachment(mail, subject, message, filePath, "", "1",emailCC);
						phelbotomyService.updateEmailStatus(dto.getMasterId(), dto.getTreatmentId(), dto.getGender(), unitId, mailStatus, userId);
					}
						
				
				}
				
				
				
		}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return "Email send successfully.";
	}
	
	
	/*************************************************************************
	  * @author Kishor Lokhande
	  * @since 16-06-2021
    * @comment This method is to get Sample type list from treatment id
	  * @param request
	  * @return
   *************************************************************************/	
	 @RequestMapping(value = "/getSampleTypeListFromTid", method = RequestMethod.POST)
	 public @ResponseBody PathologySampleWiseMaster getSampleTypeListFromTid(Integer patientId,Integer treatmentId, String callFrom, HttpServletRequest request) {	  
		     log.info("getSampleTypeListFromTid()...start");
		     
		    List<PathologySampleWiseMaster> listunit=new ArrayList<>();
		    
			listunit = phelbotomyService.getSampleTypeListFromTid(patientId,treatmentId,callFrom,request);
			PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
			obj.setLabSampleWiseMasterDtoList(listunit);
			 log.info("getSampleTypeListFromTid()...end");	
		    return obj;
	}
	
	@RequestMapping(value = "/getSampleWiseProfileFromPackage", method = RequestMethod.POST)
	public @ResponseBody PathologySampleWiseMaster getSampleWiseProfileFromPackage(@RequestParam("unitId") Integer unitId, @RequestParam("businessType") Integer businessType, @RequestParam("serviceId") Integer serviceId, @RequestParam("subServiceId") Integer subServiceId, 
			@RequestParam("patientId") Integer patientId, @RequestParam("treatmentId") Integer treatmentId, @RequestParam("billDetailsId") Integer billDetailsId) {
		    log.info("getSampleWiseProfileFromPackage()...start");		
		    List<PathologySampleWiseMaster> listsample = phelbotomyService.getSampleWiseProfileFromPackage(unitId, businessType, serviceId, subServiceId, patientId, treatmentId, billDetailsId);
			PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
			obj.setLabSampleWiseMasterDtoList(listsample);
			log.info("getSampleWiseProfileFromPackage()...end");
			return obj;
	}

	@RequestMapping(value = "/checkDuplicateServicesFromPackage", method = RequestMethod.POST)
	public @ResponseBody String checkDuplicateServicesFromPackage(@RequestParam("serviceId") Integer serviceId, @RequestParam("subServiceId") Integer subServiceId, 
			@RequestParam("unitId") Integer unitId, @RequestParam("businessType") Integer businessType, @RequestParam("patientId") Integer patientId, 
			@RequestParam("treatmentId") Integer treatmentId, @RequestParam("billDetailsId") Integer billDetailsId){
	
		return phelbotomyService.checkDuplicateServicesFromPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	}
	
	@RequestMapping(value = "/getDefaultBarcodeForPackage", method = RequestMethod.POST)
	public @ResponseBody String getDefaultBarcodeForPackage(@RequestParam("serviceId") Integer serviceId, @RequestParam("subServiceId") Integer subServiceId, 
			@RequestParam("unitId") Integer unitId, @RequestParam("businessType") Integer businessType, @RequestParam("patientId") Integer patientId, 
			@RequestParam("treatmentId") Integer treatmentId, @RequestParam("billDetailsId") Integer billDetailsId){
	
		return phelbotomyService.getDefaultBarcodeForPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	}
	
	@RequestMapping(value = "/checkDuplicateServicesInPackage", method = RequestMethod.POST)
	public @ResponseBody String checkDuplicateServicesInPackage(@RequestParam("serviceId") Integer serviceId, @RequestParam("subServiceId") Integer subServiceId, @RequestParam("editSubServiceId") Integer editSubServiceId,
			@RequestParam("unitId") Integer unitId, @RequestParam("businessType") Integer businessType, @RequestParam("patientId") Integer patientId, 
			@RequestParam("treatmentId") Integer treatmentId, @RequestParam("billDetailsId") Integer billDetailsId){
	
		return phelbotomyService.checkDuplicateServicesInPackage(serviceId, subServiceId, editSubServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	}
	
	@RequestMapping(value = "/getDefaultBarcodeForEditPackage", method = RequestMethod.POST)
	public @ResponseBody String getDefaultBarcodeForEditPackage(@RequestParam("serviceId") Integer serviceId, @RequestParam("subServiceId") Integer subServiceId, 
			@RequestParam("unitId") Integer unitId, @RequestParam("businessType") Integer businessType, @RequestParam("patientId") Integer patientId, 
			@RequestParam("treatmentId") Integer treatmentId, @RequestParam("billDetailsId") Integer billDetailsId){
	
		return phelbotomyService.getDefaultBarcodeForEditPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	}
	
	@RequestMapping(value = "/getDefaultSampleTypeForEditPackage", method = RequestMethod.POST)
	public @ResponseBody Integer getDefaultSampleTypeForEditPackage(@RequestParam("serviceId") Integer serviceId, @RequestParam("subServiceId") Integer subServiceId, 
			@RequestParam("unitId") Integer unitId, @RequestParam("businessType") Integer businessType, @RequestParam("patientId") Integer patientId, 
			@RequestParam("treatmentId") Integer treatmentId, @RequestParam("billDetailsId") Integer billDetailsId){
	
		return phelbotomyService.getDefaultSampleTypeForEditPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	}
	
	@RequestMapping(value = "/checkDuplicateBarcodeForPackage", method = RequestMethod.POST)
	public @ResponseBody long checkDuplicateBarcodeForPackage(@RequestParam("unitId") Integer unitId, @RequestParam("businessType") Integer businessType, @RequestParam("patientId") Integer patientId, 
			@RequestParam("treatmentId") Integer treatmentId, @RequestParam("billDetailsId") Integer billDetailsId, @RequestParam("sampleWiseBarcodes") String sampleWiseBarcodes, @RequestParam("barcode") String barcode
			, @RequestParam("callFrom") String callFrom){
	
		return phelbotomyService.checkDuplicateBarcodeForPackage(unitId, businessType, patientId, treatmentId, billDetailsId, sampleWiseBarcodes, barcode, callFrom);
	}

	@RequestMapping(value = "/getPatientWiseSamples", method = RequestMethod.POST)
	public @ResponseBody PathologySampleWiseMaster getPatientWiseSamples(@RequestParam("unitId") Integer unitId, @RequestParam("testStatus") Integer testStatus, @RequestParam("patientId") Integer patientId, 
			@RequestParam("treatmentId") Integer treatmentId, @RequestParam("callFrom") String callFrom){
	
		return phelbotomyService.getPatientWiseSamples(unitId, testStatus, patientId, treatmentId, callFrom);
	}
	
	/*@RequestMapping(value = "/openLisReportPrint", method = RequestMethod.GET)
	public void openLisReportPrint(
			HttpServletResponse httpServletResponse) throws IOException {
		
		int treatmentId=67;
		int masterIdd=23;
		String gender="Male";
		String patientName1="Mr. RAM LAL";
		String projectUrl = "http://localhost:8080/EhatEnterprise/pathology_routineValueResultLab_PDF.jsp?"+"&treatmentId=" + (treatmentId)+"&masterIdd="+ (masterIdd)+"&gender="+(gender)+"&patientName="+(patientName1);
		
		httpServletResponse.sendRedirect(projectUrl);
	}*/
	
	@RequestMapping(value = "/checkDuplicateCollectionCharges", method = RequestMethod.POST)
	public @ResponseBody Integer checkDuplicateCollectionCharges(@RequestParam("serviceId") Integer serviceId, @RequestParam("subServiceId") Integer subServiceId,
			@RequestParam("unitId") Integer unitId, @RequestParam("businessType") Integer businessType, @RequestParam("patientId") Integer patientId, 
			@RequestParam("treatmentId") Integer treatmentId){
	
		return phelbotomyService.checkDuplicateCollectionCharges(serviceId, subServiceId, unitId, businessType, patientId, treatmentId);
	}	
	
	 /*************************************************************************
	 * @author Dayanand khandekar
	 * @since 22-09-2021
     * @comment This method is used to update template info
    ********
    ******************************************************************/	
 
	 @RequestMapping(value = "/saveTemplateInfo", method = RequestMethod.POST)
	 public @ResponseBody int saveTemplateInfo(PathologyTemplateRotineValueDTO obj,HttpServletRequest request,HttpServletResponse res) {
		   
		    int response = phelbotomyService.saveTemplateInfo(obj,request);
			log.info("saveTemplateInfo()...end");
			
				    return response;
	}
	 
	 
	 /*************************************************************************
		 * @author Dayanand khandekar
		 * @since 22-09-2021
	     * @comment This method is used to get template info by master id
	    *************************************************************************/	
		 @RequestMapping(value = "/getTemplateInfoByMasterId", method = RequestMethod.POST)
		 public @ResponseBody PathologyTemplateRotineValueDTO getTemplateInfoByMasterId(@RequestParam("masterid") Integer masterid,HttpServletRequest request) {
			 PathologyTemplateRotineValueDTO obj=new PathologyTemplateRotineValueDTO();
			 obj = phelbotomyService.getTemplateInfoByMasterId(masterid);
				log.info("getTemplateInfoByMasterId()...end");	
			    return obj;
		}
		 
		 /*************************************************************************
			 * @author Dayanand khandekar
			 * @since 22-09-2021
		     * @comment This method is used to get default template by profile id
		    *************************************************************************/	
			 @RequestMapping(value = "/getDefaultTemplateByProfileId", method = RequestMethod.POST)
			 public @ResponseBody PathologyTemplateMasterDTO getDefaultTemplateByProfileId(@RequestParam("profileId") Integer profileId,HttpServletRequest request) {
				 
				 PathologyTemplateMasterDTO obj=new PathologyTemplateMasterDTO();
				 
				 obj = phelbotomyService.getDefaultTemplateByProfileId(profileId);
					log.info("getDefaultTemplateByProfileId()...end");	
				    return obj;
			}
			 
			 /*************************************************************************
				 * @author Dayanand khandekar
				 * @since 22-09-2021
			     * @comment This method is used to update template info
			    ********
			    ******************************************************************/	
			 @Transactional
				 @RequestMapping(value = "/generatePdfOnServer", method = RequestMethod.POST)
				 public @ResponseBody int generatePdfOnServer(PathologyTemplateRotineValueDTO obj,HttpServletRequest request,HttpServletResponse res) {
					   
				 int response=0;
					    
						if(obj.getCallFrom().equalsIgnoreCase("post")) {
				 		    
							String sql=" select email_id from ehat_patient where patient_id="+obj.getPatientId()+"  ";
							   Query q= sessionfactory.getCurrentSession().createSQLQuery(sql);
							String emailId=   (String) q.uniqueResult();
									RequestDispatcher rd = null;
									//rd = request.getRequestDispatcher("/pathology_template_generatedpost.jsp?" + "&treatmentId="
									//	+ obj.getTreatmentId() + "&masterIdd=" + obj.getMasterId() + "&gender=" + obj.getGender() + "&emailTo=" + emailId
									//	+ "&patientName=" + obj.getPatientName()+"&patientId=" + obj.getPatientId());
									rd = request.getRequestDispatcher("/pathology_template_print_with_header_meesha_by_post.jsp?" + "&treatmentId="
											+ obj.getTreatmentId() + "&masterIdd=" + obj.getMasterId() + "&gender=" +  obj.getGender()+ "&patientName=" + obj.getPatientName());
									System.err.println("covideeeeeeeeee");
									try {
										rd.forward(request, res);
									} catch (ServletException e) {
										e.printStackTrace();
									} catch (IOException e) {
										e.printStackTrace();
									}
									response=1;
								
						}
					    return response;
				}
				/*************************************************************************
				 * @author Rohit Sandbhor
				 * @since 12-09-2021
			     * @comment This method is to get general type from pathology_labtest_generalvalues table
			    *************************************************************************/	
				 @RequestMapping(value = "/getGeneralType", method = RequestMethod.POST)
				 public @ResponseBody String getGeneralType(@RequestParam("generalValue") String generalValue,HttpServletRequest request) {
					    String generalType="";
					    generalType = phelbotomyService.getGeneralType(generalValue,request);
						log.info("getGeneralType()...end");	
					    return generalType;
				}
				 

			 /*************************************************************************
				 * @author ROHIT AMBAWADE
				 * @since 22-11-2021
			     * @comment This method used to update the count for print
			 *************************************************************************/				 
			 @RequestMapping(value = "/savePDFCount", method = RequestMethod.POST)
			 public @ResponseBody Integer savepdfprintcount(@RequestParam("masterId") String masterId) {
				 
				log.info("savePrerequisiteInTreatment..");

				Integer result = phelbotomyService.getPrintCount(masterId);

				log.debug("save print count....." + result);
				return result;
				
			}
			 
			 @RequestMapping(value = "/getRecordCountOnAuthorization", method = RequestMethod.POST)
				public @ResponseBody PathologySampleWiseMaster getRecordCountOnAuthorization(@RequestParam("statusCode")Integer statusCode, 
						@RequestParam("fromDate")String fromDate,@RequestParam("toDate")String toDate, HttpServletRequest request) {
							return phelbotomyService.getRecordCountOnAuthorization(statusCode, fromDate, toDate, request);
				 
			 }
			 
			 // send email 
			 @RequestMapping(value = "/reportingEmail", method = RequestMethod.POST)
				public @ResponseBody String reportingEmail(@RequestParam("id") String idList, @RequestParam("emailTo") String emailTo, @RequestParam("emailCC") String emailCC,@RequestParam("callFrom") String callFrom, HttpServletRequest request,HttpServletResponse res) 
				{

					try {
						HttpSession httpSession = request.getSession();
						Integer unitId = (Integer) httpSession.getAttribute("uId");
						Integer userId = (Integer) httpSession.getAttribute("userId1");// This is User Id

						List<PathologySampleWiseMaster> emailList = phelbotomyService.getemailFileds(idList, request);

						ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
						String ReportUrlSmsLink = (String) resource.getObject("ReportUrlSmsLink").toString();
						ResourceBundle resourceBundle = ResourceBundle.getBundle("SMSFormat");
						String host = resourceBundle.getObject("host").toString();
						String port = resourceBundle.getObject("port").toString();
						final String mailFrom = resourceBundle.getObject("mailFrom").toString();
						final String password = resourceBundle.getObject("password").toString();
						String labName = resourceBundle.getObject("labName").toString();
						String regards = resourceBundle.getObject("regards").toString();
						ResourceBundle resourceEhat = ResourceBundle.getBundle("Ehat");
						String meesha = resourceEhat.getObject("meesha").toString();

						// sets SMTP server properties
						Properties properties = new Properties();
						properties.put("mail.smtp.host", host);
						properties.put("mail.smtp.port", port);
						properties.put("mail.smtp.auth", "true");
						properties.put("mail.smtp.starttls.enable", "true");
						properties.put("mail.user", mailFrom);
						properties.put("mail.password", password);

						// creates a new session with an authenticator
						Authenticator auth = new Authenticator() {
							public PasswordAuthentication getPasswordAuthentication() {
								return new PasswordAuthentication(mailFrom, password);
							}
						};

						for (PathologySampleWiseMaster dto : emailList) {

							String pName = dto.getPatientname().replaceAll("\\s", "");
							String pNamee = dto.getPatientname().replaceAll("  ", " ");

							RequestDispatcher rd = null;

							rd = request.getRequestDispatcher("/pathology_patientwise_report_meesha_by_post.jsp?"
									+ "&treatmentId=" + dto.getTreatmentId() + "&masterIdd=" + idList + "&gender="
									+ dto.getGender() + "&patientName=" + dto.getPatientname());
							System.err.println("covideeeeeeeeee");
							try {
								rd.forward(request, res);
							} catch (ServletException e) {
								e.printStackTrace();
							} catch (IOException e) {
								e.printStackTrace();
							}

							final String labReportPath = ReportUrlSmsLink + "/" + "ehat" + "/" + "sendpathoreport" + "/"
									+ "sendPathologyReport" + "/" + dto.getMasterId() + "/" + pName;
							String filePath = labReportPath;

							String mail = null;
							if (!((emailTo.replaceAll("\\s", "")).equalsIgnoreCase(""))) {
								mail = emailTo;
							} else {
								mail = dto.getEmailId();
							}

							// message info
							String subject = labName + " Report";
							String message = "Dear <b>" + dto.getPatientname() + "</b>," + "<br>" + "<br>"
									+ "Thank you for registering with us." + "<br>"
									+ " Please find your  <b>Lab Test Report</b>  click on this link : <br>" + filePath
									+ "<br>" + "<br>"

									// + " Please find your attached <b>Lab Test Report</b><br><br>"

									+ " Conditions on reporting" + "<br>" + "1.This is a computer generated report."
									+ "<br>" + "2.Partial reproduction of this report is not permitted." + "<br>" + ""
									+ "<br>"

									+ "<i>This is an auto-generated email. Do not reply to this email id.<i><br><br>"

									+ "<b>Regards</b>," + "<br>" + "<b>" + regards + "</b>" + "<br>" + "<br>"

									+ "<b>Disclaimer -</b>" + "<br>"
									+ "<i>This e-mail may contain confidential information which is the property of "
									+ labName
									+ ". It is intended only for the use of the individual or entity to which it is addressed. If you are not "
									+ " the intended recipient, you are not authorized to read,retain,copy, print,distribute or use the contents of this e-mail. If you have received this communication in error please notify the "
									+ " sender & delete all copies of this message. " + labName
									+ " does not accept any liability for virus infected mails</i>.";

							// String mailStatus = WhatsAppApi.sendEmailUsingMsg91Domain(mail, subject,
							// message, "", "", "1", emailCC);
							String mailStatus = WhatsAppApi.emailSendFromGmail(mail, subject, message, filePath, "",
									"1", emailCC);
							phelbotomyService.updateEmailStatus(dto.getMasterId(), dto.getTreatmentId(),
									dto.getGender(), unitId, mailStatus, userId);

						}
					} catch (Exception e) {
						e.printStackTrace();
					}
					return "Email send successfully.";

				}
			 
			 /*//Rohini Added
			 @RequestMapping(value = "/getInvstigationPreDetails", method = RequestMethod.GET)
				public @ResponseBody LabTestDTO getInvstigationPreDetails(PathologySampleWiseMaster master, @RequestParam("callfrom") String callFrom,HttpServletRequest request) {
					log.info("getPathologyPreDetails()...start");
					LabTestDTO dto = phelbotomyService.getInvstigationPreDetails(master, callFrom,request);
					log.info("getPathologyPreDetails()...end");
						return dto;
				}
				*/
			 
			 
			 @RequestMapping(value = "/convertReportingToAutorization", method = RequestMethod.POST)
			  public @ResponseBody int convertReportingToAutorization(@RequestParam("masterIdd")String idList,@RequestParam("testSatus") String statusFlag,HttpServletRequest request){
				log.info("convertReportingToAutorization()...start");
				int response=phelbotomyService.convertReportingToAutorization(idList, statusFlag, request);
				log.info("convertReportingToAutorization()...end");
				return response;
			   }	

}