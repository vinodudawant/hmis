package com.hms.pathology.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.SponsorCustomTestNameDTO;
import com.hms.ehat.dto.SponsorCustomWardNameDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.pathology.service.SponsorCustomTestNameService;

@Controller
@RequestMapping("/sponsorcustomtest")
public class SponsorCustomTestNameController {
	@Autowired
	SponsorCustomTestNameService service;
	
	@RequestMapping(value ="/getTestDetailsByServiceId",method = RequestMethod.POST)
	@ResponseBody
	public SponsorCustomTestNameDTO getTestDetailsByServiceId(@RequestParam("sponsorId") int sponsorId,@RequestParam("serviceId") int serviceId ) {
		
		SponsorCustomTestNameDTO obj=new SponsorCustomTestNameDTO();
		   
		List<SponsorCustomTestNameDTO> list = service.getTestDetailsByServiceId(sponsorId, serviceId);
		obj.setLstSponsorCustomTestName(list);
		
		return obj;
	}
	
	@RequestMapping(value ="/saveSponsorCustomTestName",method = RequestMethod.POST)
	@ResponseBody
	public int saveSponsorCustomTestName(@RequestParam("testDetails") String testDetails) {
		
		return service.saveSponsorCustomTestName(testDetails);
	}
	
	@RequestMapping(value ="/getSubservicelistById",method = RequestMethod.POST)
	@ResponseBody
	public SubServiceDto getSubservicelistById(@RequestParam("searchText") String  searchText,@RequestParam("serviceId") int serviceId ) {
		
		SubServiceDto obj=new SubServiceDto();
		   
		 List<SubServiceDto> list = service.getSubservicelistById(serviceId, searchText);
		obj.setLstSubService(list);
		
		return obj;
	}
	
	@RequestMapping(value ="/getTestDetailsBySubServiceId",method = RequestMethod.POST)
	@ResponseBody
	public SponsorCustomTestNameDTO getTestDetailsBySubServiceId(@RequestParam("sponsorId") int  sponsorId,@RequestParam("serviceId") int serviceId,@RequestParam("subServiceId") int subServiceId ) {
		
		SponsorCustomTestNameDTO obj=new SponsorCustomTestNameDTO();
		   
		 List<SponsorCustomTestNameDTO> list = service.getTestDetailsBySubServiceId(sponsorId, serviceId, subServiceId);
		obj.setLstSponsorCustomTestName(list);
		
		return obj;
	}
	
	@RequestMapping(value ="/getWardDetailsBySponsorId",method = RequestMethod.POST)
	@ResponseBody
	public SponsorCustomWardNameDTO getWardDetailsBySponsorId(@RequestParam("sponsorId") int sponsorId ) {
		
		SponsorCustomWardNameDTO obj=new SponsorCustomWardNameDTO();
		   
		List<SponsorCustomWardNameDTO> list = service.getWardDetailsBySponsorId(sponsorId);
		obj.setLstSponsorCustomWardName(list);
		
		return obj;
	}

	
	@RequestMapping(value ="/saveSponsorCustomWardName",method = RequestMethod.POST)
	@ResponseBody
	public int saveSponsorCustomWardName(@RequestParam("wardDeatisls") String wardDeatisls) {
		
		return service.saveSponsorCustomWardName(wardDeatisls);
	}
	
	@RequestMapping(value ="/getWardListAutoSuggestion",method = RequestMethod.POST)
	@ResponseBody
	public ChargesMasterSlave getWardListAutoSuggestion(@RequestParam("searchText") String  searchText ) {
		
		ChargesMasterSlave obj=new ChargesMasterSlave();
		   
		 List<ChargesMasterSlave> list = service.getWardListAutoSuggestion(searchText);
		obj.setLstChargesSlave(list);
		
		return obj;
	}
	
	@RequestMapping(value ="/getWardDetailsBysponsorIdandChargeId",method = RequestMethod.POST)
	@ResponseBody
	public SponsorCustomWardNameDTO getWardDetailsBysponsorIdandChargeId(@RequestParam("sponsorId") int  sponsorId,@RequestParam("chargeId") int chargeId ) {
		
		SponsorCustomWardNameDTO obj=new SponsorCustomWardNameDTO();
		   
		 List<SponsorCustomWardNameDTO> list = service.getWardDetailsBysponsorIdandChargeId(sponsorId, chargeId);
		obj.setLstSponsorCustomWardName(list);
		
		return obj;
	}
}
