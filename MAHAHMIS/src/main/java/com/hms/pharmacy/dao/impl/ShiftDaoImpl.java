package com.hms.pharmacy.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.ShiftDao;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.ShiftMaster;

@Repository
public class ShiftDaoImpl implements ShiftDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<ShiftMaster> getShiftDetails(String type) {
		List<ShiftMaster> shiftMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ShiftMaster.class);
			criteria.add(Restrictions.eq("shiftDeleteFlag", 0));
			criteria.addOrder(Order.desc("shiftId"));

			if (type.equals("all")) {

			} else {
				criteria.setMaxResults(10);
			}
			shiftMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return shiftMasters;
		}
		return shiftMasters;
	}

	@Override
	public boolean saveOrUpdateShift(ShiftMaster shiftMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(shiftMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<ShiftMaster> getAutoSuggestionShiftTypes(String letter) {
		// TODO Auto-generated method stub
		List<ShiftMaster> ltBankMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ShiftMaster.class);
			criteria.add(Restrictions.eq("shiftDeleteFlag", 0));
			criteria.add(Restrictions.like("shiftName", letter,
					MatchMode.ANYWHERE));

			ltBankMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltBankMasters;
		}
		return ltBankMasters;
	}

	@Override
	public List<ShiftMaster> getShiftById(Integer shiftId) {
		// TODO Auto-generated method stub
				List<ShiftMaster> shiftMasters = null;
				try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(ShiftMaster.class);
					criteria.add(Restrictions.eq("shiftDeleteFlag", 0));
					if (shiftId != 0) {
						criteria.add(Restrictions.eq("shiftId", shiftId));
					}

					shiftMasters = criteria.list();

				} catch (Exception e) {
					e.printStackTrace();
					return shiftMasters;
				}
				return shiftMasters;
	}

	@Override
	public boolean deleteShift(Integer shiftId) {
		try {
			ShiftMaster shiftMaster = (ShiftMaster) sessionFactory
					.getCurrentSession().get(ShiftMaster.class, shiftId);
			shiftMaster.setShiftDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
