package com.hms.admin.util;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ComplaintMaster {
	
	private int complaintId;
	private String complaintName;
	private List<ComplaintMaster> liaccess;
	
	private int findingId;
	private String findingName;
	private List<ComplaintMaster> lifindingaccess;
	
	private String complaintVal;
	private int complaintAssignId;
	
	@JsonGetter("cmpAssId")
	public int getComplaintAssignId() {
		return complaintAssignId;
	}
	@JsonSetter("cmpAssId")
	public void setComplaintAssignId(int complaintAssignId) {
		this.complaintAssignId = complaintAssignId;
	}
	@JsonGetter("cmpVal")
	public String getComplaintVal() {
		return complaintVal;
	}
	@JsonSetter("cmpVal")
	public void setComplaintVal(String complaintVal) {
		this.complaintVal = complaintVal;
	}
	@JsonGetter("fndId")
	public int getFindingId() {
		return findingId;
	}
	@JsonSetter("fndId")
	public void setFindingId(int findingId) {
		this.findingId = findingId;
	}
	@JsonGetter("fndNM")
	public String getFindingName() {
		return findingName;
	}
	@JsonSetter("fndNM")
	public void setFindingName(String findingName) {
		this.findingName = findingName;
	}
	@JsonGetter("LiFnd")
	public List<ComplaintMaster> getLifindingaccess() {
		return lifindingaccess;
	}
	@JsonSetter("LiFnd")
	public void setLifindingaccess(List<ComplaintMaster> lifindingaccess) {
		this.lifindingaccess = lifindingaccess;
	}
	@JsonGetter("LiCmp")
	public List<ComplaintMaster> getLiaccess() {
		return liaccess;
	}
	@JsonSetter("LiCmp")
	public void setLiaccess(List<ComplaintMaster> liaccess) {
		this.liaccess = liaccess;
	}
	@JsonGetter("cmpId")
	public int getComplaintId() {
		return complaintId;
	}
	@JsonSetter("cmpId")
	public void setComplaintId(int complaintId) {
		this.complaintId = complaintId;
	}
	@JsonGetter("cmpNM")
	public String getComplaintName() {
		return complaintName;
	}
	@JsonSetter("cmpNM")
	public void setComplaintName(String complaintName) {
		this.complaintName = complaintName;
	}
	

}
