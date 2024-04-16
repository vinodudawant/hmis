package com.hms.ivf.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ivf.dto.IVFPrescriptionDtoSP;
import com.hms.ivf.dto.IVFPrescriptionFolloUpDto;
import com.hms.ivf.dto.IvfPrescriptionsDto;

public interface IVFPrescriptionService {



	int savefollowUpForIVFPatient(IVFPrescriptionFolloUpDto opdFolloUp, Integer treatmentId, Integer ivfTreatId, HttpServletRequest request);

	IVFPrescriptionFolloUpDto getfollowUpForIVFDoctorDesk(Integer unitId, Integer treatmentId, Integer ivfTreatId);

	int saveIVFPrescription(IvfPrescriptionsDto obj, HttpServletRequest request, Integer productId);

	List<IVFPrescriptionDtoSP> getAllIVFPrescriptions(Integer treatmentId, Integer unitId, Integer ivfTreatId);

	IVFPrescriptionDtoSP getIVFPrescriptionById(Integer unitId, Integer ivfPrescriptionId);

	boolean deleteIVFPrescription(Integer unitId, String ivfPrescriptionId, HttpServletRequest request);

}
