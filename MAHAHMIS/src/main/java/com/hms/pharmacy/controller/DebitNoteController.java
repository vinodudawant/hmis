package com.hms.pharmacy.controller;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.DebitNoteMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.DebitNoteService;


@Controller
@RequestMapping(value = "/debitNote")
public class DebitNoteController {

	@Autowired
	DebitNoteService debitNoteService;
	
	@Autowired
	CommonService commonService;
	static Logger log=Logger.getLogger(DebitNoteController.class.getName());
	/**
	 *
	 * @Code :This method for  view list
	 * @return
	 **/
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getPOLIst(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		log.info("In Pharmacy getPOLIst()");
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		if(result)
		{
			List<DebitNoteMaster> debitNoteMasters = debitNoteService.getDebitNoteList(unitId);
			modelAndView.addObject("debitNoteMasters", debitNoteMasters);
			modelAndView.setViewName("Pharma_debit_note_list");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	
	/**
	 *
	 * @Code :This method for view
	 * @return
	 **/
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getDebitNoteView(HttpServletRequest request,HttpServletResponse response) {
		log.info("In Pharmacy getDebitNoteView()");
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("debitnote", new DebitNoteMaster());
			modelAndView.setViewName("Pharma_Debit_Notes");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for save
	 * @return
	 **/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDebitNote(
			@ModelAttribute("debitnote") DebitNoteMaster debitNoteMaster,HttpServletRequest request) {
		log.info("In Pharmacy saveOrUpdateDebitNote()");
		ModelAndView modelAndView = new ModelAndView();
		
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		Integer unitId =(Integer) session.getAttribute("uId");
		debitNoteMaster.setUnitId(unitId);
		debitNoteMaster.setCreatedBy(userId);
		
		if (debitNoteService.saveOrUpdateDebitNote(debitNoteMaster)) {
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
		
		DebitNoteMaster debitNoteMaster2=new DebitNoteMaster();
		try
		{
			debitNoteMaster2=debitNoteService.getDebitNotebyDebitId(debitNoteMaster.getDebitNoteId(),unitId);
			
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		List<DebitNoteMaster> debitNoteMasters=new ArrayList<DebitNoteMaster>();
		debitNoteMasters.add(debitNoteMaster2);
		
		modelAndView.addObject("debitNoteData", debitNoteMasters);
		modelAndView.setViewName("pharma_debit_note_bill");
		return modelAndView;
	}
	
	/**
	 *
	 * @Code :This method for print
	 * @return
	 **/
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(@RequestParam("debitNoteId") Integer debitNoteId,HttpServletRequest request) {
		log.info("In Pharmacy printPo()");
		ModelAndView modelAndView = new ModelAndView();
		DebitNoteMaster debitNoteMaster2=new DebitNoteMaster();
		HttpSession session = request.getSession(true);
		
		Integer unitId =(Integer) session.getAttribute("uId");
		try
		{
			debitNoteMaster2=debitNoteService.getDebitNotebyDebitId(debitNoteId,unitId);
			
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		List<DebitNoteMaster> debitNoteMasters=new ArrayList<DebitNoteMaster>();
		debitNoteMasters.add(debitNoteMaster2);
		//System.out.println("vendorName---------"+debitNoteMasters.get(0).getVendorMaster().getVendorName());
		//System.out.println("vendorMobileNumber---------"+debitNoteMasters.get(0).getVendorMaster().getVendorMobileNumber());
		modelAndView.addObject("debitNoteData", debitNoteMasters);
		modelAndView.setViewName("pharma_debit_note_bill");
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for get debit note by vendor id
	 * @return
	 **/
	@RequestMapping(value = "/getDebitNotebyVendorId", method = RequestMethod.GET)
	public @ResponseBody
	List<DebitNoteMaster> getDebitNotebyVendorId(@RequestParam("vendorId") Integer vendorId,HttpServletRequest request ) {
		log.info("In Pharmacy getDebitNotebyVendorId()");
		HttpSession session = request.getSession(true);
		
		Integer unitId =(Integer) session.getAttribute("uId");
		List<DebitNoteMaster> debitNoteMasters = new ArrayList<DebitNoteMaster>();
		debitNoteMasters = debitNoteService.getDebitNotebyVendorId(vendorId,unitId);
		return debitNoteMasters;
	}
	
	/**
	 *
	 * @Code :This method for get debit note by debit id
	 * @return
	 **/
	@RequestMapping(value = "/getDebitNotebyDebitId", method = RequestMethod.GET)
	public @ResponseBody
	DebitNoteMaster getDebitNotebyDebitId(@RequestParam("debitNoteId") Integer debitNoteId,HttpServletRequest request) {
		log.info("In Pharmacy getDebitNotebyDebitId()");
		HttpSession session = request.getSession(true);
		
		Integer unitId =(Integer) session.getAttribute("uId");
		DebitNoteMaster debitNoteMasters = new DebitNoteMaster();
		debitNoteMasters = debitNoteService.getDebitNotebyDebitId(debitNoteId,unitId);
		return debitNoteMasters;
	}
	/**
	 *
	 * @Code :This method for delete debit note
	 * @return
	 **/
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteDebitNote(@RequestParam("debitNoteId") Integer debitNoteId,HttpServletRequest request) {
		log.info("In Pharmacy deleteDebitNote()");
		HttpSession session = request.getSession(true);
	
		Integer unitId =(Integer) session.getAttribute("uId");
		Boolean flag = false;
		if (debitNoteService.deleteDebitNote(debitNoteId,unitId)) {
			flag = true;
		}
		return flag;
	}
	/**
	 *
	 * @Code :This method for get hospital payment details
	 * @return
	 **/
	@RequestMapping(value = "/getDebitNoteDetailsBySaleId", method = RequestMethod.GET)
	public @ResponseBody
	String getHospitalPaymentDetails(@RequestParam("saleId") Integer saleId) {
		log.info("In Pharmacy getHospitalPaymentDetails()");
		JSONArray batchData=new JSONArray();
		batchData = debitNoteService.getDebitNoteDetailsBySaleId(saleId);
		return JSONValue.toJSONString(batchData);
	}	
}