package com.hms.bloodbank.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.hms.bloodbank.dto.BloodBagMaster;
import com.hms.bloodbank.dto.BloodGroupTesting;
import com.hms.bloodbank.dto.BloodItemMaster;
import com.hms.bloodbank.dto.BloodTypeMaster;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorMaster;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.service.DonorCheckupListService;
import com.hms.doctordesk.dto.DdServiceAdvisedDto;
import com.hms.dto.Doctor;
import com.hms.dto.Users;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.pojo.PurchaseMaster;



@RestController
@RequestMapping(value="/donor_checkuplist")
public class DonorCheckupListController {
	
	static Logger log=Logger.getLogger(DonorCheckupListController.class.getName());
	
	@Autowired
	DonorCheckupListService donorCheckupListService;
	
	static {
		System.out.println("DonorCheckupListController Loaded...!");
	}
	


	@RequestMapping(value = "/fetchDoctor", method = RequestMethod.POST)
	public @ResponseBody
	Doctor fetchDoctor(HttpServletRequest request) {
		log.info("In DonorCheckupListController fetchDoctor()");
		List<Doctor> listDoctorDetails = new ArrayList<Doctor>();
		listDoctorDetails = donorCheckupListService.fetchDoctor();
		System.err.println(listDoctorDetails);
		Doctor obj = new Doctor();
		obj.setListDoctor(listDoctorDetails);
		log.debug("Response----> "+obj);
		return obj;
	}

	@RequestMapping(value = "/saveCheckuplist", method = RequestMethod.POST)
	public int saveCheckuplist(DonorCheckupList checkuplist, HttpServletRequest request) {
		log.info("In DonorCheckupListController saveCheckuplist()");
		System.out.println("checkuplist"+checkuplist);
		System.out.println("checkuplist.getDonorTreatmentId()==>>"+checkuplist.getDonorTreatmentId());
		int response = donorCheckupListService.saveCheckuplist(checkuplist, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/saveBloodBagDetails", method = RequestMethod.POST)
	public int saveBloodBagDetails(DonorBloodBagDetails BloodBagDetails, HttpServletRequest request) {
		log.info("In DonorCheckupListController saveBloodBagDetails()");
		int response = donorCheckupListService.saveBloodBagDetails(BloodBagDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	
	@RequestMapping(value = "/serachBloodBagDetailsById", method = RequestMethod.POST)
	public List<DonorBloodBagDetails> serachBloodBagDetailsById(@RequestParam("searchParam") String searchParam,@RequestParam("callform") String callform,HttpServletRequest request) {
		List<DonorBloodBagDetails> list=new ArrayList<DonorBloodBagDetails>();
		list = donorCheckupListService.serachBloodBagDetailsById(searchParam, callform);
		return  list;
	}

	
	@RequestMapping(value = "/getDonorDetailsByTreatmentId", method = RequestMethod.POST)
	public  DonorBloodBagDetails getDonorDetailsByTreatmentId(@RequestParam("donorTreatmentId") int id,@RequestParam("callform") String callform , HttpServletRequest request) {
		DonorBloodBagDetails donorBloodBagDetails =donorCheckupListService.getDonorDetailsByTreatmentId(id,callform,request);
		return  donorBloodBagDetails;
	}
	
	@RequestMapping(value = "/getDonorCheckupListDetailsByTreatmentId", method = RequestMethod.POST)
	public  DonorCheckupList getDonorCheckupListDetailsByTreatmentId(@RequestParam("donorTreatmentId") int id,HttpServletRequest request) {
		DonorCheckupList donorCheckupList =donorCheckupListService.getDonorCheckupListDetailsByTreatmentId(id,request);
		return  donorCheckupList;
	}
	
	@RequestMapping(value = "/saveBloodGroupTesting", method = RequestMethod.POST)
	public int saveBloodGroupTesting(BloodGroupTesting BloodGroupTesting, HttpServletRequest request) {
		log.info("In DonorCheckupListController saveBloodGroupTesting()");
		int response = donorCheckupListService.saveBloodGroupTesting(BloodGroupTesting, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/saveSampleDispatch", method = RequestMethod.POST)
	public int saveSampleDispatch(DonorSampleDispatch donorSampleDispatchDetails, HttpServletRequest request) {
		System.out.println("count>>>"+donorSampleDispatchDetails.getSampleItemName());
		log.info("In DonorCheckupListController saveSampleDispatch()");
		System.out.println(donorSampleDispatchDetails);
		int response = donorCheckupListService.saveSampleDispatch(donorSampleDispatchDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getSampleDetails", method = RequestMethod.GET)
	public @ResponseBody
	List<DonorSampleDispatch> getSampleDetails(@RequestParam("sampleStatus") Integer sampleStatus, @RequestParam("callform") String callform,
			@RequestParam("sampleSection") Integer sampleSection,@RequestParam("sampleBloodBagNo") Integer sampleBloodBagNo, HttpServletRequest request, HttpServletResponse response) throws ParseException {
	 	
		String from = request.getParameter("formDate");
		
		String to = request.getParameter("toDate");	
		List<DonorSampleDispatch> sampleDispatch= donorCheckupListService.getSampleDetails(sampleStatus,from,to,callform,sampleSection,sampleBloodBagNo);

		return sampleDispatch;
	}
	
	

	@RequestMapping(value = "/saveSampleAcknowledge", method = RequestMethod.POST)
	public @ResponseBody
	 int saveSampleAcknowledge(@RequestParam("bloodDispatchId") int bloodDispatchId,@RequestParam("sampleStatus") int sampleStatus,@RequestParam("remarks") String remarks, HttpServletRequest request) {
		log.info("In DonorCheckupListController saveSampleAcknowledge()");
		int response = donorCheckupListService.saveSampleAcknowledge(bloodDispatchId,sampleStatus,remarks,request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getBagDetails", method = RequestMethod.POST)
	public @ResponseBody
	DonorBloodBagDetails getBagDetails(@RequestParam("masterId") Integer masterId,HttpServletRequest request) {
		log.info("In DonorCheckupListController getBagDetails()");
		List<DonorBloodBagDetails> listDonorBagDetails = new ArrayList<DonorBloodBagDetails>();
		listDonorBagDetails = donorCheckupListService.getBagDetails(masterId);
		System.err.println(listDonorBagDetails);
		DonorBloodBagDetails obj = new DonorBloodBagDetails();
		obj.setListDonorBloodBagDetails(listDonorBagDetails);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/getAllBloodTypeMaster", method = RequestMethod.GET)
	public @ResponseBody
	BloodTypeMaster getAllBloodTypeMaster(HttpServletRequest request) {
		log.info("In BloodItemMasterController getAllBloodItemMaster()");
		List<BloodTypeMaster> lstBloodTypeMaster = new ArrayList<BloodTypeMaster>();
		lstBloodTypeMaster = donorCheckupListService.getAllBloodTypeMaster(request);
		BloodTypeMaster obj = new BloodTypeMaster();
		obj.setLstBloodTypeMaster(lstBloodTypeMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/getAllBloodBagMaster", method = RequestMethod.GET)
	public @ResponseBody
	BloodBagMaster getAllBloodBagMaster(HttpServletRequest request) {
		log.info("In BloodItemMasterController getAllBloodItemMaster()");
		List<BloodBagMaster> lstBloodBagMaster = new ArrayList<BloodBagMaster>();
		lstBloodBagMaster = donorCheckupListService.getAllBloodBagMaster(request);
		BloodBagMaster obj = new BloodBagMaster();
		obj.setLstBloodBagMaster(lstBloodBagMaster);
		log.debug("Response----> "+obj);
		return obj;
	}

	@RequestMapping(value = "/getAllBloodDonorsCheckupList", method = RequestMethod.GET)
	public @ResponseBody
	DonorCheckupList getAllBloodDonorsCheckupList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		log.info("In BloodItemMasterController getAllBloodDonorsCheckupList()");
		List<DonorCheckupList> lstBloodTypeMaster = new ArrayList<DonorCheckupList>();
		lstBloodTypeMaster = donorCheckupListService.getAllBloodDonorsCheckupList(unitId,request);
		DonorCheckupList obj = new DonorCheckupList();
		obj.setLstDonorCheckupList(lstBloodTypeMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/editBloodDonorCheckupList", method = RequestMethod.GET)
	@ResponseBody
	public DonorCheckupList editBloodDonorCheckupList(@RequestParam("id") Integer DonorId,HttpServletRequest request) {
		DonorCheckupList obj=new DonorCheckupList();
		obj = donorCheckupListService.editBloodDonorCheckupList(DonorId,request);
		return obj;
	}
	
	@RequestMapping(value = "/getDonorByIdCheckup", method = RequestMethod.GET)
	@ResponseBody
	public DonorCheckupList getDonorByIdCheckup(@RequestParam("id") Integer DonorId,HttpServletRequest request) {
		DonorCheckupList obj=new DonorCheckupList();
		obj = donorCheckupListService.getDonorByIdCheckup(DonorId,request);
		return obj;
	}
	
	@RequestMapping(value = "/getAllSampleDispatchList", method = RequestMethod.GET)
	@ResponseBody
	public DonorSampleDispatch getAllSampleDispatchList(HttpServletRequest request,@RequestParam("fromDate") String fromDate,@RequestParam("lastDate") String lastDate) {
	
		List<DonorSampleDispatch> listdonorSampleDispatch = new ArrayList<DonorSampleDispatch>();
		DonorSampleDispatch obj = new DonorSampleDispatch();
		listdonorSampleDispatch = donorCheckupListService.getAllSampleDispatchList(request,fromDate,lastDate);
		
		System.out.println("list :  " + listdonorSampleDispatch);
		
		obj.setDonorSampleDispatchList(listdonorSampleDispatch);
		log.debug("Response----> " + obj);
		return obj;
	}

	

}
