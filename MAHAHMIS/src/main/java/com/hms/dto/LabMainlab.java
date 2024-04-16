

package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class LabMainlab implements Serializable {

	private int idownlab;

	private String labCode;

	private String name;

	private String address;

	private String email;

	private String pathalogist;

	private String degree;

	private String telephoneNo;

	private String openingTime;

	private String closingTime;

	private String lunchTime;

	private String closedDay;

	private String footerName;

	private String useletterhead;

	private String showreportfooter;

	private List<LabMainlab> listMainLab;

	
	@JsonGetter("limainlab")
	public List<LabMainlab> getListMainLab() {
		return listMainLab;
	}

	public void setListMainLab(List<LabMainlab> listMainLab) {
		this.listMainLab = listMainLab;
	}

	public LabMainlab() {
	}

	@JsonGetter("mlc")
	public String getLabCode() {
		return labCode;
	}

	public void setLabCode(String labCode) {
		this.labCode = labCode;
	}

	@JsonGetter("mlid")
	public int getIdownlab() {
		return idownlab;
	}

	public void setIdownlab(int idownlab) {
		this.idownlab = idownlab;
	}

	@JsonGetter("nm")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonGetter("add")
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@JsonGetter("eml")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonGetter("pthl")
	public String getPathalogist() {
		return pathalogist;
	}

	public void setPathalogist(String pathalogist) {
		this.pathalogist = pathalogist;
	}

	@JsonGetter("deg")
	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	@JsonGetter("tel")
	public String getTelephoneNo() {
		return telephoneNo;
	}

	public void setTelephoneNo(String telephoneNo) {
		this.telephoneNo = telephoneNo;
	}

	@JsonGetter("ot")
	public String getOpeningTime() {
		return openingTime;
	}

	public void setOpeningTime(String openingTime) {
		this.openingTime = openingTime;
	}

	@JsonGetter("ct")
	public String getClosingTime() {
		return closingTime;
	}

	public void setClosingTime(String closingTime) {
		this.closingTime = closingTime;
	}

	@JsonGetter("lt")
	public String getLunchTime() {
		return lunchTime;
	}

	public void setLunchTime(String lunchTime) {
		this.lunchTime = lunchTime;
	}

	@JsonGetter("cd")
	public String getClosedDay() {
		return closedDay;
	}

	public void setClosedDay(String closedDay) {
		this.closedDay = closedDay;
	}
	
	
	@JsonGetter("fn")
	public String getFooterName() {
		return footerName;
	}

	public void setFooterName(String footerName) {
		this.footerName = footerName;
	}

	
	@JsonGetter("uh")
	public String getUseletterhead() {
		return useletterhead;
	}

	public void setUseletterhead(String useletterhead) {
		this.useletterhead = useletterhead;
	}

	
	@JsonGetter("ft")
	public String getShowreportfooter() {
		return showreportfooter;
	}

	public void setShowreportfooter(String showreportfooter) {
		this.showreportfooter = showreportfooter;
	}

}
