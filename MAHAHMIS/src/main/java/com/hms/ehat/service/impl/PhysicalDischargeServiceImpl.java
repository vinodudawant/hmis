package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.PhysicalDischargeDao;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.PhysicalDischargeService;
import com.hms.ipdbill.dto.IpdPhysicalDischargedPatientsDTO;


@Service
public class PhysicalDischargeServiceImpl implements PhysicalDischargeService {
	
	@Autowired
	PhysicalDischargeDao pdDao;

	@Override
	@Transactional

	public int updatePhysicalDischarge(Integer tID,TreatmentDto teatDtoObj,BillDetailsIpdDto billDtoObj, HttpServletRequest request) {
		int response = pdDao.updatePhysicalDischarge(tID,teatDtoObj,billDtoObj,request);
		return response;
	}
	
	@Override
	@Transactional
	public IpdPhysicalDischargedPatientsDTO getIpdDischargedPatients (String general,Integer unitId,Integer userId1, String userType,int wardType,int hallTypeSelectId,String ward,String letter){
	
		return pdDao.getIpdDischargedPatients(general,unitId,userId1,userType,wardType,hallTypeSelectId,ward,letter);
	}
	
	@Override 
	@Transactional
	public List<IpdPhysicalDischargedPatientsDTO>getIpdDischargedBillPatients (String general,Integer unitId,Integer userId1, String userType,int wardType,int hallTypeSelectId,String ward){
	
		return pdDao.getIpdDischargedBillPatients(general,unitId,userId1,userType,wardType,hallTypeSelectId,ward);
	}
	
	@Override 
	@Transactional
	public String phyDisflagForOt(Integer treatmentId) {
		return pdDao.phyDisflagForOt(treatmentId);
	}
	
	@Override
	@Transactional
	public List<IpdPhysicalDischargedPatientsDTO> autoIPDActivePhyDisPat(String letter,String finalBill,String usertype,HttpServletRequest request){
	if(usertype.equalsIgnoreCase("Y")){
		return pdDao.autoIPDActivePhyDisPat(letter,finalBill,usertype,request);
	}else{
		return pdDao.autoIPDActivePhyDisPat(letter,finalBill,usertype, request);
	}
	}

	@Override
	@Transactional
	public List<IpdPhysicalDischargedPatientsDTO> autoIPDBillPhyDisPat(String letter,String finalBill,String usertype,HttpServletRequest request){
	if(usertype.equalsIgnoreCase("Y")){
		return pdDao.autoIPDBillPhyDisPat(letter,finalBill,usertype,request);
	}else{
		return pdDao.autoIPDBillPhyDisPat(letter,finalBill,usertype, request);
	}
	}
}


