package com.hms.doctordesk.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.OPDConsultantDoctorDao;
import com.hms.doctordesk.dto.OPDConstultantDoctorDto;
import com.hms.doctordesk.dto.OPDTokenDto;
import com.hms.doctordesk.service.OPDConsultantDoctorService;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.registration.dto.SpecialityWiseDoctorDto;
import com.hms.registration.dto.SpecializationDto;

@Service
@Transactional
public class OPDConsultantDoctorServiceImpl implements OPDConsultantDoctorService {
	
	@Autowired
	OPDConsultantDoctorDao cdao;

	@Override
	public SpecializationDto getSpecialization(SpecializationDto regDto) {
		regDto.setLstSpecialization(cdao.getSpecialization(regDto));
		return regDto;
	}

	@Override
	public SpecialityWiseDoctorDto getDoctorBySpecialization(SpecialityWiseDoctorDto regDto) {
		regDto.setLstDoctorBySpecialization(cdao.getDoctorBySpecialization(regDto));
		return regDto;
		
	}

	@Override
	public int addNewConsultantOpd(BillDetailsDto obj, String queryType) {
		
		return cdao.addNewConsultantOpd(obj, queryType);
	}

	@Override
	public List<OPDConstultantDoctorDto> getlstOPDConsultantDoctor(Integer treatmentId,Integer patientId,Integer unitId) {
		
		return cdao.getlstOPDConsultantDoctor( treatmentId, patientId, unitId);
	}

	@Override
	public int getLatestConsultantDoctorIdByTreatment(Integer treatmentId) {
		
		return cdao.getLatestConsultantDoctorIdByTreatment(treatmentId);
	}

	@Override
	public int getDepartNameByDoctorId(Integer doctorId) {
		
		return cdao.getDepartNameByDoctorId(doctorId);
	}

	@Override
	public String checkUpDoneOrCancelOPD(OPDTokenDto obj) {
		
		return cdao.checkUpDoneOrCancelOPD(obj);
	}
	
	@Override
	public List<OPDConstultantDoctorDto> getlstIPDConsultantDoctor(Integer treatmentId,Integer patientId,Integer unitId) {
		
		return cdao.getlstIPDConsultantDoctor( treatmentId, patientId, unitId);
	}
	
	@Override
	public int addNewConsultantIpd(BillDetailsIpdDto obj, String queryType) {
		
		return cdao.addNewConsultantIpd(obj, queryType);
	}
	
	@Override
	public List<OPDConstultantDoctorDto> getIPDConsultantDoctorNew(Integer treatmentId,Integer patientId,Integer unitId) {
		
		return cdao.getIPDConsultantDoctorNew( treatmentId, patientId, unitId);
	}


}
