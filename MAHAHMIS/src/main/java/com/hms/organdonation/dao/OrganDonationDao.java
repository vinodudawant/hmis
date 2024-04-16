package com.hms.organdonation.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.dto.AdminStateDTO;
import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.organdonation.dto.DonorTypeMasterDto;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;

public interface OrganDonationDao {
	
	int saveOrganDonation(OrganDonationRegistrationDto obj,Integer patientId, HttpServletRequest request);

	List<IntendOrganDonorMasterDto> getAllOrgansIntendedToDonate(HttpServletRequest request);

	List<DonorTypeMasterDto> getAllDonorTypeList(HttpServletRequest request);
	
	List<AdminCityDTO> getCityList(HttpServletRequest request);

	List<AdminDistrictDTO> getDistrictList(HttpServletRequest request);

	List<AdminStateDTO> getStateList(HttpServletRequest request);

	List<BloodGroupMaster> getBloodGroupList(HttpServletRequest request);

	List<OrganDonationRegistrationDto> getAllDonorsList(HttpServletRequest request,String fromDate,String lastDate);

	List<OrganDonationRegistrationDto> donorAutoSuggestion(String findText, String callFrom);

	boolean deleteOrganDonor(Integer donorId, HttpServletRequest request);
	
	int saveOrganDonationTreatment(OrganDonorTreatmentDto obj,Integer organDonorId,Integer patientId, HttpServletRequest request);

	RegistrationViewDto searchPatientByStoredProcedure(String findText, int patSearchType, String callFrom,
			Integer fromYear);

	List<OrganDonorTreatmentDto> getAllDonorsTreatmentList(	HttpServletRequest request,String fromDate,String lastDate);

	OrganDonationRegistrationDto editOrganDonor(Integer organDonorId, HttpServletRequest request);

	boolean deleteOrganDonorTreatment(Integer donorTreatmentId, HttpServletRequest request);

	List<IntendOrganDonorMasterDto> getOrgansAgainstTreatment(Integer treatmentId, HttpServletRequest request);
	
	List<OrganDonorTreatmentDto> donorTreatAutoSuggestion(String findText, String callFrom);
	
	OrganDonorTreatmentDto editOrganDonorTreatment(Integer organTreatId);
//Added By Annapurna For organ Request 
	RegistrationViewDto searchPatientByStoredProcedurefororganrequest(String findText, int patSearchType,
			String callFrom, Integer fromYear);

	RegistrationViewDto searchPatientByStoredProcedurefororganDonor(String findText, int patSearchType, String callFrom,
			Integer fromYear);////Added By Annapurna For organ Donor
}
