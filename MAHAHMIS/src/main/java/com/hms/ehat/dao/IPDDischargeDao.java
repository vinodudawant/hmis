package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ipd.dto.DischargePlanDTO;
import com.hms.ipd.dto.DischargeProcessDTO;
import com.hms.ipd.dto.IpdPatientDischargeSummaryDTO;
import com.hms.ot.dto.TreatmentOperations;

public interface IPDDischargeDao
{
	
	public int saveIPDDischargePlan(DischargePlanDTO objDto,HttpServletRequest request);

	public List<DischargePlanDTO> fetchDischargePlan(int treatmentId);

	public int saveIPDDischargeProcess(DischargeProcessDTO objDto, HttpServletRequest request);
	
	public List<DischargeProcessDTO> fetchDischargeProcess(int treatmentId);

	public CustomizeTemplate getTemplateListByDepartmentId(Integer departmentid,String selectTemplateType);
	
	public CustomizeTemplate getTemplateListByTemplateId(Integer id);
	
	public Integer saveUpdateIPDDischargeSummaryTemplate(IpdPatientDischargeSummaryDTO objTemplate, String queryType);

	public IpdPatientDischargeSummaryDTO fetchIPDDischargeSummaryTemplate(int treatmentId , int pid);

	public List<TreatmentOperations> fetchOperationsData(int treatmentId, int patientId);

	public List<DischargePlanDTO> fetchPhyDisDetailsbyTreatmentId(Integer treatId,Integer patientId);
}
