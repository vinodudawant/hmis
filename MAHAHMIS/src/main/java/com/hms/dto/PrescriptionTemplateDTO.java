package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class PrescriptionTemplateDTO {
	private int templateID;
	private String templateName;
	private String myTemplateFlag;
	private String orgTemplateFlag;
	private String userFullName;
	private String userLastUpdatedByFullName;
	private int userID;
	private List<Prescription> prisciptionObjList;
	private List<PrescriptionTemplateDTO> prisciptionTemplateObjList;

	@JsonGetter("templateID")
	public int getTemplateID() {
		return templateID;
	}

	@JsonSetter("templateID")
	public void setTemplateID(int templateID) {
		this.templateID = templateID;
	}

	@JsonGetter("templateName")
	public String getTemplateName() {
		return templateName;
	}

	@JsonSetter("templateName")
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	@JsonGetter("myTemplateFlag")
	public String getMyTemplateFlag() {
		return myTemplateFlag;
	}

	@JsonSetter("myTemplateFlag")
	public void setMyTemplateFlag(String myTemplateFlag) {
		this.myTemplateFlag = myTemplateFlag;
	}

	@JsonGetter("orgTemplateFlag")
	public String getOrgTemplateFlag() {
		return orgTemplateFlag;
	}

	@JsonSetter("orgTemplateFlag")
	public void setOrgTemplateFlag(String orgTemplateFlag) {
		this.orgTemplateFlag = orgTemplateFlag;
	}

	@JsonGetter("prisciptionObjList")
	public List<Prescription> getPrisciptionObjList() {
		return prisciptionObjList;
	}

	@JsonSetter("prisciptionObjList")
	public void setPrisciptionObjList(List<Prescription> prisciptionObjList) {
		this.prisciptionObjList = prisciptionObjList;
	}

	@JsonGetter("prisciptionTemplateObjList")
	public List<PrescriptionTemplateDTO> getPrisciptionTemplateObjList() {
		return prisciptionTemplateObjList;
	}

	@JsonSetter("prisciptionTemplateObjList")
	public void setPrisciptionTemplateObjList(
			List<PrescriptionTemplateDTO> prisciptionTemplateObjList) {
		this.prisciptionTemplateObjList = prisciptionTemplateObjList;
	}

	@JsonGetter("userFullName")
	public String getUserFullName() {
		return userFullName;
	}

	@JsonSetter("userFullName")
	public void setUserFullName(String userFullName) {
		this.userFullName = userFullName;
	}

	@JsonGetter("userID")
	public int getUserID() {
		return userID;
	}

	@JsonSetter("userID")
	public void setUserID(int userID) {
		this.userID = userID;
	}

	@JsonGetter("userLastUpdatedByFullName")
	public String getUserLastUpdatedByFullName() {
		return userLastUpdatedByFullName;
	}

	@JsonSetter("userLastUpdatedByFullName")
	public void setUserLastUpdatedByFullName(String userLastUpdatedByFullName) {
		this.userLastUpdatedByFullName = userLastUpdatedByFullName;
	}

}
