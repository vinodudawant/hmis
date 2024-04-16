package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.InvReportDao;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.InvReportDto;
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.inventory.service.InvReportService;

@Service
@Transactional
public class InvReportServicempl implements InvReportService {
	
	
	@Autowired
	InvReportDao invReportDao;

	@Override
	public List <InvReportDto> getAllItemStockBelowMinimunLevelReport(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.getAllItemStockBelowMinimunLevelReport(request);
	}

	@Override
	public List<InvReportDto> getAllItemExpirayDateReport(String userDate,String touserDate,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.getAllItemExpirayDateReport(userDate,touserDate, request);
	}

	@Override
	public List<InvReportDto> getAllItemOpeningStockReport(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.getAllItemOpeningStockReport(request);
	}

	@Override
	public List<InvReportDto> getItemDetailsByCategoryWise(
			HttpServletRequest request, Integer categoryType, Integer categoryId) {
		return invReportDao.getItemDetailsByCategoryWise(categoryType, categoryId,request);
	}
	
	@Override
	public List<InvReportDto> getGoodReceiptNoteReports(
			HttpServletRequest request) {
		return invReportDao.getGoodReceiptNoteReports(request);
	}

	@Override
	public List<InvReportDto> getMrnIssueReports(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.getMrnIssueReports(request);
	}

	@Override
	public List<InvReportDto> getStockReturnReports(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.getStockReturnReports(request);
	}

	@Override
	public List<BatchStockDto> getInventoryStockReport(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.getInventoryStockReport(request);
	}

	@Override
	public BatchStockDto getInventoryStockAutoSuggestion(String itemName,
			String callFrom, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.getInventoryStockAutoSuggestion( itemName, callFrom, request);
	}

	@Override
	public List<BatchStockDto> searchItemById(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.searchItemById(id, request);
	}

	@Override
	public SubInventoryMasterDto subInventorySearchResult(
			String subInventoryName, String callFrom, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.subInventorySearchResult(subInventoryName, callFrom, request);
	}

	@Override
	public List<BatchStockDto> getSubInDataById(int id,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.getSubInDataById(id, request);
	}

	@Override
	public List<GoodsIssueMrnItemSlaveDto> getAllSubInvStock(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return invReportDao.getAllSubInvStock(request);
	}
	
}
