package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.service.DoctordeskformulaService;
import com.hms.ehat.dto.FormulaDto;

@Controller
@RequestMapping(value="formulacontroller")
public class DoctordeskformulaController {
	
	@Autowired
	DoctordeskformulaService doctordeskformulaservice;
	
	@RequestMapping(value = "/doctordeskcalculateFormula", method = RequestMethod.POST)
	public @ResponseBody
	FormulaDto calculateFormula(@RequestParam("formulaId") List<Integer> formulaId,@RequestParam("letter") String letter,
			@RequestParam("callfrom") String callfrom,@RequestParam("pid") Integer pid,@RequestParam("tid") Integer tid,
			
			HttpServletRequest request) {

		List<FormulaDto> listFormula = new ArrayList<FormulaDto>();

		FormulaDto obj = new FormulaDto();
		// function call
		listFormula = doctordeskformulaservice.calculateFormula(formulaId,callfrom,letter,pid,tid);
		
		obj.setListFormula(listFormula);
		// return result to js
		return obj;
	}

}
