package com.hms.laundry.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.inventory.dto.ItemMasterDto;
import com.hms.laundry.dto.LaundryLinenMasterDTO;
import com.hms.laundry.service.LaundryService;
import com.hms.patient.util.ConfigUIJSONUtility;


@Controller
@RequestMapping(value = "/laundry")
public class LaundryController {
	
	@Autowired
	LaundryService laundryService ;
	
	static Logger log=Logger.getLogger(LaundryController.class.getName());
	
	/**
	 *
	 * @Code :This method to get list
	 * @return
	 **/
	@RequestMapping(value = "/getlist", method = RequestMethod.GET)
	public @ResponseBody
	LaundryLinenMasterDTO getlist(@RequestParam("subDept")  String subDept) {
		log.info("In Laundry getlist()");
		List<LaundryLinenMasterDTO> lstmaster = new ArrayList<LaundryLinenMasterDTO>();
		lstmaster = laundryService.getlist(subDept);
		LaundryLinenMasterDTO obj = new LaundryLinenMasterDTO();
		obj.setListLL(lstmaster);
		return obj;
	}
	
	/**
	 *
	 * @Code :This method to get next auto increment
	 * @return
	 **/
	@RequestMapping(value = "/getNextAutoMaterialRequestNoteIdInLIstLaundry", method = RequestMethod.GET)
	public @ResponseBody
	Integer getNextAutoIncrement() {
		log.info("In Laundry getNextMaterialRequestNoteIdInLIstLaundry()");
		Integer id = laundryService.getNextMaterialRequestNoteIdInLIstLaundry();
		return id;
	}

	/**
	 *
	 * @Code :This method to fetch the item from inventory master
	 * @return
	 **/
	
	  @RequestMapping(value = "/fetchItemNamesOnlyAutoSuggestForLaundryItems", method = RequestMethod.GET) 
	  public @ResponseBody ItemMasterDto fetchItemNamesOnlyAutoSuggestForLaundryItems(@RequestParam("findingName") String letter) {
		  log.info("In Laundry fetchItemNamesOnlyAutoSuggestForLaundryItems()");
		  List<ItemMasterDto> lstmaster = new ArrayList<ItemMasterDto>(); 
		  lstmaster = laundryService.fetchItemNamesOnlyAutoSuggestForLaundryItems(letter);
		  ItemMasterDto obj = new ItemMasterDto();
		  obj.setLstItemMaster(lstmaster); 
		  return obj;
	  
	  }
	  /**
		 *
		 * @Code :This method to get total available quantity from inventory
		 * @return
		 **/
		@RequestMapping(value = "/getAvalQuantity", method = RequestMethod.POST)
		public @ResponseBody
		Integer getAvalQuantity(@RequestParam("itemName")String itemName,@RequestParam("deptName") String deptName, @RequestParam("itemCode") int itemCode ) {
			log.info("In Laundry getAvalQuantity()");
			Integer id = laundryService.getAvalQuantity(itemName,deptName,itemCode);
			return id;
		}
		
		  /**
		 *
		 * @Code :This method to get total available quantity from inventory
		 * @return
		 **/
		@RequestMapping(value = "/getBatchDetails", method = RequestMethod.POST)
		public @ResponseBody
		Integer getBatchDetails(@RequestParam("itemName")String itemName,@RequestParam("deptName") String deptName, @RequestParam("itemCode") int itemCode ) {
			log.info("In Laundry getBatchDetails()");
			Integer id = laundryService.getBatchDetails(itemName,deptName,itemCode);
			return id;
		}
		
		
	 
		 /**
		 *
		 * @Code :This method to save laundry Material Request list
		 * @return
		 **/
		@RequestMapping(value = "/save", method = RequestMethod.POST)
		@ResponseBody
		public int save(HttpServletRequest request,@RequestParam("materiallist") String materiallist) {
			log.info("In Laundry getAvalQuantity()");
			LaundryLinenMasterDTO landLmaster = (LaundryLinenMasterDTO) ConfigUIJSONUtility
					.getObjectFromJSON(materiallist, LaundryLinenMasterDTO.class);

			int response = laundryService.save(landLmaster
					.getListLL().get(0), request);

			return response;
		}
		
		/**
		 *
		 * @Code :This method To get reuqest List for laundary Department
		 * @return
		 **/
		@RequestMapping(value = "/getlistForLNLDept", method = RequestMethod.GET)
		public @ResponseBody
		LaundryLinenMasterDTO getlistForLnlDept() {
			log.info("In Laundry getlistForLNLDept()");
			List<LaundryLinenMasterDTO> lstmaster = new ArrayList<LaundryLinenMasterDTO>();
			lstmaster = laundryService.getlistForLnlDept();
			LaundryLinenMasterDTO obj = new LaundryLinenMasterDTO();
			obj.setListLL(lstmaster);
			return obj;
		}
		
		/**
		 *
		 * @Code :This method To edit the Laundry details
		 * @return
		 **/
		
		@RequestMapping(value = "/getlistbyId", method = RequestMethod.GET)
		public @ResponseBody
		LaundryLinenMasterDTO getlistbyId(@RequestParam("mrnId") int mrnId) {
			log.info("In Laundry getlistbyId()");
			List<LaundryLinenMasterDTO> lstmaster = new ArrayList<LaundryLinenMasterDTO>();
			lstmaster = laundryService.getlistbyId(mrnId);
			LaundryLinenMasterDTO obj = new LaundryLinenMasterDTO();
			obj.setListLL(lstmaster);
			return obj;
		}
		
		/**
		 *
		 * @Code :This method To edit the Laundry details
		 * @return
		 **/
		@RequestMapping(value = "/approveReuest", method = RequestMethod.POST)
		@ResponseBody
		public int approveReuest(
				HttpServletRequest request,
				
		@RequestParam("materiallist") String materiallist) {
			log.info("In Laundry approveReuest()");
			LaundryLinenMasterDTO landLmaster = (LaundryLinenMasterDTO) ConfigUIJSONUtility
					.getObjectFromJSON(materiallist, LaundryLinenMasterDTO.class);

			int response = laundryService.approveReuest(landLmaster
					.getListLL().get(0), request);

			return response;
		}
		/**
		 *
		 * @Code :This method To delete the Laundry details
		 * @return
		 **/
		@RequestMapping(value = "/deletebyId", method = RequestMethod.POST)
		public @ResponseBody
		String deletebyId(@RequestParam("id") int id,
				HttpServletRequest request) {
			log.info("In Laundry deletebyId()");
			int response = laundryService.deletebyId(id, request);
			String msg = "";
			if (response == 1) {
				msg = "Records Deleted Sucessfully";
			} else {
				msg = "Oops Some Problem Ocured";
			}
			return msg;
		}
		/**
		 *
		 * @Code :This method To apporved item list
		 * @return
		 **/
		@RequestMapping(value = "/getlistForApprovedItems", method = RequestMethod.GET)
		public @ResponseBody
		LaundryLinenMasterDTO getlistForApprovedItems(@RequestParam("subDept")  String subDept) {
			log.info("In Laundry getlistForApprovedItems()");
			List<LaundryLinenMasterDTO> lstmaster = new ArrayList<LaundryLinenMasterDTO>();
			lstmaster = laundryService.getlistForApprovedItems(subDept);
			LaundryLinenMasterDTO obj = new LaundryLinenMasterDTO();
			obj.setListLL(lstmaster);
			return obj;
		}
		/**
		 *
		 * @Code :This method to get requested item list for dashboard
		 * @return
		 **/
		@RequestMapping(value = "/getlistForRequestedDashboard", method = RequestMethod.GET)
		public @ResponseBody
		LaundryLinenMasterDTO getlistForRequestedDashboard() {
			log.info("In Laundry getlistForRequestedDashboard()");
			List<LaundryLinenMasterDTO> lstmaster = new ArrayList<LaundryLinenMasterDTO>();
			lstmaster = laundryService.getlistForRequestedDashboard();
			LaundryLinenMasterDTO obj = new LaundryLinenMasterDTO();
			obj.setListLL(lstmaster);
			return obj;
		}
		/**
		 *
		 * @Code :This method to get processing item list for dashboard
		 * @return
		 **/
		@RequestMapping(value = "/getlistForProcessingDashboard", method = RequestMethod.GET)
		public @ResponseBody
		LaundryLinenMasterDTO getlistForProcessDashboard() {
			log.info("In Laundry getlistForProcessingDashboard()");
			List<LaundryLinenMasterDTO> lstmaster = new ArrayList<LaundryLinenMasterDTO>();
			lstmaster = laundryService.getlistForProcessDashboard();
			LaundryLinenMasterDTO obj = new LaundryLinenMasterDTO();
			obj.setListLL(lstmaster);
			return obj;
		}
		/**
		 *
		 * @Code :This method to get dispatched item list for dashboard
		 * @return
		 **/
		@RequestMapping(value = "/getlistForDispachedDashboard", method = RequestMethod.GET)
		public @ResponseBody
		LaundryLinenMasterDTO getlistForDispachedDashboard() {
			log.info("In Laundry getlistForDispachedDashboard()");
			List<LaundryLinenMasterDTO> lstmaster = new ArrayList<LaundryLinenMasterDTO>();
			lstmaster = laundryService.getlistForDispachedDashboard();
			LaundryLinenMasterDTO obj = new LaundryLinenMasterDTO();
			obj.setListLL(lstmaster);
			return obj;
		}
		/**
		 *
		 * @Code :This method to get completed item list for dashboard
		 * @return
		 **/
		@RequestMapping(value = "/getlistForCompletedDashboard", method = RequestMethod.GET)
		public @ResponseBody
		LaundryLinenMasterDTO getlistForCompletedDashboard() {
			log.info("In Laundry getlistForCompletedDashboard()");
			List<LaundryLinenMasterDTO> lstmaster = new ArrayList<LaundryLinenMasterDTO>();
			lstmaster = laundryService.getlistForCompletedDashboard();
			LaundryLinenMasterDTO obj = new LaundryLinenMasterDTO();
			obj.setListLL(lstmaster);
			return obj;
		}
		
		/**
		 *
		 * @Code :This method to get laundry report
		 * @return
		 **/
		@RequestMapping(value = "/getLnlReport", method = RequestMethod.GET)
		public @ResponseBody
		LaundryLinenMasterDTO getLnlReport(@RequestParam("startDate") String startDate,
				@RequestParam("endDate") String endDate) {
			log.info("In Laundry getLnlReport()");
			List<LaundryLinenMasterDTO> lstmaster = new ArrayList<LaundryLinenMasterDTO>();
			lstmaster = laundryService.getLnlReport(startDate,endDate);
			LaundryLinenMasterDTO obj = new LaundryLinenMasterDTO();
			obj.setListLL(lstmaster);
			return obj;
		}
		
		/**
		 *
		 * @Code :This method to save return request
		 * @return
		 **/
		
		@RequestMapping(value = "/saveReturnRequest", method = RequestMethod.POST)
		@ResponseBody
		public int saveReturnRequest(
				HttpServletRequest request,
				
		@RequestParam("materiallist") String materiallist) {
			log.info("In Laundry saveReturnRequest()");
			LaundryLinenMasterDTO landLmaster = (LaundryLinenMasterDTO) ConfigUIJSONUtility
					.getObjectFromJSON(materiallist, LaundryLinenMasterDTO.class);

			int response = laundryService.saveReturnRequest(landLmaster
					.getListLL().get(0), request);

			return response;
		}
		/**
		 *
		 * @Code :This method to get return items list
		 * @return
		 **/
		@RequestMapping(value = "/getlistbyDepName", method = RequestMethod.GET)
		public @ResponseBody
		LaundryLinenMasterDTO getlistbyDepName(@RequestParam("deptName") String deptName) {
			log.info("In Laundry getlistbyDepName()");
			List<LaundryLinenMasterDTO> lstmaster = new ArrayList<LaundryLinenMasterDTO>();
			lstmaster = laundryService.getlistbyDepName(deptName);
			LaundryLinenMasterDTO obj = new LaundryLinenMasterDTO();
			obj.setListLL(lstmaster);
			return obj;
		}
		
		/**
		 *
		 * @Code :This method to get accept items list
		 * @return
		 **/
		@RequestMapping(value = "/acceptItems", method = RequestMethod.POST)
		@ResponseBody
		public int acceptItems(HttpServletRequest request,@RequestParam("materiallist") String materiallist) {
			log.info("In Laundry acceptItems()");
			LaundryLinenMasterDTO landLmaster = (LaundryLinenMasterDTO) ConfigUIJSONUtility
					.getObjectFromJSON(materiallist, LaundryLinenMasterDTO.class);

			int response = laundryService.acceptItems(landLmaster
					.getListLL().get(0), request);

			return response;
		}
		
		
}
