package com.hms.inventory.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
@Table(name="inv_item_master_new")
public class ItemMasterDto implements Serializable{
	@Transient
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@CreationTimestamp
	@Column(name="created_date_time" ,updatable = false)
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
	
	@Column(name="category_type")
	private String categoryType;
	
	@Column(name="max_stock")
	private Integer maxStock;
	
	@Column(name="order_stock")
	private Integer orderStock;
	
	@Column(name="reorder_stock")
	private Integer reorderStock;
	
	@Column(name="lead_time")
	private String leadTime;
	
	@Column(name="priority")
	private String priority;
	
	@Column(name="purchase_strategy")
	private String purchaseStrategy;
	
	@Column(name="criticality")
	private String criticality;
	
	@Column(name="form_type")
	private String formType;
	
	@Column(name="item_name")
	private String itemName;
	
	@Column(name="status")
	private String status;
	
	@Column(name="inv_item_status")
	private Integer invItemStatus;
	
	@Column(name="purchase_item_status")
	private Integer purchaseItemStatus;
	
	@Column(name="asset_item_status")
	private Integer assetItemStatus;
	
	@Column(name="issue_item_status")
	private Integer issueItemStatus;
	
	@Column(name="laundry_item_status")
	private Integer laundryItemStatus;
	
	@Column(name="css_item_status")
	private Integer cssItemStatus;
	
	@Column(name="reagent_item_status")
	private Integer reagentItemStatus;
	
	@Column(name="consumable_item_status")
	private Integer consumableItemStatus;
	
	@Column(name="batch_wise")
	private String batchWise;
	
	@Column(name="gst_code")
	private String gstCode;
	
	@Column(name="company_name")
	private String companyName;
	
	@Column(name="alice_name")
	private String aliceName;
	
	@Column(name="hsn_name")
	private String hsnName;
	
	@Column(name="hsn_name_value")
	private String hsnNameValue;
	
	@Column(name="cgst")
	private Float cgst;
	
	@Column(name="sgst")
	private Float sgst;
	
	@Column(name="tax_name")
	private String taxName;
	
	@Column(name="tax_rate")
	private Float taxRate;
	
	@Column(name="lead_time_unit")
	private String leadTimeUnit;
	
	@Column(name="lab_equipment_status")
	private Integer labEquipmentStatus;
	
	// this is added by vishnu for service item 
	@Column(name="service_item_status")
	private Integer serviceItemStatus;
	
	@Column(name="license_item_status")
	private Integer licenseItemStatus;
	
	@Column(name="category_id")
	private Integer categoryId;//added by dayanand to save categoryid(13-3-2020)
	
	//added by Vishnu Thorat to save isReordered(21-01-2021)
	@Column(name = "is_reordered",columnDefinition="varchar(2) default 'N'")
	private String isReordered="N";
	
	//added by Vishant  to save
	@Column(name="is_lnl",columnDefinition="varchar(255) default '-'")
	private String isLnL;
	
	@Transient
	private BigDecimal currentSubInventoryStock;
	
	@Transient
	private Integer noOfPages;

	@Transient
	private int avalible_quantity;
	
	@Transient
	private List<ItemMasterDto> lstItemMaster;
	
	@Transient
	ItemMaintenanceSlaveDto itemMaintenanceSlaveDto;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="item_master_id")
	private List<ItemPurchaseSlaveDto> itemPurchaseSlaveDto;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="item_master_id")
	private List<ItemSalesSlaveDto> itemSalesSlaveDto;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="item_master_id")
	private List<ItemPartySlaveDto> itemPartySlaveDto;
	
	//added by Rohit 09-06-2020
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="item_master_id")
	private List<ItemContractSlaveDto> itemContractSlaveDto;
	
	public Integer getNoOfPages() {
		return noOfPages;
	}
	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}

	public List<ItemSalesSlaveDto> getItemSalesSlaveDto() {
		return itemSalesSlaveDto;
	}
	public void setItemSalesSlaveDto(List<ItemSalesSlaveDto> itemSalesSlaveDto) {
		this.itemSalesSlaveDto = itemSalesSlaveDto;
	}
	public List<ItemMasterDto> getLstItemMaster() {
		return lstItemMaster;
	}
	public void setLstItemMaster(List<ItemMasterDto> lstItemMaster) {
		this.lstItemMaster = lstItemMaster;
	}
	
	public List<ItemPurchaseSlaveDto> getItemPurchaseSlaveDto() {
		return itemPurchaseSlaveDto;
	}
	public void setItemPurchaseSlaveDto(
			List<ItemPurchaseSlaveDto> itemPurchaseSlaveDto) {
		this.itemPurchaseSlaveDto = itemPurchaseSlaveDto;
	}
	
	public String getLeadTimeUnit() {
		return leadTimeUnit;
	}
	public void setLeadTimeUnit(String leadTimeUnit) {
		this.leadTimeUnit = leadTimeUnit;
	}
	public String getBatchWise() {
		return batchWise;
	}
	public void setBatchWise(String batchWise) {
		this.batchWise = batchWise;
	}
	public String getGstCode() {
		return gstCode;
	}
	public void setGstCode(String gstCode) {
		this.gstCode = gstCode;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getAliceName() {
		return aliceName;
	}
	public void setAliceName(String aliceName) {
		this.aliceName = aliceName;
	}
	public String getFormType() {
		return formType;
	}
	public void setFormType(String formType) {
		this.formType = formType;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
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
	public String getCategoryType() {
		return categoryType;
	}
	public void setCategoryType(String categoryType) {
		this.categoryType = categoryType;
	}
	public Integer getMaxStock() {
		return maxStock;
	}
	public void setMaxStock(Integer maxStock) {
		this.maxStock = maxStock;
	}
	public Integer getOrderStock() {
		return orderStock;
	}
	public void setOrderStock(Integer orderStock) {
		this.orderStock = orderStock;
	}
	public Integer getReorderStock() {
		return reorderStock;
	}
	public void setReorderStock(Integer reorderStock) {
		this.reorderStock = reorderStock;
	}
	public String getLeadTime() {
		return leadTime;
	}
	public void setLeadTime(String leadTime) {
		this.leadTime = leadTime;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public String getPurchaseStrategy() {
		return purchaseStrategy;
	}
	public void setPurchaseStrategy(String purchaseStrategy) {
		this.purchaseStrategy = purchaseStrategy;
	}
	public String getCriticality() {
		return criticality;
	}
	public void setCriticality(String criticality) {
		this.criticality = criticality;
	}
	public Integer getInvItemStatus() {
		return invItemStatus;
	}
	public void setInvItemStatus(Integer invItemStatus) {
		this.invItemStatus = invItemStatus;
	}
	public Integer getPurchaseItemStatus() {
		return purchaseItemStatus;
	}
	public void setPurchaseItemStatus(Integer purchaseItemStatus) {
		this.purchaseItemStatus = purchaseItemStatus;
	}
	public Integer getAssetItemStatus() {
		return assetItemStatus;
	}
	public void setAssetItemStatus(Integer assetItemStatus) {
		this.assetItemStatus = assetItemStatus;
	}
	public Integer getIssueItemStatus() {
		return issueItemStatus;
	}
	public void setIssueItemStatus(Integer issueItemStatus) {
		this.issueItemStatus = issueItemStatus;
	}
	public Integer getLaundryItemStatus() {
		return laundryItemStatus;
	}
	public void setLaundryItemStatus(Integer laundryItemStatus) {
		this.laundryItemStatus = laundryItemStatus;
	}
	
	public Integer getCssItemStatus() {
		return cssItemStatus;
	}
	public void setCssItemStatus(Integer cssItemStatus) {
		this.cssItemStatus = cssItemStatus;
	}
	public String getHsnName() {
		return hsnName;
	}
	public void setHsnName(String hsnName) {
		this.hsnName = hsnName;
	}
	public Float getCgst() {
		return cgst;
	}
	public void setCgst(Float cgst) {
		this.cgst = cgst;
	}
	public Float getSgst() {
		return sgst;
	}
	public void setSgst(Float sgst) {
		this.sgst = sgst;
	}
	public String getTaxName() {
		return taxName;
	}
	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}
	public Float getTaxRate() {
		return taxRate;
	}
	public void setTaxRate(Float taxRate) {
		this.taxRate = taxRate;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public int getAvalible_quantity() {
		return avalible_quantity;
	}
	public void setAvalible_quantity(int avalible_quantity) {
		this.avalible_quantity = avalible_quantity;
	}
	
	public BigDecimal getCurrentSubInventoryStock() {
		return currentSubInventoryStock;
	}
	public void setCurrentSubInventoryStock(BigDecimal currentSubInventoryStock) {
		this.currentSubInventoryStock = currentSubInventoryStock;
	}
	
	public String getIsReordered() {
		return isReordered;
	}
	public void setIsReordered(String isReordered) {
		this.isReordered = isReordered;
	}
	public List<ItemPartySlaveDto> getItemPartySlaveDto() {
		return itemPartySlaveDto;
	}
	public void setItemPartySlaveDto(List<ItemPartySlaveDto> itemPartySlaveDto) {
		this.itemPartySlaveDto = itemPartySlaveDto;
	}
	public Integer getReagentItemStatus() {
		return reagentItemStatus;
	}
	public void setReagentItemStatus(Integer reagentItemStatus) {
		this.reagentItemStatus = reagentItemStatus;
	}
	
	public Integer getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	public Integer getConsumableItemStatus() {
		return consumableItemStatus;
	}
	public void setConsumableItemStatus(Integer consumableItemStatus) {
		this.consumableItemStatus = consumableItemStatus;
	}
	public String getHsnNameValue() {
		return hsnNameValue;
	}
	public void setHsnNameValue(String hsnNameValue) {
		this.hsnNameValue = hsnNameValue;
	}
	public List<ItemContractSlaveDto> getItemContractSlaveDto() {
		return itemContractSlaveDto;
	}
	public void setItemContractSlaveDto(
			List<ItemContractSlaveDto> itemContractSlaveDto) {
		this.itemContractSlaveDto = itemContractSlaveDto;
	}
	public Integer getLabEquipmentStatus() {
		return labEquipmentStatus;
	}
	public void setLabEquipmentStatus(Integer labEquipmentStatus) {
		this.labEquipmentStatus = labEquipmentStatus;
	}
	public Integer getServiceItemStatus() {
		return serviceItemStatus;
	}
	public Integer getLicenseItemStatus() {
		return licenseItemStatus;
	}
	public void setLicenseItemStatus(Integer licenseItemStatus) {
		this.licenseItemStatus = licenseItemStatus;
	}
	public void setServiceItemStatus(Integer serviceItemStatus) {
		this.serviceItemStatus = serviceItemStatus;
	}
	public ItemMaintenanceSlaveDto getItemMaintenanceSlaveDto() {
		return itemMaintenanceSlaveDto;
	}
	public void setItemMaintenanceSlaveDto(
			ItemMaintenanceSlaveDto itemMaintenanceSlaveDto) {
		this.itemMaintenanceSlaveDto = itemMaintenanceSlaveDto;
	}
	public String getIsLnL() {
		return isLnL;
	}
	public void setIsLnL(String isLnL) {
		this.isLnL = isLnL;
	}
	@Override
	public String toString() {
		return "ItemMasterDto [id=" + id + ", createdDateTime=" + createdDateTime + ", updatedDateTime="
				+ updatedDateTime + ", userId=" + userId + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deleted_by=" + deleted_by + ", deleted=" + deleted + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", categoryType=" + categoryType + ", maxStock=" + maxStock + ", orderStock=" + orderStock
				+ ", reorderStock=" + reorderStock + ", leadTime=" + leadTime + ", priority=" + priority
				+ ", purchaseStrategy=" + purchaseStrategy + ", criticality=" + criticality + ", formType=" + formType
				+ ", itemName=" + itemName + ", status=" + status + ", invItemStatus=" + invItemStatus
				+ ", purchaseItemStatus=" + purchaseItemStatus + ", assetItemStatus=" + assetItemStatus
				+ ", issueItemStatus=" + issueItemStatus + ", laundryItemStatus=" + laundryItemStatus
				+ ", cssItemStatus=" + cssItemStatus + ", reagentItemStatus=" + reagentItemStatus
				+ ", consumableItemStatus=" + consumableItemStatus + ", batchWise=" + batchWise + ", gstCode=" + gstCode
				+ ", companyName=" + companyName + ", aliceName=" + aliceName + ", hsnName=" + hsnName
				+ ", hsnNameValue=" + hsnNameValue + ", cgst=" + cgst + ", sgst=" + sgst + ", taxName=" + taxName
				+ ", taxRate=" + taxRate + ", leadTimeUnit=" + leadTimeUnit + ", labEquipmentStatus="
				+ labEquipmentStatus + ", serviceItemStatus=" + serviceItemStatus + ", licenseItemStatus="
				+ licenseItemStatus + ", categoryId=" + categoryId + ", isReordered=" + isReordered + ", isLnL=" + isLnL
				+ ", currentSubInventoryStock=" + currentSubInventoryStock + ", noOfPages=" + noOfPages
				+ ", avalible_quantity=" + avalible_quantity + ", lstItemMaster=" + lstItemMaster
				+ ", itemMaintenanceSlaveDto=" + itemMaintenanceSlaveDto + ", itemPurchaseSlaveDto="
				+ itemPurchaseSlaveDto + ", itemSalesSlaveDto=" + itemSalesSlaveDto + ", itemPartySlaveDto="
				+ itemPartySlaveDto + ", itemContractSlaveDto=" + itemContractSlaveDto + "]";
	}
	
	
	
	
	
}
