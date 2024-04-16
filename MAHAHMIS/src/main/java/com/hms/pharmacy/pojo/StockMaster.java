package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name = "pharma_stock_master")
public class StockMaster implements Serializable {
	@Id
	@GeneratedValue
	@Column(name = "stock_id")
	private Integer stockId;

	@ManyToOne
	@JoinColumn(name = "stock_product_id")
	private ProductMaster stockProductMaster;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "stock_batch_id")
	private BatchMaster batchMaster;

	@Column(name = "stock_qty_in_hand")
	private Double stockQtyInHand;

	@Column(name = "stock_qty_on_order")
	private Integer stockQtyOnOrder;

	@Column(name = "stock_year_id")
	private Integer stockYearId;

	@Column(name = "stock_delete_flag")
	private Integer stockDeleteFlag;

	@Column(name = "stock_update_date")
	private Date stockUpdateDate;
	
	@Column(name="unit_id")
	private Integer unitId;

	@JsonIgnore
	public BatchMaster getBatchMaster() {
		return batchMaster;
	}

	public void setBatchMaster(BatchMaster batchMaster) {
		this.batchMaster = batchMaster;
	}

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Double getStockQtyInHand() {
		return stockQtyInHand;
	}

	public void setStockQtyInHand(Double stockQtyInHand) {
		this.stockQtyInHand = stockQtyInHand;
	}

	@JsonIgnore
	public ProductMaster getStockProductMaster() {
		return stockProductMaster;
	}

	public void setStockProductMaster(ProductMaster stockProductMaster) {
		this.stockProductMaster = stockProductMaster;
	}

	public Integer getStockQtyOnOrder() {
		return stockQtyOnOrder;
	}

	public void setStockQtyOnOrder(Integer stockQtyOnOrder) {
		this.stockQtyOnOrder = stockQtyOnOrder;
	}

	public Integer getStockYearId() {
		return stockYearId;
	}

	public void setStockYearId(Integer stockYearId) {
		this.stockYearId = stockYearId;
	}

	public Integer getStockDeleteFlag() {
		return stockDeleteFlag;
	}

	public void setStockDeleteFlag(Integer stockDeleteFlag) {
		this.stockDeleteFlag = stockDeleteFlag;
	}

	public Date getStockUpdateDate() {
		return stockUpdateDate;
	}

	public void setStockUpdateDate(Date stockUpdateDate) {
		this.stockUpdateDate = stockUpdateDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	
	
}
