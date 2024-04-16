package com.hms.ehat.service.impl;





import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.hms.ehat.dao.ReportDashboardDao;
import com.hms.ehat.service.ReportDashboardService;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;

@Service
public class ReportDashboardServiceImpl implements ReportDashboardService {

	@Autowired
	ReportDashboardDao reportDashboardDao;
	
	@Override
	@Transactional
	public List<BillReceiptMasterDTO> getlistOfPackageOpd() {
		
		return reportDashboardDao.getlistOfPackageOpd();
	}

	/**@author :Bilal 
	 * @date   :22-Aug-2017
	 * @code   :for getting total amount of paid of opd**/
	@Override
	@Transactional
	public double getTotalAmountOfOPD(String callfrom, String datecallfrom) {
		
		return reportDashboardDao.getTotalAmountOfOPD(callfrom,  datecallfrom);
	}

	/**@author :Bilal 
	 * @date   :22-Aug-2017
	 * @code   :for getting total amount of paid of ipd**/
	@Override
	@Transactional
	public double getTotalAmountOfIPD(String callfrom,String datecallfrom) {
		
		return reportDashboardDao.getTotalAmountOfIPD(callfrom,datecallfrom);
	}

	/**@author :Bilal 
	 * @date   :23-Aug-2017
	 * @code   :for getting total amount of paid of opd refund**/
	@Override
	@Transactional
	public double getTotalRefundAmountOfOPD(String callfrom, String datecallfrom) {
		// TODO Auto-generated method stub
		return reportDashboardDao.getTotalRefundAmountOfOPD(callfrom,datecallfrom);
	}

	/**@author :Bilal 
	 * @date   :23-Aug-2017
	 * @code   :for getting Refund amount of ipd**/
	@Override
	@Transactional
	public double getTotalRefundAmountOfIPD(String callfrom, String datecallfrom) {
		
		return reportDashboardDao.getTotalRefundAmountOfIPD(callfrom,
				datecallfrom);
	}

	/**@author :Bilal 
	 * @date   :23-Aug-2017
	 * @code   :for getting Amount of opd based on date**/
	@Override
	@Transactional
	public double getTotalAmountDateWiseOPD(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {
		
		return reportDashboardDao.getTotalAmountDateWiseOPD(callfrom,datecallfrom,fromDate,toDate);
	}

	/**@author :Bilal 
	 * @date   :23-Aug-2017
	 * @code   :for getting Amount of ipd based on date**/
	@Override
	@Transactional
	public double getTotalAmountDateWiseIPD(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {
		
		return reportDashboardDao.getTotalAmountDateWiseIPD(callfrom,datecallfrom,fromDate,toDate);
	}

	/**@author :Bilal 
	 * @date   :23-Aug-2017
	 * @code   :for Refund AMount Of OPD from Date to Todate**/
	@Override
	@Transactional
	public double getTotalRefundAmtDateWise(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {
		// TODO Auto-generated method stub
		return reportDashboardDao.getTotalRefundAmtDateWise(callfrom,datecallfrom,fromDate,toDate);
	}

	/**@author :Bilal 
	 * @date   :23-Aug-2017
	 * @code   :for Refund AMount Of IPD from Date to To date**/
	@Override
	@Transactional
	public double getTotalRefundAmtDateWiseIPD(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {
		
		return reportDashboardDao.getTotalRefundAmtDateWiseIPD(callfrom,datecallfrom,fromDate,toDate);
	}

	/**@author :Bilal 
	 * @date   :24-Aug-2017
	 * @code   :for Total patient of OPD**/
	@Override
	@Transactional
	public Long getTotalPatientOPD(String callfrom, String datecallfrom) {
		
		return reportDashboardDao.getTotalPatientOPD(callfrom,datecallfrom);
	}

	/**@author :Bilal 
	 * @date   :24-Aug-2017
	 * @code   :for Total patient of IPD**/
	@Override
	@Transactional
	public Long getTotalPatientIPD(String callfrom, String datecallfrom) {
		
		return reportDashboardDao.getTotalPatientIPD(callfrom,datecallfrom);
	}

	/**@author :Bilal 
	 * @date   :25-Aug-2017
	 * @code   :for Total patient of OPD From date to date**/
	@Override
	@Transactional
	public Long getTotalPatientOPDDatewise(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {
		
		return reportDashboardDao.getTotalPatientOPDDatewise(callfrom,datecallfrom,fromDate,toDate);
	}

	/**@author :Bilal 
	 * @date   :25-Aug-2017
	 * @code   :for Total patient of IPD From date to date**/
	@Override
	@Transactional
	public Long getTotalPatientIPDDatewise(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {
		
		return reportDashboardDao.getTotalPatientIPDDatewise(callfrom,datecallfrom,fromDate,toDate);
	}

	/**@author :Bilal 
	 * @date   :28-Aug-2017
	 * @code   :for Total patient of Diagnostics**/
	@Override
	@Transactional
	public Long getTotalPatientDiagnostics(String callfrom, String datecallfrom) {
		
		return reportDashboardDao.getTotalPatientDiagnostics(callfrom,datecallfrom);
	}

	/**@author :Bilal 
	 * @date   :28-Aug-2017
	 * @code   :for Total patient of Diagnostics From date to date**/
	@Override
	@Transactional
	public Long getTotalPatientDiagnosticsDatewise(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {
		
		return reportDashboardDao.getTotalPatientDiagnosticsDatewise(callfrom,datecallfrom,fromDate,toDate);
	}

	

}
