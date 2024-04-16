package com.hms.pharmacy.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.ecogreenapi.EcogreenItemMasterDto;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DrugMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ProductMasterEcogreen;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.pojo.StrengthMaster;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.pojo.UomMaster;
import com.hms.pharmacy.service.EcogreenApiService;

@Service
@Transactional
public class EcogreenApiServiceImpl  implements EcogreenApiService{
	@Autowired
	SessionFactory sf;

	@Override
	public EcogreenItemMasterDto getItemList(int masterId) {
		EcogreenItemMasterDto  obj  =new EcogreenItemMasterDto  ();
		   try {
			     obj   = (EcogreenItemMasterDto) sf.getCurrentSession().get(EcogreenItemMasterDto.class, masterId);
		   }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int saveProductMasterData(String productlst) {
		int res=0;
		try {
			ProductMaster pObj = (ProductMaster) ConfigUIJSONUtility
	.getObjectFromJSON(productlst, ProductMaster.class);	
         List<ProductMaster> lstProd = pObj.getLstprod();
         
         List<ProductMaster> newProductList=new ArrayList<>();
           for( ProductMaster obj   :lstProd) {
        	   obj.setProductDeleteFlag(0);
        	   UomMaster uobj= (UomMaster) sf.getCurrentSession().get(UomMaster.class, obj.getEcogreenProdcutUnitId());
        	   if(uobj !=null)
        		   obj.setUomMaster(uobj);
        	   
        	   PreparationMaster pobj= (PreparationMaster) sf.getCurrentSession().get(PreparationMaster.class, obj.getEcogreenProdcutPreparationId());
        	   if(pobj !=null)
        		   obj.setPreparationMaster(pobj);
        	   
        	   StrengthMaster sobj= (StrengthMaster) sf.getCurrentSession().get(StrengthMaster.class, obj.getEcogreenProdcutUnitId());
        	   if(sobj !=null)
        		   obj.setStrengthMaster(sobj);
        	   
        	   PackingMaster packobj= (PackingMaster) sf.getCurrentSession().get(PackingMaster.class, 1);
        	   if(packobj !=null)
        		   obj.setPackingMaster(packobj);
        	   
        	   CompanyMaster compobj= (CompanyMaster) sf.getCurrentSession().get(CompanyMaster.class, 1);
        	   if(compobj !=null)
        		   obj.setCompanyMaster(compobj);
        	   
        	   DrugMaster drugobj= (DrugMaster) sf.getCurrentSession().get(DrugMaster.class, 1);
        	   if(drugobj !=null)
        		   obj.setDrugMaster(drugobj);
        	   
        	   ShelfMaster selfobj= (ShelfMaster) sf.getCurrentSession().get(ShelfMaster.class, 1);
        	   if(selfobj !=null)
        		   obj.setShelfMaster(selfobj);
        	   
        	   CategoryMaster categoryobj= (CategoryMaster) sf.getCurrentSession().get(CategoryMaster.class, 1);
        	   if(categoryobj !=null)
        		   obj.setCategoryMaster(categoryobj);
        	   
        	   TaxMaster taxobj= (TaxMaster) sf.getCurrentSession().get(TaxMaster.class, 1);
        	   if(taxobj !=null)
        		   obj.setTaxMaster(taxobj);
        	   
        	   newProductList.add(obj);
        	   
        	   
           }
         
         EcogreenItemMasterDto obj=new EcogreenItemMasterDto();
            //obj.setLstProd(newProductList);
            
            sf.getCurrentSession().merge(obj);
            return 1;
         
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return res;
}

}
