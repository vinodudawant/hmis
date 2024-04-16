package com.hms.ehat.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.CurrenctTypeDao;
import com.hms.ehat.dto.CurrencyTypeDto;
import com.hms.ehat.dto.PaymentModDto;


@Repository
public class CurrencyTypeDaoImpl implements CurrenctTypeDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveOrUpdateCurrencyMaster(CurrencyTypeDto currDto) {
		// TODO Auto-generated method stub
		try {
			currDto.setCreatedDate(new Date(new java.util.Date().getTime()));
			sessionFactory.getCurrentSession().merge(currDto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	
	@Override
	public List<CurrencyTypeDto> getAllCurrencyList() {
		List<CurrencyTypeDto> ltCurr = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CurrencyTypeDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("currencyId"));
			//criteria.setMaxResults(10);
			ltCurr = criteria.list();		
			

		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltCurr;
	}


	@Override
	public boolean deleteCurrMaster(Integer currencyId, Integer userId) {
		try {

			//TempMasterDto TempMaster = new TempMasterDto();

			CurrencyTypeDto currDto = (CurrencyTypeDto) sessionFactory
					.getCurrentSession().get(CurrencyTypeDto.class, currencyId);
			currDto.setDeleted("Y");

			currDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			currDto.setDeletedBy(userId);

			//sessionFactory.getCurrentSession().merge(tempMaster);

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


	@Override
	public List<CurrencyTypeDto> getautoSuggestionCurrencyMasterNames(
			String letter) {
		List<CurrencyTypeDto> ltPayMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CurrencyTypeDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("currencyId"));
			criteria.add(Restrictions.like("currencyName", letter + "%"));
			criteria.setMaxResults(10);
			ltPayMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltPayMasters;
	}


	@Override
	public List<CurrencyTypeDto> getOneCurrencyList() {
		List<CurrencyTypeDto> ltCurr = null;
		List<CurrencyTypeDto> ltCurr2 = new ArrayList<CurrencyTypeDto>();
		CurrencyTypeDto obj=new CurrencyTypeDto();
		try {
			Integer id=0;
			String sql="SELECT currency_id FROM hospitalaccinfo where idhospitalAccInfo=1";
			
			id = (Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
			if(id==0)
			{
				obj.setCurrencyCode("");
				obj.setCurrencyName("");
				obj.setCurrencyId(0);
				obj.setCurrencySymbol("");
				ltCurr2.add(obj);
				return ltCurr2;
				
			}
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CurrencyTypeDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("currencyId", id));
			//criteria.addOrder(Order.asc("currencyId"));
			//criteria.setMaxResults(10);
			ltCurr = criteria.list();		
			

		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltCurr;
	}


	@Override
	public String getOneCurrencyListForSymbol() {
		String symbol="";
		String orignal="";
		try {
			Integer id=0;
			
			String sql="SELECT currency_id FROM hospitalaccinfo where idhospitalAccInfo=1";
			
			id = (Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
			String sql2="SELECT currency_symbol FROM currency_type_master where currency_id="+id+"";
			symbol = (String) sessionFactory.getCurrentSession().createSQLQuery(sql2).uniqueResult();
			char c = symbol.charAt(0);
			System.err.print("--------------=========="+symbol);
			int a=(int)c;
			orignal="&#"+a;
			System.out.print("====================++++++++++"+orignal);
		} catch (Exception e) {
			e.printStackTrace();			
		}
		return orignal;
	}
	
	

}
