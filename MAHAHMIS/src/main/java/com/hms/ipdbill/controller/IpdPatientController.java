package com.hms.ipdbill.controller;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ipdbill.dto.IpdPatientsDto;
import com.hms.ipdbill.dto.IpdPreviousBillDTO;
import com.hms.ipdbill.service.IpdPatientService;
@SuppressWarnings("unused")
@Controller
@RequestMapping(value = "/ipdPatients")
public class IpdPatientController {

	private static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	static {
		System.out.println("IpdPatientController is Loaded...!");
	}
	
	@Autowired
	IpdPatientService ipdPatientService;
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation for Ipd Patients
	================*/

	@RequestMapping(value = "/autoSuggestationIpdPatients", method = RequestMethod.POST)
	public @ResponseBody
	IpdPatientsDto autoSuggestationIpdPatients(@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "findText") String findText,	@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "wardType") Integer wardType,@RequestParam("startIndex") Integer startIndex, @RequestParam(value = "wardName") Integer wardName,@RequestParam(value = "activeBlock") String activeBlock) {
		
		List<IpdPatientsDto> ltIpdPatientsDto = new ArrayList<IpdPatientsDto>();
		ltIpdPatientsDto = ipdPatientService.autoSuggestationIpdPatients(unitId, callFrom, findText,wardType,startIndex,wardName,activeBlock);		
		Integer totalBedCount1 =  ipdPatientService.getTotalBedCount(wardType,wardName);
		IpdPatientsDto obj=new IpdPatientsDto();
		Integer activePatCount =  ipdPatientService.getAllActivePatCount();
		obj.setActivePatCount(activePatCount);
		 obj.setTotalBedCount(totalBedCount1);	
		obj.setLstIpdbillPatientsBeds(ltIpdPatientsDto);
		return obj;		
	}
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation for Ipd Patients Physical Discharge
	================*/

	@RequestMapping(value = "/autoSuggestationPhyDischarge", method = RequestMethod.POST)
	public @ResponseBody
	IpdPatientsDto autoSuggestationPhyDischarge(@RequestParam(value = "unit_id") Integer unit_id,			
			@RequestParam(value = "findText") String findText,	@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "wardType") Integer wardType, @RequestParam(value = "wardName") Integer wardName, @RequestParam("startIndex") Integer startIndex) {
		
		List<IpdPatientsDto> ltIpdPatientsDto = new ArrayList<IpdPatientsDto>();
		ltIpdPatientsDto = ipdPatientService.autoSuggestationPhyDischarge(unit_id, callFrom, findText,wardType,wardName,startIndex);		
		IpdPatientsDto obj=new IpdPatientsDto();
		Integer phyDisPatCount =  ipdPatientService.getAllPhyDiscPatientCount();
		obj.setPhyDisPatCount(phyDisPatCount);
		obj.setLstIpdbillPatientsBeds(ltIpdPatientsDto);
		return obj;		
	}
	
	/* =============
	  Code By  : Vishant Pawar
	  Code For : get all Patients
	================*/

	@RequestMapping(value = "/getAllRecordForCosentForm", method = RequestMethod.POST)
	public @ResponseBody
	IpdPatientsDto getAllRecordForCosentForm(@RequestParam(value = "unit_id") Integer unit_id,			
			@RequestParam(value = "findText") String findText,	@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "deptId") Integer deptId) {
		
		List<IpdPatientsDto> ltIpdPatientsDto = new ArrayList<IpdPatientsDto>();
		ltIpdPatientsDto = ipdPatientService.getAllRecordForCosentForm(unit_id, callFrom, findText,deptId);		
		IpdPatientsDto obj=new IpdPatientsDto();
		obj.setLstIpdbillPatientsBeds(ltIpdPatientsDto);
		return obj;		
	}
	
}


