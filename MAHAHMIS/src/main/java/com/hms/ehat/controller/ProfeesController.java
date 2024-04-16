package com.hms.ehat.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.dto.Doctor;
import com.hms.dto.HisabProFeesDTO;
import com.hms.dto.Users;
import com.hms.ehat.dto.AllPfPostedRecordsDto;
import com.hms.ehat.dto.AreaWisePatientViewDto;
import com.hms.ehat.dto.AreaWisePatientViewDto2;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.DrPaymentVoucherDto;
import com.hms.ehat.dto.DynamicGroupMasterDto;
import com.hms.ehat.dto.DynamicGroupSlaveDto;
import com.hms.ehat.dto.GroupMasterDto;
import com.hms.ehat.dto.GroupReceiptSlaveDetails;
import com.hms.ehat.dto.GroupSlaveDto;
import com.hms.ehat.dto.HospitalReport;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.ehat.dto.PatientOutStandingReport;
import com.hms.ehat.dto.PercentMasterDto;
import com.hms.ehat.dto.PercentSlaveDto;
import com.hms.ehat.dto.ProfeesDoctorsPaymentDto;
import com.hms.ehat.dto.RefDoctorDTO;
import com.hms.ehat.dto.ReferDrPaymentVoucherDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.ProfeesService;

@Controller
@RequestMapping(value = "/profees")
public class ProfeesController {
	
	@Autowired
	ProfeesService profeesService;
	
	// Irfan Khan @date: 15-July-2017 @reason : To Fetch all records
	@RequestMapping(value = "/fetchDeptAndServices", method = RequestMethod.POST)
	public @ResponseBody
	DeptMasterDto fetchDeptAndServices() {
		DeptMasterDto deptMasterDto = new DeptMasterDto();
		deptMasterDto = profeesService.fetchDeptAndServices();
		return deptMasterDto;

	}
	
	// Irfan Khan @date: 19-July-2017 @reason : To Save and Update percentage
	@RequestMapping(value = "/savePercentMaster", method = RequestMethod.POST)
	@ResponseBody
	public String savePercentMaster(
			@RequestParam("percentMasterList") String percentMasterList,
			HttpServletRequest request,@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,@RequestParam("drDeptId") int drDeptId,
			@RequestParam("callFrom") String callFrom,@RequestParam("caseType") int caseType,
			@RequestParam("chargesId") int chargesId,@RequestParam("chargesSlaveId") int chargesSlaveId) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		int perValue = profeesService.savePercentMaster(percentMasterList, userId, doctorId, 
									unitId, callFrom, caseType, drDeptId,chargesId,chargesSlaveId);

		return (perValue == 1) ? "Records Inserted Successfully"
				: (perValue == 2) ? "Record Updated Successfully"
						: (perValue == 3) ? "Record Allready Exist!!!"
								: (perValue == 4) ? "Doctor Is Not Available In This Department!!!"
										: "Network Error!!";
	}
	
	// Irfan Khan @date: 22-Jan-2018 @reason : To save n update Advance percentage
	@RequestMapping(value = "/savePercentMaster2", method = RequestMethod.POST)
	@ResponseBody
	public String savePercentMaster2(
			@RequestParam("percentMasterList") String percentMasterList,
			HttpServletRequest request, @RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,
			@RequestParam("drDeptId") int drDeptId,
			@RequestParam("callFrom") String callFrom,
			@RequestParam("caseType") int caseType,
			@RequestParam("chargesId") int chargesId,
			@RequestParam("chargesSlaveId") int chargesSlaveId) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		int perValue = profeesService.savePercentMaster2(percentMasterList,
				userId, doctorId, unitId, callFrom, caseType, drDeptId,
				chargesId, chargesSlaveId);

		return (perValue == 1) ? "Records Inserted Successfully"
				: (perValue == 2) ? "Record Updated Successfully"
						: (perValue == 3) ? "Record Allready Exist!!!"
								: (perValue == 4) ? "Doctor Is Not Available In This Department!!!"
										: "Network Error!!";
	}
	
	// Irfan Khan @date: 19-July-2017 @reason : To Fetch all records
	@RequestMapping(value = "/fetchPercentRecords", method = RequestMethod.POST)
	public @ResponseBody
	PercentMasterDto fetchPercentRecords(@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,@RequestParam("callFrom") String callFrom,
			@RequestParam("caseType") int caseType) {
		PercentMasterDto percentMasterDto = new PercentMasterDto();
		percentMasterDto = profeesService.fetchPercentRecords(doctorId,unitId,caseType,callFrom);
		return percentMasterDto;

	}
	
	// Irfan Khan @date: 20-July-2017 @reason : To Fetch record by drid and unitid
	@RequestMapping(value = "/editPercentMaster", method = RequestMethod.POST)
	public @ResponseBody
	PercentMasterDto editPercentMaster(@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,@RequestParam("caseType") int caseType,@RequestParam("chargesSlaveId") int chargesSlaveId) {
		PercentMasterDto percentMasterDto = new PercentMasterDto();
		percentMasterDto = profeesService.editPercentMaster(doctorId,unitId,caseType,chargesSlaveId);
		return percentMasterDto;

	}
	
	// Irfan Khan @date: 12-Dec-2017 @reason : To Fetch record by Dr.Dept to edit and update
	@RequestMapping(value = "/updateDrDeptPercentMaster", method = RequestMethod.POST)
	public @ResponseBody
	PercentMasterDto updateDrDeptPercentMaster(@RequestParam("drDeptId") int drDeptId,
			@RequestParam("unitId") int unitId,@RequestParam("caseType") int caseType,
			@RequestParam("drDeptFlag") String drDeptFlag) {
		PercentMasterDto percentMasterDto = new PercentMasterDto();
		percentMasterDto = profeesService.updateDrDeptPercentMaster(drDeptId, unitId,caseType,drDeptFlag);
		return percentMasterDto;

	}
	
	// Irfan Khan @date: 20-July-2017 @reason : To Delete percentage records = N
	@RequestMapping(value = "/deletePercentRecord", method = RequestMethod.POST)
	@ResponseBody
	public String deletePercentRecord(
			HttpServletRequest request, @RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,@RequestParam("caseType") int caseType) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		int perValue = profeesService.deletePercentRecord(userId, doctorId, unitId, caseType);

		return (perValue == 1) ? "Records Deleted Successfully"
								: "Network Error!!";
	}
	
	// Irfan Khan @date: 24-July-2017 @reason : To fetch paid records of doctor.
	@RequestMapping(value = "/proFeesDoctorPayment", method = RequestMethod.GET)
	public @ResponseBody
	ProfeesDoctorsPaymentDto proFeesDoctorPayment(
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
		profeesDoctorsPaymentDto = profeesService.proFeesDoctorPayment(
				doctorId, fromDate, toDate, unitId, deptId, serviceId, userId, specialisationId, billTypeId);
		return profeesDoctorsPaymentDto;

	}
	
	//Irfan Khan @date: 7-Aug-2017 @reason : save voucher details
	@RequestMapping(value = "/saveDrPaymentVoucher", method = RequestMethod.POST)
	@ResponseBody
	public String saveDrPaymentVoucher(
			@RequestParam("voucherDetails") String voucherDetails,@RequestParam("profeesDetails") String profeesDetails,
			HttpServletRequest request) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		//int unitId = 1 Integer.parseInt(request.getParameter("uid"));
		int unitId = (Integer) session.getAttribute("uId");

		int perValue = profeesService.saveDrPaymentVoucher(voucherDetails,userId,unitId,profeesDetails);

		return (perValue == 1) ? "Records Inserted Successfully"
				: (perValue == 2) ? "Record Updated Successfully"
						: (perValue == 3) ? "Record Allready Exist!!!"
								: (perValue == 4) ? "Doctor inactive in group.!!!"
										: "Network Error!!";
	}
	
	// Irfan Khan @date: 11-Aug-2017 @reason : To Fetch all Vouchers
	@RequestMapping(value = "/fetchDoctorsVouchers", method = RequestMethod.POST)
	public @ResponseBody
	DrPaymentVoucherDto fetchDoctorsVouchers(
			@RequestParam("callFrom") String callFrom,
			@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,
			@RequestParam("deptId") int deptId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate
			) {
				
		DrPaymentVoucherDto drPaymentVoucherDto = new DrPaymentVoucherDto();
		drPaymentVoucherDto = profeesService.fetchDoctorsVouchers(callFrom, doctorId,unitId,deptId,fromDate,toDate);
		return drPaymentVoucherDto;

	}
	
	// Irfan Khan @date: 16-Aug-2017 @reason : To Cancel Voucher
	@RequestMapping(value = "/cancelVoucher", method = RequestMethod.POST)
	@ResponseBody
	public String cancelVoucher(
			HttpServletRequest request, @RequestParam("voucherId") int voucherId
			, @RequestParam("deptId") int deptId
			) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		int perValue = profeesService.cancelVoucher(userId, voucherId, deptId);

		return (perValue == 1) ? "Voucher Canceled Successfully"
								: "Network Error!!";
	}
	
	// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	@RequestMapping(value = "/proFeesDoctorsReport", method = RequestMethod.POST)
	public @ResponseBody
	ProfeesDoctorsPaymentDto proFeesDoctorsReport(
			@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,
			@RequestParam("deptId") int deptId,
			@RequestParam("serviceId") int serviceId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate, HttpServletRequest request) {
		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		objDto = profeesService.proFeesDoctorsReport(
				doctorId, fromDate, toDate, unitId, deptId, serviceId, userId);
		return objDto;

	}
	
	// Irfan Khan @date: 24-Aug-2017 @reason : save group details
	@RequestMapping(value = "/saveGroupDetails", method = RequestMethod.POST)
	@ResponseBody
	public String saveGroupDetails(
			@RequestParam("groupSlaveDetails") String groupSlaveDetails,
			@RequestParam("groupMasterDetails") String groupMasterDetails,@RequestParam("callFrom") String callFrom,
			HttpServletRequest request) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		// int unitId = 1 Integer.parseInt(request.getParameter("uid"));
		//int unitId = (Integer) session.getAttribute("uId");

		int perValue = profeesService.saveGroupDetails(groupSlaveDetails,groupMasterDetails,
				userId,callFrom);

		return (perValue == 1) ? "Records Inserted Successfully"
				: (perValue == 2) ? "Record Updated Successfully"
						: (perValue == 3) ? "Record Allready Exist!!!"
								: "Network Error!!";
	}
	
	// Irfan Khan @date: 28-Aug-2017 @reason : To Group master
	@RequestMapping(value = "/fetchGroupMasterList", method = RequestMethod.POST)
	public @ResponseBody
	GroupMasterDto fetchGroupMasterList(@RequestParam("callFrom") String callFrom,
			@RequestParam("letter") String letter) {
		GroupMasterDto groupMasterDto = new GroupMasterDto();
		groupMasterDto = profeesService.fetchGroupMasterList(callFrom,letter);
		return groupMasterDto;

	}
	
	// Irfan Khan @date: 30-Aug-2017 @reason : To Group Slave
	@RequestMapping(value = "/fetchGroupSlaveList", method = RequestMethod.POST)
	public @ResponseBody
	GroupSlaveDto fetchGroupSlaveList(@RequestParam("groupId") int groupId) {
		GroupSlaveDto groupSlaveDto = new GroupSlaveDto();
		groupSlaveDto = profeesService.fetchGroupSlaveList(groupId);
		return groupSlaveDto;

	}
	
	@RequestMapping(value = "/editDynamicGroupMaster", method = RequestMethod.POST)
	public @ResponseBody
	DynamicGroupSlaveDto editDynamicGroupMaster(@RequestParam("groupId") int groupId) {
		DynamicGroupSlaveDto dynamicGroupSlaveDto = new DynamicGroupSlaveDto();
		dynamicGroupSlaveDto = profeesService.editDynamicGroupMaster(groupId);
		return dynamicGroupSlaveDto;

	}
	
	// Irfan Khan @date: 30-Aug-2017 @reason : To Delete Group Master
	@RequestMapping(value = "/deleteGroupMaster", method = RequestMethod.POST)
	@ResponseBody
	public String deleteGroupMaster(HttpServletRequest request,
			@RequestParam("groupId") int groupId
			) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		int perValue = profeesService.deleteGroupMaster(userId,groupId);

		return (perValue == 1) ? "Records Deleted Successfully"
				: "Network Error!!";
	}
	
	// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	@RequestMapping(value = "/proFeesGroupDoctorsReport", method = RequestMethod.POST)
	public @ResponseBody
	GroupReceiptSlaveDetails proFeesGroupDoctorsReport(
			@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,
			@RequestParam("deptId") int deptId,
			@RequestParam("serviceId") int serviceId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate, HttpServletRequest request) {
		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		GroupReceiptSlaveDetails receiptSlaveViewDto = new GroupReceiptSlaveDetails();
		receiptSlaveViewDto = profeesService.proFeesGroupDoctorsReport(doctorId,
				fromDate, toDate, unitId, deptId, serviceId, userId);
		return receiptSlaveViewDto;

	}
	
	//@author : Irfan Khan @date: 27-Sep-2017 @reason : Autosuggestion for doctor
	@RequestMapping(value = "/setAutoSugForDoctorList", method = RequestMethod.POST)
	public @ResponseBody
	DoctorDto setAutoSugForDoctorList(
			@RequestParam("letter") String letter,@RequestParam("callFrom") String callFrom
			,@RequestParam("specialisationId") int specialisationId) {
		List<DoctorDto> listDoc = new ArrayList<DoctorDto>();
		listDoc = profeesService.setAutoSugForDoctorList(letter,callFrom,specialisationId);

		DoctorDto obj = new DoctorDto();
		obj.setLstDoctorDto(listDoc);
		return obj;
	}
	
	// Irfan Khan @date: 11-oct-2017 @reason : To Fetch all hosp specialisation
	@RequestMapping(value = "/getHospSpecialization", method = RequestMethod.POST)
	public @ResponseBody
	HospitalSpecialisationDto getHospSpecialization() {
		HospitalSpecialisationDto obj = new HospitalSpecialisationDto();
		obj = profeesService.getHospSpecialization();
		return obj;

	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	
	@RequestMapping(value = "/fetchProFeesHisab", method = RequestMethod.POST)
	public @ResponseBody HisabProFeesDTO fetchProFeesHisab(

			@RequestParam(value = "unitId") Integer unitId,

			@RequestParam(value = "userId") Integer userId,

			@RequestParam(value = "deptId") Integer deptId,

			@RequestParam(value = "fromDate") String fromDate,

			@RequestParam(value = "toDate") String toDate,

			@RequestParam(value = "drId") Integer drId,

			@RequestParam(value = "fromToRange") Integer fromToRange) {
		HisabProFeesDTO dto = new HisabProFeesDTO();

		dto = profeesService.fetchProFeesHisab(unitId, userId, deptId, fromDate, toDate, drId, fromToRange);
		return dto;

	}
	 
	
	// Irfan Khan @date: 8-Dec-2017 @reason : To fetch configured list of dr dept
	@RequestMapping(value = "/fetchConfgDrDeptList", method = RequestMethod.POST)
	public @ResponseBody
	PercentMasterDto fetchConfgDrDeptList(@RequestParam("callFrom") String callFrom,
			@RequestParam("letter") String letter) {
		PercentMasterDto percentMasterObj = new PercentMasterDto();
		percentMasterObj = profeesService.fetchConfgDrDeptList(callFrom,letter);
		return percentMasterObj;

	}
	
	// Irfan Khan @date: 12-Dec-2017 @reason : To fetch configured list of doctor personal
	@RequestMapping(value = "/fetchConfgDrPersonalList", method = RequestMethod.POST)
	public @ResponseBody
	PercentMasterDto fetchConfgDrPersonalList(@RequestParam("callFrom") String callFrom,
			@RequestParam("callSearch") String callSearch,
			@RequestParam("letter") String letter) {
		PercentMasterDto percentMasterObj = new PercentMasterDto();
		percentMasterObj = profeesService.fetchConfgDrPersonalList(callFrom,callSearch,letter);
		return percentMasterObj;

	}
	
	//@author : Irfan Khan @date: 11-Dec-2017 @reason : Autosuggestion for Group List
	@RequestMapping(value = "/setAutoSugForGroupList", method = RequestMethod.POST)
	public @ResponseBody
	GroupMasterDto setAutoSugForGroupList(@RequestParam("letter") String letter) {
		List<GroupMasterDto> listGroup = new ArrayList<GroupMasterDto>();
		listGroup = profeesService.setAutoSugForGroupList(letter);

		GroupMasterDto obj = new GroupMasterDto();
		obj.setListGroupMaster(listGroup);
		return obj;
	}
	
	// Irfan Khan @date: 11-Dec-2017 @reason : To fetch Groups report
	@RequestMapping(value = "/profeesGroupWiseReport", method = RequestMethod.POST)
	public @ResponseBody
	GroupReceiptSlaveDetails profeesGroupWiseReport(
			@RequestParam("groupId") int groupId,
			@RequestParam("unitId") int unitId,
			@RequestParam("deptId") int deptId,
			@RequestParam("serviceId") int serviceId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate, HttpServletRequest request) {
		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		GroupReceiptSlaveDetails receiptSlaveViewDto = new GroupReceiptSlaveDetails();
		receiptSlaveViewDto = profeesService.profeesGroupWiseReport(
				groupId, fromDate, toDate, unitId, deptId, serviceId, userId);
		return receiptSlaveViewDto;

	}
	
	/*// Irfan Khan @date: 14-Dec-2017 @reason : All doctors summary report
	@RequestMapping(value = "/proFeesAllDocReport", method = RequestMethod.POST)
	public @ResponseBody
	ProfeesDoctorsPaymentDto proFeesAllDocReport(
			@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,
			@RequestParam("deptId") int deptId,
			@RequestParam("serviceId") int serviceId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate,
			@RequestParam("drDeptId") int drDeptId, HttpServletRequest request) {
		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		objDto = profeesService.proFeesAllDocReport(doctorId, fromDate, toDate,
				unitId, deptId, serviceId, userId, drDeptId);
		return objDto;

	}*/
	
	//Irfan khan 29-Mar-2018 Fetch All doctors profees posted records
	@RequestMapping(value = "/allPfPostedRecords", method = RequestMethod.POST)
	public @ResponseBody
	ProfeesDoctorsPaymentDto allPfPostedRecords(
			@RequestParam("doctorId") int doctorId,
			@RequestParam("unitId") int unitId,
			@RequestParam("deptId") int deptId,
			@RequestParam("serviceId") int serviceId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate,
			@RequestParam("drDeptId") int drDeptId) {

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		objDto = profeesService.allPfPostedRecords(doctorId, fromDate, toDate,
				unitId, deptId, serviceId, drDeptId);
		return objDto;

	}
	
	//Irfan khan 2-Jan-2018 @reason : Single doctor summary report
	@RequestMapping(value = "/profeesSingleDocSummary", method = RequestMethod.POST)
	public @ResponseBody
	ProfeesDoctorsPaymentDto profeesSingleDocSummary(
			@RequestParam("doctorId") int doctorId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {
		/*// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");*/

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		objDto = profeesService.profeesSingleDocSummary(doctorId, fromDate, toDate);
		return objDto;

	}
	
	//Irfan khan @9-Jan-2018 to save dynamic group details
	@RequestMapping(value = "/saveDynamicGroupDetails", method = RequestMethod.POST)
	@ResponseBody
	public String saveDynamicGroupDetails(
			@RequestParam("groupSlaveDetails") String groupSlaveDetails,
			@RequestParam("groupMasterDetails") String groupMasterDetails,
			@RequestParam("callFrom") String callFrom,
			HttpServletRequest request) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		// int unitId = 1 Integer.parseInt(request.getParameter("uid"));
		// int unitId = (Integer) session.getAttribute("uId");

		int perValue = profeesService.saveDynamicGroupDetails(groupSlaveDetails,
				groupMasterDetails, userId, callFrom);

		return (perValue == 1) ? "Records Inserted Successfully"
				: (perValue == 2) ? "Record Updated Successfully"
						: (perValue == 3) ? "Record Allready Exist!!!"
								: "Network Error!!";
	}
	
	// Irfan khan @10-Jan-2018 to fetch dynamic group details
	@RequestMapping(value = "/fetchDynamicGroupMasterList", method = RequestMethod.POST)
	public @ResponseBody
	DynamicGroupMasterDto fetchDynamicGroupMasterList(@RequestParam("callFrom") String callFrom,
			@RequestParam("letter") String letter) {
		DynamicGroupMasterDto groupMasterDto = new DynamicGroupMasterDto();
		groupMasterDto = profeesService.fetchDynamicGroupMasterList(callFrom,letter);
		return groupMasterDto;

	}
	
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 17_Jan_2018 these methods are used to delete Dr.Deps.
	 * *************************************************************************************/
		
	@RequestMapping(value = "/deleteForDrDeps", method = RequestMethod.POST)
	public @ResponseBody
	String deleteForDrDeps(@RequestParam("drDeptId") Integer drDeptId,
			@RequestParam("unitId") Integer unitId,
			@RequestParam("caseType") Integer caseType,
			HttpServletRequest request) {
				int response = profeesService.deleteForDrDeps(drDeptId,
				request,caseType,unitId);
		String msg = "";
		if (response == 1) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	
	@RequestMapping(value = "/deleteDoctAndGroup", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDoctAndGroup(@RequestParam("docId") Integer docId,
			@RequestParam("caseType") Integer caseType,
			@RequestParam("unitId") Integer unitId,
			HttpServletRequest request) {
				int response = profeesService.deleteDoctAndGroup(docId,
				request,caseType,unitId);
		String msg = "";
		if (response == 1) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	@RequestMapping(value = "/deleteDynamicGroupMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDynamicGroupMaster(@RequestParam("dMasterId") Integer dMasterId,
			HttpServletRequest request) {
				int response = profeesService.deleteDynamicGroupMaster(dMasterId,
				request);
		String msg = "";
		if (response == 1) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	//@author : Irfan Khan @date: 24-Jan-2018 @reason : Autosuggestion for doctor
	@RequestMapping(value = "/fetchDoctorListAutoSug", method = RequestMethod.POST)
	public @ResponseBody
	DoctorDto fetchDoctorListAutoSug(@RequestParam("letter") String letter,
			@RequestParam("callFrom") String callFrom,//@RequestParam("unitId") int unitId,
			@RequestParam("specialisationId") int specialisationId,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int unitId = (Integer) session.getAttribute("uId");
		
		List<DoctorDto> listDoc = new ArrayList<DoctorDto>();
		listDoc = profeesService.fetchDoctorListAutoSug(letter, callFrom,specialisationId,unitId);

		DoctorDto obj = new DoctorDto();
		obj.setLstDoctorDto(listDoc);
		return obj;
	}
	
	// @author : Irfan Khan @date: 14-Feb-2018 @reason : fetch sub service % from perSlave
	@RequestMapping(value = "/fetchAndSetSubServiceOnEdit", method = RequestMethod.POST)
	public @ResponseBody
	PercentSlaveDto fetchAndSetSubServiceOnEdit(@RequestParam("serviceId") int serviceId,
			@RequestParam("unitId") int unitId,@RequestParam("doctorId") int doctorId,
			@RequestParam("drDeptId") int drDeptId,@RequestParam("caseType") int caseType,
			@RequestParam("chargesId") int chargesId,@RequestParam("chargesSlaveId") int chargesSlaveId) {
		
		List<PercentSlaveDto> listPerSlave = new ArrayList<PercentSlaveDto>();
		listPerSlave = profeesService.fetchAndSetSubServiceOnEdit(serviceId, unitId,doctorId,
				drDeptId, caseType,chargesId,chargesSlaveId);

		PercentSlaveDto obj = new PercentSlaveDto();
		obj.setListPerSlave(listPerSlave);
		return obj;
	}
	
	//Irfan khan-- Fetching super master of service based on there id 12-Mar-2018
	@RequestMapping(value = "/fetchSuperCatPrcentMaster", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave fetchSuperCatogoires(
			@RequestParam("chargesMasterDto") Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		ltSubCharges = profeesService
				.fetchSuperCatPrcentMaster(chargesMasterDto);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		// obj.setLstSubService(ltSubService);
		obj.setLstChargesSlave(ltSubCharges);
		return obj;
	}
	
	//irfan khan 16-mar-2018 to dynamic doctors availability
	@RequestMapping(value = "/checkDynamicDocAvailability", method = RequestMethod.POST)
	public @ResponseBody
	int checkDynamicDocAvailability(@RequestParam("doctorId") int doctorId) {
		
		return profeesService.checkDynamicDocAvailability(doctorId);
	}
	
	//Irfan khan 30-Mar-2018 records of profees voucher
	@RequestMapping(value = "/fetchProfeesVoucherReport", method = RequestMethod.POST)
	public @ResponseBody
	AllPfPostedRecordsDto fetchProfeesVoucherReport(
			@RequestParam("voucherId") String voucherId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {

		AllPfPostedRecordsDto objDto = new AllPfPostedRecordsDto();
		objDto = profeesService.fetchProfeesVoucherReport(voucherId, fromDate, toDate);
		return objDto;

	}
	
	//Irfan Khan @date: 30-June-2018 @reason : get All Voucher
	@RequestMapping(value = "/fetchAllVoucherIds", method = RequestMethod.POST)
	public @ResponseBody
	DrPaymentVoucherDto fetchAllVoucherIds() { 
		
		DrPaymentVoucherDto listVoucher = new DrPaymentVoucherDto();
		listVoucher = profeesService.fetchAllVoucherIds();

		return listVoucher;
	}
	
	//Irfan khan 6-Apr-2018 Outstanding report
	@RequestMapping(value = "/fetchOutStandingReport", method = RequestMethod.POST)
	public @ResponseBody
	ProfeesDoctorsPaymentDto fetchOutStandingReport(@RequestParam("departmentId") int departmentId,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		objDto = profeesService.fetchOutStandingReport( fromDate,
				toDate,departmentId);
		return objDto;

	}
	
	//Irfan khan 19-April-2018 Reference dr. records
	@RequestMapping(value = "/fetchProfeesReferenceDrReport", method = RequestMethod.POST)
	public @ResponseBody
	AllPfPostedRecordsDto fetchProfeesReferenceDrReport(
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {

		AllPfPostedRecordsDto objDto = new AllPfPostedRecordsDto();
		objDto = profeesService.fetchProfeesReferenceDrReport(fromDate,toDate);
		
		return objDto;

	}
	
	// Irfan Khan @date: 29-June-2018 @reason : area Wise Patient Report
	@RequestMapping(value = "/areaWisePatientReport", method = RequestMethod.POST)
	public @ResponseBody
	AreaWisePatientViewDto areaWisePatientReport(
			@RequestParam("townId") int townId,
			@RequestParam("talukaId") int talukaId,
			@RequestParam("districtId") int districtId,
			@RequestParam("stateId") int stateId) {		

		AreaWisePatientViewDto objDto = new AreaWisePatientViewDto();
		objDto = profeesService.areaWisePatientReport(townId, talukaId,
				districtId, stateId);
		return objDto;

	}
	
	
	// Tarique Aaalam @date: 6-July-2018 @reason : area Wise Patient Report2
	@RequestMapping(value = "/areaWisePatientReport2", method = RequestMethod.POST)
	public @ResponseBody
	AreaWisePatientViewDto2 areaWisePatientReport2(
			@RequestParam("townId") int townId,
			@RequestParam("talukaId") int talukaId,
			@RequestParam("districtId") int districtId,
			@RequestParam("stateId") int stateId,
			@RequestParam("diagnosis") String diagnosis) {		

		AreaWisePatientViewDto2 objDto = new AreaWisePatientViewDto2();
		objDto = profeesService.areaWisePatientReport2(townId, talukaId,
				districtId, stateId, diagnosis);
		return objDto;

	}
	
	//Irfan khan 27-july-2018 fetch hall n hall type id by treatment id
	@RequestMapping(value = "/fetchHallIdsToSetOnload", method = RequestMethod.POST)
	public @ResponseBody List<Integer> fetchHallIdsToSetOnload(
			@RequestParam("treatmentId") int treatmentId){
		return profeesService.fetchHallIdsToSetOnload(treatmentId);
		
	}
	

	// Irfan khan @date: 21-Sep-2018 @reason : Fetch canceled admission records
	@RequestMapping(value = "/canceledAdmissionRecords", method = RequestMethod.POST)
	public @ResponseBody
	TreatmentDto canceledAdmissionRecords(
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {

		TreatmentDto objDto = new TreatmentDto();
		objDto = profeesService.canceledAdmissionRecords(fromDate,toDate);
		return objDto;

	}
	

	
	// Ajay khandare @date: 5-07-2019 @reason : Fetch  monthy and progresive report for ipd, opd, x-ray, sonography, etc..
		@RequestMapping(value = "/getMonthyHospitalReport", method = RequestMethod.POST)
		public @ResponseBody HospitalReport getMonthyHospitalReport(
				@RequestParam("fromYear") String fromYear,
				@RequestParam("fromMonth") String fromMonth) {
		
			List<HospitalReport> ltDoctorDto = new ArrayList<HospitalReport>();
			
			ltDoctorDto = profeesService.getMonthyHospitalActivitiesReport(fromYear,fromMonth);
			HospitalReport objDto = new HospitalReport();
			objDto.setListTreatment(ltDoctorDto);
			return objDto;

		}
		
		
		// Ajay khandare @date: 5-07-2019 @reason : Fetch  monthy and progresive report for ipd, opd, x-ray, sonography, etc..
		@RequestMapping(value = "/getyearWiseAndFundInfomationHospitalReport", method = RequestMethod.POST)
		public @ResponseBody HospitalReport getyearWiseAndFundInfomationHospitalReport(
				@RequestParam("fromYear") String fromYear,
				@RequestParam("ToYear") String Tofrom) {
		
			List<HospitalReport> ltDoctorDto = new ArrayList<HospitalReport>();
			
			ltDoctorDto = profeesService.getyearWiseAndFundInfomationHospitalReport(fromYear,Tofrom);
			HospitalReport objDto = new HospitalReport();
			objDto.setListTreatment(ltDoctorDto);
			return objDto;

		}
		
		
		// Ajay khandare @date: 5-07-2019 @reason : Fetch  monthy and progresive report for ipd, opd, ICU Addmision, NICU,  etc..
		@RequestMapping(value = "/getMonthyHospitalActivitiesPerformanceReport", method = RequestMethod.POST)
		public @ResponseBody HospitalReport getMonthyHospitalActivitiesPerformanceReport(@RequestParam("fromYear") String fromYear,@RequestParam("fromMonth") String fromMonth) {
				
					List<HospitalReport> ltDoctorDto = new ArrayList<HospitalReport>();
					
					ltDoctorDto = profeesService.getMonthyHospitalActivitiesPerformanceReport(fromYear,fromMonth);
					HospitalReport objDto = new HospitalReport();
					objDto.setListTreatment(ltDoctorDto);
					return objDto;

				}

		
		// Ajay khandare @date: 23-07-2019 @reason : Fetch  monthy and progresive report for ipd, opd, x-ray, sonography, etc..
				@RequestMapping(value = "/getMonthyAndProgresiveHospitalReport1", method = RequestMethod.POST)
				public @ResponseBody HospitalReport getMonthyAndProgresiveHospitalReport1(
						@RequestParam("fromYear") String fromYear,
						@RequestParam("fromMonth") String fromMonth) {
				
					List<HospitalReport> ltDoctorDto = new ArrayList<HospitalReport>();
					
					ltDoctorDto = profeesService.getMonthyAndProgresiveHospitalReport1(fromYear,fromMonth);
					HospitalReport objDto = new HospitalReport();
					objDto.setListTreatment(ltDoctorDto);
					return objDto;

				}
				
				
				@RequestMapping(value = "/getOPDIPDOperationSpecilitywiseReport", method = RequestMethod.POST)
				public @ResponseBody TreatmentDto getOPD_IPD_Operation_Report(
						@RequestParam("fromMonth") String fromMonth ,
						@RequestParam("fromYear") String fromYear) {
				
					List<TreatmentDto> ltDoctorDto = new ArrayList<TreatmentDto>();
					
					ltDoctorDto = profeesService.getOPDIPDOperationSpecilitywiseReport(fromMonth,fromYear);
					TreatmentDto objDto = new TreatmentDto();
					objDto.setListTreatment(ltDoctorDto);
					return objDto;

				}		
				
				
				// Ajay khandare @date: 05-08-2019 @reason : Fetch  monthy and progresive report for ipd, opd, operation report..
				@RequestMapping(value = "/getMonthlyOutPutFormatSpecilitywiseReport", method = RequestMethod.POST)
				public @ResponseBody HospitalReport getMonthlyOutPutFormatSpecilitywiseReport(
						@RequestParam("fromMonth") String fromMonth ,
						@RequestParam("fromYear") String fromYear) {
				
					List<HospitalReport> ltDoctorDto = new ArrayList<HospitalReport>();
					
					ltDoctorDto = profeesService.getMonthlyOutPutFormatSpecilitywiseReport(fromMonth,fromYear);
					HospitalReport objDto = new HospitalReport();
					objDto.setListTreatment(ltDoctorDto);
					return objDto;

				}		
				
				

				// Ajay khandare @date: 05-08-2019 @reason : Fetch  monthy and progresive report for ipd, opd, operation report..
				@RequestMapping(value = "/getDeathInformationSexwiseReport", method = RequestMethod.POST)
				public @ResponseBody HospitalReport getDeathInformationSexwiseReport(
						@RequestParam("fromMonth") String fromMonth ,
						@RequestParam("fromYear") String fromYear) {
				
					List<HospitalReport> ltDoctorDto = new ArrayList<HospitalReport>();
					
					ltDoctorDto = profeesService.getDeathInformationSexwiseReport(fromMonth,fromYear);
					HospitalReport objDto = new HospitalReport();
					objDto.setListTreatment(ltDoctorDto);
					return objDto;

				}		
				
				
				
				// Ajay khandare @date: 20-08-2019 @reason : Fetch  monthy and progresive report for ipd, opd, operation , etc report..
				@RequestMapping(value = "/getYearWiseActivitiesReport2", method = RequestMethod.POST)
				public @ResponseBody HospitalReport getYearWiseActivitiesReport2(
						@RequestParam("fromDate1") String fromDate ,
						@RequestParam("ToDate1") String ToDate) {
				
					List<HospitalReport> ltDoctorDto = new ArrayList<HospitalReport>();
					
					ltDoctorDto = profeesService.getYearWiseActivitiesReport2(fromDate,ToDate);
					HospitalReport objDto = new HospitalReport();
					objDto.setListTreatment(ltDoctorDto);
					return objDto;

				}	
				
				
				// Ajay khandare @date: 26-08-2019 @reason : Fetch  monthy and progresive report for ipd, opd, operation report activites Report 3..
				@RequestMapping(value = "/getYearWiseActivitiesReport3", method = RequestMethod.POST)
				public @ResponseBody HospitalReport getYearWiseActivitiesReport3(
						@RequestParam("fromMonth") String fromMonth ,
						@RequestParam("fromYear") String fromYear) {
				
					List<HospitalReport> ltDoctorDto = new ArrayList<HospitalReport>();
					
					ltDoctorDto = profeesService.getYearWiseActivitiesReport3(fromMonth,fromYear);
					HospitalReport objDto = new HospitalReport();
					objDto.setListTreatment(ltDoctorDto);
					return objDto;

				}	
				
				@RequestMapping(value = "/doctorname", method = RequestMethod.POST)
				public @ResponseBody
				DoctorDto doctorName(@RequestParam("doctorId") int doctorId) {
				
					DoctorDto doctordto = profeesService.doctorName(doctorId);
					return doctordto;

				}
				
				//added by sandip for save group master
				@RequestMapping(value = "/saveGroupDetails1", method = RequestMethod.POST)
				@ResponseBody 
				public String saveGroupDetails1(Users Users ,Doctor doctorDetails, @RequestParam("groupSlaveDetails") String groupSlaveDetails,
				  @RequestParam("groupMasterDetails") String groupMasterDetails,@RequestParam("callFrom") String callFrom,
				  HttpServletRequest request) {
				  
				  // current login user id 
				  HttpSession session = request.getSession(); 
				  Integer userId = (Integer) session.getAttribute("userId1"); 
				  // int unitId = 1 Integer.parseInt(request.getParameter("uid")); 
				  //int unitId = (Integer)session.getAttribute("uId");
				  
				  int perValue =profeesService.saveGroupDetails1(Users,doctorDetails,groupSlaveDetails,groupMasterDetails, userId,callFrom);
				  
				  return (perValue == 1) ? "Records Inserted Successfully" : (perValue == 2) ?
				  "Record Updated Successfully" : (perValue == 3) ? "Record Allready Exist!!!"
				  : "Network Error!!";
				  
				}
				
				//added by sandip for refDoc Report
				@RequestMapping(value = "/fetchProfeesReferenceDrReport1", method = RequestMethod.POST)
				@ResponseBody 
				public RefDoctorDTO fetchProfeesReferenceDrReport1(
						@RequestParam("fromDate") Date fromDate,
						@RequestParam("toDate") Date toDate,
						@RequestParam("searchBy") String searchBy,
						@RequestParam("searchByDept") String searchByDept) {

					RefDoctorDTO refDoc = new RefDoctorDTO();
					refDoc= profeesService.fetchProfeesReferenceDrReport1(fromDate,toDate,searchBy,searchByDept);
					return refDoc;
					
				}
				 
				@RequestMapping(value = "/fetchOutPatientStandingReport", method = RequestMethod.POST)
				public @ResponseBody
				PatientOutStandingReport fetchOutPatientStandingReport(@RequestParam("departmentId") int departmentId,
						@RequestParam("fromDate") Date fromDate,
						@RequestParam("toDate") Date toDate) {

					PatientOutStandingReport objDto = new PatientOutStandingReport();
					objDto = profeesService.fetchOutPatientStandingReport( fromDate,
							toDate,departmentId);
					return objDto;

				}
				
				@RequestMapping(value = "/getSponsorList", method = RequestMethod.POST)
				public @ResponseBody
				ChargesMasterSlave getSponsorList() {

					List<ChargesMasterSlave> ltc = new ArrayList<ChargesMasterSlave>();
					ltc = profeesService.getSponsorList();
					ChargesMasterSlave obj = new ChargesMasterSlave();
					obj.setLstChargesSlave(ltc);
					return obj;
				}
				
				@RequestMapping(value = "/deleteDoctAndGroupById", method = RequestMethod.POST)
				public @ResponseBody
				String deleteDoctAndGroupById(@RequestParam("docId") Integer docId,
						@RequestParam("caseType") Integer caseType,
						@RequestParam("unitId") Integer unitId,@RequestParam("chargesSlaveId") Integer chargesSlaveId,
						HttpServletRequest request) {
							int response = profeesService.deleteDoctAndGroupById(docId,
							request,caseType,unitId,chargesSlaveId);
					String msg = "";
					if (response == 1) {
						msg = "Records Deleted Sucessfully";
					} else {
						msg = "Oops Some Problem Ocured";
					}
					return msg;
				}
				
				// Rohini Ambhore @date: 21-02-2024 @reason : To Fetch all hosp Department of doctor
				@RequestMapping(value = "/getHospDepartmentOfDoctor", method = RequestMethod.POST)
				public @ResponseBody
				HospitalDepartmentDto getHospDepartmentOfDoctor() {
					HospitalDepartmentDto obj = new HospitalDepartmentDto();
					obj = profeesService.getHospDepartmentOfDoctor();
					return obj;

				}
				
				
				@RequestMapping(value = "/saveDrPaymentVoucherForRefer", method = RequestMethod.POST)
				@ResponseBody
				public String saveDrPaymentVoucherForRefer(	@RequestParam("voucherDetails") String voucherDetails,@RequestParam("profeesDetails") String profeesDetails,
						HttpServletRequest request) {

					// current login user id
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					//int unitId = 1 Integer.parseInt(request.getParameter("uid"));
					int unitId = (Integer) session.getAttribute("uId");

					int perValue = profeesService.saveDrPaymentVoucherForRefer(voucherDetails,userId,unitId,profeesDetails);

					return (perValue == 1) ? "Records Inserted Successfully"
							: (perValue == 2) ? "Record Updated Successfully"
									: (perValue == 3) ? "Record Allready Exist!!!"
											: (perValue == 4) ? "Doctor inactive in group.!!!"
													: "Network Error!!";
				}	
				
				@RequestMapping(value = "/fetchReferDoctorsVouchers", method = RequestMethod.POST)
				public @ResponseBody
				ReferDrPaymentVoucherDto fetchReferDoctorsVouchers(
						@RequestParam("callFrom") String callFrom,
						@RequestParam("doctorId") int doctorId,
						@RequestParam("unitId") int unitId,
						@RequestParam("deptId") int deptId,
						@RequestParam("fromDate") Date fromDate,
						@RequestParam("toDate") Date toDate
						) {
							
					ReferDrPaymentVoucherDto drPaymentVoucherDto = new ReferDrPaymentVoucherDto();
					drPaymentVoucherDto = profeesService.fetchReferDoctorsVouchers(callFrom, doctorId,unitId,deptId,fromDate,toDate);
					return drPaymentVoucherDto;

				}
				
				@RequestMapping(value = "/cancelReferalDoctorVoucher", method = RequestMethod.POST)
				@ResponseBody
				public String cancelReferalDoctorVoucher(HttpServletRequest request, @RequestParam("voucherId") int voucherId, @RequestParam("deptId") int deptId) {
					// current login user id
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");

					int perValue = profeesService.cancelReferalDoctorVoucher(userId, voucherId, deptId);

					return (perValue == 1) ? "Voucher Canceled Successfully"
											: "Network Error!!";
				}		
				
}

