package com.hms.ipd.nurshing.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.ipd.nurshing.dto.TreatmentDischargeDto;

public interface TreatmentDischargeService {

	int savetreatmentDischarge(TreatmentDischargeDto obj, HttpServletRequest request, Integer productId);

	List<TreatmentDischargeDto> getAllPrescriptionsByTreatmentId(Integer treatmentId, Integer unitId);

	boolean usePrescriptionTemp(Integer treatmentId, Integer patientId, Integer templateId, HttpServletRequest request);

	TreatmentDischargeDto editIPDTreatmentAtDicharge(Integer prescriptionId,HttpServletRequest request);
	
	boolean deleteIPDTreatmentAtDicharge(Integer unitId, String prescriptionId, HttpServletRequest request);
	


}
