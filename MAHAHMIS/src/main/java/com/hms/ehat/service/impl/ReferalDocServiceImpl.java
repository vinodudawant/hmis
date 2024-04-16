package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dto.Chanelling_doctor;
import com.hms.ehat.dao.ReferalDocDao;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.PercentMasterDto;
import com.hms.ehat.dto.PercentMasterReferalDocDto;
import com.hms.ehat.dto.PercentSlaveDto;
import com.hms.ehat.dto.PercentSlaveReferalDocDto;
import com.hms.ehat.dto.ProfeesDoctorsPaymentDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.ReferalDocService;

@Service
@Transactional
public class ReferalDocServiceImpl implements ReferalDocService {

	@Autowired 
	ReferalDocDao refdao;
	
	@Override
	public List<DoctorDto> setAutoSugForDoctorList(String letter,
			String callFrom, int specialisationId) {
		
		
		/*if (callFrom.equalsIgnoreCase("docType")) {// doctor Type
			return refdao.setAutoSugForDoctorListDocType(letter, callFrom);
		}else if(callFrom.equalsIgnoreCase("profees")){
			if(specialisationId > 0){//hosp specialisation wise doctors list
				return refdao.setAutoSugForDocListSpcl(letter, callFrom,specialisationId);
			}else{*/
				return refdao.setAutoSugForDoctorListAll(letter, callFrom);// All Doctors
				/* }
			
		} else {
			return refdao.setAutoSugForDoctorListAll(letter, callFrom);// All Doctors
		}*/
		
	}
	
	
	
	@Override
	public int savePerMasterForRefDoc(String percentMasterList, Integer userId,
			int doctorId, int unitId, String callFrom, int caseType,int paymentType,
			int drDeptId, int chargesId, int chargesSlaveId) {
		int a = 0;
		String drDeptFlag = "P"; // P for personal percentage records
		if (doctorId > 0) {
			a = refdao.savePerMasterForRefDoc(percentMasterList, userId,
					doctorId, unitId, callFrom, caseType, paymentType,drDeptId, drDeptFlag,
					chargesId, chargesSlaveId);
		} else if (doctorId == 0 && drDeptId > 0) {
			drDeptFlag = "D";// D for DrDept percentage records
			a = refdao.savePercentMasterDrDept(percentMasterList, userId,
					doctorId, unitId, callFrom, caseType, paymentType, drDeptId, drDeptFlag,
					chargesId, chargesSlaveId);
		}

		return a;
	}
	
	@Override
	public PercentMasterReferalDocDto getDrForRefDocDeptList(String callFrom, String letter) {
		return refdao.getDrForRefDocDeptList(callFrom,letter);
	}
	
	@Override
	public PercentMasterReferalDocDto getRefDrPersonalList(String callFrom, String callSearch, String letter) {
		return refdao.getRefDrPersonalList(callFrom,callSearch,letter);
	}
	
	@Override
	public int deleteReferalDoctAndGroupById(Integer docId, HttpServletRequest request,Integer caseType,Integer unitId,Integer chargesSlaveId) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		refdao.deleteReferalDoctAndGroupById(docId, userId,caseType,unitId,chargesSlaveId);
		return 1;
	}
	
	@Override
	public PercentMasterReferalDocDto editPercentMasterReferal(int doctorId, int unitId,int caseType,int chargesSlaveId) {
		return refdao.editPercentMasterReferal(doctorId,unitId,caseType, chargesSlaveId);
	}

	@Override
	public List<ChargesMasterSlave> fetchSuperCatPrcentMasterReferal(Integer chargesMasterDto) {
			
			return refdao.fetchSuperCatPrcentMasterReferal(chargesMasterDto);
		
	}
	
	
	@Override
	public Chanelling_doctor getdoctorNameOfRef(int docId) {
		// TODO Auto-generated method stub
		return refdao.getdoctorNameOfRef(docId);
	}
	
	@Override
	public List<SubServiceDto> getSubServicesFoprofees(Integer masterId,
			Integer selfId) {
		return refdao.getSubServicesFoprofees(masterId,selfId);
	}
	
	@Override
	public List<DeptMasterDto> getDeptMasterListAll(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return refdao.getAllDeptLst();
	}
	
	@Override
	public List<PercentSlaveReferalDocDto> fetchAndSetSubServiceOnEditReferal(int serviceId,
			int unitId, int doctorId, int drDeptId, int caseType,
			int chargesId, int chargesSlaveId) {
		return refdao.fetchAndSetSubServiceOnEditReferal(serviceId, unitId,doctorId,
				drDeptId, caseType,chargesId,chargesSlaveId);
	}
	
	@Override
	@Transactional
	public ProfeesDoctorsPaymentDto proFeesDoctorPayment(int doctorId,
			Date fromDate, Date toDate, int unitId, int deptId, String serviceId,
			Integer userId, int specialisationId, int billTypeId) {
		if(doctorId > 0){// for single doctor list
			if(deptId == 2){//IPD
				return refdao.proFeesDoctorPaymentIpd(doctorId,fromDate,toDate,unitId,deptId,serviceId,userId,specialisationId,billTypeId);
			}else{//OPD n rest
				return refdao.proFeesDoctorPaymentOpd(doctorId,fromDate,toDate,unitId,deptId,serviceId,userId,specialisationId,billTypeId);
			}
			
		}else{//for all doctors list
			if(deptId == 2){//IPD
				return refdao.proFeesDoctorPaymentForAllDocIpd(doctorId,fromDate,toDate,unitId,deptId,serviceId,userId,specialisationId,billTypeId);
			}else{//OPD n rest
				return refdao.proFeesDoctorPaymentForAllDocOpd(doctorId,fromDate,toDate,unitId,deptId,serviceId,userId,specialisationId,billTypeId);
			}
			
		}
		
	}
	
}
