package com.hms.ipdbill.serviceImpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.EhatBillPrefix;
import com.hms.ipdbill.dao.BillDao;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.BulkSettlementMasterDTO;
import com.hms.ipdbill.dto.BulkSettlementMultiSpsrViewDTO;
import com.hms.ipdbill.dto.BulkSettlementViewDTO;
import com.hms.ipdbill.dto.MultiBillReceiptMasterDTO;
import com.hms.ipdbill.service.BillService;
import com.hms.pharmacy.pojo.BankMaster;

@Service
public class BillServiceImpl implements BillService {
	
	@Autowired
	BillDao billDao;
	
	@Override
	@Transactional
	public Integer saveBillDetails(String masterIdsChecked,String servIdsChecked,Integer refDocId,BillReceiptMasterDTO billRecMaster,String multiPayDetails){
		
		//String msg="";
		return billDao.saveBillDetails(masterIdsChecked,servIdsChecked,refDocId,billRecMaster,multiPayDetails);
		/*if(result>0){
			
			msg="Receipt generated succesfully";
		}else{
			
			msg="Network problem occured please check connection";
		}		
		return msg;*/
	}
		
	@Override
	@Transactional
	public Integer saveRefundBillDetails(String servIdsChecked,Integer refDocId,BillReceiptMasterDTO billRecMaster){
		
		//String msg="";
		return billDao.saveRefundBillDetails(servIdsChecked,refDocId,billRecMaster);
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
	public BillReceiptMasterDTO getBillReceiptDetails(BillReceiptMasterDTO billRecMaster,String callFrom){
		
		return billDao.getBillReceiptDetails(billRecMaster,callFrom);		
	}
	
	@Override
	@Transactional
	public BillRefundMasterDTO getBillRefundDetails(BillRefundMasterDTO billRecMaster,String callFrom){
		
		return billDao.getBillRefundDetails(billRecMaster,callFrom);		
	}
	
	@Override
	@Transactional
	public BillDetailsDto getTotalPayable(BillDetailsDto billRecMaster,String callFrom){
		
		return billDao.getTotalPayable(billRecMaster,callFrom);	
	}
	
	//@author : Sagar kadam @date: 10-Aug-2017 @reason : To fetch Bank Master List
 		@Override
		@Transactional
		public BankMaster getBankMasterList(){
			
 			return billDao.getBankMasterList();	
			 
	}	
 		
	@Override
	@Transactional
	public BulkSettlementViewDTO getBulkReceiptDetails(BulkSettlementMasterDTO billRecMaster,String callFrom){
		
		return billDao.getBulkReceiptDetails(billRecMaster,callFrom);		
	}
	
	@Override
	@Transactional
	public Integer saveBulkDetails(BulkSettlementMasterDTO billRecMaster,String multiPayDetails,String bulkSlaveDetails){
		
		//String msg="";
		return billDao.saveBulkDetails(billRecMaster,multiPayDetails,bulkSlaveDetails);
		/*if(result>0){
			
			msg="Receipt generated succesfully";
		}else{
			
			msg="Network problem occured please check connection";
		}		
		return msg;*/
	}
	
	@Override
	@Transactional
	public BulkSettlementMultiSpsrViewDTO getBulkSearchData(String callFrom,int unitId,int deptId,int sponId,
			Integer sponsorF, Integer sponsorL,String fromDate,String lastDate,String letter){
		
		return billDao.getBulkSearchData(callFrom,unitId,deptId,sponId,sponsorF,sponsorL,fromDate,lastDate,letter);		
	}
	
	@Override
	@Transactional
	public BillReceiptMasterDTO searchDailyCashReport(String callFrom,int unitId,int deptId,int userId,String fromDate,String toDate){
		
		return billDao.searchDailyCashReport(callFrom,unitId,deptId,userId,fromDate,toDate);	
	}

	@Override
	@Transactional
	public int fetchreceiptId(int treatmentId, int billDetailsId) {
		
		return billDao.fetchreceiptId(treatmentId,billDetailsId);
	}

	@Override
	@Transactional
	public BillReceiptMasterDTO fetchAllReceiptTotals(BillReceiptMasterDTO obj,
			String callFrom) {
		
		return billDao.fetchAllReceiptTotals(obj,callFrom);
	}
	
	@Override
	@Transactional
	public BillReceiptMasterDTO fetchPrevPending(BillReceiptMasterDTO obj,
			String callFrom) {
		
		return billDao.fetchPrevPending(obj,callFrom);
	}

	@Override
	@Transactional
	public EhatBillPrefix getBillPrefix(EhatBillPrefix obj, String callFrom) {
				
		return billDao.getBillPrefix(obj,callFrom);
	}

	//@Override
	@Transactional
	public double getEmergancyCharges() {
		
		return billDao.getEmergancyCharges();
	}
	
	@Override
	@Transactional
	public Integer paidTestSendToLab(Integer treatmentId,HttpServletRequest request) {
		return billDao.paidTestSendToLab(treatmentId,request);
	}
	@Override
	@Transactional
	public Integer paidTestSendToRis(String subservIdsChecked,Integer treatmentId,
			HttpServletRequest request) {
		return billDao.paidTestSendToRis(subservIdsChecked,treatmentId,request);
	}
	@Override
	@Transactional
	public Integer paidTestSendToRadiation(String subservIdsChecked,
			Integer treatmentId, HttpServletRequest request) {
		return billDao.paidTestSendToRadiation(subservIdsChecked,treatmentId,request);
		}

	
	@Override
	@Transactional
	public BillReceiptMasterDTO searchDailyCollectionReport(String callFrom,
			int unitId, int deptId, int userId, String fromDate, String toDate) {
		
		return billDao.searchDailyCollectionReport(callFrom,unitId,deptId,userId,fromDate,toDate);	
	}

	@Override
	@Transactional
	public BulkSettlementMasterDTO fetchbulsetlmentskdetails(int bulk_master_id) {
		// TODO Auto-generated method stub
		return billDao.fetchbulsetlmentskdetails(bulk_master_id);
	}
	
	@Override
	@Transactional
	public Integer getPharmacyInBillOrNot(int treatmentId,int unitId,int userId,int deptId,int chargesSlaveId) {
		
		return billDao.getPharmacyInBillOrNot(treatmentId,unitId,userId,deptId,chargesSlaveId);
	}
	
	@Override
	@Transactional
	public BulkSettlementMasterDTO getSettledBills(BulkSettlementMasterDTO obj,String callFrom,String letter,String fDate,String lDate,Integer startIndex){
		
		return billDao.getSettledBills(obj,callFrom,letter,fDate,lDate,startIndex);
	}

	@Override
	@Transactional
	public int fetchreceiptCount(int treatmentId, int billDetailsId) {
		
		return billDao.fetchreceiptCount(treatmentId,billDetailsId);
	}

	@Override
	@Transactional
	public int setOpdBillMaster(BillReceiptMasterDTO obj, String callFrom) {
		
		return billDao.setOpdBillMaster(obj,callFrom);
	}
	
	@Override
	@Transactional
	public BulkSettlementMasterDTO getBulkReport(String fromDate,String toDate) {
		// TODO Auto-generated method stub
		return billDao.getBulkReport(fromDate,toDate);
	}
	
	@Override
	@Transactional
	public CommonadvDto dailyCommonAdvReport(String callFrom,int unitId,int userId,String fromDate,String toDate){
		
		return billDao.dailyCommonAdvReport(callFrom,unitId,userId,fromDate,toDate);
	}
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	@Override
	@Transactional
	public List<BillReceiptMasterDTO> getOpdRecDetails(int billId,int treatId,int patId,int recId,String callFrom) {
		
		List<BillReceiptMasterDTO> dList = billDao.getOpdRecDetails(billId,treatId,patId,recId,callFrom);			
		return dList;
	}
	
	@Override
	@Transactional
	public List<MultiBillReceiptMasterDTO> getMultiRecDetails(int billId, int treatId, int patId, int recId, int departmentId){
		
		List<MultiBillReceiptMasterDTO> dList = billDao.getMultiRecDetails(billId,treatId,patId,recId,departmentId);			
		return dList;
	}
	
	@Override
	@Transactional
	public List<BillRefundMasterDTO> getOpdRefundDetails(int billId, int treatId, int patId, int recId, String callFrom){
		
		List<BillRefundMasterDTO> dList = billDao.getOpdRefundDetails(billId,treatId,patId,recId,callFrom);			
		return dList;
	}
	
	@Override
	@Transactional
	public List<BillReceiptMasterDTO> getIvfOpdRecDetails(int billId,int treatId,int patId,int recId,String callFrom) {
		
		List<BillReceiptMasterDTO> dList = billDao.getIvfOpdRecDetails(billId,treatId,patId,recId,callFrom);			
		return dList;
	}
	
	@Override
	@Transactional
	public List<BillRefundMasterDTO> getIvfOpdRefundDetails(int billId, int treatId, int patId, int recId, String callFrom){
		
		List<BillRefundMasterDTO> dList = billDao.getIvfOpdRefundDetails(billId,treatId,patId,recId,callFrom);			
		return dList;
	}
	
	
	@Override
	@Transactional
	public String checkUserNameandPasswordByRefundApproved(Integer userId,
			String username, String password) {
		return billDao.checkUserNameandPasswordByRefundApproved(userId,username,password);
	}

	@Override
	@Transactional
	public int updateBillMasterTotalForOPD(int treatemnetId) {
		
		return billDao.updateBillMasterTotalForOPD(treatemnetId);
	}

	@Override
	public int saveOutStandingRemark(int treatmentId, String remark,String outStandingReson) {
		// TODO Auto-generated method stub
		return billDao.saveOutStandingRemark(treatmentId, remark,outStandingReson);
	}

	@Override
	public Integer setOpdBillDetailsDistribute(Integer treatId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return billDao.setOpdBillDetailsDistribute(treatId, request);
	}

	@Override
	public Integer setBulkSettleDistributeOnload(Integer treatId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return billDao.setBulkSettleDistributeOnload(treatId, request);
	}
	
	@Override
	@Transactional
	public Integer saveRefundBillDetailsNew(String servIdsChecked,Integer refDocId,BillReceiptMasterDTO billRecMaster){
		
		//String msg="";
		return billDao.saveRefundBillDetailsNew(servIdsChecked,refDocId,billRecMaster);
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


}
