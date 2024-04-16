package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.RisImageUploadDTO;
import com.hms.ehat.controller.CpoeIPDdetails;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.DoctorDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;

public interface OpdServicesAdvisedService {

	int saveOpdServicesAdvised(BillDetailsDto billDetailsDto, HttpServletRequest request, String queryType);

	List<DoctorDto> fetchDoctorList(String doctodType);

	List<CpoeIPDdetails> getAllOpdServicesAdvised(Integer treatmentId, String callform, HttpServletRequest request);

	int deleteOpdServicesAdvised(String labservicelist, String callform, HttpServletRequest request);

	List<CpoeServdetails> getListBill(Integer pID, String callform,
			Integer servid, HttpServletRequest request);

	int cancelInvestigationTest(String billDetId, String cancleType, String callform, HttpServletRequest request);

	int cancelLabTest(String billDetId, String cancleType, Integer deptId, HttpServletRequest request);
	
	PatientSubServiceDetailsDto getPatientSubServiceDetails(Integer treatmentId);
	
	int addPathologyPackageFromBilling(BillDetailsDto billDetailsDto, HttpServletRequest request,
			String queryType, String module,String sampleWiseBarcodes);
	
	PatientSubServiceDetailsDto getPatientSubServiceDetailsOnIPD(PatientSubServiceDetailsDto objDto);
	
	int deleteIpdServicesAdvised(String labservicelist, int userId, HttpServletRequest request);
	
	List<CpoeServdetails> getListBillIPD(Integer pID, String callform,
			Integer servid, HttpServletRequest request);
}
