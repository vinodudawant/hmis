package com.hms.doctordesk.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.VitalInfoDto;
import com.hms.doctordesk.service.VitalInfoService;
import com.hms.dto.PatientBmiDTO;

@Controller
@RequestMapping(value="/vtDetails")
public class VitalInfoController {

	@Autowired
	VitalInfoService vitalInfoService;
	
	@RequestMapping(value="/savevitalInfo",method =RequestMethod.POST)
	@ResponseBody
	public String saveVitalInfo(VitalInfoDto vitalInfoDto,HttpServletRequest request, @RequestParam("vitals") String vitals){
		String response = vitalInfoService.saveVitalsInfo(vitals, request);
		return response ;
	}
	@RequestMapping(value="/savemeasurements",method =RequestMethod.POST)
	@ResponseBody
	public String saveMeasurements(PatientBmiDTO patientBmiDTO,HttpServletRequest request){
		String response = vitalInfoService.saveMeasureMents(patientBmiDTO, request);
		return response ;
	}
	@RequestMapping(value="/getVitalInfo",method =RequestMethod.POST)
	@ResponseBody
	public List<VitalInfoDto> getVitalInfo(@RequestParam("treatId") int id,@RequestParam("callfrom") String callfrom){
		List<VitalInfoDto> response = vitalInfoService.getVitalList(id,callfrom);
		return response;
	}
	@RequestMapping(value="/getVitalInfoById",method =RequestMethod.POST)
	@ResponseBody
	public List<VitalInfoDto> getVitalInfoById(@RequestParam("id") int id){
		List<VitalInfoDto> response = vitalInfoService.getVitalListById(id);
		return response ;
	}
	@RequestMapping(value="/deleteVitalInfoById",method =RequestMethod.POST)
	@ResponseBody
	public String deleteVitalInfoById(@RequestParam("id") int id,HttpServletRequest request){
		String response = vitalInfoService.deleteVitalsValues(id,request);
		return response ;
	}
	@RequestMapping(value="/getMeasureMents",method =RequestMethod.POST)
	@ResponseBody
	public List<PatientBmiDTO> getMeasureMents(@RequestParam("patortreatid") int id,@RequestParam("callfrom") String callfrom){
		List<PatientBmiDTO> response = vitalInfoService.getMeasureMents(id, callfrom);
		return response ;
	}
	@RequestMapping(value="/getMeasureMentsById",method =RequestMethod.POST)
	@ResponseBody
	public List<PatientBmiDTO> getMeasureMents(@RequestParam("id") int id){
		List<PatientBmiDTO> response = vitalInfoService.getMeasureMentsListById(id);
		return response ;
	}
	@RequestMapping(value="/deleteMeasurmentsById",method =RequestMethod.POST)
	@ResponseBody
	public String deleteMeasurmentsById(@RequestParam("id") int id,HttpServletRequest request){
		String response = vitalInfoService.deleteMeasureMentsValues(id, request);
		return response ;
	}
}