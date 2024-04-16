package com.hms.ipd.controller;

import java.lang.invoke.MethodHandles;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.hms.dao.IPDNusringMedicationDashboardDAO;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;
import com.hms.dto.BillComponent;
import com.hms.dto.CustomizeTemplate;
import com.hms.dto.DischargeProcess;
import com.hms.dto.IPDDischargePlanDTO;
import com.hms.dto.IpdConsentForm;
import com.hms.dto.LabPkg;
import com.hms.dto.Patient;
import com.hms.dto.TreatmentNurses;
import com.hms.ehat.dto.CpoeOTdetails;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ipd.dto.DoctorListDTO;
import com.hms.ipd.dto.DoctorRoundDTO;
import com.hms.ipd.dto.DoctorRoundTempDTO;
import com.hms.ipd.dto.IndividualTreatmentInstructionIPD;
import com.hms.ipd.dto.PCTreatmentInstructionDTO;
import com.hms.ipd.dto.TreatmentTopicDTO;
import com.hms.ipd.service.IPDHistoryService;
import com.hms.model.PatientModel;
import com.hms.model.TreatmentModel;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value = "/ipdhistory")
public class IPDHistoryController {
	private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	
	
	private @Autowired IPDHistoryService ipdHistoryService;
	
	@ResponseBody
	@RequestMapping(value="/getPatientInfoByTreatmentIdIPD")
	public OpdPatientDetailsDto  getPatientInfoByTreatmentId(@RequestParam ("treatmentId")Integer treatmentId,@RequestParam ("dpid")Integer dpid)
	{
		logger.info("inside getPatientInfoByTreatmentId");
		OpdPatientDetailsDto obj=ipdHistoryService.getPatientInfoByTreatmentId(treatmentId);
		logger.debug("response getPatientInfoByTreatmentId...."+obj);
		return obj;
	}
	
	 @RequestMapping(value = "/fetchBillDetailsIPD", method = RequestMethod.POST)
	 @ResponseBody
	 public	CpoeServdetails fetchBillDetailsIPD(@RequestParam("tID") Integer tID,@RequestParam("callform") String callform,@RequestParam("servid") Integer servid) {
		logger.info("In OpdServicesAdvisedController fetchBillDetailsIPD");
		List<CpoeServdetails> lstbilldetails = new ArrayList<>();
		lstbilldetails = ipdHistoryService.fetchBillDetailsIPD(tID,callform,servid);
	
		CpoeServdetails obj = new CpoeServdetails();
		obj.setCpoeServdetails(lstbilldetails);
		logger.info("Reponse----> "+lstbilldetails);
		return obj;
	}
	
	 
	 
	 @RequestMapping(value = "/saveDoctorRound", method = RequestMethod.POST)
	 @ResponseBody
	 public String	 saveDoctorRound(@RequestParam("action") String action,@RequestParam("tid") Integer tid,@RequestParam("drs") String drs,@RequestParam("drrobj") String drrobj,
			 @RequestParam("date") String date, @RequestParam("treatmentbedid") Integer treatmentbedid) {
		logger.info("In OpdServicesAdvisedController fetchBillDetailsIPD");
		Integer val = ipdHistoryService.saveDoctorRound(tid,drs,drrobj,date, treatmentbedid);
		logger.info("DoctorRoundReport Response val:"+val);
		if (val>0) {
			return "Doctor Round is Saved successfully...";
		} else {
			return "Server Problem";
		}
		
	}
		 
	@ResponseBody
	@RequestMapping(value = "/saveDoctorRounds", method = RequestMethod.POST)
	public DoctorRoundDTO saveDoctorRounds(@RequestBody DoctorRoundDTO doctorRoundDTO) {
		return ipdHistoryService.saveDoctorRounds(doctorRoundDTO);
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchDoctorRounds", method = RequestMethod.GET)
	public List<DoctorRoundDTO> fetchDoctorRounds(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("unitId") Integer unitId) {
		return ipdHistoryService.fetchDoctorRounds(treatmentId,unitId);
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchDoctorList", method = RequestMethod.GET)
	public List<DoctorListDTO> fetchDoctorList(@RequestParam("unitId") Integer unitId) {
		return ipdHistoryService.fetchDoctorList(unitId);
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchDoctorRoundTemplate", method = RequestMethod.GET)
	public List<DoctorRoundTempDTO> fetchDoctorRoundTemplate(@RequestParam("unitId") Integer unitId) {
		return ipdHistoryService.fetchDoctorRoundTemplate(unitId);
	}
	
	@ResponseBody
	@RequestMapping(value = "/SearchDoctorRoundTemplate", method = RequestMethod.POST)
	public List<DoctorRoundTempDTO> SearchDoctorRoundTemplate(@RequestParam("tempName") String tempName) {
		return ipdHistoryService.SearchDoctorRoundTemplate(tempName);
	}
	
	@ResponseBody
	@RequestMapping(value = "/deleteDoctorRoundIPD", method = RequestMethod.GET)
	public String deleteDoctorRoundIPD(@RequestParam("unitId") Integer unitId,@RequestParam("doctorSlaveIds") String doctorSlaveIds) {
		return ipdHistoryService.deleteDoctorRoundIPD(unitId,doctorSlaveIds);
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchPCTreatmentInstruction", method = RequestMethod.GET)
	public List<PCTreatmentInstructionDTO> fetchPCTreatmentInstruction(@RequestParam("treatmentId") Integer treatmentId) {
		return ipdHistoryService.fetchPCTreatmentInstruction(treatmentId);
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchAllTreatmentTopicIPD", method = RequestMethod.GET)
	public List<TreatmentTopicDTO> fetchAllTreatmentTopic(@RequestParam("action") String action, @RequestParam("pageName") String pageName,@RequestParam("unitId") Integer unitId) {
		return ipdHistoryService.fetchAllTreatmentTopic(action,pageName,unitId);
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchIndividualTreatmentInstructionIPD", method = RequestMethod.GET)
	public List<IndividualTreatmentInstructionIPD> fetchIndividualTreatmentInstructionIPD(@RequestParam("treatmentId") Integer treatmentId) {
		return ipdHistoryService.fetchIndividualTreatmentInstructionIPD(treatmentId);
	}
	
	@ResponseBody
	@RequestMapping(value = "/displayTopPat", method = RequestMethod.GET)
	public String displayTopPat(@RequestParam("patId") String patId,@RequestParam("page_name") String page_name,@RequestParam("userId") String userId,@RequestParam("type") String type,@RequestParam("value") String value,@RequestParam("searchBy") String searchBy) {
		List<Patient> list = ipdHistoryService.displayTopPat(patId,page_name,userId,type,value,searchBy);
		Patient patient = new Patient();
		patient.setPatientList(list);
		Gson gson = new Gson();
		String json = gson.toJson(patient);
		System.out.println("Json to string=================================>"+json);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/patientMaterialUsed", method = RequestMethod.GET)
	public BillComponent patientMaterialUsed(@RequestParam("tid") String tid,@RequestParam("date") String date) {
		List<BillComponent> bclist  = ipdHistoryService.patientMaterialUsed(tid,date);
		BillComponent billComponent=new BillComponent();
		billComponent.setBcList(bclist);
		return billComponent;
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchIpdServices", method = RequestMethod.GET)
	public CpoeOTdetails fetchIpdServices(@RequestParam("trid") String tid,@RequestParam("serviceid") String serviceid) {
		List<CpoeOTdetails> arrTreatmentipdservices = new ArrayList<CpoeOTdetails>();
		arrTreatmentipdservices = ipdHistoryService.fetchIpdServices(tid,serviceid);
		CpoeOTdetails objTreatmentipdservices = new CpoeOTdetails();
		objTreatmentipdservices.setCpoedetails(arrTreatmentipdservices);
		return objTreatmentipdservices;
	}

	@ResponseBody
	@RequestMapping(value = "/fillDIC", method = RequestMethod.GET)
	public TreatmentNurses fillDIC(@RequestParam("tid") String tid,@RequestParam("date") String date) {
		List<TreatmentNurses> list  = ipdHistoryService.fillDIC(tid,date);
		TreatmentNurses treatmentNurses = new TreatmentNurses();
		treatmentNurses.setTreNurseList(list);
		return treatmentNurses;
	}
	
	@ResponseBody
	@RequestMapping(value = "/fillDrugChart", method = RequestMethod.GET)
	public TreatmentNurses fillDrugChart(@RequestParam("tid") String tid,@RequestParam("date") String date) {
		 List<TreatmentNurses> list  = ipdHistoryService.fillDrugChart(tid,date);
		 TreatmentNurses treatmentNurses = new TreatmentNurses();
		 treatmentNurses.setTreDrugList(list);
		 return treatmentNurses;
		 
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchLabResultData", method = RequestMethod.POST)
	public String fillDrugChart(@RequestParam("treatmentId") String treatmentId) {
		 String labData   = ipdHistoryService.fetchLabResultData(treatmentId);
		 return labData;
		 
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchNursingMedication", method = RequestMethod.POST)
	public  OPDPrescriptionDtoSP fetchNursingMedication(@RequestParam("todayDate") String todayDate,@RequestParam("callfrom") String callfrom,@RequestParam("treatmentId") String treatmentId) {
		OPDPrescriptionDtoSP ipdNursing = new OPDPrescriptionDtoSP();
			List<OPDPrescriptionDtoSP> list = new ArrayList<OPDPrescriptionDtoSP>();
			list = ipdHistoryService.fetchNursingMedication(todayDate,callfrom,treatmentId);
			//ipdNursing.setIpdNursingMedicationList(list);
			return ipdNursing;
	}
	
	@ResponseBody
	@RequestMapping(value = "/getPackages", method = RequestMethod.POST)
	public  LabPkg getPackages(@RequestParam("byName") String byName,@RequestParam("type") String type) {
		List<LabPkg> arrLabPkg = new ArrayList<LabPkg>();
		arrLabPkg = ipdHistoryService.getPackages(byName, type);
		LabPkg objLabPkg = new LabPkg();
		objLabPkg.setLabPkgli(arrLabPkg);

		return objLabPkg;
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/fetchDischargeCode", method = RequestMethod.POST)
	public  IPDDischargePlanDTO fetchDischargeCode() {
		List<IPDDischargePlanDTO> ipdDischargePlanDTOList = new ArrayList<IPDDischargePlanDTO>();
		ipdDischargePlanDTOList = ipdHistoryService.fetchDischargeCode();
		IPDDischargePlanDTO objIPDDischargePlanDTO= new IPDDischargePlanDTO();
		objIPDDischargePlanDTO.setIPDDischargePlanDTOList(ipdDischargePlanDTOList);
		return objIPDDischargePlanDTO;
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchIPDDischargePlan", method = RequestMethod.POST)
	public  IPDDischargePlanDTO fetchIPDDischargePlan(@RequestParam("treatmentId") String treatmentId) {
		List<IPDDischargePlanDTO> IPDDischargePlanDTOList = ipdHistoryService.fetchIPDDischargePlan(treatmentId);
		IPDDischargePlanDTO ipdDischargePlanDTO = new IPDDischargePlanDTO();
		ipdDischargePlanDTO.setIPDDischargePlanDTOList(IPDDischargePlanDTOList);
		return ipdDischargePlanDTO;
	}
	
	@ResponseBody
	@RequestMapping(value = "/saveIPDDischargePlan", method = RequestMethod.POST)
	public  String saveIPDDischargePlan(@RequestParam("tid") String tid,
			@RequestParam("queryType") String queryType,
			@RequestParam("dateAdmission") String dateAdmission,
			@RequestParam("dateExpectedDischarge") String dateExpectedDischarge,
			@RequestParam("dateSet") String dateSet,
			@RequestParam("isInformed") String isInformed,
			@RequestParam("transportArranged") String transportArranged,
			@RequestParam("isTransportOwn") String isTransportOwn,
			@RequestParam("isTransportOwnBooked") String isTransportOwnBooked,
			@RequestParam("transOwnArrvTime") String transOwnArrvTime,
			@RequestParam("isOwnMedic") String isOwnMedic,
			@RequestParam("isNewMedic") String isNewMedic,
			@RequestParam("isTransferLetter") String isTransferLetter,
			@RequestParam("isSocialService") String isSocialService,
			@RequestParam("socialServiceRefDate") String socialServiceRefDate,
			@RequestParam("socialServiceAssesDate") String socialServiceAssesDate,
			@RequestParam("isOT") String isOT,
			@RequestParam("OTRefDate") String OTRefDate,
			@RequestParam("OTAssesDate") String OTAssesDate,
			@RequestParam("isPhysio") String isPhysio,
			@RequestParam("physioRefDate") String physioRefDate,
			@RequestParam("physioAssesDate") String physioAssesDate,
			@RequestParam("isOther") String isOther,
			@RequestParam("otherRefDate") String otherRefDate,
			@RequestParam("otherAssesDate") String otherAssesDate,
			@RequestParam("dateActualDischarge") String dateActualDischarge,
			@RequestParam("dischargeCode") String dischargeCode,
			@RequestParam("isTDL") String isTDL,
			@RequestParam("TDLTime") String TDLTime,
			@RequestParam("diagCapacity") String diagCapacity,
			@RequestParam("waitTestRes") String waitTestRes,
			@RequestParam("waitMedRevDisc") String waitMedRevDisc,
			@RequestParam("MedConsulDelay") String MedConsulDelay,
			@RequestParam("AlliedHelDelay") String AlliedHelDelay,
			@RequestParam("RefCommProvLate") String RefCommProvLate,
			@RequestParam("PatWaitConsEquip") String PatWaitConsEquip,
			@RequestParam("Medication") String Medication,
			@RequestParam("Transport") String Transport,
			@RequestParam("OtherHeltFacl") String OtherHeltFacl,
			@RequestParam("Pallative") String Pallative,
			@RequestParam("Rehabilitation") String Rehabilitation,
			@RequestParam("CareNurseHome") String CareNurseHome			
			
			) {
		IPDDischargePlanDTO ipdDischargePlanDTO = new IPDDischargePlanDTO();
		ipdDischargePlanDTO.setTid(Integer.parseInt(tid));
		ipdDischargePlanDTO.setDateAdmission(dateAdmission);
		ipdDischargePlanDTO.setDateExpectedDischarge(dateExpectedDischarge);
		ipdDischargePlanDTO.setDateSet(dateSet);
		ipdDischargePlanDTO.setIsInformed(isInformed);
		ipdDischargePlanDTO.setTransportArranged(transportArranged);
		//ipdDischargePlanDTO.setIsInformedByPatient(isInformedByPatient);
		//ipdDischargePlanDTO.setIsInformedByStaff(isInformedByStaff);
		ipdDischargePlanDTO.setIsTransportOwn(isTransportOwn);
		ipdDischargePlanDTO.setIsTransportOwnBooked(isTransportOwnBooked);
		ipdDischargePlanDTO.setTransOwnArrvTime(transOwnArrvTime);
		//ipdDischargePlanDTO.setIsTransportAmb(isTransportAmb);
		//ipdDischargePlanDTO.setIsTransportAmbBooked(isTransportAmbBooked);
		//ipdDischargePlanDTO.setTransAmbArrvTime(transAmbArrvTime);
		ipdDischargePlanDTO.setIsOwnMedic(isOwnMedic);
		ipdDischargePlanDTO.setIsNewMedic(isNewMedic);
		ipdDischargePlanDTO.setIsTransferLetter(isTransferLetter);
		ipdDischargePlanDTO.setIsSocialService(isSocialService);
		ipdDischargePlanDTO.setSocialServiceRefDate(socialServiceRefDate);
		ipdDischargePlanDTO.setSocialServiceAssesDate(socialServiceAssesDate);
		ipdDischargePlanDTO.setIsOT(isOT);
		ipdDischargePlanDTO.setOTRefDate(OTRefDate);
		ipdDischargePlanDTO.setOTAssesDate(OTAssesDate);
		ipdDischargePlanDTO.setIsPhysio(isPhysio);
		ipdDischargePlanDTO.setPhysioRefDate(physioRefDate);
		ipdDischargePlanDTO.setPhysioAssesDate(physioAssesDate);
		ipdDischargePlanDTO.setIsOther(isOther);
		ipdDischargePlanDTO.setOtherRefDate(otherRefDate);
		ipdDischargePlanDTO.setOtherAssesDate(otherAssesDate);
		ipdDischargePlanDTO.setDateActualDischarge(dateActualDischarge);
		ipdDischargePlanDTO.setDischargeCodeID(dischargeCode);
		ipdDischargePlanDTO.setIsTDL(isTDL);
		ipdDischargePlanDTO.setTDLTime(TDLTime);
		ipdDischargePlanDTO.setDiagCapacity(diagCapacity);
		ipdDischargePlanDTO.setWaitTestRes(waitTestRes);
		ipdDischargePlanDTO.setWaitMedRevDisc(waitMedRevDisc);
		ipdDischargePlanDTO.setMedConsulDelay(MedConsulDelay);
		ipdDischargePlanDTO.setAlliedHelDelay(AlliedHelDelay);
		ipdDischargePlanDTO.setRefCommProvLate(RefCommProvLate);
		ipdDischargePlanDTO.setPatWaitConsEquip(PatWaitConsEquip);
		ipdDischargePlanDTO.setMedication(Medication);
		ipdDischargePlanDTO.setTransport(Transport);
		ipdDischargePlanDTO.setOtherHeltFacl(OtherHeltFacl);
		ipdDischargePlanDTO.setPallative(Pallative);
		ipdDischargePlanDTO.setRehabilitation(Rehabilitation);
		ipdDischargePlanDTO.setCareNurseHome(CareNurseHome);

		String isInserted = ipdHistoryService.saveIPDDischargePlan(ipdDischargePlanDTO,queryType);
		return isInserted;
	}
	
	@ResponseBody
	@RequestMapping(value="/fetchDischargeProcess", method = RequestMethod.POST)
	public 	DischargeProcess fetchDischargeProcess(@RequestParam("treatmentId") String treatmentId) {
		List<DischargeProcess> arrDischarge = new ArrayList<DischargeProcess>();
		arrDischarge = ipdHistoryService.fetchDischargeProcess(treatmentId);
		DischargeProcess objDischargeprocess= new DischargeProcess();
		objDischargeprocess.setDischargesinglist(arrDischarge);
		return objDischargeprocess;

	}
	
	@ResponseBody
	@RequestMapping(value="/saveDischargeProcess", method = RequestMethod.POST)
	public 	String saveDischargeProcess(@RequestParam("queryType") String queryType,@RequestParam("allVals") String[] allVals,@RequestParam("listdischargeProcessObj1") String listdischargeProcessObj1,@RequestParam("tid") String tretID) {

		DischargeProcess objDischargeProcess = new DischargeProcess();
		/*
		 * String str = listdischargeProcessObj1[0].substring(0,
		 * listdischargeProcessObj1[0].length()); if
		 * (!listdischargeProcessObj1.equals("null")) { for (int i = 0; i <
		 * listdischargeProcessObj1.length; i++) { objDischargeProcess =
		 * (DischargeProcess) ConfigUIJSONUtility .getObjectFromJSON(str,
		 * DischargeProcess.class); } } else { listdischargeProcessObj1 = null; }
		 */
		
		
		objDischargeProcess = (DischargeProcess) ConfigUIJSONUtility
		.getObjectFromJSON(listdischargeProcessObj1, DischargeProcess.class);
	
		int inttretID = 0;
		if (tretID != null && !tretID.equals("")) {
			inttretID = Integer.parseInt(tretID);
		}
		DischargeProcess objDischargeProcess1 = new DischargeProcess();
		objDischargeProcess1.setTretID(inttretID);
		int userId =1;
		int isInserted = ipdHistoryService.saveDischargeProcess(objDischargeProcess1,objDischargeProcess,queryType,inttretID,allVals,userId);
		

		if (isInserted == 1) {
			return "Discharge Process History is Saved";
		}else {
			return "Discharge Process History is Updated";
		}

	}
	
	@ResponseBody
	@RequestMapping(value="/fetchIPDDischargeSummaryTemplate", method = RequestMethod.POST)
	public 	String fetchIPDDischargeSummaryTemplate(@RequestParam("treatmentId") String treatmentId,@RequestParam("pid") String pid) {
		CustomizeTemplate objTemplate=new CustomizeTemplate();
		objTemplate.setTreatmentId(treatmentId);
		objTemplate.setPatientId(pid);
		List<CustomizeTemplate> CustomizeTemplateList = new ArrayList<CustomizeTemplate>();
		CustomizeTemplateList = ipdHistoryService.fetchIPDDischargeSummaryTemplate(objTemplate);
		//Convert result into JSON object 
		CustomizeTemplate objTemplateMaster = new CustomizeTemplate();
		objTemplateMaster.setCustomizeTemplateList(CustomizeTemplateList);
		
		return ConfigUIJSONUtility.getJSONFromObject(objTemplateMaster);
	}

	@ResponseBody
	@RequestMapping(value="/saveIPDDischargeSummaryTemplate", method = RequestMethod.POST)
	public 	String saveIPDDischargeSummaryTemplate(@RequestParam("queryType") String queryType,@RequestParam("selTempWiseSummary") String selTempWiseSummary,
			@RequestParam("selTempType") String selTempType,@RequestParam("templateName") String templateName,
			@RequestParam("templateData") String templateData,@RequestParam("idIPDdischargeSummary") String idIPDdischargeSummary,
			@RequestParam("date") String date,@RequestParam("treatmentId") String treatmentId,
			@RequestParam("pid") String pid,@RequestParam("dischargeDate") String dischargeDate,
			@RequestParam("discharge_Type") String discharge_Type		
			) {
		
		int id = Integer.parseInt(idIPDdischargeSummary);
		CustomizeTemplate objTemplate=new CustomizeTemplate();
		objTemplate.setSpecializaion(selTempWiseSummary); //admin template id is set to specialization
		objTemplate.setType(selTempType);
		objTemplate.setTemp_name(templateName);
		objTemplate.setTemp_data(templateData);
		objTemplate.setIdCustomizeTemplate(id);
		objTemplate.setDate(date);
		objTemplate.setTreatmentId(treatmentId);
		objTemplate.setPatientId(pid);
		objTemplate.setDischarge_date(dischargeDate);
		objTemplate.setDischarge_type(discharge_Type);
		Integer isInserted = ipdHistoryService.saveUpdateIPDDischargeSummaryTemplate(objTemplate,queryType);
		if(isInserted == 1){
			return "IPD Discharge Summary Saved Successfully...";
		}else if(isInserted == 3) {
			return "IPD Discharge Summary is already saved...Please View Report";
		}
		else {
			return "IPD Discharge Summary Updated Successfully...";
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value = "/saveConsentForm", method = RequestMethod.POST)
	public String saveConsentForm(@RequestParam("queryType") String queryType,@RequestParam("idipdConsentForm") String idipdConsentForm
			,@RequestParam("tid") String tid,@RequestParam("idCustomizeTemplate") String idCustomizeTemplate
			,@RequestParam("templateData") String templateData
			) {
		
		int inttretID = 0;
		if (tid != null && !tid.equals("")) {
			inttretID = Integer.parseInt(tid);
		}

		int intidCustomizeTemplate = 0;
		if (idCustomizeTemplate != null && !idCustomizeTemplate.equals("")) {
			intidCustomizeTemplate = Integer.parseInt(idCustomizeTemplate);
		}

		int intidipdConsentForm = 0;
		if (idipdConsentForm != null && !idipdConsentForm.equals("")) {
			intidipdConsentForm = Integer.parseInt(idipdConsentForm);
		}

		IpdConsentForm objIpdConsentForm = new IpdConsentForm();

		objIpdConsentForm.setTreatment_ID(inttretID);
		objIpdConsentForm.setTemplateData(templateData);
		objIpdConsentForm.setIdCustomizeTemplate(intidCustomizeTemplate);
		objIpdConsentForm.setIdipdConsentForm(intidipdConsentForm);
		Integer isInserted = ipdHistoryService.saveConsentForm(objIpdConsentForm,queryType);
		if (isInserted == 1) {
			if (queryType.equals("insert")) {
				return "Form is Saved";
			} else {
				return "Form is Updated";
			}
		}else {
			return "Oops some problem occured while saving Consent Form...";
		}
	}
	
	//
	@ResponseBody
	@RequestMapping(value="/featchAllConsentFormForTreatment", method = RequestMethod.POST)
	public 	String featchAllConsentFormForTreatment(@RequestParam("tid") String tid) {
		
		List<IpdConsentForm> icfList = new ArrayList<IpdConsentForm>();

		icfList = ipdHistoryService.fetchAllConsentFormForTreatment(tid);

		IpdConsentForm objICF = new IpdConsentForm();
		objICF.setIpdConsentFormList(icfList);
		return ConfigUIJSONUtility.getJSONFromObject(objICF);
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchDoctorRoundsByDate", method = RequestMethod.GET)
	public List<DoctorRoundDTO> fetchDoctorRoundsByDate(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("unitId") Integer unitId,@RequestParam("fromDate") String fromDate,@RequestParam("toDate") String toDate) {
		return ipdHistoryService.fetchDoctorRoundsByDate(treatmentId, unitId, fromDate, toDate);
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchDoctorRoundsByDateOnchange", method = RequestMethod.GET)
	public List<DoctorRoundDTO> fetchDoctorRoundsByDateOnchange(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("unitId") Integer unitId,@RequestParam("fromDate") String fromDate) {
		return ipdHistoryService.fetchDoctorRoundsByDateOnchange(treatmentId, unitId, fromDate);
	}
	
	@ResponseBody
	@RequestMapping(value = "/featchPreviousICFpat", method = RequestMethod.GET)
	public List<Patient> featchPreviousICFpat(@RequestParam("type") String type,@RequestParam("searchBy") String searchBy,@RequestParam("value") String value,@RequestParam("unitId") Integer unitId) {
		return ipdHistoryService.featchPreviousICFpat(type, unitId, searchBy,value);
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchDoctorRoundsByDateOnchangeForPrint", method = RequestMethod.GET)
	public DoctorRoundDTO fetchDoctorRoundsByDateOnchangeForPrint(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("unitId") Integer unitId,@RequestParam("fromDate") String fromDate,@RequestParam("toDate") String toDate) {
		return ipdHistoryService.fetchDoctorRoundsByDateOnchangeForPrint(treatmentId, unitId, fromDate,toDate);
	}
	
	//added by vishant 13June2023
	@ResponseBody
	@RequestMapping(value = "/saveAdministratedDoneReverse", method = RequestMethod.POST)
	public int saveAdministratedDoneReverse(@RequestParam("action") String action,@RequestParam("nursingMediIds") String nursingMediIds,
			@RequestParam("callfrom") String callfrom,@RequestParam("treatmentId") String treatmentId,
			HttpServletRequest request) {
		
		return ipdHistoryService.saveAdministratedDoneReverse(action, nursingMediIds, callfrom,treatmentId,request);
	}
	
	//added by vishant 13June2023
	@ResponseBody
	@RequestMapping(value = "/saveNursingDoctorRound", method = RequestMethod.POST)
	public int saveNursingDoctorRound(@RequestParam("doctorRoundId") String doctorRoundId,@RequestParam("dtime") String dtime,
			@RequestParam("nursingnotes") String nursingnotes,@RequestParam("treatmentId") String treatmentId,
			HttpServletRequest request) {
		
			return ipdHistoryService.saveNursingDoctorRound(doctorRoundId, dtime, nursingnotes,request);
		}
	
}
