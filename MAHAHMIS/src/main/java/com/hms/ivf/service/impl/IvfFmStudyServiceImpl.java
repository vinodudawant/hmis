package com.hms.ivf.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ivf.dao.IvfFmStudyDao;
import com.hms.ivf.dto.FmFollicularData;
import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.dto.IVFFollicularSutdyRecord;
import com.hms.ivf.service.IvfFmStudyService;
@Service
public class IvfFmStudyServiceImpl implements IvfFmStudyService {

	@Autowired
	IvfFmStudyDao fmdao;
	
	@Override
	@Transactional
	public int saveFmStudy(IVFFollicularStudy obj) {
		
		return fmdao.saveFmStudy(obj);
	}

	@Override
	@Transactional
	public List<IVFFollicularStudy> lstIVFFolicularStudy(Integer patientId) {
	
		return fmdao.lstIVFFolicularStudy(patientId);
	}

	@Override
	@Transactional
	public List<IVFFollicularSutdyRecord> fetchStudyRecord(String inidate, Integer patientId) {
		
		return fmdao.fetchStudyRecord(inidate, patientId);
	}

	@Override
	@Transactional
	public int saveFmStudyRecordData(IVFFollicularSutdyRecord obj) {
		
		return fmdao.saveFmStudyRecordData(obj);
	}

	@Override
	@Transactional
	public int addCommentsInStudyRecord(int recordId, String comments) {
		
		return fmdao.addCommentsInStudyRecord(recordId, comments);
	}

	@Override
	@Transactional
	public int deleteStudyRecord(int userId, int recordId) {
		// TODO Auto-generated method stub
		return fmdao.deleteStudyRecord(userId, recordId);
	}

	@Override
	@Transactional
	public int cancelOrCloseCycle(int masterFollicularStudyId, String cycleStatus,String endDate) {
		// TODO Auto-generated method stub
		return fmdao.cancelOrCloseCycle(masterFollicularStudyId, cycleStatus, endDate);
	}

	@Override
	@Transactional
	public int saveFollicularData(FmFollicularData obj) {
		
		return fmdao.saveFollicularData(obj);
	}

	@Override
	@Transactional
	public List<FmFollicularData> getLisOfFmData(Integer patientId, String cycleNo) {
		
		return fmdao.getLisOfFmData(patientId, cycleNo);
	}

}
