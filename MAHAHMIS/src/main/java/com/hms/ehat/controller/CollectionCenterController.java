package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.CollectionCenterMasterDto;
//import com.hms.ehat.dto.StateMasterDto;
import com.hms.ehat.dto.UnitMasterDto;
import com.hms.ehat.service.CollectionCenterService;

@Controller
@RequestMapping(value ="/collection")
public class CollectionCenterController {

	@Autowired
	private CollectionCenterService collectionCenterService;
	
	@Autowired
	private CollectionCenterMasterDto collectionCenterMasterDto;
	
	/**
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllUnitMaster", method = RequestMethod.GET)
	public @ResponseBody
	UnitMasterDto getAllStateMaster(HttpServletRequest request) {
		List<UnitMasterDto> lstUnitMaster = new ArrayList<UnitMasterDto>();
		lstUnitMaster = collectionCenterService.getAllUnitMaster();
		UnitMasterDto obj = new UnitMasterDto();
		obj.setLstUnit(lstUnitMaster);
		return obj;
	}
	
	/**
	 * @author:- Rohit
	 * @since:- 10-01-2020
	 * @codeFor:- Below method is written for to save the collection center master details
	 * @return
	 */
	@RequestMapping(value="/saveCollectionCenterMasterDetails",method = RequestMethod.POST)
	@ResponseBody
	public int saveCollectionCenterMasterDetails(CollectionCenterMasterDto collectionCenterMasterDto,HttpServletRequest request)
	{
		int response = collectionCenterService.saveorUpdateCollectionCenterMaster(collectionCenterMasterDto, request);
		return response;
	}
	
	/**
	 * @author:- Rohit
	 * @since:- 10-01-2020
	 * @codeFor:- Below method is written for to get the all the records from collection center master table
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllCollectionCenterMasterRecords", method = RequestMethod.GET)
	public @ResponseBody
	CollectionCenterMasterDto getAllCollectionCenterMasterRecords(HttpServletRequest request) {
		List<CollectionCenterMasterDto> lstCollectionCenterMaster = new ArrayList<CollectionCenterMasterDto>();
		lstCollectionCenterMaster = collectionCenterService.getAllCollectionCenterMasterRecords(request);
		collectionCenterMasterDto.setLstCollectionCenterMaster(lstCollectionCenterMaster);
		return collectionCenterMasterDto;
	}
	
	/**
	* @author:- Rohit
	 * @since:- 10-01-2020
	 * @codeFor: This code is created for editing the collection center master details w.r.t to id
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/editCollectionCenterMaster", method = RequestMethod.GET)
	public @ResponseBody
	CollectionCenterMasterDto editCollectionCenterMaster(@RequestParam("id") Integer id) {
		collectionCenterMasterDto = collectionCenterService.editCollectionCenterMaster(id);	
		return collectionCenterMasterDto;
	}
	
	/**
	 * 
	 * @param id
	 * @param request
	 * @author:- Rohit
	 * @since:- 10-01-2020
	 * @codeFor This method is created for disable the records from collection center master table w.r.t id
	 * @return
	 */
	
	@RequestMapping(value = "/deleteCollectionCenterMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteCollectionCenterMaster(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = collectionCenterService.deleteCollectionCenterMaster(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		return msg;
	}
	
	/**
	 * @author:- Rohit
	 * @since:- 10-01-2020
	 * @param stateName
	 * @return
	 */
	@RequestMapping(value = "/collectionCenterAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	CollectionCenterMasterDto collectionCenterAutoSuggestion(@RequestParam("centerName")String centerName) {
		List<CollectionCenterMasterDto> lstCollectionCenterMaster = new ArrayList<CollectionCenterMasterDto>();
		lstCollectionCenterMaster = collectionCenterService.getAllCollectionCenterAutosuggestion(centerName);
		collectionCenterMasterDto.setLstCollectionCenterMaster(lstCollectionCenterMaster);
		return collectionCenterMasterDto;
	}
	
}
