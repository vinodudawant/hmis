package com.hms.opdbill.dao;

import java.util.List;

import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.opdbill.dto.OpdQueueDto;

public interface OpdQueueDao {

	OpdQueueDto getAllOpdQueuePatient(OpdQueueDto objDto,Integer startIndex);
	OpdQueueDto getAllDiagQueuePatient(OpdQueueDto objDto,Integer startIndex);
	OpdQueueDto getAllIvfQueuePatient(OpdQueueDto objDto);
	
	
	//** Added by Vishant**//
	List<RegistrationViewDto2> getAllPatientRecordsForPrevDiagnostic(String letter, String usertype,int deptId, Integer unitId);
	
	List<RegistrationViewDto2> getPreviousTreatmentPatient(String letter, String usertype,int deptId, Integer unitId,Integer startIndex);
	
	//Added By Badrinath 
	//17/10/23
	Integer getAllOpdQueuePatientCount();
	
	Integer getAllDiagQueuePatientCount();
	Integer getPrevDiagnosticCount();
}
