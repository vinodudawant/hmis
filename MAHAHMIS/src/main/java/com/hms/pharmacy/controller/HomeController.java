package com.hms.pharmacy.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.dao.EhatEnterpriseUtil;
import com.hms.pharmacy.service.ProductService;
import com.hms.pharmacy.upload.FilePath;
import com.hms.utility.ApplicationContextUtils;






@Controller
@RequestMapping(value = "/pharmacy")
public class HomeController {
	
	@Autowired
	ProductService productService;

	@RequestMapping(method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView getHomePage(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("index");
		return modelAndView;
	}
	
	@RequestMapping(value="/dashboard",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView getDashbaord(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_dashboard");
		return modelAndView;
	}

	@RequestMapping(value="/masters",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView getMasters(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("Pharma_Masters");
		return modelAndView;
	}
	
	@RequestMapping(value="/transaction",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView getTransaction(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("Pharma_Transaction");
		return modelAndView;
	}
	
	@RequestMapping(value="/reports",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView getReports(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("Pharma_Report");
		return modelAndView;
	}
	
	@RequestMapping(value="/others",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView getOthers(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("Pharma_Others");
		return modelAndView;
	}

	@RequestMapping(value="/utilities",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView getUtility(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("Pharma_Utilities");
		return modelAndView;
	}

	@RequestMapping(value="/error-page",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView getErrorPage(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_error_page");
		return modelAndView;
	}
	
	@RequestMapping(value = "/readImage", method = RequestMethod.GET)
	public void readPhoto(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		try
		{
			/*response.setContentType("image/jpeg");*/
			String imageName=request.getParameter("url");
			String pathToWeb = FilePath.getBasePath();
			File f = new File(pathToWeb + File.separator + imageName);
			
			//System.err.println("img :----------------- "+f);
			
			ImageInputStream iis = ImageIO.createImageInputStream(f);
			if(iis!=null){
			Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(iis);
			BufferedImage bi = ImageIO.read(f);
			OutputStream out = response.getOutputStream();
			while (imageReaders.hasNext()) {
			    ImageReader reader = (ImageReader) imageReaders.next();
			    ImageIO.write(bi,  reader.getFormatName(), out);
			}
			out.close();
		}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/readAadharImage", method = RequestMethod.GET)
	public void readAadharPhoto(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		try
		{
			/*response.setContentType("image/jpeg");*/
			String imageName=request.getParameter("url");
			String pathToWeb = FilePath.getAadharPath();
			File f = new File(pathToWeb + File.separator + imageName);
			
			//System.err.println("img :----------------- "+f);
			
			ImageInputStream iis = ImageIO.createImageInputStream(f);
			if(iis!=null){
			Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(iis);
			BufferedImage bi = ImageIO.read(f);
			OutputStream out = response.getOutputStream();
			while (imageReaders.hasNext()) {
			    ImageReader reader = (ImageReader) imageReaders.next();
			    ImageIO.write(bi,  reader.getFormatName(), out);
			}
			out.close();
		}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}	
	
	@RequestMapping(value="/importExcel",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView importExcel(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_import_excel");
		return modelAndView;
	}
	
	@RequestMapping(value="/importProductExcel",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView importProductExcel(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_import_product_excel");
		return modelAndView;
	}
	
	@RequestMapping(value="/readExcel",method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public @ResponseBody String readExcel(HttpServletRequest request,@RequestParam("file") MultipartFile file) {
		String UPLOAD_DIRECTORY = FilePath.getBasePath1();
		String fileName=file.getOriginalFilename();
		File serverLocation=new File(UPLOAD_DIRECTORY);
		if(!serverLocation.exists()){
			serverLocation.mkdir();
		}
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				File serverFile = new File(UPLOAD_DIRECTORY + File.separator + fileName);
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			productService.pushStockByExcel(UPLOAD_DIRECTORY + fileName);
		}
		return "File Imported Successfully";
	}
	
	@RequestMapping(value="/readExcelForProduct",method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public @ResponseBody String readExcelForProduct(HttpServletRequest request,@RequestParam("file") MultipartFile file) 
	{
		int cathlabFlag=0;
		String UPLOAD_DIRECTORY = FilePath.getBasePath1();
		String fileName=file.getOriginalFilename();
		File serverLocation=new File(UPLOAD_DIRECTORY);
		if(!serverLocation.exists()){
			serverLocation.mkdir();
		}
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				File serverFile = new File(UPLOAD_DIRECTORY + File.separator + fileName);
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			productService.pushStockByExcelForProduct(UPLOAD_DIRECTORY + fileName,cathlabFlag);
		}
		return "File Imported Successfully";
	}
	
	@RequestMapping(value="/openingStockBarcode",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView getOpeningStockBarcode(@RequestParam("masterId") Integer openingStockId,@RequestParam("count") String qty,@RequestParam("productName") String productName,@RequestParam("batchCode") String batchCode,HttpServletRequest request,HttpServletResponse response) 
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("openingStockId", openingStockId);
		modelAndView.addObject("count",qty);
		modelAndView.addObject("productName",request.getParameter("productName"));
		modelAndView.addObject("batchCode",batchCode);
		
		
		modelAndView.setViewName("ehat_openingstock_barcode");
		return modelAndView;
	}
	
	@RequestMapping(value="/readBarcodeForPurchase",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView readBarcodeForPurchase(@RequestParam("masterId") Integer masterId,HttpServletRequest request,HttpServletResponse response) 
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("masterId", masterId);
		
		modelAndView.setViewName("ehat_stock_barcode_new");
		return modelAndView;
	}
	
	// for HR module
	@RequestMapping(value = "/saveAttendance", method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public @ResponseBody
	String saveAttendance(HttpServletRequest request,
			@RequestParam("file") MultipartFile file) {
		String UPLOAD_DIRECTORY = FilePath.getBasePath1();
		String fileName = file.getOriginalFilename();
		File serverLocation = new File(UPLOAD_DIRECTORY);
		if (!serverLocation.exists()) {
			serverLocation.mkdir();
		}
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				File serverFile = new File(UPLOAD_DIRECTORY + File.separator
						+ fileName);
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
					.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
			boolean response = enterpriseUtil.saveAttendance(UPLOAD_DIRECTORY
					+ fileName, fileName, request);
			if (!response) {
				return "Sorry file is already uploaded..!!!";
			}
		}
		return "Attendance Saved Successfully";
	}

	@RequestMapping(value = "/getAllImportedFile", method = RequestMethod.POST)
	public @ResponseBody
	JSONArray getAllImportedFile() {
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.getAllImportedFile();
	}

	@RequestMapping(value = "/downloadFile", method = RequestMethod.GET)
	public void readPdf(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String fileName = request.getParameter("fileName");
		String reportDestination = FilePath.getBasePath1() + fileName;
		File file = new File(reportDestination);
		InputStream in = null;
		OutputStream outstream = null;
		try {
			response.reset();
			in = new FileInputStream(file);
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("content-disposition", "attachment; filename="
					+ fileName);
			outstream = response.getOutputStream();
			IOUtils.copyLarge(in, outstream);
		} catch (Exception e) {
			System.err.println("Unable to download file");
		} finally {
			IOUtils.closeQuietly(outstream);
			IOUtils.closeQuietly(in);
		}
	}
	
	@RequestMapping(value = "/getEmployeeAttendanceDetails", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> getEmployeeAttendanceDetails(@RequestParam("userId") String userId,@RequestParam("date") String date) {
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.getEmployeeAttendanceDetails(userId, date);
	}
	
	@RequestMapping(value="/importCathLabProductExcel",method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public ModelAndView importCathLabProductExcel(final Model model) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_import_product_excel2");
		return modelAndView;
	}
	/*******
	 * @author   :BILAL
	 * @Date     :29-12-2017
	 * @Code     :For CathLab Product import via excel 
	 * ********/
	@RequestMapping(value="/readExcelForProduct2",method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public @ResponseBody String readExcelForProduct2(HttpServletRequest request,@RequestParam("file") MultipartFile file) 
	{
		int cathlabFlag=1;
		String UPLOAD_DIRECTORY = FilePath.getBasePath1();
		String fileName=file.getOriginalFilename();
		File serverLocation=new File(UPLOAD_DIRECTORY);
		if(!serverLocation.exists()){
			serverLocation.mkdir();
		}
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				File serverFile = new File(UPLOAD_DIRECTORY + File.separator + fileName);
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			productService.pushStockByExcelForProduct(UPLOAD_DIRECTORY + fileName,cathlabFlag);
		}
		return "File Imported Successfully";
	}
}
