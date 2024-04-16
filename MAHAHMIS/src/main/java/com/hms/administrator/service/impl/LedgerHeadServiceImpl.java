package com.hms.administrator.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.LedgerHeadDao;
import com.hms.administrator.dto.LedgerHead;
import com.hms.administrator.service.LedgerHeadService;

@Service
@Transactional
public class LedgerHeadServiceImpl implements LedgerHeadService {

	@Autowired
	LedgerHeadDao mastersDao;
	
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
}
