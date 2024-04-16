package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Chanelling_doctor {

	private int channDocId;
	private String prefix;
	private String docName;
	private Float referFees;
	private Double refDocPer;
	private String specility;
	private String hospitalName;
	private String contactNo;
	private String mobileNo;
	private String email;
	private String address;
	private String doctorType;
	private List<Chanelling_doctor> chann_docList;
	private List<Chanelling_Hospital> chann_hosList;
	
	@JsonGetter("doctorType")
	public String getDoctorType() {
		return doctorType;
	}
	@JsonSetter("doctorType")
	public void setDoctorType(String doctorType) {
		this.doctorType = doctorType;
	}

	/**
	 * @return the chann_docList
	 */
	@JsonGetter("cdl")
	public List<Chanelling_doctor> getChann_docList() {
		return chann_docList;
	}

	/**
	 * @param chann_docList
	 *            the chann_docList to set
	 */
	@JsonSetter("cdl")
	public void setChann_docList(List<Chanelling_doctor> chann_docList) {
		this.chann_docList = chann_docList;
	}

	/**
	 * @return the channDocId
	 */
	@JsonGetter("cid")
	public int getChannDocId() {
		return channDocId;
	}

	/**
	 * @param channDocId
	 *            the channDocId to set
	 */
	@JsonSetter("cid")
	public void setChannDocId(int channDocId) {
		this.channDocId = channDocId;
	}

	/**
	 * @return the docName
	 */
	@JsonGetter("cdn")
	public String getDocName() {
		return docName;
	}

	/**
	 * @param docName
	 *            the docName to set
	 */
	@JsonSetter("cdn")
	public void setDocName(String docName) {
		this.docName = docName;
	}

	/**
	 * @return the referFees
	 */
	@JsonGetter("rf")
	public Float getReferFees() {
		return referFees;
	}

	/**
	 * @param referFees
	 *            the referFees to set
	 */
	@JsonSetter("rf")
	public void setReferFees(Float referFees) {
		this.referFees = referFees;
	}

	/**
	 * @return the specility
	 */
	@JsonGetter("ds")
	public String getSpecility() {
		return specility;
	}

	/**
	 * @param specility
	 *            the specility to set
	 */
	@JsonSetter("ds")
	public void setSpecility(String specility) {
		this.specility = specility;
	}

	/**
	 * @return the hospitalName
	 */
	@JsonGetter("hn")
	public String getHospitalName() {
		return hospitalName;
	}

	/**
	 * @param hospitalName
	 *            the hospitalName to set
	 */
	@JsonSetter("hn")
	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	/**
	 * @return the contactNo
	 */
	@JsonGetter("dcn")
	public String getContactNo() {
		return contactNo;
	}

	/**
	 * @param contactNo
	 *            the contactNo to set
	 */
	@JsonSetter("dcn")
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	@JsonGetter("chann_hosList")
	public List<Chanelling_Hospital> getChann_hosList() {
		return chann_hosList;
	}
	@JsonSetter("chann_hosList")
	public void setChann_hosList(List<Chanelling_Hospital> chann_hosList) {
		this.chann_hosList = chann_hosList;
	}
	@JsonGetter("mobileNo")
	public String getMobileNo() {
		return mobileNo;
	}
	@JsonSetter("mobileNo")
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	@JsonGetter("email")
	public String getEmail() {
		return email;
	}
	@JsonSetter("email")
	public void setEmail(String email) {
		this.email = email;
	}
	@JsonGetter("address")
	public String getAddress() {
		return address;
	}
	@JsonSetter("address")
	public void setAddress(String address) {
		this.address = address;
	}
	@JsonGetter("refDocPer")
	public Double getRefDocPer() {
		return refDocPer;
	}
	@JsonSetter("refDocPer")
	public void setRefDocPer(Double refDocPer) {
		this.refDocPer = refDocPer;
	}
	@JsonGetter("prefix")
	public String getPrefix() {
		return prefix;
	}
	@JsonSetter("prefix")
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	

}
