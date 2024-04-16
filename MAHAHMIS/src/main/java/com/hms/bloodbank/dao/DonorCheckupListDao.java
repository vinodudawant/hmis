package com.hms.bloodbank.dao;

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

public interface DonorCheckupListDao {

	public List<Doctor> fetchDoctor();

	int saveCheckuplist(DonorCheckupList checkuplist, HttpServletRequest request);

	int saveBloodBagDetails(DonorBloodBagDetails bloodBagDetails, HttpServletRequest request);

	public DonorBloodBagDetails getDonorDetailsByTreatmentId(int id,String callform ,HttpServletRequest request);

	public List<DonorBloodBagDetails> serachBloodBagDetailsById(String searchParam,String callform);

	public DonorCheckupList getDonorCheckupListDetailsByTreatmentId(int id, HttpServletRequest request);

	public int saveBloodGroupTesting(BloodGroupTesting bloodGroupTesting, HttpServletRequest request);

	public int saveSampleDispatch(DonorSampleDispatch donorSampleDispatchDetails, HttpServletRequest request);

	public List<DonorSampleDispatch> getSampleDetails(Integer sampleStatus,String formDate, String toDate,String callform, Integer sampleSection, Integer sampleBloodBagNo);

	int getMaxNo();

	public int saveSampleAcknowledge(int bloodDispatchId, int sampleStatus,String remarks, HttpServletRequest request);

	public List<DonorBloodBagDetails> getBagDetails(Integer masterId);

	public List<BloodTypeMaster> getAllBloodTypeMaster(HttpServletRequest request);

	public List<BloodBagMaster> getAllBloodBagMaster(HttpServletRequest request);

	public List<DonorCheckupList> getAllBloodDonorsCheckupList(Integer unitId, HttpServletRequest request);

	public DonorCheckupList editBloodDonorCheckupList(Integer donorId, HttpServletRequest request);

	public DonorCheckupList getDonorByIdCheckup(Integer donorId, HttpServletRequest request);
	
	//Added
	
	List<DonorSampleDispatch> getAllSampleDispatchList(HttpServletRequest request,String fromDate,String lastDate);


	


}
