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
@Table(name = "ehat_otconsent")
public class otConsentDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;

	
	@Id
	@GeneratedValue
	@Column(name ="idforconsnt")
	private int idforconsnt;
	
	
	@Column(name = "patient_id")
	private int pid;

	@Column(name = "treatment_id")
	private int tid;

	@Column(name = "dateconsnt")
	private String dateconsnt;

	@Column(name = "que1")
	private String que1;

	@Column(name = "que2")
	private String que2;

	@Column(name = "que3")
	private String que3;

	@Column(name = "que5")
	private String que5;

	@Column(name = "que6")
	private String que6;

	@Column(name = "que7")
	private String que7;

	@Column(name = "que8")
	private String que8;

	@Column(name = "que9")
	private String que9;

	@Column(name = "que10")
	private String que10;

	@Column(name = "que11")
	private String que11;

	@Column(name = "chkdiabetes")
	private String chkdiabetes;

	@Column(name = "chkhighblood")
	private String chkhighblood;

	@Column(name = "chkhrtdisease")
	private String chkhrtdisease;

	@Column(name = "chkasthma")
	private String chkasthma;

	@Column(name = "chkangiography")
	private String chkangiography;

	@Column(name = "chkangioplasty")
	private String chkangioplasty;

	@Column(name = "chkbypass")
	private String chkbypass;

	@Column(name = "chkjaundice")
	private String chkjaundice;
	
	@Column(name = "chkfever")
	private String chkfever;
	
	@Transient
	private List<otConsentDTO> listConsent;
	
	
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

	public int getIdforconsnt() {
		return idforconsnt;
	}

	public void setIdforconsnt(int idforconsnt) {
		this.idforconsnt = idforconsnt;
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

	public String getDateconsnt() {
		return dateconsnt;
	}

	public void setDateconsnt(String dateconsnt) {
		this.dateconsnt = dateconsnt;
	}

	public String getQue1() {
		return que1;
	}

	public void setQue1(String que1) {
		this.que1 = que1;
	}

	public String getQue2() {
		return que2;
	}

	public void setQue2(String que2) {
		this.que2 = que2;
	}

	public String getQue3() {
		return que3;
	}

	public void setQue3(String que3) {
		this.que3 = que3;
	}

	public String getQue5() {
		return que5;
	}

	public void setQue5(String que5) {
		this.que5 = que5;
	}

	public String getQue6() {
		return que6;
	}

	public void setQue6(String que6) {
		this.que6 = que6;
	}

	public String getQue7() {
		return que7;
	}

	public void setQue7(String que7) {
		this.que7 = que7;
	}

	public String getQue8() {
		return que8;
	}

	public void setQue8(String que8) {
		this.que8 = que8;
	}

	public String getQue9() {
		return que9;
	}

	public void setQue9(String que9) {
		this.que9 = que9;
	}

	public String getQue10() {
		return que10;
	}

	public void setQue10(String que10) {
		this.que10 = que10;
	}

	public String getQue11() {
		return que11;
	}

	public void setQue11(String que11) {
		this.que11 = que11;
	}

	public String getChkdiabetes() {
		return chkdiabetes;
	}

	public void setChkdiabetes(String chkdiabetes) {
		this.chkdiabetes = chkdiabetes;
	}

	public String getChkhighblood() {
		return chkhighblood;
	}

	public void setChkhighblood(String chkhighblood) {
		this.chkhighblood = chkhighblood;
	}

	public String getChkhrtdisease() {
		return chkhrtdisease;
	}

	public void setChkhrtdisease(String chkhrtdisease) {
		this.chkhrtdisease = chkhrtdisease;
	}

	public String getChkasthma() {
		return chkasthma;
	}

	public void setChkasthma(String chkasthma) {
		this.chkasthma = chkasthma;
	}

	public String getChkangiography() {
		return chkangiography;
	}

	public void setChkangiography(String chkangiography) {
		this.chkangiography = chkangiography;
	}

	public String getChkangioplasty() {
		return chkangioplasty;
	}

	public void setChkangioplasty(String chkangioplasty) {
		this.chkangioplasty = chkangioplasty;
	}

	public String getChkbypass() {
		return chkbypass;
	}

	public void setChkbypass(String chkbypass) {
		this.chkbypass = chkbypass;
	}

	public String getChkjaundice() {
		return chkjaundice;
	}

	public void setChkjaundice(String chkjaundice) {
		this.chkjaundice = chkjaundice;
	}

	public String getChkfever() {
		return chkfever;
	}

	public void setChkfever(String chkfever) {
		this.chkfever = chkfever;
	}

	public List<otConsentDTO> getListConsent() {
		return listConsent;
	}

	public void setListConsent(List<otConsentDTO> listConsent) {
		this.listConsent = listConsent;
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

	
}
