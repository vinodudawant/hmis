package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class TemplateMaster {

	protected int id_temp_master;
	protected String temp_type;
	protected String temp_name;
	protected String status;

	private List<TemplateMaster> templateMasterList = null;
	TempPresComp objTempPresComp = new TempPresComp();

	@JsonGetter("objTePrCo")
	public TempPresComp getObjTempPresComp() {
		return objTempPresComp;
	}

	public void setObjTempPresComp(TempPresComp objTempPresComp) {
		this.objTempPresComp = objTempPresComp;
	}

	@JsonGetter("idtm")
	public int getId_temp_master() {
		return id_temp_master;
	}

	public void setId_temp_master(int id_temp_master) {
		this.id_temp_master = id_temp_master;
	}

	@JsonGetter("tmptyp")
	public String getTemp_type() {
		return temp_type;
	}

	public void setTemp_type(String temp_type) {
		this.temp_type = temp_type;
	}

	@JsonGetter("tmpNm")
	public String getTemp_name() {
		return temp_name;
	}

	public void setTemp_name(String temp_name) {
		this.temp_name = temp_name;
	}

	@JsonGetter("tmStatus")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("tml")
	public List<TemplateMaster> getTemplateMasterList() {
		return templateMasterList;
	}

	public void setTemplateMasterList(List<TemplateMaster> templateMasterList) {
		this.templateMasterList = templateMasterList;
	}

}
