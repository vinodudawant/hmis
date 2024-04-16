package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.GrowthChartDao;
import com.hms.doctordesk.service.GrowthChartService;
import com.hms.dto.StandardAndPatientBMIDetailsDTO;

@Service
@Transactional
public class GrowthChartServiceImpl implements GrowthChartService {

	@Autowired
	GrowthChartDao growthChartDao;
	
	@Override
	public List<StandardAndPatientBMIDetailsDTO> getGrowthChartDetails(
			String perform, String patientId) {
		
		List<StandardAndPatientBMIDetailsDTO> standardAndPatientBMIDetailsDTOList = null;
		if(perform.equalsIgnoreCase("LESS_THAN_FIVE_YEARS")){
			standardAndPatientBMIDetailsDTOList = growthChartDao.getGrowthChartDetailsLessThanFiveYears(patientId);
		}else if(perform.trim().equalsIgnoreCase("GREATER_THAN_FIVE_YEARS")){
			standardAndPatientBMIDetailsDTOList = growthChartDao.getGrowthChartDetailsGreaterThanFiveYears(patientId);
		}
		return standardAndPatientBMIDetailsDTOList;
	}

}
