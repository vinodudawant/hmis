package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Doctor;
import com.hms.ehat.dao.CommonadvDao;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.CommanAdvRefund;
import com.hms.ehat.dto.CommanadvrecordDTO;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.ConsultationChargesDto;
import com.hms.ehat.dto.DoctorRoundCharg;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationCharges;
import com.hms.ehat.service.CommonadvService;
@Service
public class CommonadvServiceImpl implements CommonadvService {
	@Autowired
	CommonadvDao comadv;
	
	/************
	 *@author	: paras suryawanshi
	 *@date		:  24-May-2017
	 *@code		:saveCommonadvMaster
	 ***********/
	@Override
	@Transactional
	public int saveCommonadvMaster(CommonadvDto commonadv,
			HttpServletRequest request) {
		int a=0;
		//	System.err.println("id isssssssssssss==   "+ docTypDto.getDoctypeId());
			try {
				
				
			
					a= comadv.saveCommonadvMaster(commonadv ,request);
					
			} catch (Exception e) {
				e.printStackTrace();
				
			}
		return a;
	}

	/************
	 *@author	: paras suryawanshi
	 *@date		: 18-May-2017
	 *@code		: getCommonadvlist
	 ***********/
	@Override
	@Transactional
	public List<CommonadvDto> getCommonadv(Integer pID_cID,String callform,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.getCommonadv(pID_cID,callform);
	}
	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:delteCommonadvlist
	 ***********/
	@Override
	@Transactional

	public int deletecadvmaster(int cadvId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		CommonadvDto commonadv = new CommonadvDto();
		commonadv.setCommonadv_id(cadvId);
		//System.err.println("userId=-=-=-=-=->" + userId);
		commonadv.setDeletedBy(userId);
		return comadv.deletecadvmaster(cadvId,commonadv);
	}

	@Override
	@Transactional
	public List<RegTreBillDto> getAllForAutoSummary(String findingName, Integer pid, String callfrom) {
		// TODO Auto-generated method stub
		return comadv.getAllForAutoSummary(findingName,pid,callfrom);
	}

	@Override
	@Transactional
	public List<CommanadvrecordDTO> getCommonadvrecord(Integer treatmentId,
			String callform, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.getCommonadvrecord( treatmentId,
				 callform);
	}

	@Override
	@Transactional
	public int saveDoctorRoundCharg(DoctorRoundCharg drround,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.saveDoctorRoundCharg( drround,
				 request);
	}

	@Override
	@Transactional
	public List<DoctorRoundCharg> getDrhallcharg(Integer drid, String callform,Integer  SpId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.getDrhallchargNew(drid,callform,SpId);
	}

	@Override
	@Transactional
	public List<CommanAdvRefund> getCommonadvrefund(
			List<CommanadvrecordDTO> lstCommonadv, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.getCommonadvrefund(lstCommonadv);
	}

	@Override
	@Transactional
	public int deletecadvrefund(Integer cadvId, Integer refundid, Double cdammunt,
			Double blamnt,Double totalrefund, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.deletecadvrefund( cadvId,  refundid,
				 cdammunt,blamnt, totalrefund, request);
	}

	@Override
	@Transactional
	public List<CommanAdvRefund> getcommanadvrefundlist(Integer refundID,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.getcommanadvrefundlist(refundID);
	}

	@Override
	@Transactional
	public int saveConsultationCharges(ConsultationChargesDto drround,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.saveConsultationCharges(drround,request);
	}

	@Override
	@Transactional
	public List<ConsultationChargesDto> getConsulthallcharg(Integer drid, String callform,Integer SpId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.getConsulthallcharg(drid,callform,SpId,request);
	}

	@Override
	@Transactional
	public List<Doctor> viewDoctors(String date, String docType,
			Integer drDeptId) {
		// TODO Auto-generated method stub
		return comadv.viewDoctors(date, docType, drDeptId);
	}
	
	@Override
	@Transactional
	public List<RegistrationCharges> getReghallcharg(Integer drid, String callform,Integer  SpId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.getReghallchargNew(drid,callform,SpId);
	}
	
	@Override
	@Transactional
	public int saveDoctorRoundChargReg(RegistrationCharges drround,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.saveDoctorRoundChargReg( drround,
				 request);
	}
	
	@Override
	@Transactional
	public List<CommanadvrecordDTO> getcommanadvrecordPost(Integer commanAdvId,
			String callform, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.getcommanadvrecordPost( commanAdvId,
				 callform);
	}
	
	@Override
	@Transactional
	public List<ChargesMasterSlave> getChragesSlaveByIddr(Integer masterId,
			String selfIds) {
		// TODO Auto-generated method stub
		return comadv.getChragesSlaveByIddr(masterId, selfIds);
	}
	
	
	@Override
	@Transactional
	public List<RegistrationCharges> getRegistrationMasterhallcharg(Integer sponserid, String callform,String  SpId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return comadv.getRegistrationMasterhallcharg(sponserid,callform,SpId);
	}
	
	@Override
	@Transactional
	public List<ChargesMasterSlave> getChragesSlaveByIddrConsultation(Integer masterId,
			String selfIds) {
		// TODO Auto-generated method stub
		return comadv.getChragesSlaveByIddrConsultation(masterId, selfIds);
	}
	
}
