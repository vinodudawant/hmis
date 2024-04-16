package com.hms.ivf.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ivf.dto.PreviousFertilityTreatment;
import com.hms.ivf.service.PreviousFertilityTreatmentService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value= "/pfttreat")
public class PreviousFertilityTreatmentController 
{
	@Autowired
	 PreviousFertilityTreatmentService  previousfertilitytreatmentService;
	

	
	@RequestMapping(value = "/pfttreatHistory", method = RequestMethod.POST)
	@ResponseBody	
	public String saveallpreviousFertilityTreatment11(@RequestParam("PreviousFertilityTreatmentDetails") String PreviousFertilityTreatmentDetails ,HttpServletRequest request ) {
			
			
			String response="";
			int result = 0;
			
			PreviousFertilityTreatment objDtoo = (PreviousFertilityTreatment) ConfigUIJSONUtility
					.getObjectFromJSON(PreviousFertilityTreatmentDetails, PreviousFertilityTreatment.class);
			
			
			result=	previousfertilitytreatmentService.saveallpreviousFertilityTreatment22(objDtoo.getLtpft().get(0), request);
			
			if(result==1){
				response = "Data Inserted..";
			}else if(result==2){
				
				response = "Data Updated...";
			}else{
				response = "oops there is some problem..";
			}
			System.out.println("response.........."+response);
		return response;
 }
	
	@RequestMapping(value = "/fetchGynaecologicalStudyDetails", method = RequestMethod.POST)
	public @ResponseBody
	PreviousFertilityTreatment getAllPrevTreatGynecologicalList() {
		PreviousFertilityTreatment ltgynDto = new PreviousFertilityTreatment();
		ltgynDto = previousfertilitytreatmentService.getAllPrevTreatGynecologicalList();
      // System.out.println("List....."+ltgynDto);
		return ltgynDto;
	}
	
	
	@RequestMapping(value="/fetchpfttreatHistory",method = RequestMethod.POST )
	@ResponseBody
	public PreviousFertilityTreatment fetchGynaecologicalHistoryData11(@RequestParam("pid") String pid,
			@RequestParam("tid") String tid)
	
	{
		
		
	    int patientId=Integer.parseInt(pid);
		int treatmentId=Integer.parseInt(tid);
		
		List<PreviousFertilityTreatment> listGynData=new ArrayList<PreviousFertilityTreatment>();
		
		listGynData=previousfertilitytreatmentService.fetchGynHisPrvData(patientId, treatmentId);
	 
		PreviousFertilityTreatment obj = new PreviousFertilityTreatment();
		obj.setLtpft(listGynData); 
		
		return obj;		
	}
	

	

	
	
	
	


}
