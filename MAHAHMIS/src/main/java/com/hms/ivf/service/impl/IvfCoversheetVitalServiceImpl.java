package com.hms.ivf.service.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dto.CoversheetVitalInfo;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IvfCoversheetVitalDao;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.dto.IvfCoverSheetVitalDTO;
import com.hms.ivf.service.IvfCoversheetVitalService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
@Transactional
public class IvfCoversheetVitalServiceImpl  implements IvfCoversheetVitalService{
	
	@Autowired
	IvfCoversheetVitalDao  coverdao;
	
	@Autowired
	SessionFactory sf;

	@Override
	public int saveCoversheetVital(String coversheetDetails, Integer patientId, Integer treatmentId,Integer ivftreatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		IVFTreatmentDTO ivftobj=(IVFTreatmentDTO) sf.getCurrentSession().get(IVFTreatmentDTO.class, ivftreatmentId);
		IvfCoverSheetVitalDTO planObj = (IvfCoverSheetVitalDTO) ConfigUIJSONUtility.getObjectFromJSON(coversheetDetails,
				IvfCoverSheetVitalDTO.class);
		 List<IvfCoverSheetVitalDTO> list=   planObj.getGetListOfOPDCoversheetVitalDTO();
		 int res=0;
		
		 for(IvfCoverSheetVitalDTO obj:list) {
			 obj.setPatientObj(pobj);
			 obj.setTreatObj(tobj);
			 obj.setIvfTreatObj(ivftobj);
			 // sxaddao.saveOPDPlanOfTreatment(obj);
			 sf.getCurrentSession().merge(obj);
			  res=1;
		 }
		return res;
	}

	@Override
	public List<IvfCoverSheetVitalDTO> getCoversheetTreatmentListByTreatmentId(Integer treatmentId, Integer unitId,
			String CallFrom, String userDate) {
		
		return coverdao.getCoversheetTreatmentListByTreatmentId(treatmentId, unitId, CallFrom, userDate);
	}

	@Override
	public List<CoversheetVitalInfo> lstCoversheetVitalInfo(Integer patientId) {
		// TODO Auto-generated method stub
		return coverdao.lstCoversheetVitalInfo(patientId);
	}

}
