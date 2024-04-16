package com.hms.sandbox.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.zxing.BinaryBitmap;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.hms.pharmacy.upload.FilePath;

@WebServlet("/UploadAadharServlet")
public class UploadAadharServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final String UPLOAD_DIRECTORY = FilePath.getAadharPath();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UploadAadharServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);
	}

	/**
	 * @return 
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		File file=new File(UPLOAD_DIRECTORY);
		String decodeQRCode="";
		if(!file.exists()){
			file.mkdir();
		}
		/*String fileName=request.getParameter("fileName");
		System.out.println("fileName:"+fileName);*/
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		// process only if its multipart content
		if (isMultipart) {
			// Create a factory for disk-based file items
			FileItemFactory factory = new DiskFileItemFactory();
			// Create a new file upload handler
			ServletFileUpload upload = new ServletFileUpload(factory);
			String name = null;
			try {
				// Parse the request
				List<FileItem> multiparts = upload.parseRequest(request);
				for (FileItem item : multiparts) {
					if (!item.isFormField()) {
						name = new File(item.getName()).getName();
						file = new File(UPLOAD_DIRECTORY + File.separator + name);
						item.write(new File(UPLOAD_DIRECTORY + File.separator + name));
						decodeQRCode = decodeQRCode(file);
						System.out.println(decodeQRCode);
						response.getWriter().append(decodeQRCode);
						
						System.err.println("upload :---------- "+UPLOAD_DIRECTORY + File.separator + name);
					}
				}
			} 
			catch (Exception e) 
			{
			  e.printStackTrace();
			}
		}
	}
	
	@SuppressWarnings("unused")
	private static String decodeQRCode(File qrCodeimage) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(qrCodeimage);
        LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));

        try {
            Result result = new MultiFormatReader().decode(bitmap);
            return result.getText();
        } catch (NotFoundException e) {
            System.out.println("There is no QR code in the image");
            return null;
        }
    }
}