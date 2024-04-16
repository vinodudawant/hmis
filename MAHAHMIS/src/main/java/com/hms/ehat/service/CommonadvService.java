package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Doctor;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.CommanAdvRefund;
import com.hms.ehat.dto.CommanadvrecordDTO;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.ConsultationChargesDto;
import com.hms.ehat.dto.DoctorRoundCharg;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationCharges;

public interface CommonadvService {

	public List<Doctor> viewDoctors(String date, String docType,
			Integer drDeptId);
	
	int saveCommonadvMaster(CommonadvDto commonadv,
			HttpServletRequest request);
	
	List<CommonadvDto> getCommonadv(Integer patient_ID, String callform, HttpServletRequest request);

	int deletecadvmaster(int cadvId, HttpServletRequest request);

	List<RegTreBillDto> getAllForAutoSummary(String findingName, Integer pid, String callfrom);

	List<CommanadvrecordDTO> getCommonadvrecord(Integer treatmentId,
			String callform, HttpServletRequest request);

	int saveDoctorRoundCharg(DoctorRoundCharg drround,
			HttpServletRequest request);
	
	int saveDoctorRoundChargReg(RegistrationCharges drround,HttpServletRequest request);

	List<DoctorRoundCharg> getDrhallcharg(Integer drid, String callform,
			Integer spId, HttpServletRequest request);

	List<CommanAdvRefund> getCommonadvrefund(List<CommanadvrecordDTO> lstCommonadv,
			HttpServletRequest request);

	int deletecadvrefund(Integer cadvId, Integer refundid, Double cdammunt,
			Double blamnt, Double totalrefund, HttpServletRequest request);

	List<CommanAdvRefund> getcommanadvrefundlist(Integer refundID,
			HttpServletRequest request);
	
	int saveConsultationCharges(ConsultationChargesDto drround,HttpServletRequest request);
	List<ConsultationChargesDto> getConsulthallcharg(Integer drid, String callform,Integer spId, HttpServletRequest request);

	List<RegistrationCharges> getReghallcharg(Integer drid, String callform,Integer spId, HttpServletRequest request);

	public List<CommanadvrecordDTO> getcommanadvrecordPost(Integer commanAdvId, String callform,
			HttpServletRequest request);
	
	List<ChargesMasterSlave> getChragesSlaveByIddr(Integer masterId,
			String selfIds);
	
	List<RegistrationCharges> getRegistrationMasterhallcharg(Integer sponserid, String callform,String spId, HttpServletRequest request);
	List<ChargesMasterSlave> getChragesSlaveByIddrConsultation(Integer masterId,String selfIds);
}
