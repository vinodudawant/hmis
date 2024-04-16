package com.hms.ivf.service.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IVFDignosisDao;
import com.hms.ivf.dto.IVFDignosisDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.service.IVFDignosisService;
@Service
public class IVFDignosisServiceImpl implements IVFDignosisService {
	@Autowired 
	SessionFactory sf;
	
	@Autowired
	IVFDignosisDao ivfddao;

	@Override
	@Transactional
	public int saveIVFDignosis(IVFDignosisDTO obj, Integer treatmentId, Integer patientId, Integer ivfTreateId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		IVFTreatmentDTO ivfobj=(IVFTreatmentDTO) sf.getCurrentSession().get(IVFTreatmentDTO.class, ivfTreateId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		obj.setIvfTreatObj(ivfobj);
		
		return ivfddao.saveIVFDignosis(obj);
	}

	@Override
	@Transactional
	public List<IVFDignosisDTO> getListOfIVFDignosis(Integer ivfTreatId, Integer unitId) {
		
		return ivfddao.getListOfIVFDignosis(ivfTreatId, unitId);
	}

	@Override
	@Transactional
	public IVFDignosisDTO editIVFDignosis(Integer ivfdignoMasterId) {
		
		return ivfddao.editIVFDignosis(ivfdignoMasterId);
	}

	@Override
	@Transactional
	public int deleteIVFDigno(String ivfdignoMasterId, Integer userId) {
		// TODO Auto-generated method stub
		return ivfddao.deleteIVFDigno(ivfdignoMasterId, userId);
	}

	@Override
	@Transactional
	public int updateDignosisStatus(String ivfdignoMasterId, Integer userId, String callFrom) {
		
		return ivfddao.updateDignosisStatus(ivfdignoMasterId, userId, callFrom);
	}

}
