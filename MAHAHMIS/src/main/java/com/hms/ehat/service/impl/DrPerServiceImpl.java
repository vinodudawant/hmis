package com.hms.ehat.service.impl;

import java.sql.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.DrPerDao;
import com.hms.ehat.dto.DrPercentageDto;
import com.hms.ehat.dto.ProfeesVoucherMasterDto;
import com.hms.ehat.dto.ProfessionalFeesDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.service.DrPerService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class DrPerServiceImpl implements DrPerService {

	@Autowired
	DrPerDao drPerDao;

	//Irfan Khan @date: 15-June-2017 @reason : To Save and Update percentage
	@Override
	@Transactional
	public int saveDrPercentage(String percentageDetails,
			Integer userId) {

		DrPercentageDto drPercentageDto2 = (DrPercentageDto) ConfigUIJSONUtility
				.getObjectFromJSON(percentageDetails, DrPercentageDto.class);
		
		DrPercentageDto drPercentageDto = drPercentageDto2.getListDrPercentage().get(0);
		
		if (drPercentageDto.getDrPercentageId() == 0) { // To Insert Record

			drPercentageDto.setCreatedBy(userId);	
			drPercentageDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			drPercentageDto.setDeleted("N");

		} else {// To Update Record

			drPercentageDto.setUpdatedBy(userId);
			drPercentageDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			drPercentageDto.setDeleted("N");

		}
						// call to function in DAO
		int a = drPerDao.saveDrPercentage(drPercentageDto);
				
		return a;//((a == 1) ? (drPercentageDto.getDrPercentageId() == 0 ? 1 : 2) : 0);
	}
	
	// Irfan Khan @date: 15-June-2017 @reason : To Fetch all records
	@Override
	@Transactional
	public DrPercentageDto getAllRecords() {
		return drPerDao.getAllRecords();
	}
	
	//Irfan Khan @date: 16-June-2017 @reason : To delete record
	@Override
	@Transactional
	public boolean deleteDrPer(int drPercentageId, Integer userId) {
		
		return drPerDao.deleteDrPer(drPercentageId, userId);// call dao method
	}

	//Irfan Khan @date: 21-June-2017 @reason : To fetch record
	@Override
	@Transactional
	public ProfessionalFeesDto fetchTestListForDr(int doctorId, int unitId,
			int deptId, int serviceId, Date fromDate,Date toDate) {
		
		return drPerDao.fetchTestListForDr(doctorId,unitId,deptId,serviceId,fromDate,toDate);
	}

	//Irfan Khan @date: 22-June-2017 @reason : To Save and Update profees voucher
	@Override
	@Transactional
	public int saveProfeesVoucher(String vocherMasterDetails,
			String voucherSlaveDetails, Integer userId) {
		

		ProfeesVoucherMasterDto profeesVoucherMasterDto2 = (ProfeesVoucherMasterDto) ConfigUIJSONUtility
				.getObjectFromJSON(vocherMasterDetails, ProfeesVoucherMasterDto.class);
		
		ProfeesVoucherMasterDto profeesVoucherMasterDto = profeesVoucherMasterDto2.getListVoucherMaster().get(0);
		
		if (profeesVoucherMasterDto.getVoucherMasterId() == 0) { // To Insert Record

			profeesVoucherMasterDto.setCreatedBy(userId);	
			profeesVoucherMasterDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			profeesVoucherMasterDto.setDeleted("N");

		} else {// To Update Record

			profeesVoucherMasterDto.setUpdatedBy(userId);
			profeesVoucherMasterDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			profeesVoucherMasterDto.setDeleted("N");

		}
						// call to function in DAO
		int a = drPerDao.saveProfeesVoucher(profeesVoucherMasterDto,voucherSlaveDetails,userId);
		
		return a;
	}

	// Irfan Khan @date: 23-June-2017 @reason : To Fetch Voucher
	@Override
	@Transactional
	public ProfeesVoucherMasterDto fetchAllGenVouchers(int voucherMasterId,
			String callFrom) {
		return drPerDao.fetchAllGenVouchers(voucherMasterId,callFrom);
	}

	// Irfan Khan @date: 23-June-2017 @reason : To Fetch Voucher slave
	@Override
	@Transactional
	public ProfeesVoucherMasterDto viewVoucherById(int voucherMasterId,
			String callFrom) {
		return drPerDao.viewVoucherById(voucherMasterId,callFrom);
	}

	// Irfan Khan @date: 23-June-2017 @reason : cancel generated voucher
	@Override
	@Transactional
	public int cancelGenratedVoucher(int voucherMasterId, String narration,
			Integer userId) {
		int a = drPerDao.cancelGenratedVoucher(voucherMasterId, narration,
				userId);
		return a;
	}

	@Override
	@Transactional
	public ProfessionalFeesDto proFeesfetchReports1(int doctorId,
			Date fromDate, Date toDate,int unitId,int deptId,int serviceId) {
		return drPerDao.proFeesfetchReports1(doctorId,fromDate,toDate,unitId,deptId,serviceId);
	}
	
}
