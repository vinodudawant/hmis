package com.hms.pharmacy.controller;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.*;
import com.hms.pharmacy.service.*;

@Controller
@RequestMapping(value = "/productWithZeroStk")
public class ProductWithZeroStockController {

	@Autowired
	private ProductWithZeroStockService productWithZeroStockService; 
	
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getCompanyViewList() {
		
		ModelAndView modelAndView = new ModelAndView();
		/*modelAndView.addObject("productWithZeroStk", new CompanyMaster());*/
		modelAndView.addObject("po", new PoMaster());
     	modelAndView.setViewName("Pharma_Product_With_Zero_Stock");
		return modelAndView;
	}
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCompanyView() {
		
		ModelAndView modelAndView = new ModelAndView();
		List<PoMaster> ltPoMasters = productWithZeroStockService.getPOList();
		modelAndView.addObject("ltPoMasters", ltPoMasters);
     	modelAndView.setViewName("Pharma_Product_With_Zero_Stock_List");
		return modelAndView;
	}
	
	@RequestMapping(value = "/getProductZeroStockList", method = RequestMethod.GET)
	public @ResponseBody
	List<ProductwithZeroStock> getMinLevelProductList() {
			List<ProductwithZeroStock> productwithZeroStocks=productWithZeroStockService.getZeroStockProductList();
			return productwithZeroStocks;
	}
	
	@RequestMapping(value = "/saveProductWithZeroStock", method = RequestMethod.POST)
	public synchronized @ResponseBody String[]  saveOrUpdateDoctor(HttpServletRequest request,HttpServletResponse response)
	{
		boolean results=false;
		String result[]=new String[3];
		PoMaster poMaster = new PoMaster();
			
			String list[]= request.getParameterValues("ltPOslave");
			String str = list[0].substring(0, list[0].length());
		   	
			try
			{
				poMaster = (PoMaster) ConfigUIJSONUtility
					.getObjectFromJSON(str,
							PoMaster.class);
				HttpSession session = request.getSession(true);
				Integer userId = (Integer) session.getAttribute("userId1");
				
				String ipaddress = request.getRemoteAddr();
				
				poMaster.setPoCreatedBy(userId);
				poMaster.setIpAddress(ipaddress);
				
				VendorMaster vendorMaster=new VendorMaster();
							
				if(request.getParameter("txtVendorId")!=null && request.getParameter("txtVendorId")!="")
				{
					vendorMaster.setVendorId(Integer.parseInt(request.getParameter("txtVendorId")));
				}
				
				String txtDate= request.getParameter("txtDate");
				System.out.println(txtDate);
				String fromArray[]=txtDate.split("/");
				StringBuffer fromReult=new StringBuffer();
				fromReult=fromReult.append(fromArray[2]+"-"+fromArray[1]+"-"+fromArray[0]);
				SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
				Date date=dateFormat.parse(fromReult.toString());
				
				poMaster.setPoDate(date);
				
				if(request.getParameter("documentNum")!=null && request.getParameter("documentNum")!="")
				{
					poMaster.setPodocId((request.getParameter("documentNum")));
				}
				
				if(request.getParameter("count")!=null && request.getParameter("count")!="")
				{
					poMaster.setPoProductCount(Integer.parseInt(request.getParameter("count")));
				}
				else
				{
					poMaster.setPoProductCount(0);
				}
				
				if(request.getParameter("total")!=null && request.getParameter("total")!="")
				{
					poMaster.setPoTotalAmt(Double.parseDouble(request.getParameter("total")));
				}
				else
					poMaster.setPoTotalAmt(0.0);
				
				
				if(request.getParameter("vatTotal")!=null && request.getParameter("vatTotal")!="")
				{
					poMaster.setPoTotalVat(Double.parseDouble(request.getParameter("vatTotal")));
				}
				else
					poMaster.setPoTotalVat(0.0);
				
				
				if(request.getParameter("netTotal")!=null && request.getParameter("netTotal")!="")
				{
					poMaster.setPoNetTotal(Double.parseDouble(request.getParameter("netTotal")));
				}
				else
					poMaster.setPoNetTotal(0.0);
				
				if(request.getParameter("remark")!=null && request.getParameter("remark")!="")
				{
					poMaster.setPoRemark((request.getParameter("remark")));
				}
				else
					poMaster.setPoRemark((""));
				
				poMaster.setPoType("2");
				
				poMaster.setVendorMaster(vendorMaster);
				
               poMaster.setPoCreatedBy(userId);
				
				poMaster.setIpAddress(ipaddress);
				
				results=productWithZeroStockService.saveOrUpdatePO(poMaster);
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		
		
		if(results)
		{	
			String id="";
				id=poMaster.getPoId().toString();
			result[0]=id;
			/*return counterSaleMaster.getCounterSaleId().toString();*/
			return result;
		}
		else
		{
			result[0]="error";
			result[1]="Record Not save because of stock is not available";
		}
		return result;
	}
	
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("poId") Integer poId) {
		ModelAndView modelAndView = new ModelAndView();
		PoMaster billMaster = new PoMaster();

		try {
			billMaster = productWithZeroStockService.getPOByIdForPrint(poId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<PoMaster> saleBillMasters = new ArrayList<PoMaster>();
		saleBillMasters.add(billMaster);

		modelAndView.addObject("poData", saleBillMasters);
		modelAndView.setViewName("pharma_product_below_min_level_bill");
		return modelAndView;

	}
	@RequestMapping(value = "/getPObyVendorDetails", method = RequestMethod.GET)
	public @ResponseBody
	List<PoMaster> getPObyVendorId(@RequestParam("vendorId") Integer vendorId) {
		List<PoMaster> ltPOMaster = new ArrayList<PoMaster>();
		ltPOMaster = productWithZeroStockService.getPObyVendorId(vendorId);
		return ltPOMaster;
	}
}
