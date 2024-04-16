package com.hms.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.transaction.annotation.Transactional;

import com.hms.constants.TableName;
import com.hms.dto.CategoryDTO;
import com.hms.dto.DocumentDTO;
import com.hms.dto.EnquiryMaster;
import com.hms.dto.FetchConsumptionSalevsDetailsDTO;
import com.hms.dto.FillRequirementDTO;
import com.hms.dto.FormDTO;
import com.hms.dto.GINComponant;
import com.hms.dto.GINMaster;
import com.hms.dto.GRNComponant;
import com.hms.dto.GRNMaster;
import com.hms.dto.Hall;
import com.hms.dto.IngredientDTO;
import com.hms.dto.InvAbcRangeAnalsysDTO;
import com.hms.dto.InvHospitalDetailDTO;
import com.hms.dto.InvOpenigStkMasterDTO;
import com.hms.dto.InvPartyContDTO;
import com.hms.dto.InvSanPowerDTO;
import com.hms.dto.InvStokTransfrtoCentrDto;
import com.hms.dto.InventoryBatchStockAvalaibleStock;
import com.hms.dto.InventoryBatchStockDTO;
import com.hms.dto.InventoryConsumptionMasterDTO;
import com.hms.dto.InventoryDocAndDocNoAndFinYearDTO;
import com.hms.dto.InventoryDocumentNumberDTO;
import com.hms.dto.InventoryEnquiryItemSlaveDTO;
import com.hms.dto.InventoryEnquiryMasterDTO;
import com.hms.dto.InventoryFetchPateintNameDTO;
import com.hms.dto.InventoryFinancialYearDTO;
import com.hms.dto.InventoryGRNItemDTO;
import com.hms.dto.InventoryGRNMasterDTO;
import com.hms.dto.InventoryItemMasterDTO;
import com.hms.dto.InventoryItemMasterItemGroupDTO;
import com.hms.dto.InventoryItemMasterItemTypeDTO;
import com.hms.dto.InventoryItemOtherDetailsDTO;
import com.hms.dto.InventoryItemPartyDetailsDTO;
import com.hms.dto.InventoryItemPurchaseDTO;
import com.hms.dto.InventoryItemSaleDTO;
import com.hms.dto.InventoryItemUniqueIdendification;
import com.hms.dto.InventoryItemWareHouseDTO;
import com.hms.dto.InventoryMRNStockDTO;
import com.hms.dto.InventoryMaterialRequestNoteItemInfoSlaveDTO;
import com.hms.dto.InventoryMaterialRequestNoteMasterDTO;
import com.hms.dto.InventoryPartyMasterAddressInfoDTO;
import com.hms.dto.InventoryPartyMasterContactInfoDTO;
import com.hms.dto.InventoryPartyMasterDTO;
import com.hms.dto.InventoryPartyMasterGeneralInfoDTO;
import com.hms.dto.InventoryPartyMasterOtherInfoDTO;
import com.hms.dto.InventoryPartyMasterPaymentInfoDTO;
import com.hms.dto.InventoryPurInvoicePaymentDTO;
import com.hms.dto.InventoryPurchaseCommonItemMaster;
import com.hms.dto.InventoryPurchaseCommonMaster;
import com.hms.dto.InventoryPurchaseInvoiceItemMasterDTO;
import com.hms.dto.InventoryPurchaseInvoiceMasterDTO;
import com.hms.dto.InventoryPurchaseOrderItemMaster;
import com.hms.dto.InventoryPurchaseOrderMaster;
import com.hms.dto.InventoryPurchaseReturnMasterDTO;
import com.hms.dto.InventoryPurchaseReurnItemMasterDTO;
import com.hms.dto.InventoryTaxSetUpDTO;
import com.hms.dto.InventoryitempurchaseandItemMasterDTO;
import com.hms.dto.InventroySubContractingMaterialIssueMasterDTO;
import com.hms.dto.InventroySubContractingMaterialIssueSlaveDTO;
import com.hms.dto.ItemMaster;
import com.hms.dto.MaintainanceMachineDTO;
import com.hms.dto.ManufacturerDTO;
import com.hms.dto.POrderMaster;
import com.hms.dto.PackingDTO;
import com.hms.dto.Product;
import com.hms.dto.ProductDTO;
import com.hms.dto.RequirementDTO;
import com.hms.dto.StockAdjustment;
import com.hms.dto.StockAdjustmentMaster;
import com.hms.dto.StockCardDTO;
import com.hms.dto.StockDTO;
import com.hms.dto.SubInventoryDTO;
import com.hms.dto.TemplateMasterDTO;
import com.hms.dto.TemplateRelationDTO;
import com.hms.dto.TrolleyDTO;
import com.hms.dto.TrolleyGRNMaster;
import com.hms.dto.UomDTO;
import com.hms.dto.UomRelationDTO;
import com.hms.dto.Users;
import com.hms.dto.VendorDTO;
import com.hms.dto.WarehouseDTO;
import com.hms.ehat.dto.BillDetailsIpdDto;
//import com.hms.dto.InventoryDocumentNumberDTO;

@Transactional
@SuppressWarnings("rawtypes")
public interface InventoryDAO {

	public List FetchItems();

	public int FetchStockId();
	
	
	public List<InventoryPurchaseCommonMaster> fetchAmtGRNDetails(int docNo);
	public boolean saveItems(float itemId, float avaQty, int userid);

	public boolean saveLabInventory(ItemMaster objItemMaster, int userid);

	public boolean saveCCUInventory(ItemMaster objItemMaster, int userid);

	public boolean saveOPDInventory(ItemMaster objItemMaster, int userid);

	public boolean saveStockAdj(String productId, String quantity,
			StockAdjustment stock, StockAdjustmentMaster stockMaster,
			int userid, String queryType, String batchCode, String expDate);

	public boolean deleteStockAdj(int stockMasterId, int userId);

	public boolean saveUomMaster(UomDTO objuomDTO);

	public boolean deleteUomMaster(UomDTO objuomDTO);

	public List<UomDTO> fetchUOMDetails(String uomId, String isEdit);

	public Integer getNextId(TableName tableName);

	public boolean saveVendorMaster(VendorDTO objVendorDTO);

	public List<VendorDTO> fetchVendorDetails(String vendorId, String isEdit);

	public boolean deleteVendorMaster(VendorDTO objVendorDTO);

	public boolean saveSubInventoryDetails(SubInventoryDTO objShelfDTO);
	public boolean SaveOTSubInventory(SubInventoryDTO objShelfDTO);

	public List<SubInventoryDTO> fetchSubInventoryDetail(String shelfIf, String isEdit);

	public boolean deleteShelfMaster(SubInventoryDTO objShelfDTO);

	public boolean saveCategoryMaster(CategoryDTO objCategoryDTO);

	public List<CategoryDTO> fetchCategoryDetails(String categoryId,
			String isEdit);

	public boolean deleteCategoryMaster(CategoryDTO objCategoryfDTO);

	public boolean saveFormMaster(FormDTO objFormDTO);

	public List<FormDTO> fetchFormDetails(String formId, String isEdit);

	public boolean deleteFormMaster(FormDTO objFormDTO);
	
	//husen
	public boolean deleteItemPurchaseRowDetails(InventoryItemPurchaseDTO objItemPurchaseDTO);
	
	//husen
	public boolean deleteItemSalesRowDetails(InventoryItemSaleDTO objItemSaleseDTO);
	//husen
	public boolean deletePartyContactsRowDetails(InventoryPartyMasterContactInfoDTO objpartycontactsDTO);
	//husen
	public boolean deletePartyaddressdetails(InventoryPartyMasterAddressInfoDTO objpartyaddressDTO);
	//husen
	public boolean deletePartyPaymentdetails(InventoryPartyMasterPaymentInfoDTO objpayment);
	//husen
	public boolean deletePartyGeneraldetails(InventoryPartyMasterGeneralInfoDTO objgeneral);
	//husen
	public List<InventoryItemPurchaseDTO> fetchPurchaseDetailsOnView(String masterId);
	//husen
	public List<InventoryItemSaleDTO> fetchSalesDetailsOnView(String masterId);

	
	
	public boolean saveManufacturerMaster(ManufacturerDTO objManufacturerDTO);
	public boolean saveWarehouseMaster(WarehouseDTO objWarehouseDTO);

	public List<ManufacturerDTO> fetchManufacturerDetails(
			String manufacturerid, String isEdit);
	
	public List<WarehouseDTO> fetchWarehouseDetail(String manufacturerid, String isEdit);
	public List<InventoryBatchStockAvalaibleStock> fetchBtachStockAllItems(String itemName, String itemId, String isEdit);
	
	public List<InventoryItemPurchaseDTO> fetchItemPurchaseDetails(String masterId,String itemPurchaseId, String isEdit);
	public List<InventoryItemSaleDTO> fetchItemSalesDetails(String masterId,String itemSalesId, String isEdit);

	
	//husen
	public List<InventoryPartyMasterContactInfoDTO> fetchPartyContactsDetails(String masterId,String itemSalesId, String isEdit);
	//husen
	public List<InventoryPartyMasterAddressInfoDTO> fetchPartyAddressDetails(String itemSalesId, String isEdit);
	//husen
	public List<InventoryPartyMasterPaymentInfoDTO> fetchPartyPaymentDetails(String id,String isEdit);
	//husen
	public List<InventoryPartyMasterGeneralInfoDTO> fetchPartyMasterGeneralDetails(String id,String isEdit);
	//husen
	public List<InventoryPartyMasterOtherInfoDTO> fetchPartyOtherInfoDetails(String id);
	
	public boolean deleteManufacturerMaster(ManufacturerDTO objManufacturerDTO);
	
	public boolean deleteWarehouseMaster(WarehouseDTO objWarehouserDTO);

	public int fetchEnquiryNo();

	public List fetchSearchedItems(String searchBy, String strValue);

	public List fetchStockAdj(String date);

	public List showStockAdj(String searchBy, String strValue);

	public List fetchDataForEdit(String voucherNo);

	public List fetchProductNames();

	public Product fetchProductDetails(int productId);

	public List fetchEnquiryProducts();

	public boolean saveEnquiry(String productId, String quantity,
			String vendors, String reqId, EnquiryMaster enqMaster, int userid,
			String queryType);

	public List<Hall> fetchHallIdDetails(String trolleytype);

	public boolean saveTrolleyMaster(TrolleyDTO objTrolleyDTO);

	public List<TrolleyDTO> fetchTrolleyDetails(String trolleyId, String isEdit);

	public boolean deleteTrolleyMaster(TrolleyDTO objTrolleyDTO);

	public boolean saveIngredientMaster(IngredientDTO objIngredientDTO);

	public List<IngredientDTO> fetchIngredientDetails(String ingredientid,
			String isEdit);

	public boolean deleteIngredientMaster(IngredientDTO objIngredientDTO);

	public boolean savePackingMaster(PackingDTO objPackingDTO);

	public List<PackingDTO> fetchPackingDetails(String packingid, String isEdit);

	public boolean deletePackingMaster(PackingDTO objPackingDTO);

	public List showEnquiry(String searchBy, String strValue);

	public List fetchDataForEnqEdit(String voucherNo);

	public int fetchOrderNo();

	public boolean saveTemplate(String productId, String quantity,
			TemplateMasterDTO objTemplateDTO);

	public List<TemplateMasterDTO> fetchTemplateDetails(String templateid,
			String isEdit);

	public boolean deleteTemplateMaster(TemplateMasterDTO objTemplateMasterDTO);

	public List fetchEnquiryItems(String enqNo);

	public boolean saveOrder(String productId, String quantity, String vendor,
			POrderMaster orderMaster, int userid, String queryType);

	public List showOrder(String searchBy, String strValue);

	public boolean saveProductMaster(ProductDTO objProductDTO,
			StockDTO objStockDTO);

	public List<ProductDTO> fetchProductDetails(String productid, String isEdit);

	public boolean deleteProductMaster(ProductDTO objProductDTO);

	public List fetchDataForOrderEdit(String PONo);

	public List fetchVendors(String searchBy, String strValue);

	public List fetchProducts(int id, String searchBy, String value);

	public List fetchReq(int id);

	public boolean deleteTemplateMedicine(TemplateRelationDTO objRelationDTO);

	public List<TemplateMasterDTO> fetchTemplateId();

	public List<Users> fetchUserId();

	public int SaveGRN(GRNMaster objGRNMaster, GRNComponant objGRNComponant,
			String queryType);

	public int SaveGIN(GINMaster objGINMaster, GINComponant objGINComponant,
			String queryType);

	public List<GRNMaster> fetchGRN();

	public List<GINMaster> fetchGIN();

	public boolean saveUomRelation(UomRelationDTO objUomRelationDTO);

	public List<FillRequirementDTO> fetchRequirementDetails(String trolleyid,
			String isEdit);

	public List<TrolleyDTO> featchTrollyGRN(String strValue, String type);

	public boolean saveRequirementMaster(RequirementDTO objRequirementDTO);

	public List<StockCardDTO> fetchStockCard(String seachBy, String value);

	public List fetchProductsForGRN(int grnId);

	public List fetchProductsForVGRN(int grnId);

	public boolean saveGRNTrolley(TrolleyGRNMaster tMaster, int userid,
			String query);

	public boolean deleteGRNGINComp(String callFrom, String allVals);

	public List<GRNComponant> GetPOComList(String poid);

	public List<GINComponant> GetReqComList(String grnNo);

	public boolean saveDocumentMaster(DocumentDTO objDocumentDTO);

	public List<DocumentDTO> fetchDocumentDetails(String docId, String isEdit);

	public boolean deleteDocumentMaster(DocumentDTO objDocumentfDTO);

	public List<InventoryTaxSetUpDTO> fetchTaxDetails(String docId,
			String isEdit);
	

	public boolean saveTaxMaster(InventoryTaxSetUpDTO objTaxDTO);

	public boolean saveFinancialYear(InventoryFinancialYearDTO objTFinDTO);

	public boolean deleteTaxMaster(InventoryTaxSetUpDTO objTaxfDTO);

	public List<InventoryFinancialYearDTO> fetchFinDetails(String docId,
			String isEdit);

	public List<InventoryDocAndDocNoAndFinYearDTO> fetchDocumentNumberDetails(
			String docNumberId, String isEdit);

	public boolean deleteDocumentNumberMaster(
			InventoryDocumentNumberDTO objDocumentNumberfDTO);

	public boolean saveDocumentNumberMaster(InventoryDocumentNumberDTO objDocumentNumberDTO);
	
	public boolean saveItemMasterPurchaseDetails(InventoryItemPurchaseDTO objItemPurcahseDTO);
	
	//husen
	public boolean savePartyMasterContactDetails(InventoryPartyMasterContactInfoDTO objPartyContactsDTO);
	//husen
	public boolean savePartyMasterAddressDetails(InventoryPartyMasterAddressInfoDTO objPartyAddressDTO);
	//husen
	public boolean savePartyMasterPaymentDetails(InventoryPartyMasterPaymentInfoDTO objPartypaymentDTO);	
	//husen
	public boolean savePartyMasterGeneralDetails(InventoryPartyMasterGeneralInfoDTO objPartygeneralDTO);
	
	public boolean saveItemMasterSalesDetails(InventoryItemSaleDTO objItemSalesDTO);
	
	public boolean deleteFinancialMaster(
			InventoryFinancialYearDTO objFinancialfDTO);

	public boolean saveItemMasterDetails(
			InventoryItemMasterDTO objItemMasternDTO,Integer machineId);

	public boolean savePartyMaster(InventoryPartyMasterDTO objPartyMasterDTO);

	public List<InventoryItemMasterDTO> fetchItemMasterDetails(
			String parameter, String parameter2);
	
	public List<InventoryItemMasterDTO> searchItemMasterDetails(
			String parameter, String parameter2);
	
	public List<InventoryPartyMasterDTO> searchPartyMasterDetails(
			String parameter, String parameter2);
	
	public List<InventoryItemPurchaseDTO> fetchItemMasterPurchaseDetails(
			String parameter, String parameter2);

	public List<InventoryItemSaleDTO> fetchItemMasterSalesDetails(
			String parameter, String parameter2);
	
	public List<InventoryItemWareHouseDTO> fetchItemMasterWarehouseDetails(
			String parameter, String parameter2);

	public List<InventoryItemOtherDetailsDTO> fetchItemMasterOtherDetails(
			String parameter, String parameter2);


	public boolean deleteItemMasterDetails(
			InventoryItemMasterDTO objItemMasterfDTO);

	public List<InventoryPartyMasterDTO> fetchPartyMasterDetails(
			String partyMasterId, String isEdit);
 
	public List<InventoryPartyMasterContactInfoDTO> fetchPartyMasterContactInfoDetails(
			String partyMasterId, String isEdit);

	public List<InventoryItemMasterItemGroupDTO> fetchItemMasterTypeGroupDetails();

	public List<InventoryItemMasterItemTypeDTO> fetchItemMasterItemTypepDetails();

	public List<InventoryPartyMasterDTO> fetchItemMasterPartyDetails();

	public List<InventoryPartyMasterAddressInfoDTO> fetchPartyMasterAddressInfoDetails(
			String partyMasterId, String tableName);

	public List<InventoryPartyMasterPaymentInfoDTO> fetchPartyMasterPaymentInfoDetails(
			String partyMasterId, String tableName);

	public List<InventoryPartyMasterOtherInfoDTO> fetchPartyMasterOtherInfoDetails(
			String partyMasterId, String tableName);

	public boolean deletePartyMaster(InventoryPartyMasterDTO objPartyMasterfDTO);

	public List<InventoryItemPartyDetailsDTO> fetchPartyMasterRelastedPartyDetails(
			String parameter, String parameter2);

	public List<InventoryMaterialRequestNoteMasterDTO> fetchMaterialRequestNoteDetails(
			String parameter, String parameter2,String mrnId);
	
	/* ****************************Featch  consumption master Details Date :2:09:2015 Author :Sudhir *******************************************/
	public List<InventoryConsumptionMasterDTO> featchConsumtionMasterDetails(String parameter, String parameter2,String mrnId,String typeOfpatient);
	
	public List<InventoryMaterialRequestNoteMasterDTO> fetchMaterialRequestNoteDetailsinPurReqList( String parameter1,
			  String parameter2 );
	
	public List<InventoryMaterialRequestNoteMasterDTO> fetchMaterialRequestNoteDetailsRecieved(
			String parameter, String parameter2,String parameter3);
	
	public List<InventoryMRNStockDTO> fetchMaterialRequestNoteDetailsStock(
			String parameter, String parameter2,String parameter3);
	
	
	public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> fetchMaterialRequestNoteStockDetailsForSubInventory(
			String parameter, String parameter2,String parameter3);
	
	/***********************featch subinventory  Available stock Details form mrn slave 20:8:2015 ***************/
	public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> fetchMaterialRequestNoteStockDetailsForSubInventoryAvailableStock(
			String parameter, String parameter2,String parameter3);
	
	public List<InventoryMaterialRequestNoteMasterDTO> fetchStockDetailsByWardName(String parameter, String parameter2);

	//  new subcontracting material issue 
	
	boolean saveSubContractingMaterialIssueMaster(
			InventroySubContractingMaterialIssueMasterDTO inventroySubContractingMaterialIssueMasterDTO);
		
	public List<InventroySubContractingMaterialIssueMasterDTO> fetchSubContractingMaterialIssueMasteDetails(
			String txtSubContractingMaterialIssueDocNo, String isEdit);
	
	public boolean deleteSubContractingMaterialIssue(
			InventroySubContractingMaterialIssueMasterDTO inventroySubContractingMaterialIssueMasterDTO);
			
	public List<InventroySubContractingMaterialIssueSlaveDTO> getDynamicSubContractingSlavesData(int txtSubContractingMaterialIssueDocNo,String isEdit);
	
	//new store material request note list
	
	
	public boolean createPurchaseRequestlist(
			InventoryMaterialRequestNoteMasterDTO inventoryMasterRequestnote);
	
	/***************************** save Consumption Date:24:8:2015 Author:sudhir *****************************/
	//@Transactional
	public boolean saveConsumptionDetails(InventoryConsumptionMasterDTO  inventoryConsumptionMasterDTO ,BillDetailsIpdDto billDetailsIpdDto);
	
	
	//  New Matriail Request Note
	
	public List<InventoryItemSaleDTO> fetchItemSalesDetail(String name,String isId);
	
	public boolean saveInventoryMaterialRequestNote(
			InventoryMaterialRequestNoteMasterDTO inventoryMaterialRequestNoteMasterDTO);
	
	public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> getMaterialRequestNoteSlaveDetails(
			int txtmaterialReqaestNoteDocId, String isEdit);
	
	public List<FetchConsumptionSalevsDetailsDTO> fetchConsumptionSalevsDetails(int conId, String isEdit);
	
	public boolean issueMrnstausDispatch(
			InventoryMaterialRequestNoteMasterDTO inventoryMasterRequestnote);
	
	public boolean deleteMaterialRequestNotemasterDetails(
			InventoryMaterialRequestNoteMasterDTO inventoryMasterRequestnote);

    //husen
	public List<InventoryPartyMasterDTO> fetchVendorNameDetails(String name);
    //husen
	public List<FormDTO> fetchFormNameDetails(String name);
	//husen
	public List<CategoryDTO> fetchCategoryNameDetails(String name);
	
	public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> fetchMaterialRequestNoteSlaveDetails(
			String parameter, String parameter2);
	
	
	public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> fetchMaterialRequestNoteSlaveDetailsforGoodsReceipt(
			String parameter, String parameter2);

	public boolean savePurchaseCommonMaster(
			InventoryPurchaseCommonMaster inventoryPurchaseCommonMasterDTO);
	
	public boolean savePurchaseOrderMaster(
			 InventoryPurchaseOrderMaster inventoryPurchaseOrderMasterDTO);

	public boolean savePurchaseOrderMaster2(
			InventoryPurchaseOrderMaster inventoryPurchaseOrderMasterDTO);
	
	public List<InventoryPurchaseCommonMaster> fetchPurchaseQuotationCommon(
			String parameter, String parameter2);
	
	public List<InventoryPurchaseCommonItemMaster> fetchPurchaseQuotationCommonItemDetails(
			String parameter, String parameter2);
	public List<InventoryMaterialRequestNoteMasterDTO> fetchMaterialRequestNoteDetailsforMRNAll(
			String parameter1, String parameter2);
	
	//purchase order
	public List<InventoryPurchaseOrderMaster> fetchPurchaseOrderCommon(
			String parameter, String parameter2,String VendorName);
	
	public boolean deletePurchaseOrderFormDetail(
			 InventoryPurchaseOrderMaster objPurchaseCommonMasterfDTO);
	
	public List<InventoryPurchaseOrderItemMaster> featchPurchaseOrderItemDetails(
			String parameter, String parameter2);
	
	public List<InventoryPurchaseOrderMaster> fetchtermsandconditionsDetailsforOrder(String parameter);
	
	
	public List<InventoryPurchaseOrderMaster> fetchPendingOrder();
	
	public List<InventoryPurchaseCommonMaster> fetchPurchaseQuotationCommonSearch(
			String parameter, String parameter2,String parameter3);

	public boolean deletePurchaseCommonFormDetail(
			InventoryPurchaseCommonMaster objPurchaseCommonMasterfDTO);

	public List<InventoryItemMasterDTO> fetchItemNameDetails(String name,String isId);

	public List<InventoryPurchaseCommonMaster> fetchPendingPurchaseQuotationCommon();

	public boolean createPurchaseQuotation(
			InventoryMaterialRequestNoteMasterDTO inventoryMasterRequestnote);
	public List<SubInventoryDTO> fetchLocationAndNameAutosuggtt(String parameter,String parameter2);
	public List<SubInventoryDTO> getMRNLocatonfromName(String parameter,String parameter2);
	
	/******************featch Dispenced to form user Table for Autosuggetion Date:21:8:2015 Author:sudhir ***********************/
	public List<Users> fetchDispensedNameAutoSuggest(String parameter,String parameter2);
	
	/******************featch patient to form user Table for Autosuggetion Date:21:8:2015 Author:sudhir ***********************/
	public List<InventoryFetchPateintNameDTO> fetchPatientNameAutoSuggest(String patientName,String typeOfpatient,String isEdit);
	
	
	public List<InventoryFetchPateintNameDTO> fetchPharmaPatientNameAutoSuggest(String patientName,String typeOfpatient,String isEdit);
	public List<WarehouseDTO> getWarehouseLocation(String parameter);
	
	// new goods Issue  
	
	/**********************************materail available list************************************/
	public List<InventoryBatchStockDTO> fetchMRNItemAvailable(
			String parameter);
	/******************************** Get SubInventory Avaliable Stock Details for Consumption  Author :Sudhir  Date:18:8:2015 ******************/
	public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> getSubInventoryAvaliableStockDetailsforConsumption(String SubInventoryName,String ItemName,String ItemCode);
	
	/*** * update Sub Inventory Item Stock Qty Partial Mrn  @Author :Sudhir  @Date:3:feb:2016 *****/
	public String updateSubInvStockQtyPartialMRN(String txtMrnItemSlaveId,String txtMrnId);
	
	
	public boolean saveGoodsIssue(
			InventoryMaterialRequestNoteMasterDTO inventoryMaterialRequestNoteMasterDTO);

	/**********************************update batch stock total quantity************************************/
	public boolean updateBatchStockQtyDetails(
			InventoryBatchStockDTO batchDTO);
	
	/******************************** Update SubInventory   Avaliable Stock Details for Consumption  Author :Sudhir  Date:19:8:2015 ******************/
	public boolean updateSubInventoryStockQtyDetails(
			InventoryMaterialRequestNoteItemInfoSlaveDTO ltInventoryMaterialRequestNoteItemInfoSlaveDTO);
/*
	public List<InventoryMaterialRequestNoteMasterDTO> fetchMaterialRequestNoteDetails(
			String parameter);

	*/
	
	
	//************************************purchase request List*******************************
	public List<InventoryitempurchaseandItemMasterDTO> fetchItempurchaseDetailsAndItemMaster(
			String name, String isId);
	
	
	/**********************************************Goods Recived Note***************************/
	public boolean saveGRNDetails(InventoryPurchaseCommonMaster inventoryPurchaseCommonMasterDTO);
	public List<InventoryGRNMasterDTO> fetchGRNMasterDetails(String parameter, String parameter2,String parameter3,String InvoiceNumber);
	public List<InventoryGRNItemDTO> fetchGRNBatchStocDetails(String parameter1, String parameter2);
	public boolean deleteGRNFormDetail(InventoryPurchaseCommonMaster objPurchaseCommonMasterfDTO);
	
	public List<InventoryPurchaseCommonMaster> fetchtermsandconditionsDetailsforGrn(String parameter);
	
	public List<InventoryGRNMasterDTO> fetchPartialGRN();
	
	/****************************************PUrchase Invoice************************************************/
	public List<InventoryGRNMasterDTO> fetchPendingGRNforPurInvoice();
	public boolean savePurchaseInvoiceDetails(InventoryPurchaseCommonMaster inventoryPurchaseCommonMasterDTO);
	public boolean savePurchaseInvoicePaymentDetails(InventoryPurInvoicePaymentDTO inventoryPurInvoicePaymentDTO);
	public List<InventoryPurchaseInvoiceMasterDTO> fetchPurchaseInvoiceMasterDetails(String parameter1, String parameter2, String VendorName);
	public List<InventoryPurchaseInvoiceItemMasterDTO> fetchPurInvoiceItemDetails(String parameter1, String parameter2);
	
	public List<InventoryPurchaseInvoiceMasterDTO> fetchtermsandconditionsDetails(String parameter1);
	
	public List<InventoryPurInvoicePaymentDTO> fetchPurInvoicePaymentDetails(String parameter1, String parameter2);
	
	/******************************************** purchase Return *******************************************/
	public List<InventoryPurchaseInvoiceMasterDTO> fetchPendPurInvoiceforPurReturn();
	public boolean savePurchaseReturnDetails(InventoryPurchaseCommonMaster inventoryPurchaseCommonMasterDTO);
	public List<InventoryPurchaseReturnMasterDTO> fetchPurchaseReturnMasterDetails(String parameter1, String parameter2,String vendorName);
	public List<InventoryPurchaseReurnItemMasterDTO> fetchPurReturnItemDetails(String parameter1, String parameter2);
	public List<InventoryPurchaseReturnMasterDTO> fetchtermsandconditionsDetailsforReturn(String parameter1);
	
	
	/*****************************************fetch mfg names auto suggest*****husen******************************************/
	public List<ManufacturerDTO> fetchMfgNamesAutoSuggest(String name);
	/*****************************************fetch UOM names auto suggest******husen*****************************************/
	public List<UomDTO> fetchUOMNamesAutoSuggest(String name);
	/*****************************************fetch item name auto suggest ward request******husen*****************************************/
	public List<InventoryItemMasterDTO> fetchItemNamesAutoSuggest(String name);
	/*****************************************fetch warehouse names auto suggest*************husen**********************************/
	public List<WarehouseDTO> fetchWarehouseNamesAutoSugg(String name);
	/*****************************************fetch party  names auto suggest*********husen**************************************/
	public List<InventoryPartyMasterDTO> fetchPartyNamesAutoSuggest(String name);

	/************************************** Inventory Goods Receipt *********************************/
	public List<InventoryMaterialRequestNoteMasterDTO> fetchMaterialRequestNoteDetailsGoodsReceipt(
			String parameter1, String parameter2);
	/******************************* Auto suggeton for item tax code Author: sudhir Date :26:6:2015 ***********************************/
	public List<String> fetchItemTaxCode(String name, String isId);

	public List<InventoryItemMasterDTO> fetchAssetsDetails();

	/********************** Reports for Inventory Date :1/10/2015  Author :Sudhir***************/
	public List<InventoryItemMasterDTO> categoryWiseItemReportDetails(String parameter, String parameter2);
	public List<InventoryItemMasterDTO> categoryWiseItemDetailslReport(String parameter, String parameter2,String parameter3);
	public String getCategoryDataByCategoryName(String parameter, String parameter2,String parameter3 ,HttpServletRequest request);
	public List<CategoryDTO> fetchCategoryNameForAutoComplete(String name);
	public String featchItemsListBYCategoryName(String parameter, String parameter2,String parameter3,HttpServletRequest request);
	public List<InventoryPurchaseOrderItemMaster> getItemPurchaseDataByCategoryName(String parameter,String parameter2,String parameter3);
	public String getPurchaseCategoryDataByItemName(String parameter, String parameter2,String parameter3 ,String parameter4, HttpServletRequest request);
	public List<InventoryBatchStockAvalaibleStock>getCategoryWiseItemStockByItemNameandId(String parameter,String parameter2,String parameter3,String ItemId);
	public String getStockCategoryDataByItemNameandId(String parameter,	String parameter2, String parameter3, int parameter4,HttpServletRequest request);
	
	public List<InventoryItemMasterDTO> getPurchaseCompanyList(String parameter, String parameter2);
	public List<InventoryPurchaseOrderItemMaster> getpurchaseItemsDetailsByCompanyName(String parameter, String parameter2, int parameter4, String  parameter5);
	public String getCompanyDataByCompanyNameandId(String parameter, String parameter2, int parameter3, String parameter4  ,HttpServletRequest request);
	
	public String getDocumentMasterReport(String parameter, String parameter2 , String masterName  ,HttpServletRequest request);
	public String getMrnCompleteReport(String parameter, String parameter2 , String masterName,String reportName ,HttpServletRequest request);
	
	/******************* Inventory Analysis Report Date :22:12:2015 Author:sudhir **************/
	public String getXYZAnalysisReport(String parameter, String parameter2 ,String reportName,HttpServletRequest request);
	/******************* End Inventory Analysis Report Date :22:12:2015 Author:sudhir **************/
	
	/******************************* fetch Items Current Stock of Subinventory and Main Stock Author: sudhir Date :15:1:2016 ***********************************/
	public  String fetchItemsCurrentStockofSubinventoryandMainStock(String itemId, String subInventoryName,String isEdit);
	/************ get doc id for Authtication Author sudhir Date 18 jan 2016**********/
	public String getDocId(String userName, String password);
	/************ End get doc id for Authtication Author sudhir Date 18 jan 2016**********/
	/************save Mrn Approved Level for Authtication Author sudhir Date 18 jan 2016**********/
	String saveMrnApprovedLevel(String userName, String password, String MrnId,
			String ApprovedStatus, String docId);
	/************ End save Mrn Approved Level for Authtication Author sudhir Date 18 jan 2016**********/
	/****  for Abc Analysis Range Master @Date:11/feb/2016 @Author:Sudhir***/
	public boolean saveABCRangeDetails(InvAbcRangeAnalsysDTO objInvAbcRangeAnalsysDTO);
	public List<InvAbcRangeAnalsysDTO> fetchAbcAnalysisRangDetails(String txtABCId,	String isEdit);
	
	/********************* get Supplier Wise Invoice Listing Report Author:sudhir Date:01/3/2015 ***********/
	public String getSupplierWiseInvoiceListingReport(String parameter, String parameter2,String supplyerId,String txtSupplierName,String reportName, HttpServletRequest request);
	/****  End for Abc Analysis Range Master @Date:11/feb/2016 @Author:Sudhir***/

	/********************@author husenbadshah**@since 3/3/2016***profit calculate**********/
	public Double calculateProfitOfItem(String parameter);
	
	/*******@author husenbadshah**@since 13/4/2016***get all subinventory**********/
	public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> getAllSubInventory(String edit);
	
/*	public List<InventoryItemMasterDTO> fetchAssetsViewDetails();*/

	public List<InventoryItemUniqueIdendification> fetchitemUniqueIdentificationDetails(
			String parameter, String parameter2);
	/*@Author : Sudhir Jadhav Charges Master saveChargesDetail @Date:4jully2016*/
	public boolean saveChargesDetails(CategoryDTO objCategoryDTO);
	public List<CategoryDTO> fetchChargesDetail(String categoryId,String isEdit);
	/****Hospital Details For Inventory @author sudhir @date 05 Aug 2016 ******/
	public boolean saveHospitalDetails(InvHospitalDetailDTO ltHospitalDetailDTO);
	public List<InvHospitalDetailDTO> fetchHospitalDetail(String Id,String isEdit);
	
	  /****Terms and Condition Master@author Sudhir jadhav @Date:8/8/2016 ******/
	public boolean saveTermsandConditionsMaster(InvHospitalDetailDTO ltHospitalDetailDTO);
	public List<InvHospitalDetailDTO> fetchtermsandConditionsDetail(String Id,String isEdit);
	
	/***** save Openig Stock 22/08/2018 @author Sudhir jadhav ******/ 
	public boolean saveOpenigStockDetails(InvOpenigStkMasterDTO inOpnigStock);
	
	/***** fetch Openig Stock Details 29/08/2016 @author Sudhir jadhav ******/
	public List<InventoryPurchaseOrderItemMaster> fetchOpenigStockDetails(
			String parameter, String parameter2);
	
	/***** save closing  Stock 26/08/2018 @author Sudhir jadhav ******/ 
	public boolean saveClosingStockDetails(InvOpenigStkMasterDTO inOpnigStock);
	
	
	/***** fetch closing Stock Details 29/08/2016 @author Sudhir jadhav ******/
	public List<InventoryPurchaseOrderItemMaster> fetchClosingStockDetails(
			String parameter, String parameter2);
	
	/***** save Enquiry Master 22/09/2016 @author Vinod Udawant ******/ 
	public boolean SaveEnquiryMaster(InventoryEnquiryMasterDTO objInvEnqMstDTO);
	
	
	/***** Fetch Enquiry Master 23/09/2016 @author Vinod Udawant ******/ 
	public List<InventoryEnquiryMasterDTO> fetchPurchaseEnquiryMaster(String parameter, String parameter2);
	
	/***** Fetch Enquiry Item Slave 23/09/2016 @author Vinod Udawant ******/ 
	public List<InventoryEnquiryItemSlaveDTO> fetchPurchaseEnquiryItemSlave(String parameter, String parameter2);
	
	/***** Delete Purchase Enquiry 26/09/2016 @author Vinod Udawant ******/ 
	public boolean deletePurchaseEnquiryMaster(InventoryEnquiryMasterDTO objInvEnqMstDTO);

	/***** Fetch Purchase Quotation  12/10/2016 @author kalpesh ******/ 
	public List<InventoryPurchaseCommonMaster> fetchTermsandConditionsDetailsForQutation(
			String parameter1);
	
	/**** save Grn Approved Level Author sudhir Date 28oct2016********/
	String saveGrnApprovedLevel(String userName, String password, String GrnId,
			String ApprovedStatus, String docId,String currentuserName,String currentUserID);
	/******save Grn Approved Level Author sudhir Date 28oct2016*****/

	/*****save mrn return @author paras @date:11 nov 2016*******/
	public boolean saveMrnReturn(
			InventoryMaterialRequestNoteMasterDTO inventoryMRNReturnItemInfoSlaveDTO);
	/****save mrn return @author paras @date:11 nov 2016********/
	
	/****
	@Author : Sudhir Jadhav 
	@Date   : 27jan2016
	@Code   : This Auto Suggestion function For Geting Item Name for Mrn Genration for Assest Transfer ***/
	public List<InventoryItemMasterDTO> fetchAstItemstoTrnfr(String name);
	
/****END
@Author : Sudhir Jadhav 
@Date   : 27jan2016
@Code   : This Auto Suggestion function For Geting Item Name for Mrn Genration for Assest Transfer ***/
public  String fetchSubInvItemStck(String itemId, String subInventoryName,String isEdit);
/**** 
@Author : Sudhir Jadhav 
@Date   : 27jan2016
@Code   : This Auto Suggestion function For Geting Item Name for Mrn Genration for Assest Transfer ***/

/***  
@Author : Sudhir Jadhav 
@Date   : 1feb2016
@Code   : This function is used for saving assest mrn details **/
public boolean saveInvAsstMrn(InventoryMaterialRequestNoteMasterDTO inventoryMaterialRequestNoteMasterDTO);
/*** 
@Author : Sudhir Jadhav 
@Date   : 6feb2017
@Code   : This function is used to fetch Mrn Id to Issue Assest Item to Sub Store to SubStore **/
public List<InventoryMaterialRequestNoteMasterDTO> fetchMrnIdToIsueToSubstr(String parameter, String parameter2);
/*** 
@Author : Sudhir Jadhav 
@Date   : 6feb2017
@Code   : This function is used to fetch Mrn Id to Issue Assest Item to Sub Store to SubStore **/
/*@Code: This Function is Used for fetch Grn Details for Advanced Search  
* @Author:Sudhir
* @Date:8Feb2016
*/

public List<InventoryGRNMasterDTO> fetchAdvancedSearchGrn(String calfor, String data);

/*@Code: This Function is Used for fetch Grn Details for Advanced Search  
* @Author:Sudhir
* @Date:8Feb2016
*/


public boolean deleteChargesMaster(InventoryDocumentNumberDTO objDocumentNumberfDTO);

public boolean deleteHospitalMaster(InventoryDocumentNumberDTO objDocumentNumberfDTO);

public boolean deleteTermAndConditionMaster(InventoryDocumentNumberDTO objDocumentNumberfDTO);


public void savePOOnClient();
//create multiple Purchase Request from store 10 march 2017
public boolean clubMulMrn(InventoryMaterialRequestNoteMasterDTO inventoryMasterRequestnote);
/* fetch multiple purchase request Details @Date :14march2017 */
public List<InventoryMaterialRequestNoteMasterDTO> getMulPurReqDetails(InventoryMaterialRequestNoteMasterDTO lt);

public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> getClubMrnSlaveDetails(int txtmaterialReqaestNoteDocId, String isEdit);

public InventoryPurchaseOrderMaster fetchPoDetailsForGRN(String txtpoId);

/***** @author vaibhav @code delete charges master date 21/03/2017  ******/ 
public boolean deleteChargesDeatail(CategoryDTO objCategoryDTO);

/***** @author vaibhav @code delete charges master date 22/03/2017  ******/ 
public boolean deleteHospitalDeatail(InvHospitalDetailDTO objInvHospitalDetailDTO);

/***** @author vaibhav @code delete Termcondition master date 22/03/2017  ******/ 
public boolean deleteTermsandConditionsMaster(InvHospitalDetailDTO objInvHospitalDetailDTO);
 
/***** @author vaibhav @code delete ABC master date 23/03/2017  ******/ 
public boolean deleteABCMaster(InvAbcRangeAnalsysDTO objInvAbcRangeAnalsysDTO);


/***** @author SUdhir @code validate Tin No date 09/05/2017  ******/ 
public String validatedTinNo(String tinNO,String callfor);

/***** @author SUdhir @code   @date 11/05/2017  ******/
public boolean saveConPrtyDetls(InvPartyContDTO ltDTO);

/***** @author SUdhir @code   @date 11/05/2017  @code fetch Party Cont Details ******/
public List<InvPartyContDTO> fetchPartyContDetails(String itemId, String partyContId,String isEdit);

/***** @author SUdhir @code   @date 13/05/2017  @code delete Party Cont Details ******/
public boolean deletItemParyCont(InvPartyContDTO ltDTo);

/***** @author SUdhir @code   @date 13/05/2017  @code Approve PO Items  ******/
public boolean approvPoItems(MaintainanceMachineDTO ltDTo);
/***** @author SUdhir @code : saveMulPo   @date 31/05/2017 ***/
public boolean saveMulPo(InventoryPurchaseOrderMaster inventoryPurchaseOrderMasterDTO);

/***** @author SUdhir @code : saveMulPo   @date 31/05/2017 ***/
public boolean saveStokTrans(InvStokTransfrtoCentrDto lt);


/***** @author SUdhir @code   @date 11/05/2017  @code fetch Party Cont Details ******/
public List<InvStokTransfrtoCentrDto> fetchStockTranfer(String stkId,String isEdit);

/***** @author SUdhir @code : saveMulPo   @date 31/05/2017 ***/
public boolean saveMrnReview(InventoryMaterialRequestNoteItemInfoSlaveDTO lt);
/*this function is used for reject the Mrn @Date 3jully 2017 @Author Sudhir  */
public boolean rejectMrn(String MrnId,String isEdit,String currtUName,String curUrId);
//this function is used for Saving Sanction  Power Detasils
public boolean saveSanPowDetails(InvSanPowerDTO lt);

/***** @author SUdhir @code   @date 11/05/2017  @code fetch sanction power Details ******/
public List<InvSanPowerDTO> fetchSanPowrDetails(String empId, String sanpowId,String isEdit);

/***** @author SUdhir @code : saveMulPo   @date 31/05/2017 ***/
public boolean saveMulPoProcess(InventoryPurchaseOrderMaster inventoryPurchaseOrderMasterDTO);

//purchase order Processing master Details @Date : 9jully2017 
public List<InventoryPurchaseOrderMaster> fetchPOProcsMstrDetls(String parameter, String parameter2,String VendorName);
	
//purchase order Processing slave Details @Date : 9jully2017
public List<InventoryPurchaseOrderItemMaster> fetchPOProcsSlaverDetls(String parameter, String parameter2);


//fetch last Purchase details for item while genrating Purchase Order @Date 9jully2017
public List<InventoryPurchaseCommonItemMaster> fetchlastPurItemDetails(String itemId);

/***** @author SUdhir @code : GRN to Mrn    @date  4 August 2017 ***/
public boolean saveGrnToMrn(InventoryPurchaseOrderMaster inventoryPurchaseOrderMasterDTO);

public List<InventoryGRNItemDTO> FetchGSTDetailsDAO(String parameter,
		String parameter2, String parameter3, String parameter4);

public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> fetchStockDetailsByWardNameReport(
		String parameter, String parameter2, String parameter3, String parameter4);

/***** @author Ajay @code : Autosugg to PAtient sale report    @date  8 August 2019 ***/
public List<InventoryFetchPateintNameDTO> fetchPharmaPateintNameReportAutosugg(String patientName,String typeOfpatient,String isEdit);

}