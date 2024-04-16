package com.hms.doctordesk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.ImmunizationConfigurationMaster;
import com.hms.doctordesk.dto.ImmunizationPatientStatus;
import com.hms.doctordesk.service.DoctorDeskChartsService;

@Controller
@RequestMapping(value="doctordeskchartscontroller")
public class DoctorDeskChartsController {

	@Autowired
	DoctorDeskChartsService doctordeskchartsservice; 
	
	@RequestMapping(value="fetchimmunizationmaster",method=RequestMethod.POST)
	@ResponseBody
	public ImmunizationConfigurationMaster fetchImmunizationMaster() 
	{
		ImmunizationConfigurationMaster immunizationconfigurationmaster=new ImmunizationConfigurationMaster();
		List<ImmunizationConfigurationMaster> list=doctordeskchartsservice.fetchImmunizationMaster();
		immunizationconfigurationmaster.setList(list);
		return immunizationconfigurationmaster;
		
	}
	
	@RequestMapping(value="/saveimmunizationconpatient",method=RequestMethod.POST)
	@ResponseBody
	public Integer saveImmunizationconPatient(@RequestParam ("immpatient")String immpatient)
	{
		Integer response=doctordeskchartsservice.saveImmunizationconPatient(immpatient);
		return response;
		
	}

	@RequestMapping(value="/fetchimmunizationconpatient",method=RequestMethod.POST)
	@ResponseBody
	public ImmunizationPatientStatus fetchImmunizationconPatient(@RequestParam ("treatmentId")Integer treatmentId)
	{
		ImmunizationPatientStatus immunizationpatientstatus=new ImmunizationPatientStatus();
		List<ImmunizationPatientStatus> response=doctordeskchartsservice.fetchMmmunizationconPatient(treatmentId);
		immunizationpatientstatus.setList(response);
		return immunizationpatientstatus;
		
	}
	
	@RequestMapping(value="fetchimmunizationmasterOnDoctordesk",method=RequestMethod.POST)
	@ResponseBody
	public ImmunizationConfigurationMaster fetchimmunizationmasterOnDoctordesk(@RequestParam ("patientId")Integer patientId) 
	{
		ImmunizationConfigurationMaster immunizationconfigurationmaster=new ImmunizationConfigurationMaster();
		List<ImmunizationConfigurationMaster> list=doctordeskchartsservice.fetchimmunizationmasterOnDoctordesk(patientId);
		immunizationconfigurationmaster.setList(list);
		return immunizationconfigurationmaster;
		
	}
}
