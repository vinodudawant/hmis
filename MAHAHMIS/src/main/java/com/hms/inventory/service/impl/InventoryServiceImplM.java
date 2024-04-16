package com.hms.inventory.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dto.district_taluka_city;
import com.hms.inventory.dao.InventoryDaoM;
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
import com.hms.inventory.service.InventoryServiceM;

@Service
public class InventoryServiceImplM implements InventoryServiceM {
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	private InventoryDaoM inventoryDaoM;
	
	/**
	 * @since 24-10-2019
	 * @author below method is created for to save and update the financial masters data
	 * @codeFor
	 */
	@Override
	@Transactional
	public int saveorUpdateFinancialMaster(FinancialYearDto financialYearDAO,HttpServletRequest request){
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = inventoryDaoM.saveorUpdateFinancialMaster(financialYearDAO);
		return response;		
	}
	
	/**
	 * @since 24-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to get all the financial master data
	 */
	@Override
	@Transactional
	public List<FinancialYearDto> getAllFinancialMaster(HttpServletRequest request,Integer unitId) {
		// TODO Auto-generated method stub
		return inventoryDaoM.getAllFinancialMaster(unitId);
	}
		
	/**
	 * @since 24-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to perform edit operation on financial master data
	 */
	@Override
	@Transactional
	public FinancialYearDto editFinancialMaster(Integer id) {
		// TODO Auto-generated method stub
		return inventoryDaoM.editFinancialMaster(id);
	}
	
	/**
	 * @since 24-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform delete or set flag on financial master table
	 */
	@Override
	@Transactional
	public boolean deleteFinancialMaster(Integer id, HttpServletRequest request) {
		String sql="SELECT count(*) FROM inv_financial_year_new WHERE deleted='N' and id ="+id;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count <0){
			return false;
		}else{
			
			FinancialYearDto obj=	(FinancialYearDto)sessionFactory.getCurrentSession().get(FinancialYearDto.class, id);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeleted_by(userId);
		
			return inventoryDaoM.deleteFinancialMaster(obj);
		}		
	}

	/**
	 * @since 24-10-2019
	 * @codeFor below method created to perform search functionality on financial master
	 * @author Rohit Sandbhor
	 */
	@Override
	@Transactional
	public List<FinancialYearDto> searchByYear(String year,
			HttpServletRequest request) {
		return inventoryDaoM.searchByYear(year,request);
	}
	
	/**
	 * @since 24-10-2019
	 * @author below method is created for to save and update the warehouse masters data
	 * @codeFor
	 */
	@Override
	@Transactional
	public int saveorUpdateWarehouseMaster(WarehouseMasterDto warehouseMasterDto,HttpServletRequest request){
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = inventoryDaoM.saveorUpdateWarehouseMaster(warehouseMasterDto);
		return response;		
	}

	/**
	 * @since 25-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to get all the warehouse master data
	 */
	@Override
	@Transactional
	public List<WarehouseMasterDto> getAllWarehouseMaster(
			HttpServletRequest request,Integer unitId) {
		return inventoryDaoM.getAllWarehouseMaster(unitId);
	}

	/**
	 * @since 25-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to perform edit operation on warehouse master data
	 */
	@Override
	@Transactional
	public WarehouseMasterDto editWarehouseMaster(Integer id) {
		return inventoryDaoM.editWarehouseMaster(id);
	}

	/**
	 * @since 25-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform delete or set flag on warehouse master table
	 */
	@Override
	@Transactional
	public boolean deleteWarehouseMaster(Integer id, HttpServletRequest request) {
		String sql="SELECT count(*) FROM inv_warehouse_master_new WHERE deleted='N' and id ="+id;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count <0){
			return false;
		}else{
			
			WarehouseMasterDto obj=	(WarehouseMasterDto)sessionFactory.getCurrentSession().get(WarehouseMasterDto.class, id);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeleted_by(userId);
		
			return inventoryDaoM.deleteWarehouseMaster(obj);
		}
	}
	
	/**
	 * @since 25-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform search operation warehouse master table by ID
	 */
	@Override
	@Transactional
	public List<WarehouseMasterDto> searchByWarehouseId(Integer id,
			HttpServletRequest request) {
		return inventoryDaoM.searchByWarehouseId(id, request);
	}

	/**
	 * @since 25-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform auto suggestions operation warehouse master table
	 */
	@Override
	@Transactional
	public WarehouseMasterDto autoSuggestionsOnWarehouseName(String warehouseName) {
		return inventoryDaoM.autoSuggestionsOnWarehouseName(warehouseName);
	}

	/**
	 * @since 30-10-2019
	 * @author below method is created for to save and update the packing masters data
	 * @codeFor
	 */
	@Override
	@Transactional
	public int saveorUpdatePackingMaster(PackingMasterDto packingMasterDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = inventoryDaoM.saveorUpdatePackingMaster(packingMasterDto);
		return response;		
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to get all the packing master data
	 */
	@Override
	@Transactional
	public List<PackingMasterDto> getAllPackingMaster(HttpServletRequest request,Integer unitId) {
		// TODO Auto-generated method stub
		return inventoryDaoM.getAllPackingMaster(unitId);
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to perform edit operation on packing master data
	 */
	@Override
	@Transactional
	public PackingMasterDto editPackingMaster(Integer id) {
		// TODO Auto-generated method stub
		return inventoryDaoM.editPackingMaster(id);
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform delete or set flag on packing master table
	 */
	@Override
	@Transactional
	public boolean deletePackingMaster(Integer id, HttpServletRequest request) {
		String sql="SELECT count(*) FROM inv_packing_master_new WHERE deleted='N' and id ="+id;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count <0){
			return false;
		}else{
			
			PackingMasterDto obj=	(PackingMasterDto)sessionFactory.getCurrentSession().get(PackingMasterDto.class, id);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeleted_by(userId);
		
			return inventoryDaoM.deletePackingMaster(obj);
		}
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform search operation packing master table by ID
	 */
	@Override
	@Transactional
	public List<PackingMasterDto> searchByPackingId(Integer id,
			HttpServletRequest request) {
		return inventoryDaoM.searchByPackingId(id, request);
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform auto suggestions operation packing master table
	 */
	@Override
	@Transactional
	public PackingMasterDto autoSuggestionsOnPackingName(String packingName) {
		return inventoryDaoM.autoSuggestionsOnPackingName(packingName);
	}

	/**
	 * @since 30-10-2019
	 * @author below method is created for to save and update the subInventory masters data
	 * @codeFor
	 */
	@Override
	@Transactional
	public int saveorUpdateSubInventoryMaster(
			SubInventoryMasterDto subInventoryMasterDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = inventoryDaoM.saveorUpdateSubInventoryMaster(subInventoryMasterDto);
		return response;
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to get all the sub-inventory master data
	 */
	@Override
	@Transactional
	public List<SubInventoryMasterDto> getAllSubInventoryMaster(
			HttpServletRequest request) {
		return inventoryDaoM.getAllSubInventoryMaster();
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to perform edit operation on sub-inventory master data
	 */
	@Override
	@Transactional
	public SubInventoryMasterDto editSubInventoryMaster(Integer id) {
		return inventoryDaoM.editSubInventoryMaster(id);
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform delete or set flag on sub-inventory master table
	 */
	@Override
	@Transactional
	public boolean deleteSubInventoryMaster(Integer id,
			HttpServletRequest request) {
		String sql="SELECT count(*) FROM inv_subinventory_master_new WHERE deleted='N' and id ="+id;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count <0){
			return false;
		}else{SubInventoryMasterDto obj=	(SubInventoryMasterDto)sessionFactory.getCurrentSession().get(SubInventoryMasterDto.class, id);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeleted_by(userId);
		
			return inventoryDaoM.deleteSubInventoryMaster(obj);
		}
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform search operation sub-inventory master table by ID
	 */
	@Override
	@Transactional
	public List<SubInventoryMasterDto> searchBySubInventoryId(Integer id,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return inventoryDaoM.searchBySubInventoryId(id, request);
	}

	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform auto suggestions operation sub-inventory master table
	 */
	@Override
	@Transactional
	public SubInventoryMasterDto autoSuggestionsOnSubInventoryName(
			String subInventoryName) {
		return inventoryDaoM.autoSuggestionsOnSubInventoryName(subInventoryName);
	}
	/**
	 * @since 31-10-2019
	 * @author below method is created for to save and update the Abc Range Analysis masters data
	 * @codeFor
	 */
	@Override
	@Transactional
	public int saveorUpdateAbcRangeAnalysisMaster(
			AbcAnalysisMasterDto analysysMasterDto, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = inventoryDaoM.saveorUpdateAbcRangeAnalysisMaster(analysysMasterDto);
		return response;
	}
	/**
	 * @since 31-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to get all the Abc Range Analysis masters data
	 */
	@Override
	@Transactional
	public List<AbcAnalysisMasterDto> getAllAbcRangeAnalysisMaster(
			HttpServletRequest request) {
		return inventoryDaoM.getAllAbcRangeAnalysisMaster();
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for to perform edit operation on Abc Range Analysis masters data
	 */
	@Override
	@Transactional
	public AbcAnalysisMasterDto editAbcRangeAnalysisMaster(Integer id) {
		return inventoryDaoM.editAbcRangeAnalysisMaster(id);
	}
	@Override
	@Transactional
	public boolean deleteAbcRangeAnalysisMaster(Integer id,
			HttpServletRequest request) {
		String sql="SELECT count(*) FROM inv_abcanalysis_master_new WHERE deleted='N' and id ="+id;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count <0){
			return false;
		}else{AbcAnalysisMasterDto obj=	(AbcAnalysisMasterDto)sessionFactory.getCurrentSession().get(AbcAnalysisMasterDto.class, id);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeleted_by(userId);
			return inventoryDaoM.deleteAbcRangeAnalysisMaster(obj);
		}
	}
	/**
	 * @since 01-11-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform search operation ABC Range Analysis master table by ID
	 */
	@Override
	@Transactional
	public List<AbcAnalysisMasterDto> searchByAbcRangeAnalysisId(Integer id,
			HttpServletRequest request) {
		return inventoryDaoM.searchByAbcRangeAnalysisId(id, request);
	}
	/**
	 * @since 30-10-2019
	 * @author Rohit Sandbhor
	 * @codeFor Below method is created to perform auto suggestions operation Abc Range Analysis master table
	 */
	@Override
	@Transactional
	public AbcAnalysisMasterDto autoSuggestionsOnAbcRangeAnalysisId(Integer id) {
		return inventoryDaoM.autoSuggestionsOnAbcRangeAnalysisId(id);
	}
	
	@Override
	@Transactional
	public int saveDocumentMaster(DocumentMasterDto documentMasterDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		String sql = "";
		if (documentMasterDto.getDoc_id() == 0) {

			documentMasterDto.setDocName(documentMasterDto.getDocName());

			sql = "SELECT count(*) from ehat_inv_document_master d where d.deleted='N' and d.doc_name='"
					+ documentMasterDto.getDocName()+"'";

			Query countQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			int count = ((Number) countQuery.uniqueResult()).intValue();
			if (count > 0) {
				return 3;
			} else {
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				documentMasterDto.setCreatedBy(userId);
				documentMasterDto
						.setCreatedBy(documentMasterDto.getCreatedBy());
				documentMasterDto.setCreatedDate(new Date(new java.util.Date()
						.getTime()));
				int response = inventoryDaoM
						.saveDocumentMaster(documentMasterDto);
				return response;
			}

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			documentMasterDto.setUpdatedBy(userId);
			documentMasterDto.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
			int response = inventoryDaoM.saveDocumentMaster(documentMasterDto);
			return response;
		}

	}

	@Override
	@Transactional
	public List<DocumentMasterDto> getAllDocumentMaster(
			HttpServletRequest request,Integer unitId) {
		// TODO Auto-generated method stub
		return inventoryDaoM.getAllDocumentMaster(unitId);
	}

	@Override
	@Transactional
	public DocumentMasterDto editDocumentMaster(Integer documentId) {
		// TODO Auto-generated method stub
		return inventoryDaoM.editDocumentMaster(documentId);
	}

	@Override
	@Transactional
	public boolean deleteDocumentMaster(Integer documentId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub

		DocumentMasterDto documentMasterDto = (DocumentMasterDto) sessionFactory
				.getCurrentSession().get(DocumentMasterDto.class, documentId);
		documentMasterDto.setDeleted("Y");
		documentMasterDto.setDeletedDate(new Date(new java.util.Date()
				.getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		documentMasterDto.setDeletedBy(userId);

		return inventoryDaoM.deleteDocumentMaster(documentMasterDto);

	}
	
	@Transactional
	public DocumentMasterDto inventoryDocumentAutoSuggestion(String documentName, String callFrom) {
		return inventoryDaoM.inventoryDocumentAutoSuggestion(documentName,callFrom);
	}
	
	@Override
	@Transactional
	public DocumentMasterDto getAllDocumentById(Integer documentId) {
		// TODO Auto-generated method stub
		return inventoryDaoM.getAllDocumentById(documentId);
	}

	@Override
	@Transactional
	public int saveDocNumberMaster(InventoryDocumentNumberMDTO invnumObj,HttpServletRequest request){
		String sql="";
		String sql1="";
		int  response=0;
		sql="SELECT  r.year from inv_financial_year_new r where r.deleted='N' and r.id="+invnumObj.getDoc_financial_year_id();
		Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		String year  = spDetailsQuery.uniqueResult().toString();
		
		sql1="SELECT  r.doc_name from ehat_inv_document_master r where r.deleted='N' and r.doc_id="+invnumObj.getDocId();
		Query spDetailsQuerydoc = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		String docName  = spDetailsQuerydoc.uniqueResult().toString();
		
		if (invnumObj.getDocument_numbering_id() == 0){
			String sqlcount="";
			sqlcount="SELECT count(*) from ehat_inventory_number_doc f where f.deleted='N' and f.document_name='"+docName+"' ";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);	
			int count = ((Number)countQuery.uniqueResult()).intValue();
			
			if(count > 0){
				return 3;
			}else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			invnumObj.setCreatedBy(userId);
			invnumObj.setCreatedDate(new Date(new java.util.Date().getTime()));	
			invnumObj.setYear(year);
			invnumObj.setDocumentName(docName);
			response = inventoryDaoM.saveDocNumberMaster(invnumObj);
			}
			   return response;
			
		
		}
		else{
			String sqlcount="";
			sqlcount="SELECT count(*) from ehat_inventory_number_doc f where f.deleted='N' and f.document_name='"+docName+"'and  f.document_numbering_id not in("+invnumObj.getDocument_numbering_id()+")";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);	
			int count = ((Number)countQuery.uniqueResult()).intValue();
			 	if(count > 0){
			 		return 3;
			 	}else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			invnumObj.setUpdatedBy(userId);			
			invnumObj.setUpdatedDate(new Date(new java.util.Date().getTime()));
			invnumObj.setYear(year);
			invnumObj.setDocumentName(docName);
			response = inventoryDaoM.saveDocNumberMaster(invnumObj);
			 	}
			return response;
		}
		
	}

	@Override
	@Transactional
	public List<InventoryDocumentNumberMDTO> getAllInventoryNUmberDoc(HttpServletRequest request,Integer unitId) {
		return  inventoryDaoM.getAllInventoryNUmberDoc(unitId);
	}

	@Override
	@Transactional
	public InventoryDocumentNumberMDTO editInventoryDocNumber(Integer docId) {
		
		return inventoryDaoM.editInventoryDocNumber(docId);
	}

	@Override
	@Transactional
	public boolean deleteInventoryNumberDoc(Integer folderId,HttpServletRequest request) {
		InventoryDocumentNumberMDTO obj=	(InventoryDocumentNumberMDTO)sessionFactory.getCurrentSession().get(InventoryDocumentNumberMDTO.class, folderId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return inventoryDaoM.deleteInventoryNumberDoc(obj);
	}

	@Override
	@Transactional
	public int saveTaxMaster(InventoryTaxSetUpMDTO invnumObj,HttpServletRequest request) {
		int  response=0;
		
		
		
		if (invnumObj.getTax_id() == 0){
			String sql="";
			sql="SELECT count(*) from ehat_inventory_tax_setup f where f.deleted='N' and f.hsn_name='"+invnumObj.getHsnName()+"' ";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			int count = ((Number)countQuery.uniqueResult()).intValue();
			Double taxRate=invnumObj.getTax_rate();
			Double sgcgst=taxRate/2;
			invnumObj.setSgst(sgcgst);
			invnumObj.setCgst(sgcgst);
			/*if(count > 0){
				return 3;
			}else{*/
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			invnumObj.setCreatedBy(userId);
			invnumObj.setCreatedDate(new Date(new java.util.Date().getTime()));				
			response = inventoryDaoM.saveTaxMaster(invnumObj);					 
			   return response;
			//}
			
		
		}
		else{			
			String sql1="";
			sql1="SELECT count(*) from ehat_inventory_tax_setup f where f.deleted='N' and f.hsn_name='"+invnumObj.getHsnName()+"'and  f.tax_id not in("+invnumObj.getTax_id()+")";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql1);	
			int count = ((Number)countQuery.uniqueResult()).intValue();
			Double taxRate=invnumObj.getTax_rate();
			Double sgcgst=taxRate/2;
			invnumObj.setSgst(sgcgst);
			invnumObj.setCgst(sgcgst);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			/*if(count > 0){
				return 3;
			}else{*/
			invnumObj.setUpdatedBy(userId);			
			invnumObj.setUpdatedDate(new Date(new java.util.Date().getTime()));					
			response = inventoryDaoM.saveTaxMaster(invnumObj);			
			return response;
			//}
		}
		
	}

	@Override
	@Transactional
	public List<InventoryTaxSetUpMDTO> getAllInventoryTaxDoc(HttpServletRequest request,Integer unitId) {
		
		return  inventoryDaoM.getAllInventoryTaxDoc(unitId);
	}

	@Override
	@Transactional
	public InventoryTaxSetUpMDTO editInventoryTaxDoc(Integer taxId) {
		// TODO Auto-generated method stub
		return inventoryDaoM.editInventoryTaxDoc(taxId);
	}

	@Override
	@Transactional
	public boolean deleteInventoryTaxDoc(Integer taxId,	HttpServletRequest request) {
		InventoryTaxSetUpMDTO obj=	(InventoryTaxSetUpMDTO)sessionFactory.getCurrentSession().get(InventoryTaxSetUpMDTO.class, taxId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return inventoryDaoM.deleteInventoryTaxDoc(obj);
	}

	@Override
	@Transactional
	public int saveCategoryMaster(CategoryDTOM catObj,HttpServletRequest request) {
		int  response=0;
		if (catObj.getCategoryId() == 0){
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			catObj.setCreatedBy(userId);
			catObj.setCreatedDate(new Date(new java.util.Date().getTime()));				
			response = inventoryDaoM.saveCategoryMaster(catObj);				 
			   return response;
			
		
		}
		else{
			
			/*sql="SELECT f.folder_name from ehat_folder_doc f  where f.deleted='N' and f.department="+folderobj.getDepartMent();
			Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails){
		    	
				   FolderDocDto obj = new FolderDocDto();	    	
		    	
				 String foldeName= ((String)row.get("folder_name"));
				 if(foldeName.equalsIgnoreCase(folderobj.getFolderName()))
				 {
					 return 3;
				 }
			   }	*/	
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			catObj.setUpdatedBy(userId);			
			catObj.setUpdatedDate(new Date(new java.util.Date().getTime()));					
			response = inventoryDaoM.saveCategoryMaster(catObj);		
			return response;
		}
	}

	@Override
	@Transactional
	public List<CategoryDTOM> getAllInventoryCategoryDoc(HttpServletRequest request,Integer unitId) {
		
		return  inventoryDaoM.getAllInventoryCategoryDoc(unitId);
	}

	@Override
	@Transactional
	public CategoryDTOM editInventoryCategoryDoc(Integer catId) {
		
		return inventoryDaoM.editInventoryCategoryDoc(catId);
	}

	@Override
	@Transactional
	public boolean deleteInventoryCategoryDoc(Integer catId,HttpServletRequest request) {
		CategoryDTOM obj=	(CategoryDTOM)sessionFactory.getCurrentSession().get(CategoryDTOM.class, catId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return inventoryDaoM.deleteInventoryCategoryDoc(obj);
	}

	@Override
	@Transactional
	public int saveFormMaster(FormDTOM formObj, HttpServletRequest request) {
		int  response=0;
		if (formObj.getFormId() == 0){	
			String sql="";
			sql="SELECT count(*) from ehat_form_doc f where f.deleted='N' and f.form_type='"+formObj.getFormType()+"' ";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			int count = ((Number)countQuery.uniqueResult()).intValue();
			if(count > 0){
				return 3;
			}else{
				
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			formObj.setCreatedBy(userId);
			formObj.setCreatedDate(new Date(new java.util.Date().getTime()));				
			response = inventoryDaoM.saveFormMaster(formObj);
			}
			   return response;
			
		
		}
		else{
			
			String sql1="";
			sql1="SELECT count(*) from ehat_form_doc f where f.deleted='N' and f.form_type='"+formObj.getFormType()+"'and  f.form_id not in("+formObj.getFormId()+")";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql1);	
			int count = ((Number)countQuery.uniqueResult()).intValue();
			
			if(count > 0){
				return 3;
			}else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			formObj.setUpdatedBy(userId);			
			formObj.setUpdatedDate(new Date(new java.util.Date().getTime()));					
			response = inventoryDaoM.saveFormMaster(formObj);
			}
			return response;
		}
	}

	@Override
	@Transactional
	public List<FormDTOM> getAllInventoryFormDoc(HttpServletRequest request,Integer unitId) {
		
		return  inventoryDaoM.getAllInventoryFormDoc(unitId);
	}

	@Override
	@Transactional
	public FormDTOM editInventoryFormDoc(Integer formId) {
		
		return inventoryDaoM.editInventoryFormDoc(formId);
	}

	@Override
	@Transactional
	public boolean deleteInventoryFormDoc(Integer formId,HttpServletRequest request) {
		FormDTOM obj=	(FormDTOM)sessionFactory.getCurrentSession().get(FormDTOM.class, formId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return inventoryDaoM.deleteInventoryFormDoc(obj);
	}

	@Override
	@Transactional
	public int saveManufacturerMaster(ManufacturerMDTO mObj,HttpServletRequest request) {
		int  response=0;
		if (mObj.getManufacturerId() == 0){			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			mObj.setCreatedBy(userId);
			mObj.setCreatedDate(new Date(new java.util.Date().getTime()));				
			response = inventoryDaoM.saveManufacturerMaster(mObj);				 
			   return response;
			
		
		}
		else{
			
			/*sql="SELECT f.folder_name from ehat_folder_doc f  where f.deleted='N' and f.department="+folderobj.getDepartMent();
			Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails){
		    	
				   FolderDocDto obj = new FolderDocDto();	    	
		    	
				 String foldeName= ((String)row.get("folder_name"));
				 if(foldeName.equalsIgnoreCase(folderobj.getFolderName()))
				 {
					 return 3;
				 }
			   }	*/	
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			mObj.setUpdatedBy(userId);			
			mObj.setUpdatedDate(new Date(new java.util.Date().getTime()));					
			response = inventoryDaoM.saveManufacturerMaster(mObj);	
			return response;
		}
	}

	@Override
	@Transactional
	public List<ManufacturerMDTO> getAllInventoryManufactureDoc(HttpServletRequest request,Integer unitId) {
		return  inventoryDaoM.getAllInventoryManufactureDoc(unitId);
	}

	@Override
	@Transactional
	public ManufacturerMDTO editInventoryManufactureDoc(Integer mId){
		return inventoryDaoM.editInventoryManufactureDoc(mId);
	}

	@Override
	@Transactional
	public boolean deleteInventoryManufactureDoc(Integer mId,HttpServletRequest request) {
		ManufacturerMDTO obj=	(ManufacturerMDTO)sessionFactory.getCurrentSession().get(ManufacturerMDTO.class, mId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return inventoryDaoM.deleteInventoryManufactureDoc(obj);
	}

	@Override
	@Transactional
	public int saveChargeMaster(ChargeMasterDTO cObj, HttpServletRequest request) {
		int  response=0;
		if (cObj.getChargeId() == 0){
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			cObj.setCreatedBy(userId);
			cObj.setCreatedDate(new Date(new java.util.Date().getTime()));				
			response = inventoryDaoM.saveChargeMaster(cObj);					 
			   return response;
			
		
		}else{
			
			/*sql="SELECT f.folder_name from ehat_folder_doc f  where f.deleted='N' and f.department="+folderobj.getDepartMent();
			Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails){
		    	
				   FolderDocDto obj = new FolderDocDto();	    	
		    	
				 String foldeName= ((String)row.get("folder_name"));
				 if(foldeName.equalsIgnoreCase(folderobj.getFolderName()))
				 {
					 return 3;
				 }
			   }	*/	   	
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			cObj.setUpdatedBy(userId);			
			cObj.setUpdatedDate(new Date(new java.util.Date().getTime()));					
			response = inventoryDaoM.saveChargeMaster(cObj);			
			return response;
		}
	}

	@Override
	@Transactional
	public List<ChargeMasterDTO> getAllInventoryChargeMaster(Integer unitId) {
	
		return inventoryDaoM.getAllInventoryChargeMaster(unitId);
	}

	@Override
	@Transactional
	public ChargeMasterDTO editInventoryChargeMaster(Integer chargeId) {
		
		return inventoryDaoM.editInventoryChargeMaster(chargeId);
	}

	@Override
	@Transactional
	public boolean deleteInventoryChargeMaster(Integer chargeId,HttpServletRequest request) {
		ChargeMasterDTO obj=	(ChargeMasterDTO)sessionFactory.getCurrentSession().get(ChargeMasterDTO.class, chargeId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return inventoryDaoM.deleteInventoryChargeMaster(obj);
	}

	@Transactional
	@Override
	public InventoryDocumentNumberMDTO inventoryDocumentNumberAutoSuggestion(String docName) {
		return inventoryDaoM.inventoryDocumentNumberAutoSuggestion(docName);
	}
	

	@Override
	@Transactional
	public List<ChargeMasterDTO> getAllInventoryChargeMasterAutosuggestion(String chargeName,Integer unitId) {
		
		return inventoryDaoM.getAllInventoryChargeMasterAutosuggestion(chargeName,unitId);
	}

	@Override
	@Transactional
	public int saveUnitMaster(UnitMasterDTONew uObj, HttpServletRequest request) {
		int  response=0;
		String sql="";
		String sql1="";
		if (uObj.getUniId() == 0){
			sql="SELECT count(*) from ehat_unit_doc f where f.deleted='N' and f.unit_name='"+uObj.getUnitName()+"' ";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			int count = ((Number)countQuery.uniqueResult()).intValue();
			
			if(count > 0){
				return 3;
			}else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			uObj.setCreatedBy(userId);
			uObj.setCreatedDate(new Date(new java.util.Date().getTime()));				
			response = inventoryDaoM.saveUnitMaster(uObj);					 
			   return response;
			}
			
		
		}else{
			sql1="SELECT count(*) from ehat_unit_doc f where f.deleted='N' and f.unit_name='"+uObj.getUnitName()+"'and  f.uni_id not in("+uObj.getUniId()+")";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql1);	
			int count = ((Number)countQuery.uniqueResult()).intValue();
			 	
			if(count > 0){
				return 3;
			}else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			uObj.setUpdatedBy(userId);			
			uObj.setUpdatedDate(new Date(new java.util.Date().getTime()));					
			response = inventoryDaoM.saveUnitMaster(uObj);			
			return response;
			}
		}
	}

	@Override
	@Transactional
	public List<UnitMasterDTONew> getAllInventoryUnitMaster(Integer unitId) {
		
		return inventoryDaoM.getAllInventoryUnitMaster(unitId);
	}

	@Override
	@Transactional
	public UnitMasterDTONew editInventoryUnitMaster(Integer uniId) {
		
		return inventoryDaoM.editInventoryUnitMaster(uniId);
	}

	@Override
	@Transactional
	public boolean deleteInventoryUnitMaster(Integer uniId,HttpServletRequest request) {
		UnitMasterDTONew obj =	(UnitMasterDTONew)sessionFactory.getCurrentSession().get(UnitMasterDTONew.class, uniId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return inventoryDaoM.deleteInventoryUnitMaster(obj);
	}

	@Override
	@Transactional
	public List<UnitMasterDTONew> getAllInventoryUnitMasterAutosuggestion(String unitName) {
	
		return inventoryDaoM.getAllInventoryUnitMasterAutosuggestion(unitName);
	}

	@Override
	@Transactional
	public List<InventoryTaxSetUpMDTO> getAllInventoryTaxMasterAutosuggestion(String hsnName) {
		
		return inventoryDaoM.getAllInventoryTaxMasterAutosuggestion(hsnName);
	}

	@Override
	@Transactional
	public List<CategoryDTOM> getAllInventoryCategoryMasterAutosuggestion(String categoryName) {
		
		return inventoryDaoM.getAllInventoryCategoryMasterAutosuggestion(categoryName);
	}

	@Override
	@Transactional
	public List<FormDTOM> getAllInventoryformMasterAutosuggestion(String formType) {
		
		return inventoryDaoM.getAllInventoryformMasterAutosuggestion(formType);
	}

	@Override
	@Transactional
	public List<ManufacturerMDTO> getAllInventoryManufactureMasterAutosuggestion(String manufName) {
		
		return inventoryDaoM.getAllInventoryManufactureMasterAutosuggestion(manufName);
	}

	@Override
	@Transactional
	public int saveTermAndConditionMaster(TermsAndCondtionDTO tObj,	HttpServletRequest request) {
		int  response=0;
		if (tObj.getTermConditionId() == 0){
			String sql="";
			sql="SELECT count(*) from ehat_termsandcondition_doc f where f.deleted='N' and f.heading_name='"+tObj.getHeadingName()+"' ";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			int count = ((Number)countQuery.uniqueResult()).intValue();
			if(count > 0){
				return 3;
			}else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			tObj.setCreatedBy(userId);
			tObj.setCreatedDate(new Date(new java.util.Date().getTime()));				
			response = inventoryDaoM.saveTermAndConditionMaster(tObj);
			}
			   return response;
			
		
		}else{
			
			String sql1="";
			sql1="SELECT count(*) from ehat_termsandcondition_doc f where f.deleted='N' and f.heading_name='"+tObj.getHeadingName()+"'and  f.termcondition_id not in("+tObj.getTermConditionId()+")";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql1);	
			int count = ((Number)countQuery.uniqueResult()).intValue();
			if(count > 0){
				return 3;
			}else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			tObj.setUpdatedBy(userId);			
			tObj.setUpdatedDate(new Date(new java.util.Date().getTime()));					
			response = inventoryDaoM.saveTermAndConditionMaster(tObj);
			}
			return response;
		}
	}

	@Override
	@Transactional
	public List<TermsAndCondtionDTO> getAllInventoryTermAndConditionMaster(Integer unitId) {
		
		return inventoryDaoM.getAllInventoryTermAndConditionMaster(unitId);
	}

	@Override
	@Transactional
	public TermsAndCondtionDTO editInventoryTermAndConditionMaster(	Integer termconditionId) {
		
		return inventoryDaoM.editInventoryTermAndConditionMaster(termconditionId);
	}

	@Override
	@Transactional
	public boolean deleteInventoryTermAndConditionMaster(Integer termconditionId, HttpServletRequest request) {
		TermsAndCondtionDTO obj=	(TermsAndCondtionDTO)sessionFactory.getCurrentSession().get(TermsAndCondtionDTO.class, termconditionId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return inventoryDaoM.deleteInventoryTermAndConditionMaster(obj);
	}

	@Override
	@Transactional
	public List<TermsAndCondtionDTO> getAllInventoryTermAndConditionMasterAutosuggestion(String headingName) {
		
		return inventoryDaoM.getAllInventoryTermAndConditionMasterAutosuggestion(headingName);
	}
	
	@Override
	@Transactional
	public int saveHospitalDetails(HospitalDetailsDto hospitalDetailsDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		
		String sql = "";
		if (hospitalDetailsDto.getHospitalId() == 0) {

			hospitalDetailsDto.setHospitalName(hospitalDetailsDto.getHospitalName());

			sql = "SELECT count(*) from ehat_inv_hospital_details h where h.deleted='N' and h.hospital_name='"
					+ hospitalDetailsDto.getHospitalName()+"'";

			Query countQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			int count = ((Number) countQuery.uniqueResult()).intValue();
			if (count > 0) {
				return 3;
			} else {
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				hospitalDetailsDto.setCreatedBy(userId);
				hospitalDetailsDto
						.setCreatedBy(hospitalDetailsDto.getCreatedBy());
				hospitalDetailsDto.setCreatedDate(new Date(new java.util.Date()
						.getTime()));
				int response = inventoryDaoM
						.saveHospitalDetails(hospitalDetailsDto);
				return response;
			}

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			hospitalDetailsDto.setUpdatedBy(userId);
			hospitalDetailsDto.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
			int response = inventoryDaoM.saveHospitalDetails(hospitalDetailsDto);
			return response;
		}
	}

	@Override
	@Transactional
	public List<HospitalDetailsDto> getAllHospitalDetails(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return inventoryDaoM.getAllHospitalDetails();
	}

	@Override
	@Transactional
	public HospitalDetailsDto editHospitalDetails(Integer hospitalId) {
		// TODO Auto-generated method stub
		return inventoryDaoM.editHospitalDetails(hospitalId);
	}

	@Override
	@Transactional
	public boolean deleteHospitalDetails(Integer hospitalId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		HospitalDetailsDto hospitalDetailsDto = (HospitalDetailsDto) sessionFactory
				.getCurrentSession().get(HospitalDetailsDto.class, hospitalId);
		hospitalDetailsDto.setDeleted("Y");
		hospitalDetailsDto.setDeletedDate(new Date(new java.util.Date()
				.getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		hospitalDetailsDto.setDeletedBy(userId);

		return inventoryDaoM.deleteHospitalDetails(hospitalDetailsDto);
	}

	@Override
	@Transactional
	public HospitalDetailsDto hospitalDetailsAutoSuggestion(
			String hospitalName, String callFrom) {
		// TODO Auto-generated method stub
		return 	inventoryDaoM.hospitalDetailsAutoSuggestion(hospitalName,callFrom);
	}

	@Override
	@Transactional
	public HospitalDetailsDto getAllHospitalDetailsById(Integer hospitalId) {
		// TODO Auto-generated method stub
		return inventoryDaoM.getAllHospitalDetailsById(hospitalId);
	}
	
	@Override
	@Transactional
	public int saveCompanyMaster(CompanyMasterDTO cObj,	HttpServletRequest request) {
		int  response=0;
		if (cObj.getCompanyId() == 0){
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			cObj.setCreatedBy(userId);
			cObj.setCreatedDate(new Date(new java.util.Date().getTime()));				
			response = inventoryDaoM.saveCompanyMaster(cObj);					 
			   return response;
			
		
		}else{
			
			/*sql="SELECT f.folder_name from ehat_folder_doc f  where f.deleted='N' and f.department="+folderobj.getDepartMent();
			Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails){
		    	
				   FolderDocDto obj = new FolderDocDto();	    	
		    	
				 String foldeName= ((String)row.get("folder_name"));
				 if(foldeName.equalsIgnoreCase(folderobj.getFolderName()))
				 {
					 return 3;
				 }
			   }	*/	   	
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			cObj.setUpdatedBy(userId);			
			cObj.setUpdatedDate(new Date(new java.util.Date().getTime()));					
			response = inventoryDaoM.saveCompanyMaster(cObj);			
			return response;
		}
	}

	@Override
	@Transactional
	public List<CompanyMasterDTO> getAllInventoryCompanyMaster() {
		
		return inventoryDaoM.getAllInventoryCompanyMaster();
	}

	@Override
	@Transactional
	public CompanyMasterDTO editInventoryCompanyMaster(Integer companyId) {
		return inventoryDaoM.editInventoryCompanyMaster(companyId);
	}

	@Override
	@Transactional
	public boolean deleteInventoryCompanyMaster(Integer companyId,HttpServletRequest request) {
		CompanyMasterDTO obj=	(CompanyMasterDTO)sessionFactory.getCurrentSession().get(CompanyMasterDTO.class, companyId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return inventoryDaoM.deleteInventoryCompanyMaster(obj);
	}

	@Override
	@Transactional
	public List<CompanyMasterDTO> getAllInventoryComapnyMasterAutosuggestion(String companyName) {
		return inventoryDaoM.getAllInventoryComapnyMasterAutosuggestion(companyName);
	}

	@Override
	@Transactional
	public List<WarehouseMasterDto> searchByWarehouseName(String warehouseName,
			HttpServletRequest request) {
		return inventoryDaoM.searchByWarehouseName(warehouseName, request);
	}

	@Override
	@Transactional
	public List<district_taluka_city> getAllStateMaster(HttpServletRequest request) {
		
		return inventoryDaoM.getAllStateMaster(request);
	}

	@Override
	@Transactional
	public List<district_taluka_city> getAllDistrictByStateId(Integer stateId) {
		
		return inventoryDaoM.getAllDistrictByStateId(stateId);
	}

	@Override
	@Transactional
	public List<district_taluka_city> getAllTalukaBydDistictId(	Integer districtId) {
		
		return inventoryDaoM.getAllTalukaBydDistictId(districtId);
	}

	@Override
	@Transactional
	public List<district_taluka_city> getAllCityByTalukaId(Integer talukaId) {
		
		return inventoryDaoM.getAllCityByTalukaId(talukaId);
	}

	@Override
	@Transactional
	public List<FinancialYearDto> inventoryFinancialYearAutoSuggestion(String year) {
		
		return inventoryDaoM.inventoryFinancialYearAutoSuggestion(year);
	}

	@Override
	@Transactional
	public int saveSanctionMaster(SactionFormDTO sanctionobj,HttpServletRequest request) {
		int  response=0;
		
		if (sanctionobj.getSanctionId() == 0){
			
			
			
			
			String sql1="";
			
			sql1 = "SELECT count(*) from inv_party_master_new  h where h.deleted='N' and h.party_master_name='"+ sanctionobj.getPartyName()+"'";
						
			
			Query countQuery1 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql1);
			int count1 = ((Number) countQuery1.uniqueResult()).intValue();
			
			
			FinancialYearDto rmobj=(FinancialYearDto) sessionFactory.getCurrentSession().get(FinancialYearDto.class, sanctionobj.getFinancialYear());
			
			if(  count1 >0){
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				sanctionobj.setCreatedBy(userId);
				sanctionobj.setYearName(rmobj.getYear());
				sanctionobj.setCreatedDate(new Date(new java.util.Date().getTime()));				
				response = inventoryDaoM.saveSanctionMaster(sanctionobj);					 
				   return response;
				
			}else
			{
				return 3;
			}
			
			
		
		}else{
			
		
			
				String sql1="";
			
				sql1 = "SELECT count(*) from inv_party_master_new  h where h.deleted='N' and h.party_master_name='"+ sanctionobj.getPartyName()+"'";
						
				
				Query countQuery1 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql1);
				int count1 = ((Number) countQuery1.uniqueResult()).intValue();
				
				FinancialYearDto rmobj=(FinancialYearDto) sessionFactory.getCurrentSession().get(FinancialYearDto.class, sanctionobj.getFinancialYear());

			  	
				if(count1>0){
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			sanctionobj.setUpdatedBy(userId);
			sanctionobj.setYearName(rmobj.getYear());
			sanctionobj.setUpdatedDate(new Date(new java.util.Date().getTime()));					
			response = inventoryDaoM.saveSanctionMaster(sanctionobj);			
			return response;
				}else{
					return 3;
				}
		}
	}

	@Override
	@Transactional
	public List<SactionFormDTO> getAllSanctionMaster(HttpServletRequest request,Integer unitId) {
		
		return inventoryDaoM.getAllSanctionMaster(unitId);
	}

	@Override
	@Transactional
	public SactionFormDTO editSactionMaster(Integer sanctionId) {
		
		return inventoryDaoM.editSactionMaster(sanctionId);
	}

	@Override
	@Transactional
	public boolean deleteSactionMaster(Integer sanctionId,HttpServletRequest request) {
		SactionFormDTO obj=	(SactionFormDTO)sessionFactory.getCurrentSession().get(SactionFormDTO.class, sanctionId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return inventoryDaoM.deleteSactionMaster(obj);
	}

	@Override
	@Transactional
	public int fetchHospitalState(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return inventoryDaoM.fetchHospitalState(request);
	}

	@Override
	@Transactional
	public Integer getPageCountAllSubinventoryMaster() {
		// TODO Auto-generated method stub
		return inventoryDaoM.getPageCountAllSubinventoryMaster();
	}

	@Override
	@Transactional
	public SubInventoryMasterDto getSubInventoryMasterPagination(
			Integer startIndex) {
		return inventoryDaoM.getSubInventoryMasterPagination(startIndex);
	}

	@Override
	@Transactional
	public PartyMasterDto getPartyMasterPagination(Integer startIndex) {
		return inventoryDaoM.getPartyMasterPagination(startIndex);
	}
	
	@Override
	@Transactional
	public int saveorUpdateMaintenanceContractMaster(MaintenanceContractMasterDto maintenanceContractMasterDto,HttpServletRequest request) {
		return inventoryDaoM.saveorUpdateMaintenanceContractMaster(maintenanceContractMasterDto);
	}

	@Override
	@Transactional
	public List<MaintenanceContractMasterDto> getAllMaintenanceContractMasterRecords(
			HttpServletRequest request, Integer unitId) {
		return inventoryDaoM.getAllMaintenanceContractMasterRecords(unitId);
	}

	@Override
	@Transactional
	public MaintenanceContractMasterDto editMaintenanceContractMaster(Integer id) {
		return inventoryDaoM.editMaintenanceContractMaster(id);
	}
	@Override
	@Transactional
	public boolean deleteMaintenanceContractMaster(Integer id,
			HttpServletRequest request) {
		String sql="SELECT count(*) FROM inv_maintenance_contract_master_new WHERE deleted='N' and id ="+id;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count <0){
			return false;
		}else{
			
			MaintenanceContractMasterDto obj=	(MaintenanceContractMasterDto)sessionFactory.getCurrentSession().get(MaintenanceContractMasterDto.class, id);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeleted_by(userId);
		
			return inventoryDaoM.deleteMaintenanceContractMaster(obj);
		}
	}

	@Override
	@Transactional
	public List<SubInventoryMasterDto> fetchSubInventoryNew(String subInventoryName, String isEdit) {

		List<SubInventoryMasterDto> allSubInventoryMaster = inventoryDaoM.getAllSubInventory(subInventoryName, isEdit);
		return allSubInventoryMaster;
	}

	@Override
	@Transactional
	public Integer getSubInventoryStockRecord(Integer id) {
		// TODO Auto-generated method stub
		return inventoryDaoM.getSubInventoryStockRecord(id);
	}
	
}
