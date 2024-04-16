package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.SampleContainerDao;
import com.hms.ehat.service.SampleContainerService;
import com.hms.pathology.dto.SampleContainerDTO;


@Service
@Transactional
public class SampleContainerServiceImpl implements SampleContainerService {

	@Autowired
	SampleContainerDao sampleContainerDao;

	
	@Override
	public int saveSampleContainer(SampleContainerDTO sampleContainer,
			HttpServletRequest request) {
		return sampleContainerDao.saveSampleContainer(sampleContainer, request);
	}

	@Override
	public List<SampleContainerDTO> getAllSampleContainer() {
		return sampleContainerDao.getAllSampleContainer();
	}

	@Override
	public SampleContainerDTO editSampleContainerById(int sampleContainerId,
			HttpServletRequest request) {
		return sampleContainerDao.editSampleContainerById(sampleContainerId, request);
	}

	@Override
	public boolean deleteSampleContainerById(int sampleContainerId,
			HttpServletRequest request) {
		return sampleContainerDao.deleteSampleContainerById(sampleContainerId, request);
	}

	@Override
	public List<SampleContainerDTO> searchSampleContainerByName(String name,
			HttpServletRequest request) {
		return sampleContainerDao.searchSampleContainerByName(name, request);
	}

}
