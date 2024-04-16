package com.hms.pathology.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.ItemMasterDto;
import com.hms.pathology.dto.LabReagentDetailsDTO;

public interface LabReagentDetailsDao {
	
	public ItemMasterDto getAllReagentList(String type);
	
	public ItemMasterDto getAllAssetList();
	
	public ItemMasterDto getReagentValues(Integer id,HttpServletRequest request);
	
	public int saveReagentDetails(LabReagentDetailsDTO labReagentDetailsDTO, HttpServletRequest request);
	
	public List<LabReagentDetailsDTO> getAllReagentByTest(Integer testId,HttpServletRequest request);
	
	public LabReagentDetailsDTO editReagentById(Integer id,HttpServletRequest request);
	
	public boolean deleteReagentById(Integer id,HttpServletRequest request);

}
