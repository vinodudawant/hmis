package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.hms.doctordesk.dto.ClinicalEvolutionMasterDto;
import com.hms.doctordesk.service.ClinicalEvolutionMasterService;


@RestController
@RequestMapping(value="/clinical_evolution_master")
public class ClinicalEvolutionMasterController {
	
	@Autowired
	ClinicalEvolutionMasterService clinicalEvolutionMasterService;
	
	static {
		System.out.println("stateDemoController Loaded...!");
	}

	@RequestMapping(value = "/saveClinicalEvolutionMaster", method = RequestMethod.POST)
	public int saveClinicalEvolutionMaster(ClinicalEvolutionMasterDto clinical, HttpServletRequest request) {
		System.out.println(clinical);
		//String msg = "";
		int response = clinicalEvolutionMasterService.saveClinicalEvolutionMaster(clinical, request);
		// return "Y";
		return response;
	}
	
	@RequestMapping(value = "/getAllClinialEvolutionMaster", method = RequestMethod.GET)
	public @ResponseBody
	ClinicalEvolutionMasterDto getAllClinialEvolutionMaster(HttpServletRequest request) {
		List<ClinicalEvolutionMasterDto> lstClinicalEvolutionMaster = new ArrayList<ClinicalEvolutionMasterDto>();
		lstClinicalEvolutionMaster = clinicalEvolutionMasterService.getAllClinialEvolutionMaster(request);
		ClinicalEvolutionMasterDto obj = new ClinicalEvolutionMasterDto();
		obj.setLstclinicalevolutionMaster(lstClinicalEvolutionMaster);
		return obj;
	}
	
	@RequestMapping(value = "/editClinicalEvolutionMaster", method = RequestMethod.GET)
	public @ResponseBody
	ClinicalEvolutionMasterDto editClinicalEvolutionMaster(@RequestParam("clinicalId") Integer clinicalId) {
		ClinicalEvolutionMasterDto obj = new ClinicalEvolutionMasterDto();
		obj = clinicalEvolutionMasterService.editClinicalEvolutionMaster(clinicalId);	
		return obj;
	}	
	
	@RequestMapping(value = "/deleteClinicalEvolutionMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteClinicalEvolutionMaster(@RequestParam("clinicalId") Integer clinicalId,HttpServletRequest request) {
		System.out.println("clinicalId :"+clinicalId);
		boolean response = clinicalEvolutionMasterService.deleteClinicalEvolutionMaster(clinicalId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		return msg;
	}	
	@RequestMapping(value = "/centerClinicalEvolutionAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	ClinicalEvolutionMasterDto centerClinicalEvolutionAutoSuggestion(@RequestParam("clinicalName")String clinicalName,@RequestParam("clinicalCode")String clinicalCode) {
		List<ClinicalEvolutionMasterDto> lstClinicalevolutionMaster = new ArrayList<ClinicalEvolutionMasterDto>();
		lstClinicalevolutionMaster = clinicalEvolutionMasterService.centerClinicalEvolutionAutoSuggestion(clinicalName,clinicalCode);
		ClinicalEvolutionMasterDto obj = new ClinicalEvolutionMasterDto();
		obj.setLstclinicalevolutionMaster(lstClinicalevolutionMaster);
		return obj;
	}
	

}
