package com.hms.pharmacy.service;

import java.util.List;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.PharmaProductView;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.StockMaster;

public interface ProductService
{

	List<ProductMaster> getProducts();

	boolean saveProduct(ProductMaster productMaster);

	boolean deleteProduct(Integer productId,Integer userId);

	List<ProductMaster> getProductById(Integer productId);

	List<ProductMaster> getAutoSuggestionProduct(String letter);

	List<String> autoSuggestionProductByBatch(Integer productId,String storeId);

	List<ProductMaster> autoSuggestionProductForPurchase(String letter, Integer vmi);

	List<StockMaster> getStockByProductId(Integer productId);

	List<ProductMaster> getAllProducts();

	JSONArray getAlternateProductByProductId(Integer productId);

	JSONArray getAlternateProductByDrugId(Integer drugId);

	String pushStockByExcel(String filePath);
	
	String pushStockByExcelForProduct(String filePath, int cathlabFlag);

	void updateProductHSN(Integer productId, String txtHsn);

	void saveHSN(String txtHsn);

	List<ProductMaster> autoSuggestionCathLabVendor(String letter);

	List<ProductMaster> getCathLabProductByVendor(int vendorId);

	List<PharmaProductView> fetchHsnandGst(Integer unitId, int productId);

	List<ProductMaster> autoSuggestionProductlist(String letter);
	
   List<ProductMaster> getPreparationAll(String letter);
	
	List<ProductMaster> getProductByIDD(Integer productId);


}
