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

import com.hms.administrator.dao.MastersDao;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.LedgerHead;
import com.hms.administrator.dto.UserAccessModuleDto;
import com.hms.administrator.dto.district_taluka_city;

@Repository
public class MastersDaoImpl implements MastersDao {

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

	@Override
	public String saveReasonOfVisit(district_taluka_city dto, Integer moduleId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			UserAccessModuleDto masterDto = (UserAccessModuleDto) session.get(UserAccessModuleDto.class, moduleId);
			dto.setUserAccessModuleDto(masterDto);
			
			session.merge(dto);
			
			return "Reason added successfully.";
			
		}catch (Exception e) {
			e.printStackTrace();
			return "Oops some problem occured while adding reason.";
		}
	}
	
	public district_taluka_city getAllReasons(String searchText, String callFrom) {
		Session session = null;
		district_taluka_city dto = new district_taluka_city();
		try {
			session = sessionFactory.getCurrentSession();
			if(callFrom.equalsIgnoreCase("masterForm")) {
				Criteria criteria = session.createCriteria(district_taluka_city.class);
						 criteria.add(Restrictions.eq("deleteStatus", "Y"));
						 criteria.setMaxResults(20);
						 criteria.addOrder(Order.desc("ReasonOfVisit_ID"));
				dto.setReasonOfVisitDetails(criteria.list());
			}else if(callFrom.equalsIgnoreCase("searchBtn")) {
				Criteria criteria = session.createCriteria(district_taluka_city.class);
				 		 criteria.add(Restrictions.eq("deleteStatus", "Y"));
				 		 criteria.add(Restrictions.ilike("ReasonOfVisit_Name", searchText, MatchMode.ANYWHERE));
				dto.setReasonOfVisitDetails(criteria.list());
			}else {
				Criteria criteria = session.createCriteria(district_taluka_city.class);
						 criteria.add(Restrictions.eq("deleteStatus", "Y"));
						 criteria.setMaxResults(20);
						 criteria.add(Restrictions.ilike("ReasonOfVisit_Name", searchText, MatchMode.ANYWHERE));
				dto.setReasonOfVisitDetails(criteria.list());
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	@Override
	public district_taluka_city editReasons(Integer reasonId) {

		Session session = null;
		district_taluka_city dto = null;
		try {
			session = sessionFactory.getCurrentSession();
			dto = (district_taluka_city) session.get(district_taluka_city.class, reasonId);
			return dto;
		}catch(Exception e){
			e.printStackTrace();
		}
		return dto;	
	}

	@Override
	public boolean deleteReasons(Integer reasonId, Integer userId) {

		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update district_taluka_city set deletedBy = :deletedBy, deleteStatus = :deleteStatus, deletedDate = :deletedDate where ReasonOfVisit_ID = :reasonId");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("deleteStatus", "N");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("reasonId", reasonId);
				  query.executeUpdate();
				  
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;	
	}
	
	public String fetchTitleGender(String title) {		
		String gender ="";
		try {
			
			//String sqlGen="select patientTitleGender from PatientTitle where patientTitle='"+title+"' ";
			String sqlGen = "select distinct(gender) from patient_title where title = '"+title+"' limit 1";
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlGen);
			gender = (String)refQuery.uniqueResult();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return gender;
	}
}