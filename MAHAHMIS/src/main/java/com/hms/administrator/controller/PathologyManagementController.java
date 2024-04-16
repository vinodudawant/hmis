package com.hms.administrator.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.service.PathologyManagementService;
import com.hms.dto.LabMainlab;
import com.hms.dto.LabUnitType;
import com.hms.dto.Laborgans;

@RestController
@RequestMapping(value = "/pathology")
public class PathologyManagementController {

	@Autowired
	PathologyManagementService pathologyService;
	
	@RequestMapping(value = "/savelaborgan", method = RequestMethod.POST)
	public String saveLabOrgan(Laborgans dto, HttpServletRequest request){
		return pathologyService.saveLabOrgan(dto, request);
	}
	
	@RequestMapping(value = "/getlaborgans", method = RequestMethod.GET)
	public Laborgans getLabOrgan(@RequestParam("searchText") String searchText, @RequestParam("type") String type){
		return pathologyService.getLabOrgans(searchText, type);
	}
	
	@RequestMapping(value = "/getlaborganbyid/{id}", method = RequestMethod.GET)
	public Laborgans getLabOrganById(@PathVariable("id") int labOrganId){
		return pathologyService.getLabOrganById(labOrganId);
	}
	
	@RequestMapping(value = "/deletelaborgan/{id}", method = RequestMethod.DELETE)
	public boolean deleteLabOrgan(@PathVariable("id") int labOrganId, HttpServletRequest request){
		return pathologyService.deleteLabOrgan(labOrganId, request);
	}
	

	@RequestMapping(value = "/savelabinfo", method = RequestMethod.POST)
	public String saveLabInfo(LabMainlab dto, HttpServletRequest request){
		return pathologyService.saveLabInfo(dto, request);
	}
	
	@RequestMapping(value = "/getlabinfo", method = RequestMethod.GET)
	public LabMainlab getLabInfo(){
		return pathologyService.getLabInfo();
	}
	
	@RequestMapping(value = "/saveunittype", method = RequestMethod.POST)
	public String saveUnitType(LabUnitType dto, HttpServletRequest request){
		return pathologyService.saveUnitType(dto, request);
	}
	
	@RequestMapping(value = "/getallunittypes", method = RequestMethod.GET)
	public LabUnitType getAllUnitTypes(@RequestParam("searchText") String searchText, @RequestParam("callFrom") String type){
		return pathologyService.getAllUnitTypes(searchText, type);
	}
	
	@RequestMapping(value = "/editunittype/{id}", method = RequestMethod.GET)
	public LabUnitType getUnitTypeById(@PathVariable("id") int unitTypeId){
		return pathologyService.getUnitTypeById(unitTypeId);
	}
	
	@RequestMapping(value = "/deleteunittype/{id}", method = RequestMethod.DELETE)
	public boolean deleteUnitType(@PathVariable("id") int labOrganId, HttpServletRequest request){
		return pathologyService.deleteUnitType(labOrganId, request);
	}
}