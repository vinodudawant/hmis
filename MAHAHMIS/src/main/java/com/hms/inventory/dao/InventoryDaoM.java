package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.district_taluka_city;
import com.hms.dto.FetchConsumptionSalevsDetailsDTO;
import com.hms.dto.SubInventoryDTO;
import com.hms.inventory.dto.AbcAnalysisMasterDto;
import com.hms.inventory.dto.CategoryDTOM;
import com.hms.inventory.dto.ChargeMasterDTO;
import com.hms.inventory.dto.CompanyMasterDTO;
import com.hms.inventory.dto.DocumentMasterDto;
import com.hms.inventory.dto.FinancialYearDto;
import com.hms.inventory.dto.FormDTOM;
import com.hms.inventory.dto.HospitalDetailsDto;
import com.hms.inventory.dto.InventoryDocumentNumberMDTO;
import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.MaintenanceContractMasterDto;
import com.hms.inventory.dto.ManufacturerMDTO;
import com.hms.inventory.dto.PackingMasterDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.SactionFormDTO;
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.inventory.dto.TermsAndCondtionDTO;
import com.hms.inventory.dto.UnitMasterDTONew;
import com.hms.inventory.dto.WarehouseMasterDto;

public interface InventoryDaoM {
	//financial master save or update
	public int saveorUpdateFinancialMaster(FinancialYearDto financialYearDAO);
	//financial master get all records
	public List<FinancialYearDto> getAllFinancialMaster(Integer unitId);
	//financial master edit records
	public FinancialYearDto editFinancialMaster(Integer id);
	//financial master delete records
	public boolean deleteFinancialMaster(FinancialYearDto financialYearDAO);
	//financial master search by year
	public List<FinancialYearDto> searchByYear(String year,HttpServletRequest request);
	//warehouse master save or update
	public int saveorUpdateWarehouseMaster(WarehouseMasterDto warehouseMasterDto);
	//warehouse master get all records
	public List<WarehouseMasterDto> getAllWarehouseMaster(Integer unitId);
	//warehouse master edit records
	public WarehouseMasterDto editWarehouseMaster(Integer id);
	//warehouse master delete records
	public boolean deleteWarehouseMaster(WarehouseMasterDto warehouseMasterDto);
	//warehouse master search by ID
	public List<WarehouseMasterDto> searchByWarehouseId(Integer id,HttpServletRequest request);
	//warehouse master search by ID
	public List<WarehouseMasterDto> searchByWarehouseName(String warehouseName,HttpServletRequest request);
	//warehouse auto fill search
	public WarehouseMasterDto autoSuggestionsOnWarehouseName(String warehouseName);
	//packing master save or update
	public int saveorUpdatePackingMaster(PackingMasterDto packingMasterDto);
	//packing master get all records
	public List<PackingMasterDto> getAllPackingMaster(Integer unitId);
	//packing master edit records
	public PackingMasterDto editPackingMaster(Integer id);
	//packing master delete records
	public boolean deletePackingMaster(PackingMasterDto packingMasterDto);
	//packing master search by ID
	public List<PackingMasterDto> searchByPackingId(Integer id,HttpServletRequest request);
	//packing auto fill search
	public PackingMasterDto autoSuggestionsOnPackingName(String packingName);
	//sub-inventory master save or update
	public int saveorUpdateSubInventoryMaster(SubInventoryMasterDto subInventoryMasterDto);
	//sub-inventory master get all records
	public List<SubInventoryMasterDto> getAllSubInventoryMaster();
	//sub-inventory master edit records
	public SubInventoryMasterDto editSubInventoryMaster(Integer id);
	//sub-inventory master delete records
	public boolean deleteSubInventoryMaster(SubInventoryMasterDto subInventoryMasterDto);
	//sub-inventory master search by ID
	public List<SubInventoryMasterDto> searchBySubInventoryId(Integer id,HttpServletRequest request);
	//sub-inventory auto fill search
	public SubInventoryMasterDto autoSuggestionsOnSubInventoryName(String subInventoryName);
	//AbcRangeAnalysys master save or update
	public int saveorUpdateAbcRangeAnalysisMaster(AbcAnalysisMasterDto abcAnalysysMasterDto);
	//AbcRangeAnalysys master get all records
	public List<AbcAnalysisMasterDto> getAllAbcRangeAnalysisMaster();
	//AbcRangeAnalysys master edit records
	public AbcAnalysisMasterDto editAbcRangeAnalysisMaster(Integer id);
	//AbcRangeAnalysys master delete records
	public boolean deleteAbcRangeAnalysisMaster(AbcAnalysisMasterDto abcAnalysysMasterDto);
	//AbcRangeAnalysys master search by ID
	public List<AbcAnalysisMasterDto> searchByAbcRangeAnalysisId(Integer id,HttpServletRequest request);
	//AbcRangeAnalysys auto fill search
	public AbcAnalysisMasterDto autoSuggestionsOnAbcRangeAnalysisId(Integer id);
	//to fetch the hospital state
	int fetchHospitalState(HttpServletRequest request);

	public int saveDocumentMaster(DocumentMasterDto documentMasterDto);
	public List<DocumentMasterDto> getAllDocumentMaster(Integer unitId);
	public DocumentMasterDto editDocumentMaster(Integer documentId);
	public boolean deleteDocumentMaster(DocumentMasterDto documentMasterDto);
	DocumentMasterDto inventoryDocumentAutoSuggestion(String documentName,String callFrom);
	public DocumentMasterDto getAllDocumentById(Integer documentId);

	public int saveDocNumberMaster(InventoryDocumentNumberMDTO invnumObj);	
	public List<InventoryDocumentNumberMDTO> getAllInventoryNUmberDoc(Integer unitId);
	public InventoryDocumentNumberMDTO editInventoryDocNumber(Integer docId);
	public boolean deleteInventoryNumberDoc(InventoryDocumentNumberMDTO numdocObj);

	public int saveTaxMaster(InventoryTaxSetUpMDTO invnumObj);
	public List<InventoryTaxSetUpMDTO> getAllInventoryTaxDoc(Integer unitId);
	public InventoryTaxSetUpMDTO editInventoryTaxDoc(Integer taxId);
	public boolean deleteInventoryTaxDoc(InventoryTaxSetUpMDTO invtaxobj);
	public List<InventoryTaxSetUpMDTO> getAllInventoryTaxMasterAutosuggestion(String hsnName);


	public int saveCategoryMaster(CategoryDTOM catObj);
	public List<CategoryDTOM> getAllInventoryCategoryDoc(Integer unitId);
	public CategoryDTOM editInventoryCategoryDoc(Integer catId);
	public boolean deleteInventoryCategoryDoc(CategoryDTOM catObj);
	public List<CategoryDTOM> getAllInventoryCategoryMasterAutosuggestion(String categoryName);


	public int saveFormMaster(FormDTOM formObj);
	public List<FormDTOM> getAllInventoryFormDoc(Integer unitId);
	public FormDTOM editInventoryFormDoc(Integer formId);
	public boolean deleteInventoryFormDoc(FormDTOM formObj);
	public List<FormDTOM> getAllInventoryformMasterAutosuggestion(String formType);


	public int saveManufacturerMaster(ManufacturerMDTO mObj);
	public List<ManufacturerMDTO> getAllInventoryManufactureDoc(Integer unitId);
	public ManufacturerMDTO editInventoryManufactureDoc(Integer mId);
	public boolean deleteInventoryManufactureDoc(ManufacturerMDTO mObj);
	public List<ManufacturerMDTO> getAllInventoryManufactureMasterAutosuggestion(String manufName);


	public int saveChargeMaster(ChargeMasterDTO cObj);
	public List<ChargeMasterDTO> getAllInventoryChargeMaster(Integer unitId);
	public ChargeMasterDTO editInventoryChargeMaster(Integer chargeId);
	public boolean deleteInventoryChargeMaster(ChargeMasterDTO cObj);
	public InventoryDocumentNumberMDTO inventoryDocumentNumberAutoSuggestion(String docName);

	public List<ChargeMasterDTO> getAllInventoryChargeMasterAutosuggestion(String chargeName,Integer unitId);

	public int saveUnitMaster(UnitMasterDTONew uObj);
	public List<UnitMasterDTONew> getAllInventoryUnitMaster(Integer unitId);
	public UnitMasterDTONew editInventoryUnitMaster(Integer uniId);
	public boolean deleteInventoryUnitMaster(UnitMasterDTONew uObj );
	public List<UnitMasterDTONew> getAllInventoryUnitMasterAutosuggestion(String unitName);

	public int saveTermAndConditionMaster(TermsAndCondtionDTO tObj);
	public List<TermsAndCondtionDTO> getAllInventoryTermAndConditionMaster(Integer unitId);
	public TermsAndCondtionDTO editInventoryTermAndConditionMaster(Integer termconditionId);
	public boolean deleteInventoryTermAndConditionMaster(TermsAndCondtionDTO tObj);
	public List<TermsAndCondtionDTO> getAllInventoryTermAndConditionMasterAutosuggestion(String headingName);

	
	public int saveHospitalDetails(HospitalDetailsDto hospitalDetailsDto);
	public List<HospitalDetailsDto> getAllHospitalDetails();
	public HospitalDetailsDto editHospitalDetails(Integer hospitalId);
	public boolean deleteHospitalDetails(HospitalDetailsDto hospitalDetailsDto);
	public HospitalDetailsDto hospitalDetailsAutoSuggestion(String hospitalName,String callFrom);
	public HospitalDetailsDto getAllHospitalDetailsById(Integer hospitalId);
	
	public int saveCompanyMaster(CompanyMasterDTO cObj);
	public List<CompanyMasterDTO> getAllInventoryCompanyMaster();
	public CompanyMasterDTO editInventoryCompanyMaster(Integer companyId);
	public boolean deleteInventoryCompanyMaster(CompanyMasterDTO cObj);
	public List<CompanyMasterDTO> getAllInventoryComapnyMasterAutosuggestion(String companyName);
	
	
	 public List<district_taluka_city> getAllStateMaster(HttpServletRequest request);
	 public List<district_taluka_city> getAllDistrictByStateId(Integer stateId);
	 public List<district_taluka_city> getAllTalukaBydDistictId(Integer districtId);
	 public List<district_taluka_city> getAllCityByTalukaId(Integer talukaId);
	
	 public  List<FinancialYearDto> inventoryFinancialYearAutoSuggestion(String year);
	 public int saveSanctionMaster(SactionFormDTO sanctionobj);
	public List<SactionFormDTO> getAllSanctionMaster(Integer unitId);
	
	public SactionFormDTO editSactionMaster(Integer sanctionId);
	//warehouse master delete records
	public boolean deleteSactionMaster(SactionFormDTO sacobj);
	
	public Integer getPageCountAllSubinventoryMaster();
	
	public SubInventoryMasterDto getSubInventoryMasterPagination(Integer startIndex);
	
	public PartyMasterDto getPartyMasterPagination(Integer startIndex);
	
	//maintenance contract master save or update
	public int saveorUpdateMaintenanceContractMaster(MaintenanceContractMasterDto maintenanceContractMasterDto);
	//maintenance contract master get all records
	public List<MaintenanceContractMasterDto> getAllMaintenanceContractMasterRecords(Integer unitId);
	//maintenance contract master edit records
	public MaintenanceContractMasterDto editMaintenanceContractMaster(Integer id);
	//maintenance contract master delete records
	public boolean deleteMaintenanceContractMaster(MaintenanceContractMasterDto maintenanceContractMasterDto);
	
	
	public List<SubInventoryMasterDto> getAllSubInventory(String actionType,String isEdit);
	
	Integer getSubInventoryStockRecord(Integer id);

	
}
