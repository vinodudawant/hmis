package com.hms.pharmacy.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.ecogreenapi.EcogreenItemMasterDto;
import com.hms.pharmacy.service.EcogreenApiService;

@Controller
@RequestMapping("/ecogreen/api/")
public class EcogreenApiController {
	@Autowired
	EcogreenApiService service;

	@RequestMapping(value = "/getItemList/{masterId}")
	@ResponseBody
	EcogreenItemMasterDto getItemList(@PathVariable("masterId") int masterId){
		    
		return service.getItemList(masterId);
	}
	
	@RequestMapping(value = "/saveProductMasterData", method = RequestMethod.POST)
	@ResponseBody	
	public int saveProductMasterData(@RequestParam("lstProd") String lstProd, HttpServletRequest request) {
		String msg = "";
		
		int response = service.saveProductMasterData(lstProd);
		
		return response;
	}
}
