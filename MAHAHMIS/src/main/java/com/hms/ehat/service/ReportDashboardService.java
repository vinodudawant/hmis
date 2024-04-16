package com.hms.ehat.service;




import java.sql.Date;
import java.util.List;

import com.hms.ipdbill.dto.BillReceiptMasterDTO;

public interface ReportDashboardService {

	List<BillReceiptMasterDTO> getlistOfPackageOpd();

	double getTotalAmountOfOPD(String callfrom, String datecallfrom);

	double getTotalAmountOfIPD(String callfrom, String datecallfrom);

	double getTotalRefundAmountOfOPD(String callfrom, String datecallfrom);

	double getTotalRefundAmountOfIPD(String callfrom, String datecallfrom);

	double getTotalAmountDateWiseOPD(String callfrom, String datecallfrom,
			Date fromDate, Date toDate);

	double getTotalAmountDateWiseIPD(String callfrom, String datecallfrom,
			Date fromDate, Date toDate);

	double getTotalRefundAmtDateWise(String callfrom, String datecallfrom,
			Date fromDate, Date toDate);

	double getTotalRefundAmtDateWiseIPD(String callfrom, String datecallfrom,
			Date fromDate, Date toDate);

	Long getTotalPatientOPD(String callfrom, String datecallfrom);

	Long getTotalPatientIPD(String callfrom, String datecallfrom);

	Long getTotalPatientOPDDatewise(String callfrom, String datecallfrom,
			Date fromDate, Date toDate);

	Long getTotalPatientIPDDatewise(String callfrom, String datecallfrom,
			Date fromDate, Date toDate);

	Long getTotalPatientDiagnostics(String callfrom, String datecallfrom);

	Long getTotalPatientDiagnosticsDatewise(String callfrom,
			String datecallfrom, Date fromDate, Date toDate);

	


}
