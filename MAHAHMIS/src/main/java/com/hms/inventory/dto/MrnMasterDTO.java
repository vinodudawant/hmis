package com.hms.inventory.dto;

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
@Table(name="inv_mrn_master_new")
@Component
public class MrnMasterDTO {

	@Id
	@GeneratedValue
	//id
	@Column(name = "mrn_id")
	private Integer mrnId;
	
	//mrn date
	@Column(name = "mrn_date")
	private String mrnDate;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

		
	@Column(name = "received_date")
	private String receivedDate;
	
	@Column(name = "mrn_dispatch_date")
	private String mrnDispatchDate;
	@Transient
	private String subInventoryName;
	
	//added By Arpit
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;	
	
	//subinventory name
	@Column(name = "mrn_subinventory_name")
	private String mrnSubinventoryName;
	
	//subinventory id
	@Column(name = "mrn_subinventory_id")
	private Integer mrnSubinventoryId;
	
	//mrn remark
	@Column(name = "mrn_remark")
	private String mrnRemark;
	
	@Column(name = "mrn_note")
	private String mrnNote;
	
	@Column(name = "user_name")
	private String userName;
	
	//mrn status
	@Column(name = "mrn_status")
	private String mrnStatus;
	
	@Column(name = "mrn_review_status",columnDefinition="varchar(2) default 'N'")
	private String mrnReviewStatus="N";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "mrn_review_date_time", updatable = false)
	private Date mrnReviewDateTime;
	
	@Column(name = "mrn_review_by")
	private Integer mrnReviewBy;
	
	@Column(name = "mrn_reject_remark")
	private String mrnrejectremark;
	
	@Column(name = "mrn_rejection_status",columnDefinition="varchar(2) default 'N'")
	private String mrnRejectionStatus="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "mrn_rejection_date_time", updatable = false)
	private Date mrnRejectionDateTime;
	
	@Column(name = "mrn_rejection_by")
	private Integer mrnRejectionBy;
	
	@Column(name = "inv_po_process_status",columnDefinition="varchar(2) default 'N'")
	private String itemPoStatus;
	
	@Column(name = "inv_sto_process_status",columnDefinition="varchar(2) default 'N'")
	private String itemStoStatus;
	
	
	//total item quantity
	@Column(name = "total_item_quantity",columnDefinition="int(11) default 0")
	private Integer totalItemQuantity;
	
	//userId
	@Column(name="user_id")
	private int userId;
	
	@Column(name = "mrn_generated_status",columnDefinition="varchar(2) default 'N'")
	private String mrnGeneratedStatus="N";
	
	@Column(name = "mrn_purchase_request_status",columnDefinition="varchar(2) default 'N'")
	private String mrnpurchaseRequestStatus="N";
	
	@Column(name = "mrn_pr_created_by", updatable = false)
	private Integer mrnPrcreatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "mrn_pr_created_date_time", updatable = false)
	private Date mrnPrcreatedDate;
	
	
	@Column(name = "mrn_approve_status",columnDefinition="varchar(2) default 'N'")
	private String mrnApproveStatus="N";
	
	@Column(name = "po_visibility_status",columnDefinition="varchar(2) default 'N'")
	private String visisbilityPOsStatus="N";
	
	@Column(name = "sto_visibility_status",columnDefinition="varchar(2) default 'N'")
	private String visisbilityStoStatus="N";
	
	
	@Column(name = "approved_by_id")
	private Integer approvedById;//added by dayanand for  storeing user id when it is login 
	
	@Column(name = "approved_by_name",columnDefinition="varchar(255) default 'N'")
	private String approvedByName;//added by daynand for storeing username when it is login at the tine generate mrn
	
	
	@Transient
	private String itemBatchCode;
	
	@Transient
	private Integer count;//added by dayanand to get count of username and password at the tim of login in generate mrn
	
	@Transient
	private String itemExpiryDate;
	
	@Transient
	private List<MrnMasterDTO> lstmrnmaster;
	
	@Transient
	private List<BatchStockDto> batchStockDtos;
	
	@Transient
	private List<MrnMasterItemInfoDTO> lstforsubInventoryInfo;//added by dayanand for getting subinventory info
	
	@Transient
	private List<BatchStockDto> lstbatchcode;//added by dayaynand for getting info about batch code
	
	//added by rohit on 15-05-2020
	@Transient
	private Integer mrnItemSlaveId;
	
	//added by rohit on 15-05-2020
	@Transient
	private String itemName;
	
	//added by rohit on 15-05-2020
	@Transient
	private Integer itemMasterId;
	
	@Transient
	private Integer noOfPages;
	
	//added by rohit on 10-11-2020
	@Transient
	private List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos;
	
	
	@LazyCollection(value = LazyCollectionOption.FALSE)  
	 @OneToMany(cascade = CascadeType.ALL)   
	 @JoinColumn(name = "mrn_id", nullable = false) 
	 private List<MrnMasterItemInfoDTO> lstMrniteminfo;

	public String getReceivedDate() {
		return receivedDate;
	}

	public void setReceivedDate(String receivedDate) {
		this.receivedDate = receivedDate;
	}

	public String getMrnDispatchDate() {
		return mrnDispatchDate;
	}

	public void setMrnDispatchDate(String mrnDispatchDate) {
		this.mrnDispatchDate = mrnDispatchDate;
	}

	public String getSubInventoryName() {
		return subInventoryName;
	}

	public void setSubInventoryName(String subInventoryName) {
		this.subInventoryName = subInventoryName;
	}
	
	public Integer getMrnId() {
		return mrnId;
	}

	public void setMrnId(Integer mrnId) {
		this.mrnId = mrnId;
	}

	public String getMrnDate() {
		return mrnDate;
	}

	public void setMrnDate(String mrnDate) {
		this.mrnDate = mrnDate;
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

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
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

	public String getMrnSubinventoryName() {
		return mrnSubinventoryName;
	}

	public void setMrnSubinventoryName(String mrnSubinventoryName) {
		this.mrnSubinventoryName = mrnSubinventoryName;
	}

	public Integer getMrnSubinventoryId() {
		return mrnSubinventoryId;
	}

	public void setMrnSubinventoryId(Integer mrnSubinventoryId) {
		this.mrnSubinventoryId = mrnSubinventoryId;
	}

	
	public String getMrnRemark() {
		return mrnRemark;
	}

	public void setMrnRemark(String mrnRemark) {
		this.mrnRemark = mrnRemark;
	}

	public String getMrnNote() {
		return mrnNote;
	}

	public void setMrnNote(String mrnNote) {
		this.mrnNote = mrnNote;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMrnStatus() {
		return mrnStatus;
	}

	public void setMrnStatus(String mrnStatus) {
		this.mrnStatus = mrnStatus;
	}

	public String getMrnReviewStatus() {
		return mrnReviewStatus;
	}

	public void setMrnReviewStatus(String mrnReviewStatus) {
		this.mrnReviewStatus = mrnReviewStatus;
	}

	public Date getMrnReviewDateTime() {
		return mrnReviewDateTime;
	}

	public void setMrnReviewDateTime(Date mrnReviewDateTime) {
		this.mrnReviewDateTime = mrnReviewDateTime;
	}

	public Integer getMrnReviewBy() {
		return mrnReviewBy;
	}

	public void setMrnReviewBy(Integer mrnReviewBy) {
		this.mrnReviewBy = mrnReviewBy;
	}

	public String getMrnrejectremark() {
		return mrnrejectremark;
	}

	public void setMrnrejectremark(String mrnrejectremark) {
		this.mrnrejectremark = mrnrejectremark;
	}

	public String getMrnRejectionStatus() {
		return mrnRejectionStatus;
	}

	public void setMrnRejectionStatus(String mrnRejectionStatus) {
		this.mrnRejectionStatus = mrnRejectionStatus;
	}

	public Date getMrnRejectionDateTime() {
		return mrnRejectionDateTime;
	}

	public void setMrnRejectionDateTime(Date mrnRejectionDateTime) {
		this.mrnRejectionDateTime = mrnRejectionDateTime;
	}

	public Integer getMrnRejectionBy() {
		return mrnRejectionBy;
	}

	public void setMrnRejectionBy(Integer mrnRejectionBy) {
		this.mrnRejectionBy = mrnRejectionBy;
	}

	public String getItemPoStatus() {
		return itemPoStatus;
	}

	public void setItemPoStatus(String itemPoStatus) {
		this.itemPoStatus = itemPoStatus;
	}

	public String getItemStoStatus() {
		return itemStoStatus;
	}

	public void setItemStoStatus(String itemStoStatus) {
		this.itemStoStatus = itemStoStatus;
	}

	public Integer getTotalItemQuantity() {
		return totalItemQuantity;
	}

	public void setTotalItemQuantity(Integer totalItemQuantity) {
		this.totalItemQuantity = totalItemQuantity;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getMrnGeneratedStatus() {
		return mrnGeneratedStatus;
	}

	public void setMrnGeneratedStatus(String mrnGeneratedStatus) {
		this.mrnGeneratedStatus = mrnGeneratedStatus;
	}

	public String getMrnpurchaseRequestStatus() {
		return mrnpurchaseRequestStatus;
	}

	public void setMrnpurchaseRequestStatus(String mrnpurchaseRequestStatus) {
		this.mrnpurchaseRequestStatus = mrnpurchaseRequestStatus;
	}

	public Integer getMrnPrcreatedBy() {
		return mrnPrcreatedBy;
	}

	public void setMrnPrcreatedBy(Integer mrnPrcreatedBy) {
		this.mrnPrcreatedBy = mrnPrcreatedBy;
	}

	public Date getMrnPrcreatedDate() {
		return mrnPrcreatedDate;
	}

	public void setMrnPrcreatedDate(Date mrnPrcreatedDate) {
		this.mrnPrcreatedDate = mrnPrcreatedDate;
	}

	public String getMrnApproveStatus() {
		return mrnApproveStatus;
	}

	public void setMrnApproveStatus(String mrnApproveStatus) {
		this.mrnApproveStatus = mrnApproveStatus;
	}

	public String getVisisbilityPOsStatus() {
		return visisbilityPOsStatus;
	}

	public void setVisisbilityPOsStatus(String visisbilityPOsStatus) {
		this.visisbilityPOsStatus = visisbilityPOsStatus;
	}

	public String getVisisbilityStoStatus() {
		return visisbilityStoStatus;
	}

	public void setVisisbilityStoStatus(String visisbilityStoStatus) {
		this.visisbilityStoStatus = visisbilityStoStatus;
	}

	public List<MrnMasterDTO> getLstmrnmaster() {
		return lstmrnmaster;
	}

	public void setLstmrnmaster(List<MrnMasterDTO> lstmrnmaster) {
		this.lstmrnmaster = lstmrnmaster;
	}

	public List<MrnMasterItemInfoDTO> getLstforsubInventoryInfo() {
		return lstforsubInventoryInfo;
	}

	public void setLstforsubInventoryInfo(
			List<MrnMasterItemInfoDTO> lstforsubInventoryInfo) {
		this.lstforsubInventoryInfo = lstforsubInventoryInfo;
	}

	public List<BatchStockDto> getLstbatchcode() {
		return lstbatchcode;
	}

	public void setLstbatchcode(List<BatchStockDto> lstbatchcode) {
		this.lstbatchcode = lstbatchcode;
	}

	public List<MrnMasterItemInfoDTO> getLstMrniteminfo() {
		return lstMrniteminfo;
	}

	public void setLstMrniteminfo(List<MrnMasterItemInfoDTO> lstMrniteminfo) {
		this.lstMrniteminfo = lstMrniteminfo;
	}

	public String getItemBatchCode() {
		return itemBatchCode;
	}

	public void setItemBatchCode(String itemBatchCode) {
		this.itemBatchCode = itemBatchCode;
	}

	public String getItemExpiryDate() {
		return itemExpiryDate;
	}

	public void setItemExpiryDate(String itemExpiryDate) {
		this.itemExpiryDate = itemExpiryDate;
	}

	

	public List<BatchStockDto> getBatchStockDtos() {
		return batchStockDtos;
	}

	public void setBatchStockDtos(List<BatchStockDto> batchStockDtos) {
		this.batchStockDtos = batchStockDtos;
	}

	public Integer getApprovedById() {
		return approvedById;
	}

	public void setApprovedById(Integer approvedById) {
		this.approvedById = approvedById;
	}

	public String getApprovedByName() {
		return approvedByName;
	}

	public void setApprovedByName(String approvedByName) {
		this.approvedByName = approvedByName;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
	
	public Integer getMrnItemSlaveId() {
		return mrnItemSlaveId;
	}

	public void setMrnItemSlaveId(Integer mrnItemSlaveId) {
		this.mrnItemSlaveId = mrnItemSlaveId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Integer getItemMasterId() {
		return itemMasterId;
	}

	public void setItemMasterId(Integer itemMasterId) {
		this.itemMasterId = itemMasterId;
	}

	public Integer getNoOfPages() {
		return noOfPages;
	}

	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}
	
	public List<GoodsIssueMrnItemSlaveDto> getGoodsIssueMrnItemSlaveDtos() {
		return goodsIssueMrnItemSlaveDtos;
	}

	public void setGoodsIssueMrnItemSlaveDtos(
			List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos) {
		this.goodsIssueMrnItemSlaveDtos = goodsIssueMrnItemSlaveDtos;
	}

	@Override
	public String toString() {
		return "MrnMasterDTO [mrnId=" + mrnId + ", mrnDate=" + mrnDate
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", receivedDate="
				+ receivedDate + ", mrnDispatchDate=" + mrnDispatchDate
				+ ", subInventoryName=" + subInventoryName + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", mrnSubinventoryName=" + mrnSubinventoryName
				+ ", mrnSubinventoryId=" + mrnSubinventoryId + ", mrnRemark="
				+ mrnRemark + ", mrnNote=" + mrnNote + ", userName=" + userName
				+ ", mrnStatus=" + mrnStatus + ", mrnReviewStatus="
				+ mrnReviewStatus + ", mrnReviewDateTime=" + mrnReviewDateTime
				+ ", mrnReviewBy=" + mrnReviewBy + ", mrnrejectremark="
				+ mrnrejectremark + ", mrnRejectionStatus="
				+ mrnRejectionStatus + ", mrnRejectionDateTime="
				+ mrnRejectionDateTime + ", mrnRejectionBy=" + mrnRejectionBy
				+ ", itemPoStatus=" + itemPoStatus + ", itemStoStatus="
				+ itemStoStatus + ", totalItemQuantity=" + totalItemQuantity
				+ ", userId=" + userId + ", mrnGeneratedStatus="
				+ mrnGeneratedStatus + ", mrnpurchaseRequestStatus="
				+ mrnpurchaseRequestStatus + ", mrnPrcreatedBy="
				+ mrnPrcreatedBy + ", mrnPrcreatedDate=" + mrnPrcreatedDate
				+ ", mrnApproveStatus=" + mrnApproveStatus
				+ ", visisbilityPOsStatus=" + visisbilityPOsStatus
				+ ", visisbilityStoStatus=" + visisbilityStoStatus
				+ ", approvedById=" + approvedById + ", approvedByName="
				+ approvedByName + ", itemBatchCode=" + itemBatchCode
				+ ", count=" + count + ", itemExpiryDate=" + itemExpiryDate
				+ ", lstmrnmaster=" + lstmrnmaster + ", batchStockDtos="
				+ batchStockDtos + ", lstforsubInventoryInfo="
				+ lstforsubInventoryInfo + ", lstbatchcode=" + lstbatchcode
				+ ", mrnItemSlaveId=" + mrnItemSlaveId + ", itemName="
				+ itemName + ", itemMasterId=" + itemMasterId + ", noOfPages="
				+ noOfPages + ", lstMrniteminfo=" + lstMrniteminfo + "]";
	}

	

	
	

}