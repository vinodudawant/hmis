package com.hms.ehat.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.WardTypeDao;
import com.hms.administrator.dto.HallManagementDto;
import com.hms.ehat.dao.IPDDao;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.service.IPDService;
@Service
public class IPDServiceImpl implements IPDService {
	@Autowired
	IPDDao ipddao;
	@Override
	@Transactional
	public HallManagementDto fetchWordNameList(Integer hallType) {
		
		return ipddao.fetchWordNameList(hallType);
	}

	@Override
	@Transactional
	public HallManagementDto fetchNoOfBeds(Integer hallId) {
		// TODO Auto-generated method stub
		return ipddao.fetchNoOfBeds(hallId);
	}

	@Override
	@Transactional
	public String allocateBedToPatient(TreatMentBeds obj, String BedAllocStatus, String DallocBedId,
			String billableBedType, String patientType) {
		
		return ipddao.allocateBedToPatient(obj, BedAllocStatus, DallocBedId, billableBedType, patientType);
	}

	

}
