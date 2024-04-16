/*******************************************************************************
 * @date 16_May_2017 
 ******************************************************************************/
package com.hms.ehat.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.mail.Session;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.LabProfile;
import com.hms.ehat.dao.TempDao;
import com.hms.ehat.dao.TempDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.TempMasterDto;

@Repository
public class TempDaoImpl implements TempDao {

	@Autowired
	SessionFactory sessionFactory;
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for save or update operation
	 ******************************************************************************/
	@Override
	public int saveOrUpdateTemp(TempMasterDto tempMaster) {
		// TODO Auto-generated method stub
		try {
			tempMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
			sessionFactory.getCurrentSession().merge(tempMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for getting all temp 
	 ******************************************************************************/
	@Override
	public List<TempMasterDto> getTemp() {
		List<TempMasterDto> ltTempMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TempMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("tempId"));
			criteria.setMaxResults(10);
			
			/*criteria.setProjection(Projections.rowCount());
			 int count = (Integer)criteria.uniqueResult();
			 criteria.add(Restrictions.eq("deleted", "N"));*/
			
			
		   
		    
			/* criteria.setMaxResults(10); */
			ltTempMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltTempMasters;
		}
		return ltTempMasters;
	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for deleting Temps.
	 ******************************************************************************/
	@Override
	public boolean deleteTemp(Integer tempId, Integer userId) {
		try {

			//TempMasterDto TempMaster = new TempMasterDto();

			TempMasterDto tempMaster = (TempMasterDto) sessionFactory
					.getCurrentSession().get(TempMasterDto.class, tempId);
			tempMaster.setDeleted("Y");

			tempMaster.setDeletedDate(new Date(new java.util.Date().getTime()));
			tempMaster.setDeletedBy(userId);

			//sessionFactory.getCurrentSession().merge(tempMaster);

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for showing getAutoSuggestions.
	 ******************************************************************************/
	@Override
	public List<TempMasterDto> getAutoSuggestionTempNames(String letter) {
		
		List<TempMasterDto> ltTempMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TempMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("tempId"));
			criteria.add(Restrictions.like("tempName", letter + "%"));
			criteria.setMaxResults(10);
			ltTempMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltTempMasters;
		}
		return ltTempMasters;

	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for searching Temp.
	 ******************************************************************************/

	@Override
	public List<TempMasterDto> getTempById(Integer tempId) {
		// TODO Auto-generated method stub
		List<TempMasterDto> ltTempMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TempMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			if (tempId != 0) {
				criteria.add(Restrictions.eq("tempId", tempId));
			}

			ltTempMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltTempMasters;
		}
		return ltTempMasters;
	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for showing all Temps.
	 ******************************************************************************/
	@Override
	public List<TempMasterDto> getAllTemp() {
		List<TempMasterDto> ltTempMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TempMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("tempId"));
			//criteria.setMaxResults(10);
			ltTempMasters = criteria.list();
			
			

		} catch (Exception e) {
			e.printStackTrace();
			return ltTempMasters;
		}
		return ltTempMasters;
	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is use for getting count.
	 ******************************************************************************/
	
	@Override
	public Long getTempCount() {
		
		Criteria crit = sessionFactory.getCurrentSession()
				.createCriteria(TempMasterDto.class);
		crit.add(Restrictions.eq("deleted", "N"));
		crit.setProjection(Projections.rowCount());
		Long count = (Long)crit.uniqueResult();

	    System.err.println("count is" + count );
		return count;
	}
	
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for showing all Temps.
	 ******************************************************************************/
	@Override
	public List<TempMasterDto> getAllTempwithDeleted() {
		List<TempMasterDto> ltTempMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TempMasterDto.class);
			criteria.addOrder(Order.desc("tempId"));
			ltTempMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltTempMasters;
		}
		return ltTempMasters;
	}



}