package com.hms.ehat.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.hms.dto.Inv_expensebiillDTO;
import com.hms.dto.Inv_expenses_billSlave;
import com.hms.dto.InventoryTaxSetUpDTO;
import com.hms.dto.SubInventoryDTO;
import com.hms.ehat.dao.InventoryDao;
import com.hms.ehat.dto.Inv_expenseItem;
import com.hms.ehat.service.InventoryService;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;

import com.hms.dto.CssdMasterDTO;
import com.hms.dto.InventoryItemMasterDTO;
//import com.hms.dto.LaundryLinenMasterDTO;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {

	@Autowired
	InventoryDao inventorydao;
	
	@Override
	public boolean deleteinventory(int id, HttpServletRequest request) {
		
		return inventorydao.deleteinventory(id,request);
	}
	@Override
	public boolean deleteabc(int id, HttpServletRequest request) {
		
		return inventorydao.deleteabc(id,request);
	}
	@Override
	public boolean deletecharges(int id, HttpServletRequest request) {
		
		return inventorydao.deletecharges(id,request);
	}
	@Override
	public boolean deletehospital(int id, HttpServletRequest request) {
		
		return inventorydao.deletehospital(id,request);
	}
	@Override
	public int fetchhospitalstate(HttpServletRequest request) {
		
		return inventorydao.fetchhospitalstate(request);
	}
	@Override
	public int getexpid(String tablename, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return inventorydao.getexpid(tablename,request);
	}
	@Override
	public List<Inv_expenses_billSlave> fetchexpenseitem(HttpServletRequest request, String itemname) {
		// TODO Auto-generated method stub
		return inventorydao.fetchexpenseitem(request,itemname);
	}
	@Override
	public Map<String, String> saveOrUpdateExpenseBill(
			Inv_expensebiillDTO expensemAster, Inv_expensebiillDTO expensemAster1, HttpServletRequest request) {
		List<Inv_expenses_billSlave> expBillSlaves2 = new ArrayList<Inv_expenses_billSlave>();
		  for(Inv_expensebiillDTO obj : expensemAster1.getLtinvetoryEXPmaster()){
			  Inv_expenses_billSlave obj2 = new Inv_expenses_billSlave();
			  expensemAster.setInv_exp_no(obj.getInv_exp_no());
			  expensemAster.setInv_exp_address(obj.getInv_exp_address());
			  expensemAster.setInv_exp_calcuated_total_taxes_amt(obj.getInv_exp_calcuated_total_taxes_amt());
			  expensemAster.setInv_exp_calcuated_vat_amt(obj.getInv_exp_calcuated_vat_amt());
			  expensemAster.setInv_exp_cash_amt_rupees(obj.getInv_exp_cash_amt_rupees());
			  expensemAster.setInv_exp_create_date(new Date(new java.util.Date().getTime()));
			  expensemAster.setInv_exp_cash_amt_perct(obj.getInv_exp_cash_amt_perct());
			  expensemAster.setInv_exp_credit_amt(obj.getInv_exp_credit_amt());
			  expensemAster.setInv_exp_cst_amt(obj.getInv_exp_cst_amt());
			  expensemAster.setInv_exp_delete_flag(0);
			  expensemAster.setInv_exp_Delivery_Date(obj.getInv_exp_Delivery_Date());
			  expensemAster.setInv_exp_ex_vat_amt(obj.getInv_exp_ex_vat_amt());
			  expensemAster.setInv_exp_final_calcuated_total_taxes_amt(obj.getInv_exp_final_calcuated_total_taxes_amt());
			  expensemAster.setInv_exp_final_total_net_amt(obj.getInv_exp_final_total_net_amt());
			  expensemAster.setInv_exp_freight_amt(obj.getInv_exp_freight_amt());
			  expensemAster.setInv_exp_lbt_amt(obj.getInv_exp_lbt_amt());
			  expensemAster.setInv_exp_octroi_amt(obj.getInv_exp_octroi_amt());
			  expensemAster.setInv_exp_reference_no(obj.getInv_exp_reference_no());
			  expensemAster.setInv_exp_special_charges(obj.getInv_exp_special_charges());
			  expensemAster.setInv_exp_special_disc(obj.getInv_exp_special_disc());
			  expensemAster.setInv_exp_sumofspecial_charges(obj.getInv_exp_sumofspecial_charges());
			  expensemAster.setInv_exp_Supplier_Id(obj.getInv_exp_Supplier_Id());
			  expensemAster.setInv_exp_supplier_name(obj.getInv_exp_supplier_name());
			  expensemAster.setInv_exp_remark(obj.getInv_exp_remark());	/*jitendra*/
			  expensemAster.setInv_exp_surcharge_amt(obj.getInv_exp_surcharge_amt());
			  expensemAster.setInv_exp_total_add_amt(obj.getInv_exp_total_add_amt());
			  expensemAster.setInv_exp_total_base_gross_amt(obj.getInv_exp_total_base_gross_amt());
			  expensemAster.setInv_exp_total_discount(obj.getInv_exp_total_discount());
			  expensemAster.setInv_exp_total_doc_qty(obj.getInv_exp_total_doc_qty());
			  expensemAster.setInv_exp_total_less_amt(obj.getInv_exp_total_less_amt());
			  expensemAster.setInv_exp_unit_charges(obj.getInv_exp_unit_charges());
			  expensemAster.setInv_supplierState(obj.getInv_supplierState());
			  expensemAster.setInv_exp_mobile_number(obj.getInv_exp_mobile_number());
			  
			  
		  }
		  for(Inv_expenses_billSlave obj3 : expensemAster.getLtInv_expenses_billSlave()){
			  obj3.setInv_exp_no(expensemAster);
			  expBillSlaves2.add(obj3);
			  
		  }
		  expensemAster.setLtInv_expenses_billSlave(expBillSlaves2);
		  
		return inventorydao.saveOrUpdateExpenseBill(expensemAster,expensemAster1,request);
	}
	@Override
	public List<Inv_expensebiillDTO> fetchexpenseBill(String callform, String value) {
		// TODO Auto-generated method stub
		return inventorydao.fetchexpenseBill(callform,value);
	}
	@Override
	public List<InventoryTaxSetUpDTO> fetchtax(String callform, String value) {
		// TODO Auto-generated method stub
		return inventorydao.fetchtax(callform,value);
	}
	@Override
	public String getchallanandpurchaseinvoiceid(String tablename,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return inventorydao.getchallanandpurchaseinvoiceid(tablename);
	}
	
	
	@Override
	public int saveOrUpdateCsd(CssdMasterDTO cssdMasterDTO,
			HttpServletRequest request) {
		
		return inventorydao.saveOrUpdateCsd(cssdMasterDTO,request);
	}
	@Override
	public List<CssdMasterDTO> getlistCds(String subDept) {
		
		return inventorydao.getlistCds(subDept);
	}
	@Override
	public List<CssdMasterDTO> getlistbyIdCsd(int processId) {
		
		return inventorydao.getlistbyIdCsd( processId);
	}
	@Override
	public int deletebyIdCsd(int id, HttpServletRequest request) {
		
		return inventorydao.deletebyIdCsd(id,request);
	}
	@Override
	public List<CssdMasterDTO> getlistbyletterCsd(int letter) {
		
		return inventorydao.getlistbyletterCsd(letter);
	}
	@Override
	public List<CssdMasterDTO> getlistForCsdDept() {
		
		return inventorydao.getlistForCsdDept();
	}
	@Override
	public int approveReuestCsd(CssdMasterDTO cssdMasterDTO,
			HttpServletRequest request) {
		
		return inventorydao.approveReuestCsd(cssdMasterDTO,request);
	}
	@Override
	public List<CssdMasterDTO> getIdsForCsdProcessing() {
		
		return inventorydao.getIdsForCsdProcessing();
	}
	@Override
	public List<CssdMasterDTO> getlistForProcessing() {
		
		return inventorydao.getlistForProcessing();
	}
	@Override
	public List<CssdMasterDTO> getlistbyletterProcessing(int letter) {
		
		return inventorydao.getlistbyletterProcessing(letter);
	}
	@Override
	public List<CssdMasterDTO> getlistbyDepNameCsd(String deptName) {
		
		return inventorydao.getlistbyDepNameCsd(deptName);
	}
	
	@Override
	public int acceptItemsCsd(CssdMasterDTO cssdMasterDTO,
			HttpServletRequest request) {
		
		return inventorydao.acceptItemsCsd(cssdMasterDTO,request);
	}
	@Override
	public List<CssdMasterDTO> getlistForApprovedItemsCsd(String subDept) {
		
		return inventorydao.getlistForApprovedItemsCsd(subDept);
	}
	@Override
	public List<CssdMasterDTO> getlistbyletterCsdForReturnItems(int letter) {
		
		return inventorydao.getlistbyletterCsdForReturnItems(letter);
	}
	
	
	@Override
	public List<CssdMasterDTO> getlistForRequestedDashboardCsd() {
		
		return inventorydao.getlistForRequestedDashboardCsd();
	}
	@Override
	public List<CssdMasterDTO> getlistForProcessingDashboardCsd() {
		
		return inventorydao.getlistForProcessingDashboardCsd();
	}
	@Override
	public List<CssdMasterDTO> getlistForDispachedDashboardCsd() {
		
		return inventorydao.getlistForDispachedDashboardCsd();
	}
	@Override
	public List<CssdMasterDTO> getlistForCompletedDashboardCsd() {
		
		return inventorydao.getlistForCompletedDashboardCsd();
	}
	
	@Override
	public List<InventoryItemMasterDTO> fetchItemNamesOnlyAutoSuggestForLaundryItems(
			String letter) {
		
		return inventorydao.fetchItemNamesOnlyAutoSuggestForLaundryItems(letter);
	}
	
	@Override
	public List<CssdMasterDTO> getCssdReport(String startDate,
			String endDate) {
		return inventorydao.getCssdReport(startDate,endDate);
	}
	
	@Override
	public List<CssdMasterDTO> getCssdReport2(String startDate,
			String endDate,String subDept) {
		return inventorydao.getCssdReport2(startDate,endDate,subDept);
	}
	@Override
	public SubInventoryDTO getSubInventory() {
		return inventorydao.getSubInventory();
	}
	@Override
	public List<ItemMasterDto> fetchItemNamesAutoSuggestForCsdItems(String parameter) {
		// TODO Auto-generated method stub
		return inventorydao.fetchItemNamesAutoSuggestForCsdItems(parameter);
	}
	
	@Override
	public List<ItemMasterDto> getMatchine(String txtVal) {
		// TODO Auto-generated method stub
		return inventorydao.getMatchine(txtVal);
	}
	
	
	
}
