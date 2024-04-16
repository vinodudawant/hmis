package com.hms.doctordesk.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.doctordesk.dto.FindingMaster;
import com.hms.doctordesk.dto.SubjectiveObjectiveDto;
import com.hms.doctordesk.dto.SubjectiveObjectiveTempMasterDto;
import com.hms.doctordesk.service.SubjectiveObjectiveTempMasterService;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.mysql.jdbc.log.Log;

@RestController
@RequestMapping("/subjectiveObject")
public class SubjectiveObjectiveTempMasterController {
	
	@Autowired
	SubjectiveObjectiveTempMasterService subjObjTempService;
	
	static Logger log=Logger.getLogger(DoctorDeskController.class.getName());
	
	@RequestMapping(value = "/saveSubjectiveObj" ,method = RequestMethod.POST)
	@ResponseBody
	public String saveSubjectiveObj(SubjectiveObjectiveTempMasterDto subjectiveObjectiveTempDto , HttpServletRequest request) {
		
		
		int response = subjObjTempService.saveSubjectiveObj(subjectiveObjectiveTempDto, request);
		String msg = "";
		
		if(response == 1 ) {
			msg = "Records Saved Successfuly";
		}
		else if(response == 2)
		{
			msg = "Records Updated Successfully";
		}
		else {
			msg = "Oops Some problem Occured";
		}
		
		return msg;
	}
	
	
	@RequestMapping(value = "/getAllSubObjective", method = RequestMethod.GET)
	public @ResponseBody
	SubjectiveObjectiveTempMasterDto getAllSubObjective(HttpServletRequest request) {
		
		List<SubjectiveObjectiveTempMasterDto> lstSubObj = new ArrayList<SubjectiveObjectiveTempMasterDto>();
		lstSubObj = subjObjTempService.getAllSubObjective(request);
		SubjectiveObjectiveTempMasterDto obj = new SubjectiveObjectiveTempMasterDto();
		obj.setLstSubjectiveObjectiveTempDto(lstSubObj);
		
		
		return obj;
	}
	
	@RequestMapping(value = "/editSubObjMaster", method = RequestMethod.GET)
	public @ResponseBody
	SubjectiveObjectiveTempMasterDto editSubObjMaster(@RequestParam("subObjTempId") Integer subObjTempId) {
	
		SubjectiveObjectiveTempMasterDto obj = new SubjectiveObjectiveTempMasterDto();
		obj = subjObjTempService.editSubObjMaster(subObjTempId);	
		
		return obj;
	}	
	
	@RequestMapping(value = "/deleteSubObjMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteSubObjMaster(@RequestParam("subObjTempId") Integer subObjTempId,HttpServletRequest request) {
		
		boolean response = subjObjTempService.deleteSubObjMaster(subObjTempId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		
		return msg;
	}	
	
	@RequestMapping(value = "/subjectiveObjAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	SubjectiveObjectiveTempMasterDto subjectiveObjAutoSuggestion(@RequestParam("SubTempName")String SubTempName) {
		
		List<SubjectiveObjectiveTempMasterDto> lstSubObj = new ArrayList<SubjectiveObjectiveTempMasterDto>();
		lstSubObj = subjObjTempService.subjectiveObjAutoSuggestion(SubTempName);
		SubjectiveObjectiveTempMasterDto obj = new SubjectiveObjectiveTempMasterDto();
		obj.setLstSubjectiveObjectiveTempDto(lstSubObj);
		
		return obj;
	}
	
	
	@RequestMapping(value = "/fetchSubjectiveTypeMaster", method = RequestMethod.POST)
	@ResponseBody
	public SubjectiveObjectiveDto fetchSubjectiveTypeMaster() {
		log.info("In DoctorDesk fetchPreparationMaster()");
		SubjectiveObjectiveDto subjectiveTypeMasterlst=new SubjectiveObjectiveDto();
		List<SubjectiveObjectiveDto> list=subjObjTempService.fetchSubjectiveTypeMaster();
		subjectiveTypeMasterlst.setLstSubjectiveMaster(list);
		log.debug("Reponse----> "+list);
		return subjectiveTypeMasterlst;
	}
	
	///Finding Maste Save 
	
	@RequestMapping(value = "/saveFindingMaster" ,method = RequestMethod.POST)
	@ResponseBody
	public String saveFindingMaster(FindingMaster findingMaster , HttpServletRequest request) {
		
		
		int response = subjObjTempService.saveFindingMaster(findingMaster, request);
		String msg = "";
		
		if(response == 1 ) {
			msg = "Records Saved Successfuly";
		}
		else if(response == 2)
		{
			msg = "Records Updated Successfully";
		}
		else {
			msg = "Oops Some problem Occured";
		}
		
		return msg;
	}
	

	@RequestMapping(value = "/getAllFindingMasters", method = RequestMethod.GET)
	public @ResponseBody
	FindingMaster getAllFindingMasters(HttpServletRequest request) {
		
		List<FindingMaster> lstfindingmaster = new ArrayList<FindingMaster>();
		lstfindingmaster = subjObjTempService.getAllFindingMasters(request);
		FindingMaster obj = new FindingMaster();
		obj.setLstFindingMaster(lstfindingmaster);
		
		
		return obj;
	}
	 
	
	@RequestMapping(value = "/editFindingMaster", method = RequestMethod.GET)
	public @ResponseBody
	FindingMaster editFindingMaster(@RequestParam("findingMasterId") Integer findingMasterId) {
	
		FindingMaster obj = new FindingMaster();
		obj = subjObjTempService.editFindingMaster(findingMasterId);	
		
		return obj;
	}	
	
	
	  @RequestMapping(value = "/deletFindingMaster", method = RequestMethod.POST)
	  public @ResponseBody String deletFindingMaster(@RequestParam("findingMasterId")
	  Integer findingMasterId,HttpServletRequest request) {
	  
	  boolean response = subjObjTempService.deletFindingMaster(findingMasterId,
	  request);
	  
	  String msg = ""; 
	  if (response == true) { 
		  msg = "Records Deleted Sucessfully";
	  } else { 
		  msg = "Network issue"; 
		  }
	  
	  return msg; 
	  }
	 
	  
	  @RequestMapping(value = "/FindingMasterAutoSuggestion", method = RequestMethod.POST)
		public @ResponseBody
		FindingMaster FindingMasterAutoSuggestion(@RequestParam("findingName")String findingName) {
			
			List<FindingMaster> lstFindingMaster = new ArrayList<FindingMaster>();
			lstFindingMaster = subjObjTempService.FindingMasterAutoSuggestion(findingName);
			FindingMaster obj = new FindingMaster();
			obj.setLstFindingMaster(lstFindingMaster);
			
			return obj;
		}
	  
	  /**
	 * @author : Aniket Kanse
	 * @since : 30 DEC 21
	 * @return Organs List
	 */
	@RequestMapping(value = "/getBodyParts", method = RequestMethod.GET)
	    @ResponseBody
		public DdOrganMasterDTO getBodyParts(HttpServletRequest request) {
			
			log.info("In SubjectiveObjectiveTempMasterController getBodyParts()");
			List<DdOrganMasterDTO> listDdOrganMasterDTO = new ArrayList<DdOrganMasterDTO>();
			listDdOrganMasterDTO = subjObjTempService.getBodyParts(request);
			DdOrganMasterDTO obj = new DdOrganMasterDTO();
			obj.setLstOrganMaster(listDdOrganMasterDTO);
			return obj;
		}
	  
	
	  /**
		 * @author : Aniket Kanse
		 * @since : 30 DEC 21
		 * @return Hospital Speciality List
		 */
	  @RequestMapping(value = "/getAllSpeciality", method = RequestMethod.GET)
	    @ResponseBody
		public HospitalSpecialisationDto getAllSpeciality(HttpServletRequest request) {
			
		  log.info("In SubjectiveObjectiveTempMasterController getAllSpeciality()");
		  	List<HospitalSpecialisationDto> listHospitalSpecialisationDto = new ArrayList<HospitalSpecialisationDto>();
			listHospitalSpecialisationDto = subjObjTempService.getAllSpeciality(request);
			
		  log.info("In SubjectiveObjectiveTempMasterController --> listHospitalSpecialisationDto : " + listHospitalSpecialisationDto);
			HospitalSpecialisationDto obj = new HospitalSpecialisationDto();
			obj.setListHospSpcl(listHospitalSpecialisationDto);
			return obj;
		}

}
