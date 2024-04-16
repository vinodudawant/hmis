package com.hms.ehat.dto;

import java.io.Serializable;
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
@Table(name = "pathology_labinformation")
public class LabInformationDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private int idOwnLab;

	@Column(name = "lab_code")
	private String labCode;

	@Column(name = "lab_name")
	private String name;

	@Column(name = "address")
	private String address;

	@Column(name = "email")
	private String email;

	@Column(name = "pathalogist")
	private String pathalogist;

	@Column(name = "degree")
	private String degree;

	@Column(name = "telephone_no")
	private String telephoneNo;

	@Column(name = "opening_time")
	private String openingTime;

	@Column(name = "closing_time")
	private String closingTime;

	@Column(name = "lunch_time")
	private String lunchTime;

	@Column(name = "closed_day")
	private String closedDay;

	@Column(name = "footer_name")
	private String footerName;

	@Column(name = "useletterhead")
	private String useletterhead;

	@Column(name = "showreportfooter")
	private String showreportfooter;

	@Column(name = "unit_id")
	private int unitId;

	@Column(name = "delete_status", length = 2)
	private String deleted = "N";
	
	@Column(name = "created_by")
	private int createdBy;
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date")
	private Date deletedDate;

	@Transient
	private List<LabInformationDTO> labInformationList;

	public int getIdOwnLab() {
		return idOwnLab;
	}

	public void setIdOwnLab(int idOwnLab) {
		this.idOwnLab = idOwnLab;
	}

	public String getLabCode() {
		return labCode;
	}

	public void setLabCode(String labCode) {
		this.labCode = labCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPathalogist() {
		return pathalogist;
	}

	public void setPathalogist(String pathalogist) {
		this.pathalogist = pathalogist;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getTelephoneNo() {
		return telephoneNo;
	}

	public void setTelephoneNo(String telephoneNo) {
		this.telephoneNo = telephoneNo;
	}

	public String getOpeningTime() {
		return openingTime;
	}

	public void setOpeningTime(String openingTime) {
		this.openingTime = openingTime;
	}

	public String getClosingTime() {
		return closingTime;
	}

	public void setClosingTime(String closingTime) {
		this.closingTime = closingTime;
	}

	public String getLunchTime() {
		return lunchTime;
	}

	public void setLunchTime(String lunchTime) {
		this.lunchTime = lunchTime;
	}

	public String getClosedDay() {
		return closedDay;
	}

	public void setClosedDay(String closedDay) {
		this.closedDay = closedDay;
	}

	public String getFooterName() {
		return footerName;
	}

	public void setFooterName(String footerName) {
		this.footerName = footerName;
	}

	public String getUseletterhead() {
		return useletterhead;
	}

	public void setUseletterhead(String useletterhead) {
		this.useletterhead = useletterhead;
	}

	public String getShowreportfooter() {
		return showreportfooter;
	}

	public void setShowreportfooter(String showreportfooter) {
		this.showreportfooter = showreportfooter;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
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

	public List<LabInformationDTO> getLabInformationList() {
		return labInformationList;
	}

	public void setLabInformationList(List<LabInformationDTO> labInformationList) {
		this.labInformationList = labInformationList;
	}

	@Override
	public String toString() {
		return "LabInformationDTO [idOwnLab=" + idOwnLab + ", labCode="
				+ labCode + ", name=" + name + ", address=" + address
				+ ", email=" + email + ", pathalogist=" + pathalogist
				+ ", degree=" + degree + ", telephoneNo=" + telephoneNo
				+ ", openingTime=" + openingTime + ", closingTime="
				+ closingTime + ", lunchTime=" + lunchTime + ", closedDay="
				+ closedDay + ", footerName=" + footerName + ", useletterhead="
				+ useletterhead + ", showreportfooter=" + showreportfooter
				+ ", unitId=" + unitId + ", deleted=" + deleted
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedBy=" + deletedBy + ", createDate=" + createDate
				+ ", updatedDate=" + updatedDate + ", deletedDate="
				+ deletedDate + ", labInformationList=" + labInformationList
				+ "]";
	}
	
}
