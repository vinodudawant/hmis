package com.hms.ehat.dao.impl;

import java.sql.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.NarrationDao;
import com.hms.ehat.dto.NarrationDto;
import com.hms.ehat.dto.TempMasterDto;

@Repository
public class NarrationDaoImpl implements NarrationDao{

	
	@Autowired
	SessionFactory sessionFactory;
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for save or update operation
	 ******************************************************************************/
	@Override
	public int saveOrUpdateTemp(NarrationDto narrsMaster) {
		// TODO Auto-generated method stub
		try {
			narrsMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
			sessionFactory.getCurrentSession().merge(narrsMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for showing all Temps.
	 ******************************************************************************/
	@Override
	public List<NarrationDto> getAllNarrations() {
		List<NarrationDto> ltNarrMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(NarrationDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("narrId"));
			//criteria.setMaxResults(10);
			ltNarrMasters = criteria.list();		
			

		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltNarrMasters;
	}


	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all methods use for deleting Temps.
	 ******************************************************************************/
	@Override
	public boolean deleteTemp(Integer narrId, Integer userId) {
		try {

			//TempMasterDto TempMaster = new TempMasterDto();

			NarrationDto narrationDto = (NarrationDto) sessionFactory
					.getCurrentSession().get(NarrationDto.class, narrId);
			narrationDto.setDeleted("Y");

			narrationDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			narrationDto.setDeletedBy(userId);

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
	public List<NarrationDto> getautoSuggestionNarrationMasterNames(
			String letter) {
		List<NarrationDto> ltNarrMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(NarrationDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("narrId"));
			criteria.add(Restrictions.like("narrName", letter + "%"));
			criteria.setMaxResults(10);
			ltNarrMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltNarrMasters;
	}


	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is use for getting count.
	 ******************************************************************************/
	
	@Override
	public long getNarrationCount() {
		
		Criteria crit = sessionFactory.getCurrentSession()
				.createCriteria(NarrationDto.class);
		crit.add(Restrictions.eq("deleted", "N"));
		crit.setProjection(Projections.rowCount());
		Long count = (Long)crit.uniqueResult();
		return count;
	}
}
