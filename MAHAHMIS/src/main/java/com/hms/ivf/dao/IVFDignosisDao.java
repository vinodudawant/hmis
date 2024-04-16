package com.hms.ivf.dao;

import java.util.List;

import com.hms.ivf.dto.IVFDignosisDTO;

public interface IVFDignosisDao {
int saveIVFDignosis(IVFDignosisDTO obj);
	
	List<IVFDignosisDTO> getListOfIVFDignosis(Integer ivfTreatId,Integer unitId);
	
	IVFDignosisDTO editIVFDignosis(Integer ivfdignoMasterId);
	
	int deleteIVFDigno(String ivfdignoMasterId,Integer userId);
	
	int updateDignosisStatus(String ivfdignoMasterId,Integer userId,String callFrom);
}
