package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
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

import com.hms.pharmacy.dao.SubStoreDao;
import com.hms.pharmacy.pojo.SubStoreMaster;

@Repository
public class SubStoreDaoImpl implements SubStoreDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<SubStoreMaster> getStoreDetails(String type) {
		List<SubStoreMaster> storeMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubStoreMaster.class);
			criteria.add(Restrictions.eq("storeDeleteFlag", 0));
			criteria.addOrder(Order.desc("storeId"));

			if (type.equals("all")) {

			} else {
				
			}
			storeMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return storeMasters;
		}
		return storeMasters;
	}

	@Override
	public boolean saveOrUpdateStore(SubStoreMaster subStoreMaster) {
		try {
			
			
			if(subStoreMaster.getStoreId()==null)
			{
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM SubStoreMaster WHERE storeDeleteFlag=0 AND storeName= :storeName");
				bet.setParameter("storeName", subStoreMaster.getStoreName());
				long count =(Long) bet.uniqueResult();
				if(count ==0) {
				try
				{
					org.hibernate.Query query = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"CREATE TABLE `pharma_"+subStoreMaster.getStoreName()+"_stock_master` ( `stock_id` int(11) NOT NULL AUTO_INCREMENT,`stock_product_id` int(11) DEFAULT NULL,`stock_qty_in_hand` double DEFAULT '0',`stock_qty_on_order` int(11) DEFAULT '0',`stock_year_id` int(11) DEFAULT NULL,`stock_delete_flag` int(11) DEFAULT '0',`stock_update_date` date DEFAULT NULL,`stock_batch_id` int(11) DEFAULT NULL,PRIMARY KEY (`stock_id`))");
					int rowDeleted = query.executeUpdate();
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
			
			sessionFactory.getCurrentSession().saveOrUpdate(subStoreMaster);
				}else {
					return false;
				}
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(subStoreMaster);
			}
				
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<SubStoreMaster> getAutoSuggestionStoreNames(String letter) {
		List<SubStoreMaster> shiftMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubStoreMaster.class);
			criteria.add(Restrictions.eq("storeDeleteFlag", 0));
			criteria.add(Restrictions.like("storeName", letter,
					MatchMode.ANYWHERE));

			shiftMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return shiftMasters;
		}
		return shiftMasters;
	}

	@Override
	public List<SubStoreMaster> getStoreById(Integer storeId) {
		List<SubStoreMaster> subStoreMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubStoreMaster.class);
			criteria.add(Restrictions.eq("storeDeleteFlag", 0));
			if (storeId != 0) {
				criteria.add(Restrictions.eq("storeId", storeId));
			}

			subStoreMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return subStoreMasters;
		}
		return subStoreMasters;
	}

	@Override
	public boolean deleteStore(Integer storeId) {
		try {
			SubStoreMaster storeMaster = (SubStoreMaster) sessionFactory
					.getCurrentSession().get(SubStoreMaster.class, storeId);
			storeMaster.setStoreDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public SubStoreMaster getSubStoreDate(Integer storeId) {
		SubStoreMaster subStoreMaster = new SubStoreMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubStoreMaster.class);
			criteria.add(Restrictions.eq("storeDeleteFlag", 0));
			if (storeId != 0) {
				criteria.add(Restrictions.eq("storeId", storeId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("storeAddDate"));
		    proList.add(Projections.property("storeAddedBy"));
		    
		    
		    criteria.setProjection(proList);
			
		    List<Object[]> object= criteria.list();
		    
		    for(Object[] master:object)
		    {
		    	SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		    	Date date2=dateFormat.parse(master[0].toString());
		    	
		    	subStoreMaster.setStoreAddDate(date2);
		    	subStoreMaster.setStoreAddedBy(master[1].toString());
		    }

		} catch (Exception e) {
			e.printStackTrace();
			return subStoreMaster;
		}
		return subStoreMaster;
	}

	@Override
	public boolean editStoreAuthentication(Integer storeId, String users,
			Date date) {
		try 
		{ 
			Query query = sessionFactory .getCurrentSession().createSQLQuery("update pharma_sub_store_master set store_user_id='"+users+"',store_update_date='"+date+"' where store_id=:storeId");
			query.setInteger("storeId", storeId);
			int rowsDeleted = query.executeUpdate();
		}
		catch(Exception e) 
		{
			e.printStackTrace(); 
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SubStoreMaster> getSubStoreList() {
		List<SubStoreMaster> ltSubStore = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubStoreMaster.class);
			criteria.add(Restrictions.eq("storeDeleteFlag", 0));

			criteria.addOrder(Order.desc("storeId"));
			
			ltSubStore = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubStore;
		}
		return ltSubStore;
	}

}
