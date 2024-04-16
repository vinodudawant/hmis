package com.hms.pharmacy.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.ehat.service.LabService;
import com.hms.pharmacy.dao.EhatEnterpriseUtil;
import com.hms.pharmacy.pojo.PharmaProductView;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMasterPrint;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.HsnService;
import com.hms.pharmacy.service.ProductService;
import com.hms.pharmacy.service.TaxService;
import com.hms.pharmacy.service.VendorService;
import com.hms.utility.ApplicationContextUtils;

@Controller
@RequestMapping(value = "/product")
public class ProductController {
	
	@Autowired
	ProductService productService;

	@Autowired
	VendorService vendorService;
	
	@Autowired
	CommonService commonService;
	
	@Autowired
	HsnService hsnService;
	
	@Autowired
	TaxService taxService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView loadProductPage() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("product", new ProductMaster());
		modelAndView.setViewName("Pharma_Product_Master");
		List<ProductMaster> productMasters = productService.getProducts();
		modelAndView.addObject("productMasters", productMasters);
		modelAndView.addObject("hsnMasters", hsnService.getAllHsn());
		modelAndView.addObject("taxMasters", taxService.getAllTaxDetails());
       
		List<VendorMaster> vendorMasters = vendorService.getAllVendorDetails();

		modelAndView.addObject("vendors", vendorMasters);
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView addProduct(
			@ModelAttribute("product") ProductMaster productMaster,
			BindingResult errors,
			@RequestParam("vendorMasters") Set<Integer> ltVendorMaster,HttpServletRequest request) {
		ModelAndView modelAndView = new ModelAndView();
		
	if (productMaster.getProductName() != null
				&& productMaster.getProductName() != "") {
			productMaster.setProductName(productMaster.getProductName()
					.toUpperCase());
		}

		productMaster.setIgst(0+"");
		productMaster.setCgst(0+"");
		productMaster.setCess(0+"");
		productMaster.setSgst(0+"");
		productMaster.setVendorMasters(productMaster.getVendorMasters());

		// get vendor list from jsp page and set to product master
		List<VendorMaster> vendorMasters = new ArrayList<VendorMaster>();
		for (Integer vendorId : ltVendorMaster) {
			VendorMaster vendorMaster = new VendorMaster();
			vendorMaster.setVendorId(vendorId);
			vendorMasters.add(vendorMaster);
		}
		productMaster.setVendorMasters(vendorMasters);
		
		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time=dateFormat1.format(cal.getTime());

		if (productMaster.getProductId() == null) {
			
			HttpSession session = request.getSession(true);
			Integer userId = (Integer) session.getAttribute("userId1");
			String ipaddress = request.getRemoteAddr();
			productMaster.setProductCreatedBy(userId);
			productMaster.setProductIp(ipaddress);
			productMaster.setProductModifyBy(0);
			productMaster.setProductTime(time);
			productService.saveProduct(productMaster);
			 modelAndView.addObject("msg", "Record saved successfully..!");

		} else {
			
			HttpSession session = request.getSession(true);
			Integer userId = (Integer) session.getAttribute("userId1");
			productMaster.setProductModifyBy(userId);
			productMaster.setProductTime(time);
			productService.saveProduct(productMaster);
			 modelAndView.addObject("msg", "Record updated successfully..!");
		}

		
		
		modelAndView.setViewName("redirect:view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteProduct(@RequestParam("productId") Integer productId,HttpServletRequest request) {
		Boolean flag = false;
		
		HttpSession session = request.getSession(true);
		Integer userId = (Integer) session.getAttribute("userId1");
		
		if (productService.deleteProduct(productId,userId)) {
			flag = true;
		}
		
		return flag;
	}

	@RequestMapping(value = "/autoSuggestionProduct", method = RequestMethod.GET)
	public @ResponseBody
	List<ProductMaster> autoSuggestionProduct(
			@RequestParam("letter") String letter) {
		List<ProductMaster> productMasters = new ArrayList<ProductMaster>();
		try {
			productMasters = productService.getAutoSuggestionProduct(letter);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return productMasters;
	}

	@RequestMapping(value = "/autoSuggestionProductForPurchase", method = RequestMethod.GET)
	public @ResponseBody
	List<ProductMaster> autoSuggestionProductForPurchase(
			@RequestParam("letter") String letter,@RequestParam(value="vmi",required = false) Integer vmi) {
		List<ProductMaster> productMasters = new ArrayList<ProductMaster>();

		try {
			productMasters = productService
					.autoSuggestionProductForPurchase(letter,vmi);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productMasters;
	}

	@RequestMapping(value = "/getAllProducts", method = RequestMethod.POST)
	public @ResponseBody
	List<ProductMaster> getAllProducts() {
		List<ProductMaster> productMasters = new ArrayList<ProductMaster>();

		try {
			productMasters = productService.getAllProducts();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productMasters;
	}

	@RequestMapping(value = "/autoSuggestionProductByBatch", method = RequestMethod.GET)
	public @ResponseBody
	List<String> autoSuggestionProductByBatch(
			@RequestParam("productId") Integer productId,
			HttpServletRequest request) {

		HttpSession session = request.getSession();
		String storeId = (String) session.getAttribute("pharmacyStoreId");
		List<String> results = new ArrayList<String>();

		try {
			results = productService.autoSuggestionProductByBatch(productId,
					storeId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return results;
	}

	@RequestMapping(value = "/getProductById", method = RequestMethod.GET)
	public @ResponseBody
	List<ProductMaster> getProductById(
			@RequestParam("productId") Integer productId) {
		List<ProductMaster> productMasters = productService
				.getProductById(productId);
		return productMasters;
	}

	@RequestMapping(value = "/getStockByProductId", method = RequestMethod.GET)
	public @ResponseBody
	List<StockMaster> getStockByProductId(
			@RequestParam("productId") Integer productId) {
		List<StockMaster> productMasters = productService
				.getStockByProductId(productId);
		return productMasters;
	}

	@RequestMapping(value = "/getAlternateProductByProductId", method = RequestMethod.GET)
	public @ResponseBody
	String getAlternateProductByProductId(
			@RequestParam("productId") Integer productId) {
		JSONArray jsonArray = productService
				.getAlternateProductByProductId(productId);
		return JSONValue.toJSONString(jsonArray);
	}

	@RequestMapping(value = "/getAlternateProductByDrugId", method = RequestMethod.GET)
	public @ResponseBody
	String getAlternateProductByDrugId(@RequestParam("drugId") Integer drugId) {
		JSONArray jsonArray = productService
				.getAlternateProductByDrugId(drugId);
		return JSONValue.toJSONString(jsonArray);
	}
	
	@RequestMapping(value = "/getProductWiseBarcodeByProductId", method = RequestMethod.GET)
	public @ResponseBody
	PurchaseMasterPrint getProductWiseBarcodeByProductId(
			@RequestParam("productId") Integer productId,
			@RequestParam("purchaseId") Integer purchaseId) {
		EhatEnterpriseUtil enterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		List<PurchaseMasterPrint> lstPurchaseMaster = enterpriseUtil.getPurchaseDetailsbyPurId(purchaseId, productId);
		PurchaseMasterPrint obj = new PurchaseMasterPrint();
		obj.setLstPurchaseMaster(lstPurchaseMaster);
		return obj;
	}
	
	@RequestMapping(value = "/updateProductHSN", method = RequestMethod.POST)
	public void updateProductHSN(
			@RequestParam("productId") Integer productId,
			@RequestParam("txtHsn") String txtHsn) {
		
		productService.updateProductHSN(productId,txtHsn);
	}
	
	@RequestMapping(value = "/saveHSN/{txtHsn}", method = RequestMethod.POST)
	public void saveHSN(@PathVariable("txtHsn") String txtHsn) {
		productService.saveHSN(txtHsn);
	}
	
	@RequestMapping(value = "/autoSuggestionCathLabVendor", method = RequestMethod.GET)
	public @ResponseBody
	List<ProductMaster> autoSuggestionCathLabVendor(
			@RequestParam("letter") String letter) {
		List<ProductMaster> productMasters = new ArrayList<ProductMaster>();
		try {
			productMasters = productService.autoSuggestionCathLabVendor(letter);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return productMasters;
	}
	
	@RequestMapping(value = "/cathLabProduct", method = RequestMethod.GET)
	public ModelAndView cathLabProduct() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_CathLab_List_Vendor_Wise");
		//List<VendorMaster> vendorMasters = vendorService.getAllVendorDetails();
		//modelAndView.addObject("vendors", vendorMasters);
		return modelAndView;
	}
	
	@ResponseBody
	@RequestMapping(value = "/getCathLabProductByVendor/{vendorId}", method = RequestMethod.GET)
	public List<ProductMaster> getCathLabProductByVendor(@PathVariable("vendorId") int vendorId) {
		return productService.getCathLabProductByVendor(vendorId);
	}
	
	/*****
	 * @author    :BILAL
	 * @Date      :11-12-2017
	 * @Code      :For product hsno and gst
	 * *******/
	@Autowired
	LabService labService;
	
	@RequestMapping(value = "/fetchHsnandGst", method = RequestMethod.GET)
	@ResponseBody
	public PharmaProductView fetchHsnandGst(
			
			HttpServletRequest request,@RequestParam("productId") int productId
						) { 
		
		HttpSession session=request.getSession();
		
		Integer unitId = (Integer) session.getAttribute("uId");
		
		PharmaProductView obj = new PharmaProductView();
		
		List<PharmaProductView> alllstService = new ArrayList<PharmaProductView>();
		alllstService = productService.fetchHsnandGst(unitId,productId);
		
		String StateId=hospitalstate();	
		obj.setListpharmaproduct(alllstService);
		obj.setStateId(Integer.parseInt(StateId));
		
		return obj;
	}
	
	/*****
	 * @Code      :For hospital state 
	 * *******/
	@RequestMapping(value = "/hospitalstate", method = RequestMethod.GET)
	public String hospitalstate() {
		String tableName ="hospital";
		String columnName="hospitalState";
		int pkId =1;
		String pkColumn="idhospital";
		return labService.getStringValOfObject( tableName,  columnName, pkId, pkColumn);
		
	}
	
	@RequestMapping(value = "/autoSuggestionProductlist", method = RequestMethod.GET)
	public @ResponseBody
	List<ProductMaster> autoSuggestionProductlist(
			@RequestParam("letter") String letter) {
		List<ProductMaster> productMasters = new ArrayList<ProductMaster>();
		try {
			productMasters = productService.autoSuggestionProductlist(letter);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return productMasters;
	}
	
	//@author : Dayanand Khandekar @date: 12-sep-2018 @reason : For getting all medicine name
	@RequestMapping(value = "/getAllPresciption", method = RequestMethod.GET)
	@ResponseBody
	ProductMaster getAllPresciption(@RequestParam("letter") String letter)
	{
		
		ProductMaster obj=new ProductMaster();
		List<ProductMaster> list=productService.getPreparationAll(letter);
		obj.setPlist(list);
		return obj;
	}
	
	//@author : Dayanand Khandekar @date: 12-sep-2018 @reason : For getting perticular medicine details by id

	@RequestMapping(value = "/getProductByID", method = RequestMethod.GET)
	@ResponseBody
	ProductMaster getProductByID(@RequestParam("productId") int productId)
	{
		
		ProductMaster obj=new ProductMaster();
		List<ProductMaster> list=productService.getProductByIDD(productId);
		obj.setPlist(list);
		return obj;
	}
	
	
}
