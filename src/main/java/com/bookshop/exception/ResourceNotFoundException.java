package com.bookshop.exception;

/**
 * Custom exception for resource not found
 * 
 * OOP CONCEPT: INHERITANCE
 * By using the 'extends' keyword, this custom exception inherits all the built-in 
 * behaviors and properties of Java's standard RuntimeException (such as stack trace generation),
 * allowing us to reuse that code without rewriting it.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
