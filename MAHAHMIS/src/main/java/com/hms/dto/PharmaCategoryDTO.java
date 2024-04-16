package com.hms.dto;

import java.io.Serializable;
import java.util.List;

public class PharmaCategoryDTO implements Serializable
{
	private int categoryId;
	private String categoryName;
	private List<PharmaCategoryDTO> catList;
	private List<PharmaCategoryDTO> catListSlave;
	
	private String aliasName;
	private String priceType;
	
	private String description ;
	private int opdFlag ;
	private int ipdFlag ;
	private int pharmacyFlag;
	private int pathologoyFlag ;
	private int radiologyFlag ;
	private int diagoFlag ;
	
	private Double diagoDiscount ;
	private Double opdDiscount ;
	private Double ipdDiscount;
	private Double pharmacyDiscount ;
	private Double pathologyDiscount ;
	private Double radiologyDiscount;
	
	private int catIdUI;
	private Double catDiscountUI;
	private String efDateUI;
	private int catFlagUI;
	private int catIdSlave;
	
	public int getDiagoFlag() {
		return diagoFlag;
	}
	public void setDiagoFlag(int diagoFlag) {
		this.diagoFlag = diagoFlag;
	}
	public Double getDiagoDiscount() {
		return diagoDiscount;
	}
	public void setDiagoDiscount(Double diagoDiscount) {
		this.diagoDiscount = diagoDiscount;
	}

	
	public int getCatIdSlave() {
		return catIdSlave;
	}
	public void setCatIdSlave(int catIdSlave) {
		this.catIdSlave = catIdSlave;
	}
	public List<PharmaCategoryDTO> getCatListSlave() {
		return catListSlave;
	}
	public void setCatListSlave(List<PharmaCategoryDTO> catListSlave) {
		this.catListSlave = catListSlave;
	}

	public int getCatFlagUI() {
		return catFlagUI;
	}
	public void setCatFlagUI(int catFlagUI) {
		this.catFlagUI = catFlagUI;
	}
	public int getCatIdUI() {
		return catIdUI;
	}
	public void setCatIdUI(int catIdUI) {
		this.catIdUI = catIdUI;
	}
	public Double getCatDiscountUI() {
		return catDiscountUI;
	}
	public void setCatDiscountUI(Double catDiscountUI) {
		this.catDiscountUI = catDiscountUI;
	}
	public String getEfDateUI() {
		return efDateUI;
	}
	public void setEfDateUI(String efDateUI) {
		this.efDateUI = efDateUI;
	}
	
	public String getPriceType() {
		return priceType;
	}
	public void setPriceType(String priceType) {
		this.priceType = priceType;
	}

	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public List<PharmaCategoryDTO> getCatList() {
		return catList;
	}
	public void setCatList(List<PharmaCategoryDTO> catList) {
		this.catList = catList;
	}
	
	public String getAliasName() {
		return aliasName;
	}
	public void setAliasName(String aliasName) {
		this.aliasName = aliasName;
	}
	
	private String effectiveFrom ;
	public String getEffectiveFrom() {
		return effectiveFrom;
	}
	public void setEffectiveFrom(String effectiveFrom) {
		this.effectiveFrom = effectiveFrom;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getOpdFlag() {
		return opdFlag;
	}
	public void setOpdFlag(int opdFlag) {
		this.opdFlag = opdFlag;
	}
	public int getIpdFlag() {
		return ipdFlag;
	}
	public void setIpdFlag(int ipdFlag) {
		this.ipdFlag = ipdFlag;
	}
	public int getPharmacyFlag() {
		return pharmacyFlag;
	}
	public void setPharmacyFlag(int pharmacyFlag) {
		this.pharmacyFlag = pharmacyFlag;
	}
	public int getPathologoyFlag() {
		return pathologoyFlag;
	}
	public void setPathologoyFlag(int pathologoyFlag) {
		this.pathologoyFlag = pathologoyFlag;
	}
	public int getRadiologyFlag() {
		return radiologyFlag;
	}
	public void setRadiologyFlag(int radiologyFlag) {
		this.radiologyFlag = radiologyFlag;
	}
	public Double getOpdDiscount() {
		return opdDiscount;
	}
	public void setOpdDiscount(Double opdDiscount) {
		this.opdDiscount = opdDiscount;
	}
	public Double getIpdDiscount() {
		return ipdDiscount;
	}
	public void setIpdDiscount(Double ipdDiscount) {
		this.ipdDiscount = ipdDiscount;
	}
	public Double getPharmacyDiscount() {
		return pharmacyDiscount;
	}
	public void setPharmacyDiscount(Double pharmacyDiscount) {
		this.pharmacyDiscount = pharmacyDiscount;
	}
	public Double getPathologyDiscount() {
		return pathologyDiscount;
	}
	public void setPathologyDiscount(Double pathologyDiscount) {
		this.pathologyDiscount = pathologyDiscount;
	}
	public Double getRadiologyDiscount() {
		return radiologyDiscount;
	}
	public void setRadiologyDiscount(Double radiologyDiscount) {
		this.radiologyDiscount = radiologyDiscount;
	}
	
	
	
	
	
	
}
