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

import com.hms.administrator.dto.ICD10_L;
import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.doctordesk.service.DiagonosisService;

@Controller
@RequestMapping(value = "/diagonosis")
public class DiagonosisController {

	@Autowired
	DiagonosisService diagonosisService;

	@RequestMapping(value = "/diagosAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public List<ICD10_L> getDiagosAutoSuggestion(@RequestParam("callform") String callform,
			@RequestParam("diagoName") String searchText, @RequestParam("diagoType") int diagoType,HttpServletRequest request) {
		System.out.println("calform" + callform);
		List<ICD10_L> response = diagonosisService.diagonosisAutoSuggestion(searchText, callform, diagoType,request);
		return response;
	}

	@RequestMapping(value = "/digoById", method = RequestMethod.POST)
	@ResponseBody
	public List<ICD10_L> getDiagosById(@RequestParam("id") int id) {
		List<ICD10_L> response = diagonosisService.getDiagonosisById(id);
		return response;
	}

	@RequestMapping(value = "/lisofDiagonosis", method = RequestMethod.POST)
	@ResponseBody
	public List<DiagonosisMasterDto> getListOfDiagonosis(@RequestParam("treatmentId") int treatmentId) {
		List<DiagonosisMasterDto> response = diagonosisService.getListOfDiagoList(treatmentId);
		return response;

	}

	@RequestMapping(value = "/getdiagonosisById", method = RequestMethod.POST)
	@ResponseBody
	public List<DiagonosisMasterDto> getDiagonosisById(@RequestParam("id") int id) {
		List<DiagonosisMasterDto> response = diagonosisService.getListOfDiagoListById(id);
		return response;
	}

	@RequestMapping(value = "/savediagonosis", method = RequestMethod.POST)
	@ResponseBody
	public String saveDiagonosisById(DiagonosisMasterDto diagonosisMasterDto, @RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {
		
		String response = diagonosisService.saveDiagonosisData(diagonosisMasterDto,patientId,treatmentId,  request);
		return response;
	}

	@RequestMapping(value = "/deleteDiagonosis", method = RequestMethod.POST)
	@ResponseBody
	public String deleteDiagonosisById(@RequestParam("id") String id, HttpServletRequest request) {
		String response = diagonosisService.deleteDiagonosis(id, request);
		return response;
	}
	
	
	@RequestMapping(value = "/updateDignosisStatus", method = RequestMethod.POST)
	@ResponseBody
	public String updateDignosisStatus(@RequestParam("id") String id,@RequestParam("userId") Integer userId, @RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		String response = diagonosisService.updateDignosisStatus(id, userId, callFrom, request);
		return response;
	}


}