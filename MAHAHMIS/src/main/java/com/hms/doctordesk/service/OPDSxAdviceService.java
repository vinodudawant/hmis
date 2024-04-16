package com.hms.doctordesk.service;

import java.util.List;

import com.hms.doctordesk.dto.OPDCareAdviceDTO;
import com.hms.doctordesk.dto.OPDChemoTheropyDTO;
import com.hms.doctordesk.dto.OPDPlanOfTreatmentDTO;
import com.hms.doctordesk.dto.OPDRadioTheorapyMaster;
import com.hms.doctordesk.dto.OPDRadioTheropyCheckBox;
import com.hms.doctordesk.dto.OPDSxAdvicedDTO;
import com.hms.ehat.dto.PlanTreatDTO;
import com.hms.ot.dto.Operation;

public interface OPDSxAdviceService {

	public int saveOPDSxAdvice(OPDSxAdvicedDTO obj,Integer patientId,Integer treatmentId);
	
	public List<OPDSxAdvicedDTO> getOPDSxAdviceListByTreatmentId(Integer treatmentId,Integer unitId);
	
	public OPDSxAdvicedDTO editOPDSxAdvice(Integer id);
	
	public int deleteOPDSxAdvice(Integer id,Integer userId);
	
	public int saveOPDRadioTheropy(OPDRadioTheorapyMaster obj,String radioSlaveDetails,Integer patientId,Integer treatmentId);
	
	public List<OPDRadioTheorapyMaster> getOPDRadioTheropyListByTreatmentId(Integer treatmentId,Integer unitId);
	
	public OPDRadioTheorapyMaster editOPDRadioTheropy(Integer id);
	
	public int deleteOPDRadioTheropy(Integer id,Integer userId);
	
	public int saveOPDCareAdvice(OPDCareAdviceDTO obj,Integer patientId,Integer treatmentId);
	
	public OPDCareAdviceDTO editOPDCareAdvice(Integer id);
	
	public List<OPDRadioTheropyCheckBox> getRadioTheropyCheckBoxList(String prefixCode);
	
	public int delteRadioTheropySlave(Integer id,Integer userId);
	
	public int saveOPDPlanOfTreatment(String planOfMasterDetails,Integer patientId,Integer treatmentId);
	
	public List<OPDPlanOfTreatmentDTO> getOPDPlanOfTreatmentListByTreatmentId(Integer treatmentId,Integer unitId);
	
	public int deltePlanOfTreatment(Integer id,Integer userId);
	
	public int saveOPDChemoTheropy(OPDChemoTheropyDTO obj,Integer patientId,Integer treatmentId,String nextBloodTestDate,String nextChemoDate,String nextVisitDate);
	
	public List<OPDChemoTheropyDTO> getOPDChemoListByTreatmentId(Integer treatmentId,Integer unitId);
	
	public OPDChemoTheropyDTO editOPDChemoByTreatmentIdAndDate(Integer treatmentId,String  userDate);
	
	public Operation getOpreationName(Integer procedureType,Integer  procedureGroup);
	
	public OPDChemoTheropyDTO getOPDChemoByTreatmentIdForPrint(Integer treatmentId);
	
	// added by Rohini for print
	public List<OPDRadioTheropyCheckBox> getCheckListOPDPlanOfTreatmentListByTreatmentId(Integer treatmentId,Integer unitId);
	
}
