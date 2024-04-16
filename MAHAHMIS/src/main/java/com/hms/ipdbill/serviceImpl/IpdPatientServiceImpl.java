package com.hms.ipdbill.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ipdbill.dao.IpdPatientDao;
import com.hms.ipdbill.dto.IpdPatientsDto;
import com.hms.ipdbill.service.IpdPatientService;
@Service
public class IpdPatientServiceImpl implements IpdPatientService{

	@Autowired
	IpdPatientDao ipdPatientDao;
	
	@Override
	@Transactional
	public List<IpdPatientsDto> autoSuggestationIpdPatients(Integer unitId, String callFrom,
			String findText,int wardType,Integer startIndex,int wardName,String activeBlock) {
		// TODO Auto-generated method stub
		return ipdPatientDao.autoSuggestationIpdPatients(unitId,callFrom,findText,wardType,startIndex,wardName,activeBlock);
}

	@Override
	@Transactional
	public List<IpdPatientsDto> autoSuggestationPhyDischarge(Integer unit_id, String callFrom, String findText,
			Integer wardType, Integer wardName,Integer startIndex) {
		// TODO Auto-generated method stub
		return ipdPatientDao.autoSuggestationPhyDischarge(unit_id,callFrom,findText,wardType,wardName,startIndex);
	}
	
	@Override
	@Transactional
	public List<IpdPatientsDto> getAllRecordForCosentForm(Integer unit_id, String callFrom,
			String findText,int deptId) {
		// TODO Auto-generated method stub
		return ipdPatientDao.getAllRecordForCosentForm(unit_id,callFrom,findText,deptId);
	}

	@Override
	@Transactional
	public Integer getTotalBedCount(Integer wardType,Integer wardName) {
		// TODO Auto-generated method stub
		return ipdPatientDao.getTotalBedCount(wardType,wardName);
	}

	@Override
	@Transactional
	public Integer getAllActivePatCount() {
		// TODO Auto-generated method stub
		return ipdPatientDao.getAllActivePatCount();
	}

	@Override
	@Transactional
	public Integer getAllPhyDiscPatientCount() {
		// TODO Auto-generated method stub
		return ipdPatientDao.getAllPhyDiscPatientCount();
	}
	
}
