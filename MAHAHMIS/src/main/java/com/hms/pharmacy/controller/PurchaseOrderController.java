package com.hms.pharmacy.controller;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.POService;

@Controller
@RequestMapping(value = "/po")
public class PurchaseOrderController {

	@Autowired
	POService poService;

	@Autowired
	CommonService commonService;
	
	static Logger log=Logger.getLogger(PurchaseOrderController.class.getName());
	/**
	 *
	 * @Code :This method for View list
	 * @return
	 **/
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getPOLIst(HttpServletRequest request) {
		log.info("In Pharmacy getPOLIst()");
		ModelAndView modelAndView = new ModelAndView();
		HttpSession session = request.getSession(true);
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		List<PoMaster> ltPoMasters = poService.getPOList(unitId);
		modelAndView.addObject("ltPoMasters", ltPoMasters);

		modelAndView.setViewName("pharma_purchase_order_list");
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for View 
	 * @return
	 **/
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getPOViewFrm(HttpServletRequest request,
			HttpServletResponse response) {
		log.info("In Pharmacy getPOViewFrm()");
		ModelAndView modelAndView = new ModelAndView();

		String url = request.getRequestURI();
		boolean result = commonService.getUserAccess(request, url);

		if (result) {
			modelAndView.addObject("po", new PoMaster());
			modelAndView.setViewName("Pharma_Purchase_Order");
		} else {
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for edit
	 * @return
	 **/
	@RequestMapping(value = "/edit-view", method = RequestMethod.GET)
	public ModelAndView editForm(@RequestParam("poId") Integer poId,
			HttpServletRequest request) {
		log.info("In Pharmacy editForm()");
		HttpSession session = request.getSession(true);
		Integer userId = (Integer) session.getAttribute("userId1");

		ModelAndView modelAndView = new ModelAndView();
		PoMaster poMaster = new PoMaster();
		poMaster = poService.getPOById(poId);
		modelAndView.addObject("po", poMaster);
		modelAndView.setViewName("Pharma_Purchase_Order");
		return modelAndView;
	}

	@InitBinder
	protected void initBinder(HttpServletRequest request,
			ServletRequestDataBinder binder) {
		log.info("In Pharmacy initBinder()");
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
			binder.registerCustomEditor(Date.class, editor);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 *
	 * @Code :This method for save
	 * @return
	 **/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDoctor(
			@ModelAttribute("po") PoMaster poMaster, BindingResult errors,
			HttpServletRequest request) {
		log.info("In Pharmacy saveOrUpdateDoctor()");
		ModelAndView modelAndView = new ModelAndView();
		int poId =0;
		if (poMaster.getPoId() == null) {
			HttpSession session = request.getSession(true);
			Integer userId = (Integer) session.getAttribute("userId1");
			//Unit ID From session 
			Integer unitId =(Integer) session.getAttribute("uId");
			if(unitId!=null)
			{
				poMaster.setUnitId(unitId);
			}
			String ipaddress = request.getRemoteAddr();
			poMaster.setPoCreatedBy(userId);
			poMaster.setIpAddress(ipaddress);
			poMaster.setPoModifyBy(0);
			poId = poService.saveOrUpdatePO(poMaster);
			modelAndView.addObject("success", "Record saved successfully..!");

		} else {

			HttpSession session = request.getSession(true);
			Integer userId = (Integer) session.getAttribute("userId1");
			//Unit ID From session 
			Integer unitId =(Integer) session.getAttribute("uId");
			if(unitId!=null)
			{
				poMaster.setUnitId(unitId);
			}
			poMaster.setPoModifyBy(userId);
			 poId = poService.saveOrUpdatePO(poMaster);
			modelAndView.addObject("success", "Record updated successfully..!");

		}
		System.out.println("poId========"+poId);
		PoMaster poMaster2 = new PoMaster();
		try {
			poMaster2 = poService.getPOByIdForPrint(poMaster.getPoId());
		} catch (Exception exception) {
			exception.printStackTrace();
		}

		List<PoMaster> poMasters = new ArrayList<PoMaster>();
		poMasters.add(poMaster2);

		modelAndView.addObject("poData", poMasters);
		//modelAndView.setViewName("pharma_po_bill");
		modelAndView.setViewName("pharma_po_bill_new");
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for print
	 * @return
	 **/
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(@RequestParam("poId") Integer poId) {
		log.info("In Pharmacy printPo()");
		ModelAndView modelAndView = new ModelAndView();
		PoMaster billMaster = new PoMaster();

		try {
			billMaster = poService.getPOByIdForPrint(poId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<PoMaster> saleBillMasters = new ArrayList<PoMaster>();
		saleBillMasters.add(billMaster);

		modelAndView.addObject("poData", saleBillMasters);
		//modelAndView.setViewName("pharma_po_bill");
		modelAndView.setViewName("pharma_po_bill_new");
		return modelAndView;

	}

	/**
	 *
	 * @Code :This method for delete
	 * @return
	 **/

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deletePO(@RequestParam("poId") Integer poId) {
		log.info("In Pharmacy deletePO()");
		Boolean flag = false;
		if (poService.deletePO(poId)) {
			flag = true;
		}
		return flag;
	}
	/**
	 *
	 * @Code :This method for get data by vendor id
	 * @return
	 **/
	@RequestMapping(value = "/getPObyVendorId", method = RequestMethod.GET)
	public @ResponseBody
	List<PoMaster> getPObyVendorId(@RequestParam("vendorId") Integer vendorId,HttpServletRequest request) {
		log.info("In Pharmacy getPObyVendorId()");
		HttpSession session = request.getSession(true);
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		List<PoMaster> ltPOMaster = new ArrayList<PoMaster>();
		ltPOMaster = poService.getPObyVendorId(vendorId,unitId);
		return ltPOMaster;
	}
	/**
	 *
	 * @Code :This method for get pending po
	 * @return
	 **/
	@RequestMapping(value = "/getPendingPO", method = RequestMethod.GET)
	public @ResponseBody
	List<PoMaster> getPendingPO() {
		log.info("In Pharmacy getPendingPO()");
		List<PoMaster> ltPOMaster = new ArrayList<PoMaster>();
		ltPOMaster = poService.getPendingPO();
		return ltPOMaster;
	}
	/**
	 *
	 * @Code :This method for next auto increment id
	 * @return
	 **/
	@RequestMapping(value = "/getNextAutoIncrement", method = RequestMethod.GET)
	public @ResponseBody
	Integer getNextAutoIncrement() {
		log.info("In Pharmacy getNextAutoIncrement()");
		Integer ltPOMaster = poService.getNextAutoIncrement();
		return ltPOMaster;
	}
	/**
	 *
	 * @Code :This method for get all po list
	 * @return
	 **/
	@RequestMapping(value = "/PoList", method = RequestMethod.GET)
	public @ResponseBody
	List<PoMaster> getPOList(HttpServletRequest request) {
		log.info("In Pharmacy getPOList()");
		HttpSession session = request.getSession(true);
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		List<PoMaster> ltPoMasters = new ArrayList<PoMaster>();
		ltPoMasters = poService.getPOList(unitId);
		return ltPoMasters;
	}
	/**
	 *
	 * @Code :This method for get last purchase vendor
	 * @return
	 **/
	@RequestMapping(value = "/getLastPurchaseVendor", method = RequestMethod.GET)
	public @ResponseBody
	List<String> getLastPurchaseVendor(
			@RequestParam("productId") Integer productId) {
		log.info("In Pharmacy getLastPurchaseVendor()");
		List<String> ltString = new ArrayList<String>();
		ltString = poService.getLastPurchaseVendor(productId);
		return ltString;
	}
	/**
	 *
	 * @Code :This method for get data by purchase id
	 * @return
	 **/
	@RequestMapping(value = "/getPurchaseOrderByPurchaseId", method = RequestMethod.GET)
	public @ResponseBody
	PoMaster getPurchaseOrderByPurchaseId(@RequestParam("poId") Integer poId) {
		log.info("In Pharmacy getPurchaseOrderByPurchaseId()");
		PoMaster poMaster = new PoMaster();
		poMaster = poService.getPurchaseOrderByPurchaseId(poId);
		return poMaster;
	}
	/**
	 *
	 * @Code :This method for save purchase order
	 * @return
	 **/
	@RequestMapping(value = "/savePurchaseOrder", method = RequestMethod.POST)
	public @ResponseBody
	Map<String, String> saveIndentSale(HttpServletRequest request)
			throws ParseException {
		log.info("In Pharmacy saveIndentSale()");
		Map<String, String> result = new HashMap<String, String>();

		String list[] = request.getParameterValues("ltPOslave");

		PoMaster poMaster = new PoMaster();

		String ipaddress = request.getRemoteAddr();

		HttpSession session = request.getSession(true);
		Integer userId = (Integer) session.getAttribute("userId1");
		
		VendorMaster vendorMaster = new VendorMaster();

		String str = list[0].substring(0, list[0].length());

		poMaster = (PoMaster) ConfigUIJSONUtility.getObjectFromJSON(str,
				PoMaster.class);
		if (request.getParameter("vendorId") != null
				&& request.getParameter("vendorId") != "") {
			vendorMaster.setVendorId(Integer.parseInt(request
					.getParameter("vendorId")));
		} else {
			vendorMaster.setVendorId(Integer.parseInt("0.0"));
		}
		poMaster.setVendorMaster(vendorMaster);

		poMaster.setPoProductCount(Integer.parseInt("1"));
		poMaster.setPoDeleteFlag(Integer.parseInt("0"));
		poMaster.setPoTotalAmt((Double.parseDouble("0.0")));
		poMaster.setPoTotalVat((Double.parseDouble("0.0")));
		poMaster.setPoNetTotal((Double.parseDouble("0.0")));
		poMaster.setPoNetTotal((Double.parseDouble("0.0")));
		poMaster.setPoCreatedBy(userId);
		poMaster.setIpAddress(ipaddress);

		poMaster.setPodocId(request.getParameter("poType"));
		poMaster.setPoType("0");

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date = dateFormat.format(new java.util.Date());

		Date date1 = dateFormat.parse(date.toString());

		poMaster.setPoUpdateDate(date1);
		poMaster.setPoDate(date1);

		result = poService.saveOrUpdatePOInSale(poMaster);

		if (poMaster.getPoId() != null)
			result.put("id", poMaster.getPoId().toString());

		return result;

	}

}
