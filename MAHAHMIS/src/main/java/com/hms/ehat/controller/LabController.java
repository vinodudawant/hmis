package com.hms.ehat.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.Labheadings;
import com.hms.ehat.dto.LabRequestDTO;
import com.hms.ehat.dto.LabResultMstViewDto;
import com.hms.ehat.dto.LabTestResultDto;
import com.hms.ehat.service.LabService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value = "/lab")
public class LabController {

	@Autowired
	LabService labService;
	
	/*@RequestMapping(value = "/deleteChragesSlave", method = RequestMethod.POST)
	public @ResponseBody
	String deleteChragesSlave(@RequestParam("slaveId") Integer slaveId,
			HttpServletRequest request) {

		boolean response = chargesSlaveService.deleteChragesSlave(slaveId,
				request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}*/
	
	@RequestMapping(value="/sendToLab",method = RequestMethod.POST)
	@ResponseBody
	public int sendToLab(@RequestParam("patientId") int patientId,
						 @RequestParam("treatmentId") int treatmentId,
						 @RequestParam("subList") String subList,
						 @RequestParam("deptId") int deptId,
						 HttpServletRequest request
						){
		int requestID = 0;
		
		int labReqId  = labService.sendToLab(patientId,treatmentId,
											 subList,deptId,request);
		
		return labReqId;
	}
	
	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 01-Feb-2018
	 * @code For saving or updating Patient Lab Test Result records.
	 ***/
	@RequestMapping(value="/saveLabTestResult",method = RequestMethod.POST)
	@ResponseBody
	public int saveLabTestResult(@RequestParam("labReqMstId") int labReqMstId,
			@RequestParam("reportdueDateTime") String reportdueDateTime,
			@RequestParam("pathologistId") int pathologistId,
			@RequestParam("txtReportNote") String txtReportNote,
			@RequestParam("labResultDetails") String labResultDetails,
			@RequestParam("btnType") String btnType,
			HttpServletRequest request) throws ParseException{
		//01/02/2018 22:15:00 
		Date date=new SimpleDateFormat("dd/MM/yyyy HH:mm").parse(reportdueDateTime);
		int response=0;
		LabRequestDTO labReqDto = new LabRequestDTO();
		labReqDto.setLabRequestId(labReqMstId);
		labReqDto.setPathologistId(pathologistId);
		labReqDto.setReportDueDatetime(new Date(date.getTime()));
		labReqDto.setAdvice(txtReportNote);
		
		LabTestResultDto labResultDto = (LabTestResultDto) ConfigUIJSONUtility
				.getObjectFromJSON(labResultDetails, LabTestResultDto.class);
		//call for update ehat_lab_reuest.
		response=labService.updateLabRequestMst(labReqDto,btnType,request);
		if(response!=0){
		//Call service method for save and update ehat_lab_test_result.
		response = labService.saveLabTestResult(labResultDto,request);
		}
		return response;
	}
	
	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 05-Feb-2018
	 * @code For saving or updating Patient Lab Test Result records.
	 ***/
	@RequestMapping(value="/fetchonloadTestResult",method = RequestMethod.POST)
	@ResponseBody
	public LabRequestDTO fetchonloadTestResult(@RequestParam("labReqMstId") int labReqMstId,
			HttpServletRequest request) throws ParseException{
		LabRequestDTO labReq=new LabRequestDTO();
		labReq=labService.fetchonloadTestResult(labReqMstId,request);
		return labReq;
		
	}
	
	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 05-Feb-2018
	 * @code check sample Collect or not.
	 ***/
	@RequestMapping(value="/checkSampleCol",method = RequestMethod.POST)
	@ResponseBody
	public String checkSampleCol(@RequestParam("labReqMstId") int labReqMstId,
			HttpServletRequest request){
		String smplColFlag="";
		smplColFlag=labService.checkSampleCol(labReqMstId,request);
		return smplColFlag;
		
	}
	
	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 06-Feb-2018
	 * @code check sample Accept or not.
	 ***/
	@RequestMapping(value="/checkSamplAccpted",method = RequestMethod.POST)
	@ResponseBody
	public String checkSamplAccpted(@RequestParam("labReqMstId") int labReqMstId,
			HttpServletRequest request){
		String smplColFlag="";
		smplColFlag=labService.checkSamplAccpted(labReqMstId,request);
		return smplColFlag;
		
	}
	
	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 06-Feb-2018
	 * @code for getLabTestPatientSearch.
	 ***/
	@RequestMapping(value="/getLabTestPatientSearch",method = RequestMethod.POST)
	@ResponseBody
	public LabResultMstViewDto getLabTestPatientSearch(@RequestParam("strValue") String strValue,
			@RequestParam("strBarcode") String strBarcode,
			@RequestParam("txtFdate") String txtFdate,
			@RequestParam("txtTdate") String txtTdate,
			@RequestParam("type") String type,
			HttpServletRequest request){
	//	System.err.println("strValue="+strValue+"strBarcode="+strBarcode+" txtFdate="+txtFdate+" txtTdate="+txtTdate+" type="+type);
		LabResultMstViewDto labResultPatRecord=new LabResultMstViewDto();
		labResultPatRecord=labService.getLabTestPatientSearch(strValue,strBarcode,txtFdate,txtTdate,type,request);
		return labResultPatRecord;
	}
	
	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 06-Feb-2018
	 * @code for Authorized Lab Report.
	 ***/
	@RequestMapping(value="/changeStatusOfLabRprt",method = RequestMethod.POST)
	@ResponseBody
	public String changeStatusOfLabRprt(@RequestParam("labReqIdList") String labReqIdList,
			@RequestParam("type") String type,
			HttpServletRequest request){
		System.err.println("labReqIdList="+labReqIdList +" && type="+type);
		String resMsg="";
		int res=0;
		res=labService.changeStatusOfLabRprt(type, labReqIdList,request);
		if(res>0){
			if(type.equalsIgnoreCase("hold")){
				resMsg="Lab Result Hold successfully..";
			}else if(type.equalsIgnoreCase("recall")){
				resMsg="Lab Result Recall successfully..";
			}else if(type.equalsIgnoreCase("bktocrnt")){
				resMsg="Lab Result Back To Current successfully..";
			}else if(type.equalsIgnoreCase("post")){
				resMsg="Lab Result Posted successfully..";
			}else if(type.equalsIgnoreCase("auth") || type.equalsIgnoreCase("authselect")){
				resMsg="Lab Result Authorize successfully..";
			}else{
				resMsg="Lab Result Discard successfully..";
			}
		}else{
			resMsg="Network issue...";
		}
		return resMsg;
	}

	
	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 09-March-2018
	 * @code For saving or updating Patient Lab Test Template records.
	 ***/
	@RequestMapping(value="/savePatientTestTemplate",method = RequestMethod.POST)
	@ResponseBody
	public int savePatientTestTemplate(@RequestParam("labResultDetails") String labResultDetails,
			@RequestParam("testTemplate") String testTemplate,
			HttpServletRequest request) throws ParseException{
		int response=0;
		LabTestResultDto labResultDto = (LabTestResultDto) ConfigUIJSONUtility
				.getObjectFromJSON(labResultDetails, LabTestResultDto.class);
		labResultDto.getListLabResultDto().get(0).setTestTemplate(testTemplate);
		//call for update ehat_lab_reuest.
		response=labService.savePatientTestTemplate(labResultDto.getListLabResultDto().get(0),request);
		
		return response;
	}
	
	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 27-March-2018
	 * @code For get Headings and package name for Lab Formula records.
	 ***/
	@RequestMapping(value="/getLabFormulaHeading",method = RequestMethod.POST)
	@ResponseBody
	public Labheadings getLabFormulaHeading(@RequestParam("type") String type,
			HttpServletRequest request) throws ParseException{

		return labService.getLabFormulaHeading(type,request);
	}
	
/**
 * @author Laxman Nikam
 * @throws ParseException 
 * @date 27-March-2018
 * @code For get Profile under headings and package for Lab Formula records.
 ***/
@RequestMapping(value="/featchLabFormulaPro",method = RequestMethod.POST)
@ResponseBody
public Labheadings featchLabFormulaPro(@RequestParam("isCategory") String isCategory,
		@RequestParam("idHed") String idHed,
		@RequestParam("type") String type,
		HttpServletRequest request) throws ParseException{

	return labService.featchLabFormulaPro(isCategory,idHed,type,request);
}

@RequestMapping(value="/getStringValOfObject",method = RequestMethod.POST)
@ResponseBody
public String getStringValOfObject(@RequestParam("tableName") String tableName,
		@RequestParam("columnName") String columnName,
		@RequestParam("pkId") Integer pkId,
		@RequestParam("pkColumn") String pkColumn,
		HttpServletRequest request) throws ParseException{

	return labService.getStringValOfObject(tableName,columnName,pkId,pkColumn);
}

@RequestMapping(value="/getAllOPDPatientsCount",method = RequestMethod.GET)
@ResponseBody
public int getAllOPDPatientsCount(){
	
	return labService.getAllOPDPatientsCount();
}

@RequestMapping(value="/getTodaysOPDPatientsCount",method = RequestMethod.GET)
@ResponseBody
public int getTodaysOPDPatientsCount(){
	
	return labService.getTodaysOPDPatientsCount();
}
}
