package com.hms.ipdbill.serviceImpl;

import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.hms.ipdbill.dao.IpdBillDao;
import com.hms.ipdbill.dto.EmrChargesDto;
import com.hms.ipdbill.dto.IpdBillDTO;
import com.hms.ipdbill.dto.IpdBillDiscount;
import com.hms.ipdbill.dto.IpdBillPatientsBedsDTO;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdBillPatientsDTO2;
import com.hms.ipdbill.dto.IpdBillReceiptMasterDTO;
import com.hms.ipdbill.dto.IpdBillRefundMasterDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;
import com.hms.ipdbill.service.IpdBillService;

@Service("old ipdbillservice")
public class IpdBillServiceImpl implements IpdBillService {

	@Autowired
	IpdBillDao ipdBillDao;
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
    String userAccessFlow = resourceBundleEhat.getObject("userAccessFlow").toString();
	
	@Override
	@Transactional
	public List<IpdQueueDTO> getIpdQueue(Integer unitId){
		
		return ipdBillDao.getIpdQueue(unitId);
	}
	
	@Override
	@Transactional
	public List<IpdQueueDTO> getAutoSuggestionIpdQueue(String letter){
		
		return ipdBillDao.getAutoSuggestionIpdQueue(letter);
	}
	
	@Override
	@Transactional
	public String saveIpdBillDetails(IpdBillDTO objDto){
		
		String msg="";
		int result= ipdBillDao.saveIpdBillDetails(objDto);
		if(result>0){
			
			msg="Bed allocated succesfully";
		}else{
			
			msg="Network problem occured please check connection";
		}		
		return msg;
	}
	
	@Override
	@Transactional
	public List<IpdBillPatientsDTO> getIpdbillPatients(String general,Integer unitId,Integer userId1, String userType,int wardType,int hallTypeSelectId,String ward){
	
		return ipdBillDao.getIpdbillPatients(general,unitId,userId1,userType,wardType,hallTypeSelectId,ward);
	}

	@Override
	@Transactional
	public List<IpdBillDTO> getBillDetails(Integer treatId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return ipdBillDao.getBillDetails(treatId);
	}
	
	@Override
	@Transactional
	public Object getsubServiceDetails(@SuppressWarnings("rawtypes") Class className,Integer srvId){
		
		return ipdBillDao.getsubServiceDetails(className,srvId);
	}

	//Fetching patient Ipd bill data bye id.
	@Override
	@Transactional
	public List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromView(Integer treatmentId,String treatcloseForIpd,HttpServletRequest request) {
		
		if(userAccessFlow.equalsIgnoreCase("on")){
            HttpSession session = request.getSession();
            Integer userId = (Integer) session.getAttribute("userId1");
            
                    
            return ipdBillDao.getIpdPatientServiceListFromView(treatmentId,treatcloseForIpd,userId);
        }
		else{
			return ipdBillDao.getIpdPatientServiceListFromView(treatmentId,treatcloseForIpd);
		}
		
		
	}
	
	@Override
	@Transactional
	public List<EhatViewPatientServiceDetailIpdDto> getPatientBillAmountIpdForEstimation(
			Integer treatmentId, String startDate, String endDate,String callFrom,
			HttpServletRequest request)
			{
		if(userAccessFlow.equalsIgnoreCase("on")){
            HttpSession session = request.getSession();
            Integer userId = (Integer) session.getAttribute("userId1");
            
                    
            return ipdBillDao.getPatientBillAmountIpdForEstimation(treatmentId,startDate,endDate,userId,callFrom);
        }
		else{
			return ipdBillDao.getPatientBillAmountIpdForEstimation(treatmentId,startDate,endDate,callFrom);
            
		}
		
		
	}
	

	//Fetching patient Previous Ipd bill data bye id.
	@Override
	@Transactional
	public List<EhatViewPatientServiceDetailIpdDto2> getPatientPreviousBillAmountForGenIpd(
			Integer treatmentId,HttpServletRequest request) {
		if(userAccessFlow.equalsIgnoreCase("on")){
            HttpSession session = request.getSession();
            Integer userId = (Integer) session.getAttribute("userId1");
            
                    
            return ipdBillDao.getPatientPreviousBillAmountForGenIpd(treatmentId,userId);
        }
		else{
			return ipdBillDao.getPatientPreviousBillAmountForGenIpd(treatmentId);
		}
		}
	
	
	@Override
	@Transactional
	public List<EhatViewPatientBedDetailsIpdDto> getPatientBedBill(
			Integer treatmentId, Integer serviceId) {
		// TODO Auto-generated method stub
		return ipdBillDao.getPatientBedBill(treatmentId,serviceId);
	}
	
	@Override
	@Transactional
	public List<EhatViewPatientBedDetailsIpdDto> getBedDetailsForEstimate(
			Integer treatmentId, Integer serviceId,String startDate,
			String endDate) {
		// TODO Auto-generated method stub
		return ipdBillDao.getBedDetailsForEstimate(treatmentId,serviceId,startDate,endDate);
	}

	@Override
	@Transactional
	public List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBill(
			Integer treatmentId, Integer serviceId) {
		// TODO Auto-generated method stub
		return ipdBillDao.getPatientServiceBill(treatmentId,serviceId);
	}
	
	@Override
	@Transactional
	public List<EhatViewPatientSubServiceDetailsIpdDto> getIpdPatientServiceBill2ForEstimate(
			Integer treatmentId, Integer serviceId,String startDate, String endDate) {
		// TODO Auto-generated method stub
		return ipdBillDao.getIpdPatientServiceBill2ForEstimate(treatmentId,serviceId,startDate,endDate);
	}
	
	
	
	@Override
	@Transactional
	public Integer saveBillDetailsIpd(String servIdsChecked,Integer refDocId,IpdBillReceiptMasterDTO billRecMaster,String multiPayDetails){
		
		//String msg="";
		return ipdBillDao.saveBillDetailsIpd(servIdsChecked,refDocId,billRecMaster,multiPayDetails);
		/*if(result>0){
			
			msg="Receipt generated succesfully";
		}else{
			
			msg="Network problem occured please check connection";
		}		
		return msg;*/
	}
	
	@Override
	@Transactional
	public Integer saveRefundBillDetailsIpd(String servIdsChecked,Integer refDocId,IpdBillRefundMasterDTO billRecMaster,String multiPayDetails, String listMultiRefundSave){
		
		//String msg="";
		return ipdBillDao.saveRefundBillDetailsIpd(servIdsChecked,refDocId,billRecMaster,multiPayDetails,listMultiRefundSave);
		/*if(result>0){
			
			msg="Receipt generated succesfully";
		}else if(result==-1){
			
			msg="Amount should be less than paid";
		}else if(result==-2){
			
			msg="Receipt is not generated to refund";
		}else{
			
			msg="Network problem occured please check connection";
		}			
		return msg;*/
	}
	
	@Override
	@Transactional
	public IpdBillReceiptMasterDTO getBillReceiptDetailsIpd(IpdBillReceiptMasterDTO billRecMaster,String callFrom){
		
		return ipdBillDao.getBillReceiptDetailsIpd(billRecMaster,callFrom);		
	}
	
	@Override
	@Transactional
	public IpdBillRefundMasterDTO getBillRefundDetailsIpd(IpdBillRefundMasterDTO billRecMaster,String callFrom){
		
		return ipdBillDao.getBillRefundDetailsIpd(billRecMaster,callFrom);		
	}
	
	//@sagar
	@Override
	@Transactional
	public List<IpdBillPatientsDTO> autosuggesstionviewIpdbillPatients(String letter,String finalBill,String usertype,HttpServletRequest request){
	if(usertype.equalsIgnoreCase("Y")){
		return ipdBillDao.autosuggesstionviewIpdbillPatients(letter,finalBill,usertype,request);
	}else{
		return ipdBillDao.autosuggesstionviewIpdbillPatients(letter,finalBill,request);
	}
	}

	//@kishor
	@Override
	@Transactional
	public List<EhatViewPatientSubServiceDetailsIpdDto2> getPatientServiceBillSponsorForIpd(
			Integer treatmentId, Integer serviceId, Integer chargesSlaveId) {
		return ipdBillDao.getPatientServiceBillSponsorForIpd(treatmentId,serviceId,chargesSlaveId);
		
	}

	@Override
	@Transactional
	public List<EhatViewPatientSubServiceDetailsForIpdPackage> getPackagedataforIpd(
			Integer pSId, Integer pSubSId, Integer sponsorId,
			Integer chargesSlaveId, Integer treatmentId, Integer patientId,Integer billDetailsId) {
		// TODO Auto-generated method stub
		return ipdBillDao.getPackagedataforIpd(pSId,pSubSId,chargesSlaveId,sponsorId,treatmentId,patientId,billDetailsId);

	}


	@Override
	@Transactional
	public int savePackageIpd(
			EhatOtherBillDetailForIpdDto ehatOtherBillDetailForOpdDto,
			HttpServletRequest request, String queryType) {
		return ipdBillDao.savePackageIpd(ehatOtherBillDetailForOpdDto, request, queryType);
	}

	@Override
	@Transactional
	public boolean deleteOnClickForPackageIpd(Integer billDetailsId,
			Integer otherbildetailidipd, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		//EhatOtherBillDetailForIpdDto ehatOtherBillDetailForIpdDto = new EhatOtherBillDetailForIpdDto();
		

		ipdBillDao.deleteOnClickForPackageIpd(billDetailsId,otherbildetailidipd,userId);
		return true;
	}	

	@Override
	@Transactional
	public int getAdminChargesIpd(BillDetailsIpdDto billRecMaster,String callFrom){
		
		return ipdBillDao.getAdminChargesIpd(billRecMaster,callFrom);		
	}

	

	/**@author  :Bilal
	 * @date    :21-Aug-2017
	 * @code    :for fetching list of ipd packages whose combination is Y ***/
	@Override
	@Transactional
	public List<BillNobleServicePackageipdDto> getlistOfPackageipd(
			Integer treatmentId) {
	
		return ipdBillDao.getlistOfPackageipd(treatmentId);
	}

	/**@author  :Bilal
	 * @date    :21-Aug-2017
	 * @code    :for converting services to package ***/
	@Override
	@Transactional
	public int convertServiceToPackage(BillDetailsIpdDto billdetails,
			HttpServletRequest request, Integer treatmentId,
			String servIdsChecked, Integer billDetailsId, Integer subServiceId,
			Integer serviceId) {
		
		return ipdBillDao.convertServiceToPackage(billdetails,request,treatmentId,servIdsChecked,
				billDetailsId,subServiceId,serviceId);
	}

	/**@author  :Bilal
	 * @date    :21-Aug-2017
	 * @code    :for including remaining amount to package ***/
	@Override
	@Transactional
	public int includeInPackAmount(BillDetailsIpdDto billdetails,
			HttpServletRequest request, Integer pSubserviceId, Integer pservId,
			Integer billDetailsId, double packamount, double totalAmtPackage,double totalAmtRem) {
		
		return ipdBillDao.includeInPackAmount(billdetails,request,pSubserviceId,pservId,
				billDetailsId,packamount,totalAmtPackage,totalAmtRem);
	}

	/**@author  :Bilal
	 * @code    :for converting service from package to billing**/
	@Override
	@Transactional
	public int convertToBillingipd(BillDetailsIpdDto billdetails,
			HttpServletRequest request, Integer treatmentId,
			String otherBillDetailsIdOpd) {
		
		return ipdBillDao.convertToBillingipd(billdetails,request,treatmentId,otherBillDetailsIdOpd);
	}
	
	
	@Override
	@Transactional
	public List<GetPopUpDataForOTDto> getPopUpDataForOT(
			Integer pSId, Integer pSubSId, Integer sponsorId,
			Integer chargesSlaveId, Integer treatmentId, Integer patientId,
			Integer billDetailsId) {
		// TODO Auto-generated method stub
		return ipdBillDao.getPopUpDataForOT(pSId,pSubSId,chargesSlaveId,sponsorId,treatmentId,patientId,billDetailsId);
	}
			
	@Override
	@Transactional
	public BillDetailsIpdDto getTotalPayableIpd(BillDetailsIpdDto billRecMaster,String callFrom){
		
		return ipdBillDao.getTotalPayableIpd(billRecMaster,callFrom);	
	}
	
	
	//Irfan Khan @date: 7-Aug-2017 @reason : save voucher details
		@Override
		@Transactional
		public int saveIpdCghs(String cghsDetailsRemain, String queryType,
				Integer userId, int unitId, String cghsDetails,int treatmentId, int departmentId) {
			int a = ipdBillDao.saveIpdCghs(cghsDetailsRemain,queryType,userId,unitId,cghsDetails,treatmentId,departmentId);
			return a;
		}

	
		
		@Override
		@Transactional
		public List<CghsIpdDto> getIpdServiceDetailsForCghs(int treatmentId,
				int deptId) {
			// TODO Auto-generated method stub
			return ipdBillDao.getIpdServiceDetailsForCghs(treatmentId,deptId);
		}

	
		@Override
		@Transactional
		public boolean deleteOnClickForCghsIpd(Integer cghsid, Integer depid,
				HttpServletRequest request) {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			//CghsIpdDto cghsIpdDto = new CghsIpdDto();
			

			ipdBillDao.deleteOnClickForCghsIpd(cghsid,depid,userId);
			return true;
		}
	
	@Override
	@Transactional
	public int saveEditIPDDiscount(IpdBillDiscount ipdBillDiscount){
		
		return ipdBillDao.saveEditIPDDiscount(ipdBillDiscount);	
	}
	
	/************
	 * @author	: Vinod Udawant
	 * @date	: 23-oct-2017
	 * @codeFor : Fetch Ipd bill discount
	 ***********/
	@Override
	@Transactional
	public List<IpdBillDiscount> fetchIpdbilDiscount(HttpServletRequest req) {
	
		return ipdBillDao.fetchIpdbilDiscount(req);
	}
	
	@Override
	@Transactional
	public List<IpdBillDiscount> fetchIpdbillTreatDiscount(int treatId){
		
		return ipdBillDao.fetchIpdbillTreatDiscount(treatId);
	}
	
	/************
	 * @author	: Vinod Udawant
	 * @date	: 23-oct-2017
	 * @codeFor : save approved Ipd bill discount
	 ***********/
	@Override
	@Transactional
	public int saveApprovedDiscount(IpdBillDiscount objIpdbill){
		
		return ipdBillDao.saveApprovedDiscount(objIpdbill);	
	}
	
	/************
	 * @author	: Vinod Udawant
	 * @date	: 26-oct-2017
	 * @codeFor : Generate Invoice 
	 ***********/
	@Override
	@Transactional
	public int genarateInvoice(int treatId,int billTypeId,int userId){
		
		return ipdBillDao.genarateInvoice(treatId,billTypeId,userId);	
	}

	@Override
	@Transactional
	public List<EhatViewPatientSubServiceDetailsIpdDto> getIpdPatientServiceBillForComparison(
			Integer treatmentId) {
		// TODO Auto-generated method stub
		return ipdBillDao.getIpdPatientServiceBillForComparison(treatmentId);
	}

	@Override
	@Transactional
	public List<ConfigurationViewServiceDto2> getIpdComparisonPatients(int treatmentId,
			String servId, String subServId, String chargesSponId,
			String chargesSlaveId,String HallId, String HallSlaveId, String isComServId,
			String isComServlastId) {
		// TODO Auto-generated method stub
		return ipdBillDao.getIpdComparisonPatients(treatmentId,servId,subServId,chargesSponId,chargesSlaveId,
				HallId,HallSlaveId,isComServId,isComServlastId);
	}

	//Kishor Lokhande @date: 15-Nov-2017 @reason : save saveQuotations details
	@Override
	@Transactional
	public int saveQuotations(String billquotations, String queryType,
			Integer userId, int unitId, int treatmentId, int departmentId) {
		int a = ipdBillDao.saveQuotations(billquotations,queryType,userId,unitId,treatmentId,departmentId);
		return a;
	}

	@Override
	@Transactional
	public List<BillQuotationDto> getBillQuotationsDetails(int treatmentId,
			int deptId) {
		// TODO Auto-generated method stub
		if(treatmentId==0 && deptId==0){
			return ipdBillDao.getBillQuotationsNameList(treatmentId,deptId);
		}else{
		return ipdBillDao.getBillQuotationsDetails(treatmentId,deptId);
		}
	}
	
	@Override
	@Transactional
	public List<BillQuotationDto> getBillQuotationsDetailsRunT(int treatmentId,
			int count) {
		// TODO Auto-generated method stub
		
			return ipdBillDao.getBillQuotationsDetailsRunT(treatmentId,count);
		
	}
	
	@Override
	@Transactional
	public IpdBillReceiptMasterDTO fetchPrevPendingIpd(IpdBillReceiptMasterDTO obj,
			String callFrom) {
		
		return ipdBillDao.fetchPrevPendingIpd(obj,callFrom);
	}

	@Override
	@Transactional
	public IpdBillReceiptMasterDTO fetchSurgonList(IpdBillReceiptMasterDTO obj,
			String callFrom) {
		
		return ipdBillDao.fetchSurgonList(obj,callFrom);
	}

	@Override
	@Transactional
	public int saveDoctorDiscount(IpdBillDiscount ipdBillDiscount) {
		
		return ipdBillDao.saveDoctorDiscount(ipdBillDiscount);	
	}
	
	//Kishor Lokhande @date: 15-Nov-2017 @reason : save saveQuotations details
	
		@Override
		@Transactional
		public int saveQuotationsNew(String serviceDetails, String queryType,
				Integer userId, int unitId, String callfrom,Double adminChargesPer) {
			int a = ipdBillDao.saveQuotationsNew(serviceDetails,queryType,userId,unitId,callfrom,adminChargesPer);
			return a;
		}

		@Override
		@Transactional
		public List<NewBillQuotation> getServiceDetails(Integer count,String callfrom,Integer patientId,
				HttpServletRequest request) {
			return ipdBillDao.getServiceDetails(count,callfrom,patientId,request);
		}

		@Override
		@Transactional
		public List<NewBillQuotation> getSubServiceDetails(Integer count,
				Integer serviceId,Integer patientId ,HttpServletRequest request) {
			
			return ipdBillDao.getSubServiceDetails(count,serviceId,patientId,request);
		}
	
		@Override
		@Transactional
		public int saveAndDeleteQuotaion(String quotationName,
				String quotationId, Integer userId, int unitId,String callfrom,Integer patientId) {
			int a = ipdBillDao.saveAndDeleteQuotaion(quotationName,quotationId,userId,unitId,callfrom,patientId);
			return a;
		}
		
		@Override
		@Transactional
		public int distributePpnAmount(DistributionPojo obj,
				Integer userId, int unitId) {
			int a = ipdBillDao.distributePpnAmount( obj,userId,unitId);
			return a;
		}
		
		@Override
		@Transactional
		public IpdBillPatientsDTO2 getIpdbillPatientsFilter(String general,
				Integer wardType, Integer hallTypeSelectId, String ward,Integer unitId,
				Integer userId1, String userType) {
			// TODO Auto-generated method stub
			return ipdBillDao.getIpdbillPatientsFilter(general,wardType,hallTypeSelectId,ward,unitId,userId1,userType);
		}

		@Override
		@Transactional
		public boolean chkTimeEmrgyOrNot() {
			// TODO Auto-generated method stub
			return ipdBillDao.chkTimeEmrgyOrNot();
		}
		
		@Override
		@Transactional
		public IpdBillPatientsBedsDTO getIpdbillPatientsBeds(String general,
				Integer unitId, Integer userId1, String userType) {
			// TODO Auto-generated method stub
			return ipdBillDao.getIpdbillPatientsBeds(general,unitId,userId1,userType);
		}

		@Override
		@Transactional
		public IpdBillPatientsBedsDTO getIpdbillPatientsBedsByFilter(
				int hallTypeId, int hallId,String filter) {
			return ipdBillDao.getIpdbillPatientsBedsByFilter(hallTypeId,hallId,filter);
		}

		@Override
		@Transactional
		public IpdBillPatientsBedsDTO autosuggesstionviewIpdbillPatientsBlockWise(
				String letter, String finalBill, String usertype,Integer unitId) {
			return ipdBillDao.autosuggesstionviewIpdbillPatientsBlockWise(letter,finalBill,usertype,unitId);
		}
		
		@Transactional
		@Override
		public IpdBillPatientsDTO2 getIpdbillPatients2(String general,
				Integer unitId, Integer userId1, String userType) {
			// TODO Auto-generated method stub
			return ipdBillDao.getIpdbillPatients2(general,unitId,userId1,userType);
		}

		//@sagar
		@Override
		@Transactional
		public IpdBillPatientsDTO2 autosuggesstionviewIpdbillPatients2(String letter,String finalBill,String usertype,Integer unitId){
		if(usertype.equalsIgnoreCase("Y")){
			return ipdBillDao.autosuggesstionviewIpdbillPatients2(letter,finalBill,usertype,unitId);
		}else{
			return ipdBillDao.autosuggesstionviewIpdbillPatients2(letter,finalBill,unitId);
		}
		}

		@Override
		@Transactional
		public int cancelAdmission(TreatmentDto treatmentDto,
				HttpServletRequest request) {
			int a = ipdBillDao.cancelAdmission(treatmentDto,request);
				return a;}

		@Override
		@Transactional
		public int packageIpdSendToLab(
				EhatOtherBillDetailForIpdDto ehatOtherBillDetailForIpdDto,
				HttpServletRequest request) {
			
			return ipdBillDao.packageIpdSendToLab(ehatOtherBillDetailForIpdDto, request);
		}

		@Override
		@Transactional
		public String getColorCode(int treatmentId) {
			return ipdBillDao.getColorCode(treatmentId);
		
		}

		@Override
		@Transactional
		public boolean getEmerChrTimeSunday() {
			// TODO Auto-generated method stub
			return ipdBillDao.getEmerChrTimeSunday();
		}

		@Override
		@Transactional
		public List<PharmacyDetailsOnBillingPrintDto> getPharmacyDetailsONBillingPrint(
				int treatmentId, int patientId) {
			// TODO Auto-generated method stub
			return ipdBillDao.getPharmacyDetailsONBillingPrint(treatmentId,patientId);
		}

		@Override
		@Transactional
		public Double getSponcerDisc(int chargesSlaveId) {
			return ipdBillDao.getSponcerDisc(chargesSlaveId);
		}

		@Override
		@Transactional
		public List<MultipleSponsorDto> getSponsorSanctionAmount(
				Integer sponsorId, Integer chargesSlaveId, Integer treatmentId,
				Integer patientId,String callfrom, HttpServletRequest request) {
			return ipdBillDao.getSponsorSanctionAmount(sponsorId,chargesSlaveId,treatmentId,patientId,callfrom,request);
		}

	// Added by vinod start
		@Override
		@Transactional
		public List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromView(
				Integer treatmentId, String treatcloseForIpd,
				Integer chargesSlaveId) {
		
			return ipdBillDao.getIpdPatientServiceListFromViewRpt(treatmentId,treatcloseForIpd,chargesSlaveId);
		}

		@Override
		@Transactional
		public List<EhatViewPatientBedDetailsIpdDto> getPatientBedBill(
				Integer treatmentId, Integer serviceId, Integer chargesSlaveId) {
			
			return ipdBillDao.getPatientBedBill(treatmentId,serviceId,chargesSlaveId);
		}

		@Override
		@Transactional
		public List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBill(
				Integer treatmentId, Integer serviceId, Integer chargesSlaveId) {
			
			return ipdBillDao.getPatientServiceBill(treatmentId,serviceId,chargesSlaveId);
		}
		
		@Override
		@Transactional
		public int setSponsorRateToSelfPatient(String labservicelist,
				String servicelist, Integer treatmentId, Integer patientId,
				Integer sponsorId, Integer sponsorSlaveId, String callFrom,
				HttpServletRequest request) {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			return ipdBillDao.setSponsorRateToSelfPatient(labservicelist,servicelist,treatmentId,patientId,sponsorId,sponsorSlaveId,callFrom,userId);
		}
		
		@Override
		@Transactional
		public BillDetailsIpdDto setServiceForCash(BillDetailsIpdDto obj,String callFrom,String servIdsChecked) {
			
			return ipdBillDao.setServiceForCash(obj,callFrom,servIdsChecked);
		}

		@Override
		@Transactional
		public List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBillForNarco(
				Integer treatmentId, Integer serviceId, Integer chargesSlaveId) {
			// TODO Auto-generated method stub
			return ipdBillDao.getPatientServiceBillForNarco(treatmentId,serviceId,chargesSlaveId);
		}

		@Override
		@Transactional
		public List<IpdQueueDTO> autoSuggestationIpdQueue(String searchText) {
			
			return ipdBillDao.autoSuggestationIpdQueue(searchText);
		}

		@Override
		@Transactional
		public IpdQueueDTO getIpdQueuePatientByTreatmentId(Integer treatId) {
			
			return ipdBillDao.getIpdQueuePatientByTreatmentId(treatId);
		}	
		
		@Override
		@Transactional
		public Integer updateIpdBillDetails(Integer treatId) {
			
			return ipdBillDao.updateIpdBillDetails(treatId);
		}
		
		@Override
		@Transactional
		public Integer deleteRefundReceipt(Integer treatId, Integer recId,String remarkDeletedRefund, HttpServletRequest request) {
			
			return ipdBillDao.deleteRefundReceipt(treatId, recId,remarkDeletedRefund, request);
		}

		@Override
		@Transactional
		public Integer setIpdBillDetailsDistribute(Integer treatId, HttpServletRequest request) {
			// TODO Auto-generated method stub
			return ipdBillDao.setIpdBillDetailsDistribute(treatId, request);
		}

		@Override
		@Transactional
		public EmrChargesDto getEmerChrTimeDR(EmrChargesDto emrChargesDto){
		
	       return ipdBillDao.getEmerChrTimeDR(emrChargesDto);
		}
}

