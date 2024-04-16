package com.hms.dto;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ERInformerDetails {
	
	
	private String informerTitle;
	private String informerFName;
	private String informerLName;
	private String informerSex;
	private String informerEmailId;
	private String informerMbNo;
	private String informerAge;
	private String informerRelation;
	private String informerAddress;
	private int informerCMOconsultant;
	private int informerDoctor_spl_id;
	private int informerDoctor_dept_id;
	private String informerBillCtgy;
	private String informerDescription;
	
	@JsonGetter("informerTitle")
	public String getInformerTitle() {
		return informerTitle;
	}
	@JsonSetter("informerTitle")
	public void setInformerTitle(String informerTitle) {
		this.informerTitle = informerTitle;
	}
	@JsonGetter("informerFName")
	public String getInformerFName() {
		return informerFName;
	}
	@JsonSetter("informerFName")
	public void setInformerFName(String informerFName) {
		this.informerFName = informerFName;
	}
	@JsonGetter("informerLName")
	public String getInformerLName() {
		return informerLName;
	}
	@JsonSetter("informerLName")
	public void setInformerLName(String informerLName) {
		this.informerLName = informerLName;
	}
	@JsonGetter("informerSex")
	public String getInformerSex() {
		return informerSex;
	}
	@JsonSetter("informerSex")
	public void setInformerSex(String informerSex) {
		this.informerSex = informerSex;
	}
	@JsonGetter("informerEmailId")
	public String getInformerEmailId() {
		return informerEmailId;
	}
	@JsonSetter("informerEmailId")
	public void setInformerEmailId(String informerEmailId) {
		this.informerEmailId = informerEmailId;
	}
	@JsonGetter("informerMbNo")
	public String getInformerMbNo() {
		return informerMbNo;
	}
	@JsonSetter("informerMbNo")
	public void setInformerMbNo(String informerMbNo) {
		this.informerMbNo = informerMbNo;
	}
	@JsonGetter("informerAge")
	public String getInformerAge() {
		return informerAge;
	}
	@JsonSetter("informerAge")
	public void setInformerAge(String informerAge) {
		this.informerAge = informerAge;
	}
	@JsonGetter("informerRelation")
	public String getInformerRelation() {
		return informerRelation;
	}
	@JsonSetter("informerRelation")
	public void setInformerRelation(String informerRelation) {
		this.informerRelation = informerRelation;
	}
	@JsonGetter("informerAddress")
	public String getInformerAddress() {
		return informerAddress;
	}
	@JsonSetter("informerAddress")
	public void setInformerAddress(String informerAddress) {
		this.informerAddress = informerAddress;
	}
	@JsonGetter("informerBillCtgy")
	public String getInformerBillCtgy() {
		return informerBillCtgy;
	}
	@JsonSetter("informerBillCtgy")
	public void setInformerBillCtgy(String informerBillCtgy) {
		this.informerBillCtgy = informerBillCtgy;
	}
	@JsonGetter("informerDescription")
	public String getInformerDescription() {
		return informerDescription;
	}
	@JsonSetter("informerDescription")
	public void setInformerDescription(String informerDescription) {
		this.informerDescription = informerDescription;
	}
	@JsonGetter("informerCMOconsultant")
	public int getInformerCMOconsultant() {
		return informerCMOconsultant;
	}
	@JsonSetter("informerCMOconsultant")
	public void setInformerCMOconsultant(int informerCMOconsultant) {
		this.informerCMOconsultant = informerCMOconsultant;
	}
	@JsonGetter("informerDoctor_spl_id")
	public int getInformerDoctor_spl_id() {
		return informerDoctor_spl_id;
	}
	@JsonSetter("informerDoctor_spl_id")
	public void setInformerDoctor_spl_id(int informerDoctor_spl_id) {
		this.informerDoctor_spl_id = informerDoctor_spl_id;
	}
	@JsonGetter("informerDoctor_dept_id")
	public int getInformerDoctor_dept_id() {
		return informerDoctor_dept_id;
	}
	@JsonSetter("informerDoctor_dept_id")
	public void setInformerDoctor_dept_id(int informerDoctor_dept_id) {
		this.informerDoctor_dept_id = informerDoctor_dept_id;
	}
	
}
