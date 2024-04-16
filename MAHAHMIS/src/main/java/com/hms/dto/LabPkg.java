package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabPkg implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int idlabpkg;
	private int idheadings;
	private String pkgName;
	private float pkgCharges;
	private String pkgCode;
	private String pkgStatus;
	private List<LabPkg> labPkgli;
	private List<LabProfile> profileli;
	private List<LabTest> arrLabTest;

	private List<Labpkgprotestcomp> pkgprotestList;
	private List<HallWiseTestChargesDTO> hallWsTestChrgsList;
	
	private Double motivatorCash;
	private Double motivatorSponsored;
	private Double clinicPercent;
	
	@JsonGetter("clinicPercent")
	public Double getClinicPercent() {
		return clinicPercent;
	}

	@JsonSetter("clinicPercent")
	public void setClinicPercent(Double clinicPercent) {
		this.clinicPercent = clinicPercent;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Double getMotivatorCash() {
		return motivatorCash;
	}

	public Double getMotivatorSponsored() {
		return motivatorSponsored;
	}

	public void setMotivatorCash(Double motivatorCash) {
		this.motivatorCash = motivatorCash;
	}

	public void setMotivatorSponsored(Double motivatorSponsored) {
		this.motivatorSponsored = motivatorSponsored;
	}

	@JsonGetter("pkgprotstli")
	public List<Labpkgprotestcomp> getPkgprotestList() {
		return pkgprotestList;
	}

	@JsonSetter("pkgprotstli")
	public void setPkgprotestList(List<Labpkgprotestcomp> pkgprotestList) {
		this.pkgprotestList = pkgprotestList;
	}

	@JsonGetter("idlbpkg")
	public int getIdlabpkg() {
		return idlabpkg;
	}

	@JsonSetter("idlbpkg")
	public void setIdlabpkg(int idlabpkg) {
		this.idlabpkg = idlabpkg;
	}

	@JsonGetter("idhed")
	public int getIdheadings() {
		return idheadings;
	}

	@JsonSetter("idhed")
	public void setIdheadings(int idheadings) {
		this.idheadings = idheadings;
	}

	@JsonGetter("pkgnm")
	public String getPkgName() {
		return pkgName;
	}

	@JsonSetter("pkgnm")
	public void setPkgName(String pkgName) {
		this.pkgName = pkgName;
	}

	@JsonGetter("pkgchrg")
	public float getPkgCharges() {
		return pkgCharges;
	}

	@JsonSetter("pkgchrg")
	public void setPkgCharges(float pkgCharges) {
		this.pkgCharges = pkgCharges;
	}

	@JsonGetter("pkgcod")
	public String getPkgCode() {
		return pkgCode;
	}

	@JsonSetter("pkgcod")
	public void setPkgCode(String pkgCode) {
		this.pkgCode = pkgCode;
	}

	@JsonGetter("pkgst")
	public String getPkgStatus() {
		return pkgStatus;
	}

	@JsonSetter("pkgst")
	public void setPkgStatus(String pkgStatus) {
		this.pkgStatus = pkgStatus;
	}

	@JsonGetter("lbpkgli")
	public List<LabPkg> getLabPkgli() {
		return labPkgli;
	}

	@JsonSetter("lbpkgli")
	public void setLabPkgli(List<LabPkg> labPkgli) {
		this.labPkgli = labPkgli;
	}

	@JsonGetter("lbproli")
	public List<LabProfile> getProfileli() {
		return profileli;
	}

	@JsonSetter("lbproli")
	public void setProfileli(List<LabProfile> profileli) {
		this.profileli = profileli;
	}

	@JsonGetter("lbtstli")
	public List<LabTest> getArrLabTest() {
		return arrLabTest;
	}

	@JsonSetter("lbtstli")
	public void setArrLabTest(List<LabTest> arrLabTest) {
		this.arrLabTest = arrLabTest;
	}
	@JsonGetter("hallWsTestChrgsList")
	public List<HallWiseTestChargesDTO> getHallWsTestChrgsList() {
		return hallWsTestChrgsList;
	}
	@JsonSetter("hallWsTestChrgsList")
	public void setHallWsTestChrgsList(List<HallWiseTestChargesDTO> hallWsTestChrgsList) {
		this.hallWsTestChrgsList = hallWsTestChrgsList;
	}

}
