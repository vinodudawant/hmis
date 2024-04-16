package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.MedicationMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.UomMaster;

public interface MedicationService {

	String saveMedication(MedicationMaster medicationMaster,
			HttpServletRequest request);

	List<MedicationMaster> getMedication(HttpServletRequest request);

	List<CompanyMaster> getCompanies();

	List<PreparationMaster> getPrepNames();

	List<UomMaster> getUoms();

	List<MedicationMaster> getMedicationById(int id);

	MedicationMaster medicineAutoSuggestion(String productName,
			String prepName, String comName, String callFrom);

	List<MedicationMaster> getUnitAndStrength(int id);

	String deleteMedicines(int id, HttpServletRequest request);

	List<MedicationMaster> medSuggesstionForSearch(String productName,
			String callFrom, HttpServletRequest request);

	List<ProductMaster> autoSuggestionProductlist(String callForm, String letter, String prep, String comName);

}
