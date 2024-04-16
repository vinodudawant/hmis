package com.hms.ipd.controller;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.inventory.dto.ItemMasterDto;
import com.hms.ipd.service.IpdInventoryService;

@Controller
@RequestMapping(value = "/ipdInventory")
public class IpdInventoryController {
	private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	@Autowired
	private IpdInventoryService ipdInventoryService;
	
	@ResponseBody
	@RequestMapping(value = "/getMaterailRequestNoteNextId", method = RequestMethod.GET)
	public Integer getMaterailRequestNoteNextId() {
		Integer id = ipdInventoryService.getMaterailRequestNoteNextId();
		return id;
	}
	
	 @RequestMapping(value = "/fetchItemNamesOnlyAutoSuggestForCssdItems", method = RequestMethod.GET) 
	  public @ResponseBody ItemMasterDto fetchItemNamesOnlyAutoSuggestForCssdItems(@RequestParam("findingName") String letter) {
		 
		  List<ItemMasterDto> lstmaster = new ArrayList<ItemMasterDto>(); 
		  lstmaster = ipdInventoryService.fetchItemNamesOnlyAutoSuggestForCssdItems(letter);
		  ItemMasterDto obj = new ItemMasterDto();
		  obj.setLstItemMaster(lstmaster); 
		  return obj;
	  
	  }
	 
	 @RequestMapping(value = "/getAvalQuantityCsd", method = RequestMethod.POST)
		public @ResponseBody
		Integer getAvalQuantityCsd(@RequestParam("itemName")String itemName,@RequestParam("deptName") String deptName, @RequestParam("itemCode") int itemCode ) {
			Integer id = ipdInventoryService.getAvalQuantityCsd(itemName,deptName,itemCode);
			return id;
		}
}
