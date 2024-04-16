package com.hms.ivf.dto;

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

@Entity
@Table(name="ivf_general_voucher")
public class IvfGeneralVoucherDto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="general_voucher_id")
	private int generalVoucherId;
	
	@Column(name="voucheridView")
	private int voucheridView;   
	
	@Column(name="voucherTypeid",columnDefinition="varchar(3) default '0'" )
	private String voucherTypeid="0";
	
	@Column(name="voucherTypeName",columnDefinition="varchar(3) default ''" )
	private String voucherTypeName="";
	
	@Column(name="txt_current_date",columnDefinition="varchar(20) default ''" )
	private String txtcurrentDate="";
	
	@Column(name="txt_pay_to",columnDefinition="varchar(255) default ''" )
	private String txtPayTo="";
	
	@Column(name="total_amount",columnDefinition="varchar(55) default ''" )
	private String txtAmount="";
	
	@Column(name="group_id",columnDefinition="varchar(5) default ''" )
	private String selGroupid="";
	
	@Column(name="group_name",columnDefinition="varchar(55) default ''" )
	private String selGroupName="";
	
	@Column(name="ledgerHeadid",columnDefinition="varchar(5) default ''" )
	private String selLedgerHeadid="";
	
	@Column(name="sel_ledger_head",columnDefinition="varchar(255) default ''" )
	private String selLedgerHead="";
	
	@Column(name="authorisedbyid",columnDefinition="varchar(5) default ''" )
	private String selAuthorisedById="";
	
	@Column(name="sel_authorised_by",columnDefinition="varchar(55) default ''" )
	private String selAuthorisedBy="";
	
	@Column(name="narration",columnDefinition="varchar(255) default ''" )
	private String txtNarration="";
	
	@Column(name="person_name",columnDefinition="varchar(500) default ''" )
	private String txtperson="";
	
	@Column(name="address",columnDefinition="varchar(1000) default ''" )
	private String txtAddress="";
	
	@Column(name="typeofpaymentid",columnDefinition="varchar(5) default ''" )
	private String typeofPaymentId="";
	
	@Column(name="typeofPayment",columnDefinition="varchar(255) default ''" )
	private String typeofPayment="";
	
	@Column(name="subgroupid",columnDefinition="varchar(5) default ''" )
	private String subgroupid="";
		
	@Column(name="subgroup",columnDefinition="varchar(255) default ''" )
	private String subgroup="";
	
	@Column(name="totalPaidAmount",columnDefinition="varchar(500) default ''" )
	private String totalPaidAmount="";
	
	@Column(name="amountInWords",columnDefinition="varchar(1000) default ''" )
	private String amountInWords="";
	
	@Column(name="donorpanNo",columnDefinition="varchar(255) default ''" )
	private String donorpanNo=""; 
	
	@Column(name="currentYear",columnDefinition="varchar(5) default ''" )
	private String currentYear="";
	
	@Column(name="pamentmodeid",columnDefinition="varchar(5) default ''" )
	private String pamentModeId="";
	
	@Column(name="pamentMode",columnDefinition="varchar(500) default ''" )
	private String pamentMode="";
	
	@Column(name="remark",columnDefinition="varchar(55) default ''" )
	private String remark="";
		
	@Transient
	private List<IvfGeneralVoucherDto> listIvfGeneralVoucherDto;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Column(name="username",columnDefinition="varchar(255) default ''" )
	private String userName;
	
	
	public String getUserName() {
		return userName;
	}

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createddate",updatable=false)
	private Date createdDate;
	
	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "created_by")
	private int createdBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;	
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	public int getVoucheridView() {
		return voucheridView;
	}

	public void setVoucheridView(int voucheridView) {
		this.voucheridView = voucheridView;
	}

	public int getGeneralVoucherId() {
		return generalVoucherId;
	}

	public void setGeneralVoucherId(int generalVoucherId) {
		this.generalVoucherId = generalVoucherId;
	}

	public String getTxtcurrentDate() {
		return txtcurrentDate;
	}

	public void setTxtcurrentDate(String txtcurrentDate) {
		this.txtcurrentDate = txtcurrentDate;
	}

	public String getTxtPayTo() {
		return txtPayTo;
	}

	public void setTxtPayTo(String txtPayTo) {
		this.txtPayTo = txtPayTo;
	}

	public String getTxtAmount() {
		return txtAmount;
	}

	public void setTxtAmount(String txtAmount) {
		this.txtAmount = txtAmount;
	}

	public String getSelGroupName() {
		return selGroupName;
	}

	public void setSelGroupName(String selGroupName) {
		this.selGroupName = selGroupName;
	}

	public String getSelLedgerHead() {
		return selLedgerHead;
	}

	public void setSelLedgerHead(String selLedgerHead) {
		this.selLedgerHead = selLedgerHead;
	}

	public String getSelAuthorisedBy() {
		return selAuthorisedBy;
	}

	public void setSelAuthorisedBy(String selAuthorisedBy) {
		this.selAuthorisedBy = selAuthorisedBy;
	}

	public String getTxtNarration() {
		return txtNarration;
	}

	public void setTxtNarration(String txtNarration) {
		this.txtNarration = txtNarration;
	}

	public String getTxtperson() {
		return txtperson;
	}

	public void setTxtperson(String txtperson) {
		this.txtperson = txtperson;
	}

	public String getTxtAddress() {
		return txtAddress;
	}

	public void setTxtAddress(String txtAddress) {
		this.txtAddress = txtAddress;
	}

	public String getTypeofPayment() {
		return typeofPayment;
	}

	public void setTypeofPayment(String typeofPayment) {
		this.typeofPayment = typeofPayment;
	}

	public String getSubgroup() {
		return subgroup;
	}

	public void setSubgroup(String subgroup) {
		this.subgroup = subgroup;
	}

	public String getTotalPaidAmount() {
		return totalPaidAmount;
	}

	public void setTotalPaidAmount(String totalPaidAmount) {
		this.totalPaidAmount = totalPaidAmount;
	}

	public String getAmountInWords() {
		return amountInWords;
	}

	public void setAmountInWords(String amountInWords) {
		this.amountInWords = amountInWords;
	}

	public String getDonorpanNo() {
		return donorpanNo;
	}

	public void setDonorpanNo(String donorpanNo) {
		this.donorpanNo = donorpanNo;
	}

	public String getCurrentYear() {
		return currentYear;
	}

	public void setCurrentYear(String currentYear) {
		this.currentYear = currentYear;
	}

	public String getPamentMode() {
		return pamentMode;
	}

	public void setPamentMode(String pamentMode) {
		this.pamentMode = pamentMode;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public List<IvfGeneralVoucherDto> getListIvfGeneralVoucherDto() {
		return listIvfGeneralVoucherDto;
	}

	public void setListIvfGeneralVoucherDto(List<IvfGeneralVoucherDto> listIvfGeneralVoucherDto) {
		this.listIvfGeneralVoucherDto = listIvfGeneralVoucherDto;
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

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getVoucherTypeid() {
		return voucherTypeid;
	}

	public void setVoucherTypeid(String voucherTypeid) {
		this.voucherTypeid = voucherTypeid;
	}

	public String getVoucherTypeName() {
		return voucherTypeName;
	}

	public void setVoucherTypeName(String voucherTypeName) {
		this.voucherTypeName = voucherTypeName;
	}

	public String getSelGroupid() {
		return selGroupid;
	}

	public void setSelGroupid(String selGroupid) {
		this.selGroupid = selGroupid;
	}

	public String getSelLedgerHeadid() {
		return selLedgerHeadid;
	}

	public void setSelLedgerHeadid(String selLedgerHeadid) {
		this.selLedgerHeadid = selLedgerHeadid;
	}

	public String getSelAuthorisedById() {
		return selAuthorisedById;
	}

	public void setSelAuthorisedById(String selAuthorisedById) {
		this.selAuthorisedById = selAuthorisedById;
	}

	public String getTypeofPaymentId() {
		return typeofPaymentId;
	}

	public void setTypeofPaymentId(String typeofPaymentId) {
		this.typeofPaymentId = typeofPaymentId;
	}

	public String getSubgroupid() {
		return subgroupid;
	}

	public void setSubgroupid(String subgroupid) {
		this.subgroupid = subgroupid;
	}

	public String getPamentModeId() {
		return pamentModeId;
	}

	public void setPamentModeId(String pamentModeId) {
		this.pamentModeId = pamentModeId;
	}

	@Override
	public String toString() {
		return "IvfGeneralVoucherDto [generalVoucherId=" + generalVoucherId + ", txtcurrentDate=" + txtcurrentDate
				+ ", txtPayTo=" + txtPayTo + ", txtAmount=" + txtAmount + ", selGroupName=" + selGroupName
				+ ", selLedgerHead=" + selLedgerHead + ", selAuthorisedBy=" + selAuthorisedBy + ", txtNarration="
				+ txtNarration + ", txtperson=" + txtperson + ", txtAddress=" + txtAddress + ", typeofPayment="
				+ typeofPayment + ", subgroup=" + subgroup + ", totalPaidAmount=" + totalPaidAmount + ", amountInWords="
				+ amountInWords + ", donorpanNo=" + donorpanNo + ", currentYear=" + currentYear + ", pamentMode="
				+ pamentMode + ", remark=" + remark + ", listIvfGeneralVoucherDto=" + listIvfGeneralVoucherDto
				+ ", unitId=" + unitId + ", userId=" + userId + ", createdBy=" + createdBy + ", createdDateTime="
				+ createdDateTime + ", updatedBy=" + updatedBy + ", updatedDateTime=" + updatedDateTime + ", deletedBy="
				+ deletedBy + ", deletedDateTime=" + deletedDateTime + ", deleted=" + deleted + "]";
	}
	
	

}
