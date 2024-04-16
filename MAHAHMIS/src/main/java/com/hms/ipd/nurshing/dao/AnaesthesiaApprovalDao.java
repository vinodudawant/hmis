package com.hms.ipd.nurshing.dao;

import java.util.List;

import com.hms.dto.VitalSing;
import com.hms.ipd.nurshing.dto.AnaesthesiaApprovalDto;
import com.hms.ipd.nurshing.dto.IntraOpNotesDto;
import com.hms.ipd.nurshing.dto.PreopDto;
import com.hms.ot.dto.ConductAnaesthesia;


public interface AnaesthesiaApprovalDao {

	int saveAnaesthesiaApproval(AnaesthesiaApprovalDto obj);

	int saveAnaesthesiaPreOp(PreopDto obj);

	int saveIntraOperation(IntraOpNotesDto obj);
	
	public IntraOpNotesDto getIntraOperation(Integer patientId,Integer treatmentId);

	//public int saveAnaesthesiaApproval(AnaesthesiaApprovalDto obj, Integer patientId, Integer treatmentId);
	
	public PreopDto getAnaesthesiaPreOp(Integer patientId,Integer treatmentId);
	
	public AnaesthesiaApprovalDto fetchAnaesthesiaApproval(Integer patientId, Integer treatmentId);

	int saveConductAnaesthesia(ConductAnaesthesia objConductAnaesthesia, VitalSing objVitalSing, String queryType);

	

}
