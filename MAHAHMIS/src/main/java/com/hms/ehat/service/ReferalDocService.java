package com.hms.ehat.service;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.Chanelling_doctor;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.PercentMasterDto;
import com.hms.ehat.dto.PercentMasterReferalDocDto;
import com.hms.ehat.dto.PercentSlaveDto;
import com.hms.ehat.dto.PercentSlaveReferalDocDto;
import com.hms.ehat.dto.ProfeesDoctorsPaymentDto;
import com.hms.ehat.dto.SubServiceDto;

public interface ReferalDocService {

	
	//@author : Rohini Ambhore @date: 28-feb-2024 @reason : Autosuggestion for referal doctor
	List<DoctorDto> setAutoSugForDoctorList(String letter, String callFrom,int specialisationId);
	
	// @author : Rohini Ambhore @date: 28-feb-2024 @reason : To save n update Advance percentage for referal doctor 
	int savePerMasterForRefDoc(String percentMasterList, Integer userId,int doctorId, int unitId, String callFrom, 
			int caseType,int paymentType,int drDeptId, int chargesId, int chargesSlaveId);
	
	//@author : Rohini Ambhore @date: 28-feb-2024 @reason : To fetch configured list of dr dept of referal doctor
	PercentMasterReferalDocDto getDrForRefDocDeptList(String callFrom, String letter);
	
	// @author : Rohini Ambhore @date: 28-feb-2024 @reason : To fetch referal doctor configured list of doctor personal
	PercentMasterReferalDocDto getRefDrPersonalList(String callFrom, String callSearch, String letter);
	
	// @author : Rohini Ambhore @date: 28-feb-2024 @reason : To delete record configured list of doctor personal of referal doctor
	int deleteReferalDoctAndGroupById(Integer docId, HttpServletRequest request,Integer caseType,Integer unitId,Integer chargesSlaveId);
	
	// @author : Rohini Ambhore @date: 28-feb-2024 : To Fetch record by drid and unitid for referal doctor
	PercentMasterReferalDocDto editPercentMasterReferal(int doctorId, int unitId,int caseType,int chargesSlaveId);
	
	// @author : Rohini Ambhore @date: 28-feb-2024 -- Fetching super master of service based on there id 12-Mar-2018
	List<ChargesMasterSlave> fetchSuperCatPrcentMasterReferal(Integer chargesMasterDto);
	
	// @author : Rohini Ambhore @date: 28-feb-2024 
	Chanelling_doctor getdoctorNameOfRef(int docId);
	List<SubServiceDto> getSubServicesFoprofees(Integer masterId, Integer selfId);
	List<DeptMasterDto> getDeptMasterListAll(HttpServletRequest request);
	List<PercentSlaveReferalDocDto> fetchAndSetSubServiceOnEditReferal(int serviceId,
			int unitId, int doctorId, int drDeptId, int caseType,int chargesId, int chargesSlaveId);
	
	ProfeesDoctorsPaymentDto proFeesDoctorPayment(int doctorId, Date fromDate,
			Date toDate, int unitId, int deptId, String serviceId, Integer userId, int specialisationId,int billTypeId);
	
}
