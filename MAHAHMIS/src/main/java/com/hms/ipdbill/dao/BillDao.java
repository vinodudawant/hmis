package com.hms.ipdbill.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Session;

import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.EhatBillPrefix;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.BulkSettlementMasterDTO;
import com.hms.ipdbill.dto.BulkSettlementMultiSpsrViewDTO;
import com.hms.ipdbill.dto.BulkSettlementViewDTO;
import com.hms.ipdbill.dto.MultiBillReceiptMasterDTO;
import com.hms.pharmacy.pojo.BankMaster;

public interface BillDao {

	int saveBillDetails(String masterIdsChecked,String servIdsChecked,Integer refDocId,BillReceiptMasterDTO billRecMaster,String multiPayDetails);	
	int saveRefundBillDetails(String servIdsChecked,Integer refDocId,BillReceiptMasterDTO billRecMaster);	
	BillReceiptMasterDTO getBillReceiptDetails(BillReceiptMasterDTO billRecMaster,String callFrom);	
	BillRefundMasterDTO getBillRefundDetails(BillRefundMasterDTO billRecMaster,String callFrom);
	
	BillDetailsDto getTotalPayable(BillDetailsDto billRecMaster,String callFrom);
	//@author : Sagar kadam @date: 10-Aug-2017 @reason : To fetch Bank Master List
	BankMaster getBankMasterList();
	
	BulkSettlementViewDTO getBulkReceiptDetails(BulkSettlementMasterDTO billRecMaster,String callFrom);
	int saveBulkDetails(BulkSettlementMasterDTO billRecMaster,String multiPayDetails,String bulkSlaveDetails);	
	BulkSettlementMultiSpsrViewDTO getBulkSearchData(String callFrom,int unitId,int deptId,int sponId, Integer sponsorF, Integer sponsorL,String fromDate,String lastDate,String letter);
	
	BillReceiptMasterDTO searchDailyCashReport(String callFrom,int unitId,int deptId,int userId,String fromDate,String toDate);
	
	int fetchreceiptId(int treatmentId, int billDetailsId);

	BillReceiptMasterDTO fetchAllReceiptTotals(BillReceiptMasterDTO obj,String callFrom);
	BillReceiptMasterDTO fetchPrevPending(BillReceiptMasterDTO obj,String callFrom);
	
	EhatBillPrefix getBillPrefix(EhatBillPrefix obj,String callFrom);	
	
	double getEmergancyCharges();
	
	//@author : Laxman Nikam @date: 07-March-2018 @reason : After Paid,Test Sent To Lab for OPD and Diagno only.
	Integer paidTestSendToLab(Integer treatmentId, HttpServletRequest request);		

	Integer paidTestSendToRis(String subservIdsChecked,
			Integer treatmentId, HttpServletRequest request);
	
	Integer paidTestSendToRadiation(String subservIdsChecked,
			Integer treatmentId, HttpServletRequest request);
	BillReceiptMasterDTO searchDailyCollectionReport(String callFrom,
			int unitId, int deptId, int userId, String fromDate, String toDate);	
	BulkSettlementMasterDTO fetchbulsetlmentskdetails(int bulk_master_id);
	Integer getPharmacyInBillOrNot(int treatmentId,int unitId,int userId,int deptId,int chargesSlaveId);
	
	BulkSettlementMasterDTO getSettledBills(BulkSettlementMasterDTO obj,String callFrom,String letter,String fDate,String lDate,Integer startIndex);
	
	int fetchreceiptCount(int treatmentId, int billDetailsId);
	
	int setOpdBillMaster(BillReceiptMasterDTO obj,String callFrom);
	
	BulkSettlementMasterDTO getBulkReport(String fromDate,String toDate);
	
	CommonadvDto dailyCommonAdvReport(String callFrom,int unitId,int userId,String fromDate,String toDate);
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	public List<BillReceiptMasterDTO> getOpdRecDetails(int billId,int treatId,int patId,int recId,String callFrom);
	
	List<MultiBillReceiptMasterDTO> getMultiRecDetails(int billId, int treatId, int patId, int recId, int departmentId);
	
	List<BillRefundMasterDTO> getOpdRefundDetails(int billId, int treatId, int patId, int recId, String callFrom);
	
	public List<BillReceiptMasterDTO> getIvfOpdRecDetails(int billId,int treatId,int patId,int recId,String callFrom);
	
	List<BillRefundMasterDTO> getIvfOpdRefundDetails(int billId, int treatId, int patId, int recId, String callFrom);
	String checkUserNameandPasswordByRefundApproved(Integer userId, String username, String password);
	
	int updateBillMasterTotalForOPD(int treatemnetId);// added by dayanand(9-5-2023) for update total paid,total remain charges etc.
//	Integer getSettledBillCount();
	
	int saveOutStandingRemark(int treatmentId,String remark,String outStandingReson);
	
	public int setOpdRecMasterSlave(int maxRecId,int againstId,String callFrom,Session session);
	
	Integer setOpdBillDetailsDistribute(Integer treatId,HttpServletRequest request);
	
	Integer setBulkSettleDistributeOnload(Integer treatId,HttpServletRequest request);
	
	int saveRefundBillDetailsNew(String servIdsChecked,Integer refDocId,BillReceiptMasterDTO billRecMaster);
}
