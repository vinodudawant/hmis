package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.hms.ehat.dto.PrePostChecklistDTO;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ehat.dto.nursingAsmentTwoDataDTO;
import com.hms.ehat.service.NursingTransactionServiceNEW;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value ="/nursingtransaction")
public class NursingTransactionControllerNEW 
{

	@Autowired
	NursingTransactionServiceNEW NTService;
		
	@RequestMapping(value = "/SavePrePostChecklist", method = RequestMethod.POST)
	@ResponseBody
	public String savePrePostData(@RequestParam("PrePostDetails") String PrePostDetails,HttpServletRequest request) {
		
		String response="";
		int result = 0;
		PrePostChecklistDTO objDto = (PrePostChecklistDTO) ConfigUIJSONUtility
				.getObjectFromJSON(PrePostDetails, PrePostChecklistDTO.class);

		 result = NTService.savePrePostData(objDto.getNursinAssesmentList().get(0), request);
			if(result==1){
				response = "Data Inserted..";
			}else if(result==2){
				
				response = "Data Updated...";
			}else{
				response = "oops there is some problem..";
			}
		return response;
		
	}
	
	@RequestMapping(value = "/fetchprepostChecklist", method = RequestMethod.POST)
	 @ResponseBody
	 public	PrePostChecklistDTO fetchprepostData(@RequestParam("pId") String pId,
			 @RequestParam("tId") String tId) {
		
		int patientId=Integer.parseInt(pId);
		int treatmentId=Integer.parseInt(tId);
		
		List<PrePostChecklistDTO> listInitial2 = new ArrayList<PrePostChecklistDTO>();
		listInitial2 = NTService.fetchprepostData(patientId,treatmentId);
	
		PrePostChecklistDTO obj = new PrePostChecklistDTO();
		obj.setNursinAssesmentList(listInitial2);
		return obj;
		
	}
	
	
	@RequestMapping(value = "/saveNursingAssessment01", method = RequestMethod.POST)
	@ResponseBody
	public String saveNursingAssessmentData01(@RequestParam("Nursingobj01") String Nursingobj01,HttpServletRequest request) {
		String response="";
		int result = 0;
		nursingAsmentDataDTO objDto = (nursingAsmentDataDTO) ConfigUIJSONUtility
				.getObjectFromJSON(Nursingobj01, nursingAsmentDataDTO.class);
		
		 result = NTService.saveNursingAssessmentData01(objDto.getNursinglist().get(0), request);
			if(result==1){
				response = "Data Inserted..";
			}else if(result==2){
				
				response = "Data Updated...";
			}else{
				response = "oops there is some problem..";
			}
		return response;
		
	}
	
	@RequestMapping(value = "/fetchNursingAssesment1", method = RequestMethod.POST)
	 @ResponseBody
	 public	nursingAsmentDataDTO fetchNursingAs(@RequestParam("pId") String pId,
			 @RequestParam("tId") String tId) {
		
		int patientId=Integer.parseInt(pId);
		int treatmentId=Integer.parseInt(tId);
		
		List<nursingAsmentDataDTO> listInitial2 = new ArrayList<nursingAsmentDataDTO>();
		listInitial2 = NTService.fetchNursingAs(patientId,treatmentId);
	
		nursingAsmentDataDTO obj = new nursingAsmentDataDTO();
		obj.setNursinglist(listInitial2);
		return obj;
		
	}
	
	@RequestMapping(value = "/saveNursingAssessment02", method = RequestMethod.POST)
	@ResponseBody
	public String saveNursingAssessmentData02(@RequestParam("Nursingobj02") String Nursingobj02 ,HttpServletRequest request) {
		String response="";
		int result = 0;
		
		//added by vishant 06/07/2023
		Gson gson = new Gson();
		nursingAsmentTwoDataDTO asmentTwoDataDTO = gson.fromJson(Nursingobj02 , nursingAsmentTwoDataDTO.class);
//		nursingAsmentTwoDataDTO objDto = (nursingAsmentTwoDataDTO) ConfigUIJSONUtility
//				.getObjectFromJSON(Nursingobj02, nursingAsmentTwoDataDTO.class);
		//System.out.println(asmentTwoDataDTO);
			
		 result = NTService.saveNursingAssessmentData02(asmentTwoDataDTO.getNursinglist02().get(0), request);
			if(result==1){
				response = "Data Inserted..";
			}else if(result==2){
				
				response = "Data Updated...";
			}else{
				response = "oops there is some problem..";
			}
		return response;
		
	}
	
	@RequestMapping(value = "/fetchNursingAssesment2", method = RequestMethod.POST)
	 @ResponseBody
	 public	nursingAsmentTwoDataDTO fetchNursingAs02(@RequestParam("pId") String pId,
			 @RequestParam("tId") String tId) {
		
		int patientId=Integer.parseInt(pId);
		int treatmentId=Integer.parseInt(tId);
		
		List<nursingAsmentTwoDataDTO> listInitial02 = new ArrayList<nursingAsmentTwoDataDTO>();
		listInitial02 = NTService.fetchNursingAs02(patientId,treatmentId);
	
		nursingAsmentTwoDataDTO obj = new nursingAsmentTwoDataDTO();
		obj.setNursinglist02(listInitial02);
		return obj;
		
	}
	
}
