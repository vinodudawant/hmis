package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dto.Doctor;
import com.hms.administrator.dao.AdminCashVoucherDao;
import com.hms.administrator.dto.AdminCashVoucherDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class AdminCashVoucherDaoImpl implements AdminCashVoucherDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveCashVoucher(String cashVoucher,
			HttpServletRequest request) {
		try {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");			
		AdminCashVoucherDTO cashVoucherList = (AdminCashVoucherDTO) ConfigUIJSONUtility.getObjectFromJSON(cashVoucher,AdminCashVoucherDTO.class);		
		AdminCashVoucherDTO	cashVoucherDTO=cashVoucherList.getCashVouchersList().get(0);
		
		if(cashVoucherDTO.getVoucherId()==0){
			cashVoucherDTO.setDeleted("N");
			cashVoucherDTO.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(cashVoucherDTO);
			return 1;
		}else{
			cashVoucherDTO.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(cashVoucherDTO);
			return 2;
		}
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<Doctor> getAllAuthorisedDoctor() {
		List<Doctor> doctor = new ArrayList<Doctor>();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Doctor.class);
		criteria.add(Restrictions.eq("motivatorAuthorisation", "Authorised"));
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.addOrder(Order.asc("doc_name"));
		doctor = criteria.list();
	} catch (Exception e) {
		e.printStackTrace();
	}
	return doctor;
	}

	@Override
	public List<AdminCashVoucherDTO> getAllCashVoucher() {
		List<AdminCashVoucherDTO> cashVoucherList = new ArrayList<AdminCashVoucherDTO>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminCashVoucherDTO.class);
			criteria.add(Restrictions.eq("cancelflag", "N"));
			criteria.addOrder(Order.desc("voucherId"));
			cashVoucherList = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return cashVoucherList;
		}
		return cashVoucherList;
	}

	@Override
	public List<AdminCashVoucherDTO> getAllCancelCashVoucher() {
		List<AdminCashVoucherDTO> cashVoucherList = new ArrayList<AdminCashVoucherDTO>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminCashVoucherDTO.class);
			criteria.add(Restrictions.eq("cancelflag", "Y"));
			criteria.addOrder(Order.desc("voucherId"));
			cashVoucherList = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return cashVoucherList;
		}
		return cashVoucherList;
	}

	@Override
	public boolean cancelCashVoucher(int voucherId, HttpServletRequest request) {
		try {
			AdminCashVoucherDTO cashVoucher = (AdminCashVoucherDTO) sessionFactory.getCurrentSession().get(AdminCashVoucherDTO.class,voucherId);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			cashVoucher.setCancelflag("Y");
			cashVoucher.setUpdatedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<AdminCashVoucherDTO> searchVoucherBy(String name,HttpServletRequest request) {
		try {
			List<AdminCashVoucherDTO> cashList = new ArrayList<AdminCashVoucherDTO>();
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminCashVoucherDTO.class);
				criteria.add(Restrictions.eq("cancelflag", "N"));
				criteria.add(Restrictions.like("payTo", name, MatchMode.START));
				cashList = criteria.list();
			return cashList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<AdminCashVoucherDTO> fetchVoucherForPrint(int voucherID, HttpServletRequest request) {
		
		try
		{
			List<AdminCashVoucherDTO> voucherLi = new ArrayList<AdminCashVoucherDTO>();
			//Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminCashVoucherDTO.class);
			//criteria.add(Restrictions.eq("voucherId", voucherID));
			AdminCashVoucherDTO vobj= (AdminCashVoucherDTO) sessionFactory.getCurrentSession().get(AdminCashVoucherDTO.class, voucherID);
		String authById	=vobj.getAuthorisedBy();
		    String sql="Select doc_name as  doc_name from doctor where Doctor_ID="+Integer.parseInt(authById)+"   ";
		    
		   SQLQuery  qSql=sessionFactory.getCurrentSession().createSQLQuery(sql);
		   String authByName=(String) qSql.uniqueResult();
		    		
	
		vobj.setAuthByName(authByName);
		voucherLi.add(vobj);
			return voucherLi;
			
		}catch (Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}

}
