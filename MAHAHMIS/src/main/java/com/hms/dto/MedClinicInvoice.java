package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class MedClinicInvoice {

	private int idmedclinicinvoice;
	private String name;
	private String invoicedate;
	private String invoiceno;
	private float invoiceamt;
	private int saveby;
	private String savebyNm;
	private String status;
	private int Treatment_ID;

	private List<MedClinicInvoice> liMedClinicInvoice;

	@JsonGetter("svbynm")
	public String getSavebyNm() {
		return savebyNm;
	}

	@JsonSetter("svbynm")
	public void setSavebyNm(String savebyNm) {
		this.savebyNm = savebyNm;
	}

	@JsonGetter("trid")
	public int getTreatment_ID() {
		return Treatment_ID;
	}

	@JsonSetter("trid")
	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}

	@JsonGetter("limci")
	public List<MedClinicInvoice> getLiMedClinicInvoice() {
		return liMedClinicInvoice;
	}

	@JsonSetter("limci")
	public void setLiMedClinicInvoice(List<MedClinicInvoice> liMedClinicInvoice) {
		this.liMedClinicInvoice = liMedClinicInvoice;
	}

	@JsonGetter("idmci")
	public int getIdmedclinicinvoice() {
		return idmedclinicinvoice;
	}

	@JsonSetter("idmci")
	public void setIdmedclinicinvoice(int idmedclinicinvoice) {
		this.idmedclinicinvoice = idmedclinicinvoice;
	}

	@JsonGetter("nm")
	public String getName() {
		return name;
	}

	@JsonSetter("nm")
	public void setName(String name) {
		this.name = name;
	}

	@JsonGetter("invdt")
	public String getInvoicedate() {
		return invoicedate;
	}

	@JsonSetter("invdt")
	public void setInvoicedate(String invoicedate) {
		this.invoicedate = invoicedate;
	}

	@JsonGetter("invno")
	public String getInvoiceno() {
		return invoiceno;
	}

	@JsonSetter("invno")
	public void setInvoiceno(String invoiceno) {
		this.invoiceno = invoiceno;
	}

	@JsonGetter("invamt")
	public float getInvoiceamt() {
		return invoiceamt;
	}

	@JsonSetter("invamt")
	public void setInvoiceamt(float invoiceamt) {
		this.invoiceamt = invoiceamt;
	}

	@JsonGetter("svby")
	public int getSaveby() {
		return saveby;
	}

	@JsonSetter("svby")
	public void setSaveby(int saveby) {
		this.saveby = saveby;
	}

	@JsonGetter("sta")
	public String getStatus() {
		return status;
	}

	@JsonSetter("sta")
	public void setStatus(String status) {
		this.status = status;
	}

}
