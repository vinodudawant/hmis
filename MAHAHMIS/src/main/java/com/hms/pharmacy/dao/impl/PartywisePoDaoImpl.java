package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.pharmacy.dao.PartywisePoDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PartywisePoMaster;
import com.hms.pharmacy.pojo.PartywisePoSlave;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.PoSlave;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.VendorMaster;

@Repository
public class PartywisePoDaoImpl implements PartywisePoDao {
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdatePO(PartywisePoMaster poMaster) {

		try {
			sessionFactory.getCurrentSession().saveOrUpdate(poMaster);

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public ProductMaster getProductDetails(Integer batchId) {

		ProductMaster productMaster = null;
		try {
			productMaster = (ProductMaster) sessionFactory.getCurrentSession()
					.get(ProductMaster.class, batchId);

		} catch (Exception e) {
			e.printStackTrace();

		}
		return productMaster;
	}

	@Override
	public Boolean deletePO(Integer poId) {

		try {
			PartywisePoMaster poMaster = (PartywisePoMaster) sessionFactory
					.getCurrentSession().get(PartywisePoMaster.class, poId);
			poMaster.setPoDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<PartywisePoMaster> getPOList() {

		List<PartywisePoMaster> ltpPoMasters = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PartywisePoMaster.class);
			criteria.add(Restrictions.eq("poDeleteFlag", 0));
			criteria.addOrder(Order.desc("poId"));
			criteria.setMaxResults(10);
			ltpPoMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltpPoMasters;
		}
		return ltpPoMasters;
	}

	@Override
	public List<PartywisePoMaster> getPObyVendorId(Integer vendorId) {

		List<PartywisePoMaster> ltpPoMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PartywisePoMaster.class);
			criteria.add(Restrictions.eq("poDeleteFlag", 0));
			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
			}
			ltpPoMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltpPoMasters;
		}
		return ltpPoMasters;
	}

	@Override
	public PartywisePoMaster getPOById(Integer poId) {

		PartywisePoMaster partywisePoMaster = new PartywisePoMaster();
		Criteria criteria = sessionFactory
				.getCurrentSession()
				.createCriteria(PartywisePoMaster.class)
				.createAlias("vendorMaster", "vendorMaster")
				.createAlias("PartywisePoInvoiceMaster",
						"partywisePoInvoiceMaster");
		criteria.add(Restrictions.eq("poDeleteFlag", 0));
		if (poId != 0) {
			criteria.add(Restrictions.eq("poId", poId));
		}

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("poId"));
		proList.add(Projections.property("podocId"));
		proList.add(Projections.property("poDate"));
		proList.add(Projections.property("vendorMaster.vendorName"));
		proList.add(Projections.property("vendorMaster.vendorMobileNumber"));
		proList.add(Projections.property("vendorMaster.vendorId"));
		proList.add(Projections.property("poType"));
		proList.add(Projections.property("poTotalAmt"));
		proList.add(Projections
				.property("partywisePoInvoiceMaster.partywisePoId"));

		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {


				if (row[1] != null) {
					partywisePoMaster.setPodocId(row[1].toString());
				} else
					partywisePoMaster.setPodocId("");

				if (row[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy/MM/dd");
					String str[] = row[2].toString().split(" ");
					partywisePoMaster.setPoYear(str[0]);

				}
				VendorMaster vendorMaster = new VendorMaster();

				if (row[3] != null)
					vendorMaster.setVendorName(row[3].toString());

				if (row[4] != null)
					vendorMaster.setVendorMobileNumber(row[4].toString());
				partywisePoMaster.setVendorMaster(vendorMaster);

				if (row[5] != null)
					partywisePoMaster.getVendorMaster().setVendorId(
							Integer.parseInt(row[5].toString()));

				if (row[6] != null)
					partywisePoMaster.setPoType(row[6].toString());
				else
					partywisePoMaster.setPoType("");

				if (row[7] != null)
					partywisePoMaster.setPoTotalAmt(Double.parseDouble(row[7]
							.toString()));

				if (row[8] != null)
					partywisePoMaster.setPoId(Integer.parseInt(row[8]
							.toString()));
				else
					partywisePoMaster.setPoId(0);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<PartywisePoSlave> purchaseSlaves = new ArrayList<PartywisePoSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(

							"select po_slave_qty,po_slave_mrp,po_slave_rate,po_slave_amt,p_slave.po_slave_scheme,product.product_name,product.product_uom_unit,company.comp_name,pack.pack_type,product.product_id   from pharma_partywise_po_master master inner join pharma_partywise_po_slave  p_slave ON p_slave.po_slave_po_master_id = master.po_id inner join pharma_product_master product ON product.product_id = p_slave.po_slave_product_id inner join pharma_company_master company on company.comp_id=product.product_comp_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id where master.po_id = '"
									+ poId + "'");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				PartywisePoSlave purchaseSlave = new PartywisePoSlave();

				if (row[0] != null)
					purchaseSlave.setPoSlaveQty(Integer.parseInt(row[0]
							.toString()));

				if (row[1] != null)
					purchaseSlave.setPoSlaveMrp(Double.parseDouble(row[1]
							.toString()));

				if (row[2] != null)
					purchaseSlave.setPoSlaveRate(Double.parseDouble(row[2]
							.toString()));

				if (row[3] != null)
					purchaseSlave.setPoSlaveAmt(Double.parseDouble(row[3]
							.toString()));

				if (row[4] != null)
					purchaseSlave.setPoSlaveScheme(Double.parseDouble(row[4]
							.toString()));

				ProductMaster productMaster = new ProductMaster();
				if (row[5] != null) {
					productMaster.setProductName(row[5].toString());
					purchaseSlave.setProductMaster(productMaster);
				} else {
					productMaster.setProductName("");
				}

				if (row[6] != null)
					productMaster.setProductUnit(Double.parseDouble(row[6]
							.toString()));

				CompanyMaster companyMaster = new CompanyMaster();

				if (row[7] != null)
					companyMaster.setCompName(row[7].toString());
				else
					companyMaster.setCompName("");

				PackingMaster packingMaster = new PackingMaster();

				if (row[8] != null)
					packingMaster.setPackType(row[8].toString());
				else
					packingMaster.setPackType("");

				if (row[8] != null)
					productMaster.setProductId(Integer.parseInt(row[9]
							.toString()));

				productMaster.setCompanyMaster(companyMaster);
				productMaster.setPackingMaster(packingMaster);
				purchaseSlave.setProductMaster(productMaster);
				purchaseSlaves.add(purchaseSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		partywisePoMaster.setLtPOslave(purchaseSlaves);

		return partywisePoMaster;

	}

	@Override
	public PartywisePoMaster getPOByIdEdit(Integer poId) {

		PartywisePoMaster partywisePoMaster = new PartywisePoMaster();
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(PartywisePoMaster.class)
				.createAlias("vendorMaster", "vendorMaster");
		criteria.add(Restrictions.eq("poDeleteFlag", 0));
		if (poId != 0) {
			criteria.add(Restrictions.eq("poId", poId));
		}

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("poId"));
		proList.add(Projections.property("podocId"));
		proList.add(Projections.property("poDate"));
		proList.add(Projections.property("vendorMaster.vendorName"));
		proList.add(Projections.property("vendorMaster.vendorMobileNumber"));
		proList.add(Projections.property("vendorMaster.vendorId"));
		proList.add(Projections.property("poType"));
		proList.add(Projections.property("poTotalAmt"));
		proList.add(Projections.property("vendorMaster.vendorAddress"));
		proList.add(Projections.property("poCreatedBy"));
		proList.add(Projections.property("ipAddress"));

		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					partywisePoMaster.setPoId(Integer.parseInt(row[0]
							.toString()));
				else
					partywisePoMaster.setPoId(0);

				if (row[1] != null) {
					partywisePoMaster.setPodocId(row[1].toString());
				} else
					partywisePoMaster.setPodocId("");

				if (row[2] != null) {
					String str[] = row[2].toString().split(" ");
					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[2] + "/" + date[1] + "/" + date[0]);
					partywisePoMaster.setPoYear(stringBuffer
							.toString());

				}
				VendorMaster vendorMaster = new VendorMaster();

				if (row[3] != null)
					vendorMaster.setVendorName(row[3].toString());

				if (row[4] != null)
					vendorMaster.setVendorMobileNumber(row[4].toString());
				partywisePoMaster.setVendorMaster(vendorMaster);

				if (row[5] != null)
					partywisePoMaster.getVendorMaster().setVendorId(
							Integer.parseInt(row[5].toString()));

				if (row[6] != null)
					partywisePoMaster.setPoType(row[6].toString());
				else
					partywisePoMaster.setPoType("");

				if (row[7] != null)
					partywisePoMaster.setPoTotalAmt(Double.parseDouble(row[7]
							.toString()));

				if (row[8] != null)
					partywisePoMaster.getVendorMaster().setVendorAddress(
							row[8].toString());
				else
					partywisePoMaster.getVendorMaster().setVendorAddress((""));

				if (row[9] != null)
					partywisePoMaster.setPoCreatedBy(Integer.parseInt(row[9].toString()));
				else
					partywisePoMaster.setPoCreatedBy(0);

				if (row[10] != null)
					partywisePoMaster.setIpAddress(row[10].toString());
				else
					partywisePoMaster.setIpAddress("");

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<PartywisePoSlave> purchaseSlaves = new ArrayList<PartywisePoSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(

							"select po_slave_qty,po_slave_mrp,po_slave_rate,po_slave_amt,p_slave.po_slave_scheme,product.product_name,product.product_uom_unit,company.comp_name,pack.pack_type,product.product_id,p_slave.po_stock_qty,p_slave.partywise_po_pur_id  from pharma_partywise_po_master master inner join pharma_partywise_po_slave  p_slave ON p_slave.po_slave_po_master_id = master.po_id inner join pharma_product_master product ON product.product_id = p_slave.po_slave_product_id inner join pharma_company_master company on company.comp_id=product.product_comp_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id where master.po_id = '"
									+ poId + "'");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				PartywisePoSlave purchaseSlave = new PartywisePoSlave();

				if (row[0] != null)
					purchaseSlave.setPoSlaveQty(Integer.parseInt(row[0]
							.toString()));

				if (row[1] != null)
					purchaseSlave.setPoSlaveMrp(Double.parseDouble(row[1]
							.toString()));

				if (row[2] != null)
					purchaseSlave.setPoSlaveRate(Double.parseDouble(row[2]
							.toString()));

				if (row[3] != null)
					purchaseSlave.setPoSlaveAmt(Double.parseDouble(row[3]
							.toString()));

				if (row[4] != null)
					purchaseSlave.setPoSlaveScheme(Double.parseDouble(row[4]
							.toString()));

				ProductMaster productMaster = new ProductMaster();
				if (row[5] != null) {
					productMaster.setProductName(row[5].toString());
					purchaseSlave.setProductMaster(productMaster);
				} else {
					productMaster.setProductName("");
				}

				if (row[6] != null)
					productMaster.setProductUnit(Double.parseDouble(row[6]
							.toString()));

				CompanyMaster companyMaster = new CompanyMaster();

				if (row[7] != null)
					companyMaster.setCompName(row[7].toString());
				else
					companyMaster.setCompName("");

				PackingMaster packingMaster = new PackingMaster();

				if (row[8] != null)
					packingMaster.setPackType(row[8].toString());
				else
					packingMaster.setPackType("");

				if (row[9] != null)
					productMaster.setProductId(Integer.parseInt(row[9]
							.toString()));

				if (row[10] != null)
					purchaseSlave.setTotalstockQty(Integer.parseInt(row[10]
							.toString()));

				if (row[11] != null) {
					purchaseSlave.setPartywisePoPurId(Integer.parseInt(row[11].toString()));
				}

				productMaster.setCompanyMaster(companyMaster);
				productMaster.setPackingMaster(packingMaster);
				purchaseSlave.setProductMaster(productMaster);
				purchaseSlaves.add(purchaseSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		partywisePoMaster.setLtPOslave(purchaseSlaves);

		return partywisePoMaster;

	}

	@Override
	public List<PurchaseMaster> getLastPurchaseVendor(Integer productId) {
		List<PurchaseMaster> ltpPoMasters = null;
		try {
			Criteria criteria = sessionFactory
					.getCurrentSession()
					.createCriteria(PurchaseMaster.class)
					.createAlias("ltPurSlave", "slave",
							CriteriaSpecification.LEFT_JOIN);

			criteria.add(Restrictions.eq("slave.productMaster.productId",
					productId));
			criteria.add(Restrictions.eq("purDeleteFlag", 0));

			if (productId != 0) {

			}
			ltpPoMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltpPoMasters;
		}
		return ltpPoMasters;
	}

}
