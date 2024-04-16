package com.hms.ehat.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.service.LabUnitTypeService;
import com.hms.pathology.dto.LabUnitTypeDTO;

@RestController
@RequestMapping(value = "/unittype")
public class LabUnitTypeController {
	
	@Autowired
	LabUnitTypeService labUnitTypeService;
	
	@RequestMapping(value = "/saveunittype", method = RequestMethod.POST)
	public String saveUnitType(LabUnitTypeDTO dto, HttpServletRequest request){
		return labUnitTypeService.saveUnitType(dto, request);
	}
	
	@RequestMapping(value = "/getallunittypes", method = RequestMethod.GET)
	public LabUnitTypeDTO getAllUnitTypes(@RequestParam("searchText") String searchText, @RequestParam("callFrom") String type){
		return labUnitTypeService.getAllUnitTypes(searchText, type);
	}
	
	@RequestMapping(value = "/editunittype/{id}", method = RequestMethod.GET)
	public LabUnitTypeDTO getUnitTypeById(@PathVariable("id") int unitTypeId){
		return labUnitTypeService.getUnitTypeById(unitTypeId);
	}
	
	@RequestMapping(value = "/deleteunittype/{id}", method = RequestMethod.DELETE)
	public boolean deleteUnitType(@PathVariable("id") int labOrganId, HttpServletRequest request){
		return labUnitTypeService.deleteUnitType(labOrganId, request);
	}
	
	@RequestMapping(value = "/getallunittypeslist", method = RequestMethod.GET)
	public LabUnitTypeDTO getallunittypeslist(){
		return labUnitTypeService.getallunittypeslist();
	}

}
