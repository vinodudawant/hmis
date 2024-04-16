package com.hms.ipd.controller;

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
import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.dto.DischargeSummery;
import com.hms.dto.PaediatricDept;
import com.hms.dto.PaediatricDeptNICU;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipd.service.IPD_AutoSummaryService;

@Controller
@RequestMapping(value = "/IpdAuto_Summary")
public class IPD_AutoSummaryController
{
	@Autowired
	IPD_AutoSummaryService Asummary;
	
	@ResponseBody
	@RequestMapping(value="/fetchPatientAdmissionNote", method = RequestMethod.POST)
	public 	TreatmentDto fetchPatientAdmissionNote(@RequestParam("treatmentId") String treatmentId,@RequestParam("pid") String pid) {
		
		int tid = Integer.parseInt(treatmentId);
		int patient_id = Integer.parseInt(pid);
		
		TreatmentDto treatment =new TreatmentDto();
		treatment.setTreatmentId(tid);
		treatment.setPatientId(patient_id);
		
		List<TreatmentDto> treatmentList = new ArrayList<TreatmentDto>();
		treatmentList = Asummary.fetchPatientAdmissionNote(treatment);
		//Convert result into JSON object 
		TreatmentDto objtreatment = new TreatmentDto();
		objtreatment.setListTreatment(treatmentList);
		
		return objtreatment;
	}
	
	@RequestMapping(value = "/lisofDiagonosis", method = RequestMethod.POST)
	@ResponseBody
	public List<DiagonosisMasterDto> getListOfDiagonosis(@RequestParam("treatmentId") int treatmentId) {
		List<DiagonosisMasterDto> response = Asummary.getListOfDiagoList(treatmentId);
		return response;

	}
	
	
	@RequestMapping(value = "/saveAutoDischargeSummery", method = RequestMethod.POST)
	public @ResponseBody String saveAutoDischargeSummery(DischargeSummery obj,
			PaediatricDept paediatricDept,@RequestParam("NicuObj") String nicuObj,@RequestParam String adNote){
			
		String r="";
	//	String adNote = request.getParameter("adNote");
		Gson gson = new Gson();
		PaediatricDeptNICU fromJson = gson.fromJson(nicuObj, PaediatricDeptNICU.class);
		System.out.println("adNote------->"+adNote);
		obj.setPaediatricDept(paediatricDept);
		int response = Asummary.saveAutoDischargeSummery(obj , adNote ,fromJson);
		if(response==1){
			r = "Discharge Summary is Saved successfully..";
		}else if(response==2){
			
			r = "Discharge Summary is Updated successfully..";
		}
		/*
		 * else if(response==3) { r =
		 * "Discharge Summary Already Saved in Template Wise Please Check.."; }
		 */
		else{
			r = "oops there is some problem..";
		}
	
		return r;
	}
	
	
	@RequestMapping(value = "/fetchAutoDischargeSummery", method = RequestMethod.POST)
	 @ResponseBody
	 public	DischargeSummery fetchAutoDischargeSummery(@RequestParam("treatment_ID") String tId) {
		
	//	int patientId=Integer.parseInt(pId);
		int treatmentId=Integer.parseInt(tId);
		
		List<DischargeSummery> dsList = new ArrayList<DischargeSummery>();
		dsList = Asummary.fetchAutoDischargeSummery(treatmentId);
	
		DischargeSummery obj = new DischargeSummery();
		obj.setDsList(dsList);
		return obj;
		
	}
	
	
	@RequestMapping(value = "/updateAdmissionNote", method = RequestMethod.POST)
	 @ResponseBody
	 public	int updateAdmissionNote(@RequestParam("treatID") int treatmentId,@RequestParam("adNote") String adNote) {
		
		int res = Asummary.updateAdmissionNote(treatmentId, adNote);
	
	
		return res;
		
	}
	

}
