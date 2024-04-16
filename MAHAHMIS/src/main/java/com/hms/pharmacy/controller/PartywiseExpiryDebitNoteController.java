package com.hms.pharmacy.controller;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.hms.pharmacy.pojo.PartywiseExpiryDebitNoteMaster;
import com.hms.pharmacy.service.PartywiseExpiryDebitNoteService;;

@Controller
@RequestMapping(value = "/partywiseExpiryDebitNote")
public class PartywiseExpiryDebitNoteController 
{

	@Autowired
	PartywiseExpiryDebitNoteService partywiseExpiryDebitNoteService;
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getPOLIst() {
		ModelAndView modelAndView = new ModelAndView();

		List<PartywiseExpiryDebitNoteMaster> debitNoteMasters = partywiseExpiryDebitNoteService.getDebitNoteList();
		modelAndView.addObject("partywiseExpiryDebitNoteMasters", debitNoteMasters);
		modelAndView.setViewName("Pharma_Partywise_Expiry_Debit_Note_List");
		return modelAndView;
	}
	
	
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getDebitNoteView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("partywiseExpiryDebit", new PartywiseExpiryDebitNoteMaster());
		modelAndView.setViewName("Pharma_Partywise_Expiry_Debit_Note");
		return modelAndView;
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDebitNote(
			@ModelAttribute("debit") PartywiseExpiryDebitNoteMaster debitNoteMaster) {
		ModelAndView modelAndView = new ModelAndView();
		if (partywiseExpiryDebitNoteService.saveOrUpdateDebitNote(debitNoteMaster)) {
			if (debitNoteMaster.getDebitNoteId() != null) {
				modelAndView.addObject("success",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("success",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		modelAndView.setViewName("redirect:view");
		return modelAndView;
	}
	
	@RequestMapping(value = "/getDebitNotebyVendorId", method = RequestMethod.GET)
	public @ResponseBody
	List<PartywiseExpiryDebitNoteMaster> getDebitNotebyVendorId(@RequestParam("vendorId") Integer vendorId) {
		List<PartywiseExpiryDebitNoteMaster> debitNoteMasters = new ArrayList<PartywiseExpiryDebitNoteMaster>();
		debitNoteMasters = partywiseExpiryDebitNoteService.getDebitNotebyVendorId(vendorId);
		return debitNoteMasters;
	}
	
	
	@RequestMapping(value = "/getDebitNotebyDebitId", method = RequestMethod.GET)
	public @ResponseBody
	PartywiseExpiryDebitNoteMaster getDebitNotebyDebitId(@RequestParam("debitNoteId") Integer debitNoteId) {
		PartywiseExpiryDebitNoteMaster debitNoteMasters = new PartywiseExpiryDebitNoteMaster();
		debitNoteMasters = partywiseExpiryDebitNoteService.getDebitNotebyDebitId(debitNoteId);
		return debitNoteMasters;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteDebitNote(@RequestParam("debitNoteId") Integer debitNoteId) {
		Boolean flag = false;
		if (partywiseExpiryDebitNoteService.deleteDebitNote(debitNoteId)) {
			flag = true;
		}
		return flag;
	}
}