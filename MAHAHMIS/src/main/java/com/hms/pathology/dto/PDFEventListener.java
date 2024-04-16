package com.hms.pathology.dto;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

public class PDFEventListener extends PdfPageEventHelper {

	@Override
	public void onStartPage(PdfWriter writer, Document document) {

		PdfContentByte canvas = writer.getDirectContentUnder();
		Phrase watermark = new Phrase("JCG", new Font(FontFamily.TIMES_ROMAN, 190, Font.NORMAL, BaseColor.LIGHT_GRAY));
		ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, watermark, 337, 500, 45);

	}

	@Override
	public void onEndPage(PdfWriter writer, Document document) {
		
	}
}