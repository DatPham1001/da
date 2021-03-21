package com.example.demo.web.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends BaseCustomException {

    public ForbiddenException(String... messages) {
        super(messages);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FORBIDDEN;
    }
}
