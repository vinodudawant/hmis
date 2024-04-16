package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.pathology.dto.LabMachineMasterDto;
import com.hms.pathology.dto.LabTestNormalValuesDTO;

public interface LabMachineMasterDao {

	public String saveMachineName(LabMachineMasterDto dto, HttpServletRequest request);
	public LabMachineMasterDto getallMachines(String searchText, String type,Integer headingId);
	public LabMachineMasterDto editMachineName(int machineId);
	public boolean deleteMachine(int machineId, int userId);
	public LabMachineMasterDto getallMachineList();
	public List<LabMachineMasterDto> getMachineNameWithTestId(int testId);
	public List<LabTestNormalValuesDTO> getNormalValueRangeWithMachineId(int mId,int idLabTest);
	public boolean deleteMachinewiseNormalValue(int machineId,int idLabTest, HttpServletRequest request);
}
