package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.PurchaseExpenseDto;

public interface PurchaseExpenseDao {

	//save purchase expense and slave related to it
	public int savePurchaseExpense(PurchaseExpenseDto purchaseExpenseDto,String 
			purchaseExpenseItemSlaveDetails,Integer partyMasterId);
	//purchase expense get all records
	public List<PurchaseExpenseDto> getAllPurchaseExpenseRecords();
	//edit purchase expense
	public PurchaseExpenseDto editPurchaseExpense(Integer id);
	//purchase expense delete records
	public boolean deletePurchaseExpense(Integer id, HttpServletRequest request);

}
