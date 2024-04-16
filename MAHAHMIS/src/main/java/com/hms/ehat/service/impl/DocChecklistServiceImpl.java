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

import com.hms.ehat.dao.DocChecklistDao;
import com.hms.ehat.dto.DocChecklistDto;
import com.hms.ehat.dto.ShelfDocDto;
import com.hms.ehat.service.DocChecklistService;

@Service
public class DocChecklistServiceImpl implements DocChecklistService {

	@Autowired
	DocChecklistDao doccheklistdao;
	
	@Autowired
	SessionFactory sessionFactory;
	@Override
	@Transactional
	public int saveorUpdateDocChecklist(DocChecklistDto docobj,
			HttpServletRequest request) {
		String sql="";
		sql="SELECT  count(*) from ehat_checklist_doc c where c.deleted='N' and c.doc_name='"+docobj.getDocName()+"' and  c.department="+docobj.getDepartMent();
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if (docobj.getDocId() == 0)
		{		
			docobj.setDocName(docobj.getDocName());
			//Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			  /* spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails)
			   {	
				 String docName= ((String)row.get("doc_name"));
				 if(docName.equalsIgnoreCase(docobj.getDocName()))
				 {
					 System.err.println("inside if....");

					 return 3;
				 }
			   }*/
			
			if(count > 0){
				return 3;
			}
			else{			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			docobj.setCreatedBy(userId);
			docobj.setCreatedBy(docobj.getCreatedBy());
			docobj.setCreatedDate(new Date(new java.util.Date().getTime()));			
			int response = doccheklistdao.saveorUpdateDocchecklist(docobj);			
			return response;
			}
		}
		else{
			/*sql="SELECT c.doc_name from ehat_checklist_doc c where c.department="+docobj.getDepartMent();
			Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails)
			   {	
				 String docName= ((String)row.get("doc_name"));
				 if(docName.equalsIgnoreCase(docobj.getDocName()))
				 {
					 System.err.println("inside if....");

					 return 3;
				 }
			   }
			*/
			String sql1="";
			sql1="SELECT  count(*) from ehat_checklist_doc c where c.deleted='N' and c.doc_name='"+docobj.getDocName()+"' and  c.department="+docobj.getDepartMent();
			Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			
			int count1 = ((Number)countQuery1.uniqueResult()).intValue();
			if(count1 > 0){
				return 3;
			}else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			docobj.setUpdatedBy(userId);
			docobj.setUpdatedBy(docobj.getUpdatedBy());
			docobj.setUpdatedDate(new Date(new java.util.Date().getTime()));			
			int response = doccheklistdao.saveorUpdateDocchecklist(docobj);			
			return response;
			}
		}
	}

	@Override
	@Transactional
	public List<DocChecklistDto> getAllDocChecklist(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return doccheklistdao.getAllDocCheckList();
	}

	@Override
	@Transactional
	public DocChecklistDto editDocChecklist(Integer docId) {
		// TODO Auto-generated method stub
		return doccheklistdao.editDocChecklist(docId);
	}

	@Override
	@Transactional
	public boolean deletefDocChecklist(Integer docId, HttpServletRequest request) {
		DocChecklistDto obj=	(DocChecklistDto)sessionFactory.getCurrentSession().get(DocChecklistDto.class, docId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return doccheklistdao.deleteDocChecklist(obj);
	}

}
