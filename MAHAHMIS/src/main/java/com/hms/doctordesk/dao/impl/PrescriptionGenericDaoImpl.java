package com.hms.doctordesk.dao.impl;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.PrescriptionGenericDao;
import com.hms.doctordesk.dto.PrescriptionGenericDTO;


@Repository
public class PrescriptionGenericDaoImpl implements PrescriptionGenericDao {
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<PrescriptionGenericDTO> getMedicinesWithGeneric(String letter, String GenericFlag) {
		String sql="";
		   try {
			     if(GenericFlag.equalsIgnoreCase("Y")) {
			    	 sql="select p.product_id as productId ,p.product_name as productName ,p.nutracal_product as nutracalProduct,d.drug_name as drugName,d.drug_id as drugId from pharma_product_master p, pharma_drug_master d where p.product_drug_id = d.drug_id and d.drug_delete_flag=0 and p.product_delete_flag=0 and d.drug_name like '%"+letter+"%'";
			     }else {
			    	 sql="select p.product_id as productId ,p.product_name as productName ,p.nutracal_product as nutracalProduct,d.drug_name as drugName,d.drug_id as drugId from pharma_product_master p, pharma_drug_master d where p.product_drug_id = d.drug_id and d.drug_delete_flag=0 and p.product_delete_flag=0 and p.product_name like '%"+letter+"%'"; 
			     }
			     
			     SQLQuery querySp = sessionFactory.getCurrentSession().createSQLQuery(sql);
			     
			 	querySp.setResultTransformer(new AliasToBeanResultTransformer(PrescriptionGenericDTO.class));
				@SuppressWarnings("unchecked")
				List<PrescriptionGenericDTO> lstproduct = querySp.list();	
				return lstproduct;
			   
		   }catch (Exception e) {
		e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<PrescriptionGenericDTO> getPharmacyStockMedicine(String letter,String GenericFlag) {
		String sql="";
		   try {
			     if(GenericFlag.equalsIgnoreCase("Y")) {
			    	 sql="select p.product_id as productId ,p.product_name as productName ,p.nutracal_product as nutracalProduct,d.drug_name as drugName,d.drug_id as drugId from pharma_product_master p, pharma_drug_master d,  pharma_stock_master stock where p.product_drug_id = d.drug_id and d.drug_delete_flag=0 and p.product_delete_flag=0   and p.product_id = stock.stock_product_id and stock.stock_qty_in_hand > 0 " 
			          + "   AND stock.stock_delete_flag = 0 and    d.drug_name like '%"+letter+"%'";
			     }else {
			    	 sql="select p.product_id as productId ,p.product_name as productName ,p.nutracal_product as nutracalProduct,d.drug_name as drugName,d.drug_id as drugId from pharma_product_master p, pharma_drug_master d, pharma_stock_master stock where p.product_drug_id = d.drug_id and d.drug_delete_flag=0 and p.product_delete_flag=0  and p.product_id = stock.stock_product_id and stock.stock_qty_in_hand > 0   AND stock.stock_delete_flag = 0 and p.product_name like '%"+letter+"%'"; 
			     }
			     
			     SQLQuery querySp = sessionFactory.getCurrentSession().createSQLQuery(sql);
			     
			 	querySp.setResultTransformer(new AliasToBeanResultTransformer(PrescriptionGenericDTO.class));
				@SuppressWarnings("unchecked")
				List<PrescriptionGenericDTO> lstproduct = querySp.list();	
				return lstproduct;
			   
		   }catch (Exception e) {
		e.printStackTrace();
		}
		return null;
	}

}
