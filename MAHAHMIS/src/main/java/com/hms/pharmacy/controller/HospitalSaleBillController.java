package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.HospitalSale;
import com.hms.pharmacy.pojo.HospitalSaleBillMaster;
import com.hms.pharmacy.pojo.HospitalSaleBillPrint;
import com.hms.pharmacy.pojo.InwardResult;
import com.hms.pharmacy.pojo.PatientMaster;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.HospitalSalesBillService;

@Controller
@RequestMapping(value = "/hospitalSalesBill")
public class HospitalSaleBillController {
	@Autowired
	HospitalSalesBillService hospitalSalesBillService;

	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getHospitalSalesBillView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("hospitalSalesBill",
				new HospitalSaleBillMaster());
		modelAndView.setViewName("Pharma_Hospital_Sales");
		return modelAndView;
	}

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getHospitalSaleBillLIst() {
		ModelAndView modelAndView = new ModelAndView();

		List<HospitalSaleBillMaster> ltHospitalSaleMasters = hospitalSalesBillService
				.getHospitalSales();
		modelAndView.addObject("ltHospitalSaleMasters", ltHospitalSaleMasters);

		modelAndView.setViewName("Pharma_Hospital_Sales_List");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView addIngredients(
			@ModelAttribute("hospitalSalesBill") HospitalSaleBillMaster hospitalSaleBillMaster,BindingResult bindingResult) {
		ModelAndView modelAndView = new ModelAndView();
		if (hospitalSalesBillService
				.saveHospitalSalesBill(hospitalSaleBillMaster)) {
			if (hospitalSaleBillMaster.getHospitalBillId() != null) {
				modelAndView.addObject("success",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("success",
						"Record updated successfully..!");
			}
		} else {
		/*	modelAndView.addObject("error", "Oops! Something went wrong..!");*/
		}

		HospitalSaleBillMaster hospitalSaleBillMaster2 = new HospitalSaleBillMaster();
		try {
			hospitalSaleBillMaster2 = hospitalSalesBillService
					.getHospitalSalesDetails(hospitalSaleBillMaster
							.getHospitalBillId());
		} catch (Exception exception) {
			exception.printStackTrace();
		}

		List<HospitalSaleBillMaster> saleBillMasters = new ArrayList<HospitalSaleBillMaster>();
		saleBillMasters.add(hospitalSaleBillMaster2);

		HospitalSale hospitalSale=new HospitalSale();
		HospitalSale hospitalSale1=new HospitalSale();
		HospitalSale hospitalSale2=new HospitalSale();
		try
		{
			hospitalSale= hospitalSalesBillService.getPatientDataByHospitalId(hospitalSaleBillMaster.getHospitalBillId());
					
			hospitalSale1= hospitalSalesBillService.getSponserByHospitalId(hospitalSaleBillMaster.getHospitalBillId());
					
			hospitalSale2= hospitalSalesBillService.getConsultantByHospitalId(hospitalSaleBillMaster.getHospitalBillId());
					
			
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		String pname=hospitalSale.getPatientName();
		String pid=hospitalSale.getPatientId();
		String paddress=hospitalSale.getPatientAddress();
		String mobileNumber=hospitalSale.getPatientMobileNumber();
		String sponserName=hospitalSale1.getSponserName();
		String consultantName=hospitalSale2.getConsultantName();
		
		modelAndView.addObject("hospitalSalePatientName", pname);
		modelAndView.addObject("hospitalSalePatientId", pid);
		modelAndView.addObject("hospitalSalePatientAddress", paddress);
		modelAndView.addObject("hospitalSalePatientNumber", mobileNumber);
		modelAndView.addObject("hospitalSaleSponserName", sponserName);
		modelAndView.addObject("hospitalSaleDoctorName", consultantName);
		
		
		
		modelAndView.addObject("hospitalSaleData", saleBillMasters);
		modelAndView.setViewName("pharma_hospital_sale_bill");

		/* modelAndView.setViewName("redirect:view-frm");*/
		return modelAndView;
	}

	@RequestMapping(value = "/getDetailsByInward", method = RequestMethod.POST)
	public @ResponseBody
	List<InwardResult> getDetailsByInward(
			@RequestParam("inwardNo") Integer inwardNo) {
		Boolean flag = false;
		List<InwardResult> inwardResults = hospitalSalesBillService
				.getDetailsByInward(inwardNo);
		return inwardResults;

	}

	@RequestMapping(value = "/getProductById", method = RequestMethod.POST)
	public @ResponseBody
	List<ProductMaster> getProductById(@RequestParam("products") String products) {

		String str[] = products.split(",");
		Integer[] arr = new Integer[str.length];
		for (int i = 0; i < str.length; i++) {
			arr[i] = Integer.parseInt(str[i]);
		}
		List<ProductMaster> productMasters = hospitalSalesBillService
				.getProductById(arr);
		return productMasters;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody Boolean deleteHospitalSaleBill(@RequestParam("patientId") Integer hospitalSalesBillId)
	 {
		Boolean flag = false;
		if (hospitalSalesBillService.deleteHospitalSaleBill(hospitalSalesBillId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/hospitalSalesBillDetails", method = RequestMethod.GET)
	public @ResponseBody
	List<HospitalSaleBillMaster> getHospitalBillId(
			@RequestParam("InwardNo") String InwardNo) {
		List<HospitalSaleBillMaster> ltpatientSaleBillMaster = new ArrayList<HospitalSaleBillMaster>();
		ltpatientSaleBillMaster = hospitalSalesBillService
				.getHospitalBillId(InwardNo);
		return ltpatientSaleBillMaster;
	}

	@RequestMapping(value = "/autoSuggestionInward", method = RequestMethod.GET)
	public @ResponseBody List<HospitalSaleBillMaster> autoSuggestionInward(@RequestParam("letter")String letter) {
		 
		List<HospitalSaleBillMaster> HospitalSaleMasters = hospitalSalesBillService.getAutoSuggestionInwardNames(letter);
		return HospitalSaleMasters;
	}
	
	
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("hospitalSaleId") Integer hospitalSaleId) {
		ModelAndView modelAndView = new ModelAndView();
		HospitalSaleBillMaster billMaster = new HospitalSaleBillMaster();

		try {
			billMaster = hospitalSalesBillService
					.getHospitalSalesDetails(hospitalSaleId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<HospitalSaleBillMaster> saleBillMasters = new ArrayList<HospitalSaleBillMaster>();
		saleBillMasters.add(billMaster);
		
		HospitalSale hospitalSale=new HospitalSale();
		HospitalSale hospitalSale1=new HospitalSale();
		HospitalSale hospitalSale2=new HospitalSale();
		try
		{
			hospitalSale= hospitalSalesBillService.getPatientDataByHospitalId(hospitalSaleId);
			hospitalSale1= hospitalSalesBillService.getSponserByHospitalId(hospitalSaleId);
			hospitalSale2= hospitalSalesBillService.getConsultantByHospitalId(hospitalSaleId);
			
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		String pname=hospitalSale.getPatientName();
		String pid=hospitalSale.getPatientId();
		String paddress=hospitalSale.getPatientAddress();
		String mobileNumber=hospitalSale.getPatientMobileNumber();
		String sponserName=hospitalSale1.getSponserName();
		String consultantName=hospitalSale2.getConsultantName();
		
		
		modelAndView.addObject("hospitalSalePatientName", pname);
		modelAndView.addObject("hospitalSalePatientId", pid);
		modelAndView.addObject("hospitalSalePatientAddress", paddress);
		modelAndView.addObject("hospitalSalePatientNumber", mobileNumber);
		modelAndView.addObject("hospitalSaleSponserName", sponserName);
		modelAndView.addObject("hospitalSaleDoctorName", consultantName);

		modelAndView.addObject("hospitalSaleData", saleBillMasters);
		modelAndView.setViewName("pharma_hospital_sale_bill");
		return modelAndView;

	}

}
