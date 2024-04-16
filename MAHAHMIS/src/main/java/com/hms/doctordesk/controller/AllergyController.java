package com.hms.doctordesk.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.AllergyReaction;
import com.hms.doctordesk.dto.AllergyTypeDto;
import com.hms.doctordesk.service.AllergyService;

@Controller
@RequestMapping("/allergydd")
public class AllergyController {

	
	@Autowired
	AllergyService allergyService;
	
	@RequestMapping(value="/saveallergytype",method=RequestMethod.POST)
	@ResponseBody
	public String saveAllergyType( AllergyTypeDto allergyTypeDto,HttpServletRequest request){
		String response = allergyService.saveAllergyType(allergyTypeDto, request);
		return response;
	}
	@RequestMapping(value="/getallergytype",method=RequestMethod.POST)
	@ResponseBody
	public List<AllergyTypeDto> getAllergyTypes(HttpServletRequest request,@RequestParam("searchtext")String searchtext){
		List<AllergyTypeDto> list = allergyService.getAllergyTypes(request, searchtext);
		return list;
	}
	@RequestMapping(value="/getallergytypeById",method=RequestMethod.POST)
	@ResponseBody
	public List<AllergyTypeDto> getAllergyTypesById(@RequestParam("id")int id){
		List<AllergyTypeDto> list = allergyService.getAllergyById(id);
		return list;
	}
	@RequestMapping(value="/deleteAllergyType",method=RequestMethod.POST)
	@ResponseBody
	public String deleteAllergyType(@RequestParam("id")int id,HttpServletRequest request){
		String response = allergyService.deletAllergyType(id, request);
		return response;
	}
	
	
	@RequestMapping(value="/saveallergyReaction",method=RequestMethod.POST)
	@ResponseBody
	public String saveAllergyType(AllergyReaction allergyReaction,HttpServletRequest request){
		String response = allergyService.saveAllergyRecation(allergyReaction, request);
		return response;
	}
	@RequestMapping(value="/getallergyReaction",method=RequestMethod.POST)
	@ResponseBody
	public List<AllergyReaction> getallergyReaction(HttpServletRequest request,@RequestParam("searchtext")String searchtext){
		List<AllergyReaction> list = allergyService.getallergyReaction(request,searchtext);
		return list;
	}
	@RequestMapping(value="/getAllergyReactionById",method=RequestMethod.POST)
	@ResponseBody
	public List<AllergyReaction> getAllergyReactionById(@RequestParam("id")int id){
		List<AllergyReaction> list = allergyService.getallergyReactionById(id);
		return list;
	}
	@RequestMapping(value="/deleteAllergyreaction",method=RequestMethod.POST)
	@ResponseBody
	public String deleteAllergyReaction(@RequestParam("id")int id,HttpServletRequest request){
		String response = allergyService.deletallergyReaction(id, request);
		return response;
	}

	
}
