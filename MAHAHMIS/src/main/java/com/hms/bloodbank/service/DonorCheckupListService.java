package com.hms.bloodbank.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hms.bloodbank.dto.BloodBagMaster;
import com.hms.bloodbank.dto.BloodGroupTesting;
import com.hms.bloodbank.dto.BloodTypeMaster;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.dto.Doctor;
import com.hms.dto.Users;
import com.hms.organdonation.dto.OrganCollectionDto;

public interface DonorCheckupListService {


	int saveCheckuplist(DonorCheckupList checkuplist, HttpServletRequest request);

	int saveBloodBagDetails(DonorBloodBagDetails bloodBagDetails, HttpServletRequest request);

	public List<Doctor> fetchDoctor();

	DonorBloodBagDetails getDonorDetailsByTreatmentId(int id, String callform , HttpServletRequest request);

	List<DonorBloodBagDetails> serachBloodBagDetailsById(String searchParam,String callform);

	DonorCheckupList getDonorCheckupListDetailsByTreatmentId(int id, HttpServletRequest request);

	int saveBloodGroupTesting(BloodGroupTesting bloodGroupTesting, HttpServletRequest request);

	int saveSampleDispatch(DonorSampleDispatch donorSampleDispatchDetails, HttpServletRequest request);

	List<DonorSampleDispatch> getSampleDetails(Integer sampleStatus, String formDate, String toDate,String callform,Integer sampleSection,Integer sampleBloodBagNo);

	int saveSampleAcknowledge(int bloodDispatchId, int sampleStatus,String remarks, HttpServletRequest request);

	List<DonorBloodBagDetails> getBagDetails(Integer masterId);

	
	List<BloodTypeMaster> getAllBloodTypeMaster(HttpServletRequest request);

	List<BloodBagMaster> getAllBloodBagMaster(HttpServletRequest request);

	List<DonorCheckupList> getAllBloodDonorsCheckupList(Integer unitId, HttpServletRequest request);

	DonorCheckupList editBloodDonorCheckupList(Integer donorId, HttpServletRequest request);

	DonorCheckupList getDonorByIdCheckup(Integer donorId, HttpServletRequest request);

	//Added
	List<DonorSampleDispatch> getAllSampleDispatchList(HttpServletRequest request,String fromDate,String lastDate);
}
