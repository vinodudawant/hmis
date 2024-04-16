package com.hms.utility;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hms.interfaces.UtilInterface;
import com.hms.patient.util.ConfigUIJSONUtility;

public class GenerateSyncTokenUtil implements UtilInterface {

	@Override
	public void process(HttpServletRequest request, HttpServletResponse response) {

		HttpSession session = request.getSession();

		String uuid = UUID.randomUUID().toString();
		System.out.println("session Token:" + uuid);
		session.setAttribute("synchronizeToken", uuid);

		includeJSONResponseObject(uuid, response);
	}

	public static void includeJSONResponseObject(Object jsonObject,
			HttpServletResponse response) {

		try {
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html");
			ConfigUIJSONUtility.getJSONFromObjectToStream(jsonObject,
					response.getWriter());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void generateTokenForSession(HttpServletRequest request) {
		HttpSession session = request.getSession();
		String uuid = UUID.randomUUID().toString();
		session.setAttribute("synchronizeToken", uuid);
	}

}
