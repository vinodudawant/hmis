package com.hms.doctordesk.dto;

import java.util.List;

public class PrescriptionGenericDTO {
     public int productId;
    public  String productName;
     public int drugId;
    public  String drugName;
    int nutracalProduct;
    
    List<PrescriptionGenericDTO> lstPrescriptionGenericDTO;

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getDrugId() {
		return drugId;
	}

	public void setDrugId(int drugId) {
		this.drugId = drugId;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public List<PrescriptionGenericDTO> getLstPrescriptionGenericDTO() {
		return lstPrescriptionGenericDTO;
	}

	public void setLstPrescriptionGenericDTO(List<PrescriptionGenericDTO> lstPrescriptionGenericDTO) {
		this.lstPrescriptionGenericDTO = lstPrescriptionGenericDTO;
	}

	public int getNutracalProduct() {
		return nutracalProduct;
	}

	public void setNutracalProduct(int nutracalProduct) {
		this.nutracalProduct = nutracalProduct;
	}

	@Override
	public String toString() {
		return "PrescriptionGenericDTO [productId=" + productId + ", productName=" + productName + ", drugId=" + drugId
				+ ", drugName=" + drugName + ", nutracalProduct=" + nutracalProduct + ", lstPrescriptionGenericDTO="
				+ lstPrescriptionGenericDTO + "]";
	}

	
    
    
}
