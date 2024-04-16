package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.TotalCollectionDao;
import com.hms.ehat.dto.IpdCollectionReportDetails;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TotalCollectionDetails;
import com.hms.ehat.service.TotalCollectionService;

@Service
@Transactional
public class TotalCollectionServiceImpl implements TotalCollectionService{

	@Autowired
	TotalCollectionDao totalCollectionDao;
	
	@Override
	public List<ServiceMasterDto> getAllServices(HttpServletRequest req) {
		
		return totalCollectionDao.getAllServices(req);
	}

	@Override
	public List<SubServiceDto> getMultipleSubservices(Integer serviceId) {
		
		return totalCollectionDao.getMultipleSubservices(serviceId);
	}

	@Override
	public List<TotalCollectionDetails> getServiceWiseReport(String fromdatetime, String todatetime, String department,
			String sponsorId, String serviceId,int doctorid, String subServiceId, Integer patientType) {
		
		return totalCollectionDao.getServiceWiseReport(fromdatetime, todatetime, department, sponsorId, serviceId,doctorid, subServiceId, patientType);
	}

	@Override
	public List<IpdCollectionReportDetails> getIpdAllDetails(String fromdatetime, String todatetime, int payMode) {
		
		return totalCollectionDao.getIpdAllDetails(fromdatetime, todatetime, payMode);
	}

}
