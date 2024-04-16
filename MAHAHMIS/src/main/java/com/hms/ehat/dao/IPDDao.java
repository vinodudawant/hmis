package com.hms.ehat.dao;

import com.hms.administrator.dto.HallManagementDto;
import com.hms.ehat.dto.TreatMentBeds;

public interface IPDDao {
	HallManagementDto fetchWordNameList(Integer hallType);
	HallManagementDto fetchNoOfBeds(Integer hallId);
	String allocateBedToPatient(TreatMentBeds obj,String BedAllocStatus,String DallocBedId,String billableBedType,String patientType);
}
