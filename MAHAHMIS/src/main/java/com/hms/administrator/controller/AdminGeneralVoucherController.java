package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.service.AdminGeneralVoucherService;
import com.hms.administrator.dto.AdminGeneralVoucherDTO;

@RestController
@RequestMapping(value = "/generalvoucher")
public class AdminGeneralVoucherController {
	
	@Autowired
	AdminGeneralVoucherService adminGeneralVoucherService;
	

/***************************************************************************
 * @author Ganesh Patil
 * @since 28-01-2020
 * @comment This method is to save general Voucher 
 * @param request
 * @return    
 * **************************************************************************/
		@RequestMapping(value = "/saveGeneralVoucher", method = RequestMethod.POST)
		public int saveGeneralVoucher(AdminGeneralVoucherDTO generalVoucher,HttpServletRequest request) {
			System.out.println(generalVoucher);
			int response =adminGeneralVoucherService.saveGeneralVoucher(generalVoucher, request);
			return response;
		}

		
		
/***************************************************************************
* @author Ganesh Patil
* @since 28-01-2020
* @comment This method is to fetch all General Voucher List
* @param request
* @return    
***************************************************************************/
@RequestMapping(value = "/getAllGeneralVoucher", method = RequestMethod.GET)
	public AdminGeneralVoucherDTO getAllGeneralVoucher() {
	List<AdminGeneralVoucherDTO> generalVoucherList=new ArrayList<AdminGeneralVoucherDTO>();
	generalVoucherList = adminGeneralVoucherService.getAllGeneralVoucher();
	AdminGeneralVoucherDTO vouchers =new AdminGeneralVoucherDTO();
	vouchers.setVoucherList(generalVoucherList);
	return  vouchers;
	}




/***************************************************************************
 * @author Ganesh Patil
 * @since 28-01-2020
 * @comment This method is to edit City By Id
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/editVoucherById", method = RequestMethod.POST)
	public  AdminGeneralVoucherDTO editVoucherById(@RequestParam("voucherId") int voucherId,HttpServletRequest request) {
		AdminGeneralVoucherDTO generalVoucherDTO =new AdminGeneralVoucherDTO();
		generalVoucherDTO = adminGeneralVoucherService.editVoucherById(voucherId,request);
		return  generalVoucherDTO;
	}

	
	
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 28-01-2020
 * @comment This method is to delete Genral Voucher By Id
 * @param request  taluka_id
 * @return
 ************************************************************************/
	@RequestMapping(value = "/deleteVoucherById", method = RequestMethod.POST)
		public  boolean deleteVoucherById(@RequestParam("voucherId") int voucherId,HttpServletRequest request) {
			boolean flag;
			flag = adminGeneralVoucherService.deleteVoucherById(voucherId,request);
			return  flag;
		}

/*************************************************************************
 * @author Ganesh Patil
 * @since 28-01-2020
 * @comment This method is to search General Voucher By Name
 * @param request  
 * @return
 ************************************************************************/
	@RequestMapping(value = "/searchVoucherByName", method = RequestMethod.POST)
	public  AdminGeneralVoucherDTO searchVoucherByName(@RequestParam("searchName") String name,HttpServletRequest request) {
		List<AdminGeneralVoucherDTO> voucherList=new ArrayList<AdminGeneralVoucherDTO>();
		voucherList = adminGeneralVoucherService.searchVoucherByName(name,request);
		AdminGeneralVoucherDTO voucherDTO =new AdminGeneralVoucherDTO();
		voucherDTO.setVoucherList(voucherList);
		return  voucherDTO;
	}


}
