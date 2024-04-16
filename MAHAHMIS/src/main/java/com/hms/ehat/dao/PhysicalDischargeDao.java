package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.IpdPhysicalDischargedPatientsDTO;

public interface PhysicalDischargeDao {

	int updatePhysicalDischarge(Integer tID, TreatmentDto teatDtoObj, BillDetailsIpdDto billDtoObj, HttpServletRequest request);
	
	IpdPhysicalDischargedPatientsDTO getIpdDischargedPatients(String general, Integer unitId, Integer userId1, String userType,int wardType,int hallTypeSelectId,String ward,String letter);
	
	List<IpdPhysicalDischargedPatientsDTO> getIpdDischargedBillPatients(String general, Integer unitId, Integer userId1, String userType,int wardType,int hallTypeSelectId,String ward);

	String phyDisflagForOt(Integer treatmentId);
	
	List<IpdPhysicalDischargedPatientsDTO> autoIPDActivePhyDisPat(String letter,String finalBill, String usertype,HttpServletRequest request);

	List<IpdPhysicalDischargedPatientsDTO> autoIPDBillPhyDisPat(String letter,String finalBill, String usertype,HttpServletRequest request);
}
