package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.CorrectionRate;
import com.hms.pharmacy.pojo.CounterSaleMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseCorrection;
import com.hms.pharmacy.pojo.PurchaseRateHistory;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.PurchaseService;

@Controller
@RequestMapping(value = "/correctionRate")
public class CorrectionRateController {
	
	@Autowired
	PurchaseService purchaseService;
	
	@Autowired
	CommonService commonService; 
	
	static Logger log=Logger.getLogger(CorrectionRateController.class.getName());
	/**
	 *
	 * @Code :This method for correction rate view
	 * @return
	 **/
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCorrectionRateView(HttpServletRequest request,HttpServletResponse response) {
		log.info("In Pharmacy getCorrectionRateView()");
		ModelAndView modelAndView = new ModelAndView();
		
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		if(result)
		{
			
			modelAndView.addObject("correctionRate", new CorrectionRate());			
			modelAndView.setViewName("Pharma_Correction_In_Rate");					}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	
	@RequestMapping(value = "/edit-view", method = RequestMethod.GET)
	public ModelAndView editForm(@RequestParam("productId") Integer productId,
			HttpServletRequest request,HttpServletResponse response) {
		HttpSession session = request.getSession(true);
		Integer unitId = (Integer) session.getAttribute("uId");

		ModelAndView modelAndView = new ModelAndView();
		PurchaseRateHistory correctionRate = new PurchaseRateHistory();
		correctionRate = purchaseService.getDataById(unitId, productId, request);
		
		modelAndView.addObject("correctionRate", new CorrectionRate());		
		modelAndView.setViewName("Pharma_Correction_In_Rate");
		return modelAndView;
	}
	
	@RequestMapping(value = "/view-Firm", method = RequestMethod.GET)
	public ModelAndView getCorrectionRateViewList(HttpServletRequest request,HttpServletResponse response) {
		log.info("In Pharmacy getCorrectionRateViewList()");
		ModelAndView modelAndView = new ModelAndView();
		
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		if(result)
		{
			List<PurchaseRateHistory> CorrectionRateBackToList = purchaseService.getCorrectionRateBackToList(unitId,request);
			modelAndView.addObject("CorrectionRateBackToList", CorrectionRateBackToList);
			modelAndView.setViewName("Pharma_Correction_In_Rate_List");			
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	
	/**
	 *
	 * @Code :This method for correction rate save
	 * @return
	 **/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateCorrectionRate(
			@ModelAttribute("correctionRate") CorrectionRate correctionRate,HttpServletRequest request,HttpServletResponse response) {
		log.info("In Pharmacy saveOrUpdateCorrectionRate()");
		Double oldMrp=(Double.parseDouble(request.getParameter("oldMrp")));
		int oldBatchId=(Integer.parseInt(request.getParameter("oldBatch")));
		Double oldBillRate=(Double.parseDouble(request.getParameter("oldBillRate")));
		Double oldPurRate=(Double.parseDouble(request.getParameter("oldPurRate")));
		Double rate=(Double.parseDouble(request.getParameter("oldRate")));
		
		PurchaseCorrection purchaseCorrection=new PurchaseCorrection();
		if(correctionRate.getPurchaseMaster().getLtPurSlave().get(0).getPurSlaveId()!=null)
			purchaseCorrection.setPurchaseSlave(correctionRate.getPurchaseMaster().getLtPurSlave().get(0).getPurSlaveId());
		else
			purchaseCorrection.setPurchaseSlave(0);
		purchaseCorrection.setPurCorBatchId(oldBatchId);
		purchaseCorrection.setPurCorMrp(oldMrp);
		purchaseCorrection.setPurCorDate(new Date());
		purchaseCorrection.setPurBillRate(oldBillRate);
		purchaseCorrection.setPurRate(oldPurRate);
		purchaseCorrection.setRate(rate);
		purchaseCorrection.setPurCorDeleteFlag(0);
		
		ModelAndView modelAndView = new ModelAndView();
		if (purchaseService.updateCorrectionRate(correctionRate,purchaseCorrection)) {
			
				modelAndView.addObject("success",
						"Record updated successfully..!");
			
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/correctionRate/view");
		return modelAndView;
	}
	
	@RequestMapping(value = "/getCorrectionRateBackToList", method = RequestMethod.GET)
	@ResponseBody
	public List<PurchaseRateHistory> getCorrectionRateBackToList(@RequestParam("unitId")Integer unitId,HttpServletRequest request) {
		List<PurchaseRateHistory>correctionRateList = purchaseService.getCorrectionRateBackToList(unitId,request);
		
		System.out.println("list :  " + correctionRateList);
		return correctionRateList;
	}	
	
/*	@RequestMapping(value = "/getDataById", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView getDataById(@RequestParam("productId") Integer productId ,HttpServletRequest request) {
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		ModelAndView modelAndView = new ModelAndView();
		
		PurchaseRateHistory lstById = purchaseService.getDataById(unitId,productId,request);		
		System.out.println("list :  " + lstById);
		//modelAndView.addObject("purchaseMaster", lstById);
		modelAndView.setViewName("Pharma_Correction_In_Rate");	
		return modelAndView;
	}	*/
	
	/**
	 *
	 * @Code :This method for Product Name Auto Suggetion
	 * @return
	 **/

	@RequestMapping(value = "/autoSuggestionProduct", method = RequestMethod.GET)
	public @ResponseBody
	List<PurchaseRateHistory> autoSuggestionProduct(@RequestParam("letter") String letter, HttpServletRequest request) {
		log.info("In Pharmacy autoSuggestionProduct()");
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		List<PurchaseRateHistory> searchProduct = purchaseService.autoSuggestionProduct(letter,unitId);
		return searchProduct;
	}

	/**
	 *
	 * @Code :This method for Correction RateSearchDetails 
	 * @return
	 **/
	@RequestMapping(value = "/searchCorrectionRate", method = RequestMethod.GET)
	public @ResponseBody
	List<PurchaseRateHistory> getCorrectionRateDetail(
			@RequestParam("productId") Integer productId,HttpServletRequest request) {
		log.info("In Pharmacy getHospitalBillId()");
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		List<PurchaseRateHistory> lstCorrectionList = new ArrayList<PurchaseRateHistory>();
		lstCorrectionList = purchaseService.getCorrectionRateDetail(productId,unitId);
		return lstCorrectionList;
	}
	
}
