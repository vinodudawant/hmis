package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.FormMaster;

public interface FormService {

	List<FormMaster> getForm();
	Boolean saveOrUpdateForm(FormMaster formMaster);

	Boolean deleteForm(Integer formId);

	List<FormMaster> getAutoSuggestionFormNames(String letter);

	List<FormMaster> getFormById(Integer formId);

}
