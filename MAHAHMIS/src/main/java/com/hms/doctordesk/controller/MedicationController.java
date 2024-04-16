package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.MedicationMaster;
import com.hms.doctordesk.service.MedicationService;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.UomMaster;

@Controller
@RequestMapping(value = "/medication")
public class MedicationController {

	@Autowired
	MedicationService medicationService;

	@RequestMapping(value = "/saveMedication", method = RequestMethod.POST)
	@ResponseBody
	public String saveMedication(MedicationMaster medicationMaster, HttpServletRequest request) {
		String response = medicationService.saveMedication(medicationMaster, request);
		return response;
	}

	@RequestMapping(value = "/companyList", method = RequestMethod.GET)
	@ResponseBody
	public List<CompanyMaster> getCompanyList() {
		List<CompanyMaster> response = medicationService.getCompanies();
		return response;
	}

	@RequestMapping(value = "/prepList", method = RequestMethod.GET)
	@ResponseBody
	public List<PreparationMaster> getPrepList() {
		List<PreparationMaster> response = medicationService.getPrepNames();
		return response;
	}

	@RequestMapping(value = "/uomList", method = RequestMethod.GET)
	@ResponseBody
	public List<UomMaster> getUomList() {
		List<UomMaster> response = medicationService.getUoms();
		return response;
	}

	@RequestMapping(value = "/strengthAndUnit", method = RequestMethod.POST)
	@ResponseBody
	public List<MedicationMaster> getStrengthAndUnit(@RequestParam("id") int id) {
		List<MedicationMaster> response = medicationService.getUnitAndStrength(id);
		return response;
	}

//	@RequestMapping(value = "/medAutoSuggestion", method = RequestMethod.POST)
//	@ResponseBody
//	public MedicationMaster getMedicines(@RequestParam("callform") String callForm, @RequestParam("prep") String prep,
//			@RequestParam("comName") String comName, @RequestParam("productName") String productName) {
//		MedicationMaster response = medicationService.medicineAutoSuggestion(productName, prep, comName, callForm);
//		return response;
//
//	}
	
	/******
	 * @author   : HM00052
	 * @Code     : For medicine auto suggest
	 * *****/
	@RequestMapping(value = "/medAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public ProductMaster autoSuggestionProductlist( // @RequestParam("letter") String letter, @RequestParam("prep") String prep,
					
			@RequestParam("callform") String callForm, @RequestParam("prep") String prep,
			@RequestParam("comName") String comName, @RequestParam("productName") String letter
			
			) {
		
		List<ProductMaster> ListproductMasters = new ArrayList<ProductMaster>();
		
		ProductMaster productMasters = new ProductMaster();
		
		try {
			ListproductMasters = medicationService.autoSuggestionProductlist(callForm, letter, prep, comName );
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		productMasters.setLstprod(ListproductMasters);

		return productMasters;
	}
	@RequestMapping(value = "/medicationList", method = RequestMethod.GET)
	@ResponseBody
	public List<MedicationMaster> getMedications( HttpServletRequest request){
		 List<MedicationMaster> response = medicationService.getMedication(request);
		return response;
		
	}
	@RequestMapping(value = "/medicationById", method = RequestMethod.POST)
	@ResponseBody
	public List<MedicationMaster> getMedications( @RequestParam("medId") int id){
		 List<MedicationMaster> response = medicationService.getMedicationById(id);
		return response;
		
	}
	@RequestMapping(value = "/deleteMedication", method = RequestMethod.POST)
	@ResponseBody
	public String deleteMed(@RequestParam("medId") int id,HttpServletRequest request) {
		String response = medicationService.deleteMedicines(id, request);
		return response;	
	}
	
	@RequestMapping(value = "/medAutoSuggestionForSearch", method = RequestMethod.POST)
	@ResponseBody
	public List<MedicationMaster> getMedicationSearch(@RequestParam("callform")String callform,@RequestParam("medicine")String productName, HttpServletRequest request) {
		 List<MedicationMaster> response = medicationService.medSuggesstionForSearch(productName,callform,request);
		return response;	
	}
}
