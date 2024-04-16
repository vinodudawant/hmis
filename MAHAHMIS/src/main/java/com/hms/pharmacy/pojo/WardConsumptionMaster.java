package com.hms.pharmacy.pojo;

import java.util.ArrayList;
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

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_ward_consumption_master")
public class WardConsumptionMaster {
	
	@Id
	@GeneratedValue
	@Column(name="ward_sale_id")
	private Integer wardSaleId;
	
	@Column(name="ward_sale_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date wardSaleDate;
	
	@Column(name="ward_sale_time")
	private String wardSaleTime=null;

	@Column(name="ward_sale_delete_flag")
	private Integer  wardSaleDeleteFlag=0;
	
	@Column(name = "ward_sale_store_id")
	private Integer wardSaleStoreId=0;
	
	@Column(name = "ward_sale_user_id")
	private Integer wardSaleUserId=0;
	
	@Column(name = "ward_sale_ward_id")
	private Integer wardSaleWardId=0;
	
	@Column(name="ward_sale_consume_type")	
    private String wardSaleConsumpType=null;
	
	@Column(name="ward_sale_dispenceTo")	
    private String wardSaleDispenceTo=null;
	
	@Column(name="ward_sale_narration")	
    private String wardSaleNarration=null;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "ward_slave_master_id", referencedColumnName = "ward_sale_id")
	private List<WardConsumptionSlave> wardConsumptionSlaves = new ArrayList<WardConsumptionSlave>();
	
	@Column(name="Treatment_Id")	
    private String treatmentId;

	public String getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}
	
	public Integer getWardSaleId() {
		return wardSaleId;
	}

	public void setWardSaleId(Integer wardSaleId) {
		this.wardSaleId = wardSaleId;
	}

	public Date getWardSaleDate() {
		return wardSaleDate;
	}

	public void setWardSaleDate(Date wardSaleDate) {
		this.wardSaleDate = wardSaleDate;
	}

	public String getWardSaleTime() {
		return wardSaleTime;
	}

	public void setWardSaleTime(String wardSaleTime) {
		this.wardSaleTime = wardSaleTime;
	}

	public Integer getWardSaleDeleteFlag() {
		return wardSaleDeleteFlag;
	}

	public void setWardSaleDeleteFlag(Integer wardSaleDeleteFlag) {
		this.wardSaleDeleteFlag = wardSaleDeleteFlag;
	}

	public Integer getWardSaleStoreId() {
		return wardSaleStoreId;
	}

	public void setWardSaleStoreId(Integer wardSaleStoreId) {
		this.wardSaleStoreId = wardSaleStoreId;
	}

	public Integer getWardSaleUserId() {
		return wardSaleUserId;
	}

	public void setWardSaleUserId(Integer wardSaleUserId) {
		this.wardSaleUserId = wardSaleUserId;
	}

	public Integer getWardSaleWardId() {
		return wardSaleWardId;
	}

	public void setWardSaleWardId(Integer wardSaleWardId) {
		this.wardSaleWardId = wardSaleWardId;
	}

	public String getWardSaleConsumpType() {
		return wardSaleConsumpType;
	}

	public void setWardSaleConsumpType(String wardSaleConsumpType) {
		this.wardSaleConsumpType = wardSaleConsumpType;
	}

	public String getWardSaleDispenceTo() {
		return wardSaleDispenceTo;
	}

	public void setWardSaleDispenceTo(String wardSaleDispenceTo) {
		this.wardSaleDispenceTo = wardSaleDispenceTo;
	}

	public List<WardConsumptionSlave> getWardConsumptionSlaves() {
		return wardConsumptionSlaves;
	}

	public void setWardConsumptionSlaves(
			List<WardConsumptionSlave> wardConsumptionSlaves) {
		this.wardConsumptionSlaves = wardConsumptionSlaves;
	}

	public String getWardSaleNarration() {
		return wardSaleNarration;
	}

	public void setWardSaleNarration(String wardSaleNarration) {
		this.wardSaleNarration = wardSaleNarration;
	}
}
