package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabDoctorTechnician implements Serializable {
	private int idlabDocTech;
	private int idlabDocChargesType;
	private String docName;
	private String address;
	private String city;
	private String state;
	private String docphoneno;
	private String drEmail;
	private String drDataofentery;
	private String drDegree;
	private String docTechType;
	private int branchId;
	private String drStatus;
	private List<LabDoctorTechnician> labDtli;

	@JsonGetter("id")
	public int getIdlabDocTech() {
		return idlabDocTech;
	}

	@JsonSetter("id")
	public void setIdlabDocTech(int idlabDocTech) {
		this.idlabDocTech = idlabDocTech;
	}

	@JsonGetter("iddchr")
	public int getIdlabDocChargesType() {
		return idlabDocChargesType;
	}

	@JsonSetter("iddchr")
	public void setIdlabDocChargesType(int idlabDocChargesType) {
		this.idlabDocChargesType = idlabDocChargesType;
	}

	@JsonGetter("dnm")
	public String getDocName() {
		return docName;
	}

	@JsonSetter("dnm")
	public void setDocName(String docName) {
		this.docName = docName;
	}

	@JsonGetter("add")
	public String getAddress() {
		return address;
	}

	@JsonSetter("add")
	public void setAddress(String address) {
		this.address = address;
	}

	@JsonGetter("ct")
	public String getCity() {
		return city;
	}

	@JsonSetter("ct")
	public void setCity(String city) {
		this.city = city;
	}

	@JsonGetter("st")
	public String getState() {
		return state;
	}

	@JsonSetter("st")
	public void setState(String state) {
		this.state = state;
	}

	@JsonGetter("ph")
	public String getDocphoneno() {
		return docphoneno;
	}

	@JsonSetter("ph")
	public void setDocphoneno(String docphoneno) {
		this.docphoneno = docphoneno;
	}

	@JsonGetter("em")
	public String getDrEmail() {
		return drEmail;
	}

	@JsonSetter("em")
	public void setDrEmail(String drEmail) {
		this.drEmail = drEmail;
	}

	@JsonGetter("dt")
	public String getDrDataofentery() {
		return drDataofentery;
	}

	@JsonSetter("dt")
	public void setDrDataofentery(String drDataofentery) {
		this.drDataofentery = drDataofentery;
	}

	@JsonGetter("deg")
	public String getDrDegree() {
		return drDegree;
	}

	@JsonSetter("deg")
	public void setDrDegree(String drDegree) {
		this.drDegree = drDegree;
	}

	@JsonGetter("dty")
	public String getDocTechType() {
		return docTechType;
	}

	@JsonSetter("dty")
	public void setDocTechType(String docTechType) {
		this.docTechType = docTechType;
	}

	@JsonGetter("br")
	public int getBranchId() {
		return branchId;
	}

	@JsonSetter("br")
	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	@JsonGetter("sta")
	public String getDrStatus() {
		return drStatus;
	}

	@JsonSetter("sta")
	public void setDrStatus(String drStatus) {
		this.drStatus = drStatus;
	}

	@JsonGetter("dtli")
	public List<LabDoctorTechnician> getLabDtli() {
		return labDtli;
	}

	@JsonSetter("dtli")
	public void setLabDtli(List<LabDoctorTechnician> labDtli) {
		this.labDtli = labDtli;
	}

}
