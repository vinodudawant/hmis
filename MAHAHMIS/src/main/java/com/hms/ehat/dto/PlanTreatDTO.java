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

@Entity
@Table(name = "ehat_plantreatment")
public class PlanTreatDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name ="idplan")
	private int idplan;
	
	
	@Column(name = "pid")
	private int pid;

	@Column(name = "tid")
	private int tid;
	
	@Column(name = "chka")
	private String chka;

	@Column(name = "chkb")
	private String chkb;

	@Column(name = "chkc")
	private String chkc;

	@Column(name = "chkd")
	private String chkd;

	@Column(name = "chke")
	private String chke;

	@Column(name = "chkf")
	private String chkf;

	@Column(name = "chkg")
	private String chkg;

	@Column(name = "chkh")
	private String chkh;

	@Column(name = "chki")
	private String chki;
	
	public int getIdplan() {
		return idplan;
	}

	public void setIdplan(int idplan) {
		this.idplan = idplan;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public int getTid() {
		return tid;
	}

	public void setTid(int tid) {
		this.tid = tid;
	}

	public String getChka() {
		return chka;
	}

	public void setChka(String chka) {
		this.chka = chka;
	}

	public String getChkb() {
		return chkb;
	}

	public void setChkb(String chkb) {
		this.chkb = chkb;
	}

	public String getChkc() {
		return chkc;
	}

	public void setChkc(String chkc) {
		this.chkc = chkc;
	}

	public String getChkd() {
		return chkd;
	}

	public void setChkd(String chkd) {
		this.chkd = chkd;
	}

	public String getChke() {
		return chke;
	}

	public void setChke(String chke) {
		this.chke = chke;
	}

	public String getChkf() {
		return chkf;
	}

	public void setChkf(String chkf) {
		this.chkf = chkf;
	}

	public String getChkg() {
		return chkg;
	}

	public void setChkg(String chkg) {
		this.chkg = chkg;
	}

	public String getChkh() {
		return chkh;
	}

	public void setChkh(String chkh) {
		this.chkh = chkh;
	}

	public String getChki() {
		return chki;
	}

	public void setChki(String chki) {
		this.chki = chki;
	}

	public List<PlanTreatDTO> getPlanlist() {
		return planlist;
	}

	public void setPlanlist(List<PlanTreatDTO> planlist) {
		this.planlist = planlist;
	}

	public int getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(int addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	@Transient
	private List<PlanTreatDTO> planlist;
	
	
	@Column(name = "added_by",updatable=false)
	private int addedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date",updatable=false)
	private Date addedDate;


	@Column(name = "updated_by")
	private int updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;

	@Column(name = "ip_address")
	private String ipAddress;
	
	
}