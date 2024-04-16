package com.hms.organdonation.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.Doctor;
import com.hms.dto.FetchTitleDTO;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.organdonation.service.OrganDonorCheckupListService;

@Controller
@ControllerAdvice
@RequestMapping(value = "/organDonorCheckupList")
public class OrganDonorCheckupListController {

	static Logger log = Logger.getLogger(OrganDonorCheckupListController.class
			.getName());

	@Autowired
	private OrganDonorCheckupListService organDonorCheckupListService;

	@Autowired
	private OrganDonorCheckupListDto organDonorCheckupListDto;
	
	@Autowired
	OrganDonationRegistrationDto organDonationRegistrationDto;

	@RequestMapping(value = "/saveOrganDonorCheckupList", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganDonorCheckupList(OrganDonorCheckupListDto obj,
			@RequestParam("organDonorId") Integer organDonorId,@RequestParam("treatmentId") Integer treatmentId,
			HttpServletRequest request) {
		int status = organDonorCheckupListService.saveOrganDonorCheckupList(
				obj, organDonorId, treatmentId, request);
		return status;
	}

	@RequestMapping(value = "/getAllOrganDonorCheckupList", method = RequestMethod.GET)
	public @ResponseBody
	OrganDonorCheckupListDto getAllOrganDonorCheckupList(HttpServletRequest request,@RequestParam("fromDate") String fromDate,@RequestParam("lastDate") String lastDate) {
		log.info("In OrganDonorCheckupListController getAllOrganDonorCheckupList()");
		List<OrganDonorCheckupListDto> lstOrganDonorCheckupListDto = new ArrayList<OrganDonorCheckupListDto>();
		OrganDonorCheckupListDto obj = new OrganDonorCheckupListDto();
		lstOrganDonorCheckupListDto = organDonorCheckupListService.getAllOrganDonorCheckupList(request,fromDate,lastDate);
		System.out.println("this is checkuplist ::  " + lstOrganDonorCheckupListDto);
		obj.setLstOrganDonorCheckupListDto(lstOrganDonorCheckupListDto);
		log.debug("Response----> " + obj);
		return obj;
	}

	@RequestMapping(value = "/editOrganDonorCheckupList", method = RequestMethod.GET)
	public @ResponseBody
	OrganDonorCheckupListDto editOrganDonorCheckupList(
			@RequestParam("checkupListId") Integer checkupListId) {
		log.info("In OrganDonorCheckupListController editDonorTypeMaster()");
		OrganDonorCheckupListDto obj=new OrganDonorCheckupListDto();
		obj = organDonorCheckupListService
				.editOrganDonorCheckupList(checkupListId);
		log.error("Response-----> " + obj);
		return obj;
	}

	@RequestMapping(value = "/deleteOrganDonorCheckupList", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganDonorCheckupList(
			@RequestParam("checkupListId") Integer checkupListId,@RequestParam("donarTreatmentId") Integer donarTreatmentId,
			HttpServletRequest request) {
		log.info("In OrganDonorCheckupListController deleteOrganDonorCheckupList()");
		System.out.println("checkupListId :" + checkupListId);
		boolean response = organDonorCheckupListService
				.deleteOrganDonorCheckupList(checkupListId,donarTreatmentId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	
	@RequestMapping(value = "/organDonorCheckupListAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	OrganDonorCheckupListDto organDonorCheckupListAutoSuggestion(@RequestParam("checkupListId") Integer checklistId, @RequestParam("callFrom") String callFrom) {
		log.info("In OrganDonorCheckupListController organDonorCheckupListAutoSuggestion()");
		List<OrganDonorCheckupListDto> lstOrganDonorCheckupListDto = new ArrayList<OrganDonorCheckupListDto>();
		OrganDonorCheckupListDto obj = new OrganDonorCheckupListDto();
		lstOrganDonorCheckupListDto = organDonorCheckupListService.organDonorCheckupListAutoSuggestion(checklistId,callFrom);
		obj.setLstOrganDonorCheckupListDto(lstOrganDonorCheckupListDto);
		log.debug("Response----> "+organDonorCheckupListDto);
		return obj;
	}
	
	

	@RequestMapping(value = "/getAllTitle", method = RequestMethod.GET)
	public @ResponseBody
	List<FetchTitleDTO> getAllTitle(HttpServletRequest request) {
		List<FetchTitleDTO> lstFetchTitleDTO = new ArrayList<FetchTitleDTO>();
		lstFetchTitleDTO = organDonorCheckupListService.getAllTitle(request);
		return lstFetchTitleDTO;
	}

	@RequestMapping(value = "/getAllDoctors", method = RequestMethod.GET)
	public @ResponseBody
	List<Doctor> getAllDoctors(HttpServletRequest request) {
		List<Doctor> lstDoctor = new ArrayList<Doctor>();
		lstDoctor = organDonorCheckupListService.getAllDoctors(request);
		return lstDoctor;
	}
	
	
	@RequestMapping(value = "/getOrganDonorById", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonationRegistrationDto getOrganDonorById(@RequestParam("id") Integer organDonorId,HttpServletRequest request) {
		
		System.out.println("OrganDonorCheckupListController : getOrganDonorById() for organDonorId : " + organDonorId);
		
		OrganDonationRegistrationDto obj=new OrganDonationRegistrationDto();
		obj = organDonorCheckupListService.getOrganDonorById(organDonorId,request);
		
		System.out.println("OrganDonorCheckupListController : OrganDonationRegistrationDto OBJECT : " + obj);
		return obj;
	}
	
	@RequestMapping(value = "/getOrganDonorByIdAndPatientIdTreatmentId", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonorTreatmentDto getOrganDonorByIdAndPatientId(@RequestParam("organDonorId") Integer organDonorId,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {
		OrganDonorTreatmentDto obj=new OrganDonorTreatmentDto();
		obj = organDonorCheckupListService.getOrganDonorByIdAndPatientId(organDonorId,patientId,treatmentId,request);
		return obj;
	}
	
	@RequestMapping(value = "/getOrgansAgainstCheckupList", method = RequestMethod.GET)
	@ResponseBody
	public IntendOrganDonorMasterDto getOrgansAgainstCheckupList(@RequestParam("checkupListId") Integer checkupListId, HttpServletRequest request) {
		
	//	String organIds = organDonorCheckupListService.getOrgansAgainstCheckupList(checkupListId, request); 
		
		List<IntendOrganDonorMasterDto> listIntendOrganDonorMasterDto = new ArrayList<IntendOrganDonorMasterDto>();
		listIntendOrganDonorMasterDto = organDonorCheckupListService.getOrgansAgainstCheckupList(checkupListId, request);
		IntendOrganDonorMasterDto organsDTO = new IntendOrganDonorMasterDto();
		organsDTO.setLstIntendOrganDonorMasterDto(listIntendOrganDonorMasterDto);
		return organsDTO;
	}
}
