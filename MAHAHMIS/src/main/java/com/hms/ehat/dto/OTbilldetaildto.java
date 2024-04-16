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

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "ehat_view_ot_bill_ipd")
public class OTbilldetaildto {

	
	@Id
	@Column(name = "other_bill_details_id_for_ipd")
	private Integer otherbildetailidipd;

	@Column(name = "treatment_id")
	private Integer treatmentId;

	@Column(name = "patient_id")
	private Integer patienttId;
	
	
	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "sub_service_id")
	private Integer subServiceId;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "child_sub_service_id")
    private Integer childSubServiceId;

	
	@Column(name = "rate")
	private double rate;

	@Column(name = "amount")
	private double amount;
	@Column(name = "qty")
	private double qty;
	
	@Column(name = "otherflag")
	private String otherflag;
	
	
	@Column(name = "bill_details_id")
	private int	bill_details_id;
    public int getBill_details_id() {
		return bill_details_id;
	}


	public void setBill_details_id(int bill_details_id) {
		this.bill_details_id = bill_details_id;
	}


	public String getOtherflag() {
		return otherflag;
	}


	public void setOtherflag(String otherflag) {
		this.otherflag = otherflag;
	}


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date",updatable=false)
	private Date createdDate;
	public Date getCreatedDate() {
		return createdDate;
	}


	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	public double getAmount() {
		return amount;
	}


	public void setAmount(double amount) {
		this.amount = amount;
	}


	public double getQty() {
		return qty;
	}


	public void setQty(double qty) {
		this.qty = qty;
	}


	@Transient
	private List<OTbilldetaildto> listEhatOTBillDetailForIpd;
	
	
	public List<OTbilldetaildto> getListEhatOTBillDetailForIpd() {
		return listEhatOTBillDetailForIpd;
	}


	public void setListEhatOTBillDetailForIpd(
			List<OTbilldetaildto> listEhatOTBillDetailForIpd) {
		this.listEhatOTBillDetailForIpd = listEhatOTBillDetailForIpd;
	}


	@Column(name = "count_ot",columnDefinition="int default 0")
	private int countot;

	@Column(name = "ot_flag")
	private String ot_flag="N";
	/*-------------------Generate Getter And Setters----------------------------------*/
	@Column(name = "doctor_id",columnDefinition="int default 0")
	private int doctor_id;
	@Column(name = "docName")
	private String docName="-";
	@Column(name = "service_name")
	private String service_name="-";	
	public String getService_name() {
		return service_name;
	}


	public void setService_name(String service_name) {
		this.service_name = service_name;
	}


	public int getDoctor_id() {
		return doctor_id;
	}


	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}


	public String getDocName() {
		return docName;
	}


	public void setDocName(String docName) {
		this.docName = docName;
	}


	public String getOt_flag() {
		return ot_flag;
	}


	public void setOt_flag(String ot_flag) {
		this.ot_flag = ot_flag;
	}




	public int getCountot() {
		return countot;
	}


	public void setCountot(int countot) {
		this.countot = countot;
	}



	public Integer getTreatmentId() {
		return treatmentId;
	}


	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}


	public Integer getServiceId() {
		return serviceId;
	}


	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}


	public Integer getSubServiceId() {
		return subServiceId;
	}


	public void setSubServiceId(Integer subServiceId) {
		this.subServiceId = subServiceId;
	}


	public String getCategoryName() {
		return categoryName;
	}


	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}



	public double getRate() {
		return rate;
	}


	public void setRate(double rate) {
		this.rate = rate;
	}

	public Integer getOtherbildetailidipd() {
		return otherbildetailidipd;
	}


	public void setOtherbildetailidipd(Integer otherbildetailidipd) {
		this.otherbildetailidipd = otherbildetailidipd;
	}



	public Integer getPatienttId() {
		return patienttId;
	}


	public void setPatienttId(Integer patienttId) {
		this.patienttId = patienttId;
	}


	public Integer getChildSubServiceId() {
		return childSubServiceId;
	}


	public void setChildSubServiceId(Integer childSubServiceId) {
		this.childSubServiceId = childSubServiceId;
	}


	@Column(name = "batch_id")
	private Integer batchid;
	@Transient
	int consumtionmasterid;
	@Transient
	int consumtionslaveid;
	
	@Column(name = "batch_code")
	private String batchCode; 

	@Column(name = "batch_exp")
	private String batchExp;
	
	@Transient
	private Integer mrnSlaveId;


	
	public Integer getBatchid() {
		return batchid;
	}


	public void setBatchid(Integer batchid) {
		this.batchid = batchid;
	}


	public int getConsumtionmasterid() {
		return consumtionmasterid;
	}


	public void setConsumtionmasterid(int consumtionmasterid) {
		this.consumtionmasterid = consumtionmasterid;
	}


	public int getConsumtionslaveid() {
		return consumtionslaveid;
	}


	public void setConsumtionslaveid(int consumtionslaveid) {
		this.consumtionslaveid = consumtionslaveid;
	}


	public String getBatchCode() {
		return batchCode;
	}


	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}


	public String getBatchExp() {
		return batchExp;
	}


	public void setBatchExp(String batchExp) {
		this.batchExp = batchExp;
	}


	public Integer getMrnSlaveId() {
		return mrnSlaveId;
	}


	public void setMrnSlaveId(Integer mrnSlaveId) {
		this.mrnSlaveId = mrnSlaveId;
	}
	
	
		
}
