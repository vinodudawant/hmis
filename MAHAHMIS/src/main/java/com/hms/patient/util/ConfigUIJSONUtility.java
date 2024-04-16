package com.hms.patient.util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.Writer;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;



public class ConfigUIJSONUtility {

	private static final ObjectMapper writeMapper = new ObjectMapper();
	private static final ObjectMapper readMapper = new ObjectMapper();
	static {
		writeMapper.getSerializationConfig().setSerializationInclusion(
				Inclusion.NON_NULL);
		 
	}

	/*
	 * This method will convert JSON string to Java Object. The object need to
	 * be a simple POJO. As this a generaric method there are certain rules
	 * which needs to be followed. 1. The keys in JSON string should be same as
	 * variable name's in object. 2. The Object has to be a POJO, the variables
	 * in object should standard primitive types or Wrapper to primitive type or
	 * standard java class object. It should not have any references to
	 * Interfaces.
	 */
	public static Object getObjectFromJSON(String jsonString, Class<?> className) {
		Object readValue = null;
		try {
			readValue = readMapper.readValue(jsonString, className);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return readValue;
	}

	/*
	 * This method will convert Java Object to JSON string. The object need to
	 * be a simple POJO.
	 */
	public static String getJSONFromObject(Object object) {
		String jsonData = null;

		try {
			jsonData = writeMapper.writeValueAsString(object);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return jsonData;
	}

	public static void getJSONFromObjectToStream(Object object, Writer writer) {
		try {
			writeMapper.writeValue(writer, object);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/*
	 * This method will convert XML data to json string.
	 */
	public static String getJSONFromXML(String xml, String packageName) {
		String jsonData = null;
		try {

			Object object = ConfigUIXMLUtility.getObjectFromXml(xml,
					packageName);
			jsonData = getJSONFromObject(object);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonData;
	}

	/**
	 * @param filePath
	 *            the name of the file to open. Not sure if it can accept URLs
	 *            or just filenames. Path handling could be better, and buffer
	 *            sizes are hardcoded
	 */
	public static String readFileAsString(String filePath)
			throws java.io.IOException {
		StringBuffer fileData = new StringBuffer(1000);
		BufferedReader reader = new BufferedReader(new FileReader(filePath));
		char[] buf = new char[1024];
		int numRead = 0;
		while ((numRead = reader.read(buf)) != -1) {
			String readData = String.valueOf(buf, 0, numRead);
			fileData.append(readData);
			buf = new char[1024];
		}
		reader.close();
		return fileData.toString();
	}

	/**
	 * Check for null values for json node as they are retured as "null" from
	 * the browser
	 * 
	 * @param node
	 * @return <String> val
	 */
	public static String checkForNullValues(JsonNode node) {

		if (node == null) {
			return null;
		}
		String val = node.getValueAsText();

		if (val == null || val.trim().equals("null")) {
			return null;
		}

		return val;

	}
	
	//new Date Converstion
	 
	

}
