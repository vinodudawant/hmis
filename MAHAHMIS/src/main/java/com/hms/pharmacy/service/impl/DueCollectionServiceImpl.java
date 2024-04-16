package com.hms.pharmacy.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.CreditNoteDao;
import com.hms.pharmacy.dao.DueCollectionDao;
import com.hms.pharmacy.pojo.CreditNoteMaster;
import com.hms.pharmacy.pojo.settalBillIndent;
import com.hms.pharmacy.service.CreditNoteService;
import com.hms.pharmacy.service.DueCollectionService;

@Service
public class DueCollectionServiceImpl implements DueCollectionService
{
	@Autowired
	DueCollectionDao dueCollectionDao;
	
	@Override
	@Transactional
	public List<CreditNoteMaster> getDueCollectionNoteList() {
		List<CreditNoteMaster> creditNote=dueCollectionDao.getDueCollectionNoteList();
				
		List<CreditNoteMaster> creditNotes=dueCollectionDao.getUniqueDueCollectionNoteList(creditNote);	
		
		return creditNotes;
		
	}
	
	@Override
	@Transactional
	public boolean savePatientPendingAmount(Integer treatmentId,Double amountReceive,Double dis,Double balance) 
	{
		return dueCollectionDao.savePatientPendingAmount(treatmentId,amountReceive,dis,balance);
	}
	
	@Override
	@Transactional
	public boolean saveIndentPatientPendingAmount(Integer treatmentId,Double amountReceive,Double dis,Double balance) 
	{
		return dueCollectionDao.saveIndentPatientPendingAmount(treatmentId,amountReceive,dis,balance);
	}
	
	@Override
	@Transactional
	public settalBillIndent getPatientDatabyPatientId(
			Integer patientId) {
		return dueCollectionDao.getPatientDatabyPatientId(patientId);
	}
	
	@Override
	@Transactional
	public boolean savePatientTotalBill(Integer treatmentId,Double balance) 
	{
		return dueCollectionDao.savePatientTotalBill(treatmentId,balance);
	}
	
	@Override
	@Transactional
	public boolean saveIndentTotalBill(Integer treatmentId,Double balance) 
	{
		return dueCollectionDao.saveIndentTotalBill(treatmentId,balance);
	}
}
