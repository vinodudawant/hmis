
package com.hms.ehat.dao;

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

public interface CommonadvDao {
	int saveCommonadvMaster(CommonadvDto commonadv ,HttpServletRequest request);
	
	
	public List<Doctor> viewDoctors(String date, String docType,Integer drDeptId);
	
	List<CommonadvDto> getCommonadv(Integer patient_ID, String callform);
	int deletecadvmaster(int cadvId, CommonadvDto comm_adv);

	
	
	List<RegTreBillDto> getAllForAutoSummary(String findingName, Integer pid, String callfrom);

	List<CommanadvrecordDTO> getCommonadvrecord(Integer treatmentId,
			String callform);

	int saveDoctorRoundCharg(DoctorRoundCharg drround,
			HttpServletRequest request);

	List<DoctorRoundCharg> getDrhallcharg(Integer drid, String callform,
			Integer spId);

	List<CommanAdvRefund> getCommonadvrefund(List<CommanadvrecordDTO> lstCommonadv);

	int deletecadvrefund(Integer cadvId, Integer refundid, Double cdammunt,
			Double blamnt, Double totalrefund, HttpServletRequest request);

	List<CommanAdvRefund> getcommanadvrefundlist(Integer refundID);
	
	int saveConsultationCharges(ConsultationChargesDto drround,HttpServletRequest request);
	List<ConsultationChargesDto> getConsulthallcharg(Integer drid, String callform,Integer spId, HttpServletRequest request);
	
	List<DoctorRoundCharg> getDrhallchargNew(Integer drid, String callform,
			Integer spId);
	
	List<RegistrationCharges> getReghallchargNew(Integer drid, String callform,Integer spId);

	int saveDoctorRoundChargReg(RegistrationCharges drround,HttpServletRequest request);

	List<CommanadvrecordDTO> getcommanadvrecordPost(Integer commanAdvId, String callform);
	
	List<ChargesMasterSlave> getChragesSlaveByIddr(Integer masterId,
			String selfIds);
	
	List<RegistrationCharges> getRegistrationMasterhallcharg(Integer sponserid, String callform,String spId);
	
	List<ChargesMasterSlave> getChragesSlaveByIddrConsultation(Integer masterId,	String selfIds);
}
