package com.hms.opdbill.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.opdbill.dao.OpdQueueDao;
import com.hms.opdbill.dto.OpdQueueDto;
import com.hms.opdbill.service.OpdQueueService;

@Service
@Transactional
public class OpdQueueServiceImpl implements OpdQueueService {
	
	@Autowired
	OpdQueueDao opdQueueDao;
	
	@Override
	public OpdQueueDto getAllOpdQueuePatient(OpdQueueDto objDto,Integer startIndex) {	
		
		return opdQueueDao.getAllOpdQueuePatient(objDto,startIndex);
	}

	@Override
	public OpdQueueDto getAllDiagQueuePatient(OpdQueueDto objDto,Integer startIndex) {
		
		return opdQueueDao.getAllDiagQueuePatient(objDto,startIndex);
	}

	@Override
	public OpdQueueDto getAllIvfQueuePatient(OpdQueueDto objDto) {
		
		return opdQueueDao.getAllIvfQueuePatient(objDto);
	}
	
	@Override
	@Transactional
	public List<RegistrationViewDto2>  getAllPatientRecordsForPrevDiagnostic(String letter,String usertype,int deptId, Integer unitId,Integer startIndex) {
		
		
		//HttpSession session = request.getSession();
		//Integer userId = (Integer) session.getAttribute("userId1");
		if(deptId == 2){
			return opdQueueDao.getAllPatientRecordsForPrevDiagnostic(letter,usertype,deptId,unitId);
		}else{
			//return billNobleDao.getPreviousTreatmentPatientIPD(letter,usertype,deptId,unitId);
		return opdQueueDao.getPreviousTreatmentPatient(letter,usertype,deptId,unitId,startIndex);
		}
	}

	@Override
	public Integer getAllOpdQueuePatientCount() {
		// TODO Auto-generated method stub
		return opdQueueDao.getAllOpdQueuePatientCount();
	}
	
	@Override
	public Integer getAllDiagQueuePatientCount() {
		// TODO Auto-generated method stub
		return opdQueueDao.getAllDiagQueuePatientCount();
	}
	@Override
	@Transactional
	public Integer getPrevDiagnosticCount() {
		// TODO Auto-generated method stub
		return opdQueueDao.getPrevDiagnosticCount();
	}
}
