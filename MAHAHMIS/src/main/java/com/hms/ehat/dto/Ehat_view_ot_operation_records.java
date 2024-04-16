package com.hms.ehat.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;
@Entity 
@Immutable
@Table(name = "ehat_view_ot_operation_records")
public class Ehat_view_ot_operation_records {
	
	@Id
	@Column(name = "compid")
	private int compid;

	
	@Column(name = "company")
	private String company;
	
	@Column(name = "policyid")
	private int policyid;
	
	
	@Column(name = "treatment_id")
	private String treatment_id;
	
	@Transient
	String docname;
	@Transient
	Integer count;
	@Transient
    private List<Ehat_view_ot_operation_records> listdetails;
	@Transient
	List<String> companname ;

	public String getDocname() {
		return docname;
	}



	public Integer getCount() {
		return count;
	}



	public void setCount(Integer count) {
		this.count = count;
	}



	public void setDocname(String docname) {
		this.docname = docname;
	}



	public List<String> getCompanname() {
		return companname;
	}



	public void setCompanname(List<String> companname) {
		this.companname = companname;
	}



	public int getCompid() {
		return compid;
	}



	public void setCompid(int compid) {
		this.compid = compid;
	}



	public String getCompany() {
		return company;
	}



	public void setCompany(String company) {
		this.company = company;
	}



	public int getPolicyid() {
		return policyid;
	}



	public void setPolicyid(int policyid) {
		this.policyid = policyid;
	}



	public String getTreatment_id() {
		return treatment_id;
	}



	public void setTreatment_id(String treatment_id) {
		this.treatment_id = treatment_id;
	}



	public List<Ehat_view_ot_operation_records> getListdetails() {
		return listdetails;
	}



	public void setListdetails(List<Ehat_view_ot_operation_records> listdetails) {
		this.listdetails = listdetails;
	}
	

}
