package com.hms.administrator.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.service.ExpenseVoucherService;

@RestController
@RequestMapping(value = "/expensevoucher")
public class ExpenseVoucherController {

	@Autowired
	ExpenseVoucherService mastersService;
	
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
}
