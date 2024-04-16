package com.hms.ipd.serviceimpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.dto.DischargeSummery;
import com.hms.dto.PaediatricDeptNICU;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipd.dao.IPD_AutoSummaryDao;
import com.hms.ipd.dto.DischargePlanDTO;
import com.hms.ipd.service.IPD_AutoSummaryService;
import com.hms.ivf.dto.IVFAutoSummaryDischargeDTO;

@Service
public class IPD_AutoSummaryServiceImpl implements IPD_AutoSummaryService
{
	@Autowired
	IPD_AutoSummaryDao ASummaryDao;
	
	@Override
	@Transactional
	public List<TreatmentDto> fetchPatientAdmissionNote(TreatmentDto treatment) {
		return ASummaryDao.fetchPatientAdmissionNote(treatment);
	}

	@Override
	@Transactional
	public List<DiagonosisMasterDto> getListOfDiagoList(int treatmentId) {
		// TODO Auto-generated method stub
		return ASummaryDao.getListOfDiagoList(treatmentId);
	}
	
	@Override
	@Transactional
	public int saveAutoDischargeSummery(DischargeSummery obj , String SummarNOte,PaediatricDeptNICU nicuObj) {
		
		return ASummaryDao.saveAutoDischargeSummery(obj ,SummarNOte, nicuObj) ;
	}

	@Override
	@Transactional
	public List<DischargeSummery> fetchAutoDischargeSummery(int treatmentId) {
		return ASummaryDao.fetchAutoDischargeSummery(treatmentId);
		
	}

	@Override
	@Transactional
	public int updateAdmissionNote(int treatmentId, String adNote) {
		
		return ASummaryDao.updateAdmissionNote(treatmentId, adNote);
	}


	
}
