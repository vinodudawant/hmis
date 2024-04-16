package com.hms.ivf.service.impl;


import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.canteen.dto.CustomizeTemplateDto;
import com.hms.dto.DoctorRoundTempDTO;
import com.hms.dto.InventoryFetchPateintNameDTO;
import com.hms.dto.PrescriptionInstruction;
import com.hms.dto.RouteDTO;
import com.hms.dto.TreatmentOperations;
import com.hms.ehat.dto.EhatOTOperationNotes;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ivf.dao.IvfDoctorRoundDao;
import com.hms.ivf.dto.IvfDoctorRoundDto;
import com.hms.ivf.dto.IvfGeneralVoucherDto;
import com.hms.ivf.dto.IvfHistorySlaveDto;
import com.hms.ivf.dto.IvfHistoryTempMasterDto;
import com.hms.ivf.dto.IvfPrescriptionDto;
import com.hms.ivf.service.IvfDoctorRoundService;
import com.hms.operation.util.OTOperationNotes;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.CreditNotePatient;
import com.hms.pharmacy.pojo.ProductMaster;

@Service
@Transactional
public class IvfDoctorRoundServiceImpl implements IvfDoctorRoundService {

	@Autowired
	IvfDoctorRoundDao doctorRoundDao;  
	
	@Override
	public int saveDoctorRoundInfo(List<IvfDoctorRoundDto> objDto, HttpServletRequest request) {
		
		return doctorRoundDao.saveDoctorRoundInfo(objDto, request); 
	}

	@Override
	public List<IvfDoctorRoundDto> fetchDoctorRoundData(int patientId, int treatmentId) {
		
		return doctorRoundDao.fetchDoctorRoundData(patientId, treatmentId);
	}
	
	@Override
	public List<IvfDoctorRoundDto> setIvfDoctorPreRound(int treatmentId, String date) {
		
		return doctorRoundDao.setIvfDoctorPreRound(treatmentId, date);
		
	}

	@Override
	public String deleteRecordDoctorRoundInfo(String ovampickupslaveids, int userId) {
		
		return doctorRoundDao.deleteRecordDoctorRoundInfo(ovampickupslaveids, userId);
	}

	@Override
	public List<IvfDoctorRoundDto> getListForIvfDoctorRound(String patientId) {
		
		return doctorRoundDao.getListForIvfDoctorRound(patientId); 
	}
	
	@Override
	public List<IvfDoctorRoundDto> getListForIvfDoctorRoundPrint(int treatmentId, String toDate, String fromDate) {
		
		return doctorRoundDao.getListForIvfDoctorRoundPrint(treatmentId,toDate,fromDate); 
	}

	@Override
	public List<DoctorRoundTempDTO> getIvfDoctorListForTemplateName() {
		
		return doctorRoundDao.getIvfDoctorListForTemplateName();
	}

	@Override
	public List<DoctorRoundTempDTO> getIvfTemplateDataForIvfDr(int tempId) {
		
		return doctorRoundDao.getIvfTemplateDataForIvfDr(tempId);
	}
	
	@Override
	public List<RouteDTO> getUnitTypeListForIvfDoctorRound() {
		
		return doctorRoundDao.getUnitTypeListForIvfDoctorRound();
	}
	
	@Override
	public List<RouteDTO> getPreperationsListForIvfDoctorRound() {
		
		return doctorRoundDao.getPreperationsListForIvfDoctorRound();
	}
	
	@Override
	public List<PrescriptionInstruction> getAllPresInstructionsForIvfDoctorRound(String depType) {
		
		return doctorRoundDao.getAllPresInstructionsForIvfDoctorRound(depType);
	}


	@Override
	public int saveIvfPrescriptionInfo(IvfPrescriptionDto ivfPrescriptionDto, HttpServletRequest request) {
		
		return doctorRoundDao.saveIvfPrescriptionInfo(ivfPrescriptionDto,request);
	}

	@Override
	public List<IvfPrescriptionDto> fetchIvfPrescriptionData(int treatmentId,String callFrom) {
		
		return doctorRoundDao.fetchIvfPrescriptionData(treatmentId,callFrom);
	}

	@Override
	public List<IvfPrescriptionDto> fetchPrescriptionByDate(int treatmentId, String date,String callFrom) {
		
		return doctorRoundDao.fetchPrescriptionByDate(treatmentId, date,callFrom);
	}


	@Override
	public IvfPrescriptionDto editIvfPrescriptionData(Integer prescriptionId) {
		
		return doctorRoundDao.editIvfPrescriptionData(prescriptionId);
	}

	@Override
	public String deleteIvfPrescriptionRow(String prescriptionIdRow, int userId) {
		
		return doctorRoundDao.deleteIvfPrescriptionRow(prescriptionIdRow, userId);
	}

	@Override
	public List<IvfPrescriptionDto> getListPrintForIvfPrescription(String patientId) {
		
		return doctorRoundDao.getListPrintForIvfPrescription(patientId);
	}

	@Override
	public int saveIvfHistory(IvfHistoryTempMasterDto obj, String ivfHistorySlaveDtoList) {
	
		IvfHistorySlaveDto objivfHislave = (IvfHistorySlaveDto) ConfigUIJSONUtility
				.getObjectFromJSON(ivfHistorySlaveDtoList, IvfHistorySlaveDto.class);	
		
		List<IvfHistorySlaveDto> lstHis = objivfHislave.getGetListOfHistorySlaveDTO();
		
		obj.setGetListOfHistorySlaveDTO(lstHis);  
		return doctorRoundDao.saveIvfHistory(obj);
		
	}

	@Override
	public IvfHistoryTempMasterDto fetchIvfHistoryMaster(int treatmentId) {
		
		return doctorRoundDao.fetchIvfHistoryMaster(treatmentId);
	}

	@Override
	public String deleteIvfHistoryInfo(String historyslaveId, int userId) {
			
		return doctorRoundDao.deleteIvfHistoryInfo(historyslaveId, userId);
	}

	@Override
	public List<IvfHistoryTempMasterDto> fetchIvfHistoryMasterForPrint(int treatmentId) {
		
		return doctorRoundDao.fetchIvfHistoryMasterForPrint(treatmentId);
	}

	/*@Override
	public List<RegTreBillDto> getAutoSuggessionPatientNameForGeneralVoucher(String findText) {
		
		return doctorRoundDao.getAutoSuggessionPatientNameForGeneralVoucher(findText);
	}*/
	
	@Override
	public RegistrationViewDto getAutoSuggessionPatientNameForGeneralVoucher(String findingName, int patSearchType,
			String callFrom) {

		return doctorRoundDao.getAutoSuggessionPatientNameForGeneralVoucher(findingName, patSearchType, callFrom);
	}

	@Override
	public int ivfsaveGeneralVoucher(IvfGeneralVoucherDto ivfobj) {
		
		return doctorRoundDao.ivfsaveGeneralVoucher(ivfobj);
	}

	@Override
	public List<IvfGeneralVoucherDto> fetchGeneralVouchersList(Integer unitId) {
		
		return doctorRoundDao.fetchGeneralVouchersList(unitId);
	}
	
	@Override
	public List<IvfGeneralVoucherDto> fetchCanceledVouchersList() {
		
		return doctorRoundDao.fetchCanceledVouchersList();
	}

	@Override
	public List<IvfGeneralVoucherDto> fetchVouchersBYSearch(String searchBy,int selSearchType) {
		
		return doctorRoundDao.fetchVouchersBYSearch(searchBy,selSearchType);
	}
	
	@Override
	public IvfGeneralVoucherDto updateGeneralVoucher(Integer updategeneralVoucherId) {
		
		return doctorRoundDao.updateGeneralVoucher(updategeneralVoucherId);
	}
	
	@Override
	public String deletegeneralVoucher(Integer todeletegeneralVoucherId) {
		
		return doctorRoundDao.deletegeneralVoucher(todeletegeneralVoucherId);
	}

	@Override
	public List<IvfGeneralVoucherDto> fetchPrintGeneralVoucher(int generalVoucherId) {
		
		return doctorRoundDao.fetchPrintGeneralVoucher(generalVoucherId);
	}
	
	@Override
	public List<IvfGeneralVoucherDto> fetchPrintForCanceledGeneralVoucher(int generalVoucherId) {
		
		return doctorRoundDao.fetchPrintForCanceledGeneralVoucher(generalVoucherId);
	}

	@Override
	public int getNextGeneralVoucherId() {
	
		return doctorRoundDao.getNextGeneralVoucherId();
	}

	@Override
	public List<CreditNotePatient> getAllPatientByIdSaleData(Integer patientId) {
		
		return doctorRoundDao.getAllPatientByIdSaleData(patientId);
	}
	
	@Override
	public List<CreditNotePatient> displayAllPatientReceiptDataByBillNoAndYear(Integer billNo, String billNoYear) {
		
		return doctorRoundDao.displayAllPatientReceiptDataByBillNoAndYear(billNo , billNoYear );
	}

	
	@Override
	public List<IvfGeneralVoucherDto> getListRecord(HttpServletRequest request, String fromdate, String todate,String fromtime,String totime,String voucherlist,String ledlist,String callfrom,int userId) {
		return doctorRoundDao.getListRecord( request,fromdate,todate,fromtime,totime,voucherlist,ledlist,callfrom,userId);
	}

	@Override
	public List<InventoryFetchPateintNameDTO> displayAllPatientReceiptDataByPatientId(Integer patientId,
			String typeOfpatient) {
		
		return doctorRoundDao.displayAllPatientReceiptDataByPatientId(patientId , typeOfpatient );
	}
	
	@Override
	public List<TreatmentOperations> fetchIvfOperationsData(int TreatId,int PatientId) {
		
		return doctorRoundDao.fetchIvfOperationsData(TreatId,PatientId);
	}
	
	@Override
	public List<OTOperationNotes> fetchIvfOTNotesData(int ivftomId) {
		
		return doctorRoundDao.fetchIvfOTNotesData(ivftomId);
	}
	
	@Override
	public List<CustomizeTemplateDto> fetchIvfCustomizeTemplateList(int templateId, String callFrom) {
		
		return doctorRoundDao.fetchIvfCustomizeTemplateList(templateId, callFrom);
	}
	
	@Override
	@Transactional
	public int saveIvfOTNotesData(String listOTNotesList, String chkEditerdata, String queryType, HttpServletRequest request) {
		int OtNoteId = doctorRoundDao.saveIvfOTNotesData(listOTNotesList, chkEditerdata, queryType, request);
		return OtNoteId;
	}

	@Override
	@Transactional
	public List<ProductMaster> lstProductMaster(String text) {
		
		return doctorRoundDao.lstProductMaster(text);
	}

}
