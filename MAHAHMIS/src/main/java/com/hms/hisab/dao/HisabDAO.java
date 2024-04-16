package com.hms.hisab.dao;


import java.util.List;

import com.hms.hisab.Pojo.HisabDTO;
import com.hms.hisab.Pojo.HisabIPDDTO;
import com.hms.hisab.Pojo.HisabVouchersDTO;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.MultiBillReceiptMasterDTO;

@SuppressWarnings("rawtypes")
public interface HisabDAO {

	List<HisabDTO> fetchDiagnosisHisab(int selectService,String operation,String selectedDate,String toDate);
	boolean closeDiagnosisHisab(HisabDTO hisabPojo);
	
	List<HisabDTO> fetchOpdHisab(int selectService,String operation,String selectedDate,String toDate);
	boolean closeOpdHisab(HisabDTO hisabPojo);
	
	List<HisabIPDDTO> fetchIPDHisab(String operation,String selectedDate,String toDate);
	boolean closeIPDHisab(HisabIPDDTO hisabPojo);
	
	String lastClosedHisab(String currentDate);
	
	List<HisabVouchersDTO> fetchClosedVouchersHisab(String selectedDate);
	List<HisabVouchersDTO> fetchCurrentVouchersHisab();
	List<HisabVouchersDTO> fetchVouchersHisabFromTo(String selectedDate,String toDate);			
	boolean closeVouchersHisab(int generatorId,String ipAddress);
	
	//@codeBy : Vinod @codeDate : 17-Dec-2016 @codeFor : Fetch disgnosis discount
	public List<HisabDTO> getDiagnosisDiscount(String paymentMode); 
	
	//@codeBy : Vinod @codeDate : 17-Dec-2016 @codeFor : Fetch opd discount
	public List<HisabDTO> getOpdDiscount(String paymentMode);
	
	//@codeBy : Vinod @codeDate : 17-Dec-2016 @codeFor : Fetch disgnosis discount of closed hisab
	public List<HisabDTO> getDiagnosisDiscountClosed(String selectedDate,String paymentMode);
	
	//@codeBy : Vinod @codeDate : 17-Dec-2016 @codeFor : Fetch opd discount of closed hisab
	public List<HisabDTO> getOpdDiscountClosed(String selectedDate,String paymentMode);
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode disgnosis discount
	public List<HisabDTO> getDiagnosisDiscountAll();
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount
	public List<HisabDTO> getOpdDiscountAll();
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode disgnosis discount of closed hisab
	public List<HisabDTO> getDiagnosisDiscountAllClosed(String selectedDate);
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	public List<HisabDTO> getOpdDiscountAllClosed(String selectedDate);
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	public List<BillReceiptMasterDTO> getOpdRecDetails(int billId,int treatId,int patId,int recId,String callFrom);
	public List<BillReceiptMasterDTO> getIvfOpdRecDetails(int billId,int treatId,int patId,int recId,String callFrom);
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	public List<BillReceiptMasterDTO> getDailyCashReport(int uId,String fromDate,String toDate,String callFrom);
	
	// @codeBy : Irfan @codeDate : 11-Jan-2018 @codeFor : Fetch All Multi pay list
	public List<MultiBillReceiptMasterDTO> getMultiRecDetails(int billId,
			int treatId, int patId, int recId, int departmentId);
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13-01-2021
	 * @comment this method is created to print the refund print w.r.t the service name
	 */
	public List<BillRefundMasterDTO> getOpdRefundDetails(int billId,int treatId,int patId,int recId,String callFrom);
		
}
