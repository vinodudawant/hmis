package com.hms.laundry.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dto.ItemMasterDto;
import com.hms.laundry.dao.LaundryDao;
import com.hms.laundry.dto.LaundryLinenMasterDTO;
import com.hms.laundry.service.LaundryService;

@Service
@Transactional
public class LaundryServiceImpl implements LaundryService {

	@Autowired
	LaundryDao laundryDao;
	
	@Override
	public List<LaundryLinenMasterDTO> getlist(String subDept) {
		// TODO Auto-generated method stub
		return laundryDao.getlist(subDept);
	}

	@Override
	public Integer getNextMaterialRequestNoteIdInLIstLaundry() {
		// TODO Auto-generated method stub
		return laundryDao.getNextMaterialRequestNoteIdInLIstLaundry();
	}

	@Override
	public List<ItemMasterDto> fetchItemNamesOnlyAutoSuggestForLaundryItems(String letter) {
		// TODO Auto-generated method stub
		return laundryDao.fetchItemNamesOnlyAutoSuggestForLaundryItems(letter);
	}

	@Override
	public Integer getAvalQuantity(String itemName, String deptName, int itemCode) {
		// TODO Auto-generated method stub
		return laundryDao.getAvalQuantity(itemName,deptName,itemCode);
	}

	@Override
	public int save(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return laundryDao.save(laundryLinenMasterDTO,request);
	}

	@Override
	public List<LaundryLinenMasterDTO> getlistForLnlDept() {
		// TODO Auto-generated method stub
		return laundryDao.getlistForLnlDept();
	}

	@Override
	public List<LaundryLinenMasterDTO> getlistbyId(int mrnId) {
		// TODO Auto-generated method stub
		return laundryDao.getlistbyId(mrnId);
	}

	@Override
	public int approveReuest(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return laundryDao.approveReuest(laundryLinenMasterDTO,request);
	}

	

	@Override
	public int deletebyId(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return laundryDao.deletebyId(id,request);
	}

	@Override
	public List<LaundryLinenMasterDTO> getlistForApprovedItems(String subDept) {
		// TODO Auto-generated method stub
		return laundryDao.getlistForApprovedItems(subDept);
	}

	@Override
	public List<LaundryLinenMasterDTO> getlistForRequestedDashboard() {
		// TODO Auto-generated method stub
		return laundryDao.getlistForRequestedDashboard();
	}

	@Override
	public List<LaundryLinenMasterDTO> getlistForProcessDashboard() {
		// TODO Auto-generated method stub
		return laundryDao.getlistForProcessDashboard();
	}

	@Override
	public List<LaundryLinenMasterDTO> getlistForDispachedDashboard() {
		// TODO Auto-generated method stub
		return laundryDao.getlistForDispachedDashboard();
	}

	@Override
	public List<LaundryLinenMasterDTO> getlistForCompletedDashboard() {
		// TODO Auto-generated method stub
		return laundryDao.getlistForCompletedDashboard();
	}

	@Override
	public List<LaundryLinenMasterDTO> getLnlReport(String startDate, String endDate) {
		// TODO Auto-generated method stub
		return laundryDao.getLnlReport(startDate,endDate);
	}

	@Override
	public Integer getBatchDetails(String itemName, String deptName, int itemCode) {
		// TODO Auto-generated method stub
		return laundryDao.getBatchDetails(itemName,deptName,itemCode);
	}

	@Override
	public int saveReturnRequest(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return laundryDao.saveReturnRequest(laundryLinenMasterDTO,request);
	}

	@Override
	public List<LaundryLinenMasterDTO> getlistbyDepName(String deptName) {
		// TODO Auto-generated method stub
		return laundryDao.getlistbyDepName(deptName);
	}

	@Override
	public int acceptItems(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return laundryDao.acceptItems(laundryLinenMasterDTO,request);
	}

}
