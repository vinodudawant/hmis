package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.InvDashboardDto;
import com.hms.inventory.dto.MrnMasterDTO;

public interface InvDashboardDao {

	List<InvDashboardDto> getItemStockBelowMinimumInQty(HttpServletRequest request);
	List<InvDashboardDto> getProductExpired(HttpServletRequest request);
	List<InvDashboardDto> getProductNearExpiry(HttpServletRequest request);
	List<MrnMasterDTO> getTodayIndent(HttpServletRequest request);
	List<MrnMasterDTO> getInProgressIndent(HttpServletRequest request);
	List<MrnMasterDTO> getPendingIndent(HttpServletRequest request);


}
