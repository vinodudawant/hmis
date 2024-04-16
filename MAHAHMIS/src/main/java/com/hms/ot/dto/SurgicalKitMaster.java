package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name = "ehat_preop_checklist_temp")
public class SurgicalKitMaster implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idTempTopic")
	private int idTempTopic;
	
	@Column(name = "topicName")
	@Type(type="text")
	private String topicName;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "unit_id")
	private int unitId;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "id_tem", nullable = false)
	//@JoinColumn(name = "idTempTopicSlave", referencedColumnName = "idTempTopic")
	private List<SurgicalKitslave> surgicalKitCompList;
	
	@Transient
	private int idsurgical_kit_master;
	@Transient
	private String kit_name;
	@Transient
	private String sterilize_status;
	@Transient
	private List<SurgicalKitMaster> surgicalKitMasterList;
	
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
	public List<SurgicalKitslave> getSurgicalKitCompList() {
		return surgicalKitCompList;
	}

	@JsonSetter("skcli")
	public void setSurgicalKitCompList(List<SurgicalKitslave> surgicalKitCompList) {
		this.surgicalKitCompList = surgicalKitCompList;
	}
	
	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	@Override
	public String toString() {
		return "SurgicalKitMaster [idTempTopic=" + idTempTopic + ", topicName=" + topicName + ", status=" + status
				+ ", surgicalKitCompList=" + surgicalKitCompList + ", idsurgical_kit_master=" + idsurgical_kit_master
				+ ", kit_name=" + kit_name + ", sterilize_status=" + sterilize_status + ", surgicalKitMasterList="
				+ surgicalKitMasterList + "]";
	}

//	@JsonGetter("skcli")
//	public List<SurgicalKitComp> getSurgicalKitCompList() {
//		return surgicalKitCompList;
//	}
//
//	@JsonSetter("skcli")
//	public void setSurgicalKitCompList(List<SurgicalKitComp> surgicalKitCompList) {
//		this.surgicalKitCompList = surgicalKitCompList;
//	}
	
	
	
}
