package com.hms.doctordesk.dao;

import java.util.List;

import com.hms.doctordesk.dto.OPDConstultantDoctorDto;
import com.hms.doctordesk.dto.OPDTokenDto;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.registration.dto.SpecialityWiseDoctorDto;
import com.hms.registration.dto.SpecializationDto;

public interface OPDConsultantDoctorDao {
	List<SpecializationDto> getSpecialization(SpecializationDto regDto);
	List<SpecialityWiseDoctorDto> getDoctorBySpecialization(SpecialityWiseDoctorDto regDto);
	int addNewConsultantOpd(BillDetailsDto obj,String queryType);
	List<OPDConstultantDoctorDto>  getlstOPDConsultantDoctor(Integer treatmentId,Integer patientId,Integer unitId);
	int getLatestConsultantDoctorIdByTreatment(Integer treatmentId);
	int getDepartNameByDoctorId(Integer doctorId);
	String checkUpDoneOrCancelOPD(OPDTokenDto obj);
	
	List<OPDConstultantDoctorDto>  getlstIPDConsultantDoctor(Integer treatmentId,Integer patientId,Integer unitId);
	
	int addNewConsultantIpd(BillDetailsIpdDto obj,String queryType);
	
	List<OPDConstultantDoctorDto>  getIPDConsultantDoctorNew(Integer treatmentId,Integer patientId,Integer unitId);
}
