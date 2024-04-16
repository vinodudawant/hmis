package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ProductDTO {

	private Integer productId;
	private String productName;
	private Double productCost;
	private Double productMRP;
	private Date productLastUpdtDate;
	private Integer productManufacturer;
	private Integer productCategory;
	private Integer productForm;
	private Integer productPacking;
	private Integer productUOM;
	private Integer productShelf;
	private Integer productVendor;
	private Integer productIngredient;
	private String productStatus;
	private List<ProductDTO> ltProductDTOs;
	private StockDTO stockDTO;
	private UomRelationDTO uomDTO;
	private String productManufacturerName;
	private String productCategoryName;
	private String productFromType;
	private String productPackingType;
	private String productUOMDesc;
	private String productShelfNo;
	private String productVendorName;
	private String productIngredientContent;
	private Integer productBatchFlag;
	private int uom_id;
	private int Ref_product_id;
	private double qty;
	private double sub_qty;
	private int addbatch;
	@JsonGetter("productId")
	public Integer getProductId() {
		return productId;
	}
	@JsonSetter("productId")
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	@JsonGetter("productName")
	public String getProductName() {
		return productName;
	}
	@JsonSetter("productName")
	public void setProductName(String productName) {
		this.productName = productName;
	}
	@JsonGetter("productCost")
	public Double getProductCost() {
		return productCost;
	}
	@JsonSetter("productCost")
	public void setProductCost(Double productCost) {
		this.productCost = productCost;
	}
	@JsonGetter("productMRP")
	public Double getProductMRP() {
		return productMRP;
	}
	@JsonSetter("productMRP")
	public void setProductMRP(Double productMRP) {
		this.productMRP = productMRP;
	}
	@JsonGetter("productLastUpdtDate")
	public Date getProductLastUpdtDate() {
		return productLastUpdtDate;
	}
	@JsonSetter("productLastUpdtDate")
	public void setProductLastUpdtDate(Date productLastUpdtDate) {
		this.productLastUpdtDate = productLastUpdtDate;
	}
	@JsonGetter("productManufacturer")
	public Integer getProductManufacturer() {
		return productManufacturer;
	}
	@JsonSetter("productManufacturer")
	public void setProductManufacturer(Integer productManufacturer) {
		this.productManufacturer = productManufacturer;
	}
	@JsonGetter("productCategory")
	public Integer getProductCategory() {
		return productCategory;
	}
	@JsonSetter("productCategory")
	public void setProductCategory(Integer productCategory) {
		this.productCategory = productCategory;
	}
	@JsonGetter("productForm")
	public Integer getProductForm() {
		return productForm;
	}
	@JsonSetter("productForm")
	public void setProductForm(Integer productForm) {
		this.productForm = productForm;
	}
	@JsonGetter("productPacking")
	public Integer getProductPacking() {
		return productPacking;
	}
	@JsonSetter("productPacking")
	public void setProductPacking(Integer productPacking) {
		this.productPacking = productPacking;
	}
	@JsonGetter("productUOM")
	public Integer getProductUOM() {
		return productUOM;
	}
	@JsonSetter("productUOM")
	public void setProductUOM(Integer productUOM) {
		this.productUOM = productUOM;
	}
	@JsonGetter("productShelf")
	public Integer getProductShelf() {
		return productShelf;
	}
	@JsonSetter("productShelf")
	public void setProductShelf(Integer productShelf) {
		this.productShelf = productShelf;
	}
	@JsonGetter("productVendor")
	public Integer getProductVendor() {
		return productVendor;
	}
	@JsonSetter("productVendor")
	public void setProductVendor(Integer productVendor) {
		this.productVendor = productVendor;
	}
	@JsonGetter("productIngredient")
	public Integer getProductIngredient() {
		return productIngredient;
	}
	@JsonSetter("productIngredient")
	public void setProductIngredient(Integer productIngredient) {
		this.productIngredient = productIngredient;
	}
	@JsonGetter("productStatus")
	public String getProductStatus() {
		return productStatus;
	}
	@JsonSetter("productStatus")
	public void setProductStatus(String productStatus) {
		this.productStatus = productStatus;
	}
	@JsonGetter("ltProductDTOs")
	public List<ProductDTO> getLtProductDTOs() {
		return ltProductDTOs;
	}
	@JsonSetter("ltProductDTOs")
	public void setLtProductDTOs(List<ProductDTO> ltProductDTOs) {
		this.ltProductDTOs = ltProductDTOs;
	}
	@JsonGetter("stockDTO")
	public StockDTO getStockDTO() {
		return stockDTO;
	}
	@JsonSetter("stockDTO")
	public void setStockDTO(StockDTO stockDTO) {
		this.stockDTO = stockDTO;
	}
	@JsonGetter("productManufacturerName")
	public String getProductManufacturerName() {
		return productManufacturerName;
	}
	@JsonSetter("productManufacturerName")
	public void setProductManufacturerName(String productManufacturerName) {
		this.productManufacturerName = productManufacturerName;
	}
	@JsonGetter("productCategoryName")
	public String getProductCategoryName() {
		return productCategoryName;
	}
	@JsonSetter("productCategoryName")
	public void setProductCategoryName(String productCategoryName) {
		this.productCategoryName = productCategoryName;
	}
	@JsonGetter("productFromType")
	public String getProductFromType() {
		return productFromType;
	}
	@JsonSetter("productFromType")
	public void setProductFromType(String productFromType) {
		this.productFromType = productFromType;
	}
	@JsonGetter("productPackingType")
	public String getProductPackingType() {
		return productPackingType;
	}
	@JsonSetter("productPackingType")
	public void setProductPackingType(String productPackingType) {
		this.productPackingType = productPackingType;
	}
	@JsonGetter("productUOMDesc")
	public String getProductUOMDesc() {
		return productUOMDesc;
	}
	@JsonSetter("productUOMDesc")
	public void setProductUOMDesc(String productUOMDesc) {
		this.productUOMDesc = productUOMDesc;
	}
	@JsonGetter("productShelfNo")
	public String getProductShelfNo() {
		return productShelfNo;
	}
	@JsonSetter("productShelfNo")
	public void setProductShelfNo(String productShelfNo) {
		this.productShelfNo = productShelfNo;
	}
	@JsonGetter("productVendorName")
	public String getProductVendorName() {
		return productVendorName;
	}
	@JsonSetter("productVendorName")
	public void setProductVendorName(String productVendorName) {
		this.productVendorName = productVendorName;
	}
	@JsonGetter("productIngredientContent")
	public String getProductIngredientContent() {
		return productIngredientContent;
	}
	@JsonSetter("productIngredientContent")
	public void setProductIngredientContent(String productIngredientContent) {
		this.productIngredientContent = productIngredientContent;
	}
	@JsonGetter("productBatchFlag")
	public Integer getProductBatchFlag() {
		return productBatchFlag;
	}
	@JsonSetter("productBatchFlag")
	public void setProductBatchFlag(Integer productBatchFlag) {
		this.productBatchFlag = productBatchFlag;
	}
	@JsonGetter("uomDTO")
	public UomRelationDTO getUomDTO() {
		return uomDTO;
	}
	@JsonSetter("uomDTO")
	public void setUomDTO(UomRelationDTO uomDTO) {
		this.uomDTO = uomDTO;
	}
	@JsonGetter("uom_id")
	public int getUom_id() {
		return uom_id;
	}
	@JsonSetter("uom_id")
	public void setUom_id(int uom_id) {
		this.uom_id = uom_id;
	}
	@JsonGetter("Ref_product_id")
	public int getRef_Product_id() {
		return Ref_product_id;
	}
	@JsonSetter("Ref_product_id")
	public void setRef_Product_id(int Ref_product_id) {
		this.Ref_product_id = Ref_product_id;
	}
	@JsonGetter("qty")
	public double getQty() {
		return qty;
	}
	@JsonSetter("qty")
	public void setQty(double qty) {
		this.qty = qty;
	}
	@JsonGetter("sub_qty")
	public double getSub_qty() {
		return sub_qty;
	}
	@JsonSetter("sub_qty")
	public void setSub_qty(double sub_qty) {
		this.sub_qty = sub_qty;
	}
	@JsonGetter("addbatch")
	public int getAddbatch() {
		return addbatch;
	}
	@JsonSetter("addbatch")
	public void setAddbatch(int addbatch) {
		this.addbatch = addbatch;
	}
	
	
}
