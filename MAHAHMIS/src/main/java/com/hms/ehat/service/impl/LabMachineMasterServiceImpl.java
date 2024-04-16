package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.LabMachineMasterDao;
import com.hms.ehat.service.LabMachineMasterService;
import com.hms.pathology.dto.LabMachineMasterDto;
import com.hms.pathology.dto.LabTestNormalValuesDTO;

@Service
@Transactional
public class LabMachineMasterServiceImpl implements LabMachineMasterService {

	@Autowired
	LabMachineMasterDao labMachineMasterDao;

	@Override
	public String saveMachineName(LabMachineMasterDto dto,
			HttpServletRequest request) {

		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

		dto.setUnitId(unitId);
		dto.setCreatedBy(userId);
		return labMachineMasterDao.saveMachineName(dto, request);
	}

	@Override
	public LabMachineMasterDto getallMachines(String searchText, String type,Integer headingId) {

		return labMachineMasterDao.getallMachines(searchText, type, headingId);

	}

	@Override
	public LabMachineMasterDto editMachineName(int machineId) {
		return labMachineMasterDao.editMachineName(machineId);
	}

	@Override
	public boolean deleteMachine(int machineId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");

		return labMachineMasterDao.deleteMachine(machineId, userId);
	}

	@Override
	public LabMachineMasterDto getallMachineList() {
		return labMachineMasterDao.getallMachineList();
	}

	@Override
	public List<LabMachineMasterDto> getMachineNameWithTestId(int testId) {
		return labMachineMasterDao.getMachineNameWithTestId(testId);
	}

	@Override
	public List<LabTestNormalValuesDTO> getNormalValueRangeWithMachineId(
			int mId,int idLabTest) {
		return labMachineMasterDao.getNormalValueRangeWithMachineId(mId,idLabTest);
	}

	@Override
	public boolean deleteMachinewiseNormalValue(int machineId,int idLabTest,
			HttpServletRequest request) {
		
		return labMachineMasterDao.deleteMachinewiseNormalValue(machineId,idLabTest, request);
	}

}
