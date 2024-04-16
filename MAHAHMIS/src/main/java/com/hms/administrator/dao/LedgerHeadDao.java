package com.hms.administrator.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.LedgerHead;

public interface LedgerHeadDao {

	public String saveLedgerHead(LedgerHead dto, Integer voucherId);
	public LedgerHead getAllLedgerHeads(String searchText, String callFrom);
	public LedgerHead editLedgerHead(Integer ledgerHeadId);
	public boolean deleteLedgerHead(Integer ledgerHeadId, Integer userId);
}
