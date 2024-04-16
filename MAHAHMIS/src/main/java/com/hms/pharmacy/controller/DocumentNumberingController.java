package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.FinancialYearMaster;
import com.hms.pharmacy.service.DocumentNumberingService;
import com.hms.pharmacy.service.DocumentService;
import com.hms.pharmacy.service.YearService;

@Controller
@RequestMapping(value = "/documentNum")
public class DocumentNumberingController {

	@Autowired
	DocumentNumberingService docNumService;

	@Autowired
	DocumentService documentService;

	@Autowired
	YearService yearService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getDocumentNumView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("documentNumbering",
				new DocumentNumberingMaster());

		List<DocumentMaster> ltDocumentMaster = new ArrayList<DocumentMaster>();
		ltDocumentMaster = documentService.getDocuments();
		modelAndView.addObject("ltDocumentMaster", ltDocumentMaster);

		List<FinancialYearMaster> ltYearMaster = new ArrayList<FinancialYearMaster>();
		ltYearMaster = yearService.getYear();
		modelAndView.addObject("ltYearMaster", ltYearMaster);

		List<DocumentNumberingMaster> ltDocumentNumberingMasters = new ArrayList<DocumentNumberingMaster>();
		ltDocumentNumberingMasters = docNumService.getDocumentNumberings();
		modelAndView.addObject("ltDocumentNumberingMasters",
				ltDocumentNumberingMasters);

		modelAndView.setViewName("Pharma_document_numbering");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDoctor(
			@ModelAttribute("docNumMaster") DocumentNumberingMaster docNumMaster) {
		ModelAndView modelAndView = new ModelAndView();
		if (docNumService.saveOrUpdateDocumentNumbering(docNumMaster)) {
			if (docNumMaster.getDocNumId() != null) {
				modelAndView.addObject("success",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("success",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		modelAndView.setViewName("redirect:/pharmacy/documentNum/view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteDocNum(@RequestParam("documentNumId") Integer docNumId) {
		Boolean flag = false;
		if (docNumService.deleteDocumentNumbering(docNumId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/docNumsList", method = RequestMethod.GET)
	public @ResponseBody
	List<DocumentNumberingMaster> getDocNumsList() {
		List<DocumentNumberingMaster> ltDocNumMaster = new ArrayList<DocumentNumberingMaster>();
		ltDocNumMaster = docNumService.getDocumentNumberings();
		return ltDocNumMaster;
	}

	@RequestMapping(value = "/getDocNumById", method = RequestMethod.GET)
	public @ResponseBody
	List<DocumentNumberingMaster> getDocNumById(
			@RequestParam("docNumId") Integer docNumId) {
		List<DocumentNumberingMaster> ltDocNumMaster = new ArrayList<DocumentNumberingMaster>();
		ltDocNumMaster = docNumService.getDocumentNumberingById(docNumId);
		return ltDocNumMaster;
	}
}
