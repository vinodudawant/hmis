package com.hms.inventory.dto;

import java.util.List;

import org.springframework.stereotype.Component;


@Component
public class DocMasterDocNumFinancialYearDto {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer docId;
	private String docName;
	private Integer docNumberingId;
	private String docSeries;
	private String docNumber;
	private String docPrefix;
	private String docSuffix;
	private Integer docFinancialYearId;
	private String year;
	private String deleted = "N";
	
	private List<DocMasterDocNumFinancialYearDto> lstdocMasterDocNumFinancialYearDto;
	
	private DocumentMasterDto documentMasterDto;
	private FinancialYearDto financialYearDto;
	private InventoryDocumentNumberMDTO invDocumentNumberMDTO;
	/**
	 * @return the docId
	 */
	public Integer getDocId() {
		return docId;
	}
	/**
	 * @return the docName
	 */
	public String getDocName() {
		return docName;
	}
	/**
	 * @return the docNumberingId
	 */
	public Integer getDocNumberingId() {
		return docNumberingId;
	}
	/**
	 * @return the docSeries
	 */
	public String getDocSeries() {
		return docSeries;
	}
	/**
	 * @return the docNumber
	 */
	public String getDocNumber() {
		return docNumber;
	}
	/**
	 * @return the docPrefix
	 */
	
	public String getDocPrefix() {
		return docPrefix;
	}
	/**
	 * @return the docSuffix
	 */
	public String getDocSuffix() {
		return docSuffix;
	}
	/**
	 * @return the docFinancialYearId
	 */
	public Integer getDocFinancialYearId() {
		return docFinancialYearId;
	}
	/**
	 * @return the year
	 */
	public String getYear() {
		return year;
	}
	/**
	 * @return the deleted
	 */
	public String getDeleted() {
		return deleted;
	}
/*	public List<DocMasterDocNumFinancialYearDto> getDocMasterDocNumFinancialYearDto() {
		return docMasterDocNumFinancialYearDto;
	}*/
	/**
	 * @return the documentMasterDto
	 */
	public DocumentMasterDto getDocumentMasterDto() {
		return documentMasterDto;
	}
	/**
	 * @return the financialYearDto
	 */
	public FinancialYearDto getFinancialYearDto() {
		return financialYearDto;
	}
	/**
	 * @return the invDocumentNumberMDTO
	 */
	public InventoryDocumentNumberMDTO getInvDocumentNumberMDTO() {
		return invDocumentNumberMDTO;
	}
	/**
	 * @param docId the docId to set
	 */
	public void setDocId(Integer docId) {
		this.docId = docId;
	}
	/**
	 * @param docName the docName to set
	 */
	public void setDocName(String docName) {
		this.docName = docName;
	}
	/**
	 * @param docNumberingId the docNumberingId to set
	 */
	public void setDocNumberingId(Integer docNumberingId) {
		this.docNumberingId = docNumberingId;
	}
	/**
	 * @param docSeries the docSeries to set
	 */
	public void setDocSeries(String docSeries) {
		this.docSeries = docSeries;
	}
	/**
	 * @param docNumber the docNumber to set
	 */
	public void setDocNumber(String docNumber) {
		this.docNumber = docNumber;
	}
	/**
	 * @param docPrefix the docPrefix to set
	 */
	public void setDocPrefix(String docPrefix) {
		this.docPrefix = docPrefix;
	}
	/**
	 * @param docSuffix the docSuffix to set
	 */
	public void setDocSuffix(String docSuffix) {
		this.docSuffix = docSuffix;
	}
	/**
	 * @param docFinancialYearId the docFinancialYearId to set
	 */
	public void setDocFinancialYearId(Integer docFinancialYearId) {
		this.docFinancialYearId = docFinancialYearId;
	}
	/**
	 * @param year the year to set
	 */
	public void setYear(String year) {
		this.year = year;
	}
	/**
	 * @param deleted the deleted to set
	 */
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	/**
	 * @param deletedBy the deletedBy to set
	 */
	/**
	 * @param docMasterDocNumFinancialYearDto the docMasterDocNumFinancialYearDto to set
	 */
	/*public void setDocMasterDocNumFinancialYearDto(
			List<DocMasterDocNumFinancialYearDto> docMasterDocNumFinancialYearDto) {
		this.docMasterDocNumFinancialYearDto = docMasterDocNumFinancialYearDto;
	}*/
	/**
	 * @param documentMasterDto the documentMasterDto to set
	 */
	public void setDocumentMasterDto(DocumentMasterDto documentMasterDto) {
		this.documentMasterDto = documentMasterDto;
	}
	/**
	 * @param financialYearDto the financialYearDto to set
	 */
	public void setFinancialYearDto(FinancialYearDto financialYearDto) {
		this.financialYearDto = financialYearDto;
	}
	/**
	 * @param invDocumentNumberMDTO the invDocumentNumberMDTO to set
	 */
	public void setInvDocumentNumberMDTO(
			InventoryDocumentNumberMDTO invDocumentNumberMDTO) {
		this.invDocumentNumberMDTO = invDocumentNumberMDTO;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "DocMasterDocNumFinancialYearDto [docId=" + docId + ", docName="
				+ docName + ", docNumberingId=" + docNumberingId
				+ ", docSeries=" + docSeries + ", docNumber=" + docNumber
				+ ", docPrefix=" + docPrefix + ", docSuffix=" + docSuffix
				+ ", docFinancialYearId=" + docFinancialYearId + ", year="
				+ year + ", deleted=" + deleted
				+ ", documentMasterDto="
				+ documentMasterDto + ", financialYearDto=" + financialYearDto
				+ ", invDocumentNumberMDTO=" + invDocumentNumberMDTO + "]";
	}
	/**
	 * @return the lstdocMasterDocNumFinancialYearDto
	 */
	public List<DocMasterDocNumFinancialYearDto> getLstdocMasterDocNumFinancialYearDto() {
		return lstdocMasterDocNumFinancialYearDto;
	}
	/**
	 * @param lstdocMasterDocNumFinancialYearDto the lstdocMasterDocNumFinancialYearDto to set
	 */
	public void setLstdocMasterDocNumFinancialYearDto(
			List<DocMasterDocNumFinancialYearDto> lstdocMasterDocNumFinancialYearDto) {
		this.lstdocMasterDocNumFinancialYearDto = lstdocMasterDocNumFinancialYearDto;
	}
	
	
	
}


