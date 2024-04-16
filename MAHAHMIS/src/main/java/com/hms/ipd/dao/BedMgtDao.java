package com.hms.ipd.dao;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ipd.dto.PatientBedInfoDTO;
import com.hms.opdbill.dto.PatientHeaderInfoDto;

public interface BedMgtDao {

	PatientHeaderInfoDto getIpdPatientHeaderInfo(int treatmentId, int unitId);
	ChargesMasterSlave getWardTypeList(int hallTypeId);
	PatientBedInfoDTO getPatientBedDetails(int chargesSlaveId, int hallId, String callFrom, int unitId);
	double getAdminChargesIpd(int unitId, int deptId);
	int allocateBedToPatient(TreatMentBeds treatmentBeds);
	PatientBedInfoDTO getBillableBedCharges(int chargesSlaveId, int hallId, String callFrom);
	void sendSMSDoctorCK(int treatmentId);
}
