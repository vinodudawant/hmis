package com.hms.utility;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.hms.dto.NewUserAccessDto;

public class EhatUserAccessControl {
	static boolean isModuleAccess = false;

	public static boolean isDeleteAccess(HttpServletRequest request, String currentPageId) {
		HttpSession userAccesSession = request.getSession();
		boolean isAllow = false;
		String moduleId = (String) userAccesSession.getAttribute("moduleId");
		String ehatUserModuleAccessDelete = "";
		if (userAccesSession.getAttribute("moduleDeleteHashSet") != null) {
			ehatUserModuleAccessDelete = userAccesSession.getAttribute("moduleDeleteHashSet").toString()
					.replaceAll("\\[|\\]", "");
			if (ehatUserModuleAccessDelete != null && !ehatUserModuleAccessDelete.trim().equals("null")) {
				String[] moduleDeleteAccess = ehatUserModuleAccessDelete.split(",");
				for (int i = 0; i < moduleDeleteAccess.length; i++) {
					if (moduleDeleteAccess[i].trim().equals(moduleId)) {
						isModuleAccess = true;
						break;
					}
				}
			}
		}
		String ehatUserSubModuleAccessDelete = "";
		if (userAccesSession.getAttribute("subModuleDeleteHashSet") != null && moduleId == null
				|| isModuleAccess == true) {
			ehatUserSubModuleAccessDelete = userAccesSession.getAttribute("subModuleDeleteHashSet").toString()
					.replaceAll("\\[|\\]", "");
			if (ehatUserSubModuleAccessDelete != null && !ehatUserSubModuleAccessDelete.trim().equals("null")) {
				String[] subModuleDeleteAccess = ehatUserSubModuleAccessDelete.split(",");
				for (int i = 0; i < subModuleDeleteAccess.length; i++) {
					String[] page = currentPageId.split(",");
					for (int j = 0; j < page.length; j++) {
						if (subModuleDeleteAccess[i].trim().equals(page[j])) {
							isAllow = true;
							break;
						}
					}
				}
			}
		}
		return isAllow;
	}

	public static boolean isEditAccess(HttpServletRequest request, String currentPageId) {
		HttpSession userAccesSession = request.getSession();
		boolean isAllow = false;
		String moduleId = (String) userAccesSession.getAttribute("moduleId");
		String ehatUserModuleAccessEdit = "";
		if (userAccesSession.getAttribute("moduleEditHashSet") != null) {
			ehatUserModuleAccessEdit = userAccesSession.getAttribute("moduleEditHashSet").toString()
					.replaceAll("\\[|\\]", "");
			if (ehatUserModuleAccessEdit != null && !ehatUserModuleAccessEdit.trim().equals("null")) {
				String[] moduleEditAccess = ehatUserModuleAccessEdit.split(",");
				for (int i = 0; i < moduleEditAccess.length; i++) {
					if (moduleEditAccess[i].trim().equals(moduleId)) {
						isModuleAccess = true;
						break;
					}
				}
			}
		}
		String ehatUserSubModuleAccessEdit = "";
		if (userAccesSession.getAttribute("subModuleEditHashSet") != null && moduleId == null
				|| isModuleAccess == true) {
			ehatUserSubModuleAccessEdit = userAccesSession.getAttribute("subModuleEditHashSet").toString()
					.replaceAll("\\[|\\]", "");
			if (ehatUserSubModuleAccessEdit != null && !ehatUserSubModuleAccessEdit.trim().equals("null")) {
				String[] subModuleEditAccess = ehatUserSubModuleAccessEdit.split(",");
				for (int i = 0; i < subModuleEditAccess.length; i++) {
					String[] page = currentPageId.split(",");
					for (int j = 0; j < page.length; j++) {
						if (subModuleEditAccess[i].trim().equals(page[j])) {
							isAllow = true;
							break;
						}
					}
				}
			}
		}
		return isAllow;
	}

	public static boolean isViewAccess(HttpServletRequest request, String currentPageId) {
		HttpSession userAccesSession = request.getSession();
		boolean isAllow = false;
		String moduleId = (String) userAccesSession.getAttribute("moduleId");
		String ehatUserModuleAccessView = "";
		if (userAccesSession.getAttribute("moduleViewHashSet") != null) {
			ehatUserModuleAccessView = userAccesSession.getAttribute("moduleViewHashSet").toString()
					.replaceAll("\\[|\\]", "");
			if (ehatUserModuleAccessView != null && !ehatUserModuleAccessView.trim().equals("null")) {
				String[] moduleViewAccess = ehatUserModuleAccessView.split(",");
				for (int i = 0; i < moduleViewAccess.length; i++) {
					if (moduleViewAccess[i].trim().equals(moduleId)) {
						isModuleAccess = true;
						break;
					}
				}
			}
		}
		String ehatUserSubModuleAccessView = "";
		if (userAccesSession.getAttribute("subModuleViewHashSet") != null && moduleId == null
				|| isModuleAccess == true) {
			ehatUserSubModuleAccessView = userAccesSession.getAttribute("subModuleViewHashSet").toString()
					.replaceAll("\\[|\\]", "");
			if (ehatUserSubModuleAccessView != null && !ehatUserSubModuleAccessView.trim().equals("null")) {
				String[] subModuleViewAccess = ehatUserSubModuleAccessView.split(",");
				for (int i = 0; i < subModuleViewAccess.length; i++) {
					String[] page = currentPageId.split(",");
					for (int j = 0; j < page.length; j++) {
						if (subModuleViewAccess[i].trim().equals(page[j])) {
							isAllow = true;
							break;
						}
					}
				}
			}
		}
		return isAllow;
	}

	public static boolean isOnOffAccess(HttpServletRequest request, String currentPageId) {
		HttpSession userAccesSession = request.getSession();
		boolean isAllow = false;
		String ehatUserSubModuleAccessOnOff = "";
		if (userAccesSession.getAttribute("subModuleOnOffHashSet") != null) {
			ehatUserSubModuleAccessOnOff = userAccesSession.getAttribute("subModuleOnOffHashSet").toString()
					.replaceAll("\\[|\\]", "");
			if (ehatUserSubModuleAccessOnOff != null && !ehatUserSubModuleAccessOnOff.trim().equals("null")) {
				String[] subModuleOnOffAccess = ehatUserSubModuleAccessOnOff.split(",");
				for (int i = 0; i < subModuleOnOffAccess.length; i++) {
					String[] page = currentPageId.split(",");
					for (int j = 0; j < page.length; j++) {
						if (subModuleOnOffAccess[i].trim().equals(page[j])) {
							isAllow = true;
							break;
						}
					}
				}
			}
		}
		return isAllow;
	}

	public static String isUserAccess(HttpServletRequest httpServletRequest, String currentPageId) {
		String isUserAccess = "";
		if (currentPageId != null) {
			boolean isAllow = EhatUserAccessControl.isDeleteAccess(httpServletRequest, currentPageId);
			if (isAllow || currentPageId.equals("0")) {
				isUserAccess = "delete";
			}
			if (isAllow == false) {
				isAllow = EhatUserAccessControl.isEditAccess(httpServletRequest, currentPageId);
				if (isAllow) {
					isUserAccess = "edit";
				}
			}
			if (isAllow == false) {
				isAllow = EhatUserAccessControl.isViewAccess(httpServletRequest, currentPageId);
				if (isAllow) {
					isUserAccess = "view";
				}
			}
			if (isAllow == false) {
				isAllow = EhatUserAccessControl.isOnOffAccess(httpServletRequest, currentPageId);
				if (isAllow) {
					isUserAccess = "ON";
				}
			}
		}
		return isUserAccess;
	}

	public static String getCurrentPageId(String url, HttpSession session) {
		Map<String, String> urlMap = new HashMap<String, String>();

		// NewUserAccessService fetchSubModules =
		// (ApplicationContextUtils.getApplicationContext()).getBean(NewUserAccessService.class);
		if (session.getAttribute("currentPageIdListObj") != null) {
			NewUserAccessDto objDto = (NewUserAccessDto) session.getAttribute("currentPageIdListObj");// fetchSubModules.getUserAccess(0);

			for (NewUserAccessDto obj : objDto.getListuserDto()) {
				urlMap.put(obj.getJspPageName(), obj.getSubModuleId().toString());
			}
		}

		/*
		 * // Help Desk urlMap.put("ehat_reg", "2");
		 * urlMap.put("patientRecordsDetails2", "4");
		 * urlMap.put("patientRecordsDetails3", "335");
		 * urlMap.put("prevOPD_Bill_Database", "5");
		 * urlMap.put("ehat_IPD_BedWardDashboard", "6");
		 * urlMap.put("billQuotationRunTime", "336");
		 * urlMap.put("ehat_Quotation_like_billing", "473");
		 * urlMap.put("ehat_opdpatient_records_quotation", "474");
		 * urlMap.put("ehat_bulk_settlement", "337"); urlMap.put("Bed_MIS", "8");
		 * urlMap.put("IPD_BedWardView", "17"); urlMap.put("IPD_BedWard_GridView",
		 * "18"); urlMap.put("NA", "9"); urlMap.put("Consent Forms", "10");
		 * urlMap.put("databaseForConsentForm", "19");
		 * urlMap.put("prev_databaseForConsentForm", "20");
		 * urlMap.put("ChannelingManagement", "11");
		 * urlMap.put("helpDesk_Receptionist_Report", "39");
		 * urlMap.put("helpDesk_ExpenseVoucher_Report", "40");
		 * //urlMap.put("inventory_Materail_Request_Note", "14");
		 * urlMap.put("inventory_Materail_Request_Note", "110");
		 * urlMap.put("ehat_cadvance", "374");
		 * urlMap.put("ehat_daily_collection_report", "12");
		 * 
		 * // Scheduler urlMap.put("OPD_Appointment", "345");
		 * urlMap.put("SchedulingDoctorSlot", "346");
		 * urlMap.put("scheduler_consulting_room_master", "347");
		 * 
		 * // Doctor Desk urlMap.put("OPDDoctorsDeskDashboard", "41");
		 * urlMap.put("PreviousTreatment", "42"); urlMap.put("NA", "43");
		 * urlMap.put("Medication Master", "44"); urlMap.put("routeMaster", "45");
		 * urlMap.put("pediatricMedicineMaster", "46");
		 * urlMap.put("prescription_Instruction", "47"); urlMap.put("radiation_Master",
		 * "48"); urlMap.put("ImmunizationConfiguration", "49");
		 * urlMap.put("addGroupInstructions", "50");
		 * urlMap.put("addIndividualInstructions", "51"); //
		 * urlMap.put("inventory_Materail_Request_Note", "52");
		 * urlMap.put("inventory_Materail_Request_Note", "110");
		 * 
		 * // IPD urlMap.put("IpdBedState", "208");
		 * urlMap.put("IPD_OldPatientDatabase2", "209");
		 * urlMap.put("IPD_BedWardDashboard", "210"); // urlMap.put("ehat_reg", "211");
		 * urlMap.put("Bed MIS", "212"); urlMap.put("IPD_BedWardView", "213");
		 * urlMap.put("IPD_BedWard_GridView", "214"); urlMap.put("Previous Summary",
		 * "215"); urlMap.put("previous_patient_manual_summary", "216");
		 * urlMap.put("previous_patient_auto_summary", "217"); //
		 * urlMap.put("inventory_Materail_Request_Note", "218");
		 * urlMap.put("inventory_Materail_Request_Note", "110"); urlMap.put("Masters",
		 * "219"); urlMap.put("nursingNotes", "220");
		 * urlMap.put("prescription_Instruction", "221");
		 * urlMap.put("DoctorRoundTemplate", "348");
		 * urlMap.put("ipd_pharma_indent_template_master", "222");
		 * urlMap.put("IPD Patient", "209"); //urlMap.put("IPD_OldPatientDatabase2",
		 * "380"); urlMap.put("IPD_CoverSheet", "223"); urlMap.put("IPD_BedWard",
		 * "224"); urlMap.put("IPD_DoctorStation", "225"); urlMap.put("Nursing Station",
		 * "226"); urlMap.put("dashboard_NursingStation", "227");
		 * urlMap.put("IPD_NursingStation", "228"); //
		 * urlMap.put("inventory_Materail_Request_Note", "349");
		 * urlMap.put("inventory_Materail_Request_Note", "110"); urlMap.put("Discharge",
		 * "229"); urlMap.put("ipdDischarge_Plan", "230");
		 * urlMap.put("ipdDischarge_Process", "231"); urlMap.put("IPD_DischargeNote",
		 * "232"); urlMap.put("IPD_DischargeAutoSummary2", "233");
		 * urlMap.put("ipd_ConsentForm", "234");
		 * urlMap.put("ipd_pharma_indent_template_master", "236");
		 * 
		 * // OT urlMap.put("OT_dashboard", "461"); urlMap.put("OT Reports", "462");
		 * urlMap.put("OT_Reports", "463"); urlMap.put("OT_docwiseReport", "464");
		 * urlMap.put("OT_Cathlab", "465"); urlMap.put("OTScheduler", "387");
		 * urlMap.put("OTDashboard", "388"); urlMap.put("OTAnaesthetic", "390");
		 * urlMap.put("OperationDashboard", "392");
		 * urlMap.put("OperationSummaryDashboard", "393");
		 * urlMap.put("Operation Management", "394");
		 * urlMap.put("operationTypeManagement", "395");
		 * urlMap.put("OperationManagement", "396"); urlMap.put("OTgroups", "397");
		 * urlMap.put("operationTheaterManagement", "398");
		 * urlMap.put("Pre-OperativeCheckList", "399");
		 * urlMap.put("Pre-OperativeCheckListTemp", "400"); urlMap.put("Consent Forms",
		 * "401"); urlMap.put("databaseForConsentForm", "402");
		 * urlMap.put("prev_databaseForConsentForm", "403"); urlMap.put("OT_Management",
		 * "405"); urlMap.put("OT_Appointment", "406"); urlMap.put("inventory_Indent",
		 * "407"); urlMap.put("SubInventory_Stock_Master", "408"); //
		 * urlMap.put("inventory_Materail_Request_Note", "410");
		 * urlMap.put("inventory_Materail_Request_Note", "110");
		 * urlMap.put("OTpercentage", "411");
		 * 
		 * // Billing urlMap.put("ehat_BillingDashboardForIPD", "25");
		 * urlMap.put("prevIPD_Bill_DatabaseNew", "28"); urlMap.put("final_ipd_bill",
		 * "350"); urlMap.put("Report_feedback_Dashboard", "38");
		 * urlMap.put("discountApproval", "351"); urlMap.put("ehat_bulk_settlement",
		 * "352"); urlMap.put("bill_comparison_ipd", "353");
		 * urlMap.put("bill_comparison_ipd", "354"); urlMap.put("ehat_ipd_billing",
		 * "471"); urlMap.put("ehat_opd_billing", "472");
		 * //urlMap.put("ehat_ipd_billing", "514");
		 * 
		 * //Inventory urlMap.put("inventory_Dashboard", "72");
		 * urlMap.put("Administration", "73"); urlMap.put("Set Up", "74");
		 * urlMap.put("inventory_Document_Master", "75");
		 * urlMap.put("inventory_Financial_Year", "76");
		 * urlMap.put("inventory_Document_SetUp", "77");
		 * urlMap.put("inventory_Tax_SetUp", "78");
		 * urlMap.put("inventory_Category_Master", "79");
		 * urlMap.put("inventory_Form_Master", "80");
		 * urlMap.put("inventory_Manufacture_Master", "82");
		 * urlMap.put("inventory_Warehouse_Master", "83");
		 * urlMap.put("inventory_Packing_Master", "84");
		 * urlMap.put("inventory_subInventory_Master", "85");
		 * urlMap.put("inventory_Uom_Master", "86");
		 * urlMap.put("inventory_ABCRange_Analysis_Master", "87");
		 * urlMap.put("inventory_special_tax_master", "88");
		 * urlMap.put("Inventory_Hospital_Details", "89");
		 * urlMap.put("Inventory_TermsandCondition_Master", "90"); urlMap.put("Master",
		 * "91"); urlMap.put("inventory_Item_Master", "92");
		 * urlMap.put("inventory_Party_Master_Data", "93"); urlMap.put("Modules", "94");
		 * urlMap.put("Purchase", "95"); urlMap.put("inventory_Purchase_Quotation",
		 * "97"); urlMap.put("inventory_Purchase_Order", "98");
		 * urlMap.put("inventory_Purchase_Order_plain", "419");
		 * urlMap.put("inventory_Good_Receipt_Note", "99");
		 * urlMap.put("inventory_openig_stock", "100");
		 * urlMap.put("inventory_Purchase_Invoice", "101");
		 * urlMap.put("inventory_Purchase_Return", "102");
		 * urlMap.put("inventory_Purchase_expense", "466"); urlMap.put("Inwarditem",
		 * "467"); urlMap.put("Store", "103");
		 * urlMap.put("inventory_Material_Request_Note_List", "104");
		 * urlMap.put("inventory_Purchase_Request", "105"); urlMap.put("Inventory",
		 * "106"); urlMap.put("inventory_Goods_Issue", "107");
		 * urlMap.put("inventory_Good_Receipt", "108");
		 * urlMap.put("inventory_Stock_Audit", "109");
		 * urlMap.put("inventory_Materail_Request_Note", "110"); urlMap.put("Reports",
		 * "111"); urlMap.put("Inventory_Report_Category _Wise_Item_SubItem_List",
		 * "112"); urlMap.put("Inventory_Report_Category _wise_Purchase", "113");
		 * urlMap.put("Inventory_Report_Category_wise_Stock_Listing", "114");
		 * urlMap.put("Inventory_Report_XYZ_Analysis_for_Purchase_Price", "115");
		 * urlMap.put("Inventory_Report_XYZ_Analysis_for_Sales_Price", "116");
		 * urlMap.put("Inventory_Report_HML_Analysis_for_Purchase_Price", "117");
		 * urlMap.put("Inventory_Report_HML_Analysis_for_Sales_Price", "118");
		 * urlMap.put("Inventory_Report_VED_Analysis_for_Items", "119");
		 * urlMap.put("Inventory_Report_SDE_Analysis_for_Items", "120");
		 * urlMap.put("Inventory_Report_ABC_Analysis_for_Items", "121");
		 * urlMap.put("Inventory_Report_FSN_Analysis_for_Items", "122");
		 * urlMap.put("Inventory_Report_Item_Legder", "123");
		 * urlMap.put("Inventory_Report_Items_At_Re-Oder_level", "124");
		 * urlMap.put("Inventory_Report_Company_wise_purchase", "125");
		 * urlMap.put("Inventory_Report_Purchase_Return_Register", "126");
		 * urlMap.put("Inventory_Report_Supplier_Wise_Invoice_Listing", "127");
		 * urlMap.put("Inventory_Report_Supplier_Wise_Stock_Listing", "128");
		 * urlMap.put("Inventory_Report_Purchase_Day_Book_BY_Invoice_Date", "129");
		 * urlMap.put("Inventory_Report_Outlet_Wise_Consumption_Issue", "130");
		 * urlMap.put("Inventory_Report_Supplier_Wise_Expiry", "131");
		 * urlMap.put("Inventory_Report_Outlet_Wise_Re-Order_Level_and_stock", "132");
		 * urlMap.put("Master Reports", "133"); urlMap.put("inventory_GST_Report",
		 * "479"); urlMap.put("Inventory_Report_Document_master", "134");
		 * urlMap.put("Inventory_Report_Financial_Year_master", "135");
		 * urlMap.put("Inventory_Report_Document_Numbering_master", "136");
		 * urlMap.put("Inventory_Report_Tax_SetUp_Master", "137");
		 * urlMap.put("Inventory_Report_Category_master", "138");
		 * urlMap.put("Inventory_Report_Form_master", "139");
		 * urlMap.put("Inventory_Report_Manufacture_master", "141");
		 * urlMap.put("Inventory_Report_Warehouse_master", "142");
		 * urlMap.put("Inventory_Report_Packing_master", "143");
		 * urlMap.put("Inventory_Report_subInventory_master", "144");
		 * urlMap.put("Inventory_Report_Uom_master", "145");
		 * urlMap.put("Inventory_Report_Item_master", "146");
		 * urlMap.put("Inventory_Report_Party_master", "147");
		 * urlMap.put("Inventory_Report_SubInventory_Complete_ Report", "148");
		 * urlMap.put("Inventory_Report_Current_Stock_Report", "149");
		 * urlMap.put("Inventory_Item_Wise_Current_Stock_Report_ByID", "150");
		 * urlMap.put("Inventory_Report_Purchase_Day_Book", "151");
		 * urlMap.put("Inventory_Report_Pending_Purchase_Order_Book", "152");
		 * urlMap.put("Inventory_Report_Pending_Purchase_Quotation_Book", "153");
		 * urlMap.put("Inventory_Report_Openig_Stock", "154");
		 * urlMap.put("Inventory_Report_Deleted_Item_List", "155");
		 * urlMap.put("Inventory_Mrn_Pending_Report", "156");
		 * urlMap.put("Inventory_Report_Deleted_Mrn_List", "157");
		 * urlMap.put("Inventory_Closing_Stock_Report", "158");
		 * urlMap.put("Inventory_Opening_Stock_Report_without_Grn", "159");
		 * urlMap.put("Inventory_Report_itemwise_Purchase_history", "160");
		 * urlMap.put("Inventory_Report_itemwise_Grn_history", "161");
		 * urlMap.put("Inventory_All_SubInventory_Report", "162");
		 * urlMap.put("inventory_all_subinventory_wise_consumption_issue_report",
		 * "163"); urlMap.put("inventory_Report_Grn_Vmi", "421");
		 * urlMap.put("ehat_dispach_new", "422");
		 * 
		 * urlMap.put("inv_dashboard", "573"); urlMap.put("inv_purchase_request_master",
		 * "549"); urlMap.put("inv_purchase_quotation_master", "550");
		 * urlMap.put("inv_purchase_order_master", "551");
		 * urlMap.put("inv_purchase_expense", "552");
		 * urlMap.put("inv_purchase_return_master", "553");
		 * urlMap.put("inv_stock_transfer", "554"); urlMap.put("inv_good_receipt_note",
		 * "555"); urlMap.put("inv_opening_closing_stock", "556");
		 * urlMap.put("inv_purchase_invoice", "557");
		 * urlMap.put("inv_purchase_reorder_master", "558");
		 * urlMap.put("inv_stock_audit", "560"); urlMap.put("inv_goods_issue_new",
		 * "561"); urlMap.put("inv_subinventory", "562");
		 * urlMap.put("inv_stock_return_approval", "563");
		 * urlMap.put("inv_document_master", "532");
		 * urlMap.put("inv_finance_year_master", "533");
		 * urlMap.put("inv_doc_number_master", "534"); urlMap.put("inv_tax_setupm",
		 * "535"); urlMap.put("inv_category_master", "536");
		 * urlMap.put("inv_form_master", "537"); urlMap.put("inv_manufacture_master",
		 * "538"); urlMap.put("inv_charges_master", ""); urlMap.put("inv_unit_master",
		 * "539"); urlMap.put("inv_termcondition_master", "540");
		 * urlMap.put("inv_warehouse_master", "541"); urlMap.put("inv_packing_master",
		 * "542"); urlMap.put("inv_subinventory_master", "543");
		 * urlMap.put("inv_maintenance_contract_master", "545");
		 * urlMap.put("inv_party_master_data", "546"); urlMap.put("inv_item_master",
		 * "547"); urlMap.put("inv_abcrangeanalysis_master", "558");
		 * urlMap.put("inv_hospital_details", "558");
		 * urlMap.put("inv_sanction_power_master", "558");
		 * 
		 * //Maintenence urlMap.put("maintenace_machine", "423");
		 * urlMap.put("TicketManagement", "424");
		 * 
		 * // Diagnostic urlMap.put("Diagnostic Patient", "304");
		 * urlMap.put("diagnoAssignTestDashboard", "305");
		 * urlMap.put("diagnoPatBillDashboard", "306");
		 * urlMap.put("diagnoPatPrevBillDashboard", "307");
		 * urlMap.put("Pathology Management", "308");
		 * urlMap.put("pathologyPackagesDemo", "310"); urlMap.put("pathoProfileDemo",
		 * "312"); urlMap.put("labTest", "314"); urlMap.put("PathologyOrgan", "316");
		 * urlMap.put("PathologyOwnLab", "319"); urlMap.put("labunitType", "320");
		 * urlMap.put("labTestMethod", "321"); urlMap.put("labSample", "322");
		 * urlMap.put("labDocTechnician", "323"); urlMap.put("labCollectionCenter",
		 * "324"); urlMap.put("Pathology Test", "326");
		 * urlMap.put("labTestPatientDashboard", "327");
		 * urlMap.put("Haemodialysis Flow Chart", "328");
		 * urlMap.put("haemodialysisFowChart", "329");
		 * urlMap.put("previousHaemodialysisFlowChart", "330"); //
		 * urlMap.put("inventory_Materail_Request_Note", "331");
		 * urlMap.put("inventory_Materail_Request_Note", "110"); urlMap.put("Ris",
		 * "332"); urlMap.put("labGeneralMaster", "519"); urlMap.put("labNoteMaster",
		 * "520"); urlMap.put("labEquipmentMaster", "521");
		 * urlMap.put("labOutsourceMaster", "522"); urlMap.put("labWorksheet", "523");
		 * 
		 * 
		 * // Administrator urlMap.put("Hospital Detail", "237");
		 * urlMap.put("hospital_info", "238"); urlMap.put("HospitalAccountInfo", "239");
		 * urlMap.put("HospitalHoliday", "240"); urlMap.put("doctorSpecialities",
		 * "241"); urlMap.put("HospitalOwnerDetail", "242");
		 * urlMap.put("general_access_print_master", "243");
		 * urlMap.put("general_access_print_access_master", "244");
		 * urlMap.put("User Access Management", "246");
		 * urlMap.put("user_access_user_master", "247");
		 * urlMap.put("user_access_module_master", "248");
		 * urlMap.put("user_access_sub_module_master", "249");
		 * urlMap.put("user_access_role_master", "250");
		 * urlMap.put("user_access_profile_master", "251");
		 * urlMap.put("user_access_login_history", "358"); urlMap.put("IPD Management",
		 * "252"); urlMap.put("bedState", "253"); urlMap.put("ehat_halltypemgt", "254");
		 * urlMap.put("ehat_bedwardmgt", "255"); urlMap.put("AddChart", "256");
		 * urlMap.put("BillTowards", "257"); urlMap.put("Patient Management", "258");
		 * urlMap.put("PatientTitle", "259"); urlMap.put("SymptomsDetails", "260");
		 * urlMap.put("Test Management", "261"); urlMap.put("radiologyTestGroup",
		 * "263"); urlMap.put("Operation Management", "276");
		 * urlMap.put("groupWiseProcedureCharges", "277");
		 * urlMap.put("procedureCategory", "459"); urlMap.put("ICD10codeMgmt", "283");
		 * urlMap.put("Manage Template", "285"); urlMap.put("CustomizeTemplate", "286");
		 * urlMap.put("Patient_Death", "291"); urlMap.put("Que/Ans Master", "356");
		 * urlMap.put("HraTypeMaster", "365"); urlMap.put("QuestionMaster", "366");
		 * urlMap.put("Ehat Masters", "357"); urlMap.put("ehat_masters", "367");
		 * urlMap.put("ehat_config", "368"); urlMap.put("demoConfiguration", "369");
		 * urlMap.put("chargesconfiguration", "370"); urlMap.put("doctorType_master",
		 * "371"); urlMap.put("temp", "372"); urlMap.put("narrationTemp", "373");
		 * urlMap.put("ehat_cadvance", "374"); urlMap.put("ehat_mastersInfo", "375");
		 * urlMap.put("ReqGeneralForm", "376"); urlMap.put("PaymentMode", "427");
		 * urlMap.put("ehat_import_master", "460"); urlMap.put("Masters", "15");
		 * urlMap.put("stateForm", "16"); urlMap.put("districtForm", "21");
		 * urlMap.put("talukaForm", "22"); urlMap.put("cityForm", "23");
		 * urlMap.put("generalForm", "24"); urlMap.put("VoucherForm", "341");
		 * urlMap.put("LedgerHeadsForm", "342"); urlMap.put("generalVoucherMaster",
		 * "343"); urlMap.put("processMaster", "344"); urlMap.put("Vouchers", "338");
		 * urlMap.put("ExpenceVoucherDashboard", "339"); urlMap.put("generalVouchers",
		 * "340");
		 * 
		 * //Users / HR urlMap.put("HRManagement", "420");
		 * 
		 * //Reports urlMap.put("Masters Report", "449");
		 * urlMap.put("ehat_daily_cash_report", "377"); urlMap.put("package_report",
		 * "450"); urlMap.put("service_master_report", "451");
		 * urlMap.put("sponsor_hall_reports", "452");
		 * urlMap.put("sponsor_hall_package_report", "453");
		 * urlMap.put("admission_report", "454"); urlMap.put("IPD Reports", "455");
		 * urlMap.put("ehat_ward_wise_report", "456");
		 * urlMap.put("all_discharge_report", "457");
		 * urlMap.put("ehat_ipd_bill_final_estimate", "458");
		 * 
		 * //Finance urlMap.put("ehat_finance_dashboard", "378");
		 * urlMap.put("hisabDiagnostics", "379"); urlMap.put("hisabOpd", "380");
		 * urlMap.put("hisabIpd", "381"); urlMap.put("hisabProFees", "382");
		 * urlMap.put("Professional Fees", "355");
		 * urlMap.put("doctors_payment_group_master", "359");
		 * urlMap.put("profees_dynamic_group_master", "468");
		 * urlMap.put("profees_percent_master2", "360");
		 * urlMap.put("profees_doctors_payment", "361");
		 * urlMap.put("doctors_payment_generated_vouchers", "363");
		 * urlMap.put("Reports", "364"); urlMap.put("profees_doctors_report", "426");
		 * urlMap.put("profees_dr_summary_1", "469");
		 * urlMap.put("profees_voucher_report", "470");
		 * urlMap.put("profees_group_report", "425"); urlMap.put("Reports", "436");
		 * urlMap.put("ehat_opd_diagno_report", "437");
		 * urlMap.put("ehat_opd_diagno_rec_report", "438");
		 * urlMap.put("ehat_billreg_report", "439");
		 * urlMap.put("ehat_billreg_sourcewise", "440");
		 * urlMap.put("ehat_outstanding_report", "441");
		 * urlMap.put("ehat_admission_report", "442");
		 * urlMap.put("ehat_ipd_updation_report", "443"); urlMap.put("ehat_bill_status",
		 * "444"); urlMap.put("ehat_waiting_bill", "445");
		 * urlMap.put("ehat_headwise_report", "446");
		 * urlMap.put("ehat_patienttypewise_report", "447");
		 * urlMap.put("ehat_ipdbill_discount_register", "448");
		 * urlMap.put("ehat_groupwise_profees", "475");
		 * urlMap.put("ehat_billestimate_report", "476");
		 * urlMap.put("ehat_perfomance_report", "477"); urlMap.put("ehat_patient_dues",
		 * "478"); urlMap.put("ehat_opd_diagno_billwise_report", "505");
		 * urlMap.put("ehat_deleted_receipt_report", "524");
		 * urlMap.put("ehat_deleted_bill_report", "525");
		 * urlMap.put("ehat_ipdbreakup_report", "526");
		 * 
		 * //Canteen urlMap.put("Canteen Masters", "428");
		 * urlMap.put("ehat_canteen_master", "429"); urlMap.put("Canteen Sales", "430");
		 * urlMap.put("ehat_canteen_bill", "431"); urlMap.put("Reports", "432");
		 * urlMap.put("ehat_canteen_report", "433");
		 * urlMap.put("ehat_canteen_item_report", "434");
		 * urlMap.put("ehat_cateen_subinventory", "435");
		 * 
		 * //Radiation urlMap.put("RadiationDashboard", "514");
		 * urlMap.put("RadiotherapyConsent", "515"); urlMap.put("PatientClinical",
		 * "516"); urlMap.put("ExternalTherapyTreatment", "517");
		 * urlMap.put("RadiationPaymentDetails", "518");
		 * 
		 * //Ancillaries urlMap.put("RadiationDashboard", "514");
		 * urlMap.put("RadiotherapyConsent", "515"); urlMap.put("PatientClinical",
		 * "516"); urlMap.put("ExternalTherapyTreatment", "517");
		 * urlMap.put("RadiationPaymentDetails", "518");
		 */

		String currentPageId = urlMap.get(url);
		if (currentPageId == null) {
			currentPageId = "0";
		}
		return currentPageId;
	}

}
