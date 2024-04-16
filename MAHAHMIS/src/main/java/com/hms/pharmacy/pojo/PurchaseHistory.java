package com.hms.pharmacy.pojo;

import java.util.Date;

import javax.persistence.Transient;

public class PurchaseHistory {
	private String productid;
	private String productName;
	private String batchCode;
	private String batchExpDate;
	private String clearStock;

	private String netRate;
	private String MRP;
	private String saleRate;
//	private String billRate;
	private String purchaseRate;
	
	private String lastPurchaseFrom;
	private String billNo;
	private String billDate;

	private String batchId;
	private String stockId;
	
	private String vat;
	private String purchaseId;
	private String purchaseSlaveId;
	
	private String StockDetails;
	private String productUnit;
	private String productPack;
	private String productComp;
	private String currentStock;
	private String shelfName;
	private String drugName;
	private String productPrescription;
	
	private String productCategoryId;
	
	private String productpre;
	
	private String schemeStock;
	
	private String batch_code;
	
	private String batch_exp_date;
	
	private double mrp;
	
	private double stock_qty_in_hand;
	
	private Integer batch_id;
	
	private Integer stock_id;
 
	private double bill_rate;
	
	private String vendor_name;
	private String pur_bill_no;
	private Date pur_bill_date;
	private double pur_rate;
	private double gst;
	private Integer pur_id;
	private Integer pur_slave_id;
	private double pur_slave_scheme;
	private String product_name;
	private Double product_uom_unit;
	private String pack_type;
	private String comp_name;
	private Integer product_id;
	private String shelf_name;
	private String drug_name;
	private Integer product_prescription;
	private Integer cat_id;
	private double igst;
	private double cess;
	
	private double opening_mrp;
	private double opening_rate;
	private double opening_pur_rate;
	private String product_hsn;
	private String preparation_name;
	
	private int opening_stock_id;
	
	
	public int getOpening_stock_id() {
		return opening_stock_id;
	}

	public void setOpening_stock_id(int opening_stock_id) {
		this.opening_stock_id = opening_stock_id;
	}

	public String getPreparation_name() {
		return preparation_name;
	}

	public void setPreparation_name(String preparation_name) {
		this.preparation_name = preparation_name;
	}

	public double getOpening_mrp() {
		return opening_mrp;
	}

	public void setOpening_mrp(double opening_mrp) {
		this.opening_mrp = opening_mrp;
	}

	public double getOpening_rate() {
		return opening_rate;
	}

	public void setOpening_rate(double opening_rate) {
		this.opening_rate = opening_rate;
	}

	public double getOpening_pur_rate() {
		return opening_pur_rate;
	}

	public void setOpening_pur_rate(double opening_pur_rate) {
		this.opening_pur_rate = opening_pur_rate;
	}

	public String getProduct_hsn() {
		return product_hsn;
	}

	public void setProduct_hsn(String product_hsn) {
		this.product_hsn = product_hsn;
	}

	public Integer getBatch_id() {
		return batch_id;
	}

	public void setBatch_id(Integer batch_id) {
		this.batch_id = batch_id;
	}

	public Integer getStock_id() {
		return stock_id;
	}

	public void setStock_id(Integer stock_id) {
		this.stock_id = stock_id;
	}

	public double getBill_rate() {
		return bill_rate;
	}

	public void setBill_rate(double bill_rate) {
		this.bill_rate = bill_rate;
	}

	public double getStock_qty_in_hand() {
		return stock_qty_in_hand;
	}

	public void setStock_qty_in_hand(double stock_qty_in_hand) {
		this.stock_qty_in_hand = stock_qty_in_hand;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	@Transient
	private double rate;
	
	public double getMrp() {
		return mrp;
	}

	public void setMrp(double mrp) {
		this.mrp = mrp;
	}

	public String getBatch_exp_date() {
		return batch_exp_date;
	}

	public void setBatch_exp_date(String batch_exp_date) {
		this.batch_exp_date = batch_exp_date;
	}

	public String getProductpre() {
		return productpre;
	}

	public void setProductpre(String productpre) {
		this.productpre = productpre;
	}

	public String getProductCategoryId() {
		return productCategoryId;
	}

	public void setProductCategoryId(String productCategoryId) {
		this.productCategoryId = productCategoryId;
	}

	public String getProductPrescription() {
		return productPrescription;
	}

	public void setProductPrescription(String productPrescription) {
		this.productPrescription = productPrescription;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public String getShelfName() {
		return shelfName;
	}

	public void setShelfName(String shelfName) {
		this.shelfName = shelfName;
	}

	public String getCurrentStock() {
		return currentStock;
	}

	public void setCurrentStock(String currentStock) {
		this.currentStock = currentStock;
	}

	public String getProductUnit() {
		return productUnit;
	}

	public void setProductUnit(String productUnit) {
		this.productUnit = productUnit;
	}

	public String getProductPack() {
		return productPack;
	}

	public void setProductPack(String productPack) {
		this.productPack = productPack;
	}

	public String getProductComp() {
		return productComp;
	}

	public void setProductComp(String productComp) {
		this.productComp = productComp;
	}
	
	public String getStockDetails() {
		return StockDetails;
	}

	public void setStockDetails(String stockDetails) {
		StockDetails = stockDetails;
	}

	public String getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}

	public String getPurchaseSlaveId() {
		return purchaseSlaveId;
	}

	public void setPurchaseSlaveId(String purchaseSlaveId) {
		this.purchaseSlaveId = purchaseSlaveId;
	}

	public String getVat() {
		return vat;
	}

	public void setVat(String vat) {
		this.vat = vat;
	}

	public String getPurchaseRate() {
		return purchaseRate;
	}

	public void setPurchaseRate(String purchaseRate) {
		this.purchaseRate = purchaseRate;
	}

	public String getNetRate() {
		return netRate;
	}

	public void setNetRate(String netRate) {
		this.netRate = netRate;
	}

	public String getSaleRate() {
		return saleRate;
	}

	public void setSaleRate(String saleRate) {
		this.saleRate = saleRate;
	}

	/*
	 * public String getBillRate() { return billRate; }
	 * 
	 * public void setBillRate(String billRate) { this.billRate = billRate; }
	 */

	public String getLastPurchaseFrom() {
		return lastPurchaseFrom;
	}

	public void setLastPurchaseFrom(String lastPurchaseFrom) {
		this.lastPurchaseFrom = lastPurchaseFrom;
	}

	public String getBillNo() {
		return billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	public String getBillDate() {
		return billDate;
	}

	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}

	public String getStockId() {
		return stockId;
	}

	public void setStockId(String stockId) {
		this.stockId = stockId;
	}

	public String getBatchId() {
		return batchId;
	}

	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}

	public String getProductid() {
		return productid;
	}

	public void setProductid(String productid) {
		this.productid = productid;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getBatchCode() {
		return batchCode;
	}

	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}

	public String getBatchExpDate() {
		return batchExpDate;
	}

	public void setBatchExpDate(String batchExpDate) {
		this.batchExpDate = batchExpDate;
	}

	public String getClearStock() {
		return clearStock;
	}

	public void setClearStock(String clearStock) {
		this.clearStock = clearStock;
	}

	public String getMRP() {
		return MRP;
	}

	public void setMRP(String mRP) {
		MRP = mRP;
	}

	public String getSchemeStock() {
		return schemeStock;
	}

	public void setSchemeStock(String schemeStock) {
		schemeStock = schemeStock;
	}

	public String getBatch_code() {
		return batch_code;
	}

	public void setBatch_code(String batch_code) {
		this.batch_code = batch_code;
	}
	
	public String getVendor_name() {
		return vendor_name;
	}

	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}

	public String getPur_bill_no() {
		return pur_bill_no;
	}

	public void setPur_bill_no(String pur_bill_no) {
		this.pur_bill_no = pur_bill_no;
	}

	public Date getPur_bill_date() {
		return pur_bill_date;
	}

	public void setPur_bill_date(Date pur_bill_date) {
		this.pur_bill_date = pur_bill_date;
	}

	public double getPur_rate() {
		return pur_rate;
	}

	public void setPur_rate(double pur_rate) {
		this.pur_rate = pur_rate;
	}

	public double getGst() {
		return gst;
	}

	public void setGst(double gst) {
		this.gst = gst;
	}

	public Integer getPur_id() {
		return pur_id;
	}

	public void setPur_id(Integer pur_id) {
		this.pur_id = pur_id;
	}

	public Integer getPur_slave_id() {
		return pur_slave_id;
	}

	public void setPur_slave_id(Integer pur_slave_id) {
		this.pur_slave_id = pur_slave_id;
	}

	public double getPur_slave_scheme() {
		return pur_slave_scheme;
	}

	public void setPur_slave_scheme(double pur_slave_scheme) {
		this.pur_slave_scheme = pur_slave_scheme;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public Double getProduct_uom_unit() {
		return product_uom_unit;
	}

	public void setProduct_uom_unit(Double product_uom_unit) {
		this.product_uom_unit = product_uom_unit;
	}

	public String getPack_type() {
		return pack_type;
	}

	public void setPack_type(String pack_type) {
		this.pack_type = pack_type;
	}

	public String getComp_name() {
		return comp_name;
	}

	public void setComp_name(String comp_name) {
		this.comp_name = comp_name;
	}

	public Integer getProduct_id() {
		return product_id;
	}

	public void setProduct_id(Integer product_id) {
		this.product_id = product_id;
	}

	public String getShelf_name() {
		return shelf_name;
	}

	public void setShelf_name(String shelf_name) {
		this.shelf_name = shelf_name;
	}

	public String getDrug_name() {
		return drug_name;
	}

	public void setDrug_name(String drug_name) {
		this.drug_name = drug_name;
	}

	public Integer getProduct_prescription() {
		return product_prescription;
	}

	public void setProduct_prescription(Integer product_prescription) {
		this.product_prescription = product_prescription;
	}

	public Integer getCat_id() {
		return cat_id;
	}

	public void setCat_id(Integer cat_id) {
		this.cat_id = cat_id;
	}

	public double getIgst() {
		return igst;
	}

	public void setIgst(double igst) {
		this.igst = igst;
	}

	public double getCess() {
		return cess;
	}

	public void setCess(double cess) {
		this.cess = cess;
	}
	
	
}
