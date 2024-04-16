package com.hms.canteen.controller;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.canteen.dto.CanteenDietView;
import com.hms.canteen.dto.CanteenMaster;
import com.hms.canteen.dto.CanteenPurDto;
import com.hms.canteen.dto.CanteenPurchaseM;
import com.hms.canteen.dto.CustomizeTemplateDto;
import com.hms.canteen.dto.DietMaster;
import com.hms.canteen.dto.PatientDueDto;
import com.hms.canteen.service.CanteenService;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.patient.util.ConfigUIJSONUtility;


@Controller
@RequestMapping(value = "/canteen")
public class CanteenController {

	
	@Autowired
	CanteenService  canteenService;
	/****
	 * @Code      :For CANTEEN Management System
	 * *****/
	@RequestMapping(value = "/cateenhomepage", method = RequestMethod.GET)
	public ModelAndView getSaleReportWithGStwhole(HttpServletRequest request,
			HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("ehat_canteen_bill");
		return modelAndView;
	}
	
	/********
	 * @Code       :For saving CANTEEN details  
	 * **********/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrUpdateCanteen(
			HttpServletRequest request,
			
			@RequestParam("canteenmaster") String canteenmasterlist) {
		
		String list[]= request.getParameterValues("slavelist");
		String str = list[0].substring(0, list[0].length());
		str=str.replaceAll("null","1");
		
		CanteenMaster canteenmaster = (CanteenMaster) ConfigUIJSONUtility
				.getObjectFromJSON(canteenmasterlist, CanteenMaster.class);
		
		
		
		int response = canteenService.saveOrUpdateCanteen(canteenmaster.getLstmaster().get(0),
				request);

		
		
		return response;
	}
	
	/********
	 * @Code       :For getting list of CANTEEN 
	 * **********/
	@RequestMapping(value = "/getlist", method = RequestMethod.GET)
	public @ResponseBody
	CanteenMaster getlist() {
		List<CanteenMaster> lstmaster = new ArrayList<CanteenMaster>();
		lstmaster = canteenService.getlist();
		CanteenMaster obj = new CanteenMaster();
		obj.setLstmaster(lstmaster);
		return obj;
	}
	
	/********
	 * @Code       :For getting list by id of CANTEEN  
	 * **********/
	@RequestMapping(value = "/getlistbyId", method = RequestMethod.GET)
	public @ResponseBody
	CanteenMaster getlistbyId(@RequestParam("canteenId") int canteenId) {
		List<CanteenMaster> lstmaster = new ArrayList<CanteenMaster>();
		lstmaster = canteenService.getlistbyId(canteenId);
		CanteenMaster obj = new CanteenMaster();
		obj.setLstmaster(lstmaster);
		return obj;
	}
	
	/********
	 * @Code       :For getting data for report
	 * **********/
	@RequestMapping(value = "/getlistbyforreport", method = RequestMethod.GET)
	public @ResponseBody
	CanteenMaster getlistbyforreport(@RequestParam("from") Date fromDate,
			@RequestParam("to") Date toDate,
			@RequestParam("subId") int subId) {
		List<CanteenMaster> lstmaster = new ArrayList<CanteenMaster>();
		lstmaster = canteenService.getlistbyforreport(fromDate,toDate,subId);
		CanteenMaster obj = new CanteenMaster();
		obj.setLstmaster(lstmaster);
		return obj;
	}
	/********
	 * @Code       :For deleting the records 
	 * **********/
	@RequestMapping(value = "/deletebyId", method = RequestMethod.POST)
	public @ResponseBody
	String deletebyId(@RequestParam("canteenId") int canteenId,
			HttpServletRequest request) {

		int response = canteenService.deletebyId(canteenId, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	/********
	 * @Code       :For customer list
	 * **********/
	@RequestMapping(value = "/getcustomerlist", method = RequestMethod.GET)
	public @ResponseBody
	CanteenMaster getcustomerlist(@RequestParam("findingName") String letter) {
		List<CanteenMaster> lstmaster = new ArrayList<CanteenMaster>();
		lstmaster = canteenService.getcustomerlist(letter);
		CanteenMaster obj = new CanteenMaster();
		obj.setLstmaster(lstmaster);
		return obj;

	}
	/********
	 * @Code       :For auto complete 
	 * **********/
	@RequestMapping(value = "/getlistbyletter", method = RequestMethod.GET)
	public @ResponseBody
	CanteenMaster getlistbyletter(@RequestParam("findingName") int letter) {
		List<CanteenMaster> lstmaster = new ArrayList<CanteenMaster>();
		lstmaster = canteenService.getlistbyletter(letter);
		CanteenMaster obj = new CanteenMaster();
		obj.setLstmaster(lstmaster);
		return obj;

	}
	
	/********
	 * @Code       :For saving diet
	 * **********/
	@RequestMapping(value = "/savediet", method = RequestMethod.POST)
	@ResponseBody
	public String savediet(
			HttpServletRequest request,
			@RequestParam("dietlist") String dietlist) {
		
		DietMaster dietMaster = (DietMaster) ConfigUIJSONUtility
				.getObjectFromJSON(dietlist, DietMaster.class);
		
		int response = canteenService.savediet(dietMaster.getLstDietMaster().get(0),
				request);

		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Name Allready exist"
						: "Network Error!!!"));
	}
	
	/********
	 * @Code       :For getting list of CANTEEN 
	 * **********/
	@RequestMapping(value = "/getdietlist", method = RequestMethod.GET)
	public @ResponseBody
	DietMaster getdietlist(@RequestParam("treatmentId") int treatmentId,
			@RequestParam("patientId") int patientId,@RequestParam("deptId") int deptId) {
		List<DietMaster> lstmaster = new ArrayList<DietMaster>();
		lstmaster = canteenService.getdietlist(treatmentId,patientId,deptId);
		DietMaster obj = new DietMaster();
		obj.setLstDietMaster(lstmaster);
		return obj;
	}

	/********
	 * @Code       :For getting list of CANTEEN 
	 * **********/
	@RequestMapping(value = "/getdietlistbyid", method = RequestMethod.GET)
	public @ResponseBody
	DietMaster getdietlistbyid(@RequestParam("dietId") int dietId) {
		List<DietMaster> lstmaster = new ArrayList<DietMaster>();
		lstmaster = canteenService.getdietlistbyid(dietId);
		DietMaster obj = new DietMaster();
		obj.setLstDietMaster(lstmaster);
		return obj;
	}
	/********
	 * @Code       :For getting list of CANTEEN 
	 * **********/
	@RequestMapping(value = "/getDietDataByDate", method = RequestMethod.GET)
	public @ResponseBody
	CanteenDietView getDietDataByDate(@RequestParam("callForm") String callForm) {
		List<CanteenDietView> lstmaster = new ArrayList<CanteenDietView>();
		lstmaster = canteenService.getDietDataByDate(callForm);
		CanteenDietView obj = new CanteenDietView();
		obj.setLstDietMaster(lstmaster);
		return obj;
	}
	
	
	/********
	 * @Code       :For getting list of customize template 
	 * **********/
	@RequestMapping(value = "/getcustomizelist", method = RequestMethod.GET)
	public @ResponseBody
	CustomizeTemplateDto getcustomizelist() {
		List<CustomizeTemplateDto> lstmaster = new ArrayList<CustomizeTemplateDto>();
		lstmaster = canteenService.getcustomizelist();
		CustomizeTemplateDto obj = new CustomizeTemplateDto();
		obj.setLts(lstmaster);
		return obj;
	}
	/********
	 * @Code       :For getting list of customize template 
	 * **********/
	@RequestMapping(value = "/getcustomizelistByid", method = RequestMethod.GET)
	public @ResponseBody
	CustomizeTemplateDto getcustomizelistByid(@RequestParam("templateId") int templateId) {
		List<CustomizeTemplateDto> lstmaster = new ArrayList<CustomizeTemplateDto>();
		lstmaster = canteenService.getcustomizelistByid(templateId);
		CustomizeTemplateDto obj = new CustomizeTemplateDto();
		obj.setLts(lstmaster);
		return obj;
	}
	
	/********
	 * @Code       :For deleting the records of diet
	 * **********/
	@RequestMapping(value = "/deletedietbyId", method = RequestMethod.POST)
	public @ResponseBody
	String deletedietbyId(@RequestParam("dietId") int dietId,
			HttpServletRequest request) {

		int response = canteenService.deletedietbyId(dietId, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	/********
	 * @Code       :For save patient dues 
	 * **********/
	@RequestMapping(value = "/savedue", method = RequestMethod.POST)
	@ResponseBody
	public String savePatientDue(
			HttpServletRequest request,
			@RequestParam("duemaster") String duemaster) {

		int response = canteenService.savePatientDue(duemaster,
				request);

		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						
						: "Network Error!!!");
	}
	
	/********
	 * @Code       :For getting list of Patient due 
	 * **********/
	@RequestMapping(value = "/getpatientduelist", method = RequestMethod.GET)
	public @ResponseBody
	PatientDueDto getpatientduelist() {
		List<PatientDueDto> lstmaster = new ArrayList<PatientDueDto>();
		lstmaster = canteenService.getpatientduelist();
		PatientDueDto obj = new PatientDueDto();
		obj.setLstdue(lstmaster);
		return obj;
	}

	/********
	 * @Code       :For saving CANTEEN details  
	 * **********/
	@RequestMapping(value = "/savepurchase", method = RequestMethod.POST)
	@ResponseBody
	public String savepurchase(
			HttpServletRequest request,
			@RequestParam("itemlist") String itemlist) {

		CanteenPurchaseM master = (CanteenPurchaseM) ConfigUIJSONUtility
				.getObjectFromJSON(itemlist, CanteenPurchaseM.class);

		int response = canteenService.savepurchase(
				master.getLstmaster().get(0), request);
	
		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Name Allready exist"
						: "Network Error!!!"));
		
	}
	
	/********
	 * @Code       :For getting list of CANTEEN purchase master
	 * **********/
	@RequestMapping(value = "/getlistpurchasem", method = RequestMethod.GET)
	public @ResponseBody
	CanteenPurchaseM getlistpurchasem() {
		List<CanteenPurchaseM> lstmaster = new ArrayList<CanteenPurchaseM>();
		lstmaster = canteenService.getlistpurchasem();
		CanteenPurchaseM obj = new CanteenPurchaseM();
		obj.setLstmaster(lstmaster);
		return obj;
	}
	/********
	 * @Code       :For deleting purchase master 
	 * **********/
	@RequestMapping(value = "/deletepurchase", method = RequestMethod.POST)
	public @ResponseBody
	String deletepurchase(@RequestParam("subId") Integer subId,
			HttpServletRequest request) {

		boolean response = canteenService.deletepurchase(subId, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	/********
	 * @Code       :For getting list of CANTEEN purchase master 
	 * **********/
	@RequestMapping(value = "/getAllcategory", method = RequestMethod.GET)
	public @ResponseBody
	CanteenPurchaseM getAllcategory() {
		List<CanteenPurchaseM> lstmaster = new ArrayList<CanteenPurchaseM>();
		lstmaster = canteenService.getAllcategory();
		CanteenPurchaseM obj = new CanteenPurchaseM();
		obj.setLstmaster(lstmaster);
		return obj;
	}
	
	/********
	 * @Code       :For getting list of CANTEEN purchase master 
	 * **********/
	@RequestMapping(value = "/getpurBySelfId", method = RequestMethod.GET)
	public @ResponseBody
	CanteenPurchaseM getpurBySelfId(@RequestParam("selfId") int selfId) {
		List<CanteenPurchaseM> lstmaster = new ArrayList<CanteenPurchaseM>();
		lstmaster = canteenService.getpurBySelfId(selfId);
		CanteenPurchaseM obj = new CanteenPurchaseM();
		obj.setLstmaster(lstmaster);
		return obj;
	}

	/********
	 * @Code       :For getting list of CANTEEN purchase master super category  
	 * **********/
	@RequestMapping(value = "/fetchSuperCatogoires", method = RequestMethod.GET)
	public @ResponseBody
	CanteenPurchaseM fetchSuperCatogoires(@RequestParam("purId") int purId) {
		List<CanteenPurchaseM> lts = new ArrayList<CanteenPurchaseM>();
		lts = canteenService.fetchSuperCatogoires(purId);
		CanteenPurchaseM obj = new CanteenPurchaseM();
		obj.setLstmaster(lts);
		return obj;
	}
	
	/********
	 * @Code       :For getting list of CANTEEN purchase master 
	 * **********/
	@RequestMapping(value = "/getbyleter", method = RequestMethod.GET)
	public @ResponseBody
	CanteenPurchaseM getbyleter(@RequestParam("findingName") String findingName) {
		List<CanteenPurchaseM> lstmaster = new ArrayList<CanteenPurchaseM>();
		lstmaster = canteenService.getbyleter(findingName);
		CanteenPurchaseM obj = new CanteenPurchaseM();
		obj.setLstmaster(lstmaster);
		return obj;
	}
	
	/********
	 * @Code       :For getting list of CANTEEN purchase master 
	 * **********/
	@RequestMapping(value = "/getitemByLetter", method = RequestMethod.GET)
	public @ResponseBody
	CanteenPurchaseM getitemByLetter(@RequestParam("findingName") String findingName) {
		List<CanteenPurchaseM> lstmaster = new ArrayList<CanteenPurchaseM>();
		lstmaster = canteenService.getitemByLetter(findingName);
		CanteenPurchaseM obj = new CanteenPurchaseM();
		obj.setLstmaster(lstmaster);
		return obj;
	}
	

	/********
	 * @Code       :For saving CANTEEN details  
	 * **********/
	@RequestMapping(value = "/savepur", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdatepur(
			HttpServletRequest request,
			@RequestParam("canteenmaster") String purlist) {
	
		CanteenPurDto canteenmaster = (CanteenPurDto) ConfigUIJSONUtility
				.getObjectFromJSON(purlist, CanteenPurDto.class);
		
		int response = canteenService.saveOrUpdatepur(canteenmaster.getLstmaster().get(0),
				request);

		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: "Network Error!!!");
	}

	/********
	 * @Code       :For getting list of CANTEEN 
	 * **********/
	@RequestMapping(value = "/getpurlist", method = RequestMethod.GET)
	public @ResponseBody
	CanteenPurDto getpurlist() {
		List<CanteenPurDto> lstmaster = new ArrayList<CanteenPurDto>();
		lstmaster = canteenService.getpurlist();
		CanteenPurDto obj = new CanteenPurDto();
		obj.setLstmaster(lstmaster);
		return obj;
	}
	
	/********
	 * @Code       :For getting list by id of CANTEEN  
	 * **********/
	@RequestMapping(value = "/getpurlistbyId", method = RequestMethod.GET)
	public @ResponseBody
	CanteenPurDto getpurlistbyId(@RequestParam("purchId") int purchId) {
		List<CanteenPurDto> lstmaster = new ArrayList<CanteenPurDto>();
		lstmaster = canteenService.getpurlistbyId(purchId);
		CanteenPurDto obj = new CanteenPurDto();
		obj.setLstmaster(lstmaster);
		return obj;
	}
	
	/********
	 * @Code       :For deleting the records 
	 * **********/
	@RequestMapping(value = "/deletepurbyId", method = RequestMethod.POST)
	public @ResponseBody
	String deletepurbyId(@RequestParam("purId") int purId,
			HttpServletRequest request) {

		int response = canteenService.deletepurbyId(purId, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	
	/********
	 * @Code       :For getting data for report
	 * **********/
	@RequestMapping(value = "/getlistforpurchasereport", method = RequestMethod.GET)
	public @ResponseBody
	CanteenPurDto getlistforpurchasereport(@RequestParam("from") Date fromDate,
			@RequestParam("to") Date toDate,
			@RequestParam("subId") int subId) {
		List<CanteenPurDto> lstmaster = new ArrayList<CanteenPurDto>();
		lstmaster = canteenService.getlistforpurchasereport(fromDate,toDate,subId);
		CanteenPurDto obj = new CanteenPurDto();
		obj.setLstmaster(lstmaster);
		return obj;
	}
	
	/********
	 * @Code       :For auto complete 
	 * **********/
	@RequestMapping(value = "/getlistbyletterPur", method = RequestMethod.GET)
	public @ResponseBody
	CanteenPurDto getlistbyletterPur(@RequestParam("findingName") int letter) {
		List<CanteenPurDto> lstmaster = new ArrayList<CanteenPurDto>();
		lstmaster = canteenService.getlistbyletterPur(letter);
		CanteenPurDto obj = new CanteenPurDto();
		obj.setLstmaster(lstmaster);
		return obj;

	}
	
	/******
	 * @Code      :fetch diet template list 
	 * ******/

	@RequestMapping(value = "/searchByTemplateName", method = RequestMethod.GET)
	public @ResponseBody
	CanteenDietView searchByTemplateName(@RequestParam("findingName") int letter,@RequestParam("fromDate")String fromdate,
			@RequestParam("toDate")String todate) {
		List<CanteenDietView> lstmaster = new ArrayList<CanteenDietView>();
		lstmaster = canteenService.searchByTemplateName(letter,fromdate,todate);
		CanteenDietView obj = new CanteenDietView();
		obj.setLstDietMaster(lstmaster);
		return obj;
	}
	
	
	@RequestMapping(value = "/searchByDateWiseDietList", method = RequestMethod.GET)
	public @ResponseBody
	CanteenDietView searchByDateWiseDietList(@RequestParam("fromdate")String fromdate,
			@RequestParam("todate")String todate,@RequestParam("templateId") int templateId) {
		List<CanteenDietView> lstmaster = new ArrayList<CanteenDietView>();
		lstmaster = canteenService.searchByDateWiseDietList(fromdate,todate,templateId);
		CanteenDietView obj = new CanteenDietView();
		obj.setLstDietMaster(lstmaster);
		return obj;
	}
	
	@RequestMapping(value = "/getDailyDietReportdata", method = RequestMethod.GET)
	public @ResponseBody
	CanteenDietView getDailyDietReportdata(@RequestParam("from") Date fromDate,
			@RequestParam("to") Date toDate) {
		List<CanteenDietView> lstmaster = new ArrayList<CanteenDietView>();
		lstmaster = canteenService.getDailyDietReportdata(fromDate,toDate);
		CanteenDietView obj = new CanteenDietView();
		obj.setLstDietMaster(lstmaster);
		return obj;
	}
	
}
