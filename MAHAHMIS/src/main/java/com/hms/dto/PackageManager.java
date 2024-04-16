package com.hms.dto;

import java.util.List;
import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonGetter;

public class PackageManager implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int packageId;
	private int packageIDForSlave;
	private String pacakageName;
	private String packageAlias;
	private String packageCode;
	private String packageCharges;
	private String specialization;
	private String createdBy;
	private String suggestedBy;
	private String packageStatus;
	private String status;
	private String noOfDays;
	private String hallType;
	private String userId;
	private String packageType;
	private String arrayPackage;
	private String specializationName;
	private List<PackageSlave> packageSlaveList;
	private List<PackageManager> packageList;
	
	public int getPackageId() {
		return packageId;
	}
	public void setPackageId(int packageId) {
		this.packageId = packageId;
	}
	public String getPacakageName() {
		return pacakageName;
	}
	public void setPacakageName(String pacakageName) {
		this.pacakageName = pacakageName;
	}
	public String getPackageCode() {
		return packageCode;
	}
	public void setPackageCode(String packageCode) {
		this.packageCode = packageCode;
	}
	public String getPackageCharges() {
		return packageCharges;
	}
	public void setPackageCahrges(String packageCharges) {
		this.packageCharges = packageCharges;
	}
	public String getSpecialization() {
		return specialization;
	}
	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public String getSuggestedBy() {
		return suggestedBy;
	}
	public void setSuggestedBy(String suggestedBy) {
		this.suggestedBy = suggestedBy;
	}
	public String getPackageStatus() {
		return packageStatus;
	}
	public void setPackageStatus(String packageStatus) {
		this.packageStatus = packageStatus;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("ul")
	public List<PackageManager> getPackageList() {
		return packageList;
	}
	public void setPackageList(List<PackageManager> packageList) {
		this.packageList = packageList;
	}
	public String getPackageAlias() {
		return packageAlias;
	}
	public void setPackageAlias(String packageAlias) {
		this.packageAlias = packageAlias;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getNoOfDays() {
		return noOfDays;
	}
	public void setNoOfDay(String noOfDays) {
		this.noOfDays = noOfDays;
	}
	public String getHallType() {
		return hallType;
	}
	public void setHallType(String hallType) {
		this.hallType = hallType;
	}
	public String getPackageType() {
		return packageType;
	}
	public void setPackageType(String packageType) {
		this.packageType = packageType;
	}
	public String getArrayPackage() {
		return arrayPackage;
	}
	public void setArrayPackage(String arrayPackage) {
		this.arrayPackage = arrayPackage;
	}
	public int getPackageIDForSlave() {
		return packageIDForSlave;
	}
	public void setPackageIDForSlave(int packageIDForSlave) {
		this.packageIDForSlave = packageIDForSlave;
	}
	public List<PackageSlave> getPackageSlaveList() {
		return packageSlaveList;
	}
	public void setPackageSlaveList(List<PackageSlave> packageSlaveList) {
		this.packageSlaveList = packageSlaveList;
	}
	public String getSpecializationName() {
		return specializationName;
	}
	public void setSpecializationName(String specializationName) {
		this.specializationName = specializationName;
	}

}
