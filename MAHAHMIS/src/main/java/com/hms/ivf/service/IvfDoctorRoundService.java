package com.hms.ivf.service;


import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.canteen.dto.CustomizeTemplateDto;
import com.hms.dto.Doctor;
import com.hms.dto.DoctorRoundTempDTO;
import com.hms.dto.InventoryFetchPateintNameDTO;
import com.hms.dto.PrescriptionInstruction;
import com.hms.dto.RouteDTO;
import com.hms.dto.TreatmentOperations;
import com.hms.ehat.dto.EhatOTOperationNotes;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ivf.dto.IvfDoctorRoundDto;
import com.hms.ivf.dto.IvfGeneralVoucherDto;
import com.hms.ivf.dto.IvfHistoryTempMasterDto;
import com.hms.ivf.dto.IvfPrescriptionDto;
import com.hms.ivf.dto.SurgeryAdviceForIvfDTO;
import com.hms.operation.util.OTOperationNotes;
import com.hms.pharmacy.pojo.CreditNotePatient;
import com.hms.pharmacy.pojo.ProductMaster;

public interface IvfDoctorRoundService {
	
    public int  saveDoctorRoundInfo(List<IvfDoctorRoundDto> objDto,HttpServletRequest request);
	
	public List<IvfDoctorRoundDto> fetchDoctorRoundData(int patientId, int treatmentId);
	
	public List<IvfDoctorRoundDto> setIvfDoctorPreRound(int treatmentId ,String date);
	
	public String deleteRecordDoctorRoundInfo(String ovampickupslaveids, int userId);	
	public List<IvfDoctorRoundDto> getListForIvfDoctorRound(String patientId);
	
	public List<IvfDoctorRoundDto> getListForIvfDoctorRoundPrint( int treatmentId,String toDate ,String fromDate);
	List<DoctorRoundTempDTO> getIvfDoctorListForTemplateName();
	List<DoctorRoundTempDTO> getIvfTemplateDataForIvfDr(int tempId);

	
	List<RouteDTO> getUnitTypeListForIvfDoctorRound();
	List<RouteDTO> getPreperationsListForIvfDoctorRound();
	List<PrescriptionInstruction> getAllPresInstructionsForIvfDoctorRound(String depType);
	
	int saveIvfPrescriptionInfo(IvfPrescriptionDto ivfPrescriptionDto, HttpServletRequest request);
	
	List<IvfPrescriptionDto> fetchIvfPrescriptionData(int treatmentId,String callFrom);
	public List<IvfPrescriptionDto> fetchPrescriptionByDate(int treatmentId ,String date,String callFrom);

	public IvfPrescriptionDto editIvfPrescriptionData(Integer prescriptionId);

	public String deleteIvfPrescriptionRow(String prescriptionIdRow, int userId);

	public List<IvfPrescriptionDto> getListPrintForIvfPrescription(String patientId);
	
	  /*ivf history*/
	int saveIvfHistory(IvfHistoryTempMasterDto obj,String  ivfHistorySlaveDtoList);
	
	IvfHistoryTempMasterDto fetchIvfHistoryMaster(int treatmentId);
	
	List<IvfHistoryTempMasterDto> fetchIvfHistoryMasterForPrint(int treatmentId);
	public String deleteIvfHistoryInfo(String historyslaveId, int userId);
	
	//List<RegTreBillDto>  getAutoSuggessionPatientNameForGeneralVoucher( String findText);
	RegistrationViewDto getAutoSuggessionPatientNameForGeneralVoucher(String findingName,int patSearchType,String callFrom);

	public int ivfsaveGeneralVoucher(IvfGeneralVoucherDto ivfobj);

	public List<IvfGeneralVoucherDto> fetchGeneralVouchersList(Integer unitId);
	
	public List<IvfGeneralVoucherDto> fetchCanceledVouchersList();
	
	public List<IvfGeneralVoucherDto> fetchVouchersBYSearch(String searchBy,int selSearchType);

	 String deletegeneralVoucher(Integer todeletegeneralVoucherId);

	 List<IvfGeneralVoucherDto> fetchPrintGeneralVoucher(int generalVoucherId);  
	 List<IvfGeneralVoucherDto> fetchPrintForCanceledGeneralVoucher(int generalVoucherId); 

	 int getNextGeneralVoucherId();

	 IvfGeneralVoucherDto updateGeneralVoucher(Integer updategeneralVoucherId);
	 
	 /*    Pharma Start*/

	 List<CreditNotePatient> getAllPatientByIdSaleData(Integer patientId);

	 List<CreditNotePatient> displayAllPatientReceiptDataByBillNoAndYear(Integer billNo, String billNoYear);

	 
       /*genera voucher report*/
	 
	 public List<IvfGeneralVoucherDto> getListRecord(HttpServletRequest request, String fromdate, String todate,String fromtime,String totime,String voucherlist,String ledlist,String callfrom,int userId);

	 List<InventoryFetchPateintNameDTO> displayAllPatientReceiptDataByPatientId(Integer patientId, String typeOfpatient);

	
	 List<TreatmentOperations> fetchIvfOperationsData(int TreatId,int PatientId); 
	 
	 List<OTOperationNotes> fetchIvfOTNotesData(int ivftomId); 
	 
	 List<CustomizeTemplateDto> fetchIvfCustomizeTemplateList(int templateId, String callFrom); 
	 
	 int saveIvfOTNotesData(String listOTNotesList,String chkEditerdata, String queryType,HttpServletRequest request);
	 
	 
	 List<ProductMaster> lstProductMaster(String text);

	

	
		
	
	
}
