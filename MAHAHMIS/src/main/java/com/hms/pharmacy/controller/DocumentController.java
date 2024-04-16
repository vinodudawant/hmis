package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.service.DocumentService;

@Controller
@RequestMapping(value = "/document")
public class DocumentController {

	@Autowired
	DocumentService documentService;

	@RequestMapping(value = "/view_doc", method = RequestMethod.GET)
	public ModelAndView getDoctorView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("document", new DocumentMaster());

		List<DocumentMaster> ltDocumentMaster = new ArrayList<DocumentMaster>();
		ltDocumentMaster = documentService.getDocuments();
		modelAndView.addObject("ltDocumentMaster", ltDocumentMaster);

		
		modelAndView.setViewName("Pharma_Document_Master");
		return modelAndView;
	}

	@RequestMapping(value = "/save_document", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDocument(
			@ModelAttribute("document") DocumentMaster documentMaster) {
		ModelAndView modelAndView = new ModelAndView();
		if (documentService.saveOrUpdateDocument(documentMaster)) {
			if (documentMaster.getDocId() != null) {
				modelAndView.addObject("msg",
						"Record saved successfully..!");
			
				
			} else {
				modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("duplicate", "! Duplicate Document can not save..!");
		}
		modelAndView.setViewName("redirect:/pharmacy/document/view_doc");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteDocument(@RequestParam("documentId") Integer documentId) {
		Boolean flag = false;
		if (documentService.deleteDocument(documentId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/documentsList", method = RequestMethod.GET)
	public @ResponseBody
	List<DocumentMaster> getDocumentsList() {
		List<DocumentMaster> ltDocumentMaster = new ArrayList<DocumentMaster>();
		ltDocumentMaster = documentService.getDocuments();
		return ltDocumentMaster;
	}

	@RequestMapping(value = "/autoSuggestionDocumentNames", method = RequestMethod.GET)
	public @ResponseBody
	List<DocumentMaster> getAutoSuggestionDocumentNames(
			@RequestParam("letter") String letter) {
		List<DocumentMaster> ltDocumentMaster = new ArrayList<DocumentMaster>();
		ltDocumentMaster = documentService
				.getAutoSuggestionDocumentNames(letter);
		return ltDocumentMaster;
	}

	
	@RequestMapping(value = "/getDocumentById", method = RequestMethod.GET)
	public @ResponseBody List<DocumentMaster> getDocumentById(@RequestParam("documentId")Integer documentId)
	{
		List<DocumentMaster> ltDocumentMasters = new ArrayList<DocumentMaster>();
		ltDocumentMasters = documentService.getDocumentById(documentId);
		return ltDocumentMasters;
	}
	
}

	
	