package com.hms.ipd.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dao.IPDManagementDAO;
import com.hms.ipd.dto.DischargeSummaryListDTO;
import com.hms.ipd.dto.OTTypeDTO;
import com.hms.ipd.dto.OperatianSummaryListDTO;
import com.hms.ipd.service.IPDManagementService;

@Service
@Transactional
public class IPDManagementServiceImpl implements IPDManagementService{

	@Autowired
	private IPDManagementDAO ipdManagementDAO;
	
	@Override
	public List<ChargesMasterSlave> getAvailableBed(String action, String hallId) {
		List<ChargesMasterSlave> listHall=null;
		int unitID=1;
		if (hallId.equals("allHallBed")) {
			
			listHall= ipdManagementDAO.getAvailableBed(unitID);
		}else {
			listHall= ipdManagementDAO.getAvailableBed(unitID);
		}
		return listHall;
	}

	@Override
	public List<DischargeSummaryListDTO> dischargeSummaryList(String action) {
		
		return ipdManagementDAO.dischargeSummaryList();
	}

	@Override
	public List<OperatianSummaryListDTO> operatianSummaryList(String action) {
		return ipdManagementDAO.operatianSummaryList();
	}

	@Override
	public List<OTTypeDTO> fetchOTName(String action) {
		return ipdManagementDAO.fetchOTName();
	}
	
	@Override
	public List<ChargesMasterSlave> getBedStacticsData(String action,Integer unitId) {
		
		List<ChargesMasterSlave> listHall=null;
		int unitID=1;
			listHall= ipdManagementDAO.getBedStacticsData(unitID);
	
		return listHall;
		
	}
	
	
	

}
