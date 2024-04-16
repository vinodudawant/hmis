package com.hms.hisab.model;

import java.util.List;

import com.hms.hisab.Pojo.HisabDTO;
import com.hms.hisab.Pojo.HisabIPDDTO;
import com.hms.hisab.Pojo.HisabVouchersDTO;
import com.hms.hisab.dao.HisabDAO;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.MultiBillReceiptMasterDTO;
import com.hms.model.AbstractModel;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class HisabModel extends AbstractModel {

	//@codeBy : Vinod @codeDate : 01-Oct-2016 @codeFor : Fetch diagnosis hisab
	public List<HisabDTO> fetchDiagnosisHisab(int selectService,String operation,String selectedDate,String toDate) {
	
		HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
		List<HisabDTO> dList = hisabDAO.fetchDiagnosisHisab(selectService,operation,selectedDate,toDate);		
		return dList;
	}	
	//@codeBy : Vinod @codeDate : 10-Oct-2016 @codeFor : Close diagnosis hisab	
	public boolean closeDiagnosisHisab(HisabDTO hisabPojo) {
		
		HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
		boolean flag = hisabDAO.closeDiagnosisHisab(hisabPojo);			
		return flag;
	}	
	//@codeBy : Vinod @codeDate : 24-Oct-2016 @codeFor : Fetch Opd hisab
	public List<HisabDTO> fetchOpdHisab(int selectService,String operation,String selectedDate,String toDate) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabDTO> dList = hisabDAO.fetchOpdHisab(selectService,operation,selectedDate,toDate);				
			return dList;
	}	
	//@codeBy : Vinod @codeDate : 24-Oct-2016 @codeFor : Close Opd hisab	
	public boolean closeOpdHisab(HisabDTO hisabPojo) {
		
		HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
		boolean flag = hisabDAO.closeOpdHisab(hisabPojo);			
		return flag;
	}	
	//@codeBy : Vinod @codeDate : 14-Nov-2016 @codeFor : Fetch IPD hisab
	public List<HisabIPDDTO> fetchIPDHisab(String operation,String selectedDate,String toDate) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabIPDDTO> dList = hisabDAO.fetchIPDHisab(operation,selectedDate,toDate);				
			return dList;
	}	
	//@codeBy : Vinod @codeDate : 15-Nov-2016 @codeFor : Close IPD hisab	
	public boolean closeIPDHisab(HisabIPDDTO hisabPojo) {
		
		HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
		boolean flag = hisabDAO.closeIPDHisab(hisabPojo);			
		return flag;
	}	
	//@codeBy : Vinod @codeDate : 15-Nov-2016 @codeFor : Close IPD hisab	
	public String lastClosedHisab(String currentDate) {
			
		HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
		String lastDate = hisabDAO.lastClosedHisab(currentDate);				
		return lastDate;
	}		
	//@codeBy : Vinod @codeDate : 05-Dec-2016 @codeFor : Fetch Cash Voucher hisab
	public List<HisabVouchersDTO> fetchClosedVouchersHisab(String selectedDate){
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabVouchersDTO> dList = hisabDAO.fetchClosedVouchersHisab(selectedDate);				
			return dList;
	}	
	//@codeBy : Vinod @codeDate : 05-Dec-2016 @codeFor : Fetch Cash Voucher hisab
	public List<HisabVouchersDTO> fetchCurrentVouchersHisab(){
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabVouchersDTO> dList = hisabDAO.fetchCurrentVouchersHisab();				
			return dList;
	}	
	//@codeBy : Vinod @codeDate : 05-Dec-2016 @codeFor : Fetch Vouchers hisab in date range
	public List<HisabVouchersDTO> fetchVouchersHisabFromTo(String selectedDate,String toDate){
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabVouchersDTO> dList = hisabDAO.fetchVouchersHisabFromTo(selectedDate,toDate);			
			return dList;
	}		
	//@codeBy : Vinod @codeDate : 15-Nov-2016 @codeFor : Close IPD hisab	
	public boolean closeVouchersHisab(int generatorId,String ipAddress) {
		
		HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
		boolean flag = hisabDAO.closeVouchersHisab(generatorId,ipAddress);		
		return flag;
	}	
	//@codeBy : Vinod @codeDate : 17-Dec-2016 @codeFor : Fetch disgnosis discount
	public List<HisabDTO> getDiagnosisDiscount(String paymentMode) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabDTO> dList = hisabDAO.getDiagnosisDiscount(paymentMode);	
			
			return dList;
	}	
	//@codeBy : Vinod @codeDate : 17-Dec-2016 @codeFor : Fetch disgnosis discount
	public List<HisabDTO> getOpdDiscount(String paymentMode) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabDTO> dList = hisabDAO.getOpdDiscount(paymentMode);	
			
			return dList;
	}	
	//@codeBy : Vinod @codeDate : 17-Dec-2016 @codeFor : Fetch disgnosis discount
	public List<HisabDTO> getDiagnosisDiscountClosed(String selectedDate,String paymentMode) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabDTO> dList = hisabDAO.getDiagnosisDiscountClosed(selectedDate,paymentMode);	
			
			return dList;
	}	
	//@codeBy : Vinod @codeDate : 17-Dec-2016 @codeFor : Fetch disgnosis discount
	public List<HisabDTO> getOpdDiscountClosed(String selectedDate,String paymentMode) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabDTO> dList = hisabDAO.getOpdDiscountClosed(selectedDate,paymentMode);	
			
			return dList;
	}		
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode disgnosis discount
	public List<HisabDTO> getDiagnosisDiscountAll() {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabDTO> dList = hisabDAO.getDiagnosisDiscountAll();	
			
			return dList;
	}
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount
	public List<HisabDTO> getOpdDiscountAll() {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabDTO> dList = hisabDAO.getOpdDiscountAll();	
			
			return dList;
	}
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode disgnosis discount of closed hisab
	public List<HisabDTO> getDiagnosisDiscountAllClosed(String selectedDate) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabDTO> dList = hisabDAO.getDiagnosisDiscountAllClosed(selectedDate);	
			
			return dList;
	}
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	public List<HisabDTO> getOpdDiscountAllClosed(String selectedDate) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<HisabDTO> dList = hisabDAO.getOpdDiscountAllClosed(selectedDate);	
			
			return dList;
	}	
		
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	public List<BillReceiptMasterDTO> getOpdRecDetails(int billId,int treatId,int patId,int recId,String callFrom) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<BillReceiptMasterDTO> dList = hisabDAO.getOpdRecDetails(billId,treatId,patId,recId,callFrom);
			
			return dList;
	}
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	public List<BillReceiptMasterDTO> getIvfOpdRecDetails(int billId,int treatId,int patId,int recId,String callFrom) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<BillReceiptMasterDTO> dList = hisabDAO.getIvfOpdRecDetails(billId,treatId,patId,recId,callFrom);
			
			return dList;
	}
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	public List<BillReceiptMasterDTO> getDailyCashReport(int uId,String fromDate,String toDate,String callFrom) {
		
			HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
			List<BillReceiptMasterDTO> dList = hisabDAO.getDailyCashReport(uId,fromDate,toDate,callFrom);
			
			return dList;
	}	
	
	// @codeBy : Irfan @codeDate : 11-Jan-2018 @codeFor : Fetch All Multi pay list
	public List<MultiBillReceiptMasterDTO> getMultiRecDetails(int billId,
			int treatId, int patId, int recId, int departmentId) {

		HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
		List<MultiBillReceiptMasterDTO> dList = hisabDAO.getMultiRecDetails(
				billId, treatId, patId, recId, departmentId);

		return dList;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13-01-2021
	 * @comment this method is created to print the refund print w.r.t the service name
	 */
	public List<BillRefundMasterDTO> getOpdRefundDetails(int billId,
			int treatId, int patId, int recId, String callFrom) {
		HisabDAO hisabDAO = (HisabDAO) getContext().getBean("hisabDAO");
		List<BillRefundMasterDTO> dList = hisabDAO.getOpdRefundDetails(billId,
				treatId, patId, recId, callFrom);
		return dList;
	}
}