package com.hms.pathology.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "pathology_sample_transfer")
public class PathologySampleTransferDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer sampleTransferId;
	
	@Column(name = "transferrer_id")
	private Integer transferrerId;
	
	@Column(name = "transferee_id")
	private Integer transfereeId;
	
	@Column(name = "to_days")
	private Integer days;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "customer_type")
	private String userCustomerType;
	
	@Column(name = "customer_id")
	private String userCustomerId;
	
	@Column(name = "master_ids")
	private String masterIds;
	
	@CreationTimestamp
	@Column(name = "transfered_date_time",updatable=false)
	private Date transferedDate;
	
	@Column(name = "transfered_by",columnDefinition="int default 0")
	private Integer transferedBy = 0;
	
	@Column(name = "from_date",updatable=false)
	private Date fromDate;
	
	@Column(name = "to_date",updatable=false)
	private Date toDate;
	
	@Transient
	private String fDate;

	
	public Integer getSampleTransferId() {
		return sampleTransferId;
	}

	public void setSampleTransferId(Integer sampleTransferId) {
		this.sampleTransferId = sampleTransferId;
	}

	public Integer getTransferrerId() {
		return transferrerId;
	}

	public void setTransferrerId(Integer transferrerId) {
		this.transferrerId = transferrerId;
	}

	public Integer getTransfereeId() {
		return transfereeId;
	}

	public void setTransfereeId(Integer transfereeId) {
		this.transfereeId = transfereeId;
	}

	public Integer getDays() {
		return days;
	}

	public void setDays(Integer days) {
		this.days = days;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getUserCustomerType() {
		return userCustomerType;
	}

	public void setUserCustomerType(String userCustomerType) {
		this.userCustomerType = userCustomerType;
	}

	public String getUserCustomerId() {
		return userCustomerId;
	}

	public void setUserCustomerId(String userCustomerId) {
		this.userCustomerId = userCustomerId;
	}

	public String getMasterIds() {
		return masterIds;
	}

	public void setMasterIds(String masterIds) {
		this.masterIds = masterIds;
	}

	public Date getTransferedDate() {
		return transferedDate;
	}

	public void setTransferedDate(Date transferedDate) {
		this.transferedDate = transferedDate;
	}

	public Integer getTransferedBy() {
		return transferedBy;
	}

	public void setTransferedBy(Integer transferedBy) {
		this.transferedBy = transferedBy;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public String getfDate() {
		return fDate;
	}

	public void setfDate(String fDate) {
		this.fDate = fDate;
	}


	@Override
	public String toString() {
		return "PathologySampleTransferDto [sampleTransferId=" + sampleTransferId + ", transferrerId=" + transferrerId
				+ ", transfereeId=" + transfereeId + ", days=" + days + ", unitId=" + unitId + ", userCustomerType="
				+ userCustomerType + ", userCustomerId=" + userCustomerId + ", masterIds=" + masterIds
				+ ", transferedDate=" + transferedDate + ", transferedBy=" + transferedBy + ", fromDate=" + fromDate
				+ ", toDate=" + toDate + ", fDate=" + fDate + "]";
	}
}