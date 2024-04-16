package com.hms.administrator.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.AdminTalukaDTO;

public interface AdminTalukaDao {

int saveAdminTaluka(AdminTalukaDTO taluka,HttpServletRequest request);
	
	public List<AdminTalukaDTO> getAllTaluka();
	
	public AdminTalukaDTO editTalukaById(int taluka_id,HttpServletRequest request);
	
	public boolean deleteTalukaById(int taluka_id,HttpServletRequest request);
	
	public List<AdminTalukaDTO> getAllTalukaListByDistrictId(int districtId,HttpServletRequest request);
	
	public List<AdminTalukaDTO> searchTalukaByName(String name,HttpServletRequest request);
}
