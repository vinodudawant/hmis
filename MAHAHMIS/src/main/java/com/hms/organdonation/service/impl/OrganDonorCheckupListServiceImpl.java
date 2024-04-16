package com.hms.organdonation.service.impl;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Doctor;
import com.hms.dto.FetchTitleDTO;
import com.hms.organdonation.dao.OrganDonorCheckupListDao;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.organdonation.service.OrganDonorCheckupListService;

@Service
@Transactional
public class OrganDonorCheckupListServiceImpl implements OrganDonorCheckupListService {
	
	@Autowired
	OrganDonorCheckupListDao organDonorCheckupListDao;

	@Override
	public int saveOrganDonorCheckupList(OrganDonorCheckupListDto obj,Integer organDonorId,Integer treatmentId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorCheckupListDao.saveOrganDonorCheckupList(obj, organDonorId, treatmentId, request);
	}

	@Override
	public OrganDonorCheckupListDto editOrganDonorCheckupList(
			Integer checkupListId) {
		// TODO Auto-generated method stub
		return organDonorCheckupListDao.editOrganDonorCheckupList(checkupListId);
	}

	@Override
	public List<OrganDonorCheckupListDto> getAllOrganDonorCheckupList(HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		return organDonorCheckupListDao.getAllOrganDonorCheckupList(request, fromDate, lastDate);
	}

	@Override
	public boolean deleteOrganDonorCheckupList(Integer checkupListId,Integer donarTreatmentId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorCheckupListDao.deleteOrganDonorCheckupList(checkupListId,donarTreatmentId, request);
	}

	@Override
	public List<FetchTitleDTO> getAllTitle(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorCheckupListDao.getAllTitle(request);
	}

	@Override
	public List<Doctor> getAllDoctors(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorCheckupListDao.getAllDoctors(request);
	}

	@Override
	public List<OrganDonorCheckupListDto> organDonorCheckupListAutoSuggestion(
			Integer checklistId,String callFrom) {
		// TODO Auto-generated method stub
		return organDonorCheckupListDao.organDonorCheckupListAutoSuggestion(checklistId,callFrom);
	}

	@Override
	public OrganDonationRegistrationDto getOrganDonorById(Integer organDonorId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorCheckupListDao.getOrganDonorById(organDonorId,request);
	}

	@Override
	public OrganDonorTreatmentDto getOrganDonorByIdAndPatientId(
			Integer organDonorId, Integer patientId,Integer treatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorCheckupListDao.getOrganDonorByIdAndPatientId(organDonorId,patientId,treatmentId, request);
	}

	@Override
	public List<IntendOrganDonorMasterDto> getOrgansAgainstCheckupList(Integer checkupListId, HttpServletRequest request) {
		
		return organDonorCheckupListDao.getOrgansAgainstCheckupList(checkupListId, request);
	}

	

	

}
