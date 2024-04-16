package com.hms.laundry.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.ItemMasterDto;
import com.hms.laundry.dto.LaundryLinenMasterDTO;

public interface LaundryService {

	List<LaundryLinenMasterDTO> getlist(String subDept);

	Integer getNextMaterialRequestNoteIdInLIstLaundry();

	List<ItemMasterDto> fetchItemNamesOnlyAutoSuggestForLaundryItems(String letter);

	Integer getAvalQuantity(String itemName, String deptName, int itemCode);

	int save(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request);

	List<LaundryLinenMasterDTO> getlistForLnlDept();

	List<LaundryLinenMasterDTO> getlistbyId(int mrnId);

	int approveReuest(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request);

	int deletebyId(int id, HttpServletRequest request);

	List<LaundryLinenMasterDTO> getlistForApprovedItems(String subDept);

	List<LaundryLinenMasterDTO> getlistForRequestedDashboard();

	List<LaundryLinenMasterDTO> getlistForProcessDashboard();

	List<LaundryLinenMasterDTO> getlistForDispachedDashboard();

	List<LaundryLinenMasterDTO> getlistForCompletedDashboard();

	List<LaundryLinenMasterDTO> getLnlReport(String startDate, String endDate);

	Integer getBatchDetails(String itemName, String deptName, int itemCode);

	int saveReturnRequest(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request);

	List<LaundryLinenMasterDTO> getlistbyDepName(String deptName);

	int acceptItems(LaundryLinenMasterDTO laundryLinenMasterDTO, HttpServletRequest request);

}
