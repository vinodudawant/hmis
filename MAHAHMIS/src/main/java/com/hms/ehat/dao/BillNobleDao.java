package com.hms.ehat.dao;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.BillNobleDtoForOpdSponsor;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillNobleDto;
import com.hms.ehat.dto.BillNobleServiceDto;
import com.hms.ehat.dto.BillNobleServiceDto2;
import com.hms.ehat.dto.BillNobleServiceDtoForOpdSponsor;
import com.hms.ehat.dto.BillNobleServicePackageDto;
import com.hms.ehat.dto.PatientServiceDetail2;
import com.hms.ehat.dto.PatientSubServiceDetailsForOpdPackage;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.IpdBillDiscount;

public interface BillNobleDao {
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 3_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/

	List<BillDetailsDto> getPatientsBillById(Integer patientId);

	List<BillNobleDto> getPatientBillAmount(Integer treatmentId);
	
	//** Added by sagar**//
	boolean closePatientTreatment(Integer treatmentId,Integer userId);
	//** Added by sagar**//
	List<RegistrationViewDto2> getPreviousTreatmentPatient(String letter, String usertype,int deptId, Integer unitId,Integer startIndex);
	//** Added by sagar**//
	List<TreatmentDto> 	closeTreatmentDetailsOfPatient(Integer patientId);
	
	//@author : Sagar Kadam @date: 16-Jun-2017 @reason : For prev opd
	List<RegTreBillDto> getAllPatientRecordsForPrevOPD(Integer doctorId,String letter, Integer unitId);

	//** Added by sagar**//
		boolean closePatientTreatmentForIPD(Integer treatmentId,Integer userId);
	
	
	List<BillNobleServiceDto> getPatientServiceBill(Integer treatmentId,Integer serviceId);

	List<BillNobleServiceDto2> getPatientServiceBillSponsor(Integer treatmentId,
			Integer serviceId, Integer chargesSlaveId);

	List<PatientServiceDetail2> fetchPatientPreviousBillAmount(
			Integer treatmentId);

	List<BillNobleDto> getPatientBillAmount(Integer treatmentId,
			int userId);

	List<PatientServiceDetail2> fetchPatientPreviousBillAmount(
			Integer treatmentId, Integer userId);

	List<BillNobleDtoForOpdSponsor> fetchPatientBillAmountForOpdSponsor(
			Integer treatmentId);

	List<BillNobleDtoForOpdSponsor> fetchPatientBillAmountForOpdSponsor(
			Integer treatmentId, Integer userId);

	List<BillNobleServiceDtoForOpdSponsor> getPatientServiceBillForOpdSponsor(
			Integer treatmentId, Integer serviceId);

	List<PatientSubServiceDetailsForOpdPackage> getPackagedataforOpd(Integer pSId,
			Integer pSubSId, Integer chargesSlaveId, Integer sponsorId, Integer treatmentId, Integer patientId, Integer billDetailsId);

	boolean deleteOnClickForPackageOpd(Integer billDetailsId,
			Integer otherBillDetailsId, Integer userId);
	
	//@author Bilal @date 17-aug-2017 @code for list of package billing whose combination is Y
	List<BillNobleServicePackageDto> getlistOfPackageOpd(Integer treatmentId);

	//@author Bilal @date 18-aug-2017 @code for converting services to package
	int convertServiceToPackage(BillDetailsDto billdetails,
			HttpServletRequest request, Integer treatmentId,
			String servIdsChecked, Integer billDetailsId,
			Integer subServiceId, Integer serviceId);

	//@author Bilal @date 18-aug-2017 @code for including remaining amount in package amount
	int includeInPackAmount(BillDetailsDto billdetails,
			HttpServletRequest request, Integer pSubserviceId, Integer pservId,
			Integer billDetailsId, double packamount, double totalAmtPackage, double totalRem, String receiptOf);

	//@author Bilal @date 21-aug-2017 @code for converting services to billing
	int convertToBillingOPD(BillDetailsDto billdetails,
			HttpServletRequest request, Integer treatmentId,
			String otherBillDetailsIdOpd, int sponsorId, int chargesSlaveId);

	List<TreatmentDto> getPrevPatdetails(Integer patientId, Integer deptId);

	List<RegistrationViewDto2> getPreviousTreatmentPatientIPD(String letter,
			String usertype, int deptId, Integer unitId);
	
	List<RegistrationViewDto2> getPreviousTreatmentPatientDiagnostic(String letter,
			String usertype, int deptId, Integer unitId);

	List<IpdBillDiscount> autosuggesstionDiscApprovel(String letter,
			String usertype, Integer unitId, HttpServletRequest req);

	int giveDiscountInBilling(HttpServletRequest request, Integer treatmentId,
			Integer billId, double disc, String discBy, int indentFlag,
			int patientFlag, int otFlag, String narration);

	List<RegistrationViewDto2> getPreviousTreatmentPatientDateWiseSearch(
			Date inputFromDate, Date inputToDate,Integer deptId);

	List<TreatmentDto> getPrevPatdetailsOPD(Integer patientId, Integer deptId);

	
	List<RegistrationViewDto2> setSearchedPatientPrevDiagnosticTempByMobile(String letter,String usertype, int deptId, Integer unitId);

	Integer getprevOpdQueuePatientCount();
	

	
	

}
