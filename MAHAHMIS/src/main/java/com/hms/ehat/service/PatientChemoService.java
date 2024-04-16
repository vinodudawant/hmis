package com.hms.ehat.service;

import java.sql.Timestamp;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.PatientCareAdvicesDto;
import com.hms.dto.PatientChemoDto;
import com.hms.ehat.dto.ChemoTheropyMaterDto;
import com.hms.ehat.dto.PatientChemoOrderSheetDto;

public interface PatientChemoService {

	int saveOrUpdatePatChemo(PatientChemoDto patChemoDto,HttpServletRequest request);

	List<PatientChemoDto> getPatientChemo(String callFrom,PatientChemoDto patientChemoDto,HttpServletRequest request);
	
	int saveOrUpdatePatAdvice(PatientCareAdvicesDto patCareAdvDto,HttpServletRequest request);

	List<PatientCareAdvicesDto> getPatCareAdvices(PatientCareAdvicesDto careAdvicesDto, HttpServletRequest request);

	ChemoTheropyMaterDto getChemoProtocol(String letter);
	
	int saveOrderSheet(PatientChemoOrderSheetDto patientChemoOrderSheetDto,HttpServletRequest request);

	List<PatientChemoOrderSheetDto> getPatientChemoOrderSheet(String callFrom,PatientChemoOrderSheetDto patOrderSheetDto,HttpServletRequest request);

	int updateOrderSheet(Timestamp fromTimestamp,int userId,int tid, String orderString, String date,HttpServletRequest request);

	List<PatientCareAdvicesDto>getPatCareAdvices2(int Treat);

	List<PatientChemoDto> getPatientChemoAll(int treatmentId,String callFrom, String date);
	
	List<PatientChemoOrderSheetDto> getOrderSheetAll(int treatmentId);
}
