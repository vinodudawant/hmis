package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.district_taluka_city;
//import com.hms.ehat.dto.AdminCityDTO;
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

public interface InventoryServiceM {
	
	//financial master save or update
	public int saveorUpdateFinancialMaster(FinancialYearDto financialYearDAO,HttpServletRequest request);
	//financial master get all records
	public List<FinancialYearDto> getAllFinancialMaster(HttpServletRequest request,Integer unitId);
	//financial master edit records
	public FinancialYearDto editFinancialMaster(Integer id);
	//financial master delete records
	public boolean deleteFinancialMaster(Integer id, HttpServletRequest request);
	//financial master search by year
	public List<FinancialYearDto> searchByYear(String year,HttpServletRequest request);
	
	
	//warehouse master save or update
	public int saveorUpdateWarehouseMaster(WarehouseMasterDto warehouseMasterDto,HttpServletRequest request);
	//warehouse master get all records
	public List<WarehouseMasterDto> getAllWarehouseMaster(HttpServletRequest request,Integer unitId);
	//warehouse master edit records
	public WarehouseMasterDto editWarehouseMaster(Integer id);
	//warehouse master delete records
	public boolean deleteWarehouseMaster(Integer id, HttpServletRequest request);
	//warehouse master search by ID
	public List<WarehouseMasterDto> searchByWarehouseId(Integer id,HttpServletRequest request);
	//warehouse auto fill search
	public WarehouseMasterDto autoSuggestionsOnWarehouseName(String warehouseName);
	//warehouse master search by name
	public List<WarehouseMasterDto> searchByWarehouseName(String warehouseName,HttpServletRequest request);
	
	
	//packing master save or update	
	public int saveorUpdatePackingMaster(PackingMasterDto packingMasterDto,HttpServletRequest request);
	//packing master get all records
	public List<PackingMasterDto> getAllPackingMaster(HttpServletRequest request,Integer unitId);
	//packing master edit records
	public PackingMasterDto editPackingMaster(Integer id);
	//packing master delete records
	public boolean deletePackingMaster(Integer id, HttpServletRequest request);
	//packing master search by ID
	public List<PackingMasterDto> searchByPackingId(Integer id,HttpServletRequest request);
	//packing auto fill search
	
	
	public PackingMasterDto autoSuggestionsOnPackingName(String packingName);
	//sub-inventory master save or update
	public int saveorUpdateSubInventoryMaster(SubInventoryMasterDto subInventoryMasterDto,HttpServletRequest request);
	//sub-inventory master get all records
	public List<SubInventoryMasterDto> getAllSubInventoryMaster(HttpServletRequest request);
	//sub-inventory master edit records
	public SubInventoryMasterDto editSubInventoryMaster(Integer id);
	//sub-inventory master delete records
	public boolean deleteSubInventoryMaster(Integer id, HttpServletRequest request);
	//sub-inventory master search by ID
	public List<SubInventoryMasterDto> searchBySubInventoryId(Integer id,HttpServletRequest request);
	//sub-inventory auto fill search
	
	
	public SubInventoryMasterDto autoSuggestionsOnSubInventoryName(String subInventoryName);
	//AbcRangeAnalysys master save or update
	public int saveorUpdateAbcRangeAnalysisMaster(AbcAnalysisMasterDto analysysMasterDto,HttpServletRequest request);
	//AbcRangeAnalysys master get all records
	public List<AbcAnalysisMasterDto> getAllAbcRangeAnalysisMaster(HttpServletRequest request);
	//AbcRangeAnalysys master edit records
	public AbcAnalysisMasterDto editAbcRangeAnalysisMaster(Integer id);
	//AbcRangeAnalysys master delete records
	public boolean deleteAbcRangeAnalysisMaster(Integer id, HttpServletRequest request);
	//AbcRangeAnalysys master search by ID
	public List<AbcAnalysisMasterDto> searchByAbcRangeAnalysisId(Integer id,HttpServletRequest request);
	//AbcRangeAnalysys auto fill search
	public AbcAnalysisMasterDto autoSuggestionsOnAbcRangeAnalysisId(Integer id);
	//to fetch the hospital state
	int fetchHospitalState(HttpServletRequest request);
	
	public int saveDocumentMaster(DocumentMasterDto documentMasterDto, HttpServletRequest request);
	public List<DocumentMasterDto> getAllDocumentMaster(HttpServletRequest request,Integer unitId);
	public DocumentMasterDto editDocumentMaster(Integer documentId);
	public boolean deleteDocumentMaster(Integer documentId,HttpServletRequest request);
	DocumentMasterDto inventoryDocumentAutoSuggestion(String documentName,String callFrom);
	public DocumentMasterDto getAllDocumentById(Integer documentId);
	
	public int saveDocNumberMaster(InventoryDocumentNumberMDTO invnumObj,HttpServletRequest request);
	public List<InventoryDocumentNumberMDTO> getAllInventoryNUmberDoc(HttpServletRequest request,Integer unitId);
	public InventoryDocumentNumberMDTO editInventoryDocNumber(Integer docId);
	public boolean deleteInventoryNumberDoc(Integer folderId, HttpServletRequest request);
	
	public int saveTaxMaster(InventoryTaxSetUpMDTO invnumObj,HttpServletRequest request);
	public List<InventoryTaxSetUpMDTO> getAllInventoryTaxDoc(HttpServletRequest request,Integer unitId);
	public InventoryTaxSetUpMDTO editInventoryTaxDoc(Integer taxId);
	public boolean deleteInventoryTaxDoc(Integer taxId, HttpServletRequest request);
	public List<InventoryTaxSetUpMDTO> getAllInventoryTaxMasterAutosuggestion(String hsnName);

	
	public int saveCategoryMaster(CategoryDTOM catObj,HttpServletRequest request);
	public List<CategoryDTOM> getAllInventoryCategoryDoc(HttpServletRequest request,Integer unitId);
	public CategoryDTOM editInventoryCategoryDoc(Integer catId);
	public boolean deleteInventoryCategoryDoc(Integer catId, HttpServletRequest request);
	public List<CategoryDTOM> getAllInventoryCategoryMasterAutosuggestion(String categoryName);

	
	public int saveFormMaster(FormDTOM formObj,HttpServletRequest request);
	public List<FormDTOM> getAllInventoryFormDoc(HttpServletRequest request,Integer unitId);
	public FormDTOM editInventoryFormDoc(Integer formId);
	public boolean deleteInventoryFormDoc(Integer formId, HttpServletRequest request);
	public List<FormDTOM> getAllInventoryformMasterAutosuggestion(String formType);

	
	public int saveManufacturerMaster(ManufacturerMDTO mObj,HttpServletRequest request);
	public List<ManufacturerMDTO> getAllInventoryManufactureDoc(HttpServletRequest request,Integer unitId);
	public ManufacturerMDTO editInventoryManufactureDoc(Integer mId);
	public boolean deleteInventoryManufactureDoc(Integer mId, HttpServletRequest request);
	public List<ManufacturerMDTO> getAllInventoryManufactureMasterAutosuggestion(String manufName);

	
	public int saveChargeMaster(ChargeMasterDTO cObj,HttpServletRequest request);
	public List<ChargeMasterDTO> getAllInventoryChargeMaster(Integer unitId);
	public ChargeMasterDTO editInventoryChargeMaster(Integer chargeId);
	public boolean deleteInventoryChargeMaster(Integer chargeId, HttpServletRequest request);
	public InventoryDocumentNumberMDTO inventoryDocumentNumberAutoSuggestion(String docName);

	public List<ChargeMasterDTO> getAllInventoryChargeMasterAutosuggestion(String chargeName,Integer unitId);
	
	public int saveUnitMaster(UnitMasterDTONew uObj,HttpServletRequest request);
	public List<UnitMasterDTONew> getAllInventoryUnitMaster(Integer unitId);
	public UnitMasterDTONew editInventoryUnitMaster(Integer uniId);
	public boolean deleteInventoryUnitMaster(Integer uniId, HttpServletRequest request);
	public List<UnitMasterDTONew> getAllInventoryUnitMasterAutosuggestion(String unitName);
	
	public int saveTermAndConditionMaster(TermsAndCondtionDTO tObj,HttpServletRequest request);
	public List<TermsAndCondtionDTO> getAllInventoryTermAndConditionMaster(Integer unitId);
	public TermsAndCondtionDTO editInventoryTermAndConditionMaster(Integer termconditionId);
	public boolean deleteInventoryTermAndConditionMaster(Integer termconditionId, HttpServletRequest request);
	public List<TermsAndCondtionDTO> getAllInventoryTermAndConditionMasterAutosuggestion(String headingName);
	
	public int saveHospitalDetails(HospitalDetailsDto hospitalDetailsDto, HttpServletRequest request);
	public List<HospitalDetailsDto> getAllHospitalDetails(HttpServletRequest request);
	public HospitalDetailsDto editHospitalDetails(Integer hospitalId);
	public boolean deleteHospitalDetails(Integer hospitalId,HttpServletRequest request);
	public HospitalDetailsDto hospitalDetailsAutoSuggestion(String hospitalName,String callFrom);
	public HospitalDetailsDto getAllHospitalDetailsById(Integer hospitalId);
	
	public int saveCompanyMaster(CompanyMasterDTO cObj,HttpServletRequest request);
	public List<CompanyMasterDTO> getAllInventoryCompanyMaster();
	public CompanyMasterDTO editInventoryCompanyMaster(Integer companyId);
	public boolean deleteInventoryCompanyMaster(Integer companyId, HttpServletRequest request);
	public List<CompanyMasterDTO> getAllInventoryComapnyMasterAutosuggestion(String companyName);
	
	 public List<district_taluka_city> getAllStateMaster(HttpServletRequest request);
	 public List<district_taluka_city> getAllDistrictByStateId(Integer stateId);
	 public List<district_taluka_city> getAllTalukaBydDistictId(Integer districtId);
	 public List<district_taluka_city> getAllCityByTalukaId(Integer talukaId);
	 
	 
	 public  List<FinancialYearDto> inventoryFinancialYearAutoSuggestion(String year);
	 public int saveSanctionMaster(SactionFormDTO sanctionobj,HttpServletRequest request);
	public List<SactionFormDTO> getAllSanctionMaster(HttpServletRequest request,Integer unitId);
	
	public SactionFormDTO editSactionMaster(Integer sanctionId);
	//warehouse master delete records
	public boolean deleteSactionMaster(Integer sanctionId, HttpServletRequest request);
	
	public Integer getPageCountAllSubinventoryMaster();
	
	//to get subinventory master pagination
	public SubInventoryMasterDto getSubInventoryMasterPagination(Integer startIndex);
	
	public PartyMasterDto getPartyMasterPagination(Integer startIndex);
	
	//maintenance contract master save or update
	public int saveorUpdateMaintenanceContractMaster(MaintenanceContractMasterDto maintenanceContractMasterDto,HttpServletRequest request);
	//maintenance contract master get all records
	public List<MaintenanceContractMasterDto> getAllMaintenanceContractMasterRecords(HttpServletRequest request,Integer unitId);
	//maintenance contract master edit records
	public MaintenanceContractMasterDto editMaintenanceContractMaster(Integer id);
	//maintenance contract master delete records
	public boolean deleteMaintenanceContractMaster(Integer id, HttpServletRequest request);

	public List<SubInventoryMasterDto> fetchSubInventoryNew(String subInventoryName, String isEdit);
	
	Integer getSubInventoryStockRecord(Integer id);
			
}
