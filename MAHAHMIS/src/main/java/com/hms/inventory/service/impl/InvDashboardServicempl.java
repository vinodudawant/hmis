package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.InvDashboardDao;
import com.hms.inventory.dto.InvDashboardDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.service.InvDashboardService;

@Service
@Transactional
public class InvDashboardServicempl implements InvDashboardService {

	@Autowired 
	private InvDashboardDao dashboardDao;
	@Override
	public List<InvDashboardDto> getItemStockBelowMinimumInQty(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return dashboardDao.getItemStockBelowMinimumInQty(request);
	}

	@Override
	public List<InvDashboardDto> getProductExpired(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return dashboardDao.getProductExpired(request);
	}

	@Override
	public List<InvDashboardDto> getProductNearExpiry(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return dashboardDao.getProductNearExpiry(request);
	}

	@Override
	public List<MrnMasterDTO> getTodayIndent(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return dashboardDao.getTodayIndent(request);
	}

	@Override
	public List<MrnMasterDTO> getInProgressIndent(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return dashboardDao.getInProgressIndent(request);
	}

	@Override
	public List<MrnMasterDTO> getPendingIndent(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return dashboardDao.getPendingIndent(request);
	}
	
}
