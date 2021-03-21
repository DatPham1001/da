package com.example.demo.web.exception;

import org.springframework.http.HttpStatus;

public class DomainValidateException extends BaseCustomException {

    public DomainValidateException(String... messages) {
        super(messages);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.UNPROCESSABLE_ENTITY;
    }
}
