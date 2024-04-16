package com.hms.pharmacy.dao.impl;

import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.mail.internet.PreencodedMimeBodyPart;
import javax.persistence.PrePersist;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.PlatformTransactionManager;

import com.hms.doctordesk.dto.RouteMaster;
import com.hms.ehat.dto.MarkVisitDto;
import com.hms.pharmacy.dao.EhatEnterpriseUtil;
import com.hms.pharmacy.dao.ProductDao;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DrugMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PatientPharmaDetails;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.pojo.PharmaProductView;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductByBatch;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.pojo.StrengthMaster;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.pojo.UomMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.utility.ApplicationContextUtils;

@Repository
public class ProductDaoImpl implements ProductDao {
	@Autowired
	SessionFactory sessionFactory;

	//@Autowired
	//EhatEnterpriseUtil ehatEnterpriseUtil;
	
	PlatformTransactionManager transactionManager =null;
	
	public void setTransactionManager(
			PlatformTransactionManager transactionManager) {
		this.transactionManager = transactionManager;
	}

	@Override
	public List<ProductMaster> getProducts() {
		List<ProductMaster> productMasters = null;
		/*
		 * try { Criteria criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(ProductMaster.class);
		 * criteria.add(Restrictions.eq("productDeleteFlag", 0));
		 * criteria.addOrder(Order.desc("productId"));
		 * criteria.setMaxResults(10); productMasters = criteria.list();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return productMasters; }
		 * return productMasters;
		 */

		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class)
					.createAlias("packingMaster", "packingMaster")
					.createAlias("companyMaster", "companyMaster")
					.createAlias("drugMaster", "drugMaster")
					.createAlias("shelfMaster", "shelfMaster")
					.createAlias("categoryMaster", "categoryMaster")
					.createAlias("uomMaster", "uomMaster")
					.createAlias("preparationMaster", "preparationMaster")
					.createAlias("strengthMaster", "strengthMaster")
					.createAlias("taxMaster", "taxMaster");
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			criteria.addOrder(Order.desc("productId"));
			criteria.setMaxResults(10);
			ProjectionList proList = Projections.projectionList();

			proList.add(Projections.property("productName"));
			proList.add(Projections.property("productId"));
			proList.add(Projections.property("productShortName"));
			proList.add(Projections.property("companyMaster.compName"));
			proList.add(Projections.property("packingMaster.packType"));
			proList.add(Projections.property("categoryMaster.catName"));
			proList.add(Projections.property("uomMaster.uomName"));
			proList.add(Projections.property("drugMaster.drugName"));
			proList.add(Projections.property("shelfMaster.shelfName"));
			proList.add(Projections.property("productUnit"));
			proList.add(Projections.property("productShortList"));
			proList.add(Projections.property("productSaleDisc"));
			proList.add(Projections.property("productBillingMust"));
			proList.add(Projections.property("productH1"));
			proList.add(Projections.property("rateEqualsMrp"));			
			proList.add(Projections.property("productNrx"));
			proList.add(Projections.property("productBatch"));
			proList.add(Projections.property("productMinLevel"));
			proList.add(Projections.property("productMaxLevel"));
			proList.add(Projections.property("productDesc"));
			proList.add(Projections.property("productPhotoUrl"));
			proList.add(Projections.property("productMarginRate"));
			proList.add(Projections.property("productFixDiscount"));
			proList.add(Projections.property("productScheme1"));
			proList.add(Projections.property("productScheme1Qty"));
			proList.add(Projections.property("productScheme2"));
			proList.add(Projections.property("productScheme2Qty"));
			proList.add(Projections.property("productScheme3"));
			proList.add(Projections.property("productScheme3Qty"));
			proList.add(Projections.property("companyMaster.compId"));
			proList.add(Projections.property("packingMaster.packId"));
			proList.add(Projections.property("categoryMaster.catId"));
			proList.add(Projections.property("uomMaster.uomId"));
			proList.add(Projections.property("drugMaster.drugId"));
			proList.add(Projections.property("shelfMaster.shelfId"));
			proList.add(Projections
					.property("preparationMaster.preparationName"));
			proList.add(Projections.property("strengthMaster.strengthName"));
			proList.add(Projections.property("preparationMaster.preparationId"));
			
			proList.add(Projections.property("strengthMaster.strengthId"));
			proList.add(Projections.property("productX"));
			proList.add(Projections.property("productNdps"));
			proList.add(Projections.property("productPrescription"));
			proList.add(Projections.property("cathlabFlag"));
			proList.add(Projections.property("hsn"));
			proList.add(Projections.property("taxMaster.taxId"));
			proList.add(Projections.property("nutracalProduct"));

			criteria.setProjection(proList);

			@SuppressWarnings("unchecked")
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					ProductMaster productMaster = new ProductMaster();

					if (master[1] != null)
						productMaster.setProductId(Integer.parseInt(master[1]
								.toString()));
					/*
					 * else productMaster.setProductId(0);
					 */

					if (master[0] != null)
						productMaster.setProductName(master[0].toString());
					else
						productMaster.setProductName("");

					if (master[2] != null)
						productMaster.setProductShortName(master[2].toString());
					else
						productMaster.setProductShortName("");

					CompanyMaster companyMaster = new CompanyMaster();
					if (master[3] != null)
						companyMaster.setCompName(master[3].toString());
					else
						companyMaster.setCompName("");

					PackingMaster packingMaster = new PackingMaster();
					if (master[4] != null)
						packingMaster.setPackType(master[4].toString());
					else
						packingMaster.setPackType("");

					CategoryMaster categoryMaster = new CategoryMaster();
					if (master[5] != null)
						categoryMaster.setCatName(master[5].toString());
					else
						categoryMaster.setCatName("");

					UomMaster uomMaster = new UomMaster();
					if (master[6] != null)
						uomMaster.setUomName(master[6].toString());
					else
						uomMaster.setUomName("");

					DrugMaster drugMaster = new DrugMaster();
					if (master[7] != null)
						drugMaster.setDrugName(master[7].toString());
					else
						drugMaster.setDrugName("");

					ShelfMaster shelfMaster = new ShelfMaster();
					if (master[7] != null)
						shelfMaster.setShelfName(master[8].toString());
					else
						shelfMaster.setShelfName("");

					productMaster.setCompanyMaster(companyMaster);
					productMaster.setPackingMaster(packingMaster);
					productMaster.setCategoryMaster(categoryMaster);
					productMaster.setUomMaster(uomMaster);
					productMaster.setDrugMaster(drugMaster);
					productMaster.setShelfMaster(shelfMaster);

					if (master[9] != null)
						productMaster.setProductUnit(Double
								.parseDouble(master[9].toString()));
					/*
					 * else
					 * productMaster.setProductUnit(0.0);
					 */

					if (master[10] != null)
						productMaster.setProductShortList(Integer
								.parseInt(master[10].toString()));
					else
						productMaster
								.setProductShortList(Integer.parseInt("0"));

					if (master[11] != null)
						productMaster.setProductSaleDisc(Integer
								.parseInt(master[11].toString()));
					else
						productMaster.setProductSaleDisc(Integer.parseInt("0"));

					if (master[12] != null)
						productMaster.setProductBillingMust(Integer
								.parseInt(master[12].toString()));
					else
						productMaster.setProductBillingMust(Integer
								.parseInt("0"));

					if (master[13] != null)
						productMaster.setProductH1(Integer.parseInt(master[13]
								.toString()));
					else
						productMaster.setProductH1(Integer.parseInt("0"));

					if (master[14] != null)
						productMaster.setRateEqualsMrp(Integer
								.parseInt(master[14].toString()));
					else
						productMaster.setRateEqualsMrp(Integer.parseInt("0"));

					if (master[15] != null)
						productMaster.setProductNrx(Integer.parseInt(master[15]
								.toString()));
					else
						productMaster.setProductNrx(Integer.parseInt("0"));

					if (master[16] != null)
						productMaster.setProductBatch(Integer
								.parseInt(master[16].toString()));
					else
						productMaster.setProductBatch(Integer.parseInt("0"));

					if (master[17] != null)
						productMaster.setProductMinLevel(Integer
								.parseInt(master[17].toString()));
					/*
					 * else
					 * productMaster.setProductMinLevel(0);
					 */

					if (master[18] != null)
						productMaster.setProductMaxLevel(Integer
								.parseInt(master[18].toString()));
					/*
					 * else
					 * productMaster.setProductMaxLevel(0);
					 */

					if (master[19] != null)
						productMaster.setProductDesc(master[19].toString());
					else
						productMaster.setProductDesc("");

					if (master[20] != null)
						productMaster.setProductPhotoUrl(master[20].toString());
					else
						productMaster.setProductPhotoUrl("");

					if (master[21] != null)
						productMaster.setProductMarginRate(Double
								.parseDouble(master[21].toString()));
					else
						productMaster.setProductMarginRate(Double
								.parseDouble("0"));

					if (master[22] != null)
						productMaster.setProductFixDiscount(Double
								.parseDouble(master[22].toString()));
					else
						productMaster.setProductFixDiscount(Double
								.parseDouble("0"));

					if (master[23] != null)
						productMaster.setProductScheme1(Double
								.parseDouble(master[23].toString()));
					else
						productMaster
								.setProductScheme1(Double.parseDouble("0"));

					if (master[24] != null)
						productMaster.setProductScheme1Qty(Double
								.parseDouble(master[24].toString()));
					else
						productMaster.setProductScheme1Qty(Double
								.parseDouble("0"));

					if (master[25] != null)
						productMaster.setProductScheme2(Double
								.parseDouble(master[25].toString()));
					else
						productMaster
								.setProductScheme2(Double.parseDouble("0"));

					if (master[26] != null)
						productMaster.setProductScheme2Qty(Double
								.parseDouble(master[26].toString()));
					else
						productMaster.setProductScheme2Qty(Double
								.parseDouble("0"));

					if (master[27] != null)
						productMaster.setProductScheme3(Double
								.parseDouble(master[27].toString()));
					else
						productMaster
								.setProductScheme3(Double.parseDouble("0"));

					if (master[28] != null)
						productMaster.setProductScheme3Qty(Double
								.parseDouble(master[28].toString()));
					else
						productMaster.setProductScheme3Qty(Double
								.parseDouble("0"));

					if (master[29] != null)
						productMaster.getCompanyMaster().setCompId(
								Integer.parseInt(master[29].toString()));

					if (master[30] != null)
						productMaster.getPackingMaster().setPackId(
								Integer.parseInt(master[30].toString()));

					if (master[31] != null)
						productMaster.getCategoryMaster().setCatId(
								Integer.parseInt(master[31].toString()));

					if (master[32] != null)
						productMaster.getUomMaster().setUomId(
								Integer.parseInt(master[32].toString()));

					if (master[33] != null)
						productMaster.getDrugMaster().setDrugId(
								Integer.parseInt(master[33].toString()));

					if (master[34] != null)
						productMaster.getShelfMaster().setShelfId(
								Integer.parseInt(master[34].toString()));

					PreparationMaster preparationMaster = new PreparationMaster();
					if (master[35] != null)
						preparationMaster.setPreparationName(master[35]
								.toString());
					else
						preparationMaster.setPreparationName("");

					StrengthMaster strengthMaster = new StrengthMaster();
					/*
					 * if (master[36] != null)
					 * strengthMaster.setStrengthName(master[36].toString());
					 * else strengthMaster.setStrengthName("");
					 */

					if (master[37] != null)
						preparationMaster.setPreparationId(Integer
								.parseInt(master[37].toString()));
					else
						preparationMaster
								.setPreparationId(0);

					
					if (Integer.parseInt(master[38].toString()) == 1) {
						strengthMaster.setStrengthId(Integer
								.parseInt(master[38].toString()));

						strengthMaster.setStrengthName(master[36].toString());
					} 
					else if (Integer.parseInt(master[38].toString()) != 1) {
						strengthMaster.setStrengthId(Integer
								.parseInt(master[38].toString()));

						strengthMaster.setStrengthName(master[36].toString());
					} else {
						strengthMaster.setStrengthId((1));
						strengthMaster.setStrengthName("");
					}

					if (master[39] != null)
						productMaster.setProductX(Integer.parseInt(master[39]
								.toString()));
					else
						productMaster.setProductX(Integer.parseInt("0"));

					if (master[40] != null)
						productMaster.setProductNdps(Integer
								.parseInt(master[40].toString()));
					else
						productMaster.setProductNdps(Integer.parseInt("0"));

					if (master[41] != null)
						productMaster.setProductPrescription(Integer
								.parseInt(master[41].toString()));
					else
						productMaster.setProductPrescription(Integer.parseInt("0"));
					
					if (master[42] != null)
						productMaster.setCathlapFlag(Integer
								.parseInt(master[42].toString()));
					else
						productMaster.setCathlapFlag(0);
					
					if (master[43] != null)
						productMaster.setHsn(master[43].toString());
					else
						productMaster.setHsn("");
					
					TaxMaster txt=new TaxMaster();
					
					if (master[44] != null)
						txt.setTaxId(Integer.parseInt(master[44].toString()));
					else
						txt.setTaxId(Integer.parseInt(("0").toString()));
					
					if (master[45] != null)
						productMaster.setNutracalProduct(Integer.parseInt(master[45].toString()));
					else
						productMaster.setNutracalProduct(Integer.parseInt(("0").toString()));
					
					productMaster.setTaxMaster(txt);
					productMaster.setPreparationMaster(preparationMaster);
					productMaster.setStrengthMaster(strengthMaster);

					/*List<TaxMaster> taxMasters = getTaxByProductId(Integer
							.parseInt(master[1].toString()));*/
				

					List<VendorMaster> vendorMastersMasters = getVendorByProductId(Integer
							.parseInt(master[1].toString()));
					//productMaster.setTaxMaster(taxMasters);
					productMaster.setVendorMasters(vendorMastersMasters);

					ltProductMaster.add(productMaster);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltProductMaster;
		}
		return ltProductMaster;
	}

	public List<TaxMaster> getTaxByProductId(int productId) {
		List<TaxMaster> taxMasters = new ArrayList<TaxMaster>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT tax.tax_id, tax.tax_name FROM pharma_tax_master tax WHERE tax.tax_id IN ((SELECT tax_id FROM pharma_product_tax_relation WHERE product_id = "
									+ productId
									+ " ) , (SELECT  tax_id1  FROM  pharma_product_tax_relation1 WHERE product_id = "
									+ productId + "))");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				TaxMaster taxMaster = new TaxMaster();
				if (row[0] != null)
					taxMaster.setTaxId(Integer.parseInt(row[0].toString()));
				else
					taxMaster.setTaxId(Integer.parseInt(("")));

				if (row[1] != null)
					taxMaster.setTaxName((row[1].toString()));
				else
					taxMaster.setTaxName("");

				taxMasters.add(taxMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return taxMasters;
		}
		return taxMasters;
	}

	public List<VendorMaster> getVendorByProductId(int productId) {
		List<VendorMaster> vendorMasters = new ArrayList<VendorMaster>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select vendor.vendor_id, vendor.vendor_name from pharma_product_vendor_relation product_vendor inner join pharma_vendor_master vendor ON product_vendor.vendor_id= vendor.vendor_id where product_vendor.product_id ="
									+ productId);

			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				VendorMaster vendorMaster = new VendorMaster();
				if (row[0] != null)
					vendorMaster
							.setVendorId(Integer.parseInt(row[0].toString()));
				else
					vendorMaster.setVendorId(Integer.parseInt(("")));

				if (row[1] != null)
					vendorMaster.setVendorName((row[1].toString()));
				else
					vendorMaster.setVendorName("");

				vendorMasters.add(vendorMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return vendorMasters;
		}
		return vendorMasters;
	}

	@Override
	public boolean saveProduct(ProductMaster productMaster) {
		try {
			
			if(productMaster.getHsn().equalsIgnoreCase("")){
				productMaster.setHsn(1+"");
			}
			
			System.err.println("hsn =========" +productMaster.getHsn());
			
			sessionFactory.getCurrentSession().saveOrUpdate(productMaster);

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean deleteProduct(Integer productId, Integer id) {
		/*
		 * try { ProductMaster productMaster = (ProductMaster) sessionFactory
		 * .getCurrentSession().get(ProductMaster.class, productId);
		 * productMaster.setProductDeleteFlag(1); } catch (Exception e) {
		 * e.printStackTrace(); return false; } return true;
		 */

		try {

			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createSQLQuery(
							"update pharma_product_master set  product_delete_flag=1,product_deleted_by='"
									+ id + "' where product_id=" + productId);
			int rowDeleted = query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<ProductMaster> getProductById(Integer productId) {
		/*
		 * List<ProductMaster> productMasters = null; try { Criteria criteria =
		 * sessionFactory.getCurrentSession()
		 * .createCriteria(ProductMaster.class);
		 * criteria.add(Restrictions.eq("productDeleteFlag", 0)); if (productId
		 * != 0) { criteria.add(Restrictions.eq("productId", productId)); }
		 * 
		 * productMasters = criteria.list();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return productMasters; }
		 * return productMasters;
		 */

		List<ProductMaster> productMasters = null;
		/*
		 * try { Criteria criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(ProductMaster.class);
		 * criteria.add(Restrictions.eq("productDeleteFlag", 0));
		 * criteria.addOrder(Order.desc("productId"));
		 * criteria.setMaxResults(10); productMasters = criteria.list();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return productMasters; }
		 * return productMasters;
		 */

		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class)
					.createAlias("packingMaster", "packingMaster")
					.createAlias("companyMaster", "companyMaster")
					.createAlias("drugMaster", "drugMaster")
					.createAlias("shelfMaster", "shelfMaster")
					.createAlias("categoryMaster", "categoryMaster")
					.createAlias("uomMaster", "uomMaster")
					.createAlias("preparationMaster", "preparationMaster")
					.createAlias("strengthMaster", "strengthMaster")
					.createAlias("taxMaster", "taxMaster");;
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			if (productId != 0) {
				criteria.add(Restrictions.eq("productId", productId));
			}

			ProjectionList proList = Projections.projectionList();

			proList.add(Projections.property("productName"));
			proList.add(Projections.property("productId"));
			proList.add(Projections.property("productShortName"));
			proList.add(Projections.property("companyMaster.compName"));
			proList.add(Projections.property("packingMaster.packType"));
			proList.add(Projections.property("categoryMaster.catName"));
			proList.add(Projections.property("uomMaster.uomName"));
			proList.add(Projections.property("drugMaster.drugName"));
			proList.add(Projections.property("shelfMaster.shelfName"));
			proList.add(Projections.property("productUnit"));
			proList.add(Projections.property("productShortList"));
			proList.add(Projections.property("productSaleDisc"));
			proList.add(Projections.property("productBillingMust"));
			proList.add(Projections.property("productH1"));
			proList.add(Projections.property("rateEqualsMrp"));
			proList.add(Projections.property("productNrx"));
			proList.add(Projections.property("productBatch"));
			proList.add(Projections.property("productMinLevel"));
			proList.add(Projections.property("productMaxLevel"));
			proList.add(Projections.property("productDesc"));
			proList.add(Projections.property("productPhotoUrl"));
			proList.add(Projections.property("productMarginRate"));
			proList.add(Projections.property("productFixDiscount"));
			proList.add(Projections.property("productScheme1"));
			proList.add(Projections.property("productScheme1Qty"));
			proList.add(Projections.property("productScheme2"));
			proList.add(Projections.property("productScheme2Qty"));
			proList.add(Projections.property("productScheme3"));
			proList.add(Projections.property("productScheme3Qty"));
			proList.add(Projections.property("companyMaster.compId"));
			proList.add(Projections.property("packingMaster.packId"));
			proList.add(Projections.property("categoryMaster.catId"));
			proList.add(Projections.property("uomMaster.uomId"));
			proList.add(Projections.property("drugMaster.drugId"));
			proList.add(Projections.property("shelfMaster.shelfId"));
			proList.add(Projections
					.property("preparationMaster.preparationName"));
			proList.add(Projections.property("strengthMaster.strengthName"));
			proList.add(Projections.property("preparationMaster.preparationId"));
			proList.add(Projections.property("strengthMaster.strengthId"));
			proList.add(Projections.property("productX"));
			proList.add(Projections.property("productNdps"));
			proList.add(Projections.property("productPrescription"));
			proList.add(Projections.property("cathlabFlag"));
			proList.add(Projections.property("hsn"));
			proList.add(Projections.property("taxMaster.taxId"));
			proList.add(Projections.property("nutracalProduct"));
			criteria.setProjection(proList);

			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					ProductMaster productMaster = new ProductMaster();

					if (master[1] != null)
						productMaster.setProductId(Integer.parseInt(master[1]
								.toString()));
					/*
					 * else productMaster.setProductId(0);
					 */

					if (master[0] != null)
						productMaster.setProductName(master[0].toString());
					else
						productMaster.setProductName("");

					if (master[2] != null)
						productMaster.setProductShortName(master[2].toString());
					else
						productMaster.setProductShortName("");

					CompanyMaster companyMaster = new CompanyMaster();
					if (master[3] != null)
						companyMaster.setCompName(master[3].toString());
					else
						companyMaster.setCompName("");

					PackingMaster packingMaster = new PackingMaster();
					if (master[4] != null)
						packingMaster.setPackType(master[4].toString());
					else
						packingMaster.setPackType("");

					CategoryMaster categoryMaster = new CategoryMaster();
					if (master[5] != null)
						categoryMaster.setCatName(master[5].toString());
					else
						categoryMaster.setCatName("");

					UomMaster uomMaster = new UomMaster();
					if (master[6] != null)
						uomMaster.setUomName(master[6].toString());
					else
						uomMaster.setUomName("");

					DrugMaster drugMaster = new DrugMaster();
					if (master[7] != null)
						drugMaster.setDrugName(master[7].toString());
					else
						drugMaster.setDrugName("");

					ShelfMaster shelfMaster = new ShelfMaster();
					if (master[7] != null)
						shelfMaster.setShelfName(master[8].toString());
					else
						shelfMaster.setShelfName("");

					productMaster.setCompanyMaster(companyMaster);
					productMaster.setPackingMaster(packingMaster);
					productMaster.setCategoryMaster(categoryMaster);
					productMaster.setUomMaster(uomMaster);
					productMaster.setDrugMaster(drugMaster);
					productMaster.setShelfMaster(shelfMaster);

					if (master[9] != null)
						productMaster.setProductUnit(Double
								.parseDouble(master[9].toString()));
					/*
					 * else
					 * productMaster.setProductUnit(0.0);
					 */

					if (master[10] != null)
						productMaster.setProductShortList(Integer
								.parseInt(master[10].toString()));
					else
						productMaster
								.setProductShortList(Integer.parseInt("0"));

					if (master[11] != null)
						productMaster.setProductSaleDisc(Integer
								.parseInt(master[11].toString()));
					else
						productMaster.setProductSaleDisc(Integer.parseInt("0"));

					if (master[12] != null)
						productMaster.setProductBillingMust(Integer
								.parseInt(master[12].toString()));
					else
						productMaster.setProductBillingMust(Integer
								.parseInt("0"));

					if (master[13] != null)
						productMaster.setProductH1(Integer.parseInt(master[13]
								.toString()));
					else
						productMaster.setProductH1(Integer.parseInt("0"));

					if (master[14] != null)
						productMaster.setRateEqualsMrp(Integer
								.parseInt(master[14].toString()));
					else
						productMaster.setRateEqualsMrp(Integer.parseInt("0"));

					if (master[15] != null)
						productMaster.setProductNrx(Integer.parseInt(master[15]
								.toString()));
					else
						productMaster.setProductNrx(Integer.parseInt("0"));

					if (master[16] != null)
						productMaster.setProductBatch(Integer
								.parseInt(master[16].toString()));
					else
						productMaster.setProductBatch(Integer.parseInt("0"));

					if (master[17] != null)
						productMaster.setProductMinLevel(Integer
								.parseInt(master[17].toString()));
					/*
					 * else
					 * productMaster.setProductMinLevel(0);
					 */

					if (master[18] != null)
						productMaster.setProductMaxLevel(Integer
								.parseInt(master[18].toString()));
					/*
					 * else
					 * productMaster.setProductMaxLevel(0);
					 */

					if (master[19] != null)
						productMaster.setProductDesc(master[19].toString());
					else
						productMaster.setProductDesc("");

					if (master[20] != null)
						productMaster.setProductPhotoUrl(master[20].toString());
					else
						productMaster.setProductPhotoUrl("");

					if (master[21] != null)
						productMaster.setProductMarginRate(Double
								.parseDouble(master[21].toString()));
					else
						productMaster.setProductMarginRate(Double
								.parseDouble("0"));

					if (master[22] != null)
						productMaster.setProductFixDiscount(Double
								.parseDouble(master[22].toString()));
					else
						productMaster.setProductFixDiscount(Double
								.parseDouble("0"));

					if (master[23] != null)
						productMaster.setProductScheme1(Double
								.parseDouble(master[23].toString()));
					else
						productMaster
								.setProductScheme1(Double.parseDouble("0"));

					if (master[24] != null)
						productMaster.setProductScheme1Qty(Double
								.parseDouble(master[24].toString()));
					else
						productMaster.setProductScheme1Qty(Double
								.parseDouble("0"));

					if (master[25] != null)
						productMaster.setProductScheme2(Double
								.parseDouble(master[25].toString()));
					else
						productMaster
								.setProductScheme2(Double.parseDouble("0"));

					if (master[26] != null)
						productMaster.setProductScheme2Qty(Double
								.parseDouble(master[26].toString()));
					else
						productMaster.setProductScheme2Qty(Double
								.parseDouble("0"));

					if (master[27] != null)
						productMaster.setProductScheme3(Double
								.parseDouble(master[27].toString()));
					else
						productMaster
								.setProductScheme3(Double.parseDouble("0"));

					if (master[28] != null)
						productMaster.setProductScheme3Qty(Double
								.parseDouble(master[28].toString()));
					else
						productMaster.setProductScheme3Qty(Double
								.parseDouble("0"));

					if (master[29] != null)
						productMaster.getCompanyMaster().setCompId(
								Integer.parseInt(master[29].toString()));

					if (master[30] != null)
						productMaster.getPackingMaster().setPackId(
								Integer.parseInt(master[30].toString()));

					if (master[31] != null)
						productMaster.getCategoryMaster().setCatId(
								Integer.parseInt(master[31].toString()));

					if (master[32] != null)
						productMaster.getUomMaster().setUomId(
								Integer.parseInt(master[32].toString()));

					if (master[33] != null)
						productMaster.getDrugMaster().setDrugId(
								Integer.parseInt(master[33].toString()));

					if (master[34] != null)
						productMaster.getShelfMaster().setShelfId(
								Integer.parseInt(master[34].toString()));

					PreparationMaster preparationMaster = new PreparationMaster();
					if (master[35] != null)
						preparationMaster.setPreparationName(master[35]
								.toString());
					else
						preparationMaster.setPreparationName("");

					StrengthMaster strengthMaster = new StrengthMaster();
					if (master[36] != null)
						strengthMaster.setStrengthName(master[36].toString());
					else
						strengthMaster.setStrengthName("");

					if (master[37] != null)
						preparationMaster.setPreparationId(Integer
								.parseInt(master[37].toString()));
					else
						preparationMaster
								.setPreparationId(0);

					if (master[38] != null)
						strengthMaster.setStrengthId(Integer
								.parseInt(master[38].toString()));
					else
						strengthMaster.setStrengthId(0);

					productMaster.setPreparationMaster(preparationMaster);
					productMaster.setStrengthMaster(strengthMaster);

					if (master[39] != null)
						productMaster.setProductX(Integer.parseInt(master[39]
								.toString()));
					else
						productMaster.setProductX(Integer.parseInt("0"));

					if (master[40] != null)
						productMaster.setProductNdps(Integer
								.parseInt(master[40].toString()));
					else
						productMaster.setProductNdps(Integer.parseInt("0"));

					if (master[41] != null)
						productMaster.setProductPrescription(Integer
								.parseInt(master[41].toString()));
					else
						productMaster.setProductPrescription(Integer.parseInt("0"));
					
					
					if (master[42] != null)
						productMaster.setCathlapFlag(Integer
								.parseInt(master[42].toString()));
					else
						productMaster.setCathlapFlag(0);
					
					if (master[43] != null)
						productMaster.setHsn(master[43].toString());
					else
						productMaster.setHsn("");
					
					TaxMaster txt=new TaxMaster();
					
					if (master[44] != null)
						txt.setTaxId(Integer.parseInt(master[44].toString()));
					else
						txt.setTaxId(Integer.parseInt(("0").toString()));
					
					if (master[45] != null)
						productMaster.setNutracalProduct(Integer.parseInt(master[45].toString()));
					else
						productMaster.setNutracalProduct(Integer.parseInt(("0").toString()));
					
					productMaster.setTaxMaster(txt);
					
				/*	List<TaxMaster> taxMasters = getTaxByProductId(Integer
							.parseInt(master[1].toString()));*/

					List<VendorMaster> vendorMastersMasters = getVendorByProductId(Integer
							.parseInt(master[1].toString()));
				//	productMaster.setTaxMaster(taxMasters);
					productMaster.setVendorMasters(vendorMastersMasters);

					ltProductMaster.add(productMaster);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltProductMaster;
		}
		return ltProductMaster;
	}

	@Override
	public List<ProductMaster> getAutoSuggestionProduct(String letter) {
		// TODO Auto-generated method stub
		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		try {
			@SuppressWarnings("deprecation")
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class)
					.createAlias("packingMaster", "packingMaster")
					.createAlias("companyMaster", "companyMaster")
					.createAlias("shelfMaster", "shelfMaster")
					.createAlias("drugMaster", "drugMaster")
					.createAlias("taxMaster", "taxMaster")
					.createAlias("categoryMaster","categoryMaster")
					.createAlias("preparationMaster","preparationMaster")
					.createAlias("strengthMaster","strengthMaster");
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			//criteria.add(Restrictions.eq("cathlabFlag", 0));
			criteria.add(Restrictions.like("productName", letter,
					MatchMode.ANYWHERE));
			
			criteria.setMaxResults(50);

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("productName"));
			proList.add(Projections.property("packingMaster.packType"));
			proList.add(Projections.property("companyMaster.compName"));
			proList.add(Projections.property("shelfMaster.shelfName"));
			proList.add(Projections.property("productId"));
			proList.add(Projections.property("productUnit"));
			proList.add(Projections.property("drugMaster.drugName"));
			
			proList.add(Projections.property("productH1"));
			proList.add(Projections.property("productMinLevel"));
			proList.add(Projections.property("productPrescription"));
		//	
			proList.add(Projections.property("categoryMaster.catId"));
			// committed by akshata, 03 JAN 21
			//proList.add(Projections.groupProperty("productName"));
			
			proList.add(Projections.property("taxMaster.taxId"));
			proList.add(Projections.property("taxMaster.taxRate"));
			proList.add(Projections.property("preparationMaster.preparationName"));
			
			proList.add(Projections.property("strengthMaster.strengthName"));
			proList.add(Projections.property("preparationMaster.preparationId"));

			criteria.setProjection(proList);

			@SuppressWarnings("unchecked")
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					ProductMaster productMaster = new ProductMaster();
					productMaster.setProductName(master[0].toString());

					PackingMaster packingMaster = new PackingMaster();
					packingMaster.setPackType(master[1].toString());

					CompanyMaster companyMaster = new CompanyMaster();
					CategoryMaster categoryMaster=new CategoryMaster();
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

					DrugMaster drugMaster = new DrugMaster();
					drugMaster.setDrugName(master[6].toString());

					productMaster.setDrugMaster(drugMaster);

					if (master[7] != null && master[7] != "null") {
						productMaster.setProductH1(Integer.parseInt(master[7]
								.toString()));
					}
													
										
					if (master[8] != null && master[8] != "null") {
						productMaster.setProductMinLevel(Integer
								.parseInt(master[8].toString()));
					}else
						productMaster.setProductMinLevel(Integer
								.parseInt("0"));

					if (master[9] != null && master[9] != "null") {
						productMaster.setProductPrescription(Integer
								.parseInt(master[9].toString()));
					}

					if (master[10] != null && master[10] != "null")
					{
						categoryMaster.setCatId(Integer.parseInt((master[10].toString())));
					}
					
					productMaster.setCategoryMaster(categoryMaster);
					
					TaxMaster taxMaster=new TaxMaster();
					
					if (master[11] != null && master[11] != "null")
					{
						taxMaster.setTaxId(Integer.parseInt((master[11].toString())));
					}
					
					PreparationMaster preparationMaster=new PreparationMaster();
					if (master[13] != null && master[13] != "null")
					{
						preparationMaster.setPreparationName(master[13].toString());
					}
					
					StrengthMaster strengthMaster = new StrengthMaster();
					if (master[14] != null && master[14] != "null")
					{
						strengthMaster.setStrengthName(master[14].toString());
					}
					
					if (master[15] != null && master[15] != "null")
					{
						preparationMaster.setPreparationId(Integer
								.parseInt(master[15].toString()));
						
						//fetch rount name
						Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(RouteMaster.class);
						createCriteria.add(Restrictions.eq("preparation_id", preparationMaster.getPreparationId()));
						List<RouteMaster> uniqueResult = createCriteria.list();
					if(uniqueResult.size()>0) {	
						productMaster.setRouteName(uniqueResult.get(0).getRoutename());
					}
						
					}
					
					productMaster.setStrengthMaster(strengthMaster);
					productMaster.setPreparationMaster(preparationMaster);
					productMaster.setTaxMaster(taxMaster);
					
					ltProductMaster.add(productMaster);
				}
			}
			
		

		} catch (Exception e) {
			e.printStackTrace();
			return ltProductMaster;
		}
		return ltProductMaster;
	}

	@Override
	public List<ProductByBatch> autoSuggestionProductByBatch(Integer productId,
			String storeId) {

		String strQuery = "";
		Object storeName = new Object();

		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT store_name FROM pharma_sub_store_master where store_id='"
							+ storeId + "'");
			storeName = query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (storeName == null) {
			strQuery = "select batch.batch_code,batch.batch_exp_date,pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, pur_rate.bill_rate,slave.pur_slave_vat,slave.pur_slave_id,slave.pur_igst, slave.pur_cess, slave.pur_slave_scheme from pharma_purchase_slave slave inner join pharma_purchase_rate pur_rate on pur_rate.pur_slave_id=slave.pur_slave_id inner join pharma_batch_master batch on pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_purchase_master pm on pm.pur_id=slave.pur_slave_master_id where slave.pur_slave_product_id="
					+ productId
					+ " and batch.batch_product_id="
					+ productId
					+ " and batch.batch_delete_flag=0 and pm.pur_delete_flag = 0 order by batch_exp_date desc ";
		} else {
			strQuery = "select batch.batch_code,batch.batch_exp_date,pur_rate.mrp,pur_rate.rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, pur_rate.bill_rate,slave.pur_slave_vat,slave.pur_slave_id,slave.pur_igst, slave.pur_cess, slave.pur_slave_scheme from pharma_purchase_slave slave inner join pharma_purchase_rate pur_rate on pur_rate.pur_slave_id=slave.pur_slave_id inner join pharma_batch_master batch on pur_rate.batch_id = batch.batch_id inner join pharma_"
					+ storeName.toString()
					+ "_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_purchase_master pm on pm.pur_id=slave.pur_slave_master_id where slave.pur_slave_product_id="
					+ productId
					+ " and batch.batch_product_id="
					+ productId
					+ " and batch.batch_delete_flag=0 and pm.pur_delete_flag = 0 order by batch_exp_date desc ";
		}
		
		
		List<ProductByBatch> productByBatchs = new ArrayList<ProductByBatch>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					strQuery);
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				ProductByBatch productByBatch = new ProductByBatch();

				if (row[0] != null)
					productByBatch.setBatchCode(row[0].toString());

				if (row[1] != null)
					productByBatch.setBatchExpDate(row[1].toString());

				if (row[2] != null)
					productByBatch.setMRP(row[2].toString());

				if (row[3] != null)
					productByBatch.setPurchaseRate(row[3].toString());

				if (row[4] != null)
					productByBatch.setClearStock(row[4].toString());

				if (row[5] != null)
					productByBatch.setBatchId(row[5].toString());

				if (row[6] != null)
					productByBatch.setStockId(row[6].toString());

				if (row[7] != null)
					productByBatch.setRate(row[7].toString());

				if (row[8] != null)
					productByBatch.setVat(row[8].toString());

				if (row[9] != null)
					productByBatch.setPurchaseSlaveId(row[9].toString());
				
				if (row[10] != null)
					productByBatch.setIgst(row[10].toString());
				
				if (row[11] != null)
					productByBatch.setCess(row[11].toString());
				
				if (row[12] != null)
					productByBatch.setSchemeStock(row[12].toString());

				productByBatchs.add(productByBatch);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return productByBatchs;
		}
		return productByBatchs;
	}

	@Override
	public List<ProductMaster> autoSuggestionProductForPurchase(String letter,Integer vmi) {

		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class)
					.createAlias("packingMaster", "packingMaster")
					.createAlias("companyMaster", "companyMaster")
					.createAlias("shelfMaster", "shelfMaster")
					.createAlias("drugMaster", "drugMaster")
					.createAlias("taxMaster", "taxMaster");
					
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			/*
			 * if(vmi!=null ){ criteria.add(Restrictions.eq("cathlabFlag", 1)); }else{
			 * criteria.add(Restrictions.eq("cathlabFlag", 0)); }
			 */
			criteria.add(Restrictions.like("productName", letter,
					MatchMode.START));

			criteria.setMaxResults(50);

			criteria.setProjection(Projections.distinct(Projections
					.property("productId")));
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("productName"));
			proList.add(Projections.property("packingMaster.packType"));
			proList.add(Projections.property("companyMaster.compName"));
			proList.add(Projections.property("shelfMaster.shelfName"));
			proList.add(Projections.property("productId"));
			proList.add(Projections.property("productUnit"));
			proList.add(Projections.property("drugMaster.drugName"));

			proList.add(Projections.property("productMarginRate"));
			proList.add(Projections.property("rateEqualsMrp"));
			proList.add(Projections.property("cgst"));
			proList.add(Projections.property("productMinLevel"));
			proList.add(Projections.property("productPrescription"));
			proList.add(Projections.property("sgst"));
			proList.add(Projections.property("hsn"));
			proList.add(Projections.property("igst"));
			proList.add(Projections.property("cess"));
			proList.add(Projections.property("taxMaster.taxRate"));
			
			
			
			criteria.setProjection(proList);

			@SuppressWarnings("unchecked")
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					ProductMaster productMaster = new ProductMaster();
					productMaster.setProductName(master[0].toString());

					CompanyMaster companyMaster = new CompanyMaster();
					companyMaster.setCompName(master[1].toString());

					PackingMaster packingMaster = new PackingMaster();
					packingMaster.setPackType(master[2].toString());

					ShelfMaster shelfMaster = new ShelfMaster();
					shelfMaster.setShelfName(master[3].toString());

					productMaster.setCompanyMaster(companyMaster);
					productMaster.setShelfMaster(shelfMaster);
					productMaster.setPackingMaster(packingMaster);
					productMaster.setProductId(Integer.parseInt(master[4]
							.toString()));
					productMaster.setProductUnit(Double.parseDouble(master[5]
							.toString()));

					DrugMaster drugMaster = new DrugMaster();
					drugMaster.setDrugName(master[6].toString());

					productMaster.setDrugMaster(drugMaster);

					if (master[7] != null && master[7] != "null")
						productMaster.setProductMarginRate(Double
								.parseDouble(master[7].toString()));
					else
						productMaster.setProductMarginRate(Double
								.parseDouble("0.0"));

					if (master[8] != null && master[8] != "null") {
						productMaster.setRateEqualsMrp(Integer
								.parseInt(master[8].toString()));
					} else
						productMaster.setRateEqualsMrp(Integer.parseInt("0"));

					if (master[9] != null && master[9] != "null") {

						productMaster.setProductShortName(master[9].toString());
					} else
						productMaster.setProductShortName("");

					if (master[10] != null && master[10] != "null") {

						productMaster.setProductMinLevel(Integer
								.parseInt(master[10].toString()));
					} else
						productMaster.setProductMinLevel(Integer.parseInt("0"));
					
					if (master[11] != null && master[11] != "null") {
						productMaster.setProductPrescription(Integer
								.parseInt(master[11].toString()));
					}
					
					if (master[12] != null && master[12] != "null") {
						productMaster.setProductCreatedBy(Integer
								.parseInt(master[12].toString()));
					}
					
					if (master[13] != null && master[13] != "null") {
						productMaster.setHsn(master[13].toString());
					}
					else
						productMaster.setHsn("");
					
					if (master[14] != null && master[14] != "null") {
						productMaster.setIgst(master[14].toString());
					}
					else
						productMaster.setIgst("");
					
					if (master[15] != null && master[15] != "null") {
						productMaster.setCess(master[15].toString());
					}
					else
						productMaster.setCess("");
					
					
					/*TaxMaster taxMaster=new TaxMaster();
					if (master[16] != null && master[16] != "null") {
						taxMaster.setTaxRate(Double.parseDouble(master[16]+""));
					}
					else
						taxMaster.setTaxRate(0.0);*/
					
					productMaster.setProductScheme1(Double.parseDouble(master[16]+""));
					
					ltProductMaster.add(productMaster);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltProductMaster;
		}
		return ltProductMaster;
	}

	@Override
	public ProductMaster getProductByIdForDate(Integer productId) {

		ProductMaster productMaster = new ProductMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class);
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			if (productId != 0) {
				criteria.add(Restrictions.eq("productId", productId));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("productAddDate"));
			proList.add(Projections.property("productLastMRP"));
			proList.add(Projections.property("productLastPurRate"));
			proList.add(Projections.property("productPhotoUrl"));
			criteria.setProjection(proList);

			Date date;

			Double LastMRP;

			Double LastPur;

			String ProUrl = "";

			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					date = (Date) master[0];
					productMaster.setProductAddDate(date);
				}

				if (master[1] != null) {
					LastMRP = (Double) master[1];
					productMaster.setProductLastMRP(LastMRP);
				}

				if (master[2] != null) {
					LastPur = (Double) master[2];
					productMaster.setProductLastPurRate(LastPur);
				}
				if (master[3] != null) {
					ProUrl = (String) master[3];
					productMaster.setProductPhotoUrl(ProUrl);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return productMaster;
		}
		return productMaster;
	}

	@Override
	public List<StockMaster> getStockByProductId(Integer productId) {
		List<StockMaster> stockMasters = new ArrayList<StockMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(StockMaster.class)
					.createAlias("batchMaster", "batchMaster");
			criteria.add(Restrictions.eq("stockProductMaster.productId",
					productId));

			criteria.add(Restrictions.eq("batchMaster.batchDeleteFlag", 0));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("stockQtyInHand"));

			criteria.setProjection(proList);

			List<Object> result = criteria.list();

			for (Object master : result) {
				if (master != null) {
					StockMaster stockMaster = new StockMaster();
					stockMaster.setStockQtyInHand(Double.parseDouble(master
							.toString()));

					stockMasters.add(stockMaster);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return stockMasters;
		}
		return stockMasters;
	}

	@Override
	public List<ProductByBatch> autoSuggestionForOpeningStock(
			Integer productId, String storeId) {

		String strQuery = "";
		Object storeName = new Object();

		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT store_name FROM pharma_sub_store_master where store_id='"
							+ storeId + "'");
			storeName = query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (storeName == null) {
			/*strQuery = "select     batch.batch_code,    batch.batch_exp_date,    pur_rate.mrp,    pur_rate.pur_rate,    stock.stock_qty_in_hand,    batch.batch_id,    stock.stock_id,    pur_rate.bill_rate,    pur_rate.rate,    op.opening_vat as gst from    pharma_purchase_rate pur_rate        inner join    pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id        inner join    pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id        left join    pharma_purchase_slave pur_slave ON pur_slave.pur_slave_batch_id = batch.batch_id        left join    pharma_opening_stock op ON op.batch_id = batch.batch_id where    batch.batch_product_id ="
		+ productId
					+ " and batch.batch_delete_flag = '0' and pur_rate.pur_slave_id = '0' group by batch.batch_id";
		*/
			
			//from svn
			/*strQuery = "select batch.batch_code,batch.batch_exp_date,pur_rate.mrp,pur_rate.pur_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id,pur_rate.bill_rate,pur_rate.rate,op.opening_vat,op.opening_igst,op.opening_cess from pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_opening_stock op ON op.batch_id = pur_rate.batch_id where op.opening_stock_delete_flag='0' and batch.batch_product_id = '"
					+ productId
					+ "' and batch.batch_delete_flag = '0' and pur_slave_id = '0' order by batch_exp_date desc";*/
			strQuery="select batch.batch_code,batch.batch_exp_date,op.opening_pur_rate,op.opening_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id,op.opening_vat,op.opening_igst,op.opening_cess,op.opening_pur_rate as purchase_rate from pharma_opening_stock op inner join pharma_batch_master batch ON op.batch_id = batch.batch_id inner join pharma_stock_master stock ON stock.stock_batch_id = batch.batch_id where op.opening_stock_delete_flag='0'  and batch.batch_product_id = '"+productId+"' and batch.batch_delete_flag = '0'";
			
		} else {
			/*strQuery = "select     batch.batch_code,    batch.batch_exp_date,    pur_rate.mrp,    pur_rate.pur_rate,    stock.stock_qty_in_hand,    batch.batch_id,    stock.stock_id,    pur_rate.bill_rate,    pur_rate.rate,    op.opening_vat as gst from    pharma_purchase_rate pur_rate        inner join    pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id        inner join    pharma_"
					+ storeName.toString()
					+ "_stock_master stock ON stock.stock_batch_id = batch.batch_id        left join    pharma_purchase_slave pur_slave ON pur_slave.pur_slave_batch_id = batch.batch_id        left join    pharma_opening_stock op ON op.batch_id = batch.batch_id where    batch.batch_product_id ="
					+ productId
					+ "' and batch.batch_delete_flag = '0' and pur_rate.pur_slave_id = '0' group by batch.batch_id";
		
		*/
		
			//from svn
			strQuery = "select batch.batch_code,batch.batch_exp_date,pur_rate.mrp,pur_rate.pur_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id,pur_rate.bill_rate,pur_rate.rate,op.opening_vat,op.opening_igst,op.opening_cess from pharma_purchase_rate pur_rate inner join pharma_batch_master batch ON pur_rate.batch_id = batch.batch_id inner join pharma_"
					+ storeName.toString()
					+ "_stock_master stock ON stock.stock_batch_id = batch.batch_id inner join pharma_product_master product ON product.product_id = batch.batch_product_id inner join pharma_opening_stock op ON op.batch_id = pur_rate.batch_id where batch.batch_product_id = '"
					+ productId
					+ "' and batch.batch_delete_flag = '0' and op.opening_stock_delete_flag='0'   and pur_slave_id = '0' order by batch_exp_date desc";
		
		}

		List<ProductByBatch> productByBatchs = new ArrayList<ProductByBatch>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					strQuery);
			List<Object[]> rows = query.list();

			for (Object[] row : rows) {
				ProductByBatch productByBatch = new ProductByBatch();

				if (row[0] != null)
					productByBatch.setBatchCode(row[0].toString());

				if (row[1] != null)
					productByBatch.setBatchExpDate(row[1].toString());

				if (row[2] != null)
					productByBatch.setMRP(row[2].toString());

				if (row[3] != null)
					productByBatch.setRate(row[3].toString());

				if (row[4] != null)
					productByBatch.setClearStock(row[4].toString());

				if (row[5] != null)
					productByBatch.setBatchId(row[5].toString());

				if (row[6] != null)
					productByBatch.setStockId(row[6].toString());

				
				  if (row[10] != null) productByBatch.setPurchaseRate(row[10].toString());
				 
				if (row[7] != null)
					productByBatch.setVat(row[7].toString());
				
				if (row[8] != null)
					productByBatch.setIgst(row[8].toString());
				
				if (row[9] != null)
					productByBatch.setCess(row[9].toString());

				productByBatch.setPurchaseSlaveId("");

				productByBatchs.add(productByBatch);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return productByBatchs;
		}
		return productByBatchs;
	}

	@Override
	public List<ProductMaster> getAllProducts() {

		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class);
			criteria.add(Restrictions.eq("productDeleteFlag", 0));

			ProjectionList proList = Projections.projectionList();

			proList.add(Projections.property("productName"));
			proList.add(Projections.property("productId"));
			proList.add(Projections.property("productShortName"));

			criteria.setProjection(proList);

			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					ProductMaster productMaster = new ProductMaster();

					if (master[1] != null)
						productMaster.setProductId(Integer.parseInt(master[1]
								.toString()));

					if (master[0] != null)
						productMaster.setProductName(master[0].toString());
					else
						productMaster.setProductName("");

					if (master[2] != null)
						productMaster.setProductShortName(master[2].toString());
					else
						productMaster.setProductShortName("");

					ltProductMaster.add(productMaster);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltProductMaster;
		}
		return ltProductMaster;
	}

	@Override
	public Integer getContentByProductId(Integer productId) {
		Integer result = 0;
		ProductMaster productMaster = new ProductMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class)
					.createAlias("drugMaster", "drugMaster");
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			if (productId != 0) {
				criteria.add(Restrictions.eq("productId", productId));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("drugMaster.drugId"));
			criteria.setProjection(proList);
			result = (Integer) criteria.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public JSONArray getProductByContent(Integer contentId) {
		JSONArray jsonArray = new JSONArray();

		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(ProductMaster.class)
				.createAlias("packingMaster", "packingMaster")
				.createAlias("drugMaster", "drugMaster")
				.createAlias("companyMaster", "companyMaster")
				.createAlias("categoryMaster", "categoryMaster")
				.createAlias("uomMaster", "uomMaster")
				.createAlias("shelfMaster", "shelfMaster");
		criteria.add(Restrictions.eq("productDeleteFlag", 0));
		criteria.add(Restrictions.eq("cathlabFlag", 0));
		if (contentId != 0) {
			criteria.add(Restrictions.eq("drugMaster.drugId", contentId));
		}

		ProjectionList proList = Projections.projectionList();

		proList.add(Projections.property("productName"));
		proList.add(Projections.property("companyMaster.compName"));
		proList.add(Projections.property("packingMaster.packType"));
		proList.add(Projections.property("categoryMaster.catName"));
		proList.add(Projections.property("uomMaster.uomName"));
		proList.add(Projections.property("drugMaster.drugName"));
		proList.add(Projections.property("shelfMaster.shelfName"));
		proList.add(Projections.property("productUnit"));
		criteria.setProjection(proList);

		List<Object[]> results = criteria.list();

		for (Object[] master : results) {
			try {
				JSONObject jsonObject = new JSONObject();

				if (master[0] != null)
					jsonObject.put("productName", master[0].toString());

				if (master[1] != null)
					jsonObject.put("companyName", master[1].toString());

				if (master[2] != null)
					jsonObject.put("packing", master[2].toString());

				if (master[3] != null)
					jsonObject.put("category", master[3].toString());

				if (master[4] != null)
					jsonObject.put("uom", master[4].toString());

				if (master[5] != null)
					jsonObject.put("drug", master[5].toString());

				if (master[6] != null)
					jsonObject.put("shelf", master[6].toString());

				if (master[7] != null)
					jsonObject.put("unit", master[7].toString());

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}
	
	@SuppressWarnings("unused")
	@Override
	public String pushStockByExcel(String file) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String currentTime = dateFormat.format(date);

		Map<String, Integer> cellValue = new HashMap<String, Integer>();

		/*
		 * List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		 * SQLQuery query = sessionFactory .getCurrentSession() .createSQLQuery(
		 * "select product_id,product_name from pharma_product_master;");
		 * List<Object[]> rows1 = query.list(); for (Object[] row : rows1) {
		 * ProductMaster productMaster = new ProductMaster(); if (row[0] !=
		 * null)
		 * productMaster.setProductId(Integer.parseInt(row[0].toString())); else
		 * productMaster.setProductId(Integer.parseInt(("")));
		 * 
		 * if (row[1] != null)
		 * productMaster.setProductName((row[1].toString())); else
		 * productMaster.setProductName("");
		 * 
		 * ltProductMaster.add(productMaster); }
		 */

		String filePath = file;
		try {
			InputStream ExcelFileToRead = new FileInputStream(filePath);
			XSSFWorkbook wb = new XSSFWorkbook(ExcelFileToRead);
			XSSFWorkbook test = new XSSFWorkbook();
			XSSFSheet sheet = wb.getSheetAt(0);
			XSSFRow row;
			
			XSSFCell cell;
			@SuppressWarnings("rawtypes")
			Iterator rows = sheet.rowIterator();
			if (rows.hasNext())
				rows.next();
			
			while (rows.hasNext()) {
				row = (XSSFRow) rows.next();
				Iterator cells = row.cellIterator();
				XSSFCell productName = null;
				XSSFCell batchCode = null;
				XSSFCell expiry = null;
				XSSFCell quantity = null;
				XSSFCell mrp = null;
				XSSFCell purchaseRate = null;
				XSSFCell billRate = null;
				XSSFCell rate = null;
				Integer shelf = 0;
				Double tax = 0.0;
				Double amt = 0.0;
				/*
				 * while (cells.hasNext()) {
				 */
				productName = row.getCell(0);
				batchCode = row.getCell(1);
				expiry = row.getCell(2);
				quantity = row.getCell(3);
				mrp = row.getCell(4);
				purchaseRate = row.getCell(5);
				billRate = row.getCell(6);
				rate = row.getCell(7);

				
			String pn=	productName.toString();
			System.err.println("ary =-=-=->"+pn.toCharArray().length);
				// }
				// cell=(XSSFCell) cells.next();
				if (productName != null ) {
					if (productName != null ) {
						//cellValue.containsKey(productName.toString().trim() )
						String selectProductId = "SELECT max(product_id) FROM pharma_product_master where product_name='"
								+ productName + "'";

						SQLQuery selectProductID = sessionFactory.getCurrentSession().createSQLQuery(
								selectProductId);

						Integer productId = (Integer) selectProductID
								.uniqueResult();
						
						/*Integer productId = cellValue.get(productName
								.toString().trim());*/
						String qyt = quantity.toString().trim();
						String prate =purchaseRate.toString().trim();
						
						String batchId = null;
						amt = (Double.parseDouble(qyt) * Double
								.parseDouble(prate));
						//String.valueOf(Double.parseDouble(qyt));
						
						try {
							try
							{
							// insert into pharma batch master
							/*SQLQuery query = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"select shelf.shelf_id,tax.tax_rate from pharma_product_master product "
													+ " inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id "
													+ " inner join pharma_product_tax_relation tax_Rel ON tax_Rel.product_id = product.product_id inner join pharma_tax_master tax ON tax.tax_id = tax_Rel.tax_id "
													+ " where product.product_id='"
													+ productId
													+ "' and product.product_delete_flag=0");

							Object object = query.uniqueResult();*/
							SQLQuery query = sessionFactory
										.getCurrentSession()
										.createSQLQuery(
												"SELECT p. product_shelf_id, t.tax_rate FROM pharma_product_master p inner join pharma_tax_master t ON t.tax_id = p.taxMaster_tax_id where p.product_delete_flag='0' and t.tax_delete_flag='0' and p.product_id="+ productId);

							Object object = query.uniqueResult();
							
							if (object != null) {
								Object[] value = (Object[]) object;
								shelf = (Integer.parseInt(value[0].toString()));
								tax = (Double.parseDouble(value[1].toString()));
							}
							}catch(Exception e)
							{
								System.out.println(e);
							}
							//ADDED BY VISHANT for set batch expiry date yyyy-mm-dd format 
							String setBatchExpDatetimestamp="";
							try {
								//String batchExpiryDate =  expiry.getBatchExpiry();
								String date2 []= expiry.toString().split("/");
								setBatchExpDatetimestamp = "20"+date2[1] +"-"+date2[0]+"-"+ "01"+" "+"00:00:00";
								System.out.println("date1>>>"+date);
				            	//batchMaster.setBatchExpDatetimestamp(date);
								}
								catch (Exception e) {
									e.printStackTrace();
							}
							String insertPharmaBatchMaster = "insert into pharma_batch_master(batch_code,batch_exp_date,batch_product_id,batch_delete_flag,batch_update_date,batch_exp_date_timestamp) values('"
									+ batchCode
									+ "','"
									+ expiry
									+ "','"
									+ productId + "',0,'" + currentTime + "','"+setBatchExpDatetimestamp+"')";
							SQLQuery queryPharmaBatchMaster = sessionFactory
									.getCurrentSession().createSQLQuery(
											insertPharmaBatchMaster);
							queryPharmaBatchMaster.executeUpdate();
							batchId = sessionFactory.getCurrentSession()
									.createSQLQuery("SELECT LAST_INSERT_ID()")
									.uniqueResult().toString();
						} catch (Exception e) {
							e.printStackTrace();
						}
						try {
							// insert into pharma stock master
							String insertPharmaStockMaster = "insert into pharma_stock_master(stock_product_id,stock_qty_in_hand,stock_qty_on_order,stock_delete_flag,stock_update_date,stock_batch_id) values('"
									+ productId
									+ "','"
									+ quantity
									+ "',0,0,'"
									+ currentTime + "','" + batchId + "')";
							SQLQuery queryPharmaStockMaster = sessionFactory
									.getCurrentSession().createSQLQuery(
											insertPharmaStockMaster);
							queryPharmaStockMaster.executeUpdate();
						} catch (Exception e) {
							e.printStackTrace();
						}
						try {
							// insert into pharma purchase rate
							String insertPharmaPurchaseRate = "insert into pharma_purchase_rate(batch_id,pur_rate,mrp,rate,update_date,bill_rate,pur_slave_id) values('"
									+ batchId
									+ "','"
									+ purchaseRate
									+ "','"
									+ mrp
									+ "','"
									+ rate
									+ "','"
									+ currentTime
									+ "','" + mrp + "',0)"; //billRate
							SQLQuery queryPharmaPurchaseRate = sessionFactory
									.getCurrentSession().createSQLQuery(
											insertPharmaPurchaseRate);
							queryPharmaPurchaseRate.executeUpdate();
						} catch (Exception e) {
							e.printStackTrace();
						}
						
						int zero=0;
						
						try {
							// insert into opening Stock
							String insertOpeningStock = "insert into pharma_opening_stock(shelf_no,opening_qty,opening_batch_code,opening_expiry,opening_vat,opening_pur_rate,opening_mrp,opening_rate,product_id,batch_id,opening_stock_amt,opening_stock_add_date,opening_stock_update_date,opening_stock_delete_flag,opening_stock_type,opening_cess,opening_igst) values('"
									+ shelf
									+ "','"
									+ quantity
									+ "','"
									+ batchCode
									+ "','"
									+ expiry
									+ "','"
									+ tax
									+ "','"
									+ purchaseRate
									+ "','"
									+ mrp
									+ "','"
									+ rate
									+ "','"
									+ productId
									+ "','"
									+ batchId
									+ "','"
									+ amt
									+ "','"
									+ currentTime
									+ "','"
									+ currentTime
									+ "',0,'"+ zero + "','"+ zero + "','"+ zero + "')";
							SQLQuery queryPharmaPurchaseRate = sessionFactory
									.getCurrentSession().createSQLQuery(
											insertOpeningStock);
							queryPharmaPurchaseRate.executeUpdate();
						} catch (Exception e) {
							e.printStackTrace();
						}

					} else {
						if (row.getCell(0) != null && row.getCell(8) != null) {
							
							System.err.println("in else Block!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							SQLQuery query = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"select product.product_id, product.product_name, shelf.shelf_id,tax.tax_rate from pharma_product_master product "
													+ " inner join pharma_company_master comp ON comp.comp_id = product.product_comp_id inner join pharma_shelf_master shelf ON shelf.shelf_id = product.product_shelf_id "
													+ " inner join pharma_product_tax_relation tax_Rel ON tax_Rel.product_id = product.product_id inner join pharma_tax_master tax ON tax.tax_id = tax_Rel.tax_id "
													+ " where product.product_name=:productName and comp.comp_name=:compName and product.product_delete_flag=0");
							query.setParameter("productName", row.getCell(0)
									.toString().trim());
							query.setParameter("compName", row.getCell(8)
									.toString().trim());
							Object object = query.uniqueResult();
							if (object != null) {
								Object[] value = (Object[]) object;
								Integer productId = (Integer) value[0];
								String productNameForMap = (String) value[1];
								shelf = (Integer.parseInt(value[2].toString()));
								tax = (Double.parseDouble(value[3].toString()));
								cellValue.put(productNameForMap, productId);
								batchCode = row.getCell(1);
								expiry = row.getCell(2);
								quantity = row.getCell(3);
								mrp = row.getCell(4);
								purchaseRate = row.getCell(5);
								billRate = row.getCell(6);
								rate = row.getCell(7);
								String batchId = null;
								try {
									amt = (Double.parseDouble(quantity
											.toString()) * Double
											.parseDouble(purchaseRate
													.toString()));
									// insert into pharma batch master
									String insertPharmaBatchMaster = "insert into pharma_batch_master(batch_code,batch_exp_date,batch_product_id,batch_delete_flag,batch_update_date) values('"
											+ batchCode
											+ "','"
											+ expiry
											+ "','"
											+ productId
											+ "',0,'"
											+ currentTime + "')";
									SQLQuery queryPharmaBatchMaster = sessionFactory
											.getCurrentSession()
											.createSQLQuery(
													insertPharmaBatchMaster);
									queryPharmaBatchMaster.executeUpdate();
									batchId = sessionFactory
											.getCurrentSession()
											.createSQLQuery(
													"SELECT LAST_INSERT_ID()")
											.uniqueResult().toString();
								} catch (Exception e) {
									e.printStackTrace();
								}
								try {
									// insert into pharma stock master
									String insertPharmaStockMaster = "insert into pharma_stock_master(stock_product_id,stock_qty_in_hand,stock_qty_on_order,stock_delete_flag,stock_update_date,stock_batch_id) values('"
											+ productId
											+ "','"
											+ quantity
											+ "',0,0,'"
											+ currentTime
											+ "','"
											+ batchId + "')";
									SQLQuery queryPharmaStockMaster = sessionFactory
											.getCurrentSession()
											.createSQLQuery(
													insertPharmaStockMaster);
									queryPharmaStockMaster.executeUpdate();
								} catch (Exception e) {
									e.printStackTrace();
								}
								try {
									// insert into pharma purchase rate
									String insertPharmaPurchaseRate = "insert into pharma_purchase_rate(batch_id,pur_rate,mrp,rate,update_date,bill_rate,pur_slave_id) values('"
											+ batchId
											+ "','"
											+ purchaseRate
											+ "','"
											+ mrp
											+ "','"
											+ rate
											+ "','"
											+ currentTime
											+ "','"
											+ billRate + "',0)";
									SQLQuery queryPharmaPurchaseRate = sessionFactory
											.getCurrentSession()
											.createSQLQuery(
													insertPharmaPurchaseRate);
									queryPharmaPurchaseRate.executeUpdate();
								} catch (Exception e) {
									e.printStackTrace();
								}

								try {
									// insert into pharma purchase rate
									String insertOpeningStock = "insert into pharma_opening_stock(shelf_no,opening_qty,opening_batch_code,opening_expiry,opening_vat,opening_pur_rate,opening_mrp,opening_rate,product_id,batch_id,opening_stock_amt,opening_stock_add_date,opening_stock_update_date,opening_stock_delete_flag) values('"
											+ shelf
											+ "','"
											+ quantity
											+ "','"
											+ batchCode
											+ "','"
											+ expiry
											+ "','"
											+ tax
											+ "','"
											+ purchaseRate
											+ "','"
											+ mrp
											+ "','"
											+ rate
											+ "','"
											+ productId
											+ "','"
											+ batchId
											+ "','"
											+ amt
											+ "','"
											+ currentTime
											+ "','"
											+ currentTime + "',0)";
									SQLQuery queryPharmaPurchaseRate = sessionFactory
											.getCurrentSession()
											.createSQLQuery(insertOpeningStock);
									queryPharmaPurchaseRate.executeUpdate();
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
						}
					}
				}
				/*
				 * for(int i=0;i<ltProductMaster.size();i++){ String
				 * productName=ltProductMaster.get(i).getProductName();
				 * if(cell.toString().equals(productName)){ Integer productId =
				 * ltProductMaster.get(i).getProductId();
				 * 
				 * cellValue.put(productName, productId);
				 * 
				 * XSSFCell batchCode=row.getCell(1); XSSFCell
				 * expiry=row.getCell(2); XSSFCell quantity=row.getCell(3);
				 * XSSFCell mrp=row.getCell(4); XSSFCell
				 * purchaseRate=row.getCell(5); XSSFCell
				 * billRate=row.getCell(6); XSSFCell rate=row.getCell(7); String
				 * batchId = null; try { //insert into pharma batch master
				 * String insertPharmaBatchMaster =
				 * "insert into pharma_batch_master(batch_code,batch_exp_date,batch_product_id,batch_delete_flag,batch_update_date) values('"
				 * +
				 * batchCode+"','"+expiry+"','"+productId+"',0,'"+currentTime+"')"
				 * ; SQLQuery queryPharmaBatchMaster =
				 * sessionFactory.getCurrentSession
				 * ().createSQLQuery(insertPharmaBatchMaster);
				 * queryPharmaBatchMaster.executeUpdate(); batchId =
				 * sessionFactory
				 * .getCurrentSession().createSQLQuery("SELECT LAST_INSERT_ID()"
				 * ).uniqueResult().toString(); } catch (Exception e) {
				 * e.printStackTrace(); } try { //insert into pharma stock
				 * master String insertPharmaStockMaster =
				 * "insert into pharma_stock_master(stock_product_id,stock_qty_in_hand,stock_qty_on_order,stock_delete_flag,stock_update_date,stock_batch_id) values('"
				 * +
				 * productId+"','"+quantity+"',0,0,'"+currentTime+"','"+batchId+
				 * "')"; SQLQuery queryPharmaStockMaster =
				 * sessionFactory.getCurrentSession
				 * ().createSQLQuery(insertPharmaStockMaster);
				 * queryPharmaStockMaster.executeUpdate(); } catch (Exception e)
				 * { e.printStackTrace(); } try { //insert into pharma purchase
				 * rate String insertPharmaPurchaseRate =
				 * "insert into pharma_purchase_rate(batch_id,pur_rate,mrp,rate,update_date,bill_rate,pur_slave_id) values('"
				 * +
				 * batchId+"','"+purchaseRate+"','"+mrp+"','"+rate+"','"+currentTime
				 * +"','"+billRate+"',0)"; SQLQuery queryPharmaPurchaseRate =
				 * sessionFactory
				 * .getCurrentSession().createSQLQuery(insertPharmaPurchaseRate
				 * ); queryPharmaPurchaseRate.executeUpdate(); } catch
				 * (Exception e) { e.printStackTrace(); } } }
				 */
			}
			// System.out.println(" ");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Saved Successfully";
	}
	
	@SuppressWarnings("unused")
	@Override
	public String pushStockByExcelForProduct(String file ,int cathlabFlag) {

		/*
		 * Map<String, Integer> cellValue = new HashMap<String, Integer>();
		 */
		
				
		String filePath = file;
		try {
			InputStream ExcelFileToRead = new FileInputStream(filePath);
			XSSFWorkbook wb = new XSSFWorkbook(ExcelFileToRead);
			XSSFWorkbook test = new XSSFWorkbook();
			XSSFSheet sheet = wb.getSheetAt(0);
		    XSSFRow row;
			XSSFCell cell;
			@SuppressWarnings("rawtypes")
			Iterator rows = sheet.rowIterator();
			if (rows.hasNext())
				rows.next();
			
			while (rows.hasNext()) {
			   row = (XSSFRow) rows.next();
				
				@SuppressWarnings("rawtypes")
				Iterator cells = row.cellIterator();
				XSSFCell productName = null;
				XSSFCell preparationName = null;
				XSSFCell strengthName = null;
			 	XSSFCell companyName = null;
				XSSFCell packingName = null;
				XSSFCell categoryName = null;
				XSSFCell uomName = null;
				XSSFCell unit = null;
				XSSFCell drugName = null;
				XSSFCell shelfName = null;
				
				/*XSSFCell tax_rate = null;
				XSSFCell tax_name = null;
				XSSFCell hsn_no = null;
*/
				/*
				 * while (cells.hasNext()) {
				 */
				final String compName=(row.getCell(3)).toString();
				productName = row.getCell(0);
				preparationName = row.getCell(1);
				strengthName = row.getCell(2);
			  	companyName = row.getCell(3);
				packingName = row.getCell(4);
				categoryName = row.getCell(5);
				uomName = row.getCell(6);
				unit = row.getCell(7);
				drugName = row.getCell(8);
				shelfName = row.getCell(9);
				SQLQuery queryCompanyMaster = null;
				Integer productId = 0;
				String tax_name =row.getCell(10).toString().trim();
				String hsn_no   =row.getCell(11).toString().trim();
				String tax_rate =row.getCell(12).toString();
				//int taxRate=		Integer.parseInt(tax_rate);
				/*
				 * SQLQuery queryPackingMaster = null; SQLQuery queryDrugMaster
				 * = null; SQLQuery queryPreparationMaster = null; SQLQuery
				 * queryShelfMaster = null; SQLQuery queryCategoryMaster = null;
				 * SQLQuery queryUomMaster = null; SQLQuery queryStrengthMaster
				 * = null;
				 */
				// }
				// cell=(XSSFCell) cells.next();
				Calendar currentDate = Calendar.getInstance();
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				String date = dateFormat.format(new java.util.Date());
				try {
					if (row.getCell(0) != null && row.getCell(3) != null) {
						SQLQuery query = sessionFactory.getCurrentSession()
								.createSQLQuery(
										/*
										 * "select product_id,product_name from pharma_product_master product inner join pharma_company_master comp on comp.comp_id=product.product_comp_id where product.product_name=:productName and comp.comp_name=:compName and product.product_delete_flag=0"
										 * );
										 */
										"select product_id, product_name from pharma_product_master product inner join pharma_company_master comp ON comp.comp_id =product.product_comp_id inner join pharma_packing_master pack on pack.pack_id =product.product_pack_id where product.product_name =:productName and comp.comp_name =:compName  and pack.pack_type=:packName and product.product_delete_flag = 0");
						query.setParameter("productName", row.getCell(0)
								.toString().trim());
						query.setParameter("compName", row.getCell(3)
								.toString().trim());
						query.setParameter("packName", row.getCell(4)
								.toString().trim());

						Object object = query.uniqueResult();
						if (object != null) {
							Object[] value = (Object[]) object;
							productId = (Integer) value[0];
						}
						if (object == null) {
							EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
							Integer compId = ehatEnterpriseUtil
									.getCompanyIdByCompanyName(row.getCell(3)
											.toString().trim());
							if (compId == 0) {
								/*String insertPharmaCompanyMaster = "insert into pharma_company_master(comp_name,comp_short_name,comp_delete_flag,comp_add_date,comp_update_date) values('"
										+ row.getCell(3).toString().trim()
										+ "','"
										+ row.getCell(3).toString().trim()
										+ "',0,'" + date + "','" + date + "')";
								
								SQLQuery queryCompMaster = sessionFactory.getCurrentSession().createSQLQuery(
												insertPharmaCompanyMaster);
								queryCompMaster.executeUpdate();*/
								String queryCompMaster="insert into pharma_company_master(comp_name,comp_short_name,comp_delete_flag,comp_add_date,comp_update_date) values(?,?,'0','"+date+"','"+date+"')"; 
								/*
								 * getJdbcTemplate().execute(queryCompMaster,new
								 * PreparedStatementCallback<Boolean>() { public Boolean doInPreparedStatement(
								 * java.sql.PreparedStatement ps) throws SQLException, DataAccessException {
								 * 
								 * ps.setString(1,compName); ps.setString(2,compName);
								 * 
								 * return ps.execute(); } });
								 */
								
							}
							String selectCompanyId = null;
							Integer compID =0;
							try {
								selectCompanyId = "SELECT max(comp_id) FROM pharma_company_master where comp_name='"
										+ row.getCell(3).toString().trim() + "'";

								SQLQuery fetchComId = sessionFactory.getCurrentSession().createSQLQuery(
												selectCompanyId);

								compID = (Integer) fetchComId.uniqueResult();
								System.out.println(compID.toString());
								
								/*
								 * String
								 * queryMaxResult="SELECT max(comp_id) FROM pharma_company_master where comp_name = ?"
								 * ; SQLQuery selectCompID = sessionFactory.getCurrentSession().createSQLQuery(
								 * queryMaxResult); compID = (Integer) selectCompID.uniqueResult();
								 */
								//Object[] inputs = new Object[] {compName.trim()};
								 //compID = getJdbcTemplate().queryForObject(queryMaxResult, inputs, String.class); 
								
								
							} 
							catch (Exception e) 
							{
								e.printStackTrace();
							}

							Integer packId = ehatEnterpriseUtil
									.getPackingIdByPackName(row.getCell(4)
											.toString().trim());

							if (packId == 0) {
								String insertPharmaPackingMaster = "insert into pharma_packing_master(pack_type,pack_delete_flag,pack_update_date,pak_add_date) values('"
										+ row.getCell(4).toString().trim()
										+ "',0,'" + date + "','" + date + "')";
								SQLQuery queryPackMaster = sessionFactory.getCurrentSession().createSQLQuery(
												insertPharmaPackingMaster);
								queryPackMaster.executeUpdate();

							}

							String selectPackId = "SELECT max(pack_id) FROM pharma_packing_master where pack_type='"
									+ row.getCell(4).toString().trim() + "'";

							SQLQuery selectPackID = sessionFactory.getCurrentSession().createSQLQuery(
											selectPackId);

							Integer packID = (Integer) selectPackID
									.uniqueResult();
							System.out.println(packID.toString());

							Integer catId = ehatEnterpriseUtil
									.getCategoryIdByCatName(row.getCell(5)
											.toString().trim());

							if (catId == 0) {
								String insertPharmaCatMaster = "insert into pharma_category_master(cat_name,cat_delete_flag,cat_update_date,category_add_date) values('"
										+ row.getCell(5).toString().trim()
										+ "',0,'" + date + "','" + date + "')";
								SQLQuery queryCatMaster = sessionFactory.getCurrentSession().createSQLQuery(
												insertPharmaCatMaster);
								queryCatMaster.executeUpdate();

							}

							String selectCatId = "SELECT max(cat_id) FROM pharma_category_master where cat_name='"
									+ row.getCell(5).toString().trim() + "'";

							SQLQuery selectCatID = sessionFactory.getCurrentSession().createSQLQuery(
											selectCatId);

							Integer catID = (Integer) selectCatID
									.uniqueResult();
							System.out.println(catID.toString());

							Integer preId = ehatEnterpriseUtil
									.getPreparationIdByPreName(row.getCell(1)
											.toString().trim());

							if (preId == 0) {
								String insertPharmaPreMaster = "insert into pharma_preparation_master(preparation_name,preparation_delete_flag,preparation_update_date,preparation_add_date) values('"
										+ row.getCell(1).toString().trim()
										+ "',0,'" + date + "','" + date + "')";
								SQLQuery queryCatMaster = sessionFactory.getCurrentSession().createSQLQuery(
												insertPharmaPreMaster);
								queryCatMaster.executeUpdate();

							}

							String selectPreId = "SELECT max(preparation_id) FROM pharma_preparation_master where preparation_name='"
									+ row.getCell(1).toString().trim() + "'";

							SQLQuery selectPreID = sessionFactory.getCurrentSession().createSQLQuery(
											selectPreId);

							Integer preID = (Integer) selectPreID
									.uniqueResult();
							System.out.println(preID.toString());

							Integer strId = ehatEnterpriseUtil
									.getStrengthIdByStrName(row.getCell(2)
											.toString().trim());

							if (strId == 0) {
								String insertPharmaStrMaster = "insert into pharma_strength_master(strength_name,strength_delete_flag,strength_update_date,strength_add_date) values('"
										+ row.getCell(2).toString().trim()
										+ "',0,'" + date + "','" + date + "')";
								SQLQuery queryCatMaster = sessionFactory.getCurrentSession().createSQLQuery(
												insertPharmaStrMaster);
								queryCatMaster.executeUpdate();

							}

							String selectStrId = "SELECT max(strength_id) FROM pharma_strength_master where strength_name='"
									+ row.getCell(2).toString().trim() + "'";

							SQLQuery selectStrID = sessionFactory.getCurrentSession().createSQLQuery(
											selectStrId);

							Integer strID = (Integer) selectStrID
									.uniqueResult();
							System.out.println(strID.toString());

							Integer shelfId = ehatEnterpriseUtil
									.getShelfIdByShelfName(row.getCell(9)
											.toString().trim());

							if (shelfId == 0) {
								String insertPharmaShelfMaster = "insert into pharma_shelf_master(shelf_name,shelf_delete_flag,shelf_update_date,shelf_add_date) values('"
										+ shelfName
										+ "',0,'"
										+ date
										+ "','"
										+ date + "')";
								SQLQuery queryShelfMaster = sessionFactory.getCurrentSession().createSQLQuery(
												insertPharmaShelfMaster);
								queryShelfMaster.executeUpdate();

							}

							String selectShelfId = "SELECT max(shelf_id) FROM pharma_shelf_master where shelf_name='"
									+ shelfName + "'";

							SQLQuery selectShelfID = sessionFactory.getCurrentSession().createSQLQuery(
											selectShelfId);

							Integer shelfID = (Integer) selectShelfID
									.uniqueResult();
							System.out.println(shelfID.toString());

							Integer drugId = ehatEnterpriseUtil
									.getDrugIdByDrugName(row.getCell(8)
											.toString().trim());

							if (drugId == 0) {
								String insertPharmaDrugMaster = "insert into pharma_drug_master(drug_name,drug_disc,drug_billing_must,drug_schedule_h1,drug_stock_hold,drug_delete_flag,drug_update_date,drug_add_date) values('"
										+ drugName
										+ "',0"
										+ ",0"
										+ ",0"
										+ ",0"
										+ ",0,'" + date + "','" + date + "')";
								SQLQuery queryDrugMaster = sessionFactory.getCurrentSession().createSQLQuery(
												insertPharmaDrugMaster);
								queryDrugMaster.executeUpdate();

							}

							String selectDrugId = "SELECT max(drug_id) FROM pharma_drug_master where drug_name='"
									+ drugName + "'";

							SQLQuery selectDrugID = sessionFactory.getCurrentSession().createSQLQuery(
											selectDrugId);

							Integer drugID = (Integer) selectDrugID
									.uniqueResult();
							System.out.println(drugID.toString());

							Integer uomId = ehatEnterpriseUtil
									.getUomIdByUomName(row.getCell(6)
											.toString().trim());
							if (uomId == 0) {
								String insertPharmaUomMaster = "insert into pharma_uom_master(uom_name,uom_delete_flag,uom_update_date,uom_add_date) values('"
										+ uomName
										+ "',0,'"
										+ date
										+ "','"
										+ date + "')";
								SQLQuery queryUomMaster = sessionFactory.getCurrentSession().createSQLQuery(
												insertPharmaUomMaster);
								queryUomMaster.executeUpdate();

							}

							String selectUomId = "SELECT max(uom_id) FROM pharma_uom_master where uom_name='"
									+ uomName + "'";

							SQLQuery selectUomID = sessionFactory.getCurrentSession().createSQLQuery(
											selectUomId);

							Integer uomID = (Integer) selectUomID
									.uniqueResult();
							System.out.println(uomID.toString());
							
							
							//Added By Bilal 
							Integer gstId = ehatEnterpriseUtil
									.gettaxIdByGSTName(row.getCell(10)
											.toString().trim());
							int tax_type =0;
							if (tax_rate.equals("0")) {
								tax_type=0;
							}else{
								tax_type=1;
							}
							if (gstId == 0) {
								String insertPharmaGSTMaster = "insert into pharma_tax_master(tax_name,tax_rate,tax_delete_flag,tax_update_date,tax_add_date,tax_createdBy,tax_type) values('"+ tax_name+"','"+ tax_rate + "',0,'" + date + "',	'" + date+ "',1,'" +tax_type
										+ "')";
								SQLQuery queryUomMaster = sessionFactory.getCurrentSession().createSQLQuery(
										insertPharmaGSTMaster);
								queryUomMaster.executeUpdate();

							}

							String selectGSTId = "SELECT max(tax_id) FROM pharma_tax_master where tax_name='"
									+ tax_name + "'";

							SQLQuery selectGSTID = sessionFactory.getCurrentSession().createSQLQuery(
									selectGSTId);

							Integer taxID = (Integer) selectGSTID
									.uniqueResult();
							
							
							
							//Added By Bilal 
							Integer hsnId = ehatEnterpriseUtil
									.gettaxIdByHSNName(row.getCell(11)
											.toString().trim());
							int deleted=1;
							if (hsnId == 0) {
								String insertPharmaGSTMaster = "insert into pharma_hsn_master(hsn_no,deleteFlag) values('"+ hsn_no + "' , '"+ deleted + "')";
								SQLQuery queryUomMaster = sessionFactory.getCurrentSession().createSQLQuery(
										insertPharmaGSTMaster);
								queryUomMaster.executeUpdate();

							}

							String selectHSNId = "SELECT max(idpharma_hsn_master) FROM pharma_hsn_master where hsn_no='"
									+ hsn_no + "'";

							SQLQuery selectHSNID = sessionFactory.getCurrentSession().createSQLQuery(
									selectHSNId);

							Integer hsnID = (Integer) selectHSNID
									.uniqueResult();
							
							
							int product_prescription=1;
							int zero =0;
							int rateequalsmrp=1;
							try {
								String insertPharmaProductMaster = "insert into pharma_product_master(product_name,product_short_name,product_comp_id,product_pack_id,product_shelf_id,product_cat_id,product_uom_id,product_drug_id,product_uom_unit,product_preparation_id,product_strength_id,taxMaster_tax_id,hsnMaster_idpharma_hsn_master,product_cathlapFlag,product_prescription ,product_cess,product_cgst,product_hsn,product_igst,product_sgst,product_rate_equals_mrp,product_add_date) values('"
										+ productName.toString().trim()
										+ "','"
										+ productName.toString().trim()
										+ "','"
										+ compID
										+ "','"
										+ packID
										+ "','"
										+ shelfID
										+ "','"
										+ catID
										+ "','"
										+ uomID
										+ "','"
										+ drugID
										+ "','"
										+ row.getCell(7).toString().trim()
										+ "','"
										+ preID + "','" + strID + "','" + taxID + "','" + hsnID + "','" + cathlabFlag + "','" + product_prescription + "','"
										+ zero + "','" + zero + "','"  + hsnID +  "','" + zero + "','" + zero + "','" +rateequalsmrp + "','" +date + "')";
								SQLQuery queryProductMaster = sessionFactory.getCurrentSession().createSQLQuery(
												insertPharmaProductMaster);
								int count = queryProductMaster.executeUpdate();
																							
						
							} catch (Exception e) {
								e.printStackTrace();
							}

						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}

			}

		} catch (Exception e) {
			System.out.println(e);
					}
		return "Saved Successfully";
	}

	@Override
	public void updateProductHSN(Integer productId, String txtHsn) {
		org.hibernate.Query query=sessionFactory.getCurrentSession().createSQLQuery("update pharma_product_master set product_hsn=? where product_id=?");
		
		if(txtHsn.equalsIgnoreCase("")){
			txtHsn = "1";
		}
		
		query.setParameter(0, txtHsn);
		query.setParameter(1, productId);
		query.executeUpdate();
		
		System.err.println("txtHsn======="+txtHsn);
		
		org.hibernate.Query query1=sessionFactory.getCurrentSession().createSQLQuery("select * from pharma_hsn_master where hsn_no=?");
		query1.setParameter(0, txtHsn);
		if(query1.list().size()==0){
			org.hibernate.Query query2=sessionFactory.getCurrentSession().createSQLQuery("insert into pharma_hsn_master(hsn_no) values(?)");
			query2.setParameter(0, txtHsn);
			query2.executeUpdate();
		}
	}

	@Override
	public void saveHSN(String txtHsn) {
		org.hibernate.Query query2=sessionFactory.getCurrentSession().createSQLQuery("insert into pharma_hsn_master(hsn_no) values(?)");
		query2.setParameter(0, txtHsn);
		query2.executeUpdate();
	}

	@Override
	public List<ProductMaster> autoSuggestionCathLabVendor(String letter) {
		
		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VendorMaster.class)
					.createAlias("productMasters","productMasters");
			criteria.add(Restrictions.eq("productMasters.cathlabFlag", 1));
			criteria.add(Restrictions.like("vendorName", letter,
					MatchMode.ANYWHERE));
			
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("vendorId"));
			proList.add(Projections.property("vendorName"));
			// committed by akshata, 03 JAN 21
			//proList.add(Projections.groupProperty("vendorName"));
			criteria.setProjection(proList);

			@SuppressWarnings("unchecked")
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					ProductMaster productMaster = new ProductMaster();
					productMaster.setProductId(Integer.parseInt(master[0]+""));
					productMaster.setProductName(master[1].toString());

					ltProductMaster.add(productMaster);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltProductMaster;
		}
		return ltProductMaster;
	}

	@Override
	public List<ProductMaster> getCathLabProductByVendor(int vendorId) {

		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		Query query=sessionFactory.getCurrentSession().createSQLQuery("select     product.product_name,    sum(slave.pur_slave_qty),    sum(stock.stock_qty_in_hand) from    pharma_purchase_slave slave        inner join    pharma_batch_master b ON b.batch_id = slave.pur_slave_batch_id        inner join    pharma_stock_master stock ON stock.stock_batch_id = b.batch_id        inner join    pharma_product_master product ON product.product_id = stock.stock_product_id        inner join    pharma_product_vendor_relation rel ON product.product_id = rel.product_id        inner join    pharma_vendor_master vm ON rel.vendor_id = vm.vendor_Id where    vm.vendor_Id = '"
		+vendorId
		+"'  and product.product_cathlapFlag = 1 group by product.product_id").setCacheable(true);

		@SuppressWarnings("unchecked")
		List<Object[]> result = query.list();

		for (Object[] master : result) {
			if (master[0] != null) {
				ProductMaster productMaster = new ProductMaster();
				productMaster.setProductName(master[0].toString());
				if (master[1] != null)
				productMaster.setCess(master[1].toString());
				else
					productMaster.setCess(0+"");
				
				if (master[2] != null)
				productMaster.setCgst(master[2].toString());
				else
					productMaster.setCgst(0+"");
				
				ltProductMaster.add(productMaster);
			}
		}

	return ltProductMaster;
	}

	@Override
	public JSONArray getAlternateProductByProductId(Integer productId) {
		JSONArray jsonArray = new JSONArray();

		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(ProductMaster.class)
				.createAlias("packingMaster", "packingMaster")
				.createAlias("drugMaster", "drugMaster")
				.createAlias("companyMaster", "companyMaster")
				.createAlias("categoryMaster", "categoryMaster")
				.createAlias("uomMaster", "uomMaster")
				.createAlias("shelfMaster", "shelfMaster");
		criteria.add(Restrictions.eq("productDeleteFlag", 0));
		if (productId != 0) {
			criteria.add(Restrictions.eq("productId", productId));
		}

		ProjectionList proList = Projections.projectionList();

		proList.add(Projections.property("productName"));
		proList.add(Projections.property("companyMaster.compName"));
		proList.add(Projections.property("packingMaster.packType"));
		proList.add(Projections.property("categoryMaster.catName"));
		proList.add(Projections.property("uomMaster.uomName"));
		proList.add(Projections.property("drugMaster.drugName"));
		proList.add(Projections.property("shelfMaster.shelfName"));
		proList.add(Projections.property("productUnit"));
		criteria.setProjection(proList);

		List<Object[]> results = criteria.list();

		for (Object[] master : results) {
			try {
				JSONObject jsonObject = new JSONObject();

				if (master[0] != null)
					jsonObject.put("productName", master[0].toString());

				if (master[1] != null)
					jsonObject.put("companyName", master[1].toString());

				if (master[2] != null)
					jsonObject.put("packing", master[2].toString());

				if (master[3] != null)
					jsonObject.put("category", master[3].toString());

				if (master[4] != null)
					jsonObject.put("uom", master[4].toString());

				if (master[5] != null)
					jsonObject.put("drug", master[5].toString());

				if (master[6] != null)
					jsonObject.put("shelf", master[6].toString());

				if (master[7] != null)
					jsonObject.put("unit", master[7].toString());

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PharmaProductView> fetchHsnandGst(Integer unitId,int productId) {
		

		List<PharmaProductView> listproduct = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PharmaProductView.class);
			criteria.add(Restrictions.eq("productid", productId));
		
			listproduct = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();

		}
		return listproduct;
	
	}

	@Override
	public List<ProductMaster> autoSuggestionProductlist(String letter) {
		// TODO Auto-generated method stub
		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		try {
			@SuppressWarnings("deprecation")
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class)
					.createAlias("packingMaster", "packingMaster")
					.createAlias("companyMaster", "companyMaster")
					.createAlias("shelfMaster", "shelfMaster")
					.createAlias("drugMaster", "drugMaster")
					.createAlias("taxMaster", "taxMaster")
					.createAlias("categoryMaster","categoryMaster");
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			//criteria.add(Restrictions.eq("cathlabFlag", 0));
			criteria.add(Restrictions.like("productName", letter,
					MatchMode.ANYWHERE));
			
			criteria.setMaxResults(50);

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("productName"));
			proList.add(Projections.property("packingMaster.packType"));
			proList.add(Projections.property("companyMaster.compName"));
			proList.add(Projections.property("shelfMaster.shelfName"));
			proList.add(Projections.property("productId"));
			proList.add(Projections.property("productUnit"));
			proList.add(Projections.property("drugMaster.drugName"));
			
			proList.add(Projections.property("productH1"));
			proList.add(Projections.property("productMinLevel"));
			proList.add(Projections.property("productPrescription"));
		//	
			proList.add(Projections.property("categoryMaster.catId"));
			
		// committed by akshata, 03 JAN 21
		//	proList.add(Projections.groupProperty("productName"));
			
			proList.add(Projections.property("taxMaster.taxId"));
			proList.add(Projections.property("taxMaster.taxRate"));
			

			criteria.setProjection(proList);
			
			System.err.println("--aniket -- autoSuggestionProductlist -- criteria" + criteria);

			@SuppressWarnings("unchecked")
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					ProductMaster productMaster = new ProductMaster();
					productMaster.setProductName(master[0].toString());

					PackingMaster packingMaster = new PackingMaster();
					packingMaster.setPackType(master[1].toString());

					CompanyMaster companyMaster = new CompanyMaster();
					CategoryMaster categoryMaster=new CategoryMaster();
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

					DrugMaster drugMaster = new DrugMaster();
					drugMaster.setDrugName(master[6].toString());

					productMaster.setDrugMaster(drugMaster);

					if (master[7] != null && master[7] != "null") {
						productMaster.setProductH1(Integer.parseInt(master[7]
								.toString()));
					}
													
										
					if (master[8] != null && master[8] != "null") {
						productMaster.setProductMinLevel(Integer
								.parseInt(master[8].toString()));
					}else
						productMaster.setProductMinLevel(Integer
								.parseInt("0"));

					if (master[9] != null && master[9] != "null") {
						productMaster.setProductPrescription(Integer
								.parseInt(master[9].toString()));
					}

					if (master[10] != null && master[10] != "null")
					{
						categoryMaster.setCatId(Integer.parseInt((master[10].toString())));
					}
					
					productMaster.setCategoryMaster(categoryMaster);
					
					TaxMaster taxMaster=new TaxMaster();
					
					if (master[11] != null && master[11] != "null")
					{
						taxMaster.setTaxId(Integer.parseInt((master[11].toString())));
					}
					
					productMaster.setTaxMaster(taxMaster);
					
					ltProductMaster.add(productMaster);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltProductMaster;
		}
		return ltProductMaster;
	}
	@Override
	public List<ProductMaster> getPreparationAll(String letter) {
		// TODO Auto-generated method stub
		List<ProductMaster> ltPreparationMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class);
			Criterion rest1= Restrictions.like("productName", "%" + letter + "%");
			criteria.add(rest1);

			ltPreparationMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltPreparationMasters;
		}
		return ltPreparationMasters;
	}
	public List<ProductMaster> getProductByIDD(Integer productId)
	{
		List<ProductMaster> pmlist = new ArrayList<ProductMaster>();
		SQLQuery query = null;
		
		try {
			
				query = sessionFactory
						.getCurrentSession()
						.createSQLQuery("SELECT  pm.product_id,pm.product_pack_id,pm.product_h1,ppm.preparation_name,ppm.preparation_id,pm.product_uom_unit,pm.product_uom_id FROM  pharma_product_master pm inner join pharma_preparation_master ppm on ppm.preparation_id=pm.product_preparation_id where pm.product_id="+productId);
			
				
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = query.list();		          
			    for(Map<String, Object> row : masterRow){
			    			    	
			    	ProductMaster obj = new ProductMaster();
			    	obj.setProductID((Integer)row.get("product_id"));		    	
			       obj.setProductname((String)row.get("product_name"));	
			       obj.setPrescriptionName((String)row.get("preparation_name"));
			       obj.setPrescrioptionID((Integer)row.get("preparation_id"));
			       obj.setStrength((Double)row.get("product_uom_unit"));
			       
			       obj.setUnit((Integer)row.get("product_uom_id"));
			       
			       pmlist.add(obj);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pmlist;
	}
}