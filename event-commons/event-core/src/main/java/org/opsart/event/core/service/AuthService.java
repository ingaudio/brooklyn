package org.opsart.event.core.service;

import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.opsart.event.core.dao.AuthDAO;
import org.opsart.event.core.dao.UserDAO;
import org.opsart.event.core.repo.AuthRepository;
import org.opsart.event.core.util.TokenUtil;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements InitializingBean {

	//Amount of milliseconds before generated token auto-expire
	public static final long TOKEN_VALIDITY = (1000 * 60 * 60); //3 Month ?
	
	private static final Logger LOG = LogManager.getLogger(AuthService.class);

	@Value("${token.secret}")
	private String cypherSecret;

	@Autowired
	private AuthRepository authRepo;
	
	private Cipher cipher;
	private SecretKeySpec secretKey;
	
	@Override
	public void afterPropertiesSet() throws Exception {
		//Secret Key
		this.secretKey = new SecretKeySpec(
				Arrays.copyOf(MessageDigest.getInstance("SHA-1").digest(cypherSecret.getBytes("UTF-8")), 16), 
				"AES"
		);
		//Cipher
		this.cipher = Cipher.getInstance("AES/CTS/PKCS5Padding");
	}

	public String createToken(UserDAO user, HttpServletRequest request, String provider) throws Exception {

		//Create Auth
		AuthDAO auth = new AuthDAO();
		auth.user = user;
		auth.provider = provider;
		auth.token = UUID.randomUUID().toString();
		auth.creationDate = new Date();
		auth.lastLogin = new Date();
		auth.endDate = new Date(auth.creationDate.getTime() + TOKEN_VALIDITY);
		auth.remoteHost = request.getRemoteHost();
		auth.remoteAddress = request.getRemoteAddr();
		auth.userAgent = request.getHeader("user-agent");
		
		//Store
		auth = authRepo.save(auth);
		
		//Prepare Token
		String token = TokenUtil.getTokenPlain(auth);
		
		//Encode Token
		synchronized (cipher) {
			return TokenUtil.encode(cipher, secretKey, token);
		}
		
	}
	
	public UserDAO login(String encrypedToken) throws Exception {

		//Plain token
		String token;
		
		//Decode Token
		synchronized (cipher) {
			token = TokenUtil.decode(cipher, secretKey, encrypedToken);
		}
		
		//Check Hash
		if(!TokenUtil.isValidHash(token)) {
			LOG.warn("fail to login: hash is not valid for token " + token);
			return null;
		}
		
		//Check Token
		AuthDAO auth = authRepo.findAuthByToken(TokenUtil.getToken(token));
		
		if(auth == null) {
			LOG.warn("fail to login: user not found for token " + token);
			return null;
		}
		
		if(!auth.user.id.equals(TokenUtil.getUserID(token))) {
			LOG.warn("fail to login: user not valid for token: " + token);
			return null;
		}
		
		if(!auth.isValid()) {
			LOG.warn("fail to login: auth [" + auth.id + "] is expired for token " + token);
			return null;
		}
		
		//Mark Login
		auth.lastLogin = new Date();
		auth = authRepo.save(auth);
		
		
		//User
		return auth.user;
	}
	
	
	
}
