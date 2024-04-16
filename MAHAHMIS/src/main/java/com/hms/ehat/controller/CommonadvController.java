package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.Doctor;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.CommanAdvRefund;
import com.hms.ehat.dto.CommanadvrecordDTO;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.ConsultationChargesDto;
import com.hms.ehat.dto.DoctorRoundCharg;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationCharges;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.ChargesSlaveService;
import com.hms.ehat.service.CommonadvService;
import com.hms.ehat.service.SubServiceService;
import com.hms.patient.util.ConfigUIJSONUtility;


@Controller  
@RequestMapping(value = "/commanadv")
public class CommonadvController {
	@Autowired
	CommonadvService  CommonadvService;
	@Autowired
	SubServiceService subServiceService;
	@Autowired
	ChargesSlaveService chargesSlaveService;
	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:savedoctortypemaster
	 ***********/
/*	@RequestMapping(value = "/savecommanadvMaster", method = RequestMethod.POST)
	@ResponseBody
	public String SaveDoctorTypeMaster(CommonadvDto cadv,
			HttpServletRequest request) {
		
		int response = CommonadvService.saveCommonadvMaster(cadv, request);
		String msg = "";
		if (response == 1) {
			msg = "Saved sucessfully";
		} else if(response == -5) {
			msg = "Patient already present";
		}else{
			msg = "error occured";
		}
		return msg;
	}*/
	@RequestMapping(value = "/savecommanadvMaster", method = RequestMethod.POST)
	@ResponseBody
	public String SaveDoctorTypeMaster(@RequestParam("serviceDetails") String serviceDetails,
			HttpServletRequest request) {
		CommonadvDto commonadv =(CommonadvDto) ConfigUIJSONUtility
				.getObjectFromJSON(serviceDetails, CommonadvDto.class);
		int response = CommonadvService.saveCommonadvMaster(commonadv, request);
		String msg = "";
		if (response == 1) {
			msg = "Saved successfully";
		} else if(response == -5) {
			msg = "Patient already present";
		}else{
			msg = "error occured";
		}
		return msg;
	}
	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:fetchDoctypeMasterList
	 ***********/
	
	@RequestMapping(value = "/getcommanadvMasterList", method = RequestMethod.POST)
	 @ResponseBody
	 public	CommonadvDto fetchDoctypeMasterList(@RequestParam("pID_cID") Integer treatmentId,@RequestParam("callform") String callform,	HttpServletRequest request) {
		List<CommonadvDto> lstCommonadv = new ArrayList<CommonadvDto>();
		lstCommonadv = CommonadvService.getCommonadv(treatmentId,callform,request);
	
		CommonadvDto obj = new CommonadvDto();
		obj.setLstCommonadv(lstCommonadv);
		return obj;
	}

	
	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:delete common master
	 ***********/
	
	@RequestMapping(value = "/deletecadvmaster", method = RequestMethod.POST)
	public @ResponseBody
	String DeleteDoctypMaster(@RequestParam("cadvId") Integer cadvId, HttpServletRequest request) {
		String msg = "";
		if (CommonadvService.deletecadvmaster(cadvId, request)==1) {
			msg = "Delete Sucessfully!";
		}else{
			
			msg="Network Issues!";	
			
		}
		return msg;
	}
	
	// @author : Sagar Kasam @date: 28-Jun-2017 @reason : for autosummary
	// onload
	@RequestMapping(value = "/getrecordspatient", method = RequestMethod.POST)
	@ResponseBody
	public RegTreBillDto getAllForAutoSummary(@RequestParam("findingName") String findingName,@RequestParam("pid") Integer pid,@RequestParam("callfrom") String callfrom) {
		//System.err.println("hellohel"+deptId);
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = CommonadvService.getAllForAutoSummary(findingName,pid,callfrom);
		
		RegTreBillDto obj=new RegTreBillDto();
		obj.setListRegTreBillDto(ltRegMasterDto);
			
		return obj;
}
	 @RequestMapping(value = "/getcommanadvrecordList", method = RequestMethod.POST)
	 @ResponseBody
	 public	CommanadvrecordDTO fetchcommanadvrecordList(@RequestParam("pID_cID") Integer treatmentId,@RequestParam("callform") String callform,	HttpServletRequest request) {
		List<CommanadvrecordDTO> lstCommonadv = new ArrayList<CommanadvrecordDTO>();
		List<CommanAdvRefund> listrefund = new ArrayList<CommanAdvRefund>();
		lstCommonadv = CommonadvService.getCommonadvrecord(treatmentId,callform,request);
	
		CommanadvrecordDTO obj = new CommanadvrecordDTO();
		obj.setLstCommonadvrecrd(lstCommonadv);
		
		   if(!callform.equalsIgnoreCase("opdBill")){
				if(lstCommonadv.size() > 0 ){
					
					listrefund = CommonadvService.getCommonadvrefund(lstCommonadv,request);
				if(listrefund.size() > 0 ){
					obj.setLstrefundCommonadv(listrefund);
				}
				}
			}
		return obj;
	}
	 
	 
	 @RequestMapping(value = "/saveDrround", method = RequestMethod.POST)
		@ResponseBody
		public String saveDrround(@RequestParam("DocroundDetails") String DocroundDetails,HttpServletRequest request
				) {
		 DoctorRoundCharg drround =(DoctorRoundCharg) ConfigUIJSONUtility
					.getObjectFromJSON(DocroundDetails, DoctorRoundCharg.class);
			int response = CommonadvService.saveDoctorRoundCharg(drround, request);
			String msg = "";
			if (response == 1) {
				msg = "Saved sucessfully";
			} else if(response == -5) {
				msg = "Patient already present";
			}else{
				msg = "error occured";
			}
			return msg;
			}
	 @RequestMapping(value = "/getDrhallcharg", method = RequestMethod.POST)
	 @ResponseBody
	 public	DoctorRoundCharg getDrhallcharg(@RequestParam("Drid") Integer Drid,@RequestParam("callform") String callform,@RequestParam("SpId") Integer SpId,	HttpServletRequest request) {
		List<DoctorRoundCharg> lstCommonadv = new ArrayList<DoctorRoundCharg>();
		lstCommonadv = CommonadvService.getDrhallcharg(Drid,callform,SpId,request);
	
		DoctorRoundCharg obj = new DoctorRoundCharg();
		obj.setLstDocroundDetails(lstCommonadv);
		return obj;
	}
	 
	 
		/**
		 * @author Bilal
		 * @date 7_Jun_2017
		 * @code For fetching List of sub service whose category is N
		 ***/
		@RequestMapping(value = "/SubServiceListCatN", method = RequestMethod.POST)
		public @ResponseBody
		SubServiceDto getSubServiceListCatN() {
			List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
			ltSubService = subServiceService.getSubServiceCatN();
			SubServiceDto obj = new SubServiceDto();
			obj.setLstSubService(ltSubService);
			
			//setting charges list
			List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
			
			ltChargesSlave = chargesSlaveService.getAllChargesforhall();
		
			
			
	/*		ChargesMasterSlave cs2 = new ChargesMasterSlave();
			cs2.setCategoryName("Service Name");cs2.setSlaveId(-1);
			ltChargesSlave.add(1, cs2);
			*/
			ChargesMasterSlave cs1 = new ChargesMasterSlave();
			cs1.setCategoryName("Default Charges");
			cs1.setSlaveId(0);
			ltChargesSlave.add(0, cs1);
			
			ChargesMasterSlave cs3 = new ChargesMasterSlave();
			cs3.setCategoryName("Opd");
			cs3.setSlaveId(-1);
			ltChargesSlave.add(1, cs3);	
			
			ChargesMasterSlave cs2 = new ChargesMasterSlave();
			cs2.setCategoryName("Diagnostics");
			cs2.setSlaveId(-3);
			ltChargesSlave.add(2, cs2);					
			
			obj.setLstsubcharges(ltChargesSlave);
			return obj;
		}
		@RequestMapping(value = "/deletecadvrefund", method = RequestMethod.POST)
		public @ResponseBody
		String Deletecadvrefund(@RequestParam("cadvId") Integer cadvId, @RequestParam("refundid") Integer refundid,@RequestParam("cdammunt") Double cdammunt,@RequestParam("blamnt") Double blamnt, @RequestParam("totalrefund") Double totalrefund,HttpServletRequest request) {
			String msg = "";
		
			if (CommonadvService.deletecadvrefund(cadvId,refundid, cdammunt,blamnt,totalrefund,request)==1) {
				msg = "Delete Sucessfully!";
			}else{
				
				msg="Network Issues!";	
				
			}
			return msg;
		}
		
		@RequestMapping(value = "/getcommanadvrefundlist", method = RequestMethod.POST)
		 @ResponseBody
		 public	CommanAdvRefund getcommanadvrefundlist(@RequestParam("refundID") Integer refundID ,HttpServletRequest request) {
		
			List<CommanAdvRefund> listrefund = new ArrayList<CommanAdvRefund>();
	
		
			CommanAdvRefund obj = new CommanAdvRefund();

			


						
						listrefund = CommonadvService.getcommanadvrefundlist(refundID,request);
					if(listrefund.size() > 0 ){
						obj.setLstrefund(listrefund);
					}
					
				
			return obj;
		}
		
		@RequestMapping(value = "/saveConsultationCharges", method = RequestMethod.POST)
		@ResponseBody
		public String saveConsultationCharges(@RequestParam("consultationChargesDetails") String DocroundDetails,HttpServletRequest request) {
		 
			ConsultationChargesDto drround =(ConsultationChargesDto) ConfigUIJSONUtility.getObjectFromJSON(DocroundDetails, ConsultationChargesDto.class);
			int response = CommonadvService.saveConsultationCharges(drround, request);
			String msg = "";
			if (response == 1) {
				
				msg = "Saved sucessfully";
			} else if(response == -5) {
				
				msg = "Patient already present";
			}else{
				
				msg = "error occured";
			}
			return msg;
		}
		
		 @RequestMapping(value = "/getConsulthallcharg", method = RequestMethod.POST)
		 @ResponseBody
		 public	ConsultationChargesDto getConsulthallcharg(@RequestParam("Drid") Integer Drid,@RequestParam("callform") String callform,@RequestParam("SpId") Integer SpId,HttpServletRequest request) {
		
			 List<ConsultationChargesDto> lstCommonadv = new ArrayList<ConsultationChargesDto>();
			 lstCommonadv = CommonadvService.getConsulthallcharg(Drid,callform,SpId,request);
		
			 ConsultationChargesDto obj = new ConsultationChargesDto();
			 obj.setLstDocroundDetails(lstCommonadv);
			 return obj;
		}
		 @RequestMapping(value = "/getDocList", method = RequestMethod.POST)
		 @ResponseBody
		 public List<Doctor> getDocsList(@RequestParam("date")String date,@RequestParam("docType")String docType,@RequestParam("drDeptId")Integer drDeptId){
			 List<Doctor> response = CommonadvService.viewDoctors(date, docType, drDeptId);
			return response;
			 
		 }
		 
		 @RequestMapping(value = "/getReghallcharg", method = RequestMethod.POST)
		 @ResponseBody
		 public	RegistrationCharges getReghallcharg(@RequestParam("Drid") Integer Drid,@RequestParam("callform") String callform,@RequestParam("SpId") Integer SpId,	HttpServletRequest request) {
			List<RegistrationCharges> lstCommonadv = new ArrayList<RegistrationCharges>();
			lstCommonadv = CommonadvService.getReghallcharg(Drid,callform,SpId,request);
		
			RegistrationCharges obj = new RegistrationCharges();
			obj.setLstDocroundDetails(lstCommonadv);
			return obj;
		}
		 
		 @RequestMapping(value = "/saveDrroundReg", method = RequestMethod.POST)
			@ResponseBody
			public String saveDrroundReg(@RequestParam("DocroundDetails") String DocroundDetails,HttpServletRequest request
					) {
			 RegistrationCharges drround =(RegistrationCharges) ConfigUIJSONUtility
						.getObjectFromJSON(DocroundDetails, RegistrationCharges.class);
				int response = CommonadvService.saveDoctorRoundChargReg(drround, request);
				String msg = "";
				if (response == 1) {
					msg = "Saved sucessfully";
				} else if(response == -5) {
					msg = "Patient already present";
				}else{
					msg = "error occured";
				}
				return msg;
				}
	//Added By Annapurna  Code For Comman Adv Post	 
		 @RequestMapping(value = "/getcommanadvrecordPost", method = RequestMethod.POST)
		 @ResponseBody
		 public	CommanadvrecordDTO getcommanadvrecordPost(@RequestParam("pID_cID") Integer commanAdvId,@RequestParam("callform") String callform,	HttpServletRequest request) {
			List<CommanadvrecordDTO> lstCommonadv = new ArrayList<CommanadvrecordDTO>();
			lstCommonadv = CommonadvService.getcommanadvrecordPost(commanAdvId,callform,request);
		
			CommanadvrecordDTO obj = new CommanadvrecordDTO();
			obj.setLstCommonadvrecrd(lstCommonadv);
			
			return obj;
		}
		 
		 
		 @RequestMapping(value = "/getChragesSlaveByIddrNew", method = RequestMethod.POST)
			public @ResponseBody
			ChargesMasterSlave getChragesSlaveByIddr(
					@RequestParam("masterId") Integer masterId,
					@RequestParam("selfIds") String selfIds) {
			
				List<ChargesMasterSlave> ltChragesSlave = new ArrayList<ChargesMasterSlave>();
				ltChragesSlave = CommonadvService.getChragesSlaveByIddr(masterId,
						selfIds);
				ChargesMasterSlave obj = new ChargesMasterSlave();
				obj.setLstChargesSlave(ltChragesSlave);
				return obj;
			}
		 
		 /** @author Rohini Ambhore
			 * @date 02_Mar_2017
			 * @code For fetching List of RegistrationMasterhallcharg
			 ***/
		 @RequestMapping(value = "/getRegistrationMasterhallcharg", method = RequestMethod.POST)
		 @ResponseBody
		 public	RegistrationCharges getRegistrationMasterhallcharg(@RequestParam("sponserid") Integer sponserid,@RequestParam("callform") String callform,@RequestParam("SpId") String SpId,	HttpServletRequest request) {
			List<RegistrationCharges> lstCommonadv = new ArrayList<RegistrationCharges>();
			lstCommonadv = CommonadvService.getRegistrationMasterhallcharg(sponserid,callform,SpId,request);
		
			RegistrationCharges obj = new RegistrationCharges();
			obj.setLstDocroundDetails(lstCommonadv);
			return obj;
		}
		 
		 
		 @RequestMapping(value = "/getChragesSlaveByIddrConsultation", method = RequestMethod.POST)
			public @ResponseBody
			ChargesMasterSlave getChragesSlaveByIddrConsultation(
					@RequestParam("masterId") Integer masterId,
					@RequestParam("selfIds") String selfIds) {
			
				List<ChargesMasterSlave> ltChragesSlave = new ArrayList<ChargesMasterSlave>();
				ltChragesSlave = CommonadvService.getChragesSlaveByIddrConsultation(masterId,
						selfIds);
				ChargesMasterSlave obj = new ChargesMasterSlave();
				obj.setLstChargesSlave(ltChragesSlave);
				return obj;
			}
		 
}


