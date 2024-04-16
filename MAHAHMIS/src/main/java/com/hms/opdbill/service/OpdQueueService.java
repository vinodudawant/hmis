package com.hms.opdbill.service;

import java.util.List;

import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.opdbill.dto.OpdQueueDto;

public interface OpdQueueService {

	OpdQueueDto getAllOpdQueuePatient(OpdQueueDto objDto,Integer startIndex);
	OpdQueueDto getAllDiagQueuePatient(OpdQueueDto objDto,Integer startIndex);
	OpdQueueDto getAllIvfQueuePatient(OpdQueueDto objDto);
	
	//**added by Vishant **//
	List<RegistrationViewDto2> getAllPatientRecordsForPrevDiagnostic(String letter, String usertype,int deptId, Integer unitId,Integer startIndex);
	
	//Added By Badrinath 
		//17/10/23
	Integer getAllOpdQueuePatientCount();
	
	Integer getAllDiagQueuePatientCount();
	Integer getPrevDiagnosticCount();
}
