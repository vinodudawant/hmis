package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class SurgicalKitMaster {

	private int idsurgical_kit_master;
	private String kit_name;
	private String status;
	private String sterilize_status;
	private List<SurgicalKitMaster> surgicalKitMasterList = null;
	private List<SurgicalKitComp> surgicalKitCompList = null;
	
	private int idTempTopic;
	private String topicName;
	
	public int getIdTempTopic() {
		return idTempTopic;
	}

	public void setIdTempTopic(int idTempTopic) {
		this.idTempTopic = idTempTopic;
	}

	public String getTopicName() {
		return topicName;
	}

	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}

	

	@JsonGetter("sterst")
	public String getSterilize_status() {
		return sterilize_status;
	}

	@JsonSetter("sterst")
	public void setSterilize_status(String sterilize_status) {
		this.sterilize_status = sterilize_status;
	}

	@JsonGetter("idskm")
	public int getIdsurgical_kit_master() {
		return idsurgical_kit_master;
	}

	@JsonSetter("idskm")
	public void setIdsurgical_kit_master(int idsurgical_kit_master) {
		this.idsurgical_kit_master = idsurgical_kit_master;
	}

	@JsonGetter("knm")
	public String getKit_name() {
		return kit_name;
	}

	@JsonSetter("knm")
	public void setKit_name(String kit_name) {
		this.kit_name = kit_name;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("skmli")
	public List<SurgicalKitMaster> getSurgicalKitMasterList() {
		return surgicalKitMasterList;
	}

	@JsonSetter("skmli")
	public void setSurgicalKitMasterList(
			List<SurgicalKitMaster> surgicalKitMasterList) {
		this.surgicalKitMasterList = surgicalKitMasterList;
	}

	@JsonGetter("skcli")
	public List<SurgicalKitComp> getSurgicalKitCompList() {
		return surgicalKitCompList;
	}

	@JsonSetter("skcli")
	public void setSurgicalKitCompList(List<SurgicalKitComp> surgicalKitCompList) {
		this.surgicalKitCompList = surgicalKitCompList;
	}

}
