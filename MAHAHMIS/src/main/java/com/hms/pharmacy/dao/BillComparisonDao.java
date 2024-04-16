package com.hms.pharmacy.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.pharmacy.pojo.ReportPurchase;


public interface BillComparisonDao {

	List<ReportPurchase> getpurchaseData(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype);

}
