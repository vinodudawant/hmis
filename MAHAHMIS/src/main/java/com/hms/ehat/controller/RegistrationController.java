package com.hms.ehat.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.Hall;
import com.hms.ehat.dto.AdmissionReportSiddhiDTO;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DemographicPatientDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.DoctorWisePatientsCountDto;
import com.hms.ehat.dto.IpdBedDetailsDTO;
import com.hms.ehat.dto.MlcDetailsDto;
import com.hms.ehat.dto.MultipleSponsorDto;
import com.hms.ehat.dto.OpdQueManagmentViewDto;
import com.hms.ehat.dto.OtherBillingDto;
import com.hms.ehat.dto.PaymentResponsibleDto;
import com.hms.ehat.dto.PrefixDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegTreBillDto1;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationOtherDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.dto.admissionReportViewDto;
import com.hms.ehat.service.OtherBillingService;
import com.hms.ehat.service.RegService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.utility.ApplicationContextUtils;
import com.hms.utility.SendSMSNoble;

@Controller
@RequestMapping(value = "/registration")
public class RegistrationController {
	@Autowired
	RegService regService;
	
	//@author : Vinod Udawant @date: 01-June-2019 @reason : To Save and Update patient
	@RequestMapping(value = "/saveReg", method = RequestMethod.POST)
	@ResponseBody	
	public synchronized int savePatient(@RequestParam("patientDetails") String patientDetails,@RequestParam("treatDetails") String treatDetails,
			@RequestParam("billMaster") String billMaster,@RequestParam("billDetails") String billDetails,@RequestParam("queryType") String queryType,
			@RequestParam("AppId") Integer AppId,@RequestParam("paymentResponsibleDetails") String paymentResponsibleDetails,
			@RequestParam("mlcDetails") String mlcDetails,HttpServletRequest request) {
		
		int treatId = regService.savePatient(patientDetails,treatDetails,billMaster,billDetails,queryType,AppId,
				paymentResponsibleDetails,mlcDetails,request);
		return treatId;
	}

	// @author : Irfan Khan @date: 24-May-2017 @reason : To Fetch Service List
	// onload
	
	@RequestMapping(value = "/fetchAllRecords", method = RequestMethod.POST)
	public @ResponseBody
	RegTreBillDto getAllRecordsList() {
		RegTreBillDto ltRegMasterDto = new RegTreBillDto();
		ltRegMasterDto = regService.getAllRecords();
		
		return ltRegMasterDto;
		
	}

	// @author : Irfan Khan @date: 29-May-2017 @reason : To Save, Update and
	// delete Prefix
	@RequestMapping(value = "/saveUpdatePrefix", method = RequestMethod.POST)
	public @ResponseBody
	String saveUpdatePrefix(PrefixDto prefixDto,
			HttpServletRequest request,
			@RequestParam("queryType") String queryType) {

		int response = regService.saveUpdatePrefix(prefixDto,
				request, queryType);// To get the response from service

		return ((response == 1) ? "Saved Successfully"
				: ((response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Deleted Successfully"
								: "Network Error!!!"))); // To return msg by
															// turnary operator
	}
	
	// @author : Irfan Khan @date: 24-May-2017 @reason : To Fetch Service List
	// onload
	@RequestMapping(value = "/fetchPatientDetails", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationDto getAllPatientList() {
		RegistrationDto ltRegMasterDto = new RegistrationDto();
		ltRegMasterDto = regService.getAllPatientList();

		return ltRegMasterDto;
	}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 3_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/
		
	@RequestMapping(value = "/fetchPatientsRecordByTreatmentId", method = RequestMethod.POST)
		public @ResponseBody
		RegTreBillDto fetchPatientsRecordByTreatmentId(
				@RequestParam("callform") Integer treatmentId) {
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			ltRegMasterDto = regService.fetchPatientsRecordByTreatmentId(treatmentId);
			
			RegTreBillDto obj=new RegTreBillDto();
			obj.setListRegTreBillDto(ltRegMasterDto);
				
			return obj;
			
		}		
	
	
	// @author : Kishor Lokhande @date: 20-June-2017 @reason : To Fetch Dept. List
		// onload
		
		@RequestMapping(value = "/getAllRecordsDeptwise", method = RequestMethod.POST)
		@ResponseBody
		public RegTreBillDto getAllRecordsDeptwise(@RequestParam("deptId") Integer deptId,
				HttpServletRequest request ) {
			//System.err.println("hellohel"+deptId);
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			List<RegTreBillDto1> ltRegMasterDto1 = new ArrayList<RegTreBillDto1>();

			HttpSession session = request.getSession();
			
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
			String userType = (String) session.getAttribute("userType");//get user Type which is login
			RegTreBillDto obj=new RegTreBillDto();
			if(deptId==2)
			{
				ltRegMasterDto1=regService.getAllRecordsDeptwise1(deptId,unitId,userId1,userType);
				obj.setListRegTreBillDto1(ltRegMasterDto1);
				
			}
			else
			{
				ltRegMasterDto = regService.getAllRecordsDeptwise(deptId,unitId,userId1,userType);
				obj.setListRegTreBillDto(ltRegMasterDto);

	
			}
			            
			 
			
			
			
			System.out.println(obj);
				
			return obj;
	}
		
		
		@RequestMapping(value = "/getAllRecordsDeptwise12", method = RequestMethod.POST)
		@ResponseBody
		public RegTreBillDto getAllRecordsDeptwise(@RequestParam("deptId") Integer deptId,@RequestParam("patientId") String patientId,HttpServletRequest request ) {
			//System.err.println("hellohel"+deptId);
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			HttpSession session = request.getSession();
			
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
			String userType = (String) session.getAttribute("userType");//get user Type which is login
	
			ltRegMasterDto = regService.getAllRecordsDeptwise12(deptId,unitId,userId1,userType,patientId);
			
			RegTreBillDto obj=new RegTreBillDto();
			obj.setListRegTreBillDto(ltRegMasterDto);
			
			System.out.println(obj);
				
			return obj;
	}
		
		
	
		
		
		// @author : Sagar Kadam @date: 16-Jun-2017 @reason : To FetchSponsor list
				// onload
				@RequestMapping(value = "/fetchSponsorRecords", method = RequestMethod.POST)
				public @ResponseBody
				ChargesMasterSlave getSponsorRecords(@RequestParam("chargesMasterDto") Integer chargesMasterDto) {
					ChargesMasterSlave ltChargesMasterSlave = new ChargesMasterSlave();
					ltChargesMasterSlave = regService.fetchSponsorRecords(chargesMasterDto);

					return ltChargesMasterSlave;
				}
				
				// @author : Sagar Kadam @date: 27-Jun-2017 @reason : for autosuggestion
				// onload
				@RequestMapping(value = "/getAllRecordsDeptwiseWithAuto", method = RequestMethod.POST)
				@ResponseBody
				public RegTreBillDto getAllRecordsDeptwiseWithAuto(@RequestParam("deptId") Integer deptId,
						@RequestParam("letter") String letter,
						@RequestParam("usertype") String  usertype,HttpServletRequest request) {
					RegTreBillDto ltRegMasterDto = new  RegTreBillDto();
 					HttpSession session = request.getSession();
 					Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
					ltRegMasterDto = regService.getAllRecordsDeptwiseWithAuto(deptId,letter,usertype,unitId);
					 
					return ltRegMasterDto;
			}
				
				//----------------------------------------------------------------------
				
				
				@RequestMapping(value = "/getAllRecordsDeptwiseWithAuto1", method = RequestMethod.POST)
				@ResponseBody
				public RegTreBillDto1 getAllRecordsDeptwiseWithAuto1(@RequestParam("deptId") Integer deptId,
						@RequestParam("letter") String letter,
						@RequestParam("usertype") String  usertype,HttpServletRequest request) {
					RegTreBillDto1 ltRegMasterDto1 = new  RegTreBillDto1();
 					HttpSession session = request.getSession();
 					Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
					ltRegMasterDto1 = regService.getAllRecordsDeptwiseWithAuto1(deptId,letter,usertype,unitId);
					 
					return ltRegMasterDto1;
			}

				
				//
				
				//Added by Laxman on 15-Jan-2018 for OPDQueue Patients and Queue Management.
				@RequestMapping(value = "/getAllOpdRecordsDeptwiseWithAuto", method = RequestMethod.POST)
				@ResponseBody
				public OpdQueManagmentViewDto getAllOpdRecordsDeptwiseWithAuto(@RequestParam("deptId") Integer deptId,
						@RequestParam("letter") String letter,
						@RequestParam("usertype") String  usertype,HttpServletRequest request) {
					OpdQueManagmentViewDto ltRegMasterDto = new  OpdQueManagmentViewDto();
 					HttpSession session = request.getSession();
 					Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
					ltRegMasterDto = regService.getAllOpdRecordsDeptwiseWithAuto(deptId,letter,usertype,unitId);
					 
					return ltRegMasterDto;
			}
				
				
				// @author : Sagar Kadam @date: 28-Jun-2017 @reason : for autosummary
				// onload
				@RequestMapping(value = "/getAllForAutoSummary", method = RequestMethod.POST)
				@ResponseBody
				public RegTreBillDto getAllForAutoSummary(@RequestParam("letter") String letter,@RequestParam("type") String type) {
					//System.err.println("hellohel"+deptId);
					List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
					ltRegMasterDto = regService.getAllForAutoSummary(letter,type);
					
					RegTreBillDto obj=new RegTreBillDto();
					obj.setListRegTreBillDto(ltRegMasterDto);
						
					return obj;
			}
				
				/*********
				 * @author	: 	Touheed
				 * @date	: 	29-June-2017
				 * @resoan	:	fetching ipd bed details
				 */
				@RequestMapping(value = "/getIpdBedDetailsForTid", method = RequestMethod.POST)
				@ResponseBody
				public IpdBedDetailsDTO getIpdBedDetailsForTid(
						@RequestParam("tid") String tid) {
					IpdBedDetailsDTO ipdBedDetails = new IpdBedDetailsDTO();
					ipdBedDetails = regService.getIpdBedDetailsForTid(Integer.parseInt(tid));
					
					return ipdBedDetails;
					
				}	
				
				// @author : Sagar Kadam @date: 27-jun-2017 @reason : To Fetch all  Record for scheduler
				// onload
				
				@RequestMapping(value = "/getAllRecordsForScheduler", method = RequestMethod.POST)
				public @ResponseBody
				RegTreBillDto getAllRecordsForScheduler(@RequestParam("letter") String letter) {
					RegTreBillDto ltRegMasterDto = new RegTreBillDto();
					ltRegMasterDto = regService.getAllRecordsForScheduler(letter);
					
					return ltRegMasterDto;
					
				}
				
				// @author : Sagar Kadam @date:12-july-2017 @reason : To Fetch all Record
				// for opdque1
				@RequestMapping(value = "/getAllRecordsForOPDque1", method = RequestMethod.POST)
				public @ResponseBody
				RegTreBillDto getAllRecordsforOPDque1(@RequestParam("deptId") Integer deptId,HttpServletRequest request) {
					RegTreBillDto ltRegMasterDto = new RegTreBillDto();
					HttpSession session = request.getSession();
					Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
					Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
					String userType = (String) session.getAttribute("userType");//get user Type which is login
			//System.err.println("user typeeee-----"+userType);
					ltRegMasterDto = regService.getAllRecordsforOPDque1(deptId,unitId,userType,userId1);
			
					return ltRegMasterDto;
			
				}
				
				//Modify by Laxman on 15-Jan-2018 for OPDQueue Patients and Queue Management.
				// for opdque1
				@RequestMapping(value = "/getAllRecordsForOPDqueue1", method = RequestMethod.POST)
				public @ResponseBody
				OpdQueManagmentViewDto getAllRecordsForOPDqueue1(@RequestParam("deptId") Integer deptId,HttpServletRequest request) {
					OpdQueManagmentViewDto ltRegMasterDto = new OpdQueManagmentViewDto();
					HttpSession session = request.getSession();
					Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
					Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
					String userType = (String) session.getAttribute("userType");//get user Type which is login
			//System.err.println("user typeeee-----"+userType);
					ltRegMasterDto = regService.getAllRecordsForOPDqueue1(deptId,unitId,userType,userId1);
					
					return ltRegMasterDto;
			
				}
				
				
				@RequestMapping(value = "/getAllRecordsForOPDqueue12", method = RequestMethod.POST)
				public @ResponseBody
				OpdQueManagmentViewDto getAllRecordsForOPDqueue12(@RequestParam("deptId") Integer deptId,@RequestParam("invoiceCount") Integer invoiceCount,HttpServletRequest request) {
					OpdQueManagmentViewDto ltRegMasterDto = new OpdQueManagmentViewDto();
					HttpSession session = request.getSession();
					Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
					Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
					String userType = (String) session.getAttribute("userType");//get user Type which is login
			
					
					System.out.println(invoiceCount);
					ltRegMasterDto = regService.getAllRecordsForOPDqueue12(deptId,unitId,userType,userId1,invoiceCount);
					System.out.println("jlfjhj"+ltRegMasterDto);
					return ltRegMasterDto;
			
				}
				
				
				
				
				// @author : Sagar Kadam @date:12-july-2017 @reason : To Fetch all Record
				// for opdque1
				@RequestMapping(value = "/getAllRecordsForOPDqueOther123", method = RequestMethod.POST)
				public @ResponseBody
				RegistrationOtherDto getAllRecordsForOPDqueOther(@RequestParam("deptId") Integer deptId,HttpServletRequest request) {
					RegistrationOtherDto ltRegMasterDto = new RegistrationOtherDto();
					HttpSession session = request.getSession();
					Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			
					ltRegMasterDto = regService.getAllRecordsForOPDqueOther(deptId,unitId);
			
					return ltRegMasterDto;
			
				}
				
				// @author : Sagar Kadam @date:20-july-2017 @reason : To Fetch Record of charges master list
				 
				@RequestMapping(value = "/getSponsorTypeList", method = RequestMethod.POST)
				public @ResponseBody
				ChargesMasterDto getSponsorList() {
					ChargesMasterDto ltRegMasterDto = new ChargesMasterDto();
			
					ltRegMasterDto = regService.getSponsorTypeList();
			
					return ltRegMasterDto;
			
				}
				
				// @author : Sagar Kadam @date:02-aug-2017 @reason : To Fetch Record of user name by user id 
 				@RequestMapping(value = "/getUserNameByUserid", method = RequestMethod.POST)
				@ResponseBody
				public String getUserNameByUserid(
						@RequestParam("userid") String userid) {
 					String s1 = regService.getUserNameByUserid(Integer.parseInt(userid));
					
					return s1;
					
				}	
				
 				
 				//@author : Sagar Kadam @date: 07/aug/2017 @reason : To save oter details in table
  				@RequestMapping(value = "/saveotherReg", method = RequestMethod.POST)
 				@ResponseBody
 				public int saveOtherModule(@RequestParam("patientDetails") String patientDetails,@RequestParam("billDetails") String billDetails,/*,@RequestParam("treatDetails") String treatDetails,
 						@RequestParam("billMaster") String billMaster,@RequestParam("billDetails") String billDetails*/
 						@RequestParam("queryType") String queryType,HttpServletRequest request) {

 					 RegistrationOtherDto registrationOtherDto = (RegistrationOtherDto) ConfigUIJSONUtility
 							.getObjectFromJSON(patientDetails, RegistrationOtherDto.class);					 

 					// Save patient details
 					 int patId = regService.saveOtherPatientRegDetails(registrationOtherDto.getListReg().get(0),
 								request, queryType);
 					 
 					OtherBillingDto otherBillingDto = (OtherBillingDto) ConfigUIJSONUtility
  							.getObjectFromJSON(billDetails, OtherBillingDto.class);
 					 
 					// Save patient details
 					otherBillingDto.setPatienttId(patId);
 					otherBillingDto.setDoctorId(registrationOtherDto.getListReg().get(0).getDoctorId());
 					int billDetailsId = regService.saveOtherBillDetails(otherBillingDto,queryType,request);
 					 
 					 
 					/*TreatmentDto treatmentDto = (TreatmentDto) ConfigUIJSONUtility
 							.getObjectFromJSON(treatDetails, TreatmentDto.class);
 					
 					//set last inserted pid into treatment
 					TreatmentDto treatmentDto2 = treatmentDto.getListTreatment().get(0);
 					treatmentDto2.setPatientId(patId);
 					
 					//save treatment details
 					int treatId = regService.saveTreatmentDetails(treatmentDto2,
 									request, queryType);
 							
 							
 					BillMasterDto billMasterDto = (BillMasterDto) ConfigUIJSONUtility
 							.getObjectFromJSON(billMaster, BillMasterDto.class);
 					
 					//set last inserted pid,tid into billing
 					BillMasterDto billMasterDto2 = billMasterDto.getListBill().get(0);
 					billMasterDto2.setPatienttId(patId);
 					billMasterDto2.setTreatmentId(treatId);
 					
 					//save bill 
 					int billId = regService.saveBillMaster(billMasterDto2,
 									request, queryType);
 					
 					//departmentId 1 = OPD
 					//departmentId 2 = IPD
 				
 					if(treatmentDto2.getDepartmentId() == 1 && !billDetails.equalsIgnoreCase(null)){
 						
 						BillDetailsDto billDetailsDto = (BillDetailsDto) ConfigUIJSONUtility
 								.getObjectFromJSON(billDetails, BillDetailsDto.class);
 						
 						BillDetailsDto billDetailsDto2 = billDetailsDto.getListBillDetails().get(0);
 						billDetailsDto2.setPatienttId(patId);
 						billDetailsDto2.setTreatmentId(treatId);
 						billDetailsDto2.setBillId(billId);
 						
 						//save bill details
 						int billDetailsOpdId = regService.saveBillDetails(billDetailsDto2,
 								request, queryType, treatmentDto2.getDoctorIdList());
 						
 					}else if(treatmentDto2.getDepartmentId() == 2 && !billDetails.equalsIgnoreCase(null)){
 						
 						BillDetailsIpdDto billDetailsIpdDto = (BillDetailsIpdDto) ConfigUIJSONUtility
 								.getObjectFromJSON(billDetails, BillDetailsIpdDto.class);
 						
 						BillDetailsIpdDto billDetailsIpdDto2 = billDetailsIpdDto.getListBillDetailsIpd().get(0);
 						billDetailsIpdDto2.setPatienttId(patId);
 						billDetailsIpdDto2.setTreatmentId(treatId);
 						billDetailsIpdDto2.setBillId(billId);
 						//save bill details
 						int billDetailsIpdId = regService.saveBillDetailsIpd(billDetailsIpdDto2,
 								request, queryType, treatmentDto2.getDoctorIdList());
 					}*/
 					
 					//returning treatment Id
 					return patId;
 				}
 				
 				
 				
 				
 				
 				//@author : Sagar Kadam @date: 07/aug/2017 @reason : To Fetch other record  list
 				 
 				
 				@RequestMapping(value = "/getOthetPatient", method = RequestMethod.POST)
 				public @ResponseBody
 				RegistrationOtherDto getOthetPatient() {
 					RegistrationOtherDto ltRegMasterDto = new RegistrationOtherDto();
 					ltRegMasterDto = regService.getOthetRecords();
 					
 					return ltRegMasterDto;
 					
 				}

 				
 				
 				//@author : Sagar Kadam @date: 07/aug/2017 @reason : To Fetch other record by id for edit
 				@RequestMapping(value = "/getOthetRecordsById", method = RequestMethod.POST)
				public @ResponseBody
				RegistrationOtherDto getOthetRecordsById(@RequestParam("ptid") Integer pId) {
					RegistrationOtherDto ltRegMasterDto = new RegistrationOtherDto();
			
					ltRegMasterDto = regService.getOthetRecordsById(pId);
			
					return ltRegMasterDto;
			
				}
 				
 				
 				//@author : Sagar Kadam @date: 07/aug/2017 @reason : Autosuggestion for Other Records in reg
 				@RequestMapping(value = "/autosuggesstionForOtherRecords", method = RequestMethod.POST)
				public @ResponseBody
				RegistrationOtherDto autosuggesstionForOtherRecords(@RequestParam("letter") String letter,
						@RequestParam("usertype") String usertype) {
					RegistrationOtherDto ltRegMasterDto = new RegistrationOtherDto();
			 
					ltRegMasterDto = regService.autosuggesstionForOtherRecords(letter,usertype);
			
					return ltRegMasterDto;
			
				}	
 				
	// @author : Irfan Khan @date: 29-May-2017 @reason : To delete Patient
	@RequestMapping(value = "/deletePatientReg", method = RequestMethod.POST)
	public @ResponseBody
	String deletePatientReg(HttpServletRequest request,
			@RequestParam("pId") int pId) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		int response = regService.deletePatientReg(pId,userId);// To get the response from service

		return ((response == 1) ? "Deleted Successfully"
								: "Network Error!!!"); // To return msg by
															// turnary operator
	}
	
	/***@author    :BILAL
	 * @Date       :27-10-2017
	 * @Code       :For getting records of patient****/
	@RequestMapping(value = "/fetchcasepaperrecords", method = RequestMethod.POST)
	public @ResponseBody
	RegTreBillDto fetchcasepaperrecords(
			@RequestParam("treatmentId") Integer treatmentId) {
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = regService.fetchPatientsRecordByTreatmentId(treatmentId);
		
		RegTreBillDto obj=new RegTreBillDto();
		obj.setListRegTreBillDto(ltRegMasterDto);
			
		return obj;
		
	}
	
	/***@author    :BILAL
	 * @Date       :27-10-2017
	 * @Code       :For getting records of patient By patient ID****/
	@RequestMapping(value = "/getPatientRecordsbypatientId", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationDto getPatientRecordsbypatientId(@RequestParam("patientId") Integer patientId) {
		List<RegistrationDto> listReg = new ArrayList<RegistrationDto>();
		RegistrationDto obj = new RegistrationDto();

		listReg = regService.getPatientRecordsbypatientId(patientId);
		obj.setListReg(listReg);
		return obj;

	}
	
	/***@author    :BILAL
	 * @Date       :27-10-2017
	 * @Code       :For getting records of patient By treatment  ID****/
	@RequestMapping(value = "/gettreatment", method = RequestMethod.POST)
	public @ResponseBody
	TreatmentDto gettreatment(@RequestParam("treatmentId") Integer treatmentId) {
		List<TreatmentDto> listtre = new ArrayList<TreatmentDto>();
		TreatmentDto obj = new TreatmentDto();

		listtre = regService.gettreatment(treatmentId);
		obj.setListTreatment(listtre);
		return obj;

	}
				
	// @author : Irfan Khan @date: 8-Nov-2017 @reason : To Check registration access
	@RequestMapping(value = "/getRegAccessAuth", method = RequestMethod.POST)
	public @ResponseBody
	boolean getRegAccessAuth(HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		boolean response = regService.getRegAccessAuth( userId);

		return response; 
	}
	
	// @author : Laxman Nikam @date: 05-Jan-2018 @reason : Check OPD send patiend Limit.
		@RequestMapping(value = "/checkSendPatientLimit", method = RequestMethod.POST)
		@ResponseBody
		public String checkSendPatientLimit(
				@RequestParam("doctorId") String doctorId) {
				String responce = regService.checkSendPatientLimit(Integer.parseInt(doctorId));
			return responce;
			
		}
		
		@RequestMapping(value = "/getDocListUnitWise", method = RequestMethod.POST)
		public @ResponseBody
		DoctorDto getDocListUnitWise(@RequestParam("callfrom") String callfrom,HttpServletRequest request) {     //httpservlet request added by sagar
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			
			DoctorDto ltDoctorDto = new DoctorDto();
			ltDoctorDto = regService.getDocListUnitWise(unitId,callfrom);

			return ltDoctorDto;
		}
		
		
		@RequestMapping(value = "/getAllRefDocNew", method = RequestMethod.POST)
		public @ResponseBody
		DoctorDto getAllRefDocNew(@RequestParam("callfrom") String callfrom,HttpServletRequest request) {     //httpservlet request added by sagar
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			
			DoctorDto ltRefDto = new DoctorDto();
			ltRefDto = regService.getAllRefDocNew(unitId,callfrom);

			return ltRefDto;
		}
		
		
	// @author : Irfan Khan @date: 15-Feb-2018 @reason : To block Patient
	@RequestMapping(value = "/blockPatient", method = RequestMethod.POST)
	public @ResponseBody
	String blockPatient(@RequestParam("pid") int pid,@RequestParam("blockFlag") String blockFlag
			,@RequestParam("narration") String narration,HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String userLoginName = (String) session.getAttribute("userLoginName");
		int response = regService.blockPatient(pid,blockFlag,narration,userId,userLoginName);

		return ((response > 0 && blockFlag.equalsIgnoreCase("T")) ? "Patient blocked Successfully"
				: ((response >0 && blockFlag.equalsIgnoreCase("N")) ? "Patient unblocked Successfully"
						: ((response >0 && blockFlag.equalsIgnoreCase("F")) ? "1st Warning Updated"
								: ((response >0 && blockFlag.equalsIgnoreCase("s")) ? "2nd Warning Updated"
										: "Network Error!!!")))); 
	}
	
	
	//@author :Irfan khan@Date :7-03-2018@Code :To fetch records of Admission report
	@RequestMapping(value = "/fetchAdmissionReport", method = RequestMethod.POST)
	public @ResponseBody
	admissionReportViewDto fetchAdmissionReport(@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate,
			@RequestParam("doctorId") Integer doctorId,@RequestParam("refDocId") Integer refDocId,
			@RequestParam("caseTypeId") Integer caseTypeId,@RequestParam("mediclaimType") Integer mediclaimType) {
		
		List<admissionReportViewDto> listAdmsnReportViewDto = new ArrayList<admissionReportViewDto>();
		admissionReportViewDto obj = new admissionReportViewDto();

		listAdmsnReportViewDto = regService.fetchAdmissionReport(fromDate,toDate,doctorId,refDocId,caseTypeId,mediclaimType);
		
		obj.setListAdmsnReportViewDto(listAdmsnReportViewDto);
		return obj;

	}
	
	//irfan khan - 4-april-2018: fetch advertisement images
	@RequestMapping(value = "/fetchAdvertisementImgNames", method = RequestMethod.POST)
	public @ResponseBody
	ArrayList<String> fetchAdvertisementImgNames() { // httpservlet request added by sagar
		
		ArrayList<String> listFileName = regService.fetchAdvertisementImgNames();

		return listFileName;
	}
	
	// @author : Mohd Tarique Aalam @date: 20-June-2017 @reason : To Fetch payment rsponsible List
				// onload  getAllRecordsDeptwise
				
				@RequestMapping(value = "/fetchPayResp", method = RequestMethod.POST)
				@ResponseBody
				public PaymentResponsibleDto fetchPayResp(@RequestParam("patientId") Integer patientId,
						HttpServletRequest request ) {
					//System.err.println("hellohel"+deptId);
					List<PaymentResponsibleDto> ltPayResDto = new ArrayList<PaymentResponsibleDto>();
					ltPayResDto = regService.fetchPayResp(patientId);
					PaymentResponsibleDto obj=new PaymentResponsibleDto();
					obj.setListPayRes(ltPayResDto);
						
					return obj;
			}
				
				// @author : Mohd Tarique Aalam @date: 29-Dec-2017 @reason : To delete Payment Responsible
				@RequestMapping(value = "/deletePayResponse", method = RequestMethod.POST)
				public @ResponseBody
				String deletePayResponse(HttpServletRequest request,
						@RequestParam("pId") int pId,@RequestParam("tId") int tId) {

					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					int response = regService.deletePayResponse(pId,tId,userId);// To get the response from service

					return ((response == 1) ? "Deleted Successfully"
											: "Network Error!!!"); // To return msg by
																		// turnary operator
				}
	
	//irfan khan 18-may-2018 fetch the difference between 2 dates in days
	@RequestMapping(value = "/fetchDifferenceInDays", method = RequestMethod.POST)
	public @ResponseBody
	long fetchDifferenceInDays(@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {

		return regService.fetchDifferenceInDays(fromDate, toDate);
	}

	/*******************************************************************************
	 * @author Laxman Nikam
	 * @date 15-March-2016
	 * @Code Getting counsulting Dr name assign to patient
	 ******************************************************************************/
		
	@RequestMapping(value = "/getConsultantDrName", method = RequestMethod.POST)
		public @ResponseBody
		DoctorDto getConsultantDrName(
				@RequestParam("treatmentId") Integer treatmentId) {
				
			return regService.getConsultantDrName(treatmentId);
			
		}	
	
	/*******************************************************************************
	 * @author Pooja Sukre
	 * @date 26-March-2016
	 * @Code Getting Hall Type And Hall Name On UI
	 ******************************************************************************/
	@RequestMapping(value = "/fetchPatientsBedRecords", method = RequestMethod.POST)
	public @ResponseBody
	Hall fetchPatientsBedRecords(@RequestParam("callform") Integer treatmentId) {
		List<Hall> ltBedViewDto = new ArrayList<Hall>();
		ltBedViewDto = regService.fetchPatientsBedRecords(treatmentId);
		
		Hall obj=new Hall();
		obj.setHallList(ltBedViewDto);
		return obj;
		
	}
	
	/******
	 * @author     :Laxman Nikam
	 * @Date       :31-May-2018
	 * @Code       :For getting Demographics patient Details.
	 * ********/
	@RequestMapping(value = "/getDemoPatientDetails", method = RequestMethod.POST)
	public @ResponseBody
	DemographicPatientDto getDemoPatientDetails(@RequestParam("patientId") Integer patientId) {

		return regService.getDemoPatientDetails(patientId);
		
	}
	/************
	 *@author	: Laxman Nikam
	 *@date		: 01-June-2018
	 *@code		: checkOldPatient are already exist in DB or not.
	 ***********/
	@RequestMapping(value = "/checkIsOldPatientAvilable", method = RequestMethod.POST)
	public @ResponseBody
	int checkIsOldPatientAvilable(@RequestParam("oldPatientId") String oldPatientId) {

		return regService.checkIsOldPatientAvilable(oldPatientId);
		
	}
	


    /*******************************************************************************

     * @author Mohd Tarique Aalam
     * @date 3_June_2017 
     * @Code Fetching Discharge Date data bye id.

     ******************************************************************************/
    @RequestMapping(value = "/fetchPatientsDischargeDateTreatmentId", method = RequestMethod.POST)
    	public @ResponseBody
        String fetchPatientsDischargeDateTreatmentId(
                @RequestParam("callform") Integer treatmentId) {
            String date="";
            date = regService.fetchPatientsDischargeDateByTreatmentId(treatmentId);
            return date;

        }    
    
	// @author : Mohd Tarique Aalam @date: 20-June-2017 @reason : To Fetch payment rsponsible List
	// onload  getAllRecordsDeptwise
	
	@RequestMapping(value = "/fetchMlcDetails", method = RequestMethod.POST)
	@ResponseBody
	public MlcDetailsDto fetchMlcDetails(@RequestParam("patientId") Integer patientId,
			HttpServletRequest request ) {
		//System.err.println("hellohel"+deptId);
		List<MlcDetailsDto> ltMlcDto = new ArrayList<MlcDetailsDto>();
		ltMlcDto = regService.fetchMlcDetails(patientId);
		MlcDetailsDto obj=new MlcDetailsDto();
		obj.setListMlcDetails(ltMlcDto);
			
		return obj;
}
	
	@RequestMapping(value = "/saveMultipleSponsor", method = RequestMethod.POST)
	@ResponseBody
	public int saveMultipleSponsor(@RequestParam("multipleSponsorDtls") String multipleSponsorDtls,HttpServletRequest request) {
 
		System.err.println("List==>>"+multipleSponsorDtls);
		MultipleSponsorDto multipleSponsorDto = (MultipleSponsorDto) ConfigUIJSONUtility
				.getObjectFromJSON(multipleSponsorDtls, MultipleSponsorDto.class);
		
		 return regService.saveMultipleSponsor(multipleSponsorDto.getListMultipleSponsor().get(0),request);
	}
	
	@RequestMapping(value = "/getMultilpleSponsorList", method = RequestMethod.POST)
	public @ResponseBody
	MultipleSponsorDto getMultilpleSponsorList(@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {

		return regService.getMultilpleSponsorList(treatmentId,request);
	}
	
	@RequestMapping(value = "/getMulSponsorData", method = RequestMethod.POST)
	public @ResponseBody
	MultipleSponsorDto getMulSponsorData(@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,HttpServletRequest request) {

		return regService.getMulSponsorData(treatmentId,chargesSlaveId,request);
	}
	
	@RequestMapping(value = "/deleteMultipleSponsor", method = RequestMethod.POST)
	public @ResponseBody
	int deleteMultipleSponsor(@RequestParam("mulSponsorId") Integer mulSponsorId,
			@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {

		return regService.deleteMultipleSponsor(treatmentId,mulSponsorId,request);
	}

/*	@RequestMapping(value = "/setPrimarySponsor", method = RequestMethod.POST)
	public @ResponseBody
	int setPrimarySponsor(@RequestParam("mulSponsorId") Integer mulSponsorId,
			@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {

		return regService.setPrimarySponsor(treatmentId,mulSponsorId,request);
	}
*/
	// @author : Irfan Khan @date: 10-Oct-2018 @reason : To UnBlock Patient
	@RequestMapping(value = "/unBlockPatient", method = RequestMethod.POST)
	public @ResponseBody String unBlockPatient(@RequestParam("pid") int pid,
			@RequestParam("blockFlag") String blockFlag, @RequestParam("narration") String narration,
			HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String userLoginName = (String) session.getAttribute("userLoginName");
		int response = regService.unBlockPatient(pid, blockFlag, narration, userId, userLoginName);

		return ((response > 0 && blockFlag.equalsIgnoreCase("S")) ? "Patient UnBlocked Successfully"
				: ((response > 0 && blockFlag.equalsIgnoreCase("F")) ? "2nd Warning Updated"
						: ((response > 0 && blockFlag.equalsIgnoreCase("N")) ? "1st Warning Updated"
								: "Network Error!!!")));
	}
	
	//irfan khan 11-oct-2018 fetch patient counts
	@RequestMapping(value = "/patientQueueListOnDashb")
	public @ResponseBody List<Integer> patientQueueListOnDashb() {
		return regService.patientQueueListOnDashb();

	}
	
	//@author : Vinod Udawant @date: 13-April-2019 @reason : Add new consultant doctor
	@RequestMapping(value = "/addNewConsultantOpd", method = RequestMethod.POST)
	public @ResponseBody
	int addNewConsultantOpd(@RequestParam("patientId") Integer patientId,
			@RequestParam("treatmentId") Integer treatmentId,@RequestParam("doctorId") Integer doctorId,
			String serviceDate,@RequestParam("queryType") String queryType,HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		BillDetailsDto obj = new BillDetailsDto();
		obj.setPatienttId(patientId);
		obj.setTreatmentId(treatmentId);
		obj.setDoctorId(doctorId);
		obj.setCreatedBy(userId);
		return regService.addNewConsultantOpd(obj,queryType);
	}
	
	//@author : Vinod Udawant @date: 13-Sept-2019 @reason : Get doctor wise patient count
	@RequestMapping(value = "/getDoctorWisePatientCount", method = RequestMethod.POST)
	@ResponseBody	
	public DoctorWisePatientsCountDto getDoctorWisePatientCount(@RequestParam("callFrom") String callFrom,@RequestParam("deptId") Integer deptId,
			@RequestParam("unitId") Integer unitId,@RequestParam("userId") Integer userId) {
		
		DoctorWisePatientsCountDto treatCount = regService.getDoctorWisePatientCount(callFrom,deptId,unitId,userId);
		return treatCount;
	}
	
	/*******************************************************************************
	 * @author Sandip Shinde
	 * @date 02-feb-2023
	 * @Code Getting Hall Type And Hall Name On UI
	 ******************************************************************************/
	@RequestMapping(value = "/fetchPatientsBedRecords1", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave fetchPatientsBedRecords1(@RequestParam("callform") Integer treatmentId) {
		List<ChargesMasterSlave> ltBedViewDto = new ArrayList<ChargesMasterSlave>();
		ltBedViewDto = regService.fetchPatientsBedRecords1(treatmentId);
		
		ChargesMasterSlave obj=new ChargesMasterSlave();
		obj.setLstChargesSlave(ltBedViewDto);
		return obj;
		
	}
	
	@RequestMapping(value = "/checkDuplicatePatientName", method = RequestMethod.POST)
	public @ResponseBody
	Integer checkDuplicatePatientName(RegistrationDto regDto,HttpServletRequest request) {

		return regService.checkDuplicatePatientName(regDto,request);

	}
	
	//@author :Vishant Pawar@Date :17-01-2024@Code :To fetch records of Admission report
		@RequestMapping(value = "/fetchAdmissionReportSiddhivinayak", method = RequestMethod.POST)
		public @ResponseBody
		AdmissionReportSiddhiDTO fetchAdmissionReportSiddhivinayak(@RequestParam("fromDate") Date fromDate,
				@RequestParam("toDate") Date toDate,
				@RequestParam("doctorId") Integer doctorId,@RequestParam("refDocId") Integer refDocId,
				@RequestParam("caseTypeId") Integer caseTypeId,@RequestParam("mediclaimType") Integer mediclaimType,
				@RequestParam("chargesId") Integer chargesId,@RequestParam("chargesSlaveId") Integer chargesSlaveId) {
			
			List<AdmissionReportSiddhiDTO> listAdmsnReportDto = new ArrayList<AdmissionReportSiddhiDTO>();
			AdmissionReportSiddhiDTO obj = new AdmissionReportSiddhiDTO();

			listAdmsnReportDto = regService.fetchAdmissionReportSiddhivinayak(fromDate,toDate,doctorId,refDocId,caseTypeId,mediclaimType,chargesId,chargesSlaveId);
			obj.setAdmissionReportSiddhi(listAdmsnReportDto);
			
			return obj;

		}
		
		/*******************************************************************************
		 * @author Rahul Patil
		 * @date 13-feb-2024
		 * @Code for getSorceDoc
		 ******************************************************************************/
		@RequestMapping(value = "/getSorceDoc",method = RequestMethod.GET)
		@ResponseBody
		public DoctorDto getSourceDoctor(@RequestParam("isSourceType") String isSourceType) {
			DoctorDto dr = new DoctorDto();
			dr=regService.getSourceDoctor(isSourceType);
			return dr;
		}
		
		// Rohini updated For Registration Master
		
		@RequestMapping(value = "/fetchSponsorRecordsRegMaster", method = RequestMethod.POST)
		public @ResponseBody
		ChargesMasterSlave fetchSponsorRecordsRegMaster(@RequestParam("chargesMasterDto") Integer chargesMasterDto) {
			ChargesMasterSlave ltChargesMasterSlave = new ChargesMasterSlave();
			ltChargesMasterSlave = regService.fetchSponsorRecordsRegMaster(chargesMasterDto);

			return ltChargesMasterSlave;
		}
}
			

