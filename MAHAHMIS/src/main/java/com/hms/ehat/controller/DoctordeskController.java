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

import com.hms.dto.DoctorRoundReport;
import com.hms.dto.LabProfile;
import com.hms.dto.RadiologyTemplateReportDTO;
import com.hms.dto.RisImageUploadDTO;
import com.hms.dto.RisImageUploadDTONew;
import com.hms.dto.Treatment;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.CpoeOTdetails;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.SubObjTemplateDto;
import com.hms.ehat.service.DoctorDeskService;
import com.hms.ehat.service.RadiologyDetailService;
import com.hms.ipd.dto.DoctorRoundDTO;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.patient.util.ConfigUIJSONUtility;


@Controller
@RequestMapping(value = "/doctordesk")
public class DoctordeskController {
	@Autowired
	 DoctorDeskService DService ;
	
	@Autowired
	RadiologyDetailService radiologyDetailService;  // added by aniket kanse, 30 AUG 22, to divert call for reading RIS images in OPD doctor desk.
	
	@Autowired
	RisController risController;  // added by aniket kanse, 30 AUG 22, to divert call for reading RIS images in OPD doctor desk.
	
	// @author : paras suryawanshi @date: 3-jun-2017 @reason : To Save, Update and
	// delete Services  savePackage
	@RequestMapping(value = "/saveCpoe", method = RequestMethod.POST)
	@ResponseBody
	public int saveModule(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request,@RequestParam("queryType") String queryType,@RequestParam("module") String module
			,@RequestParam("callfrom") String callfrom,String sampleWiseBarcodes) {
		
		
		int response=0;
		if (callfrom.equals("reciept")) {//@author bilal for opd receipt update
			
			
			BillDetailsDto billDetailsDto = (BillDetailsDto) ConfigUIJSONUtility
					.getObjectFromJSON(serviceDetails, BillDetailsDto.class);
			
			response = DService.updateOPDrecipt(billDetailsDto.getListBillDetails().get(0), request, queryType);
			
			response = DService.savecpoe(billDetailsDto
					.getListBillDetails().get(0), request, queryType, module);
			
		}else if(callfrom.equals("addToOPDreciept")){//@author bilal add new service to OPD receipt 
			
			BillDetailsDto billDetailsDto = (BillDetailsDto) ConfigUIJSONUtility
					.getObjectFromJSON(serviceDetails, BillDetailsDto.class);
			
			response = DService.savecpoe(billDetailsDto
					.getListBillDetails().get(0), request, queryType, module);
			
			response = DService.saveNewSer(billDetailsDto
					.getListBillDetails().get(0), request, queryType);
			
			
		} else {  ///@author paras suryawanshi for ot cpoe

			if (module.equalsIgnoreCase("OT")) { 
				BillDetailsIpdDto billDetailsIpdDto = (BillDetailsIpdDto) ConfigUIJSONUtility
						.getObjectFromJSON(serviceDetails,
								BillDetailsIpdDto.class);
				if(callfrom.equals("OTCPOE")){
					response = DService.savecpoeOTsurgan(billDetailsIpdDto,
							 request, queryType,callfrom);
				}else{
					response = DService.savecpoeOT(billDetailsIpdDto
							.getListBillDetailsIpd().get(0), request, queryType,callfrom);
				}

	
			} else {
				
				BillDetailsDto billDetailsDto = (BillDetailsDto) ConfigUIJSONUtility.getObjectFromJSON(serviceDetails, BillDetailsDto.class);
				PathologySampleWiseMaster master = (PathologySampleWiseMaster) ConfigUIJSONUtility.getObjectFromJSON(sampleWiseBarcodes, PathologySampleWiseMaster.class);
				if(master.getLabSampleWiseMasterDtoList().size() > 0 || billDetailsDto.getListBillDetails().get(0).getIscombination().equals("Y")) {
					
					response = DService.addPathologyPackageFromBilling(billDetailsDto.getListBillDetails().get(0), request, queryType, module,sampleWiseBarcodes);
				}else {
				
					response = DService.savecpoe(billDetailsDto.getListBillDetails().get(0), request, queryType, module);
				}
			}

		}

		return response;
		
	}
	@RequestMapping(value = "/fetchbilldetails", method = RequestMethod.POST)
	 @ResponseBody
	 public	CpoeServdetails fetchDoctypeMasterList(@RequestParam("tID") Integer tID,@RequestParam("callform") String callform,@RequestParam("servid") Integer servid,	HttpServletRequest request) {
		List<CpoeServdetails> lstbilldetails = new ArrayList<CpoeServdetails>();
		lstbilldetails = DService.getlistbiil(tID,callform,servid,request);
	
		CpoeServdetails obj = new CpoeServdetails();
		obj.setCpoeServdetails(lstbilldetails);
		return obj;
	}
	/************
	 *@author	: Laxman Nikam
	 *@date		:  13-Feb-2018
	 *@code		:fetchlabbilldetails
	 ***********/
	@RequestMapping(value = "/fetchlabbilldetails", method = RequestMethod.POST)
	 @ResponseBody
	 public	CpoeServdetails fetchlabbilldetails(@RequestParam("tID") Integer tID,
			 @RequestParam("callform") String callform, 
			 @RequestParam("deptId") Integer deptId, 
			 HttpServletRequest request) {
		return DService.fetchlabbilldetails(tID,callform,deptId,request);
	}
	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:fetchDoctypeMasterList
	 ***********/
	
	@RequestMapping(value = "/deleteservdetails", method = RequestMethod.POST)
	public @ResponseBody
	String deleteservdetails(@RequestParam("labservicelist") String labservicelist,@RequestParam("callform") String callform, HttpServletRequest request) {
		
		int result = DService.deleteservdetails(labservicelist, callform,request);
		String msg = Integer.toString(result);
		return msg ;
	}
	



/************
 *@author	:kishor Lokhande
 *@date		:  14-June-2017
 *@code		:Delete Services
 ***********/

@RequestMapping(value = "/deleteServices", method = RequestMethod.POST)
@ResponseBody
public String deleteServices(@RequestParam("servId") String servId, HttpServletRequest request ,@RequestParam("tretId") String tretId) {
System.err.print("servId=======================================>"+servId);
	String msg = "";
	if (DService.deleteServices(servId,tretId, request)==1) {
		msg = "Delete Sucessfully!";
	}else{
		
		msg="Network Issues!";	
		
	}
	return msg;
}


/************
 *@author	:kishor Lokhande
 *@date		:  14-June-2017
 *@code		:Delete Services
 ***********/

@RequestMapping(value = "/cancleServices", method = RequestMethod.POST)
@ResponseBody
public String cancleServices(@RequestParam("servId") String servId, HttpServletRequest request ,@RequestParam("tretId") String tretId,@RequestParam("cancleType") String cancleType,@RequestParam("remarkcanceltest") String remarkcanceltest) {
System.err.print("cancle servId=======================================>"+servId);
	String msg = "";
int res	=DService.cancleServices(servId,tretId,cancleType,remarkcanceltest, request);
	/*if (DService.cancleServices(servId,tretId, request)==1) {
		msg = "Cancle Sucessfully!";
	}else{
		
		msg="Network Issues!";	
		
	}*/
  if(res==1) {
	  if(cancleType.equalsIgnoreCase("Y"))
		  msg="Service cancel Successfully";
	  else if(cancleType.equalsIgnoreCase("N"))
		  msg="Service revert Successfully";
   }else if(res==3) {
	   msg="Accession Done!!! Test cannot be Cancel";
   }else if(res==4) {
	   msg="You Cannot Revert it already Same profile is Present..";
   }
   else {
	   msg="Network issue";
   }
	return msg;
}

/************
 *@author	:kishor Lokhande
 *@date		:  25-June-2017
 *@code		:Save saveIpd
 ***********/
@RequestMapping(value = "/saveIpd", method = RequestMethod.POST)
@ResponseBody
public int saveIpd(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request,@RequestParam("queryType") String queryType
		,@RequestParam("callfrom") String callfrom,@RequestParam("module") String module, String sampleWiseBarcodes) {

	int response=0;
	//@author Bilal @date 05-JULY-2017 @code For update ipd receipt 
	
		
		if (callfrom.equals("recieptIPD")) {
			BillDetailsIpdDto billDetailsIpdDto = (BillDetailsIpdDto) ConfigUIJSONUtility
					.getObjectFromJSON(serviceDetails, BillDetailsIpdDto.class);

			response = DService.updateOPDreciptIPD(billDetailsIpdDto
					.getListBillDetailsIpd().get(0), request, queryType);

			response = DService.saveIpd(billDetailsIpdDto
					.getListBillDetailsIpd().get(0), request, queryType, module);
			// @author Bilal @date 07-JULY-2017 @code For save new service to
			// ipd receipt
		} else if (callfrom.equals("addToIPDreciept")) {
			
			BillDetailsIpdDto billDetailsIpdDto = (BillDetailsIpdDto) ConfigUIJSONUtility
					.getObjectFromJSON(serviceDetails, BillDetailsIpdDto.class);
			
			response = DService.saveIpd(billDetailsIpdDto
					.getListBillDetailsIpd().get(0), request, queryType, module);

			response = DService.saveNewToIPD(billDetailsIpdDto
					.getListBillDetailsIpd().get(0), request, queryType);
			
		} else {

			BillDetailsIpdDto BillDetailsIpdDto = (BillDetailsIpdDto) ConfigUIJSONUtility.getObjectFromJSON(serviceDetails, BillDetailsIpdDto.class);
			
			PathologySampleWiseMaster master = (PathologySampleWiseMaster) ConfigUIJSONUtility.getObjectFromJSON(sampleWiseBarcodes, PathologySampleWiseMaster.class);
			if(master.getLabSampleWiseMasterDtoList().size() > 0 || BillDetailsIpdDto.getListBillDetailsIpd().get(0).getIscombination().equals("Y")) {
				
				response = DService.addPathologyPackageFromIpdBilling(BillDetailsIpdDto.getListBillDetailsIpd().get(0), request, queryType, module,sampleWiseBarcodes);
			}else {
			
				response = DService.saveIpd(BillDetailsIpdDto.getListBillDetailsIpd().get(0), request, queryType, module);
			}

	}
	
	return response;

}
/************
 *@author	:kishor Lokhande
 *@date		:  25-June-2017
 *@code		:Delete Ipd SubService
 ***********/
@RequestMapping(value = "/deletesIpdSrvDetails", method = RequestMethod.POST)
public @ResponseBody
String deletesIpdSrvDetails(@RequestParam("labservicelist") String labservicelist, HttpServletRequest request) {

	String msg = "";
	/*
	 * if (DService.deletesIpdSrvDetails(labservicelist, request)==1) { msg =
	 * "Delete Sucessfully!"; }else{
	 * 
	 * msg="Network Issues!";
	 * 
	 * }
	 */
	
	int res	=DService.deletesIpdSrvDetails(labservicelist, request);
	 if(res==1) {
		 msg="Delete Sucessfully!";
	   }else if(res==3) {
		   msg="Accession Done!!! Test cannot be Delete";
	   }
	   else {
		   msg="Network issue";
	   }
	return msg;
}

/************
 *@author	:kishor Lokhande
 *@date		:  25-June-2017
 *@code		:Delete Services
 ***********/

@RequestMapping(value = "/deleteIpdServices", method = RequestMethod.POST)
@ResponseBody
public String deleteIpdServices(@RequestParam("servId") String servId, HttpServletRequest request ,@RequestParam("tretId") String tretId) {
System.err.print("servId=======================================>"+servId);
	String msg = "";
	if (DService.deleteIpdServices(servId,tretId, request)==1) {
		msg = "Delete Sucessfully!";
	}else{
		
		msg="Network Issues!";	
		
	}
	return msg;
}
/************
 *@author	:kishor Lokhande
 *@date		:  25-June-2017
 *@code		:Cancle Services
 ***********/

@RequestMapping(value = "/cancleIpdServices", method = RequestMethod.POST)
@ResponseBody
public String cancleIpdServices(@RequestParam("servId") String servId, HttpServletRequest request ,@RequestParam("tretId") String tretId,@RequestParam("cancleType") String cancleType,
		@RequestParam("remarkcanceltest") String remarkcanceltest) {
System.err.print("cancle servId=======================================>"+servId);
	String msg = "";
	int res=DService.cancleIpdServices(servId,tretId,cancleType,remarkcanceltest, request);
	/*if (DService.cancleServices(servId,tretId, request)==1) {
		msg = "Cancle Sucessfully!";
	}else{
		
		msg="Network Issues!";	
		
	}*/
	 
	 if(res==1) {
		  if(cancleType.equalsIgnoreCase("Y"))
			  msg="Service cancel Successfully";
		  else if(cancleType.equalsIgnoreCase("N"))
			  msg="Service revert Successfully";
	   }else if(res==3) {
		   msg="Accession Done!!! Test cannot be Cancel";
	   }else if(res==4) {
		   msg="You Cannot Revert it already Same profile is Present..";
	   }
	   else {
		   msg="Network issue";
	   }
	
	return msg;
}


@RequestMapping(value = "/fetchipdbilldetails", method = RequestMethod.POST)
@ResponseBody
public	CpoeOTdetails fetchipdbilldetails(@RequestParam("tID") Integer tID,@RequestParam("callform") String callform,@RequestParam("treatmentoperationid") Integer treatmentoperationid,	HttpServletRequest request) {
	List<CpoeOTdetails> lstbilldetails = new ArrayList<CpoeOTdetails>();
	lstbilldetails = DService.getlistservciesotcope(tID,callform,request,treatmentoperationid);
	CpoeOTdetails obj = new CpoeOTdetails();
	obj.setCpoedetails(lstbilldetails);
	return obj;
}


@RequestMapping(value = "/fetchipddetailsdrdesk", method = RequestMethod.POST)
@ResponseBody
public	CpoeIPDdetails fetchipddetails(@RequestParam("tID") Integer tID,@RequestParam("callform") String callform,	HttpServletRequest request) {
	List<CpoeIPDdetails> lstbilldetails = new ArrayList<CpoeIPDdetails>();
	lstbilldetails = DService.getlistservciesipdcope(tID,callform,request);
	CpoeIPDdetails obj = new CpoeIPDdetails();
	obj.setCpoeServdetails(lstbilldetails);
	return obj;
}


	/************
	 * @author : Bilal
	 * @date : 10-July-2017
	 * @code :for delete opd receipt  
	 ***********/

	@RequestMapping(value = "/deleteReceiptOfOPD", method = RequestMethod.POST)
	public @ResponseBody
	String deleteReceiptOfOPD(
			@RequestParam("slaveId") Integer slaveId,	
			HttpServletRequest request) {

		String msg = "";
		if (DService.deleteReceiptOfOPD(slaveId, request) == 1) {
			msg = "Delete Sucessfully!";
		} else {

			msg = "Network Issues!";

		}
		return msg;
	}

	/************
	 * @author : Bilal
	 * @date : 17-July-2017
	 * @code :for delete opd receipt  deleteOnClickForRecieptIPD
	 ***********/

	@RequestMapping(value = "/deleteOnClickForRecieptIPD", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOnClickForRecieptIPD(
			@RequestParam("billRecSlaveId") Integer billRecSlaveId,	
			HttpServletRequest request) {

		String msg = "";
		if (DService.deleteOnClickForRecieptIPD(billRecSlaveId, request) == 1) {
			msg = "Delete Sucessfully!";
		} else {

			msg = "Network Issues!";

		}
		return msg;
	}

	
	/************
	 * @author : Bilal
	 * @date : 21-July-2017
	 * @code :for delete opd master main receipt  
	 ***********/

	@RequestMapping(value = "/deleteMasterReceiptOPD", method = RequestMethod.POST)
	public @ResponseBody
	String deleteMasterReceiptOPD(
			@RequestParam("recId") Integer recId,@RequestParam("deleteRemark") String deleteRemark,	
			HttpServletRequest request) {

		String msg = "";
		if (DService.deleteMasterReceiptOPD(recId,deleteRemark, request) == 1) {
			msg = "Delete Sucessfully!";
		} else {

			msg = "Network Issues!";

		}
		return msg;
	}
	
	
	/************
	 * @author : Bilal
	 * @date : 21-July-2017
	 * @code :for reset opd master main receipt  
	 ***********/

	@RequestMapping(value = "/resetMasterReceiptOPD", method = RequestMethod.POST)
	public @ResponseBody
	String resetMasterReceiptOPD(
			@RequestParam("recId") Integer recId,	
			HttpServletRequest request) {

		String msg = "";
		if (DService.resetMasterReceiptOPD(recId, request) == 1) {
			msg = "Reset Sucessfully!";
		} else {

			msg = "Network Issues!";

		}
		return msg;
	}
	
	/************
	 * @author : Bilal
	 * @date : 24-July-2017
	 * @code :for delete opd master main receipt  
	 ***********/

	@RequestMapping(value = "/deleteMasterReceiptIPD", method = RequestMethod.POST)
	public @ResponseBody
	String deleteMasterReceiptIPD(
			@RequestParam("recId") Integer recId,	@RequestParam("deleteRemark") String deleteRemark,	
			HttpServletRequest request) {

		String msg = "";
		if (DService.deleteMasterReceiptIPD(recId,deleteRemark, request) == 1) {
			msg = "Delete Sucessfully!";
		} else {

			msg = "Network Issues!";

		}
		return msg;
	}
	
	
	/************
	 * @author : Bilal
	 * @date   : 24-July-2017
	 * @code   :for reset IPD master main receipt  
	 ***********/

	@RequestMapping(value = "/resetMasterReceiptIPD", method = RequestMethod.POST)
	public @ResponseBody
	String resetMasterReceiptIPD(
			@RequestParam("recId") Integer recId,	
			HttpServletRequest request) {

		String msg = "";
		if (DService.resetMasterReceiptIPD(recId, request) == 1) {
			msg = "Reset Sucessfully!";
		} else {

			msg = "Network Issues!";

		}
		return msg;
	}
	
	/**@author     :Bilal
	 * @Date       :9-Aug-2017
	 * @code       :for saving package data one by one opd  ***/
		@RequestMapping(value = "/savePackage", method = RequestMethod.POST)
		@ResponseBody
		public int savePackageOpd(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request,
			@RequestParam("queryType") String queryType
			,@RequestParam("callfrom") String callfrom) {
			
			
			int response=0;
			
			EhatOtherBillDetailForOpdDto otherbillDetailsDto = (EhatOtherBillDetailForOpdDto) ConfigUIJSONUtility
					.getObjectFromJSON(serviceDetails, EhatOtherBillDetailForOpdDto.class);
			
			//BillDetailsDto billDetailsDto = new BillDetailsDto();
			
			response = DService.savePackageOpd(otherbillDetailsDto
					.getListEhatOtherBillDetailForOpd().get(0), request, queryType,callfrom);
			return response;
			
			
			
		}
		
		/**
		 * @author   :Bilal
		 * @date     :16-aug-2017
		 * @code     :for cancle or delete service**/
		@RequestMapping(value = "/cancleOPDPackageSer", method = RequestMethod.POST)
		@ResponseBody
		public String cancleOPDPackageSer(@RequestParam("otherBillDetailsId") Integer otherBillDetailsId, 
				HttpServletRequest request 
				,@RequestParam("cancleType") String cancleType) {
		
			String msg = "";
			//DService.cancleOPDPackageSer(otherBillDetailsId,cancleType, request);
			
			if (DService.cancleOPDPackageSer(otherBillDetailsId,cancleType, request)==1) {
				msg = "Delete Sucessfully!";
			}else{
				
				msg="Network Issues!";	
				
			}
			return msg;
			
		}
		
		/**
		 * @author   :Bilal
		 * @date     :16-aug-2017
		 * @code     :for cancle or delete service**/
		@RequestMapping(value = "/cancleIPDPackageSer", method = RequestMethod.POST)
		@ResponseBody
		public String cancleIPDPackageSer(@RequestParam("otherBillDetailsId") Integer otherBillDetailsId, 
				HttpServletRequest request 
				,@RequestParam("cancleType") String cancleType) {
		
			String msg = "";
			//DService.cancleOPDPackageSer(otherBillDetailsId,cancleType, request);
			
			if (DService.cancleIPDPackageSer(otherBillDetailsId,cancleType, request)==1) {
				msg = "Delete Sucessfully!";
			}else{
				
				msg="Network Issues!";	
				
			}
			return msg;
			
		}
/**
 * @author   :Laxman Nikam
 * @date     :14-Feb-2018
 * @code     :for fetch Lab Test Result*/
@RequestMapping(value = "/fetchLabTestResult", method = RequestMethod.POST)
@ResponseBody
public LabProfile fetchLabTestResult(@RequestParam("testmasterId") Integer testmasterId,
		@RequestParam("labReqSlvId") Integer labReqSlvId,
		@RequestParam("subSerId") Integer subSerId,
		@RequestParam("tretId") Integer tretId,
		@RequestParam("isPackageFlag") String isPackageFlag,
		@RequestParam("callfrom") String callfrom,
		HttpServletRequest request) {
	
	List arrLabProfile= new ArrayList();
	arrLabProfile = DService.fetchLabTestResult(testmasterId,labReqSlvId,subSerId,tretId,isPackageFlag,callfrom);
	LabProfile objLabProfile = new LabProfile();
	objLabProfile.setProfileli(arrLabProfile);
	
	
	return objLabProfile;
}
/************
 *@author	: Laxman Nikam
 *@date		:  16-Feb-2018
 *@code		:fetchIpdCoversheetLab
 ***********/
@RequestMapping(value = "/fetchIpdCoversheetLab", method = RequestMethod.POST)
@ResponseBody
public	CpoeIPDdetails fetchIpdCoversheetLab(@RequestParam("tID") Integer tID,
		@RequestParam("callform") String callform, 
		@RequestParam("deptId") Integer deptId,
		HttpServletRequest request) {
	return DService.fetchIpdCoversheetLab(tID,callform,deptId,request);
}

/**
 * @author   :Laxman Nikam
 * @date     :22-Feb-2018
 * @code     :fetch for compare Lab Test Result*/
@RequestMapping(value = "/compareLabTestResult", method = RequestMethod.POST)
@ResponseBody
public LabProfile compareLabTestResult(@RequestParam("tretId") Integer tretId,
		@RequestParam("callfrom") String callfrom,
		@RequestParam("PatientId") Integer  PatientId,
		HttpServletRequest request) {
	
	List arrLabProfile= new ArrayList();
	arrLabProfile = DService.compareLabTestResult(callfrom,tretId,PatientId);
	LabProfile objLabProfile = new LabProfile();
	objLabProfile.setProfileli(arrLabProfile);
	
	
	return objLabProfile;
}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:delete opertio
 ***********/

@RequestMapping(value = "/deleteom", method = RequestMethod.POST)
public @ResponseBody
String deleteom(@RequestParam("opId") String opId,@RequestParam("callform") String callform, HttpServletRequest request) {

	String msg = "";
	if (DService.deleteom(opId, callform,request)==1) {
		msg = "Delete Sucessfully!";
	}else{
		
		msg="Network Issues!";	
		
	}
	return msg;
}

	/*//@author : Tushar @date: 6-Mar-2018 @reason : To Save, Update Complaint and Finding
	@RequestMapping(value = "/saveComplaintFinding", method = RequestMethod.POST)
	@ResponseBody
	public int saveComplaintFinding(@RequestParam("pId") Integer pId,
			@RequestParam("treatId") Integer treatId,
			@RequestParam("checkAnswer") String checkAnswer,
			@RequestParam("type") String type, 
			@RequestParam("queryType") String queryType,
			HttpServletRequest request) {
		
		int response=0;
		EhatComplaintFindingDto saveComplaintFindingDto = (EhatComplaintFindingDto) ConfigUIJSONUtility
				.getObjectFromJSON(checkAnswer, EhatComplaintFindingDto.class);
		
		response = DService.saveComplaintFinding(pId, treatId, saveComplaintFindingDto, type,queryType,request);
		return response;
}
	//@author : Tushar @date: 6-Mar-2018 @reason : To Save, Update Complaint and Finding
		@RequestMapping(value = "/fetchComplaintFinding", method = RequestMethod.POST)
		@ResponseBody
		public List<EhatComplaintFindingDto> fetchComplaintFinding(@RequestParam("pId") Integer pId,
				@RequestParam("treatId") Integer treatId,
				@RequestParam("emrId") Integer emrId,
				HttpServletRequest request) {
			
			EhatComplaintFindingDto listComplaintFinding= new EhatComplaintFindingDto();
			List<EhatComplaintFindingDto> objList= new ArrayList<EhatComplaintFindingDto>();
			objList = DService.fetchComplaintFinding(pId,treatId,emrId,request);
			//listComplaintFinding.setListComplaintFinding(objList);
			return objList;
	}
		/**
		 * @author Tushar @date 8_March-2018 these methods are used to map request
		 *         with services for Getting SubObjTemplate Details Speciality wise
		 * **/
		@RequestMapping(value = "/fetchSubObjTemplate", method = RequestMethod.POST)
		public @ResponseBody
		SubObjTemplateDto fetchSubObjTemplate(@RequestParam("bodyPart") Integer bodyPart,@RequestParam("speciality") Integer speciality,HttpServletRequest request) {
		
			return DService.fetchSubObjTemplate(bodyPart, speciality, request);
		}

		/**
		 * @author Tushar @date 8_March-2018 these methods are used to map request
		 *         with services for Getting SubObjTemplate
		 * **/
	/*	@RequestMapping(value = "/setOncoEmrTemplates", method = RequestMethod.POST)
		public @ResponseBody
		QuestionMasterDto setOncoEmrTemplates(@RequestParam("selDocSpec") Integer selDocSpec,@RequestParam("iBodyPart") Integer bodyPart,
				@RequestParam("tempId") Integer tempId,@RequestParam("pId") Integer pId,
				@RequestParam("treatId") Integer treatId,@RequestParam("emrId") Integer emrId,HttpServletRequest request) {
		
			return DService.setOncoEmrTemplates(selDocSpec, bodyPart, tempId, pId, treatId, emrId, request);
		}
		
		//@author : Tushar @date: 9-Mar-2018 @reason : To Save, Update Template
		@RequestMapping(value = "/saveEmrQueAns", method = RequestMethod.POST)
		@ResponseBody
		public int saveEmrQueAns(@RequestBody List<EhatEMRPatientTemplate> ehatEMRPatientTemplates,
				HttpServletRequest request) {
				       
			int response = DService.saveEmrQueAns(ehatEMRPatientTemplates, request);
			return response;
	}
		
		@author : Tushar @date: 10-Mar-2018 @reason : To fetch Assigned Template
				@RequestMapping(value = "/fetchEMRTemplate", method = RequestMethod.POST)
				@ResponseBody
				public EhatEMRPatientTemplate fetchEMRTemplate(@RequestParam("pId") Integer pId,
						@RequestParam("treatId") Integer treatId,
						@RequestParam("emrId") Integer emrId,
						HttpServletRequest request) {
					
					EhatEMRPatientTemplate obj= new EhatEMRPatientTemplate();
					obj = DService.fetchEMRTemplate(pId,treatId,emrId,request);
					//listComplaintFinding.setListComplaintFinding(objList);
					return obj;
			}*/ 

/************
 *@author	: Laxman Nikam
 *@date		: 05-March-2018
 *@code		:saveOpdIpdCpoe for sendToLab flag
 ***********/
@RequestMapping(value = "/saveOpdIpdCpoe", method = RequestMethod.POST)
@ResponseBody
public int saveOpdIpdCpoe(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request,
		@RequestParam("queryType") String queryType,
		@RequestParam("module") String module,
		@RequestParam("callfrom") String callfrom,
		@RequestParam("subList") String subList) {
	
		int response=0;
		if (module.equalsIgnoreCase("OT")) { 
			BillDetailsIpdDto billDetailsIpdDto = (BillDetailsIpdDto) ConfigUIJSONUtility
					.getObjectFromJSON(serviceDetails,
							BillDetailsIpdDto.class);

			response = DService.savecpoeOT(billDetailsIpdDto
					.getListBillDetailsIpd().get(0), request, queryType,callfrom);
			//Added by Laxman for IPD CPOE send to Lab on 04-March-2018.
			if(billDetailsIpdDto.getListBillDetailsIpd().get(0).getSndToLabFlag().equalsIgnoreCase("Y") && response==1){
				DService.IpdCpoeSendToLab(billDetailsIpdDto.getListBillDetailsIpd().get(0),subList, request);
			}
				//Added by sanjay.
				if(billDetailsIpdDto.getListBillDetailsIpd().get(0).getSendToRisFlag().equalsIgnoreCase("Y")){
					DService.IpdCpoeSendToRis(billDetailsIpdDto.getListBillDetailsIpd().get(0),subList, request);
				}
			
		} else {
			BillDetailsDto billDetailsDto = (BillDetailsDto) ConfigUIJSONUtility
					.getObjectFromJSON(serviceDetails, BillDetailsDto.class);
			response = DService.savecpoe(billDetailsDto
					.getListBillDetails().get(0), request, queryType, module);
			//Added by Laxman for OPD CPOE send to Lab on 04-March-2018.
			if(billDetailsDto.getListBillDetails().get(0).getSndToLabFlag().equalsIgnoreCase("Y") && response==1){
				DService.OpdCpoeSendToLab(billDetailsDto.getListBillDetails().get(0),subList, request);
			}
			
			//Added by sanjay.
			if(billDetailsDto.getListBillDetails().get(0).getSendToRisFlag().equalsIgnoreCase("Y")){
				DService.OpdCpoeSendToRis(billDetailsDto.getListBillDetails().get(0),subList, request);
			}
			
		}
	return response;
}

/************
 *@author	: Laxman Nikam
 *@date		: 08-March-2018
 *@code		: For cancelLabTest.
 ***********/
@RequestMapping(value = "/cancelLabTest", method = RequestMethod.POST)
@ResponseBody
public int cancelLabTest(@RequestParam("billDetId") String billDetId, 
		@RequestParam("cancleType") String cancleType,
		@RequestParam("deptId") Integer deptId,
		HttpServletRequest request ) {

	return DService.cancelLabTest(billDetId,cancleType,deptId,request);
}
/************
 *@author	: Laxman Nikam
 *@date		: 08-March-2018
 *@code		:For when assign test that time test send to lab immediatly.
 ***********/
@RequestMapping(value = "/ipdBillSendToLab", method = RequestMethod.POST)
@ResponseBody
public int ipdBillSendToLab(@RequestParam("serviceDetails") String serviceDetails, 
		@RequestParam("queryType") String queryType,
		HttpServletRequest request ) {

	BillDetailsIpdDto BillDetailsIpdDto = (BillDetailsIpdDto) ConfigUIJSONUtility
	.getObjectFromJSON(serviceDetails, BillDetailsIpdDto.class);

	return DService.IpdBillSendToLab(BillDetailsIpdDto.getListBillDetailsIpd().get(0), request);
}

@RequestMapping(value = "/fetchipddetailsdrdesknew", method = RequestMethod.POST)
@ResponseBody
public	CpoeIPDdetails fetchipddetailsdrdesknew(@RequestParam("tID") Integer tID,@RequestParam("callform") String callform,	HttpServletRequest request) {
	List<CpoeIPDdetails> lstbilldetails = new ArrayList<CpoeIPDdetails>();
	lstbilldetails = DService.getlistservciesipdcopenew(tID,callform,request);
	CpoeIPDdetails obj = new CpoeIPDdetails();
	obj.setCpoeServdetails(lstbilldetails);
	return obj;
}

@RequestMapping(value = "/fetchPreviousTreatmentsByTreatmentID", method = RequestMethod.POST)
@ResponseBody
public	Treatment fetchPreviousTreatmentsByTreatmentID(@RequestParam("treatmentId") Integer treatmentId,	HttpServletRequest request) {
	List<Treatment> lstTreatdetails = new ArrayList<Treatment>();
	lstTreatdetails = DService.fetchPreviousTreatmentsByTreatmentID(treatmentId,request);
	Treatment obj = new Treatment();
	obj.setLitreatment(lstTreatdetails);
	return obj;
}

//code By Sanjay Kr Shah to view the ris report in coversheet on 20-03-2018
@RequestMapping(value = "/getTestRadilogyReports", method = RequestMethod.POST)
public @ResponseBody
RadiologyTemplateReportDTO getTestRadilogyReports(@RequestParam("patientId") Integer patientId,
		@RequestParam("testId") Integer testId,
		@RequestParam("billdetailsid") Integer billdetailsid,
		@RequestParam("treatmentId") Integer treatmentId) {
	List<RadiologyTemplateReportDTO> ltRadilogyReports = new ArrayList<RadiologyTemplateReportDTO>();
	ltRadilogyReports = DService.getTestRadilogyReports(patientId,testId,billdetailsid,treatmentId);
	RadiologyTemplateReportDTO obj = new RadiologyTemplateReportDTO();
	obj.setListRadiologyTempReportDTO(ltRadilogyReports);
	return obj;
}

@RequestMapping(value = "/fetchXrayImage", method = RequestMethod.POST)
@ResponseBody
public RisImageUploadDTO fetchXrayImage(@RequestParam("treatmentId") Integer treatmentId,
		@RequestParam("testId") Integer testId,
		@RequestParam("billdetailsid") Integer billdetailsid) {
	
	List<RisImageUploadDTO> ltRadisImage = new ArrayList<RisImageUploadDTO>();
	ltRadisImage=DService.fetchXrayImage(treatmentId,testId,billdetailsid);	
	RisImageUploadDTO obj=new RisImageUploadDTO();
	obj.setLstRisImageUploadDTO(ltRadisImage);
	return obj;
}



/**
 * @author aniket kanse
 * @since 29 AUG 22
 * @param idRadiologyTest
 * @param testId
 * @param treatmentId
 * @return
 */
@RequestMapping(value = "/fetchXrayImageNew", method = RequestMethod.POST)
@ResponseBody
public RisImageUploadDTONew fetchXrayImageNew(@RequestParam("idRadiologyTest") Integer idRadiologyTest,
		@RequestParam("testId") Integer testId,
		@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
	
//	List<RisImageUploadDTO> ltRadisImage = new ArrayList<RisImageUploadDTO>();
//	ltRadisImage=DService.fetchXrayImageNew(idRadiologyTest,testId,treatmentId);	
//	RisImageUploadDTO obj=new RisImageUploadDTO();
//	obj.setLstRisImageUploadDTO(ltRadisImage);
//	return obj;
	
	System.out.println("In DoctorDesk controller fetchRISDocuments()");
	
	RisImageUploadDTONew risImageUploadDTONew = new RisImageUploadDTONew();
	List<RisImageUploadDTONew> list = radiologyDetailService.fetchRISDocuments(testId,treatmentId,idRadiologyTest,request);
	
	for(RisImageUploadDTONew rd : list){
		rd.setStringDate(risController.convertDate(rd.getCreatedDate()));
	}
	
	risImageUploadDTONew.setLstRisImageUploadDTONew(list);
	System.out.println("Reponse----> "+list);
	return risImageUploadDTONew;
}

/**
 * @author Vikas Godse @date 24_March-2018 these methods are used to map request
 *         with services for Delete Selected Investigation Test
 * **/
@RequestMapping(value = "/cancelInvestigationTest", method = RequestMethod.POST)
@ResponseBody
public int cancelInvestigationTest(@RequestParam("billDetId") String billDetId, 
		@RequestParam("cancleType") String cancleType,
		@RequestParam("callform") String callform,
		HttpServletRequest request ) {

	return DService.cancelInvestigationTest(billDetId,cancleType,callform,request);
}
/************
 *@author	: Laxman Nikam
 *@date		: 14-March-2018
 *@code		:For when assign test that time test send to lab immediatly.
 ***********/
@RequestMapping(value = "/packageOpdSendToLab", method = RequestMethod.POST)
@ResponseBody
public int packageOpdSendToLab(@RequestParam("serviceDetails") String serviceDetails, 
		@RequestParam("queryType") String queryType, HttpServletRequest request ) {
	
	EhatOtherBillDetailForOpdDto otherbillDetailsDto = (EhatOtherBillDetailForOpdDto) ConfigUIJSONUtility
			.getObjectFromJSON(serviceDetails, EhatOtherBillDetailForOpdDto.class);

	return DService.packageOpdSendToLab(otherbillDetailsDto.getListEhatOtherBillDetailForOpd().get(0), request);
}

/************
 *@author	: Laxman Nikam
 *@date		: 14-March-2018
 *@code		: If Test inside package delete from bill,also delete from lab.
 ***********/
@RequestMapping(value = "/deleteLabPackageTest", method = RequestMethod.POST)
@ResponseBody
public int deleteLabPackageTest(@RequestParam("otherBillDetailsId") Integer otherBillDetailsId, 
		@RequestParam("deptId") Integer deptId,
		HttpServletRequest request ) {

	return DService.deleteLabPackageTest(otherBillDetailsId,deptId,request);
}

/************
 *@author	: Laxman Nikam
 *@date		: 01-Nov-2018
 *@code		: Fetch Selected IPD Dr Round List.
 ***********/
@RequestMapping(value = "/fetchSelctedIpdDrRound", method = RequestMethod.POST)
@ResponseBody
public List<DoctorRoundReport> fetchSelctedIpdDrRound(@RequestParam("treatmentID") Integer treatmentID, 
		@RequestParam("date") String date,
		HttpServletRequest request ) {

	return DService.fetchSelctedIpdDrRound(treatmentID,date,request);
}

/************
 *@author	: Laxman Nikam
 *@date		: 10-Jan-2019
 *@code		: Delete OPD priscription Preperation Doctor Template.
 ***********/
@RequestMapping(value = "/deleteOPDPrepDocTemp", method = RequestMethod.POST)
@ResponseBody
public int deleteOPDPrepDocTemp(@RequestParam("prepTemplateDocID") Integer prepTemplateDocID, 
		HttpServletRequest request ) {

	return DService.deleteOPDPrepDocTemp(prepTemplateDocID,request);
}


@RequestMapping(value = "/deleteservdetailsPreviousOPD", method = RequestMethod.POST)
public @ResponseBody
String deleteservdetailsPreviousOPD(@RequestParam("labservicelist") String labservicelist, HttpServletRequest request) {
	
	String msg = DService.deleteservdetailsPreviousOPD(labservicelist, request);
	
	return msg ;
}

@RequestMapping(value = "/canclePreviousServices", method = RequestMethod.POST)
@ResponseBody
public String canclePreviousServices(@RequestParam("servId") String servId, HttpServletRequest request ,@RequestParam("tretId") String tretId,@RequestParam("cancleType") String cancleType) {
System.err.print("cancle servId=======================================>"+servId);
	String msg = "";
int res	=DService.canclePreviousServices(servId,tretId,cancleType, request);
	
  if(res==1) {
	  msg="Service cancel Successfully";
   }else if(res==3) {
	   msg="Accession Done!!! Test cannot be Cancel";
   }else if(res==4) {
	   msg="You Dont have access for Cancel the Test";
   }
   else {
	   msg="Network issue";
   }
	return msg;
}


/************
 *@author	:Rohini Ambhore
 *@code		: check service status Services
 ***********/

@RequestMapping(value = "/cancelLabTestCheckService", method = RequestMethod.POST)
@ResponseBody
public int cancelLabTestCheckService(@RequestParam("servId") String servId, 
		@RequestParam("tretId") String tretId, @RequestParam("cancleType") String cancleType,HttpServletRequest request) {
	System.err.print("cancle servId=======================================>" + servId);
	int res = 0;
	
	res = DService.cancelLabTestCheckService(servId, tretId, cancleType, request);

	return res;
}

}