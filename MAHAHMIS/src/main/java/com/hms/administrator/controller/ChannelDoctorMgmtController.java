package com.hms.administrator.controller;

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

import com.hms.administrator.dto.Chanelling_doctor;
import com.hms.administrator.service.ChannelDoctorMgmtService;

@Controller 
@RequestMapping(value="/admin")
public class ChannelDoctorMgmtController {
	static Logger log=Logger.getLogger(ChannelDoctorMgmtController.class.getName());
	
	@Autowired
	ChannelDoctorMgmtService channedoctorservice;
	
	@RequestMapping(value = "/saverefertodoc", method = RequestMethod.POST)
	@ResponseBody
	public int saveReferToDoc(Chanelling_doctor cobj,HttpServletRequest request) {
		System.err.println("Inside save...");
		log.info("saverefertodoc..");

		int response = channedoctorservice.saveReferToDoc(cobj, request);
	      log.debug("saverefertodoc....."+response);

		return response;	
	}
	
	@RequestMapping(value = "/setexistingedctortemp", method = RequestMethod.GET)
	public @ResponseBody
	Chanelling_doctor setExistingDoctorTemp(@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		log.info("setExistingDoctorTemp..");

		List<Chanelling_doctor> lstchanneldoctor = new ArrayList<Chanelling_doctor>();
		lstchanneldoctor = channedoctorservice.setExistingDoctorTemp(unitId,request);
	      log.debug("setExistingDoctorTemp....."+lstchanneldoctor);
	      Chanelling_doctor obj = new Chanelling_doctor();
		obj.setChann_docList(lstchanneldoctor);
		return obj;
	}
	
	@RequestMapping(value = "/editchanneldoctormgmt", method = RequestMethod.GET)
	public @ResponseBody
	Chanelling_doctor editChannelDoctorMgmt(@RequestParam("doctorId") Integer doctorId) {
		log.info("editChannelDoctorMgmt..");
		Chanelling_doctor obj = new Chanelling_doctor();
		obj = channedoctorservice.editChannelDoctorMgmt(doctorId);
		 log.debug("editChannelDoctorMgmt....."+obj);
		return obj;
	}
	
	
	@RequestMapping(value = "/deletechanneldoctormgmt", method = RequestMethod.POST)
	public @ResponseBody
	String deleteChannelDoctorMgmt(@RequestParam("doctorId") Integer doctorId,HttpServletRequest request) {
		log.info("deleteChannelDoctorMgmt..");
		boolean response = channedoctorservice.deleteChannelDoctorMgmt(doctorId, request);
	      log.debug("deleteChannelDoctorMgmt....."+response);

				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network Issue";
		}
		return msg;
	}
	
	
	@RequestMapping(value = "/channeldoctorautosuggestion", method = RequestMethod.GET)
	public @ResponseBody
	Chanelling_doctor channelDoctorAutoSuggestion(@RequestParam("doctorName") String doctorName,@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		log.info("channelDoctorAutoSuggestion..");

		List<Chanelling_doctor> lstdoctor = new ArrayList<Chanelling_doctor>();
		lstdoctor = channedoctorservice.channelDoctorAutoSuggestion(doctorName,unitId);
	      log.debug("channelDoctorAutoSuggestion....."+lstdoctor);
	      Chanelling_doctor obj = new Chanelling_doctor();
		obj.setChann_docList(lstdoctor);
		return obj;
	}
	
	@RequestMapping(value = "/setexistingedctortemp1", method = RequestMethod.GET)
	public @ResponseBody Chanelling_doctor setExistingDoctorTemp1(
			HttpServletRequest request) {
		log.info("setExistingDoctorTemp..");

		List<Chanelling_doctor> lstchanneldoctor = new ArrayList<Chanelling_doctor>();
		lstchanneldoctor = channedoctorservice.setExistingDoctorTemp1(request);
		log.debug("setExistingDoctorTemp....." + lstchanneldoctor);
		Chanelling_doctor obj = new Chanelling_doctor();
		obj.setChann_docList(lstchanneldoctor);
		return obj;
	}

	@RequestMapping(value = "/setnewDocTemp", method = RequestMethod.GET)
	public @ResponseBody Integer setnewDocTemp(@RequestParam("action") String unitId, HttpServletRequest request) {
		log.info("setExistingDoctorTemp..");
		Integer count = channedoctorservice.setnewDocTemp(unitId, request);
		log.debug("setExistingDoctorTemp....." + count);
//	      Chanelling_doctor obj = new Chanelling_doctor();
//		obj.setChann_docList(lstchanneldoctor);
		return count;
	}


}
