package com.hms.organdonation.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Doctor;
import com.hms.dto.FetchTitleDTO;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
public interface OrganDonorCheckupListService {

	int saveOrganDonorCheckupList(OrganDonorCheckupListDto obj,Integer organDonorId,Integer treatmentId,
			HttpServletRequest request);

	OrganDonorCheckupListDto editOrganDonorCheckupList(Integer checkupListId);
	
	List<OrganDonorCheckupListDto> getAllOrganDonorCheckupList(	HttpServletRequest request,String fromDate,String lastDate);
	
	boolean deleteOrganDonorCheckupList(Integer checkupListId,Integer donarTreatmentId,
			HttpServletRequest request);

	List<FetchTitleDTO> getAllTitle(HttpServletRequest request);
	
	List<Doctor> getAllDoctors(HttpServletRequest request);

	List<OrganDonorCheckupListDto> organDonorCheckupListAutoSuggestion(
			Integer checklistId,String callFrom);

	OrganDonationRegistrationDto getOrganDonorById(Integer organDonorId, HttpServletRequest request);

	OrganDonorTreatmentDto getOrganDonorByIdAndPatientId(Integer organDonorId,
			Integer patientId,Integer treatmentId, HttpServletRequest request);


	List<IntendOrganDonorMasterDto> getOrgansAgainstCheckupList(Integer checkupListId, HttpServletRequest request);

}
