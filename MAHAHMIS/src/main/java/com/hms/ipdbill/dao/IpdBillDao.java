package com.hms.ipdbill.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillNobleServicePackageipdDto;
import com.hms.ehat.dto.BillQuotationDto;
import com.hms.ehat.dto.CghsIpdDto;
import com.hms.ehat.dto.ConfigurationViewServiceDto2;
import com.hms.ehat.dto.DistributionPojo;
import com.hms.ehat.dto.EhatOtherBillDetailForIpdDto;
import com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto;
import com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto;
import com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto2;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsForIpdPackage;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto2;
import com.hms.ehat.dto.GetPopUpDataForOTDto;
import com.hms.ehat.dto.MultipleSponsorDto;
import com.hms.ehat.dto.NewBillQuotation;
import com.hms.ehat.dto.PharmacyDetailsOnBillingPrintDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.EmrChargesDto;
import com.hms.ipdbill.dto.IpdBillDTO;
import com.hms.ipdbill.dto.IpdBillDiscount;
import com.hms.ipdbill.dto.IpdBillPatientsBedsDTO;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdBillPatientsDTO2;
import com.hms.ipdbill.dto.IpdBillReceiptMasterDTO;
import com.hms.ipdbill.dto.IpdBillRefundMasterDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;

public interface IpdBillDao {

	List<IpdQueueDTO> getIpdQueue(Integer unitId);	
	List<IpdQueueDTO> getAutoSuggestionIpdQueue(String letter);
	int saveIpdBillDetails(IpdBillDTO objDto);
	List<IpdBillPatientsDTO> getIpdbillPatients(String general, Integer unitId, Integer userId1, String userType,int wardType,int hallTypeSelectId,String ward);
	List<IpdBillDTO> getBillDetails(Integer treatId);	
	Object getsubServiceDetails(@SuppressWarnings("rawtypes") Class className,Integer srvId);
	
	
	
	List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromView(Integer treatmentId, String treatcloseForIpd, Integer userId);
	
	List<EhatViewPatientBedDetailsIpdDto> getPatientBedBill(Integer treatmentId, Integer serviceId);
	
	List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBill(
			Integer treatmentId, Integer serviceId);
	
	List<IpdBillPatientsDTO> autosuggesstionviewIpdbillPatients(String letter,String finalBill,HttpServletRequest request);
	int saveBillDetailsIpd(String servIdsChecked,Integer refDocId,IpdBillReceiptMasterDTO billRecMaster,String multiPayDetails);	
	int saveRefundBillDetailsIpd(String servIdsChecked,Integer refDocId,IpdBillRefundMasterDTO billRecMaster,String multiPayDetails, String listMultiRefundSave);	
	IpdBillReceiptMasterDTO getBillReceiptDetailsIpd(IpdBillReceiptMasterDTO billRecMaster,String callFrom);
	IpdBillRefundMasterDTO getBillRefundDetailsIpd(IpdBillRefundMasterDTO billRecMaster,String callFrom);	
	
	List<EhatViewPatientSubServiceDetailsIpdDto2> getPatientServiceBillSponsorForIpd(
			Integer treatmentId, Integer serviceId, Integer chargesSlaveId);
	
	List<EhatViewPatientServiceDetailIpdDto2> getPatientPreviousBillAmountForGenIpd(
			Integer treatmentId);
	List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromView(
			Integer treatmentId, String treatcloseForIpd);
	List<EhatViewPatientServiceDetailIpdDto2> getPatientPreviousBillAmountForGenIpd(
			Integer treatmentId, Integer userId);
	
	List<EhatViewPatientServiceDetailIpdDto> getPatientBillAmountIpdForEstimation(
			Integer treatmentId, String startDate, String endDate, String callFrom);
	
	List<EhatViewPatientServiceDetailIpdDto> getPatientBillAmountIpdForEstimation(
			Integer treatmentId, String startDate, String endDate, Integer userId, String callFrom);
	List<EhatViewPatientBedDetailsIpdDto> getBedDetailsForEstimate(
			Integer treatmentId, Integer serviceId, String startDate,
			String endDate);
	List<EhatViewPatientSubServiceDetailsIpdDto> getIpdPatientServiceBill2ForEstimate(
			Integer treatmentId, Integer serviceId, String startDate,
			String endDate);
	List<EhatViewPatientSubServiceDetailsForIpdPackage> getPackagedataforIpd(
			Integer pSId, Integer pSubSId, Integer chargesSlaveId,
			Integer sponsorId, Integer treatmentId, Integer patientId, Integer billDetailsId);
	int savePackageIpd(
			EhatOtherBillDetailForIpdDto ehatOtherBillDetailForOpdDto,
			HttpServletRequest request, String queryType);
	boolean deleteOnClickForPackageIpd(Integer billDetailsId,
			Integer otherbildetailidipd, Integer userId);
	
	
	int getAdminChargesIpd(BillDetailsIpdDto billRecMaster,String callFrom);
	
	List<BillNobleServicePackageipdDto> getlistOfPackageipd(Integer treatmentId);
	
	int convertServiceToPackage(BillDetailsIpdDto billdetails,
			HttpServletRequest request, Integer treatmentId,
			String servIdsChecked, Integer billDetailsId, Integer subServiceId,
			Integer serviceId);
	
	int includeInPackAmount(BillDetailsIpdDto billdetails,
			HttpServletRequest request, Integer pSubserviceId, Integer pservId,
			Integer billDetailsId, double packamount, double totalAmtPackage, double totalAmtRem);
	
	int convertToBillingipd(BillDetailsIpdDto billdetails,
			HttpServletRequest request, Integer treatmentId,
			String otherBillDetailsIdOpd);
	
	BillDetailsIpdDto getTotalPayableIpd(BillDetailsIpdDto billRecMaster,String callFrom);
	
	List<GetPopUpDataForOTDto> getPopUpDataForOT(
			Integer pSId, Integer pSubSId, Integer chargesSlaveId,
			Integer sponsorId, Integer treatmentId, Integer patientId,
			Integer billDetailsId);
	int saveIpdCghs(String cghsDetailsRemain, String queryType, Integer userId,
			int unitId, String cghsDetails, int treatmentId, int departmentId);
	List<CghsIpdDto> getIpdServiceDetailsForCghs(int treatmentId, int deptId);
	boolean deleteOnClickForCghsIpd(Integer cghsid, Integer depid, Integer userId);
		
	
	int saveEditIPDDiscount(IpdBillDiscount ipdBillDiscount);
	
	List<IpdBillDiscount> fetchIpdbillTreatDiscount(int treatId);
	
	List<IpdBillDiscount> fetchIpdbilDiscount(HttpServletRequest req);
	
	int saveApprovedDiscount(IpdBillDiscount objIpdbill);
	
	int genarateInvoice(int treatId,int billTypeId,int userId);
	
	List<IpdBillPatientsDTO> autosuggesstionviewIpdbillPatients(String letter,
			String finalBill, String usertype,HttpServletRequest request);
	List<EhatViewPatientSubServiceDetailsIpdDto> getIpdPatientServiceBillForComparison(
			Integer treatmentId);
	
	List<ConfigurationViewServiceDto2> getIpdComparisonPatients(int treatmentId,
			String servId, String subServId, String chargesSponId,
			String chargesSlaveId, String HallId, String HallSlaveId, String isComServId, String isComServlastId);
	
	int saveQuotations(String billquotations, String queryType, Integer userId,
			int unitId, int treatmentId, int departmentId);
	
	List<BillQuotationDto> getBillQuotationsDetails(int treatmentId, int deptId);
	
	IpdBillReceiptMasterDTO fetchPrevPendingIpd(IpdBillReceiptMasterDTO obj,String callFrom);
	List<BillQuotationDto> getBillQuotationsNameList(int treatmentId, int deptId);
	List<BillQuotationDto> getBillQuotationsDetailsRunT(int treatmentId,
			int count);		
	
	IpdBillReceiptMasterDTO fetchSurgonList(IpdBillReceiptMasterDTO obj,String callFrom);
	
	int saveDoctorDiscount(IpdBillDiscount ipdBillDiscount);
	int saveQuotationsNew(String serviceDetails, String queryType,
			Integer userId, int unitId, String callfrom, Double adminChargesPer);
	
	List<NewBillQuotation> getServiceDetails(Integer count,
			String callfrom,Integer patientId, HttpServletRequest request);
	List<NewBillQuotation> getSubServiceDetails(Integer count,
			Integer serviceId,Integer patientId, HttpServletRequest request);
	int saveAndDeleteQuotaion(String quotationName, String quotationId,
			Integer userId, int unitId, String callfrom,Integer patientId);
	
	int distributePpnAmount(DistributionPojo obj,
			Integer userId, int unitId);
	
	IpdBillPatientsDTO2 getIpdbillPatientsFilter(String general,
			Integer wardType, Integer hallTypeSelectId,
			String ward, Integer unitId, Integer userId1, String userType);
	boolean chkTimeEmrgyOrNot();
	
	IpdBillPatientsBedsDTO getIpdbillPatientsBeds(String general,
			Integer unitId, Integer userId1, String userType);
	
	IpdBillPatientsBedsDTO getIpdbillPatientsBedsByFilter(int hallTypeId,
			int hallId, String filter);
	
	IpdBillPatientsBedsDTO autosuggesstionviewIpdbillPatientsBlockWise(
			String letter, String finalBill, String usertype,Integer unitId);
	
	IpdBillPatientsDTO2 getIpdbillPatients2(String general, Integer unitId,
			Integer userId1, String userType);
	
	IpdBillPatientsDTO2 autosuggesstionviewIpdbillPatients2(String letter,
			String finalBill, String usertype,Integer unitId);
	IpdBillPatientsDTO2 autosuggesstionviewIpdbillPatients2(String letter,
			String finalBill,Integer unitId);
	
	int cancelAdmission(TreatmentDto treatmentDto,HttpServletRequest request);
	int packageIpdSendToLab(
			EhatOtherBillDetailForIpdDto ehatOtherBillDetailForIpdDto,
			HttpServletRequest request);
	String getColorCode(int treatmentId);
	
	boolean getEmerChrTimeSunday();
	List<PharmacyDetailsOnBillingPrintDto> getPharmacyDetailsONBillingPrint(
			int treatmentId, int patientId);
	Double getSponcerDisc(int chargesSlaveId);
	
	List<MultipleSponsorDto> getSponsorSanctionAmount(Integer sponsorId,
			Integer chargesSlaveId, Integer treatmentId, Integer patientId,String callfrom,
			HttpServletRequest request);
	
	// Added by vinod start
	List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromViewRpt(Integer treatmentId, String treatcloseForIpd,Integer chargesSlaveId);	
	List<EhatViewPatientBedDetailsIpdDto> getPatientBedBill(Integer treatmentId, Integer serviceId,Integer chargesSlaveId);
	List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBill(Integer treatmentId, Integer serviceId,Integer chargesSlaveId);
	List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBillForNarco(Integer treatmentId, Integer serviceId,Integer chargesSlaveId);
	// Added by vinod end
	int setSponsorRateToSelfPatient(String labservicelist,String servicelist, Integer treatmentId,
			Integer patientId,Integer sponsorId,Integer sponsorSlaveId,String callFrom, Integer userId);
	
	BillDetailsIpdDto setServiceForCash(BillDetailsIpdDto obj,String callFrom,String servIdsChecked);
	
	List<IpdQueueDTO> autoSuggestationIpdQueue(String searchText);
	
	IpdQueueDTO getIpdQueuePatientByTreatmentId(Integer treatId);
	
	Integer updateIpdBillDetails(Integer treatId);
	
	Integer deleteRefundReceipt(Integer treatId, Integer recId,String remarkDeletedRefund,HttpServletRequest request);
	
	void setRemainSanctionAmountForOpd(Integer sponsorId, Integer chargesSlaveId, Integer treatmentId,
			Integer patientId);
	void setRemainSanctionAmount(Integer sponsorId, Integer chargesSlaveId, Integer treatmentId,
			Integer patientId);
	
	Integer setIpdBillDetailsDistribute(Integer treatId,HttpServletRequest request);

	EmrChargesDto getEmerChrTimeDR(EmrChargesDto emrChargesDto);
}
