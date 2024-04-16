package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;




@Entity
@Table(name="bb_blood_request_slave")
public class BloodRequestSlave implements Serializable  {
	
	@Id
	@GeneratedValue
	@Column(name = "Component_id")
	private int componentId;
	
	@Column(name = "component_name")
	private String componentName;
	
	@Column(name = "collection_volume")
	private String collectionVolume;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "blood_request_master_id")
	private BloodRequest bloodRequest;

	@Transient	
	private List<BloodRequestSlave> listbloodRequestSlave;
	
	@Transient
	private String collection_volume;
	
	public int getComponentId() {
		return componentId;
	}

	public void setComponentId(int componentId) {
		this.componentId = componentId;
	}

	public String getComponentName() {
		return componentName;
	}

	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}

	public String getCollectionVolume() {
		return collectionVolume;
	}

	public void setCollectionVolume(String collectionVolume) {
		this.collectionVolume = collectionVolume;
	}
	@JsonIgnore
	public BloodRequest getBloodRequest() {
		return bloodRequest;
	}

	public void setBloodRequest(BloodRequest bloodRequest) {
		this.bloodRequest = bloodRequest;
	}

	public List<BloodRequestSlave> getListbloodRequestSlave() {
		return listbloodRequestSlave;
	}

	public void setListbloodRequestSlave(List<BloodRequestSlave> listbloodRequestSlave) {
		this.listbloodRequestSlave = listbloodRequestSlave;
	}

	public String getCollection_volume() {
		return collection_volume;
	}

	public void setCollection_volume(String collection_volume) {
		this.collection_volume = collection_volume;
	}

	
}
