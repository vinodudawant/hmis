package com.hms.pharmacy.controller;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.CreditNoteMaster;
import com.hms.pharmacy.pojo.settalBillIndent;
import com.hms.pharmacy.service.DueCollectionService;
import com.hms.pharmacy.service.ProductService;


@Controller
@RequestMapping(value = "/dueCollection")
public class DueCollectionController 
{
	@Autowired
	DueCollectionService dueCollectionService;
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getDueCollectionView() 
	{
		ModelAndView modelAndView = new ModelAndView();
		
		List<CreditNoteMaster> ltdueCollectionMasters = dueCollectionService.getDueCollectionNoteList();
		modelAndView.addObject("ltdueCollectionMasters", ltdueCollectionMasters);
		modelAndView.setViewName("Pharma_Due_Collection_List");
		return modelAndView;
	}
	
	@RequestMapping(value = "/patientHistory", method = RequestMethod.GET)
	public ModelAndView getCreditNotePatientHistory() 
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("Pharma_Credit_Note_Patient_History");
		return modelAndView;
	}
	
	@RequestMapping(value = "/savePatientPendingAmount", method = RequestMethod.GET)
	public @ResponseBody boolean  savePatientPendingAmount(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) 
	{
		
		Double amountReceive=Double.parseDouble(httpServletRequest.getParameter("receive"));
		
		Double discount=0.0;
		Double balance=0.0;
							
		if(httpServletRequest.getParameter("amountBalance")!=null && httpServletRequest.getParameter("amountBalance")!="")
			balance=Double.parseDouble(httpServletRequest.getParameter("amountBalance"));
		
		if(httpServletRequest.getParameter("discount")!=null && httpServletRequest.getParameter("discount")!="")
			discount=Double.parseDouble(httpServletRequest.getParameter("discount"));
		
		Integer treatmentId=Integer.parseInt(httpServletRequest.getParameter("treatmentId"));
				
		boolean result=dueCollectionService.savePatientPendingAmount(treatmentId,amountReceive,discount,balance);
		return result;
	}
	
	@RequestMapping(value = "/savePatientTotalBill", method = RequestMethod.GET)
	public @ResponseBody boolean  savePatientTotalBill(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) 
	{
		Integer treatmentId=Integer.parseInt(httpServletRequest.getParameter("treatment"));
		Double balance=0.0;
		
		if(httpServletRequest.getParameter("amountBal")!=null && httpServletRequest.getParameter("amountBal")!="")
			balance=Double.parseDouble(httpServletRequest.getParameter("amountBal"));
				
		boolean result=dueCollectionService.savePatientTotalBill(treatmentId,balance);
		return result;
	}
	
	@RequestMapping(value = "/saveIndentTotalBillAmount", method = RequestMethod.GET)
	public @ResponseBody boolean  saveIndentTotalBill(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) 
	{
		Integer treatmentId=Integer.parseInt(httpServletRequest.getParameter("treatmentForIndent"));
		Double balance=0.0;
		
		if(httpServletRequest.getParameter("amountBalanceForIndent")!=null && httpServletRequest.getParameter("amountBalanceForIndent")!="")
			balance=Double.parseDouble(httpServletRequest.getParameter("amountBalanceForIndent"));
				
		System.out.println("<<<<<<<<<<<<<<"+treatmentId+"<<<<<<<<<<<<<<<<<<<<<<<<<<<"+balance);
		
		boolean result=dueCollectionService.saveIndentTotalBill(treatmentId,balance);
		return result;
	}
	
	
	@RequestMapping(value = "/saveIndentPatientPendingAmount", method = RequestMethod.GET)
	public @ResponseBody boolean  saveIndentPatientPendingAmount(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) 
	{
		
		Double amountReceive=Double.parseDouble(httpServletRequest.getParameter("receive"));
		
		Double discount=0.0;
		Double balance=0.0;
							
		if(httpServletRequest.getParameter("amountBalance")!=null && httpServletRequest.getParameter("amountBalance")!="")
			balance=Double.parseDouble(httpServletRequest.getParameter("amountBalance"));
		
		if(httpServletRequest.getParameter("discount")!=null && httpServletRequest.getParameter("discount")!="")
			discount=Double.parseDouble(httpServletRequest.getParameter("discount"));
		
		Integer treatmentId=Integer.parseInt(httpServletRequest.getParameter("treatmentId"));
				
		boolean result=dueCollectionService.saveIndentPatientPendingAmount(treatmentId,amountReceive,discount,balance);
		return result;
	}
	
	@RequestMapping(value = "/getpatientDatabyPatientId", method = RequestMethod.GET)
	public @ResponseBody
	settalBillIndent getPatientDatabyPatientId(@RequestParam("PatientId") Integer patientId) 
	{
		settalBillIndent creditNoteMasters = new settalBillIndent();
		creditNoteMasters = dueCollectionService.getPatientDatabyPatientId(patientId);
		return creditNoteMasters;
	}
	
}
