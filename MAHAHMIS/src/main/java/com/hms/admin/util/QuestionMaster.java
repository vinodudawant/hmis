package com.hms.admin.util;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class QuestionMaster {
	private int idQue;
	private String Question;
	private String Question_Type;
	private String hra_Type_id;
	private String idOpt;
	private String OptName;
	private int templateType;
	private String templateTypeName;
	private String optionId;
	private String textAns;
	private int idEmrDetails;
	private int idClientComplaint;
	private int idComplaintName;
	private String complaintName;
	private String type;
	private String hraType;
	
	private List<QuestionMaster> lique_access;
	private List<QuestionMaster> Optli = null;
	private List<QuestionMaster> Emrli = null;
	private List<QuestionMaster> Cmpli = null;
	
	@JsonGetter("cmpName")
	public String getComplaintName() {
		return complaintName;
	}
	@JsonSetter("cmpName")
	public void setComplaintName(String complaintName) {
		this.complaintName = complaintName;
	}
	@JsonGetter("CmpLi")
	public List<QuestionMaster> getCmpli() {
		return Cmpli;
	}
	@JsonSetter("CmpLi")
	public void setCmpli(List<QuestionMaster> cmpli) {
		Cmpli = cmpli;
	}
	@JsonGetter("idCC")
	public int getIdClientComplaint() {
		return idClientComplaint;
	}
	@JsonSetter("idCC")
	public void setIdClientComplaint(int idClientComplaint) {
		this.idClientComplaint = idClientComplaint;
	}
	@JsonGetter("idC")
	public int getIdComplaintName() {
		return idComplaintName;
	}
	@JsonSetter("idC")
	public void setIdComplaintName(int idComplaintName) {
		this.idComplaintName = idComplaintName;
	}
	@JsonGetter("type")
	public String getType() {
		return type;
	}
	@JsonSetter("type")
	public void setType(String type) {
		this.type = type;
	}
	@JsonGetter("idEmr")
	public int getIdEmrDetails() {
		return idEmrDetails;
	}
	@JsonSetter("idEmr")
	public void setIdEmrDetails(int idEmrDetails) {
		this.idEmrDetails = idEmrDetails;
	}
	@JsonGetter("optid")
	public String getOptionId() {
		return optionId;
	}
	@JsonSetter("optid")
	public void setOptionId(String optionId) {
		this.optionId = optionId;
	}
	@JsonGetter("txtAns")
	public String getTextAns() {
		return textAns;
	}
	@JsonSetter("txtAns")
	public void setTextAns(String textAns) {
		this.textAns = textAns;
	}
	@JsonGetter("tempTypeNM")
	public String getTemplateTypeName() {
		return templateTypeName;
	}
	@JsonSetter("tempTypeNM")
	public void setTemplateTypeName(String templateTypeName) {
		this.templateTypeName = templateTypeName;
	}
	@JsonGetter("tempType")
	public int getTemplateType() {
		return templateType;
	}
	@JsonSetter("tempType")
	public void setTemplateType(int templateType) {
		this.templateType = templateType;
	}
	@JsonGetter("idQue")
	public int getIdQue() {
		return idQue;
	}
	@JsonSetter("idQue")
	public void setIdQue(int idQue) {
		this.idQue = idQue;
	}
	@JsonGetter("Que")
	public String getQuestion() {
		return Question;
	}
	@JsonSetter("Que")
	public void setQuestion(String question) {
		Question = question;
	}
	@JsonGetter("QueType")
	public String getQuestion_Type() {
		return Question_Type;
	}
	@JsonSetter("QueType")
	public void setQuestion_Type(String question_Type) {
		Question_Type = question_Type;
	}
	@JsonGetter("hraTypeId")
	public String getHra_Type_id() {
		return hra_Type_id;
	}
	@JsonSetter("hraTypeId")
	public void setHra_Type_id(String string) {
		this.hra_Type_id = string;
	}
	@JsonGetter("Quelist")
	public List<QuestionMaster> getLique_access() {
		return lique_access;
	}
	@JsonSetter("Quelist")
	public void setLique_access(List<QuestionMaster> lique_access) {
		this.lique_access = lique_access;
	}
	@JsonGetter("idOpt")
	public String getIdOpt() {
		return idOpt;
	}
	@JsonSetter("idOpt")
	public void setIdOpt(String idOpt) {
		this.idOpt = idOpt;
	}
	@JsonGetter("OptName")
	public String getOptName() {
		return OptName;
	}
	@JsonSetter("OptName")
	public void setOptName(String optName) {
		OptName = optName;
	}
	@JsonGetter("Optli")
	public List<QuestionMaster> getOptli() {
		return Optli;
	}
	@JsonSetter("Optli")
	public void setOptli(List<QuestionMaster> optli) {
		Optli = optli;
	}
	@JsonGetter("Emrli")
	public List<QuestionMaster> getEmrli() {
		return Emrli;
	}
	@JsonSetter("Emrli")
	public void setEmrli(List<QuestionMaster> emrli) {
		Emrli = emrli;
	}
	
	@JsonGetter("hraType")
	public String getHraType() {
		return hraType;
	}
	@JsonSetter("hraType")
	public void setHraType(String hraType) {
		this.hraType = hraType;
	}

}