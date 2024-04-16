package com.hms.pharmacy.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.HsnDao;
import com.hms.pharmacy.pojo.HsnMaster;

@Repository
public class HsnDaoImpl implements HsnDao {

	@Autowired
	SessionFactory sessionFactory;

	@SuppressWarnings("unused")
	@Override
	public int saveOrUpdateHsn(HsnMaster hsnMaster) {
		int record=0;
		try {
			Integer hsnid= hsnMaster.getHsnId();
			if(hsnid==null) {
				hsnid=0;
			}
			
					
			Query bet = sessionFactory.getCurrentSession().createQuery
					("SELECT count(*) FROM HsnMaster WHERE deleteFlag=1 AND hsnNo= :hsnNo");
			bet.setParameter("hsnNo", hsnMaster.getHsnNo());
			long count =(Long) bet.uniqueResult();
			if(hsnid==0) {
			if (count == 0) {
				hsnMaster.setDeleteFlag(1);
				sessionFactory.getCurrentSession().saveOrUpdate(hsnMaster);
				record =1;
			}else{
				
				record= 3;
			}
			}else {
				hsnMaster.setUnitId(1);
				hsnMaster.setDeleteFlag(1);
				sessionFactory.getCurrentSession().merge(hsnMaster);
				record =2;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return record;
		}
		return record;
	}

	@Override
	public Boolean deleteHsn(Integer hsnId) {
		try {
			HsnMaster hsnMaster=(HsnMaster) sessionFactory.getCurrentSession().get(HsnMaster.class, hsnId);
			hsnMaster.setDeleteFlag(0);
			sessionFactory.getCurrentSession().update(hsnMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<HsnMaster> getAllHsns() {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				HsnMaster.class);
		criteria.add(Restrictions.eq("deleteFlag", 1));
		return criteria.list();

	}

}
