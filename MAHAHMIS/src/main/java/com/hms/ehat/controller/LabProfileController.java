package com.hms.ehat.controller;

import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.LabProfileService;
import com.hms.pathology.dto.LabTestDTO;

@RestController
@RequestMapping(value = "labprofile")
public class LabProfileController {

	static Logger log=Logger.getLogger(LabProfileController.class.getName());
	@Autowired
	LabProfileService labProfileService;
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is for search lab profiles.
	 **********************************************************************/
	@RequestMapping(value = "/getlabprofiles", method = RequestMethod.GET)
	public LabProfileDTO getLabProfiles(@RequestParam("searchText") String searchText, @RequestParam("type") String type, @RequestParam("startIndex") Integer startIndex) {
		log.info("getLabProfiles()...start");
		LabProfileDTO dto = labProfileService.getLabProfiles(searchText, type,startIndex);
		log.info("getLabProfiles()...end");
		return dto;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is to get test under headings.
	 **********************************************************************/
	@RequestMapping(value = "/gettestunderheading", method = RequestMethod.GET)
	public LabTestDTO getTestUnderHeading(@RequestParam("headingId") Integer headingId) {
		log.info("getTestUnderHeading()...start");
		LabTestDTO obj = labProfileService.getTestUnderHeading(headingId);
		log.info("getTestUnderHeading()...end");
		return obj;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is to save lab profiles.
	 **********************************************************************/
	@RequestMapping(value = "/savelabprofiles", method = RequestMethod.POST)
	public String saveLabProfiles(LabProfileDTO dto, @RequestParam("testList") String testList, @RequestParam("outLabDetails") String outLabDetails, 
													 @RequestParam("reagentDetails") String reagentDetails) {
		log.info("saveLabProfiles()...start");
		String result = labProfileService.saveLabProfiles(dto, testList, outLabDetails, reagentDetails);
		log.info("saveLabProfiles()...end");
		return result;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is to delete lab profiles.
	 **********************************************************************/
	@RequestMapping(value = "/deletelabprofile/{id}", method = RequestMethod.DELETE)
	public boolean deleteLabProfile(@PathVariable("id") Integer profileId, HttpServletRequest request) {
		log.info("deleteLabProfile()...start");
		boolean result = labProfileService.deleteLabProfile(profileId, request);
		log.info("deleteLabProfile()...end");
		return result;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is get lab profile by id.
	 **********************************************************************/
	@RequestMapping(value = "/getprofilebyid/{id}", method = RequestMethod.GET)
	public LabProfileDTO getProfileById(@PathVariable("id") Integer profileId) {
		log.info("getProfileById()...start");
		LabProfileDTO obj = labProfileService.getProfileById(profileId);
		log.info("getProfileById()...end");
		return obj;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is filter out test based on sample type.
	 **********************************************************************/
	@RequestMapping(value = "/filtertestsunderheading", method = RequestMethod.GET)
	public LabTestDTO filterTestsUnderHeading(@RequestParam("headingId") Integer headingId, @RequestParam("sampleId") Integer sampleId) {
		log.info("filterTestsUnderHeading()...start");
		LabTestDTO obj = labProfileService.filterTestsUnderHeading(headingId, sampleId); 
		log.info("filterTestsUnderHeading()...end");
		return obj;
	}
	
	@RequestMapping(value = "/deleteOutlabById", method = RequestMethod.POST)
	public boolean deleteOutlabById(@RequestParam("id") String idOutLab,
			HttpServletRequest request) {
		log.info("In LabProfileController deleteOutlabById()..");
		return labProfileService.deleteOutlabById(idOutLab, request);
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17-07-2020
	 * @comment This method is to delete Lab Profile Reagent details by id
	 ************************************************************************/	
	@RequestMapping(value = "/deleteLabProfileReagentById", method = RequestMethod.POST)
	public  boolean deleteLabProfileReagentById(@RequestParam("id") Integer id, HttpServletRequest request) {
		log.info("deleteLabProfileReagentById...start");
		 boolean flag = labProfileService.deleteLabProfileReagentById(id,request);
		 log.debug("save Reagent Details....."+flag);
		return  flag;
	}
	
	/*************************************************************************
	 * @author Akshay Mache
	 * @since 20-07-2020
	 * @comment This method is to get All Pathology Services.
	 ************************************************************************/
	@RequestMapping(value = "/getallpathologyservices", method = RequestMethod.GET)
	public SubServiceDto getAllPathologyServices(@RequestParam("searchText") String searchText) {
		log.info("getAllPathologyServices()...start");
		SubServiceDto subServiceDto = labProfileService.getAllPathologyServices(searchText);
		log.info("getAllPathologyServices()...start");
		return subServiceDto;
	}
	
	/*************************************************************************
	 * @author Akshay Mache
	 * @since 20-07-2020
	 * @comment This method is to get All Pathology Services.
	 ************************************************************************/
	@RequestMapping(value = "/validateLabProfile", method = RequestMethod.GET)
	public String validateLabProfile(@RequestParam("profileId") Integer profileId, @RequestParam("profileName") String profileName, 
											@RequestParam("subServiceId") Integer subServiceId) {
		log.info("validateLabProfile()...start");
		String response = labProfileService.validateLabProfile(profileId, profileName, subServiceId);
		log.info("validateLabProfile()...start");
		return response;
	}
	
	/*************************************************************************
	 * @author Akshay Mache
	 * @since 20-07-2020
	 * @comment This method is to update sequence of tests.
	 ************************************************************************/
	@RequestMapping(value = "/updateSequence", method = RequestMethod.POST)
	public Integer updateSequence(@RequestParam("profileId") Integer profileId, @RequestParam("list") String list) {
		log.info("updateSequence()...start");
		Integer response = labProfileService.updateSequence(profileId, list);
		log.info("updateSequence()...end");
		return response;
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 02-04-2021
	 * @comment This method is to search tests from drag table.
	 ************************************************************************/
	@RequestMapping(value = "/searchTestInDragFromTable", method = RequestMethod.POST)
	public LabTestDTO searchTestInDragFromTable(@RequestParam("searchName") String searchName, @RequestParam("headingId") Integer headingId, @RequestParam("sampleId") Integer sampleId,
			HttpServletRequest request) {
	log.info("searchTestInDragFromTable()...start");
	System.out.println("Controller - searchTestInDragFromTable");
	return labProfileService.searchTestInDragFromTable(searchName, headingId, sampleId, request);
	}
}