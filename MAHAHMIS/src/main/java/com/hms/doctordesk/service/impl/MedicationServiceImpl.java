package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.MedicationDao;
import com.hms.doctordesk.dto.MedicationMaster;
import com.hms.doctordesk.service.MedicationService;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.UomMaster;

@Service
@Transactional
public class MedicationServiceImpl implements MedicationService{

	@Autowired
	MedicationDao medicationDao;
	
	@Override
	public String saveMedication(MedicationMaster medicationMaster,HttpServletRequest request) {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
		return medicationDao.saveMedication(medicationMaster,request);
	}

	@Override
	public List<MedicationMaster> getMedication(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return medicationDao.getMedication(request);
	}

	@Override
	public List<CompanyMaster> getCompanies() {
		// TODO Auto-generated method stub
		return medicationDao.getCompanies();
	}

	@Override
	public List<PreparationMaster> getPrepNames() {
		// TODO Auto-generated method stub
		return medicationDao.getPrepNames();
	}

	@Override
	public List<UomMaster> getUoms() {
		// TODO Auto-generated method stub
		return medicationDao.getUoms();
	}

	@Override
	public List<MedicationMaster> getMedicationById(int id) {
		// TODO Auto-generated method stub
		return medicationDao.getMedicationById(id);
	}

	@Override
	public MedicationMaster medicineAutoSuggestion(String productName, String prepName, String comName,
			String callFrom) {
		// TODO Auto-generated method stub
		return medicationDao.medicineAutoSuggestion(productName, prepName, comName, callFrom);
	}

	@Override
	public List<MedicationMaster> getUnitAndStrength(int id) {
		// TODO Auto-generated method stub
		return medicationDao.getUnitAndStrength(id);
	}

	@Override
	public String deleteMedicines(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return medicationDao.deleteMedicines(id, request);
	}

	@Override
	public List<MedicationMaster> medSuggesstionForSearch(String productName,
			String callFrom,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return medicationDao.medSuggesstionForSearch(productName,callFrom,request);
	}

	@Override
	public List<ProductMaster> autoSuggestionProductlist(String callForm, String letter, String prep, String comName) {
		return medicationDao.autoSuggestionProductlist(callForm, letter, prep, comName);
	}
	
	

	
}
