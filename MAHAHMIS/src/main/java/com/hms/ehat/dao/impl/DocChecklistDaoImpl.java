package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.DocChecklistDao;
import com.hms.ehat.dto.DocChecklistDto;
import com.hms.ehat.dto.ShelfDocDto;

@Repository
public class DocChecklistDaoImpl implements DocChecklistDao{
	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int saveorUpdateDocchecklist(DocChecklistDto docobj) {
		try {
			if(docobj.getDocId()==0)
			{
			sessionFactory.getCurrentSession().merge(docobj);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(docobj);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	
	}

	@Override
	public List<DocChecklistDto> getAllDocCheckList() {
		List<DocChecklistDto> lstDoc=new ArrayList<DocChecklistDto>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DocChecklistDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		lstDoc=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		// TODO Auto-generated method stub
		return lstDoc;
	}

	@Override
	public DocChecklistDto editDocChecklist(Integer docid) {
		DocChecklistDto obj=new DocChecklistDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DocChecklistDto.class);
			criteria.add(Restrictions.eq("docId", docid));
			obj=(DocChecklistDto) criteria.uniqueResult();
			return obj;
			}
		catch(Exception e)
		{
				e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteDocChecklist(DocChecklistDto docobj) {
		try
		{
			sessionFactory.getCurrentSession().merge(docobj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

}
