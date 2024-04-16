package com.hms.administrator.dao.impl;

import java.util.Date;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.LedgerHeadDao;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.LedgerHead;

@Repository
public class LedgerHeadDaoImpl implements LedgerHeadDao {

	@Autowired
	SessionFactory sessionFactory;
	
	public String saveLedgerHead(LedgerHead dto, Integer voucherId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			ExpenseVoucherGroup masterDto = (ExpenseVoucherGroup) session.get(ExpenseVoucherGroup.class, voucherId);
			dto.setExpenseVoucherGroup(masterDto);
			
			session.merge(dto);
			
			return "Ledger head name added successfully.";
			
		}catch (Exception e) {
			e.printStackTrace();
			return "Oops some problem occured while adding ledger name.";
		}
	}
	
	public LedgerHead getAllLedgerHeads(String searchText, String callFrom) {
		Session session = null;
		LedgerHead dto = new LedgerHead();
		try {
			session = sessionFactory.getCurrentSession();
			if(callFrom.equalsIgnoreCase("onload")) {
				Criteria criteria = session.createCriteria(LedgerHead.class);
						 criteria.add(Restrictions.eq("deleteStatus", "Y"));
						 criteria.setMaxResults(20);
						 criteria.addOrder(Order.desc("ledger_head_ID"));
				dto.setLedger_headList(criteria.list());
			}else if(callFrom.equalsIgnoreCase("searchBtn")) {
				Criteria criteria = session.createCriteria(LedgerHead.class);
				 		 criteria.add(Restrictions.eq("deleteStatus", "Y"));
				 		 criteria.add(Restrictions.ilike("ledger_head_name", searchText, MatchMode.ANYWHERE));
				 		 dto.setLedger_headList(criteria.list());
			}else {
				Criteria criteria = session.createCriteria(LedgerHead.class);
						 criteria.add(Restrictions.eq("deleteStatus", "Y"));
						 criteria.setMaxResults(20);
						 criteria.add(Restrictions.ilike("ledger_head_name", searchText, MatchMode.ANYWHERE));
				dto.setLedger_headList(criteria.list());
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
	
	public LedgerHead editLedgerHead(Integer ledgerHeadId) {
		Session session = null;
		LedgerHead dto = new LedgerHead();
		try {
			session = sessionFactory.getCurrentSession();
			dto = (LedgerHead) session.get(LedgerHead.class, ledgerHeadId);
			return dto;
		}catch(Exception e){
			e.printStackTrace();
		}
		return dto;	
	}
	
	public boolean deleteLedgerHead(Integer ledgerHeadId, Integer userId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update LedgerHead set deletedBy = :deletedBy, deleteStatus = :deleteStatus, deletedDate = :deletedDate where ledger_head_ID = :ledger_head_ID");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("deleteStatus", "N");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("ledger_head_ID", ledgerHeadId);
				  query.executeUpdate();
				  
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;	
	}
}
