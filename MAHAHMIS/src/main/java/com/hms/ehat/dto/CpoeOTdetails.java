package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "ehat_view_cpoe_ot_service_details")
public class CpoeOTdetails {
	

	@Id
	@Column(name = "bill_details_ipd_id")
	private int billipd_id;
	
	
	@Column(name = "treatment_id")
	private int treatmentid;
	
	@Column(name = "service_id")
	private int serviceid;
	
	@Column(name = "doctor_id")
	private int doctor_id;
	
	@Column(name = "service_name")
	private String servicename;
	
	@Column(name = "id")
	private int categoryid;
	
	
	@Column(name = "category_name")
	private String categoryName;
	@Column(name = "count_ot")
	private int count_ot;
	
	
	@Column(name = "ot_flag")
	private String ot_flag;
	@Column(name = "drdesk_flag")
	private String drdesk_flag;
	
	@Column(name = "category_charges")
	private Double categorycharges;
	
	
	@Column(name = "emrPer")
	private Double emrPer;
	
	@Column(name = "quantity")
	private double quantity;
	
	@Column(name = "amount")
	private Double amount;
	@Column(name = "other_amount")
	private Double other_amount;
	
	@Column(name = "fromdate")
	private String fromdate;
	@Column(name = "tomdate")
	private String tomdate;
	
	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public int getBillipd_id() {
		return billipd_id;
	}

	public void setBillipd_id(int billipd_id) {
		this.billipd_id = billipd_id;
	}

	public String getOt_flag() {
		return ot_flag;
	}

	public void setOt_flag(String ot_flag) {
		this.ot_flag = ot_flag;
	}
	@Column(name = "docName")
	private String docName;
	
	@Column(name = "created_date_time")
	private Date created_date_time;
	
	
	
	
	public Date getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(Date created_date_time) {
		this.created_date_time = created_date_time;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	

	public int getTreatmentid() {
		return treatmentid;
	}

	public void setTreatmentid(int treatmentid) {
		this.treatmentid = treatmentid;
	}

	public int getServiceid() {
		return serviceid;
	}

	public void setServiceid(int serviceid) {
		this.serviceid = serviceid;
	}

	public String getServicename() {
		return servicename;
	}

	public void setServicename(String servicename) {
		this.servicename = servicename;
	}



	public int getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(int categoryid) {
		this.categoryid = categoryid;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Double getCategorycharges() {
		return categorycharges;
	}

	public void setCategorycharges(Double categorycharges) {
		this.categorycharges = categorycharges;
	}

	 
	 
	public String getDrdesk_flag() {
		return drdesk_flag;
	}

	public void setDrdesk_flag(String drdesk_flag) {
		this.drdesk_flag = drdesk_flag;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	@Transient
    private List<CpoeOTdetails> Cpoedetails;
	
	public List<CpoeOTdetails> getCpoedetails() {
		return Cpoedetails;
	}

	public void setCpoedetails(List<CpoeOTdetails> cpoedetails) {
		Cpoedetails = cpoedetails;
	}

	public int getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}

	public Double getOther_amount() {
		return other_amount;
	}

	public void setOther_amount(Double other_amount) {
		this.other_amount = other_amount;
	}

	public int getCount_ot() {
		return count_ot;
	}

	public void setCount_ot(int count_ot) {
		this.count_ot = count_ot;
	}

	public Double getEmrPer() {
		return emrPer;
	}

	public void setEmrPer(Double emrPer) {
		this.emrPer = emrPer;
	}

	public String getFromdate() {
		return fromdate;
	}

	public void setFromdate(String fromdate) {
		this.fromdate = fromdate;
	}

	public String getTomdate() {
		return tomdate;
	}

	public void setTomdate(String tomdate) {
		this.tomdate = tomdate;
	}
	

}
