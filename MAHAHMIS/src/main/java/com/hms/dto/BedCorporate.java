package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class BedCorporate implements Serializable {

	private static final long serialVersionUID = 1L;

	private String hname;
	private String htype;

	private float txtLeaseNormal;
	private float txtLeaseIsolation;
	private List<BedCorporate> liBedCorporate;
	private Integer corporateAcId;
	
	
	
	@JsonGetter("corporateAcId")
	public Integer getCorporateAcId() {
		return corporateAcId;
	}
	@JsonSetter("corporateAcId")
	public void setCorporateAcId(Integer corporateAcId) {
		this.corporateAcId = corporateAcId;
	}
	@JsonGetter("liBedCorporate")
	public List<BedCorporate> getLiBedCorporate() {
		return liBedCorporate;
	}
	@JsonSetter("liBedCorporate")
	public void setLiBedCorporate(List<BedCorporate> liBedCorporate) {
		this.liBedCorporate = liBedCorporate;
	}

	
	@JsonGetter("hname")
	public String getHname() {
		return hname;
	}

	@JsonSetter("hname")
	public void setHname(String hname) {
		this.hname = hname;
	}

	@JsonGetter("htype")
	public String getHtype() {
		return htype;
	}

	@JsonSetter("htype")
	public void setHtype(String htype) {
		this.htype = htype;
	}

	@JsonGetter("TxtLeaseNormal")
	public float getTxtLeaseNormal() {
		return txtLeaseNormal;
	}

	@JsonSetter("TxtLeaseNormal")
	public void setTxtLeaseNormal(float txtLeaseNormal) {
		this.txtLeaseNormal = txtLeaseNormal;
	}

	@JsonGetter("txtLeaseIsolation")
	public float getTxtLeaseIsolation() {
		return txtLeaseIsolation;
	}

	@JsonSetter("txtLeaseIsolation")
	public void setTxtLeaseIsolation(float txtLeaseIsolation) {
		this.txtLeaseIsolation = txtLeaseIsolation;
	}

	private List<BedCorporate> BedCorporateList = null;

	

	@JsonGetter("hl")
	public List<BedCorporate> getBedCorporateList() {
		return BedCorporateList;
	}

	@JsonSetter("hl")
	public void setBedCorporateList(List<BedCorporate> arrBedCorporate) {
		this.BedCorporateList = arrBedCorporate;
	}

	public BedCorporate(String hname, String htype) {
		super();
		this.hname = hname;
		this.htype = htype;

	}
	public BedCorporate() {
		// TODO Auto-generated constructor stub
	}

	

	

}
