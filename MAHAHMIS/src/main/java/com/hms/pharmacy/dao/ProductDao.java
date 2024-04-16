package com.hms.pharmacy.dao;

import java.util.List;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PharmaProductView;
import com.hms.pharmacy.pojo.ProductByBatch;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.StockMaster;

public interface ProductDao {

	List<ProductMaster> getProducts();

	boolean saveProduct(ProductMaster productMaster);

	boolean deleteProduct(Integer productId,Integer userId);

	List<ProductMaster> getProductById(Integer productId);
	
	List<ProductMaster> getAutoSuggestionProduct(String letter);

	List<ProductByBatch> autoSuggestionProductByBatch(Integer productId, String storeId);

	List<ProductMaster> autoSuggestionProductForPurchase(String letter, Integer vmi);
	
	ProductMaster getProductByIdForDate(Integer compId);

	List<StockMaster> getStockByProductId(Integer productId);

	List<ProductByBatch> autoSuggestionForOpeningStock(Integer productId, String storeId);

	List<ProductMaster> getAllProducts();

	Integer getContentByProductId(Integer productId);

	JSONArray getProductByContent(Integer contentId);

	String pushStockByExcel(String filePath);
	
	String pushStockByExcelForProduct(String filePath, int cathlabFlag);

	void updateProductHSN(Integer productId, String txtHsn);

	void saveHSN(String txtHsn);

	List<ProductMaster> autoSuggestionCathLabVendor(String letter);

	List<ProductMaster> getCathLabProductByVendor(int vendorId);

	JSONArray getAlternateProductByProductId(Integer productId);

	List<PharmaProductView> fetchHsnandGst(Integer unitId, int productId);

	List<ProductMaster> autoSuggestionProductlist(String letter);
	List<ProductMaster> getPreparationAll(String letter);
	List<ProductMaster>  getProductByIDD(Integer productId);


}
