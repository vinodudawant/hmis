package com.hms.administrator.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.LedgerHead;
import com.hms.administrator.dto.district_taluka_city;
import com.hms.administrator.service.MastersService;

@RestController
@RequestMapping(value = "/admin")
public class MastersController {

	@Autowired
	MastersService mastersService;
	
	
	@RequestMapping(value = "/getnextid", method = RequestMethod.GET)
	public Integer getNextId(@RequestParam("callFrom") String callFrom) {
		return mastersService.getNextId(callFrom);
	}
	
	@RequestMapping(value = "/savevouchermaster", method = RequestMethod.POST)
	public String saveVoucherMaster(ExpenseVoucherGroup dto, HttpServletRequest request) {
		return mastersService.saveVoucherMaster(dto, request);
	}
	
	@RequestMapping(value = "/getallvouchers", method = RequestMethod.GET)
	public ExpenseVoucherGroup getAllVouchers(@RequestParam("callFrom") String callFrom) {
		return mastersService.getAllVouchers(callFrom);
	}
	
	@RequestMapping(value = "/editvoucher/{id}", method = RequestMethod.GET)
	public ExpenseVoucherGroup editVoucher(@PathVariable("id") Integer voucherId) {
		return mastersService.editVoucher(voucherId);
	}
	
	@RequestMapping(value = "/deletevoucher/{id}", method = RequestMethod.DELETE)
	public boolean deleteVoucher(@PathVariable("id") Integer voucherId, HttpServletRequest request){
		return mastersService.deleteVoucher(voucherId, request);
	}
	
	@RequestMapping(value = "/searchvoucher", method = RequestMethod.GET)
	public ExpenseVoucherGroup searchVoucher(@RequestParam("searchText") String searchText, @RequestParam("callFrom") String callFrom) {
		return mastersService.searchVoucher(searchText, callFrom);
	}
	
	
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

	@RequestMapping(value = "/savereasonofvisit", method = RequestMethod.POST)
	public String saveReasonOfVisit(district_taluka_city dto, @RequestParam("moduleId") Integer moduleId, HttpServletRequest request) {
		return mastersService.saveReasonOfVisit(dto, moduleId, request);
	}
	
	@RequestMapping(value = "/getallreasons", method = RequestMethod.GET)
	public district_taluka_city getAllReasons(@RequestParam("searchText") String searchText, String callFrom) {
		return mastersService.getAllReasons(searchText, callFrom);
	}
	
	@RequestMapping(value = "/editreason/{id}", method = RequestMethod.GET)
	public district_taluka_city editReason(@PathVariable("id") Integer reasonId) {
		return mastersService.editReason(reasonId);
	}
	
	@RequestMapping(value = "/deletereason/{id}", method = RequestMethod.DELETE)
	public boolean deleteReason(@PathVariable("id") Integer reasonId, HttpServletRequest request){
		return mastersService.deleteReason(reasonId, request);
	}
	
	@RequestMapping(value = "/fetchTitleGender", method = RequestMethod.GET)
	public String fetchTitleGender(@RequestParam("title") String title){
		return mastersService.fetchTitleGender(title);
	}
}