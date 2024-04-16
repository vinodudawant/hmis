package com.hms.dto;

import java.io.Serializable;
import java.util.List;

@SuppressWarnings("serial")
public class DoctorRoundTempDTO implements Serializable{
	
	private int templateId;
	private int userId;
	
	private String date;
	private String time;
	private String templateName;
	private String clinicalNote;
	private String investigationAdvice;
	private String other;
	private String btnName;
	private int idPainScale;
	private String painScore;
	private String acute;
	private String chronic;
	private String loc;
	
	public int getIdPainScale() {
		return idPainScale;
	}

	public void setIdPainScale(int idPainScale) {
		this.idPainScale = idPainScale;
	}
	
	public String getPainScore() {
		return painScore;
	}

	public void setPainScore(String painScore) {
		this.painScore = painScore;
	}
	
	public String getAcute() {
		return acute;
	}

	public void setAcute(String acute) {
		this.acute = acute;
	}

	public String getChronic() {
		return chronic;
	}

	public void setChronic(String chronic) {
		this.chronic = chronic;
	}

	public String getLoc() {
		return loc;
	}

	public void setLoc(String loc) {
		this.loc = loc;
	}
	
	private List<DoctorRoundTempDTO> listDRT;
	
	public String getBtnName() {
		return btnName;
	}

	public void setBtnName(String btnName) {
		this.btnName = btnName;
	}

	public int getTemplateId() {
		return templateId;
	}

	public void setTemplateId(int templateId) {
		this.templateId = templateId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	public String getClinicalNote() {
		return clinicalNote;
	}

	public void setClinicalNote(String clinicalNote) {
		this.clinicalNote = clinicalNote;
	}

	public String getInvestigationAdvice() {
		return investigationAdvice;
	}

	public void setInvestigationAdvice(String investigationAdvice) {
		this.investigationAdvice = investigationAdvice;
	}

	public String getOther() {
		return other;
	}

	public void setOther(String other) {
		this.other = other;
	}

	public List<DoctorRoundTempDTO> getListDRT() {
		return listDRT;
	}

	public void setListDRT(List<DoctorRoundTempDTO> listDRT) {
		this.listDRT = listDRT;
	}

}
