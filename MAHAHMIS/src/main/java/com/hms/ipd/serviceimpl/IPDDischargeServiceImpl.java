package com.hms.ipd.serviceimpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.ehat.dao.IPDDischargeDao;
import com.hms.ehat.dao.NursingTransactionDaoNEW;
import com.hms.ehat.dto.PrePostChecklistDTO;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ipd.dto.DischargePlanDTO;
import com.hms.ipd.dto.DischargeProcessDTO;
import com.hms.ipd.dto.IpdPatientDischargeSummaryDTO;
import com.hms.ipd.service.IPDDischargeService;
import com.hms.ot.dto.TreatmentOperations;

@Service
public class IPDDischargeServiceImpl implements IPDDischargeService
{

	@Autowired
	IPDDischargeDao DischargeDao;
	
	
	@Override
	@Transactional
	public int saveIPDDischargePlan(DischargePlanDTO objDto, HttpServletRequest request) {
		return DischargeDao.saveIPDDischargePlan(objDto,request);
		
	}


	@Override
	@Transactional
	public List<DischargePlanDTO> fetchDischargePlan(int treatmentId) {
		return DischargeDao.fetchDischargePlan(treatmentId);
		
	}


	@Override
	@Transactional
	public int saveIPDDischargeProcess(DischargeProcessDTO objDto, HttpServletRequest request) {
		return DischargeDao.saveIPDDischargeProcess(objDto,request);
	}
	
	@Override
	@Transactional
	public List<DischargeProcessDTO> fetchDischargeProcess(int treatmentId) {
		return DischargeDao.fetchDischargeProcess(treatmentId);
		
	}
	
	@Override
	@Transactional
	public CustomizeTemplate getTemplateListByDepartmentId(Integer departmentid , String selectTemplateType) {
		// TODO Auto-generated method stub
		return DischargeDao.getTemplateListByDepartmentId(departmentid,selectTemplateType);
	}
	

	@Override
	@Transactional
	public CustomizeTemplate getTemplateListByTemplateId(Integer id) {
		return DischargeDao.getTemplateListByTemplateId(id);
	}
	
	@Override
	@Transactional
	public Integer saveUpdateIPDDischargeSummaryTemplate(IpdPatientDischargeSummaryDTO objTemplate, String queryType) {
		return DischargeDao.saveUpdateIPDDischargeSummaryTemplate(objTemplate,queryType);

	}
	
	@Override
	@Transactional
	public IpdPatientDischargeSummaryDTO fetchIPDDischargeSummaryTemplate(int treatmentId ,int pid) {
		return DischargeDao.fetchIPDDischargeSummaryTemplate(treatmentId , pid);
	}

	
	@Override
	@Transactional
	public List<TreatmentOperations> fetchOperationsData(int treatmentId, int patientId) {
		return DischargeDao.fetchOperationsData(treatmentId,patientId);
		
	}


	@Override
	@Transactional
	public List<DischargePlanDTO> fetchPhyDisDetailsbyTreatmentId(Integer treatId,Integer patientId) {
		// TODO Auto-generated method stub
		return DischargeDao.fetchPhyDisDetailsbyTreatmentId(treatId,patientId);
	}
}
