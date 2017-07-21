package org.opsart.event.core.proxy;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.opsart.event.core.CorsOption;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/proxy")
public class XFrameProxy {
	
	@CrossOrigin(origins={ CorsOption.origins }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value="/xframe", method=RequestMethod.GET)
	public void doXFrameProxy(@RequestParam(name="url", required=true) String url, HttpServletRequest request, HttpServletResponse response) throws IOException {

		//Prepare Header
		response.setHeader("X-Frame-Options", "ALLOW-FROM " + CorsOption.origins);
		
		//Prepare URL
		URL target = new URL(url);
		
		//Reader
		BufferedReader reader = new BufferedReader(new InputStreamReader(target.openStream()));
		
		//Write
		String input;
		while((input = reader.readLine()) != null) {
			response.getWriter().println(input);
		}
		
		//Close
		reader.close();
		
	}

}
