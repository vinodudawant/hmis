package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.CashPaidEntryDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.CashPaidMaster;
import com.hms.pharmacy.pojo.CashPaidSlave;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.ChequePaidMaster;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.VendorMaster;

@Repository
public class CashPaidEntryDaoImpl implements CashPaidEntryDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public boolean saveOrUpdateCashPaidEntry(CashPaidMaster cashPaidMaster) {
		try {
			
			sessionFactory.getCurrentSession().saveOrUpdate(cashPaidMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<CashPaidMaster> getCashPaidEntryLIst() {
		/*List<CashPaidMaster> cashPaidMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashPaidMaster.class);
			criteria.add(Restrictions.eq("cashPaidDeleteFlag", 0));
			cashPaidMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return cashPaidMasters;
		}
		return cashPaidMasters;*/
		
		List<CashPaidMaster> cashPaidMasters = new ArrayList<CashPaidMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashPaidMaster.class).createAlias("vendorMaster", "vendorMaster");
			criteria.add(Restrictions.eq("cashPaidDeleteFlag", 0));
			criteria.addOrder(Order.desc("cashPaidId"));
			criteria.setMaxResults(10);
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("cashPaidId"));
		    proList.add(Projections.property("vendorMaster.vendorId"));
		    proList.add(Projections.property("vendorMaster.vendorName"));
		    proList.add(Projections.property("cashPaidAmt"));
		    proList.add(Projections.property("cashPaidDate"));
		   
		    criteria.setProjection(proList);
			List<Object[]> result = criteria.list();
			
			for(Object[] master:result)
			{
					CashPaidMaster cashPaidMaster=new CashPaidMaster();
					cashPaidMaster.setCashPaidId(Integer.parseInt(master[0].toString()));
					
					VendorMaster vendorMaster=new VendorMaster();
					vendorMaster.setVendorId(Integer.parseInt(master[1].toString()));
					
					if(master[2]!=null)
						vendorMaster.setVendorName(master[2].toString());
					else
						vendorMaster.setVendorName("");
					
					cashPaidMaster.setCashPaidAmt(Double.parseDouble(master[3].toString()));
					
					if(master[4]!=null)
					{
						SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
						java.util.Date date=dateFormat.parse(master[4].toString());
						cashPaidMaster.setCashPaidDate(date);
					}
										
					cashPaidMaster.setVendorMaster(vendorMaster);
					cashPaidMasters.add(cashPaidMaster);
				
			}
				

		} catch (Exception e) {
			e.printStackTrace();
			return cashPaidMasters;
		}
		return cashPaidMasters;
	}

	@Override
	public CashPaidMaster getCashPaidEntryById(Integer cashPaidId) {
		CashPaidMaster cashPaidMaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashPaidMaster.class);
			criteria.add(Restrictions.eq("cashPaidDeleteFlag", 0));
			if (cashPaidId != 0) {
				criteria.add(Restrictions.eq("cashPaidId", cashPaidId));
			}

			cashPaidMaster = (CashPaidMaster) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return cashPaidMaster;
		}
		return cashPaidMaster;
	}

	@Override
	public boolean deleteCashPaidEntry(Integer cashPaidId) {
		/*try {
			CashPaidMaster cashPaidMaster = (CashPaidMaster) sessionFactory
					.getCurrentSession().get(CashPaidMaster.class, cashPaidId);
			cashPaidMaster.setCashPaidDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;*/
		
		try
		{
			org.hibernate.Query query=sessionFactory.getCurrentSession().createSQLQuery("update pharma_cash_paid_master set cash_paid_delete_flag=1 where cash_paid_id="+cashPaidId); 

			int rowDeleted=query.executeUpdate();
	
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
	return true;
		
		
	}

	@Override
	public List<PendingBill> getPendingBills(Integer vendorId) {

		List<PendingBill> pendingBills = new ArrayList<PendingBill>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select purchase.pur_bill_no,purchase.pur_bill_date,purchase.pur_doc_id,purchase.pur_entry_date,purchase.pur_trans_type,purchase.pur_net_amt from  pharma_purchase_master purchase where purchase.pur_vendor_id="
									+ vendorId
									+ " and pur_status='y' and pur_delete_flag=0;");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				PendingBill pendingBill = new PendingBill();
				if (row[0]!= null)
					pendingBill.setBillNo(row[0].toString());
				
				if (row[1]!= null)
					pendingBill.setBillDate(row[1].toString());
				
				if (row[2]!= null)
					pendingBill.setVouNo(row[2].toString());
				
				if (row[3]!= null)
					pendingBill.setVouDate(row[3].toString());
				
				if (row[4]!= null)
					pendingBill.setType(row[4].toString());
				
				if (row[5]!= null)
					pendingBill.setNetAmount(row[5].toString());
				
				pendingBills.add(pendingBill);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pendingBills;
	}

	@Override
	public void setPurchaseStatus(List<PurchaseMaster> purchaseMasters) {
		for(PurchaseMaster purchaseMaster:purchaseMasters)
		{
			Query query=sessionFactory.getCurrentSession().createQuery("update PurchaseMaster set purchaseStatus='n' where purId=:purchaseId");
			query.setInteger("purchaseId", purchaseMaster.getPurId());
			int rowsDeleted=query.executeUpdate();
		}
		
	}
	//search 
	@Override
	public List<CashPaidMaster> getCashPaidbyVendorId(Integer vendorId) {
		// TODO Auto-generated method stub
		/*List<CashPaidMaster> ltCashPaidMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashPaidMaster.class);
			criteria.add(Restrictions.eq("cashPaidDeleteFlag", 0));
			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
			}
			ltCashPaidMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCashPaidMasters;
		}
		return ltCashPaidMasters;*/
List<CashPaidMaster> cashPaidMasters = new ArrayList<CashPaidMaster>();
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashPaidMaster.class).createAlias("vendorMaster", "vendorMaster");
			criteria.add(Restrictions.eq("cashPaidDeleteFlag", 0));

			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("cashPaidId"));
			proList.add(Projections.property("cashPaidAmt"));
			proList.add(Projections.property("vendorMaster.vendorName"));
			proList.add(Projections.property("cashPaidDate"));
			proList.add(Projections.property("vendorMaster.vendorId"));
			

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				CashPaidMaster saleMaster = new CashPaidMaster();
				VendorMaster vendorMaster=new VendorMaster();
				if (master[0] != null) {
					saleMaster.setCashPaidId(Integer.parseInt(master[0]
							.toString()));
				}
				if (master[1] != null) {
					saleMaster.setCashPaidAmt(Double.parseDouble(master[1].toString()));
				} else {
					saleMaster.setCashPaidAmt(0.0);
				}
				if (master[2] != null) {
					
					vendorMaster.setVendorName(master[2].toString());
				} 
				if (master[3] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[3].toString());

					saleMaster.setCashPaidDate(date);
				}
				if (master[4] != null) {
					vendorMaster.setVendorId(Integer.parseInt(master[4].toString()));
					saleMaster.setVendorMaster(vendorMaster);
				}
				cashPaidMasters.add(saleMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return cashPaidMasters;
		}
		return cashPaidMasters;
		
	}
	
	@Override
	public CashPaidMaster getCashPaidDataSaleById(Integer cashId) {
		CashPaidMaster ltCashReceiptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashPaidMaster.class);
			criteria.add(Restrictions.eq("cashPaidDeleteFlag", 0));
			if (cashId != 0) {
				criteria.add(Restrictions.eq("cashPaidId", cashId));
			}
			ltCashReceiptMasters = (CashPaidMaster) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCashReceiptMasters;
		}
		return ltCashReceiptMasters;
	}

	@Override
	public List<CashPaidMaster> getAllCashPaidDataByVendorId(Integer vendorId) {
		/*List<CashPaidMaster> cashPaidMasters = new ArrayList<CashPaidMaster>();
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashPaidMaster.class).createAlias("vendorMaster", "vendorMaster");
			criteria.add(Restrictions.eq("cashPaidDeleteFlag", 0));

			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
			}
			cashPaidMasters=criteria.list();
		}
		catch(Exception e)
		{
			
		}
		return cashPaidMasters;*/
		List<CashPaidMaster> cashPaidMasters = new ArrayList<CashPaidMaster>();
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashPaidMaster.class).createAlias("vendorMaster","vendorMaster");
			criteria.add(Restrictions.eq("cashPaidDeleteFlag", 0));
			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
			}
			
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("cashPaidId"));
			proList.add(Projections.property("cashPaidDocId"));
			proList.add(Projections.property("cashPaidDate"));
			proList.add(Projections.property("vendorMaster.vendorName"));
			proList.add(Projections.property("vendorMaster.vendorMobileNumber"));
			proList.add(Projections.property("cashPaidAmt"));
			proList.add(Projections.property("vendorMaster.vendorId"));
			
			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();
			try
			{
				for (Object[] row : result) {
					
					CashPaidMaster purchaseMaster=new CashPaidMaster();
							
					if(row[0]!=null)
						purchaseMaster.setCashPaidId(Integer.parseInt(row[0].toString()));
					else
						purchaseMaster.setCashPaidId(0);
					
					if(row[1]!=null)
					{											
						purchaseMaster.setCashPaidDocId(row[1].toString());
					}	
					else
						purchaseMaster.setCashPaidDocId("");
					
					if(row[2]!=null)
					{
						SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
						
							java.util.Date date = dateFormat
									.parse(row[2].toString());
							purchaseMaster.setCashPaidDate(date);
					}
					
					VendorMaster vendorMaster=new VendorMaster();
									
					if(row[3]!=null)
					vendorMaster.setVendorName(row[3].toString());
					
					if(row[4]!=null)
						vendorMaster.setVendorMobileNumber(row[4].toString());
					else
						vendorMaster.setVendorMobileNumber("");
					
					if(row[5]!=null)
						purchaseMaster.setCashPaidAmt(Double.parseDouble(row[5].toString()));
					else
						purchaseMaster.setCashPaidAmt(0.0);
					
					if(row[6]!=null)
						vendorMaster.setVendorId(Integer.parseInt(row[6].toString()));
					else
						vendorMaster.setVendorId(0);
					
					
					purchaseMaster.setVendorMaster(vendorMaster);
					
					
					//for Slave
					
					List<CashPaidSlave> purchaseSlaves = new ArrayList<CashPaidSlave>();
					try {
						SQLQuery query = sessionFactory
								.getCurrentSession()
								.createSQLQuery("select slave.cash_paid_amt,slave.cash_paid_pur_id,p_m.pur_bill_no from pharma_cash_paid_master master inner join pharma_cash_paid_slave slave on slave.cash_paid_master_id=master.cash_paid_id inner join pharma_purchase_master p_m on p_m.pur_id=slave.cash_paid_pur_id where master.cash_paid_id = '"+row[0]+"';");
						List<Object[]> rows = query.list();
						for (Object[] slaves : rows) {
							CashPaidSlave purchaseSlave = new CashPaidSlave();
							
							if(row[0]!=null)
								purchaseSlave.setCashPaidAmt(Double.parseDouble(slaves[0].toString()));
							else
								purchaseSlave.setCashPaidAmt(0.0);
							
							
							PurchaseMaster purchaseMaster2=new PurchaseMaster();
							if(row[1]!=null)
							{
								purchaseMaster2.setPurId(Integer.parseInt(slaves[1].toString()));
							}	
							
							if(row[2]!=null)
							{
								purchaseMaster2.setPurBillNo(slaves[2].toString());
							}
							purchaseSlave.setPurchaseMaster(purchaseMaster2);
							purchaseSlaves.add(purchaseSlave);
						}
					}
					catch (Exception e) 
					{
						e.printStackTrace();
					}
					purchaseMaster.setCashPaidSlaves(purchaseSlaves);
					
					
					cashPaidMasters.add(purchaseMaster);
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			return cashPaidMasters;
	}
}	
