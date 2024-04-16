package com.hms.ehat.dao;

import java.sql.Date;
import java.util.List;

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

public interface ReferalDocDao {

	
	List<DoctorDto> setAutoSugForDoctorListAll(String letter, String callFrom);
	
	int savePerMasterForRefDoc(String percentMasterList, Integer userId,
			int doctorId, int unitId, String callFrom, int caseType,int paymentType,
			int drDeptId, String drDeptFlag, int chargesId, int chargesSlaveId);
	
	int savePercentMasterDrDept(String percentMasterList, Integer userId, int doctorId, int unitId,
			String callFrom, int caseType,int paymentType,int drDeptId,String drDeptFlag,int chargesId,int chargesSlaveId);
	
	PercentMasterReferalDocDto getDrForRefDocDeptList(String callFrom, String letter);
	PercentMasterReferalDocDto getRefDrPersonalList(String callFrom, String callSearch, String letter);
	int deleteReferalDoctAndGroupById(Integer docId, Integer userId,Integer caseType,Integer unitId,Integer chargesSlaveId);
	
	PercentMasterReferalDocDto editPercentMasterReferal(int doctorId, int unitId,int caseType,int chargesSlaveId);
	List<ChargesMasterSlave> fetchSuperCatPrcentMasterReferal(Integer chargesMasterDto);
	Chanelling_doctor getdoctorNameOfRef(int docId);
	List<SubServiceDto> getSubServicesFoprofees(Integer masterId, Integer selfId);
	List<DeptMasterDto> getAllDeptLst();
	List<PercentSlaveReferalDocDto> fetchAndSetSubServiceOnEditReferal(int serviceId,
			int unitId, int doctorId, int drDeptId, int caseType,
			int chargesId, int chargesSlaveId);
	
	ProfeesDoctorsPaymentDto proFeesDoctorPaymentIpd(int doctorId, Date fromDate,
			Date toDate, int unitId, int deptId, String serviceId, Integer userId,int specialisationId,int billTypeId);

	ProfeesDoctorsPaymentDto proFeesDoctorPaymentOpd(int doctorId, Date fromDate,
			Date toDate, int unitId, int deptId, String serviceId, Integer userId,int specialisationId,int billTypeId);
	
	ProfeesDoctorsPaymentDto proFeesDoctorPaymentForAllDocIpd(int doctorId,Date fromDate, Date toDate, int unitId, int deptId,
			String serviceId, Integer userId, int specialisationId,int billTypeId);
	
	ProfeesDoctorsPaymentDto proFeesDoctorPaymentForAllDocOpd(int doctorId,
			Date fromDate, Date toDate, int unitId, int deptId, String serviceId,
			Integer userId, int specialisationId,int billTypeId);
}
