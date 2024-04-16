package com.hms.ehat.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.List;

@Entity
@Table(name = "ehat_freez")
public class Freezdto {
@Id
@GeneratedValue
@Column(name = "free_id")	
private int free_id;	
@Column(name = "modulen_name",columnDefinition="varchar(255) default '-'")	
private String modulenName="-";
@Column(name = "submodule_name",columnDefinition="varchar(255) default '-'")	
private String submoduleName="-" ;
@Column(name = "service_id",columnDefinition="int default 0")	
private int serviceId=0 ;
@Column(name = "subservice_id",columnDefinition="int default 0")	
private int subserviceId;
@Column(name = "configur_id",columnDefinition="int default 0")	
private int configurid=0;
@Column(name = "subconfigur_id",columnDefinition="int default 0")	
private int subconfigurid=0;

@Transient
private List<Freezdto> listFreezdetails;



public List<Freezdto> getListFreezdetails() {
	return listFreezdetails;
}
public void setListFreezdetails(List<Freezdto> listFreezdetails) {
	this.listFreezdetails = listFreezdetails;
}
public int getFree_id() {
	return free_id;
}
public void setFree_id(int free_id) {
	this.free_id = free_id;
}
public String getModulenName() {
	return modulenName;
}
public void setModulenName(String modulenName) {
	this.modulenName = modulenName;
}
public String getSubmoduleName() {
	return submoduleName;
}
public void setSubmoduleName(String submoduleName) {
	this.submoduleName = submoduleName;
}
public int getServiceId() {
	return serviceId;
}
public void setServiceId(int serviceId) {
	this.serviceId = serviceId;
}
public int getSubserviceId() {
	return subserviceId;
}
public void setSubserviceId(int subserviceId) {
	this.subserviceId = subserviceId;
}
public int getConfigurid() {
	return configurid;
}
public void setConfigurid(int configurid) {
	this.configurid = configurid;
}
public int getSubconfigurid() {
	return subconfigurid;
}
public void setSubconfigurid(int subconfigurid) {
	this.subconfigurid = subconfigurid;
}

}
