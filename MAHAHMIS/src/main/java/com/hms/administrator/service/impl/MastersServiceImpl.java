package com.hms.administrator.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.MastersDao;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.LedgerHead;
import com.hms.administrator.dto.district_taluka_city;
import com.hms.administrator.service.MastersService;

@Service
@Transactional
public class MastersServiceImpl implements MastersService {

	@Autowired
	MastersDao mastersDao;
	
	
	@Override
	public Integer getNextId(String callFrom) {
		return mastersDao.getNextId(callFrom);
	}


	@Override
	public String saveVoucherMaster(ExpenseVoucherGroup dto, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		dto.setCreatedBy(userId);
		dto.setUnitId(unitId);
		return mastersDao.saveVoucherMaster(dto);
	}

	@Override
	public ExpenseVoucherGroup getAllVouchers(String callFrom) {
		return mastersDao.getAllVouchers(callFrom);
	}
	
	public ExpenseVoucherGroup editVoucher(Integer voucherId) {
		return mastersDao.editVoucher(voucherId);
	}
	
	public boolean deleteVoucher(Integer voucherId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return mastersDao.deleteVoucher(voucherId, userId);
	}
	
	public ExpenseVoucherGroup searchVoucher(String searchText, String callFrom) {
		return mastersDao.searchVoucher(searchText, callFrom);
	}
	
	public String saveLedgerHead(LedgerHead dto, Integer voucherId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		dto.setCreatedBy(userId);
		dto.setUnitId(unitId);
		return mastersDao.saveLedgerHead(dto, voucherId);
	}
	
	public LedgerHead getAllLedgerHeads(String searchText, String callFrom) {
		return mastersDao.getAllLedgerHeads(searchText, callFrom);
	}
	
	public LedgerHead editLedgerHead(Integer ledgerHeadId) {
		return mastersDao.editLedgerHead(ledgerHeadId);
	}
	
	public boolean deleteLedgerHead(Integer ledgerHeadId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return mastersDao.deleteLedgerHead(ledgerHeadId, userId);
	}


	@Override
	public String saveReasonOfVisit(district_taluka_city dto, Integer moduleId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		dto.setCreatedBy(userId);
		dto.setUnitId(unitId);
		return mastersDao.saveReasonOfVisit(dto, moduleId);
	}
	
	public district_taluka_city getAllReasons(String searchText, String callFrom) {
		return mastersDao.getAllReasons(searchText, callFrom);
	}

	@Override
	public district_taluka_city editReason(Integer reasonId) {
		return mastersDao.editReasons(reasonId);
	}

	@Override
	public boolean deleteReason(Integer reasonId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return mastersDao.deleteReasons(reasonId, userId);
	}
	
	@Override
	public String fetchTitleGender(String title) {
		return mastersDao.fetchTitleGender(title);
	}
}