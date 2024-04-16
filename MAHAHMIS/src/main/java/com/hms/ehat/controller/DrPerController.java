package com.hms.ehat.controller;

import java.sql.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.DrPercentageDto;
import com.hms.ehat.dto.ProfeesVoucherMasterDto;
import com.hms.ehat.dto.ProfessionalFeesDto;
import com.hms.ehat.service.DrPerService;

@Controller
@RequestMapping(value = "/drPer")
public class DrPerController {

	@Autowired
	DrPerService drPerService;
	
	//Irfan Khan @date: 15-June-2017 @reason : To Save and Update percentage
	@RequestMapping(value = "/saveDrPercentage", method = RequestMethod.POST)
	@ResponseBody
	public String saveDrPercentage(@RequestParam("percentageDetails") String percentageDetails,HttpServletRequest request
			) {
		
		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		int perValue = drPerService.saveDrPercentage(percentageDetails,userId);
		
		return (perValue == 1) ? "Records Inserted Successfully"
				: (perValue == 2) ? "Record Updated Successfully" 
						: (perValue == 3) ?"Record Allready Exist!!!"
								:"Network Error!!";
	}
	
	// Irfan Khan @date: 15-June-2017 @reason : To Fetch all records
	@RequestMapping(value = "/fetchAllRecords", method = RequestMethod.POST)
	public @ResponseBody
	DrPercentageDto getAllRecords() {
		DrPercentageDto drPercentageDto = new DrPercentageDto();
		drPercentageDto = drPerService.getAllRecords();
		return drPercentageDto;
		
	}
	
	//Irfan Khan @date: 15-June-2017 @reason : To delete record
	@RequestMapping(value = "/deleteDrPer", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDrPer(@RequestParam("drPercentageId") int drPercentageId,HttpServletRequest request) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		boolean response = drPerService.deleteDrPer(drPercentageId, userId);
		
		return (response == true) ? "Records Deleted Sucessfully" : "Oops Some Problem Ocured";
	}
	
	// Irfan Khan @date: 15-June-2017 @reason : To Fetch all records
	@RequestMapping(value = "/fetchTestListForDr", method = RequestMethod.POST)
	public @ResponseBody
	ProfessionalFeesDto fetchTestListForDr(@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,
			@RequestParam("deptId") int deptId,
			@RequestParam("serviceId") int serviceId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {
		ProfessionalFeesDto professionalFeesDto = new ProfessionalFeesDto();
		professionalFeesDto = drPerService.fetchTestListForDr(doctorId,unitId,deptId,serviceId,fromDate,toDate);
		return professionalFeesDto;

	}
	
	// Irfan Khan @date: 15-June-2017 @reason : To Save and Update percentage
	@RequestMapping(value = "/saveProfeesVoucher", method = RequestMethod.POST)
	@ResponseBody
	public String saveProfeesVoucher(
			@RequestParam("vocherMasterDetails") String vocherMasterDetails,
			@RequestParam("voucherSlaveDetails") String voucherSlaveDetails,
			HttpServletRequest request) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		int perValue = drPerService.saveProfeesVoucher(vocherMasterDetails,voucherSlaveDetails, userId);

		return (perValue == 1) ? "Records Inserted Successfully"
				: (perValue == 2) ? "Record Updated Successfully"
						: (perValue == 3) ? "Record Allready Exist!!!"
								: "Network Error!!";
	}
	
	// Irfan Khan @date: 23-June-2017 @reason : To Fetch Voucher
	@RequestMapping(value = "/fetchAllGenVouchers", method = RequestMethod.POST)
	public @ResponseBody
	ProfeesVoucherMasterDto fetchAllGenVouchers(
			@RequestParam("voucherMasterId") int voucherMasterId,
			@RequestParam("callFrom") String callFrom) {
		ProfeesVoucherMasterDto profeesVoucherMasterDto = new ProfeesVoucherMasterDto();
		profeesVoucherMasterDto = drPerService.fetchAllGenVouchers(voucherMasterId,callFrom);
		return profeesVoucherMasterDto;
	}
	
	// Irfan Khan @date: 23-June-2017 @reason : To Fetch Voucher
	@RequestMapping(value = "/viewVoucherById", method = RequestMethod.POST)
	public @ResponseBody
	ProfeesVoucherMasterDto viewVoucherById(
			@RequestParam("voucherMasterId") int voucherMasterId,
			@RequestParam("callFrom") String callFrom) {
		ProfeesVoucherMasterDto profeesVoucherMasterDto = new ProfeesVoucherMasterDto();
		profeesVoucherMasterDto = drPerService.viewVoucherById(
				voucherMasterId, callFrom);
		return profeesVoucherMasterDto;
	}
	
	// Irfan Khan @date: 23-June-2017 @reason : cancel generated voucher
	@RequestMapping(value = "/cancelGenratedVoucher", method = RequestMethod.POST)
	@ResponseBody
	public String cancelGenratedVoucher(
			@RequestParam("voucherMasterId") int voucherMasterId,
			@RequestParam("narration") String narration,
			HttpServletRequest request) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		int perValue = drPerService.cancelGenratedVoucher(voucherMasterId,
				narration, userId);

		return (perValue == 0) ? "Voucher Canceled Successfully!"
				: (perValue == 1) ? "Alerady Canceled"
								: "Network Error!!";
	}
	
	// Irfan Khan @date: 23-June-2017 @reason : To Fetch all records
	@RequestMapping(value = "/proFeesfetchReports1", method = RequestMethod.POST)
	public @ResponseBody
	ProfessionalFeesDto proFeesfetchReports1(
			@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,
			@RequestParam("deptId") int deptId,
			@RequestParam("serviceId") int serviceId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {
		ProfessionalFeesDto professionalFeesDto = new ProfessionalFeesDto();
		professionalFeesDto = drPerService.proFeesfetchReports1(doctorId,fromDate, toDate,unitId,deptId,serviceId);
		return professionalFeesDto;

	}
}
