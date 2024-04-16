package com.hms.ehat.dto;

import java.io.Serializable;
import java.math.BigInteger;
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
import javax.persistence.criteria.CriteriaBuilder.In;

@Entity
@Table(name = "ehat_NewBillQuotation")
public class NewBillQuotation implements Serializable {


	@Id
	@GeneratedValue
	@Column(name = "quotation_id")
	private Integer quotationId;
	
	@Column(name = "service_id")
	private int serviceId=0;
	
	@Column(name = "sub_service_id")
	private int subServiceId=0;
	
	@Column(name = "service_name")
	private String serviceName;
	
	@Column(name = "sub_service_name")
	private String subServiceName;
	
	@Column(name = "rate")
	private double rate=0;
	
	@Column(name = "quantity")
	private Integer quantity=1;
	
	@Column(name = "amount")
	private double amount=0;	
	
		
	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy=0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id")
	private int unitId=0;
	
	@Column(name = "quotation_count")
	private Integer quotationCount=0;
	
	@Column(name = "sponsor_id")
	private Integer sponsorId=0;	
	
	@Column(name = "charges_slave_id")
	private Integer chargesSlaveId=0;
	
	@Column(name = "hallId")
	private Integer hallId=0;

	@Column(name = "quotation_name")
	private String quotationName="-";
	
	@Transient
	private BigInteger qty;
	
	@Transient
	private Integer patientId;
	
	@Transient
	private List<NewBillQuotation> listBillDetailsQuotation;


	public Integer getQuotationId() {
		return quotationId;
	}


	public int getServiceId() {
		return serviceId;
	}


	public int getSubServiceId() {
		return subServiceId;
	}




	public String getSubServiceName() {
		return subServiceName;
	}


	public double getRate() {
		return rate;
	}




	public double getAmount() {
		return amount;
	}


	public String getDeleted() {
		return deleted;
	}


	public Integer getCreatedBy() {
		return createdBy;
	}


	public Date getCreatedDateTime() {
		return createdDateTime;
	}


	public Integer getUpdatedBy() {
		return updatedBy;
	}


	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}


	public Integer getDeletedBy() {
		return deletedBy;
	}


	public Date getDeletedDateTime() {
		return deletedDateTime;
	}


	public int getUnitId() {
		return unitId;
	}


	public Integer getQuotationCount() {
		return quotationCount;
	}


	public Integer getSponsorId() {
		return sponsorId;
	}


	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}


	public Integer getHallId() {
		return hallId;
	}


	public List<NewBillQuotation> getListBillDetailsQuotation() {
		return listBillDetailsQuotation;
	}


	public void setQuotationId(Integer quotationId) {
		this.quotationId = quotationId;
	}


	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}


	public void setSubServiceId(int subServiceId) {
		this.subServiceId = subServiceId;
	}


	


	public void setSubServiceName(String subServiceName) {
		this.subServiceName = subServiceName;
	}


	public void setRate(double rate) {
		this.rate = rate;
	}


	


	public Integer getQuantity() {
		return quantity;
	}


	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}


	public void setAmount(double amount) {
		this.amount = amount;
	}


	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}


	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}


	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}


	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}


	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}


	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}


	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}


	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}


	public void setQuotationCount(Integer quotationCount) {
		this.quotationCount = quotationCount;
	}


	public void setSponsorId(Integer sponsorId) {
		this.sponsorId = sponsorId;
	}


	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}


	public void setHallId(Integer hallId) {
		this.hallId = hallId;
	}


	public void setListBillDetailsQuotation(
			List<NewBillQuotation> listBillDetailsQuotation) {
		this.listBillDetailsQuotation = listBillDetailsQuotation;
	}


	public String getServiceName() {
		return serviceName;
	}


	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}


	public BigInteger getQty() {
		return qty;
	}

	public void setQty(BigInteger qty) {
		this.qty = qty;
	}


	public String getQuotationName() {
		return quotationName;
	}


	public void setQuotationName(String quotationName) {
		this.quotationName = quotationName;
	}


	public Integer getPatientId() {
		return patientId;
	}


	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	
	
	

}
