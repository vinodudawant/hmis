package com.hms.ehat.service;

import java.util.List;

import com.hms.ehat.dto.LabResultDTO;

public interface LabResultService {

	List<LabResultDTO> getResult(String reqNo);

	List<Integer> getReqNoByTid(Integer tid);

}
