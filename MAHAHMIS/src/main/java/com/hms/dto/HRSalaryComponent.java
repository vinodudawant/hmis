package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class HRSalaryComponent implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int salaryComponentId;
	private float basic;
	private float houseRent;
	private float lta;

	private float txtwash;
	private float txtPf;
	private float txtLate;
	private float txtsdp;

	@JsonGetter("wash")
	public float getTxtwash() {
		return txtwash;
	}

	@JsonSetter("wash")
	public void setTxtwash(float txtwash) {
		this.txtwash = txtwash;
	}

	@JsonGetter("pf")
	public float getTxtPf() {
		return txtPf;
	}

	@JsonSetter("pf")
	public void setTxtPf(float txtPf) {
		this.txtPf = txtPf;
	}

	@JsonGetter("late")
	public float getTxtLate() {
		return txtLate;
	}

	@JsonSetter("late")
	public void setTxtLate(float txtLate) {
		this.txtLate = txtLate;
	}

	@JsonGetter("sdp")
	public float getTxtsdp() {
		return txtsdp;
	}

	@JsonSetter("sdp")
	public void setTxtsdp(float txtsdp) {
		this.txtsdp = txtsdp;
	}

	private List<HRSalaryComponent> salaryComponents;

	@JsonGetter("salCompId")
	public int getSalaryComponentId() {
		return salaryComponentId;
	}

	@JsonSetter("salCompId")
	public void setSalaryComponentId(int salaryComponentId) {
		this.salaryComponentId = salaryComponentId;
	}

	@JsonGetter("basic")
	public float getBasic() {
		return basic;
	}

	@JsonSetter("basic")
	public void setBasic(float basic) {
		this.basic = basic;
	}

	@JsonGetter("hr")
	public float getHouseRent() {
		return houseRent;
	}

	@JsonSetter("hr")
	public void setHouseRent(float houseRent) {
		this.houseRent = houseRent;
	}

	@JsonGetter("lta")
	public float getLta() {
		return lta;
	}

	@JsonSetter("lta")
	public void setLta(float lta) {
		this.lta = lta;
	}

	@JsonGetter("liSalComp")
	public List<HRSalaryComponent> getSalaryComponents() {
		return salaryComponents;
	}

	@JsonSetter("liSalComp")
	public void setSalaryComponents(List<HRSalaryComponent> salaryComponents) {
		this.salaryComponents = salaryComponents;
	}

}
