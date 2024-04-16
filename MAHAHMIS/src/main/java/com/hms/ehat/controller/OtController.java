package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.Ehat_freez_details;
import com.hms.ehat.dto.Ehat_view_ot_operation_records;
import com.hms.ehat.dto.Freezdto;
import com.hms.ehat.dto.OTConsentFormDTO;
import com.hms.ehat.dto.OTDashboardDTO;
import com.hms.ehat.dto.OTReportDto;
import com.hms.ehat.dto.OTbilldetaildto;
import com.hms.ehat.dto.OperationMaster;
import com.hms.ehat.dto.Ot_cathlabDto;
import com.hms.ehat.dto.ProcedureCat;
import com.hms.ehat.dto.SurgreyWiseDto;
import com.hms.ehat.dto.otConsentDTO;
import com.hms.ehat.dto.pharmaConsumtionDTO;
import com.hms.ehat.service.OtService;
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.ot.dto.Operation;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.service.CommonService;

@Controller
@RequestMapping(value = "/ot")
public class OtController {
	
	static Logger log=Logger.getLogger(OtController.class.getName());
	
	@Autowired
	OtService OtService;
	
	@Autowired
	CommonService cser;
	
	
	@RequestMapping(value = "/saveOTdetails", method = RequestMethod.POST)
	@ResponseBody
	public int saveOTdetails(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request,@RequestParam("queryType") String queryType,@RequestParam("othersid") int othersid,@RequestParam("treatmentoperationid") int  treatmentoperationid, @RequestParam("callform") String callform , 
			@RequestParam("tamount") Double tamount) {
			int response=0;	
		/*	EhatOtherBillDetailForIpdDto billDetailsDto = (EhatOtherBillDetailForIpdDto) ConfigUIJSONUtility
				.getObjectFromJSON(serviceDetails, EhatOtherBillDetailForIpdDto.class);*/
			//billDetailsDto.setOtprocedure(scheduledProcedure);
		response = OtService.saveOTdetails(serviceDetails, request, queryType,callform,othersid ,treatmentoperationid ,tamount);

		return response;
			
	}
	@RequestMapping(value = "/fetchdetailsOT", method = RequestMethod.POST)
	public @ResponseBody OTbilldetaildto fetchdetailsOT(@RequestParam("patienttId")Integer patienttId,@RequestParam("masterid")Integer masterid,@RequestParam("treatmentId")Integer treatmentId,
			@RequestParam("selfId")Integer selfId,@RequestParam("queryType")String queryType,@RequestParam("callform")String  callform,@RequestParam("treatmentoperationid")Integer treatmentoperationid	)
	{
		List<OTbilldetaildto> ltDoctorMaster = new ArrayList<OTbilldetaildto>();
		ltDoctorMaster = OtService.getOTdetails(patienttId,masterid,treatmentId,selfId,queryType,callform ,treatmentoperationid);
		OTbilldetaildto billdetaildto =new OTbilldetaildto();
		billdetaildto.setListEhatOTBillDetailForIpd(ltDoctorMaster);	
		return billdetaildto;
	}
	
	/************
	 *@author	: AKshata Desai
	 *@code		:Delete Ot Service
	 ***********/
	
	@RequestMapping(value = "/deleteOTservice", method = RequestMethod.POST)
	public @ResponseBody
	String deleteservdetails(@RequestParam("labservicelist") String labservicelist,@RequestParam("callform") String callform, 
			@RequestParam("patienttId")Integer patienttId,@RequestParam("treatmentId")Integer treatmentId,@RequestParam("treatmentoperationid")Integer treatmentoperationid	,HttpServletRequest request,@RequestParam("bill_details_id")Integer bill_details_id,@RequestParam("storeId")Integer storeId) {
		log.info("In OTController deleteOTservice()");
		String msg = "";
		if (OtService.deleteservdetails(labservicelist,patienttId,treatmentId,treatmentoperationid, callform,request,bill_details_id,storeId)==1) {
			msg = "Delete Sucessfully!";
		}else{
			
			msg="Network Issues!";	
			
		}
		return msg;
	}
	
	/************
	 *@author	: AKshata Desai
	 *@code		:Freez Ot Drugs
	 ***********/
	@RequestMapping(value = "/Freez", method = RequestMethod.POST)
	public @ResponseBody int savefreez(@RequestParam("serviceDetails")String serviceDetails, HttpServletRequest request)
	{
		log.info("In OTController savefreez()");
		Freezdto freezdto = (Freezdto) ConfigUIJSONUtility
				.getObjectFromJSON(serviceDetails, Freezdto.class);
		int response=0;	
		response = OtService.savefreez(freezdto.getListFreezdetails().get(0), request);
		
		
		return response;
	}
	
	
	@RequestMapping(value = "/Unfreez", method = RequestMethod.POST)
	public @ResponseBody int unfreez(@RequestParam("serviceDetails")String serviceDetails, HttpServletRequest request)
	{
		log.info("In OTController unfreez()");
		Freezdto freezdto = (Freezdto) ConfigUIJSONUtility
				.getObjectFromJSON(serviceDetails, Freezdto.class);
		int response=0;	
		response = OtService.unfreez(freezdto.getListFreezdetails().get(0), request);
		
		
		return response;
	}
	
	@RequestMapping(value = "/fetchfreez", method = RequestMethod.POST)
	public @ResponseBody Ehat_freez_details fetchfreez(@RequestParam("module")String module, @RequestParam("submodule")String submodule, HttpServletRequest request)
	{
		
		List<Ehat_freez_details> ltFreezdto = new ArrayList<Ehat_freez_details>();
	//	int response=0;	
		ltFreezdto = OtService.fetchfreez(module , submodule);
		
		Ehat_freez_details freez =new Ehat_freez_details();
		freez.setListFreezdetails(ltFreezdto);
		
		return freez;
	}
	@RequestMapping(value = "/fetchotprocedure", method = RequestMethod.POST)
	public @ResponseBody String fetchotprocedure(@RequestParam("patienttId")int  patienttId, @RequestParam("treatmentId")int  treatmentId, HttpServletRequest request)
	{
		
	String 	otprocedure = OtService.fetchotprocedure(patienttId , treatmentId ,  request);
		
		
		return otprocedure;
	}
	/************
	 *@author	: AKshata Desai
	 *@code		:save  Ot Cathlab
	 ***********/
	@RequestMapping(value = "/pharmareflect", method = RequestMethod.POST)
	public @ResponseBody String pharmareflect(@RequestParam("pid")int  patienttId, @RequestParam("trid")int  treatmentId, @RequestParam("masterId")int  masterId,@RequestParam("serviceLastId")int  serviceId, @RequestParam("product") String productArr)
	{
		log.info("In OTController pharmareflect()");
	//List<ProductMaster> vlist = OtService.giveVendorList(patienttId,treatmentId,srvid,subSrvid);
	cser.saveCathLabProduct(productArr, patienttId,treatmentId);
	
		return "Reflected Succesfully";
	}
	
	@RequestMapping(value = "/fetchPTPG", method = RequestMethod.POST)
	public @ResponseBody Fetchprocedure fetchprocedure(@RequestParam("opId")Integer opId)
	{
		List<Fetchprocedure> ltFetchprocedure = new ArrayList<Fetchprocedure>();
		ltFetchprocedure = OtService.fetotchprocedure(opId);
		Fetchprocedure fethpr =new Fetchprocedure();
		fethpr.setListFetchprocedure(ltFetchprocedure);	
		return fethpr;
	}
	@RequestMapping(value = "/topid", method = RequestMethod.POST)
	public @ResponseBody String  topid(@RequestParam("pId")Integer pId,@RequestParam("TrId")Integer TrId)
	{
		
		String topid = OtService.fethopid(pId,TrId);
	
	
		return topid;
	}
	
	@RequestMapping(value = "/hallwiseOPchargeOT", method = RequestMethod.POST)
	public @ResponseBody AutosugeestionDto AutosugeestionDto (@RequestParam("pId")Integer pId,@RequestParam("TrId")Integer TrId,@RequestParam("scheduledProcedure")String scheduledProcedure,
			@RequestParam("findingName")String findingName,@RequestParam("unit")Integer unit,@RequestParam("depdocdeskid")Integer depdocdeskid,@RequestParam("chargesOS")Float chargesOS,@RequestParam("count1")Integer count1)
	{
		AutosugeestionDto obj = new AutosugeestionDto();

		
		List<AutosugeestionDto> alllstService = new ArrayList<AutosugeestionDto>();
		
		alllstService = OtService.hallwiseOPchargeOT(pId,TrId,scheduledProcedure,findingName,unit,depdocdeskid,chargesOS,count1);
	
		  obj.setLstService(alllstService);
		return obj;
	}
	@RequestMapping(value = "/operationcharge", method = RequestMethod.POST)
	public @ResponseBody AutosugeestionDto operationcharge (@RequestParam("pId")Integer pId,@RequestParam("TrId")Integer TrId,@RequestParam("scheduledProcedure")String scheduledProcedure,
			@RequestParam("findingName")String findingName,@RequestParam("unit")Integer unit,@RequestParam("depdocdeskid")Integer depdocdeskid,@RequestParam("chargesOS")Float chargesOS,@RequestParam("count1")Integer count1, @RequestParam("treatmentoperationid")Integer treatmentoperationid)
	{
		AutosugeestionDto obj = new AutosugeestionDto();

		
		List<AutosugeestionDto> alllstService = new ArrayList<AutosugeestionDto>();
		
		alllstService = OtService.operationcharge(pId,TrId,scheduledProcedure,findingName,unit,depdocdeskid,chargesOS,count1,treatmentoperationid);
	
		  obj.setLstService(alllstService);
		return obj;
	}

/**
 * @author Paras R Suryawanshi
 * @Date 21-Nov-2017
 * @code For SaveOTPercentage
 * ***/
	@RequestMapping(value = "/SaveOTPercentage", method = RequestMethod.POST)
	@ResponseBody
	public int SaveOTPercentage(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request) {
			int response=0;	
			OTPercentageDTO otPercentageDTO = (OTPercentageDTO) ConfigUIJSONUtility
					.getObjectFromJSON(serviceDetails, OTPercentageDTO.class);
		response = OtService.SaveOTPercentage(otPercentageDTO, request);

		return response;
		
		
		
	}
	
	@RequestMapping(value = "/fetchOTPercentage", method = RequestMethod.GET)
	public @ResponseBody OTPercentageDTO fetchOTPercentage()
	{
		List<OTPercentageDTO> ltFetchOTPercentage = new ArrayList<OTPercentageDTO>();
		ltFetchOTPercentage = OtService.fetchOTPercentage();
		OTPercentageDTO listotpers =new OTPercentageDTO();
		listotpers.setListOTPercentage(ltFetchOTPercentage);	
		return listotpers;
	}
	
	@RequestMapping(value = "/hallwisechargeOT", method = RequestMethod.POST)
	public @ResponseBody String hallwisechargeOT (@RequestParam("pId")Integer pId,@RequestParam("TrId")Integer TrId,@RequestParam("scheduledProcedure")String scheduledProcedure, @RequestParam("callfrom")String  callfrom)	{
    String  charges = OtService.hallwisechargeOT(pId,TrId,scheduledProcedure,callfrom);
	
		return charges;
	}
	
	@RequestMapping(value = "/hallwisechargeOTNew", method = RequestMethod.POST)
	public @ResponseBody String hallwisechargeOTNew (@RequestParam("pId")Integer pId,@RequestParam("TrId")Integer TrId,@RequestParam("scheduledProcedure")String scheduledProcedure)	{
    String  charges = OtService.hallwisechargeOTNew(pId,TrId,scheduledProcedure);
	
		return charges;
	}
	
	
	@RequestMapping(value = "/saveprocategaory", method = RequestMethod.POST)
	@ResponseBody
	public int Saveprocategaory(@RequestParam("txtprcName") String txtprcName,@RequestParam("txtprcID") int txtprcID,HttpServletRequest request) {
			int response=0;	
			
		response = OtService.Saveprocategaory(txtprcName, txtprcID,request);

		return response;
		
		
		
	}
	@RequestMapping(value = "/saveOPmaster", method = RequestMethod.POST)
	@ResponseBody
	public int SaveOPmaster(@RequestParam("txtpr") String txtpr,@RequestParam("txtprcID") int txtprcID,
			@RequestParam("opgrade") int opgrade,@RequestParam("txtstep") int txtstep,
			@RequestParam("unit") int unit,HttpServletRequest request) {
			int response=0;	
			
		response = OtService.SaveOPmaster(txtpr, txtprcID,opgrade,txtstep,unit,request);

		return response;
		
		
		
	}
	
	
	@RequestMapping(value = "/deleteProcedureCategory", method = RequestMethod.POST)
	 public	@ResponseBody String deleteProcedureCategory(@RequestParam("id") String id,HttpServletRequest request) {
		String msg="";
		boolean response = OtService.deleteProcedureCategory(id,request);
		if(response==true){
			msg="Delete Successfully";
		}else{
			msg="Network Issues!";	
			
		}
		return msg;
		
	}
	
	@RequestMapping(value = "/fetchprocedureCatsedrv", method = RequestMethod.GET)
	public @ResponseBody ProcedureCat fetchprocedureCatsedrv()
	{
		List<ProcedureCat> listProcedureCat = new ArrayList<ProcedureCat>();
		listProcedureCat = OtService.fetchprocedureCatsedrv();
		ProcedureCat listotpers =new ProcedureCat();
		listotpers.setListProcedureCat(listProcedureCat);	
		return listotpers;
	}
	
		@RequestMapping(value = "/fetchOperationmaster", method = RequestMethod.GET)
	public @ResponseBody OperationMaster fetchOperationmaster()
	{
		List<OperationMaster> listOperationMaster = new ArrayList<OperationMaster>();
		listOperationMaster = OtService.fetchOperationmaster();
		OperationMaster listotpers =new OperationMaster();
		listotpers.setListOperationMaster(listOperationMaster);
		return listotpers;
	}	
	
	//Created by Parikshit to fetch pending balance of ot patient 
	//Date : 12-Jan-2018
	@RequestMapping(value = "/fetchOTPendingAmountByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody pharmaConsumtionDTO fetchOTPendingAmount(@RequestParam("tId")Integer tId)
	{
		pharmaConsumtionDTO listotpers =OtService.fetchOTPendingAmount(tId);
		return listotpers;
	}
	//Created by Parikshit to fetch pending balance of ot patient 
		//Date : 12-Jan-2018
		@RequestMapping(value = "/fetchOTReportdetails", method = RequestMethod.GET)
		public @ResponseBody OTReportDto fetchOTReportdetails(@RequestParam("pid")Integer pid,@RequestParam("name")String name ,@RequestParam("fromdate")String fromdate,@RequestParam("todate")String todate,@RequestParam("callfrom")String callfrom )
		{
			OTReportDto listotpers =OtService.fetchOTReportdetails(pid, name,fromdate,todate ,callfrom);
			return listotpers;
		}
		
		@RequestMapping(value = "/fetchot_operation_records", method = RequestMethod.GET)
		public @ResponseBody Ehat_view_ot_operation_records fetchOTdetails(@RequestParam("docid")Integer docid,@RequestParam("fromdate")String fromdate,@RequestParam("todate")String todate)
		{
			Ehat_view_ot_operation_records listotpers =OtService.fetchOTdetails(docid,fromdate,todate);
			return listotpers;
		}
		@RequestMapping(value = "/fetchot_otcatlab", method = RequestMethod.GET)
		public @ResponseBody Ot_cathlabDto fetchot_otcatlab(@RequestParam("docid")Integer docid,@RequestParam("fromdate")String fromdate,@RequestParam("todate")String todate)
		{
			Ot_cathlabDto listotpers =OtService.fetchot_otcatlab(docid,fromdate,todate);
			return listotpers;
		}
		
		@RequestMapping(value = "/fetchcountOT", method = RequestMethod.POST)
		public @ResponseBody Integer fetchcountOT(@RequestParam("patienttId")Integer patienttId,@RequestParam("treatmentId")Integer treatmentId,
				@RequestParam("callform")String  callform,@RequestParam("treatmentoperationid")Integer treatmentoperationid	)
		{
			Integer count =OtService.fetchcountOT(patienttId,treatmentId,callform,treatmentoperationid);
			return count;
		}
		
		@RequestMapping(value = "/saveOtConsent", method = RequestMethod.POST)
		@ResponseBody
		public String saveOtConsentDetails(@RequestParam("consentDetails") String consentDetails,HttpServletRequest request) {
			String response="";
			int result = 0;
			otConsentDTO objDto = (otConsentDTO) ConfigUIJSONUtility
					.getObjectFromJSON(consentDetails, otConsentDTO.class);
			
			 result = OtService.saveOtConsentDetails(objDto.getListConsent().get(0), request);
				if(result==1){
					response = "Data Inserted..";
				}else if(result==2){
					
					response = "Data Updated...";
				}else{
					response = "oops there is some problem..";
				}
			return response;
			
		}
		

		@RequestMapping(value = "/fetchOtConsent", method = RequestMethod.POST)
		 @ResponseBody
		 public	otConsentDTO fetchOtConsentDetails(@RequestParam("pid") String pid,
				 @RequestParam("tid") String tid) {
			
			int patientId=Integer.parseInt(pid);
			int treatmentId=Integer.parseInt(tid);
			
			List<otConsentDTO> listInitial2 = new ArrayList<otConsentDTO>();
			listInitial2 = OtService.fetchOtConsentDetails(patientId,treatmentId);
		
			otConsentDTO obj = new otConsentDTO();
			obj.setListConsent(listInitial2);
			return obj;
			
		}

@RequestMapping(value = "/getAllOTTemplateList", method = RequestMethod.GET)
		public @ResponseBody
		CustomizeTemplate getAllOTTemplate(HttpServletRequest request) {
			List<CustomizeTemplate> ltOTTemplate = new ArrayList<CustomizeTemplate>();
			ltOTTemplate = OtService.getAllOTTemplates(request);
			CustomizeTemplate obj = new CustomizeTemplate();
			obj.setCustomizeTemplateList(ltOTTemplate);
			return obj;
		}
		
		@RequestMapping(value = "/getOTTemplateDataById", method = RequestMethod.GET)
		public @ResponseBody
		CustomizeTemplate getOTTemplateDataById(HttpServletRequest request,@RequestParam("templateId") Integer templateId) {
			List<CustomizeTemplate> ltOTTemplates = new ArrayList<CustomizeTemplate>();
			ltOTTemplates = OtService.getOTTemplateDataById(request,templateId);
			CustomizeTemplate obj = new CustomizeTemplate();
			obj.setCustomizeTemplateList(ltOTTemplates);
			return obj;
		}
		

		@RequestMapping(value = "/saveOTConsentForm", method = RequestMethod.POST)
		@ResponseBody
		public String saveOTConsentForm(OTConsentFormDTO otConsentFormDTO,
				HttpServletRequest request) {
			int response = OtService.saveOTConsentForm(otConsentFormDTO, request);
			String msg = "";
			if (response == 1) {
				msg = "Records Saved Sucessfully";
			} else if (response == 2) {
				msg = "Records Updated Sucessfully";
			} else {
				msg = "Oops Some Problem Ocured";
			}
			return msg;	
		}
		
		@RequestMapping(value = "/getAllOtConsentForms", method = RequestMethod.POST)
		public @ResponseBody
		OTConsentFormDTO getAllOtConsentForms(HttpServletRequest request) {
			
			return OtService.getAllOtConsentForms(request);
		}
		
		@RequestMapping(value = "/getOTConsentDataById", method = RequestMethod.GET)
		public @ResponseBody
		OTConsentFormDTO getOTConsentDataById(HttpServletRequest request,@RequestParam("templateId") Integer templateId) {
			List<OTConsentFormDTO> ltOTTemplates = new ArrayList<OTConsentFormDTO>();
			ltOTTemplates = OtService.getOTConsentDataById(request,templateId);
			OTConsentFormDTO obj = new OTConsentFormDTO();
			obj.setLstOtConsentForm(ltOTTemplates);
			return obj;
		}
		@RequestMapping(value = "/getreportsurgery", method = RequestMethod.POST)
		public @ResponseBody SurgreyWiseDto getreportsurgery(@RequestParam("opname")String opname,@RequestParam("fromdate")String fromdate,@RequestParam("todate")String todate)
		{
			SurgreyWiseDto listotpers =OtService.getreportsurgery(opname,fromdate,todate);
			return listotpers;
		}
		@RequestMapping(value = "/fetchdrramount", method = RequestMethod.POST)
		public @ResponseBody String fetchdrramount(@RequestParam("treatmentId")Integer treatmentId,@RequestParam("drid")Integer drid,
				@RequestParam("callform")String  callform,@RequestParam("time")String  time)
		{
			String fetchamount =OtService.fetchdrramount(treatmentId,callform,drid,time);
			return fetchamount;
		}
		
		@RequestMapping(value = "/operationchargeNew", method = RequestMethod.POST)
		public @ResponseBody Double operationchargeNew (@RequestParam("pId")Integer pId,@RequestParam("TrId")Integer TrId,@RequestParam("scheduledProcedure")String scheduledProcedure,
				@RequestParam("findingName")String findingName,@RequestParam("unit")Integer unit,@RequestParam("depdocdeskid")Integer depdocdeskid,@RequestParam("chargesOS")Float chargesOS,@RequestParam("count1")Integer count1, @RequestParam("treatmentoperationid")Integer treatmentoperationid,
				@RequestParam("otProcedure")String  otProcedure)
		{
			AutosugeestionDto obj = new AutosugeestionDto();

			
			List<AutosugeestionDto> alllstService = new ArrayList<AutosugeestionDto>();
			
			Double servicechages = OtService.operationchargeNew(pId,TrId,scheduledProcedure,findingName,unit,depdocdeskid,chargesOS,count1,treatmentoperationid,otProcedure);
		
			return servicechages;
		}
		@RequestMapping(value = "/hallwisechargeOTSurganwise", method = RequestMethod.POST)
		public @ResponseBody String hallwisechargeOTSurganwise(@RequestParam("pId")Integer pId,@RequestParam("TrId")Integer TrId,@RequestParam("scheduledProcedure")String scheduledProcedure, @RequestParam("callfrom")String  callfrom)	{
	    String  charges = OtService.hallwisechargeOTSurganwise(pId,TrId,scheduledProcedure,callfrom);
		
			return charges;
		}
		@RequestMapping(value = "/getEmergancyChargesOTfinal", method = RequestMethod.GET)
		public @ResponseBody
		double getEmergancyChargesOTfinal() {
			double a = OtService.getEmergancyChargesOTfinal();
			return a;
		}
		
		//Added by Akshata
		@RequestMapping(value = "/fetchAllSubInventory", method = RequestMethod.POST)
		public @ResponseBody SubInventoryMasterDto fetchAllSubInventory(HttpServletRequest request	)
		{
			List<SubInventoryMasterDto> ltMaster = new ArrayList<SubInventoryMasterDto>();
			ltMaster = OtService.fetchAllSubInventory();
			SubInventoryMasterDto subInventoryMasterDto =new SubInventoryMasterDto();
			subInventoryMasterDto.setLstSubInventoryMaster(ltMaster);	
			return subInventoryMasterDto;
		}
		
		//Added by Akshata
		@RequestMapping(value = "/saveOTSubInv", method = RequestMethod.POST)
		@ResponseBody
		public int saveOTSubInv(@RequestParam("selDocument") String name,HttpServletRequest request,@RequestParam("id") Integer id) {
				int response=0;	
			
			response = OtService.saveOTSubInv(name, request, id);

			return response;
			
		}
		
		@RequestMapping(value = "/getPercentageDetails", method = RequestMethod.GET)
		public @ResponseBody
		int  getPercentageDetails(@RequestParam("subserviceId")Integer subserviceId,@RequestParam("unitId")Integer unitId) {
			int a = OtService.getPercentageDetails(subserviceId, unitId);
			return a;
		}
		
		//Added By Badrinath Wagh
		//For OT DashBoard
		@RequestMapping(value="/fetchTodaysOperationDetails",method = RequestMethod.GET)
		@ResponseBody
		public OTDashboardDTO fetchTodaysOperationDetails(){
			
			return OtService.fetchTodaysOperationDetails();
		}
		//Added By Badrinath Wagh
	   //For OT DashBoard
		
		@RequestMapping(value="/fetchTomorrowOperationDetails",method = RequestMethod.GET)
		@ResponseBody
		public OTDashboardDTO fetchTomorrowOperationDetails(){
			
			return OtService.fetchTomorrowOperationDetails();
		}
		//Added By Badrinath Wagh
	   //For OT DashBoard
		@RequestMapping(value="/fetchOpreationFromDate",method = RequestMethod.GET)
		@ResponseBody
		public OTDashboardDTO fetchOpreationFromDate(@RequestParam("opDate") String opDate){
			
			return OtService.fetchOpreationFromDate(opDate);
		}
		
		@RequestMapping(value="/saveAutoChargesForOT",method = RequestMethod.POST)
		@ResponseBody
		public int  saveAutoChargesForOT(@RequestParam("serviceDetails") String serviceDetails){
			
			return OtService.saveAutoChargesForOT(serviceDetails);
		}
		
		@RequestMapping(value="/fetchOperationName",method = RequestMethod.GET)
		@ResponseBody
		public Operation  fetchOperationName(HttpServletRequest request, @RequestParam("status") String status){
			
			List<Operation> operationList = new ArrayList<Operation>();
			operationList = OtService.fetchOperationName(request,status);
			Operation obj = new Operation();
			obj.setOperationList(operationList);
			return obj;
			
		}
		
		//added by vishant
		@RequestMapping(value = "/fetchOperationCount", method = RequestMethod.GET)
		public @ResponseBody
		double  fetchOperationCount(@RequestParam("treatmentId")Integer treatmentId,@RequestParam("categoryId")Integer categoryId
				,@RequestParam("topId")Integer topId,@RequestParam("patientId")Integer patientId) {
			double a = OtService.fetchOperationCount(treatmentId, categoryId,topId,patientId);
			return a;
		}
		
		//added by vishant
		@RequestMapping(value = "/fetchSubServiceCharge", method = RequestMethod.GET)
		public @ResponseBody
		double  fetchSubServiceCharge(@RequestParam("categoryId")Integer categoryId,@RequestParam("unitId")Integer unitId) {
			double a = OtService.fetchSubServiceCharge(categoryId, unitId);
			return a;
		}		
	
		@RequestMapping(value = "/deleteMultipleOTservice", method = RequestMethod.POST)
		public @ResponseBody
		String deleteMultipleOTservice(@RequestParam("labservicelist") String labservicelist,@RequestParam("callform") String callform, 
				@RequestParam("patienttId")Integer patienttId,@RequestParam("treatmentId")Integer treatmentId,@RequestParam("treatmentoperationid")Integer treatmentoperationid	,HttpServletRequest request,@RequestParam("storeId")Integer storeId) {
			log.info("In OTController deleteOTservice()");
			String msg = "";
			if (OtService.deleteMultipleOTservice(labservicelist,patienttId,treatmentId,treatmentoperationid, callform,request,storeId)==1) {
				msg = "Delete Sucessfully!";
			}else{
				
				msg="Network Issues!";	
				
			}
			return msg;
		}	
		
}
