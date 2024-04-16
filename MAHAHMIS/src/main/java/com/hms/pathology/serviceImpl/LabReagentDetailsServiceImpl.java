package com.hms.pathology.serviceImpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.inventory.dto.ItemMasterDto;
import com.hms.pathology.dao.LabReagentDetailsDao;
import com.hms.pathology.dto.LabReagentDetailsDTO;
import com.hms.pathology.service.LabReagentDetailsService;

@Service
@Transactional
public class LabReagentDetailsServiceImpl implements LabReagentDetailsService {

	@Autowired
	LabReagentDetailsDao labReagentDetailsDao;
	
	@Override
	public ItemMasterDto getAllReagentList(String type) {
		return labReagentDetailsDao.getAllReagentList(type);
	}

	@Override
	public ItemMasterDto getAllAssetList() {
		return labReagentDetailsDao.getAllAssetList();
	}

	@Override
	public ItemMasterDto getReagentValues(Integer id, HttpServletRequest request) {
		return labReagentDetailsDao.getReagentValues(id, request);
	}

	@Override
	public int saveReagentDetails(LabReagentDetailsDTO labReagentDetailsDTO,
			HttpServletRequest request) {
		return labReagentDetailsDao.saveReagentDetails(labReagentDetailsDTO, request);
	}

	@Override
	public List<LabReagentDetailsDTO> getAllReagentByTest(Integer testId,
			HttpServletRequest request) {
		return labReagentDetailsDao.getAllReagentByTest(testId, request);
	}

	@Override
	public LabReagentDetailsDTO editReagentById(Integer id,
			HttpServletRequest request) {
		return labReagentDetailsDao.editReagentById(id, request);
	}

	@Override
	public boolean deleteReagentById(Integer id, HttpServletRequest request) {
		return labReagentDetailsDao.deleteReagentById(id, request);
	}

}
