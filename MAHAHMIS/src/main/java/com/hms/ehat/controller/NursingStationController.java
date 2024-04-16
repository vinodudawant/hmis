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

import com.hms.ehat.dto.NursingReAssessment1DayDTO;
import com.hms.ehat.dto.OneDayAssessmentDTO;
import com.hms.ehat.dto.PersonalHygieneChartDTO;
import com.hms.ehat.dto.GlasgowComaScorePage4DTO;
import com.hms.ehat.dto.DVTScoreDTO;
import com.hms.ehat.dto.GlasgowComaScoreDTO;
import com.hms.ehat.dto.HygieneChecklistDTO;
import com.hms.ehat.dto.InvasionSiteCareDTO;
import com.hms.ehat.dto.MFRAScoreDTO;
import com.hms.ehat.dto.MFRAScorePage4DTO;
import com.hms.ehat.dto.NursingCarePlanDTO;
import com.hms.ehat.dto.NursingCarePlanPage4DTO;
import com.hms.ehat.dto.PlanTreatDTO;
import com.hms.ehat.dto.PrePostDetailsDTO;
import com.hms.ehat.dto.SASScoreDTO;
import com.hms.ehat.dto.UlcerRiskScoreDTO;
import com.hms.ehat.dto.UlcerRiskScorePage4DTO;
import com.hms.ehat.dto.VIPScoreDTO;
import com.hms.ehat.dto.assessmentpediatric2DTO;
import com.hms.ehat.dto.assessmentpediatric3DTO;
import com.hms.ehat.dto.assessmentpediatricDTO;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ehat.dto.nursingthreeDTO;
import com.hms.ehat.dto.nursingtwoDTo;
import com.hms.ehat.service.NursingStationService;
import com.hms.patient.util.ConfigUIJSONUtility;


@Controller
@RequestMapping(value = "/nursingstation")
public class NursingStationController {

		@Autowired
		NursingStationService NSService ;
		
		
		/**@author     :Sufiyan
		 * @Date       :4-March-2018
		 * @code       :for saving Personal Hygiene Information  ***/
		@RequestMapping(value = "/saveHygieneChartInformation", method = RequestMethod.POST)
		@ResponseBody
		public String saveHygieneChartInformation(@RequestParam("listPHC") String str,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			PersonalHygieneChartDTO objDto = (PersonalHygieneChartDTO) ConfigUIJSONUtility
					.getObjectFromJSON(str, PersonalHygieneChartDTO.class);
			
			result =NSService.savePersonalHygieneChart(objDto, request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
			
		}
		
		/************
		 *@author	: Sufiyan
		 *@date		:  5-Mar-2018
		 *@code		:for fetching Personal Hygiene Chart
		 ***********/
		@RequestMapping(value = "/fetchPersonalHygieneChart", method = RequestMethod.POST)
		 @ResponseBody
		 public	PersonalHygieneChartDTO fetchPersonalHygieneChart(@RequestParam("treatmentId") String treatId,
				 @RequestParam("todays_date") String date) {
			
			int treatmentId=Integer.parseInt(treatId);
			List<PersonalHygieneChartDTO> listPHC = new ArrayList<PersonalHygieneChartDTO>();
			listPHC = NSService.fetchPersonalHygieneChart(treatmentId,date);
		
			PersonalHygieneChartDTO obj = new PersonalHygieneChartDTO();
			obj.setListPHC(listPHC);
			return obj;
			
		}
		
		
		/************
		 *@author	: Sufiyan
		 *@date		:  5-Mar-2018
		 *@code		:for fetching Invasion Site Care Information
		 ***********/
		@RequestMapping(value = "/fetchInvasionSiteCareInformation", method = RequestMethod.POST)
		 @ResponseBody
		 public	InvasionSiteCareDTO fetchInvasionSiteCareInformation(@RequestParam("treatmentId") String treatId,
				 @RequestParam("todays_date") String date) {
			
			int treatmentId=Integer.parseInt(treatId);
			
			List<InvasionSiteCareDTO> listISC = new ArrayList<InvasionSiteCareDTO>();
			listISC = NSService.fetchInvasionSiteCareInformation(treatmentId,date);
		
			InvasionSiteCareDTO obj = new InvasionSiteCareDTO();
			obj.setListISC(listISC);
			return obj;
			
		}

		
		/**@author     :Sufiyan
		 * @Date       :4-March-2018
		 * @code       :for saving Invasion Site Care Information  ***/
		@RequestMapping(value = "/saveInvasionSiteCareInformation", method = RequestMethod.POST)
		@ResponseBody
		public String saveInvasionSiteCare(
				@RequestParam("listISC") String listISC,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			InvasionSiteCareDTO objDto = (InvasionSiteCareDTO) ConfigUIJSONUtility
					.getObjectFromJSON(listISC, InvasionSiteCareDTO.class);
			
			result =NSService.saveInvasionSiteCare(objDto, request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
			
		}
		
		/**@author     :Sufiyan
		 * @Date       :4-March-2018
		 * @code       :for saving Invasion Site Care Information  ***/
		@RequestMapping(value = "/deleteInvasiveSiteCareRecord", method = RequestMethod.POST)
		@ResponseBody
		public String deleteInvasiveSiteCareRecord(
				@RequestParam("id") String idstr,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			int id=Integer.parseInt(idstr);
			
			result =NSService.deleteInvasiveSiteCareRecord(id,request);
			
			if(result==1){
				response="Record Removed successfully..!";
			}else{
				response="Record not Found..!";
			}
			return response;
			
		}
		
		
		@RequestMapping(value = "/saveNursingCarePlanInformation", method = RequestMethod.POST)
		@ResponseBody
		public String saveNursingCarePlan(@RequestParam("NursingCarePlan") String listNSC,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			NursingCarePlanDTO objDto = (NursingCarePlanDTO) ConfigUIJSONUtility
					.getObjectFromJSON(listNSC, NursingCarePlanDTO.class);
			
			result =NSService.saveNursingCarePlan(objDto,request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
			
		}
		/************
		 *@author	: Sufiyan
		 *@date		:  5-Mar-2018
		 *@code		:for fetching Invasion Site Care Information
		 ***********/
		@RequestMapping(value = "/fetchNursingCarePlanInformation", method = RequestMethod.POST)
		 @ResponseBody
		 public	NursingCarePlanDTO fetchNursingCarePlanInformation(@RequestParam("treatId") String treatId,
				 @RequestParam("todays_date") String date) {
			
			int treatmentId =Integer.parseInt(treatId);
			
			List<NursingCarePlanDTO> listNCP = new ArrayList<NursingCarePlanDTO>();
			listNCP = NSService.fetchNursingCarePlan(treatmentId,date);
		
			NursingCarePlanDTO obj = new NursingCarePlanDTO();
			obj.setListNCP(listNCP);
			return obj;
			
		}
			
		/************
		 *@author	: Sufiyan
		 *@date		:  5-Mar-2018
		 *@code		:for saving Hand Hygiene Checklist Information
		 ***********/	
		@RequestMapping(value = "/saveHandHygieneChecklistInformation", method = RequestMethod.POST)
		@ResponseBody
		public String saveHygieneChecklistInformation(
				@RequestParam("HygieneChecklist") String listHHC, HttpServletRequest request) {
			
			int result=0;
			String response="";
			
			HygieneChecklistDTO objDto = (HygieneChecklistDTO) ConfigUIJSONUtility
					.getObjectFromJSON(listHHC, HygieneChecklistDTO.class);
			
			result =NSService.saveHygieneChecklist(objDto,request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
			
		}		
		
		
		/************
		 *@author	: Sufiyan
		 *@date		:  5-Mar-2018
		 *@code		:for fetching Hand Hygiene Checklist Information
		 ***********/
		@RequestMapping(value = "/fetchHandHygieneChecklistInformation", method = RequestMethod.POST)
		 @ResponseBody
		 public	HygieneChecklistDTO fetchHandHygieneChecklistInformation(@RequestParam("treatmentId") String treatId,
				 @RequestParam("todays_date") String date) {
			
			int treatmentId =Integer.parseInt(treatId);
			
			List<HygieneChecklistDTO> listHHC = new ArrayList<HygieneChecklistDTO>();
			listHHC = NSService.fetchHandHygieneChecklist(treatmentId,date);
		
			HygieneChecklistDTO obj = new HygieneChecklistDTO();
			obj.setListHHC(listHHC);
			return obj;
			
		}
		
		/************
		 *@author	: Sufiyan
		 *@date		:  6-Mar-2018
		 *@code		:for saving Hand Hygiene Checklist Information
		 ***********/	
		@RequestMapping(value = "/saveUlcerRiskScore", method = RequestMethod.POST)
		@ResponseBody
		public String saveUlcerRiskScore(@RequestParam("UlcerRiskScore") String listURS,HttpServletRequest request) {
			
			int result=0;
			String response="";
			System.err.println("in Controller listURS "+listURS);
			
			UlcerRiskScoreDTO objDto = (UlcerRiskScoreDTO) ConfigUIJSONUtility
					.getObjectFromJSON(listURS ,UlcerRiskScoreDTO.class);
			
			result =NSService.saveUlcerRiskScore(objDto,request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
			
		}
		
		/************
		 *@author	: Sufiyan
		 *@date		:  6-Mar-2018
		 *@code		:for fetching Ulcer Risk Score
		 ***********/
		@RequestMapping(value = "/fetchUlcerRiskScore", method = RequestMethod.POST)
		 @ResponseBody
		 public	UlcerRiskScoreDTO fetchUlcerRiskScore(@RequestParam("ulcerRiskScoreId") String ulcerScoreId,
				 @RequestParam("todays_date") String date,@RequestParam("treatmentId") String treatId) {
			
			int ulcerRiskScoreId =Integer.parseInt(ulcerScoreId);
			int treatmentId =Integer.parseInt(treatId);
			
			List<UlcerRiskScoreDTO> listURS = new ArrayList<UlcerRiskScoreDTO>();
			listURS = NSService.fetchUlcerRiskScore(ulcerRiskScoreId,treatmentId,date);
		
			UlcerRiskScoreDTO obj = new UlcerRiskScoreDTO();
			obj.setListURS(listURS);
			return obj;
			
		}
		
		
		/**@author     :Sufiyan
		 * @Date       :6-March-2018
		 * @code       :for saving Invasion Site Care Information  ***/
		@RequestMapping(value = "/saveGlasgowComaScore", method = RequestMethod.POST)
		@ResponseBody
		public String saveGlasgowComaScore(@RequestParam("GlasgowComaScore") String listGCS,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			GlasgowComaScoreDTO objDto = (GlasgowComaScoreDTO) ConfigUIJSONUtility
					.getObjectFromJSON(listGCS, GlasgowComaScoreDTO.class);
			
			result =NSService.saveGlasgowComaScore(objDto, request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
			
		}
		
		/************
		 *@author	: Sufiyan
		 *@date		:  6-Mar-2018
		 *@code		:for fetching Ulcer Risk Score
		 ***********/
		@RequestMapping(value = "/fetchGlasgowComaScore", method = RequestMethod.POST)
		 @ResponseBody
		 public	GlasgowComaScoreDTO fetchGlasgowComaScore(@RequestParam("Id") String glassgowId, 
				 @RequestParam("todays_date") String date,@RequestParam("treatmentId") String treatId) {
			
			int glassgowScoreId =Integer.parseInt(glassgowId);
			int treatmentId =Integer.parseInt(treatId);
			
			List<GlasgowComaScoreDTO> listGCS = new ArrayList<GlasgowComaScoreDTO>();
			listGCS = NSService.fetchGlasgowComaScore(glassgowScoreId,treatmentId,date);
		
			GlasgowComaScoreDTO obj = new GlasgowComaScoreDTO();
			obj.setListGCS(listGCS);
			return obj;
			
		}	
		
		
		/**@author     :Sufiyan
		 * @Date       :6-March-2018
		 * @code       :for saving VIP Score And Action Taken  ***/
		@RequestMapping(value = "/saveVIPScoreAndActionTaken", method = RequestMethod.POST)
		@ResponseBody
		public String saveVIPScoreAndActionTaken(@RequestParam("VIPScoreStr") String listVIP,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			System.err.println("VIPScoreStr in controller :"+listVIP);
			
			VIPScoreDTO objDto = (VIPScoreDTO) ConfigUIJSONUtility
					.getObjectFromJSON(listVIP, VIPScoreDTO.class);
			
			result =NSService.saveVIPScoreAndActionTaken(objDto, request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
			
		}
		
		/************
		 *@author	: Sufiyan
		 *@date		:  6-Mar-2018
		 *@code		:for fetching Ulcer Risk Score
		 ***********/
		@RequestMapping(value = "/fetchVIPScoreAndActionTaken", method = RequestMethod.POST)
		 @ResponseBody
		 public	VIPScoreDTO fetchVIPScoreAndActionTaken(@RequestParam("todays_date") String date,
				 @RequestParam("treatmentId") String treatId ) {
			
			int treatmentId =Integer.parseInt(treatId);
			
			List<VIPScoreDTO> listVIP = new ArrayList<VIPScoreDTO>();
			listVIP = NSService.fetchVIPScore(treatmentId,date);
		
			VIPScoreDTO obj = new VIPScoreDTO();
			obj.setListVIP(listVIP);
			return obj;
			
		}	
		
		/**@author     :Sufiyan
		 * @Date       :7-March-2018
		 * @code       :for saving DVT Score And Action Taken  ***/
		@RequestMapping(value = "/saveDVTScoreInformation", method = RequestMethod.POST)
		@ResponseBody
		public String saveDVTScoreInformation(@RequestParam("DVTScore") String DVTScoreStr,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			DVTScoreDTO objDto = (DVTScoreDTO) ConfigUIJSONUtility
					.getObjectFromJSON(DVTScoreStr, DVTScoreDTO.class);
			
			result =NSService.saveDVTScore(objDto, request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}
			else{
				response="Network Issue... ";
			}
			return response; 
		}	
		
		/************
		 *@author	: Sufiyan
		 *@date		:  7-Mar-2018
		 *@code		:for fetching DVT Score
		 ***********/
		@RequestMapping(value = "/fetchDVTScore", method = RequestMethod.POST)
		 @ResponseBody
		 public	DVTScoreDTO fetchDVTScore(@RequestParam("todays_date") String date,
				 @RequestParam("treatmentId") String treatId ) {
			
			int treatmentId =Integer.parseInt(treatId);
			
			List<DVTScoreDTO> listDVT = new ArrayList<DVTScoreDTO>();
			listDVT = NSService.fetchDVTScore(treatmentId,date);
		
			DVTScoreDTO obj = new DVTScoreDTO();
			obj.setListDVT(listDVT);
			return obj;
			
		}	
		
		/**@author     :Sufiyan
		 * @Date       :7-March-2018
		 * @code       :for saving MFRA Score ***/
		@RequestMapping(value = "/saveMFRAScoreInformation", method = RequestMethod.POST)
		@ResponseBody
		public String saveMFRAScoreInformation(@RequestParam("MFRAScore") String MFRAScoreStr,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			MFRAScoreDTO objDto = (MFRAScoreDTO) ConfigUIJSONUtility
					.getObjectFromJSON(MFRAScoreStr, MFRAScoreDTO.class);
			
			result =NSService.saveMFRAScore(objDto, request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
		}		
		
		/************
		 *@author	: Sufiyan
		 *@date		:  7-Mar-2018
		 *@code		:for fetching DVT Score
		 ***********/
		@RequestMapping(value = "/fetchMFRAScoreInformation", method = RequestMethod.POST)
		 @ResponseBody
		 public	MFRAScoreDTO fetchMFRAScoreInformation(@RequestParam("todays_date") String date,
				 @RequestParam("treatmentId") String treatId ) {
			
			int treatmentId =Integer.parseInt(treatId);
			
			List<MFRAScoreDTO> listMFRA = new ArrayList<MFRAScoreDTO>();
			listMFRA = NSService.fetchMFRAScore(treatmentId,date);
		
			MFRAScoreDTO obj = new MFRAScoreDTO();
			obj.setListMFRA(listMFRA);
			return obj;
			
		}	
		
		/**@author     :Sufiyan
		 * @Date       :7-March-2018
		 * @code       :for saving MFRA Score ***/
		
		@RequestMapping(value = "/saveSASScoreAction", method = RequestMethod.POST)
		@ResponseBody
		public String saveSASScoreAction(@RequestParam("SASScore") String SASScoreStr,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			SASScoreDTO objDto = (SASScoreDTO) ConfigUIJSONUtility
					.getObjectFromJSON(SASScoreStr, SASScoreDTO.class);
			
			result =NSService.saveSASScore(objDto, request);
			
			 if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
		}			
		
		
		/************
		 *@author	: Sufiyan
		 *@date		:  7-Mar-2018
		 *@code		:for fetching DVT Score
		 ***********/
		@RequestMapping(value = "/fetchSASScoreAction", method = RequestMethod.POST)
		 @ResponseBody
		 public	SASScoreDTO fetchSASScoreAction(@RequestParam("todays_date") String date,
				 @RequestParam("treatmentId") String treatId) {
			
			int treatmentId =Integer.parseInt(treatId);
			
			List<SASScoreDTO> listSAS = new ArrayList<SASScoreDTO>();
			listSAS = NSService.fetchSASScore(treatmentId,date);
		
			SASScoreDTO obj = new SASScoreDTO();
			obj.setListSAS(listSAS);
			return obj;
			
		}			
		
		/**@author     :Sufiyan
		 * @Date       :6-March-2018
		 * @code       :for saving Invasion Site Care Information  ***/
		@RequestMapping(value = "/saveGlasgowComaScorePage4", method = RequestMethod.POST)
		@ResponseBody
		public String saveGlasgowComaScorePage4(@RequestParam("GlasgowComaScorePage4") String listGCS,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			GlasgowComaScorePage4DTO objDto = (GlasgowComaScorePage4DTO) ConfigUIJSONUtility
					.getObjectFromJSON(listGCS, GlasgowComaScorePage4DTO.class);
			
			result =NSService.saveGlasgowComaScorePage4(objDto, request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
			
		}
		
		/************
		 *@author	: Sufiyan
		 *@date		:  8-Mar-2018
		 *@code		:for fetching Ulcer Risk Score for page 4
		 ***********/
		@RequestMapping(value = "/fetchGlasgowComaScorePage4", method = RequestMethod.POST)
		 @ResponseBody
		 public	GlasgowComaScorePage4DTO fetchGlasgowComaScorePage4(
				 @RequestParam("todays_date") String date,@RequestParam("treatmentId") String treatId) {
			
			int treatmentId =Integer.parseInt(treatId);
			
			List<GlasgowComaScorePage4DTO> listGCS = new ArrayList<GlasgowComaScorePage4DTO>();
			listGCS = NSService.fetchGlasgowComaScorePage4(treatmentId,date);
		
			GlasgowComaScorePage4DTO obj = new GlasgowComaScorePage4DTO();
			obj.setListGCS(listGCS);
			return obj;
			
		}	
	
		/**@author     :Sufiyan
		 * @Date       :7-March-2018
		 * @code       :for saving MFRA Score ***/
		@RequestMapping(value = "/saveMFRAScorePage4", method = RequestMethod.POST)
		@ResponseBody
		public String saveMFRAScorePage4(@RequestParam("MFRAScore") String MFRAScoreStr,
				HttpServletRequest request) {
			int result=0;
			String response="";
			System.err.println("MFRAScoreStr in Controller :"+MFRAScoreStr);
			MFRAScorePage4DTO objDto = (MFRAScorePage4DTO) ConfigUIJSONUtility
					.getObjectFromJSON(MFRAScoreStr, MFRAScorePage4DTO.class);
			
			result =NSService.saveMFRAScorePage4(objDto, request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
		}		
		
		/************
		 *@author	: Sufiyan
		 *@date		:  8-Mar-2018
		 *@code		:for fetching DVT Score for page 4
		 ***********/
		@RequestMapping(value = "/fetchMFRAScorePage4", method = RequestMethod.POST)
		 @ResponseBody
		 public	MFRAScorePage4DTO fetchMFRAScorePage4(@RequestParam("todays_date") String date,
				 @RequestParam("treatmentId") String treatId ) {
			
			int treatmentId =Integer.parseInt(treatId);
			
			List<MFRAScorePage4DTO> listMFRA = new ArrayList<MFRAScorePage4DTO>();
			listMFRA = NSService.fetchMFRAScorePage4(treatmentId,date);
		
			MFRAScorePage4DTO obj = new MFRAScorePage4DTO();
			obj.setListMFRA(listMFRA);
			return obj;
			
		}	
	
		/************
		 *@author	: Sufiyan
		 *@date		:  8-Mar-2018
		 *@code		:for saving Ulcer Risk Core for page 4
		 ***********/	
		@RequestMapping(value = "/saveUlcerRiskScorePage4", method = RequestMethod.POST)
		@ResponseBody
		public String saveUlcerRiskScorePage4(@RequestParam("UlcerRiskScore") String listURS,HttpServletRequest request) {
			
			int result=0;
			String response="";
			System.err.println("in Controller listURS "+listURS);
			
			UlcerRiskScorePage4DTO objDto = (UlcerRiskScorePage4DTO) ConfigUIJSONUtility
					.getObjectFromJSON(listURS ,UlcerRiskScorePage4DTO.class);
			
			result =NSService.saveUlcerRiskScorePage4(objDto,request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
			
		}
		
	
		/************
		 *@author	: Sufiyan
		 *@date		:  8-Mar-2018
		 *@code		:for fetching Ulcer Risk Score for page 4
		 ***********/
		@RequestMapping(value = "/fetchUlcerRiskScorePage4", method = RequestMethod.POST)
		 @ResponseBody
		 public	UlcerRiskScorePage4DTO fetchUlcerRiskScorePage4(@RequestParam("todays_date") String date,
				 @RequestParam("treatmentId") String treatId ) {
			
			int treatmentId =Integer.parseInt(treatId);
			
			List<UlcerRiskScorePage4DTO> listURS = new ArrayList<UlcerRiskScorePage4DTO>();
			listURS = NSService.fetchUlcerRiskScorePage4(treatmentId,date);
		
			UlcerRiskScorePage4DTO obj = new UlcerRiskScorePage4DTO();
			obj.setListURS(listURS);
			return obj;
			
		}
	
		/************
		 *@author	: Sufiyan
		 *@date		:  8-Mar-2018
		 *@code		:for saving Nursing Care Plan for page 4
		 ***********/	
		@RequestMapping(value = "/saveNursingCarePlanPage4", method = RequestMethod.POST)
		@ResponseBody
		public String saveNursingCarePlanPage4(@RequestParam("NursingCarePlan") String listNCP,HttpServletRequest request) {
			
			int result=0;
			String response="";
			System.err.println("in Controller listNCP "+listNCP);
			
			NursingCarePlanPage4DTO objDto = (NursingCarePlanPage4DTO) ConfigUIJSONUtility
					.getObjectFromJSON(listNCP ,NursingCarePlanPage4DTO.class);
			
			result =NSService.saveNursingCarePlanPage4(objDto,request);
			
			if(result==1){
				response="Record saved successfully..!";
			}else if(result==2){
				response="Record updated successfully..!";
			}else{
				response="Network Error..!";
			}
			return response;
			
		}
		
		
		/************
		 *@author	: Sufiyan
		 *@date		:  8-Mar-2018
		 *@code		:for fetching Nursing Care Plan for page 4
		 ***********/
		@RequestMapping(value = "/fetchNursingCarePlanPage4", method = RequestMethod.POST)
		 @ResponseBody
		 public	NursingCarePlanPage4DTO fetchNursingCarePlanPage4(@RequestParam("todays_date") String date,
				 @RequestParam("treatmentId") String treatId ) {
			
			int treatmentId =Integer.parseInt(treatId);
			
			List<NursingCarePlanPage4DTO> listNCP = new ArrayList<NursingCarePlanPage4DTO>();
			listNCP = NSService.fetchNursingCarePlanPage4(treatmentId,date);
		
			NursingCarePlanPage4DTO obj = new NursingCarePlanPage4DTO();
			obj.setListNCP(listNCP);
			return obj;
			
		}
		
		@RequestMapping(value = "/saveNursingAssessment03", method = RequestMethod.POST)
		@ResponseBody
		public String saveNursingAssessmentData03(@RequestParam("Nursingobj03") String Nursingobj03,HttpServletRequest request) {
			String response="";
			int result = 0;
			nursingthreeDTO objDto = (nursingthreeDTO) ConfigUIJSONUtility
					.getObjectFromJSON(Nursingobj03, nursingthreeDTO.class);
			
			 result = NSService.saveNursingAssessmentData03(objDto.getNursingthreelist().get(0), request);
				if(result==1){
					response = "Data Inserted..";
				}else if(result==2){
					
					response = "Data Updated...";
				}else{
					response = "oops there is some problem..";
				}
			return response;
			
		}
		
		@RequestMapping(value = "/NursingA3fetch", method = RequestMethod.POST)
		 @ResponseBody
		 public	nursingthreeDTO NursingA3fetchData(@RequestParam("pId") String pId,
				 @RequestParam("tId") String tId) {
			
			int patientId=Integer.parseInt(pId);
			int treatmentId=Integer.parseInt(tId);
			
			List<nursingthreeDTO> listInitial2 = new ArrayList<nursingthreeDTO>();
			listInitial2 = NSService.NursingA3fetchData(patientId,treatmentId);
		
			nursingthreeDTO obj = new nursingthreeDTO();
			obj.setNursingthreelist(listInitial2);
			return obj;
			
		}
		

		/**@author     :Harshit
		 * @Date       :5-March-2018
		 * @code       :For Saving Nursing Assessment One Day Information  ***/
		
		
		@RequestMapping(value = "/saveAssessmentOneDay", method = RequestMethod.POST)
		@ResponseBody
		public String saveAssessmentOneDayData(@RequestParam("OneDayDetails") String OneDayDetails,HttpServletRequest request) {
			
			String response="";
			int result = 0;
			
			System.err.println("OneDayDetails in controller :"+OneDayDetails);
			OneDayAssessmentDTO objDto = (OneDayAssessmentDTO) ConfigUIJSONUtility
					.getObjectFromJSON(OneDayDetails, OneDayAssessmentDTO.class);

			 result = NSService.saveOneDayAssessment(objDto.getListOneDay().get(0), request);
				if(result==1){
					response = "Data Inserted..";
				}else if(result==2){
					
					response = "Data Updated..";
				}else{
					response = "oops there is some problem..";
				}
			return response;
			
		}
		
		
		
		@RequestMapping(value = "/fetchAssessmentOneDay", method = RequestMethod.POST)
		 @ResponseBody
		 public	OneDayAssessmentDTO fetchAssessmentOneDayInformation(@RequestParam("pId") String pId,
				 @RequestParam("tId") String tId) {
			
			int patientId=Integer.parseInt(pId);
			int treatmentId=Integer.parseInt(tId);
		
			return NSService.fetchAssessmentOneDayInformation(patientId,treatmentId);
			
		}

		@RequestMapping(value = "/saveAssessmentPediatric", method = RequestMethod.POST)
		@ResponseBody
		public String saveAssessmentPediatric(@RequestParam("assessmentpediatric") String assessmentpediatric,HttpServletRequest request) {
			
			String response="";
			int result = 0;
			assessmentpediatricDTO objDto = (assessmentpediatricDTO) ConfigUIJSONUtility
					.getObjectFromJSON(assessmentpediatric, assessmentpediatricDTO.class);

			 result = NSService.saveAssessmentPediatric(objDto.getListpediatric().get(0), request);
				if(result==1){
					response = "Data Inserted..";
				}else if(result==2){
					
					response = "Data Updated..";
				}else{
					response = "oops there is some problem..";
				}
			return response;
			
		}
		
		
		@RequestMapping(value = "/fetchInitalNursing", method = RequestMethod.POST)
		 @ResponseBody
		 public	assessmentpediatricDTO fetchInitalNursingAssessment(@RequestParam("pId") String pId,
				 @RequestParam("tId") String tId) {
			
			int patientId=Integer.parseInt(pId);
			int treatmentId=Integer.parseInt(tId);
			
			List<assessmentpediatricDTO> listInitial = new ArrayList<assessmentpediatricDTO>();
			listInitial = NSService.fetchInitalNursingAssessment(patientId,treatmentId);
		
			assessmentpediatricDTO obj = new assessmentpediatricDTO();
			obj.setListpediatric(listInitial);
			return obj;
			
		}

		@RequestMapping(value = "/saveAssessmentPediatric2", method = RequestMethod.POST)
		@ResponseBody
		public String saveAssessmentPediatric2(@RequestParam("assessmentpediatric2") String assessmentpediatric2,HttpServletRequest request) {
			
			String response="";
			int result = 0;
			assessmentpediatric2DTO objDto = (assessmentpediatric2DTO) ConfigUIJSONUtility
					.getObjectFromJSON(assessmentpediatric2, assessmentpediatric2DTO.class);

			 result = NSService.saveAssessmentPediatric2(objDto.getListpediatric2().get(0), request);
				if(result==1){
					response = "Data Inserted..";
				}else if(result==2){
					
					response = "Data Updated...";
				}else{
					response = "oops there is some problem..";
				}
			return response;
			
		}
		
		@RequestMapping(value = "/fetchInitalNursing2", method = RequestMethod.POST)
		 @ResponseBody
		 public	assessmentpediatric2DTO fetchInitalNursingAssessment2(@RequestParam("pId") String pId,
				 @RequestParam("tId") String tId) {
			
			int patientId=Integer.parseInt(pId);
			int treatmentId=Integer.parseInt(tId);
			
			List<assessmentpediatric2DTO> listInitial2 = new ArrayList<assessmentpediatric2DTO>();
			listInitial2 = NSService.fetchInitalNursingAssessment2(patientId,treatmentId);
		
			assessmentpediatric2DTO obj = new assessmentpediatric2DTO();
			obj.setListpediatric2(listInitial2);
			return obj;
			
		}

		@RequestMapping(value = "/saveAssessmentPediatric3", method = RequestMethod.POST)
		@ResponseBody
		public String saveAssessmentPediatric3(@RequestParam("assessmentpediatric3") String assessmentpediatric3,HttpServletRequest request) {
			String response="";
			int result = 0;
			assessmentpediatric3DTO objDto = (assessmentpediatric3DTO) ConfigUIJSONUtility
					.getObjectFromJSON(assessmentpediatric3, assessmentpediatric3DTO.class);

			 result = NSService.saveAssessmentPediatric3(objDto.getListpediatric3().get(0), request);
				if(result==1){
					response = "Data Inserted...";
				}else if(result==2){
					
					response = "Data Updated..";
				}else{
					response = "oops there is some problem..";
				}
			return response;
			
		}
		
		@RequestMapping(value = "/fetchInitalNursing3", method = RequestMethod.POST)
		 @ResponseBody
		 public	assessmentpediatric3DTO fetchInitalNursing3Page(@RequestParam("pId") String pId,
				 @RequestParam("tId") String tId) {
			
			int patientId=Integer.parseInt(pId);
			int treatmentId=Integer.parseInt(tId);
			
			return NSService.fetchInitalNursing3Page(patientId,treatmentId);
			
		}
		
		@RequestMapping(value = "/deleteVerbalRow", method = RequestMethod.POST)
		@ResponseBody
		public String deleteVerbalData(@RequestParam("idVerbal") String idVerbal,HttpServletRequest request) {
			
			String response="";
			int result = 0;
			
			 result = NSService.deleteVerbalData(idVerbal, request);
				if(result==1){
					response = "Row Deleted..";
				}else{
					
					response = "oops there is some problem..";
				}
			return response;
			
		}
		

		@RequestMapping(value = "/deleteInterventionRow", method = RequestMethod.POST)
		@ResponseBody
		public String deleteInterventionData(@RequestParam("idIntervention") String idIntervention,HttpServletRequest request) {
			
			String response="";
			int result = 0;
			
			 result = NSService.deleteInterventionData(idIntervention, request);
				if(result==1){
					response = "Row Deleted..";
				}else{
					
					response = "oops there is some problem..";
				}
			return response;
			
		}
		
		
		@RequestMapping(value = "/savePrePost", method = RequestMethod.POST)
		@ResponseBody
		public String savePrePostData(@RequestParam("PrePostDetails") String PrePostDetails,HttpServletRequest request) {
			
			String response="";
			int result = 0;
			PrePostDetailsDTO objDto = (PrePostDetailsDTO) ConfigUIJSONUtility
					.getObjectFromJSON(PrePostDetails, PrePostDetailsDTO.class);

			 result = NSService.savePrePostData(objDto.getNursinAssesmentList().get(0), request);
				if(result==1){
					response = "Data Inserted..";
				}else if(result==2){
					
					response = "Data Updated...";
				}else{
					response = "oops there is some problem..";
				}
			return response;
			
		}
		
		@RequestMapping(value = "/fetchprepost", method = RequestMethod.POST)
		 @ResponseBody
		 public	PrePostDetailsDTO fetchprepostData(@RequestParam("pId") String pId,
				 @RequestParam("tId") String tId) {
			
			int patientId=Integer.parseInt(pId);
			int treatmentId=Integer.parseInt(tId);
			
			List<PrePostDetailsDTO> listInitial2 = new ArrayList<PrePostDetailsDTO>();
			listInitial2 = NSService.fetchprepostData(patientId,treatmentId);
		
			PrePostDetailsDTO obj = new PrePostDetailsDTO();
			obj.setNursinAssesmentList(listInitial2);
			return obj;
			
		}
		
		@RequestMapping(value = "/saveNursingAssessment01", method = RequestMethod.POST)
		@ResponseBody
		public String saveNursingAssessmentData01(@RequestParam("Nursingobj01") String Nursingobj01,HttpServletRequest request) {
			String response="";
			int result = 0;
			nursingAsmentDataDTO objDto = (nursingAsmentDataDTO) ConfigUIJSONUtility
					.getObjectFromJSON(Nursingobj01, nursingAsmentDataDTO.class);
			
			 result = NSService.saveNursingAssessmentData01(objDto.getNursinglist().get(0), request);
				if(result==1){
					response = "Data Inserted..";
				}else if(result==2){
					
					response = "Data Updated...";
				}else{
					response = "oops there is some problem..";
				}
			return response;
			
		}
		
		@RequestMapping(value = "/NursingA", method = RequestMethod.POST)
		 @ResponseBody
		 public	nursingAsmentDataDTO fetchNursingAs(@RequestParam("pId") String pId,
				 @RequestParam("tId") String tId) {
			
			int patientId=Integer.parseInt(pId);
			int treatmentId=Integer.parseInt(tId);
			
			List<nursingAsmentDataDTO> listInitial2 = new ArrayList<nursingAsmentDataDTO>();
			listInitial2 = NSService.fetchNursingAs(patientId,treatmentId);
		
			nursingAsmentDataDTO obj = new nursingAsmentDataDTO();
			obj.setNursinglist(listInitial2);
			return obj;
			
		}
		@RequestMapping(value = "/saveNursingAssessment02", method = RequestMethod.POST)
		@ResponseBody
		public String saveNursingAssessmentData02(@RequestParam("Nursingobj02") String Nursingobj02,HttpServletRequest request) {
			String response="";
			int result = 0;
			nursingtwoDTo objDto = (nursingtwoDTo) ConfigUIJSONUtility
					.getObjectFromJSON(Nursingobj02, nursingtwoDTo.class);
			
			 result = NSService.saveNursingAssessmentData02(objDto.getNursingtwolist().get(0), request);
				if(result==1){
					response = "Data Inserted..";
				}else if(result==2){
					
					response = "Data Updated...";
				}else{
					response = "oops there is some problem..";
				}
			return response;
			
		}
			
		@RequestMapping(value = "/NursingA2fetch", method = RequestMethod.POST)
		 @ResponseBody
		 public	nursingtwoDTo NursingA2fetchData(@RequestParam("pId") String pId,
				 @RequestParam("tId") String tId) {
			
			int patientId=Integer.parseInt(pId);
			int treatmentId=Integer.parseInt(tId);
			
			List<nursingtwoDTo> listInitial2 = new ArrayList<nursingtwoDTo>();
			listInitial2 = NSService.NursingA2fetchData(patientId,treatmentId);
		
			nursingtwoDTo obj = new nursingtwoDTo();
			obj.setNursingtwolist(listInitial2);
			return obj;
			
		}
		
		
		/**@author     :Sufiyan
		 * @Date       :4-March-2018
		 * @code       :for saving Invasion Site Care Information  ***/
		@RequestMapping(value = "/deleteHandHygieneRecord", method = RequestMethod.POST)
		@ResponseBody
		public String deleteHandHygieneRecord(
				@RequestParam("id") String idstr,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			int id=Integer.parseInt(idstr);
			
			result =NSService.deleteHandHygieneRecord(id,request);
			
			if(result==1){
				response="Record Removed successfully..!";
			}else{
				response="Record not Found..!";
			}
			return response;
			
		}		
		
		
		/**@author     :Sufiyan
		 * @Date       :4-March-2018
		 * @code       :for saving Invasion Site Care Information  ***/
		@RequestMapping(value = "/deleteNursingCarePlanRecord", method = RequestMethod.POST)
		@ResponseBody
		public String deleteNursingCarePlanRecord(
				@RequestParam("id") String idstr,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			int id=Integer.parseInt(idstr);
			
			result =NSService.deleteNursingCarePlanRecord(id,request);
			
			if(result==1){
				response="Record Removed successfully..!";
			}else{
				response="Record not Found..!";
			}
			return response;
			
		}		
		
		/**@author     :Sufiyan
		 * @Date       :4-March-2018
		 * @code       :for saving Invasion Site Care Information  ***/
		@RequestMapping(value = "/deleteSASRecord", method = RequestMethod.POST)
		@ResponseBody
		public String deleteSASRecord(
				@RequestParam("id") String idstr,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			int id=Integer.parseInt(idstr);
			
			result =NSService.deleteSASRecord(id,request);
			
			if(result==1){
				response="Record Removed successfully..!";
			}else{
				response="Record not Found..!";
			}
			return response;
			
		}
		
		/**@author     :Sufiyan
		 * @Date       :4-March-2018
		 * @code       :for saving Invasion Site Care Information  ***/
		@RequestMapping(value = "/deleteNCPPage4Record", method = RequestMethod.POST)
		@ResponseBody
		public String deleteNCPPage4Record(
				@RequestParam("id") String idstr,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			int id=Integer.parseInt(idstr);
			
			result =NSService.deleteNCPPage4Record(id,request);
			
			if(result==1){
				response="Record Removed successfully..!";
			}else{
				response="Record not Found..!";
			}
			return response;
			
		}
		
		@RequestMapping(value = "/savePlanTreat", method = RequestMethod.POST)
		@ResponseBody
		public String savePlanTreatDetail(@RequestParam("planoftreatdetails") String planoftreatdetails,HttpServletRequest request) {
			String response="";
			int result = 0;
			PlanTreatDTO objDto = (PlanTreatDTO) ConfigUIJSONUtility
					.getObjectFromJSON(planoftreatdetails, PlanTreatDTO.class);
			
			 result = NSService.savePlanTreatDetail(objDto.getPlanlist().get(0), request);
				if(result==1){
					response = "Data Inserted..";
				}else if(result==2){
					
					response = "Data Updated...";
				}else{
					response = "oops there is some problem..";
				}
			return response;
			
		}
		
		@RequestMapping(value = "/fetchPlanTreat", method = RequestMethod.POST)
		 @ResponseBody
		 public	PlanTreatDTO fetchPlanTreatData(@RequestParam("pid") String pid,
				 @RequestParam("tid") String tid) {
			
			int patientId=Integer.parseInt(pid);
			int treatmentId=Integer.parseInt(tid);
			
			List<PlanTreatDTO> listInitial2 = new ArrayList<PlanTreatDTO>();
			listInitial2 = NSService.fetchPlanTreatData(patientId,treatmentId);
		
			PlanTreatDTO obj = new PlanTreatDTO();
			obj.setPlanlist(listInitial2);
			return obj;
			
		}
		
		
		@RequestMapping(value = "/deleteOtRow", method = RequestMethod.POST)
		@ResponseBody
		public String deleteOtRowData(@RequestParam("idOutput") String idOutput,HttpServletRequest request) {
			
			String response="";
			int result = 0;
			
			 result = NSService.deleteOtRowData(idOutput, request);
				if(result==1){
					response = "Row Deleted..";
				}else{
					
					response = "oops there is some problem..";
				}
			return response;
			
		}	

/**@author     :Sufiyan
		 * @Date       :4-March-2018
		 * @code       :for deleting a record of nursing Re assessment  ***/
		@RequestMapping(value = "/deleteNRARecord", method = RequestMethod.POST)
		@ResponseBody
		public String deleteNRARecord(@RequestParam("id") String idstr,
				HttpServletRequest request) {
			int result=0;
			String response="";
			
			int id=Integer.parseInt(idstr);
			
			result =NSService.deleteNRARecord(id,request);
			
			if(result==1){
				response="Record Removed successfully..!";
			}else{
				response="Record not Found..!";
			}
			return response;
			
		}	
		
		@RequestMapping(value = "/fetchReAssessment", method = RequestMethod.POST)
		 @ResponseBody
		 public	NursingReAssessment1DayDTO fetchReAssessment(@RequestParam("id") String idee) {
			
			int id=Integer.parseInt(idee);
			
			List<NursingReAssessment1DayDTO> reAssessmentlist = new ArrayList<NursingReAssessment1DayDTO>();
			reAssessmentlist = NSService.fetchReAssessment(id);
		
			NursingReAssessment1DayDTO obj = new NursingReAssessment1DayDTO();
			obj.setReAssessmentList(reAssessmentlist);
			return obj;
			
		}
		
}