package com.hms.ehat.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.controller.ChannelDoctorMgmtController;
import com.hms.administrator.dto.Chanelling_doctor;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.PercentMasterDto;
import com.hms.ehat.dto.PercentMasterReferalDocDto;
import com.hms.ehat.dto.PercentSlaveDto;
import com.hms.ehat.dto.PercentSlaveReferalDocDto;
import com.hms.ehat.dto.ProfeesDoctorsPaymentDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.ReferalDocService;

@Controller
@RequestMapping(value = "/referaldoc")
public class ReferalDocController {
	
	@Autowired 
	ReferalDocService refService;

	static Logger log=Logger.getLogger(ChannelDoctorMgmtController.class.getName());
	
	/*******
	 * @author      :Rohini Ambhore
	 * @Date        :28-02-2024
	 * ********/
	
	@RequestMapping(value = "/setAutoSugForRefDoctorList", method = RequestMethod.POST)
	public @ResponseBody
	DoctorDto setAutoSugForRefDoctorList(@RequestParam("letter") String letter,@RequestParam("callFrom") String callFrom
			,@RequestParam("specialisationId") int specialisationId) {
		log.info("saverefertodoc..");
		List<DoctorDto> listDoc = new ArrayList<DoctorDto>();
		listDoc = refService.setAutoSugForDoctorList(letter,callFrom,specialisationId);

		log.debug("saverefertodoc....."+listDoc);
		DoctorDto obj = new DoctorDto();
		obj.setLstDoctorDto(listDoc);
		return obj;
	}
	
	@RequestMapping(value = "/savePerMasterForRefDoc", method = RequestMethod.POST)
	@ResponseBody
	public String savePerMasterForRefDoc(
			@RequestParam("percentMasterList") String percentMasterList,
			HttpServletRequest request, @RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,
			@RequestParam("drDeptId") int drDeptId,
			@RequestParam("callFrom") String callFrom,
			@RequestParam("caseType") int caseType,
			@RequestParam("paymentType") int paymentType,
			@RequestParam("chargesId") int chargesId,
			@RequestParam("chargesSlaveId") int chargesSlaveId) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		int perValue = refService.savePerMasterForRefDoc(percentMasterList,
				userId, doctorId, unitId, callFrom, caseType,paymentType, drDeptId,
				chargesId, chargesSlaveId);

		return (perValue == 1) ? "Records Inserted Successfully"
				: (perValue == 2) ? "Record Updated Successfully"
						: (perValue == 3) ? "Record Allready Exist!!!"
								: (perValue == 4) ? "Doctor Is Not Available In This Department!!!"
										: "Network Error!!";
	}
	
	
	@RequestMapping(value = "/getDrForRefDocDeptList", method = RequestMethod.POST)
	public @ResponseBody
	PercentMasterReferalDocDto getDrForRefDocDeptList(@RequestParam("callFrom") String callFrom,
			@RequestParam("letter") String letter) {
		PercentMasterReferalDocDto percentMasterObj = new PercentMasterReferalDocDto();
		percentMasterObj = refService.getDrForRefDocDeptList(callFrom,letter);
		return percentMasterObj;

	}
	
	
	@RequestMapping(value = "/getRefDrPersonalList", method = RequestMethod.POST)
	public @ResponseBody
	PercentMasterReferalDocDto getRefDrPersonalList(@RequestParam("callFrom") String callFrom,
			@RequestParam("callSearch") String callSearch,
			@RequestParam("letter") String letter) {
		PercentMasterReferalDocDto percentMasterObj = new PercentMasterReferalDocDto();
		percentMasterObj = refService.getRefDrPersonalList(callFrom,callSearch,letter);
		return percentMasterObj;

	}
	
	@RequestMapping(value = "/deleteReferalDoctAndGroupById", method = RequestMethod.POST)
	public @ResponseBody
	String deleteReferalDoctAndGroupById(@RequestParam("docId") Integer docId,
			@RequestParam("caseType") Integer caseType,
			@RequestParam("unitId") Integer unitId,@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			HttpServletRequest request) {
				int response = refService.deleteReferalDoctAndGroupById(docId,
				request,caseType,unitId,chargesSlaveId);
		String msg = "";
		if (response == 1) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	//@author : Rohini Ambhore @date: 28-feb-2024 @reason : To Fetch record by drid and unitid of referal doctor
	
	@RequestMapping(value = "/editPercentMasterReferal", method = RequestMethod.POST)
	public @ResponseBody
	PercentMasterReferalDocDto editPercentMasterReferal(@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,@RequestParam("caseType") int caseType,@RequestParam("chargesSlaveId") int chargesSlaveId) {
		PercentMasterReferalDocDto percentMasterDto = new PercentMasterReferalDocDto();
		percentMasterDto = refService.editPercentMasterReferal(doctorId,unitId,caseType,chargesSlaveId);
		return percentMasterDto;

	}
	
	//Rohini Ambhore -- Fetching super master of service based on there id 29-Mar-2024
		@RequestMapping(value = "/fetchSuperCatPrcentMasterReferal", method = RequestMethod.POST)
		public @ResponseBody ChargesMasterSlave fetchSuperCatPrcentMasterReferal(
				@RequestParam("chargesMasterDto") Integer chargesMasterDto) {
			List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
			ltSubCharges = refService.fetchSuperCatPrcentMasterReferal(chargesMasterDto);
			ChargesMasterSlave obj = new ChargesMasterSlave();
			// obj.setLstSubService(ltSubService);
			obj.setLstChargesSlave(ltSubCharges);
			return obj;
		}
	
		@RequestMapping(value = "/getdoctorNameOfRef", method = RequestMethod.POST)
		public @ResponseBody
		Chanelling_doctor getdoctorNameOfRef(@RequestParam("doctorId") int doctorId) {
		
			Chanelling_doctor doctordto = refService.getdoctorNameOfRef(doctorId);
			return doctordto;

		}
		
		/*******
		 * @author      :Rohini Ambhore
		 * @Date        :28-02-2024
		 * @Code        :For services and leaf services for referal percentage master 
		 * ********/
		@RequestMapping(value = "/getSubServicesFoprofees", method = RequestMethod.POST)
		public @ResponseBody
		SubServiceDto getSubServicesFoprofees(@RequestParam("masterId") Integer masterId,
				@RequestParam("selfId") Integer selfId,HttpServletRequest request) {

			List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
			ltSubService = refService.getSubServicesFoprofees(masterId, selfId);
			SubServiceDto obj = new SubServiceDto();
			obj.setLstSubService(ltSubService);
			
			List<DeptMasterDto> ltDeptMasters = new ArrayList<DeptMasterDto>();
			ltDeptMasters = refService.getDeptMasterListAll(request);
						
			obj.setLstDepts(ltDeptMasters);
			return obj;
		}
		
		
		// @author      :Rohini Ambhore @Date   :28-02-2024 @reason : fetch sub service % from referal perSlave
		@RequestMapping(value = "/fetchAndSetSubServiceOnEditReferal", method = RequestMethod.POST)
		public @ResponseBody
		PercentSlaveReferalDocDto fetchAndSetSubServiceOnEditReferal(@RequestParam("serviceId") int serviceId,
				@RequestParam("unitId") int unitId,@RequestParam("doctorId") int doctorId,
				@RequestParam("drDeptId") int drDeptId,@RequestParam("caseType") int caseType,
				@RequestParam("chargesId") int chargesId,@RequestParam("chargesSlaveId") int chargesSlaveId) {
			
			List<PercentSlaveReferalDocDto> listPerSlave = new ArrayList<PercentSlaveReferalDocDto>();
			listPerSlave = refService.fetchAndSetSubServiceOnEditReferal(serviceId, unitId,doctorId,
					drDeptId, caseType,chargesId,chargesSlaveId);

			PercentSlaveReferalDocDto obj = new PercentSlaveReferalDocDto();
			obj.setListPerSlave(listPerSlave);
			return obj;
		}
		
		// Rohini Ambhore @date: 24-Mar-2024 @reason : To fetch paid records of doctor.
		@RequestMapping(value = "/referalFeesDoctorPayment", method = RequestMethod.GET)
		public @ResponseBody
		ProfeesDoctorsPaymentDto referalFeesDoctorPayment(
				@RequestParam("doctorId") int doctorId,
				@RequestParam("unitId") int unitId,
				@RequestParam("deptId") int deptId,
				@RequestParam("serviceId") String serviceId,
				@RequestParam("specialisationId") int specialisationId,
				@RequestParam("billTypeId") int billTypeId,
				@RequestParam("fromDate") Date fromDate,
				@RequestParam("toDate") Date toDate, HttpServletRequest request) {
			// current login user id
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			ProfeesDoctorsPaymentDto profeesDoctorsPaymentDto = new ProfeesDoctorsPaymentDto();
			profeesDoctorsPaymentDto = refService.proFeesDoctorPayment(
					doctorId, fromDate, toDate, unitId, deptId, serviceId, userId, specialisationId, billTypeId);
			return profeesDoctorsPaymentDto;

		}
}
