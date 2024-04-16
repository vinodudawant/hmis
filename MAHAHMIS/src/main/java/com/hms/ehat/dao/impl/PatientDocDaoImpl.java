package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.DocMasterDto;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dao.PatientDocDao;
import com.hms.ehat.dto.FileUpdationDto;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.PatientDocMasterDto;
import com.hms.ehat.dto.PatientDocSlaveDto;

@Repository
public class PatientDocDaoImpl implements PatientDocDao{
	@Autowired
	SessionFactory sessionfactory;
	@Override
	public int savePatientDoc(PatientDocMasterDto objmaster) {
		
		try{  
			if(objmaster.getPatientDocId()==0){
				
				sessionfactory.getCurrentSession().merge(objmaster);
				return 1;
			}else{
				
				sessionfactory.getCurrentSession().merge(objmaster);
				return 2;
			}
			
		}catch(Exception e){
			
			e.printStackTrace();
		}
		return 0;
	}
	@Override
	public List<PatientDocSlaveDto> viewPatientDocDetails(Integer patientDocId,String callFrom) {
		
		String sql="";
		List<PatientDocSlaveDto> tlist=new ArrayList<PatientDocSlaveDto>();
		
		//Set<Integer> treatlist=getAllPatientTreatmentByPatientId(patientDocId);
		
		List<PatientDocMasterDto> treatlist=getAllPatientTreatmentByPatientId1(patientDocId);
		PatientDocSlaveDto obj = new PatientDocSlaveDto();
		obj.setLstPatintMast(treatlist);
		//List<Integer> treatlist1=new ArrayList<Integer>(treatlist);
	     int treatmetnt=treatlist.get(0).getTreatmentId();	    
		try{
			
			if(callFrom.equals("onload")){
			
				 sql = " SELECT m.room_id,m.rack_id,m.filetype,m.duration, m.patient_id,m.patient_name,m.shelf_id,m.treatment_id,m.created_date_time,m.barcode,m.patient_doc_id"
						 +" FROM ehat_patient_doc_master m   where m.deleted='N' and m.treatment_id="+treatmetnt;
			}else{
				
				sql = " SELECT m.room_id,m.rack_id,m.filetype,m.duration, m.patient_id,m.patient_name,m.shelf_id,m.treatment_id,m.created_date_time,m.barcode,m.patient_doc_id"
						 +" FROM ehat_patient_doc_master m   where m.deleted='N' and m.treatment_id="+patientDocId;
			}
			    
			Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
			spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			for(Map<String, Object> row : listSpDetails){
	    	
					
	    	    obj.setPatientDocId((Integer)row.get("patient_doc_id"));
				obj.setPatientId((Integer)row.get("patient_id"));
				obj.setPatientName((String)row.get("patient_name"));
				obj.setRoomID((Integer)row.get("room_id"));
				obj.setRackId((Integer)row.get("room_id"));
				obj.setFiletype((Integer)row.get("filetype"));
				obj.setDuration((String)row.get("duration"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setPatientDocId((Integer)row.get("patient_doc_id"));
				obj.setBarcode((String)row.get("barcode"));
				obj.setShelFId((Integer)row.get("shelf_id"));
				obj.setCreatedDate((Date)row.get("created_date_time"));
				
               	tlist.add(obj);
               	obj=null;	    	
			}		
			  
		}catch(Exception e){
			
			e.printStackTrace();
		}
		return tlist;
	}
	@Override
	public Set<Integer> getAllPatientTreatmentByPatientId(
			Integer patientId) {
		
		List<PatientDocMasterDto> tlist=new ArrayList<PatientDocMasterDto>();
		Set<Integer> tlist1=new HashSet<Integer>();
		
		try
		{
		Criteria criteria=sessionfactory.getCurrentSession().createCriteria(PatientDocMasterDto.class);
		criteria.add(Restrictions.eq("patientId", patientId));
		criteria.setProjection(Projections.property("treatmentId"));
		tlist1=new HashSet<Integer>(criteria.list()) ;
		return tlist1;
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return tlist1;
	}
	@Override
	public List<PatientDocMasterDto> getPatientDetailByShelf(Integer shelfID) {
      String sql="";
  	List<PatientDocMasterDto> tlist=new ArrayList<PatientDocMasterDto>();

      try
      {
    	  sql = " SELECT m.patient_id,m.patient_name,m.shelf_id,m.treatment_id,m.barcode,m.patient_doc_id,m.created_date_time"
					 +" FROM ehat_patient_doc_master m where m.deleted='N' and m.shelf_id="+shelfID +" group by patient_id";   
	  Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
		   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		  List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
		   for(Map<String, Object> row : listSpDetails){
	    	
			   PatientDocMasterDto obj = new PatientDocMasterDto();	    	
	    	
			  
			   	obj.setPatientId((Integer)row.get("patient_id"));
		    	obj.setPatientName((String)row.get("patient_name"));
		    	
		    	obj.setTreatmentId((Integer)row.get("treatment_id"));
		    	obj.setPatientDocId((Integer)row.get("patient_doc_id"));
               obj.setBarcode((String)row.get("barcode"));
               obj.setShelfId((Integer)row.get("shelf_id"));
               obj.setCreatedDate((Date)row.get("created_date_time"));
		    	tlist.add(obj);
		    	obj=null;	    	
		   }		
    	  
    	  
      }catch(Exception e)
      {
    	  
      }

		return tlist;
	}
	@Override
	public boolean deletePatientfDocDetailByDocID(PatientDocMasterDto obj) {
		try{
			sessionfactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
	public List<PatientDocMasterDto> getAllPatientTreatmentByPatientId1(Integer patientId)
	{
		  String sql="";
		  	List<PatientDocMasterDto> tlist=new ArrayList<PatientDocMasterDto>();

		      try
		      {
		    	  sql = " SELECT m.patient_id,m.patient_name,m.shelf_id,m.treatment_id,m.barcode,m.patient_doc_id,m.created_date_time"
							 +" FROM ehat_patient_doc_master m where m.deleted='N' and m.patient_id="+patientId+" ORDER By m.patient_doc_id DESC" ;   
			  Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
				   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				  List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
				   for(Map<String, Object> row : listSpDetails){
			    	
					   PatientDocMasterDto obj = new PatientDocMasterDto();	    	
			    	
					  
					   	obj.setPatientId((Integer)row.get("patient_id"));
				    	obj.setPatientName((String)row.get("patient_name"));
				    	
				    	obj.setTreatmentId((Integer)row.get("treatment_id"));
				    	obj.setPatientDocId((Integer)row.get("patient_doc_id"));
		               obj.setBarcode((String)row.get("barcode"));
		               obj.setShelfId((Integer)row.get("shelf_id"));
		               obj.setCreatedDate((Date)row.get("created_date_time"));
				    	tlist.add(obj);
				    	obj=null;	    	
				   }		
		    	  
		    	  
		      }catch(Exception e)
		      {
		    	  
		      }

				return tlist;

	}
	@Override
	public int saveFileUpdationDto(FileUpdationDto obj) {
		// TODO Auto-generated method stub
		try
		{
			sessionfactory.getCurrentSession().merge(obj);
			return 1;
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return 0;
	}
	@Override
	public List<DocMasterDto> getAllTreatMentByPatientId(Integer deptId,
			Integer patID, String Callform) {
		List<FolderDocDto> lstFolderDoc=new ArrayList<FolderDocDto>();		
		List<DocMasterDto> tlist=new ArrayList<DocMasterDto>();
		String sql = "";
		try{					
			if(Callform.equals("previous")){
				
				sql = "Select e.patient_id,e.treatment_id,e.created_date_time,e.opdipdno from ehat_treatment e where e.patient_id = "+patID+" and e.t_flag ='N' and e.department_id ="+deptId;
			
			}else if(Callform.equals("current")){
				
				sql = "Select e.patient_id,e.treatment_id,e.created_date_time,e.opdipdno from ehat_treatment e where e.patient_id = "+patID+" and e.t_flag ='Y' and e.department_id ="+deptId;
			
			}else{
				
				if(deptId > 0){
		sql="select t.treatment_id,if(((t.treatment_id=d.treatment_id) and d.deleted='N'),'Y','N') as f_status from ehat_treatment t left join ehat_patient_doc_master d on(t.treatment_id=d.treatment_id) where t.patient_id="+patID+" and t.deleted='N'";
					
				}else{
					
					sql="select t.treatment_id,if(((t.treatment_id=d.treatment_id) and d.deleted='N'),'Y','N') as f_status from ehat_treatment t left join ehat_patient_doc_master d on(t.treatment_id=d.treatment_id) where t.patient_id="+patID+" and t.deleted='N'";
				}				
			}
			Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
			spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			for(Map<String, Object> row : listSpDetails){
		    	
				DocMasterDto obj = new DocMasterDto();
		    	
		    	obj.setPatId((Integer)row.get("patient_id"));
		    	obj.setTreatmentId((Integer)row.get("treatment_id"));
		    	obj.setCreateddate((Date)row.get("created_date_time"));
		    	obj.setOpdipdno((String)row.get("opdipdno"));
		    	obj.setFileStatus((String)row.get("f_status"));
		    	tlist.add(obj);
		    	obj=null;	    	
			}
			
			if(tlist.size() > 0){
				
				Criteria criteria=sessionfactory.getCurrentSession().createCriteria(FolderDocDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				lstFolderDoc = criteria.list();
				tlist.get(0).setLstFoldermaster(lstFolderDoc);
			}
			
		}catch(Exception e){
			
			e.printStackTrace();
		}
		return tlist;
	}
	@Override
	public List<Integer> getCountDetailOfDMSAndMRD(String fromDate,String toDate) {
		
		List<Integer> tcount=new ArrayList<Integer>();
		try
		{
			String fcsql = "SELECT count(*) from ehat_patient_doc_master e where date(e.created_date_time) between  '"+fromDate+"' and '"+toDate+"'";
			Query fccountQuery = sessionfactory.getCurrentSession().createSQLQuery(fcsql);
			int fcreatedCount = ((Number) fccountQuery.uniqueResult()).intValue();
			
			String fdsql = "SELECT count(*) from ehat_patient_doc_master e where e.deleted='Y' and date(e.created_date_time) between  '"+fromDate+"' and '"+toDate+"'";
			Query fdcountQuery = sessionfactory.getCurrentSession().createSQLQuery(fdsql);
			int fdeletedCount = ((Number) fdcountQuery.uniqueResult()).intValue();
			
			String fedsql = "SELECT count(*) from ehat_fileupdation_doc e where e.deleted='N' and date(e.created_date_time) between  '"+fromDate+"' and '"+toDate+"'";
			Query fucountQuery = sessionfactory.getCurrentSession().createSQLQuery(fedsql);
			int feditedCount = ((Number) fucountQuery.uniqueResult()).intValue();
			
			String fupdsql = "SELECT count(*) from ehat_doc_upload e where date(e.created_date_time) between  '"+fromDate+"' and '"+toDate+"'";
			Query fupcountQuery = sessionfactory.getCurrentSession().createSQLQuery(fupdsql);
			int fuploadCount = ((Number) fupcountQuery.uniqueResult()).intValue();		
			
			String fupddsql = "SELECT count(*) from ehat_doc_upload e where e.deleted='Y' and date(e.created_date_time) between  '"+fromDate+"' and '"+toDate+"'";
			Query fupdcountQuery = sessionfactory.getCurrentSession().createSQLQuery(fupddsql);
			int fupdloadCount = ((Number) fupdcountQuery.uniqueResult()).intValue();
					
			tcount.add(fcreatedCount);
			tcount.add(fdeletedCount);
			tcount.add(feditedCount);	
			tcount.add(fuploadCount);
			tcount.add(fupdloadCount);
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return tcount;
	}
}

