package com.hms.doctordesk.service.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.OPDCoversheetVitalDao;
import com.hms.doctordesk.dto.CoversheetVitalInfo;
import com.hms.doctordesk.dto.OPDCoverSheetVitalDTO;

import com.hms.doctordesk.service.OPDCoversheetVitalService;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
@Transactional
public class OPDCoversheetVitalServiceImpl implements OPDCoversheetVitalService  {

	@Autowired
	OPDCoversheetVitalDao coverdao;
	
	@Autowired
	SessionFactory sf;
	
	@Override
	public int saveCoversheetVital(String coversheetDetails, Integer patientId, Integer treatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		OPDCoverSheetVitalDTO planObj = (OPDCoverSheetVitalDTO) ConfigUIJSONUtility.getObjectFromJSON(coversheetDetails,
				OPDCoverSheetVitalDTO.class);
		 List<OPDCoverSheetVitalDTO> list=   planObj.getGetListOfOPDCoversheetVitalDTO();
		 int res=0;
		
		 for(OPDCoverSheetVitalDTO obj:list) {
			 obj.setPatientObj(pobj);
			 obj.setTreatObj(tobj);
			 // sxaddao.saveOPDPlanOfTreatment(obj);
			 sf.getCurrentSession().merge(obj);
			  res=1;
		 }
		return res;
	}

	@Override
	public List<OPDCoverSheetVitalDTO> getCoversheetTreatmentListByTreatmentId(Integer treatmentId, Integer unitId,
			String CallFrom, String userDate) {
		
		return coverdao.getCoversheetTreatmentListByTreatmentId(treatmentId, unitId, CallFrom, userDate);
	}

	@Override
	public List<CoversheetVitalInfo> lstCoversheetVitalInfo(Integer patientId) {
		// TODO Auto-generated method stub
		return coverdao.lstCoversheetVitalInfo(patientId);
	}

}
