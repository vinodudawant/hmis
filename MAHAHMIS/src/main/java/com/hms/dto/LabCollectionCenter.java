package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabCollectionCenter implements Serializable {

	private int idCollectionCenter;
	private String collectionCenterName;
	private String collectionCenteraddress;
	private String collectionCentercity;
	private String collectionCenterstate;
	private String collectionCenterphoneno;
	private String collectionCenterEmail;
	private String Dataofentery;
	private String branchId;
	private String collectionCenterStatus;
	private List<LabCollectionCenter> collcentrLi;

	@JsonGetter("ccid")
	public int getIdCollectionCenter() {
		return idCollectionCenter;
	}

	@JsonSetter("ccid")
	public void setIdCollectionCenter(int idCollectionCenter) {
		this.idCollectionCenter = idCollectionCenter;
	}

	@JsonGetter("ccnm")
	public String getCollectionCenterName() {
		return collectionCenterName;
	}

	@JsonSetter("ccnm")
	public void setCollectionCenterName(String collectionCenterName) {
		this.collectionCenterName = collectionCenterName;
	}

	@JsonGetter("ccadd")
	public String getCollectionCenteraddress() {
		return collectionCenteraddress;
	}

	@JsonSetter("ccadd")
	public void setCollectionCenteraddress(String collectionCenteraddress) {
		this.collectionCenteraddress = collectionCenteraddress;
	}

	@JsonGetter("ccct")
	public String getCollectionCentercity() {
		return collectionCentercity;
	}

	@JsonSetter("ccct")
	public void setCollectionCentercity(String collectionCentercity) {
		this.collectionCentercity = collectionCentercity;
	}

	@JsonGetter("ccst")
	public String getCollectionCenterstate() {
		return collectionCenterstate;
	}

	@JsonSetter("ccst")
	public void setCollectionCenterstate(String collectionCenterstate) {
		this.collectionCenterstate = collectionCenterstate;
	}

	@JsonGetter("ccph")
	public String getCollectionCenterphoneno() {
		return collectionCenterphoneno;
	}

	@JsonSetter("ccph")
	public void setCollectionCenterphoneno(String collectionCenterphoneno) {
		this.collectionCenterphoneno = collectionCenterphoneno;
	}

	@JsonGetter("ccem")
	public String getCollectionCenterEmail() {
		return collectionCenterEmail;
	}

	@JsonSetter("ccem")
	public void setCollectionCenterEmail(String collectionCenterEmail) {
		this.collectionCenterEmail = collectionCenterEmail;
	}

	@JsonGetter("ccdt")
	public String getDataofentery() {
		return Dataofentery;
	}

	@JsonSetter("ccidt")
	public void setDataofentery(String dataofentery) {
		Dataofentery = dataofentery;
	}

	@JsonGetter("ccbr")
	public String getBranchId() {
		return branchId;
	}

	@JsonGetter("ccbr")
	public void setBranchId(String branchId) {
		this.branchId = branchId;
	}

	@JsonSetter("ccsta")
	public String getCollectionCenterStatus() {
		return collectionCenterStatus;
	}

	@JsonGetter("ccsta")
	public void setCollectionCenterStatus(String collectionCenterStatus) {
		this.collectionCenterStatus = collectionCenterStatus;
	}

	@JsonGetter("ccli")
	public List<LabCollectionCenter> getCollcentrLi() {
		return collcentrLi;
	}

	@JsonSetter("ccli")
	public void setCollcentrLi(List<LabCollectionCenter> collcentrLi) {
		this.collcentrLi = collcentrLi;
	}

}
