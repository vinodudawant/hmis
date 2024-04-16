package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Transient;

public class GroupwiseProfeesDto {

	int id;
	String doctorName;
	double groassAmt,concn,hpDedcn,netAmt,indPerDrAmt,distPerDrAmt,indPerDr,distPerDr,fromDistPerDr,total,tds,chAmt;
	List<GroupwiseProfeesDto> lstGroupProfess;
	
	@Transient
	private Integer doctorId;
	
	
	public Integer getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public double getGroassAmt() {
		return groassAmt;
	}
	public void setGroassAmt(double groassAmt) {
		this.groassAmt = groassAmt;
	}
	public double getConcn() {
		return concn;
	}
	public void setConcn(double concn) {
		this.concn = concn;
	}
	public double getHpDedcn() {
		return hpDedcn;
	}
	public void setHpDedcn(double hpDedcn) {
		this.hpDedcn = hpDedcn;
	}
	public double getNetAmt() {
		return netAmt;
	}
	public void setNetAmt(double netAmt) {
		this.netAmt = netAmt;
	}
	public double getIndPerDrAmt() {
		return indPerDrAmt;
	}
	public void setIndPerDrAmt(double indPerDrAmt) {
		this.indPerDrAmt = indPerDrAmt;
	}
	public double getDistPerDrAmt() {
		return distPerDrAmt;
	}
	public void setDistPerDrAmt(double distPerDrAmt) {
		this.distPerDrAmt = distPerDrAmt;
	}		
	public double getFromDistPerDr() {
		return fromDistPerDr;
	}
	public void setFromDistPerDr(double fromDistPerDr) {
		this.fromDistPerDr = fromDistPerDr;
	}
	public double getIndPerDr() {
		return indPerDr;
	}
	public void setIndPerDr(double indPerDr) {
		this.indPerDr = indPerDr;
	}
	public double getDistPerDr() {
		return distPerDr;
	}
	public void setDistPerDr(double distPerDr) {
		this.distPerDr = distPerDr;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public double getTds() {
		return tds;
	}
	public void setTds(double tds) {
		this.tds = tds;
	}
	public double getChAmt() {
		return chAmt;
	}
	public void setChAmt(double chAmt) {
		this.chAmt = chAmt;
	}
	public List<GroupwiseProfeesDto> getLstGroupProfess() {
		return lstGroupProfess;
	}
	public void setLstGroupProfess(List<GroupwiseProfeesDto> lstGroupProfess) {
		this.lstGroupProfess = lstGroupProfess;
	}
}
