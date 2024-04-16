package com.hms.ehat.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.Inv_expensebiillDTO;
import com.hms.dto.Inv_expenses_billSlave;
import com.hms.dto.InventoryTaxSetUpDTO;
import com.hms.dto.SubInventoryDTO;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.Inv_expenseItem;
import com.hms.ehat.dto.OTbilldetaildto;
import com.hms.ehat.dto.WardWiseDetaisDto;
import com.hms.ehat.dto.pharmaConsumtionDTO;
import com.hms.ehat.service.InventoryService;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.laundry.dto.LaundryLinenSlaveDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

import com.hms.canteen.dto.CanteenMaster;
import com.hms.dto.CssdMasterDTO;
import com.hms.dto.InventoryItemMasterDTO;


@Controller
@RequestMapping(value = "/inventory")
public class InventoryController {

	@Autowired
	InventoryService inventoryservice;

	/********
	 * @Code :For delete of terms and condition inventory
	 ********/
	@RequestMapping(value = "/deleteinventory", method = RequestMethod.POST)
	public @ResponseBody String deleteinventory(@RequestParam("id") int id, HttpServletRequest request) {

		boolean response = inventoryservice.deleteinventory(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

	/********
	 * @Code :For delete of ABC analysis inventory
	 ********/
	@RequestMapping(value = "/deleteabc", method = RequestMethod.POST)
	public @ResponseBody String deleteabc(@RequestParam("id") int id, HttpServletRequest request) {

		boolean response = ((InventoryService) inventoryservice).deleteabc(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

	/********
	 * @Code :For delete of terms and condition inventory
	 ********/
	@RequestMapping(value = "/deletecharges", method = RequestMethod.POST)
	public @ResponseBody String deletecharges(@RequestParam("id") int id, HttpServletRequest request) {

		boolean response = inventoryservice.deletecharges(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

	/********
	 * @Code :For delete of hospital details in inventory
	 ********/
	@RequestMapping(value = "/deletehospital", method = RequestMethod.POST)
	public @ResponseBody String deletehospital(@RequestParam("id") int id, HttpServletRequest request) {

		boolean response = inventoryservice.deletehospital(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

	@RequestMapping(value = "/fetchhospitalstate", method = RequestMethod.POST)
	public @ResponseBody Integer fetchhospitalstate(HttpServletRequest request) {

		int response = inventoryservice.fetchhospitalstate(request);

		return response;
	}

	@RequestMapping(value = "/getexpid", method = RequestMethod.POST)
	public @ResponseBody Integer getexpid(@RequestParam("tablename") String tablename, HttpServletRequest request) {

		int response = inventoryservice.getexpid(tablename, request);

		return response;
	}

	@RequestMapping(value = "/fetchexpenseitem", method = RequestMethod.POST)
	public @ResponseBody Inv_expenses_billSlave fetchexpenseitem(@RequestParam("itemname") String itemname,
			HttpServletRequest request) {
		List<Inv_expenses_billSlave> ltfetchexpenseitem = new ArrayList<Inv_expenses_billSlave>();
		ltfetchexpenseitem = inventoryservice.fetchexpenseitem(request, itemname);
		Inv_expenses_billSlave inv_expenseItem = new Inv_expenses_billSlave();
		inv_expenseItem.setLtinvetorypurchaseorderitemmaster(ltfetchexpenseitem);
		return inv_expenseItem;
	}

	@RequestMapping(value = "/saveexpenseitem", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> SaveExpenseitem(HttpServletRequest request) throws ParseException {

		HttpSession session = request.getSession(true);
		Integer userId = (Integer) session.getAttribute("userId1");

		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time = dateFormat1.format(cal.getTime());

		Map<String, String> result = new HashMap<String, String>();

		String list[] = request.getParameterValues("materiallist");
		String list1[] = request.getParameterValues("materiallist1");

		Inv_expensebiillDTO expensemAster = new Inv_expensebiillDTO();
		Inv_expensebiillDTO expensemAster1 = new Inv_expensebiillDTO();
		String str = list[0].substring(0, list[0].length());
		str = str.replaceAll("null", "1");
		expensemAster = (Inv_expensebiillDTO) ConfigUIJSONUtility.getObjectFromJSON(str, Inv_expensebiillDTO.class);// our
																													// dto
		String str1 = list1[0].substring(0, list1[0].length());
		str1 = str1.replaceAll("null", "1");
		expensemAster1 = (Inv_expensebiillDTO) ConfigUIJSONUtility.getObjectFromJSON(str1, Inv_expensebiillDTO.class);// our
																														// dto

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
	

		result = inventoryservice.saveOrUpdateExpenseBill(expensemAster, expensemAster1, request);
		return result;

	}

	@RequestMapping(value = "/fetchexpenseBill", method = RequestMethod.POST)
	public @ResponseBody Inv_expensebiillDTO fetchexpenseBill(@RequestParam("callform") String callform,
			@RequestParam("value") String value, HttpServletRequest request) {
		List<Inv_expensebiillDTO> ltfetchexpenseitem = new ArrayList<Inv_expensebiillDTO>();
		ltfetchexpenseitem = inventoryservice.fetchexpenseBill(callform, value);
		Inv_expensebiillDTO inv_expenseBill = new Inv_expensebiillDTO();
		inv_expenseBill.setLtinvetoryEXPmaster(ltfetchexpenseitem);
		return inv_expenseBill;
	}

	@RequestMapping(value = "/fetchtax", method = RequestMethod.POST)
	public @ResponseBody InventoryTaxSetUpDTO fetchtax(@RequestParam("callform") String callform,
			@RequestParam("value") String value, HttpServletRequest request) {
		List<InventoryTaxSetUpDTO> ltfetchtax = new ArrayList<InventoryTaxSetUpDTO>();
		ltfetchtax = inventoryservice.fetchtax(callform, value);
		InventoryTaxSetUpDTO inventoryTaxSetUps = new InventoryTaxSetUpDTO();
		inventoryTaxSetUps.setInventoryTaxSetUps(ltfetchtax);
		return inventoryTaxSetUps;
	}

	@RequestMapping(value = "/getchallanandpurchaseinvoiceid", method = RequestMethod.POST)
	public @ResponseBody String getchallanandpurchaseinvoiceid(@RequestParam("grnid") String grnid,
			HttpServletRequest request) {

		String response = inventoryservice.getchallanandpurchaseinvoiceid(grnid, request);

		return response;
	}

	

	@RequestMapping(value = "/saveCssdRequest", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrUpdateCsd(HttpServletRequest request,

			@RequestParam("materiallist") String materiallist) {

		CssdMasterDTO csdLmaster = (CssdMasterDTO) ConfigUIJSONUtility.getObjectFromJSON(materiallist,
				CssdMasterDTO.class);

		int response = inventoryservice.saveOrUpdateCsd(csdLmaster.getListCssd().get(0), request);

		return response;
	}

	@RequestMapping(value = "/getlistCds", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistCds(@RequestParam("subDept") String subDept) {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistCds(subDept);
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	/********
	 * @Code :For getting list by id of CSSD
	 **********/
	@RequestMapping(value = "/getlistbyIdCsd", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistbyIdCsd(@RequestParam("ProcessId") int ProcessId) {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistbyIdCsd(ProcessId);
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	/********
	 * @Code :For deleting the records
	 **********/
	@RequestMapping(value = "/deletebyIdCsd", method = RequestMethod.POST)
	public @ResponseBody String deletebyIdCsd(@RequestParam("id") int id, HttpServletRequest request) {

		int response = inventoryservice.deletebyIdCsd(id, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

	/********
	 * @Code :For auto complete
	 **********/
	@RequestMapping(value = "/getlistbyletterCsd", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistbyletterCsd(@RequestParam("findingName") int letter) {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistbyletterCsd(letter);
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;

	}

	/********
	 * @Code :For auto complete
	 **********/
	@RequestMapping(value = "/getlistForCsdDept", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistForCsdDept() {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistForCsdDept();
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	@RequestMapping(value = "/approveRequestCsd", method = RequestMethod.POST)
	@ResponseBody
	public int approveReuestCsd(HttpServletRequest request,

			@RequestParam("materiallist") String materiallist) {

		CssdMasterDTO landLmaster = (CssdMasterDTO) ConfigUIJSONUtility.getObjectFromJSON(materiallist,
				CssdMasterDTO.class);

		int response = inventoryservice.approveReuestCsd(landLmaster.getListCssd().get(0), request);

		return response;
	}

	@RequestMapping(value = "/getIdsForCsdProcessing", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getIdsForCsdProcessing() {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getIdsForCsdProcessing();
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	/********
	 * @Code :For auto complete
	 **********/
	@RequestMapping(value = "/getlistForProcessing", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistForProcessing() {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistForProcessing();
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	/********
	 * @Code :For auto complete
	 **********/
	@RequestMapping(value = "/getlistbyletterProcessing", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistbyletterProcessing(@RequestParam("findingName") int letter) {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistbyletterProcessing(letter);
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;

	}

	/********
	 * @Code :For getting list by id of Request
	 **********/
	@RequestMapping(value = "/getlistbyDepNameCsd", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistbyDepNameCsd(@RequestParam("deptName") String deptName) {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistbyDepNameCsd(deptName);
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	@RequestMapping(value = "/acceptItemsCsd", method = RequestMethod.POST)
	@ResponseBody
	public int acceptItemsCsd(HttpServletRequest request, @RequestParam("materiallist") String materiallist) {

		CssdMasterDTO landLmaster = (CssdMasterDTO) ConfigUIJSONUtility.getObjectFromJSON(materiallist,
				CssdMasterDTO.class);

		int response = inventoryservice.acceptItemsCsd(landLmaster.getListCssd().get(0), request);

		return response;
	}

	@RequestMapping(value = "/getlistForApprovedItemsCsd", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistForApprovedItemsCsd(@RequestParam("subDept") String subDept) {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistForApprovedItemsCsd(subDept);
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	/********
	 * @Code :For auto complete
	 **********/
	@RequestMapping(value = "/getlistbyletterCsdForReturnItems", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistbyletterCsdForReturnItems(@RequestParam("findingName") int letter) {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistbyletterCsdForReturnItems(letter);
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;

	}

	


	/********
	 * @Code :For Dashboard
	 **********/
	@RequestMapping(value = "/getlistForRequestedDashboardCsd", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistForRequestedDashboardCsd() {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistForRequestedDashboardCsd();
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	/********
	 * @Code :For Dashboard
	 **********/
	@RequestMapping(value = "/getlistForProcessingDashboardCsd", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistForProcessingDashboardCsd() {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistForProcessingDashboardCsd();
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	/********
	 * @Code :For Dashboard
	 **********/
	@RequestMapping(value = "/getlistForDispachedDashboardCsd", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistForDispachedDashboardCsd() {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistForDispachedDashboardCsd();
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	/********
	 * @Code :For Dashboard
	 **********/
	@RequestMapping(value = "/getlistForCompletedDashboardCsd", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getlistForCompletedDashboardCsd() {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getlistForCompletedDashboardCsd();
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	/********
	 * @Code :For auto complete
	 **********/
	@RequestMapping(value = "/fetchItemNamesOnlyAutoSuggestForLaundryItems", method = RequestMethod.GET)
	public @ResponseBody InventoryItemMasterDTO fetchItemNamesOnlyAutoSuggestForLaundryItems(
			@RequestParam("findingName") String letter) {
		List<InventoryItemMasterDTO> lstmaster = new ArrayList<InventoryItemMasterDTO>();
		lstmaster = inventoryservice.fetchItemNamesOnlyAutoSuggestForLaundryItems(letter);
		InventoryItemMasterDTO obj = new InventoryItemMasterDTO();
		obj.setLtInventoryItemMasterDTOs(lstmaster);
		return obj;

	}

	@RequestMapping(value = "/getCssdReport", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getCssdReport(@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate) {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getCssdReport(startDate, endDate);
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	@RequestMapping(value = "/getCssdReport2", method = RequestMethod.GET)
	public @ResponseBody CssdMasterDTO getCssdReport2(@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate, @RequestParam("subDept") String subDept) {
		List<CssdMasterDTO> lstmaster = new ArrayList<CssdMasterDTO>();
		lstmaster = inventoryservice.getCssdReport2(startDate, endDate, subDept);
		CssdMasterDTO obj = new CssdMasterDTO();
		obj.setListCssd(lstmaster);
		return obj;
	}

	@RequestMapping(value = "/getSubInventory", method = RequestMethod.POST)
	public @ResponseBody SubInventoryDTO getSubInventory() { // httpservlet request added by sagar

		SubInventoryDTO subInvDto = new SubInventoryDTO();
		subInvDto = inventoryservice.getSubInventory();

		return subInvDto;
	}
	
	@RequestMapping(value = "/fetchItemNamesOnlyAutoSuggestForCsdItems", method = RequestMethod.GET)
	public @ResponseBody ItemMasterDto fetchItemNamesOnlyAutoSuggestForCsdItems(HttpServletRequest request) {
		
	List<ItemMasterDto> ltItemMasterDTOs = new ArrayList<ItemMasterDto>();

	ltItemMasterDTOs = inventoryservice.fetchItemNamesAutoSuggestForCsdItems(request.getParameter("txtVal"));

	ItemMasterDto obj =new ItemMasterDto();
	obj.setLstItemMaster(ltItemMasterDTOs);
	
	return obj;
	
	}
	
	//Add By Vishant
		@RequestMapping(value = "/getMatchine", method = RequestMethod.GET)
		public @ResponseBody
		ItemMasterDto getMatchine(@RequestParam("txtVal") String txtVal) {
			List<ItemMasterDto> lstItemMaster = new ArrayList<ItemMasterDto>();
			lstItemMaster = inventoryservice.getMatchine(txtVal);
			
			ItemMasterDto obj = new ItemMasterDto();
			obj.setLstItemMaster(lstItemMaster);
			return obj;
		}
	
}
