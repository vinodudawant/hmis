package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.pharmacy.dao.*;
import com.hms.pharmacy.pojo.*;
@Repository
public class ProductWithZeroStockDaoImpl implements ProductWithZeroStockDao
{
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public  Boolean  saveOrUpdatePO(PoMaster poMaster) 
	{
		try {
			
				sessionFactory.getCurrentSession().saveOrUpdate(poMaster);
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<ProductMaster> getZeroStockProductList() {
		List<ProductMaster> productMasters = new ArrayList<ProductMaster>();
		try
		{
			SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(" SELECT product.product_id,product_name,product_uom_unit,pack.pack_type,product_min_level,product_max_level,sum(stock.stock_qty_in_hand), "
                                    +" IF(product_min_level > sum(stock.stock_qty_in_hand),(product_min_level - (sum(stock.stock_qty_in_hand))),0) as diff,rate.pur_rate,rate.mrp,rate.rate,t.tax_rate "
                                    +" FROM pharma_product_master product inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_stock_master stock ON stock.stock_product_id = product.product_id inner join "
                                    +" pharma_batch_master batch ON batch.batch_product_id = product.product_id inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join  pharma_product_tax_relation tax ON tax.product_id = product.product_id "
                                    +" inner join pharma_tax_master t on t.tax_id=tax.tax_id where batch.batch_delete_flag = 0 and product.product_delete_flag = 0 group by product_id "
                                    +" order by diff Desc ;");
		
		List<Object[]> result = query1.list();
		
		for(Object[] master:result)
		{
			ProductMaster productMaster=new ProductMaster();
			if(master[0]!=null)
			{
				productMaster.setProductId(Integer.parseInt(master[0].toString()));
			}
			
			if(master[1]!=null)
			{
				productMaster.setProductName(master[1].toString());
			}
			
			if(master[2]!=null)
			{
				productMaster.setProductUnit(Double.parseDouble(master[2].toString()));
			}
			
			PackingMaster packingMaster=new PackingMaster();
			if(master[3]!=null)
			{
				packingMaster.setPackType(master[3].toString());
			}
			
			if(master[4]!=null)
			{
				productMaster.setProductMinLevel(Integer.parseInt(master[4].toString()));
			}
			
			if(master[5]!=null)
			{
				productMaster.setProductMaxLevel(Integer.parseInt(master[5].toString()));
			}
			
			if(master[6]!=null)
			{
				productMaster.setProductDesc((master[6].toString()));
			}
			if(master[11]!=null)
			{
				productMaster.setProductFixDiscount(Double.parseDouble(master[11].toString()));
			}
			
			productMaster.setPackingMaster(packingMaster);
			productMasters.add(productMaster);
			}
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
		return productMasters;
	
	}
	
	public List<StockMaster> getStockDetailsByProductId(Integer productId)
	{
		List<StockMaster> stockMasters =new ArrayList<StockMaster>();
		try {
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(StockMaster.class);
			criteria.add(Restrictions.eq("stockProductMaster.productId", productId));
			criteria.add(Restrictions.eq("stockDeleteFlag", 0));
			
			
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("stockId"));
		    proList.add(Projections.property("stockQtyInHand"));
		    
		    criteria.setProjection(proList);*/
			
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery("select stock.stock_id,stock.stock_qty_in_hand from pharma_purchase_master pm inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = pm.pur_id inner join pharma_purchase_rate pur_rate ON pur_rate.pur_slave_id = slave.pur_slave_id inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id where slave.pur_slave_product_id ='"+productId+"' and batch.batch_product_id = '"+productId+"' and batch.batch_delete_flag=0 and pm.pur_delete_flag = 0 ");
			List<Object[]> result = query.list();
		    
			/*List<Object[]> result = criteria.list();*/
			for(Object[] master:result)
			{
				StockMaster stockMaster=new StockMaster();
				stockMaster.setStockId(Integer.parseInt(master[0].toString()));
				stockMaster.setStockQtyInHand(Double.parseDouble(master[1].toString()));
				stockMasters.add(stockMaster);
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return stockMasters;
	}
	
	@Override
	public PoMaster getPOByIdForPrint(Integer poId) {
		PoMaster purchaseMaster = new PoMaster();
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(PoMaster.class)
				.createAlias("vendorMaster", "vendorMaster").createAlias("PartywisePoInvoiceMaster", "partywisePoInvoiceMaster");
		criteria.add(Restrictions.eq("poDeleteFlag", 0));
		if (poId != 0) {
			criteria.add(Restrictions.eq("poId", poId));
		}
		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("poId"));
		proList.add(Projections.property("podocId"));
		proList.add(Projections.property("poDate"));
		proList.add(Projections.property("vendorMaster.vendorName"));
		proList.add(Projections.property("vendorMaster.vendorId"));
		proList.add(Projections.property("poType"));
		proList.add(Projections.property("poTotalAmt"));
		proList.add(Projections.property("vendorMaster.vendorMobileNumber"));
		proList.add(Projections.property("poTotalVat"));
		proList.add(Projections.property("poNetTotal"));
		proList.add(Projections.property("partywisePoInvoiceMaster.partywisePoId"));
		criteria.setProjection(proList);
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
					purchaseMaster.setPoTotalAmt(Double.parseDouble(row[6]
							.toString()));

				if (row[7] != null)
					vendorMaster.setVendorMobileNumber(row[7].toString());
				else
					vendorMaster.setVendorMobileNumber("");

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
					
					purchaseMaster.setPoProductCount(Integer.parseInt(row[10].toString()));
							
				else
					purchaseMaster.setPoProductCount(0);

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
							"select po_slave_qty,po_slave_mrp,po_slave_rate,po_slave_amt,p_slave.po_slave_scheme,product.product_name,product.product_uom_unit,company.comp_name,pack.pack_type,product.product_id   from pharma_po_master master inner join pharma_po_slave p_slave ON p_slave.po_slave_po_master_id = master.po_id inner join pharma_product_master product ON product.product_id = p_slave.po_slave_product_id inner join pharma_company_master company on company.comp_id=product.product_comp_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id where master.po_id = '"
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
		purchaseMaster.setLtPOslave(purchaseSlaves);

		return purchaseMaster;
	}
	
	@Override
	public List<PoMaster> getPOList() {
		
		List<PoMaster> saleMasters = new ArrayList<PoMaster>();
		try {
			
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT master.po_Id,vendor.vendor_id,vendor.vendor_name,master.po_doc_id,master.po_date,master.po_product_count,master.po_status,party.invoice_id FROM "
                            +"  pharma_po_master master inner join pharma_vendor_master vendor ON master.po_vendor_id = vendor.vendor_id inner join pharma_partywise_po_invoice_master party ON party.po_Id = master.po_id "
                            +" where master.po_delete_flag = '0' and master.po_type='2' order by po_Id desc limit 10 ");

			List<Object[]> result = query.list();
			
			for (Object[] master : result) {

				PoMaster poMaster = new PoMaster();
				poMaster.setPoId(Integer.parseInt(master[0].toString()));

				VendorMaster vendorMaster = new VendorMaster();
				vendorMaster
						.setVendorId(Integer.parseInt(master[1].toString()));

				if (master[2] != null)
					vendorMaster.setVendorName(master[2].toString());
				else
					vendorMaster.setVendorName("");

				if (master[3] != null)
					poMaster.setPodocId(master[3].toString());
				else
					poMaster.setPodocId("");

				if (master[4] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[4].toString());
					poMaster.setPoDate(date);
				} else {
					SimpleDateFormat dateFormat1 = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date1 = dateFormat1.parse(master[4]
							.toString());
					poMaster.setPoDate(date1);
				}

				if (master[5] != null)
					poMaster.setPoProductCount(Integer.parseInt(master[5]
							.toString()));
				else
					poMaster.setPoProductCount(0);

				if (master[6] != null)
					poMaster.setPoStatus(master[6].toString());
				else
					poMaster.setPoStatus("");
				
			
				if (master[7] != null)
					poMaster.setPoDeleteFlag(Integer.parseInt(master[7].toString()));
				else
					poMaster.setPoDeleteFlag(Integer.parseInt(" "));
				
				
				poMaster.setVendorMaster(vendorMaster);

				saleMasters.add(poMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;

	}

	@Override
	public List<PoMaster> getPObyVendorId(Integer vendorId) {
		List<PoMaster> saleMasters = new ArrayList<PoMaster>();
		try {
			
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT master.po_Id,vendor.vendor_id,vendor.vendor_name,master.po_doc_id,master.po_date,master.po_product_count,master.po_status,party.invoice_id FROM "
                            +"  pharma_po_master master inner join pharma_vendor_master vendor ON master.po_vendor_id = vendor.vendor_id inner join pharma_partywise_po_invoice_master party ON party.po_Id = master.po_id "
                            +" where master.po_delete_flag = '0' and master.po_type='2' and vendor.vendor_id="+vendorId);

			List<Object[]> result = query.list();
		
			for (Object[] master : result) {

				PoMaster poMaster = new PoMaster();
				poMaster.setPoId(Integer.parseInt(master[0].toString()));

				VendorMaster vendorMaster = new VendorMaster();
				vendorMaster
						.setVendorId(Integer.parseInt(master[1].toString()));

				if (master[2] != null)
					vendorMaster.setVendorName(master[2].toString());
				else
					vendorMaster.setVendorName("");

				if (master[3] != null)
					poMaster.setPodocId(master[3].toString());
				else
					poMaster.setPodocId("");

				if (master[4] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[4].toString());
					poMaster.setPoDate(date);
				} else {
					SimpleDateFormat dateFormat1 = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date1 = dateFormat1.parse(master[4]
							.toString());
					poMaster.setPoDate(date1);
				}

				if (master[5] != null)
					poMaster.setPoProductCount(Integer.parseInt(master[5]
							.toString()));
				else
					poMaster.setPoProductCount(0);

				if (master[6] != null)
					poMaster.setPoStatus(master[6].toString());
				else
					poMaster.setPoStatus("");
				
			
				if (master[7] != null)
					poMaster.setPoDeleteFlag(Integer.parseInt(master[7].toString()));
				else
					poMaster.setPoDeleteFlag(Integer.parseInt(" "));
				
				
				poMaster.setVendorMaster(vendorMaster);

				saleMasters.add(poMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;

	}
	
}
