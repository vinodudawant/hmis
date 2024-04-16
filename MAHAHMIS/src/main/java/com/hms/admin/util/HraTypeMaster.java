package com.hms.admin.util;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class HraTypeMaster {
	private int idhra;
	private int idQue;
	private String hraType;
	private String question;
	private String questionType;
	private String hraTypeId;
	private int idOpt;
	private int idPat;
	private int idtom;
	private String textAns;
	private String optionId;
	private List<HraTypeMaster> lihra_access;
	private List<QuestionMaster> liOpt_access;
	private List<HraTypeMaster> lians_access;
	
	
	@JsonGetter("idhra")
	public int getIdhra() {
		return idhra;
	}
	@JsonSetter("idhra")
	public void setIdhra(int idhra) {
		this.idhra = idhra;
	}
	@JsonGetter("hraType")
	public String getHraType() {
		return hraType;
	}
	@JsonSetter("hraType")
	public void setHraType(String hraType) {
		this.hraType = hraType;
	}
	@JsonGetter("hralist")
	public List<HraTypeMaster> getLihra_access() {
		return lihra_access;
	}
	@JsonSetter("hralist")
	public void setLihra_access(List<HraTypeMaster> lihra_access) {
		this.lihra_access = lihra_access;
	}
	@JsonGetter("que")
	public String getQuestion() {
		return question;
	}
	@JsonSetter("que")
	public void setQuestion(String question) {
		this.question = question;
	}
	@JsonGetter("queType")
	public String getQuestionType() {
		return questionType;
	}
	@JsonSetter("queType")
	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}
	@JsonGetter("hraTypeId")
	public String getHraTypeId() {
		return hraTypeId;
	}
	@JsonSetter("hraTypeId")
	public void setHraTypeId(String hraTypeId) {
		this.hraTypeId = hraTypeId;
	}
	@JsonGetter("IdQue")
	public int getIdQue() {
		return idQue;
	}
	@JsonSetter("IdQue")
	public void setIdQue(int idQue) {
		this.idQue = idQue;
	}
	@JsonGetter("Optlist")
	public List<QuestionMaster> getLiOpt_access() {
		return liOpt_access;
	}
	@JsonSetter("Optlist")
	public void setLiOpt_access(List<QuestionMaster> objOpt) {
		this.liOpt_access = objOpt;
	}
	@JsonGetter("Anslist")
	public List<HraTypeMaster> getLians_access() {
		return lians_access;
	}
	@JsonSetter("Anslist")
	public void setLians_access(List<HraTypeMaster> lians_access) {
		this.lians_access = lians_access;
	}
	@JsonGetter("IdOpt")
	public int getIdOpt() {
		return idOpt;
	}
	@JsonSetter("IdOpt")
	public void setIdOpt(int idOpt) {
		this.idOpt = idOpt;
	}
	@JsonGetter("IdPat")
	public int getIdPat() {
		return idPat;
	}
	@JsonSetter("IdPat")
	public void setIdPat(int idPat) {
		this.idPat = idPat;
	}
	@JsonGetter("Idtom")
	public int getIdtom() {
		return idtom;
	}
	@JsonSetter("Idtom")
	public void setIdtom(int idtom) {
		this.idtom = idtom;
	}
	@JsonGetter("txtAns")
	public String getTextAns() {
		return textAns;
	}
	@JsonSetter("txtAns")
	public void setTextAns(String textAns) {
		this.textAns = textAns;
	}
	@JsonGetter("optid")
	public String getOptionId() {
		return optionId;
	}
	@JsonSetter("optid")
	public void setOptionId(String optionId) {
		this.optionId = optionId;
	}
	

}
