package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.PurchaseExpenseDao;
import com.hms.inventory.dto.PurchaseExpenseDto;
import com.hms.inventory.service.PurchaseExpenseService;

@Service
@Transactional
public class PurchaseExpenseServiceImpl implements PurchaseExpenseService{

	@Autowired
	private PurchaseExpenseDao expenseDao;
	
	
	@Override
	public int savePurchaseExpense(PurchaseExpenseDto purchaseExpenseDto,
			String purchaseExpenseItemSlaveDetails, Integer partyMasterId) {
		// TODO Auto-generated method stub
		return expenseDao.savePurchaseExpense(purchaseExpenseDto, purchaseExpenseItemSlaveDetails, partyMasterId);
	}


	@Override
	public List<PurchaseExpenseDto> getAllPurchaseExpenseRecords(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return expenseDao.getAllPurchaseExpenseRecords();
	}


	@Override
	public PurchaseExpenseDto editPurchaseExpense(Integer id) {
		// TODO Auto-generated method stub
		return expenseDao.editPurchaseExpense(id);
	}


	@Override
	public boolean deletePurchaseExpense(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return expenseDao.deletePurchaseExpense(id, request);
	}

}
