package com.hms.pathology.serviceImpl;


import javax.transaction.Transactional;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pathology.dao.LabInterfacingDao;
import com.hms.pathology.service.LabInterfacingApiService;


@Service
@Transactional
public class LabInterfacingServiceImpl implements LabInterfacingApiService{

	@Autowired
	LabInterfacingDao labDao;
	
	@Override
	public Object getTestDetailsFromSampleId(Integer sampleId) {
	
		return labDao.getTestDetailsFromSampleId(sampleId);
	}

	@Override
	public boolean savemachinevalues(JSONArray jsonArray1) {
		return labDao.savemachinevalues(jsonArray1);

	}

}
