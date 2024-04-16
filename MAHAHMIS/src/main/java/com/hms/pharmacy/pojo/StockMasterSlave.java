package com.hms.pharmacy.pojo;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;



@Entity
@Table(name="stock_master_slave")
public class StockMasterSlave {

	@Id
	@Column(name="stock_master_slave_id")
	@GeneratedValue
	private int id;
	
	@Temporal(TemporalType.DATE)
	@Column(name="operation_date")
	private Date opDate;
	
	@Column(name="stock_in",columnDefinition="int default 0")
	private int stockInQty;
	
	@Column(name="stock_out",columnDefinition="int default 0")
	private int stockOutQty;
	
	@Column(name="trans_type")
	private String transType;
	
	@Column(name="invoice_id")
	private int invoiceId;
	
	@Column(name="product_id")
	private int productId;
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="tretment_id",columnDefinition="int default 0")
	private int tretmentId;
	
	@Column(name="batch_id")
	private int batchId;
	
	@Column(name="batch_code")
	private String batchCode;
	
	@Column(name="store_id",columnDefinition="int default 0")
	private int storeId;
	
	@Column(name="created_by")
	private int createdBy;
	
	@Column(name="unit_id")
	private int unitId;
	
	@Column(name="pur_rate")
	private double purRate;
	
	@Column(name="mrp")
	private double MRP;
	
	@Column(name="curr_stock",columnDefinition="int default 0")
	private int currStock;
	
	@Column(name="delete_flag",columnDefinition="int default 0")
	private int deleteFlag;
	
	@Column(name="gst")
	private double gst;
	
	@Column(name="igst")
	private double igst;
	
	@Column(name="cess")
	private double cess;
	
	@Column(name="vendor_id",columnDefinition="int default 0")
	private int vendorId;
	
	@Column(name="discount")
	private double disc;
	
	@Transient
	private List<StockMasterSlave> lststockmasterslave;
	
	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public double getDisc() {
		return disc;
	}

	public void setDisc(double disc) {
		this.disc = disc;
	}

	public double getGst() {
		return gst;
	}

	public void setGst(double gst) {
		this.gst = gst;
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

	public int getVendorId() {
		return vendorId;
	}

	public void setVendorId(int vendorId) {
		this.vendorId = vendorId;
	}

	public int getDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(int deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getOpDate() {
		return opDate;
	}

	public void setOpDate(Date opDate) {
		this.opDate = opDate;
	}

	public int getStockInQty() {
		return stockInQty;
	}

	public void setStockInQty(int stockInQty) {
		this.stockInQty = stockInQty;
	}

	public int getStockOutQty() {
		return stockOutQty;
	}

	public void setStockOutQty(int stockOutQty) {
		this.stockOutQty = stockOutQty;
	}

	public String getTransType() {
		return transType;
	}

	public void setTransType(String transType) {
		this.transType = transType;
	}

	public int getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(int invoiceId) {
		this.invoiceId = invoiceId;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getTretmentId() {
		return tretmentId;
	}

	public void setTretmentId(int tretmentId) {
		this.tretmentId = tretmentId;
	}

	public int getBatchId() {
		return batchId;
	}

	public void setBatchId(int batchId) {
		this.batchId = batchId;
	}

	public String getBatchCode() {
		return batchCode;
	}

	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}

	public int getStoreId() {
		return storeId;
	}

	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public double getPurRate() {
		return purRate;
	}

	public void setPurRate(double purRate) {
		this.purRate = purRate;
	}

	public double getMRP() {
		return MRP;
	}

	public void setMRP(double mRP) {
		this.MRP = mRP;
	}

	public int getCurrStock() {
		return currStock;
	}

	public void setCurrStock(int currStock) {
		this.currStock = currStock;
	}

	public List<StockMasterSlave> getLststockmasterslave() {
		return lststockmasterslave;
	}

	public void setLststockmasterslave(List<StockMasterSlave> lststockmasterslave) {
		this.lststockmasterslave = lststockmasterslave;
	}
	
	
}
