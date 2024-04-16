package com.hms.ivf.controller;

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

import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dto.IVFAutoSummaryDischargeDTO;
import com.hms.ivf.dto.IVFCpoeServdetails;
import com.hms.ivf.dto.IVFDietDTO;
import com.hms.ivf.dto.IVFDignosisDTO;
import com.hms.ivf.dto.IVFOTNotesDTO;
import com.hms.ivf.dto.IVFRegPatientDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.dto.IvfBillDetailsDto;
import com.hms.ivf.service.IVFDoctorDeskService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value = "/ivfdoctordesk")
public class IVFDoctorDeskController {

	@Autowired
	IVFDoctorDeskService ivfService;
	
	@RequestMapping(value = "/getListIVFRegPatientDTO", method = RequestMethod.GET)
	public @ResponseBody IVFRegPatientDTO getListIVFRegPatientDTO(@RequestParam("page") String pageName){
			
		List<IVFRegPatientDTO> listregivfpatient = new ArrayList<IVFRegPatientDTO>();
		listregivfpatient = ivfService.getListIVFRegPatientDTO(pageName);
		IVFRegPatientDTO obj = new IVFRegPatientDTO();
		obj.setGetListIVFRegPatientDTO(listregivfpatient);
		return obj;
	}
	
	@RequestMapping(value = "/getIvfPatientInfoByIVFTreatId", method = RequestMethod.GET)
	public @ResponseBody IVFRegPatientDTO getIvfPatientInfoByIVFTreatId(@RequestParam("ivftreatmentId") Integer ivftreatmentId){
			
		IVFRegPatientDTO obj = new IVFRegPatientDTO();
		obj = ivfService.getIvfPatientInfoByIVFTreatId(ivftreatmentId);
		return obj;
	}
	
	
	
	@RequestMapping(value = "/setProvisinalOrConfirmDignosisType", method = RequestMethod.GET)
	public @ResponseBody int setProvisinalOrConfirmDignosisType(@RequestParam("ivfdignoMasterId") Integer ivfdignoMasterId,@RequestParam("dignosisType") String dignosisType){
			
		int res=0;
		res = ivfService.setProvisinalOrConfirmDignosisType(ivfdignoMasterId,dignosisType);
		return res;
	}
	
	@RequestMapping(value = "/saveIVFDiet", method = RequestMethod.POST)
	public @ResponseBody int saveIVFDiet(IVFDietDTO obj){
			
		
		int response = ivfService.saveIVFDiet(obj);
		return response;
	}
	
	@RequestMapping(value = "/getListOfIVFDiet", method = RequestMethod.GET)
	public @ResponseBody IVFDietDTO getListOfIVFDiet(@RequestParam("ivftreatmentId") Integer ivftreatmentId,@RequestParam("unitId") Integer unitId){
			
		List<IVFDietDTO> listivfdiet = new ArrayList<IVFDietDTO>();
		listivfdiet = ivfService.getListOfIVFDiet(ivftreatmentId, unitId);
		IVFDietDTO obj = new IVFDietDTO();
		obj.setGetListOfIVFDietDTO(listivfdiet);
		return obj;
	}
	
	@RequestMapping(value = "/deleteIVFDiet", method = RequestMethod.GET)
	public @ResponseBody int deleteIVFDiet(@RequestParam("ivfdietMasterIds") String ivfdietMasterIds,@RequestParam("userId") Integer userId){
			
		int res=0;
		res = ivfService.deleteIVFDiet(ivfdietMasterIds, userId);
		return res;
	}
	
	@RequestMapping(value = "/editIVFDiet", method = RequestMethod.GET)
	public @ResponseBody IVFDietDTO editIVFDiet(@RequestParam("ivfdietMasterId") Integer ivfdietMasterId){
			
		IVFDietDTO obj = new IVFDietDTO();
		obj = ivfService.editIVFDiet(ivfdietMasterId);
		return obj;
	}
	
	@RequestMapping(value = "/getIVFDietListForPrint", method = RequestMethod.GET)
	public @ResponseBody List<IVFDietDTO> getIVFDietListForPrint(@RequestParam("ivfdietMasterIds") String ivfdietMasterIds){
			
		List<IVFDietDTO> lstivfdiet=new ArrayList<IVFDietDTO>();
		lstivfdiet = ivfService.getIVFDietListForPrint(ivfdietMasterIds);
		return lstivfdiet;
	}
	
	@RequestMapping(value = "/saveOpdIpdCpoeIVF", method = RequestMethod.POST)
	@ResponseBody
	public int saveOpdIpdCpoeIVF(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request,
			@RequestParam("queryType") String queryType,
			@RequestParam("module") String module,
			@RequestParam("callfrom") String callfrom,
			@RequestParam("subList") String subList) {
		
			int response=0;
			IvfBillDetailsDto billDetailsDto = (IvfBillDetailsDto) ConfigUIJSONUtility.getObjectFromJSON(serviceDetails, IvfBillDetailsDto.class);
			response = ivfService.savecpoeForIVF(billDetailsDto.getListBillDetails().get(0), request, queryType);
			
			return response;
	}
	
	@RequestMapping(value = "/fetchbilldetails", method = RequestMethod.GET)
	 @ResponseBody
	 public	IVFCpoeServdetails fetchDoctypeMasterList(@RequestParam("tID") Integer tID,@RequestParam("callform") String callform,@RequestParam("servid") Integer servid,	HttpServletRequest request) {
		List<IVFCpoeServdetails> lstbilldetails = new ArrayList<IVFCpoeServdetails>();
		lstbilldetails = ivfService.getlistbiil(tID,callform,servid,request);
	
		IVFCpoeServdetails obj = new IVFCpoeServdetails();
		obj.setCpoeServdetails(lstbilldetails);
		return obj;
	}
	
	@RequestMapping(value = "/deleteservdetails", method = RequestMethod.POST)
	public @ResponseBody
	String deleteservdetails(@RequestParam("labservicelist") String labservicelist,@RequestParam("callform") String callform, HttpServletRequest request) {

		String msg = "";
		if (ivfService.deleteservdetails(labservicelist, callform,request)==1) {
			msg = "Delete Successfully!";
		}else{
			
			msg="Network Issues!";	
			
		}
		return msg;
	}
	
	@RequestMapping(value = "/saveAutoIvfDischargeSummery", method = RequestMethod.POST)
	public @ResponseBody int saveAutoIvfDischargeSummery(IVFAutoSummaryDischargeDTO obj){
			
		
		int response = ivfService.saveAutoIvfDischargeSummery(obj);
		return response;
	}
	
	
	@RequestMapping(value = "/getIvfAutoSummary", method = RequestMethod.GET)
	public @ResponseBody IVFAutoSummaryDischargeDTO getIvfAutoSummary(@RequestParam("ivftreatmentId") Integer ivftreatmentId){
			
		IVFAutoSummaryDischargeDTO obj = new IVFAutoSummaryDischargeDTO();
		obj = ivfService.getIvfAutoSummary(ivftreatmentId);
		return obj;
	}
	
	@RequestMapping(value = "/getPrevIvfPatdetails", method = RequestMethod.POST)
	public @ResponseBody
	IVFTreatmentDTO getPrevPatdetails(@RequestParam("patientId") Integer patientId,HttpServletRequest request) {

	List<IVFTreatmentDTO> listIvfPatDetails = new ArrayList<IVFTreatmentDTO>();
	listIvfPatDetails =  (List<IVFTreatmentDTO>) ivfService.getPrevIvfPatdetails(patientId);
	
	IVFTreatmentDTO obj=new IVFTreatmentDTO();
	obj.setListIvfTreatment(listIvfPatDetails);
	return obj;			
  }
	
	@RequestMapping(value = "/autoSuggestionOfPrevIvfPatient", method = RequestMethod.POST)
	@ResponseBody
	public RegistrationViewDto autoSuggestionOfPrevIvfPatient(@RequestParam("findText") String findText,@RequestParam("patSearchType") String patSearchType,
			@RequestParam("callFrom") String callFrom) {
		 
		RegistrationViewDto ltRegistrationViewDto = new  RegistrationViewDto();
		ltRegistrationViewDto = ivfService.autoSuggestionOfPrevIvfPatient(findText,Integer.parseInt(patSearchType),callFrom);	
		return ltRegistrationViewDto;
	}
	
	@RequestMapping(value = "/getPreviousIvfPatientTreatment ", method = RequestMethod.POST)
	public @ResponseBody
	IVFRegPatientDTO getPreviousIvfPatientTreatment(HttpServletRequest request,@RequestParam("letter") String letter,
			@RequestParam("usertype") String usertype) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		List<IVFRegPatientDTO> ltPreviousIvfPatientViewDto = new ArrayList<IVFRegPatientDTO>();
		
		ltPreviousIvfPatientViewDto = ivfService.getPreviousIvfPatientTreatment(letter,usertype,unitId);
	
		IVFRegPatientDTO obj=new IVFRegPatientDTO();
		
		
		obj.setGetListIVFRegPatientDTO(ltPreviousIvfPatientViewDto);
			 
		return obj;
	}
	
	
	@RequestMapping(value = "/getIvfPatientTreatmentForDD ", method = RequestMethod.POST)
	public @ResponseBody
	IVFRegPatientDTO getIvfPatientTreatmentForDD(HttpServletRequest request,@RequestParam("letter") String letter,
			@RequestParam("usertype") String usertype) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		List<IVFRegPatientDTO> ltPreviousIvfPatientViewDto = new ArrayList<IVFRegPatientDTO>();
		
		ltPreviousIvfPatientViewDto = ivfService.getIvfPatientTreatmentForDD(letter,usertype,unitId);
	
		IVFRegPatientDTO obj=new IVFRegPatientDTO();
		
		
		obj.setGetListIVFRegPatientDTO(ltPreviousIvfPatientViewDto);
			 
		return obj;
	}
	@RequestMapping(value = "/getIvfPreviousAutoSummaryList", method = RequestMethod.GET)
	public @ResponseBody IVFRegPatientDTO getIvfPreviousAutoSummaryList(){
			
		List<IVFRegPatientDTO> listregivfpatient = new ArrayList<IVFRegPatientDTO>();
		listregivfpatient = ivfService.getIvfPreviousAutoSummaryList();
		IVFRegPatientDTO obj = new IVFRegPatientDTO();
		obj.setGetListIVFRegPatientDTO(listregivfpatient);
		return obj;
	}
	
	@RequestMapping(value = "/getIvfTreatmentListByPatientId", method = RequestMethod.GET)
	public @ResponseBody IVFRegPatientDTO getIvfTreatmentListByPatientId(@RequestParam("patientId") Integer patientId){
			
		List<IVFRegPatientDTO> listregivfpatient = new ArrayList<IVFRegPatientDTO>();
		listregivfpatient = ivfService.getIvfTreatmentListByPatientId(patientId);
		IVFRegPatientDTO obj = new IVFRegPatientDTO();
		obj.setGetListIVFRegPatientDTO(listregivfpatient);
		return obj;
	}
	
	@RequestMapping(value = "/autoSuggestionForPriviousAuttosummary", method = RequestMethod.GET)
	public @ResponseBody IVFRegPatientDTO autoSuggestionForPriviousAuttosummary(@RequestParam("searchText") String searchText){
			
		List<IVFRegPatientDTO> listregivfpatient = new ArrayList<IVFRegPatientDTO>();
		listregivfpatient = ivfService.autoSuggestionForPriviousAuttosummary(searchText);
		IVFRegPatientDTO obj = new IVFRegPatientDTO();
		obj.setGetListIVFRegPatientDTO(listregivfpatient);
		return obj;
	}
	
	@RequestMapping(value = "/getPatientInfoByPatientId", method = RequestMethod.GET)
	public @ResponseBody IVFRegPatientDTO getPatientInfoByPatientId(@RequestParam("patientId") Integer patientId){
			
		IVFRegPatientDTO obj = new IVFRegPatientDTO();
		obj = ivfService.getPatientInfoByPatientId(patientId);
		
	
		return obj;
	}
	
	
	@RequestMapping(value = "/saveIvfAutoSummaryOTNotes", method = RequestMethod.POST)
	public @ResponseBody int saveIvfAutoSummaryOTNotes(IVFOTNotesDTO obj){
			
		
		int response = ivfService.saveIvfAutoSummaryOTNotes(obj);
		return response;
	}
	
	
	@RequestMapping(value = "/getIvfOTNotes", method = RequestMethod.GET)
	public @ResponseBody IVFOTNotesDTO getIvfOTNotes(@RequestParam("ivftreatmentId") Integer ivftreatmentId){
			
		IVFOTNotesDTO obj = new IVFOTNotesDTO();
		obj = ivfService.getIvfOTNotes(ivftreatmentId);
		return obj;
	}
	
	@RequestMapping(value = "/getPatientOnIvfDoctorDesk", method = RequestMethod.GET)
	public @ResponseBody IVFRegPatientDTO getPatientOnIvfDoctorDesk(@RequestParam("fromDate") String fromDate,@RequestParam("toDate") String toDate,@RequestParam("page") String pageName){
			
		List<IVFRegPatientDTO> listregivfpatient = new ArrayList<IVFRegPatientDTO>();
		listregivfpatient = ivfService.getPatientOnIvfDoctorDesk(fromDate, toDate, pageName);
		IVFRegPatientDTO obj = new IVFRegPatientDTO();
		obj.setGetListIVFRegPatientDTO(listregivfpatient);
		return obj;
	}
	
}