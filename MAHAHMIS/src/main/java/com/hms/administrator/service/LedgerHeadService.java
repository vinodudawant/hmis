package com.hms.administrator.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.LedgerHead;

public interface LedgerHeadService {

	public String saveLedgerHead(LedgerHead dto, Integer voucherId, HttpServletRequest request);
	public LedgerHead getAllLedgerHeads(String searchText, String callFrom);
	public LedgerHead editLedgerHead(Integer ledgerHeadId);
	public boolean deleteLedgerHead(Integer ledgerHeadId, HttpServletRequest request);
}
