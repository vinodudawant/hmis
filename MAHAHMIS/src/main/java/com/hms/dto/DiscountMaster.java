package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class DiscountMaster {
	public DiscountMaster() {
		super();
	}

	private int sp_dic_master_id;
	private int sp_dic_component_id;
	private int Operation_id;
	private Float op_charges;
	private String sname;
	private String status;
	private List<DiscountMaster> DiscountMasterList;
	private String op_name;

	private String alise_In;
	private String address;
	private String helpline;
	private String doc_reg;
	private String other_Detail;
	private float opd_consultation;
	private float opd_followUp;

	private float percent_amt;
	private float investigation;
	private float pathology;
	private float physiotherapy;

	private String discount_increase_decrease;
	private int sponsered_type_id;
	private String companyName;
	private int company_id;

	@JsonGetter("inv")
	public float getInvestigation() {
		return investigation;
	}

	@JsonSetter("inv")
	public void setInvestigation(float investigation) {
		this.investigation = investigation;
	}

	@JsonGetter("patho")
	public float getPathology() {
		return pathology;
	}

	@JsonSetter("patho")
	public void setPathology(float pathology) {
		this.pathology = pathology;
	}

	@JsonGetter("physio")
	public float getPhysiotherapy() {
		return physiotherapy;
	}

	@JsonSetter("physio")
	public void setPhysiotherapy(float physiotherapy) {
		this.physiotherapy = physiotherapy;
	}

	@JsonGetter("opdConsl")
	public float getOpd_consultation() {
		return opd_consultation;
	}

	@JsonSetter("opdConsl")
	public void setOpd_consultation(float opd_consultation) {
		this.opd_consultation = opd_consultation;
	}

	@JsonGetter("opdFoll")
	public float getOpd_followUp() {
		return opd_followUp;
	}

	@JsonSetter("opdFoll")
	public void setOpd_followUp(float opd_followUp) {
		this.opd_followUp = opd_followUp;
	}

	@JsonGetter("perAmt")
	public float getPercent_amt() {
		return percent_amt;
	}

	@JsonSetter("perAmt")
	public void setPercent_amt(float percent_amt) {
		this.percent_amt = percent_amt;
	}

	private String discount_in;

	@JsonGetter("dsin")
	public String getDiscount_in() {
		return discount_in;
	}

	@JsonSetter("dsin")
	public void setDiscount_in(String discount_in) {
		this.discount_in = discount_in;
	}

	@JsonGetter("on")
	public String getOp_name() {
		return op_name;
	}

	@JsonSetter("on")
	public void setOp_name(String op_name) {
		this.op_name = op_name;
	}

	public DiscountMaster(int sp_dic_master_id, String sname) {
		super();
		this.setSp_dic_master_id(sp_dic_master_id);
		this.setSname(sname);

	}

	@JsonSetter("si")
	public void setSp_dic_master_id(int sp_dic_master_id) {
		this.sp_dic_master_id = sp_dic_master_id;
	}

	@JsonGetter("si")
	public int getSp_dic_master_id() {
		return sp_dic_master_id;
	}

	@JsonSetter("sn")
	public void setSname(String sname) {
		this.sname = sname;
	}

	@JsonGetter("sn")
	public String getSname() {
		return sname;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonSetter("doi")
	public void setOperation_id(int operation_id) {
		this.Operation_id = operation_id;
	}

	@JsonGetter("doi")
	public int getOperation_id() {
		return Operation_id;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("sl")
	public void setDiscountMasterList(List<DiscountMaster> discountMasterList) {
		DiscountMasterList = discountMasterList;
	}

	@JsonSetter("di")
	public void setSp_dic_component_id(int sp_dic_component_id) {
		this.sp_dic_component_id = sp_dic_component_id;
	}

	@JsonGetter("di")
	public int getSp_dic_component_id() {
		return sp_dic_component_id;
	}

	@JsonSetter("dc")
	public void setOp_charges(Float op_charges) {
		this.op_charges = op_charges;
	}

	@JsonGetter("dc")
	public Float getOp_charges() {
		return op_charges;
	}

	@JsonGetter("sl")
	public List<DiscountMaster> getDiscountMasterList() {
		return DiscountMasterList;
	}

	public String toString() {
		return "DiscountMaster [ sp_dic_master_id=" + sp_dic_master_id
				+ "sname=" + sname + "]";
	}

	@JsonGetter("oDetail")
	public String getOther_Detail() {
		return other_Detail;
	}

	public void setOther_Detail(String other_Detail) {
		this.other_Detail = other_Detail;
	}

	@JsonGetter("docReg")
	public String getDoc_reg() {
		return doc_reg;
	}

	public void setDoc_reg(String doc_reg) {
		this.doc_reg = doc_reg;
	}

	@JsonGetter("helpline")
	public String getHelpline() {
		return helpline;
	}

	public void setHelpline(String helpline) {
		this.helpline = helpline;
	}

	@JsonGetter("add")
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@JsonGetter("alin")
	public String getAlise_In() {
		return alise_In;
	}

	public void setAlise_In(String alise_In) {
		this.alise_In = alise_In;
	}

	public String getDiscount_increase_decrease() {
		return discount_increase_decrease;
	}

	public void setDiscount_increase_decrease(String discount_increase_decrease) {
		this.discount_increase_decrease = discount_increase_decrease;
	}

	public int getSponsered_type_id() {
		return sponsered_type_id;
	}

	public void setSponsered_type_id(int sponsered_type_id) {
		this.sponsered_type_id = sponsered_type_id;
	}

	@JsonGetter("comNm")
	public String getCompanyName() {
		return companyName;
	}

	@JsonSetter("comNm")
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	@JsonGetter("comId")
	public int getCompany_id() {
		return company_id;
	}
	@JsonSetter("comId")
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}

	
}
