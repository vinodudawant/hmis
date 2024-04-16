package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.AdminCashVoucherDTO;
import com.hms.administrator.service.AdminCashVoucherService;
import com.hms.ehat.dto.Doctor;

@RestController
@RequestMapping(value = "/cashvoucher")
public class AdminCashVoucherController {
	
	@Autowired
	AdminCashVoucherService adminCashVoucherService;
	
	
/***************************************************************************
 * @author Ganesh Patil
 * @since 28-01-2020
 * @comment This method is to get All Authorised Doctor
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/getAllAuthorisedDoctor", method = RequestMethod.GET)
	public Doctor getAllAuthorisedDoctor() {
		List<Doctor> doctorList=new ArrayList<Doctor>();
		doctorList =adminCashVoucherService.getAllAuthorisedDoctor();
		Doctor doctorDetail= new Doctor();
		doctorDetail.setListDoctorDetailsDto(doctorList);
		return doctorDetail;
	}
	
/***************************************************************************
 * @author Ganesh Patil
 * @since 28-01-2020
 * @comment This method is to get All General Voucher  
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/getAllCashVoucher", method = RequestMethod.GET)
	public AdminCashVoucherDTO getAllCashVoucher() {
		List<AdminCashVoucherDTO> cashList=new ArrayList<AdminCashVoucherDTO>();
		cashList =adminCashVoucherService.getAllCashVoucher();
		AdminCashVoucherDTO adminCashVoucher= new AdminCashVoucherDTO();
		adminCashVoucher.setCashVouchersList(cashList);
		return adminCashVoucher;
		}
		
/***************************************************************************
 * @author Ganesh Patil
 * @since 28-01-2020
 * @comment This method is to save Cash Voucher  
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/saveCashVoucher", method = RequestMethod.POST)
		public int saveCashVoucher(@RequestParam("cashVoucher")String cashVoucher,HttpServletRequest request) {
		System.out.println(cashVoucher);
		int response =adminCashVoucherService.saveCashVoucher(cashVoucher, request);
			return response;
		}

/***************************************************************************
 * @author Ganesh Patil
 * @since 28-01-2020
 * @comment This method is to Cancel Cash Voucher  
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/cancelCashVoucher", method = RequestMethod.POST)
		public boolean cancelCashVoucher(@RequestParam("voucherId") int voucherId,HttpServletRequest request) {
		boolean flag;
		flag =adminCashVoucherService.cancelCashVoucher(voucherId,request);
		return flag;
		}
	
	
/***************************************************************************
 * @author Ganesh Patil
 * @since 28-01-2020
 * @comment This method is to get All Cancel Cash Voucher  
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/getAllCancelCashVoucher", method = RequestMethod.POST)
	public AdminCashVoucherDTO getAllCancelCashVoucher() {
		List<AdminCashVoucherDTO> cancelCashList=new ArrayList<AdminCashVoucherDTO>();
		cancelCashList =adminCashVoucherService.getAllCancelCashVoucher();
		AdminCashVoucherDTO adminCashVoucher= new AdminCashVoucherDTO();
		adminCashVoucher.setCashVouchersList(cancelCashList);
		return adminCashVoucher;
	}
		
/***************************************************************************
 * @author Ganesh Patil
 * @since 28-01-2020
 * @comment This method is to get All Cancel Cash Voucher  
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/searchVoucherBy", method = RequestMethod.POST)
	public AdminCashVoucherDTO searchVoucherBy(@RequestParam("name") String name,HttpServletRequest request) {
		List<AdminCashVoucherDTO> cancelCashList=new ArrayList<AdminCashVoucherDTO>();
		cancelCashList =adminCashVoucherService.searchVoucherBy(name,request);
		AdminCashVoucherDTO adminCashVoucher= new AdminCashVoucherDTO();
		adminCashVoucher.setCashVouchersList(cancelCashList);
		return adminCashVoucher;
		}
	
		
	public AdminCashVoucherDTO fetchVoucherForPrint(@RequestParam("voucherID") int voucherID,
		    HttpServletRequest request) {
		    List < AdminCashVoucherDTO > fetchData = new
		    ArrayList < AdminCashVoucherDTO > ();
		    fetchData =
		        adminCashVoucherService.fetchVoucherForPrint(voucherID, request);
		    AdminCashVoucherDTO CashVoucher = new AdminCashVoucherDTO();
		    CashVoucher.setCashVouchersList(fetchData);
		    return CashVoucher;
		}
		 
	
}
