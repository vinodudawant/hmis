package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.pharmacy.dao.ChequePaidEntryDao;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.CashPaidMaster;
import com.hms.pharmacy.pojo.ChequePaidMaster;
import com.hms.pharmacy.pojo.ChequePaidSlave;
import com.hms.pharmacy.pojo.DebitNoteMaster;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.VendorMaster;

@Repository
public class ChequePaidEntryDaoImpl implements ChequePaidEntryDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public boolean saveOrUpdateChequePaidEntry(ChequePaidMaster chequePaidMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(chequePaidMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<ChequePaidMaster> getChequePaidEntryLIst() {
		/*
		 * List<ChequePaidMaster> chequePaidMasters = null; try { Criteria
		 * criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(ChequePaidMaster.class);
		 * criteria.add(Restrictions.eq("chequePaidDeleteFlag", 0));
		 * chequePaidMasters = criteria.list();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return
		 * chequePaidMasters; } return chequePaidMasters;
		 */

		List<ChequePaidMaster> chequePaidMasters = new ArrayList<ChequePaidMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChequePaidMaster.class)
					.createAlias("vendorMaster", "vendorMaster");
			criteria.add(Restrictions.eq("chequePaidDeleteFlag", 0));
			criteria.addOrder(Order.desc("chequePaidId"));
			criteria.setMaxResults(10);

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("chequePaidId"));
			proList.add(Projections.property("vendorMaster.vendorId"));
			proList.add(Projections.property("vendorMaster.vendorName"));
			proList.add(Projections.property("chequePaidAmt"));
			proList.add(Projections.property("chequePaidDate"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				ChequePaidMaster chequePaidMaster = new ChequePaidMaster();
				chequePaidMaster.setChequePaidId(Integer.parseInt(master[0]
						.toString()));

				VendorMaster vendorMaster = new VendorMaster();
				vendorMaster
						.setVendorId(Integer.parseInt(master[1].toString()));

				if (master[2] != null)
					vendorMaster.setVendorName(master[2].toString());
				else
					vendorMaster.setVendorName("");

				chequePaidMaster.setChequePaidAmt(Double.parseDouble(master[3]
						.toString()));

				if (master[4] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[4].toString());
					chequePaidMaster.setChequePaidDate(date);
				}

				chequePaidMaster.setVendorMaster(vendorMaster);
				chequePaidMasters.add(chequePaidMaster);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return chequePaidMasters;
		}
		return chequePaidMasters;
	}

	@Override
	public boolean deleteChequePaidEntry(Integer chequePaidId) {
		/*
		 * try { ChequePaidMaster chequePaidMaster = (ChequePaidMaster)
		 * sessionFactory .getCurrentSession().get(ChequePaidMaster.class,
		 * chequePaidId); chequePaidMaster.setChequePaidDeleteFlag(1); } catch
		 * (Exception e) { e.printStackTrace(); return false; } return true;
		 */

		try {
			org.hibernate.Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_cheque_paid_master set cheque_paid_delete_flag=1 where cheque_paid_id="
									+ chequePaidId);

			int rowDeleted = query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;

	}

	// /for list
	@Override
	public List<ChequePaidMaster> getChequePaidbyVendorId(Integer vendorId) {
		// TODO Auto-generated method stub
		/*
		 * List<ChequePaidMaster> ltChequePaidMasters = null; try { Criteria
		 * criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(ChequePaidMaster.class);
		 * criteria.add(Restrictions.eq("chequePaidDeleteFlag", 0)); if
		 * (vendorId != 0) {
		 * criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId)); }
		 * ltChequePaidMasters = criteria.list();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return
		 * ltChequePaidMasters; } return ltChequePaidMasters;
		 */

		List<ChequePaidMaster> chequePaidMasters = new ArrayList<ChequePaidMaster>();

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChequePaidMaster.class)
					.createAlias("vendorMaster", "vendorMaster");
			criteria.add(Restrictions.eq("chequePaidDeleteFlag", 0));

			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("chequePaidId"));
			proList.add(Projections.property("chequePaidAmt"));
			proList.add(Projections.property("vendorMaster.vendorName"));
			proList.add(Projections.property("chequePaidDate"));
			proList.add(Projections.property("vendorMaster.vendorId"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				ChequePaidMaster saleMaster = new ChequePaidMaster();
				VendorMaster vendorMaster = new VendorMaster();
				if (master[0] != null) {
					saleMaster.setChequePaidId(Integer.parseInt(master[0]
							.toString()));
				}
				if (master[1] != null) {
					saleMaster.setChequePaidAmt(Double.parseDouble(master[1]
							.toString()));
				} else {
					saleMaster.setChequePaidAmt(0.0);
				}
				if (master[2] != null) {

					vendorMaster.setVendorName(master[2].toString());
				}
				if (master[3] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[3].toString());
					saleMaster.setChequePaidDate(date);
				}
				if (master[4] != null) {
					vendorMaster.setVendorId(Integer.parseInt(master[4]
							.toString()));

				}
				saleMaster.setVendorMaster(vendorMaster);
				chequePaidMasters.add(saleMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return chequePaidMasters;
		}
		return chequePaidMasters;

	}

	@Override
	public ChequePaidMaster getChequeReceiptDataById(Integer chequePaidId) {
		/*
		 * ChequePaidMaster ltCashReceiptMasters = null; try { Criteria criteria
		 * = sessionFactory.getCurrentSession()
		 * .createCriteria(ChequePaidMaster.class);
		 * criteria.add(Restrictions.eq("chequePaidDeleteFlag", 0)); if (cashId
		 * != 0) { criteria.add(Restrictions.eq("chequePaidId", cashId)); }
		 * ltCashReceiptMasters = (ChequePaidMaster) criteria.uniqueResult();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return
		 * ltCashReceiptMasters; } return ltCashReceiptMasters; }
		 */
		ChequePaidMaster chequeReceiptMasters = new ChequePaidMaster();
		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT cheque_paid_id,cheque_paid_doc_id,cheque_paid_date,vendor.vendor_name,vendor.vendor_mobile_num,cheque_paid_amt,cheque_paid_made_by, "
								+ " cheque_paid_cheque_num,cheque_paid_cheque_date,cheque_trans_type FROM  pharma_cheque_paid_master cheque inner join pharma_vendor_master vendor ON cheque.cheque_paid_vendor_id = vendor.vendor_id "
								+ " where cheque_paid_id=" + chequePaidId);

		String address = "";
		List<Object[]> result = query1.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					chequeReceiptMasters.setChequePaidId(Integer
							.parseInt(row[0].toString()));

				if (row[1] != null)
					chequeReceiptMasters.setChequePaidDocId(row[1].toString());

				if (row[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy/MM/dd");
					String str[] = row[2].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[0] + "-" + date[1] + "-" + date[2]);
					chequeReceiptMasters.setChequeTransType(stringBuffer
							.toString());
				}

				VendorMaster vendorMaster = new VendorMaster();
				if (row[3] != null)
					vendorMaster.setVendorName((row[3].toString()));
				else
					vendorMaster.setVendorName((""));

				if (row[4] != null)
					vendorMaster.setVendorMobileNumber(row[4].toString());
				else
					vendorMaster.setVendorMobileNumber("");

				if (row[5] != null)
					chequeReceiptMasters.setChequePaidAmt(Double
							.parseDouble(row[5].toString()));
				else
					chequeReceiptMasters.setChequePaidAmt(0.0);

				if (row[6] != null)
					chequeReceiptMasters
							.setChequePaidMadeBy((row[6].toString()));
				else
					chequeReceiptMasters.setChequePaidMadeBy((""));

				if (row[7] != null)
					chequeReceiptMasters.setChequePaidChequeNum((row[7]
							.toString()));
				else
					chequeReceiptMasters.setChequePaidChequeNum((""));

				if (row[9].toString().equals("1")) {
					if (row[8] != null) {
						SimpleDateFormat dateFormat = new SimpleDateFormat(
								"yyyy/MM/dd");
						String str[] = row[8].toString().split(" ");
						String date[] = str[0].split("-");
						StringBuffer stringBuffer = new StringBuffer();
						stringBuffer.append(date[0] + "-" + date[1] + "-"
								+ date[2]);
						chequeReceiptMasters
								.setChequePaidNarration(stringBuffer.toString());
					}
				} else {
					chequeReceiptMasters.setChequePaidNarration("");
				}

				if (row[9] != null) {
					if (row[9].toString().equals("0"))
						vendorMaster.setVendorCode("cash");
					else
						vendorMaster.setVendorCode("Cheque");
				} else {
					vendorMaster.setVendorCode("");

				}

				chequeReceiptMasters.setVendorMaster(vendorMaster);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<ChequePaidSlave> chequePaidSlaves = new ArrayList<ChequePaidSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							" select purchase.pur_doc_id,purchase.pur_bill_no,purchase.pur_bill_date,purchase.pur_net_amt from pharma_cheque_paid_master master "
									+ " inner join pharma_cheque_paid_slave c_slave ON c_slave.cheque_paid_master_id=master.cheque_paid_id inner join pharma_purchase_master purchase ON c_slave.cheque_paid_pur_id=purchase.pur_id where "
									+ " master.cheque_paid_id =" + chequePaidId);
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				ChequePaidSlave chequePaidSlave = new ChequePaidSlave();

				PurchaseMaster purchaseMaster = new PurchaseMaster();

				if (row[0] != null) {
					purchaseMaster.setPurDocId(row[0].toString());
				}

				if (row[1] != null)
					purchaseMaster.setPurBillNo(row[1].toString());
				else
					purchaseMaster.setPurBillNo((""));

				if (row[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy/MM/dd");
					String str[] = row[2].toString().split(" ");
					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[0] + "-" + date[1] + "-" + date[2]);
					purchaseMaster.setPurTransType(stringBuffer.toString());
				}

				if (row[3] != null)
					purchaseMaster.setPurNetAmt(Double.parseDouble(row[3]
							.toString()));
				else
					purchaseMaster.setPurNetAmt(0.0);

				chequePaidSlave.setPurchaseMaster(purchaseMaster);
				chequePaidSlaves.add(chequePaidSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		chequeReceiptMasters.setChequePaidSlaves(chequePaidSlaves);

		return chequeReceiptMasters;
	}

	@Override
	public ChequePaidMaster getBankDataById(Integer chequePaidId) {
		ChequePaidMaster chequeReceiptMasters = new ChequePaidMaster();
		BankMaster bank = new BankMaster();
		SQLQuery bankNameQuery = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT bank.bank_name FROM pharma_cheque_paid_master cheque inner join pharma_bank_master bank ON cheque.cheque_paid_bank_id = bank.bank_id "
								+ " where cheque_paid_id =" + chequePaidId);

		Object bankName = (Object) bankNameQuery.uniqueResult();
		try {
			if (bankName != null)
				bank.setBankName((bankName.toString()));
			else
				bank.setBankName((""));

			chequeReceiptMasters.setBankMaster(bank);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return chequeReceiptMasters;
	}
}