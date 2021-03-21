package com.example.demo.web.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends BaseCustomException {

    public UnauthorizedException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.UNAUTHORIZED;
    }
}
