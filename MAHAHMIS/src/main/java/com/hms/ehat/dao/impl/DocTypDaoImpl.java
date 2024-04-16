package com.hms.ehat.dao.impl;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.DocTypeDao;


import com.hms.ehat.dto.DocTypDto;
@Repository
public class DocTypDaoImpl implements DocTypeDao{

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveDoctorTypeMaster(DocTypDto docTypDto) {
		// TODO Auto-generated method stub
		int records=0;
		try {
			 sessionFactory.getCurrentSession().merge(docTypDto);
			 records=1;
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	@Override
	public List<DocTypDto> getDoctyp() {
		// TODO Auto-generated method stub
		
		
		List<DocTypDto> listDocTypDto = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DocTypDto.class);
		
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("doctypeId"));
			criteria.setMaxResults(10);
			listDocTypDto = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return listDocTypDto;
		}
		return listDocTypDto;

	}

	@Override
	public int deleteDoctypMaster(Integer dcId,DocTypDto docTypDto) {
		// TODO Auto-generated method stub
		
		
		try {
			DocTypDto DocTypDtodel = (DocTypDto) sessionFactory
					.getCurrentSession().get(DocTypDto.class, dcId);
			System.out.println("fdelected iss===="+ docTypDto.getDeletedBy());
			DocTypDtodel.setDeleted("Y");
			DocTypDtodel.setDeletedBy(docTypDto.getDeletedBy());
			DocTypDtodel.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			DocTypDtodel.setDeletedDate(DocTypDtodel.getDeletedDate());
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	
	}

	@Override
	public List<DocTypDto> getAutodetails(String findingName) {
		// TODO Auto-generated method stub
		
		List<DocTypDto> autosuggestionDTM = null;
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(DocTypDto.class);
	
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.addOrder(Order.desc("doctypeId"));
		criteria.add(Restrictions.like("doctypeName",findingName+"%"));
		autosuggestionDTM = criteria.list();

		return autosuggestionDTM;
	}
}
