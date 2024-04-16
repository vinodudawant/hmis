package com.hms.pharmacy.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.CashPaidSlave;
import com.hms.pharmacy.pojo.CounterSaleMaster;
import com.hms.pharmacy.pojo.PartywisePoMaster;
import com.hms.pharmacy.pojo.PartywisePoSlave;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.PartywisePoService;

@Controller
@RequestMapping(value = "/partywisePo")
public class PartywisePurchaseOrderController {
	@Autowired
	PartywisePoService PartywisePoService;
	
	@Autowired
	CommonService commonService; 

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getPOLIst() {
		ModelAndView modelAndView = new ModelAndView();

		List<PartywisePoMaster> ltPoMasters = PartywisePoService.getPOList();
		modelAndView.addObject("ltPoMasters", ltPoMasters);

		modelAndView.setViewName("Pharma_Partywise_Po_List");
		return modelAndView;
	}

	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getPOViewFrm(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("partywisePo", new PartywisePoMaster());
			modelAndView.setViewName("Pharma_Partywise_Po");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}

	@RequestMapping(value = "/edit-view", method = RequestMethod.GET)
	public ModelAndView editForm(@RequestParam("poId") Integer poId) {
		ModelAndView modelAndView = new ModelAndView();
		PartywisePoMaster poMaster = new PartywisePoMaster();
		poMaster = PartywisePoService.getPOByIdEdit(poId);
		modelAndView.addObject("partywisePo", poMaster);
		modelAndView.setViewName("Pharma_Partywise_Po");
		return modelAndView;
	}

	@InitBinder
	protected void initBinder(HttpServletRequest request,
			ServletRequestDataBinder binder) {
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
			binder.registerCustomEditor(Date.class, editor);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDoctor(
			@ModelAttribute("partywisePo") PartywisePoMaster poMaster,
			BindingResult errors, HttpServletRequest request,
			HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();

		List<PartywisePoSlave> cashPaidSlaves = poMaster.getLtPOslave();
		List<PartywisePoSlave> newCashPaidSlaves = new ArrayList<PartywisePoSlave>();

		String[] results = request.getParameterValues("selectedValues");
		String result = request.getParameter("no");

		if (poMaster.getPoId() == null && result.equals("1")) {
			for (PartywisePoSlave cashPaidSlave : cashPaidSlaves) {
				int found = 0;
				for (int i = 0; i < results.length && found <= 0; i++) {
					if (cashPaidSlave.getProductMaster().getCategoryMaster() != null) {
						/*
						 * if(cashPaidSlave.getPurchaseMaster().getLtPurSlave().get
						 * (0).getPurSlaveId().toString().equals(results[i])) {
						 * found=1; newCashPaidSlaves.add(cashPaidSlave); }
						 */
						if (cashPaidSlave.getProductMaster()
								.getCategoryMaster().getCatId().toString()
								.equals(results[i])) {
							found = 1;
							newCashPaidSlaves.add(cashPaidSlave);
						}
					} else {

					}
				}

			}
			poMaster.setLtPOslave(newCashPaidSlaves);
		}
		
			if (poMaster.getPoId()== null) {
				
				HttpSession session = request.getSession(true);
				Integer userId = (Integer) session.getAttribute("userId1");
				String ipaddress = request.getRemoteAddr();
				poMaster.setPoCreatedBy(userId);
				poMaster.setIpAddress(ipaddress);
				poMaster.setPoModifyBy(0);
				PartywisePoService.saveOrUpdatePO(poMaster);
			modelAndView.addObject("success",
						"Record saved successfully..!");
			} else {
				
				HttpSession session = request.getSession(true);
				Integer userId = (Integer) session.getAttribute("userId1");
				poMaster.setPoModifyBy(userId);
				PartywisePoService.saveOrUpdatePO(poMaster);
				modelAndView.addObject("success",
						"Record updated successfully..!");
			}
	

		PartywisePoMaster partywisePoMaster = new PartywisePoMaster();

		try {
			partywisePoMaster = PartywisePoService
					.getPOById(poMaster.getPoId());
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		List<PartywisePoMaster> partywisePoMasters = new ArrayList<PartywisePoMaster>();
		partywisePoMasters.add(partywisePoMaster);

		modelAndView.addObject("partyWisePoData", partywisePoMasters);
		modelAndView.setViewName("pharma_partywise_po_bill");

		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deletePO(@RequestParam("poId") Integer poId) {
		Boolean flag = false;
		if (PartywisePoService.deletePO(poId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/getPObyVendorId", method = RequestMethod.GET)
	public @ResponseBody
	List<PartywisePoMaster> getPObyVendorId(
			@RequestParam("vendorId") Integer vendorId) {
		List<PartywisePoMaster> ltPOMaster = new ArrayList<PartywisePoMaster>();
		ltPOMaster = PartywisePoService.getPObyVendorId(vendorId);
		return ltPOMaster;
	}

	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(@RequestParam("poId") Integer poId) {
		ModelAndView modelAndView = new ModelAndView();
		PartywisePoMaster partywisePoMaster = new PartywisePoMaster();

		try {
			partywisePoMaster = PartywisePoService.getPOById(poId);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		List<PartywisePoMaster> partywisePoMasters = new ArrayList<PartywisePoMaster>();
		partywisePoMasters.add(partywisePoMaster);

		modelAndView.addObject("partyWisePoData", partywisePoMasters);
		modelAndView.setViewName("pharma_partywise_po_bill");

		return modelAndView;
	}

	@RequestMapping(value = "/PoList", method = RequestMethod.GET)
	public @ResponseBody
	List<PartywisePoMaster> getPOList() {
		List<PartywisePoMaster> ltPoMasters = new ArrayList<PartywisePoMaster>();
		ltPoMasters = PartywisePoService.getPOList();
		return ltPoMasters;
	}

	@RequestMapping(value = "/getLastPurchaseVendor", method = RequestMethod.GET)
	public @ResponseBody
	List<String> getLastPurchaseVendor(
			@RequestParam("productId") Integer productId) {
		List<String> ltString = new ArrayList<String>();
		ltString = PartywisePoService.getLastPurchaseVendor(productId);
		return ltString;
	}
	
	@InitBinder
    public void initListBinder(WebDataBinder binder) {
        binder.setAutoGrowCollectionLimit(1000);
    }
	
}
