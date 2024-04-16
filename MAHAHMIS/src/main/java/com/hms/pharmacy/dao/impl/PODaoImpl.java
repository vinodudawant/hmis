package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.PODao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.PoSlave;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.pojo.VendorMaster;

@Repository
public class PODaoImpl implements PODao {

	@Autowired
	SessionFactory sessionFactory;

	Map<String, String> result = new HashMap<String, String>();
	int count = 0;

	@Override
	public Integer saveOrUpdatePO(PoMaster poMaster) {
		poMaster.setVendoradd((VendorAddress)sessionFactory.getCurrentSession().createQuery("from VendorAddress where vendorId="+poMaster.getVendorMaster().getVendorId()+" order by vendorAddressId desc").setMaxResults(1).uniqueResult());
		try {
			if (poMaster.getPoId() == null ) {
				return (Integer) sessionFactory.getCurrentSession().save(poMaster);
			} else {
				return (Integer) sessionFactory.getCurrentSession().merge(poMaster);
			}
			
			/* saveBatchStockDetails(poMaster); */
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
	}

	@Override
	public Map<String, String> saveOrUpdatePOInSale(PoMaster poMaster) {
		result = new HashMap<String, String>();
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(poMaster);
			result.put("result", "Record Save Succesfully");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
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
	//changed by Akshata
	@Override
	public Integer getNextAutoIncrement() {

		Integer id = 0;
		try {
			org.hibernate.Query query = sessionFactory
					.getCurrentSession()
					.createQuery(
							"SELECT MAX(partywisePoId) FROM PartywisePoInvoiceMaster ");
			Object id1 = query.uniqueResult();

			if(id1==null)
			{
				id1=0;
			}
			
			id = Integer.parseInt(id1.toString()) + 1;

		} catch (Exception e) {
			e.printStackTrace();
			return id;
		}
		return id;

	}
//changed by Akshata
	@Override
	public Boolean deletePO(Integer poId) {
		// TODO Auto-generated method stub
	
		try {
			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createQuery(
							"update PoMaster set poDeleteFlag=1 where poId="
									+ poId);
			int rowDeleted = query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;

	}
	//Added by Akshata
	@SuppressWarnings("unchecked")
	@Override
	public List<PoMaster> getPOList(Integer unitId) {
		// TODO Auto-generated method stub
		
		List<PoMaster> saleMasters = new ArrayList<PoMaster>();
		try {

			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery("CALL sp_get_po_data_all(:p_unit_id)");
			query.setParameter("p_unit_id", unitId);
			 query.setResultTransformer(Transformers.aliasToBean(PoMaster.class));
			 saleMasters= query.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;

	}
	//Added by Akshata
	@SuppressWarnings("unchecked")
	@Override
	public List<PoMaster> getPObyVendorId(Integer vendorId,Integer unitId) {
		// TODO Auto-generated method stub
		

		List<PoMaster> saleMasters = new ArrayList<PoMaster>();
		try {

			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery("CALL sp_get_po_data_by_vendor_id(:p_unit_id,:p_vendor_id)");
			
			 query.setParameter("p_unit_id", unitId);
			 query.setParameter("p_vendor_id", vendorId);
			 query.setResultTransformer(Transformers.aliasToBean(PoMaster.class));
			 saleMasters= query.list();
			

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;

	}

	@Override
	public PoMaster getPOById(Integer poId) {

		PoMaster purchaseMaster = new PoMaster();
	

		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT master.po_id,master.po_doc_id,master.po_date,vendor.vendor_name,vendor.vendor_id,master.po_type,master.po_remark,master.po_total_amt,master.po_product_count,vendor.vendor_mobile_num, "
								+ " master.po_total_vat,master.po_Net_total,party.invoice_id,master.po_created_by, vedadd.vAddrId, vedadd.vendor_state, vedadd.stateId FROM pharma_po_master master inner join pharma_vendor_master vendor ON master.po_vendor_id = vendor.vendor_id "
								+ " inner join pharma_partywise_po_invoice_master party ON party.po_Id = master.po_id inner join pharma_vendor_address vedadd ON vedadd.vAddrId = master.po_vendor_add_id where master.po_id='"
								+ poId + "' and master.po_delete_flag = '0'");

		List<Object[]> result = query1.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					purchaseMaster.setPoId(Integer.parseInt(row[0].toString()));
				else
					purchaseMaster.setPoId(0);

				if (row[1] != null) {
					purchaseMaster.setPodocId(row[1].toString());
				} else
					purchaseMaster.setPodocId("");

				if (row[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat.parse(row[2].toString());
					purchaseMaster.setPoDate(date);
				}
				VendorMaster vendorMaster = new VendorMaster();

				if (row[3] != null)
					vendorMaster.setVendorName(row[3].toString());

				if (row[4] != null)
					vendorMaster
							.setVendorId(Integer.parseInt(row[4].toString()));

				if (row[5] != null)
					purchaseMaster.setPoType(row[5].toString());
				else
					purchaseMaster.setPoType("");

				if (row[6] != null)
					purchaseMaster.setPoRemark(row[6].toString());
				else
					purchaseMaster.setPoRemark("");

				if (row[7] != null)
					purchaseMaster.setPoTotalAmt(Double.parseDouble(row[7]
							.toString()));

				if (row[8] != null)
					purchaseMaster.setPoProductCount(Integer.parseInt(row[8]
							.toString()));

				if (row[9] != null)
					vendorMaster.setVendorMobileNumber(row[9].toString());
				else
					vendorMaster.setVendorMobileNumber("");

				if (row[10] != null)
					purchaseMaster.setPoTotalVat(Double.parseDouble(row[10]
							.toString()));
				else
					purchaseMaster.setPoTotalVat(0.0);

				if (row[11] != null)
					purchaseMaster.setPoNetTotal(Double.parseDouble(row[11]
							.toString()));
				else
					purchaseMaster.setPoNetTotal(0.0);

				if (row[12] != null)
					purchaseMaster.setPoYear((row[12].toString()));
				else
					purchaseMaster.setPoYear((""));

				if (row[13] != null)
					purchaseMaster.setPoCreatedBy(Integer.parseInt((row[13]
							.toString())));
				else
					purchaseMaster.setPoCreatedBy(0);
				
				VendorAddress vendAdd=new VendorAddress();
				if (row[14] != null)
					vendAdd.setVendorAddressId(Integer.parseInt((row[14]
							.toString())));
				else
					vendAdd.setVendorAddressId( 0);
				
				if (row[15] != null)
					vendAdd.setState((row[15]
							.toString()));
				else
					vendAdd.setState("-");
				
				if (row[16] != null)
					vendAdd.setStateId(Integer.parseInt((row[16]
							.toString())));
				else
					vendAdd.setStateId( 0);
				
				purchaseMaster.setVendoradd(vendAdd);
				purchaseMaster.setVendorMaster(vendorMaster);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<PoSlave> purchaseSlaves = new ArrayList<PoSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							"select po_slave_qty,po_slave_mrp,po_slave_rate,po_slave_amt,p_slave.po_slave_scheme,product.product_name,product.product_uom_unit,company.comp_name,pack.pack_type,product.product_id,po_slave_Vat,po_hsn,po_Igst,po_Cess from pharma_po_master master inner join pharma_po_slave p_slave ON p_slave.po_slave_po_master_id = master.po_id inner join pharma_product_master product ON product.product_id = p_slave.po_slave_product_id inner join pharma_company_master company on company.comp_id=product.product_comp_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id where master.po_id = '"
									+ poId + "'");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				PoSlave purchaseSlave = new PoSlave();

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
					purchaseSlave.setPoSlaveVat(Double.parseDouble(row[10]
							.toString()));
				else
					purchaseSlave.setPoSlaveVat(0.0);
				
				if (row[11] != null)
					purchaseSlave.setHsn(row[11]
							.toString());
				else
					purchaseSlave.setHsn("");
				
				if (row[12] != null)
					purchaseSlave.setPoIgst(Double.parseDouble(row[12]
							.toString()));
				else
					purchaseSlave.setPoIgst(0.0);
				
				if (row[13] != null)
					purchaseSlave.setPoCess(Double.parseDouble(row[13]
							.toString()));
				else
					purchaseSlave.setPoCess(0.0);

				productMaster.setCompanyMaster(companyMaster);
				productMaster.setPackingMaster(packingMaster);
				purchaseSlave.setProductMaster(productMaster);
				purchaseSlaves.add(purchaseSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		purchaseMaster.setLtPOslave(purchaseSlaves);

		return purchaseMaster;
	}

	@Override
	public List<PurchaseMaster> getLastPurchaseVendor(Integer productId) {
		List<PurchaseMaster> ltpPoMasters = new ArrayList<PurchaseMaster>();
		try {
			Criteria criteria = sessionFactory
					.getCurrentSession()
					.createCriteria(PurchaseMaster.class)
					.createAlias("vendorMaster", "vendorMaster")
					.createAlias("ltPurSlave", "slave",
							CriteriaSpecification.LEFT_JOIN);

			criteria.add(Restrictions.eq("slave.productMaster.productId",
					productId));
			criteria.add(Restrictions.eq("purDeleteFlag", 0));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("vendorMaster.vendorName"));
			proList.add(Projections.property("slave.purSlaveQty"));
			proList.add(Projections.property("slave.purSlaveMrp"));
			proList.add(Projections.property("slave.purSlavePurchaseRate"));
			proList.add(Projections.property("slave.purVat"));
			proList.add(Projections.property("slave.purIgst"));
			proList.add(Projections.property("slave.purCess"));
			proList.add(Projections.property("slave.purSlaveBillRate"));
			criteria.setProjection(proList);

			if (productId != 0) {

			}
			List<Object[]> result = criteria.list();
			for (Object[] object : result) {
				PurchaseMaster purchaseMaster = new PurchaseMaster();
				List<PurchaseSlave> ltPurSlave1 = new ArrayList<PurchaseSlave>();
				PurchaseSlave purchaseSlave = new PurchaseSlave();
				if (object[0] != null) {
					VendorMaster vendorMaster = new VendorMaster();
					vendorMaster.setVendorName(object[0].toString());
					purchaseMaster.setVendorMaster(vendorMaster);
				}
				if (object[1] != null) {
					purchaseSlave.setPurSlaveQty(Integer.parseInt(object[1]
							.toString()));
				}
				if (object[2] != null) {
					purchaseSlave.setPurSlaveMrp(Double.parseDouble(object[2]
							.toString()));
				}
				if (object[3] != null) {
					purchaseSlave.setPurslaverate(Double.parseDouble(object[3]
							.toString()));
				}
				
				if (object[4] != null) {
					purchaseSlave.setPurVat(Double.parseDouble(object[4]
							.toString()));
				}
				if (object[5] != null) {
					purchaseSlave.setPurIgst(Double.parseDouble(object[5]
							.toString()));
				}
				if (object[6] != null) {
					purchaseSlave.setPurCess(Double.parseDouble(object[6]
							.toString()));
				}
				
				if (object[7] != null) {
					purchaseSlave.setPurSlaveBillRate(Double.parseDouble(object[7]
							.toString()));
				}
				
				ltPurSlave1.add(purchaseSlave);
				purchaseMaster.setLtPurSlave(ltPurSlave1);
				ltpPoMasters.add(purchaseMaster);
			}
			System.out.println(result);

		} catch (Exception e) {
			e.printStackTrace();
			return ltpPoMasters;
		}
		return ltpPoMasters;
	}
//added by Akshata
	@Override
	public PoMaster getPurchaseOrderByPurchaseId(Integer poId) {
		PoMaster poMaster = new PoMaster();
		poMaster.setPoId(poId);
		
		//List<PoSlave> purchaseSlaves=new ArrayList<PoSlave>();
		try {
			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
					/*
					 * "select     vendor.vendor_id,    vendor.vendor_name,    vendor.vendor_address,    vendor.vendor_mobile_num,    po_slave.po_slave_qty as poSlaveQty,    po_slave.po_hsn as hsn,    po_slave.po_Cess as poCess,    po_slave.po_igst as poIgst,    po_slave.po_slave_Vat as poSlaveVat,    product.product_id,    product.product_name,    product.product_uom_unit,    pack.pack_type,    comp.comp_name, po_slave.po_slave_rate as poSlaveRate,  po_slave.po_slave_mrp as poSlaveMrp,   vendorAdd.vAddrId,   vendorAdd.vendor_address as vd,  vendorAdd.vendor_state,  vendorAdd.vendor_mobile_num as vm,  vendorAdd.stateId ,ifnull(po_slave.po_slave_scheme,0) as poSlaveScheme  from    pharma_po_master po_Master        inner join    pharma_vendor_master vendor ON vendor.vendor_id = po_Master.po_vendor_id   inner join    pharma_vendor_address vendorAdd ON vendorAdd.vAddrId = po_Master.po_vendor_add_id     inner join    pharma_po_slave po_slave ON po_Master.po_id = po_slave.po_slave_po_master_id        inner join    pharma_product_master product ON product.product_id = po_slave.po_slave_product_id        inner join    pharma_company_master comp ON comp.comp_id = product.product_comp_id        inner join    pharma_packing_master pack ON pack.pack_id = product.product_pack_id where    po_Master.po_delete_flag = 0        and po_Master.po_id = '"
					 * + poId + "'"
					 */
							"CALL sp_get_purchase_order_by_purchase_id(:p_po_id)");
			query.setParameter("p_po_id", poId);
			//query.setParameter("p_unit_id", null);	
			query.setResultTransformer(Transformers.aliasToBean(PoSlave.class));
			@SuppressWarnings("unchecked")
			List<PoSlave> purchaseSlaves = query.list();
			poMaster.setLtPOslave(purchaseSlaves);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return poMaster;
	}

	@Override
	public PoMaster getPOByIdForPrint(Integer poId) {
		PoMaster purchaseMaster = new PoMaster();
		Query criteria=sessionFactory.getCurrentSession().createSQLQuery("select        this_.po_id as y0_,        this_.po_doc_id as y1_,        this_.po_date as y2_,        vendormast1_.vendor_name as y3_,        vendormast1_.vendor_id as y4_,        this_.po_type as y5_,        this_.po_total_amt as y6_,        ifnull(vendoradd3_.vendor_mobile_num,'') as y7_,        this_.po_total_vat as y8_,        this_.po_Net_total as y9_,       ifnull(partywisep2_.invoice_id,'"+poId+"') as y10_,        vendoradd3_.vendor_address as y11_,        vendoradd3_.vendor_city as y12_,        vendoradd3_.vendor_district as y13_,        vendoradd3_.vendor_state as y14_,        vendoradd3_.vendor_pincode as y15_,        vendoradd3_.vendor_gstn as y16_    from        pharma_po_master this_    inner join        pharma_vendor_master vendormast1_            on this_.po_vendor_id=vendormast1_.vendor_id    left join        pharma_vendor_address vendoradd3_            on this_.po_vendor_add_id=vendoradd3_.vAddrId    left join        pharma_partywise_po_invoice_master partywisep2_            on this_.po_id=partywisep2_.po_id    where        this_.po_delete_flag=0         and this_.po_id="+poId).setCacheable(true);
		@SuppressWarnings("unchecked")
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					purchaseMaster.setPoId(Integer.parseInt(row[0].toString()));
				else
					purchaseMaster.setPoId(0);

				if (row[1] != null) {
					purchaseMaster.setPodocId(row[1].toString());
				} else
					purchaseMaster.setPodocId("");

				if (row[2] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy/MM/dd" + "");
					String str[] = row[2].toString().split(" ");

					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[2] + "/" + date[1] + "/" + date[0]);

					purchaseMaster.setPoRemark(stringBuffer.toString());

					
					  SimpleDateFormat dateFormat2=new
					  SimpleDateFormat("yyyy-MM-dd"); java.util.Date
					  date2=dateFormat2.parse(row[2].toString());
					  purchaseMaster.setPoDate(date2);
					 
				}
				VendorMaster vendorMaster = new VendorMaster();
				VendorAddress vendoradd =new VendorAddress();
				
				if (row[3] != null)
					vendorMaster.setVendorName(row[3].toString());

				if (row[4] != null)
					vendorMaster
							.setVendorId(Integer.parseInt(row[4].toString()));

				if (row[5] != null)
					purchaseMaster.setPoType(row[5].toString());
				else
					purchaseMaster.setPoType("");

				if (row[6] != null)
					purchaseMaster.setPoTotalAmt(Double.parseDouble(row[6]
							.toString()));

				if (row[7] != null)
					vendoradd.setVendorMobileNumber(row[7].toString());
				else
					vendoradd.setVendorMobileNumber("");

				if (row[8] != null)
					purchaseMaster.setPoTotalVat(Double.parseDouble(row[8]
							.toString()));
				else
					purchaseMaster.setPoTotalVat(0.0);

				if (row[9] != null)
					purchaseMaster.setPoNetTotal(Double.parseDouble(row[9]
							.toString()));
				else
					purchaseMaster.setPoNetTotal(0.0);

				if (row[10] != null)

					purchaseMaster.setPoProductCount(Integer.parseInt(row[10]
							.toString()));

				else
					purchaseMaster.setPoProductCount(0);

				if (row[11] != null)
					vendoradd.setVendorAddress(row[11].toString());
				else
					vendoradd.setVendorAddress("");
				
				if (row[12] != null)
					vendoradd.setCity(row[12].toString());
				else
					vendoradd.setCity("");
				
				if (row[13] != null)
					vendoradd.setDistrict(row[13].toString());
				else
					vendoradd.setDistrict("");
				
				if (row[14] != null)
					vendoradd.setState(row[14].toString());
				else
					vendoradd.setState("");
				
				if (row[15] != null)
					vendoradd.setPincode(row[15].toString());
				else
					vendoradd.setPincode("");
				
				if (row[16] != null)
					vendoradd.setGstNo(row[16].toString());
				else
					vendoradd.setGstNo("");
				
				purchaseMaster.setVendoradd(vendoradd);
				purchaseMaster.setVendorMaster(vendorMaster);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<PoSlave> purchaseSlaves = new ArrayList<PoSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							"select po_slave_qty,po_slave_mrp,po_slave_rate,po_slave_amt,p_slave.po_slave_scheme,product.product_name,product.product_uom_unit,company.comp_name,pack.pack_type,product.product_id ,po_hsn ,po_slave_Vat, po_Igst,po_Cess from pharma_po_master master inner join pharma_po_slave p_slave ON p_slave.po_slave_po_master_id = master.po_id inner join pharma_product_master product ON product.product_id = p_slave.po_slave_product_id inner join pharma_company_master company on company.comp_id=product.product_comp_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id where master.po_id = '"
									+ poId + "'");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				PoSlave purchaseSlave = new PoSlave();

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
				
				else
					productMaster.setProductUnit(0.0);

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
					purchaseSlave.setHsn(row[10]
							.toString());
				
				if (row[11] != null)
					purchaseSlave.setPoSlaveVat(Double.parseDouble(row[11]
							.toString()));

				if (row[12] != null)
					purchaseSlave.setPoIgst(Double.parseDouble(row[12]
							.toString()));
				if (row[13] != null)
					purchaseSlave.setPoCess(Double.parseDouble(row[13]
							.toString()));
				
				

				productMaster.setCompanyMaster(companyMaster);
				productMaster.setPackingMaster(packingMaster);
				purchaseSlave.setProductMaster(productMaster);
				purchaseSlaves.add(purchaseSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		purchaseMaster.setLtPOslave(purchaseSlaves);

		return purchaseMaster;
	}
//added by Akshata
	@SuppressWarnings("unchecked")
	@Override
	public List<PoMaster> getPendingPO() {
		List<PoMaster> saleMasters = new ArrayList<PoMaster>();
		try {
			
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery("CALL sp_get_po_data_pending()");
			 query.setResultTransformer(Transformers.aliasToBean(PoMaster.class));
			 saleMasters= query.list();
			

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;
	}
}
