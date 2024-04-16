package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.DischargeAllPatientsDto;
import com.hms.ehat.dto.EhatIpdBillFinalEstimateDto;
import com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto;
import com.hms.ehat.dto.InventoryNewDto;
import com.hms.ehat.dto.PatientSubServiceDetailsForOpdPackage;
import com.hms.ehat.dto.SponsorSummaryDetailsDto;
import com.hms.ehat.dto.WardWiseDetaisDto;
import com.hms.ehat.service.InventoryNewService;

@Controller
@RequestMapping(value = "/InventoryNewController")
public class InventoryNewController {

	@Autowired InventoryNewService inventoryNewService;
	
	
	@RequestMapping(value = "/getDispachlist", method = RequestMethod.POST)
		public @ResponseBody
		InventoryNewDto getDispachlist(@RequestParam("callfrom") String callfrom,
				@RequestParam("callPartyName") String callPartyName,
				@RequestParam("startDate") String startDate,
				@RequestParam("endDate") String endDate,
				@RequestParam("letter") String letter,
				HttpServletRequest request) 
	{
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
		
			List<InventoryNewDto> listInventoryNewDto = new ArrayList<InventoryNewDto>();
			listInventoryNewDto = (List<InventoryNewDto>) inventoryNewService.getDispachlist(unitId,userId1,callfrom,
					callPartyName,startDate,endDate,letter);
			
			InventoryNewDto obj=new InventoryNewDto();
			obj.setListInventoryNewDto(listInventoryNewDto);
				
			return obj;
			
		}
	
	@RequestMapping(value = "/saveDispachlist", method = RequestMethod.POST)
	@ResponseBody
	public String saveDispachlist(@RequestParam("docId") String docId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
		String msg = "";
		if (inventoryNewService.saveDispachlist(docId,unitId,userId1)==1) {
			msg = "Save Sucessfully!";
		}else{
			
			msg="Network Issues!";	
			
		}
		return msg;
	}
	
	
	//Fetching  data bye using date
	@RequestMapping(value = "/getPartyDetailsfromDate", method = RequestMethod.POST)
	public @ResponseBody
	InventoryNewDto getPartyDetailsfromDate(
			@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
		
		List<InventoryNewDto> listPartyDetailsfromDate = new ArrayList<InventoryNewDto>();
		listPartyDetailsfromDate = inventoryNewService
				.getPartyDetailsfromDate(startDate,endDate,unitId,userId1);
		InventoryNewDto obj = new InventoryNewDto();
		obj.setListInventoryNewDto(listPartyDetailsfromDate);
		return obj;

	}
	
	@RequestMapping(value = "/getPartyNameForSelectList", method = RequestMethod.POST)
	public @ResponseBody
	InventoryNewDto getPartyNameForSelectList(
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
		
		List<InventoryNewDto> listPartyDetailsfromDate = new ArrayList<InventoryNewDto>();
		listPartyDetailsfromDate = inventoryNewService
				.getPartyNameForSelectList(unitId,userId1);
		InventoryNewDto obj = new InventoryNewDto();
		obj.setListInventoryNewDto(listPartyDetailsfromDate);
		return obj;
	}
	
	@RequestMapping(value = "/getWardWisePatientsDetails", method = RequestMethod.POST)
	public @ResponseBody
	WardWiseDetaisDto getWardWisePatientsDetails(@RequestParam("hallId") Integer hallId,
			@RequestParam("hallSlaveId") Integer hallSlaveId,
			@RequestParam("docId") Integer docId,			
			@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate,
			@RequestParam("letter") String letter,
			HttpServletRequest request) 
{
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
	Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
	
		List<WardWiseDetaisDto> listWardWiseDetaisDto = new ArrayList<WardWiseDetaisDto>();
		listWardWiseDetaisDto = (List<WardWiseDetaisDto>) inventoryNewService.getWardWisePatientsDetails(unitId,userId1,
				hallId,hallSlaveId,docId,startDate,endDate,letter);
		
		WardWiseDetaisDto obj=new WardWiseDetaisDto();
		obj.setListWardWiseDetaisDto(listWardWiseDetaisDto);
			
		return obj;
		
	}
	
	@RequestMapping(value = "/getDischargePatientsDetails", method = RequestMethod.POST)
	public @ResponseBody
	DischargeAllPatientsDto getDischargePatientsDetails(@RequestParam("chargesId") Integer chargesId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			@RequestParam("typeOf") String typeOf,			
			@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate,
			@RequestParam("letter") String letter,
			HttpServletRequest request) 
{
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
	Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
	
		List<DischargeAllPatientsDto> listDischargeAllPatientsDto = new ArrayList<DischargeAllPatientsDto>();
		listDischargeAllPatientsDto = (List<DischargeAllPatientsDto>) inventoryNewService.getDischargePatientsDetails(unitId,userId1,
				chargesId,chargesSlaveId,typeOf,startDate,endDate,letter);
		
		DischargeAllPatientsDto obj=new DischargeAllPatientsDto();
		obj.setListDischargeAllPatientsDto(listDischargeAllPatientsDto);
			
		return obj;
		
	}
	
	
	@RequestMapping(value = "/getSponsorSummaryDetails", method = RequestMethod.POST)
	public @ResponseBody
	SponsorSummaryDetailsDto getSponsorSummaryDetails(@RequestParam("chargesId") Integer chargesId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			@RequestParam("typeOf") String typeOf,			
			@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate,
			@RequestParam("letter") String letter,
			HttpServletRequest request) 
{
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
	Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
	
		List<SponsorSummaryDetailsDto> listSponsorSummaryDetailsDto = new ArrayList<SponsorSummaryDetailsDto>();
		listSponsorSummaryDetailsDto = (List<SponsorSummaryDetailsDto>) inventoryNewService.getSponsorSummaryDetails(unitId,userId1,
				chargesId,chargesSlaveId,typeOf,startDate,endDate,letter);
		
		SponsorSummaryDetailsDto obj=new SponsorSummaryDetailsDto();
		obj.setListSponsorSummaryDetailsDto(listSponsorSummaryDetailsDto);
			
		return obj;
		
	}
	
	
	
	@RequestMapping(value = "/getIpdbillingEstimateReport", method = RequestMethod.POST)
	public @ResponseBody
	EhatIpdBillFinalEstimateDto getIpdbillingEstimateReport(
			@RequestParam("typeOf") String typeOf,			
			@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate,
			@RequestParam("letter") String letter,
			HttpServletRequest request) 
{
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
	Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
	
		List<EhatIpdBillFinalEstimateDto> listEhatIpdBillFinalEstimateDto = new ArrayList<EhatIpdBillFinalEstimateDto>();
		listEhatIpdBillFinalEstimateDto = (List<EhatIpdBillFinalEstimateDto>) inventoryNewService.getIpdbillingEstimateReport(
				typeOf,startDate,endDate,letter);
		
		EhatIpdBillFinalEstimateDto obj=new EhatIpdBillFinalEstimateDto();
		obj.setListEhatIpdBillFinalEstimateDto(listEhatIpdBillFinalEstimateDto);
			
		return obj;
		
	}
	
}
