package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.PurchaseExpenseDto;

public interface PurchaseExpenseService {

	//to save purchase expense and slave details related to it
	public int savePurchaseExpense(PurchaseExpenseDto purchaseExpenseDto,String purchaseExpenseItemSlaveDetails,Integer partyMasterId);
	//purchase expense get all records
	public List<PurchaseExpenseDto> getAllPurchaseExpenseRecords(HttpServletRequest request);
	//edit purchase expense
	public PurchaseExpenseDto editPurchaseExpense(Integer id);
	//purchase expense delete records and his slaves
	public boolean deletePurchaseExpense(Integer id, HttpServletRequest request);
}
