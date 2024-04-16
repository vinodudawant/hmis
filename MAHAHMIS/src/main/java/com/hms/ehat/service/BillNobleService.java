package com.hms.ehat.service;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.BillNobleDtoForOpdSponsor;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillNobleDto;
import com.hms.ehat.dto.BillNobleServiceDto;
import com.hms.ehat.dto.BillNobleServiceDto2;
import com.hms.ehat.dto.BillNobleServiceDtoForOpdSponsor;
import com.hms.ehat.dto.BillNobleServicePackageDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.PatientServiceDetail2;
import com.hms.ehat.dto.PatientSubServiceDetailsForOpdPackage;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.IpdBillDiscount;

public interface BillNobleService {
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 3_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/

	List<BillDetailsDto> getPatientsBillById(Integer treatmentId);
	List<BillNobleDto> getPatientBillAmount(Integer treatmentId, HttpServletRequest request);
	
	//**added by sagar**//
	List<RegistrationViewDto2> getPreviousTreatmentPatient(String letter, String usertype,int deptId, Integer unitId,Integer startIndex);
	//**added by sagar**//
	boolean closePatientTreatment(Integer treatmentId,HttpServletRequest request);
	
	//**added by sagar**//
		List<TreatmentDto> closeTreatmentDetailsOfPatient(Integer patientId);
		
		//@author : Sagar kadam @date: 27-Jun-2017 @reason : for prev opd records 
		List<RegTreBillDto> getAllPatientRecordsForPrevOPD(Integer deptId,String letter, Integer unitId);
	 
		//**added by sagar**//
		boolean closePatientTreatmentForIPD(Integer treatmentId,HttpServletRequest request);
		
	
	
	List<BillNobleServiceDto> getPatientServiceBill(Integer treatmentId,Integer serviceId);
	
	//sponsor wise charges 
	List<BillNobleServiceDto2> getPatientServiceBillSponsor(Integer treatmentId,
			Integer serviceId, Integer chargesSlaveId);
	
	List<PatientServiceDetail2> fetchPatientPreviousBillAmount(
			Integer treatmentId, HttpServletRequest request);
	//Opd Sponsor
	List<BillNobleDtoForOpdSponsor> fetchPatientBillAmountForOpdSponsor(
			Integer treatmentId, HttpServletRequest request);
	//Opd Sponsor separate tab
	List<BillNobleServiceDtoForOpdSponsor> getPatientServiceBillForOpdSponsor(
			Integer treatmentId, Integer serviceId);
	List<PatientSubServiceDetailsForOpdPackage> getPackagedataforOpd(Integer pSId,
			Integer pSubSId, Integer sponsorId, Integer chargesSlaveId, Integer treatmentId, Integer patientId, Integer billDetailsId);
	boolean deleteOnClickForPackageOpd(Integer billDetailsId,
			Integer otherBillDetailsId, HttpServletRequest request);
	
	//@author Bilal @date 17-aug-2017 @code for list of package billing whose combination is Y
	List<BillNobleServicePackageDto> getlistOfPackageOpd(Integer treatmentId);
	
	//@author Bilal @date 18-aug-2017 @code for converting services to package
	int convertServiceToPackage(BillDetailsDto billdetails,
			HttpServletRequest request, Integer treatmentId, String servIdsChecked, Integer billDetailsId, Integer subServiceId, Integer serviceId);
	
	//@author Bilal @date 18-aug-2017 @code for including remaining amount to package amount
	int includeInPackAmount(BillDetailsDto billdetails,
			HttpServletRequest request, Integer pSubserviceId, Integer pservId,
			Integer billDetailsId, double packamount, double totalAmtPackage, double totalRem, String receiptOf);
	
	//@author Bilal @date 21-aug-2017 @code for converting services to billing
	int convertToBillingOPD(BillDetailsDto billdetails,
			HttpServletRequest request, Integer treatmentId,
			String otherBillDetailsIdOpd, int sponsorId, int chargesSlaveId);
	List<TreatmentDto> getPrevPatdetails(Integer patientId, Integer deptId);
	
	List<IpdBillDiscount> autosuggesstionDiscApprovel(String letter,
			String usertype, Integer unitId,HttpServletRequest req);
	int giveDiscountInBilling(HttpServletRequest request, Integer treatmentId,
			Integer billId, double disc, String discBy, int indentFlag,
			int patientFlag, int otFlag, String narration);
	List<RegistrationViewDto2> getPreviousTreatmentPatientDateWiseSearch(
			Date inputFromDate, Date inputToDate,Integer deptId);
	List<TreatmentDto> getPrevPatdetailsOPD(Integer patientId, Integer deptId);

	List<RegistrationViewDto2> setSearchedPatientPrevDiagnosticTempByMobile(String letter, String usertype,int deptId, Integer unitId);
	
	Integer getprevOpdQueuePatientCount();
}
