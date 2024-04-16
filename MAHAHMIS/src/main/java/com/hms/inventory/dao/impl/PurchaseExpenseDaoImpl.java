package com.hms.inventory.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.PurchaseExpenseDao;
import com.hms.inventory.dto.PurchaseExpenseDto;
import com.hms.inventory.dto.PurchaseExpenseItemSlaveDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class PurchaseExpenseDaoImpl implements PurchaseExpenseDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int savePurchaseExpense(PurchaseExpenseDto purchaseExpenseDto,
			String purchaseExpenseItemSlaveDetails, Integer partyMasterId) {
		try {
			if(purchaseExpenseDto.getId() == 0)
			{

				PurchaseExpenseItemSlaveDto purchaseExpenseItemSlaveDto = (PurchaseExpenseItemSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaseExpenseItemSlaveDetails, PurchaseExpenseItemSlaveDto.class);
				List<PurchaseExpenseItemSlaveDto> purchaseExpenseItemSlaveDtos = purchaseExpenseItemSlaveDto.getLstPurchaseExpenseItemSlaveDto();
				purchaseExpenseDto.setPurchaseExpenseItemSlaveDto(purchaseExpenseItemSlaveDtos);
				sessionFactory.getCurrentSession().merge(purchaseExpenseDto);
				return 1;
			}
			else{
				
				PurchaseExpenseItemSlaveDto purchaseExpenseItemSlaveDto = (PurchaseExpenseItemSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaseExpenseItemSlaveDetails, PurchaseExpenseItemSlaveDto.class);
				List<PurchaseExpenseItemSlaveDto> purchaseExpenseItemSlaveDtos = purchaseExpenseItemSlaveDto.getLstPurchaseExpenseItemSlaveDto();
				purchaseExpenseDto.setPurchaseExpenseItemSlaveDto(purchaseExpenseItemSlaveDtos);
				sessionFactory.getCurrentSession().merge(purchaseExpenseDto);
				return 2;
			}
			//return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<PurchaseExpenseDto> getAllPurchaseExpenseRecords() {
		List<PurchaseExpenseDto> purchaseExpenseDtos=new ArrayList<PurchaseExpenseDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PurchaseExpenseDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("id"));
			purchaseExpenseDtos=criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return purchaseExpenseDtos;
	}

	@Override
	public PurchaseExpenseDto editPurchaseExpense(Integer id) {
		PurchaseExpenseDto purchaseExpenseDto = new PurchaseExpenseDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PurchaseExpenseDto.class);
			criteria.add(Restrictions.eq("id",id));
			purchaseExpenseDto = (PurchaseExpenseDto) criteria.uniqueResult();
			return purchaseExpenseDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return purchaseExpenseDto;
	}

	@Override
	public boolean deletePurchaseExpense(Integer id, HttpServletRequest request) {
		try {
			PurchaseExpenseDto purchaseExpenseDto = (PurchaseExpenseDto) sessionFactory
					.getCurrentSession().get(PurchaseExpenseDto.class, id);
			purchaseExpenseDto.setDeleted("Y");
			purchaseExpenseDto.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			purchaseExpenseDto.setDeleted_by(userId);
			
			Query queryPurchaseExpense = sessionFactory.getCurrentSession().
										createSQLQuery("update inv_purchase_expense_item_slave set deleted='Y',deleted_by="+userId+",delete_date_time=now() where purchase_expense_master_id="+id);
			queryPurchaseExpense.executeUpdate();
			sessionFactory.getCurrentSession().merge(purchaseExpenseDto);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
