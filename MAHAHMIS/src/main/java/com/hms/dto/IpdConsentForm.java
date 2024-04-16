package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class IpdConsentForm {

	private int idipdConsentForm;

	private int Treatment_ID;
	private int idCustomizeTemplate;
	private String templateData;
	private String dateOfInsert;

	private List<IpdConsentForm> ipdConsentFormList;

	@JsonGetter("idicf")
	public int getIdipdConsentForm() {
		return idipdConsentForm;
	}

	public void setIdipdConsentForm(int idipdConsentForm) {
		this.idipdConsentForm = idipdConsentForm;
	}

	@JsonGetter("tid")
	public int getTreatment_ID() {
		return Treatment_ID;
	}

	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}

	@JsonGetter("idct")
	public int getIdCustomizeTemplate() {
		return idCustomizeTemplate;
	}

	public void setIdCustomizeTemplate(int idCustomizeTemplate) {
		this.idCustomizeTemplate = idCustomizeTemplate;
	}

	@JsonGetter("tempdata")
	public String getTemplateData() {
		return templateData;
	}

	public void setTemplateData(String templateData) {
		this.templateData = templateData;
	}

	@JsonGetter("dtofin")
	public String getDateOfInsert() {
		return dateOfInsert;
	}

	public void setDateOfInsert(String dateOfInsert) {
		this.dateOfInsert = dateOfInsert;
	}

	@JsonGetter("icfli")
	public List<IpdConsentForm> getIpdConsentFormList() {
		return ipdConsentFormList;
	}

	public void setIpdConsentFormList(List<IpdConsentForm> ipdConsentFormList) {
		this.ipdConsentFormList = ipdConsentFormList;
	}

}
