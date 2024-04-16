package com.hms.pharmacy.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.DocumentNumberingDao;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;

@Repository
public class DocumentNumberingDaoImpl implements DocumentNumberingDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean deleteDocumentNumbering(Integer documentNumId) {
		// TODO Auto-generated method stub
		try {
			DocumentNumberingMaster docNumMaster = (DocumentNumberingMaster) sessionFactory
					.getCurrentSession().get(DocumentNumberingMaster.class,
							documentNumId);
			docNumMaster.setDocDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	@Override
	public Boolean updateDocumentNumbering(
			DocumentNumberingMaster docNumberingMaster) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DocumentNumberingMaster.class);
			criteria.add(Restrictions.eq("documentMaster.docId", docNumberingMaster.getDocumentMaster().getDocId()));
			criteria.add(Restrictions.eq("docDeleteFlag", 0));
			DocumentNumberingMaster documentNumberingMaster=(DocumentNumberingMaster)criteria.uniqueResult();
			documentNumberingMaster.setDocNo(documentNumberingMaster.getDocNo());
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<DocumentNumberingMaster> getDocumentNumberingById(
			Integer documentNumId) {
		// TODO Auto-generated method stub
		List<DocumentNumberingMaster> ltDocNumMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DocumentNumberingMaster.class);
			criteria.add(Restrictions.eq("docDeleteFlag", 0));
			if (documentNumId != 0) {
				/*criteria.add(Restrictions.eq("documentMaster.docId", documentNumId));*/
				criteria.add(Restrictions.eq("docNumId", 1));
			}

			ltDocNumMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDocNumMasters;
		}
		return ltDocNumMasters;
	}

	@Override
	public List<DocumentNumberingMaster> getDocumentNumberings() {
		List<DocumentNumberingMaster> ltDocNumMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DocumentNumberingMaster.class);
			criteria.add(Restrictions.eq("docDeleteFlag", 0));
			ltDocNumMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDocNumMasters;
		}
		return ltDocNumMasters;
	}

	@Override
	public Boolean saveOrUpdateDocumentNumbering(
			DocumentNumberingMaster documentNumberingMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(
					documentNumberingMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
