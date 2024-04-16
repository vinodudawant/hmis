package com.hms.ehat.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Inv_expensebiillDTO;
import com.hms.dto.Inv_expenses_billSlave;
import com.hms.dto.InventoryTaxSetUpDTO;
import com.hms.dto.SubInventoryDTO;
import com.hms.ehat.dto.Inv_expenseItem;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.dto.CssdMasterDTO;
import com.hms.dto.InventoryItemMasterDTO;
/*import com.hms.dto.LaundryLinenMasterDTO;*/

public interface InventoryService {

	boolean deleteinventory(int id, HttpServletRequest request);

	boolean deleteabc(int id, HttpServletRequest request);

	boolean deletecharges(int id, HttpServletRequest request);

	boolean deletehospital(int id, HttpServletRequest request);

	int fetchhospitalstate(HttpServletRequest request);

	int getexpid(String tablename, HttpServletRequest request);

	List<Inv_expenses_billSlave> fetchexpenseitem(HttpServletRequest request, String itemname);

	Map<String, String> saveOrUpdateExpenseBill(
			Inv_expensebiillDTO expensemAster, Inv_expensebiillDTO expensemAster1, HttpServletRequest request);

	List<Inv_expensebiillDTO> fetchexpenseBill(String callform, String value);

	List<InventoryTaxSetUpDTO> fetchtax(String callform, String value);

	String getchallanandpurchaseinvoiceid(String tablename,
			HttpServletRequest request);
	/*
	 * int saveOrUpdateLandL(LaundryLinenMasterDTO laundryLinenMasterDTO,
	 * HttpServletRequest request);
	 * 
	 * List<LaundryLinenMasterDTO> getlist(String subDept);
	 * 
	 * List<LaundryLinenMasterDTO> getlistbyId(int mrnId);
	 * 
	 * List<LaundryLinenMasterDTO> getlistbyDepName(String deptName);
	 * 
	 * int acceptItems(LaundryLinenMasterDTO laundryLinenMasterDTO,
	 * HttpServletRequest request);
	 * 
	 * List<LaundryLinenMasterDTO> getlistbyletter(int letter);
	 */

	//int deletebyId(int id, HttpServletRequest request);

	/*
	 * int approveReuest(LaundryLinenMasterDTO laundryLinenMasterDTO,
	 * HttpServletRequest request);
	 * 
	 * List<LaundryLinenMasterDTO> getlistForApprovedItems(String subDept);
	 * 
	 * List<LaundryLinenMasterDTO> getlistForLnlDept();
	 */

	int saveOrUpdateCsd(CssdMasterDTO cssdMasterDTO, HttpServletRequest request);

	List<CssdMasterDTO> getlistCds(String subDept);

	List<CssdMasterDTO> getlistbyIdCsd(int processId);

	int deletebyIdCsd(int id, HttpServletRequest request);

	List<CssdMasterDTO> getlistbyletterCsd(int letter);

	List<CssdMasterDTO> getlistForCsdDept();

	int approveReuestCsd(CssdMasterDTO cssdMasterDTO, HttpServletRequest request);

	List<CssdMasterDTO> getIdsForCsdProcessing();

	List<CssdMasterDTO> getlistForProcessing();

	List<CssdMasterDTO> getlistbyletterProcessing(int letter);

	List<CssdMasterDTO> getlistbyDepNameCsd(String deptName);

	int acceptItemsCsd(CssdMasterDTO cssdMasterDTO, HttpServletRequest request);

	List<CssdMasterDTO> getlistForApprovedItemsCsd(String subDept);

	List<CssdMasterDTO> getlistbyletterCsdForReturnItems(int letter);

	/*
	 * List<LaundryLinenMasterDTO> getlistbyletterForReturnItems(int letter);
	 * 
	 * List<LaundryLinenMasterDTO> getlistForRequestedDashboard();
	 * 
	 * List<LaundryLinenMasterDTO> getlistForProcessDashboard();
	 * 
	 * List<LaundryLinenMasterDTO> getlistForDispachedDashboard();
	 * 
	 * List<LaundryLinenMasterDTO> getlistForCompletedDashboard();
	 */
	List<CssdMasterDTO> getlistForRequestedDashboardCsd();

	List<CssdMasterDTO> getlistForProcessingDashboardCsd();

	List<CssdMasterDTO> getlistForDispachedDashboardCsd();

	List<CssdMasterDTO> getlistForCompletedDashboardCsd();

	List<InventoryItemMasterDTO> fetchItemNamesOnlyAutoSuggestForLaundryItems(
			String letter);

	List<CssdMasterDTO> getCssdReport(String startDate, String endDate);

	List<CssdMasterDTO> getCssdReport2(String startDate, String endDate,
			String subDept);

	SubInventoryDTO getSubInventory();

	List<ItemMasterDto> fetchItemNamesAutoSuggestForCsdItems(String parameter);

	//List<LaundryLinenMasterDTO> getLnlReport(String startDate, String endDate);
	
	List<ItemMasterDto> getMatchine(String txtVal);

}
