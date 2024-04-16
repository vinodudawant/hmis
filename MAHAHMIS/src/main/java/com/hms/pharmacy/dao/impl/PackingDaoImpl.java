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

import com.hms.pharmacy.dao.DoctorDao;
import com.hms.pharmacy.dao.PackingDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.PackingMaster;

@Repository
public class PackingDaoImpl implements PackingDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdatePacking(PackingMaster packingMaster) {
		// TODO Auto-generated method stub
		try {
			Integer packId = packingMaster.getPackId();
			if(packId==null) {
				packId=0;
			}
			if(packId==0) {
				Query hql = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM PackingMaster WHERE packDeleteFlag=0 AND packType= :packType");
				hql.setParameter("packType", packingMaster.getPackType());
				long count =(Long) hql.uniqueResult();
				if(count !=0){	
						return false;
					
				}
				
				sessionFactory.getCurrentSession().saveOrUpdate(packingMaster);
				
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(packingMaster);
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<PackingMaster> getPacking() {
		// TODO Auto-generated method stub
		List<PackingMaster> ltPackingMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PackingMaster.class);
			criteria.add(Restrictions.eq("packDeleteFlag", 0));
			criteria.addOrder(Order.desc("packId"));
			criteria.setMaxResults(10);
			ltPackingMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltPackingMasters;
		}
		return ltPackingMasters;
	}

	@Override
	public Boolean deletePacking(Integer packId) {
		// TODO Auto-generated method stub
		try {
			PackingMaster packingMaster = (PackingMaster) sessionFactory
					.getCurrentSession().get(PackingMaster.class, packId);
			packingMaster.setPackDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<PackingMaster> getAutoSuggestionPackingNames(String letter) {
		// TODO Auto-generated method stub
		List<PackingMaster> ltPackingMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PackingMaster.class);
			criteria.add(Restrictions.eq("packDeleteFlag", 0));
			criteria.add(Restrictions.like("packType", letter,
					MatchMode.ANYWHERE));
			ltPackingMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltPackingMasters;
		}
		return ltPackingMasters;
	}

	@Override
	public List<PackingMaster> getPackingById(Integer packId) {
		// TODO Auto-generated method stub
		List<PackingMaster> ltPackingMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PackingMaster.class);
			criteria.add(Restrictions.eq("packDeleteFlag", 0));
			if (packId != 0) {
				criteria.add(Restrictions.eq("packId", packId));
			}

			ltPackingMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltPackingMasters;
		}
		return ltPackingMasters;
	}
	@Override
	public PackingMaster getPackingByIdForDate(Integer packId) {
		
		PackingMaster packingMaster = new PackingMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PackingMaster.class);
			criteria.add(Restrictions.eq("packDeleteFlag", 0));
			if (packId != 0) {
				criteria.add(Restrictions.eq("packId", packId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("pakAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    packingMaster.setPakAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return packingMaster;
		}
		return packingMaster;
	}
	
	
	
	
	
	
	
}
