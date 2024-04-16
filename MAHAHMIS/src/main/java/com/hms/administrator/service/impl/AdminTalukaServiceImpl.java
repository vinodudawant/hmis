package com.hms.administrator.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dao.AdminTalukaDao;
import com.hms.administrator.dto.AdminTalukaDTO;
import com.hms.administrator.service.AdminTalukaService;

@Service
@Transactional
public class AdminTalukaServiceImpl implements AdminTalukaService {

	@Autowired
	AdminTalukaDao admiTalukaDao;
	
	@Override
	public int saveAdminTaluka(AdminTalukaDTO taluka,HttpServletRequest request) {
		return admiTalukaDao.saveAdminTaluka(taluka, request);
	}

	@Override
	public List<AdminTalukaDTO> getAllTaluka() {
		return admiTalukaDao.getAllTaluka();
	}

	@Override
	public AdminTalukaDTO editTalukaById(int taluka_id,
			HttpServletRequest request) {
		return admiTalukaDao.editTalukaById(taluka_id, request);
	}

	@Override
	public boolean deleteTalukaById(int taluka_id, HttpServletRequest request) {
		return admiTalukaDao.deleteTalukaById(taluka_id, request);
	}

	@Override
	public List<AdminTalukaDTO> getAllTalukaListByDistrictId(int districtId,
			HttpServletRequest request) {
		return admiTalukaDao.getAllTalukaListByDistrictId(districtId, request);
	}

	@Override
	public List<AdminTalukaDTO> searchTalukaByName(String name,
			HttpServletRequest request) {
		return admiTalukaDao.searchTalukaByName(name, request);
	}

}
