package com.hms.ivf.service;

import java.util.List;

import com.hms.ivf.dto.IVFDignosisDTO;

public interface IVFDignosisService {
	
int saveIVFDignosis(IVFDignosisDTO obj,Integer treatmentId,Integer patientId,Integer ivfTreateId);
	
	List<IVFDignosisDTO> getListOfIVFDignosis(Integer ivfTreatId,Integer unitId);
	
	IVFDignosisDTO editIVFDignosis(Integer ivfdignoMasterId);
	
	int deleteIVFDigno(String ivfdignoMasterId,Integer userId);
	
	int updateDignosisStatus(String ivfdignoMasterId,Integer userId,String callFrom);

}
