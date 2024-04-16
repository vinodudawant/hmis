package com.hms.ehat.service.impl;

import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.OtherBillingDao;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillNobleDto;
import com.hms.ehat.dto.EhatOtherBillDetailForIpdDto;
import com.hms.ehat.dto.OtherBillReceiptMasterDTO;
import com.hms.ehat.dto.OtherBillRefundMasterDTO;
import com.hms.ehat.dto.OtherBillingDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationOtherDto;
import com.hms.ehat.service.OtherBillingService;
import com.hms.ipdbill.dao.IpdBillDao;

@Service
public class OtherBillingServiceImpl implements OtherBillingService {
	
	@Autowired
	OtherBillingDao otherBillingDao;
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
    String userAccessFlow = resourceBundleEhat.getObject("userAccessFlow").toString();

	@Override
	@Transactional
	public int saveOtherBilling(OtherBillingDto otherBillingDto,
			HttpServletRequest request, String queryType) {
		
		return otherBillingDao.saveOtherBilling(otherBillingDto, request, queryType);

	}



	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 6_June_2017 
	 * @Code Fetching patient Bill details.
	 ******************************************************************************/
	@Override
	@Transactional
	public List<OtherBillingDto> fetchPatientBillAmountOther(
			Integer treatmentId, HttpServletRequest request) {
		
		if(userAccessFlow.equalsIgnoreCase("on")){
            HttpSession session = request.getSession();
            Integer userId = (Integer) session.getAttribute("userId1");
            
            
            return otherBillingDao.fetchPatientBillAmountOther(treatmentId,userId);
        }
		else{
		return otherBillingDao.fetchPatientBillAmountOther(treatmentId);
		}
	}
	
	@Override
	@Transactional
	public int deleteservdetailsOther(String labservicelist, String callform, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		OtherBillingDto otherBillingDto = new OtherBillingDto();
		
		otherBillingDto.setDeletedBy(userId);
		return otherBillingDao.deleteservdetailsOther( labservicelist,userId,callform);
	}

	// @author :Sagar @date: 14-july-2017 @reason : To Fetch Records List
			@Override
			@Transactional
			public RegistrationOtherDto getAllRecordsForOPDque1ToOther(Integer deptid) {
				return otherBillingDao.getAllRecordsForOPDque1ToOther(deptid);
			}



			@Override
			@Transactional
			public List<RegistrationOtherDto> getPatientDataByPatientIdOther(
					Integer patientId) {
				// TODO Auto-generated method stub
				return otherBillingDao.getPatientDataByPatientIdOther(patientId);
			}
			
	
			@Override
			@Transactional
			public RegistrationOtherDto getOtherBillingRecordsAuto(
					Integer deptId, String letter, String usertype) {
				return otherBillingDao.getOtherBillingRecordsAuto(deptId,letter,usertype);
				
			}



	@Override
	@Transactional
	public Integer saveOtherBillDetails(String masterIdsChecked,
			String servIdsChecked, Integer refDocId,
			OtherBillReceiptMasterDTO billRecMaster,
			String multiPayDetails) {
		return otherBillingDao.saveOtherBillDetails(masterIdsChecked,servIdsChecked,refDocId,billRecMaster,multiPayDetails);		
	}

	@Override
	@Transactional
	public OtherBillReceiptMasterDTO fetchAllReceiptTotals(
			OtherBillReceiptMasterDTO obj, String callFrom) {
		
		return otherBillingDao.fetchAllReceiptTotals(obj,callFrom);
	}

	@Override
	@Transactional
	public OtherBillReceiptMasterDTO getBillReceiptDetails(
			OtherBillReceiptMasterDTO billRecMaster, String callFrom) {
		
		return otherBillingDao.getBillReceiptDetails(billRecMaster,callFrom);		
	}

	@Override
	@Transactional
	public OtherBillingDto getTotalPayable(OtherBillingDto billRecMaster,
			String callFrom) {
		return otherBillingDao.getTotalPayable(billRecMaster,callFrom);	
	}

	@Override
	@Transactional
	public Integer saveRefundBillDetails(String servIdsChecked,
			Integer refDocId, OtherBillReceiptMasterDTO billRecMaster) {
		
		return otherBillingDao.saveRefundBillDetails(servIdsChecked,refDocId,billRecMaster);
	}

	@Override
	@Transactional
	public OtherBillRefundMasterDTO getBillRefundDetails(
			OtherBillRefundMasterDTO billRecMaster, String callFrom) {
		
		return otherBillingDao.getBillRefundDetails(billRecMaster,callFrom);
	}
	
	@Override
	@Transactional
	public int getAppointPatientId(Integer appId){
		
		return otherBillingDao.getAppointPatientId(appId);
	}
}
