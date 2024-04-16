package com.hms.ehat.controller;

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
/**
 * @author Paras R Suryawanshi
 * @Date 21-Nov-2017
 * @code For SaveOTPercentage
 * ***/
@Entity
@Table(name = "ehat_otpercentageconfiguration")
public class OTPercentageDTO {
	@Id
	@GeneratedValue
	@Column(name = "op_id")	
	private int opid;	
	@Column(name = "confugration_flag",columnDefinition="varchar(255) default '-'")	
	private String confugrationflag="N";
	@Column(name = "service_id",columnDefinition="int default 0")	
	private int serviceId=0 ;
	@Column(name = "subservice_id",columnDefinition="int default 0")	
	private int subserviceId;
	@Column(name = "childsubservice_id",columnDefinition="int default 0")	
	private int childSubServiceId=0;
	@Column(name = "percentage",columnDefinition="int default 0.0")	
	private double  percentage= 0.0;

	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time")
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	
	@Transient
	private String Subservicesname;
	
	public String getSubservicesname() {
		return Subservicesname;
	}

	public void setSubservicesname(String subservicesname) {
		Subservicesname = subservicesname;
	}

	@Transient
	private List<OTPercentageDTO> listOTPercentage;

	public int getOpid() {
		return opid;
	}

	public void setOpid(int opid) {
		this.opid = opid;
	}

	public String getConfugrationflag() {
		return confugrationflag;
	}

	public void setConfugrationflag(String confugrationflag) {
		this.confugrationflag = confugrationflag;
	}



	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public int getSubserviceId() {
		return subserviceId;
	}

	public void setSubserviceId(int subserviceId) {
		this.subserviceId = subserviceId;
	}

	public int getChildSubServiceId() {
		return childSubServiceId;
	}

	public void setChildSubServiceId(int childSubServiceId) {
		this.childSubServiceId = childSubServiceId;
	}

	public double getPercentage() {
		return percentage;
	}

	public void setPercentage(double percentage) {
		this.percentage = percentage;
	}

	public List<OTPercentageDTO> getListOTPercentage() {
		return listOTPercentage;
	}

	public void setListOTPercentage(List<OTPercentageDTO> listOTPercentage) {
		this.listOTPercentage = listOTPercentage;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	



}
