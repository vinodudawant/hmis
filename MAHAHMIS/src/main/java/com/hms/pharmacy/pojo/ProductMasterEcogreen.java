package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@Table(name = "pharma_product_master_ecogreen")
public class ProductMasterEcogreen  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "product_id")
	private Integer productId;

	
	@Column(name = "product_name")
	private String productName;

	@Column(name = "product_short_name")
	private String productShortName;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "product_comp_id")
	private CompanyMaster companyMaster;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "product_pack_id")
	private PackingMaster packingMaster;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "product_cat_id")
	private CategoryMaster categoryMaster;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private HsnMaster hsnMaster;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "taxMaster_tax_id")
	private TaxMaster taxMaster;

	@OneToMany(mappedBy="productMaster")
	@LazyCollection(value=LazyCollectionOption.FALSE)
	/*@JoinColumn(name = "batch_product_id", referencedColumnName = "product_id")*/
	private List<BatchMaster> batchMaster = new ArrayList<BatchMaster>();
	
	@OneToMany(mappedBy="stockProductMaster")
	@LazyCollection(value=LazyCollectionOption.FALSE)
	/*@JoinColumn(name = "stock_product_id", referencedColumnName = "product_id")*/
	private List<StockMaster> stockMasters = new ArrayList<StockMaster>();
	/*
	 * @OneToOne(fetch=FetchType.EAGER)
	 * 
	 * @JoinColumn(name="stock_product_id") StockMaster stockMasters = new
	 * StockMaster();
	 */

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "product_uom_id")
	private UomMaster uomMaster;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "product_preparation_id")
	private PreparationMaster preparationMaster;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "product_strength_id")
	private StrengthMaster strengthMaster;
	
	@Column(name = "product_hsn")
	private String hsn;
	
	@Column(name = "product_sgst")
	private String sgst;
	
	@Column(name = "product_cgst")
	private String cgst;
	
	@Column(name = "product_igst")
	private String igst;
	
	@Column(name = "product_cess")
	private String cess;
	
	@Column(name = "product_cathlapFlag")
	private int cathlabFlag;
	
	@Column(name = "ecogreen_product_unit_id",columnDefinition="int default 1")
	private int ecogreenProdcutUnitId;
	
	@Column(name = "ecogreen_product_preparation_id",columnDefinition="int default 1")
	private int ecogreenProdcutPreparationId;
	
	@Column(name = "ecogreen_product_streangth_id",columnDefinition="int default 1")
	private int ecogreenProdcutStrenghtId;
	
	@Transient
	List<ProductMaster> plist;	
	
	@Transient
	private String routeName;
	
	
	
	public String getRouteName() {
		return routeName;
	}

	public void setRouteName(String routeName) {
		this.routeName = routeName;
	}

	public List<ProductMaster> getPlist() {
		return plist;
	}

	public void setPlist(List<ProductMaster> plist) {
		this.plist = plist;
	}

	public TaxMaster getTaxMaster() {
		return taxMaster;
	}

	public void setTaxMaster(TaxMaster taxMaster) {
		this.taxMaster = taxMaster;
	}

	public int getCathlapFlag() {
		return cathlabFlag;
	}

	public void setCathlapFlag(int cathlapFlag) {
		this.cathlabFlag = cathlapFlag;
	}

	public String getSgst() {
		return sgst;
	}

	public void setSgst(String sgst) {
		this.sgst = sgst;
	}

	public String getCgst() {
		return cgst;
	}

	public void setCgst(String cgst) {
		this.cgst = cgst;
	}

	public String getIgst() {
		return igst;
	}

	public void setIgst(String igst) {
		this.igst = igst;
	}

	public String getCess() {
		return cess;
	}

	public void setCess(String cess) {
		this.cess = cess;
	}

	public String getHsn() {
		return hsn;
	}

	public void setHsn(String hsn) {
		this.hsn = hsn;
	}

	public PreparationMaster getPreparationMaster() {
		return preparationMaster;
	}

	public void setPreparationMaster(PreparationMaster preparationMaster) {
		this.preparationMaster = preparationMaster;
	}

	public StrengthMaster getStrengthMaster() {
		return strengthMaster;
	}

	public void setStrengthMaster(StrengthMaster strengthMaster) {
		this.strengthMaster = strengthMaster;
	}
	
	

	public HsnMaster getHsnMaster() {
		return hsnMaster;
	}

	public void setHsnMaster(HsnMaster hsnMaster) {
		this.hsnMaster = hsnMaster;
	}

	public int getCathlabFlag() {
		return cathlabFlag;
	}

	public void setCathlabFlag(int cathlabFlag) {
		this.cathlabFlag = cathlabFlag;
	}

	/*@JsonIgnore*/
	public List<StockMaster> getStockMasters() {
		return stockMasters;
	}

	public void setStockMasters(List<StockMaster> stockMasters) {
		this.stockMasters = stockMasters;
	}

	@Column(name = "product_uom_unit")
	private Double productUnit;
	
	@Column(name = "product_add_date")
	private Date productAddDate;
	
	
	
	/*@OneToMany(mappedBy="productMaster")
	private List<BatchMaster> batchMaster = new ArrayList<BatchMaster>();

	public List<BatchMaster> getBatchMaster() {
		return batchMaster;
	}

	public void setBatchMaster(List<BatchMaster> batchMaster) {
		this.batchMaster = batchMaster;
	}*/

	public Date getProductAddDate() {
		return productAddDate;
	}

	public void setProductAddDate(Date productAddDate) {
		this.productAddDate = productAddDate;
	}

	/*@ManyToMany
	 @Cascade({ CascadeType.ALL }) 
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinTable(name = "pharma_product_tax_relation", joinColumns = { @JoinColumn(name = "product_id") }, inverseJoinColumns = { @JoinColumn(name = "tax_id") })
	private List<TaxMaster> taxMaster= new ArrayList<TaxMaster>();

	
	@ManyToMany
	 @Cascade({ CascadeType.ALL }) 
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinTable(name = "pharma_product_tax_relation1", joinColumns = { @JoinColumn(name = "product_id") }, inverseJoinColumns = { @JoinColumn(name = "tax_id1") })
	private List<TaxMaster> taxMaster1 = new ArrayList<TaxMaster>();
*/
	@ManyToMany
	/* @Cascade({ CascadeType.ALL }) */
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinTable(name = "pharma_product_vendor_relation", joinColumns = { @JoinColumn(name = "product_id") }, inverseJoinColumns = { @JoinColumn(name = "vendor_id") })
	private List<VendorMaster> vendorMasters = new ArrayList<VendorMaster>();

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "product_drug_id")
	private DrugMaster drugMaster;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "product_shelf_id")
	private ShelfMaster shelfMaster;

	@Column(name = "product_short_list")
	private Integer productShortList;

	@Column(name = "product_sale_disc")
	private Integer productSaleDisc;

	@Column(name = "product_billing_must")
	private Integer productBillingMust;

	@Column(name = "product_h1")
	private Integer productH1;

	@Column(name = "product_nrx")
	private Integer productNrx;
	
	@Column(name = "product_x")
	private Integer productX;
		
	@Column(name = "product_ndps")
	private Integer productNdps;

	@Column(name = "product_batch")
	private Integer productBatch;

	@Column(name = "product_min_level")
	private Integer productMinLevel;

	@Column(name = "product_max_level")
	private Integer productMaxLevel;

	@Column(name = "product_desc")
	private String productDesc;

	@Column(name = "product_url")
	private String productPhotoUrl;

	@Column(name = "product_margin_rate")
	private Double productMarginRate;
	
	@Column(name = "product_fix_discount_sale")
	private Double productFixDiscount;

	@Column(name = "product_scheme1")
	private Double productScheme1;

	@Column(name = "product_scheme1_qty")
	private Double productScheme1Qty;

	@Column(name = "product_scheme2")
	private Double productScheme2;

	@Column(name = "product_scheme2_qty")
	private Double productScheme2Qty;

	@Column(name = "product_scheme3")
	private Double productScheme3;

	@Column(name = "product_scheme3_qty")
	private Double productScheme3Qty;

	@Column(name = "product_delete_flag")
	private Integer productDeleteFlag;

	@Column(name = "product_update_date")
	private Date productUpdateDate;

	// added after got requirement from client
	@Column(name = "product_last_mrp")
	private Double productLastMRP;
	
	@Column(name = "product_last_pur_rate")
	private Double productLastPurRate;

/*	@JsonIgnore
	@Transient
	private CommonsMultipartFile imgFile;*/

	@Column(name = "product_rate_equals_mrp")
	private Integer rateEqualsMrp;
	
	@Column(name = "nutracal_product",columnDefinition="int default 1")
	private Integer nutracalProduct=1;	
	
	@Column(name="product_created_by")
	private Integer productCreatedBy;
	
	@Column(name="product_user_ip")
	private String productIp;
	
	@Column(name="product_current_time")
	private String productTime;
	
	@Column(name="product_modify_by")
	private Integer productModifyBy=0;
	
	@Column(name="product_deleted_by")
	private Integer productDeletedBy=0;
	
	@Column(name = "product_prescription")
	private Integer productPrescription;
	
	public Integer getProductPrescription() {
		return productPrescription;
	}

	public void setProductPrescription(Integer productPrescription) {
		this.productPrescription = productPrescription;
	}

	public Integer getProductDeletedBy() {
		return productDeletedBy;
	}

	public void setProductDeletedBy(Integer productDeletedBy) {
		this.productDeletedBy = productDeletedBy;
	}

	public Integer getProductModifyBy() {
		return productModifyBy;
	}

	public void setProductModifyBy(Integer productModifyBy) {
		this.productModifyBy = productModifyBy;
	}
	
	public Integer getProductCreatedBy() {
		return productCreatedBy;
	}

	public void setProductCreatedBy(Integer productCreatedBy) {
		this.productCreatedBy = productCreatedBy;
	}

	public String getProductIp() {
		return productIp;
	}

	public void setProductIp(String productIp) {
		this.productIp = productIp;
	}

	public String getProductTime() {
		return productTime;
	}

	public void setProductTime(String productTime) {
		this.productTime = productTime;
	}
		
	public Integer getProductX() {
		return productX;
	}

	public void setProductX(Integer productX) {
		this.productX = productX;
	}

	public Integer getProductNdps() {
		return productNdps;
	}

	public void setProductNdps(Integer productNdps) {
		this.productNdps = productNdps;
	}
	
	public Integer getRateEqualsMrp() {
		return rateEqualsMrp;
	}

	public void setRateEqualsMrp(Integer rateEqualsMrp) {
		this.rateEqualsMrp = rateEqualsMrp;
	}

	public Double getProductScheme1() {
		return productScheme1;
	}

	public void setProductScheme1(Double productScheme1) {
		this.productScheme1 = productScheme1;
	}

	public Double getProductScheme1Qty() {
		return productScheme1Qty;
	}

	public void setProductScheme1Qty(Double productScheme1Qty) {
		this.productScheme1Qty = productScheme1Qty;
	}

	public Double getProductScheme2() {
		return productScheme2;
	}

	public void setProductScheme2(Double productScheme2) {
		this.productScheme2 = productScheme2;
	}

	public Double getProductScheme2Qty() {
		return productScheme2Qty;
	}

	public void setProductScheme2Qty(Double productScheme2Qty) {
		this.productScheme2Qty = productScheme2Qty;
	}

	public Double getProductScheme3() {
		return productScheme3;
	}

	public void setProductScheme3(Double productScheme3) {
		this.productScheme3 = productScheme3;
	}

	public Double getProductScheme3Qty() {
		return productScheme3Qty;
	}

	public void setProductScheme3Qty(Double productScheme3Qty) {
		this.productScheme3Qty = productScheme3Qty;
	}
	
	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public CompanyMaster getCompanyMaster() {
		return companyMaster;
	}

	public void setCompanyMaster(CompanyMaster companyMaster) {
		this.companyMaster = companyMaster;
	}

	public UomMaster getUomMaster() {
		return uomMaster;
	}

	public void setUomMaster(UomMaster uomMaster) {
		this.uomMaster = uomMaster;
	}

	public PackingMaster getPackingMaster() {
		return packingMaster;
	}

	public String getProductPhotoUrl() {
		return productPhotoUrl;
	}

	public void setProductPhotoUrl(String productPhotoUrl) {
		this.productPhotoUrl = productPhotoUrl;
	}

	public void setPackingMaster(PackingMaster packingMaster) {
		this.packingMaster = packingMaster;
	}

	public ShelfMaster getShelfMaster() {
		return shelfMaster;
	}

	public void setShelfMaster(ShelfMaster shelfMaster) {
		this.shelfMaster = shelfMaster;
	}

	public CategoryMaster getCategoryMaster() {
		return categoryMaster;
	}

	public void setCategoryMaster(CategoryMaster categoryMaster) {
		this.categoryMaster = categoryMaster;
	}

	public DrugMaster getDrugMaster() {
		return drugMaster;
	}

	public void setDrugMaster(DrugMaster drugMaster) {
		this.drugMaster = drugMaster;
	}

	public Double getProductUnit() {
		return productUnit;
	}

	public void setProductUnit(Double productUnit) {
		this.productUnit = productUnit;
	}

	public Integer getProductShortList() {
		return productShortList;
	}

	public void setProductShortList(Integer productShortList) {
		this.productShortList = productShortList;
	}

	public Integer getProductSaleDisc() {
		return productSaleDisc;
	}

	public void setProductSaleDisc(Integer productSaleDisc) {
		this.productSaleDisc = productSaleDisc;
	}

	public Integer getProductBillingMust() {
		return productBillingMust;
	}

	public void setProductBillingMust(Integer productBillingMust) {
		this.productBillingMust = productBillingMust;
	}

	public Integer getProductH1() {
		return productH1;
	}

	public void setProductH1(Integer productH1) {
		this.productH1 = productH1;
	}

	public Integer getProductNrx() {
		return productNrx;
	}

	public void setProductNrx(Integer productNrx) {
		this.productNrx = productNrx;
	}

	public Integer getProductMinLevel() {
		return productMinLevel;
	}

	public void setProductMinLevel(Integer productMinLevel) {
		this.productMinLevel = productMinLevel;
	}

	public Integer getProductBatch() {
		return productBatch;
	}

	public void setProductBatch(Integer productBatch) {
		this.productBatch = productBatch;
	}

	
	public Integer getProductDeleteFlag() {
		return productDeleteFlag;
	}

	public void setProductDeleteFlag(Integer productDeleteFlag) {
		this.productDeleteFlag = productDeleteFlag;
	}

	public Date getProductUpdateDate() {
		return productUpdateDate;
	}

	public void setProductUpdateDate(Date productUpdateDate) {
		this.productUpdateDate = productUpdateDate;
	}

	public String getProductShortName() {
		return productShortName;
	}

	public void setProductShortName(String productShortName) {
		this.productShortName = productShortName;
	}

	public Integer getProductMaxLevel() {
		return productMaxLevel;
	}

	public void setProductMaxLevel(Integer productMaxLevel) {
		this.productMaxLevel = productMaxLevel;
	}

	public String getProductDesc() {
		return productDesc;
	}

	public void setProductDesc(String productDesc) {
		this.productDesc = productDesc;
	}

	public Double getProductMarginRate() {
		return productMarginRate;
	}

	public void setProductMarginRate(Double productMarginRate) {
		this.productMarginRate = productMarginRate;
	}

	public Double getProductFixDiscount() {
		return productFixDiscount;
	}

	public void setProductFixDiscount(Double productFixDiscount) {
		this.productFixDiscount = productFixDiscount;
	}

	public List<VendorMaster> getVendorMasters() {
		return vendorMasters;
	}

	public void setVendorMasters(List<VendorMaster> vendorMasters) {
		this.vendorMasters = vendorMasters;
	}

	/*@JsonIgnore
	public CommonsMultipartFile getImgFile() {
		return imgFile;
	}

	public void setImgFile(CommonsMultipartFile imgFile) {
		this.imgFile = imgFile;
	}*/

	public Double getProductLastMRP() {
		return productLastMRP;
	}

	public void setProductLastMRP(Double productLastMRP) {
		this.productLastMRP = productLastMRP;
	}

	public Double getProductLastPurRate() {
		return productLastPurRate;
	}

	public void setProductLastPurRate(Double productLastPurRate) {
		this.productLastPurRate = productLastPurRate;
	}

	public List<BatchMaster> getBatchMaster() {
		return batchMaster;
	}

	public void setBatchMaster(List<BatchMaster> batchMaster) {
		this.batchMaster = batchMaster;
	}
	
	@Transient
	private List<ProductMasterEcogreen> lstprod;




	
	
	@Transient
	private Integer productID;
	
	//@Transient
	//private String productname;
	
	public Integer getProductID() {
		return productID;
	}

	public void setProductID(Integer productID) {
		this.productID = productID;
	}

	/*
	 * public String getProductname() { return productname; }
	 * 
	 * public void setProductname(String productname) { this.productname =
	 * productname; }
	 */

	public String getPrescriptionName() {
		return prescriptionName;
	}

	public void setPrescriptionName(String prescriptionName) {
		this.prescriptionName = prescriptionName;
	}

	@Transient
	private String prescriptionName;
	
	@Transient
	private Integer prescrioptionID;


	public Integer getPrescrioptionID() {
		return prescrioptionID;
	}

	public void setPrescrioptionID(Integer prescrioptionID) {
		this.prescrioptionID = prescrioptionID;
	}
	@Transient
	private Double strength;
	
	@Transient
	private Integer Unit;


	public Double getStrength() {
		return strength;
	}

	public void setStrength(Double strength) {
		this.strength = strength;
	}

	public Integer getUnit() {
		return Unit;
	}

	public void setUnit(Integer unit) {
		Unit = unit;
	}

	public Integer getNutracalProduct() {
		return nutracalProduct;
	}

	public void setNutracalProduct(Integer nutracalProduct) {
		this.nutracalProduct = nutracalProduct;
	}

	public List<ProductMasterEcogreen> getLstprod() {
		return lstprod;
	}

	public void setLstprod(List<ProductMasterEcogreen> lstprod) {
		this.lstprod = lstprod;
	}

	public int getEcogreenProdcutUnitId() {
		return ecogreenProdcutUnitId;
	}

	public void setEcogreenProdcutUnitId(int ecogreenProdcutUnitId) {
		this.ecogreenProdcutUnitId = ecogreenProdcutUnitId;
	}

	public int getEcogreenProdcutPreparationId() {
		return ecogreenProdcutPreparationId;
	}

	public void setEcogreenProdcutPreparationId(int ecogreenProdcutPreparationId) {
		this.ecogreenProdcutPreparationId = ecogreenProdcutPreparationId;
	}

	public int getEcogreenProdcutStrenghtId() {
		return ecogreenProdcutStrenghtId;
	}

	public void setEcogreenProdcutStrenghtId(int ecogreenProdcutStrenghtId) {
		this.ecogreenProdcutStrenghtId = ecogreenProdcutStrenghtId;
	}

	
	


}
