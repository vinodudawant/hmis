package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import com.hms.dto.LabPkg;
import com.hms.pathology.dto.LabTestDTO;

public class LabFormulaHeadings implements Serializable{

	private static final long serialVersionUID = 1L;

	// This attribute maps to the column idheadings in the labheadings table.
	private int idheadings;

	// This attribute maps to the column branchId in the labheadings table.
	private int branchId;

	// This attribute maps to the column createdBy in the labheadings table.
	private int createdBy;

	// This attribute maps to the column heading in the labheadings table.
	private String heading;

	// This attribute maps to the column hcode in the labheadings table.
	private String hcode;

	// This attribute maps to the column headingStatus in the labheadings table.
	private String headingStatus;

	// This attribute maps to the column specialNote in the labheadings table.
	private String specialNote;

	// This attribute maps to the column dateofentry in the labheadings table.
	private Date dateofentry;

	private List<LabFormulaHeadings> labheadingsList;
	private List<LabProfileDTO> labProfileList;
	private List<LabTestDTO> labTestList;

	private List<LabPkg> labPkgli;

	private String isCategory;
	
	
//	@JsonGetter("lbpkgli")
	public List<LabPkg> getLabPkgli() {
		return labPkgli;
	}

//	@JsonSetter("lbpkgli")
	public void setLabPkgli(List<LabPkg> labPkgli) {
		this.labPkgli = labPkgli;
	}

//	@JsonGetter("lbProLi")
	public List<LabProfileDTO> getLabProfileList() {
		return labProfileList;
	}

//	@JsonSetter("lbProLi")
	public void setLabProfileList(List<LabProfileDTO> labProfileList) {
		this.labProfileList = labProfileList;
	}

//	@JsonGetter("lbTestLi")
	public List<LabTestDTO> getLabTestList() {
		return labTestList;
	}

//	@JsonSetter("lbTestLi")
	public void setLabTestList(List<LabTestDTO> labTestList) {
		this.labTestList = labTestList;
	}

//	@JsonGetter("lbHedLi")
	public List<LabFormulaHeadings> getLabheadingsList() {
		return labheadingsList;
	}

//	@JsonSetter("lbHedLi")
	public void setLabheadingsList(List<LabFormulaHeadings> labheadingsList) {
		this.labheadingsList = labheadingsList;
	}

//	@JsonGetter("idHed")
	public int getIdheadings() {
		return idheadings;
	}

//	@JsonSetter("idHed")
	public void setIdheadings(int idheadings) {
		this.idheadings = idheadings;
	}

//	@JsonGetter("brId")
	public int getBranchId() {
		return branchId;
	}

//	@JsonSetter("brId")
	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

//	@JsonGetter("crtBy")
	public int getCreatedBy() {
		return createdBy;
	}

//	@JsonSetter("crtBy")
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

//	@JsonGetter("hedNm")
	public String getHeading() {
		return heading;
	}

//	@JsonSetter("hedNm")
	public void setHeading(String heading) {
		this.heading = heading;
	}

//	@JsonGetter("hcod")
	public String getHcode() {
		return hcode;
	}

//	@JsonSetter("hcod")
	public void setHcode(String hcode) {
		this.hcode = hcode;
	}

//	@JsonGetter("hSt")
	public String getHeadingStatus() {
		return headingStatus;
	}

//	@JsonSetter("hSt")
	public void setHeadingStatus(String headingStatus) {
		this.headingStatus = headingStatus;
	}

//	@JsonGetter("spclNt")
	public String getSpecialNote() {
		return specialNote;
	}

//	@JsonSetter("spclNt")
	public void setSpecialNote(String specialNote) {
		this.specialNote = specialNote;
	}

//	@JsonGetter("dtOfEnt")
	public Date getDateofentry() {
		return dateofentry;
	}

//	@JsonSetter("dtOfEnt")
	public void setDateofentry(Date dateofentry) {
		this.dateofentry = dateofentry;
	}

//	@JsonGetter("isCat")
	public String getIsCategory() {
		return isCategory;
	}
	
//	@JsonSetter("isCat")
	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
	}


	@Override
	public String toString() {
		return "LabFormulaHeadings [idheadings=" + idheadings + ", branchId=" + branchId + ", createdBy=" + createdBy
				+ ", heading=" + heading + ", hcode=" + hcode + ", headingStatus=" + headingStatus + ", specialNote="
				+ specialNote + ", dateofentry=" + dateofentry + ", labheadingsList=" + labheadingsList
				+ ", labProfileList=" + labProfileList + ", labTestList=" + labTestList + ", labPkgli=" + labPkgli
				+ ", isCategory=" + isCategory + "]";
	}
}