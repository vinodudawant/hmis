package com.hms.ehat.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.dto.DoctorRoundReport;
import com.hms.dto.LabProfile;
import com.hms.dto.RadiologyTemplateReportDTO;
import com.hms.dto.RisImageUploadDTO;
import com.hms.dto.Treatment;
import com.hms.ehat.controller.CpoeIPDdetails;
import com.hms.ehat.dao.DoctorDeskDao;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.CpoeOTdetails;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.EhatComplaintFindingDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.SubObjTemplateDto;
import com.hms.ipd.dto.DoctorRoundDTO;


@Service
public class DoctorDeskServiceimpl implements DoctorDeskService{

	@Autowired
	DoctorDeskDao Doctordeskao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	
	
	@Override
	@Transactional
	public int savecpoe(BillDetailsDto billDetailsDto,
			HttpServletRequest request, String queryType, String module) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current login user id
		String usertype= (String)session.getAttribute("userType");
		String a=billDetailsDto.getCallfrom();
		
		Integer sponsorId= billDetailsDto.getSponsorId();
		Integer chargesSlaveId= billDetailsDto.getChargesSlaveId();
		String iscombination =billDetailsDto.getIscombination();
		int subId = billDetailsDto.getSubServiceId();
		
		/*SubServiceDto obje = (SubServiceDto) sessionFactory
				.getCurrentSession().get(
						SubServiceDto.class,
						subId);
		iscombination =obje.getIscombination();
		*/
		//System.err.println("usertype isss=="+ usertype);
		if (queryType.equalsIgnoreCase("insert")) { // To Insert Record

			billDetailsDto.setCreatedBy(userId);	
			billDetailsDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsDto.setDeleted("N");
			
			if(billDetailsDto.getSndToLabFlag().equals(null) || billDetailsDto.getSndToLabFlag()==null)
			{
				billDetailsDto.setSndToLabFlag("N");
			}
			
			if (a.equals("reciept") || a.equals("addToOPDreciept")) {
				billDetailsDto.setPaidFlag("Y");
			}
			
			if(billDetailsDto.getDoctorId()==0){
				
				if(usertype.equalsIgnoreCase("doctor") ||usertype.equalsIgnoreCase("Doctor") ||usertype.equalsIgnoreCase("Dr")||usertype.equalsIgnoreCase("dr"))
				{
					 billDetailsDto.setDoctorId(userId);
					
				}
				
				
				
			}
			
			

		} else if (queryType.equalsIgnoreCase("update")) {// To Update Record

			billDetailsDto.setUpdatedBy(userId);
			billDetailsDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsDto.setDeleted("N");
			billDetailsDto.setAccountStatusOpdDiagno("N");
			
			if (a.equals("reciept") || a.equals("addToOPDreciept")) {
				billDetailsDto.setPaidFlag("Y");
			}
			
            if(billDetailsDto.getDoctorId()==0){
				
				if(usertype.equalsIgnoreCase("doctor") ||usertype.equalsIgnoreCase("Doctor") ||usertype.equalsIgnoreCase("Dr")||usertype.equalsIgnoreCase("dr"))
				{
					 billDetailsDto.setDoctorId(userId);
					
				}
				
				
				
			}

		}
		
		if(iscombination.equals("Y")){
			
			
			
			return Doctordeskao.saveToOtherBilling(billDetailsDto, queryType,
					sponsorId, chargesSlaveId, a,request);
			
		} else {
			return Doctordeskao.savecpoe(billDetailsDto, queryType, module);
		}
		
		
	}
	@Override
	@Transactional
	public List<CpoeServdetails> getlistbiil(Integer pID, String callform,Integer servid,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.getlistbiil(pID, callform,servid);
	}
	
	@Override
	@Transactional
	public int deleteservdetails(String labservicelist, String callform, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		BillDetailsDto billDetailsDto = new BillDetailsDto();
		
		billDetailsDto.setDeletedBy(userId);
		return Doctordeskao.deleteservdetails( labservicelist,userId,callform);
	}
	@Override
	@Transactional
	public int deleteServices(String servId, String tretId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		// TODO Auto-generated method stub
		return Doctordeskao.deleteServices(servId, tretId,userId);
		
	}
	@Override
	@Transactional
	public int cancleServices(String servId, String tretId,String cancleType,String remarkcanceltest,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		// TODO Auto-generated method stub
		return Doctordeskao.cancleServices(servId, tretId,cancleType,userId,remarkcanceltest);
		
	}
	@Override
	@Transactional
	public int saveIpd(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request, String queryType, String module) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current login user id
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String ipdTestSendToLab = resourceBundleEhat.getObject("ipdTestSendToLab").toString();
		
		String a=billDetailsIpdDto.getCallfrom();
		
		Integer sponsorId      = billDetailsIpdDto.getSponsorId();
		Integer chargesSlaveId = billDetailsIpdDto.getChargesSlaveId();
		String iscombination   =billDetailsIpdDto.getIscombination();
		/*SubServiceDto obj = (SubServiceDto) SessionFactory
				.getCurrentSession().get(
						SubServiceDto.class,
						billDetailsIpdDto.getSubServiceId());*/
		if (queryType.equalsIgnoreCase("insert")) { // To Insert Record

			billDetailsIpdDto.setCreatedBy(userId);	
			billDetailsIpdDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsIpdDto.setDeleted("N");
			
			if((billDetailsIpdDto.getServiceId())==11 || (billDetailsIpdDto.getServiceId())==13)
			{
				//Update sndToLab flag when ipdTestSendToLab flow is on.
				if(ipdTestSendToLab.equalsIgnoreCase("on")){
					billDetailsIpdDto.setSndToLabFlag("Y");
				}else{
					billDetailsIpdDto.setSndToLabFlag("N");
				}
			}else if((billDetailsIpdDto.getServiceId())==12){
				//billDetailsIpdDto.setSendToRisFlag("Y");
				billDetailsIpdDto.setSendToRisFlag("N");
			}
			
			
			if (a.equals("recieptIPD") || a.equals("addToIPDreciept") ) {
				billDetailsIpdDto.setPaidFlag("Y");
			}

		} else if (queryType.equalsIgnoreCase("update")) {// To Update Record
			//billDetailsIpdDto.setDrdeskflag(billDetailsIpdDto.getDrdeskflag());
			//billDetailsIpdDto.setCreatedDateTime(null);
			try {
				
				BillDetailsIpdDto billDetailsIpdDto2 = (BillDetailsIpdDto) sessionFactory.getCurrentSession().
						get(BillDetailsIpdDto.class, billDetailsIpdDto.getBillDetailsId());
				if(billDetailsIpdDto2!=null)
					billDetailsIpdDto.setCreatedDateTime(billDetailsIpdDto2.getCreatedDateTime());
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			
			billDetailsIpdDto.setUpdatedBy(userId);
			billDetailsIpdDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsIpdDto.setDeleted("N");
			billDetailsIpdDto.setEmrPer(0.0);
			billDetailsIpdDto.setAccountStatusIpd("N");
			
			if (a.equals("recieptIPD") || a.equals("addToIPDreciept")) {
				billDetailsIpdDto.setPaidFlag("Y");
			}
		}
		
		if (iscombination.equals("Y")) {
			return Doctordeskao.saveToOtherBillingIpd(billDetailsIpdDto, queryType,
					sponsorId, chargesSlaveId,a,request);
		}else{
			return Doctordeskao.saveIpd(billDetailsIpdDto, queryType, module);
		}
		
		
	}
	
	@Override
	@Transactional
	public int addPathologyPackageFromIpdBilling(BillDetailsIpdDto billDetailsDto,HttpServletRequest request, 
			String queryType, String module,String sampleWiseBarcodes) {
		
		return Doctordeskao.addPathologyPackageFromIpdBilling(billDetailsDto,request, queryType, module, sampleWiseBarcodes);
	}
	
	@Override
	@Transactional
	public int deletesIpdSrvDetails(String labservicelist,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		BillDetailsIpdDto billDetailsIpdDto = new BillDetailsIpdDto();
		
		billDetailsIpdDto.setDeletedBy(userId);
		return Doctordeskao.deletesIpdSrvDetails(labservicelist,userId);
	}
	@Override
	@Transactional
	public int deleteIpdServices(String servId, String tretId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		// TODO Auto-generated method stub
		return Doctordeskao.deleteIpdServices(servId, tretId,userId);
	}
	
	@Override
	@Transactional
	public int cancleIpdServices(String servId, String tretId,
			String cancleType,String remarkcanceltest, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		// TODO Auto-generated method stub
		return Doctordeskao.cancleIpdServices(servId, tretId,cancleType,userId,remarkcanceltest);
	
	}
	
	@Override
	@Transactional
	public int savecpoeOT(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request, String queryType ,String callfrom) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current login user id
		String usertype= (String)session.getAttribute("userType");
		System.err.println("usertype isss=="+ usertype);
		Integer sponsorId= billDetailsIpdDto.getSponsorId();
		Integer chargesSlaveId= billDetailsIpdDto.getChargesSlaveId();
		String iscombination =billDetailsIpdDto.getIscombination();
		System.err.println("iscombination Vikas "+iscombination);
		String a=billDetailsIpdDto.getCallfrom();
		
		if (queryType.equalsIgnoreCase("insert")) { // To Insert Record

			billDetailsIpdDto.setCreatedBy(userId);	
			billDetailsIpdDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsIpdDto.setDeleted("N");
			
			if(billDetailsIpdDto.getSndToLabFlag().equals(null) || billDetailsIpdDto.getSndToLabFlag()==null)
			{
				billDetailsIpdDto.setSndToLabFlag("N");
			}
			
            if(billDetailsIpdDto.getDoctorId()==0){
				
				if(usertype.equalsIgnoreCase("doctor") ||usertype.equalsIgnoreCase("Doctor") ||usertype.equalsIgnoreCase("Dr")||usertype.equalsIgnoreCase("dr"))
				{
					billDetailsIpdDto.setDoctorId(userId);
					
				}
				
				
				
			}

		} else if (queryType.equalsIgnoreCase("update")) {// To Update Record

			billDetailsIpdDto.setUpdatedBy(userId);
			billDetailsIpdDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsIpdDto.setDeleted("N");
			
			if(billDetailsIpdDto.getSndToLabFlag().equals(null) || billDetailsIpdDto.getSndToLabFlag()==null)
			{
				billDetailsIpdDto.setSndToLabFlag("N");
			}
			
			 if(billDetailsIpdDto.getDoctorId()==0){
					
					if(usertype.equalsIgnoreCase("doctor") ||usertype.equalsIgnoreCase("Doctor") ||usertype.equalsIgnoreCase("Dr")||usertype.equalsIgnoreCase("dr"))
					{
						billDetailsIpdDto.setDoctorId(userId);
						
					}		
					
				}

		}
		
		if (iscombination.equals("Y")) {
			return Doctordeskao.saveToOtherBillingIpd(billDetailsIpdDto, queryType,
					sponsorId, chargesSlaveId,a,request);
		}else{
			return Doctordeskao.savecpoeOT(billDetailsIpdDto, queryType, callfrom);
		}
		
		
	}
	@Override
	@Transactional
	public List<CpoeOTdetails> getlistservciesotcope(Integer tID,
			String callform, HttpServletRequest request ,Integer treatmentoperationid) {
		// TODO Auto-generated method stub
		return Doctordeskao.getlistservciesotcope(tID,callform ,treatmentoperationid);
	}
	
	/**
	 * @author Bilal
	 * @date 03-JUNLY-2017
	 * @code for update reciept
	 * , Integer billDetailsId**/
	@Override
	@Transactional
	public int updateOPDrecipt(BillDetailsDto billDetailsDto,
			HttpServletRequest request, String queryType) {
		
		return Doctordeskao.updateOPDrecipt( billDetailsDto,
				 request,  queryType);
	}
	@Override
	@Transactional
	public List<CpoeIPDdetails> getlistservciesipdcope(Integer tID,
			String callform, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.getlistservciesipdcope( tID,
				 callform);
	}
	
	/**
	 * @author Bilal
	 * @date 05-JUNLY-2017
	 * @code for update receipt
	 * IPD**/
	@Override
	@Transactional
	public int updateOPDreciptIPD(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request, String queryType) {
		return Doctordeskao.updateOPDreciptIPD( billDetailsIpdDto,
				 request,  queryType);
	}
	
	/**
	 * @author Bilal
	 * @date 05-JUNLY-2017
	 * @code for save new service to receipt
	 * OPD**/
	@Override
	@Transactional
	public int saveNewSer(BillDetailsDto billDetailsDto,
			HttpServletRequest request, String queryType) {
		
		return Doctordeskao.saveNewSer(billDetailsDto , request , queryType);
	}
	/**
	 * @author Bilal
	 * @date 05-JUNLY-2017
	 * @code for save new service to receipt
	 * IPD**/
	@Override
	@Transactional
	public int saveNewToIPD(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request, String queryType) {
		
		return Doctordeskao.saveNewToIPD(billDetailsIpdDto , request , queryType);
	}
	
	/**
	 * @author Bilal
	 * @date 10-JUNLY-2017
	 * @code for delete service from receipt
	 * oPD**/
	@Override
	@Transactional
	public int deleteReceiptOfOPD(Integer slaveId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.deleteReceiptOfOPD(slaveId,request);
	}
	
	/**
	 * @author Bilal
	 * @date 17-JUNLY-2017
	 * @code for delete service from receipt
	 * IPD**/
	@Override
	@Transactional
	public int deleteOnClickForRecieptIPD(Integer billRecSlaveId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.deleteOnClickForRecieptIPD(billRecSlaveId , request);
	}
	
	
	/**
	 * @author Bilal
	 * @date 21-JUNLY-2017
	 * @code for delete master receipt or main receipt of OPD
	 * OPD**/
	@Override
	@Transactional
	public int deleteMasterReceiptOPD(Integer recId,String deleteRemark, HttpServletRequest request) {
		
		return Doctordeskao.deleteMasterReceiptOPD(recId ,deleteRemark, request);
	}
	
	/**
	 * @author Bilal
	 * @date 21-JUNLY-2017
	 * @code for reset master receipt or main receipt of OPD
	 * OPD**/
	@Override
	@Transactional
	public int resetMasterReceiptOPD(Integer recId, HttpServletRequest request) {
		
		return Doctordeskao.resetMasterReceiptOPD(recId, request);
	}
	
	/**
	 * @author Bilal
	 * @date 24-JUNLY-2017
	 * @code for delete master receipt or main receipt of IPD
	 *IPD**/
	@Override
	@Transactional
	public int deleteMasterReceiptIPD(Integer recId,String deleteRemark,	 HttpServletRequest request) {
		
		return Doctordeskao.deleteMasterReceiptIPD(recId , deleteRemark,	request);
	}
	
	/**
	 * @author Bilal
	 * @date  24-JUNLY-2017
	 * @code  for reset master receipt or main receipt of IPD
	 * OPD**/
	@Override
	@Transactional
	public int resetMasterReceiptIPD(Integer recId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.resetMasterReceiptIPD(recId, request);
	}
	
	/**
	 * @author Bilal
	 * @date 9-August-2017
	 * @code  for save data of package billing
	 * OPD**/
	@Override
	@Transactional
	public int savePackageOpd(
			EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto,
			HttpServletRequest request, String queryType, String callfrom ) {
		
		//String a=billDetailsDto.getCallfrom();		
		//Integer sponsorId= billDetailsDto.getSponsorId();
		//Integer chargesSlaveId= billDetailsDto.getChargesSlaveId();
		//String iscombination =billDetailsDto.getIscombination();
		
		//Integer sponsorId= 1;
		//Integer chargesSlaveId= 8;
		
		//String iscombination ="Y";
	/*	System.err.println("combinationnnn====>>"+iscombination);
			if(iscombination.equals("Y")){
			
			return Doctordeskao.saveToOtherBilling(billDetailsDto, queryType,
					sponsorId, chargesSlaveId, a);
			
		} else {*/
			
			return Doctordeskao.savePackageOpd(ehatOtherBillDetailForOpdDto, request, queryType, callfrom);
		//}
		
		
		
		
	}
	
	/**
	 * @author    :Bilal
	 * @date      :16-August-2017
	 * @code      :for cancle services of package billing OPD
	 * **/
	@Override
	@Transactional
	public int cancleOPDPackageSer(Integer otherBillDetailsId,
			String cancleType, HttpServletRequest request) {
		
		return Doctordeskao.cancleOPDPackageSer(otherBillDetailsId,cancleType,request);
	}
	
	/**
	 * @author    :Bilal
	 * @date      :16-August-2017
	 * @code      :for cancle services of package billing IPD
	 * **/
	@Override
	@Transactional
	public int cancleIPDPackageSer(Integer otherBillDetailsId,
			String cancleType, HttpServletRequest request) {
		
		return Doctordeskao.cancleIPDPackageSer(otherBillDetailsId,cancleType,request);
	}
	@Override
	@Transactional
	public CpoeServdetails fetchlabbilldetails(Integer tID,
			String callform,Integer deptId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.fetchlabbilldetails(tID, callform, deptId);
	}
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public List<LabProfile> fetchLabTestResult(Integer testmasterId, Integer labReqSlvId,Integer subSerId,
			Integer tretId,String isPackageFlag,String callfrom) {
		List<LabProfile> arrLabTest=new ArrayList<LabProfile>();
		if(callfrom.equalsIgnoreCase("labindiv")){
			arrLabTest = Doctordeskao.fetchLabTestResult(testmasterId, labReqSlvId, subSerId, tretId);
		}else if(callfrom.equalsIgnoreCase("viewbtn")){
		 arrLabTest = Doctordeskao.fetchLabTestResult(tretId, callfrom);
		}else if(callfrom.equalsIgnoreCase("labonclick")){
			arrLabTest = Doctordeskao.fetchLabTestResultOnClick(testmasterId, labReqSlvId, subSerId, tretId, isPackageFlag);
		}else if(callfrom.equalsIgnoreCase("autodischargesum")){//For AutoDischargeSummaryPrint
			arrLabTest = Doctordeskao.fetchLabTestResult(tretId, callfrom);
		}
		return arrLabTest;
	}
	@Override
	@Transactional
	public CpoeIPDdetails fetchIpdCoversheetLab(Integer tID, String callform
			,Integer deptId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.fetchIpdCoversheetLab(tID, callform, deptId);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public List<LabProfile> compareLabTestResult(String callfrom,
			Integer tretId, Integer patientId) {
		// TODO Auto-generated method stub
		return Doctordeskao.compareLabTestResult(callfrom, tretId, patientId);
	}
	@Override
	@Transactional
	public int deleteom(String opId, String callform, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.deleteom( opId,  callform,  request);
	}
	
	/*@Override
	@Transactional
	public int saveComplaintFinding(int pId, int treatId, EhatComplaintFindingDto checkAnswer,
			String type, String queryType, HttpServletRequest request) {

		return Doctordeskao.saveComplaintFinding(pId, treatId, checkAnswer,
				 type, queryType, request);
	}*/
	@Override
	@Transactional
	public List<EhatComplaintFindingDto> fetchComplaintFinding(Integer pId, Integer treatId,
			Integer emrId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.fetchComplaintFinding(pId, treatId, emrId, request);
	}
	@Override
	@Transactional
	public SubObjTemplateDto fetchSubObjTemplate(Integer bodyPart,
			Integer speciality, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.fetchSubObjTemplate(bodyPart, speciality,request);
	}
	/*@Override
	@Transactional
	public QuestionMasterDto setOncoEmrTemplates(Integer selDocSpec,
			Integer bodyPart, Integer tempId, Integer pId, Integer treatId,
			Integer emrId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.setOncoEmrTemplates(selDocSpec, bodyPart, tempId, pId, treatId, emrId, request);
	}*/
	/*@Override
	@Transactional
	public int saveEmrQueAns(List<EhatEMRPatientTemplate> ehatEMRPatientTemplates,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.saveEmrQueAns(ehatEMRPatientTemplates, request);
	}*/
	/*@Override
	@Transactional
	public EhatEMRPatientTemplate fetchEMRTemplate(Integer pId,
			Integer treatId, Integer emrId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.fetchEMRTemplate(pId, treatId, emrId, request);
	}*/
	@Override
	@Transactional
	public int OpdCpoeSendToLab(BillDetailsDto billDetailsDto, String subList,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.OpdCpoeSendToLab(billDetailsDto, subList, request);
	}
	
	@Override
	@Transactional
	public int IpdCpoeSendToLab(BillDetailsIpdDto billDetailsIpdDto,
			String subList, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.IpdCpoeSendToLab(billDetailsIpdDto, subList, request);
	}
	
	@Override
	@Transactional
	public int cancelLabTest(String billDetId,
			String cancleType, Integer deptId, HttpServletRequest request) {
		return Doctordeskao.cancelLabTest(billDetId,cancleType, deptId, request);
	}
	@Override
	@Transactional
	public int IpdBillSendToLab(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request) {
		return Doctordeskao.IpdBillSendToLab(billDetailsIpdDto,request);
	}
	@Override
	@Transactional
	public List<CpoeIPDdetails> getlistservciesipdcopenew(Integer tID,
			String callform, HttpServletRequest request) {

		// TODO Auto-generated method stub
		return Doctordeskao.getlistservciesipdcopenew( tID,
				 callform);
	}
	@Override
	@Transactional
	public int OpdCpoeSendToRis(BillDetailsDto billDetailsDto, String subList,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.OpdCpoeSendToRis(billDetailsDto, subList, request);
	}
	@Override
	@Transactional
	public int IpdCpoeSendToRis(BillDetailsIpdDto billDetailsIpdDto,
			String subList, HttpServletRequest request) {
		return Doctordeskao.IpdCpoeSendToRis(billDetailsIpdDto, subList, request);
	}
	@Override
	@Transactional
	public List<Treatment> fetchPreviousTreatmentsByTreatmentID(
			Integer treatmentId, HttpServletRequest request) {
		return Doctordeskao.fetchPreviousTreatmentsByTreatmentID(treatmentId, request);
	}
	
	@Override
	@Transactional
	public List<RadiologyTemplateReportDTO> getTestRadilogyReports(Integer patientId,Integer testId,Integer billdetailsid,Integer treatmentId) {
		
		return Doctordeskao.getTestRadilogyReports(patientId,testId,billdetailsid,treatmentId);
	}
	
	@Override
	@Transactional
	public List<RisImageUploadDTO> fetchXrayImage(Integer treatmentId,Integer testId,Integer billdetailsid) {
		
		return Doctordeskao.fetchXrayImage(treatmentId,testId,billdetailsid);
	}

	@Override
	@Transactional
	public int cancelInvestigationTest(String billDetId, String cancleType,
			String callform, HttpServletRequest request) {
		return Doctordeskao.cancelInvestigationTest(billDetId,cancleType, callform, request);
		}
	
	@Override
	@Transactional
	public int packageOpdSendToLab(
			EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return Doctordeskao.packageOpdSendToLab(ehatOtherBillDetailForOpdDto,request);
	}
	
	@Override
	@Transactional
	public int deleteLabPackageTest(Integer otherBillDetailsId, Integer deptId,
			HttpServletRequest request) {
		
		return Doctordeskao.deleteLabPackageTest(otherBillDetailsId,deptId,request);
	}
	
	@Override
	@Transactional
	public List<DoctorRoundReport> fetchSelctedIpdDrRound(Integer treatmentID,
			String date, HttpServletRequest request) {
		
		return Doctordeskao.fetchSelctedIpdDrRound(treatmentID,date,request);
	}
	
	@Override
	@Transactional
	public int deleteOPDPrepDocTemp(Integer prepTemplateDocID,
			HttpServletRequest request) {
		return Doctordeskao.deleteOPDPrepDocTemp(prepTemplateDocID,request);
	}
	@Override
	@Transactional
	public int savecpoeOTsurgan(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request, String queryType, String callfrom) {
		// TODO Auto-generated method stub
		return Doctordeskao.savecpoeOTsurgan(billDetailsIpdDto, queryType, callfrom,request);
	}
	@Override
	public List<DoctorDto> fetchDoctorList(String doctodType) {
		// TODO Auto-generated method stub
		return Doctordeskao.fetchDoctorList(doctodType);
	}
	
	@Override
	@Transactional
	public int addPathologyPackageFromBilling(BillDetailsDto billDetailsDto,HttpServletRequest request, 
			String queryType, String module,String sampleWiseBarcodes) {
		
		return Doctordeskao.addPathologyPackageFromBilling(billDetailsDto,request, queryType, module, sampleWiseBarcodes);
	}
	@Override
	@Transactional
	public String  deleteservdetailsPreviousOPD(String labservicelist, HttpServletRequest request) {
		
		return Doctordeskao.deleteservdetailsPreviousOPD(labservicelist, request);
	}
	@Override
	@Transactional
	public int canclePreviousServices(String servId, String tretId, String cancleType, HttpServletRequest request) {
		
		return Doctordeskao.canclePreviousServices(servId, tretId, cancleType, request);
	}
	
	@Override
	@Transactional
	public int cancelLabTestCheckService(String servId, String tretId,String cancleType,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		// TODO Auto-generated method stub
		return Doctordeskao.cancelLabTestCheckService(servId, tretId,cancleType,userId);
		
	}
}
