package com.hms.constants;

public class HMSConstants {

	// Database Variables
	public static final String DRIVERNAME = "com.mysql.jdbc.Driver";
	public static final String DATABASENAME = "ehatenterprise_16_jan";
	public static final String DATABASEUSER = "root";
	public static final String DATABASEPASSWORD = "root";
	//public static final String DATABASEPASSWORD = "ph@1415@123";//pioneer
	//public static final String DATABASEHost = "192.168.1.192";
	public static final String DATABASEHost = "localhost";
	public static final String URL = "jdbc:mysql://"
			+ DATABASEHost
			+ ":3306/"
			+ DATABASENAME
			+ "?characterSetResults=UTF-8&characterEncoding=UTF-8&useUnicode=yes";

	/************************ Start AppointmentConstant ********************/
	public static final String urlAllocateAppointment = "AllocateAppointment";
	public static final String btnSaveAppointmentAdd = "SaveAppointmentAdd";
	public static final String btnSaveAppointmentRemove = "SaveAppointmentRemove";
	public static final String btnSaveFallowAppointmentRemove = "SaveFallowAppointmentRemove";
	public static final String btnFetchTreIdForAppointment = "FetchTreIdForAppointment";
	public static final String btnFetchAllAppoDetForDoc = "FetchAllAppoDetForDoc";
	public static final String radFetchFollowUp = "FetchFollowUp";
	public static final String btnSaveFollowUp = "SaveFollowUp";
	public static final String urlFetchAppointmentTime = "FetchAppointmentTime";
	public static final String btnSaveNA = "saveNA";
	public static final String urlFetchNA = "fetchNA";
	public static final String urlDeleteNA = "DeleteNA";
	public static final String urlgetNAslots = "getNAslots";
	public static final String urlgetTimeSlot = "getTimeSlot";
	public static final String urlFetchQueue = "FetchQueue";
	public static final String fetchDoctorCharges = "fetchDoctorCharges";
	public static final String btnUpdateQueueInfo = "UpdateQueueInfo";
	public static final String btnFetchTherapyFollowUp = "FetchTherapyFollowUp";
	public static final String btnfetchAllDoctor = "fetchAllDoctor";
	public static final String btnFetchAllDoctorsForNS = "FetchAllDoctorsForNS";
	public static final String urlSchedulingDoctorSlot = "SchedulingDoctorSlot";
	public static final String urlsetTreatmentDoneOPD = "setTreatmentDoneOPD";
	public static final String urlSaveVisiteMarkPat = "SaveVisiteMarkPat";
	public static final String urlFetchAppointmentsForReSchedule = "FetchAppointmentsForReSchedule";
	public static final String urlFetchDoctorAvailable = "fetchDoctorAvailable";
	public static final String urlDeleteDoctorAvailable = "DeleteDoctorAvailable";
	public static final String urlSaveDoctorAvailable = "saveDoctorAvailability";
	/************************ End AppointmentConstant ********************/

	public static final String btncaseRegpatDetail = "caseRegpatDetail";
	public static final String btnUserLogin = "Sign In";
	public static final String btnLogOut = "logOut";

	public static final String btnPatientReg = "Save_Now";
	public static final String urlNewReg = "NewReg";
	public static final String btnViewDatabase = "ShowTopPat";

	public static final String urlfetchPatInfo = "fetchPatInfo";

	public static final String btnViewIPDDatabase = "ShowIPDTopPat";
	public static final String btnIPDDischargedPATAutoSuggestion = "ShowIPDDischargedPATAutoSuggestion";
	public static final String btnsearchPhysicalDischrgedPAT = "searchPhysicalDischrgedPAT";
	public static final String btnDeletePatient = "DeletePatient";
	public static final String urlViewDoctors = "FetchDoctors";
	public static final String urlFetchDoctorForReport = "FetchDoctorForReport";
	public static final String urlSetAppoTime = "SetAppoTime";
	public static final String urlsetAppoTimeWatches = "setAppoTimeWatches";
	public static final String urlsetAppoTimeWatchesForOPD = "setAppoTimeWatchesForOPD";
	public static final String btnSaveAppointment = "saveAppointment";
	public static final String urlGetBedAva = "GetBedAva";
	public static final String urlallocateBed = "allocateBed";
	public static final String urldeAllocateBed = "deAllocateBed";
	public static final String urlfetchAllPatientData = "fetchAllPatientData";
	public static final String urlfetchPatBedDetails = "fetchPatBedDetails";
	public static final String urlviewPrevDocDeskPatient = "viewPrevDocDeskPatient";
	public static final String urlSearchPrevTreatment = "SearchPrevTreatment";
	public static final String urlupdateRecOPD = "updateRecOPD";
	public static final String btnOpdPatientSearch = "opdPatientSearch";
	public static final String btnDisplay = "DisplayTopPat";
	public static final String btnDisplayDischargedPat = "DisplayDischargedPat";
	public static final String urlloadTestresult = "loadTestresult";
	public static final String btnFillDIC = "fillDIC";
	public static final String btnsaveDIC = "SaveDIC";
	public static final String btnsetIPD_DIC = "setIPD_DIC";
	public static final String btnDisplayTopPatIPD = "DisplayTopPatIPD";
	public static final String urlDispPatEditAgain = "DispPatEditAgain";
	public static final String urlDisplayOpSum = "DisplayOpSum";
	public static final String urlsearchOperationSumm = "searchOperationSumm";
	public static final String btnAppointOPDPat = "AppointOPDPat";
	public static final String urlfetchEchoStudy = "fetchEchoStudy";
	public static final String btnsaveEchoStudy = "saveEchoStudy";
	public static final String urlfetchEchoTestTable = "fetchEchoTestTable";
	public static final String urlDeleteEchoReport = "DeleteEchoReport";
	public static final String urlfetchPatAllTreatments = "fetchPatAllTreatments";
	public static final String urlfetchPatAllOrders = "fetchPatAllOrders";
	public static final String urlfetchOrderDetails = "fetchOrderDetails";
	public static final String urlsaveOrderForm = "saveOrderForm";
	public static final String urlDeleteOrderForm = "deleteOrderForm";
	public static final String urldeleteOrder = "deleteOrder";
	public static final String urlDispPatEditAgainForFile = "DispPatEditAgainForFile";
	public static final String urlRemoveDocuments = "RemoveDocuments";
	public static final String btnPrintfillDIC = "printfillDIC";
	public static final String urlfetchEchoDetails = "fetchEchoDetails";
	public static final String urlupdateAdmitUnder = "updateAdmitUnder";
	public static final String btnopd = "btnopd";
	/************** Treatment Constants **********************/
	public static final String urlOpdRmoSave = "OpdRmoSave";
	public static final String urlTestLoad = "loadTest";
	public static final String urlLoadTestForUpdate = "loadTestForUpdate";
	public static final String urlBlockDoctorsApp = "BlockDoctorsApp";
	public static final String urlDeleteBlockDoctorsApp = "DeleteBlockDoctorsApp";
	public static final String urlloadDoctor = "loadDoctor";
	public static final String urlDoctorDesk1 = "DoctorDesk1";
	public static final String urlDoctorDesk2 = "SaveDocTreatment";
	public static final String loadPatientTests = "loadPatientTests";
	public static final String urlsaveTestResult = "saveTestResult";
	public static final String urlShowDocApp = "ShowDocApp";
	public static final String urlfetchDefaultRMOTreatment = "fetchDefaultRMOTreatment";
	public static final String urlsearchDefaultRMOTreatment = "searchDefaultRMOTreatment";
	public static final String urlfetchPatRMOTreatment = "fetchPatRMOTreatment";
	public static final String urlgetDischargeSummary = "getDischargeSummary";
	public static final String urlfeatchPreviousDischargeSummary = "featchPreviousDischargeSummary";
	public static final String urlsaveTestFormat = "saveTestFormat";
	public static final String urlloadAllPatientTests = "loadAllPatientTests";
	public static final String urlloadBillTest = "loadBillTest";
	public static final String urlgetconsultingFees = "getconsultingFees";
	public static final String urlfetchOPDRegister = "fetchOPDRegister";

	public static final String urlfetchDistinctRMOTreatment = "fetchDistinctRMOTreatment";
	public static final String urlviewPrevDocDeskDistinctPatient = "viewPrevDocDeskDistinctPatient";
	public static final String urlfetchPatientInfo = "fetchPatientInfo";

	/************** End of treatment Constants ****************/

	/************** IPD treatment Constants **********************/
	public static final String urlfetchExpenceVoucher = "fetchExpenceVoucher";
	/************** expense voucher to convert amount in words ***********/
	public static final String ConvertAmountInWords = "ConvertAmountInWords";

	public static final String urlPreviousDoctorRound = "PreviousDoctorRound";
	public static final String btnprintPreviousDoctorRound = "printPreviousDoctorRound";
	public static final String urlsaveDoctorRound = "saveDoctorRound";
	public static final String urlPatientMaterialUsed = "PatientMaterialUsed";
	public static final String urlchart = "chart";
	public static final String urlPrintchart = "Printchart";
	public static final String urlPrintInvestChart = "PrintInvestChart";
	public static final String urlsaveMaterialUsed = "saveMaterialUsed";
	public static final String urlDeleteDIC = "DeleteDIC";
	public static final String urlDeleteDRR = "DeleteDRR";
	public static final String urlUpdateDIC = "UpdateDIC";
	public static final String urlUpdateDRR = "UpdateDRR";
	public static final String urlDeleteMat = "DeleteMat";
	public static final String urlDeleteChart = "DeleteChart";
	public static final String urlfetchAllNursingChart = "fetchAllNursingChart";
	public static final String urlsaveDischargeSummary = "saveDischargeSummary";
	public static final String urlsaveIPDRegister = "saveIPDRegister";
	public static final String urlfetchIPDRegisterReport = "fetchIPDRegisterReport";
	public static final String urlorderFormPopup = "orderFormPopup";
	public static final String urlfeatchOrderFormByDate = "featchOrderFormByDate";
	public static final String urlsaveOrderFormDetails = "saveOrderFormDetails";
	public static final String urlChangeBedState = "ChangeBedState";
	public static final String btnsaveAddIpdHistory = "saveAddIpdHistory";
	public static final String urlfetchAddIPDHistory = "fetchAddIPDHistory";
	public static final String btncancelChifComStatus = "cancelChifComStatus";
	public static final String urlgetRadiologyTestBodyPart = "getRadiologyTestBodyPart";
	public static final String urlgetpatientAllAssignedtest = "getpatientAllAssignedtest";
	public static final String urlupdatemanageflag = "updatemanageflag";

	/************** End of IPD treatment Constants ***************/
	public static final String urlFetchDischargeAutoSummary = "FetchDischargeAutoSummary";
	/******************** Inventory Constants ***************/
	public static final String urlfetchItems = "setInventory";
	public static final String btnsaveLabInventory = "saveLabInventory";
	public static final String btnsaveCCUInventory = "saveCCUInventory";
	public static final String btnsaveOPDInventory = "saveOPDInventory";
	public static final String btnSave = "saveMainInventory";
	public static final String btnSaveUOMMaster = "saveUOMMaster";
	public static final String onLoadUOMMasterGetId = "getUOMNextId";
	public static final String onLoadUOMMasterFetchUomDetail = "fetchUOMDetail";
	public static final String btnDeleteUOMDetail = "deleteUOMDetail";
	public static final String btnSaveVendorDetail = "saveVendorDetail";
	public static final String onLoadVendorMasterGetId = "getVendorNextId";
	public static final String onLoadVendorMasterDetail = "fetchVendorDetail";
	public static final String btnDeleteVendorDetail = "deleteVendorDetail";

	public static final String btnSubInventoryDetail = "saveSubInventoryDetail";
	public static final String onLoadSubInventoryMasterGetId = "getNextSubInventoryId";
	public static final String onLoadSubInventoryMasterDetail = "fetchSubInventoryNew";
	public static final String btnDeleteShelfDetail = "deleteShelfDetail";
	public static final String btnSaveCategoryDetail = "saveCategoryDetail";
	/*@Author : Sudhir Jadhav Charges Master saveChargesDetail @Date:4jully2016*/
	public static final String btnSaveChargesDetail ="saveChargesDetail";
	public static final String onLoadFetchChargesDetail = "fetchChargesDetail";

	public static final String onLoadCategoryMasterGetId = "getCategoryNextId";
	public static final String onLoadCategoryMasterDetail = "fetchCategoryDetail";
	public static final String btnDeleteCategoryDetail = "deleteCategoryDetail";
	public static final String btnSaveFormDetail = "saveFormDetail";
	public static final String onLoadFormMasterGetId = "getFormNextId";
	public static final String onLoadFormMasterDetail = "fetchFormDetail";
	public static final String btnDeleteFormDetail = "deleteFormDetail";

	/* New Inventory DOc Form */
	public static final String onLoadDocMasterGetId = "txtdocmastercode";
	public static final String btnSaveDocDetail = "saveDocumentDetail";
	public static final String onLoadDocumentMasterDetail = "fetchDocumentDetail";
	public static final String btnDeleteDocumentDetail = "deleteDocumentDetail";

	/* New Inventory Tax Form */
	public static final String onLoadTaxMasterGetId = "txttaxmastercode";
	public static final String btnSaveTaxDetail = "saveTaxDetail";
	public static final String onLoadTaxMasterDetail = "fetchTaxDetail";
	public static final String btnDeleteTaxDetail = "deleteTaxDetail";

	/* New Inventory Finacial Year */
	public static final String onLoadFinancialYearGetId = "txtFinancialYearId";
	public static final String btnFinancialYearxDetail = "saveFinacncialYearDetail";
	public static final String onLoadFinacncialYearDetail = "fetchFinDetail";
	public static final String btnDeleteFinancialDetail = "deleteFinancialDetail";

	public static final String btnfetchAllAvailableStock = "fetchAllAvailableStock";

	// public static final String btnSaveManufacturerDetail =
	// "SaveManufacturerDetails";

	public static final String onLoadfetchItemDetail = "fetchItemDetail";
	public static final String onLoadfetchPartyDetailsOnSerach = "fetchPartyDetailsOnSerach";

	public static final String onLoadManufacturerMasterGetId = "getManufacturerNextId";
	public static final String onLoadManufacturerMasterDetail = "fetchManufacturerDetail";
	public static final String onLoadWarehouseMasterGetId = "getNextWarehouseId";
	// public static final String btnDeleteManufacturerDetail =
	// "deleteManufacturerDetail";
	// husen
	public static final String onLoadfetchWarehouseDetails = "fetchWarehouseDetails";

	// husen
	public static final String onLoadfetchWarehouseLocation = "fetchLocationforWarehouse";

	// husen
	public static final String onLoadfetchItemPurchaseDetails = "fetchItemPurchaseDetails";
	// husen
	public static final String onLoadfetchItemSalesDetails = "fetchItemSalesDetails";
	/* New Inventory DOCNUMBR Form */
	public static final String onLoadDocNumberMasterGetId = "txtdocnumbermastercode";
	public static final String btnSaveDocNumberDetail = "saveDocumentnumberDetail";
	public static final String onLoadDocumentNumberMasterDetail = "fetchDocumentNumberDetail";
	public static final String btnDeleteDocumentNumberDetail = "deleteDocumentNumberDetail";

	/**** Constants for Abc Analysis Range Master @Date:11/feb/2016 @Author:Sudhir ***/
	public static final String btnSaveABCRangeDetails = "saveABCRangeDetails";
	public static final String onLoadfetchABCAnalysisRange = "fetchABCAnalysisRange";

	/* New Inventory Party Master Form */
	public static final String onLoadPartyNumberMasterGetId = "txtpartymastercode";
	public static final String btnSavePartyMasterDetail = "savePartyDetail";
	public static final String onLoadPartyGeneralMasterGetId = "txtgeneralinfoId";
	public static final String onLoadPartyContactMasterGetId = "txtcontactcode";
	public static final String onLoadPartypaymentMasterGetId = "txtpaymentid";
	public static final String onLoadPartyotherMasterGetId = "txtotherid";
	public static final String onLoadPartyaddressMasterGetId = "txtaddressinfocode";
	public static final String onLoadPartyMasterrMasterDetail = "fetchPartyMasterDetail";
	public static final String btnShowPartMasterFormInfo = "fetchShowDetail";
	public static final String btnDeletePartyFormDetail = "deletePartyFormDetail";
	public static final String autoSuggestionVendorName = "fetchVendorName";

	// husen
	public static final String btnSavePartyMasterContactDetails = "SavePartyMasterContactDetails";
	// husen
	public static final String onLoadfetchPartyContactsDetails = "fetchPartyContactsDetails";
	// husen
	public static final String btnSavePartyMasterAddressDetails = "SavePartyMasterAddressDetails";
	// husen
	public static final String onLoadfetchPartyAddressDetails = "fetchPartyAddressDetails";
	// husen
	public static final String btnSavePartyMasterPaymentDetails = "SavePartyMasterPaymentDetails";
	// husen
	public static final String onLoadfetchPartyPaymentDetails = "fetchPartyPaymentDetails";
	// husen
	public static final String btnSavePartyMasterGeneralDetails = "SavePartyMasterGeneralDetails";
	// husen
	public static final String onLoadFetchPartyMasterGeneralDetails = "fetchPartyGeneralDetails";
	// husen
	public static final String onLoadFetchPartyOtherDetails = "fetchPartyOtherDetails";

	public static final String btnSaveIngredientDetail = "SaveIngredientDetails";
	public static final String onLoadIngredientMasterGetId = "getManufacturerNextId";
	public static final String onLoadIngredientMasterDetail = "fetchIngredientDetail";
	public static final String btnDeleteIngredientDetail = "deleteIngredientDetails";

	public static final String btnSavePackingDetail = "SavePackingDetails";
	public static final String onLoadPackingMasterGetId = "getPackingNextId";
	public static final String onLoadPackingMasterDetail = "fetchPackingDetail";
	public static final String btnDeletePackingDetail = "deletePackingDetails";

	public static final String onLoadTrolleyMasterGetId = "getTrolleyNextId";
	public static final String onLoadFetchHallId = "fetchHallId";
	public static final String btnSaveTrolleyDetail = "saveTrolleyDetail";
	public static final String onLoadFetchTrolleyDetail = "fetchTrolleyDetail";
	public static final String btnDeleteTrolleyDetail = "deleteTrolleyDetail";

	public static final String onLoadTemplateMasterGetId = "getTemplateNextId";
	public static final String btnSaveTemplateMaster = "saveTemplateMaster";
	public static final String onLoadTemplateMasterDetail = "fetchTemplateDetail";
	public static final String btnDeleteTemplateDetail = "deleteTemplateDetail";
	public static final String btnDeleteMedicineDetail = "deleteMedicineDetail";
	public static final String onLoadTemplateId = "fetchTemplateId";
	public static final String onLoadUsereId = "fetchUserId";

	/* New Inventory Item Master */

	public static final String btnSaveItemMaster = "SaveItemMasterDetails";
	/* New Inventory Item Master calculate profit of item @author husenbadshah */
	public static final String onloadcalculateProfit = "calculateProfit";
	// save item purcahse details
	public static final String btnSaveItemMasterPurchaseDetails = "SaveItemMasterPurchaseDetails";
	//fetch items unique Identification Details @Author :sudhir  @Date:30may2016
	public static final String btnfetchItemUniqueIdentificationDetails = "fetchItemUniqueIdentificationDetails";
	// save item sales details
	public static final String btnSaveItemMasterSalesDetails = "SaveItemMasterSalesDetails";
	public static final String onLoadItemMasterGetId = "getItemMasterNextId";
	public static final String onLoadItemPurchaseGetId = "getItemPurchaseNextId";
	public static final String onLoadItemSaleGetId = "getItemSalesNextId";
	public static final String onLoadWarehouseId = "getWarehouseNextId";
	public static final String onLoadItemPartyGetId = "getItemPartyNextId";
	public static final String onLoadItemOtherGetId = "getItemOtherrNextId";
	public static final String onLoadFetchItemMasterDetail = "fetchItemMasterDetail";
	public static final String onLoadFetchAssetsDetail = "fetchAssets";
	public static final String onLoadFetchAssetsViewDetail = "fetchAssetsView";
	public static final String onLoadFetchItemMasterPurchaseDetail = "fetchONEDITItemPurchasDetail";
	public static final String onLoadFetchItemMasterSalesDetail = "fetchONEDITItemSalesDetail";
	public static final String onLoadFetchItemMasterWarehouseDetail = "fetchONEDITItemWarehouseDetail";
	public static final String onLoadFetchItemMasterOtherDetail = "fetchONEDITItemOtherDetail";
	public static final String onLoadFetchItemMasterRelatedPartyDetail = "fetchONEDITItemPartyDetail";
	/** fetchAssetsMangement machine Maintance @Author Sudhir @Date:28june2016 ***/
	public static final String btnFetchAssetsMangement ="fetchAssetsMangement";
	/* get manufacture names husen */
	public static final String autosuggestfetchMfgName = "fetchMfgName";
	/* get Items names husen */
	public static final String fetchItemsOnlyAutoSugg = "fetchItemNamesOnlyAutoSuggest";
	/* get uom names husen */
	public static final String autosuggestUOMNames = "fetchUOMNames";
	/* get warehouse names husen */
	public static final String autosuggestWarehouseName = "fetchWarehouseName";
	/* get party names husen */
	public static final String autosuggestPartyName = "fetchPartyName";
	/* get form names husen */
	public static final String autosuggestFormName = "fetchFormName";
	/* get category names husen */
	public static final String autosuggestCategoryName = "fetchCategoryName";
	/* delete purchse detailshusen */
	public static final String btndeleteItemPurchaseRowDetail = "deleteItemPurchaseRowDetail";
	/* delete sales details husen */
	public static final String btndeleteItemSalesRowDetail = "deleteItemSalesRowDetail";
	/* get purchase details on view husen */
	public static final String btnfetchToViewItemPurchaseDetails = "fetchToViewItemPurchaseDetails";
	/* get sales details on view husen */
	public static final String btnfetchToViewItemSalesDetails = "fetchToViewItemSalesDetails";
	/* get delete party contacts husen */
	public static final String btndeletePartycontactdetails = "deletePartycontactdetails";
	/* get delete party address husen */
	public static final String btndeletePartyaddressdetails = "deletePartyaddressdetails";
	/* get delete party payment husen */
	public static final String btndeletePartypaymentdetails = "deletePartypaymentdetails";
	/* get delete party general husen */
	public static final String btndeletePartygeneraldetails = "deletePartygeneraldetails";

	// **************************************party master
	// new************************husen********************//
	public static final String btnfetchPartyContactsOnViewDetails = "fetchPartyContactsOnViewDetails";

	public static final String btnDeleteItemMasterDetail = "deleteItemMasterDetail";
	public static final String onLoadFetchItemMasteITEMTYPEDetail = "fetchItemMasterItemTypeDetail";
	public static final String onLoadFetchItemMasterITEMGROUPDetail = "fetchItemMasterItemGroupDetail";
	public static final String onLoadFetchItemMasterPartyDetail = "fetchItemMasterPartId";

	// Inventory Purchase Quotation Form-sudhir
	public static final String onLoadcommomnMasterGetId = "getQuotationNextId";
	public static final String onLoadGetDocMasterSeries = "FetchDocSeries";
	public static final String onLoadDocumentNameMasterDetail = "fetchDocumentNameDetail";
	public static final String btnSavecommonMaster = "savePurchaseCommonDetail";
	
	public static final String onLoadFetchPurchaseCommonMasterDetail = "fetchPurchaseCommonMasterDetail";
	public static final String btnLoadFetchPurchaseCommonItemMasterDetail = "fetchPurchaseCommonItemMasterDetail";

	public static final String btnFetchPurchaseCommonMasterDetailSearch = "fetchPurchaseCommonMasterDetailSearch";

	public static final String btnDeletePurchaseCommonDetail = "deletePurchaseCommonDetail";
	public static final String autoSuggestionItemName = "fetchItemName";
	public static final String fetchItemDetails = "fetchItemIdDetail";
	public static final String btnCreatePurchaseQuotation = "createpurchaseQuatation";

	// ***********************************Inventory purchase request List
	// *********************************
	public static final String btnfetchItemDetails = "fetchItemPurchaseandItemMasterDetails";

	// *******************purchase order ********************
	public static final String onLoadBatchStockMasterGetId = "getGRNNextId";
	public static final String btnSaveOrderMaster = "savePurchaseOrderDetail";
	public static final String btnSaveOrderMaster2 = "savePurchaseOrderDetail2";
	public static final String onLoadFetchPurchaseOrderMasterDetail = "fetchPurchaseOrderMasterDetail";

	public static final String btnDeletePurchaseOrderDetail = "deletePurchaseOrderDetail";

	public static final String btnFetchPurchaseOrderItemMasterDetail = "fetchPurchaseOrderItemMasterDetail";

	public static final String btnFetchtermsandconditionsDetailsforOrder = "fetchtermsandconditionsDetailsforOrder";

	public static final String onLoadFetchPendingOrder = "getPendingOrder";

	/*********** fetch Item code AutoSuggetion Author :sudhir Date 26:5:2015  **********/
	public static final String onLoadAotoSuggetionFetchItemTaxcode = "fetchItemTaxcode";

	// *********Goods Recived note *********/
	public static final String btnSaveGRNDetail = "saveGRNDetail";
	public static final String onLoadFetchGRNMasterDetail = "fetchGRNMasterDetail";
	public static final String btnFetchGRNBatchStocDetail = "fetchGrnBatchStocDetail";
	public static final String btnDeleteGRNMasterDetail = "deleteGRNMasterDetail";
	public static final String btnFetchtermsandconditionsDetailsforGrn = "fetchtermsandconditionsDetailsforGrn";
	public static final String btngetValUserNamePassforGrn = "getValUserNamePassforGrn";

	// ************************** purchase Invoice
	// ***********************************/

	public static final String onLoadFetchPendingGRNforPurInvoice = "getPendingGRNforPurInvoice";
	public static final String btnSavePurchaseInvoiceDetail = "savePurchaseInvoiceDetail";
	public static final String onLoadFetchPurchaseInvoiceMasterDetail = "fetchPurchaseInvoiceasterDetail";
	public static final String btnFetchpurchaseInvoiceIteamMasterDetail = "fetchpurchaseInvoiceIteamMasterDetail";
	public static final String btnsavePaymentDetailsofPurInvoice = "savePaymentDetailsofPurInvoice";
	public static final String btnFetchpurchaseInvoicePaymentDetail = "fetchpurchaseInvoicePaymentDetail";
	public static final String btnFetchtermsandconditionsDetailsforInvoice = "fetchtermsandconditionsDetailsforInvoice";

	// ********************************************************* purchase Return
	// ***************************************
	public static final String onLoadFetchPendPurchaseInvoiceforpurReturn = "getPendPurchaseInvoiceforpurReturn";
	public static final String btnSavePurchaseReturnDetail = "savePurchaseReturnDetail";
	public static final String onLoadfetctchPurchaseReturnMasterDetails = "fetctchPurchaseReturnMasterDetails";
	public static final String btnFetchpurchaseReturnIteamMasterDetail = "fetchpurchaseReturnIteamMasterDetail";

	public static final String btnfetchtermsandconditionsDetailsforReturn = "fetchtermsandconditionsDetailsforReturn";
	
	
	/**purchase Enquiry @Author Sudhir @date18may2016*/
	public static final String btnSavePurchaseEnquiry="SavePurchaseEnquiry";

	// Batch Next Auto increment ID
	public static final String onLoadbatchMasterGetId = "getBatchNextId";

	// pending quotation List
	public static final String onLoadFetchPendingQuotation = "getPendingQuotation";

	/***********************************************/
	/**************************** New Material Request Note ************************************/
	public static final String btnSaveMaterialRequestNote = "SaveMaterialRequestNoteDetails";
	public static final String onLoadMaterialRequestNoteGetId = "getMaterailRequestNoteNextId";
	public static final String onLoadFetchMaterialRequestNoteDetail = "fetchMaterialRequestNoteDetail";
	public static final String onLoadFetchMaterialRequestNoteDetailinPurReqList = "fetchMaterialRequestNoteDetailinPurReqList";
	public static final String onLoadFetchMaterialRequestNoteDetailsforMRNAll = "fetchMaterialRequestNoteDetailsforMRNAll";

	public static final String onLoadFeatchConsumtionMasterDetails = "featchConsumtionMasterDetails";

	/****************************** consumption Details Author: sudhir Date:24:8:2015 ****************************/
	public static final String btnSaveConsumptionDetails = "saveConsumptionDetails";

	/******************************************* Inventory Goods Receipt ***************************************/

	public static final String onLoadfetchMaterialRequestNoteDetailsGoodsReceipt = "fetchMaterialRequestNoteDetailsGoodsReceipt";

	public static final String onLoadfetchOnEditMRNItemDetail = "fetchOnEditMRNItemDetail";
	public static final String btnfetchItemSalesDetail = "fetchItemSalesDetail";

	public static final String btnfetchItemsCurrentStockofSubinventoryandMainStock = "fetchItemsCurrentStockofSubinventoryandMainStock";

	public static final String onLoadfetchMaterialRequestNoteDetailRecieved = "fetchMaterialRequestNoteDetailRecieved";
	public static final String onLoadfetchfetchMaterialRequestNoteDetailsStcock = "fetchMaterialRequestNoteDetailsStcock";

	public static final String btnfetchMaterialRequestNoteStockDetailsForSubInventory = "fetchMaterialRequestNoteStockDetailsForSubInventory";

	public static final String btnfetchMaterialRequestNoteStockDetailsForSubInventoryAvailableStock = "fetchMaterialRequestNoteStockDetailsForSubInventoryAvailableStock";

	public static final String onLoadfetchStockDetailsByWardName = "fetchStockDetailsByWardName";

	public static final String onLoadMaterialRequestNoteSlaveGetId = "getMRNSlaveNextId";
	public static final String btnMaterialRequestNoteSlaveDetails = "getMaterialRequestNoteSlaveDetails";
	public static final String btnConsumptionSlaveDetails = "getConsumptionSlaveDetails";

	public static final String btnDeleteMrnMasterDetail = "deleteMrnMasterDetail";

	public static final String onLoadFetchfetchLocationAndNameAtuosugg = "fetchLocationAndNameAtuosugg";

	/***
	 * * featch Dispenced to form user Table for Autosuggetion Date:21:8:2015 *
	 * Author:sudhir
	 ***/
	public static final String btnFetchDispensedtoNameAutosugg = "fetchDispensedtoNameAutosugg";

	/**** * featch Pateien Name for Autosuggetion Date:21:8:2015 Author:sudhir * ***/
	public static final String btnFetchPateintNameAutosugg = "fetchPateintNameAutosugg";

	public static final String btnFetchPharmaPateintNameAutosugg = "fetchPharmaPateintNameAutosugg";

	public static final String btnFetchLocationforNameAtuosugg = "fetchLocationforNameAtuosugg";
	public static final String btnIssueMrnstausDispatch = "issueMrnstausDispatch";
	// new Material Request note list
	public static final String btnCreatepurchaseOrderList = "createpurchaseOrderList";

	public static final String btnSaveProductDetail = "SaveProductDetails";
	public static final String onLoadProductMasterGetId = "getProductNextId";
	public static final String onLoadProductMasterDetail = "fetchProductDetail";
	public static final String btnDeleteProductDetail = "deleteProductDetails";
	public static final String btnSaveUomService = "saveUomService";

	public static final String onLoadTrolleyReqList = "fetchTrolleyReqList";
	public static final String onLoadGenerateTrolleyReq = "generateRequirementByTrolleyId";
	public static final String onLoadReqGetId = "getRequirementNextId";
	public static final String btnSaveReqDetail = "saveReqMaster";

	public static final String onLoadStockCard = "fetchStockCard";

	public static final String btnsaveGRN = "saveGRN";
	public static final String btnsaveGIN = "saveGIN";
	public static final String urlfetchGRN = "fetchGRN";
	public static final String urlfetchGIN = "fetchGIN";
	public static final String urlgetGRNMasterID = "getGRNMasterID";
	public static final String urlgetGINMasterID = "getGINMasterID";
	public static final String urldeleteGRNGINComp = "deleteGRNGINComp";
	public static final String btngetPOComList = "getPOComList";
	public static final String btngetReqComList = "getReqComList";
	public static final String fetchVoucherNo = "fetchVoucherNo";
	public static final String fetchProductName = "fetchProductName";
	public static final String fetchProductDetails = "fetchProductDetails";
	public static final String SaveStockAdj = "saveStockAdj";
	public static final String fetchStockAdj = "showStockAdj";
	public static final String deleteStockAdj = "deleteStockAdj";
	public static final String dispStockAdj = "dispStockAdj";
	public static final String fetchDataForEdit = "fetchDataForEdit";
	public static final String fetchEnquiryNo = "fetchEnquiryNo";
	public static final String showEnquiryProducts = "showEnquiryProducts";
	public static final String SaveEnquiry = "saveEnquiry";
	public static final String dispPurchaseEnq = "dispPurchaseEnq";
	public static final String fetchDataForEnqEdit = "fetchDataForEnqEdit";
	public static final String fetchDataForOrderEdit = "fetchDataForOrderEdit";
	public static final String fetchOrderNo = "fetchOrderNo";
	public static final String showEnquiryItems = "showEnquiryItems";
	public static final String SavePO = "savePO";
	public static final String dispPurchaseOrder = "dispPurchaseOrder";
	public static final String fetchVendorsList = "fetchVendorList";
	public static final String fetchProductList = "fetchProductList";
	public static final String fetchRequirment = "fetchReq";

	/* New Inventory Sub Contracting Material Issue */
	public static final String onLoadSubContractingMaterialIssueGetId = "getNextIdSubContractingMaterialIssue";
	public static final String btnSaveSubContractingMaterialIssue = "savesubContractingMaterialIssue";

	public static final String onLoadFetchSubContractingMatrialIssueDetail = "fetchSubContractingDetail";
	public static final String btnDeleteSubContraMasterDetail = "deleteSubContractingIssueMasterDetail";
	public static final String btnGetDynamicSubContractingSlavesData = "getDynamicSubContractingSlavesData";

	/* New Goods Issues */
	public static final String onLoadGetIssueToMRNList = "getIssueToMRNList";
	public static final String btnSaveGoodsIssue = "SaveGoodsIssue";

	// conastants
	// MRN Available items list from
	public static final String btnonSearchMateraialList = "MRNItemAvailableListInBatchDetails";

	/***
	 * * Get SubInventory Avaliable Stock Details for Consumption Author :Sudhir
	 * * Date:18:8:2015
	 *****/
	public static final String btngetSubInventoryAvaliableStockDetailsforConsumption = "getSubInventoryAvaliableStockDetailsforConsumption";

	/***
	 * * update Sub Inventory Item Stock Qty Partial Mrn @Author :Sudhir
	 * @Date:3:feb:2016
	 *****/
	public static final String btnupdateSubInventoryItemStockQtyPartialMrn = "updateSubInventoryItemStockQtyPartialMrn";

	// update batck stock qtyt details constatnt
	public static final String btnUpdateBatchQtyDetails = "UpdateBatchStockQtyDetails";

	// Set Session Val for Dynamic Rows constatnt @date:4:feb:2016
	public static final String btnSetSessionValforDynamicRows = "SetSessionValforDynamicRows";

	/***
	 * * Update SubInventory Avaliable Stock Details for Consumption Author
	 * :Sudhir Date:19:8:2015*
	 */
	public static final String btnUpdateSubInventoryStockQty = "UpdateSubInventoryStockQty";

	public static final String featchTrollyGRN = "featchTrollyGRN";
	public static final String fetchProductsForGRN = "fetchProductsForGRN";
	public static final String fetchProductsForVGRN = "fetchProductsForVGRN";
	public static final String saveTrolleyGRN = "saveTrolleyGRN";
	
	
	/****Hospital Details For Inventory @author sudhir @date 4Aug2016 ******/
    public static final String btnSaveHospitalDetailsforInventory ="saveHospitalDetailsforInventory"; 
    public static final String onLoadfetchHospitalDetailforInventory = "fetchHospitalDetail";
    
    /****Openig Stock for Inventory @Author Sudhir jadhav @Date :19/08/2018*****/
    public static final String btnSaveOpenigStockDetail = "SaveOpenigStockDetail";
    
    public static final String onLoadFetchOpenigStockDetails = "fetchOpenigStockDetails";
    
    /****Closing Stock for Inventory @Author Sudhir jadhav @Date :19/08/2018*****/
    public static final String btnSaveClosingStockDetail = "SaveClosingStockDetail";
    
	public static final String onLoadFetchClosingStockDetails = "fetchClosingStockDetails";
    
	
    /****Terms and Condition Master@author Sudhir jadhav @Date:8/8/2016 ******/
	public static final String btnSaveTermsandConditionsMaster="saveTermsandConditionsMaster";
	public static final String onLoadfetchtermsandConditionsDetail = "fetchtermsandConditionsDetail";

	/********************** Inventory Report Costants for Inventory Date :1/10/2015 Author :Sudhir ***************/
	public static final String btnfeatchItemsCategorywise = "featchItemsCategorywise";
	public static final String btnGetItemsDetailsByCategoryName = "getItemsDetailsByCategoryName";
	public static final String btnGetCategoryDataByCategoryNameReport = "getCategoryDataByCategoryNameReport";
	public static final String btnFetchCategoryName = "fetchCategoryName";
	public static final String btnFeatchItemsListBYCategoryName = "featchItemsListBYCategoryName";
	public static final String btnGetItemPurchaseDataByCategoryName = "getItemPurchaseDataByCategoryName";
	public static final String btnGetPurchaseCategoryDataByItemNameReport = "getPurchaseCategoryDataByItemNameReport";
	public static final String btngetCategoryStockDataByItemNameandId = "getCategoryStockDataByItemNameandId";
	public static final String btnGetStockCategoryDataByItemNameandIdReport = "getStockCategoryDataByItemNameandIdReport";

	public static final String btnGetPurchaseCompanyList = "getPurchaseCompanyList";
	public static final String btnGetItemsPurchaseDetailsByCompanyName = "getItemsPurchaseDetailsByCompanyName";
	public static final String btnGetItemPurchaseDataByCompanyNameandIdReport = "getItemPurchaseDataByCompanyNameandIdReport";

	/************ Anaylsis Report Author:Sudhir Date:22:12:2015 *****************/
	public static final String btnGetXYZAnalysisReport = "getXYZAnalysisReport";

	/************ End Anaylsis Report Author:Sudhir Date:22:12:2015 *****************/
	/* ** Inventory Master Report Date : 13/10/2015: Author :sudhir **** */
	public static final String btnGetDocumentListReport = "getDocumentListReport";
	/* ********************* End Inventory Master Report *************** */

	/**
	 * *** Mrn complete report Status is Complete Date:16/11/2015 *
	 * Author:sudhir *
	 ****/
	public static final String btnGetMrnCompleteReport = "getMrnCompleteReport";

	/*****
	 * End Mrn complete report Status is Complete Date:16/11/2015* Author:sudhir
	 ***/

	/**************** getValidatUserNameandPassword Date:18 jan 2015 Author :sudhir ****************/
	public static final String btngetValidatUserNameandPassword = "getValidatUserNameandPassword";
	/**************** getValidatUserNameandPassword Date:18 jan 2015 Author :sudhir ****************/
	/* **getSupplierWiseInvoiceListingReport ****@DATE :1/3/2016 @Author sudhir */
	public static final String btnGetSupplierWiseInvoiceListingReport = "getSupplierWiseInvoiceListingReport";
	/***
	 * End getSupplierWiseInvoiceListingReport ****@DATE :1/3/2016 @Author
	 * sudhir
	 */

	/******************** End Of Inventory Constants *********/

	/********* Auto suggestion constants **********/
	public static final String urlAutoMedicine = "medicine";
	/********* End of Auto suggestion constants **********/

	/************ Bill constants *********/
	public static final String urlShowTopBill = "ShowTopBill";
	public static final String urlshowPatientBill = "ShowPatientBill";
	public static final String urlPatOpBillDet = "PatOpBillDet";

	public static final String urlShowOPDPatientBill = "ShowOPDPatientBill";

	public static final String urlSetSpecialDiscount = "SetSpecialDiscount";

	public static final String urlsavebillPay = "savebillPay";

	public static final String btnCloseTreatment = "closeTreatment";
	public static final String urlgetDiscountIPD = "getDiscountIPD";
	public static final String urlfetchIPDAAmt = "fetchIPDAAmt";
	public static final String urldeleteIPDAdvancedPayment = "deleteIPDAdvancedPayment";
	public static final String urlgetIPDBillHeaders = "getIPDBillHeaders";
	public static final String urlShowIPDHeaderBill = "ShowIPDHeaderBill";
	public static final String urlSaveIPDHeaderBill = "SaveIPDHeaderBill";
	public static final String urlsaveopdBillDetails = "saveopdBillDetails";
	public static final String urlgetBillId = "getBillId";
	public static final String urlfetchPrevOPDBillPat = "fetchPrevOPDBillPat";
	public static final String urlfetchOPDBillPat = "fetchOPDBillPat";
	public static final String urlfetchPrevTreatmentPat = "fetchPrevTreatmentPat";
	public static final String urlfetchCloseTreatPat = "fetchCloseTreatPat";
	public static final String urlfetchOPDbillByBillID = "fetchOPDbillByBillID";
	public static final String urlPrevOPDBillPatSearch = "PrevOPDBillPatSearch";
	public static final String urlfeatchCarpoAccBillofPat = "featchCarpoAccBillofPat";
	public static final String urlfeatchPrevIPDBillPat = "featchPrevIPDBillPat";

	public static final String urlfeatchIPDBillPat = "featchIPDBillPat";

	public static final String urlfeatchPreIPDBillofPat = "featchPreIPDBillofPat";
	public static final String urlSaveAdvanceReceipt = "saveAdvanceReceipt";
	public static final String urlgetReceiptNoForOPD = "getReceiptNoForOPD";
	/*************** End Bill Constants ******************/

	/******************** DashBoard Constants ***************/
	public static final String urlAvaStatus = "AvaStatus";
	public static final String urlchangeToY = "changeToY";
	public static final String urlchangeToN = "changeToN";
	public static final String urlfetchUserAva = "fetchUserAva";
	/******************** End Of DashBoard Constants *********/

	/************************ Start Admin Constants ************************/

	public static final String urldeleteIcdCode = "deleteIcdCode";
	public static final String urlFetchDefUser = "fetchUser";
	public static final String btnDoctorDetails = "SaveDoctorDetails";
	public static final String SaveOtherUserDetails = "SaveOtherUserDetails";
	public static final String btnDeleteUser = "DeleteUser";
	public static final String urlFetchDefHall = "fetchHall";
	public static final String btnHallDetails = "SaveHallDetails";
	public static final String btnDeleteHall = "DeleteHall";
	public static final String btnViewDatabaseItem = "ShowTopItem";
	public static final String btnViewDefItem = "fetchDefItem";
	public static final String btnSaveItem = "SaveItem";
	public static final String btnDeleteItem = "deleteItem";
	public static final String btnDeleteOtherItem = "deleteOtherItem";
	public static final String btnViewDefotheritem = "fetchDefotheritem";
	public static final String btnViewDatabaseOtherItem = "ShowOtherTopItem";
	public static final String btnSaveOtherItem = "SaveOtherItem";
	public static final String btnSearchHall = "SearchHall";
	public static final String btnSearchUser = "searchUser";
	public static final String btnfetchBedHall = "fetchBedHall";
	public static final String btnDeleteSpecBed = "DeleteSpecBed";
	public static final String btnAddBeds = "AddBeds";
	public static final String btnAddDistributer = "AddDistributer";
	public static final String btnfetchDistID = "fetchDistID";
	public static final String btnfetchDistributer = "fetchDistributer";
	public static final String btnupdateDist = "updateDist";
	public static final String btndeleteDist = "deleteDist";
	public static final String btnSearchDistributor = "SearchDistributor";
	public static final String urlFetchDefOperation = "fetchOperation";
	public static final String btnSearchOperation = "searchOperation";
	public static final String btnFetchItemPries = "fetchItemPries";
	public static final String btnSaveOperation = "SaveOperationDetails";
	public static final String btnDeleteOperation = "deleteOperation";
	public static final String btnDeleteCAReport = "DeleteCAReport";
	public static final String btnDeleteAngioplastyReport = "DeleteAngioplastyReport";
	public static final String urlNewOperationId = "newOperationID";
	public static final String urlfetEmpDet = "fetEmpDet";
	public static final String urlSaveEmpDetails = "SaveEmpDetails";
	public static final String urlSaveUserDetails = "SaveUserDetails";
	public static final String urlInsertUserDetails = "InsertUserDetails";
	public static final String btnDeadPatient = "DeadPatient";
	public static final String btnDefaultChart = "defaultChart";
	public static final String btnFetchChartID = "fetchChartID";
	public static final String btnAddChartDetails = "addChartDetails";
	public static final String btnDeleteChart = "deleteChart";
	public static final String btnSearchChart = "searchChart";
	public static final String btnLoadDoctor = "loadDoctor";
	public static final String btnLoadDoctorForUpdate = "loadDoctorForUpdate";
	public static final String btnfetchTest = "fetchTest";
	public static final String btnsearchTest = "searchTest";
	public static final String btneditTest = "editTest";
	public static final String btnUpdateTest = "UpdateTest";
	public static final String btnFetchTestID = "fetchTestID";
	public static final String btnDeleteTest = "deleteTest";
	public static final String urlfetchOperationForSDEdit = "fetchOperationForSDEdit";
	public static final String urlfetchLivePat = "fetchLivePat";
	public static final String urlFindItemName = "FindItemName";
	public static final String urlfetchPatientBill = "fetchPatientBill";
	public static final String urlchangeBillStatus = "changeBillStatus";
	public static final String urlsearchPatientBill = "SearchPatientBill";
	public static final String urlSearchDeathPat = "SearchDeathPat";
	public static final String urlPreviousChequeReg = "PreviousChequeReg";
	public static final String urlDeleteCHK = "DeleteCHK";
	public static final String urlsavechequeDetail = "savechequeDetail";
	public static final String urlfetchDefLoundaryItem = "fetchDefLoundaryItem";
	public static final String urlsaveLaundryDetail = "saveLaundryDetail";
	public static final String urlDeleteLaundry = "DeleteLaundry";
	public static final String urlSearchLaundryItem = "searchLaundryItem";
	public static final String urlFetchLOwner = "fetchLOwner";
	public static final String urlFetchLOwnerID = "fetchLOwnerID";
	public static final String urlAddLOwner = "AddLOwner";
	public static final String urlDeleteLOwner = "deleteLOwner";
	public static final String urlSearchLOwner = "SearchLOwner";
	public static final String urlSearchPrevLoundaryBill = "searchPrevLoundaryBill";
	public static final String urlSaveLaundryBill = "SaveLaundryBill";
	public static final String urlFetchPrevLoundaryBill = "fetchPrevLoundaryBill";
	public static final String urlFetchLoundaryBill = "fetchLoundaryBill";
	public static final String urldeleteLBill = "deleteLBill";
	public static final String urlUpdatePrevBill = "UpdatePrevBill";
	public static final String urlfetchDefMMDates = "fetchDefMMDates";
	public static final String urldeleteMaintenanceMahineDate = "deleteMaintenanceMahineDate";
	public static final String urlsaveMaintenanceMahineDate = "saveMaintenanceMahineDate";
	public static final String urlfetchextraMItem = "fetchextraMItem";
	public static final String urlfetchextraMItemView = "fetchextraMItemView";
	public static final String urlsaveextraMaintenanceMahine = "saveextraMaintenanceMahine";
	public static final String urlsaveExtraMaintDates = "saveExtraMaintDates";
	public static final String urldeleteExtraMaintenanceMahine = "deleteExtraMaintenanceMahine";
	public static final String urlfetchMachineWithDate = "fetchMachineWithDate";
	public static final String urlfetchAllMachine = "fetchAllMachine";
	public static final String urlfetchAllMachinMeaintDateType = "fetchAllMachinMeaintDateType";
	public static final String urlupdateMaintMachineDate = "updateMaintMachineDate";
	public static final String urlsaveMaintMachineDate = "saveMaintMachineDate";
	public static final String urlfetchMainMachineMsainte = "fetchMainMachineMsainte";
	public static final String urlsaveMainMachineMsainte = "saveMainMachineMsainte";
	public static final String urlfetchMainMachineMsainteView = "fetchMainMachineMsainteView";
	public static final String urlgetSalaryDates = "getSalaryDates";
	public static final String urlfetchAllPrevSalaryDetails = "fetchAllPrevSalaryDetails";
	public static final String urlsearchPrevSalaryDetails = "searchPrevSalaryDetails";
	public static final String urlgetSalaryDetails = "getSalaryDetails";
	public static final String urlsaveEmpSalaryDetails = "saveEmpSalaryDetails";
	public static final String urlfetchPrevMacMaintence = "fetchPrevMacMaintence";
	public static final String urlfetchextraPrevMItem = "fetchextraPrevMItem";
	public static final String urlAddTrolleyItems = "AddTrolleyItems";
	public static final String urlfetchNursingTrolleyItem = "fetchNursingTrolleyItem";
	public static final String urlsaveNursingTrolleyItem = "saveNursingTrolleyItem";
	public static final String urlfetchCathTrolleyItem = "fetchCathTrolleyItem";
	public static final String urlsaveCathTrolleyItem = "saveCathTrolleyItem";
	public static final String urlsearchNursingTrolley = "searchNursingTrolley";
	public static final String urlsearchCathTrolley = "searchCathTrolley";
	public static final String urldeleteNursingTrolley = "deleteNursingTrolley";
	public static final String urldeleteCathTrolleyItem = "deleteCathTrolleyItem";
	public static final String urldeleteMachine = "deleteMachine";
	public static final String urlgetHrDetials = "getHrDetials";
	public static final String btnSaveTempDetails = "SaveTempDetails";
	public static final String btnfetchAllTempName = "fetchAllTempName";
	public static final String btnfetchAllSK = "fetchAllSK";
	public static final String btnfetchAllSym = "fetchAllSym";
	public static final String btnfetchSKDetails = "fetchSKDetails";
	public static final String btnsaveSKDetail = "saveSKDetail";
	public static final String saveSymDetail = "saveSymDetail";
	public static final String urlFetchDefHallType = "fetchHallType";
	public static final String btnSaveHallDetailsType = "SaveHallTypeDetails";
	public static final String btnDeleteHallType = "DeleteHallType";
	public static final String btnSearchHallType = "SearchHallType";
	public static final String btnFetchUserAccessView = "fetchUserAccessView";
	public static final String btnFetchAllEhatModule = "fetchAllEhatModule";
	public static final String btnSaveUserAccessDetails = "SaveUserAccessDetails";
	public static final String btnSaveOTDetails = "SaveOTDetails";
	public static final String btnfetchOTName = "fetchOTName";
	public static final String btnDeleteOT = "DeleteOT";
	public static final String btnSearchOT = "SearchOT";
	public static final String btnsaveCorporateAccount = "saveCorporateAccount";
	public static final String urlFetchAllVisitingDoc = "fetchAllVisitingDoc";
	public static final String urlUpdateVisitingDocFee = "UpdateVisitingDocFee";
	public static final String urlfetchAllAnesthetistDoc = "fetchAllAnesthetistDoc";
	public static final String urlUpdateAnesthetistDocFee = "UpdateAnesthetistDocFee";
	public static final String urlsearchDocFeeInfo = "searchDocFeeInfo";

	public static final String urlSavePTDetails = "SavePTDetails";
	public static final String urlfetchPTName = "fetchPTName";
	public static final String urlSearchPT = "SearchPT";
	public static final String urlDeletePT = "DeletePT";
	public static final String btnsaveHospitalDetails = "saveHospitalDetails";
	public static final String urlfetchHospitalDetails = "fetchHospitalDetails";
	public static final String urlSaveHospitalOwnerDetails = "saveHospitalOwnerDetails";
	public static final String urlFetchHospitalOwnerDetails = "fetchHospitalOwnerDetails";
	public static final String urlfetchDoctorSlotList = "fetchDoctorSlotList";
	public static final String urldeleteHospitalOwner = "deleteHospitalOwner";

	public static final String urlsaveDoctorSpeciality = "saveDoctorSpeciality";
	public static final String urlfetchDoctorSpeciality = "fetchDoctorSpeciality";

	public static final String urlOPDReceiptMaster = "OPDReceiptMaster";
	public static final String btnOPDReceiptMaster = "OPDReceiptComponant";
	public static final String btnsaveBedStateDetails = "saveBedStateDetails";
	public static final String urlfetchBedState = "fetchBedState";
	public static final String btnDeleteBedState = "DeleteBedState";

	public static final String btnSaveOTGroupDetails = "saveOTGroupDetails";
	public static final String urlFetchGroupDetails = "fetchGroupDetails";

	public static final String btnDeleteOTGroups = "deleteOTGroups";

	/********************* End Admin Constants ************************/

	/************************ Start PO Constants ************************/
	public static final String urlFetchDefDist = "FetchDefDist";
	public static final String urlFetchPrice = "FetchPrice";
	public static final String urlsaveOrder = "SaveOrder";
	public static final String urlFetchParOrderDet = "FetchParOrderDet";
	public static final String urlFetchDefSendDist = "FetchDefSendDist";
	public static final String urlUpdatePO = "UpdatePO";
	public static final String urlSearchOrder = "SearchOrder";
	public static final String urlClosePO = "ClosePO";
	public static final String urldeleteRowPO = "deleteRowPO";
	public static final String urlFetchUser = "FetchUser";
	public static final String urlchkOrderRec = "chkOrderRec";
	/************************ End PO Constants ************************/

	/******************** Start Operation constants ******************************/
	public static final String urlgetCathId = "getCathId";
	public static final String urlgetOperationType = "getOperationType";
	public static final String urlSaveOperationDetails = "SaveOperationDetails";
	public static final String urlSaveOperationDetailsFromModal = "SaveOperationDetailsFromModal";
	public static final String urlcheckQty = "checkQty";
	public static final String urlSaveRecPO = "SaveRecPO";
	public static final String urlFetchIPrice = "FetchIPrice";
	public static final String urlSendToStore = "SendToStore";

	public static final String urlSaveOperationSummary = "SaveOperationSummary";
	public static final String urlfetchOperationSummary = "fetchOperationSummary";
	public static final String urlgetPreAngiography = "getPreAngiography";
	public static final String urlsearchPreAngiography = "searchPreAngiography";
	public static final String urlgetOperationName = "getOperationName";
	public static final String urlgetDocName = "getDocName";
	public static final String urlDeleteOperation = "DeleteOperation";
	public static final String btnsaveCAReport = "saveCAReport";
	public static final String urlfetchCAReport = "fetchCAReport";
	public static final String urlsaveAngioplastyReport = "saveAngioplastyReport";
	public static final String urlgetPreAngioplasty = "getPreAngioplasty";
	public static final String urlscheduleOT = "scheduleOT";
	public static final String urlfetchOperationName = "fetchOperationName";
	//public static final String urlDisplayOperationPat = "DisplayOperationPat";
	public static final String urlfetchkits = "fetchkits";
	public static final String urlsterilizedKit = "sterilizedKit";
	public static final String urlsearchPreAngioplasty = "searchPreAngioplasty";
	public static final String urlFetchOTName = "fetchOTName";
	public static final String urlFeatchGrpCatWiseProCharge = "featchGrpCatWiseProCharge";
	public static final String urlSaveGrpCatWiseProCharge = "SaveGrpCatWiseProCharge";
	public static final String urlDeleteManageOperation = "deleteManageOperation";

	/******************** End Operation constants ******************************/

	/******************** Start Report constants ******************************/
	public static final String urlgetReportForTreatmentClosed = "getReportForTreatmentClosed";
	public static final String urlgetReportForRefBy = "getReportForRefBy";
	public static final String urlgetReport = "getReport";
	public static final String urlgetReportForOPDPatient = "getReportForOPDPatient";
	public static final String urlgetReportForOPDRefundReceipt = "getReportForOPDRefundReceipt";
	public static final String urlgetReportForDoctor = "getReportForDoctor";
	public static final String urlgetReportForDist = "getReportForDist";
	public static final String urlgetReportForIPDDoctor = "getReportForIPDDoctor";
	public static final String urlgetReportForOPDDoctor = "getReportForOPDDoctor";
	public static final String urlgetReportForOperDoctor = "getReportForOperDoctor";
	public static final String urlgetReportForRecItems = "getReportForRecItems";
	public static final String urlgetReportForSendItems = "getReportForSendItems";
	public static final String urlgetReportForDoctorInfo = "getReportForDoctorInfo";
	public static final String urlgetReportForDistInfo = "getReportForDistInfo";
	public static final String urlgetReportForOperInfo = "getReportForOperInfo";
	public static final String urlgetReportForOperationType = "getReportForOperationType";
	public static final String urlgetReportForIPDPatient = "getReportForIPDPatient";
	public static final String urlsetWard = "setWard";
	public static final String urlgetReportForWard = "getReportForWard";
	public static final String urlgetReportForMatPatient = "getReportForMatPatient";
	public static final String btnGetReportForDeadPatient = "getReportForDeadPatient";
	public static final String btnGetReportForChanneling = "getReportForChanneling";
	public static final String urlgetReportForInventory = "getReportForInventory";
	public static final String urlgetReportForOpInventory = "getReportForOpInventory";
	public static final String urlgetReportForAllPatient = "getReportForAllPatient";
	public static final String urlgetReportForPatTre = "getReportForPatTre";
	public static final String urlgetReportForDiscount = "getReportForDiscount";
	public static final String urlgetReportForTotalDiscount = "getReportForTotalDiscount";
	public static final String urlgetshowSearchPatReport = "showSearchPatReport";
	public static final String urlgetReportForBill = "getReportForBill";
	public static final String urlgetReportDiscountPatientBill = "getReportDiscountPatientBill";
	public static final String urlgetCaseRegister = "getCaseRegister";
	public static final String urlgetReportForCorpAcc = "getReportForCorpAcc";
	public static final String urlgetReportForVisitingDoctors = "getReportForVisitingDoctors";
	public static final String urlGetReportForAnesthetistDoctors = "GetReportForAnesthetistDoctors";
	public static final String urlgetPatientReport = "getPatientReport";

	public static final String urlGetReportForOwnerIpdBilling = "getReportForOwnerIpdBilling";
	public static final String urlgetReportForOpdtoipdconversion = "getReportForOpdtoipdconversion";
	
	public static final String urlgetReportForIpdActive = "getReportForIpdActive";
	
	public static final String urlgetReceptionistList = "getReceptionistList";
	public static final String urlgetReportForTotalPatient = "getReportForTotalPatient";
	/******************** End Report constants ******************************/

	/******************** Start Special Discount Constants *******************/
	public static final String urlNewDiscountId = "newDiscountID";
	public static final String btnSaveDiscount = "SaveDiscount";
	public static final String urlFetchDiscount = "fetchDiscount";
	public static final String btndeleteDiscount = "deleteDiscount";
	public static final String urlSearchDiscount = "searchDiscount";
	public static final String btnUpdateDiscount = "UpdateDiscount";
	public static final String urlFetchDiscountComponant = "fetchDiscountComponant";

	public static final String urlsaveCorporateAccountDiscount = "saveCorporateAccountDiscount";

	/******************** End Special Discount Constants *******************/

	public static final String urlsaveBillTowards = "saveBillTowards";
	public static final String urlgetBillTowards = "getBillTowards";
	public static final String urldispTowardsSearch = "dispTowardsSearch";
	public static final String urldeleteTowards = "deleteTowards";

	/********** Rmo treatment End *************************/
	public static final String urlEndRmoTreatment = "EndRmoTreatment";
	/*********** Rmo treatment end **********************/

	public static final String btnFetchAnesthesis = "fetchAnesthesis";

	public static final String btnFetchAnesthesisOnload = "fetchAnesthesisOnload";

	public static final String btnChangeNaForOperation = "changeNaForOperation";

	/************* ICD 10 Constants **********/
	public static final String btnSearchICD10 = "SearchICD10";
	public static final String btnfetchTempDetails = "fetchTempDetails";
	/************* ICD 10 Constants **********/
	public static final String btnsaveSalaryDetails = "saveSalaryDetails";
	public static final String btnsaveSalarySlip = "saveSalarySlip";
	public static final String urlgetSalarySlipForEmp = "getSalarySlipForEmp";
	public static final String urlFetchLeavesDetails = "FetchLeavesDetails";
	public static final String btnSaveLeavesDetails = "SaveLeavesDetails";
	public static final String btnUpdateLeavesDetails = "UpdateLeavesDetails";
	public static final String btncancelLeaveStatus = "cancelLeaveStatus";

	public static final String btnFetchCausalityPatients = "fetchCausalityPatients";
	public static final String btnFetchCausalityPatientByDate = "FetchCausalityPatientByDate";

	public static final String btnCausalityPatientSearch = "causalityPatientSearch";

	/************* Pathology **********/
	public static final String btngetLabPatTypes = "getLabPatTypes";
	public static final String btnsaveLabPatTypes = "saveLabPatTypes";
	public static final String btndeleteLabPatTypes = "deleteLabPatTypes";

	public static final String btngetDocChargeTypes = "getDocChargeTypes";
	public static final String btnsaveDocChargeTypes = "saveDocChargeTypes";
	public static final String btndeleteDocChargeTypes = "deleteDocChargeTypes";

	public static final String btngetLabOrgans = "getLabOrgans";
	public static final String btnsaveLabOrgans = "saveLabOrgans";
	public static final String btndeleteLabOrgans = "deleteLabOrgans";

	public static final String btnfeatchTeastUnderHeading = "featchTeastUnderHeading";

	public static final String btngetProfiles = "getProfiles";
	public static final String btnsaveLabProfile = "saveLabProfile";
	public static final String btndeleteLabProfiles = "deleteLabProfiles";

	public static final String btnfeatchProAndTest = "featchProAndTest";
	public static final String btnfeatchPrevLabTestOfPat = "featchPrevLabTestOfPat";

	public static final String btnSearchProAndTest = "SearchProAndTest";
	public static final String btnSaveLabFormula = "SaveLabFormula";
	public static final String btnfeatchLabFormulas = "featchLabFormulas";
	public static final String btnDeleteLabFormula = "DeleteLabFormula";
	public static final String btnSavePackages = "SavePackages";
	public static final String btnGetPackages = "GetPackages";

	/*************** Start Nitin *********************************************/
	public static final String btngetGroups = "getGroups";
	public static final String btnsaveGroups = "saveGroups";
	public static final String urlGetGroupID = "GetGroupID";
	public static final String btndeleteGroups = "deleteGroups";
	public static final String urlgetTestDash = "getTestDash";
	public static final String btnRemoveThemDept = "RemoveThemDept";
	public static final String btnRemoveThemSpl = "RemoveThemSpl";
	/*************** End Nitin *********************************************/

	/*************** Start sagar *********************************************/
	public static final String btnSaveOwnLabDetails = "saveOwnLabDetails";
	public static final String urlFetchOwnLabDetails = "fetchOwnLabDetails";
	public static final String btnFetchLabId = "fetchLabId";
	public static final String btnsaveSubLabDetails = "saveSubLabDetails";
	public static final String urlFetchSubLabDetails = "fetchSubLabDetails";
	public static final String btndeleteSublabs = "deleteSublabs";
	public static final String urlFetchSubTestId = "fetchSubTestId";
	public static final String urlgetTestForGroupId = "getTestForGroupId";
	public static final String urlsaveSubTestDetails = "saveSubTestDetails";
	public static final String urlfetchSubTestDetails = "fetchSubTestDetails";
	public static final String btnDeleteSubTest = "deleteSubTest";
	public static final String urlFetchTestId = "fetchTestId";
	public static final String urlSaveTestDetails = "saveTestDetails";
	public static final String btnDeletePathologyTest = "deletePathologyTest";
	public static final String btnSavePatientAssignedTests = "savePatientAssignedTests";
	public static final String urlFetchPatientAssignedTest = "fetchPatientAssignedTest";

	public static final String urlfetchRegPatientsForPathalogyTests = "fetchRegPatientsForPathalogyTests";
	public static final String btnSearchRegPatientsForPathologyTest = "searchRegPatientsForPathologyTest";
	public static final String btnsavePatientTestsRoutine = "savePatientTestsRoutine";

	public static final String btnRemoveAssignedTest = "removeAssignedTest";

	public static final String btnSearchPatientAssignedTest = "searchPatientAssignedTest";

	public static final String btnFetchRadiologyFiles = "fetchRadiologyFiles";

	public static final String btnRemoveRadiologyUploadFiles = "removeRadiologyUploadFiles";

	public static final String btnsaveRadiologyAssignedTests = "saveRadiologyAssignedTests";

	public static final String btnsaveCardiologyAssignedTests = "saveCardiologyAssignedTests";

	public static final String btnfetchCardiologyFiles = "fetchCardiologyFiles";

	/*************** End sagar *********************************************/

	// shambhu
	public static final String btnSaveUnitType = "SaveUnitType";
	public static final String urlfetchUnitType = "fetchUnitType";
	public static final String btnDeleteUnitType = "DeleteUnitType";
	public static final String btnSaveTestMethod = "SaveTestMethod";
	public static final String urlfetchTestMethod = "fetchTestMethod";
	public static final String btnDeleteTestMethod = "DeleteTestMethod";
	public static final String btnSaveTestSample = "SaveTestSample";
	public static final String urlfetchTestSample = "fetchTestSample";
	public static final String btnDeleteTestSample = "DeleteTestSample";
	public static final String btnSaveDoctorTechnician = "SaveDoctorTechnician";
	public static final String urlfetchDoctechnician = "fetchDoctechnician";
	public static final String btnDeleteDocTechnician = "DeleteDocTechnician";

	public static final String btnsaveCollectionCenter = "saveCollectionCenter";
	public static final String urlfetchCollectionCenter = "fetchCollectionCenter";
	public static final String btnDeleteCollectionCenter = "DeleteCollectionCenter";
	public static final String btnSaveLabTest = "SaveLabTest";
	public static final String urlfetchlabTest = "fetchlabTest";
	public static final String btnDeleteLabTest = "DeleteLabTest";
	public static final String urlgetPatientTestDash = "getPatientTestDash";
	public static final String btnviewTestforResult = "viewTestforResult";
	public static final String btnsavePatientTestsResult = "savePatientTestsResult";
	public static final String btnSaveAssignTests = "SaveAssignTests";
	public static final String btngetsearchPathologyTestDetails = "getsearchPathologyTestDetails";

	public static final String btnSaveDentalAssignServices = "SaveDentalAssignServices";
	public static final String btnFetchDentalServicesPat = "FetchDentalServicesPat";
	public static final String btnSaveCausalityAssignServices = "SaveCausalityAssignServices";
	public static final String btnFetchCasualtyServicesPat = "FetchCasualtyServicesPat";
	/************* Pathology **********/

	/***************** Start Pharmacy ************************/
	/******************** tanvir ******************/
	public static final String btnfetchAllManufacturer = "fetchAllManufacturer";
	public static final String btnsearchManufacturer = "searchManufacturer";
	public static final String btnSaveManufacturerDetails = "SaveManufacturerDetails";
	public static final String btndeleteManufacturerDetails = "deleteManufacturerDetails";
	/*********************************** husen ********************************/
	public static final String btnSaveWarehouseDetails = "SaveWarehouseDetails";
	public static final String btndeleteWarehouseDetails = "deleteWarehouseDetails";
	public static final String btnfetchAllitem = "fetchAllitem";
	public static final String btnSaveitemDetails = "SaveitemDetails";
	public static final String btnsearchItem = "searchItem";
	public static final String btndeleteItemDetails = "deleteItemDetails";

	public static final String btnfetchMinQuantityItems = "fetchMinQuantityItems";
	public static final String btnfetchExpiredItems = "fetchExpiredItems";

	public static final String btnDeleteBillCompDetails = "DeleteBillCompDetails";
	public static final String btnSavePharmacyNewPatBill = "SavePharmacyNewPatBill";
	public static final String btnFetchPatPharmaBillInfo = "FetchPatPharmaBillInfo";
	public static final String btnFeatchMedInvoiceforPat = "FeatchMedInvoiceforPat";
	public static final String btnSaveMedClinicDetail = "SaveMedClinicDetail";
	public static final String btnDeleteMedBillRec = "DeleteMedBillRec";
	public static final String btnSaveConsentForm = "saveConsentForm";
	public static final String btnfeatchAllConsentFormForTreatment = "featchAllConsentFormForTreatment";
	public static final String btnfeatchPreviousICFpat = "featchPreviousICFpat";
	/******************** tanvir ******************/
	/******************** shambhu ******************/
	public static final String btnSaveitemTypeName = "SaveitemTypeName";
	public static final String urlfetchItemtypeName = "fetchItemtypeName";
	public static final String btnDeleteItemType = "DeleteItemType";
	public static final String btnsearchItemtype = "searchItemtype";
	public static final String btnSaveStoreInfo = "SaveStoreInfo";
	public static final String urlfetchStoreInfo = "fetchStoreInfo";
	public static final String btndeleteStoreInfo = "deleteStoreInfo";
	public static final String btnsearchStore = "searchStore";
	public static final String urlFetchItemDetails = "FetchItemDetails";
	public static final String urlPharmacyBillId = "PharmacyBillId";
	public static final String btnSavePharmacyBill = "SavePharmacyBill";
	public static final String urlfetchPrePharmacyBill = "fetchPrePharmacyBill";
	public static final String urlviewPrePharmacyBillTreatment = "viewPrePharmacyBillTreatment";
	public static final String urlserchPharmacypatientPreBill = "serchPharmacypatientPreBill";
	public static final String urlgetPrescriptedPatient = "getPrescriptedPatient";

	/**************** Richa code for HR salarydetails *****************/

	public static final String urlfetchHRPrevSalaryDetails = "fetchHRPrevSalaryDetails";

	/****************** End Salary details ****************************/

	/****************** shambhu **********************/
	/***************** End Pharmacy ************************/

	/********************* Start ICD 10 Code ******************/

	public static final String urlfetchICD10Level1 = "fetchICD10Level1";
	public static final String urlsaveICDDiagnosisLevel1 = "saveICDDiagnosisLevel1";

	public static final String urlsaveICDDiagnosisLevel2 = "saveICDDiagnosisLevel2";
	public static final String urlsaveICDDiagnosisLevel3 = "saveICDDiagnosisLevel3";

	/****************** End ICD 10 code **********************/

	/************************ Fetch Doctor specilization And Departments **************************/
	public static final String urlfetchDoctorSpecilizations = "fetchDoctorSpecilizations";
	public static final String urlfetchHospitalDepartments = "fetchHospitalDepartments";
	public static final String urlfetchIPDPatientsForBedward = "fetchIPDPatientsForBedward";
	public static final String urlfetchVisitingPatient = "fetchVisitingPatient";
	public static final String urlsaveVisitingPatients = "saveVisitingPatients";
	public static final String urlsearchIPDPatientsForBedward = "searchIPDPatientsForBedward";
	public static final String urlsearchVisitingPatient = "searchVisitingPatient";

	public static final String urlfeatchDignoPatBill = "featchDignoPatBill";

	/*****************************************************************************************/

	/************ Hospital Holiday ***************************/

	public static final String btnSaveHospitalHoliday = "saveHospitalHoliday";

	public static final String btnFetchHospitalHoliday = "fetchHospitalHoliday";

	public static final String btndeleteHospitalHoliday = "deleteHospitalHoliday";

	/*************** Hospital Holiday *************************/

	/******************* Utility Servlet Constatnts ************************************/
	public static final String urlGenerateSyncToken = "GenerateSyncToken";

	/************************* utility servlet constatnt ************************************/

	/****************** IPD SERVICES **********************************************/

	public static final String urlsaveIPDServices = "saveIPDServices";

	public static final String urlfetchIpdServices = "fetchIpdServices";
	public static final String urlfetchDoctorTests = "fetchDoctorTests";
	public static final String urlDeleteIPDServices = "deleteIPDServices"; // Abhijit
																			// Radke

	/******************** End IPD SErvices ***************************************/

	public static final String urlcopyCurrentOrderForm = "copyCurrentOrderForm";

	/** **************Richa Code For Dynamic patient title************** */
	public static final String urlSavePatientTitle = "savePatientTitle";
	public static final String urlFetchPatientTitle = "defaultFetchPatientTitle";
	public static final String urlDeletePatientTitle = "deletePatientTitle";
	public static final String urlSaveHallAccountTypeDetails = "SaveHallAccountTypeDetails";
	/** **************End************************************ */

	/** ***********Jyoti code for temp. patient data storage************** */
	public static final String urlsaveBedCharges = "saveBedCharges";
	public static final String urlFetchBedCharges = "fetchBedCharges";
	public static final String urldeleteSymptoms = "deleteSymptoms";
	public static final String urlDisplayTopPatientForConsent = "DisplayTopPatientForConsent";
	public static final String urlsaveReport = "saveReport";
	public static final String urlfetchReport = "fetchFormDetails";
	public static final String urlremoveDiv = "removeDiv";
	public static final String urlfetchChartName = "fetchChartName";
	public static final String urlfetchChartNameNew = "fetchChartNameNew";
	public static final String urlsetAddChart = "setAddChart";
	public static final String urlsaveChartName = "saveChartName";
	public static final String urlsaveChartReport = "saveChartReport";
	public static final String urlsaveNursingChart = "saveNursingChart";
	public static final String urlfetchDocuments = "fetchDocuments";
	public static final String urldefaultChartView = "defaultChartView";
	public static final String urldefaultChartSlaveView = "defaultChartSlaveView";
	public static final String urldefaultNursingChart = "defaultNursingChart";
	public static final String urldeleteChartName = "deleteChartName";
	public static final String urlsaveHospitalAccDetails = "saveHospitalAccDetails";
	public static final String urlfetchHospitalAccDetails = "fetchHospitalAccDetails";
	public static final String urldeallocateBedAtIPD = "deallocateBedAtIPD";
	public static final String urlPatientDashboardForHaemodialysis = "PatientDashboardForHaemodialysis";
	/** ********************End ************************************* */
	/** **************Richa Code For IPD Expense Voucher************** */

	public static final String urlsaveExpenseVoucher = "saveExpenseVoucher";
	public static final String btndeleteExpenseVoucher = "deleteExpenseVoucher";
	/** ********************End ************************************* */
	/** *****************Manage Claim******************************** */
	public static final String urlfetchManageClaim = "fetchManageClaim";
	public static final String urlfetchClaimManage = "fetchClaimManage";
	public static final String urlfetchCompanyDetails = "fetchCompanyDetails";
	public static final String urlfetchInshurPatient = "fetchInshurPatient";
	public static final String urlsaveClaimDetail = "saveClaimDetail";
	/** **********************END*********************************** */

	/** **************Richa Code For Pre Anaesthetic Assess************** */
	public static final String urlsavePreAnaestheticDetails = "savePreAnaestheticDetails";
	public static final String urlfetchAnaestheticDetails = "fetchAnaestheticDetails";
	public static final String urlsaveConductAnaesthesia = "saveConductAnaesthesia";
	// public static final String urlfetchAddConductAnaesthesia = "fetchAddConductAnaesthesia";
	public static final String urlcancelConductAnaesthesia = "cancelcancelConductAnaesthesia";
	public static final String urlfetchpreviousAnaestheticDetails = "fetchpreviousPreAnaestheticDetails";
	public static final String urlfetchPrevAddConductAnaesthesia = "fetchPrevAddConductAnaesthesia";

	/** ********************End ************************************* */
	/** **************Richa Code For Discharge Process************** */
	public static final String urlsaveDischargeProcess = "saveDischargeProcess";
	public static final String urlfetchDischargeProcess = "fetchDischargeProcess";
	/** ********************End ************************************* */
	/*********************** Mohan Code For Auto Database Backup **********/

	public static final String BackupPath = "D://";
	public static final String DatabaseUser = "root";

	public static final String DatabaseName = "EhatSterling";

	public static final String DatabasePassword = "root";
	public static final long BackupFreqHours = 4;
	public static final long BackupFrequency = 1000 * 60;// * 60 *
															// BackupFreqHours;
	public static final int InitialBackupSeconds = 30;
	public static final int InitialBackup = 1000 * InitialBackupSeconds;
	/** HR Salary Constant **/
	public static final String btnSaveHrSalaryComponent = "saveHrSalaryComponent";
	public static final String urlFetchHrSalaryComponent = "fetchHrSalaryComponent";

	/** End **/
	/************** Customize Template *************************/
	public static final String urlfetchCustomizeTemplateList = "fetchCustomizeTemplateList";
	public static final String urlsaveCustomizeTemplate = "saveCustomizeTemplate";
	/********** End ********/
	/***************** RIS Template ******************************/
	public static final String urlfetchRisTemplateList = "fetchRisTemplateList";
	public static final String urlsaveRisTemplate = "saveRisTemplate";
	public static final String urlfetchRisTestList = "fetchRisTestList";
	public static final String urlfetchRisType = "fetchRisType";
	public static final String urlsavePhoto = "savePhoto";
	public static final String urlsaveCrtReportTemp = "saveCrtReportTemp";

	public static final String urlfetchradiologytest = "fetchradiologytest";

	public static final String btnuploadrisfile = "uploadrisfile";
	public static final String urlfetchRisViewReportTemp = "fetchRisViewReportTemp";
	/***************** End ******************************/

	/********* Manual Billing ***************/
	public static final String urldeleteIpdBillingTests = "deleteIpdBillingTests";
	public static final String urldeleteIpdBillingPhysiotherapyTests = "deleteIpdBillingPhysiotherapyTests";
	public static final String urlfeatchIpdBillOperationCharges = "featchIpdBillOperationCharges";
	public static final String urldeleteIpdBillingPathologyTests = "deleteIpdBillingPathologyTests";
	public static final String urldeleteIpdBillingConsumable = "deleteIpdBillingConsumable";
	public static final String urldeleteIpdBillingGasAndMonitor = "deleteIpdBillingGasAndMonitor";
	public static final String urldeleteIpdBillingBedSideProcedure = "deleteIpdBillingBedSideProcedure";
	public static final String urldeleteIpdBillingInstAndEquip = "deleteIpdBillingInstAndEquip";
	public static final String urldeleteIpdBillingDoctorRound = "deleteIpdBillingDoctorRound";
	public static final String urldeleteIpdBillingPharmacyInvoice = "deleteIpdBillingPharmacyInvoice";

	public static final String urldeleteIpdBillingOperation = "deleteIpdBillingOperation";

	public static final String urldeleteIpdBillingOperationTheater = "deleteIpdBillingOperationTheater";
	public static final String urldeleteIpdBillingSurgeryConsumable = "deleteIpdBillingSurgeryConsumable";
	public static final String urlsaveReasonofCancel = "saveReasonofCancel";
	public static final String urlGenerateInvoiceNo = "GenerateInvoiceNo";
	public static final String urldeleteIpdBillingSurgeryServices = "deleteIpdBillingSurgeryServices";
	/********* Manual Billing **************/
	/********* richa code for user change password ***************/
	public static final String urlsavechangedUserPassword = "savechangedUserPassword";
	/********* ******end of code ***************/
	public static final String urlgetMaxExpenseID = "getMaxExpenseID";
	/********* Ipd Bill Pkg ***************/
	public static final String urlfeatchAllIBPforDocSpec = "featchAllIBPforDocSpec";
	public static final String urlfeatchIBPDetails = "featchIBPDetails";
	public static final String urlSaveIpdBillPkg = "SaveIpdBillPkg";
	/********* Ipd Bill Pkg ***************/

	public static final String urlgetDoctorNameList = "getDoctorNameList";
	public static final String urlgetDoctorTimeList = "getDoctorTimeList";

	/********* Abhijit Radke and Kavita code for user Save Sponsored Details ***************/
	public static final String btnSaveSponsoredDetails = "saveSponsoredDetails";
	public static final String urlFetchSponsoredDetails = "fetchSponsoredDetails";

	public static final String btnEditSponsoredDetails = "editSponsoredDetails";
	public static final String btnDeleteSponsoredDetails = "deleteSponsoredDetails";

	public static final String urlsaveDoctorSlotTime = "saveDoctorSlotTime";

	public static final String urlFetchSponsredNameBySponserType = "fetchSponsredNameBySponserType";
	public static final String urlfetchCompanyNameBySponserType = "fetchCompanyNameBySponserType";

	public static final String btnSaveSponsredDetails = "saveSponsredDetails";

	public static final String btnChangePatientSponser = "changePatientSponser";

	public static final String urlfetchTestType = "fetchTestType"; // Author :
																	// nIKHIL;
																	// Date :
																	// 15-9-2014;
	public static final String btnUpdateBodyPart = "UpdateBodyPart"; // Author :
																		// nIKHIL;
																		// Date
																		// :
																		// 15-9-2014;
	public static final String btnDeleteBodyPart = "deleteBodyPart"; // Author :
																		// nIKHIL;
																		// Date
																		// 15-9-2014

	public static final String urlgetPatientDetails = "getPatientDetails";

	public static final String btnSaveIpdBillParticular = "saveIpdBillParticular";
	public static final String btnEditIpdBillParticular = "editIpdBillParticular";

	public static final String fetchTestForDashboard = "fetchTestForDashboard";

	public static final String fetchAllRadiologyDetail = "fetchAllRadiologyDetail";

	public static final String urlfetchtestrisdetails = "fetchtestrisdetails";

	public static final String urlfetchRisImage = "fetchRisImage";

	public static final String urlfetchradiotest = "fetchradiotest";

	public static final String urlfetchimagetest = "fetchImageTest";

	public static final String btnSavePrescription = "savePrescription"; // Author
																			// :
																			// nIKHIL;
																			// Date
																			// 24-9-2014
	public static final String btnFetchPrescription = "fetchPrescription"; // Author
																			// :
																			// nIKHIL;
																			// Date
																			// 25-9-2014
	public static final String btndeletePrescription = "deletePrescription"; // Author
																				// :
																				// nIKHIL;
																				// Date
																				// 10-2-2014

	public static final String btnSaveGroup = "saveGroup";
	public static final String setRadiologyDetails = "setRadiologyDetails";
	public static final String SetInvestigationDetails = "SetInvestigationDetails";

	public static final String btnSaveAssessmentOpd = "saveAssessmentOpd"; // Author
																			// :
																			// nIKHIL;
																			// Date
																			// :
																			// 3-10-2014
	public static final String btnFetchAssessment = "fetchAssessment"; // Author
																		// :
																		// nIKHIL;
																		// Date
																		// :
																		// 6-10-2014
	public static final String btndeleteAssessment = "deleteAssessment"; // Author
																			// :
																			// nIKHIL;
																			// Date
																			// :
																			// 7-10-2014

	// Yogesh
	public static final String btnSaveOpdBillParticular = "SaveOpdBillParticular";
	public static final String fetchAllOpdBillElements = "FetchOpdBillElements";
	// End Yogesh

	public static final String btnFetchBodyPart = "fetchBodyPart"; // Author :
																	// nIKHIL;
																	// Date :
																	// 9-10-2014
	public static final String btnSaveEditInvstTest = "saveEditInvstTest"; // Author
																			// :
																			// nIKHIL;
																			// Date
																			// :
																			// 9-10-2014
	public static final String btnFetchInvstTest = "fetchInvstTest"; // Author :
																		// nIKHIL;
																		// Date
																		// :
																		// 9-10-2014
	public static final String btnDeleteInvstTest = "deleteInvstTest"; // Author
																		// :
																		// nIKHIL;
																		// Date
																		// :
																		// 7-10-2014

	public static final String urlgetBillable = "getBillable";
	public static final String urlupdateBillableBed = "updateBillableBed";

	public static final String btnfetchDoctorHospital = "fetchDoctorHospital";

	public static final String btnsaveCasualityAssignedTests = "saveCasualityAssignedTests";

	public static final String fetchCasualityTestNameById = "fetchCasualityTestNameById";

	public static final String btnDeleteCPOE_Test = "deleteCPOE_Test";

	public static final String btnSaveIPDDischargePlan = "saveIPDDischargePlan";
	public static final String urlFetchIPDDischargePlan = "fetchIPDDischargePlan";
	public static final String urlFetchDischargeCode = "fetchDischargeCode";

	public static final String urlSaveEditIPDDiscount = "saveEditIPDDiscount";
	public static final String urlDeleteIPDDiscount = "deleteIPDDiscount";
	public static final String urlDeleteReceipt = "deleteReceipt";

	public static final String fetchReceiptComponent = "fetchReceiptComponent";

	public static final String urlDeletePerticular = "deletePerticular";

	public static final String urlSaveEditOperationTeam = "saveEditOperationTeam";
	public static final String urlFetchOperationTeamList = "fetchOperationTeamList";

	public static final String urlDeleteOperationTeam = "deleteOperationTeam";
	public static final String urlScheduleOperation = "scheduleOperation";
	public static final String urlUpdateOperationBillCharges = "updateOperationBillCharges";
	public static final String btnSaveAllergyAlerts = "saveAllergyAlerts";
	public static final String urlFetchAllergyAlerts = "fetchAllergyAlerts";
	public static final String btnDeleteAllergyAlerts = "deleteAllergyAlerts";

	public static final String urlFetchSetDoctorSpecilizations = "fetchSetDoctorSpecilizations";
	public static final String urlFetchCustomizeTemplates = "fetchCustomizeTemplates";

	public static final String btnsavefollowUpForPatient = "savefollowUpForPatient";
	public static final String btnSaveEditNewChartDetails = "saveNewChartDetails";
	public static final String urlGetExistingInputCharts = "getExistingInputCharts";
	public static final String deleteInputOutputChartDetails = "deleteInputOutputChartDetails";
	public static final String defaultChartNames = "defaultChartNames";

	public static final String btnSaveAdvice = "saveAdvice";
	public static final String urlFetchAdvice = "fetchAdvice";
	public static final String urlDeleteAdvice = "deleteAdvice";

	public static final String urlDischargeSummaryList = "dischargeSummaryList";
	public static final String urlOperatianSummaryList = "operatianSummaryList";
	public static final String urlOpdPatientBillDetails = "opdPatientBillDetails";

	public static final String btnSaveReportInstruction = "saveReportInstruction";
	public static final String urlFetchReportInstruction = "fetchReportInstruction";
	public static final String btnDeleteReportInstruction = "deleteReportInstruction";

	public static final String btnSavePCTreatmentInstruction = "savePCTreatmentInstruction";
	public static final String urlFetchPCTreatmentInstruction = "fetchPCTreatmentInstruction";
	public static final String btnDeletePCTreatmentInstruction = "deletePCTreatmentInstruction";

	public static final String btnSaveIndividualTreatmentInstruction = "saveIndividualTreatmentInstruction";
	public static final String urlFetchIndividualTreatmentInstruction = "fetchIndividualTreatmentInstruction";

	public static final String urlSaveAgreement = "saveAgreement";
	public static final String urlFetchCompanyAgreementDetails = "fetchCompanyAgreementDetails";

	public static final String btnSaveCKEditorDocterDesk1 = "saveCKEditorDocterDesk1";
	public static final String urlFetchCKEditorDocterDesk1 = "fetchCKEditorDocterDesk1";
	public static final String urlDeleteCompanyAgreement = "deleteCompanyAgreement";

	public static final String urlFetchPatientDataByOPD_ER_IPD = "fetchPatientDataByOPD_ER_IPD";
	public static final String FetchPrevAmt = "fetchPrevAmt";
	public static final String btnSaveRefundReceiptDetails = "saveRefundReceiptDetails"; 
	public static final String urlFetchRefundReceiptDetails = "fetchRefundReceiptDetails";
	public static final String urlDeleteRefundReceiptDetails = "deleteRefundReceiptDetails";
	public static final String urlFetchReceiptComponentByOpdBillId = "fetchReceiptComponentByOpdBillId";

	public static final String urlFetchBillDetailsByTreatmentID = "fetchBillDetailsByTreatmentID";
	public static final String urlfetchPolicyNameByCompanyName = "fetchPolicyNameByCompanyName";

	public static final String urlFetchPreviousTreatmentsByTreatmentID = "fetchPreviousTreatmentsByTreatmentID";
	public static final String urlsaveIPDDoctorDiscount = "saveIPDDoctorDiscount";

	/****************************************** Billing ****************************************************/
	/*************************************** Package Bill-Start ********************************************/
	// Touheed
	public static final String btnInsertPackageDetails = "insertPackageDetails";
	public static final String fetchGetNextPackageId = "getNextPackageId";

	// Fetching created by from session objeect
	public static final String urlfetchCreatedBy = "fetchCreatedBy";

	// fetching Package MasterList

	public static final String fetchPackageMaster = "fetchPackageMaster";

	// search package (18-Sep-2015)
	public static final String btnSearchPackage = "searchPackage";

	// Delete Package Master(16-sep-2015)
	public static final String btnDeletePackageMaster = "deletePackageMaster";
	/*********************************************** Package Bill - End *******************************************************/
	public static final String urlsearchGroupDetails = "searchGroupDetails";
	public static final String urlsaveRisPatTemp = "saveRisPatTemp";

	// code by kavita
	/******************** Start channeling constants ******************************/
	public static final String urlDisplayExtDoc = "DisplayExtDoc";
	public static final String urlSaveReferTo = "SaveReferTo";
	public static final String urlNewDocID = "newDocID";
	public static final String urlSaveReferToDoc = "SaveReferToDoc";
	public static final String urlsearchDoctor = "searchDoctor";
	public static final String urldeleteDoctor = "deleteDoctor";
	public static final String urlgetRefDoctors = "getRefDoctors";
	public static final String btnsaveChannelHospitaldetails = "saveChannelHospitaldetails";
	public static final String urlDisplayExistingChannelHospital = "DisplayExistingChannelHospital";
	public static final String urlDisplayNewHospitalID = "newHospitalID";
	public static final String urldeleteChannelHospital = "deleteChannelHospital";
	public static final String btnsearchHospitalDetails = "searchHospitalDetails";
	/******************** End channeling constants ******************************/

	public static final String urlSaveInvTestHallWiseCharges = "saveInvTestHallWiseCharges";
	public static final String urlSaveServicesHallWiseCharges = "saveServicesHallWiseCharges";
	public static final String urlSaveLabTestHallWiseCharges = "saveLabTestHallWiseCharges";
	public static final String urlSaveLabProfileHallWiseCharges = "saveLabProfileHallWiseCharges";
	public static final String urlSaveLabPackageHallWiseCharges = "saveLabPackageHallWiseCharges";
	public static final String urlsaveIPDDischargeSummaryTemplate = "saveIPDDischargeSummaryTemplate";
	public static final String urlsaveIPDDischargeSummaryTemplatePhyicalDischarge = "saveIPDSummaryTemplatePhyicalDischarge";
	public static final String urlfetchIPDDischargeSummaryTemplate = "fetchIPDDischargeSummaryTemplate";
	public static final String urlfetchPatientAdmissionNote = "fetchPatientAdmissionNote";
	public static final String urlfetchOTNotes = "fetchOTNotes";
	public static final String urlsaveAutoDischargeSummary = "saveAutoDischargeSummary";
	public static final String btnsavePhysiotherapyAssignedTests = "savePhysiotherapyAssignedTests";
	public static final String btnsaveOtherServicesAssignedTests = "saveOtherServicesAssignedTests";
	public static final String urlfetchRouteMasterID = "fetchRouteMasterID";
	public static final String btnsaveRouteType = "saveRouteType";
	public static final String btndeleteRouteType = "deleteRouteType";
	public static final String urlfetchPreperationsList = "fetchPreperationsList";
	public static final String urlfetchRouteTypeList = "fetchRouteTypeList";
	public static final String urlfetchUnitTypeList = "fetchUnitTypeList";
	public static final String btnsavePeadiatricMedicine = "savePeadiatricMedicine";
	public static final String urlfetchAllMedicationMasterList = "fetchAllMedicationMasterList";
	public static final String urlfetchInvstTestForTPAhallwiseCharges = "fetchInvstTestForTPAhallwiseCharges";
	public static final String urlfetchIPDServicesForTPAhallwiseCharges = "fetchIPDServicesForTPAhallwiseCharges";
	public static final String urlloadPathologyTestForTPA = "loadPathologyTestForTPA";
	public static final String urlloadPathologyPackagesForTPA = "loadPathologyPackagesForTPA";
	public static final String urlFetchOPDPatientCount = "fetchOPDPatientCount";
	public static final String urlFetchCurrentUserDetails = "fetchCurrentUserDetails";
	public static final String urlFetchPatientCountForDashboard = "fetchPatientCountForDashboard";
	public static final String urlFetchOPDConsultantDetails = "fetchOPDConsultantDetails";
	public static final String urlgetAllReportForCollectionSummary = "getAllReportForCollectionSummary";
	public static final String urlgetAllReportForPatientDetails = "getAllReportForPatientDetails";
	public static final String urlgetAllReportForPatientDischargeSummary = "getAllReportForPatientDischargeSummary";
	public static final String urlgetAllReportForDiagnosticSummary = "getAllReportForDiagnosticSummary";
	public static final String urlgetAllReportForRefundSummary = "getAllReportForRefundSummary";
	public static final String urldeleteMaterialUsed = "DeleteMaterialUsed";
	public static final String urlupdateAdmissionNote = "updateAdmissionNote";
	public static final String fetchIPDSecurityDepositDetails = "fetchIPDSecurityDepositDetails";
	public static final String refundSecurityDepositToPatient = "refundSecurityDepositToPatient";
	public static final String convertSecurityDepositToAdvance = "convertSecurityDepositToAdvance";
	public static final String convertAdvanceInSecurityDeposit = "convertAdvanceInSecurityDeposit";
	public static final String urlfetchPatientSponsorDetailsForMarkVisit = "fetchPatientSponsorDetailsForMarkVisit";
	public static final String urlfetchIPDPatientsForManualDischargeSummary = "fetchIPDPatientsForManualDischargeSummary";
	public static final String urlfetchIPDPatientsForAutoDischargeSummary = "fetchIPDPatientsForAutoDischargeSummary";
	public static final String urlfetchPatientsManualDischargeSummary = "fetchPatientsManualDischargeSummary";
	public static final String urlsaveCommonAdvanceAmount = "saveCommonAdvanceAmount";
	public static final String urlfetchCommonAdvanceDetails = "fetchCommonAdvanceDetails";
	public static final String urlpostCommonAdvanceDetails = "postCommonAdvanceDetails";
	public static final String urlconvertToGeneralBill = "convertToGeneralBill";
	public static final String payPreviousPendingAmountAndPrintReceipt = "payPreviousPendingAmountAndPrintReceipt";
	public static final String urldeactivateDatabaseAccess = "deactivateDatabaseAccess";
	public static final String btnCheckPreviousRefundOnSameReceipt = "checkPreviousRefundOnSameReceipt";
	public static final String urlsaveBillMasterDetails = "saveBillMasterDetails";
	// end code by kavita

	// Touheed Pediatric Medicine Master
	public static final String urlfetchCompanyList = "fetchCompanyList";
	public static final String fetchPMedicineMaster = "fetchPMedicineMaster";
	public static final String btnDeletePMedicineMaster = "deletePMedicineMaster";
	// end code by Touheed

	// Touheed Code for Prescription Instruction
	public static final String urlSavePrescriptionInstruction = "savePrescriptionInstruction";
	public static final String fectchAllPrescriptionInstruction = "fectchAllPrescriptionInstruction";
	public static final String deletePrescriptionInstruction = "deletePrescriptionInstruction";
	public static final String fetchPrescriptionInstructionSearch = "fetchPrescriptionInstructionSearch";

	// Touheed Code for Radiation Master 09-Sep-2015
	public static final String fetchGetNextRadiationId = "getNextRadiationId";
	public static final String SaveRadiation = "saveRadiation";
	public static final String FectchRadiationMaster = "fectchRadiationMaster";
	public static final String DeleteRadiation = "deleteRadiation";

	// Touheed code for Radiotherapy in Doector Desk 2
	public static final String SaveRadiotherapy = "saveRadiotherapy";
	public static final String FectchAllRadiotherapy = "fectchAllRadiotherapy";
	public static final String DeleteRadiotherapy = "deleteRadiotherapy";

	// Touheed code for geting package name and package id after selcting ward
	public static final String GetPackageForHall = "getPackageForHall";

	/************************************************************************** Maintenance *******************************************/

	public static final String urlsaveMaintainanceMachin = "saveMaintainanceMachin";
	public static final String urleditMaintainenceSchedule = "editMaintainenceSchedule";
	public static final String urlgetNextMachinCodeId = "getNextMachinCodeId";
	public static final String urlupdateMaintainance = "updateMaintainance";
	public static final String urlsaveAssetsPreRequisites = "saveAssetsPreRequisites";
	public static final String urlchangeDateOnCheked = "changeDateOnCheked";
	public static final String urlupdateToNewMaintanence = "updateToNewMaintanence";
	public static final String urlfetchAssetItemDetail = "fetchAssetItemDetail";
	public static final String urlGetInHouseDoctors = "getInHouseDoctors";
	public static final String urlSaveBMIFromDoctorDesk = "saveBMIFromDoctorDesk";

	public static final String urlFetchDocPrescriptionTemplateByID = "fetchDocPrescriptionTemplateByID";
	public static final String saveUpdateDocPrescriptionTemplateByID = "saveUpdateDocPrescriptionTemplateByID";

	public static final String saveUpdatePrescriptionDocTemplateMed = "saveUpdatePrescriptionDocTemplateMed";
	public static final String deleteDocPrescriptionTemplateMedicine = "deleteDocPrescriptionTemplateMedicine";
	public static final String btnusePrepDocTempForTreatment = "usePrepDocTempForTreatment";
	public static final String btndeletePrepDocTemp = "deletePrepDocTemp";

	/************************************************** Complaint *******************************************/
	public static final String urlGetNextTicketID = "getNextTicketID";
	public static final String urlsaveComplaint = "saveComplaint";
	public static final String urlFetchComplaints = "FetchComplaints";
	public static final String urlFetchComplaintsFrTktManagementOnLoad = "FetchComplaintsFrTktManagementOnLoad";
	public static final String urlFetchComplaintsDetailFrTktMngmentSearch = "fetchComplaintDetailFrTktMngmentSearch";
	public static final String urlSaveCommentOnTktMngMent = "saveCommentOnTktMngMent";
	public static final String urlsaveCommentOnComplaints = "saveCommentOnComplaints";

	public static final String btnsaveAddnewOrUpdateExistingTemplate = "saveAddnewOrUpdateExistingTemplate";

	public static final String urlFetchStandardAndPatientBMIDetails = "urlFetchStandardAndPatientBMIDetails";
	public static final String saveUpdateFetchDeleteImmunization = "saveUpdateFetchDeleteImmunization";
	public static final String generateImmunizationChartForPatient = "generateImmunizationChartForPatient";
	public static final String saveUpdateVaccinationPatientTreatment = "saveUpdateVaccinationPatientTreatment";

	/******************************************** update admin charges ********************************************/
	public static final String updateAdminCharges = "updateAdminCharges";
	public static final String getAdmincharges = "getAdmincharges";
	/******************************************** update admin charges ********************************************/
	public static final String UpdateDischargeDate = "UpdateDischargeDate";
	public static final String getPatientDischargeDate = "getPatientDischargeDate";

	public static final String fetchPreviousBillingHistoryByPid = "fetchPreviousBillingHistoryByPid";

	// Touheed code for geting package name and package id after selcting ward
	public static final String GetHallAndBed = "getHallAndBed";

	/******************** Update digital signature image *************/
	public static final String UrlSaveDigitalSignatureDetails = "saveDigitalSignatureDetails";
	public static final String UrlfetchOnLoadDigitalSignatureImageUtil = "fetchOnLoadDigitalSignatureImage";

	/******************* Manage claim **************************/
	public static final String UrlAutoPatientNameFrPreAuth = "autoPatientNameFrPreAuth";

	/********************** Total Discount Patient ****************/
	public static final String UrlgetReportForTotalDischargePatient = "getReportForTotalDischargePatient";

	/********************** DashBoard admission count ***************/
	public static final String UrlFetchAdmissionCount = "FetchAdmissionCount";
	public static final String UrlFetchAdmissionPercentageCount = "FetchAdmissionPercentageCount";

	/*********************** Nursing Notes Master **********************************/
	// @by:Touheed @date:18-Jan-2016
	public static final String urlsaveNursingNotes = "saveNursingNotes";
	public static final String urlfetchAllNursingNotes = "fetchAllNursingNotes";
	public static final String btndeleteNursingNotes = "deleteNursingNotes";
	public static final String urlgetNextNursingNotesId = "getNextNursingNotesId";
	/*********************** Nursing Notes Master **********************************/

	// do not change the string. billing logic is written on it.
	// same in bill.js: var creditReceiptString =
	// "Credit Receipt Against Receipt No. ";
	public static final String creditReceiptString = "Credit Receipt Against Receipt No. ";

	/****************************** DIstrict,Taluka,city(27-Jan-2016) ******************/
	public static final String btnFetchDistrictID = "fetchDistrictID";
	public static final String btnfetchDistrict = "fetchDistrict";
	public static final String btnUpdateDistrict = "UpdateDistrict";
	public static final String btnDeleteDistrict = "deleteDistrict";
	public static final String btnsearchDistrict = "searchDistrict";

	/********** Taluka ******/
	public static final String btnfetchTaluka = "fetchTaluka";
	public static final String btnFetchTalukaID = "fetchTalukaID";
	public static final String urlfetchDistrictList = "fetchDistrictList";
	public static final String btnUpdateTaluka = "UpdateTaluka";
	public static final String btnDeleteTaluka = "deleteTaluka";
	public static final String btnsearchTaluka = "searchTaluka";

	/******************* @author husenbadashah @since 28/1/2016 **************/
	public static final String UrlgetReportForTotalCollectionForPatients = "getReportForTotalCollectionForPatients";
	public static final String UrlgetReportForOPDPatientDue = "getReportForOPDPatientDue";

	public static final String UrlgetReportForIPDPatientallDue = "getReportForIPDPatientallDue";
	/******************* City ********************/

	public static final String btnUpdateCity = "UpdateCity";
	public static final String btnFetchCityID = "fetchCityID";
	public static final String urlfetchTalukaList = "fetchTalukaList";
	public static final String btnfetchCity = "fetchCity";
	public static final String btnDeleteCity = "deleteCity";
	public static final String btnsearchCity = "searchCity";

	public static final String urlfetchCityList = "fetchCityList";

	public static final String UrlgetReportForDiagonosisPatientDue = "getReportForDiagonosisPatientDue";
	public static final String UrlgetReportForIPDPatientDue = "getReportForIPDPatientDue";

	/********************************** State Masters(4 Feb 2016) ***********************/
	public static final String btnFetchStateID = "fetchStateID";
	public static final String btnfetchState = "fetchState";
	public static final String btnUpdateState = "UpdateState";
	public static final String btnDeleteState = "deleteState";
	public static final String btnsearchState = "searchState";
	public static final String urlfetchStateList = "fetchStateList";

	// for IPD AND OPD report by akshay........
	
	public static final String UrlgetReportForIPDRegisterNew = "getReportForIPDRegisterNew";
	
	public static final String UrlgetReportForphysicaldischarge = "getReportForphysicaldischarge";
	
	public static final String UrlgetReportForIPDRegisterNewSpecialityBasis = "getReportForIPDRegisterNewSpecialityBasis";
	public static final String UrlgetReportForOPDRegPatientSpecialityBasis = "getReportForOPDRegPatientSpecialityBasis";

	
	
	// BY AKSHAY FOR CORPORATE REPORT
	public static final String UrlgetReportForCorporateALL = "getReportForCorporateALL";

	public static final String UrlgetReportForCorporateParticular = "getReportForCorporateParticular";
	
	public static final String UrlgetReportForCorporatePolicy = "getReportForCorporatePolicy";
	
	public static final String Urlgetcorporatelist = "getcorporatelist";
	
	
	public static final String UrlgetReportForCorporateDueALL = "getReportForCorporateDueALL";

	public static final String UrlgetReportForCorporateDueParticular = "getReportForCorporateDueParticular";
	
	public static final String UrlgetReportForCorporateDuePolicy = "getReportForCorporateDuePolicy";
	
	// scheduler report by akshay....
	public static final String UrlgetschedulerReport = "getschedulerReport";
	
	
	public static final String UrlFetchOperationHallCharges = "FetchOperationHallCharges";
	public static final String UrlSaveOperationDetailsWithHWChrages = "SaveOperationDetailsWithHWChrages";
	public static final String UrlfetchHallwiseChargesForOperation = "fetchHallwiseChargesForOperation";

	// @codeBy:Touheed @codeDate:18-Feb-2016
	public static final String urlFetchLabResultData = "fetchLabResultData";
	public static final String btnPostLabReport = "postLabReport";

	public static final String btnSaveEditorForResult = "saveEditorForResult";

	public static final String btngetDoctorOverallReport = "getDoctorOverallReport";
	
	//@codeBy:Amrut @codeDate:14-3-2016
	public static final String btnFetchOnloadPathologistslist = "fetchonloadPathologistslist";
		
	//@author--husenbadashah--@since--13/04/2016
	public static final String btngetNextSubInventoryStocktblId = "getNextSubInventoryStocktblId";
	//@author--husenbadashah--@since--13/04/2016
	public static final String btnfetchAllSubInventory= "fetchAllSubInventory";
	//@author--husenbadashah--@since--13/04/2016
	public static final String btnsaveOTSubInv= "saveOTSubInv";
		
	// @codeBy:Touheed @codeDate:13-Apr-2016  @codeFor : Send test to lab from Billing
	public static final String btnSendToLabFromOPDBill = "sendToLabFromOPDBill";
	
	//@codeBy : Touheed Khan @codeDate :19-Apr-2016 @codeFor : Checking Lab bill is paid or unpaid
	public static final String onloadCheckForLabBillBeforCloaseTreatment = "checkForLabBillBeforCloaseTreatment";

	// @codeBy : Amrut ,code Date: 6 April 2016.	
	public static final String btnfetchOnLoadDigitalSignImage = "fetchOnLoadDigitalSignImage";
		
	// @codeBy : Amrut ,code Date: 15 April 2016.	
	public static final String UpdateAdmissionDate = "UpdateAdmissionDate";
		
	// @codeBy : Amrut ,code Date: 19 April 2016.	
	public static final String btnCheckPasswordOfAdmin = "CheckPasswordOfAdmin";
	
	//@codeBy : Touheed Khan @codeDate : 20-Apr-2016 @codeFor : Send to Perivous Record
	public static final String btnDiscardLabReport = "discardLabReport";
	
	//@codeBy : TouHeeD KhaN @codeDate : 21-Apr-2016 @codeFor : Getting previous Treatment
	public static final String tabGetPreviousTreatTest = "getPreviousTreatTest";

	public static final String  onLoadFetchPartialGRN ="getPartialGRN" ;
	
	// @codeBy : Manisha ,code Date: 06 May 2016.	
	public static final String btnFetchReasonofVisitID = "fetchReasonofVisitID";
	public static final String btnUpdateReasonOfVisit = "UpdateReasonOfVisit";
	public static final String btnfetchReasonOfVisitDetails = "fetchReasonOfVisitDetails";
	public static final String btnDeleteReasonOfVisitDetails = "deleteReasonOfVisitDetails";
	public static final String btnsearchReasonOfVisit = "searchReasonOfVisit";
	//husen @5/5/2016
	public static final String  btnProcessInvItemsfromOTManage ="ProcessInvItemsfromOTManage" ;
	
	//@codeBy : TouHeeD KhaN @codeDate : 10-May-2016 @codeFor : Saving Time and Date for collection and accpeted button is lab
	public static final String btnsaveCollectionAndAccepted = "saveCollectionAndAccepted";

	//husen bed charges details
	public static final String  ulrPhysicalDischargeToPatient ="PhysicalDischargeToPatient" ;

	//@codeBy : TouHeeD KhaN @codeDate : 06-June-2016 @codeFor : Fetching medication for nursing station
	public static final String onloadFetchNursingMedication = "fetchNursingMedication";

	//@codeBy : TouHeeD KhaN @codeDate : 06-June-2016 @codeFor : To done or reverse functionality
	public static final String btnAdministratedDoneReverse = "administratedDoneReverse";
	
//	@codeBy : Tushar @codeDate : 15-july-2016 @codeFor : To Upload & Fetch Document
	public static final String btnuploaddoc = "UploadDoc";
	public static final String urlfetchDoc = "ViewFetchDoc";

	//@codeBy : TouHeeD KhaN @codeDate : 01-Aug-2016 @codeFor : Fetching list of Test related to group id of selected doctor
	public static final String onchangeFetchTestRelatedtToDoctorAndGroupId = "fetchTestRelatedtToDoctorAndGroupId";

	//@codeBy : TouHeeD KhaN @codeDate : 03-Aug-2016 @codeFor : Fetching list of Test related to group id of selected doctor
	public static final String btnSaveMotivatorVoucherList = "saveMotivatorVoucherList";
	
	//@codeBy : TouHeeD KhaN @codeDate : 05-Aug-2016 @codeFor : Fetching next Primary ki in motivator Voucher
	public static final String onloadGetNextMotivatorVoucherDetailsId = "getNextMotivatorVoucherDetailsId";

	//@codeBy : TouHeeD KhaN @codeDate : 05-Aug-2016 @codeFor : Fetching next Primary ki in motivator Voucher
	public static final String onloadFetchAllGeneratedVouchers = "fetchAllGeneratedVouchers";

	//@codeBy : TouHeeD KhaN @codeDate : 08-Aug-2016 @codeFor : Fetching details of that id
	public static final String btnViewMotivatorVoucherDetailsForId = "viewMotivatorVoucherDetailsForId";
	
	//@codeBy : TouHeeD KhaN @codeDate : 08-Aug-2016 @codeFor : Fetching details of that id
	public static final String btnCancelGenratedVoucher = "cancelGenratedVoucher";
	
	//@codeBy : TouHeeD KhaN @codeDate : 08-Aug-2016 @codeFor : Fetching details of that id
	public static final String onchangeFetchMotivatorBetweenDate = "fetchMotivatorBetweenDate";
		
	//@codeBy : TouHeeD KhaN @codeDate : 11-Aug-2016 @codeFor : Pay all fromdate to todate
	public static final String btnPayAllMotivatorFromToDate = "payAllMotivatorFromToDate";
	
	//@codeBy : TouHeeD KhaN @codeDate : 11-Aug-2016 @codeFor : Pay all fromdate to todate
	public static final String onloadFetchAuthorisedBy = "fetchAuthorisedBy";
	
	//@codeBy : TouHeeD KhaN @codeDate : 24-Aug-2016 @codeFor : Pay all fromdate to todate
	public static final String btnMotivatorReportFromdateTodate = "motivatorReportFromdateTodate";
	
	//	@codeBy : Tushar @codeDate : 09-Sep-2016 @codeFor : To print Common Receipt	
	public static String urlprintCommonAdvanceRec = "printCommonAdvanceRec";
	
	//	@codeBy : Tushar @codeDate : 27-Sep-2016 @codeFor : Tax Information 
	public static final String btnInsertTaxDetails = "InsertTaxDetails";

	//	@codeBy : Vinod @codeDate : 23-Sep-2016 @codeFor : To fetch purchase enquiries 	
	public static final String onLoadFetchPurchaseEnquiryMaster = "fetchPurchaseEnquiryMaster";
	
	
	//@codeBy : TouHeeD KhaN @codeDate : 07-Oct-2016 @codeFor :Send Request OPD/IPD for Close Treatment
	public static final String btnRequestCloseTreatment = "requestCloseTreatment";
		

	//	@codeBy : Vinod @codeDate : 23-Sep-2016 @codeFor : To fetch purchase enquiries 	
	public static final String btnLoadFetchPurchaseEnquiryItemSlaveDetail = "fetchPurchaseEnquiryItemSlaveDetail";
		
	//	@codeBy : Vinod @codeDate : 26-Sep-2016 @codeFor : To delete purchase enquiries 	
	public static final String btnDeletePurchaseEnquiryMaster = "deletePurchaseEnquiryMaster";

	//@codeBy : Manisha @codeDate : 28-Sep-2016 @codeFor : Fetch Medicine Chart	
	public static final String btnFillDrugChart = "fillDrugChart";
	
	//@codeBy : Manisha @codeDate : 29-Sep-2016 @codeFor : Save Medicine Chart	
	public static final String btnSaveMedicineChart = "SaveMedicineChart";

	public static final String btnFetchTaxView = "FetchTaxView";
	
	public static final String btnDeleteTax = "DeleteTax";

	//@codeBy : Manisha @codeDate : 29-Sep-2016 @codeFor : Delete Medicine Chart	
	public static final String urlDeleteMedicineChart = "DeleteMedicineChart";
	
	//@codeBy : Manisha @codeDate : 04-Oct-2016 @codeFor : Update Medicine Chart	
	public static final String btnUpdateMedicineChart = "UpdateMedicineChart";
	
	//End
	//@codeBy : Tushar @codeDate : 14-Oct-2016 @codeFor : To fetch Follicular Data	
	public static final String urlfetchFollicularAll = "fetchFollicularAll";
	
	//@codeBy : Tushar @codeDate : 17-Oct-2016 @codeFor : To Save Follicular Data	
	public static final String urlsaveUpdateStudyByID = "saveUpdateStudyByID";
	
	//@codeBy : Tushar @codeDate : 18-Oct-2016 @codeFor : To Delete Study Record
	public static Object urlDeleteStudyRec = "DeleteStudyRec";
	
	//@codeBy : Tushar @codeDate : 18-Oct-2016 @codeFor : To Save Study Record
	public static Object urlsaveStudyRecord = "saveStudyRecord";
	
	//@codeBy : Tushar @codeDate : 18-Oct-2016 @codeFor : To Fetch Study Record
	public static Object urlfetchStudyReport = "fetchStudyReport";
	
	//@codeBy : Tushar @codeDate : 02-Nov-2016 @codeFor : DashBoard FOr HealthBay
	public static Object urlFetchOPDConsultantDetails1 = "fetchOPDConsultantDetails1";
	
	
	//@codeBy : Kavita Bhangale @codeDate : 14-oct-2016 @codeFor : Save Bed changes for patient from billing
	public static final String UrlsaveBedEditDetailsFromBilling = "saveBedEditDetailsFromBilling";

	//@codeBy : Kalpesh @codeDate : 12-Oct-2016 @codeFor : Fetch terms and condition for quotation
	public static final String btnfetchTermsConditionsDetailForQtn = "FetchTermsConditionsDetailForQtn";
	//End
	
    //@codeBy : !rf@n kh@n  @codeDate : 19-Oct-2016 @codeFor : fetch title 
     public static final String btnFetchTitle="fetchTitle";
   //End
	
	/******************** Start Report constants ******************************/
	//@codeBy : !Manisha  @codeDate : 14-Nov-2016 @codeFor : Pioneer Reports    
    public static final String urlgetReportForCTScanServiceswise = "getReportForCTScanServiceswise";
	public static final String urlgetReportForX_RayServiceswise = "getReportForX_RayServiceswise";
	public static final String urlgetReportForUSGServiceswise = "getReportForUSGServiceswise";
	public static final String urlgetReportForPathologyTest = "getReportForPathologyTest";

    //@codeBy : !rf@n kh@n  @codeDate : 08-Nov-2016 @codeFor : fetch title gender 
	public static final String btnfetchTitleGender="fetchTitleGender";
	//	@codeBy : Tushar @codeDate : 29-Nov-2016 @codeFor : pre-operative check list 
	public static final String btnInsertList = "InsertList";
	public static final String btnFetchCheckList = "FetchCheckList";
	public static final String btnDeleteChkList = "DeleteChkList";
	public static final String btnMaxIDofList = "MaxIDofList";
//	@codeBy : Tushar @codeDate : 30-Nov-2016 @codeFor : OT Operation Action
	public static final String btnPatientCommanInfo = "PatientCommanInfo";
	
	//@codeBy : !Manisha  @codeDate : 18-Nov-2016 @codeFor : Pioneer Reports    
	public static final String urlgetReportForERPatient = "getReportForERPatient";
	    
	/********************************** Voucher Masters(14 Nov 2016) ***********************/
	public static final String btnFetchVoucherID = "fetchVoucherID";
	public static final String btnfetchVoucher = "fetchVoucher";
	public static final String btnUpdateVoucher = "UpdateVoucher";
	public static final String btnDeleteVoucher = "deleteVoucher";
	public static final String btnsearchVoucher = "searchVoucher";
	public static final String urlfetchVoucherList = "fetchVoucherList";
	//End
	
	//@codeBy : Vinod @codeDate : 01-Oct-2016 @codeFor : Fetch diagnosis hisab	
		public static final String btnShowDiagnosisHisab = "showDiagnosisHisab";
			
	//@codeBy : Vinod @codeDate : 10-Oct-2016 @codeFor : close diagnosis hisab	
		public static final String btnCloseDiagnosisHisab = "closeDiagnosisHisab";
		
	//@codeBy : Vinod @codeDate : 24-Oct-2016 @codeFor : Fetch Opd hisab	
		public static final String btnShowOpdHisab = "showOpdHisab";
	
	//@codeBy : Vinod @codeDate : 24-Oct-2016 @codeFor : close opd hisab	
		public static final String btnCloseOpdHisab = "closeOpdHisab";

	//@codeBy : Vinod @codeDate : 11-Nov-2016 @codeFor : Fetch IPD hisab	
		public static final String btnShowIPDHisab = "showIPDHisab";
		
	//@codeBy : Vinod @codeDate : 15-Nov-2016 @codeFor : close IPD hisab	
		public static final String btnCloseIPDHisab = "closeIPDHisab";
	
		
   //End
			
	   /******************************Ledger Head Masters(14-Nov-2016) ******************/
		public static final String btnfetchLedgerHeadID = "fetchLedgerHeadID";
		public static final String btnfetchLedgerHead = "fetchLedgerHead";
		public static final String btnUpdateLedgerHead = "UpdateLedgerHead";
		public static final String btnDeleteLedgerHead = "deleteLedgerHead";
		public static final String btnsearchLedgerHead = "searchLedgerHead";

		public static final String btnsetLedgerHead = "setLedgerHead";
		public static final String btnselLedgerhead = "selLedgerhead";
		
		public static Object urlFetchConsultants = "FetchConsultants";

//@codeBy : Tushar @codeDate : 23-Nov-2016 @codeFor : Fetching Data by Doctor and Departments 
   public static Object urlsearchDoctorWise = "searchDoctorWise";

   
//	@codeBy : Irfan Khan @codeDate : 22-Sep-2016 @codeFor : fetch physiotherapy test	
	public static final String btnFetchPhysiotherapyTest = "fetchPhysiotherapyTest";
	public static final String btnFetchOtherServices = "fetchOtherServices";	
	public static final String btnSaveOSHWCharges = "saveOSHWCharges";
	
	public static final String urlfetchOSForTPAhallwiseCharges = "fetchOSForTPAhallwiseCharges";
	//End
	
	public static final String urlSavePhysiotherapyTestHallWiseCharges = "savePhysiotherapyTestHallWiseCharges";

	//@codeBy : Tushar @codeDate : 02-Dec-2016 @codeFor : Fetching Operation Doctors List
	   public static final String btnfetchOperationDocList = "fetchOperationDocList";
	   public static final String btndeleteDocRecord = "deleteDocRecord";
	   public static final String btnconfirmDoc = "confirmDoc";
	   public static final String btnarrivalDoc = "arrivalDoc";
	   public static final String btnabsentDoc = "absentDoc";
	   public static final String btnaddDocNameToList1 = "addDocNameToList1";
	   public static final String btnsavePreOpPrep = "savePreOpPrep";
	   public static final String btnfetchPreOpPre = "fetchPreOpPre";
	   public static final String btnremovePreOpPrep = "removePreOpPrep";
	   public static final String btnfetchOTDoc = "fetchOTDoc";
	   public static final String btnsaveOTDescription = "saveOTDescription";
	   public static final String btnfetchOTDescription = "fetchOTDescription";
	   public static final String btnsaveOTNotesData = "saveOTNotesData";
	   public static final String btnfetchOTNotesData = "fetchOTNotesData";
	   
	 //@codeBy : Ajay @codeDate : 08-feb-2019 @codeFor : Fetching Operation Patient List
	 		public static final String btnFetchPharmaPatientNameReportAutosugg="fetchPharmaPateintNameReportAutosugg";
}
