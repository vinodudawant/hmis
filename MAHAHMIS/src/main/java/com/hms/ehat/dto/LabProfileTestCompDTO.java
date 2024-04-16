package com.hms.ehat.dto;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.pathology.dto.LabTestDTO;

@Entity
@Table(name = "pathology_labprofiletestcomp")
public class LabProfileTestCompDTO  implements Comparable<LabProfileTestCompDTO>{

	@Id
	@GeneratedValue
	@Column(name = "idlabProfileTestComp")
	private int idlabProfileTestComp;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "idTest")
	private LabTestDTO labTestDTO;

	@Column(name = "test_status")
	private String labProfileTestStatus = "Y";
	
	@Column(name = "headName")
	private String headName;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@CreationTimestamp
	@Column(name = "created_date_time")
	private Date createdDate;
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "sequence", columnDefinition="int default 0")
	private Integer sequence = 0;
	
	@Transient
	private Integer idTest;
	@Transient
	private String testName;
	@Transient
	private String testCode;
	@Transient
	private float testRate;
	@Transient
	private Integer idprofile;
	
	
	public int getIdlabProfileTestComp() {
		return idlabProfileTestComp;
	}
	
	public void setIdlabProfileTestComp(int idlabProfileTestComp) {
		this.idlabProfileTestComp = idlabProfileTestComp;
	}
	
	public LabTestDTO getLabTestDTO() {
		return labTestDTO;
	}
	
	public void setLabTestDTO(LabTestDTO labTestDTO) {
		this.labTestDTO = labTestDTO;
	}
	public String getHeadName() {
		return headName;
	}
	
	public void setHeadName(String headName) {
		this.headName = headName;
	}
	
	public Integer getUnitId() {
		return unitId;
	}
	
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	
	public Date getCreatedDate() {
		return createdDate;
	}
	
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	
	public Integer getCreatedBy() {
		return createdBy;
	}
	
	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}
	
	public Date getUpdatedDate() {
		return updatedDate;
	}
	
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}
	
	public Integer getUpdatedBy() {
		return updatedBy;
	}
	
	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
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
	
	public Integer getIdTest() {
		return idTest;
	}
	
	public void setIdTest(Integer idTest) {
		this.idTest = idTest;
	}
	
	public String getTestName() {
		return testName;
	}
	
	public void setTestName(String testName) {
		this.testName = testName;
	}
	
	public String getTestCode() {
		return testCode;
	}
	
	public void setTestCode(String testCode) {
		this.testCode = testCode;
	}
	
	public float getTestRate() {
		return testRate;
	}
	
	public void setTestRate(float testRate) {
		this.testRate = testRate;
	}
	
	public String getLabProfileTestStatus() {
		return labProfileTestStatus;
	}

	public void setLabProfileTestStatus(String labProfileTestStatus) {
		this.labProfileTestStatus = labProfileTestStatus;
	}
	
	public Integer getIdprofile() {
		return idprofile;
	}

	public void setIdprofile(Integer idprofile) {
		this.idprofile = idprofile;
	}
	
	public Integer getSequence() {
		return sequence;
	}

	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}

	@Override
	public int compareTo(LabProfileTestCompDTO labProfileTestCompDTO) {
		int compareSeq = ((LabProfileTestCompDTO)labProfileTestCompDTO).getSequence();
        /* For Ascending order*/
        return this.sequence - compareSeq;
	}
	
	@Override
	public String toString() {
		return "LabProfileTestCompDTO [idlabProfileTestComp=" + idlabProfileTestComp + ", labTestDTO=" + labTestDTO
				+ ", labProfileTestStatus=" + labProfileTestStatus + ", headName=" + headName + ", unitId=" + unitId
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + ", deletedDate=" + deletedDate + ", deletedBy=" + deletedBy
				+ ", sequence=" + sequence + ", idTest=" + idTest + ", testName=" + testName + ", testCode=" + testCode
				+ ", testRate=" + testRate + ", idprofile=" + idprofile + "]";
	}
}