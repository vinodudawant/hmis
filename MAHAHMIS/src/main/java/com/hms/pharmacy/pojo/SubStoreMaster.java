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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity 
@Table(name="pharma_sub_store_master")
public class SubStoreMaster {
	
	@Id
	@GeneratedValue 
	@Column(name="store_id")
	private Integer storeId=null;
	
	@Column(name="store_name")
	private String storeName=null;
	
	@Column(name="store_location")
	private String storeLocation=null;
	
	@Column(name="store_number")
	private String storeNumber=null;
	
	@Column(name="store_contact_person")
	private String storeContactPerson=null;
	
	@Column(name="store_code_name")
	private String storeCodeName=null;
	
	@Column(name="store_lock")
	private Integer storeLock=0;
	
	@Column(name="store_delete_flag")
	private Integer storeDeleteFlag=0;
	
	@Column(name="store_added_by")
	private String storeAddedBy=null;
	
	@Column(name="store_mod_by")
	private String storeModBy=null;
	@UpdateTimestamp
	@Column(name="store_update_date")
	private Date storeUpdateDate;
	@CreationTimestamp
	@Column(name = "store_add_date")
	private Date storeAddDate=null;
	
	@Column(name = "store_authentication")
	private Integer storeAuthentication=0;
	
	@Column(name="store_user_id")
	private String storeUserId=null;
	
	@Column(name="store_license_no")
	private String storeLicenseNumber;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	
	@Column(name="user_id")
	private Integer userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	public Integer getStoreId() {
		return storeId;
	}

	public void setStoreId(Integer storeId) {
		this.storeId = storeId;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public Integer getStoreDeleteFlag() {
		return storeDeleteFlag;
	}

	public void setStoreDeleteFlag(Integer storeDeleteFlag) {
		this.storeDeleteFlag = storeDeleteFlag;
	}

	public String getStoreAddedBy() {
		return storeAddedBy;
	}

	public void setStoreAddedBy(String storeAddedBy) {
		this.storeAddedBy = storeAddedBy;
	}

	public String getStoreModBy() {
		return storeModBy;
	}

	public void setStoreModBy(String storeModBy) {
		this.storeModBy = storeModBy;
	}

	public Date getStoreUpdateDate() {
		return storeUpdateDate;
	}

	public void setStoreUpdateDate(Date storeUpdateDate) {
		this.storeUpdateDate = storeUpdateDate;
	}

	public Date getStoreAddDate() {
		return storeAddDate;
	}

	public void setStoreAddDate(Date storeAddDate) {
		this.storeAddDate = storeAddDate;
	}

	public String getStoreLocation() {
		return storeLocation;
	}

	public void setStoreLocation(String storeLocation) {
		this.storeLocation = storeLocation;
	}

	public String getStoreNumber() {
		return storeNumber;
	}

	public void setStoreNumber(String storeNumber) {
		this.storeNumber = storeNumber;
	}

	public String getStoreContactPerson() {
		return storeContactPerson;
	}

	public void setStoreContactPerson(String storeContactPerson) {
		this.storeContactPerson = storeContactPerson;
	}

	public String getStoreCodeName() {
		return storeCodeName;
	}

	public void setStoreCodeName(String storeCodeName) {
		this.storeCodeName = storeCodeName;
	}

	public Integer getStoreLock() {
		return storeLock;
	}

	public void setStoreLock(Integer storeLock) {
		this.storeLock = storeLock;
	}

	public Integer getStoreAuthentication() {
		return storeAuthentication;
	}

	public void setStoreAuthentication(Integer storeAuthentication) {
		this.storeAuthentication = storeAuthentication;
	}

	public String getStoreUserId() {
		return storeUserId;
	}

	public void setStoreUserId(String storeUserId) {
		this.storeUserId = storeUserId;
	}

	public String getStoreLicenseNumber() {
		return storeLicenseNumber;
	}

	public void setStoreLicenseNumber(String storeLicenseNumber) {
		this.storeLicenseNumber = storeLicenseNumber;
	}
	
	@Transient
	private List<SubStoreMaster> lstSubStore;

	public List<SubStoreMaster> getLstSubStore() {
		return lstSubStore;
	}

	public void setLstSubStore(List<SubStoreMaster> lstSubStore) {
		this.lstSubStore = lstSubStore;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
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
