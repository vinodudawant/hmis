package com.hms.organdonation.controller;

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

import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.dto.AdminStateDTO;
import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.organdonation.dto.DonorTypeMasterDto;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.organdonation.service.OrganDonationService;

@Controller
@RequestMapping(value = "/organdonor")
public class OrganDonationController {
	
	static Logger log = Logger.getLogger(OrganDonationController.class.getName());
	
	@Autowired
	private OrganDonationService organDonationService;
	
	@Autowired
	private OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@Autowired
	private OrganDonorTreatmentDto organDonorTreatmentDto;
	
	@RequestMapping(value = "/saveOrganDonation", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganDonation(OrganDonationRegistrationDto obj,@RequestParam("patientId") Integer patientId, HttpServletRequest request) {
		int status = organDonationService.saveOrganDonation(obj, patientId,request);
		return status;
	}
	
	
	@RequestMapping(value = "/saveOrganDonationTreatment", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganDonationTreatment(OrganDonorTreatmentDto obj,@RequestParam("organDonorId") Integer organDonorId,@RequestParam("patientId") Integer patientId, HttpServletRequest request) {
		int status = organDonationService.saveOrganDonationTreatment(obj,organDonorId,patientId,request);
		return status;
	}
	
	@RequestMapping(value = "/editOrganDonor", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonationRegistrationDto editOrganDonor(@RequestParam("id") Integer organDonorId,HttpServletRequest request) {
		
		System.out.println("OrganDonationController : editOrganDonor() for organDonorId : " + organDonorId);
		
		OrganDonationRegistrationDto obj=new OrganDonationRegistrationDto();
		obj = organDonationService.editOrganDonor(organDonorId,request);
		
		System.out.println("OrganDonationController : OrganDonationRegistrationDto OBJECT : " + obj);
		return obj;
	}
	
	
	@RequestMapping(value = "/deleteOrganDonor", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganDonor(@RequestParam("donorId") Integer donorId, HttpServletRequest request) {
		
		log.info("In OrganDonationController deleteOrganDonor()");
		
		System.out.println("donorId :" + donorId);
		
		boolean response = organDonationService.deleteOrganDonor(donorId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	
	@RequestMapping(value = "/donorAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public OrganDonationRegistrationDto donorAutoSuggestion(@RequestParam("findText") String findText, @RequestParam("callFrom") String callFrom) {
		 
		System.out.println("---donorAutoSuggestion---controller--");
		
		OrganDonationRegistrationDto oDTO = new OrganDonationRegistrationDto();
		
		List<OrganDonationRegistrationDto> listOrganDonationRegistrationDto = new ArrayList<OrganDonationRegistrationDto>();
		listOrganDonationRegistrationDto = organDonationService.donorAutoSuggestion(findText, callFrom);
		
		System.out.println("---donorAutoSuggestion---controller-- listOrganDonationRegistrationDto " + listOrganDonationRegistrationDto);
		oDTO.setListOrganDonationRegistrationDto(listOrganDonationRegistrationDto);
		return oDTO;
	}
	
	@RequestMapping(value = "/getAllDonorsList", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonationRegistrationDto getAllDonorsList(HttpServletRequest request,@RequestParam("fromDate") String fromDate,@RequestParam("lastDate") String lastDate) {
		log.info("In OrganDonationController getAllDonorsList()");
		try {
			List<OrganDonationRegistrationDto> listOrganDonationRegistrationDto = new ArrayList<OrganDonationRegistrationDto>();
			listOrganDonationRegistrationDto = organDonationService.getAllDonorsList(request,fromDate,lastDate);
			organDonationRegistrationDto.setListOrganDonationRegistrationDto(listOrganDonationRegistrationDto);
			log.debug("Response----> "+organDonationRegistrationDto);
			return organDonationRegistrationDto;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return organDonationRegistrationDto;
		
	}	
	
	@RequestMapping(value = "/getAllDonorsTreatmentList", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonorTreatmentDto getAllDonorsTreatmentList(HttpServletRequest request,@RequestParam("fromDate") String fromDate,@RequestParam("lastDate") String lastDate) {
		log.info("In OrganDonationController getAllDonorsTreatmentList()");
		try {
			List<OrganDonorTreatmentDto> listOrganDonorTreatmentDto = new ArrayList<OrganDonorTreatmentDto>();
			listOrganDonorTreatmentDto = organDonationService.getAllDonorsTreatmentList(request,fromDate,lastDate);
			organDonorTreatmentDto.setListOrganDonorTreatmentDto(listOrganDonorTreatmentDto);
			log.debug("Response----> "+organDonorTreatmentDto);
			return organDonorTreatmentDto;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return organDonorTreatmentDto;
		
	}	
	

	@RequestMapping(value = "/getAllOrgansIntendedToDonate", method = RequestMethod.GET)
	@ResponseBody
	public IntendOrganDonorMasterDto getAllOrgansIntendedToDonate(HttpServletRequest request) {
		
		List<IntendOrganDonorMasterDto> listIntendOrganDonorMasterDto = new ArrayList<IntendOrganDonorMasterDto>();
		listIntendOrganDonorMasterDto = organDonationService.getAllOrgansIntendedToDonate(request);
		IntendOrganDonorMasterDto organsDTO = new IntendOrganDonorMasterDto();
		organsDTO.setLstIntendOrganDonorMasterDto(listIntendOrganDonorMasterDto);
		return organsDTO;
	}
	
	@RequestMapping(value = "/getAllDonorTypeList", method = RequestMethod.GET)
	@ResponseBody
	public DonorTypeMasterDto getAllDonorTypeList(HttpServletRequest request) {
		
		List<DonorTypeMasterDto> listDonorTypeMasterDto = new ArrayList<DonorTypeMasterDto>();
		listDonorTypeMasterDto = organDonationService.getAllDonorTypeList(request);
		DonorTypeMasterDto donorDTO = new DonorTypeMasterDto();
		donorDTO.setLstDonorTypeMasterDto(listDonorTypeMasterDto);
		return donorDTO;
	}
	
	@RequestMapping(value = "/getCityList", method = RequestMethod.GET)
    @ResponseBody
	public AdminCityDTO getCityList(HttpServletRequest request) {
		
		List<AdminCityDTO> listAdminCityDTO = new ArrayList<AdminCityDTO>();
		listAdminCityDTO = organDonationService.getCityList(request);
		AdminCityDTO obj = new AdminCityDTO();
		obj.setCityList(listAdminCityDTO);
		return obj;
	}
	
	@RequestMapping(value = "/getDistrictList", method = RequestMethod.GET)
    @ResponseBody
	public AdminDistrictDTO getDistrictList(HttpServletRequest request) {
		
		List<AdminDistrictDTO> listAdminDistrictDTO = new ArrayList<AdminDistrictDTO>();
		listAdminDistrictDTO = organDonationService.getDistrictList(request);
		AdminDistrictDTO obj = new AdminDistrictDTO();
		obj.setDistrictList(listAdminDistrictDTO);
		return obj;
	}
	
	@RequestMapping(value = "/getStateList", method = RequestMethod.GET)
    @ResponseBody
	public AdminStateDTO getStateList(HttpServletRequest request) {
		
		List<AdminStateDTO> listAdminStateDTO = new ArrayList<AdminStateDTO>();
		listAdminStateDTO = organDonationService.getStateList(request);
		AdminStateDTO obj = new AdminStateDTO();
		obj.setStateList(listAdminStateDTO);
		return obj;
	}
	
	@RequestMapping(value = "/getBloodGroupList", method = RequestMethod.GET)
    @ResponseBody
	public BloodGroupMaster getBloodGroupList(HttpServletRequest request) {
		
		List<BloodGroupMaster> listBloodGroupMaster = new ArrayList<BloodGroupMaster>();
		listBloodGroupMaster = organDonationService.getBloodGroupList(request);
		BloodGroupMaster obj = new BloodGroupMaster();
		obj.setLstBloodGroupMaster(listBloodGroupMaster);
		return obj;
	}
	
	@RequestMapping(value = "/searchPatientByStoredProcedure", method = RequestMethod.POST)
	@ResponseBody
	public RegistrationViewDto searchPatientByStoredProcedure(@RequestParam("findText") String findText,
			@RequestParam("patSearchType") String patSearchType,
			@RequestParam("callFrom") String callFrom,
			@RequestParam("fromYear") Integer fromYear) {
		 
		RegistrationViewDto ltRegistrationViewDto = new  RegistrationViewDto();
		ltRegistrationViewDto = organDonationService.searchPatientByStoredProcedure(findText,Integer.parseInt(patSearchType),callFrom, fromYear);	
		return ltRegistrationViewDto;
	}
	
	
	@RequestMapping(value = "/deleteOrganDonorTreatment", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganDonorTreatment(@RequestParam("donorTreatmentId") Integer donorTreatmentId, HttpServletRequest request) {
		
		log.info("In OrganDonationController deleteOrganDonorTreatment()");
		
		System.out.println("donorId :" + donorTreatmentId);
		
		boolean response = organDonationService.deleteOrganDonorTreatment(donorTreatmentId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	
	@RequestMapping(value = "/getAllOrgansAgainstTreatment", method = RequestMethod.GET)
	@ResponseBody
	public IntendOrganDonorMasterDto getAllOrgansAgainstTreatment(@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		
		List<IntendOrganDonorMasterDto> listIntendOrganDonorMasterDto = new ArrayList<IntendOrganDonorMasterDto>();
		listIntendOrganDonorMasterDto = organDonationService.getOrgansAgainstTreatment(treatmentId, request);
		IntendOrganDonorMasterDto organsDTO = new IntendOrganDonorMasterDto();
		organsDTO.setLstIntendOrganDonorMasterDto(listIntendOrganDonorMasterDto);
		return organsDTO;
	}
	
	
	@RequestMapping(value = "/donorTreatAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public OrganDonorTreatmentDto donorTreatAutoSuggestion(@RequestParam("findText") String findText, @RequestParam("callFrom") String callFrom) {
		 
		System.out.println("---donorAutoSuggestion---controller--");
		
		OrganDonorTreatmentDto oDTO = new OrganDonorTreatmentDto();
		
		List<OrganDonorTreatmentDto> list = new ArrayList<OrganDonorTreatmentDto>();
		list = organDonationService.donorTreatAutoSuggestion(findText, callFrom);
		
		System.out.println("---donorAutoSuggestion---controller-- listOrganDonationRegistrationDto " + list);
		oDTO.setListOrganDonorTreatmentDto(list);
		return oDTO;
	}
	
	@RequestMapping(value = "/editOrganDonorTreatment", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonorTreatmentDto editOrganDonorTreatment(@RequestParam("organTreatId") Integer organTreatId,HttpServletRequest request) {
		
		System.out.println("OrganDonationController : editOrganDonorTreatment() for organDonorId : " + organTreatId);
		
		OrganDonorTreatmentDto obj=new OrganDonorTreatmentDto();
		obj = organDonationService.editOrganDonorTreatment(organTreatId);
		
		System.out.println("OrganDonationController : editOrganDonorTreatment OBJECT : " + obj);
		return obj;
	}
	// Added By Annapurna for Organ Request
	@RequestMapping(value = "/searchPatientByStoredProcedurefor_organREquest", method = RequestMethod.POST)
	@ResponseBody
	public RegistrationViewDto searchPatientByStoredProcedurefororganrequest(@RequestParam("findText") String findText,
			@RequestParam("patSearchType") String patSearchType,
			@RequestParam("callFrom") String callFrom,
			@RequestParam("fromYear") Integer fromYear) {
		 
		RegistrationViewDto ltRegistrationViewDto = new  RegistrationViewDto();
		ltRegistrationViewDto = organDonationService.searchPatientByStoredProcedurefororganrequest(findText,Integer.parseInt(patSearchType),callFrom, fromYear);	
		return ltRegistrationViewDto;
	}
	// Added By Annapurna for Organ Donor
		@RequestMapping(value = "/searchPatientByStoredProcedurefor_organDonor", method = RequestMethod.POST)
		@ResponseBody
		public RegistrationViewDto searchPatientByStoredProcedurefororganDonor(@RequestParam("findText") String findText,
				@RequestParam("patSearchType") String patSearchType,
				@RequestParam("callFrom") String callFrom,
				@RequestParam("fromYear") Integer fromYear) {
			 
			RegistrationViewDto ltRegistrationViewDto = new  RegistrationViewDto();
			ltRegistrationViewDto = organDonationService.searchPatientByStoredProcedurefororganDonor(findText,Integer.parseInt(patSearchType),callFrom, fromYear);	
			return ltRegistrationViewDto;
		}
	
}
