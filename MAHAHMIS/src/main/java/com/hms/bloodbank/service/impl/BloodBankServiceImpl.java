package com.hms.bloodbank.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.bloodbank.dao.BloodBankDao;
import com.hms.bloodbank.dto.BloodGroupTesting;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorReaction;
import com.hms.bloodbank.dto.SampleDispatch;
import com.hms.bloodbank.dto.TestRegister;
import com.hms.bloodbank.service.BloodBankService;

@Service
@Transactional
public class BloodBankServiceImpl implements BloodBankService {
	
	@Autowired
	BloodBankDao bloodBankDao;

	@Override
	public List<DonorBloodBagDetails> getAllBloodBagCollectionDonorList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.getAllBloodBagCollectionDonorList(unitId,request);
	}

	@Override
	public DonorBloodBagDetails editBloodBagCollectionDonorList(Integer donorTreatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.editBloodBagCollectionDonorList(donorTreatmentId,request);
	}

	@Override
	public boolean deletedBloodBagCollectionDonorList(Integer donorTreatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.deletedBloodBagCollectionDonorList(donorTreatmentId,request);
	}

	@Override
	public List<DonorReaction> getAllDonorReaction(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.getAllDonorReaction(unitId,request);
	}

	@Override
	public DonorReaction editDonorReaction(Integer donorTreatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.editDonorReaction(donorTreatmentId,request);
	}

	@Override
	public boolean deleteDonorReaction(Integer donorReactionId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.deleteDonorReaction(donorReactionId,request);
	}

	@Override
	public List<BloodGroupTesting> getAllBloodGroupTestingList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.getAllBloodGroupTestingList(unitId,request);
	}

	@Override
	public BloodGroupTesting editBloodGroupTesting(Integer donorTreatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.editBloodGroupTesting(donorTreatmentId,request);
	}

	@Override
	public boolean deleteBloodGroupTesting(Integer bloodGroupTestingId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.deleteBloodGroupTesting(bloodGroupTestingId,request);
	}

	@Override
	public List<TestRegister> getAllTestRegister(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.getAllTestRegister(unitId,request);
	}

	@Override
	public boolean deleteTestRegister(Integer testRegisterId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.deleteTestRegister(testRegisterId,request);
	}

	@Override
	public TestRegister editTestRegister(Integer testRegisterId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.editTestRegister(testRegisterId,request);
	}

	@Override
	public List<ComponentSeperation> getAllComponentSeperationList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.getAllComponentSeperationList(unitId,request);
	}

	@Override
	public boolean deleteComponentSeperation(Integer componentSeperationId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.deleteComponentSeperation(componentSeperationId,request);
	}

	@Override
	public ComponentSeperation editComponentSeperation(Integer donorTreatmentId, Integer componentSeperationId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.editComponentSeperation(donorTreatmentId,componentSeperationId,request);
	}

	@Override
	public BloodGroupTesting getDonorDetailsByIdBloodTesting(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.getDonorDetailsByIdBloodTesting(id,request);
	}
	
	@Override
	public TestRegister getDonorDetailsByIdTestRegister(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.getDonorDetailsByIdTestRegister(id,request);
	}

	@Override
	public ComponentSeperation getPatientDetailsByIdComponentsepration(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.getPatientDetailsByIdComponentsepration(id,request);
	}
	
	@Override
	public DonorReaction getDonorDetailsByIdOrganDonation(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBankDao.getDonorDetailsByIdOrganDonation(id,request);
	}
	

}
