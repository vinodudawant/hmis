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

import com.hms.doctordesk.dto.SurgicalAdviceDto;
import com.hms.doctordesk.service.SurAdviceService;
import com.hms.ot.dto.ProcedureMasterDetails;
import com.hms.ot.dto.ProcedureMasterDto;



@Controller
@RequestMapping("/ddsxdavice")
public class SurAdviceController {

	@Autowired
	SurAdviceService surAdviceService;

	@RequestMapping(value = "/sxadviceAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public List<ProcedureMasterDto> proNameautoSuggestion(
			@RequestParam("proname") String searchText,
			@RequestParam("callfrom") String callfrom) {
		List<ProcedureMasterDto> response = surAdviceService
				.procedureNameAutoSuggestion(searchText, callfrom);
		return response;
	}

	@RequestMapping(value = "/savesxadvice", method = RequestMethod.POST)
	@ResponseBody
	public String saveSxAdvice(@RequestBody SurgicalAdviceDto surgicalAdviceDto,
			HttpServletRequest request) {
		String response = surAdviceService.saveSxAdvice(surgicalAdviceDto,
				request);
		return response;
	}

	@RequestMapping(value = "/getsxadvice", method = RequestMethod.POST)
	@ResponseBody
	public List<SurgicalAdviceDto> getSxList(
			@RequestParam("patorTreatId") int patorTreatId,@RequestParam("callfrom")String callfrom) {
		List<SurgicalAdviceDto> response = surAdviceService
				.getSxList(patorTreatId,callfrom);
		return response;
	}

	@RequestMapping(value = "/getsxadvicebyid", method = RequestMethod.POST)
	@ResponseBody
	public List<SurgicalAdviceDto> getSxListById(@RequestParam("id") int id) {
		List<SurgicalAdviceDto> response = surAdviceService.getSxListById(id);
		return response;
	}

	@RequestMapping(value = "/deletesxadvice", method = RequestMethod.POST)
	@ResponseBody
	public String deleteSxAdvice(@RequestParam("id") int id,
			HttpServletRequest request) {
		String response = surAdviceService.deleteSxAdvice(id, request);
		return response;
	}
	
	@RequestMapping(value = "/getprotype", method = RequestMethod.POST)
	@ResponseBody
	public List<ProcedureMasterDetails> getprotype(@RequestParam("id") int id) {
		List<ProcedureMasterDetails> response = surAdviceService.getProList(id);
		return response;
	}
	


}
