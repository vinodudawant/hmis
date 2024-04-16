package com.hms.ivf.service.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IvfSxDao;
import com.hms.ivf.dto.IVFCareAdviceDTO;
import com.hms.ivf.dto.IVFSxAdvicedDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.service.IvfSxService;

@Service
public class IvfSxServiceImpl implements IvfSxService {
	
	@Autowired
	SessionFactory sf;
	
	@Autowired
	IvfSxDao ivfdao;

	@Override
	@Transactional
	public int saveIVFSxAdvice(IVFSxAdvicedDTO obj, Integer patientId, Integer treatmentId, Integer ivfTreatmentId) {
		
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		IVFTreatmentDTO ivftobj=(IVFTreatmentDTO) sf.getCurrentSession().get(IVFTreatmentDTO.class, ivfTreatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		obj.setIvfTreatObj(ivftobj);
		return ivfdao.saveIVFSxAdvice(obj);
	}

	@Override
	@Transactional
	public List<IVFSxAdvicedDTO> getIVFSxAdviceListByTreatmentId(Integer treatmentId, Integer unitId) {
		
		return ivfdao.getIVFSxAdviceListByTreatmentId(treatmentId, unitId);
	}

	@Override
	@Transactional
	public IVFSxAdvicedDTO editIVFSxAdvice(Integer id) {
		
		return ivfdao.editIVFSxAdvice(id);
	}

	@Override
	@Transactional
	public int deleteIVFSxAdvice(Integer id, Integer userId) {
		
		return ivfdao.deleteIVFSxAdvice(id, userId);
	}

	@Override
	@Transactional
	public int saveIVFCareAdvice(IVFCareAdviceDTO obj, Integer patientId, Integer treatmentId, Integer ivfTreatmentId) {
		
	RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
	TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
	IVFTreatmentDTO ivftobj=(IVFTreatmentDTO) sf.getCurrentSession().get(IVFTreatmentDTO.class, ivfTreatmentId);
	
	obj.setPatientObj(pobj);
	obj.setTreatObj(tobj);
	obj.setIvfTreatObj(ivftobj);
	return ivfdao.saveIVFCareAdvice(obj);
	}

	@Override
	@Transactional
	public IVFCareAdviceDTO editIVFCareAdvice(Integer id) {
		
		return ivfdao.editOPDCareAdvice(id);
	}

}
