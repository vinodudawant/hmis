package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.inventory.dao.StockAuditDao;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.inventory.service.StockAuditService;

@Service
@Transactional
public class StockAuditServiceImpl implements StockAuditService{

	@Autowired
	StockAuditDao stockAuditDao;
	
	@Override
	public List<BatchStockDto> getStockAuditData(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.getStockAuditData(request);
	}

	@Override
	public BatchStockDto stockAuditAutoSuggestion(String itemName,
			String callFrom,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.stockAuditAutoSuggestion(itemName, callFrom,request);
	}

	@Override
	public List<BatchStockDto> itemSearchResultById(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.itemSearchResultById(id,request);
	}

	@Override
	public SubInventoryMasterDto subinventorySearchResult(
			String subInventoryName, String callFrom,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.subinventorySearchResult(subInventoryName, callFrom,request);
	}

	@Override
	public SubInventoryMasterDto getSubInventoryData(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.getSubInventoryData(request);
	}

	/*@Override
	public List<BatchStockDto> getSubInDataById(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.getSubInDataById(id,request);
	}*/
	
	@Override
	public List<GoodsIssueMrnItemSlaveDto> getSubInDataById(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.getSubInDataById(id,request);
	}

	@Override
	public Integer getPageCountAllStockAudit(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.getPageCountAllStockAudit(request);
	}

	@Override
	public List <BatchStockDto> getStockAuditPagination(Integer startIndex,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.getStockAuditPagination(startIndex,request);
	}

	@Override
	public Integer getPageCountAllStockAuditItem(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.getPageCountAllStockAuditItem(id, request);
	}

	@Override
	public List<BatchStockDto> getStockAuditItemPagination(Integer startIndex,Integer id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return stockAuditDao.getStockAuditItemPagination(startIndex, id,request);
	}

}
