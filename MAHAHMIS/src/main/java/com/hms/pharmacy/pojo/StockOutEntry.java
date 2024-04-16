package com.hms.pharmacy.pojo;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pharma_stock_out_entry")
public class StockOutEntry 
{
	@Id
	@GeneratedValue
	@Column(name = "pur_stock_out_id")
	private Integer stockOutId;
	
	@Column(name = "stock_out_batchId")
	private Integer stockBatchId;
	
	@Column(name = "stock_out_productid")
	private Integer productId;
	
	
	@Column(name = "stock_out_stockId")
	private Integer stockId;
	
	@Column(name="stock_out_delete_flag")
	private Integer stockOutDeleteFlag;
	
	@Column(name = "stock_out_qty")
	private Integer qty=0;
		
	@Column(name="stock_out_closing_stock")
	private BigInteger stockOutClosingStock;
	
	@Column(name = "stock_out_date")
	private Date stockOutDate;
	
	@Column(name="stock_entry_type")
	private int stockEntryType=0;
	
	@Column(name="stock_out_current_stock")
	private BigInteger stockOutCurrentStock;
	
	@Column(name = "stock_out_entry_time")
	private String time=null;
	
	@Column(name = "physical_stock")
	private BigInteger physicalStock;
	
	@Column(name ="voucher_no")
	private String voucher_no;
	
	@CreationTimestamp
	@Column(name="created_date_time")
	private Date createdDateTime;
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	 
	//added by Akshata 
	@Transient
	List<StockOutEntry> lstStockOutEnrty;
	
	//Transient field for get data from Store procedure
	@Transient
	private Integer pur_stock_out_id ;
	@Transient
	private String product_name;
	@Transient
	private String batch_code;
	@Transient
	private BigInteger phy_stock;
	@Transient
	private String vou_no;
	@Transient
	private String batch_exp_date;
	@Transient
	private Integer product_id;
	@Transient
	private Integer batch_id;
	@Transient
	private BigInteger stock_out_current_stock;
	@Transient
	private BigInteger stock_out_closing_stock;
	@Transient 
	private Integer stock_id;
	@Transient
	private double stock_qty_in_hand;
	
   public String getVoucher_no() {
		return voucher_no;
	}

	public void setVoucher_no(String voucher_no) {
		this.voucher_no = voucher_no;
	}

	public void setPhysicalStock(BigInteger physicalStock) {
		this.physicalStock = physicalStock;
	}


	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public BigInteger getStockOutCurrentStock() {
		return stockOutCurrentStock;
	}

	public void setStockOutCurrentStock(BigInteger stockOutCurrentStock) {
		this.stockOutCurrentStock = stockOutCurrentStock;
	}

	public Integer getStockOutId() {
		return stockOutId;
	}

	public void setStockOutId(Integer stockOutId) {
		this.stockOutId = stockOutId;
	}
	
	public Integer getStockBatchId() {
		return stockBatchId;
	}

	public void setStockBatchId(Integer stockBatchId) {
		this.stockBatchId = stockBatchId;
	}

	public BigInteger getPhysicalStock() {
		return physicalStock;
	}

	/*
	 * public void setPhysicalStock(BigInteger physicalStock) { this.physicalStock =
	 * physicalStock; }
	 */

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Integer getStockOutDeleteFlag() {
		return stockOutDeleteFlag;
	}

	public void setStockOutDeleteFlag(Integer stockOutDeleteFlag) {
		this.stockOutDeleteFlag = stockOutDeleteFlag;
	}

	
	
	public Integer getQty() {
		return qty;
	}

	public void setQty(Integer qty) {
		this.qty = qty;
	}

	
	public BigInteger getStockOutClosingStock() {
		return stockOutClosingStock;
	}

	public void setStockOutClosingStock(BigInteger stockOutClosingStock) {
		this.stockOutClosingStock = stockOutClosingStock;
	}


	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Date getStockOutDate() {
		return stockOutDate;
	}

	public void setStockOutDate(Date stockOutDate) {
		this.stockOutDate = stockOutDate;
	}

	public int getStockEntryType() {
		return stockEntryType;
	}

	public void setStockEntryType(int stockEntryType) {
		this.stockEntryType = stockEntryType;
	}

	public List<StockOutEntry> getLstStockOutEnrty() {
		return lstStockOutEnrty;
	}

	public void setLstStockOutEnrty(List<StockOutEntry> lstStockOutEnrty) {
		this.lstStockOutEnrty = lstStockOutEnrty;
	}

	public Integer getPur_stock_out_id() {
		return pur_stock_out_id;
	}

	public void setPur_stock_out_id(Integer pur_stock_out_id) {
		this.pur_stock_out_id = pur_stock_out_id;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public String getBatch_code() {
		return batch_code;
	}

	public void setBatch_code(String batch_code) {
		this.batch_code = batch_code;
	}




	public BigInteger getPhy_stock() {
		return phy_stock;
	}

	public void setPhy_stock(BigInteger phy_stock) {
		this.phy_stock = phy_stock;
	}

	public String getVou_no() {
		return vou_no;
	}

	public void setVou_no(String vou_no) {
		this.vou_no = vou_no;
	}

	public String getBatch_exp_date() {
		return batch_exp_date;
	}

	public void setBatch_exp_date(String batch_exp_date) {
		this.batch_exp_date = batch_exp_date;
	}

	public Integer getProduct_id() {
		return product_id;
	}

	public void setProduct_id(Integer product_id) {
		this.product_id = product_id;
	}

	public Integer getBatch_id() {
		return batch_id;
	}

	public void setBatch_id(Integer batch_id) {
		this.batch_id = batch_id;
	}

	public BigInteger getStock_out_current_stock() {
		return stock_out_current_stock;
	}

	public void setStock_out_current_stock(BigInteger stock_out_current_stock) {
		this.stock_out_current_stock = stock_out_current_stock;
	}

	public BigInteger getStock_out_closing_stock() {
		return stock_out_closing_stock;
	}

	public void setStock_out_closing_stock(BigInteger stock_out_closing_stock) {
		this.stock_out_closing_stock = stock_out_closing_stock;
	}

	public Integer getStock_id() {
		return stock_id;
	}

	public void setStock_id(Integer stock_id) {
		this.stock_id = stock_id;
	}

	public double getStock_qty_in_hand() {
		return stock_qty_in_hand;
	}

	public void setStock_qty_in_hand(double stock_qty_in_hand) {
		this.stock_qty_in_hand = stock_qty_in_hand;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}
	
	
}