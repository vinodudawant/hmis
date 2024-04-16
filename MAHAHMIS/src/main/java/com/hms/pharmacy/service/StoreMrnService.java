package com.hms.pharmacy.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.MrnIssueMaster;
import com.hms.pharmacy.pojo.MrnMaster;

public interface StoreMrnService {

	Integer getNextAutoIncrement();

	boolean saveOrUpdateMRN(MrnMaster mrnMaster);
	
	boolean saveReceiveMrn(MrnMaster mrnMaster);

	List<MrnMaster> getMrnList(String type);

	List<MrnMaster> getPendingMRN();

	MrnMaster getMRNDetailsByMrnId(Integer mrnId);

	Integer getPendingMRNCount();

	Map<String, String> saveMRNIssue(MrnIssueMaster mrnIssueMaster,String status);

	List<MrnMaster> getStoreWisePendingMRN(Integer storeId);

	List<MrnIssueMaster> getMRNList(String type,String type2);
	
	List<MrnIssueMaster> getMRNListForReceive(String storeId);

	List<MrnIssueMaster> getStoreWiseMrnIssue(Integer storeId);

	List<MrnIssueMaster> getAutoSuggestionMRNIssueNumber(String letter);

	List<MrnIssueMaster> getMrnNoWiseMrnIssue(Integer mrnIssueId);

	List<MrnMaster> getStoreWiseMrnList(Integer storeId);

	List<MrnMaster> getAutoSuggestionMRNNumber(String letter);

	MrnMaster editMrn(Integer mrnId);

	MrnMaster mrnPrint(Integer mrnId);

	String setApprovalStatus(Integer[] mrnIdArray, String userId);

	Map<String, JSONArray> fetchStock(Integer storeId);

	MrnIssueMaster mrnIssuePrint(Integer mrnIssueId);

	Map<String, JSONArray> getStoreDetailsByStoreName(String storeName);

	void deleteMRN(Integer mrnId);

	MrnIssueMaster editMrnIssue(Integer mrnIssueId);
	
	MrnMaster editStoreMrnForReceive(Integer mrnIssueId);

	JSONArray getPendingMRNDetailsByMrnId(Integer mrnId);
	
	List<MrnMaster> getStoreWiseMrnByStoreId(Integer storeId);

	boolean deleteMRNIssueById(int mrnIssueId, HttpServletRequest request);

}
