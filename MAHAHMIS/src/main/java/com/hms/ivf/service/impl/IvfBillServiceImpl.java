package com.hms.ivf.service.impl;

import java.sql.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.OpdQueManagmentViewDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ivf.dao.IVFBillDao;
import com.hms.ivf.dto.EhatViewPatientBedDetailsIvfDto;
import com.hms.ivf.dto.IvfBillDetailsDto;
import com.hms.ivf.dto.IvfBillNobleDto;
import com.hms.ivf.dto.IvfBillNobleServiceDto;
import com.hms.ivf.dto.IvfBillReceiptMasterDTO;
import com.hms.ivf.dto.IvfBillRefundMasterDTO;
import com.hms.ivf.dto.PreviousTreatmentBillDto;
import com.hms.ivf.service.IvfBillService;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.OpdQueueDto;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;

@Service
@Transactional
public class IvfBillServiceImpl implements IvfBillService{

	@Autowired
	IVFBillDao ivfdao;	
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
    String userAccessFlow = resourceBundleEhat.getObject("userAccessFlow").toString();
	
	@Override
	public OpdQueueDto getAllIvfQueuePatient(OpdQueueDto objDto) {	
		
		return ivfdao.getAllIvfQueuePatient(objDto);
	}
	
	@Override
	public PatientHeaderInfoDto getPatientInfoByTreatmentId(PatientHeaderInfoDto objDto) {	
		
		return ivfdao.getPatientInfoByTreatmentId(objDto);
	}
	
	@Override
	public PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto) {
		
		return ivfdao.getPatientServiceDetails(objDto);
	}

	@Override
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto) {
		
		return ivfdao.getPatientSubServiceDetails(objDto);
	}

	@Override
	public PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto) {
		
		return ivfdao.getPatientPackageDetails(objDto);
	}

	@Override
	public BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto) {
		
		return ivfdao.getAllAmountDetails(objDto);
	}
	
	@Override
	public PreviousTreatmentBillDto getPreviousTreatmentPatient(PreviousTreatmentBillDto objDto) {
		
		return ivfdao.getPreviousTreatmentPatient(objDto);
	}
	
	@Override
	public TreatmentDto getPrevPatdetails(Integer patientId) {
		
		return ivfdao.getPrevPatdetails(patientId);
	}
	
	//Modify by Vinod Udawant on 31-march-2021 for IVF OPDQueue Patients and Queue Management.
	@Override
	@Transactional
	public OpdQueManagmentViewDto getAllOpdRecordsDeptwiseWithAuto(Integer deptId,String letter,String usertype, Integer unitId) {
		
		return ivfdao.getAllOpdRecordsDeptwiseWithAuto(deptId,letter,usertype, unitId);
	}
	
	@Override
	@Transactional
	public int savecpoe(IvfBillDetailsDto billDetailsDto,HttpServletRequest request, String queryType) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1"); // current login user id
		String usertype= (String)session.getAttribute("userType");
		String a=billDetailsDto.getCallfrom();		
		Integer sponsorId= billDetailsDto.getSponsorId();
		Integer chargesSlaveId= billDetailsDto.getChargesSlaveId();
		String iscombination =billDetailsDto.getIscombination();
		
		if (queryType.equalsIgnoreCase("insert")) { //To Insert Record

			billDetailsDto.setCreatedBy(userId);	
			billDetailsDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsDto.setDeleted("N");
			
			if(billDetailsDto.getSndToLabFlag().equals(null) || billDetailsDto.getSndToLabFlag()==null)	{
				
				billDetailsDto.setSndToLabFlag("N");
			}
			
			if (a.equals("reciept") || a.equals("addToOPDreciept")) {
				
				billDetailsDto.setPaidFlag("Y");
			}
			
			if(billDetailsDto.getDoctorId()==0){
				
				if(usertype.equalsIgnoreCase("doctor") ||usertype.equalsIgnoreCase("Doctor") ||usertype.equalsIgnoreCase("Dr")||usertype.equalsIgnoreCase("dr")) {
					 
					billDetailsDto.setDoctorId(userId);
				}
			}
			
		} else if (queryType.equalsIgnoreCase("update")) { // To Update Record

			billDetailsDto.setUpdatedBy(userId);
			billDetailsDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsDto.setDeleted("N");
			billDetailsDto.setAccountStatusOpdDiagno("N");
			
			if (a.equals("reciept") || a.equals("addToOPDreciept")) {
				
				billDetailsDto.setPaidFlag("Y");
			}
			
            if(billDetailsDto.getDoctorId()==0){
				
				if(usertype.equalsIgnoreCase("doctor") || usertype.equalsIgnoreCase("Doctor") || usertype.equalsIgnoreCase("Dr")|| usertype.equalsIgnoreCase("dr"))	{
					 
					billDetailsDto.setDoctorId(userId);					
				}			
			}
		}
		
		if(iscombination.equals("Y")) {
			
			return ivfdao.saveToOtherBilling(billDetailsDto, queryType, sponsorId, chargesSlaveId, a, request);
			
		} else {
			
			return ivfdao.savecpoe(billDetailsDto, queryType);
		}		
	}
	
	@Override
	@Transactional
	public List<IvfBillNobleDto> getPatientBillAmount(Integer treatmentId,HttpServletRequest request) {
		
		if(userAccessFlow.equalsIgnoreCase("on")){
            
			HttpSession session = request.getSession();
            Integer userId = (Integer) session.getAttribute("userId1");
            return ivfdao.getPatientBillAmount(treatmentId,userId);
        }else{
			return ivfdao.getPatientBillAmount(treatmentId);
		}
	}
	
	@Override
	@Transactional
	public List<IvfBillNobleServiceDto> getPatientServiceBill(Integer treatmentId,Integer serviceId) {
		// TODO Auto-generated method stub
		return ivfdao.getPatientServiceBill(treatmentId,serviceId);
	}
	
	@Override
	@Transactional
	public BillDetailsDto getTotalPayable(BillDetailsDto billRecMaster,String callFrom){
		
		return ivfdao.getTotalPayable(billRecMaster,callFrom);	
	}
	
	@Override
	@Transactional
	public BillReceiptMasterDTO fetchAllReceiptTotals(BillReceiptMasterDTO obj,
			String callFrom) {
		
		return ivfdao.fetchAllIvfReceiptTotals(obj,callFrom);
	}
	
	@Override
	@Transactional
	public Integer saveBillDetails(String masterIdsChecked,String servIdsChecked,Integer refDocId,IvfBillReceiptMasterDTO billRecMaster,String multiPayDetails){
		
		return ivfdao.saveBillDetails(masterIdsChecked,servIdsChecked,refDocId,billRecMaster,multiPayDetails);
	}
		
	@Override
	@Transactional
	public Integer saveRefundBillDetails(String servIdsChecked,Integer refDocId,IvfBillReceiptMasterDTO billRecMaster){
		
		return ivfdao.saveRefundBillDetails(servIdsChecked,refDocId,billRecMaster);
	}
	
	@Override
	@Transactional
	public IvfBillReceiptMasterDTO getBillReceiptDetails(IvfBillReceiptMasterDTO billRecMaster,String callFrom){
		
		return ivfdao.getBillReceiptDetails(billRecMaster,callFrom);		
	}
	
	@Override
	@Transactional
	public IvfBillRefundMasterDTO getBillRefundDetails(IvfBillRefundMasterDTO billRecMaster,String callFrom){
		
		return ivfdao.getBillRefundDetails(billRecMaster,callFrom);		
	}
	
	@Override
	@Transactional
	public int deleteMasterReceiptOPD(Integer recId, HttpServletRequest request) {
		
		return ivfdao.deleteMasterReceiptOPD(recId ,request);
	}
	@Override
	@Transactional
	public List<EhatViewPatientBedDetailsIvfDto> getIvfPatientBedBill(
			Integer treatmentId, Integer serviceId) {
		// TODO Auto-generated method stub
		return ivfdao.getIvfPatientBedBill(treatmentId,serviceId);
	}
	
	@Override
	@Transactional
	public int closeIVFPatientTreatment(Integer treatmentId, Integer userId,Integer ivfTreatId,Integer patientId) {
		
		return ivfdao.closeIVFPatientTreatment(treatmentId, userId,ivfTreatId, patientId);
	}

	@Override
	public int getIvfTreatIdByNormalTreatmentId(Integer treatmentId) {
		// TODO Auto-generated method stub
		return ivfdao.getIvfTreatIdByNormalTreatmentId(treatmentId);
	}
}
