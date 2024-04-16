package com.hms.ivf.service;

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

public interface IvfBillService {

	OpdQueueDto getAllIvfQueuePatient(OpdQueueDto objDto);
	PatientHeaderInfoDto getPatientInfoByTreatmentId(PatientHeaderInfoDto objDto);
	PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto);
	PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto);
	PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto);
	BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto);
	PreviousTreatmentBillDto getPreviousTreatmentPatient(PreviousTreatmentBillDto objDto);
	TreatmentDto getPrevPatdetails(Integer patientId);
	
	//Modify by Vinod Udawant on 31-march-2021 for IVF OPDQueue Patients and Queue Management.
	OpdQueManagmentViewDto getAllOpdRecordsDeptwiseWithAuto(Integer deptId, String letter, String usertype, Integer unitId);
	
	//Modify by Vinod Udawant on 01-April-2021 for Save Ivf service
	int savecpoe(IvfBillDetailsDto billDetailsDto, HttpServletRequest request,String queryType);
	
	//Modify by Vinod Udawant on 01-April-2021 for fetch Ivf service
	List<IvfBillNobleDto> getPatientBillAmount(Integer treatmentId, HttpServletRequest request);	
	List<IvfBillNobleServiceDto> getPatientServiceBill(Integer treatmentId,Integer serviceId);
	
	BillDetailsDto getTotalPayable(BillDetailsDto billRecMaster,String callFrom);	
	BillReceiptMasterDTO fetchAllReceiptTotals(BillReceiptMasterDTO obj,String callFrom);
	
	Integer saveBillDetails(String masterIdsChecked,String servIdsChecked,Integer refDocId,IvfBillReceiptMasterDTO billRecMaster,String multiPayDetails);
	Integer saveRefundBillDetails(String servIdsChecked,Integer refDocId,IvfBillReceiptMasterDTO billRecMaster);
	IvfBillReceiptMasterDTO getBillReceiptDetails(IvfBillReceiptMasterDTO billRecMaster,String callFrom);	
	IvfBillRefundMasterDTO getBillRefundDetails(IvfBillRefundMasterDTO billRecMaster,String callFrom);	
	int deleteMasterReceiptOPD(Integer recId, HttpServletRequest request);
	List<EhatViewPatientBedDetailsIvfDto> getIvfPatientBedBill(Integer treatmentId, Integer serviceId);
	int closeIVFPatientTreatment(Integer treatmentId,Integer userId,Integer ivfTreatId,Integer patientId);
	
	int getIvfTreatIdByNormalTreatmentId(Integer treatmentId );
}
