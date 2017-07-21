package org.opsart.event.core.util;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.opsart.event.core.dao.AuthDAO;

public class TokenUtil {

	private static final byte[] IV = { 0, 32, 10, 45, 1, 23, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
	
	public static String getTokenPlain(AuthDAO auth) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		StringBuffer buffer = new StringBuffer();
		buffer.append(auth.user.id);
		buffer.append(":");
		buffer.append(auth.token);
		buffer.append(":");
		buffer.append(Base64.getEncoder().encodeToString(MessageDigest.getInstance("SHA-256").digest(buffer.toString().getBytes("UTF-8"))));
		return buffer.toString();
	}
	
	public static String encode(Cipher cipher, SecretKeySpec key, String data) throws InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException {
		cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(IV));
		return Base64.getEncoder().encodeToString(cipher.doFinal(data.getBytes("UTF-8")));
	}
	
	public static String decode(Cipher cipher, SecretKeySpec key, String data) throws UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, InvalidAlgorithmParameterException {
		cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec(IV));
		return new String(cipher.doFinal(Base64.getDecoder().decode(data)), "UTF-8");
	}
	
	public static boolean isValidHash(String token) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		String[] message = token.split(":");
		
		if(message != null && message.length == 3) {
			//FIXME use regex ?!?!
			StringBuffer buffer = new StringBuffer();
			buffer.append(message[0]);
			buffer.append(":");
			buffer.append(message[1]);
			buffer.append(":");
			
			//Hash
			String hash = Base64.getEncoder().encodeToString(MessageDigest.getInstance("SHA-256").digest(buffer.toString().getBytes("UTF-8")));
			return hash.equals(message[2]);
		}
		
		return false;
	}
	
	public static String getUserID(String token) {
		return token.split(":")[0];
	}
	
	public static String getToken(String token) {
		return token.split(":")[1];
	}
	
	
	
}
