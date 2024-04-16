package com.hms.ivf.controller;


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.canteen.dto.CustomizeTemplateDto;
import com.hms.dto.DoctorRoundTempDTO;
import com.hms.dto.PrescriptionInstruction;
import com.hms.dto.RouteDTO;
import com.hms.dto.TreatmentOperations;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ivf.dto.IvfDoctorRoundDto;
import com.hms.ivf.dto.IvfGeneralVoucherDto;
import com.hms.ivf.dto.IvfHistoryTempMasterDto;
import com.hms.ivf.dto.IvfPrescriptionDto;
import com.hms.ivf.service.IvfDoctorRoundService;
import com.hms.operation.util.OTOperationNotes;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.CreditNotePatient;
import com.hms.pharmacy.pojo.ProductMaster;

@SuppressWarnings("unused")
@Controller
@RequestMapping(value= "/ivfDoctorRound")
public class IvfDoctorRoundController {
	
	@Autowired
	IvfDoctorRoundService ivfDoctorService;
	
	//@author : Rohini Ambhore @date: 23-March-2021 @reason : To Save
	
	@RequestMapping(value = "/saveIvfDoctorRound", method = RequestMethod.POST)
	@ResponseBody
	public String saveIvfDoctorRound(@RequestParam("DoctorRoundDtoDetails") String DoctorRoundDtoDetails,
			HttpServletRequest request) {
		
		String response = "";
		int result = 0;

		IvfDoctorRoundDto objDto = (IvfDoctorRoundDto) ConfigUIJSONUtility.getObjectFromJSON(DoctorRoundDtoDetails,
				IvfDoctorRoundDto.class);

		result = ivfDoctorService.saveDoctorRoundInfo(objDto.getListDoctorRound(), request);
		
		if (result == 1) {
			response = "Data Inserted..";
		} else if (result == 2) {

			response = "Data Updated...";
		} else {
			response = "oops there is some problem..";
		}

		return response;
	}

	// @author : Rohini Ambhore @date: 23-March-2021 @reason : To Fetch

	@RequestMapping(value = "/fetchDoctorRound", method = RequestMethod.POST)
	@ResponseBody
	public IvfDoctorRoundDto fetchDoctorRound(@RequestParam("pid") int pid, @RequestParam("tid") int tid) {

		List<IvfDoctorRoundDto> listDoctorData = new ArrayList<IvfDoctorRoundDto>();

		listDoctorData = ivfDoctorService.fetchDoctorRoundData(pid, tid);
		IvfDoctorRoundDto obj = new IvfDoctorRoundDto();
		obj.setListDoctorRound(listDoctorData);

		return obj;
	}
	
	@RequestMapping(value = "/setIvfDoctorPreRound", method = RequestMethod.POST)
	@ResponseBody
	public IvfDoctorRoundDto setIvfDoctorPreRound(@RequestParam("tid") int tid, @RequestParam("date") String date)  {

		List<IvfDoctorRoundDto> setlistDoctorData = new ArrayList<IvfDoctorRoundDto>();
     
		setlistDoctorData = ivfDoctorService.setIvfDoctorPreRound(tid, date);
		IvfDoctorRoundDto obj = new IvfDoctorRoundDto();
		obj.setListDoctorRound(setlistDoctorData);

		return obj;
	}

	@RequestMapping(value = "/deleteDoctorRoundInfo", method = RequestMethod.GET)
	@ResponseBody
	public String deleteDoctorRoundInfo(@RequestParam("ovampickupslaveids") String ovampickupslaveids,
			@RequestParam("userId") int userId) {
		
		String msg = ivfDoctorService.deleteRecordDoctorRoundInfo(ovampickupslaveids, userId);
		return msg;
	}

	@RequestMapping(value = "/getListForIvfDoctorRound", method = RequestMethod.GET)
	@ResponseBody
	public IvfDoctorRoundDto getListForSurgicalHistory(@RequestParam("patientId") String patientId) {

		IvfDoctorRoundDto obj = new IvfDoctorRoundDto();
		List<IvfDoctorRoundDto> list = ivfDoctorService.getListForIvfDoctorRound(patientId);
		obj.setListDoctorRound(list);

		return obj;
	}
	
	@RequestMapping(value = "/getListForIvfDoctorRoundPrint", method = RequestMethod.GET)
	@ResponseBody
	public IvfDoctorRoundDto getListForIvfDoctorRoundPrint(@RequestParam("treatId") int treatId, String toDate,String fromDate) {

		IvfDoctorRoundDto obj = new IvfDoctorRoundDto();
		List<IvfDoctorRoundDto> list = ivfDoctorService.getListForIvfDoctorRoundPrint(treatId, toDate, fromDate);
		obj.setListDoctorRound(list);

		return obj;
	}

	
	@RequestMapping(value = "/getTemplateNameForIvfDoctorRound", method = RequestMethod.GET)
	@ResponseBody
	public DoctorRoundTempDTO getIvfDoctorListForTemplateName() {
		List<DoctorRoundTempDTO> listDoctorDetails = new ArrayList<DoctorRoundTempDTO>();
		listDoctorDetails = ivfDoctorService.getIvfDoctorListForTemplateName();
		DoctorRoundTempDTO obj = new DoctorRoundTempDTO();
		obj.setListDRT(listDoctorDetails);

		System.err.println("obj...." + obj.getListDRT());
		return obj;
	}

	@RequestMapping(value = "/getIvfTemplateDataForIvfDr", method = RequestMethod.GET)
	@ResponseBody
	public DoctorRoundTempDTO getIvfTemplateDataForIvfDr(@RequestParam("tempId") int tempId) {

		List<DoctorRoundTempDTO> IvfDataDr = new ArrayList<DoctorRoundTempDTO>();
		IvfDataDr = ivfDoctorService.getIvfTemplateDataForIvfDr(tempId);
		DoctorRoundTempDTO obj = new DoctorRoundTempDTO();
		obj.setListDRT(IvfDataDr);

		System.err.println("obj...." + obj.getListDRT());
		return obj;
	}
	
	@RequestMapping(value = "/getUnitTypeListForIvfDoctorRound", method = RequestMethod.GET)
	@ResponseBody
	public RouteDTO getUnitTypeListForIvfDoctorRound() {
		List<RouteDTO> unitList = new ArrayList<RouteDTO>();
		unitList = ivfDoctorService.getUnitTypeListForIvfDoctorRound();
		RouteDTO obj = new RouteDTO();
		obj.setRouteList(unitList);

		System.err.println("obj...." + obj.getRouteList());
		return obj;
	}
	
	
	@RequestMapping(value = "/getPreperationsListForIvfDoctorRound", method = RequestMethod.GET)
	@ResponseBody
	public RouteDTO getPreperationsListForIvfDoctorRound() {
		List<RouteDTO> prepList = new ArrayList<RouteDTO>();
		prepList = ivfDoctorService.getPreperationsListForIvfDoctorRound();
		RouteDTO obj = new RouteDTO();
		obj.setRouteList(prepList);

		System.err.println("obj...." + obj.getRouteList());
		return obj;
	}  
	
	@RequestMapping(value = "/getAllPresInstructionsForIvfDoctorRound", method = RequestMethod.GET)
	@ResponseBody
	public PrescriptionInstruction getAllPresInstructionsForIvfDoctorRound(@RequestParam("depType") String depType ) {
		
		List<PrescriptionInstruction> prepInstList = new ArrayList<PrescriptionInstruction>();
		prepInstList = ivfDoctorService.getAllPresInstructionsForIvfDoctorRound(depType);
		PrescriptionInstruction obj = new PrescriptionInstruction();
		obj.setPrescriptionInstructionList(prepInstList);

		System.err.println("obj...." + obj.getPrescriptionInstructionList());
		return obj;
	}
	

	@RequestMapping(value = "/saveIvfPrescriptionInfo", method = RequestMethod.POST)
	@ResponseBody
	public int saveIvfPrescriptionInfo(IvfPrescriptionDto obj, HttpServletRequest request) {

		int res = 0;
		System.err.println("IvfPrescriptionDto 11----"+obj.toString());
		res = ivfDoctorService.saveIvfPrescriptionInfo(obj, request);

		return res;
	}

	@RequestMapping(value = "/fetchIvfPrescriptionData", method = RequestMethod.POST)
	@ResponseBody
	public IvfPrescriptionDto fetchIvfPrescriptionData(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("callFrom") String callFrom) {

		IvfPrescriptionDto obj = new IvfPrescriptionDto();

		List<IvfPrescriptionDto> listPre = ivfDoctorService.fetchIvfPrescriptionData(treatmentId,callFrom);
		obj.setIvfPrescriptionList(listPre);

		return obj;
	}
	
	@RequestMapping(value = "/fetchPrescriptionByDate", method = RequestMethod.POST)
	@ResponseBody
	public IvfPrescriptionDto fetchPrescriptionByDate(@RequestParam("treatmentId") int treatmentId, @RequestParam("date") String date,@RequestParam("callFrom") String callFrom) {
		
		List<IvfPrescriptionDto> listPredate = new ArrayList<IvfPrescriptionDto>();
	     
		listPredate = ivfDoctorService.fetchPrescriptionByDate(treatmentId, date,callFrom);
		IvfPrescriptionDto obj = new IvfPrescriptionDto();
		obj.setIvfPrescriptionList(listPredate);

		return obj;
	}

	@RequestMapping(value = "/editIvfPrescriptionData", method = RequestMethod.GET)
	@ResponseBody
	public IvfPrescriptionDto editIvfPrescriptionData(
			@RequestParam("prescriptionId") Integer prescriptionId) {

		IvfPrescriptionDto obj2 = new IvfPrescriptionDto();
		obj2 = ivfDoctorService.editIvfPrescriptionData(prescriptionId);
		return obj2;
	}

	@RequestMapping(value = "/deleteIvfPrescriptionRow", method = RequestMethod.GET)
	@ResponseBody
	public String deleteIvfPrescriptionRow(@RequestParam("prescriptionIdRow") String prescriptionIdRow,
			@RequestParam("userId") int userId) {
		
		String msg = ivfDoctorService.deleteIvfPrescriptionRow(prescriptionIdRow, userId);
		return msg;
	}

	@RequestMapping(value = "/getListPrintForIvfPrescription", method = RequestMethod.GET)
	@ResponseBody
	public IvfPrescriptionDto getListPrintForIvfPrescription(@RequestParam("patientId") String patientId) {

		IvfPrescriptionDto obj = new IvfPrescriptionDto();
		List<IvfPrescriptionDto> list = ivfDoctorService.getListPrintForIvfPrescription(patientId);
		obj.setIvfPrescriptionList(list);

		return obj;
	}
	
	 /* Ivf History Start  31-03-2021*/
	
	@RequestMapping(value = "/saveIvfHistory", method = RequestMethod.POST)
	@ResponseBody	
	public int saveIvfHistory(IvfHistoryTempMasterDto ivfobj,@RequestParam("listIvfHisCompObj") String listIvfHisCompObj) {
		
		int  ivfhis = ivfDoctorService.saveIvfHistory(ivfobj, listIvfHisCompObj);
		
				return ivfhis;
	}
	
	@RequestMapping(value = "/fetchIvfHistoryMaster", method = RequestMethod.POST)
	@ResponseBody
	public IvfHistoryTempMasterDto fetchIvfHistoryMaster(@RequestParam("treatmentId") int treatmentId) {
     
		IvfHistoryTempMasterDto mobj = new IvfHistoryTempMasterDto();

		IvfHistoryTempMasterDto mobj1 = ivfDoctorService.fetchIvfHistoryMaster(treatmentId);  
		
		return mobj1;
	}
	
	
	
	@RequestMapping(value = "/deleteIvfHistoryInfo", method = RequestMethod.GET)
	@ResponseBody
	public String deleteIvfHistoryInfo(@RequestParam("historyslaveId") String historyslaveId,
			@RequestParam("userId") int userId) {
		
		String msg = ivfDoctorService.deleteIvfHistoryInfo(historyslaveId, userId);
		return msg;
	}
	
	 /*general Voucher 21/4/2021 */
	
	/*@RequestMapping(value = "/getAutoSuggessionPatientNameForGeneralVoucher", method = RequestMethod.GET)
	@ResponseBody
	public RegTreBillDto getAutoSuggessionPatientNameForGeneralVoucher(@RequestParam("findText") String findText) {
		List<RegTreBillDto> listpatientName = new ArrayList<RegTreBillDto>();
		listpatientName = ivfDoctorService.getAutoSuggessionPatientNameForGeneralVoucher(findText);      
		RegTreBillDto obj = new RegTreBillDto();
		//obj.setPatientList(listpatientName);  
		obj.setListRegTreBillDto(listpatientName);        

		//System.err.println("obj...." + obj.getfName());
		System.out.println("obj.controllet..." + obj.getListRegTreBillDto().get(0).getPatientName());
		return obj;
	}*/
	
	@RequestMapping(value = "/getAutoSuggessionPatientNameForGeneralVoucher", method = RequestMethod.GET)
	@ResponseBody
	public RegistrationViewDto getAutoSuggessionPatientNameForGeneralVoucher(@RequestParam("findText") String findText,
			@RequestParam("patSearchType") String patSearchType,@RequestParam("callFrom") String callFrom) {
		//List<RegistrationViewDto> listpatientName = new ArrayList<RegistrationViewDto>();
		      
		 
		RegistrationViewDto ltRegistrationViewDto = new  RegistrationViewDto();
		ltRegistrationViewDto = ivfDoctorService.getAutoSuggessionPatientNameForGeneralVoucher(findText,Integer.parseInt(patSearchType),callFrom);	
		return ltRegistrationViewDto;
	}
	
	
	@RequestMapping(value = "/ivfsaveGeneralVoucher", method = RequestMethod.POST)
	@ResponseBody	
	public int ivfsaveGeneralVoucher(IvfGeneralVoucherDto ivfobj) {   
		
		int  ivfhis = ivfDoctorService.ivfsaveGeneralVoucher(ivfobj);
		
				return ivfhis;
	}
	
	
	@RequestMapping(value = "/fetchGeneralVouchersList", method = RequestMethod.POST)
	@ResponseBody
	public IvfGeneralVoucherDto fetchGeneralVouchersList(@RequestParam("unitId") Integer unitId) {
		

		IvfGeneralVoucherDto obj = new IvfGeneralVoucherDto();

		List<IvfGeneralVoucherDto> listPre = ivfDoctorService.fetchGeneralVouchersList(unitId);
		obj.setListIvfGeneralVoucherDto(listPre);

		return obj;
	}
	
	@RequestMapping(value = "/fetchCanceledVouchersList", method = RequestMethod.POST)
	@ResponseBody
	public IvfGeneralVoucherDto fetchCanceledVouchersList() {
		

		IvfGeneralVoucherDto obj = new IvfGeneralVoucherDto();

		List<IvfGeneralVoucherDto> listPre = ivfDoctorService.fetchCanceledVouchersList();
		obj.setListIvfGeneralVoucherDto(listPre);

		return obj;
	}
	
	@RequestMapping(value = "/fetchVouchersBYSearch", method = RequestMethod.POST)
	@ResponseBody
	public IvfGeneralVoucherDto fetchVouchersBYSearch(@RequestParam("searchBy") String searchBy ,@RequestParam("selSearchType") int selSearchType) { 
		

		IvfGeneralVoucherDto obj = new IvfGeneralVoucherDto();

		List<IvfGeneralVoucherDto> listPre = ivfDoctorService.fetchVouchersBYSearch(searchBy,selSearchType);
		obj.setListIvfGeneralVoucherDto(listPre);

		return obj;
	} 
	
	@RequestMapping(value = "/updateGeneralVoucher", method = RequestMethod.GET)
	@ResponseBody
	public IvfGeneralVoucherDto updateGeneralVoucher(
			@RequestParam("updategeneralVoucherId") Integer updategeneralVoucherId) {

		IvfGeneralVoucherDto obj = new IvfGeneralVoucherDto();
		obj = ivfDoctorService.updateGeneralVoucher(updategeneralVoucherId);
		return obj;
	}
	@RequestMapping(value = "/deletegeneralVoucher", method = RequestMethod.POST)
	@ResponseBody	
	public String deletegeneralVoucher(@RequestParam("todeletegeneralVoucherId") Integer todeletegeneralVoucherId) {
		
		String msg = ivfDoctorService.deletegeneralVoucher(todeletegeneralVoucherId);
		return msg;
	}
	
	
	@RequestMapping(value = "/fetchPrintGeneralVoucher", method = RequestMethod.GET)
	@ResponseBody
	public IvfGeneralVoucherDto fetchPrintGeneralVoucher(@RequestParam("generalVoucherId") int generalVoucherId) {

		IvfGeneralVoucherDto obj = new IvfGeneralVoucherDto();
		List<IvfGeneralVoucherDto> list = ivfDoctorService.fetchPrintGeneralVoucher(generalVoucherId);
		obj.setListIvfGeneralVoucherDto(list);

		return obj;
	}
	
	@RequestMapping(value = "/fetchPrintForCanceledGeneralVoucher", method = RequestMethod.GET)
	@ResponseBody
	public IvfGeneralVoucherDto fetchPrintForCanceledGeneralVoucher(@RequestParam("generalVoucherId") int generalVoucherId) {

		IvfGeneralVoucherDto obj = new IvfGeneralVoucherDto();
		List<IvfGeneralVoucherDto> list = ivfDoctorService.fetchPrintForCanceledGeneralVoucher(generalVoucherId);
		obj.setListIvfGeneralVoucherDto(list);

		return obj;
	}
	
	@RequestMapping(value = "/getNextGeneralVoucherId", method = RequestMethod.GET)
	@ResponseBody
	public int getNextGeneralVoucherId() {
		
		int nextGeneralVoucherId=0;
		nextGeneralVoucherId=ivfDoctorService.getNextGeneralVoucherId();

		return nextGeneralVoucherId;
	}
	
	/*pharma Start   28-04-2021*/
	
	@RequestMapping(value = "/getAllPatientByIdSaleData", method = RequestMethod.GET)
	public @ResponseBody List<CreditNotePatient> getAllPatientByIdSaleData(@RequestParam("patientId") Integer patientId) {

		List<CreditNotePatient> patientSaleBillMaster = new ArrayList<CreditNotePatient>();
		patientSaleBillMaster = ivfDoctorService.getAllPatientByIdSaleData(patientId);
		
		return patientSaleBillMaster;
	}
	
	@RequestMapping(value = "/displayAllPatientReceiptDataByBillNoAndYear", method = RequestMethod.GET)
	public @ResponseBody List<CreditNotePatient> displayAllPatientReceiptDataByBillNoAndYear(@RequestParam("billNo") Integer billNo,@RequestParam("billNoYear") String billNoYear) {

		List<CreditNotePatient> patientSaleBillMaster = new ArrayList<CreditNotePatient>();
		patientSaleBillMaster = ivfDoctorService.displayAllPatientReceiptDataByBillNoAndYear(billNo,billNoYear);
		
		return patientSaleBillMaster;
	}
	
	
	/* genera voucher report*/
	
	@RequestMapping(value = "/getListRecord", method = RequestMethod.GET)
	@ResponseBody
	public IvfGeneralVoucherDto getListRecord(HttpServletRequest request,@RequestParam("fromdate")String fromdate
			,@RequestParam("todate")String todate,@RequestParam("fromtime")String fromtime,@RequestParam("totime")String totime,@RequestParam("voucherlist")String voucherlist,
			@RequestParam("ledlist")String ledlist,@RequestParam("callfrom")String callfrom, @RequestParam("userid") int userId
	        ) {

		IvfGeneralVoucherDto obj = new IvfGeneralVoucherDto();
		List<IvfGeneralVoucherDto  > list = ivfDoctorService.getListRecord(request,fromdate,todate,fromtime,totime,voucherlist,ledlist,callfrom,userId);
		obj.setListIvfGeneralVoucherDto(list);     
		return obj;
	}
	
	@RequestMapping(value = "/fetchIvfOperationsData", method = RequestMethod.GET)
	@ResponseBody
	public TreatmentOperations fetchIvfOperationsData(@RequestParam("tid") int tid,@RequestParam("pid") int pid) {

		TreatmentOperations obj = new TreatmentOperations();
		List<TreatmentOperations> list = ivfDoctorService.fetchIvfOperationsData(tid,pid);
		obj.setListtreatmentoperation(list);

		return obj;
	}
	
	@RequestMapping(value = "/fetchIvfOTNotesData", method = RequestMethod.POST)
	@ResponseBody
	public OTOperationNotes fetchIvfOTNotesData(@RequestParam("ivftomId") int ivftomId) {

		OTOperationNotes obj = new OTOperationNotes();
		List<OTOperationNotes> list = ivfDoctorService.fetchIvfOTNotesData(ivftomId);
		obj.setListOTNotes(list);

		return obj;
	}

	@RequestMapping(value = "/fetchIvfCustomizeTemplateList", method = RequestMethod.POST)
	@ResponseBody
	public CustomizeTemplateDto fetchIvfCustomizeTemplateList(@RequestParam("templateId") int templateId, @RequestParam("callFrom") String callFrom) {

		CustomizeTemplateDto obj = new CustomizeTemplateDto();
		List<CustomizeTemplateDto> list = ivfDoctorService.fetchIvfCustomizeTemplateList(templateId,callFrom);
		obj.setLts(list);

		return obj;
	}
	
	@RequestMapping(value = "/saveIvfOTNotesData", method = RequestMethod.POST)
	@ResponseBody
	public synchronized int saveIvfOTNotesData(@RequestParam("listOTNotesListDetails") String listOTNotesList, @RequestParam("chkEditerdata") String chkEditerdata,
			@RequestParam("callFrom") String callFrom, HttpServletRequest request) {
		int OtNoteId = ivfDoctorService.saveIvfOTNotesData(listOTNotesList, chkEditerdata, callFrom, request);
		return OtNoteId;
	}
	
	@RequestMapping(value = "/lstProductMaster", method = RequestMethod.GET)
	@ResponseBody
	public ProductMaster  lstProductMaster(@RequestParam("text") String text, HttpServletRequest request) {
		ProductMaster obj=new ProductMaster();
		List<ProductMaster>  list= ivfDoctorService.lstProductMaster(text);
		obj.setPlist(list);
		
		return obj;
	}
}
