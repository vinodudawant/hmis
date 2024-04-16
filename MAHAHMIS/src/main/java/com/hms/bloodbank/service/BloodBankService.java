package com.hms.bloodbank.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.BloodGroupTesting;
import com.hms.bloodbank.dto.BloodRequest;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorReaction;
import com.hms.bloodbank.dto.TestRegister;

public interface BloodBankService {

	List<DonorBloodBagDetails> getAllBloodBagCollectionDonorList(Integer unitId, HttpServletRequest request);

	DonorBloodBagDetails editBloodBagCollectionDonorList(Integer donorTreatmentId, HttpServletRequest request);

	boolean deletedBloodBagCollectionDonorList(Integer donorTreatmentId, HttpServletRequest request);

	List<DonorReaction> getAllDonorReaction(Integer unitId, HttpServletRequest request);

	DonorReaction editDonorReaction(Integer donorTreatmentId, HttpServletRequest request);

	boolean deleteDonorReaction(Integer donorReactionId, HttpServletRequest request);

	List<BloodGroupTesting> getAllBloodGroupTestingList(Integer unitId, HttpServletRequest request);

	BloodGroupTesting editBloodGroupTesting(Integer donorTreatmentId, HttpServletRequest request);

	boolean deleteBloodGroupTesting(Integer bloodGroupTestingId, HttpServletRequest request);

	List<TestRegister> getAllTestRegister(Integer unitId, HttpServletRequest request);

	boolean deleteTestRegister(Integer id, HttpServletRequest request);

	TestRegister editTestRegister(Integer testRegisterId, HttpServletRequest request);

	List<ComponentSeperation> getAllComponentSeperationList(Integer unitId, HttpServletRequest request);

	boolean deleteComponentSeperation(Integer componentSeperationId, HttpServletRequest request);

	ComponentSeperation editComponentSeperation(Integer donorTreatmentId, Integer componentSeperationId,
			HttpServletRequest request);

    BloodGroupTesting getDonorDetailsByIdBloodTesting(Integer id, HttpServletRequest request);
    TestRegister getDonorDetailsByIdTestRegister(Integer id, HttpServletRequest request);
    ComponentSeperation getPatientDetailsByIdComponentsepration(Integer id, HttpServletRequest request);
    
   public DonorReaction getDonorDetailsByIdOrganDonation(Integer id, HttpServletRequest request);
   

}
