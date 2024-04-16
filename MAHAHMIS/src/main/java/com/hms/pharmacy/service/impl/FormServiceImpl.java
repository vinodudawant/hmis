package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.DoctorDao;
import com.hms.pharmacy.dao.FormDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.FormMaster;
import com.hms.pharmacy.service.DoctorSevice;
import com.hms.pharmacy.service.FormService;

@Service
public class FormServiceImpl implements FormService {

	@Autowired
	FormDao formDao;

	@Override
	@Transactional
	public Boolean saveOrUpdateForm(FormMaster formMaster) {
		if(formMaster.getFormId()==null)
		{
			formMaster.setFormDeleteFlag(0);
			formMaster.setFormAddDate(new Date(new java.util.Date()
					.getTime()));
			formMaster.setFormUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
			FormMaster formMaster2= formDao.getFormByIdForDate(formMaster.getFormId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			formMaster.setFormAddDate(formMaster2.getFormAddDate());
			formMaster.setFormDeleteFlag(0);
			formMaster.setFormUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
				
		
		if (formDao.saveOrUpdateForm(formMaster)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	@Transactional
	public List<FormMaster> getForm() {
		// TODO Auto-generated method stub
		return formDao.getForm();
	}
	
	@Override
	@Transactional
	public Boolean deleteForm(Integer formId) {
		// TODO Auto-generated method stub
		
		return formDao.deleteForm(formId);
	}
	
	@Override
	@Transactional
	public List<FormMaster> getAutoSuggestionFormNames(String letter) {
		// TODO Auto-generated method stub
		return formDao.getAutoSuggestionFormNames(letter);
	}
	
	@Override
	@Transactional
	public List<FormMaster> getFormById(Integer formId) {
		// TODO Auto-generated method stub
		return formDao.getFormById(formId);
	}
}
