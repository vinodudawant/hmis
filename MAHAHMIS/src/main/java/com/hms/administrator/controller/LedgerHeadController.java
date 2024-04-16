package com.hms.administrator.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.LedgerHead;
import com.hms.administrator.service.LedgerHeadService;

@RestController
@RequestMapping(value = "/ledgerhead")
public class LedgerHeadController {

	@Autowired
	LedgerHeadService mastersService;
	
	@RequestMapping(value = "/saveledgerhead", method = RequestMethod.POST)
	public String saveLedgerHead(LedgerHead dto, @RequestParam("voucherId") Integer voucherId, HttpServletRequest request) {
		return mastersService.saveLedgerHead(dto, voucherId, request);
	}
	
	@RequestMapping(value = "/getallledgerheads", method = RequestMethod.GET)
	public LedgerHead getAllLedgerHeads(@RequestParam("searchText") String searchText, String callFrom) {
		return mastersService.getAllLedgerHeads(searchText, callFrom);
	}

	@RequestMapping(value = "/editledgerhead/{id}", method = RequestMethod.GET)
	public LedgerHead editLedgerHead(@PathVariable("id") Integer ledgerHeadId) {
		return mastersService.editLedgerHead(ledgerHeadId);
	}
	
	@RequestMapping(value = "/deleteledgerhead/{id}", method = RequestMethod.DELETE)
	public boolean deleteLedgerHead(@PathVariable("id") Integer ledgerHeadId, HttpServletRequest request){
		return mastersService.deleteLedgerHead(ledgerHeadId, request);
	}
}
