package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.LabResultDTO;

public interface LabResultDao {

	List<LabResultDTO> getResult(String reqNo);

	List<Integer> getReqNoByTid(Integer tid);

}
