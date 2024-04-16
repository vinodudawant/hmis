package com.hms.opdbill.dao.impl;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.opdbill.dao.OpdReceiptDao;
import com.hms.opdbill.dto.OpdReceiptMasterDto;

@Repository
public class OpdReceiptDaoImpl implements OpdReceiptDao{

	static Logger log=Logger.getLogger(OpdReceiptDaoImpl.class.getName());
	static {
		System.out.println("OpdReceiptDaoImpl is Loaded...!");
	}
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public OpdReceiptMasterDto saveOpdBillReceipt(OpdReceiptMasterDto objDto) {

		log.info("In OpdReceiptDaoImpl saveOpdBillReceipt()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			OpdReceiptMasterDto savedDto = (OpdReceiptMasterDto)s.merge(objDto);
			log.debug("Response--------> "+savedDto);
			return savedDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
