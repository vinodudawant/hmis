package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.VitalInfoDao;
import com.hms.doctordesk.dto.MeasureMentsDto;
import com.hms.doctordesk.dto.VitalDto;
import com.hms.doctordesk.dto.VitalInfoDto;
import com.hms.doctordesk.service.VitalInfoService;
import com.hms.dto.PatientBmiDTO;

@Service
@Transactional
public class VitalsInfoServiceImpl implements VitalInfoService{
	
	@Autowired
	VitalInfoDao vitalInfoDao;

	@Override
	public String saveVitalsInfo(String vitalInfoDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return vitalInfoDao.saveVitalsInfo(vitalInfoDto, request);
	}

	@Override
	public String saveMeasureMents(PatientBmiDTO patientBmiDTO,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return vitalInfoDao.saveMeasureMents(patientBmiDTO, request);
	}

	@Override
	public List<VitalInfoDto> getVitalList(int treatmentId,String callfrom) {
		// TODO Auto-generated method stub
		return vitalInfoDao.getVitalList(treatmentId,callfrom);
	}

	@Override
	public List<VitalInfoDto> getVitalListById(int id) {
		// TODO Auto-generated method stub
		return vitalInfoDao.getVitalListById(id);
	}

	@Override
	public String deleteVitalsValues(int id,HttpServletRequest request){
		// TODO Auto-generated method stub
		return vitalInfoDao.deleteVitalsValues(id,request);
	}

	@Override
	public List<PatientBmiDTO> getMeasureMents(int patientId,String callfrom) {
		// TODO Auto-generated method stub
		return vitalInfoDao.getMeasureMents(patientId,callfrom);
	}

	@Override
	public List<PatientBmiDTO> getMeasureMentsListById(int id) {
		// TODO Auto-generated method stub
		return vitalInfoDao.getMeasureMentsListById(id);
	}

	@Override
	public String deleteMeasureMentsValues(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return vitalInfoDao.deleteMeasureMentsValues(id, request);
	}

}