package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.DocMasterDto;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dto.FileUpdationDto;
import com.hms.ehat.dto.PatientDocMasterDto;
import com.hms.ehat.dto.PatientDocSlaveDto;
import com.hms.ehat.service.PatientDocService;

@Controller
@RequestMapping(value="/patientdoc")
public class PatientDocController {
	@Autowired
	PatientDocService patientdocservise;
	@RequestMapping(value="/savePatientDoc")
	@ResponseBody	
	public int  savePatientDoc(PatientDocMasterDto masterobj,@RequestParam("docId") String docId,FileUpdationDto fileupobj){
		
		PatientDocMasterDto obj=new PatientDocMasterDto();
	int reponse=	patientdocservise.savePatientDoc(masterobj, docId,fileupobj);
			/*String msg="";
			if(reponse==1)
			{
				msg="Saved Successfully";
			}else if(reponse==2){
				
				msg="updated Successfully";
			}else if(reponse==3){
				
				msg="Shelf Size is full";
			}
			else
			{
				msg="opps some pbm occurse";
			}*/
		return reponse;
   }

	@RequestMapping(value="/viewPatientDocDetails")
	@ResponseBody	
	public  PatientDocSlaveDto viewPatientDocDetails(@RequestParam("patId") Integer patId,@RequestParam("callFrom") String callFrom ){
		
		PatientDocSlaveDto obj=new PatientDocSlaveDto();
		List<PatientDocSlaveDto> tlist=new ArrayList<PatientDocSlaveDto>();
	 tlist=	patientdocservise.viewPatientDocDetails(patId,callFrom);
	 obj.setLstPatintSalve(tlist);
	 return obj;
			
   }
	
	@RequestMapping(value="/getAllPatientTreatmentByPatientId",method = RequestMethod.GET)
	@ResponseBody	
	public  DocUploadDto getAllPatientTreatmentByPatientId(@RequestParam("patientId") Integer patientId ){
		
		DocUploadDto obj=new DocUploadDto();
		Set<Integer> tlist=new HashSet();
	 tlist=	patientdocservise.getAllPatientTreatmentByPatientId(patientId);
	 obj.setTreatlist(tlist);
	 return obj;
			
   }	
	
	@RequestMapping(value="/getPatientDetailByShelf",method = RequestMethod.GET)
	@ResponseBody	
	public  PatientDocMasterDto getPatientDetailByShelf(@RequestParam("shelfID") Integer shelfID ){
		
		PatientDocMasterDto obj=new PatientDocMasterDto();
		List<PatientDocMasterDto> tlist=new ArrayList<PatientDocMasterDto>();
	 tlist=	patientdocservise.getPatientDetailByShelf(shelfID);
	 obj.setLstPatintMaster(tlist);
	 return obj;
			
   }
	
	@RequestMapping(value = "/deletePatientfDocDetailByDocID", method = RequestMethod.GET)
	public @ResponseBody
	String deletePatientfDocDetailByDocID(@RequestParam("docId") Integer docId,HttpServletRequest request) {
		boolean response = patientdocservise.deletePatientfDocDetailByDocID(docId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}	
	@RequestMapping(value="/getAllTreatMentByPatientId")
	@ResponseBody	
	public DocMasterDto getAllTreatMentByPatientId(@RequestParam("deparId") Integer deptId,@RequestParam("patId") Integer patId,
	@RequestParam("callFrom") String  Callform){
		
		DocMasterDto obj=new DocMasterDto();
		List<DocMasterDto> tlist=	patientdocservise.getAllTreatMentByPatientId(deptId, patId, Callform);
		obj.setLstDocmaster(tlist);
		return obj;
	}
	@RequestMapping(value="/getCountDetailOfDMSAndMRD")
	@ResponseBody	
	public DocMasterDto getCountDetailOfDMSAndMRD(@RequestParam("fdate") String fromDate,@RequestParam("todate") String toDate){
		
		DocMasterDto obj=new DocMasterDto();
		List<Integer> lstCount=patientdocservise.getCountDetailOfDMSAndMRD(fromDate, toDate);
		//obj.setLstDocUpload(tlist);
		obj.setLstCount(lstCount);
		return obj;
	}
	

@RequestMapping(value="/getTreatMentCount",method = RequestMethod.GET)
@ResponseBody	
public  int getTreatMentCount(@RequestParam("treatmentId") Integer treatmentId ){	

 return patientdocservise.getTreatMentCount(treatmentId);
		
}	
}
