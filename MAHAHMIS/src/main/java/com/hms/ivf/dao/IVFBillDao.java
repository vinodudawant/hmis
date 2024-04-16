package com.hms.ivf.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.OpdQueManagmentViewDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ivf.dto.EhatViewPatientBedDetailsIvfDto;
import com.hms.ivf.dto.IvfBillDetailsDto;
import com.hms.ivf.dto.IvfBillNobleDto;
import com.hms.ivf.dto.IvfBillNobleServiceDto;
import com.hms.ivf.dto.IvfBillReceiptMasterDTO;
import com.hms.ivf.dto.IvfBillRefundMasterDTO;
import com.hms.ivf.dto.PreviousTreatmentBillDto;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.OpdQueueDto;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;

public interface IVFBillDao {

	OpdQueueDto getAllIvfQueuePatient(OpdQueueDto objDto);
	PatientHeaderInfoDto getPatientInfoByTreatmentId(PatientHeaderInfoDto objDto);
	PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto);
	PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto);
	PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto);
	BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto);
	PreviousTreatmentBillDto getPreviousTreatmentPatient(PreviousTreatmentBillDto objDto);
	TreatmentDto getPrevPatdetails(Integer patientId);
	
	//Modify by Vinod Udawant on 31-march-2021 for IVF OPDQueue Patients and Queue Management.
	OpdQueManagmentViewDto getAllOpdRecordsDeptwiseWithAuto(Integer doctorId,String letter, String usertype, Integer unitId);
	
	int savecpoe(IvfBillDetailsDto billDetailsDto, String queryType);	
	int saveToOtherBilling(IvfBillDetailsDto billDetailsDto, String queryType,	Integer sponsorId, Integer chargesSlaveId, String a, HttpServletRequest request);
	
	List<IvfBillNobleDto> getPatientBillAmount(Integer treatmentId, int userId);	
	List<IvfBillNobleDto> getPatientBillAmount(Integer treatmentId);	
	List<IvfBillNobleServiceDto> getPatientServiceBill(Integer treatmentId,Integer serviceId);
	
	BillDetailsDto getTotalPayable(BillDetailsDto billRecMaster,String callFrom);	
	BillReceiptMasterDTO fetchAllIvfReceiptTotals(BillReceiptMasterDTO obj,String callFrom);
	
	int saveBillDetails(String masterIdsChecked,String servIdsChecked,Integer refDocId,IvfBillReceiptMasterDTO billRecMaster,String multiPayDetails);	
	int saveRefundBillDetails(String servIdsChecked,Integer refDocId,IvfBillReceiptMasterDTO billRecMaster);	
	IvfBillReceiptMasterDTO getBillReceiptDetails(IvfBillReceiptMasterDTO billRecMaster,String callFrom);	
	IvfBillRefundMasterDTO getBillRefundDetails(IvfBillRefundMasterDTO billRecMaster,String callFrom);
	int deleteMasterReceiptOPD(Integer recId, HttpServletRequest request);
	List<EhatViewPatientBedDetailsIvfDto> getIvfPatientBedBill(Integer treatmentId, Integer serviceId);
	int closeIVFPatientTreatment(Integer treatmentId,Integer userId,Integer ivfTreatId,Integer patientId);
	
	int getIvfTreatIdByNormalTreatmentId(Integer treatmentId );
}
