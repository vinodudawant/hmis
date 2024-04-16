package com.hms.organdonation.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorConsentFormDto;

public interface OrganDonorConsentFormService {

	int saveOrganDonorConsentForm(OrganDonorConsentFormDto obj,Integer organDonorId,Integer treatmentId,Integer checkupListId,MultipartFile[] uploadGrnDocs,
			HttpServletRequest request);

	OrganDonorConsentFormDto editOrganDonorConsentForm(Integer checkupListId);
	
	List<OrganDonorConsentFormDto> getAllOrganDonorConsentForm(	HttpServletRequest request,String fromDate,String lastDate);
	
	boolean deleteOrganDonorConsentForm(Integer consentFormId,
			HttpServletRequest request);

	

	List<OrganDonorConsentFormDto> organDonorConsentFormAutoSuggestion(
			Integer consentFormId,String callFrom);

	OrganDonationRegistrationDto getOrganDonorById(Integer organDonorId, HttpServletRequest request);

	OrganDonorCheckupListDto getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(
			Integer organDonorId, Integer checkupListId, Integer treatmentId,
			HttpServletRequest request);

}
