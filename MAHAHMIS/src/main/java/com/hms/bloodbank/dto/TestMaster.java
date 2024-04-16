package com.hms.bloodbank.dto;

import java.io.Serializable;
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
@Table(name = "bb_test_master")
public class TestMaster implements Serializable {

	private static final long serialVersionUID = 6219960425114704997L;

	@Id
	@GeneratedValue
	@Column(name = "id_test_master")
	private int testMasterId;
	
	@Column(name = "test_name")
	private String testName;
	
	@Column(name = "test_issue_flag")
	private String testIssueFlag;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_datetime", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_datetime")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_datetime")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "test_master_ip")
	private String ipAddress = null;
	
	@Transient
	private List<TestMaster> listTestMaster;

	public int getTestMasterId() {
		return testMasterId;
	}

	public void setTestMasterId(int testMasterId) {
		this.testMasterId = testMasterId;
	}

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getTestIssueFlag() {
		return testIssueFlag;
	}

	public void setTestIssueFlag(String testIssueFlag) {
		this.testIssueFlag = testIssueFlag;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public List<TestMaster> getListTestMaster() {
		return listTestMaster;
	}

	public void setListTestMaster(List<TestMaster> listTestMaster) {
		this.listTestMaster = listTestMaster;
	}

	@Override
	public String toString() {
		return "TestMaster [testMasterId=" + testMasterId + ", testName="
				+ testName + ", testIssueFlag=" + testIssueFlag
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deletedDate=" + deletedDate + ", deletedBy="
				+ deletedBy + ", unitId=" + unitId + ", status=" + status
				+ ", ipAddress=" + ipAddress + ", listTestMaster="
				+ listTestMaster + "]";
	}


	
	
	
}
