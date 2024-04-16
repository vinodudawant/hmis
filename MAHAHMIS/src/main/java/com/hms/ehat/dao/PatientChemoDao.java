package com.hms.ehat.dao;

import java.sql.Timestamp;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.PatientCareAdvicesDto;
import com.hms.dto.PatientChemoDto;
import com.hms.ehat.dto.ChemoTheropyMaterDto;
import com.hms.ehat.dto.PatientChemoOrderSheetDto;

public interface PatientChemoDao {

	int saveOrUpdatePatChemo(PatientChemoDto patChemoDto);

	List<PatientChemoDto> getPatientChemo(String callFrom,String Date,int pid,int tid);

	int saveOrUpdatePatAdvice(PatientCareAdvicesDto patCareAdvDto);

	List<PatientCareAdvicesDto> getPatCareAdvices(int treatId);

	ChemoTheropyMaterDto getChemoProtocol(String letter);

	//List<PatientCareAdvicesDto> getPatCareAdvices();
	
	int saveOrderSheet(PatientChemoOrderSheetDto patientChemoOrderSheetDto);

	List<PatientChemoOrderSheetDto> getPatientChemoOrderSheet(String callFrom,String chemoDt,Integer treatId);

	int updateOrderSheet(Timestamp fromTimestamp, int userId, int tid,String orderString, String date, HttpServletRequest request);
	
	List<PatientChemoDto> getPatientChemoAll(int treatmentId,String callFrom, String date);
	
	List<PatientChemoOrderSheetDto> getOrderSheetAll(int treatmentId);
}
