package com.hms.ivf.service.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IvfDietDao;
import com.hms.ivf.dto.IVFBmiMasterDTO;
import com.hms.ivf.dto.IVFDietDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.service.IvfDietService;

@Service
public class IvfDietServiceImpl implements IvfDietService {

	@Autowired
	SessionFactory sf;
	@Autowired
	IvfDietDao ivfdao;
	
	
	@Override
	@Transactional
	public int saveIVFDiet(IVFDietDTO obj, Integer patientId, Integer treatmentId, Integer ivftreatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
	TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
	IVFTreatmentDTO ivftobj=(IVFTreatmentDTO) sf.getCurrentSession().get(IVFTreatmentDTO.class, ivftreatmentId);
	obj.setPatientObj(pobj);
	obj.setTreatObj(tobj);
	obj.setIvfTreatObj(ivftobj);
	
	return ivfdao.saveIVFDiet(obj);
	
	}

	@Override
	@Transactional
	public IVFDietDTO editIVFDiet(Integer dietMasterId) {
		
		return ivfdao.editIVFDiet(dietMasterId);
	}

	@Override
	@Transactional
	public List<IVFDietDTO> getIVFDietListByTreatmentId(Integer treatmentId) {
		
		return ivfdao.getIVFDietListByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public int deleteIVFDiet(String dietMasterIds, Integer userId) {
		
		return ivfdao.deleteIVFDiet(dietMasterIds, userId);
	}

	@Override
	@Transactional
	public List<IVFDietDTO> getIVFietListByDietIds(String dietIds) {
		
		return ivfdao.getIVFietListByDietIds(dietIds);
	}

	@Override
	@Transactional
	public int saveIVFPatientBMI(IVFBmiMasterDTO obj, Integer patientId, Integer treatmentId, Integer ivftreatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		IVFTreatmentDTO ivftobj=(IVFTreatmentDTO) sf.getCurrentSession().get(IVFTreatmentDTO.class, ivftreatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		obj.setIvfTreatObj(ivftobj);
		return ivfdao.saveIVFPatientBMI(obj);
	}

	@Override
	@Transactional
	public List<IVFBmiMasterDTO> getIVFBMIListByTreatmentId(Integer treatmentId) {
		
		return ivfdao.getIVFBMIListByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public IVFBmiMasterDTO editIVFBMI(Integer opdBmiMasterId) {
		
		return ivfdao.editIVFBMI(opdBmiMasterId);
	}

}
