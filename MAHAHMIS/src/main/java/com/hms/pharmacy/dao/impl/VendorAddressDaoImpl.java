package com.hms.pharmacy.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.VendorAddressDao;
import com.hms.pharmacy.pojo.VendorAddress;


@Repository
public class VendorAddressDaoImpl implements VendorAddressDao {

	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public VendorAddress saveOrUpdateVendorAddress(VendorAddress vendorAddress) {
		VendorAddress vendorAddress1;
		try {
			vendorAddress1=(VendorAddress) sessionFactory.getCurrentSession().save(vendorAddress);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return vendorAddress1;
	}

	@Override
	public Boolean deleteVendorAddress(Integer vendorAddressId) {
		
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<VendorAddress> getAllVendorAddress() {
		List<VendorAddress> vendoraddressMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorAddress.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("vendorAddressId"));
			criteria.setMaxResults(10);
			vendoraddressMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return vendoraddressMasters;
		}
		return vendoraddressMasters;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<VendorAddress> getAllAddressOfVendor(int vendorId) {
		List<VendorAddress> vendoraddressMasters = null;
		try {
			Query query=sessionFactory.getCurrentSession().createQuery("from VendorAddress where vendorId="+vendorId).setCacheable(true);
			
			vendoraddressMasters = query.list();

		} catch (Exception e) {
			e.printStackTrace();
			return vendoraddressMasters;
		}
		return vendoraddressMasters;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<VendorAddress> getAllAddressOfVendorByState(int stateid) {
		List<VendorAddress> ltSubService = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorAddress.class);
			criteria.add(Restrictions.eq("vendorAddressId", stateid));

			criteria.addOrder(Order.desc("vendorAddressId"));
			
			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

}
