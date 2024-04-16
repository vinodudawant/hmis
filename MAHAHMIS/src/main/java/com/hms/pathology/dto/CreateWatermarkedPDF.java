package com.hms.pathology.dto;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
 
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.pdf.PdfWriter;
 
 
public class CreateWatermarkedPDF
{
    public static void main(String[] args)
    {
        try
        {
            Document document = new Document();
            PdfWriter pdfWriter = PdfWriter.getInstance(document, new FileOutputStream("WaterMarkedDocument.pdf"));
            document.open();
            pdfWriter.setPageEvent(new PDFEventListener());
            Font font = new Font(FontFamily.TIMES_ROMAN, 20, Font.NORMAL, BaseColor.BLACK);
            document.add(new Phrase("Hi People!! This is an exaple to demostrate Watermark in using Itext",font));
            document.close();
        }
        catch (FileNotFoundException e)
        {
            e.printStackTrace();
        }
        catch (DocumentException e)
        {
            e.printStackTrace();
        }
    }
}