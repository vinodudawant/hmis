package com.hms.ivf.service;

import java.util.List;

import com.hms.ivf.dto.FmFollicularData;
import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.dto.IVFFollicularSutdyRecord;

public interface IvfFmStudyService {
	
	int saveFmStudy(IVFFollicularStudy obj);
	
	List<IVFFollicularStudy> lstIVFFolicularStudy(Integer patientId);
	
	List<IVFFollicularSutdyRecord> fetchStudyRecord(String inidate,Integer patientId);
	
	int saveFmStudyRecordData(IVFFollicularSutdyRecord obj);
	
	int addCommentsInStudyRecord(int recordId,String comments);
	
	int deleteStudyRecord(int userId,int recordId);
	
	int cancelOrCloseCycle(int masterFollicularStudyId,String  cycleStatus,String endDate);
	
	int saveFollicularData(FmFollicularData obj);
	
	List<FmFollicularData>   getLisOfFmData(Integer patientId,String cycleNo);

}
