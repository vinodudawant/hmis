package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.FormMaster;

public interface FormDao {
	
	Boolean saveOrUpdateForm(FormMaster formMaster);

	List<FormMaster> getForm();

	Boolean deleteForm(Integer formId);

	List<FormMaster> getAutoSuggestionFormNames(String letter);

	List<FormMaster> getFormById(Integer formId);
	
	FormMaster getFormByIdForDate(Integer formId);
	
}
