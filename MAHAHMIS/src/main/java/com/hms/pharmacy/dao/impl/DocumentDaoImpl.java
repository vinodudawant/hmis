package com.hms.pharmacy.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.DocumentDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DocumentMaster;

@Repository
public class DocumentDaoImpl implements DocumentDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdateDocument(DocumentMaster documentMaster) {
		// TODO Auto-generated method stub
		try {
			
			Integer docId = documentMaster.getDocId();
			if(docId==null) {
				docId=0;
			}
			if(docId==0) {
				Query hql = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM DocumentMaster WHERE docDeleteFlag=0 AND docName= :docName");
				hql.setParameter("docName", documentMaster.getDocName());
				long count =(Long) hql.uniqueResult();
				if(count !=0){	
						return false;
					
				}
				sessionFactory.getCurrentSession().saveOrUpdate(documentMaster);
				
				
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(documentMaster);
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Boolean deleteDocument(Integer documentId) {
		try {
			DocumentMaster doctorMaster = (DocumentMaster) sessionFactory
					.getCurrentSession().get(DocumentMaster.class, documentId);
			doctorMaster.setDocDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	};

	@Override
	public List<DocumentMaster> getAutoSuggestionDocumentNames(String letter) {
		// TODO Auto-generated method stub
		List<DocumentMaster> ltDocumentMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DocumentMaster.class);
			criteria.add(Restrictions.eq("docDeleteFlag", 0));
			criteria.add(Restrictions.like("docName", letter,
					MatchMode.ANYWHERE));
			ltDocumentMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDocumentMasters;
		}
		return ltDocumentMasters;
	}
	@Override
	public List<DocumentMaster> getDocumentById(Integer documentId) {
		// TODO Auto-generated method stub
		List<DocumentMaster> ltDocumentMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DocumentMaster.class);
			criteria.add(Restrictions.eq("docDeleteFlag", 0));
			if (documentId != 0) {
				criteria.add(Restrictions.eq("docId", documentId));
			}

			ltDocumentMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDocumentMasters;
		}
		return ltDocumentMasters;
	}

	@Override
	public List<DocumentMaster> getDocuments() {
		// TODO Auto-generated method stub
		List<DocumentMaster> ltDocumentMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DocumentMaster.class);
			criteria.add(Restrictions.eq("docDeleteFlag", 0));
			criteria.addOrder(Order.desc("docId"));
			criteria.setMaxResults(10);
			ltDocumentMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDocumentMasters;
		}
		return ltDocumentMasters;
	}
	
	@Override
	public DocumentMaster getDocumentByIdForDate(Integer documentId) {
		
		DocumentMaster documentMaster = new DocumentMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DocumentMaster.class);
			criteria.add(Restrictions.eq("docDeleteFlag", 0));
			if (documentId != 0) {
				criteria.add(Restrictions.eq("docId", documentId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("documentAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
			documentMaster.setDocumentAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return documentMaster;
		}
		return documentMaster;
	}
	
	
	
	
	
}
