package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.ProductDao;
import com.hms.pharmacy.pojo.PharmaProductView;
import com.hms.pharmacy.pojo.ProductByBatch;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService 
{
	@Autowired
	ProductDao productDao;

	@Override
	@Transactional
	public List<ProductMaster> getProducts() 
	{
		return productDao.getProducts();
	}

	@Override
	@Transactional
	public boolean saveProduct(ProductMaster productMaster)
	{
		
	if(productMaster.getProductId()==null)
		{
		try
		{
		productMaster.setProductDeleteFlag(0);
		productMaster.setProductAddDate(new Date(new java.util.Date()
		.getTime()));
		productMaster.setProductUpdateDate(new Date(new java.util.Date()
				.getTime()));
		/*productMaster.setProductPhotoUrl(productMaster.getImgFile().getOriginalFilename());*/
		/*fileUpload(productMaster);*/
		}
		catch(Exception e)
		{ }
		
		}
		else
		{
						
			ProductMaster productMaster2= productDao.getProductByIdForDate(productMaster.getProductId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			productMaster.setProductAddDate(productMaster2.getProductAddDate());
			productMaster.setProductDeleteFlag(0);
			productMaster.setProductUpdateDate(new Date(new java.util.Date()
					.getTime()));
			
			if(productMaster2.getProductLastMRP()!=null)
			{
				productMaster.setProductLastMRP(productMaster2.getProductLastMRP());
			}
			if(productMaster2.getProductLastPurRate()!=null)
			{
				productMaster.setProductLastPurRate(productMaster2.getProductLastPurRate());
			}
			if(productMaster2.getProductPhotoUrl()!=null)
			{
				productMaster.setProductPhotoUrl(productMaster2.getProductPhotoUrl());
			}
			
		}
			
	if (productDao.saveProduct(productMaster)) 
		{
			
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteProduct(Integer productId,Integer userId) 
	{
		return productDao.deleteProduct(productId,userId);
	}

	@Override
	@Transactional
	public List<ProductMaster> getProductById(Integer productId) {
		return productDao.getProductById(productId);
	}
	
	@Override
	@Transactional
	public List<ProductMaster> getAutoSuggestionProduct(String letter) {
		// TODO Auto-generated method stub
		return productDao.getAutoSuggestionProduct(letter);
	}
	
	/*public void fileUpload(ProductMaster productMaster)
	{
		CommonsMultipartFile file = productMaster.getImgFile();
		String tempFile=file.getOriginalFilename();
		

		String imageName = tempFile;
		String name = productMaster.getProductId()+ "."+productMaster.getProductPhotoUrl();
		// file upload
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();

				// Creating the directory to store file
				String rootPath = FilePath.getBasePath();
				File dir = new File(rootPath);
				if (!dir.exists())
					dir.mkdirs();

				// Create the file on server
				File serverFile = new File(dir.getAbsolutePath()
						+ File.separator + imageName);

				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();

				
			} catch (Exception e) {
				System.out.println("You failed to upload " + imageName + " => "
						+ e.getMessage());
			}
		} else {
			System.out.println("You failed to upload " + imageName
					+ " because the file was empty.");
		}

	}*/

	@Override
	@Transactional
	public List<String> autoSuggestionProductByBatch(Integer productId,String storeId) {
		List<ProductByBatch> batchMasters= productDao.autoSuggestionProductByBatch(productId,storeId);
		
		List<ProductByBatch> openingStockDetails= productDao.autoSuggestionForOpeningStock(productId,storeId);
		
		List<ProductByBatch> productByBatchs=new ArrayList<ProductByBatch>();
		
		for(ProductByBatch bm:batchMasters)
		{
			productByBatchs.add(bm);
		}
		
		for(ProductByBatch bm:openingStockDetails)
		{
			productByBatchs.add(bm);
		}
		
		List<String> results=new ArrayList<String>();
		for(ProductByBatch bm:productByBatchs)
		{
			results.add(bm.getBatchCode()+"#"+bm.getBatchExpDate()+"#"+bm.getMRP()+"#"+bm.getRate()+"#"+bm.getClearStock()+"#"+bm.getBatchId()+"#"+bm.getStockId()+"#"+bm.getPurchaseRate()+"#"+bm.getVat()+"#"+bm.getPurchaseSlaveId()+"#"+bm.getIgst()+"#"+bm.getCess()+"#"+bm.getSchemeStock());
		}
		return results;
	}

	@Override
	@Transactional
	public List<ProductMaster> autoSuggestionProductForPurchase(String letter,Integer vmi) {
		return productDao.autoSuggestionProductForPurchase(letter,vmi);
	}

	@Override
	@Transactional
	public List<StockMaster> getStockByProductId(Integer productId) {
		return productDao.getStockByProductId(productId);
	}

	@Override
	@Transactional
	public List<ProductMaster> getAllProducts() {
		return productDao.getAllProducts();
	}

	@Override
	@Transactional
	public JSONArray getAlternateProductByProductId(Integer productId) {
		JSONArray jsonArray=new JSONArray();
		Integer contentId=productDao.getContentByProductId(productId);
		
		jsonArray=productDao.getProductByContent(contentId);
		//jsonArray=productDao.getAlternateProductByProductId(productId);
		return jsonArray;
		/*return productDao.getAlternateProductByProductId(productId);*/
	}

	@Override
	@Transactional
	public JSONArray getAlternateProductByDrugId(Integer drugId) {
		JSONArray jsonArray=new JSONArray();
		jsonArray=productDao.getProductByContent(drugId);
		return jsonArray;
	}

	@Override
	@Transactional
	public String pushStockByExcel(String filePath) {
		return productDao.pushStockByExcel(filePath);
	}
	
	@Override
	@Transactional
	public String pushStockByExcelForProduct(String filePath,int cathlabFlag) 
	{
		return productDao.pushStockByExcelForProduct(filePath,cathlabFlag);
	}

	@Override
	@Transactional
	public void updateProductHSN(Integer productId, String txtHsn) {
		productDao.updateProductHSN(productId,txtHsn);
	}

	@Override
	@Transactional
	public void saveHSN(String txtHsn) {
		productDao.saveHSN(txtHsn);
	}

	@Override
	@Transactional
	public List<ProductMaster> autoSuggestionCathLabVendor(String letter) {
		return productDao.autoSuggestionCathLabVendor(letter);
	}

	@Override
	@Transactional
	public List<ProductMaster> getCathLabProductByVendor(int vendorId) {
		return productDao.getCathLabProductByVendor(vendorId);
	}

	@Override
	@Transactional
	public List<PharmaProductView> fetchHsnandGst(Integer unitId,int productId) {
		
		return productDao.fetchHsnandGst(unitId,productId);
	}

	@Override
	@Transactional
	public List<ProductMaster> autoSuggestionProductlist(String letter) {
		
		return productDao.autoSuggestionProductlist(letter);
	}
	@Override
	@Transactional
	public List<ProductMaster> getPreparationAll(String letter) {
		// TODO Auto-generated method stub
		return productDao.getPreparationAll(letter);
	}
	
	@Override
	@Transactional
	public List<ProductMaster>  getProductByIDD(Integer productId) {
		// TODO Auto-generated method stub
		return productDao.getProductByIDD(productId);
	}
}
