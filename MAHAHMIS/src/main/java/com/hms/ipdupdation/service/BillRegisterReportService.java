package com.hms.ipdupdation.service;

import java.util.List;

import com.hms.ehat.dto.BillRegisterReportDto;
import com.hms.ehat.dto.SpecialityWiseCountReport;
import com.hms.ehat.dto.UserEntryLogReportDto;


public interface BillRegisterReportService {
	BillRegisterReportDto fetchIpdPatientsRecords(int unitId,int userId,String fDate,String tDate,String callFrom);

	List<UserEntryLogReportDto> getUserEntryLogReport(Integer unitId, String fromDate, String toDate);

	List<SpecialityWiseCountReport> getSpecialityWiseReport(Integer unitId, String fromDate, String toDate, String CallFrom);
	
	BillRegisterReportDto getLabBillRegisterReport(int unitId,int userId,String fDate,String tDate,String callFrom);
	
	int setDistributeAmountForLab(String fDate,String tDate, Integer departmentId);
}
