package com.hms.ecogreenapi;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * @author : vishant pawar
 * @date : 05-March-2024
 */
@Entity
@Table(name = "ecogrren_item_master_new")
public class EcoGreenItemMasterNew {

	

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	//@Id
    @Column(name = "item_code")
    private String itemCode;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_sh_name")
    private String itemShName;

    @Column(name = "item_qty_box")
    private String itemQtyBox;

    @Column(name = "item_ldate")
    private Date itemLDate;

    @Column(name = "item_ltime")
    private String itemLTime;

    @Column(name = "item_lock_flag")
    private String itemLockFlag;

    @Column(name = "pack_code")
    private String packCode;

    @Column(name = "pack_name")
    private String packName;

    @Column(name = "item_cat_code")
    private String itemCatCode;

    @Column(name = "item_cat_name")
    private String itemCatName;

    @Column(name = "mfac_code")
    private String mfacCode;

    @Column(name = "mfac_name")
    private String mfacName;

    @Column(name = "item_grp_code")
    private String itemGrpCode;

    @Column(name = "item_grp_name")
    private String itemGrpName;

    @Column(name = "cont_code")
    private String contCode;

    @Column(name = "cont_name")
    private String contName;

    @Column(name = "dis_cat_code")
    private String disCatCode;

    @Column(name = "dis_cat_name")
    private String disCatName;

    @Column(name = "pack_type_code")
    private String packTypeCode;

    @Column(name = "pack_type_name")
    private String packTypeName;

    @Column(name = "schdule_code")
    private String schduleCode;

    @Column(name = "schdule_name")
    private String schduleName;

    @Column(name = "brand_code")
    private String brandCode;

    @Column(name = "brand_name")
    private String brandName;

    @Column(name = "storage_code")
    private String storageCode;

    @Column(name = "storage_name")
    private String storageName;

    @Column(name = "storage_cat_code")
    private String storageCatCode;

    @Column(name = "storage_cat_name")
    private String storageCatName;

    @Column(name = "item_type_code")
    private String itemTypeCode;

    @Column(name = "item_type_name")
    private String itemTypeName;
	
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Transient
	List<EcogreenItemMasterDto>  lstEcogreenItemDetails;
	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<EcogreenItemMasterDto> getLstEcogreenItemDetails() {
		return lstEcogreenItemDetails;
	}

	public void setLstEcogreenItemDetails(List<EcogreenItemMasterDto> lstEcogreenItemDetails) {
		this.lstEcogreenItemDetails = lstEcogreenItemDetails;
	}

	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemShName() {
		return itemShName;
	}

	public void setItemShName(String itemShName) {
		this.itemShName = itemShName;
	}

	public String getItemQtyBox() {
		return itemQtyBox;
	}

	public void setItemQtyBox(String itemQtyBox) {
		this.itemQtyBox = itemQtyBox;
	}

	public Date getItemLDate() {
		return itemLDate;
	}

	public void setItemLDate(Date itemLDate) {
		this.itemLDate = itemLDate;
	}

	public String getItemLTime() {
		return itemLTime;
	}

	public void setItemLTime(String itemLTime) {
		this.itemLTime = itemLTime;
	}

	public String getItemLockFlag() {
		return itemLockFlag;
	}

	public void setItemLockFlag(String itemLockFlag) {
		this.itemLockFlag = itemLockFlag;
	}

	public String getPackCode() {
		return packCode;
	}

	public void setPackCode(String packCode) {
		this.packCode = packCode;
	}

	public String getPackName() {
		return packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	public String getItemCatCode() {
		return itemCatCode;
	}

	public void setItemCatCode(String itemCatCode) {
		this.itemCatCode = itemCatCode;
	}

	public String getItemCatName() {
		return itemCatName;
	}

	public void setItemCatName(String itemCatName) {
		this.itemCatName = itemCatName;
	}

	public String getMfacCode() {
		return mfacCode;
	}

	public void setMfacCode(String mfacCode) {
		this.mfacCode = mfacCode;
	}

	public String getMfacName() {
		return mfacName;
	}

	public void setMfacName(String mfacName) {
		this.mfacName = mfacName;
	}

	public String getItemGrpCode() {
		return itemGrpCode;
	}

	public void setItemGrpCode(String itemGrpCode) {
		this.itemGrpCode = itemGrpCode;
	}

	public String getItemGrpName() {
		return itemGrpName;
	}

	public void setItemGrpName(String itemGrpName) {
		this.itemGrpName = itemGrpName;
	}

	public String getContCode() {
		return contCode;
	}

	public void setContCode(String contCode) {
		this.contCode = contCode;
	}

	public String getContName() {
		return contName;
	}

	public void setContName(String contName) {
		this.contName = contName;
	}

	public String getDisCatCode() {
		return disCatCode;
	}

	public void setDisCatCode(String disCatCode) {
		this.disCatCode = disCatCode;
	}

	public String getDisCatName() {
		return disCatName;
	}

	public void setDisCatName(String disCatName) {
		this.disCatName = disCatName;
	}

	public String getPackTypeCode() {
		return packTypeCode;
	}

	public void setPackTypeCode(String packTypeCode) {
		this.packTypeCode = packTypeCode;
	}

	public String getPackTypeName() {
		return packTypeName;
	}

	public void setPackTypeName(String packTypeName) {
		this.packTypeName = packTypeName;
	}

	public String getSchduleCode() {
		return schduleCode;
	}

	public void setSchduleCode(String schduleCode) {
		this.schduleCode = schduleCode;
	}

	public String getSchduleName() {
		return schduleName;
	}

	public void setSchduleName(String schduleName) {
		this.schduleName = schduleName;
	}

	public String getBrandCode() {
		return brandCode;
	}

	public void setBrandCode(String brandCode) {
		this.brandCode = brandCode;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getStorageCode() {
		return storageCode;
	}

	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}

	public String getStorageName() {
		return storageName;
	}

	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}

	public String getStorageCatCode() {
		return storageCatCode;
	}

	public void setStorageCatCode(String storageCatCode) {
		this.storageCatCode = storageCatCode;
	}

	public String getStorageCatName() {
		return storageCatName;
	}

	public void setStorageCatName(String storageCatName) {
		this.storageCatName = storageCatName;
	}

	public String getItemTypeCode() {
		return itemTypeCode;
	}

	public void setItemTypeCode(String itemTypeCode) {
		this.itemTypeCode = itemTypeCode;
	}

	public String getItemTypeName() {
		return itemTypeName;
	}

	public void setItemTypeName(String itemTypeName) {
		this.itemTypeName = itemTypeName;
	}

	
}
