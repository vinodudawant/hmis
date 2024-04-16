package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;

public class SurgreyWiseDto {

	private int patientid;
	

	private String sugeryname;
	
	
	private String department;
	private String patientname;
	private String doctorname;
	private String opdate;
	private String starttime;
	private String endtime;
	private String otroom;
	private String protype;
	private String centerPatientId;
	
	
	  private List<SurgreyWiseDto> OTRepordetails;
	public int getPatientid() {
		return patientid;
	}
	public void setPatientid(int patientid) {
		this.patientid = patientid;
	}
	public String getSugeryname() {
		return sugeryname;
	}
	public void setSugeryname(String sugeryname) {
		this.sugeryname = sugeryname;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getPatientname() {
		return patientname;
	}
	public void setPatientname(String patientname) {
		this.patientname = patientname;
	}
	public String getDoctorname() {
		return doctorname;
	}
	public void setDoctorname(String doctorname) {
		this.doctorname = doctorname;
	}
	public String getOpdate() {
		return opdate;
	}
	public void setOpdate(String opdate) {
		this.opdate = opdate;
	}
	public String getStarttime() {
		return starttime;
	}
	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}
	public String getEndtime() {
		return endtime;
	}
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}
	public String getOtroom() {
		return otroom;
	}
	public void setOtroom(String otroom) {
		this.otroom = otroom;
	}
	public String getProtype() {
		return protype;
	}
	public void setProtype(String protype) {
		this.protype = protype;
	}
	public List<SurgreyWiseDto> getOTRepordetails() {
		return OTRepordetails;
	}
	public void setOTRepordetails(List<SurgreyWiseDto> oTRepordetails) {
		OTRepordetails = oTRepordetails;
	}
	public String getCenterPatientId() {
		return centerPatientId;
	}
	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}
	  
	  
	  
}
