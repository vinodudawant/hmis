package com.hms.ehat.dto;

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
@Table(name = "ehat_payment_responsible")
public class PaymentResponsibleDto
{
	@Id
	@GeneratedValue
	@Column(name = "pay_responsible")
	private int payResId;
	
	@Column(name = "prefix")
	private String prefix2;

	@Column(name = "f_name")
	private String payResFName;
	
	@Column(name = "m_name")
	private String payResMName;
	
	@Column(name = "l_name")
	private String payResLName;

	@Column(name = "mobile")
	private String payResmobile;
	
	@Column(name = "gender")
	private String payResgender;
	
	@Column(name = "address")
	private String payResAddressText;
	
	@Column(name = "relation")
	private int relation;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private int createdBy;
	
	@CreationTimestamp
	@Column(name = "created_date_time")
	private Date createdDateTime;

	@Column(name = "updated_by")
	private int updatedBy;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private int deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	//@Column(name = "patient_id")
	@Transient
	private int patientId;
	
	//@Column(name = "bill_id")
	@Transient
	private int billId;
	
	//@Column(name = "treatmentId")
	@Transient
	private int treatmentId;
	
	@Column(name = "unit_id", columnDefinition = "int default 0")
	private int unitId = 0;
	
	@Column(name = "adharcard_no")
	private String payResAdharNo;
	
	
	@Column(name = "departmentId")
	private int departmentId;
	
	
	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public int getRelation() {
		return relation;
	}

	public void setRelation(int relation) {
		this.relation = relation;
	}

	public String getPayResAdharNo() {
		return payResAdharNo;
	}

	public void setPayResAdharNo(String payResAdharNo) {
		this.payResAdharNo = payResAdharNo;
	}

	@Transient
	private List<PaymentResponsibleDto> listPayRes;

	public List<PaymentResponsibleDto> getListPayRes() {
		return listPayRes;
	}

	public void setListPayRes(List<PaymentResponsibleDto> listPayRes) {
		this.listPayRes = listPayRes;
	}

	public int getPayResId() {
		return payResId;
	}

	public void setPayResId(int payResId) {
		this.payResId = payResId;
	}

	

	public String getPayResFName() {
		return payResFName;
	}

	public void setPayResFName(String payResFName) {
		this.payResFName = payResFName;
	}

	public String getPayResMName() {
		return payResMName;
	}

	public void setPayResMName(String payResMName) {
		this.payResMName = payResMName;
	}

	public String getPayResLName() {
		return payResLName;
	}

	public void setPayResLName(String payResLName) {
		this.payResLName = payResLName;
	}

	public String getPayResmobile() {
		return payResmobile;
	}

	public void setPayResmobile(String payResmobile) {
		this.payResmobile = payResmobile;
	}

	public String getPayResgender() {
		return payResgender;
	}

	public void setPayResgender(String payResgender) {
		this.payResgender = payResgender;
	}

	public String getPayResAddressText() {
		return payResAddressText;
	}

	public void setPayResAddressText(String payResAddressText) {
		this.payResAddressText = payResAddressText;
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

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getBillId() {
		return billId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getPrefix2() {
		return prefix2;
	}

	public void setPrefix2(String prefix2) {
		this.prefix2 = prefix2;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}	
}
