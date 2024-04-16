package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.IpdCollectionReportDetails;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TotalCollectionDetails;

public interface TotalCollectionService {

	List<ServiceMasterDto> getAllServices(HttpServletRequest req);

	List<SubServiceDto> getMultipleSubservices(Integer serviceId);

	List<TotalCollectionDetails> getServiceWiseReport(String fromdatetime, String todatetime, String department,
			String sponsorId, String serviceId,int doctorid, String subServiceId, Integer patientType);

	List<IpdCollectionReportDetails> getIpdAllDetails(String fromdatetime, String todatetime, int payMode);

}
