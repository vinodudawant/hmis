package com.hms.ehat.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.LabResultDao;
import com.hms.ehat.dto.LabResultDTO;
import com.hms.ehat.service.LabResultService;

@Service
public class LabResultServiceImp implements LabResultService{

	@Autowired
	LabResultDao labResultDao;

	@Override
	public List<LabResultDTO> getResult(String reqNo) {
		List<LabResultDTO> list = labResultDao.getResult(reqNo);
		return list;
	}

	@Override
	@Transactional
	public List<Integer> getReqNoByTid(Integer tid) {
		List<Integer> list =labResultDao.getReqNoByTid(tid);
		return list;
	}
}
