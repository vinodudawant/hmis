package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.MeasureMentsDto;
import com.hms.doctordesk.dto.VitalDto;
import com.hms.doctordesk.dto.VitalInfoDto;
import com.hms.dto.PatientBmiDTO;

public interface VitalInfoService {


String saveVitalsInfo(String vitalInfoDto,HttpServletRequest httpServletRequest);
	
	/*String saveMeasureMents(MeasureMentsDto measureMentsDto,HttpServletRequest httpServletRequest);*/
	
	String saveMeasureMents(PatientBmiDTO patientBmiDTO,HttpServletRequest httpServletRequest);
	
	List<VitalInfoDto> getVitalList(int patOrTreatId,String callfrom);
	
	List<VitalInfoDto> getVitalListById(int id);
	
	String deleteVitalsValues(int id,HttpServletRequest request);
	
    List<PatientBmiDTO> getMeasureMents(int patientId,String callfrom);
    
     List<PatientBmiDTO> getMeasureMentsListById(int id);
	
	String deleteMeasureMentsValues(int id,HttpServletRequest request);

}