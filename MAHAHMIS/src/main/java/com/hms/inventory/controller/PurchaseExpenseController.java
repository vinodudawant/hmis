package com.hms.inventory.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.inventory.dto.PurchaseExpenseDto;
import com.hms.inventory.service.PurchaseExpenseService;

@Controller
@RequestMapping(value="/inventoryPurchaseExpense")
public class PurchaseExpenseController {

	static Logger log=Logger.getLogger(PurchaseOrderContollerM.class.getName());
	
	@Autowired
	private PurchaseExpenseService expenseService;
	@Autowired
	private PurchaseExpenseDto purchaseExpenseDto;
	
	@RequestMapping(value="/savePurchaseExpenseModule")
	@ResponseBody	
	public int  savePurchaseExpense(@RequestParam("purchaseExpenseItemSlaveDetails") String purchaseExpenseItemSlaveDetails,
								  @RequestParam("partyMasterId") Integer partyMasterId,
							   PurchaseExpenseDto purchaseExpenseDto){
		System.out.println("partyMasterId::"+partyMasterId);
	    int response= expenseService.savePurchaseExpense(purchaseExpenseDto,purchaseExpenseItemSlaveDetails,partyMasterId);
		return response;
   }
	
	/**
	 * @author Rohit Sandbhor
	 * @since 26-11-2019
	 * @comment This method is created to get all purchase expense records
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllPurchaseExpenseRecordsDetails", method = RequestMethod.GET)
	public @ResponseBody
	PurchaseExpenseDto getAllPurchaseExpenseRecordsDetails(HttpServletRequest request) {
		List<PurchaseExpenseDto> purchaseExpenseDtos = new ArrayList<PurchaseExpenseDto>();
		purchaseExpenseDtos = expenseService.getAllPurchaseExpenseRecords(request);
		purchaseExpenseDto.setPurchaseExpenseDtos(purchaseExpenseDtos);
		return purchaseExpenseDto;
	}
	
	/**
	 * @since 12-12-2019
	 * @comment This method is created for to edit purchase expense details w.r.t id
	 * @param id
	 * @author
	 * @return
	 */
	@RequestMapping(value = "/editPurchaseExpense", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseExpenseDto editPurchaseExpense(@RequestParam("id") Integer id) {
		purchaseExpenseDto = expenseService.editPurchaseExpense(id);
		return purchaseExpenseDto;	
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 12-12-2019
	 * @comment created this function to delete purchase expense and his all related slaves
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deletePurchaseExpense", method = RequestMethod.POST)
	public @ResponseBody
	String deletePurchaseExpense(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = expenseService.deletePurchaseExpense(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		return msg;
	}
	
	
}
