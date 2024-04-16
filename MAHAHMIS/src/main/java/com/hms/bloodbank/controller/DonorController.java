package com.hms.bloodbank.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.bloodbank.dto.BloodRequest;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorMaster;
import com.hms.bloodbank.dto.DonorReaction;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.dto.DonorTreatment;
import com.hms.bloodbank.dto.StockRegister;
import com.hms.bloodbank.dto.TestRegister;
import com.hms.bloodbank.service.DonorService;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;

@RestController
@RequestMapping(value="/donor")
public class DonorController {
	
	@Autowired
	DonorService donorservice;

	
	@RequestMapping(value = "/saveDonor", method = RequestMethod.POST)
	public int saveDonor(DonorMaster donor, HttpServletRequest request) {
		int response = donorservice.saveDonor(donor, request);
		return response;
	}
	
	
	@RequestMapping(value = "/searchDonorByName", method = RequestMethod.POST)
	public List<DonorMaster> searchDonorByName(@RequestParam("searchName") String name, @RequestParam("callfrom") String callfrom,HttpServletRequest request) {
		List<DonorMaster> list=new ArrayList<DonorMaster>();
		list = donorservice.searchDonorByName(name,callfrom,request);
		return  list;
	}

	
	@RequestMapping(value = "/getDonorById", method = RequestMethod.POST)
	public  DonorMaster getDonorById(@RequestParam("id") int id,HttpServletRequest request) {
		DonorMaster donorMaster =donorservice.getDonorById(id,request);
		return  donorMaster;
	}


	@RequestMapping(value = "/saveDonorTreatment", method = RequestMethod.POST)
	public int saveDonorTreatment(DonorTreatment donor, HttpServletRequest request) {
		int response = donorservice.saveDonorTreatment(donor, request);
		return response;
	}
	
	@RequestMapping(value = "/getCheckUpByTreatmentId", method = RequestMethod.POST)
	public DonorCheckupList getCheckUpListByTreatmentId(@RequestParam("id") int id,HttpServletRequest request) {
		DonorCheckupList donorCheckup =donorservice.getCheckUpByTreatmentId(id,request);
		return  donorCheckup;
	}

	@RequestMapping(value = "/saveDonorReaction", method = RequestMethod.POST)
	public int saveDonorReaction(DonorReaction donor, HttpServletRequest request) {
		int response = donorservice.saveDonorReaction(donor, request);
		return response;
	}


	@RequestMapping(value = "/getBloodBagIdBySectionId", method = RequestMethod.POST)
	public List<DonorSampleDispatch> getBloodBagIdBySectionId(@RequestParam("id") int id,HttpServletRequest request) {
		List<DonorSampleDispatch> donorSampleDispatch =donorservice.getBloodBagIdBySectionId(id,request);
		return  donorSampleDispatch;
	}
	
	@RequestMapping(value = "/getDonorByBloodBagId", method = RequestMethod.POST)
	public DonorMaster getDonorByBloodBagId(@RequestParam("bloodBagId") Integer bloodBagId,HttpServletRequest request) {
		DonorMaster donorMaster =donorservice.getDonorByBloodBagId(bloodBagId,request);
		return  donorMaster;
	}
	
	@RequestMapping(value = "/getTestRegsiterDetails", method = RequestMethod.POST)
	public List<TestRegister> getTestRegsiterDetails(@RequestParam("bloodBagId") Integer bloodBagId,HttpServletRequest request) {
		List<TestRegister> donorMaster =donorservice.getTestRegsiterDetails(bloodBagId,request);
		/*
		 * List<TestRegister> list = new ArrayList<TestRegister>();
		 * list.add(donorMaster);
		 */
		return  donorMaster;
	}
	
	  @RequestMapping(value = "/saveTestRegister", method = RequestMethod.POST)
	  public int saveTestRegister(TestRegister testRegister,@RequestParam("listCompObject")String listCompObject,  HttpServletRequest request) {
		  int response =  donorservice.saveTestRegister(testRegister,listCompObject, request); 
		  return response;
	  }
	 
	
	@RequestMapping(value = "/getDetailsByBloodBag", method = RequestMethod.POST)
	public DonorBloodBagDetails getDetailsByBloodBag(@RequestParam("bloodBagId") Integer bloodBagId,HttpServletRequest request) {
		DonorBloodBagDetails blooddetails =donorservice.getDetailsByBloodBag(bloodBagId,request);
		return  blooddetails;
	}
	
	@RequestMapping(value = "/saveComponentSeperation", method = RequestMethod.POST)
	public int saveComponentSeperation(@RequestParam("listCompObjectComponent") String componentSeperation, HttpServletRequest request) {
		int response = donorservice.saveComponentSeperation(componentSeperation, request);
		return response;
	}
	
	@RequestMapping(value = "/getBloodBagsInComponent", method = RequestMethod.GET)
	public List<ComponentSeperation> getBloodBagsInComponent() {
		List<ComponentSeperation> donorSampleDispatch =donorservice.getBloodBagsInComponent();
		return  donorSampleDispatch;
	}
	
	@RequestMapping(value = "/getBloodBagsInStocks", method = RequestMethod.GET)
	public List<ComponentSeperation> getBloodBagsInStocks() {
		List<ComponentSeperation> donorSampleDispatch =donorservice.getBloodBagsInStocks();
		return  donorSampleDispatch;
	}
	
	@RequestMapping(value = "/getComponentByBloodBagId", method = RequestMethod.POST)
	public List<ComponentSeperation> getComponentByBloodBagId(@RequestParam("bloodBagId") Integer bloodBagId,@RequestParam("callfrom") String callfrom,HttpServletRequest request) {
		List<ComponentSeperation> c =donorservice.getComponentByBloodBagId(bloodBagId,callfrom,request);
		return  c;
	}

	@RequestMapping(value = "/saveStock", method = RequestMethod.POST)
	public int saveStock(@RequestParam("listCompObjectStock") String componentSeperation, HttpServletRequest request) {
		int response = donorservice.saveStock(componentSeperation, request);
		return response;
	}
	
	@RequestMapping(value = "/discardStock", method = RequestMethod.POST)
	public int discardStock(@RequestParam("listDiscardStockObj") String listDiscardStockObj, HttpServletRequest request) {
		int response = donorservice.discardStock(listDiscardStockObj, request);
		return response;
	}

	@RequestMapping(value = "/getbagDetailsByTreatmentId", method = RequestMethod.POST)
	public DonorBloodBagDetails getbagDetailsByTreatmentId(@RequestParam("id") int id,HttpServletRequest request) {
		DonorBloodBagDetails donorCheckup =donorservice.getbagDetailsByTreatmentId(id,request);
		return  donorCheckup;
	}
	
	@RequestMapping(value = "/getBloodDonorDetailsList", method = RequestMethod.GET)
	public List<DonorMaster> getBloodDonorDetailsList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<DonorMaster> c =donorservice.getBloodDonorDetailsList(unitId,request);
		return  c;
	}
	
	@RequestMapping(value = "/editBloodDonor", method = RequestMethod.GET)
	@ResponseBody
	public DonorMaster editBloodDonor(@RequestParam("id") Integer DonorId,@RequestParam("unitId")Integer unitId, HttpServletRequest request) {
		DonorMaster obj=new DonorMaster();
		obj = donorservice.editBloodDonor(DonorId,unitId,request);
		return obj;
	}
	
	@RequestMapping(value = "/deleteBloodDonor", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganDonor(@RequestParam("donorId") Integer donorId,@RequestParam("unitId")Integer unitId, HttpServletRequest request) {
		
		boolean response = donorservice.deleteBloodDonor(donorId, unitId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}

		return msg;
	}
	
	@RequestMapping(value = "/getAllBloodDonorsTreatmentList", method = RequestMethod.GET)
	public List<DonorTreatment> getAllBloodDonorsTreatmentList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<DonorTreatment> c =donorservice.getAllBloodDonorsTreatmentList(unitId,request);
		return  c;
	}
	
	@RequestMapping(value = "/editBloodDonorTreatment", method = RequestMethod.GET)
	@ResponseBody
	public DonorTreatment editBloodDonorTreatment(@RequestParam("id") Integer DonorId, @RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		DonorTreatment obj=new DonorTreatment();
		obj = donorservice.editBloodDonorTreatment(DonorId,unitId,request);
		return obj;
	}
	
	@RequestMapping(value = "/getBloodDonorTreatmentDetailsById", method = RequestMethod.GET)
	@ResponseBody
	public DonorMaster getBloodDonorTreatmentDetailsById(@RequestParam("id") Integer DonorId,@RequestParam("callform") String callform,HttpServletRequest request) {
		DonorMaster obj=new DonorMaster();
		obj = donorservice.getBloodDonorTreatmentDetailsById(DonorId,callform,request);
		return obj;
	}
	
	@RequestMapping(value = "/deleteBloodDonorTreatment", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBloodDonorTreatment(@RequestParam("donorTreatmentId") Integer donorTreatmentId,@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		
		boolean response = donorservice.deleteBloodDonorTreatment(donorTreatmentId, unitId,request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}

		return msg;
	}
	
	@RequestMapping(value = "/getAllBloodDonorCheckupList", method = RequestMethod.GET)
	public List<DonorCheckupList> getAllBloodDonorCheckupList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<DonorCheckupList> c =donorservice.getAllBloodDonorCheckupList(unitId,request);
		return  c;
	}
	
	@RequestMapping(value = "/editBloodDonorCheckup", method = RequestMethod.GET)
	@ResponseBody
	public DonorCheckupList editBloodDonorCheckup(@RequestParam("id") Integer DonorId,HttpServletRequest request) {
		DonorCheckupList obj=new DonorCheckupList();
		obj = donorservice.editBloodDonorCheckup(DonorId,request);
		return obj;
	}
	
	@RequestMapping(value = "/deleteBloodDonorCheckup", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBloodDonorCheckup(@RequestParam("donorCheckupId") Integer donorCheckupId, HttpServletRequest request) {
		
		boolean response = donorservice.deleteBloodDonorCheckup(donorCheckupId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}

		return msg;
	}
	
	
	@RequestMapping(value = "/getCheckuplistDonorTreatmentById", method = RequestMethod.GET)
	@ResponseBody
	public DonorCheckupList getCheckuplistDonorTreatmentById(@RequestParam("id") Integer id,HttpServletRequest request) {
		DonorCheckupList obj=new DonorCheckupList();
		obj = donorservice.getCheckuplistDonorTreatmentById(id,request);
		return obj;
	}
	
	@RequestMapping(value = "/getAllStockList", method = RequestMethod.GET)
	public List<StockRegister> getAllStockList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<StockRegister> c =donorservice.getAllStockList(unitId,request);
		return  c;
	}
	
	@RequestMapping(value = "/getStockListById", method = RequestMethod.GET)
	public StockRegister getStockListById(@RequestParam("id") Integer id, HttpServletRequest request) {
		StockRegister stockReg =donorservice.getStockListById(id,request);
		return  stockReg;
	}

	@RequestMapping(value = "/editStock", method = RequestMethod.GET)
	@ResponseBody
	public StockRegister editStock(@RequestParam("id") Integer id,HttpServletRequest request) {
		StockRegister obj=new StockRegister();
		obj = donorservice.editStock(id,request);
		return obj;
	}
	
	@RequestMapping(value = "/deleteStock", method = RequestMethod.POST)
	public @ResponseBody
	String deleteStock(@RequestParam("id") Integer id, HttpServletRequest request) {
		
		boolean response = donorservice.deleteStock(id, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}

		return msg;
	}
	//Added By Annapurna
	@RequestMapping(value = "/getAllDiscardStockList", method = RequestMethod.GET)
	public @ResponseBody
	 List<StockRegister> getAllDiscardStockList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<StockRegister> c =donorservice.getAllDiscardStockList(unitId,request);
		return  c;
	}
	@RequestMapping(value = "/getDiscardStockListById", method = RequestMethod.GET)
	public StockRegister getDiscardStockListById(@RequestParam("id") Integer id, HttpServletRequest request) {
		StockRegister discardStock =donorservice.getDiscardStockListById(id,request);
		return  discardStock;
	}

	// Added By Annapurna
	@RequestMapping(value = "/deleteDiscardStock", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDiscardStock(@RequestParam("id") Integer id, HttpServletRequest request) {
		
		boolean response = donorservice.deleteDiscardStock(id, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}

		return msg;
	}
	
	// Added By Annapurna
	@RequestMapping(value = "/editDiscardStock", method = RequestMethod.GET)
	@ResponseBody
	public StockRegister editDiscardStock(@RequestParam("id") Integer id,HttpServletRequest request) {
		StockRegister obj=new StockRegister();
		obj = donorservice.editDiscardStock(id,request);
		return obj;
	}
}
