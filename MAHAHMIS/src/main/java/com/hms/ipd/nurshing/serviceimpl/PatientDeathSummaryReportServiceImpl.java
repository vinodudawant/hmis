package com.hms.ipd.nurshing.serviceimpl;

import java.sql.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ipd.nurshing.dao.PatientDeathSummaryReportDao;
import com.hms.ipd.nurshing.dto.PatientDeathSummaryReportDTO;
import com.hms.ipd.nurshing.service.PatientDeathSummaryReportService;

@Service
public class PatientDeathSummaryReportServiceImpl implements PatientDeathSummaryReportService{
	
	@Autowired
	PatientDeathSummaryReportDao pdao;

	@Override
	@Transactional
	public int savePatientDeathSummary(PatientDeathSummaryReportDTO pobj, HttpServletRequest request) {
		if (pobj.getPatientDeathId() == 0){		
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			pobj.setCreatedBy(userId);
			pobj.setCreatedDate(new Date(new java.util.Date().getTime()));
			
			int response = pdao.savePatientDeathSummary(pobj, request);			
			return response;
			
	}
	else{
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				pobj.setUpdatedBy(userId);
				pobj.setUpdatedDate(new Date(new java.util.Date().getTime()));
				
				int response = pdao.savePatientDeathSummary(pobj, request);			
				return response;
		  
	}
	}

	@Override
	@Transactional
	public List<PatientDeathSummaryReportDTO> getListOfDeathSummaryReportByTreatmentId(Integer treatmentId) {
		return pdao.getListOfDeathSummaryReportByTreatmentId(treatmentId);
		}

}
