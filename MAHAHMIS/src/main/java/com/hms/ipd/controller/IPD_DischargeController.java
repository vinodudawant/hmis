package com.hms.ipd.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.canteen.dto.CustomizeTemplateDto;
import com.hms.ehat.dto.PrePostChecklistDTO;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ipd.dto.DischargePlanDTO;
import com.hms.ipd.dto.DischargeProcessDTO;
import com.hms.ipd.dto.IpdPatientDischargeSummaryDTO;
import com.hms.ipd.service.IPDDischargeService;
import com.hms.ot.dto.TreatmentOperations;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value ="/IPD_Discharge")
public class IPD_DischargeController
{
		@Autowired
		IPDDischargeService DsService;
	
	@RequestMapping(value = "/saveDischargePlan", method = RequestMethod.POST)
	@ResponseBody
	public String saveDischargePlan(DischargePlanDTO objDto ,HttpServletRequest request) {
		String response="";
		int result = 0;
	
		 result = DsService.saveIPDDischargePlan(objDto, request);
			if(result==1){
				response = "Data Save Successfully..";
			}else if(result==2){
				
				response = "Data Update Successfully...";
			}else{
				response = "oops there is some problem..";
			}
		return response;
		
	}
	
	@RequestMapping(value = "/fetchDischargePlan", method = RequestMethod.POST)
	 @ResponseBody
	 public	DischargePlanDTO fetchDischargePlan(@RequestParam("tId") String tId) {
		
	//	int patientId=Integer.parseInt(pId);
		int treatmentId=Integer.parseInt(tId);
		
		List<DischargePlanDTO> listInitial2 = new ArrayList<DischargePlanDTO>();
		listInitial2 = DsService.fetchDischargePlan(treatmentId);
	
		DischargePlanDTO obj = new DischargePlanDTO();
		obj.setPlandatalist(listInitial2);
		return obj;
		
	}
	
	
	@RequestMapping(value = "/saveDischargeProcess", method = RequestMethod.POST)
	@ResponseBody
	public String saveDischargeProcess(DischargeProcessDTO objDto,HttpServletRequest request) {
		String response="";
		int result = 0;
		
	
		 result = DsService.saveIPDDischargeProcess(objDto, request);
			if(result==1){
				response = "Data Save Successfully..";
			}else if(result==2){
				
				response = "Data Update Successfully...";
			}else{
				response = "oops there is some problem..";
			}
		return response;
		
	}
	
	@RequestMapping(value = "/fetchDischargeProcess", method = RequestMethod.POST)
	 @ResponseBody
	 public	DischargeProcessDTO fetchDischargeProcess(@RequestParam("tId") String tId) {
		
	
		int treatmentId=Integer.parseInt(tId);
		
		List<DischargeProcessDTO> listInitial2 = new ArrayList<DischargeProcessDTO>();
		listInitial2 = DsService.fetchDischargeProcess(treatmentId);
	
		DischargeProcessDTO obj = new DischargeProcessDTO();
		obj.setProcessdatalist(listInitial2);
		return obj;
		
	}
	
	@RequestMapping(value = "/getTemplateListByDepartmentId", method = RequestMethod.GET)
	public @ResponseBody
	CustomizeTemplate getTemplateListByDepartmentId(@RequestParam("departmentId") Integer departmentId,@RequestParam("selectTemplateType") String selectTemplateType) {
		//log.info("getTemplateListByDepartmentId..");
		CustomizeTemplate obj = new CustomizeTemplate();
		obj = DsService.getTemplateListByDepartmentId(departmentId,selectTemplateType);
		// log.debug("getTemplateListByDepartmentId....."+obj);
		return obj;
	}
	
	@RequestMapping(value = "/gettemplatelistbytemplateid", method = RequestMethod.GET)
	public @ResponseBody
	CustomizeTemplate getTemplateListByTemplateId(@RequestParam("id") Integer id) {
		// log.info("getTemplateListByTemplateId..");
		CustomizeTemplate obj = new CustomizeTemplate();
		obj = DsService.getTemplateListByTemplateId(id);
		//  log.debug("getTemplateListByTemplateId....."+obj);
		return obj;
	}
	
	@ResponseBody
	@RequestMapping(value="/saveIPDDischargeSummaryTemplate", method = RequestMethod.POST)
	public 	String saveIPDDischargeSummaryTemplate(@RequestParam("queryType") String queryType,@RequestParam("selTempWiseSummary") int selTempWiseSummary,
			@RequestParam("selTempType") String selTempType,@RequestParam("templateName") String templateName,
			@RequestParam("templateData") String templateData,@RequestParam("idIPDdischargeSummary") String idIPDdischargeSummary,
			@RequestParam("date") String date,@RequestParam("treatmentId") int treatmentId,
			@RequestParam("pid") int pid,@RequestParam("dischargeDate") String dischargeDate,
			@RequestParam("discharge_Type") String discharge_Type		
			) {
		
		int id = Integer.parseInt(idIPDdischargeSummary);
		
		System.out.println("------------>"+id);
		
		IpdPatientDischargeSummaryDTO objTemplate=new IpdPatientDischargeSummaryDTO();
		objTemplate.setIdipdPatientDischargeSummary(id); //admin template id is set to specialization
		objTemplate.setTempType(selTempType);
		objTemplate.setTempName(templateName);
		objTemplate.setTempData(templateData);
		objTemplate.setIdCustomizeTemplate(Integer.parseInt(idIPDdischargeSummary));
		objTemplate.setDate(date);
		objTemplate.setTreatmentId(treatmentId);
		objTemplate.setPatientId(pid);
		objTemplate.setDischargeDate(dischargeDate);
		objTemplate.setDischargeType(discharge_Type);
		Integer isInserted = DsService.saveUpdateIPDDischargeSummaryTemplate(objTemplate,queryType);
		if(isInserted == 1){
			return "IPD Discharge Summary Saved Successfully...";
		}else if(isInserted == 2) {
			return "IPD Discharge Summary Updated Successfully...";
		}else if(isInserted == 3) {
			return "IPD Discharge Summary is already saved...Please View Report";
		}
		/*
		 * else if(isInserted == 4) { return
		 * "IPD Discharge Summary is already saved in Auto Summery...Please Check"; }
		 */
		else {
			return "Something went to Wrong...";
		}
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="/fetchIPDDischargeSummaryTemplate", method = RequestMethod.POST)
	public IpdPatientDischargeSummaryDTO fetchIPDDischargeSummaryTemplate(@RequestParam("treatmentId") int treatmentId,
			@RequestParam("pid") int pid) {
		/*
		 * CustomizeTemplate objTemplate=new CustomizeTemplate();
		 * objTemplate.setTreatmentId(treatmentId); objTemplate.setPatientId(pid);
		 * List<CustomizeTemplate> CustomizeTemplateList = new
		 * ArrayList<CustomizeTemplate>(); CustomizeTemplateList =
		 * DsService.fetchIPDDischargeSummaryTemplate(objTemplate); //Convert result
		 * into JSON object CustomizeTemplate objTemplateMaster = new
		 * CustomizeTemplate();
		 * objTemplateMaster.setCustomizeTemplateList(CustomizeTemplateList);
		 * 
		 * return ConfigUIJSONUtility.getJSONFromObject(objTemplateMaster);
		 * 
		 * 
		 * 
		 */	
		 return DsService.fetchIPDDischargeSummaryTemplate(treatmentId , pid);
	
	}
	
	
	@RequestMapping(value = "/fetchOperationsData", method = RequestMethod.POST)
	 @ResponseBody
	 public	TreatmentOperations fetchOperationsData(@RequestParam("tid") String tid,@RequestParam("pid") String pid) {
		
		System.err.println("tid------->"+tid);
		System.err.println("pid------->"+pid);
		int treatmentId=Integer.parseInt(tid);
		int patientId=Integer.parseInt(pid);
		
		List<TreatmentOperations> listInitial2 = new ArrayList<TreatmentOperations>();
		listInitial2 = DsService.fetchOperationsData(treatmentId,patientId);
	
		TreatmentOperations obj = new TreatmentOperations();
		obj.setListtreatmentoperation(listInitial2);
		return obj;
		
	}
	
	//Added By Badrinath Wagh
    //For fetching details on ipd dashboard for physical discharge
	@RequestMapping(value = "/fetchPhyDisDetailsbyTreatmentId", method = RequestMethod.POST)
	@ResponseBody
	public DischargePlanDTO fetchPhyDisDetailsbyTreatmentId(@RequestParam("treatId") Integer treatId
			,@RequestParam("patientId") Integer patientId) {
		
		DischargePlanDTO obj = new DischargePlanDTO();
		
		List<DischargePlanDTO> list = new ArrayList<DischargePlanDTO>();
		
		list = DsService.fetchPhyDisDetailsbyTreatmentId(treatId,patientId);
		
		obj.setPlandatalist(list);
			
		return obj;
	}
	
}