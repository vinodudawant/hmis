package com.hms.organdonation.service.impl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.dto.AdminStateDTO;
import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.organdonation.dao.OrganDonationDao;
import com.hms.organdonation.dto.DonorTypeMasterDto;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.organdonation.service.OrganDonationService;

@Service
@Transactional
public class OrganDonationServiceImpl implements OrganDonationService {
	
	@Autowired
	OrganDonationDao organDonationDao;

	@Override
	public int saveOrganDonation(OrganDonationRegistrationDto obj,Integer patientId,
			HttpServletRequest request) {
		
		return organDonationDao.saveOrganDonation(obj, patientId, request);
	}

	@Override
	public List<IntendOrganDonorMasterDto> getAllOrgansIntendedToDonate(HttpServletRequest request) {
		return organDonationDao.getAllOrgansIntendedToDonate(request);
	}

	@Override
	public List<DonorTypeMasterDto> getAllDonorTypeList(HttpServletRequest request) {
		return organDonationDao.getAllDonorTypeList(request);
	}
	
	
	@Override
	public List<AdminCityDTO> getCityList(HttpServletRequest request) {
		return organDonationDao.getCityList(request);
	}

	@Override
	public List<AdminDistrictDTO> getDistrictList(HttpServletRequest request) {
		return organDonationDao.getDistrictList(request);
	}

	@Override
	public List<AdminStateDTO> getStateList(HttpServletRequest request) {
		return organDonationDao.getStateList(request);
	}

	@Override
	public List<BloodGroupMaster> getBloodGroupList(HttpServletRequest request) {
		return organDonationDao.getBloodGroupList(request);
	}

	@Override
	public List<OrganDonationRegistrationDto> getAllDonorsList(HttpServletRequest request,String fromDate,String lastDate) {
		return organDonationDao.getAllDonorsList(request,fromDate,lastDate);
	}
	
	@Override
	public List<OrganDonorTreatmentDto> getAllDonorsTreatmentList(HttpServletRequest request,String fromDate,String lastDate) {
		return organDonationDao.getAllDonorsTreatmentList(request, fromDate, lastDate);
	}

	@Override
	public List<OrganDonationRegistrationDto> donorAutoSuggestion(String findText, String callFrom) {
		return organDonationDao.donorAutoSuggestion(findText, callFrom);
	}

	@Override
	public boolean deleteOrganDonor(Integer donorId, HttpServletRequest request) {
		return organDonationDao.deleteOrganDonor(donorId, request);
	}

	@Override
	public int saveOrganDonationTreatment(OrganDonorTreatmentDto obj,Integer organDonorId,Integer patientId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonationDao.saveOrganDonationTreatment(obj,organDonorId,patientId,request);
	}

	@Override
	public RegistrationViewDto searchPatientByStoredProcedure(String findText, int patSearchType, String callFrom,
			Integer fromYear) {
		return organDonationDao.searchPatientByStoredProcedure(findText, patSearchType, callFrom, fromYear);
	}

	@Override
	public OrganDonationRegistrationDto editOrganDonor(Integer organDonorId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonationDao.editOrganDonor(organDonorId,request);
	}

	@Override
	public boolean deleteOrganDonorTreatment(Integer donorTreatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonationDao.deleteOrganDonorTreatment(donorTreatmentId, request);
	}

	@Override
	public List<IntendOrganDonorMasterDto> getOrgansAgainstTreatment(Integer treatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonationDao.getOrgansAgainstTreatment(treatmentId, request);
	}

	@Override
	public List<OrganDonorTreatmentDto> donorTreatAutoSuggestion(String findText, String callFrom) {
		
		return organDonationDao.donorTreatAutoSuggestion(findText, callFrom);
	}

	@Override
	public OrganDonorTreatmentDto editOrganDonorTreatment(Integer organTreatId) {
		
		return organDonationDao.editOrganDonorTreatment(organTreatId);
	}
//Added By Annapurna
	@Override
	public RegistrationViewDto searchPatientByStoredProcedurefororganrequest(String findText, int patSearchType, String callFrom,
			Integer fromYear) {
		return organDonationDao.searchPatientByStoredProcedurefororganrequest(findText, patSearchType, callFrom, fromYear);
	}
	
	@Override
	public RegistrationViewDto searchPatientByStoredProcedurefororganDonor(String findText, int patSearchType, String callFrom,
			Integer fromYear) {
		return organDonationDao.searchPatientByStoredProcedurefororganDonor(findText, patSearchType, callFrom, fromYear);
	}

	

}
