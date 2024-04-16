package com.hms.pharmacy.dao.impl;

import java.util.ArrayList;
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

import com.hms.pharmacy.dao.TaxDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.pojo.VendorMaster;

@Repository
public class TaxDaoImpl implements TaxDao
{
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<TaxMaster> getTax()
	{
		List<TaxMaster> taxMasters = null;
		try 
		{
			Criteria criteria = sessionFactory.openSession().createCriteria(TaxMaster.class);
			criteria.add(Restrictions.eq("taxDeleteFlag", 0));
			criteria.addOrder(Order.desc("taxId"));
			criteria.setMaxResults(10);
			taxMasters = criteria.list();

		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return taxMasters;
		}
		return taxMasters;
	}

	@Override
	public List<TaxMaster> getAllTaxDetails()
	{
		List<TaxMaster> taxMasters = new ArrayList<TaxMaster>();
		try 
		{
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TaxMaster.class);
			criteria.add(Restrictions.eq("taxDeleteFlag", 0));
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("taxId"));
		    proList.add(Projections.property("taxName"));
		    proList.add(Projections.property("taxRate"));
		   
		    criteria.setProjection(proList);
			
		    List<Object[]> result = criteria.list();
		    for (Object[] row : result) {
		    	TaxMaster taxMaster=new TaxMaster();
		    	if(row[0]!=null)
		    		taxMaster.setTaxId(Integer.parseInt(row[0].toString()));

				if(row[1]!=null)
					taxMaster.setTaxName(row[1].toString());
				
				if(row[2]!=null)
					taxMaster.setTaxRate(Double.parseDouble(row[2].toString()));
		    	
				taxMasters.add(taxMaster);
		    }
		    
			/*taxMasters = criteria.list();*/

		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return taxMasters;
		}
		return taxMasters;
	}

	
	@Override
	public boolean saveTax(TaxMaster taxMaster) 
	{
		
		try {
			//Added BY BILAL For duplicate GST code 
			Query bet = sessionFactory.getCurrentSession().createQuery
					("SELECT count(*) FROM TaxMaster WHERE taxDeleteFlag=0 AND taxRate= :taxRate");
			bet.setParameter("taxRate", taxMaster.getTaxRate());
			long count =(Long) bet.uniqueResult();
			if (count == 0) {
				
				sessionFactory.getCurrentSession().saveOrUpdate(taxMaster);
				
			}else{
				sessionFactory.getCurrentSession().createQuery("update TaxMaster set taxName='"+taxMaster.getTaxName()+"' where taxId="+taxMaster.getTaxId()).executeUpdate();
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}

	@Override
	public boolean deleteTax(Integer taxId) 
	{
		try 
		{
			TaxMaster taxMaster = (TaxMaster) sessionFactory
					.getCurrentSession().get(TaxMaster.class, taxId);
			taxMaster.setTaxDeleteFlag(1);
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<TaxMaster> getAutoSuggestionTaxName(String letter) 
	{
		List<TaxMaster> taxMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TaxMaster.class);
			criteria.add(Restrictions.eq("taxDeleteFlag", 0));
			criteria.add(Restrictions.like("taxName", letter,
					MatchMode.ANYWHERE));
			taxMasters = criteria.list();

		} catch (Exception e)
		{
			e.printStackTrace();
			return taxMasters;
		}
		return taxMasters;
	}

	@Override
	public List<TaxMaster> getTaxById(Integer taxId) {
		List<TaxMaster> taxMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TaxMaster.class);
			criteria.add(Restrictions.eq("taxDeleteFlag", 0));
			if (taxId != 0) {
				criteria.add(Restrictions.eq("taxId", taxId));
			}

			taxMasters = criteria.list();

		} catch (Exception e) 
		{
			e.printStackTrace();
			return taxMasters;
		}
		return taxMasters;
	}

	
	@Override
	public TaxMaster getTaxByIdForDate(Integer taxId) {
		
		TaxMaster taxMaster = new TaxMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TaxMaster.class);
			criteria.add(Restrictions.eq("taxDeleteFlag", 0));
			if (taxId != 0) {
				criteria.add(Restrictions.eq("taxId", taxId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("taxAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    taxMaster.setTaxAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return taxMaster;
		}
		return taxMaster;
	}

	/*****
	 * @author     :BILAL
	 * @Date       :03-03-2018
	 * @code       :For getting list of gst 
	 * ******/
	@SuppressWarnings("unchecked")
	@Override
	public List<TaxMaster> getgstList() {
		List<TaxMaster> lttax = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TaxMaster.class);
			criteria.add(Restrictions.eq("taxDeleteFlag", 0));

			criteria.addOrder(Order.asc("taxId"));
			
			lttax = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return lttax;
		}
		return lttax;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
