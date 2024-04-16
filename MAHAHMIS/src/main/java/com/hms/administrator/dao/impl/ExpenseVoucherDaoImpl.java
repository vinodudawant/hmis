package com.hms.administrator.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.ExpenseVoucherDao;
import com.hms.administrator.dto.ExpenseVoucherGroup;

@Repository
public class ExpenseVoucherDaoImpl implements ExpenseVoucherDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public Integer getNextId(String callFrom) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			List<Object> list = null;
			if(callFrom.equalsIgnoreCase("voucherFrom")) {

				list = session.createQuery("SELECT MAX(voucher_ID) FROM ExpenseVoucherGroup").list();
				
				if(list.get(0) == null)
					return 1;
				else
					return (((Integer)list.get(0)).intValue() + 1);
			
			} else if (callFrom.equalsIgnoreCase("ledgerHeadFrom")) {
				list = session.createQuery("SELECT MAX(ledger_head_ID) FROM LedgerHead").list();
				
				if(list.get(0) == null)
					return 1;
				else
					return (((Integer)list.get(0)).intValue() + 1);
			}else if (callFrom.equalsIgnoreCase("reasonOfVisitFrom")) {
				list = session.createQuery("SELECT MAX(ReasonOfVisit_ID) FROM district_taluka_city").list();
				
				if(list.get(0) == null)
					return 1;
				else
					return (((Integer)list.get(0)).intValue() + 1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public String saveVoucherMaster(ExpenseVoucherGroup dto) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			session.merge(dto);
			
			return "Voucher name added successfully.";
			
		}catch(Exception e) {
			e.printStackTrace();
			
			return "Oops some problem occured while adding voucher name.";
		}
	}

	@Override
	public ExpenseVoucherGroup getAllVouchers(String callFrom) {
		Session session = null;
		ExpenseVoucherGroup dto = new ExpenseVoucherGroup();
		try {
			session = sessionFactory.getCurrentSession();
			
			if(callFrom.equalsIgnoreCase("onload")) {
				Criteria criteria = session.createCriteria(ExpenseVoucherGroup.class);
						 criteria.add(Restrictions.eq("deleteStatus", "Y"));
						 criteria.setMaxResults(20);
						 criteria.addOrder(Order.desc("voucher_ID"));
				dto.setVoucherList(criteria.list());
			}else {
				Criteria criteria = session.createCriteria(ExpenseVoucherGroup.class);
						 criteria.add(Restrictions.eq("deleteStatus", "Y"));
				dto.setVoucherList(criteria.list());
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return dto;
	}
	
	public ExpenseVoucherGroup editVoucher(Integer voucherId) {
		Session session = null;
		ExpenseVoucherGroup dto = new ExpenseVoucherGroup();
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("Select voucherName FROM ExpenseVoucherGroup WHERE voucher_ID =:voucher_ID");
				  query.setParameter("voucher_ID", voucherId);
			String name = (String) query.uniqueResult();
			
						 dto.setVoucherName(name);
						 dto.setVoucher_ID(voucherId);
			return dto;
		}catch(Exception e){
			e.printStackTrace();
		}
		return dto;	
	}
	public boolean deleteVoucher(Integer voucherId, Integer userId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update ExpenseVoucherGroup set deletedBy = :deletedBy, deleteStatus = :deleteStatus, deletedDate = :deletedDate where voucher_ID = :voucher_ID");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("deleteStatus", "N");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("voucher_ID", voucherId);
				  query.executeUpdate();
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;	
	}
	
	public ExpenseVoucherGroup searchVoucher(String searchText, String callFrom) {
		Session session = null;
		ExpenseVoucherGroup dto = new ExpenseVoucherGroup();
		try {
			session = sessionFactory.getCurrentSession();
			if(callFrom.equalsIgnoreCase("voucherMaster")) {
				Criteria criteria = session.createCriteria(ExpenseVoucherGroup.class);
				 		 criteria.add(Restrictions.eq("deleteStatus", "Y"));
				 		 criteria.setMaxResults(20);
				 		 criteria.add(Restrictions.ilike("voucherName", searchText, MatchMode.ANYWHERE));
				dto.setVoucherList(criteria.list());
			}else {
				Criteria criteria = session.createCriteria(ExpenseVoucherGroup.class);
				 criteria.add(Restrictions.eq("deleteStatus", "Y"));
				 criteria.add(Restrictions.ilike("voucherName", searchText, MatchMode.ANYWHERE));

				 dto.setVoucherList(criteria.list());
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
}
