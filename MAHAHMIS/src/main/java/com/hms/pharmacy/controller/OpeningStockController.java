package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.*;
import com.hms.pharmacy.service.*;

@Controller
@RequestMapping(value = "/openingStockEntry")
public class OpeningStockController {
	@Autowired
	OpeningStockService OpeningStockSevice;
	
	@Autowired
	CommonService commonService;
	
	@Autowired
	PurchaseService purchaseSevice;
	
	@Autowired ProductService productService;
	
	static Logger log=Logger.getLogger(OpeningStockController.class.getName());
	/**
	 *
	 * @Code :get Opening stock list 
	 * @return
	 **/
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getOpeningStockViewList(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		log.info("In Pharmacy getOpeningStockViewList()");
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("openingStockEntry", new OpeningStock());
			List<OpeningStockResult> openingStocks = OpeningStockSevice.getOpeningStockList();
			modelAndView.addObject("openingStock", openingStocks);
			modelAndView.setViewName("pharma_opening_stock_entry_list");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	/**
	 *
	 * @Code :view Opening stock  
	 * @return
	 **/
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getOpeningStockView(HttpServletRequest request,HttpServletResponse response) {
		log.info("In Pharmacy getOpeningStockViewList()");
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("openingStockEntry", new OpeningStock());
			modelAndView.setViewName("Pharma_Opening_Stock_Entry");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	/**
	 *
	 * @Code :save Opening stock  
	 * @return
	 **/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdatePurchase(@ModelAttribute("purchase") OpeningStock openingStock,
			HttpServletRequest request){
		log.info("In Pharmacy saveOrUpdatePurchase()");
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		
		ModelAndView modelAndView = new ModelAndView();
		
		Map<String, JSONArray> batchData = new HashMap<String, JSONArray>();
		batchData = purchaseSevice.getProductNameByBarcode(openingStock.getBatchId(), "");
		
		
		int productunit = 0;
		int purchaseSlaveId = 0;
		
		List<ProductMaster> master=productService.getProductById(openingStock.getProductId());
		productunit=master.get(0).getProductUnit().intValue();
		
		try {
			JSONObject obj1 = (JSONObject) batchData.get("result").get(0);
			
			
			if(obj1.getString("purchaseSlaveId").equals(null) || obj1.getString("purchaseSlaveId").equals(""))
				purchaseSlaveId=0;
			
			else
				purchaseSlaveId=(int) Double.parseDouble(obj1.getString("purchaseSlaveId"));
			
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
		if(unitId!=null)
		{
			openingStock.setUnitId(unitId);
		}
		
		if (OpeningStockSevice.saveOrUpdateOpeningStock(openingStock,
				productunit, purchaseSlaveId)) {
	
		} else {
			modelAndView.addObject("error", "O! Something went wrong..!");
		}
		
		/*modelAndView.setViewName("redirect:/pharmacy/openingStockEntry/view");*/
		
		OpeningStock openingStock2=new OpeningStock();
		ProductMaster productMaster=new ProductMaster();
		productMaster=OpeningStockSevice.getProductMasterDetails(openingStock.getProductId());
				
		String productName=productMaster.getProductName();
	
		
		try
		{
			openingStock2=OpeningStockSevice.getOpeningStockById(openingStock.getOpeningStockId());
			commonService.setstockMasterSlave(openingStock2.getOpeningStockId(), "OpeninStock", 0, 0, openingStock2.getProductId(), openingStock2.getBatchId(), openingStock2.getBatchCode(), 0, openingStock2.getQuantity() * productMaster.getProductUnit().intValue(), 0, openingStock2.getVat(), openingStock2.getIgst(), openingStock2.getCess(), 0.0, openingStock2.getUnitId(), 0, openingStock2.getMrp(), openingStock2.getPurRate());
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		List<OpeningStock> openingStocks=new ArrayList<OpeningStock>();
		openingStocks.add(openingStock2);
		
		modelAndView.addObject("productFullName", productName);
		modelAndView.addObject("openingStockData", openingStocks);
		modelAndView.setViewName("pharma_opening_stock_bill");
		
		return modelAndView;
			
		
	}
	/*****
	 * @Code       :print opening stock
	 * ******/
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("openingStockId") Integer openingStockId,@RequestParam("productName") String productName)
	{
		log.info("In Pharmacy printPo()");
		ModelAndView modelAndView = new ModelAndView();
		OpeningStock billMaster = new OpeningStock();
		
       String pName=productName;

		
		try {
			billMaster = OpeningStockSevice
					.getOpeningStockById(openingStockId);
		} catch (Exception e) {
			e.printStackTrace();
		}
				
		modelAndView.addObject("productFullName", pName);
		List<OpeningStock> saleBillMasters = new ArrayList<OpeningStock>();
		saleBillMasters.add(billMaster);
		modelAndView.addObject("openingStockData", saleBillMasters);
		modelAndView.setViewName("pharma_opening_stock_bill");
		return modelAndView;

	}

	
	/*****
	 * @Code       :check batch availability
	 * ******/
	@RequestMapping(value = "/checkBatchAvailability", method = RequestMethod.GET)
	public @ResponseBody
	List<BatchMaster> getBatchByBatchCode(
			@RequestParam("number") String batchCode) {
		log.info("In Pharmacy getBatchByBatchCode()");
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		batchMasters = OpeningStockSevice.getBatchByBatchCode(batchCode);
		return batchMasters;
	}
	/*****
	 * @Code       :get opening stock by shelf
	 * ******/
	@RequestMapping(value = "/getOpeningStockByShlef", method = RequestMethod.GET)
	public @ResponseBody
	List<OpeningStockResult> getOpeningStockByShlef(
			@RequestParam("shelfId") Integer shelfId) {
		log.info("In Pharmacy getOpeningStockByShlef()");
		List<OpeningStockResult> batchMasters = new ArrayList<OpeningStockResult>();
		batchMasters = OpeningStockSevice.getOpeningStockByShlef(shelfId);
		return batchMasters;
	}
	/*****
	 * @Code       :delete opening stock 
	 * ******/
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteDoctor(@RequestParam("openingStockId") Integer openingStockId) {
		log.info("In Pharmacy deleteDoctor()");
		Boolean flag = false;
		if (OpeningStockSevice.deleteOpeningStock(openingStockId)) {
			flag = true;
		}
		return flag;
	}
	
/*****
	 * @Code       :get opening stock by product
	 * ******/
	@RequestMapping(value = "/getOpeningStockByProduct", method = RequestMethod.GET)
	public @ResponseBody
	List<OpeningStockResult> getOpeningStockByProduct(
			@RequestParam("productId") Integer productId) {
		log.info("In Pharmacy getOpeningStockByProduct()");
		List<OpeningStockResult> batchMasters = new ArrayList<OpeningStockResult>();
		batchMasters = OpeningStockSevice.getOpeningStockByProduct(productId);
		return batchMasters;
	}
	/*****
	
	 * @Code       :For getting GST Amount From Tax master 
	 * ******/
	@RequestMapping(value = "/getGSTamount", method = RequestMethod.GET)
	public @ResponseBody
	double getGSTamount(@RequestParam("taxtId") int taxtId) {
		log.info("In Pharmacy getGSTamount()");
		double amount = OpeningStockSevice
				.getGSTamount(taxtId);
		
		return amount;
	}
}
