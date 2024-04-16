package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="inv_item_purchase_slave")
public class ItemPurchaseSlaveDto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@CreationTimestamp
	@Column(name="created_date_time",updatable= false)
	private Date createdDateTime;

	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="created_by",updatable = false)
	private int createdBy;
	
	@Column(name="updated_by")
	private int updatedBy;
	
	@Column(name="deleted_by")
	private int deleted_by;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	@Temporal(TemporalType.TIMESTAMP)
	
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name="purchase_uom_factor_1")
	private Integer purchaseUomFactor1;
	
	@Column(name="purchase_uom_factor_2")
	private Integer purchaseUomFactor2;
	
	@Column(name="purchase_uom_factor_3")
	private Integer purchaseUomFactor3;
	
	@Column(name="purchase_uom_factor_4")
	private Integer purchaseUomFactor4;
	
	@Column(name="purchase_factor_uom_1")
	private Integer purchaseFactorUom1;
	
	@Column(name="purchase_factor_uom_2")
	private Integer purchaseFactorUom2;
	
	@Column(name="purchase_factor_uom_3")
	private Integer purchaseFactorUom3;
	
	@Column(name="purchase_factor_uom_4")
	private Integer purchaseFactorUom4;
	
	@Column(name="purchase_unit_price_1")
	private Double purchaseUnitPrice1;
	
	@Column(name="purchase_unit_price_2")
	private Double purchaseUnitPrice2;
	
	@Column(name="purchase_unit_price_3")
	private Double purchaseUnitPrice3;
	
	@Column(name="purchase_unit_price_4")
	private Double purchaseUnitPrice4;
	
	@Column(name="hidden_factor_value")
	private Integer hiddenFactorValue;
	
	@Column(name="hidden_factor_cost")
	private Integer hiddenFactorCost;
	
	@Column(name="hidden_last_uom")
	private Integer hiddenLastUom;
	
	@Column(name="uom_unit_one_name")
	private String uomUnitOneName;
	
	@Column(name="uom_unit_two_name")
	private String uomUnitTwoName;
	
	@Column(name="uom_unit_three_name")
	private String uomUnitThreeName;
	
	@Column(name="uom_unit_four_name")
	private String uomUnitFourName;

	@Transient
	private List<ItemPurchaseSlaveDto> lstItemPurchaseSlave;

	public List<ItemPurchaseSlaveDto> getLstItemPurchaseSlave() {
		return lstItemPurchaseSlave;
	}

	public void setLstItemPurchaseSlave(
			List<ItemPurchaseSlaveDto> lstItemPurchaseSlave) {
		this.lstItemPurchaseSlave = lstItemPurchaseSlave;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public int getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getPurchaseUomFactor1() {
		return purchaseUomFactor1;
	}

	public void setPurchaseUomFactor1(Integer purchaseUomFactor1) {
		this.purchaseUomFactor1 = purchaseUomFactor1;
	}

	public Integer getPurchaseUomFactor2() {
		return purchaseUomFactor2;
	}

	public void setPurchaseUomFactor2(Integer purchaseUomFactor2) {
		this.purchaseUomFactor2 = purchaseUomFactor2;
	}

	public Integer getPurchaseUomFactor3() {
		return purchaseUomFactor3;
	}

	public void setPurchaseUomFactor3(Integer purchaseUomFactor3) {
		this.purchaseUomFactor3 = purchaseUomFactor3;
	}

	public Integer getPurchaseUomFactor4() {
		return purchaseUomFactor4;
	}

	public void setPurchaseUomFactor4(Integer purchaseUomFactor4) {
		this.purchaseUomFactor4 = purchaseUomFactor4;
	}
	
	

	public Integer getPurchaseFactorUom1() {
		return purchaseFactorUom1;
	}

	public void setPurchaseFactorUom1(Integer purchaseFactorUom1) {
		this.purchaseFactorUom1 = purchaseFactorUom1;
	}

	public Integer getPurchaseFactorUom2() {
		return purchaseFactorUom2;
	}

	public void setPurchaseFactorUom2(Integer purchaseFactorUom2) {
		this.purchaseFactorUom2 = purchaseFactorUom2;
	}

	public Integer getPurchaseFactorUom3() {
		return purchaseFactorUom3;
	}

	public void setPurchaseFactorUom3(Integer purchaseFactorUom3) {
		this.purchaseFactorUom3 = purchaseFactorUom3;
	}

	public Integer getPurchaseFactorUom4() {
		return purchaseFactorUom4;
	}

	public void setPurchaseFactorUom4(Integer purchaseFactorUom4) {
		this.purchaseFactorUom4 = purchaseFactorUom4;
	}

	public Double getPurchaseUnitPrice1() {
		return purchaseUnitPrice1;
	}

	public void setPurchaseUnitPrice1(Double purchaseUnitPrice1) {
		this.purchaseUnitPrice1 = purchaseUnitPrice1;
	}

	public Double getPurchaseUnitPrice2() {
		return purchaseUnitPrice2;
	}

	public void setPurchaseUnitPrice2(Double purchaseUnitPrice2) {
		this.purchaseUnitPrice2 = purchaseUnitPrice2;
	}

	public Double getPurchaseUnitPrice3() {
		return purchaseUnitPrice3;
	}

	public void setPurchaseUnitPrice3(Double purchaseUnitPrice3) {
		this.purchaseUnitPrice3 = purchaseUnitPrice3;
	}

	public Double getPurchaseUnitPrice4() {
		return purchaseUnitPrice4;
	}

	public void setPurchaseUnitPrice4(Double purchaseUnitPrice4) {
		this.purchaseUnitPrice4 = purchaseUnitPrice4;
	}

	public Integer getHiddenFactorValue() {
		return hiddenFactorValue;
	}

	public void setHiddenFactorValue(Integer hiddenFactorValue) {
		this.hiddenFactorValue = hiddenFactorValue;
	}

	public Integer getHiddenFactorCost() {
		return hiddenFactorCost;
	}

	public void setHiddenFactorCost(Integer hiddenFactorCost) {
		this.hiddenFactorCost = hiddenFactorCost;
	}

	public Integer getHiddenLastUom() {
		return hiddenLastUom;
	}

	public void setHiddenLastUom(Integer hiddenLastUom) {
		this.hiddenLastUom = hiddenLastUom;
	}

	public String getUomUnitOneName() {
		return uomUnitOneName;
	}

	public void setUomUnitOneName(String uomUnitOneName) {
		this.uomUnitOneName = uomUnitOneName;
	}

	public String getUomUnitTwoName() {
		return uomUnitTwoName;
	}

	public void setUomUnitTwoName(String uomUnitTwoName) {
		this.uomUnitTwoName = uomUnitTwoName;
	}

	public String getUomUnitThreeName() {
		return uomUnitThreeName;
	}

	public void setUomUnitThreeName(String uomUnitThreeName) {
		this.uomUnitThreeName = uomUnitThreeName;
	}

	public String getUomUnitFourName() {
		return uomUnitFourName;
	}

	public void setUomUnitFourName(String uomUnitFourName) {
		this.uomUnitFourName = uomUnitFourName;
	}

	@Override
	public String toString() {
		return "ItemPurchaseSlaveDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by
				+ ", deleted=" + deleted + ", deletedDate=" + deletedDate
				+ ", unitId=" + unitId + ", purchaseUomFactor1="
				+ purchaseUomFactor1 + ", purchaseUomFactor2="
				+ purchaseUomFactor2 + ", purchaseUomFactor3="
				+ purchaseUomFactor3 + ", purchaseUomFactor4="
				+ purchaseUomFactor4 + ", purchaseFactorUom1="
				+ purchaseFactorUom1 + ", purchaseFactorUom2="
				+ purchaseFactorUom2 + ", purchaseFactorUom3="
				+ purchaseFactorUom3 + ", purchaseFactorUom4="
				+ purchaseFactorUom4 + ", purchaseUnitPrice1="
				+ purchaseUnitPrice1 + ", purchaseUnitPrice2="
				+ purchaseUnitPrice2 + ", purchaseUnitPrice3="
				+ purchaseUnitPrice3 + ", purchaseUnitPrice4="
				+ purchaseUnitPrice4 + ", hiddenFactorValue="
				+ hiddenFactorValue + ", hiddenFactorCost=" + hiddenFactorCost
				+ ", hiddenLastUom=" + hiddenLastUom + ", uomUnitOneName="
				+ uomUnitOneName + ", uomUnitTwoName=" + uomUnitTwoName
				+ ", uomUnitThreeName=" + uomUnitThreeName
				+ ", uomUnitFourName=" + uomUnitFourName
				+ ", lstItemPurchaseSlave=" + lstItemPurchaseSlave + "]";
	}
	
	
}
