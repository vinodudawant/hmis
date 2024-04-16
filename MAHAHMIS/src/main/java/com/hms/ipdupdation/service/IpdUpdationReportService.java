package com.hms.ipdupdation.service;

import java.util.List;

import com.hms.ehat.dto.RegTreBillDto;

public interface IpdUpdationReportService {
	List<RegTreBillDto> fetchIpdPatientsRecords(int unitId,int userId,String fDate,String tDate,String callFrom);
}
