package com.hms.ehat.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.DocMasterDto;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dto.DocChecklistDto;
import com.hms.ehat.dto.PatientDocMasterDto;
import com.hms.ehat.dto.PatientDocSlaveDto;
import com.hms.ehat.service.DocMasterService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value="/documentmaster")
public class DocMasterController{
	
	@Autowired
	DocMasterService documentservice;
	@RequestMapping(value="/getAllTreatMentByPatientId")
	@ResponseBody	
	public DocMasterDto getAllTreatMentByPatientId(@RequestParam("deparId") Integer deptId,@RequestParam("patId") Integer patId,
	@RequestParam("callFrom") String  Callform){
		
		DocMasterDto obj=new DocMasterDto();
		List<DocMasterDto> tlist=	documentservice.getAllTreatMentByPatientId(deptId, patId, Callform);
		obj.setLstDocmaster(tlist);
		return obj;
	}
	
	@RequestMapping(value="/getPatientDocDeatil")
	@ResponseBody	
	public DocUploadDto getPatientDocDeatil(@RequestParam("fdate") String fromDate,@RequestParam("todate") String toDate,
			@RequestParam("callform") String callform,DocUploadDto docobj, @RequestParam("findText") String byname1, @RequestParam("callFrom") String patSearchType){
		
		DocUploadDto obj=new DocUploadDto();
		List<DocUploadDto> tlist=documentservice.getPatientDocDeatil(fromDate, toDate,callform,docobj, byname1, patSearchType)	;
		obj.setLstDocUpload(tlist);
		return obj;
	}
	
	@RequestMapping(value="/savePatientDocument")
	@ResponseBody	
	public int savePatientDocument(@RequestParam("docDetails") String docDetails){
		
		int res=0;
		DocUploadDto docobj = (DocUploadDto) ConfigUIJSONUtility.getObjectFromJSON(docDetails, DocUploadDto.class);	
		res = documentservice.savePatientDocument(docobj);		
		return res;
	}
	
	@RequestMapping(value = "/deleteDocDetails", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDocDetails(@RequestParam("docId") Integer docId,HttpServletRequest request) {
		boolean response = documentservice.deleteDocDetails(docId,request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	@RequestMapping(value = "/readDocPath", method = RequestMethod.GET)
	public void readPhoto(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		
		String pathToWeb = "";
		try{			
			String docPath = request.getParameter("docPath");
			pathToWeb = FilePath.getFolderPath(docPath);			
			File f = new File(pathToWeb);
			@SuppressWarnings("resource")
			InputStream is = new FileInputStream(f);	        
	        byte[] buffer = new byte[1024];
	        int length;
	        while ((length = is.read(buffer)) > 0) {
	        	response.getOutputStream().write(buffer, 0, length);
	        }		   
			
		}catch(Exception e){
			
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/getPatientDetailsByTreatment")
	@ResponseBody	
	public PatientDocSlaveDto getPatientDetailsByTreatment(@RequestParam("treatmentId") Integer treatmentId){
		
		PatientDocSlaveDto obj=new PatientDocSlaveDto();
		List<PatientDocSlaveDto> lstPatintSalve=documentservice.getPatientDetailsByTreatment(treatmentId);
		obj.setLstPatintSalve(lstPatintSalve);
		return obj;
	}
	
	@RequestMapping(value="/getAllPatientDocDeatil")
	@ResponseBody	
	public PatientDocMasterDto getAllPatientDocDeatil(@RequestParam("fdate") String fromDate,@RequestParam("todate") String toDate, @RequestParam("findText") String byname1, @RequestParam("callFrom") String patSearchType){
		
		PatientDocMasterDto obj=new PatientDocMasterDto();
		List<PatientDocMasterDto> tlist=documentservice.getAllPatientDocDeatil(fromDate, toDate, byname1, patSearchType);
		obj.setLstPatintMaster(tlist);
		return obj;
	}
	
	@RequestMapping(value="/getAllTreatmentDetailsByPatientId")
	@ResponseBody	
	public DocUploadDto getAllTreatmentDetailsByPatientId(@RequestParam("patientId") Integer patientId){
		
		DocUploadDto obj=new DocUploadDto();
		List<DocUploadDto> tlist=documentservice.getAllTreatmentDetailsByPatientId(patientId);
		obj.setLstDocUpload(tlist);
		return obj;
	}	
	@RequestMapping(value="/deletePatientDocByPatientDocId",method = RequestMethod.GET)
	@ResponseBody	
	public String  deletePatientDocByPatientDocId(@RequestParam("patientDocId") Integer patientDocId,HttpServletRequest request){
		
		PatientDocMasterDto obj=new PatientDocMasterDto();
		boolean response =documentservice.deletePatientDocByPatientDocId(patientDocId,request)	;
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;		
	}	
	
	@RequestMapping(value="/getPatientDetailsByTreatment1")
	@ResponseBody	
	public DocChecklistDto getPatientDetailsByTreatment1(@RequestParam("treatmentId") Integer treatmentId){
		
		DocChecklistDto obj=new DocChecklistDto();
		List<DocChecklistDto> lstChecklistDoc=documentservice.getPatientDetailsByTreatment1(treatmentId);
		obj.setLstChecklistDoc(lstChecklistDoc);
		return obj;
   }	
	
	@RequestMapping(value="/getAllUploadDocDetailBytreatment")
	@ResponseBody	
	public DocChecklistDto getAllUploadDocDetailBytreatment(@RequestParam("treatmentId") Integer treatmentId){
		
		DocChecklistDto obj=new DocChecklistDto();
		obj=documentservice.getAllUploadDocDetailBytreatment(treatmentId);
		
		return obj;
   }	
	
	@RequestMapping(value="/fetchPatientsRecordByTreatmentIdForBarcode",method = RequestMethod.GET)
	@ResponseBody	
	public DocMasterDto fetchPatientsRecordByTreatmentIdForBarcode(@RequestParam("treatmentId") Integer treatmentId){
		
		DocMasterDto obj=new DocMasterDto();
		List<DocMasterDto> tlist=	documentservice.fetchPatientsRecordByTreatmentIdForBarcode(treatmentId);
		obj.setLstDocmaster(tlist);
		return obj;
	}
	
}
