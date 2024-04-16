package com.hms.ehat.dao.impl;

import java.sql.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.PaymentModDao;
import com.hms.ehat.dto.NarrationDto;
import com.hms.ehat.dto.PaymentModDto;

@Repository
public class PaymentModDaoImpl implements PaymentModDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveOrUpdatePay(PaymentModDto payDto) {
		// TODO Auto-generated method stub
		try {
			payDto.setCreatedDate(new Date(new java.util.Date().getTime()));
			sessionFactory.getCurrentSession().merge(payDto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	
	@Override
	public List<PaymentModDto> getAllPayments() {
		List<PaymentModDto> ltpay = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PaymentModDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("payId"));
			//criteria.setMaxResults(10);
			ltpay = criteria.list();		
			

		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltpay;
	}


	@Override
	public boolean deletePay(Integer payId, Integer userId) {
		try {

			//TempMasterDto TempMaster = new TempMasterDto();

			PaymentModDto payDto = (PaymentModDto) sessionFactory
					.getCurrentSession().get(PaymentModDto.class, payId);
			payDto.setDeleted("Y");

			payDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			payDto.setDeletedBy(userId);

			//sessionFactory.getCurrentSession().merge(tempMaster);

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


	@Override
	public List<PaymentModDto> getautoSuggestionPaymentMasterNames(String letter) {
		List<PaymentModDto> ltPayMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PaymentModDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("payId"));
			criteria.add(Restrictions.like("payName", letter + "%"));
			criteria.setMaxResults(10);
			ltPayMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltPayMasters;
	}


	@Override
	public List<PaymentModDto> getPaymodeById(int payId) {

		List<PaymentModDto> ltpay = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PaymentModDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("payId", payId));			
			ltpay = criteria.list();					

		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltpay;	
	}

}
