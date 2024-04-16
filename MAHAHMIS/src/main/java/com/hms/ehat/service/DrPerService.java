package com.hms.ehat.service;


import java.sql.Date;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.DrPercentageDto;
import com.hms.ehat.dto.ProfeesVoucherMasterDto;
import com.hms.ehat.dto.ProfessionalFeesDto;
import com.hms.ehat.dto.ServiceMasterDto;

public interface DrPerService {

	//Irfan Khan @date: 15-June-2017 @reason : To Save and Update percentage
	int saveDrPercentage(String percentageDetails, Integer userId);
	
	//Irfan Khan @date: 15-June-2017 @reason : To Fetch all records
	DrPercentageDto getAllRecords();
	
	//Irfan Khan @date: 16-June-2017 @reason : To delete record
	boolean deleteDrPer(int drPercentageId, Integer userId);

	//Irfan Khan @date: 22-June-2017 @reason : To fetch profees records by doctor
	ProfessionalFeesDto fetchTestListForDr(int doctorId,int unitId,int deptId,int serviceId,Date fromDate,Date toDate);

	//Irfan Khan @date: 22-June-2017 @reason : To Save and Update profees voucher
	int saveProfeesVoucher(String vocherMasterDetails,
			String voucherSlaveDetails, Integer userId);
	
	// Irfan Khan @date: 23-June-2017 @reason : To Fetch Voucher master
	ProfeesVoucherMasterDto fetchAllGenVouchers(int voucherMasterId,String callFrom);

	// Irfan Khan @date: 23-June-2017 @reason : To Fetch Voucher slave
	ProfeesVoucherMasterDto viewVoucherById(int voucherMasterId, String callFrom);

	// Irfan Khan @date: 23-June-2017 @reason : cancel generated voucher
	int cancelGenratedVoucher(int voucherMasterId, String narration,
			Integer userId);

	//report
	ProfessionalFeesDto proFeesfetchReports1(int doctorId, Date fromDate,
			Date toDate, int unitId,int deptId,int serviceId);
}
