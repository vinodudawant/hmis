package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.StoreMrnDao;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.MrnIssueMaster;
import com.hms.pharmacy.pojo.MrnMaster;
import com.hms.pharmacy.pojo.MrnSlave;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.DocumentNumberingService;
import com.hms.pharmacy.service.StoreMrnService;

@Service
public class StoreMrnServiceImpl implements StoreMrnService {

	@Autowired
	StoreMrnDao storeMrnDao;

	@Autowired
	DocumentNumberingService docNumberingService;

	@Autowired
	CommonService commonService;

	@Override
	@Transactional
	public Integer getNextAutoIncrement() {
		return storeMrnDao.getNextAutoIncrement();
	}

	@Override
	@Transactional
	public boolean saveOrUpdateMRN(MrnMaster mrnMaster) {
		Boolean flag = false;
		mrnMaster.setMrnDeleteFlag(0);
		mrnMaster.setMrnUpdateDate(new Date(new java.util.Date().getTime()));

		if (mrnMaster.getMrnId() == null) {
			if (mrnMaster.getMrnSlaves()
					.get(mrnMaster.getMrnSlaves().size() - 1)
					.getProductMaster().getProductId() == null) {
				mrnMaster.getMrnSlaves().remove(
						mrnMaster.getMrnSlaves().size() - 1);
			}
			if (mrnMaster.getMrnSlaves()
					.get(mrnMaster.getMrnSlaves().size() - 1)
					.getProductMaster().getProductId() == null) {
				mrnMaster.getMrnSlaves().remove(
						mrnMaster.getMrnSlaves().size() - 1);
			}

			List<MrnSlave> mrnSlaves = new ArrayList<MrnSlave>();
			List<MrnSlave> mrnSlaves1 = mrnMaster.getMrnSlaves();
			for (MrnSlave poSlave : mrnSlaves1) {
				if (poSlave.getProductMaster().getProductId() != null) {
					mrnSlaves.add(poSlave);
				}
			}

			mrnMaster.setMrnSlaves(mrnSlaves);

			// add sr. no
			Integer cnt = 0;
			List<MrnSlave> mrnSlaves2 = new ArrayList<MrnSlave>();
			for (MrnSlave newMrnSlave : mrnMaster.getMrnSlaves()) {
				cnt++;
				newMrnSlave.setMrnSlaveSr(cnt);
				mrnSlaves2.add(newMrnSlave);
			}

			// update document numbering
			if (mrnMaster.getMrnId() == null) {
				mrnMaster.setMrnDocId(commonService.getDocumentNumber(2));
				DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
				DocumentMaster documentMaster = new DocumentMaster();
				documentMaster.setDocId(2);
				docNumberingMaster.setDocumentMaster(documentMaster);
				docNumberingService.updateDocumentNumbering(docNumberingMaster);
			} else {

			}

			try {
				flag = storeMrnDao.saveOrUpdateMRN(mrnMaster);
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		} else {
			try {

				// add sr. no
				Integer cnt = 0;
				List<MrnSlave> mrnSlaves2 = new ArrayList<MrnSlave>();
				for (MrnSlave newMrnSlave : mrnMaster.getMrnSlaves()) {
					cnt++;
					newMrnSlave.setMrnSlaveSr(cnt);
					mrnSlaves2.add(newMrnSlave);
				}

				flag = storeMrnDao.saveOrUpdateMRN(mrnMaster);
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}

		return flag;
	}

	@Override
	@Transactional
	public boolean saveReceiveMrn(MrnMaster mrnMaster) {
		Boolean flag = true;
		boolean statusResult = false;
		try {
			List<MrnSlave> mrnSlaves2 = new ArrayList<MrnSlave>();
			for (MrnSlave newMrnSlave : mrnMaster.getMrnSlaves()) {
				storeMrnDao.changeQtyForIssueMRN(
						newMrnSlave.getMrnSlavePendingQty(),
						newMrnSlave.getMrnSlaveQty(),
						newMrnSlave.getMrnSlaveId());
			}

			flag = storeMrnDao.saveReceiveMrn(mrnMaster);

			if (mrnMaster.getMrnId() != 0) {
				Integer count = storeMrnDao.getMRNSlaveStatus(mrnMaster
						.getMrnId());
				if (count == 0) {
					statusResult = storeMrnDao.changeMRNMasterStatus(
							"complete", mrnMaster.getMrnId());
				} else {
					statusResult = storeMrnDao.changeMRNMasterStatus(
							"In Process", mrnMaster.getMrnId());
				}
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return flag;
	}

	@Override
	@Transactional
	public List<MrnMaster> getMrnList(String type) {
		return storeMrnDao.getMrnList(type);
	}

	@Override
	@Transactional
	public List<MrnMaster> getPendingMRN() {
		return storeMrnDao.getPendingMRN();
	}

	@Override
	@Transactional
	public MrnMaster getMRNDetailsByMrnId(Integer mrnId) {
		return storeMrnDao.getMRNDetailsByMrnId(mrnId);
	}

	@Override
	@Transactional
	public Integer getPendingMRNCount() {
		return storeMrnDao.getPendingMRNCount();
	}

	@Override
	@Transactional
	public Map<String, String> saveMRNIssue(MrnIssueMaster mrnIssueMaster,
			String status) {

		Map<String, String> result = new HashMap<String, String>();
		boolean statusResult = false;

		String str = "";
		result = storeMrnDao.saveMRNIssue(mrnIssueMaster, status);
		str = result.get("result");

		if (status.equals("off")) 
		{
			if (mrnIssueMaster.getMrnMaster().getMrnId() != 0) {

				Integer count = storeMrnDao.getMRNSlaveStatus(mrnIssueMaster
						.getMrnMaster().getMrnId());
				if (count == 0) {
					statusResult = storeMrnDao.changeMRNMasterStatus(
							"complete", mrnIssueMaster.getMrnMaster()
									.getMrnId());
				} else {
					statusResult = storeMrnDao.changeMRNMasterStatus(
							"In Process", mrnIssueMaster.getMrnMaster()
									.getMrnId());
				}
			}
		}

		if (str.equals("Record Save Succesfully")) {
			mrnIssueMaster.setMrnIssueDocNo(commonService.getDocumentNumber(2));
			DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
			DocumentMaster documentMaster = new DocumentMaster();
			documentMaster.setDocId(2);
			docNumberingMaster.setDocumentMaster(documentMaster);
			docNumberingService.updateDocumentNumbering(docNumberingMaster);
		}
		return result;

	}

	@Override
	@Transactional
	public List<MrnMaster> getStoreWisePendingMRN(Integer storeId) {
		return storeMrnDao.getStoreWisePendingMRN(storeId);
	}

	@Override
	@Transactional
	public List<MrnIssueMaster> getMRNList(String type, String type2) {
		return storeMrnDao.getMRNList(type, type2);
	}

	@Override
	@Transactional
	public List<MrnIssueMaster> getMRNListForReceive(String StoreId) {
		return storeMrnDao.getMRNListForReceive(StoreId);
	}

	@Override
	@Transactional
	public List<MrnIssueMaster> getStoreWiseMrnIssue(Integer storeId) {
		return storeMrnDao.getStoreWiseMrnIssue(storeId);
	}

	@Override
	@Transactional
	public List<MrnIssueMaster> getAutoSuggestionMRNIssueNumber(String letter) {
		return storeMrnDao.getAutoSuggestionMRNIssueNumber(letter);
	}

	@Override
	@Transactional
	public List<MrnIssueMaster> getMrnNoWiseMrnIssue(Integer mrnIssueId) {
		return storeMrnDao.getMrnNoWiseMrnIssue(mrnIssueId);
	}

	@Override
	@Transactional
	public List<MrnMaster> getStoreWiseMrnList(Integer storeId) {
		return storeMrnDao.getStoreWiseMrnList(storeId);
	}

	@Override
	@Transactional
	public List<MrnMaster> getAutoSuggestionMRNNumber(String letter) {
		return storeMrnDao.getAutoSuggestionMRNNumber(letter);
	}

	@Override
	@Transactional
	public MrnMaster editMrn(Integer mrnId) {
		return storeMrnDao.editMrn(mrnId);
	}

	@Override
	@Transactional
	public MrnMaster mrnPrint(Integer mrnId) {
		return storeMrnDao.mrnPrint(mrnId);
	}

	@Override
	@Transactional
	public String setApprovalStatus(Integer[] mrnIdArray, String userId) {
		return storeMrnDao.setApprovalStatus(mrnIdArray, userId);
	}

	@Override
	@Transactional
	public Map<String, JSONArray> fetchStock(Integer storeId) {
		JSONArray list = new JSONArray();
		Map<String, JSONArray> batchData = new HashMap<String, JSONArray>();
		JSONArray jsonArray = storeMrnDao.fetchStock(storeId);
		batchData.put("result", jsonArray);
		return batchData;
	}

	@Override
	@Transactional
	public MrnIssueMaster mrnIssuePrint(Integer mrnIssueId) {
		return storeMrnDao.mrnIssuePrint(mrnIssueId);
	}

	@Override
	@Transactional
	public Map<String, JSONArray> getStoreDetailsByStoreName(String storeName) {
		JSONArray list = new JSONArray();
		Map<String, JSONArray> storeData = new HashMap<String, JSONArray>();
		JSONArray jsonArray = storeMrnDao.getStoreDetailsByStoreName(storeName);
		storeData.put("result", jsonArray);
		return storeData;
	}

	@Override
	@Transactional
	public void deleteMRN(Integer mrnId) {
		storeMrnDao.deleteMRN(mrnId);
	}

	@Override
	@Transactional
	public MrnIssueMaster editMrnIssue(Integer mrnIssueId) {
		return storeMrnDao.editMrnIssue(mrnIssueId);
	}

	@Override
	@Transactional
	public MrnMaster editStoreMrnForReceive(Integer mrnIssueId) {
		return storeMrnDao.editStoreMrnForReceive(mrnIssueId);
	}

	@Override
	@Transactional
	public JSONArray getPendingMRNDetailsByMrnId(Integer mrnId) {
		return storeMrnDao.getPendingMRNDetailsByMrnId(mrnId);
	}

	@Override
	@Transactional
	public List<MrnMaster> getStoreWiseMrnByStoreId(Integer storeId) {
		return storeMrnDao.getStoreWiseMrnByStoreId(storeId);
	}

	@Override
	@Transactional
	public boolean deleteMRNIssueById(int mrnIssueId, HttpServletRequest request) {
		
		return storeMrnDao.deleteMRNIssueById(mrnIssueId,request);
	}

}
