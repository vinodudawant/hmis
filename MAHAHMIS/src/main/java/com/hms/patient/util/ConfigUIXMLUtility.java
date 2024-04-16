package com.hms.patient.util;

import java.io.ByteArrayInputStream;
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.apache.xml.serialize.OutputFormat;
import org.apache.xml.serialize.XMLSerializer;





/**
 * 
 * @author sankpand This class is used to generated xml from object and
 *         vice-versa
 */
public class ConfigUIXMLUtility {

//	private static final ConfigNamespacePrefixMapper configNamespacePrefixMapper = new ConfigNamespacePrefixMapper();
	private static final String CONFIG_NAMESPACEPREFIXMAPPER_KEY = "com.sun.xml.bind.namespacePrefixMapper";

	/**
	 * Replacing the old method with this new one. Fix for product description
	 * failing unmarshalling on subscribers side. Will put CDATA only for
	 * description.
	 * 
	 * @param o
	 * @param packageName
	 * @return xml string
	 */
	public static String getXMLFromObject(Object o, String packageName) {
		StringWriter sw = new StringWriter();
		try {

			Marshaller marshaller = getContextFromPackageForUnformatted(packageName);
			synchronized (marshaller) {
				// marshaller.marshal(o, sw);
				XMLSerializer serializer = getXMLSerializer(sw);
				marshaller.marshal(o, serializer.asContentHandler());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sw.toString();

	}

	public static XMLSerializer getXMLSerializer(StringWriter sw) {
		// configure an OutputFormat to handle CDATA

		serializer.setOutputCharStream(sw);
		return serializer;
	}

	private static JAXBContext jaxbCtxRespForService = null;
	private static JAXBContext jaxbCtxRespForClient = null;
	private static JAXBContext jaxbCtxRespForPricing = null;
	private static JAXBContext jaxbCtxRespForCart = null;

	// formatted
	private static Marshaller marshallerForService = null;
	private static Marshaller marshallerForClient = null;
	private static Marshaller marshallerForCart = null;
	private static Marshaller marshallerForPricing = null;
	// unformatted
	private static Marshaller marshallerForServiceUnformat = null;
	private static Marshaller marshallerForClientunFormat = null;
	private static Marshaller marshallerForCartUnformat = null;
	private static Marshaller marshallerForPricingUnformat = null;
	private static final OutputFormat of = new OutputFormat();
	private static XMLSerializer serializer = null;
	private static final String[] escapeProperty = new String[] {
			"urn:cisco:icw:config:service^description",
			"urn:cisco:icw:config:common^message" };

	private final static String PRICING_PACKAGE = "com.cisco.cixs.oagis.pricing";

	static {

		try {
//			jaxbCtxRespForService = JAXBContext
//					.newInstance(CoreConfigConstants.CONFIG_REQUEST_RESPONSE_PACKAGE);
//			jaxbCtxRespForClient = JAXBContext
//					.newInstance(CoreConfigConstants.JAXB_DATA_PACKAGE);
//
//			jaxbCtxRespForPricing = JAXBContext.newInstance(PRICING_PACKAGE);
//			jaxbCtxRespForCart = JAXBContext
//					.newInstance(CoreConfigConstants.PACKAGE_NAME_XML_UTILITY);

			// formatted xmls
			marshallerForService = jaxbCtxRespForService.createMarshaller();
			marshallerForClient = jaxbCtxRespForClient.createMarshaller();
			marshallerForCart = jaxbCtxRespForCart.createMarshaller();
			marshallerForPricing = jaxbCtxRespForPricing.createMarshaller();

			marshallerForClient.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT,
					Boolean.TRUE);
//			marshallerForClient.setProperty(CONFIG_NAMESPACEPREFIXMAPPER_KEY,
//					configNamespacePrefixMapper);
//
//			marshallerForService.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT,
//					Boolean.TRUE);
//			marshallerForService.setProperty(CONFIG_NAMESPACEPREFIXMAPPER_KEY,
//					configNamespacePrefixMapper);
//
//			marshallerForCart.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT,
//					Boolean.TRUE);
//			marshallerForCart.setProperty(CONFIG_NAMESPACEPREFIXMAPPER_KEY,
//					configNamespacePrefixMapper);
//
//			marshallerForPricing.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT,
//					Boolean.TRUE);
//			marshallerForPricing.setProperty(CONFIG_NAMESPACEPREFIXMAPPER_KEY,
//					configNamespacePrefixMapper);

			// unformatted xmls
			marshallerForServiceUnformat = jaxbCtxRespForService
					.createMarshaller();
			marshallerForClientunFormat = jaxbCtxRespForClient
					.createMarshaller();

			marshallerForPricingUnformat = jaxbCtxRespForPricing
					.createMarshaller();
			marshallerForCartUnformat = jaxbCtxRespForCart.createMarshaller();
		} catch (Exception e) {
			e.printStackTrace();
		}

		of.setCDataElements(escapeProperty); //
		serializer = new XMLSerializer(of);

	}

	public static Marshaller getContextFromPackageForUnformatted(
			String packageName) {
//		if (packageName
//				.equals(CoreConfigConstants.CONFIG_REQUEST_RESPONSE_PACKAGE)) {
//
//			return marshallerForServiceUnformat;
//		} else if (packageName.equals(CoreConfigConstants.JAXB_DATA_PACKAGE)) {
//			return marshallerForClientunFormat;
//		} else if (packageName.equals(PRICING_PACKAGE)) {
//			return marshallerForPricingUnformat;
//		} else if (packageName
//				.equals(CoreConfigConstants.PACKAGE_NAME_XML_UTILITY)) {
//			return marshallerForCartUnformat;
//		}

		return null;
	}

	/**
	 * This method provides formatted xml.
	 * 
	 * @param o
	 * @param packageName
	 * @return String
	 */

	public static Marshaller getContextFromPackage(String packageName) {
//		if (packageName
//				.equals(CoreConfigConstants.CONFIG_REQUEST_RESPONSE_PACKAGE)) {
//
//			return marshallerForService;
//		} else if (packageName.equals(CoreConfigConstants.JAXB_DATA_PACKAGE)) {
//			return marshallerForClient;
//		} else if (packageName.equals(PRICING_PACKAGE)) {
//			return marshallerForPricing;
//		} else if (packageName
//				.equals(CoreConfigConstants.PACKAGE_NAME_XML_UTILITY)) {
//			return marshallerForCart;
//		}

		return null;
	}

	public static String getFormattedXMLFromObject(Object o, String packageName) {

		StringWriter writer = new StringWriter();
		try {
			Marshaller marshller = getContextFromPackage(packageName);
			synchronized (marshller) {
				marshller.marshal(o, writer);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return writer.toString();
	}

	/**
	 * 
	 * @param xmlString
	 * @param packageName
	 * @return object
	 */

	public static Object getObjectFromXml(String xmlString, String packageName) {

		Object clonedObject = null;
		try {
			ByteArrayInputStream xmlContentBytes = new ByteArrayInputStream(
					xmlString.getBytes());
			JAXBContext newContext = JAXBContext.newInstance(packageName);
			Unmarshaller unmarshaller = newContext.createUnmarshaller();
			// note: setting schema to null will turn validator off
			// unmarshaller.setSchema(schema);
			clonedObject = unmarshaller.unmarshal(xmlContentBytes);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return clonedObject;

	}

}
