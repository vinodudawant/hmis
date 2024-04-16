package com.hms.organdonation.service.impl;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hms.organdonation.dao.OrganDonorConsentFormDao;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorConsentFormDto;
import com.hms.organdonation.service.OrganDonorConsentFormService;

@Service
@Transactional
public class OrganDonorConsentFormServiceImpl implements OrganDonorConsentFormService {
	
	@Autowired
	OrganDonorConsentFormDao organDonorConsentFormDao;

	@Override
	public int saveOrganDonorConsentForm(OrganDonorConsentFormDto obj,
			Integer organDonorId, Integer treatmentId,Integer checkupListId, MultipartFile[] uploadConsentFormDocs, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorConsentFormDao.saveOrganDonorConsentForm(obj, organDonorId, treatmentId,checkupListId,uploadConsentFormDocs,request);
	}

	@Override
	public OrganDonorConsentFormDto editOrganDonorConsentForm(
			Integer consentFormId) {
		// TODO Auto-generated method stub
		return organDonorConsentFormDao.editOrganDonorConsentForm(consentFormId);
	}

	@Override
	public List<OrganDonorConsentFormDto> getAllOrganDonorConsentForm(HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		return organDonorConsentFormDao.getAllOrganDonorConsentForm(request, fromDate, lastDate);
	}

	@Override
	public boolean deleteOrganDonorConsentForm(Integer consentFormId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorConsentFormDao.deleteOrganDonorConsentForm(consentFormId, request);
	}

	@Override
	public List<OrganDonorConsentFormDto> organDonorConsentFormAutoSuggestion(
			Integer consentFormId, String callFrom) {
		// TODO Auto-generated method stub
		return organDonorConsentFormDao.organDonorConsentFormAutoSuggestion(consentFormId, callFrom);
	}

	@Override
	public OrganDonationRegistrationDto getOrganDonorById(Integer organDonorId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorConsentFormDao.getOrganDonorById(organDonorId, request);
	}

	@Override
	public OrganDonorCheckupListDto getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(
			Integer organDonorId, Integer checkupListId, Integer treatmentId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorConsentFormDao.getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(
				 organDonorId,  checkupListId,  treatmentId,
				 request);
	}
	

}
