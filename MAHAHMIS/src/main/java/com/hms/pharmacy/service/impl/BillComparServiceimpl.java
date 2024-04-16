package com.hms.pharmacy.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.BillComparisonDao;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.service.BillComparService;

@Service
public class BillComparServiceimpl implements BillComparService {

	@Autowired
	BillComparisonDao billComparisonDao;
	/*******
	 * @author    :BILAL
	 * @Date      :12-03-2018
	 * @Code      :For Bill Comparison 
	 * *******/
	@Override
	@Transactional
	public List<ReportPurchase> getpurchaseData(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype) {
		
		return billComparisonDao.getpurchaseData(request,fromDate,
				toDate, categoryId,companyId,productId,vendortId,unitId,purtranstype);
	}

}
