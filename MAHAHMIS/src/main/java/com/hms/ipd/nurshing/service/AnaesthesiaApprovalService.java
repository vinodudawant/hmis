package com.hms.ipd.nurshing.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestParam;

import com.hms.doctordesk.dto.OPDSxAdvicedDTO;
import com.hms.dto.VitalSing;
import com.hms.ipd.nurshing.dto.AnaesthesiaApprovalDto;
import com.hms.ipd.nurshing.dto.IntraOpNotesDto;
import com.hms.ipd.nurshing.dto.PreopDto;
import com.hms.ot.dto.ConductAnaesthesia;
public interface AnaesthesiaApprovalService {

	public int saveAnaesthesiaApproval(AnaesthesiaApprovalDto obj, Integer patientId, Integer treatmentId);

	public int saveAnaesthesiaPreOp(PreopDto obj, Integer patientId, Integer treatmentId);

	public int saveIntraOperation(IntraOpNotesDto obj, Integer patientId, Integer treatmentId);
	
	public PreopDto getAnaesthesiaPreOp(Integer patientId,Integer treatmentId);
	
	public IntraOpNotesDto getIntraOperation(Integer patientId,Integer treatmentId);

	public AnaesthesiaApprovalDto fetchAnaesthesiaApproval(Integer patientId, Integer treatmentId);

	public int saveConductAnaesthesia(ConductAnaesthesia objConductAnaesthesia, VitalSing objVitalSing,
			String queryType);
	

}
