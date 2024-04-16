package com.hms.doctordesk.dao;

import java.util.List;

import com.hms.doctordesk.dto.OPDCareAdviceDTO;
import com.hms.doctordesk.dto.OPDChemoTheropyDTO;
import com.hms.doctordesk.dto.OPDPlanOfTreatmentDTO;
import com.hms.doctordesk.dto.OPDRadioTheorapyMaster;
import com.hms.doctordesk.dto.OPDRadioTheropyCheckBox;
import com.hms.doctordesk.dto.OPDSxAdvicedDTO;
import com.hms.ot.dto.Operation;

public interface OPDSxAdviceDao {
public int saveOPDSxAdvice(OPDSxAdvicedDTO obj);
	
	public List<OPDSxAdvicedDTO> getOPDSxAdviceListByTreatmentId(Integer treatmentId,Integer unitId);
	
	public OPDSxAdvicedDTO editOPDSxAdvice(Integer id);
	
	public int deleteOPDSxAdvice(Integer id,Integer userId);
	
public int saveOPDRadioTheropy(OPDRadioTheorapyMaster obj);
	
	public List<OPDRadioTheorapyMaster> getOPDRadioTheropyListByTreatmentId(Integer treatmentId,Integer unitId);
	
	public OPDRadioTheorapyMaster editOPDRadioTheropy(Integer id);
	
	public int deleteOPDRadioTheropy(Integer id,Integer userId);
	
public int saveOPDCareAdvice(OPDCareAdviceDTO obj);
	
	public OPDCareAdviceDTO editOPDCareAdvice(Integer id);
	
	public List<OPDRadioTheropyCheckBox> getRadioTheropyCheckBoxList(String prefixCode);
	
	public int delteRadioTheropySlave(Integer id,Integer userId);
	
public int saveOPDPlanOfTreatment(OPDPlanOfTreatmentDTO obj);
	
	public List<OPDPlanOfTreatmentDTO> getOPDPlanOfTreatmentListByTreatmentId(Integer treatmentId,Integer unitId);
	
	public int deltePlanOfTreatment(Integer id,Integer userId);
	
	public int saveOPDChemoTheropy(OPDChemoTheropyDTO obj);
	
	public List<OPDChemoTheropyDTO> getOPDChemoListByTreatmentId(Integer treatmentId,Integer unitId);
	
	public OPDChemoTheropyDTO editOPDChemoByTreatmentIdAndDate(Integer treatmentId,String  userDate);
	
	public Operation getOpreationName(Integer procedureType,Integer  procedureGroup);
	
	public OPDChemoTheropyDTO getOPDChemoByTreatmentIdForPrint(Integer treatmentId);
	
	public List<OPDRadioTheropyCheckBox> getCheckListOPDPlanOfTreatmentListByTreatmentId(Integer treatmentId,Integer unitId);
}
