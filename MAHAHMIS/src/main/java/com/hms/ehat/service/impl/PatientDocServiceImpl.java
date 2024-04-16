package com.hms.ehat.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.DocMasterDto;
import com.hms.ehat.dao.PatientDocDao;
import com.hms.ehat.dto.FileUpdationDto;
import com.hms.ehat.dto.PatientDocMasterDto;
import com.hms.ehat.dto.PatientDocSlaveDto;
import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.RoomMasterDto;
import com.hms.ehat.dto.ShelfDocDto;
import com.hms.ehat.service.PatientDocService;

@Service
public class PatientDocServiceImpl implements PatientDocService{
	@Autowired
	SessionFactory sessionfactory;
	@Autowired
	PatientDocDao patientdocdao;
	
	@Override
	@Transactional
	public int savePatientDoc(PatientDocMasterDto objmaster, String docId,FileUpdationDto fileobj) {						
		int response = 0;
		if (objmaster.getPatientDocId() == 0) {
			
			
				List<PatientDocSlaveDto> list = lstPatientDocSlave(docId);
				objmaster.setLstPatintSalve(list);
				objmaster.setCreatedDate(new Date(new java.util.Date().getTime()));
				String storagelocation = "";
				
				RoomMasterDto rmobj = (RoomMasterDto) sessionfactory.getCurrentSession().get(RoomMasterDto.class,objmaster.getRoomID());
				RackMasterDto rackobj = (RackMasterDto) sessionfactory.getCurrentSession().get(RackMasterDto.class,objmaster.getRackId());
				ShelfDocDto shelobj = (ShelfDocDto) sessionfactory.getCurrentSession().get(ShelfDocDto.class,objmaster.getShelfId());
				storagelocation = rmobj.getRoomName() + "/" + rackobj.getRackName()	+ "/" + shelobj.getShelDocName();
				objmaster.setStorageLocation(storagelocation);			
				
				String sql = "select count(*) from ehat_patient_doc_master e where e.room_id="+ objmaster.getRoomID()+ " and e.rack_id="+ objmaster.getRackId()	+ " and e.shelf_id="+ objmaster.getShelfId();
				Query countQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);
				int count = ((Number) countQuery.uniqueResult()).intValue();
				
				String sql1 = "select e.file_count from ehat_shelf_doc e where e.room_id="+ objmaster.getRoomID()+ " and e.rack_id="+ objmaster.getRackId()+ " and e.shelf_doc_id="+ objmaster.getShelfId();
				Query countfile = sessionfactory.getCurrentSession().createSQLQuery(sql1);			
				int countFile = ((Number) countfile.uniqueResult()).intValue();
				
				if (count < countFile) {				
					response = patientdocdao.savePatientDoc(objmaster);
				} else {
					response = 3;
				}
				

		} else {

			List<PatientDocSlaveDto> list = lstPatientDocSlave(docId);
			objmaster.setLstPatintSalve(list);
			objmaster.setUpdatedDate(new Date(new java.util.Date().getTime()));
			objmaster.setUpdatedBy(objmaster.getCreatedBy());			
			String storagelocation = "";
			
			RoomMasterDto rmobj = (RoomMasterDto) sessionfactory.getCurrentSession().get(RoomMasterDto.class,objmaster.getRoomID());
			RackMasterDto rackobj = (RackMasterDto) sessionfactory.getCurrentSession().get(RackMasterDto.class,objmaster.getRackId());
			ShelfDocDto shelobj = (ShelfDocDto) sessionfactory.getCurrentSession().get(ShelfDocDto.class,objmaster.getShelfId());
			storagelocation = rmobj.getRoomName() + "/" + rackobj.getRackName()	+ "/" + shelobj.getShelDocName();
			objmaster.setStorageLocation(storagelocation);
			
			PatientDocMasterDto obj = getPatientDocObj(objmaster.getPatientDocId());			
			fileobj.setCreatedDate(new Date(new java.util.Date().getTime()));
			fileobj.setCreatedBy(objmaster.getCreatedBy());
			fileobj.setObj(obj);
			
			String sql = "select count(*) from ehat_patient_doc_master e where e.deleted='N' and e.room_id="+ objmaster.getRoomID()+ " and e.rack_id="+ objmaster.getRackId()	+ " and e.shelf_id="+ objmaster.getShelfId();
			Query countQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);
			int count = ((Number) countQuery.uniqueResult()).intValue();
			
			String sql1 = "select e.file_count from ehat_shelf_doc e where e.deleted='N' and e.room_id="+ objmaster.getRoomID()+ " and e.rack_id="+ objmaster.getRackId()+ " and e.shelf_doc_id="+ objmaster.getShelfId();
			Query countfile = sessionfactory.getCurrentSession().createSQLQuery(sql1);
			int countFile = ((Number) countfile.uniqueResult()).intValue();			
			
			if (count < countFile) {
				patientdocdao.saveFileUpdationDto(fileobj);
				response = patientdocdao.savePatientDoc(objmaster);
			} else {
				response = 3;
			}
		}

		return response;
		
	}
	@Transactional
	public List<PatientDocSlaveDto> lstPatientDocSlave(String docId){
	  
		String sql = "";
		List<PatientDocSlaveDto> tlist=new ArrayList<PatientDocSlaveDto>();		
		
		try{			
			sql = "select e.doc_id,e.doc_name from ehat_checklist_doc e where e.deleted='N' and e.doc_id in("+docId+")";			
			Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
			spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			for(Map<String, Object> row : listSpDetails){
		    	
				PatientDocSlaveDto obj = new PatientDocSlaveDto();		    
		    	obj.setDocId((Integer)row.get("doc_id"));
		    	obj.setDocName((String)row.get("doc_name"));
		    	
		    	tlist.add(obj);
		    	obj=null;	    	
			}			
		}catch(Exception e){
			
			e.printStackTrace();
		}
		return tlist;	  
	}
	@Override
	@Transactional
	public List<PatientDocSlaveDto> viewPatientDocDetails(Integer patientDocId,String callFrom) {
		return patientdocdao.viewPatientDocDetails(patientDocId,callFrom);
	}
	@Override
	@Transactional
	public Set<Integer> getAllPatientTreatmentByPatientId(Integer patientId) {		
		return patientdocdao.getAllPatientTreatmentByPatientId(patientId);
	}
	@Override
	@Transactional
	public List<PatientDocMasterDto> getPatientDetailByShelf(Integer shelfID) {		
		return patientdocdao.getPatientDetailByShelf(shelfID);
	}
	@Override
	@Transactional
	public boolean deletePatientfDocDetailByDocID(Integer docId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		Query query =sessionfactory.getCurrentSession().createSQLQuery("update ehat_patient_doc_slave set deleted='Y',deleted_by="+userId+",delete_date_time=now() where doc_id in("+docId+")");
		query.executeUpdate();
		PatientDocMasterDto obj=	(PatientDocMasterDto)sessionfactory.getCurrentSession().get(PatientDocMasterDto.class, docId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		obj.setDeletedBy(userId);
		return patientdocdao.deletePatientfDocDetailByDocID(obj);
	}
	
	@Transactional
	PatientDocMasterDto getPatientDocObj(Integer patDocId)	{
		PatientDocMasterDto obj=(PatientDocMasterDto) sessionfactory.getCurrentSession().get(PatientDocMasterDto.class, patDocId);
		return obj;
		
	}
	@Override
	@Transactional
	public List<DocMasterDto> getAllTreatMentByPatientId(Integer deptId,Integer patId, String callform) {		
		return patientdocdao.getAllTreatMentByPatientId(deptId, patId, callform);
	}
	@Override
	@Transactional
	public List<Integer> getCountDetailOfDMSAndMRD(String fromDate,String toDate) {		
		return patientdocdao.getCountDetailOfDMSAndMRD(fromDate, toDate);
	}
	@Override
	@Transactional
	public int getTreatMentCount(Integer treatmentId) {
		String treasql = "select count(*) from ehat_patient_doc_master e where e.treatment_id="+treatmentId+" and e.deleted='N'" ;
		Query treatcountQuery = sessionfactory.getCurrentSession().createSQLQuery(treasql);
		int tratcount = ((Number) treatcountQuery.uniqueResult()).intValue();	
		
		return tratcount;
	}
}
