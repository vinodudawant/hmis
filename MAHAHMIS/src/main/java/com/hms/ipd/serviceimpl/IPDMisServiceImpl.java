package com.hms.ipd.serviceimpl;

import java.lang.invoke.MethodHandles;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ipd.dao.IPDMisDao;
import com.hms.ipd.dto.IPDMisReportDTO;
import com.hms.ipd.dto.OPDMisReportDTO;
import com.hms.ipd.service.IPDMisService;

@Service
@Transactional
public class IPDMisServiceImpl implements IPDMisService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	@Autowired
	IPDMisDao misDao;

	@Override
	public List<IPDMisReportDTO> fetchIPDMisReport(String fromDate, String toDate, Integer searchBy) {
		
		LOGGER.info("IPDMisServiceImpl method fetchIPDMisReport called.");
		
		return misDao.fetchIPDMisReport(fromDate, toDate, searchBy);
	}

	@Override
	public List<OPDMisReportDTO> fetchOPDMisReport(String fromDate, String toDate, String searchBy,
			Integer specialityId, Integer doctorId) {
		LOGGER.info("IPDMisServiceImpl method fetchOPDMisReport called.");
		
		return misDao.fetchOPDMisReport(fromDate, toDate, searchBy, specialityId, doctorId);
	}
}
