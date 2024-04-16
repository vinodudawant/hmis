package com.hms.ehat.dao.impl;

import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import org.hibernate.Criteria;
import org.hibernate.Query;

import org.hibernate.SessionFactory;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.ChargesMasterDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.SubServiceDto;

@Repository
public class ChargesMasterDaoImpl implements ChargesMasterDao {

	@Autowired
	SessionFactory sessionFactory;

	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");

	Integer autoLimit = Integer.parseInt(autoLimitStr);
	
	String hallIdss    =(String) resourceBundleEhat.getString("hallId");
	Integer hallIdEhat = Integer.parseInt(hallIdss);
	/**
	 * @author Bilal @date 16_May_2017 this method is used to save or update
	 *         records in db
	 * **/
	@Override
	public int saveOrUpdateCharges(ChargesMasterDto chargesMaster) {

		int records=0;
		try {
			int chargesId = chargesMaster.getChargesId();
			if (chargesId > 0) {
				sessionFactory.getCurrentSession().merge(chargesMaster);
				records =1;
			} else {

			
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM ChargesMasterDto WHERE deleted='N' AND chargesName= :chargesName ");
				bet.setParameter("chargesName", chargesMaster.getChargesName());
			
				long count =(Long) bet.uniqueResult();
			
				if (count == 0) {
					sessionFactory.getCurrentSession().merge(chargesMaster);
				records =1;
				}else{
					records =3;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}
		return records;
	}

	/**
	 * @author Bilal @date 16_May_2017 this method is used to get records from
	 *         db
	 * **/
	@Override
	public List<ChargesMasterDto> getCharges() {
		List<ChargesMasterDto> ltChargesMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("chargesId"));
			/* criteria.setMaxResults(10); */
			ltChargesMasters = criteria.list();
	
		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}

	/**
	 * @author Bilal @date 16_May_2017 this method is used to delete records
	 *         from db
	 * **/
	@Override
	public boolean deleteCharges(Integer ChargesId, Integer userId) {

		try {
			ChargesMasterDto chargesMaster = (ChargesMasterDto) sessionFactory
					.getCurrentSession().get(ChargesMasterDto.class, ChargesId);

			chargesMaster.setDeleted("Y");
			chargesMaster.setDeletedBy(userId);
			chargesMaster.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			// chargesMaster.setDeletedDate(chargesMaster.getDeletedDate());
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * @author Bilal @date 16_May_2017 this method is used to get auto
	 *         suggestions on browser from db
	 **/
	@Override
	public List<ChargesMasterDto> getAutoSuggestionChargesNames(String letter) {

		List<ChargesMasterDto> ltChargesMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("chargesId"));
			// criteria.setMaxResults(10);
			criteria.add(Restrictions.like("chargesName", letter + "%"));

			criteria.setMaxResults(autoLimit);
			ltChargesMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}

	/**
	 * @author Bilal @date 16_May_2017 this method is used to get records by id
	 *         from db
	 **/
	@Override
	public List<ChargesMasterDto> getChargesById(Integer chargesId) {
		List<ChargesMasterDto> ltChargesMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			if (chargesId != 0) {
				criteria.add(Restrictions.eq("chargesId", chargesId));
			}

			ltChargesMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}

	/**
	 * @author Bilal @date 16_May_2017 this method is used to get all records
	 *         from db
	 **/
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterDto> getAllCharges() {
		List<ChargesMasterDto> ltChargesMasters = null;
		
		try {

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("chargesId"));
			ltChargesMasters = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}

	/**
	 * @author Bilal @date 16_May_2017 this method is used to get records with
	 *         deleted from db
	 **/
	@Override
	public List<ChargesMasterDto> getAllChargeswithDeleted() {
		List<ChargesMasterDto> ltChargesMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.addOrder(Order.desc("chargesId"));
			ltChargesMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}
	/** End of charges methods ***/

	/**
	 * @author Bilal @date 06_JULY_2017 this method is used to get count of charges
	 **/
	@Override
	public Long getChargesMasterCount() {
		Criteria crit = sessionFactory.getCurrentSession()
				.createCriteria(ChargesMasterDto.class);
		crit.add(Restrictions.eq("deleted", "N"));
		crit.setProjection(Projections.rowCount());
		Long count = (Long)crit.uniqueResult();

	    System.err.println("count is" + count );
		return count;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterDto> sponsorandhallList(String callfrom) {
		List<ChargesMasterDto> ltChargesMasters = null;
		
		try {

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			if (callfrom.equals("hall")) {
				System.err.println("hall: "+callfrom);
				criteria.add(Restrictions.eq("chargesId", hallIdEhat));
			}else{
				criteria.add(Restrictions.ne("chargesId", hallIdEhat));
			}
			
			criteria.addOrder(Order.desc("chargesId"));
			ltChargesMasters = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}

}
