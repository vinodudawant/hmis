package com.hms.pharmacy.dao.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.HospitalSalesBillDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.HospitalSale;
import com.hms.pharmacy.pojo.HospitalSaleBillMaster;
import com.hms.pharmacy.pojo.HospitalSaleBillPrint;
import com.hms.pharmacy.pojo.HospitalSaleBillSlave;
import com.hms.pharmacy.pojo.IndentSale;
import com.hms.pharmacy.pojo.InwardResult;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.pojo.StockMaster;

@Repository
public class HospitalSalesBillDaoImpl implements HospitalSalesBillDao {
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public boolean saveHospitalSalesBill(
			HospitalSaleBillMaster hospitalSaleBillMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(
					hospitalSaleBillMaster);
			saveBatchStockDetails(hospitalSaleBillMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;

	}

	public void saveBatchStockDetails(
			HospitalSaleBillMaster hospitalSaleBillMaster) {
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		for (HospitalSaleBillSlave slave : hospitalSaleBillMaster
				.getHospitalSaleBillSlaves()) {
			if (slave.getProductMaster().getBatchMaster().get(0).getBatchId() != null) {
				BatchMaster batchMaster = new BatchMaster();
				batchMaster.setBatchId(slave.getProductMaster()
						.getBatchMaster().get(0).getBatchId());

				StockMaster stockMaster = new StockMaster();
				if (slave.getProductMaster().getBatchMaster().get(0)
						.getStockMaster() != null) {
					/*stockMaster.setStockId(slave.getProductMaster()
							.getBatchMaster().get(0).getStockMaster()
							.getStockId());*/

					/*int qty = (int) (slave.getProductMaster().getBatchMaster()
							.get(0).getStockMaster().getStockQtyInHand() - slave
							.getHospitalSlaveQty());*/
					stockMaster.setStockQtyInHand(Double.parseDouble(slave.getHospitalSlaveQty().toString()));
				}

				batchMaster.setStockMaster(stockMaster);
				batchMasters.add(batchMaster);
			}
		}
		try {
			for (BatchMaster batchMaster : batchMasters) {
				/*BatchMaster batchMaster2 = getBatchDetails(batchMaster
						.getBatchId());
				StockMaster stockMaster = batchMaster2.getStockMaster();
				
				Double qty = (stockMaster.getStockQtyInHand()) - (batchMaster.getStockMaster().getStockQtyInHand());
				
				stockMaster.setStockQtyInHand(qty);
				batchMaster2.setStockMaster(stockMaster);
				sessionFactory.getCurrentSession().saveOrUpdate(batchMaster2);*/
				decreaseStock(batchMaster
						.getBatchId(),batchMaster.getStockMaster().getStockQtyInHand());
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
	}

	public void decreaseStock(Integer batchId, Double Qty) {
		try {
			
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT stock_qty_in_hand FROM pharma_stock_master where stock_batch_id='"+batchId+"'"); 
			Double availableStock=null;
			Double totalStock=null;
			Object rows = query.uniqueResult();
					
			if(rows!=null)
			{
				availableStock=Double.parseDouble(rows.toString());
			}
			
			if(availableStock >= Qty)
				totalStock=availableStock-Qty;
			
			SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
			String date=dateFormat.format(new java.util.Date());
			
			try
			{
				Query query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_stock_master set stock_qty_in_hand='"+totalStock+"',stock_update_date='"+date+"' where stock_batch_id=:batchId");
			query1.setInteger("batchId", batchId);
			int rowsDeleted = query1.executeUpdate();
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public BatchMaster getBatchDetails(Integer batchId) throws ParseException {
		/*
		 * BatchMaster batchMaster = null; try { batchMaster = (BatchMaster)
		 * sessionFactory.getCurrentSession().get( BatchMaster.class, batchId);
		 * 
		 * } catch (Exception e) { e.printStackTrace();
		 * 
		 * } return batchMaster;
		 */

		BatchMaster batchMaster = new BatchMaster();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				BatchMaster.class);
		criteria.add(Restrictions.eq("batchId", batchId))
				.createAlias("productMaster", "productMaster")
				.createAlias("stockMaster", "stockMaster");

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("batchId"));
		proList.add(Projections.property("batchCode"));
		proList.add(Projections.property("batchExpDate"));
		proList.add(Projections.property("batchDeleteFlag"));
		proList.add(Projections.property("batchUpdateDate"));
		proList.add(Projections.property("productMaster.productId"));
		proList.add(Projections.property("stockMaster.stockId"));
		/* proList.add(Projections.property("stockMaster.stockId")); */
		proList.add(Projections.property("stockMaster.stockQtyInHand"));
		proList.add(Projections.property("stockMaster.stockQtyOnOrder"));
		proList.add(Projections.property("stockMaster.stockYearId"));
		proList.add(Projections.property("stockMaster.stockDeleteFlag"));
		proList.add(Projections.property("stockMaster.stockUpdateDate"));

		criteria.setProjection(proList);

		List<Object[]> result = criteria.list();
		for (Object[] master : result) {

			ProductMaster productMaster = new ProductMaster();
			StockMaster stockMaster = new StockMaster();
			if (master[0] != null) {
				batchMaster.setBatchId(Integer.parseInt(master[0].toString()));
			}
			if (master[1] != null) {
				batchMaster.setBatchCode(master[1].toString());
			}
			if (master[2] != null) {
				batchMaster.setBatchExpDate(master[2].toString());
			}
			if (master[3] != null) {
				batchMaster.setBatchDeleteFlag(Integer.parseInt(master[3]
						.toString()));
			}
			if (master[4] != null) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[4].toString());
				batchMaster.setBatchUpdateDate(date);
			}
			if (master[5] != null) {
				productMaster.setProductId(Integer.parseInt(master[5]
						.toString()));
			}
			if (master[6] != null) {
				stockMaster.setStockId(Integer.parseInt(master[6].toString()));
			}
			if (master[7] != null) {
				stockMaster.setStockQtyInHand(Double.parseDouble(master[7]
						.toString()));
			}
			if (master[8] != null) {
				stockMaster.setStockQtyOnOrder(Integer.parseInt(master[8]
						.toString()));
			}
			if (master[9] != null) {
				stockMaster.setStockYearId(Integer.parseInt(master[9]
						.toString()));
			}
			if (master[10] != null) {
				stockMaster.setStockDeleteFlag(Integer.parseInt(master[10]
						.toString()));
			}
			if (master[11] != null) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[11].toString());
				/* java.sql.Date date=master[11].toString() */
				java.sql.Date sqlDate = new java.sql.Date(date.getTime());
				stockMaster.setStockUpdateDate(sqlDate);
			}
			stockMaster.setStockProductMaster(productMaster);
			stockMaster.setBatchMaster(batchMaster);

			batchMaster.setProductMaster(productMaster);
			batchMaster.setStockMaster(stockMaster);

		}
		return batchMaster;
	}

	@Override
	public List<InwardResult> getDetailsByInward(Integer inwardNo) {
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"select om.idorder_master,p.Patient_ID,p.fName,p.addressLine1,doc.Doctor_ID,doc.doc_name,doc.address,pm.product_Id,h.Hname,ocd.quantity,p.mobile from order_master om inner join treatment tre on om.Treatment_ID=tre.Treatment_ID inner join patient p on p.Patient_ID=tre.Patient_ID inner join doctor doc on doc.Doctor_ID=tre.doctor_id inner join order_comp_druges ocd on ocd.idorder_master=om.idorder_master inner join pharma_product_master pm on pm.product_id=ocd.invProdID inner join treatment_beds tbed on tre.Treatment_ID=tbed.Treatment_ID inner join beds bed on bed.Bed_ID = tbed.Bed_ID inner join hall h on h.Hall_ID = bed.Hall_ID where tbed.status='Y' and om.idorder_master='"
								+ inwardNo + "' and ocd.status='Y'");
		List<InwardResult> inwardResults = new ArrayList<InwardResult>();
		List<Object[]> rows = query.list();
		for (Object[] row : rows) {
			InwardResult inwardResult = new InwardResult();
			inwardResult.setInwardNo(row[0].toString());

			inwardResult.setPatientId(row[1].toString());
			inwardResult.setPatientName(row[2].toString());
			inwardResult.setPatientAddress(row[3].toString());

			inwardResult.setDoctorId(row[4].toString());
			inwardResult.setDoctorName(row[5].toString());
			inwardResult.setDoctorAddress(row[6].toString());
			inwardResult.setProductId(row[7].toString());
			inwardResult.setWardName(row[8].toString());
			inwardResult.setProductQuantity(row[9].toString());
			inwardResult.setPatientMobileNumber(row[10].toString());

			inwardResults.add(inwardResult);
		}

		return inwardResults;
	}

	@Override
	public List<ProductMaster> getProductById(Integer[] arr) {
		/*
		 * Criteria criteria =
		 * sessionFactory.getCurrentSession().createCriteria(
		 * ProductMaster.class); criteria.add(Restrictions.in("productId",
		 * arr)); List<ProductMaster> productMasters = criteria.list(); return
		 * productMasters;
		 */
		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class)
					.createAlias("packingMaster", "packingMaster")
					.createAlias("companyMaster", "companyMaster")
					.createAlias("shelfMaster", "shelfMaster");
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			criteria.add(Restrictions.in("productId", arr));
			/*
			 * criteria.setProjection(Projections.distinct(Projections.property(
			 * "productId")));
			 */

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("productName"));
			proList.add(Projections.property("packingMaster.packType"));
			proList.add(Projections.property("companyMaster.compName"));
			proList.add(Projections.property("shelfMaster.shelfName"));
			proList.add(Projections.property("productId"));
			proList.add(Projections.property("productUnit"));

			criteria.setProjection(proList);

			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				ProductMaster productMaster = new ProductMaster();
				if (master[0] != null) {
					productMaster.setProductName(master[0].toString());
				} else {
					productMaster.setProductName("");
				}

				PackingMaster packingMaster = new PackingMaster();
				packingMaster.setPackType(master[1].toString());

				CompanyMaster companyMaster = new CompanyMaster();
				companyMaster.setCompName(master[2].toString());

				ShelfMaster shelfMaster = new ShelfMaster();
				shelfMaster.setShelfName(master[3].toString());

				productMaster.setCompanyMaster(companyMaster);
				productMaster.setShelfMaster(shelfMaster);
				productMaster.setPackingMaster(packingMaster);

				productMaster.setProductId(Integer.parseInt(master[4]
						.toString()));
				productMaster.setProductUnit(Double.parseDouble(master[5]
						.toString()));

				ltProductMaster.add(productMaster);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ltProductMaster;
		}
		return ltProductMaster;
	}

	@Override
	public HospitalSaleBillPrint getHospitalSaleDoctorPatient(
			String hospitalBillInwardNo) {
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"select om.idorder_master,p.Patient_ID,p.fName,doc.Doctor_ID,doc.doc_name,p.mobile from order_master om inner join treatment tre ON om.Treatment_ID = tre.Treatment_ID inner join patient p ON p.Patient_ID = tre.Patient_ID inner join doctor doc ON doc.Doctor_ID = tre.doctor_id where om.idorder_master = '"
								+ hospitalBillInwardNo + "'");

		List<Object[]> rows = query.list();
		HospitalSaleBillPrint hospitalSaleBillPrint = new HospitalSaleBillPrint();
		for (Object[] row : rows) {

			hospitalSaleBillPrint.setOrderId(row[0].toString());

			hospitalSaleBillPrint.setPatientId(row[1].toString());
			hospitalSaleBillPrint.setPatientName(row[2].toString());
			hospitalSaleBillPrint.setDoctorId(row[3].toString());

			hospitalSaleBillPrint.setDoctorName(row[4].toString());
			hospitalSaleBillPrint.setPatientMobileNumber(row[5].toString());

			/* inwardResults.add(hospitalSaleBillPrint); */
		}

		return hospitalSaleBillPrint;
	}

	@Override
	public HospitalSaleBillMaster getHospitalSalesDetails(Integer hospitalBillId) {
		/*HospitalSaleBillMaster hospitalSaleBillMaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(HospitalSaleBillMaster.class);
			criteria.add(Restrictions.eq("hospitalBillDeleteFlag", 0));

			criteria.add(Restrictions.eq("hospitalBillId", hospitalBillId));
			hospitalSaleBillMaster = (HospitalSaleBillMaster) criteria
					.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return hospitalSaleBillMaster;
		}
		return hospitalSaleBillMaster;*/
		
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(HospitalSaleBillMaster.class);
		criteria.add(Restrictions.eq("hospitalBillDeleteFlag", 0));

		if (hospitalBillId != 0) {
			criteria.add(Restrictions.eq("hospitalBillId", hospitalBillId));
		}
		
		HospitalSaleBillMaster hospitalSaleBillMaster=new HospitalSaleBillMaster();
		
		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("hospitalBillId"));
		proList.add(Projections.property("hospitalBillDocNo"));
		proList.add(Projections.property("hospitalBillDate"));
		proList.add(Projections.property("patientName"));
		proList.add(Projections.property("patientMobile"));
		proList.add(Projections.property("doctorName"));
		proList.add(Projections.property("hospitalBillLess"));
		proList.add(Projections.property("hospitalBillNetAmt"));
		proList.add(Projections.property("hospitalBillSurcharges"));
		proList.add(Projections.property("hospitalBillGrossAmt"));
		
		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try
		{
			for (Object[] row : result) {
						
				if(row[0]!=null)
					hospitalSaleBillMaster.setHospitalBillId(Integer.parseInt(row[0].toString()));
								
				if(row[1]!=null)
				{											
					hospitalSaleBillMaster.setHospitalBillDocNo(row[1].toString());
				}	
				else
					hospitalSaleBillMaster.setHospitalBillDocNo("");
				
				if(row[2]!=null)
				{
					/*SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd");
					String str[]=row[2].toString().split(" ");
					hospitalSaleBillMaster.setHospitalBillWard(str[0]);*/
					
					SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd");
					String str[]=row[2].toString().split(" ");
					
					String date[]=str[0].split("-");
					StringBuffer stringBuffer=new StringBuffer();
					stringBuffer.append(date[2]+"/"+date[1]+"/"+date[0]);
					
					hospitalSaleBillMaster.setHospitalBillWard(stringBuffer.toString());
				}
				
				if(row[3]!=null)
				{	
					hospitalSaleBillMaster.setPatientName(row[3].toString());
				}
				else
				{
					hospitalSaleBillMaster.setPatientName("");
				}
				
				if(row[4]!=null)
				{	
					hospitalSaleBillMaster.setPatientMobile(row[4].toString());
				}
				else
				{
					hospitalSaleBillMaster.setPatientMobile("");
				}
				
				if(row[5]!=null)
				{	
					hospitalSaleBillMaster.setDoctorName(row[5].toString());
				}
				else
				{
					hospitalSaleBillMaster.setDoctorName("");
				}
				
				if(row[6]!=null)
				{	
					hospitalSaleBillMaster.setHospitalBillLess(Double.parseDouble(row[6].toString()));
				}
				
				if(row[7]!=null)
				{	
					hospitalSaleBillMaster.setHospitalBillNetAmt(Double.parseDouble(row[7].toString()));
				}
				
				if(row[8]!=null)
				{	
					hospitalSaleBillMaster.setHospitalBillSurcharges(Double.parseDouble(row[8].toString()));
				}
				
				if(row[9]!=null)
				{	
					hospitalSaleBillMaster.setHospitalBillGrossAmt(Double.parseDouble(row[9].toString()));
				}
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		List<HospitalSaleBillSlave> hospitalSaleBillSlaves = new ArrayList<HospitalSaleBillSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/*"select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id="*/
							"select p_slave.hospital_slave_qty,p_slave.hospital_slave_mrp,p_slave.hospital_slave_rate,p_slave.hospital_slave_amt,p_slave.hospital_slave_batch_code,p_slave.hospital_slave_batch_expiry,product.product_name,p_slave.hospital_slave_vat from pharma_hospital_bill_master master inner join pharma_hospital_bill_slave p_slave ON p_slave.hospital_slave_master_id = master.hospital_bill_id inner join pharma_product_master product ON product.product_id = p_slave.hospital_slave_product_id where master.hospital_bill_id = '"+hospitalBillId+"'");  
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				HospitalSaleBillSlave hospitalSaleBillSlave = new HospitalSaleBillSlave();
				
				if(row[0]!=null)
				{
					String result1[]=row[0].toString().split("\\.");
					hospitalSaleBillSlave.setHospitalSlaveQty(Integer.parseInt(result1[0]));
				}	
				
				if(row[1]!=null)
					hospitalSaleBillSlave.setHospitalSlaveMrp(Double.parseDouble(row[1].toString()));
				
				
				if(row[2]!=null)
					hospitalSaleBillSlave.setHospitalSlaveRate(Double.parseDouble(row[2].toString()));
				
				
				if(row[3]!=null)
					hospitalSaleBillSlave.setHospitalSlaveAmt(Double.parseDouble(row[3].toString()));
				
				if(row[4]!=null)
					hospitalSaleBillSlave.setHospitalSlaveBatchCode(row[4].toString());
				else
					hospitalSaleBillSlave.setHospitalSlaveBatchCode("");
				
				if(row[5]!=null)
					hospitalSaleBillSlave.setHospitalSlaveBatchExpiry(row[5].toString());
				else
					hospitalSaleBillSlave.setHospitalSlaveBatchExpiry("");
				
				ProductMaster productMaster=new ProductMaster();
				if(row[6]!=null)
				{	
					productMaster.setProductName(row[6].toString());
					hospitalSaleBillSlave.setProductMaster(productMaster);
				}	
				else
				{	
					productMaster.setProductName("");
				}	
				if(row[7]!=null)
				{						
					hospitalSaleBillSlave.setHospitalSlaveVat(Double.parseDouble(row[7].toString()));
				}	
				else
				{	
					hospitalSaleBillSlave.setHospitalSlaveVat(0.0);
				}	
				
				
				hospitalSaleBillSlaves.add(hospitalSaleBillSlave);
			}

		}
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		hospitalSaleBillMaster.setHospitalSaleBillSlaves(hospitalSaleBillSlaves);
			
		return hospitalSaleBillMaster;
	}

	public List<HospitalSaleBillMaster> getHospitalSales() {

		/*
		 * List<HospitalSaleBillMaster> ltHospitalSaleMasters = null; try {
		 * Criteria criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(HospitalSaleBillMaster.class);
		 * criteria.add(Restrictions.eq("hospitalBillDeleteFlag", 0));
		 * criteria.addOrder(Order.desc("hospitalBillId"));
		 * criteria.setMaxResults(10); ltHospitalSaleMasters = criteria.list();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return
		 * ltHospitalSaleMasters; } return ltHospitalSaleMasters;
		 */

		List<HospitalSaleBillMaster> hospitalSaleBillMasters = new ArrayList<HospitalSaleBillMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(HospitalSaleBillMaster.class);
			criteria.add(Restrictions.eq("hospitalBillDeleteFlag", 0));
			criteria.addOrder(Order.desc("hospitalBillId"));
			criteria.setMaxResults(10);

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("hospitalBillId"));
			proList.add(Projections.property("hospitalBillInwardNo"));
			proList.add(Projections.property("patientName"));
			proList.add(Projections.property("hospitalBillWard"));
			proList.add(Projections.property("hospitalBillDocNo"));

			/*
			 * proList.add(Projections.property("creditNotDate"));
			 * proList.add(Projections.property("patientName"));
			 * proList.add(Projections.property("creditNoteBillNo"));
			 */

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				HospitalSaleBillMaster hospitalSaleBillMaster = new HospitalSaleBillMaster();
				hospitalSaleBillMaster.setHospitalBillId(Integer
						.parseInt(master[0].toString()));

				if (master[1] != null) {
					hospitalSaleBillMaster.setHospitalBillInwardNo(master[1]
							.toString());
				} else {
					hospitalSaleBillMaster.setHospitalBillInwardNo("");
				}
				if (master[2] != null) {
					hospitalSaleBillMaster.setPatientName(master[2].toString());
				} else {
					hospitalSaleBillMaster.setPatientName("");
				}
				if (master[3] != null) {
					hospitalSaleBillMaster.setHospitalBillWard(master[3]
							.toString());
				} else {
					hospitalSaleBillMaster.setHospitalBillWard("");
				}
				if (master[4] != null) {
					hospitalSaleBillMaster.setHospitalBillDocNo(master[4]
							.toString());
				} else {
					hospitalSaleBillMaster.setHospitalBillDocNo("");
				}

				hospitalSaleBillMasters.add(hospitalSaleBillMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return hospitalSaleBillMasters;
		}
		return hospitalSaleBillMasters;
	}

	@Override
	public Boolean deleteHospitalSaleBill(Integer hospitalId) {

	/*	try {
			HospitalSaleBillMaster hospitalSaleBillMaster = (HospitalSaleBillMaster) sessionFactory
					.getCurrentSession().get(HospitalSaleBillMaster.class,
							hospitalId);
			hospitalSaleBillMaster.setHospitalBillDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;*/
		try
		{
			org.hibernate.Query query=sessionFactory.getCurrentSession().createSQLQuery("update pharma_hospital_bill_master set  hospital_bill_delete_flag=1 where hospital_bill_id="+hospitalId);
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
	public List<HospitalSaleBillMaster> getHospitalBillId(String InwardNo) {
		// TODO Auto-generated method stub
		/*List<HospitalSaleBillMaster> ltHospitalSaleBillMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(HospitalSaleBillMaster.class);
			criteria.add(Restrictions.eq("hospitalBillDeleteFlag", 0));
			if (InwardNo != null) {
				criteria.add(Restrictions.eq("hospitalBillInwardNo", InwardNo));
			}
			ltHospitalSaleBillMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltHospitalSaleBillMasters;
		}
		return ltHospitalSaleBillMasters;*/
		
		List<HospitalSaleBillMaster> hospitalSaleBillMasters = new ArrayList<HospitalSaleBillMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(HospitalSaleBillMaster.class);
			criteria.add(Restrictions.eq("hospitalBillDeleteFlag", 0));
			if (InwardNo != null) {
				criteria.add(Restrictions.eq("hospitalBillInwardNo", InwardNo));
			}
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("hospitalBillId"));
			proList.add(Projections.property("hospitalBillInwardNo"));
			proList.add(Projections.property("patientName"));
			proList.add(Projections.property("hospitalBillWard"));
			proList.add(Projections.property("hospitalBillDocNo"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				HospitalSaleBillMaster hospitalSaleBillMaster = new HospitalSaleBillMaster();
				hospitalSaleBillMaster.setHospitalBillId(Integer
						.parseInt(master[0].toString()));

				if (master[1] != null) {
					hospitalSaleBillMaster.setHospitalBillInwardNo(master[1]
							.toString());
				} else {
					hospitalSaleBillMaster.setHospitalBillInwardNo("");
				}
				if (master[2] != null) {
					hospitalSaleBillMaster.setPatientName(master[2].toString());
				} else {
					hospitalSaleBillMaster.setPatientName("");
				}
				if (master[3] != null) {
					hospitalSaleBillMaster.setHospitalBillWard(master[3]
							.toString());
				} else {
					hospitalSaleBillMaster.setHospitalBillWard("");
				}
				if (master[4] != null) {
					hospitalSaleBillMaster.setHospitalBillDocNo(master[4]
							.toString());
				} else {
					hospitalSaleBillMaster.setHospitalBillDocNo("");
				}

				hospitalSaleBillMasters.add(hospitalSaleBillMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return hospitalSaleBillMasters;
		}
		return hospitalSaleBillMasters;
	}

	@Override
	public List<HospitalSaleBillMaster> getAutoSuggestionInwardNames(
			String letter) {
		/*List<HospitalSaleBillMaster> hospitalSaleMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(HospitalSaleBillMaster.class);
			criteria.add(Restrictions.eq("hospitalBillDeleteFlag", 0));
			criteria.add(Restrictions.like("hospitalBillInwardNo", letter,
					MatchMode.ANYWHERE));
			hospitalSaleMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return hospitalSaleMasters;
		}
		return hospitalSaleMasters;*/
		
		List<HospitalSaleBillMaster> hospitalSaleBillMasters = new ArrayList<HospitalSaleBillMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(HospitalSaleBillMaster.class);
			criteria.add(Restrictions.eq("hospitalBillDeleteFlag", 0));
			criteria.add(Restrictions.like("hospitalBillInwardNo", letter,
					MatchMode.ANYWHERE));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("hospitalBillId"));
			proList.add(Projections.property("hospitalBillInwardNo"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				HospitalSaleBillMaster hospitalSaleBillMaster = new HospitalSaleBillMaster();
				hospitalSaleBillMaster.setHospitalBillId(Integer.parseInt(master[0]
						.toString()));

				if (master[0] != null)
					hospitalSaleBillMaster.setHospitalBillInwardNo(master[1].toString());
				else
					hospitalSaleBillMaster.setHospitalBillInwardNo("");

				hospitalSaleBillMasters.add(hospitalSaleBillMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return hospitalSaleBillMasters;
		}
		return hospitalSaleBillMasters;
	}

	@Override
	public HospitalSale getPatientDataByHospitalId(Integer hospitalId) {
		HospitalSale indentSale = new HospitalSale();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select  p.Patient_ID,p.fname,p.mName,p.lname,p.addressLine1,p.addressLine2,p.addressLine3, "
                             +" p.addressLine4,p.addressLine5,p.addressLine6,p.postalCode,p.mobile from "
                             +" pharma_hospital_bill_master hospital inner join order_master om ON om.idorder_master = hospital.hospital_bill_inward_no "
                             +"  inner join treatment t ON t.Treatment_ID =om.Treatment_ID inner join patient p ON p.Patient_ID = t.Patient_ID "
                              +" where hospital.hospital_bill_id = '"+hospitalId+"'");
			Object[] rows = (Object[]) query.uniqueResult();

			 if(rows[0] != null)
		       {
			indentSale.setPatientId(rows[0].toString()); 
					
		} else {
			indentSale.setPatientId("");
			
		}
			
			if (rows[1] != null) {
				indentSale.setPatientName(rows[1].toString());
			} else {
				indentSale.setPatientName("");
			}
			if (rows[2] != null) {
				indentSale.setPatientName(rows[1].toString() + " "
						+ rows[2].toString());
			} else {
				indentSale.setPatientName("");
			}
			
			if(rows[3] != null)
			{
				indentSale.setPatientName(rows[1].toString() + " "+rows[2].toString() + 
						" "+ rows[3].toString());
			} else {
				indentSale.setPatientName("");
				
			}
			
			 if(rows[4] != null)
		       {
			indentSale.setPatientAddress(rows[4].toString()+ " "+rows[5].toString() +
					" "+rows[6].toString() + " "+rows[7].toString()+" "+rows[8].toString()
					+" "+rows[9].toString()+" "+rows[10].toString());
		} else {
			indentSale.setPatientAddress("");
			
		}
			 if(rows[11] != null)
		       {
			indentSale.setPatientMobileNumber(rows[11].toString()); 
					
		} else {
			indentSale.setPatientMobileNumber("");
					
		}
			

		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}
		return indentSale;
	}
	
	@Override
	public HospitalSale getSponserByHospitalId(Integer hospitalId) {
		HospitalSale indentSale = new HospitalSale();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select s.sp_dic_master_id, s.name from pharma_hospital_bill_master hospital inner join "
                           +" order_master om ON om.idorder_master = hospital.hospital_bill_inward_no inner join "
                           +" treatment t ON t.Treatment_ID = om.Treatment_ID inner join sp_dic_master s ON s.sp_dic_master_id = t.sp_dic_master_id "
                           +" where hospital.hospital_bill_id = '"+hospitalId+"'");
 
   
			Object[] rows = (Object[]) query.uniqueResult();

			if (rows[1] != null) {
				indentSale.setSponserName(rows[1].toString());
			} else {
				indentSale.setSponserName("");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}
		return indentSale;
	}
	
	@Override
	public HospitalSale getConsultantByHospitalId(Integer hospitalId) {
		HospitalSale indentSale = new HospitalSale();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" select  d.Doctor_ID, d.doc_name from pharma_hospital_bill_master hospital inner join "
                            +" order_master om ON om.idorder_master = hospital.hospital_bill_inward_no  inner join "
                            +" treatment t ON t.Treatment_ID = om.Treatment_ID inner join  doctor d ON d.Doctor_ID = t.doctor_id "
                            +" where hospital.hospital_bill_id = '"+hospitalId+"'");
   
			Object[] rows = (Object[]) query.uniqueResult();

			if (rows[1] != null) {
				indentSale.setConsultantName(rows[1].toString());
			} else {
				indentSale.setConsultantName("");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}
		return indentSale;
	}
	
}
