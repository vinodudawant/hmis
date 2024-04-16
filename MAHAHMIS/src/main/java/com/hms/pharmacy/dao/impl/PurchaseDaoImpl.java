package com.hms.pharmacy.dao.impl;

import java.math.BigInteger;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.poi.ss.formula.functions.Days360;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hms.ecogreenapi.PharmaFetchMasterStockDTO;
import com.hms.ecogreenapi.PharmaFetchSlaveStockDTO;
import com.hms.ecogreenapi.PharmaFetchStockResponseDTO;
import com.hms.ecogreenapi.PharmaFetchStockValidationMasterDTO;
import com.hms.pharmacy.dao.PurchaseDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.CorrectionRate;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PurchaseCorrection;
import com.hms.pharmacy.pojo.PurchaseHistory;
import com.hms.pharmacy.pojo.PurchaseHistory2;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.PurchaseRateHistory;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.pojo.SubStoreMaster;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.PurchaseService;

@Repository
public class PurchaseDaoImpl implements PurchaseDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	RestTemplate restTemplate;
	
	@Autowired
	private PurchaseService purchaseService;
 
	@Override
	public PurchaseMaster saveOrUpdatePurchase(PurchaseMaster purchaseMaster, Integer unitId)  {
		try {
		
		int unitid=0;
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PurchaseMaster.class);
	    criteria.setProjection(Projections.count("purId"));
        criteria.add(Restrictions.eq("unitId",purchaseMaster.getUnitId()));
        List ltUnitMasters1=criteria.list();
        
        if(ltUnitMasters1.get(0)!=null){
            long u1 = (Long) ltUnitMasters1.get(0);
             unitid=(int) u1;
        }
        

        if (purchaseMaster.getPurId() != null
                && purchaseMaster.getPurId() > 0) {

          //changed by Akshata
            Query query1 = sessionFactory.getCurrentSession().createQuery("update StockMasterSlave set deleteFlag='1' where transType='patientSale' and invoiceId="+purchaseMaster.getPurId());
            query1.executeUpdate();

        }


        // Update last purchase rate from product
        for (PurchaseSlave purchaseSlave : purchaseMaster.getLtPurSlave()) {

            // add batch details
            List<BatchMaster> ltBatchMaster = purchaseSlave
                    .getProductMaster().getBatchMaster();

            for (BatchMaster batchMaster : ltBatchMaster) {
                if (batchMaster.getBatchId() == null)
                    try {
                    	batchMaster.getBatchExpDate();
                    	String date1=batchMaster.getBatchExpDate();
                    	System.out.println("date1>>>"+date1);
						String date2 []= date1.split("/");
						String date = "20"+date2[1] +"-"+date2[0]+"-"+ "01"+" "+"00:00:00";
						System.out.println("date1>>>"+date);
                    	batchMaster.setBatchExpDatetimestamp(date);
                        sessionFactory.getCurrentSession().saveOrUpdate(
                                batchMaster);

                    } catch (Exception e) {
                        e.printStackTrace();

                    }
            }

            System.err.println("1=========="+purchaseSlave.getPurSlaveQty());
            
            
            if (purchaseMaster.getPurId() != null
                    && purchaseMaster.getPurId() > 0) {
                Query query2 = sessionFactory.getCurrentSession().createQuery(
                        "update StockMaster set stockQtyInHand='"
                                + purchaseSlave.getPurSlaveQty()*purchaseSlave.getProductMaster().getProductUnit()
                                + "' where batchMaster.batchId=:batchId");
                query2.setInteger("batchId", purchaseSlave.getBatchMaster().getBatchId());
                query2.executeUpdate();
            }

        }

        PurchaseMaster master;
        if (purchaseMaster.getPurId() != null
                && purchaseMaster.getPurId() > 0) {
            sessionFactory.getCurrentSession().update(purchaseMaster);
            master=(PurchaseMaster) sessionFactory.getCurrentSession().get(PurchaseMaster.class, purchaseMaster.getPurId());
        }
        else
        	//  sessionFactory.getCurrentSession().merge(purchaseMaster);
        	///master=(PurchaseMaster) sessionFactory.getCurrentSession().get(PurchaseMaster.class, purchaseMaster);
        	  unitid++;
        	purchaseMaster.setUnitCount(unitid);
            master=(PurchaseMaster) sessionFactory.getCurrentSession().get(PurchaseMaster.class,sessionFactory.getCurrentSession().save(purchaseMaster));
     //   updateProductDetails(purchaseMaster.getLtPurSlave());

        return master;

    } catch (Exception e) {
        e.printStackTrace();
        return null;
    }
}

	public void updateProductDetails(List<PurchaseSlave> purchaseSlave) {
		for (PurchaseSlave purchaseSlaves : purchaseSlave) {
			try {
				Query query = sessionFactory.getCurrentSession()
						.createQuery(
								"update ProductMaster set productLastPurRate='"
										+ purchaseSlaves.getPurslaverate()
										+ "', productLastMRP='"
										+ purchaseSlaves.getPurSlaveMrp()
										+ "' where productId=:productId");
				query.setInteger("productId", purchaseSlaves.getProductMaster()
						.getProductId());
				 query.executeUpdate();

			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	@SuppressWarnings("unchecked")
	public List<PurchaseMaster> getPurchases() {

		List<PurchaseMaster> ltPurchaseMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseMaster.class);
			criteria.add(Restrictions.eq("purDeleteFlag", 0));
			criteria.addOrder(Order.desc("purId"));
			// criteria.setMaxResults(10);
			ltPurchaseMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltPurchaseMasters;
		}
		return ltPurchaseMasters;
	}
	
//Changes by Akshata
	@Override
	public Boolean deletePurchase(Integer purchaseId) {

		try {
			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createQuery(
							"update PurchaseMaster set  purDeleteFlag=1 where purId="
									+ purchaseId);
			 query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public PurchaseSlave getLowestPurchaseDetail(Integer productId) {

		List<PurchaseSlave> purchaseSlaves = new ArrayList<PurchaseSlave>();
		SQLQuery query = null;
		String queryString = "select pur_slave.pur_slave_mrp,pur_slave.pur_slave_rate,vendor.vendor_name from pharma_purchase_master purchase inner join pharma_purchase_slave pur_slave on pur_slave.pur_slave_master_id=purchase.pur_id inner join pharma_vendor_master vendor on vendor.vendor_id=purchase.pur_vendor_id inner join pharma_product_master product on product.product_id=pur_slave.pur_slave_product_id where product.product_id='"
				+ productId
				+ "' order by pur_slave.pur_slave_rate asc limit 2;";

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					queryString);

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				PurchaseSlave purchaseSlave = new PurchaseSlave();

				if (row[0] != null)
					purchaseSlave.setPurSlaveMrp(Double.parseDouble(row[0]
							.toString()));
				else
					purchaseSlave.setPurSlaveMrp(Double.parseDouble("0"));

				if (row[1] != null)
					purchaseSlave.setPurslaverate(Double.parseDouble(row[1]
							.toString()));
				else
					purchaseSlave.setPurSlaveMrp(Double.parseDouble("0"));

				PurchaseMaster purchaseMaster = new PurchaseMaster();

				VendorMaster vendorMaster = new VendorMaster();

				if (row[2] != null)
					vendorMaster.setVendorName(row[2].toString());
				else
					vendorMaster.setVendorName("");

				purchaseMaster.setVendorMaster(vendorMaster);
				purchaseSlave.setPurchaseMaster(purchaseMaster);
				purchaseSlaves.add(purchaseSlave);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (purchaseSlaves.size() > 0)
			return purchaseSlaves.get(0);
		else
			return new PurchaseSlave();

	}

	// same bill num of diff user
	@Override
	public Boolean DublicateBillNum(String BillNo, Integer vendorId) 
	{
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseMaster.class);
			criteria.add(Restrictions.eq("purBillNo", BillNo));
		criteria.add(Restrictions.eq("purDeleteFlag",0));
			criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));

			if (criteria.uniqueResult() == null) {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;

		}
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseMaster> getAutoSuggestionPurchaseNames(String letter) {

		List<PurchaseMaster> ltPurchaseMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseMaster.class);
			criteria.add(Restrictions.eq("purDeleteFlag", 0));
			criteria.add(Restrictions.like("purName", letter,
					MatchMode.ANYWHERE));
			ltPurchaseMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltPurchaseMasters;
		}
		return ltPurchaseMasters;
	}

	@Override
	public PurchaseMaster getPurchaseById(Integer purchaseId) {

		PurchaseMaster purchaseMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseMaster.class);
			criteria.add(Restrictions.eq("purDeleteFlag", 0));
			if (purchaseId != 0) {
				criteria.add(Restrictions.eq("purId", purchaseId));
			}

			purchaseMasters = (PurchaseMaster) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return purchaseMasters;
		}
		return purchaseMasters;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseMaster> getPurListbyVendorId(Integer vendorId, Integer unitId) {
		List<PurchaseMaster> saleMasters = new ArrayList<PurchaseMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseMaster.class)
					.createAlias("vendorMaster", "vendorMaster");
			criteria.add(Restrictions.eq("purDeleteFlag", 0));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.addOrder(Order.desc("purId"));
			criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
			/* criteria.setMaxResults(10); */

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("purId"));
			proList.add(Projections.property("vendorMaster.vendorId"));
			proList.add(Projections.property("vendorMaster.vendorName"));
			proList.add(Projections.property("purBillNo"));
			proList.add(Projections.property("purBillDate"));
			proList.add(Projections.property("purNetAmt"));
			proList.add(Projections.property("unitCount"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				PurchaseMaster purchaseMaster = new PurchaseMaster();
				purchaseMaster.setPurId(Integer.parseInt(master[0].toString()));

				VendorMaster vendorMaster = new VendorMaster();
				vendorMaster
						.setVendorId(Integer.parseInt(master[1].toString()));

				if (master[2] != null)
					vendorMaster.setVendorName(master[2].toString());
				else
					vendorMaster.setVendorName("");

				if (master[3] != null)
					purchaseMaster.setPurBillNo(master[3].toString());
				else
					purchaseMaster.setPurBillNo("");

				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[4].toString());

				if (master[5] != null)
					purchaseMaster.setPurNetAmt(Double.parseDouble(master[5]
							.toString()));
				else
					purchaseMaster.setPurNetAmt(0.0);
				
				if (master[6] != null)
					purchaseMaster.setUnitCount(Integer.parseInt(master[6]
							.toString()));
				else
					purchaseMaster.setUnitCount(0);

				purchaseMaster.setPurBillDate(date);
				purchaseMaster.setVendorMaster(vendorMaster);

				saleMasters.add(purchaseMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseMaster> getPurListbyPurchaseEntryNo(
			Integer purchaseEntryNo,Integer unitId) {
		List<PurchaseMaster> saleMasters = new ArrayList<PurchaseMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseMaster.class)
					.createAlias("vendorMaster", "vendorMaster");
			criteria.add(Restrictions.eq("purDeleteFlag", 0));
			//criteria.add(Restrictions.eq("purId", purchaseEntryNo));
			criteria.add(Restrictions.eq("unitCount", purchaseEntryNo));
			criteria.add(Restrictions.eq("unitId", unitId));
			/* criteria.setMaxResults(10); */

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("purId"));
			proList.add(Projections.property("vendorMaster.vendorId"));
			proList.add(Projections.property("vendorMaster.vendorName"));
			proList.add(Projections.property("purBillNo"));
			proList.add(Projections.property("purBillDate"));
			proList.add(Projections.property("purNetAmt"));
			proList.add(Projections.property("unitCount"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				PurchaseMaster purchaseMaster = new PurchaseMaster();
		
				purchaseMaster.setPurId(Integer.parseInt(master[0].toString()));

				VendorMaster vendorMaster = new VendorMaster();
				vendorMaster
						.setVendorId(Integer.parseInt(master[1].toString()));

				if (master[2] != null)
					vendorMaster.setVendorName(master[2].toString());
				else
					vendorMaster.setVendorName("");

				if (master[3] != null)
					purchaseMaster.setPurBillNo(master[3].toString());
				else
					purchaseMaster.setPurBillNo("");

				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[4].toString());

				if (master[5] != null)
					purchaseMaster.setPurNetAmt(Double.parseDouble(master[5]
							.toString()));
				else
					purchaseMaster.setPurNetAmt(0.0);
				
				if (master[6] != null)
					purchaseMaster.setUnitCount(Integer.parseInt(master[6]
							.toString()));
				else
					purchaseMaster.setUnitCount(0);

				 
	             purchaseMaster.setPurentryStatus(purchaseService.getDelChalanNumber(Integer.parseInt(master[0].toString())));
		
				purchaseMaster.setPurBillDate(date);
				purchaseMaster.setVendorMaster(vendorMaster);

				saleMasters.add(purchaseMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;

	}

	// /for list
	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseMaster> getPurbyVendorId(Integer vendorId) {
		
		List<PurchaseMaster> ltpPurchaseMasters = new ArrayList<PurchaseMaster>();
		PurchaseMaster purchaseMaster = new PurchaseMaster();
		List<PurchaseSlave> ltpPurchaseSlaves = new ArrayList<PurchaseSlave>();
		try {

			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" SELECT product.product_name,product.product_uom_unit,pack.pack_type,company.comp_name,slave.pur_slave_mrp,slave.pur_slave_qty,slave.pur_slave_scheme,slave.pur_slave_purchase_rate, "
									+ " slave.pur_slave_amt,stock.stock_qty_in_hand,product.product_id,master.pur_id,slave.pur_slave_id FROM pharma_purchase_master master inner join pharma_purchase_slave slave on master.pur_id=slave.pur_slave_master_id "
									+ " inner join pharma_product_master product on product.product_id=slave.pur_slave_product_id inner join pharma_company_master company on company.comp_id=product.product_comp_id "
									+ " inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id inner join pharma_batch_master batch on batch.batch_id=slave.pur_slave_batch_id "
									+ " inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id where master.pur_vendor_id='"
									+ vendorId + "';");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				PurchaseSlave purchaseSlave = new PurchaseSlave();
				ProductMaster productMaster = new ProductMaster();
				if (row[0] != null) {
					productMaster.setProductName((row[0].toString()));
				} else
					purchaseSlave.getProductMaster().setProductName("");

				if (row[1] != null) {
					productMaster.setProductUnit(Double.parseDouble(row[1]
							.toString()));
				}

				if (row[2] != null) {
					PackingMaster packingMaster = new PackingMaster();
					packingMaster.setPackType(row[2].toString());
					productMaster.setPackingMaster(packingMaster);
				}

				if (row[3] != null) {
					CompanyMaster companyMaster = new CompanyMaster();
					companyMaster.setCompName((row[3].toString()));
					productMaster.setCompanyMaster(companyMaster);
				}
				if (row[4] != null)
					purchaseSlave.setPurSlaveMrp(Double.parseDouble((row[4]
							.toString())));

				if (row[5] != null)
					purchaseSlave.setPurSlaveQty(Integer.parseInt((row[5]
							.toString())));

				if (row[6] != null)
					purchaseSlave.setPurSlaveScheme(Double.parseDouble((row[6]
							.toString())));

				if (row[7] != null)
					purchaseSlave.setPurSlavePurchaseRate(Double
							.parseDouble((row[7].toString())));

				if (row[8] != null)
					purchaseSlave.setPurSlaveAmt(Double.parseDouble((row[8]
							.toString())));

				if (row[9] != null) {
					purchaseSlave.setPurSlaveBillRate(Double.parseDouble(row[9]
							.toString()));
				}

				if (row[10] != null) {
					productMaster.setProductId(Integer.parseInt(row[10]
							.toString()));
				}
				if (row[11] != null) {
					purchaseMaster
							.setPurId(Integer.parseInt(row[11].toString()));
				}
				if (row[12] != null) {
					purchaseSlave.setPurSlaveId(Integer.parseInt(row[12]
							.toString()));
				}

				purchaseSlave.setProductMaster(productMaster);
				ltpPurchaseSlaves.add(purchaseSlave);

			}

			purchaseMaster.setLtPurSlave(ltpPurchaseSlaves);
			ltpPurchaseMasters.add(purchaseMaster);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return ltpPurchaseMasters;

	}

	public PurchaseMaster getPurbyPurchaseSlaveId(Integer purchaseSlaveId) {

		PurchaseMaster ltpPurchaseMasters = null;
		try {
			@SuppressWarnings("deprecation")
			Criteria criteria = sessionFactory
					.getCurrentSession()
					.createCriteria(PurchaseMaster.class)
					.createAlias("ltPurSlave", "ltPurSlave",
							CriteriaSpecification.LEFT_JOIN);
			criteria.add(Restrictions.eq("purDeleteFlag", 0));
			if (purchaseSlaveId != 0) {
				criteria.add(Restrictions.eq("ltPurSlave.purSlaveId",
						purchaseSlaveId));
			}
			ltpPurchaseMasters = (PurchaseMaster) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return ltpPurchaseMasters;
		}
		return ltpPurchaseMasters;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<BatchMaster> getBatchByBatchCode(String batchCode) {
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BatchMaster.class);
			/* criteria.add(Restrictions.eq("batchDeleteFlag", 0)); */
			if (batchCode != null) {
				criteria.add(Restrictions.eq("batchCode", batchCode));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("batchId"));

			proList.add(Projections.property("batchCode"));
			proList.add(Projections.property("batchExpDate"));
			criteria.setProjection(proList);

			List<Object[]> result = criteria.list();
			for (Object row[] : result) {
				BatchMaster batchMaster = new BatchMaster();
				if (row[0] != null) {
					batchMaster.setBatchId(Integer.parseInt(row[0].toString()));
				} else {
					batchMaster.setBatchId(0);
				}
				if (row[1] != null) {
					batchMaster.setBatchCode(row[1].toString());
				} else {
					batchMaster.setBatchCode("");
				}
				if (row[2] != null) {
					batchMaster.setBatchExpDate(row[2].toString());
				} else {
					batchMaster.setBatchExpDate("");
				}
				batchMasters.add(batchMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return batchMasters;
		}
		return batchMasters;
	}
//added by akshata
	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseHistory> getBatchDetails(Integer productId,
			String storeId) {
		Object storeName = new Object();

		try {
			Query query = sessionFactory.getCurrentSession().createQuery(
					"SELECT storeName FROM SubStoreMaster where storeId='"
							+ storeId + "'");
			storeName = query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<PurchaseHistory> purchaseHistories = new ArrayList<PurchaseHistory>();
		Query query=null; 
		try {
			if (storeName == null || storeName.toString().isEmpty()) {
				query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_batch_details_by_product_id(:p_product_id)");
			query.setParameter("p_product_id", productId);
			}else {
				query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_to_get_batch_details_by_product_id_and_store_name(:p_product_id,:p_store_name,:p_store_table)");
				query.setParameter("p_product_id", productId);
				query.setParameter("p_store_name", "store_name");
				query.setParameter("p_store_table","pharma_"+storeName.toString()+"_stock_master");
			}
			
			//query.setResultTransformer(Tr	ansformers.aliasToBean(PurchaseHistory.class));
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> list = query.list();
			
			for(Map<String, Object> rs : list)
			{
				PurchaseHistory obj = new PurchaseHistory();
				String pur_bill_no = (String)rs.get("pur_bill_no");
				obj.setBatch_code((String) rs.get("batch_code"));
				obj.setBatch_exp_date(((String)rs.get("batch_exp_date")));
				obj.setMrp((Double)rs.get("mrp"));
				obj.setRate((Double)rs.get("rate"));
				obj.setStock_qty_in_hand((Double)rs.get("stock_qty_in_hand"));
				obj.setBatch_id((Integer)rs.get("batch_id"));
				obj.setStock_id((Integer)rs.get("stock_id"));
				obj.setBill_rate((Double)rs.get("bill_rate"));
				obj.setVendor_name((String)rs.get("vendor_name"));
				obj.setPur_bill_no(pur_bill_no);	
				
				if(pur_bill_no.equalsIgnoreCase("0"))
					obj.setPur_bill_date(new Date(new java.util.Date().getTime()));
				else
					obj.setPur_bill_date(new Date(new java.util.Date().getTime()));
					
				obj.setPur_rate((Double)rs.get("pur_rate"));
				obj.setGst((Double)rs.get("gst"));
				if (storeName == null || storeName.toString().isEmpty()) {
					obj.setPur_id((Integer)rs.get("pur_id"));;
					obj.setPur_slave_id((Integer)rs.get("pur_slave_id"));;
				}
				else {
					obj.setPur_id(((BigInteger) rs.get("pur_id")).intValue());
					obj.setPur_slave_id(((BigInteger) rs.get("pur_slave_id")).intValue());
				}
				
				obj.setPur_slave_scheme((Double)rs.get("pur_slave_scheme"));
				purchaseHistories.add(obj);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return purchaseHistories;
	}
//added by Akshata
	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseHistory> getProductNameByBarcode(Integer batchId,
			String storeId) {
		String strQuery = "";
		Object storeName = new Object();

		try {
			Query query = sessionFactory.getCurrentSession().createQuery(
					"SELECT storeName FROM SubStoreMaster where storeId='"
							+ storeId + "'");
			storeName = query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		List<PurchaseHistory> purchaseHistories = new ArrayList<PurchaseHistory>();
		try {
			Query query=null;
			if (storeName==null || storeName.toString().isEmpty()) {
				query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_product_name_by_barcode(:p_batch_id)");
			query.setParameter("p_batch_id", batchId);
			} else {
				query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_product_name_by_barcode_store_name(:p_batch_id,:p_store_name)");
				query.setParameter("p_batch_id", batchId);
				query.setParameter("p_store_name", storeName.toString());
			}
			query.setResultTransformer(Transformers.aliasToBean(PurchaseHistory.class));
			purchaseHistories = query.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return purchaseHistories;
	}


	public BatchMaster getStockDetails(Integer batchId) {
		BatchMaster batchMaster = null;
		try {
			batchMaster = (BatchMaster) sessionFactory.getCurrentSession().get(
					BatchMaster.class, batchId);

		} catch (Exception e) {
			e.printStackTrace();

		}
		return batchMaster;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<PurchaseMaster> getLastPurchaseDetails(Integer productId) {
		List<PurchaseMaster> purchaseMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseMaster.class);
			criteria.add(Restrictions.eq("purDeleteFlag", 0)).createAlias(
					"ltPurSlave", "slave", CriteriaSpecification.LEFT_JOIN);
			if (productId != null) {
				criteria.add(Restrictions.eq("slave.productMaster.productId",
						productId));
			}
			purchaseMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return purchaseMasters;
		}
		return purchaseMasters;
	}

	@Override
	public boolean updateCorrectionRate(CorrectionRate correctionRate) {
		PurchaseMaster purchaseMaster = new PurchaseMaster();
		if (correctionRate.getPurchaseMaster().getPurId() != null) {
			purchaseMaster = getPurbyPurchaseSlaveId(correctionRate
					.getPurchaseMaster().getLtPurSlave().get(0).getPurSlaveId());
			List<PurchaseSlave> purchaseSlave = purchaseMaster.getLtPurSlave();
			if (purchaseSlave.size() > 0) {
				purchaseSlave.get(0)
						.setBatchCode(correctionRate.getBatchCode());
				purchaseSlave.get(0).setPurSlaveBillRate(
						correctionRate.gettRate());
				purchaseSlave.get(0).setPurSlavePurchaseRate(
						correctionRate.getPurRate());
				purchaseSlave.get(0).setPurSlaveMrp(correctionRate.getMrp());
				purchaseSlave.get(0).setPurslaverate(correctionRate.getMrp());

			}
			purchaseMaster.setPurUpdateDate(new Date(new java.util.Date()
					.getTime()));
			purchaseMaster.setLtPurSlave(purchaseSlave);
		}
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(purchaseMaster);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseMaster> getPendingPurbyVendorId(Integer vendorId) {
		

		List<PurchaseMaster> purchaseMasters = new ArrayList<PurchaseMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseMaster.class);
			/* criteria.add(Restrictions.eq("batchDeleteFlag", 0)); */
			criteria.add(Restrictions.eq("purDeleteFlag", 0));
			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
				criteria.add(Restrictions.eq("purchaseStatus", "y"));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("purId"));
			proList.add(Projections.property("purDocId"));
			proList.add(Projections.property("purBillNo"));
			proList.add(Projections.property("purBillDate"));
			proList.add(Projections.property("purTaxVat5"));
			proList.add(Projections.property("purNetAmt"));
			criteria.setProjection(proList);

			List<Object[]> result = criteria.list();
			for (Object row[] : result) {
				PurchaseMaster purchaseMaster = new PurchaseMaster();
				if (row[0] != null) {
					purchaseMaster
							.setPurId(Integer.parseInt(row[0].toString()));
				}
				if (row[1] != null) {
					purchaseMaster.setPurDocId(row[1].toString());
				} else {
					purchaseMaster.setPurDocId("");
				}
				if (row[2] != null) {
					purchaseMaster.setPurBillNo(row[2].toString());
				} else {
					purchaseMaster.setPurBillNo("");
				}
				if (row[3] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat.parse(row[3].toString());
					purchaseMaster.setPurBillDate(date);
				}
				if (row[4] != null) {
					purchaseMaster.setPurTaxVat5(Double.parseDouble(row[4]
							.toString()));
				}
				if (row[5] != null) {
					purchaseMaster.setPurNetAmt(Double.parseDouble(row[5]
							.toString()));
				}
				purchaseMasters.add(purchaseMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return purchaseMasters;
		}
		return purchaseMasters;

	}

	@SuppressWarnings("unchecked")
	@Override
	public PurchaseSlave getPurchaseSlaveByBatchId(Integer batchId) {
		PurchaseSlave purchaseSlave = new PurchaseSlave();

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseSlave.class)
					.createAlias("purchaseMaster", "purchaseMaster");
			/* criteria.add(Restrictions.eq("batchDeleteFlag", 0)); */
			if (batchId != 0) {
				criteria.add(Restrictions.eq("purchaseMaster.purDeleteFlag", 0));
				criteria.add(Restrictions.eq("batchMaster.batchId", batchId));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("purSlaveId"));
			proList.add(Projections.property("purSlavePurchaseRate"));
			criteria.setProjection(proList);

			List<Object[]> result = criteria.list();
			for (Object row[] : result) {
				if (row[0] != null) {
					purchaseSlave.setPurSlaveId(Integer.parseInt(row[0]
							.toString()));
				}
				if (row[1] != null) {
					purchaseSlave.setPurSlavePurchaseRate(Double
							.parseDouble(row[1].toString()));
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return purchaseSlave;
		}
		return purchaseSlave;
	}

	@Override
	public void savePurchaseHistory(PurchaseCorrection purchaseCorrection) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(purchaseCorrection);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}


	@Override
	public void savePurchaseRateDetails(PurchaseRateHistory purchaseRateHistory) {
		try {
			sessionFactory.getCurrentSession()
					.saveOrUpdate(purchaseRateHistory);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public PurchaseRateHistory getPurchaseRateDetails(
			PurchaseRateHistory purchaseRateHistory) {
		PurchaseRateHistory purchaseRateHistory2 = new PurchaseRateHistory();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				PurchaseRateHistory.class);
		criteria.add(Restrictions.eq("purSlaveId",
				purchaseRateHistory.getPurSlaveId()));
		
		try {
			purchaseRateHistory2 = (PurchaseRateHistory) criteria
					.uniqueResult();

		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return purchaseRateHistory2;

	}

	@Override
	public void updatePurchaseRateDetails(
			PurchaseRateHistory purchaseRateHistory) {

		try {
			sessionFactory.getCurrentSession().merge(purchaseRateHistory);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public void saveBatchDetails(BatchMaster batchMaster,
			PurchaseCorrection purchaseCorrection) {
		try {
			sessionFactory.getCurrentSession().save(batchMaster);

			Query query = sessionFactory
					.getCurrentSession()
					.createQuery(
							"update BatchMaster set batchDeleteFlag='1' where batchId=:batchId");
			query.setInteger("batchId", purchaseCorrection.getPurCorBatchId());
			 query.executeUpdate();

			Query query1 = sessionFactory
					.getCurrentSession()
					.createQuery(
							"update StockMaster set stockQtyInHand='0' where batchMaster.batchId=:batchId");
			query1.setInteger("batchId", purchaseCorrection.getPurCorBatchId());
			 query1.executeUpdate();

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubStoreMaster.class);
			criteria.add(Restrictions.eq("storeDeleteFlag", 0));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("storeName"));
			criteria.setProjection(proList);

			List<String> result = criteria.list();

			for (String object : result) {
				if (object != null) {
					SQLQuery storeBatchUpdateQuery = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"update pharma_"
											+ object
											+ "_stock_master set stock_batch_id='"
											+ batchMaster.getBatchId()
											+ "' where stock_batch_id="
											+ purchaseCorrection
													.getPurCorBatchId());
				
					storeBatchUpdateQuery.executeUpdate();
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}


	@SuppressWarnings("unchecked")
	@Override
    public PurchaseMaster getPurchaseDataById(Integer purchaseId,Integer unitId) {
      
        PurchaseMaster purchaseMaster = new PurchaseMaster();
        
        Query query1=sessionFactory.getCurrentSession().createSQLQuery("select        this_.pur_id as y0_,        this_.pur_doc_id as y1_,        this_.pur_bill_date as y2_,        vendormast1_.vendor_name as y3_,        vendormast1_.vendor_mobile_num as y4_,        this_.pur_less as y5_,        this_.pur_gross_amt as y6_,        this_.pur_add as y7_,        this_.pur_net_amt as y8_,        this_.pur_bill_no as y9_,        this_.pur_vat as y10_,        this_.pur_po_id as y11_,        this_.pur_trans_type as y12_ ,  concat(ifnull(vendoradd.vendor_address, ''),'',ifnull(vendoradd.vendor_city, ''),', ',ifnull(vendoradd.vendor_district, ''),' ',ifnull(vendoradd.vendor_state, ''),', ',ifnull(vendoradd.vendor_pincode, '')) as vendorfulladd ,  vendoradd.vendor_gstn as vendor_gstn,this_.unit_count as y13_   from        pharma_purchase_master this_    inner join        pharma_vendor_master vendormast1_            on this_.pur_vendor_id=vendormast1_.vendor_id  inner join pharma_vendor_address vendoradd ON this_.pur_vendor_add_id = vendoradd.vAddrId  where        this_.pur_delete_flag=0        and this_.pur_id="+purchaseId);
        List<Object[]> result = query1.list();
        try {
            for (Object[] row : result) {

                if (row[0] != null)
                    purchaseMaster
                            .setPurId(Integer.parseInt(row[0].toString()));
                else
                    purchaseMaster.setPurId(0);

                if (row[1] != null) {
                    purchaseMaster.setPurDocId(row[1].toString());
                } else
                    purchaseMaster.setPurDocId("");

                if (row[2] != null) {
                    
                    String str[] = row[2].toString().split(" ");

                    String date[] = str[0].split("-");
                    StringBuffer stringBuffer = new StringBuffer();
                    stringBuffer
                            .append(date[2] + "/" + date[1] + "/" + date[0]);
                    purchaseMaster.setPurTransType(stringBuffer.toString());

                }
                VendorMaster vendorMaster = new VendorMaster();

                if (row[3] != null)
                    vendorMaster.setVendorName(row[3].toString());
                purchaseMaster.setVendorMaster(vendorMaster);

                if (row[4] != null)
                    purchaseMaster.getVendorMaster().setVendorMobileNumber(
                            row[4].toString());
                else
                    purchaseMaster.getVendorMaster().setVendorMobileNumber("");

                if (row[5] != null)
                    purchaseMaster.setPurLess(Double.parseDouble(row[5]
                            .toString()));
                else
                    purchaseMaster.setPurLess(0.0);

                if (row[6] != null)
                    purchaseMaster.setPurGrossAmt(Double.parseDouble(row[6]
                            .toString()));
                else
                    purchaseMaster.setPurGrossAmt(0.0);

                if (row[7] != null)
                    purchaseMaster.setPurAdd(Double.parseDouble(row[7]
                            .toString()));
                else
                    purchaseMaster.setPurAdd(0.0);

                if (row[8] != null)
                    purchaseMaster.setPurNetAmt(Double.parseDouble(row[8]
                            .toString()));
                else
                    purchaseMaster.setPurNetAmt(0.0);

                if (row[9] != null)
                    purchaseMaster.setPurBillNo(row[9].toString());
                else
                    purchaseMaster.setPurBillNo("");

                if (row[10] != null)
                    purchaseMaster.setPurVat(Double.parseDouble(row[10]
                            .toString()));
                else
                    purchaseMaster.setPurVat(0.0);

                if (row[11] != null)
                    purchaseMaster
                            .setPoId(Integer.parseInt(row[11].toString()));
                else
                    purchaseMaster.setPoId(0);

                if (row[12] != null) {
                    if (row[12].toString().equals("0"))
                        purchaseMaster.setPurchaseStatus("Credit");
                    else if (row[12].toString().equals("1"))
                        purchaseMaster.setPurchaseStatus("Cash");
                    else if (row[12].toString().equals("2"))
                        purchaseMaster.setPurchaseStatus("Card");
                } else
                    purchaseMaster.setPurchaseStatus("");
               
                VendorAddress vendoradd=new VendorAddress();
                if (row[13] != null)
                	vendoradd.setVendorAddress(row[13].toString());
                else
                	vendoradd.setVendorAddress("");
                
                if (row[14] != null)
                	vendoradd.setGstNo(row[14].toString());
                else
                	vendoradd.setGstNo("");
                
                if (row[15] != null)
                	purchaseMaster.setUnitCount(Integer.parseInt(row[15].toString()));
                else
                	purchaseMaster.setUnitCount(0);
                
                purchaseMaster.setVendorAddress(vendoradd);
                
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        List<PurchaseSlave> purchaseSlaves = new ArrayList<PurchaseSlave>();
        try {
            SQLQuery query = sessionFactory
                    .getCurrentSession()
                    .createSQLQuery(
                            /* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
                            "select pur_slave_qty,pur_slave_mrp, ifnull(pur_slave_rate,pur_slave_mrp),pur_slave_amt, batch.batch_code,batch.batch_exp_date, product.product_name, batch.batch_id,p_slave.pur_slave_vat, p_slave.pur_slave_bill_rate,pack.pack_type, product.product_uom_unit, p_slave.pur_slave_scheme, p_slave.del_chalan_number ,p_slave.pur_hsn,p_slave.pur_cess,p_slave.pur_igst,p_slave.pur_slave_disc,p_slave.pur_slave_purchase_rate from pharma_purchase_master master inner join pharma_purchase_slave p_slave ON p_slave.pur_slave_master_id = master.pur_id    inner join pharma_product_master product ON product.product_id = p_slave.pur_slave_product_id inner join pharma_batch_master batch ON batch.batch_id = p_slave.pur_slave_batch_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id where master.pur_id ='"+ purchaseId +"'");
          
            List<Object[]> rows = query.list();
            for (Object[] row : rows) {
                PurchaseSlave purchaseSlave = new PurchaseSlave();

                if (row[0] != null)
                    purchaseSlave.setPurSlaveQty(Integer.parseInt(row[0]
                            .toString()));
                else
                    purchaseSlave.setPurSlaveQty(0);

                if (row[1] != null)
                    purchaseSlave.setPurSlaveMrp(Double.parseDouble(row[1]
                            .toString()));

                if (row[2] != null)
                    purchaseSlave.setPurslaverate(Double.parseDouble(row[2]
                            .toString()));

                if (row[3] != null)
                    purchaseSlave.setPurSlaveAmt(Double.parseDouble(row[3]
                            .toString()));

                BatchMaster batchMaster = new BatchMaster();
                if (row[4] != null)
                    batchMaster.setBatchCode(row[4].toString());
                if (row[5] != null)
                    batchMaster.setBatchExpDate(row[5].toString());
                if (row[6] != null)
                    batchMaster.setBatchId(Integer.parseInt(row[7].toString()));
                purchaseSlave.setBatchMaster(batchMaster);

                ProductMaster productMaster = new ProductMaster();
                if (row[6] != null) {
                    productMaster.setProductName(row[6].toString());
                    purchaseSlave.setProductMaster(productMaster);
                } else {
                    productMaster.setProductName("");
                }

                if (row[8] != null)
                    purchaseSlave.setPurVat(Double.parseDouble(row[8]
                            .toString()));

                if (row[9] != null)
                    purchaseSlave.setPurSlaveBillRate(Double.parseDouble(row[9]
                            .toString()));

                PackingMaster packingMaster=new PackingMaster();
                if (row[10] != null)
                       packingMaster.setPackType(row[10].toString());

                productMaster.setPackingMaster(packingMaster);
                purchaseSlave.setProductMaster(productMaster);

                if(row[11] != null)
                    productMaster.setProductUnit(Double.parseDouble(row[11].toString()));

                if(row [12] != null)
                      purchaseSlave.setPurSlaveScheme(Double.parseDouble(row[12].toString()));

                if(row [13] != null)
                    purchaseSlave.setDelChalanNumber(row[13].toString());

                if(row [14] != null)
                    purchaseSlave.setPurHsn(row[14].toString());

                if(row [15] != null)
                    purchaseSlave.setPurCess(Double.parseDouble(row[15].toString()));

                if(row [16] != null)
                    purchaseSlave.setPurIgst(Double.parseDouble(row[16].toString()));
                
                if(row [17] != null)
                    purchaseSlave.setPurDisc(Double.parseDouble(row[17].toString()));
                
                else
                	purchaseSlave.setPurDisc(0.0);
                
                if(row [18] != null)
                    purchaseSlave.setPurSlavePurchaseRate(Double.parseDouble(row[18].toString()));
                
                else
                	purchaseSlave.setPurDisc(0.0);


                purchaseSlaves.add(purchaseSlave);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        purchaseMaster.setLtPurSlave(purchaseSlaves);

        return purchaseMaster;

    }

	@SuppressWarnings("unchecked")
	@Override
	public List<ReportProductWiseBatchSale> getProductWiseBatchList(
			Integer productId, String from, String to, String type) {

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String counterSaleAll = "SELECT distinct(batch.batch_id), batch.batch_code, rate.mrp, rate.rate FROM pharma_counter_sale_slave c_slave inner join pharma_counter_sale_master c_master ON c_master.counter_sale_id = c_slave.counter_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.counter_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id where c_master.counter_sale_for_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and pm.product_id = '"
				+ productId
				+ "'";
		String counterSale4Counter = "SELECT distinct(batch.batch_id), batch.batch_code, rate.mrp, rate.rate FROM pharma_counter_sale_slave c_slave inner join pharma_counter_sale_master c_master ON c_master.counter_sale_id = c_slave.counter_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.counter_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id where c_master.counter_sale_for_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and pm.product_id = '"
				+ productId
				+ "'";
		String indentSale = "SELECT distinct(batch.batch_id), batch.batch_code, rate.mrp, rate.rate FROM pharma_indent_sale_slave c_slave inner join pharma_indent_sale_master c_master ON c_master.indent_sale_id = c_slave.indent_sale_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.indent_sale_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id where c_master.indent_sale_received_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and pm.product_id = '"
				+ productId
				+ "'";
		String hospitalSale = "SELECT distinct(batch.batch_id), batch.batch_code, rate.mrp, rate.rate FROM pharma_hospital_bill_slave c_slave inner join pharma_hospital_bill_master c_master ON c_master.hospital_bill_id = c_slave.hospital_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.hospital_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id where c_master.hospital_bill_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and pm.product_id = '"
				+ productId
				+ "'";
		/*String patientSale = "SELECT distinct(batch.batch_id), batch.batch_code, rate.mrp, rate.rate FROM pharma_patient_sales_bill_slave c_slave inner join pharma_patient_sales_bill_master c_master ON c_master.patient_sales_bill_id = c_slave.patient_slave_bill_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.patient_slave_BatchId  inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_product_master pm ON pm.product_id = batch.batch_product_id where c_master.patient_bill_date between  '"
				+ from
				+ "' and '"
				+ to
				+ "'  and pm.product_id = '"
				+ productId + "'";*/
		
		String patientSale = "select     p.patient_bill_date,    pr.product_name,    concat(pa.f_name,            ' ',            pa.m_name,            ' ',            pa.l_name) as pname,    pa.patient_id,    p.patient_sales_bill_id,    s.patient_slave_qty,    s.patient_slave_batch_code,    s.patient_slave_mrp from    pharma_patient_sales_bill_master p        inner join    pharma_patient_sales_bill_slave s ON p.patient_sales_bill_id = s.patient_slave_bill_master_id        inner join    pharma_product_master pr ON pr.product_id = s.patient_slave_product_id        inner join    ehat_patient pa ON pa.patient_id = p.patient_bill_patient_id where    p.patient_sales_bill_delete_flag = '0'        and p.patient_bill_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and pr.product_id='"
				+ productId
				+ "'";
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						counterSaleAll);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						hospitalSale);
			} else if (type.equals("counterSale4Counter")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						counterSale4Counter);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setDate(row[0].toString());
				else
					productByBatch.setDate("");

				if (row[1] != null)
					productByBatch.setProductName(row[1].toString());
				else
					productByBatch.setProductName("");

				if (row[2] != null)
					productByBatch.setPatientName(row[2].toString());
				else
					productByBatch.setPatientName("");

				if (row[3] != null)
					productByBatch.setPatientId(row[3].toString());
				else
					productByBatch.setPatientId("");
				
				if (row[4] != null)
					productByBatch.setBatchId(row[4].toString());
				else
					productByBatch.setBatchId("");

				if (row[5] != null)
					productByBatch.setQty(row[5].toString());
				else
					productByBatch.setQty("");
				
				if (row[6] != null)
					productByBatch.setBatchCode(row[6].toString());
				else
					productByBatch.setBatchCode("");

				if (row[7] != null)
					productByBatch.setMrp(row[7].toString());
				else
					productByBatch.setMrp("");
				
				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ReportProductWiseBatchSale> getBatchWiseSaleList(
			Integer batchId, String sale, String from, String to) {
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		String counterSaleAll = "select c_master.counter_sale_id,c_master.counter_sale_for_date,c_master.counter_sale_patient_name,c_slave.counter_slave_qty,c_slave.counter_slave_rate,c_slave.counter_slave_amt from pharma_batch_master batch inner join pharma_counter_sale_slave c_slave on batch.batch_id=c_slave.counter_slave_BatchId inner join pharma_counter_sale_master c_master on c_master.counter_sale_id=c_slave.counter_slave_master_id  where batch.batch_id = '"
				+ batchId
				+ "' and c_master.counter_sale_for_date between '"
				+ from + "' and '" + to + "'";

		String counterSale4Counter = "select c_master.counter_sale_id,c_master.counter_sale_for_date,c_master.counter_sale_patient_name,c_slave.counter_slave_qty,c_slave.counter_slave_rate,c_slave.counter_slave_amt from pharma_batch_master batch inner join pharma_counter_sale_slave c_slave on batch.batch_id=c_slave.counter_slave_BatchId inner join pharma_counter_sale_master c_master on c_master.counter_sale_id=c_slave.counter_slave_master_id  where batch.batch_id = '"
				+ batchId
				+ "' and c_master.counter_sale_for_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and counter_slave_No between '1' and '4' ";

		String indentSale = "select indent_master.indent_sale_id,indent_master.indent_sale_received_date,p.fName,indent_slave.indent_sale_slave_qty,indent_slave.indent_sale_slave_rate,indent_slave.indent_sale_slave_amt from pharma_batch_master batch inner join pharma_indent_sale_slave indent_slave ON batch.batch_id = indent_slave.indent_sale_slave_BatchId inner join pharma_indent_sale_master indent_master ON indent_master.indent_sale_id = indent_slave.indent_sale_slave_master_id inner join pharma_indent_master ind_mast on ind_mast.indent_id=indent_master.indent_sale_indent_no inner join treatment tr on tr.Treatment_ID=ind_mast.indent_treatement_id inner join patient p on p.Patient_ID=tr.Patient_ID where batch.batch_id = '"
				+ batchId
				+ "' and indent_master.indent_sale_received_date between '"
				+ from + "' and '" + to + "'";
		String hospitalSale = "select hospital_master.hospital_bill_id,hospital_master.hospital_bill_date,hospital_master.hospital_bill_patient_name,hospital_slave.hospital_slave_qty,hospital_slave.hospital_slave_rate,hospital_slave.hospital_slave_amt from pharma_batch_master batch inner join pharma_hospital_bill_slave hospital_slave ON batch.batch_id = hospital_slave.hospital_slave_BatchId inner join pharma_hospital_bill_master hospital_master ON hospital_master.hospital_bill_id = hospital_slave.hospital_slave_master_id where batch.batch_id = '"
				+ batchId
				+ "' and hospital_master.hospital_bill_date between '"
				+ from
				+ "' and '" + to + "'";
		String patientSale = "select patient_master.patient_sales_bill_id,patient_master.patient_bill_date,patient.fName,patient_slave.patient_slave_qty,patient_slave.patient_slave_rate,patient_slave.patient_slave_amt from pharma_batch_master batch inner join pharma_patient_sales_bill_slave patient_slave ON batch.batch_id = patient_slave.patient_slave_BatchId inner join pharma_patient_sales_bill_master patient_master ON patient_master.patient_sales_bill_id = patient_slave.patient_slave_bill_master_id inner join patient patient ON patient.Patient_ID = patient_master.patient_bill_patient_id where batch.batch_id = '"
				+ batchId
				+ "' and patient_master.patient_bill_date between '"
				+ from + "' and '" + to + "'";
		try {
			SQLQuery query = null;
			if (sale.equals("counterSaleAll")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						counterSaleAll);
			} else if (sale.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						indentSale);
			} else if (sale.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						hospitalSale);
			} else if (sale.equals("counterSale4Counter")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						counterSale4Counter);
			} else if (sale.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						patientSale);
			}
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				/*
				 * if (row[0] != null)
				 * productByBatch.setVouNo(row[0].toString()); else
				 * productByBatch.setVouNo("");
				 */

				if (row[1] != null)
					productByBatch.setDate(row[1].toString());
				else
					productByBatch.setDate("");

				if (row[2] != null)
					productByBatch.setPatientName(row[2].toString());
				else
					productByBatch.setPatientName("");

				if (row[3] != null)
					productByBatch.setQty(row[3].toString());
				else
					productByBatch.setQty("");

				if (row[3] != null)
					productByBatch.setRate(row[4].toString());
				else
					productByBatch.setRate("");

				if (row[3] != null)
					productByBatch.setAmount(row[5].toString());
				else
					productByBatch.setAmount("");

				if (sale.equals("counterSaleAll")) {
					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());
				} else if (sale.equals("indentSale")) {
					productByBatch.setType("indentSale");
					productByBatch.setVouNo("IS" + row[0].toString());
				} else if (sale.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
					productByBatch.setVouNo("HS" + row[0].toString());
				} else if (sale.equals("counterSale4Counter")) {
					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());

				} else if (sale.equals("patientSale")) {
					productByBatch.setType("patientSale");
					productByBatch.setVouNo("PS" + row[0].toString());
				}

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public void updateBatchDetailsForCreditNote(Integer BatchId) {
		try {

			Query query = sessionFactory
					.getCurrentSession()
					.createQuery(
							"update BatchMaster set batchDeleteFlag='0' where batchId=:batchId");
			query.setInteger("batchId", BatchId);
			query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public PurchaseRateHistory getPurchaseRateDetails1(
			PurchaseRateHistory purchaseRateHistory) {

		PurchaseRateHistory purchaseRateHistory2 = new PurchaseRateHistory();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				PurchaseRateHistory.class);
		criteria.add(Restrictions.eq("purSlaveId",
				purchaseRateHistory.getPurSlaveId()));

		criteria.add(Restrictions.eq("batchId",
				purchaseRateHistory.getBatchId()));

		try {
			purchaseRateHistory2 = (PurchaseRateHistory) criteria
					.uniqueResult();

		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return purchaseRateHistory2;
	}

	@Override
	public void updateBatchDetailsForPurchaseEdit(Integer BatchId) {
		try {

			Query query = sessionFactory
					.getCurrentSession()
					.createQuery(
							"update BatchMaster set batchDeleteFlag='1' where batchId=:batchId");
			query.setInteger("batchId", BatchId);
			 query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public String getCounterSaleTodayCount(String fromReult) {
      System.err.println("Inside counter sale");
      System.err.println("fromReult="+fromReult);
		String total = "";
		try {

			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT sum(master.counter_sale_net_amt) FROM pharma_counter_sale_master master where date(counter_sale_for_date)=:counter_sale_for_date");
			query.setString("counter_sale_for_date", fromReult.toString());
			Object result = query.uniqueResult();

			if (result != null)
				total = result.toString();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return total;
	}

	@Override
	public String getIndentSaleTodayCount(String fromReult) {
		String total = "";
		try {

			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT sum(master.indent_sale_net_amt) FROM pharma_indent_sale_master master where indent_sale_received_date =:indent_sale_date");
			query.setString("indent_sale_date", fromReult.toString());
			Object result = query.uniqueResult();

			if (result != null)
				total = result.toString();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return total;
	}

	@Override
	public String getHospitalSaleTodayCount(String fromReult) {
		String total = "";
		try {

			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT sum(master.hospital_bill_net_amt) FROM pharma_hospital_bill_master master  where master.hospital_bill_date =:hospital_bill_date");
			query.setString("hospital_bill_date", fromReult.toString());
			Object result = query.uniqueResult();

			if (result != null)
				total = result.toString();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return total;
	}
	
	
	@Override
	public String getPatientSaleTodayCount(String fromReult) {
		String total = "";
		try {

			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT sum(master.patient_sales_bill_net_amt) FROM pharma_patient_sales_bill_master master  where master.patient_bill_date =:patient_bill_date");
			query.setString("patient_bill_date", fromReult.toString());
			Object result = query.uniqueResult();

			if (result != null)
				total = result.toString();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return total;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ReportProductWiseBatchSale> getProductWisePartyList(
			Integer productId, String from, String to, String type) {
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String counterSale = "select c_master.counter_sale_id,c_master.counter_sale_for_date,batch.batch_code,vm.vendor_name,c_slave.counter_slave_qty,c_slave.counter_slave_rate,c_slave.counter_slave_amt from pharma_counter_sale_slave c_slave inner join pharma_counter_sale_master c_master ON c_master.counter_sale_id = c_slave.counter_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.counter_slave_BatchId inner join pharma_purchase_rate rate on rate.batch_id=batch.batch_id inner join pharma_purchase_slave pur_slave on pur_slave.pur_slave_id=rate.pur_slave_id inner join pharma_purchase_master pur_master on pur_master.pur_id=pur_slave.pur_slave_master_id inner join pharma_vendor_master vm on vm.vendor_id=pur_master.pur_vendor_id inner join pharma_product_master product on product.product_id=c_slave.counter_slave_product_id where c_master.counter_sale_for_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and product.product_id='"
				+ productId + "'";
		String indentSale = "select c_master.indent_sale_id,c_master.indent_sale_received_date,batch.batch_code,vm.vendor_name,c_slave.indent_sale_slave_qty,c_slave.indent_sale_slave_rate,c_slave.indent_sale_slave_amt from pharma_indent_sale_slave c_slave inner join pharma_indent_sale_master c_master ON c_master.indent_sale_id = c_slave.indent_sale_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.indent_sale_slave_BatchId inner join pharma_purchase_rate rate on rate.batch_id=batch.batch_id inner join pharma_purchase_slave pur_slave on pur_slave.pur_slave_id=rate.pur_slave_id inner join pharma_purchase_master pur_master on pur_master.pur_id=pur_slave.pur_slave_master_id inner join pharma_vendor_master vm on vm.vendor_id=pur_master.pur_vendor_id inner join pharma_product_master product on product.product_id=c_slave.indent_sale_slave_product_id where c_master.indent_sale_received_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and product.product_id='"
				+ productId + "'";
		String hospitalSale = "select c_master.hospital_bill_id,c_master.hospital_bill_date,batch.batch_code,vm.vendor_name,c_slave.hospital_slave_qty,c_slave.hospital_slave_rate,c_slave.hospital_slave_amt,c_slave.hospital_slave_product_id,c_master.hospital_bill_id,c_slave.hospital_slave_id from pharma_hospital_bill_slave c_slave inner join pharma_hospital_bill_master c_master ON c_master.hospital_bill_id = c_slave.hospital_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.hospital_slave_BatchId inner join pharma_purchase_rate rate on rate.batch_id=batch.batch_id inner join pharma_purchase_slave pur_slave on pur_slave.pur_slave_id=rate.pur_slave_id inner join pharma_purchase_master pur_master on pur_master.pur_id=pur_slave.pur_slave_master_id inner join pharma_vendor_master vm on vm.vendor_id=pur_master.pur_vendor_id inner join pharma_product_master product on product.product_id=c_slave.hospital_slave_product_id where c_master.hospital_bill_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and product.product_id='"
				+ productId + "'";
		String patientSale = "select p_master.patient_sales_bill_id,p_master.patient_bill_date,batch.batch_code,vm.vendor_name,p_slave.patient_slave_qty,p_slave.patient_slave_rate,p_slave.patient_slave_amt from pharma_patient_sales_bill_slave p_slave inner join pharma_patient_sales_bill_master p_master ON p_master.patient_sales_bill_id = p_slave.patient_slave_bill_master_id inner join pharma_batch_master batch ON batch.batch_id = p_slave.patient_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_purchase_slave pur_slave ON pur_slave.pur_slave_id = rate.pur_slave_id inner join pharma_purchase_master pur_master ON pur_master.pur_id = pur_slave.pur_slave_master_id inner join pharma_vendor_master vm ON vm.vendor_id = pur_master.pur_vendor_id inner join pharma_product_master product ON product.product_id = p_slave.patient_slave_product_id where p_master.patient_bill_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and product.product_id ='"
				+ productId + "'";
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				/*
				 * if (row[0] != null)
				 * productByBatch.setVouNo(row[0].toString()); else
				 * productByBatch.setVouNo("");
				 */

				if (row[1] != null)
					productByBatch.setDate(row[1].toString());
				else
					productByBatch.setDate("");

				if (row[2] != null)
					productByBatch.setBatchCode(row[2].toString());
				else
					productByBatch.setBatchCode("");

				if (row[3] != null)
					productByBatch.setVendorName(row[3].toString());
				else
					productByBatch.setVendorName("");

				if (row[4] != null)
					productByBatch.setQty(row[4].toString());
				else
					productByBatch.setQty("");

				if (row[5] != null)
					productByBatch.setRate(row[5].toString());
				else
					productByBatch.setRate("");

				if (row[6] != null)
					productByBatch.setAmount(row[6].toString());
				else
					productByBatch.setAmount("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
					productByBatch.setVouNo("CS" + row[0].toString());
				} else if (type.equals("indentSale")) {
					productByBatch.setType("indentSale");
					productByBatch.setVouNo("IS" + row[0].toString());
				} else if (type.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
					productByBatch.setVouNo("HS" + row[0].toString());
				}

				else if (type.equals("patientSale")) {
					productByBatch.setType("patientSale");
					productByBatch.setVouNo("PS" + row[0].toString());
				}
				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ReportProductWiseBatchSale> getPartyList(String from,
			String to,String type) {
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String counterSale = "select vm.vendor_id,vm.vendor_name,vm.vendor_address from pharma_counter_sale_slave c_slave inner join pharma_counter_sale_master c_master ON c_master.counter_sale_id = c_slave.counter_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.counter_slave_BatchId inner join pharma_purchase_rate rate on rate.batch_id=batch.batch_id inner join pharma_purchase_slave pur_slave on pur_slave.pur_slave_id=rate.pur_slave_id inner join pharma_purchase_master pur_master on pur_master.pur_id=pur_slave.pur_slave_master_id inner join pharma_vendor_master vm on vm.vendor_id=pur_master.pur_vendor_id inner join pharma_product_master product on product.product_id=c_slave.counter_slave_product_id where c_master.counter_sale_for_date between '"
				+ from + "' and '" + to + "'";
		String indentSale = "select vm.vendor_id,vm.vendor_name,vm.vendor_address from pharma_indent_sale_slave c_slave inner join pharma_indent_sale_master c_master ON c_master.indent_sale_id = c_slave.indent_sale_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.indent_sale_slave_BatchId inner join pharma_purchase_rate rate on rate.batch_id=batch.batch_id inner join pharma_purchase_slave pur_slave on pur_slave.pur_slave_id=rate.pur_slave_id inner join pharma_purchase_master pur_master on pur_master.pur_id=pur_slave.pur_slave_master_id inner join pharma_vendor_master vm on vm.vendor_id=pur_master.pur_vendor_id inner join pharma_product_master product on product.product_id=c_slave.indent_sale_slave_product_id where c_master.indent_sale_received_date between '"
				+ from + "' and '" + to + "'";
		String hospitalSale = "select vm.vendor_id,vm.vendor_name,vm.vendor_address from pharma_hospital_bill_slave c_slave inner join pharma_hospital_bill_master c_master ON c_master.hospital_bill_id = c_slave.hospital_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.hospital_slave_BatchId inner join pharma_purchase_rate rate on rate.batch_id=batch.batch_id inner join pharma_purchase_slave pur_slave on pur_slave.pur_slave_id=rate.pur_slave_id inner join pharma_purchase_master pur_master on pur_master.pur_id=pur_slave.pur_slave_master_id inner join pharma_vendor_master vm on vm.vendor_id=pur_master.pur_vendor_id inner join pharma_product_master product on product.product_id=c_slave.hospital_slave_product_id where c_master.hospital_bill_date between '"
				+ from + "' and '" + to + "'";
		String patientSale = "select vm.vendor_id, vm.vendor_name, vm.vendor_address from pharma_patient_sales_bill_slave p_slave inner join pharma_patient_sales_bill_master p_master ON p_master.patient_sales_bill_id = p_slave.patient_slave_bill_master_id inner join pharma_batch_master batch ON batch.batch_id = p_slave.patient_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_purchase_slave pur_slave ON pur_slave.pur_slave_id = rate.pur_slave_id inner join pharma_purchase_master pur_master ON pur_master.pur_id = pur_slave.pur_slave_master_id inner join pharma_vendor_master vm ON vm.vendor_id = pur_master.pur_vendor_id inner join pharma_product_master product ON product.product_id = p_slave.patient_slave_product_id where p_master.patient_bill_date between '"
				+ from + "' and '" + to + "'";
		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setVendorId(row[0].toString());
				else
					productByBatch.setVendorId("");

				if (row[1] != null)
					productByBatch.setVendorName(row[1].toString());
				else
					productByBatch.setVendorName("");

				if (row[2] != null)
					productByBatch.setVendorAddress(row[2].toString());
				else
					productByBatch.setVendorAddress("");

				if (type.equals("counterSale")) {
					productByBatch.setType("counterSale");
				} else if (type.equals("indentSale")) {
					productByBatch.setType("indentSale");
				} else if (type.equals("hospitalSale")) {
					productByBatch.setType("hospitalSale");
				} else if (type.equals("patientSale")) {
					productByBatch.setType("patientSale");
				}
				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return productWiseBatchSales;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ReportProductWiseBatchSale> getPartyWiseProductSaleList(
			Integer vendorId, String from, String to, String type) {
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		SQLQuery query = null;
		String counterSale = "select product.product_name,pack.pack_type,c_slave.counter_slave_qty from pharma_counter_sale_slave c_slave inner join pharma_counter_sale_master c_master ON c_master.counter_sale_id = c_slave.counter_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.counter_slave_BatchId inner join pharma_purchase_rate rate on rate.batch_id=batch.batch_id inner join pharma_purchase_slave pur_slave on pur_slave.pur_slave_id=rate.pur_slave_id inner join pharma_purchase_master pur_master on pur_master.pur_id=pur_slave.pur_slave_master_id inner join pharma_vendor_master vm on vm.vendor_id=pur_master.pur_vendor_id inner join pharma_product_master product on product.product_id=c_slave.counter_slave_product_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id where c_master.counter_sale_for_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and vm.vendor_id='"
				+ vendorId
				+ "'";
		String indentSale = "select product.product_name,pack.pack_type,c_slave.indent_sale_slave_qty from pharma_indent_sale_slave c_slave inner join pharma_indent_sale_master c_master ON c_master.indent_sale_id = c_slave.indent_sale_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.indent_sale_slave_BatchId inner join pharma_purchase_rate rate on rate.batch_id=batch.batch_id inner join pharma_purchase_slave pur_slave on pur_slave.pur_slave_id=rate.pur_slave_id inner join pharma_purchase_master pur_master on pur_master.pur_id=pur_slave.pur_slave_master_id inner join pharma_vendor_master vm on vm.vendor_id=pur_master.pur_vendor_id inner join pharma_product_master product on product.product_id=c_slave.indent_sale_slave_product_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id where c_master.indent_sale_received_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and vm.vendor_id='"
				+ vendorId
				+ "'";
		String hospitalSale = "select product.product_name,pack.pack_type,c_slave.hospital_slave_qty from pharma_hospital_bill_slave c_slave inner join pharma_hospital_bill_master c_master ON c_master.hospital_bill_id = c_slave.hospital_slave_master_id inner join pharma_batch_master batch on batch.batch_id=c_slave.hospital_slave_BatchId inner join pharma_purchase_rate rate on rate.batch_id=batch.batch_id inner join pharma_purchase_slave pur_slave on pur_slave.pur_slave_id=rate.pur_slave_id inner join pharma_purchase_master pur_master on pur_master.pur_id=pur_slave.pur_slave_master_id inner join pharma_vendor_master vm on vm.vendor_id=pur_master.pur_vendor_id inner join pharma_product_master product on product.product_id=c_slave.hospital_slave_product_id inner join pharma_packing_master pack on pack.pack_id=product.product_pack_id where c_master.hospital_bill_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and vm.vendor_id='"
				+ vendorId
				+ "'";
		String patientSale = "select product.product_name,pack.pack_type,p_slave.patient_slave_qty from pharma_patient_sales_bill_slave p_slave inner join  pharma_patient_sales_bill_master p_master ON p_master.patient_sales_bill_id = p_slave.patient_slave_bill_master_id inner join pharma_batch_master batch ON batch.batch_id = p_slave.patient_slave_BatchId inner join pharma_purchase_rate rate ON rate.batch_id = batch.batch_id inner join pharma_purchase_slave pur_slave ON pur_slave.pur_slave_id = rate.pur_slave_id inner join pharma_purchase_master pur_master ON pur_master.pur_id = pur_slave.pur_slave_master_id inner join pharma_vendor_master vm ON vm.vendor_id = pur_master.pur_vendor_id inner join pharma_product_master product ON product.product_id = p_slave.patient_slave_product_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id where p_master.patient_bill_date between '"
				+ from
				+ "' and '"
				+ to
				+ "' and vm.vendor_id='"
				+ vendorId
				+ "'";

		try {
			if (type.equals("counterSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						counterSale);
			} else if (type.equals("indentSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						indentSale);
			} else if (type.equals("hospitalSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						hospitalSale);
			} else if (type.equals("patientSale")) {
				query = sessionFactory.getCurrentSession().createSQLQuery(
						patientSale);
			}

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportProductWiseBatchSale productByBatch = new ReportProductWiseBatchSale();

				if (row[0] != null)
					productByBatch.setPatientName(row[0].toString());// setProductName
																		// in
																		// PatientName
				else
					productByBatch.setPatientName("");

				if (row[1] != null)
					productByBatch.setType(row[1].toString());// setPackingType
																// in
																// PatientName
				else
					productByBatch.setType("");

				if (row[2] != null)
					productByBatch.setQty(row[2].toString());
				else
					productByBatch.setQty("");

				productWiseBatchSales.add(productByBatch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productWiseBatchSales;
	}

	@Override
	public List<PurchaseMaster> getLimitPurchases(Integer unitId) {
	
		List<PurchaseMaster> saleMasters = new ArrayList<PurchaseMaster>();
		try {
			
			Query query=sessionFactory.getCurrentSession().createSQLQuery("select  distinct   pur_id,    pur_vendor_id,    vendor_name,    pur_bill_no,    pur_bill_date,    pur_net_amt,    pur_trans_type ,p.unit_count    from    pharma_purchase_master p        inner join    pharma_purchase_slave s ON s.pur_slave_master_id = p.pur_id,    pharma_vendor_master v where    p.pur_vendor_id = v.vendor_id        and p.pur_delete_flag = 0 and p.pur_vmi=0 and p.unit_id ='"+unitId+"' order by p.pur_id desc limit 10").setCacheable(true);
			@SuppressWarnings("unchecked")
			List<Object[]> result = query.list();

			for (Object[] master : result) {
				PurchaseMaster purchaseMaster = new PurchaseMaster();
				purchaseMaster.setPurId(Integer.parseInt(master[0].toString()));

				VendorMaster vendorMaster = new VendorMaster();
				vendorMaster
						.setVendorId(Integer.parseInt(master[1].toString()));

				if (master[2] != null)
					vendorMaster.setVendorName(master[2].toString());
				else
					vendorMaster.setVendorName("");

				if (master[3] != null)
					purchaseMaster.setPurBillNo(master[3].toString());
				else
					purchaseMaster.setPurBillNo("");

				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[4].toString());

				purchaseMaster.setPurBillDate(date);
				purchaseMaster.setVendorMaster(vendorMaster);

				if (master[5] != null)
					purchaseMaster.setPurNetAmt(Double.parseDouble(master[5]
							.toString()));
				else
					purchaseMaster.setPurNetAmt(0.0);

				if (master[6] != null)
					purchaseMaster.setPurTransType((master[6].toString()));
				else
					purchaseMaster.setPurTransType((""));
			
				if (master[3]!=null){
					purchaseMaster.setPurchaseStatus(master[3].toString());
				}
				else
					purchaseMaster.setPurchaseStatus((""));
				
				if (master[7] != null)
					purchaseMaster.setUnitCount(Integer.parseInt(master[7]
							.toString()));
				else
					purchaseMaster.setUnitCount(0);
				
			
				saleMasters.add(purchaseMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return saleMasters;
		}
		return saleMasters;
	}
	//added by akshata
	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseHistory> getBatchDetailsForOpeningStock(
			Integer productId, String storeId) {

		String strQuery = "";
		Object storeName = new Object();

		try {
			Query query = sessionFactory.getCurrentSession().createQuery(
					"SELECT storeName FROM SubStoreMaster where storeId='"
							+ storeId + "'");
			storeName = query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<PurchaseHistory> purchaseHistories = new ArrayList<PurchaseHistory>();
		Query query=null; 
		try {
			if (storeName == null || storeName.toString().isEmpty()) {
				query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_product_barcode_opening_stock_by_product_id(:p_batch_id)");
			query.setParameter("p_batch_id", productId);
			}else {
				query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_product_barcode_opening_stock_by_batch_id_store_name(:p_batch_id,:p_store_name)");
				query.setParameter("p_batch_id", productId);
				query.setParameter("p_store_name", storeName.toString());
			}
			
			query.setResultTransformer(Transformers.aliasToBean(PurchaseHistory.class));
			purchaseHistories = query.list();
			} catch (Exception e) {
			e.printStackTrace();
		}
		return purchaseHistories;
	}
//added by akshata
	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseHistory> getProductNameByBarcodeForOpeningStock(
			Integer batchId, String storeId) {

		String strQuery = "";
		Object storeName = new Object();

		try {
			Query query = sessionFactory.getCurrentSession().createQuery(
					"SELECT storeName FROM SubStoreMaster where storeId='"
							+ storeId + "'");
			storeName = query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<PurchaseHistory> purchaseHistories = new ArrayList<PurchaseHistory>();
		try {
			Query query=null;
			if (storeName==null || storeName.toString().isEmpty()) {
				query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_product_name_by_barcode_for_opening_stock(:p_batch_id)");
				query.setParameter("p_batch_id", batchId);
			} else { 
				query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_product_name_by_barcode_for_opening_stock_store_wise(:p_batch_id,:p_store_name,:p_store_table)");
				query.setParameter("p_batch_id", batchId);
				query.setParameter("p_store_name", "store_name");
				query.setParameter("p_store_table", "pharma_"+storeName.toString()+"_stock_master");
			}
			
			query.setResultTransformer(Transformers.aliasToBean(PurchaseHistory.class));
			purchaseHistories = query.list();
	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return purchaseHistories;
	}


//chnaged by Akshata
	@Override
	public void increaseStock(Integer batchId, Integer total) {
		try {

			Query query = sessionFactory.getCurrentSession().createQuery(
					"SELECT stockQtyInHand FROM StockMaster where batchMaster.batchId='"
							+ batchId + "'");
			Double availableStock = 0.0;
			Double totalStock = 0.0;
			Object rows = query.uniqueResult();
			;
			if (rows != null) {
				availableStock = Double.parseDouble(rows.toString());
			}
			totalStock = availableStock + total;

			try {
				Query query1 = sessionFactory.getCurrentSession().createQuery(
						"update StockMaster set stockQtyInHand='"
								+ totalStock
								+ "' where batchMaster.batchId=:batchId");
				query1.setInteger("batchId", batchId);
				query1.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	//changed by Akshata
	@Override
	public void decreaseStock(Integer batchId, Integer Qty) {
		try {

			Query query = sessionFactory.getCurrentSession().createQuery(
					"SELECT stockQtyInHand FROM StockMaster where batchMaster.batchId='"
							+ batchId + "'");
			Double availableStock = null;
			Double totalStock = null;
			Object rows = query.uniqueResult();

			if (rows != null) {
				availableStock = Double.parseDouble(rows.toString());
			}
			totalStock = availableStock - Qty;

			try {
				Query query1 = sessionFactory.openSession().createQuery(
						"update StockMaster set stockQtyInHand='"
								+ totalStock
								+ "' where batchMaster.batchId=:batchId");
				query1.setInteger("batchId", batchId);
				 query1.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
//changed by Akshata
	@Override
	public Integer getNextAutoIncrement() {

		Integer id = 0;
		try {
			
			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createQuery(
							"SELECT MAX(purId) FROM PurchaseMaster");
			Object id1 = query.uniqueResult();

			if (id1 == null) {
				id1 = 0;
			}
			id = Integer.parseInt(id1.toString()) + 1;

		} catch (Exception e) {
			e.printStackTrace();
			return id;
		}
		return id;

	}
//cahnged by Akshata
	@Override
	public void changePOStatus(Integer poId) {
		try {
			Integer id = 0;
			Query query = sessionFactory
					.getCurrentSession()
					.createQuery(
							"SELECT poMaster.poId FROM PartywisePoInvoiceMaster where poMaster.poId='"+poId+ "'");
		
			Object rowsDeleted = query.uniqueResult();

			if (rowsDeleted != null) {
				id = Integer.parseInt(rowsDeleted.toString());
			}

			Query query1 = sessionFactory.getCurrentSession().createQuery(
					"update PoMaster set poStatus='received' where poId=" + id);
			/* query.setInteger("batchId", id); */
			query1.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<PurchaseMaster> getPurchaseData(Integer unitId) {

		List<PurchaseMaster> purchaseMasters = new ArrayList<PurchaseMaster>();
		try {
			

			SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" SELECT distinct master.pur_id,vendor.vendor_id,vendor.vendor_name,master.pur_doc_id,master.pur_bill_date,master.pur_bill_no, "
									+ " master.pur_net_amt FROM pharma_purchase_master master inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id "
									+ " inner join pharma_batch_master batch on slave.pur_Slave_batch_id=batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id "
									+ " inner join pharma_vendor_master vendor ON master.pur_vendor_id = vendor.vendor_id where stock.stock_qty_in_hand != 0 and master.pur_delete_flag = 0 and master.unit_id = '"+unitId+"' order by pur_id desc; ");

			@SuppressWarnings("unchecked")
			List<Object[]> result = query1.list();

			for (Object[] master : result) {

				PurchaseMaster purchaseMaster = new PurchaseMaster();
				purchaseMaster.setPurId(Integer.parseInt(master[0].toString()));

				VendorMaster vendorMaster = new VendorMaster();
				vendorMaster
						.setVendorId(Integer.parseInt(master[1].toString()));

				if (master[2] != null)
					vendorMaster.setVendorName(master[2].toString());
				else
					vendorMaster.setVendorName("");

				if (master[3] != null)
					purchaseMaster.setPurDocId(master[3].toString());
				else
					purchaseMaster.setPurDocId("");

				if (master[4] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					java.util.Date date = dateFormat
							.parse(master[4].toString());
					purchaseMaster.setPurBillDate(date);
				} /*
				 * else { SimpleDateFormat dateFormat1 = new SimpleDateFormat(
				 * "yyyy-MM-dd"); java.util.Date date1 =
				 * dateFormat1.parse(master[4] .toString());
				 * purchaseMaster.setPurBillDate(date1); }
				 */

				if (master[5] != null)
					purchaseMaster.setPurBillNo((master[5].toString()));
				else
					purchaseMaster.setPurBillNo((""));

				if (master[6] != null)
					purchaseMaster.setPurNetAmt(Double.parseDouble(master[6]
							.toString()));
				else
					purchaseMaster.setPurNetAmt(0.0);

				purchaseMaster.setVendorMaster(vendorMaster);

				purchaseMasters.add(purchaseMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return purchaseMasters;
		}
		return purchaseMasters;
	}

	@Override
	public PurchaseMaster getPurchaseEntryByPurchaseId(Integer purId) {
		PurchaseMaster purchaseMaster = new PurchaseMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseMaster.class);
			criteria.add(Restrictions.eq("purId", purId));
			criteria.add(Restrictions.eq("purDeleteFlag", 0));

			purchaseMaster = (PurchaseMaster) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return purchaseMaster;
		}
		return purchaseMaster;

		
	}

	@SuppressWarnings("unchecked")
	@Override
	public PurchaseMaster getPurchaseEntrySlaveForDebitNoteByPurId(Integer purId) {
		PurchaseMaster purchaseMaster = new PurchaseMaster();

		SQLQuery query1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT master.pur_id,vendor.vendor_id,vendor.vendor_name,venadd.vendor_mobile_num,venadd.vendor_address,venadd.vAddrId FROM pharma_purchase_master master "
								+ " inner join pharma_vendor_master vendor on master.pur_vendor_id=vendor.vendor_id inner join  pharma_vendor_address venadd ON master.pur_vendor_add_id =venadd.vAddrId "
								+ " where  pur_id=" + purId);

		List<Object[]> result = query1.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					purchaseMaster
							.setPurId(Integer.parseInt(row[0].toString()));

				VendorMaster vendorMaster = new VendorMaster();
				VendorAddress   add       =new VendorAddress();
				if (row[1] != null)
					vendorMaster
							.setVendorId(Integer.parseInt(row[1].toString()));
				else
					vendorMaster.setVendorId(0);

				if (row[2] != null)
					vendorMaster.setVendorName(row[2].toString());
				else
					vendorMaster.setVendorName("");

				if (row[3] != null)
					add.setVendorMobileNumber(row[3].toString());
				else
					add.setVendorMobileNumber((""));

				if (row[4] != null)
					add.setVendorAddress(row[4].toString());
				else
					add.setVendorAddress("");
				
				if (row[5] != null)
					add.setVendorAddressId(Integer.parseInt(row[5].toString()));
				else
					add.setVendorAddressId(0);

				purchaseMaster.setVendorAddress(add);
				
				purchaseMaster.setVendorMaster(vendorMaster);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" SELECT product.product_id,batch.batch_id,batch.batch_code,batch.batch_exp_date,slave.pur_slave_vat, slave.pur_igst,slave.pur_cess ,slave.pur_slave_mrp,slave.pur_slave_disc, "
								+ " slave.pur_slave_purchase_rate,product.product_name,product.product_uom_unit,company.comp_name,pack.pack_type,slave.pur_slave_id, "
								+ " stock.stock_qty_in_hand,slave.pur_slave_bill_rate FROM pharma_purchase_master master inner join pharma_purchase_slave slave ON slave.pur_slave_master_id = master.pur_id "
								+ " inner join pharma_product_master product ON product.product_id = slave.pur_slave_product_id inner join pharma_batch_master batch ON batch.batch_id = slave.pur_slave_batch_id "
								+ " inner join pharma_company_master company ON company.comp_id = product.product_comp_id inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join "
								+ " pharma_stock_master stock on stock.stock_batch_id=batch.batch_id where stock.stock_qty_in_hand!=0 and master.pur_id ='"
								+ purId + "'");
		List<Object[]> rows = query.list();
		List<PurchaseSlave> purchaseSlaves = new ArrayList<PurchaseSlave>();
		for (Object[] row : rows) {
			try {
				PurchaseSlave purchaseSlave = new PurchaseSlave();
				ProductMaster productMaster = new ProductMaster();
				BatchMaster batchMaster = new BatchMaster();
				if (row[0] != null)
					productMaster.setProductId(Integer.parseInt(row[0]
							.toString()));
				else
					productMaster.setProductId(0);

				if (row[1] != null)
					batchMaster.setBatchId(Integer.parseInt(row[1].toString()));
				else
					batchMaster.setBatchId(0);

				if (row[2] != null)
					batchMaster.setBatchCode(row[2].toString());
				else
					batchMaster.setBatchCode("");

				if (row[3] != null)
					batchMaster.setBatchExpDate(row[3].toString());
				else
					batchMaster.setBatchExpDate("");

				if (row[4] != null)
					purchaseSlave.setPurVat(Double.parseDouble(row[4]
							.toString()));
				else
					purchaseSlave.setPurVat(0.00);
				
				if (row[5] != null)
					purchaseSlave.setPurIgst(Double.parseDouble(row[5]
							.toString()));
				else
					purchaseSlave.setPurIgst(0.00);
				
				if (row[6] != null)
					purchaseSlave.setPurCess(Double.parseDouble(row[6]
							.toString()));
				else
					purchaseSlave.setPurCess(0.00);


				if (row[7] != null)
					purchaseSlave.setPurSlaveMrp(Double.parseDouble(row[7]
							.toString()));
				else
					purchaseSlave.setPurSlaveMrp(0.0);

				if (row[8] != null)
					purchaseSlave.setPurDisc(Double.parseDouble(row[8]
						.toString()));
				else
					purchaseSlave.setPurDisc(0.0);

				if (row[9] != null)
					purchaseSlave.setPurSlavePurchaseRate(Double
							.parseDouble(row[9].toString()));
				else
					purchaseSlave.setPurSlavePurchaseRate(0.0);

				if (row[10] != null)
					productMaster.setProductName(row[10].toString());
				else
					productMaster.setProductName("");

				if (row[11] != null)
					productMaster.setProductUnit(Double.parseDouble(row[11]
							.toString()));
				else
					productMaster.setProductUnit(0.0);

				if (row[12] != null) {
					CompanyMaster companyMaster = new CompanyMaster();
					companyMaster.setCompName(row[10].toString());
					productMaster.setCompanyMaster(companyMaster);
				} else {
					CompanyMaster companyMaster = new CompanyMaster();
					companyMaster.setCompName("");
					productMaster.setCompanyMaster(companyMaster);
				}

				if (row[13] != null) {
					PackingMaster packingMaster = new PackingMaster();
					packingMaster.setPackType(row[11].toString());
					productMaster.setPackingMaster(packingMaster);
				} else {
					PackingMaster packingMaster = new PackingMaster();
					packingMaster.setPackType(row[11].toString());
					productMaster.setPackingMaster(packingMaster);
				}

				purchaseSlave.setProductMaster(productMaster);
				purchaseSlave.setBatchMaster(batchMaster);

				if (row[14] != null)
					purchaseSlave.setPurSlaveId(Integer.parseInt(row[14]
							.toString()));
				else
					purchaseSlave.setPurSlaveId(0);

				StockMaster stockMaster = new StockMaster();
				if (row[15] != null)
					stockMaster.setStockQtyInHand((Double.parseDouble(row[15]
							.toString())));
				else
					stockMaster.setStockQtyInHand(0.0);

				if (row[16] != null)
					purchaseSlave.setPurSlaveBillRate(Double.parseDouble(row[16]
							.toString()));
				else
					purchaseSlave.setPurSlaveBillRate(0.0);
				
				batchMaster.setStockMaster(stockMaster);
				purchaseSlave.setBatchMaster(batchMaster);

				purchaseSlaves.add(purchaseSlave);
			} catch (Exception e) {
				e.printStackTrace();
			}
			purchaseMaster.setLtPurSlave(purchaseSlaves);
		}
		return purchaseMaster;

	}
//Changed By Akshata
	@Override
	public String getTotalStock(Integer productId) {
		String totalStock ="";
		//opening Stock
		try {
			Query totalStockQuery = sessionFactory
					.getCurrentSession()
					.createQuery(" select     sum(stockQtyInHand) from   StockMaster  where    stockProductMaster.productId ="+productId);
			Object totalStockResult = (Object) totalStockQuery.uniqueResult();

			if (totalStockResult.toString() != null) {
				totalStock =totalStockResult.toString();
			} else {
				totalStock = 0+"";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}		
		return totalStock;
	}
	
	@Override
	public PurchaseMaster getPurchaseByIdForEdit(Integer purchaseId) 
	{
		PurchaseMaster purchaseMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseMaster.class);
			criteria.add(Restrictions.eq("purDeleteFlag", 0));
			if (purchaseId != 0) {
				criteria.add(Restrictions.eq("purId", purchaseId));
			}

			
			purchaseMasters = (PurchaseMaster) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return purchaseMasters;
		}
		return purchaseMasters;
	}

	@Override
	public String getDelChalanNumber(int purchaseMasterId) {
		Query query=sessionFactory.getCurrentSession().createQuery("select delChalanNumber from PurchaseSlave where purchaseMaster.purId=?").setCacheable(true);
		query.setParameter(0, purchaseMasterId);
		@SuppressWarnings("unchecked")
		List<String> obj=query.list();
		if (obj.size()>0)
			return obj.get(0);
		
		return "";
	}

	//added by Akshata
	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseHistory> getProductByBarcode(Integer batchId,
			String storeId) {
		String strQuery = "";
		Object storeName = new Object();

		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT storeName FROM SubStoreMaster where storeId='"
							+ storeId + "'");
			storeName = query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		List<PurchaseHistory> purchaseHistories = new ArrayList<PurchaseHistory>();
		try {
			Query query=null;
			if (storeName==null || storeName.toString().isEmpty()) {
				query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_product_name_by_barcode_for_opening_stock(:p_batch_id)");
				query.setParameter("p_batch_id", batchId);
			} else { 
				query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_product_name_by_barcode_for_opening_stock_store_wise(:p_batch_id,:p_store_name)");
				query.setParameter("p_batch_id", batchId);
				query.setParameter("p_store_name", storeName.toString());
			}
			
			query.setResultTransformer(Transformers.aliasToBean(PurchaseHistory.class));
			purchaseHistories = query.list();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return purchaseHistories;
	}
//added by Akshata
	@SuppressWarnings("unchecked")
	@Override
	public List<PurchaseHistory> getProductByBarcodeForOpeningStock(
			Integer batchId, String storeId) {
		String strQuery = "";
		Object storeName = new Object();

		try {
			Query query = sessionFactory.getCurrentSession().createQuery(
					"SELECT storeName FROM SubStoreMaster where storeId='"
							+ storeId + "'");
			storeName = query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		

		List<PurchaseHistory> purchaseHistories = new ArrayList<PurchaseHistory>();
		try {
			
			Query query=null; 
	
				if (storeName == null || storeName.toString().isEmpty()) {
					query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_batch_details_by_product_id(:p_product_id)");
				query.setParameter("p_product_id", batchId);
				}else {
					query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_batch_details_by_product_id(:p_product_id)");
					query.setParameter("p_product_id", batchId);
				}
				
				query.setResultTransformer(Transformers.aliasToBean(PurchaseHistory.class));
				purchaseHistories = query.list();
			
				} catch (Exception e) {
				e.printStackTrace();
			}
			return purchaseHistories;

			
	}
	
	
		@Override
	public PurchaseSlave getCathProductInfo(Integer productId,Double qty) {
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						" select     ifnull(ltpurslave1_.pur_slave_id,0),    ifnull(ltpurslave1_.pur_hsn,'0'),    ifnull(ltpurslave1_.pur_igst, 0),    ltpurslave1_.pur_slave_bill_rate,    ltpurslave1_.pur_slave_mrp, ltpurslave1_.pur_slave_qty,    ifnull(ltpurslave1_.pur_slave_vat, 0),    ifnull(ltpurslave1_.pur_slave_disc, 0),ifnull(ltpurslave1_.pur_cess, 0),vendormast2_.vendor_id,ltpurslave1_.pur_slave_batch_id,ltpurslave1_.pur_slave_batch_code from    pharma_purchase_master this_        inner join    pharma_purchase_slave ltpurslave1_ ON this_.pur_id = ltpurslave1_.pur_slave_master_id        left outer join    pharma_product_master productmas5_ ON ltpurslave1_.pur_slave_product_id = productmas5_.product_id        left outer join    pharma_purchase_master purchasema6_ ON ltpurslave1_.pur_slave_master_id = purchasema6_.pur_id        inner join    pharma_vendor_master vendormast2_ ON this_.pur_vendor_id = vendormast2_.vendor_id where    this_.pur_vmi = 1        and ltpurslave1_.pur_slave_product_id = "
				+productId
				+"        and ltpurslave1_.pur_slave_qty >="+qty+" order by this_.pur_id desc limit 1");

		if(query.list().size()<1)
			return null;
		@SuppressWarnings("unchecked")
		List<Object[]> result = query.list();
		PurchaseSlave purchaseSlave=new PurchaseSlave();
		List<VendorMaster> vendorMasters=new ArrayList<VendorMaster>();
		try {
			for (Object[] row : result) {
				
				if (row[0] != null)
					purchaseSlave.setPurSlaveId(Integer.parseInt(row[0].toString()));

				if (row[1] != null)
					purchaseSlave.setPurHsn(row[1].toString());

				if (row[2] != null)
					purchaseSlave.setPurIgst(Double.parseDouble(row[2].toString()+""));

				if (row[3] != null)
					purchaseSlave.setPurSlaveBillRate(Double.parseDouble(row[3].toString()+""));

				if (row[4] != null)
					purchaseSlave.setPurSlaveMrp(Double.parseDouble(row[4].toString()+""));
				
				if (row[5] != null)
					purchaseSlave.setPurSlaveQty(Integer.parseInt(row[5].toString()));

				if (row[6] != null)
					purchaseSlave.setPurVat(Double.parseDouble(row[6].toString()+""));

				if (row[7] != null)
					purchaseSlave.setPurDisc(Double.parseDouble(row[7].toString()+""));
				
				if (row[8] != null)
					purchaseSlave.setPurCess(Double.parseDouble(row[8].toString()+""));
				
				ProductMaster productMaster=new ProductMaster();
				if (row[9] != null){
					VendorMaster vendorMaster=new VendorMaster();
					vendorMaster.setVendorId(Integer.parseInt(row[9]+""));
					vendorMasters.add(vendorMaster);
				}
				productMaster.setVendorMasters(vendorMasters);
				purchaseSlave.setProductMaster(productMaster);
				
				BatchMaster batchMaster=new BatchMaster();
				if (row[10] != null)
					batchMaster.setBatchId(Integer.parseInt(row[10].toString()));
				
				if (row[11] != null)
					batchMaster.setBatchCode(row[11].toString());
				
				purchaseSlave.setBatchMaster(batchMaster);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return purchaseSlave;
	}
	
	/****
	 * @Code	  :For sending to finance 
	 * ******/	
	@Override
	public int SendToGRNForFinance(HttpServletRequest request, String grnId) {
		
		
		int record =0;
		try {
			HttpSession session = request.getSession();
			//Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			// get checked grn values
			String[] servIds;
			if (grnId.length() > 0) {
				servIds = grnId.split(",");
				for (String id : servIds) {
					 
					PurchaseMaster obj = (PurchaseMaster) sessionFactory
							.getCurrentSession().get(PurchaseMaster.class,
									Integer.parseInt(id));
					
					obj.setDispatchflag("Y");
					obj.setDispatchunitId(unitId);
					obj.setDispatchGDate(new java.util.Date(new java.util.Date().getTime()));
				}
			}
			
			record =1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return record;
	}
//changed by Akshata
	@Override
	public int getidTaxmaster(double gstper) {
		Integer a=0;
		try {	
			Query taxid = sessionFactory.getCurrentSession().createQuery(
					"select distinct taxId from TaxMaster where taxDeleteFlag=0 and taxRate="
							+ gstper);

			a =(Integer) taxid.uniqueResult();
			if(a == null){
				a=0;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return  a;
		}
		return  a;
	}

	@Override
	public int insertGStPer(double gstper) {
		int id=0;
		try {
			TaxMaster taxMaster=new TaxMaster();
			taxMaster.setTaxDeleteFlag(0);
			taxMaster.setTaxRate(gstper);
			taxMaster.setTaxName("GST "+ gstper);
			taxMaster.setTaxAddDate(new Date(new java.util.Date()
					.getTime()));
			taxMaster.setTaxUpdateDate(new Date(new java.util.Date()
					.getTime()));
			id = (Integer)sessionFactory.getCurrentSession().save(taxMaster);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return id;
	}

	@Override
	public List<PurchaseSlave> getBatchDetailsForPrint(Integer masterId) {
        List<PurchaseSlave> purchaseMasterSlaves = new ArrayList<PurchaseSlave>();
        try {
            SQLQuery query = sessionFactory
                    .openSession()
                    .createSQLQuery(
                            "select p_slave.pur_slave_batch_code, product.product_name,p_slave.pur_slave_batch_id from pharma_purchase_slave p_slave join pharma_product_master product ON p_slave.pur_slave_product_id = product.product_id where p_slave.pur_slave_master_id ='"+ masterId +"'");
          
            List<Object[]> rows = query.list();
            for (Object[] row : rows) {
            	PurchaseSlave purchaseSlave = new PurchaseSlave();

                BatchMaster batchMaster = new BatchMaster();
                if (row[0] != null)
                    batchMaster.setBatchCode(row[0].toString());
                
              
                if (row[2] != null)
                    batchMaster.setBatchId(Integer.parseInt(row[2].toString()));
                
                purchaseSlave.setBatchMaster(batchMaster);

                ProductMaster productMaster = new ProductMaster();
                if (row[1] != null) {
                    productMaster.setProductName(row[1].toString());
                    purchaseSlave.setProductMaster(productMaster);
                } else {
                    productMaster.setProductName("");
                }
                purchaseSlave.setProductMaster(productMaster);
                purchaseMasterSlaves.add(purchaseSlave);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return purchaseMasterSlaves;
	}
	
	//added by vishant to fetch without expiry all batch
		@SuppressWarnings("unchecked")
		@Override
		public List<PurchaseHistory2> getBatchDetailsWithoutExpiry(Integer productId,
				String storeId) {
			Object storeName = new Object();
			
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM/yy");
			LocalDate localDate = LocalDate.now();
			System.out.println(dtf.format(localDate));

			try {
				Query query = sessionFactory.getCurrentSession().createQuery(
						"SELECT storeName FROM SubStoreMaster where storeId='"
								+ storeId + "'");
				storeName = query.uniqueResult();
			} catch (Exception e) {
				e.printStackTrace();
			}
			List<PurchaseHistory2> purchaseHistories = new ArrayList<PurchaseHistory2>();
			SQLQuery query=null; 
			try {
				if (storeName == null || storeName.toString().isEmpty()) {
					query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_without_expiry_batch_details_by_product_id(:p_product_id)");
				query.setParameter("p_product_id", productId);
				}else {
					query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_to_get_batch_details_by_product_id_and_store_name2(:p_product_id,:p_store_name,:p_store_table)");
					query.setParameter("p_product_id", productId);
					query.setParameter("p_store_name", "store_name");
					query.setParameter("p_store_table","pharma_"+storeName.toString()+"_stock_master");
			}
				
				query.setResultTransformer(Transformers.aliasToBean(PurchaseHistory2.class));
				purchaseHistories = query.list();
				} catch (Exception e) {
				e.printStackTrace();
			}
			
			
			return purchaseHistories;
		}
		
		
		@SuppressWarnings("unchecked")
		@Override
		public List<PurchaseHistory2> getBatchDetailsForOpeningStockWithoutExpiry(
				Integer productId, String storeId) {

			String strQuery = "";
			Object storeName = new Object();

			try {
				Query query = sessionFactory.getCurrentSession().createQuery(
						"SELECT storeName FROM SubStoreMaster where storeId='"
								+ storeId + "'");
				storeName = query.uniqueResult();
			} catch (Exception e) {
				e.printStackTrace();
			}
			List<PurchaseHistory2> purchaseHistories = new ArrayList<PurchaseHistory2>();
			Query query=null; 
			try {
				if (storeName == null || storeName.toString().isEmpty()) {
					query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_product_opening_stock_without_expiry_by_product_id(:p_batch_id)");
				query.setParameter("p_batch_id", productId);
				}else {
					query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_product_barcode_opening_stock_by_batch_id_store_name(:p_batch_id,:p_store_name)");
					query.setParameter("p_batch_id", productId);
					query.setParameter("p_store_name", storeName.toString());
				}
				
				query.setResultTransformer(Transformers.aliasToBean(PurchaseHistory2.class));
				purchaseHistories = query.list();
				} catch (Exception e) {
				e.printStackTrace();
			}
			return purchaseHistories;
		}
		
		//added by vishant for total stock without expiry
		@Override
		public String getTotalStockWithoutExpiry(Integer productId) {
			String totalStock ="";
			int result=getProductStockFromEcogreen(productId);
			
			totalStock=Integer.toString(result);
			/*String totalStock ="";
			//opening Stock
			try {
				SQLQuery totalStockQuery = sessionFactory
						.getCurrentSession()
						.createSQLQuery("SELECT ifnull(sum(stock_qty_in_hand),0) FROM pharma_batch_master batch " 
							         +" INNER JOIN pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id WHERE "
							         +" batch.batch_delete_flag = 0 AND DATE(LAST_DAY(batch_exp_date_timestamp)) >=CURDATE() "
							         +" AND stock.stock_qty_in_hand > 0 and batch.batch_product_id = "+productId);
							       
							             
							          
							          
							           
							            
				Object totalStockResult = (Object) totalStockQuery.uniqueResult();

				if (totalStockResult.toString() != null) {
					totalStock =totalStockResult.toString();
				} else {
					totalStock = 0+"";
				}
			} catch (Exception e) {
				e.printStackTrace();
			}*/		
			return totalStock;
		}

		@Override
		public Integer getProductPrescriptionId(Integer productId) {
			// TODO Auto-generated method stub
			Integer result = 0;

			try {
				
				String sql = "select product_prescription from pharma_product_master where product_id="+productId;
				SQLQuery sqlresult = sessionFactory.getCurrentSession().createSQLQuery(sql);
				result = ((Number) sqlresult.uniqueResult()).intValue();
				
			} catch (Exception e) {
				e.printStackTrace();
			}		

			return result;
		}		
		//added by Annapurna for back to list correction rate
		@Override
		public  List<PurchaseRateHistory> getCorrectionRateBackToList(Integer unitId ,HttpServletRequest request) {
			List<PurchaseRateHistory> correctionRateList = new ArrayList<PurchaseRateHistory>();
			SQLQuery query = null;

			try {
				
				Query query1= sessionFactory.getCurrentSession().createSQLQuery("SELECT product.product_id AS productId,product.product_name AS productName,pur_rate.batch_id AS batchId,pur_batch.batch_code AS batchCode,pur_rate.rate AS rate,pur_rate.bill_rate AS billRate,pur_rate.mrp AS mrp,pur_rate.pur_rate AS purRate,pur_rate.update_date AS updateDate,pur_cor.pur_cor_BatchId AS purCorBatchId,pur_batch.batch_code AS oldBatchCode,pur_cor.pur_purchase_rate AS oldRate,pur_cor.pur_bill_rate AS purBillRate,pur_cor.pur_cor_mrp AS purCorMrp,pur_cor.pur_purchase_rate AS oldPurRate,pur_cor.pur_cor_date AS purCorDate FROM pharma_purchase_rate pur_rate INNER JOIN pharma_purchase_correction pur_cor ON pur_cor.pur_cor_BatchId = pur_rate.batch_id INNER JOIN pharma_batch_master pur_batch ON pur_batch.batch_id = pur_rate.batch_id INNER JOIN pharma_product_master product ON product.product_id = pur_batch.batch_product_id  group BY pur_rate.batch_id   ORDER BY pur_rate.pur_rate_id desc");
				query1.setResultTransformer(Transformers.aliasToBean(PurchaseRateHistory.class));
				correctionRateList = query1.list();
				}
			catch (Exception e) {
				e.printStackTrace();
			}
			return correctionRateList; 	
}

		@Override
		public PurchaseRateHistory getDataById(Integer unitId,Integer productId , HttpServletRequest request) {
			PurchaseRateHistory lstById = new PurchaseRateHistory();			

			try {
				
				Query query1= sessionFactory.getCurrentSession().createSQLQuery("SELECT product.product_id AS productId,   product.product_name AS productName,pur_rate.batch_id AS batchId,    pur_batch.batch_code AS batchCode,    pur_rate.rate AS rate,pur_rate.bill_rate AS billRate,    pur_rate.mrp AS mrp,    pur_rate.pur_rate AS purRate,    pur_rate.update_date AS updateDate,pack .pack_type as  packType ,    comp.comp_name as compName ,shelf.shelf_name as shelfName , pur_batch.batch_exp_date as batchExpDate,pur_rate.unit_id as unitId  FROM pharma_purchase_rate pur_rate INNER JOIN pharma_purchase_correction pur_cor ON pur_cor.pur_cor_BatchId = pur_rate.batch_id INNER JOIN pharma_batch_master pur_batch ON pur_batch.batch_id = pur_rate.batch_id INNER JOIN pharma_product_master product ON product.product_id = pur_batch.batch_product_id INNER JOIN pharma_packing_master pack ON  pack.pack_id=product.product_pack_id INNER JOIN pharma_company_master comp ON  comp.comp_id=product.product_comp_id  INNER JOIN pharma_shelf_master shelf ON  shelf.shelf_id=product.product_shelf_id where  product.product_delete_flag=0  and product.product_id="+productId+" ");
				query1.setResultTransformer(Transformers.aliasToBean(PurchaseRateHistory.class));
				lstById =(PurchaseRateHistory) query1.uniqueResult();
				/*
				List<PurchaseRateHistory>obj1=new ArrayList<PurchaseRateHistory>();

				try {						
					Query query1= sessionFactory.getCurrentSession().createSQLQuery("SELECT product.product_id AS productId,   product.product_name AS productName,pur_rate.batch_id AS batchId,    pur_batch.batch_code AS batchCode,    pur_rate.rate AS rate,pur_rate.bill_rate AS billRate,    pur_rate.mrp AS mrp,    pur_rate.pur_rate AS purRate,    pur_rate.update_date AS updateDate,pack .pack_type as  packType ,    comp.comp_name as compName ,shelf.shelf_name as shelfName , pur_batch.batch_exp_date as batchExpDate,pur_rate.unit_id as unitId  FROM pharma_purchase_rate pur_rate INNER JOIN pharma_purchase_correction pur_cor ON pur_cor.pur_cor_BatchId = pur_rate.batch_id INNER JOIN pharma_batch_master pur_batch ON pur_batch.batch_id = pur_rate.batch_id INNER JOIN pharma_product_master product ON product.product_id = pur_batch.batch_product_id INNER JOIN pharma_packing_master pack ON  pack.pack_id=product.product_pack_id INNER JOIN pharma_company_master comp ON  comp.comp_id=product.product_comp_id  INNER JOIN pharma_shelf_master shelf ON  shelf.shelf_id=product.product_shelf_id where  product.product_delete_flag=0  and product.product_id="+productId+" ");
					query1.setResultTransformer(Transformers.aliasToBean(PurchaseRateHistory.class));
					obj1 = (List<PurchaseRateHistory>) query1.uniqueResult();
					List<Object[]> list = query1.list();
					for (Object[] rs : list) {
					PurchaseRateHistory obj = new PurchaseRateHistory();
					if(rs[0]!=null)
						obj.setProductId(Integer.parseInt(rs[0].toString()));
					if(rs[0]!=null)
						obj.setProductName(rs[0].toString());
					if(rs[1]!=null)
						obj.setUnitId(Integer.parseInt(rs[1].toString()));
					if(rs[2]!=null)
						obj.setPackType(rs[2].toString());
					if(rs[3]!=null)
						obj.setCompName(rs[3].toString());
					if(rs[4]!=null)
						obj.setShelfName(rs[4].toString());
					if(rs[5]!=null)
						obj.setBatchCode(rs[5].toString());
					if(rs[6]!=null)
						obj.setRate(Double.parseDouble(rs[6].toString()));
					if(rs[7]!=null)
						obj.setBillRate(Double.parseDouble(rs[7].toString()));
					if(rs[8]!=null)
						obj.setMrp(Double.parseDouble(rs[8].toString()));
					if(rs[9]!=null)
						obj.setPurRate(Double.parseDouble(rs[9].toString()));
					if(rs[10]!=null)
						obj.setOldPurRate(Double.parseDouble(rs[10].toString()));
					if(rs[11]!=null)
						obj.setPurBillRate(Double.parseDouble(rs[11].toString()));
					if(rs[12]!=null)
						obj.setPurCorMrp(Double.parseDouble(rs[12].toString()));
					if(rs[13]!=null)
						obj.setPurBillRate(Double.parseDouble(rs[13].toString()));
					//if(rs[13]!=null)
					//obj.setPurBillRate(Double.parseDouble(rs[13].toString()));
					 
					 
					}*/

				}
			catch (Exception e) {
				e.printStackTrace();
			}
			return lstById; 	
		}
		
		@Override
		public List<PurchaseRateHistory> autoSuggestionProduct(String letter,Integer unitId) {

			List<PurchaseRateHistory> searchProductList = new ArrayList<PurchaseRateHistory>();
			
			String	sql="select prod.product_name as productName , prod.product_id as productId from pharma_purchase_rate rate left join pharma_product_master prod on prod.product_batch=rate.batch_id where (prod.product_name like '%"+letter+"%' ) and prod.product_delete_flag='0'";


			try {
				Session session =sessionFactory.getCurrentSession();
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Transformers.aliasToBean(PurchaseRateHistory.class));
				searchProductList = query.list();
	 
				}		
			 catch (Exception e) {
				e.printStackTrace();
				return searchProductList;
			}
			return searchProductList;

		}

		@Override
		public List<PurchaseRateHistory> getCorrectionRateDetail(Integer productId, Integer unitId) {
			List<PurchaseRateHistory> lstObj = new ArrayList<PurchaseRateHistory>();
		
		String	sql="SELECT product.product_id AS productId,product.product_name AS productName,pur_rate.batch_id AS batchId,pur_batch.batch_code AS batchCode,pur_rate.rate AS rate,pur_rate.bill_rate AS billRate,pur_rate.mrp AS mrp,pur_rate.pur_rate AS purRate,pur_rate.update_date AS updateDate,pur_cor.pur_cor_BatchId AS purCorBatchId,pur_batch.batch_code AS oldBatchCode,pur_cor.pur_purchase_rate AS oldRate,pur_cor.pur_bill_rate AS purBillRate,pur_cor.pur_cor_mrp AS purCorMrp,pur_cor.pur_purchase_rate AS oldPurRate,pur_cor.pur_cor_date AS purCorDate FROM pharma_purchase_rate pur_rate INNER JOIN pharma_purchase_correction pur_cor ON pur_cor.pur_cor_BatchId = pur_rate.batch_id INNER JOIN pharma_batch_master pur_batch ON pur_batch.batch_id = pur_rate.batch_id INNER JOIN pharma_product_master product ON product.product_id = pur_batch.batch_product_id  where product.product_id="+productId+" ";
		try {
			
			 
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			List<Object[]> list = query.list();
			for (Object[] rs : list) {
				PurchaseRateHistory obj = new PurchaseRateHistory();
				if(rs[0]!=null)
					obj.setProductName(rs[0].toString());
				if(rs[1]!=null)
					obj.setBatchCode(rs[1].toString());
				if(rs[2]!=null)
					obj.setRate(Double.parseDouble(rs[2].toString()));
				if(rs[3]!=null)
					obj.setBillRate(Double.parseDouble(rs[3].toString()));
				if(rs[4]!=null)
					obj.setMrp(Double.parseDouble(rs[4].toString()));
				if(rs[5]!=null)
					obj.setPurRate(Double.parseDouble(rs[5].toString()));
				if(rs[6]!=null)
					obj.setOldPurRate(Double.parseDouble(rs[6].toString()));
				if(rs[7]!=null)
					obj.setPurBillRate(Double.parseDouble(rs[7].toString()));
				if(rs[8]!=null)
					obj.setPurCorMrp(Double.parseDouble(rs[8].toString()));
				if(rs[9]!=null)
					obj.setPurBillRate(Double.parseDouble(rs[8].toString()));
				/*	 SimpleDateFormat dateFormat= new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
				 String startDate = dateFormat.format(obj.getUpdateDate());
				if(rs[9]!=null)
					obj.setUpdateDate("startDate");
				lstObj.add(obj); */ 
 
			}
		}
		 catch (Exception e) {
			e.printStackTrace();
			return lstObj;
		}
		return lstObj;

	}
		
		int getProductStockFromEcogreen(int productID) {
           int result=0;
			
			ResourceBundle bundle = ResourceBundle.getBundle("ecogreenapi");
			String FETCH_STOCK = bundle.getObject("FETCH_STOCK").toString();
			 try {
				  
				 Session session=sessionFactory.openSession();
					Transaction tr=session.beginTransaction();
		    	    
		    	    
		    	    String sqlCode=" select ifnull(eco_item_code,'') as eco_item_code from pharma_product_master where product_id="+productID+" ";
		    	   SQLQuery qCode =session.createSQLQuery(sqlCode);
		    	     String itemCode =(String) qCode.uniqueResult();
				 
				 List<PharmaFetchSlaveStockDTO> list=new ArrayList<>();
				 PharmaFetchSlaveStockDTO obj=new PharmaFetchSlaveStockDTO();
				 obj.setItemCode(itemCode);
				  list.add(obj);
				  
				  PharmaFetchMasterStockDTO mobj=new PharmaFetchMasterStockDTO();
				  mobj.setItemDetails(list);
				  
				  ObjectMapper w=new ObjectMapper();
					 String s="";
					 String newS="";
					 try {
						 s=w.writeValueAsString(mobj);
						 newS="http_var_json="+s;
						
					} catch (JsonProcessingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

					System.out.println("Fetch Stock Request  ==============="+newS);
					
					 HttpHeaders headers = new HttpHeaders();
					 headers.setContentType(MediaType.APPLICATION_JSON);
					 headers.set("Content-Type", "application/x-www-form-urlencoded");
					 HttpEntity<String> entity = new HttpEntity<String>(newS,headers);
						// ResponseEntity<String> responseEntity = restTemplate.exchange("https://qa-eg-eco.livc.in/eco/lifenity/fetch/0/25", HttpMethod.POST, entity, String.class);
					 ResponseEntity<String> responseEntity = restTemplate.exchange(FETCH_STOCK, HttpMethod.POST,entity,String.class);
					   String res = responseEntity.getBody();
					   System.out.println("Response  ==============="+res);
					   
					   PharmaFetchStockResponseDTO objp =null;
					   PharmaFetchStockValidationMasterDTO vobj=null;
				         try {
				        	  //Object obres = w.readValue(res,Object.class);
				        	  //System.out.println("obres  ==============="+obres.toString());
				        	 
				        	  @SuppressWarnings("unchecked")
							Map<String, Object> jsonMap = w.readValue(res, Map.class);
				        	  String StatusCode = (String) jsonMap.get("StatusCode");
				        	  System.out.println("StatusCode  ==============="+StatusCode);
				        	  if(Integer.parseInt(StatusCode) == 400 ) {
				        		  PharmaFetchStockValidationMasterDTO vaobj = w.readValue(res,PharmaFetchStockValidationMasterDTO.class);
				        		  System.out.println("StatusCode  ==============="+vaobj.getStatus());
				        		 return 0;
				        	  }else if(Integer.parseInt(StatusCode) == 200 ) {
				        		  PharmaFetchStockResponseDTO vaobj = w.readValue(res,PharmaFetchStockResponseDTO.class);
				        		  System.out.println("StatusCode  ==============="+vaobj.getStatus());
				        		  System.out.println("stock ==="+vaobj.getItemdetails().get(0).getItemQtyDetyails().get(0).getTotalAvailableQuantity());
				        		  result= Integer.parseInt(vaobj.getItemdetails().get(0).getItemQtyDetyails().get(0).getTotalAvailableQuantity());
				        		  return result;
				        	  }
							
						} catch (JsonMappingException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (JsonProcessingException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
				         
				         
			 }catch (Exception e) {
				e.printStackTrace();
			}
			 return result ;
		
		}
		
}