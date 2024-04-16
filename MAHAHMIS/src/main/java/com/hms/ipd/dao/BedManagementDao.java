package com.hms.ipd.dao;

public interface BedManagementDao {

	String allocateBed(int bedID, int tid, String bedAllocStatus, String dallocBedId, String isolation,
			String patientType, String billableBedType, Integer userId, Integer unitId);
	
	String shiftBed(int bedID, int tid, String bedAllocStatus, String dallocBedId, String isolation,
			String patientType, String billableBedType, Integer userId, Integer unitId);

}
