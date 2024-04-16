package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.FolderDocDao;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.PatientDocSlaveDto;
import com.hms.ehat.dto.ShelfDocDto;
import com.hms.ehat.service.FolderDocService;

@Service
public class FolderDocServiceImpl implements FolderDocService{

	@Autowired
	FolderDocDao folderdocdao;
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public int  saveorUpdateFolderDoc(FolderDocDto folderobj,HttpServletRequest request) {
		
		String sql="";
		sql="SELECT count(*) from ehat_folder_doc f where f.deleted='N' and f.folder_name='"+folderobj.getFolderName()+"' and f.department="+folderobj.getDepartMent();
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
		int count = ((Number)countQuery.uniqueResult()).intValue();
		int  response=0;
		if (folderobj.getFolderId() == 0)
		{
			//sql="SELECT count(*) from ehat_folder_doc f where f.deleted='N' and f.folder_name='"+folderobj.getFolderName()+"' and f.department="+folderobj.getDepartMent();
			//Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   /*spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails){		    	
				   
				   FolderDocDto obj = new FolderDocDto();	    	
		    	
				 String foldeName= ((String)row.get("folder_name"));
				 
				 if(foldeName.equalsIgnoreCase(folderobj.getFolderName()))
				 {
					 return 3;
				 }
			   }*/			
			
			if(count > 0){
				return 3;
			}else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			folderobj.setCreatedBy(userId);
			folderobj.setCreatedDate(new Date(new java.util.Date().getTime()));				
			response = folderdocdao.saveorUpdateFolderDoc(folderobj);					 
			   return response;
			}
		
		}
		else{
			
			/*sql="SELECT f.folder_name from ehat_folder_doc f  where f.deleted='N' and f.department="+folderobj.getDepartMent();
			Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails){
		    	
				   FolderDocDto obj = new FolderDocDto();	    	
		    	
				 String foldeName= ((String)row.get("folder_name"));
				 if(foldeName.equalsIgnoreCase(folderobj.getFolderName()))
				 {
					 return 3;
				 }
			   }	*/	
			String sql1="";
			sql1="SELECT count(*) from ehat_folder_doc f where f.deleted='N' and f.folder_name='"+folderobj.getFolderName()+"' and f.department="+folderobj.getDepartMent()+" and  f.folder_doc_id not in("+folderobj.getFolderId()+")";
			Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);	
			int count1 = ((Number)countQuery1.uniqueResult()).intValue();			
			if(count1 > 0){
				return 3;
			}else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			folderobj.setUpdatedBy(userId);			
			folderobj.setUpdatedDate(new Date(new java.util.Date().getTime()));					
			response = folderdocdao.saveorUpdateFolderDoc(folderobj);			
			return response;
			}
		}
		
	}

	@Override
	@Transactional
	public List<FolderDocDto> getAllFolderDoc(HttpServletRequest request) {
		
		return folderdocdao.getAllFolderDoc();
	}

	@Override
	@Transactional
	public FolderDocDto editFolderDoc(Integer folderId) {
		
		return folderdocdao.editFolderfDoc(folderId);
	}

	@Override
	@Transactional
	public boolean deleteFolderfDoc(Integer folderId, HttpServletRequest request) {
		FolderDocDto obj=	(FolderDocDto)sessionFactory.getCurrentSession().get(FolderDocDto.class, folderId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return folderdocdao.deleteFolderDoc(obj);
	}

}
