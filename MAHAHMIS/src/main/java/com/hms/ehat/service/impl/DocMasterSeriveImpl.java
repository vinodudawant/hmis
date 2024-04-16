package com.hms.ehat.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.DocMasterDto;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dao.DocMasterDao;
import com.hms.ehat.dto.DocChecklistDto;
import com.hms.ehat.dto.PatientDocMasterDto;
import com.hms.ehat.dto.PatientDocSlaveDto;
import com.hms.ehat.service.DocMasterService;

@Service
public class DocMasterSeriveImpl implements DocMasterService{
	@Autowired
	DocMasterDao documentdao;
	@Autowired
	SessionFactory sessionFactory;
	@Override
	@Transactional
	public List<DocMasterDto> getAllTreatMentByPatientId(Integer deptId,
			Integer patID, String Callform) {
		List<DocMasterDto> tlist=	documentdao.getAllTreatMentByPatientId(deptId, patID, Callform);
		// TODO Auto-generated method stub
		return tlist;
	}

	@Override
	@Transactional
	public List<DocUploadDto> getPatientDocDeatil(String fromDate, String toDate,String callform,DocUploadDto docobj, String byname1, String patSearchType) {
		// TODO Auto-generated method stub
		
		List<DocUploadDto> tlist=documentdao.getPatientDocDeatil(fromDate, toDate,callform,docobj, byname1, patSearchType);
		return tlist;
	}

	@Override
	@Transactional
	public int savePatientDocument(DocUploadDto docobj){
				
		int res = documentdao.savePatientDocument(docobj);
		return res;
	}

	@Override
	@Transactional
	public boolean deleteDocDetails(Integer docId, HttpServletRequest request) {
		
		DocUploadDto obj=	(DocUploadDto)sessionFactory.getCurrentSession().get(DocUploadDto.class, docId);
		obj.setDeleted("Y");
		obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		return documentdao.deleteDocDetails(obj);
	}
	@Override
	@Transactional
	public List<PatientDocSlaveDto> getPatientDetailsByTreatment(Integer treatmentId) {
		// TODO Auto-generated method stub
		List<PatientDocSlaveDto> list=new ArrayList<PatientDocSlaveDto>();
		return list=documentdao.getPatientDetailsByTreatment(treatmentId);
	}

	@Override
	@Transactional
	public List<PatientDocMasterDto> getAllPatientDocDeatil(String fromDate,
			String toDate, String byname1, String patSearchType) {
		// TODO Auto-generated method stub
		return documentdao.getAllPatientDocDeatil(fromDate, toDate, byname1, patSearchType);
	}

	@Override
	@Transactional
	public List<DocUploadDto> getAllTreatmentDetailsByPatientId(
			Integer patientId) {
		
		return documentdao.getAllTreatmentDetailsByPatientId(patientId);
	}

	@Override
	@Transactional
	public  boolean deletePatientDocByPatientDocId(Integer patientDocId,HttpServletRequest request) {
		PatientDocMasterDto obj=(PatientDocMasterDto)sessionFactory.getCurrentSession().get(PatientDocMasterDto.class, patientDocId);
		
		HttpSession session1 = request.getSession();
		Integer userId1 = (Integer) session1.getAttribute("userId1");
		Query query =sessionFactory.getCurrentSession().createSQLQuery("update ehat_patient_doc_slave set deleted='Y',deleted_by="+userId1+",delete_date_time=now() where master_id	 in("+patientDocId+")");
		query.executeUpdate();
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		// TODO Auto-generated method stub
		return documentdao.deletePatientDocByPatientDocId(obj);
	}
	@Override
	@Transactional
	public List<DocChecklistDto> getPatientDetailsByTreatment1(Integer treatmentId)
	{
		
		
		return documentdao.getPatientDetailsByTreatment1(treatmentId);
	}

	@Override
	@Transactional
	public DocChecklistDto getAllUploadDocDetailBytreatment(
			Integer treatmentId) {
		// TODO Auto-generated method stub
		return documentdao.getAllUploadDocDetailBytreatment(treatmentId);
	}

	@Override
	@Transactional
	public List<DocMasterDto> fetchPatientsRecordByTreatmentIdForBarcode(
			Integer treatmentId) {
		// TODO Auto-generated method stub
		return documentdao.fetchPatientsRecordByTreatmentIdForBarcode(treatmentId);
	}

	
	
}
