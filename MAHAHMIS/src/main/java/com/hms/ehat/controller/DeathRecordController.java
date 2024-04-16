package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.Doctor;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.DeathPatientView;
/*import com.hms.ehat.dto.DeathPatientView2;*/
import com.hms.ehat.dto.DeathRecordDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.dto.UnitMasterDto;
import com.hms.ehat.service.DeathRecordService;
import com.hms.ehat.service.UnitService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value ="/death")
public class DeathRecordController 
{
	
	@Autowired
	DeathRecordService deathService;

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateDeathRecord(@RequestParam(
			"patientId") String patientId,HttpServletRequest request,
			@RequestParam("narration") String narration,@RequestParam("docId") int docId,
			@RequestParam("deathId") int deathId,@RequestParam("deathFlag") String deathFlag,
			@RequestParam("deathDate") String deathDate,@RequestParam("deathTime") String deathTime) {
		
		
		int response = deathService.saveOrUpdateDeathRecord(patientId, request, docId,narration,deathId,deathFlag,deathDate,deathTime);
		
		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Name Allready exist"
						: "Network Error!!!"));

		
	
	}
	
	@RequestMapping(value = "/getDeathList ", method = RequestMethod.POST)
	public @ResponseBody
	DeathPatientView getDeathList(HttpServletRequest request) {
		
		
		List<DeathPatientView> ltRegistrationViewDto = new ArrayList<DeathPatientView>();
		
		ltRegistrationViewDto = deathService.getDeathList();
	
		DeathPatientView obj=new DeathPatientView();
		
		obj.setLstRegviewDto(ltRegistrationViewDto);
		 
		return obj;
	}
	

		
	@RequestMapping(value = "/deleteDeathRecord", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDeathRecord(@RequestParam("deathId") Integer deathId,
			HttpServletRequest request) {
				boolean response = deathService.deleteDeathRecord(deathId,
				request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	@RequestMapping(value = "/getMarkVisitList ", method = RequestMethod.POST)
	public @ResponseBody
	DeathPatientView getMarkVisitList(HttpServletRequest request) {
		
		
		List<DeathPatientView> ltRegistrationViewDto = new ArrayList<DeathPatientView>();
		
		ltRegistrationViewDto = deathService.getMarkVisitList();
	
		DeathPatientView obj=new DeathPatientView();
		
		obj.setLstRegviewDto(ltRegistrationViewDto);
		 
		return obj;
	}
	
	@RequestMapping(value = "/autoSuggestionDeathRecord", method = RequestMethod.POST)
	 @ResponseBody
	public DeathPatientView autoSuggestionMarkVisit(@RequestParam("letter") String letter,
			@RequestParam("call") String call) {
		 
		DeathPatientView ltRegistrationViewDto = new  DeathPatientView();
		ltRegistrationViewDto = deathService.autoSuggestionMarkVisit(letter,call);	
		return ltRegistrationViewDto;
	}


	@RequestMapping(value = "/setDoctorList ", method = RequestMethod.POST)
	public @ResponseBody
	List<Doctor> setDoctorList(HttpServletRequest request) {
		
		
		List<Doctor> ltRegistrationViewDto = new ArrayList<Doctor>();
		
		ltRegistrationViewDto = deathService.setDoctorList();
	
		return ltRegistrationViewDto;
	}
	
	@RequestMapping(value = "/getdeathpatientsList ", method = RequestMethod.POST)
	public @ResponseBody
	DeathPatientView getdeathpatientsList(@RequestParam("fromdate") String fromdate,@RequestParam("todate") String todate,
			@RequestParam("callfrom") String callfrom,HttpServletRequest request) {
		
		
		List<DeathPatientView> ltRegistrationViewDto = new ArrayList<DeathPatientView>();
		
		ltRegistrationViewDto = deathService.getdeathpatientsList(fromdate,todate,callfrom);
	
		DeathPatientView obj=new DeathPatientView();
		
		obj.setLstRegviewDto(ltRegistrationViewDto);
		 
		return obj;
	}
}
