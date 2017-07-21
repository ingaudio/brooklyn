package org.opsart.event.core.rest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.opsart.event.core.CorsOption;
import org.opsart.event.core.dto.ProfileDTO;
import org.opsart.event.core.facade.SocialFacade;
import org.opsart.event.core.facade.UserFacade;
import org.opsart.event.core.facade.UserFacade.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/user")
public class UserRestController {

	private Logger LOG = LogManager.getLogger(UserRestController.class);

	@Autowired
	private UserFacade userFacade;
	
	@Autowired
	private SocialFacade socialFacade;

	@CrossOrigin(origins={ CorsOption.origins }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public ResponseEntity<ProfileDTO> getProfile(HttpSession session) {
		try {
			//Not Allowed
			if(!userFacade.hasSessionUser(session)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
			
			//Get Profile
			return new ResponseEntity<ProfileDTO>(socialFacade.getProfile(session), HttpStatus.OK);
			
		} catch (Exception e) {
			LOG.error("fail to [getProfile]", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	
	@CrossOrigin(origins={ CorsOption.origins }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value = "/login/token", method = RequestMethod.POST)
	public ResponseEntity<LoginResponse> doLoginWithToken(@RequestBody String token, HttpSession session) {
		try {
			return new ResponseEntity<LoginResponse>(userFacade.loginWithToken(session, token), HttpStatus.OK);
		} catch (Exception e) {
			LOG.error("fail to [doLoginWithToken]", e);
			return ResponseEntity.badRequest().body(null);
		}
	}

	@CrossOrigin(origins={ CorsOption.origins }, maxAge=CorsOption.maxAge, allowCredentials=CorsOption.allowCredentials)
	@RequestMapping(value = "/login/google", method = RequestMethod.POST)
	public ResponseEntity<LoginResponse> doLoginWithGoogle(@RequestBody String tokenID, HttpSession session, HttpServletRequest request) {
		LOG.info("request TOKEN: " + tokenID);
		try {
			//End
			return new ResponseEntity<LoginResponse>(userFacade.loginWithGoogle(request, session, tokenID), HttpStatus.OK);
		} catch (Exception e) {
			LOG.error("fail to [doLoginWithGoogle]", e);
			return ResponseEntity.badRequest().body(null);
		}
	}

}
