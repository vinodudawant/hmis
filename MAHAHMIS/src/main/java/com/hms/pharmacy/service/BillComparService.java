package com.hms.pharmacy.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import com.hms.pharmacy.pojo.ReportPurchase;


public interface BillComparService {

	List<ReportPurchase> getpurchaseData(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype);

}
