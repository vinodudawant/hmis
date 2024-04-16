package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.dto.BillNobleDtoForOpdSponsor;
import com.hms.ehat.dao.BillNobleDao;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillNobleDto;
import com.hms.ehat.dto.BillNobleServiceDto;
import com.hms.ehat.dto.BillNobleServiceDto2;
import com.hms.ehat.dto.BillNobleServiceDtoForOpdSponsor;
import com.hms.ehat.dto.BillNobleServicePackageDto;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.PatientServiceDetail2;
import com.hms.ehat.dto.PatientSubServiceDetailsForOpdPackage;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.BillNobleService;
import com.hms.ipdbill.dto.IpdBillDiscount;

@Service
public class BillNobleServiceImpl implements BillNobleService {
	@Autowired
	BillNobleDao billNobleDao;
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
    String userAccessFlow = resourceBundleEhat.getObject("userAccessFlow").toString();
	

	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 3_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/
	@Override
	@Transactional
	public List<BillDetailsDto> getPatientsBillById(Integer treatmentId) {
		
		return billNobleDao.getPatientsBillById(treatmentId);
	}

	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 6_June_2017 
	 * @Code Fetching patient Bill details.
	 ******************************************************************************/
	@Override
	@Transactional
	public List<BillNobleDto> getPatientBillAmount(Integer treatmentId,HttpServletRequest request) {
		
		if(userAccessFlow.equalsIgnoreCase("on")){
            HttpSession session = request.getSession();
            Integer userId = (Integer) session.getAttribute("userId1");
            
            
            return billNobleDao.getPatientBillAmount(treatmentId,userId);
        }
		else{
		return billNobleDao.getPatientBillAmount(treatmentId);
		}
	}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 25_July_2017 
	 * @Code Fetching patient Bill details for Opd Sponsor.
	 ******************************************************************************/
	@Override
	@Transactional
	public List<BillNobleDtoForOpdSponsor> fetchPatientBillAmountForOpdSponsor(
			Integer treatmentId, HttpServletRequest request) {
		if(userAccessFlow.equalsIgnoreCase("on")){
            HttpSession session = request.getSession();
            Integer userId = (Integer) session.getAttribute("userId1");
            
            
            return billNobleDao.fetchPatientBillAmountForOpdSponsor(treatmentId,userId);
        }
		else{
		return billNobleDao.fetchPatientBillAmountForOpdSponsor(treatmentId);
		}
	}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 4_July_2017 
	 * @Code Fetching patient Previous Bill details.
	 ******************************************************************************/
	@Override
	@Transactional
	public List<PatientServiceDetail2> fetchPatientPreviousBillAmount(
			Integer treatmentId,HttpServletRequest request) {
		if(userAccessFlow.equalsIgnoreCase("on")){
            HttpSession session = request.getSession();
            Integer userId = (Integer) session.getAttribute("userId1");
            
            
            return billNobleDao.fetchPatientPreviousBillAmount(treatmentId,userId);
        }
		else{
			return billNobleDao.fetchPatientPreviousBillAmount(treatmentId);
		}
		
	}
	
	
	
	
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 7_June_2017 
	 * @Code Fetching patient Service details.
	 ******************************************************************************/
	@Override
	@Transactional
	public List<BillNobleServiceDto> getPatientServiceBill(Integer treatmentId,Integer serviceId) {
		// TODO Auto-generated method stub
		return billNobleDao.getPatientServiceBill(treatmentId,serviceId);
	}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 26_July_2017 
	 * @Code Fetching patient Service details Of opd Sponsor.
	 ******************************************************************************/
	
	@Override
	@Transactional
	public List<BillNobleServiceDtoForOpdSponsor> getPatientServiceBillForOpdSponsor(
			Integer treatmentId, Integer serviceId) {
		// TODO Auto-generated method stub
		return billNobleDao.getPatientServiceBillForOpdSponsor(treatmentId,serviceId);
	}
	
	
	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 25_June_2017 
	 * @Code close patient treatment
	 ******************************************************************************/
	 
	@Override
	@Transactional
	public boolean closePatientTreatment(Integer treatmentId,HttpServletRequest request) {
		
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return billNobleDao.closePatientTreatment(treatmentId,userId);
		 
	}
	
	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 27_June_2017 
	 * @Code get   treatment patient
	 ******************************************************************************/
	 
	@Override
	@Transactional
	public List<RegistrationViewDto2>  getPreviousTreatmentPatient(String letter,String usertype,int deptId, Integer unitId,Integer startIndex) {
		
		
		//HttpSession session = request.getSession();
		//Integer userId = (Integer) session.getAttribute("userId1");
		if (deptId == 2) {
			return billNobleDao.getPreviousTreatmentPatientIPD(letter, usertype, deptId, unitId);
		} else if (deptId == 3) {
			return billNobleDao.getPreviousTreatmentPatientDiagnostic(letter, usertype, deptId, unitId);
		}

		else {
			// return
			// billNobleDao.getPreviousTreatmentPatientIPD(letter,usertype,deptId,unitId);
			return billNobleDao.getPreviousTreatmentPatient(letter, usertype, deptId, unitId,startIndex);
		}
	}
	
	
	@Override
	@Transactional
	public List<RegistrationViewDto2>  getPreviousTreatmentPatientDateWiseSearch(Date inputFromDate, Date inputToDate,Integer deptId) {
		
			//return billNobleDao.getPreviousTreatmentPatientIPD(letter,usertype,deptId,unitId);
		return billNobleDao.getPreviousTreatmentPatientDateWiseSearch(inputFromDate, inputToDate, deptId);
		
	}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 06_Jan_2018 
	 * @Code this methods are used to search Discount approval
	 ******************************************************************************/
	 
	@Override
	@Transactional
	public List<IpdBillDiscount>  autosuggesstionDiscApprovel(String letter,String usertype, Integer unitId, HttpServletRequest req) {
		
		
		return billNobleDao.autosuggesstionDiscApprovel(letter,usertype,unitId,req);
		
	}
	

	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 27_June_2017 
	 * @Code Fetching patient treatment details
	 ******************************************************************************/
	@Override
	@Transactional
	public List<TreatmentDto> closeTreatmentDetailsOfPatient(Integer patientId) {
		
		return billNobleDao.closeTreatmentDetailsOfPatient(patientId);
	}
	
	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 27_June_2017 
	 * @Code Fetching patient treatment details
	 ******************************************************************************/
	@Override
	@Transactional
	public List<TreatmentDto> getPrevPatdetails(Integer patientId,Integer deptId) {
		
		return billNobleDao.getPrevPatdetails(patientId,deptId);
	}
	
	//@author : Sagar Kadam @date: 27-jun-2017 @reason : for prev opd records 

	@Override
	@Transactional
	public List<RegTreBillDto> getAllPatientRecordsForPrevOPD(Integer deptId,String letter, Integer unitId) {
		
		return billNobleDao.getAllPatientRecordsForPrevOPD(deptId,letter,unitId);
	}
	
	
	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 25_June_2017 
	 * @Code close ipd patient treatment
	 ******************************************************************************/
	 
	@Override
	@Transactional
	public boolean closePatientTreatmentForIPD(Integer treatmentId,HttpServletRequest request) {
		
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return billNobleDao.closePatientTreatmentForIPD(treatmentId,userId);
		 
	}
	
	//sponsor wise charges 
	@Override
	@Transactional
	public List<BillNobleServiceDto2> getPatientServiceBillSponsor(
			Integer treatmentId, Integer serviceId, Integer chargesSlaveId) {
		return billNobleDao.getPatientServiceBillSponsor(treatmentId,serviceId,chargesSlaveId);
	}

	//fetching packge services 
	@Override
	@Transactional
	public List<PatientSubServiceDetailsForOpdPackage> getPackagedataforOpd(Integer pSId,
			Integer pSubSId, Integer sponsorId, Integer chargesSlaveId,Integer treatmentId, Integer patientId,Integer billDetailsId) {
		return billNobleDao.getPackagedataforOpd(pSId,pSubSId,chargesSlaveId,sponsorId,treatmentId,patientId,billDetailsId);
	}

	//delete packge services 
	@Override
	@Transactional
	public boolean deleteOnClickForPackageOpd(Integer billDetailsId,
			Integer otherBillDetailsId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto = new EhatOtherBillDetailForOpdDto();
		

		billNobleDao.deleteOnClickForPackageOpd(billDetailsId,otherBillDetailsId,userId);
		return true;
	}

	/**@author   :Bilal
	 * @date     :17-Aug-2017
	 * @code     :for fetching list of package billing **/
	@Override
	@Transactional
	public List<BillNobleServicePackageDto> getlistOfPackageOpd(Integer treatmentId) {
		// TODO Auto-generated method stub
		return billNobleDao.getlistOfPackageOpd(treatmentId);
	}

	/**@author   :Bilal
	 * @date     :18-Aug-2017
	 * @code     :for converting service to package  **/
	@Override
	@Transactional
	public int convertServiceToPackage(BillDetailsDto billdetails,
			HttpServletRequest request,
			 Integer treatmentId, String servIdsChecked, 
			 Integer billDetailsId, Integer subServiceId, Integer serviceId) {
		// TODO Auto-generated method stub
		return billNobleDao.convertServiceToPackage(billdetails,request,treatmentId,servIdsChecked,
				billDetailsId,subServiceId,serviceId);
	}

	/**@author   :Bilal
	 * @date     :18-Aug-2017
	 * @code     :for including remaining amount in package amount  **/
	@Override
	@Transactional
	public int includeInPackAmount(BillDetailsDto billdetails,
			HttpServletRequest request, Integer pSubserviceId, Integer pservId,
			Integer billDetailsId, double packamount, double totalAmtPackage, double totalRem, String receiptOf) {
		
		return billNobleDao.includeInPackAmount(billdetails, request, pSubserviceId, pservId, 
				billDetailsId, packamount, totalAmtPackage, totalRem,receiptOf);
	}

	/**@author   :Bilal
	 * @date     :21-Aug-2017
	 * @code     :for converting services to billing  **/
	@Override
	@Transactional
	public int convertToBillingOPD(BillDetailsDto billdetails,
			HttpServletRequest request, Integer treatmentId,
			String otherBillDetailsIdOpd, int sponsorId, int chargesSlaveId) {
		
		return billNobleDao.convertToBillingOPD(billdetails,request,treatmentId,otherBillDetailsIdOpd, sponsorId, chargesSlaveId);
	}

	@Override
	@Transactional
	public int giveDiscountInBilling(HttpServletRequest request,
			Integer treatmentId, Integer billId, double disc, String discBy,
			int indentFlag, int patientFlag, int otFlag, String narration) {
		return billNobleDao.giveDiscountInBilling(
				request, treatmentId,billId, disc, discBy, indentFlag,patientFlag,otFlag,narration);
	}

	@Override
	@Transactional
	public List<TreatmentDto> getPrevPatdetailsOPD(Integer patientId,
			Integer deptId) {
		// TODO Auto-generated method stub
		return billNobleDao.getPrevPatdetailsOPD( patientId,
				 deptId);
	}	
	
	@Override
	@Transactional
	public List<RegistrationViewDto2>  setSearchedPatientPrevDiagnosticTempByMobile(String letter,String usertype,int deptId, Integer unitId) {
		
			return billNobleDao.setSearchedPatientPrevDiagnosticTempByMobile(letter, usertype, deptId, unitId);
		
	}
	@Override
	@Transactional
	public Integer getprevOpdQueuePatientCount() {
		// TODO Auto-generated method stub
		return billNobleDao.getprevOpdQueuePatientCount();
	}

}
