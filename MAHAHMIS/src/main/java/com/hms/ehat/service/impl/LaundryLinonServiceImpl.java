package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.LaundryLinonProcessDao;
import com.hms.ehat.dao.PaymentModDao;
import com.hms.ehat.dto.LaundryLinonProcessDto;
import com.hms.ehat.dto.LaundryLinonSubDeptDto;
import com.hms.ehat.dto.ProcessCsdDto;
import com.hms.ehat.service.LaundryLinonService;

@Service
public class LaundryLinonServiceImpl implements LaundryLinonService{

	@Autowired
	LaundryLinonProcessDao llDao;

	@Override
	@Transactional
	public int saveOrUpdateProcessingMaster(LaundryLinonProcessDto procDto,
			HttpServletRequest request) {
		if (procDto.getProcessId() == 0) {
			procDto.setProcessCode(procDto.getProcessCode());
			procDto.setProcessName(procDto.getProcessName());
			procDto.setDiscription(procDto.getDiscription());
			procDto.setSeqNo(procDto.getSeqNo());
			 //payDto.setNarrCode(payDto.getNarrCode());
			//narrsMaster.setServId(narrsMaster.getServId());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			procDto.setCreatedBy(userId);
			procDto.setUnitId(unitId);
			procDto.setCreatedBy(procDto.getCreatedBy());
			procDto.setUnitId(procDto.getUnitId());
			procDto.setDeleted("N");
		
			//tempMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			procDto.setCreatedBy(userId);
			procDto.setUnitId(unitId);
			procDto.setUnitId(procDto.getUnitId());
			procDto.setUpdatedBy(procDto.getUpdatedBy());
			procDto.setDeleted("N");
			procDto.setUpdatedBy(userId);
			procDto.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		
				 return llDao.saveOrUpdateProcessingMaster(procDto);
	}

	@Override
	@Transactional
	public List<LaundryLinonProcessDto> getProcessingMasterData() {
		// TODO Auto-generated method stub
		return llDao.getProcessingMasterData();
	}

	@Override
	@Transactional
	public boolean deleteProcessyRecord(Integer processId,
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		llDao.deleteProcessyRecord(processId, userId);
		return true;
	}

	@Override
	@Transactional
	public int saveOrUpdateSubDeptMaster(LaundryLinonSubDeptDto subDepDto,
			HttpServletRequest request) {
		if (subDepDto.getSubDeptId() == 0) {
			subDepDto.setSubDeptCode(subDepDto.getSubDeptCode());
			subDepDto.setSubDeptName(subDepDto.getSubDeptName());
			 //payDto.setNarrCode(payDto.getNarrCode());
			//narrsMaster.setServId(narrsMaster.getServId());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			subDepDto.setCreatedBy(userId);
			subDepDto.setUnitId(unitId);
			subDepDto.setCreatedBy(subDepDto.getCreatedBy());
			subDepDto.setUnitId(subDepDto.getUnitId());
			subDepDto.setDeleted("N");
		
			//tempMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			subDepDto.setCreatedBy(userId);
			subDepDto.setUnitId(unitId);
			subDepDto.setUnitId(subDepDto.getUnitId());
			subDepDto.setUpdatedBy(subDepDto.getUpdatedBy());
			subDepDto.setDeleted("N");
			subDepDto.setUpdatedBy(userId);
			subDepDto.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		
				 return llDao.saveOrUpdateSubDeptMaster(subDepDto);
	}

	@Override
	@Transactional
	public List<LaundryLinonSubDeptDto> getSubMasterMasterData() {
		// TODO Auto-generated method stub
		return llDao.getSubMasterMasterData();
	}

	@Override
	@Transactional
	public boolean deleteSubDeptRecord(Integer subDeptId,
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		llDao.deleteSubDeptRecord(subDeptId, userId);
		return true;
	}

	@Override
	@Transactional
	public List<LaundryLinonProcessDto> autoSuggestionForProcess(String letter) {
		// TODO Auto-generated method stub
		return llDao.autoSuggestionForProcess(letter);
	}

	@Override
	@Transactional
	public List<LaundryLinonSubDeptDto> autoSuggestionForSubDept(String letter) {
		// TODO Auto-generated method stub
		return llDao.autoSuggestionForSubDept(letter);
	}

	
	@Transactional
	@Override
	public int saveOrUpdateProcessingMasterCsd(ProcessCsdDto procDto,
			HttpServletRequest request) {
		if (procDto.getProcessId() == 0) {
			procDto.setProcessCode(procDto.getProcessCode());
			procDto.setProcessName(procDto.getProcessName());
			procDto.setDiscription(procDto.getDiscription());
			procDto.setSeqNo(procDto.getSeqNo());
			 //payDto.setNarrCode(payDto.getNarrCode());
			//narrsMaster.setServId(narrsMaster.getServId());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			procDto.setCreatedBy(userId);
			procDto.setUnitId(unitId);
			procDto.setCreatedBy(procDto.getCreatedBy());
			procDto.setUnitId(procDto.getUnitId());
			procDto.setDeleted("N");
		
			//tempMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			procDto.setCreatedBy(userId);
			procDto.setUnitId(unitId);
			procDto.setUnitId(procDto.getUnitId());
			procDto.setUpdatedBy(procDto.getUpdatedBy());
			procDto.setDeleted("N");
			procDto.setUpdatedBy(userId);
			procDto.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		
				 return llDao.saveOrUpdateProcessingMasterCsd(procDto);
	}

	@Transactional
	@Override
	public List<ProcessCsdDto> getProcessingMasterDataCsd() {
		// TODO Auto-generated method stub
		return llDao.getProcessingMasterDataCsd();
	}

	
	@Transactional
	@Override
	public List<ProcessCsdDto> autoSuggestionForProcessCsd(String letter) {
		// TODO Auto-generated method stub
		return llDao.autoSuggestionForProcessCsd(letter);
	}

	@Transactional
	@Override
	public boolean deleteProcessyRecordCsd(Integer processId,
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		llDao.deleteProcessyRecordCsd(processId, userId);
		return true;
	}

}
